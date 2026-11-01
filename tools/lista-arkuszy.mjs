// Tworzy assets/arkusze/index.js (matura) albo assets/arkusze-e8/index.js (egzamin ósmoklasisty) z plików arkuszy w tym folderze, od najnowszych.
// Użycie (w folderze repozytorium): node tools/lista-arkuszy.mjs       albo   node tools/lista-arkuszy.mjs e8
// Nazwy plików: <rok>-<miesiąc>[-probna].js, np. 2024-maj.js, 2023-grudzien-probna.js; arkusz przykładowy na końcu.
import { readdir, writeFile } from "node:fs/promises";

const sciezka = process.argv[2] === "e8" ? "assets/arkusze-e8/" : "assets/arkusze/";
const folder = new URL(`../${sciezka}`, import.meta.url);
const MIESIACE = { styczen: 1, luty: 2, marzec: 3, kwiecien: 4, maj: 5, czerwiec: 6, lipiec: 7, sierpien: 8, wrzesien: 9, pazdziernik: 10, listopad: 11, grudzien: 12 };

const klucz = (id) => {
  const [rok, miesiac] = id.split("-");
  return Number(rok) * 100 + (MIESIACE[miesiac] ?? 0);   // przykładowy: miesiąc 0, więc na końcu roku
};

const arkusze = (await readdir(folder))
  .filter((f) => f.endsWith(".js") && !f.startsWith("_") && !["index.js", "tematy.js"].includes(f))
  .map((f) => f.slice(0, -3))
  .sort((a, b) => a.includes("przykladowy") - b.includes("przykladowy") || klucz(b) - klucz(a));

const nazwa = (id) => "a" + id.replace(/-/g, "_");
const tekst = `// Arkusze CKE, z których pochodzą zadania (od najnowszych). Plik tworzy: node tools/lista-arkuszy.mjs${process.argv[2] === "e8" ? " e8" : ""}
${arkusze.map((id) => `import ${nazwa(id)} from "./${id}.js";`).join("\n")}

export const ARKUSZE = [
${arkusze.map((id) => `  ${nazwa(id)},`).join("\n")}
];
`;
await writeFile(new URL("index.js", folder), tekst);
console.log(`${sciezka}index.js: ${arkusze.length} arkuszy – ${arkusze.join(", ")}`);
