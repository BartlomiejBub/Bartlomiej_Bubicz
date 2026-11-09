// Generatory zadań z działu „Egzamin ósmoklasisty – dane i prawdopodobieństwo”: tabele, diagramy i wykresy, średnia arytmetyczna,
// zliczanie możliwości, prawdopodobieństwo. Zadania ćwiczą dokładnie to, co tłumaczą karty z assets/wzory/e8-dane.js.
// Kontrakt zadania i narzędzia: zob. wspolne.js. Każdy generator ma pole temat – id tematu z assets/arkusze/tematy.js (dział "e8-dane").
// Zadania nie mają rysunków: dane podajemy w tekście albo w małej tabeli KaTeX (dwie wąskie kolumny), diagramy i wykresy są opisane słowami.
// Mediana i dominanta: z listy liczb, z tabeli liczności, po dopisaniu liczby oraz średnia a mediana (jedna bardzo duża wartość).
// Liczby są dobrane tak, żeby wszystko dało się policzyć w pamięci, bez kalkulatora. Rozwiązania są pisane prostym językiem, kilka krótkich kroków.
// Odpowiedzi liczymy dokładnie na Q (bez liczb zmiennoprzecinkowych); pola z ułamkiem przyjmują zarówno zapis zwykły (3/4), jak i dziesiętny (0,75).
// Liczby możliwości w zadaniach o cyfrach są dodatkowo sprawdzane wyliczeniem wszystkich przypadków (błąd w rozkładzie na czynniki wyrzuca wyjątek).
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

const fr = (a, b) => `\\frac{${a}}{${b}}`;
const wypisz = (arr) => (arr.length < 2 ? arr.join("") : `${arr.slice(0, -1).join(", ")} i ${arr[arr.length - 1]}`);

/** Czy zapis dziesiętny jest krótki (mianownik 1, 2, 4, 5 albo 10): średnie i ceny w zadaniach mają najwyżej dwa miejsca po przecinku. */
const ladnaSrednia = (v) => [1, 2, 4, 5, 10].includes(v.d);

/** Losowy rozkład liczby naturalnej `suma` na n składników dodatnich (całkowitych). */
function skladnik(r, n, suma) {
  const ciecia = r.shuffle(Array.from({ length: suma - 1 }, (_, i) => i + 1)).slice(0, n - 1).sort((a, b) => a - b);
  const w = [];
  let poprz = 0;
  for (const c of [...ciecia, suma]) {
    w.push(c - poprz);
    poprz = c;
  }
  return w;
}

const OSOBY = [
  { im: "Ola", k: true }, { im: "Kasia", k: true }, { im: "Ania", k: true }, { im: "Zosia", k: true }, { im: "Magda", k: true }, { im: "Hania", k: true },
  { im: "Marek", k: false }, { im: "Kuba", k: false }, { im: "Tomek", k: false }, { im: "Adam", k: false }, { im: "Bartek", k: false }, { im: "Piotrek", k: false },
];
/** Forma czasownika zależnie od rodzaju osoby: f(osoba, "kupił", "kupiła"). */
const f = (o, m, k) => (o.k ? k : m);

const UCZNIOW = ["uczeń", "uczniów", "uczniów"];
const KSIAZEK = ["książka", "książki", "książek"];
const GALEK = ["gałka", "gałki", "gałek"];
const ZWIERZAT = ["zwierzę", "zwierzęta", "zwierząt"];
const PUNKTOW = ["punkt", "punkty", "punktów"];
const KRESEK = ["kreska", "kreski", "kresek"];
const OCENY = ["ocena", "oceny", "ocen"];
const MOZLIWOSCI = ["możliwość", "możliwości", "możliwości"];
const WYNIKI = ["wynik", "wyniki", "wyników"];
const LAT = ["rok", "lata", "lat"];
const OSOBA_FORMY = ["osoba", "osoby", "osób"];

// =====================================================================================================================
// TEMAT 1. Tabele, diagramy i wykresy
// =====================================================================================================================

// --- 1. Odczyt z tabeli i diagramu słupkowego

const KONTEKSTY_ODCZYTU = [
  {
    wstep: "W ankiecie zapytano uczniów klasy 8a, jak dojeżdżają do szkoły.",
    kat: ["pieszo", "rowerem", "autobusem", "samochodem", "hulajnogą"], nag: "dojazd", kol: "uczniów", jedn: UCZNIOW, et: "Liczba uczniów",
    suma: "Ilu uczniów wzięło udział w ankiecie?",
    ile: (a) => `Ilu uczniów wybrało odpowiedź „${a}”?`,
    roznica: (a, b) => `O ile więcej uczniów wybrało odpowiedź „${a}” niż odpowiedź „${b}”?`,
    razy: (a, b) => `Ile razy więcej uczniów wybrało odpowiedź „${a}” niż odpowiedź „${b}”?`,
    proc: (a) => `Jaki procent wszystkich ankietowanych wybrało odpowiedź „${a}”?`,
    zakres: "Jaka jest różnica między największą a najmniejszą liczbą uczniów, którzy wybrali jedną odpowiedź?",
  },
  {
    wstep: "W szkolnej bibliotece policzono, ile książek z każdego działu wypożyczono w ciągu miesiąca.",
    kat: ["powieści", "komiksy", "wiersze", "poradniki", "encyklopedie"], nag: "dział", kol: "książek", jedn: KSIAZEK, et: "Liczba książek",
    suma: "Ile książek wypożyczono łącznie?",
    ile: (a) => `Ile książek z działu „${a}” wypożyczono?`,
    roznica: (a, b) => `O ile więcej książek z działu „${a}” niż z działu „${b}” wypożyczono?`,
    razy: (a, b) => `Ile razy więcej książek z działu „${a}” niż z działu „${b}” wypożyczono?`,
    proc: (a) => `Jaki procent wszystkich wypożyczonych książek stanowią książki z działu „${a}”?`,
    zakres: "Jaka jest różnica między największą a najmniejszą liczbą wypożyczonych książek z jednego działu?",
  },
  {
    wstep: "W budce z lodami zapisano, ile gałek każdego smaku sprzedano w sobotę.",
    kat: ["wanilia", "czekolada", "truskawka", "cytryna", "malina"], nag: "smak", kol: "gałek", jedn: GALEK, et: "Liczba gałek",
    suma: "Ile gałek lodów sprzedano łącznie?",
    ile: (a) => `Ile gałek o smaku „${a}” sprzedano?`,
    roznica: (a, b) => `O ile więcej gałek o smaku „${a}” niż o smaku „${b}” sprzedano?`,
    razy: (a, b) => `Ile razy więcej gałek o smaku „${a}” niż o smaku „${b}” sprzedano?`,
    proc: (a) => `Jaki procent wszystkich sprzedanych gałek stanowią gałki o smaku „${a}”?`,
    zakres: "Jaka jest różnica między największą a najmniejszą liczbą sprzedanych gałek jednego smaku?",
  },
  {
    wstep: "W schronisku dla zwierząt policzono zwierzęta w poszczególnych grupach.",
    kat: ["psy", "koty", "króliki", "papugi", "chomiki"], nag: "grupa", kol: "zwierząt", jedn: ZWIERZAT, et: "Liczba zwierząt",
    suma: "Ile zwierząt jest w schronisku?",
    ile: (a) => `Ile zwierząt jest w grupie „${a}”?`,
    roznica: (a, b) => `O ile więcej zwierząt jest w grupie „${a}” niż w grupie „${b}”?`,
    razy: (a, b) => `Ile razy więcej zwierząt jest w grupie „${a}” niż w grupie „${b}”?`,
    proc: (a) => `Jaki procent wszystkich zwierząt w schronisku stanowią zwierzęta z grupy „${a}”?`,
    zakres: "Jaka jest różnica między największą a najmniejszą liczbą zwierząt w jednej grupie?",
  },
  {
    wstep: "W szkolnym turnieju rywalizowały drużyny, a po zakończeniu zapisano punkty każdej z nich.",
    kat: ["Orły", "Lwy", "Sokoły", "Wilki", "Jastrzębie"], nag: "drużyna", kol: "punkty", jedn: PUNKTOW, et: "Liczba punktów",
    suma: "Ile punktów zdobyły wszystkie drużyny razem?",
    ile: (a) => `Ile punktów zdobyła drużyna „${a}”?`,
    roznica: (a, b) => `O ile punktów więcej zdobyła drużyna „${a}” niż drużyna „${b}”?`,
    razy: (a, b) => `Ile razy więcej punktów zdobyła drużyna „${a}” niż drużyna „${b}”?`,
    proc: (a) => `Jaki procent wszystkich zdobytych punktów zdobyła drużyna „${a}”?`,
    zakres: "Jaka jest różnica między największą a najmniejszą liczbą punktów zdobytych przez jedną drużynę?",
  },
];

function tabelaIDiagram(r) {
  return probuj(() => {
    const k = r.pick(KONTEKSTY_ODCZYTU);
    const diagram = r.chance(0.5);
    let typ = r.pick(["suma", "roznica", "roznica", "razy", "proc", "proc", "zakres", "ile", "ile"]);
    if (!diagram && typ === "ile") typ = "suma";
    const n = r.int(3, 5);
    const kat = r.shuffle(k.kat).slice(0, n);
    let czesci;
    if (typ === "proc") {
      czesci = skladnik(r, n, r.pick(diagram ? [10, 20, 25] : [10, 20, 25, 40, 50]));
    } else if (typ === "razy") {
      const B = r.int(1, 4), mn = r.pick([2, 3, 4, 5]);
      czesci = [mn * B, B, ...Array.from({ length: n - 2 }, () => r.int(1, 12))];
    } else {
      czesci = Array.from({ length: n }, () => r.int(1, 12));
    }
    if (diagram && czesci.some((c) => c > 12)) return null;
    const u = diagram ? r.pick([2, 5, 10, 20, 50]) : r.pick([1, 2, 3, 4, 5, 6, 10]);
    const v = czesci.map((c) => c * u);
    const suma = v.reduce((a, b) => a + b, 0);
    const jedn = (x) => `$${dz(x)}$ ${lm(Number(x), k.jedn)}`;

    let i = r.int(0, n - 1), j = 0;
    if (typ === "roznica") {
      [i, j] = r.shuffle([...kat.keys()]).slice(0, 2);
      if (v[i] === v[j]) return null;
      if (v[i] < v[j]) [i, j] = [j, i];
    }
    const uz = typ === "roznica" ? [i, j] : typ === "razy" ? [0, 1] : typ === "ile" ? [i] : kat.map((_, t) => t);

    const kroki = [];
    if (diagram) {
      kroki.push(`Jedna kreska to $${u}$ ${lm(u, k.jedn)}, więc wartość słupka to liczba kresek razy $${u}$: ${wypisz(uz.map((t) => `„${kat[t]}” – $${czesci[t]} \\cdot ${u} = ${v[t]}$`))}.`);
    }

    let pyt, ans, wyn, etykieta = k.et;
    if (typ === "suma") {
      pyt = k.suma;
      ans = q(suma);
      wyn = jedn(suma);
      kroki.push(`Dodajemy wszystkie wartości: $${v.join(" + ")} = ${suma}$.`);
    } else if (typ === "ile") {
      pyt = k.ile(kat[i]);
      ans = q(v[i]);
      wyn = jedn(v[i]);
      kroki.push(`Odpowiedź: $${v[i]}$ ${lm(v[i], k.jedn)}.`);
    } else if (typ === "roznica") {
      pyt = k.roznica(kat[i], kat[j]);
      ans = q(v[i] - v[j]);
      wyn = jedn(v[i] - v[j]);
      kroki.push(`„${kat[i]}” to $${v[i]}$, a „${kat[j]}” to $${v[j]}$. „O ile więcej” oznacza odejmowanie: $${v[i]} - ${v[j]} = ${v[i] - v[j]}$.`);
    } else if (typ === "razy") {
      pyt = k.razy(kat[0], kat[1]);
      ans = q(v[0], v[1]);
      wyn = `$${dz(ans)}$`;
      etykieta = "Wynik (ile razy)";
      kroki.push(`„${kat[0]}” to $${v[0]}$, a „${kat[1]}” to $${v[1]}$. „Ile razy więcej” oznacza dzielenie: $${v[0]} : ${v[1]} = ${dz(ans)}$.`);
      kroki.push(`Sprawdzenie: $${dz(ans)} \\cdot ${v[1]} = ${v[0]}$ – zgadza się.`);
    } else if (typ === "proc") {
      const ul = q(v[i], suma), p = ul.mul(100);
      pyt = k.proc(kat[i]);
      ans = p;
      wyn = `$${dz(p)}\\%$`;
      etykieta = "Wynik (w procentach)";
      kroki.push(`Wszystkich jest razem $${v.join(" + ")} = ${suma}$.`);
      kroki.push(`„${kat[i]}” to $${v[i]}$ z $${suma}$, czyli ułamek $${fr(v[i], suma)}$${ul.d !== suma ? `, po skróceniu $${ul.tex()}$` : ""}.`);
      kroki.push(`Zamieniamy na procenty: $${ul.tex()} \\cdot 100\\% = ${dz(p)}\\%$.`);
    } else {
      const mx = Math.max(...v), mi = Math.min(...v);
      if (mx === mi) return null;
      pyt = k.zakres;
      ans = q(mx - mi);
      wyn = jedn(mx - mi);
      kroki.push(`Największa wartość to $${mx}$ („${kat[v.indexOf(mx)]}”), a najmniejsza to $${mi}$ („${kat[v.indexOf(mi)]}”).`);
      kroki.push(`Różnica: $${mx} - ${mi} = ${mx - mi}$.`);
    }

    let opis;
    if (diagram) {
      opis = `${k.wstep} Wyniki przedstawiono na diagramie słupkowym. Jedna kreska na osi pionowej oznacza $${u}$ ${lm(u, k.jedn)}. Słupki mają wysokości: ${wypisz(kat.map((c, t) => `„${c}” – $${czesci[t]}$ ${lm(czesci[t], KRESEK)}`))}.`;
    } else {
      const tabela = `\\begin{array}{c|c} \\text{${k.nag}} & \\text{${k.kol}} \\\\ \\hline ${kat.map((c, t) => `\\text{${c}} & ${v[t]}`).join(" \\\\ ")} \\end{array}`;
      opis = `${k.wstep} Wyniki przedstawiono w tabeli.\n\n$${tabela}$`;
    }
    return zad(`${opis}\n\n${pyt}`, [pole("wynik", etykieta)], { wynik: ans }, wyn, kroki);
  });
}

// --- 2. Wykres kołowy i wykres zależności (droga w czasie)

const ANKIETY = [
  { intro: "W ankiecie zapytano uczniów, jak dojeżdżają do szkoły.", kat: ["pieszo", "rowerem", "autobusem", "samochodem"] },
  { intro: "W ankiecie zapytano uczniów, jaki sport lubią najbardziej.", kat: ["piłka nożna", "siatkówka", "pływanie", "koszykówka"] },
  { intro: "W ankiecie zapytano uczniów, jakie zwierzę chcieliby mieć w domu.", kat: ["pies", "kot", "królik", "chomik"] },
  { intro: "W ankiecie zapytano uczniów, który przedmiot szkolny lubią najbardziej.", kat: ["matematyka", "język polski", "informatyka", "wychowanie fizyczne"] },
];

function wykresKolowy(r) {
  return probuj(() => {
    const a = r.pick(ANKIETY);
    const kat = r.shuffle(a.kat);
    const w = r.int(0, 3);
    if (w === 0) {
      // kąt wycinka -> liczba uczniów
      const N = r.pick([20, 24, 30, 36, 40, 45, 48, 60, 72, 90, 120, 180]);
      const alfa = r.pick([30, 36, 40, 45, 60, 72, 90, 108, 120, 144, 180]);
      const ul = q(alfa, 360), ile = ul.mul(N);
      if (!ile.calkowita || Number(ile) < 1) return null;
      return zad(
        `${a.intro} W ankiecie wzięło udział $${N}$ uczniów. Wyniki przedstawiono na wykresie kołowym. Wycinek koła odpowiadający odpowiedzi „${kat[0]}” ma kąt $${alfa}^\\circ$. Ilu uczniów wybrało odpowiedź „${kat[0]}”?`,
        [pole("ile", "Liczba uczniów")], { ile }, `$${dz(ile)}$ ${lm(Number(ile), UCZNIOW)}`,
        [
          `Całe koło ma $360^\\circ$. Wycinek o kącie $${alfa}^\\circ$ to $${fr(alfa, 360)}$ koła${ul.d !== 360 ? `, czyli $${ul.tex()}$ koła` : ""}.`,
          `Tyle samo uczniów wybrało tę odpowiedź: $${ul.tex()} \\cdot ${N} = ${dz(ile)}$.`,
        ],
      );
    }
    if (w === 1) {
      // liczba uczniów -> kąt wycinka
      const N = r.pick([20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180]);
      const n = r.int(2, N - 2);
      const jeden = 360 / N, alfa = q(n * jeden);
      if (Number(alfa) < 18 || Number(alfa) > 180) return null;
      return zad(
        `${a.intro} W ankiecie wzięło udział $${N}$ uczniów, a odpowiedź „${kat[0]}” wybrało $${n}$ ${lm(n, UCZNIOW)}. Wyniki przedstawiono na wykresie kołowym. Jaki kąt (w stopniach) ma wycinek koła odpowiadający odpowiedzi „${kat[0]}”?`,
        [pole("kat", "Kąt (w stopniach)")], { kat: alfa }, `$${dz(alfa)}^\\circ$`,
        [
          `Całe koło ma $360^\\circ$ i odpowiada $${N}$ uczniom, więc jednemu uczniowi odpowiada kąt $360^\\circ : ${N} = ${jeden}^\\circ$.`,
          `Odpowiedź wybrało $${n}$ ${lm(n, UCZNIOW)}, więc wycinek ma $${n} \\cdot ${jeden}^\\circ = ${dz(alfa)}^\\circ$.`,
          `Sprawdzenie ułamkiem: $${n}$ z $${N}$ uczniów to $${q(n, N).tex()}$ koła, a $${q(n, N).tex()} \\cdot 360^\\circ = ${dz(alfa)}^\\circ$ – zgadza się.`,
        ],
      );
    }
    if (w === 2) {
      // kąt wycinka i liczba uczniów w wycinku -> wszyscy uczniowie
      const alfa = r.pick([30, 36, 40, 45, 60, 72, 90, 120, 180]);
      const x = 360 / alfa, n = r.int(2, 15), N = x * n;
      if (N > 200) return null;
      return zad(
        `${a.intro} Wyniki przedstawiono na wykresie kołowym. Wycinek koła odpowiadający odpowiedzi „${kat[0]}” ma kąt $${alfa}^\\circ$ i przedstawia $${n}$ ${lm(n, UCZNIOW)}. Ilu uczniów wzięło udział w ankiecie?`,
        [pole("wszyscy", "Liczba uczniów")], { wszyscy: q(N) }, `$${N}$ ${lm(N, UCZNIOW)}`,
        [
          `Wycinek o kącie $${alfa}^\\circ$ to $${fr(alfa, 360)} = ${fr(1, x)}$ koła.`,
          `Skoro $${fr(1, x)}$ wszystkich uczniów to $${n}$ ${lm(n, UCZNIOW)}, to wszystkich jest $${x}$ razy tyle: $${x} \\cdot ${n} = ${N}$.`,
          `Sprawdzenie: $${fr(1, x)}$ z $${N}$ to $${N} : ${x} = ${n}$ – zgadza się.`,
        ],
      );
    }
    // trzy wycinki podane kątami, procent czwartego
    const kąty = [r.pick([36, 54, 72, 90, 108, 126, 144]), r.pick([36, 54, 72, 90, 108, 126, 144]), r.pick([36, 54, 72, 90, 108])];
    const S = kąty[0] + kąty[1] + kąty[2];
    const reszta = 360 - S;
    if (reszta < 18) return null;
    const p = q(reszta, 360).mul(100);
    return zad(
      `${a.intro} Wyniki przedstawiono na wykresie kołowym z czterema wycinkami. Wycinki odpowiadające odpowiedziom „${kat[0]}”, „${kat[1]}” i „${kat[2]}” mają kąty $${kąty[0]}^\\circ$, $${kąty[1]}^\\circ$ i $${kąty[2]}^\\circ$. Pozostały wycinek odpowiada odpowiedzi „${kat[3]}”. Jaki procent uczniów wybrał odpowiedź „${kat[3]}”?`,
      [pole("proc", "Wynik (w procentach)")], { proc: p }, `$${dz(p)}\\%$`,
      [
        `Kąty wszystkich wycinków dają razem $360^\\circ$. Trzy znane wycinki: $${kąty.join(" + ")} = ${S}$ stopni.`,
        `Na czwarty wycinek zostaje $360 - ${S} = ${reszta}$ stopni.`,
        `To $${fr(reszta, 360)}${q(reszta, 360).d !== 360 ? ` = ${q(reszta, 360).tex()}` : ""}$ koła, czyli $${q(reszta, 360).tex()} \\cdot 100\\% = ${dz(p)}\\%$.`,
      ],
    );
  });
}

const PREDKOSCI_ROWER = [8, 10, 12, 14, 16, 18, 20, 24];
const PREDKOSCI_AUTOBUS = [40, 50, 60, 70, 80];

function wykresDrogi(r) {
  return probuj(() => {
    const o = r.pick(OSOBY);
    const autobus = r.chance(0.35);
    const PRED = autobus ? PREDKOSCI_AUTOBUS : PREDKOSCI_ROWER;
    const nSeg = r.int(3, 4);
    const rodzaje = Array(nSeg).fill("jazda");
    const maPostoj = r.chance(0.65);
    if (maPostoj) rodzaje[r.int(1, nSeg - 1)] = "postoj";
    if (r.chance(0.4) && rodzaje[nSeg - 1] === "jazda") rodzaje[nSeg - 1] = "powrot";
    const odc = [];
    let s = 0, t = q(0);
    for (const rd of rodzaje) {
      const dt = q(r.int(1, rd === "postoj" ? 3 : 4), 2);
      const v = rd === "postoj" ? 0 : r.pick(PRED);
      const ds = q(v).mul(dt).mul(rd === "powrot" ? -1 : 1);
      if (!ds.calkowita) return null;
      const s0 = s, t0 = t;
      s += Number(ds);
      t = t.add(dt);
      if (s < 0) return null;
      odc.push({ rd, v, dt, ds: Number(ds), s0, s1: s, t0, t1: t });
    }
    if (Number(t) > 8) return null;
    const jazdy = odc.filter((x) => x.rd !== "postoj");
    const typy = ["predkosc", "droga", "najdalej"];
    if (maPostoj) typy.push("postoj", "postoj", "czasJazdy");
    if (jazdy.length >= 2 && new Set(jazdy.map((x) => x.v)).size >= 2) typy.push("najw");
    const typ = r.pick(typy);

    const punkty = [{ t: q(0), s: 0 }, ...odc.map((x) => ({ t: x.t1, s: x.s1 }))];
    const tabela = `\\begin{array}{c|c} \\text{czas (h)} & \\text{odległość (km)} \\\\ \\hline ${punkty.map((p) => `${dz(p.t)} & ${p.s}`).join(" \\\\ ")} \\end{array}`;
    const cel = autobus ? "dworca" : "domu";
    const wstep = autobus
      ? `Wykres przedstawia, jak zmieniała się odległość autobusu od dworca podczas kursu. Czas liczymy od chwili odjazdu autobusu. W tabeli podano punkty załamania wykresu, a kolejne punkty połączono odcinkami.`
      : `Wykres przedstawia, jak zmieniała się odległość od domu podczas wycieczki rowerowej. ${o.im} ${f(o, "wyjechał", "wyjechała")} z domu, a czas liczymy od chwili wyjazdu. W tabeli podano punkty załamania wykresu, a kolejne punkty połączono odcinkami.`;
    const jechal = autobus ? "jechał autobus" : `${f(o, "jechał", "jechała")} ${o.im}`;
    const rok = (x) => `od godziny $${dz(x.t0)}$ do godziny $${dz(x.t1)}$`;

    let pyt, ans, wyn, et, kroki;
    if (typ === "postoj") {
      const p = odc.find((x) => x.rd === "postoj"), min = p.dt.mul(60);
      pyt = "Ile minut trwał postój podczas tej trasy?";
      ans = min; wyn = `$${dz(min)}$ min`; et = "Czas postoju (w minutach)";
      kroki = [
        `Postój to czas, w którym odległość się nie zmienia (linia wykresu jest pozioma). W tabeli jest tak ${rok(p)}: w obu punktach odległość to $${p.s0}$ km.`,
        `Postój trwał $${dz(p.t1)} - ${dz(p.t0)} = ${dz(p.dt)}$ h, czyli $${dz(p.dt)} \\cdot 60 = ${dz(min)}$ min.`,
      ];
    } else if (typ === "predkosc") {
      const p = r.pick(jazdy);
      pyt = `Z jaką prędkością (w km/h) ${autobus ? "jechał autobus" : `${f(o, "jechał", "jechała")} ${o.im}`} ${rok(p)}?`;
      ans = q(p.v); wyn = `$${p.v}$ km/h`; et = "Prędkość (w km/h)";
      kroki = [
        `Z tabeli: ${rok(p)} odległość zmieniła się z $${p.s0}$ km na $${p.s1}$ km, czyli o $${Math.abs(p.ds)}$ km${p.rd === "powrot" ? " (w stronę " + (autobus ? "dworca" : "domu") + ")" : ""}.`,
        `Czas trwania tego odcinka: $${dz(p.t1)} - ${dz(p.t0)} = ${dz(p.dt)}$ h.`,
        `Prędkość to droga podzielona przez czas: $${Math.abs(p.ds)} : ${dz(p.dt)} = ${p.v}$ km/h.`,
      ];
    } else if (typ === "najw") {
      const mx = Math.max(...jazdy.map((x) => x.v));
      pyt = autobus ? "Jaka była największa prędkość (w km/h) autobusu na tej trasie?" : `Jaka była największa prędkość (w km/h), z jaką ${o.im} ${f(o, "jechał", "jechała")} podczas tej wycieczki?`;
      ans = q(mx); wyn = `$${mx}$ km/h`; et = "Największa prędkość (w km/h)";
      kroki = [
        `Prędkość na każdym odcinku to droga podzielona przez czas (postój pomijamy, bo wtedy prędkość jest równa $0$): ${wypisz(jazdy.map((x) => `$${Math.abs(x.ds)} : ${dz(x.dt)} = ${x.v}$ km/h`))}.`,
        `Największa z tych prędkości to $${mx}$ km/h.`,
      ];
    } else if (typ === "droga") {
      const razem = jazdy.reduce((acc, x) => acc + Math.abs(x.ds), 0);
      pyt = autobus ? "Ile kilometrów w sumie przejechał autobus podczas całego kursu?" : `Ile kilometrów w sumie ${f(o, "przejechał", "przejechała")} ${o.im} podczas całej wycieczki?`;
      ans = q(razem); wyn = `$${razem}$ km`; et = "Przejechana droga (w km)";
      const dopisek = [maPostoj ? "na postoju droga się nie zmienia" : "", odc.some((x) => x.rd === "powrot") ? `przy powrocie odległość od ${cel} maleje, ale kilometry nadal się przejeżdża` : ""].filter(Boolean);
      kroki = [
        `Dodajemy drogi z odcinków, na których ${autobus ? "autobus jechał" : "jechano"}${dopisek.length ? ` (${dopisek.join("; ")})` : ""}: ${wypisz(jazdy.map((x) => `$${Math.abs(x.ds)}$ km`))}.`,
        `Razem: $${jazdy.map((x) => Math.abs(x.ds)).join(" + ")} = ${razem}$ km.`,
      ];
    } else if (typ === "czasJazdy") {
      const razem = jazdy.reduce((acc, x) => acc.add(x.dt), q(0));
      pyt = autobus ? "Ile godzin autobus był w ruchu (nie licząc postoju)?" : `Ile godzin ${o.im} ${f(o, "jechał", "jechała")} (nie licząc postoju)?`;
      ans = razem; wyn = `$${dz(razem)}$ h`; et = "Czas jazdy (w godzinach)";
      kroki = [
        `Cały czas trasy to $${dz(t)}$ h. Postój trwał $${dz(odc.find((x) => x.rd === "postoj").dt)}$ h (linia pozioma).`,
        `Czas jazdy: $${dz(t)} - ${dz(odc.find((x) => x.rd === "postoj").dt)} = ${dz(razem)}$ h.`,
      ];
    } else {
      const mx = Math.max(...punkty.map((p) => p.s));
      pyt = `Jaka była największa odległość od ${cel} (w km) podczas tej trasy?`;
      ans = q(mx); wyn = `$${mx}$ km`; et = "Odległość (w km)";
      kroki = [
        `Odległości z tabeli: ${listaTex(punkty.map((p) => p.s))}.`,
        `Największa z nich to $${mx}$ km.`,
      ];
    }
    return zad(`${wstep}\n\n$${tabela}$\n\n${pyt}`, [pole("wynik", et)], { wynik: ans }, wyn, kroki);
  });
}

function wykresKolowyIZaleznosci(r) {
  return r.chance(0.45) ? wykresKolowy(r) : wykresDrogi(r);
}

// =====================================================================================================================
// TEMAT 2. Średnia arytmetyczna
// =====================================================================================================================

// --- 3. Średnia, suma i brakująca liczba

const KONTEKSTY_SREDNIA = [
  {
    lo: 0, hi: 5, ns: [4, 5, 8, 10],
    dane: (o, n) => `W ostatnich $${n}$ meczach drużyna strzeliła kolejno taką liczbę bramek:`,
    pytSr: "Oblicz średnią liczbę bramek strzelonych przez drużynę w jednym meczu.",
    zdanie: (o, n, m) => `Średnia liczba bramek strzelonych przez drużynę w $${n}$ meczach jest równa $${m}$.`,
    pytSuma: "Ile bramek strzeliła drużyna łącznie w tych meczach?",
    pytBrak: (o, n, m) => `Ile bramek musi strzelić drużyna w kolejnym meczu, aby średnia liczba bramek z $${n}$ meczów była równa $${m}$?`,
    et: "Średnia liczba bramek", etSuma: "Liczba bramek", etBrak: "Liczba bramek", fmt: (v) => `$${dz(v)}$`,
  },
  {
    lo: 2, hi: 6, ns: [4, 5, 6, 8, 10],
    dane: (o, n) => `${o.im} ${f(o, "dostał", "dostała")} z matematyki $${n}$ ${lm(n, OCENY)}:`,
    pytSr: "Oblicz średnią arytmetyczną tych ocen.",
    zdanie: (o, n, m) => `Średnia arytmetyczna ocen z matematyki z $${n}$ sprawdzianów jest równa $${m}$.`,
    pytSuma: "Ile wynosi suma wszystkich tych ocen?",
    pytBrak: (o, n, m) => `Jaką ocenę musi dostać ${o.im} z następnego sprawdzianu, aby średnia z $${n}$ ocen wyniosła $${m}$?`,
    et: "Średnia ocen", etSuma: "Suma ocen", etBrak: "Ocena", fmt: (v) => `$${dz(v)}$`,
  },
  {
    lo: 150, hi: 175, ns: [4, 5],
    dane: (o, n) => `Wzrost (w cm) $${n}$ uczniów jest równy:`,
    pytSr: "Oblicz średni wzrost tych uczniów (w centymetrach).",
    zdanie: (o, n, m) => `Średni wzrost $${n}$ uczniów jest równy $${m}$ cm.`,
    pytSuma: "Ile centymetrów wynosi suma wzrostów wszystkich tych uczniów?",
    pytBrak: (o, n, m) => `Jaki wzrost (w cm) ma ostatni z $${n}$ uczniów, jeśli średni wzrost wszystkich wynosi $${m}$ cm?`,
    et: "Średni wzrost (w cm)", etSuma: "Suma wzrostów (w cm)", etBrak: "Wzrost (w cm)", fmt: (v) => `$${dz(v)}$ cm`,
  },
  {
    lo: 8, hi: 26, ns: [4, 5, 6, 8, 10],
    dane: (o, n) => `W ciągu $${n}$ kolejnych dni południowa temperatura powietrza (w °C) wynosiła:`,
    pytSr: "Oblicz średnią temperaturę południową w tym czasie (w °C).",
    zdanie: (o, n, m) => `Średnia południowa temperatura powietrza w ciągu $${n}$ dni wynosiła $${m}^\\circ\\text{C}$.`,
    pytSuma: "Ile wynosi suma tych temperatur (w °C)?",
    pytBrak: (o, n, m) => `Jaka musi być temperatura (w °C) w kolejnym dniu, aby średnia z $${n}$ dni wyniosła $${m}^\\circ\\text{C}$?`,
    et: "Średnia temperatura (w °C)", etSuma: "Suma temperatur (w °C)", etBrak: "Temperatura (w °C)", fmt: (v) => `$${dz(v)}^\\circ\\text{C}$`,
  },
  {
    lo: 3, hi: 10, ns: [4, 5, 8, 10],
    dane: (o, n) => `${o.im} ${f(o, "uzyskał", "uzyskała")} na kolejnych kartkówkach następującą liczbę punktów:`,
    pytSr: "Oblicz średnią liczbę punktów z jednej kartkówki.",
    zdanie: (o, n, m) => `Średnia liczba punktów z $${n}$ kartkówek jest równa $${m}$.`,
    pytSuma: "Ile punktów uzyskano łącznie ze wszystkich tych kartkówek?",
    pytBrak: (o, n, m) => `Ile punktów musi uzyskać ${o.im} z kolejnej kartkówki, aby średnia z $${n}$ kartkówek wyniosła $${m}$?`,
    et: "Średnia liczba punktów", etSuma: "Liczba punktów", etBrak: "Liczba punktów", fmt: (v) => `$${dz(v)}$`,
  },
  {
    lo: 12, hi: 40, ns: [4, 5, 6, 8, 10],
    dane: (o, n) => `${o.im} ${f(o, "zapisał", "zapisała")} czas dojazdu do szkoły (w minutach) w $${n}$ kolejnych dniach:`,
    pytSr: "Oblicz średni czas dojazdu do szkoły (w minutach).",
    zdanie: (o, n, m) => `Średni czas dojazdu do szkoły w ciągu $${n}$ dni wyniósł $${m}$ min.`,
    pytSuma: "Ile minut łącznie trwały wszystkie te dojazdy?",
    pytBrak: (o, n, m) => `Ile minut musi trwać dojazd w kolejnym dniu, aby średni czas z $${n}$ dni wyniósł $${m}$ min?`,
    et: "Średni czas (w minutach)", etSuma: "Czas (w minutach)", etBrak: "Czas (w minutach)", fmt: (v) => `$${dz(v)}$ min`,
  },
];

function sredniaSumaBrak(r) {
  return probuj(() => {
    const o = r.pick(OSOBY);
    const typ = r.pick(["srednia", "srednia", "srednia", "suma", "brak", "brak", "brak", "liczby"]);
    if (typ === "liczby") {
      const c = r.pick([2, 3, 3, 4]);
      const wartosci = Array.from({ length: c }, () => r.int(2, 50));
      const suma = wartosci.reduce((a, b) => a + b, 0), m = q(suma, c);
      if (!ladnaSrednia(m) || (c > 2 && !m.calkowita) || new Set(wartosci).size < 2) return null;
      const znane = wartosci.slice(0, c - 1), x = wartosci[c - 1];
      const slowa = [null, null, "dwóch", "trzech", "czterech"][c], ktore = [null, null, "Jedna z nich to", "Dwie z nich to", "Trzy z nich to"][c];
      const jaka = [null, null, "druga", "trzecia", "czwarta"][c];
      return zad(
        `Średnia arytmetyczna ${slowa} liczb jest równa $${dz(m)}$. ${ktore} ${wypisz(znane.map((z) => `$${z}$`))}. Jaka jest ${jaka} liczba?`,
        [pole("x", "Szukana liczba")], { x: q(x) }, `$${x}$`,
        [
          `Suma ${slowa} liczb ma być równa średniej razy liczba liczb: $${c} \\cdot ${dz(m)} = ${suma}$.`,
          znane.length === 1 ? `Znana liczba to $${znane[0]}$.` : `Znane liczby dają razem $${znane.join(" + ")} = ${znane.reduce((a, b) => a + b, 0)}$.`,
          `Brakująca liczba to $${suma} - ${znane.reduce((a, b) => a + b, 0)} = ${x}$.`,
          `Sprawdzenie: $(${znane.join(" + ")} + ${x}) : ${c} = ${suma} : ${c} = ${dz(m)}$ – zgadza się.`,
        ],
      );
    }
    const k = r.pick(KONTEKSTY_SREDNIA);
    const n = r.pick(k.ns);
    if (typ === "suma") {
      const d = r.pick([1, 1, 2, 4, 5, 10]);
      const m = q(r.int(Math.max(k.lo * d, 1), k.hi * d), d);
      const S = m.mul(n);
      if (!S.calkowita || m.eq(k.lo) || m.eq(k.hi)) return null;
      return zad(
        `${k.zdanie(o, n, dz(m))} ${k.pytSuma}`,
        [pole("suma", k.etSuma)], { suma: S }, k.fmt(S),
        [
          `Średnia to suma podzielona przez liczbę składników, więc suma to średnia razy liczba składników.`,
          `$${n} \\cdot ${dz(m)} = ${dz(S)}$.`,
          `Sprawdzenie: $${dz(S)} : ${n} = ${dz(m)}$ – zgadza się.`,
        ],
      );
    }
    const wartosci = Array.from({ length: n }, () => r.int(k.lo, k.hi));
    const suma = wartosci.reduce((a, b) => a + b, 0), m = q(suma, n);
    if (!ladnaSrednia(m) || new Set(wartosci).size < 2) return null;
    if (typ === "srednia") {
      return zad(
        `${k.dane(o, n)} ${listaTex(wartosci)}.\n\n${k.pytSr}`,
        [pole("srednia", k.et)], { srednia: m }, k.fmt(m),
        [
          `Dodajemy wszystkie liczby: $${wartosci.join(" + ")} = ${suma}$.`,
          `Liczb jest $${n}$, więc dzielimy sumę przez $${n}$: $${suma} : ${n} = ${dz(m)}$.`,
          `Sprawdzenie sensu: wynik leży między najmniejszą ($${Math.min(...wartosci)}$) a największą ($${Math.max(...wartosci)}$) liczbą.`,
        ],
      );
    }
    const znane = wartosci.slice(0, n - 1), x = wartosci[n - 1], K = suma - x;
    return zad(
      `${k.dane(o, n - 1)} ${listaTex(znane)}.\n\n${k.pytBrak(o, n, dz(m))}`,
      [pole("brak", k.etBrak)], { brak: q(x) }, k.fmt(x),
      [
        `Wszystkich składników ma być $${n}$, a ich średnia $${dz(m)}$. Cała suma ma więc być równa $${n} \\cdot ${dz(m)} = ${suma}$.`,
        `Znane liczby dają razem $${znane.join(" + ")} = ${K}$.`,
        `Brakuje $${suma} - ${K} = ${x}$.`,
        `Sprawdzenie: $(${K} + ${x}) : ${n} = ${suma} : ${n} = ${dz(m)}$ – zgadza się.`,
      ],
    );
  });
}

// --- 4. Zmiana średniej, średnia z tabeli, dwie grupy

const KONTEKSTY_ZMIANY = [
  {
    lo: 2, hi: 40,
    zdanie: (n, m) => `Średnia arytmetyczna $${n}$ liczb jest równa $${m}$.`,
    dodaj: (x) => `Do tych liczb dopisano liczbę $${x}$.`, usun: (x) => `Z tych liczb usunięto liczbę $${x}$.`,
    pyt: "Oblicz średnią arytmetyczną otrzymanego zestawu liczb.", et: "Nowa średnia", fmt: (v) => `$${dz(v)}$`,
    dopisz: (M) => `Jaką liczbę trzeba dopisać do tych liczb, aby ich średnia arytmetyczna wzrosła do $${M}$?`, etDopisz: "Dopisana liczba",
    plus: (k) => `Każdą z tych liczb zwiększono o $${k}$.`, razy: (k) => `Każdą z tych liczb pomnożono przez $${k}$.`,
    pytWsz: "Jaka jest teraz średnia arytmetyczna tych liczb?",
  },
  {
    lo: 10, hi: 40,
    zdanie: (n, m) => `Średni wynik $${n}$ uczniów ze sprawdzianu jest równy $${m}$ pkt.`,
    dodaj: (x) => `Do tej grupy dołączył uczeń, który uzyskał $${x}$ pkt.`, usun: (x) => `Z grupy odszedł uczeń, który uzyskał $${x}$ pkt.`,
    pyt: "Oblicz średni wynik grupy po tej zmianie (w punktach).", et: "Nowa średnia (w punktach)", fmt: (v) => `$${dz(v)}$ pkt`,
    dopisz: (M) => `Ile punktów musi uzyskać uczeń dołączający do grupy, aby średni wynik grupy wzrósł do $${M}$ pkt?`, etDopisz: "Liczba punktów",
    plus: (k) => `Nauczyciel dodał każdemu uczniowi za aktywność $${k}$ ${lm(k, PUNKTOW)}.`, razy: null,
    pytWsz: "Jaki jest teraz średni wynik grupy (w punktach)?",
  },
  {
    lo: 12, hi: 30,
    zdanie: (n, m) => `Średni wiek $${n}$ zawodników drużyny jest równy $${m}$ (w latach).`,
    dodaj: (x) => `Do drużyny dołączył zawodnik w wieku $${x}$ ${lm(x, LAT)}.`, usun: (x) => `Drużynę opuścił zawodnik w wieku $${x}$ ${lm(x, LAT)}.`,
    pyt: "Oblicz średni wiek zawodników po tej zmianie (w latach).", et: "Nowa średnia (w latach)", fmt: (v) => `$${dz(v)}$ (w latach)`,
    dopisz: (M) => `W jakim wieku (w latach) musi być zawodnik dołączający do drużyny, aby średni wiek wzrósł do $${M}$?`, etDopisz: "Wiek (w latach)",
    plus: (k) => `Minęło $${k}$ ${lm(k, LAT)}, więc każdy zawodnik jest o tyle starszy.`, razy: null,
    pytWsz: "Jaki jest teraz średni wiek zawodników (w latach)?",
  },
  {
    lo: 2, hi: 12,
    zdanie: (n, m) => `Średnia cena $${n}$ zeszytów w sklepie jest równa $${m}$ zł.`,
    dodaj: null, usun: null, dopisz: null,
    pyt: "", et: "Nowa średnia cena (w zł)", fmt: (v) => `$${dz(v)}$ zł`,
    plus: (k) => `Sklep podniósł cenę każdego zeszytu o $${k}$ zł.`, razy: (k) => `Po zmianie cennika każdy zeszyt kosztuje $${k}$ razy więcej niż dotąd.`,
    pytWsz: "Jaka jest teraz średnia cena zeszytu (w zł)?",
  },
];

const KONTEKSTY_TABELI = [
  { intro: "Tabela pokazuje, ile osób z klasy 8b otrzymało z kartkówki daną ocenę.", h1: "ocena", h2: "ile osób", pool: [2, 3, 4, 5, 6], pyt: "Oblicz średnią ocenę z tej kartkówki.", et: "Średnia ocen", fmt: (v) => `$${dz(v)}$` },
  { intro: "W klasie zapytano uczniów, ile mają rodzeństwa. Tabela pokazuje wyniki.", h1: "rodzeństwo", h2: "ile osób", pool: [0, 1, 2, 3, 4], pyt: "Oblicz średnią liczbę rodzeństwa przypadającą na jednego ucznia tej klasy.", et: "Średnia liczba rodzeństwa", fmt: (v) => `$${dz(v)}$` },
  { intro: "Tabela pokazuje, ile książek przeczytali w wakacje uczniowie klasy 8c.", h1: "książek", h2: "ile osób", pool: [0, 1, 2, 3, 4, 5, 6], pyt: "Oblicz średnią liczbę książek przeczytanych w wakacje przez jednego ucznia.", et: "Średnia liczba książek", fmt: (v) => `$${dz(v)}$` },
  { intro: "Tabela pokazuje, ile bramek padło w meczach szkolnej ligi.", h1: "bramek", h2: "ile meczów", pool: [0, 1, 2, 3, 4, 5], pyt: "Oblicz średnią liczbę bramek w jednym meczu tej ligi.", et: "Średnia liczba bramek", fmt: (v) => `$${dz(v)}$` },
];

function zmianaSredniej(r) {
  return probuj(() => {
    const w = r.int(0, 99);
    if (w < 22) return zmianaDodajUsun(r);
    if (w < 34) return zmianaKierunek(r);
    if (w < 46) return zmianaDopisz(r);
    if (w < 60) return zmianaWszystkich(r);
    if (w < 82) return sredniaZTabeli(r);
    return sredniaDwochGrup(r);
  });
}

function zmianaDodajUsun(r) {
  const dodaj = r.chance(0.55);
  const k = r.pick(KONTEKSTY_ZMIANY.filter((c) => c.dodaj));
  const n = dodaj ? r.pick([3, 4, 7, 9]) : r.pick([3, 5, 6, 9, 11]);
  const m = r.int(k.lo, k.hi), x = r.int(k.lo, k.hi);
  if (x === m) return null;
  const S = n * m;
  const nowa = dodaj ? q(S + x, n + 1) : q(S - x, n - 1);
  if (!ladnaSrednia(nowa)) return null;
  if (!dodaj && S - x < 0) return null;
  const kroki = [
    `Stara suma to średnia razy liczba składników: $${n} \\cdot ${m} = ${S}$.`,
    dodaj
      ? `Po dopisaniu liczby $${x}$ suma to $${S} + ${x} = ${S + x}$, a składników jest $${n} + 1 = ${n + 1}$.`
      : `Po usunięciu liczby $${x}$ suma to $${S} - ${x} = ${S - x}$, a składników jest $${n} - 1 = ${n - 1}$.`,
    `Nowa średnia: $${dodaj ? S + x : S - x} : ${dodaj ? n + 1 : n - 1} = ${dz(nowa)}$.`,
  ];
  return zad(
    `${k.zdanie(n, m)} ${dodaj ? k.dodaj(x) : k.usun(x)} ${k.pyt}`,
    [pole("nowa", k.et)], { nowa }, k.fmt(nowa), kroki,
  );
}

const KIERUNKI = ["Średnia wzrośnie.", "Średnia zmaleje.", "Średnia się nie zmieni."];

function zmianaKierunek(r) {
  const k = r.pick(KONTEKSTY_ZMIANY.filter((c) => c.dodaj));
  const n = r.pick([3, 4, 5, 6, 8, 10]);
  const m = r.int(k.lo + 2, k.hi - 2);
  const los = r.int(0, 9);
  const x = los === 0 ? m : los < 6 ? m + r.int(1, 8) : m - r.int(1, 8);
  if (x < k.lo || x > k.hi + 8) return null;
  const ind = x > m ? 0 : x < m ? 1 : 2;
  const wyjasnienie = x > m
    ? `Dopisana liczba $${x}$ jest większa od średniej $${m}$, więc podnosi średnią.`
    : x < m ? `Dopisana liczba $${x}$ jest mniejsza od średniej $${m}$, więc obniża średnią.` : `Dopisana liczba $${x}$ jest równa średniej $${m}$, więc niczego nie zmienia.`;
  return zad(
    `${k.zdanie(n, m)} ${k.dodaj(x)} Co stanie się ze średnią arytmetyczną?`,
    [polew("kierunek", "Co stanie się ze średnią?", KIERUNKI)], { kierunek: ind }, KIERUNKI[ind],
    [
      `Porównujemy dopisywaną liczbę ze średnią: dopisujemy $${x}$, a średnia wynosi $${m}$.`,
      wyjasnienie,
      `Zasada: dopisanie liczby większej od średniej podnosi średnią, mniejszej – obniża, a równej średniej – niczego nie zmienia.`,
    ],
  );
}

function zmianaDopisz(r) {
  const k = r.pick(KONTEKSTY_ZMIANY.filter((c) => c.dopisz));
  const n = r.pick([3, 4, 5, 6, 9]);
  const m = r.int(k.lo, k.hi - 4), M = m + r.int(1, 3);
  const x = M * (n + 1) - n * m;
  if (x > k.hi + 12) return null;
  return zad(
    `${k.zdanie(n, m)} ${k.dopisz(M)}`,
    [pole("x", k.etDopisz)], { x: q(x) }, `$${x}$`,
    [
      `Po dopisaniu jest $${n} + 1 = ${n + 1}$ liczb, a ich średnia ma być $${M}$. Nowa suma ma więc być równa $${n + 1} \\cdot ${M} = ${(n + 1) * M}$.`,
      `Stara suma to $${n} \\cdot ${m} = ${n * m}$.`,
      `Dopisana liczba to różnica: $${(n + 1) * M} - ${n * m} = ${x}$.`,
    ],
  );
}

function zmianaWszystkich(r) {
  const k = r.pick(KONTEKSTY_ZMIANY);
  const mnoz = k.razy && r.chance(k.dodaj ? 0.4 : 0.55);
  const d = r.pick([1, 1, 2, 5, 10]);
  const m = q(r.int(Math.max(k.lo * d, 1), k.hi * d), d);
  const n = r.pick([4, 5, 6, 8, 10, 12]);
  if (!m.mul(n).calkowita) return null;
  const kk = mnoz ? r.pick([2, 3, 4]) : r.pick([1, 2, 3, 4, 5]);
  const nowa = mnoz ? m.mul(kk) : m.add(kk);
  return zad(
    `${k.zdanie(n, dz(m))} ${mnoz ? k.razy(kk) : k.plus(kk)} ${k.pytWsz}`,
    [pole("nowa", k.et)], { nowa }, k.fmt(nowa),
    [
      mnoz
        ? `Gdy każdą liczbę pomnożymy przez $${kk}$, średnia też zostanie pomnożona przez $${kk}$ (suma rośnie $${kk}$ razy, a liczba składników się nie zmienia).`
        : `Gdy do każdej liczby dodamy $${kk}$, średnia też wzrośnie o $${kk}$ (suma rośnie o $${n} \\cdot ${kk}$, a po podzieleniu przez $${n}$ dostajemy $${kk}$).`,
      mnoz ? `Nowa średnia: $${dz(m)} \\cdot ${kk} = ${dz(nowa)}$.` : `Nowa średnia: $${dz(m)} + ${kk} = ${dz(nowa)}$.`,
    ],
  );
}

function sredniaZTabeli(r) {
  const k = r.pick(KONTEKSTY_TABELI);
  const il = r.int(3, 4);
  const wartosci = r.shuffle(k.pool).slice(0, il).sort((a, b) => a - b);
  const N = r.pick([8, 10, 10, 20, 20, 25]);
  const licz = skladnik(r, il, N);
  const iloczyny = wartosci.map((x, i) => x * licz[i]);
  const S = iloczyny.reduce((a, b) => a + b, 0), m = q(S, N);
  if (!ladnaSrednia(m)) return null;
  if (S === 0) return null;
  const tabela = `\\begin{array}{c|c} \\text{${k.h1}} & \\text{${k.h2}} \\\\ \\hline ${wartosci.map((x, i) => `${x} & ${licz[i]}`).join(" \\\\ ")} \\end{array}`;
  return zad(
    `${k.intro}\n\n$${tabela}$\n\n${k.pyt}`,
    [pole("srednia", k.et)], { srednia: m }, k.fmt(m),
    [
      `Każdą wartość mnożymy przez to, ile razy występuje: ${wypisz(wartosci.map((x, i) => `$${x} \\cdot ${licz[i]} = ${iloczyny[i]}$`))}.`,
      `Suma wszystkich wartości: $${iloczyny.join(" + ")} = ${S}$.`,
      `Wszystkich danych jest $${licz.join(" + ")} = ${N}$ (to suma drugiej kolumny, a nie liczba wierszy).`,
      `Średnia: $${S} : ${N} = ${dz(m)}$.`,
    ],
  );
}

function sredniaDwochGrup(r) {
  const nA = r.pick([4, 5, 6, 8, 10, 12, 15, 16, 20, 24, 25]), nB = r.pick([4, 5, 6, 8, 10, 12, 15, 16, 20, 24, 25]);
  const mA = r.int(10, 40), mB = r.int(10, 40);
  if (nA === nB || mA === mB) return null;
  const S = nA * mA + nB * mB, N = nA + nB, m = q(S, N);
  if (!ladnaSrednia(m)) return null;
  const k = r.pick([
    { zdanie: `W klasie jest $${nA}$ ${lm(nA, ["uczennica", "uczennice", "uczennic"])} i $${nB}$ ${lm(nB, UCZNIOW)}. Średni wynik uczennic ze sprawdzianu wyniósł $${mA}$ pkt, a uczniów – $${mB}$ pkt. Oblicz średni wynik całej klasy (w punktach).`, a: "uczennic", b: "uczniów", fmt: `$${dz(m)}$ pkt`, et: "Średni wynik (w punktach)" },
    { zdanie: `Na wycieczkę pojechały dwie grupy turystów: pierwsza liczy $${nA}$ ${lm(nA, OSOBA_FORMY)}, a druga $${nB}$ ${lm(nB, OSOBA_FORMY)}. Średni wiek osób w pierwszej grupie to $${mA}$ ${lm(mA, LAT)}, a w drugiej – $${mB}$ ${lm(mB, LAT)}. Oblicz średni wiek wszystkich turystów (w latach).`, a: "pierwszej grupy", b: "drugiej grupy", fmt: `$${dz(m)}$ (w latach)`, et: "Średni wiek (w latach)" },
  ]);
  return zad(
    k.zdanie,
    [pole("srednia", k.et)], { srednia: m }, k.fmt,
    [
      `Nie wolno liczyć średniej ze średnich, bo grupy są różnej wielkości. Liczymy sumy (liczba osób razy średnia): dla ${k.a} $${nA} \\cdot ${mA} = ${nA * mA}$, dla ${k.b} $${nB} \\cdot ${mB} = ${nB * mB}$.`,
      `Suma wszystkich: $${nA * mA} + ${nB * mB} = ${S}$. Wszystkich osób jest $${nA} + ${nB} = ${N}$.`,
      `Średnia: $${S} : ${N} = ${dz(m)}$.`,
    ],
  );
}

// --- 4b. Mediana i dominanta: z listy liczb, z tabeli liczności, po dopisaniu liczby, średnia a mediana

const mediana = (sorted) => { const n = sorted.length; return n % 2 ? q(sorted[(n - 1) / 2]) : q(sorted[n / 2 - 1] + sorted[n / 2], 2); };
const porzadkuj = (arr) => [...arr].sort((a, b) => a - b);
const licznosci = (arr) => { const m = new Map(); arr.forEach((x) => m.set(x, (m.get(x) ?? 0) + 1)); return m; };
const DANE_LISTY = [
  { zdanie: (n) => `Oceny z kartkówek z matematyki (${n} ocen):`, lo: 1, hi: 6 },
  { zdanie: (n) => `Czas dojścia do szkoły (w minutach) zapisany przez ${n} uczniów:`, lo: 3, hi: 25 },
  { zdanie: (n) => `Liczba bramek strzelonych przez drużynę w ${n} meczach:`, lo: 0, hi: 6 },
  { zdanie: (n) => `Wyniki ${n} zawodników w skoku w dal (w decymetrach):`, lo: 9, hi: 20 },
  { zdanie: (n) => `Liczba pasażerów w autobusie na ${n} kolejnych przystankach:`, lo: 5, hi: 40 },
];

/** Losuje n liczb z przedziału tak, żeby najczęstsza wartość występowała c razy, a reszta mniej razy (unikalna dominanta albo dwie równe). */
function listaZDominanta(r, n, lo, hi, dwie) {
  return probuj(() => {
    const dane = Array.from({ length: n }, () => r.int(lo, hi));
    const m = licznosci(dane), max = Math.max(...m.values());
    const top = [...m].filter(([, c]) => c === max).map(([v]) => v);
    if (max < 2 || top.length !== (dwie ? 2 : 1)) return null;
    return dane;
  });
}

function dominantaIMedianaZListy(r) {
  const k = r.pick(DANE_LISTY), w = r.int(0, 99);
  const lista = (a) => a.map((x) => `$${x}$`).join(", ");
  if (w < 35) {
    const dwie = r.chance(0.3), n = dwie ? r.int(8, 10) : r.int(7, 10);
    const dane = listaZDominanta(r, n, k.lo, Math.min(k.hi, k.lo + 7), dwie);
    const m = licznosci(dane), max = Math.max(...m.values());
    const top = [...m].filter(([, c]) => c === max).map(([v]) => v).sort((a, b) => a - b);
    const licz = porzadkuj([...m.keys()]).filter((v) => m.get(v) >= 2).map((v) => `$${v}$ – ${m.get(v)} ${lm(m.get(v), ["raz", "razy", "razy"])}`);
    return zad(
      `${k.zdanie(n)} ${lista(dane)}. ${dwie ? "W tych danych są dwie dominanty. Podaj je." : "Podaj dominantę tych danych."}`,
      dwie ? [{ id: "dom", typ: "zbior", ile: 2, etykieta: "Dominanty (dwie liczby)" }] : [pole("dom", "Dominanta")],
      { dom: dwie ? top.map((x) => q(x)) : q(top[0]) },
      dwie ? `$${top[0]}$ i $${top[1]}$` : `$${top[0]}$`,
      [
        "Dominanta to wartość, która występuje najczęściej, więc liczymy powtórzenia.",
        `Wartości, które powtarzają się: ${licz.join(", ")}. Pozostałe występują po razie.`,
        dwie ? `Najwięcej, czyli $${max}$ ${lm(max, ["raz", "razy", "razy"])}, występują dwie wartości: $${top[0]}$ i $${top[1]}$ – obie są dominantami.` : `Najczęściej, bo aż $${max}$ ${lm(max, ["raz", "razy", "razy"])}, występuje $${top[0]}$. Dominanta to wartość ($${top[0]}$), a nie liczba powtórzeń.`,
      ],
    );
  }
  const parzysta = w >= 70, n = parzysta ? r.pick([4, 6, 8]) : r.pick([5, 7, 9]);
  const dane = Array.from({ length: n }, () => r.int(k.lo, k.hi));
  const s = porzadkuj(dane), med = mediana(s);
  const kroki = [
    `Najpierw porządkujemy dane od najmniejszej do największej: ${lista(s)}.`,
    parzysta
      ? `Danych jest $${n}$, czyli parzyście wiele, więc mediana to średnia dwóch środkowych liczb, z miejsc $${n / 2}$ i $${n / 2 + 1}$: $${s[n / 2 - 1]}$ i $${s[n / 2]}$.`
      : `Danych jest $${n}$, czyli nieparzyście wiele, więc mediana to liczba z miejsca $${(n + 1) / 2}$, dokładnie pośrodku: $${s[(n - 1) / 2]}$.`,
  ];
  if (parzysta) kroki.push(`Mediana: $(${s[n / 2 - 1]} + ${s[n / 2]}) : 2 = ${dz(med)}$.`);
  return zad(
    `${k.zdanie(n)} ${lista(dane)}. Oblicz medianę tych danych.`,
    [pole("med", "Mediana")], { med }, `$${dz(med)}$`, kroki,
  );
}

const TABELE_LICZNOSCI = [
  { h1: "ocena", h2: "liczba uczniów", wartosci: [2, 3, 4, 5, 6], intro: "W tabeli podano, ile uczniów klasy 8b dostało daną ocenę z klasówki.", jednostka: "uczniów" },
  { h1: "rodzeństwo", h2: "liczba uczniów", wartosci: [0, 1, 2, 3, 4], intro: "W tabeli podano, ilu uczniów ma daną liczbę rodzeństwa.", jednostka: "uczniów" },
  { h1: "rozmiar buta", h2: "liczba osób", wartosci: [36, 37, 38, 39, 40, 41], intro: "W tabeli podano rozmiary butów uczniów jednej klasy.", jednostka: "osób" },
  { h1: "liczba bramek", h2: "liczba meczów", wartosci: [0, 1, 2, 3, 4, 5], intro: "W tabeli podano, w ilu meczach drużyna strzeliła daną liczbę bramek.", jednostka: "meczów" },
];

function tabelaMedianaDominanta(r) {
  return probuj(() => {
    const k = r.pick(TABELE_LICZNOSCI), il = r.int(4, Math.min(5, k.wartosci.length));
    const start = r.int(0, k.wartosci.length - il), wart = k.wartosci.slice(start, start + il);
    const N = r.int(13, 28), licz = skladnik(r, il, N);
    const max = Math.max(...licz);
    const tabela = `\\begin{array}{c|c} \\text{${k.h1}} & \\text{${k.h2}} \\\\ \\hline ${wart.map((x, i) => `${x} & ${licz[i]}`).join(" \\\\ ")} \\end{array}`;
    if (r.chance(0.4)) {
      if (licz.filter((c) => c === max).length !== 1) return null;
      const i = licz.indexOf(max);
      return zad(
        `${k.intro}\n\n$${tabela}$\n\nPodaj dominantę tych danych.`,
        [pole("dom", "Dominanta")], { dom: q(wart[i]) }, `$${wart[i]}$`,
        [
          "Dominanta to wartość występująca najczęściej, więc szukamy największej liczby w drugiej kolumnie.",
          `Największa liczność to $${max}$ – dotyczy wartości $${wart[i]}$.`,
          `Dominanta to wartość ($${wart[i]}$), a nie jej liczność ($${max}$).`,
        ],
      );
    }
    let skum = 0;
    const zakresy = wart.map((x, i) => { const od = skum + 1; skum += licz[i]; return { x, od, do: skum }; });
    const poz = N % 2 ? [(N + 1) / 2] : [N / 2, N / 2 + 1];
    const znajdz = (p) => zakresy.find((z) => p >= z.od && p <= z.do).x;
    const vals = poz.map(znajdz), med = mediana(vals);
    const opis = zakresy.map((z) => `$${z.x}$ – ${z.od === z.do ? `miejsce $${z.od}$` : `miejsca $${z.od}$–$${z.do}$`}`).join(", ");
    return zad(
      `${k.intro}\n\n$${tabela}$\n\nOblicz medianę tych danych.`,
      [pole("med", "Mediana")], { med }, `$${dz(med)}$`,
      [
        `Wszystkich danych jest $${licz.join(" + ")} = ${N}$ (to suma drugiej kolumny, a nie liczba wierszy).`,
        `Ustawiamy dane po kolei: ${opis}.`,
        N % 2
          ? `Danych jest nieparzyście wiele, więc mediana stoi na miejscu $${poz[0]}$. Tam jest $${vals[0]}$.`
          : `Danych jest parzyście wiele, więc mediana to średnia z miejsc $${poz[0]}$ i $${poz[1]}$. Tam stoją $${vals[0]}$ i $${vals[1]}$.`,
        N % 2 ? `Mediana to $${dz(med)}$.` : `Mediana: $(${vals[0]} + ${vals[1]}) : 2 = ${dz(med)}$.`,
      ],
    );
  });
}

function medianaPoDopisaniu(r) {
  const n = r.pick([5, 7, 4, 6]), lista = (a) => a.map((x) => `$${x}$`).join(", ");
  const k = r.pick([{ lo: 1, hi: 6, rz: "ocen" }, { lo: 8, hi: 25, rz: "czasów dojazdu (w minutach)" }]);
  const dane = Array.from({ length: n }, () => r.int(k.lo, k.hi)), x = r.int(k.lo, k.hi);
  const nowe = porzadkuj([...dane, x]), N = n + 1, med = mediana(nowe);
  const poz = N % 2 ? [(N + 1) / 2] : [N / 2, N / 2 + 1];
  return zad(
    `Zapisano ${n} ${k.rz}: ${lista(dane)}. Dopisano jeszcze jedną wartość: $${x}$. Oblicz medianę wszystkich ${N} wartości.`,
    [pole("med", "Mediana")], { med }, `$${dz(med)}$`,
    [
      `Po dopisaniu mamy $${N}$ wartości. Porządkujemy je: ${lista(nowe)}.`,
      N % 2 ? `Wartości jest nieparzyście wiele, więc mediana stoi na miejscu $${poz[0]}$: $${nowe[poz[0] - 1]}$.` : `Wartości jest parzyście wiele, więc mediana to średnia z miejsc $${poz[0]}$ i $${poz[1]}$: $${nowe[poz[0] - 1]}$ i $${nowe[poz[1] - 1]}$.`,
      N % 2 ? `Mediana to $${dz(med)}$.` : `Mediana: $(${nowe[poz[0] - 1]} + ${nowe[poz[1] - 1]}) : 2 = ${dz(med)}$.`,
    ],
  );
}

/** Jedna bardzo duża wartość: średnia mocno rośnie, mediana prawie nie. */
function sredniaIMedianaOdstajaca(r) {
  return probuj(() => {
    const n = r.pick([5, 7]);
    const baza = r.int(6, 18), reszta = Array.from({ length: n - 1 }, () => baza + r.int(0, 6));
    const duza = r.int(5, 9) * 10 + r.int(0, 9);
    const dane = r.shuffle([...reszta, duza]), S = dane.reduce((a, b) => a + b, 0), sr = q(S, n);
    if (!ladnaSrednia(sr)) return null;
    const s = porzadkuj(dane), med = mediana(s), mniejszych = dane.filter((x) => x < Number(sr)).length;
    const lista = dane.map((x) => `$${x}$`).join(", ");
    if (r.chance(0.5)) {
      const m = (() => { const op = r.shuffle(["mediana", "średnia arytmetyczna"]); return { opcje: op, ind: op.indexOf("mediana") }; })();
      return zad(
        `Kieszonkowe ${n === 5 ? "pięciu" : "siedmiu"} uczniów (w złotych): ${lista}. Jedna wartość jest dużo większa od pozostałych. Która z wielkości lepiej opisuje typowe kieszonkowe w tej grupie?`,
        [polew("wielkosc", "Lepiej opisuje", m.opcje)], { wielkosc: m.ind }, "mediana",
        [
          `Średnia: $${S} : ${n} = ${dz(sr)}$ zł. Mediana (po uporządkowaniu, miejsce $${(n + 1) / 2}$): $${med.n}$ zł.`,
          `Średnia jest większa niż kieszonkowe aż $${mniejszych}$ z $${n}$ osób – podciąga ją bardzo duża wartość $${duza}$.`,
          "Mediana prawie nie reaguje na jedną ogromną wartość, więc lepiej pokazuje typowe kieszonkowe.",
        ],
      );
    }
    return zad(
      `Kieszonkowe ${n === 5 ? "pięciu" : "siedmiu"} uczniów (w złotych): ${lista}. Oblicz średnią i medianę kieszonkowego.`,
      [pole("sr", "Średnia (w zł)"), pole("med", "Mediana (w zł)")], { sr, med }, `średnia $${dz(sr)}$ zł, mediana $${dz(med)}$ zł`,
      [
        `Średnia: suma ${dane.map((x) => `$${x}$`).join(" + ")} to $${S}$, a $${S} : ${n} = ${dz(sr)}$.`,
        `Mediana: po uporządkowaniu (${s.map((x) => `$${x}$`).join(", ")}) środkowa liczba, z miejsca $${(n + 1) / 2}$, to $${med.n}$.`,
        `Średnia jest większa niż kieszonkowe $${mniejszych}$ z $${n}$ osób – podciąga ją duża wartość $${duza}$. Typowy wynik lepiej opisuje mediana.`,
      ],
    );
  });
}

function medianaZTabeliISrednia(r) {
  const w = r.int(0, 99);
  if (w < 40) return tabelaMedianaDominanta(r);
  if (w < 60) return medianaPoDopisaniu(r);
  return sredniaIMedianaOdstajaca(r);
}

// =====================================================================================================================
// TEMAT 3. Zliczanie możliwości
// =====================================================================================================================

// --- 5. Liczby i kody z cyfr

const SPOSOBY = ["sposób", "sposoby", "sposobów"];

/** Wszystkie ciągi cyfr z zadanej puli (powt – czy cyfry mogą się powtarzać). */
function ciagiCyfr(cyfry, dl, powt) {
  let ciagi = [[]];
  for (let p = 0; p < dl; p++) ciagi = ciagi.flatMap((s) => cyfry.filter((d) => powt || !s.includes(d)).map((d) => [...s, d]));
  return ciagi;
}

function liczbyZCyfr(r) {
  return probuj(() => {
    const dl = r.chance(0.5) ? 2 : 3;
    const powt = r.chance(0.5);
    const zZerem = r.chance(0.5);
    const m = dl === 2 ? r.int(3, 5) : r.int(3, 4);
    const niezerowe = r.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, zZerem ? m - 1 : m);
    const cyfry = (zZerem ? [0, ...niezerowe] : niezerowe).sort((a, b) => a - b);
    const parzysta = dl === 3 && powt && r.chance(0.35);
    const parz = cyfry.filter((c) => c % 2 === 0);
    if (parzysta && parz.length === 0) return null;
    const k1 = niezerowe.length;
    const miejsca = dl === 2 ? ["pierwsza cyfra (dziesiątek)", "druga cyfra (jedności)"] : ["pierwsza cyfra (setek)", "druga cyfra (dziesiątek)", "trzecia cyfra (jedności)"];
    const kroki = [];
    let czynniki;
    if (parzysta) {
      czynniki = [parz.length, k1, m];
      kroki.push(`Liczba ma być parzysta, więc zaczynamy od ostatniej cyfry: może to być jedna z parzystych cyfr ${listaTex(parz)}, czyli $${parz.length}$ ${lm(parz.length, MOZLIWOSCI)}.`);
      kroki.push(`Pierwsza cyfra ${zZerem ? "nie może być zerem, więc ma" : "może być dowolną z danych cyfr, więc ma"} $${k1}$ ${lm(k1, MOZLIWOSCI)}.`);
      kroki.push(`Środkowa cyfra może być dowolna (cyfry mogą się powtarzać): $${m}$ ${lm(m, MOZLIWOSCI)}.`);
    } else {
      czynniki = powt ? [k1, ...Array(dl - 1).fill(m)] : [k1, ...Array.from({ length: dl - 1 }, (_, i) => m - 1 - i)];
      czynniki.forEach((c, i) => {
        const opis = i === 0
          ? (zZerem ? "nie może być zerem, więc ma" : "może być dowolna z danych cyfr, więc ma")
          : (powt ? "może być dowolna z danych cyfr (cyfry mogą się powtarzać), więc ma" : `nie może być taka sama jak wcześniejsze (${i === 1 ? "jedną cyfrę" : "dwie cyfry"} już użyto), więc ma`);
        kroki.push(`${cap(miejsca[i])} ${opis} $${c}$ ${lm(c, MOZLIWOSCI)}.`);
      });
    }
    const iloczyn = czynniki.reduce((a, b) => a * b, 1);
    const ciagi = ciagiCyfr(cyfry, dl, powt).filter((s) => s[0] !== 0 && (!parzysta || s[dl - 1] % 2 === 0));
    if (ciagi.length !== iloczyn) throw new Error(`liczbyZCyfr: ${ciagi.length} zamiast ${iloczyn}`);
    kroki.push(`Mnożymy liczby możliwości: $${czynniki.join(" \\cdot ")} = ${iloczyn}$.`);
    if (iloczyn <= 12) kroki.push(`Dla sprawdzenia wypisujemy wszystkie takie liczby po kolei: ${listaTex(ciagi.map((s) => s.join("")).sort((a, b) => a - b))}.`);
    return zad(
      `Z cyfr ${listaTex(cyfry)} tworzymy ${parzysta ? "parzyste " : ""}liczby ${dl === 2 ? "dwucyfrowe" : "trzycyfrowe"}. ${powt ? "Cyfry w liczbie mogą się powtarzać." : "Cyfry w liczbie muszą być różne."} Ile takich liczb można utworzyć?`,
      [pole("ile", "Liczba liczb")], { ile: q(iloczyn) }, `$${iloczyn}$`, kroki,
    );
  });
}

const OPISY_CYFRY = [
  // dwucyfrowe: czynniki to [opis wyboru, liczba możliwości]
  { dl: 2, opis: "parzystych", pred: (n) => n % 2 === 0, cz: [["cyfra dziesiątek (od $1$ do $9$)", 9], ["cyfra jedności (parzysta: $0$, $2$, $4$, $6$, $8$)", 5]] },
  { dl: 2, opis: "podzielnych przez $5$", pred: (n) => n % 5 === 0, cz: [["cyfra dziesiątek (od $1$ do $9$)", 9], ["cyfra jedności ($0$ albo $5$)", 2]] },
  { dl: 2, opis: "o dwóch różnych cyfrach", pred: (n) => Math.floor(n / 10) !== n % 10, cz: [["cyfra dziesiątek (od $1$ do $9$)", 9], ["cyfra jedności (dowolna oprócz użytej)", 9]] },
  { dl: 2, opis: "o dwóch takich samych cyfrach", pred: (n) => Math.floor(n / 10) === n % 10, cz: [["cyfra dziesiątek (od $1$ do $9$)", 9], ["cyfra jedności (taka sama jak dziesiątek)", 1]] },
  { dl: 2, opis: "w których obie cyfry są nieparzyste", pred: (n) => n % 2 === 1 && Math.floor(n / 10) % 2 === 1, cz: [["cyfra dziesiątek (nieparzysta: $1$, $3$, $5$, $7$, $9$)", 5], ["cyfra jedności (nieparzysta: $1$, $3$, $5$, $7$, $9$)", 5]] },
  { dl: 2, opis: "w których obie cyfry są parzyste", pred: (n) => n % 2 === 0 && Math.floor(n / 10) % 2 === 0, cz: [["cyfra dziesiątek (parzysta, ale nie zero: $2$, $4$, $6$, $8$)", 4], ["cyfra jedności (parzysta: $0$, $2$, $4$, $6$, $8$)", 5]] },
  { dl: 2, opis: "o cyfrze dziesiątek większej od $6$", pred: (n) => Math.floor(n / 10) > 6, cz: [["cyfra dziesiątek ($7$, $8$ albo $9$)", 3], ["cyfra jedności (dowolna)", 10]] },
  { dl: 2, opis: "o cyfrze jedności mniejszej od $3$", pred: (n) => n % 10 < 3, cz: [["cyfra dziesiątek (od $1$ do $9$)", 9], ["cyfra jedności ($0$, $1$ albo $2$)", 3]] },
  { dl: 3, opis: "parzystych", pred: (n) => n % 2 === 0, cz: [["cyfra setek (od $1$ do $9$)", 9], ["cyfra dziesiątek (dowolna)", 10], ["cyfra jedności (parzysta: $0$, $2$, $4$, $6$, $8$)", 5]] },
  { dl: 3, opis: "podzielnych przez $5$", pred: (n) => n % 5 === 0, cz: [["cyfra setek (od $1$ do $9$)", 9], ["cyfra dziesiątek (dowolna)", 10], ["cyfra jedności ($0$ albo $5$)", 2]] },
  { dl: 3, opis: "o trzech różnych cyfrach", pred: (n) => new Set(String(n)).size === 3, cz: [["cyfra setek (od $1$ do $9$)", 9], ["cyfra dziesiątek (dowolna oprócz użytej)", 9], ["cyfra jedności (dowolna oprócz dwóch użytych)", 8]] },
  { dl: 3, opis: "w których każda cyfra jest nieparzysta", pred: (n) => String(n).split("").every((c) => c % 2 === 1), cz: [["cyfra setek (nieparzysta)", 5], ["cyfra dziesiątek (nieparzysta)", 5], ["cyfra jedności (nieparzysta)", 5]] },
  { dl: 3, opis: "kończących się zerem", pred: (n) => n % 10 === 0, cz: [["cyfra setek (od $1$ do $9$)", 9], ["cyfra dziesiątek (dowolna)", 10], ["cyfra jedności (tylko $0$)", 1]] },
  { dl: 3, opis: "o cyfrze setek równej $5$", pred: (n) => Math.floor(n / 100) === 5, cz: [["cyfra setek (tylko $5$)", 1], ["cyfra dziesiątek (dowolna)", 10], ["cyfra jedności (dowolna)", 10]] },
];

/** Własności z parametrem (losowa cyfra), dla liczb dwu- i trzycyfrowych. */
const OPISY_CYFRY_PARAM = [
  (r) => {
    const dl = r.pick([2, 3]), k = r.int(2, 7), c = 9 - k;
    const pozycje = dl === 2 ? ["dziesiątek", "jedności"] : ["setek", "dziesiątek", "jedności"];
    return {
      dl, opis: `w których każda cyfra jest większa od $${k}$`,
      pred: (n) => String(n).split("").every((x) => x > k),
      cz: pozycje.map((p) => [`cyfra ${p} (od $${k + 1}$ do $9$)`, c]),
    };
  },
  (r) => {
    const dl = r.pick([2, 3]), d = r.int(1, 9);
    const poczatek = dl === 2 ? [["cyfra dziesiątek (od $1$ do $9$)", 9]] : [["cyfra setek (od $1$ do $9$)", 9], ["cyfra dziesiątek (dowolna)", 10]];
    return {
      dl, opis: `o cyfrze jedności równej $${d}$`,
      pred: (n) => n % 10 === d,
      cz: [...poczatek, [`cyfra jedności (tylko $${d}$)`, 1]],
    };
  },
  (r) => {
    const d = r.int(1, 9);
    return {
      dl: 3, opis: `o cyfrze setek równej $${d}$`,
      pred: (n) => Math.floor(n / 100) === d,
      cz: [[`cyfra setek (tylko $${d}$)`, 1], ["cyfra dziesiątek (dowolna)", 10], ["cyfra jedności (dowolna)", 10]],
    };
  },
  (r) => {
    const d = r.int(1, 9);
    return {
      dl: 2, opis: `o cyfrze dziesiątek równej $${d}$`,
      pred: (n) => Math.floor(n / 10) === d,
      cz: [[`cyfra dziesiątek (tylko $${d}$)`, 1], ["cyfra jedności (dowolna)", 10]],
    };
  },
];

function liczbyZWlasnoscia(r) {
  const o = r.chance(0.4) ? r.pick(OPISY_CYFRY_PARAM)(r) : r.pick(OPISY_CYFRY);
  const dolna = o.dl === 2 ? 10 : 100, gorna = o.dl === 2 ? 99 : 999;
  let licz = 0;
  for (let n = dolna; n <= gorna; n++) if (o.pred(n)) licz++;
  const iloczyn = o.cz.reduce((a, [, c]) => a * c, 1);
  if (licz !== iloczyn) throw new Error(`liczbyZWlasnoscia: ${licz} zamiast ${iloczyn}`);
  return zad(
    `Ile jest liczb ${o.dl === 2 ? "dwucyfrowych" : "trzycyfrowych"}${o.opis.startsWith("w których") ? "," : ""} ${o.opis}?`,
    [pole("ile", "Liczba liczb")], { ile: q(iloczyn) }, `$${iloczyn}$`,
    [
      `Liczba ${o.dl === 2 ? "dwucyfrowa" : "trzycyfrowa"} nie może zaczynać się od zera. Wybieramy cyfry po kolei i liczymy, ile jest możliwości dla każdej:`,
      ...o.cz.map(([opis, c]) => `${cap(opis)} – $${c}$ ${lm(c, MOZLIWOSCI)}.`),
      `Mnożymy: $${o.cz.map(([, c]) => c).join(" \\cdot ")} = ${iloczyn}$.`,
    ],
  );
}

function kodyZCyfr(r) {
  const w = r.int(0, 4);
  const ALF = ["A", "B", "C", "D", "E"];
  if (w === 0) {
    const k = r.pick([3, 4]), wynik = 10 ** k;
    return zad(
      `Zamek szyfrowy ma $${k}$ pokrętła, a na każdym z nich ustawia się jedną cyfrę od $0$ do $9$. Ile jest różnych kodów tego zamka?`,
      [pole("ile", "Liczba kodów")], { ile: q(wynik) }, `$${dz(wynik)}$`,
      [`Każde pokrętło ma $10$ ustawień (cyfry od $0$ do $9$) i cyfry mogą się powtarzać.`, `Mnożymy: $${Array(k).fill(10).join(" \\cdot ")} = ${dz(wynik)}$.`],
    );
  }
  if (w === 1) {
    const k = r.pick([3, 4]), cz = Array.from({ length: k }, (_, i) => 10 - i), wynik = cz.reduce((a, b) => a * b, 1);
    return zad(
      `Kod składa się z $${k}$ różnych cyfr (od $0$ do $9$), a ich kolejność ma znaczenie. Ile jest takich kodów?`,
      [pole("ile", "Liczba kodów")], { ile: q(wynik) }, `$${dz(wynik)}$`,
      [`Pierwszą cyfrę wybieramy na $10$ sposobów, a każdą następną na jeden sposób mniej, bo cyfry mają być różne: ${cz.map((c) => `$${c}$`).join(", ")}.`, `Mnożymy: $${cz.join(" \\cdot ")} = ${dz(wynik)}$.`],
    );
  }
  if (w === 2) {
    const a = r.int(2, 5), lit = ALF.slice(0, a), wynik = a * 100;
    return zad(
      `Kod składa się z jednej litery wybranej spośród ${wypisz(lit)} i dwóch cyfr od $0$ do $9$ (cyfry mogą się powtarzać). Litera jest zawsze na pierwszym miejscu. Ile jest różnych kodów?`,
      [pole("ile", "Liczba kodów")], { ile: q(wynik) }, `$${wynik}$`,
      [`Literę wybieramy na $${a}$ ${lm(a, SPOSOBY)}, a każdą z dwóch cyfr na $10$ sposobów.`, `Mnożymy: $${a} \\cdot 10 \\cdot 10 = ${wynik}$.`],
    );
  }
  if (w === 3) {
    const b = r.int(2, 5), lit = ALF.slice(0, b), wynik = b * b * 10;
    return zad(
      `Kod składa się z dwóch liter wybranych spośród ${wypisz(lit)} (litery mogą się powtarzać) i jednej cyfry od $0$ do $9$. Litery są zawsze przed cyfrą. Ile jest różnych kodów?`,
      [pole("ile", "Liczba kodów")], { ile: q(wynik) }, `$${wynik}$`,
      [`Każdą z dwóch liter wybieramy na $${b}$ ${lm(b, SPOSOBY)}, a cyfrę na $10$ sposobów.`, `Mnożymy: $${b} \\cdot ${b} \\cdot 10 = ${wynik}$.`],
    );
  }
  const b = r.int(3, 5), lit = ALF.slice(0, b), wynik = b * (b - 1) * 10;
  return zad(
    `Kod składa się z dwóch różnych liter wybranych spośród ${wypisz(lit)} i jednej cyfry od $0$ do $9$. Litery są zawsze przed cyfrą, a ich kolejność ma znaczenie. Ile jest różnych kodów?`,
    [pole("ile", "Liczba kodów")], { ile: q(wynik) }, `$${wynik}$`,
    [`Pierwszą literę wybieramy na $${b}$ ${lm(b, SPOSOBY)}, drugą na $${b - 1}$ ${lm(b - 1, SPOSOBY)} (ma być inna), a cyfrę na $10$ sposobów.`, `Mnożymy: $${b} \\cdot ${b - 1} \\cdot 10 = ${wynik}$.`],
  );
}

function liczbyICyfry(r) {
  const w = r.int(0, 99);
  if (w < 50) return liczbyZCyfr(r);
  if (w < 78) return liczbyZWlasnoscia(r);
  return kodyZCyfr(r);
}

// --- 6. Zestawy, pary i ustawianie w kolejności

const SPODNIE = ["para spodni", "pary spodni", "par spodni"];
const BUTOW = ["para butów", "pary butów", "par butów"];
const KOSZULKI = ["koszulka", "koszulki", "koszulek"];

const ZESTAWY = [
  {
    zdanie: ([a, b, c]) => `Mamy do dyspozycji $${a}$ ${lm(a, KOSZULKI)}, $${b}$ ${lm(b, SPODNIE)} i $${c}$ ${lm(c, BUTOW)}.`,
    pyt: "Ile różnych strojów złożonych z koszulki, spodni i butów można skompletować?", wybor: ["koszulki", "spodni", "butów"], rzecz: "strojów", ile: 3,
  },
  {
    zdanie: ([a, b]) => `Mamy do dyspozycji $${a}$ ${lm(a, KOSZULKI)} i $${b}$ ${lm(b, SPODNIE)}.`,
    pyt: "Ile różnych zestawów złożonych z koszulki i spodni można ubrać?", wybor: ["koszulki", "spodni"], rzecz: "zestawów", ile: 2,
  },
  {
    zdanie: ([a, b, c]) => `W stołówce można wybrać zupę ($${a}$ ${lm(a, ["rodzaj", "rodzaje", "rodzajów"])}), drugie danie ($${b}$ ${lm(b, ["rodzaj", "rodzaje", "rodzajów"])}) i napój ($${c}$ ${lm(c, ["rodzaj", "rodzaje", "rodzajów"])}).`,
    pyt: "Ile różnych obiadów złożonych z zupy, drugiego dania i napoju można zamówić?", wybor: ["zupy", "drugiego dania", "napoju"], rzecz: "obiadów", ile: 3,
  },
  {
    zdanie: ([a, b]) => `W kawiarni zamawiamy jedno ciasto z $${a}$ ${lm(a, ["rodzaju", "rodzajów", "rodzajów"])} i jedną herbatę z $${b}$ ${lm(b, ["rodzaju", "rodzajów", "rodzajów"])}.`,
    pyt: "Ile jest różnych zestawów złożonych z jednego ciasta i jednej herbaty?", wybor: ["ciasta", "herbaty"], rzecz: "zestawów", ile: 2,
  },
  {
    zdanie: ([a, b, c]) => `Kanapkę przygotowuje się z jednego z $${a}$ ${lm(a, ["rodzaju", "rodzajów", "rodzajów"])} pieczywa, jednej z $${b}$ ${lm(b, ["wędliny", "wędlin", "wędlin"])} i jednego z $${c}$ ${lm(c, ["warzywa", "warzyw", "warzyw"])}.`,
    pyt: "Ile różnych kanapek można w ten sposób przygotować?", wybor: ["pieczywa", "wędliny", "warzywa"], rzecz: "kanapek", ile: 3,
  },
  {
    zdanie: ([a, b]) => `Liczba dróg z miasta A do miasta B wynosi $${a}$, a liczba dróg z miasta B do miasta C wynosi $${b}$.`,
    pyt: "Na ile sposobów można dojechać z A do C przez B?", wybor: ["drogi z A do B", "drogi z B do C"], rzecz: "tras", ile: 2,
  },
  {
    zdanie: ([a, b, c]) => `Liczba dróg z miasta A do B wynosi $${a}$, z B do C wynosi $${b}$, a z C do D wynosi $${c}$.`,
    pyt: "Na ile sposobów można dojechać z A do D, przejeżdżając przez B i C?", wybor: ["drogi z A do B", "drogi z B do C", "drogi z C do D"], rzecz: "tras", ile: 3,
  },
  {
    zdanie: ([a, b]) => `W lodziarni można wybrać smak lodów ($${a}$ ${lm(a, ["smak", "smaki", "smaków"])}) i polewę ($${b}$ ${lm(b, ["polewa", "polewy", "polew"])}).`,
    pyt: "Ile jest różnych deserów złożonych z jednego smaku lodów i jednej polewy?", wybor: ["smaku", "polewy"], rzecz: "deserów", ile: 2,
  },
];

function zestawy(r) {
  return probuj(() => {
    const k = r.pick(ZESTAWY);
    const liczby = Array.from({ length: k.ile }, () => r.int(2, 6));
    const iloczyn = liczby.reduce((a, b) => a * b, 1);
    if (iloczyn > 150) return null;
    return zad(
      `${k.zdanie(liczby)} ${k.pyt}`,
      [pole("ile", `Liczba ${k.rzecz}`)], { ile: q(iloczyn) }, `$${iloczyn}$`,
      [
        `Wybieramy po kolei i za każdym razem liczymy, ile jest możliwości: ${wypisz(k.wybor.map((w, i) => `wybór ${w} – $${liczby[i]}$`))}.`,
        `Do każdego wyboru z pierwszej grupy pasuje każdy wybór z następnej, więc liczby możliwości mnożymy: $${liczby.join(" \\cdot ")} = ${iloczyn}$.`,
      ],
    );
  });
}

function pary(r) {
  const w = r.int(0, 99);
  if (w < 24) {
    const n = r.int(4, 15), X = n * (n - 1), Y = X / 2;
    const ctx = r.pick([
      `Grupa $${n}$ osób spotkała się na przyjęciu. Każda osoba przywitała się uściskiem dłoni z każdą inną (każdy uścisk liczymy raz). Ile było uścisków dłoni?`,
      `W turnieju szachowym uczestniczy $${n}$ zawodników i każdy gra z każdym dokładnie jedną partię. Ile partii rozegrano w turnieju?`,
      `Grupa $${n}$ uczniów porozmawiała na przerwie: każdy z każdym rozmawiał dokładnie raz (rozmowa dwóch osób to jedna rozmowa). Ile rozmów odbyło się na przerwie?`,
    ]);
    return zad(ctx, [pole("ile", "Liczba par")], { ile: q(Y) }, `$${Y}$`, [
      `Każda z $${n}$ osób łączy się w parę z $${n - 1}$ pozostałymi: $${n} \\cdot ${n - 1} = ${X}$.`,
      `Każdą parę policzyliśmy dwa razy (raz od jednej osoby, raz od drugiej), więc dzielimy przez $2$: $${X} : 2 = ${Y}$.`,
    ]);
  }
  if (w < 40) {
    const n = r.int(4, 12), X = n * (n - 1);
    const ctx = r.pick([
      {
        tresc: `Liga liczy $${n}$ ${lm(n, ["drużynę", "drużyny", "drużyn"])}. Każda drużyna gra z każdą dwa razy: raz u siebie i raz na wyjeździe. Ile meczów rozegrano w całej lidze?`,
        krok: `Gospodarza meczu wybieramy na $${n}$ ${lm(n, SPOSOBY)}, a gościa z pozostałych drużyn na $${n - 1}$ ${lm(n - 1, SPOSOBY)}.`,
      },
      {
        tresc: `Z grupy $${n}$ uczniów wybieramy przewodniczącego i jego zastępcę (to dwie różne osoby, a funkcje są różne). Na ile sposobów można ich wybrać?`,
        krok: `Przewodniczącego wybieramy na $${n}$ ${lm(n, SPOSOBY)}, a zastępcę spośród pozostałych uczniów na $${n - 1}$ ${lm(n - 1, SPOSOBY)}.`,
      },
    ]);
    return zad(ctx.tresc, [pole("ile", "Liczba możliwości")], { ile: q(X) }, `$${X}$`, [
      ctx.krok,
      `Tutaj kolejność ma znaczenie, więc nie dzielimy przez $2$: $${n} \\cdot ${n - 1} = ${X}$.`,
    ]);
  }
  if (w < 62) {
    const n = r.int(3, 10), Y = (n * (n - 1)) / 2;
    return zad(
      `Na płaszczyźnie zaznaczono $${n}$ punktów, z których żadne trzy nie leżą na jednej prostej. Każde dwa punkty połączono odcinkiem. Ile odcinków narysowano?`,
      [pole("ile", "Liczba odcinków")], { ile: q(Y) }, `$${Y}$`,
      [
        `Z każdego punktu wychodzi odcinek do $${n - 1}$ pozostałych punktów: $${n} \\cdot ${n - 1} = ${n * (n - 1)}$.`,
        `Każdy odcinek policzyliśmy dwa razy (od jednego końca i od drugiego), więc dzielimy przez $2$: $${n * (n - 1)} : 2 = ${Y}$.`,
      ],
    );
  }
  if (w < 85) {
    // odwrotnie: znamy liczbę uścisków
    const n = r.int(4, 12), Y = (n * (n - 1)) / 2;
    const proby = [];
    for (let k = Math.max(2, n - 3); k <= n; k++) proby.push(`dla $${k}$ osób jest $${(k * (k - 1)) / 2}$ ${lm((k * (k - 1)) / 2, ["uścisk", "uściski", "uścisków"])}`);
    return zad(
      `Na spotkaniu każdy przywitał się uściskiem dłoni z każdym innym uczestnikiem. Łącznie było $${Y}$ uścisków dłoni. Ile osób było na spotkaniu?`,
      [pole("n", "Liczba osób")], { n: q(n) }, `$${n}$ ${lm(n, OSOBA_FORMY)}`,
      [
        `Dla $n$ osób uścisków jest $n \\cdot (n - 1) : 2$. Sprawdzamy kolejne liczby osób: ${proby.join("; ")}.`,
        `Liczba $${Y}$ wychodzi dla $${n}$ osób. Sprawdzenie: $${n} \\cdot ${n - 1} : 2 = ${n * (n - 1)} : 2 = ${Y}$.`,
      ],
    );
  }
  // ile jest sposobów ustawienia: kolejka, półka, krzesła
  const k = r.int(3, 6), sil = Array.from({ length: k }, (_, i) => k - i);
  const X = sil.reduce((a, b) => a * b, 1);
  const warunek = r.chance(0.35) && k >= 4;
  const rzecz = r.pick([
    {
      opis: (n) => `Do kasy ustawiamy w kolejce $${n}$ ${lm(n, OSOBA_FORMY)}`, pyt: "Na ile sposobów można je ustawić w tej kolejce?",
      war: "jedna wskazana osoba (Ania) ma stać na samym początku", ust: "Ania ma ustalone miejsce – stoi na początku, to tylko jeden sposób.", kto: "osób", formy: OSOBA_FORMY,
    },
    {
      opis: (n) => `Na półce chcemy ustawić obok siebie $${n}$ różnych książek`, pyt: "Na ile sposobów można to zrobić?",
      war: "jedna wskazana książka (słownik) ma stać na samym początku", ust: "Słownik ma ustalone miejsce – stoi na początku, to tylko jeden sposób.", kto: "książek", formy: KSIAZEK,
    },
    {
      opis: (n) => `Na $${n}$ krzesłach ustawionych w rzędzie sadzamy $${n}$ ${lm(n, OSOBA_FORMY)}`, pyt: "Na ile sposobów można je posadzić?",
      war: "jedna wskazana osoba (Ania) ma zająć pierwsze krzesło", ust: "Ania ma ustalone miejsce – siedzi na pierwszym krześle, to tylko jeden sposób.", kto: "osób", formy: OSOBA_FORMY,
    },
  ]);
  if (warunek) {
    const Y = sil.slice(1).reduce((a, b) => a * b, 1);
    return zad(
      `${rzecz.opis(k)}, ale ${rzecz.war}. ${rzecz.pyt}`,
      [pole("ile", "Liczba sposobów")], { ile: q(Y) }, `$${Y}$`,
      [
        rzecz.ust,
        `Pozostałe $${k - 1}$ ${lm(k - 1, rzecz.formy)} ustawiamy na pozostałych miejscach: na pierwszym wolnym miejscu może być każda z $${k - 1}$, na następnym jedna z pozostałych, i tak dalej, aż zostaje $1$.`,
        `Mnożymy: $${sil.slice(1).join(" \\cdot ")} = ${Y}$.`,
      ],
    );
  }
  return zad(
    `${rzecz.opis(k)}. ${rzecz.pyt}`,
    [pole("ile", "Liczba sposobów")], { ile: q(X) }, `$${dz(X)}$`,
    [
      `Na pierwszym miejscu może być każda z $${k}$ ${rzecz.kto}, na drugim jedna z pozostałych $${k - 1}$, i tak dalej, aż na ostatnim zostaje $1$.`,
      `Mnożymy: $${sil.join(" \\cdot ")} = ${dz(X)}$.`,
    ],
  );
}

function zestawyIPary(r) {
  return r.chance(0.4) ? zestawy(r) : pary(r);
}

// =====================================================================================================================
// TEMAT 4. Prawdopodobieństwo
// =====================================================================================================================

const KROKI_P = (a, b) => {
  const p = q(a, b);
  return `$P = ${fr(a, b)}${p.d !== b || p.n !== a ? ` = ${p.tex()}` : ""}$.`;
};
const poleP = () => pole("p", "Prawdopodobieństwo (ułamek)");

// --- 7. Kostka, monety, dwie kostki

const jestPierwsza = (n) => n > 1 && [...Array(Math.max(n - 2, 0)).keys()].every((i) => n % (i + 2) !== 0);

const ZDARZENIA_KOSTKI = [
  () => ({ opis: "wypadnie liczba parzysta", pred: (x) => x % 2 === 0 }),
  () => ({ opis: "wypadnie liczba nieparzysta", pred: (x) => x % 2 === 1 }),
  (r) => { const k = r.int(2, 5); return { opis: `wypadnie liczba oczek większa od $${k}$`, pred: (x) => x > k }; },
  (r) => { const k = r.int(2, 6); return { opis: `wypadnie liczba oczek mniejsza od $${k}$`, pred: (x) => x < k }; },
  () => ({ opis: "wypadnie liczba pierwsza", pred: jestPierwsza }),
  () => ({ opis: "wypadnie liczba oczek podzielna przez $3$", pred: (x) => x % 3 === 0 }),
  () => ({ opis: "wypadnie liczba oczek niepodzielna przez $3$", pred: (x) => x % 3 !== 0 }),
  (r) => { const k = r.pick([4, 6, 12]); return { opis: `wypadnie liczba oczek będąca dzielnikiem liczby $${k}$`, pred: (x) => k % x === 0 }; },
  (r) => { const k = r.int(1, 6); return { opis: `nie wypadnie liczba oczek równa $${k}$`, pred: (x) => x !== k }; },
  (r) => { const k = r.int(2, 5); return { opis: `wypadnie co najmniej $${k}$ ${lm(k, ["oczko", "oczka", "oczek"])}`, pred: (x) => x >= k }; },
  (r) => { const k = r.int(2, 5); return { opis: `wypadnie co najwyżej $${k}$ ${lm(k, ["oczko", "oczka", "oczek"])}`, pred: (x) => x <= k }; },
  () => ({ opis: "wypadnie liczba oczek będąca kwadratem liczby naturalnej", pred: (x) => x === 1 || x === 4 }),
];

function rzutKostka(r) {
  const z = r.pick(ZDARZENIA_KOSTKI)(r);
  const wszystkie = [1, 2, 3, 4, 5, 6], fav = wszystkie.filter(z.pred);
  const p = q(fav.length, 6);
  const o = r.pick(OSOBY);
  const kto = r.pick(["Rzucamy jeden raz", `${o.im} ${f(o, "rzucił", "rzuciła")} jeden raz`]);
  return zad(
    `${kto} symetryczną sześcienną kostką do gry. Oblicz prawdopodobieństwo, że ${z.opis}.`,
    [poleP()], { p }, `$${p.tex()}$`,
    [
      `Kostka ma $6$ ścianek, więc wszystkich jednakowo możliwych wyników jest $6$: ${listaTex(wszystkie)}.`,
      `Wyniki sprzyjające zdarzeniu: ${listaTex(fav)}. Jest ich $${fav.length}$.`,
      `Prawdopodobieństwo to wyniki sprzyjające podzielone przez wszystkie: ${KROKI_P(fav.length, 6)}`,
    ],
  );
}

const ZDARZENIA_MONET = [
  { opis: "na obu monetach wypadną orły", fav: ["OO"] },
  { opis: "na obu monetach wypadną reszki", fav: ["RR"] },
  { opis: "wypadnie dokładnie jeden orzeł", fav: ["OR", "RO"] },
  { opis: "wypadnie co najmniej jeden orzeł", fav: ["OO", "OR", "RO"] },
  { opis: "wypadnie co najwyżej jeden orzeł", fav: ["OR", "RO", "RR"] },
  { opis: "na obu monetach wypadnie ten sam wynik", fav: ["OO", "RR"] },
  { opis: "na monetach wypadną różne wyniki", fav: ["OR", "RO"] },
  { opis: "na pierwszej monecie wypadnie orzeł", fav: ["OO", "OR"] },
  { opis: "na drugiej monecie wypadnie reszka", fav: ["OR", "RR"] },
];

function rzutMonetami(r) {
  const z = r.pick(ZDARZENIA_MONET);
  const p = q(z.fav.length, 4);
  const o = r.pick(OSOBY);
  const sposob = r.pick([
    "Rzucamy dwa razy symetryczną monetą.",
    "Rzucamy jednocześnie dwiema symetrycznymi monetami (pierwsza i druga moneta są rozróżnialne).",
    `${o.im} ${f(o, "rzucił", "rzuciła")} dwa razy symetryczną monetą.`,
  ]);
  return zad(
    `${sposob} Oblicz prawdopodobieństwo, że ${z.opis}.`,
    [poleP()], { p }, `$${p.tex()}$`,
    [
      `Zapisujemy wszystkie wyniki (O – orzeł, R – reszka): OO, OR, RO, RR. Jest ich $2 \\cdot 2 = 4$ i wszystkie są jednakowo możliwe.`,
      `Wyniki sprzyjające zdarzeniu: ${z.fav.join(", ")}. Jest ich $${z.fav.length}$.`,
      `Prawdopodobieństwo to wyniki sprzyjające podzielone przez wszystkie: ${KROKI_P(z.fav.length, 4)}`,
    ],
  );
}

const PARY_KOSTEK = [];
for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) PARY_KOSTEK.push([a, b]);
const para = ([a, b]) => `(${a}, ${b})`;

const ZDARZENIA_KOSTEK = [
  (r) => { const s = r.int(2, 12); return { opis: `suma wyrzuconych oczek będzie równa $${s}$`, pred: ([a, b]) => a + b === s }; },
  (r) => { const s = r.pick([10, 11]); return { opis: `suma wyrzuconych oczek będzie równa co najmniej $${s}$`, pred: ([a, b]) => a + b >= s }; },
  (r) => { const s = r.pick([3, 4]); return { opis: `suma wyrzuconych oczek będzie równa co najwyżej $${s}$`, pred: ([a, b]) => a + b <= s }; },
  () => ({ opis: "na obu kostkach wypadnie taka sama liczba oczek", pred: ([a, b]) => a === b }),
  (r) => { const p = r.pick([4, 5, 6, 8, 9, 10, 12, 24]); return { opis: `iloczyn wyrzuconych oczek będzie równy $${p}$`, pred: ([a, b]) => a * b === p }; },
  () => ({
    opis: "na co najmniej jednej kostce wypadnie szóstka", pred: ([a, b]) => a === 6 || b === 6,
    kroki: (fav) => [`Łatwiej policzyć zdarzenie przeciwne: na żadnej kostce nie ma szóstki. Każda kostka ma wtedy $5$ możliwości, więc takich wyników jest $5 \\cdot 5 = 25$.`, `Wyników z co najmniej jedną szóstką jest $36 - 25 = ${fav.length}$.`],
  }),
  () => ({
    opis: "na żadnej kostce nie wypadnie szóstka", pred: ([a, b]) => a !== 6 && b !== 6,
    kroki: (fav) => [`Na każdej kostce może wypaść jedna z liczb od $1$ do $5$, czyli $5$ możliwości. Takich wyników jest $5 \\cdot 5 = ${fav.length}$.`],
  }),
  () => ({
    opis: "na obu kostkach wypadnie liczba parzysta", pred: ([a, b]) => a % 2 === 0 && b % 2 === 0,
    kroki: (fav) => [`Na każdej kostce są trzy liczby parzyste ($2$, $4$, $6$), więc takich wyników jest $3 \\cdot 3 = ${fav.length}$.`],
  }),
  () => ({
    opis: "iloczyn wyrzuconych oczek będzie liczbą nieparzystą", pred: ([a, b]) => (a * b) % 2 === 1,
    kroki: (fav) => [`Iloczyn jest nieparzysty tylko wtedy, gdy obie liczby są nieparzyste. Na każdej kostce są trzy liczby nieparzyste ($1$, $3$, $5$), więc takich wyników jest $3 \\cdot 3 = ${fav.length}$.`],
  }),
  () => ({
    opis: "suma wyrzuconych oczek będzie liczbą nieparzystą", pred: ([a, b]) => (a + b) % 2 === 1,
    kroki: (fav) => [`Suma jest nieparzysta, gdy jedna liczba jest parzysta, a druga nieparzysta. Mamy $3 \\cdot 3 = 9$ wyników, gdy pierwsza jest parzysta, i $3 \\cdot 3 = 9$, gdy pierwsza jest nieparzysta.`, `Razem $9 + 9 = ${fav.length}$ wyników.`],
  }),
];

function rzutDwomaKostkami(r) {
  const z = r.pick(ZDARZENIA_KOSTEK)(r);
  const fav = PARY_KOSTEK.filter(z.pred);
  if (fav.length === 0 || fav.length === 36) return rzutDwomaKostkami(r);
  const p = q(fav.length, 36);
  const kroki = [`Wyniki rzutu dwiema kostkami to pary (pierwsza kostka, druga kostka). Jest ich $6 \\cdot 6 = 36$ i wszystkie są jednakowo możliwe.`];
  if (z.kroki) kroki.push(...z.kroki(fav));
  else kroki.push(`Wyniki sprzyjające zdarzeniu: ${fav.map((x) => `$${para(x)}$`).join(", ")}. Jest ich $${fav.length}$.`);
  kroki.push(`Prawdopodobieństwo to wyniki sprzyjające podzielone przez wszystkie: ${KROKI_P(fav.length, 36)}`);
  const o = r.pick(OSOBY);
  const kto = r.pick(["Rzucamy jednocześnie", `${o.im} ${f(o, "rzucił", "rzuciła")} jednocześnie`]);
  return zad(
    `${kto} dwiema symetrycznymi sześciennymi kostkami do gry (jedna jest biała, a druga czarna, więc wyniki $(1, 2)$ i $(2, 1)$ są różne). Oblicz prawdopodobieństwo, że ${z.opis}.`,
    [poleP()], { p }, `$${p.tex()}$`, kroki,
  );
}

function kostkaMonetyIKostki(r) {
  const w = r.int(0, 99);
  if (w < 40) return rzutKostka(r);
  if (w < 68) return rzutMonetami(r);
  return rzutDwomaKostkami(r);
}

// --- 8. Losowanie kul, losów, zdarzenie przeciwne, zmiana liczby kul

const KOLORY = [
  { m: "czerwone", f: "czerwona", g: "czerwonych", dop: "czerwonej", bier: "czerwoną" },
  { m: "niebieskie", f: "niebieska", g: "niebieskich", dop: "niebieskiej", bier: "niebieską" },
  { m: "białe", f: "biała", g: "białych", dop: "białej", bier: "białą" },
  { m: "zielone", f: "zielona", g: "zielonych", dop: "zielonej", bier: "zieloną" },
  { m: "żółte", f: "żółta", g: "żółtych", dop: "żółtej", bier: "żółtą" },
  { m: "czarne", f: "czarna", g: "czarnych", dop: "czarnej", bier: "czarną" },
];
/** Mianownik: „$5$ kul czerwonych”, „$3$ kule niebieskie”, „$1$ kula biała”. */
const kule = (n, k) => {
  if (n === 1) return `$1$ kula ${k.f}`;
  const j = n % 10, d = n % 100;
  return j >= 2 && j <= 4 && !(d >= 12 && d <= 14) ? `$${n}$ kule ${k.m}` : `$${n}$ kul ${k.g}`;
};
/** Biernik (po „zawiera”, „dokładamy”, „wyjmujemy”): różni się od mianownika tylko dla jednej kuli: „$1$ kulę białą”. */
const kuleA = (n, k) => (n === 1 ? `$1$ kulę ${k.bier}` : kule(n, k));
const KULI = ["kula", "kule", "kul"];
const kulA = (n) => (n === 1 ? "kulę" : lm(n, KULI));

function kuleWWorku(r) {
  return probuj(() => {
    const ile = r.int(2, 3);
    const kol = r.shuffle(KOLORY).slice(0, ile);
    const licz = kol.map(() => r.int(1, 9));
    const N = licz.reduce((a, b) => a + b, 0);
    if (N > 30 || N < 6) return null;
    const opis = `Worek zawiera ${wypisz(kol.map((k, i) => kuleA(licz[i], k)))}. Losujemy z worka jedną kulę.`;
    const sumaKrok = `Wszystkich kul jest $${licz.join(" + ")} = ${N}$.`;
    const w = r.int(0, 2);
    if (w === 0) {
      const i = r.int(0, ile - 1), p = q(licz[i], N);
      return zad(
        `${opis} Oblicz prawdopodobieństwo wylosowania kuli ${kol[i].dop}.`,
        [poleP()], { p }, `$${p.tex()}$`,
        [sumaKrok, `Wyników sprzyjających jest tyle, ile kul ${kol[i].g}: $${licz[i]}$.`, KROKI_P(licz[i], N)],
      );
    }
    if (w === 1) {
      const i = r.int(0, ile - 1), p = q(N - licz[i], N);
      return zad(
        `${opis} Oblicz prawdopodobieństwo, że wylosowana kula nie będzie ${kol[i].f}.`,
        [poleP()], { p }, `$${p.tex()}$`,
        [
          sumaKrok,
          `Kul ${kol[i].g} jest $${licz[i]}$, więc kul, które nie są ${kol[i].m}, jest $${N} - ${licz[i]} = ${N - licz[i]}$.`,
          `${KROKI_P(N - licz[i], N)} (albo inaczej: $1 - ${fr(licz[i], N)}$ – zdarzenie przeciwne)`,
        ],
      );
    }
    if (ile < 3) return null;
    const [i, j] = r.shuffle([0, 1, 2]).slice(0, 2), p = q(licz[i] + licz[j], N);
    return zad(
      `${opis} Oblicz prawdopodobieństwo wylosowania kuli ${kol[i].dop} lub ${kol[j].dop}.`,
      [poleP()], { p }, `$${p.tex()}$`,
      [sumaKrok, `Sprzyjają kule ${kol[i].m} i ${kol[j].m}: $${licz[i]} + ${licz[j]} = ${licz[i] + licz[j]}$.`, KROKI_P(licz[i] + licz[j], N)],
    );
  });
}

function losyZNumerami(r) {
  return probuj(() => {
    const N = r.pick([12, 15, 16, 20, 24, 25, 30, 36, 40]);
    const w = r.int(0, 5);
    let opis, fav, wyjasnienie;
    const wszystkie = Array.from({ length: N }, (_, i) => i + 1);
    if (w <= 1) {
      const kk = r.pick([2, 3, 4, 5, 6]);
      opis = `jest podzielny przez $${kk}$`;
      fav = wszystkie.filter((x) => x % kk === 0);
      wyjasnienie = `Liczby podzielne przez $${kk}$ to ${fav.length <= 8 ? listaTex(fav) : `$${kk}$, $${2 * kk}$, $${3 * kk}$, …, $${fav[fav.length - 1]}$`}. Jest ich $${fav.length}$.`;
    } else if (w === 2) {
      opis = "będzie liczbą pierwszą";
      fav = wszystkie.filter(jestPierwsza);
      wyjasnienie = `Liczby pierwsze od $1$ do $${N}$ to ${listaTex(fav)}. Jest ich $${fav.length}$ (liczba $1$ nie jest pierwsza).`;
    } else if (w === 3) {
      const kk = r.int(2, N - 6);
      opis = `jest większy od $${kk}$`;
      fav = wszystkie.filter((x) => x > kk);
      wyjasnienie = `Liczby większe od $${kk}$ to liczby od $${kk + 1}$ do $${N}$. Jest ich $${N} - ${kk} = ${fav.length}$.`;
    } else if (w === 4) {
      opis = "jest kwadratem liczby naturalnej";
      fav = wszystkie.filter((x) => Number.isInteger(Math.sqrt(x)));
      wyjasnienie = `Kwadraty liczb naturalnych nie większe od $${N}$ to ${listaTex(fav)}. Jest ich $${fav.length}$.`;
    } else {
      const kk = r.pick([3, 4, 5]);
      opis = `nie jest podzielny przez $${kk}$`;
      const podz = wszystkie.filter((x) => x % kk === 0);
      fav = wszystkie.filter((x) => x % kk !== 0);
      wyjasnienie = `Podzielnych przez $${kk}$ jest $${podz.length}$, więc niepodzielnych jest $${N} - ${podz.length} = ${fav.length}$.`;
    }
    if (fav.length === 0 || fav.length === N) return null;
    const p = q(fav.length, N);
    return zad(
      `W urnie jest $${N}$ losów ponumerowanych kolejnymi liczbami od $1$ do $${N}$. Losujemy jeden los. Oblicz prawdopodobieństwo, że numer wylosowanego losu ${opis}.`,
      [poleP()], { p }, `$${p.tex()}$`,
      [`Losów jest $${N}$, więc wszystkich wyników jest $${N}$.`, wyjasnienie, KROKI_P(fav.length, N)],
    );
  });
}

function zmianaLiczbyKul(r) {
  return probuj(() => {
    const [k1, k2] = r.shuffle(KOLORY).slice(0, 2);
    const a = r.int(2, 9), b = r.int(2, 9);
    const rodzaj = r.int(0, 3);
    let nowaA = a, nowaB = b, akcja;
    if (rodzaj === 0) { const x = r.int(1, 6); nowaA += x; akcja = `Dokładamy do worka ${kuleA(x, k1)}.`; }
    else if (rodzaj === 1) { const x = r.int(1, 6); nowaB += x; akcja = `Dokładamy do worka ${kuleA(x, k2)}.`; }
    else if (rodzaj === 2) { const x = r.int(1, b - 1); nowaB -= x; akcja = `Z worka wyjmujemy ${kuleA(x, k2)}.`; }
    else { const x = r.int(1, a - 1); nowaA -= x; akcja = `Z worka wyjmujemy ${kuleA(x, k1)}.`; }
    const N = a + b, M = nowaA + nowaB;
    if (N > 25 || M > 30 || M < 3) return null;
    const p = q(nowaA, M);
    if (p.d > 40) return null;
    return zad(
      `Worek zawiera ${kuleA(a, k1)} i ${kuleA(b, k2)}. ${akcja} Następnie losujemy z worka jedną kulę. Oblicz prawdopodobieństwo wylosowania kuli ${k1.dop}.`,
      [poleP()], { p }, `$${p.tex()}$`,
      [
        `Na początku w worku: ${kule(a, k1)} i ${kule(b, k2)}. Po zmianie w worku: ${kule(nowaA, k1)} i ${kule(nowaB, k2)}.`,
        `Wszystkich kul jest teraz $${nowaA} + ${nowaB} = ${M}$.`,
        `${KROKI_P(nowaA, M)}`,
      ],
    );
  });
}

function ileKulIDolozyc(r) {
  return probuj(() => {
    if (r.chance(0.55)) {
      const q1 = r.pick([3, 4, 5, 6, 8, 10]), p1 = r.int(1, q1 - 1);
      if (nwd(p1, q1) !== 1) return null;
      const t = r.int(1, Math.floor(40 / q1));
      const N = q1 * t, ile = p1 * t;
      if (N < 6 || ile < 1) return null;
      const k = r.pick(KOLORY);
      return zad(
        `W worku jest $${N}$ kul. Prawdopodobieństwo wylosowania kuli ${k.dop} wynosi $${fr(p1, q1)}$. Ile jest w worku kul ${k.g}?`,
        [pole("ile", `Liczba kul ${k.g}`)], { ile: q(ile) }, `$${ile}$ ${lm(ile, KULI)}`,
        [
          `Prawdopodobieństwo to ułamek: kule ${k.m} podzielone przez wszystkie kule, czyli $${fr("x", N)} = ${fr(p1, q1)}$.`,
          `Rozszerzamy ułamek $${fr(p1, q1)}$ do mianownika $${N}$ (mnożymy licznik i mianownik przez $${t}$): $${fr(p1, q1)} = ${fr(ile, N)}$.`,
          `Zatem kul ${k.g} jest $${ile}$. Sprawdzenie: $${fr(ile, N)} = ${fr(p1, q1)}$ – zgadza się.`,
        ],
      );
    }
    const [k1, k2] = r.shuffle(KOLORY).slice(0, 2);
    const a = r.int(2, 8), b = a + r.int(1, 8);
    const x = b - a;
    return zad(
      `Worek zawiera ${kuleA(a, k1)} i ${kuleA(b, k2)}. Ile kul ${k1.g} trzeba dołożyć do worka, aby prawdopodobieństwo wylosowania kuli ${k1.dop} było równe $${fr(1, 2)}$?`,
      [pole("x", `Liczba kul ${k1.g}`)], { x: q(x) }, `$${x}$ ${lm(x, KULI)}`,
      [
        `Prawdopodobieństwo $${fr(1, 2)}$ oznacza, że kul ${k1.g} ma być tyle samo, co wszystkich pozostałych, czyli $${b}$ (kule ${k2.m} się nie zmieniają).`,
        `Mamy $${a}$ kul ${k1.g}, więc trzeba dołożyć $${b} - ${a} = ${x}$.`,
        `Sprawdzenie: kul ${k1.g} będzie $${a} + ${x} = ${b}$, wszystkich $${b + b}$, więc $P = ${fr(b, 2 * b)} = ${fr(1, 2)}$.`,
      ],
    );
  });
}

const ZDARZENIA_PRZECIWNE = [
  { zdanie: (p) => `Prawdopodobieństwo wygrania losu na loterii szkolnej wynosi ${p}.`, pyt: "Oblicz prawdopodobieństwo, że los będzie przegrany." },
  { zdanie: (p) => `Prawdopodobieństwo, że jutro będzie padał deszcz, wynosi ${p}.`, pyt: "Oblicz prawdopodobieństwo, że jutro nie będzie padać." },
  { zdanie: (p) => `Prawdopodobieństwo, że autobus przyjedzie na przystanek punktualnie, wynosi ${p}.`, pyt: "Oblicz prawdopodobieństwo, że autobus się spóźni (albo przyjedzie przed czasem)." },
  { zdanie: (p) => `Prawdopodobieństwo, że losowo wybrany uczeń szkoły nosi okulary, wynosi ${p}.`, pyt: "Oblicz prawdopodobieństwo, że losowo wybrany uczeń tej szkoły nie nosi okularów." },
];

function zdarzeniePrzeciwne(r) {
  return probuj(() => {
    const k = r.pick(ZDARZENIA_PRZECIWNE);
    let p, zapis;
    if (r.chance(0.5)) {
      const d = r.pick([5, 8, 10, 20, 25]);
      p = q(r.int(1, d - 1), d);
      zapis = `$${p.tex()}$`;
    } else {
      p = q(r.int(1, 19) * 5, 100);
      zapis = `$${dz(p)}$`;
    }
    const odp = q(1).sub(p);
    return zad(
      `${k.zdanie(zapis)} ${k.pyt}`,
      [poleP()], { p: odp }, `$${odp.tex()}$`,
      [
        `Zdarzenie i zdarzenie przeciwne razem dają pewność, czyli prawdopodobieństwo $1$. Dlatego prawdopodobieństwo zdarzenia przeciwnego to $1 - P$.`,
        `$1 - ${p.tex()} = ${odp.tex()}$.`,
      ],
    );
  });
}

const POROWNANIE = ["Z worka A.", "Z worka B.", "Szanse są takie same."];

function porownanieWorkow(r) {
  return probuj(() => {
    const k = r.pick(KOLORY);
    const jednakowe = r.chance(0.2);
    const nA = r.int(4, 12), aA = r.int(1, nA - 1);
    let nB, aB;
    if (jednakowe) {
      const m = r.int(2, 3);
      nB = nA * m; aB = aA * m;
      if (nB > 30) return null;
    } else {
      nB = r.int(4, 12); aB = r.int(1, nB - 1);
    }
    const pA = q(aA, nA), pB = q(aB, nB);
    if (!jednakowe && pA.eq(pB)) return null;
    if (nA === nB && !jednakowe && aA === aB) return null;
    const ind = pA.cmp(pB) > 0 ? 0 : pA.cmp(pB) < 0 ? 1 : 2;
    const L = nww(pA.d, pB.d);
    if (L > 60) return null;
    return zad(
      `Worek A zawiera ${kuleA(aA, k)} i $${nA - aA}$ ${kulA(nA - aA)} innego koloru. Worek B zawiera ${kuleA(aB, k)} i $${nB - aB}$ ${kulA(nB - aB)} innego koloru. Z którego worka większa jest szansa wylosowania kuli ${k.dop}?`,
      [polew("worek", "Odpowiedź", POROWNANIE)], { worek: ind }, POROWNANIE[ind],
      [
        `Worek A: wszystkich kul jest $${nA}$, więc $P_A = ${pA.d !== nA ? `${fr(aA, nA)} = ${pA.tex()}` : fr(aA, nA)}$. Worek B: wszystkich kul jest $${nB}$, więc $P_B = ${pB.d !== nB ? `${fr(aB, nB)} = ${pB.tex()}` : fr(aB, nB)}$.`,
        `Porównujemy ułamki, sprowadzając je do wspólnego mianownika $${L}$: $P_A = ${fr(pA.n * (L / pA.d), L)}$, $P_B = ${fr(pB.n * (L / pB.d), L)}$.`,
        ind === 2 ? `Ułamki są równe, więc szanse są takie same.` : `Większy ułamek ma ${ind === 0 ? "worek A" : "worek B"}, więc tam szansa jest większa.`,
      ],
    );
  });
}

function losowanieIZdarzeniePrzeciwne(r) {
  const w = r.int(0, 99);
  if (w < 26) return kuleWWorku(r);
  if (w < 44) return losyZNumerami(r);
  if (w < 62) return zmianaLiczbyKul(r);
  if (w < 72) return ileKulIDolozyc(r);
  if (w < 88) return zdarzeniePrzeciwne(r);
  return porownanieWorkow(r);
}

// --- Lista generatorów

export const GENERATORY = [
  { id: "tabela-i-diagram-slupkowy", nazwa: "Odczyt z tabeli i diagramu słupkowego", opis: "Dane w małej tabeli albo na opisanym słowami diagramie słupkowym (jedna kreska to kilka jednostek): suma, o ile więcej, ile razy więcej, jaki procent całości, różnica największej i najmniejszej wartości.", temat: "odczytywanie-danych", generuj: tabelaIDiagram },
  { id: "wykres-kolowy-i-zaleznosci", nazwa: "Wykres kołowy i wykres drogi w czasie", opis: "Wykres kołowy opisany słowami (kąt wycinka, liczba uczniów, procent pozostałego wycinka) oraz wykres drogi od czasu podany tabelą punktów: postój, prędkość na odcinku, największa prędkość, przejechana droga.", temat: "odczytywanie-danych", generuj: wykresKolowyIZaleznosci },
  { id: "srednia-suma-brakujaca", nazwa: "Średnia, suma i brakująca liczba", opis: "Średnia arytmetyczna kilku liczb w zadaniach z życia (oceny, bramki, wzrost, temperatura), suma ze średniej, brakująca liczba przy danej średniej, średnia dwóch, trzech i czterech liczb.", temat: "srednia", generuj: sredniaSumaBrak },
  { id: "zmiana-sredniej", nazwa: "Zmiana średniej, średnia z tabeli, dwie grupy", opis: "Nowa średnia po dopisaniu albo usunięciu liczby, co się stanie ze średnią, jaką liczbę dopisać, zmiana wszystkich liczb, średnia z tabeli liczności i średnia dwóch grup o różnej liczebności.", temat: "srednia", generuj: zmianaSredniej },
  { id: "dominanta-i-mediana-z-listy", nazwa: "Dominanta i mediana z listy", opis: "Dominanta (także dwie dominanty) i mediana listy liczb z życia: oceny, czasy dojazdu, bramki, wyniki w skoku; mediana przy parzystej i nieparzystej liczbie danych.", temat: "mediana-dominanta", generuj: dominantaIMedianaZListy },
  { id: "mediana-tabela-srednia", nazwa: "Mediana z tabeli, średnia a mediana", opis: "Dominanta i mediana z tabeli liczności, mediana po dopisaniu liczby, średnia i mediana przy jednej bardzo dużej wartości oraz wybór, która z nich lepiej opisuje typowy wynik.", temat: "mediana-dominanta", generuj: medianaZTabeliISrednia },
  { id: "liczby-z-cyfr-i-kody", nazwa: "Liczby i kody z cyfr", opis: "Ile liczb dwucyfrowych i trzycyfrowych można zapisać z danych cyfr (z powtórzeniami i bez, zero nie na początku, parzyste), ile liczb ma daną własność, ile jest kodów i zamków szyfrowych.", temat: "zliczanie", generuj: liczbyICyfry },
  { id: "zestawy-pary-kolejnosc", nazwa: "Zestawy, pary i ustawianie w kolejności", opis: "Reguła mnożenia w strojach, obiadach i trasach, uściski dłoni, mecze i odcinki (n·(n−1):2), liczba osób z liczby uścisków, wybór dwóch funkcji, ustawianie w kolejce i na półce.", temat: "zliczanie", generuj: zestawyIPary },
  { id: "kostka-monety-dwie-kostki", nazwa: "Kostka, dwie monety i dwie kostki", opis: "Prawdopodobieństwo zdarzeń przy rzucie kostką (parzysta, pierwsza, większa od k, dzielnik), dwiema monetami (orzeł i reszka) oraz dwiema kostkami (suma oczek, iloczyn, ta sama liczba).", temat: "prawdopodobienstwo", generuj: kostkaMonetyIKostki },
  { id: "losowanie-i-zdarzenie-przeciwne", nazwa: "Losowanie kul i losów, zdarzenie przeciwne", opis: "Losowanie kul z worka i losów z numerami, dokładanie i wyjmowanie kul, ile kul jest w worku, zdarzenie przeciwne (1 − P) oraz porównanie szans w dwóch workach.", temat: "prawdopodobienstwo", generuj: losowanieIZdarzeniePrzeciwne },
];
