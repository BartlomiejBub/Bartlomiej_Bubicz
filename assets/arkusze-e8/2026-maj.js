// Egzamin ósmoklasisty maj 2026 (CKE, wersja X) – zadania zamknięte z działu „Liczby i działania” przepisane z arkusza.
const DOK = "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**";
const UZ = "**Uzupełnij zdania. Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.**";

export default {
  nazwa: "Egzamin ósmoklasisty maj 2026",
  zadania: [
    { nr: "2", dzial: "e8-liczby", temat: "dzielniki",
      tresc: "Ola otwiera swoją szafkę za pomocą czterocyfrowego kodu $YXXY$, gdzie $X$ jest największym wspólnym dzielnikiem liczb $18$ i $27$, a $Y$ jest najmniejszą wspólną wielokrotnością liczb $2$ i $4$.\n\n**Jaki jest kod do otwarcia szafki Oli? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$4334$", "$4994$", "$8338$", "$8998$"],
      poprawna: 1 },
    { nr: "3", dzial: "e8-liczby", temat: "pierwiastki",
      tresc: "Dane są cztery liczby:\n\n$w = \\sqrt{100 - 64} - 2$\n\n$x = 12 - \\sqrt{64 + 36}$\n\n$y = \\sqrt{25 - 16} - 3$\n\n$z = 7 - \\sqrt{9 + 16}$\n\n**Która z tych liczb jest równa** $0$**? Wybierz właściwą odpowiedź spośród podanych.**",
      opcje: ["$w$", "$x$", "$y$", "$z$"],
      poprawna: 2 },
    { nr: "4", dzial: "e8-liczby", temat: "potegi",
      tresc: `${DOK}\n\nWartość wyrażenia $2^5 \\cdot 3 \\cdot 3^4 \\cdot 2^3$ jest równa wartości wyrażenia`,
      opcje: ["$2^8 \\cdot 3^5$", "$4^8 \\cdot 9^5$", "$2^{15} \\cdot 3^4$", "$4^{15} \\cdot 9^4$"],
      poprawna: 0 },
    { nr: "6", dzial: "e8-liczby", temat: "dzielniki",
      tresc: `W pudełku było jedenaście kul ponumerowanych kolejnymi liczbami naturalnymi od $1$ do $11$. Z tego pudełka wylosowano pięć kul. Suma liczb na dowolnych dwóch kulach, które pozostały w pudełku, jest parzysta.\n\n${UZ}`,
      czesci: [
        { tekst: "Po losowaniu w pudełku zostały wyłącznie kule ponumerowane liczbami …", litery: "AB", opcje: ["nieparzystymi", "parzystymi"], poprawna: 0 },
        { tekst: "Suma liczb na pięciu wylosowanych kulach jest równa …", litery: "CD", opcje: ["$30$", "$36$"], poprawna: 0 },
      ] },
  ],
};
