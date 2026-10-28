// Generatory zadań z działu „Funkcje i ciągi” (matura podstawowa, formuła 2023).
// Kontrakt zadania i narzędzia: zob. wspolne.js. Każde zadanie budujemy od końca – z ładnej odpowiedzi.
import { Q, q, texNawias, wielomianTex, plusMinus, nawiasMinus } from "./wspolne.js";

// --- Zapis LaTeX i drobne pomocnicze

/** Suma składników [współczynnik, litera]: [[3, ""], [-1, "m"]] -> "3 - m"; z dalej = true -> " + 3 - m" (do doklejenia). */
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

/** Punkt: punktTex(2, -3) -> "(2, -3)". */
const punktTex = (x, y) => `(${Q.z(x).tex()}, ${Q.z(y).tex()})`;

/** Wartość funkcji w punkcie: f(-2), f\left(\frac{1}{2}\right). */
function wartoscTex(nazwa, x) {
  const v = Q.z(x);
  return v.calkowita ? `${nazwa}(${v.tex()})` : `${nazwa}\\left(${v.tex()}\\right)`;
}

/** Potęga liczby: potegaTex(-2, 2) -> "(-2)^{2}", potegaTex(q(1, 3), 3) -> "\left(\frac{1}{3}\right)^{3}". */
function potegaTex(x, k) {
  const v = Q.z(x);
  const podstawa = v.calkowita ? texNawias(v) : `\\left(${v.tex()}\\right)`;
  return k === 1 ? podstawa : `${podstawa}^{${k}}`;
}

/** Potęga litery: potLit("q", 1) -> "q", potLit("q", 3) -> "q^{3}". */
const potLit = (lit, k) => (k === 1 ? lit : `${lit}^{${k}}`);

/** Współczynnik przed nawiasem: 1 -> "", -1 -> "-", 2 -> "2", -1/3 -> "-\frac{1}{3}". */
function wspTex(a) {
  const v = Q.z(a);
  return v.eq(1) ? "" : v.eq(-1) ? "-" : v.tex();
}

/** Postać kanoniczna: kanonicznaTex(q(-1, 3), 3, 6) -> "-\frac{1}{3}(x - 3)^2 + 6". */
function kanonicznaTex(a, p, wq) {
  const nawias = Q.z(p).zero ? "x^2" : `${nawiasMinus(p)}^2`;
  return `${wspTex(a)}${nawias}${Q.z(wq).zero ? "" : ` ${plusMinus(wq)}`}`;
}

/** Postać iloczynowa: iloczynowaTex(-2, -1, 5) -> "-2(x + 1)(x - 5)"; zero idzie na początek: "3x(x - 4)". */
function iloczynowaTex(a, x1, x2) {
  const [u, v] = Q.z(x2).zero ? [x2, x1] : [x1, x2];
  return `${wspTex(a)}${nawiasMinus(u)}${nawiasMinus(v)}`;
}

/** Podstawienie liczby do wielomianu: podstawTex([2, -8, 3], -1) -> "2 \cdot (-1)^{2} - 8 \cdot (-1) + 3". */
function podstawTex(wsp, x) {
  const st = wsp.length - 1;
  const czesci = [];
  wsp.forEach((w, i) => {
    const a = Q.z(w);
    if (a.zero) return;
    const pot = st - i;
    const abs = a.ujemna ? a.neg() : a;
    const px = pot === 0 ? "" : potegaTex(x, pot);
    const skl = pot === 0 ? abs.tex() : abs.eq(1) ? px : `${abs.tex()} \\cdot ${px}`;
    czesci.push(czesci.length === 0 ? `${a.ujemna ? "-" : ""}${skl}` : ` ${a.ujemna ? "-" : "+"} ${skl}`);
  });
  return czesci.length ? czesci.join("") : "0";
}

/** Nawias wokół wyrażenia z kilkoma składnikami albo z minusem na początku: "(m + 4)", "(-m)", ale "m". */
const wNawiasie = (tex) => (/^-|\s[+-]\s/.test(tex) ? `(${tex})` : tex);

/** p = -b/(2a) z podstawieniem: "p = \frac{-b}{2a} = \frac{8}{4} = 2". */
function pTex(a, b, p) {
  const B = Q.z(b), dwaA = Q.z(a).mul(2);
  const srodek = B.zero || dwaA.eq(1) || dwaA.eq(-1) ? "" : ` = \\frac{${B.neg().tex()}}{${dwaA.tex()}}`;
  return `p = \\frac{-b}{2a}${srodek} = ${Q.z(p).tex()}`;
}

const wielka = (s) => s[0].toUpperCase() + s.slice(1);

const PORZADKOWE = ["", "pierwszy", "drugi", "trzeci", "czwarty", "piąty", "szósty", "siódmy", "ósmy", "dziewiąty",
  "dziesiąty", "jedenasty", "dwunasty", "trzynasty", "czternasty", "piętnasty"];

/** „Suma ... początkowych wyrazów”: liczebnik w dopełniaczu. */
const ILU = { 3: "trzech", 4: "czterech", 5: "pięciu", 6: "sześciu", 7: "siedmiu", 8: "ośmiu", 9: "dziewięciu",
  10: "dziesięciu", 11: "jedenastu", 12: "dwunastu", 13: "trzynastu", 14: "czternastu", 15: "piętnastu",
  16: "szesnastu", 17: "siedemnastu", 18: "osiemnastu", 19: "dziewiętnastu", 20: "dwudziestu" };

const OKRESLONY = "określony dla każdej liczby naturalnej $n \\geq 1$";
const OKRESLONYM = "określonym dla każdej liczby naturalnej $n \\geq 1$";   // „W ciągu …, określonym dla …”

const jednoPole = (id, etykieta, odp, wynik, tresc, rozwiazanie) =>
  ({ tresc, pola: [{ id, typ: "liczba", etykieta }], odpowiedz: { [id]: Q.z(odp) }, wynik, rozwiazanie });

// --- 1. Funkcja liniowa

function funkcjaLiniowa(r) {
  const wariant = r.int(0, 2);
  if (wariant === 0) return wspolneMiejsceZerowe(r);
  return parametrLiniowej(r, wariant === 2);
}

/** f(x) = a1·x + b1 i g(x) = ax + b2 (albo a2·x + b) mają wspólne miejsce zerowe (CKE 2024, zad. 13). */
function wspolneMiejsceZerowe(r) {
  for (;;) {
    const a1 = r.intBez(-5, 5, 0), b1 = r.intBez(-10, 10, 0);
    const x0 = q(-b1, a1);
    const szukamA = r.chance(0.6);
    const lit = szukamA ? "a" : "b";
    let gTex, rownanie, odp;
    if (szukamA) {
      const b2 = r.intBez(-9, 9, 0, b1);
      odp = q(-b2).div(x0);
      gTex = `g(x) = ax ${plusMinus(b2)}`;
      rownanie = `a \\cdot ${texNawias(x0)} ${plusMinus(b2)} = 0`;
    } else {
      const a2 = r.intBez(-5, 5, 0, a1);
      odp = x0.mul(-a2);
      gTex = `g(x) = ${wielomianTex([a2, 0])} + b`;
      rownanie = `${a2} \\cdot ${texNawias(x0)} + b = 0`;
    }
    if (odp.d > 6 || Math.abs(odp.valueOf()) > 15) continue;
    const fTex = `f(x) = ${wielomianTex([a1, b1])}`;
    const tresc = r.pick([
      `Funkcje liniowe $f$ i $g$ są określone wzorami $${fTex}$ oraz $${gTex}$. Funkcje te mają wspólne miejsce zerowe. Oblicz $${lit}$.`,
      `Wykresy funkcji liniowych $${fTex}$ oraz $${gTex}$ przecinają oś $Ox$ w tym samym punkcie. Oblicz $${lit}$.`,
      `Miejsce zerowe funkcji liniowej $${fTex}$ jest równe miejscu zerowemu funkcji liniowej $${gTex}$. Oblicz współczynnik $${lit}$.`,
    ]);
    return jednoPole(lit, `$${lit} =$`, odp, `$${lit} = ${odp.tex()}$`, tresc, [
      `Miejsce zerowe funkcji $f$: $${wielomianTex([a1, b1])} = 0$, stąd $x = ${x0.tex()}$.`,
      `Ta liczba jest też miejscem zerowym funkcji $g$, więc $${wartoscTex("g", x0)} = 0$, czyli $${rownanie}$.`,
      `Stąd $${lit} = ${odp.tex()}$.`,
    ]);
  }
}

/** f(x) = (s·m + t)x + v·m + w: parametr z punktu wykresu albo z miejsca zerowego (CKE 2024, zad. 12; 2025, zad. 13). */
function parametrLiniowej(r, zerowe) {
  const L = r.pick(["m", "k"]);
  for (;;) {
    const s = r.pick([-3, -2, -1, -1, 1, 1, 2, 3]);
    const t = r.intBez(-6, 6, 0);
    const v = r.chance(0.5) ? 0 : r.pick([-2, -1, 1, 2]);
    const w = r.int(-6, 6);
    if (v === 0 && w === 0) continue;
    const x1 = r.intBez(-4, 4, 0);
    const K = s * x1 + v;                       // współczynnik przy parametrze w f(x1)
    if (K === 0) continue;
    const y1 = zerowe ? 0 : r.int(-12, 12);
    const m = q(y1 - t * x1 - w, K);
    if (m.zero || m.d > 4 || Math.abs(m.valueOf()) > 10) continue;
    if (m.mul(s).add(t).zero) continue;         // przy tym parametrze funkcja byłaby stała
    const nach = r.chance() ? sumaTex([[s, L], [t, ""]]) : sumaTex([[t, ""], [s, L]]);
    const reszta = sumaTex([[v, L], [w, ""]], true);
    const wzor = `f(x) = (${nach})x${reszta}`;
    const podst = `(${nach}) \\cdot ${texNawias(x1)}${reszta}`;
    let tresc;
    if (zerowe) {
      tresc = r.pick([
        `Funkcja liniowa $f$ jest określona wzorem $${wzor}$, gdzie $${L}$ jest liczbą rzeczywistą. Miejscem zerowym funkcji $f$ jest liczba $${texNawias(x1)}$. Oblicz $${L}$.`,
        `Wykres funkcji liniowej $${wzor}$ przecina oś $Ox$ w punkcie $${punktTex(x1, 0)}$. Oblicz $${L}$.`,
        `Liczba $${texNawias(x1)}$ jest miejscem zerowym funkcji liniowej $f$ określonej wzorem $${wzor}$. Oblicz $${L}$.`,
      ]);
    } else {
      const P = punktTex(x1, y1);
      tresc = r.pick([
        `Funkcja liniowa $f$ jest określona wzorem $${wzor}$, gdzie $${L}$ jest liczbą rzeczywistą. Wykres funkcji $f$ przechodzi przez punkt $P = ${P}$. Oblicz $${L}$.`,
        `Punkt $P = ${P}$ należy do wykresu funkcji liniowej $f$ określonej wzorem $${wzor}$. Oblicz $${L}$.`,
        `Funkcja liniowa $f$ jest określona wzorem $${wzor}$ i spełnia warunek $${wartoscTex("f", x1)} = ${y1}$. Oblicz $${L}$.`,
      ]);
    }
    return jednoPole(L, `$${L} =$`, m, `$${L} = ${m.tex()}$`, tresc, [
      `${zerowe ? "Liczba" : "Punkt"} $${zerowe ? texNawias(x1) : punktTex(x1, y1)}$ ${zerowe ? "jest miejscem zerowym" : "leży na wykresie"}, więc $${wartoscTex("f", x1)} = ${y1}$, czyli $${podst} = ${y1}$.`,
      `Po uporządkowaniu: $${sumaTex([[K, L], [t * x1 + w, ""]])} = ${y1}$.`,
      `Stąd $${L} = ${m.tex()}$.`,
    ]);
  }
}

// --- 2. Wzór funkcji liniowej (prosta przez dwa punkty, prosta równoległa lub prostopadła)

function prostaPrzezPunkty(r) {
  const rodzaj = r.pick(["punkty", "punkty", "rownolegla", "prostopadla"]);
  const naF = r.chance();                       // „funkcja f” albo „prosta y = ax + b”
  for (;;) {
    const x1 = r.int(-6, 6), y1 = r.int(-8, 8);
    let a, x2, y2, a0, c;
    if (rodzaj === "punkty") {
      const d = r.pick([1, 1, 1, 2, 3]), n = r.intBez(-6, 6, 0);
      a = q(n, d);
      if (a.d !== d) continue;
      const krok = r.int(1, 3) * r.znak();
      x2 = x1 + d * krok;
      y2 = y1 + n * krok;
      if (Math.abs(x2) > 9 || Math.abs(y2) > 12) continue;
    } else if (rodzaj === "rownolegla") {
      a = a0 = q(r.intBez(-5, 5, 0), r.pick([1, 1, 2, 3]));
      c = r.int(-9, 9);
    } else {
      a0 = q(r.pick([-4, -3, -2, -1, 1, 2, 3, 4]), r.pick([1, 1, 2, 3]));
      a = q(-1).div(a0);
      c = r.int(-9, 9);
    }
    const b = q(y1).sub(a.mul(x1));
    if (b.d > 4 || Math.abs(b.valueOf()) > 15) continue;
    if (rodzaj === "rownolegla" && b.eq(c)) continue;   // ta sama prosta
    const A = punktTex(x1, y1);
    const wzorF = naF ? "f(x)" : "y";
    const polecenie = naF ? "Wyznacz wzór funkcji $f$ w postaci $f(x) = ax + b$." : "Oblicz współczynniki $a$ i $b$.";
    let tresc, krok1;
    if (rodzaj === "punkty") {
      const B = punktTex(x2, y2);
      tresc = naF
        ? r.pick([
          `Wykres funkcji liniowej $f$ przechodzi przez punkty $A = ${A}$ i $B = ${B}$. ${polecenie}`,
          `Funkcja liniowa $f(x) = ax + b$ spełnia warunki $${wartoscTex("f", x1)} = ${y1}$ oraz $${wartoscTex("f", x2)} = ${y2}$. Oblicz współczynniki $a$ i $b$.`,
        ])
        : `Prosta o równaniu $y = ax + b$ przechodzi przez punkty $A = ${A}$ i $B = ${B}$. ${polecenie}`;
      krok1 = `Współczynnik kierunkowy: $a = \\frac{${y2} - ${texNawias(y1)}}{${x2} - ${texNawias(x1)}} = ${a.tex()}$.`;
    } else {
      const rown = rodzaj === "rownolegla";
      const l = `y = ${wielomianTex([a0, c])}`;
      tresc = naF
        ? `Wykres funkcji liniowej $f$ jest ${rown ? "równoległy" : "prostopadły"} do prostej o równaniu $${l}$ i przechodzi przez punkt $P = ${A}$. ${polecenie}`
        : `Prosta $k$ o równaniu $y = ax + b$ jest ${rown ? "równoległa" : "prostopadła"} do prostej $l$ o równaniu $${l}$ i przechodzi przez punkt $P = ${A}$. ${polecenie}`;
      krok1 = rown
        ? `Proste równoległe mają równe współczynniki kierunkowe, więc $a = ${a.tex()}$.`
        : `Proste są prostopadłe, gdy iloczyn ich współczynników kierunkowych jest równy $(-1)$: $a \\cdot ${texNawias(a0)} = -1$, więc $a = ${a.tex()}$.`;
    }
    return {
      tresc,
      pola: [{ id: "a", typ: "liczba", etykieta: "$a =$" }, { id: "b", typ: "liczba", etykieta: "$b =$" }],
      odpowiedz: { a, b },
      wynik: `$a = ${a.tex()}$, $b = ${b.tex()}$, czyli $${wzorF} = ${wielomianTex([a, b])}$`,
      rozwiazanie: [
        krok1,
        `Podstawiamy współrzędne punktu $${A}$: $${y1} = ${a.tex()} \\cdot ${texNawias(x1)} + b$, stąd $b = ${b.tex()}$.`,
        `Zatem $${wzorF} = ${wielomianTex([a, b])}$.`,
      ],
    };
  }
}

// --- 3. Postać kanoniczna

const WSP_A = [[1, 1], [-1, 1], [2, 1], [-2, 1], [3, 1], [-3, 1], [1, 2], [-1, 2], [1, 3], [-1, 3],
  [1, 4], [-1, 4], [2, 3], [-2, 3], [3, 2], [-3, 2]];

function postacKanoniczna(r) {
  const wariant = r.pick(["wierzcholek", "wierzcholek", "os", "zera", "ogolna"]);
  if (wariant === "ogolna") return kanonicznaZOgolnej(r);
  if (wariant === "zera") return kanonicznaZMiejscZerowych(r);
  return kanonicznaZWierzcholka(r, wariant === "os");
}

function zadanieKanoniczne(dane, a, p, wq, kroki) {
  const wzor = kanonicznaTex(a, p, wq);
  return {
    tresc: `${dane} Wyznacz wzór funkcji $f$ w postaci kanonicznej $f(x) = a(x - p)^2 + q$ – podaj liczby $a$, $p$ i $q$.`,
    pola: [
      { id: "a", typ: "liczba", etykieta: "$a =$" },
      { id: "p", typ: "liczba", etykieta: "$p =$" },
      { id: "q", typ: "liczba", etykieta: "$q =$" },
    ],
    odpowiedz: { a: Q.z(a), p: Q.z(p), q: Q.z(wq) },
    wynik: `$f(x) = ${wzor}$`,
    rozwiazanie: [...kroki, `Zatem $f(x) = ${wzor}$.`],
  };
}

/** Wierzchołek (albo oś symetrii i wartość największa/najmniejsza) oraz punkt wykresu (CKE 2025, zad. 12.1). */
function kanonicznaZWierzcholka(r, os) {
  for (;;) {
    const a = q(...r.pick(WSP_A));
    const p = r.int(-5, 5), wq = r.int(-8, 8);
    const naOsiOy = r.chance(0.4);
    const dx = naOsiOy ? -p : r.intBez(-4, 4, 0);
    if (dx === 0) continue;
    const dy = a.mul(dx * dx);
    if (!dy.calkowita) continue;
    const x0 = p + dx, y0 = dy.add(wq);
    if (Math.abs(y0.valueOf()) > 30) continue;
    const punkt = naOsiOy
      ? `Wykres funkcji $f$ przecina oś $Oy$ w punkcie $${punktTex(0, y0)}$.`
      : `Do wykresu funkcji $f$ należy punkt $A = ${punktTex(x0, y0)}$.`;
    let dane, krok1;
    if (!os) {
      dane = `Wierzchołkiem paraboli, która jest wykresem funkcji kwadratowej $f$, jest punkt $W = ${punktTex(p, wq)}$. ${punkt}`;
      krok1 = `Wierzchołek $W = ${punktTex(p, wq)}$, więc $p = ${p}$ i $q = ${wq}$.`;
    } else {
      const maks = a.ujemna;
      const naj = maks ? "największa" : "najmniejsza";
      const zOsi = r.chance(), zeZbioru = r.chance();
      const osTxt = zOsi
        ? `Prosta o równaniu $x = ${p}$ jest osią symetrii wykresu funkcji kwadratowej $f$.`
        : `Funkcja kwadratowa $f$ jest ${maks ? "rosnąca" : "malejąca"} w przedziale $(-\\infty, ${p}]$ i ${maks ? "malejąca" : "rosnąca"} w przedziale $[${p}, +\\infty)$.`;
      const wartTxt = zeZbioru
        ? `Zbiorem wartości funkcji $f$ jest przedział $${maks ? `(-\\infty, ${wq}]` : `[${wq}, +\\infty)`}$.`
        : `${wielka(naj)} wartość funkcji $f$ jest równa $${texNawias(wq)}$.`;
      dane = `${osTxt} ${wartTxt} ${punkt}`;
      krok1 = `${zOsi ? "Oś symetrii przechodzi przez wierzchołek paraboli" : "Funkcja zmienia monotoniczność w wierzchołku paraboli"}, więc $p = ${p}$. ${zeZbioru ? "Koniec zbioru wartości" : `Wartość ${naj}`} to druga współrzędna wierzchołka: $q = ${wq}$.`;
    }
    const pq = wq === 0 ? "" : ` ${plusMinus(wq)}`;
    return zadanieKanoniczne(dane, a, p, wq, [
      krok1,
      `Punkt $${punktTex(x0, y0)}$ należy do wykresu: $${y0.tex()} = a \\cdot ${potegaTex(dx, 2)}${pq}$, czyli $${sumaTex([[dx * dx, "a"]])} = ${y0.sub(wq).tex()}$, stąd $a = ${a.tex()}$.`,
    ]);
  }
}

/** Dwa miejsca zerowe i punkt przecięcia wykresu z osią Oy. */
function kanonicznaZMiejscZerowych(r) {
  for (;;) {
    const a = q(...r.pick(WSP_A));
    const x1 = r.intBez(-6, 6, 0), x2 = r.intBez(-6, 6, 0, x1);
    if ((x1 + x2) % 2 !== 0) continue;           // p całkowite
    const [m1, m2] = x1 < x2 ? [x1, x2] : [x2, x1];
    const c = a.mul(m1 * m2);
    const p = (m1 + m2) / 2;
    const wq = a.mul((p - m1) * (p - m2));
    if (!c.calkowita || Math.abs(c.valueOf()) > 40 || Math.abs(wq.valueOf()) > 40) continue;
    const dane = r.pick([
      `Funkcja kwadratowa $f$ ma dwa miejsca zerowe: $${texNawias(m1)}$ oraz $${texNawias(m2)}$. Wykres funkcji $f$ przecina oś $Oy$ w punkcie $${punktTex(0, c)}$.`,
      `Miejscami zerowymi funkcji kwadratowej $f$ są liczby $${texNawias(m1)}$ i $${texNawias(m2)}$, a punkt $${punktTex(0, c)}$ należy do wykresu tej funkcji.`,
    ]);
    const czynniki = [...(a.eq(1) ? [] : [texNawias(a)]), texNawias(p - m1), texNawias(p - m2)].join(" \\cdot ");
    return zadanieKanoniczne(dane, a, p, wq, [
      `Postać iloczynowa: $f(x) = a${nawiasMinus(m1)}${nawiasMinus(m2)}$. Z warunku $f(0) = ${c.tex()}$: $a \\cdot ${texNawias(-m1)} \\cdot ${texNawias(-m2)} = ${c.tex()}$, stąd $a = ${a.tex()}$.`,
      `Pierwsza współrzędna wierzchołka leży w połowie między miejscami zerowymi: $p = \\frac{${m1} + ${texNawias(m2)}}{2} = ${p}$.`,
      `$q = ${wartoscTex("f", p)} = ${czynniki} = ${wq.tex()}$.`,
    ]);
  }
}

/** Wzór ogólny -> postać kanoniczna. */
function kanonicznaZOgolnej(r) {
  const a = r.pick([1, -1, 2, -2, 3, -3]);
  const p = r.intBez(-4, 4, 0), wq = r.int(-9, 9);
  const b = -2 * a * p, c = a * p * p + wq;
  const dane = `Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ${wielomianTex([a, b, c])}$.`;
  return zadanieKanoniczne(dane, a, p, wq, [
    `Współczynnik $a = ${a}$, a pierwsza współrzędna wierzchołka: $${pTex(a, b, p)}$.`,
    `$q = ${wartoscTex("f", p)} = ${podstawTex([a, b, c], p)} = ${wq}$.`,
  ]);
}

// --- 4. Wierzchołek paraboli

/** Funkcja kwadratowa a(x - p)^2 + q = ax^2 + bx + c o całkowitych b, c, p, q (p ≠ 0). */
function losujKwadratowa(r) {
  for (;;) {
    const a = q(...r.pick([[1, 1], [-1, 1], [2, 1], [-2, 1], [3, 1], [-3, 1], [1, 2], [-1, 2]]));
    const p = r.intBez(-4, 4, 0), wq = r.int(-9, 9);
    const b = a.mul(-2 * p), c = a.mul(p * p).add(wq);
    if (b.calkowita && c.calkowita) return { a, b, c, p: q(p), wq: q(wq) };
  }
}

function wierzcholek(r) {
  const wariant = r.pick(["wsp", "wsp", "os", "ekstremum", "przedzial"]);
  if (wariant === "przedzial") return wartoscWPrzedziale(r);
  let a, p, wq, wzor, krokP, krokQ;
  if (r.chance(0.7)) {
    let b, c;
    ({ a, b, c, p, wq } = losujKwadratowa(r));
    wzor = wielomianTex([a, b, c]);
    krokP = `$${pTex(a, b, p)}$.`;
    krokQ = `$q = ${wartoscTex("f", p)} = ${podstawTex([a, b, c], p)} = ${wq.tex()}$.`;
  } else {
    // Postać iloczynowa: wierzchołek leży w połowie między miejscami zerowymi.
    let x1, x2;
    for (;;) {
      x1 = r.int(-6, 6);
      x2 = r.intBez(-6, 6, x1);
      if ((x1 + x2) % 2 === 0 && x1 + x2 !== 0 && Math.abs(x2 - x1) <= 8) break;
    }
    if (x1 > x2) [x1, x2] = [x2, x1];
    a = q(r.pick([1, -1, 2, -2, 3, -3]));
    const pn = (x1 + x2) / 2;
    p = q(pn);
    wq = a.mul((pn - x1) * (pn - x2));
    wzor = iloczynowaTex(a, x1, x2);
    const czynniki = [...(a.eq(1) ? [] : [texNawias(a)]), texNawias(pn - x1), texNawias(pn - x2)].join(" \\cdot ");
    krokP = `Miejscami zerowymi funkcji $f$ są liczby $${x1}$ i $${x2}$, a pierwsza współrzędna wierzchołka leży w połowie między nimi: $p = \\frac{${x1} + ${texNawias(x2)}}{2} = ${pn}$.`;
    krokQ = `$q = ${wartoscTex("f", pn)} = ${czynniki} = ${wq.tex()}$.`;
  }
  if (wariant === "wsp") {
    const tresc = r.pick([
      `Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ${wzor}$. Oblicz współrzędne wierzchołka $W = (p, q)$ paraboli, która jest wykresem funkcji $f$.`,
      `Parabola, która jest wykresem funkcji $f(x) = ${wzor}$, ma wierzchołek w punkcie $W = (p, q)$. Oblicz $p$ i $q$.`,
    ]);
    return {
      tresc,
      pola: [{ id: "p", typ: "liczba", etykieta: "$p =$" }, { id: "q", typ: "liczba", etykieta: "$q =$" }],
      odpowiedz: { p, q: wq },
      wynik: `$W = ${punktTex(p, wq)}$`,
      rozwiazanie: [krokP, krokQ, `Wierzchołek paraboli: $W = ${punktTex(p, wq)}$.`],
    };
  }
  if (wariant === "os") {
    const tresc = r.pick([
      `Wyznacz równanie osi symetrii paraboli, która jest wykresem funkcji kwadratowej $f(x) = ${wzor}$.`,
      `Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ${wzor}$. Podaj równanie osi symetrii wykresu funkcji $f$.`,
    ]);
    return jednoPole("x", "Oś symetrii: $x =$", p, `$x = ${p.tex()}$`, tresc, [
      "Oś symetrii paraboli przechodzi przez jej wierzchołek, więc ma równanie $x = p$.",
      krokP,
      `Oś symetrii: $x = ${p.tex()}$.`,
    ]);
  }
  const maks = a.ujemna;
  const naj = maks ? "największa" : "najmniejsza", najB = maks ? "największą" : "najmniejszą";
  const tresc = r.pick([
    `Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ${wzor}$. Oblicz ${najB} wartość funkcji $f$.`,
    `Wyznacz ${najB} wartość funkcji kwadratowej $f(x) = ${wzor}$.`,
  ]);
  return jednoPole("w", `${wielka(naj)} wartość`, wq, `${wielka(naj)} wartość: $${wq.tex()}$`, tresc, [
    `Współczynnik przy $x^2$ jest ${maks ? "ujemny" : "dodatni"}, więc ramiona paraboli są skierowane w ${maks ? "dół" : "górę"}, a ${najB} wartość funkcja przyjmuje w wierzchołku.`,
    krokP,
    krokQ,
    `${wielka(naj)} wartość funkcji $f$ jest równa $${wq.tex()}$.`,
  ]);
}

/** Największa albo najmniejsza wartość funkcji kwadratowej w przedziale domkniętym. */
function wartoscWPrzedziale(r) {
  for (;;) {
    const a = r.pick([1, -1, 2, -2]);
    const p = r.int(-4, 4), wq = r.int(-9, 9);
    const dl = r.int(2, 5);
    const m = r.int(p - dl - 2, p + 2), n = m + dl;
    if (Math.max(Math.abs(m - p), Math.abs(n - p)) > 6 || Math.abs(m) > 8 || Math.abs(n) > 8) continue;
    const b = -2 * a * p, c = a * p * p + wq;
    const f = (x) => a * (x - p) ** 2 + wq;
    const wSrodku = m <= p && p <= n;
    const maks = r.chance();
    const kandydaci = [f(m), f(n), ...(wSrodku ? [wq] : [])];
    const odp = maks ? Math.max(...kandydaci) : Math.min(...kandydaci);
    const naj = maks ? "największa" : "najmniejsza";
    const przedzial = `[${m}, ${n}]`;
    const tresc = `Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ${wielomianTex([a, b, c])}$. Oblicz ${maks ? "największą" : "najmniejszą"} wartość funkcji $f$ w przedziale $${przedzial}$.`;
    return jednoPole("w", `${wielka(naj)} wartość`, odp, `${wielka(naj)} wartość: $${odp}$`, tresc, [
      `$${pTex(a, b, p)}$, więc $${p} ${wSrodku ? "\\in" : "\\notin"} ${przedzial}$.`,
      `Wartości na końcach przedziału: $${wartoscTex("f", m)} = ${f(m)}$, $${wartoscTex("f", n)} = ${f(n)}$${wSrodku ? `, a w wierzchołku $${wartoscTex("f", p)} = ${wq}$` : ""}.`,
      `${wielka(naj)} wartość funkcji $f$ w przedziale $${przedzial}$ jest równa $${odp}$.`,
    ]);
  }
}

// --- 5. Miejsca zerowe funkcji kwadratowej

function zadanieZer(tresc, z1, z2, rozwiazanie) {
  const [u, v] = Q.z(z1).cmp(z2) < 0 ? [Q.z(z1), Q.z(z2)] : [Q.z(z2), Q.z(z1)];
  return {
    tresc,
    pola: [{ id: "x", typ: "zbior", ile: 2, etykieta: "Miejsca zerowe" }],
    odpowiedz: { x: [u, v] },
    wynik: `$x_1 = ${u.tex()}$, $x_2 = ${v.tex()}$`,
    rozwiazanie,
  };
}

function miejscaZerowe(r) {
  const wariant = r.pick(["delta", "delta", "niepelna", "kanoniczna", "symetria", "parametr"]);
  if (wariant === "symetria") return drugieZSymetrii(r);
  if (wariant === "parametr") return drugieZWzoru(r);
  const pytanie = (wzor) => r.pick([
    `Oblicz miejsca zerowe funkcji kwadratowej $f(x) = ${wzor}$.`,
    `Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ${wzor}$. Wyznacz miejsca zerowe tej funkcji.`,
    `Wykres funkcji kwadratowej $f(x) = ${wzor}$ przecina oś $Ox$ w dwóch punktach. Oblicz pierwsze współrzędne tych punktów.`,
  ]);
  if (wariant === "delta") {
    for (;;) {
      const x1 = r.intBez(-7, 7, 0);
      let x2, a;
      if (r.chance(0.3)) {
        const v = r.pick([2, 3]);              // jedno miejsce zerowe ułamkowe, a podzielne przez mianownik
        x2 = q(r.intBez(-9, 9, 0), v);
        if (x2.calkowita) continue;
        a = v * r.znak();
      } else {
        x2 = q(r.intBez(-7, 7, 0, x1));
        a = r.pick([1, 1, -1, 2, -2, 3, -3]);
      }
      const b = x2.add(x1).mul(-a), c = x2.mul(x1 * a);
      if (b.zero || Math.abs(c.valueOf()) > 60) continue;
      const D = b.mul(b).sub(c.mul(4 * a));
      const s = x2.sub(x1).mul(a);
      const pierw = s.ujemna ? s.neg() : s;     // √Δ = |a(x2 - x1)|
      const z1 = b.neg().sub(pierw).div(2 * a), z2 = b.neg().add(pierw).div(2 * a);
      return zadanieZer(pytanie(wielomianTex([a, b, c])), z1, z2, [
        `$\\Delta = b^2 - 4ac = ${potegaTex(b, 2)} - 4 \\cdot ${texNawias(a)} \\cdot ${texNawias(c)} = ${D.tex()}$, $\\sqrt{\\Delta} = ${pierw.tex()}$.`,
        `$x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a} = \\frac{${b.neg().tex()} - ${pierw.tex()}}{${2 * a}} = ${z1.tex()}$, $x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a} = \\frac{${b.neg().tex()} + ${pierw.tex()}}{${2 * a}} = ${z2.tex()}$.`,
      ]);
    }
  }
  if (wariant === "niepelna") {
    if (r.chance()) {
      // ax^2 + bx = x(ax + b)
      const a = r.pick([1, -1, 2, -2, 3, -3, 4, -4]), b = r.intBez(-12, 12, 0);
      const x2 = q(-b, a);
      const wzor = wielomianTex([a, b, 0]);
      return zadanieZer(pytanie(wzor), 0, x2, [
        `$${wzor} = 0$, czyli $x(${wielomianTex([a, b])}) = 0$.`,
        `$x = 0$ lub $${wielomianTex([a, b])} = 0$, czyli $x = ${x2.tex()}$.`,
      ]);
    }
    for (;;) {
      // ax^2 + c = 0, miejsca zerowe ±d
      const v = r.pick([1, 1, 2, 3]);
      const d = q(r.int(1, 6), v);
      if (d.d !== v) continue;
      const a = v === 1 ? r.pick([1, -1, 2, -2, 3, -3]) : v * v * r.znak();
      const c = d.mul(d).mul(-a);
      if (Math.abs(c.valueOf()) > 80) continue;
      const wzor = wielomianTex([a, 0, c]);
      return zadanieZer(pytanie(wzor), d.neg(), d, [
        `$${wzor} = 0$, czyli $${wielomianTex([a, 0, 0])} = ${c.neg().tex()}$.`,
        `$x^2 = ${d.mul(d).tex()}$, więc $x = ${d.neg().tex()}$ lub $x = ${d.tex()}$.`,
      ]);
    }
  }
  for (;;) {
    // postać kanoniczna a(x - p)^2 + q, miejsca zerowe p ± d
    const a = q(...r.pick([[1, 1], [-1, 1], [2, 1], [-2, 1], [3, 1], [-3, 1], [1, 2], [-1, 2]]));
    const p = r.int(-5, 5), d = r.int(1, 5);
    const wq = a.mul(-d * d);
    if (Math.abs(wq.valueOf()) > 40) continue;
    const wzor = kanonicznaTex(a, p, wq);
    const xp = p === 0 ? "x" : `x ${plusMinus(-p)}`;
    return zadanieZer(pytanie(wzor), p - d, p + d, [
      `$${wzor} = 0$, czyli $${p === 0 ? "x^2" : `${nawiasMinus(p)}^2`} = ${d * d}$.`,
      `$${xp} = ${-d}$ lub $${xp} = ${d}$, więc $x = ${p - d}$ lub $x = ${p + d}$.`,
    ]);
  }
}

/** Jedno miejsce zerowe i pierwsza współrzędna wierzchołka -> drugie miejsce zerowe (CKE 2023, zad. 14). */
function drugieZSymetrii(r) {
  const x1 = r.intBez(-8, 8, 0), x2 = r.intBez(-10, 12, x1);
  const p = q(x1 + x2, 2);
  const wariant = r.int(0, 2);
  const tresc = [
    `Jednym z miejsc zerowych funkcji kwadratowej $f$ jest liczba $${texNawias(x1)}$. Pierwsza współrzędna wierzchołka paraboli, będącej wykresem funkcji $f$, jest równa $${texNawias(p)}$. Oblicz drugie miejsce zerowe funkcji $f$.`,
    `Prosta o równaniu $x = ${p.tex()}$ jest osią symetrii wykresu funkcji kwadratowej $f$, a liczba $${texNawias(x1)}$ jest jednym z miejsc zerowych tej funkcji. Oblicz drugie miejsce zerowe funkcji $f$.`,
    `Parabola, która jest wykresem funkcji kwadratowej $f$, przecina oś $Ox$ w punktach $A = ${punktTex(x1, 0)}$ i $B$. Pierwsza współrzędna wierzchołka tej paraboli jest równa $${texNawias(p)}$. Oblicz pierwszą współrzędną punktu $B$.`,
  ][wariant];
  const etykieta = wariant === 2 ? "Pierwsza współrzędna punktu $B$" : "Drugie miejsce zerowe";
  const wynik = wariant === 2 ? `$B = ${punktTex(x2, 0)}$` : `$x_2 = ${x2}$`;
  return jednoPole("x2", etykieta, x2, wynik, tresc, [
    "Miejsca zerowe leżą symetrycznie względem osi paraboli, więc pierwsza współrzędna wierzchołka jest ich średnią: $p = \\frac{x_1 + x_2}{2}$.",
    `$${p.tex()} = \\frac{${x1} + x_2}{2}$, stąd $x_2 = 2 \\cdot ${texNawias(p)} - ${texNawias(x1)} = ${x2}$.`,
  ]);
}

/** Jedno miejsce zerowe funkcji z nieznanym współczynnikiem b -> drugie miejsce zerowe. */
function drugieZWzoru(r) {
  for (;;) {
    const a = r.pick([1, 1, -1, 2, -2]);
    const x1 = r.intBez(-6, 6, 0), x2 = r.intBez(-6, 6, 0, x1);
    const b = -a * (x1 + x2), c = a * x1 * x2;
    if (b === 0 || Math.abs(c) > 40) continue;
    const D = b * b - 4 * a * c, s = Math.abs(a * (x1 - x2));
    const z1 = q(-b - s, 2 * a), z2 = q(-b + s, 2 * a);
    const wzor = `${wielomianTex([a, 0, 0])} + bx ${plusMinus(c)}`;
    const tresc = r.pick([
      `Liczba $${texNawias(x1)}$ jest miejscem zerowym funkcji kwadratowej $f(x) = ${wzor}$. Oblicz drugie miejsce zerowe tej funkcji.`,
      `Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ${wzor}$, a jednym z jej miejsc zerowych jest liczba $${texNawias(x1)}$. Oblicz drugie miejsce zerowe funkcji $f$.`,
    ]);
    return jednoPole("x2", "Drugie miejsce zerowe", x2, `$x_2 = ${x2}$ (wtedy $b = ${b}$)`, tresc, [
      `$${wartoscTex("f", x1)} = 0$, czyli $${podstawTex([a, 0, 0], x1)} + b \\cdot ${texNawias(x1)} ${plusMinus(c)} = 0$, stąd $${sumaTex([[x1, "b"], [a * x1 * x1 + c, ""]])} = 0$ i $b = ${b}$.`,
      `$f(x) = ${wielomianTex([a, b, c])}$, $\\Delta = ${potegaTex(b, 2)} - 4 \\cdot ${texNawias(a)} \\cdot ${texNawias(c)} = ${D}$, $\\sqrt{\\Delta} = ${s}$.`,
      `$x = \\frac{${-b} - ${s}}{${2 * a}} = ${z1.tex()}$ lub $x = \\frac{${-b} + ${s}}{${2 * a}} = ${z2.tex()}$, więc drugim miejscem zerowym jest $${texNawias(x2)}$.`,
    ]);
  }
}

// --- 6. Ciąg arytmetyczny

function ciagArytmetyczny(r) {
  const wariant = r.pick(["suma", "wyrazy", "wyrazy", "parametr"]);
  if (wariant === "suma") return arytmetycznySuma(r);
  if (wariant === "parametr") return arytmetycznyParametr(r);
  return arytmetycznyWyrazy(r);
}

/** Dany wyraz a_k i suma S_n -> różnica albo pierwszy wyraz (CKE 2024, zad. 17). */
function arytmetycznySuma(r) {
  for (;;) {
    const a1 = r.int(-10, 10), d = r.intBez(-5, 5, 0);
    const k = r.int(2, 6), n = r.int(8, 20);
    if (n === 2 * k - 1) continue;               // wtedy S_n = n·a_k i różnicy nie da się wyznaczyć
    const ak = a1 + (k - 1) * d;
    const T = 2 * a1 + (n - 1) * d;              // 2a_1 + (n - 1)r = 2S_n / n
    const S = (n * T) / 2;                       // zawsze całkowite
    if (Math.abs(S) > 600) continue;
    const pytamR = r.chance(0.7);
    const dane = r.pick([
      `W ciągu arytmetycznym $(a_n)$, ${OKRESLONYM}, dane są: $a_{${k}} = ${ak}$ oraz $S_{${n}} = ${S}$, gdzie $S_{${n}}$ oznacza sumę ${ILU[n]} początkowych wyrazów tego ciągu.`,
      `Ciąg arytmetyczny $(a_n)$ jest ${OKRESLONY}. ${wielka(PORZADKOWE[k])} wyraz tego ciągu jest równy $${texNawias(ak)}$, a suma ${ILU[n]} początkowych wyrazów tego ciągu jest równa $${texNawias(S)}$.`,
    ]);
    const rown1 = sumaTex([[1, "a_1"], [k - 1, "r"]]);
    const kroki = [
      `$a_{${k}} = ${rown1}$, więc $${rown1} = ${ak}$.`,
      `$S_{${n}} = \\frac{2a_1 + ${n - 1}r}{2} \\cdot ${n} = ${S}$, czyli $2a_1 + ${n - 1}r = ${T}$.`,
      `Odejmujemy od drugiego równania podwojone pierwsze: $${sumaTex([[n - 2 * k + 1, "r"]])} = ${T - 2 * ak}$, więc $r = ${d}$.`,
    ];
    if (pytamR) return jednoPole("r", "$r =$", d, `$r = ${d}$`, `${dane} Oblicz różnicę $r$ tego ciągu.`, kroki);
    kroki.push(`$a_1 = ${ak} - ${k - 1} \\cdot ${texNawias(d)} = ${a1}$.`);
    return jednoPole("a1", "$a_1 =$", a1, `$a_1 = ${a1}$`, `${dane} Oblicz pierwszy wyraz $a_1$ tego ciągu.`, kroki);
  }
}

/** Dwa wyrazy -> różnica, dalszy wyraz albo suma (CKE 2026, zad. 16). */
function arytmetycznyWyrazy(r) {
  for (;;) {
    const i = r.pick([1, 1, 2, 3]), j = i + r.int(2, 5);
    const d = (j - i) % 2 === 0 && r.chance(0.25) ? q(r.pick([-5, -3, -1, 1, 3, 5]), 2) : q(r.intBez(-6, 6, 0));
    const ai = q(r.int(-12, 12));
    const aj = ai.add(d.mul(j - i));
    const a1 = ai.sub(d.mul(i - 1));
    const pyt = r.pick(["r", "wyraz", "wyraz", "suma"]);
    const m = j + r.int(1, 12), n = r.int(5, 20);
    const am = ai.add(d.mul(m - i));
    const S = a1.mul(2).add(d.mul(n - 1)).mul(n).div(2);
    if (pyt === "wyraz" && Math.abs(am.valueOf()) > 150) continue;
    if (pyt === "suma" && (S.d > 4 || Math.abs(S.valueOf()) > 1000)) continue;
    const dane = r.pick([
      `W ciągu arytmetycznym $(a_n)$, ${OKRESLONYM}, dane są wyrazy $a_{${i}} = ${ai.tex()}$ oraz $a_{${j}} = ${aj.tex()}$.`,
      `Ciąg arytmetyczny $(a_n)$ jest ${OKRESLONY}. ${wielka(PORZADKOWE[i])} wyraz tego ciągu jest równy $${texNawias(ai)}$, a ${PORZADKOWE[j]} wyraz jest równy $${texNawias(aj)}$.`,
    ]);
    const kroki = [
      `$a_{${j}} = a_{${i}} + ${j - i}r$, więc $${aj.tex()} = ${sumaTex([[ai, ""], [j - i, "r"]])}$ i $r = \\frac{${aj.tex()} - ${texNawias(ai)}}{${j - i}} = ${d.tex()}$.`,
    ];
    if (pyt === "r") return jednoPole("r", "$r =$", d, `$r = ${d.tex()}$`, `${dane} Oblicz różnicę $r$ tego ciągu.`, kroki);
    if (pyt === "wyraz") {
      kroki.push(`$a_{${m}} = a_{${i}} + ${m - i}r = ${ai.tex()} + ${m - i} \\cdot ${texNawias(d)} = ${am.tex()}$.`);
      return jednoPole("am", `$a_{${m}} =$`, am, `$a_{${m}} = ${am.tex()}$`, `${dane} Oblicz wyraz $a_{${m}}$.`, kroki);
    }
    if (i > 1) kroki.push(`$a_1 = a_{${i}}${sumaTex([[-(i - 1), "r"]], true)} = ${ai.tex()} - ${i - 1} \\cdot ${texNawias(d)} = ${a1.tex()}$.`);
    kroki.push(`$S_{${n}} = \\frac{2a_1 + ${n - 1}r}{2} \\cdot ${n} = \\frac{2 \\cdot ${texNawias(a1)} + ${n - 1} \\cdot ${texNawias(d)}}{2} \\cdot ${n} = ${S.tex()}$.`);
    return jednoPole("S", `$S_{${n}} =$`, S, `$S_{${n}} = ${S.tex()}$`,
      `${dane} Oblicz sumę $S_{${n}}$ ${ILU[n]} początkowych wyrazów tego ciągu.`, kroki);
  }
}

/** Trzy wyrazy zależne od parametru tworzą ciąg arytmetyczny (CKE 2025, zad. 15). */
function arytmetycznyParametr(r) {
  const L = r.pick(["m", "x", "k"]);
  for (;;) {
    const al = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)];
    if (al.filter((x) => x !== 0).length < 2) continue;
    const D = 2 * al[1] - al[0] - al[2];
    if (D === 0) continue;
    const m = r.intBez(-6, 6, 0);
    const be = [r.int(-9, 9), r.int(-9, 9)];
    be.push(m * D + 2 * be[1] - be[0]);          // warunek 2b = a + c
    if (Math.abs(be[2]) > 15) continue;
    const t = al.map((x, i) => x * m + be[i]);
    if (t[1] === t[0]) continue;                 // ciąg stały
    const e = al.map((x, i) => sumaTex([[x, L], [be[i], ""]]));
    const tresc = r.pick([
      `Trzywyrazowy ciąg $(${e.join(", ")})$ jest arytmetyczny. Oblicz $${L}$.`,
      `Liczby $${e[0]}$, $${e[1]}$ oraz $${e[2]}$ są – w podanej kolejności – pierwszym, drugim i trzecim wyrazem ciągu arytmetycznego. Oblicz $${L}$.`,
    ]);
    const lewa = `2${wNawiasie(e[1]) === e[1] ? ` \\cdot ${e[1]}` : wNawiasie(e[1])}`;
    const prawa = `${wNawiasie(e[0])} + ${wNawiasie(e[2])}`;
    return jednoPole(L, `$${L} =$`, m, `$${L} = ${m}$`, tresc, [
      `Trzy liczby tworzą ciąg arytmetyczny wtedy, gdy podwojony środkowy wyraz jest równy sumie skrajnych: $${lewa} = ${prawa}$.`,
      `$${sumaTex([[2 * al[1], L], [2 * be[1], ""]])} = ${sumaTex([[al[0] + al[2], L], [be[0] + be[2], ""]])}$`,
      `$${sumaTex([[D, L]])} = ${be[0] + be[2] - 2 * be[1]}$, więc $${L} = ${m}$.`,
      `Sprawdzenie: dla $${L} = ${m}$ otrzymujemy ciąg $(${t.join(", ")})$ o różnicy $${t[1] - t[0]}$.`,
    ]);
  }
}

// --- 7. Ciąg geometryczny

function ciagGeometryczny(r) {
  const wariant = r.pick(["trzy", "trzy", "wyrazy", "wyrazy", "iloczyn"]);
  if (wariant === "trzy") return geometrycznyTrzy(r);
  if (wariant === "wyrazy") return geometrycznyWyrazy(r);
  return geometrycznyIloczyn(r);
}

const ILORAZY = [[2, 1], [-2, 1], [3, 1], [-3, 1], [1, 2], [-1, 2], [1, 3], [-1, 3], [3, 2], [-3, 2], [2, 3], [-2, 3]];

/** Trzy wyrazy, jeden z parametrem (CKE 2023, zad. 16: ciąg (27, 9, a - 1)). */
function geometrycznyTrzy(r) {
  const L = r.pick(["a", "x", "m"]);
  for (;;) {
    const [n, d] = r.pick(ILORAZY);
    const s = r.pick([1, 1, 2, 3, -1, -2]);
    const t = [s * d * d, s * d * n, s * n * n];
    if (t.some((x) => Math.abs(x) > 60)) continue;
    const gdzie = r.pick([0, 2, 2]);             // który wyraz zawiera parametr
    const alfa = r.pick([1, 1, 1, 2, -1, 3]), beta = r.int(-6, 6);
    const x = q(t[gdzie] - beta, alfa);
    if (x.d > 3) continue;
    const wyr = sumaTex([[alfa, L], [beta, ""]]);
    const ciag = t.map((v, i) => (i === gdzie ? wyr : String(v))).join(", ");
    const proza = t.map((v, i) => `$${i === gdzie ? wyr : texNawias(v)}$`);
    const tresc = r.pick([
      `Ciąg $(${ciag})$ jest geometryczny. Oblicz $${L}$.`,
      `Trzywyrazowy ciąg $(${ciag})$ jest geometryczny. Oblicz $${L}$.`,
      `Liczby ${proza[0]}, ${proza[1]} oraz ${proza[2]} są – w podanej kolejności – pierwszym, drugim i trzecim wyrazem ciągu geometrycznego. Oblicz $${L}$.`,
    ]);
    const iloczyn = gdzie === 2 ? `${texNawias(t[0])} \\cdot ${wNawiasie(wyr)}` : `${wNawiasie(wyr)} \\cdot ${texNawias(t[2])}`;
    return jednoPole(L, `$${L} =$`, x, `$${L} = ${x.tex()}$`, tresc, [
      `Trzy liczby różne od zera tworzą ciąg geometryczny wtedy, gdy kwadrat środkowej jest równy iloczynowi skrajnych: $${potegaTex(t[1], 2)} = ${iloczyn}$.`,
      `$${t[1] * t[1]} = ${iloczyn}$, więc $${wyr} = ${t[gdzie]}$${wyr === L ? "" : `, stąd $${L} = ${x.tex()}$`}.`,
    ]);
  }
}

/** Dwa wyrazy -> iloraz, dalszy wyraz albo suma (CKE 2025, zad. 16). */
function geometrycznyWyrazy(r) {
  for (;;) {
    const odstep = r.pick([1, 1, 2, 3]);
    const dodatnie = odstep === 2;               // z q^2 znak ilorazu wynika z dodatnich wyrazów
    const lista = odstep === 1 ? ILORAZY : odstep === 2 ? [[2, 1], [3, 1], [1, 2], [1, 3]] : ILORAZY.slice(0, 8);
    const iloraz = q(...r.pick(lista));
    const i = r.int(1, 3), j = i + odstep;
    const a1 = q(r.int(1, 6) * (dodatnie ? 1 : r.znak()) * iloraz.d ** r.int(0, 4));
    const wyraz = (k) => a1.mul(iloraz.pow(k - 1));
    const ai = wyraz(i), aj = wyraz(j);
    if (!ai.calkowita || !aj.calkowita || Math.abs(ai.valueOf()) > 400 || Math.abs(aj.valueOf()) > 400) continue;
    const pyt = r.pick(["q", "wyraz", "wyraz", "suma"]);
    const m = j + r.int(1, 3), n = r.int(3, 6);
    const am = wyraz(m);
    const S = a1.mul(q(1).sub(iloraz.pow(n))).div(q(1).sub(iloraz));
    const ladna = (v) => v.d <= 12 && Math.abs(v.n) <= 5000;
    if ((pyt === "wyraz" && !ladna(am)) || (pyt === "suma" && !ladna(S))) continue;
    const wDod = dodatnie ? " o wyrazach dodatnich" : "";
    const dane = r.pick([
      `W ciągu geometrycznym $(a_n)$${wDod} dane są wyrazy $a_{${i}} = ${ai.tex()}$ oraz $a_{${j}} = ${aj.tex()}$.`,
      `${wielka(PORZADKOWE[i])} wyraz ciągu geometrycznego $(a_n)$${wDod} jest równy $${texNawias(ai)}$, a ${PORZADKOWE[j]} wyraz tego ciągu jest równy $${texNawias(aj)}$.`,
    ]);
    const kroki = [odstep === 1
      ? `$q = \\frac{a_{${j}}}{a_{${i}}} = \\frac{${aj.tex()}}{${ai.tex()}} = ${iloraz.tex()}$.`
      : `$a_{${j}} = a_{${i}} \\cdot q^{${odstep}}$, więc $q^{${odstep}} = \\frac{${aj.tex()}}{${ai.tex()}} = ${iloraz.pow(odstep).tex()}$${dodatnie ? `. Wyrazy ciągu są dodatnie, więc $q > 0$ i $q = ${iloraz.tex()}$.` : `, czyli $q = ${iloraz.tex()}$.`}`];
    if (pyt === "q") return jednoPole("q", "$q =$", iloraz, `$q = ${iloraz.tex()}$`, `${dane} Oblicz iloraz $q$ tego ciągu.`, kroki);
    if (pyt === "wyraz") {
      kroki.push(`$a_{${m}} = a_{${j}} \\cdot ${potLit("q", m - j)} = ${aj.tex()} \\cdot ${potegaTex(iloraz, m - j)} = ${am.tex()}$.`);
      return jednoPole("am", `$a_{${m}} =$`, am, `$a_{${m}} = ${am.tex()}$`, `${dane} Oblicz wyraz $a_{${m}}$.`, kroki);
    }
    if (i > 1) kroki.push(`$a_1 = a_{${i}} : ${potLit("q", i - 1)} = ${ai.tex()} : ${potegaTex(iloraz, i - 1)} = ${a1.tex()}$.`);
    kroki.push(`$S_{${n}} = a_1 \\cdot \\frac{1 - q^{${n}}}{1 - q} = ${a1.tex()} \\cdot \\frac{1 - ${potegaTex(iloraz, n)}}{1 - ${texNawias(iloraz)}} = ${S.tex()}$.`);
    return jednoPole("S", `$S_{${n}} =$`, S, `$S_{${n}} = ${S.tex()}$`,
      `${dane} Oblicz sumę $S_{${n}}$ ${ILU[n]} początkowych wyrazów tego ciągu.`, kroki);
  }
}

/** Iloczyny wyrazów: a_i · a_j = a_k · a_l, gdy i + j = k + l (CKE 2026, zad. 17), oraz a_(k-d) · a_(k+d) = a_k^2. */
function geometrycznyIloczyn(r) {
  const wg = (k) => (k === 1 ? "a_1" : `a_1 \\cdot ${potLit("q", k - 1)}`);
  if (r.chance(0.6)) {
    const P = r.pick([6, 8, 10, 12, 15, 18, 20, 24, 27, 32, 36, 45, 48, 50]);
    for (;;) {
      const i = r.int(1, 4), j = r.int(i + 2, 9);
      const pary = [];
      for (let k = 1; 2 * k < i + j; k++) if (k !== i) pary.push([k, i + j - k]);
      if (!pary.length) continue;
      const [k, l] = r.pick(pary);
      const tresc = r.pick([
        `W ciągu geometrycznym $(a_n)$ spełniony jest warunek $a_{${i}} \\cdot a_{${j}} = ${P}$. Oblicz iloczyn $a_{${k}} \\cdot a_{${l}}$.`,
        `Dany jest ciąg geometryczny $(a_n)$, w którym $a_{${i}} \\cdot a_{${j}} = ${P}$. Oblicz $a_{${k}} \\cdot a_{${l}}$.`,
      ]);
      return jednoPole("w", `$a_{${k}} \\cdot a_{${l}} =$`, P, `$a_{${k}} \\cdot a_{${l}} = ${P}$`, tresc, [
        `Ze wzoru $a_n = a_1 \\cdot q^{n - 1}$: $a_{${i}} \\cdot a_{${j}} = ${wg(i)} \\cdot ${wg(j)} = a_1^2 \\cdot q^{${i + j - 2}}$.`,
        `Tak samo $a_{${k}} \\cdot a_{${l}} = a_1^2 \\cdot q^{${k + l - 2}}$, bo $${k} + ${l} = ${i} + ${j}$.`,
        `Zatem $a_{${k}} \\cdot a_{${l}} = a_{${i}} \\cdot a_{${j}} = ${P}$.`,
      ]);
    }
  }
  const w = r.int(2, 12), k = r.int(3, 7), d = r.int(1, Math.min(k - 1, 3));
  const tresc = r.pick([
    `W ciągu geometrycznym $(a_n)$ o wyrazach dodatnich spełniony jest warunek $a_{${k - d}} \\cdot a_{${k + d}} = ${w * w}$. Oblicz $a_{${k}}$.`,
    `Wszystkie wyrazy ciągu geometrycznego $(a_n)$ są dodatnie i $a_{${k - d}} \\cdot a_{${k + d}} = ${w * w}$. Oblicz wyraz $a_{${k}}$.`,
  ]);
  return jednoPole("ak", `$a_{${k}} =$`, w, `$a_{${k}} = ${w}$`, tresc, [
    `$a_{${k - d}} = a_{${k}} : ${potLit("q", d)}$ oraz $a_{${k + d}} = a_{${k}} \\cdot ${potLit("q", d)}$, więc $a_{${k - d}} \\cdot a_{${k + d}} = a_{${k}}^2$.`,
    `$a_{${k}}^2 = ${w * w}$ i $a_{${k}} > 0$, więc $a_{${k}} = ${w}$.`,
  ]);
}

// --- 8. Wzór ogólny ciągu

function wzorOgolny(r) {
  const wariant = r.pick(["wyraz", "wyraz", "ktory", "ile"]);
  if (wariant === "ktory") return ktoryWyraz(r);
  if (wariant === "ile") return ileWyrazow(r);
  return obliczWyraz(r);
}

/** Wyraz ciągu ze wzoru (CKE 2023, zad. 15: a_n = 2n(n + 1); CKE 2024, zad. 15: a_n = (-1)^n · (n - 5)). */
function obliczWyraz(r) {
  for (;;) {
    const typ = r.pick(["iloczyn", "znak", "ulamek", "kwadrat"]);
    let wzor, podst, wartosc, k;
    if (typ === "iloczyn") {
      const c = r.pick([1, 2, 3, -1, -2]), d = r.intBez(-5, 5, 0);
      k = r.int(2, 12);
      wzor = `${wspTex(c)}n${nawiasMinus(-d, "n")}`;
      podst = `${c === 1 ? "" : `${c} \\cdot `}${k} \\cdot (${k} ${plusMinus(d)})`;
      wartosc = q(c * k * (k + d));
    } else if (typ === "znak") {
      const d = r.intBez(-6, 9, 0);
      k = r.int(2, 15);
      const z = k % 2 ? -1 : 1;
      wzor = `(-1)^n \\cdot ${nawiasMinus(d, "n")}`;
      podst = `(-1)^{${k}} \\cdot (${k} ${plusMinus(-d)}) = ${z} \\cdot ${texNawias(k - d)}`;
      wartosc = q(z * (k - d));
    } else if (typ === "ulamek") {
      const al = r.pick([1, 2, 3, -1, -2]), be = r.int(-6, 6), ga = r.int(1, 5);
      k = r.int(2, 12 - ga);
      wzor = `\\frac{${sumaTex([[al, "n"], [be, ""]])}}{n + ${ga}}`;
      podst = `\\frac{${podstawTex([al, be], k)}}{${k} + ${ga}}`;
      wartosc = q(al * k + be, k + ga);
    } else {
      const al = r.pick([1, -1, 2]), be = r.int(-6, 6), ga = r.int(-9, 9);
      k = r.int(2, 10);
      wzor = wielomianTex([al, be, ga], "n");
      podst = podstawTex([al, be, ga], k);
      wartosc = q(al * k * k + be * k + ga);
    }
    if (wartosc.zero) continue;
    const tresc = r.pick([
      `Ciąg $(a_n)$ jest określony wzorem $a_n = ${wzor}$ dla każdej liczby naturalnej $n \\geq 1$. Oblicz $a_{${k}}$.`,
      `Oblicz ${PORZADKOWE[k]} wyraz ciągu $(a_n)$ określonego wzorem $a_n = ${wzor}$ dla $n \\geq 1$.`,
    ]);
    return jednoPole("a", `$a_{${k}} =$`, wartosc, `$a_{${k}} = ${wartosc.tex()}$`, tresc, [
      `Podstawiamy $n = ${k}$ do wzoru ciągu.`,
      `$a_{${k}} = ${podst} = ${wartosc.tex()}$.`,
    ]);
  }
}

/** Numer wyrazu o danej wartości (wzór liniowy albo kwadratowy). */
function ktoryWyraz(r) {
  for (;;) {
    let wzor, V, n0, kroki;
    if (r.chance(0.6)) {
      const al = r.intBez(-6, 6, 0), be = r.int(-20, 20);
      n0 = r.int(4, 40);
      V = al * n0 + be;
      if (Math.abs(V) > 200) continue;
      wzor = wielomianTex([al, be], "n");
      kroki = [
        `$a_n = ${V}$, czyli $${wzor} = ${V}$.`,
        `$${sumaTex([[al, "n"]])} = ${V - be}$, więc $n = ${n0}$.`,
        `Liczba $${n0}$ jest naturalna, więc liczba $${texNawias(V)}$ jest wyrazem $a_{${n0}}$ tego ciągu.`,
      ];
    } else {
      // n^2 + bn + c = V  <=>  (n - n0)(n - n1) = 0, drugi pierwiastek ujemny
      n0 = r.int(3, 12);
      const n1 = r.int(-8, -1), c = r.int(-10, 10);
      const b = -(n0 + n1);
      V = c - n0 * n1;
      if (V > 150) continue;
      wzor = wielomianTex([1, b, c], "n");
      kroki = [
        `$${wzor} = ${V}$, czyli $${wielomianTex([1, b, c - V], "n")} = 0$.`,
        `$\\Delta = ${(n0 - n1) ** 2}$, $\\sqrt{\\Delta} = ${n0 - n1}$, więc $n = ${n1}$ lub $n = ${n0}$.`,
        `Numer wyrazu jest liczbą naturalną dodatnią, więc $n = ${n0}$.`,
      ];
    }
    const tresc = r.pick([
      `Ciąg $(a_n)$ jest określony wzorem $a_n = ${wzor}$ dla każdej liczby naturalnej $n \\geq 1$. Który wyraz tego ciągu jest równy $${texNawias(V)}$?`,
      `Liczba $${texNawias(V)}$ jest wyrazem ciągu $(a_n)$ określonego wzorem $a_n = ${wzor}$ dla $n \\geq 1$. Wyznacz numer $n$ tego wyrazu.`,
    ]);
    return jednoPole("n", "$n =$", n0, `$n = ${n0}$, czyli $a_{${n0}} = ${V}$`, tresc, kroki);
  }
}

/** Liczba wyrazów ujemnych (albo dodatnich) ciągu o wzorze liniowym. */
function ileWyrazow(r) {
  for (;;) {
    const ujemne = r.chance();
    const al = ujemne ? r.int(1, 6) : -r.int(1, 6);
    const be = ujemne ? -r.int(5, 60) : r.int(5, 60);
    const ile = Math.floor((Math.abs(be) - 1) / Math.abs(al));   // liczby n ≥ 1, dla których n < |be| / |al|
    if (ile < 5) continue;
    const wzor = wielomianTex([al, be], "n");
    const jakich = ujemne ? "ujemnych" : "dodatnich";
    const zn = ujemne ? "<" : ">";
    const tresc = r.pick([
      `Ciąg $(a_n)$ jest określony wzorem $a_n = ${wzor}$ dla każdej liczby naturalnej $n \\geq 1$. Ile wyrazów tego ciągu jest ${jakich}?`,
      `Ile ${jakich} wyrazów ma ciąg $(a_n)$ określony wzorem $a_n = ${wzor}$ dla $n \\geq 1$?`,
    ]);
    const kroki = [`$${wzor} ${zn} 0$, czyli $${sumaTex([[al, "n"]])} ${zn} ${-be}$.`];
    if (al !== 1) kroki.push(`Dzielimy przez $${texNawias(al)}$${ujemne ? "" : " i zmieniamy zwrot nierówności"}: $n < ${q(-be, al).tex()}$.`);
    kroki.push(`Warunek spełniają liczby naturalne $1, 2, \\ldots, ${ile}$, więc ${jakich} wyrazów jest $${ile}$.`);
    return jednoPole("ile", `Liczba wyrazów ${jakich}`, ile, `${wielka(jakich)} wyrazów jest $${ile}$`, tresc, kroki);
  }
}

// --- Lista generatorów

export const GENERATORY = [
  { id: "funkcja-liniowa", nazwa: "Funkcja liniowa", opis: "Miejsce zerowe i parametr we wzorze funkcji liniowej.", generuj: funkcjaLiniowa },
  { id: "prosta-przez-punkty", nazwa: "Wzór funkcji liniowej", opis: "Wzór funkcji liniowej z dwóch punktów albo z prostej równoległej lub prostopadłej.", generuj: prostaPrzezPunkty },
  { id: "postac-kanoniczna", nazwa: "Postać kanoniczna", opis: "Wzór funkcji kwadratowej w postaci kanonicznej z wierzchołka, osi symetrii lub miejsc zerowych.", generuj: postacKanoniczna },
  { id: "wierzcholek", nazwa: "Wierzchołek paraboli", opis: "Wierzchołek, oś symetrii oraz największa i najmniejsza wartość funkcji kwadratowej.", generuj: wierzcholek },
  { id: "miejsca-zerowe", nazwa: "Miejsca zerowe funkcji kwadratowej", opis: "Miejsca zerowe z wyróżnika, z postaci kanonicznej i z symetrii paraboli.", generuj: miejscaZerowe },
  { id: "ciag-arytmetyczny", nazwa: "Ciąg arytmetyczny", opis: "Różnica, wyrazy i suma ciągu arytmetycznego, ciąg z parametrem.", generuj: ciagArytmetyczny },
  { id: "ciag-geometryczny", nazwa: "Ciąg geometryczny", opis: "Iloraz, wyrazy, suma i iloczyny wyrazów ciągu geometrycznego.", generuj: ciagGeometryczny },
  { id: "wzor-ogolny", nazwa: "Wzór ogólny ciągu", opis: "Wyrazy ciągu ze wzoru, numer wyrazu o danej wartości, liczba wyrazów ujemnych.", generuj: wzorOgolny },
];
