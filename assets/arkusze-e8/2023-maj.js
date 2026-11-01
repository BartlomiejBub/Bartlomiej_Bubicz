// Egzamin ósmoklasisty maj 2023 (CKE, wersja X) – zadania zamknięte z działu „Liczby i działania” przepisane z arkusza.
const UZ = "**Uzupełnij poniższe zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";

export default {
  nazwa: "Egzamin ósmoklasisty maj 2023",
  zadania: [
    { nr: "2", dzial: "e8-liczby", temat: "dzielniki",
      tresc: "Dostęp do pliku jest chroniony hasłem $\\ast\\ast\\mathrm{T}\\ast\\ast$ złożonym z dwóch liczb dwucyfrowych oddzielonych literą T. Pierwsza liczba hasła to sześcian liczby $4$, a druga to najmniejszy wspólny mianownik ułamków $\\frac{1}{15}$ i $\\frac{1}{25}$.\n\n**Jakie jest hasło do pliku? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["24T45", "24T75", "64T45", "64T75"],
      poprawna: 3 },
    { nr: "5", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: UZ,
      czesci: [
        { tekst: "Wyrażenie $\\sqrt{81} - \\sqrt{49}$ jest równe …", litery: "AB", opcje: ["$2$", "$\\sqrt{32}$"], poprawna: 0 },
        { tekst: "Wyrażenie $\\sqrt{144} + \\sqrt{25}$ jest równe …", litery: "CD", opcje: ["$13$", "$17$"], poprawna: 1 },
      ] },
    { nr: "7", dzial: "e8-liczby", temat: "potegi",
      tresc: UZ,
      czesci: [
        { tekst: "Iloraz $\\frac{10^8}{5^8}$ jest równy …", litery: "AB", opcje: ["$5^8$", "$2^8$"], poprawna: 1 },
        { tekst: "Iloczyn $2^6 \\cdot 25^3$ jest równy …", litery: "CD", opcje: ["$50^9$", "$10^6$"], poprawna: 1 },
      ] },
  ],
};
