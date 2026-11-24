// Rysunki na kartach wzorów: ściągi rozdziałów „Do szkoły” i karty „Wzory” w części egzaminacyjnej.
//
// Karta może mieć jedno z dwóch pól (albo oba):
//   rysunek: "<svg viewBox=\"0 0 320 180\">…</svg>"  – rysunek SVG: figura, oś liczbowa, pasek ułamka…
//   wykres: {                                          – wykres funkcji rysowany przez stronę (assets/wyrazenia.js)
//     x: [-4, 6], y: [-5, 6],                           zakres osi
//     funkcje: [{ wzor: "x^2-2x-3", podpis: "y = x² − 2x − 3" }],   1–4 funkcje zmiennej x (podpis opcjonalny)
//     punkty: [{ x: 1, y: -4, podpis: "W(1; −4)", gdzie: "prawo-dol" }],   opcjonalnie; gdzie: prawo-gora (domyślnie), prawo-dol, lewo-gora, lewo-dol
//     proste: [{ x: 2, podpis: "x = 2" }, { y: 1 }],     opcjonalnie: proste pionowe/poziome (przerywane, np. asymptoty, oś symetrii)
//     podzialkaX: 1 albo "pi" (kreski co π/2), podzialkaY: 1, wysokosc: 200, stopnie: true (sin/cos w stopniach)
//   }
//
// Klasy stylów do rysunków SVG (style.css, „.rys”): l – linia, a – linia w kolorze akcentu, p – linia pomocnicza (przerywana),
// w – jasne wypełnienie, w2 – drugie jasne wypełnienie, k – kropka, t – podpis, ta – podpis w kolorze akcentu, tm – mały podpis.
// Rysunki są w plikach strony, ale i tak je czyścimy: tylko dozwolone elementy i atrybuty (ta sama lista co w tools/sprawdz-rysunek.mjs).
import { el } from "./dom.js";
import { parsuj, kompiluj, formatuj } from "./wyrazenia.js";

export const ELEMENTY = new Set(["svg", "g", "path", "line", "polyline", "polygon", "circle", "ellipse", "rect", "text", "tspan", "title"]);
export const ATRYBUTY = new Set([
  "viewBox", "width", "height", "xmlns", "class", "d", "points", "x", "y", "x1", "y1", "x2", "y2", "cx", "cy", "r", "rx", "ry",
  "dx", "dy", "transform", "fill", "stroke", "stroke-width", "stroke-dasharray", "stroke-linecap", "stroke-linejoin",
  "font-size", "font-style", "font-weight", "text-anchor", "dominant-baseline", "opacity", "fill-opacity", "role", "aria-label",
]);
const KOLORY = ["var(--accent)", "var(--wyk-k2)", "var(--wyk-k3)", "var(--wyk-k4)"];   // style.css – inne w ciemnym motywie

function czyscSvg(tekst) {
  // bez xmlns przeglądarka nie rozpozna elementów SVG (narysowałaby sam tekst) – dopisujemy go, gdy go brakuje
  const zNs = /^\s*<svg[^>]*\sxmlns=/.test(tekst) ? tekst : tekst.replace(/^\s*<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  const doc = new DOMParser().parseFromString(zNs, "image/svg+xml");
  const svg = doc.documentElement;
  if (svg.nodeName !== "svg" || doc.querySelector("parsererror")) return null;
  const czysc = (w) => {
    for (const d of [...w.children]) {
      if (!ELEMENTY.has(d.nodeName)) { d.remove(); continue; }
      for (const a of [...d.attributes]) if (!ATRYBUTY.has(a.name)) d.removeAttribute(a.name);
      czysc(d);
    }
  };
  for (const a of [...svg.attributes]) if (!ATRYBUTY.has(a.name)) svg.removeAttribute(a.name);
  czysc(svg);
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  svg.setAttribute("role", "img");
  return document.importNode(svg, true);
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/** Podpis osi przy podziałce co π/2: π/2, π, 3π/2, −π… */
function podpisPi(k) {
  if (k === 0) return "0";
  const z = k < 0 ? "−" : "", n = Math.abs(k);
  if (n % 2 === 0) return `${z}${n / 2 === 1 ? "" : n / 2}π`;
  return `${z}${n === 1 ? "" : n}π/2`;
}

/** Wykres z opisu karty → tekst SVG (bez skryptów: same liczby i podpisy z karty). Eksportowane dla testu. */
export function svgWykresu(opis) {
  const W = 320, H = opis.wysokosc ?? 200, M = 6;
  const [x0, x1] = opis.x, [y0, y1] = opis.y;
  const sx = (x) => M + ((x - x0) / (x1 - x0)) * (W - 2 * M);
  const sy = (y) => M + ((y1 - y) / (y1 - y0)) * (H - 2 * M);
  const r = (v) => Math.round(v * 10) / 10;
  const czesci = [];
  // siatka i podziałka
  const pi = opis.podzialkaX === "pi";
  const kx = pi ? Math.PI / 2 : opis.podzialkaX ?? 1, ky = opis.podzialkaY ?? 1;
  const siatka = [];
  for (let i = Math.ceil(x0 / kx); i * kx <= x1 + 1e-9; i++) siatka.push(`M${r(sx(i * kx))} ${M}V${H - M}`);
  for (let i = Math.ceil(y0 / ky); i * ky <= y1 + 1e-9; i++) siatka.push(`M${M} ${r(sy(i * ky))}H${W - M}`);
  czesci.push(`<path class="siatka" d="${siatka.join("")}"/>`);
  const osX = Math.min(Math.max(sy(0), M), H - M), osY = Math.min(Math.max(sx(0), M), W - M);
  czesci.push(`<path class="os" d="M${M} ${r(osX)}H${W - M}M${r(osY)} ${H - M}V${M}"/>`);
  czesci.push(`<path class="os" d="M${W - M - 6} ${r(osX - 3.5)}L${W - M} ${r(osX)}L${W - M - 6} ${r(osX + 3.5)}M${r(osY - 3.5)} ${M + 6}L${r(osY)} ${M}L${r(osY + 3.5)} ${M + 6}"/>`);
  czesci.push(`<text class="tm" x="${W - M - 2}" y="${r(osX - 6)}" text-anchor="end">x</text><text class="tm" x="${r(osY + 6)}" y="${M + 10}">y</text>`);
  // liczby przy osiach (co druga, gdy gęsto)
  const coIle = (k, zakres, dlugosc) => Math.max(1, Math.ceil(28 / ((k / zakres) * dlugosc)));
  const nx = coIle(kx, x1 - x0, W), ny = coIle(ky, y1 - y0, H);
  for (let i = Math.ceil(x0 / kx); i * kx <= x1 + 1e-9; i++) {
    if (i === 0 || i % nx) continue;
    const p = sx(i * kx);
    if (p < M + 10 || p > W - M - 14) continue;
    czesci.push(`<text class="tm" x="${r(p)}" y="${r(Math.min(osX + 13, H - M - 2))}" text-anchor="middle">${esc(pi ? podpisPi(i) : formatuj(i * kx, 6))}</text>`);
  }
  for (let i = Math.ceil(y0 / ky); i * ky <= y1 + 1e-9; i++) {
    if (i === 0 || i % ny) continue;
    const p = sy(i * ky);
    if (p < M + 14 || p > H - M - 6) continue;
    czesci.push(`<text class="tm" x="${r(osY - 4)}" y="${r(p + 4)}" text-anchor="end">${esc(formatuj(i * ky, 6))}</text>`);
  }
  // proste (asymptoty, oś symetrii)
  for (const p of opis.proste ?? []) {
    if (p.x !== undefined) {
      czesci.push(`<path class="p" d="M${r(sx(p.x))} ${M}V${H - M}"/>`);
      // podpis prostej pionowej na dole (na górze zwykle jest podpis funkcji)
      if (p.podpis) czesci.push(`<text class="tm" x="${r(sx(p.x) + 4)}" y="${H - M - 4}">${esc(p.podpis)}</text>`);
    } else {
      czesci.push(`<path class="p" d="M${M} ${r(sy(p.y))}H${W - M}"/>`);
      if (p.podpis) czesci.push(`<text class="tm" x="${W - M - 4}" y="${r(sy(p.y) - 5)}" text-anchor="end">${esc(p.podpis)}</text>`);
    }
  }
  // podpisy punktów: ich miejsca są ustalone (gdzie), więc najpierw one, a podpisy funkcji szukają miejsca obok
  const zajete = [];   // prostokąty podpisów [x0, y0, x1, y1]
  const prostokat = (x, y, tekst, kotwica) => { const w = 7.2 * tekst.length; return kotwica === "start" ? [x, y - 11, x + w, y + 3] : [x - w, y - 11, x, y + 3]; };
  const podpisyPunktow = (opis.punkty ?? []).map((p) => {
    if (!p.podpis) return null;
    const cx = sx(p.x), cy = sy(p.y);
    // gdzie: "prawo-gora" (domyślnie), "prawo-dol", "lewo-gora", "lewo-dol" – żeby podpis nie nachodził na wykres
    const [poz, pion] = (p.gdzie ?? (cx < W - 70 ? "prawo-gora" : "lewo-gora")).split("-");
    const prawo = poz === "prawo", gora = pion === "gora" ? cy > M + 18 : cy > H - M - 18;
    const x = cx + (prawo ? 6 : -6), y = gora ? cy - 7 : cy + 16, kotwica = prawo ? "start" : "end";
    zajete.push(prostokat(x, y, p.podpis, kotwica));
    return { x, y, kotwica };
  });
  // funkcje
  const krzywe = (opis.funkcje ?? []).map((f, i) => {
    const { fn } = kompiluj(parsuj(f.wzor), { stopnie: !!opis.stopnie });
    const kolor = KOLORY[i % KOLORY.length];
    let d = "", pioro = false, poprz = null;
    const slad = [];   // widoczne punkty krzywej w pikselach
    const N = 320;
    for (let j = 0; j <= N; j++) {
      const x = x0 + ((x1 - x0) * j) / N, y = fn({ x });
      if (!Number.isFinite(y) || y < y0 - (y1 - y0) * 3 || y > y1 + (y1 - y0) * 3) { pioro = false; poprz = null; continue; }
      const q = Math.min(Math.max(sy(y), -H), 2 * H);
      if (pioro && poprz !== null && Math.abs(q - poprz) > H) pioro = false;   // skok przez asymptotę
      d += `${pioro ? "L" : "M"}${r(sx(x))} ${r(q)}`;
      pioro = true;
      poprz = q;
      if (y >= y0 && y <= y1) slad.push([sx(x), sy(y)]);
    }
    return { f, kolor, d, slad };
  });
  for (const k of krzywe) czesci.push(`<path class="wykres" stroke="${k.kolor}" d="${k.d}"/>`);
  // podpis funkcji: wolne miejsce przy końcu krzywej, a gdy go nie ma – przy innym jej punkcie (bez nachodzenia na krzywe i podpisy)
  const wszystkie = krzywe.flatMap((k) => k.slad);
  const koliduje = (pr) => {
    if (pr[0] < M || pr[2] > W - M || pr[1] < M || pr[3] > H - M) return true;
    if (zajete.some((z) => pr[0] < z[2] + 2 && pr[2] > z[0] - 2 && pr[1] < z[3] + 1 && pr[3] > z[1] - 1)) return true;
    return wszystkie.some(([x, y]) => x > pr[0] - 2 && x < pr[2] + 2 && y > pr[1] - 2 && y < pr[3] + 2);
  };
  for (const { f, kolor, slad } of krzywe) {
    if (!f.podpis || !slad.length) continue;
    const proby = [];
    const n = slad.length;
    for (const ulamek of [1, 0.92, 0.84, 0.76, 0.66, 0.5, 0.34, 0.2, 0.08]) {
      const [px, py] = slad[Math.min(n - 1, Math.round((n - 1) * ulamek))];
      proby.push([px + 9, py + 4, "start"], [px - 9, py + 4, "end"], [px + 9, py - 8, "start"], [px - 9, py - 8, "end"], [px + 9, py + 18, "start"], [px - 9, py + 18, "end"]);
    }
    let miejsce = proby.find(([x, y, k]) => !koliduje(prostokat(x, y, f.podpis, k)));
    if (!miejsce) { const [lx, ly] = slad[n - 1]; miejsce = [Math.min(lx, W - M - 4), Math.max(ly - 8, M + 12), "end"]; }
    zajete.push(prostokat(...miejsce.slice(0, 2), f.podpis, miejsce[2]));
    czesci.push(`<text class="t" fill="${kolor}" x="${r(miejsce[0])}" y="${r(miejsce[1])}" text-anchor="${miejsce[2]}">${esc(f.podpis)}</text>`);
  }
  // punkty
  (opis.punkty ?? []).forEach((p, i) => {
    czesci.push(`<circle class="k" cx="${r(sx(p.x))}" cy="${r(sy(p.y))}" r="3.5"/>`);
    const l = podpisyPunktow[i];
    if (l) czesci.push(`<text class="t" x="${r(l.x)}" y="${r(l.y)}" text-anchor="${l.kotwica}">${esc(p.podpis)}</text>`);
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" class="wyk-svg" viewBox="0 0 ${W} ${H}">${czesci.join("")}</svg>`;
}

/** Element z rysunkiem i/lub wykresem karty albo null. */
export function rysunekKarty(w) {
  const elementy = [];
  if (w.rysunek) { const s = czyscSvg(w.rysunek); if (s) elementy.push(s); }
  if (w.wykres) {
    try { const s = czyscSvg(svgWykresu(w.wykres)); if (s) elementy.push(s); } catch { /* błędny wykres pomijamy; test go wyłapie */ }
  }
  return elementy.length ? el("figure", { class: "rys" }, ...elementy) : null;
}
