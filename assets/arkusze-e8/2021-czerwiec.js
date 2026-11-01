// Egzamin ósmoklasisty czerwiec 2021 (dodatkowy, CKE) – zadania zamknięte przepisane z arkusza, przypisane do działów egzaminu ósmoklasisty (pole dzial).
const UZ = "**Uzupełnij zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";

export default {
  nazwa: "Egzamin ósmoklasisty czerwiec 2021 (dodatkowy)",
  zadania: [
    { nr: "2", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: "Poniżej zapisano trzy liczby:\n\n$p = \\frac{27 \\cdot 9}{27 + 9}$\n\n$r = \\frac{27 + 9}{27 - 9}$\n\n$s = \\frac{27 - 9}{27 : 9}$\n\n**Który zapis przedstawia poprawnie uporządkowane liczby** $p, r, s$ **od najmniejszej do największej? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$s, r, p$", "$r, s, p$", "$s, p, r$", "$r, p, s$"],
      poprawna: 1 },
    { nr: "3", dzial: "e8-liczby", temat: "dzielniki",
      tresc: `Dane są liczby: $3321$, $1764$, $6114$, $2936$, $1452$, $1627$.\n\n${UZ}`,
      czesci: [
        { tekst: "Wśród danych liczb są dokładnie … liczby podzielne przez $3$.", litery: "AB", opcje: ["trzy", "cztery"], poprawna: 1 },
        { tekst: "Wśród danych liczb są dokładnie … liczby podzielne przez $4$.", litery: "CD", opcje: ["dwie", "trzy"], poprawna: 1 },
      ] },
    { nr: "4", dzial: "e8-liczby", temat: "ulamki-i-rozwiniecia",
      tresc: "Dane są cztery wyrażenia:\n\nI. $-16{,}55 + 6{,}05$\n\nII. $-5\\frac{3}{4} - 4{,}75$\n\nIII. $\\frac{2}{3} \\cdot \\left(-15\\frac{1}{4}\\right)$\n\nIV. $(-1{,}5) : \\frac{1}{7}$\n\n**Wartość którego wyrażenia nie jest równa** $\\left(-10\\frac{1}{2}\\right)$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["I", "II", "III", "IV"],
      poprawna: 2 },
    { nr: "5", dzial: "e8-liczby", temat: "potegi",
      tresc: UZ,
      czesci: [
        { tekst: "Wartość wyrażenia $\\frac{27^6}{3^6}$ jest równa …", litery: "AB", opcje: ["$3^2$", "$3^{12}$"], poprawna: 1 },
        { tekst: "Wartość wyrażenia $\\frac{25^8}{5^4}$ jest równa …", litery: "CD", opcje: ["$5^4$", "$5^{12}$"], poprawna: 1 },
      ] },
    { nr: "6", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: "Dane są cztery liczby:\n\n$a = (-2)^2$\n\n$b = \\sqrt{9 + 16}$\n\n$c = \\frac{1}{2}(3 - 5)^2$\n\n$d = \\sqrt{\\frac{25}{4}}$\n\n**Które zdanie jest fałszywe? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["Wszystkie liczby są dodatnie.", "Liczba $b$ jest większa niż liczba $c$.", "Liczba $c$ jest dwa razy mniejsza niż liczba $a$.", "Liczba $d$ jest $2$ razy mniejsza niż liczba $b$.", "Liczba $c$ jest większa niż liczba $d$."],
      poprawna: 4 },
    { nr: "9", dzial: "e8-liczby", temat: "os-liczbowa",
      tresc: `Dane są trzy liczby $a$, $b$ i $c$.\n\n${UZ}`,
      czesci: [
        { tekst: "Gdy $a + b + c = -1$ oraz $a$ jest liczbą mniejszą od $(-1)$, to suma $(b + c)$ jest …", litery: "AB", opcje: ["dodatnia", "ujemna"], poprawna: 0 },
        { tekst: "Gdy $a \\cdot b \\cdot c = 1$ oraz $a$ jest liczbą większą od zera, to iloczyn $(b \\cdot c)$ jest …", litery: "CD", opcje: ["dodatni", "ujemny"], poprawna: 0 },
      ] },
  ],
};
