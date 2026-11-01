// Egzamin ósmoklasisty maj 2022 (CKE, wersja X) – zadania zamknięte przepisane z arkusza, przypisane do działów egzaminu ósmoklasisty (pole dzial).
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";

export default {
  nazwa: "Egzamin ósmoklasisty maj 2022",
  zadania: [
    { nr: "2", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: `${DOK}\n\nWartość wyrażenia $\\frac{4^2}{5} - 3^2$ jest równa`,
      opcje: ["$-\\frac{29}{5}$", "$-\\frac{22}{5}$", "$\\frac{7}{5}$", "$\\frac{61}{5}$"],
      poprawna: 0 },
    { nr: "3", dzial: "e8-liczby", temat: "systemy-zapisu",
      tresc: `Spośród wszystkich liczb trzycyfrowych o sumie cyfr równej $6$ wybrano liczbę największą i liczbę najmniejszą.\n\n${DOK}\n\nSuma wybranych liczb jest równa`,
      opcje: ["$714$", "$705$", "$606$", "$327$"],
      poprawna: 1 },
    { nr: "4", dzial: "e8-liczby", temat: "dzielniki",
      tresc: "Liczba $k$ jest sumą liczb $323$ i $160$.\n\n**Czy liczba** $k$ **jest podzielna przez** $3$**? Wybierz odpowiedź A albo B i jej uzasadnienie spośród 1., 2. albo 3.**",
      czesci: [
        { litery: "AB", opcje: ["Tak,", "Nie,"], poprawna: 0 },
        { tekst: "ponieważ", litery: "123", opcje: ["cyfrą jedności liczby $k$ jest $3$.", "żadna z liczb $323$ i $160$ nie dzieli się przez $3$.", "suma cyfr $3$, $4$ i $8$ jest liczbą podzielną przez $3$."], poprawna: 2 },
      ] },
    { nr: "5", dzial: "e8-liczby", temat: "potegi",
      tresc: "Dane są trzy liczby:\n\n$x = \\frac{10^{30} \\cdot 10^{70}}{10}$\n\n$y = \\left(10^3\\right)^{15} \\cdot 10^{60}$\n\n$z = 10^{50} \\cdot \\frac{10^{80}}{10^{20}}$\n\n**Która z tych liczb jest mniejsza od liczby** $10^{100}$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["Tylko $x$.", "Tylko $y$.", "Tylko $z$.", "Każda z liczb $x$, $y$, $z$."],
      poprawna: 0 },
    { nr: "8", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: `${DOK}\n\nLiczba $\\sqrt{60}$ jest`,
      opcje: ["większa od $3$ i mniejsza od $4$.", "większa od $4$ i mniejsza od $5$.", "większa od $7$ i mniejsza od $8$.", "większa od $8$ i mniejsza od $9$."],
      poprawna: 2 },
    { nr: "9", dzial: "e8-liczby", temat: "os-liczbowa",
      tresc: `Na osi liczbowej zaznaczono punkty $P$, $R$ i $S$ oraz podano współrzędne punktów $P$ i $R$. Odcinek $PS$ jest podzielony na $8$ równych części (zobacz rysunek poniżej).\n\n[rysunek]\n\n${DOK}\n\nWspółrzędna punktu $S$ jest równa`,
      opcje: ["$10$", "$11$", "$13$", "$15$"],
      poprawna: 2,
      rysunek: "assets/arkusze-e8/rys/2022-maj-9.png" },
    { nr: "10", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: `Plik z prezentacją multimedialną Igora ma rozmiar $13$ MB (megabajtów). Plik z prezentacją multimedialną Lidki ma $2{,}5$ razy większy rozmiar (wyrażony w MB) niż plik z prezentacją Igora.\n\n${DOK}\n\nPlik z prezentacją Lidki ma większy rozmiar niż plik z prezentacją Igora o`,
      opcje: ["$12$ MB", "$19{,}5$ MB", "$25$ MB", "$32{,}5$ MB"],
      poprawna: 1 },
  ],
};
