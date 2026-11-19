// Klasa 3 (liceum i technikum) · rozdział 2 „Ciągi liczbowe” – Matematyka 3, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Zakres podstawowy: ciąg określony wzorem i rekurencyjnie, monotoniczność (znak a_{n+1} - a_n), ciąg arytmetyczny
// i geometryczny z sumami, procent składany, lokaty i kredyty. Bez granic ciągów i szeregu geometrycznego (zakres rozszerzony).
import { Q, texNawias, wielomianTex, plusMinus } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** Losuje z funkcji, aż wynik będzie „ładny”; po 500 próbach zgłasza błąd (błąd w generatorze, nie w danych). */
function szukaj(f) {
  for (let i = 0; i < 500; i++) {
    const w = f(i);
    if (w) return w;
  }
  throw new Error("generator: nie znaleziono ładnych danych");
}

/** Współczynnik przed literą: 1 się pomija, -1 daje "-". */
const wsp = (n) => (n === 1 ? "" : n === -1 ? "-" : String(n));

/** Liczba całkowita w LaTeX; odstęp tysięcy (\,) dopiero od 5 cyfr: 12500 -> "12\,500". */
const num = (n) => {
  const s = String(Math.abs(n));
  const g = s.length >= 5 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : s;
  return (n < 0 ? "-" : "") + g;
};

/** Liczba wymierna o skończonym rozwinięciu dziesiętnym w LaTeX z przecinkiem: 1{,}331. */
function dec(v) {
  v = Q.z(v);
  let k = 0;
  let p10 = 1;
  while (p10 % v.d !== 0) {
    k++;
    p10 *= 10;
    if (k > 8) throw new Error("generator: za długie rozwinięcie dziesiętne");
  }
  const calk = Math.abs(v.n) * (p10 / v.d);
  const ip = Math.floor(calk / p10);
  const fp = calk % p10;
  const znak = v.n < 0 ? "-" : "";
  const frac = k === 0 ? "" : String(fp).padStart(k, "0").replace(/0+$/, "");
  return frac ? `${znak}${num(ip)}{,}${frac}` : `${znak}${num(ip)}`;
}

/** Odpowiedź do pola: liczba jako tekst ("3", "-3", "3/2"). */
const odp = (v) => Q.z(v).toString();

/** c razy (w): mnoz(2, "n+1") = "2(n+1)", mnoz(1, "n+1") = "(n+1)", mnoz(-1, "n+1") = "-(n+1)". */
const mnoz = (c, w) => (c === 1 ? `(${w})` : c === -1 ? `-(${w})` : `${c}(${w})`);
// Podstawa potęgi: ułamek albo liczba ujemna w nawiasie, np. \left(\frac{1}{2}\right)^{4}, (-3)^{2}.
// „jest 1 krok”, „są 2–4 kroki”, „jest 5 kroków” (z poprawną odmianą)
const ileKrokow = (n) => (n === 1 ? "jest $1$ krok" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? `są $${n}$ kroki` : `jest $${n}$ kroków`);
const podstawa = (x) => { const v = Q.z(x); return v.calkowita && !v.ujemna ? v.tex() : v.calkowita ? `(${v.tex()})` : `\\left(${v.tex()}\\right)`; };

/** Wyrażenie w nawiasie, chyba że to prosty dodatni jednomian (3, x, 2x). */
const nawias = (s) => (/^\d*x?$/.test(s) ? s : `(${s})`);

const frac = (a, b) => `\\frac{${a}}{${b}}`;

// --- Temat 1: określenie ciągu i monotoniczność

/** Wyraz ciągu: ze wzoru ogólnego, rekurencyjnie albo „który wyraz jest równy…”. */
function genWyrazCiagu(r) {
  const rodzaj = r.int(0, 3);
  if (rodzaj === 0) {
    const p = r.intBez(-5, 5, 0);
    const c = r.intBez(-9, 9, 0);
    const k = r.int(6, 20);
    const w = p * k + c;
    return {
      tresc: `Ciąg $(a_n)$ jest określony wzorem $a_n=${wielomianTex([p, c], "n")}$. Oblicz $a_{${k}}$.`,
      pola: [{ id: "a", typ: "liczba", etykieta: `$a_{${k}} =$` }],
      odpowiedz: { a: odp(w) },
      wynik: `$a_{${k}}=${w}$`,
      rozwiazanie: [
        `Podstawiamy $n=${k}$ do wzoru ogólnego.`,
        `$a_{${k}}=${p}\\cdot${k} ${plusMinus(c)}=${p * k} ${plusMinus(c)}=${w}$.`,
      ],
    };
  }
  if (rodzaj === 1) {
    const b = r.int(1, 6);
    const c = r.intBez(-6, 6, 0);
    const k = r.int(3, 10);
    const w = k * k - b * k + c;
    return {
      tresc: `Ciąg $(a_n)$ jest określony wzorem $a_n=${wielomianTex([1, -b, c], "n")}$. Oblicz $a_{${k}}$.`,
      pola: [{ id: "a", typ: "liczba", etykieta: `$a_{${k}} =$` }],
      odpowiedz: { a: odp(w) },
      wynik: `$a_{${k}}=${w}$`,
      rozwiazanie: [
        `Podstawiamy $n=${k}$ do wzoru ogólnego.`,
        `$a_{${k}}=${k}^2 - ${b === 1 ? k : `${b}\\cdot${k}`} ${plusMinus(c)}=${k * k} ${plusMinus(-b * k)} ${plusMinus(c)}=${w}$.`,
      ],
    };
  }
  if (rodzaj === 2) {
    const a1 = r.int(-3, 5);
    const m = r.pick([2, 3, -2]);
    const d = r.intBez(-5, 5, 0);
    const k = r.int(4, 5);
    const wyrazy = [a1];
    const kroki = [];
    for (let i = 2; i <= k; i++) {
      const poprz = wyrazy[wyrazy.length - 1];
      const nast = m * poprz + d;
      kroki.push(`$a_{${i}}=${m}\\cdot${texNawias(poprz)} ${plusMinus(d)}=${nast}$`);
      wyrazy.push(nast);
    }
    const w = wyrazy[k - 1];
    return {
      tresc: `Ciąg $(a_n)$ jest określony rekurencyjnie: $a_1=${a1}$ oraz $a_{n+1}=${wsp(m)}a_n ${plusMinus(d)}$ dla $n\\ge 1$. Oblicz $a_{${k}}$.`,
      pola: [{ id: "a", typ: "liczba", etykieta: `$a_{${k}} =$` }],
      odpowiedz: { a: odp(w) },
      wynik: `$a_{${k}}=${w}$`,
      rozwiazanie: [
        `Każdy wyraz liczymy z poprzedniego, zaczynając od $a_1=${a1}$.`,
        `${kroki.join(", ")}.`,
        `Zatem $a_{${k}}=${w}$.`,
      ],
    };
  }
  const p = r.intBez(-5, 5, 0);
  const c = r.intBez(-9, 9, 0);
  const n0 = r.int(5, 30);
  const t = p * n0 + c;
  const wz = wielomianTex([p, c], "n");
  return {
    tresc: `Który wyraz ciągu $a_n=${wz}$ jest równy $${t}$?`,
    pola: [{ id: "n", typ: "liczba", etykieta: "Numer wyrazu $n =$" }],
    odpowiedz: { n: odp(n0) },
    wynik: `$n=${n0}$`,
    rozwiazanie: [
      `Rozwiązujemy równanie $a_n=${t}$, czyli $${wz}=${t}$.`,
      `Stąd $${wsp(p)}n=${t - c}$.`,
      `Zatem $n=${n0}$ – to liczba naturalna dodatnia, więc jest to wyraz $a_{${n0}}$.`,
    ],
  };
}

/** Monotoniczność ciągu danego wzorem: wybór jednego z czterech określeń. */
function genMonotonicznosc(r) {
  const OPCJE = ["rosnący", "malejący", "stały", "ani rosnący, ani malejący, ani stały"];
  const rodzaj = r.pick([0, 0, 1, 2, 3, 3, 4]);
  let wz, kroki, ans;
  if (rodzaj === 0) {
    const p = r.intBez(-6, 6, 0);
    const c = r.intBez(-9, 9, 0);
    wz = wielomianTex([p, c], "n");
    ans = p > 0 ? 0 : 1;
    kroki = [
      `Wyraz następny: $a_{n+1}=${mnoz(p, "n+1")} ${plusMinus(c)}=${wielomianTex([p, p + c], "n")}$.`,
      `Różnica: $a_{n+1}-a_n=(${wielomianTex([p, p + c], "n")})-(${wz})=${p}$.`,
      `Różnica jest ${p > 0 ? "dodatnia" : "ujemna"}, więc ciąg jest ${OPCJE[ans]}.`,
    ];
  } else if (rodzaj === 1) {
    const c = r.intBez(-9, 9, 0);
    wz = String(c);
    ans = 2;
    kroki = [
      `Każdy wyraz jest równy $${c}$: $a_{n+1}=${c}$ i $a_n=${c}$.`,
      `Różnica: $a_{n+1}-a_n=${c}-${texNawias(c)}=0$.`,
      "Różnica jest równa zero, więc ciąg jest stały.",
    ];
  } else if (rodzaj === 2) {
    const c = r.int(1, 9);
    wz = `(-1)^n\\cdot ${c}`;
    ans = 3;
    kroki = [
      `Liczymy kilka wyrazów: $a_1=-${c}$, $a_2=${c}$, $a_3=-${c}$.`,
      `Jest $a_1<a_2$, ale $a_2>a_3$ – wyrazy na przemian rosną i maleją.`,
      "Ciąg nie jest ani rosnący, ani malejący, ani stały.",
    ];
  } else if (rodzaj === 3) {
    const rosn = r.chance(0.5);
    const c = r.intBez(-8, 8, 0);
    wz = wielomianTex([rosn ? 1 : -1, 0, c], "n");
    ans = rosn ? 0 : 1;
    kroki = rosn
      ? [
          `$a_{n+1}-a_n=((n+1)^2 ${plusMinus(c)})-(n^2 ${plusMinus(c)})=n^2+2n+1-n^2=2n+1$.`,
          "Dla $n\\ge 1$ liczba $2n+1$ jest dodatnia.",
          "Różnica jest dodatnia, więc ciąg jest rosnący.",
        ]
      : [
          `$a_{n+1}-a_n=(-(n+1)^2 ${plusMinus(c)})-(-n^2 ${plusMinus(c)})=-n^2-2n-1+n^2=-2n-1$.`,
          "Dla $n\\ge 1$ liczba $-2n-1$ jest ujemna.",
          "Różnica jest ujemna, więc ciąg jest malejący.",
        ];
  } else {
    const k = r.intBez(-5, 5, 0);
    wz = frac(wielomianTex([1, k], "n"), "n");
    ans = k > 0 ? 1 : 0;
    kroki = [
      `$a_{n+1}-a_n=${frac(wielomianTex([1, k + 1], "n"), "n+1")}-${frac(wielomianTex([1, k], "n"), "n")}=${frac(`n(${wielomianTex([1, k + 1], "n")})-(n+1)(${wielomianTex([1, k], "n")})`, "n(n+1)")}$.`,
      `Licznik: $n(${wielomianTex([1, k + 1], "n")})-(n+1)(${wielomianTex([1, k], "n")})=${-k}$, więc $a_{n+1}-a_n=${frac(-k, "n(n+1)")}$.`,
      `Mianownik $n(n+1)$ jest dodatni, a licznik $${-k}$ jest ${k > 0 ? "ujemny" : "dodatni"}, więc ciąg jest ${OPCJE[ans]}.`,
    ];
  }
  return {
    tresc: `Zbadaj monotoniczność ciągu $a_n=${wz}$. Wskaż właściwe określenie.`,
    pola: [{ id: "m", typ: "wybor", etykieta: "Ciąg jest", opcje: OPCJE }],
    odpowiedz: { m: ans },
    wynik: OPCJE[ans],
    rozwiazanie: kroki,
  };
}

// --- Temat 2: ciąg arytmetyczny

/** Wyraz ciągu arytmetycznego: z a_1 i r albo z dwóch innych wyrazów. */
function genWyrazArytm(r) {
  if (r.chance(0.5)) {
    const a1 = r.int(-9, 20);
    const d = r.intBez(-6, 8, 0);
    const n = r.int(8, 30);
    const w = a1 + (n - 1) * d;
    return {
      tresc: `W ciągu arytmetycznym $a_1=${a1}$ oraz $r=${d}$. Oblicz $a_{${n}}$.`,
      pola: [{ id: "a", typ: "liczba", etykieta: `$a_{${n}} =$` }],
      odpowiedz: { a: odp(w) },
      wynik: `$a_{${n}}=${w}$`,
      rozwiazanie: [
        "Korzystamy ze wzoru $a_n=a_1+(n-1)r$.",
        `$a_{${n}}=${a1}+${n - 1}\\cdot${texNawias(d)}=${a1} ${plusMinus((n - 1) * d)}=${w}$.`,
      ],
    };
  }
  const a1 = r.int(-6, 12);
  const d = r.intBez(-5, 7, 0);
  const p = r.int(2, 6);
  const m = p + r.int(2, 6);
  const n = r.int(12, 25);
  const ap = a1 + (p - 1) * d;
  const am = a1 + (m - 1) * d;
  const w = a1 + (n - 1) * d;
  return {
    tresc: `W ciągu arytmetycznym $a_{${p}}=${ap}$ oraz $a_{${m}}=${am}$. Oblicz $a_{${n}}$.`,
    pola: [{ id: "a", typ: "liczba", etykieta: `$a_{${n}} =$` }],
    odpowiedz: { a: odp(w) },
    wynik: `$a_{${n}}=${w}$`,
    rozwiazanie: [
      `Różnica wyrazów: $a_{${m}}-a_{${p}}=${m - p}r$, czyli $${am}-${texNawias(ap)}=${m - p}r$, stąd $r=${d}$.`,
      `Pierwszy wyraz: $a_1=a_{${p}}-${p - 1}r=${ap}-${p - 1}\\cdot${texNawias(d)}=${a1}$.`,
      `$a_{${n}}=${a1}+${n - 1}\\cdot${texNawias(d)}=${w}$.`,
    ],
  };
}

/** Różnica ciągu arytmetycznego albo numer wyrazu równego danej liczbie. */
function genRoznicaNumer(r) {
  const rodzaj = r.int(0, 2);
  if (rodzaj === 0) {
    const a1 = r.int(-6, 12);
    const d = r.intBez(-6, 8, 0);
    const p = r.int(1, 8);
    const m = p + r.int(2, 7);
    const ap = a1 + (p - 1) * d;
    const am = a1 + (m - 1) * d;
    return {
      tresc: `W ciągu arytmetycznym $a_{${p}}=${ap}$ oraz $a_{${m}}=${am}$. Wyznacz różnicę $r$ tego ciągu.`,
      pola: [{ id: "r", typ: "liczba", etykieta: "$r =$" }],
      odpowiedz: { r: odp(d) },
      wynik: `$r=${d}$`,
      rozwiazanie: [
        `Od $a_{${p}}$ do $a_{${m}}$ ${ileKrokow(m - p)}, więc $a_{${m}}-a_{${p}}=${m - p}r$.`,
        `$${am}-${texNawias(ap)}=${am - ap}$, czyli $${m - p}r=${am - ap}$.`,
        `Zatem $r=${d}$.`,
      ],
    };
  }
  if (rodzaj === 1) {
    const a1 = r.int(-9, 15);
    const d = r.intBez(-6, 8, 0);
    const n = r.int(6, 30);
    const t = a1 + (n - 1) * d;
    return {
      tresc: `Ciąg arytmetyczny ma pierwszy wyraz $a_1=${a1}$ i różnicę $r=${d}$. Który wyraz tego ciągu jest równy $${t}$?`,
      pola: [{ id: "n", typ: "liczba", etykieta: "Numer wyrazu $n =$" }],
      odpowiedz: { n: odp(n) },
      wynik: `$n=${n}$`,
      rozwiazanie: [
        `Z wzoru $a_n=a_1+(n-1)r$ mamy $${t}=${a1}+(n-1)\\cdot${texNawias(d)}$.`,
        `Stąd $(n-1)\\cdot${texNawias(d)}=${t - a1}$, czyli $n-1=${n - 1}$.`,
        `Zatem $n=${n}$.`,
      ],
    };
  }
  const a1 = r.int(-9, 15);
  const d = r.intBez(-6, 8, 0);
  const n = r.int(6, 25);
  const an = a1 + (n - 1) * d;
  return {
    tresc: `W ciągu arytmetycznym $a_1=${a1}$ oraz $a_{${n}}=${an}$. Wyznacz różnicę $r$.`,
    pola: [{ id: "r", typ: "liczba", etykieta: "$r =$" }],
    odpowiedz: { r: odp(d) },
    wynik: `$r=${d}$`,
    rozwiazanie: [
      `Z wzoru $a_n=a_1+(n-1)r$: $${an}=${a1}+${n - 1}r$.`,
      `Stąd $${n - 1}r=${an - a1}$.`,
      `Zatem $r=${d}$.`,
    ],
  };
}

// --- Temat 3: suma wyrazów ciągu arytmetycznego

/** Suma n początkowych wyrazów ciągu arytmetycznego (trzy sposoby podania danych). */
function genSumaArytm(r) {
  const rodzaj = r.int(0, 2);
  if (rodzaj === 0) {
    const a1 = r.int(-9, 15);
    const d = r.intBez(-6, 8, 0);
    const n = r.int(8, 40);
    const s = ((2 * a1 + (n - 1) * d) * n) / 2;
    return {
      tresc: `W ciągu arytmetycznym $a_1=${a1}$ oraz $r=${d}$. Oblicz sumę $S_{${n}}$ początkowych wyrazów tego ciągu.`,
      pola: [{ id: "s", typ: "liczba", etykieta: `$S_{${n}} =$` }],
      odpowiedz: { s: odp(s) },
      wynik: `$S_{${n}}=${num(s)}$`,
      rozwiazanie: [
        "Korzystamy ze wzoru $S_n=\\frac{2a_1+(n-1)r}{2}\\cdot n$.",
        `$S_{${n}}=\\frac{2\\cdot${texNawias(a1)}+${n - 1}\\cdot${texNawias(d)}}{2}\\cdot${n}=\\frac{${2 * a1 + (n - 1) * d}}{2}\\cdot${n}$.`,
        `$S_{${n}}=${num(s)}$.`,
      ],
    };
  }
  if (rodzaj === 1) {
    const a1 = r.int(-9, 15);
    const d = r.intBez(-6, 8, 0);
    const n = r.int(8, 40);
    const an = a1 + (n - 1) * d;
    const s = ((a1 + an) * n) / 2;
    return {
      tresc: `W ciągu arytmetycznym $a_1=${a1}$ oraz $a_{${n}}=${an}$. Oblicz sumę $${n}$ początkowych wyrazów tego ciągu.`,
      pola: [{ id: "s", typ: "liczba", etykieta: `$S_{${n}} =$` }],
      odpowiedz: { s: odp(s) },
      wynik: `$S_{${n}}=${num(s)}$`,
      rozwiazanie: [
        "Znamy pierwszy i ostatni wyraz, więc używamy wzoru $S_n=\\frac{a_1+a_n}{2}\\cdot n$.",
        `$S_{${n}}=\\frac{${a1}+${texNawias(an)}}{2}\\cdot${n}=\\frac{${a1 + an}}{2}\\cdot${n}$.`,
        `$S_{${n}}=${num(s)}$.`,
      ],
    };
  }
  const a1 = r.int(1, 9);
  const d = r.int(1, 6);
  const n = r.int(10, 50);
  const an = a1 + (n - 1) * d;
  const s = ((a1 + an) * n) / 2;
  const lista = `${a1}+${a1 + d}+${a1 + 2 * d}+\\dots+${an}`;
  return {
    tresc: `Oblicz sumę $${lista}$, w której kolejne składniki tworzą ciąg arytmetyczny.`,
    pola: [{ id: "s", typ: "liczba", etykieta: "Suma $S =$" }],
    odpowiedz: { s: odp(s) },
    wynik: `$${num(s)}$`,
    rozwiazanie: [
      `Różnica wynosi $r=${d}$. Liczbę składników wyznaczamy z równania $a_n=${an}$: $${a1}+(n-1)\\cdot${d}=${an}$, stąd $n=${n}$.`,
      `$S_{${n}}=\\frac{${a1}+${an}}{2}\\cdot${n}=\\frac{${a1 + an}}{2}\\cdot${n}$.`,
      `$S_{${n}}=${num(s)}$.`,
    ],
  };
}

/** Suma liczb naturalnych dwucyfrowych albo trzycyfrowych podzielnych przez k. */
function genSumaPodzielnych(r) {
  const rodzaj = r.int(0, 2);
  let lo, hi, k, opis;
  if (rodzaj === 0) {
    lo = 10; hi = 99; k = r.pick([3, 4, 5, 6, 7, 8, 9, 11]);
    opis = "dwucyfrowych";
  } else if (rodzaj === 1) {
    lo = 100; hi = 999; k = r.pick([5, 6, 7, 8, 9, 11, 12]);
    opis = "trzycyfrowych";
  } else {
    lo = r.int(1, 40); hi = r.int(120, 300); k = r.int(3, 9);
    opis = `z przedziału od $${lo}$ do $${hi}$ (włącznie)`;
  }
  const pierwsza = Math.ceil(lo / k) * k;
  const ostatnia = Math.floor(hi / k) * k;
  const n = (ostatnia - pierwsza) / k + 1;
  const s = ((pierwsza + ostatnia) * n) / 2;
  return {
    tresc: `Oblicz sumę wszystkich liczb naturalnych ${opis} podzielnych przez $${k}$.`,
    pola: [{ id: "s", typ: "liczba", etykieta: "Suma $S =$" }],
    odpowiedz: { s: odp(s) },
    wynik: `$${num(s)}$`,
    rozwiazanie: [
      `Najmniejsza taka liczba to $${pierwsza}$, największa to $${ostatnia}$; kolejne różnią się o $${k}$, więc tworzą ciąg arytmetyczny o $r=${k}$.`,
      `Liczba wyrazów: $n=\\frac{${ostatnia}-${pierwsza}}{${k}}+1=${n}$.`,
      `$S_{${n}}=\\frac{${pierwsza}+${ostatnia}}{2}\\cdot${n}=\\frac{${pierwsza + ostatnia}}{2}\\cdot${n}=${num(s)}$.`,
    ],
  };
}

// --- Temat 4: ciąg geometryczny i jego suma

/** Ilorazy z dobranymi pierwszymi wyrazami: q = p/s, a_1 podzielne przez s^(n-1). */
const ILORAZY = [[2, 1], [3, 1], [-2, 1], [-3, 1], [4, 1], [5, 1], [1, 2], [-1, 2], [1, 3], [3, 2], [2, 3]];

/** Wyraz ciągu geometrycznego z a_1 i q albo iloraz z dwóch wyrazów. */
function genIlorazWyraz(r) {
  if (r.chance(0.5)) {
    const [p, s] = r.pick(ILORAZY);
    const n = s === 1 ? r.int(4, 6) : r.int(4, 5);
    const t = r.intBez(-4, 4, 0);
    const qq = new Q(p, s);
    const a1 = t * s ** (n - 1);
    const an = new Q(a1).mul(qq.pow(n - 1));
    return {
      tresc: `W ciągu geometrycznym $a_1=${a1}$ oraz $q=${qq.tex()}$. Oblicz $a_{${n}}$.`,
      pola: [{ id: "a", typ: "liczba", etykieta: `$a_{${n}} =$` }],
      odpowiedz: { a: odp(an) },
      wynik: `$a_{${n}}=${an.tex()}$`,
      rozwiazanie: [
        "Korzystamy ze wzoru $a_n=a_1\\cdot q^{n-1}$.",
        `$a_{${n}}=${a1}\\cdot${podstawa(qq)}^{${n - 1}}=${a1}\\cdot${texNawias(qq.pow(n - 1))}$.`,
        `$a_{${n}}=${an.tex()}$.`,
      ],
    };
  }
  const { qq, p, s, g, t } = szukaj(() => {
    const [pp, ss] = r.pick(ILORAZY);
    const gg = r.pick([1, 2, 3]);
    if (pp < 0 && gg % 2 === 0) return null;
    const tt = gg % 2 === 0 ? r.int(1, 4) : r.intBez(-4, 4, 0);
    return { qq: new Q(pp, ss), p: pp, s: ss, g: gg, t: tt };
  });
  const k = r.int(1, 5);
  const m = k + g;
  const ak = t * s ** g;
  const am = new Q(ak).mul(qq.pow(g));
  const ilorazPot = am.div(ak);
  return {
    tresc: `W ciągu geometrycznym${g % 2 === 0 ? " o wyrazach dodatnich" : ""} $a_{${k}}=${ak}$ oraz $a_{${m}}=${am.tex()}$. Wyznacz iloraz $q$.`,
    pola: [{ id: "q", typ: "liczba", etykieta: "$q =$" }],
    odpowiedz: { q: odp(qq) },
    wynik: `$q=${qq.tex()}$`,
    rozwiazanie: [
      `Od $a_{${k}}$ do $a_{${m}}$ ${ileKrokow(g)}, więc $a_{${m}}=a_{${k}}\\cdot ${g === 1 ? "q" : `q^{${g}}`}$.`,
      `$${g === 1 ? "q" : `q^{${g}}`}=\\frac{${am.tex()}}{${ak}}=${ilorazPot.tex()}$.`,
      g === 1 ? `Zatem $q=${qq.tex()}$.` : `${g % 2 === 0 ? "Wyrazy są dodatnie, więc $q>0$. " : ""}Zatem $q=${qq.tex()}$.`,
    ],
  };
}

/** Suma n początkowych wyrazów ciągu geometrycznego (dane podane wprost albo trzema pierwszymi wyrazami). */
function genSumaGeom(r) {
  const [p, s] = r.pick(ILORAZY);
  const n = s === 1 ? r.int(4, 7) : r.int(4, 5);
  const t = r.intBez(-4, 4, 0);
  const qq = new Q(p, s);
  const a1 = t * s ** (n - 1);
  const qn = qq.pow(n);
  const sn = new Q(a1).mul(new Q(1).sub(qn)).div(new Q(1).sub(qq));
  const trzy = r.chance(0.5);
  const wyrazy3 = [0, 1, 2].map((i) => new Q(a1).mul(qq.pow(i)));
  const tresc = trzy
    ? `Pierwsze trzy wyrazy ciągu geometrycznego to $${wyrazy3.map((v) => v.tex()).join(", ")}$. Oblicz sumę $${n}$ początkowych wyrazów tego ciągu.`
    : `W ciągu geometrycznym $a_1=${a1}$ oraz $q=${qq.tex()}$. Oblicz sumę $S_{${n}}$ początkowych wyrazów tego ciągu.`;
  return {
    tresc,
    pola: [{ id: "s", typ: "liczba", etykieta: `$S_{${n}} =$` }],
    odpowiedz: { s: odp(sn) },
    wynik: `$S_{${n}}=${sn.tex()}$`,
    rozwiazanie: [
      trzy
        ? `Iloraz: $q=\\frac{a_2}{a_1}=\\frac{${wyrazy3[1].tex()}}{${a1}}=${qq.tex()}$. Wzór: $S_n=a_1\\cdot\\frac{1-q^n}{1-q}$.`
        : "Korzystamy ze wzoru $S_n=a_1\\cdot\\frac{1-q^n}{1-q}$ dla $q\\neq 1$.",
      `$q^{${n}}=${podstawa(qq)}^{${n}}=${texNawias(qn)}$.`,
      `$S_{${n}}=${a1}\\cdot\\frac{1-${texNawias(qn)}}{1-${texNawias(qq)}}=${sn.tex()}$.`,
    ],
  };
}

// --- Temat 5: zadania różne

/** Dla jakiego x trzy wyrażenia liniowe tworzą (w tej kolejności) ciąg arytmetyczny. */
function genTrzyArytm(r) {
  const d = szukaj(() => {
    const x = r.intBez(-5, 9, 0);
    const u1 = r.int(0, 2);
    const u2 = r.int(1, 3);
    const u3 = r.int(0, 3);
    const k = 2 * u2 - u1 - u3;
    if (k === 0) return null;
    const v1 = r.int(-8, 8);
    const v2 = r.int(-8, 8);
    const v3 = k * x + 2 * v2 - v1;
    if (Math.abs(v3) > 14) return null;
    if ((u1 === 0 && v1 === 0) || (u3 === 0 && v3 === 0)) return null;
    const A = u1 * x + v1;
    const B = u2 * x + v2;
    if (A === B) return null;
    return { x, u1, u2, u3, v1, v2, v3, k };
  });
  const { x, u1, u2, u3, v1, v2, v3, k } = d;
  const A = wielomianTex([u1, v1], "x");
  const B = wielomianTex([u2, v2], "x");
  const C = wielomianTex([u3, v3], "x");
  const a0 = u1 * x + v1;
  const b0 = u2 * x + v2;
  const c0 = u3 * x + v3;
  return {
    tresc: `Dla jakiej liczby $x$ liczby $${A}$, $${B}$, $${C}$ są (w podanej kolejności) kolejnymi wyrazami ciągu arytmetycznego?`,
    pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }],
    odpowiedz: { x: odp(x) },
    wynik: `$x=${x}$`,
    rozwiazanie: [
      "Dla trzech kolejnych wyrazów ciągu arytmetycznego środkowy spełnia warunek $2b=a+c$.",
      `$2\\cdot ${nawias(B)}=${nawias(A)}+${nawias(C)}$, czyli $${wielomianTex([2 * u2, 2 * v2], "x")}=${wielomianTex([u1 + u3, v1 + v3], "x")}$.`,
      k === 1 ? `Stąd $x=${x}$.` : `Stąd $${wsp(k)}x=${v1 + v3 - 2 * v2}$, czyli $x=${x}$.`,
      `Sprawdzenie: dla $x=${x}$ liczby to $${a0}$, $${b0}$, $${c0}$ – różnica jest równa $${b0 - a0}$.`,
    ],
  };
}

/** Dla jakich x liczby a, kx+p, c tworzą ciąg geometryczny (dwa rozwiązania). */
function genTrzyGeom(r) {
  const m = r.int(2, 12);
  const dziel = [];
  for (let a = 1; a * a < m * m; a++) if ((m * m) % a === 0) dziel.push(a);
  const a = r.pick(dziel);
  const c = (m * m) / a;
  const [pierwsza, trzecia] = r.chance(0.5) ? [a, c] : [c, a];
  const k = r.pick([1, 1, 1, 2, 3]);
  const p = r.intBez(-6, 6, 0);
  const mid = wielomianTex([k, p], "x");
  const x1 = new Q(m - p, k);
  const x2 = new Q(-m - p, k);
  const sol = [x1, x2].sort((u, v) => u.cmp(v));
  return {
    tresc: `Dla jakich liczb $x$ liczby $${pierwsza}$, $${mid}$, $${trzecia}$ są (w podanej kolejności) kolejnymi wyrazami ciągu geometrycznego? Podaj wszystkie takie liczby.`,
    pola: [{ id: "x", typ: "zbior", ile: 2, etykieta: "Liczby $x$" }],
    odpowiedz: { x: sol.map(odp) },
    wynik: sol.map((v) => `$x=${v.tex()}$`).join(" lub "),
    rozwiazanie: [
      "Dla trzech kolejnych wyrazów ciągu geometrycznego środkowy spełnia warunek $b^2=a\\cdot c$.",
      `$(${mid})^2=${pierwsza}\\cdot${trzecia}=${m * m}$, więc $${mid}=${m}$ lub $${mid}=-${m}$.`,
      `Z pierwszego równania $x=${x1.tex()}$, z drugiego $x=${x2.tex()}$.`,
    ],
  };
}

// --- Temat 6: lokaty i kredyty

const KWOTY = [1000, 2000, 2500, 3000, 4000, 5000, 6000, 8000, 10000, 20000];

/** Wybiera oprocentowanie, liczbę okresów i kwotę tak, by kwota końcowa była całkowita. */
function wybierzLokate(r, procenty, okresy) {
  return szukaj(() => {
    const p = r.pick(procenty);
    const n = r.pick(okresy);
    const K = r.pick(KWOTY);
    const qq = new Q(100 + p, 100);
    const Kn = new Q(K).mul(qq.pow(n));
    return Kn.calkowita ? { p, n, K, qq, qn: qq.pow(n), Kn: Kn.n } : null;
  });
}

/** Lokata z procentem składanym: stan konta, odsetki, kapitalizacja półroczna, liczba lat. */
function genLokata(r) {
  const rodzaj = r.int(0, 3);
  if (rodzaj === 2) {
    const { p: ps, n: k, K, qq, qn, Kn } = wybierzLokate(r, [5, 10], [2, 2, 4]);
    const lata = k / 2;
    return {
      tresc: `Na lokatę wpłacono $${num(K)}$ zł. Roczne oprocentowanie wynosi $${2 * ps}\\%$, a odsetki są doliczane do kapitału co pół roku. Oblicz, ile złotych będzie na lokacie po ${lata === 1 ? "roku" : "2 latach"}.`,
      pola: [{ id: "k", typ: "liczba", etykieta: "Kwota (zł)" }],
      odpowiedz: { k: odp(Kn) },
      wynik: `$${num(Kn)}$ zł`,
      rozwiazanie: [
        `Odsetki są doliczane co pół roku, więc stopa za jedno półrocze to $${2 * ps}\\%:2=${ps}\\%$. W tym czasie mamy $${k}$ okresy kapitalizacji.`,
        `Wzór: $K_{k}=K\\left(1+\\frac{p}{100}\\right)^{k}$ z $p=${ps}$ i $k=${k}$: $1+\\frac{${ps}}{100}=${dec(qq)}$.`,
        `$K_{${k}}=${num(K)}\\cdot${dec(qq)}^{${k}}=${num(K)}\\cdot${dec(qn)}=${num(Kn)}$ zł.`,
      ],
    };
  }
  if (rodzaj === 3) {
    const { p, K, n, T } = szukaj(() => {
      const pp = r.pick([10, 20]);
      const KK = r.pick([1000, 2000, 5000, 10000]);
      const nn = r.int(3, 5);
      const qq = new Q(100 + pp, 100);
      const Kn = new Q(KK).mul(qq.pow(nn));
      const Kp = new Q(KK).mul(qq.pow(nn - 1));
      const TT = Math.ceil(Kn.valueOf() / 100) * 100 - 100;
      if (new Q(TT).cmp(Kn) >= 0 || new Q(TT).cmp(Kp) < 0) return null;
      return { p: pp, K: KK, n: nn, T: TT };
    });
    const qq = new Q(100 + p, 100);
    const kolejne = [];
    for (let i = 1; i <= n; i++) kolejne.push(`$K_{${i}}=${dec(new Q(K).mul(qq.pow(i)))}$`);
    return {
      tresc: `Na lokatę z roczną kapitalizacją odsetek wpłacono $${num(K)}$ zł przy oprocentowaniu $${p}\\%$ w skali roku. Po ilu pełnych latach kwota na lokacie przekroczy $${num(T)}$ zł?`,
      pola: [{ id: "n", typ: "liczba", etykieta: "Liczba lat $n =$" }],
      odpowiedz: { n: odp(n) },
      wynik: `$n=${n}$`,
      rozwiazanie: [
        `Co roku kwota jest mnożona przez $${dec(qq)}$: $K_n=${num(K)}\\cdot${dec(qq)}^n$.`,
        `Po kolejnych latach (w zł): ${kolejne.join(", ")}.`,
        `Po ${n - 1} latach kwota nie przekracza jeszcze $${num(T)}$ zł, a po $${n}$ latach już tak – szukana liczba lat to $${n}$.`,
      ],
    };
  }
  const { p, n, K, qq, qn, Kn } = wybierzLokate(r, [4, 5, 10, 20], [2, 2, 3, 3, 4]);
  const odsetki = rodzaj === 1;
  return {
    tresc: `Na lokatę z roczną kapitalizacją odsetek wpłacono $${num(K)}$ zł. Oprocentowanie wynosi $${p}\\%$ w skali roku. Oblicz, ${odsetki ? `ile złotych wyniosą odsetki po ${n} latach` : `ile złotych będzie na lokacie po ${n} latach`}.`,
    pola: [{ id: "k", typ: "liczba", etykieta: odsetki ? "Odsetki (zł)" : "Kwota (zł)" }],
    odpowiedz: { k: odp(odsetki ? Kn - K : Kn) },
    wynik: `$${num(odsetki ? Kn - K : Kn)}$ zł`,
    rozwiazanie: [
      "Stosujemy wzór na procent składany: $K_n=K\\left(1+\\frac{p}{100}\\right)^n$.",
      `Mamy $K=${num(K)}$, $p=${p}$, $n=${n}$, więc $1+\\frac{${p}}{100}=${dec(qq)}$.`,
      `$K_{${n}}=${num(K)}\\cdot${dec(qq)}^{${n}}=${num(K)}\\cdot${dec(qn)}=${num(Kn)}$ zł.`,
      ...(odsetki ? [`Odsetki: $${num(Kn)}-${num(K)}=${num(Kn - K)}$ zł.`] : []),
    ],
  };
}

/** Możliwe kredyty: K, p, n takie, że rata płatna na koniec każdego roku jest całkowita. */
const KREDYTY = [];
for (const p of [10, 20]) {
  for (const n of [2, 3]) {
    const qq = new Q(100 + p, 100);
    let S = new Q(0);
    for (let i = 0; i < n; i++) S = S.add(qq.pow(i));
    for (let K = 1000; K <= 10000; K += 10) {
      const x = new Q(K).mul(qq.pow(n)).div(S);
      if (x.calkowita) KREDYTY.push({ p, n, K, x: x.n });
    }
  }
}

/** Rata kredytu spłacanego w równych ratach płatnych na koniec kolejnych lat. */
function genRataKredytu(r) {
  const { p, n, K, x } = r.pick(KREDYTY);
  const qq = new Q(100 + p, 100);
  let S = new Q(0);
  for (let i = 0; i < n; i++) S = S.add(qq.pow(i));
  const Kqn = new Q(K).mul(qq.pow(n));
  const rownanie =
    n === 2
      ? "$(Kq-x)q-x=0$, czyli $Kq^2=x(q+1)$"
      : "$((Kq-x)q-x)q-x=0$, czyli $Kq^3=x(q^2+q+1)$";
  return {
    tresc: `Kredyt w wysokości $${num(K)}$ zł jest oprocentowany $${p}\\%$ w skali roku. Spłacono go ${n === 2 ? "dwiema" : "trzema"} równymi ratami płatnymi na koniec kolejnych lat; odsetki za każdy rok są naliczane od kwoty pozostałej do spłaty. Oblicz wysokość jednej raty (w zł).`,
    pola: [{ id: "x", typ: "liczba", etykieta: "Rata (zł)" }],
    odpowiedz: { x: odp(x) },
    wynik: `$${num(x)}$ zł`,
    rozwiazanie: [
      `Niech $x$ będzie ratą, a $q=1+\\frac{${p}}{100}=${dec(qq)}$ rocznym czynnikiem wzrostu długu $K=${num(K)}$.`,
      `Po ostatniej racie dług jest zerowy: ${rownanie}.`,
      `Podstawiamy: $${num(K)}\\cdot${dec(qq.pow(n))}=x\\cdot${dec(S)}$, czyli $${dec(Kqn)}=${dec(S)}x$.`,
      `Stąd $x=${num(x)}$ zł.`,
    ],
  };
}

// --- Tematy

export default {
  tematy: [
    // ------------------------------------------------------------------ 2.1, 2.2
    {
      id: "okreslenie-monotonicznosc",
      nazwa: "Określenie ciągu. Monotoniczność ciągów",
      sciaga: [
        {
          nazwa: "Ciąg liczbowy",
          slownie: "Ciąg to ponumerowana lista liczb: numerowi $n=1,2,3,\\dots$ odpowiada jeden wyraz ciągu. Całość zapisujemy $(a_n)$.",
          tex: "(a_n):\\ a_1,\\ a_2,\\ a_3,\\ \\dots",
          litery: "$a_n$ – wyraz o numerze $n$, $n$ – numer wyrazu (liczba naturalna dodatnia).",
          przyklad: "Dla $a_n=3n-5$: $a_1=-2$, $a_2=1$, $a_3=4$, $a_{10}=3\\cdot10-5=25$.",
          uwaga: "$a_{n+1}$ to wyraz następny po $a_n$, a nie $a_n+1$. Dla $a_n=3n-5$ jest $a_{n+1}=3(n+1)-5=3n-2$.",
        },
        {
          nazwa: "Wzór ogólny i wzór rekurencyjny",
          slownie: "Ciąg można opisać wzorem ogólnym (od razu liczymy dowolny wyraz) albo rekurencyjnie: podajemy pierwszy wyraz i sposób obliczenia następnego z poprzedniego.",
          tex: "a_1=2,\\quad a_{n+1}=3a_n-1",
          litery: "Wzór rekurencyjny musi mieć podany pierwszy wyraz (albo kilka pierwszych).",
          przyklad: "Dla $a_1=2$ i $a_{n+1}=3a_n-1$: $a_2=3\\cdot2-1=5$, $a_3=3\\cdot5-1=14$, $a_4=3\\cdot14-1=41$.",
          uwaga: "Przy wzorze rekurencyjnym wyrazy liczymy po kolei – żeby dojść do $a_{20}$, trzeba policzyć wszystkie poprzednie.",
        },
        {
          nazwa: "Który wyraz jest równy liczbie?",
          slownie: "Wstawiamy liczbę w miejsce $a_n$ i rozwiązujemy równanie. Numer $n$ musi wyjść liczbą naturalną dodatnią – inaczej tej liczby w ciągu nie ma.",
          tex: "a_n=c\\ \\Rightarrow\\ n=?",
          przyklad: "$a_n=3n-5$. Dla $a_n=40$: $3n=45$, $n=15$ – to wyraz $a_{15}$. Dla $a_n=41$: $3n=46$, $n=\\frac{46}{3}$ – nie jest całkowite, więc $41$ nie jest wyrazem tego ciągu.",
          uwaga: "Sprawdź, czy $n$ jest całkowite i dodatnie; wynik $n=-2$ albo $n=2{,}5$ oznacza, że liczby w ciągu nie ma.",
        },
        {
          nazwa: "Monotoniczność ciągu",
          slownie: "Ciąg jest rosnący, gdy każdy następny wyraz jest większy od poprzedniego, malejący – gdy mniejszy, stały – gdy wszystkie wyrazy są równe. Badamy znak różnicy $a_{n+1}-a_n$.",
          tex: "a_{n+1}-a_n>0:\\ \\text{rosnący}\\qquad a_{n+1}-a_n<0:\\ \\text{malejący}\\qquad a_{n+1}-a_n=0:\\ \\text{stały}",
          litery: "Różnica $a_{n+1}-a_n$ musi mieć ten sam znak dla każdego $n\\ge 1$.",
          przyklad: "$a_n=3n-5$: $a_{n+1}-a_n=(3n-2)-(3n-5)=3>0$, więc ciąg jest rosnący.",
          uwaga: "Ciąg $a_n=(-1)^n$, czyli $-1,\\ 1,\\ -1,\\ \\dots$, nie jest ani rosnący, ani malejący, ani stały. Samo sprawdzenie dwóch–trzech pierwszych wyrazów nie wystarcza.",
        },
        {
          nazwa: "Badanie monotoniczności – więcej wzorów",
          slownie: "Dla wzoru z $n^2$ albo z ułamkiem zapisujemy $a_{n+1}$, odejmujemy $a_n$ i upraszczamy do wyrażenia, którego znak widać.",
          tex: "a_n=10-n^2\\qquad a_n=\\frac{n+1}{n}",
          przyklad: "$a_n=10-n^2$: $a_{n+1}-a_n=-(n+1)^2+n^2=-2n-1<0$ – malejący. $a_n=\\frac{n+1}{n}$: $a_{n+1}-a_n=\\frac{n+2}{n+1}-\\frac{n+1}{n}=\\frac{-1}{n(n+1)}<0$ – malejący.",
          uwaga: "Mianownik $n(n+1)$ jest dodatni dla $n\\ge 1$, więc o znaku ułamka decyduje licznik.",
        },
      ],
      jak: [
        "Zapisz wzór ogólny albo (przy rekurencji) policz kolejne wyrazy po kolei.",
        "Do wyrazu o podanym numerze podstaw $n$; do pytania „który wyraz” rozwiąż równanie $a_n=c$ i sprawdź, czy $n$ jest całkowite dodatnie.",
        "Monotoniczność: zapisz $a_{n+1}$ i oblicz $a_{n+1}-a_n$.",
        "Znak różnicy (dla każdego $n\\ge1$) mówi o monotoniczności: $>0$ rosnący, $<0$ malejący, $=0$ stały; zmienny znak – brak monotoniczności.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Ciąg $(a_n)$ jest określony wzorem $a_n=n^2-4n$. Wyraz $a_5$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$21$", "$45$", "$5$", "$-5$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Ciąg $(a_n)$ jest określony rekurencyjnie: $a_1=4$ oraz $a_{n+1}=2a_n-3$ dla $n\\ge 1$. Wyraz $a_4$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$11$", "$9$", "$19$"],
          poprawna: 1,
        },
        {
          nr: "3",
          tresc: "Liczba $53$ jest wyrazem ciągu $a_n=4n-7$ o numerze: **Wybierz właściwą odpowiedź.**",
          opcje: ["$15$", "$14$", "$46$", "$60$"],
          poprawna: 0,
        },
        {
          nr: "4",
          tresc: "Który z ciągów jest malejący? **Wybierz właściwą odpowiedź.**",
          opcje: ["$a_n=2n-9$", "$a_n=n^2+1$", "$a_n=(-1)^n$", "$a_n=6-5n$"],
          poprawna: 3,
        },
        {
          nr: "5",
          tresc: "Dany jest ciąg $a_n=n^2-6n$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wyraz $a_3$ jest równy $-9$.", litery: "PF", poprawna: 0 },
            { tekst: "Ciąg $(a_n)$ jest rosnący.", litery: "PF", poprawna: 1 },
            { tekst: "Wyraz $a_6$ jest równy $0$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 3,
          tresc: "Ciąg $(a_n)$ jest określony wzorem $a_n=5n-3$. Oblicz $a_{12}$, sprawdź, czy liczba $97$ jest wyrazem tego ciągu, i zbadaj monotoniczność ciągu. **Zapisz obliczenia.**",
          rozwiazanie:
            "$a_{12}=5\\cdot12-3=57$.\n\n" +
            "Rozwiązujemy $5n-3=97$: $5n=100$, $n=20$. Liczba $20$ jest naturalna dodatnia, więc $97$ jest wyrazem $a_{20}$.\n\n" +
            "$a_{n+1}=5(n+1)-3=5n+2$, więc $a_{n+1}-a_n=(5n+2)-(5n-3)=5>0$.\n\n" +
            "Odpowiedź: $a_{12}=57$; liczba $97$ jest wyrazem $a_{20}$; ciąg jest rosnący.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Zbadaj monotoniczność ciągu $a_n=\\frac{n}{n+1}$. **Zapisz obliczenia.**",
          rozwiazanie:
            "$a_{n+1}=\\frac{n+1}{n+2}$.\n\n" +
            "$a_{n+1}-a_n=\\frac{n+1}{n+2}-\\frac{n}{n+1}=\\frac{(n+1)^2-n(n+2)}{(n+1)(n+2)}=\\frac{n^2+2n+1-n^2-2n}{(n+1)(n+2)}=\\frac{1}{(n+1)(n+2)}$.\n\n" +
            "Dla $n\\ge1$ mianownik jest dodatni, więc różnica jest dodatnia.\n\n" +
            "Odpowiedź: ciąg jest rosnący.",
        },
      ],
      generatory: [
        { id: "wyraz-ciagu", nazwa: "Wyraz ciągu", opis: "Oblicz wyraz ciągu ze wzoru ogólnego albo rekurencyjnego, albo wskaż numer wyrazu równego danej liczbie.", generuj: genWyrazCiagu },
        { id: "monotonicznosc-ciagu", nazwa: "Monotoniczność", opis: "Zbadaj znak $a_{n+1}-a_n$ i wskaż, czy ciąg jest rosnący, malejący, stały, czy żaden z tych.", generuj: genMonotonicznosc },
      ],
    },

    // ------------------------------------------------------------------ 2.3
    {
      id: "ciag-arytmetyczny",
      nazwa: "Ciąg arytmetyczny",
      sciaga: [
        {
          nazwa: "Ciąg arytmetyczny",
          slownie: "Każdy wyraz (od drugiego) powstaje z poprzedniego przez dodanie tej samej liczby $r$, zwanej różnicą ciągu.",
          tex: "a_{n+1}=a_n+r\\qquad r=a_{n+1}-a_n",
          litery: "$r$ – różnica ciągu. Dla $r>0$ ciąg jest rosnący, dla $r<0$ malejący, dla $r=0$ stały.",
          przyklad: "$5,\\ 8,\\ 11,\\ 14,\\ \\dots$ ma $r=3$. Ciąg $20,\\ 17,\\ 14,\\ \\dots$ ma $r=-3$.",
          uwaga: "Różnicę liczymy zawsze „następny minus poprzedni”: dla $20,\\ 17$ jest $17-20=-3$, a nie $3$.",
        },
        {
          nazwa: "Wzór na n-ty wyraz",
          slownie: "Aby dojść od $a_1$ do $a_n$, trzeba dodać różnicę $n-1$ razy.",
          tex: "a_n=a_1+(n-1)r",
          litery: "$a_1$ – pierwszy wyraz, $r$ – różnica, $n$ – numer wyrazu.",
          przyklad: "Dla $a_1=4$ i $r=3$: $a_{10}=4+9\\cdot3=31$.",
          uwaga: "Częsty błąd: $a_1+nr$. Przed wyrazem $a_n$ jest tylko $n-1$ „kroków”.",
        },
        {
          nazwa: "Trzy kolejne wyrazy",
          slownie: "Środkowy z trzech kolejnych wyrazów ciągu arytmetycznego jest średnią arytmetyczną sąsiednich.",
          tex: "2b=a+c\\qquad b=\\frac{a+c}{2}",
          litery: "$a$, $b$, $c$ – trzy kolejne wyrazy (w tej kolejności).",
          przyklad: "Liczby $3$, $x$, $11$ tworzą ciąg arytmetyczny: $2x=3+11$, $x=7$.",
          uwaga: "Kolejność ma znaczenie. Dla liczb $x$, $3$, $11$ środkowa jest $3$: $2\\cdot3=x+11$, więc $x=-5$.",
        },
        {
          nazwa: "Różnica z dwóch wyrazów",
          slownie: "Od $a_k$ do $a_m$ jest $m-k$ kroków, więc różnica tych wyrazów to $(m-k)$ razy $r$.",
          tex: "a_m-a_k=(m-k)\\cdot r",
          przyklad: "$a_3=7$, $a_8=22$: $5r=15$, $r=3$. Wtedy $a_1=a_3-2r=7-6=1$.",
        },
      ],
      jak: [
        "Rozpoznaj ciąg arytmetyczny: różnice kolejnych wyrazów są stałe.",
        "Zapisz dane przez $a_1$ i $r$ ($a_n=a_1+(n-1)r$).",
        "Z dwóch wyrazów licz najpierw $r$ ze wzoru $a_m-a_k=(m-k)r$, potem $a_1$.",
        "Warunek na trzy kolejne wyrazy to $2b=a+c$ – rozwiąż równanie z $x$.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "W ciągu arytmetycznym $a_1=-3$ oraz $r=4$. Wyraz $a_{10}$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$37$", "$33$", "$36$", "$-39$"],
          poprawna: 1,
        },
        {
          nr: "9",
          tresc: "W ciągu arytmetycznym $a_2=5$ oraz $a_5=17$. Różnica $r$ tego ciągu jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$12$", "$3$", "$4$"],
          poprawna: 3,
        },
        {
          nr: "10",
          tresc: "Liczby $2$, $x+1$, $12$ są (w tej kolejności) kolejnymi wyrazami ciągu arytmetycznego. Liczba $x$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$13$", "$6$", "$5$"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "W ciągu arytmetycznym $a_1=20$ oraz $r=-3$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wyraz $a_5$ jest równy $8$.", litery: "PF", poprawna: 0 },
            { tekst: "Ciąg jest rosnący.", litery: "PF", poprawna: 1 },
            { tekst: "Wyraz $a_{11}$ jest równy $-10$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "12",
          tresc: "Ile wyrazów ciągu arytmetycznego $5,\\ 8,\\ 11,\\ \\dots$ jest mniejszych od $100$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$32$", "$33$", "$31$", "$30$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 3,
          tresc: "W ciągu arytmetycznym $a_3=8$ oraz $a_7=20$. Wyznacz różnicę $r$, pierwszy wyraz $a_1$ i wyraz $a_{20}$. **Zapisz obliczenia.**",
          rozwiazanie:
            "Od $a_3$ do $a_7$ są $4$ kroki, więc $a_7-a_3=4r$, czyli $12=4r$ i $r=3$.\n\n" +
            "$a_1=a_3-2r=8-6=2$.\n\n" +
            "$a_{20}=a_1+19r=2+19\\cdot3=59$.\n\n" +
            "Odpowiedź: $r=3$, $a_1=2$, $a_{20}=59$.",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "Liczby $2x-1$, $x+5$, $4x-1$ są (w tej kolejności) kolejnymi wyrazami ciągu arytmetycznego. Wyznacz $x$ i różnicę tego ciągu. **Zapisz obliczenia.**",
          rozwiazanie:
            "Warunek na trzy kolejne wyrazy: $2(x+5)=(2x-1)+(4x-1)$.\n\n" +
            "$2x+10=6x-2$, stąd $12=4x$ i $x=3$.\n\n" +
            "Dla $x=3$ liczby to $5$, $8$, $11$, więc $r=8-5=3$.\n\n" +
            "Odpowiedź: $x=3$, $r=3$.",
        },
      ],
      generatory: [
        { id: "wyraz-arytmetyczny", nazwa: "Wyraz ciągu", opis: "Oblicz wyraz ciągu arytmetycznego z $a_1$ i $r$ albo z dwóch innych wyrazów.", generuj: genWyrazArytm },
        { id: "roznica-i-numer", nazwa: "Różnica i numer", opis: "Wyznacz różnicę ciągu arytmetycznego albo numer wyrazu równego danej liczbie.", generuj: genRoznicaNumer },
      ],
    },

    // ------------------------------------------------------------------ 2.4
    {
      id: "suma-arytmetycznego",
      nazwa: "Suma początkowych wyrazów ciągu arytmetycznego",
      sciaga: [
        {
          nazwa: "Suma n początkowych wyrazów",
          slownie: "$S_n$ to suma pierwszych $n$ wyrazów. Gdy znamy pierwszy i ostatni wyraz, bierzemy ich średnią i mnożymy przez liczbę wyrazów.",
          tex: "S_n=\\frac{a_1+a_n}{2}\\cdot n",
          litery: "$a_1$ – pierwszy, $a_n$ – ostatni sumowany wyraz, $n$ – liczba wyrazów.",
          przyklad: "$1+2+3+\\dots+100$: $S_{100}=\\frac{1+100}{2}\\cdot100=5050$.",
          uwaga: "$S_n$ (suma) to nie $a_n$ (jeden wyraz).",
        },
        {
          nazwa: "Suma z a₁ i r",
          slownie: "Gdy nie znamy $a_n$, wstawiamy do wzoru $a_n=a_1+(n-1)r$ i dostajemy drugi wzór.",
          tex: "S_n=\\frac{2a_1+(n-1)r}{2}\\cdot n",
          litery: "$a_1$ – pierwszy wyraz, $r$ – różnica, $n$ – liczba wyrazów.",
          przyklad: "$a_1=3$, $r=2$, $n=10$: $S_{10}=\\frac{6+9\\cdot2}{2}\\cdot10=\\frac{24}{2}\\cdot10=120$.",
          uwaga: "W liczniku jest $2a_1$, a nie $a_1$. Ułamek $\\frac{\\dots}{2}$ mnożymy przez $n$ dopiero na końcu.",
        },
        {
          nazwa: "Suma „5 + 8 + 11 + … + 101”",
          slownie: "Gdy suma jest zapisana wypisanymi składnikami, najpierw liczymy, ile ich jest: z $a_n=a_1+(n-1)r$ wyznaczamy $n$, potem sumujemy.",
          przyklad: "$5+8+11+\\dots+101$: $r=3$ i $5+3(n-1)=101$, stąd $n=33$. $S_{33}=\\frac{5+101}{2}\\cdot33=53\\cdot33=1749$.",
          uwaga: "Liczba składników to $n$, a nie $a_n-a_1$ ani $\\frac{a_n-a_1}{r}$ – trzeba jeszcze dodać $1$.",
        },
        {
          nazwa: "Gotowe sumy",
          slownie: "Dwie często spotykane sumy wynikają ze wzoru: kolejne liczby naturalne i kolejne liczby nieparzyste.",
          tex: "1+2+\\dots+n=\\frac{n(n+1)}{2}\\qquad 1+3+\\dots+(2n-1)=n^2",
          przyklad: "$1+3+5+\\dots+19$ ma $10$ składników, więc suma to $10^2=100$.",
        },
      ],
      jak: [
        "Rozpoznaj ciąg arytmetyczny i zapisz $a_1$, $r$ (i $a_n$, jeśli jest podany).",
        "Gdy nie znasz $n$, wyznacz je z $a_n=a_1+(n-1)r$.",
        "Znasz $a_1$ i $a_n$: $S_n=\\frac{a_1+a_n}{2}\\cdot n$. Znasz $a_1$ i $r$: $S_n=\\frac{2a_1+(n-1)r}{2}\\cdot n$.",
        "Gdy suma jest dana, a szukasz $n$, powstaje równanie kwadratowe względem $n$; odrzuć $n$ ujemne.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "W ciągu arytmetycznym $a_1=4$ oraz $a_{10}=40$. Suma $S_{10}$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$440$", "$44$", "$220$", "$110$"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "W ciągu arytmetycznym $a_1=-2$ oraz $r=3$. Suma $S_8$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$68$", "$136$", "$80$", "$34$"],
          poprawna: 0,
        },
        {
          nr: "17",
          tresc: "Suma wszystkich liczb naturalnych dwucyfrowych $10+11+12+\\dots+99$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$4950$", "$9810$", "$4455$", "$4905$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "W ciągu arytmetycznym $a_1=7$ oraz $r=-2$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wyraz $a_{10}$ jest równy $-11$.", litery: "PF", poprawna: 0 },
            { tekst: "Suma $S_{10}$ jest równa $20$.", litery: "PF", poprawna: 1 },
            { tekst: "Suma $S_8$ jest równa $0$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "19",
          tresc: "Ile początkowych wyrazów ciągu arytmetycznego $3,\\ 7,\\ 11,\\ \\dots$ trzeba dodać, aby suma była równa $465$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$16$", "$15$", "$14$", "$31$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Oblicz sumę wszystkich liczb naturalnych trzycyfrowych podzielnych przez $5$. **Zapisz obliczenia.**",
          rozwiazanie:
            "Najmniejsza taka liczba to $100$, największa to $995$, a kolejne różnią się o $5$ – tworzą ciąg arytmetyczny o $r=5$.\n\n" +
            "Liczba wyrazów: $995=100+(n-1)\\cdot5$, stąd $n-1=179$ i $n=180$.\n\n" +
            "$S_{180}=\\frac{100+995}{2}\\cdot180=1095\\cdot90=98\\,550$.\n\n" +
            "Odpowiedź: suma jest równa $98\\,550$.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "W ciągu arytmetycznym $a_1=2$ oraz $S_{10}=155$. Wyznacz różnicę $r$ i wyraz $a_{20}$. **Zapisz obliczenia.**",
          rozwiazanie:
            "Ze wzoru $S_n=\\frac{2a_1+(n-1)r}{2}\\cdot n$: $155=\\frac{4+9r}{2}\\cdot10=5(4+9r)$.\n\n" +
            "Stąd $4+9r=31$, czyli $9r=27$ i $r=3$.\n\n" +
            "$a_{20}=a_1+19r=2+19\\cdot3=59$.\n\n" +
            "Odpowiedź: $r=3$, $a_{20}=59$.",
        },
      ],
      generatory: [
        { id: "suma-arytmetyczna", nazwa: "Suma Sn", opis: "Oblicz sumę początkowych wyrazów ciągu arytmetycznego z $a_1$ i $r$, z $a_1$ i $a_n$ albo z wypisanych składników.", generuj: genSumaArytm },
        { id: "suma-podzielnych", nazwa: "Suma liczb podzielnych", opis: "Oblicz sumę liczb dwucyfrowych albo trzycyfrowych podzielnych przez daną liczbę.", generuj: genSumaPodzielnych },
      ],
    },

    // ------------------------------------------------------------------ 2.5, 2.6
    {
      id: "ciag-geometryczny",
      nazwa: "Ciąg geometryczny i suma jego wyrazów",
      sciaga: [
        {
          nazwa: "Ciąg geometryczny",
          slownie: "Każdy wyraz (od drugiego) powstaje z poprzedniego przez pomnożenie przez tę samą liczbę $q$, zwaną ilorazem ciągu.",
          tex: "a_{n+1}=a_n\\cdot q\\qquad q=\\frac{a_{n+1}}{a_n}",
          litery: "$q$ – iloraz ciągu (wyrazy ciągu geometrycznego są różne od zera).",
          przyklad: "$3,\\ 6,\\ 12,\\ 24,\\ \\dots$ ma $q=2$; $81,\\ 27,\\ 9,\\ \\dots$ ma $q=\\frac{1}{3}$; $5,\\ -10,\\ 20,\\ \\dots$ ma $q=-2$.",
          uwaga: "Iloraz to dzielenie (następny przez poprzedni), nie odejmowanie: dla $2,\\ 6,\\ 18$ jest $q=\\frac{6}{2}=3$, a nie $4$.",
        },
        {
          nazwa: "Monotoniczność ciągu geometrycznego",
          slownie: "Przy $a_1>0$: dla $q>1$ ciąg rośnie, dla $0<q<1$ maleje, dla $q<0$ znaki wyrazów na przemian się zmieniają – ciąg nie jest monotoniczny.",
          tex: "q>1:\\ \\text{rosnący}\\qquad 0<q<1:\\ \\text{malejący}\\qquad q<0:\\ \\text{na przemian}",
          przyklad: "$64,\\ 32,\\ 16,\\ \\dots$ ($q=\\frac{1}{2}$) maleje; $1,\\ -2,\\ 4,\\ -8,\\ \\dots$ ($q=-2$) nie jest monotoniczny.",
          uwaga: "Dla $a_1<0$ jest odwrotnie: $-3,\\ -6,\\ -12,\\ \\dots$ ($q=2$) jest malejący.",
        },
        {
          nazwa: "Wzór na n-ty wyraz",
          slownie: "Aby dojść od $a_1$ do $a_n$, trzeba $n-1$ razy pomnożyć przez $q$.",
          tex: "a_n=a_1\\cdot q^{n-1}",
          litery: "$a_1$ – pierwszy wyraz, $q$ – iloraz, $n$ – numer wyrazu.",
          przyklad: "$a_1=3$, $q=2$: $a_6=3\\cdot2^5=96$.",
          uwaga: "Wykładnik to $n-1$, nie $n$. Przy ujemnym $q$ stawiaj nawias: $(-2)^{n-1}$.",
        },
        {
          nazwa: "Trzy kolejne wyrazy",
          slownie: "Kwadrat środkowego z trzech kolejnych wyrazów ciągu geometrycznego jest równy iloczynowi sąsiednich.",
          tex: "b^2=a\\cdot c",
          litery: "$a$, $b$, $c$ – trzy kolejne wyrazy (w tej kolejności).",
          przyklad: "Liczby $2$, $x$, $18$: $x^2=36$, więc $x=6$ (iloraz $3$) lub $x=-6$ (iloraz $-3$).",
          uwaga: "Równanie $b^2=ac$ ma zwykle dwa rozwiązania – odrzucamy jedno tylko wtedy, gdy zadanie wyklucza (np. wyrazy dodatnie).",
        },
        {
          nazwa: "Suma n początkowych wyrazów",
          slownie: "Sumę pierwszych $n$ wyrazów liczymy ze wzoru z ilorazem. Dla $q=1$ wszystkie wyrazy są równe, więc $S_n=n\\cdot a_1$.",
          tex: "S_n=a_1\\cdot\\frac{1-q^n}{1-q}\\qquad q\\neq 1",
          litery: "$a_1$ – pierwszy wyraz, $q$ – iloraz, $n$ – liczba wyrazów.",
          przyklad: "$a_1=3$, $q=2$, $n=5$: $S_5=3\\cdot\\frac{1-2^5}{1-2}=3\\cdot31=93$ (sprawdzenie: $3+6+12+24+48=93$).",
          uwaga: "Przy ujemnym $q$ nawias jest obowiązkowy: dla $q=-2$, $n=5$ mamy $q^5=(-2)^5=-32$.",
        },
      ],
      jak: [
        "Sprawdź, czy ciąg jest geometryczny: iloraz $\\frac{a_{n+1}}{a_n}$ jest stały.",
        "Z dwóch wyrazów $a_k$ i $a_m$ dostajesz $q^{m-k}=\\frac{a_m}{a_k}$; przy parzystym wykładniku uwzględnij znak $q$.",
        "Wyraz $a_n$: $a_n=a_1q^{n-1}$. Suma: $S_n=a_1\\frac{1-q^n}{1-q}$ (gdy $q\\neq1$).",
        "Trzy kolejne wyrazy zapisz jako $b^2=ac$ i rozwiąż równanie.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Iloraz ciągu geometrycznego $2,\\ -6,\\ 18,\\ \\dots$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-3$", "$3$", "$-4$", "$-\\frac{1}{3}$"],
          poprawna: 0,
        },
        {
          nr: "23",
          tresc: "W ciągu geometrycznym $a_1=5$ oraz $q=2$. Wyraz $a_7$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$640$", "$160$", "$17$", "$320$"],
          poprawna: 3,
        },
        {
          nr: "24",
          tresc: "Liczby $4$, $x$, $9$ są (w tej kolejności) kolejnymi wyrazami ciągu geometrycznego o wyrazach dodatnich. Liczba $x$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{13}{2}$", "$6$", "$36$", "$\\pm 6$"],
          poprawna: 1,
        },
        {
          nr: "25",
          tresc: "W ciągu geometrycznym $a_1=64$ oraz $q=\\frac{1}{2}$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Ciąg jest rosnący.", litery: "PF", poprawna: 1 },
            { tekst: "Wyraz $a_4$ jest równy $8$.", litery: "PF", poprawna: 0 },
            { tekst: "Suma $S_3$ jest równa $112$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "26",
          tresc: "Suma $S_5$ początkowych wyrazów ciągu geometrycznego $1,\\ -2,\\ 4,\\ \\dots$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$31$", "$33$", "$11$", "$-11$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 3,
          tresc: "W ciągu geometrycznym $a_2=6$ oraz $a_5=162$. Wyznacz iloraz $q$, pierwszy wyraz $a_1$ i sumę $S_5$. **Zapisz obliczenia.**",
          rozwiazanie:
            "Od $a_2$ do $a_5$ są $3$ kroki, więc $a_5=a_2\\cdot q^3$, czyli $162=6q^3$ i $q^3=27$.\n\n" +
            "Stąd $q=3$ oraz $a_1=\\frac{a_2}{q}=\\frac{6}{3}=2$.\n\n" +
            "$S_5=2\\cdot\\frac{1-3^5}{1-3}=2\\cdot\\frac{-242}{-2}=2\\cdot121=242$ (sprawdzenie: $2+6+18+54+162=242$).\n\n" +
            "Odpowiedź: $q=3$, $a_1=2$, $S_5=242$.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "Liczby $x-2$, $x+1$, $x+7$ są (w tej kolejności) kolejnymi wyrazami ciągu geometrycznego. Wyznacz $x$ i iloraz tego ciągu. **Zapisz obliczenia.**",
          rozwiazanie:
            "Warunek na trzy kolejne wyrazy: $(x+1)^2=(x-2)(x+7)$.\n\n" +
            "$x^2+2x+1=x^2+5x-14$, stąd $15=3x$ i $x=5$.\n\n" +
            "Dla $x=5$ liczby to $3$, $6$, $12$, więc $q=\\frac{6}{3}=2$.\n\n" +
            "Odpowiedź: $x=5$, $q=2$.",
        },
      ],
      generatory: [
        { id: "iloraz-i-wyraz", nazwa: "Wyraz i iloraz", opis: "Oblicz wyraz ciągu geometrycznego z $a_1$ i $q$ albo wyznacz iloraz z dwóch wyrazów.", generuj: genIlorazWyraz },
        { id: "suma-geometryczna", nazwa: "Suma Sn", opis: "Oblicz sumę początkowych wyrazów ciągu geometrycznego ze wzoru z ilorazem.", generuj: genSumaGeom },
      ],
    },

    // ------------------------------------------------------------------ 2.7
    {
      id: "zadania-rozne",
      nazwa: "Ciąg arytmetyczny i geometryczny – zadania różne",
      sciaga: [
        {
          nazwa: "Arytmetyczny czy geometryczny?",
          slownie: "W ciągu arytmetycznym kolejne wyrazy różnią się o stałą liczbę (dodajemy $r$), w geometrycznym kolejne wyrazy mają stały iloraz (mnożymy przez $q$).",
          tex: "a_n=a_1+(n-1)r\\qquad a_n=a_1q^{n-1}",
          przyklad: "$2,\\ 6,\\ 10,\\ \\dots$ – arytmetyczny ($r=4$). $2,\\ 6,\\ 18,\\ \\dots$ – geometryczny ($q=3$). $1,\\ 4,\\ 9,\\ \\dots$ – ani jeden, ani drugi.",
          uwaga: "Ciąg o wzorze liniowym względem $n$ (np. $a_n=3n+1$) jest arytmetyczny; ciąg $a_n=3\\cdot2^n$ jest geometryczny.",
        },
        {
          nazwa: "Warunki na trzy wyrazy",
          slownie: "Trzy liczby w podanej kolejności: sprawdzamy warunek na środkowy wyraz.",
          tex: "\\text{arytm.}:\\ 2b=a+c\\qquad \\text{geom.}:\\ b^2=a\\cdot c",
          litery: "$a$, $b$, $c$ – trzy kolejne wyrazy.",
          przyklad: "Liczby $5$, $x$, $20$ tworzą ciąg geometryczny: $x^2=100$, $x=10$ lub $x=-10$. Tworzą ciąg arytmetyczny: $2x=25$, $x=12{,}5$.",
        },
        {
          nazwa: "Dwa warunki – układ równań",
          slownie: "Gdy dane są dwa warunki na wyrazy lub sumy, zapisujemy je przez $a_1$ i $r$ (albo $a_1$ i $q$) i rozwiązujemy układ równań.",
          przyklad: "$a_2+a_4=14$ i $a_5=13$: $2a_1+4r=14$ oraz $a_1+4r=13$. Odejmujemy równania: $a_1=1$, potem $4r=12$, $r=3$. Sprawdzenie: $a_2+a_4=4+10=14$.",
          uwaga: "Po rozwiązaniu sprawdź oba warunki na wyliczonych liczbach.",
        },
        {
          nazwa: "Trzy liczby: a − r, a, a + r",
          slownie: "Trzy kolejne wyrazy ciągu arytmetycznego wygodnie zapisać jako $a-r$, $a$, $a+r$: suma upraszcza się do $3a$. Dla geometrycznego: $\\frac{a}{q}$, $a$, $aq$.",
          tex: "(a-r)+a+(a+r)=3a",
          przyklad: "Suma trzech liczb w ciągu arytmetycznym to $27$, iloczyn $693$: $3a=27$, $a=9$; $9(81-r^2)=693$, $r^2=4$, $r=\\pm2$. Liczby: $7$, $9$, $11$.",
        },
      ],
      jak: [
        "Ustal, jaki to ciąg: arytmetyczny (stała różnica) czy geometryczny (stały iloraz).",
        "Zapisz dane przez $a_1$ i $r$ (albo $q$) albo przez $a-r$, $a$, $a+r$.",
        "Ułóż równania z warunków zadania i rozwiąż je.",
        "Sprawdź wynik na liczbach z treści.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "W ciągu arytmetycznym $a_4=10$ oraz $a_9=25$. Pierwszy wyraz tego ciągu jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$3$", "$1$", "$-2$"],
          poprawna: 2,
        },
        {
          nr: "30",
          tresc: "Suma trzech kolejnych wyrazów ciągu arytmetycznego jest równa $42$. Środkowy z tych wyrazów jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$", "$21$", "$7$", "$12$"],
          poprawna: 0,
        },
        {
          nr: "31",
          tresc: "Liczby $x$, $x+3$, $x+9$ są (w tej kolejności) kolejnymi wyrazami ciągu geometrycznego. Liczba $x$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$9$", "$1$", "$3$"],
          poprawna: 3,
        },
        {
          nr: "32",
          tresc: "W ciągu geometrycznym o wyrazach dodatnich $a_2=6$ oraz $a_4=24$. Wyraz $a_5$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$96$", "$48$", "$33$", "$12$"],
          poprawna: 1,
        },
        {
          nr: "33",
          tresc: "Dane są ciągi $a_n=3n+1$, $b_n=3\\cdot2^n$ oraz $c_n=n^2$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Ciąg $(a_n)$ jest arytmetyczny.", litery: "PF", poprawna: 0 },
            { tekst: "Ciąg $(b_n)$ jest arytmetyczny.", litery: "PF", poprawna: 1 },
            { tekst: "Ciąg $(c_n)$ nie jest ani arytmetyczny, ani geometryczny.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 3,
          tresc: "Trzy liczby tworzą ciąg arytmetyczny. Ich suma jest równa $21$, a suma ich kwadratów $155$. Wyznacz te liczby. **Zapisz obliczenia.**",
          rozwiazanie:
            "Oznaczamy liczby $a-r$, $a$, $a+r$. Suma: $3a=21$, więc $a=7$.\n\n" +
            "Suma kwadratów: $(7-r)^2+49+(7+r)^2=155$, czyli $147+2r^2=155$.\n\n" +
            "Stąd $2r^2=8$, $r^2=4$, $r=2$ lub $r=-2$.\n\n" +
            "Liczby: $5$, $7$, $9$ (dla $r=-2$ te same liczby w odwrotnej kolejności). Sprawdzenie: $25+49+81=155$.\n\n" +
            "Odpowiedź: liczby $5$, $7$, $9$.",
        },
        {
          nr: "35",
          punkty: 3,
          tresc: "W ciągu arytmetycznym $a_2+a_4=14$ oraz $a_5=13$. Wyznacz $a_1$, $r$ i sumę $S_{10}$. **Zapisz obliczenia.**",
          rozwiazanie:
            "$a_2+a_4=(a_1+r)+(a_1+3r)=2a_1+4r=14$ oraz $a_5=a_1+4r=13$.\n\n" +
            "Odejmujemy drugie równanie od pierwszego: $a_1=1$. Wtedy $4r=12$ i $r=3$.\n\n" +
            "$a_{10}=1+9\\cdot3=28$, więc $S_{10}=\\frac{1+28}{2}\\cdot10=145$.\n\n" +
            "Odpowiedź: $a_1=1$, $r=3$, $S_{10}=145$.",
        },
      ],
      generatory: [
        { id: "trzy-arytmetyczne", nazwa: "Trzy wyrazy – arytmetyczny", opis: "Dla jakiego $x$ trzy wyrażenia tworzą ciąg arytmetyczny (warunek $2b=a+c$).", generuj: genTrzyArytm },
        { id: "trzy-geometryczne", nazwa: "Trzy wyrazy – geometryczny", opis: "Dla jakich $x$ trzy wyrażenia tworzą ciąg geometryczny (warunek $b^2=ac$, dwa rozwiązania).", generuj: genTrzyGeom },
      ],
    },

    // ------------------------------------------------------------------ 2.8
    {
      id: "lokaty-kredyty",
      nazwa: "Lokaty pieniężne i kredyty bankowe",
      sciaga: [
        {
          nazwa: "Procent składany",
          slownie: "Po każdym okresie kapitalizacji odsetki są doliczane do kapitału, więc w następnym okresie procent liczymy od większej kwoty.",
          tex: "K_n=K\\left(1+\\frac{p}{100}\\right)^n",
          litery: "$K$ – kwota początkowa, $p$ – oprocentowanie w okresie (w %), $n$ – liczba okresów, $K_n$ – kwota po $n$ okresach.",
          przyklad: "$5000$ zł, $10\\%$ rocznie, $3$ lata: $K_3=5000\\cdot1{,}1^3=5000\\cdot1{,}331=6655$ zł.",
          uwaga: "To nie to samo co odsetki proste: $5000+3\\cdot500=6500$ zł. Przy procencie składanym kwota rośnie szybciej.",
        },
        {
          nazwa: "Czynnik wzrostu i odsetki",
          slownie: "Liczba $q=1+\\frac{p}{100}$ pokazuje, ile razy rośnie kwota w jednym okresie. Kwoty po kolejnych okresach tworzą ciąg geometryczny. Odsetki to różnica końcowej i początkowej kwoty.",
          tex: "K_n=K\\cdot q^n\\qquad \\text{odsetki}=K_n-K",
          przyklad: "$10\\%$: $q=1{,}1$; $20\\%$: $q=1{,}2$; $5\\%$: $q=1{,}05$. Dla $1000$ zł i $20\\%$ przez $2$ lata: $1000\\cdot1{,}44=1440$ zł, odsetki $440$ zł.",
          uwaga: "Odsetki to $K_n-K$, a nie $K_n$. Jeśli odsetki są opodatkowane, podatek liczymy od odsetek, a nie od całej kwoty.",
        },
        {
          nazwa: "Częstsza kapitalizacja",
          slownie: "Gdy odsetki są doliczane co pół roku, stopę roczną dzielimy na dwa okresy, a liczbę okresów podwajamy. Dalej liczymy tym samym wzorem.",
          tex: "K_k=K\\left(1+\\frac{p}{100}\\right)^k",
          litery: "$p$ – stopa za jeden okres (np. półrocze), $k$ – liczba okresów.",
          przyklad: "$10\\,000$ zł, $20\\%$ rocznie, kapitalizacja półroczna, $2$ lata: stopa za półrocze $10\\%$, okresów $4$. $K_4=10\\,000\\cdot1{,}1^4=10\\,000\\cdot1{,}4641=14\\,641$ zł.",
          uwaga: "Nie wolno użyć $20\\%$ za każde półrocze – stopa roczna dotyczy całego roku.",
        },
        {
          nazwa: "Kredyt spłacany w ratach",
          slownie: "Dług rośnie o odsetki, a każda wpłacona rata go zmniejsza. Odsetki w kolejnym okresie naliczane są od tej kwoty długu, która jeszcze została.",
          przyklad: "Kredyt $2100$ zł, $10\\%$ rocznie, dwie równe raty $x$ na koniec 1. i 2. roku. Po roku dług to $2100\\cdot1{,}1=2310$, po racie $2310-x$. Po drugim roku: $(2310-x)\\cdot1{,}1-x=0$, czyli $2541=2{,}1x$ i $x=1210$ zł.",
          uwaga: "Rata jest płacona po naliczeniu odsetek za dany rok – najpierw dług mnożymy przez $q$, dopiero potem odejmujemy ratę.",
        },
        {
          nazwa: "Kredyt: raty kapitałowe i odsetki",
          slownie: "Gdy spłacamy co roku tę samą część kapitału, odsetki liczone od malejącego długu maleją o stałą kwotę – tworzą ciąg arytmetyczny.",
          tex: "\\text{odsetki}=\\frac{p}{100}\\cdot\\text{dług}",
          przyklad: "Kredyt $8000$ zł na $4$ lata, co roku $2000$ zł kapitału, $5\\%$ od pozostałego długu: odsetki $400,\\ 300,\\ 200,\\ 100$ zł ($r=-100$). Suma odsetek: $\\frac{400+100}{2}\\cdot4=1000$ zł.",
        },
      ],
      jak: [
        "Wypisz dane: kwota $K$, oprocentowanie $p$ w jednym okresie, liczba okresów $n$.",
        "Oblicz czynnik wzrostu $q=1+\\frac{p}{100}$ (np. $10\\%\\to1{,}1$).",
        "Kwota końcowa: $K_n=K\\cdot q^n$; odsetki: $K_n-K$.",
        "Przy kapitalizacji półrocznej dziel stopę roczną przez $2$ i podwój liczbę okresów.",
        "W zadaniu o kredycie śledź dług rok po roku: dług $\\cdot q$, potem minus rata.",
      ],
      zadania: [
        {
          nr: "36",
          tresc: "Na lokatę z roczną kapitalizacją odsetek wpłacono $4000$ zł. Oprocentowanie wynosi $5\\%$ w skali roku. Po $2$ latach na lokacie będzie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$4400$ zł", "$4410$ zł", "$4200$ zł", "$8400$ zł"],
          poprawna: 1,
        },
        {
          nr: "37",
          tresc: "Na lokatę z roczną kapitalizacją odsetek wpłacono $10\\,000$ zł przy oprocentowaniu $10\\%$ w skali roku. Odsetki po $2$ latach wyniosą: **Wybierz właściwą odpowiedź.**",
          opcje: ["$2100$ zł", "$12\\,100$ zł", "$2000$ zł", "$1000$ zł"],
          poprawna: 0,
        },
        {
          nr: "38",
          tresc: "Na lokatę wpłacono $5000$ zł. Roczne oprocentowanie wynosi $20\\%$, a odsetki są doliczane co pół roku. Po roku na lokacie będzie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$6000$ zł", "$7200$ zł", "$5500$ zł", "$6050$ zł"],
          poprawna: 3,
        },
        {
          nr: "39",
          tresc: "Na lokatę z roczną kapitalizacją wpłacono $1000$ zł przy oprocentowaniu $10\\%$ w skali roku. Po ilu pełnych latach kwota na lokacie przekroczy $1300$ zł? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$", "$4$", "$3$", "$30$"],
          poprawna: 2,
        },
        {
          nr: "40",
          tresc: "Kredyt $12\\,000$ zł spłacono w czterech rocznych ratach kapitałowych po $3000$ zł. Co roku bank naliczał $10\\%$ odsetek od kwoty długu pozostałej do spłaty przed wpłatą raty. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Odsetki za pierwszy rok wyniosły $1200$ zł.", litery: "PF", poprawna: 0 },
            { tekst: "Suma odsetek za wszystkie cztery lata wyniosła $3600$ zł.", litery: "PF", poprawna: 1 },
            { tekst: "Odsetki za kolejne lata tworzą ciąg arytmetyczny o różnicy $-300$ zł.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "41",
          punkty: 3,
          tresc: "Kredyt w wysokości $1100$ zł jest oprocentowany $20\\%$ w skali roku. Spłacono go dwiema równymi ratami płatnymi na koniec pierwszego i drugiego roku. Oblicz wysokość jednej raty. **Zapisz obliczenia.**",
          rozwiazanie:
            "Niech $x$ będzie ratą. Po pierwszym roku dług wynosi $1100\\cdot1{,}2=1320$, a po wpłacie raty $1320-x$.\n\n" +
            "Po drugim roku dług wynosi $(1320-x)\\cdot1{,}2$ i po drugiej racie jest równy zero: $(1320-x)\\cdot1{,}2-x=0$.\n\n" +
            "$1584-1{,}2x-x=0$, czyli $2{,}2x=1584$.\n\n" +
            "$x=720$. Sprawdzenie: $1320-720=600$, $600\\cdot1{,}2=720$, a rata $720$ spłaca resztę.\n\n" +
            "Odpowiedź: rata wynosi $720$ zł.",
        },
        {
          nr: "42",
          punkty: 2,
          tresc: "Na lokatę wpłacono $6000$ zł na $3$ lata przy oprocentowaniu $10\\%$ w skali roku. Oblicz odsetki przy rocznej kapitalizacji odsetek i porównaj je z odsetkami, które byłyby bez kapitalizacji (co roku $10\\%$ od $6000$ zł). **Zapisz obliczenia.**",
          rozwiazanie:
            "Z kapitalizacją: $K_3=6000\\cdot1{,}1^3=6000\\cdot1{,}331=7986$ zł, więc odsetki to $7986-6000=1986$ zł.\n\n" +
            "Bez kapitalizacji: co roku $0{,}1\\cdot6000=600$ zł, w ciągu $3$ lat $1800$ zł.\n\n" +
            "Różnica: $1986-1800=186$ zł.\n\n" +
            "Odpowiedź: odsetki z kapitalizacją to $1986$ zł, bez kapitalizacji $1800$ zł – o $186$ zł mniej.",
        },
      ],
      generatory: [
        { id: "procent-skladany", nazwa: "Lokata", opis: "Stan konta, odsetki, kapitalizacja półroczna albo liczba lat potrzebna do przekroczenia kwoty (procent składany).", generuj: genLokata },
        { id: "rata-kredytu", nazwa: "Rata kredytu", opis: "Wysokość równej raty kredytu spłacanego na koniec kolejnych lat (dwie albo trzy raty).", generuj: genRataKredytu },
      ],
    },
  ],
};
