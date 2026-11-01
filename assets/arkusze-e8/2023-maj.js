// Egzamin ósmoklasisty maj 2023 (CKE, wersja X) – zadania zamknięte przepisane z arkusza, przypisane do działów egzaminu ósmoklasisty (pole dzial).
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const UZ = "**Uzupełnij poniższe zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";
const PF = "**Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.**";

export default {
  nazwa: "Egzamin ósmoklasisty maj 2023",
  zadania: [
    { nr: "1", dzial: "e8-wyrazenia", temat: "proporcje",
      tresc: `Poniżej przedstawiono składniki potrzebne do przygotowania ciasta na $8$ gofrów.\n\n[rysunek]\n\n${PF}`,
      czesci: [
        { tekst: "Do przygotowania ciasta na $40$ gofrów, przy zachowaniu właściwych proporcji odpowiednich składników, potrzeba $10$ jajek.", litery: "PF", poprawna: 0 },
        { tekst: "Do przygotowania ciasta na $72$ gofry, przy zachowaniu właściwych proporcji odpowiednich składników, potrzeba $12$ szklanek mleka.", litery: "PF", poprawna: 0 },
      ],
      rysunek: "assets/arkusze-e8/rys/2023-maj-1.png" },
    { nr: "2", dzial: "e8-liczby", temat: "dzielniki",
      tresc: "Dostęp do pliku jest chroniony hasłem $\\ast\\ast\\mathrm{T}\\ast\\ast$ złożonym z dwóch liczb dwucyfrowych oddzielonych literą T. Pierwsza liczba hasła to sześcian liczby $4$, a druga to najmniejszy wspólny mianownik ułamków $\\frac{1}{15}$ i $\\frac{1}{25}$.\n\n**Jakie jest hasło do pliku? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["24T45", "24T75", "64T45", "64T75"],
      poprawna: 3 },
    { nr: "3", dzial: "e8-wyrazenia", temat: "wartosc-wyrazenia",
      tresc: "Dane są cztery wyrażenia:\n\n$G = 2x^2 + 2$\n\n$H = 2x^2 + 2x$\n\n$J = 2x^2 - 2$\n\n$K = 2x^2 - 2x$\n\nJedno z tych wyrażeń przyjmuje wartość $0$ dla $x = 1$ oraz dla $x = -1$.\n\n**Które to wyrażenie? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$G$", "$H$", "$J$", "$K$"],
      poprawna: 2 },
    { nr: "5", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: UZ,
      czesci: [
        { tekst: "Wyrażenie $\\sqrt{81} - \\sqrt{49}$ jest równe …", litery: "AB", opcje: ["$2$", "$\\sqrt{32}$"], poprawna: 0 },
        { tekst: "Wyrażenie $\\sqrt{144} + \\sqrt{25}$ jest równe …", litery: "CD", opcje: ["$13$", "$17$"], poprawna: 1 },
      ] },
    { nr: "6", dzial: "e8-wyrazenia", temat: "zadania-z-rownaniem",
      tresc: "W sadzie rosną drzewa owocowe: grusze i jabłonie. Liczba grusz jest o $40\\%$ większa od liczby jabłoni. Jabłoni jest o $50$ mniej niż grusz.\n\n**Ile jabłoni rośnie w tym sadzie? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$20$", "$30$", "$70$", "$125$"],
      poprawna: 3 },
    { nr: "7", dzial: "e8-liczby", temat: "potegi",
      tresc: UZ,
      czesci: [
        { tekst: "Iloraz $\\frac{10^8}{5^8}$ jest równy …", litery: "AB", opcje: ["$5^8$", "$2^8$"], poprawna: 1 },
        { tekst: "Iloczyn $2^6 \\cdot 25^3$ jest równy …", litery: "CD", opcje: ["$50^9$", "$10^6$"], poprawna: 1 },
      ] },
    { nr: "8", dzial: "e8-wyrazenia", temat: "zapisywanie-wyrazen",
      tresc: "Liczbę $x$ powiększono o $7$, a następnie otrzymany wynik zwiększono $4$-krotnie. Liczbę $y$ zwiększono $5$-krotnie, a otrzymany wynik powiększono o $3$.\n\n**Która para wyrażeń algebraicznych poprawnie opisuje wykonane działania? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$4(x + 7)$ oraz $5y + 3$", "$4x + 7$ oraz $5y + 3$", "$4(x + 7)$ oraz $5(y + 3)$", "$4x + 7$ oraz $5(y + 3)$"],
      poprawna: 0 },
    { nr: "10", dzial: "e8-procenty", temat: "skala",
      tresc: `Na planie miasta odległość w linii prostej od punktu oznaczającego przystanek autobusowy Dworzec do punktu oznaczającego przystanek autobusowy Galeria jest równa $8$ cm. Plan miasta został wykonany w skali $1 : 4\\,000$.\n\n[rysunek]\n\n${DOK}\n\nOdległość w linii prostej w terenie między tymi przystankami jest równa`,
      opcje: ["$320$ m", "$500$ m", "$3\\,200$ m", "$5\\,000$ m"],
      poprawna: 0,
      rysunek: "assets/arkusze-e8/rys/2023-maj-10.png" },
  ],
};
