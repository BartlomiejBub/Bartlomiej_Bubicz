// Egzamin ósmoklasisty lipiec 2020 (dodatkowy, CKE) – zadania zamknięte z działu „Liczby i działania” przepisane z arkusza.
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const UZ = "**Uzupełnij poniższe zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";

export default {
  nazwa: "Egzamin ósmoklasisty lipiec 2020 (dodatkowy)",
  zadania: [
    { nr: "2", dzial: "e8-liczby", temat: "zaokraglanie",
      tresc: "Dane są trzy wyrażenia arytmetyczne:\n\nI. $75{,}5 \\cdot 2 - 7 \\cdot 6{,}99$\n\nII. $(4{,}6 + 5{,}5) \\cdot 10$\n\nIII. $0{,}26 \\cdot 400$\n\n**Które spośród tych wyrażeń mają wartość większą od** $100$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["Tylko I i II.", "Tylko I i III.", "Tylko II i III.", "I, II, III."],
      poprawna: 3 },
    { nr: "4", dzial: "e8-liczby", temat: "os-liczbowa",
      tresc: `${DOK}\n\nNa osi liczbowej między liczbami $\\left(-\\frac{2}{6}\\right)$ oraz $\\left(-\\frac{1}{6}\\right)$ znajduje się liczba`,
      opcje: ["$-\\frac{1}{4}$", "$-\\frac{1}{3}$", "$-\\frac{5}{12}$", "$-\\frac{1}{2}$"],
      poprawna: 0 },
    { nr: "8", dzial: "e8-liczby", temat: "potegi",
      tresc: UZ,
      czesci: [
        { tekst: "Wartość wyrażenia $(-2)^4 : (-2)^3$ jest równa …", litery: "AB", opcje: ["$-2$", "$2$"], poprawna: 0 },
        { tekst: "Wartość wyrażenia $(-2)^2 \\cdot (-2)^3$ jest równa …", litery: "CD", opcje: ["$(-4)^5$", "$(-2)^5$"], poprawna: 1 },
      ] },
    { nr: "9", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: UZ,
      czesci: [
        { tekst: "Wartość wyrażenia $\\sqrt{36 + 64}$ jest równa …", litery: "AB", opcje: ["$10$", "$14$"], poprawna: 0 },
        { tekst: "Wartość wyrażenia $\\sqrt{1 + \\frac{9}{16}}$ jest równa …", litery: "CD", opcje: ["$1\\frac{1}{4}$", "$1\\frac{3}{4}$"], poprawna: 0 },
      ] },
  ],
};
