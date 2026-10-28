// Zadania z prawdziwych matur CKE (poziom podstawowy, formuła 2023), pogrupowane po działach.
// Link otwiera arkusz na arkusze.pl od razu na stronie z zadaniem (#page=…).
// odpowiedz: z oficjalnych zasad oceniania CKE, dla arkusza w wersji A (taki jest na arkusze.pl).
//
// Nowe zadanie: dopisz obiekt do listy działu. plik = nazwa PDF-a z arkusze.pl/maturalne/ bez ".pdf",
// strona = numer strony w tym PDF-ie.

export const ZADANIA_MATURALNE = {
  liczby: [
    {
      temat: "Potęgi", termin: "Maj 2024", nr: "2", punkty: 1, strona: 4,
      plik: "matematyka-2024-maj-matura-podstawowa",
      opis: "Iloczyn potęg o podstawach $\\frac{1}{16}$ i $8$ zapisz jako jedną potęgę liczby $2$.",
      odpowiedz: "B, czyli $2^{16}$",
    },
    {
      temat: "Pierwiastki", termin: "Maj 2025", nr: "1", punkty: 1, strona: 4,
      plik: "matematyka-2025-maj-matura-podstawowa",
      opis: "Oblicz kwadrat różnicy dwóch pierwiastków kwadratowych. Zacznij od wyłączenia czynnika przed znak pierwiastka.",
      odpowiedz: "B, czyli $18$",
    },
    {
      temat: "Logarytmy", termin: "Maj 2023", nr: "4", punkty: 1, strona: 6,
      plik: "matematyka-2023-maj-matura-podstawowa",
      opis: "Oblicz sumę dwóch logarytmów o podstawie $9$.",
      odpowiedz: "D, czyli $2$",
    },
    {
      temat: "Procenty", termin: "Maj 2026", nr: "2", punkty: 1, strona: 4,
      plik: "matematyka-2026-maj-matura-podstawowa",
      opis: "Lokata dwuletnia oprocentowana zgodnie z procentem składanym – oblicz, ile łącznie wyniosą doliczone odsetki.",
      odpowiedz: "B, czyli $1236$ zł",
    },
    {
      temat: "Nierówność kwadratowa", termin: "Maj 2025", nr: "10", punkty: 2, strona: 10,
      plik: "matematyka-2025-maj-matura-podstawowa",
      opis: "Rozwiąż nierówność kwadratową: przenieś wszystko na jedną stronę, wyznacz pierwiastki trójmianu i odczytaj zbiór rozwiązań.",
      odpowiedz: "$x \\in \\left(\\frac{1}{3}, \\frac{3}{2}\\right)$",
    },
  ],
  funkcje: [
    {
      temat: "Funkcja liniowa", termin: "Maj 2024", nr: "13", punkty: 1, strona: 12,
      plik: "matematyka-2024-maj-matura-podstawowa",
      opis: "Dwie funkcje liniowe mają to samo miejsce zerowe. Wyznacz brakujący współczynnik we wzorze drugiej funkcji.",
      odpowiedz: "D, czyli $\\frac{7}{2}$",
    },
    {
      temat: "Odczytywanie z wykresu", termin: "Maj 2023", nr: "12.1–12.3", punkty: 3, strona: 12,
      plik: "matematyka-2023-maj-matura-podstawowa",
      opis: "Z wykresu funkcji odczytaj jej dziedzinę, największą wartość w podanym przedziale i zbiór, w którym funkcja jest malejąca.",
      odpowiedz: "12.1: A, czyli $[-6, 5]$; 12.2: C, czyli $2$; 12.3: D, czyli $[2, 5]$",
    },
    {
      temat: "Postać kanoniczna", termin: "Maj 2025", nr: "12.1", punkty: 2, strona: 12,
      plik: "matematyka-2025-maj-matura-podstawowa",
      opis: "Znając wierzchołek paraboli i punkt jej przecięcia z osią $Oy$, zapisz wzór funkcji kwadratowej w postaci kanonicznej.",
      odpowiedz: "$f(x) = -\\frac{1}{3}(x - 3)^2 + 6$",
    },
    {
      temat: "Ciąg arytmetyczny", termin: "Maj 2024", nr: "17", punkty: 2, strona: 17,
      plik: "matematyka-2024-maj-matura-podstawowa",
      opis: "Znasz trzeci wyraz ciągu arytmetycznego i sumę jego piętnastu początkowych wyrazów. Oblicz różnicę ciągu.",
      odpowiedz: "$r = -2$",
    },
    {
      temat: "Ciąg geometryczny", termin: "Maj 2026", nr: "17", punkty: 1, strona: 19,
      plik: "matematyka-2026-maj-matura-podstawowa",
      opis: "Znasz iloczyn trzeciego i szóstego wyrazu ciągu geometrycznego. Wyznacz iloczyn drugiego i siódmego wyrazu.",
      odpowiedz: "$18$",
    },
  ],
};

export const linkDoZadania = (z) => `https://arkusze.pl/maturalne/${z.plik}.pdf#page=${z.strona}`;
