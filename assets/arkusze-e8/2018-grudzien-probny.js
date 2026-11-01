// Egzamin ósmoklasisty grudzień 2018 (próbny, CKE) – zadania zamknięte przepisane z arkusza, przypisane do działów egzaminu ósmoklasisty (pole dzial).
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const UZ = "**Uzupełnij poniższe zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";

export default {
  nazwa: "Egzamin ósmoklasisty grudzień 2018 (próbny)",
  zadania: [
    { nr: "4", dzial: "e8-liczby", temat: "dzielniki",
      tresc: `Liczba $x$ jest najmniejszą liczbą dodatnią podzielną przez $3$ i $4$, a liczba $y$ jest największą liczbą dwucyfrową podzielną przez $2$ i $9$.\n\n${DOK}\n\nNajmniejsza wspólna wielokrotność liczb $x$ i $y$ jest równa`,
      opcje: ["$72$", "$108$", "$180$", "$216$"],
      poprawna: 2 },
    { nr: "7", dzial: "e8-liczby", temat: "zaokraglanie",
      tresc: "Monika poprawnie zaokrągliła liczbę $3465$ do pełnych setek i otrzymała liczbę $x$, a Paweł poprawnie zaokrąglił liczbę $3495$ do pełnych tysięcy i otrzymał liczbę $y$.\n\n**Czy liczby** $x$ **i** $y$ **są równe? Wybierz odpowiedź A (Tak) albo B (Nie) i jej uzasadnienie spośród 1, 2 albo 3.**",
      czesci: [
        { litery: "AB", opcje: ["Tak,", "Nie,"], poprawna: 1 },
        { tekst: "ponieważ", litery: "123", opcje: ["początkowa liczba Moniki jest mniejsza od początkowej liczby Pawła.", "cyfra tysięcy każdej z początkowych liczb jest taka sama.", "otrzymane zaokrąglenia różnią się o $500$."], poprawna: 2 },
      ] },
    { nr: "8", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: `Dana jest liczba $a = 3\\sqrt{2} - 4$.\n\n${UZ}`,
      czesci: [
        { tekst: "Liczba o $2$ większa od liczby $a$ jest równa …", litery: "AB", opcje: ["$5\\sqrt{2} - 4$", "$3\\sqrt{2} - 2$"], poprawna: 1 },
        { tekst: "Liczba $2$ razy większa od liczby $a$ jest równa …", litery: "CD", opcje: ["$6\\sqrt{4} - 8$", "$6\\sqrt{2} - 8$"], poprawna: 1 },
      ] },
    { nr: "11", dzial: "e8-wyrazenia", temat: "zadania-z-rownaniem",
      tresc: "O liczbie $x$ wiemy, że $\\frac{1}{3}$ tej liczby jest o $\\frac{3}{4}$ większa od $\\frac{1}{6}$ tej liczby.\n\n**Które równanie pozwoli wyznaczyć liczbę** $x$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$\\frac{2}{3}x = \\frac{1}{6}x + \\frac{3}{4}$", "$\\frac{1}{3}x + \\frac{3}{4} = \\frac{5}{6}x$", "$\\frac{1}{3}x = \\frac{1}{6}x + \\frac{3}{4}$", "$\\frac{1}{3}x + \\frac{3}{4} = \\frac{1}{6}x$"],
      poprawna: 2 },
  ],
};
