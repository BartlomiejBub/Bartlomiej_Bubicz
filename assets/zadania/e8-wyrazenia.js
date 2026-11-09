// Zadania do ćwiczeń – Wyrażenia i równania (szkoła podstawowa): jednomiany, podział w stosunku, równanie z procentami.
// Ułożone dla strony. Format jak arkusz (opis w tools/test-arkusze.mjs).
export default {
  nazwa: "Zadania do ćwiczeń – Wyrażenia i równania",
  zadania: [
    {
      nr: "1", dzial: "e8-wyrazenia", temat: "przeksztalcanie",
      tresc: "Współczynnikiem jednomianu $-7a^2b$ jest liczba. **Wybierz właściwą odpowiedź.**",
      opcje: ["$7$", "$-7$", "$-7a$", "$a^2b$"],
      poprawna: 1,
    },
    {
      nr: "2", dzial: "e8-wyrazenia", temat: "przeksztalcanie",
      tresc: "Iloczyn $3x \\cdot 2x^2$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$5x^3$", "$6x^2$", "$6x^3$", "$5x^2$"],
      poprawna: 2,
    },
  ],
  otwarte: [
    {
      nr: "3", dzial: "e8-wyrazenia", temat: "proporcje", punkty: 2,
      tresc: "Trzy osoby podzieliły między siebie $360$ zł w stosunku $2 : 3 : 4$. Ile złotych dostała każda z nich? **Zapisz obliczenia.**",
      rozwiazanie: "Liczba wszystkich części: $2 + 3 + 4 = 9$.\n\nJedna część to $360 : 9 = 40$ zł.\n\nPierwsza osoba: $2 \\cdot 40 = 80$ zł, druga: $3 \\cdot 40 = 120$ zł, trzecia: $4 \\cdot 40 = 160$ zł.\n\nSprawdzenie: $80 + 120 + 160 = 360$.\n\nOdpowiedź: Osoby dostały odpowiednio $80$ zł, $120$ zł i $160$ zł.",
    },
    {
      nr: "4", dzial: "e8-wyrazenia", temat: "zadania-z-rownaniem", punkty: 2,
      tresc: "Po obniżce o $20\\%$ buty kosztują $96$ zł. Zapisz równanie, w którym $x$ oznacza cenę butów przed obniżką, i oblicz tę cenę. **Zapisz obliczenia.**",
      rozwiazanie: "Niech $x$ oznacza cenę przed obniżką w złotych.\n\nPo obniżce o $20\\%$ zostaje $80\\%$ ceny, więc cena po obniżce to $0{,}8x$.\n\nRównanie: $0{,}8x = 96$.\n\nStąd $x = 96 : 0{,}8 = 120$.\n\nSprawdzenie: $20\\%$ ze $120$ zł to $24$ zł, a $120 - 24 = 96$ zł.\n\nOdpowiedź: Przed obniżką buty kosztowały $120$ zł.",
    },
    {
      nr: "5", dzial: "e8-wyrazenia", temat: "przeksztalcanie", punkty: 2,
      tresc: "Uprość wyrażenie $3x \\cdot 2x^2 - 4x \\cdot x^2 + x$ i oblicz jego wartość dla $x = 2$. **Zapisz obliczenia.**",
      rozwiazanie: "Mnożę jednomiany: $3x \\cdot 2x^2 = 6x^3$ i $4x \\cdot x^2 = 4x^3$.\n\nWyrażenie ma postać $6x^3 - 4x^3 + x$.\n\nŁączę wyrazy podobne: $6x^3 - 4x^3 = 2x^3$, więc wynik to $2x^3 + x$.\n\nDla $x = 2$: $2 \\cdot 2^3 + 2 = 2 \\cdot 8 + 2 = 18$.\n\nOdpowiedź: $2x^3 + x$, a dla $x = 2$ wartość wyrażenia to $18$.",
    },
  ],
};
