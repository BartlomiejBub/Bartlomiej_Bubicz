// Test generatorów zadań: poprawna budowa zadań, powtarzalność, "ładne" odpowiedzi i działające sprawdzanie.
//
// Użycie (w folderze repozytorium):
//   node tools/test-generatory.mjs              wszystkie działy, 300 zadań na generator
//   node tools/test-generatory.mjs liczby 1000  jeden dział, 1000 zadań na generator
//
// Jeśli zmienna KATEX wskazuje plik katex (np. node_modules/katex/dist/katex.mjs), sprawdza też składnię wzorów.
import { losownik, sprawdz, czytajLiczbe, czesciTekstu, Q } from "../assets/generatory/wspolne.js";

const DZIALY = process.argv[2] && isNaN(process.argv[2]) ? [process.argv[2]] : ["liczby", "funkcje"];
const ILE = Number([...process.argv.slice(2)].find((a) => !isNaN(a)) ?? 300);
const katex = process.env.KATEX ? (await import(new URL(`file:///${process.env.KATEX.replace(/\\/g, "/")}`))).default : null;

let bledy = 0;
const blad = (gen, seed, msg) => {
  bledy++;
  if (bledy <= 40) console.log(`  BŁĄD ${gen} (ziarno ${seed}): ${msg}`);
};

function tekstyZadania(z) {
  return [z.tresc, z.wynik, ...(z.rozwiazanie ?? []), ...z.pola.flatMap((p) => [p.etykieta ?? "", ...(p.opcje ?? [])])];
}

function ladna(v) {
  return Math.abs(v.n) <= 100000 && v.d <= 12;
}

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
  const idki = new Set();
  for (const g of gens) {
    if (!g.id || !g.nazwa || !g.opis || typeof g.generuj !== "function") blad(g.id, "-", "brak id/nazwa/opis/generuj");
    if (idki.has(g.id)) blad(g.id, "-", "powtórzone id");
    idki.add(g.id);

    const tresci = new Set();
    for (let seed = 1; seed <= ILE; seed++) {
      let z;
      try {
        z = g.generuj(losownik(seed));
      } catch (e) {
        blad(g.id, seed, `wyjątek: ${e.message}`);
        continue;
      }
      // Powtarzalność: to samo ziarno -> to samo zadanie.
      const z2 = g.generuj(losownik(seed));
      if (JSON.stringify(z2) !== JSON.stringify(z)) blad(g.id, seed, "inne zadanie dla tego samego ziarna (Math.random?)");

      if (typeof z.tresc !== "string" || !z.tresc.trim()) blad(g.id, seed, "pusta treść");
      if (typeof z.wynik !== "string" || !z.wynik.trim()) blad(g.id, seed, "brak pola wynik");
      if (!Array.isArray(z.rozwiazanie) || !z.rozwiazanie.length) blad(g.id, seed, "brak rozwiązania");
      if (!Array.isArray(z.pola) || !z.pola.length) { blad(g.id, seed, "brak pól odpowiedzi"); continue; }
      tresci.add(z.tresc);

      for (const t of tekstyZadania(z)) {
        if ((t.match(/\$/g) ?? []).length % 2) blad(g.id, seed, `niesparowane $ w: ${t}`);
        if (/NaN|undefined|Infinity|\[object|\+ -|- -|\+ \+|\b1x\b|\^\{1\}|\+\s*0x|--/.test(t)) blad(g.id, seed, `podejrzany zapis: ${t}`);
        if (katex) {
          for (const c of czesciTekstu(t).filter((c) => c.tex)) {
            try { katex.renderToString(c.s, { throwOnError: true }); } catch (e) { blad(g.id, seed, `KaTeX: ${e.message} w: ${c.s}`); }
          }
        }
      }

      // Odpowiedzi: czytelne, "ładne", a sprawdzanie przyjmuje poprawne i odrzuca złe.
      const wpisane = {}, zle = {};
      for (const p of z.pola) {
        const odp = z.odpowiedz?.[p.id];
        if (odp === undefined) { blad(g.id, seed, `brak odpowiedzi dla pola ${p.id}`); continue; }
        if (p.typ === "liczba") {
          const v = Q.z(odp);
          if (!ladna(v)) blad(g.id, seed, `brzydka odpowiedź ${p.id} = ${v}`);
          wpisane[p.id] = v.toString().replace("-", "−");
          zle[p.id] = v.add(1).toString();
          if (!czytajLiczbe(wpisane[p.id])?.eq(v)) blad(g.id, seed, `nie da się wpisać ${v}`);
        } else if (p.typ === "zbior") {
          if (!Array.isArray(odp) || odp.length !== p.ile) { blad(g.id, seed, `zbior ${p.id}: oczekiwano ${p.ile} wartości`); continue; }
          const vals = odp.map((x) => Q.z(x));
          if (vals.some((v) => !ladna(v))) blad(g.id, seed, `brzydka odpowiedź w zbiorze ${p.id}: ${vals.join("; ")}`);
          wpisane[p.id] = [...vals].reverse().map(String);
          zle[p.id] = vals.map((v, i) => (i === 0 ? v.add(1) : v).toString());
        } else if (p.typ === "wybor") {
          if (!Array.isArray(p.opcje) || !(odp >= 0 && odp < p.opcje.length)) { blad(g.id, seed, `wybor ${p.id}: zły indeks ${odp}`); continue; }
          wpisane[p.id] = odp;
          zle[p.id] = (odp + 1) % p.opcje.length;
        } else {
          blad(g.id, seed, `nieznany typ pola ${p.typ}`);
        }
      }
      if (!sprawdz(z, wpisane).poprawne) blad(g.id, seed, "poprawna odpowiedź nie przechodzi sprawdzania");
      for (const p of z.pola) {
        if (zle[p.id] === undefined) continue;
        if (sprawdz(z, { ...wpisane, [p.id]: zle[p.id] }).poprawne) blad(g.id, seed, `zła odpowiedź w polu ${p.id} przechodzi sprawdzanie`);
      }
    }
    const roznych = tresci.size;
    const minimum = Math.min(ILE, 25);
    if (roznych < minimum) blad(g.id, "-", `za mało różnych zadań: ${roznych} na ${ILE}`);
    console.log(`  ${g.id.padEnd(28)} ${roznych} różnych treści na ${ILE}`);
  }
}

console.log(bledy ? `\nBłędów: ${bledy}` : "\nWszystko w porządku.");
process.exit(bledy ? 1 : 0);
