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
    // ---- liczba z danego procentu ----
    {
      nr: "5", dzial: "e8-procenty", temat: "liczba-z-procentu",
      tresc: "$35\\%$ pewnej liczby jest równe $56$. Jaka to liczba? **Wybierz właściwą odpowiedź.**",
      opcje: ["$19{,}6$", "$91$", "$160$", "$1960$"],
      poprawna: 2,
    },
    {
      nr: "6", dzial: "e8-procenty", temat: "liczba-z-procentu",
      tresc: "Do kina poszło $30$ uczniów, co stanowi $60\\%$ wszystkich uczniów klas szóstych. Ilu uczniów klas szóstych nie poszło do kina? **Wybierz właściwą odpowiedź.**",
      opcje: ["$12$", "$20$", "$50$", "$80$"],
      poprawna: 1,
    },
    // ---- jednostki miary ----
    {
      nr: "8", dzial: "e8-procenty", temat: "jednostki",
      tresc: "Pole działki wynosi $0{,}35$ ha. Ile to metrów kwadratowych? **Wybierz właściwą odpowiedź.**",
      opcje: ["$35 \\text{ m}^2$", "$350 \\text{ m}^2$", "$3500 \\text{ m}^2$", "$35\\,000 \\text{ m}^2$"],
      poprawna: 2,
    },
    {
      nr: "9", dzial: "e8-procenty", temat: "jednostki",
      tresc: "Który zapis jest równy $3$ kg $7$ dag? **Wybierz właściwą odpowiedź.**",
      opcje: ["$3{,}07$ kg", "$3{,}7$ kg", "$3{,}007$ kg", "$37$ kg"],
      poprawna: 0,
    },
    // ---- skala i plan ----
    {
      nr: "12", dzial: "e8-procenty", temat: "skala",
      tresc: "Na mapie w skali $1:25\\,000$ odległość między dwiema wsiami wynosi $6$ cm. Jaka jest rzeczywista odległość między tymi wsiami? **Wybierz właściwą odpowiedź.**",
      opcje: ["$150$ m", "$1{,}5$ km", "$15$ km", "$150$ km"],
      poprawna: 1,
    },
    {
      nr: "13", dzial: "e8-procenty", temat: "skala",
      tresc: "Boisko szkolne ma $60$ m długości. Jaką długość będzie miało na planie narysowanym w skali $1:400$? **Wybierz właściwą odpowiedź.**",
      opcje: ["$1{,}5$ cm", "$150$ cm", "$24\\,000$ cm", "$15$ cm"],
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
    // ---- liczba z danego procentu ----
    {
      nr: "7", dzial: "e8-procenty", temat: "liczba-z-procentu", punkty: 2,
      tresc: "Tomek odłożył $135$ zł, co stanowi $45\\%$ ceny hulajnogi. Ile kosztuje hulajnoga? Ile złotych brakuje jeszcze Tomkowi? **Zapisz obliczenia.**",
      rozwiazanie: "Znamy część ($135$ zł to $45\\%$ ceny), a szukamy całości ($100\\%$).\n\nNajpierw $1\\%$ ceny: $135 : 45 = 3$ zł.\n\nCała cena to $100\\%$: $3 \\cdot 100 = 300$ zł.\n\nBrakuje: $300 - 135 = 165$ zł.\n\nSprawdzenie: brakująca część to $100\\% - 45\\% = 55\\%$ ceny, a $0{,}55 \\cdot 300 = 165$ zł.\n\nOdpowiedź: Hulajnoga kosztuje $300$ zł, a Tomkowi brakuje jeszcze $165$ zł.",
    },
    // ---- jednostki miary ----
    {
      nr: "10", dzial: "e8-procenty", temat: "jednostki", punkty: 2,
      tresc: "Zbiornik na deszczówkę ma kształt prostopadłościanu o wymiarach $2$ m, $1{,}5$ m i $0{,}8$ m. Oblicz jego objętość w metrach sześciennych i pojemność w litrach. Ile wiader o pojemności $10$ l potrzeba, żeby napełnić zbiornik do pełna? **Zapisz obliczenia.**",
      rozwiazanie: "Objętość to iloczyn trzech wymiarów: $2 \\cdot 1{,}5 = 3$, a $3 \\cdot 0{,}8 = 2{,}4$, czyli $V = 2{,}4 \\text{ m}^3$.\n\nWiemy, że $1 \\text{ m}^3 = 1000$ l, więc pojemność to $2{,}4 \\cdot 1000 = 2400$ l.\n\nLiczba wiader: $2400 : 10 = 240$.\n\nOdpowiedź: Objętość zbiornika to $2{,}4 \\text{ m}^3$, czyli $2400$ l. Potrzeba $240$ wiader.",
    },
    {
      nr: "11", dzial: "e8-procenty", temat: "jednostki", punkty: 2,
      tresc: "Pani Ala kupiła $2$ kg $15$ dag jabłek, $75$ dag śliwek i $0{,}5$ kg moreli. Ile kilogramów owoców kupiła razem? Do torby wolno włożyć najwyżej $4$ kg. Ile dekagramów owoców jeszcze się zmieści? **Zapisz obliczenia.**",
      rozwiazanie: "Zamieniamy wszystko na dekagramy: $2$ kg $15$ dag $= 200 + 15 = 215$ dag, a $0{,}5$ kg $= 50$ dag.\n\nRazem: $215 + 75 + 50 = 340$ dag, czyli $3{,}4$ kg.\n\nTorba mieści $4$ kg $= 400$ dag, więc zmieści się jeszcze $400 - 340 = 60$ dag.\n\nOdpowiedź: Pani Ala kupiła razem $3{,}4$ kg owoców. Do torby zmieści się jeszcze $60$ dag.",
    },
    // ---- skala i plan ----
    {
      nr: "14", dzial: "e8-procenty", temat: "skala", punkty: 2,
      tresc: "Model statku ma $40$ cm długości, a prawdziwy statek ma $24$ m. W jakiej skali wykonano model? Jaką wysokość ma maszt prawdziwego statku, jeśli maszt na modelu ma $25$ cm? **Zapisz obliczenia.**",
      rozwiazanie: "Zamieniamy długość statku na centymetry: $24$ m $= 2400$ cm.\n\nDzielimy długość w rzeczywistości przez długość modelu: $2400 : 40 = 60$. Skala modelu to $1:60$.\n\nMaszt na modelu ma $25$ cm, więc w rzeczywistości $25 \\cdot 60 = 1500$ cm $= 15$ m.\n\nOdpowiedź: Model wykonano w skali $1:60$, a maszt prawdziwego statku ma $15$ m wysokości.",
    },
    {
      nr: "15", dzial: "e8-procenty", temat: "skala", punkty: 3,
      tresc: "Plan działki narysowano w skali $1:500$. Na planie działka ma kształt prostokąta o wymiarach $8$ cm i $5$ cm. Oblicz rzeczywiste wymiary działki w metrach, jej pole w metrach kwadratowych oraz długość siatki potrzebnej do ogrodzenia całej działki. **Zapisz obliczenia.**",
      rozwiazanie: "Z planu do rzeczywistości mnożymy przez $500$.\n\nPierwszy bok: $8 \\cdot 500 = 4000$ cm $= 40$ m.\n\nDrugi bok: $5 \\cdot 500 = 2500$ cm $= 25$ m.\n\nPole działki: $40 \\cdot 25 = 1000 \\text{ m}^2$.\n\nDługość ogrodzenia to obwód: $2 \\cdot (40 + 25) = 2 \\cdot 65 = 130$ m.\n\nOdpowiedź: Działka ma wymiary $40$ m na $25$ m i pole $1000 \\text{ m}^2$. Potrzeba $130$ m siatki.",
    },
  ],
};
