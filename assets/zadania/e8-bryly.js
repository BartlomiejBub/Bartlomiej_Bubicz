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
    // ---- graniastosłupy ----
    {
      nr: "7", dzial: "e8-bryly", temat: "graniastoslupy",
      tresc: "Wymiary czterech prostopadłościanów podano w centymetrach. Który z nich jest graniastosłupem prawidłowym? **Wybierz właściwą odpowiedź.**",
      opcje: ["$2 \\times 5 \\times 7$", "$3 \\times 3 \\times 8$", "$4 \\times 6 \\times 9$", "$3 \\times 5 \\times 6$"],
      poprawna: 1,
    },
    {
      nr: "8", dzial: "e8-bryly", temat: "graniastoslupy",
      tresc: "Ola zrobiła z drutu o długości $1$ m szkielet prostopadłościanu. Podstawa tego prostopadłościanu ma wymiary $10$ cm i $8$ cm, a cały drut został zużyty. Jaką wysokość ma ten prostopadłościan? **Wybierz właściwą odpowiedź.**",
      opcje: ["$25$ cm", "$28$ cm", "$82$ cm", "$7$ cm"],
      poprawna: 3,
    },
    // ---- ostrosłupy ----
    {
      nr: "11", dzial: "e8-bryly", temat: "ostroslupy",
      tresc: "Ostrosłup ma $14$ krawędzi. Ile ścian ma ten ostrosłup? **Wybierz właściwą odpowiedź.**",
      opcje: ["$7$", "$9$", "$8$", "$15$"],
      poprawna: 2,
    },
    {
      nr: "12", dzial: "e8-bryly", temat: "ostroslupy",
      tresc: "Z patyków zrobiono szkielet prawidłowego ostrosłupa sześciokątnego. Krawędź podstawy ma $4$ cm, a krawędź boczna $7$ cm. Jaka jest suma długości wszystkich krawędzi tego ostrosłupa? **Wybierz właściwą odpowiedź.**",
      opcje: ["$66$ cm", "$33$ cm", "$11$ cm", "$132$ cm"],
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
    // ---- graniastosłupy ----
    {
      nr: "9", dzial: "e8-bryly", temat: "graniastoslupy", punkty: 2,
      tresc: "Pudełko po czekoladzie ma kształt graniastosłupa prawidłowego trójkątnego. Krawędź podstawy ma $5$ cm, a krawędź boczna $20$ cm. Ile ścian, krawędzi i wierzchołków ma to pudełko? Ile centymetrów kolorowej taśmy potrzeba, żeby okleić wszystkie jego krawędzie? **Zapisz obliczenia.**",
      rozwiazanie: "W podstawie jest trójkąt, więc podstawa ma $n = 3$ boki.\n\nŚciany: $n + 2 = 5$ (dwie podstawy i trzy ściany boczne). Krawędzie: $3n = 9$. Wierzchołki: $2n = 6$.\n\nKrawędzie podstaw: dwa trójkąty równoboczne, każdy o obwodzie $3 \\cdot 5 = 15$ cm, razem $2 \\cdot 15 = 30$ cm.\n\nKrawędzie boczne: trzy krawędzie po $20$ cm, razem $3 \\cdot 20 = 60$ cm.\n\nTaśma: $30 + 60 = 90$ cm.\n\nOdpowiedź: Pudełko ma $5$ ścian, $9$ krawędzi i $6$ wierzchołków. Potrzeba $90$ cm taśmy.",
    },
    {
      nr: "10", dzial: "e8-bryly", temat: "graniastoslupy", punkty: 2,
      tresc: "Graniastosłup ma $21$ krawędzi. Jaki wielokąt jest jego podstawą? Ile ścian i ile wierzchołków ma ten graniastosłup? Czy istnieje graniastosłup, który ma $20$ krawędzi? **Zapisz obliczenia.**",
      rozwiazanie: "Graniastosłup, którego podstawa ma $n$ boków, ma $3n$ krawędzi.\n\nZ treści: $3n = 21$, więc $n = 21 : 3 = 7$. Podstawą jest siedmiokąt.\n\nŚciany: $n + 2 = 9$. Wierzchołki: $2n = 14$.\n\nDla $20$ krawędzi musiałoby być $3n = 20$, ale $20$ nie dzieli się przez $3$ (wychodzi $n = 6\\frac{2}{3}$, a liczba boków jest całkowita). Taki graniastosłup nie istnieje.\n\nOdpowiedź: Podstawą jest siedmiokąt, graniastosłup ma $9$ ścian i $14$ wierzchołków. Graniastosłup o $20$ krawędziach nie istnieje.",
    },
    // ---- ostrosłupy ----
    {
      nr: "13", dzial: "e8-bryly", temat: "ostroslupy", punkty: 2,
      tresc: "Z drutu zrobiono szkielet czworościanu foremnego o krawędzi $9$ cm oraz szkielet prawidłowego ostrosłupa czworokątnego o krawędzi podstawy $6$ cm i krawędzi bocznej $9$ cm. Ile centymetrów drutu zużyto na każdy z tych szkieletów? Który z nich wymaga więcej drutu i o ile centymetrów? **Zapisz obliczenia.**",
      rozwiazanie: "Czworościan foremny ma $6$ równych krawędzi po $9$ cm: $6 \\cdot 9 = 54$ cm.\n\nOstrosłup czworokątny ma $4$ krawędzie podstawy po $6$ cm i $4$ krawędzie boczne po $9$ cm: $4 \\cdot 6 + 4 \\cdot 9 = 24 + 36 = 60$ cm.\n\nRóżnica: $60 - 54 = 6$ cm.\n\nOdpowiedź: Na czworościan zużyto $54$ cm drutu, a na ostrosłup $60$ cm. Szkielet ostrosłupa wymaga o $6$ cm więcej drutu.",
    },
  ],
};
