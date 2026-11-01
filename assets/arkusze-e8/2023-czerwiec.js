// Egzamin ósmoklasisty czerwiec 2023 (dodatkowy, CKE) – zadania zamknięte przepisane z arkusza, przypisane do działów egzaminu ósmoklasisty (pole dzial).
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
    { nr: "6", dzial: "e8-wyrazenia", temat: "zapisywanie-wyrazen",
      tresc: `W naczyniu znajdowało się $k$ litrów wody. Marcin odlał z tego naczynia $\\frac{1}{3}$ tej objętości wody, a następnie Magda odlała $3$ litry wody.\n\n${DOK}\n\nObjętość wody wyrażoną w litrach, która pozostała w naczyniu, opisuje wyrażenie`,
      opcje: ["$k - \\left(\\frac{1}{3} \\cdot k + 3\\right)$", "$\\frac{1}{3} \\cdot k - 3$", "$k - \\frac{1}{3} - 3$", "$k - \\left(\\frac{1}{3} \\cdot k - 3\\right)$"],
      poprawna: 0 },
    { nr: "8", dzial: "e8-wyrazenia", temat: "zapisywanie-wyrazen",
      tresc: "Podczas spaceru w czasie każdych $10$ sekund Ewa robi taką samą liczbę $a$ kroków.\n\n**Ile kroków zrobi Ewa w czasie** $3$ **minut tego spaceru? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$6a$", "$18a$", "$30a$", "$180a$"],
      poprawna: 1 },
    { nr: "9", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: UZ,
      czesci: [
        { tekst: "Jest dokładnie … liczb naturalnych $m$ spełniających warunek $\\sqrt{110} < m < \\sqrt{300}$.", litery: "AB", opcje: ["$7$", "$6$"], poprawna: 0 },
        { tekst: "Są dokładnie … liczby naturalne $k$ spełniające warunek $\\sqrt[3]{10} < k < \\sqrt[3]{127}$.", litery: "CD", opcje: ["$4$", "$3$"], poprawna: 1 },
      ] },
    { nr: "14", dzial: "e8-wyrazenia", temat: "proporcje",
      tresc: `Stosunek długości trzech boków trójkąta jest równy $2 : 4 : 5$. Obwód tego trójkąta jest równy $33$ cm.\n\n${DOK}\n\nNajkrótszy bok tego trójkąta ma długość`,
      opcje: ["$2$ cm", "$3$ cm", "$6$ cm", "$11$ cm"],
      poprawna: 2 },
  ],
};
