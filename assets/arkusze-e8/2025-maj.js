// Egzamin ósmoklasisty maj 2025 (CKE, wersja X) – zadania zamknięte przepisane z arkusza, przypisane do działów egzaminu ósmoklasisty (pole dzial).
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const PF = "**Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.**";

export default {
  nazwa: "Egzamin ósmoklasisty maj 2025",
  zadania: [
    { nr: "2", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: `Dane jest wyrażenie\n\n$\\left(2{,}4 - 5\\frac{1}{3}\\right) : (-2)$\n\n${DOK}\n\nWartość tego wyrażenia jest równa`,
      opcje: ["$\\left(-1\\frac{8}{15}\\right)$", "$\\left(-1\\frac{7}{15}\\right)$", "$1\\frac{7}{15}$", "$1\\frac{8}{15}$"],
      poprawna: 2 },
    { nr: "3", dzial: "e8-liczby", temat: "dzielniki",
      tresc: "Dane są liczby: $91$, $92$, $95$, $97$.\n\n**Która z podanych liczb przy dzieleniu przez** $7$ **daje resztę** $1$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$91$", "$92$", "$95$", "$97$"],
      poprawna: 1 },
    { nr: "5", dzial: "e8-wyrazenia", temat: "przeksztalcanie-wzorow",
      tresc: `Obwód pięciokąta przedstawionego na rysunku wyraża się wzorem $L = 2a + 2b + c$.\n\n[rysunek]\n\n${DOK}\n\nWielkość $a$ wyznaczoną poprawnie z podanego wzoru opisuje równanie`,
      opcje: ["$a = \\frac{L - 2b - c}{2}$", "$a = \\frac{L - 2b + c}{2}$", "$a = L + 2b - c$", "$a = L - 2b - c$"],
      poprawna: 0,
      rysunek: "assets/arkusze-e8/rys/2025-maj-5.png" },
    { nr: "6", dzial: "e8-wyrazenia", temat: "zapisywanie-wyrazen",
      tresc: `W pudełku znajdują się wyłącznie piłki białe, fioletowe i czarne. Piłek białych jest $4$ razy więcej niż fioletowych i o $3$ mniej niż czarnych. Liczbę piłek fioletowych oznaczamy przez $x$.\n\n${DOK}\n\nŁączną liczbę wszystkich piłek w pudełku opisuje wyrażenie`,
      opcje: ["$9x + 3$", "$9x - 3$", "$6x + 3$", "$6x - 3$"],
      poprawna: 0 },
    { nr: "7", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: `Dane są wyrażenia:\n\n$K = \\frac{1}{9} \\cdot \\sqrt{\\frac{1}{16}} - \\frac{1}{16} \\cdot \\sqrt{\\frac{1}{9}}$\n\n$L = 9 \\cdot \\sqrt{16} - 16 \\cdot \\sqrt{9}$\n\n${PF}`,
      czesci: [
        { tekst: "Wyrażenie $K$ ma wartość ujemną.", litery: "PF", poprawna: 1 },
        { tekst: "Wartość wyrażenia $L$ jest większa od wartości wyrażenia $K$.", litery: "PF", poprawna: 1 },
      ] },
    { nr: "8", dzial: "e8-liczby", temat: "potegi",
      tresc: `${DOK}\n\nWartość wyrażenia $8^6 : 4^3$ zapisana w postaci potęgi liczby $2$ jest równa`,
      opcje: ["$2^2$", "$2^3$", "$2^4$", "$2^{12}$"],
      poprawna: 3 },
    { nr: "12", dzial: "e8-liczby", temat: "os-liczbowa",
      tresc: `Na osi liczbowej zaznaczono punkty $A$, $B$ i $C$. Odcinek $AC$ jest podzielony na $6$ równych części.\n\n[rysunek]\n\n${PF}`,
      czesci: [
        { tekst: "Współrzędna punktu $C$ jest liczbą parzystą.", litery: "PF", poprawna: 1 },
        { tekst: "Współrzędna punktu $B$ jest liczbą mniejszą od $74$.", litery: "PF", poprawna: 0 },
      ],
      rysunek: "assets/arkusze-e8/rys/2025-maj-12.png" },
  ],
};
