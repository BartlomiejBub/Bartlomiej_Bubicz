// Generatory zadań z działu „Egzamin ósmoklasisty – figury płaskie”: kąty, trójkąty, czworokąty i wielokąty, pola i obwody,
// twierdzenie Pitagorasa, układ współrzędnych i symetrie. Zadania ćwiczą dokładnie to, co tłumaczą karty z assets/wzory/e8-figury.js
// (te same pojęcia: kąty przyległe i wierzchołkowe, litery F, Z i C, kąt zewnętrzny, nierówność trójkąta, ruch między wierzchołkami itd.).
// Generatory nie mają rysunków, więc każda figura jest opisana słowami: położenie kątów, boki równoległe, współrzędne punktów.
// Kontrakt zadania i narzędzia: zob. wspolne.js. Każdy generator ma pole temat – id tematu z assets/arkusze/tematy.js (dział "e8-figury").
// Liczby są dobierane tak, żeby wszystko dało się policzyć w pamięci, bez kalkulatora. Pierwiastki ($\sqrt{2}$, $\sqrt{3}$) pojawiają się tylko tak,
// że uczeń podaje liczbę przy pierwiastku albo wynik całkowity. Rozwiązania są pisane prostym językiem, kilka krótkich kroków.
import { Q, q } from "./wspolne.js";

/** Lista wzorów jako osobne $…$ po przecinkach – długa lista łamie się wtedy na wąskim ekranie. */
const listaTex = (arr) => arr.map((x) => `$${x}$`).join(", ");

// --- Drobne pomocnicze

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
/** Dwa pola na współrzędne punktu. */
const poleXY = () => [pole("x", "Współrzędna $x$"), pole("y", "Współrzędna $y$")];

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

const fr = (a, b) => `\\frac{${a}}{${b}}`;
const wypisz = (arr) => (arr.length < 2 ? arr.join("") : `${arr.slice(0, -1).join(", ")} i ${arr[arr.length - 1]}`);
const cap = (s) => s[0].toUpperCase() + s.slice(1);

/** Kąt w tekście: „$50^\circ$”; wewnątrz wzoru: „50^\circ”. */
const st = (x) => `$${dz(x)}^\\circ$`;
const sk = (x) => `${dz(x)}^\\circ`;
/** Liczba ujemna w nawiasie (żeby nie wyszło „+ -” ani „- -”). */
const nw = (x) => (x < 0 ? `(${x})` : `${x}`);
/** „$A = (1, 2)$” z punktu [x, y] oraz sam „(1, 2)” do wzoru. */
const pk = (nazwa, p) => `$${nazwa} = (${p[0]}, ${p[1]})$`;
const kr = (p) => `(${p[0]}, ${p[1]})`;
/** Różnica współrzędnych jako „większa - mniejsza = wynik”, np. „4 - (-3) = 7”. */
const rozn = (a, b) => {
  const w = Math.max(a, b), m = Math.min(a, b);
  return `${w} - ${nw(m)} = ${w - m}`;
};
const ILE_CZESCI = (c) => lm(c, ["część", "części", "części"]);

/** Wielokrotności 5 z przedziału [od, do] bez podanych wartości (np. bez kąta prostego). */
const kat5 = (r, od, do_, ...bez) => r.intBez(od / 5, do_ / 5, ...bez.map((b) => b / 5)) * 5;

// --- Kąty o podanym stosunku (wspólne dla kątów przyległych, jednostronnych, w trójkącie i czworokącie)

/** Stosunki dwóch kątów, których suma dzieli 180 (bez zaokrągleń). */
const STOSUNKI_180 = [[1, 2], [1, 3], [2, 3], [1, 4], [1, 5], [2, 7], [4, 5], [1, 8], [3, 7], [5, 7], [1, 9], [1, 11]];

/** Kroki: kąty w stosunku c1 : c2 : …, razem S stopni; szukany jest kąt numer i (od zera). */
function krokiStosunek(czesci, S, i, razem) {
  const n = czesci.reduce((a, b) => a + b, 0), jedna = S / n;
  return [
    `${razem} Dzielimy je na $${czesci.join(" + ")} = ${n}$ równych części; kąty zajmują odpowiednio ${wypisz(czesci.map((c) => `$${c}$`))} z tych części.`,
    `Jedna część to $${S}^\\circ : ${n} = ${jedna}^\\circ$.`,
    `Szukany kąt ma $${czesci[i]}$ ${ILE_CZESCI(czesci[i])}, czyli $${czesci[i]} \\cdot ${jedna}^\\circ = ${czesci[i] * jedna}^\\circ$.`,
  ];
}

// --- Zdania prawda/fałsz (wybór): jedno poprawne zdanie i trzy błędne (albo odwrotnie)

/** BANK: [{ t: zdanie, ok: true/false, why: krótkie uzasadnienie z rozstrzygnięciem }]; o – „o trójkątach” itp. */
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

// --- 1. Kąty przyległe, wierzchołkowe i wokół punktu

const POLE_KAT = () => [pole("kat", "Miara kąta (w stopniach)")];

function katPrzylegly(r) {
  const x = kat5(r, 15, 165, 90), y = 180 - x;
  const tresc = r.chance(0.5)
    ? `Kąty $\\alpha$ i $\\beta$ są przyległe (leżą obok siebie na jednej prostej). Kąt $\\alpha$ ma ${st(x)}. Ile stopni ma kąt $\\beta$?`
    : `Punkt $O$ leży na prostej $AB$, między punktami $A$ i $B$, a punkt $C$ leży poza tą prostą. Kąt $AOC$ ma ${st(x)}. Ile stopni ma kąt $COB$?`;
  return zad(tresc, POLE_KAT(), { kat: y }, st(y), [
    "Kąty przyległe leżą obok siebie na prostej, więc razem tworzą kąt półpełny, czyli mają $180^\\circ$.",
    `Szukany kąt ma $180^\\circ - ${sk(x)} = ${sk(y)}$.`,
  ]);
}

function katWierzcholkowy(r) {
  const x = kat5(r, 15, 165, 90), y = 180 - x;
  const wierzch = r.chance(0.5);
  const tresc = `Dwie proste przecinają się w punkcie $O$ i tworzą cztery kąty. Jeden z nich ma ${st(x)}. Ile stopni ma ${wierzch ? "kąt wierzchołkowy do niego (leżący naprzeciw niego)" : "kąt przyległy do niego (leżący obok niego)"}?`;
  const kroki = wierzch
    ? [
      "Kąty wierzchołkowe leżą naprzeciw siebie (jak ostrza nożyczek) i są równe.",
      `Szukany kąt ma więc tyle samo co dany: ${st(x)}.`,
      `Sprawdzenie: kąty obok mają po $180^\\circ - ${sk(x)} = ${sk(y)}$, a razem $2 \\cdot ${sk(x)} + 2 \\cdot ${sk(y)} = 360^\\circ$.`,
    ]
    : [
      "Kąty leżące obok siebie (przyległe) tworzą razem kąt półpełny, czyli mają $180^\\circ$.",
      `Szukany kąt ma $180^\\circ - ${sk(x)} = ${sk(y)}$.`,
    ];
  return zad(tresc, POLE_KAT(), { kat: wierzch ? x : y }, st(wierzch ? x : y), kroki);
}

function wokolPunktu(r) {
  return probuj(() => {
    const ile = r.chance(0.6) ? 2 : 3;
    const znane = Array.from({ length: ile }, () => r.int(5, 15) * 10);
    const S = znane.reduce((a, b) => a + b, 0), x = 360 - S;
    if (x < 30 || x > 170) return null;
    return zad(
      `Wokół punktu $O$ leżą ${ile === 2 ? "trzy" : "cztery"} kąty, które razem tworzą pełny obrót: ${wypisz([...znane.map(st), "kąt $x$"])}. Ile stopni ma kąt $x$?`,
      [pole("kat", "Miara kąta $x$ (w stopniach)")], { kat: x }, st(x),
      [
        "Kąty wokół punktu tworzą pełny obrót, czyli razem mają $360^\\circ$.",
        `Dodajemy znane kąty: $${znane.map(sk).join(" + ")} = ${sk(S)}$.`,
        `Na kąt $x$ zostaje $360^\\circ - ${sk(S)} = ${sk(x)}$.`,
      ],
    );
  });
}

function przylegleStosunek(r) {
  const [m, n] = r.pick(STOSUNKI_180);
  const pokaz = r.chance(0.5) ? [m, n] : [n, m];
  const wiekszy = r.chance(0.5), cel = wiekszy ? n : m, jedna = 180 / (m + n);
  return zad(
    `Dwa kąty przyległe mają miary w stosunku $${pokaz.join(" : ")}$. Ile stopni ma ${wiekszy ? "większy" : "mniejszy"} z tych kątów?`,
    POLE_KAT(), { kat: cel * jedna }, st(cel * jedna),
    krokiStosunek(pokaz, 180, pokaz.indexOf(cel), "Kąty przyległe dają razem $180^\\circ$."),
  );
}

function przylegleRoznica(r) {
  const d = r.int(1, 14) * 10, mal = (180 - d) / 2, du = mal + d;
  return zad(
    `Jeden z dwóch kątów przyległych jest o ${st(d)} większy od drugiego. Ile stopni ma większy z tych kątów?`,
    POLE_KAT(), { kat: du }, st(du),
    [
      "Kąty przyległe dają razem $180^\\circ$.",
      `Gdyby od większego kąta odjąć ${st(d)}, oba kąty byłyby równe i razem miałyby $180^\\circ - ${sk(d)} = ${sk(180 - d)}$.`,
      `Każdy z nich miałby wtedy $${sk(180 - d)} : 2 = ${sk(mal)}$ – tyle ma mniejszy kąt.`,
      `Większy kąt ma $${sk(mal)} + ${sk(d)} = ${sk(du)}$.`,
    ],
  );
}

function polproste(r) {
  return probuj(() => {
    const a = r.int(4, 16) * 5, b = r.int(4, 16) * 5;
    if (a + b > 170) return null;
    const c = 180 - a - b;
    return zad(
      `Punkt $O$ leży na prostej $AB$, między punktami $A$ i $B$. Po jednej stronie tej prostej poprowadzono z punktu $O$ dwie półproste $OC$ i $OD$ tak, że półproste $OA$, $OC$, $OD$, $OB$ leżą w tej kolejności jedna za drugą. Kąt $AOC$ ma ${st(a)}, a kąt $DOB$ ma ${st(b)}. Ile stopni ma kąt $COD$?`,
      POLE_KAT(), { kat: c }, st(c),
      [
        "Kąty $AOC$, $COD$ i $DOB$ leżą obok siebie i razem tworzą kąt półpełny $AOB$, czyli $180^\\circ$.",
        `Znane kąty dają razem $${sk(a)} + ${sk(b)} = ${sk(a + b)}$.`,
        `Kąt $COD$ ma $180^\\circ - ${sk(a + b)} = ${sk(c)}$.`,
      ],
    );
  });
}

function katyPrzylegleWierzcholkowe(r) {
  return losuj(r, [[15, katPrzylegly], [15, katWierzcholkowy], [16, wokolPunktu], [18, przylegleStosunek], [14, przylegleRoznica], [14, polproste]]);
}

// --- 2. Proste równoległe przecięte trzecią prostą (litery F, Z i C), opisane słowami

const USTAWIENIE_PROSTYCH = "Proste $k$ i $l$ są równoległe, a prosta $k$ leży wyżej. Prosta $m$ przecina prostą $k$ w punkcie $A$, a prostą $l$ w punkcie $B$.";

/** Kąt przy punkcie A (p = 0) lub B (p = 1); v = 0 – „nad” swoją prostą, v = 1 – „pod” nią; h = 0 – po lewej stronie prostej m, h = 1 – po prawej. */
function opisKata(nazwa, k) {
  const pion = k.p === 0
    ? (k.v === 0 ? "nad prostą $k$" : "między prostymi $k$ i $l$")
    : (k.v === 0 ? "między prostymi $k$ i $l$" : "pod prostą $l$");
  return `Kąt $\\${nazwa}$ leży przy punkcie $${k.p === 0 ? "A" : "B"}$, ${pion}, po ${k.h === 0 ? "lewej" : "prawej"} stronie prostej $m$.`;
}
const wMiedzyProstymi = (k) => (k.p === 0 ? k.v === 1 : k.v === 0);
/** Kąty równe, gdy pozycje mają tę samą parzystość v + h (wierzchołkowe i odpowiadające); w przeciwnym razie dają razem 180°. */
const rowneKaty = (a, b) => (a.v + a.h) % 2 === (b.v + b.h) % 2;
function rodzajPary(a, b) {
  if (a.v === b.v && a.h === b.h) return "odp";
  if (wMiedzyProstymi(a) && wMiedzyProstymi(b)) return a.h !== b.h ? "naprz" : "jedn";
  return "dwa";
}

function katyProste(r) {
  const rodzaj = r.pick(["odp", "odp", "naprz", "naprz", "jedn", "jedn", "dwa", "dwa", "dwa", "stosunek"]);
  return probuj(() => {
    const a = { p: r.int(0, 1), v: r.int(0, 1), h: r.int(0, 1) };
    const b = { p: 1 - a.p, v: r.int(0, 1), h: r.int(0, 1) };
    if (rodzajPary(a, b) !== (rodzaj === "stosunek" ? "jedn" : rodzaj)) return null;
    const opis = `${USTAWIENIE_PROSTYCH} ${opisKata("alpha", a)} ${opisKata("beta", b)}`;
    if (rodzaj === "stosunek") {
      const [m, n] = r.pick(STOSUNKI_180);
      const pokaz = r.chance(0.5) ? [m, n] : [n, m];
      const wiekszy = r.chance(0.5), cel = wiekszy ? n : m;
      return zad(
        `${opis} Miary kątów $\\alpha$ i $\\beta$ są w stosunku $${pokaz.join(" : ")}$. Ile stopni ma ${wiekszy ? "większy" : "mniejszy"} z tych kątów?`,
        POLE_KAT(), { kat: cel * 180 / (m + n) }, st(cel * 180 / (m + n)),
        krokiStosunek(pokaz, 180, pokaz.indexOf(cel),
          "Oba kąty leżą między prostymi $k$ i $l$ po tej samej stronie prostej $m$ – to kąty jednostronne (litera C), więc razem mają $180^\\circ$."),
      );
    }
    const x = kat5(r, 40, 140, 90), rowne = rowneKaty(a, b), y = rowne ? x : 180 - x;
    const wzor = rowne ? `$\\beta = ${sk(x)}$` : `$\\beta = 180^\\circ - ${sk(x)} = ${sk(y)}$`;
    const pb = b.p === 0 ? "A" : "B";
    const kroki = {
      odp: [
        "Kąty $\\alpha$ i $\\beta$ leżą w tym samym miejscu przy obu prostych (przy $A$ i przy $B$), więc są to kąty odpowiadające (litera F).",
        `Proste $k$ i $l$ są równoległe, więc kąty odpowiadające są równe: ${wzor}.`,
      ],
      naprz: [
        "Kąty $\\alpha$ i $\\beta$ leżą między prostymi $k$ i $l$, po przeciwnych stronach prostej $m$ – to kąty naprzemianległe (litera Z).",
        `Przy prostych równoległych kąty naprzemianległe są równe: ${wzor}.`,
      ],
      jedn: [
        "Kąty $\\alpha$ i $\\beta$ leżą między prostymi $k$ i $l$, po tej samej stronie prostej $m$ – to kąty jednostronne (litera C).",
        `Kąty jednostronne dają razem $180^\\circ$, więc ${wzor}.`,
      ],
      dwa: [
        `Przenieśmy kąt $\\alpha$ do punktu $${pb}$: kąt odpowiadający leży tam w tym samym miejscu, więc (proste są równoległe) też ma ${st(x)}.`,
        `Ten kąt i kąt $\\beta$ leżą przy tym samym punkcie $${pb}$ ${rowne ? "naprzeciw siebie, czyli są wierzchołkowe i równe" : "obok siebie, czyli są przyległe i dają razem $180^\\circ$"}.`,
        `Zatem ${wzor}.`,
      ],
    }[rodzaj];
    return zad(
      `${opis} Kąt $\\alpha$ ma ${st(x)}. Ile stopni ma kąt $\\beta$?`,
      POLE_KAT(), { kat: y }, st(y), kroki,
    );
  });
}

// --- 3. Trójkąty: kąty (trzeci kąt, równoramienny, kąt zewnętrzny, stosunek)

function trzeciKat(r) {
  return probuj(() => {
    const a = r.int(4, 24) * 5, b = r.int(4, 24) * 5;
    if (a + b > 160) return null;
    const c = 180 - a - b;
    return zad(
      `Dwa kąty trójkąta mają ${st(a)} i ${st(b)}. Ile stopni ma trzeci kąt tego trójkąta?`,
      POLE_KAT(), { kat: c }, st(c),
      [
        "Kąty każdego trójkąta dają razem $180^\\circ$.",
        `Dodajemy dwa znane kąty: $${sk(a)} + ${sk(b)} = ${sk(a + b)}$.`,
        `Trzeci kąt ma $180^\\circ - ${sk(a + b)} = ${sk(c)}$.`,
      ],
    );
  });
}

function trojkatProstokatny(r) {
  const a = r.int(3, 17) * 5, b = 90 - a;
  return zad(
    `W trójkącie prostokątnym jeden z kątów ostrych ma ${st(a)}. Ile stopni ma drugi kąt ostry?`,
    POLE_KAT(), { kat: b }, st(b),
    [
      "Jeden kąt trójkąta prostokątnego ma $90^\\circ$, a wszystkie trzy dają $180^\\circ$, więc dwa kąty ostre dają razem $180^\\circ - 90^\\circ = 90^\\circ$.",
      `Drugi kąt ostry ma $90^\\circ - ${sk(a)} = ${sk(b)}$.`,
    ],
  );
}

function trojkatRownoramienny(r) {
  const w = r.int(0, 2);
  if (w === 0) {
    const g = r.int(2, 14) * 10, a = (180 - g) / 2;
    return zad(
      `W trójkącie równoramiennym kąt między ramionami ma ${st(g)}. Ile stopni ma kąt przy podstawie?`,
      POLE_KAT(), { kat: a }, st(a),
      [
        "Kąty przy podstawie trójkąta równoramiennego są równe, a wszystkie trzy kąty dają razem $180^\\circ$.",
        `Dwa kąty przy podstawie dają razem $180^\\circ - ${sk(g)} = ${sk(180 - g)}$.`,
        `Jeden z nich ma $${sk(180 - g)} : 2 = ${sk(a)}$.`,
      ],
    );
  }
  if (w === 1) {
    const a = r.int(4, 16) * 5, g = 180 - 2 * a;
    return zad(
      `W trójkącie równoramiennym kąt przy podstawie ma ${st(a)}. Ile stopni ma kąt między ramionami?`,
      POLE_KAT(), { kat: g }, st(g),
      [
        "Kąty przy podstawie trójkąta równoramiennego są równe, więc oba mają po tyle samo stopni.",
        `Razem mają $2 \\cdot ${sk(a)} = ${sk(2 * a)}$.`,
        `Kąt między ramionami ma $180^\\circ - ${sk(2 * a)} = ${sk(g)}$.`,
      ],
    );
  }
  const g = r.int(10, 15) * 10, a = (180 - g) / 2;
  return zad(
    `Trójkąt równoramienny ma jeden kąt rozwarty, który ma ${st(g)}. Ile stopni ma każdy z pozostałych dwóch kątów?`,
    POLE_KAT(), { kat: a }, st(a),
    [
      "Kąty przy podstawie są równe. Kąt rozwarty nie może leżeć przy podstawie (dwa takie kąty miałyby razem więcej niż $180^\\circ$), więc leży między ramionami.",
      `Pozostałe dwa kąty są równe i dają razem $180^\\circ - ${sk(g)} = ${sk(180 - g)}$.`,
      `Każdy z nich ma $${sk(180 - g)} : 2 = ${sk(a)}$.`,
    ],
  );
}

function katZewnetrzny(r) {
  return probuj(() => {
    const a = r.int(3, 20) * 5, b = r.int(3, 20) * 5;
    if (a + b > 170) return null;
    const c = 180 - a - b, e = a + b;
    if (r.chance(0.6)) {
      return zad(
        `Trójkąt $ABC$ ma kąty: przy wierzchołku $A$ – ${st(a)}, przy wierzchołku $B$ – ${st(b)}. Bok $AC$ przedłużono za wierzchołek $C$. Ile stopni ma kąt zewnętrzny przy wierzchołku $C$ (kąt między przedłużeniem boku $AC$ a bokiem $BC$)?`,
        POLE_KAT(), { kat: e }, st(e),
        [
          "Kąt zewnętrzny jest równy sumie dwóch kątów trójkąta, które nie leżą przy jego wierzchołku, czyli kątów przy $A$ i $B$.",
          `Szukany kąt ma $${sk(a)} + ${sk(b)} = ${sk(e)}$.`,
          `Sprawdzenie: kąt trójkąta przy $C$ ma $180^\\circ - ${sk(e)} = ${sk(c)}$, a kąt przyległy do niego $180^\\circ - ${sk(c)} = ${sk(e)}$.`,
        ],
      );
    }
    return zad(
      `W trójkącie $ABC$ bok $AC$ przedłużono za wierzchołek $C$. Kąt zewnętrzny przy wierzchołku $C$ ma ${st(e)}, a kąt trójkąta przy wierzchołku $A$ ma ${st(a)}. Ile stopni ma kąt trójkąta przy wierzchołku $B$?`,
      POLE_KAT(), { kat: b }, st(b),
      [
        "Kąt zewnętrzny przy $C$ jest równy sumie kątów trójkąta przy $A$ i przy $B$.",
        `Czyli $${sk(e)} = ${sk(a)} + \\beta$, gdzie $\\beta$ to kąt przy $B$.`,
        `Stąd $\\beta = ${sk(e)} - ${sk(a)} = ${sk(b)}$.`,
      ],
    );
  });
}

const TROJKI_STOSUNEK = [[1, 2, 3], [1, 1, 2], [2, 3, 4], [1, 2, 6], [1, 4, 5], [2, 3, 5], [1, 3, 5], [3, 4, 5], [1, 1, 4], [2, 2, 5], [1, 3, 8], [2, 5, 5]];

function trojkatStosunek(r) {
  const cz = r.pick(TROJKI_STOSUNEK), wiekszy = r.chance(0.5), i = wiekszy ? cz.length - 1 : 0, jedna = 180 / cz.reduce((a, b) => a + b, 0);
  return zad(
    `Kąty trójkąta mają miary w stosunku $${cz.join(" : ")}$. Ile stopni ma ${wiekszy ? "największy" : "najmniejszy"} kąt tego trójkąta?`,
    POLE_KAT(), { kat: cz[i] * jedna }, st(cz[i] * jedna),
    krokiStosunek(cz, 180, i, "Kąty trójkąta dają razem $180^\\circ$."),
  );
}

function kat2RazyWiekszy(r) {
  return probuj(() => {
    const a = r.int(3, 14) * 5, d = r.int(1, 9) * 5;
    const b = a + d, c = 180 - a - b;
    if (c < 20) return null;
    return zad(
      `W trójkącie jeden kąt ma ${st(a)}, a drugi jest o ${st(d)} większy od pierwszego. Ile stopni ma trzeci kąt tego trójkąta?`,
      POLE_KAT(), { kat: c }, st(c),
      [
        `Drugi kąt ma $${sk(a)} + ${sk(d)} = ${sk(b)}$.`,
        `Dwa kąty razem mają $${sk(a)} + ${sk(b)} = ${sk(a + b)}$, a wszystkie trzy $180^\\circ$.`,
        `Trzeci kąt ma $180^\\circ - ${sk(a + b)} = ${sk(c)}$.`,
      ],
    );
  });
}

function trojkatyKaty(r) {
  return losuj(r, [[18, trzeciKat], [10, trojkatProstokatny], [24, trojkatRownoramienny], [18, katZewnetrzny], [18, trojkatStosunek], [12, kat2RazyWiekszy]]);
}

// --- 4. Trójkąty: nierówność trójkąta, obwód trójkąta równoramiennego, rodzaje trójkątów, zdania prawda/fałsz

function ktoreBoki(r) {
  return probuj(() => {
    const a = r.int(2, 9), b = r.int(a, 12), c = r.int(b, a + b - 1);
    const zle = [];
    for (let i = 0; i < 3; i++) {
      const x = r.int(2, 9), y = r.int(x, 12);
      zle.push([x, y, x + y + (i === 0 ? 0 : r.int(0, 3))]);
    }
    const tex = (t) => `$${t.join(",\\ ")}$`;
    const m = mieszaj(r, tex([a, b, c]), zle.map(tex));
    if (!m) return null;
    const kroki = ["Z trzech odcinków zbudujemy trójkąt, gdy dwa krótsze razem są dłuższe od najdłuższego."];
    for (const op of m.opcje) {
      const t = op.slice(1, -1).split(",\\ ").map(Number), s = t[0] + t[1];
      kroki.push(`${op}: $${t[0]} + ${t[1]} = ${s}$, ${s > t[2] ? `a $${s} > ${t[2]}$ – trójkąt istnieje` : s === t[2] ? `a to nie jest więcej niż $${t[2]}$ – wyszedłby płaski odcinek, więc trójkąta nie ma` : `a $${s} < ${t[2]}$ – trójkąta nie ma`}.`);
    }
    return zad(
      "Które trzy odcinki (długości podano w centymetrach) mogą być bokami trójkąta?",
      [polew("boki", "Długości odcinków", m.opcje)], { boki: m.ind }, tex([a, b, c]), kroki,
    );
  });
}

function trzeciBokCalkowity(r) {
  const a = r.int(3, 9), b = r.int(a + 1, 14), s = a + b, d = b - a;
  const typ = r.pick(["ile", "max", "min"]);
  const wart = [];
  for (let c = d + 1; c < s; c++) wart.push(c);
  const lista = wart.length <= 6 ? wart.join(", ") : `${wart[0]}, ${wart[1]}, \\ldots, ${wart[wart.length - 1]}`;
  const pyt = { ile: "Ile różnych długości (w centymetrach) może mieć trzeci bok, jeśli jego długość jest liczbą całkowitą?", max: "Jaka jest największa możliwa długość trzeciego boku (w centymetrach), jeśli jest ona liczbą całkowitą?", min: "Jaka jest najmniejsza możliwa długość trzeciego boku (w centymetrach), jeśli jest ona liczbą całkowitą?" }[typ];
  const odp = { ile: wart.length, max: s - 1, min: d + 1 }[typ];
  const et = { ile: "Liczba możliwych długości", max: "Największa długość (w cm)", min: "Najmniejsza długość (w cm)" }[typ];
  return zad(
    `Dwa boki trójkąta mają długości $${a}$ cm i $${b}$ cm. ${pyt}`,
    [pole("wynik", et)], { wynik: odp }, `$${odp}$`,
    [
      `Trzeci bok $c$ musi być krótszy od sumy dwóch pozostałych: $c < ${a} + ${b} = ${s}$.`,
      `Musi też być dłuższy od ich różnicy: $c > ${b} - ${a} = ${d}$ (inaczej boki $${a}$ i $c$ razem nie przekroczyłyby $${b}$).`,
      `Zatem $${d} < c < ${s}$, czyli całkowite $c$ to $${lista}$.`,
      typ === "ile" ? `Takich liczb jest $${s - 1} - ${d} = ${odp}$.` : typ === "max" ? `Największa z nich to $${odp}$.` : `Najmniejsza z nich to $${odp}$.`,
    ],
  );
}

function obwodRownoramienny(r) {
  const s = r.int(2, 9), L = r.int(2 * s, Math.min(2 * s + 12, 24)), P = 2 * L + s;
  return zad(
    `Trójkąt równoramienny ma dwa boki o długościach $${s}$ cm i $${L}$ cm. Ile centymetrów wynosi obwód tego trójkąta?`,
    [pole("wynik", "Obwód (w cm)")], { wynik: P }, `$${P}$ cm`,
    [
      `Spróbujmy ramion długości $${s}$: boki $${s}$, $${s}$, $${L}$. Dwa krótsze razem mają $${s} + ${s} = ${2 * s}$, a to nie jest więcej niż $${L}$ – takiego trójkąta nie ma.`,
      `Zatem ramiona mają po $${L}$ cm, a podstawa $${s}$ cm (boki $${L}$, $${L}$, $${s}$ – trójkąt istnieje, bo $${s} + ${L} > ${L}$).`,
      `Obwód: $${L} + ${L} + ${s} = ${P}$.`,
    ],
  );
}

const KATOWY = (m) => (m < 90 ? "ostrokątny" : m === 90 ? "prostokątny" : "rozwartokątny");
const TROJKATY_KATY = [[40, 40, 100], [50, 50, 80], [70, 70, 40], [45, 45, 90], [30, 60, 90], [30, 30, 120], [20, 80, 80], [25, 65, 90], [35, 55, 90], [50, 60, 70], [20, 40, 120], [35, 35, 110], [40, 60, 80], [55, 55, 70], [65, 65, 50]];

function rodzajTrojkata(r) {
  const k = r.shuffle(r.pick(TROJKATY_KATY)), kat = KATOWY(Math.max(...k));
  const rowne = new Set(k).size === 2;
  const boczny = rowne ? "równoramienny" : "różnoboczny";
  const poprawna = `${kat} i ${boczny}`;
  const wszystkie = [];
  for (const a of ["ostrokątny", "prostokątny", "rozwartokątny"]) for (const b of ["równoramienny", "różnoboczny"]) wszystkie.push(`${a} i ${b}`);
  const m = mieszaj(r, poprawna, r.shuffle(wszystkie.filter((o) => o !== poprawna)).slice(0, 3));
  const wiekszy = Math.max(...k);
  const pary = [...new Set(k)].find((x) => k.filter((y) => y === x).length === 2);
  return zad(
    `Trójkąt ma kąty ${wypisz(k.map(st))}. Który opis tego trójkąta jest prawdziwy?`,
    [polew("rodzaj", "Rodzaj trójkąta", m.opcje)], { rodzaj: m.ind }, poprawna,
    [
      `Największy kąt ma ${st(wiekszy)}, ${wiekszy < 90 ? "czyli wszystkie kąty są ostre" : wiekszy === 90 ? "czyli to kąt prosty" : "czyli to kąt rozwarty"}, więc trójkąt jest ${kat}.`,
      rowne
        ? `Dwa kąty są równe (po ${st(pary)}), więc trójkąt ma dwa równe boki – jest równoramienny.`
        : "Wszystkie kąty są różne, więc wszystkie boki też są różne – trójkąt jest różnoboczny.",
      `Prawdziwy opis: ${poprawna}.`,
    ],
  );
}

const ZDANIA_TROJKATY = [
  { t: "Każdy trójkąt równoboczny jest trójkątem równoramiennym.", ok: true, why: "prawda: trójkąt równoboczny ma trzy równe boki, więc ma też dwa równe boki." },
  { t: "W trójkącie prostokątnym dwa kąty ostre dają razem $90^\\circ$.", ok: true, why: "prawda: trzeci kąt ma $90^\\circ$, a wszystkie trzy dają $180^\\circ$." },
  { t: "Trójkąt może mieć kąt rozwarty.", ok: true, why: "prawda: na przykład trójkąt o kątach $100^\\circ$, $40^\\circ$, $40^\\circ$." },
  { t: "Kąty przy podstawie trójkąta równoramiennego są równe.", ok: true, why: "prawda: trójkąt równoramienny wygląda tak samo z lewej i z prawej strony." },
  { t: "Każdy kąt trójkąta równobocznego ma $60^\\circ$.", ok: true, why: "prawda: $180^\\circ : 3 = 60^\\circ$." },
  { t: "Kąt zewnętrzny trójkąta jest równy sumie dwóch kątów trójkąta, które nie leżą przy jego wierzchołku.", ok: true, why: "prawda: np. przy kątach $40^\\circ$ i $75^\\circ$ kąt zewnętrzny przy trzecim wierzchołku ma $115^\\circ$." },
  { t: "Każdy trójkąt ma co najmniej dwa kąty ostre.", ok: true, why: "prawda: gdyby dwa kąty miały co najmniej $90^\\circ$, razem miałyby co najmniej $180^\\circ$ i na trzeci nic by nie zostało." },
  { t: "Dwa trójkąty o odpowiednio równych trzech bokach są przystające.", ok: true, why: "prawda: to cecha BBB." },
  { t: "Z odcinków o długościach $3$, $4$ i $5$ można zbudować trójkąt.", ok: true, why: "prawda: $3 + 4 = 7$, a $7 > 5$." },
  { t: "Trójkąt prostokątny może być równoramienny.", ok: true, why: "prawda: ma wtedy kąty $45^\\circ$, $45^\\circ$, $90^\\circ$." },
  { t: "Trójkąt, w którym dwa kąty mają $40^\\circ$ i $50^\\circ$, jest prostokątny.", ok: true, why: "prawda: trzeci kąt ma $180^\\circ - 40^\\circ - 50^\\circ = 90^\\circ$." },
  { t: "Trójkąt może mieć dwa kąty rozwarte.", ok: false, why: "fałsz: dwa kąty większe od $90^\\circ$ dają razem więcej niż $180^\\circ$." },
  { t: "Suma kątów trójkąta wynosi $360^\\circ$.", ok: false, why: "fałsz: wynosi $180^\\circ$, a $360^\\circ$ to suma kątów czworokąta." },
  { t: "Każdy trójkąt równoramienny jest równoboczny.", ok: false, why: "fałsz: trójkąt o bokach $5$, $5$, $8$ jest równoramienny, ale nie równoboczny." },
  { t: "Trójkąt prostokątny nie może być równoramienny.", ok: false, why: "fałsz: trójkąt o kątach $45^\\circ$, $45^\\circ$, $90^\\circ$ jest prostokątny i równoramienny." },
  { t: "Trójkąty o takich samych kątach są zawsze przystające.", ok: false, why: "fałsz: trójkąty o bokach $3$, $4$, $5$ oraz $6$, $8$, $10$ mają takie same kąty, a nie są przystające." },
  { t: "Z odcinków o długościach $2$, $3$ i $6$ można zbudować trójkąt.", ok: false, why: "fałsz: $2 + 3 = 5$, a $5 < 6$." },
  { t: "Kąt zewnętrzny trójkąta zawsze ma mniej niż $90^\\circ$.", ok: false, why: "fałsz: gdy kąt trójkąta ma $50^\\circ$, kąt zewnętrzny przy nim ma $130^\\circ$." },
  { t: "Trójkąt równoramienny ma zawsze trzy równe kąty.", ok: false, why: "fałsz: ma dwa równe kąty przy podstawie, a trzeci zwykle jest inny." },
  { t: "Z odcinków o długościach $4$, $4$ i $8$ można zbudować trójkąt.", ok: false, why: "fałsz: $4 + 4 = 8$, a to nie jest więcej niż $8$ (wyszedłby płaski odcinek)." },
  { t: "Dwa trójkąty, które mają po dwa takie same boki, są zawsze przystające.", ok: false, why: "fałsz: potrzebny jest jeszcze równy kąt między tymi bokami (cecha BKB)." },
  { t: "Trójkąt o kątach $30^\\circ$, $60^\\circ$, $90^\\circ$ jest równoramienny.", ok: false, why: "fałsz: ma trzy różne kąty, więc jest różnoboczny." },
];

function trojkatyNierownosc(r) {
  return losuj(r, [[24, ktoreBoki], [18, trzeciBokCalkowity], [14, obwodRownoramienny], [14, rodzajTrojkata], [30, (rr) => zdaniaWybor(rr, ZDANIA_TROJKATY, "o trójkątach")]]);
}

// --- 5. Czworokąty: kąty równoległoboku, rombu i trapezu, suma kątów, stosunek

function sumaCzworokata(r) {
  return probuj(() => {
    const k = [r.int(5, 13) * 10, r.int(5, 13) * 10, r.int(5, 13) * 10], S = k[0] + k[1] + k[2], x = 360 - S;
    if (x < 30 || x > 170) return null;
    return zad(
      `Trzy kąty czworokąta mają ${wypisz(k.map(st))}. Ile stopni ma czwarty kąt?`,
      POLE_KAT(), { kat: x }, st(x),
      [
        "Przekątna dzieli czworokąt na dwa trójkąty, więc jego kąty dają razem $2 \\cdot 180^\\circ = 360^\\circ$.",
        `Trzy znane kąty dają razem $${k.map(sk).join(" + ")} = ${sk(S)}$.`,
        `Czwarty kąt ma $360^\\circ - ${sk(S)} = ${sk(x)}$.`,
      ],
    );
  });
}

function katyRownoleglobok(r) {
  const a = kat5(r, 40, 140, 90);
  const romb = r.chance(0.4), fig = romb ? "rombie" : "równoległoboku";
  const W = r.pick(["B", "C", "D"]), naprzeciw = W === "C";
  const y = naprzeciw ? a : 180 - a;
  return zad(
    `W ${fig} $ABCD$ kąt przy wierzchołku $A$ ma ${st(a)}. Ile stopni ma kąt przy wierzchołku $${W}$?`,
    POLE_KAT(), { kat: y }, st(y),
    naprzeciw
      ? [
        `Wierzchołki $A$ i $C$ leżą naprzeciw siebie, więc kąty przy nich to kąty przeciwległe.`,
        `W ${romb ? "rombie (jest on równoległobokiem)" : "równoległoboku"} kąty przeciwległe są równe, więc kąt przy $C$ ma ${st(a)}.`,
      ]
      : [
        `Wierzchołki $A$ i $${W}$ są sąsiednie (leżą obok siebie), więc kąty przy nich to kąty sąsiednie.`,
        `W ${romb ? "rombie (jest on równoległobokiem)" : "równoległoboku"} kąty sąsiednie dają razem $180^\\circ$.`,
        `Kąt przy $${W}$ ma $180^\\circ - ${sk(a)} = ${sk(y)}$.`,
      ],
  );
}

function katyTrapezRownoramienny(r) {
  const a = kat5(r, 50, 130, 90), W = r.pick(["B", "C", "D"]);
  const y = W === "B" ? a : 180 - a;
  const kroki = {
    B: [
      "Trapez jest równoramienny, więc kąty przy tej samej podstawie są równe.",
      `Kąty przy wierzchołkach $A$ i $B$ leżą przy podstawie $AB$, więc kąt przy $B$ ma ${st(a)}.`,
    ],
    D: [
      "Kąty przy tym samym ramieniu trapezu dają razem $180^\\circ$. Wierzchołki $A$ i $D$ są końcami ramienia $AD$.",
      `Kąt przy $D$ ma $180^\\circ - ${sk(a)} = ${sk(y)}$.`,
    ],
    C: [
      "Kąty przy wierzchołkach $A$ i $D$ leżą przy tym samym ramieniu $AD$, więc dają razem $180^\\circ$.",
      `Kąt przy $D$ ma $180^\\circ - ${sk(a)} = ${sk(y)}$.`,
      `Kąty $C$ i $D$ leżą przy tej samej podstawie $CD$ trapezu równoramiennego, więc kąt przy $C$ też ma ${st(y)}.`,
    ],
  }[W];
  return zad(
    `Trapez równoramienny $ABCD$ ma podstawy $AB$ i $CD$. Kąt przy wierzchołku $A$ ma ${st(a)}. Ile stopni ma kąt przy wierzchołku $${W}$?`,
    POLE_KAT(), { kat: y }, st(y), kroki,
  );
}

function trapezProstokatny(r) {
  const a = r.int(8, 16) * 5, y = 180 - a;
  return zad(
    `Trapez prostokątny ma dwa kąty proste. Jego kąt ostry ma ${st(a)}. Ile stopni ma kąt rozwarty tego trapezu?`,
    POLE_KAT(), { kat: y }, st(y),
    [
      "Kąty ostry i rozwarty leżą przy tym samym ramieniu (nieprostopadłym do podstaw), więc dają razem $180^\\circ$.",
      `Kąt rozwarty ma $180^\\circ - ${sk(a)} = ${sk(y)}$.`,
      `Sprawdzenie: $90^\\circ + 90^\\circ + ${sk(a)} + ${sk(y)} = 360^\\circ$.`,
    ],
  );
}

function rownoleglobokStosunek(r) {
  const [m, n] = r.pick(STOSUNKI_180);
  const pokaz = r.chance(0.5) ? [m, n] : [n, m];
  const wiekszy = r.chance(0.5), cel = wiekszy ? n : m, jedna = 180 / (m + n);
  return zad(
    `Dwa sąsiednie kąty równoległoboku mają miary w stosunku $${pokaz.join(" : ")}$. Ile stopni ma ${wiekszy ? "większy" : "mniejszy"} z tych kątów?`,
    POLE_KAT(), { kat: cel * jedna }, st(cel * jedna),
    krokiStosunek(pokaz, 180, pokaz.indexOf(cel), "Sąsiednie kąty równoległoboku dają razem $180^\\circ$."),
  );
}

const STOSUNKI_CZWOROKAT = [[1, 2, 3, 4], [1, 2, 4, 5], [2, 3, 3, 4], [1, 2, 2, 3], [1, 1, 3, 3], [2, 2, 3, 3], [1, 3, 4, 4], [1, 1, 2, 2]];

function czworokatStosunek(r) {
  const cz = r.pick(STOSUNKI_CZWOROKAT), wiekszy = r.chance(0.5), i = wiekszy ? cz.length - 1 : 0, jedna = 360 / cz.reduce((a, b) => a + b, 0);
  return zad(
    `Kąty czworokąta mają miary w stosunku $${cz.join(" : ")}$. Ile stopni ma ${wiekszy ? "największy" : "najmniejszy"} kąt tego czworokąta?`,
    POLE_KAT(), { kat: cz[i] * jedna }, st(cz[i] * jedna),
    krokiStosunek(cz, 360, i, "Kąty czworokąta dają razem $360^\\circ$."),
  );
}

function czworokatyKaty(r) {
  return losuj(r, [[14, sumaCzworokata], [26, katyRownoleglobok], [20, katyTrapezRownoramienny], [8, trapezProstokatny], [12, rownoleglobokStosunek], [16, czworokatStosunek]]);
}

// --- 6. Wielokąty: suma kątów, wielokąt foremny, własności czworokątów (prawda/fałsz)

const WIELOKATY = {
  5: ["pięciokąta", "pięciokąt foremny", "pięciokąta foremnego"], 6: ["sześciokąta", "sześciokąt foremny", "sześciokąta foremnego"],
  7: ["siedmiokąta", "siedmiokąt foremny", "siedmiokąta foremnego"], 8: ["ośmiokąta", "ośmiokąt foremny", "ośmiokąta foremnego"],
  9: ["dziewięciokąta", "dziewięciokąt foremny", "dziewięciokąta foremnego"], 10: ["dziesięciokąta", "dziesięciokąt foremny", "dziesięciokąta foremnego"],
  12: ["dwunastokąta", "dwunastokąt foremny", "dwunastokąta foremnego"],
};

function sumaKatowWielokata(r) {
  const n = r.pick([5, 6, 7, 8, 9, 10, 12]), S = (n - 2) * 180;
  return zad(
    `Ile stopni wynosi suma kątów wewnętrznych ${WIELOKATY[n][0]} (wypukłego)?`,
    POLE_KAT(), { kat: S }, st(S),
    [
      `Przekątne poprowadzone z jednego wierzchołka dzielą ${WIELOKATY[n][0].slice(0, -1)} na $${n} - 2 = ${n - 2}$ ${lm(n - 2, ["trójkąt", "trójkąty", "trójkątów"])}.`,
      `Każdy trójkąt ma $180^\\circ$, więc suma kątów to $(${n} - 2) \\cdot 180^\\circ = ${n - 2} \\cdot 180^\\circ = ${sk(S)}$.`,
    ],
  );
}

function katWielokataForemnego(r) {
  const n = r.pick([5, 6, 8, 9, 10, 12]), S = (n - 2) * 180, a = S / n;
  return zad(
    `Ile stopni ma jeden kąt wewnętrzny ${WIELOKATY[n][2]}?`,
    POLE_KAT(), { kat: a }, st(a),
    [
      `Suma kątów ${WIELOKATY[n][0]} to $(${n} - 2) \\cdot 180^\\circ = ${sk(S)}$.`,
      `W wielokącie foremnym wszystkie kąty są równe, więc jeden kąt ma $${sk(S)} : ${n} = ${sk(a)}$.`,
    ],
  );
}

function brakujacyKatWielokata(r) {
  return probuj(() => {
    const n = r.chance(0.6) ? 5 : 6, S = (n - 2) * 180, znane = n - 1;
    const rowne = r.chance(0.35);
    const k = rowne ? Array(znane).fill(r.int(8, 14) * 10) : Array.from({ length: znane }, () => r.int(8, 15) * 10);
    const sum = k.reduce((a, b) => a + b, 0), x = S - sum;
    if (x < 60 || x > 170) return null;
    const nazwa = n === 5 ? "pięciokąta" : "sześciokąta";
    const opis = rowne
      ? `${n === 5 ? "Cztery" : "Pięć"} kątów ${nazwa} ma po ${st(k[0])}`
      : `${n === 5 ? "Cztery" : "Pięć"} kątów ${nazwa} ma miary ${wypisz(k.map(st))}`;
    return zad(
      `${opis}. Ile stopni ma ${n === 5 ? "piąty" : "szósty"} kąt?`,
      POLE_KAT(), { kat: x }, st(x),
      [
        `Suma kątów ${nazwa} to $(${n} - 2) \\cdot 180^\\circ = ${n - 2} \\cdot 180^\\circ = ${sk(S)}$.`,
        rowne ? `Znane kąty dają razem $${znane} \\cdot ${sk(k[0])} = ${sk(sum)}$.` : `Znane kąty dają razem $${k.map(sk).join(" + ")}$, czyli $${sk(sum)}$.`,
        `Brakujący kąt ma $${sk(S)} - ${sk(sum)} = ${sk(x)}$.`,
      ],
    );
  });
}

function ileBokowZSumy(r) {
  if (r.chance(0.5)) {
    const n = r.int(5, 12), S = (n - 2) * 180;
    return zad(
      `Suma kątów wewnętrznych pewnego wielokąta wypukłego wynosi ${st(S)}. Ile boków ma ten wielokąt?`,
      [pole("n", "Liczba boków")], { n }, `$${n}$`,
      [
        "Suma kątów wielokąta o $n$ bokach to $(n - 2) \\cdot 180^\\circ$.",
        `Dzielimy: $${sk(S)} : 180^\\circ = ${n - 2}$, więc $n - 2 = ${n - 2}$.`,
        `Zatem $n = ${n - 2} + 2 = ${n}$.`,
      ],
    );
  }
  const n = r.pick([3, 4, 5, 6, 8]), a = (n - 2) * 180 / n;
  return zad(
    `Jeden kąt wewnętrzny wielokąta foremnego ma ${st(a)}. Ile boków ma ten wielokąt?`,
    [pole("n", "Liczba boków")], { n }, `$${n}$`,
    [
      "Kąt wielokąta foremnego o $n$ bokach to $\\frac{(n - 2) \\cdot 180^\\circ}{n}$. Wypróbujmy kolejne wielokąty.",
      `Trójkąt: $60^\\circ$, czworokąt: $90^\\circ$, pięciokąt: $108^\\circ$, sześciokąt: $120^\\circ$, ośmiokąt: $135^\\circ$.`,
      `Kąt ${st(a)} ma wielokąt foremny o $${n}$ bokach. Sprawdzenie: $(${n} - 2) \\cdot 180^\\circ : ${n} = ${sk((n - 2) * 180)} : ${n} = ${sk(a)}$.`,
    ],
  );
}

const ZDANIA_CZWOROKATY = [
  { t: "Przekątne prostokąta mają równe długości.", ok: true, why: "prawda: np. w prostokącie $3 \\times 4$ obie przekątne mają $5$." },
  { t: "Przekątne rombu są prostopadłe.", ok: true, why: "prawda: przecinają się pod kątem prostym i dzielą się na pół." },
  { t: "Każdy kwadrat jest rombem.", ok: true, why: "prawda: kwadrat ma cztery równe boki." },
  { t: "Każdy prostokąt jest równoległobokiem.", ok: true, why: "prawda: jego przeciwległe boki są równoległe." },
  { t: "Przekątne równoległoboku dzielą się na połowy.", ok: true, why: "prawda: w punkcie przecięcia każda przekątna jest przepołowiona." },
  { t: "W równoległoboku kąty leżące naprzeciw siebie są równe.", ok: true, why: "prawda: np. dwa kąty po $70^\\circ$ i dwa po $110^\\circ$." },
  { t: "Przekątne kwadratu są równe i prostopadłe.", ok: true, why: "prawda: kwadrat ma cechy prostokąta i rombu naraz." },
  { t: "W trapezie równoramiennym kąty przy tej samej podstawie są równe.", ok: true, why: "prawda: tak wygląda trapez równoramienny." },
  { t: "Każdy równoległobok jest trapezem.", ok: true, why: "prawda: ma parę boków równoległych (nawet dwie)." },
  { t: "Suma kątów w każdym czworokącie wynosi $360^\\circ$.", ok: true, why: "prawda: przekątna dzieli czworokąt na dwa trójkąty, a $2 \\cdot 180^\\circ = 360^\\circ$." },
  { t: "Przekątne trapezu równoramiennego mają równe długości.", ok: true, why: "prawda: to jedna z cech tego trapezu." },
  { t: "Kąty sąsiednie równoległoboku dają razem $180^\\circ$.", ok: true, why: "prawda: np. $70^\\circ + 110^\\circ = 180^\\circ$." },
  { t: "Każdy romb jest równoległobokiem.", ok: true, why: "prawda: jego przeciwległe boki są równoległe." },
  { t: "Przekątne prostokąta są zawsze prostopadłe.", ok: false, why: "fałsz: są prostopadłe tylko w kwadracie; w prostokącie $3 \\times 4$ nie są." },
  { t: "Przekątne rombu zawsze mają równe długości.", ok: false, why: "fałsz: w rombie o przekątnych $6$ i $8$ nie są równe (równe są tylko w kwadracie)." },
  { t: "Każdy romb jest kwadratem.", ok: false, why: "fałsz: romb z kątem $60^\\circ$ nie ma kątów prostych." },
  { t: "Każdy prostokąt jest kwadratem.", ok: false, why: "fałsz: prostokąt $3 \\times 4$ nie ma równych boków." },
  { t: "Każdy trapez jest równoległobokiem.", ok: false, why: "fałsz: trapez może mieć tylko jedną parę boków równoległych." },
  { t: "W każdym równoległoboku wszystkie cztery kąty są równe.", ok: false, why: "fałsz: tak jest tylko w prostokącie; zwykle dwa kąty są ostre, a dwa rozwarte." },
  { t: "Każdy równoległobok ma cztery równe boki.", ok: false, why: "fałsz: tak jest tylko w rombie; prostokąt $3 \\times 4$ ma boki różne." },
  { t: "Przekątne każdego równoległoboku mają równe długości.", ok: false, why: "fałsz: mają takie same tylko w prostokącie (i kwadracie)." },
  { t: "Suma kątów czworokąta wynosi $180^\\circ$.", ok: false, why: "fałsz: wynosi $360^\\circ$, a $180^\\circ$ to suma kątów trójkąta." },
  { t: "W trapezie równoramiennym wszystkie cztery kąty są równe.", ok: false, why: "fałsz: kąty przy jednej podstawie są równe, ale przy drugiej mają inną miarę." },
  { t: "Kąty przy tym samym ramieniu trapezu są równe.", ok: false, why: "fałsz: dają razem $180^\\circ$." },
  { t: "Każdy czworokąt ma dwie pary boków równoległych.", ok: false, why: "fałsz: trapez ma tylko jedną parę boków równoległych." },
  { t: "Kwadrat nie jest prostokątem.", ok: false, why: "fałsz: kwadrat ma cztery kąty proste, więc jest prostokątem." },
  { t: "Przekątne każdego równoległoboku są prostopadłe.", ok: false, why: "fałsz: są prostopadłe tylko w rombie (i kwadracie)." },
];

function wielokatyIZdania(r) {
  return losuj(r, [
    [12, sumaKatowWielokata], [16, katWielokataForemnego], [14, brakujacyKatWielokata], [14, ileBokowZSumy],
    [44, (rr) => zdaniaWybor(rr, ZDANIA_CZWOROKATY, "o czworokątach")],
  ]);
}

// --- 7. Pola i obwody: prostokąt, kwadrat, trójkąt, równoległobok, romb, trapez

const JEDN = [{ d: "cm", p: "\\text{cm}^2" }, { d: "cm", p: "\\text{cm}^2" }, { d: "m", p: "\\text{m}^2" }, { d: "dm", p: "\\text{dm}^2" }];
/** Długość z jednostką: „$8$ cm”; pole: „$40\ \text{cm}^2$”. */
const dl = (x, u) => `$${dz(x)}$ ${u.d}`;
const pl = (x, u) => `$${dz(x)}\\ ${u.p}$`;
const polePole = (u) => [pole("wynik", `Pole (w $${u.p}$)`)];
const poleDl = (u, co) => [pole("wynik", `${co} (w ${u.d})`)];

function prostokatPoleObwod(r) {
  const u = r.pick(JEDN), a = r.int(3, 15), b = r.intBez(2, 12, a);
  if (r.chance(0.5)) {
    return zad(`Prostokąt ma boki długości ${dl(a, u)} i ${dl(b, u)}. Oblicz jego pole.`, polePole(u), { wynik: a * b }, pl(a * b, u),
      [`Pole prostokąta to bok razy bok.`, `$P = ${a} \\cdot ${b} = ${a * b}$, czyli ${pl(a * b, u)}.`]);
  }
  return zad(`Prostokąt ma boki długości ${dl(a, u)} i ${dl(b, u)}. Oblicz jego obwód.`, poleDl(u, "Obwód"), { wynik: 2 * (a + b) }, dl(2 * (a + b), u),
    [`Obwód to suma długości wszystkich czterech boków: dwa boki po ${dl(a, u)} i dwa po ${dl(b, u)}.`, `$2 \\cdot ${a} + 2 \\cdot ${b} = ${2 * a} + ${2 * b} = ${2 * (a + b)}$.`]);
}

function prostokatBrakujacyBok(r) {
  const u = r.pick(JEDN), a = r.int(3, 14), b = r.intBez(2, 12, a);
  if (r.chance(0.5)) {
    return zad(
      `Pole prostokąta wynosi ${pl(a * b, u)}, a jeden z jego boków ma ${dl(a, u)}. Ile ${u.d === "m" ? "metrów" : u.d === "dm" ? "decymetrów" : "centymetrów"} ma drugi bok?`,
      poleDl(u, "Drugi bok"), { wynik: b }, dl(b, u),
      [`Pole prostokąta to $a \\cdot b$, więc drugi bok to pole podzielone przez znany bok.`, `$${a * b} : ${a} = ${b}$.`, `Sprawdzenie: $${a} \\cdot ${b} = ${a * b}$ – zgadza się.`],
    );
  }
  return zad(
    `Obwód prostokąta wynosi ${dl(2 * (a + b), u)}, a jeden z jego boków ma ${dl(a, u)}. Ile ${u.d === "m" ? "metrów" : u.d === "dm" ? "decymetrów" : "centymetrów"} ma drugi bok?`,
    poleDl(u, "Drugi bok"), { wynik: b }, dl(b, u),
    [`Obwód to $2a + 2b$, więc suma dwóch sąsiednich boków to połowa obwodu: $${2 * (a + b)} : 2 = ${a + b}$.`, `Drugi bok ma $${a + b} - ${a} = ${b}$.`],
  );
}

function kwadratPoleObwod(r) {
  const u = r.pick(JEDN), a = r.int(2, 15);
  if (r.chance(0.5)) {
    return zad(`Obwód kwadratu wynosi ${dl(4 * a, u)}. Oblicz pole tego kwadratu.`, polePole(u), { wynik: a * a }, pl(a * a, u),
      [`Kwadrat ma cztery równe boki, więc bok ma $${4 * a} : 4 = ${a}$.`, `Pole kwadratu to $a \\cdot a = ${a} \\cdot ${a} = ${a * a}$.`]);
  }
  return zad(`Pole kwadratu wynosi ${pl(a * a, u)}. Oblicz obwód tego kwadratu.`, poleDl(u, "Obwód"), { wynik: 4 * a }, dl(4 * a, u),
    [`Pole kwadratu to $a \\cdot a$. Szukamy liczby, która pomnożona przez siebie daje $${a * a}$: bok ma $${a}$.`, `Obwód to $4 \\cdot ${a} = ${4 * a}$.`]);
}

function trojkatPole(r) {
  const u = r.pick(JEDN);
  return probuj(() => {
    const a = r.int(3, 16), h = r.int(2, 12);
    if ((a * h) % 2) return null;
    const P = a * h / 2, w = r.int(0, 2);
    if (w === 0) {
      return zad(`Trójkąt ma bok długości ${dl(a, u)} i wysokość ${dl(h, u)} opuszczoną na ten bok. Oblicz pole tego trójkąta.`, polePole(u), { wynik: P }, pl(P, u),
        [`Pole trójkąta to połowa podstawy razy wysokość: $P = \\frac{a \\cdot h}{2}$.`, `$P = \\frac{${a} \\cdot ${h}}{2} = \\frac{${a * h}}{2} = ${P}$.`]);
    }
    if (w === 1) {
      return zad(`Pole trójkąta wynosi ${pl(P, u)}, a jeden z jego boków ma ${dl(a, u)}. Oblicz wysokość opuszczoną na ten bok.`, poleDl(u, "Wysokość"), { wynik: h }, dl(h, u),
        [`Ze wzoru $P = \\frac{a \\cdot h}{2}$ mamy $a \\cdot h = 2P = 2 \\cdot ${P} = ${a * h}$.`, `$h = ${a * h} : ${a} = ${h}$.`]);
    }
    return zad(`Trójkąt prostokątny ma przyprostokątne długości ${dl(a, u)} i ${dl(h, u)}. Oblicz jego pole.`, polePole(u), { wynik: P }, pl(P, u),
      [`W trójkącie prostokątnym jedna przyprostokątna jest wysokością opuszczoną na drugą.`, `$P = \\frac{${a} \\cdot ${h}}{2} = ${P}$.`]);
  });
}

function rownoleglobokPole(r) {
  const u = r.pick(JEDN), a = r.int(3, 14), h = r.int(2, 10), w = r.int(0, 2);
  if (w === 0) {
    return zad(`Równoległobok ma bok długości ${dl(a, u)} i wysokość ${dl(h, u)} opuszczoną na ten bok. Oblicz pole tego równoległoboku.`, polePole(u), { wynik: a * h }, pl(a * h, u),
      [`Pole równoległoboku to bok razy wysokość opuszczona na ten bok: $P = a \\cdot h$.`, `$P = ${a} \\cdot ${h} = ${a * h}$.`]);
  }
  if (w === 1) {
    return zad(`Pole równoległoboku wynosi ${pl(a * h, u)}, a jeden z jego boków ma ${dl(a, u)}. Oblicz wysokość opuszczoną na ten bok.`, poleDl(u, "Wysokość"), { wynik: h }, dl(h, u),
      [`Ze wzoru $P = a \\cdot h$ mamy $h = P : a$.`, `$h = ${a * h} : ${a} = ${h}$.`]);
  }
  const b = r.intBez(h + 1, 14, a);
  return zad(`Równoległobok ma boki długości ${dl(a, u)} i ${dl(b, u)}. Wysokość opuszczona na bok długości ${dl(a, u)} ma ${dl(h, u)}. Oblicz pole tego równoległoboku.`, polePole(u), { wynik: a * h }, pl(a * h, u),
    [`Wysokość opuszczona na bok $${a}$ jest prostopadła do tego boku, więc to bok $${a}$ jest podstawą dla tej wysokości.`, `$P = ${a} \\cdot ${h} = ${a * h}$. (Boku $${b}$ nie mnożymy przez tę wysokość.)`]);
}

/** Połówki przekątnych rombu (x, y) i bok z (trójki pitagorejskie): przekątne 2x i 2y. */
const POLOWKI_ROMBU = [[3, 4, 5], [4, 3, 5], [6, 8, 10], [5, 12, 13], [12, 5, 13], [9, 12, 15], [8, 15, 17], [15, 8, 17], [12, 16, 20], [10, 24, 26]];

function rombZPrzekatnych(r) {
  const u = r.pick(JEDN), w = r.int(0, 3);
  if (w === 3) {
    const [x, y, z] = r.pick(POLOWKI_ROMBU);
    return zad(`Romb ma przekątne długości ${dl(2 * x, u)} i ${dl(2 * y, u)}. Oblicz obwód tego rombu.`, poleDl(u, "Obwód"), { wynik: 4 * z }, dl(4 * z, u),
      [`Przekątne rombu są prostopadłe i dzielą się na pół, więc ich połówki mają $${x}$ i $${y}$.`,
        `Bok rombu to przeciwprostokątna trójkąta o przyprostokątnych $${x}$ i $${y}$: $\\sqrt{${x * x} + ${y * y}} = \\sqrt{${z * z}} = ${z}$.`,
        `Romb ma cztery równe boki, więc obwód to $4 \\cdot ${z} = ${4 * z}$.`]);
  }
  return probuj(() => {
    const e = r.int(3, 12) * 2, f = r.intBez(2, 10, e / 2) * 2;
    const P = e * f / 2;
    if (w === 0) {
      return zad(`Romb ma przekątne długości ${dl(e, u)} i ${dl(f, u)}. Oblicz pole tego rombu.`, polePole(u), { wynik: P }, pl(P, u),
        [`Pole rombu to połowa iloczynu przekątnych: $P = \\frac{e \\cdot f}{2}$.`, `$P = \\frac{${e} \\cdot ${f}}{2} = \\frac{${e * f}}{2} = ${P}$.`]);
    }
    if (w === 1) {
      return zad(`Pole rombu wynosi ${pl(P, u)}, a jedna z jego przekątnych ma ${dl(e, u)}. Oblicz długość drugiej przekątnej.`, poleDl(u, "Druga przekątna"), { wynik: f }, dl(f, u),
        [`Ze wzoru $P = \\frac{e \\cdot f}{2}$ mamy $e \\cdot f = 2P = 2 \\cdot ${P} = ${e * f}$.`, `$f = ${e * f} : ${e} = ${f}$.`]);
    }
    const a = r.int(4, 12), h = r.int(2, a - 1);
    return zad(`Romb ma bok długości ${dl(a, u)}, a wysokość opuszczona na ten bok ma ${dl(h, u)}. Oblicz pole tego rombu.`, polePole(u), { wynik: a * h }, pl(a * h, u),
      [`Romb jest równoległobokiem, więc jego pole to bok razy wysokość.`, `$P = ${a} \\cdot ${h} = ${a * h}$.`]);
  });
}

function trapezPole(r) {
  const u = r.pick(JEDN);
  return probuj(() => {
    const a = r.int(5, 14), b = r.int(2, a - 1), h = r.int(2, 10), S = a + b;
    if ((S * h) % 2) return null;
    const P = S * h / 2, w = r.int(0, 2);
    if (w === 0) {
      return zad(`Trapez ma podstawy długości ${dl(a, u)} i ${dl(b, u)} oraz wysokość ${dl(h, u)}. Oblicz pole tego trapezu.`, polePole(u), { wynik: P }, pl(P, u),
        [`Pole trapezu: $P = \\frac{(a + b) \\cdot h}{2}$ (średnia z podstaw razy wysokość).`, `$P = \\frac{(${a} + ${b}) \\cdot ${h}}{2} = \\frac{${S} \\cdot ${h}}{2} = ${P}$.`]);
    }
    if (w === 1) {
      return zad(`Pole trapezu wynosi ${pl(P, u)}, suma długości jego podstaw to ${dl(S, u)}. Oblicz wysokość tego trapezu.`, poleDl(u, "Wysokość"), { wynik: h }, dl(h, u),
        [`Ze wzoru $P = \\frac{(a + b) \\cdot h}{2}$ mamy $(a + b) \\cdot h = 2P = 2 \\cdot ${P} = ${S * h}$.`, `$h = ${S * h} : ${S} = ${h}$.`]);
    }
    return zad(`Pole trapezu wynosi ${pl(P, u)}, jego wysokość ma ${dl(h, u)}, a jedna z podstaw ${dl(b, u)}. Oblicz długość drugiej podstawy.`, poleDl(u, "Druga podstawa"), { wynik: a }, dl(a, u),
      [`Ze wzoru $P = \\frac{(a + b) \\cdot h}{2}$ mamy $(a + b) \\cdot h = 2P = ${2 * P}$, więc $a + b = ${2 * P} : ${h} = ${S}$.`, `Druga podstawa ma $${S} - ${b} = ${a}$.`]);
  });
}

function polaObwodyWzory(r) {
  return losuj(r, [[14, prostokatPoleObwod], [14, prostokatBrakujacyBok], [10, kwadratPoleObwod], [14, trojkatPole], [12, rownoleglobokPole], [18, rombZPrzekatnych], [18, trapezPole]]);
}

// --- 8. Figury złożone, jednostki pola, płytki, skala

function figuraL(r) {
  return probuj(() => {
    const A = r.int(8, 16), B = r.int(6, 12), lim = Math.min(A, B) - 3, c = r.int(2, lim), d = r.int(2, lim);
    const pole2 = r.chance(0.5);
    const opis = `Działka ma kształt litery L. Powstała z prostokąta o wymiarach $${A}$ m i $${B}$ m, z którego w jednym rogu wycięto prostokąt o wymiarach $${c}$ m i $${d}$ m.`;
    if (pole2) {
      const P = A * B - c * d;
      return zad(`${opis} Ile metrów kwadratowych ma pole tej działki?`, [pole("wynik", "Pole (w $\\text{m}^2$)")], { wynik: P }, `$${P}\\ \\text{m}^2$`,
        [`Pole całego prostokąta: $${A} \\cdot ${B} = ${A * B}$.`, `Pole wyciętego rogu: $${c} \\cdot ${d} = ${c * d}$.`, `Pole działki: $${A * B} - ${c * d} = ${P}$.`]);
    }
    const O = 2 * (A + B);
    return zad(`${opis} Ile metrów ma obwód tej działki?`, [pole("wynik", "Obwód (w m)")], { wynik: O }, `$${O}$ m`,
      [`Obwód to zewnętrzny brzeg figury. Wycięty róg skraca jedne boki i wydłuża inne o tyle samo, więc obwód jest taki sam jak dużego prostokąta.`,
        `Sprawdzenie: sześć boków figury ma $${A}$, $${B}$, $${A - c}$, $${d}$, $${c}$, $${B - d}$ i razem $${A + B + (A - c) + d + c + (B - d)}$.`,
        `Obwód: $2 \\cdot (${A} + ${B}) = ${O}$.`]);
  });
}

function prostokatMinusTrojkat(r) {
  return probuj(() => {
    const A = r.int(6, 14), B = r.int(4, 10), p = r.int(2, 6), qq = r.int(2, 6);
    if ((p * qq) % 2 || Math.max(p, qq) >= Math.min(A, B)) return null;
    const P = A * B - p * qq / 2;
    return zad(
      `Z prostokąta o bokach $${A}$ cm i $${B}$ cm odcięto w jednym rogu trójkąt prostokątny, którego przyprostokątne o długościach $${p}$ cm i $${qq}$ cm leżą na bokach prostokąta. Ile $\\text{cm}^2$ ma pole pozostałej figury?`,
      [pole("wynik", "Pole (w $\\text{cm}^2$)")], { wynik: P }, `$${P}\\ \\text{cm}^2$`,
      [`Pole prostokąta: $${A} \\cdot ${B} = ${A * B}$.`, `Pole odciętego trójkąta: $\\frac{${p} \\cdot ${qq}}{2} = ${p * qq / 2}$.`, `Pole figury: $${A * B} - ${p * qq / 2} = ${P}$.`],
    );
  });
}

function sciezkaWokolBasenu(r) {
  const A = r.int(6, 14), B = r.intBez(4, 10, A), w = r.int(1, 2);
  const A2 = A + 2 * w, B2 = B + 2 * w, P = A2 * B2 - A * B;
  return zad(
    `Prostokątny basen ma wymiary $${A}$ m i $${B}$ m. Wokół basenu, ze wszystkich stron, zrobiono ścieżkę o szerokości $${w}$ m. Ile metrów kwadratowych ma pole ścieżki?`,
    [pole("wynik", "Pole ścieżki (w $\\text{m}^2$)")], { wynik: P }, `$${P}\\ \\text{m}^2$`,
    [`Basen razem ze ścieżką to prostokąt, w którym każdy bok jest dłuższy o $2 \\cdot ${w} = ${2 * w}$ m (ścieżka jest z obu stron): $${A2}$ m na $${B2}$ m.`,
      `Jego pole: $${A2} \\cdot ${B2} = ${A2 * B2}$. Pole samego basenu: $${A} \\cdot ${B} = ${A * B}$.`,
      `Pole ścieżki: $${A2 * B2} - ${A * B} = ${P}$.`],
  );
}

/** Ile cm² ma jednostka pola (k) i jej zapis. */
const POLA_JEDN = { cm: { p: "\\text{cm}^2", k: 1 }, dm: { p: "\\text{dm}^2", k: 100 }, m: { p: "\\text{m}^2", k: 10000 } };
/** Długość: ile razy jednostka większa jest dłuższa od mniejszej. */
const DL_JEDN = { "m,cm": 100, "m,dm": 10, "dm,cm": 10 };

function przeliczPole(r) {
  const [z, na] = r.pick([["m", "cm"], ["m", "cm"], ["cm", "m"], ["cm", "m"], ["dm", "cm"], ["cm", "dm"], ["m", "dm"], ["dm", "m"]]);
  const mnoz = POLA_JEDN[z].k > POLA_JEDN[na].k;                    // z większej jednostki na mniejszą – mnożymy
  const wd = mnoz ? z : na, md = mnoz ? na : z;                      // większa i mniejsza jednostka
  const kk = DL_JEDN[`${wd},${md}`], f = kk * kk;
  const duzaWart = r.pick([q(1), q(2), q(3), q(4), q(5), q(6), q(7), q(8), q(9), q(3, 2), q(5, 2), q(1, 2), q(1, 4), q(3, 4), q(1, 5), q(3, 10)]);
  const malaWart = duzaWart.mul(f);
  const wart = mnoz ? duzaWart : malaWart, wyn = mnoz ? malaWart : duzaWart;
  const T = (v, j) => `${dz(v)}\\ ${POLA_JEDN[j].p}`;
  return zad(
    r.pick([`Pole pewnej figury wynosi $${T(wart, z)}$. Wyraź to pole w $${POLA_JEDN[na].p}$.`, `Ile $${POLA_JEDN[na].p}$ to $${T(wart, z)}$?`]),
    [pole("wynik", `Pole (w $${POLA_JEDN[na].p}$)`)], { wynik: wyn }, `$${T(wyn, na)}$`,
    [
      `Skoro $1\\ \\text{${wd}} = ${kk}\\ \\text{${md}}$, to $1\\ \\text{${wd}}^2 = ${kk} \\cdot ${kk} = ${dz(f)}\\ \\text{${md}}^2$ (kwadrat o boku $1$ ${wd} ma $${kk}$ rzędów po $${kk}$ kwadracików).`,
      mnoz ? `Mnożymy: $${dz(wart)} \\cdot ${dz(f)} = ${dz(wyn)}$.` : `Dzielimy: $${dz(wart)} : ${dz(f)} = ${dz(wyn)}$.`,
      `Uwaga: pole mnożymy lub dzielimy przez $${dz(f)}$, a nie przez $${kk}$.`,
    ],
  );
}

function mieszaneJednostki(r) {
  const a = r.int(2, 9), b = r.pick([20, 25, 30, 40, 50, 60, 75, 80]), P = 100 * a * b;
  return zad(
    `Prostokąt ma boki długości $${a}$ m i $${b}$ cm. Ile $\\text{cm}^2$ ma pole tego prostokąta?`,
    [pole("wynik", "Pole (w $\\text{cm}^2$)")], { wynik: P }, `$${dz(P)}\\ \\text{cm}^2$`,
    [`Zamieniamy boki na te same jednostki: $${a}$ m $= ${100 * a}$ cm.`, `Pole: $${100 * a} \\cdot ${b} = ${dz(P)}$, czyli $${dz(P)}\\ \\text{cm}^2$.`],
  );
}

function plytki(r) {
  const t = r.pick([20, 25, 50]), A = r.int(2, 6), B = r.intBez(2, 6, A);
  const wA = 100 * A / t, wB = 100 * B / t;
  return zad(
    `Podłoga w pokoju ma kształt prostokąta o wymiarach $${A}$ m na $${B}$ m. Chcemy ją w całości pokryć kwadratowymi płytkami o boku $${t}$ cm (bez przycinania płytek). Ile płytek potrzeba?`,
    [pole("wynik", "Liczba płytek")], { wynik: wA * wB }, `$${wA * wB}$`,
    [`Zamieniamy wymiary podłogi na centymetry: $${A}$ m $= ${100 * A}$ cm i $${B}$ m $= ${100 * B}$ cm.`,
      `Wzdłuż jednego boku ułożymy $${100 * A} : ${t} = ${wA}$ ${lm(wA, ["płytkę", "płytki", "płytek"])}, wzdłuż drugiego $${100 * B} : ${t} = ${wB}$ ${lm(wB, ["płytkę", "płytki", "płytek"])}.`,
      `Płytek jest $${wA} \\cdot ${wB} = ${wA * wB}$.`],
  );
}

function skalaBokow(r) {
  if (r.chance(0.5)) {
    const k = r.int(2, 5), a = r.int(2, 6), b = r.intBez(2, 6, a);
    const A = a * k, B = b * k;
    return zad(
      `Boki prostokąta o wymiarach $${a}$ cm i $${b}$ cm zwiększono $${k}$ razy. Ile $\\text{cm}^2$ ma pole nowego prostokąta?`,
      [pole("wynik", "Pole (w $\\text{cm}^2$)")], { wynik: A * B }, `$${A * B}\\ \\text{cm}^2$`,
      [`Nowe boki mają $${a} \\cdot ${k} = ${A}$ cm i $${b} \\cdot ${k} = ${B}$ cm.`, `Pole: $${A} \\cdot ${B} = ${A * B}$.`, `Sprawdzenie: dawne pole $${a * b}$ razy $${k} \\cdot ${k} = ${k * k}$ to też $${A * B}$.`],
    );
  }
  const k = r.int(2, 6), a = r.int(2, 9);
  return zad(
    `Każdy bok pewnego kwadratu zwiększono $${k}$ razy. Ile razy większe jest pole nowego kwadratu od pola dawnego?`,
    [pole("wynik", "Ile razy większe")], { wynik: k * k }, `$${k * k}$`,
    [`Dla przykładu weźmy kwadrat o boku $${a}$: pole $${a} \\cdot ${a} = ${a * a}$.`, `Nowy bok to $${a * k}$, więc nowe pole to $${a * k} \\cdot ${a * k} = ${a * a * k * k}$.`,
      `Iloraz pól: $${a * a * k * k} : ${a * a} = ${k * k}$, czyli $${k} \\cdot ${k}$. Pole rośnie $k^2$ razy, gdy boki rosną $k$ razy.`],
  );
}

function figurySlozoneIJednostki(r) {
  return losuj(r, [[18, figuraL], [12, prostokatMinusTrojkat], [14, sciezkaWokolBasenu], [22, przeliczPole], [8, mieszaneJednostki], [14, plytki], [12, skalaBokow]]);
}

// --- 9. Twierdzenie Pitagorasa: trójki, przekątna, drabina, trójkąt równoramienny, romb, trapez prostokątny

const RODZINY = [
  { w: 52, baza: [3, 4, 5], k: [1, 1, 2, 2, 3, 4, 5, 6] },
  { w: 22, baza: [5, 12, 13], k: [1, 1, 2] },
  { w: 13, baza: [8, 15, 17], k: [1] },
  { w: 13, baza: [7, 24, 25], k: [1] },
];

/** Trójka pitagorejska: przyprostokątne a i b (w losowej kolejności), przeciwprostokątna c, baza i mnożnik k. */
function trojka(r) {
  let x = r.int(0, 99), rodz = RODZINY[0];
  for (const f of RODZINY) {
    if (x < f.w) { rodz = f; break; }
    x -= f.w;
  }
  const k = r.pick(rodz.k), [a0, b0, c0] = rodz.baza, tak = r.chance(0.5);
  return { a: (tak ? a0 : b0) * k, b: (tak ? b0 : a0) * k, c: c0 * k, baza: rodz.baza, k };
}
/** Krok-skrót dla trójek pomnożonych przez k > 1. */
const skrotTrojki = (t) => (t.k > 1
  ? [`Można krócej: boki $${t.a}$, $${t.b}$, $${t.c}$ to trójka $${t.baza.join(", ")}$ pomnożona przez $${t.k}$.`]
  : []);
const JEDN_DL = ["cm", "cm", "m"];

function przeciwprostokatna(r) {
  const t = trojka(r), j = r.pick(JEDN_DL), d = (x) => `$${x}$ ${j}`;
  return zad(
    `Przyprostokątne trójkąta prostokątnego mają długości ${d(t.a)} i ${d(t.b)}. Oblicz długość jego przeciwprostokątnej.`,
    [pole("wynik", `Długość (w ${j})`)], { wynik: t.c }, d(t.c),
    [`Z twierdzenia Pitagorasa $c^2 = a^2 + b^2 = ${t.a}^2 + ${t.b}^2$.`, `$c^2 = ${t.a * t.a} + ${t.b * t.b} = ${t.c * t.c}$.`, `$c = \\sqrt{${t.c * t.c}} = ${t.c}$.`, ...skrotTrojki(t)],
  );
}

function przyprostokatna(r) {
  const t = trojka(r), j = r.pick(JEDN_DL), d = (x) => `$${x}$ ${j}`;
  return zad(
    `Przeciwprostokątna trójkąta prostokątnego ma długość ${d(t.c)}, a jedna z przyprostokątnych ${d(t.a)}. Oblicz długość drugiej przyprostokątnej.`,
    [pole("wynik", `Długość (w ${j})`)], { wynik: t.b }, d(t.b),
    [`Szukamy przyprostokątnej, więc odejmujemy: $b^2 = c^2 - a^2 = ${t.c}^2 - ${t.a}^2$.`, `$b^2 = ${t.c * t.c} - ${t.a * t.a} = ${t.b * t.b}$.`, `$b = \\sqrt{${t.b * t.b}} = ${t.b}$.`, ...skrotTrojki(t)],
  );
}

function prostokatPrzekatna(r) {
  const t = trojka(r), w = r.int(0, 2);
  if (w === 0) {
    return zad(`Boki prostokąta mają długości $${t.a}$ cm i $${t.b}$ cm. Oblicz długość przekątnej tego prostokąta.`, [pole("wynik", "Przekątna (w cm)")], { wynik: t.c }, `$${t.c}$ cm`,
      [`Przekątna dzieli prostokąt na dwa trójkąty prostokątne, w których boki prostokąta są przyprostokątnymi.`, `$d^2 = ${t.a}^2 + ${t.b}^2 = ${t.a * t.a} + ${t.b * t.b} = ${t.c * t.c}$.`, `$d = \\sqrt{${t.c * t.c}} = ${t.c}$.`, ...skrotTrojki(t)]);
  }
  if (w === 1) {
    return zad(`Przekątna prostokąta ma długość $${t.c}$ cm, a jeden z jego boków $${t.a}$ cm. Ile centymetrów ma drugi bok tego prostokąta?`, [pole("wynik", "Drugi bok (w cm)")], { wynik: t.b }, `$${t.b}$ cm`,
      [`Przekątna jest przeciwprostokątną trójkąta, w którym boki prostokąta są przyprostokątnymi.`, `$b^2 = ${t.c}^2 - ${t.a}^2 = ${t.c * t.c} - ${t.a * t.a} = ${t.b * t.b}$.`, `$b = \\sqrt{${t.b * t.b}} = ${t.b}$.`, ...skrotTrojki(t)]);
  }
  return zad(`Przekątna prostokąta ma długość $${t.c}$ cm, a jeden z jego boków $${t.a}$ cm. Ile $\\text{cm}^2$ ma pole tego prostokąta?`, [pole("wynik", "Pole (w $\\text{cm}^2$)")], { wynik: t.a * t.b }, `$${t.a * t.b}\\ \\text{cm}^2$`,
    [`Najpierw drugi bok z Pitagorasa: $b^2 = ${t.c}^2 - ${t.a}^2 = ${t.c * t.c} - ${t.a * t.a} = ${t.b * t.b}$, czyli $b = ${t.b}$.`, `Pole prostokąta: $${t.a} \\cdot ${t.b} = ${t.a * t.b}$.`, ...skrotTrojki(t)]);
}

function drabina(r) {
  const t = trojka(r), w = r.int(0, 2);
  if (w === 0) {
    return zad(`Drabina o długości $${t.c}$ m opiera się o pionową ścianę. Dolny koniec drabiny stoi na poziomej ziemi w odległości $${t.a}$ m od ściany. Na jakiej wysokości drabina dotyka ściany?`,
      [pole("wynik", "Wysokość (w m)")], { wynik: t.b }, `$${t.b}$ m`,
      [`Ściana, ziemia i drabina tworzą trójkąt prostokątny; drabina jest jego przeciwprostokątną.`, `$h^2 = ${t.c}^2 - ${t.a}^2 = ${t.c * t.c} - ${t.a * t.a} = ${t.b * t.b}$.`, `$h = \\sqrt{${t.b * t.b}} = ${t.b}$ m.`, ...skrotTrojki(t)]);
  }
  if (w === 1) {
    return zad(`Drabina o długości $${t.c}$ m dotyka pionowej ściany na wysokości $${t.b}$ m. W jakiej odległości od ściany stoi dolny koniec drabiny?`,
      [pole("wynik", "Odległość (w m)")], { wynik: t.a }, `$${t.a}$ m`,
      [`Ściana, ziemia i drabina tworzą trójkąt prostokątny; drabina jest jego przeciwprostokątną.`, `$x^2 = ${t.c}^2 - ${t.b}^2 = ${t.c * t.c} - ${t.b * t.b} = ${t.a * t.a}$.`, `$x = \\sqrt{${t.a * t.a}} = ${t.a}$ m.`, ...skrotTrojki(t)]);
  }
  return zad(`Pionowy maszt ma wysokość $${t.a}$ m. Lina o długości $${t.c}$ m łączy jego wierzchołek z punktem na ziemi. W jakiej odległości od podstawy masztu jest przymocowana lina?`,
    [pole("wynik", "Odległość (w m)")], { wynik: t.b }, `$${t.b}$ m`,
    [`Maszt, ziemia i lina tworzą trójkąt prostokątny; lina jest jego przeciwprostokątną.`, `$x^2 = ${t.c}^2 - ${t.a}^2 = ${t.c * t.c} - ${t.a * t.a} = ${t.b * t.b}$.`, `$x = \\sqrt{${t.b * t.b}} = ${t.b}$ m.`, ...skrotTrojki(t)]);
}

function trojkatRownoramiennyWysokosc(r) {
  const t = trojka(r), pole2 = r.chance(0.5), podstawa = 2 * t.a;
  const kroki = [
    `Wysokość opuszczona na podstawę dzieli ją na dwie połowy po $${podstawa} : 2 = ${t.a}$ cm i tworzy trójkąt prostokątny: ramię $${t.c}$ cm jest jego przeciwprostokątną.`,
    `$h^2 = ${t.c}^2 - ${t.a}^2 = ${t.c * t.c} - ${t.a * t.a} = ${t.b * t.b}$, więc $h = ${t.b}$ cm.`,
  ];
  if (pole2) {
    kroki.push(`Pole trójkąta: $\\frac{${podstawa} \\cdot ${t.b}}{2} = ${podstawa * t.b / 2}$.`);
    return zad(`Trójkąt równoramienny ma podstawę długości $${podstawa}$ cm i ramiona długości $${t.c}$ cm. Ile $\\text{cm}^2$ ma pole tego trójkąta?`,
      [pole("wynik", "Pole (w $\\text{cm}^2$)")], { wynik: podstawa * t.b / 2 }, `$${podstawa * t.b / 2}\\ \\text{cm}^2$`, kroki);
  }
  return zad(`Trójkąt równoramienny ma podstawę długości $${podstawa}$ cm i ramiona długości $${t.c}$ cm. Oblicz wysokość tego trójkąta opuszczoną na podstawę.`,
    [pole("wynik", "Wysokość (w cm)")], { wynik: t.b }, `$${t.b}$ cm`, kroki);
}

function obwodTrojkataProstokatnego(r) {
  const t = trojka(r), O = t.a + t.b + t.c;
  return zad(`Przyprostokątne trójkąta prostokątnego mają długości $${t.a}$ cm i $${t.b}$ cm. Oblicz obwód tego trójkąta.`,
    [pole("wynik", "Obwód (w cm)")], { wynik: O }, `$${O}$ cm`,
    [`Najpierw przeciwprostokątna: $c^2 = ${t.a}^2 + ${t.b}^2 = ${t.a * t.a} + ${t.b * t.b} = ${t.c * t.c}$, więc $c = ${t.c}$ cm.`, `Obwód to suma trzech boków: $${t.a} + ${t.b} + ${t.c} = ${O}$.`, ...skrotTrojki(t)]);
}

function drogaNaSkroty(r) {
  const t = trojka(r), w = r.int(0, 1);
  if (w === 0) {
    const roznica = t.a + t.b - t.c;
    return zad(`Boisko ma kształt prostokąta o bokach $${t.a}$ m i $${t.b}$ m. Ola idzie z jednego rogu boiska do rogu przeciwległego: raz wzdłuż dwóch boków, a raz po przekątnej. O ile metrów krótsza jest droga po przekątnej?`,
      [pole("wynik", "Różnica dróg (w m)")], { wynik: roznica }, `$${roznica}$ m`,
      [`Droga wzdłuż boków: $${t.a} + ${t.b} = ${t.a + t.b}$ m.`, `Przekątna: $d^2 = ${t.a}^2 + ${t.b}^2 = ${t.a * t.a} + ${t.b * t.b} = ${t.c * t.c}$, więc $d = ${t.c}$ m.`, `Różnica: $${t.a + t.b} - ${t.c} = ${roznica}$ m.`]);
  }
  return zad(`Dwaj rowerzyści wyjechali z tego samego miejsca: jeden pojechał prosto na północ, drugi prosto na wschód. Po pewnym czasie pierwszy był w odległości $${t.a}$ km od miejsca startu, a drugi w odległości $${t.b}$ km. Jaka odległość w linii prostej dzieli teraz rowerzystów?`,
    [pole("wynik", "Odległość (w km)")], { wynik: t.c }, `$${t.c}$ km`,
    [`Kierunki północ i wschód są prostopadłe, więc rowerzyści i miejsce startu są wierzchołkami trójkąta prostokątnego o przyprostokątnych $${t.a}$ i $${t.b}$.`, `$d^2 = ${t.a}^2 + ${t.b}^2 = ${t.a * t.a} + ${t.b * t.b} = ${t.c * t.c}$.`, `$d = \\sqrt{${t.c * t.c}} = ${t.c}$ km.`, ...skrotTrojki(t)]);
}

function bokRombu(r) {
  const [x, y, z] = r.pick(POLOWKI_ROMBU);
  return zad(`Romb ma przekątne długości $${2 * x}$ cm i $${2 * y}$ cm. Ile centymetrów ma bok tego rombu?`,
    [pole("wynik", "Bok (w cm)")], { wynik: z }, `$${z}$ cm`,
    [`Przekątne rombu są prostopadłe i dzielą się na pół, więc ich połówki mają $${x}$ cm i $${y}$ cm.`, `Bok rombu jest przeciwprostokątną trójkąta o przyprostokątnych $${x}$ i $${y}$: $a^2 = ${x}^2 + ${y}^2 = ${x * x} + ${y * y} = ${z * z}$.`, `$a = \\sqrt{${z * z}} = ${z}$ cm.`]);
}

function trapezProstokatnyRamie(r) {
  const t = trojka(r), b = r.int(3, 12), a = b + t.a;
  return zad(`Trapez prostokątny ma podstawy długości $${a}$ cm i $${b}$ cm oraz wysokość $${t.b}$ cm. Oblicz długość jego dłuższego ramienia (tego, które nie jest prostopadłe do podstaw).`,
    [pole("wynik", "Ramię (w cm)")], { wynik: t.c }, `$${t.c}$ cm`,
    [`Poprowadź wysokość z końca krótszej podstawy: powstaje trójkąt prostokątny, w którym przyprostokątne to wysokość $${t.b}$ i różnica podstaw $${a} - ${b} = ${t.a}$.`, `Ramię jest jego przeciwprostokątną: $c^2 = ${t.b}^2 + ${t.a}^2 = ${t.b * t.b} + ${t.a * t.a} = ${t.c * t.c}$.`, `$c = \\sqrt{${t.c * t.c}} = ${t.c}$ cm.`, ...skrotTrojki(t)]);
}

function pitagorasBokTrojkata(r) {
  return losuj(r, [[14, przeciwprostokatna], [14, przyprostokatna], [14, prostokatPrzekatna], [14, drabina], [12, trojkatRownoramiennyWysokosc], [6, obwodTrojkataProstokatnego], [10, drogaNaSkroty], [8, bokRombu], [8, trapezProstokatnyRamie]]);
}

// --- 10. Pierwiastki w figurach: przekątna kwadratu ($a\sqrt{2}$), trójkąt równoboczny ($\sqrt{3}$), trójkąty 45-45-90 i 30-60-90

const CM = (x) => `$${x}$ cm`;

function przekatnaNaBok(r) {
  const k = r.int(2, 15), obw = r.chance(0.4);
  return zad(`Przekątna kwadratu ma długość $${k}\\sqrt{2}$ cm. ${obw ? "Oblicz obwód tego kwadratu." : "Ile centymetrów ma bok tego kwadratu?"}`,
    [pole("wynik", obw ? "Obwód (w cm)" : "Bok (w cm)")], { wynik: obw ? 4 * k : k }, CM(obw ? 4 * k : k),
    [`Przekątna kwadratu o boku $a$ ma długość $a\\sqrt{2}$.`, `Mamy $a\\sqrt{2} = ${k}\\sqrt{2}$, więc $a = ${k}$ cm.`, ...(obw ? [`Obwód: $4 \\cdot ${k} = ${4 * k}$ cm.`] : [])]);
}

function obwodNaPrzekatna(r) {
  const a = r.int(3, 15);
  return zad(`Obwód kwadratu wynosi $${4 * a}$ cm. Przekątna tego kwadratu ma długość $k\\sqrt{2}$ cm. Ile wynosi $k$?`,
    [pole("wynik", "Liczba $k$")], { wynik: a }, `$${a}$`,
    [`Bok kwadratu: $${4 * a} : 4 = ${a}$ cm.`, `Przekątna kwadratu o boku $a$ ma długość $a\\sqrt{2}$, czyli tu $${a}\\sqrt{2}$ cm.`, `Zatem $k = ${a}$.`]);
}

function poleNaPrzekatna(r) {
  const m = r.int(2, 7), P = 2 * m * m, d = 2 * m;
  return zad(`Pole kwadratu wynosi $${P}\\ \\text{cm}^2$. Ile centymetrów ma przekątna tego kwadratu?`,
    [pole("wynik", "Przekątna (w cm)")], { wynik: d }, CM(d),
    [`Przekątna dzieli kwadrat na dwa trójkąty prostokątne o przyprostokątnych $a$ i $a$, więc $d^2 = a^2 + a^2 = 2a^2$.`, `Pole to $a^2 = ${P}$, więc $d^2 = 2 \\cdot ${P} = ${2 * P}$.`, `$d = \\sqrt{${2 * P}} = ${d}$ cm.`]);
}

function przekatnaNaPole(r) {
  if (r.chance(0.5)) {
    const k = r.int(2, 12);
    return zad(`Przekątna kwadratu ma długość $${k}\\sqrt{2}$ cm. Ile $\\text{cm}^2$ ma pole tego kwadratu?`,
      [pole("wynik", "Pole (w $\\text{cm}^2$)")], { wynik: k * k }, `$${k * k}\\ \\text{cm}^2$`,
      [`Przekątna kwadratu o boku $a$ ma długość $a\\sqrt{2}$, więc $a = ${k}$ cm.`, `Pole: $${k} \\cdot ${k} = ${k * k}$.`]);
  }
  const m = r.int(2, 7), d = 2 * m, P = 2 * m * m;
  return zad(`Przekątna kwadratu ma długość $${d}$ cm. Ile $\\text{cm}^2$ ma pole tego kwadratu?`,
    [pole("wynik", "Pole (w $\\text{cm}^2$)")], { wynik: P }, `$${P}\\ \\text{cm}^2$`,
    [`Z Pitagorasa $d^2 = a^2 + a^2 = 2a^2$, więc $a^2 = d^2 : 2$.`, `Pole to $a^2 = ${d}^2 : 2 = ${d * d} : 2 = ${P}$.`]);
}

function wysokoscRownobocznego(r) {
  const m = r.int(2, 9), a = 2 * m;
  return zad(`Bok trójkąta równobocznego ma długość $${a}$ cm. Wysokość tego trójkąta ma długość $k\\sqrt{3}$ cm. Ile wynosi $k$?`,
    [pole("wynik", "Liczba $k$")], { wynik: m }, `$${m}$`,
    [`Wysokość trójkąta równobocznego o boku $a$ to $h = \\frac{a\\sqrt{3}}{2}$.`, `$h = \\frac{${a}\\sqrt{3}}{2} = ${m}\\sqrt{3}$.`, `Zatem $k = ${m}$.`]);
}

function bokRownobocznegoZWysokosci(r) {
  const k = r.int(2, 10), obw = r.chance(0.4);
  return zad(`Wysokość trójkąta równobocznego ma długość $${k}\\sqrt{3}$ cm. ${obw ? "Oblicz obwód tego trójkąta." : "Ile centymetrów ma bok tego trójkąta?"}`,
    [pole("wynik", obw ? "Obwód (w cm)" : "Bok (w cm)")], { wynik: obw ? 6 * k : 2 * k }, CM(obw ? 6 * k : 2 * k),
    [`Wysokość trójkąta równobocznego o boku $a$ to $h = \\frac{a\\sqrt{3}}{2}$.`, `Mamy $\\frac{a\\sqrt{3}}{2} = ${k}\\sqrt{3}$, więc $a = 2 \\cdot ${k} = ${2 * k}$ cm.`, ...(obw ? [`Obwód: $3 \\cdot ${2 * k} = ${6 * k}$ cm.`] : [])]);
}

function poleRownobocznego(r) {
  const m = r.int(2, 6), a = 2 * m, h = m, k = m * m;
  return zad(`Bok trójkąta równobocznego ma długość $${a}$ cm. Pole tego trójkąta ma postać $k\\sqrt{3}\\ \\text{cm}^2$. Ile wynosi $k$?`,
    [pole("wynik", "Liczba $k$")], { wynik: k }, `$${k}$`,
    [`Wysokość: $h = \\frac{${a}\\sqrt{3}}{2} = ${h}\\sqrt{3}$.`, `Pole: $\\frac{${a} \\cdot ${h}\\sqrt{3}}{2} = ${a / 2} \\cdot ${h}\\sqrt{3} = ${k}\\sqrt{3}$.`, `Zatem $k = ${k}$.`]);
}

function trojkat3060(r) {
  const w = r.int(0, 2);
  if (w === 0) {
    const x = r.int(2, 12), d = 2 * x;
    return zad(`W trójkącie prostokątnym kąty ostre mają $30^\\circ$ i $60^\\circ$, a przeciwprostokątna ma długość $${d}$ cm. Ile centymetrów ma krótsza przyprostokątna?`,
      [pole("wynik", "Krótsza przyprostokątna (w cm)")], { wynik: x }, CM(x),
      [`Połowa trójkąta równobocznego ma boki $x$, $x\\sqrt{3}$, $2x$; przeciwprostokątna to $2x$, a krótsza przyprostokątna leży naprzeciw $30^\\circ$ i ma $x$.`, `$2x = ${d}$, więc $x = ${d} : 2 = ${x}$ cm.`]);
  }
  if (w === 1) {
    const x = r.int(2, 12);
    return zad(`W trójkącie prostokątnym kąty ostre mają $30^\\circ$ i $60^\\circ$, a krótsza przyprostokątna ma długość $${x}$ cm. Ile centymetrów ma przeciwprostokątna?`,
      [pole("wynik", "Przeciwprostokątna (w cm)")], { wynik: 2 * x }, CM(2 * x),
      [`Połowa trójkąta równobocznego ma boki $x$, $x\\sqrt{3}$, $2x$, gdzie $x$ to krótsza przyprostokątna.`, `Przeciwprostokątna: $2 \\cdot ${x} = ${2 * x}$ cm.`]);
  }
  const k = r.int(2, 10);
  return zad(`W trójkącie prostokątnym kąty ostre mają $30^\\circ$ i $60^\\circ$, a dłuższa przyprostokątna ma długość $${k}\\sqrt{3}$ cm. Ile centymetrów ma przeciwprostokątna?`,
    [pole("wynik", "Przeciwprostokątna (w cm)")], { wynik: 2 * k }, CM(2 * k),
    [`Boki tego trójkąta to $x$, $x\\sqrt{3}$, $2x$; dłuższa przyprostokątna ma $x\\sqrt{3}$.`, `Mamy $x\\sqrt{3} = ${k}\\sqrt{3}$, więc $x = ${k}$.`, `Przeciwprostokątna: $2x = 2 \\cdot ${k} = ${2 * k}$ cm.`]);
}

function trojkat4545(r) {
  if (r.chance(0.5)) {
    const k = r.int(2, 12);
    return zad(`Trójkąt prostokątny ma kąty $45^\\circ$, $45^\\circ$ i $90^\\circ$. Jego przeciwprostokątna ma długość $${k}\\sqrt{2}$ cm. Ile centymetrów ma przyprostokątna?`,
      [pole("wynik", "Przyprostokątna (w cm)")], { wynik: k }, CM(k),
      [`Połowa kwadratu ma boki $a$, $a$, $a\\sqrt{2}$, gdzie $a\\sqrt{2}$ to przeciwprostokątna.`, `Mamy $a\\sqrt{2} = ${k}\\sqrt{2}$, więc $a = ${k}$ cm.`]);
  }
  const m = r.int(2, 9), d = 2 * m;
  return zad(`Trójkąt prostokątny ma kąty $45^\\circ$, $45^\\circ$ i $90^\\circ$, a jego przeciwprostokątna ma długość $${d}$ cm. Przyprostokątna ma długość $k\\sqrt{2}$ cm. Ile wynosi $k$?`,
    [pole("wynik", "Liczba $k$")], { wynik: m }, `$${m}$`,
    [`Boki tego trójkąta to $a$, $a$, $a\\sqrt{2}$, więc $a\\sqrt{2} = ${d}$ i $a = \\frac{${d}}{\\sqrt{2}}$.`, `Mnożymy licznik i mianownik przez $\\sqrt{2}$: $a = \\frac{${d}\\sqrt{2}}{2} = ${m}\\sqrt{2}$.`, `Zatem $k = ${m}$.`]);
}

function wzorPrzekatnej(r) {
  const a = r.pick([4, 6, 8, 10, 12]);
  const m = mieszaj(r, `$${a}\\sqrt{2}$ cm`, [`$${2 * a}$ cm`, `$${a}\\sqrt{3}$ cm`, `$${a / 2}\\sqrt{2}$ cm`]);
  return zad(`Bok kwadratu ma długość $${a}$ cm. Ile centymetrów ma przekątna tego kwadratu?`,
    [polew("odp", "Długość przekątnej", m.opcje)], { odp: m.ind }, `$${a}\\sqrt{2}$ cm`,
    [`Przekątna kwadratu o boku $a$ ma długość $a\\sqrt{2}$ (z Pitagorasa $d^2 = a^2 + a^2 = 2a^2$).`, `Dla $a = ${a}$ jest to $${a}\\sqrt{2}$ cm. Przekątna $${2 * a}$ cm byłaby dwa razy dłuższa od boku – to droga po dwóch bokach, nie na skos.`]);
}

function wzorWysokosci(r) {
  const a = r.pick([4, 6, 8, 10, 12, 14]), h = a / 2;
  const m = mieszaj(r, `$${h}\\sqrt{3}$ cm`, [`$${a}\\sqrt{3}$ cm`, `$${h}\\sqrt{2}$ cm`, `$${a}\\sqrt{2}$ cm`]);
  return zad(`Bok trójkąta równobocznego ma długość $${a}$ cm. Ile centymetrów ma wysokość tego trójkąta?`,
    [polew("odp", "Długość wysokości", m.opcje)], { odp: m.ind }, `$${h}\\sqrt{3}$ cm`,
    [`Wysokość trójkąta równobocznego o boku $a$ ma długość $\\frac{a\\sqrt{3}}{2}$ (połowa boku razy $\\sqrt{3}$).`, `Dla $a = ${a}$ jest to $\\frac{${a}\\sqrt{3}}{2} = ${h}\\sqrt{3}$ cm. Wysokość musi być krótsza od boku, a $${a}\\sqrt{3}$ cm jest od niego dłuższe.`]);
}

function przyblizenia(r) {
  if (r.chance(0.5)) {
    const a = r.pick([5, 10, 15, 20, 25, 30, 40, 50]), d = q(a * 14, 10);
    return zad(`Przyjmij, że $\\sqrt{2} \\approx 1{,}4$. Oblicz przybliżoną długość przekątnej kwadratu o boku $${a}$ m.`,
      [pole("wynik", "Przekątna (w m)")], { wynik: d }, `$${dz(d)}$ m`,
      [`Przekątna kwadratu o boku $a$ ma długość $a\\sqrt{2}$.`, `$${a} \\cdot 1{,}4 = ${dz(d)}$ m.`]);
  }
  const a = r.pick([6, 8, 10, 12, 14, 16, 20, 30, 40]), h = q(a * 17, 20);
  return zad(`Przyjmij, że $\\sqrt{3} \\approx 1{,}7$. Oblicz przybliżoną wysokość trójkąta równobocznego o boku $${a}$ m.`,
    [pole("wynik", "Wysokość (w m)")], { wynik: h }, `$${dz(h)}$ m`,
    [`Wysokość trójkąta równobocznego o boku $a$ to $\\frac{a\\sqrt{3}}{2}$, czyli połowa boku razy $\\sqrt{3}$.`, `Połowa boku to $${a} : 2 = ${a / 2}$ m, więc $h \\approx ${a / 2} \\cdot 1{,}7 = ${dz(h)}$ m.`]);
}

function pitagorasPierwiastki(r) {
  return losuj(r, [
    [10, przekatnaNaBok], [6, obwodNaPrzekatna], [8, poleNaPrzekatna], [9, przekatnaNaPole], [8, wysokoscRownobocznego],
    [8, bokRownobocznegoZWysokosci], [6, poleRownobocznego], [10, trojkat3060], [8, trojkat4545], [6, wzorPrzekatnej], [6, wzorWysokosci], [10, przyblizenia],
  ]);
}

// --- 11. Układ współrzędnych: ćwiartki, odcinki poziome i pionowe, środek odcinka, długość odcinka

const CWIARTKI = ["w I ćwiartce", "w II ćwiartce", "w III ćwiartce", "w IV ćwiartce"];
const RZYMSKIE = ["I", "II", "III", "IV"];
const ZNAKI_CW = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
const znakTex = (z) => (z > 0 ? "+" : "-");

function ktoraCwiartka(r) {
  const i = r.int(0, 3), x = ZNAKI_CW[i][0] * r.int(1, 9), y = ZNAKI_CW[i][1] * r.int(1, 9);
  return zad(`W której ćwiartce układu współrzędnych leży punkt $A = (${x}, ${y})$?`,
    [polew("cw", "Położenie punktu", CWIARTKI)], { cw: i }, CWIARTKI[i],
    [`Patrzymy na znaki współrzędnych: współrzędna $x = ${x}$ jest ${x > 0 ? "dodatnia" : "ujemna"}, a współrzędna $y = ${y}$ jest ${y > 0 ? "dodatnia" : "ujemna"}.`,
      `Takie znaki, czyli $(${znakTex(ZNAKI_CW[i][0])},\\ ${znakTex(ZNAKI_CW[i][1])})$, ma ${RZYMSKIE[i]} ćwiartka (I: $(+,\\ +)$, II: $(-,\\ +)$, III: $(-,\\ -)$, IV: $(+,\\ -)$).`]);
}

function ktorePunktWCwiartce(r) {
  const c = r.int(0, 3);
  const pts = ZNAKI_CW.map((z) => [z[0] * r.int(1, 9), z[1] * r.int(1, 9)]);
  const mix = r.shuffle(pts);
  const opcje = mix.map((p) => `$${kr(p)}$`);
  return zad(`Który z podanych punktów leży w ${RZYMSKIE[c]} ćwiartce układu współrzędnych?`,
    [polew("pkt", "Punkt", opcje)], { pkt: mix.indexOf(pts[c]) }, `$${kr(pts[c])}$`,
    [`W ${RZYMSKIE[c]} ćwiartce współrzędna $x$ jest ${ZNAKI_CW[c][0] > 0 ? "dodatnia" : "ujemna"}, a współrzędna $y$ ${ZNAKI_CW[c][1] > 0 ? "dodatnia" : "ujemna"}.`,
      `Sprawdzamy punkty: ${mix.map((p) => `$${kr(p)}$ – ${RZYMSKIE[ZNAKI_CW.findIndex((z) => z[0] === Math.sign(p[0]) && z[1] === Math.sign(p[1]))]} ćwiartka`).join(", ")}.`]);
}

function punktNaOsi(r) {
  const naX = r.chance(0.5), t = r.int(1, 9) * r.znak();
  const p = naX ? [t, 0] : [0, t];
  const opcje = ["na osi $x$", "na osi $y$", "w II ćwiartce", "w IV ćwiartce"];
  return zad(`Gdzie w układzie współrzędnych leży punkt $A = (${p[0]}, ${p[1]})$?`,
    [polew("miejsce", "Położenie punktu", opcje)], { miejsce: naX ? 0 : 1 }, opcje[naX ? 0 : 1],
    [naX ? `Współrzędna $y$ jest równa $0$, więc punkt nie leży ani nad osią $x$, ani pod nią – leży na niej.` : `Współrzędna $x$ jest równa $0$, więc punkt nie leży ani na lewo, ani na prawo od osi $y$ – leży na niej.`,
      "Punkt leżący na osi nie należy do żadnej ćwiartki."]);
}

function odcinekPoziomyPionowy(r) {
  return probuj(() => {
    const pion = r.chance(0.5), c = r.int(-6, 6), s = r.int(-8, 8), t = r.int(-8, 8);
    if (Math.abs(s - t) < 3) return null;
    const A = pion ? [c, s] : [s, c], B = pion ? [c, t] : [t, c], d = Math.abs(s - t), i = pion ? 1 : 0;
    const kroki = [
      `Oba punkty mają ${pion ? `taką samą współrzędną $x = ${c}$` : `taką samą współrzędną $y = ${c}$`}, więc odcinek jest ${pion ? "pionowy" : "poziomy"}.`,
      `Jego długość to różnica współrzędnych $${pion ? "y" : "x"}$ (większa minus mniejsza): $${rozn(A[i], B[i])}$.`,
    ];
    if (Math.min(s, t) < 0 && Math.max(s, t) > 0) kroki.push(`Na osi liczbowej: od $${Math.min(s, t)}$ do $0$ jest $${-Math.min(s, t)}$ kroków, a od $0$ do $${Math.max(s, t)}$ jeszcze $${Math.max(s, t)}$, razem $${d}$.`);
    return zad(`Punkty ${pk("A", A)} i ${pk("B", B)} leżą w układzie współrzędnych. Oblicz długość odcinka $AB$.`,
      [pole("wynik", "Długość odcinka $AB$")], { wynik: d }, `$${d}$`, kroki);
  });
}

function drugiKoniecPoziomego(r) {
  return probuj(() => {
    const A = [r.int(-6, 6), r.int(-6, 6)], d = r.int(3, 9), pion = r.chance(0.5), plus = r.chance(0.5);
    const B = pion ? [A[0], A[1] + (plus ? d : -d)] : [A[0] + (plus ? d : -d), A[1]];
    if (Math.abs(B[0]) > 9 || Math.abs(B[1]) > 9) return null;
    const gdzie = pion ? (plus ? "nad punktem $A$" : "pod punktem $A$") : (plus ? "na prawo od punktu $A$" : "na lewo od punktu $A$");
    const i = pion ? 1 : 0, wsp = pion ? "y" : "x";
    return zad(`Odcinek $AB$ jest ${pion ? "pionowy" : "poziomy"}, punkt ${pk("A", A)}, a długość odcinka wynosi $${d}$. Punkt $B$ leży ${gdzie}. Podaj współrzędne punktu $B$.`,
      poleXY(), { x: B[0], y: B[1] }, `$B = ${kr(B)}$`,
      [`Odcinek jest ${pion ? "pionowy" : "poziomy"}, więc współrzędna $${pion ? "x" : "y"}$ punktu $B$ jest taka sama jak punktu $A$: $${B[1 - i]}$.`,
        `Idziemy $${d}$ ${lm(d, ["kratkę", "kratki", "kratek"])} ${pion ? (plus ? "w górę" : "w dół") : (plus ? "w prawo" : "w lewo")}, więc $${wsp}_B = ${A[i]} ${plus ? "+" : "-"} ${d} = ${B[i]}$.`,
        `Punkt $B = ${kr(B)}$.`]);
  });
}

function srodekOdcinka(r) {
  return probuj(() => {
    const A = [r.int(-8, 8), r.int(-8, 8)], B = [r.int(-8, 8), r.int(-8, 8)];
    if ((A[0] + B[0]) % 2 || (A[1] + B[1]) % 2 || (A[0] === B[0] && A[1] === B[1])) return null;
    const S = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    const sx = A[0] + B[0], sy = A[1] + B[1];
    return zad(`Oblicz współrzędne środka odcinka $AB$, jeśli ${pk("A", A)} i ${pk("B", B)}.`, poleXY(), { x: S[0], y: S[1] }, `$S = ${kr(S)}$`,
      [`Współrzędne środka odcinka to średnie współrzędnych jego końców.`,
        `$x_S = \\frac{${A[0]} + ${nw(B[0])}}{2} = \\frac{${sx}}{2} = ${S[0]}$.`,
        `$y_S = \\frac{${A[1]} + ${nw(B[1])}}{2} = \\frac{${sy}}{2} = ${S[1]}$.`]);
  });
}

function drugiKoniecZeSrodka(r) {
  return probuj(() => {
    const A = [r.int(-7, 7), r.int(-7, 7)], S = [r.int(-5, 5), r.int(-5, 5)];
    const B = [2 * S[0] - A[0], 2 * S[1] - A[1]];
    if (Math.abs(B[0]) > 12 || Math.abs(B[1]) > 12 || (A[0] === S[0] && A[1] === S[1])) return null;
    const dx = S[0] - A[0], dy = S[1] - A[1];
    return zad(`Punkt ${pk("S", S)} jest środkiem odcinka $AB$, a punkt ${pk("A", A)}. Podaj współrzędne punktu $B$.`, poleXY(), { x: B[0], y: B[1] }, `$B = ${kr(B)}$`,
      [`Punkt $S$ jest w połowie drogi, więc ruch z $A$ do $S$ powtarzamy od $S$ do $B$.`,
        `Ruch z $A$ do $S$: $(${rozn2(S[0], A[0])},\\ ${rozn2(S[1], A[1])}) = (${dx},\\ ${dy})$.`,
        `Dodajemy go do $S$: $B = (${S[0]} + ${nw(dx)},\\ ${S[1]} + ${nw(dy)}) = ${kr(B)}$.`]);
  });
}
/** „4 - (-3)” – różnica w kolejności odejmowania (bez zamiany). */
const rozn2 = (a, b) => `${a} - ${nw(b)}`;

const TROJKI_ODCINKA = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]];

function dlugoscUkosna(r) {
  return probuj(() => {
    const [a, b, c] = r.pick(TROJKI_ODCINKA), dx = r.chance(0.5) ? a : b, dy = dx === a ? b : a;
    const A = [r.int(-8, 8), r.int(-8, 8)], B = [A[0] + r.znak() * dx, A[1] + r.znak() * dy];
    if (Math.abs(B[0]) > 9 || Math.abs(B[1]) > 9) return null;
    return zad(`Oblicz długość odcinka $AB$, jeśli ${pk("A", A)} i ${pk("B", B)}.`, [pole("wynik", "Długość odcinka $AB$")], { wynik: c }, `$${c}$`,
      [`Różnica współrzędnych $x$: $${rozn(A[0], B[0])}$. Różnica współrzędnych $y$: $${rozn(A[1], B[1])}$.`,
        `Odcinek jest przeciwprostokątną trójkąta o przyprostokątnych $${dx}$ i $${dy}$: $|AB|^2 = ${dx}^2 + ${dy}^2 = ${dx * dx} + ${dy * dy} = ${c * c}$.`,
        `$|AB| = \\sqrt{${c * c}} = ${c}$.`]);
  });
}

function ukladPunktyIOdcinki(r) {
  return losuj(r, [[7, ktoraCwiartka], [7, ktorePunktWCwiartce], [4, punktNaOsi], [20, odcinekPoziomyPionowy], [10, drugiKoniecPoziomego], [20, srodekOdcinka], [10, drugiKoniecZeSrodka], [22, dlugoscUkosna]]);
}

// --- 12. Układ współrzędnych: brakujący wierzchołek, kwadrat, prostokąt, pole trójkąta

const LITERY = ["A", "B", "C", "D"];

/** Równoległobok ABCD z brakującym wierzchołkiem k: P_k = P_{k-1} + (P_{k+1} - P_{k+2}). */
function rownoleglobokWierzcholek(r) {
  return probuj(() => {
    const A = [r.int(-4, 4), r.int(-4, 4)], u = [r.int(2, 6), r.int(-3, 3)], w = [r.int(-3, 3), r.int(2, 5)];
    if (u[0] * w[1] - u[1] * w[0] === 0 || u[1] === 0 && w[0] === 0) return null;
    const P = [A, [A[0] + u[0], A[1] + u[1]], [A[0] + u[0] + w[0], A[1] + u[1] + w[1]], [A[0] + w[0], A[1] + w[1]]];
    if (P.some((p) => Math.abs(p[0]) > 9 || Math.abs(p[1]) > 9)) return null;
    const k = r.int(0, 3), m = (i) => (i + 4) % 4, nm = (i) => LITERY[m(i)];
    const Pk = P[k], dx = P[m(k + 1)][0] - P[m(k + 2)][0], dy = P[m(k + 1)][1] - P[m(k + 2)][1];
    return zad(`Czworokąt $ABCD$ jest równoległobokiem. Dane są trzy jego wierzchołki: ${wypisz([0, 1, 2, 3].filter((i) => i !== k).map((i) => pk(LITERY[i], P[i])))}. Podaj współrzędne wierzchołka $${LITERY[k]}$.`,
      poleXY(), { x: Pk[0], y: Pk[1] }, `$${LITERY[k]} = ${kr(Pk)}$`,
      [`W równoległoboku przeciwległe boki są równoległe i równe, więc ruch z $${nm(k + 2)}$ do $${nm(k + 1)}$ powtarzamy, zaczynając od $${nm(k - 1)}$, i dochodzimy do $${LITERY[k]}$.`,
        `Ruch z $${nm(k + 2)}$ do $${nm(k + 1)}$: $(${rozn2(P[m(k + 1)][0], P[m(k + 2)][0])},\\ ${rozn2(P[m(k + 1)][1], P[m(k + 2)][1])}) = (${dx},\\ ${dy})$.`,
        `$${LITERY[k]} = (${P[m(k - 1)][0]} + ${nw(dx)},\\ ${P[m(k - 1)][1]} + ${nw(dy)}) = ${kr(Pk)}$.`]);
  });
}

function prostokatOsiWierzcholek(r) {
  return probuj(() => {
    const x1 = r.int(-6, 4), x2 = x1 + r.int(2, 7), y1 = r.int(-6, 4), y2 = y1 + r.int(2, 6);
    const odb = r.chance(0.5);
    const P = odb ? [[x1, y1], [x2, y1], [x2, y2], [x1, y2]] : [[x1, y2], [x2, y2], [x2, y1], [x1, y1]];
    const k = r.int(0, 3), m = (i) => (i + 4) % 4, nm = (i) => LITERY[m(i)];
    const znane = [0, 1, 2, 3].filter((i) => i !== k);
    // P0P1 i P2P3 są poziome (wspólne y), P1P2 i P3P0 pionowe (wspólne x)
    const zNastepnym = k % 2 === 0 ? "y" : "x", zPoprzednim = k % 2 === 0 ? "x" : "y";
    const Pk = P[k], idx = (c) => (c === "x" ? 0 : 1);
    return zad(`Prostokąt $ABCD$ ma boki równoległe do osi układu współrzędnych. Dane są trzy jego wierzchołki: ${wypisz(znane.map((i) => pk(LITERY[i], P[i])))}. Podaj współrzędne wierzchołka $${LITERY[k]}$.`,
      poleXY(), { x: Pk[0], y: Pk[1] }, `$${LITERY[k]} = ${kr(Pk)}$`,
      [`Boki są równoległe do osi, więc każdy bok jest poziomy (stała współrzędna $y$) albo pionowy (stała współrzędna $x$).`,
        `Bok $${LITERY[k]}${nm(k + 1)}$ jest ${zNastepnym === "y" ? "poziomy" : "pionowy"}, więc punkt $${LITERY[k]}$ ma taką samą współrzędną $${zNastepnym}$ jak punkt $${nm(k + 1)}$: $${zNastepnym} = ${Pk[idx(zNastepnym)]}$.`,
        `Bok $${nm(k - 1)}${LITERY[k]}$ jest ${zPoprzednim === "y" ? "poziomy" : "pionowy"}, więc współrzędna $${zPoprzednim}$ punktu $${LITERY[k]}$ jest taka sama jak w punkcie $${nm(k - 1)}$: $${zPoprzednim} = ${Pk[idx(zPoprzednim)]}$.`,
        `Zatem $${LITERY[k]} = ${kr(Pk)}$.`]);
  });
}

function kwadratNaBoku(r) {
  return probuj(() => {
    const s = r.int(2, 7), pion = r.chance(0.5), plus = r.chance(0.5), w = r.chance(0.5) ? 1 : -1;
    const A = [r.int(-5, 3), r.int(-5, 3)];
    const B = pion ? [A[0], A[1] + w * s] : [A[0] + w * s, A[1]];
    const n = pion ? [plus ? s : -s, 0] : [0, plus ? s : -s];
    const C = [B[0] + n[0], B[1] + n[1]], D = [A[0] + n[0], A[1] + n[1]];
    if ([A, B, C, D].some((p) => Math.abs(p[0]) > 9 || Math.abs(p[1]) > 9)) return null;
    const strona = pion ? (plus ? "po prawej stronie prostej $AB$" : "po lewej stronie prostej $AB$") : (plus ? "nad prostą $AB$" : "pod prostą $AB$");
    const cel = r.chance(0.5) ? "C" : "D", Pc = cel === "C" ? C : D;
    const ruch = pion ? (plus ? "w prawo" : "w lewo") : (plus ? "w górę" : "w dół");
    return zad(`Kwadrat $ABCD$ ma bok $AB$, gdzie ${pk("A", A)} i ${pk("B", B)}. Pozostałe wierzchołki leżą ${strona}. Podaj współrzędne wierzchołka $${cel}$.`,
      poleXY(), { x: Pc[0], y: Pc[1] }, `$${cel} = ${kr(Pc)}$`,
      [`Bok $AB$ ma długość $${s}$ (${pion ? "odcinek pionowy" : "odcinek poziomy"}: $${rozn(pion ? A[1] : A[0], pion ? B[1] : B[0])}$), więc każdy bok kwadratu ma $${s}$.`,
        `Bok $${cel === "C" ? "BC" : "AD"}$ jest prostopadły do $AB$ i ma długość $${s}$: od $${cel === "C" ? "B" : "A"}$ idziemy $${s}$ ${lm(s, ["kratkę", "kratki", "kratek"])} ${ruch}.`,
        `$${cel} = ${kr(Pc)}$.`]);
  });
}

function poleTrojkataWUkladzie(r) {
  return probuj(() => {
    const pion = r.chance(0.4), c = r.int(-4, 5), s = r.int(-5, 3), t = s + r.int(2, 8);
    const hh = r.int(2, 6) * (r.chance(0.5) ? 1 : -1), z = c + hh, e = r.int(-5, 5);
    const a = t - s, h = Math.abs(hh);
    if ((a * h) % 2) return null;
    const A = pion ? [c, s] : [s, c], B = pion ? [c, t] : [t, c], C = pion ? [z, e] : [e, z];
    if ([A, B, C].some((p) => Math.abs(p[0]) > 9 || Math.abs(p[1]) > 9)) return null;
    const P = a * h / 2, i = pion ? 1 : 0, j = pion ? 0 : 1;
    return zad(`Trójkąt $ABC$ ma wierzchołki ${pk("A", A)}, ${pk("B", B)} i ${pk("C", C)}. Oblicz pole tego trójkąta.`,
      [pole("wynik", "Pole trójkąta")], { wynik: P }, `$${P}$`,
      [`Punkty $A$ i $B$ mają taką samą współrzędną $${pion ? "x" : "y"} = ${c}$, więc bok $AB$ jest ${pion ? "pionowy" : "poziomy"} i ma długość $${rozn(A[i], B[i])}$.`,
        `Wysokość to odległość punktu $C$ od prostej $AB$ (prostopadle): $${rozn(C[j], c)}$.`,
        `$P = \\frac{${a} \\cdot ${h}}{2} = ${P}$.`]);
  });
}

function poleProstokata(r) {
  return probuj(() => {
    const A = [r.int(-6, 3), r.int(-6, 3)], dx = r.int(2, 8), dy = r.intBez(2, 7, dx);
    const C = [A[0] + dx * (r.chance(0.5) ? 1 : -1), A[1] + dy * (r.chance(0.5) ? 1 : -1)];
    if ([A, C].some((p) => Math.abs(p[0]) > 9 || Math.abs(p[1]) > 9)) return null;
    const ob = r.chance(0.5);
    return zad(`Prostokąt ma boki równoległe do osi układu współrzędnych, a dwa jego przeciwległe wierzchołki to ${pk("A", A)} i ${pk("C", C)}. Oblicz ${ob ? "obwód" : "pole"} tego prostokąta.`,
      [pole("wynik", ob ? "Obwód" : "Pole")], { wynik: ob ? 2 * (dx + dy) : dx * dy }, `$${ob ? 2 * (dx + dy) : dx * dy}$`,
      [`Boki są równoległe do osi, więc jeden bok ma długość równą różnicy współrzędnych $x$: $${rozn(A[0], C[0])}$, a drugi – różnicy współrzędnych $y$: $${rozn(A[1], C[1])}$.`,
        ob ? `Obwód: $2 \\cdot (${dx} + ${dy}) = 2 \\cdot ${dx + dy} = ${2 * (dx + dy)}$.` : `Pole: $${dx} \\cdot ${dy} = ${dx * dy}$.`]);
  });
}

function ukladFigury(r) {
  return losuj(r, [[26, rownoleglobokWierzcholek], [16, prostokatOsiWierzcholek], [20, kwadratNaBoku], [26, poleTrojkataWUkladzie], [14, poleProstokata]]);
}

// --- 13. Symetrie w układzie współrzędnych

const bezZera = (r, m) => r.int(1, m) * r.znak();

function odbiciePunktu(r) {
  const A = [bezZera(r, 9), bezZera(r, 9)], typ = r.int(0, 2);
  const Ap = [[A[0], -A[1]], [-A[0], A[1]], [-A[0], -A[1]]][typ];
  const wzgl = ["osi $x$", "osi $y$", "początku układu współrzędnych"][typ];
  const regula = [
    "Przy symetrii względem osi $x$ współrzędna $x$ zostaje, a współrzędna $y$ zmienia znak.",
    "Przy symetrii względem osi $y$ współrzędna $x$ zmienia znak, a współrzędna $y$ zostaje.",
    "Przy symetrii względem początku układu zmieniają znak obie współrzędne.",
  ][typ];
  const zmiany = [[1], [0], [0, 1]][typ].map((i) => `współrzędna $${"xy"[i]} = ${A[i]}$ zmienia się na $${-A[i]}$`);
  return zad(`Punkt ${pk("A", A)}. Podaj współrzędne punktu $A'$ symetrycznego do punktu $A$ względem ${wzgl}.`,
    poleXY(), { x: Ap[0], y: Ap[1] }, `$A' = ${kr(Ap)}$`,
    [regula, `Zmieniamy znaki: ${zmiany.join(", ")}.`, `Zatem $A' = ${kr(Ap)}$.`]);
}

function odbicieWzgledemProstej(r) {
  return probuj(() => {
    const pion = r.chance(0.5), c = r.int(-4, 5), A = [r.int(-8, 8), r.int(-8, 8)];
    const t = pion ? A[0] : A[1];
    if (t === c) return null;
    const Ap = pion ? [2 * c - A[0], A[1]] : [A[0], 2 * c - A[1]];
    if (Math.abs(Ap[0]) > 14 || Math.abs(Ap[1]) > 14) return null;
    const d = Math.abs(t - c), i = pion ? 0 : 1;
    const strona = pion ? (t < c ? "na lewo od prostej" : "na prawo od prostej") : (t < c ? "pod prostą" : "nad prostą");
    return zad(`Prosta $k$ jest ${pion ? "pionowa" : "pozioma"} i przechodzi przez punkt $${pion ? `(${c}, 0)` : `(0, ${c})`}$. Podaj współrzędne punktu $A'$ symetrycznego do punktu ${pk("A", A)} względem prostej $k$.`,
      poleXY(), { x: Ap[0], y: Ap[1] }, `$A' = ${kr(Ap)}$`,
      [`Prosta $k$ to ${pion ? `wszystkie punkty o współrzędnej $x = ${c}$` : `wszystkie punkty o współrzędnej $y = ${c}$`}. Punkt $A$ leży ${strona} $k$, w odległości $${rozn(t, c)}$.`,
        `Obraz leży po drugiej stronie prostej, w tej samej odległości $${d}$, więc $${"xy"[i]}' = ${c} ${t < c ? "+" : "-"} ${d} = ${Ap[i]}$. Druga współrzędna się nie zmienia: $${pion ? `y' = ${A[1]}` : `x' = ${A[0]}`}$.`,
        `Zatem $A' = ${kr(Ap)}$.`]);
  });
}

function odlegloscOdObrazu(r) {
  const typ = r.int(0, 2);
  if (typ === 2) {
    const [a, b, c] = r.pick(TROJKI_ODCINKA), A = r.chance(0.5) ? [a * r.znak(), b * r.znak()] : [b * r.znak(), a * r.znak()];
    const Ap = [-A[0], -A[1]];
    return zad(`Punkt $A'$ jest symetryczny do punktu ${pk("A", A)} względem początku układu współrzędnych. Oblicz długość odcinka $AA'$.`,
      [pole("wynik", "Długość odcinka $AA'$")], { wynik: 2 * c }, `$${2 * c}$`,
      [`Obrazem jest $A' = ${kr(Ap)}$, a początek układu $O$ jest środkiem odcinka $AA'$, więc $|AA'| = 2 \\cdot |AO|$.`,
        `$|AO| = \\sqrt{${Math.abs(A[0])}^2 + ${Math.abs(A[1])}^2} = \\sqrt{${a * a + b * b}} = ${c}$.`,
        `$|AA'| = 2 \\cdot ${c} = ${2 * c}$.`]);
  }
  const A = [bezZera(r, 9), bezZera(r, 9)], Ap = typ === 0 ? [A[0], -A[1]] : [-A[0], A[1]], i = typ === 0 ? 1 : 0;
  return zad(`Punkt $A'$ jest symetryczny do punktu ${pk("A", A)} względem osi $${typ === 0 ? "x" : "y"}$. Oblicz długość odcinka $AA'$.`,
    [pole("wynik", "Długość odcinka $AA'$")], { wynik: 2 * Math.abs(A[i]) }, `$${2 * Math.abs(A[i])}$`,
    [`Obrazem jest $A' = ${kr(Ap)}$. Punkty mają taką samą współrzędną $${typ === 0 ? "x" : "y"}$, więc odcinek $AA'$ jest ${typ === 0 ? "pionowy" : "poziomy"}.`,
      `Jego długość to różnica współrzędnych $${typ === 0 ? "y" : "x"}$: $${rozn(A[i], Ap[i])}$.`]);
}

const OPCJE_SYMETRII = ["osi $x$", "osi $y$", "początku układu współrzędnych", "żadnego z tych elementów"];

function ktoraSymetria(r) {
  const A = [bezZera(r, 9), bezZera(r, 9)];
  if (Math.abs(A[0]) === Math.abs(A[1])) return ktoraSymetria(r);
  const typ = r.int(0, 3);
  const B = [[A[0], -A[1]], [-A[0], A[1]], [-A[0], -A[1]], [-A[0], -A[1] + 1]][typ];
  const opis = (x, y) => (x === y ? "takie same" : x === -y ? "przeciwne" : "różne (ani takie same, ani przeciwne)");
  const rx = opis(A[0], B[0]), ry = opis(A[1], B[1]);
  return zad(`Dane są punkty ${pk("A", A)} i ${pk("B", B)}. Względem którego z elementów układu współrzędnych te punkty są symetryczne?`,
    [polew("sym", "Symetria względem", OPCJE_SYMETRII)], { sym: typ }, OPCJE_SYMETRII[typ],
    [`Porównujemy współrzędne: współrzędne $x$ są ${rx}, a współrzędne $y$ są ${ry}.`,
      typ === 0 ? "Współrzędna $x$ zostaje, a $y$ zmienia znak – to symetria względem osi $x$."
        : typ === 1 ? "Współrzędna $x$ zmienia znak, a $y$ zostaje – to symetria względem osi $y$."
          : typ === 2 ? "Obie współrzędne zmieniły znak – to symetria względem początku układu."
            : "Przy każdej z tych trzech symetrii każda współrzędna zostaje albo zmienia znak, a tu tak nie jest – to żadna z nich."]);
}

function symetriaSrodkowa(r) {
  return probuj(() => {
    const A = [r.int(-7, 7), r.int(-7, 7)], S = [r.int(-5, 5), r.int(-5, 5)];
    if (A[0] === S[0] && A[1] === S[1]) return null;
    const dx = S[0] - A[0], dy = S[1] - A[1], Ap = [S[0] + dx, S[1] + dy];
    if (Math.abs(Ap[0]) > 12 || Math.abs(Ap[1]) > 12) return null;
    return zad(`Punkt ${pk("A", A)} przekształcono w symetrii środkowej względem punktu ${pk("S", S)}. Podaj współrzędne obrazu $A'$ punktu $A$.`,
      poleXY(), { x: Ap[0], y: Ap[1] }, `$A' = ${kr(Ap)}$`,
      [`W symetrii środkowej punkt $S$ jest środkiem odcinka $AA'$, więc ruch z $A$ do $S$ powtarzamy od $S$ do $A'$.`,
        `Ruch z $A$ do $S$: $(${rozn2(S[0], A[0])},\\ ${rozn2(S[1], A[1])}) = (${dx},\\ ${dy})$.`,
        `$A' = (${S[0]} + ${nw(dx)},\\ ${S[1]} + ${nw(dy)}) = ${kr(Ap)}$.`]);
  });
}

function srodekSymetrii(r) {
  return probuj(() => {
    const A = [r.int(-8, 8), r.int(-8, 8)], Ap = [r.int(-8, 8), r.int(-8, 8)];
    if ((A[0] + Ap[0]) % 2 || (A[1] + Ap[1]) % 2 || (A[0] === Ap[0] && A[1] === Ap[1])) return null;
    const S = [(A[0] + Ap[0]) / 2, (A[1] + Ap[1]) / 2];
    return zad(`Punkt $A'$ jest obrazem punktu $A$ w symetrii środkowej względem pewnego punktu $S$. Dane: ${pk("A", A)} i ${pk("A'", Ap)}. Podaj współrzędne punktu $S$.`,
      poleXY(), { x: S[0], y: S[1] }, `$S = ${kr(S)}$`,
      [`Środek symetrii to środek odcinka $AA'$, czyli średnie współrzędnych obu punktów.`,
        `$x_S = \\frac{${A[0]} + ${nw(Ap[0])}}{2} = \\frac{${A[0] + Ap[0]}}{2} = ${S[0]}$.`,
        `$y_S = \\frac{${A[1]} + ${nw(Ap[1])}}{2} = \\frac{${A[1] + Ap[1]}}{2} = ${S[1]}$.`]);
  });
}

function symetrieWUkladzie(r) {
  return losuj(r, [[26, odbiciePunktu], [14, odbicieWzgledemProstej], [16, odlegloscOdObrazu], [14, ktoraSymetria], [15, symetriaSrodkowa], [15, srodekSymetrii]]);
}

// --- 14. Osie i środek symetrii figur, odległość punktu od jego obrazu (opis słowny)

const FIGURY = [
  { n: "kwadrat", os: 4, sr: true, ob: "To dwie przekątne i dwie proste przechodzące przez środki przeciwległych boków." },
  { n: "prostokąt, który nie jest kwadratem", os: 2, sr: true, ob: "To dwie proste przez środki przeciwległych boków – przekątne nie są osiami symetrii." },
  { n: "romb, który nie jest kwadratem", os: 2, sr: true, ob: "To jego dwie przekątne – proste przez środki boków nie są osiami symetrii." },
  { n: "równoległobok, który nie jest rombem ani prostokątem", os: 0, sr: true, ob: "Ma tylko środek symetrii, a osi nie ma." },
  { n: "trójkąt równoboczny", os: 3, sr: false, ob: "Każda oś biegnie od wierzchołka przez środek przeciwległego boku." },
  { n: "trójkąt równoramienny, który nie jest równoboczny", os: 1, sr: false, ob: "Oś biegnie przez wierzchołek między ramionami i środek podstawy." },
  { n: "trójkąt różnoboczny", os: 0, sr: false, ob: "Wszystkie jego boki są różne, więc nie da się go złożyć na pół." },
  { n: "trapez równoramienny, który nie jest prostokątem", os: 1, sr: false, ob: "Oś biegnie przez środki obu podstaw." },
  { n: "deltoid, który nie jest rombem", os: 1, sr: false, ob: "Oś leży na jednej z jego przekątnych." },
  { n: "pięciokąt foremny", os: 5, sr: false, ob: "Wielokąt foremny o $n$ bokach ma $n$ osi symetrii." },
  { n: "sześciokąt foremny", os: 6, sr: true, ob: "Wielokąt foremny o $n$ bokach ma $n$ osi symetrii." },
  { n: "siedmiokąt foremny", os: 7, sr: false, ob: "Wielokąt foremny o $n$ bokach ma $n$ osi symetrii." },
  { n: "ośmiokąt foremny", os: 8, sr: true, ob: "Wielokąt foremny o $n$ bokach ma $n$ osi symetrii." },
  { n: "koło", os: null, sr: true, ob: "Każda prosta przez środek koła jest jego osią symetrii." },
];
const OSIE = (k) => (k === 0 ? "nie ma żadnej osi symetrii" : `ma ${k} ${lm(k, ["oś", "osie", "osi"])} symetrii`);
/** Nazwa figury jako podmiot zdania z wielkiej litery; po zdaniu podrzędnym („..., który nie jest rombem”) dodaje przecinek. */
const podmiot = (n) => (n.includes(",") ? `${cap(n)},` : cap(n));
const OSIE_SLOWNIE = { 1: "jedną oś", 2: "dwie osie", 3: "trzy osie", 4: "cztery osie", 5: "pięć osi", 6: "sześć osi", 7: "siedem osi", 8: "osiem osi" };

function ileOsi(r) {
  const f = r.pick(FIGURY.filter((x) => x.os !== null));
  return zad(`Ile osi symetrii ma ${f.n}?`, [pole("wynik", "Liczba osi symetrii")], { wynik: f.os }, `$${f.os}$`,
    [`${podmiot(f.n)} ${OSIE(f.os)}.`, f.ob]);
}

function ktoraFiguraMaOsie(r) {
  return probuj(() => {
    const k = r.pick([0, 1, 2, 3, 4, 5, 6, 8]);
    const dobra = r.pick(FIGURY.filter((x) => x.os === k));
    const zle = r.shuffle(FIGURY.filter((x) => x.os !== null && x.os !== k)).slice(0, 3);
    const m = mieszaj(r, dobra.n, zle.map((x) => x.n));
    if (!m) return null;
    return zad(k === 0 ? "Która z podanych figur nie ma żadnej osi symetrii?" : `Która z podanych figur ma dokładnie ${OSIE_SLOWNIE[k]} symetrii?`,
      [polew("fig", "Figura", m.opcje)], { fig: m.ind }, dobra.n,
      m.opcje.map((n) => { const x = FIGURY.find((y) => y.n === n); return `${podmiot(n)} ${OSIE(x.os)}.`; }));
  });
}

function ktoraFiguraMaSrodek(r) {
  return probuj(() => {
    const ma = r.chance(0.5);
    const dobra = r.pick(FIGURY.filter((x) => x.sr === ma));
    const zle = r.shuffle(FIGURY.filter((x) => x.sr !== ma)).slice(0, 3);
    const m = mieszaj(r, dobra.n, zle.map((x) => x.n));
    if (!m) return null;
    return zad(`Która z podanych figur ${ma ? "ma środek" : "nie ma środka"} symetrii?`,
      [polew("fig", "Figura", m.opcje)], { fig: m.ind }, dobra.n,
      [...m.opcje.map((n) => { const x = FIGURY.find((y) => y.n === n); return `${podmiot(n)} ${x.sr ? "ma środek" : "nie ma środka"} symetrii.`; }),
        "Środek symetrii ma figura, która po obrocie o $180^\\circ$ wygląda tak samo."]);
  });
}

function odlegloscSlownie(r) {
  const d = r.int(2, 15), osiowa = r.chance(0.5), odwrotnie = r.chance(0.4);
  if (osiowa) {
    return odwrotnie
      ? zad(`Punkt $A'$ jest symetryczny do punktu $A$ względem prostej $k$ (osi symetrii). Odcinek $AA'$ ma długość $${2 * d}$ cm. W jakiej odległości od prostej $k$ leży punkt $A$?`,
        [pole("wynik", "Odległość (w cm)")], { wynik: d }, `$${d}$ cm`,
        [`Oś symetrii dzieli odcinek $AA'$ na dwie równe części (punkty leżą po przeciwnych stronach osi w tej samej odległości).`, `Odległość punktu $A$ od osi to $${2 * d} : 2 = ${d}$ cm.`])
      : zad(`Punkt $A$ leży w odległości $${d}$ cm od prostej $k$. Punkt $A'$ jest symetryczny do punktu $A$ względem prostej $k$ (osi symetrii). Ile centymetrów ma odcinek $AA'$?`,
        [pole("wynik", "Długość odcinka $AA'$ (w cm)")], { wynik: 2 * d }, `$${2 * d}$ cm`,
        [`Punkt $A'$ leży po drugiej stronie prostej $k$, w takiej samej odległości $${d}$ cm.`, `Odcinek $AA'$ ma więc $${d} + ${d} = ${2 * d}$ cm.`]);
  }
  return odwrotnie
    ? zad(`Punkt $A'$ jest obrazem punktu $A$ w symetrii środkowej względem punktu $S$. Odcinek $AA'$ ma długość $${2 * d}$ cm. Ile centymetrów ma odcinek $AS$?`,
      [pole("wynik", "Długość odcinka $AS$ (w cm)")], { wynik: d }, `$${d}$ cm`,
      [`Punkt $S$ jest środkiem odcinka $AA'$.`, `Odcinek $AS$ to połowa odcinka $AA'$: $${2 * d} : 2 = ${d}$ cm.`])
    : zad(`Punkt $A'$ jest obrazem punktu $A$ w symetrii środkowej względem punktu $S$. Odcinek $AS$ ma długość $${d}$ cm. Ile centymetrów ma odcinek $AA'$?`,
      [pole("wynik", "Długość odcinka $AA'$ (w cm)")], { wynik: 2 * d }, `$${2 * d}$ cm`,
      [`Punkt $S$ jest środkiem odcinka $AA'$, więc $|SA'| = |AS| = ${d}$ cm.`, `Odcinek $AA'$ ma $${d} + ${d} = ${2 * d}$ cm.`]);
}

function symetrieOsieISrodek(r) {
  return losuj(r, [[30, ileOsi], [26, ktoraFiguraMaOsie], [24, ktoraFiguraMaSrodek], [20, odlegloscSlownie]]);
}

// --- Lista generatorów

export const GENERATORY = [
  { id: "katy-przylegle-wierzcholkowe", nazwa: "Kąty przyległe, wierzchołkowe i wokół punktu", opis: "Kąt przyległy i wierzchołkowy, kąty wokół punktu, dwa kąty przyległe w danym stosunku lub różniące się o dane stopnie, kąt między półprostymi na prostej.", temat: "katy", generuj: katyPrzylegleWierzcholkowe },
  { id: "katy-proste-rownolegle", nazwa: "Kąty przy prostych równoległych", opis: "Dwie proste równoległe przecięte trzecią (położenie kątów opisane słowami): kąty odpowiadające (F), naprzemianległe (Z) i jednostronne (C), także w danym stosunku.", temat: "katy", generuj: katyProste },
  { id: "trojkaty-katy", nazwa: "Kąty w trójkącie", opis: "Trzeci kąt, drugi kąt ostry w trójkącie prostokątnym, trójkąt równoramienny, kąt zewnętrzny, kąty w danym stosunku.", temat: "trojkaty", generuj: trojkatyKaty },
  { id: "trojkaty-nierownosc-i-rodzaje", nazwa: "Nierówność trójkąta, rodzaje trójkątów, prawda czy fałsz", opis: "Z których odcinków powstanie trójkąt, możliwe długości trzeciego boku, obwód trójkąta równoramiennego, nazwa trójkąta po kątach i bokach, zdania prawda/fałsz o trójkątach.", temat: "trojkaty", generuj: trojkatyNierownosc },
  { id: "czworokaty-katy", nazwa: "Kąty czworokątów", opis: "Czwarty kąt czworokąta, kąty równoległoboku i rombu, trapezu równoramiennego i prostokątnego, kąty czworokąta lub równoległoboku w danym stosunku.", temat: "czworokaty", generuj: czworokatyKaty },
  { id: "wielokaty-i-wlasnosci", nazwa: "Wielokąty i własności czworokątów", opis: "Suma kątów wielokąta, kąt wielokąta foremnego, brakujący kąt pięciokąta i sześciokąta, liczba boków, zdania prawda/fałsz o czworokątach.", temat: "czworokaty", generuj: wielokatyIZdania },
  { id: "pola-obwody-wzory", nazwa: "Pola i obwody: prostokąt, trójkąt, równoległobok, romb, trapez", opis: "Pole i obwód prostokąta i kwadratu, pole trójkąta, równoległoboku, rombu (z przekątnych) i trapezu, brakujący bok lub wysokość, obwód rombu z przekątnych.", temat: "pola-obwody", generuj: polaObwodyWzory },
  { id: "pola-figury-zlozone-i-jednostki", nazwa: "Figury złożone, jednostki pola, płytki", opis: "Pole i obwód figury w kształcie litery L, prostokąt bez trójkąta, ścieżka wokół basenu, zamiana m², dm², cm², liczba płytek, jak rośnie pole przy powiększeniu boków.", temat: "pola-obwody", generuj: figurySlozoneIJednostki },
  { id: "pitagoras-bok-trojkata", nazwa: "Twierdzenie Pitagorasa: trójki i zastosowania", opis: "Przeciwprostokątna i przyprostokątna (trójki 3-4-5, 5-12-13, 8-15-17, 7-24-25 i ich wielokrotności), przekątna prostokąta, drabina, trójkąt równoramienny, romb, trapez prostokątny.", temat: "pitagoras", generuj: pitagorasBokTrojkata },
  { id: "pitagoras-pierwiastki", nazwa: "Pierwiastki w figurach: √2 i √3", opis: "Przekątna kwadratu a√2, wysokość i pole trójkąta równobocznego, trójkąty 45-45-90 i 30-60-90, wzory do wyboru i przybliżenia √2 ≈ 1,4 oraz √3 ≈ 1,7.", temat: "pitagoras", generuj: pitagorasPierwiastki },
  { id: "uklad-punkty-i-odcinki", nazwa: "Punkty i odcinki w układzie współrzędnych", opis: "Ćwiartka, w której leży punkt, długość odcinka poziomego i pionowego, środek odcinka, drugi koniec odcinka, długość odcinka ukośnego z Pitagorasa.", temat: "uklad-wspolrzednych", generuj: ukladPunktyIOdcinki },
  { id: "uklad-figury-i-wierzcholki", nazwa: "Figury w układzie współrzędnych", opis: "Czwarty wierzchołek równoległoboku, prostokąta i kwadratu, pole trójkąta z bokiem równoległym do osi, pole i obwód prostokąta z dwóch wierzchołków.", temat: "uklad-wspolrzednych", generuj: ukladFigury },
  { id: "symetrie-w-ukladzie", nazwa: "Symetrie w układzie współrzędnych", opis: "Punkt symetryczny względem osi x, osi y, początku układu i prostej pionowej lub poziomej, odległość punktu od obrazu, symetria środkowa i środek symetrii.", temat: "symetrie", generuj: symetrieWUkladzie },
  { id: "symetrie-osie-i-srodek", nazwa: "Osie i środek symetrii figur", opis: "Liczba osi symetrii figur, która figura ma dokładnie tyle osi, która ma środek symetrii, odległość punktu od jego obrazu (symetria osiowa i środkowa).", temat: "symetrie", generuj: symetrieOsieISrodek },
];
