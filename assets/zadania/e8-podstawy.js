// Zadania do ćwiczeń – Podstawy: działania i ułamki (szkoła podstawowa): rachunki pamięciowe i zadania tekstowe na działaniach.
// Ułożone dla strony. Format jak arkusz (opis w tools/test-arkusze.mjs).
export default {
  nazwa: "Zadania do ćwiczeń – Podstawy: działania",
  zadania: [
    // ---- rachunki pamięciowe ----
    {
      nr: "1", dzial: "e8-podstawy", temat: "rachunki-pamieciowe",
      tresc: "Wynik działania $6 \\cdot 48$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$248$", "$268$", "$288$", "$2448$"],
      poprawna: 2,
    },
    {
      nr: "2", dzial: "e8-podstawy", temat: "rachunki-pamieciowe",
      tresc: "Które działanie daje taki sam wynik jak $7 \\cdot 24$? **Wybierz właściwą odpowiedź.**",
      opcje: ["$7 \\cdot 20 + 4$", "$7 \\cdot 20 + 7 \\cdot 4$", "$7 \\cdot 2 + 7 \\cdot 4$", "$7 + 20 + 7 + 4$"],
      poprawna: 1,
    },
    {
      nr: "3", dzial: "e8-podstawy", temat: "rachunki-pamieciowe",
      tresc: "Wynik działania $45 : 0{,}1$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$4{,}5$", "$0{,}45$", "$4500$", "$450$"],
      poprawna: 3,
    },
    // ---- zadania tekstowe na działaniach ----
    {
      nr: "4", dzial: "e8-podstawy", temat: "zadania-tekstowe-dzialania",
      tresc: "Ola ma $15$ lat, a jej brat ma $5$ lat. Ola jest od brata starsza. **Wybierz właściwą odpowiedź.**",
      opcje: ["o $10$ lat i $3$ razy", "o $3$ lata i $10$ razy", "o $10$ lat i $10$ razy", "o $20$ lat i $3$ razy"],
      poprawna: 0,
    },
    {
      nr: "5", dzial: "e8-podstawy", temat: "zadania-tekstowe-dzialania",
      tresc: "Bilet normalny do kina kosztuje $18$ zł, a ulgowy jest o $6$ zł tańszy. Za $2$ bilety normalne i $3$ ulgowe zapłacimy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$54$ zł", "$90$ zł", "$72$ zł", "$60$ zł"],
      poprawna: 2,
    },
    {
      nr: "6", dzial: "e8-podstawy", temat: "zadania-tekstowe-dzialania",
      tresc: "Pomyślałem liczbę, dodałem do niej $8$, a wynik pomnożyłem przez $3$. Otrzymałem $45$. Pomyślana liczba to. **Wybierz właściwą odpowiedź.**",
      opcje: ["$15$", "$23$", "$37$", "$7$"],
      poprawna: 3,
    },
  ],
  otwarte: [
    // ---- rachunki pamięciowe ----
    {
      nr: "7", dzial: "e8-podstawy", temat: "rachunki-pamieciowe", punkty: 2,
      tresc: "Oblicz w pamięci, wybierając sprytny sposób (para łatwych czynników, liczba prawie okrągła, rozkład na kawałki): a) $25 \\cdot 13 \\cdot 4$, b) $6 \\cdot 99$, c) $304 : 4$. **Zapisz obliczenia.**",
      rozwiazanie: "a) Przestawiam czynniki i łączę parę, która daje okrągłą liczbę: $25 \\cdot 13 \\cdot 4 = (25 \\cdot 4) \\cdot 13 = 100 \\cdot 13 = 1300$.\n\nb) $99$ to prawie $100$: $6 \\cdot 99 = 6 \\cdot 100 - 6 \\cdot 1 = 600 - 6 = 594$.\n\nc) Rozkładam dzielną: $304 = 300 + 4$. Wtedy $300 : 4 = 75$ i $4 : 4 = 1$, razem $75 + 1 = 76$.\n\nSprawdzenie: $76 \\cdot 4 = 304$.\n\nOdpowiedź: a) $1300$, b) $594$, c) $76$.",
    },
    {
      nr: "8", dzial: "e8-podstawy", temat: "rachunki-pamieciowe", punkty: 2,
      tresc: "Kasia kupiła $7$ jednakowych kubków po $29$ zł. Oblicz w pamięci, ile zapłaciła, i opisz, jak liczysz. **Zapisz obliczenia.**",
      rozwiazanie: "$29$ zł to prawie $30$ zł, więc liczę z okrągłą liczbą i poprawiam wynik.\n\n$7 \\cdot 30 = 210$ zł.\n\nKażdy kubek kosztuje o $1$ zł mniej niż $30$ zł, więc za $7$ kubków zapłaciła o $7 \\cdot 1 = 7$ zł mniej: $210 - 7 = 203$ zł.\n\nSprawdzenie po kawałku: $7 \\cdot 20 + 7 \\cdot 9 = 140 + 63 = 203$.\n\nOdpowiedź: Kasia zapłaciła $203$ zł.",
    },
    {
      nr: "9", dzial: "e8-podstawy", temat: "rachunki-pamieciowe", punkty: 2,
      tresc: "Sześcioro dzieci podzieliło po równo pieniądze ze skarbonki: było w niej $372$ zł. Ile złotych dostało każde dziecko? Podziel w pamięci, rozkładając $372$ na łatwe kawałki. **Zapisz obliczenia.**",
      rozwiazanie: "Rozkładam $372 = 360 + 12$, bo oba kawałki dzielą się przez $6$.\n\n$360 : 6 = 60$ i $12 : 6 = 2$.\n\nRazem: $60 + 2 = 62$.\n\nSprawdzenie: $62 \\cdot 6 = 360 + 12 = 372$.\n\nOdpowiedź: Każde dziecko dostało $62$ zł.",
    },
    // ---- zadania tekstowe na działaniach ----
    {
      nr: "10", dzial: "e8-podstawy", temat: "zadania-tekstowe-dzialania", punkty: 2,
      tresc: "Dwie paczki ważą razem $14$ kg. Pierwsza paczka jest o $4$ kg cięższa od drugiej. Ile kilogramów waży każda paczka? **Zapisz obliczenia.**",
      rozwiazanie: "Rysunek: dwa odcinki, pierwszy dłuższy o $4$ kg od drugiego.\n\nGdy odejmę ten nadmiar od całości, zostaną dwie równe części: $14 - 4 = 10$ kg.\n\nJedna część to $10 : 2 = 5$ kg – tyle waży druga paczka.\n\nPierwsza paczka waży $5 + 4 = 9$ kg.\n\nSprawdzenie: $9 + 5 = 14$ i $9 - 5 = 4$.\n\nOdpowiedź: Pierwsza paczka waży $9$ kg, a druga $5$ kg.",
    },
    {
      nr: "11", dzial: "e8-podstawy", temat: "zadania-tekstowe-dzialania", punkty: 2,
      tresc: "Tomek wydał połowę swoich pieniędzy na bilet, a potem $6$ zł na lody. Zostało mu $9$ zł. Ile złotych miał Tomek na początku? **Zapisz obliczenia.**",
      rozwiazanie: "Rozwiązuję zadanie od końca i cofam działania w odwrotnej kolejności.\n\nPo kupieniu lodów zostało $9$ zł, więc przed lodami było $9 + 6 = 15$ zł.\n\nTe $15$ zł to połowa pieniędzy (druga połowa poszła na bilet), więc na początku było $15 \\cdot 2 = 30$ zł.\n\nSprawdzenie: połowa z $30$ to $15$, $30 - 15 = 15$, $15 - 6 = 9$.\n\nOdpowiedź: Tomek miał na początku $30$ zł.",
    },
    {
      nr: "12", dzial: "e8-podstawy", temat: "zadania-tekstowe-dzialania", punkty: 3,
      tresc: "W klasach IV–VI jest razem $252$ uczniów. W klasach IV uczy się $84$ uczniów, a w klasach V o $12$ uczniów więcej niż w klasach IV. Pozostali uczniowie chodzą do klas VI. Ile uczniów jest w klasach VI i o ile uczniów jest ich mniej niż w klasach V? **Zapisz obliczenia.**",
      rozwiazanie: "Dane: razem $252$, klasy IV – $84$, klasy V – o $12$ więcej niż w IV.\n\nW klasach V jest $84 + 12 = 96$ uczniów.\n\nW klasach IV i V razem jest $84 + 96 = 180$ uczniów.\n\nW klasach VI jest $252 - 180 = 72$ uczniów.\n\nO ile mniej niż w V: $96 - 72 = 24$.\n\nOdpowiedź: W klasach VI jest $72$ uczniów, czyli o $24$ mniej niż w klasach V.",
    },
  ],
};
