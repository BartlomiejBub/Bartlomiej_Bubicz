// Egzamin ósmoklasisty grudzień 2017 (próbny, CKE) – zadania zamknięte z działu „Liczby i działania” przepisane z arkusza.
const UZ = "**Uzupełnij zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";
const PF = "**Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.**";

export default {
  nazwa: "Egzamin ósmoklasisty grudzień 2017 (próbny)",
  zadania: [
    { nr: "2", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: UZ,
      czesci: [
        { tekst: "Wartość wyrażenia $4{,}5 : 0{,}75$ jest równa wartości wyrażenia …", litery: "AB", opcje: ["$\\frac{450}{75}$", "$\\frac{45}{75}$"], poprawna: 0 },
        { tekst: "Wartość wyrażenia $1{,}25 \\cdot 0{,}4$ jest równa wartości wyrażenia …", litery: "CD", opcje: ["$\\frac{125 \\cdot 4}{100}$", "$\\frac{125 \\cdot 4}{1000}$"], poprawna: 1 },
      ] },
    { nr: "5", dzial: "e8-liczby", temat: "potegi",
      tresc: `Narysowany kwadrat należy wypełnić tak, aby iloczyny liczb w każdym wierszu, każdej kolumnie i na obu przekątnych kwadratu były takie same.\n\n[rysunek]\n\n${PF}`,
      czesci: [
        { tekst: "Iloczyn liczb na przekątnej kwadratu jest równy $5^{15}$.", litery: "PF", poprawna: 0 },
        { tekst: "W zacieniowane pole kwadratu należy wpisać liczbę $5^9$.", litery: "PF", poprawna: 0 },
      ],
      rysunek: "assets/arkusze-e8/rys/2017-grudzien-probny-5.png" },
    { nr: "14", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: UZ,
      czesci: [
        { tekst: "Liczba $a = \\sqrt{125} - 1$ jest …", litery: "AB", opcje: ["mniejsza od $10$", "większa od $10$"], poprawna: 1 },
        { tekst: "Liczba $b = 4\\sqrt{6} - 10$ jest …", litery: "CD", opcje: ["ujemna", "dodatnia"], poprawna: 0 },
      ] },
  ],
};
