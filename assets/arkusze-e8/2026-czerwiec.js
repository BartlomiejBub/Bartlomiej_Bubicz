// Egzamin ósmoklasisty czerwiec 2026 (dodatkowy, CKE) – zadania zamknięte przepisane z arkusza, przypisane do działów egzaminu ósmoklasisty (pole dzial).
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const UZ = "**Uzupełnij zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";

export default {
  nazwa: "Egzamin ósmoklasisty czerwiec 2026 (dodatkowy)",
  zadania: [
    { nr: "2", dzial: "e8-wyrazenia", temat: "proporcje",
      tresc: `Kwotę $1\\,800$ złotych przeznaczoną na nagrody w pewnym konkursie podzielono na trzy części w stosunku $6 : 3 : 1$, odpowiednio: za I, za II i za III miejsce.\n\n${UZ}`,
      czesci: [
        { tekst: "Wartość nagrody za III miejsce jest równa …", litery: "AB", opcje: ["$180$ złotych", "$200$ złotych"], poprawna: 0 },
        { tekst: "Wartość nagrody za I miejsce jest … razy większa od wartości nagrody za II miejsce.", litery: "CD", opcje: ["$3$", "$2$"], poprawna: 1 },
      ] },
    { nr: "3", dzial: "e8-wyrazenia", temat: "rownania",
      tresc: `${DOK}\n\nRozwiązaniem równania $3(x + 2) = 6 - (x - 1)$ jest liczba`,
      opcje: ["$-\\frac{3}{2}$", "$-1$", "$\\frac{1}{4}$", "$\\frac{1}{2}$"],
      poprawna: 2 },
    { nr: "4", dzial: "e8-liczby", temat: "potegi",
      tresc: "W tabeli zapisano cztery wyrażenia arytmetyczne:\n\nI. $2^{24} : 2$  II. $4^{12} \\cdot 4$  III. $2^{25} : 8$  IV. $(4 \\cdot 8)^4$\n\n**Które z tych wyrażeń ma największą wartość? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["I", "II", "III", "IV"],
      poprawna: 1 },
    { nr: "5", dzial: "e8-liczby", temat: "systemy-zapisu",
      tresc: "W pewnej liczbie czterocyfrowej suma cyfr jest równa $3$.\n\n**Ile jest liczb czterocyfrowych spełniających ten warunek? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$3$", "$6$", "$9$", "$10$"],
      poprawna: 3 },
    { nr: "6", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: `Dane jest wyrażenie arytmetyczne\n\n$\\frac{\\sqrt{100} - \\sqrt{36}}{\\sqrt[3]{-8}}$\n\n${DOK}\n\nWartość podanego wyrażenia jest równa`,
      opcje: ["$4$", "$2$", "$-2$", "$-4$"],
      poprawna: 2 },
    { nr: "7", dzial: "e8-liczby", temat: "dzielniki",
      tresc: `Trzy kolejne liczby naturalne można zapisać w postaci: $n$, $(n + 1)$, $(n + 2)$.\n\n${DOK}\n\nSuma każdych trzech kolejnych liczb naturalnych jest liczbą podzielną przez`,
      opcje: ["$2$", "$3$", "$5$", "$6$"],
      poprawna: 1 },
    { nr: "9", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: `Dane są cztery wyrażenia arytmetyczne:\n\nI. $1 - 2\\frac{2}{3} \\cdot 3$  II. $3{,}4 - 2\\frac{1}{4}$  III. $3\\frac{3}{4} - 4{,}25$  IV. $6 : 1{,}2$\n\n${DOK}\n\nLiczbami całkowitymi są wartości wyrażeń`,
      opcje: ["I oraz II", "II oraz III", "I oraz IV", "III oraz IV"],
      poprawna: 2 },
  ],
};
