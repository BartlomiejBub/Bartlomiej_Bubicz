// Egzamin ósmoklasisty kwiecień 2019 (CKE) – zadania zamknięte z działu „Liczby i działania” przepisane z arkusza.
const UZ = "**Uzupełnij poniższe zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";

export default {
  nazwa: "Egzamin ósmoklasisty kwiecień 2019",
  zadania: [
    { nr: "2", dzial: "e8-liczby", temat: "zaokraglanie",
      tresc: "Liczba $1450$ jest zaokrągleniem do rzędu dziesiątek kilku liczb naturalnych.\n\n**Ile jest wszystkich liczb naturalnych różnych od** $1450$**, które mają takie zaokrąglenie? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$4$", "$5$", "$9$", "$10$"],
      poprawna: 2 },
    { nr: "3", dzial: "e8-liczby", temat: "potegi",
      tresc: "Zapisano trzy wyrażenia:\n\nI. $5^2 \\cdot 10^8 \\cdot 5^4$\n\nII. $\\left(5^{10} : 5^2\\right) \\cdot 10^8$\n\nIII. $2^8 \\cdot 5^8 \\cdot 5^8$\n\n**Które z tych wyrażeń są równe** $50^8$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["Tylko I i II.", "Tylko II i III.", "Tylko II.", "Tylko III."],
      poprawna: 1 },
    { nr: "4", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: "Dane są cztery wyrażenia:\n\nI. $4 + \\sqrt{35}$\n\nII. $6 + \\sqrt{17}$\n\nIII. $17 - \\sqrt{48}$\n\nIV. $15 - \\sqrt{26}$\n\n**Wartości których wyrażeń są mniejsze od** $10$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["I i II", "II i III", "III i IV", "I i IV"],
      poprawna: 3 },
    { nr: "5", dzial: "e8-liczby", temat: "dzielniki",
      tresc: `Adam przygotował karty do gry z czterech arkuszy kartonu. Najpierw podzielił każdy arkusz kartonu na cztery części, a następnie każdą z nich ponownie podzielił na cztery części. Tak powstał komplet kart. W grze bierze udział $5$ graczy, z których każdy otrzymuje jednakową liczbę kart.\n\n${UZ}`,
      czesci: [
        { tekst: "Adam przygotował … karty do gry.", litery: "AB", opcje: ["$32$", "$64$"], poprawna: 1 },
        { tekst: "Każdy gracz może otrzymać maksymalnie … kart.", litery: "CD", opcje: ["$12$", "$13$"], poprawna: 0 },
      ] },
  ],
};
