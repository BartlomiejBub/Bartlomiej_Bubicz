// Egzamin ósmoklasisty czerwiec 2019 (dodatkowy, CKE) – zadania zamknięte z działu „Liczby i działania” przepisane z arkusza.
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const UZ = "**Uzupełnij poniższe zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";

export default {
  nazwa: "Egzamin ósmoklasisty czerwiec 2019 (dodatkowy)",
  zadania: [
    { nr: "3", dzial: "e8-liczby", temat: "zaokraglanie",
      tresc: "Podczas lekcji matematyki uczniowie zaokrąglali liczbę $0{,}84631$. Adam zaokrąglił tę liczbę do części dziesiątych, Bartek – do części setnych, Magda – do części tysięcznych, a Zosia – do części dziesięciotysięcznych.\n\n**Które z dzieci otrzymało największą liczbę? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["Adam.", "Bartek.", "Magda.", "Zosia."],
      poprawna: 1 },
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
