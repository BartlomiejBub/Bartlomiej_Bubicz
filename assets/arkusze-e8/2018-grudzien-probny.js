// Egzamin ósmoklasisty grudzień 2018 (próbny, CKE) – zadania zamknięte przepisane z arkusza, przypisane do działów egzaminu ósmoklasisty (pole dzial).
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const UZ = "**Uzupełnij poniższe zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";
const PF = "**Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.**";

export default {
  nazwa: "Egzamin ósmoklasisty grudzień 2018 (próbny)",
  zadania: [
    { nr: "2", dzial: "e8-procenty", temat: "jednostki",
      tresc: `Poniżej zamieszczono fragment etykiety z jogurtu o masie $150$ g.\n\n[rysunek]\n\n${UZ}`,
      czesci: [
        { tekst: "Zjedzenie całego jogurtu dostarcza organizmowi około … wapnia.", litery: "AB", opcje: ["$167$ mg", "$250$ mg"], poprawna: 1 },
        { tekst: "Zjedzenie całego jogurtu dostarcza organizmowi … razy więcej białka niż witaminy B2.", litery: "CD", opcje: ["$18{,}4$", "$18\\,400$"], poprawna: 1 },
      ],
      rysunek: "assets/arkusze-e8/rys/2018-grudzien-probny-2.png" },
    { nr: "3", dzial: "e8-procenty", temat: "procent-liczby",
      tresc: PF,
      czesci: [
        { tekst: "$120\\%$ liczby $180$ to tyle samo, co $180\\%$ liczby $120$.", litery: "PF", poprawna: 0 },
        { tekst: "$20\\%$ liczby $36$ to tyle samo, co $40\\%$ liczby $18$.", litery: "PF", poprawna: 0 },
      ] },
    { nr: "4", dzial: "e8-liczby", temat: "dzielniki",
      tresc: `Liczba $x$ jest najmniejszą liczbą dodatnią podzielną przez $3$ i $4$, a liczba $y$ jest największą liczbą dwucyfrową podzielną przez $2$ i $9$.\n\n${DOK}\n\nNajmniejsza wspólna wielokrotność liczb $x$ i $y$ jest równa`,
      opcje: ["$72$", "$108$", "$180$", "$216$"],
      poprawna: 2 },
    { nr: "5", dzial: "e8-figury", temat: "pola-obwody",
      tresc: `Na rysunku przedstawiono fragment podłogi pokrytej kaflami w kształcie kwadratów o boku długości $60$ cm i kaflami w kształcie jednakowych prostokątów (patrz rysunek I). Na podłodze tej położono prostokątny dywan (patrz rysunek II).\n\n[rysunek]\n\n${PF}`,
      czesci: [
        { tekst: "Dywan ma powierzchnię większą niż powierzchnia $4$ kwadratowych kafli.", litery: "PF", poprawna: 1 },
        { tekst: "Dywan ma wymiary $90\\,\\mathrm{cm} \\times 120\\,\\mathrm{cm}$.", litery: "PF", poprawna: 1 },
      ],
      rysunek: "assets/arkusze-e8/rys/2018-grudzien-probny-5.png" },
    { nr: "6", dzial: "e8-procenty", temat: "predkosc",
      tresc: "Prędkość rozchodzenia się impulsu elektrycznego u człowieka wynosi około $2$ metrów na sekundę. U roślin impuls elektryczny może rozchodzić się z prędkością około $60$ centymetrów na minutę.\n\n**Ile razy prędkość rozchodzenia się impulsu elektrycznego u człowieka jest większa od prędkości rozchodzenia się impulsu elektrycznego u roślin? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["W przybliżeniu $2$ razy.", "W przybliżeniu $20$ razy.", "W przybliżeniu $200$ razy.", "W przybliżeniu $2000$ razy."],
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
    { nr: "12", dzial: "e8-figury", temat: "trojkaty",
      tresc: `W trójkącie $ABC$ największą miarę ma kąt przy wierzchołku $C$. Miara kąta przy wierzchołku $A$ jest równa $48^\\circ$, a miara kąta przy wierzchołku $B$ jest równa różnicy miary kąta przy wierzchołku $C$ oraz miary kąta przy wierzchołku $A$.\n\n${PF}`,
      czesci: [
        { tekst: "Kąt przy wierzchołku $B$ ma miarę $48^\\circ$.", litery: "PF", poprawna: 1 },
        { tekst: "Trójkąt $ABC$ jest prostokątny.", litery: "PF", poprawna: 0 },
      ] },
    { nr: "13", dzial: "e8-figury", temat: "uklad-wspolrzednych",
      tresc: "W układzie współrzędnych zaznaczono dwa punkty: $A = (-8, -4)$ i $P = (-2, 2)$. Punkt $P$ jest środkiem odcinka $AB$.\n\n**Jakie współrzędne ma punkt** $B$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$(4, 8)$", "$(-10, -2)$", "$(-10, 8)$", "$(4, -2)$"],
      poprawna: 0 },
  ],
};
