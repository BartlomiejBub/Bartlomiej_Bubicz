// Test widoku „Do szkoły”: lista klas i rozdziałów (assets/szkola.js) i pliki z materiałami rozdziałów (assets/klasy/).
//
// Użycie (w folderze repozytorium):
//   node tools/test-szkola.mjs                 wszystkie rozdziały, 200 zadań na generator
//   node tools/test-szkola.mjs sp5-figury 500  jeden rozdział, 500 zadań na generator
//
// Jeśli zmienna KATEX wskazuje plik katex (np. node_modules/katex/dist/katex.mjs), sprawdza też składnię wzorów.
//
// Plik rozdziału (assets/klasy/<klasa>/<nazwa>.js):
//   export default {
//     tematy: [{
//       id: "rodzaje-katow", nazwa: "Rodzaje kątów",
//       sciaga: [{ nazwa, slownie?, tex?, litery?, przyklad?, uwaga? }],   // karty ściągi: nazwa i (slownie albo tex)
//       jak: ["krok 1", "krok 2"],                                           // opcjonalnie: jak rozwiązywać typowe zadania
//       zadania: [{ nr, tresc, opcje: [4 albo 5], poprawna }],              // zamknięte (format jak assets/zadania/*.js, bez dzial/temat)
//       otwarte: [{ nr, punkty, tresc, rozwiazanie }],                      // otwarte z rozwiązaniem
//       generatory: [{ id, nazwa, opis, generuj(r) }],                      // kontrakt: assets/generatory/wspolne.js
//     }],
//   };
import { access } from "node:fs/promises";
import { KLASY } from "../assets/szkola.js";
import { sprawdzGeneratory, bledyTekstu, ladnaPodstawowka, ladnaLiceum } from "./sprawdz-generator.mjs";

const TYLKO = process.argv[2] && isNaN(process.argv[2]) ? process.argv[2] : null;
const ILE = Number([...process.argv.slice(2)].find((a) => !isNaN(a)) ?? 200);

let bledy = 0;
const blad = (gdzie, msg) => {
  bledy++;
  if (bledy <= 60) console.log(`  BŁĄD ${gdzie}: ${msg}`);
};
const tekst = (gdzie, s) => {
  if (typeof s !== "string" || !s.trim()) return blad(gdzie, "pusty tekst");
  for (const b of bledyTekstu(s)) blad(gdzie, b);
};

const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const POLA_KARTY = ["nazwa", "slownie", "tex", "litery", "przyklad", "uwaga"];
const POLA_TEMATU = ["id", "nazwa", "sciaga", "jak", "zadania", "otwarte", "generatory"];

// --- Lista klas i rozdziałów
const idki = new Set();
for (const k of KLASY) {
  if (!ID.test(k.id) || idki.has(k.id)) blad(k.id, "id klasy puste, z wielkimi literami albo powtórzone");
  idki.add(k.id);
  if (!["e8", "matura"].includes(k.egzamin) || !k.nazwa || !k.etap || !k.podrecznik) blad(k.id, "brak egzamin/nazwa/etap/podrecznik");
  for (const r of k.rozdzialy) {
    if (!ID.test(r.id) || idki.has(r.id) || !r.id.startsWith(`${k.id}-`)) blad(r.id, "id rozdziału złe albo powtórzone (musi zaczynać się od id klasy)");
    idki.add(r.id);
    if (!r.nr || !r.nazwa || !r.opis || !Array.isArray(r.lekcje) || !r.lekcje.length) blad(r.id, "brak nr/nazwa/opis/lekcje");
    if (r.plik !== undefined) {
      if (!new RegExp(`^${k.id}/[a-z0-9-]+\\.js$`).test(r.plik)) blad(r.id, `plik musi leżeć w folderze klasy: ${r.plik}`);
      try { await access(new URL(`../assets/klasy/${r.plik}`, import.meta.url)); } catch { blad(r.id, `brak pliku assets/klasy/${r.plik}`); }
    }
  }
}

// --- Materiały rozdziałów
const podsumowanie = [];
for (const k of KLASY) {
  for (const r of k.rozdzialy.filter((r) => r.plik && (!TYLKO || r.id === TYLKO))) {
    let m;
    try {
      m = (await import(`../assets/klasy/${r.plik}`)).default;
    } catch (e) {
      blad(r.id, `nie da się wczytać: ${e.message}`);
      continue;
    }
    if (!Array.isArray(m?.tematy) || !m.tematy.length) { blad(r.id, "brak listy tematów"); continue; }
    const tematy = new Set();
    const numery = new Set();
    const gens = [];
    let kart = 0, zadan = 0;
    for (const t of m.tematy) {
      const gt = `${r.id}/${t.id}`;
      if (!ID.test(t.id ?? "") || tematy.has(t.id)) blad(gt, "id tematu złe albo powtórzone");
      tematy.add(t.id);
      if (!t.nazwa) blad(gt, "brak nazwy tematu");
      for (const p of Object.keys(t)) if (!POLA_TEMATU.includes(p)) blad(gt, `nieznane pole ${p}`);
      if (!t.sciaga?.length) blad(gt, "pusta ściąga");
      for (const [i, w] of (t.sciaga ?? []).entries()) {
        const gw = `${gt} karta ${i + 1}`;
        for (const p of Object.keys(w)) if (!POLA_KARTY.includes(p)) blad(gw, `nieznane pole ${p}`);
        if (!w.nazwa || !(w.slownie || w.tex)) blad(gw, "karta potrzebuje nazwy i opisu słownego albo wzoru");
        for (const p of ["nazwa", "slownie", "litery", "przyklad", "uwaga"]) if (w[p] !== undefined) tekst(gw, w[p]);
        if (w.tex !== undefined) tekst(gw, `$${w.tex}$`);
        kart++;
      }
      for (const s of t.jak ?? []) tekst(`${gt} jak`, s);
      for (const z of t.zadania ?? []) {
        const gz = `${gt} zad. ${z.nr}`;
        if (!z.nr || numery.has(z.nr)) blad(gz, "brak albo powtórzony numer (numery w całym rozdziale)");
        numery.add(z.nr);
        for (const p of Object.keys(z)) if (!["nr", "tresc", "opcje", "poprawna", "czesci"].includes(p)) blad(gz, `nieznane pole ${p}`);
        tekst(gz, z.tresc);
        zadan++;
        if (z.czesci !== undefined) {   // zadanie z części (np. prawda/fałsz), jak w arkuszach egzaminu ósmoklasisty
          if (z.opcje !== undefined || z.poprawna !== undefined) blad(gz, "zadanie ma albo czesci, albo opcje i poprawna");
          if (!Array.isArray(z.czesci) || !z.czesci.length) { blad(gz, "pusta lista części"); continue; }
          for (const [i, c] of z.czesci.entries()) {
            const gc = `${gz} część ${i + 1}`;
            for (const p of Object.keys(c)) if (!["tekst", "litery", "opcje", "poprawna"].includes(p)) blad(gc, `nieznane pole ${p}`);
            if (typeof c.litery !== "string" || !/^[A-Z1-9]{2,5}$/.test(c.litery)) { blad(gc, `złe litery: ${c.litery}`); continue; }
            if (c.opcje !== undefined && (!Array.isArray(c.opcje) || c.opcje.length !== c.litery.length)) blad(gc, "opcji musi być tyle, ile liter");
            if (c.opcje === undefined && c.tekst === undefined) blad(gc, "część bez tekstu i bez opcji");
            if (!Number.isInteger(c.poprawna) || c.poprawna < 0 || c.poprawna >= c.litery.length) blad(gc, `zły indeks poprawnej odpowiedzi: ${c.poprawna}`);
            for (const s of [c.tekst, ...(c.opcje ?? [])].filter((s) => s !== undefined)) tekst(gc, s);
          }
          continue;
        }
        if (!Array.isArray(z.opcje) || z.opcje.length < 4 || z.opcje.length > 5) blad(gz, "potrzebne 4 albo 5 opcji");
        else if (new Set(z.opcje.map((o) => String(o).replace(/\s+/g, ""))).size !== z.opcje.length) blad(gz, "powtórzone opcje");
        if (!Number.isInteger(z.poprawna) || z.poprawna < 0 || z.poprawna >= (z.opcje?.length ?? 4)) blad(gz, `zły indeks poprawnej odpowiedzi: ${z.poprawna}`);
        for (const o of z.opcje ?? []) {
          tekst(gz, o);
          if (/^\s*[A-E][.)]\s/.test(o)) blad(gz, `opcja z literą (litery dodaje strona): ${o}`);
        }
      }
      for (const z of t.otwarte ?? []) {
        const gz = `${gt} otwarte zad. ${z.nr}`;
        if (!z.nr || numery.has(z.nr)) blad(gz, "brak albo powtórzony numer (numery w całym rozdziale)");
        numery.add(z.nr);
        for (const p of Object.keys(z)) if (!["nr", "punkty", "tresc", "rozwiazanie"].includes(p)) blad(gz, `nieznane pole ${p}`);
        if (!Number.isInteger(z.punkty) || z.punkty < 1 || z.punkty > 6) blad(gz, `zła liczba punktów: ${z.punkty}`);
        tekst(gz, z.tresc);
        tekst(gz, z.rozwiazanie);
        zadan++;
      }
      gens.push(...(t.generatory ?? []));
    }
    if (!gens.length) blad(r.id, "rozdział bez generatorów");
    sprawdzGeneratory(gens, {
      ile: ILE,
      ladna: k.egzamin === "e8" ? ladnaPodstawowka : ladnaLiceum,
      blad: (id, seed, msg) => blad(`${r.id} generator ${id} (ziarno ${seed})`, msg),
    });
    podsumowanie.push(`  ${r.id.padEnd(26)} tematów ${String(m.tematy.length).padStart(2)}, kart ${String(kart).padStart(3)}, zadań ${String(zadan).padStart(3)}, generatorów ${String(gens.length).padStart(2)}`);
  }
}

const gotowe = KLASY.map((k) => `${k.id}: ${k.rozdzialy.filter((r) => r.plik).length}/${k.rozdzialy.length}`).join(", ");
console.log(`Rozdziały z materiałami: ${gotowe}`);
if (podsumowanie.length) console.log(podsumowanie.join("\n"));
console.log(bledy ? `\nBłędów: ${bledy}` : "\nWszystko w porządku.");
process.exit(bledy ? 1 : 0);
