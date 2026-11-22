// Sprawdzanie pól „rysunek” (SVG) i „wykres” (opis wykresu) na kartach wzorów – używają go test-szkola.mjs i test-wzory.mjs.
// Opis pól: komentarz na początku assets/rysunki.js.
import { ELEMENTY, ATRYBUTY, svgWykresu } from "../assets/rysunki.js";
import { parsuj, kompiluj, BladWyrazenia } from "../assets/wyrazenia.js";

/** Lista błędów rysunku SVG (pusta, gdy wszystko w porządku). */
export function bledyRysunku(svg) {
  const b = [];
  if (typeof svg !== "string" || !svg.trim()) return ["pusty rysunek"];
  const s = svg.trim();
  if (!s.startsWith("<svg") || !s.endsWith("</svg>")) b.push("rysunek musi zaczynać się od <svg i kończyć na </svg>");
  if (!/^<svg[^>]*\sviewBox="0 0 \d+ \d+"/.test(s)) b.push('brak viewBox="0 0 szerokość wysokość" w <svg>');
  if (s.length > 12000) b.push(`rysunek za długi (${s.length} znaków, maks. 12000)`);
  if (/[^\u0009\u000a\u000d -￿]/.test(s)) b.push("niedozwolone znaki sterujące");
  const stos = [];
  for (const m of s.matchAll(/<(\/?)([a-zA-Z][\w:-]*)([^>]*?)(\/?)>/g)) {
    const [, zamyka, tag, atrybuty, samo] = m;
    if (!ELEMENTY.has(tag)) { b.push(`niedozwolony element <${tag}>`); continue; }
    if (zamyka) {
      if (stos.pop() !== tag) b.push(`źle zamknięty element </${tag}>`);
      continue;
    }
    const reszta = atrybuty.replace(/\s([\w:-]+)\s*=\s*("[^"]*"|'[^']*')/g, (_, nazwa, wartosc) => {
      if (!ATRYBUTY.has(nazwa)) b.push(`niedozwolony atrybut ${nazwa} w <${tag}>`);
      if (/url\(|javascript:|expression\(/i.test(wartosc)) b.push(`niedozwolona wartość atrybutu ${nazwa}`);
      return "";
    });
    if (reszta.trim()) b.push(`nie rozumiem atrybutów w <${tag}>: ${reszta.trim().slice(0, 40)}`);
    if (!samo) stos.push(tag);
  }
  if (stos.length) b.push(`niezamknięte elementy: ${stos.join(", ")}`);
  const tekstPoza = s.replace(/<[^>]*>/g, "");
  if (/[<>]/.test(tekstPoza)) b.push("znak < albo > poza znacznikami (w tekście użyj &lt; &gt;)");
  if (/&(?!(amp|lt|gt|quot|#\d+);)/.test(tekstPoza)) b.push("znak & w tekście (użyj &amp;)");
  return b;
}

const liczba = (v) => typeof v === "number" && Number.isFinite(v);

/** Lista błędów opisu wykresu. */
export function bledyWykresu(w) {
  const b = [];
  if (!w || typeof w !== "object") return ["wykres musi być obiektem"];
  for (const p of Object.keys(w)) if (!["x", "y", "funkcje", "punkty", "proste", "podzialkaX", "podzialkaY", "wysokosc", "stopnie"].includes(p)) b.push(`nieznane pole wykresu ${p}`);
  for (const os of ["x", "y"]) if (!Array.isArray(w[os]) || w[os].length !== 2 || !w[os].every(liczba) || w[os][0] >= w[os][1]) b.push(`${os} musi być [od, do], od < do`);
  if (b.length) return b;
  if (w.podzialkaX !== undefined && w.podzialkaX !== "pi" && !(liczba(w.podzialkaX) && w.podzialkaX > 0)) b.push("podzialkaX: liczba > 0 albo \"pi\"");
  if (w.podzialkaY !== undefined && !(liczba(w.podzialkaY) && w.podzialkaY > 0)) b.push("podzialkaY: liczba > 0");
  const kx = w.podzialkaX === "pi" ? Math.PI / 2 : w.podzialkaX ?? 1, ky = w.podzialkaY ?? 1;
  if ((w.x[1] - w.x[0]) / kx > 40 || (w.y[1] - w.y[0]) / ky > 40) b.push("za gęsta podziałka (ponad 40 kresek na osi)");
  if (w.wysokosc !== undefined && !(liczba(w.wysokosc) && w.wysokosc >= 100 && w.wysokosc <= 320)) b.push("wysokosc: 100–320");
  const funkcje = w.funkcje ?? [];
  if (!Array.isArray(funkcje) || funkcje.length > 4) b.push("funkcje: lista 0–4 funkcji");
  if (!funkcje.length && !(w.punkty ?? []).length && !(w.proste ?? []).length) b.push("pusty wykres");
  for (const f of funkcje) {
    try {
      const { fn, zmienne, wywolania } = kompiluj(parsuj(f.wzor), { stopnie: !!w.stopnie });
      const obce = [...zmienne].filter((z) => z !== "x");
      if (obce.length || wywolania.size) b.push(`funkcja „${f.wzor}”: wolno używać tylko x`);
      let widac = 0;
      for (let i = 0; i <= 200; i++) { const y = fn({ x: w.x[0] + ((w.x[1] - w.x[0]) * i) / 200 }); if (liczba(y) && y >= w.y[0] && y <= w.y[1]) widac++; }
      if (widac < 5) b.push(`funkcji „${f.wzor}” prawie nie widać w zakresie osi`);
    } catch (e) { b.push(`funkcja „${f.wzor}”: ${e instanceof BladWyrazenia ? e.message : e}`); }
    for (const p of Object.keys(f)) if (!["wzor", "podpis"].includes(p)) b.push(`nieznane pole funkcji ${p}`);
  }
  for (const p of w.punkty ?? []) {
    for (const k of Object.keys(p)) if (!["x", "y", "podpis", "gdzie"].includes(k)) b.push(`nieznane pole punktu ${k}`);
    if (p.gdzie !== undefined && !["prawo-gora", "prawo-dol", "lewo-gora", "lewo-dol"].includes(p.gdzie)) b.push(`gdzie: prawo-gora, prawo-dol, lewo-gora albo lewo-dol (jest ${p.gdzie})`);
    if (!liczba(p.x) || !liczba(p.y)) b.push("punkt bez liczb x, y");
    else if (p.x < w.x[0] || p.x > w.x[1] || p.y < w.y[0] || p.y > w.y[1]) b.push(`punkt (${p.x}; ${p.y}) poza zakresem osi`);
  }
  for (const p of w.proste ?? []) if (!(liczba(p.x) || liczba(p.y)) || (p.x !== undefined && p.y !== undefined)) b.push("prosta: { x: liczba } albo { y: liczba }");
  if (!b.length) b.push(...bledyRysunku(svgWykresu(w)).map((x) => `wygenerowany wykres: ${x}`));
  return b;
}
