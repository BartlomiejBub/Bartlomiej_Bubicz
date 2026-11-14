// Wspólne sprawdzanie generatorów zadań – używają go tools/test-generatory.mjs (działy egzaminu)
// i tools/test-szkola.mjs (rozdziały klas). Kontrakt generatora: assets/generatory/wspolne.js.
import { losownik, sprawdz, czytajLiczbe, czesciTekstu, Q } from "../assets/generatory/wspolne.js";

/** KaTeX do sprawdzania wzorów, gdy zmienna KATEX wskazuje katex.mjs; inaczej null. */
export const katex = process.env.KATEX ? (await import(new URL(`file:///${process.env.KATEX.replace(/\\/g, "/")}`))).default : null;

/** Teksty zadania z generatora, w których może być matematyka. */
function tekstyZadania(z) {
  return [z.tresc, z.wynik, ...(z.rozwiazanie ?? []), ...z.pola.flatMap((p) => [p.etykieta ?? "", ...(p.opcje ?? [])])];
}

/** Niesparowane $, podejrzane zapisy i (z KaTeX) błędy składni wzorów w tekście; zwraca listę problemów. */
export function bledyTekstu(t, { scisle = false } = {}) {
  const wynik = [];
  if ((t.match(/\$/g) ?? []).length % 2) wynik.push(`niesparowane $ w: ${t.slice(0, 100)}`);
  const podejrzane = scisle ? /NaN|undefined|Infinity|\[object|\+ -|- -|\+ \+|\b1x\b|\^\{1\}|\+\s*0x|--/ : /NaN|undefined|\[object/;
  if (podejrzane.test(t)) wynik.push(`podejrzany zapis: ${t.slice(0, 100)}`);
  if (katex) {
    for (const c of czesciTekstu(t).filter((c) => c.tex)) {
      try { katex.renderToString(c.s, { throwOnError: true }); } catch (e) { wynik.push(`KaTeX: ${e.message} w: ${c.s}`); }
    }
  }
  return wynik;
}

/**
 * Sprawdza listę generatorów: budowę zadań, powtarzalność (to samo ziarno – to samo zadanie), "ładne" odpowiedzi,
 * działające sprawdzanie (dobra odpowiedź przechodzi, zła nie) i różnorodność treści.
 * ladna(v) – czy liczba wymierna v nadaje się na odpowiedź; blad(id, ziarno, opis) – zgłasza błąd.
 * Zwraca listę [id, liczba różnych treści].
 */
export function sprawdzGeneratory(gens, { ile, ladna, blad }) {
  const idki = new Set();
  const wynik = [];
  for (const g of gens) {
    if (!g.id || !g.nazwa || !g.opis || typeof g.generuj !== "function") blad(g.id, "-", "brak id/nazwa/opis/generuj");
    if (idki.has(g.id)) blad(g.id, "-", "powtórzone id");
    idki.add(g.id);

    const tresci = new Set();
    for (let seed = 1; seed <= ile; seed++) {
      let z;
      try {
        z = g.generuj(losownik(seed));
      } catch (e) {
        blad(g.id, seed, `wyjątek: ${e.message}`);
        continue;
      }
      const z2 = g.generuj(losownik(seed));
      if (JSON.stringify(z2) !== JSON.stringify(z)) blad(g.id, seed, "inne zadanie dla tego samego ziarna (Math.random?)");

      if (typeof z.tresc !== "string" || !z.tresc.trim()) blad(g.id, seed, "pusta treść");
      if (typeof z.wynik !== "string" || !z.wynik.trim()) blad(g.id, seed, "brak pola wynik");
      if (!Array.isArray(z.rozwiazanie) || !z.rozwiazanie.length) blad(g.id, seed, "brak rozwiązania");
      if (!Array.isArray(z.pola) || !z.pola.length) { blad(g.id, seed, "brak pól odpowiedzi"); continue; }
      tresci.add(z.tresc);
      for (const t of tekstyZadania(z)) for (const b of bledyTekstu(t, { scisle: true })) blad(g.id, seed, b);

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
    if (tresci.size < Math.min(ile, 25)) blad(g.id, "-", `za mało różnych zadań: ${tresci.size} na ${ile}`);
    wynik.push([g.id, tresci.size]);
  }
  return wynik;
}

// Ósmoklasiści dodają ułamki o różnych mianownikach (np. 2/3 + 1/5 = 13/15), więc tam mianowniki mogą być większe,
// a ułamki dziesiętne mogą mieć do 4 cyfr po przecinku (mianownik dzieli 10 000, np. 0,045).
export const ladnaPodstawowka = (v) => Math.abs(v.n) <= 100000 && (v.d <= 40 || 10000 % v.d === 0);
export const ladnaLiceum = (v) => Math.abs(v.n) <= 100000 && v.d <= 12;
