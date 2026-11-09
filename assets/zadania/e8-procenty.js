// Zadania do ćwiczeń – Procenty i obliczenia praktyczne (szkoła podstawowa): VAT, rabat, prowizja, lokata i podatek od odsetek.
// Ułożone dla strony. Format jak arkusz (opis w tools/test-arkusze.mjs).
export default {
  nazwa: "Zadania do ćwiczeń – Procenty i obliczenia praktyczne",
  zadania: [
    {
      nr: "1", dzial: "e8-procenty", temat: "podwyzki-obnizki",
      tresc: "Cena netto pralki wynosi $150$ zł. Do tej ceny doliczono VAT w wysokości $23\\%$. Cena brutto pralki jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$173$ zł", "$184{,}50$ zł", "$34{,}50$ zł", "$150{,}23$ zł"],
      poprawna: 1,
    },
    {
      nr: "2", dzial: "e8-procenty", temat: "podwyzki-obnizki",
      tresc: "Pan Paweł wpłacił na roczną lokatę $3000$ zł przy oprocentowaniu $5\\%$ w skali roku. Od odsetek bank pobrał podatek $19\\%$. Po roku na koncie było. **Wybierz właściwą odpowiedź.**",
      opcje: ["$3150$ zł", "$3028{,}50$ zł", "$2878{,}50$ zł", "$3121{,}50$ zł"],
      poprawna: 3,
    },
  ],
  otwarte: [
    {
      nr: "3", dzial: "e8-procenty", temat: "podwyzki-obnizki", punkty: 2,
      tresc: "Telewizor kosztuje w sklepie $1845$ zł brutto. Cena brutto zawiera VAT w wysokości $23\\%$ ceny netto. Oblicz cenę netto telewizora i kwotę VAT. **Zapisz obliczenia.**",
      rozwiazanie: "Cena brutto to $123\\%$ ceny netto, czyli $1{,}23$ raza tyle.\n\nCena netto: $1845 : 1{,}23 = 1500$ zł.\n\nKwota VAT: $1845 - 1500 = 345$ zł.\n\nSprawdzenie: $23\\%$ z $1500$ to $0{,}23 \\cdot 1500 = 345$ zł.\n\nOdpowiedź: Cena netto to $1500$ zł, a VAT to $345$ zł.",
    },
    {
      nr: "4", dzial: "e8-procenty", temat: "podwyzki-obnizki", punkty: 3,
      tresc: "Rower kosztował $1200$ zł. Sklep obniżył jego cenę o $15\\%$ (rabat). Pośrednik, który sprzedał rower, dostał prowizję w wysokości $4\\%$ ceny po rabacie. Oblicz cenę roweru po rabacie i kwotę prowizji. **Zapisz obliczenia.**",
      rozwiazanie: "Rabat to $15\\%$ z $1200$ zł: $0{,}15 \\cdot 1200 = 180$ zł.\n\nCena po rabacie: $1200 - 180 = 1020$ zł (albo $1200 \\cdot 0{,}85 = 1020$ zł).\n\nProwizja to $4\\%$ ceny po rabacie: $0{,}04 \\cdot 1020 = 40{,}80$ zł.\n\nOdpowiedź: Cena po rabacie to $1020$ zł, a prowizja wynosi $40{,}80$ zł.",
    },
  ],
};
