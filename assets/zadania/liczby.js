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
  ],
};
