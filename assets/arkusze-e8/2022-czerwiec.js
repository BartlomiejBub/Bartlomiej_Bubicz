// Egzamin ósmoklasisty czerwiec 2022 (dodatkowy, CKE) – zadania zamknięte przepisane z arkusza, przypisane do działów egzaminu ósmoklasisty (pole dzial).
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const UZ = "**Uzupełnij poniższe zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";
const PF = "**Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.**";

export default {
  nazwa: "Egzamin ósmoklasisty czerwiec 2022 (dodatkowy)",
  zadania: [
    { nr: "2", dzial: "e8-wyrazenia", temat: "zadania-z-rownaniem",
      tresc: `Córka obecnie jest $4$ razy młodsza od swojej mamy. Razem mają $60$ lat.\n\n${UZ}`,
      czesci: [
        { tekst: "Mama obecnie ma … lat.", litery: "AB", opcje: ["$48$", "$45$"], poprawna: 0 },
        { tekst: "Córka za $8$ lat będzie miała ….", litery: "CD", opcje: ["$23$ lata", "$20$ lat"], poprawna: 1 },
      ] },
    { nr: "3", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: "Liczby: $x$, $\\left(-\\frac{5}{6}\\right)$, $y$, są uporządkowane rosnąco. Liczba $y$ jest o $0{,}5$ większa od $\\left(-\\frac{5}{6}\\right)$, a liczba $\\left(-\\frac{5}{6}\\right)$ jest o $0{,}5$ większa od liczby $x$.\n\n**Jakie wartości mają liczby** $x$ **i** $y$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$x = -\\frac{4}{3}$ i $y = -\\frac{1}{3}$", "$x = -\\frac{7}{6}$ i $y = -\\frac{1}{6}$", "$x = -\\frac{4}{3}$ i $y = -\\frac{1}{2}$", "$x = -\\frac{7}{6}$ i $y = -\\frac{1}{3}$"],
      poprawna: 0 },
    { nr: "4", dzial: "e8-wyrazenia", temat: "rownania",
      tresc: `${DOK}\n\nRozwiązaniem równania $-2(x - 1) - 3(2 - x) = 0$ jest liczba`,
      opcje: ["$-4$", "$-1{,}6$", "$0{,}8$", "$4$", "$8$"],
      poprawna: 3 },
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
    { nr: "11", dzial: "e8-wyrazenia", temat: "przeksztalcanie-wzorow",
      tresc: `Dany jest wzór na pole powierzchni całkowitej graniastosłupa:\n\n$P_c = 2P_p + P_b$\n\ngdzie: $P_c$ – pole powierzchni całkowitej, $P_p$ – pole podstawy, $P_b$ – pole powierzchni bocznej.\n\n${DOK}\n\nPole podstawy $P_p$ wyznaczone poprawnie z powyższego wzoru opisano równaniem`,
      opcje: ["$P_p = \\frac{P_c - P_b}{2}$", "$P_p = \\frac{P_c}{2} - P_b$", "$P_p = P_c - \\frac{P_b}{2}$", "$P_p = P_c - P_b$"],
      poprawna: 0 },
    { nr: "14", dzial: "e8-wyrazenia", temat: "rownania",
      tresc: "Na rysunku przedstawiono prostokąt. Długość dłuższego boku oznaczono symbolem $x$ oraz opisano za pomocą wyrażenia algebraicznego $27 - 2x$. Długość krótszego boku oznaczono symbolem $y$ oraz opisano za pomocą wyrażenia algebraicznego $2y - 3$.\n\n[rysunek]\n\n**Które równanie nie opisuje poprawnej zależności między wartościami** $x$ **i** $y$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$x - y = 6$", "$x + y = 12$", "$x \\cdot y = 27$", "$y : x = 3$"],
      poprawna: 3,
      rysunek: "assets/arkusze-e8/rys/2022-czerwiec-14.png" },
    { nr: "15", dzial: "e8-wyrazenia", temat: "wartosc-wyrazenia",
      tresc: UZ,
      czesci: [
        { tekst: "Wartość wyrażenia $2 - 2a^2$ dla $a = -3$ jest równa ….", litery: "AB", opcje: ["$-16$", "$20$"], poprawna: 0 },
        { tekst: "Wyrażenie $\\frac{1}{2}(2 - 2a^2)$ można przekształcić do postaci ….", litery: "CD", opcje: ["$1 - 2a^2$", "$1 - a^2$"], poprawna: 1 },
      ] },
  ],
};
