// Egzamin ósmoklasisty styczeń 2026 (próbny, CKE) – zadania zamknięte z działu „Liczby i działania” przepisane z arkusza.
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";

export default {
  nazwa: "Egzamin ósmoklasisty styczeń 2026 (próbny)",
  zadania: [
    { nr: "2", dzial: "e8-liczby", temat: "potegi",
      tresc: `${DOK}\n\nWartość wyrażenia $4^3 - 8^2 : 2^4$ jest równa`,
      opcje: ["$0$", "$10$", "$56$", "$60$"],
      poprawna: 3 },
    { nr: "3", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: `Dane jest wyrażenie\n\n$\\left(0{,}75 \\cdot 8 + 8 \\cdot \\frac{1}{2}\\right) : (-2)$\n\n${DOK}\n\nWartość tego wyrażenia jest równa`,
      opcje: ["$-5$", "$-3{,}5$", "$3{,}5$", "$5$"],
      poprawna: 0 },
    { nr: "4", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: "Uczniowie trzech klas: 8A, 8B i 8C, zebrali łącznie $132{,}9$ kg makulatury. Uczniowie klas 8A i 8B zebrali łącznie $90{,}6$ kg makulatury, a uczniowie klas 8B i 8C zebrali łącznie $86{,}8$ kg.\n\n**Ile kilogramów makulatury zebrali uczniowie klasy 8B? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$43{,}4$", "$44{,}3$", "$44{,}5$", "$47{,}2$"],
      poprawna: 2 },
    { nr: "7", dzial: "e8-liczby", temat: "potegi",
      tresc: "Dane są trzy liczby: $x = 5{,}27 \\cdot 10^{-3}$, $y = 0{,}0023$, $z = 1400 \\cdot 10^{-5}$. Uporządkowano te liczby w kolejności od najmniejszej do największej.\n\n**Który zapis przedstawia poprawny sposób uporządkowania liczb** $x$, $y$, $z$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$x < y < z$", "$y < x < z$", "$z < y < x$", "$x < z < y$"],
      poprawna: 1 },
    { nr: "8", dzial: "e8-liczby", temat: "os-liczbowa",
      tresc: "Na osi liczbowej zaznaczono punkty $K$, $L$ i $M$. Odcinek $KM$ jest podzielony na $10$ równych części (zobacz rysunek).\n\n[rysunek]\n\nZ liczb, które są współrzędnymi punktów $K$, $L$ i $M$, utworzono sumy:\n\nI. $K + L + M$  II. $K + L$  III. $K + M$  IV. $L + M$\n\n**Która z utworzonych sum jest liczbą podzielną przez** $9$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["I", "II", "III", "IV"],
      poprawna: 3,
      rysunek: "assets/arkusze-e8/rys/2026-styczen-probny-8.png" },
  ],
};
