// Generatory zadań z działu „Geometria” (matura podstawowa, formuła 2023).
// Kontrakt zadania i narzędzia: zob. wspolne.js. Każde zadanie budujemy od końca – z ładnej odpowiedzi.
import { Q, q, texNawias, plusMinus, nawiasMinus } from "./wspolne.js";

// --- Zapis LaTeX i drobne pomocnicze

const tex = (x) => Q.z(x).tex();

/** Punkt: punktTex(2, -3) -> "(2, -3)". */
const punktTex = (x, y) => `(${tex(x)}, ${tex(y)})`;

/** Miara kąta: miara("ABC") -> "|\sphericalangle ABC|". */
const miara = (abc) => `|\\sphericalangle ${abc}|`;

/** Funkcja trygonometryczna: funTex("tg", "60^\circ") -> "\operatorname{tg} 60^\circ". */
const funTex = (f, arg) => (f === "tg" ? `\\operatorname{tg} ${arg}` : `\\${f} ${arg}`);
const SIN = funTex("sin", "\\alpha"), COS = funTex("cos", "\\alpha"), TG = funTex("tg", "\\alpha");
const FUN = {
  sin: { tex: SIN, nazwa: "sinus" },
  cos: { tex: COS, nazwa: "cosinus" },
  tg: { tex: TG, nazwa: "tangens" },
};

const wielka = (s) => s[0].toUpperCase() + s.slice(1);

function nwd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

/** Suma składników [współczynnik, litera]: [[3, "x"], [-1, ""]] -> "3x - 1"; z dalej = true -> " + 3x - 1" (do doklejenia). */
function sumaTex(skladniki, dalej = false) {
  const czesci = [];
  for (const [w, lit] of skladniki) {
    const a = Q.z(w);
    if (a.zero) continue;
    const abs = a.ujemna ? a.neg() : a;
    const liczba = lit && abs.eq(1) ? "" : abs.tex();
    const znak = a.ujemna ? "-" : "+";
    czesci.push(czesci.length === 0 && !dalej ? `${a.ujemna ? "-" : ""}${liczba}${lit}` : ` ${znak} ${liczba}${lit}`);
  }
  if (czesci.length) return czesci.join("");
  return dalej ? "" : "0";
}

/** Pierwiastek z liczby naturalnej po wyłączeniu czynnika: 8 -> "2\sqrt{2}", 9 -> "3", 7 -> "\sqrt{7}". */
function pierwTex(n) {
  let a = 1, b = n;
  for (let k = 2; k * k <= b;) {
    if (b % (k * k) === 0) { a *= k; b /= k * k; } else k++;
  }
  return b === 1 ? String(a) : `${a === 1 ? "" : a}\\sqrt{${b}}`;
}

/** Liczba w zapisie dziesiętnym (LaTeX): 17/2 -> "8{,}5"; bez skończonego rozwinięcia – ułamek zwykły. */
function dz(x) {
  const v = Q.z(x);
  if (v.calkowita) return String(v.n);
  let k = 0;
  while ((10 ** k) % v.d !== 0) if (++k > 4) return v.tex();
  const cyfry = String(Math.abs(v.n) * (10 ** k / v.d)).padStart(k + 1, "0");
  return `${v.ujemna ? "-" : ""}${cyfry.slice(0, -k)}{,}${cyfry.slice(-k)}`;
}

/** Współczynnik przy π: 1 -> "\pi", 36 -> "36\pi", 32/3 -> "\frac{32}{3}\pi". */
const kPi = (k) => (Q.z(k).eq(1) ? "\\pi" : `${tex(k)}\\pi`);

const stopnie = (x) => `${tex(x)}^\\circ`;

const jednoPole = (id, etykieta, odp, wynik, tresc, rozwiazanie) =>
  ({ tresc, pola: [{ id, typ: "liczba", etykieta }], odpowiedz: { [id]: Q.z(odp) }, wynik, rozwiazanie });

/** Zadanie o współrzędnych punktu: dwa pola (x, y). */
const zadaniePunkt = (tresc, nazwa, x, y, rozwiazanie) => ({
  tresc,
  pola: [{ id: "x", typ: "liczba", etykieta: `$x_{${nazwa}} =$` }, { id: "y", typ: "liczba", etykieta: `$y_{${nazwa}} =$` }],
  odpowiedz: { x: Q.z(x), y: Q.z(y) },
  wynik: `$${nazwa} = ${punktTex(x, y)}$`,
  rozwiazanie,
});

const TROJKI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];

/** Trójka pitagorejska (a, b, c) z przeciwprostokątną c ≤ maks; przyprostokątne w losowej kolejności. */
function losujTrojke(r, maks = 50, lista = TROJKI) {
  const [a, b, c] = r.pick(lista.filter((t) => t[2] <= maks));
  const k = r.int(1, Math.floor(maks / c));
  return r.chance() ? [a * k, b * k, c * k] : [b * k, a * k, c * k];
}

// --- 1. Trygonometria

function trygonometria(r) {
  const wariant = r.pick(["trojka", "trojka", "jedynka", "tangens", "tangens", "szczegolne", "szczegolne", "rownanie"]);
  if (wariant === "trojka") return trygZTrojki(r);
  if (wariant === "jedynka") return trygJedynka(r);
  if (wariant === "tangens") return trygTangens(r);
  if (wariant === "szczegolne") return trygSzczegolne(r);
  return trygRownanie(r);
}

/** sin, cos albo tg kąta ostrego z trójki pitagorejskiej -> inna funkcja tego kąta (CKE 2023, zad. 18). */
function trygZTrojki(r) {
  for (;;) {
    const [a, b, c] = r.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17], [7, 24, 25], [24, 7, 25]]);
    const w = { sin: q(a, c), cos: q(b, c), tg: q(a, b) };
    const dane = r.pick(["sin", "cos", "tg"]);
    const szukane = r.pick(["sin", "cos", "tg"].filter((f) => f !== dane));
    if (w[szukane].d > 12) continue;
    const kroki = [];
    if (dane === "tg") {
      kroki.push(`$${TG} = \\frac{${SIN}}{${COS}} = ${w.tg.tex()}$, więc $${SIN} = ${w.tg.tex()}${COS}$.`);
      kroki.push(`Z jedynki trygonometrycznej: $\\left(${w.tg.tex()}${COS}\\right)^2 + \\cos^2\\alpha = 1$, czyli $${q(c * c, b * b).tex()}\\cos^2\\alpha = 1$, więc $\\cos^2\\alpha = ${q(b * b, c * c).tex()}$.`);
      kroki.push(`Kąt $\\alpha$ jest ostry, więc $${COS} = ${w.cos.tex()}$${szukane === "sin" ? `, a $${SIN} = ${w.tg.tex()} \\cdot ${w.cos.tex()} = ${w.sin.tex()}$` : ""}.`);
    } else {
      const inna = dane === "sin" ? "cos" : "sin";
      const x = dane === "sin" ? b : a;
      kroki.push(`Z jedynki trygonometrycznej: $\\${inna}^2\\alpha = 1 - \\${dane}^2\\alpha = 1 - \\left(${w[dane].tex()}\\right)^2 = ${q(x * x, c * c).tex()}$.`);
      kroki.push(`Kąt $\\alpha$ jest ostry, więc $${FUN[inna].tex} > 0$ i $${FUN[inna].tex} = ${w[inna].tex()}$.`);
      if (szukane === "tg") kroki.push(`$${TG} = \\frac{${SIN}}{${COS}} = ${w.sin.tex()} : ${w.cos.tex()} = ${w.tg.tex()}$.`);
    }
    const D = FUN[dane], S = FUN[szukane];
    const tresc = r.pick([
      `Kąt $\\alpha$ jest ostry i $${D.tex} = ${w[dane].tex()}$. Oblicz ${S.nazwa} kąta $\\alpha$.`,
      `Dany jest kąt ostry $\\alpha$, dla którego $${D.tex} = ${w[dane].tex()}$. Oblicz $${S.tex}$.`,
      `${wielka(D.nazwa)} kąta ostrego $\\alpha$ jest równy $${w[dane].tex()}$. Oblicz ${S.nazwa} tego kąta.`,
    ]);
    return jednoPole("w", `$${S.tex} =$`, w[szukane], `$${S.tex} = ${w[szukane].tex()}$`, tresc, kroki);
  }
}

/** sin α = √(n² - m²)/n -> cos α = m/n z jedynki trygonometrycznej (i odwrotnie). */
function trygJedynka(r) {
  for (;;) {
    const n = r.int(2, 9), m = r.int(1, n - 1);
    if (nwd(m, n) !== 1) continue;
    const k = n * n - m * m;
    if (Number.isInteger(Math.sqrt(k))) continue;   // trójki pitagorejskie są w innym wariancie
    const [dane, szukane] = r.chance() ? ["sin", "cos"] : ["cos", "sin"];
    const D = FUN[dane], S = FUN[szukane];
    const dana = `\\frac{${pierwTex(k)}}{${n}}`;
    const odp = q(m, n), kw = q(m * m, n * n);
    const tresc = r.pick([
      `Kąt $\\alpha$ jest ostry i $${D.tex} = ${dana}$. Oblicz $${S.tex}$.`,
      `${wielka(D.nazwa)} kąta ostrego $\\alpha$ jest równy $${dana}$. Oblicz ${S.nazwa} tego kąta.`,
    ]);
    return jednoPole("w", `$${S.tex} =$`, odp, `$${S.tex} = ${odp.tex()}$`, tresc, [
      `Z jedynki trygonometrycznej: $\\${szukane}^2\\alpha = 1 - \\${dane}^2\\alpha = 1 - \\left(${dana}\\right)^2 = 1 - \\frac{${k}}{${n * n}} = ${kw.tex()}$.`,
      `Kąt $\\alpha$ jest ostry, więc $${S.tex} > 0$ i $${S.tex} = \\sqrt{${kw.tex()}} = ${odp.tex()}$.`,
    ]);
  }
}

/** k·sin α = m·cos α -> tg α (albo sin, cos), lub wartość wyrażenia z sin i cos przy danym tg α. */
function trygTangens(r) {
  if (r.chance(0.45)) {
    for (;;) {
      const [m, k] = r.chance(0.35) ? r.pick([[3, 4], [4, 3]]) : [r.int(1, 9), r.int(1, 9)];
      if (m === k || nwd(m, k) !== 1) continue;
      const t = q(m, k);
      const piatka = m * m + k * k === 25;       // tylko wtedy sin i cos są wymierne
      const szukane = piatka ? r.pick(["tg", "sin", "cos"]) : "tg";
      const rown = `${k === 1 ? "" : k}${SIN} = ${m === 1 ? "" : m}${COS}`;
      const odp = { tg: t, sin: q(m, 5), cos: q(k, 5) }[szukane];
      const S = FUN[szukane];
      const tresc = r.pick([
        `Kąt $\\alpha$ jest ostry i spełnia warunek $${rown}$. Oblicz $${S.tex}$.`,
        `Kąt ostry $\\alpha$ spełnia równość $${rown}$. Oblicz ${S.nazwa} kąta $\\alpha$.`,
      ]);
      const kroki = [`Kąt $\\alpha$ jest ostry, więc $${COS} \\neq 0$. Dzielimy obie strony przez $${COS}$: $${k === 1 ? "" : k}${TG} = ${m}$, czyli $${TG} = ${t.tex()}$.`];
      if (szukane !== "tg") {
        kroki.push(`$${SIN} = ${t.tex()}${COS}$. Z jedynki trygonometrycznej: $\\left(${t.tex()}${COS}\\right)^2 + \\cos^2\\alpha = 1$, czyli $\\frac{25}{${k * k}}\\cos^2\\alpha = 1$.`);
        kroki.push(`$\\cos^2\\alpha = \\frac{${k * k}}{25}$ i $${COS} > 0$, więc $${COS} = ${q(k, 5).tex()}$${szukane === "sin" ? `, a $${SIN} = ${t.tex()} \\cdot ${q(k, 5).tex()} = ${q(m, 5).tex()}$` : ""}.`);
      }
      return jednoPole("w", `$${S.tex} =$`, odp, `$${S.tex} = ${odp.tex()}$`, tresc, kroki);
    }
  }
  for (;;) {
    const t = q(...r.pick([[2, 1], [3, 1], [4, 1], [5, 1], [1, 2], [1, 3], [3, 2], [2, 3], [3, 4], [4, 3], [5, 2]]));
    const a = r.intBez(-4, 5, 0), b = r.int(-5, 5), c = r.intBez(-4, 5, 0), d = r.int(-5, 5);
    if (a * d === b * c) continue;
    const lic = t.mul(a).add(b), mian = t.mul(c).add(d);
    if (lic.zero || mian.zero) continue;
    const W = lic.div(mian);
    if (W.d > 12 || Math.abs(W.valueOf()) > 20) continue;
    const wyr = `\\frac{${sumaTex([[a, SIN], [b, COS]])}}{${sumaTex([[c, SIN], [d, COS]])}}`;
    const wyrTg = `\\frac{${sumaTex([[a, TG], [b, ""]])}}{${sumaTex([[c, TG], [d, ""]])}}`;
    const podst = (x, y) => `${x === 1 ? "" : x === -1 ? "-" : `${x} \\cdot `}${t.tex()}${y ? ` ${plusMinus(y)}` : ""}`;
    const tresc = r.pick([
      `Kąt $\\alpha$ jest ostry i $${TG} = ${t.tex()}$. Oblicz wartość wyrażenia $${wyr}$.`,
      `Dla kąta ostrego $\\alpha$ spełniony jest warunek $${TG} = ${t.tex()}$. Oblicz wartość wyrażenia $${wyr}$.`,
    ]);
    return jednoPole("w", "Wartość wyrażenia", W, `$${W.tex()}$`, tresc, [
      `Kąt $\\alpha$ jest ostry, więc $${COS} \\neq 0$. Dzielimy licznik i mianownik przez $${COS}$ i korzystamy z tego, że $\\frac{${SIN}}{${COS}} = ${TG}$: $${wyr} = ${wyrTg}$.`,
      `Podstawiamy $${TG} = ${t.tex()}$: $\\frac{${podst(a, b)}}{${podst(c, d)}} = \\frac{${lic.tex()}}{${mian.tex()}} = ${W.tex()}$.`,
    ]);
  }
}

/** [zapis, wyjaśnienie, wartość] – wyrażenia z kątami 30°, 45°, 60° o wymiernych wartościach. */
const ATOMY = [
  ["\\sin 30^\\circ", "\\frac{1}{2}", q(1, 2)],
  ["\\cos 60^\\circ", "\\frac{1}{2}", q(1, 2)],
  ["\\operatorname{tg} 45^\\circ", "1", q(1)],
  ["\\sin^2 45^\\circ", "\\left(\\frac{\\sqrt{2}}{2}\\right)^2 = \\frac{1}{2}", q(1, 2)],
  ["\\cos^2 45^\\circ", "\\left(\\frac{\\sqrt{2}}{2}\\right)^2 = \\frac{1}{2}", q(1, 2)],
  ["\\sin^2 60^\\circ", "\\left(\\frac{\\sqrt{3}}{2}\\right)^2 = \\frac{3}{4}", q(3, 4)],
  ["\\cos^2 30^\\circ", "\\left(\\frac{\\sqrt{3}}{2}\\right)^2 = \\frac{3}{4}", q(3, 4)],
  ["\\sin^2 30^\\circ", "\\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4}", q(1, 4)],
  ["\\cos^2 60^\\circ", "\\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4}", q(1, 4)],
  ["\\operatorname{tg}^2 60^\\circ", "\\left(\\sqrt{3}\\right)^2 = 3", q(3)],
  ["\\operatorname{tg}^2 30^\\circ", "\\left(\\frac{\\sqrt{3}}{3}\\right)^2 = \\frac{1}{3}", q(1, 3)],
  ["\\operatorname{tg} 30^\\circ \\cdot \\operatorname{tg} 60^\\circ", "\\frac{\\sqrt{3}}{3} \\cdot \\sqrt{3} = 1", q(1)],
  ["\\sin 60^\\circ \\cdot \\cos 30^\\circ", "\\frac{\\sqrt{3}}{2} \\cdot \\frac{\\sqrt{3}}{2} = \\frac{3}{4}", q(3, 4)],
  ["\\sin 45^\\circ \\cdot \\cos 45^\\circ", "\\frac{\\sqrt{2}}{2} \\cdot \\frac{\\sqrt{2}}{2} = \\frac{1}{2}", q(1, 2)],
  ["\\operatorname{tg} 60^\\circ \\cdot \\sin 60^\\circ", "\\sqrt{3} \\cdot \\frac{\\sqrt{3}}{2} = \\frac{3}{2}", q(3, 2)],
];

/** Wartość wyrażenia z funkcjami kątów 30°, 45°, 60° (np. 4sin²60° − 2tg45° = 1). */
function trygSzczegolne(r) {
  for (;;) {
    const atomy = r.shuffle(ATOMY).slice(0, r.pick([2, 2, 3]));
    const wsp = atomy.map((_, i) => r.pick([1, 2, 2, 3, 4, 4, 6, 8, 12]) * (i === 0 ? 1 : r.znak()));
    const W = atomy.reduce((s, at, i) => s.add(at[2].mul(wsp[i])), q(0));
    if (W.d > 12 || Math.abs(W.valueOf()) > 30) continue;
    const wyr = sumaTex(atomy.map((at, i) => [wsp[i], at[0]]));
    const podst = atomy.map((at, i) => {
      const w = Math.abs(wsp[i]);
      const skl = w === 1 ? at[2].tex() : `${w} \\cdot ${at[2].tex()}`;
      return i === 0 ? skl : ` ${wsp[i] < 0 ? "-" : "+"} ${skl}`;
    }).join("");
    const tresc = r.pick([
      `Oblicz wartość wyrażenia $${wyr}$.`,
      `Wartość wyrażenia $${wyr}$ jest liczbą wymierną. Oblicz tę wartość.`,
    ]);
    return jednoPole("w", "Wartość wyrażenia", W, `$${wyr} = ${W.tex()}$`, tresc, [
      `Odczytujemy wartości z tablicy: ${atomy.map((at) => `$${at[0]} = ${at[1]}$`).join(", ")}.`,
      `$${wyr} = ${podst} = ${W.tex()}$.`,
    ]);
  }
}

/** [funkcja, kąt, liczba pod pierwiastkiem, mianownik]: sin 60° = √3/2 itd. */
const WARTOSCI = [["sin", 30, 1, 2], ["cos", 60, 1, 2], ["sin", 45, 2, 2], ["cos", 45, 2, 2], ["sin", 60, 3, 2],
  ["cos", 30, 3, 2], ["tg", 30, 3, 3], ["tg", 45, 1, 1], ["tg", 60, 3, 1]];

/** Równanie z funkcją trygonometryczną kąta ostrego -> miara kąta (30°, 45° albo 60°). */
function trygRownanie(r) {
  const [f, A, p, d] = r.pick(WARTOSCI);
  const k = r.int(1, 3);
  const L = `${k * d === 1 ? "" : k * d}${FUN[f].tex}`;
  const R = p === 1 ? String(k) : `${k === 1 ? "" : k}\\sqrt{${p}}`;
  const wartosc = p === 1 ? q(1, d).tex() : d === 1 ? `\\sqrt{${p}}` : `\\frac{\\sqrt{${p}}}{${d}}`;
  const rown = r.chance() ? `${L} = ${R}` : `${L} - ${R} = 0`;
  const tresc = r.pick([
    `Kąt $\\alpha$ jest ostry i spełnia równanie $${rown}$. Oblicz miarę kąta $\\alpha$.`,
    `Kąt ostry $\\alpha$ spełnia warunek $${rown}$. Wyznacz miarę tego kąta.`,
  ]);
  return jednoPole("w", "Miara kąta $\\alpha$ (w stopniach)", A, `$\\alpha = ${A}^\\circ$`, tresc, [
    `Z równania: $${FUN[f].tex} = ${k * d === 1 ? "" : `\\frac{${R}}{${k * d}} = `}${wartosc}$.`,
    `Wśród kątów ostrych tylko $${A}^\\circ$ ma tę wartość: $${funTex(f, `${A}^\\circ`)} = ${wartosc}$, więc $\\alpha = ${A}^\\circ$.`,
  ]);
}

// --- 2. Trójkąt prostokątny

const PROSTY = "W trójkącie prostokątnym $ABC$ kąt $ACB$ jest prosty";

function trojkatProstokatny(r) {
  const wariant = r.pick(["bok", "bok", "pole", "wysokosc", "tryg", "tryg"]);
  if (wariant === "bok") return prostokatnyBok(r);
  if (wariant === "pole") return prostokatnyPole(r);
  if (wariant === "wysokosc") return prostokatnyWysokosc(r);
  return prostokatnyTryg(r);
}

/** Twierdzenie Pitagorasa: przeciwprostokątna albo przyprostokątna. */
function prostokatnyBok(r) {
  const [a, b, c] = losujTrojke(r, 60);
  if (r.chance()) {
    const [tresc, etykieta] = r.pick([
      [`${PROSTY}, $|BC| = ${a}$ oraz $|AC| = ${b}$. Oblicz długość przeciwprostokątnej $AB$.`, "$|AB| =$"],
      [`Przyprostokątne trójkąta prostokątnego mają długości $${a}$ i $${b}$. Oblicz długość przeciwprostokątnej tego trójkąta.`, "Długość przeciwprostokątnej"],
    ]);
    return jednoPole("c", etykieta, c, `Przeciwprostokątna ma długość $${c}$.`, tresc, [
      `Z twierdzenia Pitagorasa: $c^2 = ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${c * c}$.`,
      `$c = \\sqrt{${c * c}} = ${c}$.`,
    ]);
  }
  const [tresc, etykieta] = r.pick([
    [`${PROSTY}, $|AB| = ${c}$ oraz $|BC| = ${a}$. Oblicz długość przyprostokątnej $AC$.`, "$|AC| =$"],
    [`Przeciwprostokątna trójkąta prostokątnego ma długość $${c}$, a jedna z przyprostokątnych ma długość $${a}$. Oblicz długość drugiej przyprostokątnej.`, "Długość drugiej przyprostokątnej"],
  ]);
  return jednoPole("b", etykieta, b, `Druga przyprostokątna ma długość $${b}$.`, tresc, [
    `Z twierdzenia Pitagorasa: $${a}^2 + b^2 = ${c}^2$, więc $b^2 = ${c * c} - ${a * a} = ${b * b}$.`,
    `$b = \\sqrt{${b * b}} = ${b}$.`,
  ]);
}

/** Pole albo obwód z przeciwprostokątnej i przyprostokątnej. */
function prostokatnyPole(r) {
  const [a, b, c] = losujTrojke(r, 50);
  const pole = r.chance();
  const co = pole ? "pole" : "obwód";
  const tresc = r.pick([
    `Przeciwprostokątna trójkąta prostokątnego ma długość $${c}$, a jedna z jego przyprostokątnych ma długość $${a}$. Oblicz ${co} tego trójkąta.`,
    `${PROSTY}, $|AB| = ${c}$ oraz $|AC| = ${a}$. Oblicz ${co} trójkąta $ABC$.`,
  ]);
  const kroki = [`Druga przyprostokątna: $\\sqrt{${c}^2 - ${a}^2} = \\sqrt{${c * c} - ${a * a}} = \\sqrt{${b * b}} = ${b}$.`];
  if (pole) {
    const P = (a * b) / 2;                       // jedna z przyprostokątnych jest zawsze parzysta
    kroki.push(`$P = \\frac{1}{2} \\cdot ${a} \\cdot ${b} = ${P}$.`);
    return jednoPole("P", "$P =$", P, `$P = ${P}$`, tresc, kroki);
  }
  kroki.push(`Obwód: $${a} + ${b} + ${c} = ${a + b + c}$.`);
  return jednoPole("L", "Obwód", a + b + c, `Obwód jest równy $${a + b + c}$.`, tresc, kroki);
}

/** Wysokość opuszczona na przeciwprostokątną, środkowa i promień okręgu opisanego. */
function prostokatnyWysokosc(r) {
  for (;;) {
    const [a, b, c] = losujTrojke(r, 50);
    const h = q(a * b, c);
    const pyt = r.pick(["h", "h", "srodkowa", "promien"]);
    if (pyt === "h" && h.d > 12) continue;
    const dane = `Przyprostokątne trójkąta prostokątnego $ABC$ mają długości $|AC| = ${b}$ i $|BC| = ${a}$.`;
    const krokC = `Przeciwprostokątna: $|AB| = \\sqrt{${b}^2 + ${a}^2} = \\sqrt{${c * c}} = ${c}$.`;
    if (pyt === "h") {
      const tresc = r.pick([
        `${dane} Oblicz długość wysokości $CD$ tego trójkąta opuszczonej na przeciwprostokątną.`,
        `${dane} Odcinek $CD$ jest wysokością tego trójkąta. Oblicz długość odcinka $CD$.`,
      ]);
      return jednoPole("h", "$|CD| =$", h, `$|CD| = ${h.tex()}$${h.calkowita ? "" : ` $= ${dz(h)}$`}`, tresc, [
        krokC,
        `Pole trójkąta liczymy na dwa sposoby: $\\frac{1}{2} \\cdot ${b} \\cdot ${a} = \\frac{1}{2} \\cdot ${c} \\cdot |CD|$.`,
        `Stąd $|CD| = \\frac{${b} \\cdot ${a}}{${c}} = ${h.tex()}$.`,
      ]);
    }
    const R = q(c, 2);
    const [tresc, etykieta] = pyt === "srodkowa"
      ? [`${dane} Oblicz długość środkowej $CM$ tego trójkąta poprowadzonej z wierzchołka kąta prostego.`, "$|CM| =$"]
      : [`${dane} Oblicz promień okręgu opisanego na tym trójkącie.`, "$R =$"];
    return jednoPole("R", etykieta, R, `$${pyt === "srodkowa" ? "|CM|" : "R"} = ${dz(R)}$`, tresc, [
      krokC,
      "Środek przeciwprostokątnej jest środkiem okręgu opisanego na trójkącie prostokątnym, więc jest jednakowo oddalony od wszystkich wierzchołków.",
      `${pyt === "srodkowa" ? "$|CM| = R" : "$R"} = \\frac{|AB|}{2} = \\frac{${c}}{2} = ${dz(R)}$.`,
    ]);
  }
}

/** Bok trójkąta prostokątnego z innego boku i funkcji trygonometrycznej kąta ostrego. */
function prostokatnyTryg(r) {
  const [a, b, c] = losujTrojke(r, 60);
  // α = kąt BAC leży naprzeciw boku BC = a; sin α = a/c, cos α = b/c, tg α = a/b
  const dl = { a, b, c }, nazwy = { a: "BC", b: "AC", c: "AB" };
  const f = r.pick(["sin", "cos", "tg"]);
  const [lic, mian] = { sin: ["a", "c"], cos: ["b", "c"], tg: ["a", "b"] }[f];
  const szukany = r.chance() ? lic : mian, dany = szukany === lic ? mian : lic;
  const wart = q(dl[lic], dl[mian]);
  const tresc = r.pick([
    `${PROSTY}, $|${nazwy[dany]}| = ${dl[dany]}$, a kąt $BAC$ ma miarę $\\alpha$ taką, że $${FUN[f].tex} = ${wart.tex()}$. Oblicz długość boku $${nazwy[szukany]}$.`,
    `W trójkącie $ABC$ kąt przy wierzchołku $C$ jest prosty, a kąt przy wierzchołku $A$ ma miarę $\\alpha$. Wiadomo, że $|${nazwy[dany]}| = ${dl[dany]}$ i $${FUN[f].tex} = ${wart.tex()}$. Oblicz $|${nazwy[szukany]}|$.`,
  ]);
  const podst = szukany === lic ? `\\frac{|${nazwy[lic]}|}{${dl[mian]}}` : `\\frac{${dl[lic]}}{|${nazwy[mian]}|}`;
  const wylicz = szukany === lic
    ? `|${nazwy[lic]}| = ${dl[mian]} \\cdot ${wart.tex()} = ${dl[lic]}`
    : `|${nazwy[mian]}| = ${dl[lic]} : ${wart.tex()} = ${dl[mian]}`;
  return jednoPole("x", `$|${nazwy[szukany]}| =$`, dl[szukany], `$|${nazwy[szukany]}| = ${dl[szukany]}$`, tresc, [
    `W trójkącie prostokątnym $${FUN[f].tex} = \\frac{|${nazwy[lic]}|}{|${nazwy[mian]}|}$, więc $${podst} = ${wart.tex()}$.`,
    `Stąd $${wylicz}$.`,
  ]);
}

// --- 3. Pola figur

function polaFigur(r) {
  const wariant = r.pick(["trojkat", "trojkat", "romb", "trapez", "trapez", "rownoleglobok"]);
  if (wariant === "trojkat") return poleTrojkata(r);
  if (wariant === "romb") return poleRombu(r);
  if (wariant === "trapez") return poleTrapezu(r);
  return poleRownolegloboku(r);
}

/** Kąt 30° albo 150° – jedyne (poza 90°), dla których sinus jest wymierny. */
function sinus30(kat) {
  return kat === 30 ? "\\sin 30^\\circ = \\frac{1}{2}" : "\\sin 150^\\circ = \\sin(180^\\circ - 30^\\circ) = \\sin 30^\\circ = \\frac{1}{2}";
}

/** Trójkąt: podstawa i wysokość albo dwa boki i kąt 30° lub 150° między nimi (także zadania odwrotne). */
function poleTrojkata(r) {
  const odwrotne = r.chance(0.35);
  if (r.chance()) {
    const a = r.int(3, 20), h = r.int(2, 16), P = q(a * h, 2);
    if (!odwrotne) {
      const tresc = `W trójkącie $ABC$ bok $AB$ ma długość $${a}$, a wysokość $CD$ opuszczona na ten bok ma długość $${h}$. Oblicz pole trójkąta $ABC$.`;
      return jednoPole("P", "$P =$", P, `$P = ${dz(P)}$`, tresc, [`$P = \\frac{1}{2} \\cdot |AB| \\cdot |CD| = \\frac{1}{2} \\cdot ${a} \\cdot ${h} = ${dz(P)}$.`]);
    }
    const tresc = `Pole trójkąta $ABC$ jest równe $${dz(P)}$, a bok $AB$ ma długość $${a}$. Oblicz długość wysokości tego trójkąta opuszczonej na bok $AB$.`;
    return jednoPole("h", "$h =$", h, `$h = ${h}$`, tresc, [
      `$P = \\frac{1}{2} \\cdot |AB| \\cdot h$, więc $${dz(P)} = \\frac{1}{2} \\cdot ${a} \\cdot h$.`,
      `$h = \\frac{2 \\cdot ${dz(P)}}{${a}} = ${h}$.`,
    ]);
  }
  const kat = r.pick([30, 150]);
  const a = r.int(2, 16), b = r.int(2, 16), P = q(a * b, 4);
  const dane = `W trójkącie $ABC$ dane są: $|AB| = ${a}$, $|AC| = ${b}$ oraz $${miara("BAC")} = ${kat}^\\circ$.`;
  const wzor = `P = \\frac{1}{2} \\cdot |AB| \\cdot |AC| \\cdot \\sin ${kat}^\\circ`;
  if (!odwrotne) {
    return jednoPole("P", "$P =$", P, `$P = ${dz(P)}$`, `${dane} Oblicz pole trójkąta $ABC$.`, [
      `$${sinus30(kat)}$.`,
      `$${wzor} = \\frac{1}{2} \\cdot ${a} \\cdot ${b} \\cdot \\frac{1}{2} = ${dz(P)}$.`,
    ]);
  }
  const tresc = `Pole trójkąta $ABC$ jest równe $${dz(P)}$. Bok $AB$ ma długość $${a}$, a kąt $BAC$ ma miarę $${kat}^\\circ$. Oblicz długość boku $AC$.`;
  return jednoPole("b", "$|AC| =$", b, `$|AC| = ${b}$`, tresc, [
    `$${sinus30(kat)}$.`,
    `$${wzor}$, więc $${dz(P)} = \\frac{1}{2} \\cdot ${a} \\cdot |AC| \\cdot \\frac{1}{2} = ${q(a, 4).tex()}|AC|$.`,
    `$|AC| = ${dz(P)} : ${q(a, 4).tex()} = ${b}$.`,
  ]);
}

/** Romb: pole z przekątnych, bok z przekątnych, przekątna z pola, pole z boku i kąta 30° lub 150°. */
function poleRombu(r) {
  const typ = r.pick(["pole", "bok", "przekatna", "kat"]);
  if (typ === "pole" || typ === "przekatna") {
    const e = r.int(2, 20), f = r.intBez(2, 20, e), P = q(e * f, 2);
    if (typ === "pole") {
      const tresc = r.pick([
        `Przekątne rombu mają długości $${e}$ i $${f}$. Oblicz pole tego rombu.`,
        `W rombie $ABCD$ przekątne mają długości $|AC| = ${e}$ i $|BD| = ${f}$. Oblicz pole rombu $ABCD$.`,
      ]);
      return jednoPole("P", "$P =$", P, `$P = ${dz(P)}$`, tresc, [`Pole rombu jest równe połowie iloczynu długości przekątnych: $P = \\frac{${e} \\cdot ${f}}{2} = ${dz(P)}$.`]);
    }
    const tresc = `Pole rombu $ABCD$ jest równe $${dz(P)}$, a przekątna $AC$ ma długość $${e}$. Oblicz długość przekątnej $BD$.`;
    return jednoPole("f", "$|BD| =$", f, `$|BD| = ${f}$`, tresc, [
      `$P = \\frac{|AC| \\cdot |BD|}{2}$, więc $${dz(P)} = \\frac{${e} \\cdot |BD|}{2}$.`,
      `$|BD| = \\frac{2 \\cdot ${dz(P)}}{${e}} = ${f}$.`,
    ]);
  }
  if (typ === "bok") {
    const [x, y, s] = losujTrojke(r, 30);
    const obwod = r.chance();
    const tresc = `Przekątne rombu mają długości $${2 * x}$ i $${2 * y}$. Oblicz ${obwod ? "obwód" : "długość boku"} tego rombu.`;
    const kroki = [
      `Przekątne rombu są prostopadłe i dzielą się na połowy, więc połowy przekątnych ($${x}$ i $${y}$) są przyprostokątnymi trójkąta, którego przeciwprostokątną jest bok rombu.`,
      `Bok: $a = \\sqrt{${x}^2 + ${y}^2} = \\sqrt{${s * s}} = ${s}$.`,
    ];
    if (!obwod) return jednoPole("a", "$a =$", s, `$a = ${s}$`, tresc, kroki);
    kroki.push(`Obwód: $4 \\cdot ${s} = ${4 * s}$.`);
    return jednoPole("L", "Obwód", 4 * s, `Obwód jest równy $${4 * s}$.`, tresc, kroki);
  }
  const a = r.int(2, 14), kat = r.pick([30, 150]), P = q(a * a, 2);
  const tresc = r.pick([
    `Bok rombu ma długość $${a}$, a kąt ${kat === 30 ? "ostry" : "rozwarty"} tego rombu ma miarę $${kat}^\\circ$. Oblicz pole tego rombu.`,
    `W rombie o boku długości $${a}$ jeden z kątów ma miarę $${kat}^\\circ$. Oblicz pole tego rombu.`,
  ]);
  return jednoPole("P", "$P =$", P, `$P = ${dz(P)}$`, tresc, [
    `Romb jest równoległobokiem, więc $P = a^2 \\cdot \\sin ${kat}^\\circ$, gdzie $${sinus30(kat)}$.`,
    `$P = ${a}^2 \\cdot \\frac{1}{2} = ${dz(P)}$.`,
  ]);
}

/** Trapez: pole z podstaw i wysokości, trapez równoramienny lub prostokątny z ramienia, wysokość z pola. */
function poleTrapezu(r) {
  const typ = r.pick(["zwykly", "rownoramienny", "rownoramienny", "prostokatny", "wysokosc"]);
  if (typ === "zwykly" || typ === "wysokosc") {
    for (;;) {
      const b = r.int(2, 14), a = b + r.int(2, 12), h = r.int(2, 12);
      const P = q((a + b) * h, 2);
      if (typ === "zwykly") {
        const tresc = `Podstawy trapezu mają długości $${a}$ i $${b}$, a wysokość tego trapezu jest równa $${h}$. Oblicz pole tego trapezu.`;
        return jednoPole("P", "$P =$", P, `$P = ${dz(P)}$`, tresc, [`$P = \\frac{a + b}{2} \\cdot h = \\frac{${a} + ${b}}{2} \\cdot ${h} = ${dz(P)}$.`]);
      }
      const tresc = `Pole trapezu jest równe $${dz(P)}$, a jego podstawy mają długości $${a}$ i $${b}$. Oblicz wysokość tego trapezu.`;
      return jednoPole("h", "$h =$", h, `$h = ${h}$`, tresc, [
        `$P = \\frac{a + b}{2} \\cdot h$, więc $${dz(P)} = \\frac{${a} + ${b}}{2} \\cdot h = ${dz(q(a + b, 2))}h$.`,
        `$h = ${dz(P)} : ${dz(q(a + b, 2))} = ${h}$.`,
      ]);
    }
  }
  const [x, h, c] = losujTrojke(r, 30);
  const b = r.int(2, 12);
  if (typ === "rownoramienny") {
    const a = b + 2 * x, P = q((a + b) * h, 2);
    const tresc = r.pick([
      `Podstawy trapezu równoramiennego mają długości $${a}$ i $${b}$, a ramię ma długość $${c}$. Oblicz pole tego trapezu.`,
      `Dany jest trapez równoramienny $ABCD$ o podstawach $|AB| = ${a}$ i $|CD| = ${b}$. Ramię $AD$ ma długość $${c}$. Oblicz pole tego trapezu.`,
    ]);
    return jednoPole("P", "$P =$", P, `$P = ${dz(P)}$`, tresc, [
      `Spodek wysokości poprowadzonej z wierzchołka krótszej podstawy odcina na dłuższej podstawie odcinek długości $\\frac{${a} - ${b}}{2} = ${x}$.`,
      `Z twierdzenia Pitagorasa: $h = \\sqrt{${c}^2 - ${x}^2} = \\sqrt{${h * h}} = ${h}$.`,
      `$P = \\frac{${a} + ${b}}{2} \\cdot ${h} = ${dz(P)}$.`,
    ]);
  }
  const a = b + x, P = q((a + b) * h, 2);
  const tresc = `W trapezie prostokątnym $ABCD$ podstawy mają długości $|AB| = ${a}$ i $|CD| = ${b}$, ramię $AD$ jest prostopadłe do podstaw, a ramię $BC$ ma długość $${c}$. Oblicz pole tego trapezu.`;
  return jednoPole("P", "$P =$", P, `$P = ${dz(P)}$`, tresc, [
    `Wysokość $CE$ poprowadzona z wierzchołka $C$ odcina na podstawie $AB$ odcinek $EB$ długości $${a} - ${b} = ${x}$.`,
    `Z twierdzenia Pitagorasa w trójkącie $EBC$: $h = \\sqrt{${c}^2 - ${x}^2} = \\sqrt{${h * h}} = ${h}$.`,
    `$P = \\frac{${a} + ${b}}{2} \\cdot ${h} = ${dz(P)}$.`,
  ]);
}

/** Równoległobok: podstawa i wysokość, dwa boki i kąt 30° lub 150°, wysokość z pola. */
function poleRownolegloboku(r) {
  const typ = r.pick(["wysokosc", "kat", "kat", "odwrotne"]);
  const a = r.int(3, 16);
  if (typ === "kat") {
    const b = r.int(2, 14), kat = r.pick([30, 150]), P = q(a * b, 2);
    const tresc = r.pick([
      `Dany jest równoległobok o bokach długości $${a}$ i $${b}$ oraz o kącie między nimi o mierze $${kat}^\\circ$. Oblicz pole tego równoległoboku.`,
      `W równoległoboku $ABCD$ dane są: $|AB| = ${a}$, $|AD| = ${b}$ oraz $${miara("DAB")} = ${kat}^\\circ$. Oblicz pole tego równoległoboku.`,
    ]);
    return jednoPole("P", "$P =$", P, `$P = ${dz(P)}$`, tresc, [
      `$P = a \\cdot b \\cdot \\sin ${kat}^\\circ$, gdzie $${sinus30(kat)}$.`,
      `$P = ${a} \\cdot ${b} \\cdot \\frac{1}{2} = ${dz(P)}$.`,
    ]);
  }
  const h = r.int(2, 14), P = a * h;
  if (typ === "wysokosc") {
    const tresc = `Bok $AB$ równoległoboku $ABCD$ ma długość $${a}$, a wysokość opuszczona na ten bok ma długość $${h}$. Oblicz pole tego równoległoboku.`;
    return jednoPole("P", "$P =$", P, `$P = ${P}$`, tresc, [`$P = |AB| \\cdot h = ${a} \\cdot ${h} = ${P}$.`]);
  }
  const tresc = `Pole równoległoboku $ABCD$ jest równe $${P}$, a bok $AB$ ma długość $${a}$. Oblicz długość wysokości tego równoległoboku opuszczonej na bok $AB$.`;
  return jednoPole("h", "$h =$", h, `$h = ${h}$`, tresc, [`$P = |AB| \\cdot h$, więc $h = \\frac{${P}}{${a}} = ${h}$.`]);
}

// --- 4. Kąty i okręgi

function katy(r) {
  const wariant = r.pick(["trojkat", "trojkat", "okrag", "okrag", "rownolegle", "wielokat"]);
  if (wariant === "trojkat") return katyTrojkat(r);
  if (wariant === "okrag") return katyOkrag(r);
  if (wariant === "rownolegle") return katyRownolegle(r);
  return katyWielokat(r);
}

/** Zadanie o mierze kąta (odpowiedź w stopniach). */
const zadanieKat = (abc, wartosc, tresc, rozwiazanie) =>
  jednoPole("k", `Miara kąta $${abc}$ (w stopniach)`, wartosc, `$${miara(abc)} = ${wartosc}^\\circ$`, tresc, rozwiazanie);

function katyTrojkat(r) {
  const typ = r.pick(["dwa", "stosunek", "rownoramienny", "rownoramienny", "zewnetrzny"]);
  if (typ === "dwa") {
    for (;;) {
      const al = r.int(20, 110), be = r.int(15, 100), ga = 180 - al - be;
      if (ga < 15) continue;
      const tresc = `W trójkącie $ABC$ kąt $BAC$ ma miarę $${al}^\\circ$, a kąt $ABC$ ma miarę $${be}^\\circ$. Oblicz miarę kąta $ACB$.`;
      return zadanieKat("ACB", ga, tresc, [`Suma miar kątów trójkąta jest równa $180^\\circ$, więc $${miara("ACB")} = 180^\\circ - ${al}^\\circ - ${be}^\\circ = ${ga}^\\circ$.`]);
    }
  }
  if (typ === "stosunek") {
    for (;;) {
      const t = [r.int(1, 9), r.int(1, 9), r.int(1, 9)];
      const S = t[0] + t[1] + t[2];
      if (180 % S !== 0 || new Set(t).size < 2) continue;
      const najw = r.chance();
      const odp = (180 / S) * (najw ? Math.max(...t) : Math.min(...t));
      const tresc = `Miary kątów trójkąta są w stosunku $${t.join(" : ")}$. Oblicz miarę ${najw ? "największego" : "najmniejszego"} kąta tego trójkąta.`;
      return jednoPole("k", "Miara kąta (w stopniach)", odp, `$${odp}^\\circ$`, tresc, [
        `Miary kątów to $${t[0] === 1 ? "" : t[0]}x$, $${t[1] === 1 ? "" : t[1]}x$ i $${t[2] === 1 ? "" : t[2]}x$, a ich suma jest równa $180^\\circ$: $${S}x = 180^\\circ$, więc $x = ${180 / S}^\\circ$.`,
        `${najw ? "Największy" : "Najmniejszy"} kąt ma miarę $${najw ? Math.max(...t) : Math.min(...t)} \\cdot ${180 / S}^\\circ = ${odp}^\\circ$.`,
      ]);
    }
  }
  if (typ === "rownoramienny") {
    const be = r.int(20, 85), ga = 180 - 2 * be;
    const rodzaj = r.pick(["zGamma", "zBeta", "roznica"]);
    const podstawa = "W trójkącie równoramiennym $ABC$ o podstawie $AB$";
    if (rodzaj === "zGamma") {
      return zadanieKat("BAC", be, `${podstawa} kąt $ACB$ między ramionami ma miarę $${ga}^\\circ$. Oblicz miarę kąta $BAC$.`, [
        "Kąty przy podstawie trójkąta równoramiennego są równe.",
        `$${miara("BAC")} = \\frac{180^\\circ - ${ga}^\\circ}{2} = ${be}^\\circ$.`,
      ]);
    }
    if (rodzaj === "zBeta" || be === ga) {
      return zadanieKat("ACB", ga, `${podstawa} kąt $BAC$ ma miarę $${be}^\\circ$. Oblicz miarę kąta $ACB$.`, [
        `Kąty przy podstawie są równe: $${miara("ABC")} = ${miara("BAC")} = ${be}^\\circ$.`,
        `$${miara("ACB")} = 180^\\circ - 2 \\cdot ${be}^\\circ = ${ga}^\\circ$.`,
      ]);
    }
    const d = be - ga, wiekszy = d > 0;
    const tresc = `${podstawa} kąt przy podstawie jest o $${Math.abs(d)}^\\circ$ ${wiekszy ? "większy" : "mniejszy"} od kąta $ACB$ między ramionami. Oblicz miarę kąta $ACB$.`;
    return zadanieKat("ACB", ga, tresc, [
      `Niech $${miara("ACB")} = \\gamma$. Kąty przy podstawie mają miarę $\\gamma ${wiekszy ? "+" : "-"} ${Math.abs(d)}^\\circ$.`,
      `$\\gamma + 2(\\gamma ${wiekszy ? "+" : "-"} ${Math.abs(d)}^\\circ) = 180^\\circ$, czyli $3\\gamma = ${180 - 2 * d}^\\circ$, więc $\\gamma = ${ga}^\\circ$.`,
    ]);
  }
  for (;;) {
    const al = r.int(20, 100), be = r.int(20, 100);
    if (al + be > 165 || al === be) continue;
    const tresc = `Kąt zewnętrzny trójkąta $ABC$ przy wierzchołku $C$ ma miarę $${al + be}^\\circ$, a kąt $BAC$ ma miarę $${al}^\\circ$. Oblicz miarę kąta $ABC$.`;
    return zadanieKat("ABC", be, tresc, [
      `Kąt zewnętrzny trójkąta jest równy sumie dwóch kątów wewnętrznych do niego nieprzyległych: $${al + be}^\\circ = ${al}^\\circ + ${miara("ABC")}$.`,
      `$${miara("ABC")} = ${al + be}^\\circ - ${al}^\\circ = ${be}^\\circ$.`,
    ]);
  }
}

/** Kąt wpisany i środkowy oparte na tym samym łuku, kąt oparty na średnicy (CKE 2023, 2025). */
function katyOkrag(r) {
  const typ = r.pick(["srodkowy", "srodkowy", "trojkatO", "srednica"]);
  if (typ === "srodkowy") {
    const al = r.int(10, 85), be = 2 * al;
    const rodzaj = r.pick(["zWpisanego", "zeSrodkowego", "roznica"]);
    const dane = "W okręgu o środku $O$ kąt środkowy $AOB$ i kąt wpisany $ACB$ są oparte na tym samym łuku $AB$";
    const fakt = "Kąt środkowy ma miarę dwa razy większą niż kąt wpisany oparty na tym samym łuku.";
    if (rodzaj === "zWpisanego") {
      return zadanieKat("AOB", be, `${dane}. Kąt $ACB$ ma miarę $${al}^\\circ$. Oblicz miarę kąta $AOB$.`, [fakt, `$${miara("AOB")} = 2 \\cdot ${al}^\\circ = ${be}^\\circ$.`]);
    }
    if (rodzaj === "zeSrodkowego") {
      return zadanieKat("ACB", al, `${dane}. Kąt $AOB$ ma miarę $${be}^\\circ$. Oblicz miarę kąta $ACB$.`, [fakt, `$${miara("ACB")} = ${be}^\\circ : 2 = ${al}^\\circ$.`]);
    }
    const pytamSrodkowy = r.chance();
    const abc = pytamSrodkowy ? "AOB" : "ACB";
    return zadanieKat(abc, pytamSrodkowy ? be : al, `${dane}. Kąt $AOB$ ma miarę o $${al}^\\circ$ większą od miary kąta $ACB$. Oblicz miarę kąta $${abc}$.`, [
      `${fakt} Jeśli $${miara("ACB")} = \\alpha$, to $${miara("AOB")} = 2\\alpha$.`,
      `$2\\alpha - \\alpha = ${al}^\\circ$, więc $\\alpha = ${al}^\\circ$${pytamSrodkowy ? ` i $${miara("AOB")} = ${be}^\\circ$` : ""}.`,
    ]);
  }
  if (typ === "trojkatO") {
    const ga = r.int(20, 80);
    const pytamABO = r.chance(0.65);
    const tresc = `Punkty $A$, $B$ i $C$ leżą na okręgu o środku $O$. Kąt $ACB$ jest ostry i ma miarę $${ga}^\\circ$. Oblicz miarę kąta ${pytamABO ? "ostrego $ABO$" : "$AOB$"}.`;
    const kroki = [`Kąt środkowy $AOB$ i kąt wpisany $ACB$ są oparte na tym samym łuku, więc $${miara("AOB")} = 2 \\cdot ${ga}^\\circ = ${2 * ga}^\\circ$.`];
    if (!pytamABO) return zadanieKat("AOB", 2 * ga, tresc, kroki);
    kroki.push(`Trójkąt $AOB$ jest równoramienny ($|OA| = |OB|$ – promienie), więc $${miara("ABO")} = \\frac{180^\\circ - ${2 * ga}^\\circ}{2} = ${90 - ga}^\\circ$.`);
    return zadanieKat("ABO", 90 - ga, tresc, kroki);
  }
  const x = r.int(15, 75);
  const tresc = r.pick([
    `Odcinek $AB$ jest średnicą okręgu, a punkt $C$ leży na tym okręgu i jest różny od $A$ i $B$. Kąt $CAB$ ma miarę $${x}^\\circ$. Oblicz miarę kąta $ABC$.`,
    `Trójkąt $ABC$ jest wpisany w okrąg, którego średnicą jest bok $AB$. Kąt $BAC$ ma miarę $${x}^\\circ$. Oblicz miarę kąta $ABC$.`,
  ]);
  return zadanieKat("ABC", 90 - x, tresc, [
    `Kąt wpisany oparty na średnicy jest prosty, więc $${miara("ACB")} = 90^\\circ$.`,
    `$${miara("ABC")} = 180^\\circ - 90^\\circ - ${x}^\\circ = ${90 - x}^\\circ$.`,
  ]);
}

/** Kąty przy prostych równoległych: trapez, równoległobok, kąty naprzemianległe i odpowiadające. */
function katyRownolegle(r) {
  const typ = r.pick(["trapez", "rownoleglobok", "proste", "proste"]);
  if (typ === "trapez") {
    const x = r.intBez(35, 145, 90);
    const tresc = `W trapezie $ABCD$ o podstawach $AB$ i $CD$ kąt $DAB$ ma miarę $${x}^\\circ$. Oblicz miarę kąta $ADC$.`;
    return zadanieKat("ADC", 180 - x, tresc, [
      "Podstawy trapezu są równoległe, więc kąty przy tym samym ramieniu sumują się do $180^\\circ$.",
      `$${miara("ADC")} = 180^\\circ - ${x}^\\circ = ${180 - x}^\\circ$.`,
    ]);
  }
  if (typ === "rownoleglobok") {
    const s = r.int(20, 85), d = 180 - 2 * s;
    const pytamOstry = r.chance();
    const tresc = `Jeden z kątów równoległoboku jest o $${d}^\\circ$ większy od drugiego. Oblicz miarę ${pytamOstry ? "kąta ostrego" : "kąta rozwartego"} tego równoległoboku.`;
    const odp = pytamOstry ? s : 180 - s;
    return jednoPole("k", `Miara kąta ${pytamOstry ? "ostrego" : "rozwartego"} (w stopniach)`, odp, `$${odp}^\\circ$`, tresc, [
      `Sąsiednie kąty równoległoboku sumują się do $180^\\circ$. Jeśli kąt ostry ma miarę $\\alpha$, to rozwarty ma miarę $\\alpha + ${d}^\\circ$.`,
      `$2\\alpha + ${d}^\\circ = 180^\\circ$, więc $\\alpha = ${s}^\\circ$${pytamOstry ? "" : `, a kąt rozwarty ma miarę $${180 - s}^\\circ$`}.`,
    ]);
  }
  for (;;) {
    const x = r.int(5, 40), a = r.int(1, 5), c = r.intBez(1, 5, a);
    const rodzaj = r.pick(["naprzemianległe", "odpowiadające", "przyległe"]);
    const A = r.int(25, 155);
    const b = A - a * x, d = (rodzaj === "przyległe" ? 180 - A : A) - c * x;
    const w1 = sumaTex([[a, "x"], [b, ""]]), w2 = sumaTex([[c, "x"], [d, ""]]);
    const tresc = rodzaj === "przyległe"
      ? `Dwa kąty przyległe mają miary $(${w1})^\\circ$ oraz $(${w2})^\\circ$. Oblicz $x$.`
      : `Proste równoległe $k$ i $l$ przecięto prostą $m$. Dwa kąty ${rodzaj} utworzone przez te proste mają miary $(${w1})^\\circ$ oraz $(${w2})^\\circ$. Oblicz $x$.`;
    const rown = rodzaj === "przyległe" ? `${w1} + ${w2} = 180` : `${w1} = ${w2}`;
    const L = rodzaj === "przyległe" ? a + c : a - c, P = rodzaj === "przyległe" ? 180 - b - d : d - b;
    return jednoPole("x", "$x =$", x, `$x = ${x}$`, tresc, [
      rodzaj === "przyległe" ? "Suma miar kątów przyległych jest równa $180^\\circ$." : `Kąty ${rodzaj} przy prostych równoległych są równe.`,
      `$${rown}$, czyli $${sumaTex([[L, "x"]])} = ${P}$, więc $x = ${x}$.`,
      `Sprawdzenie: kąty mają miary $${a * x + b}^\\circ$ i $${c * x + d}^\\circ$.`,
    ]);
  }
}

const N_KAT = { 5: "pięciokąt", 6: "sześciokąt", 7: "siedmiokąt", 8: "ośmiokąt", 9: "dziewięciokąt", 10: "dziesięciokąt",
  11: "jedenastokąt", 12: "dwunastokąt", 15: "piętnastokąt", 18: "osiemnastokąt", 20: "dwudziestokąt" };

/** Suma kątów wewnętrznych wielokąta i kąt wielokąta foremnego. */
function katyWielokat(r) {
  const typ = r.pick(["suma", "foremny", "ileBokow", "foremnyBoki"]);
  const n = Number(r.pick(Object.keys(N_KAT)));
  const S = (n - 2) * 180, k = S / n;
  const nazwa = N_KAT[n];
  if (typ === "suma") {
    return jednoPole("S", "Suma miar kątów (w stopniach)", S, `$${S}^\\circ$`, `Oblicz sumę miar kątów wewnętrznych ${nazwa}a wypukłego.`, [
      `Suma miar kątów wewnętrznych $n$-kąta wypukłego jest równa $(n - 2) \\cdot 180^\\circ$.`,
      `Dla $n = ${n}$: $${n - 2} \\cdot 180^\\circ = ${S}^\\circ$.`,
    ]);
  }
  if (typ === "ileBokow") {
    const tresc = `Suma miar kątów wewnętrznych wielokąta wypukłego jest równa $${S}^\\circ$. Oblicz, ile boków ma ten wielokąt.`;
    return jednoPole("n", "Liczba boków", n, `$n = ${n}$ (${nazwa})`, tresc, [
      `$(n - 2) \\cdot 180^\\circ = ${S}^\\circ$, więc $n - 2 = ${n - 2}$.`,
      `$n = ${n}$.`,
    ]);
  }
  if (!Number.isInteger(k)) return katyWielokat(r);
  if (typ === "foremny") {
    return jednoPole("k", "Miara kąta (w stopniach)", k, `$${k}^\\circ$`, `Oblicz miarę kąta wewnętrznego ${nazwa}a foremnego.`, [
      `Suma miar kątów wewnętrznych ${nazwa}a: $(${n} - 2) \\cdot 180^\\circ = ${S}^\\circ$.`,
      `Wszystkie kąty wielokąta foremnego są równe: $${S}^\\circ : ${n} = ${k}^\\circ$.`,
    ]);
  }
  const tresc = `Każdy kąt wewnętrzny wielokąta foremnego ma miarę $${k}^\\circ$. Oblicz, ile boków ma ten wielokąt.`;
  return jednoPole("n", "Liczba boków", n, `$n = ${n}$ (${nazwa} foremny)`, tresc, [
    `Kąt zewnętrzny tego wielokąta ma miarę $180^\\circ - ${k}^\\circ = ${180 - k}^\\circ$, a suma kątów zewnętrznych wielokąta wypukłego jest równa $360^\\circ$.`,
    `$n = 360^\\circ : ${180 - k}^\\circ = ${n}$.`,
  ]);
}

// --- 5. Odcinek w układzie współrzędnych

const UKLAD = "W kartezjańskim układzie współrzędnych $(x, y)$";

function odcinek(r) {
  const wariant = r.pick(["dlugosc", "dlugosc", "srodek", "koniec", "symetria"]);
  if (wariant === "dlugosc") return odcinekDlugosc(r);
  if (wariant === "srodek") return odcinekSrodek(r);
  if (wariant === "koniec") return odcinekKoniec(r);
  return odcinekSymetria(r);
}

/** Różnica współrzędnych do wzoru na długość: "(5 - (-3))^2". */
const roznicaKw = (u, v) => `(${u} - ${texNawias(v)})^2`;

/** Długość odcinka (przesunięcie z trójki pitagorejskiej), także przekątna kwadratu ze środka (CKE 2025, zad. 22). */
function odcinekDlugosc(r) {
  for (;;) {
    const [p, s, c] = losujTrojke(r, 26);
    const x1 = r.int(-9, 9), y1 = r.int(-9, 9);
    const x2 = x1 + p * r.znak(), y2 = y1 + s * r.znak();
    if (Math.abs(x2) > 14 || Math.abs(y2) > 14) continue;
    const wzor = `\\sqrt{${roznicaKw(x2, x1)} + ${roznicaKw(y2, y1)}} = \\sqrt{${p * p} + ${s * s}} = \\sqrt{${c * c}} = ${c}`;
    if (r.chance(0.75)) {
      const tresc = r.pick([
        `${UKLAD} dane są punkty $A = ${punktTex(x1, y1)}$ oraz $B = ${punktTex(x2, y2)}$. Oblicz długość odcinka $AB$.`,
        `Odcinek $AB$ ma końce w punktach $A = ${punktTex(x1, y1)}$ i $B = ${punktTex(x2, y2)}$. Oblicz $|AB|$.`,
      ]);
      return jednoPole("d", "$|AB| =$", c, `$|AB| = ${c}$`, tresc, [`$|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2} = ${wzor}$.`]);
    }
    const tresc = `${UKLAD} dany jest kwadrat $ABCD$, w którym $A = ${punktTex(x2, y2)}$. Przekątne tego kwadratu przecinają się w punkcie $S = ${punktTex(x1, y1)}$. Oblicz długość przekątnej tego kwadratu.`;
    return jednoPole("d", "$|AC| =$", 2 * c, `$|AC| = ${2 * c}$`, tresc, [
      `Przekątne kwadratu dzielą się na połowy, więc $|AC| = 2|AS|$.`,
      `$|AS| = \\sqrt{${roznicaKw(x1, x2)} + ${roznicaKw(y1, y2)}} = \\sqrt{${c * c}} = ${c}$, więc $|AC| = 2 \\cdot ${c} = ${2 * c}$.`,
    ]);
  }
}

/** Środek odcinka. */
function odcinekSrodek(r) {
  const x1 = r.int(-10, 10), y1 = r.int(-10, 10);
  const x2 = r.intBez(-10, 10, x1), y2 = r.int(-10, 10);
  const xs = q(x1 + x2, 2), ys = q(y1 + y2, 2);
  const tresc = r.pick([
    `${UKLAD} dane są punkty $A = ${punktTex(x1, y1)}$ i $B = ${punktTex(x2, y2)}$. Oblicz współrzędne środka $S$ odcinka $AB$.`,
    `Punkt $S$ jest środkiem odcinka $AB$, gdzie $A = ${punktTex(x1, y1)}$ i $B = ${punktTex(x2, y2)}$. Wyznacz współrzędne punktu $S$.`,
  ]);
  return zadaniePunkt(tresc, "S", xs, ys, [
    `$x_S = \\frac{x_A + x_B}{2} = \\frac{${x1} + ${texNawias(x2)}}{2} = ${xs.tex()}$, $y_S = \\frac{y_A + y_B}{2} = \\frac{${y1} + ${texNawias(y2)}}{2} = ${ys.tex()}$.`,
    `$S = ${punktTex(xs, ys)}$.`,
  ]);
}

/** Drugi koniec odcinka z jego środka. */
function odcinekKoniec(r) {
  const x1 = r.int(-9, 9), y1 = r.int(-9, 9), xs = r.int(-7, 7), ys = r.int(-7, 7);
  if (x1 === xs && y1 === ys) return odcinekKoniec(r);
  const x2 = 2 * xs - x1, y2 = 2 * ys - y1;
  const tresc = r.pick([
    `${UKLAD} punkt $S = ${punktTex(xs, ys)}$ jest środkiem odcinka $AB$, w którym $A = ${punktTex(x1, y1)}$. Oblicz współrzędne punktu $B$.`,
    `Odcinek $AB$ ma środek w punkcie $S = ${punktTex(xs, ys)}$, a jeden z jego końców to $A = ${punktTex(x1, y1)}$. Wyznacz współrzędne końca $B$.`,
  ]);
  return zadaniePunkt(tresc, "B", x2, y2, [
    `$\\frac{${x1} + x_B}{2} = ${xs}$, więc $x_B = 2 \\cdot ${texNawias(xs)} - ${texNawias(x1)} = ${x2}$.`,
    `$\\frac{${y1} + y_B}{2} = ${ys}$, więc $y_B = 2 \\cdot ${texNawias(ys)} - ${texNawias(y1)} = ${y2}$.`,
  ]);
}

/** Punkt symetryczny względem osi, początku układu albo danego punktu. */
function odcinekSymetria(r) {
  const x = r.intBez(-10, 10, 0), y = r.intBez(-10, 10, 0);
  const typ = r.pick(["Ox", "Oy", "O", "S", "S"]);
  const A = `$A = ${punktTex(x, y)}$`;
  if (typ === "S") {
    const a = r.int(-6, 6), b = r.int(-6, 6);
    if (a === x && b === y) return odcinekSymetria(r);
    const px = 2 * a - x, py = 2 * b - y;
    return zadaniePunkt(`${UKLAD} punkt $P$ jest symetryczny do punktu ${A} względem punktu $S = ${punktTex(a, b)}$. Oblicz współrzędne punktu $P$.`, "P", px, py, [
      `Punkt $S$ jest środkiem odcinka $AP$.`,
      `$x_P = 2 \\cdot ${texNawias(a)} - ${texNawias(x)} = ${px}$, $y_P = 2 \\cdot ${texNawias(b)} - ${texNawias(y)} = ${py}$.`,
    ]);
  }
  const [px, py, wzgl, regula] = {
    Ox: [x, -y, "osi $Ox$", "W symetrii względem osi $Ox$ zmienia się znak drugiej współrzędnej"],
    Oy: [-x, y, "osi $Oy$", "W symetrii względem osi $Oy$ zmienia się znak pierwszej współrzędnej"],
    O: [-x, -y, "początku układu współrzędnych", "W symetrii względem początku układu zmieniają się znaki obu współrzędnych"],
  }[typ];
  return zadaniePunkt(`${UKLAD} punkt $P$ jest symetryczny do punktu ${A} względem ${wzgl}. Oblicz współrzędne punktu $P$.`, "P", px, py, [
    `${regula}: $P = ${punktTex(px, py)}$.`,
  ]);
}

// --- 6. Równanie okręgu

function okrag(r) {
  const wariant = r.pick(["kanoniczna", "kanoniczna", "ogolna", "punkt", "punkt", "styczny"]);
  if (wariant === "kanoniczna") return okragKanoniczny(r);
  if (wariant === "ogolna") return okragOgolny(r);
  if (wariant === "punkt") return okragPrzezPunkt(r);
  return okragStyczny(r);
}

/** (x - a)^2 + (y - b)^2 bez prawej strony. */
const lewaOkregu = (a, b) => `${nawiasMinus(a)}^2 + ${nawiasMinus(b, "y")}^2`;

/** Środek i promień – trzy pola a, b, r. */
const zadanieOkrag = (tresc, a, b, R, rozwiazanie) => ({
  tresc,
  pola: [{ id: "a", typ: "liczba", etykieta: "$a =$" }, { id: "b", typ: "liczba", etykieta: "$b =$" }, { id: "r", typ: "liczba", etykieta: "$r =$" }],
  odpowiedz: { a: q(a), b: q(b), r: q(R) },
  wynik: `$S = ${punktTex(a, b)}$, $r = ${R}$`,
  rozwiazanie,
});

const POLECENIE_SR = "Wyznacz współrzędne środka $S = (a, b)$ i promień $r$ tego okręgu.";

function okragKanoniczny(r) {
  const a = r.int(-7, 7), b = r.int(-7, 7), R = r.int(1, 9);
  const tresc = `${UKLAD} dany jest okrąg o równaniu $${lewaOkregu(a, b)} = ${R * R}$. ${POLECENIE_SR}`;
  return zadanieOkrag(tresc, a, b, R, [
    `Okrąg o równaniu $(x - a)^2 + (y - b)^2 = r^2$ ma środek $S = (a, b)$ i promień $r$.`,
    `${a === 0 ? "$x^2 = (x - 0)^2$, " : ""}${b === 0 ? "$y^2 = (y - 0)^2$, " : ""}więc $S = ${punktTex(a, b)}$, a $r^2 = ${R * R}$, czyli $r = ${R}$.`,
  ]);
}

/** x^2 + y^2 + Dx + Ey + F = 0 – uzupełniamy do pełnych kwadratów. */
function okragOgolny(r) {
  for (;;) {
    const a = r.intBez(-6, 6, 0), b = r.int(-6, 6), R = r.int(1, 8);
    const D = -2 * a, E = -2 * b, F = a * a + b * b - R * R;
    const rown = `x^2 + y^2${sumaTex([[D, "x"], [E, "y"], [F, ""]], true)} = 0`;
    const kw = (lit, s) => (s === 0 ? `${lit}^2` : `${lit}^2 ${plusMinus(-2 * s)}${lit} = ${nawiasMinus(s, lit)}^2 - ${s * s}`);
    const tresc = `${UKLAD} dany jest okrąg o równaniu $${rown}$. ${POLECENIE_SR}`;
    return zadanieOkrag(tresc, a, b, R, [
      `Uzupełniamy do pełnych kwadratów: $${kw("x", a)}$${b === 0 ? "" : `, $${kw("y", b)}$`}.`,
      `Równanie przyjmuje postać $${lewaOkregu(a, b)} = ${sumaTex([[a * a, ""], [b * b, ""], [-F, ""]])}$, czyli $${lewaOkregu(a, b)} = ${R * R}$.`,
      `Zatem $S = ${punktTex(a, b)}$ i $r = \\sqrt{${R * R}} = ${R}$.`,
    ]);
  }
}

/** Okrąg o danym środku przechodzący przez punkt: r^2 (CKE 2025, zad. 24). */
function okragPrzezPunkt(r) {
  const a = r.int(-6, 6), b = r.int(-6, 6);
  const px = a + r.intBez(-6, 6, 0), py = b + r.int(-6, 6);
  const R2 = (px - a) ** 2 + (py - b) ** 2;
  const tresc = r.pick([
    `${UKLAD} punkt $P = ${punktTex(px, py)}$ leży na okręgu o środku w punkcie $S = ${punktTex(a, b)}$. Równanie tego okręgu ma postać $${lewaOkregu(a, b)} = r^2$. Oblicz $r^2$.`,
    `Okrąg o środku $S = ${punktTex(a, b)}$ przechodzi przez punkt $P = ${punktTex(px, py)}$. Oblicz kwadrat promienia $r^2$ tego okręgu.`,
  ]);
  return jednoPole("r2", "$r^2 =$", R2, `$r^2 = ${R2}$, czyli $${lewaOkregu(a, b)} = ${R2}$`, tresc, [
    "Promień jest równy odległości punktu $P$ od środka $S$.",
    `$r^2 = |SP|^2 = ${roznicaKw(px, a)} + ${roznicaKw(py, b)} = ${(px - a) ** 2} + ${(py - b) ** 2} = ${R2}$.`,
  ]);
}

/** Okrąg o danym środku styczny do osi układu: r^2 (CKE 2023, grudzień). */
function okragStyczny(r) {
  const a = r.intBez(-8, 8, 0), b = r.intBez(-8, 8, 0);
  const osOx = r.chance();
  const R = Math.abs(osOx ? b : a);
  const tresc = `${UKLAD} dany jest okrąg o środku w punkcie $S = ${punktTex(a, b)}$, styczny do osi $${osOx ? "Ox" : "Oy"}$. Równanie tego okręgu ma postać $${lewaOkregu(a, b)} = r^2$. Oblicz $r^2$.`;
  return jednoPole("r2", "$r^2 =$", R * R, `$r^2 = ${R * R}$`, tresc, [
    `Promień okręgu stycznego do osi $${osOx ? "Ox" : "Oy"}$ jest równy odległości środka od tej osi, czyli $|${osOx ? "y_S" : "x_S"}| = ${R}$.`,
    `$r^2 = ${R}^2 = ${R * R}$.`,
  ]);
}

// --- 7. Graniastosłupy i ostrosłupy

function graniastoslupy(r) {
  const wariant = r.pick(["szescian", "szescian", "prostopadloscian", "prostopadloscian", "ostroslup", "ostroslup"]);
  if (wariant === "szescian") return szescian(r);
  if (wariant === "prostopadloscian") return prostopadloscian(r);
  return ostroslup(r);
}

function szescian(r) {
  const a = r.int(2, 10);
  const typ = r.pick(["V", "P", "przekatna", "przekatna", "sciana", "zV", "zP"]);
  const V = a ** 3, P = 6 * a * a;
  const krawedz = (tresc, kroki) => jednoPole("a", "Długość krawędzi", a, `$a = ${a}$`, tresc, kroki);
  if (typ === "V") return jednoPole("V", "$V =$", V, `$V = ${V}$`, `Krawędź sześcianu ma długość $${a}$. Oblicz objętość tego sześcianu.`, [`$V = a^3 = ${a}^3 = ${V}$.`]);
  if (typ === "P") return jednoPole("P", "$P_c =$", P, `$P_c = ${P}$`, `Krawędź sześcianu ma długość $${a}$. Oblicz pole powierzchni całkowitej tego sześcianu.`, [`Sześcian ma $6$ ścian – kwadratów o boku $${a}$: $P_c = 6 \\cdot ${a}^2 = ${P}$.`]);
  if (typ === "przekatna") {
    return krawedz(`Przekątna sześcianu ma długość $${a}\\sqrt{3}$. Oblicz długość krawędzi tego sześcianu.`, [
      "Przekątna sześcianu o krawędzi $a$ ma długość $a\\sqrt{3}$ (przekątna ściany $a\\sqrt{2}$ i krawędź $a$ są przyprostokątnymi).",
      `$a\\sqrt{3} = ${a}\\sqrt{3}$, więc $a = ${a}$.`,
    ]);
  }
  if (typ === "sciana") {
    return jednoPole("V", "$V =$", V, `$V = ${V}$`, `Przekątna ściany sześcianu ma długość $${a}\\sqrt{2}$. Oblicz objętość tego sześcianu.`, [
      `Ściana jest kwadratem o boku $a$, jej przekątna ma długość $a\\sqrt{2}$, więc $a = ${a}$.`,
      `$V = ${a}^3 = ${V}$.`,
    ]);
  }
  if (typ === "zV") return krawedz(`Objętość sześcianu jest równa $${V}$. Oblicz długość krawędzi tego sześcianu.`, [`$a^3 = ${V}$, więc $a = \\sqrt[3]{${V}} = ${a}$.`]);
  return krawedz(`Pole powierzchni całkowitej sześcianu jest równe $${P}$. Oblicz długość krawędzi tego sześcianu.`, [`$6a^2 = ${P}$, więc $a^2 = ${a * a}$ i $a = ${a}$.`]);
}

const CZWORKI = [[2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11], [4, 4, 7, 9], [1, 2, 2, 3], [6, 6, 7, 11], [3, 4, 12, 13], [8, 9, 12, 17], [2, 5, 14, 15]];

function prostopadloscian(r) {
  const [x, y, z, d] = r.pick(CZWORKI);
  const k = d <= 9 && r.chance(0.3) ? 2 : 1;
  const [a, b, c] = r.shuffle([x * k, y * k, z * k]), D = d * k;
  const typ = r.pick(["przekatna", "przekatna", "krawedz", "V", "P", "zV"]);
  const dane = `Krawędzie prostopadłościanu wychodzące z jednego wierzchołka mają długości $${a}$, $${b}$ i $${c}$.`;
  if (typ === "przekatna") {
    return jednoPole("d", "$d =$", D, `$d = ${D}$`, `${dane} Oblicz długość przekątnej tego prostopadłościanu.`, [
      `Przekątna prostopadłościanu o krawędziach $a$, $b$, $c$: $d = \\sqrt{a^2 + b^2 + c^2}$.`,
      `$d = \\sqrt{${a}^2 + ${b}^2 + ${c}^2} = \\sqrt{${a * a} + ${b * b} + ${c * c}} = \\sqrt{${D * D}} = ${D}$.`,
    ]);
  }
  if (typ === "krawedz") {
    const tresc = `Przekątna prostopadłościanu ma długość $${D}$, a dwie krawędzie wychodzące z jednego jego wierzchołka mają długości $${a}$ i $${b}$. Oblicz długość trzeciej krawędzi wychodzącej z tego wierzchołka.`;
    return jednoPole("c", "$c =$", c, `$c = ${c}$`, tresc, [
      `$${a}^2 + ${b}^2 + c^2 = ${D}^2$, więc $c^2 = ${D * D} - ${a * a} - ${b * b} = ${c * c}$.`,
      `$c = ${c}$.`,
    ]);
  }
  const V = a * b * c, P = 2 * (a * b + b * c + a * c);
  if (typ === "V") return jednoPole("V", "$V =$", V, `$V = ${V}$`, `${dane} Oblicz objętość tego prostopadłościanu.`, [`$V = ${a} \\cdot ${b} \\cdot ${c} = ${V}$.`]);
  if (typ === "P") {
    return jednoPole("P", "$P_c =$", P, `$P_c = ${P}$`, `${dane} Oblicz pole powierzchni całkowitej tego prostopadłościanu.`, [
      `$P_c = 2(ab + bc + ac) = 2(${a * b} + ${b * c} + ${a * c}) = ${P}$.`,
    ]);
  }
  const tresc = `Objętość prostopadłościanu jest równa $${V}$, a dwie krawędzie wychodzące z jednego jego wierzchołka mają długości $${a}$ i $${b}$. Oblicz długość trzeciej krawędzi wychodzącej z tego wierzchołka.`;
  return jednoPole("c", "$c =$", c, `$c = ${c}$`, tresc, [`$${a} \\cdot ${b} \\cdot c = ${V}$, więc $c = \\frac{${V}}{${a * b}} = ${c}$.`]);
}

/** Ostrosłup: V = 1/3 · P_p · h, ostrosłup prawidłowy czworokątny z wysokością ściany bocznej. */
function ostroslup(r) {
  const typ = r.pick(["V", "V", "h", "sciana", "boczne"]);
  if (typ === "V" || typ === "h") {
    const prostokat = r.chance(0.35);
    const a = r.int(2, 12), b = prostokat ? r.intBez(2, 12, a) : a, h = r.int(2, 15);
    const Pp = a * b, V = q(Pp * h, 3);
    if (typ === "h" && !V.calkowita) return ostroslup(r);   // w treści podajemy całkowitą objętość
    const podstawa = prostokat ? `Podstawą ostrosłupa jest prostokąt o bokach długości $${a}$ i $${b}$` : `Podstawą ostrosłupa prawidłowego czworokątnego jest kwadrat o boku długości $${a}$`;
    if (typ === "V") {
      return jednoPole("V", "$V =$", V, `$V = ${V.tex()}$`, `${podstawa}, a wysokość tego ostrosłupa jest równa $${h}$. Oblicz objętość tego ostrosłupa.`, [
        `Pole podstawy: $P_p = ${prostokat ? `${a} \\cdot ${b}` : `${a}^2`} = ${Pp}$.`,
        `$V = \\frac{1}{3} \\cdot P_p \\cdot h = \\frac{1}{3} \\cdot ${Pp} \\cdot ${h} = ${V.tex()}$.`,
      ]);
    }
    return jednoPole("h", "$h =$", h, `$h = ${h}$`, `${podstawa}. Objętość tego ostrosłupa jest równa $${dz(V)}$. Oblicz wysokość tego ostrosłupa.`, [
      `Pole podstawy: $P_p = ${Pp}$.`,
      `$\\frac{1}{3} \\cdot ${Pp} \\cdot h = ${dz(V)}$, więc $h = \\frac{3 \\cdot ${dz(V)}}{${Pp}} = ${h}$.`,
    ]);
  }
  // połowa krawędzi podstawy, wysokość ostrosłupa i wysokość ściany bocznej tworzą trójkąt prostokątny
  const [x, h, hs] = losujTrojke(r, 26);
  const a = 2 * x;
  const podstawa = `Podstawą ostrosłupa prawidłowego czworokątnego jest kwadrat o boku długości $${a}$`;
  const krok = "Spodek wysokości ostrosłupa jest środkiem kwadratu, więc połowa krawędzi podstawy, wysokość ostrosłupa i wysokość ściany bocznej tworzą trójkąt prostokątny.";
  if (typ === "sciana") {
    const V = q(a * a * h, 3);
    return jednoPole("V", "$V =$", V, `$V = ${V.tex()}$`, `${podstawa}, a wysokość ściany bocznej ma długość $${hs}$. Oblicz objętość tego ostrosłupa.`, [
      krok,
      `$h = \\sqrt{${hs}^2 - ${x}^2} = \\sqrt{${h * h}} = ${h}$.`,
      `$V = \\frac{1}{3} \\cdot ${a}^2 \\cdot ${h} = ${V.tex()}$.`,
    ]);
  }
  const Pb = 2 * a * hs;
  return jednoPole("P", "$P_b =$", Pb, `$P_b = ${Pb}$`, `${podstawa}, a wysokość tego ostrosłupa jest równa $${h}$. Oblicz pole powierzchni bocznej tego ostrosłupa.`, [
    krok,
    `Wysokość ściany bocznej: $h_b = \\sqrt{${h}^2 + ${x}^2} = \\sqrt{${hs * hs}} = ${hs}$.`,
    `Cztery ściany boczne to trójkąty o podstawie $${a}$ i wysokości $${hs}$: $P_b = 4 \\cdot \\frac{1}{2} \\cdot ${a} \\cdot ${hs} = ${Pb}$.`,
  ]);
}

// --- 8. Bryły obrotowe

function brylyObrotowe(r) {
  const wariant = r.pick(["walec", "walec", "stozek", "stozek", "kula"]);
  if (wariant === "walec") return walec(r);
  if (wariant === "stozek") return stozek(r);
  return kula(r);
}

/** Wynik jako wielokrotność π: pole k. */
const zadaniePi = (lit, k, tresc, rozwiazanie) =>
  jednoPole("k", `$${lit} = k\\pi$, $k =$`, k, `$${lit} = ${kPi(k)}$`, tresc, rozwiazanie);

function walec(r) {
  const R = r.int(1, 8), h = r.int(1, 12);
  const typ = r.pick(["V", "Pb", "Pc", "zV", "kwadrat"]);
  const dane = `Promień podstawy walca jest równy $${R}$, a wysokość walca jest równa $${h}$.`;
  if (typ === "V") return zadaniePi("V", R * R * h, `${dane} Oblicz objętość tego walca.`, [`$V = \\pi r^2 h = \\pi \\cdot ${R}^2 \\cdot ${h} = ${kPi(R * R * h)}$.`]);
  if (typ === "Pb") return zadaniePi("P_b", 2 * R * h, `${dane} Oblicz pole powierzchni bocznej tego walca.`, [`$P_b = 2\\pi r h = 2\\pi \\cdot ${R} \\cdot ${h} = ${kPi(2 * R * h)}$.`]);
  if (typ === "Pc") {
    const k = 2 * R * R + 2 * R * h;
    return zadaniePi("P_c", k, `${dane} Oblicz pole powierzchni całkowitej tego walca.`, [
      `$P_c = 2\\pi r^2 + 2\\pi r h = 2\\pi \\cdot ${R}^2 + 2\\pi \\cdot ${R} \\cdot ${h} = ${kPi(2 * R * R)} + ${kPi(2 * R * h)} = ${kPi(k)}$.`,
    ]);
  }
  if (typ === "zV") {
    const tresc = `Objętość walca o promieniu podstawy $${R}$ jest równa $${kPi(R * R * h)}$. Oblicz wysokość tego walca.`;
    return jednoPole("h", "$h =$", h, `$h = ${h}$`, tresc, [`$\\pi \\cdot ${R}^2 \\cdot h = ${kPi(R * R * h)}$, więc $h = \\frac{${R * R * h}}{${R * R}} = ${h}$.`]);
  }
  const k = 2 * R ** 3;
  return zadaniePi("V", k, `Przekrój osiowy walca jest kwadratem o boku długości $${2 * R}$. Oblicz objętość tego walca.`, [
    `Bok przekroju osiowego to średnica podstawy i wysokość walca: $r = ${R}$, $h = ${2 * R}$.`,
    `$V = \\pi \\cdot ${R}^2 \\cdot ${2 * R} = ${kPi(k)}$.`,
  ]);
}

function stozek(r) {
  const [R, h, l] = losujTrojke(r, 26);
  const typ = r.pick(["V", "tworzaca", "Pb", "Pc", "kat"]);
  const pitagoras = (co) => co === "h"
    ? `Wysokość, promień podstawy i tworząca tworzą trójkąt prostokątny: $h = \\sqrt{${l}^2 - ${R}^2} = \\sqrt{${h * h}} = ${h}$.`
    : co === "r"
      ? `Wysokość, promień podstawy i tworząca tworzą trójkąt prostokątny: $r = \\sqrt{${l}^2 - ${h}^2} = \\sqrt{${R * R}} = ${R}$.`
      : `Wysokość, promień podstawy i tworząca tworzą trójkąt prostokątny: $l = \\sqrt{${R}^2 + ${h}^2} = \\sqrt{${l * l}} = ${l}$.`;
  if (typ === "V") {
    const k = q(R * R * h, 3);
    return zadaniePi("V", k, `Promień podstawy stożka jest równy $${R}$, a tworząca tego stożka ma długość $${l}$. Oblicz objętość tego stożka.`, [
      pitagoras("h"),
      `$V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\cdot ${R}^2 \\cdot ${h} = ${kPi(k)}$.`,
    ]);
  }
  if (typ === "tworzaca") {
    return jednoPole("l", "$l =$", l, `$l = ${l}$`, `Promień podstawy stożka jest równy $${R}$, a wysokość tego stożka jest równa $${h}$. Oblicz długość tworzącej tego stożka.`, [pitagoras("l")]);
  }
  if (typ === "Pb") {
    return zadaniePi("P_b", R * l, `Wysokość stożka jest równa $${h}$, a promień jego podstawy jest równy $${R}$. Oblicz pole powierzchni bocznej tego stożka.`, [
      pitagoras("l"),
      `$P_b = \\pi r l = \\pi \\cdot ${R} \\cdot ${l} = ${kPi(R * l)}$.`,
    ]);
  }
  if (typ === "Pc") {
    const k = R * R + R * l;
    return zadaniePi("P_c", k, `Tworząca stożka ma długość $${l}$, a wysokość tego stożka jest równa $${h}$. Oblicz pole powierzchni całkowitej tego stożka.`, [
      pitagoras("r"),
      `$P_c = \\pi r^2 + \\pi r l = \\pi \\cdot ${R}^2 + \\pi \\cdot ${R} \\cdot ${l} = ${kPi(k)}$.`,
    ]);
  }
  const H = r.int(1, 9), k = q(H ** 3, 3);
  return zadaniePi("V", k, `Kąt rozwarcia stożka ma miarę $90^\\circ$, a wysokość tego stożka jest równa $${H}$. Oblicz objętość tego stożka.`, [
    `Wysokość dzieli kąt rozwarcia na dwa kąty po $45^\\circ$, więc trójkąt utworzony przez wysokość, promień i tworzącą jest równoramienny: $r = h = ${H}$.`,
    `$V = \\frac{1}{3}\\pi \\cdot ${H}^2 \\cdot ${H} = ${kPi(k)}$.`,
  ]);
}

function kula(r) {
  const R = r.int(1, 9);
  const typ = r.pick(["V", "P", "srednica", "zP", "zV"]);
  const V = q(4 * R ** 3, 3), P = 4 * R * R;
  if (typ === "V") return zadaniePi("V", V, `Promień kuli jest równy $${R}$. Oblicz objętość tej kuli.`, [`$V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi \\cdot ${R}^3 = ${kPi(V)}$.`]);
  if (typ === "P") return zadaniePi("P", P, `Promień kuli jest równy $${R}$. Oblicz pole powierzchni tej kuli.`, [`$P = 4\\pi r^2 = 4\\pi \\cdot ${R}^2 = ${kPi(P)}$.`]);
  if (typ === "srednica") {
    return zadaniePi("P", P, `Średnica kuli ma długość $${2 * R}$. Oblicz pole powierzchni tej kuli.`, [`Promień jest połową średnicy: $r = ${R}$.`, `$P = 4\\pi \\cdot ${R}^2 = ${kPi(P)}$.`]);
  }
  if (typ === "zP") {
    return jednoPole("r", "$r =$", R, `$r = ${R}$`, `Pole powierzchni kuli jest równe $${kPi(P)}$. Oblicz promień tej kuli.`, [`$4\\pi r^2 = ${kPi(P)}$, więc $r^2 = ${R * R}$ i $r = ${R}$.`]);
  }
  return jednoPole("r", "$r =$", R, `$r = ${R}$`, `Objętość kuli jest równa $${kPi(V)}$. Oblicz promień tej kuli.`, [
    `$\\frac{4}{3}\\pi r^3 = ${kPi(V)}$, więc $r^3 = ${V.tex()} \\cdot \\frac{3}{4} = ${R ** 3}$.`,
    `$r = \\sqrt[3]{${R ** 3}} = ${R}$.`,
  ]);
}

// --- Lista generatorów

export const GENERATORY = [
  { id: "trygonometria", nazwa: "Trygonometria", opis: "Funkcje trygonometryczne kąta ostrego, jedynka trygonometryczna, wartości dla kątów 30°, 45° i 60°.", generuj: trygonometria },
  { id: "trojkat-prostokatny", nazwa: "Trójkąt prostokątny", opis: "Twierdzenie Pitagorasa, pole i obwód, wysokość opuszczona na przeciwprostokątną, boki z funkcji trygonometrycznych.", generuj: trojkatProstokatny },
  { id: "pola-figur", nazwa: "Pola figur", opis: "Pola trójkąta, rombu, trapezu i równoległoboku, także zadania odwrotne.", generuj: polaFigur },
  { id: "katy", nazwa: "Kąty i okręgi", opis: "Kąty w trójkącie, kąt wpisany i środkowy, kąty przy prostych równoległych, kąty wielokąta.", generuj: katy },
  { id: "odcinek", nazwa: "Odcinek w układzie współrzędnych", opis: "Długość i środek odcinka, brakujący koniec odcinka, punkt symetryczny.", generuj: odcinek },
  { id: "okrag", nazwa: "Równanie okręgu", opis: "Środek i promień okręgu z równania, kwadrat promienia okręgu przez dany punkt lub stycznego do osi.", generuj: okrag },
  { id: "graniastoslupy", nazwa: "Graniastosłupy i ostrosłupy", opis: "Sześcian, prostopadłościan (objętość, pole, przekątna) i objętość ostrosłupa.", generuj: graniastoslupy },
  { id: "bryly-obrotowe", nazwa: "Bryły obrotowe", opis: "Objętość i pole powierzchni walca, stożka i kuli jako wielokrotność liczby π.", generuj: brylyObrotowe },
];
