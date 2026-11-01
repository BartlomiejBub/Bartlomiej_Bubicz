// Egzamin ósmoklasisty marzec 2020 (próbny, CKE) – zadania zamknięte przepisane z arkusza, przypisane do działów egzaminu ósmoklasisty (pole dzial).
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";

export default {
  nazwa: "Egzamin ósmoklasisty marzec 2020 (próbny)",
  zadania: [
    { nr: "2", dzial: "e8-liczby", temat: "dzielniki",
      tresc: "W liczbie pięciocyfrowej $258\\#4$, podzielnej przez $4$ i niepodzielnej przez $3$, cyfrę dziesiątek zastąpiono znakiem „$\\#$”.\n\n**Jakiej cyfry na pewno nie zastąpiono znakiem** „$\\#$”**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$0$", "$4$", "$6$", "$8$"],
      poprawna: 3 },
    { nr: "3", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: `${DOK}\n\nWartość wyrażenia $\\frac{4}{3} \\cdot 3 - 2^3$ jest równa`,
      opcje: ["$-\\frac{14}{3}$", "$-4$", "$-7$", "$-\\frac{8}{3}$", "$-2$"],
      poprawna: 1 },
    { nr: "7", dzial: "e8-liczby", temat: "potegi",
      tresc: "Marta przygotowała dwa żetony takie, że suma liczb zapisanych na obu stronach każdego żetonu jest równa zero. Widok jednej ze stron tych żetonów przedstawiono poniżej.\n\n[rysunek]\n\n**Jakie liczby znajdują się na niewidocznych stronach tych żetonów? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$-25$ i $-8$", "$-25$ i $8$", "$25$ i $-8$", "$25$ i $8$"],
      poprawna: 3,
      rysunek: "assets/arkusze-e8/rys/2020-marzec-probny-7.png" },
    { nr: "9", dzial: "e8-wyrazenia", temat: "proporcje",
      tresc: "Trójkąt, w którym długości boków są do siebie w stosunku $3 : 4 : 5$ nazywa się trójkątem egipskim.\n\n**Z odcinków o jakich długościach nie można zbudować trójkąta egipskiego? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$6$, $8$, $10$", "$9$, $12$, $15$", "$12$, $20$, $25$", "$21$, $28$, $35$"],
      poprawna: 2 },
    { nr: "10", dzial: "e8-wyrazenia", temat: "zadania-z-rownaniem",
      tresc: `Sprzedawca kupił od ogrodnika róże i tulipany za łączną kwotę $580$ zł. Jeden tulipan kosztował $1{,}20$ zł, a cena jednej róży była równa $4$ zł. Sprzedawca kupił o $50$ tulipanów więcej niż róż.\n\n${DOK}\n\nJeśli liczbę zakupionych tulipanów oznaczymy przez $t$, to podane zależności opisuje równanie`,
      opcje: ["$1{,}2(t + 50) + 4t = 580$", "$1{,}2(t - 50) + 4t = 580$", "$1{,}2t + 4(t - 50) = 580$", "$1{,}2t + 4(t + 50) = 580$"],
      poprawna: 2 },
  ],
};
