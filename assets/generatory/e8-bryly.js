// Generatory zadań z działu „Egzamin ósmoklasisty – bryły”: graniastosłupy, ostrosłupy, siatki, pole powierzchni, objętość,
// przekątne i wysokości w bryłach. Zadania ćwiczą dokładnie to, co tłumaczą karty z assets/wzory/e8-bryly.js
// (te same pojęcia: n boków podstawy, ściany, krawędzie i wierzchołki, pasek z czterech kwadratów, które ściany leżą naprzeciw siebie,
// 1 dm³ = 1 l, wysokość ostrosłupa H i wysokość ściany bocznej h, trójki pitagorejskie w ostrosłupach itd.).
// Generatory nie mają rysunków, więc każda bryła i każda siatka jest opisana słowami: ile boków ma podstawa, co leży nad czym, jakie są wymiary.
// W szkole podstawowej są tylko graniastosłupy i ostrosłupy (bez walca, stożka i kuli), więc tylko one występują w zadaniach.
// Kontrakt zadania i narzędzia: zob. wspolne.js. Każdy generator ma pole temat – id tematu z assets/arkusze/tematy.js (dział "e8-bryly").
// Liczby są dobierane tak, żeby wszystko dało się policzyć w pamięci, bez kalkulatora (trójki pitagorejskie, ładne sześciany).
// Pierwiastki pojawiają się tylko tak, że uczeń podaje liczbę przy pierwiastku (współczynnik w $a\sqrt{3}$) albo wynik całkowity.
// Siatki sześcianu: składanie jest naprawdę symulowane (przetaczanie sześcianu po kratkach), więc odpowiedzi „co leży naprzeciw” i „czy się złoży” są pewne.
import { Q, q } from "./wspolne.js";

// --- Drobne pomocnicze (te same co w e8-figury.js i e8-procenty.js)

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

/** Wybiera wariant z wagami: losuj(r, [[waga, funkcja], ...]); funkcja dostaje losownik i zwraca zadanie. */
function losuj(r, warianty) {
  const suma = warianty.reduce((s, [w]) => s + w, 0);
  let x = r.int(0, suma - 1);
  for (const [w, f] of warianty) {
    if (x < w) return f(r);
    x -= w;
  }
  throw new Error("losuj: brak wariantu");
}

const cap =(s) => s[0].toUpperCase() + s.slice(1);

// --- Jednostki: J – do liczby w tekście („$24 \text{ cm}^2$”), jed(J.cm2) – do etykiety pola („$\text{cm}^2$”)

const J = {
  cm: "\\text{ cm}", cm2: "\\text{ cm}^2", cm3: "\\text{ cm}^3",
  dm3: "\\text{ dm}^3", m: "\\text{ m}", m2: "\\text{ m}^2", m3: "\\text{ m}^3", l: "\\text{ l}", ml: "\\text{ ml}",
};
/** Liczba z jednostką w osobnym $…$: u(24, J.cm2) -> "$24 \text{ cm}^2$". */
const u = (x, j) => `$${dz(x)} ${j}$`;
const jed = (j) => j.replace("\\text{ ", "\\text{");
/** Pole odpowiedzi „Pole powierzchni (w cm²)” itp. */
const poleJ = (nazwa, j) => [pole("wynik", `${nazwa} (w $${jed(j)}$)`)];

// --- Nazwy wielokątów i elementów brył

/** p – przymiotnik („graniastosłup sześciokątny”), pg – ten przymiotnik w dopełniaczu, m – wielokąt, d – dopełniacz, dm – dopełniacz liczby mnogiej. */
const W = {
  3: { p: "trójkątny", pg: "trójkątnego", m: "trójkąt", d: "trójkąta", dm: "trójkątów" },
  4: { p: "czworokątny", pg: "czworokątnego", m: "czworokąt", d: "czworokąta", dm: "czworokątów" },
  5: { p: "pięciokątny", pg: "pięciokątnego", m: "pięciokąt", d: "pięciokąta", dm: "pięciokątów" },
  6: { p: "sześciokątny", pg: "sześciokątnego", m: "sześciokąt", d: "sześciokąta", dm: "sześciokątów" },
  7: { p: "siedmiokątny", pg: "siedmiokątnego", m: "siedmiokąt", d: "siedmiokąta", dm: "siedmiokątów" },
  8: { p: "ośmiokątny", pg: "ośmiokątnego", m: "ośmiokąt", d: "ośmiokąta", dm: "ośmiokątów" },
  9: { p: "dziewięciokątny", pg: "dziewięciokątnego", m: "dziewięciokąt", d: "dziewięciokąta", dm: "dziewięciokątów" },
  10: { p: "dziesięciokątny", pg: "dziesięciokątnego", m: "dziesięciokąt", d: "dziesięciokąta", dm: "dziesięciokątów" },
  12: { p: "dwunastokątny", pg: "dwunastokątnego", m: "dwunastokąt", d: "dwunastokąta", dm: "dwunastokątów" },
};
const LICZ_DOP = { 1: "jednego", 2: "dwóch", 3: "trzech", 4: "czterech", 5: "pięciu", 6: "sześciu", 7: "siedmiu", 8: "ośmiu", 9: "dziewięciu", 10: "dziesięciu", 12: "dwunastu" };
const N_PODSTAWY = [3, 4, 5, 6, 7, 8, 9, 10, 12];

const NAZ = {
  scian: ["ściana", "ściany", "ścian"],
  krawedzi: ["krawędź", "krawędzie", "krawędzi"],
  wierzcholkow: ["wierzchołek", "wierzchołki", "wierzchołków"],
  bocznych: ["ściana boczna", "ściany boczne", "ścian bocznych"],
  bokow: ["bok", "boki", "boków"],
};
const PYT = { scian: "ścian", krawedzi: "krawędzi", wierzcholkow: "wierzchołków", bocznych: "ścian bocznych" };
const ETYKIETA = { scian: "Liczba ścian", krawedzi: "Liczba krawędzi", wierzcholkow: "Liczba wierzchołków", bocznych: "Liczba ścian bocznych", bokow: "Liczba boków podstawy" };
/** „15 krawędzi”, „4 wierzchołki”. */
const ile = (k, v) => `${v} ${lm(v, NAZ[k])}`;

const ELEMENTY = {
  graniastoslup: { scian: (n) => n + 2, krawedzi: (n) => 3 * n, wierzcholkow: (n) => 2 * n, bocznych: (n) => n, bokow: (n) => n },
  ostroslup: { scian: (n) => n + 1, krawedzi: (n) => 2 * n, wierzcholkow: (n) => n + 1, bocznych: (n) => n, bokow: (n) => n },
};

/** Skąd się bierze liczba elementów przy danym n (krok rozwiązania). */
const OPIS_ELEM = {
  graniastoslup: {
    scian: (n) => `Ścian jest $n + 2$: $${n}$ bocznych i dwie podstawy, czyli $${n} + 2 = ${n + 2}$.`,
    krawedzi: (n) => `Krawędzi jest $3n$: $${n}$ w dolnej podstawie, $${n}$ w górnej i $${n}$ bocznych, razem $3 \\cdot ${n} = ${3 * n}$.`,
    wierzcholkow: (n) => `Wierzchołków jest $2n$: $${n}$ na dole i $${n}$ na górze, razem $2 \\cdot ${n} = ${2 * n}$.`,
    bocznych: (n) => `Ścian bocznych jest tyle, ile boków ma podstawa, czyli $${n}$.`,
  },
  ostroslup: {
    scian: (n) => `Ścian jest $n + 1$: $${n}$ bocznych i jedna podstawa, czyli $${n} + 1 = ${n + 1}$.`,
    krawedzi: (n) => `Krawędzi jest $2n$: $${n}$ wokół podstawy i $${n}$ biegnących do szczytu, razem $2 \\cdot ${n} = ${2 * n}$.`,
    wierzcholkow: (n) => `Wierzchołków jest $n + 1$: $${n}$ w podstawie i jeden na szczycie, razem $${n} + 1 = ${n + 1}$.`,
    bocznych: (n) => `Ścian bocznych jest tyle, ile boków ma podstawa, czyli $${n}$.`,
  },
};

/** Cofanie się do n z danej liczby elementów. */
const ODWROT_N = {
  graniastoslup: {
    scian: (v) => `Ścian jest $n + 2$, więc $n = ${v} - 2 = ${v - 2}$.`,
    krawedzi: (v) => `Krawędzi jest $3n$, więc $n = ${v} : 3 = ${v / 3}$.`,
    wierzcholkow: (v) => `Wierzchołków jest $2n$, więc $n = ${v} : 2 = ${v / 2}$.`,
    bocznych: (v) => `Ścian bocznych jest tyle, ile boków ma podstawa, więc $n = ${v}$.`,
  },
  ostroslup: {
    scian: (v) => `Ścian jest $n + 1$, więc $n = ${v} - 1 = ${v - 1}$.`,
    krawedzi: (v) => `Krawędzi jest $2n$, więc $n = ${v} : 2 = ${v / 2}$.`,
    wierzcholkow: (v) => `Wierzchołków jest $n + 1$, więc $n = ${v} - 1 = ${v - 1}$.`,
    bocznych: (v) => `Ścian bocznych jest tyle, ile boków ma podstawa, więc $n = ${v}$.`,
  },
};

/** Bryła opisana słowami przez podstawę (mianownik: „graniastosłup sześciokątny”). */
function opisBryly(r, typ, n) {
  const wersje = typ === "graniastoslup"
    ? [`graniastosłup ${W[n].p}`, `graniastosłup, którego podstawą jest ${W[n].m}`, `graniastosłup prosty o podstawie ${W[n].d}`]
    : [`ostrosłup ${W[n].p}`, `ostrosłup, którego podstawą jest ${W[n].m}`, `ostrosłup o podstawie ${W[n].d}`];
  if (typ === "graniastoslup" && n === 4) wersje.push("prostopadłościan");
  if (typ === "ostroslup" && n === 3) wersje.push("czworościan");
  if (typ === "ostroslup" && n === 4) wersje.push("ostrosłup prawidłowy czworokątny");
  return r.pick(wersje);
}

/** Ta sama bryła w dopełniaczu („siatka graniastosłupa sześciokątnego”). */
function opisBrylyD(r, typ, n) {
  const wersje = typ === "graniastoslup"
    ? [`graniastosłupa ${W[n].pg}`, `graniastosłupa, którego podstawą jest ${W[n].m}`]
    : [`ostrosłupa ${W[n].pg}`, `ostrosłupa, którego podstawą jest ${W[n].m}`];
  if (typ === "graniastoslup" && n === 4) wersje.push("prostopadłościanu");
  if (typ === "ostroslup" && n === 3) wersje.push("czworościanu");
  return r.pick(wersje);
}

// --- 1. Graniastosłupy: ściany, krawędzie, wierzchołki (wprost i od końca)

const KL_ELEM = ["scian", "krawedzi", "wierzcholkow", "bocznych"];

/** Wspólne dla graniastosłupów i ostrosłupów: liczba elementów z n albo n (i inna liczba elementów) z podanej liczby elementów. */
function elementyBryly(r, typ) {
  const F = ELEMENTY[typ], nazwa = typ === "graniastoslup" ? "graniastosłup" : "ostrosłup";
  const n = r.pick(N_PODSTAWY);
  if (r.chance(0.42)) {
    const k = r.pick(KL_ELEM), wynik = F[k](n);
    return zad(
      `Ile ${PYT[k]} ma ${opisBryly(r, typ, n)}?`,
      [pole("wynik", ETYKIETA[k])], { wynik }, `$${wynik}$`,
      [
        `Podstawa ma $${n}$ ${lm(n, NAZ.bokow)}, więc $n = ${n}$.`,
        OPIS_ELEM[typ][k](n),
      ],
    );
  }
  const dane = r.pick(KL_ELEM);
  const pytanie = r.pick([...KL_ELEM, "bokow"].filter((x) => x !== dane && !(dane === "bocznych" && x === "bokow")));
  const v = F[dane](n), wynik = F[pytanie](n);
  const zapytaj = pytanie === "bokow" ? `Ile boków ma podstawa tego ${nazwa}a?` : `Ile ${PYT[pytanie]} ma ten ${nazwa}?`;
  return zad(
    `${cap(nazwa)} ma ${ile(dane, v)}. ${zapytaj}`,
    [pole("wynik", ETYKIETA[pytanie])], { wynik }, `$${wynik}$`,
    [
      "Niech $n$ będzie liczbą boków podstawy.",
      ODWROT_N[typ][dane](v),
      pytanie === "bokow" ? `Podstawa ma więc $${n}$ ${lm(n, NAZ.bokow)}.` : OPIS_ELEM[typ][pytanie](n),
    ],
  );
}

const graniastoslupyElementy = (r) => elementyBryly(r, "graniastoslup");

// --- 2. Graniastosłupy: suma długości krawędzi

const POLE_KRAW = () => poleJ("Suma długości krawędzi", J.cm);

function kGrProst(r) {
  const a = r.int(2, 15), b = r.int(2, 15), c = r.int(2, 15), s = a + b + c, S = 4 * s;
  const wym = `${u(a, J.cm)}, ${u(b, J.cm)} i ${u(c, J.cm)}`;
  const tresc = r.pick([
    `Prostopadłościan ma wymiary ${wym}. Jaka jest suma długości wszystkich jego krawędzi?`,
    `Ze sztywnego drutu zrobiono szkielet prostopadłościanu o wymiarach ${wym}. Ile centymetrów drutu zużyto (bez zapasu na łączenia)?`,
  ]);
  return zad(tresc, POLE_KRAW(), { wynik: S }, u(S, J.cm), [
    `Prostopadłościan ma po $4$ krawędzie każdej z trzech długości: $${a}$, $${b}$ i $${c}$ cm.`,
    `Jeden „komplet” trzech różnych krawędzi ma $${a} + ${b} + ${c} = ${s}$ cm.`,
    `Takich kompletów jest $4$, więc suma wynosi $4 \\cdot ${s} = ${S}$ cm.`,
  ]);
}

function kGrSzescian(r) {
  const a = r.int(2, 20), S = 12 * a;
  return zad(
    r.pick([
      `Sześcian ma krawędź długości ${u(a, J.cm)}. Jaka jest suma długości wszystkich jego krawędzi?`,
      `Z drutu robimy szkielet sześcianu o krawędzi ${u(a, J.cm)}. Ile centymetrów drutu potrzeba (bez zapasu na łączenia)?`,
    ]),
    POLE_KRAW(), { wynik: S }, u(S, J.cm),
    [
      "Sześcian ma $12$ krawędzi i wszystkie są jednakowej długości.",
      `Suma długości krawędzi: $12 \\cdot ${a} = ${S}$ cm.`,
    ],
  );
}

function kGrSzescianOdwr(r) {
  const a = r.int(2, 15), S = 12 * a;
  return zad(
    `Do zrobienia szkieletu sześcianu zużyto dokładnie ${u(S, J.cm)} drutu. Ile centymetrów ma krawędź tego sześcianu?`,
    poleJ("Długość krawędzi", J.cm), { wynik: a }, u(a, J.cm),
    [
      "Sześcian ma $12$ krawędzi i wszystkie są jednakowej długości.",
      `Jedna krawędź ma $${S} : 12 = ${a}$ cm.`,
    ],
  );
}

function kGrPrawidlowy(r) {
  const n = r.pick([3, 4, 5, 6, 8]), a = r.int(2, 9), H = r.int(2, 15), dol = 2 * n * a, bok = n * H, S = dol + bok;
  return zad(
    `Prawidłowy graniastosłup ${W[n].p} ma krawędź podstawy ${u(a, J.cm)} i krawędź boczną ${u(H, J.cm)}. Jaka jest suma długości wszystkich krawędzi tego graniastosłupa?`,
    POLE_KRAW(), { wynik: S }, u(S, J.cm),
    [
      `Podstawa ma $${n}$ boków, więc w obu podstawach razem jest $2 \\cdot ${n}$ krawędzi po $${a}$ cm, a krawędzi bocznych jest $${n}$ po $${H}$ cm.`,
      `Krawędzie podstaw: $2 \\cdot ${n} \\cdot ${a} = ${dol}$ cm.`,
      `Krawędzie boczne: $${n} \\cdot ${H} = ${bok}$ cm.`,
      `Razem: $${dol} + ${bok} = ${S}$ cm.`,
    ],
  );
}

function kGrProstOdwr(r) {
  const a = r.int(2, 12), b = r.int(2, 12), c = r.int(2, 12), S = 4 * (a + b + c);
  return zad(
    `Suma długości wszystkich krawędzi prostopadłościanu wynosi ${u(S, J.cm)}. Dwie krawędzie wychodzące z jednego wierzchołka mają ${u(a, J.cm)} i ${u(b, J.cm)}. Ile centymetrów ma trzecia krawędź wychodząca z tego wierzchołka?`,
    poleJ("Długość trzeciej krawędzi", J.cm), { wynik: c }, u(c, J.cm),
    [
      `Prostopadłościan ma po $4$ krawędzie każdej z trzech długości, więc suma trzech różnych krawędzi to $${S} : 4 = ${a + b + c}$ cm.`,
      `Dwie znane krawędzie mają razem $${a} + ${b} = ${a + b}$ cm.`,
      `Trzecia ma $${a + b + c} - ${a + b} = ${c}$ cm.`,
    ],
  );
}

function kGrPrawOdwr(r) {
  const n = r.pick([3, 4, 5, 6, 8]), a = r.int(2, 9), H = r.int(2, 15), S = n * (2 * a + H), dol = 2 * n * a, bok = S - dol;
  return zad(
    `Suma długości wszystkich krawędzi prawidłowego graniastosłupa ${W[n].pg} wynosi ${u(S, J.cm)}, a krawędź podstawy ma ${u(a, J.cm)}. Ile centymetrów ma krawędź boczna tego graniastosłupa?`,
    poleJ("Długość krawędzi bocznej", J.cm), { wynik: H }, u(H, J.cm),
    [
      `W obu podstawach razem jest $2 \\cdot ${n} = ${2 * n}$ krawędzi po $${a}$ cm, czyli $${2 * n} \\cdot ${a} = ${dol}$ cm.`,
      `Na krawędzie boczne zostaje $${S} - ${dol} = ${bok}$ cm.`,
      `Jest ich $${n}$ i są jednakowe, więc jedna ma $${bok} : ${n} = ${H}$ cm.`,
    ],
  );
}

function kGrWszystkieRowne(r) {
  const n = r.pick([3, 4, 5, 6, 8]), a = r.int(2, 9), S = 3 * n * a;
  return zad(
    `Wszystkie krawędzie prawidłowego graniastosłupa ${W[n].pg} mają tę samą długość ${u(a, J.cm)}. Jaka jest suma długości wszystkich krawędzi tego graniastosłupa?`,
    POLE_KRAW(), { wynik: S }, u(S, J.cm),
    [
      `Podstawa ma $${n}$ boków, więc graniastosłup ma $3 \\cdot ${n} = ${3 * n}$ krawędzi.`,
      `Wszystkie mają po $${a}$ cm, więc suma wynosi $${3 * n} \\cdot ${a} = ${S}$ cm.`,
    ],
  );
}

function graniastoslupySuma(r) {
  return losuj(r, [[18, kGrProst], [10, kGrSzescian], [12, kGrSzescianOdwr], [20, kGrPrawidlowy], [14, kGrProstOdwr], [14, kGrPrawOdwr], [12, kGrWszystkieRowne]]);
}

// --- 3. Ostrosłupy: ściany, krawędzie, wierzchołki (wprost, od końca i w porównaniu z graniastosłupem)

function porownanieBryl(r) {
  const n = r.pick([3, 4, 5, 6, 7, 8, 9, 10]), k = r.pick(["krawedzi", "wierzcholkow"]);
  const g = ELEMENTY.graniastoslup[k](n), o = ELEMENTY.ostroslup[k](n), wynik = g - o;
  return zad(
    `Graniastosłup i ostrosłup mają w podstawie ten sam wielokąt: ${W[n].m}. O ile więcej ${PYT[k]} ma graniastosłup niż ostrosłup?`,
    [pole("wynik", `O ile więcej (${PYT[k]})`)], { wynik }, `$${wynik}$`,
    [
      `Podstawa ma $${n}$ boków, więc $n = ${n}$.`,
      k === "krawedzi"
        ? `Graniastosłup ma $3n = 3 \\cdot ${n} = ${g}$ krawędzi, a ostrosłup $2n = 2 \\cdot ${n} = ${o}$ krawędzi.`
        : `Graniastosłup ma $2n = 2 \\cdot ${n} = ${g}$ wierzchołków, a ostrosłup $n + 1 = ${n} + 1 = ${o}$ ${lm(o, NAZ.wierzcholkow)}.`,
      `Różnica: $${g} - ${o} = ${wynik}$.`,
    ],
  );
}

function ostroslupyElementy(r) {
  return losuj(r, [[78, (rr) => elementyBryly(rr, "ostroslup")], [22, porownanieBryl]]);
}

// --- 4. Ostrosłupy: suma długości krawędzi i zdania prawda/fałsz o graniastosłupach i ostrosłupach

/** Najmniejsza całkowita krawędź boczna, przy której prawidłowy ostrosłup o krawędzi podstawy a istnieje (musi być dłuższa od promienia okręgu opisanego na podstawie). */
const minBoczna = (n, a) => (n === 6 ? a + 1 : Math.max(2, Math.ceil(0.9 * a)));

function ostrWprost(r) {
  const n = r.pick([3, 4, 5, 6]), a = r.int(2, 12), b = r.int(minBoczna(n, a), a + 8), S = n * (a + b);
  return zad(
    `Prawidłowy ostrosłup ${W[n].p} ma krawędź podstawy ${u(a, J.cm)} i krawędź boczną ${u(b, J.cm)}. Jaka jest suma długości wszystkich krawędzi tego ostrosłupa?`,
    POLE_KRAW(), { wynik: S }, u(S, J.cm),
    [
      `Podstawa ma $${n}$ boków, więc ostrosłup ma $${n}$ krawędzi podstawy i $${n}$ krawędzi bocznych (po jednej do każdego rogu podstawy).`,
      `Krawędzie podstawy: $${n} \\cdot ${a} = ${n * a}$ cm. Krawędzie boczne: $${n} \\cdot ${b} = ${n * b}$ cm.`,
      `Razem: $${n * a} + ${n * b} = ${S}$ cm.`,
    ],
  );
}

function ostrCzworoscian(r) {
  const a = r.int(2, 15), S = 6 * a;
  if (r.chance(0.5)) {
    return zad(
      `Czworościan foremny ma krawędź długości ${u(a, J.cm)}. Jaka jest suma długości wszystkich jego krawędzi?`,
      POLE_KRAW(), { wynik: S }, u(S, J.cm),
      [
        "Czworościan foremny ma $6$ krawędzi (trzy w podstawie i trzy boczne) i wszystkie są jednakowej długości.",
        `Suma długości krawędzi: $6 \\cdot ${a} = ${S}$ cm.`,
      ],
    );
  }
  return zad(
    `Suma długości wszystkich krawędzi czworościanu foremnego wynosi ${u(S, J.cm)}. Ile centymetrów ma jedna krawędź tego czworościanu?`,
    poleJ("Długość krawędzi", J.cm), { wynik: a }, u(a, J.cm),
    [
      "Czworościan foremny ma $6$ krawędzi i wszystkie są jednakowej długości.",
      `Jedna krawędź ma $${S} : 6 = ${a}$ cm.`,
    ],
  );
}

function ostrOdwrotnie(r) {
  const n = r.pick([3, 4, 5, 6]), a = r.int(2, 12), b = r.int(minBoczna(n, a), a + 8), S = n * (a + b);
  const szukaPodstawy = r.chance(0.5);
  return zad(
    `Suma długości wszystkich krawędzi prawidłowego ostrosłupa ${W[n].pg} wynosi ${u(S, J.cm)}. ${szukaPodstawy
      ? `Krawędź boczna ma ${u(b, J.cm)}. Ile centymetrów ma krawędź podstawy?`
      : `Krawędź podstawy ma ${u(a, J.cm)}. Ile centymetrów ma krawędź boczna?`}`,
    poleJ(szukaPodstawy ? "Długość krawędzi podstawy" : "Długość krawędzi bocznej", J.cm),
    { wynik: szukaPodstawy ? a : b }, u(szukaPodstawy ? a : b, J.cm),
    [
      `Podstawa ma $${n}$ boków, więc jest $${n}$ krawędzi podstawy i $${n}$ krawędzi bocznych. Jedna krawędź podstawy i jedna boczna mają razem $${S} : ${n} = ${a + b}$ cm.`,
      szukaPodstawy
        ? `Krawędź podstawy ma $${a + b} - ${b} = ${a}$ cm.`
        : `Krawędź boczna ma $${a + b} - ${a} = ${b}$ cm.`,
    ],
  );
}

const ZDANIA_BRYLY = [
  { t: "Każdy ostrosłup ma tyle samo ścian co wierzchołków.", ok: true, why: "prawda: ścian jest $n + 1$ i wierzchołków też $n + 1$." },
  { t: "Liczba krawędzi każdego ostrosłupa jest parzysta.", ok: true, why: "prawda: krawędzi jest $2n$, a to liczba parzysta." },
  { t: "Liczba krawędzi każdego graniastosłupa jest podzielna przez 3.", ok: true, why: "prawda: krawędzi jest $3n$." },
  { t: "Graniastosłup trójkątny ma 5 ścian.", ok: true, why: "prawda: $3 + 2 = 5$ (trzy prostokąty i dwa trójkąty)." },
  { t: "Ostrosłup trójkątny ma 4 ściany.", ok: true, why: "prawda: $3 + 1 = 4$ i wszystkie są trójkątami." },
  { t: "Wszystkie ściany boczne ostrosłupa są trójkątami.", ok: true, why: "prawda: każda ściana boczna ma jeden bok w podstawie i wierzchołek na szczycie." },
  { t: "Graniastosłup sześciokątny ma 12 wierzchołków.", ok: true, why: "prawda: $2 \\cdot 6 = 12$." },
  { t: "Ostrosłup sześciokątny ma 12 krawędzi.", ok: true, why: "prawda: $2 \\cdot 6 = 12$ (sześć w podstawie i sześć bocznych)." },
  { t: "Prostopadłościan jest graniastosłupem czworokątnym.", ok: true, why: "prawda: w podstawie ma prostokąt, a ściany boczne są prostokątami." },
  { t: "Graniastosłup ma dwie podstawy, a ostrosłup jedną.", ok: true, why: "prawda: graniastosłup ma górną i dolną podstawę, ostrosłup tylko dolną." },
  { t: "Liczba wierzchołków każdego graniastosłupa jest parzysta.", ok: true, why: "prawda: wierzchołków jest $2n$." },
  { t: "Graniastosłup, który ma 12 krawędzi, ma w podstawie czworokąt.", ok: true, why: "prawda: $3n = 12$, więc $n = 4$." },
  { t: "Ostrosłup, który ma 8 krawędzi, ma w podstawie czworokąt.", ok: true, why: "prawda: $2n = 8$, więc $n = 4$." },
  { t: "Czworościan ma 6 krawędzi.", ok: true, why: "prawda: $2 \\cdot 3 = 6$." },
  { t: "Graniastosłup ma więcej wierzchołków niż ostrosłup o takiej samej podstawie.", ok: true, why: "prawda: $2n$ jest większe od $n + 1$, np. dla $n = 5$ jest $10 > 6$." },
  { t: "Graniastosłup i ostrosłup o takiej samej podstawie mają tyle samo ścian bocznych.", ok: true, why: "prawda: obie bryły mają tyle ścian bocznych, ile boków ma podstawa." },
  { t: "Ostrosłup o podstawie pięciokąta ma 6 wierzchołków.", ok: true, why: "prawda: $5 + 1 = 6$ (pięć w podstawie i jeden na szczycie)." },
  { t: "Sześcian jest graniastosłupem prawidłowym.", ok: true, why: "prawda: jest prosty, a w podstawie ma kwadrat, czyli wielokąt foremny." },
  { t: "Graniastosłup, który ma 18 krawędzi, ma w podstawie sześciokąt.", ok: true, why: "prawda: $3n = 18$, więc $n = 6$." },
  { t: "Ostrosłup sześciokątny ma 7 ścian.", ok: true, why: "prawda: $6 + 1 = 7$ (sześć bocznych i podstawa)." },
  { t: "Ostrosłup czworokątny ma 4 ściany.", ok: false, why: "fałsz: ma $4 + 1 = 5$ ścian (cztery boczne i podstawę)." },
  { t: "Graniastosłup trójkątny ma 6 krawędzi.", ok: false, why: "fałsz: ma $3 \\cdot 3 = 9$ krawędzi (6 to jego liczba wierzchołków)." },
  { t: "Ostrosłup ma tyle samo krawędzi co graniastosłup o takiej samej podstawie.", ok: false, why: "fałsz: ostrosłup ma $2n$, a graniastosłup $3n$ krawędzi." },
  { t: "Ostrosłup sześciokątny ma 18 krawędzi.", ok: false, why: "fałsz: ma $2 \\cdot 6 = 12$ krawędzi (18 krawędzi ma graniastosłup sześciokątny)." },
  { t: "Ściany boczne ostrosłupa są prostokątami.", ok: false, why: "fałsz: są trójkątami (prostokątami są ściany boczne prostego graniastosłupa)." },
  { t: "Graniastosłup pięciokątny ma 10 krawędzi.", ok: false, why: "fałsz: ma $3 \\cdot 5 = 15$ krawędzi (10 to jego liczba wierzchołków)." },
  { t: "Istnieje ostrosłup, który ma 9 krawędzi.", ok: false, why: "fałsz: krawędzi ostrosłupa jest $2n$, więc zawsze jest ich parzysta liczba." },
  { t: "Istnieje graniastosłup, który ma 10 krawędzi.", ok: false, why: "fałsz: krawędzi graniastosłupa jest $3n$, a $10$ nie dzieli się przez $3$." },
  { t: "Istnieje graniastosłup, który ma 11 wierzchołków.", ok: false, why: "fałsz: wierzchołków graniastosłupa jest $2n$, więc zawsze jest ich parzysta liczba." },
  { t: "Ostrosłup ma dwie podstawy.", ok: false, why: "fałsz: ostrosłup ma jedną podstawę, dwie podstawy ma graniastosłup." },
  { t: "Każdy graniastosłup ma 6 ścian.", ok: false, why: "fałsz: ścian jest $n + 2$, a $6$ ścian ma tylko graniastosłup czworokątny." },
  { t: "Czworościan ma 4 krawędzie.", ok: false, why: "fałsz: ma 6 krawędzi (cztery to jego liczba ścian)." },
  { t: "Graniastosłup, który ma 14 wierzchołków, ma w podstawie czternastokąt.", ok: false, why: "fałsz: $2n = 14$, więc $n = 7$ – podstawą jest siedmiokąt." },
  { t: "Ostrosłup ma więcej wierzchołków niż graniastosłup o takiej samej podstawie.", ok: false, why: "fałsz: ostrosłup ma $n + 1$, a graniastosłup $2n$ wierzchołków." },
  { t: "Prostopadłościan nie jest graniastosłupem.", ok: false, why: "fałsz: prostopadłościan jest graniastosłupem czworokątnym." },
  { t: "Ostrosłup o podstawie ośmiokąta ma 8 wierzchołków.", ok: false, why: "fałsz: ma $8 + 1 = 9$ wierzchołków (osiem w podstawie i jeden na szczycie)." },
  { t: "Graniastosłup, który ma 12 wierzchołków, ma w podstawie dwunastokąt.", ok: false, why: "fałsz: $2n = 12$, więc $n = 6$ – podstawą jest sześciokąt." },
  { t: "Graniastosłup sześciokątny ma 6 ścian.", ok: false, why: "fałsz: ma $6 + 2 = 8$ ścian (sześć bocznych i dwie podstawy)." },
  { t: "Ostrosłup, który ma 10 krawędzi, ma w podstawie dziesięciokąt.", ok: false, why: "fałsz: $2n = 10$, więc $n = 5$ – podstawą jest pięciokąt." },
];

/** Jedno zdanie prawdziwe i trzy fałszywe (albo odwrotnie); w rozwiązaniu uzasadnienie każdego zdania. */
function zdaniaWybor(r, BANK, o) {
  return probuj(() => {
    const prawda = r.chance(0.5);
    const wybrane = r.pick(BANK.filter((s) => s.ok === prawda));
    const reszta = r.shuffle(BANK.filter((s) => s.ok !== prawda)).slice(0, 3);
    const m = mieszaj(r, wybrane.t, reszta.map((s) => s.t));
    if (!m) return null;
    const kroki = m.opcje.map((t) => {
      const s = BANK.find((x) => x.t === t);
      return `„${t.replace(/\.$/, "")}” – ${s.why}`;
    });
    return zad(
      `Które z poniższych zdań ${o} jest ${prawda ? "prawdziwe" : "fałszywe"}?`,
      [polew("zdanie", prawda ? "Zdanie prawdziwe" : "Zdanie fałszywe", m.opcje)],
      { zdanie: m.ind },
      wybrane.t,
      kroki,
    );
  });
}

function ostroslupySumaIZdania(r) {
  return losuj(r, [[26, ostrWprost], [12, ostrCzworoscian], [22, ostrOdwrotnie], [40, (rr) => zdaniaWybor(rr, ZDANIA_BRYLY, "o graniastosłupach i ostrosłupach")]]);
}

// --- 5. Siatki sześcianu: kwadraty na kratkach; składanie sprawdzamy, przetaczając sześcian po siatce

const RUCHY = [[1, 0], [-1, 0], [0, 1], [0, -1]]; // współrzędna y rośnie „w górę” (nad = większe y)
const SYMETRIE = [
  ([x, y]) => [x, y], ([x, y]) => [-y, x], ([x, y]) => [-x, -y], ([x, y]) => [y, -x],
  ([x, y]) => [-x, y], ([x, y]) => [x, -y], ([x, y]) => [y, x], ([x, y]) => [-y, -x],
];

/** Przesuwa kratki tak, żeby zaczynały się od (0, 0), i porządkuje je (rzędami od dołu). */
function normuj(kom) {
  const mx = Math.min(...kom.map((c) => c[0])), my = Math.min(...kom.map((c) => c[1]));
  return kom.map(([x, y]) => [x - mx, y - my]).sort((p, s) => p[1] - s[1] || p[0] - s[0]);
}
const klucz = (kom) => normuj(kom).map((c) => c.join(",")).join(";");
/** Ten sam napis dla figur, które różnią się tylko obrotem lub odbiciem. */
const kanon = (kom) => SYMETRIE.map((s) => klucz(kom.map(s))).sort()[0];

/** Wszystkie 35 różnych (z dokładnością do obrotu i odbicia) figur z sześciu kwadratów. */
function szesciokwadraty() {
  let zbior = new Map([[kanon([[0, 0]]), [[0, 0]]]]);
  for (let k = 1; k < 6; k++) {
    const nowy = new Map();
    for (const kom of zbior.values()) {
      for (const [x, y] of kom) {
        for (const [dx, dy] of RUCHY) {
          const c = [x + dx, y + dy];
          if (kom.some((p) => p[0] === c[0] && p[1] === c[1])) continue;
          const wiecej = [...kom, c], kl = kanon(wiecej);
          if (!nowy.has(kl)) nowy.set(kl, normuj(wiecej));
        }
      }
    }
    zbior = nowy;
  }
  return [...zbior.values()];
}

/** Sześcian przetoczony o jedną kratkę: ściany o numerach g – góra, d – dół, n – północ, s – południe, e – wschód, w – zachód. */
function toczenie(o, dx, dy) {
  if (dx === 1) return { g: o.w, d: o.e, n: o.n, s: o.s, e: o.g, w: o.d };
  if (dx === -1) return { g: o.e, d: o.w, n: o.n, s: o.s, e: o.d, w: o.g };
  if (dy === 1) return { g: o.s, d: o.n, n: o.g, s: o.d, e: o.e, w: o.w };
  return { g: o.n, d: o.s, n: o.d, s: o.g, e: o.e, w: o.w };
}

/**
 * Składa siatkę: sześcian stoi na kratce start i toczy się po kolejnych sąsiednich kratkach.
 * Zwraca sciana[i] – numer ściany sześcianu (0–5), na którą trafia kratka i (ściany 2k i 2k+1 leżą naprzeciw siebie),
 * ok – czy każda kratka trafiła na inną ścianę, kolizja – pierwsza para kratek, które lądują na tej samej ścianie.
 */
function sklada(kom, start = 0) {
  const idx = (x, y) => kom.findIndex((c) => c[0] === x && c[1] === y);
  const ori = Array(kom.length).fill(null), sciana = Array(kom.length).fill(-1);
  ori[start] = { g: 0, d: 1, n: 2, s: 3, e: 4, w: 5 };
  sciana[start] = 1;
  const kol = [start];
  while (kol.length) {
    const i = kol.shift();
    for (const [dx, dy] of RUCHY) {
      const j = idx(kom[i][0] + dx, kom[i][1] + dy);
      if (j < 0 || ori[j]) continue;
      ori[j] = toczenie(ori[i], dx, dy);
      sciana[j] = ori[j].d;
      kol.push(j);
    }
  }
  let kolizja = null;
  const pierwszy = new Map();
  sciana.forEach((f, i) => {
    if (pierwszy.has(f)) kolizja ??= [pierwszy.get(f), i];
    else pierwszy.set(f, i);
  });
  return { sciana, ok: !kolizja, kolizja };
}

/** Numery kratek najdłuższego rzędu (poziomego lub pionowego), po kolei. */
function najdluzszyRzad(kom) {
  const idx = (x, y) => kom.findIndex((c) => c[0] === x && c[1] === y);
  let best = [];
  for (const [x, y] of kom) {
    for (const [dx, dy] of [[1, 0], [0, 1]]) {
      if (idx(x - dx, y - dy) >= 0) continue;
      const rzad = [];
      for (let k = 0; idx(x + k * dx, y + k * dy) >= 0; k++) rzad.push(idx(x + k * dx, y + k * dy));
      if (rzad.length > best.length) best = rzad;
    }
  }
  return best;
}

/** Numery czterech kratek tworzących blok 2 × 2 albo null. */
function znajdzBlok(kom) {
  const idx = (x, y) => kom.findIndex((c) => c[0] === x && c[1] === y);
  for (const [x, y] of kom) {
    const ids = [idx(x, y), idx(x + 1, y), idx(x, y + 1), idx(x + 1, y + 1)];
    if (ids.every((i) => i >= 0)) return ids;
  }
  return null;
}

const KATALOG = szesciokwadraty().map((kom) => ({ kom, ...sklada(kom, 0), rzad: najdluzszyRzad(kom).length }));
const SIATKI_INNE = KATALOG.filter((s) => s.ok && s.rzad < 4); // schodki, dwa rzędy po trzy itd.
const SIATKI_OK = KATALOG.filter((s) => s.ok);
const SIATKI_ZLE = KATALOG.filter((s) => !s.ok);

/** Położenie kwadratu względem kwadratu k: „po prawej stronie kwadratu $5$”. */
const GDZIE = (dx, dy, k) => (dx === 1 ? `po prawej stronie kwadratu $${k}$` : dx === -1 ? `po lewej stronie kwadratu $${k}$` : dy === 1 ? `nad kwadratem $${k}$` : `pod kwadratem $${k}$`);

/** Opis siatki zdaniami: od kratki start, każde zdanie mówi, gdzie leży kolejny kwadrat względem już opisanego. */
function zdaniaSiatki(r, kom, et, start) {
  const idx = (x, y) => kom.findIndex((c) => c[0] === x && c[1] === y);
  const odw = new Set([start]), kol = [start], pary = new Set(), zd = [];
  while (kol.length) {
    const i = kol.shift();
    for (const [dx, dy] of r.shuffle(RUCHY)) {
      const j = idx(kom[i][0] + dx, kom[i][1] + dy);
      if (j < 0) continue;
      const kl = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (pary.has(kl)) continue;
      pary.add(kl);
      if (odw.has(j)) {
        zd.push(`Kwadrat $${et[j]}$ styka się bokiem także z kwadratem $${et[i]}$ i leży ${GDZIE(dx, dy, et[i])}.`);
      } else {
        odw.add(j);
        kol.push(j);
        zd.push(`Kwadrat $${et[j]}$ jest doklejony ${GDZIE(dx, dy, et[i])}.`);
      }
    }
  }
  return zd.join(" ");
}

const NAZWY_SCIAN = ["góra", "dno", "tył", "przód", "prawa ściana", "lewa ściana"];
/** Które kwadraty trafiły na które ściany: zapis do rozwiązania. */
function tekstPrzetaczania(et, sciana) {
  const kw = (f) => et[sciana.indexOf(f)];
  const mapa = [1, 0, 3, 2, 5, 4].map((f) => `${NAZWY_SCIAN[f]} – kwadrat $${kw(f)}$`).join(", ");
  const pary = [[1, 0], [3, 2], [5, 4]].map(([f, g]) => `${NAZWY_SCIAN[f]} i ${NAZWY_SCIAN[g]} ($${kw(f)}$ i $${kw(g)}$)`).join(", ");
  return { mapa, pary };
}

/** Numer kwadratu leżącego naprzeciw kwadratu o indeksie ki. */
const naprzeciw = (sciana, et, ki) => et[sciana.findIndex((f, t) => t !== ki && (f >> 1) === (sciana[ki] >> 1))];

const ETYKIETA_NAPRZECIW = "Numer kwadratu leżącego naprzeciw";

/** Siatka z paskiem czterech kwadratów, jednym kwadratem z jednej strony paska i jednym z drugiej. */
function siatkaPasek(r) {
  const poziomo = r.chance(0.5), et = r.shuffle([1, 2, 3, 4, 5, 6]);
  const pasek = et.slice(0, 4), g = et[4], d = et[5], i = r.int(0, 3), j = r.int(0, 3);
  const kom = pasek.map((_, p) => (poziomo ? [p, 0] : [0, 3 - p]));
  kom.push(poziomo ? [i, 1] : [-1, 3 - i], poziomo ? [j, -1] : [1, 3 - j]);
  const etyk = [...pasek, g, d], s = sklada(kom, 0);
  if (!s.ok) throw new Error("siatkaPasek: siatka się nie składa");
  const k = r.pick(etyk), ki = etyk.indexOf(k), x = naprzeciw(s.sciana, etyk, ki);
  const p = pasek.indexOf(k), oczekiwane = p >= 0 ? pasek[(p + 2) % 4] : k === g ? d : g;
  if (x !== oczekiwane) throw new Error("siatkaPasek: złe przeciwległe ściany");
  const lista = pasek.map((n) => `$${n}$`).join(", ");
  const opis = poziomo
    ? `Cztery z nich, o numerach ${lista}, leżą w jednym rzędzie, w tej kolejności od lewej do prawej. Kwadrat $${g}$ jest doklejony nad kwadratem $${pasek[i]}$, a kwadrat $${d}$ – pod kwadratem $${pasek[j]}$.`
    : `Cztery z nich, o numerach ${lista}, leżą w jednej kolumnie, w tej kolejności od góry do dołu. Kwadrat $${g}$ jest doklejony po lewej stronie kwadratu $${pasek[i]}$, a kwadrat $${d}$ – po prawej stronie kwadratu $${pasek[j]}$.`;
  return zad(
    `Siatka sześcianu składa się z sześciu kwadratów o numerach od $1$ do $6$. ${opis} Siatkę złożono w sześcian. Jaki numer ma kwadrat leżący naprzeciw kwadratu $${k}$?`,
    [pole("wynik", ETYKIETA_NAPRZECIW)], { wynik: x }, `$${x}$`,
    [
      `Kwadraty ${lista} tworzą pasek. Po zwinięciu jest to opaska ze ścianami bocznymi. Naprzeciw siebie leżą w niej kwadraty, między którymi jest jeden kwadrat (co drugi): $${pasek[0]}$ i $${pasek[2]}$ oraz $${pasek[1]}$ i $${pasek[3]}$.`,
      `Kwadraty $${g}$ i $${d}$ są doklejone do paska z przeciwnych stron – to dach i podłoga, więc leżą naprzeciw siebie.`,
      `Naprzeciw kwadratu $${k}$ leży więc kwadrat $${x}$.`,
    ],
  );
}

/** Losowo obrócona i odbita siatka z katalogu, losowe numery kwadratów i kwadrat, od którego zaczyna się opis i składanie. */
function przygotujSiatke(r, s) {
  const sym = r.pick(SYMETRIE), kom = normuj(s.kom.map(sym)), et = r.shuffle([1, 2, 3, 4, 5, 6]), start = r.int(0, 5);
  return { kom, et, start, ...sklada(kom, start) };
}

/** Siatka bez paska czterech kwadratów (schodki, dwa rzędy po trzy kwadraty, układ 2-3-1): co leży naprzeciw. */
function siatkaInna(r) {
  const { kom, et, start, sciana, ok } = przygotujSiatke(r, r.pick(SIATKI_INNE));
  if (!ok) throw new Error("siatkaInna: siatka się nie składa");
  const k = r.pick(et), x = naprzeciw(sciana, et, et.indexOf(k)), { mapa, pary } = tekstPrzetaczania(et, sciana);
  return zad(
    `Siatka sześcianu składa się z sześciu kwadratów o numerach od $1$ do $6$, które stykają się całymi bokami. ${zdaniaSiatki(r, kom, et, start)} Siatkę złożono w sześcian. Jaki numer ma kwadrat leżący naprzeciw kwadratu $${k}$?`,
    [pole("wynik", ETYKIETA_NAPRZECIW)], { wynik: x }, `$${x}$`,
    [
      `Złóżmy siatkę w myślach: kwadrat $${et[start]}$ niech będzie dnem sześcianu, a potem przetaczajmy sześcian po kolejnych kwadratach, które się stykają.`,
      `Kwadraty trafiają na różne ściany (nazwy przód, tył, lewa, prawa są tylko umowne): ${mapa}.`,
      `Naprzeciw siebie leżą: ${pary}.`,
      `Naprzeciw kwadratu $${k}$ leży więc kwadrat $${x}$.`,
    ],
  );
}

/** Czy opisana siatka złoży się w sześcian (wśród siatek są prawidłowe, ale i takie z pięcioma w rzędzie czy blokiem 2 × 2). */
function czySieZlozy(r) {
  const chceOk = r.chance(0.5);
  const { kom, et, start, sciana, ok, kolizja } = przygotujSiatke(r, r.pick(chceOk ? SIATKI_OK : SIATKI_ZLE));
  if (ok !== chceOk) throw new Error("czySieZlozy: zła klasyfikacja");
  const rzad = najdluzszyRzad(kom), blok = znajdzBlok(kom), nr = (ids) => ids.map((i) => `$${et[i]}$`);
  let kroki;
  if (ok && rzad.length === 4) {
    const reszta = [0, 1, 2, 3, 4, 5].filter((i) => !rzad.includes(i));
    kroki = [
      `Cztery kwadraty (${nr(rzad).join(", ")}) leżą w jednej linii prostej – to pasek ścian bocznych.`,
      `Pozostałe dwa kwadraty (${nr(reszta).join(" i ")}) są doklejone do paska z przeciwnych stron – to dach i podłoga.`,
      "Każda ściana występuje raz, więc siatka składa się w sześcian.",
    ];
  } else if (ok) {
    const { mapa } = tekstPrzetaczania(et, sciana);
    kroki = [
      "W tej siatce nie ma paska czterech kwadratów, więc sprawdźmy składanie w myślach.",
      `Niech kwadrat $${et[start]}$ będzie dnem, a potem przetaczajmy sześcian po kolejnych kwadratach, które się stykają: ${mapa}.`,
      "Każdy kwadrat trafił na inną ścianę, nic się nie nakłada i niczego nie brakuje, więc siatka składa się w sześcian.",
    ];
  } else if (rzad.length >= 5) {
    kroki = [
      `Pięć kwadratów (${nr(rzad.slice(0, 5)).join(", ")}) leży w jednej linii prostej.`,
      "Pasek z czterech kwadratów obejmuje sześcian dookoła, więc piąty kwadrat wylądowałby na pierwszym.",
      "Siatka nie złoży się w sześcian.",
    ];
  } else if (blok) {
    kroki = [
      `Kwadraty ${nr(blok).join(", ")} tworzą blok $2 \\times 2$.`,
      "Wokół jednego wierzchołka sześcianu schodzą się tylko trzy ściany, więc czwarty kwadrat z bloku wylądowałby na pierwszym.",
      "Siatka nie złoży się w sześcian.",
    ];
  } else {
    kroki = [
      `Złóżmy siatkę w myślach, przetaczając sześcian po kolejnych kwadratach, które się stykają, zaczynając od kwadratu $${et[start]}$.`,
      `Kwadraty $${et[kolizja[0]]}$ i $${et[kolizja[1]]}$ wylądowałyby na tej samej ścianie sześcianu, a jednej ściany by brakowało.`,
      "Siatka nie złoży się w sześcian.",
    ];
  }
  const opcje = ["Tak, siatka złoży się w sześcian", "Nie, siatka nie złoży się w sześcian"];
  return zad(
    `Sześć kwadratów o numerach od $1$ do $6$ ułożono na kratkach tak, że sąsiednie kwadraty stykają się całymi bokami. ${zdaniaSiatki(r, kom, et, start)} Czy z takiej siatki można złożyć sześcian (bez zakładek i bez nakładania się ścian)?`,
    [polew("odp", "Czy siatka złoży się w sześcian?", opcje)], { odp: ok ? 0 : 1 }, opcje[ok ? 0 : 1], kroki,
  );
}

function siatkiSzescian(r) {
  return losuj(r, [[50, siatkaPasek], [22, siatkaInna], [28, czySieZlozy]]);
}

// --- 6. Siatki prostopadłościanów, graniastosłupów i ostrosłupów: ile ścian, jakie kształty, pole siatki

function siatkaIleScian(r) {
  const typ = r.pick(["graniastoslup", "ostroslup"]), n = r.pick(N_PODSTAWY), wynik = ELEMENTY[typ].scian(n);
  return zad(
    `Ile ścian ma siatka ${opisBrylyD(r, typ, n)}?`,
    [pole("wynik", ETYKIETA.scian)], { wynik }, `$${wynik}$`,
    [
      "Siatka ma tyle samo ścian co bryła, z której powstała.",
      `Podstawa ma $${n}$ ${lm(n, NAZ.bokow)}, więc ${typ === "graniastoslup"
        ? `graniastosłup ma $${n}$ ścian bocznych i $2$ podstawy: $${n} + 2 = ${wynik}$`
        : `ostrosłup ma $${n}$ ścian bocznych i $1$ podstawę: $${n} + 1 = ${wynik}$`}.`,
    ],
  );
}

function siatkaKsztalty(r) {
  const w = r.int(0, 3);
  if (w === 0) {
    const n = r.pick([3, 5, 6, 7, 8, 10]);
    return zad(
      `Ile prostokątów ma siatka graniastosłupa prostego, którego podstawą jest ${W[n].m}?`,
      [pole("wynik", "Liczba prostokątów")], { wynik: n }, `$${n}$`,
      [
        "Siatka graniastosłupa to dwie podstawy i pasek ścian bocznych.",
        `Ściany boczne prostego graniastosłupa są prostokątami, a jest ich tyle, ile boków ma podstawa, czyli $${n}$. Podstawy są ${W[n].m}ami, a nie prostokątami.`,
      ],
    );
  }
  if (w === 1) {
    const n = r.pick([3, 5, 6, 7, 8, 10]);
    return zad(
      `Ile ${W[n].dm} ma siatka graniastosłupa prostego, którego podstawą jest ${W[n].m}?`,
      [pole("wynik", `Liczba ${W[n].dm}`)], { wynik: 2 }, "$2$",
      [
        "Siatka graniastosłupa to dwie podstawy i pasek prostokątnych ścian bocznych.",
        `Ściany boczne są prostokątami, więc ${W[n].m}y są tylko w podstawach. Podstawy są dwie, więc takich figur jest $2$.`,
      ],
    );
  }
  if (w === 2) {
    const n = r.pick([3, 4, 5, 6, 7, 8, 9, 10]), wynik = n === 3 ? 4 : n;
    return zad(
      `Ile trójkątów ma siatka ${n === 3 ? "ostrosłupa, którego podstawą jest trójkąt (czworościanu)" : `ostrosłupa, którego podstawą jest ${W[n].m}`}?`,
      [pole("wynik", "Liczba trójkątów")], { wynik }, `$${wynik}$`,
      [
        "Siatka ostrosłupa to podstawa i dookoła niej ściany boczne, które są trójkątami.",
        n === 3
          ? "Podstawa też jest trójkątem, więc wszystkie $3 + 1 = 4$ ściany są trójkątami."
          : `Ścian bocznych jest tyle, ile boków ma podstawa, czyli $${n}$. Podstawa jest ${W[n].m}em, a nie trójkątem, więc trójkątów jest $${n}$.`,
      ],
    );
  }
  const n = r.pick([4, 5, 6, 7, 8, 9, 10]);
  return zad(
    `Ile ${W[n].dm} ma siatka ostrosłupa, którego podstawą jest ${W[n].m}?`,
    [pole("wynik", `Liczba ${W[n].dm}`)], { wynik: 1 }, "$1$",
    [
      "Siatka ostrosłupa to podstawa i dookoła niej ściany boczne, które są trójkątami.",
      `${cap(W[n].m)} jest tylko podstawą, a ostrosłup ma jedną podstawę, więc takiej figury jest $1$.`,
    ],
  );
}

function siatkaOdwrotnie(r) {
  const w = r.int(0, 3);
  if (w <= 1) {
    const typ = w === 0 ? "graniastoslup" : "ostroslup", n = r.pick(N_PODSTAWY), s = ELEMENTY[typ].scian(n);
    const pyt = r.pick(["bokow", "krawedzi", "wierzcholkow"]), nazwa = typ === "graniastoslup" ? "graniastosłup" : "ostrosłup";
    const zapytaj = pyt === "bokow" ? `Ile boków ma podstawa tego ${nazwa}a?` : `Ile ${PYT[pyt]} ma ten ${nazwa}?`;
    return zad(
      `Siatka ${nazwa}a składa się z ${s} ścian. ${zapytaj}`,
      [pole("wynik", ETYKIETA[pyt])], { wynik: ELEMENTY[typ][pyt](n) }, `$${ELEMENTY[typ][pyt](n)}$`,
      [
        "Siatka ma tyle samo ścian co bryła. Niech $n$ będzie liczbą boków podstawy.",
        ODWROT_N[typ].scian(s),
        pyt === "bokow" ? `Podstawa ma więc $${n}$ ${lm(n, NAZ.bokow)}.` : OPIS_ELEM[typ][pyt](n),
      ],
    );
  }
  const pyt = r.pick(["krawedzi", "wierzcholkow"]);
  if (w === 2) {
    const n = r.pick([3, 5, 6, 7, 8, 10]), wynik = ELEMENTY.graniastoslup[pyt](n);
    return zad(
      `Siatka pewnej bryły składa się z dwóch ${W[n].dm} i ${LICZ_DOP[n]} prostokątów. Ile ${PYT[pyt]} ma ta bryła?`,
      [pole("wynik", ETYKIETA[pyt])], { wynik }, `$${wynik}$`,
      [
        `Dwa jednakowe ${W[n].m}y to podstawy, a $${n}$ prostokątów to ściany boczne – to graniastosłup ${W[n].p}, więc $n = ${n}$.`,
        OPIS_ELEM.graniastoslup[pyt](n),
      ],
    );
  }
  const n = r.pick([4, 5, 6, 7, 8, 9, 10]), wynik = ELEMENTY.ostroslup[pyt](n);
  return zad(
    `Siatka pewnej bryły składa się z jednego ${W[n].d} i ${LICZ_DOP[n]} trójkątów. Ile ${PYT[pyt]} ma ta bryła?`,
    [pole("wynik", ETYKIETA[pyt])], { wynik }, `$${wynik}$`,
    [
      `Jedna podstawa (${W[n].m}) i $${n}$ trójkątnych ścian bocznych – to ostrosłup ${W[n].p}, więc $n = ${n}$.`,
      OPIS_ELEM.ostroslup[pyt](n),
    ],
  );
}

function siatkaPole(r) {
  const w = r.int(0, 5);
  if (w === 0) {
    const a = r.int(2, 12), P = 6 * a * a;
    return zad(
      `Siatka sześcianu o krawędzi ${u(a, J.cm)} składa się z sześciu kwadratów. Jakie pole ma ta siatka?`,
      poleJ("Pole siatki", J.cm2), { wynik: P }, u(P, J.cm2),
      [
        `Jeden kwadrat ma pole $${a} \\cdot ${a} = ${a * a}${J.cm2}$.`,
        `Sześć kwadratów ma pole $6 \\cdot ${a * a} = ${P}${J.cm2}$ (tyle samo co pole powierzchni sześcianu).`,
      ],
    );
  }
  if (w === 1) {
    const a = r.int(2, 6), P = 6 * a * a;
    return zad(
      `Pole siatki sześcianu wynosi ${u(P, J.cm2)}. Ile centymetrów ma krawędź tego sześcianu?`,
      poleJ("Długość krawędzi", J.cm), { wynik: a }, u(a, J.cm),
      [
        "Siatka sześcianu to sześć jednakowych kwadratów, a jej pole jest równe polu powierzchni sześcianu.",
        `Jeden kwadrat ma pole $${P} : 6 = ${a * a}${J.cm2}$, więc jego bok ma $${a}$ cm.`,
      ],
    );
  }
  if (w === 2) {
    const a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9), s = a * b + a * c + b * c, P = 2 * s;
    return zad(
      `Siatka prostopadłościanu o wymiarach ${u(a, J.cm)}, ${u(b, J.cm)} i ${u(c, J.cm)} składa się z sześciu prostokątów: po dwa o wymiarach $${a} \\times ${b}$, $${a} \\times ${c}$ i $${b} \\times ${c}$ (w centymetrach). Jakie pole ma ta siatka?`,
      poleJ("Pole siatki", J.cm2), { wynik: P }, u(P, J.cm2),
      [
        `Pola trzech różnych prostokątów: $${a} \\cdot ${b} = ${a * b}$, $${a} \\cdot ${c} = ${a * c}$ i $${b} \\cdot ${c} = ${b * c}$.`,
        `Razem: $${a * b} + ${a * c} + ${b * c} = ${s}$.`,
        `Każdy prostokąt występuje dwa razy, więc pole siatki to $2 \\cdot ${s} = ${P}${J.cm2}$.`,
      ],
    );
  }
  if (w === 3) {
    const a = r.int(2, 9), H = r.int(2, 12), pasek = 4 * a * H, P = pasek + 2 * a * a;
    return zad(
      `Siatka prawidłowego graniastosłupa czworokątnego składa się z paska czterech prostokątów o wymiarach ${u(a, J.cm)} na ${u(H, J.cm)} i dwóch kwadratów o boku ${u(a, J.cm)}. Jakie pole ma ta siatka?`,
      poleJ("Pole siatki", J.cm2), { wynik: P }, u(P, J.cm2),
      [
        `Pasek: $4 \\cdot ${a} \\cdot ${H} = ${pasek}${J.cm2}$.`,
        `Dwa kwadraty: $2 \\cdot ${a} \\cdot ${a} = ${2 * a * a}${J.cm2}$.`,
        `Razem: $${pasek} + ${2 * a * a} = ${P}${J.cm2}$.`,
      ],
    );
  }
  return probuj(() => {
    const a = r.int(2, 14), h = r.int(Math.floor(a / 2) + 1, a + 8);
    if ((a * h) % 2) return null;
    const trojkat = (a * h) / 2, P = a * a + 4 * trojkat;
    return zad(
      w === 4
        ? `Siatka ostrosłupa prawidłowego czworokątnego składa się z kwadratu o boku ${u(a, J.cm)} i czterech jednakowych trójkątów, z których każdy ma podstawę ${u(a, J.cm)} i wysokość ${u(h, J.cm)}. Jakie pole ma ta siatka?`
        : `Z kartonu wycięto siatkę ostrosłupa prawidłowego czworokątnego: kwadrat o boku ${u(a, J.cm)} i cztery jednakowe trójkąty, każdy o podstawie ${u(a, J.cm)} i wysokości ${u(h, J.cm)}. Ile centymetrów kwadratowych kartonu zużyto (bez zakładek)?`,
      poleJ("Pole siatki", J.cm2), { wynik: P }, u(P, J.cm2),
      [
        `Kwadrat: $${a} \\cdot ${a} = ${a * a}${J.cm2}$.`,
        `Jeden trójkąt: $\\frac{${a} \\cdot ${h}}{2} = ${trojkat}${J.cm2}$, czyli cztery trójkąty to $4 \\cdot ${trojkat} = ${4 * trojkat}${J.cm2}$.`,
        `Razem: $${a * a} + ${4 * trojkat} = ${P}${J.cm2}$.`,
      ],
    );
  });
}

function siatkaPasekBoczny(r) {
  return probuj(() => {
    const n = r.pick([3, 4, 5, 6, 8]), a = r.int(2, 9), H = r.int(2, 24), O = n * a;
    if (O === H) return null;
    const dl = Math.max(O, H);
    return zad(
      `Ściany boczne prawidłowego graniastosłupa ${W[n].pg} o krawędzi podstawy ${u(a, J.cm)} i wysokości ${u(H, J.cm)} tworzą na siatce jeden prostokąt (pasek). Ile centymetrów ma dłuższy bok tego prostokąta?`,
      poleJ("Dłuższy bok paska", J.cm), { wynik: dl }, u(dl, J.cm),
      [
        "Pasek ścian bocznych ma wysokość równą wysokości graniastosłupa, a długość równą obwodowi podstawy.",
        `Obwód podstawy: $${n} \\cdot ${a} = ${O}$ cm. Wysokość: $${H}$ cm.`,
        `Dłuższy bok paska ma $${dl}$ cm.`,
      ],
    );
  });
}

function siatkiIlosciIPole(r) {
  return losuj(r, [[14, siatkaIleScian], [20, siatkaKsztalty], [22, siatkaOdwrotnie], [34, siatkaPole], [10, siatkaPasekBoczny]]);
}

// --- 7. Pole powierzchni: sześcian, prostopadłościan, pudełko bez wieczka, malowanie pokoju

const POLE_POW = () => poleJ("Pole powierzchni", J.cm2);

function pSzescian(r) {
  const a = r.int(2, 14), P = 6 * a * a;
  return zad(
    r.pick([
      `Sześcian ma krawędź długości ${u(a, J.cm)}. Jakie jest pole powierzchni całkowitej tego sześcianu?`,
      `Sześcienne pudełko o krawędzi ${u(a, J.cm)} trzeba dokładnie okleić kolorowym papierem. Ile centymetrów kwadratowych papieru potrzeba (bez zakładek)?`,
    ]),
    POLE_POW(), { wynik: P }, u(P, J.cm2),
    [
      "Sześcian ma $6$ jednakowych ścian i każda jest kwadratem.",
      `Pole jednej ściany: $${a} \\cdot ${a} = ${a * a}${J.cm2}$.`,
      `Pole całej powierzchni: $6 \\cdot ${a * a} = ${P}${J.cm2}$.`,
    ],
  );
}

function pSzescianOdwr(r) {
  const a = r.int(2, 12), P = 6 * a * a;
  return zad(
    `Pole powierzchni całkowitej sześcianu wynosi ${u(P, J.cm2)}. Jaką długość ma krawędź tego sześcianu?`,
    poleJ("Długość krawędzi", J.cm), { wynik: a }, u(a, J.cm),
    [
      `Sześcian ma $6$ jednakowych ścian, więc pole jednej ściany to $${P} : 6 = ${a * a}${J.cm2}$.`,
      `Ściana jest kwadratem, więc szukamy liczby, która pomnożona przez siebie daje $${a * a}$: $${a} \\cdot ${a} = ${a * a}$.`,
      `Krawędź ma $${a}$ cm.`,
    ],
  );
}

function pProstopadloscian(r) {
  const a = r.int(2, 12), b = r.int(2, 12), c = r.int(2, 12), x = a * b, y = a * c, z = b * c, s = x + y + z, P = 2 * s;
  return zad(
    `Prostopadłościan ma wymiary ${u(a, J.cm)}, ${u(b, J.cm)} i ${u(c, J.cm)}. Jakie jest pole powierzchni całkowitej tego prostopadłościanu?`,
    POLE_POW(), { wynik: P }, u(P, J.cm2),
    [
      "Ściany tworzą trzy pary jednakowych prostokątów.",
      `Pola trzech różnych ścian: $${a} \\cdot ${b} = ${x}$, $${a} \\cdot ${c} = ${y}$ i $${b} \\cdot ${c} = ${z}$.`,
      `Razem: $${x} + ${y} + ${z} = ${s}$.`,
      `Każda ściana występuje dwa razy, więc $P_c = 2 \\cdot ${s} = ${P}${J.cm2}$.`,
    ],
  );
}

function pBezWieczka(r) {
  const a = r.int(4, 30), b = r.int(3, 24), c = r.int(2, 20), dno = a * b, d1 = 2 * a * c, d2 = 2 * b * c, P = dno + d1 + d2;
  const tresc = r.pick([
    `Pudełko w kształcie prostopadłościanu ma dno o wymiarach ${u(a, J.cm)} na ${u(b, J.cm)} i wysokość ${u(c, J.cm)}, ale nie ma wieczka. Ile centymetrów kwadratowych kartonu potrzeba na takie pudełko (pomiń zakładki)?`,
    `Skrzynka bez pokrywy ma kształt prostopadłościanu o wymiarach ${u(a, J.cm)}, ${u(b, J.cm)} i ${u(c, J.cm)} (wysokość skrzynki to ${u(c, J.cm)}). Ile centymetrów kwadratowych blachy zużyto na jej wykonanie?`,
  ]);
  return zad(tresc, poleJ("Pole", J.cm2), { wynik: P }, u(P, J.cm2), [
    `Brakuje jednej ściany – górnej. Zostaje dno i cztery ściany boczne.`,
    `Dno: $${a} \\cdot ${b} = ${dno}${J.cm2}$.`,
    `Dwie ściany o wymiarach $${a}$ i $${c}$: $2 \\cdot ${a} \\cdot ${c} = ${d1}${J.cm2}$. Dwie o wymiarach $${b}$ i $${c}$: $2 \\cdot ${b} \\cdot ${c} = ${d2}${J.cm2}$.`,
    `Razem: $${dno} + ${d1} + ${d2} = ${P}${J.cm2}$.`,
  ]);
}

function pWysokoscZPola(r) {
  const a = r.int(2, 10), b = r.int(2, 10), c = r.int(2, 12), P = 2 * (a * b + a * c + b * c), pod = 2 * a * b, bok = P - pod, O = 2 * (a + b);
  return zad(
    `Prostopadłościan ma w podstawie prostokąt o bokach ${u(a, J.cm)} i ${u(b, J.cm)}. Pole powierzchni całkowitej tego prostopadłościanu wynosi ${u(P, J.cm2)}. Ile centymetrów ma wysokość prostopadłościanu?`,
    poleJ("Wysokość", J.cm), { wynik: c }, u(c, J.cm),
    [
      `Dwie podstawy mają razem $2 \\cdot ${a} \\cdot ${b} = ${pod}${J.cm2}$.`,
      `Na cztery ściany boczne zostaje $${P} - ${pod} = ${bok}${J.cm2}$.`,
      `Ściany boczne tworzą pas o długości równej obwodowi podstawy $2 \\cdot (${a} + ${b}) = ${O}$ cm, więc wysokość to $${bok} : ${O} = ${c}$ cm.`,
    ],
  );
}

function pPokoj(r) {
  return probuj(() => {
    const L = r.int(3, 8), S = r.int(3, 6), H = r.pick([3, 3, 4]), okno = r.pick([1, 2, 3]), drzwi = 2;
    const sciany = 2 * (L + S) * H, sufit = r.chance(0.5), calosc = sciany + (sufit ? L * S : 0), P = calosc - okno - drzwi;
    const litry = r.chance(0.45), wyd = r.pick([4, 5, 6, 8, 10]);
    if (litry && P % wyd) return null;
    const co = sufit ? "ściany i sufit (podłogi nie malujemy)" : "same ściany";
    const odejmij = `Okno (${u(okno, J.m2)}) i drzwi (${u(drzwi, J.m2)}) nie są malowane.`;
    const wymiary = `Pokój ma kształt prostopadłościanu: podłoga ${u(L, J.m)} na ${u(S, J.m)}, wysokość ${u(H, J.m)}.`;
    const kroki = [
      `Cztery ściany tworzą pas o długości równej obwodowi podłogi: $2 \\cdot (${L} + ${S}) \\cdot ${H} = ${sciany}${J.m2}$.`,
      sufit ? `Sufit: $${L} \\cdot ${S} = ${L * S}${J.m2}$, więc razem ze ścianami jest $${sciany} + ${L * S} = ${calosc}${J.m2}$.` : `Same ściany mają $${calosc}${J.m2}$.`,
      `Odejmujemy okno i drzwi: $${calosc} - ${okno} - ${drzwi} = ${P}${J.m2}$.`,
    ];
    if (!litry) {
      return zad(`${wymiary} Malujemy ${co}. ${odejmij} Ile metrów kwadratowych trzeba pomalować?`, poleJ("Powierzchnia do pomalowania", J.m2), { wynik: P }, u(P, J.m2), kroki);
    }
    return zad(
      `${wymiary} Malujemy ${co}. ${odejmij} Jeden litr farby wystarcza na ${u(wyd, J.m2)}. Ile litrów farby trzeba kupić?`,
      [pole("wynik", "Liczba litrów farby")], { wynik: P / wyd }, u(P / wyd, J.l),
      [...kroki, `Litrów farby: $${P} : ${wyd} = ${P / wyd}$.`],
    );
  });
}

function pSkalaPola(r) {
  if (r.chance(0.5)) {
    const k = r.pick([2, 3, 4, 5, 10]);
    return zad(
      `Krawędź sześcianu zwiększono ${k} ${lm(k, ["raz", "razy", "razy"])}. Ile razy większe stało się pole powierzchni tego sześcianu?`,
      [pole("wynik", "Ile razy większe")], { wynik: k * k }, `$${k * k}$`,
      [
        "Pole powierzchni sześcianu to $6a^2$, czyli zależy od kwadratu krawędzi.",
        `Dla krawędzi $${k}a$ pole wynosi $6 \\cdot (${k}a)^2 = 6 \\cdot ${k * k}a^2 = ${k * k} \\cdot 6a^2$.`,
        `Pole jest więc $${k * k}$ razy większe.`,
      ],
    );
  }
  const a = r.int(1, 5), k = r.pick([2, 3, 4]), P0 = 6 * a * a, P = P0 * k * k;
  return zad(
    `Pole powierzchni sześcianu wynosi ${u(P0, J.cm2)}. Jakie będzie pole powierzchni sześcianu, którego krawędź jest ${k} razy dłuższa?`,
    POLE_POW(), { wynik: P }, u(P, J.cm2),
    [
      `Gdy krawędzie są $${k}$ razy dłuższe, pole powierzchni rośnie $${k}^2 = ${k * k}$ razy.`,
      `Nowe pole: $${k * k} \\cdot ${P0} = ${P}${J.cm2}$.`,
    ],
  );
}

function pBezPokrywy(r) {
  const a = r.int(2, 40), P = 5 * a * a;
  return zad(
    `Sześcienne pudełko o krawędzi ${u(a, J.cm)} nie ma wieczka. Ile centymetrów kwadratowych kartonu zużyto na to pudełko (pomiń zakładki)?`,
    poleJ("Pole", J.cm2), { wynik: P }, u(P, J.cm2),
    [
      "Sześcian ma $6$ jednakowych ścian, ale bez wieczka zostaje ich $5$.",
      `Pole jednej ściany: $${a} \\cdot ${a} = ${a * a}${J.cm2}$.`,
      `Pole pudełka: $5 \\cdot ${a * a} = ${P}${J.cm2}$.`,
    ],
  );
}

function poleSzescianProstopadloscian(r) {
  return losuj(r, [[14, pSzescian], [10, pSzescianOdwr], [20, pProstopadloscian], [16, pBezWieczka], [12, pWysokoscZPola], [14, pPokoj], [8, pSkalaPola], [6, pBezPokrywy]]);
}

// --- 8. Pole powierzchni graniastosłupów prostych i ostrosłupów prawidłowych czworokątnych

const TROJKI = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [15, 20, 25], [10, 24, 26], [18, 24, 30], [20, 21, 29]];
/** Romby: [przekątna, przekątna, bok] (połowy przekątnych i bok tworzą trójkąt pitagorejski). */
const ROMBY = [[6, 8, 5], [12, 16, 10], [10, 24, 13], [16, 30, 17], [18, 24, 15]];

function gTrojkatProstokatny(r) {
  const [x, y, z] = r.pick(TROJKI.slice(0, 6)), H = r.int(3, 15), Pp = (x * y) / 2, O = x + y + z, Pb = O * H, P = 2 * Pp + Pb;
  return zad(
    `Podstawą graniastosłupa prostego jest trójkąt prostokątny o bokach ${u(x, J.cm)}, ${u(y, J.cm)} i ${u(z, J.cm)}. Wysokość graniastosłupa wynosi ${u(H, J.cm)}. Oblicz pole powierzchni całkowitej tego graniastosłupa.`,
    POLE_POW(), { wynik: P }, u(P, J.cm2),
    [
      `Pole podstawy (przyprostokątne $${x}$ i $${y}$): $\\frac{${x} \\cdot ${y}}{2} = ${Pp}${J.cm2}$.`,
      `Obwód podstawy: $${x} + ${y} + ${z} = ${O}$ cm.`,
      `Pole boczne: $${O} \\cdot ${H} = ${Pb}${J.cm2}$.`,
      `Pole całkowite: $2 \\cdot ${Pp} + ${Pb} = ${P}${J.cm2}$.`,
    ],
  );
}

function gPoleIObwod(r) {
  let Pp, Op;
  if (r.chance(0.5)) {
    const [x, y, z] = r.pick(TROJKI.slice(0, 6));
    Pp = (x * y) / 2; Op = x + y + z;
  } else {
    const a = r.int(3, 12), b = r.int(2, 10);
    Pp = a * b; Op = 2 * (a + b);
  }
  const H = r.int(3, 12), Pb = Op * H, P = 2 * Pp + Pb;
  return zad(
    `Podstawą graniastosłupa prostego jest wielokąt o polu ${u(Pp, J.cm2)} i obwodzie ${u(Op, J.cm)}. Wysokość graniastosłupa wynosi ${u(H, J.cm)}. Oblicz pole powierzchni całkowitej tego graniastosłupa.`,
    POLE_POW(), { wynik: P }, u(P, J.cm2),
    [
      "Pole boczne prostego graniastosłupa to obwód podstawy razy wysokość.",
      `Pole boczne: $${Op} \\cdot ${H} = ${Pb}${J.cm2}$.`,
      `Są dwie podstawy, więc pole całkowite: $2 \\cdot ${Pp} + ${Pb} = ${P}${J.cm2}$.`,
    ],
  );
}

function gPrawidlowyCzworokatny(r) {
  const a = r.int(2, 12), H = r.int(2, 15), Pp = a * a, Pb = 4 * a * H, P = 2 * Pp + Pb;
  return zad(
    `Prawidłowy graniastosłup czworokątny ma krawędź podstawy ${u(a, J.cm)} i wysokość ${u(H, J.cm)}. Oblicz pole powierzchni całkowitej tego graniastosłupa.`,
    POLE_POW(), { wynik: P }, u(P, J.cm2),
    [
      `Podstawa jest kwadratem, więc jej pole to $${a} \\cdot ${a} = ${Pp}${J.cm2}$.`,
      `Cztery ściany boczne to prostokąty $${a} \\times ${H}$: $4 \\cdot ${a} \\cdot ${H} = ${Pb}${J.cm2}$.`,
      `Pole całkowite: $2 \\cdot ${Pp} + ${Pb} = ${P}${J.cm2}$.`,
    ],
  );
}

function gRomb(r) {
  const [e, f, s] = r.pick(ROMBY), H = r.int(3, 12), Pp = (e * f) / 2, Op = 4 * s, Pb = Op * H, P = 2 * Pp + Pb;
  return zad(
    `Podstawą graniastosłupa prostego jest romb o przekątnych długości ${u(e, J.cm)} i ${u(f, J.cm)} oraz o boku ${u(s, J.cm)}. Wysokość graniastosłupa wynosi ${u(H, J.cm)}. Oblicz pole powierzchni całkowitej tego graniastosłupa.`,
    POLE_POW(), { wynik: P }, u(P, J.cm2),
    [
      `Pole rombu: $\\frac{${e} \\cdot ${f}}{2} = ${Pp}${J.cm2}$. Obwód rombu: $4 \\cdot ${s} = ${Op}$ cm.`,
      `Pole boczne: $${Op} \\cdot ${H} = ${Pb}${J.cm2}$.`,
      `Pole całkowite: $2 \\cdot ${Pp} + ${Pb} = ${P}${J.cm2}$.`,
    ],
  );
}

function oPyramidaWysokoscSciany(r) {
  const a = r.int(2, 14), h = r.int(Math.floor(a / 2) + 1, a + 8), Pp = a * a, Pb = 2 * a * h, P = Pp + Pb;
  return zad(
    `Prawidłowy ostrosłup czworokątny ma krawędź podstawy ${u(a, J.cm)}, a wysokość jego ściany bocznej (poprowadzona z wierzchołka ostrosłupa do środka krawędzi podstawy) ma ${u(h, J.cm)}. Oblicz pole powierzchni całkowitej tego ostrosłupa.`,
    POLE_POW(), { wynik: P }, u(P, J.cm2),
    [
      `Podstawa jest kwadratem: $${a} \\cdot ${a} = ${Pp}${J.cm2}$.`,
      `Ściana boczna jest trójkątem o podstawie $${a}$ i wysokości $${h}$, a ścian jest cztery: $4 \\cdot \\frac{${a} \\cdot ${h}}{2} = ${Pb}${J.cm2}$.`,
      `Pole całkowite: $${Pp} + ${Pb} = ${P}${J.cm2}$.`,
    ],
  );
}

function oPyramidaPoleSciany(r) {
  return probuj(() => {
    const a = r.int(2, 14), h = r.int(Math.floor(a / 2) + 1, a + 8);
    if ((a * h) % 2) return null;
    const sc = (a * h) / 2, Pp = a * a, P = Pp + 4 * sc;
    return zad(
      `Prawidłowy ostrosłup czworokątny ma krawędź podstawy ${u(a, J.cm)}, a pole jednej ściany bocznej wynosi ${u(sc, J.cm2)}. Oblicz pole powierzchni całkowitej tego ostrosłupa.`,
      POLE_POW(), { wynik: P }, u(P, J.cm2),
      [
        `Wszystkie cztery ściany boczne są jednakowe, więc pole boczne to $4 \\cdot ${sc} = ${4 * sc}${J.cm2}$.`,
        `Podstawa jest kwadratem: $${a} \\cdot ${a} = ${Pp}${J.cm2}$.`,
        `Pole całkowite: $${Pp} + ${4 * sc} = ${P}${J.cm2}$.`,
      ],
    );
  });
}

function gOdwrotnie(r) {
  const a = r.int(2, 12), H = r.int(2, 12), Pb = 4 * a * H, P = 2 * a * a + Pb;
  return zad(
    `Pole powierzchni bocznej prawidłowego graniastosłupa czworokątnego wynosi ${u(Pb, J.cm2)}, a jego wysokość ma ${u(H, J.cm)}. Oblicz pole powierzchni całkowitej tego graniastosłupa.`,
    POLE_POW(), { wynik: P }, u(P, J.cm2),
    [
      `Cztery ściany boczne tworzą pas o wysokości $${H}$ cm, więc długość pasa (obwód podstawy) to $${Pb} : ${H} = ${4 * a}$ cm.`,
      `Podstawa jest kwadratem o boku $${4 * a} : 4 = ${a}$ cm, więc jej pole to $${a} \\cdot ${a} = ${a * a}${J.cm2}$.`,
      `Pole całkowite: $2 \\cdot ${a * a} + ${Pb} = ${P}${J.cm2}$.`,
    ],
  );
}

function poleGraniastoslupOstroslup(r) {
  return losuj(r, [[16, gTrojkatProstokatny], [14, gPoleIObwod], [14, gPrawidlowyCzworokatny], [12, gRomb], [16, oPyramidaWysokoscSciany], [12, oPyramidaPoleSciany], [16, gOdwrotnie]]);
}

// --- 9. Objętość: wzory na sześcian, prostopadłościan, graniastosłup i ostrosłup (wprost i od końca)

const OBJ = () => poleJ("Objętość", J.cm3);

function oSzescian(r) {
  const a = r.int(2, 12), V = a ** 3;
  return zad(
    `Sześcian ma krawędź długości ${u(a, J.cm)}. Jaka jest objętość tego sześcianu?`,
    OBJ(), { wynik: V }, u(V, J.cm3),
    [
      "Objętość sześcianu to krawędź podniesiona do trzeciej potęgi: $V = a \\cdot a \\cdot a$.",
      `Najpierw $${a} \\cdot ${a} = ${a * a}$, potem $${a * a} \\cdot ${a} = ${V}$.`,
      `Objętość wynosi $${V}${J.cm3}$.`,
    ],
  );
}

function oSzescianOdwr(r) {
  const a = r.int(2, 10), V = a ** 3;
  return zad(
    `Objętość sześcianu wynosi ${u(V, J.cm3)}. Ile centymetrów ma krawędź tego sześcianu?`,
    poleJ("Długość krawędzi", J.cm), { wynik: a }, u(a, J.cm),
    [
      `Szukamy liczby $a$, dla której $a \\cdot a \\cdot a = ${V}$.`,
      `Sprawdzamy: $${a} \\cdot ${a} \\cdot ${a} = ${a * a} \\cdot ${a} = ${V}$.`,
      `Krawędź ma $${a}$ cm.`,
    ],
  );
}

function oProstopadloscian(r) {
  const a = r.int(2, 15), b = r.int(2, 12), c = r.int(2, 12), Pd = a * b, V = Pd * c;
  return zad(
    `Prostopadłościan ma wymiary ${u(a, J.cm)}, ${u(b, J.cm)} i ${u(c, J.cm)}. Jaka jest objętość tego prostopadłościanu?`,
    OBJ(), { wynik: V }, u(V, J.cm3),
    [
      `Na dnie mieści się jedna warstwa kostek $1 \\times 1 \\times 1$: $${a} \\cdot ${b} = ${Pd}$ kostek.`,
      `Warstw jest $${c}$, więc $V = ${Pd} \\cdot ${c} = ${V}${J.cm3}$.`,
    ],
  );
}

function oProstopadloscianOdwr(r) {
  const a = r.int(2, 12), b = r.int(2, 12), c = r.int(2, 12), Pd = a * b, V = Pd * c;
  return zad(
    `Objętość prostopadłościanu wynosi ${u(V, J.cm3)}. Podstawa jest prostokątem o bokach ${u(a, J.cm)} i ${u(b, J.cm)}. Ile centymetrów ma wysokość tego prostopadłościanu?`,
    poleJ("Wysokość", J.cm), { wynik: c }, u(c, J.cm),
    [
      `Pole podstawy: $${a} \\cdot ${b} = ${Pd}${J.cm2}$.`,
      `Objętość to pole podstawy razy wysokość, więc wysokość to $${V} : ${Pd} = ${c}$ cm.`,
    ],
  );
}

function oGraniastoslupPolePodstawy(r) {
  const Pp = r.int(5, 40), H = r.int(2, 14), V = Pp * H;
  return zad(
    `Pole podstawy graniastosłupa prostego wynosi ${u(Pp, J.cm2)}, a wysokość graniastosłupa ${u(H, J.cm)}. Jaka jest objętość tego graniastosłupa?`,
    OBJ(), { wynik: V }, u(V, J.cm3),
    [
      "Objętość graniastosłupa to pole podstawy razy wysokość: $V = P_p \\cdot H$.",
      `$V = ${Pp} \\cdot ${H} = ${V}${J.cm3}$.`,
    ],
  );
}

function oGraniastoslupTrojkat(r) {
  return probuj(() => {
    const b = r.int(3, 14), ht = r.int(2, 12), H = r.int(3, 15);
    if ((b * ht) % 2) return null;
    const Pp = (b * ht) / 2, V = Pp * H;
    return zad(
      `Podstawą graniastosłupa prostego jest trójkąt o boku ${u(b, J.cm)} i wysokości ${u(ht, J.cm)} opuszczonej na ten bok. Wysokość graniastosłupa wynosi ${u(H, J.cm)}. Oblicz objętość tego graniastosłupa.`,
      OBJ(), { wynik: V }, u(V, J.cm3),
      [
        `Pole podstawy (trójkąta): $\\frac{${b} \\cdot ${ht}}{2} = ${Pp}${J.cm2}$.`,
        `Do wzoru wstawiamy wysokość graniastosłupa $${H}$ cm, a nie wysokość trójkąta: $V = ${Pp} \\cdot ${H} = ${V}${J.cm3}$.`,
      ],
    );
  });
}

function oGraniastoslupOdwr(r) {
  const Pp = r.int(4, 30), H = r.int(2, 14), V = Pp * H;
  return zad(
    `Objętość graniastosłupa prostego wynosi ${u(V, J.cm3)}, a pole jego podstawy ${u(Pp, J.cm2)}. Ile centymetrów ma wysokość tego graniastosłupa?`,
    poleJ("Wysokość", J.cm), { wynik: H }, u(H, J.cm),
    [
      "Objętość to pole podstawy razy wysokość: $V = P_p \\cdot H$.",
      `Stąd $H = V : P_p = ${V} : ${Pp} = ${H}$ cm.`,
    ],
  );
}

function oPrawidlowyCzworokatny(r) {
  const a = r.int(2, 12), H = r.int(2, 15), Pp = a * a, V = Pp * H;
  return zad(
    `Prawidłowy graniastosłup czworokątny ma krawędź podstawy ${u(a, J.cm)} i wysokość ${u(H, J.cm)}. Jaka jest objętość tego graniastosłupa?`,
    OBJ(), { wynik: V }, u(V, J.cm3),
    [
      `Podstawa jest kwadratem, więc $P_p = ${a} \\cdot ${a} = ${Pp}${J.cm2}$.`,
      `$V = P_p \\cdot H = ${Pp} \\cdot ${H} = ${V}${J.cm3}$.`,
    ],
  );
}

function oOstroslupKwadrat(r) {
  return probuj(() => {
    const a = r.int(2, 12), H = r.int(2, 15), Pp = a * a;
    if ((Pp * H) % 3) return null;
    const V = (Pp * H) / 3;
    return zad(
      `Prawidłowy ostrosłup czworokątny ma krawędź podstawy ${u(a, J.cm)} i wysokość ${u(H, J.cm)}. Jaka jest objętość tego ostrosłupa?`,
      OBJ(), { wynik: V }, u(V, J.cm3),
      [
        `Podstawa jest kwadratem, więc $P_p = ${a} \\cdot ${a} = ${Pp}${J.cm2}$.`,
        `Ostrosłup ma objętość równą jednej trzeciej: $V = \\frac{${Pp} \\cdot ${H}}{3} = ${V}${J.cm3}$.`,
      ],
    );
  });
}

function oOstroslupPolePodstawy(r) {
  return probuj(() => {
    const Pp = r.int(6, 60), H = r.int(3, 15);
    if ((Pp * H) % 3) return null;
    const V = (Pp * H) / 3;
    return zad(
      `Pole podstawy ostrosłupa wynosi ${u(Pp, J.cm2)}, a wysokość ostrosłupa ${u(H, J.cm)}. Jaka jest objętość tego ostrosłupa?`,
      OBJ(), { wynik: V }, u(V, J.cm3),
      [
        "Objętość ostrosłupa to jedna trzecia iloczynu pola podstawy i wysokości: $V = \\frac{1}{3} \\cdot P_p \\cdot H$.",
        `$V = \\frac{${Pp} \\cdot ${H}}{3} = ${V}${J.cm3}$.`,
      ],
    );
  });
}

function oOstroslupOdwr(r) {
  return probuj(() => {
    const Pp = r.int(6, 48), H = r.int(3, 15);
    if ((Pp * H) % 3) return null;
    const V = (Pp * H) / 3;
    return zad(
      `Objętość ostrosłupa wynosi ${u(V, J.cm3)}, a pole jego podstawy ${u(Pp, J.cm2)}. Ile centymetrów ma wysokość tego ostrosłupa?`,
      poleJ("Wysokość", J.cm), { wynik: H }, u(H, J.cm),
      [
        `Z wzoru $V = \\frac{1}{3} \\cdot P_p \\cdot H$ wynika, że $P_p \\cdot H = 3 \\cdot V = 3 \\cdot ${V} = ${3 * V}$.`,
        `Stąd $H = ${3 * V} : ${Pp} = ${H}$ cm.`,
      ],
    );
  });
}

function oPorownanie(r) {
  const x = r.int(3, 40), w = r.chance(0.6);
  const Vg = 3 * x;
  if (w) {
    return zad(
      `Graniastosłup i ostrosłup mają takie same podstawy i takie same wysokości. Objętość graniastosłupa wynosi ${u(Vg, J.cm3)}. Jaka jest objętość ostrosłupa?`,
      OBJ(), { wynik: x }, u(x, J.cm3),
      [
        "Ostrosłup ma objętość równą jednej trzeciej objętości graniastosłupa o tej samej podstawie i wysokości.",
        `$V = ${Vg} : 3 = ${x}${J.cm3}$.`,
      ],
    );
  }
  return zad(
    `Ostrosłup i graniastosłup mają takie same podstawy i takie same wysokości. Objętość ostrosłupa wynosi ${u(x, J.cm3)}. Jaka jest objętość graniastosłupa?`,
    OBJ(), { wynik: Vg }, u(Vg, J.cm3),
    [
      "Ostrosłup ma objętość równą jednej trzeciej objętości graniastosłupa o tej samej podstawie i wysokości.",
      `Graniastosłup ma więc trzy razy większą objętość: $3 \\cdot ${x} = ${Vg}${J.cm3}$.`,
    ],
  );
}

function objetoscWzory(r) {
  return losuj(r, [[8, oSzescian], [7, oSzescianOdwr], [10, oProstopadloscian], [8, oProstopadloscianOdwr], [8, oGraniastoslupPolePodstawy], [9, oGraniastoslupTrojkat], [7, oGraniastoslupOdwr], [7, oPrawidlowyCzworokatny], [10, oOstroslupKwadrat], [8, oOstroslupPolePodstawy], [8, oOstroslupOdwr], [8, oPorownanie]]);
}

// --- 10. Objętość: litry w akwarium, kostki w pudełku, zamiana jednostek, zmiana wymiarów

const LITRY = () => [pole("wynik", "Liczba litrów")];
const LITR = ["litr", "litry", "litrów"];
const WYM_AKW = [20, 25, 30, 40, 50, 60, 80, 100];

function lAkwariumPelne(r) {
  if (r.chance(0.4)) {
    const a = r.int(2, 10), b = r.int(2, 8), c = r.int(2, 8), V = a * b * c;
    return zad(
      `Akwarium w kształcie prostopadłościanu ma dno o wymiarach ${u(a, "\\text{ dm}")} na ${u(b, "\\text{ dm}")} i wysokość ${u(c, "\\text{ dm}")}. Ile litrów wody zmieści się w tym akwarium po brzegi?`,
      LITRY(), { wynik: V }, u(V, J.l),
      [
        `Objętość: $${a} \\cdot ${b} \\cdot ${c} = ${V}${J.dm3}$.`,
        `Litr to to samo co $1 \\text{ dm}^3$, więc zmieści się $${V}$ ${lm(V, LITR)}.`,
      ],
    );
  }
  return probuj(() => {
    const a = r.pick(WYM_AKW), b = r.pick(WYM_AKW), c = r.pick(WYM_AKW), V = a * b * c;
    if (V % 1000 || V / 1000 > 400) return null;
    return zad(
      `Akwarium w kształcie prostopadłościanu ma dno o wymiarach ${u(a, J.cm)} na ${u(b, J.cm)} i wysokość ${u(c, J.cm)}. Ile litrów wody zmieści się w tym akwarium po brzegi?`,
      LITRY(), { wynik: V / 1000 }, u(V / 1000, J.l),
      [
        `Objętość: $${a} \\cdot ${b} \\cdot ${c} = ${dz(V)}${J.cm3}$.`,
        `Zamieniamy na decymetry sześcienne (dzielimy przez $1000$): $${dz(V)} : 1000 = ${V / 1000}${J.dm3}$.`,
        `Litr to $1 \\text{ dm}^3$, więc zmieści się $${V / 1000}$ ${lm(V / 1000, LITR)}.`,
      ],
    );
  });
}

function lPoziomWody(r) {
  return probuj(() => {
    const a = r.pick(WYM_AKW), b = r.pick(WYM_AKW), h = r.int(1, 12) * 5, V = a * b * h;
    if (V % 1000 || V / 1000 > 200) return null;
    const L = V / 1000;
    return zad(
      `Do pustego akwarium, którego dno ma wymiary ${u(a, J.cm)} na ${u(b, J.cm)}, wlano ${u(L, J.l)} wody. Na jaką wysokość (w centymetrach) sięga woda?`,
      poleJ("Poziom wody", J.cm), { wynik: h }, u(h, J.cm),
      [
        `${L} ${lm(L, LITR)} to $${L}${J.dm3} = ${dz(V)}${J.cm3}$.`,
        `Pole dna: $${a} \\cdot ${b} = ${a * b}${J.cm2}$.`,
        `Wysokość wody: $${dz(V)} : ${a * b} = ${h}$ cm.`,
      ],
    );
  });
}

function lBrakujeDoPelna(r) {
  return probuj(() => {
    const a = r.pick(WYM_AKW), b = r.pick(WYM_AKW), c = r.int(2, 10) * 5, h = r.int(1, c / 5 - 1) * 5;
    const V = a * b * (c - h);
    if (V % 1000 || V / 1000 > 200) return null;
    const L = V / 1000;
    return zad(
      `Akwarium ma dno o wymiarach ${u(a, J.cm)} na ${u(b, J.cm)} i wysokość ${u(c, J.cm)}. Woda sięga do wysokości ${u(h, J.cm)}. Ile litrów wody trzeba jeszcze dolać, żeby napełnić akwarium po brzegi?`,
      LITRY(), { wynik: L }, u(L, J.l),
      [
        `Brakuje warstwy wody o wysokości $${c} - ${h} = ${c - h}$ cm.`,
        `Jej objętość: $${a} \\cdot ${b} \\cdot ${c - h} = ${dz(V)}${J.cm3}$.`,
        `$${dz(V)} : 1000 = ${L}${J.dm3}$, czyli $${L}$ ${lm(L, LITR)}.`,
      ],
    );
  });
}

/** Ile kostek o krawędzi k mieści się wzdłuż boku a: opis do rozwiązania. */
function wzdluz(a, k) {
  const m = Math.floor(a / k);
  return `Wzdłuż boku $${a}$ cm zmieści się ${m} ${lm(m, ["kostka", "kostki", "kostek"])} (bo $${m} \\cdot ${k} = ${m * k}$${a === m * k ? "" : `, a $${m + 1} \\cdot ${k} = ${(m + 1) * k}$ to już za dużo`}).`;
}

function lKostki(r) {
  return probuj(() => {
    const k = r.pick([2, 3, 4, 5]);
    const bok = () => k * r.int(2, 6) + (r.chance(0.5) ? 0 : r.int(1, k - 1));
    const a = bok(), b = bok(), c = bok(), m1 = Math.floor(a / k), m2 = Math.floor(b / k), m3 = Math.floor(c / k);
    const N = m1 * m2 * m3;
    if (a % k === 0 && b % k === 0 && c % k === 0 && r.chance(0.5)) return null;
    return zad(
      `Pudełko w kształcie prostopadłościanu ma wymiary wewnętrzne ${u(a, J.cm)}, ${u(b, J.cm)} i ${u(c, J.cm)}. Ile sześciennych kostek o krawędzi ${u(k, J.cm)} zmieści się w tym pudełku? (Kostek nie można ciąć ani gnieść.)`,
      [pole("wynik", "Liczba kostek")], { wynik: N }, `$${N}$`,
      [
        "Liczymy osobno, ile kostek mieści się w każdym kierunku, i mnożymy te trzy liczby.",
        wzdluz(a, k),
        wzdluz(b, k),
        wzdluz(c, k),
        `Razem: $${m1} \\cdot ${m2} \\cdot ${m3} = ${N}$ ${lm(N, ["kostka", "kostki", "kostek"])}.`,
      ],
    );
  });
}

/** Zamiany jednostek objętości: z – jednostka podana, na – jednostka szukana, f – ile jednostek „na” mieści się w jednej „z”. */
const PRZELICZENIA = [
  { z: "dm3", na: "cm3", f: 1000, powod: "Sześcian o krawędzi $1$ dm ma krawędź $10$ cm, więc $1 \\text{ dm}^3$ to $10 \\cdot 10 \\cdot 10 = 1000 \\text{ cm}^3$." },
  { z: "l", na: "cm3", f: 1000, powod: "Litr to $1 \\text{ dm}^3$, a $1 \\text{ dm}^3 = 1000 \\text{ cm}^3$, więc $1 \\text{ l} = 1000 \\text{ cm}^3$." },
  { z: "m3", na: "dm3", f: 1000, powod: "Sześcian o krawędzi $1$ m ma krawędź $10$ dm, więc $1 \\text{ m}^3$ to $10 \\cdot 10 \\cdot 10 = 1000 \\text{ dm}^3$." },
  { z: "m3", na: "l", f: 1000, powod: "$1 \\text{ m}^3 = 1000 \\text{ dm}^3$, a $1 \\text{ dm}^3$ to $1$ litr, więc $1 \\text{ m}^3 = 1000 \\text{ l}$." },
  { z: "l", na: "ml", f: 1000, powod: "W jednym litrze jest $1000$ mililitrów: $1 \\text{ l} = 1000 \\text{ ml}$." },
];
const JEDN = { cm3: J.cm3, dm3: J.dm3, m3: J.m3, l: J.l, ml: J.ml };
const NA_JEDN = { cm3: "centymetry sześcienne", dm3: "decymetry sześcienne", m3: "metry sześcienne", l: "litry", ml: "mililitry" };
const WARTOSCI = [q(2), q(3), q(4), q(5), q(6), q(7), q(8), q(9), q(12), q(15), q(25), q(1, 2), q(3, 2), q(5, 2), q(1, 4), q(3, 4)];

function lPrzeliczenia(r) {
  const p = r.pick(PRZELICZENIA), x = r.pick(WARTOSCI), duze = x.mul(p.f);
  const w = r.chance(0.55); // true – z większej na mniejszą jednostkę
  const dane = w ? x : duze, wynik = w ? duze : x, zJed = w ? p.z : p.na, naJed = w ? p.na : p.z;
  return zad(
    `Zamień ${u(dane, JEDN[zJed])} na ${NA_JEDN[naJed]}.`,
    [pole("wynik", `Wynik (w $${jed(JEDN[naJed])}$)`)], { wynik }, u(wynik, JEDN[naJed]),
    [
      p.powod,
      w
        ? `Mnożymy przez $1000$: $${dz(x)} \\cdot 1000 = ${dz(duze)}$.`
        : `Dzielimy przez $1000$: $${dz(duze)} : 1000 = ${dz(x)}$.`,
      `Odpowiedź: ${u(wynik, JEDN[naJed])}.`,
    ],
  );
}

function lBasen(r) {
  return probuj(() => {
    const a = r.pick([4, 5, 6, 8, 10, 12, 15, 20]), b = r.pick([2, 3, 4, 5, 6, 8]), c = r.pick([1, 2, 3]), V = a * b * c;
    if (V > 100) return null;
    return zad(
      `Basen ma kształt prostopadłościanu o wymiarach ${u(a, J.m)}, ${u(b, J.m)} i ${u(c, J.m)}. Ile litrów wody zmieści się w basenie po brzegi?`,
      LITRY(), { wynik: V * 1000 }, u(V * 1000, J.l),
      [
        `Objętość basenu: $${a} \\cdot ${b} \\cdot ${c} = ${V}${J.m3}$.`,
        `Metr sześcienny to $1000$ litrów, więc $${V} \\cdot 1000 = ${dz(V * 1000)}$ litrów.`,
      ],
    );
  });
}

function lSkala(r) {
  const w = r.int(0, 3);
  if (w === 0) {
    const k = r.pick([2, 3, 4, 5]);
    return zad(
      `Wszystkie krawędzie sześcianu zwiększono ${k} razy. Ile razy większa stała się objętość tego sześcianu?`,
      [pole("wynik", "Ile razy większa")], { wynik: k ** 3 }, `$${k ** 3}$`,
      [
        "Objętość sześcianu to $a^3$, czyli zależy od trzeciej potęgi krawędzi.",
        `Dla krawędzi $${k}a$ objętość to $(${k}a)^3 = ${k} \\cdot ${k} \\cdot ${k} \\cdot a^3 = ${k ** 3}a^3$.`,
        `Objętość jest więc $${k ** 3}$ razy większa.`,
      ],
    );
  }
  if (w === 1) {
    const a = r.int(2, 4), k = r.pick([2, 3, 4, 5]), V0 = a ** 3, V = V0 * k ** 3;
    return zad(
      `Objętość sześcianu wynosi ${u(V0, J.cm3)}. Jaką objętość ma sześcian, którego krawędź jest ${k} razy dłuższa?`,
      OBJ(), { wynik: V }, u(V, J.cm3),
      [
        `Gdy krawędź jest $${k}$ razy dłuższa, objętość rośnie $${k}^3 = ${k ** 3}$ razy.`,
        `Nowa objętość: $${k ** 3} \\cdot ${V0} = ${V}${J.cm3}$.`,
      ],
    );
  }
  if (w === 2) {
    const a = r.int(2, 8), b = r.int(2, 8), c = r.int(2, 8), k = r.pick([2, 3, 4]), V = a * b * k * c;
    return zad(
      `Prostopadłościan ma wymiary ${u(a, J.cm)}, ${u(b, J.cm)} i ${u(c, J.cm)}. Wysokość ${u(c, J.cm)} zwiększono ${k} razy, a pozostałe wymiary zostawiono bez zmian. Jaka jest objętość nowego prostopadłościanu?`,
      OBJ(), { wynik: V }, u(V, J.cm3),
      [
        `Nowa wysokość: $${k} \\cdot ${c} = ${k * c}$ cm.`,
        `Objętość: $${a} \\cdot ${b} \\cdot ${k * c} = ${a * b} \\cdot ${k * c} = ${V}${J.cm3}$.`,
      ],
    );
  }
  const a = r.pick([2, 3, 4, 5]), k = 2;
  return zad(
    `Krawędzie sześcianu o krawędzi ${u(2 * a, J.cm)} skrócono ${k} razy. Ile razy mniejsza stała się objętość sześcianu?`,
    [pole("wynik", "Ile razy mniejsza")], { wynik: 8 }, "$8$",
    [
      `Stara objętość: $${2 * a}^3 = ${(2 * a) ** 3}${J.cm3}$.`,
      `Nowa krawędź: $${2 * a} : 2 = ${a}$ cm, więc nowa objętość to $${a}^3 = ${a ** 3}${J.cm3}$.`,
      `Iloraz: $${(2 * a) ** 3} : ${a ** 3} = 8$. Objętość zmalała $8$ razy (bo $2^3 = 8$).`,
    ],
  );
}

function objetoscLitryIJednostki(r) {
  return losuj(r, [[16, lAkwariumPelne], [14, lPoziomWody], [10, lBrakujeDoPelna], [16, lKostki], [26, lPrzeliczenia], [8, lBasen], [14, lSkala]]);
}

// --- 11. Przekątne: przekątna ściany, przekątna prostopadłościanu, przekątna sześcianu (a√2, a√3)

/** Prostopadłościany o całkowitych wymiarach i całkowitej przekątnej: [a, b, c, d] (d² = a² + b² + c²). */
const CZWORKI = [];
for (let a = 1; a <= 20; a++) {
  for (let b = a; b <= 20; b++) {
    for (let c = b; c <= 20; c++) {
      const s = a * a + b * b + c * c, d = Math.round(Math.sqrt(s));
      if (d * d === s && d <= 25) CZWORKI.push([a, b, c, d]);
    }
  }
}

const DLUGOSC_PRZEKATNEJ = () => poleJ("Długość przekątnej", J.cm);

function dPrzekatnaSciany(r) {
  const [x, y, z] = r.pick(TROJKI), [a, b] = r.chance(0.5) ? [x, y] : [y, x];
  return zad(
    r.pick([
      `Jedna ze ścian prostopadłościanu jest prostokątem o bokach ${u(a, J.cm)} i ${u(b, J.cm)}. Ile centymetrów ma przekątna tej ściany?`,
      `Podstawą prostopadłościanu jest prostokąt o wymiarach ${u(a, J.cm)} na ${u(b, J.cm)}. Jaką długość ma przekątna podstawy?`,
    ]),
    DLUGOSC_PRZEKATNEJ(), { wynik: z }, u(z, J.cm),
    [
      "Przekątna dzieli prostokąt na dwa trójkąty prostokątne i jest w nich przeciwprostokątną. Z twierdzenia Pitagorasa: $d^2 = a^2 + b^2$.",
      `$d^2 = ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${z * z}$.`,
      `$d = \\sqrt{${z * z}} = ${z}$ cm.`,
    ],
  );
}

function dPrzekatnaBryly(r) {
  const [a0, b0, c0, D] = r.pick(CZWORKI), [a, b, c] = r.shuffle([a0, b0, c0]);
  const tresc = r.chance(0.5)
    ? `Prostopadłościan ma wymiary ${u(a, J.cm)}, ${u(b, J.cm)} i ${u(c, J.cm)}. Ile centymetrów ma jego przekątna (odcinek łączący dwa najbardziej oddalone wierzchołki)?`
    : `Pudełko ma kształt prostopadłościanu o wymiarach ${u(a, J.cm)}, ${u(b, J.cm)} i ${u(c, J.cm)}. Jak długi najdłuższy prosty patyk (traktujemy go jak odcinek) zmieści się w tym pudełku? Podaj długość w centymetrach.`;
  return zad(
    tresc, DLUGOSC_PRZEKATNEJ(), { wynik: D }, u(D, J.cm),
    [
      "Kwadrat przekątnej prostopadłościanu to suma kwadratów trzech wymiarów (twierdzenie Pitagorasa użyte dwa razy): $D^2 = a^2 + b^2 + c^2$.",
      `$D^2 = ${a * a} + ${b * b} + ${c * c} = ${D * D}$.`,
      `$D = \\sqrt{${D * D}} = ${D}$ cm.`,
    ],
  );
}

function dBrakujacyWymiar(r) {
  const [a0, b0, c0, D] = r.pick(CZWORKI), [a, b, c] = r.shuffle([a0, b0, c0]);
  return zad(
    `Prostopadłościan ma podstawę o wymiarach ${u(a, J.cm)} na ${u(b, J.cm)}, a jego przekątna ma długość ${u(D, J.cm)}. Ile centymetrów ma wysokość tego prostopadłościanu?`,
    poleJ("Wysokość", J.cm), { wynik: c }, u(c, J.cm),
    [
      "Przekątna prostopadłościanu spełnia $D^2 = a^2 + b^2 + c^2$, więc $c^2 = D^2 - a^2 - b^2$.",
      `$c^2 = ${D * D} - ${a * a} - ${b * b} = ${c * c}$.`,
      `$c = \\sqrt{${c * c}} = ${c}$ cm.`,
    ],
  );
}

function dSzescian(r) {
  const w = r.int(0, 4), a = r.int(2, 15);
  if (w === 0) {
    return zad(
      `Krawędź sześcianu ma długość ${u(a, J.cm)}. Przekątna ściany tego sześcianu ma długość $k\\sqrt{2}$ cm. Ile wynosi $k$?`,
      [pole("wynik", "Liczba $k$")], { wynik: a }, `$${a}$`,
      [
        "Ściana sześcianu jest kwadratem o boku $a$. Z twierdzenia Pitagorasa: $d^2 = a^2 + a^2 = 2a^2$.",
        `$d^2 = ${a}^2 + ${a}^2 = ${2 * a * a}$, więc $d = \\sqrt{${2 * a * a}} = ${a}\\sqrt{2}$.`,
        `Zatem $k = ${a}$ (przekątna kwadratu to krawędź razy $\\sqrt{2}$).`,
      ],
    );
  }
  if (w === 1) {
    return zad(
      `Krawędź sześcianu ma długość ${u(a, J.cm)}. Przekątna tego sześcianu (łącząca dwa najbardziej oddalone wierzchołki) ma długość $k\\sqrt{3}$ cm. Ile wynosi $k$?`,
      [pole("wynik", "Liczba $k$")], { wynik: a }, `$${a}$`,
      [
        "Przekątna prostopadłościanu: $D^2 = a^2 + b^2 + c^2$. W sześcianie wszystkie wymiary to $a$, więc $D^2 = 3a^2$.",
        `$D^2 = ${a}^2 + ${a}^2 + ${a}^2 = ${3 * a * a}$, więc $D = \\sqrt{${3 * a * a}} = ${a}\\sqrt{3}$.`,
        `Zatem $k = ${a}$ (przekątna sześcianu to krawędź razy $\\sqrt{3}$).`,
      ],
    );
  }
  if (w === 2) {
    return zad(
      `Przekątna sześcianu (łącząca dwa najbardziej oddalone wierzchołki) ma długość $${a}\\sqrt{3}$ cm. Ile centymetrów ma krawędź tego sześcianu?`,
      poleJ("Długość krawędzi", J.cm), { wynik: a }, u(a, J.cm),
      [
        "Przekątna sześcianu o krawędzi $a$ ma długość $a\\sqrt{3}$ (bo $a^2 + a^2 + a^2 = 3a^2$).",
        `Porównujemy: $a\\sqrt{3} = ${a}\\sqrt{3}$, więc $a = ${a}$ cm.`,
      ],
    );
  }
  if (w === 3) {
    return zad(
      `Przekątna ściany sześcianu ma długość $${a}\\sqrt{2}$ cm. Jaka jest suma długości wszystkich krawędzi tego sześcianu?`,
      POLE_KRAW(), { wynik: 12 * a }, u(12 * a, J.cm),
      [
        `Przekątna kwadratu o boku $a$ ma długość $a\\sqrt{2}$, więc $a\\sqrt{2} = ${a}\\sqrt{2}$ i krawędź ma $${a}$ cm.`,
        `Sześcian ma $12$ krawędzi, więc ich suma to $12 \\cdot ${a} = ${12 * a}$ cm.`,
      ],
    );
  }
  const przekatnaBryly = r.chance(0.5), kwadrat = (przekatnaBryly ? 3 : 2) * a * a;
  return zad(
    `Krawędź sześcianu ma długość ${u(a, J.cm)}. Ile wynosi kwadrat długości ${przekatnaBryly ? "przekątnej tego sześcianu (łączącej dwa najbardziej oddalone wierzchołki)" : "przekątnej ściany tego sześcianu"}?`,
    poleJ("Kwadrat długości przekątnej", J.cm2), { wynik: kwadrat }, u(kwadrat, J.cm2),
    [
      przekatnaBryly
        ? "Kwadrat przekątnej to suma kwadratów trzech wymiarów, a w sześcianie wszystkie wymiary są równe $a$."
        : "Kwadrat przekątnej ściany to suma kwadratów dwóch boków kwadratu, które są równe $a$.",
      przekatnaBryly
        ? `$D^2 = ${a}^2 + ${a}^2 + ${a}^2 = 3 \\cdot ${a * a} = ${kwadrat}$.`
        : `$d^2 = ${a}^2 + ${a}^2 = 2 \\cdot ${a * a} = ${kwadrat}$.`,
    ],
  );
}

function przekatneProstopadloscianu(r) {
  return losuj(r, [[18, dPrzekatnaSciany], [28, dPrzekatnaBryly], [16, dBrakujacyWymiar], [38, dSzescian]]);
}

// --- 12. Wysokości w ostrosłupie prawidłowym czworokątnym: wysokość ściany bocznej, wysokość ostrosłupa, krawędź boczna

/** [a, H, h]: połowa krawędzi podstawy a/2 i wysokość H są przyprostokątnymi, wysokość ściany bocznej h jest przeciwprostokątną. */
const OSTR = [];
for (const [x, y, z] of TROJKI) {
  if (2 * x <= 40 && y <= 24) OSTR.push([2 * x, y, z]);
  if (x !== y && 2 * y <= 40 && x <= 24) OSTR.push([2 * y, x, z]);
}
/** [a, H, b]: krawędź boczna b = √(H² + a²/2) jest liczbą całkowitą (połowa przekątnej podstawy ma kwadrat a²/2). */
const KRAWEDZIE_BOCZNE = [];
for (let a = 4; a <= 32; a += 2) {
  for (let H = 2; H <= 24; H++) {
    const b2 = H * H + (a * a) / 2, b = Math.round(Math.sqrt(b2));
    if (b * b === b2 && b <= 30) KRAWEDZIE_BOCZNE.push([a, H, b]);
  }
}

const OPIS_OSTR = "Prawidłowy ostrosłup czworokątny";
const KROK_POLOWA = (a, p) => `Wysokość ostrosłupa kończy się w środku kwadratowej podstawy. Od środka podstawy do środka krawędzi jest poziomo połowa krawędzi: $${a} : 2 = ${p}$ cm.`;

function wHSciany(r) {
  const [a, H, h] = r.pick(OSTR), p = a / 2;
  return zad(
    `${OPIS_OSTR} ma krawędź podstawy ${u(a, J.cm)} i wysokość ${u(H, J.cm)}. Ile centymetrów ma wysokość ściany bocznej tego ostrosłupa (poprowadzona z wierzchołka ostrosłupa do środka krawędzi podstawy)?`,
    poleJ("Wysokość ściany bocznej", J.cm), { wynik: h }, u(h, J.cm),
    [
      KROK_POLOWA(a, p),
      `Wysokość ściany bocznej $h$ jest przeciwprostokątną trójkąta prostokątnego o przyprostokątnych $${H}$ i $${p}$.`,
      `$h^2 = ${H}^2 + ${p}^2 = ${H * H} + ${p * p} = ${h * h}$, więc $h = ${h}$ cm.`,
    ],
  );
}

function wHOstroslupa(r) {
  const [a, H, h] = r.pick(OSTR), p = a / 2;
  return zad(
    `${OPIS_OSTR} ma krawędź podstawy ${u(a, J.cm)}, a wysokość jego ściany bocznej (poprowadzona z wierzchołka ostrosłupa do środka krawędzi podstawy) ma ${u(h, J.cm)}. Ile centymetrów ma wysokość tego ostrosłupa?`,
    poleJ("Wysokość ostrosłupa", J.cm), { wynik: H }, u(H, J.cm),
    [
      KROK_POLOWA(a, p),
      `Wysokość ściany bocznej $${h}$ jest przeciwprostokątną trójkąta, a wysokość ostrosłupa $H$ jedną z przyprostokątnych (drugą jest $${p}$). Szukamy przyprostokątnej, więc odejmujemy.`,
      `$H^2 = ${h}^2 - ${p}^2 = ${h * h} - ${p * p} = ${H * H}$, więc $H = ${H}$ cm.`,
    ],
  );
}

function wObjetosc(r) {
  const [a, H, h] = probuj(() => {
    const t = r.pick(OSTR);
    return (t[0] * t[0] * t[1]) % 3 === 0 ? t : null;
  }), p = a / 2, Pp = a * a, V = (Pp * H) / 3;
  return zad(
    `${OPIS_OSTR} ma krawędź podstawy ${u(a, J.cm)}, a wysokość jego ściany bocznej ma ${u(h, J.cm)}. Oblicz objętość tego ostrosłupa.`,
    poleJ("Objętość", J.cm3), { wynik: V }, u(V, J.cm3),
    [
      `Do objętości potrzebna jest wysokość ostrosłupa $H$, a nie wysokość ściany. Połowa krawędzi podstawy to $${a} : 2 = ${p}$ cm.`,
      `$H^2 = ${h}^2 - ${p}^2 = ${h * h} - ${p * p} = ${H * H}$, więc $H = ${H}$ cm.`,
      `Pole podstawy: $${a} \\cdot ${a} = ${Pp}${J.cm2}$.`,
      `$V = \\frac{${Pp} \\cdot ${H}}{3} = ${V}${J.cm3}$.`,
    ],
  );
}

function wPole(r) {
  const [a, H, h] = r.pick(OSTR), p = a / 2, Pp = a * a, Pb = 2 * a * h, P = Pp + Pb;
  return zad(
    `${OPIS_OSTR} ma krawędź podstawy ${u(a, J.cm)} i wysokość ${u(H, J.cm)}. Oblicz pole powierzchni całkowitej tego ostrosłupa.`,
    poleJ("Pole powierzchni", J.cm2), { wynik: P }, u(P, J.cm2),
    [
      `Do pola ściany bocznej potrzebna jest jej wysokość $h$. Połowa krawędzi podstawy to $${p}$ cm, więc $h^2 = ${H}^2 + ${p}^2 = ${h * h}$ i $h = ${h}$ cm.`,
      `Cztery ściany boczne: $4 \\cdot \\frac{${a} \\cdot ${h}}{2} = ${Pb}${J.cm2}$.`,
      `Podstawa: $${a} \\cdot ${a} = ${Pp}${J.cm2}$, więc $P_c = ${Pp} + ${Pb} = ${P}${J.cm2}$.`,
    ],
  );
}

function wKrawedzBoczna(r) {
  const [a, H, b] = r.pick(KRAWEDZIE_BOCZNE), k = a * a / 2;
  return zad(
    `${OPIS_OSTR} ma krawędź podstawy ${u(a, J.cm)} i wysokość ${u(H, J.cm)}. Ile centymetrów ma krawędź boczna tego ostrosłupa (łącząca wierzchołek ostrosłupa z rogiem podstawy)?`,
    poleJ("Krawędź boczna", J.cm), { wynik: b }, u(b, J.cm),
    [
      "Wysokość ostrosłupa kończy się w środku podstawy. Rzut krawędzi bocznej na podstawę to połowa przekątnej kwadratu.",
      `Przekątna kwadratu to $a\\sqrt{2}$, więc kwadrat jej połowy to $\\frac{a^2}{2} = \\frac{${a * a}}{2} = ${k}$.`,
      `$b^2 = ${H}^2 + ${k} = ${H * H} + ${k} = ${b * b}$, więc $b = ${b}$ cm.`,
    ],
  );
}

function wHZKrawedziBocznej(r) {
  const [a, H, b] = r.pick(KRAWEDZIE_BOCZNE), k = a * a / 2;
  return zad(
    `${OPIS_OSTR} ma krawędź podstawy ${u(a, J.cm)} i krawędź boczną ${u(b, J.cm)} (łączącą wierzchołek ostrosłupa z rogiem podstawy). Ile centymetrów ma wysokość tego ostrosłupa?`,
    poleJ("Wysokość ostrosłupa", J.cm), { wynik: H }, u(H, J.cm),
    [
      "Rzut krawędzi bocznej na podstawę to połowa przekątnej kwadratu. Przekątna kwadratu to $a\\sqrt{2}$.",
      `Kwadrat połowy przekątnej: $\\frac{a^2}{2} = \\frac{${a * a}}{2} = ${k}$.`,
      `Szukamy przyprostokątnej, więc odejmujemy: $H^2 = ${b}^2 - ${k} = ${b * b} - ${k} = ${H * H}$, czyli $H = ${H}$ cm.`,
    ],
  );
}

function wysokosciOstroslupa(r) {
  return losuj(r, [[20, wHSciany], [18, wHOstroslupa], [14, wObjetosc], [16, wPole], [18, wKrawedzBoczna], [14, wHZKrawedziBocznej]]);
}

// --- Lista generatorów

export const GENERATORY = [
  { id: "graniastoslupy-sciany-krawedzie-wierzcholki", nazwa: "Graniastosłup: ściany, krawędzie, wierzchołki", opis: "Ile ścian, krawędzi i wierzchołków ma graniastosłup n-kątny, a także odwrotnie: jaka jest podstawa graniastosłupa o danej liczbie krawędzi, wierzchołków lub ścian.", temat: "graniastoslupy", generuj: graniastoslupyElementy },
  { id: "graniastoslupy-suma-krawedzi", nazwa: "Suma długości krawędzi graniastosłupa", opis: "Suma krawędzi prostopadłościanu, sześcianu i prawidłowego graniastosłupa, krawędź sześcianu z długości drutu, brakująca krawędź prostopadłościanu lub graniastosłupa.", temat: "graniastoslupy", generuj: graniastoslupySuma },
  { id: "ostroslupy-sciany-krawedzie-wierzcholki", nazwa: "Ostrosłup: ściany, krawędzie, wierzchołki", opis: "Ile ścian, krawędzi i wierzchołków ma ostrosłup n-kątny i czworościan, odwrotnie: jaka jest podstawa ostrosłupa o danej liczbie krawędzi, oraz porównanie z graniastosłupem o tej samej podstawie.", temat: "ostroslupy", generuj: ostroslupyElementy },
  { id: "ostroslupy-suma-krawedzi-i-zdania", nazwa: "Suma krawędzi ostrosłupa, prawda czy fałsz", opis: "Suma długości krawędzi ostrosłupa prawidłowego i czworościanu foremnego (także od końca), zdania prawda/fałsz porównujące graniastosłupy i ostrosłupy.", temat: "ostroslupy", generuj: ostroslupySumaIZdania },
  { id: "siatki-szescian", nazwa: "Siatka sześcianu: co leży naprzeciw, czy się złoży", opis: "Siatka sześcianu opisana słowami (pasek czterech kwadratów, schodki, dwa rzędy po trzy): który kwadrat leży naprzeciw danego, oraz czy opisana siatka złoży się w sześcian.", temat: "siatki", generuj: siatkiSzescian },
  { id: "siatki-ilosc-scian-i-pole", nazwa: "Siatki brył: ile ścian, jakie figury, pole siatki", opis: "Z ilu ścian, prostokątów i trójkątów składa się siatka graniastosłupa i ostrosłupa, jaka to bryła, pole siatki równe polu powierzchni, długość paska ścian bocznych.", temat: "siatki", generuj: siatkiIlosciIPole },
  { id: "pole-szescian-prostopadloscian", nazwa: "Pole powierzchni sześcianu i prostopadłościanu", opis: "Pole powierzchni sześcianu i prostopadłościanu, pudełko bez wieczka, brakująca krawędź lub wysokość, malowanie pokoju, jak zmienia się pole przy powiększeniu krawędzi.", temat: "pole-powierzchni", generuj: poleSzescianProstopadloscian },
  { id: "pole-graniastoslup-ostroslup", nazwa: "Pole powierzchni graniastosłupa i ostrosłupa", opis: "Pole powierzchni prostego graniastosłupa (trójkąt, romb, kwadrat w podstawie, dane pole i obwód podstawy) oraz prawidłowego ostrosłupa czworokątnego z wysokości ściany bocznej.", temat: "pole-powierzchni", generuj: poleGraniastoslupOstroslup },
  { id: "objetosc-wzory", nazwa: "Objętość: sześcian, prostopadłościan, graniastosłup, ostrosłup", opis: "Objętość sześcianu, prostopadłościanu, graniastosłupa (pole podstawy razy wysokość) i ostrosłupa (jedna trzecia), także odwrotnie: brakująca krawędź lub wysokość.", temat: "objetosc", generuj: objetoscWzory },
  { id: "objetosc-litry-i-jednostki", nazwa: "Objętość: litry, kostki, jednostki, zmiana wymiarów", opis: "Litry w akwarium i poziom wody, ile kostek zmieści się w pudełku, zamiana cm³, dm³, l i m³, basen, jak zmienia się objętość przy zmianie wymiarów.", temat: "objetosc", generuj: objetoscLitryIJednostki },
  { id: "przekatne-prostopadloscianu", nazwa: "Przekątne: ściana, prostopadłościan, sześcian", opis: "Przekątna ściany i prostopadłościanu (liczby takie jak 2, 3, 6 i 7), brakujący wymiar, przekątna sześcianu a√3 i przekątna ściany a√2.", temat: "przekatne-wysokosci", generuj: przekatneProstopadloscianu },
  { id: "wysokosci-ostroslupa", nazwa: "Wysokości w ostrosłupie prawidłowym czworokątnym", opis: "Wysokość ściany bocznej i wysokość ostrosłupa z trójek pitagorejskich, krawędź boczna, objętość i pole powierzchni po policzeniu brakującej wysokości.", temat: "przekatne-wysokosci", generuj: wysokosciOstroslupa },
];
