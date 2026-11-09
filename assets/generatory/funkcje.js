// Generatory zadań z działu „Funkcje i ciągi” (matura podstawowa, formuła 2023).
// Kontrakt zadania i narzędzia: zob. wspolne.js. Każde zadanie budujemy od końca – z ładnej odpowiedzi.
// Własności funkcji, inne funkcje, funkcja homograficzna oraz równania wykładnicze i logarytmiczne: sekcje „Własności funkcji”, „Inne funkcje”, „Funkcja homograficzna”, „Równania i nierówności…”.
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

// --- Własności funkcji

/** „o 1 jednostkę”, „o 3 jednostki”, „o 5 jednostek”. */
const jednostek = (n) => (n === 1 ? "jednostkę" : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? "jednostki" : "jednostek");

/** Przedziały do nieskończoności: odLiczby(3, true) -> "[3, +\infty)", doLiczby(3, false) -> "(-\infty, 3)". */
const odLiczby = (x, domkniety) => `${domkniety ? "[" : "("}${Q.z(x).tex()}, +\\infty)`;
const doLiczby = (x, domkniety) => `(-\\infty, ${Q.z(x).tex()}${domkniety ? "]" : ")"}`;

/** Zbiór par: zbiorParTex([[1, 2], [3, 4]]) -> "\{(1, 2), (3, 4)\}". */
const zbiorParTex = (pary) => `\\{${pary.map(([x, y]) => `(${x}, ${y})`).join(", ")}\\}`;

function wlasnosciWartosci(r) {
  const wariant = r.pick(["wartosc", "wartosc", "argument", "dwaArgumenty", "parametr", "parametr", "pary"]);
  if (wariant === "wartosc") return wartoscZeWzoru(r);
  if (wariant === "argument") return argumentLiniowej(r);
  if (wariant === "dwaArgumenty") return dwaArgumenty(r);
  if (wariant === "pary") return zbiorParFunkcja(r);
  return parametrZWarunku(r);
}

/** Wartość funkcji dla danego argumentu: wzór kwadratowy, ułamkowy albo z pierwiastkiem. */
function wartoscZeWzoru(r) {
  const typ = r.pick(["kwadrat", "kwadrat", "ulamek", "pierwiastek"]);
  for (;;) {
    let wzor, k, w, kroki;
    if (typ === "kwadrat") {
      const a = r.pick([1, -1, 2, -2, 3, -3]), b = r.int(-6, 6), c = r.int(-9, 9);
      k = r.intBez(-4, 4, 0);
      w = q(a * k * k + b * k + c);
      wzor = wielomianTex([a, b, c]);
      kroki = [
        `Podstawiamy $x = ${k}$ do wzoru funkcji.`,
        `$${wartoscTex("f", k)} = ${podstawTex([a, b, c], k)} = ${w.tex()}$.`,
      ];
    } else if (typ === "ulamek") {
      const al = r.intBez(-4, 4, 0), be = r.int(-8, 8), ga = r.intBez(-6, 6, 0);
      k = r.intBez(-5, 6, 0);
      if (k + ga === 0) continue;
      w = q(al * k + be, k + ga);
      if (w.d > 6 || Math.abs(w.valueOf()) > 20) continue;
      wzor = `\\frac{${sumaTex([[al, "x"], [be, ""]])}}{${wielomianTex([1, ga])}}`;
      kroki = [
        `Podstawiamy $x = ${k}$ do wzoru funkcji.`,
        `$${wartoscTex("f", k)} = \\frac{${podstawTex([al, be], k)}}{${texNawias(k)} ${plusMinus(ga)}} = \\frac{${al * k + be}}{${k + ga}} = ${w.tex()}$.`,
      ];
    } else {
      const a = r.pick([1, 2, 3, -1, -2, -3]), m = r.int(1, 6), c = r.pick([0, 0, -2, 1, 3, -5]);
      k = r.int(-4, 8);
      const b = m * m - a * k;
      if (Math.abs(b) > 20) continue;
      w = q(m + c);
      const cTxt = c ? ` ${plusMinus(c)}` : "";
      wzor = `\\sqrt{${wielomianTex([a, b])}}${cTxt}`;
      kroki = [
        `Podstawiamy $x = ${k}$ do wzoru funkcji.`,
        `$${wartoscTex("f", k)} = \\sqrt{${podstawTex([a, b], k)}}${cTxt} = \\sqrt{${m * m}}${cTxt} = ${w.tex()}$.`,
      ];
    }
    const tresc = r.pick([
      `Funkcja $f$ jest określona wzorem $f(x) = ${wzor}$. Oblicz $${wartoscTex("f", k)}$.`,
      `Dana jest funkcja $f(x) = ${wzor}$. Oblicz wartość tej funkcji dla argumentu $${texNawias(k)}$.`,
    ]);
    return jednoPole("w", `$${wartoscTex("f", k)} =$`, w, `$${wartoscTex("f", k)} = ${w.tex()}$`, tresc, kroki);
  }
}

/** Argument, dla którego funkcja liniowa przyjmuje daną wartość. */
function argumentLiniowej(r) {
  for (;;) {
    const a = r.intBez(-5, 5, 0), b = r.int(-9, 9), v = r.int(-12, 12);
    const x0 = q(v - b, a);
    if (x0.d > 4 || x0.zero) continue;
    const wzor = wielomianTex([a, b]);
    const tresc = r.pick([
      `Funkcja liniowa $f$ jest określona wzorem $f(x) = ${wzor}$. Dla jakiego argumentu funkcja $f$ przyjmuje wartość $${v}$?`,
      `Oblicz argument, dla którego wartość funkcji $f(x) = ${wzor}$ jest równa $${v}$.`,
    ]);
    return jednoPole("x", "$x =$", x0, `$x = ${x0.tex()}$`, tresc, [
      `Przyrównujemy wzór funkcji do danej wartości: $${wzor} = ${v}$.`,
      `$${sumaTex([[a, "x"]])} = ${v - b}$, więc $x = ${x0.tex()}$.`,
    ]);
  }
}

/** Dwa argumenty, dla których funkcja kwadratowa przyjmuje daną wartość. */
function dwaArgumenty(r) {
  for (;;) {
    const a = r.pick([1, 1, -1, 2, -2, 3]);
    const x1 = r.int(-6, 6), x2 = r.intBez(-6, 6, x1);
    const b = -a * (x1 + x2), c = r.int(-9, 9), c0 = a * x1 * x2, v = c - c0;
    if (Math.abs(b) > 14 || v === 0 || Math.abs(v) > 40) continue;
    const D = b * b - 4 * a * c0, s = Math.abs(a * (x1 - x2));
    const [u, w] = x1 < x2 ? [x1, x2] : [x2, x1];
    const tresc = r.pick([
      `Dana jest funkcja kwadratowa $f(x) = ${wielomianTex([a, b, c])}$. Oblicz wszystkie argumenty, dla których funkcja $f$ przyjmuje wartość $${v}$.`,
      `Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ${wielomianTex([a, b, c])}$. Dla jakich argumentów wartość funkcji $f$ jest równa $${v}$?`,
    ]);
    return {
      tresc,
      pola: [{ id: "x", typ: "zbior", ile: 2, etykieta: "Argumenty" }],
      odpowiedz: { x: [u, w] },
      wynik: `$x = ${u}$ lub $x = ${w}$`,
      rozwiazanie: [
        `$f(x) = ${v}$, czyli $${wielomianTex([a, b, c])} = ${v}$, więc $${wielomianTex([a, b, c0])} = 0$.`,
        `$\\Delta = ${potegaTex(b, 2)} - 4 \\cdot ${texNawias(a)} \\cdot ${texNawias(c0)} = ${D}$, $\\sqrt{\\Delta} = ${s}$.`,
        `$x = \\frac{${-b} - ${s}}{${2 * a}} = ${q(-b - s, 2 * a).tex()}$ lub $x = \\frac{${-b} + ${s}}{${2 * a}} = ${q(-b + s, 2 * a).tex()}$.`,
      ],
    };
  }
}

/** Parametr z punktu wykresu albo z miejsca zerowego (CKE 2023, zad. 12; 2026, zad. 11) i z warunku f(a) = v. */
function parametrZWarunku(r) {
  const rodzaj = r.pick(["punkt", "zerowe", "ulamek"]);
  if (rodzaj === "ulamek") return parametrWUlamku(r);
  const L = r.pick(["m", "k"]);
  for (;;) {
    const a = r.pick([1, 1, -1, 2, -2, 3]), m = r.intBez(-6, 6, 0), x0 = r.intBez(-4, 4, 0);
    let c, y0;
    if (rodzaj === "zerowe") {
      c = -(a * x0 * x0 + m * x0);
      y0 = 0;
      if (c === 0 || Math.abs(c) > 30) continue;
    } else {
      c = r.int(-9, 9);
      y0 = a * x0 * x0 + m * x0 + c;
      if (Math.abs(y0) > 40) continue;
    }
    const wzor = sumaTex([[a, "x^{2}"], [1, `${L}x`], [c, ""]]);
    const stala = a * x0 * x0 + c;
    const czlonA = a === 1 ? potegaTex(x0, 2) : `${a} \\cdot ${potegaTex(x0, 2)}`;
    const cTxt = c ? ` ${plusMinus(c)}` : "";
    const tresc = rodzaj === "zerowe"
      ? r.pick([
        `Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ${wzor}$, gdzie $${L}$ jest pewną liczbą rzeczywistą. Liczba $${texNawias(x0)}$ jest miejscem zerowym funkcji $f$. Oblicz $${L}$.`,
        `Jednym z miejsc zerowych funkcji $f(x) = ${wzor}$ jest liczba $${texNawias(x0)}$. Oblicz $${L}$.`,
      ])
      : r.pick([
        `Wykres funkcji $f(x) = ${wzor}$ przechodzi przez punkt $P = ${punktTex(x0, y0)}$. Oblicz $${L}$.`,
        `Punkt $P = ${punktTex(x0, y0)}$ należy do wykresu funkcji $f$ określonej wzorem $f(x) = ${wzor}$. Wyznacz $${L}$.`,
        `Funkcja $f(x) = ${wzor}$ spełnia warunek $${wartoscTex("f", x0)} = ${y0}$. Oblicz $${L}$.`,
      ]);
    return jednoPole(L, `$${L} =$`, m, `$${L} = ${m}$`, tresc, [
      rodzaj === "zerowe"
        ? `Liczba $${texNawias(x0)}$ jest miejscem zerowym, więc $${wartoscTex("f", x0)} = 0$.`
        : `Punkt $P$ leży na wykresie, więc $${wartoscTex("f", x0)} = ${y0}$.`,
      `$${czlonA} + ${L} \\cdot ${texNawias(x0)}${cTxt} = ${y0}$, czyli $${sumaTex([[x0, L], [stala, ""]])} = ${y0}$.`,
      `Stąd $${L} = ${m}$.`,
    ]);
  }
}

/** f(x) = (x - k)/(x^2 + h) i f(x0) = v -> k (CKE 2023, zad. 12). */
function parametrWUlamku(r) {
  const L = r.pick(["k", "m"]);
  for (;;) {
    const x0 = r.pick([1, 2, 3, -1, -2]), h = r.pick([1, 1, 2, 3]), v = r.pick([-2, -1, 1, 1, 2, 3]);
    const mian = x0 * x0 + h;
    const m = x0 - v * mian;
    if (m === 0 || Math.abs(m) > 20) continue;
    const wzor = `\\frac{x - ${L}}{${wielomianTex([1, 0, h])}}`;
    const tresc = r.pick([
      `Funkcja $f$ jest określona dla każdej liczby rzeczywistej $x$ wzorem $f(x) = ${wzor}$, gdzie $${L}$ jest pewną liczbą rzeczywistą. Funkcja spełnia warunek $${wartoscTex("f", x0)} = ${v}$. Oblicz $${L}$.`,
      `Dana jest funkcja $f(x) = ${wzor}$ określona dla wszystkich liczb rzeczywistych. Wiadomo, że $${wartoscTex("f", x0)} = ${v}$. Oblicz wartość współczynnika $${L}$.`,
    ]);
    return jednoPole(L, `$${L} =$`, m, `$${L} = ${m}$`, tresc, [
      `$${wartoscTex("f", x0)} = \\frac{${x0} - ${L}}{${mian}}$, a z warunku zadania ta wartość jest równa $${v}$.`,
      `$\\frac{${x0} - ${L}}{${mian}} = ${v}$, więc $${x0} - ${L} = ${v * mian}$.`,
      `Stąd $${L} = ${m}$.`,
    ]);
  }
}

/** Który zbiór par jest funkcją (pierwsza liczba w parze to argument). */
function zbiorParFunkcja(r) {
  for (;;) {
    const xs = r.shuffle([0, 1, 2, 3, 4, 5, 6]).slice(0, 3);
    const y = r.int(1, 7);
    const ys = r.chance(0.6) ? [y, y, r.int(1, 7)] : [r.int(1, 7), r.int(1, 7), r.int(1, 7)];
    const dobry = r.shuffle(xs.map((x, i) => [x, ys[i]]));
    const zle = [];
    for (let i = 0; i < 3; i++) {
      const u = r.int(0, 6), w = r.intBez(0, 6, u);
      const y1 = r.int(1, 7), y2 = r.intBez(1, 7, y1), y3 = r.int(1, 7);
      zle.push(r.shuffle([[u, y1], [w, y3], [u, y2]]));
    }
    const teksty = [zbiorParTex(dobry), ...zle.map(zbiorParTex)];
    if (new Set(teksty).size < 4) continue;
    const kolej = r.shuffle([0, 1, 2, 3]);
    return {
      tresc: "Pierwsza liczba w parze jest argumentem, a druga – wartością funkcji. Który z podanych zbiorów par jest funkcją?",
      pola: [{ id: "z", typ: "wybor", etykieta: "Zbiór par", opcje: kolej.map((i) => `$${teksty[i]}$`) }],
      odpowiedz: { z: kolej.indexOf(0) },
      wynik: `$${teksty[0]}$`,
      rozwiazanie: [
        "Funkcja każdemu argumentowi przyporządkowuje dokładnie jedną wartość, więc ta sama pierwsza liczba nie może wystąpić w dwóch parach z różnymi drugimi liczbami.",
        `W zbiorze $${teksty[0]}$ pierwsze liczby są różne: ${xs.map((x) => `$${x}$`).join(", ")}. To jest funkcja.`,
        "W każdym z pozostałych zbiorów któraś pierwsza liczba występuje dwa razy z różnymi drugimi liczbami.",
      ],
    };
  }
}

function dziedzinaPrzesuniecia(r) {
  const wariant = r.pick(["ulamek", "ulamek", "pierwiastek", "pierwiastek", "punkt", "punkt", "zerowe", "wartosc"]);
  if (wariant === "ulamek") return dziedzinaUlamek(r);
  if (wariant === "pierwiastek") return dziedzinaPierwiastek(r);
  if (wariant === "punkt") return przesunieciePunktu(r);
  if (wariant === "zerowe") return zerowaPrzesunietej(r);
  return wartoscPrzesunietej(r);
}

/** Liczby spoza dziedziny funkcji wymiernej (mianownik liniowy albo kwadratowy). */
function dziedzinaUlamek(r) {
  if (r.chance(0.5)) {
    for (;;) {
      const c = r.pick([1, 1, 2, 3]), d = r.intBez(-9, 9, 0);
      const p = q(d, c);
      const n = r.int(1, 7), pierwszy = r.chance(0.5);
      const m = r.intBez(-6, 6, 0);
      if (!pierwszy && p.add(m).zero) continue;      // licznik nie może się skrócić z mianownikiem
      const licznik = pierwszy ? String(n) : wielomianTex([1, m]);
      const mian = wielomianTex([c, -d]);
      const wzor = `\\frac{${licznik}}{${mian}}`;
      const tresc = r.pick([
        `Jakiej liczby nie można wstawić w miejsce $x$ do wzoru funkcji $f(x) = ${wzor}$?`,
        `Która liczba nie należy do dziedziny funkcji $f(x) = ${wzor}$?`,
      ]);
      return jednoPole("x", "$x =$", p, `$x = ${p.tex()}$`, tresc, [
        `Mianownik nie może być równy zero: $${mian} = 0$.`,
        c === 1 ? `Stąd $x = ${p.tex()}$.` : `$${sumaTex([[c, "x"]])} = ${d}$, więc $x = ${p.tex()}$.`,
        `Do dziedziny nie należy liczba $${p.tex()}$.`,
      ]);
    }
  }
  const u = r.int(-6, 6), v = r.intBez(-6, 6, u);
  const b = -(u + v), c = u * v;
  const mian = wielomianTex([1, b, c]);
  const licznik = r.chance(0.5) ? String(r.int(1, 7)) : wielomianTex([1, r.intBez(-6, 6, -u, -v)]);
  const [x1, x2] = u < v ? [u, v] : [v, u];
  return {
    tresc: `Wyznacz wszystkie liczby, które nie należą do dziedziny funkcji $f(x) = \\frac{${licznik}}{${mian}}$.`,
    pola: [{ id: "x", typ: "zbior", ile: 2, etykieta: "Liczby spoza dziedziny" }],
    odpowiedz: { x: [x1, x2] },
    wynik: `$x = ${x1}$ lub $x = ${x2}$`,
    rozwiazanie: [
      `Mianownik nie może być równy zero: $${mian} = 0$.`,
      `$\\Delta = ${potegaTex(b, 2)} - 4 \\cdot ${texNawias(c)} = ${(u - v) ** 2}$, $\\sqrt{\\Delta} = ${Math.abs(u - v)}$, więc $x = ${x1}$ lub $x = ${x2}$.`,
      `Do dziedziny nie należą liczby $${x1}$ i $${x2}$.`,
    ],
  };
}

/** Dziedzina funkcji z pierwiastkiem (także w mianowniku): wybór przedziału. */
function dziedzinaPierwiastek(r) {
  for (;;) {
    const a = r.pick([1, 2, 3, -1, -2, -3]), b = r.intBez(-9, 9, 0);
    const p = q(-b, a);
    if (p.zero) continue;
    const wMianowniku = r.chance(0.3);
    const dom = !wMianowniku;
    const poprawna = a > 0 ? odLiczby(p, dom) : doLiczby(p, dom);
    const inne = a > 0
      ? [odLiczby(p, !dom), doLiczby(p, dom), odLiczby(p.neg(), dom)]
      : [doLiczby(p, !dom), odLiczby(p, dom), doLiczby(p.neg(), dom)];
    const kolej = r.shuffle([0, 1, 2, 3]);
    const teksty = [poprawna, ...inne];
    const pod = wielomianTex([a, b]);
    const wzor = wMianowniku ? `\\frac{1}{\\sqrt{${pod}}}` : `\\sqrt{${pod}}`;
    const znak = wMianowniku ? ">" : "\\geq";
    const tresc = r.pick([
      `Jaka jest dziedzina funkcji $f(x) = ${wzor}$?`,
      `Wskaż dziedzinę funkcji $f(x) = ${wzor}$.`,
    ]);
    const dziel = Math.abs(a) === 1 ? "" : ` Dzielimy obie strony przez $${a}$${a < 0 ? " i zmieniamy zwrot nierówności" : ""}.`;
    return {
      tresc,
      pola: [{ id: "d", typ: "wybor", etykieta: "Dziedzina", opcje: kolej.map((i) => `$${teksty[i]}$`) }],
      odpowiedz: { d: kolej.indexOf(0) },
      wynik: `$D = ${poprawna}$`,
      rozwiazanie: [
        wMianowniku
          ? `Pierwiastek stoi w mianowniku, więc wyrażenie pod pierwiastkiem ma być dodatnie: $${pod} > 0$.`
          : `Wyrażenie pod pierwiastkiem ma być nieujemne: $${pod} \\geq 0$.`,
        `$${sumaTex([[a, "x"]])} ${znak} ${-b}$.${dziel}`,
        `Stąd $x ${a > 0 ? znak : (wMianowniku ? "<" : "\\leq")} ${p.tex()}$, czyli dziedziną jest zbiór $${poprawna}$.`,
      ],
    };
  }
}

/** Punkt wykresu funkcji g po przesunięciu o wektor albo odbiciu wykresu funkcji f. */
function przesunieciePunktu(r) {
  const rodzaj = r.pick(["wektor", "wektor", "Ox", "Oy"]);
  const x = r.intBez(-6, 6, 0), y = r.intBez(-6, 6, 0);
  let opis, bx, by, regula;
  if (rodzaj === "wektor") {
    const dx = r.intBez(-5, 5, 0), dy = r.intBez(-5, 5, 0);
    opis = `przesuwając wykres funkcji $f$ o wektor $[${dx}, ${dy}]$`;
    bx = x + dx;
    by = y + dy;
    regula = `Przesunięcie o wektor $[${dx}, ${dy}]$ dodaje $${texNawias(dx)}$ do pierwszej i $${texNawias(dy)}$ do drugiej współrzędnej każdego punktu.`;
  } else if (rodzaj === "Ox") {
    opis = "odbijając wykres funkcji $f$ względem osi $Ox$";
    bx = x;
    by = -y;
    regula = "Odbicie względem osi $Ox$ zmienia znak drugiej współrzędnej punktu.";
  } else {
    opis = "odbijając wykres funkcji $f$ względem osi $Oy$";
    bx = -x;
    by = y;
    regula = "Odbicie względem osi $Oy$ zmienia znak pierwszej współrzędnej punktu.";
  }
  return {
    tresc: `Punkt $A = ${punktTex(x, y)}$ należy do wykresu funkcji $f$. Wykres funkcji $g$ otrzymano, ${opis}. Podaj współrzędne punktu $B$ wykresu funkcji $g$, który powstał z punktu $A$.`,
    pola: [{ id: "x", typ: "liczba", etykieta: "$x_{B} =$" }, { id: "y", typ: "liczba", etykieta: "$y_{B} =$" }],
    odpowiedz: { x: q(bx), y: q(by) },
    wynik: `$B = ${punktTex(bx, by)}$`,
    rozwiazanie: [regula, `$B = ${punktTex(bx, by)}$.`],
  };
}

/** Miejsca zerowe funkcji kwadratowej przesuniętej w prawo albo w lewo. */
function zerowaPrzesunietej(r) {
  for (;;) {
    const a = r.pick([1, 1, -1, 2]);
    const u = r.int(-5, 5), v = r.intBez(-5, 5, u);
    const p = r.int(2, 7), wPrawo = r.chance();
    const b = -a * (u + v), c = a * u * v;
    const [x1, x2] = u < v ? [u, v] : [v, u];
    const przes = wPrawo ? p : -p;
    const tresc = `Wykres funkcji kwadratowej $f(x) = ${wielomianTex([a, b, c])}$ przesunięto o $${p}$ ${jednostek(p)} w ${wPrawo ? "prawo" : "lewo"} i otrzymano wykres funkcji $g$. Oblicz miejsca zerowe funkcji $g$.`;
    return {
      tresc,
      pola: [{ id: "x", typ: "zbior", ile: 2, etykieta: "Miejsca zerowe funkcji $g$" }],
      odpowiedz: { x: [x1 + przes, x2 + przes] },
      wynik: `$x = ${x1 + przes}$ lub $x = ${x2 + przes}$`,
      rozwiazanie: [
        `Miejsca zerowe funkcji $f$: $\\Delta = ${potegaTex(b, 2)} - 4 \\cdot ${texNawias(a)} \\cdot ${texNawias(c)} = ${(a * (u - v)) ** 2}$, $\\sqrt{\\Delta} = ${Math.abs(a * (u - v))}$, więc $x = ${x1}$ lub $x = ${x2}$.`,
        `Przesunięcie w ${wPrawo ? "prawo" : "lewo"} o $${p}$ ${wPrawo ? "zwiększa" : "zmniejsza"} każde miejsce zerowe o $${p}$.`,
        `Miejsca zerowe funkcji $g$: $${x1} ${plusMinus(przes)} = ${x1 + przes}$ oraz $${x2} ${plusMinus(przes)} = ${x2 + przes}$.`,
      ],
    };
  }
}

/** g(x) = f(x - p) + q po przesunięciu o wektor [p, q]: wartość g w punkcie. */
function wartoscPrzesunietej(r) {
  for (;;) {
    const a = r.pick([1, 1, -1, 2]), b = r.int(-4, 4), c = r.int(-6, 6);
    const dx = r.intBez(-4, 4, 0), dy = r.intBez(-4, 4, 0), x0 = r.int(-3, 4);
    const arg = x0 - dx;
    const f = a * arg * arg + b * arg + c, g = f + dy;
    if (Math.abs(f) > 40) continue;
    const kierunek = `o $${Math.abs(dx)}$ w ${dx > 0 ? "prawo" : "lewo"} i o $${Math.abs(dy)}$ w ${dy > 0 ? "górę" : "dół"}`;
    const tresc = `Wykres funkcji $f(x) = ${wielomianTex([a, b, c])}$ przesunięto o wektor $[${dx}, ${dy}]$ i otrzymano wykres funkcji $g$. Oblicz $${wartoscTex("g", x0)}$.`;
    return jednoPole("w", `$${wartoscTex("g", x0)} =$`, g, `$${wartoscTex("g", x0)} = ${g}$`, tresc, [
      `Przesunięcie o wektor $[${dx}, ${dy}]$ to przesunięcie ${kierunek}, więc $g(x) = f(x ${plusMinus(-dx)}) ${plusMinus(dy)}$.`,
      `$${wartoscTex("g", x0)} = f(${x0} ${plusMinus(-dx)}) ${plusMinus(dy)} = ${wartoscTex("f", arg)} ${plusMinus(dy)}$.`,
      `$${wartoscTex("f", arg)} = ${podstawTex([a, b, c], arg)} = ${f}$, więc $${wartoscTex("g", x0)} = ${f} ${plusMinus(dy)} = ${g}$.`,
    ]);
  }
}

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

// --- Inne funkcje: proporcjonalność odwrotna, funkcja wykładnicza i logarytmiczna

/** „przejazd trwa 3 godziny”, „trwa 5 godzin”. */
const godzin = (n) => ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? "godziny" : "godzin");

/** Wzór a/x: hiperbolaProsta(12) -> "\frac{12}{x}", hiperbolaProsta(-4) -> "-\frac{4}{x}". */
const hiperbolaProsta = (a) => `${a < 0 ? "-" : ""}\\frac{${Math.abs(a)}}{x}`;

function proporcjonalnoscOdwrotna(r) {
  const wariant = r.pick(["wspolczynnik", "wspolczynnik", "wartosc", "wartosc", "cwiartki", "punkt"]);
  if (wariant === "wspolczynnik") return wspolczynnikHiperboli(r);
  if (wariant === "wartosc") return wartoscOdwrotnie(r);
  if (wariant === "cwiartki") return cwiartkiHiperboli(r);
  return punktNaHiperboli(r);
}

/** Liczba a w y = a/x z punktu wykresu. */
function wspolczynnikHiperboli(r) {
  for (;;) {
    const x0 = r.intBez(-6, 6, 0), y0 = r.intBez(-8, 8, 0), a = x0 * y0;
    if (Math.abs(a) > 36) continue;
    const tresc = r.pick([
      `Wykres funkcji $f(x) = \\frac{a}{x}$ przechodzi przez punkt $P = ${punktTex(x0, y0)}$. Oblicz $a$.`,
      `Punkt $P = ${punktTex(x0, y0)}$ należy do hiperboli o równaniu $y = \\frac{a}{x}$. Oblicz $a$.`,
    ]);
    return jednoPole("a", "$a =$", a, `$a = ${a}$`, tresc, [
      `Współrzędne punktu $P$ spełniają równanie: $${y0} = \\frac{a}{${x0}}$.`,
      `Stąd $a = x \\cdot y = ${texNawias(x0)} \\cdot ${texNawias(y0)} = ${a}$.`,
    ]);
  }
}

/** Wielkości odwrotnie proporcjonalne: nowa wartość y (abstrakcyjnie albo czas przejazdu). */
function wartoscOdwrotnie(r) {
  if (r.chance(0.5)) {
    for (;;) {
      const x1 = r.int(2, 9), y1 = r.int(2, 12), a = x1 * y1;
      const mozliwe = [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36].filter((d) => a % d === 0 && d !== x1);
      if (!mozliwe.length) continue;
      const x2 = r.pick(mozliwe), y2 = a / x2;
      return jednoPole("y", "$y =$", y2, `$y = ${y2}$`,
        `Wielkości $x$ i $y$ są odwrotnie proporcjonalne. Gdy $x = ${x1}$, to $y = ${y1}$. Oblicz $y$, gdy $x = ${x2}$.`, [
          `Iloczyn $x \\cdot y$ jest stały: $${x1} \\cdot ${y1} = ${a}$.`,
          `Zatem $${x2} \\cdot y = ${a}$, czyli $y = ${y2}$.`,
        ]);
    }
  }
  for (;;) {
    const t1 = r.int(2, 6), v1 = r.pick([40, 50, 60, 75, 80, 90, 100, 120]), s = v1 * t1;
    const mozliwe = [40, 50, 60, 75, 80, 90, 100, 120].filter((v) => s % v === 0 && v !== v1 && s / v <= 12);
    if (!mozliwe.length) continue;
    const v2 = r.pick(mozliwe), t2 = s / v2;
    return jednoPole("t", "Czas (w godzinach)", t2, `$${t2}$ godz.`,
      `Czas przejazdu trasy jest odwrotnie proporcjonalny do średniej prędkości samochodu. Przy średniej prędkości $${v1}$ km/h przejazd trwa $${t1}$ ${godzin(t1)}. Ile godzin potrwa przejazd tej samej trasy przy średniej prędkości $${v2}$ km/h?`, [
        `Iloczyn prędkości i czasu jest stały (to długość trasy): $${v1} \\cdot ${t1} = ${s}$ km.`,
        `Przy prędkości $${v2}$ km/h czas wynosi $t = \\frac{${s}}{${v2}} = ${t2}$ godz.`,
      ]);
  }
}

/** W których ćwiartkach leży hiperbola (znak liczby a). */
function cwiartkiHiperboli(r) {
  const a = r.intBez(-9, 9, 0);
  const nazwy = ["I i III", "II i IV", "I i II", "III i IV"];
  const poprawna = a > 0 ? 0 : 1;
  const kolej = r.shuffle([0, 1, 2, 3]);
  return {
    tresc: `W których ćwiartkach układu współrzędnych leży wykres funkcji $f(x) = ${hiperbolaProsta(a)}$?`,
    pola: [{ id: "c", typ: "wybor", etykieta: "Ćwiartki", opcje: kolej.map((i) => nazwy[i]) }],
    odpowiedz: { c: kolej.indexOf(poprawna) },
    wynik: `ćwiartki ${nazwy[poprawna]}`,
    rozwiazanie: [
      "Dla $a > 0$ wykres leży w ćwiartkach I i III (prawa góra i lewy dół), a dla $a < 0$ – w ćwiartkach II i IV (lewa góra i prawy dół).",
      `Tu $a = ${a}$, więc liczba $a$ jest ${a > 0 ? "dodatnia" : "ujemna"} i wykres leży w ćwiartkach ${nazwy[poprawna]}.`,
    ],
  };
}

/** Który punkt leży na hiperboli (iloczyn współrzędnych równy a). */
function punktNaHiperboli(r) {
  for (;;) {
    const x1 = r.intBez(-6, 6, 0), y1 = r.intBez(-8, 8, 0), a = x1 * y1;
    if (Math.abs(a) > 36) continue;
    const zle = [];
    for (const [x, y] of [[-x1, y1], [x1, a * x1], [x1, a - x1], [x1, -y1]]) {
      if (x * y === a || zle.some(([u, v]) => u === x && v === y)) continue;
      zle.push([x, y]);
    }
    if (zle.length < 3) continue;
    const punkty = [[x1, y1], ...zle.slice(0, 3)];
    const kolej = r.shuffle([0, 1, 2, 3]);
    return {
      tresc: `Który z podanych punktów należy do wykresu funkcji $f(x) = ${hiperbolaProsta(a)}$?`,
      pola: [{ id: "p", typ: "wybor", etykieta: "Punkt", opcje: kolej.map((i) => `$${punktTex(...punkty[i])}$`) }],
      odpowiedz: { p: kolej.indexOf(0) },
      wynik: `$${punktTex(x1, y1)}$`,
      rozwiazanie: [
        `Punkt leży na wykresie, gdy iloczyn jego współrzędnych jest równy $a = ${a}$.`,
        `Dla punktu $${punktTex(x1, y1)}$: $${texNawias(x1)} \\cdot ${texNawias(y1)} = ${a}$.`,
        "W pozostałych punktach iloczyn współrzędnych jest inny.",
      ],
    };
  }
}

const PODSTAWY = [[2, 1], [3, 1], [4, 1], [5, 1], [1, 2], [1, 3], [1, 4], [2, 3], [3, 2]];

/** Kontekst wzrostu wykładniczego: co godzinę liczba rośnie a razy. */
const WZROSTY = [
  { a: 2, start: (n) => `Na początku liczba bakterii w hodowli wynosi $${n}$. Co godzinę liczba bakterii podwaja się.`,
    podmiot: "liczba bakterii w hodowli", N0: [5, 6, 8, 10, 12, 15, 20, 25, 40, 50] },
  { a: 3, start: (n) => `Na początku liczba zainfekowanych komputerów w sieci wynosi $${n}$. Co godzinę liczba zainfekowanych komputerów potraja się.`,
    podmiot: "liczba zainfekowanych komputerów", N0: [5, 6, 8, 10, 15, 20] },
];

function wykladniczaILog(r) {
  const rodzaj = r.pick(["wykladnicza", "wykladnicza", "kontekst", "kontekst", "logarytm", "logarytm"]);
  if (rodzaj === "wykladnicza") return r.pick([podstawaZPunktu, wartoscWykladniczej, monotonicznoscWykladniczej])(r);
  if (rodzaj === "kontekst") return r.pick([wzrostWykladniczy, rozpadPolowkowy])(r);
  return r.pick([wartoscLogarytmu, przesunietyLogarytm])(r);
}

/** Podstawa funkcji wykładniczej z punktu wykresu. */
function podstawaZPunktu(r) {
  for (;;) {
    const a = q(...r.pick(PODSTAWY)), x0 = r.pick([2, 2, 3, 4]);
    const y0 = a.pow(x0);
    if (y0.n > 700 || y0.d > 700) continue;
    const tresc = r.pick([
      `Wykres funkcji wykładniczej $f(x) = a^{x}$ przechodzi przez punkt $P = ${punktTex(x0, y0)}$. Oblicz $a$.`,
      `Punkt $P = ${punktTex(x0, y0)}$ należy do wykresu funkcji $f(x) = a^{x}$, gdzie $a > 0$ i $a \\neq 1$. Oblicz $a$.`,
    ]);
    return jednoPole("a", "$a =$", a, `$a = ${a.tex()}$`, tresc, [
      `Współrzędne punktu $P$ spełniają wzór funkcji: $a^{${x0}} = ${y0.tex()}$.`,
      `Ponieważ $${potegaTex(a, x0)} = ${y0.tex()}$, a podstawa jest dodatnia, to $a = ${a.tex()}$.`,
    ]);
  }
}

/** Wartość f(x) = c·a^x + d dla ujemnego albo dodatniego argumentu. */
function wartoscWykladniczej(r) {
  for (;;) {
    const a = q(...r.pick(PODSTAWY)), x0 = r.pick([-3, -2, -1, 1, 2, 3, 4]);
    const c = r.pick([1, 1, 2, 3, 4, 5]), d = r.pick([0, 0, -2, 1, 3, -5]);
    const pot = a.pow(x0), w = pot.mul(c).add(d);
    if (w.d > 12 || Math.abs(w.valueOf()) > 500) continue;
    const dTxt = d ? ` ${plusMinus(d)}` : "";
    const cTxt = c === 1 ? "" : `${c} \\cdot `;
    const wzor = `${cTxt}${potegaTex(a, 1)}^{x}${dTxt}`;
    const tresc = r.pick([
      `Funkcja wykładnicza $f$ jest określona wzorem $f(x) = ${wzor}$. Oblicz $${wartoscTex("f", x0)}$.`,
      `Dana jest funkcja $f(x) = ${wzor}$. Oblicz wartość tej funkcji dla argumentu $${texNawias(x0)}$.`,
    ]);
    return jednoPole("w", `$${wartoscTex("f", x0)} =$`, w, `$${wartoscTex("f", x0)} = ${w.tex()}$`, tresc, [
      `Podstawiamy $x = ${x0}$: $${wartoscTex("f", x0)} = ${cTxt}${potegaTex(a, x0)}${dTxt}$.`,
      `Potęga: $${potegaTex(a, x0)} = ${pot.tex()}$.`,
      `$${wartoscTex("f", x0)} = ${cTxt}${pot.tex()}${dTxt} = ${w.tex()}$.`,
    ]);
  }
}

/** Która funkcja wykładnicza jest rosnąca (albo malejąca): podstawa większa od 1 albo z przedziału (0, 1). */
function monotonicznoscWykladniczej(r) {
  const WIEKSZE = [[2, 1], [3, 1], [4, 1], [5, 1], [3, 2], [4, 3], [5, 2], [5, 3]];
  const MNIEJSZE = [[1, 2], [1, 3], [1, 4], [1, 5], [2, 3], [3, 4], [2, 5], [3, 5]];     // odwrotności kolejnych liczb z WIEKSZE
  const rosnaca = r.chance();
  const i = r.int(0, 7);
  const inne = r.shuffle([0, 1, 2, 3, 4, 5, 6, 7].filter((j) => j !== i)).slice(0, 2);
  const [dobra, odwrotna, reszta] = rosnaca
    ? [WIEKSZE[i], MNIEJSZE[i], inne.map((j) => MNIEJSZE[j])]
    : [MNIEJSZE[i], WIEKSZE[i], inne.map((j) => WIEKSZE[j])];
  const podstawy = [dobra, odwrotna, ...reszta].map((b) => q(...b));
  const kolej = r.shuffle([0, 1, 2, 3]);
  const opcja = (b) => `$f(x) = ${potegaTex(b, 1)}^{x}$`;
  return {
    tresc: `Która z podanych funkcji jest ${rosnaca ? "rosnąca" : "malejąca"}?`,
    pola: [{ id: "f", typ: "wybor", etykieta: "Funkcja", opcje: kolej.map((j) => opcja(podstawy[j])) }],
    odpowiedz: { f: kolej.indexOf(0) },
    wynik: opcja(podstawy[0]),
    rozwiazanie: [
      "Funkcja wykładnicza $f(x) = a^{x}$ rośnie, gdy $a > 1$, a maleje, gdy $0 < a < 1$.",
      `Podstawa $${podstawy[0].tex()}$ jest ${rosnaca ? "większa od $1$" : "liczbą z przedziału $(0, 1)$"}, więc funkcja $${opcja(podstawy[0]).slice(1, -1)}$ jest ${rosnaca ? "rosnąca" : "malejąca"}.`,
      `Pozostałe podstawy są ${rosnaca ? "mniejsze od $1$" : "większe od $1$"}, więc tamte funkcje są ${rosnaca ? "malejące" : "rosnące"}.`,
    ],
  };
}

/** Wzrost wykładniczy: liczba po t godzinach. */
function wzrostWykladniczy(r) {
  const k = r.pick(WZROSTY), n0 = r.pick(k.N0), t = r.int(2, k.a === 2 ? 6 : 4);
  const wynik = n0 * k.a ** t;
  return jednoPole("N", `$N(${t}) =$`, wynik, `$${wynik}$`,
    `${k.start(n0)} Jaka będzie ${k.podmiot} po $${t}$ godzinach?`, [
      `Co godzinę liczba mnoży się przez $${k.a}$, więc po $${t}$ godzinach $N = ${n0} \\cdot ${k.a}^{${t}}$.`,
      `$${k.a}^{${t}} = ${k.a ** t}$, więc $N = ${n0} \\cdot ${k.a ** t} = ${wynik}$.`,
    ]);
}

/** Połowa substancji znika co T dni: ile zostanie po t dniach. */
function rozpadPolowkowy(r) {
  const T = r.pick([2, 3, 4, 5, 6]), m = r.int(2, 4);
  const n0 = 2 ** m * r.int(2, 15), t = T * m, wynik = n0 / 2 ** m;
  return jednoPole("N", "Masa (w gramach)", wynik, `$${wynik}$ g`,
    `Masa próbki pewnego izotopu wynosi na początku $${n0}$ g. Co $${T}$ dni masa próbki zmniejsza się o połowę. Ile gramów izotopu zostanie w próbce po $${t}$ dniach?`, [
      `Czas upływu dzielimy przez czas zmniejszenia o połowę: $\\frac{${t}}{${T}} = ${m}$.`,
      `$N = ${n0} \\cdot \\left(\\frac{1}{2}\\right)^{${m}} = ${n0} \\cdot \\frac{1}{${2 ** m}} = ${wynik}$.`,
    ]);
}

/** Wartość logarytmu z potęgi podstawy. */
function wartoscLogarytmu(r) {
  for (;;) {
    const a = q(...r.pick([[2, 1], [2, 1], [3, 1], [4, 1], [5, 1], [10, 1], [1, 2], [1, 3]]));
    const k = r.pick([-3, -2, -1, 1, 2, 3, 4]);
    const x = a.pow(k);
    if (x.n > 1000 || x.d > 1000) continue;
    const wyr = `\\log_{${a.tex()}} ${x.tex()}`;
    return jednoPole("w", `$${wyr} =$`, k, `$${wyr} = ${k}$`, r.pick([`Oblicz $${wyr}$.`, `Oblicz wartość wyrażenia $${wyr}$.`]), [
      "Logarytm to wykładnik, do którego trzeba podnieść podstawę, żeby otrzymać daną liczbę: $\\log_{a} x = y$, gdy $a^{y} = x$.",
      k === 1
        ? `Podstawa w pierwszej potędze to ona sama, więc $${wyr} = 1$.`
        : `$${potegaTex(a, k)} = ${x.tex()}$, więc $${wyr} = ${k}$.`,
    ]);
  }
}

/** Funkcja f(x) = log_a(x - p) + q: asymptota pionowa, miejsce zerowe i wartość. */
function przesunietyLogarytm(r) {
  const rodzaj = r.pick(["asymptota", "zerowe", "zerowe", "wartosc"]);
  for (;;) {
    const a = r.pick([2, 2, 3]), p = r.intBez(-6, 6, 0), dq = r.pick([-3, -2, -1, 1, 2]);
    const pod = wielomianTex([1, -p]);
    const wzor = `\\log_{${a}}(${pod}) ${plusMinus(dq)}`;
    if (rodzaj === "asymptota") {
      return jednoPole("x", "$x =$", p, `$x = ${p}$`, r.pick([
        `Podaj równanie asymptoty pionowej wykresu funkcji $f(x) = ${wzor}$.`,
        `Wykres funkcji $f(x) = ${wzor}$ ma asymptotę pionową. Podaj jej równanie.`,
      ]), [
        `Wyrażenie pod logarytmem ma być dodatnie: $${pod} > 0$, czyli $x > ${p}$.`,
        `Wykres zbliża się do prostej, na której to wyrażenie jest równe zero: $x = ${p}$.`,
      ]);
    }
    if (rodzaj === "zerowe") {
      const wart = q(a).pow(-dq), x0 = wart.add(p);
      const potega = potLit(String(a), -dq);
      return jednoPole("x", "$x =$", x0, `$x = ${x0.tex()}$`, `Oblicz miejsce zerowe funkcji $f(x) = ${wzor}$.`, [
        `$f(x) = 0$, czyli $\\log_{${a}}(${pod}) = ${-dq}$.`,
        `Z definicji logarytmu: $${pod} = ${potega}${potega === wart.tex() ? "" : ` = ${wart.tex()}`}$.`,
        `Stąd $x = ${wart.tex()} ${plusMinus(p)} = ${x0.tex()}$. Liczba $${x0.tex()}$ należy do dziedziny, bo $${pod} = ${wart.tex()} > 0$.`,
      ]);
    }
    const k = r.pick([0, 2, 2, 3]), x0 = p + a ** k, w = k + dq;
    return jednoPole("w", `$${wartoscTex("f", x0)} =$`, w, `$${wartoscTex("f", x0)} = ${w}$`, `Dana jest funkcja $f(x) = ${wzor}$. Oblicz $${wartoscTex("f", x0)}$.`, [
      `$${wartoscTex("f", x0)} = \\log_{${a}}(${x0} ${plusMinus(-p)}) ${plusMinus(dq)} = \\log_{${a}} ${a ** k} ${plusMinus(dq)}$.`,
      `Ponieważ $${potLit(String(a), k)} = ${a ** k}$, to $\\log_{${a}} ${a ** k} = ${k}$.`,
      `$${wartoscTex("f", x0)} = ${k} ${plusMinus(dq)} = ${w}$.`,
    ]);
  }
}

// --- Funkcja homograficzna

/** a/(x - p) + q: hiperbolaTex(3, -2, -1) -> "\frac{3}{x + 2} - 1"; ujemne a: "-\frac{3}{x - 1} + 2". */
function hiperbolaTex(a, p, wq) {
  const A = Q.z(a);
  const ulamek = `\\frac{${A.ujemna ? A.neg().tex() : A.tex()}}{${wielomianTex([1, Q.z(p).neg()])}}`;
  return `${A.ujemna ? "-" : ""}${ulamek}${Q.z(wq).zero ? "" : ` ${plusMinus(wq)}`}`;
}

const POLA_ASYMPTOT = [
  { id: "x", typ: "liczba", etykieta: "Asymptota pionowa: $x =$" },
  { id: "y", typ: "liczba", etykieta: "Asymptota pozioma: $y =$" },
];

function homograficznaAsymptoty(r) {
  const wariant = r.pick(["kanoniczna", "doKanonicznej", "doKanonicznej", "ogolna", "wspolczynnik"]);
  if (wariant === "kanoniczna") return asymptotyZKanonicznej(r);
  if (wariant === "doKanonicznej") return homograficznaDoKanonicznej(r);
  if (wariant === "ogolna") return asymptotyZOgolnej(r);
  return wspolczynnikZAsymptot(r);
}

/** Asymptoty hiperboli zapisanej w postaci kanonicznej (uwaga na znak p). */
function asymptotyZKanonicznej(r) {
  const a = r.int(1, 6) * r.znak(), p = r.intBez(-6, 6, 0), wq = r.intBez(-6, 6, 0);
  const wzor = hiperbolaTex(a, p, wq);
  return {
    tresc: r.pick([
      `Wykres funkcji $f(x) = ${wzor}$ ma dwie asymptoty. Podaj ich równania.`,
      `Podaj równania asymptot hiperboli, która jest wykresem funkcji $f(x) = ${wzor}$.`,
    ]),
    pola: POLA_ASYMPTOT,
    odpowiedz: { x: q(p), y: q(wq) },
    wynik: `$x = ${p}$, $y = ${wq}$`,
    rozwiazanie: [
      "Porównujemy wzór ze wzorem postaci kanonicznej $f(x) = \\frac{a}{x - p} + q$.",
      p > 0
        ? `Mianownik jest postaci $x - ${p}$, więc $p = ${p}$, a wyraz wolny daje $q = ${wq}$.`
        : `Mianownik $x + ${-p}$ to $x - (${p})$, więc $p = ${p}$, a wyraz wolny daje $q = ${wq}$.`,
      `Asymptota pionowa: $x = ${p}$, pozioma: $y = ${wq}$.`,
    ],
  };
}

/** (αx + β)/(x - p) -> a/(x - p) + q (CKE: sprowadzanie do postaci kanonicznej). */
function homograficznaDoKanonicznej(r) {
  for (;;) {
    const al = r.intBez(-4, 4, 0), p = r.intBez(-5, 5, 0), be = r.intBez(-9, 9, 0);
    const a = al * p + be;
    if (a === 0 || Math.abs(a) > 20) continue;
    const licznik = sumaTex([[al, "x"], [be, ""]]), mian = wielomianTex([1, -p]);
    const kan = hiperbolaTex(a, p, al);
    return {
      tresc: `Funkcja $f$ jest określona wzorem $f(x) = \\frac{${licznik}}{${mian}}$. Zapisz wzór tej funkcji w postaci $f(x) = \\frac{a}{x - p} + q$ – podaj liczby $a$, $p$ i $q$.`,
      pola: [
        { id: "a", typ: "liczba", etykieta: "$a =$" },
        { id: "p", typ: "liczba", etykieta: "$p =$" },
        { id: "q", typ: "liczba", etykieta: "$q =$" },
      ],
      odpowiedz: { a: q(a), p: q(p), q: q(al) },
      wynik: `$f(x) = ${kan}$`,
      rozwiazanie: [
        `W liczniku wyodrębniamy mianownik: $${licznik} = ${wspTex(al)}(${mian}) ${plusMinus(a)}$.`,
        `Zatem $f(x) = ${al} + \\frac{${a}}{${mian}} = ${kan}$.`,
        `Stąd $a = ${a}$, $p = ${p}$, $q = ${al}$.`,
      ],
    };
  }
}

/** Asymptoty funkcji (αx + β)/(cx + d) przy c ≠ 1: wyłączamy współczynnik przy x w mianowniku. */
function asymptotyZOgolnej(r) {
  for (;;) {
    const c = r.pick([2, 3]), d = r.intBez(-7, 7, 0), k = r.intBez(-3, 3, 0), be = r.int(-9, 9);
    const al = c * k;                                   // iloraz α/c jest całkowity, jak w przykładzie z karty
    if (al * d - be * c === 0) continue;
    const px = q(-d, c), py = q(k);
    const reszta = q(be - k * d);
    const licznik = sumaTex([[al, "x"], [be, ""]]), mian = sumaTex([[c, "x"], [d, ""]]);
    return {
      tresc: r.pick([
        `Wykres funkcji $f(x) = \\frac{${licznik}}{${mian}}$ ma dwie asymptoty. Podaj ich równania.`,
        `Podaj równania asymptot hiperboli, która jest wykresem funkcji $f(x) = \\frac{${licznik}}{${mian}}$.`,
      ]),
      pola: POLA_ASYMPTOT,
      odpowiedz: { x: px, y: py },
      wynik: `$x = ${px.tex()}$, $y = ${py.tex()}$`,
      rozwiazanie: [
        `W liczniku wyodrębniamy mianownik: $${licznik} = ${wspTex(py)}(${mian}) ${plusMinus(reszta)}$.`,
        `Zatem $f(x) = ${k} + \\frac{${reszta.tex()}}{${mian}}$.`,
        `Asymptota pionowa: mianownik jest równy zero, $${mian} = 0$, czyli $x = ${px.tex()}$. Asymptota pozioma: $y = ${py.tex()}$.`,
      ],
    };
  }
}

/** Liczba a z asymptot i jednego punktu hiperboli. */
function wspolczynnikZAsymptot(r) {
  for (;;) {
    const p = r.intBez(-5, 5, 0), wq = r.intBez(-5, 5, 0);
    const dx = r.pick([1, 2, 3, -1, -2, -3]), dy = r.intBez(-6, 6, 0);
    const xm = p + dx, ym = wq + dy, a = dx * dy;
    if (Math.abs(xm) > 9 || Math.abs(ym) > 9 || Math.abs(a) > 24) continue;
    return jednoPole("a", "$a =$", a, `$a = ${a}$`,
      `Asymptotami wykresu funkcji $f(x) = \\frac{a}{x - p} + q$ są proste o równaniach $x = ${p}$ i $y = ${wq}$. Do wykresu należy punkt $M = ${punktTex(xm, ym)}$. Oblicz $a$.`, [
        `Z asymptot odczytujemy $p = ${p}$ i $q = ${wq}$, więc $f(x) = \\frac{a}{x ${plusMinus(-p)}} ${plusMinus(wq)}$.`,
        `Punkt $M$ leży na wykresie: $${ym} = \\frac{a}{${xm} - ${texNawias(p)}} ${plusMinus(wq)}$.`,
        `Stąd $\\frac{a}{${dx}} = ${ym} - ${texNawias(wq)} = ${dy}$, więc $a = ${dx} \\cdot ${texNawias(dy)} = ${a}$.`,
      ]);
  }
}

function homograficznaWlasnosci(r) {
  const wariant = r.pick(["zerowe", "przeciecie", "wartosc", "dziedzina", "dziedzina", "monotonicznosc"]);
  if (wariant === "dziedzina") return dziedzinaHomograficznej(r);
  if (wariant === "monotonicznosc") return monotonicznoscHomograficznej(r);
  return liczbaZHomograficznej(r, wariant);
}

/** Miejsce zerowe, punkt przecięcia z osią Oy albo wartość funkcji (αx + β)/(cx + d). */
function liczbaZHomograficznej(r, rodzaj) {
  for (;;) {
    const c = r.pick([1, 1, 2]), d = r.intBez(-7, 7, 0), al = r.intBez(-5, 5, 0), be = r.intBez(-9, 9, 0);
    if (al * d - be * c === 0) continue;
    const licznik = sumaTex([[al, "x"], [be, ""]]), mian = sumaTex([[c, "x"], [d, ""]]);
    const biegun = q(-d, c);
    const wzor = `\\frac{${licznik}}{${mian}}`;
    const okreslenie = `określona wzorem $f(x) = ${wzor}$ dla $x \\neq ${biegun.tex()}$`;
    if (rodzaj === "zerowe") {
      const x0 = q(-be, al);
      if (x0.d > 4) continue;
      return jednoPole("x", "$x =$", x0, `$x = ${x0.tex()}$`, r.pick([
        `Funkcja $f$ jest ${okreslenie}. Oblicz miejsce zerowe funkcji $f$.`,
        `Oblicz miejsce zerowe funkcji ${okreslenie}.`,
      ]), [
        `Ułamek jest równy zero, gdy licznik jest równy zero: $${licznik} = 0$.`,
        `Stąd $x = ${x0.tex()}$. Dla tej liczby mianownik jest równy $${q(c).mul(x0).add(d).tex()}$, czyli jest różny od zera.`,
      ]);
    }
    if (rodzaj === "przeciecie") {
      const y0 = q(be, d);
      if (y0.d > 7) continue;
      return jednoPole("y", "$y =$", y0, `$(0, ${y0.tex()})$`, r.pick([
        `W punkcie o jakiej drugiej współrzędnej wykres funkcji $f(x) = ${wzor}$ przecina oś $Oy$?`,
        `Wykres funkcji $f(x) = ${wzor}$ przecina oś $Oy$ w punkcie $(0, y)$. Oblicz $y$.`,
      ]), [
        "Wykres przecina oś $Oy$ dla $x = 0$.",
        `$f(0) = \\frac{${be}}{${d}}${`\\frac{${be}}{${d}}` === y0.tex() ? "" : ` = ${y0.tex()}`}$.`,
      ]);
    }
    const k = r.intBez(-4, 5, 0);
    if (biegun.eq(k)) continue;
    const w = q(al * k + be, c * k + d);
    if (w.d > 6 || Math.abs(w.valueOf()) > 20) continue;
    return jednoPole("w", `$${wartoscTex("f", k)} =$`, w, `$${wartoscTex("f", k)} = ${w.tex()}$`,
      `Funkcja $f$ jest ${okreslenie}. Oblicz $${wartoscTex("f", k)}$.`, [
        `Podstawiamy $x = ${k}$ do wzoru funkcji.`,
        `$${wartoscTex("f", k)} = \\frac{${podstawTex([al, be], k)}}{${podstawTex([c, d], k)}} = \\frac{${al * k + be}}{${c * k + d}} = ${w.tex()}$.`,
      ]);
  }
}

/** Dziedzina i zbiór wartości: dwie liczby wyłączone (p i q), wybór z czterech par. */
function dziedzinaHomograficznej(r) {
  for (;;) {
    let wzor, p, wq, krok;
    if (r.chance(0.5)) {
      const al = r.intBez(-4, 4, 0), be = r.intBez(-9, 9, 0);
      p = r.intBez(-5, 5, 0);
      const a = al * p + be;
      if (a === 0 || Math.abs(a) > 20) continue;
      wq = al;
      const licznik = sumaTex([[al, "x"], [be, ""]]), mian = wielomianTex([1, -p]);
      wzor = `\\frac{${licznik}}{${mian}}`;
      krok = [
        `W liczniku wyodrębniamy mianownik: $${licznik} = ${wspTex(al)}(${mian}) ${plusMinus(a)}$, więc $f(x) = ${hiperbolaTex(a, p, al)}$.`,
        `Asymptoty: $x = ${p}$ i $y = ${wq}$.`,
      ];
    } else {
      const a = r.int(1, 6) * r.znak();
      p = r.intBez(-6, 6, 0);
      wq = r.intBez(-6, 6, 0);
      wzor = hiperbolaTex(a, p, wq);
      krok = [
        "To postać kanoniczna $f(x) = \\frac{a}{x - p} + q$.",
        p > 0 ? `Mianownik $x - ${p}$ daje $p = ${p}$, a wyraz wolny daje $q = ${wq}$.` : `Mianownik $x + ${-p}$ to $x - (${p})$, więc $p = ${p}$, a wyraz wolny daje $q = ${wq}$.`,
      ];
    }
    const opcja = (u, v) => `$D = \\mathbb{R} \\setminus \\{${u}\\}$, $ZW = \\mathbb{R} \\setminus \\{${v}\\}$`;
    const teksty = [opcja(p, wq), opcja(-p, wq), opcja(p, -wq), opcja(-p, -wq)];
    const kolej = r.shuffle([0, 1, 2, 3]);
    return {
      tresc: `Jakie są dziedzina $D$ i zbiór wartości $ZW$ funkcji $f(x) = ${wzor}$?`,
      pola: [{ id: "d", typ: "wybor", etykieta: "Dziedzina i zbiór wartości", opcje: kolej.map((i) => teksty[i]) }],
      odpowiedz: { d: kolej.indexOf(0) },
      wynik: teksty[0],
      rozwiazanie: [...krok, `Dziedzina: wszystkie liczby oprócz $p = ${p}$. Zbiór wartości: wszystkie liczby oprócz $q = ${wq}$.`],
    };
  }
}

/** Monotoniczność hiperboli: osobno na każdej gałęzi, nie w całej dziedzinie. */
function monotonicznoscHomograficznej(r) {
  const a = r.int(1, 6) * r.znak(), p = r.intBez(-6, 6, 0), wq = r.intBez(-6, 6, 0);
  const malejaca = a > 0;
  const prawa = r.chance();
  const przedzial = prawa ? `(${p}, +\\infty)` : `(-\\infty, ${p})`;
  const teksty = [
    `Funkcja $f$ jest malejąca w przedziale $${przedzial}$.`,
    `Funkcja $f$ jest rosnąca w przedziale $${przedzial}$.`,
    "Funkcja $f$ jest malejąca w całej swojej dziedzinie.",
    "Funkcja $f$ jest rosnąca w całej swojej dziedzinie.",
  ];
  const poprawna = malejaca ? 0 : 1;
  const kolej = r.shuffle([0, 1, 2, 3]);
  const lewa = wq - a, prawaW = wq + a;
  return {
    tresc: `Dana jest funkcja $f(x) = ${hiperbolaTex(a, p, wq)}$. Które zdanie o tej funkcji jest prawdziwe?`,
    pola: [{ id: "z", typ: "wybor", etykieta: "Zdanie", opcje: kolej.map((i) => teksty[i]) }],
    odpowiedz: { z: kolej.indexOf(poprawna) },
    wynik: teksty[poprawna],
    rozwiazanie: [
      `Liczba $a = ${a}$ w liczniku jest ${malejaca ? "dodatnia" : "ujemna"}, więc na każdej z dwóch gałęzi hiperboli funkcja ${malejaca ? "maleje" : "rośnie"}.`,
      `W całej dziedzinie funkcja nie jest monotoniczna: $${p - 1} < ${p + 1}$, ale $f(${p - 1}) = ${lewa} ${malejaca ? "<" : ">"} ${prawaW} = f(${p + 1})$.`,
      `Prawdziwe jest więc zdanie: ${teksty[poprawna].replace(/\.$/, "")}.`,
    ],
  };
}

// --- Równania i nierówności wykładnicze i logarytmiczne

function rownaniaWykladnicze(r) {
  const wariant = r.pick(["jednaPodstawa", "jednaPodstawa", "podstawienie", "nierownosc", "czas"]);
  if (wariant === "jednaPodstawa") return wykladniczeJednaPodstawa(r);
  if (wariant === "podstawienie") return wykladniczePodstawienie(r);
  if (wariant === "nierownosc") return nierownoscWykladnicza(r);
  return czasWzrostu(r);
}

/** Obie strony jako potęgi tej samej liczby: A^(αx + β) = b0^n, A = b0^(±m). */
function wykladniczeJednaPodstawa(r) {
  for (;;) {
    const b0 = r.pick([2, 2, 3, 5]), m = r.pick([1, 1, 2, 3]);
    if (b0 === 5 && m > 2) continue;
    const s = r.chance(0.3) ? -1 : 1;
    const al = r.pick([1, 1, 2, 3]), be = r.int(-4, 4), n = r.int(-3, 5);
    if (b0 ** Math.max(n, 0) > 700) continue;
    const x0 = q(n - s * m * be, s * m * al);
    if (x0.d > 6 || x0.zero) continue;
    const A = b0 ** m;
    const podst = s > 0 ? `${A}` : `\\left(\\frac{1}{${A}}\\right)`;
    const wykl = wielomianTex([al, be]);
    const lewa = `${podst}^{${wykl}}`;
    const prawa = n >= 0 ? `${b0 ** n}` : `\\frac{1}{${b0 ** -n}}`;
    const czesci = [];
    if (!(s > 0 && m === 1)) czesci.push(`$${s > 0 ? A : `\\frac{1}{${A}}`} = ${potLit(String(b0), s * m)}$`);
    if (prawa !== potLit(String(b0), n)) czesci.push(`$${prawa} = ${potLit(String(b0), n)}$`);
    const wspolny = wielomianTex([s * m * al, s * m * be]);
    return {
      tresc: `Rozwiąż równanie $${lewa} = ${prawa}$.`,
      pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }],
      odpowiedz: { x: x0 },
      wynik: `$x = ${x0.tex()}$`,
      rozwiazanie: [
        czesci.length ? `Zapisujemy obie strony jako potęgi liczby $${b0}$: ${czesci.join(", ")}.` : `Obie strony są już potęgami liczby $${b0}$.`,
        `Wtedy $${b0}^{${wspolny}} = ${potLit(String(b0), n)}$, więc wykładniki są równe: $${wspolny} = ${n}$.`,
        s * m * al === 1
          ? `Stąd $x = ${x0.tex()}$.`
          : `$${sumaTex([[s * m * al, "x"]])} = ${n - s * m * be}$, więc $x = ${x0.tex()}$.`,
      ],
    };
  }
}

/** Współczynnik z jedynką pomijany: skladnikT(1, "2^{x}") -> "2^{x}", skladnikT(5, "2^{x}") -> "5 \cdot 2^{x}". */
const skladnikT = (c, tx) => (c === 1 ? tx : `${c} \\cdot ${tx}`);

/** A^x - (t1 + t2)·b^x + t1·t2 = 0 z podstawieniem t = b^x; czasem jedno t jest ujemne (CKE LO). */
function wykladniczePodstawienie(r) {
  for (;;) {
    const b0 = r.pick([2, 2, 3]);
    const potegi = b0 === 2 ? [1, 2, 4, 8, 16] : [1, 3, 9, 27];
    const pulapka = r.chance(0.4);
    let t1, t2;
    if (pulapka) {
      t1 = r.pick(potegi.slice(1));
      t2 = -r.pick([1, 2, 3, 5]);
      if (t1 + t2 === 0) continue;
    } else {
      [t1, t2] = r.shuffle(potegi).slice(0, 2);
    }
    const B = -(t1 + t2), C = t1 * t2;
    const A = b0 * b0;
    const lewa = `${A}^{x} ${B < 0 ? "-" : "+"} ${skladnikT(Math.abs(B), `${b0}^{x}`)} ${C < 0 ? "-" : "+"} ${Math.abs(C)}`;
    const wykl = (t) => potegi.indexOf(t);
    const D = (t1 - t2) ** 2, sp = Math.abs(t1 - t2);
    const suma = pulapka ? wykl(t1) : wykl(t1) + wykl(t2);
    const kroki = [
      `Podstawiamy $t = ${b0}^{x}$. Ponieważ $${A}^{x} = (${b0}^{x})^{2} = t^{2}$ oraz $t > 0$, równanie ma postać $${sumaTex([[1, "t^{2}"], [B, "t"], [C, ""]])} = 0$.`,
      `$\\Delta = ${potegaTex(B, 2)} - 4 \\cdot ${texNawias(C)} = ${D}$, $\\sqrt{\\Delta} = ${sp}$, więc $t = ${Math.min(t1, t2)}$ lub $t = ${Math.max(t1, t2)}$.`,
    ];
    if (pulapka) {
      kroki.push(`Liczba $${t2}$ jest ujemna, więc nie spełnia warunku $t > 0$. Zostaje $${b0}^{x} = ${t1}$, czyli $x = ${wykl(t1)}$.`);
    } else {
      kroki.push(`Obie liczby są dodatnie: $${b0}^{x} = ${t1}$ daje $x = ${wykl(t1)}$, a $${b0}^{x} = ${t2}$ daje $x = ${wykl(t2)}$.`);
    }
    kroki.push(pulapka
      ? `Równanie ma tylko jedno rozwiązanie, więc suma rozwiązań jest równa $${suma}$.`
      : `Suma rozwiązań: $${wykl(t1)} + ${wykl(t2)} = ${suma}$.`);
    return jednoPole("s", "Suma rozwiązań", suma, `$${suma}$`, `Oblicz sumę wszystkich rozwiązań równania $${lewa} = 0$.`, kroki);
  }
}

/** Nierówność wykładnicza z podstawą większą od 1 albo z przedziału (0, 1): wybór przedziału. */
function nierownoscWykladnicza(r) {
  for (;;) {
    const b0 = r.pick([2, 2, 3]), s = r.chance(0.4) ? -1 : 1;
    const be = r.int(-4, 4), n = r.int(-2, 4);
    const E = s > 0 ? n : -n;                     // wykładnik prawej strony względem podstawy lewej strony
    const x0 = E - be;
    if (x0 === 0) continue;
    const kierunek = r.pick([">", "<"]), domk = r.chance();
    const wynikKier = s > 0 ? kierunek : kierunek === ">" ? "<" : ">";
    const symbol = (kier, dk) => (kier === ">" ? (dk ? "\\geq" : ">") : (dk ? "\\leq" : "<"));
    const przedzial = (kier, dk, x) => (kier === ">" ? odLiczby(x, dk) : doLiczby(x, dk));
    const podst = s > 0 ? `${b0}` : `\\left(\\frac{1}{${b0}}\\right)`;
    const wykl = wielomianTex([1, be]);
    const prawa = n >= 0 ? `${b0 ** n}` : `\\frac{1}{${b0 ** -n}}`;
    // Wykładnik 1 piszemy bez nawiasów klamrowych (^1), żeby krok „3 = 3^1” był widoczny dla ucznia.
    const prawaPotega = E === 1 ? `${podst}^1` : `${podst}^{${E}}`;
    const poprawna = przedzial(wynikKier, domk, x0);
    const teksty = [
      poprawna,
      przedzial(wynikKier === ">" ? "<" : ">", domk, x0),
      przedzial(wynikKier, !domk, x0),
      przedzial(wynikKier, domk, -x0),
    ];
    const kolej = r.shuffle([0, 1, 2, 3]);
    return {
      tresc: `Rozwiąż nierówność $${podst}^{${wykl}} ${symbol(kierunek, domk)} ${prawa}$.`,
      pola: [{ id: "z", typ: "wybor", etykieta: "Zbiór rozwiązań", opcje: kolej.map((i) => `$${teksty[i]}$`) }],
      odpowiedz: { z: kolej.indexOf(0) },
      wynik: `$x \\in ${poprawna}$`,
      rozwiazanie: [
        prawa !== prawaPotega
          ? `Zapisujemy prawą stronę jako potęgę tej samej liczby co lewa: $${prawa} = ${prawaPotega}$.`
          : "Obie strony są potęgami tej samej liczby.",
        s > 0
          ? `Podstawa $${b0}$ jest większa od $1$, więc funkcja rośnie i znak nierówności zostaje: $${wykl} ${symbol(kierunek, domk)} ${E}$.`
          : `Podstawa $\\frac{1}{${b0}}$ należy do przedziału $(0, 1)$, więc funkcja maleje i znak nierówności zmienia się na przeciwny: $${wykl} ${symbol(wynikKier, domk)} ${E}$.`,
        `Stąd $x ${symbol(wynikKier, domk)} ${x0}$, czyli $x \\in ${poprawna}$.`,
      ],
    };
  }
}

/** Po ilu godzinach liczba osiągnie daną wartość (równanie wykładnicze z kontekstu). */
function czasWzrostu(r) {
  const k = r.pick(WZROSTY), n0 = r.pick(k.N0), t = r.int(2, k.a === 2 ? 7 : 5);
  const cel = n0 * k.a ** t;
  return jednoPole("t", "Liczba godzin", t, `$t = ${t}$`,
    `${k.start(n0)} Po ilu godzinach ${k.podmiot} będzie równa $${cel}$?`, [
      `Po $t$ godzinach liczba jest równa $${n0} \\cdot ${k.a}^{t}$, więc $${n0} \\cdot ${k.a}^{t} = ${cel}$.`,
      `Dzielimy przez $${n0}$: $${k.a}^{t} = ${k.a ** t}$.`,
      `Ponieważ $${k.a}^{${t}} = ${k.a ** t}$, to $t = ${t}$.`,
    ]);
}

function rownaniaLogarytmiczne(r) {
  const wariant = r.pick(["proste", "proste", "suma", "sumaWybor"]);
  if (wariant === "proste") return logarytmProste(r);
  return sumaLogarytmow(r, wariant === "sumaWybor");
}

/** log_a(αx + β) = n: założenie, zamiana na potęgę, sprawdzenie. */
function logarytmProste(r) {
  for (;;) {
    const a = r.pick([2, 2, 3, 3, 4, 5, 10]), n = r.pick([1, 2, 2, 3, -1, -2]);
    const al = r.pick([1, 1, 2, 3, -1, -2]), be = r.int(-6, 6);
    const M = q(a).pow(n);
    const x0 = M.sub(be).div(al);
    if (x0.d > 6 || Math.abs(x0.valueOf()) > 60) continue;
    const arg = wielomianTex([al, be]);
    const wyr = arg === "x" ? `\\log_{${a}} x` : `\\log_{${a}}(${arg})`;
    const granica = q(-be, al);
    const potega = potLit(String(a), n);
    return jednoPole("x", "$x =$", x0, `$x = ${x0.tex()}$`, r.pick([
      `Rozwiąż równanie $${wyr} = ${n}$.`,
      `Wyznacz liczbę $x$, która spełnia równanie $${wyr} = ${n}$.`,
    ]), [
      `Założenie: $${arg} > 0$, czyli $x ${al > 0 ? ">" : "<"} ${granica.tex()}$.`,
      `Z definicji logarytmu: $${arg} = ${potega}${potega === M.tex() ? "" : ` = ${M.tex()}`}$.`,
      al === 1
        ? `Stąd $x = ${x0.tex()}$.`
        : `$${sumaTex([[al, "x"]])} = ${M.sub(be).tex()}$, więc $x = ${x0.tex()}$.`,
      `Liczba $${x0.tex()}$ spełnia założenie, bo wyrażenie pod logarytmem ma wartość $${M.tex()}$, a $${M.tex()} > 0$.`,
    ]);
  }
}

/** log_a x + log_a(x ∓ k) = n: jedno rozwiązanie spełnia założenia, drugie trzeba odrzucić (CKE LO). */
function sumaLogarytmow(r, wybor) {
  const a = r.pick([2, 2, 3]), n = r.pick([1, 2, 2, 3]);
  const M = a ** n;
  const pary = [];
  for (let u = 1; u * u < M; u++) if (M % u === 0) pary.push([u, M / u]);
  const [u, w] = r.pick(pary);
  const minus = r.chance();
  const k = w - u;
  const dobre = minus ? w : u, zle = minus ? -u : -w;
  const drugi = wielomianTex([1, minus ? -k : k]);
  const rownanie = `\\log_{${a}} x + \\log_{${a}}(${drugi}) = ${n}`;
  const potega = potLit(String(a), n);
  const rozwiazanie = [
    minus
      ? `Założenia: $x > 0$ oraz $x - ${k} > 0$, czyli $x > ${k}$.`
      : `Założenia: $x > 0$ oraz $x + ${k} > 0$, czyli $x > 0$.`,
    `Suma logarytmów to logarytm iloczynu: $\\log_{${a}}(x(${drugi})) = ${n}$, więc $x(${drugi}) = ${potega}${potega === String(M) ? "" : ` = ${M}`}$.`,
    `$${wielomianTex([1, minus ? -k : k, -M])} = 0$, $\\Delta = ${k * k + 4 * M}$, $\\sqrt{\\Delta} = ${u + w}$, więc $x = ${minus ? w : u}$ lub $x = ${zle}$.`,
    `Założenie $x > ${minus ? k : 0}$ spełnia tylko $x = ${dobre}$.`,
  ];
  if (!wybor) {
    return jednoPole("x", "$x =$", dobre, `$x = ${dobre}$`, r.pick([
      `Rozwiąż równanie $${rownanie}$.`,
      `Wyznacz liczbę $x$, która spełnia równanie $${rownanie}$.`,
    ]), rozwiazanie);
  }
  const teksty = [
    `Równanie ma dokładnie jedno rozwiązanie: $${dobre}$.`,
    `Równanie ma dwa rozwiązania: $${zle}$ i $${dobre}$.`,
    "Równanie nie ma rozwiązań.",
    `Równanie ma dokładnie jedno rozwiązanie: $${zle}$.`,
  ];
  const kolej = r.shuffle([0, 1, 2, 3]);
  return {
    tresc: `Które zdanie o rozwiązaniach równania $${rownanie}$ jest prawdziwe?`,
    pola: [{ id: "z", typ: "wybor", etykieta: "Rozwiązania równania", opcje: kolej.map((i) => teksty[i]) }],
    odpowiedz: { z: kolej.indexOf(0) },
    wynik: `jedno rozwiązanie: $x = ${dobre}$`,
    rozwiazanie,
  };
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
  { id: "wlasnosci-wartosci", temat: "wlasnosci-funkcji", nazwa: "Wartości funkcji", opis: "Wartość funkcji, argument dla danej wartości, parametr z punktu wykresu lub miejsca zerowego, zbiór par będący funkcją.", generuj: wlasnosciWartosci },
  { id: "wlasnosci-dziedzina", temat: "wlasnosci-funkcji", nazwa: "Dziedzina i przesunięcia", opis: "Dziedzina funkcji z ułamkiem i pierwiastkiem, punkt i miejsca zerowe po przesunięciu lub odbiciu wykresu.", generuj: dziedzinaPrzesuniecia },
  { id: "funkcja-liniowa", temat: "funkcja-liniowa", nazwa: "Funkcja liniowa", opis: "Miejsce zerowe i parametr we wzorze funkcji liniowej.", generuj: funkcjaLiniowa },
  { id: "prosta-przez-punkty", temat: "funkcja-liniowa", nazwa: "Wzór funkcji liniowej", opis: "Wzór funkcji liniowej z dwóch punktów albo z prostej równoległej lub prostopadłej.", generuj: prostaPrzezPunkty },
  { id: "postac-kanoniczna", temat: "funkcja-kwadratowa", nazwa: "Postać kanoniczna", opis: "Wzór funkcji kwadratowej w postaci kanonicznej z wierzchołka, osi symetrii lub miejsc zerowych.", generuj: postacKanoniczna },
  { id: "wierzcholek", temat: "funkcja-kwadratowa", nazwa: "Wierzchołek paraboli", opis: "Wierzchołek, oś symetrii oraz największa i najmniejsza wartość funkcji kwadratowej.", generuj: wierzcholek },
  { id: "miejsca-zerowe", temat: "funkcja-kwadratowa", nazwa: "Miejsca zerowe funkcji kwadratowej", opis: "Miejsca zerowe z wyróżnika, z postaci kanonicznej i z symetrii paraboli.", generuj: miejscaZerowe },
  { id: "odwrotna", temat: "inne-funkcje", nazwa: "Proporcjonalność odwrotna", opis: "Liczba a z punktu hiperboli, wartość y przy odwrotnej proporcjonalności, ćwiartki i punkty wykresu.", generuj: proporcjonalnoscOdwrotna },
  { id: "wykladnicza-logarytm", temat: "inne-funkcje", nazwa: "Wykładnicza i logarytm", opis: "Podstawa i wartości funkcji wykładniczej, wzrost i rozpad, logarytm i przesunięty wykres logarytmiczny.", generuj: wykladniczaILog },
  { id: "homograficzna-asymptoty", temat: "funkcja-homograficzna", nazwa: "Asymptoty hiperboli", opis: "Asymptoty i postać kanoniczna funkcji homograficznej, liczba a z punktu wykresu.", generuj: homograficznaAsymptoty },
  { id: "homograficzna-wlasnosci", temat: "funkcja-homograficzna", nazwa: "Własności homograficznej", opis: "Miejsce zerowe, wartość, dziedzina, zbiór wartości i monotoniczność funkcji homograficznej.", generuj: homograficznaWlasnosci },
  { id: "rownania-wykladnicze", temat: "rownania-wykladnicze-logarytmiczne", nazwa: "Równania wykładnicze", opis: "Równania i nierówności wykładnicze: ta sama podstawa, podstawienie t = 2^x, wzrost w czasie.", generuj: rownaniaWykladnicze },
  { id: "rownania-logarytmiczne", temat: "rownania-wykladnicze-logarytmiczne", nazwa: "Równania logarytmiczne", opis: "Równania logarytmiczne z założeniami, także z sumą logarytmów i odrzuceniem rozwiązania.", generuj: rownaniaLogarytmiczne },
  { id: "ciag-arytmetyczny", temat: "ciag-arytmetyczny", nazwa: "Ciąg arytmetyczny", opis: "Różnica, wyrazy i suma ciągu arytmetycznego, ciąg z parametrem.", generuj: ciagArytmetyczny },
  { id: "ciag-geometryczny", temat: "ciag-geometryczny", nazwa: "Ciąg geometryczny", opis: "Iloraz, wyrazy, suma i iloczyny wyrazów ciągu geometrycznego.", generuj: ciagGeometryczny },
  { id: "wzor-ogolny", temat: "wzor-ogolny", nazwa: "Wzór ogólny ciągu", opis: "Wyrazy ciągu ze wzoru, numer wyrazu o danej wartości, liczba wyrazów ujemnych.", generuj: wzorOgolny },
];
