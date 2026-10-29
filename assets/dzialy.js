// Działy ćwiczeń: zadania z matur (posortowane po tematach), generatory i karty pracy.
import { GENERATORY as LICZBY } from "./generatory/liczby.js";
import { GENERATORY as FUNKCJE } from "./generatory/funkcje.js";
import { GENERATORY as GEOMETRIA } from "./generatory/geometria.js";
import { GENERATORY as STATYSTYKA } from "./generatory/statystyka.js";
import { GENERATORY as DOWODY } from "./generatory/dowody.js";
import { losownik, ziarno } from "./generatory/wspolne.js";
import { ARKUSZE } from "./arkusze/index.js";
import { TEMATY } from "./arkusze/tematy.js";
import { WZORY as WZORY_LICZBY } from "./wzory/liczby.js";
import { WZORY as WZORY_FUNKCJE } from "./wzory/funkcje.js";
import { WZORY as WZORY_GEOMETRIA } from "./wzory/geometria.js";
import { WZORY as WZORY_STATYSTYKA } from "./wzory/statystyka.js";
import { WZORY as WZORY_DOWODY } from "./wzory/dowody.js";

/** Zadania z arkuszy w danym temacie, od najnowszych arkuszy, z podpisem źródła. */
function zadaniaTematu(dzial, temat) {
  return ARKUSZE.flatMap((a) =>
    a.zadania
      .filter((z) => z.dzial === dzial && z.temat === temat)
      .map((z) => ({ ...z, zrodlo: `${a.nazwa}, zadanie ${z.nr}` })),
  );
}

const tematy = (dzial) => TEMATY[dzial].map((t) => ({ ...t, zadania: zadaniaTematu(dzial, t.id) }));

export const DZIALY = [
  {
    id: "liczby",
    nazwa: "Liczby i równania",
    opis: "Potęgi, pierwiastki, logarytmy, procenty, wyrażenia algebraiczne, równania i nierówności.",
    tematy: tematy("liczby"),
    wzory: WZORY_LICZBY,
    generatory: LICZBY,
    pdf: [
      { nazwa: "Karta pracy: Liczby i równania", plik: "karty/liczby-i-rownania.pdf", opis: "17 zadań na 2 stronach + odpowiedzi" },
    ],
  },
  {
    id: "funkcje",
    nazwa: "Funkcje i ciągi",
    opis: "Własności funkcji, funkcja liniowa i kwadratowa, ciągi arytmetyczne i geometryczne.",
    tematy: tematy("funkcje"),
    wzory: WZORY_FUNKCJE,
    generatory: FUNKCJE,
    pdf: [
      { nazwa: "Karta pracy: Funkcje i ciągi", plik: "karty/funkcje-i-ciagi.pdf", opis: "17 zadań na 2 stronach + odpowiedzi" },
    ],
  },
  {
    id: "geometria",
    nazwa: "Geometria",
    opis: "Trygonometria, planimetria, geometria analityczna i stereometria.",
    tematy: tematy("geometria"),
    wzory: WZORY_GEOMETRIA,
    generatory: GEOMETRIA,
    pdf: [
      { nazwa: "Karta pracy: Geometria", plik: "karty/geometria.pdf", opis: "17 zadań na 2 stronach + odpowiedzi" },
    ],
  },
  {
    id: "statystyka",
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
    nazwa: "Dowody i optymalizacja",
    opis: "Zadania otwarte: dowody algebraiczne i geometryczne oraz zadania na największą i najmniejszą wartość.",
    tematy: tematy("dowody"),
    wzory: WZORY_DOWODY,
    generatory: DOWODY,
    pdf: [
      { nazwa: "Karta pracy: Dowody i optymalizacja", plik: "karty/dowody-i-optymalizacja.pdf", opis: "12 zadań na 2 stronach + rozwiązania" },
    ],
  },
];

export const RODZAJE = [
  { id: "zadania", nazwa: "Zadania z matur", krotko: "Zadania" },
  { id: "generator", nazwa: "Generator zadań", krotko: "Generator" },
  { id: "karty", nazwa: "Karty pracy", krotko: "Karty" },
];

/** Czy dział ma jakieś materiały danego rodzaju (np. nowy dział może nie mieć jeszcze generatorów). */
export function maMaterialy(d, rodzaj) {
  if (rodzaj === "zadania") return d.tematy.some((t) => t.zadania.length);
  if (rodzaj === "generator") return d.generatory.length > 0;
  return d.pdf.length > 0 || d.generatory.length > 0;
}

/** Karty z generatora: ile stałych kart (1, 2, …) ma każdy dział i ile zadań z każdego generatora trafia na kartę.
 *  Gotowe karty w PDF (pole pdf działu) robi skrypt tools/zrob-karty.mjs. */
export const KARTY = { ile: 3, zadanNaGenerator: 2 };

export const dzial = (id) => DZIALY.find((d) => d.id === id) ?? null;

/** Zadania karty pracy – te same dla tego samego klucza (np. "karta/2" albo "losowa/123456"). */
export function zadaniaKarty(d, klucz) {
  return d.generatory.flatMap((g) =>
    Array.from({ length: KARTY.zadanNaGenerator }, (_, i) => ({
      temat: g.nazwa,
      ...g.generuj(losownik(ziarno(`${d.id}/${klucz}/${g.id}/${i}`))),
    })),
  );
}
