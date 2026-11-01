// Egzamin ósmoklasisty czerwiec 2022 (dodatkowy, CKE) – zadania zamknięte przepisane z arkusza, przypisane do działów egzaminu ósmoklasisty (pole dzial).
const PF = "**Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.**";

export default {
  nazwa: "Egzamin ósmoklasisty czerwiec 2022 (dodatkowy)",
  zadania: [
    { nr: "3", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: "Liczby: $x$, $\\left(-\\frac{5}{6}\\right)$, $y$, są uporządkowane rosnąco. Liczba $y$ jest o $0{,}5$ większa od $\\left(-\\frac{5}{6}\\right)$, a liczba $\\left(-\\frac{5}{6}\\right)$ jest o $0{,}5$ większa od liczby $x$.\n\n**Jakie wartości mają liczby** $x$ **i** $y$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$x = -\\frac{4}{3}$ i $y = -\\frac{1}{3}$", "$x = -\\frac{7}{6}$ i $y = -\\frac{1}{6}$", "$x = -\\frac{4}{3}$ i $y = -\\frac{1}{2}$", "$x = -\\frac{7}{6}$ i $y = -\\frac{1}{3}$"],
      poprawna: 0 },
    { nr: "6", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: "Dane są trzy liczby:\n\n$g = \\sqrt{120}$\n\n$h = 8 + \\sqrt{17}$\n\n$k = 9 + \\sqrt{3}$\n\n**Które spośród tych liczb są mniejsze od liczby** $11$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["Tylko $g$.", "Tylko $h$ i $k$.", "Tylko $g$ i $k$.", "Tylko $g$ i $h$."],
      poprawna: 2 },
    { nr: "7", dzial: "e8-liczby", temat: "dzielniki",
      tresc: `Liczbę $404$ można zapisać w postaci $(21 \\cdot 19 + 5)$.\n\n${PF}`,
      czesci: [
        { tekst: "Resztą z dzielenia liczby $404$ przez $19$ jest $5$.", litery: "PF", poprawna: 0 },
        { tekst: "Jeśli liczbę $404$ zmniejszymy o $5$, to otrzymamy liczbę podzielną przez $21$.", litery: "PF", poprawna: 0 },
      ] },
    { nr: "8", dzial: "e8-liczby", temat: "dzielniki",
      tresc: "Na tablicy zapisano wszystkie różne liczby dwucyfrowe, które jednocześnie spełniają trzy warunki: są mniejsze od $40$, są podzielne przez $3$, suma cyfr każdej z nich jest większa od $7$.\n\n**Ile liczb zapisano na tablicy? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$3$", "$4$", "$5$", "$6$"],
      poprawna: 1 },
    { nr: "10", dzial: "e8-liczby", temat: "potegi",
      tresc: "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**\n\nLiczba $3^5 \\cdot 9^6$ jest równa",
      opcje: ["$27^{30}$", "$27^{11}$", "$3^{17}$", "$3^{13}$"],
      poprawna: 2 },
  ],
};
