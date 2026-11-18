// Klasa 3 (liceum i technikum) · rozdział 1 „Ułamki algebraiczne. Równania wymierne” – Matematyka 3, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Zgodnie z podstawą z 2024 r.: bez dodawania i odejmowania ułamków algebraicznych oraz bez równań wymiernych z rozkładem
// wielomianów (zakres rozszerzony), bez nierówności wymiernych. Funkcja homograficzna: y = a/x i jej przesunięcia.
import { Q, wielomianTex, plusMinus } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** x - p w LaTeX: lin(3) = "x - 3", lin(-3) = "x + 3", lin(0) = "x". */
const lin = (p) => (p === 0 ? "x" : p > 0 ? `x - ${p}` : `x + ${-p}`);

/** x + c w LaTeX: xp(3) = "x + 3". */
const xp = (c) => lin(-c);

/** Czynnik (x - p) w nawiasie, a dla p = 0 samo x. */
const par = (p) => (p === 0 ? "x" : `(${lin(p)})`);

/** Współczynnik przed literą: 1 się pomija, -1 daje "-". */
const wsp = (n) => (n === 1 ? "" : n === -1 ? "-" : String(n));

const fr = (a, b) => `\\frac{${a}}{${b}}`;

/** Ułamek ze stałym licznikiem; minus przed kreską ułamkową. */
const frZ = (a, mian) => (a < 0 ? `-\\frac{${-a}}{${mian}}` : `\\frac{${a}}{${mian}}`);

/** c(x - p) zapisane tak, by nie było „1x”: mulLin(2, 3) = "2(x - 3)", mulLin(1, 3) = "x - 3", mulLin(2, 0) = "2x". */
const mulLin = (c, p) => {
  if (p === 0) return c === 1 ? "x" : c === -1 ? "-x" : `${c}x`;
  return c === 1 ? lin(p) : c === -1 ? `-(${lin(p)})` : `${c}(${lin(p)})`;
};

/** Zbiór liczb rzeczywistych bez podanych liczb, np. wykl([3, -1]) daje \mathbb{R}\setminus\{-1,\,3\}. */
const wykl = (vals) => `\\mathbb{R}\\setminus\\{${vals.map((v) => Q.z(v)).sort((a, b) => a.cmp(b)).map((v) => v.tex()).join(",\\,")}\\}`;
const D = (...v) => `$${wykl(v)}$`;

/** Odpowiedź do pola: liczba jako tekst ("3", "-3", "3/2"). */
const odp = (v) => Q.z(v).toString();

/** Liczba godzin w bierniku: 1 godzinę, 2 godziny, 5 godzin, 12 godzin, 22 godziny. */
const godz = (n) => `${n} ${n === 1 ? "godzinę" : n % 10 >= 2 && n % 10 <= 4 && !(n % 100 >= 12 && n % 100 <= 14) ? "godziny" : "godzin"}`;

/** Zapis rozwiązań w treści wyniku: "$x=1$", "$x=1$ lub $x=2$". */
const wynikX = (vals) => vals.map((v) => `$x=${Q.z(v).tex()}$`).join(" lub ");

/** Założenia: "$x\neq 3$ i $x\neq -2$", "$x\neq 1$, $x\neq 3$ i $x\neq -2$". */
const zalozenia = (vals) => {
  const z = vals.map((v) => `$x\\neq ${Q.z(v).tex()}$`);
  return z.length < 2 ? z.join("") : `${z.slice(0, -1).join(", ")} i ${z[z.length - 1]}`;
};

/** c(wyrażenie), a dla c = 1 samo wyrażenie (bez „1(…)”). */
const mn = (c, w) => (c === 1 ? w : `${c}(${w})`);

/** Zdanie o równaniu postaci kx = b: dodaje „czyli x = …” tylko wtedy, gdy k ≠ 1. */
const zbieranie = (k, b, x0) => (k === 1 ? `$x=${b}$` : `$${wsp(k)}x=${b}$, czyli $x=${x0}$`);

/** Wzór funkcji a/(x - p) + q (q = 0 pomijane). */
const fHom = (a, p, qq) => `${frZ(a, lin(p))}${qq === 0 ? "" : ` ${plusMinus(qq)}`}`;

/** Zapis liczby a / d, gdy a jest niewiadomą: aNad(1) = "a", aNad(-2) = "-\frac{a}{2}". */
const aNad = (d) => (d === 1 ? "a" : d === -1 ? "-a" : d > 0 ? `\\frac{a}{${d}}` : `-\\frac{a}{${-d}}`);

/** Losuje z funkcji, aż wynik będzie „ładny”; po 500 próbach zgłasza błąd (błąd w generatorze, nie w danych). */
function szukaj(f) {
  for (let i = 0; i < 500; i++) {
    const w = f(i);
    if (w) return w;
  }
  throw new Error("generator: nie znaleziono ładnych danych");
}

const ladnyQ = (v, max = 400) => v.d <= 12 && Math.abs(v.n) <= max;

// --- Generatory ułamków algebraicznych (temat 1 i 2)

/** Dziedzina ułamka: wskazanie liczb, dla których mianownik jest zerem. */
function genDziedzina(r) {
  const rodzaj = r.int(0, 4);
  const c = r.intBez(-9, 9, 0);
  const licznikLiczba = r.chance(0.5);
  let mian, zera, krok;
  if (rodzaj === 0) {
    const a = r.intBez(-9, 9, 0);
    mian = lin(a);
    zera = [a];
    krok = `stąd $x=${a}$`;
  } else if (rodzaj === 1) {
    const a = r.int(-8, 8);
    const b = r.intBez(-8, 8, a);
    mian = `${par(a)}${par(b)}`;
    zera = [a, b];
    krok = `iloczyn jest równy zero, gdy któryś czynnik jest równy zero: $${lin(a)}=0$ lub $${lin(b)}=0$, czyli $x=${a}$ lub $x=${b}$`;
  } else if (rodzaj === 2) {
    const a = r.int(2, 7);
    mian = `x^2 - ${a * a}`;
    zera = [-a, a];
    krok = `$(x-${a})(x+${a})=0$, czyli $x=${-a}$ lub $x=${a}$`;
  } else if (rodzaj === 3) {
    const k = r.int(2, 4);
    const m = r.intBez(-9, 9, 0);
    mian = wielomianTex([k, -m]);
    zera = [new Q(m, k)];
    krok = `stąd $${k}x=${m}$, czyli $x=${new Q(m, k).tex()}$`;
  } else {
    const a = r.intBez(-8, 8, 0);
    mian = wielomianTex([1, -a, 0]);
    zera = [0, a];
    krok = `$x(${lin(a)})=0$, czyli $x=0$ lub $x=${a}$`;
  }
  const licznik = licznikLiczba ? null : wielomianTex([1, c]);
  const ulamek = licznikLiczba ? frZ(c, mian) : fr(licznik, mian);
  return {
    tresc: `Dla jakich liczb rzeczywistych $x$ ułamek $${ulamek}$ nie jest określony? Podaj wszystkie takie liczby.`,
    pola: [{ id: "x", typ: "zbior", ile: zera.length, etykieta: "Liczby $x$" }],
    odpowiedz: { x: zera.map(odp) },
    wynik: wynikX(zera),
    rozwiazanie: [
      "Ułamek nie ma sensu, gdy mianownik jest równy zero.",
      `Rozwiązujemy $${mian}=0$: ${krok}.`,
      `Dziedzina ułamka: $x\\in${wykl(zera)}$ – dla pozostałych liczb ułamek jest określony.`,
    ],
  };
}

/** Skracanie ułamka i obliczenie jego wartości. */
function genSkracanie(r) {
  const rodzaj = r.int(0, 4);
  let d;
  if (rodzaj === 0) {
    const a = r.int(2, 7);
    d = {
      tex: fr(wielomianTex([1, 0, -a * a]), xp(a)),
      fakt: fr(`(${lin(a)})(${xp(a)})`, xp(a)),
      prost: lin(a),
      wyl: [-a],
      orig: (x) => new Q(x * x - a * a, x + a),
      pr: (x) => new Q(x - a),
    };
  } else if (rodzaj === 1) {
    const a = r.int(2, 7);
    d = {
      tex: fr(wielomianTex([1, 0, -a * a]), wielomianTex([1, -2 * a, a * a])),
      fakt: fr(`(${lin(a)})(${xp(a)})`, `(${lin(a)})^2`),
      prost: fr(xp(a), lin(a)),
      wyl: [a],
      orig: (x) => new Q(x * x - a * a, (x - a) ** 2),
      pr: (x) => new Q(x + a, x - a),
    };
  } else if (rodzaj === 2) {
    const k = r.int(2, 5);
    const b = r.intBez(-6, 6, 0);
    d = {
      tex: fr(wielomianTex([k, k * b]), wielomianTex([1, b, 0])),
      fakt: fr(`${k}(${xp(b)})`, `x(${xp(b)})`),
      prost: fr(k, "x"),
      wyl: [0, -b],
      orig: (x) => new Q(k * x + k * b, x * x + b * x),
      pr: (x) => new Q(k, x),
    };
  } else if (rodzaj === 3) {
    const a = r.intBez(-6, 6, 0);
    d = {
      tex: fr(wielomianTex([1, 2 * a, a * a]), wielomianTex([1, 0, -a * a])),
      fakt: fr(`(${xp(a)})^2`, `(${lin(a)})(${xp(a)})`),
      prost: fr(xp(a), lin(a)),
      wyl: [a, -a],
      orig: (x) => new Q(x * x + 2 * a * x + a * a, x * x - a * a),
      pr: (x) => new Q(x + a, x - a),
    };
  } else {
    const k = r.int(2, 4);
    const a = r.intBez(-5, 5, 0);
    d = {
      tex: fr(wielomianTex([k, 0, -k * a * a]), wielomianTex([1, -2 * a, a * a])),
      fakt: fr(`${k}(${lin(a)})(${xp(a)})`, `(${lin(a)})^2`),
      prost: fr(`${k}(${xp(a)})`, lin(a)),
      wyl: [a],
      orig: (x) => new Q(k * (x * x - a * a), (x - a) ** 2),
      pr: (x) => new Q(k * (x + a), x - a),
    };
  }
  const { x0, wart } = szukaj(() => {
    const x = r.int(-8, 8);
    if (d.wyl.includes(x)) return null;
    const w = d.orig(x);
    if (!w.eq(d.pr(x))) throw new Error("generator: skrócony ułamek różni się od danego");
    return ladnyQ(w) ? { x0: x, wart: w } : null;
  });
  return {
    tresc: `Skróć ułamek $${d.tex}$ (dla liczb, dla których jest określony), a następnie oblicz jego wartość dla $x=${x0}$.`,
    pola: [{ id: "w", typ: "liczba", etykieta: "Wartość ułamka" }],
    odpowiedz: { w: odp(wart) },
    wynik: `$${wart.tex()}$`,
    rozwiazanie: [
      `Założenie: ${zalozenia(d.wyl)}.`,
      `Rozkładamy licznik i mianownik na czynniki: $${d.fakt}$.`,
      `Skracamy wspólny czynnik: $${d.prost}$.`,
      `Liczba $${x0}$ spełnia założenie. Dla $x=${x0}$ ułamek ma wartość $${wart.tex()}$.`,
    ],
  };
}

/** Iloczyn i iloraz ułamków algebraicznych: uproszczenie i wartość dla wybranej liczby. */
function genDzialania(r) {
  const rodzaj = r.int(0, 2);
  let d;
  if (rodzaj === 0) {
    const a = r.int(2, 6);
    const b = szukaj(() => { const v = r.intBez(-6, 6, 0); return v !== a && v !== -a ? v : null; });
    const k = r.int(1, 4);
    const m = r.int(1, 3);
    const nk = (s) => (k === 1 ? s : `${k}(${s})`);
    const mk = (s) => (m === 1 ? s : `${m}(${s})`);
    const wynik = (s) => (m === 1 ? nk(s) : fr(nk(s), String(m)));
    d = {
      wyr: `${fr(wielomianTex([1, 0, -a * a]), xp(b))}\\cdot${fr(nk(xp(b)), mk(lin(a)))}`,
      kroki: [
        `Założenia: ${zalozenia([-b, a])}.`,
        `Rozkładamy liczniki i mianowniki: $${fr(`(${lin(a)})(${xp(a)})`, xp(b))}\\cdot${fr(nk(xp(b)), mk(lin(a)))}$.`,
        `Skracamy $(${xp(b)})$ i $(${lin(a)})$: $${wynik(xp(a))}$.`,
      ],
      wyl: [-b, a],
      f: (x) => new Q(k * (x + a), m),
      prost: wynik(xp(a)),
    };
  } else if (rodzaj === 1) {
    const ps = r.shuffle([-7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7]).slice(0, 3);
    const [p1, p2, p3] = ps;   // x ≠ p1 (mianownik), x ≠ p2 (mianownik dzielnika), x ≠ p3 (licznik dzielnika)
    d = {
      wyr: `${fr(lin(p3), lin(p1))}:${fr(lin(p3), lin(p2))}`,
      kroki: [
        `Założenia: mianowniki i dzielnik różne od zera: ${zalozenia([p1, p2, p3])}.`,
        `Dzielenie zamieniamy na mnożenie przez odwrotność: $${fr(lin(p3), lin(p1))}\\cdot${fr(lin(p2), lin(p3))}$.`,
        `Skracamy $(${lin(p3)})$: $${fr(lin(p2), lin(p1))}$.`,
      ],
      wyl: [p1, p2, p3],
      f: (x) => new Q(x - p2, x - p1),
      prost: fr(lin(p2), lin(p1)),
    };
  } else {
    const a = r.int(2, 6);
    const b = szukaj(() => { const v = r.intBez(-6, 6, 0); return v !== a && v !== -a ? v : null; });
    const k = r.int(2, 4);
    d = {
      wyr: `${fr(wielomianTex([1, 0, -a * a]), lin(b))}:${fr(xp(a), `${k}(${lin(b)})`)}`,
      kroki: [
        `Założenia: ${zalozenia([b, -a])} (mianowniki i dzielnik różne od zera).`,
        `Mnożymy przez odwrotność dzielnika i rozkładamy: $${fr(`(${lin(a)})(${xp(a)})`, lin(b))}\\cdot${fr(`${k}(${lin(b)})`, xp(a))}$.`,
        `Skracamy $(${xp(a)})$ i $(${lin(b)})$: $${k}(${lin(a)})$.`,
      ],
      wyl: [b, -a],
      f: (x) => new Q(k * (x - a)),
      prost: `${k}(${lin(a)})`,
    };
  }
  const { x0, wart } = szukaj(() => {
    const x = r.int(-8, 8);
    if (d.wyl.includes(x)) return null;
    const w = d.f(x);
    return ladnyQ(w) ? { x0: x, wart: w } : null;
  });
  return {
    tresc: `Uprość wyrażenie $${d.wyr}$ i oblicz jego wartość dla $x=${x0}$.`,
    pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
    odpowiedz: { w: odp(wart) },
    wynik: `$${wart.tex()}$`,
    rozwiazanie: [...d.kroki, `Dla $x=${x0}$ (liczba spełnia założenia) otrzymujemy $${wart.tex()}$.`],
  };
}

/** Założenia przy dzieleniu ułamków algebraicznych (także dzielnik różny od zera). */
function genZalozeniaDzielenie(r) {
  if (r.chance(0.6)) {
    const [p1, p2, p3] = r.shuffle([-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7]).slice(0, 3);
    const a = r.intBez(-7, 7, 0);
    return {
      tresc: `Dla jakich liczb rzeczywistych $x$ wyrażenie $${fr(xp(a), lin(p1))}:${fr(lin(p2), lin(p3))}$ nie ma sensu? Podaj wszystkie takie liczby.`,
      pola: [{ id: "x", typ: "zbior", ile: 3, etykieta: "Liczby $x$" }],
      odpowiedz: { x: [p1, p2, p3].map(odp) },
      wynik: wynikX([p1, p2, p3]),
      rozwiazanie: [
        `Pierwszy mianownik: $${lin(p1)}\\neq 0$, czyli $x\\neq ${p1}$.`,
        `Mianownik dzielnika: $${lin(p3)}\\neq 0$, czyli $x\\neq ${p3}$.`,
        `Dzielnik nie może być zerem: $${lin(p2)}\\neq 0$, czyli $x\\neq ${p2}$.`,
        `Wyrażenie nie ma sensu dla: $x=${[p1, p2, p3].sort((u, v) => u - v).join("$, $x=")}$.`,
      ],
    };
  }
  const m = r.int(2, 3);
  const n = szukaj(() => { const v = r.intBez(-9, 9, 0); return v % m !== 0 ? v : null; });
  const p1 = r.int(-6, 6);
  const p3 = r.intBez(-6, 6, p1);
  const k = r.int(1, 9);
  const zero = new Q(n, m);
  const wszystkie = [p1, p3, zero];
  return {
    tresc: `Dla jakich liczb rzeczywistych $x$ wyrażenie $${fr(k, lin(p1))}:${fr(wielomianTex([m, -n]), lin(p3))}$ nie ma sensu? Podaj wszystkie takie liczby.`,
    pola: [{ id: "x", typ: "zbior", ile: 3, etykieta: "Liczby $x$" }],
    odpowiedz: { x: wszystkie.map(odp) },
    wynik: wynikX(wszystkie),
    rozwiazanie: [
      `Pierwszy mianownik: $${lin(p1)}\\neq 0$, czyli $x\\neq ${p1}$.`,
      `Mianownik dzielnika: $${lin(p3)}\\neq 0$, czyli $x\\neq ${p3}$.`,
      `Dzielnik nie może być zerem: $${wielomianTex([m, -n])}\\neq 0$, czyli $x\\neq ${zero.tex()}$.`,
      `Wyrażenie nie ma sensu dla trzech liczb: ${wynikX(wszystkie)}.`,
    ],
  };
}

// --- Generatory równań wymiernych (temat 3)

/** (px + a)/(x - b) = m, rozwiązanie całkowite. */
function genRownanieLiczba(r) {
  const { p, a, b, m, x0 } = szukaj(() => {
    const x = r.int(-8, 8);
    const b2 = r.int(-6, 6);
    if (x === b2) return null;
    const p2 = r.int(1, 3);
    const m2 = r.pick([2, 3, 4, 5, -1, -2, -3]);
    if (m2 === p2) return null;
    const a2 = m2 * (x - b2) - p2 * x;
    return Math.abs(a2) <= 15 ? { p: p2, a: a2, b: b2, m: m2, x0: x } : null;
  });
  const licz = wielomianTex([p, a]);
  return {
    tresc: `Rozwiąż równanie $${fr(licz, lin(b))}=${m}$.`,
    pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }],
    odpowiedz: { x: odp(x0) },
    wynik: `$x=${x0}$`,
    rozwiazanie: [
      b === 0 ? "Dziedzina: $x\\neq 0$." : `Dziedzina: $${lin(b)}\\neq 0$, czyli $x\\neq ${b}$.`,
      `Mnożymy obie strony przez $${lin(b)}$: $${licz}=${mulLin(m, b)}$.`,
      ...(b === 0 ? [] : [`Opuszczamy nawias: $${licz}=${wielomianTex([m, -m * b])}$.`]),
      `Zbieramy wyrazy z $x$ po jednej stronie: ${zbieranie(m - p, a + m * b, x0)}.`,
      `Sprawdzenie dziedziny: $${x0}\\neq ${b}$, więc rozwiązaniem jest $x=${x0}$.`,
    ],
  };
}

/** Proporcja a/(x - b) = c/(x - d), mnożenie na krzyż. */
function genRownanieKrzyz(r) {
  const { a, b, c, d, x0 } = szukaj(() => {
    const a2 = r.int(1, 6);
    const c2 = r.int(1, 6);
    if (a2 === c2) return null;
    const x = r.int(-8, 8);
    const b2 = r.int(-6, 6);
    if (x === b2) return null;
    const dd = x - (c2 * (x - b2)) / a2;
    if (!Number.isInteger(dd) || dd === x || dd === b2 || Math.abs(dd) > 9) return null;
    return { a: a2, b: b2, c: c2, d: dd, x0: x };
  });
  return {
    tresc: `Rozwiąż równanie $${fr(a, lin(b))}=${fr(c, lin(d))}$.`,
    pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }],
    odpowiedz: { x: odp(x0) },
    wynik: `$x=${x0}$`,
    rozwiazanie: [
      `Dziedzina: $x\\neq ${b}$ i $x\\neq ${d}$.`,
      `Mnożymy na krzyż: $${mulLin(a, d)}=${mulLin(c, b)}$.`,
      ...(b === 0 && d === 0 ? [] : [`Opuszczamy nawiasy: $${wielomianTex([a, -a * d])}=${wielomianTex([c, -c * b])}$.`]),
      `Porządkujemy: ${zbieranie(a - c, a * d - c * b, x0)}.`,
      `Sprawdzenie dziedziny: $${x0}\\neq ${b}$ i $${x0}\\neq ${d}$, więc rozwiązaniem jest $x=${x0}$.`,
    ],
  };
}

/** (x + a)/(x - b) = c/(x - b): czasem jedyne „rozwiązanie” jest poza dziedziną. */
function genPulapka(r) {
  const b = r.intBez(-6, 6, 0);
  const a = r.intBez(-6, 6, 0);
  const pulapka = r.chance(0.5);
  const c = pulapka ? a + b : szukaj(() => { const v = r.int(-9, 9); return v !== a + b ? v : null; });
  const s = c - a;
  let opcje;
  if (pulapka) {
    opcje = [
      { t: "brak rozwiązań", ok: true },
      { t: `$x=${b}$`, ok: false },
      { t: `$x=${-b}$`, ok: false },
      { t: `$x=${b}$ lub $x=${-b}$`, ok: false },
    ];
  } else {
    opcje = [
      { t: `$x=${s}$`, ok: true },
      { t: "brak rozwiązań", ok: false },
      { t: `$x=${b}$`, ok: false },
      { t: `$x=${s}$ lub $x=${b}$`, ok: false },
    ];
  }
  const o = r.shuffle(opcje);
  return {
    tresc: `Wskaż zbiór rozwiązań równania $${fr(xp(a), lin(b))}=${fr(c, lin(b))}$.`,
    pola: [{ id: "w", typ: "wybor", etykieta: "Rozwiązanie", opcje: o.map((x) => x.t) }],
    odpowiedz: { w: o.findIndex((x) => x.ok) },
    wynik: pulapka ? "brak rozwiązań" : `$x=${s}$`,
    rozwiazanie: [
      `Dziedzina: $${lin(b)}\\neq 0$, czyli $x\\neq ${b}$.`,
      `Mianowniki są takie same, więc porównujemy liczniki: $${xp(a)}=${c}$, czyli $x=${s}$.`,
      pulapka
        ? `Liczba $${s}$ nie należy do dziedziny (to właśnie liczba, dla której mianownik jest zerem), więc ją odrzucamy. Równanie nie ma rozwiązań.`
        : `Liczba $${s}$ należy do dziedziny ($${s}\\neq ${b}$), więc jest rozwiązaniem.`,
    ],
  };
}

/** Ułamek równy zero, iloczyn w liczniku; czasem jeden czynnik skraca się z mianownikiem. */
function genIloczynLicznik(r) {
  const a = r.int(-7, 7);
  const b = r.intBez(-7, 7, a);
  let c;
  if (r.chance(0.5)) c = r.pick([a, b]);
  else c = szukaj(() => { const v = r.int(-7, 7); return v !== a && v !== b ? v : null; });
  const sol = [a, b].filter((v) => v !== c);
  return {
    tresc: `Rozwiąż równanie $${fr(`${par(a)}${par(b)}`, lin(c))}=0$. Podaj wszystkie rozwiązania.`,
    pola: [{ id: "x", typ: "zbior", ile: sol.length, etykieta: "Rozwiązania" }],
    odpowiedz: { x: sol.map(odp) },
    wynik: wynikX(sol),
    rozwiazanie: [
      `Dziedzina: $${lin(c)}\\neq 0$, czyli $x\\neq ${c}$.`,
      `Ułamek jest równy zero, gdy licznik jest zerem: $${lin(a)}=0$ lub $${lin(b)}=0$, czyli $x=${a}$ lub $x=${b}$.`,
      sol.length === 2
        ? `Obie liczby należą do dziedziny, więc są rozwiązaniami.`
        : `Liczba $${c}$ nie należy do dziedziny – odrzucamy ją. Zostaje jedno rozwiązanie.`,
    ],
  };
}

/** (x + a)/(x - b) = c/x: po pomnożeniu na krzyż powstaje równanie kwadratowe; czasem jeden pierwiastek odpada. */
function genRownanieKwadratowe(r) {
  const { a, b, c, r1, r2 } = szukaj(() => {
    const u = r.intBez(-6, 6, 0);
    const v = r.intBez(-6, 6, 0, u);
    const dzielniki = [];
    for (let k = 1; k <= 6; k++) {
      if ((u * v) % k === 0) dzielniki.push(k, -k);
    }
    const cc = r.pick(dzielniki);
    const bb = (u * v) / cc;
    const aa = cc - u - v;
    if (Math.abs(bb) > 9 || Math.abs(aa) > 12) return null;
    return { a: aa, b: bb, c: cc, r1: u, r2: v };
  });
  const sol = [r1, r2].filter((v) => v !== b).sort((x, y) => x - y);
  const licz = wielomianTex([1, a]);
  const delta = (a - c) ** 2 - 4 * c * b;
  const pierw = [r1, r2].sort((x, y) => x - y);
  return {
    tresc: `Rozwiąż równanie $${fr(licz, lin(b))}=${frZ(c, "x")}$. Podaj wszystkie rozwiązania.`,
    pola: [{ id: "x", typ: "zbior", ile: sol.length, etykieta: "Rozwiązania" }],
    odpowiedz: { x: sol.map(odp) },
    wynik: wynikX(sol),
    rozwiazanie: [
      `Dziedzina: $x\\neq ${b}$ i $x\\neq 0$.`,
      `Mnożymy na krzyż: $${a === 0 ? "x^2" : `x(${licz})`}=${mulLin(c, b)}$, czyli $${wielomianTex([1, a, 0])}=${wielomianTex([c, -c * b])}$.`,
      `Porządkujemy: $${wielomianTex([1, a - c, c * b])}=0$, $\\Delta=${delta}$, więc $x=${pierw[0]}$ lub $x=${pierw[1]}$.`,
      sol.length === 2
        ? `Obie liczby należą do dziedziny, więc są rozwiązaniami.`
        : `Liczba $${b}$ nie należy do dziedziny – odrzucamy ją. Zostaje jedno rozwiązanie.`,
    ],
  };
}

// --- Generatory zadań tekstowych (temat 4)

/** Zadanie o ułamku: mianownik o d większy od licznika, po zmianie licznika i mianownika ułamek równy p/q. */
function genUlamekWarunek(r) {
  const { x0, d, a, b, p, qq } = szukaj(() => {
    const x = r.int(1, 12);
    const dd = r.int(1, 6);
    const bb = r.int(0, 4);
    const q2 = r.int(2, 9);
    const p2 = r.int(1, 9);
    if (p2 === q2 || new Q(p2, q2).d !== q2) return null;
    if ((p2 * (x + dd + bb)) % q2 !== 0) return null;
    const aa = (p2 * (x + dd + bb)) / q2 - x;
    return aa >= 1 && aa <= 10 ? { x0: x, d: dd, a: aa, b: bb, p: p2, qq: q2 } : null;
  });
  const zmiana = b === 0 ? `Po zwiększeniu licznika o ${a} (mianownik zostaje bez zmian)` : `Po zwiększeniu licznika o ${a} i mianownika o ${b}`;
  return {
    tresc: `Mianownik pewnego ułamka jest o ${d} większy od jego licznika. ${zmiana} otrzymano ułamek $${fr(p, qq)}$. Oblicz licznik pierwotnego ułamka.`,
    pola: [{ id: "x", typ: "liczba", etykieta: "Licznik" }],
    odpowiedz: { x: odp(x0) },
    wynik: `$x=${x0}$`,
    rozwiazanie: [
      `Niech $x$ będzie licznikiem; wtedy mianownik to $x+${d}$ i $x>0$.`,
      `Po zmianie: $${fr(`x+${a}`, `x+${d + b}`)}=${fr(p, qq)}$ (mianownik $x+${d + b}\\neq 0$).`,
      `Mnożymy na krzyż: $${mn(qq, `x+${a}`)}=${mn(p, `x+${d + b}`)}$, czyli $${wielomianTex([qq, qq * a])}=${wielomianTex([p, p * (d + b)])}$.`,
      `Stąd ${zbieranie(qq - p, p * (d + b) - qq * a, x0)}.`,
      `Licznik pierwotnego ułamka to $${x0}$ (ułamek $${fr(x0, x0 + d)}$).`,
    ],
  };
}

/** Droga, prędkość i czas: o ile większa prędkość skraca czas przejazdu; szukana prędkość początkowa. */
function genDrogaCzas(r) {
  const kto = r.pick([
    { n: "Rowerzysta", v: [10, 12, 15, 18, 20], dv: [2, 3, 5, 6] },
    { n: "Turysta", v: [3, 4, 5, 6], dv: [1, 2] },
    { n: "Samochód", v: [40, 50, 60, 80], dv: [10, 20, 30] },
    { n: "Pociąg", v: [60, 80, 90, 100], dv: [10, 20, 30] },
  ]);
  const { v, dv, h, s } = szukaj(() => {
    const vv = r.pick(kto.v);
    const dd = r.pick(kto.dv);
    const hh = r.int(1, 2);
    const ss = (hh * vv * (vv + dd)) / dd;
    return Number.isInteger(ss) && ss >= 12 && ss <= 800 ? { v: vv, dv: dd, h: hh, s: ss } : null;
  });
  const wolny = (s * dv) / h;   // x^2 + dv x - wolny = 0
  const delta = dv * dv + 4 * wolny;
  return {
    tresc: `${kto.n} pokonał trasę długości ${s} km, poruszając się ze stałą prędkością. Gdyby poruszał się z prędkością większą o ${dv} km/h, pokonałby tę trasę o ${godz(h)} krócej. Oblicz, z jaką prędkością (w km/h) poruszał się ${kto.n.toLowerCase()}.`,
    pola: [{ id: "v", typ: "liczba", etykieta: "Prędkość (km/h)" }],
    odpowiedz: { v: odp(v) },
    wynik: `$${v}$ km/h`,
    rozwiazanie: [
      `Niech $x$ km/h to szukana prędkość, $x>0$. Czas przejazdu: $\\frac{${s}}{x}$ h, a z większą prędkością $\\frac{${s}}{x+${dv}}$ h.`,
      `Czas jest krótszy o ${godz(h)}: $\\frac{${s}}{x}-\\frac{${s}}{x+${dv}}=${h}$ (dziedzina: $x\\neq 0$, $x\\neq -${dv}$).`,
      `Mnożymy przez $x(x+${dv})$: $${s}(x+${dv})-${s}x=${wsp(h)}x(x+${dv})$, czyli $${s * dv}=${wsp(h)}x^2+${wsp(h * dv)}x$.`,
      `${h === 1 ? "Przenosimy wszystko na jedną stronę" : `Po podzieleniu przez ${h}`}: $x^2+${wsp(dv)}x-${wolny}=0$, $\\Delta=${delta}$, $\\sqrt{\\Delta}=${2 * v + dv}$, więc $x=${v}$ lub $x=${-v - dv}$.`,
      `Prędkość jest dodatnia, więc odrzucamy $${-v - dv}$. Prędkość wynosiła $${v}$ km/h.`,
    ],
  };
}

/** Praca wykonywana wspólnie: dwie osoby (albo dwie rury) i czas pracy razem. */
function genPracaRazem(r) {
  const { a, b, t } = szukaj(() => {
    const x = r.int(2, 20);
    const y = r.int(2, 20);
    if (x === y) return null;
    const tt = new Q(x * y, x + y);
    return tt.d <= 12 ? { a: x, b: y, t: tt } : null;
  });
  const rury = r.chance(0.5);
  const [aa, bb] = r.chance(0.5) ? [a, b] : [b, a];
  const tresc = rury
    ? `Pierwsza rura napełnia basen w ${godz(aa)}, a druga w ${godz(bb)}. Oblicz, w jakim czasie (w godzinach) napełnią basen, gdy będą otwarte obie rury jednocześnie.`
    : `Jeden malarz pomalowałby pewną halę w ${godz(aa)}, a drugi w ${godz(bb)}. Oblicz, w jakim czasie (w godzinach) pomalują halę, pracując razem.`;
  return {
    tresc,
    pola: [{ id: "t", typ: "liczba", etykieta: "Czas (w godzinach)" }],
    odpowiedz: { t: odp(t) },
    wynik: `$${t.tex()}$ godz.`,
    rozwiazanie: [
      `W ciągu 1 godziny pierwszy wykonuje $\\frac{1}{${aa}}$ całości, a drugi $\\frac{1}{${bb}}$ całości.`,
      `Niech $t$ będzie czasem pracy razem: $\\frac{1}{${aa}}+\\frac{1}{${bb}}=\\frac{1}{t}$, czyli $\\frac{${aa + bb}}{${aa * bb}}=\\frac{1}{t}$.`,
      t.tex() === `\\frac{${aa * bb}}{${aa + bb}}` ? `Stąd $t=${t.tex()}$ godz.` : `Stąd $t=\\frac{${aa * bb}}{${aa + bb}}=${t.tex()}$ godz.`,
    ],
  };
}

// --- Generatory funkcji homograficznej (temat 5)

/** Odczyt p i q z wzoru y = a/(x - p) + q. */
function genOdczyt(r) {
  const a = r.intBez(-6, 6, 0);
  const p = r.int(-6, 6);
  const qq = r.int(-5, 5);
  return {
    tresc: `Wykres funkcji $f(x)=${fHom(a, p, qq)}$ powstał z wykresu funkcji $y=\\frac{a}{x}$ przez przesunięcie o wektor $[p,q]$. Podaj liczby $p$ i $q$ (czyli równania asymptot: pionowej $x=p$ i poziomej $y=q$).`,
    pola: [
      { id: "p", typ: "liczba", etykieta: "$p =$" },
      { id: "q", typ: "liczba", etykieta: "$q =$" },
    ],
    odpowiedz: { p: odp(p), q: odp(qq) },
    wynik: `$p=${p}$, $q=${qq}$`,
    rozwiazanie: [
      `Porównujemy ze wzorem $f(x)=\\frac{a}{x-p}+q$.`,
      `Mianownik $${lin(p)}$ ma postać $x-p$, więc $p=${p}$ (asymptota pionowa $x=${p}$).`,
      qq === 0 ? "Nie ma dodanej liczby, więc $q=0$ (asymptota pozioma $y=0$)." : `Dodana liczba to $q=${qq}$ (asymptota pozioma $y=${qq}$).`,
    ],
  };
}

/** Wartość funkcji w punkcie i miejsce zerowe. */
function genWartoscZero(r) {
  const a = r.intBez(-6, 6, 0);
  const p = r.int(-6, 6);
  const qq = r.intBez(-5, 5, 0);
  const dd = r.intBez(-6, 6, 0);
  const x0 = p + dd;
  const wart = new Q(a, dd).add(qq);
  const zero = new Q(p).sub(new Q(a, qq));
  const mian = `${x0}${p === 0 ? "" : ` ${plusMinus(-p)}`}`;
  return {
    tresc: `Dana jest funkcja $f(x)=${fHom(a, p, qq)}$. Oblicz $f(${x0})$ oraz miejsce zerowe funkcji $f$.`,
    pola: [
      { id: "w", typ: "liczba", etykieta: `$f(${x0}) =$` },
      { id: "z", typ: "liczba", etykieta: "Miejsce zerowe $x =$" },
    ],
    odpowiedz: { w: odp(wart), z: odp(zero) },
    wynik: `$f(${x0})=${wart.tex()}$, $x=${zero.tex()}$`,
    rozwiazanie: [
      `Wartość: $f(${x0})=\\frac{${a}}{${mian}} ${plusMinus(qq)}=${new Q(a, dd).tex()} ${plusMinus(qq)}=${wart.tex()}$.`,
      `Miejsce zerowe: $${fHom(a, p, qq)}=0$, więc $${frZ(a, lin(p))}=${-qq}$ (dziedzina: $x\\neq ${p}$).`,
      `Mnożymy przez $${lin(p)}$: $${a}=${mulLin(-qq, p)}$, stąd $${lin(p)}=${new Q(a, -qq).tex()}$.`,
      `Zatem $x=${zero.tex()}$; liczba ta jest różna od $${p}$, więc należy do dziedziny.`,
    ],
  };
}

/** Wyznaczenie współczynnika a z punktu należącego do wykresu. */
function genWyznaczA(r) {
  const { a, p, qq, d, x0, y0 } = szukaj(() => {
    const aa = r.intBez(-8, 8, 0);
    const dzielniki = [];
    for (let k = 1; k <= Math.abs(aa); k++) if (aa % k === 0) dzielniki.push(k, -k);
    const dd = r.pick(dzielniki);
    const pp = r.int(-5, 5);
    const q2 = r.int(-5, 5);
    const x = pp + dd;
    const y = aa / dd + q2;
    return Math.abs(x) <= 12 && Math.abs(y) <= 12 ? { a: aa, p: pp, qq: q2, d: dd, x0: x, y0: y } : null;
  });
  const mian = `${x0}${p === 0 ? "" : ` ${plusMinus(-p)}`}`;
  return {
    tresc: `Wykres funkcji $f(x)=\\frac{a}{${lin(p)}}${qq === 0 ? "" : ` ${plusMinus(qq)}`}$ przechodzi przez punkt $A=(${x0},${y0})$. Wyznacz $a$.`,
    pola: [{ id: "a", typ: "liczba", etykieta: "$a =$" }],
    odpowiedz: { a: odp(a) },
    wynik: `$a=${a}$`,
    rozwiazanie: [
      `Punkt $A$ leży na wykresie, więc $f(${x0})=${y0}$.`,
      `Wstawiamy: $\\frac{a}{${mian}}${qq === 0 ? "" : ` ${plusMinus(qq)}`}=${y0}$.`,
      `Mianownik jest równy $${d}$, stąd $${aNad(d)}=${y0 - qq}$.`,
      ...(d === 1 ? [] : [`Zatem $a=${a}$.`]),   // przy mianowniku 1 wynik stoi już w poprzednim kroku
    ],
  };
}

/** Dziedzina i zbiór wartości funkcji homograficznej (wybór opcji). */
function genDziedzinaZW(r) {
  const { p, qq } = szukaj(() => {
    const pp = r.intBez(-6, 6, 0);
    const q2 = r.intBez(-6, 6, 0);
    return Math.abs(pp) !== Math.abs(q2) ? { p: pp, qq: q2 } : null;
  });
  const a = r.intBez(-6, 6, 0);
  const zapis = (dp, zq) => `$D_f=${wykl([dp])}$, $ZW_f=${wykl([zq])}$`;
  const o = r.shuffle([
    { t: zapis(p, qq), ok: true },
    { t: zapis(-p, qq), ok: false },
    { t: zapis(qq, p), ok: false },
    { t: zapis(p, -qq), ok: false },
  ]);
  return {
    tresc: `Funkcja $f$ jest określona wzorem $f(x)=${fHom(a, p, qq)}$. Wskaż jej dziedzinę $D_f$ i zbiór wartości $ZW_f$.`,
    pola: [{ id: "w", typ: "wybor", etykieta: "Dziedzina i zbiór wartości", opcje: o.map((x) => x.t) }],
    odpowiedz: { w: o.findIndex((x) => x.ok) },
    wynik: zapis(p, qq),
    rozwiazanie: [
      `Wzór ma postać $\\frac{a}{x-p}+q$, gdzie $p=${p}$, $q=${qq}$.`,
      `Mianownik nie może być zerem: $x\\neq ${p}$, więc $D_f=${wykl([p])}$.`,
      `Wykres ma asymptotę poziomą $y=${qq}$, której nigdy nie osiąga: $ZW_f=${wykl([qq])}$.`,
    ],
  };
}

/** Monotoniczność funkcji homograficznej (wybór zdania prawdziwego). */
function genMonotonicznosc(r) {
  const a = r.intBez(-6, 6, 0);
  const p = r.int(-6, 6);
  const qq = r.int(-5, 5);
  const mal = a > 0;
  const nazwa = (m) => (m ? "malejąca" : "rosnąca");
  const przedz = `$(-\\infty,${p})$ i $(${p},+\\infty)$`;
  const o = r.shuffle([
    { t: `Funkcja $f$ jest ${nazwa(mal)} w każdym z przedziałów ${przedz}.`, ok: true },
    { t: `Funkcja $f$ jest ${nazwa(!mal)} w każdym z przedziałów ${przedz}.`, ok: false },
    { t: `Funkcja $f$ jest ${nazwa(mal)} w zbiorze $${wykl([p])}$.`, ok: false },
    { t: `Funkcja $f$ jest ${nazwa(!mal)} w zbiorze $${wykl([p])}$.`, ok: false },
  ]);
  return {
    tresc: `Funkcja $f$ jest określona wzorem $f(x)=${fHom(a, p, qq)}$. Wskaż zdanie prawdziwe.`,
    pola: [{ id: "w", typ: "wybor", etykieta: "Zdanie prawdziwe", opcje: o.map((x) => x.t) }],
    odpowiedz: { w: o.findIndex((x) => x.ok) },
    wynik: `Funkcja jest ${nazwa(mal)} w każdym z przedziałów $(-\\infty,${p})$ i $(${p},+\\infty)$.`,
    rozwiazanie: [
      `Współczynnik $a=${a}$ jest ${a > 0 ? "dodatni" : "ujemny"}, więc funkcja jest ${nazwa(mal)} w każdym z przedziałów dziedziny.`,
      `Dziedzina jest sumą dwóch przedziałów: $(-\\infty,${p})$ i $(${p},+\\infty)$.`,
      `Nie mówimy, że funkcja jest ${nazwa(mal)} w całym zbiorze $${wykl([p])}$, bo wartości z dwóch gałęzi wykresu nie układają się w jeden ciąg monotoniczny.`,
    ],
  };
}

// --- Tematy

export default {
  tematy: [
    // ------------------------------------------------------------------ 1.1
    {
      id: "ulamek-algebraiczny",
      nazwa: "Ułamek algebraiczny. Skracanie i rozszerzanie",
      sciaga: [
        {
          nazwa: "Ułamek algebraiczny i jego dziedzina",
          slownie: "Ułamek algebraiczny ma w liczniku i mianowniku wyrażenia z literą. Ma sens tylko dla tych liczb, dla których mianownik nie jest równy zero.",
          tex: "\\frac{W(x)}{V(x)}\\qquad V(x)\\neq 0",
          litery: "$W(x)$ – licznik, $V(x)$ – mianownik. Dziedzina to wszystkie liczby rzeczywiste, dla których $V(x)\\neq 0$.",
          przyklad: "Dla $\\frac{x+1}{x-3}$ mianownik jest zerem, gdy $x=3$. Dziedzina: $x\\in\\mathbb{R}\\setminus\\{3\\}$.",
          uwaga: "Licznik może być zerem, mianownik nie. Dziedzinę wyznaczamy z ułamka danego na początku, zanim cokolwiek skrócimy.",
        },
        {
          nazwa: "Skracanie ułamka",
          slownie: "Rozkładamy licznik i mianownik na czynniki i skracamy czynniki wspólne. Skracać można tylko czynniki (iloczyny), nigdy składniki sumy.",
          tex: "\\frac{a\\cdot c}{b\\cdot c}=\\frac{a}{b}\\qquad c\\neq 0",
          litery: "$c$ – wspólny czynnik licznika i mianownika (różny od zera).",
          przyklad: "$\\frac{x^2-9}{x+3}=\\frac{(x-3)(x+3)}{x+3}=x-3$ dla $x\\neq -3$.",
          uwaga: "Błąd: $\\frac{x+2}{x+3}=\\frac{2}{3}$. Skreślenie $x$ jest zabronione, bo $x$ jest składnikiem sumy, a nie czynnikiem.",
        },
        {
          nazwa: "Rozszerzanie ułamka",
          slownie: "Mnożymy licznik i mianownik przez to samo wyrażenie różne od zera. Wartość ułamka się nie zmienia.",
          tex: "\\frac{a}{b}=\\frac{a\\cdot c}{b\\cdot c}\\qquad c\\neq 0",
          litery: "$c$ – wyrażenie, przez które rozszerzamy (np. $x+2$).",
          przyklad: "$\\frac{x}{x-3}=\\frac{x(x+2)}{(x-3)(x+2)}$ – rozszerzyliśmy przez $x+2$, więc dochodzi założenie $x\\neq -2$.",
          uwaga: "Przez nowe wyrażenie mnożymy i licznik, i mianownik – całe.",
        },
        {
          nazwa: "Wzory pomocne przy skracaniu",
          slownie: "Aby skracać, rozkładamy wyrażenia na czynniki: wyłączamy wspólny czynnik albo używamy wzorów skróconego mnożenia.",
          tex: "a^2-b^2=(a-b)(a+b)\\qquad (a\\pm b)^2=a^2\\pm 2ab+b^2",
          przyklad: "$\\frac{x^2+6x+9}{x^2-9}=\\frac{(x+3)^2}{(x-3)(x+3)}=\\frac{x+3}{x-3}$ dla $x\\neq 3$ i $x\\neq -3$. Wspólny czynnik: $2x+6=2(x+3)$.",
        },
      ],
      jak: [
        "Zapisz założenie: mianownik ułamka danego w zadaniu jest różny od zera.",
        "Rozłóż licznik i mianownik na czynniki (wspólny czynnik przed nawias, wzory skróconego mnożenia).",
        "Skróć wspólne czynniki.",
        "Zapisz wynik razem z założeniem – skrócony ułamek ma sens tylko dla liczb z dziedziny ułamka wyjściowego.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Wyznacz dziedzinę ułamka $\\frac{5}{x-4}$. **Wybierz właściwą odpowiedź.**",
          opcje: [D(-4), D(4), D(5), D(0)],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Wyznacz dziedzinę ułamka $\\frac{x+2}{(x-1)(x+3)}$. **Wybierz właściwą odpowiedź.**",
          opcje: [D(-1, 3), D(1), D(-3, -2, 1), D(-3, 1)],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "Dla $x\\neq 4$ wyrażenie $\\frac{x^2-16}{x-4}$ jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$x-4$", "$x^2-4$", "$x+4$", "$x+16$"],
          poprawna: 2,
        },
        {
          nr: "4",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Dla $x\\neq -2$ prawdziwa jest równość $\\frac{3x+6}{x+2}=3$.", litery: "PF", poprawna: 0 },
            { tekst: "Dla $x\\neq 0$ prawdziwa jest równość $\\frac{x+5}{x}=5$.", litery: "PF", poprawna: 1 },
            { tekst: "Dla $x\\neq -3$ prawdziwa jest równość $\\frac{x^2-9}{x^2+6x+9}=\\frac{x-3}{x+3}$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "5",
          tresc: "Ułamek $\\frac{x}{x-3}$ rozszerzono przez $x+2$. Wskaż otrzymany ułamek. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{x+2}{x-3+2}$", "$\\frac{x(x+2)}{x-3}$", "$\\frac{x}{(x-3)(x+2)}$", "$\\frac{x(x+2)}{(x-3)(x+2)}$"],
          poprawna: 3,
        },
        {
          nr: "6",
          tresc: "Dla jakiej liczby $x$ ułamek $\\frac{x-5}{x+2}$ jest równy $0$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-5$", "$5$", "$-2$", "$2$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "7",
          punkty: 2,
          tresc: "Wyznacz dziedzinę i skróć ułamek $\\frac{2x^2-8}{x^2-4x+4}$. **Zapisz obliczenia.**",
          rozwiazanie:
            "Mianownik: $x^2-4x+4=(x-2)^2$ jest zerem tylko dla $x=2$. Dziedzina: $x\\in\\mathbb{R}\\setminus\\{2\\}$.\n\n" +
            "Licznik: $2x^2-8=2(x^2-4)=2(x-2)(x+2)$.\n\n" +
            "Skracamy czynnik $x-2$: $\\frac{2(x-2)(x+2)}{(x-2)^2}=\\frac{2(x+2)}{x-2}$.\n\n" +
            "Odpowiedź: dziedzina to $x\\neq 2$, a po skróceniu ułamek jest równy $\\frac{2(x+2)}{x-2}$.",
        },
        {
          nr: "8",
          punkty: 2,
          tresc: "Skróć ułamek $\\frac{x^2-6x+9}{x^2-9}$ i oblicz jego wartość dla $x=5$. **Zapisz obliczenia.**",
          rozwiazanie:
            "Mianownik: $x^2-9=(x-3)(x+3)$, więc założenie: $x\\neq 3$ i $x\\neq -3$.\n\n" +
            "Licznik: $x^2-6x+9=(x-3)^2$.\n\n" +
            "Skracamy: $\\frac{(x-3)^2}{(x-3)(x+3)}=\\frac{x-3}{x+3}$.\n\n" +
            "Liczba $5$ spełnia założenie: $\\frac{5-3}{5+3}=\\frac{2}{8}=\\frac{1}{4}$.\n\n" +
            "Odpowiedź: $\\frac{x-3}{x+3}$; dla $x=5$ wartość jest równa $\\frac{1}{4}$.",
        },
      ],
      generatory: [
        { id: "dziedzina-ulamka", nazwa: "Dziedzina ułamka", opis: "Dla jakich liczb ułamek algebraiczny nie jest określony (mianownik równy zero).", generuj: genDziedzina },
        { id: "skracanie-wartosc", nazwa: "Skróć i oblicz", opis: "Skracanie ułamka algebraicznego i obliczenie jego wartości dla podanej liczby.", generuj: genSkracanie },
      ],
    },

    // ------------------------------------------------------------------ 1.3
    {
      id: "mnozenie-dzielenie",
      nazwa: "Mnożenie i dzielenie ułamków algebraicznych",
      sciaga: [
        {
          nazwa: "Mnożenie ułamków",
          slownie: "Mnożymy licznik przez licznik i mianownik przez mianownik. Najlepiej najpierw rozłożyć wszystko na czynniki i skrócić.",
          tex: "\\frac{a}{b}\\cdot\\frac{c}{d}=\\frac{a\\cdot c}{b\\cdot d}\\qquad b\\neq 0,\\ d\\neq 0",
          przyklad: "$\\frac{x+1}{x-2}\\cdot\\frac{x-2}{3}=\\frac{x+1}{3}$ dla $x\\neq 2$.",
          uwaga: "Nie wymnażaj nawiasów przed skróceniem – iloczyn czynników łatwiej skrócić.",
        },
        {
          nazwa: "Dzielenie ułamków",
          slownie: "Dzielenie zamieniamy na mnożenie przez odwrotność dzielnika. Dzielnik nie może być równy zero.",
          tex: "\\frac{a}{b}:\\frac{c}{d}=\\frac{a}{b}\\cdot\\frac{d}{c}\\qquad b,\\,c,\\,d\\neq 0",
          litery: "$\\frac{c}{d}$ – dzielnik; jego licznik $c$ też musi być różny od zera.",
          przyklad: "$\\frac{x}{x+1}:\\frac{x-2}{x+4}=\\frac{x}{x+1}\\cdot\\frac{x+4}{x-2}=\\frac{x(x+4)}{(x+1)(x-2)}$. Założenia: $x\\neq -1$, $x\\neq -4$, $x\\neq 2$.",
          uwaga: "Warunek $c\\neq 0$ łatwo zgubić po skróceniu.",
        },
        {
          nazwa: "Założenia przy działaniach",
          slownie: "Przed skracaniem zapisujemy założenia: wszystkie mianowniki oraz dzielnik muszą być różne od zera. Skrócenie nie znosi założeń.",
          przyklad: "$\\frac{x-3}{x+1}:\\frac{x-3}{x+4}=\\frac{x-3}{x+1}\\cdot\\frac{x+4}{x-3}=\\frac{x+4}{x+1}$, ale założenia zostają: $x\\neq -1$, $x\\neq -4$ i $x\\neq 3$.",
          uwaga: "Liczba $3$ jest wykluczona, choć w wyniku $\\frac{x+4}{x+1}$ nic o niej nie widać – dzielnik byłby wtedy zerem.",
        },
      ],
      jak: [
        "Zapisz założenia: wszystkie mianowniki i dzielnik różne od zera.",
        "Dzielenie zamień na mnożenie przez odwrotność dzielnika.",
        "Rozłóż liczniki i mianowniki na czynniki.",
        "Skróć wspólne czynniki i zapisz wynik wraz z założeniami.",
      ],
      zadania: [
        {
          nr: "9",
          tresc: "Dla $x\\neq 2$ i $x\\neq -4$ iloczyn $\\frac{x+1}{x-2}\\cdot\\frac{x-2}{x+4}$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{x+1}{x+4}$", "$\\frac{x-2}{x+4}$", "$\\frac{x+1}{x-2}$", "$\\frac{1}{x+4}$"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "Dla $x\\neq 0$, $x\\neq -3$ i $x\\neq -5$ iloraz $\\frac{x}{x+3}:\\frac{x}{x+5}$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{x+3}{x+5}$", "$1$", "$\\frac{x+5}{x+3}$", "$\\frac{x^2}{(x+3)(x+5)}$"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "Dla jakich liczb $x$ wyrażenie $\\frac{x+1}{x-4}:\\frac{x-2}{x+3}$ jest określone? **Wybierz właściwą odpowiedź.**",
          opcje: [`Dla $x\\in\\mathbb{R}\\setminus\\{-3,\\,4\\}$`, `Dla $x\\in\\mathbb{R}\\setminus\\{-3,\\,2,\\,4\\}$`, `Dla $x\\in\\mathbb{R}\\setminus\\{-1,\\,2\\}$`, `Dla $x\\in\\mathbb{R}\\setminus\\{-3,\\,-1,\\,2,\\,4\\}$`],
          poprawna: 1,
        },
        {
          nr: "12",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Dla $x\\neq 0$ prawdziwa jest równość $\\frac{2}{x}\\cdot\\frac{x^2}{6}=\\frac{x}{3}$.", litery: "PF", poprawna: 0 },
            { tekst: "Dla $x\\neq 0$ prawdziwa jest równość $\\frac{x}{3}:\\frac{x}{9}=\\frac{1}{3}$.", litery: "PF", poprawna: 1 },
            { tekst: "Równość $\\frac{x-1}{x+1}\\cdot\\frac{x+1}{x-1}=1$ jest prawdziwa dla każdej liczby rzeczywistej $x$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "13",
          tresc: "Oblicz wartość wyrażenia $\\frac{x^2-9}{x}\\cdot\\frac{2x}{x+3}$ dla $x=5$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$", "$2$", "$4$", "$16$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "14",
          punkty: 2,
          tresc: "Zapisz założenia i uprość wyrażenie $\\frac{x^2-4}{x+5}\\cdot\\frac{x+5}{x^2+4x+4}$. **Zapisz obliczenia.**",
          rozwiazanie:
            "Założenia: $x+5\\neq 0$ oraz $x^2+4x+4=(x+2)^2\\neq 0$, czyli $x\\neq -5$ i $x\\neq -2$.\n\n" +
            "Rozkładamy: $x^2-4=(x-2)(x+2)$, więc wyrażenie ma postać $\\frac{(x-2)(x+2)}{x+5}\\cdot\\frac{x+5}{(x+2)^2}$.\n\n" +
            "Skracamy $(x+5)$ i $(x+2)$: $\\frac{x-2}{x+2}$.\n\n" +
            "Odpowiedź: $\\frac{x-2}{x+2}$ dla $x\\neq -5$ i $x\\neq -2$.",
        },
        {
          nr: "15",
          punkty: 3,
          tresc: "Zapisz założenia i uprość wyrażenie $\\frac{x^2-1}{x+4}:\\frac{x-1}{3x+12}$. **Zapisz obliczenia.**",
          rozwiazanie:
            "Założenia: $x+4\\neq 0$, $3x+12=3(x+4)\\neq 0$ i dzielnik różny od zera: $x-1\\neq 0$. Czyli $x\\neq -4$ i $x\\neq 1$.\n\n" +
            "Dzielenie zamieniamy na mnożenie przez odwrotność: $\\frac{x^2-1}{x+4}\\cdot\\frac{3x+12}{x-1}$.\n\n" +
            "Rozkładamy: $\\frac{(x-1)(x+1)}{x+4}\\cdot\\frac{3(x+4)}{x-1}$.\n\n" +
            "Skracamy $(x-1)$ i $(x+4)$: $3(x+1)$.\n\n" +
            "Odpowiedź: $3(x+1)=3x+3$ dla $x\\neq -4$ i $x\\neq 1$.",
        },
      ],
      generatory: [
        { id: "iloczyn-iloraz", nazwa: "Iloczyn i iloraz", opis: "Uproszczenie iloczynu lub ilorazu ułamków algebraicznych i obliczenie jego wartości.", generuj: genDzialania },
        { id: "zalozenia-dzielenie", nazwa: "Założenia przy dzieleniu", opis: "Liczby, dla których iloraz ułamków algebraicznych nie ma sensu (także dzielnik równy zero).", generuj: genZalozeniaDzielenie },
      ],
    },

    // ------------------------------------------------------------------ 1.5
    {
      id: "rownania-wymierne",
      nazwa: "Równania wymierne",
      sciaga: [
        {
          nazwa: "Równanie wymierne i dziedzina",
          slownie: "To równanie, w którym niewiadoma występuje w mianowniku. Najpierw zapisujemy dziedzinę (mianowniki różne od zera), potem rozwiązujemy, na końcu sprawdzamy rozwiązanie.",
          tex: "\\frac{W(x)}{V(x)}=c\\qquad V(x)\\neq 0",
          przyklad: "$\\frac{x+1}{x-2}=3$. Dziedzina: $x\\neq 2$. Mnożymy przez $x-2$: $x+1=3(x-2)$, czyli $x+1=3x-6$, $7=2x$, $x=\\frac{7}{2}$. Liczba $\\frac72\\neq 2$, więc jest rozwiązaniem.",
          uwaga: "Rozwiązanie spoza dziedziny trzeba odrzucić – dlatego sprawdzenie nie jest dodatkiem, tylko częścią rozwiązania.",
        },
        {
          nazwa: "Mnożenie na krzyż",
          slownie: "Równanie postaci „ułamek = ułamek” sprowadzamy do równania bez ułamków, mnożąc na krzyż (licznik jednego przez mianownik drugiego).",
          tex: "\\frac{a}{b}=\\frac{c}{d}\\ \\Leftrightarrow\\ a\\cdot d=b\\cdot c\\qquad b\\neq 0,\\ d\\neq 0",
          przyklad: "$\\frac{2}{x}=\\frac{5}{x+3}$. Dziedzina: $x\\neq 0$, $x\\neq -3$. Wtedy $2(x+3)=5x$, czyli $6=3x$, $x=2$. Liczba $2$ należy do dziedziny.",
          uwaga: "Dziedzinę zapisujemy przed mnożeniem na krzyż – po nim mianowników już nie widać.",
        },
        {
          nazwa: "Iloczyn w liczniku",
          slownie: "Ułamek jest równy zero, gdy jego licznik jest zerem, a mianownik jest różny od zera.",
          tex: "\\frac{A}{B}=0\\ \\Leftrightarrow\\ A=0\\ \\text{i}\\ B\\neq 0",
          przyklad: "$\\frac{(x-1)(x+4)}{x-1}=0$. Dziedzina: $x\\neq 1$. Licznik jest zerem dla $x=1$ lub $x=-4$. Liczbę $1$ odrzucamy, zostaje $x=-4$.",
        },
        {
          nazwa: "Brak rozwiązań",
          slownie: "Jeśli wszystkie otrzymane liczby nie należą do dziedziny, równanie nie ma rozwiązań. Zapisujemy to wprost.",
          przyklad: "$\\frac{x+2}{x-3}=\\frac{5}{x-3}$. Dziedzina: $x\\neq 3$. Z równości liczników $x+2=5$, czyli $x=3$ – ale $3$ nie należy do dziedziny. Równanie nie ma rozwiązań.",
          uwaga: "Nie wolno zostawić „$x=3$” jako odpowiedzi tylko dlatego, że wyszło z rachunków.",
        },
      ],
      jak: [
        "Zapisz dziedzinę: każdy mianownik różny od zera.",
        "Pozbądź się ułamków: pomnóż obie strony przez mianownik albo pomnóż na krzyż.",
        "Rozwiąż otrzymane równanie.",
        "Sprawdź, czy każde rozwiązanie należy do dziedziny; odrzuć te, które nie należą.",
        "Zapisz odpowiedź (może to być jedno rozwiązanie, dwa albo brak rozwiązań).",
      ],
      zadania: [
        {
          nr: "16",
          tresc: "Rozwiąż równanie $\\frac{x-1}{x+3}=2$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$x=-4$", "$x=-7$", "$x=5$", "$x=7$"],
          poprawna: 1,
        },
        {
          nr: "17",
          tresc: "Rozwiąż równanie $\\frac{3}{x}=\\frac{2}{x-1}$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$x=3$", "$x=-2$", "$x=1$", "$x=-3$"],
          poprawna: 0,
        },
        {
          nr: "18",
          tresc: "Dane jest równanie $\\frac{x+2}{x-3}=\\frac{5}{x-3}$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Liczba $3$ jest rozwiązaniem tego równania.", litery: "PF", poprawna: 1 },
            { tekst: "Równanie nie ma rozwiązań.", litery: "PF", poprawna: 0 },
            { tekst: "Dziedziną równania jest zbiór $\\mathbb{R}\\setminus\\{3\\}$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "19",
          tresc: "Ile rozwiązań ma równanie $\\frac{(x-2)(x+5)}{x-2}=0$? **Wybierz właściwą odpowiedź.**",
          opcje: ["Dwa.", "Żadnego.", "Jedno.", "Trzy."],
          poprawna: 2,
        },
        {
          nr: "20",
          tresc: "Rozwiąż równanie $\\frac{2x-1}{x}=4$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$x=\\frac{5}{2}$", "$x=\\frac{1}{2}$", "$x=-\\frac{5}{2}$", "$x=-\\frac{1}{2}$"],
          poprawna: 3,
        },
        {
          nr: "21",
          tresc: "Rozwiąż równanie $\\frac{x+6}{x}=x$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$x=2$ lub $x=-3$", "$x=-2$ lub $x=3$", "$x=3$", "$x=-2$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "22",
          punkty: 3,
          tresc: "Rozwiąż równanie $\\frac{6}{x+2}=\\frac{x+1}{2x-1}$. **Zapisz obliczenia.**",
          rozwiazanie:
            "Dziedzina: $x+2\\neq 0$ i $2x-1\\neq 0$, czyli $x\\neq -2$ i $x\\neq \\frac{1}{2}$.\n\n" +
            "Mnożymy na krzyż: $6(2x-1)=(x+1)(x+2)$.\n\n" +
            "Opuszczamy nawiasy: $12x-6=x^2+3x+2$, czyli $x^2-9x+8=0$.\n\n" +
            "$\\Delta=81-32=49$, więc $x=\\frac{9-7}{2}=1$ lub $x=\\frac{9+7}{2}=8$.\n\n" +
            "Obie liczby należą do dziedziny (sprawdzenie: dla $x=1$ obie strony są równe $2$, dla $x=8$ obie strony są równe $\\frac{3}{5}$).\n\n" +
            "Odpowiedź: $x=1$ lub $x=8$.",
        },
        {
          nr: "23",
          punkty: 2,
          tresc: "Rozwiąż równanie $\\frac{x}{x+2}=\\frac{x-1}{x}$. **Zapisz obliczenia.**",
          rozwiazanie:
            "Dziedzina: $x\\neq -2$ i $x\\neq 0$.\n\n" +
            "Mnożymy na krzyż: $x\\cdot x=(x-1)(x+2)$.\n\n" +
            "Opuszczamy nawiasy: $x^2=x^2+x-2$, stąd $x=2$.\n\n" +
            "Liczba $2$ należy do dziedziny (sprawdzenie: obie strony są równe $\\frac{1}{2}$).\n\n" +
            "Odpowiedź: $x=2$.",
        },
      ],
      generatory: [
        { id: "rownanie-z-liczba", nazwa: "Ułamek równy liczbie", opis: "Równanie z jednym ułamkiem po lewej stronie i liczbą po prawej; trzeba sprawdzić dziedzinę.", generuj: genRownanieLiczba },
        { id: "rownanie-na-krzyz", nazwa: "Proporcja", opis: "Równanie „ułamek = ułamek” rozwiązywane przez mnożenie na krzyż.", generuj: genRownanieKrzyz },
        { id: "rownanie-pulapka", nazwa: "Czy jest rozwiązanie?", opis: "Równanie, w którym otrzymane rozwiązanie bywa spoza dziedziny – wybierz zbiór rozwiązań.", generuj: genPulapka },
        { id: "iloczyn-w-liczniku", nazwa: "Iloczyn w liczniku", opis: "Ułamek równy zero z iloczynem w liczniku; czasem jeden czynnik odpada przez dziedzinę.", generuj: genIloczynLicznik },
        { id: "rownanie-kwadratowe", nazwa: "Wychodzi trójmian", opis: "Po pomnożeniu na krzyż powstaje równanie kwadratowe; trzeba sprawdzić oba pierwiastki.", generuj: genRownanieKwadratowe },
      ],
    },

    // ------------------------------------------------------------------ 1.6
    {
      id: "zadania-tekstowe",
      nazwa: "Zadania tekstowe prowadzące do równań wymiernych",
      sciaga: [
        {
          nazwa: "Jak ułożyć równanie",
          slownie: "Oznacz niewiadomą literą i zapisz założenia (np. $x>0$). Wyraź pozostałe wielkości przez $x$, ułóż równanie z warunku, rozwiąż je i sprawdź, czy wynik pasuje do treści.",
          przyklad: "Mianownik ułamka jest o $3$ większy od licznika. Po zwiększeniu licznika o $1$ ułamek jest równy $\\frac{1}{2}$. Licznik $x$: $\\frac{x+1}{x+3}=\\frac{1}{2}$, czyli $2x+2=x+3$, $x=1$. Szukany ułamek to $\\frac{1}{4}$.",
        },
        {
          nazwa: "Droga, prędkość, czas",
          slownie: "Czas ruchu jest ilorazem drogi i prędkości. Gdy prędkość jest niewiadomą, czas jest ułamkiem z niewiadomą w mianowniku.",
          tex: "t=\\frac{s}{v}",
          litery: "$s$ – droga, $v$ – prędkość, $t$ – czas.",
          przyklad: "Trasa $60$ km z prędkością $x$ km/h trwa $\\frac{60}{x}$ godz.; z prędkością o $10$ km/h większą – $\\frac{60}{x+10}$ godz.",
          uwaga: "Jednostki muszą się zgadzać: kilometry z km/h dają godziny.",
        },
        {
          nazwa: "Praca wykonywana razem",
          slownie: "Jeśli zadanie wykonuje się w $a$ godzin, to w ciągu jednej godziny wykonuje się $\\frac{1}{a}$ zadania. Części wykonywane razem w ciągu godziny dodajemy.",
          tex: "\\frac{1}{a}+\\frac{1}{b}=\\frac{1}{t}",
          litery: "$a$, $b$ – czasy pracy osobno, $t$ – czas pracy razem.",
          przyklad: "Dla $a=6$ i $b=3$: $\\frac{1}{6}+\\frac{1}{3}=\\frac{1}{2}$, więc $t=2$ godz.",
          uwaga: "Czas razem jest krótszy od każdego z czasów osobno; nie jest ich średnią.",
        },
        {
          nazwa: "Sprawdzenie warunków zadania",
          slownie: "Po rozwiązaniu równania sprawdź dziedzinę i warunki z treści: prędkość i czas są dodatnie, liczba osób jest całkowita.",
          przyklad: "Równanie kwadratowe dało $x=30$ lub $x=-40$. Prędkość nie może być ujemna, więc odpowiedź to $30$ km/h.",
        },
      ],
      jak: [
        "Oznacz niewiadomą i zapisz założenie (np. prędkość $x>0$).",
        "Wyraź pozostałe wielkości przez niewiadomą (np. czas $\\frac{s}{x}$).",
        "Ułóż równanie z warunku zadania.",
        "Pomnóż przez mianowniki, rozwiąż i sprawdź dziedzinę.",
        "Odrzuć wyniki sprzeczne z treścią i zapisz odpowiedź z jednostką.",
      ],
      zadania: [
        {
          nr: "24",
          tresc: "Rowerzysta jedzie z prędkością $v+3$ km/h. Który wzór opisuje czas (w godzinach) przejechania $36$ km? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{v+3}{36}$", "$\\frac{36}{v}+3$", "$\\frac{36}{v+3}$", "$36(v+3)$"],
          poprawna: 2,
        },
        {
          nr: "25",
          tresc: "Mianownik ułamka jest o $4$ większy od jego licznika $x$. Gdy licznik zwiększymy o $3$, a mianownik o $1$, otrzymamy ułamek $\\frac{2}{3}$. Które równanie opisuje tę sytuację? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{x+3}{x+4}=\\frac{2}{3}$", "$\\frac{x+3}{x+5}=\\frac{2}{3}$", "$\\frac{x+3}{x+4}+1=\\frac{2}{3}$", "$\\frac{x+3}{x+1}=\\frac{2}{3}$"],
          poprawna: 1,
        },
        {
          nr: "26",
          tresc: "Pierwsza rura napełnia basen w $4$ godziny, a druga w $12$ godzin. W jakim czasie napełnią basen, gdy będą otwarte jednocześnie obie rury? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$ godziny", "$8$ godzin", "$12$ godzin", "$16$ godzin"],
          poprawna: 0,
        },
        {
          nr: "27",
          tresc: "Mianownik ułamka jest o $5$ większy od licznika. Gdy licznik zwiększymy o $4$, a mianownik zostawimy bez zmian, otrzymamy ułamek $\\frac{5}{6}$. Wskaż licznik pierwotnego ułamka. **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$1$", "$5$", "$6$"],
          poprawna: 1,
        },
        {
          nr: "28",
          tresc: "Samochód ma przejechać $120$ km. Gdyby jechał z prędkością o $20$ km/h większą, jechałby o $1$ godzinę krócej. Niech $v$ oznacza prędkość samochodu w km/h; wtedy $\\frac{120}{v}-\\frac{120}{v+20}=1$, a po przekształceniu $v^2+20v-2400=0$, czyli $v=40$ lub $v=-60$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Prędkość $40$ km/h spełnia warunki zadania.", litery: "PF", poprawna: 0 },
            { tekst: "Prędkość $-60$ km/h również spełnia warunki zadania.", litery: "PF", poprawna: 1 },
            { tekst: "Z prędkością $40$ km/h samochód przejedzie tę trasę w $3$ godziny.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "29",
          punkty: 3,
          tresc: "Rowerzysta ma do przejechania $60$ km. Gdyby zwiększył prędkość o $5$ km/h, przejechałby tę trasę o $1$ godzinę krócej. Oblicz, z jaką prędkością jedzie rowerzysta. **Zapisz obliczenia.**",
          rozwiazanie:
            "Niech $x$ km/h to prędkość rowerzysty, $x>0$. Czas przejazdu: $\\frac{60}{x}$ godz., a z większą prędkością $\\frac{60}{x+5}$ godz.\n\n" +
            "Warunek zadania: $\\frac{60}{x}-\\frac{60}{x+5}=1$.\n\n" +
            "Mnożymy przez $x(x+5)$: $60(x+5)-60x=x(x+5)$, czyli $300=x^2+5x$.\n\n" +
            "$x^2+5x-300=0$, $\\Delta=25+1200=1225$, $\\sqrt{\\Delta}=35$, więc $x=\\frac{-5-35}{2}=-20$ lub $x=\\frac{-5+35}{2}=15$.\n\n" +
            "Prędkość jest dodatnia, więc $x=15$. Sprawdzenie: $\\frac{60}{15}=4$ godz., $\\frac{60}{20}=3$ godz. – różnica $1$ godzina.\n\n" +
            "Odpowiedź: rowerzysta jedzie z prędkością $15$ km/h.",
        },
        {
          nr: "30",
          punkty: 3,
          tresc: "Grupa uczniów kupiła prezent za $240$ zł; koszt podzielono po równo. Gdyby uczniów było o $2$ mniej, każdy zapłaciłby o $4$ zł więcej. Ilu uczniów jest w grupie? **Zapisz obliczenia.**",
          rozwiazanie:
            "Niech $n$ będzie liczbą uczniów, $n>2$. Każdy płaci $\\frac{240}{n}$ zł, a przy $n-2$ uczniach $\\frac{240}{n-2}$ zł.\n\n" +
            "Warunek zadania: $\\frac{240}{n-2}-\\frac{240}{n}=4$ (dziedzina: $n\\neq 0$, $n\\neq 2$).\n\n" +
            "Mnożymy przez $n(n-2)$: $240n-240(n-2)=4n(n-2)$, czyli $480=4n^2-8n$.\n\n" +
            "$n^2-2n-120=0$, $\\Delta=4+480=484$, $\\sqrt{\\Delta}=22$, więc $n=\\frac{2-22}{2}=-10$ lub $n=\\frac{2+22}{2}=12$.\n\n" +
            "Liczba uczniów jest dodatnia, więc $n=12$. Sprawdzenie: $\\frac{240}{12}=20$ zł, $\\frac{240}{10}=24$ zł – różnica $4$ zł.\n\n" +
            "Odpowiedź: w grupie jest $12$ uczniów.",
        },
      ],
      generatory: [
        { id: "ulamek-z-warunkiem", nazwa: "Zadanie o ułamku", opis: "Mianownik większy od licznika; po zmianie licznika i mianownika ułamek ma daną wartość – oblicz licznik.", generuj: genUlamekWarunek },
        { id: "droga-i-czas", nazwa: "Droga i czas", opis: "Większa prędkość skraca czas przejazdu – oblicz prędkość początkową (równanie kwadratowe, jedno rozwiązanie odpada).", generuj: genDrogaCzas },
        { id: "praca-razem", nazwa: "Praca razem", opis: "Czas wykonania pracy przez dwie osoby (albo dwie rury) działające razem.", generuj: genPracaRazem },
      ],
    },

    // ------------------------------------------------------------------ 1.7
    {
      id: "funkcja-homograficzna",
      nazwa: "Funkcja homograficzna",
      sciaga: [
        {
          nazwa: "Proporcjonalność odwrotna",
          slownie: "Dwie wielkości są odwrotnie proporcjonalne, gdy ich iloczyn jest stały: gdy jedna rośnie $2$ razy, druga maleje $2$ razy.",
          tex: "y=\\frac{a}{x}\\qquad x\\neq 0,\\ a\\neq 0",
          litery: "$a$ – stały iloczyn $x\\cdot y$.",
          przyklad: "Droga $120$ km: prędkość $v$ i czas $t$ spełniają $v\\cdot t=120$, czyli $t=\\frac{120}{v}$. Dwa razy większa prędkość – dwa razy krótszy czas.",
          uwaga: "To nie to samo co proporcjonalność prosta $y=ax$, w której stały jest iloraz $\\frac{y}{x}$.",
        },
        {
          nazwa: "Wykres i własności y = a/x",
          slownie: "Wykres to hiperbola o dwóch gałęziach. Osie układu są asymptotami: wykres zbliża się do nich, ale ich nie przecina. Dla $a>0$ gałęzie leżą w I i III ćwiartce, dla $a<0$ w II i IV.",
          tex: "D_f=\\mathbb{R}\\setminus\\{0\\}\\qquad ZW_f=\\mathbb{R}\\setminus\\{0\\}",
          litery: "$D_f$ – dziedzina, $ZW_f$ – zbiór wartości funkcji $f(x)=\\frac{a}{x}$.",
          przyklad: "Dla $f(x)=\\frac{6}{x}$ wykres przechodzi przez punkty $(1,6)$, $(2,3)$, $(3,2)$, $(6,1)$ oraz $(-2,-3)$.",
        },
        {
          nazwa: "Monotoniczność y = a/x",
          slownie: "Dla $a>0$ funkcja maleje w każdym z przedziałów $(-\\infty,0)$ i $(0,+\\infty)$. Dla $a<0$ rośnie w każdym z nich.",
          tex: "a>0:\\ \\text{maleje}\\qquad a<0:\\ \\text{rośnie}",
          przyklad: "$f(x)=-\\frac{2}{x}$: $a<0$, więc funkcja rośnie w $(-\\infty,0)$ i w $(0,+\\infty)$.",
          uwaga: "Nie piszemy „malejąca w $\\mathbb{R}\\setminus\\{0\\}$”: dla $f(x)=\\frac{2}{x}$ jest $f(-1)=-2<f(1)=2$, więc na całej dziedzinie funkcja nie maleje.",
        },
        {
          nazwa: "Przesunięcie: a/(x − p) + q",
          slownie: "Wykres powstaje z wykresu $y=\\frac{a}{x}$ przez przesunięcie o wektor $[p,q]$ (jak w przekształceniach wykresów). Asymptoty też się przesuwają.",
          tex: "f(x)=\\frac{a}{x-p}+q\\qquad D_f=\\mathbb{R}\\setminus\\{p\\}\\qquad ZW_f=\\mathbb{R}\\setminus\\{q\\}",
          litery: "Asymptota pionowa $x=p$, pozioma $y=q$. Monotoniczność jak dla $\\frac{a}{x}$, w przedziałach $(-\\infty,p)$ i $(p,+\\infty)$.",
          przyklad: "$f(x)=\\frac{2}{x+1}-3$: $p=-1$, $q=-3$. Asymptoty: $x=-1$ i $y=-3$; $D_f=\\mathbb{R}\\setminus\\{-1\\}$, $ZW_f=\\mathbb{R}\\setminus\\{-3\\}$; $a=2>0$, więc funkcja maleje w $(-\\infty,-1)$ i w $(-1,+\\infty)$.",
          uwaga: "Znak: w $\\frac{2}{x+1}$ jest $p=-1$, bo $x+1=x-(-1)$.",
        },
        {
          nazwa: "Miejsce zerowe i współczynnik a",
          slownie: "Miejsce zerowe: rozwiązujemy równanie $\\frac{a}{x-p}+q=0$ i sprawdzamy dziedzinę. Współczynnik $a$ wyznaczamy, podstawiając współrzędne punktu do wzoru.",
          tex: "x_0=p-\\frac{a}{q}\\qquad q\\neq 0",
          przyklad: "$f(x)=\\frac{2}{x+1}-3=0$: $\\frac{2}{x+1}=3$, $2=3(x+1)$, $x=-\\frac{1}{3}$ (różne od $-1$, więc należy do dziedziny).",
        },
      ],
      jak: [
        "Zapisz wzór w postaci $\\frac{a}{x-p}+q$ i odczytaj $a$, $p$, $q$ (uważaj na znak $p$).",
        "Asymptoty: pionowa $x=p$, pozioma $y=q$.",
        "Dziedzina: $\\mathbb{R}\\setminus\\{p\\}$; zbiór wartości: $\\mathbb{R}\\setminus\\{q\\}$.",
        "Monotoniczność: dla $a>0$ maleje, dla $a<0$ rośnie – osobno w każdym z przedziałów $(-\\infty,p)$ i $(p,+\\infty)$.",
        "Miejsce zerowe: rozwiąż równanie wymierne i sprawdź dziedzinę.",
      ],
      zadania: [
        {
          nr: "31",
          tresc: "Wielkości $x$ i $y$ są odwrotnie proporcjonalne. Dla $x=3$ jest $y=8$. Ile wynosi $y$ dla $x=6$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$16$", "$11$", "$4$", "$48$"],
          poprawna: 2,
        },
        {
          nr: "32",
          tresc: "Zbiorem wartości funkcji $f(x)=\\frac{4}{x}$ jest: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\mathbb{R}$", "$(0,+\\infty)$", D(4), D(0)],
          poprawna: 3,
        },
        {
          nr: "33",
          tresc: "Asymptotami wykresu funkcji $f(x)=\\frac{3}{x-2}+1$ są proste: **Wybierz właściwą odpowiedź.**",
          opcje: ["$x=2$ i $y=1$", "$x=-2$ i $y=1$", "$x=1$ i $y=2$", "$x=2$ i $y=-1$"],
          poprawna: 0,
        },
        {
          nr: "34",
          tresc: "Funkcja $f(x)=-\\frac{5}{x}$ jest: **Wybierz właściwą odpowiedź.**",
          opcje: [
            "malejąca w każdym z przedziałów $(-\\infty,0)$ i $(0,+\\infty)$",
            "rosnąca w każdym z przedziałów $(-\\infty,0)$ i $(0,+\\infty)$",
            `rosnąca w zbiorze ${D(0)}`,
            "malejąca w przedziale $(-\\infty,0)$ i rosnąca w przedziale $(0,+\\infty)$",
          ],
          poprawna: 1,
        },
        {
          nr: "35",
          tresc: "Dana jest funkcja $g(x)=\\frac{2}{x+3}-4$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Prosta $x=-3$ jest asymptotą pionową wykresu funkcji $g$.", litery: "PF", poprawna: 0 },
            { tekst: `Zbiorem wartości funkcji $g$ jest ${D(-4)}.`, litery: "PF", poprawna: 0 },
            { tekst: "Wykres funkcji $g$ przecina oś $OY$ w punkcie $(0,-4)$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "36",
          tresc: "Miejscem zerowym funkcji $f(x)=\\frac{6}{x-1}-3$ jest liczba: **Wybierz właściwą odpowiedź.**",
          opcje: ["$1$", "$\\frac{7}{3}$", "$3$", "$-1$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "37",
          punkty: 3,
          tresc: "Dana jest funkcja $f(x)=-\\frac{4}{x-1}+2$. Podaj jej dziedzinę, zbiór wartości, równania asymptot i przedziały monotoniczności oraz oblicz miejsce zerowe. **Zapisz obliczenia.**",
          rozwiazanie:
            "Wzór ma postać $\\frac{a}{x-p}+q$, gdzie $a=-4$, $p=1$, $q=2$.\n\n" +
            "Dziedzina: $D_f=\\mathbb{R}\\setminus\\{1\\}$; zbiór wartości: $ZW_f=\\mathbb{R}\\setminus\\{2\\}$. Asymptoty: pionowa $x=1$, pozioma $y=2$.\n\n" +
            "Ponieważ $a<0$, funkcja jest rosnąca w każdym z przedziałów $(-\\infty,1)$ i $(1,+\\infty)$.\n\n" +
            "Miejsce zerowe: $-\\frac{4}{x-1}+2=0$, więc $\\frac{4}{x-1}=2$, czyli $4=2(x-1)$ i $x=3$. Liczba $3$ jest różna od $1$, więc należy do dziedziny.\n\n" +
            "Odpowiedź: $D_f=\\mathbb{R}\\setminus\\{1\\}$, $ZW_f=\\mathbb{R}\\setminus\\{2\\}$, asymptoty $x=1$ i $y=2$, funkcja rosnąca w $(-\\infty,1)$ i w $(1,+\\infty)$, miejsce zerowe $x=3$.",
        },
        {
          nr: "38",
          punkty: 2,
          tresc: "Wykres funkcji $f(x)=\\frac{a}{x-p}+q$ ma asymptoty $x=-2$ i $y=3$ oraz przechodzi przez punkt $(-1,5)$. Wyznacz $a$ i zapisz wzór funkcji $f$. **Zapisz obliczenia.**",
          rozwiazanie:
            "Asymptota pionowa $x=p$ daje $p=-2$, a pozioma $y=q$ daje $q=3$. Wzór: $f(x)=\\frac{a}{x+2}+3$.\n\n" +
            "Punkt $(-1,5)$ leży na wykresie: $5=\\frac{a}{-1+2}+3$, czyli $5=a+3$.\n\n" +
            "Stąd $a=2$.\n\n" +
            "Odpowiedź: $a=2$, $f(x)=\\frac{2}{x+2}+3$.",
        },
      ],
      generatory: [
        { id: "odczyt-p-q", nazwa: "Odczytaj p i q", opis: "Z wzoru $\\frac{a}{x-p}+q$ odczytaj przesunięcie, czyli równania asymptot.", generuj: genOdczyt },
        { id: "dziedzina-zbior-wartosci", nazwa: "Dziedzina i zbiór wartości", opis: "Wybierz dziedzinę i zbiór wartości funkcji homograficznej danej wzorem.", generuj: genDziedzinaZW },
        { id: "monotonicznosc", nazwa: "Monotoniczność", opis: "Wybierz prawdziwe zdanie o monotoniczności funkcji $\\frac{a}{x-p}+q$.", generuj: genMonotonicznosc },
        { id: "wartosc-i-zero", nazwa: "Wartość i miejsce zerowe", opis: "Oblicz wartość funkcji w punkcie i jej miejsce zerowe (sprawdzając dziedzinę).", generuj: genWartoscZero },
        { id: "wyznacz-a", nazwa: "Wyznacz a z punktu", opis: "Wyznacz współczynnik $a$ tak, aby wykres przechodził przez dany punkt.", generuj: genWyznaczA },
      ],
    },
  ],
};
