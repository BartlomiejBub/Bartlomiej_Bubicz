// Egzamin ósmoklasisty grudzień 2024 (próbny, CKE) – zadania zamknięte przepisane z arkusza, przypisane do działów egzaminu ósmoklasisty (pole dzial).
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const UZ = "**Uzupełnij zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";
const PF = "**Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.**";

export default {
  nazwa: "Egzamin ósmoklasisty grudzień 2024 (próbny)",
  zadania: [
    { nr: "2", dzial: "e8-liczby", temat: "potegi",
      tresc: PF,
      czesci: [
        { tekst: "Wartość wyrażenia $5^2 \\cdot 5^3 \\cdot 5^5$ jest równa $\\left(5^5\\right)^2$.", litery: "PF", poprawna: 0 },
        { tekst: "Wyrażenia $\\frac{2^3 \\cdot 3^3}{6}$ oraz $\\left(\\frac{12}{5} : \\frac{2}{5}\\right)^2$ mają taką samą wartość.", litery: "PF", poprawna: 0 },
      ] },
    { nr: "3", dzial: "e8-wyrazenia", temat: "przeksztalcanie",
      tresc: `${DOK}\n\nWyrażenie $2(a - 2b) - (a - b)(2 - b) + b^2$ można przekształcić równoważnie do postaci`,
      opcje: ["$ab$", "$ab - 2b$", "$b^2 - 2b - ab$", "$b^2 - 6b + a - 2$", "$b^2 + ab$"],
      poprawna: 1 },
    { nr: "4", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: UZ,
      czesci: [
        { tekst: "Liczba $4$ jest mniejsza od liczby …", litery: "AB", opcje: ["$2\\sqrt{3}$", "$3\\sqrt{2}$"], poprawna: 1 },
        { tekst: "Liczba $4$ jest większa od liczby …", litery: "CD", opcje: ["$\\sqrt{2} + 2$", "$6 - \\sqrt{3}$"], poprawna: 0 },
      ] },
    { nr: "6", dzial: "e8-liczby", temat: "os-liczbowa",
      tresc: "Dana jest nierówność $x \\geq -3$.\n\n**Na którym rysunku poprawnie zaznaczono na osi liczbowej zbiór wszystkich liczb rzeczywistych** $x$ **spełniających tę nierówność? Wybierz właściwą odpowiedź spośród podanych.**\n\n[rysunek]",
      opcje: ["rysunek A", "rysunek B", "rysunek C", "rysunek D"],
      poprawna: 2,
      rysunek: "assets/arkusze-e8/rys/2024-grudzien-probny-6.png" },
  ],
};
