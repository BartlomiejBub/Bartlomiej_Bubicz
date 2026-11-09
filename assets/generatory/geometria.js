// Generatory zadań z działu „Geometria” (matura podstawowa, formuła 2023).
// Kontrakt zadania i narzędzia: zob. wspolne.js. Każde zadanie budujemy od końca – z ładnej odpowiedzi.
// Własności czworokątów, wektory oraz proste i płaszczyzny w przestrzeni: sekcje „Własności czworokątów”, „Wektory…”, „Proste i płaszczyzny…”.
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

// --- Własności czworokątów

/** Zdania o czworokątach: { t: zdanie, w: krótkie uzasadnienie }. */
const ZDANIA_PRAWDZIWE = [
  { t: "Każdy kwadrat jest rombem.", w: "Kwadrat ma cztery równe boki, więc jest rombem (o kątach prostych)." },
  { t: "Każdy kwadrat jest prostokątem.", w: "Kwadrat ma cztery kąty proste, więc jest prostokątem (o równych bokach)." },
  { t: "Każdy romb jest równoległobokiem.", w: "W rombie przeciwległe boki są równoległe, więc jest on równoległobokiem." },
  { t: "Każdy prostokąt jest równoległobokiem.", w: "W prostokącie przeciwległe boki są równoległe, więc jest on równoległobokiem." },
  { t: "Każdy równoległobok jest trapezem.", w: "Równoległobok ma dwie pary boków równoległych, a trapez wymaga co najmniej jednej pary." },
  { t: "Każdy romb jest deltoidem.", w: "Romb ma dwie pary sąsiednich boków równych (nawet cztery równe boki), więc jest deltoidem." },
  { t: "Przekątne rombu są prostopadłe.", w: "Przekątne rombu są prostopadłe, połowią się i dzielą jego kąty na pół." },
  { t: "Przekątne prostokąta mają równe długości.", w: "Przekątne prostokąta są równe i dzielą się na połowy." },
  { t: "Przekątne równoległoboku dzielą się na połowy.", w: "Punkt przecięcia przekątnych równoległoboku jest środkiem każdej z nich." },
  { t: "Kąty przeciwległe równoległoboku mają równe miary.", w: "W równoległoboku kąty przeciwległe są równe, a kąty sąsiednie dają razem $180^{\\circ}$." },
  { t: "W trapezie równoramiennym przekątne mają równe długości.", w: "Trapez równoramienny ma równe ramiona i równe przekątne." },
  { t: "Na każdym prostokącie można opisać okrąg.", w: "Środek przecięcia przekątnych prostokąta jest jednakowo oddalony od wszystkich wierzchołków." },
  { t: "W każdy romb można wpisać okrąg.", w: "W rombie sumy długości boków przeciwległych są równe (każda to $2a$), więc można w niego wpisać okrąg." },
];

const ZDANIA_FALSZYWE = [
  { t: "Każdy romb jest kwadratem.", w: "Romb ma równe boki, ale jego kąty nie muszą być proste, np. kąty $60^{\\circ}$ i $120^{\\circ}$." },
  { t: "Każdy prostokąt jest rombem.", w: "Prostokąt o bokach $3$ i $5$ ma kąty proste, ale boki nierówne, więc nie jest rombem." },
  { t: "Każdy prostokąt jest kwadratem.", w: "Prostokąt o bokach $3$ i $5$ nie jest kwadratem." },
  { t: "Każdy trapez jest równoległobokiem.", w: "Trapez może mieć tylko jedną parę boków równoległych, a równoległobok ma dwie pary." },
  { t: "Każdy deltoid jest rombem.", w: "Deltoid ma tylko dwie pary sąsiednich boków równych, a romb ma wszystkie boki równe." },
  { t: "Przekątne każdego równoległoboku mają równe długości.", w: "Równe przekątne ma prostokąt, ale np. równoległobok o kątach $60^{\\circ}$ i $120^{\\circ}$ ma przekątne różnej długości." },
  { t: "Przekątne każdego równoległoboku są prostopadłe.", w: "Prostopadłe przekątne ma romb, ale prostokąt, który nie jest kwadratem, ma przekątne nieprostopadłe." },
  { t: "Przekątne każdego trapezu dzielą się na połowy.", w: "Na połowy dzielą się przekątne równoległoboku, a trapez może nie być równoległobokiem." },
  { t: "Przekątne każdego deltoidu dzielą się na połowy.", w: "W deltoidzie tylko jedna przekątna dzieli drugą na połowy." },
  { t: "Przekątne każdego prostokąta są prostopadłe.", w: "Przekątne prostokąta, który nie jest kwadratem, nie są prostopadłe." },
  { t: "Na każdym równoległoboku można opisać okrąg.", w: "Okrąg można opisać na równoległoboku tylko wtedy, gdy jest on prostokątem." },
  { t: "W każdy trapez można wpisać okrąg.", w: "Okrąg można wpisać w czworokąt tylko wtedy, gdy sumy długości boków przeciwległych są równe." },
  { t: "Każdy równoległobok ma cztery kąty proste.", w: "Cztery kąty proste ma tylko prostokąt." },
];

function czworokatyKaty(r) {
  const wariant = r.pick(["suma", "suma", "trapez", "trapez", "deltoid", "podzial", "podzial"]);
  if (wariant === "suma") return sumaKatowCzworokata(r);
  if (wariant === "trapez") return trapezRownoleglobokKaty(r);
  if (wariant === "deltoid") return deltoidKaty(r);
  return podzialCzworokatow(r);
}

/** Trzy kąty, stosunek kątów albo okrąg opisany: suma kątów czworokąta i kąty przeciwległe. */
function sumaKatowCzworokata(r) {
  const typ = r.pick(["trzy", "stosunek", "okrag"]);
  if (typ === "trzy") {
    for (;;) {
      const a = r.int(60, 130), b = r.int(60, 130), c = r.int(50, 130), d = 360 - a - b - c;
      if (d < 40 || d > 150) continue;
      const tresc = `W czworokącie wypukłym $ABCD$ kąt $DAB$ ma miarę $${a}^\\circ$, kąt $ABC$ ma miarę $${b}^\\circ$, a kąt $BCD$ ma miarę $${c}^\\circ$. Oblicz miarę kąta $CDA$.`;
      return zadanieKat("CDA", d, tresc, [`Suma miar kątów czworokąta jest równa $360^\\circ$, więc $${miara("CDA")} = 360^\\circ - ${a}^\\circ - ${b}^\\circ - ${c}^\\circ = ${d}^\\circ$.`]);
    }
  }
  if (typ === "stosunek") {
    for (;;) {
      const t = [r.int(1, 6), r.int(1, 6), r.int(1, 6), r.int(1, 6)];
      const S = t[0] + t[1] + t[2] + t[3], najw = r.chance();
      const wyb = najw ? Math.max(...t) : Math.min(...t);
      if (360 % S !== 0 || new Set(t).size < 2 || Math.max(...t) * 2 >= S) continue;
      const odp = (360 / S) * wyb;
      const tresc = `Miary kątów czworokąta wypukłego są w stosunku $${t.join(" : ")}$. Oblicz miarę ${najw ? "największego" : "najmniejszego"} kąta tego czworokąta.`;
      return jednoPole("k", "Miara kąta (w stopniach)", odp, `$${odp}^\\circ$`, tresc, [
        `Miary kątów to $${t.map((v) => (v === 1 ? "x" : `${v}x`)).join("$, $")}$, a ich suma jest równa $360^\\circ$: $${S}x = 360^\\circ$, więc $x = ${360 / S}^\\circ$.`,
        `${najw ? "Największy" : "Najmniejszy"} kąt ma miarę $${wyb} \\cdot ${360 / S}^\\circ = ${odp}^\\circ$.`,
      ]);
    }
  }
  const a = r.int(50, 130), b = r.int(50, 130);
  const przeciwlegly = r.chance();
  const [szukany, dany, wart] = przeciwlegly ? ["BCD", "DAB", a] : ["CDA", "ABC", b];
  const tresc = `Na czworokącie $ABCD$ opisano okrąg. Kąt $DAB$ ma miarę $${a}^\\circ$, a kąt $ABC$ ma miarę $${b}^\\circ$. Oblicz miarę kąta $${szukany}$.`;
  return zadanieKat(szukany, 180 - wart, tresc, [
    "Czworokąt jest wpisany w okrąg, więc jego kąty przeciwległe dają razem $180^\\circ$.",
    `Kątem przeciwległym do kąta $${dany}$ jest kąt $${szukany}$: $${miara(szukany)} = 180^\\circ - ${wart}^\\circ = ${180 - wart}^\\circ$.`,
  ]);
}

/** Kąty trapezu równoramiennego i prostokątnego oraz równoległoboku z danym stosunkiem kątów. */
function trapezRownoleglobokKaty(r) {
  const typ = r.pick(["rownoramienny", "rownoramienny", "prostokatny", "rownoleglobok", "rownoleglobok"]);
  if (typ === "rownoramienny") {
    const x = r.int(50, 85);
    if (r.chance()) {
      const tresc = `W trapezie równoramiennym $ABCD$ o podstawach $AB$ i $CD$ kąt ostry przy wierzchołku $A$ ma miarę $${x}^\\circ$. Oblicz miarę kąta $BCD$.`;
      return zadanieKat("BCD", 180 - x, tresc, [
        `Kąty przy podstawie trapezu równoramiennego są równe, więc $${miara("ABC")} = ${miara("DAB")} = ${x}^\\circ$.`,
        `Podstawy są równoległe, więc kąty przy ramieniu $BC$ dają razem $180^\\circ$: $${miara("BCD")} = 180^\\circ - ${x}^\\circ = ${180 - x}^\\circ$.`,
      ]);
    }
    const tresc = `W trapezie równoramiennym $ABCD$ o podstawach $AB$ i $CD$ kąt rozwarty przy wierzchołku $D$ ma miarę $${180 - x}^\\circ$. Oblicz miarę kąta $ABC$.`;
    return zadanieKat("ABC", x, tresc, [
      `Podstawy są równoległe, więc kąty przy ramieniu $AD$ dają razem $180^\\circ$: $${miara("DAB")} = 180^\\circ - ${180 - x}^\\circ = ${x}^\\circ$.`,
      `Kąty przy podstawie $AB$ są równe, więc $${miara("ABC")} = ${miara("DAB")} = ${x}^\\circ$.`,
    ]);
  }
  if (typ === "prostokatny") {
    const x = r.intBez(50, 130, 90);
    const tresc = `W trapezie prostokątnym $ABCD$ o podstawach $AB$ i $CD$ kąty przy wierzchołkach $A$ i $D$ są proste. Kąt $ABC$ ma miarę $${x}^\\circ$. Oblicz miarę kąta $BCD$.`;
    return zadanieKat("BCD", 180 - x, tresc, [
      `Podstawy są równoległe, więc kąty przy ramieniu $BC$ dają razem $180^\\circ$.`,
      `$${miara("BCD")} = 180^\\circ - ${x}^\\circ = ${180 - x}^\\circ$.`,
    ]);
  }
  const k = r.pick([2, 3, 4, 5, 8]), al = 180 / (k + 1);
  const pytamMaly = r.chance();
  const [szukany, wart, powod] = pytamMaly
    ? ["BCD", al, `Kąty przeciwległe równoległoboku są równe: $${miara("BCD")} = ${miara("DAB")} = ${al}^\\circ$.`]
    : ["ADC", k * al, `Kąty przeciwległe równoległoboku są równe: $${miara("ADC")} = ${miara("ABC")} = ${k} \\cdot ${al}^\\circ = ${k * al}^\\circ$.`];
  const tresc = `W równoległoboku $ABCD$ miara kąta $ABC$ jest $${k}$ razy większa od miary kąta $DAB$. Oblicz miarę kąta $${szukany}$.`;
  return zadanieKat(szukany, wart, tresc, [
    `Kąty sąsiednie równoległoboku dają razem $180^\\circ$. Niech $${miara("DAB")} = \\alpha$, wtedy $${miara("ABC")} = ${k}\\alpha$.`,
    `$\\alpha + ${k}\\alpha = 180^\\circ$, czyli $${k + 1}\\alpha = 180^\\circ$, więc $\\alpha = ${al}^\\circ$.`,
    powod,
  ]);
}

/** Deltoid: kąty przy osi symetrii dane, szukamy kąta przy wierzchołku poza osią. */
function deltoidKaty(r) {
  for (;;) {
    const a = r.int(40, 140), c = r.int(40, 140);
    if ((a + c) % 2 !== 0) continue;
    const b = (360 - a - c) / 2;
    const tresc = `W deltoidzie $ABCD$ spełnione są równości $|AB| = |AD|$ oraz $|CB| = |CD|$. Kąt $DAB$ ma miarę $${a}^\\circ$, a kąt $BCD$ ma miarę $${c}^\\circ$. Oblicz miarę kąta $ABC$.`;
    return zadanieKat("ABC", b, tresc, [
      `Przekątna $AC$ jest osią symetrii deltoidu, więc $${miara("ABC")} = ${miara("CDA")}$.`,
      `Suma miar kątów czworokąta jest równa $360^\\circ$: $${a}^\\circ + ${c}^\\circ + 2 \\cdot ${miara("ABC")} = 360^\\circ$.`,
      `$${miara("ABC")} = \\frac{360^\\circ - ${a + c}^\\circ}{2} = ${b}^\\circ$.`,
    ]);
  }
}

/** Które zdanie o czworokątach jest fałszywe (albo prawdziwe). */
function podzialCzworokatow(r) {
  const szukamFalszywego = r.chance(0.6);
  const [jedna, trzy] = szukamFalszywego ? [ZDANIA_FALSZYWE, ZDANIA_PRAWDZIWE] : [ZDANIA_PRAWDZIWE, ZDANIA_FALSZYWE];
  const wybrane = r.pick(jedna);
  const teksty = [wybrane, ...r.shuffle(trzy).slice(0, 3)];
  const kolej = r.shuffle([0, 1, 2, 3]);
  return {
    tresc: szukamFalszywego ? "Wskaż zdanie fałszywe." : "Wskaż zdanie prawdziwe.",
    pola: [{ id: "z", typ: "wybor", etykieta: "Zdanie", opcje: kolej.map((i) => teksty[i].t) }],
    odpowiedz: { z: kolej.indexOf(0) },
    wynik: wybrane.t,
    rozwiazanie: [
      `${szukamFalszywego ? "Fałszywe" : "Prawdziwe"} jest zdanie: ${wybrane.t}`,
      wybrane.w,
      `Pozostałe trzy zdania są ${szukamFalszywego ? "prawdziwe" : "fałszywe"}.`,
    ],
  };
}

function czworokatyBoki(r) {
  const wariant = r.pick(["przekatne", "przekatne", "trapez", "trapez", "rownoleglobok", "opisany"]);
  if (wariant === "przekatne") return r.chance(0.6) ? rombPrzekatne(r) : prostokatPrzekatna(r);
  if (wariant === "trapez") return trapezBoki(r);
  if (wariant === "rownoleglobok") return rownoleglobokPrzekatne(r);
  return czworokatOpisany(r);
}

/** Romb: bok, obwód, druga przekątna i pole z połówek przekątnych (trójka pitagorejska). */
function rombPrzekatne(r) {
  const [p, s, c] = losujTrojke(r, 26);
  const pyt = r.pick(["bok", "bok", "obwod", "przekatna", "pole"]);
  const polowy = "Przekątne rombu są prostopadłe i dzielą się na połowy, więc bok jest przeciwprostokątną trójkąta prostokątnego, którego przyprostokątne są połowami przekątnych.";
  if (pyt === "bok" || pyt === "obwod") {
    const krok = `$a = \\sqrt{${p}^2 + ${s}^2} = \\sqrt{${c * c}} = ${c}$.`;
    if (pyt === "bok") {
      return jednoPole("a", "Długość boku", c, `$a = ${c}$`, `Przekątne rombu mają długości $${2 * p}$ i $${2 * s}$. Oblicz długość boku tego rombu.`, [polowy, krok]);
    }
    return jednoPole("o", "Obwód", 4 * c, `$${4 * c}$`, `Przekątne rombu mają długości $${2 * p}$ i $${2 * s}$. Oblicz obwód tego rombu.`, [polowy, krok, `Obwód: $4 \\cdot ${c} = ${4 * c}$.`]);
  }
  const [dana, szuk] = r.chance() ? [p, s] : [s, p];
  const dane = `Bok rombu ma długość $${c}$, a jedna z jego przekątnych ma długość $${2 * dana}$.`;
  const kroki = [
    `Połowa danej przekątnej to $${dana}$. Połowa drugiej przekątnej z twierdzenia Pitagorasa: $\\sqrt{${c}^2 - ${dana}^2} = \\sqrt{${szuk * szuk}} = ${szuk}$.`,
    `Druga przekątna ma długość $2 \\cdot ${szuk} = ${2 * szuk}$.`,
  ];
  if (pyt === "przekatna") return jednoPole("d", "Druga przekątna", 2 * szuk, `$${2 * szuk}$`, `${dane} Oblicz długość drugiej przekątnej tego rombu.`, kroki);
  kroki.push(`Pole rombu: $P = \\frac{1}{2} \\cdot ${2 * dana} \\cdot ${2 * szuk} = ${2 * dana * szuk}$.`);
  return jednoPole("P", "$P =$", 2 * dana * szuk, `$P = ${2 * dana * szuk}$`, `${dane} Oblicz pole tego rombu.`, kroki);
}

/** Prostokąt: przekątna, bok albo promień okręgu opisanego. */
function prostokatPrzekatna(r) {
  const typ = r.pick(["przekatna", "bok", "okrag"]);
  const [a0, b0, c0] = r.pick(TROJKI);
  const k = typ === "okrag" ? 2 : r.int(1, Math.floor(50 / c0));
  const [a, b, c] = r.chance() ? [a0 * k, b0 * k, c0 * k] : [b0 * k, a0 * k, c0 * k];
  if (typ === "przekatna") {
    return jednoPole("d", "Długość przekątnej", c, `$d = ${c}$`, `Boki prostokąta mają długości $${a}$ i $${b}$. Oblicz długość przekątnej tego prostokąta.`, [
      `$d = \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${c * c}} = ${c}$.`,
    ]);
  }
  if (typ === "bok") {
    return jednoPole("b", "Długość drugiego boku", b, `$${b}$`, `Przekątna prostokąta ma długość $${c}$, a jeden z jego boków ma długość $${a}$. Oblicz długość drugiego boku tego prostokąta.`, [
      "Przekątna i dwa boki prostokąta tworzą trójkąt prostokątny, w którym przekątna jest przeciwprostokątną.",
      `$b = \\sqrt{${c}^2 - ${a}^2} = \\sqrt{${b * b}} = ${b}$.`,
    ]);
  }
  return jednoPole("r", "Promień okręgu", c / 2, `$${c / 2}$`, `Boki prostokąta mają długości $${a}$ i $${b}$. Oblicz promień okręgu opisanego na tym prostokącie.`, [
    `Środek okręgu opisanego na prostokącie to punkt przecięcia przekątnych, więc promień jest równy połowie przekątnej. Przekątna: $d = \\sqrt{${a}^2 + ${b}^2} = ${c}$.`,
    `$r = ${c} : 2 = ${c / 2}$.`,
  ]);
}

/** Trapez: odcinek łączący środki ramion, druga podstawa, wysokość i pole trapezu równoramiennego. */
function trapezBoki(r) {
  const typ = r.pick(["srodki", "drugaPodstawa", "wysokosc", "pole"]);
  if (typ === "srodki") {
    for (;;) {
      const a = r.int(4, 20), b = r.int(4, 20);
      if (a === b || (a + b) % 2 !== 0) continue;
      return jednoPole("e", "Długość odcinka", (a + b) / 2, `$${(a + b) / 2}$`,
        `Podstawy trapezu mają długości $${a}$ i $${b}$. Oblicz długość odcinka łączącego środki ramion tego trapezu.`, [
          "Odcinek łączący środki ramion trapezu ma długość równą średniej długości podstaw.",
          `Długość tego odcinka: $\\frac{${a} + ${b}}{2} = ${(a + b) / 2}$.`,
        ]);
    }
  }
  if (typ === "drugaPodstawa") {
    for (;;) {
      const e = r.int(4, 14), a = r.int(2, 2 * e - 2);
      if (a === e) continue;
      const b = 2 * e - a;
      return jednoPole("b", "Druga podstawa", b, `$${b}$`,
        `Odcinek łączący środki ramion trapezu ma długość $${e}$, a jedna z podstaw tego trapezu ma długość $${a}$. Oblicz długość drugiej podstawy.`, [
          `Odcinek łączący środki ramion ma długość średniej podstaw: $\\frac{${a} + b}{2} = ${e}$.`,
          `$${a} + b = ${2 * e}$, więc $b = ${b}$.`,
        ]);
    }
  }
  const [p, h, c] = losujTrojke(r, 25);
  const krotsza = r.int(3, 10), dluzsza = krotsza + 2 * p;
  const dane = `W trapezie równoramiennym podstawy mają długości $${dluzsza}$ i $${krotsza}$, a ramię ma długość $${c}$.`;
  const kroki = [
    `Wysokości poprowadzone z końców krótszej podstawy odcinają od dłuższej podstawy dwa równe odcinki o długości $\\frac{${dluzsza} - ${krotsza}}{2} = ${p}$.`,
    `Z twierdzenia Pitagorasa wysokość $h = \\sqrt{${c}^2 - ${p}^2} = \\sqrt{${h * h}} = ${h}$.`,
  ];
  if (typ === "wysokosc") return jednoPole("h", "Wysokość", h, `$h = ${h}$`, `${dane} Oblicz wysokość tego trapezu.`, kroki);
  const pole = (krotsza + p) * h;
  kroki.push(`Pole: $P = \\frac{${dluzsza} + ${krotsza}}{2} \\cdot ${h} = ${krotsza + p} \\cdot ${h} = ${pole}$.`);
  return jednoPole("P", "$P =$", pole, `$P = ${pole}$`, `${dane} Oblicz pole tego trapezu.`, kroki);
}

/** Równoległobok: przekątne połowią się (obwód trójkąta ABS, równanie na długości AS i SC). */
function rownoleglobokPrzekatne(r) {
  if (r.chance(0.5)) {
    for (;;) {
      const ab = r.int(4, 15), ac = 2 * r.int(3, 10), bd = 2 * r.int(3, 10);
      const as = ac / 2, bs = bd / 2;
      if (ab >= as + bs || ab <= Math.abs(as - bs)) continue;
      return jednoPole("o", "Obwód", ab + as + bs, `$${ab + as + bs}$`,
        `Przekątne równoległoboku $ABCD$ przecinają się w punkcie $S$. Wiadomo, że $|AB| = ${ab}$, $|AC| = ${ac}$ i $|BD| = ${bd}$. Oblicz obwód trójkąta $ABS$.`, [
          `Przekątne równoległoboku dzielą się na połowy: $|AS| = ${ac} : 2 = ${as}$ oraz $|BS| = ${bd} : 2 = ${bs}$.`,
          `Obwód trójkąta $ABS$: $|AB| + |AS| + |BS| = ${ab} + ${as} + ${bs} = ${ab + as + bs}$.`,
        ]);
    }
  }
  for (;;) {
    const x0 = r.int(3, 12), v = r.int(6, 24), m = r.pick([2, 3]);
    const p1 = v - x0, p2 = v - m * x0;
    if (p1 === 0 || p2 === 0 || Math.abs(p1) > 15 || Math.abs(p2) > 25) continue;
    const AS = sumaTex([[1, "x"], [p1, ""]]), SC = sumaTex([[m, "x"], [p2, ""]]);
    return jednoPole("d", "$|AC| =$", 2 * v, `$|AC| = ${2 * v}$`,
      `Przekątne równoległoboku $ABCD$ przecinają się w punkcie $S$, przy czym $|AS| = ${AS}$ oraz $|SC| = ${SC}$. Oblicz długość przekątnej $AC$.`, [
        `Przekątne równoległoboku dzielą się na połowy, więc $|AS| = |SC|$, czyli $${AS} = ${SC}$.`,
        `Stąd $x = ${x0}$, a $|AS| = ${x0} ${plusMinus(p1)} = ${v}$.`,
        `$|AC| = 2 \\cdot |AS| = 2 \\cdot ${v} = ${2 * v}$.`,
      ]);
  }
}

/** Czworokąt opisany na okręgu: sumy boków przeciwległych są równe. */
function czworokatOpisany(r) {
  if (r.chance(0.5)) {
    for (;;) {
      const x0 = r.int(3, 10), k = r.int(1, 6), a = r.int(3, 12), b = 2 * x0 + k - a;
      if (b < 2 || b > 14) continue;
      return jednoPole("x", "$x =$", x0, `$x = ${x0}$`,
        `W czworokąt, którego kolejne boki mają długości $x$, $${a}$, $x + ${k}$ i $${b}$, można wpisać okrąg. Oblicz $x$.`, [
          "W czworokąt można wpisać okrąg, gdy sumy długości boków przeciwległych są równe. Boki przeciwległe to $x$ i $x + " + k + `$ oraz $${a}$ i $${b}$.`,
          `$x + (x + ${k}) = ${a} + ${b}$, czyli $2x + ${k} = ${a + b}$.`,
          `Stąd $x = ${x0}$.`,
        ]);
    }
  }
  for (;;) {
    const ab = r.int(4, 12), bc = r.int(3, 10), cd = r.int(4, 12), ad = ab + cd - bc;
    if (ad < 2) continue;
    return jednoPole("d", "$|AD| =$", ad, `$|AD| = ${ad}$`,
      `W czworokąt $ABCD$ można wpisać okrąg. Wiadomo, że $|AB| = ${ab}$, $|BC| = ${bc}$ i $|CD| = ${cd}$. Oblicz długość boku $AD$.`, [
        `W czworokącie opisanym na okręgu sumy długości boków przeciwległych są równe: $|AB| + |CD| = |BC| + |AD|$.`,
        `$${ab} + ${cd} = ${bc} + |AD|$, więc $|AD| = ${ab + cd} - ${bc} = ${ad}$.`,
      ]);
  }
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

// --- Wektory w układzie współrzędnych

/** Wektor: wektTex(3, -2) -> "[3, -2]". */
const wektTex = (p, s) => `[${tex(p)}, ${tex(s)}]`;

const POLA_WEKTORA = [{ id: "p", typ: "liczba", etykieta: "$p =$" }, { id: "q", typ: "liczba", etykieta: "$q =$" }];

/** Zadanie o współrzędnych wektora [p, q]: dwa pola. */
const zadanieWektor = (tresc, p, s, rozwiazanie) => ({
  tresc,
  pola: POLA_WEKTORA,
  odpowiedz: { p: Q.z(p), q: Q.z(s) },
  wynik: `$${wektTex(p, s)}$`,
  rozwiazanie,
});

function wektoryWspolrzedne(r) {
  return r.pick([wspolrzedneWektora, dlugoscWektora, dzialaniaNaWektorach, parametryWektora])(r);
}

/** Współrzędne wektora AB albo BA: koniec minus początek. */
function wspolrzedneWektora(r) {
  for (;;) {
    const x1 = r.int(-8, 8), y1 = r.int(-8, 8), x2 = r.int(-8, 8), y2 = r.int(-8, 8);
    if (x1 === x2 && y1 === y2) continue;
    const odA = r.chance(0.7);
    const [pn, kn] = odA ? ["A", "B"] : ["B", "A"];
    const [px, py, kx, ky] = odA ? [x1, y1, x2, y2] : [x2, y2, x1, y1];
    const w = `\\overrightarrow{${pn}${kn}}`;
    const tresc = r.pick([
      `Dane są punkty $A = ${punktTex(x1, y1)}$ i $B = ${punktTex(x2, y2)}$. Wyznacz współrzędne wektora $${w}$.`,
      `Oblicz współrzędne wektora $${w}$, gdy $A = ${punktTex(x1, y1)}$ oraz $B = ${punktTex(x2, y2)}$. Podaj je w postaci $[p, q]$.`,
    ]);
    return zadanieWektor(tresc, kx - px, ky - py, [
      `Od współrzędnych końca odejmujemy współrzędne początku: $${w} = [x_{${kn}} - x_{${pn}}, y_{${kn}} - y_{${pn}}]$.`,
      `$${w} = [${kx} - ${texNawias(px)}, ${ky} - ${texNawias(py)}] = ${wektTex(kx - px, ky - py)}$.`,
    ]);
  }
}

/** Długość wektora z jego współrzędnych albo z punktów A i B (trójka pitagorejska). */
function dlugoscWektora(r) {
  const [p, s, c] = losujTrojke(r, 26);
  const u = [p * r.znak(), s * r.znak()];
  const kwadraty = `\\sqrt{${texNawias(u[0])}^2 + ${texNawias(u[1])}^2} = \\sqrt{${c * c}} = ${c}`;
  if (r.chance(0.5)) {
    return jednoPole("d", "$|\\vec{u}| =$", c, `$|\\vec{u}| = ${c}$`, r.pick([
      `Dany jest wektor $\\vec{u} = ${wektTex(u[0], u[1])}$. Oblicz długość wektora $\\vec{u}$.`,
      `Oblicz długość wektora $\\vec{u}$ o współrzędnych $${wektTex(u[0], u[1])}$.`,
    ]), [`$|\\vec{u}| = \\sqrt{p^2 + q^2} = ${kwadraty}$.`]);
  }
  const x1 = r.int(-7, 7), y1 = r.int(-7, 7);
  return jednoPole("d", "$|\\overrightarrow{AB}| =$", c, `$|\\overrightarrow{AB}| = ${c}$`,
    `Dane są punkty $A = ${punktTex(x1, y1)}$ i $B = ${punktTex(x1 + u[0], y1 + u[1])}$. Oblicz długość wektora $\\overrightarrow{AB}$.`, [
      `$\\overrightarrow{AB} = [${x1 + u[0]} - ${texNawias(x1)}, ${y1 + u[1]} - ${texNawias(y1)}] = ${wektTex(u[0], u[1])}$.`,
      `$|\\overrightarrow{AB}| = ${kwadraty}$.`,
    ]);
}

/** Współrzędne wektora k·u + l·w albo długość sumy dwóch wektorów. */
function dzialaniaNaWektorach(r) {
  const a = r.intBez(-6, 6, 0), b = r.intBez(-6, 6, 0);
  if (r.chance(0.65)) {
    const c = r.intBez(-6, 6, 0), d = r.intBez(-6, 6, 0);
    const k = r.pick([1, 2, 3, -1, -2]), l = r.pick([1, -1, 2, -2, 3]);
    const wyr = sumaTex([[k, "\\vec{u}"], [l, "\\vec{w}"]]);
    const skl = (m, lit) => (m === 1 ? lit : m === -1 ? `-${lit}` : `${m}${lit}`);
    const rx = k * a + l * c, ry = k * b + l * d;
    return zadanieWektor(`Dane są wektory $\\vec{u} = ${wektTex(a, b)}$ i $\\vec{w} = ${wektTex(c, d)}$. Oblicz współrzędne wektora $${wyr}$.`, rx, ry, [
      `Mnożymy współrzędne przez liczby: $${skl(k, "\\vec{u}")} = ${wektTex(k * a, k * b)}$ oraz $${skl(l, "\\vec{w}")} = ${wektTex(l * c, l * d)}$.`,
      `Dodajemy współrzędne: $${wektTex(k * a, k * b)} + ${wektTex(l * c, l * d)} = ${wektTex(rx, ry)}$.`,
    ]);
  }
  const [p, s, wynik] = losujTrojke(r, 26);
  const rx = p * r.znak(), ry = s * r.znak();
  const c = rx - a, d = ry - b;
  return jednoPole("d", "$|\\vec{u} + \\vec{w}| =$", wynik, `$|\\vec{u} + \\vec{w}| = ${wynik}$`,
    `Dane są wektory $\\vec{u} = ${wektTex(a, b)}$ i $\\vec{w} = ${wektTex(c, d)}$. Oblicz długość wektora $\\vec{u} + \\vec{w}$.`, [
      `$\\vec{u} + \\vec{w} = ${wektTex(a, b)} + ${wektTex(c, d)} = ${wektTex(rx, ry)}$.`,
      `$|\\vec{u} + \\vec{w}| = \\sqrt{${texNawias(rx)}^2 + ${texNawias(ry)}^2} = \\sqrt{${wynik * wynik}} = ${wynik}$.`,
    ]);
}

/** Niewiadome we współrzędnych punktów albo wektorów (z równości wektorów). */
function parametryWektora(r) {
  if (r.chance(0.5)) {
    const p = r.intBez(-6, 6, 0), s = r.intBez(-6, 6, 0), xB = r.int(-6, 6), yA = r.int(-6, 6);
    const a = xB - p, b = yA + s;
    return {
      tresc: `Wektor $\\overrightarrow{AB}$ ma współrzędne $${wektTex(p, s)}$, gdzie $A = (a, ${yA})$ i $B = (${xB}, b)$. Oblicz $a$ i $b$.`,
      pola: [{ id: "a", typ: "liczba", etykieta: "$a =$" }, { id: "b", typ: "liczba", etykieta: "$b =$" }],
      odpowiedz: { a: Q.z(a), b: Q.z(b) },
      wynik: `$a = ${a}$, $b = ${b}$`,
      rozwiazanie: [
        `$\\overrightarrow{AB} = [${xB} - a, b - ${texNawias(yA)}]$, a z treści $\\overrightarrow{AB} = ${wektTex(p, s)}$.`,
        `Porównujemy współrzędne: $${xB} - a = ${p}$, więc $a = ${a}$.`,
        `$b - ${texNawias(yA)} = ${s}$, więc $b = ${b}$.`,
      ],
    };
  }
  const al = r.intBez(-5, 5, 0), be = r.int(-6, 6), ga = r.int(-6, 6), de = r.intBez(-5, 5, 0);
  const m = ga - al, n = be - de;
  const u1 = sumaTex([[1, "m"], [al, ""]]), w2 = sumaTex([[1, "n"], [de, ""]]);
  return {
    tresc: `Wektory $\\vec{u} = [${u1}, ${be}]$ i $\\vec{w} = [${ga}, ${w2}]$ są równe. Oblicz $m$ i $n$.`,
    pola: [{ id: "m", typ: "liczba", etykieta: "$m =$" }, { id: "n", typ: "liczba", etykieta: "$n =$" }],
    odpowiedz: { m: Q.z(m), n: Q.z(n) },
    wynik: `$m = ${m}$, $n = ${n}$`,
    rozwiazanie: [
      "Wektory są równe, gdy mają równe odpowiednie współrzędne.",
      `$${u1} = ${ga}$, więc $m = ${m}$.`,
      `$${be} = ${w2}$, więc $n = ${n}$.`,
    ],
  };
}

function wektoryPrzesuniecie(r) {
  return r.pick([obrazPunktu, punktWyjsciowy, rownoleglobokWektory, dlugoscPrzesuniecia])(r);
}

/** Obraz punktu albo wierzchołka trójkąta w przesunięciu o wektor. */
function obrazPunktu(r) {
  const x = r.int(-8, 8), y = r.int(-8, 8), p = r.intBez(-6, 6, 0), s = r.intBez(-6, 6, 0);
  let tresc, nazwa;
  if (r.chance(0.6)) {
    nazwa = "A'";
    tresc = `Punkt $A = ${punktTex(x, y)}$ przesunięto o wektor $\\vec{u} = ${wektTex(p, s)}$ i otrzymano punkt $A'$. Podaj współrzędne punktu $A'$.`;
  } else {
    nazwa = "C'";
    const x1 = r.int(-8, 8), y1 = r.int(-8, 8), x2 = r.int(-8, 8), y2 = r.int(-8, 8);
    if ((x2 - x1) * (y - y1) === (x - x1) * (y2 - y1)) return obrazPunktu(r);   // trzy punkty na jednej prostej
    tresc = `Trójkąt o wierzchołkach $A = ${punktTex(x1, y1)}$, $B = ${punktTex(x2, y2)}$ i $C = ${punktTex(x, y)}$ przesunięto o wektor $\\vec{u} = ${wektTex(p, s)}$. Podaj współrzędne wierzchołka $C'$, który jest obrazem wierzchołka $C$.`;
  }
  const pn = nazwa[0];
  return zadaniePunkt(tresc, nazwa, x + p, y + s, [
    `Do współrzędnych punktu dodajemy współrzędne wektora $\\vec{u} = [p, q]$: $${nazwa} = (x_{${pn}} + p, y_{${pn}} + q)$.`,
    `$${nazwa} = (${x} + ${texNawias(p)}, ${y} + ${texNawias(s)}) = ${punktTex(x + p, y + s)}$.`,
  ]);
}

/** Punkt wyjściowy: odejmujemy współrzędne wektora od współrzędnych obrazu. */
function punktWyjsciowy(r) {
  const x = r.int(-8, 8), y = r.int(-8, 8), p = r.intBez(-6, 6, 0), s = r.intBez(-6, 6, 0);
  return zadaniePunkt(
    `Punkt $B' = ${punktTex(x + p, y + s)}$ jest obrazem punktu $B$ w przesunięciu o wektor $\\vec{u} = ${wektTex(p, s)}$. Oblicz współrzędne punktu $B$.`,
    "B", x, y, [
      "Przesunięcie dodało do współrzędnych punktu współrzędne wektora $\\vec{u} = [p, q]$, więc je odejmujemy: $B = (x_{B'} - p, y_{B'} - q)$.",
      `$B = (${x + p} - ${texNawias(p)}, ${y + s} - ${texNawias(s)}) = ${punktTex(x, y)}$.`,
    ]);
}

/** Czwarty wierzchołek równoległoboku ABCD z równości wektorów AB = DC. */
function rownoleglobokWektory(r) {
  for (;;) {
    const xA = r.int(-7, 7), yA = r.int(-7, 7), xB = r.int(-7, 7), yB = r.int(-7, 7), xC = r.int(-7, 7), yC = r.int(-7, 7);
    if ((xB - xA) * (yC - yA) === (xC - xA) * (yB - yA)) continue;     // A, B, C leżą na jednej prostej
    const p = xB - xA, s = yB - yA, xD = xC - p, yD = yC - s;
    if (Math.abs(xD) > 14 || Math.abs(yD) > 14) continue;
    return zadaniePunkt(
      `Punkty $A = ${punktTex(xA, yA)}$, $B = ${punktTex(xB, yB)}$ i $C = ${punktTex(xC, yC)}$ są kolejnymi wierzchołkami równoległoboku $ABCD$. Oblicz współrzędne wierzchołka $D$.`,
      "D", xD, yD, [
        `W równoległoboku $ABCD$ mamy $\\overrightarrow{AB} = \\overrightarrow{DC}$. Obliczamy $\\overrightarrow{AB} = ${wektTex(p, s)}$.`,
        `$\\overrightarrow{DC} = [${xC} - x_D, ${yC} - y_D]$, więc $${xC} - x_D = ${p}$ oraz $${yC} - y_D = ${s}$.`,
        `Stąd $x_D = ${xC} - ${texNawias(p)} = ${xD}$, $y_D = ${yC} - ${texNawias(s)} = ${yD}$.`,
      ]);
  }
}

/** Długość odcinka AA' przy przesunięciu o wektor jest równa długości wektora. */
function dlugoscPrzesuniecia(r) {
  const [p, s, c] = losujTrojke(r, 26);
  const u = [p * r.znak(), s * r.znak()];
  const x = r.int(-7, 7), y = r.int(-7, 7);
  return jednoPole("d", "$|AA'| =$", c, `$|AA'| = ${c}$`,
    `Punkt $A = ${punktTex(x, y)}$ przesunięto o wektor $\\vec{u} = ${wektTex(u[0], u[1])}$ i otrzymano punkt $A'$. Oblicz długość odcinka $AA'$.`, [
      "Odcinek $AA'$ jest przedstawieniem wektora przesunięcia, więc jego długość jest równa długości wektora $\\vec{u}$.",
      `$|AA'| = |\\vec{u}| = \\sqrt{${texNawias(u[0])}^2 + ${texNawias(u[1])}^2} = \\sqrt{${c * c}} = ${c}$.`,
    ]);
}

// --- Proste i płaszczyzny w przestrzeni

const PROSTOPADLOSCIAN = "prostopadłościan $ABCDEFGH$ (podstawa dolna $ABCD$, górna $EFGH$, krawędzie boczne $AE$, $BF$, $CG$, $DH$)";
const WIERZCHOLKI_BRYLY = { A: [0, 0, 0], B: [1, 0, 0], C: [1, 1, 0], D: [0, 1, 0], E: [0, 0, 1], F: [1, 0, 1], G: [1, 1, 1], H: [0, 1, 1] };
const KRAWEDZIE = ["AB", "BC", "CD", "AD", "EF", "FG", "GH", "EH", "AE", "BF", "CG", "DH"];
const PRZEKATNE_SCIAN = ["AC", "BD", "EG", "FH", "AF", "BE", "BG", "CF", "CH", "DG", "AH", "DE"];
const PROSTE_BRYLY = [...KRAWEDZIE, ...PRZEKATNE_SCIAN];
const SCIANY = ["ABCD", "EFGH", "ABFE", "BCGF", "CDHG", "ADHE"];

const pkt3 = (nazwa) => WIERZCHOLKI_BRYLY[nazwa];
const roznica3 = (u, v) => u.map((x, i) => x - v[i]);
const iloczynWekt3 = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
const iloczynSkal3 = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
const zerowy3 = (u) => u.every((x) => x === 0);

/** Wzajemne położenie dwóch prostych przechodzących przez wierzchołki prostopadłościanu. */
function polozenieProstych(l1, l2) {
  const p1 = pkt3(l1[0]), d1 = roznica3(pkt3(l1[1]), p1);
  const p2 = pkt3(l2[0]), d2 = roznica3(pkt3(l2[1]), p2);
  const n = iloczynWekt3(d1, d2), w = roznica3(p2, p1);
  if (zerowy3(n)) return zerowy3(iloczynWekt3(d1, w)) ? "ta sama" : "rownolegle";
  return iloczynSkal3(n, w) === 0 ? "przecinajace" : "skosne";
}

/** Położenie prostej względem płaszczyzny ściany: leży, równoległa albo przebija; i czy jest prostopadła. */
function polozenieProstejIPlaszczyzny(prosta, sciana) {
  const p0 = pkt3(sciana[0]);
  const n = iloczynWekt3(roznica3(pkt3(sciana[1]), p0), roznica3(pkt3(sciana[3]), p0));
  const d = roznica3(pkt3(prosta[1]), pkt3(prosta[0]));
  const prostopadla = zerowy3(iloczynWekt3(d, n));
  if (iloczynSkal3(d, n) !== 0) return { polozenie: "przebija", prostopadla };
  const lezy = iloczynSkal3(roznica3(pkt3(prosta[0]), p0), n) === 0;
  return { polozenie: lezy ? "lezy" : "rownolegla", prostopadla: false };
}

function polozeniaPrzestrzenne(r) {
  return r.pick([dwieProste, prostaIPlaszczyzna, polozenieProstychOpis, polozenieProstejOpis])(r);
}

const NAZWY_POLOZEN = { rownolegle: "równoległe", przecinajace: "przecinające się", skosne: "skośne" };
const ZDANIA_POLOZEN = { rownolegle: "Proste są równoległe", przecinajace: "Proste przecinają się", skosne: "Proste są skośne" };

/** Uzasadnienie wzajemnego położenia dwóch prostych x i y. */
function opisPary(x, y, polozenie) {
  const wspolny = [...x].find((lit) => y.includes(lit));
  return {
    skosne: `Proste $${x}$ i $${y}$ nie leżą w jednej płaszczyźnie, nie przecinają się i nie są równoległe, więc są skośne.`,
    rownolegle: `Proste $${x}$ i $${y}$ leżą w jednej płaszczyźnie i nie mają punktów wspólnych, więc są równoległe.`,
    przecinajace: wspolny
      ? `Proste $${x}$ i $${y}$ mają wspólny punkt $${wspolny}$, więc się przecinają.`
      : `Proste $${x}$ i $${y}$ leżą w jednej płaszczyźnie i nie są równoległe, więc się przecinają.`,
  }[polozenie];
}

/** Jakie jest wzajemne położenie dwóch prostych (wybór z trzech możliwości). */
function polozenieProstychOpis(r) {
  const cel = r.pick(["skosne", "rownolegle", "przecinajace"]);
  for (;;) {
    const x = r.pick(PROSTE_BRYLY), y = r.pick(PROSTE_BRYLY);
    if (x === y || polozenieProstych(x, y) !== cel) continue;
    const klucze = r.shuffle(["skosne", "rownolegle", "przecinajace"]);
    return {
      tresc: `Dany jest ${PROSTOPADLOSCIAN}. Jakie jest wzajemne położenie prostych $${x}$ i $${y}$?`,
      pola: [{ id: "p", typ: "wybor", etykieta: "Położenie", opcje: klucze.map((k) => `${ZDANIA_POLOZEN[k]}.`) }],
      odpowiedz: { p: klucze.indexOf(cel) },
      wynik: ZDANIA_POLOZEN[cel].toLowerCase(),
      rozwiazanie: [opisPary(x, y, cel), "Proste skośne nie leżą w jednej płaszczyźnie; proste równoległe i przecinające się leżą."],
    };
  }
}

/** Klasa prostej względem płaszczyzny: leży, równoległa, prostopadła albo przecina (nie prostopadle). */
const klasaProstej = (o) => (o.prostopadla ? "prostopadla" : o.polozenie);

/** Uzasadnienie położenia prostej x względem płaszczyzny ściany. */
function uzasadnienieProstej(x, sciana, klasa) {
  const opisy = PROSTE_BRYLY.map((prosta) => ({ prosta, ...polozenieProstejIPlaszczyzny(prosta, sciana) }));
  const d = roznica3(pkt3(x[1]), pkt3(x[0]));
  const kierunek = (o) => roznica3(pkt3(o.prosta[1]), pkt3(o.prosta[0]));
  const stopa = [...x].find((lit) => sciana.includes(lit));
  if (klasa === "rownolegla") {
    const rownolegla = opisy.find((o) => o.polozenie === "lezy" && zerowy3(iloczynWekt3(d, kierunek(o))));
    return `Prosta $${x}$ nie ma punktów wspólnych z płaszczyzną $${sciana}$ i jest równoległa do prostej $${rownolegla.prosta}$, która leży w tej płaszczyźnie.`;
  }
  if (klasa === "prostopadla") {
    const dwie = KRAWEDZIE.filter((k) => k.includes(stopa) && [...k].every((lit) => sciana.includes(lit)));
    return `Prosta $${x}$ jest prostopadła do dwóch prostych $${dwie[0]}$ i $${dwie[1]}$, które leżą w płaszczyźnie $${sciana}$ i przecinają się w punkcie $${stopa}$. Zatem jest prostopadła do tej płaszczyzny.`;
  }
  if (klasa === "lezy") return `Punkty $${x[0]}$ i $${x[1]}$ leżą w płaszczyźnie $${sciana}$, więc cała prosta $${x}$ leży w tej płaszczyźnie.`;
  const ukosna = opisy.find((o) => o.polozenie === "lezy" && o.prosta.includes(stopa) && iloczynSkal3(d, kierunek(o)) !== 0);
  return `Prosta $${x}$ ma z płaszczyzną $${sciana}$ dokładnie jeden punkt wspólny, $${stopa}$, więc ją przecina. Nie jest prostopadła, bo nie jest prostopadła do prostej $${ukosna.prosta}$ leżącej w tej płaszczyźnie.`;
}

const OPISY_POLOZENIA = {
  lezy: "Prosta leży w płaszczyźnie.",
  rownolegla: "Prosta jest równoległa do płaszczyzny.",
  przebija: "Prosta przecina płaszczyznę, ale nie jest do niej prostopadła.",
  prostopadla: "Prosta jest prostopadła do płaszczyzny.",
};

/** Jakie jest położenie prostej względem płaszczyzny (wybór z czterech możliwości). */
function polozenieProstejOpis(r) {
  const cel = r.pick(["lezy", "rownolegla", "przebija", "prostopadla"]);
  const sciana = r.pick(SCIANY);
  const x = r.pick(PROSTE_BRYLY.filter((p) => klasaProstej(polozenieProstejIPlaszczyzny(p, sciana)) === cel));
  const klucze = r.shuffle(["lezy", "rownolegla", "przebija", "prostopadla"]);
  return {
    tresc: `Dany jest ${PROSTOPADLOSCIAN}. Jakie jest położenie prostej $${x}$ względem płaszczyzny $${sciana}$?`,
    pola: [{ id: "p", typ: "wybor", etykieta: "Położenie prostej", opcje: klucze.map((k) => OPISY_POLOZENIA[k]) }],
    odpowiedz: { p: klucze.indexOf(cel) },
    wynik: OPISY_POLOZENIA[cel].toLowerCase(),
    rozwiazanie: [uzasadnienieProstej(x, sciana, cel)],
  };
}

/** Która para prostych jest skośna (równoległa, przecinająca się). */
function dwieProste(r) {
  const cel = r.pick(["skosne", "skosne", "rownolegle", "przecinajace"]);
  const losujProsta = () => (r.chance(0.7) ? r.pick(KRAWEDZIE) : r.pick(PROSTE_BRYLY));
  const klucz = (p) => [...p].sort().join("-");
  for (;;) {
    const pary = [];
    const uzyte = new Set();
    for (let proba = 0; proba < 400 && pary.length < 4; proba++) {
      const p = [losujProsta(), losujProsta()];
      if (p[0] === p[1] || uzyte.has(klucz(p))) continue;
      const polozenie = polozenieProstych(p[0], p[1]);
      if (polozenie === "ta sama") continue;
      if ((pary.length === 0) !== (polozenie === cel)) continue;      // pierwsza para spełnia warunek, pozostałe nie
      pary.push({ p, polozenie });
      uzyte.add(klucz(p));
    }
    if (pary.length < 4) continue;
    const kolej = r.shuffle([0, 1, 2, 3]);
    const [dobra] = pary;
    const [x, y] = dobra.p;
    const opis = opisPary(x, y, cel);
    return {
      tresc: `Dany jest ${PROSTOPADLOSCIAN}. Która z podanych par jest parą prostych ${{ skosne: "skośnych", rownolegle: "równoległych", przecinajace: "przecinających się" }[cel]}?`,
      pola: [{ id: "p", typ: "wybor", etykieta: "Para prostych", opcje: kolej.map((i) => `$${pary[i].p[0]}$ i $${pary[i].p[1]}$`) }],
      odpowiedz: { p: kolej.indexOf(0) },
      wynik: `$${x}$ i $${y}$`,
      rozwiazanie: [
        opis,
        `Pozostałe pary: ${pary.slice(1).map(({ p, polozenie }) => `$${p[0]}$ i $${p[1]}$ (${NAZWY_POLOZEN[polozenie]})`).join(", ")}.`,
      ],
    };
  }
}

/** Która prosta jest równoległa do płaszczyzny (prostopadła do niej, leży w niej). */
function prostaIPlaszczyzna(r) {
  const cel = r.pick(["rownolegla", "rownolegla", "prostopadla", "lezy"]);
  const sciana = r.pick(SCIANY);
  const opisy = PROSTE_BRYLY.map((prosta) => ({ prosta, ...polozenieProstejIPlaszczyzny(prosta, sciana) }));
  const spelnia = (o) => (cel === "prostopadla" ? o.prostopadla : o.polozenie === cel);
  const dobra = r.pick(opisy.filter(spelnia));
  const zle = r.shuffle(opisy.filter((o) => !spelnia(o))).slice(0, 3);
  const kolej = r.shuffle([0, 1, 2, 3]);
  const wszystkie = [dobra, ...zle];
  const x = dobra.prosta;
  const krok = uzasadnienieProstej(x, sciana, cel);
  const opis = (o) => (o.polozenie === "lezy" ? "leży w płaszczyźnie" : o.polozenie === "rownolegla" ? "jest równoległa do płaszczyzny" : o.prostopadla ? "jest prostopadła do płaszczyzny" : "przebija płaszczyznę");
  const pytanie = { rownolegla: "jest równoległa do płaszczyzny", prostopadla: "jest prostopadła do płaszczyzny", lezy: "leży w płaszczyźnie" }[cel];
  return {
    tresc: `Dany jest ${PROSTOPADLOSCIAN}. Która z podanych prostych ${pytanie} $${sciana}$?`,
    pola: [{ id: "p", typ: "wybor", etykieta: "Prosta", opcje: kolej.map((i) => `$${wszystkie[i].prosta}$`) }],
    odpowiedz: { p: kolej.indexOf(0) },
    wynik: `$${x}$`,
    rozwiazanie: [krok, `Pozostałe proste: ${zle.map((o) => `$${o.prosta}$ (${opis(o)})`).join(", ")}.`],
  };
}

const PRZEKROJ_ABCD = "W prostopadłościanie $ABCDEFGH$ (podstawa dolna $ABCD$, górna $EFGH$, krawędzie boczne $AE$, $BF$, $CG$, $DH$)";

function katyPrzestrzenne(r) {
  const wariant = r.pick(["sinus", "tangens", "szczegolny", "szczegolny", "ostroslup", "ostroslup"]);
  if (wariant === "sinus") return sinusPrzekatnej(r);
  if (wariant === "tangens") return tangensPrzekatnej(r);
  if (wariant === "szczegolny") return krawedzZKata(r);
  return scianaBocznaIPodstawa(r);
}

/** Sinus kąta nachylenia przekątnej prostopadłościanu do podstawy (przekątna o całkowitej długości). */
function sinusPrzekatnej(r) {
  for (;;) {
    const [x, y, z, d] = r.pick(CZWORKI);
    const [ab, ad, ae] = r.shuffle([x, y, z]);
    const w = q(ae, d);
    if (w.d > 12) continue;
    return jednoPole("w", `$${SIN} =$`, w, `$${SIN} = ${w.tex()}$`,
      `${PRZEKROJ_ABCD} krawędzie wychodzące z wierzchołka $A$ mają długości $|AB| = ${ab}$, $|AD| = ${ad}$ i $|AE| = ${ae}$. Oblicz sinus kąta $\\alpha$ nachylenia przekątnej $AG$ do płaszczyzny podstawy $ABCD$.`, [
        `Przekątna prostopadłościanu: $|AG| = \\sqrt{${ab}^2 + ${ad}^2 + ${ae}^2} = \\sqrt{${d * d}} = ${d}$.`,
        "Rzutem przekątnej $AG$ na płaszczyznę $ABCD$ jest odcinek $AC$, a krawędź $CG$ jest prostopadła do podstawy. Kąt $\\alpha$ to kąt $GAC$ w trójkącie prostokątnym $ACG$.",
        `$${SIN} = \\frac{|CG|}{|AG|} = \\frac{${ae}}{${d}}${w.tex() === `\\frac{${ae}}{${d}}` ? "" : ` = ${w.tex()}`}$.`,
      ]);
  }
}

/** Tangens kąta nachylenia przekątnej prostopadłościanu do podstawy (przekątna podstawy z trójki pitagorejskiej). */
function tangensPrzekatnej(r) {
  for (;;) {
    const [a, b, c] = losujTrojke(r, 25);
    const h = r.int(2, 15);
    const w = q(h, c);
    if (w.d > 12) continue;
    return jednoPole("w", `$${TG} =$`, w, `$${TG} = ${w.tex()}$`,
      `${PRZEKROJ_ABCD} krawędzie wychodzące z wierzchołka $A$ mają długości $|AB| = ${a}$, $|AD| = ${b}$ i $|AE| = ${h}$. Oblicz tangens kąta $\\alpha$ nachylenia przekątnej $AG$ do płaszczyzny podstawy $ABCD$.`, [
        `Rzutem przekątnej $AG$ na płaszczyznę $ABCD$ jest przekątna podstawy $AC$: $|AC| = \\sqrt{${a}^2 + ${b}^2} = ${c}$.`,
        `W trójkącie prostokątnym $ACG$ kąt prosty jest przy wierzchołku $C$, a $|CG| = |AE| = ${h}$.`,
        `$${TG} = \\frac{|CG|}{|AC|} = \\frac{${h}}{${c}}${w.tex() === `\\frac{${h}}{${c}}` ? "" : ` = ${w.tex()}`}$.`,
      ]);
  }
}

/** Krawędź boczna prostopadłościanu z kąta nachylenia przekątnej (30°, 45°, 60°). */
function krawedzZKata(r) {
  const m = r.int(2, 12);
  const wariant = r.pick(["30", "45", "60AC", "60AG"]);
  const wstep = `${PRZEKROJ_ABCD}`;
  const trojkat = "Rzutem przekątnej $AG$ na płaszczyznę $ABCD$ jest odcinek $AC$, a $CG$ jest prostopadły do podstawy. W trójkącie prostokątnym $ACG$ kąt $GAC$ jest szukanym kątem.";
  if (wariant === "30") {
    return jednoPole("c", "$|CG| =$", m, `$|CG| = ${m}$`,
      `${wstep} przekątna $AG$ ma długość $${2 * m}$ i tworzy z płaszczyzną podstawy $ABCD$ kąt $30^\\circ$. Oblicz długość krawędzi $CG$.`, [
        trojkat,
        `$|CG| = |AG| \\cdot \\sin 30^\\circ = ${2 * m} \\cdot \\frac{1}{2} = ${m}$.`,
      ]);
  }
  if (wariant === "45") {
    return jednoPole("c", "$|CG| =$", m, `$|CG| = ${m}$`,
      `${wstep} przekątna podstawy $AC$ ma długość $${m}$, a przekątna $AG$ tworzy z płaszczyzną podstawy $ABCD$ kąt $45^\\circ$. Oblicz długość krawędzi $CG$.`, [
        trojkat,
        `$\\operatorname{tg} 45^\\circ = \\frac{|CG|}{|AC|}$, więc $|CG| = ${m} \\cdot 1 = ${m}$.`,
      ]);
  }
  if (wariant === "60AC") {
    return jednoPole("k", "$k =$", m, `$|CG| = ${m}\\sqrt{3}$`,
      `${wstep} przekątna podstawy $AC$ ma długość $${m}$, a przekątna $AG$ tworzy z płaszczyzną podstawy $ABCD$ kąt $60^\\circ$. Długość krawędzi $CG$ jest równa $k\\sqrt{3}$. Oblicz $k$.`, [
        trojkat,
        `$\\operatorname{tg} 60^\\circ = \\frac{|CG|}{|AC|}$, więc $|CG| = ${m} \\cdot \\sqrt{3} = ${m}\\sqrt{3}$, czyli $k = ${m}$.`,
      ]);
  }
  return jednoPole("k", "$k =$", m, `$|CG| = ${m}\\sqrt{3}$`,
    `${wstep} przekątna $AG$ ma długość $${2 * m}$ i tworzy z płaszczyzną podstawy $ABCD$ kąt $60^\\circ$. Długość krawędzi $CG$ jest równa $k\\sqrt{3}$. Oblicz $k$.`, [
      trojkat,
      `$|CG| = |AG| \\cdot \\sin 60^\\circ = ${2 * m} \\cdot \\frac{\\sqrt{3}}{2} = ${m}\\sqrt{3}$, czyli $k = ${m}$.`,
    ]);
}

/** Ostrosłup prawidłowy czworokątny: kąt nachylenia ściany bocznej do podstawy (tangens, wysokość). */
function scianaBocznaIPodstawa(r) {
  const rr = r.int(2, 12), a = 2 * rr;
  const wariant = r.pick(["tangens", "tangens", "45", "60"]);
  const wstep = `Podstawą ostrosłupa prawidłowego czworokątnego $ABCDS$ jest kwadrat $ABCD$ o boku $${a}$.`;
  const kat = `Niech $M$ będzie środkiem krawędzi $AB$, a $O$ środkiem podstawy. Kąt nachylenia ściany bocznej do płaszczyzny podstawy to kąt $SMO$, a $|OM| = \\frac{${a}}{2} = ${rr}$.`;
  if (wariant === "tangens") {
    for (;;) {
      const H = r.int(2, 16), w = q(H, rr);
      if (w.d > 12) continue;
      return jednoPole("w", "$\\operatorname{tg} \\beta =$", w, `$\\operatorname{tg} \\beta = ${w.tex()}$`,
        `${wstep} Wysokość tego ostrosłupa ma długość $${H}$. Oblicz tangens kąta $\\beta$ nachylenia ściany bocznej do płaszczyzny podstawy.`, [
          kat,
          `$\\operatorname{tg} \\beta = \\frac{|SO|}{|OM|} = \\frac{${H}}{${rr}}${w.tex() === `\\frac{${H}}{${rr}}` ? "" : ` = ${w.tex()}`}$.`,
        ]);
    }
  }
  if (wariant === "45") {
    return jednoPole("H", "Wysokość", rr, `$H = ${rr}$`,
      `${wstep} Ściana boczna jest nachylona do płaszczyzny podstawy pod kątem $45^\\circ$. Oblicz wysokość tego ostrosłupa.`, [
        kat,
        `$\\operatorname{tg} 45^\\circ = \\frac{|SO|}{|OM|} = 1$, więc $|SO| = |OM| = ${rr}$.`,
      ]);
  }
  return jednoPole("k", "$k =$", rr, `$H = ${rr}\\sqrt{3}$`,
    `${wstep} Ściana boczna jest nachylona do płaszczyzny podstawy pod kątem $60^\\circ$. Wysokość tego ostrosłupa jest równa $k\\sqrt{3}$. Oblicz $k$.`, [
      kat,
      `$\\operatorname{tg} 60^\\circ = \\frac{|SO|}{|OM|} = \\sqrt{3}$, więc $|SO| = ${rr}\\sqrt{3}$, czyli $k = ${rr}$.`,
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
  { id: "trygonometria", temat: "trygonometria", nazwa: "Trygonometria", opis: "Funkcje trygonometryczne kąta ostrego, jedynka trygonometryczna, wartości dla kątów 30°, 45° i 60°.", generuj: trygonometria },
  { id: "trojkat-prostokatny", temat: "trygonometria", nazwa: "Trójkąt prostokątny", opis: "Twierdzenie Pitagorasa, pole i obwód, wysokość opuszczona na przeciwprostokątną, boki z funkcji trygonometrycznych.", generuj: trojkatProstokatny },
  { id: "pola-figur", temat: "planimetria", nazwa: "Pola figur", opis: "Pola trójkąta, rombu, trapezu i równoległoboku, także zadania odwrotne.", generuj: polaFigur },
  { id: "katy", temat: "planimetria", nazwa: "Kąty i okręgi", opis: "Kąty w trójkącie, kąt wpisany i środkowy, kąty przy prostych równoległych, kąty wielokąta.", generuj: katy },
  { id: "czworokaty-katy", temat: "czworokaty-lo", nazwa: "Rodzaje i kąty czworokątów", opis: "Podział czworokątów, suma kątów, kąty trapezu, równoległoboku i deltoidu, czworokąt wpisany w okrąg.", generuj: czworokatyKaty },
  { id: "czworokaty-boki", temat: "czworokaty-lo", nazwa: "Boki i przekątne czworokątów", opis: "Romb, prostokąt, trapez, równoległobok i czworokąt opisany na okręgu: długości boków i przekątnych.", generuj: czworokatyBoki },
  { id: "odcinek", temat: "geometria-analityczna", nazwa: "Odcinek w układzie współrzędnych", opis: "Długość i środek odcinka, brakujący koniec odcinka, punkt symetryczny.", generuj: odcinek },
  { id: "okrag", temat: "geometria-analityczna", nazwa: "Równanie okręgu", opis: "Środek i promień okręgu z równania, kwadrat promienia okręgu przez dany punkt lub stycznego do osi.", generuj: okrag },
  { id: "wektory-wspolrzedne", temat: "wektory", nazwa: "Współrzędne wektorów", opis: "Współrzędne i długość wektora, działania na wektorach, niewiadome we współrzędnych.", generuj: wektoryWspolrzedne },
  { id: "wektory-przesuniecie", temat: "wektory", nazwa: "Przesunięcie o wektor", opis: "Obraz i punkt wyjściowy w przesunięciu, czwarty wierzchołek równoległoboku, długość przesunięcia.", generuj: wektoryPrzesuniecie },
  { id: "przestrzen-polozenie", temat: "proste-i-plaszczyzny", nazwa: "Położenie w przestrzeni", opis: "Wzajemne położenie prostych oraz prostej i płaszczyzny w prostopadłościanie.", generuj: polozeniaPrzestrzenne },
  { id: "przestrzen-katy", temat: "proste-i-plaszczyzny", nazwa: "Kąty w przestrzeni", opis: "Kąt przekątnej prostopadłościanu z podstawą i kąt ściany bocznej ostrosłupa z podstawą.", generuj: katyPrzestrzenne },
  { id: "graniastoslupy", temat: "stereometria", nazwa: "Graniastosłupy i ostrosłupy", opis: "Sześcian, prostopadłościan (objętość, pole, przekątna) i objętość ostrosłupa.", generuj: graniastoslupy },
  { id: "bryly-obrotowe", temat: "stereometria", nazwa: "Bryły obrotowe", opis: "Objętość i pole powierzchni walca, stożka i kuli jako wielokrotność liczby π.", generuj: brylyObrotowe },
];
