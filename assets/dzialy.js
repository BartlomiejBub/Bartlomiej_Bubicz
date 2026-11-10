// Działy ćwiczeń: zadania z arkuszy CKE (posortowane po tematach), wzory, generatory i karty pracy.
// Pole egzamin: "matura" albo "e8" (egzamin ósmoklasisty) – na stronie każdy egzamin ma swoje działy.
import { GENERATORY as LICZBY } from "./generatory/liczby.js";
import { GENERATORY as FUNKCJE } from "./generatory/funkcje.js";
import { GENERATORY as GEOMETRIA } from "./generatory/geometria.js";
import { GENERATORY as STATYSTYKA } from "./generatory/statystyka.js";
import { GENERATORY as DOWODY } from "./generatory/dowody.js";
import { GENERATORY as TEKSTOWE } from "./generatory/tekstowe.js";
import { GENERATORY as E8_PODSTAWY } from "./generatory/e8-podstawy.js";
import { GENERATORY as E8_LICZBY } from "./generatory/e8-liczby.js";
import { GENERATORY as E8_WYRAZENIA } from "./generatory/e8-wyrazenia.js";
import { GENERATORY as E8_PROCENTY } from "./generatory/e8-procenty.js";
import { GENERATORY as E8_FIGURY } from "./generatory/e8-figury.js";
import { GENERATORY as E8_BRYLY } from "./generatory/e8-bryly.js";
import { GENERATORY as E8_DANE } from "./generatory/e8-dane.js";
import { losownik, ziarno } from "./generatory/wspolne.js";
import { ARKUSZE as ARKUSZE_MATURY } from "./arkusze/index.js";
import { ARKUSZE as ARKUSZE_E8 } from "./arkusze-e8/index.js";
import { TEMATY } from "./arkusze/tematy.js";
import { ZESTAWY } from "./zadania/index.js";
import { WZORY as WZORY_LICZBY } from "./wzory/liczby.js";
import { WZORY as WZORY_FUNKCJE } from "./wzory/funkcje.js";
import { WZORY as WZORY_GEOMETRIA } from "./wzory/geometria.js";
import { WZORY as WZORY_STATYSTYKA } from "./wzory/statystyka.js";
import { WZORY as WZORY_DOWODY } from "./wzory/dowody.js";
import { WZORY as WZORY_TEKSTOWE } from "./wzory/tekstowe.js";
import { WZORY as WZORY_E8_PODSTAWY } from "./wzory/e8-podstawy.js";
import { WZORY as WZORY_E8_LICZBY } from "./wzory/e8-liczby.js";
import { WZORY as WZORY_E8_WYRAZENIA } from "./wzory/e8-wyrazenia.js";
import { WZORY as WZORY_E8_PROCENTY } from "./wzory/e8-procenty.js";
import { WZORY as WZORY_E8_FIGURY } from "./wzory/e8-figury.js";
import { WZORY as WZORY_E8_BRYLY } from "./wzory/e8-bryly.js";
import { WZORY as WZORY_E8_DANE } from "./wzory/e8-dane.js";
import { KLASY } from "./szkola.js";

const ARKUSZE = [...ARKUSZE_MATURY, ...ARKUSZE_E8];

/** Zadania z arkuszy w danym temacie (zamknięte, potem otwarte), od najnowszych arkuszy, z podpisem źródła. */
function zadaniaTematu(dzial, temat) {
  const z = (lista) => ARKUSZE.flatMap((a) =>
    (lista(a) ?? [])
      .filter((z) => z.dzial === dzial && z.temat === temat)
      .map((z) => ({ ...z, zrodlo: `${a.nazwa}, zadanie ${z.nr}` + (z.punkty ? ` (0–${z.punkty} pkt)` : "") })),
  );
  return [...z((a) => a.zadania), ...z((a) => a.otwarte)];
}

/** Zadania do ćwiczeń (assets/zadania) w danym temacie: zamknięte, potem otwarte; wlasne – rozwiązanie nie pochodzi z klucza CKE. */
function cwiczeniaTematu(dzial, temat) {
  const z = (lista) => ZESTAWY.flatMap((a) =>
    (lista(a) ?? [])
      .filter((z) => z.dzial === dzial && z.temat === temat)
      .map((z) => ({ ...z, wlasne: true, zrodlo: `Zadanie ${z.nr}` + (z.punkty ? ` (0–${z.punkty} pkt)` : "") })),
  );
  return [...z((a) => a.zadania), ...z((a) => a.otwarte)];
}

const tematy = (dzial) => TEMATY[dzial].map((t) => ({ ...t, zadania: zadaniaTematu(dzial, t.id), cwiczenia: cwiczeniaTematu(dzial, t.id) }));

export const DZIALY = [
  {
    id: "liczby",
    egzamin: "matura",
    nazwa: "Liczby i równania",
    opis: "Potęgi, pierwiastki, logarytmy, procenty, wyrażenia algebraiczne, równania i nierówności.",
    tematy: tematy("liczby"),
    wzory: WZORY_LICZBY,
    generatory: LICZBY,
    pdf: [
      { nazwa: "Karta pracy: Liczby i równania", plik: "karty/liczby-i-rownania.pdf", opis: "17 zadań na 2 stronach + odpowiedzi" },
      { nazwa: "Karta pracy: Liczby i równania (2)", plik: "karty/liczby-i-rownania-2.pdf", opis: "zbiory, logika, wielomiany, równania wymierne, układy – 17 zadań + odpowiedzi" },
    ],
  },
  {
    id: "funkcje",
    egzamin: "matura",
    nazwa: "Funkcje i ciągi",
    opis: "Własności funkcji, funkcja liniowa i kwadratowa, ciągi arytmetyczne i geometryczne.",
    tematy: tematy("funkcje"),
    wzory: WZORY_FUNKCJE,
    generatory: FUNKCJE,
    pdf: [
      { nazwa: "Karta pracy: Funkcje i ciągi", plik: "karty/funkcje-i-ciagi.pdf", opis: "17 zadań na 2 stronach + odpowiedzi" },
      { nazwa: "Karta pracy: Funkcje (2)", plik: "karty/funkcje-i-ciagi-2.pdf", opis: "dziedzina, przesunięcia, wykładnicza, logarytm, homograficzna – 17 zadań + odpowiedzi" },
    ],
  },
  {
    id: "geometria",
    egzamin: "matura",
    nazwa: "Geometria",
    opis: "Trygonometria, planimetria, geometria analityczna i stereometria.",
    tematy: tematy("geometria"),
    wzory: WZORY_GEOMETRIA,
    generatory: GEOMETRIA,
    pdf: [
      { nazwa: "Karta pracy: Geometria", plik: "karty/geometria.pdf", opis: "17 zadań na 2 stronach + odpowiedzi" },
      { nazwa: "Karta pracy: Geometria (2)", plik: "karty/geometria-2.pdf", opis: "czworokąty, wektory, proste i płaszczyzny – 17 zadań + odpowiedzi" },
    ],
  },
  {
    id: "statystyka",
    egzamin: "matura",
    nazwa: "Prawdopodobieństwo i statystyka",
    opis: "Kombinatoryka, rachunek prawdopodobieństwa i statystyka.",
    tematy: tematy("statystyka"),
    wzory: WZORY_STATYSTYKA,
    generatory: STATYSTYKA,
    pdf: [
      { nazwa: "Karta pracy: Prawdopodobieństwo i statystyka", plik: "karty/prawdopodobienstwo-i-statystyka.pdf", opis: "17 zadań na 2 stronach + odpowiedzi" },
    ],
  },
  {
    id: "dowody",
    egzamin: "matura",
    nazwa: "Dowody i optymalizacja",
    opis: "Zadania otwarte: dowody algebraiczne i geometryczne oraz zadania na największą i najmniejszą wartość.",
    tematy: tematy("dowody"),
    wzory: WZORY_DOWODY,
    generatory: DOWODY,
    pdf: [
      { nazwa: "Karta pracy: Dowody i optymalizacja", plik: "karty/dowody-i-optymalizacja.pdf", opis: "12 zadań na 2 stronach + rozwiązania" },
    ],
  },
  {
    id: "tekstowe",
    egzamin: "matura",
    nazwa: "Zadania z treścią",
    opis: "Ruch i wspólna praca, procenty i pieniądze, równania z treści i ciągi w praktyce.",
    tematy: tematy("tekstowe"),
    wzory: WZORY_TEKSTOWE,
    generatory: TEKSTOWE,
    pdf: [
      { nazwa: "Karta pracy: Zadania z treścią", plik: "karty/zadania-z-tresci.pdf", opis: "12 zadań na 2 stronach + rozwiązania" },
    ],
  },
  {
    id: "e8-podstawy",
    egzamin: "e8",
    nazwa: "Podstawy: działania i ułamki",
    opis: "Działania pisemne, kolejność działań, liczby ujemne, podzielność oraz ułamki zwykłe i dziesiętne – bez tego trudno o dobry wynik na egzaminie.",
    wzoryTytul: "Jak to zrobić – krok po kroku",
    wzoryOpis: "Każdy sposób wytłumaczony prostymi słowami, z porównaniem do codziennych sytuacji i z przykładem.",
    generatorOpis: "Ćwiczenia, za każdym razem z innymi liczbami. Policz na kartce, wpisz wynik i kliknij „Sprawdź”.",
    tematy: tematy("e8-podstawy"),
    wzory: WZORY_E8_PODSTAWY,
    generatory: E8_PODSTAWY,
    pdf: [],
  },
  {
    id: "e8-liczby",
    egzamin: "e8",
    nazwa: "Liczby i działania",
    opis: "System dziesiętny i rzymski, oś liczbowa, rozwinięcia dziesiętne, dzielniki i liczby pierwsze, zaokrąglanie, potęgi i pierwiastki.",
    wzoryTytul: "Co trzeba umieć – krok po kroku",
    wzoryOpis: "Na egzaminie nie ma karty wzorów, więc tu jest wszystko, co trzeba zapamiętać, wytłumaczone prostymi słowami i na przykładach.",
    tematy: tematy("e8-liczby"),
    wzory: WZORY_E8_LICZBY,
    generatory: E8_LICZBY,
    pdf: [],
  },
  {
    id: "e8-wyrazenia",
    egzamin: "e8",
    nazwa: "Wyrażenia i równania",
    opis: "Zapisywanie i upraszczanie wyrażeń, wartość wyrażenia, równania i zadania tekstowe z równaniem, przekształcanie wzorów i proporcje.",
    wzoryTytul: "Co trzeba umieć – krok po kroku",
    wzoryOpis: "Na egzaminie nie ma karty wzorów, więc tu jest wszystko, co trzeba zapamiętać, wytłumaczone prostymi słowami i na przykładach.",
    tematy: tematy("e8-wyrazenia"),
    wzory: WZORY_E8_WYRAZENIA,
    generatory: E8_WYRAZENIA,
    pdf: [],
  },
  {
    id: "e8-procenty",
    egzamin: "e8",
    nazwa: "Procenty i obliczenia praktyczne",
    opis: "Procenty, podwyżki i obniżki, zakupy, prędkość, jednostki miary, skala oraz obliczenia na czasie i w kalendarzu.",
    wzoryTytul: "Co trzeba umieć – krok po kroku",
    wzoryOpis: "Na egzaminie nie ma karty wzorów ani kalkulatora, więc tu jest wszystko, co trzeba zapamiętać, i sposoby liczenia w pamięci.",
    tematy: tematy("e8-procenty"),
    wzory: WZORY_E8_PROCENTY,
    generatory: E8_PROCENTY,
    pdf: [],
  },
  {
    id: "e8-figury",
    egzamin: "e8",
    nazwa: "Figury płaskie",
    opis: "Kąty, trójkąty, czworokąty i wielokąty, pola i obwody, twierdzenie Pitagorasa, układ współrzędnych i symetrie.",
    wzoryTytul: "Co trzeba umieć – krok po kroku",
    wzoryOpis: "Na egzaminie nie ma karty wzorów, więc tu jest wszystko, co trzeba zapamiętać, wytłumaczone prostymi słowami i na przykładach.",
    tematy: tematy("e8-figury"),
    wzory: WZORY_E8_FIGURY,
    generatory: E8_FIGURY,
    pdf: [],
  },
  {
    id: "e8-bryly",
    egzamin: "e8",
    nazwa: "Bryły",
    opis: "Graniastosłupy i ostrosłupy: krawędzie i ściany, siatki, pole powierzchni, objętość oraz przekątne i wysokości.",
    wzoryTytul: "Co trzeba umieć – krok po kroku",
    wzoryOpis: "Na egzaminie nie ma karty wzorów, więc tu jest wszystko, co trzeba zapamiętać, wytłumaczone prostymi słowami i na przykładach.",
    tematy: tematy("e8-bryly"),
    wzory: WZORY_E8_BRYLY,
    generatory: E8_BRYLY,
    pdf: [],
  },
  {
    id: "e8-dane",
    egzamin: "e8",
    nazwa: "Dane i prawdopodobieństwo",
    opis: "Tabele, diagramy i wykresy, średnia arytmetyczna, zliczanie możliwości i prawdopodobieństwo.",
    wzoryTytul: "Co trzeba umieć – krok po kroku",
    wzoryOpis: "Na egzaminie nie ma karty wzorów, więc tu jest wszystko, co trzeba zapamiętać, wytłumaczone prostymi słowami i na przykładach.",
    tematy: tematy("e8-dane"),
    wzory: WZORY_E8_DANE,
    generatory: E8_DANE,
    pdf: [],
  },
];

export const EGZAMINY = [
  { id: "matura", nazwa: "Matura", opis: "matura, poziom podstawowy", zadania: "Zadania z matur", podobne: "jak na maturze", droga: "do matury" },
  { id: "e8", nazwa: "Egzamin ósmoklasisty", opis: "egzamin ósmoklasisty", zadania: "Zadania z egzaminów", podobne: "jak na egzaminie", droga: "do egzaminu ósmoklasisty" },
];
export const egzamin = (id) => EGZAMINY.find((e) => e.id === id) ?? EGZAMINY[0];

export const RODZAJE = [
  { id: "zadania", nazwa: "Zadania z arkuszy CKE i do ćwiczeń", krotko: "Zadania" },
  { id: "generator", nazwa: "Generator zadań", krotko: "Generator" },
  { id: "karty", nazwa: "Karty pracy", krotko: "Karty" },
];

/** Czy dział ma jakieś materiały danego rodzaju (np. nowy dział może nie mieć jeszcze generatorów). */
export function maMaterialy(d, rodzaj) {
  if (rodzaj === "zadania") return d.tematy.some((t) => t.zadania.length || t.cwiczenia?.length);
  if (rodzaj === "generator") return d.generatory.length > 0;
  return d.pdf.length > 0 || d.generatory.length > 0;
}

/** Karty z generatora: ile stałych kart (1, 2, …) ma każdy dział i ile zadań z każdego generatora trafia na kartę.
 *  Gotowe karty w PDF (pole pdf działu) robi skrypt tools/zrob-karty.mjs. */
export const KARTY = { ile: 3, zadanNaGenerator: 2 };

/** Dział ograniczony do wybranych tematów (null = cały dział): zadania, wzory i generatory tych tematów.
 *  Karta pracy w PDF obejmuje cały dział, więc przy ograniczeniu zostają tylko karty z generatora. */
export function przytnij(d, tematy) {
  if (!tematy) return d;
  return {
    ...d,
    tematy: d.tematy.filter((t) => tematy.includes(t.id)),
    wzory: d.wzory.filter((t) => tematy.includes(t.id)),
    generatory: d.generatory.filter((g) => tematy.includes(g.temat)),
    pdf: [],
  };
}

export const dzial = (id) => DZIALY.find((d) => d.id === id) ?? null;

// --- Widok „Do szkoły”: klasy i rozdziały w kolejności z podręczników (assets/szkola.js)

/** Klasy szkoły, z której zdaje się dany egzamin: "e8" – szkoła podstawowa, "matura" – liceum. */
export const klasy = (egz) => KLASY.filter((k) => k.egzamin === egz);

/** Rozdział o danym id razem z jego klasą albo null. */
export function rozdzial(id) {
  for (const klasa of KLASY) {
    const r = klasa.rozdzialy.find((x) => x.id === id);
    if (r) return { klasa, rozdzial: r };
  }
  return null;
}

/** Rozdziały przerobione przed danym: wcześniejsze w tej klasie i wszystkie z niższych klas tej samej szkoły. */
export function wczesniejszeRozdzialy(klasa, r) {
  const wynik = [];
  for (const k of klasy(klasa.egzamin)) {
    for (const x of k.rozdzialy) {
      if (x === r) return wynik;
      wynik.push({ klasa: k, rozdzial: x });
    }
  }
  return wynik;
}

/** Jaką część każdego tematu uczeń ma za sobą przed danym rozdziałem: "dział/temat" → od 0 do 1.
 *  Temat wraca w kilku rozdziałach (np. pola figur w klasach 4–8), więc liczy się, ile z nich już było. */
export function udzialTematow(klasa, r) {
  const wszystkie = klasy(klasa.egzamin).flatMap((k) => k.rozdzialy);
  const teraz = wszystkie.indexOf(r);
  const licznik = new Map();   // "dział/temat" → { razem, bylo }
  wszystkie.forEach((x, i) => {
    for (const [d, ids] of Object.entries(x.tematy)) {
      for (const t of ids) {
        const l = licznik.get(`${d}/${t}`) ?? { razem: 0, bylo: 0 };
        l.razem++;
        if (i < teraz) l.bylo++;
        licznik.set(`${d}/${t}`, l);
      }
    }
  });
  return new Map([...licznik].map(([klucz, l]) => [klucz, l.bylo / l.razem]));
}

/** Tematy przerobione do końca przed danym rozdziałem (wszystkie ich rozdziały już były) – jako rozdział dla dzialRozdzialu. */
export function przerobioneTematy(klasa, r) {
  const tematy = {};
  for (const [klucz, udzial] of udzialTematow(klasa, r)) {
    if (udzial < 1) continue;
    const [d, t] = klucz.split("/");
    (tematy[d] ??= []).push(t);
  }
  return { id: `${r.id}-przerobione`, nazwa: r.nazwa, opis: r.opis, tematy };
}

/** Postęp do egzaminu przed danym rozdziałem, od 0 do 1: przerobiona część tematów ważona liczbą zadań z arkuszy w temacie. */
export function postepDoEgzaminu(klasa, r) {
  const udzial = udzialTematow(klasa, r);
  let razem = 0;
  let za = 0;
  for (const d of DZIALY.filter((x) => x.egzamin === klasa.egzamin)) {
    for (const t of d.tematy) {
      razem += t.zadania.length;
      za += t.zadania.length * (udzial.get(`${d.id}/${t.id}`) ?? 0);
    }
  }
  return razem ? za / razem : 0;
}

/** Rozdział jako jeden dział: tematy (zadania z arkuszy), wzory i generatory z działów, do których prowadzi.
 *  dostep – co widzi uczeń: tematy(id działu) → lista id tematów albo null (cały dział), ma(id działu, rodzaj).
 *  karty – czy uczeń może drukować karty pracy z generatorów tego rozdziału (karty z generatora wymagają też generatora). */
export function dzialRozdzialu(klasa, r, dostep = { tematy: () => null, ma: () => true }) {
  const czesci = Object.entries(r.tematy).map(([id, wybrane]) => {
    const swoje = dostep.tematy(id);
    const d = przytnij(dzial(id), swoje ? wybrane.filter((t) => swoje.includes(t)) : wybrane);
    const ma = (rodzaj) => dostep.ma(id, rodzaj);
    return {
      d,
      tematy: ma("zadania") ? d.tematy : [],
      wzory: ["zadania", "generator", "karty"].some(ma) ? d.wzory : [],
      generatory: ma("generator") ? d.generatory : [],
      karty: ma("karty") && ma("generator"),
    };
  });
  const pierwszy = czesci[0]?.d;
  return {
    id: r.id,
    rozdzial: true,
    klasa,
    egzamin: klasa.egzamin,
    nazwa: r.nazwa,
    opis: r.opis,
    wzoryTytul: pierwszy?.wzoryTytul,
    wzoryOpis: pierwszy?.wzoryOpis,
    generatorOpis: pierwszy?.generatorOpis,
    tematy: czesci.flatMap((c) => c.tematy),
    wzory: czesci.flatMap((c) => c.wzory),
    generatory: czesci.flatMap((c) => c.generatory),
    karty: czesci.some((c) => c.karty && c.generatory.length),
    pdf: [],
  };
}

/** Zadania karty pracy – te same dla tego samego klucza (np. "karta/2" albo "losowa/123456"). */
export function zadaniaKarty(d, klucz) {
  return d.generatory.flatMap((g) =>
    Array.from({ length: KARTY.zadanNaGenerator }, (_, i) => ({
      temat: g.nazwa,
      ...g.generuj(losownik(ziarno(`${d.id}/${klucz}/${g.id}/${i}`))),
    })),
  );
}
