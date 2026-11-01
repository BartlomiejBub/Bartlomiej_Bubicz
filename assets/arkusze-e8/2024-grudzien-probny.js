// Egzamin ósmoklasisty grudzień 2024 (próbny, CKE) – zadania zamknięte przepisane z arkusza, przypisane do działów egzaminu ósmoklasisty (pole dzial).
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const UZ = "**Uzupełnij zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";
const PF = "**Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.**";

export default {
  nazwa: "Egzamin ósmoklasisty grudzień 2024 (próbny)",
  zadania: [
    { nr: "1", dzial: "e8-procenty", temat: "jednostki",
      tresc: `Poniżej zamieszczono fragment etykiety pewnego opakowania śmietany.\n\n[rysunek]\n\n${UZ}`,
      czesci: [
        { tekst: "W opakowaniu zawierającym $200$ g tej śmietany jest … dag białka.", litery: "AB", opcje: ["$0{,}6$", "$0{,}06$"], poprawna: 0 },
        { tekst: "Masa tłuszczu w dowolnej porcji tej śmietany jest … razy większa od masy soli.", litery: "CD", opcje: ["$12$", "$120$"], poprawna: 1 },
      ],
      rysunek: "assets/arkusze-e8/rys/2024-grudzien-probny-1.png" },
    { nr: "2", dzial: "e8-liczby", temat: "potegi",
      tresc: PF,
      czesci: [
        { tekst: "Wartość wyrażenia $5^2 \\cdot 5^3 \\cdot 5^5$ jest równa $\\left(5^5\\right)^2$.", litery: "PF", poprawna: 0 },
        { tekst: "Wyrażenia $\\frac{2^3 \\cdot 3^3}{6}$ oraz $\\left(\\frac{12}{5} : \\frac{2}{5}\\right)^2$ mają taką samą wartość.", litery: "PF", poprawna: 0 },
      ] },
    { nr: "3", dzial: "e8-wyrazenia", temat: "przeksztalcanie",
      tresc: `${DOK}\n\nWyrażenie $2(a - 2b) - (a - b)(2 - b) + b^2$ można przekształcić równoważnie do postaci`,
      opcje: ["$ab$", "$ab - 2b$", "$b^2 - 2b - ab$", "$b^2 - 6b + a - 2$", "$b^2 + ab$"],
      poprawna: 1 },
    { nr: "4", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: UZ,
      czesci: [
        { tekst: "Liczba $4$ jest mniejsza od liczby …", litery: "AB", opcje: ["$2\\sqrt{3}$", "$3\\sqrt{2}$"], poprawna: 1 },
        { tekst: "Liczba $4$ jest większa od liczby …", litery: "CD", opcje: ["$\\sqrt{2} + 2$", "$6 - \\sqrt{3}$"], poprawna: 0 },
      ] },
    { nr: "6", dzial: "e8-liczby", temat: "os-liczbowa",
      tresc: "Dana jest nierówność $x \\geq -3$.\n\n**Na którym rysunku poprawnie zaznaczono na osi liczbowej zbiór wszystkich liczb rzeczywistych** $x$ **spełniających tę nierówność? Wybierz właściwą odpowiedź spośród podanych.**\n\n[rysunek]",
      opcje: ["rysunek A", "rysunek B", "rysunek C", "rysunek D"],
      poprawna: 2,
      rysunek: "assets/arkusze-e8/rys/2024-grudzien-probny-6.png" },
    { nr: "7", dzial: "e8-procenty", temat: "liczba-z-procentu",
      tresc: `Uczniom klas ósmych zadano pytanie: „Z którego portalu internetowego korzystasz najczęściej?”. Każdy z uczniów wskazał jeden portal. Procentowy rozkład udzielonych odpowiedzi uczniów przedstawiono na diagramie poniżej. Portal $\\mathcal{F}$ wskazało $72$ uczniów.\n\n[rysunek]\n\n${PF}`,
      czesci: [
        { tekst: "Portal $\\mathcal{Y}$ wskazało $40$ uczniów.", litery: "PF", poprawna: 0 },
        { tekst: "Portal $\\mathcal{I}$ wskazało o $8$ uczniów mniej niż uczniów, którzy wskazali portal $\\mathcal{S}$.", litery: "PF", poprawna: 0 },
      ],
      rysunek: "assets/arkusze-e8/rys/2024-grudzien-probny-7.png" },
    { nr: "14", dzial: "e8-procenty", temat: "predkosc",
      tresc: `Odcinkowy pomiar prędkości polega na wyznaczeniu średniej prędkości samochodu na określonym odcinku drogi. Na początku i na końcu takiego odcinka ustawiono znaki drogowe informujące o rozpoczęciu i zakończeniu pomiaru (zobacz rysunek).\n\n[rysunek]\n\nSamochód osobowy przejechał w $2$ minuty taki odcinek drogi o długości $3$ km.\n\n${DOK}\n\nWyznaczona prędkość tego samochodu na objętym pomiarem odcinku drogi była równa`,
      opcje: ["$40\\,\\frac{\\mathrm{km}}{\\mathrm{h}}$", "$60\\,\\frac{\\mathrm{km}}{\\mathrm{h}}$", "$90\\,\\frac{\\mathrm{km}}{\\mathrm{h}}$", "$150\\,\\frac{\\mathrm{km}}{\\mathrm{h}}$"],
      poprawna: 2,
      rysunek: "assets/arkusze-e8/rys/2024-grudzien-probny-14.png" },
  ],
};
