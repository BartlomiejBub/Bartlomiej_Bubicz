// Zadania do ćwiczeń – Bryły (szkoła podstawowa): przekątne i wysokości w bryłach (twierdzenie Pitagorasa).
// Ułożone dla strony. Format jak arkusz (opis w tools/test-arkusze.mjs).
export default {
  nazwa: "Zadania do ćwiczeń – Bryły",
  zadania: [
    // ---- przekątne i wysokości w bryłach ----
    {
      nr: "1", dzial: "e8-bryly", temat: "przekatne-wysokosci",
      tresc: "Jedna ze ścian prostopadłościanu jest prostokątem o bokach $9$ cm i $12$ cm. Jaką długość ma przekątna tej ściany? **Wybierz właściwą odpowiedź.**",
      opcje: ["$21$ cm", "$\\sqrt{21}$ cm", "$225$ cm", "$15$ cm"],
      poprawna: 3,
    },
    {
      nr: "2", dzial: "e8-bryly", temat: "przekatne-wysokosci",
      tresc: "Podstawą prostopadłościanu jest kwadrat o boku $4$ cm, a wysokość prostopadłościanu to $7$ cm. Jaką długość ma przekątna tego prostopadłościanu? **Wybierz właściwą odpowiedź.**",
      opcje: ["$4\\sqrt{2}$ cm", "$15$ cm", "$9$ cm", "$\\sqrt{65}$ cm"],
      poprawna: 2,
    },
    {
      nr: "3", dzial: "e8-bryly", temat: "przekatne-wysokosci",
      tresc: "Ostrosłup prawidłowy czworokątny ma w podstawie kwadrat o boku $12$ cm. Wysokość tego ostrosłupa jest równa $8$ cm. Jaką długość ma wysokość ściany bocznej? **Wybierz właściwą odpowiedź.**",
      opcje: ["$10$ cm", "$14$ cm", "$2\\sqrt{7}$ cm", "$4\\sqrt{13}$ cm"],
      poprawna: 0,
    },
  ],
  otwarte: [
    {
      nr: "4", dzial: "e8-bryly", temat: "przekatne-wysokosci", punkty: 2,
      tresc: "Przekątna ściany sześcianu ma długość $7\\sqrt{2}$ cm. Oblicz długość krawędzi tego sześcianu i długość przekątnej sześcianu. **Zapisz obliczenia.**",
      rozwiazanie: "Przekątna ściany sześcianu o krawędzi $a$ ma długość $a\\sqrt{2}$.\n\nZ treści: $a\\sqrt{2} = 7\\sqrt{2}$, więc $a = 7$ cm.\n\nPrzekątna sześcianu ma długość $a\\sqrt{3}$, czyli $7\\sqrt{3}$ cm.\n\nSprawdzenie przez Pitagorasa: $D^{2} = 7^{2} + 7^{2} + 7^{2} = 147$, a $(7\\sqrt{3})^{2} = 49 \\cdot 3 = 147$.\n\nOdpowiedź: Krawędź sześcianu ma $7$ cm, a jego przekątna $7\\sqrt{3}$ cm.",
    },
    {
      nr: "5", dzial: "e8-bryly", temat: "przekatne-wysokosci", punkty: 3,
      tresc: "Pudełko ma wymiary $6$ cm, $8$ cm i $24$ cm. Oblicz długość najdłuższego patyka, który można w nim całkowicie schować. Czy do tego pudełka zmieści się patyk długości $25$ cm? A patyk długości $27$ cm? **Zapisz obliczenia.**",
      rozwiazanie: "Najdłuższy patyk leży wzdłuż przekątnej pudełka. Liczymy ją w dwóch krokach.\n\nPrzekątna podstawy $6 \\times 8$: $d^{2} = 6^{2} + 8^{2} = 36 + 64 = 100$, więc $d = 10$ cm.\n\nPrzekątna pudełka (trójkąt prostokątny z przyprostokątnymi $d = 10$ cm i $24$ cm): $D^{2} = 10^{2} + 24^{2} = 100 + 576 = 676$, więc $D = 26$ cm.\n\nPatyk długości $25$ cm jest krótszy niż $26$ cm, więc się zmieści. Patyk długości $27$ cm jest dłuższy niż $26$ cm, więc się nie zmieści.\n\nOdpowiedź: Najdłuższy patyk ma $26$ cm. Patyk $25$ cm się zmieści, a patyk $27$ cm nie.",
    },
    {
      nr: "6", dzial: "e8-bryly", temat: "przekatne-wysokosci", punkty: 3,
      tresc: "Ostrosłup prawidłowy czworokątny ma w podstawie kwadrat o boku $14$ cm. Wysokość jego ściany bocznej ma $25$ cm. Oblicz wysokość tego ostrosłupa oraz jego objętość. **Zapisz obliczenia.**",
      rozwiazanie: "Wysokość ostrosłupa $H$, połowa krawędzi podstawy $\\frac{a}{2}$ i wysokość ściany bocznej $h$ tworzą trójkąt prostokątny. Przeciwprostokątna to $h = 25$ cm.\n\nPołowa krawędzi podstawy: $\\frac{14}{2} = 7$ cm.\n\nSzukamy przyprostokątnej, więc odejmujemy: $H^{2} = 25^{2} - 7^{2} = 625 - 49 = 576$, czyli $H = 24$ cm.\n\nPole podstawy: $14 \\cdot 14 = 196$ cm$^{2}$.\n\nObjętość: $V = \\frac{1}{3} \\cdot 196 \\cdot 24 = 196 \\cdot 8 = 1568$ cm$^{3}$.\n\nOdpowiedź: Wysokość ostrosłupa to $24$ cm, a objętość to $1568$ cm$^{3}$.",
    },
  ],
};
