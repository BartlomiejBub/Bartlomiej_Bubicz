// Generatory zadań z działu "Liczby i równania" (matura podstawowa, formuła 2023).
// Zadania powstają od końca: najpierw ładna odpowiedź, potem treść. Kontrakt – zob. wspolne.js.
import { Q, q, texNawias, wielomianTex, plusMinus, tysiace } from "./wspolne.js";

// --- Pomocnicze

/** Liczba (Q, całkowita albo tekst "3/2") w LaTeX. */
const tex = (x) => Q.z(x).tex();

function nwd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

/** Losowanie z wagami: zWagami(r, [[0.7, "a"], [0.3, "b"]]). */
function zWagami(r, pary) {
  let x = r.next() * pary.reduce((s, [w]) => s + w, 0);
  for (const [w, v] of pary) if ((x -= w) < 0) return v;
  return pary[pary.length - 1][1];
}

/**
 * Zapis dziesiętny z przecinkiem: 1.5 -> "1{,}5" (LaTeX) albo "1,5" (tekst).
 * Od 10 000 wzwyż tysiące oddziela odstęp: "10\,000" w LaTeX, "10 000" w tekście (jak tysiace()).
 */
function dziesietnie(x, wTex = true) {
  const v = Q.z(x);
  let k = 0;
  while ((10 ** k) % v.d !== 0) if (++k > 6) throw new Error(`${v} nie ma skończonego rozwinięcia dziesiętnego`);
  const cyfry = String(Math.abs(v.n) * (10 ** k / v.d)).padStart(k + 1, "0");
  let cal = cyfry.slice(0, cyfry.length - k);
  if (cal.length > 4) cal = wTex ? cal.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : tysiace(cal);
  const reszta = k ? (wTex ? "{,}" : ",") + cyfry.slice(cyfry.length - k) : "";
  return (v.ujemna ? "-" : "") + cal + reszta;
}

/** Kwota do tekstu: 11236 -> "11 236", 1236 -> "1236". */
const kwota = (x) => dziesietnie(x, false);
/** Kwota lub ułamek dziesiętny w LaTeX: "11\,236", "1{,}06". */
const dz = (x) => dziesietnie(x, true);
/** Współczynnik dziesiętny przy zmiennej: 1 -> "x", -1 -> "-x", 0.1 -> "0{,}1 x" (KaTeX pomija spację). */
const dzRazy = (c, lit = "x") => (Q.z(c).eq(1) ? lit : Q.z(c).eq(-1) ? `-${lit}` : `${dz(c)} ${lit}`);

/** Czy liczebnik łączy się z dopełniaczem l.mn.: "5 drzew", "12 drzew" (ale "2 drzewa", "1 drzewo"). */
const zDopelniaczem = (n) => n !== 1 && !([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100));

/** Czy dodatnia liczba całkowita x jest potęgą liczby a (także a^0 = 1). */
function jestPotega(x, a) {
  while (x > 1 && x % a === 0) x /= a;
  return x === 1;
}

/** Potęga w LaTeX; podstawa ułamkowa w nawiasie: \left(\frac{1}{16}\right)^{8}. */
function potegaTex(podstawa, wykladnik) {
  const b = Q.z(podstawa);
  const w = typeof wykladnik === "string" ? wykladnik : tex(wykladnik);
  return b.calkowita && !b.ujemna ? `${b.tex()}^{${w}}` : `\\left(${b.tex()}\\right)^{${w}}`;
}

/** Suma liczb w LaTeX z poprawnymi znakami: [-32, 48, -6] -> "-32 + 48 - 6". */
const sumaTex = (liczby) => liczby.map((x, i) => (i === 0 ? tex(x) : plusMinus(x))).join(" ");

/** ax + b w LaTeX; przy a < 0 < b w kolejności CKE: liniowy(-2, 3) -> "3 - 2x". */
function liniowy(a, b) {
  if (a < 0 && b > 0) return `${b} - ${a === -1 ? "" : -a}x`;
  return wielomianTex([a, b]);
}

/** Pole na jedną liczbę. */
const poleLiczba = (id, etykieta) => ({ id, typ: "liczba", etykieta });

// --- Potęgi

// Podstawy będące potęgami liczby pierwszej p: [podstawa, e], gdzie podstawa = p^e.
const PODSTAWY = {
  2: [[4, 2], [8, 3], [16, 4], [32, 5], [q(1, 2), -1], [q(1, 4), -2], [q(1, 8), -3], [q(1, 16), -4]],
  3: [[9, 2], [27, 3], [81, 4], [q(1, 3), -1], [q(1, 9), -2], [q(1, 27), -3]],
  5: [[25, 2], [125, 3], [q(1, 5), -1], [q(1, 25), -2]],
};

/** Treść "zapisz w postaci p^k" – trzy wersje. */
function trescWykladnik(r, wyr, p) {
  return r.pick([
    `Liczbę $${wyr}$ można zapisać w postaci $${p}^{k}$, gdzie $k$ jest liczbą całkowitą. Oblicz $k$.`,
    `Liczba $${wyr}$ jest równa $${p}^{k}$. Wyznacz liczbę całkowitą $k$.`,
    `Zapisz liczbę $${wyr}$ w postaci potęgi $${p}^{k}$ i podaj wykładnik $k$.`,
  ]);
}

/** (1/16)^8 · 8^16 = 2^16: iloczyn lub iloraz potęg o podstawach będących potęgami tej samej liczby. */
function potegiIloczyn(r) {
  const p = r.pick([2, 2, 3, 5]);
  for (;;) {
    const ile = r.chance(0.6) ? 2 : 3;
    const iloraz = ile === 3 ? r.chance(0.7) : r.chance(0.25);   // ostatni czynnik idzie do mianownika
    const czynniki = r.shuffle(PODSTAWY[p]).slice(0, ile).map(([b, e]) => ({ b, e, m: r.int(2, p === 5 ? 6 : 10) }));
    const mian = iloraz ? czynniki[ile - 1] : null;
    if (mian && mian.e < 0) continue;   // w mianowniku tylko podstawa całkowita
    for (const c of czynniki) if (c !== mian && c.e > 0 && r.chance(0.2)) c.m = -c.m;   // czasem ujemny wykładnik
    const wyk = czynniki.map((c) => (c === mian ? -1 : 1) * c.e * c.m);
    const k = wyk.reduce((s, x) => s + x, 0);
    if (Math.abs(k) < 2 || Math.abs(k) > 60) continue;

    const sklej = (t) => (iloraz ? `\\frac{${t.slice(0, -1).join(" \\cdot ")}}{${t[ile - 1]}}` : t.join(" \\cdot "));
    const wyr = sklej(czynniki.map((c) => potegaTex(c.b, c.m)));
    const doP = sklej(czynniki.map((c) => `\\left(${p}^{${c.e}}\\right)^{${c.m}}`));
    const poP = sklej(czynniki.map((c) => `${p}^{${c.e * c.m}}`));
    const regula = iloraz
      ? "Przy mnożeniu potęg o tej samej podstawie wykładniki dodajemy, a przy dzieleniu odejmujemy"
      : "Przy mnożeniu potęg o tej samej podstawie wykładniki dodajemy";
    return {
      tresc: trescWykladnik(r, wyr, p),
      pola: [poleLiczba("k", "$k =$")],
      odpowiedz: { k },
      wynik: `$k = ${k}$`,
      rozwiazanie: [
        `Zapisz podstawy jako potęgi liczby $${p}$: ${czynniki.map((c) => `$${tex(c.b)} = ${p}^{${c.e}}$`).join(", ")}.`,
        `$${wyr} = ${doP} = ${poP}$`,
        `${regula}: $${p}^{${sumaTex(wyk)}} = ${p}^{${k}}$, więc $k = ${k}$.`,
      ],
    };
  }
}

// Ilorazy sum potęg a^(n+o): l – licznik, m – mianownik, składniki [znak, o].
const SUMY_POTEG = [
  { l: [[1, 0], [1, 1], [1, 2]], m: [[1, 0]] },
  { l: [[1, 0], [1, 1], [1, 2]], m: [[1, -1]] },
  { l: [[1, 0], [1, 1]], m: [[1, -1]] },
  { l: [[1, 2], [-1, 0]], m: [[1, 0]] },
  { l: [[1, 1], [1, 0]], m: [[1, 1], [-1, 0]] },
  { l: [[1, 2], [-1, 0]], m: [[1, 1], [1, 0]] },
  { l: [[1, 2], [-1, 0]], m: [[1, 1], [-1, 0]] },
];

/** (5^12 + 5^13 + 5^14) / 5^12 = 31: iloraz sum potęg tej samej liczby. */
function potegiSuma(r) {
  const { l, m } = r.pick(SUMY_POTEG);
  const a = r.pick([2, 3, 4, 5, 6, 7, 10]);
  const n = r.int(8, 25);
  const wartoscSumy = (s) => s.reduce((acc, [z, o]) => acc.add(q(a).pow(o).mul(z)), q(0));
  const N = wartoscSumy(l);
  const D = wartoscSumy(m);
  const wartosc = N.div(D);
  const znak = (z, i) => (i === 0 ? (z < 0 ? "-" : "") : z < 0 ? " - " : " + ");
  const sumaPoteg = (s) => s.map(([z, o], i) => `${znak(z, i)}${a}^{${n + o}}`).join("");
  const wNawiasie = (s) => s.map(([z, o], i) => `${znak(z, i)}${o === 0 ? 1 : o === 1 ? a : `${a}^{${o}}`}`).join("");
  const wyr = `\\frac{${sumaPoteg(l)}}{${sumaPoteg(m)}}`;
  const licznik = `${a}^{${n}} \\cdot ${tex(N)}`;

  const kroki = [`W liczniku wyłącz przed nawias $${a}^{${n}}$: $${sumaPoteg(l)} = ${a}^{${n}}(${wNawiasie(l)}) = ${licznik}$.`];
  if (m.length === 1) {
    const o = m[0][1];
    kroki.push(o === 0
      ? `$W = \\frac{${licznik}}{${a}^{${n}}} = ${tex(wartosc)}$`
      : `$W = \\frac{${licznik}}{${a}^{${n + o}}} = ${a} \\cdot ${tex(N)} = ${tex(wartosc)}$`);
  } else {
    kroki.push(`W mianowniku też wyłącz $${a}^{${n}}$: $${sumaPoteg(m)} = ${a}^{${n}}(${wNawiasie(m)}) = ${a}^{${n}} \\cdot ${tex(D)}$.`);
    const ulamek = D.eq(1) ? tex(N) : `\\frac{${tex(N)}}{${tex(D)}}`;
    const koniec = ulamek === tex(wartosc) ? "" : ` = ${tex(wartosc)}`;
    kroki.push(`$W = \\frac{${licznik}}{${a}^{${n}} \\cdot ${tex(D)}} = ${ulamek}${koniec}$`);
  }
  return {
    tresc: r.pick([
      `Oblicz wartość wyrażenia $W = ${wyr}$.`,
      `Oblicz $W$, jeżeli $W = ${wyr}$.`,
      `Wyznacz wartość liczby $W = ${wyr}$.`,
    ]),
    pola: [poleLiczba("w", "$W =$")],
    odpowiedz: { w: wartosc },
    wynik: `$W = ${tex(wartosc)}$`,
    rozwiazanie: kroki,
  };
}

// Sumy jednakowych potęg: [p, b, j, możliwe liczby składników], gdzie b = p^j.
const SUMY_JEDNAKOWYCH = [
  [2, 2, 1, [2, 4]], [2, 4, 2, [2, 4]], [2, 8, 3, [2, 4]],
  [3, 3, 1, [3]], [3, 9, 2, [3]], [3, 27, 3, [3]],
  [5, 5, 1, [5]], [5, 25, 2, [5]],
];
const ILE_SKLADNIKOW = { 2: "dwa jednakowe składniki", 3: "trzy jednakowe składniki", 4: "cztery jednakowe składniki", 5: "pięć jednakowych składników" };

/** 3^20 + 3^20 + 3^20 = 3^21: suma jednakowych potęg jako jedna potęga liczby p. */
function potegiJednakowe(r) {
  const [p, b, j, ile] = r.pick(SUMY_JEDNAKOWYCH);
  const t = r.pick(ile);
  const n = r.int(4, p === 5 ? 12 : 20);
  const wt = t === p ? 1 : 2;   // t = p^wt
  const k = j * n + wt;
  const wyr = Array(t).fill(`${b}^{${n}}`).join(" + ");
  const kroki = [];
  if (b !== p) kroki.push(`$${b}^{${n}} = \\left(${p}^{${j}}\\right)^{${n}} = ${p}^{${j * n}}$`);
  const posrednio = t === p ? "" : ` = ${p}^{${wt}} \\cdot ${p}^{${j * n}}`;
  kroki.push(`Dodajemy ${ILE_SKLADNIKOW[t]}: $${wyr} = ${t} \\cdot ${p}^{${j * n}}${posrednio} = ${p}^{${k}}$.`);
  kroki.push(`Zatem $k = ${k}$.`);
  return {
    tresc: trescWykladnik(r, wyr, p),
    pola: [poleLiczba("k", "$k =$")],
    odpowiedz: { k },
    wynik: `$k = ${k}$`,
    rozwiazanie: kroki,
  };
}

// --- Pierwiastki

/** c·√m w LaTeX: pierw(1, 2) -> "\sqrt{2}", pierw(-3, 2) -> "-3\sqrt{2}". */
function pierw(c, m) {
  const s = `\\sqrt{${m}}`;
  return c === 1 ? s : c === -1 ? `-${s}` : `${c}${s}`;
}

/** Zadanie "oblicz wartość wyrażenia" z jednym polem (trzy wersje treści). */
function zadanieWartosc(r, wyr, wartosc, rozwiazanie) {
  return {
    tresc: r.pick([`Oblicz wartość wyrażenia $${wyr}$.`, `Oblicz $${wyr}$.`, `Wyznacz wartość wyrażenia $${wyr}$.`]),
    pola: [poleLiczba("w", "Wartość wyrażenia")],
    odpowiedz: { w: wartosc },
    wynik: `$${wyr} = ${tex(wartosc)}$`,
    rozwiazanie,
  };
}

/** (√32 − √2)² = 18: kwadrat sumy lub różnicy pierwiastków po wyłączeniu czynnika przed pierwiastek. */
function pierwKwadrat(r) {
  const m = r.pick([2, 3, 5, 6, 7]);
  let a, b;
  do {
    a = r.int(1, 6);
    b = r.int(1, 6);
  } while (a === b || a * a * m > 300 || b * b * m > 300);
  const minus = r.chance(0.65);
  const z = minus ? "-" : "+";
  const c = minus ? a - b : a + b;
  const wartosc = c * c * m;
  const wyr = `(\\sqrt{${a * a * m}} ${z} \\sqrt{${b * b * m}})^{2}`;
  const wylacz = [a, b].filter((x) => x > 1).map((x) => `$\\sqrt{${x * x * m}} = \\sqrt{${x * x} \\cdot ${m}} = ${pierw(x, m)}$`);
  const kwadrat = Math.abs(c) === 1 ? `${wartosc}` : `${c * c} \\cdot ${m} = ${wartosc}`;
  return zadanieWartosc(r, wyr, wartosc, [
    `Wyłącz czynnik przed znak pierwiastka: ${wylacz.join(", ")}.`,
    `$${wyr} = (${pierw(a, m)} ${z} ${pierw(b, m)})^{2} = (${pierw(c, m)})^{2} = ${kwadrat}$`,
  ]);
}

/** (2√3 − √5)(2√3 + √5) = 7: iloczyn różnicy i sumy (wzór skróconego mnożenia). */
function pierwSprzezenie(r) {
  for (;;) {
    const c = r.pick([1, 1, 2, 3]);
    const m = r.pick([2, 3, 5, 6, 7, 10, 11]);
    let drugi, drugiKw, kw;
    if (r.chance(0.55)) {
      const d = r.int(1, 6);
      [drugi, drugiKw, kw] = [String(d), `${d}^{2}`, d * d];
    } else {
      const e = r.pick([1, 1, 2]);
      const n = r.pick([2, 3, 5, 6, 7].filter((x) => x !== m));
      [drugi, drugiKw, kw] = [pierw(e, n), `(${pierw(e, n)})^{2}`, e * e * n];
    }
    const wartosc = c * c * m - kw;
    if (wartosc === 0) continue;
    const pierwszy = pierw(c, m);
    const roznica = `(${pierwszy} - ${drugi})`;
    const suma = `(${pierwszy} + ${drugi})`;
    const wyr = r.chance(0.5) ? roznica + suma : suma + roznica;
    return zadanieWartosc(r, wyr, wartosc, [
      "Skorzystaj ze wzoru $(a - b)(a + b) = a^{2} - b^{2}$.",
      `$${wyr} = (${pierwszy})^{2} - ${drugiKw} = ${c * c * m} - ${kw} = ${wartosc}$`,
    ]);
  }
}

// Potęgi o wykładniku ujemnym lub wymiernym: [zapis, wartość, obliczenie].
const POTEGI_PROSTE = [
  ["2^{-1}", q(1, 2), "2^{-1} = \\frac{1}{2}"],
  ["2^{-2}", q(1, 4), "2^{-2} = \\frac{1}{2^{2}} = \\frac{1}{4}"],
  ["3^{-1}", q(1, 3), "3^{-1} = \\frac{1}{3}"],
  ["4^{-1}", q(1, 4), "4^{-1} = \\frac{1}{4}"],
  ["\\left(\\frac{1}{2}\\right)^{-1}", q(2), "\\left(\\frac{1}{2}\\right)^{-1} = 2"],
  ["\\left(\\frac{1}{2}\\right)^{-2}", q(4), "\\left(\\frac{1}{2}\\right)^{-2} = 2^{2} = 4"],
  ["\\left(\\frac{1}{3}\\right)^{-2}", q(9), "\\left(\\frac{1}{3}\\right)^{-2} = 3^{2} = 9"],
  ["\\left(\\frac{2}{3}\\right)^{-1}", q(3, 2), "\\left(\\frac{2}{3}\\right)^{-1} = \\frac{3}{2}"],
  ["8^{\\frac{1}{3}}", q(2), "8^{\\frac{1}{3}} = \\sqrt[3]{8} = 2"],
  ["27^{\\frac{1}{3}}", q(3), "27^{\\frac{1}{3}} = \\sqrt[3]{27} = 3"],
  ["16^{\\frac{1}{2}}", q(4), "16^{\\frac{1}{2}} = \\sqrt{16} = 4"],
  ["8^{\\frac{2}{3}}", q(4), "8^{\\frac{2}{3}} = \\left(\\sqrt[3]{8}\\right)^{2} = 2^{2} = 4"],
  ["4^{\\frac{3}{2}}", q(8), "4^{\\frac{3}{2}} = \\left(\\sqrt{4}\\right)^{3} = 2^{3} = 8"],
  ["9^{-\\frac{1}{2}}", q(1, 3), "9^{-\\frac{1}{2}} = \\frac{1}{\\sqrt{9}} = \\frac{1}{3}"],
  ["8^{-\\frac{1}{3}}", q(1, 2), "8^{-\\frac{1}{3}} = \\frac{1}{\\sqrt[3]{8}} = \\frac{1}{2}"],
];

/** √(25/8)·√2 + 2^(−1) = 3: iloczyn (iloraz) pierwiastków dający liczbę wymierną i prosta potęga. */
function pierwIloczyn(r) {
  for (;;) {
    const t = zWagami(r, [[0.45, 1], [0.35, 2], [0.2, 3]]);
    const s = t === 1 ? r.int(2, 9) : r.int(1, 9);
    if (nwd(s, t) !== 1) continue;
    const R = q(s, t);   // wartość iloczynu pierwiastków
    const Y = r.pick([2, 3, 5, 6, 7, 10]);
    const iloraz = t === 1 && r.chance(0.4);
    const X = iloraz ? R.mul(R).mul(Y) : R.mul(R).div(Y);
    if (X.eq(Y) || X.n > 300 || X.d > 100) continue;
    const plus = r.chance(0.65);
    const policz = (w) => (plus ? R.add(w) : R.sub(w));
    const calkowite = POTEGI_PROSTE.filter(([, w]) => policz(w).calkowita && !policz(w).zero);
    const [potTex, w, potObl] = calkowite.length && r.chance(0.6) ? r.pick(calkowite) : r.pick(POTEGI_PROSTE);
    const wartosc = policz(w);
    if (wartosc.zero) continue;
    const odwrotnie = !iloraz && r.chance(0.5);
    const pierwiastki = iloraz
      ? `\\frac{\\sqrt{${tex(X)}}}{\\sqrt{${Y}}}`
      : odwrotnie ? `\\sqrt{${Y}} \\cdot \\sqrt{${tex(X)}}` : `\\sqrt{${tex(X)}} \\cdot \\sqrt{${Y}}`;
    const pod = iloraz ? `\\frac{${tex(X)}}{${Y}}` : odwrotnie ? `${Y} \\cdot ${tex(X)}` : `${tex(X)} \\cdot ${Y}`;
    const z = plus ? "+" : "-";
    return zadanieWartosc(r, `${pierwiastki} ${z} ${potTex}`, wartosc, [
      `$${pierwiastki} = \\sqrt{${pod}} = \\sqrt{${tex(R.mul(R))}} = ${tex(R)}$`,
      `$${potObl}$`,
      `$${tex(R)} ${z} ${tex(w)} = ${tex(wartosc)}$`,
    ]);
  }
}

/** (3 − √2)² + 6√2 = 11: kwadrat dwumianu, wyrazy z pierwiastkiem się redukują. */
function pierwDwumian(r) {
  const c = r.pick([1, 1, 2, 3]);
  const m = r.pick([2, 3, 5, 6, 7]);
  const a = r.int(1, 5);
  const minus = r.chance(0.6);
  const z = minus ? "-" : "+";
  const liczbaNajpierw = r.chance(0.5);
  const kw = liczbaNajpierw ? `(${a} ${z} ${pierw(c, m)})^{2}` : `(${pierw(c, m)} ${z} ${a})^{2}`;
  const srodek = pierw(2 * a * c, m);
  const zKomp = minus ? "+" : "-";   // wyraz znoszący środkowy wyraz rozwinięcia
  const wyr = r.chance(0.7) ? `${kw} ${zKomp} ${srodek}` : `${minus ? "" : "-"}${srodek} + ${kw}`;
  const wartosc = a * a + c * c * m;
  const rozwiniecie = liczbaNajpierw ? `${a * a} ${z} ${srodek} + ${c * c * m}` : `${c * c * m} ${z} ${srodek} + ${a * a}`;
  return zadanieWartosc(r, wyr, wartosc, [
    `Ze wzoru na kwadrat ${minus ? "różnicy" : "sumy"}: $${kw} = ${rozwiniecie} = ${wartosc} ${z} ${srodek}$.`,
    `Wyrazy z pierwiastkiem się redukują: $${wartosc} ${z} ${srodek} ${zKomp} ${srodek} = ${wartosc}$.`,
  ]);
}

// --- Logarytmy

const logTex = (a, x) => `\\log_{${a}} ${x}`;

/** Ostatni krok: log_a P = k, bo a^k = P. */
function koniecLog(a, k, P) {
  if (k.eq(1)) return `$${logTex(a, tex(P))} = 1$`;
  return `$${logTex(a, tex(P))} = ${tex(k)}$, bo $${potegaTex(a, k)} = ${tex(P)}$.`;
}

/** log₆4 + log₆9 = 2, log₂24 − log₂3 = 3: iloczyn (iloraz) liczb logarytmowanych jest potęgą podstawy. */
function logIloczyn(r) {
  for (;;) {
    const a = r.pick([2, 3, 5, 6, 6, 10, 12, 15, 20]);
    const k = r.pick([1, 2, 2, 3]);
    const ak = a ** k;
    if (ak > 1000) continue;
    const zwykla = (x) => Number.isInteger(x) && x > 1 && !jestPotega(x, a);
    const rodzaj = zWagami(r, [[0.45, "suma"], [0.35, "roznica"], [0.2, "trzy"]]);
    let skladniki, arg, wk = k;
    if (rodzaj === "suma") {
      const dzielniki = [];
      for (let x = 2; x < ak; x++) if (ak % x === 0 && zwykla(x) && zwykla(ak / x) && x !== ak / x) dzielniki.push(x);
      if (!dzielniki.length) continue;
      const x = r.pick(dzielniki);
      skladniki = [[1, x], [1, ak / x]];
      arg = `(${x} \\cdot ${ak / x})`;
    } else if (rodzaj === "roznica") {
      const y = r.int(2, 12);
      if (!zwykla(y) || y * ak > 1000) continue;
      if (r.chance(0.7)) skladniki = [[1, y * ak], [-1, y]];
      else [skladniki, wk] = [[[1, y], [-1, y * ak]], -k];
      arg = `\\frac{${skladniki[0][1]}}{${skladniki[1][1]}}`;
    } else {
      const x = r.int(2, 20);
      const y = r.int(2, 20);
      const z = (x * y) / ak;
      if (!zwykla(x) || !zwykla(y) || !zwykla(z) || x === y || z === x || z === y) continue;
      skladniki = [[1, x], [1, y], [-1, z]];
      arg = `\\frac{${x} \\cdot ${y}}{${z}}`;
    }
    const wyr = skladniki.map(([s, x], i) => `${i === 0 ? "" : s < 0 ? " - " : " + "}${logTex(a, x)}`).join("");
    const P = skladniki.reduce((acc, [s, x]) => (s > 0 ? acc.mul(x) : acc.div(x)), q(1));
    const regula = {
      suma: "Suma logarytmów o tej samej podstawie jest logarytmem iloczynu",
      roznica: "Różnica logarytmów o tej samej podstawie jest logarytmem ilorazu",
      trzy: "Zamień sumę i różnicę logarytmów na logarytm jednej liczby",
    }[rodzaj];
    return zadanieWartosc(r, wyr, q(wk), [
      `${regula}: $${wyr} = ${logTex(a, arg)} = ${logTex(a, tex(P))}$.`,
      koniecLog(a, q(wk), P),
    ]);
  }
}

/** log₉27 + log₉3 = 2, log₈4 − log₈32 = −1: podstawa i liczby są potęgami tej samej liczby pierwszej. */
function logPotegi(r) {
  for (;;) {
    const [p, i] = r.pick([[2, 2], [2, 3], [2, 4], [3, 2], [3, 3], [5, 2]]);
    const a = p ** i;
    const roznica = r.chance(0.4);
    const k = roznica ? r.pick([-2, -1, -1, 1, 2]) : r.pick([1, 2, 2, 3]);
    const u = r.int(1, 7);
    const v = roznica ? u - i * k : i * k - u;
    if (v < 1 || u === v || u % i === 0 || v % i === 0 || p ** u > 1024 || p ** v > 1024) continue;
    const [x, y] = [p ** u, p ** v];
    const wyr = `${logTex(a, x)} ${roznica ? "-" : "+"} ${logTex(a, y)}`;
    const arg = roznica ? `\\frac{${x}}{${y}}` : `(${x} \\cdot ${y})`;
    const P = roznica ? q(x, y) : q(x * y);
    const regula = roznica
      ? "Różnica logarytmów o tej samej podstawie jest logarytmem ilorazu"
      : "Suma logarytmów o tej samej podstawie jest logarytmem iloczynu";
    return zadanieWartosc(r, wyr, q(k), [
      `${regula}: $${wyr} = ${logTex(a, arg)} = ${logTex(a, tex(P))}$.`,
      koniecLog(a, q(k), P),
    ]);
  }
}

/** log₃108 − 2·log₃2 = 3: logarytm ze współczynnikiem, n·log_a b = log_a b^n. */
function logWspolczynnik(r) {
  for (;;) {
    const a = r.pick([2, 3, 5, 6, 10]);
    const c = r.pick([2, 2, 3]);
    const y = r.int(2, 7);
    const k = r.pick([1, 2, 3]);
    if (jestPotega(y, a)) continue;
    const yc = y ** c;
    const ak = a ** k;
    const forma = r.int(0, 2);
    let x, wyr, krok;
    if (forma === 0) {          // log_a x − c·log_a y, gdzie x = a^k · y^c
      x = ak * yc;
      if (x > 2000) continue;
      wyr = `${logTex(a, x)} - ${c} \\cdot ${logTex(a, y)}`;
      krok = `$${logTex(a, x)} - ${logTex(a, yc)} = ${logTex(a, `\\frac{${x}}{${yc}}`)} = ${logTex(a, ak)}$`;
    } else if (forma === 1) {   // c·log_a y + log_a x, gdzie x = a^k / y^c
      if (ak % yc !== 0) continue;
      x = ak / yc;
      if (x < 2 || jestPotega(x, a)) continue;
      wyr = `${c} \\cdot ${logTex(a, y)} + ${logTex(a, x)}`;
      krok = `$${logTex(a, yc)} + ${logTex(a, x)} = ${logTex(a, `(${yc} \\cdot ${x})`)} = ${logTex(a, ak)}$`;
    } else {                    // c·log_a y − log_a x, gdzie x = y^c / a^k
      if (yc % ak !== 0) continue;
      x = yc / ak;
      if (x < 2 || jestPotega(x, a)) continue;
      wyr = `${c} \\cdot ${logTex(a, y)} - ${logTex(a, x)}`;
      krok = `$${logTex(a, yc)} - ${logTex(a, x)} = ${logTex(a, `\\frac{${yc}}{${x}}`)} = ${logTex(a, ak)}$`;
    }
    return zadanieWartosc(r, wyr, q(k), [
      `Skorzystaj ze wzoru $n \\cdot \\log_{a} b = \\log_{a} b^{n}$: $${c} \\cdot ${logTex(a, y)} = ${logTex(a, `${y}^{${c}}`)} = ${logTex(a, yc)}$.`,
      krok,
      koniecLog(a, q(k), q(ak)),
    ]);
  }
}

// Podstawy p^α do logarytmów "szczególnych": [α, zapis podstawy].
const PODSTAWY_LOG = [
  [q(1, 2), (p) => `\\sqrt{${p}}`],
  [q(-1), (p) => `\\frac{1}{${p}}`],
  [q(2), (p) => `${p * p}`],
  [q(-2), (p) => `\\frac{1}{${p * p}}`],
];

/** p^β w LaTeX dla β całkowitego lub połówkowego: 9, \frac{1}{8}, \sqrt{3}, 3\sqrt{3}. */
function potegaPTex(p, beta) {
  if (beta.calkowita) return beta.ujemna ? `\\frac{1}{${p ** -beta.n}}` : `${p ** beta.n}`;
  const c = (Math.abs(beta.n) - 1) / 2;   // p^(c + 1/2) = p^c · √p
  const t = c === 0 ? `\\sqrt{${p}}` : `${p ** c}\\sqrt{${p}}`;
  return beta.ujemna ? `\\frac{1}{${t}}` : t;
}

/** α·x w wykładniku: "\frac{1}{2}x", "-x", "2x", "-2x". */
const razyX = (alfa) => (alfa.eq(-1) ? "-x" : `${alfa.tex()}x`);

/** log_{√3} 9 = 4, log_{1/2} 8 = −3: podstawa lub liczba logarytmowana jest pierwiastkiem albo ułamkiem. */
function logSzczegolny(r) {
  for (;;) {
    const p = r.pick([2, 3, 5]);
    const [alfa, zapisPodstawy] = r.pick(PODSTAWY_LOG);
    const beta = r.chance(0.7) ? q(r.intBez(-4, 6, 0, 1)) : q(r.pick([-3, -1, 1, 3, 5]), 2);
    if (p ** Math.ceil(Math.abs(beta.valueOf())) > 729) continue;
    if (alfa.n > 0 && alfa.calkowita && beta.calkowita && beta.n > 0 && beta.n % alfa.n === 0) continue;   // np. log₉81 – za proste
    const wartosc = beta.div(alfa);
    if (wartosc.eq(1) || wartosc.eq(-1)) continue;
    const podstawa = zapisPodstawy(p);
    const liczba = potegaPTex(p, beta);
    const podstawaX = alfa.eq(2) ? `${podstawa}^{x}` : `\\left(${podstawa}\\right)^{x}`;
    const wyr = logTex(podstawa, liczba);
    return zadanieWartosc(r, wyr, wartosc, [
      `Szukamy liczby $x$, dla której $${podstawaX} = ${liczba}$.`,
      `Zapisz obie liczby jako potęgi liczby $${p}$: $${podstawa} = ${p}^{${alfa.tex()}}$ oraz $${liczba} = ${p}^{${beta.tex()}}$, więc $${p}^{${razyX(alfa)}} = ${p}^{${beta.tex()}}$.`,
      `Stąd $${razyX(alfa)} = ${beta.tex()}$, czyli $x = ${wartosc.tex()}$.`,
    ]);
  }
}

// --- Procenty

const OSOBY = [["Pan Adam", true], ["Pani Ewa", false], ["Pan Marek", true], ["Pani Anna", false], ["Pan Tomasz", true], ["Pani Joanna", false]];

/** Lokata dwuletnia z roczną kapitalizacją (CKE 2026): odsetki, stan lokaty, wpłata albo oprocentowanie. */
function procLokata(r) {
  let K, p, c, K1, K2;
  do {
    K = r.pick([5000, 8000, 10000, 10000, 12000, 15000, 20000, 25000, 40000, 50000]);
    p = r.pick([q(2), q(3), q(4), q(5), q(6), q(8), q(10), q(5, 2)]);
    c = q(1).add(p.div(100));
    K1 = c.mul(K);
    K2 = K1.mul(c);
  } while (!K1.calkowita || !K2.calkowita);
  const c2 = c.mul(c);
  const [osoba, pan] = r.pick(OSOBY);
  const wplacil = pan ? "wpłacił" : "wpłaciła";
  const pTxt = `${dziesietnie(p, false)}%`;
  const zasady = "Odsetki są doliczane do kapitału po każdym roku. Pomijamy podatki.";
  const lata = [
    `Po pierwszym roku: $${dz(K)} \\cdot ${dz(c)} = ${dz(K1)}$ zł.`,
    `Po drugim roku: $${dz(K1)} \\cdot ${dz(c)} = ${dz(K2)}$ zł.`,
  ];
  const zadanie = (tresc, etykieta, wartosc, wynik, rozwiazanie) =>
    ({ tresc, pola: [poleLiczba("w", etykieta)], odpowiedz: { w: wartosc }, wynik, rozwiazanie });

  switch (r.int(0, 3)) {
    case 0: {
      const O = K2.sub(K);
      return zadanie(
        `${osoba} ${wplacil} ${kwota(K)} zł na dwuletnią lokatę oprocentowaną ${pTxt} w skali roku. ${zasady} Oblicz łączną kwotę odsetek po dwóch latach.`,
        "Odsetki (zł)", O, `$${dz(O)}$ zł`,
        [...lata, `Odsetki: $${dz(K2)} - ${dz(K)} = ${dz(O)}$ zł.`]);
    }
    case 1:
      return zadanie(
        `${osoba} ${wplacil} ${kwota(K)} zł na dwuletnią lokatę oprocentowaną ${pTxt} w skali roku. ${zasady} Oblicz, ile złotych będzie na lokacie po dwóch latach.`,
        "Kwota (zł)", K2, `$${dz(K2)}$ zł`, lata);
    case 2:
      return zadanie(
        `${osoba} ${wplacil} pewną kwotę na dwuletnią lokatę oprocentowaną ${pTxt} w skali roku. ${zasady} Po dwóch latach na lokacie było ${kwota(K2)} zł. Oblicz wpłaconą kwotę.`,
        "Wpłata (zł)", K, `$${dz(K)}$ zł`,
        [
          `Co roku kwota rośnie $${dz(c)}$ raza, więc w ciągu dwóch lat $(${dz(c)})^{2} = ${dz(c2)}$ raza.`,
          `Jeśli $x$ to wpłata, to $${dzRazy(c2)} = ${dz(K2)}$, więc $x = ${dz(K2)} : ${dz(c2)} = ${dz(K)}$ zł.`,
        ]);
    default:
      return zadanie(
        `${osoba} ${wplacil} ${kwota(K)} zł na dwuletnią lokatę o stałym oprocentowaniu rocznym. ${zasady} Po dwóch latach na lokacie było ${kwota(K2)} zł. Oblicz roczne oprocentowanie tej lokaty (w procentach).`,
        "Oprocentowanie (%)", p, `$${dz(p)}\\%$`,
        [
          `Niech $p$ – oprocentowanie roczne w procentach. Wtedy $${dz(K)} \\cdot \\left(1 + \\frac{p}{100}\\right)^{2} = ${dz(K2)}$.`,
          `$\\left(1 + \\frac{p}{100}\\right)^{2} = \\frac{${dz(K2)}}{${dz(K)}} = ${dz(c2)}$, więc $1 + \\frac{p}{100} = \\sqrt{${dz(c2)}} = ${dz(c)}$.`,
          `Stąd $p = ${dz(p)}$, czyli oprocentowanie wynosi $${dz(p)}\\%$ w skali roku.`,
        ]);
  }
}

// Towary w dopełniaczu ("cena kurtki").
const TOWARY = ["kurtki", "roweru", "telewizora", "hulajnogi", "plecaka", "zegarka", "laptopa", "namiotu", "ekspresu do kawy", "lodówki"];

/** Podwyżki i obniżki cen: cena po zmianach, procent ceny początkowej, cena przed zmianą. */
function procCena(r) {
  const towar = r.pick(TOWARY);
  const rodzaj = r.int(0, 3);
  for (;;) {
    const P = r.pick([80, 120, 150, 160, 200, 240, 250, 300, 360, 400, 450, 500, 600, 800, 1200, 1500, 2400]);
    const p = r.pick([10, 15, 20, 25, 30, 40, 50]);
    const s = r.pick([10, 20, 25, 30, 40, 50]);
    const fp = q(100 + p, 100);
    const fs = q(100 - s, 100);
    const podwyzkaNajpierw = r.chance(0.6);
    const [f1, f2] = podwyzkaNajpierw ? [fp, fs] : [fs, fp];
    const [zm1, zm2] = podwyzkaNajpierw ? [`podniesiono o ${p}%`, `obniżono o ${s}%`] : [`obniżono o ${s}%`, `podniesiono o ${p}%`];
    const [po1, po2] = podwyzkaNajpierw ? [`podwyżce o ${p}%`, `obniżce o ${s}%`] : [`obniżce o ${s}%`, `podwyżce o ${p}%`];
    const P1 = f1.mul(P);
    const P2 = P1.mul(f2);
    const f12 = f1.mul(f2);

    if (rodzaj === 0) {
      if (!P1.calkowita || !P2.calkowita) continue;
      return {
        tresc: `Cena ${towar} wynosiła ${kwota(P)} zł. Najpierw cenę ${zm1}, a następnie nową cenę ${zm2}. Oblicz cenę ${towar} po obu zmianach.`,
        pola: [poleLiczba("w", "Cena końcowa (zł)")],
        odpowiedz: { w: P2 },
        wynik: `$${dz(P2)}$ zł`,
        rozwiazanie: [
          `Po ${po1}: $${dz(P)} \\cdot ${dz(f1)} = ${dz(P1)}$ zł.`,
          `Po ${po2}: $${dz(P1)} \\cdot ${dz(f2)} = ${dz(P2)}$ zł.`,
        ],
      };
    }
    if (rodzaj === 1) {
      const x = f12.mul(100);
      if (!x.mul(10).calkowita) continue;
      return {
        tresc: `Cenę ${towar} najpierw ${zm1}, a następnie ${zm2}. Cena po obu zmianach stanowi $x\\%$ ceny początkowej. Oblicz $x$.`,
        pola: [poleLiczba("x", "$x =$")],
        odpowiedz: { x },
        wynik: `$x = ${dz(x)}$`,
        rozwiazanie: [
          `Podwyżka o ${p}% oznacza mnożenie ceny przez $${dz(fp)}$, a obniżka o ${s}% – mnożenie przez $${dz(fs)}$.`,
          `$${dz(f1)} \\cdot ${dz(f2)} = ${dz(f12)}$, czyli cena końcowa stanowi $${dz(x)}\\%$ ceny początkowej.`,
        ],
      };
    }
    if (rodzaj === 2) {
      const podwyzka = r.chance(0.5);
      const f = podwyzka ? fp : fs;
      const X = f.mul(P);
      if (!X.calkowita) continue;
      const zmiana = podwyzka ? `podwyżce o ${p}%` : `obniżce o ${s}%`;
      return {
        tresc: `Po ${zmiana} cena ${towar} wynosi ${kwota(X)} zł. Oblicz cenę ${towar} przed ${podwyzka ? "podwyżką" : "obniżką"}.`,
        pola: [poleLiczba("w", "Cena początkowa (zł)")],
        odpowiedz: { w: P },
        wynik: `$${dz(P)}$ zł`,
        rozwiazanie: [
          `Cena po ${zmiana} stanowi $${podwyzka ? 100 + p : 100 - s}\\%$ ceny początkowej $x$, więc $${dzRazy(f)} = ${dz(X)}$.`,
          `$x = ${dz(X)} : ${dz(f)} = ${dz(P)}$ zł.`,
        ],
      };
    }
    if (!P1.calkowita || !P2.calkowita) continue;
    return {
      tresc: `Cenę ${towar} najpierw ${zm1}, a następnie ${zm2}. Po tych zmianach cena ${towar} wynosi ${kwota(P2)} zł. Oblicz cenę początkową.`,
      pola: [poleLiczba("w", "Cena początkowa (zł)")],
      odpowiedz: { w: P },
      wynik: `$${dz(P)}$ zł`,
      rozwiazanie: [
        `Niech $x$ – cena początkowa. Po obu zmianach cena wynosi $x \\cdot ${dz(f1)} \\cdot ${dz(f2)} = ${dzRazy(f12)}$.`,
        f12.eq(1)
          ? `Zmiany się znoszą – cena końcowa jest równa początkowej, więc $x = ${dz(P)}$ zł.`
          : `$${dzRazy(f12)} = ${dz(P2)}$, więc $x = ${dz(P2)} : ${dz(f12)} = ${dz(P)}$ zł.`,
      ],
    };
  }
}

// Układy "dwie grupy, różne procenty" (CKE 2024, dwa sady).
const UKLADY = [
  {
    tresc: (N, a, b, D) => `W dwóch sadach rosło łącznie ${N} drzew. Po zimie okazało się, że w pierwszym sadzie uschło ${a}% drzew, a w drugim – ${b}% drzew. Łącznie uschło ${D} drzew. Oblicz, ile drzew rosło w każdym z sadów.`,
    pola: ["Pierwszy sad", "Drugi sad"],
    x: "liczba drzew w pierwszym sadzie",
    y: "liczba drzew w drugim sadzie",
  },
  {
    tresc: (N, a, b, D) => `Do dwóch szkół uczęszcza łącznie ${N} uczniów. W pierwszej szkole ${a}% uczniów dojeżdża na zajęcia autobusem, a w drugiej – ${b}% uczniów. Łącznie autobusem dojeżdża ${D} uczniów. Oblicz, ilu uczniów uczęszcza do każdej ze szkół.`,
    pola: ["Pierwsza szkoła", "Druga szkoła"],
    x: "liczba uczniów pierwszej szkoły",
    y: "liczba uczniów drugiej szkoły",
  },
  {
    tresc: (N, a, b, D) => `Dwie maszyny wyprodukowały łącznie ${N} części. Wśród części z pierwszej maszyny ${a}% było wadliwych, a wśród części z drugiej maszyny – ${b}%. Łącznie wadliwych było ${D} części. Oblicz, ile części wyprodukowała każda z maszyn.`,
    pola: ["Pierwsza maszyna", "Druga maszyna"],
    x: "liczba części z pierwszej maszyny",
    y: "liczba części z drugiej maszyny",
  },
];

/** Dwie grupy o łącznej liczebności N, różne procenty w każdej (układ równań). */
function procUklad(r) {
  const u = r.pick(UKLADY);
  for (;;) {
    const [a, b] = r.shuffle([2, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30]).slice(0, 2);
    const kx = 100 / nwd(a, 100);   // x musi być wielokrotnością kx, żeby a% z x było całkowite
    const ky = 100 / nwd(b, 100);
    const x = kx * r.int(Math.ceil(200 / kx), Math.floor(2000 / kx));
    const y = ky * r.int(Math.ceil(200 / ky), Math.floor(2000 / ky));
    const N = x + y;
    const D = (a * x + b * y) / 100;
    if (x === y || !zDopelniaczem(N) || !zDopelniaczem(D)) continue;
    const A = q(a, 100);
    const B = q(b, 100);
    return {
      tresc: u.tresc(kwota(N), a, b, kwota(D)),
      pola: [poleLiczba("x", u.pola[0]), poleLiczba("y", u.pola[1])],
      odpowiedz: { x, y },
      wynik: `${u.pola[0]}: $${dz(x)}$, ${u.pola[1].toLowerCase()}: $${dz(y)}$.`,
      rozwiazanie: [
        `Oznaczmy: $x$ – ${u.x}, $y$ – ${u.y}. Wtedy $x + y = ${dz(N)}$ oraz $${dzRazy(A)} + ${dzRazy(B, "y")} = ${dz(D)}$.`,
        `Podstawiamy $y = ${dz(N)} - x$: $${dzRazy(A)} + ${dz(B)}(${dz(N)} - x) = ${dz(D)}$, czyli $${dzRazy(A.sub(B))} = ${dz(q(D).sub(B.mul(N)))}$.`,
        `Stąd $x = ${dz(x)}$ oraz $y = ${dz(N)} - ${dz(x)} = ${dz(y)}$.`,
      ],
    };
  }
}

// Podział kwoty między dwie strony z zależnością procentową (CKE 2025).
const PODZIALY = [
  {
    wstep: (T) => `Kwotę ${T} zł przeznaczoną na nagrody podzielono między dwie drużyny: A i B.`,
    relacje: [
      (p) => `Drużyna A otrzymała o ${p}% więcej niż drużyna B.`,
      (p) => `Drużyna A otrzymała o ${p}% mniej niż drużyna B.`,
      (p) => `Kwota, którą otrzymała drużyna A, stanowi ${p}% kwoty, którą otrzymała drużyna B.`,
    ],
    pytanie: "Oblicz, ile złotych otrzymała każda z drużyn.",
    nazwy: ["drużyna A", "drużyna B"],
    dla: ["drużyny A", "drużyny B"],
  },
  {
    wstep: (T) => `Gmina przeznaczyła ${T} zł na remont dwóch boisk.`,
    relacje: [
      (p) => `Na remont pierwszego boiska przeznaczono o ${p}% więcej pieniędzy niż na remont drugiego.`,
      (p) => `Na remont pierwszego boiska przeznaczono o ${p}% mniej pieniędzy niż na remont drugiego.`,
      (p) => `Kwota przeznaczona na remont pierwszego boiska stanowi ${p}% kwoty przeznaczonej na remont drugiego.`,
    ],
    pytanie: "Oblicz, ile złotych przeznaczono na remont każdego z boisk.",
    nazwy: ["pierwsze boisko", "drugie boisko"],
    dla: ["pierwszego boiska", "drugiego boiska"],
  },
  {
    wstep: (T) => `Budżet projektu w wysokości ${T} zł podzielono między dwa zespoły: A i B.`,
    relacje: [
      (p) => `Zespół A otrzymał o ${p}% więcej niż zespół B.`,
      (p) => `Zespół A otrzymał o ${p}% mniej niż zespół B.`,
      (p) => `Kwota, którą otrzymał zespół A, stanowi ${p}% kwoty, którą otrzymał zespół B.`,
    ],
    pytanie: "Oblicz, ile złotych otrzymał każdy z zespołów.",
    nazwy: ["zespół A", "zespół B"],
    dla: ["zespołu A", "zespołu B"],
  },
];

/** Podział kwoty T na dwie części, gdy jedna jest o p% większa (mniejsza) od drugiej lub stanowi jej p%. */
function procPodzial(r) {
  const k = r.pick(PODZIALY);
  for (;;) {
    const rel = r.int(0, 2);
    const p = r.pick([[10, 20, 25, 30, 40, 50, 60, 75, 80], [10, 20, 25, 30, 40, 50], [40, 60, 75, 80, 120, 125, 150]][rel]);
    const f = [q(100 + p, 100), q(100 - p, 100), q(p, 100)][rel];
    const B = r.int(10, 60) * 1000;
    const A = f.mul(B);
    if (!A.calkowita || A.n % 100 !== 0 || A.n > 100000) continue;
    const T = A.add(B);
    const duza = (s) => s[0].toUpperCase() + s.slice(1);
    return {
      tresc: `${k.wstep(kwota(T))} ${k.relacje[rel](p)} ${k.pytanie}`,
      pola: [poleLiczba("a", `${duza(k.nazwy[0])} (zł)`), poleLiczba("b", `${duza(k.nazwy[1])} (zł)`)],
      odpowiedz: { a: A, b: B },
      wynik: `${duza(k.nazwy[0])}: $${dz(A)}$ zł, ${k.nazwy[1]}: $${dz(B)}$ zł.`,
      rozwiazanie: [
        `Niech $x$ – kwota dla ${k.dla[1]} (w zł). Wtedy kwota dla ${k.dla[0]} to $${dzRazy(f)}$.`,
        `$x + ${dzRazy(f)} = ${dz(T)}$, czyli $${dzRazy(f.add(1))} = ${dz(T)}$.`,
        `$x = ${dz(T)} : ${dz(f.add(1))} = ${dz(B)}$ zł, a $${dz(f)} \\cdot ${dz(B)} = ${dz(A)}$ zł.`,
      ],
    };
  }
}

// --- Nierówność kwadratowa

const ODWROTNY = { "<": ">", "\\le": "\\ge", ">": "<", "\\ge": "\\le" };
const ZNAKI = ["<", "\\le", ">", "\\ge"];
const TRESC_NIEROWNOSC = ["Rozwiąż nierówność", "Wyznacz zbiór rozwiązań nierówności", "Rozwiąż w zbiorze liczb rzeczywistych nierówność"];
const KSZTALTY_KW = [
  "$x \\in (x_1, x_2)$",
  "$x \\in [x_1, x_2]$",
  "$x \\in (-\\infty, x_1) \\cup (x_2, +\\infty)$",
  "$x \\in (-\\infty, x_1] \\cup [x_2, +\\infty)$",
];

/** Zbiór rozwiązań w LaTeX dla kształtu 0–3 (kolejność jak w KSZTALTY_KW). */
function przedzialKw(ksztalt, x1, x2) {
  const [a, b] = [tex(x1), tex(x2)];
  return [
    `x \\in \\left(${a}, ${b}\\right)`,
    `x \\in \\left[${a}, ${b}\\right]`,
    `x \\in \\left(-\\infty, ${a}\\right) \\cup \\left(${b}, +\\infty\\right)`,
    `x \\in \\left(-\\infty, ${a}\\right] \\cup \\left[${b}, +\\infty\\right)`,
  ][ksztalt];
}

/** Ułamek niecałkowity n/d o mianowniku 2–5, |n/d| <= maks. */
function losujUlamek(r, maks) {
  const d = zWagami(r, [[0.45, 2], [0.35, 3], [0.1, 4], [0.1, 5]]);
  for (;;) {
    const n = r.int(-maks * d, maks * d);
    if (nwd(n, d) === 1) return q(n, d);
  }
}

/** Dwa różne pierwiastki x1 < x2: całkowite albo ułamki o małych mianownikach. */
function dwaPierwiastki(r, bezZera = false) {
  for (;;) {
    const typ = zWagami(r, [[0.45, 0], [0.4, 1], [0.15, 2]]);
    const x1 = typ === 2 ? losujUlamek(r, 3) : q(r.int(-6, 6));
    const x2 = typ >= 1 ? losujUlamek(r, 4) : q(r.int(-6, 6));
    if (x1.eq(x2)) continue;
    if ((x1.zero || x2.zero) && (bezZera || r.chance(0.7))) continue;   // zero rzadziej
    if (x1.eq(x2.neg()) && r.chance(0.6)) continue;                      // pierwiastki przeciwne rzadziej
    return x1.cmp(x2) < 0 ? [x1, x2] : [x2, x1];
  }
}

/** Współczynniki [A, B, C] trójmianu k(q1x − p1)(q2x − p2) o pierwiastkach p1/q1 i p2/q2. */
const trojmian = (x1, x2, k) => [k * x1.d * x2.d, -k * (x1.d * x2.n + x2.d * x1.n), k * x1.n * x2.n];

/** Δ i pierwiastki trójmianu [A, B, C] krok po kroku: [tekst kroku, mniejszy, większy]. */
function deltaKrok(A, B, C) {
  const delta = B * B - 4 * A * C;
  const sD = Math.round(Math.sqrt(delta));
  if (delta <= 0 || sD * sD !== delta) throw new Error(`Δ = ${delta} nie jest kwadratem liczby naturalnej`);
  const r1 = q(-B - sD, 2 * A);
  const r2 = q(-B + sD, 2 * A);
  const tekst = `$\\Delta = ${texNawias(B)}^{2} - 4 \\cdot ${texNawias(A)} \\cdot ${texNawias(C)} = ${delta}$, $\\sqrt{\\Delta} = ${sD}$, `
    + `więc $x = \\frac{${-B} - ${sD}}{${2 * A}} = ${tex(r1)}$ lub $x = \\frac{${-B} + ${sD}}{${2 * A}} = ${tex(r2)}$.`;
  return r1.cmp(r2) < 0 ? [tekst, r1, r2] : [tekst, r2, r1];
}

/** Zapis trójmianu f jako L − R = f, jak w arkuszach CKE: wyrazy po obu stronach, nawiasy, iloczyny. */
function przebierz(r, f) {
  const [A, B, C] = f;
  const w = wielomianTex;
  for (;;) {
    const szablon = zWagami(r, [[0.3, 1], [0.2, 2], [0.3, 3], [0.15, 4], [0.05, 0]]);
    if (szablon === 0) return [w(f), "0"];
    if (szablon === 1) {        // 3x^2 + 4x >= 6x + 8
      const b1 = r.int(-6, 6);
      const c1 = r.chance(0.3) ? r.intBez(-6, 6, 0) : 0;
      const prawa = [b1 - B, c1 - C];
      if (prawa[0] === 0 && prawa[1] === 0) continue;
      return [w([A, b1, c1]), w(prawa)];
    }
    if (szablon === 2) {        // 3(2x^2 + 1) < 11x
      const m = Math.sign(A) * nwd(A, C);
      if (C === 0 || B === 0 || Math.abs(m) < 2) continue;
      return [`${m}(${w([A / m, 0, C / m])})`, w([-B, 0])];
    }
    if (szablon === 3) {        // x(3x + 4) >= 6x + 8, (2x - 1)(x + 3) < 4x
      const dzielniki = [];
      for (let d = 1; d <= Math.abs(A); d++) if (A % d === 0) dzielniki.push(d);
      const al = r.pick(dzielniki);
      const ga = A / al;
      const be = r.chance(0.3) ? 0 : r.intBez(-5, 5, 0);
      const de = r.intBez(-5, 5, 0);
      const fx = (x) => x.mul(x).mul(A).add(x.mul(B)).add(C);
      if (fx(q(-be, al)).zero || fx(q(-de, ga)).zero) continue;   // czynniki nie zdradzają pierwiastków
      const prawa = [al * de + be * ga - B, be * de - C];
      if (prawa[0] === 0 && prawa[1] === 0) continue;
      const pierwszy = be === 0 ? (al === 1 ? "x" : `${al}x`) : `(${liniowy(al, be)})`;
      return [`${pierwszy}(${liniowy(ga, de)})`, w(prawa)];
    }
    const m = r.pick([-2, -1, 1, 2]);   // x^2 po obu stronach
    if (A + m === 0) continue;
    const b1 = r.int(-5, 5);
    const c1 = r.int(-6, 6);
    return [w([A + m, b1, c1]), w([m, b1 - B, c1 - C])];
  }
}

const OPIS_ZNAKU = { "<": "ujemne", "\\le": "niedodatnie", ">": "dodatnie", "\\ge": "nieujemne" };

/** 3(2x² + 1) < 11x → x ∈ (1/3, 3/2): kształt zbioru rozwiązań i pierwiastki x1 < x2. */
function nierownoscKwadratowa(r) {
  for (;;) {
    const [x1, x2] = dwaPierwiastki(r);
    const mian = x1.d * x2.d;
    const k = mian === 1 ? r.pick([1, 1, 2, 3, -1, -2]) : mian <= 4 ? r.pick([1, 1, -1, 2]) : r.pick([1, -1]);
    const f = trojmian(x1, x2, k);
    if (Math.abs(f[0]) > 12 || Math.abs(f[1]) > 60 || Math.abs(f[2]) > 60) continue;
    const znak = r.pick(ZNAKI);
    const [L, R] = przebierz(r, f);
    const zamiana = r.chance(0.3);   // czasem strony na odwrót
    const [P1, P2, op] = zamiana ? [R, L, ODWROTNY[znak]] : [L, R, znak];
    const h = zamiana ? f.map((c) => -c) : f;   // P1 − P2 = h
    const [A, B, C] = h;
    const [krokDelta, m1, m2] = deltaKrok(A, B, C);
    if (!m1.eq(x1) || !m2.eq(x2)) throw new Error("Pierwiastki nie zgadzają się z założonymi");
    const wewnatrz = (A > 0) === (op === "<" || op === "\\le");
    const domkniety = op === "\\le" || op === "\\ge";
    const ksztalt = (wewnatrz ? 0 : 2) + (domkniety ? 1 : 0);
    const gdzie = (wewnatrz ? "między pierwiastkami" : "na lewo od mniejszego i na prawo od większego pierwiastka")
      + (domkniety ? ", razem z pierwiastkami" : "");
    const kroki = [];
    const zero = `${wielomianTex(h)} ${op} 0`;
    if (`${P1} ${op} ${P2}` !== zero) kroki.push(`Przenosimy wszystkie wyrazy na lewą stronę: $${zero}$.`);
    kroki.push(krokDelta);
    kroki.push(`Ramiona paraboli są skierowane ${A > 0 ? "w górę" : "w dół"} ($a = ${A}$), więc trójmian przyjmuje wartości ${OPIS_ZNAKU[op]} ${gdzie}: $${przedzialKw(ksztalt, x1, x2)}$.`);
    return {
      tresc: `${r.pick(TRESC_NIEROWNOSC)} $${P1} ${op} ${P2}$.\n\nWybierz postać zbioru rozwiązań i podaj liczby $x_1 < x_2$.`,
      pola: [
        { id: "ksztalt", typ: "wybor", etykieta: "Zbiór rozwiązań", opcje: [...KSZTALTY_KW] },
        poleLiczba("x1", "$x_1 =$"),
        poleLiczba("x2", "$x_2 =$"),
      ],
      odpowiedz: { ksztalt, x1, x2 },
      wynik: `$${przedzialKw(ksztalt, x1, x2)}$`,
      rozwiazanie: kroki,
    };
  }
}

// --- Równanie wielomianowe

const TRESC_ROWNANIE = ["Rozwiąż równanie", "Wyznacz wszystkie rozwiązania równania", "Rozwiąż w zbiorze liczb rzeczywistych równanie"];

/** Zbiór rozwiązań {…} w LaTeX, rosnąco. */
const zbiorTex = (xs) => `x \\in \\left\\{${[...xs].sort((a, b) => a.cmp(b)).map(tex).join(", ")}\\right\\}`;

/** Czasem część wyrazów wielomianu przechodzi na prawą stronę: [lewa, prawa] w LaTeX. */
function rozdzielStrony(r, wsp) {
  const ruch = zWagami(r, [[0.55, []], [0.25, [2, 3]], [0.1, [2]], [0.1, [1]]]).filter((i) => wsp[i] !== 0);
  if (!ruch.length) return [wielomianTex(wsp), "0"];
  return [wielomianTex(wsp.map((w, i) => (ruch.includes(i) ? 0 : w))), wielomianTex(wsp.map((w, i) => (ruch.includes(i) ? -w : 0)))];
}

/** Zadanie z równaniem L = P i trzema rozwiązaniami. */
function zadanieRownanie(r, L, P, wsp, rozw, kroki) {
  if (P !== "0") kroki.unshift(`Przenosimy wszystkie wyrazy na lewą stronę: $${wielomianTex(wsp)} = 0$.`);
  const posortowane = [...rozw].sort((a, b) => a.cmp(b));
  kroki.push(`Rozwiązania: ${posortowane.map((x) => `$x = ${tex(x)}$`).join(", ")}.`);
  return {
    tresc: `${r.pick(TRESC_ROWNANIE)} $${L} = ${P}$.`,
    pola: [{ id: "x", typ: "zbior", ile: 3, etykieta: "Rozwiązania" }],
    odpowiedz: { x: posortowane },
    wynik: `$${zbiorTex(rozw)}$`,
    rozwiazanie: kroki,
  };
}

/** 3x³ − 2x² − 12x + 8 = 0 → (3x − 2)(x² − 4) = 0: grupowanie wyrazów (CKE 2023). */
function rownanieGrupowanie(r) {
  for (;;) {
    const al = zWagami(r, [[0.35, 1], [0.3, 2], [0.25, 3], [0.1, 4]]);
    const be = r.intBez(-5 * al, 5 * al, 0);
    const t = zWagami(r, [[0.7, 1], [0.2, 2], [0.1, 3]]);
    const s = r.int(1, 6);
    if (nwd(al, be) !== 1 || nwd(s, t) !== 1) continue;
    const x0 = q(be, al);   // pierwiastek czynnika liniowego
    const u = q(s, t);      // pierwiastki ±u czynnika kwadratowego
    if (x0.eq(u) || x0.eq(u.neg())) continue;
    const lam = zWagami(r, [[0.75, 1], [0.15, -1], [0.1, 2]]);
    const wsp = [lam * al * t * t, -lam * be * t * t, -lam * al * s * s, lam * be * s * s];
    if (Math.abs(wsp[0]) > 20 || wsp.some((w) => Math.abs(w) > 150)) continue;
    if (Math.abs(wsp[0]) === 1 && r.chance(0.5)) continue;   // współczynnik 1 przy x^3 rzadziej
    const [L, P] = rozdzielStrony(r, wsp);
    const lin = wielomianTex([al, -be]);
    const g1 = lam * t * t;
    const g2 = -lam * s * s;
    const kw = wielomianTex([g1, 0, g2]);
    const grupy = `${g1 === 1 ? "" : g1 === -1 ? "-" : g1}x^{2}(${lin}) ${g2 < 0 ? "-" : "+"} ${Math.abs(g2) === 1 ? "" : Math.abs(g2)}(${lin})`;
    return zadanieRownanie(r, L, P, wsp, [x0, u.neg(), u], [
      `Grupujemy wyrazy: $${grupy} = 0$, czyli $(${lin})(${kw}) = 0$.`,
      `Stąd $${lin} = 0$ lub $${kw} = 0$, czyli $x = ${tex(x0)}$ lub $x^{2} = ${tex(u.mul(u))}$.`,
    ]);
  }
}

/** 2x³ − 5x² − 3x = 0 → x(2x² − 5x − 3) = 0: wyłączenie x przed nawias i równanie kwadratowe. */
function rownanieZX(r) {
  for (;;) {
    const [x1, x2] = dwaPierwiastki(r, true);
    const k = x1.d * x2.d === 1 ? r.pick([1, 2, -1]) : r.pick([1, -1]);
    const [A, B, C] = trojmian(x1, x2, k);
    if (Math.abs(A) > 12 || Math.abs(B) > 40 || Math.abs(C) > 40 || B === 0) continue;
    const wsp = [A, B, C, 0];
    const [L, P] = rozdzielStrony(r, wsp);
    const kw = wielomianTex([A, B, C]);
    const [krokDelta] = deltaKrok(A, B, C);
    return zadanieRownanie(r, L, P, wsp, [q(0), x1, x2], [
      `Wyłączamy $x$ przed nawias: $x(${kw}) = 0$, więc $x = 0$ lub $${kw} = 0$.`,
      krokDelta,
    ]);
  }
}

// --- Nierówność liniowa

const KSZTALTY_LIN = ["$x \\in (-\\infty, a)$", "$x \\in (-\\infty, a]$", "$x \\in (a, +\\infty)$", "$x \\in [a, +\\infty)$"];
const KSZTALT_ZNAKU = { "<": 0, "\\le": 1, ">": 2, "\\ge": 3 };

/** Zbiór rozwiązań w LaTeX dla kształtu 0–3 (kolejność jak w KSZTALTY_LIN). */
function przedzialLin(ksztalt, a) {
  const t = tex(a);
  return [
    `x \\in \\left(-\\infty, ${t}\\right)`,
    `x \\in \\left(-\\infty, ${t}\\right]`,
    `x \\in \\left(${t}, +\\infty\\right)`,
    `x \\in \\left[${t}, +\\infty\\right)`,
  ][ksztalt];
}

const nww = (a, b) => (a / nwd(a, b)) * b;

/** Suma składników [współczynnik, "x" albo ""] w LaTeX bez upraszczania: "4x + 2 - 3x + 3". */
function skladnikiTex(lista) {
  const czesci = [];
  for (const [w, lit] of lista) {
    if (w === 0) continue;
    const liczba = lit && Math.abs(w) === 1 ? "" : String(Math.abs(w));
    czesci.push(czesci.length === 0 ? `${w < 0 ? "-" : ""}${liczba}${lit}` : ` ${w < 0 ? "-" : "+"} ${liczba}${lit}`);
  }
  return czesci.length ? czesci.join("") : "0";
}

/** (ax + b)/m pomnożone przez k: "2(2x + 1)"; dla k = 1 nawias tylko po minusie. */
const razyNawias = (k, a, b, poMinusie) => (k === 1 ? (poMinusie ? `(${liniowy(a, b)})` : liniowy(a, b)) : `${k}(${liniowy(a, b)})`);

/** (2x + 1)/3 − (x − 1)/2 ≤ 1: nierówność liniowa z ułamkami, odpowiedź – kształt przedziału i liczba a. */
function nierownoscLiniowa(r) {
  for (;;) {
    const szablon = r.int(0, 2);
    const m = r.pick([2, 3, 4, 5, 6]);
    const n = r.pick([2, 3, 4, 5, 6].filter((x) => x !== m));
    const al = r.intBez(-3, 5, 0);
    const be = r.chance(0.2) ? 0 : r.intBez(-7, 7, 0);
    const ga = r.intBez(-3, 5, 0);
    const de = r.intBez(-7, 7, 0);
    const op = r.pick(ZNAKI);
    const ul1 = `\\frac{${liniowy(al, be)}}{${m}}`;
    const ul2 = `\\frac{${liniowy(ga, de)}}{${n}}`;
    let tekst, L, mnoz, rozwin, K, M;   // lewa − prawa = Kx + M
    if (szablon === 0) {          // (al x + be)/m ∓ (ga x + de)/n op c
      const minus = r.chance(0.65);
      const z = minus ? -1 : 1;
      const c = r.int(-4, 6);
      L = nww(m, n);
      const [k1, k2] = [L / m, L / n];
      tekst = `${ul1} ${minus ? "-" : "+"} ${ul2} ${op} ${c}`;
      const drugi = razyNawias(k2, ga, de, minus);
      const laczenie = !minus && drugi.startsWith("-") ? `- ${drugi.slice(1)}` : `${minus ? "-" : "+"} ${drugi}`;
      mnoz = `${razyNawias(k1, al, be, false)} ${laczenie} ${op} ${c * L}`;
      rozwin = `${skladnikiTex([[k1 * al, "x"], [k1 * be, ""], [z * k2 * ga, "x"], [z * k2 * de, ""]])} ${op} ${c * L}`;
      K = q(al, m).add(q(z * ga, n));
      M = q(be, m).add(q(z * de, n)).sub(c);
    } else if (szablon === 1) {   // (al x + be)/m op e x + g
      const e = r.intBez(-3, 3, 0);
      const g = r.int(-6, 6);
      L = m;
      tekst = `${ul1} ${op} ${wielomianTex([e, g])}`;
      mnoz = `${liniowy(al, be)} ${op} ${wielomianTex([m * e, m * g])}`;
      rozwin = null;
      K = q(al, m).sub(e);
      M = q(be, m).sub(g);
    } else {                      // (al x + be)/m op (ga x + de)/n
      L = nww(m, n);
      const [k1, k2] = [L / m, L / n];
      tekst = `${ul1} ${op} ${ul2}`;
      mnoz = `${razyNawias(k1, al, be, false)} ${op} ${razyNawias(k2, ga, de, false)}`;
      rozwin = `${skladnikiTex([[k1 * al, "x"], [k1 * be, ""]])} ${op} ${skladnikiTex([[k2 * ga, "x"], [k2 * de, ""]])}`;
      K = q(al, m).sub(q(ga, n));
      M = q(be, m).sub(q(de, n));
    }
    if (K.zero) continue;
    const a = M.neg().div(K);
    if (a.d > 6 || Math.abs(a.valueOf()) > 10) continue;
    const KL = K.mul(L).n;   // całkowite, bo L jest wielokrotnością mianowników
    const prawa = M.mul(L).neg();
    const opPo = KL < 0 ? ODWROTNY[op] : op;
    const ksztalt = KSZTALT_ZNAKU[opPo];
    const kroki = [`Mnożymy obie strony nierówności przez $${L}$: $${mnoz}$.`];
    if (rozwin && rozwin !== mnoz) kroki.push(`Opuszczamy nawiasy: $${rozwin}$.`);
    kroki.push(`Wyrazy z $x$ przenosimy na lewą stronę, a liczby na prawą: $${wielomianTex([KL, 0])} ${op} ${tex(prawa)}$.`);
    if (KL > 1) kroki.push(`Dzielimy obie strony przez $${KL}$: $x ${op} ${tex(a)}$.`);
    if (KL < 0) kroki.push(`Dzielimy obie strony przez $${KL}$ i zmieniamy zwrot nierówności: $x ${opPo} ${tex(a)}$.`);
    kroki.push(`Zbiór rozwiązań: $${przedzialLin(ksztalt, a)}$.`);
    return {
      tresc: `${r.pick(TRESC_NIEROWNOSC)} $${tekst}$.\n\nWybierz postać zbioru rozwiązań i podaj liczbę $a$.`,
      pola: [
        { id: "ksztalt", typ: "wybor", etykieta: "Zbiór rozwiązań", opcje: [...KSZTALTY_LIN] },
        poleLiczba("a", "$a =$"),
      ],
      odpowiedz: { ksztalt, a },
      wynik: `$${przedzialLin(ksztalt, a)}$`,
      rozwiazanie: kroki,
    };
  }
}

// --- Lista generatorów

export const GENERATORY = [
  {
    id: "potegi",
    nazwa: "Potęgi",
    opis: "Działania na potęgach: zapis w postaci jednej potęgi i obliczanie wartości wyrażeń.",
    generuj: (r) => zWagami(r, [[0.45, potegiIloczyn], [0.35, potegiSuma], [0.2, potegiJednakowe]])(r),
  },
  {
    id: "pierwiastki",
    nazwa: "Pierwiastki",
    opis: "Wartości wyrażeń z pierwiastkami i potęgami o wykładnikach wymiernych.",
    generuj: (r) => zWagami(r, [[0.3, pierwKwadrat], [0.2, pierwSprzezenie], [0.3, pierwIloczyn], [0.2, pierwDwumian]])(r),
  },
  {
    id: "logarytmy",
    nazwa: "Logarytmy",
    opis: "Sumy, różnice i wielokrotności logarytmów o tej samej podstawie.",
    generuj: (r) => zWagami(r, [[0.3, logIloczyn], [0.25, logPotegi], [0.25, logWspolczynnik], [0.2, logSzczegolny]])(r),
  },
  {
    id: "procenty",
    nazwa: "Procenty",
    opis: "Lokaty, podwyżki i obniżki cen oraz zależności procentowe między dwiema wielkościami.",
    generuj: (r) => zWagami(r, [[0.3, procLokata], [0.3, procCena], [0.2, procUklad], [0.2, procPodzial]])(r),
  },
  {
    id: "nierownosc-kwadratowa",
    nazwa: "Nierówność kwadratowa",
    opis: "Nierówności kwadratowe zapisane tak jak w arkuszach CKE.",
    generuj: nierownoscKwadratowa,
  },
  {
    id: "rownanie-wielomianowe",
    nazwa: "Równanie wielomianowe",
    opis: "Równania trzeciego stopnia rozwiązywane przez grupowanie wyrazów lub wyłączenie x przed nawias.",
    generuj: (r) => zWagami(r, [[0.7, rownanieGrupowanie], [0.3, rownanieZX]])(r),
  },
  {
    id: "nierownosc-liniowa",
    nazwa: "Nierówność liniowa",
    opis: "Nierówności liniowe ze współczynnikami ułamkowymi.",
    generuj: nierownoscLiniowa,
  },
];
