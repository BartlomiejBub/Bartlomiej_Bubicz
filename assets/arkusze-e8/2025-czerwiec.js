// Egzamin ósmoklasisty czerwiec 2025 (dodatkowy, CKE) – zadania zamknięte z działu „Liczby i działania” przepisane z arkusza.
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const PF = "**Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.**";

export default {
  nazwa: "Egzamin ósmoklasisty czerwiec 2025 (dodatkowy)",
  zadania: [
    { nr: "2", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: `Zapisywano kolejno liczby według następującej zasady:\n\n• liczbę $6$ zapisano jako pierwszą\n\n• każda następna zapisana liczba była połową liczby poprzedniej.\n\n${DOK}\n\nPiątą liczbą, którą zapisano, jest`,
      opcje: ["$\\frac{3}{2}$", "$\\frac{3}{4}$", "$\\frac{3}{8}$", "$\\frac{3}{16}$"],
      poprawna: 2 },
    { nr: "4", dzial: "e8-liczby", temat: "potegi",
      tresc: PF,
      czesci: [
        { tekst: "Iloraz $9^4 : 3^2$ jest równy $3^2$.", litery: "PF", poprawna: 1 },
        { tekst: "Liczba $3^8$ jest trzy razy większa od iloczynu $3^5 \\cdot 3^2$.", litery: "PF", poprawna: 0 },
      ] },
    { nr: "5", dzial: "e8-liczby", temat: "dzielniki",
      tresc: `Dane są liczby: $k = 69$ oraz $m = 83$.\n\n${PF}`,
      czesci: [
        { tekst: "Suma liczb $k$ i $m$ jest podzielna przez $4$.", litery: "PF", poprawna: 0 },
        { tekst: "Iloczyn liczb $k$ i $m$ jest podzielny przez $3$.", litery: "PF", poprawna: 0 },
      ] },
    { nr: "7", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: `Jurek przejechał rowerem $12$ km, co stanowiło $\\frac{2}{3}$ długości zaplanowanej trasy.\n\n${DOK}\n\nPołowa zaplanowanej trasy ma długość`,
      opcje: ["$6$ km", "$8$ km", "$9$ km", "$10$ km"],
      poprawna: 2 },
  ],
};
