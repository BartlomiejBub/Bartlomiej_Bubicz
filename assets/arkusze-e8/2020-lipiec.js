// Egzamin ósmoklasisty lipiec 2020 (dodatkowy, CKE) – zadania zamknięte przepisane z arkusza, przypisane do działów egzaminu ósmoklasisty (pole dzial).
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const UZ = "**Uzupełnij poniższe zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";
const PF = "**Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.**";

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
    { nr: "7", dzial: "e8-wyrazenia", temat: "przeksztalcanie-wzorow",
      tresc: `Zależność drogi od czasu i przyspieszenia w ruchu jednostajnie przyspieszonym (gdy prędkość początkowa jest równa $0$) opisuje wzór $s = \\frac{at^2}{2}$, gdzie $s$ – droga, $t$ – czas, $a$ – przyspieszenie.\n\n${DOK}\n\nPrzyspieszenie $a$ poprawnie wyznaczone z tego wzoru można opisać równaniem`,
      opcje: ["$a = \\frac{st^2}{2}$", "$a = \\frac{t^2}{2s}$", "$a = \\frac{2s}{t^2}$", "$a = 2st^2$"],
      poprawna: 2 },
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
    { nr: "15", dzial: "e8-wyrazenia", temat: "zadania-z-rownaniem",
      tresc: `Na rysunku przedstawiono czworokąt $ABCD$, który podzielono na dwa trójkąty. Długości boków otrzymanych trójkątów opisano za pomocą wyrażeń algebraicznych. Obwód trójkąta $ABC$ jest równy $31$.\n\n[rysunek]\n\n${PF}`,
      czesci: [
        { tekst: "Odcinek $AC$ jest o $4$ jednostki dłuższy od odcinka $CD$.", litery: "PF", poprawna: 1 },
        { tekst: "Obwód trójkąta $ACD$ jest równy $23$.", litery: "PF", poprawna: 0 },
      ],
      rysunek: "assets/arkusze-e8/rys/2020-lipiec-15.png" },
  ],
};
