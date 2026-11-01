// Egzamin ósmoklasisty czerwiec 2024 (dodatkowy, CKE) – zadania zamknięte z działu „Liczby i działania” przepisane z arkusza.
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const UZ = "**Uzupełnij zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";
const PF = "**Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.**";

export default {
  nazwa: "Egzamin ósmoklasisty czerwiec 2024 (dodatkowy)",
  zadania: [
    { nr: "1", dzial: "e8-liczby", temat: "os-liczbowa",
      tresc: `Adam zapisał, w przypadkowej kolejności, podane w programie radiowym wartości temperatury odnotowane pewnego zimowego dnia o godzinie 20:30 w Zakopanem, w Wiśle, w Karpaczu i w Szklarskiej Porębie (zobacz rysunek).\n\n[rysunek]\n\nTemperatura w Karpaczu była o $6^\\circ\\mathrm{C}$ wyższa niż w Szklarskiej Porębie, a w Wiśle była niższa niż w Zakopanem.\n\n${DOK}\n\nTemperaturę $-5^\\circ\\mathrm{C}$ zanotowano w`,
      opcje: ["Szklarskiej Porębie.", "Zakopanem.", "Karpaczu.", "Wiśle."],
      poprawna: 3,
      rysunek: "assets/arkusze-e8/rys/2024-czerwiec-1.png" },
    { nr: "2", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: "Dane są cztery liczby:\n\nI. $-9{,}25$  II. $-1{,}25$  III. $1{,}25$  IV. $9{,}25$\n\n**Do której z liczb I–IV należy dodać liczbę** $(-4)$**, aby otrzymać liczbę** $(-5{,}25)$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["I", "II", "III", "IV"],
      poprawna: 1 },
    { nr: "3", dzial: "e8-liczby", temat: "potegi",
      tresc: PF,
      czesci: [
        { tekst: "$\\left(\\frac{1}{5}\\right)^8 > \\left(\\frac{1}{5}\\right)^6$", litery: "PF", poprawna: 1 },
        { tekst: "$2^2 \\cdot \\left(\\frac{1}{2}\\right)^2 = (-2)^3 \\cdot \\left(-\\frac{1}{2}\\right)^3$", litery: "PF", poprawna: 0 },
      ] },
    { nr: "5", dzial: "e8-liczby", temat: "os-liczbowa",
      tresc: "Na osi liczbowej zaznaczono sześć liczb całkowitych. Cztery z tych liczb oznaczono literami: $k$, $m$, $t$, $p$.\n\n[rysunek]\n\n**Które z poniższych wyrażeń ma wartość równą** $1$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$k + p$", "$k + m + t$", "$k + t$", "$k + m + p$"],
      poprawna: 3,
      rysunek: "assets/arkusze-e8/rys/2024-czerwiec-5.png" },
    { nr: "6", dzial: "e8-liczby", temat: "dzielniki",
      tresc: "**Czy liczba** $27\\,733$ **jest podzielna przez** $3$**? Wybierz odpowiedź A albo B i jej uzasadnienie spośród 1., 2. albo 3.**",
      czesci: [
        { litery: "AB", opcje: ["Tak,", "Nie,"], poprawna: 1 },
        { tekst: "ponieważ", litery: "123", opcje: ["cyfrą jedności tej liczby jest $3$.", "suma cyfr tej liczby nie jest podzielna przez $3$.", "dwie ostatnie cyfry tej liczby tworzą liczbę podzielną przez $3$."], poprawna: 1 },
      ] },
    { nr: "10", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: UZ,
      czesci: [
        { tekst: "Liczba $\\sqrt{6\\frac{1}{4}}$ jest równa …", litery: "AB", opcje: ["$2\\frac{1}{2}$", "$3\\frac{1}{2}$"], poprawna: 0 },
        { tekst: "Liczba $\\sqrt[3]{0{,}064}$ jest równa …", litery: "CD", opcje: ["$0{,}4$", "$0{,}8$"], poprawna: 0 },
      ] },
    { nr: "14", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: `Działka ma powierzchnię $200$ arów. Warzywa zajmują $130$ arów, jabłonie rosną na $\\frac{1}{5}$ pozostałej części działki, a resztę działki zajmują śliwy.\n\n${DOK}\n\nŚliwy zajmują powierzchnię`,
      opcje: ["$14$ arów.", "$30$ arów.", "$56$ arów.", "$70$ arów."],
      poprawna: 2 },
  ],
};
