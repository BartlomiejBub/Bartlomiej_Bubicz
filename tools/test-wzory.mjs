// Test kart wzorów (assets/wzory/<dzial>.js): budowa, tematy jak w arkusze/tematy.js i wzory (gdy KATEX wskazuje katex.mjs).
//
// Użycie (w folderze repozytorium):
//   node tools/test-wzory.mjs            wszystkie działy
//   node tools/test-wzory.mjs geometria  jeden dział
//
// Budowa pliku:
//   export const WZORY = [
//     { id: "planimetria", nazwa: "Planimetria",
//       wzory: [
//         { nazwa: "Pole trójkąta",
//           slownie: "Pole trójkąta to połowa iloczynu boku i wysokości opuszczonej na ten bok.",  // zwykłymi słowami
//           tex: "P = \\frac{1}{2} \\cdot a \\cdot h",                                            // wzór (KaTeX bez $)
//           litery: "$a$ – długość boku, $h$ – wysokość opuszczona na ten bok",                   // co znaczą litery
//           przyklad: "$a = 6$, $h = 4$, więc $P = \\frac{1}{2} \\cdot 6 \\cdot 4 = 12$",          // liczby podstawione do wzoru
//           uwaga: "…" },                                                                          // tylko typowy błąd lub ważny wyjątek
//       ],
//       jak: ["krok 1", "krok 2", …] },
//   ];
// Pola litery, przyklad i uwaga są opcjonalne. W tekstach wzory w $…$, pogrubienie **…**.
import { readdir } from "node:fs/promises";
import { czesciTekstu } from "../assets/generatory/wspolne.js";
import { TEMATY } from "../assets/arkusze/tematy.js";

const folder = new URL("../assets/wzory/", import.meta.url);
const pliki = process.argv[2] ? [`${process.argv[2]}.js`] : (await readdir(folder)).filter((f) => f.endsWith(".js"));
const katex = process.env.KATEX ? (await import(new URL(`file:///${process.env.KATEX.replace(/\\/g, "/")}`))).default : null;

let bledy = 0;
const blad = (gdzie, msg) => {
  bledy++;
  if (bledy <= 80) console.log(`  BŁĄD ${gdzie}: ${msg}`);
};

const tekst = (gdzie, s) => {
  if (typeof s !== "string" || !s.trim()) return blad(gdzie, "pusty tekst");
  if (s.split("$").length % 2 === 0) blad(gdzie, "nieparzysta liczba znaków $");
  if (katex) {
    for (const c of czesciTekstu(s).filter((c) => c.tex)) {
      try { katex.renderToString(c.s, { throwOnError: true }); } catch (e) { blad(gdzie, `KaTeX: ${e.message}`); }
    }
  }
};

for (const plik of pliki) {
  const dzial = plik.replace(/\.js$/, "");
  const { WZORY } = await import(new URL(plik, folder));
  const oczekiwane = (TEMATY[dzial] ?? []).map((t) => t.id);
  const ids = WZORY.map((t) => t.id);
  if (oczekiwane.length && ids.join() !== oczekiwane.join()) blad(plik, `tematy ${ids.join(", ")} zamiast ${oczekiwane.join(", ")}`);
  let ile = 0;
  for (const t of WZORY) {
    const g = `${plik}/${t.id}`;
    if (!t.nazwa) blad(g, "brak nazwy tematu");
    if (!Array.isArray(t.wzory) || !t.wzory.length) blad(g, "brak wzorów");
    for (const [i, w] of (t.wzory ?? []).entries()) {
      const gw = `${g}/${i + 1} (${w.nazwa})`;
      ile++;
      tekst(`${gw} nazwa`, w.nazwa);
      tekst(`${gw} slownie`, w.slownie);
      if (typeof w.tex !== "string" || !w.tex.trim() || w.tex.includes("$")) blad(gw, "tex musi być wzorem bez znaków $");
      else if (katex) {
        try { katex.renderToString(w.tex, { throwOnError: true, displayMode: true }); } catch (e) { blad(`${gw} tex`, `KaTeX: ${e.message}`); }
      }
      for (const pole of ["litery", "przyklad", "uwaga"]) if (w[pole] !== undefined) tekst(`${gw} ${pole}`, w[pole]);
      for (const pole of Object.keys(w)) if (!["nazwa", "slownie", "tex", "litery", "przyklad", "uwaga"].includes(pole)) blad(gw, `nieznane pole ${pole}`);
    }
    for (const [i, k] of (t.jak ?? []).entries()) tekst(`${g} jak ${i + 1}`, k);
  }
  console.log(`${plik}: ${WZORY.length} tematów, ${ile} wzorów`);
}

console.log(bledy ? `\n${bledy} błędów.` : "\nWszystko w porządku.");
process.exitCode = bledy ? 1 : 0;
