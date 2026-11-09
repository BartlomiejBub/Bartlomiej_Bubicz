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
  ],
};
