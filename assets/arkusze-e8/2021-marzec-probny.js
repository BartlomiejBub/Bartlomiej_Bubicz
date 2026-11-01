// Egzamin ósmoklasisty marzec 2021 (próbny, CKE) – zadania zamknięte z działu „Liczby i działania” przepisane z arkusza.
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const UZ = "**Uzupełnij zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";
const PF = "**Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.**";

export default {
  nazwa: "Egzamin ósmoklasisty marzec 2021 (próbny)",
  zadania: [
    { nr: "2", dzial: "e8-liczby", temat: "dzielniki",
      tresc: `Piłki tenisowe zapakowano do $186$ jednakowych pudełek. Do każdego z tych pudełek włożono po $6$ piłek.\n\n${PF}`,
      czesci: [
        { tekst: "Liczba wszystkich spakowanych piłek jest podzielna przez $4$.", litery: "PF", poprawna: 0 },
        { tekst: "Wszystkie te piłki można byłoby spakować do większych pudełek – po $9$ piłek w każdym.", litery: "PF", poprawna: 0 },
      ] },
    { nr: "3", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: "**Która z poniższych nierówności jest prawdziwa? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$\\frac{25}{9} < \\frac{23}{9}$", "$\\frac{5}{4} + \\frac{5}{2} > 4$", "$\\frac{13}{17} \\cdot 3 > \\frac{39}{17}$", "$\\frac{11}{12} > \\frac{11}{13}$"],
      poprawna: 3 },
    { nr: "4", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: `Dane są trzy wyrażenia:\n\nI. $6 \\cdot 1\\frac{2}{3}$\n\nII. $6 : 1{,}2$\n\nIII. $7{,}25 - 2\\frac{1}{4}$\n\n${DOK}\n\nLiczbami całkowitymi są wartości wyrażeń`,
      opcje: ["I, II i III.", "Tylko I i II.", "Tylko II i III.", "Tylko I i III."],
      poprawna: 0 },
    { nr: "7", dzial: "e8-liczby", temat: "potegi",
      tresc: `${DOK}\n\nWartość wyrażenia $\\frac{6^8}{2^4}$ jest równa`,
      opcje: ["$3^2$", "$3^4$", "$2^2 \\cdot 3^8$", "$2^4 \\cdot 3^8$"],
      poprawna: 3 },
    { nr: "8", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: UZ,
      czesci: [
        { tekst: "Wartość wyrażenia $\\sqrt{1 + \\frac{25}{144}}$ jest równa …", litery: "AB", opcje: ["$1\\frac{5}{12}$", "$1\\frac{1}{12}$"], poprawna: 1 },
        { tekst: "Wartość wyrażenia $\\sqrt[3]{3 + \\frac{3}{8}}$ jest równa …", litery: "CD", opcje: ["$1\\frac{1}{2}$", "$1\\frac{1}{8}$"], poprawna: 0 },
      ] },
  ],
};
