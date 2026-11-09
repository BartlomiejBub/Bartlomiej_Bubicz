// Zadania do ćwiczeń – Dane (szkoła podstawowa): mediana i dominanta, tabela liczności, wykresy. Ułożone dla strony.
// Format jak arkusz (opis w tools/test-arkusze.mjs).
export default {
  nazwa: "Zadania do ćwiczeń – Dane i wykresy",
  zadania: [
    // ---- mediana i dominanta ----
    {
      nr: "1", dzial: "e8-dane", temat: "mediana-dominanta",
      tresc: "Siedmioro uczniów zapisało, ile minut idzie do szkoły: $5, 2, 2, 8, 2, 6, 7$. Dominanta tych danych jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$8$", "$5$", "$6$", "$2$"],
      poprawna: 3,
    },
    {
      nr: "2", dzial: "e8-dane", temat: "mediana-dominanta",
      tresc: "Sześć wyników w skoku w dal (w dm): $12, 7, 9, 16, 10, 13$. Mediana tych wyników jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$10$", "$11{,}5$", "$11$", "$12$"],
      poprawna: 2,
    },
    {
      nr: "3", dzial: "e8-dane", temat: "mediana-dominanta",
      tresc: "W klasie zapytano $20$ uczniów, ile mają rodzeństwa. Wyniki: brak rodzeństwa – $8$ osób, jedno – $5$ osób, dwoje – $4$ osoby, troje – $3$ osoby. Mediana liczby rodzeństwa jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$0$", "$1$", "$1{,}5$", "$2$"],
      poprawna: 1,
    },
    // ---- tabele, diagramy i wykresy: mylący wykres ----
    {
      nr: "4", dzial: "e8-dane", temat: "odczytywanie-danych",
      tresc: "Na diagramie słupkowym oś pionowa zaczyna się od $40$, a jedna kratka to $5$ uczniów. Licząc od początku osi, słupek klasy A ma wysokość $2$ kratek, a słupek klasy B – $6$ kratek. Słupek B wygląda więc na $3$ razy wyższy od słupka A. Rzeczywista liczba uczniów w klasie B jest od liczby uczniów w klasie A. **Wybierz właściwą odpowiedź.**",
      opcje: ["$3$ razy większa", "$20$ razy większa", "$1{,}4$ raza większa", "taka sama"],
      poprawna: 2,
    },
  ],
  otwarte: [
    // ---- mediana i dominanta ----
    {
      nr: "5", dzial: "e8-dane", temat: "mediana-dominanta", punkty: 2,
      tresc: "Pięcioro biegaczy przebiegło dystans w czasach (w sekundach): $14, 9, 12, 30, 10$. Oblicz średnią i medianę tych czasów. Która z tych liczb lepiej opisuje typowy wynik? **Zapisz obliczenia.**",
      rozwiazanie: "Średnia: $(14 + 9 + 12 + 30 + 10) : 5 = 75 : 5 = 15$ s.\n\nMedianę znajdę po uporządkowaniu danych: $9, 10, 12, 14, 30$. Pośrodku jest trzecia liczba, więc mediana to $12$ s.\n\nCzas $30$ s jest dużo większy od pozostałych i podciąga średnią w górę. Czterech z pięciu biegaczy miało wynik niższy niż średnia ($15$ s), więc średnia nie jest typowa.\n\nOdpowiedź: Średnia to $15$ s, mediana to $12$ s. Typowy wynik lepiej opisuje mediana.",
    },
    {
      nr: "6", dzial: "e8-dane", temat: "mediana-dominanta", punkty: 3,
      tresc: "W tabeli podano rozmiary butów $20$ uczniów: rozmiar $36$ – $6$ osób, $37$ – $5$ osób, $38$ – $4$ osoby, $39$ – $3$ osoby, $40$ – $2$ osoby. Podaj dominantę i medianę rozmiaru buta. **Zapisz obliczenia.**",
      rozwiazanie: "Dominanta to wartość występująca najczęściej: rozmiar $36$ (aż $6$ osób).\n\nUczniów jest $6 + 5 + 4 + 3 + 2 = 20$, czyli parzyście wiele, więc mediana to średnia dziesiątej i jedenastej danej po uporządkowaniu.\n\nRozmiar $36$ zajmuje miejsca $1$–$6$, rozmiar $37$ – miejsca $7$–$11$.\n\nDziesiąta i jedenasta dana to obie $37$, więc mediana to $(37 + 37) : 2 = 37$.\n\nOdpowiedź: Dominanta to $36$, a mediana to $37$.",
    },
    {
      nr: "7", dzial: "e8-dane", temat: "mediana-dominanta", punkty: 2,
      tresc: "Ania ma pięć ocen: $2, 3, 3, 4, 5$. Dostała jeszcze jedną ocenę – piątkę. Podaj medianę nowego zestawu sześciu ocen i wszystkie dominanty. **Zapisz obliczenia.**",
      rozwiazanie: "Nowy zestaw po uporządkowaniu: $2, 3, 3, 4, 5, 5$.\n\nDanych jest $6$, więc mediana to średnia trzeciej i czwartej: $(3 + 4) : 2 = 3{,}5$.\n\nTrójka występuje dwa razy i piątka też dwa razy, a pozostałe oceny po jednym razie, więc są dwie dominanty.\n\nOdpowiedź: Mediana to $3{,}5$, dominanty to $3$ i $5$.",
    },
    // ---- tabele, diagramy i wykresy: zliczanie i diagram ----
    {
      nr: "8", dzial: "e8-dane", temat: "odczytywanie-danych", punkty: 3,
      tresc: "Oceny z kartkówki w pewnej grupie $20$ uczniów: $3$, $4$, $4$, $5$, $3$, $2$, $4$, $3$, $4$, $5$, $3$, $4$, $2$, $4$, $3$, $5$, $4$, $3$, $4$, $3$. Zliczając kreskami, sporządź tabelę liczności ocen i opisz, jakiej wysokości byłyby słupki diagramu. Jaki procent uczniów dostał co najmniej czwórkę? **Zapisz obliczenia.**",
      rozwiazanie: "Zliczam oceny po kolei i przekreślam przeliczone dane. Wychodzi: ocena $2$ – $2$ razy, ocena $3$ – $7$ razy, ocena $4$ – $8$ razy, ocena $5$ – $3$ razy.\n\nSprawdzenie: $2 + 7 + 8 + 3 = 20$, czyli tyle, ile było danych.\n\nDiagram: cztery słupki o wysokościach $2$, $7$, $8$ i $3$ nad ocenami $2$, $3$, $4$, $5$, a oś pionowa zaczyna się od zera.\n\nCo najmniej czwórkę dostało $8 + 3 = 11$ uczniów, a $11 : 20 = 0{,}55 = 55\\%$.\n\nOdpowiedź: Liczności to $2, 7, 8, 3$ (słupki o takich wysokościach). Co najmniej czwórkę dostało $55\\%$ uczniów.",
    },
  ],
};
