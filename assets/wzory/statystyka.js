// Karta wzorów: Prawdopodobieństwo i statystyka (matura, poziom podstawowy, formuła 2023).
// Tematy i ich kolejność jak w arkusze/tematy.js. tex – wzór wyśrodkowany (KaTeX bez $), reszta – tekst z $…$.
export const WZORY = [
  {
    id: "kombinatoryka",
    nazwa: "Kombinatoryka",
    wzory: [
      { nazwa: "Reguła mnożenia", tex: "n_{1} \\cdot n_{2} \\cdot \\ldots \\cdot n_{k}", uwaga: "liczba wyników $k$ kolejnych wyborów, gdy $i$-ty wybór można zrobić na $n_{i}$ sposobów" },
      { nazwa: "Reguła dodawania", tex: "|A \\cup B| = |A| + |B| - |A \\cap B|", uwaga: "dla rozłącznych przypadków po prostu dodajesz: $|A| + |B|$" },
      { nazwa: "Silnia", tex: "n! = 1 \\cdot 2 \\cdot \\ldots \\cdot n \\qquad 0! = 1 \\qquad (n + 1)! = n! \\cdot (n + 1)" },
      { nazwa: "Permutacje", tex: "n!", uwaga: "liczba ustawień $n$ różnych elementów w ciąg, np. $5$ osób w kolejce: $5! = 120$" },
      { nazwa: "Wariacje z powtórzeniami", tex: "n^{k}", uwaga: "liczba ciągów długości $k$ o wyrazach z $n$ elementów (mogą się powtarzać), np. kody PIN: $10^{4}$" },
      { nazwa: "Wariacje bez powtórzeń", tex: "\\frac{n!}{(n - k)!} = n \\cdot (n - 1) \\cdot \\ldots \\cdot (n - k + 1)", uwaga: "liczba ciągów $k$ różnych wyrazów z $n$ elementów, np. podium dla $3$ z $10$ zawodników: $10 \\cdot 9 \\cdot 8$" },
      { nazwa: "Kombinacje (symbol Newtona)", tex: "\\binom{n}{k} = \\frac{n!}{k! \\, (n - k)!}", uwaga: "liczba wyborów $k$ elementów z $n$, gdy kolejność nie ma znaczenia; $0 \\leq k \\leq n$" },
      { nazwa: "Własności symbolu Newtona", tex: "\\binom{n}{0} = \\binom{n}{n} = 1 \\qquad \\binom{n}{1} = n \\qquad \\binom{n}{k} = \\binom{n}{n - k} \\qquad \\binom{n}{2} = \\frac{n(n - 1)}{2}", uwaga: "$\\binom{n}{2}$ – liczba par, np. uścisków dłoni lub meczów „każdy z każdym”" },
      { nazwa: "Liczby $k$-cyfrowe", tex: "9 \\cdot 10^{k-1}", uwaga: "pierwsza cyfra od $1$ do $9$, pozostałe od $0$ do $9$; np. liczb trzycyfrowych jest $900$" },
    ],
    jak: [
      "Rozpisz zadanie na kolejne decyzje (np. cyfra po cyfrze) i pomnóż liczby możliwości; zacznij od miejsc z ograniczeniami (pierwsza cyfra $\\neq 0$, ostatnia parzysta).",
      "Gdy zadanie rozpada się na rozłączne przypadki (np. gdzie stoi cyfra $0$), policz każdy osobno i dodaj wyniki.",
      "Ustal, czy kolejność ma znaczenie: ustawienia i kody – mnożysz kolejne wybory; wybór grupy lub pary – użyj $\\binom{n}{k}$ (albo podziel przez liczbę przestawień).",
    ],
  },
  {
    id: "prawdopodobienstwo",
    nazwa: "Prawdopodobieństwo",
    wzory: [
      { nazwa: "Klasyczna definicja prawdopodobieństwa", tex: "P(A) = \\frac{|A|}{|\\Omega|}", uwaga: "$|A|$ – liczba zdarzeń elementarnych sprzyjających, $|\\Omega|$ – liczba wszystkich (jednakowo prawdopodobnych)" },
      { nazwa: "Własności prawdopodobieństwa", tex: "0 \\leq P(A) \\leq 1 \\qquad P(\\varnothing) = 0 \\qquad P(\\Omega) = 1", uwaga: "jeśli $A \\subset B$, to $P(A) \\leq P(B)$" },
      { nazwa: "Zdarzenie przeciwne", tex: "P(A') = 1 - P(A)", uwaga: "przydaje się przy „co najmniej jeden”: $P = 1 - P(\\text{ani jednego})$" },
      { nazwa: "Suma zdarzeń", tex: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)", uwaga: "dla zdarzeń wykluczających się ($A \\cap B = \\varnothing$): $P(A \\cup B) = P(A) + P(B)$" },
      { nazwa: "Rzuty kostką i monetą", tex: "|\\Omega| = 6^{n} \\qquad |\\Omega| = 2^{n}", uwaga: "$n$ rzutów kostką sześcienną lub monetą; dwie kostki: $36$ par – wypisz je w tabelce $6 \\times 6$" },
      { nazwa: "Losowanie dwóch elementów z $n$", tex: "|\\Omega| = n \\cdot n \\qquad |\\Omega| = n \\cdot (n - 1)", uwaga: "pierwszy – ze zwracaniem, drugi – bez zwracania (losowanie kolejno, liczymy pary uporządkowane)" },
    ],
    jak: [
      "Ustal, co jest zdarzeniem elementarnym (para wyników, ciąg, zbiór), i policz $|\\Omega|$ regułą mnożenia.",
      "Zdarzenia sprzyjające licz tym samym sposobem co $\\Omega$ (ta sama kolejność, to samo zwracanie) – najlepiej wypisz je lub zaznacz w tabelce.",
      "Gdy w treści jest „co najmniej jeden” albo „nie więcej niż”, rozważ zdarzenie przeciwne i odejmij jego prawdopodobieństwo od $1$.",
      "Sprawdź wynik: musi należeć do $[0, 1]$; podaj go jako ułamek nieskracalny.",
    ],
  },
  {
    id: "statystyka",
    nazwa: "Statystyka",
    wzory: [
      { nazwa: "Średnia arytmetyczna", tex: "\\bar{a} = \\frac{a_{1} + a_{2} + \\ldots + a_{n}}{n}", uwaga: "stąd suma danych: $a_{1} + a_{2} + \\ldots + a_{n} = n \\cdot \\bar{a}$" },
      { nazwa: "Średnia ważona", tex: "\\bar{s} = \\frac{w_{1} \\cdot a_{1} + w_{2} \\cdot a_{2} + \\ldots + w_{n} \\cdot a_{n}}{w_{1} + w_{2} + \\ldots + w_{n}}", uwaga: "wagi $w_{i} > 0$; dla danych w tabeli wagami są liczebności (ile razy wystąpiła wartość)" },
      { nazwa: "Mediana", tex: "n \\ \\text{nieparzyste:} \\ a_{\\frac{n+1}{2}} \\qquad n \\ \\text{parzyste:} \\ \\frac{1}{2}\\left(a_{\\frac{n}{2}} + a_{\\frac{n}{2}+1}\\right)", uwaga: "dla danych uporządkowanych niemalejąco: środkowy wyraz albo średnia dwóch środkowych" },
      { nazwa: "Dominanta (moda)", tex: "1, \\ 2, \\ 2, \\ 3, \\ 7 \\ \\Rightarrow \\ \\text{Mo} = 2", uwaga: "wartość występująca najczęściej; może być kilka dominant albo żadna" },
      { nazwa: "Wariancja", tex: "\\sigma^{2} = \\frac{(a_{1} - \\bar{a})^{2} + (a_{2} - \\bar{a})^{2} + \\ldots + (a_{n} - \\bar{a})^{2}}{n}", uwaga: "średnia kwadratów odchyleń od średniej" },
      { nazwa: "Wariancja – wzór skrócony", tex: "\\sigma^{2} = \\frac{a_{1}^{2} + a_{2}^{2} + \\ldots + a_{n}^{2}}{n} - \\left(\\bar{a}\\right)^{2}", uwaga: "średnia kwadratów minus kwadrat średniej" },
      { nazwa: "Odchylenie standardowe", tex: "\\sigma = \\sqrt{\\sigma^{2}}", uwaga: "mówi, jak bardzo dane są rozrzucone wokół średniej; ma tę samą jednostkę co dane" },
      { nazwa: "Zmiana wszystkich danych", tex: "a_{i} + c: \\ \\bar{a} + c, \\ \\sigma \\qquad k \\cdot a_{i}: \\ k \\cdot \\bar{a}, \\ |k| \\cdot \\sigma", uwaga: "dodanie stałej przesuwa średnią i medianę, ale nie zmienia odchylenia; mnożenie przez $k$ mnoży średnią przez $k$, a odchylenie przez $|k|$" },
    ],
    jak: [
      "Medianę licz dopiero po uporządkowaniu danych; przy danych z tabeli licz łączne liczebności, aż dojdziesz do środkowych miejsc.",
      "Gdy dopisujesz lub usuwasz dane, pracuj na sumie: suma $= n \\cdot \\bar{a}$, potem nowa suma przez nową liczbę danych.",
      "Odchylenie standardowe: średnia, kwadraty odchyleń od średniej, ich średnia (wariancja), na końcu pierwiastek.",
    ],
  },
];
