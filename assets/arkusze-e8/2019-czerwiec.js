// Egzamin ósmoklasisty czerwiec 2019 (dodatkowy, CKE) – zadania zamknięte przepisane z arkusza, przypisane do działów egzaminu ósmoklasisty (pole dzial).
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const UZ = "**Uzupełnij poniższe zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";
const PF = "**Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.**";

export default {
  nazwa: "Egzamin ósmoklasisty czerwiec 2019 (dodatkowy)",
  zadania: [
    { nr: "1", dzial: "e8-procenty", temat: "procent-liczby",
      tresc: `Na obozie sportowym przebywali uczniowie z klas IV, V, VI i VII. Liczbę uczestników obozu z poszczególnych klas przedstawiono na diagramie 1. Każdy z uczestników obozu uprawia jedną z trzech dyscyplin lekkoatletycznych: biegi, rzuty, skoki. Na diagramie 2. przedstawiono, jaka część uczniów trenuje poszczególne dyscypliny.\n\n[rysunek]\n\n${DOK}\n\nWśród wszystkich uczestników obozu $28\\%$ stanowili uczniowie z klas`,
      opcje: ["czwartych.", "piątych.", "szóstych.", "siódmych."],
      poprawna: 2,
      rysunek: "assets/arkusze-e8/rys/2019-czerwiec-1.png" },
    { nr: "2", dzial: "e8-procenty", temat: "procent-liczby",
      tresc: `Na obozie sportowym przebywali uczniowie z klas IV, V, VI i VII. Liczbę uczestników obozu z poszczególnych klas przedstawiono na diagramie 1. Każdy z uczestników obozu uprawia jedną z trzech dyscyplin lekkoatletycznych: biegi, rzuty, skoki. Na diagramie 2. przedstawiono, jaka część uczniów trenuje poszczególne dyscypliny.\n\n[rysunek]\n\n${PF}`,
      czesci: [
        { tekst: "Skoki trenuje więcej osób niż rzuty.", litery: "PF", poprawna: 0 },
        { tekst: "Biegi trenuje o $10$ osób więcej niż skoki.", litery: "PF", poprawna: 0 },
      ],
      rysunek: "assets/arkusze-e8/rys/2019-czerwiec-2.png" },
    { nr: "3", dzial: "e8-liczby", temat: "zaokraglanie",
      tresc: "Podczas lekcji matematyki uczniowie zaokrąglali liczbę $0{,}84631$. Adam zaokrąglił tę liczbę do części dziesiątych, Bartek – do części setnych, Magda – do części tysięcznych, a Zosia – do części dziesięciotysięcznych.\n\n**Które z dzieci otrzymało największą liczbę? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["Adam.", "Bartek.", "Magda.", "Zosia."],
      poprawna: 1 },
    { nr: "4", dzial: "e8-procenty", temat: "predkosc",
      tresc: "Rowerzysta wyruszył w trasę o godzinie $10{:}45$, a do celu przyjechał o godzinie $14{:}05$. Jego prędkość średnia na całej trasie była równa $15\\,\\frac{\\mathrm{km}}{\\mathrm{h}}$.\n\n**Jaki dystans przejechał rowerzysta? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$48$ km", "$50$ km", "$51$ km", "$55$ km"],
      poprawna: 1 },
    { nr: "5", dzial: "e8-wyrazenia", temat: "przeksztalcanie",
      tresc: `${DOK}\n\nWyrażenie: $(x - 2)(4x - 3) - x(1 - x)$ po uproszczeniu jest równe`,
      opcje: ["$5x^2 - x - 6$", "$5x^2 - 9x + 6$", "$5x^2 - 12x + 6$", "$3x^2 - x - 6$"],
      poprawna: 2 },
    { nr: "7", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: `Wydajność dużej pompy strażackiej to $24\\,000$ litrów wody na minutę, natomiast wydajność małej pompy to $1200$ litrów wody na minutę. Mała pompa w ciągu $1$ godziny pracy zużywa $0{,}931$ litra paliwa.\n\n${UZ}`,
      czesci: [
        { tekst: "W ciągu jednej godziny działania dużej pompy strażackiej przepłynie przez nią … litrów wody niż w tym samym czasie przez małą pompę.", litery: "AB", opcje: ["$200$ razy więcej", "$20$ razy więcej"], poprawna: 1 },
        { tekst: "Mała pompa w ciągu $15$ godzin pracy zużyje … litrów paliwa.", litery: "CD", opcje: ["więcej niż $14$", "mniej niż $14$"], poprawna: 1 },
      ] },
    { nr: "8", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: `Na poniższej osi liczbowej literami $k$, $l$, $m$, $n$ oznaczono cztery kolejne liczby całkowite. Jedna z tych liczb jest równa $0$. Kropką oznaczono liczbę $\\sqrt{41}$.\n\n[rysunek]\n\n${DOK}\n\nNa osi liczbowej liczbę $0$ oznaczono literą`,
      opcje: ["$k$.", "$l$.", "$m$.", "$n$."],
      poprawna: 2,
      rysunek: "assets/arkusze-e8/rys/2019-czerwiec-8.png" },
  ],
};
