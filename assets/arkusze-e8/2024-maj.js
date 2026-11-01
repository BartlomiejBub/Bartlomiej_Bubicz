// Egzamin ósmoklasisty maj 2024 (CKE, wersja X) – zadania zamknięte z działu „Liczby i działania” przepisane z arkusza.
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const UZ = "**Uzupełnij zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";
const PF = "**Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.**";

export default {
  nazwa: "Egzamin ósmoklasisty maj 2024",
  zadania: [
    { nr: "2", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: `Wypisano ułamki spełniające łącznie następujące warunki:\n\n• mianownik każdego z nich jest równy $4$\n\n• licznik każdego z nich jest liczbą naturalną większą od mianownika\n\n• każdy z tych ułamków jest większy od liczby $3$ oraz mniejszy od liczby $5$.\n\n${DOK}\n\nWszystkich ułamków spełniających powyższe warunki jest`,
      opcje: ["sześć.", "siedem.", "osiem.", "dziewięć."],
      poprawna: 1 },
    { nr: "4", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: `Dane są dwie liczby $x$ i $y$ zapisane za pomocą wyrażeń arytmetycznych:\n\n$x = \\frac{4}{5} \\cdot \\left(-\\frac{4}{3}\\right)$\n\n$y = \\frac{4}{5} + \\left(-\\frac{4}{3}\\right)$\n\n${UZ}`,
      czesci: [
        { tekst: "Liczba $y$ jest liczbą …", litery: "AB", opcje: ["ujemną", "dodatnią"], poprawna: 0 },
        { tekst: "Liczba $x$ jest … od liczby $y$.", litery: "CD", opcje: ["mniejsza", "większa"], poprawna: 0 },
      ] },
    { nr: "7", dzial: "e8-liczby", temat: "potegi",
      tresc: PF,
      czesci: [
        { tekst: "Iloczyn $3 \\cdot 9^5$ jest równy wartości wyrażenia $3^{11}$.", litery: "PF", poprawna: 0 },
        { tekst: "Wyrażenie $\\frac{2^8 \\cdot 2^7}{2^{10}}$ można zapisać w postaci $2^5$.", litery: "PF", poprawna: 0 },
      ] },
  ],
};
