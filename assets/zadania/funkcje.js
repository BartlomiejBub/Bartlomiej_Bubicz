// Zadania do ćwiczeń – Funkcje i ciągi (LO): własności funkcji, funkcja liniowa i kwadratowa, funkcja homograficzna,
// równania wykładnicze i logarytmiczne, ciągi rekurencyjne. Ułożone dla strony. Format jak arkusz (tools/test-arkusze.mjs).
export default {
  nazwa: "Zadania do ćwiczeń – Funkcje i ciągi",
  zadania: [
    // ---- własności funkcji ----
    {
      nr: "1", dzial: "funkcje", temat: "wlasnosci-funkcji",
      tresc: "Pierwsza liczba w parze jest argumentem, a druga – wartością funkcji. Funkcją jest zbiór par. **Wybierz właściwą odpowiedź.**",
      opcje: ["$\\{(1, 2), (2, 3), (1, 4)\\}$", "$\\{(0, 1), (1, 2), (0, 2)\\}$", "$\\{(1, 5), (2, 5), (3, 5)\\}$", "$\\{(2, 1), (3, 1), (2, 3)\\}$"],
      poprawna: 2,
    },
    {
      nr: "2", dzial: "funkcje", temat: "wlasnosci-funkcji",
      tresc: "**Oceń prawdziwość podanych zdań.** Zaznacz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.",
      czesci: [
        { tekst: "Funkcja liniowa $f(x) = -3x + 2$ jest różnowartościowa.", litery: "PF", poprawna: 0 },
        { tekst: "Funkcja $g(x) = x^{2}$ jest różnowartościowa.", litery: "PF", poprawna: 1 },
        { tekst: "Prosta pionowa $x = 2$ może przecinać wykres funkcji w dwóch różnych punktach.", litery: "PF", poprawna: 1 },
      ],
    },
    {
      nr: "3", dzial: "funkcje", temat: "wlasnosci-funkcji",
      tresc: "Funkcja $f$ każdej liczbie naturalnej $n$ przyporządkowuje liczbę wszystkich dodatnich dzielników liczby $n$. Wartość $f(12)$ jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$6$", "$4$", "$5$", "$12$"],
      poprawna: 0,
    },
    {
      nr: "4", dzial: "funkcje", temat: "wlasnosci-funkcji",
      tresc: "Na rysunku przedstawiono wykresy funkcji $f$ (parabola) i $g$ (prosta). Wykresy przecinają się w punktach o pierwszych współrzędnych $-2$ i $3$.\n\n[rysunek]\n\nZbiorem rozwiązań nierówności $f(x) > g(x)$ jest. **Wybierz właściwą odpowiedź.**",
      opcje: ["$(-1, 3)$", "$(-\\infty, -2) \\cup (3, +\\infty)$", "$(-2, 3)$", "$(-\\infty, -1) \\cup (3, +\\infty)$"],
      poprawna: 1,
      rysunek: "assets/zadania/rys/funkcje-4.svg",
    },
    {
      nr: "5", dzial: "funkcje", temat: "wlasnosci-funkcji",
      tresc: "Punkt $(1, 4)$ leży na wykresie funkcji $f$. Wykres funkcji $g$ otrzymano, przesuwając wykres funkcji $f$ o wektor $[-2, 3]$. Na wykresie funkcji $g$ leży punkt. **Wybierz właściwą odpowiedź.**",
      opcje: ["$(3, 7)$", "$(-1, 1)$", "$(3, 1)$", "$(-1, 7)$"],
      poprawna: 3,
    },
    // ---- funkcja liniowa ----
    {
      nr: "9", dzial: "funkcje", temat: "funkcja-liniowa",
      tresc: "Za przejazd taksówką płacimy $8$ zł za wsiadanie oraz $2{,}50$ zł za każdy przejechany kilometr. Koszt przejazdu $x$ kilometrów opisuje wzór. **Wybierz właściwą odpowiedź.**",
      opcje: ["$K(x) = 8x + 2{,}5$", "$K(x) = 10{,}5x$", "$K(x) = 2{,}5x + 8$", "$K(x) = 2{,}5x - 8$"],
      poprawna: 2,
    },
    // ---- funkcja kwadratowa ----
    {
      nr: "12", dzial: "funkcje", temat: "funkcja-kwadratowa",
      tresc: "Wierzchołkiem paraboli będącej wykresem funkcji kwadratowej $f$ jest punkt $W = (2, -3)$, a wykres przechodzi przez punkt $(0, 1)$. Wzorem funkcji $f$ jest. **Wybierz właściwą odpowiedź.**",
      opcje: ["$f(x) = (x + 2)^{2} - 3$", "$f(x) = 2(x - 2)^{2} - 3$", "$f(x) = x^{2} + 4x + 1$", "$f(x) = x^{2} - 4x + 1$"],
      poprawna: 3,
    },
    {
      nr: "13", dzial: "funkcje", temat: "funkcja-kwadratowa",
      tresc: "Funkcja kwadratowa $f$ ma dwa miejsca zerowe: $-1$ i $5$. Jej wykres przechodzi przez punkt $(0, 10)$. Zbiorem wartości funkcji $f$ jest. **Wybierz właściwą odpowiedź.**",
      opcje: ["$[-18, +\\infty)$", "$(-\\infty, 10]$", "$(-\\infty, 18]$", "$[18, +\\infty)$"],
      poprawna: 2,
    },
    // ---- inne funkcje (logarytmiczna) ----
    {
      nr: "17", dzial: "funkcje", temat: "inne-funkcje",
      tresc: "Dziedziną funkcji $f(x) = \\log_{2}(x - 3) + 1$ jest zbiór. **Wybierz właściwą odpowiedź.**",
      opcje: ["$(-3, +\\infty)$", "$(1, +\\infty)$", "$(3, +\\infty)$", "$\\mathbb{R} \\setminus \\{3\\}$"],
      poprawna: 2,
    },
    // ---- funkcja homograficzna ----
    {
      nr: "19", dzial: "funkcje", temat: "funkcja-homograficzna",
      tresc: "Wykres funkcji $f(x) = \\frac{2x + 1}{x - 3}$ ma asymptoty o równaniach. **Wybierz właściwą odpowiedź.**",
      opcje: ["$x = -3$ i $y = 2$", "$x = 3$ i $y = 7$", "$x = 3$ i $y = 2$", "$x = 2$ i $y = 3$"],
      poprawna: 2,
    },
    {
      nr: "20", dzial: "funkcje", temat: "funkcja-homograficzna",
      tresc: "Dla funkcji $f(x) = \\frac{4}{x + 2} - 1$ dziedzina $D$ i zbiór wartości $ZW$ są równe. **Wybierz właściwą odpowiedź.**",
      opcje: ["$D = \\mathbb{R} \\setminus \\{2\\}$, $ZW = \\mathbb{R} \\setminus \\{1\\}$", "$D = \\mathbb{R} \\setminus \\{-2\\}$, $ZW = \\mathbb{R} \\setminus \\{-1\\}$", "$D = \\mathbb{R} \\setminus \\{-2\\}$, $ZW = \\mathbb{R} \\setminus \\{1\\}$", "$D = \\mathbb{R} \\setminus \\{-1\\}$, $ZW = \\mathbb{R} \\setminus \\{-2\\}$"],
      poprawna: 1,
    },
    {
      nr: "21", dzial: "funkcje", temat: "funkcja-homograficzna",
      tresc: "Dana jest funkcja $f(x) = -\\frac{3}{x - 1} + 2$. **Oceń prawdziwość podanych zdań.** Zaznacz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.",
      czesci: [
        { tekst: "Funkcja $f$ jest malejąca w przedziale $(1, +\\infty)$.", litery: "PF", poprawna: 1 },
        { tekst: "Punkt $(4, 1)$ należy do wykresu funkcji $f$.", litery: "PF", poprawna: 0 },
        { tekst: "Liczba $2$ należy do zbioru wartości funkcji $f$.", litery: "PF", poprawna: 1 },
      ],
    },
    // ---- równania wykładnicze i logarytmiczne ----
    {
      nr: "24", dzial: "funkcje", temat: "rownania-wykladnicze-logarytmiczne",
      tresc: "Rozwiązaniem równania $3^{2x - 1} = 27$ jest liczba. **Wybierz właściwą odpowiedź.**",
      opcje: ["$\\frac{3}{2}$", "$2$", "$4$", "$1$"],
      poprawna: 1,
    },
    {
      nr: "25", dzial: "funkcje", temat: "rownania-wykladnicze-logarytmiczne",
      tresc: "Zbiorem rozwiązań nierówności $\\left(\\frac{1}{3}\\right)^{x} < \\frac{1}{9}$ jest. **Wybierz właściwą odpowiedź.**",
      opcje: ["$(-\\infty, 2)$", "$(-2, +\\infty)$", "$(-\\infty, -2)$", "$(2, +\\infty)$"],
      poprawna: 3,
    },
    {
      nr: "26", dzial: "funkcje", temat: "rownania-wykladnicze-logarytmiczne",
      tresc: "Rozwiązaniem równania $\\log_{3}(2x - 1) = 2$ jest liczba. **Wybierz właściwą odpowiedź.**",
      opcje: ["$5$", "$\\frac{3}{2}$", "$\\frac{7}{2}$", "$10$"],
      poprawna: 0,
    },
    {
      nr: "27", dzial: "funkcje", temat: "rownania-wykladnicze-logarytmiczne",
      tresc: "Równanie $\\log_{2} x + \\log_{2}(x - 1) = 1$. **Wybierz właściwą odpowiedź.**",
      opcje: ["ma dwa rozwiązania: $-1$ i $2$", "nie ma rozwiązań", "ma dokładnie jedno rozwiązanie: $2$", "ma dokładnie jedno rozwiązanie: $-1$"],
      poprawna: 2,
    },
    // ---- ciągi rekurencyjne ----
    {
      nr: "31", dzial: "funkcje", temat: "wzor-ogolny",
      tresc: "Ciąg $(a_{n})$ jest określony wzorami $a_{1} = 2$ oraz $a_{n+1} = a_{n} + 3$ dla $n \\geq 1$. Piąty wyraz tego ciągu jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$11$", "$17$", "$15$", "$14$"],
      poprawna: 3,
    },
    {
      nr: "32", dzial: "funkcje", temat: "wzor-ogolny",
      tresc: "Ciąg $(a_{n})$ jest określony wzorami $a_{1} = 1$ oraz $a_{n+1} = 2a_{n} + 1$ dla $n \\geq 1$. Czwarty wyraz tego ciągu jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$15$", "$31$", "$16$", "$9$"],
      poprawna: 0,
    },
    // ---- inne funkcje (proporcjonalność odwrotna, wykładnicza) ----
    {
      nr: "34", dzial: "funkcje", temat: "inne-funkcje",
      tresc: "Wykres funkcji $f(x) = \\frac{a}{x}$ przechodzi przez punkt $(-4, 3)$. Wartość $f(6)$ jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$2$", "$-2$", "$-18$", "$-\\frac{1}{2}$"],
      poprawna: 1,
    },
    {
      nr: "35", dzial: "funkcje", temat: "inne-funkcje",
      tresc: "Dane są funkcje $g(x) = 2^{x} - 3$ oraz $h(x) = \\left(\\frac{1}{2}\\right)^{x}$. **Oceń prawdziwość podanych zdań.** Zaznacz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.",
      czesci: [
        { tekst: "Wykres funkcji $g$ przecina oś $Oy$ w punkcie $(0, -2)$.", litery: "PF", poprawna: 0 },
        { tekst: "Zbiór wartości funkcji $g$ jest równy $(0, +\\infty)$.", litery: "PF", poprawna: 1 },
        { tekst: "Punkt $(-2, 4)$ należy do wykresu funkcji $h$.", litery: "PF", poprawna: 0 },
      ],
    },
    // ---- funkcja homograficzna ----
    {
      nr: "38", dzial: "funkcje", temat: "funkcja-homograficzna",
      tresc: "W których punktach wykres funkcji $f(x) = \\frac{3x - 6}{x + 1}$ przecina osie układu współrzędnych? **Wybierz właściwą odpowiedź.**",
      opcje: ["$(-1, 0)$ i $(0, -6)$", "$(2, 0)$ i $(0, 6)$", "$(2, 0)$ i $(0, -6)$", "$(-2, 0)$ i $(0, -6)$"],
      poprawna: 2,
    },
  ],
  otwarte: [
    // ---- własności funkcji ----
    {
      nr: "6", dzial: "funkcje", temat: "wlasnosci-funkcji", punkty: 4,
      tresc: "Na rysunku przedstawiono wykres funkcji $f$. Jej dziedziną jest zbiór wszystkich liczb $x$, dla których wykres jest narysowany.\n\n[rysunek]\n\nOdczytaj z wykresu: a) dziedzinę i zbiór wartości funkcji, b) miejsca zerowe, c) przedziały, w których funkcja jest rosnąca, d) zbiór rozwiązań nierówności $f(x) > 0$. **Zapisz odpowiedzi.**",
      rysunek: "assets/zadania/rys/funkcje-6.svg",
      rozwiazanie: "a) Wykres zaczyna się w punkcie o pierwszej współrzędnej $-4$, a kończy w punkcie o pierwszej współrzędnej $5$ (końce są zaznaczone pełnymi kropkami). Dziedzina: $[-4, 5]$. Najniżej wykres sięga wysokości $-2$, a najwyżej $4$, i przyjmuje wszystkie wartości pomiędzy. Zbiór wartości: $[-2, 4]$.\n\nb) Wykres przecina oś poziomą w punktach $(0, 0)$ i $(4, 0)$. Miejsca zerowe: $0$ i $4$.\n\nc) Wykres idzie w górę od $x = -4$ do $x = -2$ oraz od $x = 3$ do $x = 5$. Między $-2$ a $1$ opada, a między $1$ a $3$ jest poziomy (funkcja jest stała). Funkcja jest rosnąca w przedziałach $[-4, -2]$ i $[3, 5]$.\n\nd) Wykres leży nad osią poziomą dla $x$ od $-4$ do $0$ (bez $0$) oraz od $4$ (bez $4$) do $5$. Zbiór rozwiązań: $[-4, 0) \\cup (4, 5]$.\n\nOdpowiedź: a) $D_{f} = [-4, 5]$, $ZW_{f} = [-2, 4]$; b) $0$ i $4$; c) $[-4, -2]$ i $[3, 5]$; d) $[-4, 0) \\cup (4, 5]$.",
    },
    {
      nr: "7", dzial: "funkcje", temat: "wlasnosci-funkcji", punkty: 2,
      tresc: "Dana jest funkcja $f(x) = 3x^{2} - 2x$. Oblicz $f(-2)$ oraz wyznacz wszystkie argumenty, dla których funkcja przyjmuje wartość $1$. **Zapisz obliczenia.**",
      rozwiazanie: "Wartość dla argumentu $-2$: $f(-2) = 3 \\cdot (-2)^{2} - 2 \\cdot (-2) = 3 \\cdot 4 + 4 = 16$.\n\nArgumenty, dla których $f(x) = 1$, spełniają równanie $3x^{2} - 2x = 1$, czyli $3x^{2} - 2x - 1 = 0$.\n\n$\\Delta = (-2)^{2} - 4 \\cdot 3 \\cdot (-1) = 4 + 12 = 16$, więc $\\sqrt{\\Delta} = 4$.\n\n$x_{1} = \\frac{2 - 4}{6} = -\\frac{1}{3}$ oraz $x_{2} = \\frac{2 + 4}{6} = 1$.\n\nOdpowiedź: $f(-2) = 16$, a wartość $1$ funkcja przyjmuje dla argumentów $-\\frac{1}{3}$ i $1$.",
    },
    {
      nr: "8", dzial: "funkcje", temat: "wlasnosci-funkcji", punkty: 2,
      tresc: "Wykres funkcji $f(x) = x^{2} - 4$ przesunięto o wektor $[3, -1]$ i otrzymano wykres funkcji $g$. Wyznacz wzór funkcji $g$ i jej miejsca zerowe. **Zapisz obliczenia.**",
      rozwiazanie: "Przesunięcie o wektor $[3, -1]$ to przesunięcie o $3$ w prawo i o $1$ w dół, więc $g(x) = f(x - 3) - 1$.\n\n$g(x) = (x - 3)^{2} - 4 - 1 = (x - 3)^{2} - 5$.\n\nMiejsca zerowe: $(x - 3)^{2} - 5 = 0$, czyli $(x - 3)^{2} = 5$, więc $x - 3 = \\sqrt{5}$ lub $x - 3 = -\\sqrt{5}$.\n\nOdpowiedź: $g(x) = (x - 3)^{2} - 5$, miejsca zerowe: $3 - \\sqrt{5}$ i $3 + \\sqrt{5}$.",
    },
    // ---- funkcja liniowa ----
    {
      nr: "10", dzial: "funkcje", temat: "funkcja-liniowa", punkty: 3,
      tresc: "Basen proponuje dwie oferty na miesiąc. Oferta A: opłata stała $60$ zł plus $5$ zł za każde wejście. Oferta B: bez opłaty stałej, ale $11$ zł za każde wejście. Zapisz wzory opisujące koszt w obu ofertach i oblicz, od ilu wejść w miesiącu oferta A jest tańsza od oferty B. **Zapisz obliczenia.**",
      rozwiazanie: "Niech $x$ oznacza liczbę wejść w miesiącu. Koszt w ofercie A: $K_{A}(x) = 5x + 60$. Koszt w ofercie B: $K_{B}(x) = 11x$.\n\nOferta A jest tańsza, gdy $5x + 60 < 11x$.\n\nPrzenosimy $5x$ na prawą stronę: $60 < 6x$, więc $x > 10$.\n\nPrzy $10$ wejściach obie oferty kosztują tyle samo: $K_{A}(10) = 110 = K_{B}(10)$. Liczba wejść jest całkowita, więc oferta A jest tańsza od $11$ wejść.\n\nOdpowiedź: $K_{A}(x) = 5x + 60$, $K_{B}(x) = 11x$; oferta A jest tańsza, gdy wejść jest co najmniej $11$.",
    },
    {
      nr: "11", dzial: "funkcje", temat: "funkcja-liniowa", punkty: 3,
      tresc: "W zbiorniku jest $120$ litrów wody. Od chwili $t = 0$ woda wypływa ze stałą szybkością $4$ litry na minutę. Zapisz wzór funkcji $V(t)$ opisującej ilość wody w zbiorniku po $t$ minutach, wyznacz jej dziedzinę (do chwili opróżnienia zbiornika) i oblicz, po ilu minutach w zbiorniku zostanie $36$ litrów wody. **Zapisz obliczenia.**",
      rozwiazanie: "Na początku jest $120$ l, a co minutę ubywa $4$ l, więc $V(t) = 120 - 4t$.\n\nZbiornik jest pusty, gdy $120 - 4t = 0$, czyli $t = 30$. Czas nie może być ujemny, więc dziedzina to $[0, 30]$.\n\nIlość $36$ l: $120 - 4t = 36$, więc $4t = 84$ i $t = 21$. Ta liczba należy do dziedziny.\n\nOdpowiedź: $V(t) = 120 - 4t$, dziedzina $[0, 30]$; $36$ litrów zostanie po $21$ minutach.",
    },
    // ---- funkcja kwadratowa ----
    {
      nr: "14", dzial: "funkcje", temat: "funkcja-kwadratowa", punkty: 3,
      tresc: "Wykres funkcji kwadratowej $f(x) = ax^{2} + bx + c$ przechodzi przez punkty $(0, -1)$, $(1, -2)$ i $(-1, 4)$. Wyznacz wzór tej funkcji. **Zapisz obliczenia.**",
      rozwiazanie: "Wstawiamy współrzędne każdego punktu do wzoru $f(x) = ax^{2} + bx + c$.\n\nPunkt $(0, -1)$: $c = -1$.\n\nPunkt $(1, -2)$: $a + b - 1 = -2$, więc $a + b = -1$.\n\nPunkt $(-1, 4)$: $a - b - 1 = 4$, więc $a - b = 5$.\n\nDodajemy dwa ostatnie równania: $2a = 4$, więc $a = 2$. Wtedy $b = -1 - 2 = -3$.\n\nSprawdzenie: $f(1) = 2 - 3 - 1 = -2$, $f(-1) = 2 + 3 - 1 = 4$.\n\nOdpowiedź: $f(x) = 2x^{2} - 3x - 1$.",
    },
    {
      nr: "15", dzial: "funkcje", temat: "funkcja-kwadratowa", punkty: 4,
      tresc: "Dana jest funkcja $f(x) = -x^{2} + 2x + 3$. Przygotuj dane do szkicu wykresu: wyznacz współrzędne wierzchołka, miejsca zerowe i punkt przecięcia z osią $Oy$. Następnie odczytaj z wykresu zbiór wartości, przedziały monotoniczności i zbiór rozwiązań nierówności $f(x) > 0$. **Zapisz obliczenia.**",
      rozwiazanie: "Współczynnik $a = -1 < 0$, więc ramiona paraboli skierowane są w dół.\n\nWierzchołek: $p = \\frac{-b}{2a} = \\frac{-2}{-2} = 1$, $q = f(1) = -1 + 2 + 3 = 4$. Zatem $W = (1, 4)$.\n\nMiejsca zerowe: $\\Delta = 2^{2} - 4 \\cdot (-1) \\cdot 3 = 16$, $x_{1} = \\frac{-2 - 4}{-2} = 3$, $x_{2} = \\frac{-2 + 4}{-2} = -1$.\n\nPrzecięcie z osią $Oy$: $f(0) = 3$, czyli punkt $(0, 3)$.\n\nSzkic: parabola z ramionami w dół, przechodząca przez punkty $(-1, 0)$, $(0, 3)$, $(1, 4)$, $(3, 0)$ (oraz symetryczny do $(0, 3)$ punkt $(2, 3)$).\n\nOdczyt: zbiór wartości to $(-\\infty, 4]$. Funkcja rośnie w $(-\\infty, 1]$ i maleje w $[1, +\\infty)$. Wykres leży nad osią poziomą między miejscami zerowymi, więc $f(x) > 0$ dla $x \\in (-1, 3)$.\n\nOdpowiedź: $W = (1, 4)$; miejsca zerowe $-1$ i $3$; przecięcie z osią $Oy$: $(0, 3)$; $ZW = (-\\infty, 4]$; rośnie w $(-\\infty, 1]$, maleje w $[1, +\\infty)$; $f(x) > 0$ dla $x \\in (-1, 3)$.",
    },
    {
      nr: "16", dzial: "funkcje", temat: "funkcja-kwadratowa", punkty: 2,
      tresc: "Osią symetrii wykresu funkcji kwadratowej $f$ jest prosta $x = 3$, a najmniejsza wartość funkcji jest równa $-2$. Wykres przechodzi przez punkt $(1, 6)$. Wyznacz wzór funkcji $f$ w postaci kanonicznej i ogólnej. **Zapisz obliczenia.**",
      rozwiazanie: "Oś symetrii $x = 3$ i najmniejsza wartość $-2$ oznaczają, że wierzchołek to $W = (3, -2)$ i ramiona idą w górę. Postać kanoniczna: $f(x) = a(x - 3)^{2} - 2$.\n\nPunkt $(1, 6)$: $6 = a(1 - 3)^{2} - 2 = 4a - 2$, więc $4a = 8$ i $a = 2$ (dodatnie, zgodnie z najmniejszą wartością).\n\nPostać kanoniczna: $f(x) = 2(x - 3)^{2} - 2$.\n\nPostać ogólna: $2(x^{2} - 6x + 9) - 2 = 2x^{2} - 12x + 16$.\n\nOdpowiedź: $f(x) = 2(x - 3)^{2} - 2 = 2x^{2} - 12x + 16$.",
    },
    // ---- inne funkcje (logarytmiczna) ----
    {
      nr: "18", dzial: "funkcje", temat: "inne-funkcje", punkty: 3,
      tresc: "Dana jest funkcja $g(x) = \\log_{3}(x + 2) - 1$. Podaj jej dziedzinę i równanie asymptoty pionowej wykresu. Oblicz miejsce zerowe oraz wartość $g(7)$. **Zapisz obliczenia.**",
      rozwiazanie: "Wyrażenie pod logarytmem ma być dodatnie: $x + 2 > 0$, czyli $x > -2$. Dziedzina: $(-2, +\\infty)$.\n\nWykres jest wykresem $y = \\log_{3} x$ przesuniętym o $2$ w lewo i o $1$ w dół. Asymptota pionowa przesuwa się razem z nim: $x = -2$.\n\nMiejsce zerowe: $\\log_{3}(x + 2) - 1 = 0$, więc $\\log_{3}(x + 2) = 1$, czyli $x + 2 = 3^{1} = 3$ i $x = 1$. Liczba $1$ należy do dziedziny.\n\nWartość: $g(7) = \\log_{3} 9 - 1 = 2 - 1 = 1$.\n\nOdpowiedź: dziedzina $(-2, +\\infty)$, asymptota $x = -2$, miejsce zerowe $1$, $g(7) = 1$.",
    },
    // ---- funkcja homograficzna ----
    {
      nr: "22", dzial: "funkcje", temat: "funkcja-homograficzna", punkty: 3,
      tresc: "Funkcja $f$ jest określona wzorem $f(x) = \\frac{3x + 1}{x + 2}$. Zapisz wzór funkcji w postaci $\\frac{a}{x - p} + q$, podaj asymptoty jej wykresu, dziedzinę i zbiór wartości oraz oblicz miejsce zerowe. **Zapisz obliczenia.**",
      rozwiazanie: "W liczniku wyodrębniamy mianownik: $3x + 1 = 3(x + 2) - 5$.\n\n$f(x) = \\frac{3(x + 2) - 5}{x + 2} = 3 - \\frac{5}{x + 2} = \\frac{-5}{x + 2} + 3$.\n\nMamy $a = -5$, $p = -2$, $q = 3$. Asymptota pionowa: $x = -2$, pozioma: $y = 3$.\n\nDziedzina: $\\mathbb{R} \\setminus \\{-2\\}$. Zbiór wartości: $\\mathbb{R} \\setminus \\{3\\}$.\n\nMiejsce zerowe: licznik $3x + 1 = 0$, więc $x = -\\frac{1}{3}$. Ta liczba należy do dziedziny.\n\nOdpowiedź: $f(x) = \\frac{-5}{x + 2} + 3$; asymptoty $x = -2$ i $y = 3$; $D = \\mathbb{R} \\setminus \\{-2\\}$, $ZW = \\mathbb{R} \\setminus \\{3\\}$; miejsce zerowe $-\\frac{1}{3}$.",
    },
    {
      nr: "23", dzial: "funkcje", temat: "funkcja-homograficzna", punkty: 3,
      tresc: "Na rysunku przedstawiono wykres funkcji $f(x) = \\frac{a}{x - p} + q$. Asymptotami wykresu są proste $x = 2$ i $y = -1$, a do wykresu należą punkty $(3, 1)$ i $(0, -2)$.\n\n[rysunek]\n\nWyznacz wzór funkcji $f$ i jej miejsce zerowe. **Zapisz obliczenia.**",
      rysunek: "assets/zadania/rys/funkcje-23.svg",
      rozwiazanie: "Asymptota pionowa $x = 2$ daje $p = 2$, a pozioma $y = -1$ daje $q = -1$. Zatem $f(x) = \\frac{a}{x - 2} - 1$.\n\nPunkt $(3, 1)$: $1 = \\frac{a}{3 - 2} - 1$, więc $a = 2$.\n\nSprawdzenie dla punktu $(0, -2)$: $\\frac{2}{0 - 2} - 1 = -1 - 1 = -2$. Zgadza się.\n\nMiejsce zerowe: $\\frac{2}{x - 2} - 1 = 0$, więc $\\frac{2}{x - 2} = 1$, czyli $x - 2 = 2$ i $x = 4$. Na rysunku wykres przecina oś poziomą w punkcie $(4, 0)$.\n\nOdpowiedź: $f(x) = \\frac{2}{x - 2} - 1$, miejsce zerowe: $4$.",
    },
    // ---- równania wykładnicze i logarytmiczne ----
    {
      nr: "28", dzial: "funkcje", temat: "rownania-wykladnicze-logarytmiczne", punkty: 3,
      tresc: "Rozwiąż równanie $4^{x} - 10 \\cdot 2^{x} + 16 = 0$. **Zapisz obliczenia.**",
      rozwiazanie: "Ponieważ $4^{x} = (2^{x})^{2}$, podstawiamy $t = 2^{x}$, gdzie $t > 0$. Równanie przyjmuje postać $t^{2} - 10t + 16 = 0$.\n\n$\\Delta = 100 - 64 = 36$, $\\sqrt{\\Delta} = 6$, więc $t = \\frac{10 - 6}{2} = 2$ lub $t = \\frac{10 + 6}{2} = 8$. Obie liczby są dodatnie.\n\nDla $t = 2$: $2^{x} = 2$, więc $x = 1$. Dla $t = 8$: $2^{x} = 8 = 2^{3}$, więc $x = 3$.\n\nOdpowiedź: $x = 1$ lub $x = 3$.",
    },
    {
      nr: "29", dzial: "funkcje", temat: "rownania-wykladnicze-logarytmiczne", punkty: 3,
      tresc: "Rozwiąż równanie $\\log_{3} x + \\log_{3}(x + 6) = 3$. **Zapisz założenia i obliczenia.**",
      rozwiazanie: "Założenia: $x > 0$ oraz $x + 6 > 0$, czyli $x > 0$.\n\nSuma logarytmów to logarytm iloczynu: $\\log_{3}(x(x + 6)) = 3$, więc $x(x + 6) = 3^{3} = 27$.\n\n$x^{2} + 6x - 27 = 0$. $\\Delta = 36 + 108 = 144$, $\\sqrt{\\Delta} = 12$, więc $x = \\frac{-6 - 12}{2} = -9$ lub $x = \\frac{-6 + 12}{2} = 3$.\n\nZałożenie $x > 0$ spełnia tylko $x = 3$. Sprawdzenie: $\\log_{3} 3 + \\log_{3} 9 = 1 + 2 = 3$.\n\nOdpowiedź: $x = 3$.",
    },
    {
      nr: "30", dzial: "funkcje", temat: "rownania-wykladnicze-logarytmiczne", punkty: 3,
      tresc: "Na lokacie złożono $8000$ zł. Kapitał rośnie o $4\\%$ rocznie (odsetki dopisuje się raz w roku). Po ilu pełnych latach na lokacie będzie więcej niż $10\\,000$ zł? Skorzystaj z tego, że $\\log_{1{,}04} 1{,}25 \\approx 5{,}69$. **Zapisz obliczenia.**",
      rozwiazanie: "Po $n$ latach kwota wynosi $8000 \\cdot 1{,}04^{n}$ zł.\n\nSzukamy $n$, dla którego $8000 \\cdot 1{,}04^{n} > 10\\,000$.\n\nDzielimy przez $8000$: $1{,}04^{n} > 1{,}25$.\n\nPodstawa $1{,}04 > 1$, więc funkcja rośnie i znak nierówności zostaje: $n > \\log_{1{,}04} 1{,}25 \\approx 5{,}69$.\n\nNajmniejsza całkowita liczba lat spełniająca warunek to $n = 6$. Sprawdzenie: $1{,}04^{5} \\approx 1{,}217 < 1{,}25$, a $1{,}04^{6} \\approx 1{,}265 > 1{,}25$.\n\nOdpowiedź: po $6$ latach.",
    },
    // ---- ciągi rekurencyjne ----
    {
      nr: "33", dzial: "funkcje", temat: "wzor-ogolny", punkty: 3,
      tresc: "Ciąg $(a_{n})$ jest określony wzorami $a_{1} = 10$ oraz $a_{n+1} = a_{n} + n - 4$ dla $n \\geq 1$. Oblicz wyrazy $a_{2}$, $a_{3}$, $a_{4}$, $a_{5}$, $a_{6}$, a następnie zbadaj, czy ciąg jest monotoniczny. **Zapisz obliczenia.**",
      rozwiazanie: "Liczymy po kolei: $a_{2} = a_{1} + 1 - 4 = 10 - 3 = 7$, $a_{3} = 7 + 2 - 4 = 5$, $a_{4} = 5 + 3 - 4 = 4$, $a_{5} = 4 + 4 - 4 = 4$, $a_{6} = 4 + 5 - 4 = 5$.\n\nZ przepisu mamy $a_{n+1} - a_{n} = n - 4$.\n\nDla $n = 1, 2, 3$ różnica jest ujemna ($-3, -2, -1$), więc wyrazy maleją: $10, 7, 5, 4$. Dla $n = 4$ różnica jest równa $0$. Dla $n \\geq 5$ różnica jest dodatnia, więc wyrazy rosną: $4, 5, 7, \\dots$.\n\nRóżnica zmienia znak, więc ciąg nie jest ani rosnący, ani malejący.\n\nOdpowiedź: $a_{2} = 7$, $a_{3} = 5$, $a_{4} = 4$, $a_{5} = 4$, $a_{6} = 5$; ciąg nie jest monotoniczny.",
    },
    // ---- inne funkcje (wykładnicza, logarytmiczna) ----
    {
      nr: "36", dzial: "funkcje", temat: "inne-funkcje", punkty: 3,
      tresc: "Powierzchnię stawu pokrywa rzęsa wodna. Dziś zajmuje ona $3$ m$^{2}$, a jej powierzchnia podwaja się co $2$ dni. Pole pokryte rzęsą po $t$ dniach opisuje funkcja $S(t) = 3 \\cdot 2^{\\frac{t}{2}}$. Oblicz, ile metrów kwadratowych zajmie rzęsa po $6$ dniach, a następnie po ilu dniach zajmie ona $96$ m$^{2}$. **Zapisz obliczenia.**",
      rozwiazanie: "Po $6$ dniach: $S(6) = 3 \\cdot 2^{\\frac{6}{2}} = 3 \\cdot 2^{3} = 3 \\cdot 8 = 24$ m$^{2}$.\n\nSzukamy $t$, dla którego $S(t) = 96$: $3 \\cdot 2^{\\frac{t}{2}} = 96$.\n\nDzielimy przez $3$: $2^{\\frac{t}{2}} = 32$.\n\nZapisujemy $32$ jako potęgę liczby $2$: $32 = 2^{5}$, więc $2^{\\frac{t}{2}} = 2^{5}$.\n\nPotęgi o tej samej podstawie są równe, gdy mają równe wykładniki: $\\frac{t}{2} = 5$, czyli $t = 10$.\n\nSprawdzenie: $S(10) = 3 \\cdot 2^{5} = 96$.\n\nOdpowiedź: Po $6$ dniach rzęsa zajmie $24$ m$^{2}$, a $96$ m$^{2}$ zajmie po $10$ dniach.",
    },
    {
      nr: "37", dzial: "funkcje", temat: "inne-funkcje", punkty: 3,
      tresc: "Wykres funkcji $f(x) = \\log_{a} x$ przechodzi przez punkt $\\left(\\frac{1}{4}, 2\\right)$. Wyznacz podstawę $a$ logarytmu i oblicz $f(8)$. Rozstrzygnij, czy funkcja $f$ jest rosnąca, czy malejąca, i porównaj wartości $f(3)$ oraz $f(5)$. **Zapisz obliczenia.**",
      rozwiazanie: "Punkt $\\left(\\frac{1}{4}, 2\\right)$ leży na wykresie, więc $\\log_{a} \\frac{1}{4} = 2$, czyli $a^{2} = \\frac{1}{4}$.\n\nPodstawa logarytmu jest dodatnia, więc $a = \\frac{1}{2}$ i $f(x) = \\log_{\\frac{1}{2}} x$.\n\nObliczamy $f(8)$: szukamy wykładnika $y$, dla którego $\\left(\\frac{1}{2}\\right)^{y} = 8$. Ponieważ $8 = 2^{3} = \\left(\\frac{1}{2}\\right)^{-3}$, mamy $f(8) = -3$.\n\nPodstawa $\\frac{1}{2}$ leży między $0$ a $1$, więc funkcja $f$ jest malejąca.\n\nLiczba $3$ jest mniejsza od $5$, a funkcja jest malejąca, więc $f(3) > f(5)$.\n\nOdpowiedź: $a = \\frac{1}{2}$, $f(8) = -3$, funkcja jest malejąca, $f(3) > f(5)$.",
    },
    // ---- funkcja homograficzna ----
    {
      nr: "39", dzial: "funkcje", temat: "funkcja-homograficzna", punkty: 3,
      tresc: "W naczyniu jest $20$ kg roztworu soli kuchennej, w którym znajdują się $4$ kg soli. Do naczynia dosypano $x$ kg soli i cała sól się rozpuściła. Stężenie soli w roztworze (jako ułamek masy roztworu) opisuje funkcja $c(x) = \\frac{4 + x}{20 + x}$ dla $x \\geq 0$. Zapisz wzór funkcji $c$ w postaci $\\frac{a}{x - p} + q$, podaj asymptotę poziomą jej wykresu i wyjaśnij, co ona oznacza w tej sytuacji. Oblicz, ile kilogramów soli trzeba dosypać, żeby stężenie wyniosło $50\\%$. **Zapisz obliczenia.**",
      rozwiazanie: "W liczniku wyodrębniamy mianownik: $4 + x = (x + 20) - 16$.\n\nZatem $c(x) = \\frac{(x + 20) - 16}{x + 20} = 1 - \\frac{16}{x + 20} = \\frac{-16}{x - (-20)} + 1$.\n\nMamy $a = -16$, $p = -20$, $q = 1$. Asymptota pozioma to prosta $y = 1$.\n\nZnaczenie: stężenie rośnie wraz z dosypywaną solą, ale zawsze jest mniejsze od $1$, czyli od $100\\%$. Mimo że dosypujemy coraz więcej soli, stężenie tylko zbliża się do $1$ i nigdy go nie osiąga.\n\nStężenie $50\\%$ to $\\frac{1}{2}$: $\\frac{4 + x}{20 + x} = \\frac{1}{2}$. Mnożymy na krzyż: $2(4 + x) = 20 + x$, czyli $8 + 2x = 20 + x$, więc $x = 12$.\n\nSprawdzenie: $c(12) = \\frac{16}{32} = \\frac{1}{2}$.\n\nOdpowiedź: $c(x) = \\frac{-16}{x + 20} + 1$, asymptota pozioma $y = 1$ (stężenie nigdy nie osiągnie $100\\%$), trzeba dosypać $12$ kg soli.",
    },
    {
      nr: "40", dzial: "funkcje", temat: "funkcja-homograficzna", punkty: 3,
      tresc: "Dana jest funkcja $f(x) = -\\frac{2}{x - 3} + 1$. Podaj przedziały, w których funkcja $f$ jest rosnąca. Wskaż dwie liczby $x_{1} < x_{2}$ z dziedziny funkcji, dla których $f(x_{1}) > f(x_{2})$. Rozwiąż równanie $f(x) = 0$ i wyznacz wszystkie liczby $m$, dla których prosta $y = m$ ma z wykresem funkcji $f$ punkt wspólny. **Zapisz obliczenia.**",
      rozwiazanie: "Funkcja jest w postaci $\\frac{a}{x - p} + q$ z $a = -2$, $p = 3$, $q = 1$. Dziedzina to $\\mathbb{R} \\setminus \\{3\\}$.\n\nDla $a < 0$ funkcja rośnie osobno na każdej gałęzi hiperboli, czyli w przedziałach $(-\\infty, 3)$ i $(3, +\\infty)$.\n\nWybieramy liczby po przeciwnych stronach asymptoty $x = 3$, np. $x_{1} = 2$ i $x_{2} = 4$. Wtedy $f(2) = -\\frac{2}{-1} + 1 = 3$ oraz $f(4) = -\\frac{2}{1} + 1 = -1$, więc $f(2) > f(4)$ mimo że $2 < 4$. To nie jest sprzeczność: funkcja rośnie w każdym z przedziałów osobno, ale nie w całej dziedzinie.\n\nRównanie $f(x) = 0$: $-\\frac{2}{x - 3} + 1 = 0$, więc $\\frac{2}{x - 3} = 1$, czyli $x - 3 = 2$ i $x = 5$. Liczba $5$ należy do dziedziny.\n\nZbiór wartości to $\\mathbb{R} \\setminus \\{1\\}$, bo ułamek $-\\frac{2}{x - 3}$ nigdy nie jest równy zero, więc $f(x)$ nigdy nie jest równe $1$. Prosta $y = m$ ma punkt wspólny z wykresem dla $m \\neq 1$ (prosta $y = 1$ jest asymptotą).\n\nOdpowiedź: $f$ rośnie w $(-\\infty, 3)$ i w $(3, +\\infty)$; np. $x_{1} = 2$, $x_{2} = 4$; miejsce zerowe $x = 5$; $m \\in \\mathbb{R} \\setminus \\{1\\}$.",
    },
  ],
};
