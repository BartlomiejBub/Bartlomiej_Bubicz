// Egzamin ósmoklasisty czerwiec 2020 (CKE, wersja X) – zadania zamknięte przepisane z arkusza, przypisane do działów egzaminu ósmoklasisty (pole dzial).
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const PF = "**Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.**";

export default {
  nazwa: "Egzamin ósmoklasisty czerwiec 2020",
  zadania: [
    { nr: "2", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: `${DOK}\n\nWartość wyrażenia $\\frac{5}{7} - \\frac{2}{7} \\cdot \\left(-\\frac{3}{2}\\right)$ jest równa`,
      opcje: ["$-\\frac{15}{14}$", "$-\\frac{9}{14}$", "$\\frac{2}{7}$", "$\\frac{8}{7}$"],
      poprawna: 3 },
    { nr: "4", dzial: "e8-liczby", temat: "os-liczbowa",
      tresc: `Na przedstawionym poniżej fragmencie osi liczbowej oznaczono cztery punkty: $R$, $S$, $T$, $W$. Współrzędne punktów $S$ i $W$ są równe $287$ i $311$. Odcinek $RW$ jest podzielony na pięć równych części.\n\n[rysunek]\n\n${PF}`,
      czesci: [
        { tekst: "Współrzędne punktów $R$ i $T$ różnią się o $24$.", litery: "PF", poprawna: 0 },
        { tekst: "Współrzędna punktu $R$ jest równa $271$.", litery: "PF", poprawna: 0 },
      ],
      rysunek: "assets/arkusze-e8/rys/2020-czerwiec-4.png" },
    { nr: "6", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: `${DOK}\n\nWartość wyrażenia $\\sqrt{3}\\left(\\sqrt{27} - \\sqrt{12}\\right)$ jest równa`,
      opcje: ["$\\sqrt{3}$", "$3$", "$\\sqrt{45}$", "$\\sqrt{69}$"],
      poprawna: 1 },
    { nr: "7", dzial: "e8-liczby", temat: "potegi",
      tresc: "**Która z podanych niżej liczb nie jest równa** $3^{15}$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$3 \\cdot 3^{14}$", "$3^9 \\cdot 3^6$", "$3^{17} : 9$", "$\\left(3^5\\right)^3$", "$9^{15} : 3$"],
      poprawna: 4 },
  ],
};
