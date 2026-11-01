// Egzamin ósmoklasisty marzec 2020 (próbny, CKE) – zadania zamknięte z działu „Liczby i działania” przepisane z arkusza.
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
  ],
};
