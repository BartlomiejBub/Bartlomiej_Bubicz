// Zadania do ćwiczeń – Zadania z treścią (LO): równania kwadratowe z treści.
// Ułożone dla strony. Format jak arkusz (tools/test-arkusze.mjs).
export default {
  nazwa: "Zadania do ćwiczeń – Zadania z treścią",
  zadania: [
    {
      nr: "1", dzial: "tekstowe", temat: "rownania-z-tresci",
      tresc: "Długość prostokąta jest o $2$ cm większa od jego szerokości, a pole prostokąta jest równe $48$ cm$^{2}$. Obwód tego prostokąta jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$24$ cm", "$32$ cm", "$28$ cm", "$56$ cm"],
      poprawna: 2,
    },
    {
      nr: "4", dzial: "tekstowe", temat: "ciagi-w-praktyce",
      tresc: "Kredyt w wysokości $6000$ zł spłacono w $6$ miesięcznych ratach malejących. Każda rata zawierała tę samą część kapitałową oraz odsetki w wysokości $2\\%$ długu pozostałego do spłaty przed wpłatą raty. Pierwsza rata była równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$1020$ zł", "$1100$ zł", "$1200$ zł", "$1120$ zł"],
      poprawna: 3,
    },
  ],
  otwarte: [
    {
      nr: "2", dzial: "tekstowe", temat: "rownania-z-tresci", punkty: 3,
      tresc: "Suma kwadratów dwóch kolejnych liczb naturalnych jest równa $181$. Wyznacz te liczby. **Zapisz obliczenia.**",
      rozwiazanie: "Niech $n$ oznacza mniejszą z liczb, wtedy kolejna to $n + 1$. Z treści: $n^{2} + (n + 1)^{2} = 181$.\n\nRozwijamy: $n^{2} + n^{2} + 2n + 1 = 181$, czyli $2n^{2} + 2n - 180 = 0$. Dzielimy przez $2$: $n^{2} + n - 90 = 0$.\n\nDelta: $1 + 360 = 361$, więc $n = \\frac{-1 - 19}{2} = -10$ lub $n = \\frac{-1 + 19}{2} = 9$.\n\nLiczba $-10$ nie jest naturalna, więc odrzucamy to rozwiązanie. Zostaje $n = 9$.\n\nSprawdzenie: $9^{2} + 10^{2} = 81 + 100 = 181$.\n\nOdpowiedź: Szukane liczby to $9$ i $10$.",
    },
    {
      nr: "3", dzial: "tekstowe", temat: "rownania-z-tresci", punkty: 3,
      tresc: "Mama jest o $24$ lata starsza od córki. Iloczyn wieku mamy i wieku córki jest równy $180$. Ile lat ma mama, a ile córka? **Zapisz obliczenia.**",
      rozwiazanie: "Niech $x$ oznacza wiek córki w latach. Wtedy mama ma $x + 24$ lata. Z treści: $x(x + 24) = 180$.\n\nPo wymnożeniu i przeniesieniu: $x^{2} + 24x - 180 = 0$.\n\nDelta: $576 + 720 = 1296$, więc $\\sqrt{\\Delta} = 36$. Stąd $x = \\frac{-24 - 36}{2} = -30$ lub $x = \\frac{-24 + 36}{2} = 6$.\n\nWiek nie może być ujemny, więc odrzucamy $x = -30$. Córka ma $6$ lat, a mama $6 + 24 = 30$ lat.\n\nSprawdzenie: $6 \\cdot 30 = 180$.\n\nOdpowiedź: Córka ma $6$ lat, a mama $30$ lat.",
    },
    {
      nr: "5", dzial: "tekstowe", temat: "ciagi-w-praktyce", punkty: 3,
      tresc: "Pan Adam wziął kredyt $24\\,000$ zł spłacany w $8$ miesięcznych ratach malejących. Każda rata zawiera stałą część kapitałową oraz odsetki w wysokości $1{,}5\\%$ długu pozostałego do spłaty przed wpłatą raty. Oblicz wysokość ostatniej raty oraz łączną sumę zapłaconych odsetek. **Zapisz obliczenia.**",
      rozwiazanie: "Część kapitałowa każdej raty: $C = \\frac{24\\,000}{8} = 3000$ zł.\n\nOdsetki w pierwszej racie: $O_{1} = 0{,}015 \\cdot 24\\,000 = 360$ zł. Przed ostatnią (ósmą) ratą pozostaje do spłaty tylko jedna część kapitałowa $3000$ zł, więc $O_{8} = 0{,}015 \\cdot 3000 = 45$ zł.\n\nOstatnia rata: $3000 + 45 = 3045$ zł.\n\nOdsetki w kolejnych ratach tworzą ciąg arytmetyczny (różnica $-0{,}015 \\cdot 3000 = -45$ zł), więc ich suma to $S_{8} = \\frac{360 + 45}{2} \\cdot 8 = 405 \\cdot 4 = 1620$ zł.\n\nOdpowiedź: Ostatnia rata wynosi $3045$ zł, a suma odsetek to $1620$ zł.",
    },
    {
      nr: "6", dzial: "tekstowe", temat: "ciagi-w-praktyce", punkty: 3,
      tresc: "Kredyt spłacano w ratach malejących: każda rata zawierała tę samą część kapitałową i odsetki w wysokości $1\\%$ długu pozostałego przed wpłatą raty. Pierwsza rata wyniosła $1320$ zł, a druga $1310$ zł. Oblicz, ile wynosiła część kapitałowa raty, jaką kwotę pożyczono i na ile rat rozłożono kredyt. **Zapisz obliczenia.**",
      rozwiazanie: "Rata składa się z części kapitałowej $C$ i odsetek. Przy każdej kolejnej racie dług maleje o $C$, więc odsetki maleją o $0{,}01 \\cdot C$. Różnica kolejnych rat to $1320 - 1310 = 10$ zł.\n\nStąd $0{,}01 \\cdot C = 10$, czyli $C = 1000$ zł.\n\nW pierwszej racie odsetki to $1320 - 1000 = 320$ zł i są one $1\\%$ całego kredytu $K$: $0{,}01 K = 320$, więc $K = 32\\,000$ zł.\n\nLiczba rat: $n = \\frac{K}{C} = \\frac{32\\,000}{1000} = 32$.\n\nSprawdzenie: ostatnia rata to $1000 + 0{,}01 \\cdot 1000 = 1010$ zł, a z ciągu arytmetycznego $1320 - 31 \\cdot 10 = 1010$ zł.\n\nOdpowiedź: Część kapitałowa to $1000$ zł, pożyczono $32\\,000$ zł, a kredyt rozłożono na $32$ raty.",
    },
  ],
};
