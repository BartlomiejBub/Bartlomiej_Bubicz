// Egzamin ósmoklasisty maj 2021 (CKE, wersja X) – zadania zamknięte z działu „Liczby i działania” przepisane z arkusza.
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const UZ = "**Uzupełnij zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";

export default {
  nazwa: "Egzamin ósmoklasisty maj 2021",
  zadania: [
    { nr: "2", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: "Dane są cztery liczby $x$, $y$, $t$, $u$ zapisane za pomocą wyrażeń arytmetycznych:\n\n$x = -62{,}5 + 30$\n\n$y = -14{,}4 - 12{,}6$\n\n$t = -12 : 0{,}3$\n\n$u = -8{,}02 \\cdot 6$\n\n**Która z tych liczb jest największa? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$x$", "$y$", "$t$", "$u$"],
      poprawna: 1 },
    { nr: "3", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: UZ,
      czesci: [
        { tekst: "Wartość wyrażenia $\\frac{3}{7} + \\frac{3}{5}$ jest liczbą …", litery: "AB", opcje: ["mniejszą od $1$", "większą od $1$"], poprawna: 1 },
        { tekst: "Wartość wyrażenia $\\frac{3}{7} - \\frac{3}{5}$ jest liczbą …", litery: "CD", opcje: ["ujemną", "dodatnią"], poprawna: 0 },
      ] },
    { nr: "4", dzial: "e8-liczby", temat: "potegi",
      tresc: `Z reguł działań na potęgach wynika, że:\n\n$(200\\,000)^3 = (2 \\cdot 100\\,000)^3 = \\left(2 \\cdot 10^5\\right)^3 = 2^3 \\cdot 10^{15}$\n\n${DOK}\n\nZ tych samych reguł wynika, że liczba $(60\\,000\\,000)^3$ jest równa`,
      opcje: ["$6^3 \\cdot 10^{21}$", "$6 \\cdot 10^{21}$", "$6^3 \\cdot 10^{10}$", "$6 \\cdot 10^{10}$"],
      poprawna: 0 },
    { nr: "5", dzial: "e8-liczby", temat: "dzielniki",
      tresc: "**Czy iloczyn dowolnych pięciu kolejnych liczb całkowitych jest podzielny przez** $10$**? Wybierz odpowiedź A albo B i jej uzasadnienie spośród 1., 2. albo 3.**",
      czesci: [
        { litery: "AB", opcje: ["Tak,", "Nie,"], poprawna: 0 },
        { tekst: "ponieważ wśród dowolnych pięciu kolejnych liczb całkowitych", litery: "123", opcje: ["nie musi znajdować się liczba podzielna przez $10$.", "jest co najmniej jedna liczba nieparzysta i co najmniej jedna liczba parzysta.", "jest co najmniej jedna liczba podzielna przez $5$ i co najmniej jedna liczba parzysta."], poprawna: 2 },
      ] },
    { nr: "7", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: `Do liczby $\\left(-\\sqrt{10}\\right)$ dodajemy $5$.\n\n${DOK}\n\nOtrzymany wynik jest liczbą`,
      opcje: ["większą od $1$.", "dodatnią mniejszą od $1$.", "mniejszą od $(-8)$.", "ujemną większą od $(-8)$."],
      poprawna: 0 },
    { nr: "13", dzial: "e8-liczby", temat: "dzielniki",
      tresc: "Listewkę o długości $50$ cm planowano pociąć na równe części. Iwona zaproponowała podział na kawałki po $5$ cm i zaznaczyła na listewce czerwonym kolorem linie cięcia. Agata chciała podzielić tę samą listewkę na części po $2$ cm i linie cięcia zaznaczyła na zielono.\n\n**Ile razy linia czerwona pokrywała się z linią zieloną? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$5$", "$4$", "$3$", "$2$"],
      poprawna: 1 },
  ],
};
