// Robi PDF-y kart pracy z plików HTML w tools/karty/: wzory w $…$ rysuje KaTeX, PDF drukuje Edge.
//
// Użycie (w folderze repozytorium, z Node.js i przeglądarką Edge):
//   npm install katex@0.16.9 --no-save
//   node tools/zrob-karty.mjs                     wszystkie karty
//   node tools/zrob-karty.mjs funkcje-i-ciagi     jedna karta
// PDF-y trafiają do folderu karty/. Zmienna KATEX może wskazać inny katex.mjs, a EDGE – msedge.exe.
import { readFile, writeFile, rm, readdir, mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join, resolve } from "node:path";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const zrodla = join(repo, "tools", "karty");
const cel = join(repo, "karty");
const edge = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";

const katexMjs = process.env.KATEX
  ?? join(dirname(createRequire(join(repo, "package.json")).resolve("katex")), "katex.mjs");
const katex = (await import(pathToFileURL(katexMjs).href)).default;
const katexCss = pathToFileURL(join(dirname(katexMjs), "katex.min.css")).href;

/** Zamienia każde $…$ na gotowy HTML wzoru; błąd w składni wzoru zatrzymuje skrypt. */
const wzory = (html) => html.replace(/\$([^$]+)\$/g, (_, tex) => katex.renderToString(tex, { throwOnError: true }));

await mkdir(cel, { recursive: true });
const wybrane = process.argv.slice(2);
const pliki = (await readdir(zrodla)).filter((f) => f.endsWith(".html") && !f.startsWith("_"));

for (const plik of pliki) {
  const nazwa = plik.replace(/\.html$/, "");
  if (wybrane.length && !wybrane.includes(nazwa)) continue;

  const html = wzory(await readFile(join(zrodla, plik), "utf8"))
    .replace("<head>", `<head>\n<link rel="stylesheet" href="${katexCss}">`);
  const tymczasowy = join(zrodla, `_${nazwa}.html`);   // obok karta.css, żeby link do stylu działał
  const pdf = join(cel, `${nazwa}.pdf`);
  await writeFile(tymczasowy, html);
  try {
    execFileSync(edge, [
      "--headless=new",
      "--disable-gpu",
      "--allow-file-access-from-files",        // fonty KaTeX z dysku
      `--user-data-dir=${join(tmpdir(), "zrob-karty-edge")}`,
      "--no-pdf-header-footer",
      "--virtual-time-budget=10000",           // czas na wczytanie fontów przed drukiem
      `--print-to-pdf=${pdf}`,
      pathToFileURL(tymczasowy).href,
    ], { stdio: "ignore" });
  } finally {
    await rm(tymczasowy, { force: true });
  }
  console.log(`karty/${nazwa}.pdf`);
}
