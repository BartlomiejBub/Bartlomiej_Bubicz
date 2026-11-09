// Test plików z zadaniami przepisanymi z arkuszy CKE: matura (assets/arkusze/<arkusz>.js)
// i egzamin ósmoklasisty (assets/arkusze-e8/<arkusz>.js).
// Sprawdza budowę, tematy, wzory (gdy KATEX wskazuje katex.mjs) i czy pliki rysunków istnieją.
//
// Użycie (w folderze repozytorium):
//   node tools/test-arkusze.mjs                 wszystkie arkusze
//   node tools/test-arkusze.mjs 2024-maj        jeden arkusz matury
//   node tools/test-arkusze.mjs e8/2025-maj     jeden arkusz egzaminu ósmoklasisty
//
// Budowa pliku arkusza:
//   export default {
//     nazwa: "Matura maj 2024",
//     zadania: [
//       { nr: "22", dzial: "geometria", temat: "planimetria",
//         wstep: "…",                          // tylko wspólny wstęp zadań typu 12.1, 12.2 (może mieć [rysunek])
//         tresc: "W trójkącie $ABC$ … (zobacz rysunek).\n\n[rysunek]\n\n**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**\n\nMiara kąta ostrego $BAS$ jest równa",
//         opcje: ["$42^\\circ$", "$45^\\circ$", "$48^\\circ$", "$69^\\circ$"],   // bez liter A–D; 4 albo 5 opcji (A–E)
//         poprawna: 2,                         // 0 = A … 3 = D, z klucza CKE
//         rysunek: "assets/arkusze/rys/2024-maj-22.png" },
//       // Zadanie z kilku części (egzamin ósmoklasisty) – zamiast opcje i poprawna jest lista części:
//       { nr: "12", dzial: "e8-liczby", temat: "os-liczbowa", tresc: "… **Oceń prawdziwość podanych zdań.** …",
//         czesci: [
//           { tekst: "Współrzędna punktu $C$ jest liczbą parzystą.", litery: "PF", poprawna: 0 },        // P/F: same litery
//           { tekst: "Aldona odłożyła łącznie", litery: "AB", opcje: ["$50$ zł.", "$60$ zł."], poprawna: 1 }, // uzupełnianie
//           { tekst: "Czy …?", litery: "TN", opcje: ["Tak", "Nie"], poprawna: 0 },                         // T/N, a potem
//           { litery: "ABC", opcje: ["…", "…", "…"], poprawna: 2 },                                         // uzasadnienie
//         ] },
//     ],
//     otwarte: [                               // zadania otwarte z rozwiązaniem z klucza – opcjonalnie
//       { nr: "3", dzial: "dowody", temat: "dowody-algebraiczne", punkty: 2,
//         tresc: "Wykaż, że …",                // jak wyżej, może mieć wstep, [rysunek] i rysunek
//         rozwiazanie: "Przekształcamy …",     // pierwsze przykładowe pełne rozwiązanie z klucza CKE
//         rysunekRozwiazania: "…" },           // opcjonalnie rysunek z klucza: [rysunek] w rozwiązaniu
//     ],
//   };
import { readdir, access } from "node:fs/promises";
import { czesciTekstu } from "../assets/generatory/wspolne.js";
import { TEMATY } from "../assets/arkusze/tematy.js";

// Ten sam format mają zadania do ćwiczeń ułożone dla strony (assets/zadania/<dział>.js, argument np. zadania/liczby).
const FOLDERY = {
  "": new URL("../assets/arkusze/", import.meta.url),
  "e8/": new URL("../assets/arkusze-e8/", import.meta.url),
  "zadania/": new URL("../assets/zadania/", import.meta.url),
};
const repo = new URL("../", import.meta.url);
const pliki = [];
for (const [przedrostek, folder] of Object.entries(FOLDERY)) {
  const nazwy = (await readdir(folder).catch(() => [])).filter((f) => f.endsWith(".js") && !["index.js", "tematy.js"].includes(f));
  for (const f of nazwy) {
    if (!process.argv[2] || process.argv[2] === `${przedrostek}${f.slice(0, -3)}`) pliki.push({ plik: `${przedrostek}${f}`, url: new URL(f, folder) });
  }
}
const katex = process.env.KATEX ? (await import(new URL(`file:///${process.env.KATEX.replace(/\\/g, "/")}`))).default : null;

let bledy = 0;
const blad = (gdzie, msg) => {
  bledy++;
  if (bledy <= 80) console.log(`  BŁĄD ${gdzie}: ${msg}`);
};

/** Niepusty tekst z poprawnymi wzorami $…$. */
function sprawdzTekst(gdzie, s) {
  if (typeof s !== "string" || !s.trim()) return blad(gdzie, "pusty tekst");
  if ((s.match(/\$/g) ?? []).length % 2) blad(gdzie, `niesparowane $ w: ${s.slice(0, 80)}`);
  if (/NaN|undefined|\[object/.test(s)) blad(gdzie, `podejrzany zapis: ${s.slice(0, 80)}`);
  if (katex) {
    for (const c of czesciTekstu(s).filter((c) => c.tex)) {
      try { katex.renderToString(c.s, { throwOnError: true }); } catch (e) { blad(gdzie, `KaTeX: ${e.message} w: ${c.s}`); }
    }
  }
}

function sprawdzCzesci(gdzie, z) {
  if (z.opcje !== undefined || z.poprawna !== undefined) blad(gdzie, "zadanie ma albo czesci, albo opcje i poprawna");
  if (!Array.isArray(z.czesci) || !z.czesci.length) return blad(gdzie, "pusta lista części");
  for (const [i, c] of z.czesci.entries()) {
    const gc = `${gdzie} część ${i + 1}`;
    for (const pole of Object.keys(c)) if (!["tekst", "litery", "opcje", "poprawna"].includes(pole)) blad(gc, `nieznane pole ${pole}`);
    if (typeof c.litery !== "string" || !/^[A-Z1-9]{2,5}$/.test(c.litery)) { blad(gc, `złe litery: ${c.litery}`); continue; }
    if (c.opcje !== undefined && (!Array.isArray(c.opcje) || c.opcje.length !== c.litery.length)) blad(gc, "opcji musi być tyle, ile liter");
    if (c.opcje === undefined && c.tekst === undefined) blad(gc, "część bez tekstu i bez opcji");
    if (!Number.isInteger(c.poprawna) || c.poprawna < 0 || c.poprawna >= c.litery.length) blad(gc, `zły indeks poprawnej odpowiedzi: ${c.poprawna}`);
    for (const t of [c.tekst, ...(c.opcje ?? [])].filter((t) => t !== undefined)) sprawdzTekst(gc, t);
  }
}

for (const { plik, url } of pliki) {
  let arkusz;
  try {
    arkusz = (await import(url)).default;
  } catch (e) {
    blad(plik, `nie da się wczytać: ${e.message}`);
    continue;
  }
  if (!arkusz?.nazwa || !Array.isArray(arkusz.zadania) || !(arkusz.zadania.length || arkusz.otwarte?.length)) {
    blad(plik, "brak nazwy albo listy zadań");
    continue;
  }
  const numery = new Set();
  const naDzial = {};
  for (const z of arkusz.zadania) {
    const gdzie = `${plik} zad. ${z.nr}`;
    if (!z.nr || numery.has(z.nr)) blad(gdzie, "brak albo powtórzony numer zadania");
    numery.add(z.nr);
    const tematy = TEMATY[z.dzial];
    if (!tematy) blad(gdzie, `nieznany dział ${z.dzial}`);
    else if (!tematy.some((t) => t.id === z.temat)) blad(gdzie, `nieznany temat ${z.temat} w dziale ${z.dzial}`);
    naDzial[z.dzial] = (naDzial[z.dzial] ?? 0) + 1;
    if (typeof z.tresc !== "string" || !z.tresc.trim()) blad(gdzie, "pusta treść");
    if (z.czesci !== undefined) sprawdzCzesci(gdzie, z);
    else {
      if (!Array.isArray(z.opcje) || z.opcje.length < 4 || z.opcje.length > 5) blad(gdzie, "potrzebne 4 albo 5 opcji");
      else if (new Set(z.opcje.map((o) => String(o).replace(/\s+/g, ""))).size !== z.opcje.length) blad(gdzie, "powtórzone opcje");
      if (!Number.isInteger(z.poprawna) || z.poprawna < 0 || z.poprawna >= (z.opcje?.length ?? 4)) blad(gdzie, `zły indeks poprawnej odpowiedzi: ${z.poprawna}`);
    }
    const zRysunkiem = [z.wstep, z.tresc].some((t) => t?.includes("[rysunek]"));
    if (zRysunkiem && !z.rysunek) blad(gdzie, "jest [rysunek], ale brak pola rysunek");
    if (z.rysunek) {
      if (!zRysunkiem) blad(gdzie, "jest rysunek, ale w treści brak znacznika [rysunek]");
      try { await access(new URL(z.rysunek, repo)); } catch { blad(gdzie, `brak pliku ${z.rysunek}`); }
    }
    for (const s of [z.wstep, z.tresc, ...(z.opcje ?? [])].filter((s) => s !== undefined)) {
      sprawdzTekst(gdzie, s);
      if ((z.opcje ?? []).includes(s) && /^\s*[A-E][.)]\s/.test(s)) blad(gdzie, `opcja z literą (litery dodaje strona): ${s}`);
    }
  }
  for (const z of arkusz.otwarte ?? []) {
    const gdzie = `${plik} otwarte zad. ${z.nr}`;
    if (!z.nr || numery.has(z.nr)) blad(gdzie, "brak albo powtórzony numer zadania");
    numery.add(z.nr);
    if (!TEMATY[z.dzial]?.some((t) => t.id === z.temat)) blad(gdzie, `nieznany dział/temat ${z.dzial}/${z.temat}`);
    if (!Number.isInteger(z.punkty) || z.punkty < 1 || z.punkty > 6) blad(gdzie, `zła liczba punktów: ${z.punkty}`);
    for (const pole of Object.keys(z)) if (!["nr", "dzial", "temat", "punkty", "wstep", "tresc", "rysunek", "rozwiazanie", "rysunekRozwiazania"].includes(pole)) blad(gdzie, `nieznane pole ${pole}`);
    const zRysunkiem = [z.wstep, z.tresc].some((t) => t?.includes("[rysunek]"));
    if (zRysunkiem !== Boolean(z.rysunek)) blad(gdzie, "znacznik [rysunek] i pole rysunek muszą występować razem");
    if (z.rysunek) { try { await access(new URL(z.rysunek, repo)); } catch { blad(gdzie, `brak pliku ${z.rysunek}`); } }
    if (Boolean(z.rozwiazanie?.includes("[rysunek]")) !== Boolean(z.rysunekRozwiazania)) blad(gdzie, "znacznik [rysunek] w rozwiązaniu i pole rysunekRozwiazania muszą występować razem");
    if (z.rysunekRozwiazania) { try { await access(new URL(z.rysunekRozwiazania, repo)); } catch { blad(gdzie, `brak pliku ${z.rysunekRozwiazania}`); } }
    for (const s of [z.wstep, z.tresc, z.rozwiazanie].filter((s, i) => s !== undefined || i > 0)) sprawdzTekst(gdzie, s);
  }
  if (arkusz.otwarte?.length) console.log(`${plik}: ${arkusz.otwarte.length} zadań otwartych`);
  console.log(`${plik}: ${arkusz.nazwa}, ${arkusz.zadania.length} zadań (${Object.entries(naDzial).map(([d, n]) => `${d} ${n}`).join(", ")})`);
}

console.log(bledy ? `\nBłędów: ${bledy}` : "\nWszystko w porządku.");
process.exit(bledy ? 1 : 0);
