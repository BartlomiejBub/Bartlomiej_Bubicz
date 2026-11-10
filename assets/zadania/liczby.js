// Zadania do ćwiczeń – Liczby i równania (LO klasa 1): zbiory, układy równań, wyrażenia, równania i nierówności.
// Ułożone dla strony. Format jak arkusz (tools/test-arkusze.mjs).
export default {
  nazwa: "Zadania do ćwiczeń – Liczby i równania",
  zadania: [
    // ---- zbiory ----
    {
      nr: "1", dzial: "liczby", temat: "zbiory",
      tresc: "Dane są przedziały $A = [-2, 3)$ i $B = (0, 5]$. Część wspólna $A \\cap B$ jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$(0, 3]$", "$[0, 3)$", "$(0, 3)$", "$[-2, 5]$"],
      poprawna: 2,
    },
    {
      nr: "2", dzial: "liczby", temat: "zbiory",
      tresc: "Dane są zbiory $A = (-\\infty, 4)$ i $B = [1, +\\infty)$. Różnica $A \\setminus B$ jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$(-\\infty, 1)$", "$(-\\infty, 1]$", "$[1, 4)$", "$(4, +\\infty)$"],
      poprawna: 0,
    },
    {
      nr: "3", dzial: "liczby", temat: "zbiory",
      tresc: "Dane są zbiory $A = \\{1, 2, 3, 4, 5, 6\\}$ i $B = \\{2, 4, 6, 8\\}$. Zbiór $(A \\cup B) \\setminus (A \\cap B)$ ma dokładnie. **Wybierz właściwą odpowiedź.**",
      opcje: ["$3$ elementy", "$4$ elementy", "$5$ elementów", "$7$ elementów"],
      poprawna: 1,
    },
    // ---- układy równań ----
    {
      nr: "7", dzial: "liczby", temat: "uklady-rownan",
      tresc: "Rozwiązaniem układu równań $\\begin{cases} 2x + y = 7 \\\\ x - y = -1 \\end{cases}$ jest para liczb $(x, y)$. **Wybierz właściwą odpowiedź.**",
      opcje: ["$(3, 2)$", "$(1, 5)$", "$(4, -1)$", "$(2, 3)$"],
      poprawna: 3,
    },
    {
      nr: "8", dzial: "liczby", temat: "uklady-rownan",
      tresc: "Układ równań $\\begin{cases} x + 2y = 3 \\\\ 2x + ky = 6 \\end{cases}$ ma nieskończenie wiele rozwiązań dla $k$ równego. **Wybierz właściwą odpowiedź.**",
      opcje: ["$2$", "$4$", "$3$", "$6$"],
      poprawna: 1,
    },
    {
      nr: "9", dzial: "liczby", temat: "uklady-rownan",
      tresc: "**Oceń prawdziwość podanych zdań.** Zaznacz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.",
      czesci: [
        { tekst: "Układ $y = 2x + 1$, $y = 2x - 3$ nie ma rozwiązań.", litery: "PF", poprawna: 0 },
        { tekst: "Układ $x + y = 4$, $2x + 2y = 8$ ma dokładnie jedno rozwiązanie.", litery: "PF", poprawna: 1 },
        { tekst: "Para $(1, 3)$ jest rozwiązaniem układu $y = 3x$, $y = -x + 4$.", litery: "PF", poprawna: 0 },
      ],
    },
    // ---- wyrażenia ----
    {
      nr: "14", dzial: "liczby", temat: "wyrazenia",
      tresc: "Po wykonaniu mnożenia i redukcji wyrazów podobnych wyrażenie $(2x - 3)(x + 4)$ przyjmuje postać. **Wybierz właściwą odpowiedź.**",
      opcje: ["$2x^{2} + 5x - 12$", "$2x^{2} - 5x - 12$", "$2x^{2} + 11x - 12$", "$2x^{2} + 5x + 12$"],
      poprawna: 0,
    },
    {
      nr: "15", dzial: "liczby", temat: "wyrazenia",
      tresc: "Wyrażenie $5x - (2x - 3) + 4$ jest równe. **Wybierz właściwą odpowiedź.**",
      opcje: ["$3x + 1$", "$7x + 7$", "$3x + 7$", "$7x + 1$"],
      poprawna: 2,
    },
    // ---- równania i nierówności ----
    {
      nr: "18", dzial: "liczby", temat: "rownania",
      tresc: "Równanie $3(x - 1) - x = 2x + 5$. **Wybierz właściwą odpowiedź.**",
      opcje: ["ma dokładnie jedno rozwiązanie", "ma dwa rozwiązania", "ma nieskończenie wiele rozwiązań", "nie ma rozwiązań"],
      poprawna: 3,
    },
    {
      nr: "19", dzial: "liczby", temat: "nierownosci",
      tresc: "Zbiorem rozwiązań nierówności $-3 < 2x - 1 \\leq 5$ jest. **Wybierz właściwą odpowiedź.**",
      opcje: ["$[-1, 3)$", "$(-1, 3]$", "$(-2, 6]$", "$(-1, 3)$"],
      poprawna: 1,
    },
    // ---- wielomiany ----
    {
      nr: "22", dzial: "liczby", temat: "wielomiany",
      tresc: "Stopień wielomianu $W(x) = (x^{2} - 3)(2x^{3} + x) - 2x^{5}$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$5$", "$3$", "$2$", "$1$"],
      poprawna: 1,
    },
    {
      nr: "23", dzial: "liczby", temat: "wielomiany",
      tresc: "Liczba $2$ jest pierwiastkiem wielomianu $W(x) = x^{3} - 3x^{2} + ax + 6$. Zatem $a$ jest równe. **Wybierz właściwą odpowiedź.**",
      opcje: ["$1$", "$-2$", "$-1$", "$2$"],
      poprawna: 2,
    },
    {
      nr: "24", dzial: "liczby", temat: "wielomiany",
      tresc: "Zbiorem rozwiązań równania $x^{3} - 9x = 0$ jest. **Wybierz właściwą odpowiedź.**",
      opcje: ["$\\{-3, 3\\}$", "$\\{0, 3\\}$", "$\\{-3, 0, 3\\}$", "$\\{0, 9\\}$"],
      poprawna: 2,
    },
    {
      nr: "25", dzial: "liczby", temat: "wielomiany",
      tresc: "**Oceń prawdziwość podanych zdań.** Zaznacz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.",
      czesci: [
        { tekst: "Wielomian $x^{2}(x - 1)$ ma stopień $2$.", litery: "PF", poprawna: 1 },
        { tekst: "Wielomiany $x^{3} + 2x$ oraz $x(x^{2} + 2)$ są równe.", litery: "PF", poprawna: 0 },
        { tekst: "Równanie $(x - 2)^{2}(x + 1) = 0$ ma dokładnie dwa różne rozwiązania.", litery: "PF", poprawna: 0 },
      ],
    },
    // ---- równania wymierne ----
    {
      nr: "30", dzial: "liczby", temat: "rownania-wymierne",
      tresc: "Wyrażenie $\\frac{x + 1}{(x - 2)(x + 5)}$ ma sens liczbowy dla wszystkich $x$ ze zbioru. **Wybierz właściwą odpowiedź.**",
      opcje: ["$\\mathbb{R} \\setminus \\{-5, -1, 2\\}$", "$\\mathbb{R} \\setminus \\{-2, 5\\}$", "$\\mathbb{R} \\setminus \\{-5, 2\\}$", "$\\mathbb{R} \\setminus \\{2\\}$"],
      poprawna: 2,
    },
    {
      nr: "31", dzial: "liczby", temat: "rownania-wymierne",
      tresc: "Rozwiązaniem równania $\\frac{x^{2} - 16}{x + 4} = 0$ jest. **Wybierz właściwą odpowiedź.**",
      opcje: ["$x = -4$ lub $x = 4$", "$x = -4$", "brak rozwiązań", "$x = 4$"],
      poprawna: 3,
    },
    {
      nr: "32", dzial: "liczby", temat: "rownania-wymierne",
      tresc: "Rozwiązaniem równania $\\frac{3}{x - 1} = \\frac{6}{x + 4}$ jest liczba. **Wybierz właściwą odpowiedź.**",
      opcje: ["$6$", "$-9$", "$2$", "$18$"],
      poprawna: 0,
    },
    // ---- logika ----
    {
      nr: "38", dzial: "liczby", temat: "logika",
      tresc: "Zaprzeczeniem zdania „Liczba $x$ jest większa od $2$ i mniejsza od $7$” jest zdanie. **Wybierz właściwą odpowiedź.**",
      opcje: ["$x \\leq 2$ i $x \\geq 7$", "$x < 2$ lub $x > 7$", "$x \\leq 2$ lub $x \\geq 7$", "$x \\geq 2$ lub $x \\leq 7$"],
      poprawna: 2,
    },
    {
      nr: "39", dzial: "liczby", temat: "logika",
      tresc: "**Oceń prawdziwość podanych zdań.** Zaznacz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.",
      czesci: [
        { tekst: "Zdanie „Dla każdej liczby rzeczywistej $x$ prawdziwa jest nierówność $x^{2} > x$” jest prawdziwe.", litery: "PF", poprawna: 1 },
        { tekst: "Zaprzeczeniem zdania „Istnieje liczba rzeczywista $x$, dla której $x^{2} < 0$” jest zdanie „Dla każdej liczby rzeczywistej $x$ zachodzi $x^{2} \\geq 0$”.", litery: "PF", poprawna: 0 },
        { tekst: "Implikacja „Jeśli $2 + 3 = 6$, to $5$ jest liczbą parzystą” jest fałszywa.", litery: "PF", poprawna: 1 },
      ],
    },
    {
      nr: "40", dzial: "liczby", temat: "logika",
      tresc: "Kontrprzykładem dla zdania „Jeśli liczba naturalna dzieli się przez $4$, to dzieli się przez $8$” jest liczba. **Wybierz właściwą odpowiedź.**",
      opcje: ["$16$", "$24$", "$32$", "$12$"],
      poprawna: 3,
    },
    // ---- wyrazenia: przekształcanie wzorów ----
    {
      nr: "44", dzial: "liczby", temat: "wyrazenia",
      tresc: "Pole trapezu o podstawach $a$ i $b$ oraz wysokości $h \\neq 0$ wyraża się wzorem $P = \\frac{(a + b) \\cdot h}{2}$. Po wyznaczeniu $b$ otrzymamy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$b = \\frac{2P - a}{h}$", "$b = \\frac{2P}{h} - a$", "$b = \\frac{P}{2h} - a$", "$b = 2Ph - a$"],
      poprawna: 1,
    },
    // ---- liczby rzeczywiste ----
    {
      nr: "47", dzial: "liczby", temat: "liczby-rzeczywiste",
      tresc: "Liczba $a$ leży na osi liczbowej w odległości $4$ od liczby $-1$, a liczba $b$ leży w odległości $6$ od liczby $5$. Jaka jest największa możliwa odległość między liczbami $a$ i $b$? **Wybierz właściwą odpowiedź.**",
      opcje: ["$8$", "$10$", "$16$", "$4$"],
      poprawna: 2,
    },
    {
      nr: "48", dzial: "liczby", temat: "liczby-rzeczywiste",
      tresc: "**Oceń prawdziwość podanych zdań.** Zaznacz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.",
      czesci: [
        { tekst: "Liczba $4{,}5 \\cdot 10^{-3}$ jest równa $0{,}0045$.", litery: "PF", poprawna: 0 },
        { tekst: "Liczba $0{,}0072 \\cdot 10^{5}$ jest zapisana w notacji wykładniczej.", litery: "PF", poprawna: 1 },
        { tekst: "Iloraz $(6 \\cdot 10^{5}) : (2 \\cdot 10^{-2})$ jest równy $3 \\cdot 10^{3}$.", litery: "PF", poprawna: 1 },
      ],
    },
  ],
  otwarte: [
    // ---- zbiory ----
    {
      nr: "4", dzial: "liczby", temat: "zbiory", punkty: 3,
      tresc: "Dane są przedziały $A = [-4, 2)$ i $B = (-1, 6]$. Wyznacz $A \\cup B$, $A \\cap B$, $A \\setminus B$ i $B \\setminus A$. **Zapisz obliczenia.**",
      rozwiazanie: "Zaznaczamy oba przedziały na osi liczbowej jeden pod drugim. $A$ zaczyna się w $-4$ (z tym końcem) i kończy w $2$ (bez tego końca). $B$ zaczyna się w $-1$ (bez tego końca) i kończy w $6$ (z tym końcem).\n\nSuma to wszystko, co jest w którymś z przedziałów: od $-4$ do $6$, oba końce należą. $A \\cup B = [-4, 6]$.\n\nCzęść wspólna to fragment, który jest w obu przedziałach: od $-1$ (nie należy do $B$) do $2$ (nie należy do $A$). $A \\cap B = (-1, 2)$.\n\nRóżnica $A \\setminus B$: elementy $A$, których nie ma w $B$, czyli liczby od $-4$ do $-1$. Liczba $-1$ nie należy do $B$, więc zostaje. $A \\setminus B = [-4, -1]$.\n\nRóżnica $B \\setminus A$: elementy $B$, których nie ma w $A$, czyli liczby od $2$ do $6$. Liczba $2$ nie należy do $A$, więc zostaje. $B \\setminus A = [2, 6]$.\n\nOdpowiedź: $A \\cup B = [-4, 6]$, $A \\cap B = (-1, 2)$, $A \\setminus B = [-4, -1]$, $B \\setminus A = [2, 6]$.",
    },
    {
      nr: "5", dzial: "liczby", temat: "zbiory", punkty: 2,
      tresc: "Zbiór $A = (-\\infty, -2] \\cup (3, +\\infty)$ jest podzbiorem zbioru liczb rzeczywistych. Wyznacz dopełnienie $A'$ zbioru $A$ i wypisz wszystkie liczby całkowite należące do $A'$. **Zapisz obliczenia.**",
      rozwiazanie: "Dopełnienie to wszystkie liczby rzeczywiste, które nie należą do $A$. Na osi liczbowej zaznaczony jest zbiór na lewo od $-2$ (razem z $-2$) i na prawo od $3$ (bez $3$). Niezaznaczone zostaje to, co leży między $-2$ i $3$.\n\nLiczba $-2$ należy do $A$, więc nie należy do $A'$. Liczba $3$ nie należy do $A$, więc należy do $A'$. Zatem $A' = (-2, 3]$.\n\nLiczby całkowite z przedziału $(-2, 3]$ to $-1$, $0$, $1$, $2$, $3$.\n\nOdpowiedź: $A' = (-2, 3]$. Liczby całkowite w $A'$: $-1$, $0$, $1$, $2$, $3$.",
    },
    {
      nr: "6", dzial: "liczby", temat: "zbiory", punkty: 2,
      tresc: "Dane są zbiory $A = [1, a]$ oraz $B = (4, 7)$, gdzie $a \\geq 1$. Dla jakich liczb $a$ zbiory $A$ i $B$ są rozłączne? **Zapisz obliczenia.**",
      rozwiazanie: "Zbiory są rozłączne, gdy nie mają wspólnego elementu, czyli $A \\cap B = \\emptyset$.\n\nZbiór $A$ zaczyna się w liczbie $1$, a $B$ zaczyna się za liczbą $4$ (bez niej). Wspólny element pojawi się dopiero wtedy, gdy $A$ sięgnie dalej niż $4$, czyli gdy $a > 4$.\n\nDla $a = 4$ mamy $A = [1, 4]$ i $B = (4, 7)$. Liczba $4$ nie należy do $B$, więc zbiory nadal są rozłączne.\n\nZatem zbiory są rozłączne, gdy $a \\leq 4$. Razem z warunkiem $a \\geq 1$ dostajemy $a \\in [1, 4]$.\n\nOdpowiedź: $a \\in [1, 4]$.",
    },
    // ---- układy równań ----
    {
      nr: "10", dzial: "liczby", temat: "uklady-rownan", punkty: 2,
      tresc: "Rozwiąż układ równań $\\begin{cases} 3x + 2y = 4 \\\\ 5x - 4y = 14 \\end{cases}$ metodą przeciwnych współczynników. **Zapisz obliczenia.**",
      rozwiazanie: "Pierwsze równanie mnożymy przez $2$, żeby przy $y$ stały liczby przeciwne: $6x + 4y = 8$.\n\nDodajemy je stronami do drugiego równania: $(6x + 4y) + (5x - 4y) = 8 + 14$, czyli $11x = 22$, więc $x = 2$.\n\nPodstawiamy $x = 2$ do pierwszego równania: $3 \\cdot 2 + 2y = 4$, więc $2y = -2$ i $y = -1$.\n\nSprawdzenie: $5 \\cdot 2 - 4 \\cdot (-1) = 10 + 4 = 14$, zgadza się.\n\nOdpowiedź: $x = 2$, $y = -1$.",
    },
    {
      nr: "11", dzial: "liczby", temat: "uklady-rownan", punkty: 3,
      tresc: "W kinie za $3$ bilety normalne i $2$ bilety ulgowe zapłacono $46$ zł, a za $2$ bilety normalne i $3$ ulgowe zapłacono $44$ zł. Ile kosztuje jeden bilet normalny, a ile jeden ulgowy? **Zapisz obliczenia.**",
      rozwiazanie: "Niech $x$ oznacza cenę biletu normalnego, a $y$ – cenę biletu ulgowego (w złotych). Z treści zadania:\n\n$3x + 2y = 46$ oraz $2x + 3y = 44$.\n\nPierwsze równanie mnożymy przez $3$, a drugie przez $2$: $9x + 6y = 138$ i $4x + 6y = 88$.\n\nOdejmujemy drugie od pierwszego: $5x = 50$, więc $x = 10$.\n\nZ pierwszego równania: $30 + 2y = 46$, więc $y = 8$.\n\nSprawdzenie: $2 \\cdot 10 + 3 \\cdot 8 = 20 + 24 = 44$, zgadza się.\n\nOdpowiedź: Bilet normalny kosztuje $10$ zł, a ulgowy $8$ zł.",
    },
    {
      nr: "12", dzial: "liczby", temat: "uklady-rownan", punkty: 3,
      tresc: "Proste $k: y = 2x - 1$ i $l: y = -x + 5$ przecinają się w punkcie $P$. Wyznacz współrzędne punktu $P$ i oblicz pole trójkąta, którego wierzchołkami są punkt $P$ i punkty przecięcia obu prostych z osią $Ox$. **Zapisz obliczenia.**",
      rozwiazanie: "Współrzędne punktu $P$ to rozwiązanie układu $y = 2x - 1$, $y = -x + 5$. Porównujemy prawe strony: $2x - 1 = -x + 5$, więc $3x = 6$ i $x = 2$. Wtedy $y = 2 \\cdot 2 - 1 = 3$. Zatem $P = (2, 3)$.\n\nProsta $k$ przecina oś $Ox$, gdy $y = 0$: $2x - 1 = 0$, więc $x = \\frac{1}{2}$. Punkt $A = \\left(\\frac{1}{2}, 0\\right)$.\n\nProsta $l$ przecina oś $Ox$, gdy $-x + 5 = 0$, czyli $x = 5$. Punkt $B = (5, 0)$.\n\nPodstawa $AB$ leży na osi $Ox$ i ma długość $5 - \\frac{1}{2} = \\frac{9}{2}$. Wysokość to odległość punktu $P$ od osi $Ox$, czyli $3$.\n\nPole: $\\frac{1}{2} \\cdot \\frac{9}{2} \\cdot 3 = \\frac{27}{4} = 6{,}75$.\n\nOdpowiedź: $P = (2, 3)$, pole trójkąta wynosi $\\frac{27}{4}$.",
    },
    {
      nr: "13", dzial: "liczby", temat: "uklady-rownan", punkty: 2,
      tresc: "Dla jakiej wartości parametru $m$ układ równań $\\begin{cases} mx + 2y = 3 \\\\ 3x + y = 5 \\end{cases}$ jest sprzeczny? **Zapisz obliczenia.**",
      rozwiazanie: "Układ jest sprzeczny, gdy proste są równoległe, ale się nie pokrywają. Mnożymy drugie równanie przez $2$: $6x + 2y = 10$.\n\nPierwsze równanie ma przy $y$ liczbę $2$, tak samo jak przekształcone drugie. Proste mogą być równoległe tylko wtedy, gdy przy $x$ też są takie same liczby, czyli $m = 6$.\n\nDla $m = 6$ pierwsze równanie ma postać $6x + 2y = 3$, a drugie $6x + 2y = 10$. Lewe strony są takie same, a prawe różne, więc układ nie ma rozwiązań.\n\nDla $m \\neq 6$ odejmujemy stronami: $(m - 6)x = -7$, co daje jedno rozwiązanie, więc układ nie jest sprzeczny.\n\nOdpowiedź: $m = 6$.",
    },
    // ---- wyrażenia ----
    {
      nr: "16", dzial: "liczby", temat: "wyrazenia", punkty: 2,
      tresc: "Uprość wyrażenie $(3a - 2b)(a + b) - (a - b)^{2}$. **Zapisz obliczenia.**",
      rozwiazanie: "Mnożymy pierwsze dwa nawiasy: $(3a - 2b)(a + b) = 3a^{2} + 3ab - 2ab - 2b^{2} = 3a^{2} + ab - 2b^{2}$.\n\nRozwijamy kwadrat różnicy: $(a - b)^{2} = a^{2} - 2ab + b^{2}$.\n\nOdejmujemy, pamiętając o zmianie znaków w drugim nawiasie: $3a^{2} + ab - 2b^{2} - a^{2} + 2ab - b^{2}$.\n\nRedukujemy wyrazy podobne: $2a^{2} + 3ab - 3b^{2}$.\n\nOdpowiedź: $2a^{2} + 3ab - 3b^{2}$.",
    },
    {
      nr: "17", dzial: "liczby", temat: "wyrazenia", punkty: 1,
      tresc: "Zapisz w najprostszej postaci wyrażenie $(2x^{3}y)^{2} \\cdot (-3xy^{2})$. **Zapisz obliczenia.**",
      rozwiazanie: "Podnosimy jednomian do kwadratu: $(2x^{3}y)^{2} = 4x^{6}y^{2}$.\n\nMnożymy: $4x^{6}y^{2} \\cdot (-3xy^{2}) = (4 \\cdot (-3)) \\cdot x^{6+1} \\cdot y^{2+2} = -12x^{7}y^{4}$.\n\nOdpowiedź: $-12x^{7}y^{4}$.",
    },
    // ---- równania i nierówności ----
    {
      nr: "20", dzial: "liczby", temat: "nierownosci", punkty: 2,
      tresc: "Ile liczb całkowitych spełnia jednocześnie obie nierówności: $3x + 1 > -5$ oraz $2 - x \\geq -1$? **Zapisz obliczenia.**",
      rozwiazanie: "Pierwsza nierówność: $3x > -6$, więc $x > -2$.\n\nDruga nierówność: $-x \\geq -3$. Dzielimy przez $-1$ i odwracamy znak: $x \\leq 3$.\n\nCzęść wspólna rozwiązań: $x \\in (-2, 3]$.\n\nLiczby całkowite w tym przedziale: $-1$, $0$, $1$, $2$, $3$. Jest ich $5$.\n\nOdpowiedź: $5$ liczb całkowitych.",
    },
    {
      nr: "21", dzial: "liczby", temat: "rownania", punkty: 2,
      tresc: "Wyznacz wszystkie wartości parametru $m$, dla których równanie $(m - 4)x = m - 5$ nie ma rozwiązań, oraz wszystkie wartości $m$, dla których równanie $(m + 1)x = m^{2} - 1$ ma nieskończenie wiele rozwiązań. **Zapisz obliczenia.**",
      rozwiazanie: "Równanie $(m - 4)x = m - 5$: jeśli $m \\neq 4$, to $x = \\frac{m - 5}{m - 4}$, czyli jest jedno rozwiązanie. Dla $m = 4$ dostajemy $0 \\cdot x = -1$, czyli $0 = -1$ – równanie sprzeczne. Brak rozwiązań dla $m = 4$.\n\nRównanie $(m + 1)x = m^{2} - 1$: jeśli $m \\neq -1$, to $x = \\frac{m^{2} - 1}{m + 1} = m - 1$, czyli jest jedno rozwiązanie. Dla $m = -1$ dostajemy $0 \\cdot x = 0$, czyli $0 = 0$ – spełnia je każda liczba.\n\nOdpowiedź: pierwsze równanie nie ma rozwiązań dla $m = 4$, drugie ma nieskończenie wiele rozwiązań dla $m = -1$.",
    },
    // ---- wielomiany ----
    {
      nr: "26", dzial: "liczby", temat: "wielomiany", punkty: 2,
      tresc: "Dane są wielomiany $P(x) = x^{2} - 2x + 3$ oraz $Q(x) = 2x - 1$. Wyznacz wielomian $W(x) = P(x) \\cdot Q(x) - 2P(x)$ i podaj jego stopień oraz wyraz wolny. **Zapisz obliczenia.**",
      rozwiazanie: "Mnożymy: $P(x) \\cdot Q(x) = (x^{2} - 2x + 3)(2x - 1) = 2x^{3} - x^{2} - 4x^{2} + 2x + 6x - 3 = 2x^{3} - 5x^{2} + 8x - 3$.\n\nObliczamy $2P(x) = 2x^{2} - 4x + 6$.\n\nOdejmujemy, zmieniając znaki w drugim wielomianie: $W(x) = 2x^{3} - 5x^{2} + 8x - 3 - 2x^{2} + 4x - 6 = 2x^{3} - 7x^{2} + 12x - 9$.\n\nNajwyższa potęga to $x^{3}$, więc stopień wynosi $3$. Wyraz wolny to $-9$.\n\nOdpowiedź: $W(x) = 2x^{3} - 7x^{2} + 12x - 9$, stopień $3$, wyraz wolny $-9$.",
    },
    {
      nr: "27", dzial: "liczby", temat: "wielomiany", punkty: 2,
      tresc: "Wyznacz liczby $a$ i $b$, dla których wielomiany $W(x) = (x + 2)(x^{2} + ax + b)$ oraz $P(x) = x^{3} + 5x^{2} + 8x + 4$ są równe. **Zapisz obliczenia.**",
      rozwiazanie: "Wymnażamy: $(x + 2)(x^{2} + ax + b) = x^{3} + ax^{2} + bx + 2x^{2} + 2ax + 2b = x^{3} + (a + 2)x^{2} + (b + 2a)x + 2b$.\n\nWielomiany są równe, gdy mają takie same współczynniki przy każdej potędze $x$:\n\n$a + 2 = 5$, $b + 2a = 8$, $2b = 4$.\n\nZ pierwszego równania $a = 3$. Z trzeciego $b = 2$. Sprawdzamy drugie: $b + 2a = 2 + 6 = 8$, zgadza się.\n\nOdpowiedź: $a = 3$, $b = 2$.",
    },
    {
      nr: "28", dzial: "liczby", temat: "wielomiany", punkty: 2,
      tresc: "Rozwiąż równanie $x^{3} + 3x^{2} - 4x - 12 = 0$. **Zapisz obliczenia.**",
      rozwiazanie: "Grupujemy wyrazy w pary i wyłączamy wspólne czynniki: $x^{2}(x + 3) - 4(x + 3) = 0$.\n\nWyłączamy nawias $(x + 3)$: $(x + 3)(x^{2} - 4) = 0$.\n\nRóżnicę kwadratów rozkładamy: $(x + 3)(x - 2)(x + 2) = 0$.\n\nIloczyn jest zerem, gdy któryś czynnik jest zerem: $x = -3$ lub $x = 2$ lub $x = -2$.\n\nOdpowiedź: $x \\in \\{-3, -2, 2\\}$.",
    },
    {
      nr: "29", dzial: "liczby", temat: "wielomiany", punkty: 3,
      tresc: "Liczba $3$ jest pierwiastkiem wielomianu $W(x) = x^{3} + mx^{2} - 4x - 4m$. Wyznacz $m$, a następnie rozłóż wielomian $W$ na czynniki i podaj wszystkie jego pierwiastki. **Zapisz obliczenia.**",
      rozwiazanie: "Skoro $3$ jest pierwiastkiem, to $W(3) = 0$: $27 + 9m - 12 - 4m = 0$, czyli $15 + 5m = 0$, więc $m = -3$.\n\nWielomian ma postać $W(x) = x^{3} - 3x^{2} - 4x + 12$.\n\nGrupujemy: $x^{2}(x - 3) - 4(x - 3) = (x - 3)(x^{2} - 4)$.\n\nRóżnica kwadratów: $W(x) = (x - 3)(x - 2)(x + 2)$.\n\nPierwiastki to liczby zerujące czynniki: $3$, $2$ i $-2$.\n\nOdpowiedź: $m = -3$, $W(x) = (x - 3)(x - 2)(x + 2)$, pierwiastki: $-2$, $2$, $3$.",
    },
    // ---- równania wymierne ----
    {
      nr: "33", dzial: "liczby", temat: "rownania-wymierne", punkty: 2,
      tresc: "Rozwiąż równanie $\\frac{x^{2} - 5x + 6}{x - 2} = 0$. **Zapisz obliczenia.**",
      rozwiazanie: "Zakładamy, że mianownik nie jest zerem: $x \\neq 2$.\n\nUłamek jest równy zero, gdy licznik jest zerem: $x^{2} - 5x + 6 = 0$. Delta to $25 - 24 = 1$, więc $x = \\frac{5 - 1}{2} = 2$ lub $x = \\frac{5 + 1}{2} = 3$.\n\nLiczba $2$ nie spełnia założenia $x \\neq 2$, więc ją odrzucamy.\n\nOdpowiedź: $x = 3$.",
    },
    {
      nr: "34", dzial: "liczby", temat: "rownania-wymierne", punkty: 3,
      tresc: "Rozwiąż równanie $\\frac{3}{x - 1} = \\frac{x + 1}{x + 3}$. **Zapisz obliczenia.**",
      rozwiazanie: "Założenia: $x - 1 \\neq 0$ i $x + 3 \\neq 0$, czyli $x \\neq 1$ i $x \\neq -3$.\n\nMnożymy na krzyż: $3(x + 3) = (x + 1)(x - 1)$, czyli $3x + 9 = x^{2} - 1$.\n\nPrzenosimy wszystko na jedną stronę: $x^{2} - 3x - 10 = 0$.\n\nDelta: $9 + 40 = 49$, więc $x = \\frac{3 - 7}{2} = -2$ lub $x = \\frac{3 + 7}{2} = 5$.\n\nObie liczby są różne od $1$ i $-3$, więc należą do dziedziny.\n\nOdpowiedź: $x = -2$ lub $x = 5$.",
    },
    {
      nr: "35", dzial: "liczby", temat: "rownania-wymierne", punkty: 2,
      tresc: "Rozwiąż równanie $\\frac{2x}{x - 1} - 3 = \\frac{2}{x - 1}$. **Zapisz obliczenia.**",
      rozwiazanie: "Założenie: $x \\neq 1$.\n\nMnożymy obie strony przez $x - 1$, pamiętając o składniku $-3$: $2x - 3(x - 1) = 2$.\n\nUpraszczamy: $2x - 3x + 3 = 2$, więc $-x = -1$ i $x = 1$.\n\nLiczba $1$ nie należy do dziedziny, więc ją odrzucamy. Nie ma innych kandydatów na rozwiązanie.\n\nOdpowiedź: równanie nie ma rozwiązań.",
    },
    {
      nr: "36", dzial: "liczby", temat: "rownania-wymierne", punkty: 3,
      tresc: "Pierwszy robotnik wykonałby pewną pracę o $6$ dni szybciej niż drugi. Gdy pracują razem, wykonują ją w $4$ dni. W ile dni wykona tę pracę każdy z nich pracując sam? **Zapisz obliczenia.**",
      rozwiazanie: "Niech $x$ oznacza liczbę dni pracy pierwszego robotnika (samego), $x > 0$. Drugi pracuje $x + 6$ dni.\n\nW ciągu jednego dnia pierwszy wykonuje $\\frac{1}{x}$ pracy, drugi $\\frac{1}{x + 6}$, a razem $\\frac{1}{4}$ pracy. Stąd: $\\frac{1}{x} + \\frac{1}{x + 6} = \\frac{1}{4}$.\n\nMnożymy przez $4x(x + 6)$: $4(x + 6) + 4x = x(x + 6)$, czyli $8x + 24 = x^{2} + 6x$.\n\nPo przeniesieniu: $x^{2} - 2x - 24 = 0$. Delta: $4 + 96 = 100$, więc $x = \\frac{2 - 10}{2} = -4$ lub $x = \\frac{2 + 10}{2} = 6$.\n\nLiczba $-4$ nie pasuje (czas nie jest ujemny), więc $x = 6$.\n\nSprawdzenie: $\\frac{1}{6} + \\frac{1}{12} = \\frac{3}{12} = \\frac{1}{4}$.\n\nOdpowiedź: Pierwszy robotnik wykona pracę w $6$ dni, a drugi w $12$ dni.",
    },
    {
      nr: "37", dzial: "liczby", temat: "rownania-wymierne", punkty: 3,
      tresc: "Rowerzysta pokonał trasę długości $36$ km ze stałą prędkością. Gdyby jechał z prędkością większą o $3$ km/h, przejechałby tę trasę o $1$ godzinę krócej. Oblicz, z jaką prędkością jechał rowerzysta. **Zapisz obliczenia.**",
      rozwiazanie: "Niech $x$ oznacza prędkość rowerzysty w km/h, $x > 0$. Czas jazdy to $\\frac{36}{x}$ godzin, a przy prędkości $x + 3$ byłoby to $\\frac{36}{x + 3}$ godzin.\n\nRóżnica czasów wynosi $1$ godzinę: $\\frac{36}{x} - \\frac{36}{x + 3} = 1$.\n\nMnożymy przez $x(x + 3)$: $36(x + 3) - 36x = x(x + 3)$, czyli $108 = x^{2} + 3x$.\n\nStąd $x^{2} + 3x - 108 = 0$. Delta: $9 + 432 = 441$, więc $x = \\frac{-3 - 21}{2} = -12$ lub $x = \\frac{-3 + 21}{2} = 9$.\n\nPrędkość nie może być ujemna, więc $x = 9$.\n\nSprawdzenie: $\\frac{36}{9} = 4$ h oraz $\\frac{36}{12} = 3$ h, różnica $1$ h.\n\nOdpowiedź: Rowerzysta jechał z prędkością $9$ km/h.",
    },
    // ---- logika ----
    {
      nr: "41", dzial: "liczby", temat: "logika", punkty: 2,
      tresc: "Dane jest zdanie: „Dla każdej liczby rzeczywistej $x$ prawdziwa jest nierówność $(x - 1)^{2} > 0$”. Zapisz zaprzeczenie tego zdania i rozstrzygnij, które z tych dwóch zdań jest prawdziwe. **Zapisz obliczenia.**",
      rozwiazanie: "Zaprzeczając zdanie z kwantyfikatorem „dla każdego”, zamieniamy go na „istnieje” i zaprzeczamy nierówność. Zaprzeczeniem $(x - 1)^{2} > 0$ jest $(x - 1)^{2} \\leq 0$.\n\nZaprzeczenie: „Istnieje liczba rzeczywista $x$, dla której $(x - 1)^{2} \\leq 0$”.\n\nDla $x = 1$ mamy $(1 - 1)^{2} = 0$, a $0 \\leq 0$ jest prawdą. Zatem zaprzeczenie jest prawdziwe, więc zdanie wyjściowe jest fałszywe (kontrprzykład: $x = 1$).\n\nOdpowiedź: Zaprzeczenie to „istnieje $x$, że $(x - 1)^{2} \\leq 0$”. Jest ono prawdziwe, a zdanie wyjściowe jest fałszywe.",
    },
    {
      nr: "42", dzial: "liczby", temat: "logika", punkty: 3,
      tresc: "Za pomocą tabeli wartości logicznych sprawdź, czy zdania $p \\Rightarrow q$ oraz $\\neg p \\lor q$ mają taką samą wartość logiczną dla każdego układu wartości zdań $p$ i $q$. **Zapisz obliczenia.**",
      rozwiazanie: "Wypisujemy wszystkie cztery układy wartości $p$ i $q$ ($1$ – prawda, $0$ – fałsz).\n\nImplikacja $p \\Rightarrow q$ jest fałszywa tylko dla $p = 1$ i $q = 0$. Zaprzeczenie $\\neg p$ ma przeciwną wartość niż $p$, a alternatywa $\\neg p \\lor q$ jest fałszywa tylko wtedy, gdy oba składniki są fałszywe.\n\n| p | q | p ⇒ q | ¬p ∨ q |\n|---|---|---|---|\n| 1 | 1 | 1 | 1 |\n| 1 | 0 | 0 | 0 |\n| 0 | 1 | 1 | 1 |\n| 0 | 0 | 1 | 1 |\n\nPrzykładowo dla $p = 1$, $q = 0$: $\\neg p = 0$, więc $\\neg p \\lor q = 0 \\lor 0 = 0$, tak samo jak $p \\Rightarrow q$. W pozostałych wierszach też obie kolumny są równe.\n\nOdpowiedź: Tak, obie kolumny są identyczne, więc zdania $p \\Rightarrow q$ i $\\neg p \\lor q$ mają zawsze taką samą wartość logiczną.",
    },
    {
      nr: "43", dzial: "liczby", temat: "logika", punkty: 3,
      tresc: "Dane jest twierdzenie: „Jeśli czworokąt jest prostokątem, to jego przekątne mają równą długość”. a) Podaj założenie i tezę tego twierdzenia. b) Sformułuj twierdzenie odwrotne. c) Rozstrzygnij, czy twierdzenie odwrotne jest prawdziwe, i uzasadnij odpowiedź kontrprzykładem. **Zapisz odpowiedzi.**",
      rozwiazanie: "a) Założenie: czworokąt jest prostokątem. Teza: przekątne tego czworokąta mają równą długość.\n\nb) Twierdzenie odwrotne zamienia założenie z tezą: „Jeśli przekątne czworokąta mają równą długość, to ten czworokąt jest prostokątem”.\n\nc) Twierdzenie odwrotne jest fałszywe. Kontrprzykładem jest trapez równoramienny, który nie jest prostokątem: jego przekątne mają równą długość, a kąty przy podstawie nie są proste. Przykład: trapez o wierzchołkach $(0, 0)$, $(4, 0)$, $(3, 2)$, $(1, 2)$. Jego przekątne mają długości $\\sqrt{3^{2} + 2^{2}} = \\sqrt{13}$ każda, a trapez nie jest prostokątem.\n\nOdpowiedź: a) założenie – czworokąt jest prostokątem, teza – przekątne są równe. b) „Jeśli przekątne czworokąta są równe, to jest on prostokątem”. c) Fałszywe, kontrprzykład: trapez równoramienny.",
    },
    // ---- wyrazenia: przekształcanie wzorów ----
    {
      nr: "45", dzial: "liczby", temat: "wyrazenia", punkty: 3,
      tresc: "Opór zastępczy $R$ dwóch oporników połączonych równolegle opisuje wzór $\\frac{1}{R} = \\frac{1}{R_{1}} + \\frac{1}{R_{2}}$, gdzie $R$, $R_{1}$, $R_{2}$ są dodatnie i $R_{1} \\neq R$. Wyznacz z tego wzoru $R_{2}$, a następnie oblicz $R_{2}$ dla $R = 3$ i $R_{1} = 6$. **Zapisz obliczenia.**",
      rozwiazanie: "Przenosimy $\\frac{1}{R_{1}}$ na lewą stronę: $\\frac{1}{R_{2}} = \\frac{1}{R} - \\frac{1}{R_{1}}$.\n\nSprowadzamy do wspólnego mianownika $R \\cdot R_{1}$: $\\frac{1}{R_{2}} = \\frac{R_{1} - R}{R \\cdot R_{1}}$.\n\nLiczba $R_{1} - R$ jest różna od zera (z założenia), więc możemy odwrócić ułamki: $R_{2} = \\frac{R \\cdot R_{1}}{R_{1} - R}$.\n\nDla $R = 3$ i $R_{1} = 6$: $R_{2} = \\frac{3 \\cdot 6}{6 - 3} = \\frac{18}{3} = 6$.\n\nSprawdzenie: $\\frac{1}{6} + \\frac{1}{6} = \\frac{1}{3}$.\n\nOdpowiedź: $R_{2} = \\frac{R \\cdot R_{1}}{R_{1} - R}$, a dla podanych danych $R_{2} = 6$.",
    },
    {
      nr: "46", dzial: "liczby", temat: "wyrazenia", punkty: 2,
      tresc: "Po $3$ latach na lokacie z roczną kapitalizacją odsetek i stopą $4\\%$ w skali roku zgromadzono $5624{,}32$ zł. Wyznacz ze wzoru $K = K_{0}(1 + p)^{n}$ kwotę początkową $K_{0}$ i oblicz jej wartość. **Zapisz obliczenia.**",
      rozwiazanie: "Czynnik $(1 + p)^{n}$ jest dodatni, więc możemy przez niego podzielić obie strony wzoru: $K_{0} = \\frac{K}{(1 + p)^{n}}$.\n\nPodstawiamy $K = 5624{,}32$, $p = 0{,}04$, $n = 3$: $K_{0} = \\frac{5624{,}32}{1{,}04^{3}} = \\frac{5624{,}32}{1{,}124864} = 5000$.\n\nSprawdzenie: $5000 \\cdot 1{,}124864 = 5624{,}32$.\n\nOdpowiedź: $K_{0} = \\frac{K}{(1 + p)^{n}}$, wpłacono $5000$ zł.",
    },
    // ---- liczby rzeczywiste ----
    {
      nr: "49", dzial: "liczby", temat: "liczby-rzeczywiste", punkty: 3,
      tresc: "Ola zmierzyła długość boiska i otrzymała $98$ m, chociaż dokładna długość boiska to $100$ m. Jej brat zmierzył długość stołu i otrzymał $2{,}45$ m, chociaż dokładna długość stołu to $2{,}5$ m. Oblicz błąd bezwzględny i błąd względny każdego z tych pomiarów, a następnie rozstrzygnij, który pomiar był dokładniejszy. **Zapisz obliczenia.**",
      rozwiazanie: "Błąd bezwzględny to odległość wyniku pomiaru od wartości dokładnej.\n\nBoisko: $|100 - 98| = 2$ m.\n\nStół: $|2{,}5 - 2{,}45| = 0{,}05$ m.\n\nBłąd względny to błąd bezwzględny podzielony przez wartość dokładną, zapisany w procentach.\n\nBoisko: $\\frac{2}{100} \\cdot 100\\% = 2\\%$.\n\nStół: $\\frac{0{,}05}{2{,}5} \\cdot 100\\% = 2\\%$.\n\nBłąd bezwzględny pomiaru boiska jest większy, ale ten pomiar dotyczy dużo dłuższej wielkości. Błędy względne są równe, więc oba pomiary są tak samo dokładne.\n\nOdpowiedź: Błędy bezwzględne to $2$ m i $0{,}05$ m, błędy względne to $2\\%$ i $2\\%$. Oba pomiary są tak samo dokładne.",
    },
    {
      nr: "50", dzial: "liczby", temat: "liczby-rzeczywiste", punkty: 3,
      tresc: "Wyznacz wszystkie liczby $x$, których odległość od liczby $-3$ na osi liczbowej jest dwa razy większa niż odległość od liczby $7$. **Zapisz obliczenia.**",
      rozwiazanie: "Odległość liczby $x$ od $-3$ to $|x - (-3)| = |x + 3|$, a od $7$ to $|x - 7|$. Z treści: $|x + 3| = 2|x - 7|$.\n\nDwie liczby mają równe wartości bezwzględne, gdy są równe albo przeciwne. Zatem $x + 3 = 2(x - 7)$ albo $x + 3 = -2(x - 7)$.\n\nPierwszy przypadek: $x + 3 = 2x - 14$, więc $x = 17$.\n\nDrugi przypadek: $x + 3 = -2x + 14$, więc $3x = 11$ i $x = \\frac{11}{3}$.\n\nSprawdzenie dla $17$: odległość od $-3$ to $20$, od $7$ to $10$, a $20 = 2 \\cdot 10$. Dla $\\frac{11}{3}$: odległość od $-3$ to $\\frac{20}{3}$, od $7$ to $\\frac{10}{3}$, a $\\frac{20}{3} = 2 \\cdot \\frac{10}{3}$.\n\nOdpowiedź: $x = 17$ lub $x = \\frac{11}{3}$.",
    },
  ],
};
