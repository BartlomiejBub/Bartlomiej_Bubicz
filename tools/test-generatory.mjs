// Test generatorów zadań: poprawna budowa zadań, powtarzalność, "ładne" odpowiedzi i działające sprawdzanie.
//
// Użycie (w folderze repozytorium):
//   node tools/test-generatory.mjs              wszystkie działy, 300 zadań na generator
//   node tools/test-generatory.mjs liczby 1000  jeden dział, 1000 zadań na generator
//
// Jeśli zmienna KATEX wskazuje plik katex (np. node_modules/katex/dist/katex.mjs), sprawdza też składnię wzorów.
// Generatory rozdziałów klas sprawdza tools/test-szkola.mjs (tym samym kodem z tools/sprawdz-generator.mjs).
import { readdir } from "node:fs/promises";
import { sprawdzGeneratory, ladnaPodstawowka, ladnaLiceum } from "./sprawdz-generator.mjs";

const DZIALY = process.argv[2] && isNaN(process.argv[2])
  ? [process.argv[2]]
  : (await readdir(new URL("../assets/generatory/", import.meta.url)))
      .filter((f) => f.endsWith(".js") && f !== "wspolne.js")
      .map((f) => f.slice(0, -3));
const ILE = Number([...process.argv.slice(2)].find((a) => !isNaN(a)) ?? 300);

let bledy = 0;
const blad = (gen, seed, msg) => {
  bledy++;
  if (bledy <= 40) console.log(`  BŁĄD ${gen} (ziarno ${seed}): ${msg}`);
};

for (const nazwa of DZIALY) {
  let mod;
  try {
    mod = await import(`../assets/generatory/${nazwa}.js`);
  } catch (e) {
    console.log(`${nazwa}: nie udało się wczytać modułu – ${e.message}`);
    bledy++;
    continue;
  }
  const gens = mod.GENERATORY ?? [];
  console.log(`\n${nazwa}: ${gens.length} generatorów`);
  const ladna = nazwa.startsWith("e8-") ? ladnaPodstawowka : ladnaLiceum;
  for (const [id, roznych] of sprawdzGeneratory(gens, { ile: ILE, ladna, blad })) {
    console.log(`  ${id.padEnd(28)} ${roznych} różnych treści na ${ILE}`);
  }
}

console.log(bledy ? `\nBłędów: ${bledy}` : "\nWszystko w porządku.");
process.exit(bledy ? 1 : 0);
