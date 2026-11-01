// Generatory zadań z działu „Egzamin ósmoklasisty – procenty i obliczenia praktyczne”: procent liczby, liczba z procentu, podwyżki i obniżki,
// zakupy i pieniądze, prędkość, jednostki miary, skala i plan, czas i kalendarz. Zadania ćwiczą dokładnie to, co tłumaczą karty z assets/wzory/e8-procenty.js.
// Kontrakt zadania i narzędzia: zob. wspolne.js. Każdy generator ma pole temat – id tematu z assets/arkusze/tematy.js (dział "e8-procenty").
// Liczby są dobierane tak, żeby wszystko dało się policzyć w pamięci, bez kalkulatora. Rozwiązania są pisane prostym językiem, kilka krótkich kroków.
// Odpowiedzi liczymy dokładnie na Q (bez liczb zmiennoprzecinkowych); pola z ułamkiem zwykłym przyjmują zarówno zapis dziesiętny (0,75), jak i zwykły (3/4).
import { Q, q } from "./wspolne.js";

/** Lista wzorów jako osobne $…$ po przecinkach – długa lista łamie się wtedy na wąskim ekranie. */
const listaTex = (arr) => arr.map((x) => `$${x}$`).join(", ");

// --- Drobne pomocnicze

const nwd = (a, b) => (b ? nwd(b, a % b) : Math.abs(a));
const nww = (a, b) => (a / nwd(a, b)) * b;
const cap = (s) => s[0].toUpperCase() + s.slice(1);

/** Liczba do tekstu z przecinkiem dziesiętnym: 7,5 -> "7{,}5" (min – najmniej miejsc po przecinku). Tysiące rozdzielone, gdy ≥ 10 000. */
function dz(x, min = 0) {
  const v = Q.z(x);
  for (let k = min; k <= 4; k++) {
    const m = v.mul(10 ** k);
    if (m.calkowita) {
      const cyfry = String(Math.abs(m.n)).padStart(k + 1, "0");
      let calosc = k ? cyfry.slice(0, -k) : cyfry;
      if (calosc.length >= 5) calosc = calosc.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
      return `${v.ujemna ? "-" : ""}${calosc}${k ? `{,}${cyfry.slice(-k)}` : ""}`;
    }
  }
  return v.tex();
}

/** Odmiana rzeczownika po liczebniku: lm(3, ["rok", "lata", "lat"]). */
function lm(n, [jedna, kilka, wiele]) {
  if (n === 1) return jedna;
  const j = n % 10, d = n % 100;
  return j >= 2 && j <= 4 && !(d >= 12 && d <= 14) ? kilka : wiele;
}

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });
const polew = (id, etykieta, opcje) => ({ id, typ: "wybor", etykieta, opcje });
const zad = (tresc, pola, odpowiedz, wynik, rozwiazanie) => ({ tresc, pola, odpowiedz, wynik, rozwiazanie });

/** Powtarza losowanie, aż f() zwróci zadanie (wartość różną od null); f korzysta z tego samego losownika, więc wynik jest powtarzalny. */
function probuj(f, proby = 800) {
  for (let i = 0; i < proby; i++) {
    const w = f();
    if (w) return w;
  }
  throw new Error("Nie udało się wylosować zadania");
}

/** Miesza opcje wyboru: poprawna + błędne. Zwraca { opcje, ind } albo null, gdy dwie opcje są takie same. */
function mieszaj(r, poprawna, zle) {
  const wszystkie = [poprawna, ...zle];
  if (new Set(wszystkie).size !== wszystkie.length) return null;
  const opcje = r.shuffle(wszystkie);
  return { opcje, ind: opcje.indexOf(poprawna) };
}

const fr = (a, b) => `\\frac{${a}}{${b}}`;
const wypisz = (arr) => (arr.length < 2 ? arr.join("") : `${arr.slice(0, -1).join(", ")} i ${arr[arr.length - 1]}`);

/** Liczba dziesiętna (np. 12,5 albo 0,25) jako dokładny ułamek; zwykłe liczby i Q przechodzą bez zmian. */
const qn = (x) => (x instanceof Q ? x : q(Math.round(x * 1000), 1000));
/** Liczba jako TeX z przecinkiem dziesiętnym. */
const T = (x) => dz(qn(x));
/** Kwota w TeX-ie: całe złote bez groszy, w pozostałych przypadkach dwa miejsca po przecinku (4{,}50). */
const zt = (x) => {
  const v = qn(x);
  return dz(v, v.calkowita ? 0 : 2);
};
/** „$4{,}50$ zł” */
const zl = (x) => `$${zt(x)}$ zł`;
/** Procent: wewnątrz wzoru oraz jako osobne $…$. */
const pct = (p) => `${T(p)}\\%`;
const pc = (p) => `$${pct(p)}$`;
/** Wynik z jednostką poza wzorem: „$7$ km”. */
const jed = (x, j) => `$${dz(qn(x))}$ ${j}`;
/** Najwyżej dwa miejsca po przecinku dla kwot (całe, połówki, ćwiartki, dziesiąte, setne). */
const doGroszy = (v) => 100 % v.d === 0;
/** Całe albo z połówką. */
const calePol = (v) => v.d === 1 || v.d === 2;
const podloga = (v) => Math.floor(Number(v));
const sufit = (v) => Math.ceil(Number(v));

const OSOBY = [
  { im: "Ola", k: true }, { im: "Kasia", k: true }, { im: "Ania", k: true }, { im: "Zosia", k: true }, { im: "Magda", k: true }, { im: "Hania", k: true },
  { im: "Marek", k: false }, { im: "Kuba", k: false }, { im: "Tomek", k: false }, { im: "Adam", k: false }, { im: "Bartek", k: false }, { im: "Piotrek", k: false },
];
/** Forma czasownika zależnie od rodzaju osoby: f(osoba, "kupił", "kupiła"). */
const f = (o, m, k) => (o.k ? k : m);

const UCZNIOW = ["uczeń", "uczniów", "uczniów"];
const STRON = ["strona", "strony", "stron"];
const LITROW = ["litr", "litry", "litrów"];
const DZIEWCZYNEK = ["dziewczynka", "dziewczynki", "dziewczynek"];
const CHLOPCOW = ["chłopiec", "chłopców", "chłopców"];
const ZADAN = ["zadanie", "zadania", "zadań"];
const OSOB = ["osoba", "osoby", "osób"];
/** „1 litr”, „3 litry”, „12 litrów”, a dla liczb niecałkowitych „7,5 litra”. */
const litrow = (n) => (Q.z(n).calkowita ? lm(Number(n), LITROW) : "litra");

// --- Wspólne kroki: procent z liczby (karta „Procent liczby”) i liczba z procentu (karta „Liczba z danego procentu”)

const PROC_ULAMEK = { 50: 2, 25: 4, 20: 5, 10: 10, 5: 20, 12.5: 8, 1: 100 };
const ULAMEK_SLOWO = { 2: "połowa", 4: "jedna czwarta", 5: "jedna piąta", 8: "jedna ósma", 10: "jedna dziesiąta", 20: "jedna dwudziesta", 100: "jedna setna" };

/** Kroki liczenia p% z liczby L w pamięci: ułamek, 10%, 5%, 1%. */
function krokiProcentZ(p, L) {
  const P = pct(p), Lq = qn(L), res = qn(p).mul(Lq).div(100), n = PROC_ULAMEK[p];
  const k = [];
  if (n) {
    k.push(`$${P} = ${fr(1, n)}$, czyli ${ULAMEK_SLOWO[n]} całości, więc dzielimy przez $${n}$.`);
    k.push(`$${dz(Lq)} : ${n} = ${dz(res)}$.`);
  } else if (p === 75) {
    const a = Lq.div(4);
    k.push(`$75\\%$ to trzy razy po $25\\%$, a $25\\%$ to jedna czwarta: $${dz(Lq)} : 4 = ${dz(a)}$.`);
    k.push(`Trzy takie części dają $3 \\cdot ${dz(a)} = ${dz(res)}$.`);
  } else if (p === 200) {
    k.push(`$200\\%$ to dwa razy całość: $2 \\cdot ${dz(Lq)} = ${dz(res)}$.`);
  } else if (p === 150) {
    k.push(`$150\\% = 100\\% + 50\\%$, czyli całość i jeszcze jej połowa.`);
    k.push(`$${dz(Lq)} + ${dz(Lq.div(2))} = ${dz(res)}$.`);
  } else if (p % 10 === 0) {
    const a = Lq.div(10);
    k.push(`$10\\%$ liczby to $${dz(Lq)} : 10 = ${dz(a)}$.`);
    k.push(`$${P}$ to $${p / 10}$ razy po $10\\%$: $${p / 10} \\cdot ${dz(a)} = ${dz(res)}$.`);
  } else if (p % 5 === 0) {
    const a = Lq.div(10), b = a.div(2), d = (p - 5) / 10;
    k.push(`$10\\%$ liczby to $${dz(Lq)} : 10 = ${dz(a)}$, a $5\\%$ to połowa tego: $${dz(b)}$.`);
    k.push(`$${P} = ${p - 5}\\% + 5\\%$, więc $${d === 1 ? dz(a) : `${d} \\cdot ${dz(a)}`} + ${dz(b)} = ${dz(res)}$.`);
  } else {
    const a = Lq.div(100);
    k.push(`$1\\%$ liczby to $${dz(Lq)} : 100 = ${dz(a)}$.`);
    k.push(`$${P}$ to $${p}$ razy tyle: $${p} \\cdot ${dz(a)} = ${dz(res)}$.`);
  }
  return k;
}

/** Kroki szukania całości W, gdy p% całości to c (wzór z karty: przez 1%, 10% albo ułamek). */
function krokiCalosc(p, c, W) {
  const P = pct(p), cq = qn(c), Wq = qn(W), n = PROC_ULAMEK[p];
  const k = [];
  if (n) {
    k.push(`$${P}$ to ${ULAMEK_SLOWO[n]} całości, więc całość jest $${n}$ razy większa od znanej części.`);
    k.push(`$${dz(cq)} \\cdot ${n} = ${dz(Wq)}$.`);
  } else if (p === 75) {
    const a = cq.div(3);
    k.push(`$75\\%$ to trzy razy po $25\\%$, więc $25\\%$ całości to $${dz(cq)} : 3 = ${dz(a)}$.`);
    k.push(`Całość to cztery takie części: $4 \\cdot ${dz(a)} = ${dz(Wq)}$.`);
  } else if (p === 150) {
    const a = cq.div(3);
    k.push(`$150\\%$ to trzy razy po $50\\%$, więc $50\\%$ całości to $${dz(cq)} : 3 = ${dz(a)}$.`);
    k.push(`Całość to dwa razy tyle: $2 \\cdot ${dz(a)} = ${dz(Wq)}$.`);
  } else if (p === 200) {
    k.push(`$200\\%$ to dwa razy całość, więc całość to połowa znanej liczby: $${dz(cq)} : 2 = ${dz(Wq)}$.`);
  } else if (p % 10 === 0) {
    const a = cq.div(p / 10);
    k.push(`$${P}$ to $${p / 10}$ razy po $10\\%$, więc $10\\%$ całości to $${dz(cq)} : ${p / 10} = ${dz(a)}$.`);
    k.push(`Całość to $10$ razy więcej: $10 \\cdot ${dz(a)} = ${dz(Wq)}$.`);
  } else if (p % 5 === 0) {
    const a = cq.div(p / 5);
    k.push(`$${P}$ to $${p / 5}$ razy po $5\\%$, więc $5\\%$ całości to $${dz(cq)} : ${p / 5} = ${dz(a)}$.`);
    k.push(`Całość to $20$ razy więcej: $20 \\cdot ${dz(a)} = ${dz(Wq)}$.`);
  } else {
    const a = cq.div(p);
    k.push(`Dzielimy znaną część przez liczbę procentów, żeby dostać $1\\%$: $${dz(cq)} : ${p} = ${dz(a)}$.`);
    k.push(`Całość to $100\\%$, czyli $100 \\cdot ${dz(a)} = ${dz(Wq)}$.`);
  }
  k.push(`Sprawdzenie: $${T(qn(p).div(100))} \\cdot ${dz(Wq)} = ${dz(cq)}$ – zgadza się.`);
  return k;
}

/** Kroki: jakim procentem liczby B jest liczba A (część przez całość, potem na procenty). */
function krokiJakiProcent(A, B, pierwszy) {
  const ul = q(A, B), p = ul.mul(100);
  const k = [pierwszy ?? `Częścią jest $${A}$, a całością $${B}$ (całość to liczba, z którą porównujemy). Zapisujemy ułamek: część przez całość, czyli $${fr(A, B)}$.`];
  if (B < 100 && 100 % B === 0) {
    const m = 100 / B;
    k.push(`Rozszerzamy ułamek do mianownika $100$ (licznik i mianownik mnożymy przez $${m}$): $${fr(A, B)} = ${fr(A * m, 100)}$.`);
    k.push(`Ułamek o mianowniku $100$ to procenty: $${fr(A * m, 100)} = ${dz(p)}\\%$.`);
  } else {
    if (ul.d !== B) k.push(`Skracamy ułamek: $${fr(A, B)} = ${ul.tex()}$.`);
    k.push(`Zamieniamy na procenty, mnożąc przez $100\\%$: $${ul.tex()} \\cdot 100\\% = ${dz(p)}\\%$.`);
  }
  return k;
}

// --- 1. Procent z liczby

const AKTYWNOSCI = [
  { tak: "chodzi na basen", nie: "nie chodzi na basen" },
  { tak: "jedzie na wycieczkę", nie: "nie jedzie na wycieczkę" },
  { tak: "gra w szkolnej drużynie", nie: "nie gra w szkolnej drużynie" },
  { tak: "ma okulary", nie: "nie ma okularów" },
  { tak: "jeździ do szkoły rowerem", nie: "nie jeździ do szkoły rowerem" },
];
const TOWARY = ["kurtki", "roweru", "plecaka", "telefonu", "butów", "hulajnogi", "rakiety tenisowej", "gry komputerowej", "słuchawek", "zegarka"];

const PROCENTY_Z = [5, 10, 10, 15, 20, 20, 25, 25, 30, 35, 40, 45, 50, 50, 60, 70, 75, 80, 90, 12.5, 12.5, 2, 4, 8, 1, 120, 150, 150, 200];

// Każdy kontekst: max – największy procent, który ma tu sens; licz – wynik musi być liczbą całkowitą; L – możliwe wartości całości.
const KONTEKSTY_PROCENT = [
  {
    max: 100, licz: true, L: [20, 24, 25, 28, 30, 32, 36, 40],
    buduj: (r) => {
      const a = r.pick(AKTYWNOSCI);
      return {
        opis: (L, P) => `W klasie jest $${L}$ uczniów. $${P}$ uczniów tej klasy ${a.tak}.`,
        pyt: `Ilu uczniów tej klasy ${a.tak}?`, zost: `Ilu uczniów tej klasy ${a.nie}?`,
        wyn: (n) => jed(n, lm(Number(n), UCZNIOW)), et: "Liczba uczniów",
      };
    },
  },
  {
    max: 100, licz: true, L: [200, 240, 250, 300, 400, 500, 600, 800, 1000],
    buduj: () => ({
      opis: (L, P) => `W szkole uczy się $${L}$ uczniów. Dziewczęta stanowią $${P}$ wszystkich uczniów.`,
      pyt: "Ile dziewcząt uczy się w tej szkole?", zost: "Ilu chłopców uczy się w tej szkole?",
      wyn: (n, z) => jed(n, lm(Number(n), z ? CHLOPCOW : DZIEWCZYNEK)), et: "Liczba uczniów",
    }),
  },
  {
    max: 100, min: 20, kwota: true, L: [20, 24, 30, 40, 50, 60, 80, 100],
    buduj: () => ({
      opis: (L, P) => `Bilet normalny do kina kosztuje $${L}$ zł. Bilet ulgowy kosztuje $${P}$ ceny biletu normalnego.`,
      pyt: "Ile złotych kosztuje bilet ulgowy?", zost: "O ile złotych bilet ulgowy jest tańszy od normalnego?",
      wyn: (n) => zl(n), et: "Kwota (w zł)",
    }),
  },
  {
    max: 100, min: 10, kwota: true, L: [400, 500, 600, 800, 1000, 1200, 1500, 2000],
    buduj: () => ({
      opis: (L, P) => `Rower kosztuje $${L}$ zł. Przy zakupie trzeba wpłacić zaliczkę w wysokości $${P}$ ceny roweru.`,
      pyt: "Ile złotych wynosi zaliczka?", zost: "Ile złotych zostanie do zapłacenia po wpłaceniu zaliczki?",
      wyn: (n) => zl(n), et: "Kwota (w zł)",
    }),
  },
  {
    max: 100, L: [40, 50, 60, 80, 100, 120, 200, 250, 400, 500, 1000],
    buduj: () => ({
      opis: (L, P) => `Zbiornik ma pojemność $${L}$ ${lm(L, LITROW)}. Woda zajmuje $${P}$ jego pojemności.`,
      pyt: "Ile litrów wody jest w zbiorniku?", zost: "Ile litrów wody brakuje, żeby zbiornik był pełny?",
      wyn: (n) => jed(n, litrow(n)), et: "Liczba litrów",
    }),
  },
  {
    max: 100, L: [20, 40, 50, 60, 80, 100, 120, 150, 200],
    buduj: (r, o) => ({
      opis: (L, P) => `Trasa wycieczki rowerowej ma długość $${L}$ km. ${o.im} ${f(o, "przejechał", "przejechała")} już $${P}$ całej trasy.`,
      pyt: `Ile kilometrów ${f(o, "przejechał", "przejechała")} ${o.im}?`, zost: "Ile kilometrów zostało jeszcze do przejechania?",
      wyn: (n) => jed(n, "km"), et: "Liczba kilometrów",
    }),
  },
  {
    max: 100, licz: true, L: [100, 120, 150, 200, 240, 250, 300, 320, 400, 500],
    buduj: (r, o) => ({
      opis: (L, P) => `Książka ma $${L}$ stron. ${o.im} ${f(o, "przeczytał", "przeczytała")} $${P}$ książki.`,
      pyt: `Ile stron ${f(o, "przeczytał", "przeczytała")} ${o.im}?`, zost: "Ile stron zostało do przeczytania?",
      wyn: (n) => jed(n, lm(Number(n), STRON)), et: "Liczba stron",
    }),
  },
  {
    max: Infinity, L: [20, 40, 50, 60, 80, 120, 160, 200, 240, 300, 400, 500, 600, 800, 1000],
    buduj: (r) => ({
      opis: (L, P) => r.pick([`Oblicz $${P}$ liczby $${L}$.`, `Ile wynosi $${P}$ z liczby $${L}$?`]),
      pyt: "", zost: null, wyn: (n) => `$${dz(n)}$`, et: "Wynik",
    }),
  },
  {
    max: Infinity, kwota: true, L: [20, 40, 50, 60, 80, 100, 120, 200, 240],
    buduj: (r) => {
      const t = r.pick(TOWARY);
      return {
        opis: (L, P) => `Cena ${t} wynosiła $${L}$ zł. Teraz nowa cena stanowi $${P}$ dawnej ceny.`,
        pyt: `Ile złotych wynosi teraz cena ${t}?`, zost: null, wyn: (n) => zl(n), et: "Kwota (w zł)",
      };
    },
  },
  {
    max: Infinity, L: [200, 400, 500, 800, 1000, 1200, 2000],
    buduj: () => ({
      opis: (L, P) => `Boisko szkolne ma pole $${L}\\ \\text{m}^2$. Po przebudowie jego pole wynosi $${P}$ dawnego pola.`,
      pyt: "Ile metrów kwadratowych ma boisko po przebudowie?", zost: null,
      wyn: (n) => `$${dz(n)}\\ \\text{m}^2$`, et: "Pole (w $\\text{m}^2$)",
    }),
  },
];

function procentZLiczby(r) {
  const o = r.pick(OSOBY);
  return probuj(() => {
    const p = r.pick(PROCENTY_Z);
    const k = r.pick(KONTEKSTY_PROCENT.filter((c) => p <= c.max && p >= (c.min ?? 0)));
    const L = r.pick(k.L);
    const res = qn(p).mul(L).div(100);
    if (k.licz ? !(res.calkowita && Number(res) >= 1) : !doGroszy(res) || res.d > 2) return null;
    const c = k.buduj(r, o);
    const zost = c.zost && r.chance(0.3);
    const ans = zost ? q(L).sub(res) : res;
    const kroki = krokiProcentZ(p, L);
    if (zost) {
      kroki.unshift(`Najpierw obliczamy ${pc(p)} z liczby $${L}$.`);
      kroki.push(`Pytanie dotyczy reszty, więc od całości odejmujemy obliczoną część: $${L} - ${dz(res)} = ${dz(ans)}$.`);
    }
    return zad(
      `${c.opis(L, pct(p))}${c.pyt || zost ? ` ${zost ? c.zost : c.pyt}` : ""}`,
      [pole("wynik", c.et)],
      { wynik: ans },
      c.wyn(ans, zost),
      kroki,
    );
  });
}

// --- 2. Jakim procentem jest, wykresy kołowe

function czescZCalosci(r) {
  const o = r.pick(OSOBY);
  return probuj(() => {
    const p = r.pick([5, 10, 12.5, 15, 20, 24, 25, 30, 35, 40, 45, 60, 75, 80, 90, 8, 4, 125, 150, 200]);
    const wiecej = p > 100;
    const B = r.pick(wiecej ? [20, 40, 50, 60, 80, 120, 200] : [8, 16, 20, 24, 25, 32, 40, 48, 50, 60, 64, 80, 120, 125, 160, 200, 250, 400, 500]);
    const A = qn(p).mul(B).div(100);
    if (!A.calkowita || Number(A) < 1) return null;
    const a = Number(A);
    const konteksty = [
      `Jakim procentem liczby $${B}$ jest liczba $${a}$?`,
      wiecej
        ? `Cena początkowa roweru wynosiła $${B}$ zł, a po podwyżce kosztuje on $${a}$ zł. Jakim procentem ceny początkowej jest nowa cena?`
        : `Jaką część procentową liczby $${B}$ stanowi liczba $${a}$?`,
    ];
    if (!wiecej) {
      if (B <= 50) konteksty.push(`Test składał się z $${B}$ zadań. ${o.im} ${f(o, "rozwiązał", "rozwiązała")} poprawnie $${a}$ ${lm(a, ZADAN)}. Jaki procent wszystkich zadań ${f(o, "rozwiązał", "rozwiązała")} poprawnie?`);
      if (B <= 40) konteksty.push(`W klasie jest $${B}$ uczniów, w tym $${a}$ ${lm(a, DZIEWCZYNEK)}. Jaki procent uczniów tej klasy stanowią dziewczynki?`);
      if (B >= 60) konteksty.push(`Książka ma $${B}$ stron. ${o.im} ${f(o, "przeczytał", "przeczytała")} już $${a}$ ${lm(a, STRON)}. Jaki procent książki ${f(o, "przeczytał", "przeczytała")} ${o.im}?`);
      if (B >= 20) konteksty.push(`Trasa ma długość $${B}$ km, a turyści przeszli już $${a}$ km. Jaki procent trasy przeszli turyści?`);
      konteksty.push(`W zbiorniku o pojemności $${B}$ ${lm(B, LITROW)} jest $${a}$ ${lm(a, LITROW)} wody. Jaki procent pojemności zbiornika zajmuje woda?`);
    }
    const tresc = r.pick(konteksty);
    return zad(
      tresc,
      [pole("proc", "Wynik (w procentach)")],
      { proc: qn(p) },
      `$${pct(p)}$`,
      krokiJakiProcent(a, B),
    );
  });
}

function katNaProcent(r) {
  const p = r.pick([5, 10, 12.5, 15, 20, 25, 30, 35, 37.5, 40, 45, 50, 60, 75, 80, 90]);
  const alfa = qn(p).mul(q(18, 5));
  const A = Number(alfa);
  const temat = r.pick([
    "Na wykresie kołowym pokazano, jak uczniowie pewnej klasy dojeżdżają do szkoły. Wycinek koła odpowiadający uczniom, którzy chodzą pieszo, ma kąt",
    "Na wykresie kołowym przedstawiono wyniki ankiety o ulubionym sporcie. Wycinek koła odpowiadający piłce nożnej ma kąt",
    "Na wykresie kołowym pokazano, na co ósmoklasiści wydają kieszonkowe. Wycinek koła odpowiadający słodyczom ma kąt",
    "Na wykresie kołowym przedstawiono, jak Kasia dzieli swój dzień. Wycinek koła odpowiadający nauce ma kąt",
  ]);
  const kroki = krokiJakiProcent(A, 360,
    `Całe koło ma $360^\\circ$ i odpowiada $100\\%$. Wycinek o kącie $${A}^\\circ$ jest częścią koła: $${fr(A, 360)}$.`);
  return zad(
    `${temat} $${A}^\\circ$. Jaki procent całości przedstawia ten wycinek?`,
    [pole("proc", "Wynik (w procentach)")],
    { proc: qn(p) },
    `$${pct(p)}$`,
    kroki,
  );
}

function procentNaKat(r) {
  const p = r.pick([5, 10, 12.5, 15, 20, 25, 30, 35, 37.5, 40, 45, 50, 60, 75, 80, 90]);
  const A = qn(p).mul(q(18, 5));
  const temat = r.pick([
    "Na wykresie kołowym wycinek przedstawiający uczniów, którzy lubią matematykę, ma odpowiadać",
    "Na wykresie kołowym wycinek przedstawiający wydatki na jedzenie ma odpowiadać",
    "Na wykresie kołowym wycinek przedstawiający osoby, które wybrały pływanie, ma odpowiadać",
    "W diagramie kołowym wycinek przedstawiający odpowiedź „tak” ma odpowiadać",
  ]);
  return zad(
    `${temat} ${pc(p)} całości. Jaki kąt (w stopniach) powinien mieć ten wycinek?`,
    [pole("kat", "Kąt (w stopniach)")],
    { kat: A },
    `$${dz(A)}^\\circ$`,
    [
      `Całe koło ma $360^\\circ$ i odpowiada $100\\%$, więc wycinek ${pc(p)} ma kąt równy ${pc(p)} z $360^\\circ$.`,
      ...krokiProcentZ(p, 360),
      `Czyli wycinek ma $${dz(A)}^\\circ$. (Pomaga zapamiętać: $1\\%$ koła to $3{,}6^\\circ$, a $25\\%$ koła to $90^\\circ$.)`,
    ],
  );
}

const TEMATY_WYKRESU = [
  { zap: "jak dojeżdżają do szkoły", kat: ["pieszo", "rowerem", "autobusem"], reszta: "samochodem" },
  { zap: "jaki sport lubią najbardziej", kat: ["piłka nożna", "siatkówka", "pływanie"], reszta: "inny sport" },
  { zap: "jakie zwierzę chcieliby mieć", kat: ["pies", "kot", "królik"], reszta: "inne zwierzę" },
  { zap: "jaki owoc lubią najbardziej", kat: ["jabłka", "banany", "truskawki"], reszta: "inne owoce" },
];

function wykresKolowy(r) {
  return probuj(() => {
    const N = r.pick([40, 60, 80, 100, 120, 140, 160, 200, 240, 300, 400]);
    const t = r.pick(TEMATY_WYKRESU);
    const ps = [r.int(2, 9) * 5, r.int(2, 9) * 5, r.int(2, 9) * 5];
    const S = ps[0] + ps[1] + ps[2];
    if (S > 90) return null;
    const reszta = 100 - S;
    const katPierwszy = r.chance(0.4);           // pierwszy wycinek podany kątem
    const czesci = ps.map((p, i) => (i === 0 && katPierwszy
      ? `„${t.kat[i]}” – wycinek o kącie $${p * 18 / 5}^\\circ$`
      : `„${t.kat[i]}” – $${p}\\%$`));
    const wstep = `W ankiecie zapytano $${N}$ uczniów, ${t.zap}. Wyniki przedstawiono na wykresie kołowym: ${wypisz(czesci)}, a pozostali uczniowie wybrali odpowiedź „${t.reszta}”.`;
    const kroki = [];
    if (katPierwszy) {
      kroki.push(`Wycinek o kącie $${ps[0] * 18 / 5}^\\circ$ to $${fr(ps[0] * 18 / 5, 360)}$ koła, czyli $${fr(ps[0] * 18 / 5, 360)} \\cdot 100\\% = ${ps[0]}\\%$ (całe koło to $360^\\circ$).`);
    }
    const w = r.int(0, 2);
    if (w === 0) {
      kroki.push(`Procenty z wszystkich wycinków muszą dać razem $100\\%$. Trzy znane wycinki: $${ps.join(" + ")} = ${S}$.`);
      kroki.push(`Na pozostałych uczniów zostaje $100 - ${S} = ${reszta}$, czyli $${reszta}\\%$.`);
      return zad(
        `${wstep} Jaki procent uczniów wybrał odpowiedź „${t.reszta}”?`,
        [pole("proc", "Wynik (w procentach)")], { proc: q(reszta) }, `$${reszta}\\%$`, kroki,
      );
    }
    if (w === 1) {
      const i = r.int(0, 2), p = ps[i], ile = q(p * N, 100);
      kroki.push(`Odpowiedź „${t.kat[i]}” wybrało ${pc(p)} z $${N}$ uczniów.`);
      kroki.push(...krokiProcentZ(p, N));
      return zad(
        `${wstep} Ilu uczniów wybrało odpowiedź „${t.kat[i]}”?`,
        [pole("ile", "Liczba uczniów")], { ile }, jed(ile, lm(Number(ile), UCZNIOW)), kroki,
      );
    }
    const ile = q(reszta * N, 100);
    kroki.push(`Znane wycinki dają razem $${ps.join(" + ")} = ${S}\\%$, więc odpowiedź „${t.reszta}” wybrało $100\\% - ${S}\\% = ${reszta}\\%$ uczniów.`);
    kroki.push(...krokiProcentZ(reszta, N));
    return zad(
      `${wstep} Ilu uczniów wybrało odpowiedź „${t.reszta}”?`,
      [pole("ile", "Liczba uczniów")], { ile }, jed(ile, lm(Number(ile), UCZNIOW)), kroki,
    );
  });
}

function jakimProcentem(r) {
  const w = r.int(0, 99);
  if (w < 40) return czescZCalosci(r);
  if (w < 52) return katNaProcent(r);
  if (w < 62) return procentNaKat(r);
  return wykresKolowy(r);
}

// --- 3. Liczba z procentu: całość, gdy znamy część

const PROCENTY_CALOSC = [5, 10, 10, 12.5, 15, 20, 20, 25, 25, 30, 35, 40, 45, 50, 60, 75, 80, 2, 4, 6, 8, 12, 16, 24, 120, 150, 200];

const KONTEKSTY_CALOSC = [
  {
    max: 100, licz: true, W: [20, 24, 25, 28, 30, 32, 36, 40, 50],
    buduj: () => ({
      opis: (c, P) => `W pewnej klasie $${dz(c)}$ ${lm(Number(c), DZIEWCZYNEK)} to $${P}$ wszystkich uczniów.`,
      pyt: "Ilu uczniów jest w tej klasie?", zost: "Ilu chłopców jest w tej klasie?",
      wyn: (n, z) => jed(n, lm(Number(n), z ? CHLOPCOW : UCZNIOW)), et: "Liczba uczniów",
    }),
  },
  {
    max: 100, licz: true, W: [200, 250, 300, 400, 500, 600, 800, 1000],
    buduj: () => ({
      opis: (c, P) => `W szkolnym konkursie wzięło udział $${dz(c)}$ ${lm(Number(c), UCZNIOW)}, co stanowi $${P}$ wszystkich uczniów szkoły.`,
      pyt: "Ilu uczniów liczy szkoła?", zost: "Ilu uczniów nie wzięło udziału w konkursie?",
      wyn: (n, z) => jed(n, lm(Number(n), UCZNIOW)), et: "Liczba uczniów",
    }),
  },
  {
    max: 100, licz: true, W: [100, 120, 150, 200, 240, 250, 300, 320, 400, 500],
    buduj: (r, o) => ({
      opis: (c, P) => `${o.im} ${f(o, "przeczytał", "przeczytała")} $${dz(c)}$ ${lm(Number(c), STRON)}, czyli $${P}$ całej książki.`,
      pyt: "Ile stron ma ta książka?", zost: "Ile stron zostało do przeczytania?",
      wyn: (n) => jed(n, lm(Number(n), STRON)), et: "Liczba stron",
    }),
  },
  {
    max: 100, W: [20, 40, 50, 60, 80, 100, 120, 150, 200],
    buduj: () => ({
      opis: (c, P) => `Turyści przeszli $${dz(c)}$ km, czyli $${P}$ długości całej trasy.`,
      pyt: "Ile kilometrów ma cała trasa?", zost: "Ile kilometrów zostało turystom do przejścia?",
      wyn: (n) => jed(n, "km"), et: "Liczba kilometrów",
    }),
  },
  {
    max: 100, W: [40, 50, 60, 80, 100, 120, 200, 250, 400, 500, 1000],
    buduj: () => ({
      opis: (c, P) => `W zbiorniku jest $${dz(c)}$ ${litrow(c)} wody, co stanowi $${P}$ jego pojemności.`,
      pyt: "Jaka jest pojemność zbiornika (w litrach)?", zost: "Ile litrów wody brakuje do pełnego zbiornika?",
      wyn: (n) => jed(n, litrow(n)), et: "Liczba litrów",
    }),
  },
  {
    max: Infinity, W: [20, 25, 40, 48, 50, 60, 64, 80, 96, 120, 150, 160, 200, 240, 250, 300, 400, 500, 600, 800, 1000],
    buduj: (r) => ({
      opis: (c, P) => r.pick([`$${P}$ pewnej liczby jest równe $${dz(c)}$.`, `Liczba $${dz(c)}$ stanowi $${P}$ pewnej liczby.`]),
      pyt: "Jaka to liczba?", zost: null, wyn: (n) => `$${dz(n)}$`, et: "Szukana liczba",
    }),
  },
];

function caloscZCzesci(r) {
  const o = r.pick(OSOBY);
  return probuj(() => {
    const p = r.pick(PROCENTY_CALOSC);
    const k = r.pick(KONTEKSTY_CALOSC.filter((c) => p <= c.max));
    const W = r.pick(k.W);
    const c = qn(p).mul(W).div(100);
    if (k.licz ? !(c.calkowita && Number(c) >= 1) : !(calePol(c) && Number(c) >= 1)) return null;
    const x = k.buduj(r, o);
    const zost = x.zost && r.chance(0.3);
    const ans = zost ? q(W).sub(c) : q(W);
    const kroki = krokiCalosc(p, c, W);
    if (zost) kroki.push(`Pytanie dotyczy reszty: od całości odejmujemy znaną część. $${W} - ${dz(c)} = ${dz(ans)}$.`);
    return zad(
      `${x.opis(c, pct(p))} ${zost ? x.zost : x.pyt}`,
      [pole("wynik", x.et)],
      { wynik: ans },
      x.wyn(ans, zost),
      kroki,
    );
  });
}

// --- 4. Cena przed rabatem, zaliczka, kieszonkowe: znamy kwotę, która jest procentem całości

function cenaPrzedRabatem(r) {
  const o = r.pick(OSOBY);
  return probuj(() => {
    const p = r.pick([5, 10, 10, 15, 20, 20, 25, 25, 30, 40, 50]);
    const W = r.pick([40, 60, 80, 100, 120, 150, 160, 200, 240, 250, 300, 400, 500, 600, 800, 1000, 1200, 1500, 2000]);
    const c = qn(p).mul(W).div(100);
    if (!calePol(c) || Number(c) < 2) return null;
    const t = r.pick(TOWARY);
    const P = pc(p), C = zt(c);
    const w = r.int(0, 5);
    const kroki = krokiCalosc(p, c, W);
    if (w === 0) {
      return zad(
        `Cenę ${t} obniżono o ${P}. Obniżka wyniosła $${C}$ zł. Ile złotych wynosiła cena ${t} przed obniżką?`,
        [pole("cena", "Cena przed obniżką (w zł)")], { cena: q(W) }, zl(W),
        [`Obniżka o ${P} to ${P} ceny sprzed obniżki, więc kwota $${C}$ zł to ${P} szukanej ceny. Szukamy całości.`, ...kroki],
      );
    }
    if (w === 1) {
      return zad(
        `Cenę ${t} obniżono o ${P}. Obniżka wyniosła $${C}$ zł. Ile złotych wynosi cena ${t} po obniżce?`,
        [pole("cena", "Cena po obniżce (w zł)")], { cena: q(W).sub(c) }, zl(q(W).sub(c)),
        [`Kwota obniżki $${C}$ zł to ${P} ceny sprzed obniżki. Najpierw szukamy całej ceny.`, ...kroki,
          `Cena po obniżce to cena pierwotna bez obniżki: $${W} - ${C} = ${zt(q(W).sub(c))}$ zł.`],
      );
    }
    if (w === 2) {
      return zad(
        `Cenę ${t} podwyższono o ${P}, czyli o $${C}$ zł. Ile złotych wynosiła cena ${t} przed podwyżką?`,
        [pole("cena", "Cena przed podwyżką (w zł)")], { cena: q(W) }, zl(W),
        [`Podwyżka o ${P} to ${P} ceny sprzed podwyżki, więc kwota $${C}$ zł to ${P} szukanej ceny.`, ...kroki],
      );
    }
    if (w === 3) {
      return zad(
        `Cenę ${t} podwyższono o ${P}, czyli o $${C}$ zł. Ile złotych wynosi cena ${t} po podwyżce?`,
        [pole("cena", "Cena po podwyżce (w zł)")], { cena: q(W).add(c) }, zl(q(W).add(c)),
        [`Kwota podwyżki $${C}$ zł to ${P} ceny sprzed podwyżki. Najpierw szukamy tej ceny.`, ...kroki,
          `Cena po podwyżce to cena pierwotna i podwyżka razem: $${W} + ${C} = ${zt(q(W).add(c))}$ zł.`],
      );
    }
    if (w === 4) {
      const dopl = r.chance(0.5);
      return zad(
        `${o.im} ${f(o, "wpłacił", "wpłaciła")} zaliczkę na wycieczkę: ${P} całej ceny, czyli $${C}$ zł. ${dopl ? "Ile złotych trzeba jeszcze dopłacić?" : "Ile złotych kosztuje cała wycieczka?"}`,
        [pole("cena", dopl ? "Dopłata (w zł)" : "Cena wycieczki (w zł)")], { cena: dopl ? q(W).sub(c) : q(W) }, zl(dopl ? q(W).sub(c) : W),
        [`Zaliczka $${C}$ zł to ${P} ceny wycieczki. Szukamy całości.`, ...kroki,
          ...(dopl ? [`Do dopłaty zostaje reszta: $${W} - ${C} = ${zt(q(W).sub(c))}$ zł.`] : [])],
      );
    }
    const zostalo = r.chance(0.4);
    return zad(
      `${o.im} ${f(o, "odłożył", "odłożyła")} ${P} swojego miesięcznego kieszonkowego, czyli $${C}$ zł. ${zostalo ? "Ile złotych zostało na wydatki?" : "Ile złotych wynosi całe kieszonkowe?"}`,
      [pole("cena", zostalo ? "Kwota na wydatki (w zł)" : "Kieszonkowe (w zł)")], { cena: zostalo ? q(W).sub(c) : q(W) }, zl(zostalo ? q(W).sub(c) : W),
      [`Odłożone $${C}$ zł to ${P} kieszonkowego. Szukamy całości.`, ...kroki,
        ...(zostalo ? [`Na wydatki zostaje reszta: $${W} - ${C} = ${zt(q(W).sub(c))}$ zł.`] : [])],
    );
  });
}

// --- 5. Podwyżki i obniżki: nowa cena, dwie zmiany po sobie, zmiana łączna

const ZMIANY_PROC = [5, 10, 15, 20, 25, 30, 40, 50];
const CENY_ZMIANY = [40, 60, 80, 100, 120, 150, 160, 200, 240, 250, 300, 400, 500, 600, 800, 1000, 1200, 2000];
/** Mnożnik po zmianie: s = 1 podwyżka, s = -1 obniżka (+20% daje 6/5, -25% daje 3/4). */
const mnoz = (s, p) => qn(100 + s * p).div(100);
const znak = (s) => (s > 0 ? "+" : "-");

function nowaCena(r) {
  const t = r.pick(TOWARY);
  return probuj(() => {
    const s = r.chance(0.5) ? 1 : -1;
    const p = r.pick(ZMIANY_PROC), L = r.pick(CENY_ZMIANY);
    const m = mnoz(s, p), N = q(L).mul(m), zm = q(L).mul(qn(p)).div(100);
    if (!calePol(N)) return null;
    const P = pc(p);
    const tresc = s > 0
      ? r.pick([
        `Cena ${t} wynosiła $${L}$ zł. Sklep podniósł ją o ${P}. Ile złotych wynosi nowa cena?`,
        `Cenę ${t} wynoszącą $${L}$ zł podwyższono o ${P}. Ile złotych wynosi cena po podwyżce?`,
      ])
      : r.pick([
        `Cena ${t} wynosiła $${L}$ zł. Podczas wyprzedaży obniżono ją o ${P}. Ile złotych wynosi nowa cena?`,
        `Cenę ${t} wynoszącą $${L}$ zł obniżono o ${P}. Ile złotych wynosi cena po obniżce?`,
      ]);
    return zad(
      tresc,
      [pole("cena", "Nowa cena (w zł)")],
      { cena: N },
      zl(N),
      [
        `Cena pierwotna to $100\\%$. Po ${s > 0 ? "podwyżce" : "obniżce"} o ${P} cena wynosi $100\\% ${znak(s)} ${pct(p)} = ${100 + s * p}\\%$ ceny pierwotnej, czyli $${dz(m)}$ tej ceny.`,
        `Mnożymy: $${L} \\cdot ${dz(m)} = ${dz(N)}$.`,
        `Sprawdzenie: ${P} z $${L}$ to $${dz(zm)}$ zł, a $${L} ${znak(s)} ${dz(zm)} = ${dz(N)}$ – zgadza się.`,
      ],
    );
  });
}

function dwieZmiany(r) {
  const t = r.pick(TOWARY);
  return probuj(() => {
    const s1 = r.chance(0.5) ? 1 : -1, s2 = r.chance(0.5) ? 1 : -1;
    const p1 = r.pick(ZMIANY_PROC), p2 = r.pick(ZMIANY_PROC), L = r.pick(CENY_ZMIANY);
    const m1 = mnoz(s1, p1), m2 = mnoz(s2, p2);
    const N1 = q(L).mul(m1), N2 = N1.mul(m2);
    if (!calePol(N1) || !calePol(N2)) return null;
    const slowo = (s) => (s > 0 ? "podwyższono" : "obniżono");
    const laczne = s1 * p1 + s2 * p2;
    const S = q(L).mul(qn(100 + laczne)).div(100);
    const kroki = [
      `Po pierwszej zmianie cena to $${100 + s1 * p1}\\%$ ceny pierwotnej: $${L} \\cdot ${dz(m1)} = ${dz(N1)}$ zł.`,
      `Druga zmiana liczy się od nowej ceny ($${dz(N1)}$ zł), a nie od pierwotnej: $${dz(N1)} \\cdot ${dz(m2)} = ${dz(N2)}$ zł.`,
    ];
    kroki.push(laczne > -100 && calePol(S)
      ? `Uwaga: procentów nie dodajemy. Gdyby dodać zmiany ($${znak(s1)}${p1}\\% ${znak(s2)} ${p2}\\% = ${laczne}\\%$), cena wyszłaby $${dz(S)}$ zł – to błędny wynik.`
      : "Uwaga: procentów z dwóch zmian nie dodajemy, bo druga zmiana liczy się od innej ceny niż pierwsza.");
    return zad(
      `Cena ${t} wynosiła $${L}$ zł. Najpierw ją ${slowo(s1)} o ${pc(p1)}, a potem nową cenę ${slowo(s2)} o ${pc(p2)}. Ile złotych wynosi cena końcowa?`,
      [pole("cena", "Cena końcowa (w zł)")],
      { cena: N2 },
      zl(N2),
      kroki,
    );
  });
}

function zmianaLaczna(r) {
  const t = r.pick(TOWARY);
  return probuj(() => {
    const s1 = r.chance(0.5) ? 1 : -1, s2 = r.chance(0.5) ? 1 : -1;
    const p1 = r.pick(ZMIANY_PROC), p2 = r.pick(ZMIANY_PROC);
    const m1 = mnoz(s1, p1), m2 = mnoz(s2, p2);
    const N1 = q(100).mul(m1), N2 = N1.mul(m2);
    if (!calePol(N2) || N2.eq(100)) return null;
    const slowo = (s) => (s > 0 ? "podwyższono" : "obniżono");
    const wyzsza = N2.cmp(100) > 0;
    const roznica = wyzsza ? N2.sub(100) : q(100).sub(N2);
    const procent = r.chance(0.5);
    const opis = `Cenę ${t} najpierw ${slowo(s1)} o ${pc(p1)}, a potem nową cenę ${slowo(s2)} o ${pc(p2)}.`;
    const pyt = procent
      ? "Ile procent ceny początkowej stanowi cena końcowa?"
      : `O ile procent cena końcowa jest ${wyzsza ? "wyższa" : "niższa"} od ceny początkowej?`;
    const odp = procent ? N2 : roznica;
    return zad(
      `${opis} ${pyt}`,
      [pole("proc", "Wynik (w procentach)")],
      { proc: odp },
      `$${dz(odp)}\\%$`,
      [
        "Wygodnie przyjąć, że cena początkowa to $100$ zł – wtedy $1\\%$ to $1$ zł i procenty łatwo zamienić na złotówki.",
        `Po pierwszej zmianie: $100 \\cdot ${dz(m1)} = ${dz(N1)}$ zł.`,
        `Po drugiej zmianie (liczonej od nowej ceny): $${dz(N1)} \\cdot ${dz(m2)} = ${dz(N2)}$ zł.`,
        procent
          ? `Cena końcowa to $${dz(N2)}$ zł przy cenie początkowej $100$ zł, czyli $${dz(N2)}\\%$ ceny początkowej. (Procentów nie dodajemy: $${znak(s1)}${p1}\\% ${znak(s2)} ${p2}\\%$ to nie jest łączna zmiana.)`
          : `Cena końcowa to $${dz(N2)}$ zł przy cenie początkowej $100$ zł, więc jest ${wyzsza ? "wyższa" : "niższa"} o $${dz(roznica)}$ zł, czyli o $${dz(roznica)}\\%$. (Procentów nie dodajemy.)`,
      ],
    );
  });
}

function zmianyCen(r) {
  const w = r.int(0, 99);
  if (w < 40) return nowaCena(r);
  if (w < 75) return dwieZmiany(r);
  return zmianaLaczna(r);
}

// --- 6. Cena przed zmianą, o ile procent, lokata, punkty procentowe

function cenaPrzedZmiana(r) {
  const t = r.pick(TOWARY);
  return probuj(() => {
    const s = r.chance(0.5) ? 1 : -1;
    const p = r.pick(ZMIANY_PROC), W = r.pick([40, 60, 80, 100, 120, 150, 160, 200, 240, 250, 300, 400, 500, 600, 800, 1000]);
    const m = mnoz(s, p), N = q(W).mul(m);
    if (!calePol(N)) return null;
    const P = pc(p), pn = 100 + s * p;
    const zm = s > 0 ? "podwyżki" : "obniżki";
    const kroki = [
      `Szukana cena sprzed ${zm} to $100\\%$. Po ${s > 0 ? "podwyżce" : "obniżce"} o ${P} cena wynosi $100\\% ${znak(s)} ${pct(p)} = ${pn}\\%$ ceny sprzed ${zm}.`,
      `Czyli kwota $${zt(N)}$ zł to $${pn}\\%$ szukanej ceny. Szukamy całości.`,
      ...krokiCalosc(pn, N, W),
    ];
    const naN = N.mul(qn(p)).div(100);
    if (doGroszy(naN)) kroki.push(`Pułapka: ${P} z $${zt(N)}$ zł to $${zt(naN)}$ zł, ale zmiana dotyczyła starej ceny, a nie nowej – dlatego nie doliczamy ani nie odliczamy procentów od $${zt(N)}$ zł.`);
    return zad(
      s > 0
        ? `Po podwyżce o ${P} cena ${t} wynosi $${zt(N)}$ zł. Ile złotych wynosiła cena ${t} przed podwyżką?`
        : `Po obniżce o ${P} cena ${t} wynosi $${zt(N)}$ zł. Ile złotych wynosiła cena ${t} przed obniżką?`,
      [pole("cena", `Cena przed ${s > 0 ? "podwyżką" : "obniżką"} (w zł)`)],
      { cena: q(W) },
      zl(W),
      kroki,
    );
  });
}

function oIleProcent(r) {
  return probuj(() => {
    const s = r.chance(0.5) ? 1 : -1;
    const p = r.pick([5, 10, 12.5, 15, 20, 25, 30, 40, 50]);
    const a = r.pick([20, 24, 25, 40, 50, 60, 80, 100, 120, 150, 160, 200, 240, 250, 400, 500]);
    const b = q(a).mul(mnoz(s, p));
    if (!b.calkowita) return null;
    const bb = Number(b), d = Math.abs(bb - a);
    const ratio = q(d, a);
    const wz = s > 0;
    const kontekst = r.pick([
      { tresc: `Cena zestawu klocków ${wz ? "wzrosła" : "zmalała"} z $${a}$ zł do $${bb}$ zł.`, co: "ta cena", jed: "zł" },
      { tresc: `Liczba członków klubu ${wz ? "wzrosła" : "zmalała"} z $${a}$ do $${bb}$ osób.`, co: "ta liczba", jed: "" },
      { tresc: `Liczba widzów na meczu ${wz ? "wzrosła" : "zmalała"} z $${a}$ do $${bb}$.`, co: "ta liczba", jed: "" },
    ]);
    return zad(
      `${kontekst.tresc} O ile procent ${wz ? "wzrosła" : "zmalała"} ${kontekst.co}?`,
      [pole("proc", "Wynik (w procentach)")],
      { proc: qn(p) },
      `$${pct(p)}$`,
      [
        `Najpierw liczymy, o ile się zmieniło: $${Math.max(a, bb)} - ${Math.min(a, bb)} = ${d}$${kontekst.jed ? ` ${kontekst.jed}` : ""}.`,
        `Procent liczymy od wartości początkowej, czyli od $${a}$. Zapisujemy ułamek: zmiana przez wartość początkową, $${fr(d, a)}$.`,
        `Zamieniamy na procenty: $${fr(d, a)} = ${dz(ratio)} = ${pct(p)}$. Wartość ${wz ? "wzrosła" : "zmalała"} więc o ${pc(p)}.`,
      ],
    );
  });
}

function lokata(r) {
  return probuj(() => {
    const p = r.pick([2, 3, 4, 5, 6, 8, 10]);
    const W = r.pick([500, 800, 1000, 1200, 1500, 2000, 2500, 3000, 4000, 5000]);
    const o = q(W).mul(p).div(100), K = q(W).add(o);
    const w = r.int(0, 2);
    const wst = `Na lokatę na rok wpłacono $${W}$ zł. Oprocentowanie w skali roku wynosi ${pc(p)} (pomiń podatek od odsetek).`;
    if (w === 0) {
      return zad(
        `${wst} Ile złotych wyniosą odsetki po roku?`,
        [pole("odsetki", "Odsetki (w zł)")], { odsetki: o }, zl(o),
        [`Odsetki po roku to ${pc(p)} z wpłaty $${W}$ zł.`, ...krokiProcentZ(p, W)],
      );
    }
    if (w === 1) {
      return zad(
        `${wst} Ile złotych będzie na koncie po roku?`,
        [pole("konto", "Stan konta (w zł)")], { konto: K }, zl(K),
        [
          `Odsetki po roku to ${pc(p)} z wpłaty $${W}$ zł.`,
          ...krokiProcentZ(p, W),
          `Na koncie jest wpłata razem z odsetkami: $${W} + ${dz(o)} = ${dz(K)}$ zł. (Można też od razu: $${W} \\cdot ${dz(mnoz(1, p))} = ${dz(K)}$.)`,
        ],
      );
    }
    return zad(
      `Po roku na lokacie jest $${dz(K)}$ zł (wpłata razem z odsetkami). Oprocentowanie w skali roku wynosi ${pc(p)}. Ile złotych wpłacono na lokatę?`,
      [pole("wplata", "Wpłata (w zł)")], { wplata: q(W) }, zl(W),
      [
        `Na koncie jest wpłata i odsetki razem, czyli $100\\% + ${pct(p)} = ${100 + p}\\%$ wpłaty. Znamy tę część: $${dz(K)}$ zł. Szukamy całości (wpłaty).`,
        ...krokiCalosc(100 + p, K, W),
      ],
    );
  });
}

const PP = ["punkt procentowy", "punkty procentowe", "punktów procentowych"];
const KTO_PP = [
  { kto: "Frekwencja na zebraniach", rodz: "f", opis: (a, b) => `Frekwencja na zebraniach rodziców wynosiła $${a}\\%$, a na następnym zebraniu wyniosła $${b}\\%$.` },
  { kto: "Oprocentowanie lokaty", rodz: "n", opis: (a, b) => `Oprocentowanie lokaty wynosiło $${a}\\%$, a po zmianie wynosi $${b}\\%$.` },
  { kto: "Odsetek uczniów korzystających z biblioteki", rodz: "m", opis: (a, b) => `Odsetek uczniów korzystających z biblioteki zmienił się z $${a}\\%$ na $${b}\\%$.` },
  { kto: "Poparcie dla pomysłu klasowej wycieczki", rodz: "n", opis: (a, b) => `Poparcie dla pomysłu klasowej wycieczki zmieniło się z $${a}\\%$ na $${b}\\%$.` },
];
const CZAS_PP = { f: ["wzrosła", "zmalała"], n: ["wzrosło", "zmalało"], m: ["wzrósł", "zmalał"] };

function losujPP(r) {
  return probuj(() => {
    const a = r.pick([4, 5, 8, 10, 16, 20, 25, 30, 40, 50, 60, 80]);
    const d = r.int(1, Math.min(a, 20));
    const wz = r.chance(0.5);
    const b = wz ? a + d : a - d;
    if (b < 1 || b > 100) return null;
    const wzgl = q(100 * d, a);
    if (!calePol(wzgl) || wzgl.eq(d)) return null;
    return { a, b, d, wz, wzgl, k: r.pick(KTO_PP) };
  });
}

function punktyProcentowe(r) {
  const { a, b, d, wz, wzgl, k } = losujPP(r);
  const [w1, w2] = CZAS_PP[k.rodz];
  const slowo = wz ? w1 : w2, przeciw = wz ? w2 : w1;
  if (r.chance(0.5)) {
    return zad(
      `${k.opis(a, b)} Podaj, o ile punktów procentowych i o ile procent (w stosunku do wartości początkowej) ${wz ? "wzrosła" : "zmalała"} ta wartość.`,
      [pole("pp", "Zmiana w punktach procentowych"), pole("proc", "Zmiana w procentach")],
      { pp: q(d), proc: wzgl },
      `$${d}$ ${lm(d, PP)} i $${dz(wzgl)}\\%$`,
      [
        `Punkty procentowe to różnica dwóch procentów: $${Math.max(a, b)} - ${Math.min(a, b)} = ${d}$ ${lm(d, PP)}.`,
        `Procent liczymy od wartości początkowej ($${a}\\%$): zmiana przez wartość początkową to $${fr(d, a)}$.`,
        `$${fr(d, a)} = ${dz(q(d, a))} = ${dz(wzgl)}\\%$. Zmiana to $${d}$ ${lm(d, PP)}, ale w procentach: $${dz(wzgl)}\\%$.`,
      ],
    );
  }
  const poprawna = `${k.kto} ${slowo} o $${d}$ ${lm(d, PP)}.`;
  const zle = [
    `${k.kto} ${slowo} o $${d}\\%$.`,
    `${k.kto} ${przeciw} o $${d}$ ${lm(d, PP)}.`,
    `${k.kto} ${slowo} o $${b}$ ${lm(b, PP)}.`,
  ];
  const m = mieszaj(r, poprawna, zle);
  if (!m) return punktyProcentowe(r);
  return zad(
    `${k.opis(a, b)} Które zdanie jest prawdziwe?`,
    [polew("zdanie", "Prawdziwe zdanie", m.opcje)],
    { zdanie: m.ind },
    poprawna,
    [
      `Zmiana oprocentowania, frekwencji czy poparcia to różnica dwóch procentów: $${Math.max(a, b)} - ${Math.min(a, b)} = ${d}$. Mierzymy ją w punktach procentowych, więc ${wz ? "wzrost" : "spadek"} to $${d}$ ${lm(d, PP)}.`,
      `Zdanie z „$${d}\\%$” jest błędne: w procentach zmiana wynosi $${fr(d, a)} = ${dz(wzgl)}\\%$ wartości początkowej, a nie $${d}\\%$.`,
      `Pozostałe zdania mają zły kierunek zmiany (${wz ? "zmalało zamiast wzrosło" : "wzrosło zamiast zmalało"}) albo złą liczbę punktów ($${b}$ to nowa wartość, a nie zmiana).`,
    ],
  );
}

function cofanieIPunkty(r) {
  const w = r.int(0, 99);
  if (w < 30) return cenaPrzedZmiana(r);
  if (w < 50) return oIleProcent(r);
  if (w < 75) return lokata(r);
  return punktyProcentowe(r);
}

// --- 7. Cena za sztukę i za kilogram, opłacalność

const PRODUKTY_KG = [
  { nom: "ser żółty", gen: "sera żółtego", ceny: [18, 20, 24, 28, 32, 36, 40] },
  { nom: "szynka", gen: "szynki", ceny: [30, 36, 40, 48, 50] },
  { nom: "orzechy", gen: "orzechów", ceny: [30, 40, 48, 60] },
  { nom: "truskawki", gen: "truskawek", ceny: [12, 16, 18, 20, 24] },
  { nom: "wiśnie", gen: "wiśni", ceny: [8, 10, 12, 14, 16] },
  { nom: "kiełbasa", gen: "kiełbasy", ceny: [16, 20, 24, 28, 32] },
  { nom: "ciastka", gen: "ciastek", ceny: [20, 24, 30, 36, 40] },
];
const SZTUKI = [
  ["zeszyt", "zeszyty", "zeszytów"], ["długopis", "długopisy", "długopisów"], ["bułka", "bułki", "bułek"],
  ["jajko", "jajka", "jajek"], ["batonik", "batoniki", "batoników"], ["mandarynka", "mandarynki", "mandarynek"],
  ["gumka", "gumki", "gumek"], ["pączek", "pączki", "pączków"],
];

function kosztWagi(r) {
  const p = r.pick(PRODUKTY_KG), c = r.pick(p.ceny);
  const dag = r.chance(0.4);
  const g = dag ? r.pick([10, 20, 25, 30, 50, 75, 15]) * 10 : r.pick([100, 200, 250, 300, 400, 500, 750]);
  const kg = q(g, 1000), koszt = q(c).mul(kg);
  const waga = dag ? `$${g / 10}$ dag` : `$${g}$ g`;
  const zam = dag ? `$${g / 10}$ dag $= ${dz(kg)}$ kg (bo $1$ kg $= 100$ dag)` : `$${g}$ g $= ${dz(kg)}$ kg (bo $1$ kg $= 1000$ g)`;
  return zad(
    `Kilogram ${p.gen} kosztuje $${c}$ zł. Ile złotych zapłacisz za ${waga} ${p.gen}?`,
    [pole("koszt", "Kwota (w zł)")], { koszt }, zl(koszt),
    [
      `Cena jest podana za $1$ kg, więc masę zamieniamy na kilogramy: ${zam}.`,
      `Mnożymy cenę za $1$ kg przez liczbę kilogramów: $${c} \\cdot ${dz(kg)} = ${dz(koszt)}$.`,
      `Za ${waga} ${p.gen} zapłacisz ${zl(koszt)}.`,
    ],
  );
}

function cenaJednostkowa(r) {
  if (r.chance(0.5)) {
    return probuj(() => {
      const p = r.pick(PRODUKTY_KG);
      const m = r.pick([0.5, 1.5, 2, 2.5, 3, 4, 5]);
      const u = q(r.int(30, 200), 10);
      const C = u.mul(qn(m));
      if (!doGroszy(C)) return null;
      return zad(
        `Za $${T(m)}$ kg ${p.gen} zapłacono $${zt(C)}$ zł. Ile złotych kosztuje $1$ kg ${p.gen}?`,
        [pole("cena", "Cena za 1 kg (w zł)")], { cena: u }, zl(u),
        [
          `Cenę za $1$ kg dostajemy, dzieląc całą kwotę przez liczbę kilogramów.`,
          `$${zt(C)} : ${T(m)} = ${zt(u)}$ (bo $${T(m)} \\cdot ${zt(u)} = ${zt(C)}$).`,
          `Kilogram ${p.gen} kosztuje ${zl(u)}.`,
        ],
      );
    });
  }
  return probuj(() => {
    const n = r.pick([4, 5, 6, 8, 10, 12]);
    const formy = r.pick(SZTUKI);
    const u = q(r.int(2, 60) * 5, 100);   // od 0,10 zł do 3,00 zł, co 5 groszy
    const C = u.mul(n);
    if (!doGroszy(C)) return null;
    return zad(
      `Za $${n}$ ${lm(n, formy)} zapłacono $${zt(C)}$ zł. Ile złotych kosztuje jedna sztuka?`,
      [pole("cena", "Cena jednej sztuki (w zł)")], { cena: u }, zl(u),
      [
        "Cenę jednej sztuki dostajemy, dzieląc całą kwotę przez liczbę sztuk.",
        `$${zt(C)} : ${n} = ${zt(u)}$ (bo $${n} \\cdot ${zt(u)} = ${zt(C)}$).`,
        `Jedna sztuka kosztuje ${zl(u)}.`,
      ],
    );
  });
}

function ktoraTansza(r) {
  return probuj(() => {
    const p = r.pick([
      { nom: "cukier", gen: "cukru" }, { nom: "ryż", gen: "ryżu" }, { nom: "mąka", gen: "mąki" },
      { nom: "kasza", gen: "kaszy" }, { nom: "makaron", gen: "makaronu" }, { nom: "kawa", gen: "kawy" },
    ]);
    const mm = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5];
    const m1 = r.pick(mm), m2 = r.pick(mm);
    if (m1 === m2) return null;
    const u1 = q(r.int(30, 120), 10);
    const delta = r.chance(0.12) ? 0 : r.pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
    const u2 = u1.add(q(delta, 10));
    if (Number(u2) < 1) return null;
    const C1 = u1.mul(qn(m1)), C2 = u2.mul(qn(m2));
    if (!doGroszy(C1) || !doGroszy(C2)) return null;
    const opcje = ["w opakowaniu A", "w opakowaniu B", "w obu opakowaniach tyle samo"];
    const ind = delta === 0 ? 2 : delta > 0 ? 0 : 1;
    const tansze = ind === 0 ? "A" : "B";
    return zad(
      `W sklepie można kupić ${p.nom} w dwóch opakowaniach: opakowanie A – $${T(m1)}$ kg za $${zt(C1)}$ zł, opakowanie B – $${T(m2)}$ kg za $${zt(C2)}$ zł. W którym opakowaniu $1$ kg ${p.gen} jest tańszy?`,
      [polew("opak", "Odpowiedź", opcje)],
      { opak: ind },
      opcje[ind],
      [
        "Oferty o różnych ilościach porównujemy, sprowadzając je do tej samej ilości – tu do $1$ kg.",
        `Opakowanie A: $${zt(C1)} : ${T(m1)} = ${zt(u1)}$ zł za $1$ kg. Opakowanie B: $${zt(C2)} : ${T(m2)} = ${zt(u2)}$ zł za $1$ kg.`,
        delta === 0
          ? `Ceny za $1$ kg są takie same ($${zt(u1)}$ zł), więc oba opakowania są jednakowo opłacalne.`
          : `Mniej złotych za $1$ kg trzeba zapłacić w opakowaniu ${tansze} ($${zt(ind === 0 ? u1 : u2)}$ zł zamiast $${zt(ind === 0 ? u2 : u1)}$ zł), więc ono jest tańsze. Większe opakowanie nie zawsze jest tańsze – trzeba policzyć.`,
      ],
    );
  });
}

const SZTUKI_CENA = [
  ["zeszyt", "zeszytów"], ["długopis", "długopisów"], ["batonik", "batoników"], ["ołówek", "ołówków"], ["pączek", "pączków"], ["bilet", "biletów"],
];

function ileSztukZaKwote(r) {
  return probuj(() => {
    const [nom, gen] = r.pick(SZTUKI_CENA);
    const c = q(r.pick([15, 20, 25, 30, 35, 40, 45, 60, 75, 80, 120, 150]), 10);
    const M = r.pick([10, 20, 30, 40, 50, 60, 100]);
    const wynik = podloga(q(M).div(c));
    const jeszcze = c.mul(wynik + 1);
    if (wynik < 3 || wynik > 40 || q(M).div(c).calkowita) return null;
    return zad(
      `${cap(nom)} kosztuje $${zt(c)}$ zł. Ile ${gen} można kupić za $${M}$ zł?`,
      [pole("ile", "Liczba sztuk")], { ile: q(wynik) }, `$${wynik}$`,
      [
        "Pytamy o pełne sztuki, więc dzielimy pieniądze przez cenę jednej sztuki i zaokrąglamy wynik w dół.",
        `Sprawdzamy: $${wynik} \\cdot ${zt(c)} = ${zt(c.mul(wynik))}$ zł – wystarczy, a $${wynik + 1} \\cdot ${zt(c)} = ${zt(jeszcze)}$ zł – to więcej niż $${M}$ zł.`,
        `Można więc kupić $${wynik}$ sztuk.`,
      ],
    );
  });
}

function ileOpakowan(r) {
  return probuj(() => {
    const t = r.pick([
      { co: "kubków jednorazowych", ope: "kubki są sprzedawane" },
      { co: "talerzyków papierowych", ope: "talerzyki są sprzedawane" },
      { co: "serwetek", ope: "serwetki są sprzedawane" },
      { co: "zeszytów", ope: "zeszyty są sprzedawane" },
    ]);
    const k = r.pick([6, 8, 10, 12, 15, 20, 24]);
    const N = r.int(k + 2, k * 6);
    if (N % k === 0) return null;
    const wynik = sufit(q(N, k));
    return zad(
      `Na klasowy festyn potrzeba $${N}$ ${t.co}, a ${t.ope} w opakowaniach po $${k}$ sztuk. Ile opakowań trzeba kupić?`,
      [pole("ile", "Liczba opakowań")], { ile: q(wynik) }, `$${wynik}$`,
      [
        `Dzielimy liczbę potrzebnych sztuk przez liczbę sztuk w opakowaniu: $${N} : ${k}$ to więcej niż $${wynik - 1}$, ale mniej niż $${wynik}$ (bo $${(wynik - 1) * k} < ${N} < ${wynik * k}$).`,
        `Opakowanie można kupić tylko w całości, więc zaokrąglamy w górę: $${wynik}$ ${lm(wynik, ["opakowanie", "opakowania", "opakowań"])}.`,
        `Sprawdzenie: $${wynik - 1}$ ${lm(wynik - 1, ["opakowanie", "opakowania", "opakowań"])} to tylko $${(wynik - 1) * k}$ ${lm((wynik - 1) * k, SZTUK)} – za mało, a $${wynik}$ ${lm(wynik, ["opakowanie", "opakowania", "opakowań"])} to $${wynik * k}$ ${lm(wynik * k, SZTUK)} – wystarczy.`,
      ],
    );
  });
}

function cenaIOplacalnosc(r) {
  const w = r.int(0, 99);
  if (w < 22) return kosztWagi(r);
  if (w < 44) return cenaJednostkowa(r);
  if (w < 70) return ktoraTansza(r);
  if (w < 88) return ileSztukZaKwote(r);
  return ileOpakowan(r);
}

// --- 8. Reszta z banknotu i promocje

const ARTYKULY = [
  { f: ["bułka", "bułki", "bułek"], c: [0.5, 0.6, 0.8, 0.9, 1.2, 1.5] },
  { f: ["jogurt", "jogurty", "jogurtów"], c: [1.8, 2.2, 2.4, 3, 3.2] },
  { f: ["sok", "soki", "soków"], c: [3, 3.5, 4, 4.5, 5] },
  { f: ["zeszyt", "zeszyty", "zeszytów"], c: [2.5, 3, 3.5, 4, 5] },
  { f: ["długopis", "długopisy", "długopisów"], c: [1.5, 2, 2.5, 3.5] },
  { f: ["batonik", "batoniki", "batoników"], c: [1.5, 2, 2.5, 3] },
  { f: ["chleb", "chleby", "chlebów"], c: [3, 4, 4.5, 5] },
  { f: ["ogórek", "ogórki", "ogórków"], c: [1, 1.5, 2, 2.5] },
];
const SZTUK = ["sztuka", "sztuki", "sztuk"];

function resztaZBanknotu(r) {
  return probuj(() => {
    const n = r.pick([2, 2, 3]);
    const wyb = r.shuffle(ARTYKULY).slice(0, n).map((a) => ({ a, cena: qn(r.pick(a.c)), il: r.int(1, 5) }));
    const koszty = wyb.map((x) => x.cena.mul(x.il));
    const suma = koszty.reduce((s, x) => s.add(x), q(0));
    if (Number(suma) < 3) return null;
    const banknoty = [10, 20, 50, 100].filter((b) => b > Number(suma));
    if (!banknoty.length) return null;
    const bank = banknoty.length > 1 && r.chance(0.3) ? banknoty[1] : banknoty[0];
    const reszta = q(bank).sub(suma);
    const opis = wypisz(wyb.map((x) => `$${x.il}$ ${lm(x.il, x.a.f)} po $${zt(x.cena)}$ zł`));
    return zad(
      `W sklepie kupiono: ${opis}. Do kasy podano banknot $${bank}$ zł. Ile złotych reszty powinien otrzymać kupujący?`,
      [pole("reszta", "Reszta (w zł)")], { reszta }, zl(reszta),
      [
        `Liczymy koszt każdego towaru (cena razy liczba sztuk): ${listaTex(wyb.map((x, i) => `${x.il} \\cdot ${zt(x.cena)} = ${zt(koszty[i])}`))}.`,
        `Rachunek to suma kosztów: $${koszty.map((k) => zt(k)).join(" + ")} = ${zt(suma)}$ zł.`,
        `Reszta to banknot bez rachunku: $${bank} - ${zt(suma)} = ${zt(reszta)}$ zł.`,
      ],
    );
  });
}

const TOWARY_PROMO = [
  ["koszulka", "koszulki", "koszulek"], ["kubek", "kubki", "kubków"], ["piłka", "piłki", "piłek"],
  ["szalik", "szaliki", "szalików"], ["plecak", "plecaki", "plecaków"], ["czapka", "czapki", "czapek"],
];

function trzeciaGratis(r) {
  const formy = r.pick(TOWARY_PROMO);
  const c = r.pick([8, 10, 12, 15, 18, 20, 24, 30, 36, 40]);
  const n = r.pick([3, 4, 5, 6, 7, 8, 9, 10, 12]);
  const g = Math.floor(n / 3), plac = n - g, suma = q(c * plac);
  const promo = r.pick([
    "W promocji „kup dwie sztuki, a trzecią dostaniesz gratis”.",
    "W promocji „trzy w cenie dwóch”.",
  ]);
  return zad(
    `${cap(formy[0])} kosztuje $${c}$ zł. ${promo} Ile złotych zapłacisz za $${n}$ ${lm(n, formy)}?`,
    [pole("suma", "Kwota (w zł)")], { suma }, zl(suma),
    [
      "W tej promocji z każdych trzech sztuk jedna jest gratis, więc za trzy płacisz tylko jak za dwie.",
      `Dzielimy liczbę sztuk przez $3$: $${n} : 3 = ${g}$ reszty $${n % 3}$, więc gratis ${g === 1 ? "jest" : "są"} $${g}$ ${lm(g, SZTUK)}.`,
      `Płacisz za $${n} - ${g} = ${plac}$ ${lm(plac, SZTUK)}: $${plac} \\cdot ${c} = ${plac * c}$ zł.`,
    ],
  );
}

function drugaZaPolCeny(r) {
  const formy = r.pick(TOWARY_PROMO);
  const c = r.pick([10, 12, 16, 20, 24, 30, 40, 50, 60]);
  const n = r.pick([2, 3, 4, 5, 6, 8]);
  const par = Math.floor(n / 2), reszta = n % 2;
  const para = q(c * 3, 2), suma = para.mul(par).add(q(c * reszta));
  const kroki = [
    `Połowa ceny to $${c} : 2 = ${c / 2}$ zł. Para sztuk (jedna w pełnej cenie i jedna za pół ceny) kosztuje $${c} + ${c / 2} = ${dz(para)}$ zł.`,
    `W $${n}$ sztukach jest $${par}$ ${par === 1 ? "para" : lm(par, ["para", "pary", "par"])}: $${par} \\cdot ${dz(para)} = ${dz(para.mul(par))}$ zł.`,
  ];
  if (reszta) kroki.push(`Została jeszcze jedna sztuka bez pary, za pełną cenę: $${dz(para.mul(par))} + ${c} = ${dz(suma)}$ zł.`);
  return zad(
    `${cap(formy[0])} kosztuje $${c}$ zł. W sklepie obowiązuje promocja: każda druga sztuka kosztuje połowę ceny. Ile złotych zapłacisz za $${n}$ ${lm(n, formy)}?`,
    [pole("suma", "Kwota (w zł)")], { suma }, zl(suma),
    kroki,
  );
}

function cenaWPromocji(r) {
  const formy = r.pick(TOWARY_PROMO);
  if (r.chance(0.5)) {
    const c = r.pick([9, 12, 15, 18, 21, 24, 30, 36, 45, 60]);
    const trzy = q(2 * c), jedna = trzy.div(3);
    return zad(
      `${cap(formy[0])} kosztuje normalnie $${c}$ zł. W promocji „kup dwie sztuki, a trzecią dostaniesz gratis” za trzy ${formy[1]} płacisz jak za dwie. Ile złotych kosztuje średnio jedna sztuka w tej promocji?`,
      [pole("cena", "Cena jednej sztuki (w zł)")], { cena: jedna }, zl(jedna),
      [
        `Za trzy sztuki płacisz tylko za dwie: $2 \\cdot ${c} = ${2 * c}$ zł.`,
        `Średnio jedna sztuka kosztuje $${2 * c} : 3 = ${zt(jedna)}$ zł. To jedna trzecia taniej niż normalnie, a nie połowa.`,
      ],
    );
  }
  const c = r.pick([8, 12, 16, 20, 24, 32, 40, 60]);
  const dwie = q(c * 3, 2), jedna = dwie.div(2);
  return zad(
    `${cap(formy[0])} kosztuje normalnie $${c}$ zł. W promocji druga sztuka kosztuje połowę ceny. Ile złotych kosztuje średnio jedna sztuka, gdy kupisz dwie?`,
    [pole("cena", "Cena jednej sztuki (w zł)")], { cena: jedna }, zl(jedna),
    [
      `Za dwie sztuki płacisz: $${c} + ${c / 2} = ${dz(dwie)}$ zł.`,
      `Średnio jedna sztuka kosztuje $${dz(dwie)} : 2 = ${zt(jedna)}$ zł.`,
    ],
  );
}

function porownaniePromocji(r) {
  const formy = r.pick(TOWARY_PROMO);
  const c = r.pick([20, 30, 40, 50, 60, 80, 100]);
  const trzy = r.chance(0.5);
  const opcje = ["promocja A", "promocja B", "obie promocje kosztują tyle samo"];
  if (trzy) {
    const p = r.pick([10, 20, 25, 30, 40, 50]);
    const A = q(2 * c), B = q(3 * c).mul(qn(100 - p)).div(100);
    const ind = A.cmp(B) < 0 ? 0 : A.cmp(B) > 0 ? 1 : 2;
    return zad(
      `Kupujesz $3$ ${formy[1]}, a jedna kosztuje $${c}$ zł. Promocja A: trzecia sztuka gratis. Promocja B: ${pc(p)} zniżki na wszystkie sztuki. Która promocja jest korzystniejsza (tańsza)?`,
      [polew("promocja", "Odpowiedź", opcje)], { promocja: ind }, opcje[ind],
      [
        `Promocja A: płacisz za dwie sztuki, czyli $2 \\cdot ${c} = ${dz(A)}$ zł.`,
        `Promocja B: bez zniżki trzy sztuki kosztują $3 \\cdot ${c} = ${3 * c}$ zł, zniżka to ${pc(p)} z tej kwoty, czyli płacisz $${100 - p}\\%$: $${3 * c} \\cdot ${dz(qn(100 - p).div(100))} = ${dz(B)}$ zł.`,
        ind === 2
          ? `Obie promocje kosztują tyle samo ($${dz(A)}$ zł).`
          : `Mniej zapłacisz w promocji ${ind === 0 ? "A" : "B"} ($${dz(ind === 0 ? A : B)}$ zł zamiast $${dz(ind === 0 ? B : A)}$ zł). Trzecia sztuka gratis to zniżka o jedną trzecią, czyli około $33\\%$.`,
      ],
    );
  }
  const p = r.pick([10, 20, 25, 30, 40]);
  const A = q(3 * c, 2), B = q(2 * c).mul(qn(100 - p)).div(100);
  const ind = A.cmp(B) < 0 ? 0 : A.cmp(B) > 0 ? 1 : 2;
  return zad(
    `Kupujesz $2$ ${formy[1]}, a jedna kosztuje $${c}$ zł. Promocja A: druga sztuka za pół ceny. Promocja B: ${pc(p)} zniżki na wszystkie sztuki. Która promocja jest korzystniejsza (tańsza)?`,
    [polew("promocja", "Odpowiedź", opcje)], { promocja: ind }, opcje[ind],
    [
      `Promocja A: pierwsza sztuka w pełnej cenie, druga za połowę: $${c} + ${c / 2} = ${dz(A)}$ zł.`,
      `Promocja B: bez zniżki dwie sztuki kosztują $2 \\cdot ${c} = ${2 * c}$ zł, a płacisz $${100 - p}\\%$ tej kwoty: $${2 * c} \\cdot ${dz(qn(100 - p).div(100))} = ${dz(B)}$ zł.`,
      ind === 2
        ? `Obie promocje kosztują tyle samo ($${dz(A)}$ zł). „Druga za pół ceny” to zniżka $25\\%$ na dwie sztuki.`
        : `Mniej zapłacisz w promocji ${ind === 0 ? "A" : "B"} ($${dz(ind === 0 ? A : B)}$ zł zamiast $${dz(ind === 0 ? B : A)}$ zł). „Druga za pół ceny” to zniżka $25\\%$ na dwie sztuki.`,
    ],
  );
}

function resztaIPromocje(r) {
  const w = r.int(0, 99);
  if (w < 30) return resztaZBanknotu(r);
  if (w < 45) return trzeciaGratis(r);
  if (w < 60) return drugaZaPolCeny(r);
  if (w < 80) return cenaWPromocji(r);
  return porownaniePromocji(r);
}

// --- 9. Droga, prędkość i czas

const POJAZDY = [
  { kto: "Samochód", idzie: "jedzie", przeb: "przejechał", V: [36, 40, 45, 48, 54, 60, 72, 80, 90, 96, 100, 108, 120] },
  { kto: "Autobus", idzie: "jedzie", przeb: "przejechał", V: [30, 40, 45, 48, 50, 60, 72] },
  { kto: "Pociąg", idzie: "jedzie", przeb: "przejechał", V: [60, 80, 90, 100, 120, 144, 150] },
  { kto: "Rowerzysta", idzie: "jedzie", przeb: "przejechał", V: [12, 15, 16, 18, 20, 24] },
  { kto: "Biegacz", idzie: "biegnie", przeb: "przebiegł", V: [8, 9, 10, 12, 15] },
  { kto: "Turysta", idzie: "idzie", przeb: "przeszedł", V: [3, 4, 5, 6] },
];
const MINUTY = [10, 12, 15, 20, 24, 30, 36, 40, 45, 50];

/** Czas w godzinach: dziesiętnie, gdy rozwinięcie jest skończone, inaczej ułamkiem zwykłym. */
const czasTex = (t) => (10000 % t.d === 0 ? dz(t) : t.tex());

function drogaZPredkosci(r) {
  return probuj(() => {
    const p = r.pick(POJAZDY), V = r.pick(p.V), t = r.pick(MINUTY);
    if ((V * t) % 60 !== 0) return null;
    const s = (V * t) / 60;
    if (s < 2) return null;
    const tq = q(t, 60);
    return zad(
      `${p.kto} ${p.idzie} ze stałą prędkością $${V}$ km/h. Jaką drogę pokona w ciągu $${t}$ minut?`,
      [pole("s", "Droga (w km)")], { s: q(s) }, jed(s, "km"),
      [
        `Prędkość jest podana w km na godzinę, więc czas zamieniamy na godziny: $${t}\\ \\text{min} = ${fr(t, 60)}\\ \\text{h}${tq.d === 60 ? "" : ` = ${tq.tex()}\\ \\text{h}`}$.`,
        `Droga to prędkość razy czas: $s = ${V} \\cdot ${tq.tex()} = ${s}$ km.`,
      ],
    );
  });
}

function predkoscZDrogi(r) {
  return probuj(() => {
    const p = r.pick(POJAZDY), V = r.pick(p.V), t = r.pick(MINUTY);
    if ((V * t) % 60 !== 0) return null;
    const s = (V * t) / 60;
    if (s < 2) return null;
    const tq = q(t, 60);
    return zad(
      `${p.kto} ${p.przeb} $${s}$ km w ciągu $${t}$ minut. Z jaką średnią prędkością (w km/h) się poruszał?`,
      [pole("v", "Prędkość (w km/h)")], { v: q(V) }, jed(V, "km/h"),
      [
        `Czas zamieniamy na godziny: $${t}\\ \\text{min} = ${tq.tex()}\\ \\text{h}$.`,
        `Prędkość to droga podzielona przez czas: $v = ${s} : ${tq.tex()} = ${s} \\cdot ${q(1).div(tq).tex()} = ${V}$ km/h.`,
        `Sprawdzenie: $${V} \\cdot ${tq.tex()} = ${s}$ km – zgadza się.`,
      ],
    );
  });
}

function czasZDrogi(r) {
  return probuj(() => {
    const p = r.pick(POJAZDY.slice(0, 4)), V = r.pick(p.V), tm = r.pick([20, 30, 40, 45, 50, 75, 80, 90, 100, 105, 120, 135, 150, 165, 180, 210, 240]);
    if ((V * tm) % 60 !== 0) return null;
    const s = (V * tm) / 60;
    if (s < 10 || s > 600) return null;
    const th = q(s, V), H = Math.floor(tm / 60), M = tm % 60;
    const kroki = [`Czas to droga podzielona przez prędkość: $t = ${s} : ${V} = ${czasTex(th)}$ h.`];
    if (M === 0) kroki.push(`To dokładnie $${H}$ ${lm(H, ["godzina", "godziny", "godzin"])}.`);
    else {
      const ulam = th.sub(H);
      kroki.push(`Pełne godziny: $${H}$. Część godziny zamieniamy na minuty (mnożymy przez $60$): $${czasTex(ulam)} \\cdot 60 = ${M}$ min.`);
      kroki.push(`Razem: $${H}$ h $${M}$ min.`);
    }
    return zad(
      `${p.kto} ${p.idzie} ze stałą prędkością $${V}$ km/h. Ile czasu zajmie mu pokonanie $${s}$ km? Podaj wynik w godzinach i minutach.`,
      [pole("godz", "Godziny"), pole("min", "Minuty")], { godz: q(H), min: q(M) }, `$${H}$ h $${M}$ min`,
      kroki,
    );
  });
}

function spotkanie(r) {
  return probuj(() => {
    const rodzaj = r.pick([
      { tw: "dwaj rowerzyści", razem: "Dwaj rowerzyści jadą", v: [10, 12, 14, 15, 16, 18, 20, 24] },
      { tw: "dwa samochody", razem: "Dwa samochody jadą", v: [40, 45, 50, 60, 70, 80, 90] },
      { tw: "dwa pociągi", razem: "Dwa pociągi jadą", v: [60, 70, 80, 90, 100, 120] },
    ]);
    const naprzeciw = r.chance(0.6);
    let v1 = r.pick(rodzaj.v), v2 = r.pick(rodzaj.v);
    if (v1 === v2) return null;
    if (!naprzeciw && v1 < v2) [v1, v2] = [v2, v1];
    const roznica = naprzeciw ? v1 + v2 : v1 - v2;
    const t = qn(r.pick([1, 1.5, 2, 2.5, 3, 4]));
    const sq = t.mul(roznica);
    if (!sq.calkowita) return null;
    const s = Number(sq);
    const dro = naprzeciw && r.chance(0.35);
    const tresc = naprzeciw
      ? `Miejscowości A i B dzieli odległość $${s}$ km. Jednocześnie wyjeżdżają z nich naprzeciw siebie ${rodzaj.tw}: pierwszy z prędkością $${v1}$ km/h, drugi z prędkością $${v2}$ km/h.`
      : `${rodzaj.razem} w tę samą stronę: przedni z prędkością $${v2}$ km/h, tylny z prędkością $${v1}$ km/h. Na początku dzieli je odległość $${s}$ km.`;
    const pyt = naprzeciw
      ? (dro ? "Ile kilometrów przejedzie pierwszy do chwili spotkania?" : "Po ilu godzinach się spotkają?")
      : "Po ilu godzinach tylny dogoni przedniego?";
    const kroki = [
      naprzeciw
        ? `Jadą naprzeciw siebie, więc odległość między nimi maleje w każdej godzinie o sumę prędkości: $${v1} + ${v2} = ${roznica}$ km/h.`
        : `Jadą w tę samą stronę, więc odległość między nimi maleje w każdej godzinie o różnicę prędkości: $${v1} - ${v2} = ${roznica}$ km/h.`,
      `Czas do ${naprzeciw ? "spotkania" : "dogonienia"}: $t = ${s} : ${roznica} = ${dz(t)}$ h.`,
    ];
    if (dro) kroki.push(`Pierwszy jedzie $${dz(t)}$ h z prędkością $${v1}$ km/h: $${v1} \\cdot ${dz(t)} = ${dz(t.mul(v1))}$ km.`);
    kroki.push(naprzeciw
      ? `Sprawdzenie: do spotkania pierwszy przejedzie $${dz(t.mul(v1))}$ km, drugi $${dz(t.mul(v2))}$ km, razem $${s}$ km – tyle, ile dzieli miejscowości.`
      : `Sprawdzenie: w tym czasie tylny przejedzie $${dz(t.mul(v1))}$ km, przedni $${dz(t.mul(v2))}$ km, a różnica to $${s}$ km – dokładnie początkowa odległość.`);
    return zad(
      `${tresc} ${pyt}`,
      [pole("odp", dro ? "Droga (w km)" : "Czas (w godzinach)")],
      { odp: dro ? t.mul(v1) : t },
      dro ? jed(t.mul(v1), "km") : jed(t, "h"),
      kroki,
    );
  });
}

function drogaPredkoscCzas(r) {
  const w = r.int(0, 99);
  if (w < 27) return drogaZPredkosci(r);
  if (w < 54) return predkoscZDrogi(r);
  if (w < 84) return czasZDrogi(r);
  return spotkanie(r);
}

// --- 10. km/h i m/s, średnia prędkość

function kmhNaMs(r) {
  const V = r.pick([9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 108, 126, 144]);
  const ms = q(V).mul(q(5, 18));
  const kto = r.pick(V <= 18 ? ["Biegacz biegnie", "Rowerzysta jedzie"]
    : V <= 36 ? ["Rowerzysta jedzie", "Samochód jedzie"]
      : V <= 90 ? ["Samochód jedzie", "Autobus jedzie", "Pociąg jedzie"]
        : ["Samochód jedzie", "Pociąg jedzie", "Motocyklista jedzie"]);
  return zad(
    `${kto} z prędkością $${V}$ km/h. Podaj tę prędkość w m/s.`,
    [pole("v", "Prędkość (w m/s)")], { v: ms }, jed(ms, "m/s"),
    [
      "Z km/h na m/s dzielimy przez $3{,}6$, bo $1$ m/s to $3{,}6$ km/h (mniejsza jednostka prędkości, więc liczba jest mniejsza).",
      `Żeby uniknąć dzielenia przez ułamek, mnożymy obie liczby przez $10$: $${V} : 3{,}6 = ${V * 10} : 36 = ${dz(ms)}$.`,
      `Wynik: $${V}$ km/h $= ${dz(ms)}$ m/s. (Pomaga zapamiętać: $36$ km/h to $10$ m/s.)`,
    ],
  );
}

function msNaKmh(r) {
  const v = qn(r.pick([2, 2.5, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40]));
  const kmh = v.mul(q(18, 5));
  const kto = r.pick(Number(v) <= 7 ? ["Biegacz biegnie", "Rowerzysta jedzie", "Łyżwiarz sunie"]
    : Number(v) <= 14 ? ["Rowerzysta jedzie", "Sprinter biegnie", "Łyżwiarz sunie"]
      : Number(v) <= 30 ? ["Samochód jedzie", "Pociąg jedzie", "Gepard biegnie"]
        : ["Samochód jedzie", "Pociąg jedzie"]);
  const trzy = v.mul(3), reszta = v.mul(qn(0.6));
  return zad(
    `${kto} z prędkością $${dz(v)}$ m/s. Podaj tę prędkość w km/h.`,
    [pole("v", "Prędkość (w km/h)")], { v: kmh }, jed(kmh, "km/h"),
    [
      "Z m/s na km/h mnożymy przez $3{,}6$, bo $1$ m/s to $3{,}6$ km/h (liczba w km/h jest większa).",
      `Mnożymy przez $3{,}6 = 3 + 0{,}6$: $${dz(v)} \\cdot 3{,}6 = ${dz(trzy)} + ${dz(reszta)} = ${dz(kmh)}$.`,
      `Wynik: $${dz(v)}$ m/s $= ${dz(kmh)}$ km/h.`,
    ],
  );
}

function metrySekundy(r) {
  return probuj(() => {
    const v = qn(r.pick([2, 2.5, 4, 5, 6, 8, 10, 12, 15, 20, 25]));
    const t = r.pick([8, 10, 12, 20, 30, 40, 50, 60]);
    const d = v.mul(t);
    if (!d.calkowita) return null;
    const dd = Number(d);
    const kmh = r.chance(0.5);
    const kto = r.pick(["Biegacz", "Rowerzysta", "Łyżwiarz", "Rolkarz"]);
    const kroki = [`Prędkość w m/s to droga w metrach podzielona przez czas w sekundach: $v = ${dd} : ${t} = ${dz(v)}$ m/s.`];
    if (kmh) kroki.push(`Z m/s na km/h mnożymy przez $3{,}6$: $${dz(v)} \\cdot 3{,}6 = ${dz(v.mul(q(18, 5)))}$ km/h.`);
    return zad(
      `${kto} pokonał $${dd}$ m w czasie $${t}$ s. Jaka była jego średnia prędkość${kmh ? " w km/h" : " w m/s"}?`,
      [pole("v", kmh ? "Prędkość (w km/h)" : "Prędkość (w m/s)")],
      { v: kmh ? v.mul(q(18, 5)) : v },
      jed(kmh ? v.mul(q(18, 5)) : v, kmh ? "km/h" : "m/s"),
      kroki,
    );
  });
}

function sredniaDwaOdcinki(r) {
  return probuj(() => {
    const t1 = qn(r.pick([1, 1.5, 2, 3])), t2 = qn(r.pick([1, 1.5, 2, 3, 4]));
    const v1 = r.pick([20, 30, 40, 45, 50, 60, 80, 90]), v2 = r.pick([20, 30, 40, 45, 50, 60, 80, 90, 100]);
    if (v1 === v2) return null;
    const s1 = t1.mul(v1), s2 = t2.mul(v2), s = s1.add(s2), T = t1.add(t2), vs = s.div(T);
    if (!s1.calkowita || !s2.calkowita || !calePol(vs)) return null;
    const sr = qn(v1 + v2).div(2);
    if (sr.eq(vs)) return null;
    const kto = r.pick([{ k: "Samochód", j: "jechał" }, { k: "Autobus", j: "jechał" }, { k: "Pociąg", j: "jechał" }]);
    return zad(
      `${kto.k} ${kto.j} przez $${dz(t1)}$ h z prędkością $${v1}$ km/h, a potem przez $${dz(t2)}$ h z prędkością $${v2}$ km/h. Jaka była jego średnia prędkość na całej trasie?`,
      [pole("v", "Średnia prędkość (w km/h)")], { v: vs }, jed(vs, "km/h"),
      [
        `Droga w pierwszej części: $${v1} \\cdot ${dz(t1)} = ${dz(s1)}$ km, w drugiej: $${v2} \\cdot ${dz(t2)} = ${dz(s2)}$ km. Cała droga: $${dz(s1)} + ${dz(s2)} = ${dz(s)}$ km.`,
        `Cały czas: $${dz(t1)} + ${dz(t2)} = ${dz(T)}$ h.`,
        `Średnia prędkość to cała droga przez cały czas: $${dz(s)} : ${dz(T)} = ${dz(vs)}$ km/h.`,
        `To nie jest średnia arytmetyczna prędkości: $(${v1} + ${v2}) : 2 = ${dz(sr)}$ byłoby błędem, bo przy każdej prędkości jechano inną liczbę godzin.`,
      ],
    );
  });
}

function sredniaTamIZPowrotem(r) {
  const [v1, v2] = r.pick([[15, 30], [20, 30], [40, 60], [30, 60], [60, 90], [10, 15], [12, 20], [30, 45], [20, 60], [24, 40], [60, 120], [40, 120], [50, 75], [45, 90]]);
  const l = nww(v1, v2), d = l * r.int(1, Math.max(1, Math.floor(240 / l)));
  const t1 = q(d, v1), t2 = q(d, v2), T = t1.add(t2), vs = q(2 * d).div(T);
  const kto = r.pick(["Rowerzysta", "Samochód", "Motocyklista", "Autobus"]);
  const tras = r.pick(["z domu do jeziora", "z miasta A do miasta B", "z wioski do miasteczka"]);
  return zad(
    `${kto} pokonał trasę ${tras} (odległość $${d}$ km) ze średnią prędkością $${v1}$ km/h, a z powrotem tą samą drogą – ze średnią prędkością $${v2}$ km/h. Jaka była średnia prędkość na całej trasie (tam i z powrotem)?`,
    [pole("v", "Średnia prędkość (w km/h)")], { v: vs }, jed(vs, "km/h"),
    [
      `Czas w jedną stronę: $${d} : ${v1} = ${dz(t1)}$ h, a z powrotem: $${d} : ${v2} = ${dz(t2)}$ h. Cały czas: $${dz(T)}$ h.`,
      `Cała droga to tam i z powrotem: $2 \\cdot ${d} = ${2 * d}$ km.`,
      `Średnia prędkość: $${2 * d} : ${dz(T)} = ${dz(vs)}$ km/h.`,
      `Zwykła średnia $(${v1} + ${v2}) : 2 = ${dz(q(v1 + v2, 2))}$ byłaby błędem: wolniej jechano dłużej, więc wynik jest mniejszy.`,
    ],
  );
}

function jednostkiPredkosci(r) {
  const w = r.int(0, 99);
  if (w < 17) return kmhNaMs(r);
  if (w < 34) return msNaKmh(r);
  if (w < 50) return metrySekundy(r);
  if (w < 75) return sredniaDwaOdcinki(r);
  return sredniaTamIZPowrotem(r);
}

// --- 11. Jednostki długości i masy

const DLUGOSC = { mm: 1, cm: 10, dm: 100, m: 1000, km: 1000000 };
const MASA = { g: 1, dag: 10, kg: 1000, t: 1000000 };
const NAZWA_ZAM = { mm: "milimetry", cm: "centymetry", dm: "decymetry", m: "metry", km: "kilometry", g: "gramy", dag: "dekagramy", kg: "kilogramy", t: "tony" };
const MIEJSC = { m: "metrach", kg: "kilogramach", km: "kilometrach", t: "tonach" };
const PARY_DLUGOSC = [["m", "cm"], ["cm", "m"], ["cm", "mm"], ["mm", "cm"], ["km", "m"], ["m", "km"], ["dm", "cm"], ["cm", "dm"], ["m", "dm"], ["dm", "m"], ["m", "mm"], ["mm", "m"]];
const PARY_MASA = [["kg", "g"], ["g", "kg"], ["kg", "dag"], ["dag", "kg"], ["dag", "g"], ["g", "dag"], ["t", "kg"], ["kg", "t"]];
const WARTOSCI_BAZOWE = [1.2, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 7.5, 8, 9, 12, 15, 18, 25, 36, 45, 60, 75];
/** Jednostka w TeX-ie: zwykła nazwa trafia w \\text{…}, gotowy zapis (zaczyna się od ukośnika) zostaje bez zmian. */
const ujedn = (u) => (u.startsWith("\\") ? u : `\\text{${u}}`);
const tu = (v, u) => `${v}\\ ${ujedn(u)}`;

/** Losuje liczbę i parę jednostek tak, żeby wynik zamiany był „ładny” (najwyżej 3 miejsca po przecinku). */
function losujZamiane(r, tab, pary) {
  return probuj(() => {
    const [a, b] = r.pick(pary);
    const v = qn(r.pick(WARTOSCI_BAZOWE)).mul(10 ** r.pick([0, 1, 2, 3]));
    const wynik = v.mul(tab[a]).div(tab[b]);
    if (10000 % wynik.d !== 0 || wynik.d > 1000 || Number(wynik) < 0.01 || Number(wynik) > 100000 || Number(v) > 100000) return null;
    if (Number(wynik) < 1 && r.chance(0.7)) return null;
    return { a, b, v, wynik };
  });
}

/** Kroki zamiany jednostek: v a -> wynik b, gdy 1 a = ratio b albo 1 b = 1/ratio a. wstep – opcjonalne wyjaśnienie zależności. */
function krokiZamiany(v, a, b, wynik, ratio, wstep, ua = ujedn, ub = ujedn) {
  const k = [];
  if (ratio.eq(1)) {
    k.push(`${wstep || `$1\\ ${ua(a)} = 1\\ ${ub(b)}$`}, więc liczba się nie zmienia.`);
    k.push(`$${tu(dz(v), ua(a))} = ${tu(dz(wynik), ub(b))}$.`);
  } else if (Number(ratio) > 1) {
    k.push(`Zamieniamy na mniejszą jednostkę, więc liczba będzie większa – mnożymy. ${wstep || `Wiemy, że $1\\ ${ua(a)} = ${dz(ratio)}\\ ${ub(b)}$.`}`);
    k.push(`$${dz(v)} \\cdot ${dz(ratio)} = ${dz(wynik)}$.`);
    k.push(`Czyli $${tu(dz(v), ua(a))} = ${tu(dz(wynik), ub(b))}$.`);
  } else {
    const odw = q(1).div(ratio);
    k.push(`Zamieniamy na większą jednostkę, więc liczba będzie mniejsza – dzielimy. ${wstep || `Wiemy, że $1\\ ${ub(b)} = ${dz(odw)}\\ ${ua(a)}$.`}`);
    k.push(`$${dz(v)} : ${dz(odw)} = ${dz(wynik)}$.`);
    k.push(`Czyli $${tu(dz(v), ua(a))} = ${tu(dz(wynik), ub(b))}$.`);
  }
  return k;
}

function zamianaMiar(r, tab, pary, nazwy) {
  const { a, b, v, wynik } = losujZamiane(r, tab, pary);
  return zad(
    `Zamień $${tu(dz(v), a)}$ na ${nazwy[b]}.`,
    [pole("wynik", `Wynik (w $\\text{${b}}$)`)], { wynik }, `$${tu(dz(wynik), b)}$`,
    krokiZamiany(v, a, b, wynik, q(tab[a], tab[b])),
  );
}

// Miary złożone: duża jednostka, mała jednostka, ile małych w dużej, możliwe liczby małych jednostek
const ZLOZONE = [
  { A: "m", B: "cm", n: 100, male: [5, 8, 15, 20, 25, 35, 40, 50, 65, 75, 80, 90] },
  { A: "kg", B: "dag", n: 100, male: [5, 8, 15, 20, 25, 35, 40, 50, 65, 75, 80, 90] },
  { A: "kg", B: "g", n: 1000, male: [50, 120, 250, 350, 500, 750, 800] },
  { A: "km", B: "m", n: 1000, male: [50, 120, 250, 350, 500, 750, 800] },
  { A: "t", B: "kg", n: 1000, male: [50, 120, 250, 350, 500, 750, 800] },
];

function miaryZlozone(r) {
  const z = r.pick(ZLOZONE), duze = r.int(1, 9), male = r.pick(z.male);
  const wMalych = r.chance(0.55);
  const razem = duze * z.n + male, dziesietnie = q(razem, z.n);
  if (wMalych) {
    return zad(
      `Zamień $${duze}\\ \\text{${z.A}}\\ ${male}\\ \\text{${z.B}}$ na ${NAZWA_ZAM[z.B]}.`,
      [pole("wynik", `Wynik (w $\\text{${z.B}}$)`)], { wynik: q(razem) }, `$${tu(razem, z.B)}$`,
      [
        `Duże jednostki zamieniamy na małe: $1\\ \\text{${z.A}} = ${dz(z.n)}\\ \\text{${z.B}}$, więc $${duze}\\ \\text{${z.A}} = ${duze} \\cdot ${dz(z.n)} = ${dz(duze * z.n)}\\ \\text{${z.B}}$.`,
        `Dodajemy resztę: $${dz(duze * z.n)} + ${male} = ${dz(razem)}$.`,
        `Czyli $${duze}\\ \\text{${z.A}}\\ ${male}\\ \\text{${z.B}} = ${tu(dz(razem), z.B)}$.`,
      ],
    );
  }
  return zad(
    `Zapisz $${duze}\\ \\text{${z.A}}\\ ${male}\\ \\text{${z.B}}$ w ${MIEJSC[z.A]}, używając ułamka dziesiętnego.`,
    [pole("wynik", `Wynik (w $\\text{${z.A}}$)`)], { wynik: dziesietnie }, `$${tu(dz(dziesietnie), z.A)}$`,
    [
      `Małe jednostki zamieniamy na duże: $1\\ \\text{${z.B}} = ${dz(q(1, z.n))}\\ \\text{${z.A}}$, więc $${male}\\ \\text{${z.B}} = ${male} : ${dz(z.n)} = ${dz(q(male, z.n))}\\ \\text{${z.A}}$ (dzielimy przez $${dz(z.n)}$, bo w $1\\ \\text{${z.A}}$ jest $${dz(z.n)}\\ \\text{${z.B}}$).`,
      `Dodajemy pełne jednostki: $${duze} + ${dz(q(male, z.n))} = ${dz(dziesietnie)}$.`,
      `Czyli $${duze}\\ \\text{${z.A}}\\ ${male}\\ \\text{${z.B}} = ${tu(dz(dziesietnie), z.A)}$.`,
    ],
  );
}

function sumaMiar(r) {
  if (r.chance(0.5)) {
    const g = r.pick([50, 100, 150, 200, 250, 300, 400, 500, 750]), dag = r.pick([5, 10, 15, 20, 25, 30, 40, 50]), kg = qn(r.pick([0.25, 0.5, 0.75, 1, 1.5, 2]));
    const pozycje = r.shuffle([
      { txt: `$${g}$ g`, gr: q(g), kr: `$${g}\\ \\text{g}$`, opis: `$${g}\\ \\text{g}$` },
      { txt: `$${dag}$ dag`, gr: q(dag * 10), opis: `$${dag}\\ \\text{dag} = ${dag * 10}\\ \\text{g}$` },
      { txt: `$${dz(kg)}$ kg`, gr: kg.mul(1000), opis: `$${dz(kg)}\\ \\text{kg} = ${dz(kg.mul(1000))}\\ \\text{g}$` },
    ]);
    const suma = pozycje.reduce((s, x) => s.add(x.gr), q(0));
    const wkg = r.chance(0.4);
    const kto = r.pick(["W koszyku", "W plecaku", "W torbie"]);
    const rzeczy = r.pick([["sera", "masła", "wędliny"], ["jabłek", "gruszek", "winogron"], ["mąki", "cukru", "ryżu"]]);
    const opis = wypisz(pozycje.map((x, i) => `${x.txt} ${rzeczy[i]}`));
    return zad(
      `${kto} są produkty: ${opis}. Ile ${wkg ? "kilogramów" : "gramów"} ważą wszystkie razem?`,
      [pole("masa", wkg ? "Masa (w kg)" : "Masa (w g)")], { masa: wkg ? suma.div(1000) : suma },
      wkg ? jed(suma.div(1000), "kg") : jed(suma, "g"),
      [
        `Zamieniamy wszystkie masy na gramy: ${pozycje.map((x) => x.opis).join(", ")}.`,
        `Dodajemy: $${pozycje.map((x) => dz(x.gr)).join(" + ")} = ${dz(suma)}$ g.`,
        ...(wkg ? [`Na kilogramy: $${dz(suma)} : 1000 = ${dz(suma.div(1000))}$ kg.`] : []),
      ],
    );
  }
  const m = qn(r.pick([0.5, 1, 1.2, 1.5, 2])), cm = r.pick([15, 20, 25, 30, 45, 60, 75]), mm = r.pick([50, 100, 120, 250, 300, 450, 500]);
  const pozycje = r.shuffle([
    { txt: `$${dz(m)}$ m`, cm: m.mul(100), opis: `$${dz(m)}\\ \\text{m} = ${dz(m.mul(100))}\\ \\text{cm}$` },
    { txt: `$${cm}$ cm`, cm: q(cm), opis: `$${cm}\\ \\text{cm}$` },
    { txt: `$${mm}$ mm`, cm: q(mm, 10), opis: `$${mm}\\ \\text{mm} = ${dz(q(mm, 10))}\\ \\text{cm}$` },
  ]);
  const suma = pozycje.reduce((s, x) => s.add(x.cm), q(0));
  const wm = r.chance(0.4);
  const co = r.pick(["Trzy kawałki sznurka mają długości", "Trzy deski mają długości", "Trzy odcinki taśmy mają długości"]);
  return zad(
    `${co}: ${wypisz(pozycje.map((x) => x.txt))}. Jaka jest ich łączna długość w ${wm ? "metrach" : "centymetrach"}?`,
    [pole("dl", wm ? "Długość (w m)" : "Długość (w cm)")], { dl: wm ? suma.div(100) : suma },
    wm ? jed(suma.div(100), "m") : jed(suma, "cm"),
    [
      `Zamieniamy wszystkie długości na centymetry: ${pozycje.map((x) => x.opis).join(", ")}.`,
      `Dodajemy: $${pozycje.map((x) => dz(x.cm)).join(" + ")} = ${dz(suma)}$ cm.`,
      ...(wm ? [`Na metry: $${dz(suma)} : 100 = ${dz(suma.div(100))}$ m.`] : []),
    ],
  );
}

function jednostkiDlugoscMasa(r) {
  const w = r.int(0, 99);
  if (w < 30) return zamianaMiar(r, DLUGOSC, PARY_DLUGOSC, NAZWA_ZAM);
  if (w < 58) return zamianaMiar(r, MASA, PARY_MASA, NAZWA_ZAM);
  if (w < 85) return miaryZlozone(r);
  return sumaMiar(r);
}

// --- 12. Pole, objętość, litry

const POLE = { cm2: 1, dm2: 100, m2: 10000, a: 1000000, ha: 100000000, km2: 10000000000 };
const OBJ = { cm3: 1, ml: 1, dm3: 1000, l: 1000, m3: 1000000 };
const UT = { cm2: "\\text{cm}^2", dm2: "\\text{dm}^2", m2: "\\text{m}^2", a: "\\text{a}", ha: "\\text{ha}", km2: "\\text{km}^2", cm3: "\\text{cm}^3", dm3: "\\text{dm}^3", m3: "\\text{m}^3", ml: "\\text{ml}", l: "\\text{l}" };
const NAZWA_POLE = { cm2: "centymetry kwadratowe", dm2: "decymetry kwadratowe", m2: "metry kwadratowe", a: "ary", ha: "hektary", km2: "kilometry kwadratowe", cm3: "centymetry sześcienne", dm3: "decymetry sześcienne", m3: "metry sześcienne", ml: "mililitry", l: "litry" };
const PARY_POLE = [["m2", "cm2"], ["cm2", "m2"], ["dm2", "cm2"], ["cm2", "dm2"], ["m2", "dm2"], ["dm2", "m2"], ["a", "m2"], ["m2", "a"], ["ha", "m2"], ["m2", "ha"], ["ha", "a"], ["a", "ha"], ["km2", "ha"], ["ha", "km2"]];
const PARY_OBJ = [["dm3", "cm3"], ["cm3", "dm3"], ["m3", "dm3"], ["dm3", "m3"], ["m3", "cm3"], ["m3", "l"], ["l", "m3"], ["l", "ml"], ["ml", "l"], ["l", "cm3"], ["cm3", "l"], ["l", "dm3"], ["dm3", "l"], ["cm3", "ml"]];
const WSKAZOWKI = {
  "m2>cm2": "Kwadrat o boku $1\\ \\text{m}$ ma bok $100\\ \\text{cm}$, więc jego pole to $100 \\cdot 100 = 10\\,000\\ \\text{cm}^2$.",
  "dm2>cm2": "Kwadrat o boku $1\\ \\text{dm}$ ma bok $10\\ \\text{cm}$, więc jego pole to $10 \\cdot 10 = 100\\ \\text{cm}^2$.",
  "m2>dm2": "Kwadrat o boku $1\\ \\text{m}$ ma bok $10\\ \\text{dm}$, więc jego pole to $10 \\cdot 10 = 100\\ \\text{dm}^2$.",
  "a>m2": "Ar to kwadrat o boku $10\\ \\text{m}$, więc ma pole $10 \\cdot 10 = 100\\ \\text{m}^2$.",
  "ha>m2": "Hektar to kwadrat o boku $100\\ \\text{m}$, więc ma pole $100 \\cdot 100 = 10\\,000\\ \\text{m}^2$.",
  "ha>a": "Hektar to $10\\,000\\ \\text{m}^2$, a ar to $100\\ \\text{m}^2$, więc w hektarze jest $100$ arów.",
  "km2>ha": "Kwadrat o boku $1\\ \\text{km}$ ma bok $1000\\ \\text{m}$, czyli pole $1\\,000\\,000\\ \\text{m}^2$, a hektar to $10\\,000\\ \\text{m}^2$, więc w $1\\ \\text{km}^2$ jest $100$ ha.",
  "dm3>cm3": "Sześcian o krawędzi $1\\ \\text{dm}$ ma krawędź $10\\ \\text{cm}$, więc mieści $10 \\cdot 10 \\cdot 10 = 1000\\ \\text{cm}^3$.",
  "m3>dm3": "Sześcian o krawędzi $1\\ \\text{m}$ ma krawędź $10\\ \\text{dm}$, więc mieści $10 \\cdot 10 \\cdot 10 = 1000\\ \\text{dm}^3$.",
  "m3>cm3": "Sześcian o krawędzi $1\\ \\text{m}$ ma krawędź $100\\ \\text{cm}$, więc mieści $100 \\cdot 100 \\cdot 100 = 1\\,000\\,000\\ \\text{cm}^3$.",
  "m3>l": "Litr to $1\\ \\text{dm}^3$, a w $1\\ \\text{m}^3$ jest $1000\\ \\text{dm}^3$, więc $1\\ \\text{m}^3 = 1000\\ \\text{l}$.",
  "l>ml": "W litrze jest $1000$ mililitrów.",
  "l>cm3": "Litr to $1\\ \\text{dm}^3 = 1000\\ \\text{cm}^3$.",
  "l>dm3": "Litr to dokładnie $1\\ \\text{dm}^3$.",
  "cm3>ml": "Mililitr to dokładnie $1\\ \\text{cm}^3$.",
};

function zamianaPolaObjetosci(r, tab, pary) {
  const { a, b, v, wynik } = losujZamiane(r, tab, pary);
  const duzy = Number(q(tab[a], tab[b])) >= 1 ? a : b, maly = duzy === a ? b : a;
  const wsk = WSKAZOWKI[`${duzy}>${maly}`] ?? "";
  const ua = (x) => UT[x], ub = (x) => UT[x];
  const ratio = q(tab[a], tab[b]);
  const kroki = krokiZamiany(v, a, b, wynik, ratio, wsk && `${wsk} Czyli $1\\ ${UT[duzy]} = ${dz(q(tab[duzy], tab[maly]))}\\ ${UT[maly]}$.`, ua, ub);
  return zad(
    `Zamień $${tu(dz(v), UT[a])}$ na ${NAZWA_POLE[b]}.`,
    [pole("wynik", `Wynik (w $${UT[b]}$)`)], { wynik }, `$${tu(dz(wynik), UT[b])}$`,
    kroki,
  );
}

function pojemnoscProstopadloscianu(r) {
  const wm = r.chance(0.4);
  if (wm) {
    return probuj(() => {
      const wym = [0, 0, 0].map(() => qn(r.pick([1, 1.5, 2, 2.5, 3, 4, 5])));
      const V = wym[0].mul(wym[1]).mul(wym[2]);
      if (!V.calkowita && V.d !== 2 && V.d !== 4) return null;
      const lit = V.mul(1000);
      if (!lit.calkowita || Number(lit) > 100000) return null;
      const ab = wym[0].mul(wym[1]);
      const co = r.pick(["Zbiornik na deszczówkę", "Basen ogrodowy", "Prostokątna cysterna"]);
      return zad(
        `${co} ma kształt prostopadłościanu o wymiarach $${dz(wym[0])}\\ \\text{m}$, $${dz(wym[1])}\\ \\text{m}$ i $${dz(wym[2])}\\ \\text{m}$. Ile litrów wody mieści się w nim po brzegi?`,
        [pole("l", "Pojemność (w litrach)")], { l: lit }, jed(lit, "l"),
        [
          `Objętość to iloczyn trzech wymiarów: $${dz(wym[0])} \\cdot ${dz(wym[1])} = ${dz(ab)}$, a dalej $${dz(ab)} \\cdot ${dz(wym[2])} = ${dz(V)}$, czyli $V = ${dz(V)}\\ \\text{m}^3$.`,
          `Zamieniamy na litry: $1\\ \\text{m}^3 = 1000\\ \\text{l}$.`,
          `$${dz(V)} \\cdot 1000 = ${dz(lit)}$, więc zbiornik mieści $${dz(lit)}$ litrów.`,
        ],
      );
    });
  }
  return probuj(() => {
    const dl = [0, 0, 0].map(() => r.pick([10, 12, 15, 20, 25, 30, 40, 50, 60, 80, 100]));
    const V = dl[0] * dl[1] * dl[2];
    if (V % 500 !== 0 || V > 300000 || V < 3000) return null;
    const lit = q(V, 1000), ab = dl[0] * dl[1];
    const co = r.pick(["Akwarium", "Pojemnik na wodę", "Zbiornik"]);
    return zad(
      `${co} ma kształt prostopadłościanu o wymiarach $${dl[0]}\\ \\text{cm}$, $${dl[1]}\\ \\text{cm}$ i $${dl[2]}\\ \\text{cm}$. Ile litrów wody mieści się w nim po brzegi?`,
      [pole("l", "Pojemność (w litrach)")], { l: lit }, jed(lit, "l"),
      [
        `Objętość to iloczyn trzech wymiarów: $${dl[0]} \\cdot ${dl[1]} = ${dz(ab)}$, a dalej $${dz(ab)} \\cdot ${dl[2]} = ${dz(V)}$, czyli $V = ${dz(V)}\\ \\text{cm}^3$.`,
        `Zamieniamy na litry: $1\\ \\text{l} = 1000\\ \\text{cm}^3$, więc dzielimy przez $1000$.`,
        `$${dz(V)} : 1000 = ${dz(lit)}$, więc w naczyniu mieści się $${dz(lit)}$ ${litrow(lit)}.`,
      ],
    );
  });
}

function wysokoscWody(r) {
  return probuj(() => {
    const a = r.pick([20, 25, 30, 40, 50, 60, 80, 100]), b = r.pick([20, 25, 30, 40, 50, 60]), h = r.pick([10, 12, 15, 20, 24, 25, 30, 40]);
    if (a === b) return null;
    const V = a * b * h;
    if (V % 500 !== 0 || V > 300000) return null;
    const lit = q(V, 1000);
    const wzro = r.pick(["Dno akwarium", "Dno prostokątnego basenu", "Podstawa prostopadłościennego zbiornika"]);
    return zad(
      `${wzro} ma wymiary $${a}\\ \\text{cm}$ i $${b}\\ \\text{cm}$. Do pustego naczynia wlano $${dz(lit)}$ ${litrow(lit)} wody. Na jaką wysokość (w centymetrach) sięga woda?`,
      [pole("h", "Wysokość wody (w cm)")], { h: q(h) }, jed(h, "cm"),
      [
        `Zamieniamy litry na centymetry sześcienne: $${dz(lit)}\\ \\text{l} = ${dz(lit)}\\ \\text{dm}^3 = ${dz(V)}\\ \\text{cm}^3$.`,
        `Pole dna: $${a} \\cdot ${b} = ${dz(a * b)}\\ \\text{cm}^2$.`,
        `Objętość to pole dna razy wysokość, więc wysokość to $${dz(V)} : ${dz(a * b)} = ${h}$ cm.`,
      ],
    );
  });
}

function poleDzialki(r) {
  return probuj(() => {
    const a = r.pick([20, 25, 40, 50, 60, 80, 100, 125, 200, 250, 400, 500]), b = r.pick([20, 25, 40, 50, 60, 80, 100, 125, 200, 250]);
    if (a === b) return null;
    const S = a * b;
    const ha = r.chance(0.5);
    if (ha ? S % 5000 !== 0 || S < 10000 || S > 500000 : S % 50 !== 0 || S > 20000 || S < 500) return null;
    const wynik = ha ? q(S, 10000) : q(S, 100);
    const co = r.pick([["Prostokątna działka", "jej"], ["Prostokątne pole uprawne", "jego"], ["Prostokątne boisko", "jego"]]);
    return zad(
      `${co[0]} ma wymiary $${a}\\ \\text{m}$ i $${b}\\ \\text{m}$. Jakie jest ${co[1]} pole w ${ha ? "hektarach" : "arach"}?`,
      [pole("pole", ha ? "Pole (w ha)" : "Pole (w a)")], { pole: wynik }, `$${tu(dz(wynik), ha ? "ha" : "a")}$`,
      [
        `Pole prostokąta w metrach kwadratowych: $${a} \\cdot ${b} = ${dz(S)}\\ \\text{m}^2$.`,
        ha
          ? `Hektar to $10\\,000\\ \\text{m}^2$ (kwadrat $100$ m na $100$ m), więc dzielimy przez $10\\,000$: $${dz(S)} : 10\\,000 = ${dz(wynik)}$.`
          : `Ar to $100\\ \\text{m}^2$ (kwadrat $10$ m na $10$ m), więc dzielimy przez $100$: $${dz(S)} : 100 = ${dz(wynik)}$.`,
        `Pole wynosi $${dz(wynik)}$ ${ha ? "ha" : "a"}.`,
      ],
    );
  });
}

function jednostkiPoleObjetosc(r) {
  const w = r.int(0, 99);
  if (w < 30) return zamianaPolaObjetosci(r, POLE, PARY_POLE);
  if (w < 55) return zamianaPolaObjetosci(r, OBJ, PARY_OBJ);
  if (w < 75) return pojemnoscProstopadloscianu(r);
  if (w < 85) return wysokoscWody(r);
  return poleDzialki(r);
}

// --- 13. Skala: odległość na mapie i w terenie

const SKALE_PLAN = [50, 100, 200, 250, 500, 1000];
const SKALE_MAPA = [10000, 20000, 25000, 50000, 100000];
const CM_NA_MAPIE = [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 7.5, 8, 10, 12];
const skalaTex = (n) => `1 : ${dz(n)}`;

/** Odległość w terenie podana w centymetrach (Q) -> wartość i jednostka: metry do 1000 m, potem kilometry. */
function odlTeren(cm) {
  const m = cm.div(100);
  return Number(m) >= 1000 ? { v: cm.div(100000), j: "km", dziel: 100000 } : { v: m, j: "m", dziel: 100 };
}

const OBIEKTY_PLAN = [
  { co: "Na planie mieszkania", ob: "długość salonu", gdzie: "Jaka jest rzeczywista długość salonu?" },
  { co: "Na planie ogrodu", ob: "długość alejki", gdzie: "Jaka jest rzeczywista długość alejki?" },
  { co: "Na planie boiska szkolnego", ob: "długość boiska", gdzie: "Jaka jest rzeczywista długość boiska?" },
  { co: "Na planie osiedla", ob: "odległość między szkołą a sklepem", gdzie: "Jaka jest rzeczywista odległość między szkołą a sklepem?" },
];
const OBIEKTY_MAPA = [
  { co: "Na mapie", ob: "odległość między dwoma miasteczkami", gdzie: "Jaka jest rzeczywista odległość między tymi miasteczkami?" },
  { co: "Na mapie turystycznej", ob: "długość szlaku", gdzie: "Jaka jest rzeczywista długość szlaku?" },
  { co: "Na mapie", ob: "długość jeziora", gdzie: "Jaka jest rzeczywista długość jeziora?" },
];

function mapaDoRzeczywistosci(r) {
  return probuj(() => {
    const plan = r.chance(0.45);
    const n = r.pick(plan ? SKALE_PLAN : SKALE_MAPA), X = qn(r.pick(CM_NA_MAPIE));
    const cm = X.mul(n), { v, j, dziel } = odlTeren(cm);
    if (10000 % v.d !== 0 || Number(v) < 1) return null;
    const o = r.pick(plan ? OBIEKTY_PLAN : OBIEKTY_MAPA);
    return zad(
      `${o.co} w skali $${skalaTex(n)}$ ${o.ob} wynosi $${dz(X)}$ cm. ${o.gdzie} Podaj wynik w ${j === "km" ? "kilometrach" : "metrach"}.`,
      [pole("odl", `Odległość (w ${j})`)], { odl: v }, jed(v, j),
      [
        `Skala $${skalaTex(n)}$ znaczy, że $1$ cm na ${plan ? "planie" : "mapie"} to $${dz(n)}$ cm w rzeczywistości.`,
        `Mnożymy długość na ${plan ? "planie" : "mapie"} przez $${dz(n)}$: $${dz(X)} \\cdot ${dz(n)} = ${dz(cm)}$ cm.`,
        `Zamieniamy na ${j === "km" ? "kilometry" : "metry"}: $1\\ \\text{${j}} = ${dz(dziel)}\\ \\text{cm}$, więc dzielimy: $${dz(cm)} : ${dz(dziel)} = ${dz(v)}$ ${j}.`,
      ],
    );
  });
}

function rzeczywistoscNaMape(r) {
  return probuj(() => {
    const plan = r.chance(0.45);
    const n = r.pick(plan ? SKALE_PLAN : SKALE_MAPA), X = qn(r.pick(CM_NA_MAPIE));
    const cm = X.mul(n), { v, j, dziel } = odlTeren(cm);
    if (10000 % v.d !== 0 || Number(v) < 1) return null;
    const o = r.pick(plan ? OBIEKTY_PLAN : OBIEKTY_MAPA);
    const rys = plan ? "planie" : "mapie";
    return zad(
      `${plan ? "Plan" : "Mapę"} wykonano w skali $${skalaTex(n)}$. ${cap(o.ob)} w rzeczywistości wynosi $${dz(v)}$ ${j}. Ile centymetrów ma ten odcinek na ${rys}?`,
      [pole("cm", "Długość na rysunku (w cm)")], { cm: X }, jed(X, "cm"),
      [
        `Zamieniamy odległość rzeczywistą na centymetry: $1\\ \\text{${j}} = ${dz(dziel)}\\ \\text{cm}$, więc $${dz(v)} \\cdot ${dz(dziel)} = ${dz(cm)}$ cm.`,
        `W skali $${skalaTex(n)}$ na ${rys} jest $${dz(n)}$ razy mniej, więc dzielimy: $${dz(cm)} : ${dz(n)} = ${dz(X)}$ cm.`,
        `Sprawdzenie: $${dz(X)} \\cdot ${dz(n)} = ${dz(cm)}$ cm – zgadza się. Odcinek na ${rys} jest krótszy niż w rzeczywistości, jak powinien.`,
      ],
    );
  });
}

function czasZMapy(r) {
  return probuj(() => {
    const n = r.pick([25000, 50000, 100000]), X = qn(r.pick([2, 3, 4, 5, 6, 8, 10, 12]));
    const km = X.mul(n).div(100000);
    const v = r.pick([4, 5, 6, 10, 12, 15, 20]);
    const min = km.mul(60).div(v);
    if (!min.calkowita || Number(km) < 1 || !calePol(km)) return null;
    const kto = r.pick([{ k: "Turysta idzie", v: [4, 5, 6] }, { k: "Rowerzysta jedzie", v: [10, 12, 15, 20] }]);
    if (!kto.v.includes(v)) return null;
    return zad(
      `Trasa na mapie w skali $${skalaTex(n)}$ ma długość $${dz(X)}$ cm. ${kto.k} ze stałą prędkością $${v}$ km/h. Ile minut zajmie mu przebycie całej trasy?`,
      [pole("min", "Czas (w minutach)")], { min }, jed(min, "min"),
      [
        `Długość trasy w rzeczywistości: $${dz(X)} \\cdot ${dz(n)} = ${dz(X.mul(n))}$ cm $= ${dz(km)}$ km (dzielimy przez $100\\,000$).`,
        `Czas to droga podzielona przez prędkość: $${dz(km)} : ${v} = ${czasTex(km.div(v))}$ h.`,
        `Zamieniamy godziny na minuty (mnożymy przez $60$): $${czasTex(km.div(v))} \\cdot 60 = ${dz(min)}$ min.`,
      ],
    );
  });
}

function skalaOdleglosc(r) {
  const w = r.int(0, 99);
  if (w < 42) return mapaDoRzeczywistosci(r);
  if (w < 84) return rzeczywistoscNaMape(r);
  return czasZMapy(r);
}

// --- 14. Skala: wyznaczanie skali, pole w skali, skala mianowana i podziałka

function szukanaSkala(r) {
  return probuj(() => {
    const rodzaj = r.int(0, 2);
    if (rodzaj === 0) {
      const n = r.pick(SKALE_MAPA), X = qn(r.pick([1, 2, 2.5, 4, 5])), cm = X.mul(n), { v, j, dziel } = odlTeren(cm);
      if (10000 % v.d !== 0) return null;
      return zad(
        `Odcinek o długości $${dz(X)}$ cm na mapie odpowiada w rzeczywistości odległości $${dz(v)}$ ${j}. W jakiej skali wykonano mapę? Podaj liczbę $n$ w skali $1 : n$.`,
        [pole("n", "Liczba $n$ w skali $1 : n$")], { n: q(n) }, `$${skalaTex(n)}$`,
        [
          `Obie długości zamieniamy na centymetry: odległość rzeczywista to $${dz(v)}\\ \\text{${j}} = ${dz(v)} \\cdot ${dz(dziel)} = ${dz(cm)}$ cm, a na mapie jest $${dz(X)}$ cm.`,
          `Dzielimy długość rzeczywistą przez długość na mapie: $n = ${dz(cm)} : ${dz(X)} = ${dz(n)}$.`,
          `Skala zawsze zaczyna się od jedynki: $${skalaTex(n)}$.`,
        ],
      );
    }
    if (rodzaj === 1) {
      const n = r.pick(SKALE_PLAN), X = qn(r.pick([2, 3, 4, 5, 6, 8, 10])), cm = X.mul(n), m = cm.div(100);
      if (10000 % m.d !== 0) return null;
      const co = r.pick([["pokój", "Pokój"], ["korytarz", "Korytarz"], ["działka", "Działka"]]);
      return zad(
        `${co[1]} ma w rzeczywistości długość $${dz(m)}$ m, a na planie $${dz(X)}$ cm. W jakiej skali narysowano plan? Podaj liczbę $n$ w skali $1 : n$.`,
        [pole("n", "Liczba $n$ w skali $1 : n$")], { n: q(n) }, `$${skalaTex(n)}$`,
        [
          `Zamieniamy rzeczywistą długość na centymetry: $${dz(m)}\\ \\text{m} = ${dz(m)} \\cdot 100 = ${dz(cm)}$ cm.`,
          `Dzielimy długość rzeczywistą przez długość na planie: $n = ${dz(cm)} : ${dz(X)} = ${dz(n)}$.`,
          `Skala planu to $${skalaTex(n)}$ (jeden centymetr na planie to $${dz(n)}$ cm, czyli $${dz(q(n, 100))}$ m w rzeczywistości).`,
        ],
      );
    }
    const n = r.pick([10, 20, 25, 40, 50, 100]), X = r.pick([10, 12, 15, 20, 25, 30, 40, 50]), cm = X * n;
    if (cm % 10 !== 0 || cm < 100) return null;
    const m = q(cm, 100);
    const model = r.pick([["samochodu", "samochód"], ["samolotu", "samolot"], ["statku", "statek"], ["autobusu", "autobus"]]);
    return zad(
      `Model ${model[0]} ma długość $${X}$ cm, a prawdziwy ${model[1]} ma $${dz(m)}$ m. W jakiej skali wykonano model? Podaj liczbę $n$ w skali $1 : n$.`,
      [pole("n", "Liczba $n$ w skali $1 : n$")], { n: q(n) }, `$${skalaTex(n)}$`,
      [
        `Długość prawdziwego obiektu zamieniamy na centymetry: $${dz(m)}\\ \\text{m} = ${dz(m)} \\cdot 100 = ${dz(cm)}$ cm.`,
        `Dzielimy długość rzeczywistą przez długość modelu: $n = ${dz(cm)} : ${X} = ${n}$.`,
        `Skala modelu to $${skalaTex(n)}$ – model jest $${n}$ razy mniejszy.`,
      ],
    );
  });
}

function poleWSkali(r) {
  return probuj(() => {
    const n = r.pick([50, 100, 200, 250, 500, 1000]), a = r.pick([2, 3, 4, 5, 6, 8, 10]), b = r.pick([2, 3, 4, 5, 6, 8, 10]);
    if (a === b) return null;
    const P = a * b;                                   // pole na planie w cm²
    const popr = q(P * n * n, 10000);                  // pole rzeczywiste w m²
    if (10000 % popr.d !== 0 || Number(popr) > 100000) return null;
    const zleW = [q(P * n, 10000), q(P * n * n, 100), q(P * n * n), q(P * n, 100)];
    const wszystkie = [...new Set(zleW.map((x) => x.toString()))].filter((x) => x !== popr.toString());
    if (wszystkie.length < 3) return null;
    const zle = zleW.filter((x) => x.toString() !== popr.toString());
    const uniq = [];
    for (const x of zle) if (!uniq.some((y) => y.eq(x)) && 10000 % x.d === 0) uniq.push(x);
    if (uniq.length < 3) return null;
    const opc = (x) => `$${dz(x)}\\ \\text{m}^2$`;
    const m = mieszaj(r, opc(popr), r.shuffle(uniq).slice(0, 3).map(opc));
    if (!m) return null;
    const bok1 = q(a * n, 100), bok2 = q(b * n, 100);
    const co = r.pick(["Działka", "Boisko", "Ogród"]);
    return zad(
      `${co} ma na planie w skali $${skalaTex(n)}$ kształt prostokąta o wymiarach $${a}$ cm i $${b}$ cm. Ile metrów kwadratowych ma pole rzeczywiste?`,
      [polew("pole", "Pole rzeczywiste", m.opcje)], { pole: m.ind }, opc(popr),
      [
        `Boki zamieniamy na rzeczywiste: $${a} \\cdot ${n} = ${dz(a * n)}$ cm $= ${dz(bok1)}$ m oraz $${b} \\cdot ${n} = ${dz(b * n)}$ cm $= ${dz(bok2)}$ m.`,
        `Pole prostokąta: $${dz(bok1)} \\cdot ${dz(bok2)} = ${dz(popr)}\\ \\text{m}^2$.`,
        `Można też: pole na planie to $${a} \\cdot ${b} = ${P}\\ \\text{cm}^2$, a pole rośnie $n^2$ razy: $${P} \\cdot ${dz(n)}^2 = ${dz(P * n * n)}\\ \\text{cm}^2 = ${dz(popr)}\\ \\text{m}^2$ (dzielimy przez $10\\,000$). Pola nie mnożymy tylko przez $${dz(n)}$.`,
      ],
    );
  });
}

function skalaMianowanaPodzialka(r) {
  const w = r.int(0, 2);
  if (w === 0) {
    const X = r.pick([5, 10, 20, 25, 50, 100, 200, 250, 500, 1000]);
    const n = X * 100;
    const opis = X === 1000 ? "1 cm – 1 km" : `1 cm – ${dz(X)} m`;
    return zad(
      `Na mapie podano skalę mianowaną „${opis}”. Zapisz tę skalę w postaci $1 : n$ i podaj liczbę $n$.`,
      [pole("n", "Liczba $n$ w skali $1 : n$")], { n: q(n) }, `$${skalaTex(n)}$`,
      [
        `Zapis „${opis}” znaczy, że $1$ cm na mapie to ${X === 1000 ? "$1$ km" : `$${dz(X)}$ m`} w rzeczywistości.`,
        `Zamieniamy odległość rzeczywistą na centymetry: ${X === 1000 ? "$1\\ \\text{km} = 100\\,000\\ \\text{cm}$" : `$${dz(X)}\\ \\text{m} = ${dz(X)} \\cdot 100 = ${dz(n)}\\ \\text{cm}$`}.`,
        `Skala: $${skalaTex(n)}$. (To nie jest skala $1 : ${dz(X)}$ – najpierw trzeba zamienić jednostki.)`,
      ],
    );
  }
  if (w === 1) {
    return probuj(() => {
      const a = r.pick([1, 2, 4, 5]), na1 = r.pick([10, 20, 25, 50, 100, 200]), b = a * na1;
      const x = qn(r.pick([2, 2.5, 3, 4, 4.5, 5, 6, 7, 8]));
      const wynik = x.mul(na1);
      if (!calePol(wynik)) return null;
      return zad(
        `Na podziałce liniowej planu odcinek o długości $${a}$ cm odpowiada $${b}$ m w rzeczywistości. Odległość między szkołą a parkiem na planie wynosi $${dz(x)}$ cm. Ile metrów dzieli szkołę od parku?`,
        [pole("odl", "Odległość (w m)")], { odl: wynik }, jed(wynik, "m"),
        [
          a === 1
            ? `Na podziałce $1$ cm odpowiada $${b}$ m.`
            : `Najpierw sprawdzamy, ile metrów odpowiada $1$ cm: $${b} : ${a} = ${na1}$ m.`,
          `Odległość na planie mnożymy przez tyle metrów, ile odpowiada $1$ cm: $${dz(x)} \\cdot ${na1} = ${dz(wynik)}$ m.`,
        ],
      );
    });
  }
  const n = r.pick([2, 3, 4, 5, 10, 20, 25, 30, 50, 100, 200, 250, 300]);
  return zad(
    `Plan wykonano w skali $${skalaTex(n)}$. Ile razy pole rzeczywistego obszaru jest większe od jego pola na planie?`,
    [pole("razy", "Liczba razy")], { razy: q(n * n) }, `$${dz(n * n)}$`,
    [
      `W skali $${skalaTex(n)}$ każda długość jest $${n}$ razy mniejsza na planie niż w rzeczywistości.`,
      `Pole to długość razy szerokość, więc rośnie $${n}$ razy ze względu na długość i jeszcze $${n}$ razy ze względu na szerokość: $${n} \\cdot ${n} = ${dz(n * n)}$.`,
      `Pole nie rośnie tylko $${n}$ razy – skala pól to $1 : ${dz(n * n)}$.`,
    ],
  );
}

function skalaPolaIPodzialka(r) {
  const w = r.int(0, 99);
  if (w < 30) return szukanaSkala(r);
  if (w < 60) return poleWSkali(r);
  return skalaMianowanaPodzialka(r);
}

// --- 15. Czas na zegarze: czas trwania, godzina końca i początku, minuty

/** Godzina w TeX-ie: 8{:}05 (liczba minut od północy, dobę liczymy modulo). */
const zegar = (m) => `${Math.floor((m % 1440) / 60)}{:}${String(m % 60).padStart(2, "0")}`;
const Z = (m) => `$${zegar(m)}$`;
/** „2 h 35 min” z liczbami w $…$. */
const hm = (m) => {
  const h = Math.floor(m / 60), mi = m % 60;
  return h && mi ? `$${h}$ h $${mi}$ min` : h ? `$${h}$ h` : `$${mi}$ min`;
};
const godz = ["godzina", "godziny", "godzin"];
const WYDARZENIA = [
  { start: (a, b) => `Film rozpoczął się o ${a}, a zakończył o ${b}.`, pyt: "Jak długo trwał film?" },
  { start: (a, b) => `Pociąg wyjechał ze stacji o ${a} i dojechał do celu o ${b}.`, pyt: "Ile trwała podróż pociągiem?" },
  { start: (a, b) => `Mecz rozpoczął się o ${a}, a zakończył o ${b}.`, pyt: "Jak długo trwał mecz?" },
  { start: (a, b) => `Koncert zaczął się o ${a} i skończył o ${b}.`, pyt: "Jak długo trwał koncert?" },
  { start: (a, b) => `Kuba wyszedł z domu o ${a}, a wrócił o ${b}.`, pyt: "Jak długo Kuby nie było w domu?" },
  { start: (a, b) => `Wycieczka wyruszyła o ${a} i wróciła o ${b}.`, pyt: "Jak długo trwała wycieczka?" },
];
const ZDARZENIA_TRWA = [
  { op: (d, a) => `Pociąg wyjechał o ${a} i jechał ${d}.`, pyt: "O której godzinie dojechał do celu?", gdzie: "dojechał" },
  { op: (d, a) => `Film rozpoczął się o ${a} i trwał ${d}.`, pyt: "O której godzinie się skończył?", gdzie: "skończył" },
  { op: (d, a) => `Mecz zaczął się o ${a} i trwał razem z przerwą ${d}.`, pyt: "O której godzinie się skończył?", gdzie: "skończył" },
  { op: (d, a) => `Wycieczka wyruszyła o ${a} i trwała ${d}.`, pyt: "O której godzinie wycieczka się skończyła?", gdzie: "skończyła" },
];

/** Kroki liczenia „schodkami” od start do koniec (minuty od północy, koniec > start, może przekraczać 1440). */
function krokiSchodkami(start, koniec) {
  const k = [];
  const dur = koniec - start;
  if (koniec > 1440 && start < 1440) {
    const doPolnocy = 1440 - start, poPolnocy = koniec - 1440;
    k.push(`Czas liczymy w dwóch częściach: do północy ($24{:}00$) i po północy.`);
    k.push(`Od ${Z(start)} do $24{:}00$ mija ${hm(doPolnocy)}, a od $0{:}00$ do ${Z(koniec)} mija ${hm(poPolnocy)}.`);
    k.push(`Razem: ${hm(doPolnocy)} + ${hm(poPolnocy)} = ${hm(dur)}.`);
    return k;
  }
  const kroki = [];
  let cur = start;
  if (cur % 60 !== 0 && Math.floor(cur / 60) < Math.floor(koniec / 60)) {
    const nast = (Math.floor(cur / 60) + 1) * 60;
    kroki.push([cur, nast]);
    cur = nast;
  }
  const pelne = Math.floor(koniec / 60) * 60;
  if (pelne > cur) {
    kroki.push([cur, pelne]);
    cur = pelne;
  }
  if (koniec > cur) kroki.push([cur, koniec]);
  k.push(`Liczymy schodkami, czyli po kolei do pełnych godzin: ${kroki.map(([a, b]) => `od ${Z(a)} do ${Z(b)} jest ${hm(b - a)}`).join(", ")}.`);
  if (kroki.length > 1) k.push(`Razem: ${kroki.map(([a, b]) => hm(b - a)).join(" + ")} = ${hm(dur)}.`);
  return k;
}

function czasTrwania(r, przezPolnoc) {
  return probuj(() => {
    const pol = przezPolnoc;
    const start = pol ? r.int(240, 287) * 5 : r.int(60, 220) * 5;       // 20:00-23:55 albo 5:00-18:20
    const dur = (pol ? r.int(13, 120) : r.int(5, 84)) * 5;
    const koniec = start + dur;
    if (pol ? koniec <= 1440 || koniec > 1440 + 480 : koniec > 1380) return null;
    if (pol && koniec % 1440 === 0) return null;
    const ev = r.pick(WYDARZENIA);
    const H = Math.floor(dur / 60), M = dur % 60;
    return zad(
      `${ev.start(Z(start), Z(koniec))} ${ev.pyt} Podaj wynik w godzinach i minutach.`,
      [pole("godz", "Godziny"), pole("min", "Minuty")], { godz: q(H), min: q(M) }, hm(dur),
      [
        ...krokiSchodkami(start, koniec),
        `Czas trwania: ${hm(dur)}.`,
      ],
    );
  });
}

function godzinaKoncaIPoczatku(r) {
  return probuj(() => {
    const koniecTyp = r.chance(0.65);
    const dur = r.int(8, 60) * 5;
    const H = Math.floor(dur / 60), M = dur % 60;
    const przezPolnoc = r.chance(0.4);
    const start = przezPolnoc ? r.int(240, 287) * 5 : r.int(60, 200) * 5;
    const koniec = start + dur;
    if (przezPolnoc ? koniec <= 1440 : koniec >= 1440) return null;
    if (koniecTyp) {
      const t1 = start + H * 60, ev = r.pick(ZDARZENIA_TRWA);
      const kroki = [];
      if (H) kroki.push(`Najpierw dodajemy pełne godziny: ${Z(start)} + $${H}$ h = ${Z(t1)}.`);
      if (M) {
        const sumaMin = (start % 60) + M;
        kroki.push(`${H ? "Potem dodajemy" : "Dodajemy"} minuty: ${Z(t1)} + $${M}$ min${sumaMin >= 60 ? ` (minut jest $${start % 60} + ${M} = ${sumaMin}$, czyli ponad godzina, więc zmienia się też godzina)` : ""} = ${Z(koniec)}.`);
      }
      if (koniec >= 1440) kroki.push(`Przekroczyliśmy północ ($24{:}00$ to $0{:}00$), więc po północy jest godzina ${Z(koniec)}.`);
      return zad(
        `${ev.op(hm(dur), Z(start))} ${ev.pyt} Podaj godzinę w zapisie 24-godzinnym${koniec >= 1440 ? " (po północy godziny liczymy od $0$)" : ""}.`,
        [pole("godz", "Godzina"), pole("min", "Minuty")], { godz: q(Math.floor((koniec % 1440) / 60)), min: q(koniec % 60) }, Z(koniec),
        kroki,
      );
    }
    const kto = r.pick([
      { op: (d, b) => `Pociąg dojechał do stacji o ${b}, a podróż trwała ${d}.`, pyt: "O której godzinie pociąg wyjechał?" },
      { op: (d, b) => `Film skończył się o ${b} i trwał ${d}.`, pyt: "O której godzinie film się zaczął?" },
      { op: (d, b) => `Wycieczka wróciła o ${b}, a trwała ${d}.`, pyt: "O której godzinie wycieczka wyruszyła?" },
    ]);
    const t1 = koniec - H * 60;
    const kroki = [];
    if (H) kroki.push(`Najpierw odejmujemy pełne godziny: ${Z(koniec)} - $${H}$ h = ${Z(t1)}.`);
    if (M) kroki.push(`${H ? "Potem odejmujemy" : "Odejmujemy"} minuty: ${Z(t1)} - $${M}$ min${(t1 % 60) < M ? ` (minut jest za mało, więc „pożyczamy” godzinę: $${t1 % 60} + 60 - ${M} = ${(t1 % 60) + 60 - M}$ min)` : ""} = ${Z(start)}.`);
    if (koniec >= 1440 && start < 1440 && koniec % 1440 < 360) kroki.push("Cofnęliśmy się przez północ, więc wynik jest z poprzedniego dnia (wieczorem).");
    return zad(
      `${kto.op(hm(dur), Z(koniec))} ${kto.pyt} Podaj godzinę w zapisie 24-godzinnym.`,
      [pole("godz", "Godzina"), pole("min", "Minuty")], { godz: q(Math.floor((start % 1440) / 60)), min: q(start % 60) }, Z(start),
      kroki,
    );
  });
}

function minutyIGodziny(r) {
  const w = r.int(0, 2);
  if (w === 0) {
    const h = r.int(1, 5), m = r.pick([10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
    const rzecz = r.pick(["Film", "Mecz", "Lekcje w szkole", "Rejs statkiem"]);
    return zad(
      `${rzecz} ${rzecz === "Lekcje w szkole" ? "trwają" : "trwa"} ${hm(h * 60 + m)}. Ile to minut?`,
      [pole("min", "Czas (w minutach)")], { min: q(h * 60 + m) }, jed(h * 60 + m, "min"),
      [
        `W jednej godzinie jest $60$ minut, więc $${h}$ h $= ${h} \\cdot 60 = ${h * 60}$ min.`,
        `Dodajemy pozostałe minuty: $${h * 60} + ${m} = ${h * 60 + m}$ min.`,
      ],
    );
  }
  if (w === 1) {
    const h = r.int(1, 5), m = r.pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]), suma = h * 60 + m;
    const rzecz = r.pick(["Film trwał", "Mecz razem z przerwą trwał", "Podróż pociągiem trwała", "Wycieczka trwała", "Koncert trwał"]);
    return zad(
      `${rzecz} $${suma}$ ${lm(suma, ["minutę", "minuty", "minut"])}. Zapisz ten czas w godzinach i minutach.`,
      [pole("godz", "Godziny"), pole("min", "Minuty")], { godz: q(h), min: q(m) }, hm(suma),
      [
        `W jednej godzinie jest $60$ minut. Sprawdzamy, ile pełnych godzin mieści się w $${suma}$ minutach: $${suma} : 60 = ${h}$ reszty $${m}$ (bo $${h} \\cdot 60 = ${h * 60}$).`,
        `Czyli $${suma}$ min to ${hm(suma)}.`,
      ],
    );
  }
  return probuj(() => {
    const a = r.int(20, 130), b = r.int(20, 130);
    const aa = Math.ceil(a / 5) * 5, bb = Math.ceil(b / 5) * 5;
    const plus = r.chance(0.6);
    if (plus) {
      const suma = aa + bb;
      if ((aa % 60) + (bb % 60) < 60) return null;
      return zad(
        `Pierwsza część filmu trwała ${hm(aa)}, a druga ${hm(bb)}. Jak długo trwał cały film? Podaj wynik w godzinach i minutach.`,
        [pole("godz", "Godziny"), pole("min", "Minuty")], { godz: q(Math.floor(suma / 60)), min: q(suma % 60) }, hm(suma),
        [
          `Dodajemy osobno godziny i minuty: godziny $${Math.floor(aa / 60)} + ${Math.floor(bb / 60)} = ${Math.floor(aa / 60) + Math.floor(bb / 60)}$, minuty $${aa % 60} + ${bb % 60} = ${(aa % 60) + (bb % 60)}$.`,
          `Minut jest ponad $60$, a $60$ min to $1$ h, więc zamieniamy: $${(aa % 60) + (bb % 60)}$ min $= 1$ h $${(aa % 60) + (bb % 60) - 60}$ min.`,
          `Razem: $${Math.floor(aa / 60) + Math.floor(bb / 60)} + 1 = ${Math.floor(suma / 60)}$ h i $${suma % 60}$ min.`,
        ],
      );
    }
    const calosc = Math.max(aa, bb) + Math.min(aa, bb), czesc = Math.min(aa, bb), reszta = calosc - czesc;
    if ((calosc % 60) >= (czesc % 60) || calosc < 120) return null;
    return zad(
      `Podróż trwała w sumie ${hm(calosc)}, z czego ${hm(czesc)} pasażer jechał pociągiem, a resztę autobusem. Jak długo jechał autobusem? Podaj wynik w godzinach i minutach.`,
      [pole("godz", "Godziny"), pole("min", "Minuty")], { godz: q(Math.floor(reszta / 60)), min: q(reszta % 60) }, hm(reszta),
      [
        `Odejmujemy od całego czasu czas jazdy pociągiem: ${hm(calosc)} - ${hm(czesc)}.`,
        `Minut jest za mało do odjęcia ($${calosc % 60} < ${czesc % 60}$), więc „pożyczamy” godzinę, czyli $60$ minut: ${hm(calosc)} $= ${Math.floor(calosc / 60) - 1}$ h $${(calosc % 60) + 60}$ min.`,
        `Odejmujemy godziny i minuty: $${Math.floor(calosc / 60) - 1} - ${Math.floor(czesc / 60)} = ${Math.floor(reszta / 60)}$ h oraz $${(calosc % 60) + 60} - ${czesc % 60} = ${reszta % 60}$ min.`,
      ],
    );
  });
}

function czasNaZegarze(r) {
  const w = r.int(0, 99);
  if (w < 20) return czasTrwania(r, false);
  if (w < 40) return czasTrwania(r, true);
  if (w < 75) return godzinaKoncaIPoczatku(r);
  return minutyIGodziny(r);
}

// --- 16. Kalendarz: dni w miesiącach, dzień tygodnia, data po n dniach, lata przestępne

const MIESIACE_GEN = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
const MIESIACE_NOM = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
const DNI_TYG = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];
const MIESIACE_LOK = ["styczniu", "lutym", "marcu", "kwietniu", "maju", "czerwcu", "lipcu", "sierpniu", "wrześniu", "październiku", "listopadzie", "grudniu"];
const DNI_LM = ["dzień", "dni", "dni"];
const przestepny = (rok) => (rok % 4 === 0 && rok % 100 !== 0) || rok % 400 === 0;
const dniMies = (rok, m) => [31, przestepny(rok) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
const nrDnia = (rok, m, d) => {
  let s = d;
  for (let i = 1; i < m; i++) s += dniMies(rok, i);
  return s;
};
const data = (d, m) => `$${d}$ ${MIESIACE_GEN[m - 1]}`;
/** Tekst o długości lutego, gdy rok ma znaczenie. */
const opisLutego = (rok) => (przestepny(rok)
  ? `Rok $${rok}$ jest przestępny (jego numer dzieli się przez $4$), więc luty ma $29$ dni.`
  : `Rok $${rok}$ nie jest przestępny, więc luty ma $28$ dni.`);

/** Data po n dniach od (m, d) w roku rok; zwraca { m, d, kroki } albo null, gdy wychodzi poza rok. */
function przesunDate(rok, m, d, n) {
  if (nrDnia(rok, m, d) + n > (przestepny(rok) ? 366 : 365)) return null;
  const kroki = [];
  let reszta = n, mm = m, dd = d, luty = false;
  for (;;) {
    const len = dniMies(rok, mm);
    if (mm === 2) luty = true;
    if (dd > 0) {
      const doKonca = len - dd;
      if (reszta <= doKonca) {
        kroki.push(`Do końca ${MIESIACE_GEN[mm - 1]} zostało $${len} - ${dd} = ${doKonca}$ ${lm(doKonca, DNI_LM)}, a do przesunięcia mamy $${reszta}$, więc zostajemy w tym miesiącu: $${dd} + ${reszta} = ${dd + reszta}$.`);
        dd += reszta;
        break;
      }
      reszta -= doKonca;
      kroki.push(`Do końca ${MIESIACE_GEN[mm - 1]} zostało $${len} - ${dd} = ${doKonca}$ ${lm(doKonca, DNI_LM)}. Po tylu dniach jest ostatni dzień miesiąca i zostaje jeszcze $${reszta}$ ${lm(reszta, DNI_LM)}.`);
    } else {
      if (reszta <= len) {
        kroki.push(`${cap(MIESIACE_NOM[mm - 1])} ma $${len}$ ${lm(len, DNI_LM)}, a zostało $${reszta}$, więc kończymy w tym miesiącu: to $${reszta}$ ${MIESIACE_GEN[mm - 1]}.`);
        dd = reszta;
        break;
      }
      reszta -= len;
      kroki.push(`${cap(MIESIACE_NOM[mm - 1])} ma $${len}$ ${lm(len, DNI_LM)}, więc przechodzimy dalej i zostaje $${reszta}$ ${lm(reszta, DNI_LM)}.`);
    }
    mm += 1;
    dd = 0;
  }
  if (luty) kroki.push(opisLutego(rok));
  return { m: mm, d: dd, kroki };
}

/** Liczba dni od (m1, d1) do (m2, d2) w jednym roku wraz z opisem. */
function miedzyDatami(rok, m1, d1, m2, d2) {
  const n = nrDnia(rok, m2, d2) - nrDnia(rok, m1, d1);
  if (m1 === m2) return { n, tekst: `Obie daty są w tym samym miesiącu, więc odejmujemy numery dni: $${d2} - ${d1} = ${n}$.`, luty: false };
  const skladniki = [];
  const opisy = [];
  const doKonca = dniMies(rok, m1) - d1;
  if (doKonca > 0) {
    skladniki.push(doKonca);
    opisy.push(`do końca ${MIESIACE_GEN[m1 - 1]} jest $${dniMies(rok, m1)} - ${d1} = ${doKonca}$ ${lm(doKonca, DNI_LM)}`);
  } else opisy.push(`${data(d1, m1)} to ostatni dzień miesiąca`);
  for (let m = m1 + 1; m < m2; m++) {
    skladniki.push(dniMies(rok, m));
    opisy.push(`cały ${MIESIACE_NOM[m - 1]} to $${dniMies(rok, m)}$ ${lm(dniMies(rok, m), DNI_LM)}`);
  }
  skladniki.push(d2);
  opisy.push(`w ${MIESIACE_LOK[m2 - 1]} dochodzi jeszcze $${d2}$ ${lm(d2, DNI_LM)}`);
  const luty = m1 <= 2 && m2 > 2;
  return { n, tekst: `Liczymy po miesiącach: ${opisy.join("; ")}.${skladniki.length > 1 ? ` Razem: $${skladniki.join(" + ")} = ${n}$.` : ""}`, luty };
}

function dzienTygodniaPoNDniach(r) {
  return probuj(() => {
    const i = r.int(0, 6);
    const dwieDaty = r.chance(0.35);
    if (dwieDaty) {
      const rok = r.pick([2021, 2022, 2023, 2025]);          // lata zwykłe; daty od marca, więc luty nie ma znaczenia
      const m1 = r.int(3, 10), d1 = r.int(1, dniMies(rok, m1));
      const m2 = r.int(m1, 12), d2 = r.int(1, dniMies(rok, m2));
      const n = nrDnia(rok, m2, d2) - nrDnia(rok, m1, d1);
      if (n < 9 || n % 7 === 0) return null;
      const md = miedzyDatami(rok, m1, d1, m2, d2);
      const rr = n % 7, cel = (i + rr) % 7;
      const zle = [(cel + 1) % 7, (cel + 6) % 7];
      for (const t of r.shuffle([0, 1, 2, 3, 4, 5, 6])) if (zle.length < 3 && t !== cel && !zle.includes(t)) zle.push(t);
      const m = mieszaj(r, DNI_TYG[cel], zle.map((x) => DNI_TYG[x]));
      if (!m) return null;
      return zad(
        `Pewnego roku ${data(d1, m1)} był ${DNI_TYG[i]}. Jaki dzień tygodnia był ${data(d2, m2)} tego samego roku?`,
        [polew("dzien", "Dzień tygodnia", m.opcje)], { dzien: m.ind }, DNI_TYG[cel],
        [
          `Najpierw liczymy, ile dni dzieli te daty. ${md.tekst}`,
          `Tydzień ma $7$ dni, więc liczy się reszta z dzielenia przez $7$: $${n} : 7 = ${Math.floor(n / 7)}$ reszty $${rr}$ (bo $${Math.floor(n / 7)} \\cdot 7 = ${Math.floor(n / 7) * 7}$).`,
          `Przesuwamy się o $${rr}$ ${lm(rr, DNI_LM)} od dnia „${DNI_TYG[i]}” (dnia startowego nie liczymy): ${Array.from({ length: rr }, (_, k) => DNI_TYG[(i + k + 1) % 7]).join(", ")}. Szukany dzień to ${DNI_TYG[cel]}.`,
        ],
      );
    }
    const n = r.int(10, 200);
    if (n % 7 === 0 && r.chance(0.8)) return null;
    const temu = r.chance(0.25);
    const rr = n % 7, k = Math.floor(n / 7);
    const cel = ((temu ? i - rr : i + rr) % 7 + 7) % 7;
    const traps = temu
      ? [(cel + 1) % 7, (i + rr) % 7, (cel + 6) % 7]
      : [(cel + 1) % 7, (cel + 6) % 7, ((i - rr) % 7 + 7) % 7];
    const zle = [...new Set(traps.filter((x) => x !== cel))];
    for (let t = 0; zle.length < 3 && t < 7; t++) if (t !== cel && !zle.includes(t)) zle.push(t);
    const m = mieszaj(r, DNI_TYG[cel], zle.slice(0, 3).map((x) => DNI_TYG[x]));
    if (!m) return null;
    const droga = Array.from({ length: rr }, (_, t) => DNI_TYG[(((temu ? i - t - 1 : i + t + 1) % 7) + 7) % 7]).join(", ");
    return zad(
      `Dziś jest ${DNI_TYG[i]}. Jaki dzień tygodnia ${temu ? "był" : "będzie"} ${temu ? "" : "za "}$${n}$ dni${temu ? " temu" : ""}?`,
      [polew("dzien", "Dzień tygodnia", m.opcje)], { dzien: m.ind }, DNI_TYG[cel],
      [
        "Tydzień ma $7$ dni, więc po $7$, $14$, $21$ dniach wraca ten sam dzień tygodnia. Pełne tygodnie pomijamy, liczy się tylko reszta z dzielenia przez $7$.",
        `$${n} : 7 = ${k}$ reszty $${rr}$ (bo $${k} \\cdot 7 = ${k * 7}$).`,
        rr === 0
          ? `Reszta wynosi $0$, więc wracamy do tego samego dnia tygodnia: ${DNI_TYG[cel]}.`
          : `${temu ? "Cofamy się" : "Przesuwamy się"} o $${rr}$ ${lm(rr, DNI_LM)} od dnia „${DNI_TYG[i]}” (dnia startowego nie liczymy): ${droga}. Szukany dzień to ${DNI_TYG[cel]}.`,
      ],
    );
  });
}

function dataPoNDniach(r) {
  return probuj(() => {
    const rok = r.pick([2023, 2024, 2025, 2026, 2027, 2028]);
    const m = r.int(1, 11), d = r.int(1, dniMies(rok, m)), n = r.int(10, 100);
    const w = przesunDate(rok, m, d, n);
    if (!w) return null;
    return zad(
      `Jest ${data(d, m)} roku $${rok}$. Jaka będzie data za $${n}$ dni? Podaj dzień miesiąca oraz numer miesiąca (np. kwiecień ma numer $4$).`,
      [pole("dzien", "Dzień miesiąca"), pole("mies", "Numer miesiąca")], { dzien: q(w.d), mies: q(w.m) }, `${data(w.d, w.m)} (miesiąc nr $${w.m}$)`,
      [
        ...w.kroki,
        `Wychodzi ${data(w.d, w.m)}, czyli dzień miesiąca $${w.d}$ i miesiąc o numerze $${w.m}$.`,
      ],
    );
  });
}

function ileDniMinelo(r) {
  return probuj(() => {
    const wl = r.chance(0.45);
    if (wl) {
      const rok = 2023, m1 = r.int(6, 8), d1 = r.int(1, dniMies(rok, m1) - 1), pr = r.int(6, 20);
      const w = przesunDate(rok, m1, d1, pr);
      if (!w) return null;
      const md = miedzyDatami(rok, m1, d1, w.m, w.d), ile = md.n + 1;
      const co = r.pick([["Obóz sportowy", "trwa", "obóz sportowy"], ["Kolonie letnie", "trwają", "kolonie letnie"], ["Turnus wypoczynkowy", "trwa", "turnus wypoczynkowy"]]);
      return zad(
        `${co[0]} ${co[1]} od ${data(d1, m1)} do ${data(w.d, w.m)} włącznie. Ile dni ${co[1]} ${co[2]}?`,
        [pole("dni", "Liczba dni")], { dni: q(ile) }, jed(ile, lm(ile, DNI_LM)),
        [
          md.tekst.replace(/^Liczymy po miesiącach/, "Najpierw liczymy, ile dni minęło między tymi datami (po miesiącach)"),
          `Słowo „włącznie” znaczy, że liczymy też pierwszy i ostatni dzień, więc dodajemy $1$: $${md.n} + 1 = ${ile}$.`,
        ],
      );
    }
    const rok = r.pick([2023, 2024, 2025]), m1 = r.int(1, 10), d1 = r.int(1, dniMies(rok, m1) - 1);
    const m2 = r.int(m1, Math.min(12, m1 + 2)), d2 = r.int(1, dniMies(rok, m2));
    const md = miedzyDatami(rok, m1, d1, m2, d2);
    if (md.n < 7) return null;
    const kroki = [md.tekst];
    if (md.luty) kroki.unshift(opisLutego(rok));
    return zad(
      `Ile dni minęło od ${data(d1, m1)} do ${data(d2, m2)} roku $${rok}$?`,
      [pole("dni", "Liczba dni")], { dni: q(md.n) }, jed(md.n, lm(md.n, DNI_LM)),
      kroki,
    );
  });
}

function rokPrzestepny(r) {
  return probuj(() => {
    const stulecie = r.chance(0.3);
    const L = stulecie ? r.pick([1600, 2000, 2400]) : r.int(190, 209) * 10 + r.pick([0, 4, 8, 2, 6]);
    if (!przestepny(L)) return null;
    const pulapki = r.shuffle([1800, 1900, 2100, 2200, 2300]).slice(0, r.int(1, 2));
    const bliskie = [L + 1, L + 2, L - 1, L - 2, L + 3, L - 3, L + 6, L - 6].filter((y) => !przestepny(y) && y % 100 !== 0 && y > 1500);
    const zle = [...pulapki.filter((y) => y !== L)];
    for (const y of r.shuffle(bliskie)) if (zle.length < 3 && !zle.includes(y) && y !== L) zle.push(y);
    if (zle.length < 3 || zle.some(przestepny)) return null;
    const opc = (y) => `$${y}$`;
    const m = mieszaj(r, opc(L), zle.map(opc));
    if (!m) return null;
    const powod = (y) => {
      if (y % 100 === 0) return y % 400 === 0
        ? `$${y}$ kończy się na $00$ i dzieli się przez $400$ – jest przestępny`
        : `$${y}$ kończy się na $00$, ale nie dzieli się przez $400$ – jest zwykły`;
      return y % 4 === 0
        ? `w $${y}$ dwie ostatnie cyfry ($${y % 100}$) dzielą się przez $4$ – jest przestępny`
        : `w $${y}$ dwie ostatnie cyfry ($${y % 100}$) nie dzielą się przez $4$ – jest zwykły`;
    };
    return zad(
      "Który z podanych roków jest rokiem przestępnym (ma $366$ dni)?",
      [polew("rok", "Rok przestępny", m.opcje)], { rok: m.ind }, opc(L),
      [
        "Rok jest przestępny, gdy jego numer dzieli się przez $4$. Wyjątek: lata kończące się na $00$ są przestępne tylko wtedy, gdy dzielą się przez $400$.",
        `Sprawdzamy każdy rok: ${m.opcje.map((o) => powod(Number(o.replace(/\$/g, "")))).join("; ")}.`,
        `Rokiem przestępnym jest więc ${opc(L)}.`,
      ],
    );
  });
}

function sumaDniMiesiecy(r) {
  return probuj(() => {
    const ile = r.int(2, 4), m1 = r.int(1, 12 - ile + 1), m2 = m1 + ile - 1;
    const rok = r.pick([2023, 2024, 2025, 2026]);
    const dni = [];
    for (let m = m1; m <= m2; m++) dni.push(dniMies(rok, m));
    const suma = dni.reduce((a, b) => a + b, 0);
    const maLuty = m1 <= 2 && m2 >= 2;
    const kroki = [];
    if (maLuty) kroki.push(opisLutego(rok));
    kroki.push(`Dni w miesiącach: ${wypisz(dni.map((x, k) => `${MIESIACE_NOM[m1 - 1 + k]} $${x}$`))}. Przypomnienie: $31$ dni mają miesiące $1, 3, 5, 7, 8, 10, 12$, a $30$ dni – miesiące $4, 6, 9, 11$.`);
    kroki.push(`Dodajemy: $${dni.join(" + ")} = ${suma}$.`);
    return zad(
      `Ile dni liczy okres od $1$ ${MIESIACE_GEN[m1 - 1]} do $${dni[dni.length - 1]}$ ${MIESIACE_GEN[m2 - 1]}${maLuty ? ` roku $${rok}$` : ""}?`,
      [pole("dni", "Liczba dni")], { dni: q(suma) }, jed(suma, "dni"),
      kroki,
    );
  });
}

function kalendarz(r) {
  const w = r.int(0, 99);
  if (w < 26) return dzienTygodniaPoNDniach(r);
  if (w < 50) return dataPoNDniach(r);
  if (w < 70) return ileDniMinelo(r);
  if (w < 88) return rokPrzestepny(r);
  return sumaDniMiesiecy(r);
}

// --- Lista generatorów

export const GENERATORY = [
  { id: "procent-z-liczby", nazwa: "Procent z liczby", opis: "Obliczanie p% z liczby w pamięci: łatwe procenty, 12,5%, 15%, 35%, 150%, w zadaniach o klasie, cenach, trasie i pojemności (także reszta).", temat: "procent-liczby", generuj: procentZLiczby },
  { id: "jakim-procentem", nazwa: "Jakim procentem jest i wykres kołowy", opis: "Jakim procentem liczby b jest liczba a, kąt wycinka koła i procent, wykres kołowy opisany słowami (procent i liczba osób).", temat: "procent-liczby", generuj: jakimProcentem },
  { id: "calosc-z-czesci", nazwa: "Całość, gdy znamy część i procent", opis: "Liczba, od której liczymy procent: „15% uczniów to 6 osób”, „150% liczby to 60”, także pytanie o resztę.", temat: "liczba-z-procentu", generuj: caloscZCzesci },
  { id: "cena-przed-rabatem", nazwa: "Cena przed rabatem, zaliczka, kieszonkowe", opis: "Cena przed obniżką lub podwyżką, gdy znamy kwotę zmiany, zaliczka jako procent ceny, odłożona część kieszonkowego.", temat: "liczba-z-procentu", generuj: cenaPrzedRabatem },
  { id: "zmiany-cen", nazwa: "Podwyżka, obniżka i dwie zmiany po sobie", opis: "Nowa cena po podwyżce lub obniżce o p%, dwie zmiany pod rząd (procentów się nie dodaje), ile procent ceny początkowej stanowi cena końcowa.", temat: "podwyzki-obnizki", generuj: zmianyCen },
  { id: "cofanie-zmian-i-punkty", nazwa: "Cena przed zmianą, o ile procent, lokata, punkty procentowe", opis: "Cena przed podwyżką lub obniżką, o ile procent zmieniła się wartość, odsetki i stan lokaty na rok, punkty procentowe a procenty.", temat: "podwyzki-obnizki", generuj: cofanieIPunkty },
  { id: "cena-jednostkowa-i-oplacalnosc", nazwa: "Cena za 1 kg i za sztukę, która oferta tańsza", opis: "Cena za kilogram i za sztukę, koszt wybranej masy, porównanie dwóch opakowań, ile sztuk za daną kwotę, ile opakowań trzeba kupić.", temat: "pieniadze", generuj: cenaIOplacalnosc },
  { id: "reszta-i-promocje", nazwa: "Reszta z banknotu i promocje", opis: "Reszta z banknotu po zakupach, trzecia sztuka gratis, druga za pół ceny, średnia cena sztuki w promocji, porównanie promocji.", temat: "pieniadze", generuj: resztaIPromocje },
  { id: "droga-predkosc-czas", nazwa: "Droga, prędkość i czas", opis: "Droga, prędkość lub czas z dwóch pozostałych (minuty jako ułamek godziny), czas w godzinach i minutach, spotkanie i pogoń dwóch pojazdów.", temat: "predkosc", generuj: drogaPredkoscCzas },
  { id: "jednostki-predkosci-i-srednia", nazwa: "km/h i m/s, średnia prędkość", opis: "Zamiana km/h na m/s i odwrotnie, prędkość z metrów i sekund, średnia prędkość na dwóch odcinkach i tam i z powrotem.", temat: "predkosc", generuj: jednostkiPredkosci },
  { id: "jednostki-dlugosc-i-masa", nazwa: "Jednostki długości i masy", opis: "Zamiana mm, cm, dm, m, km oraz g, dag, kg, t, miary złożone (2 m 35 cm), dodawanie miar w różnych jednostkach.", temat: "jednostki", generuj: jednostkiDlugoscMasa },
  { id: "jednostki-pole-i-objetosc", nazwa: "Jednostki pola i objętości, litry", opis: "Zamiana jednostek pola (kwadrat współczynnika) i objętości, litry i mililitry, pojemność prostopadłościanu, wysokość wody, pole działki w arach i hektarach.", temat: "jednostki", generuj: jednostkiPoleObjetosc },
  { id: "skala-odleglosc", nazwa: "Odległość na mapie i w terenie", opis: "Odległość rzeczywista z mapy lub planu, odległość na mapie z rzeczywistej, czas przejścia trasy odczytanej z mapy.", temat: "skala", generuj: skalaOdleglosc },
  { id: "skala-wyznaczanie-i-pole", nazwa: "Wyznaczanie skali, pole w skali, podziałka", opis: "Skala z pary długości, pole rzeczywiste na podstawie planu, skala mianowana i podziałka liniowa, ile razy rośnie pole.", temat: "skala", generuj: skalaPolaIPodzialka },
  { id: "czas-na-zegarze", nazwa: "Czas trwania, godzina końca, minuty", opis: "Czas między dwiema godzinami (także przez północ), godzina zakończenia i rozpoczęcia, zamiana godzin na minuty, dodawanie i odejmowanie czasów.", temat: "czas-kalendarz", generuj: czasNaZegarze },
  { id: "kalendarz", nazwa: "Kalendarz: dni, daty, lata przestępne", opis: "Dzień tygodnia po n dniach, data po n dniach (długości miesięcy), liczba dni między datami, rok przestępny, suma dni w miesiącach.", temat: "czas-kalendarz", generuj: kalendarz },
];
