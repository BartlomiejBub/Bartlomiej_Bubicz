// Działy ćwiczeń: zadania z matur, generatory i karty pracy.
import { GENERATORY as LICZBY } from "./generatory/liczby.js";
import { GENERATORY as FUNKCJE } from "./generatory/funkcje.js";
import { losownik, ziarno } from "./generatory/wspolne.js";
import { ZADANIA_MATURALNE } from "./zadania-maturalne.js";

export const DZIALY = [
  {
    id: "liczby",
    nazwa: "Liczby i równania",
    opis: "Potęgi, pierwiastki, logarytmy, procenty, równania i nierówności.",
    zadania: ZADANIA_MATURALNE.liczby,
    generatory: LICZBY,
    pdf: [
      { nazwa: "Karta pracy: Liczby i równania", plik: "karty/liczby-i-rownania.pdf", opis: "17 zadań na 2 stronach + odpowiedzi" },
    ],
  },
  {
    id: "funkcje",
    nazwa: "Funkcje i ciągi",
    opis: "Funkcja liniowa i kwadratowa, ciąg arytmetyczny i geometryczny.",
    zadania: ZADANIA_MATURALNE.funkcje,
    generatory: FUNKCJE,
    pdf: [
      { nazwa: "Karta pracy: Funkcje i ciągi", plik: "karty/funkcje-i-ciagi.pdf", opis: "17 zadań na 2 stronach + odpowiedzi" },
    ],
  },
];

export const RODZAJE = [
  { id: "zadania", nazwa: "Zadania z matur", krotko: "Zadania" },
  { id: "generator", nazwa: "Generator zadań", krotko: "Generator" },
  { id: "karty", nazwa: "Karty pracy", krotko: "Karty" },
];

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
