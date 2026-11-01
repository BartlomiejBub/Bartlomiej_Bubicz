// Egzamin ósmoklasisty czerwiec 2023 (dodatkowy, CKE) – zadania zamknięte z działu „Liczby i działania” przepisane z arkusza.
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const UZ = "**Uzupełnij zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";
const PF = "**Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.**";

export default {
  nazwa: "Egzamin ósmoklasisty czerwiec 2023 (dodatkowy)",
  zadania: [
    { nr: "2", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: `Z tasiemki o długości $\\frac{2}{3}$ m odcięto kawałek o długości pół metra.\n\n${DOK}\n\nPozostała po odcięciu część tasiemki ma długość`,
      opcje: ["mniejszą od $15$ cm.", "większą od $15$ cm, ale mniejszą od $16$ cm.", "równą $16$ cm.", "większą od $16$ cm, ale mniejszą od $17$ cm."],
      poprawna: 3 },
    { nr: "4", dzial: "e8-liczby", temat: "os-liczbowa",
      tresc: `Dane są cztery liczby: $0{,}7$, $-0{,}65$, $-0{,}456$, $0{,}234$.\n\n${UZ}`,
      czesci: [
        { tekst: "Suma największej i najmniejszej spośród tych liczb jest równa …", litery: "AB", opcje: ["$1{,}35$", "$0{,}05$"], poprawna: 1 },
        { tekst: "Na osi liczbowej odległość między punktami odpowiadającymi liczbom $-0{,}65$ oraz $-0{,}456$ jest równa …", litery: "CD", opcje: ["$0{,}194$", "$1{,}106$"], poprawna: 0 },
      ] },
    { nr: "5", dzial: "e8-liczby", temat: "potegi",
      tresc: PF,
      czesci: [
        { tekst: "Wartość wyrażenia $(4^4)^3$ jest równa $4^7$.", litery: "PF", poprawna: 1 },
        { tekst: "Wartości wyrażeń $5^3 \\cdot 10^3$ oraz $5^6 \\cdot 2^3$ są równe.", litery: "PF", poprawna: 0 },
      ] },
    { nr: "9", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: UZ,
      czesci: [
        { tekst: "Jest dokładnie … liczb naturalnych $m$ spełniających warunek $\\sqrt{110} < m < \\sqrt{300}$.", litery: "AB", opcje: ["$7$", "$6$"], poprawna: 0 },
        { tekst: "Są dokładnie … liczby naturalne $k$ spełniające warunek $\\sqrt[3]{10} < k < \\sqrt[3]{127}$.", litery: "CD", opcje: ["$4$", "$3$"], poprawna: 1 },
      ] },
  ],
};
