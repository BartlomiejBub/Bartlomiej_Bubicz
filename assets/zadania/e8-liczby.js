// Zadania do ćwiczeń – Liczby i działania (szkoła podstawowa): zbiory opisane nierównością, liczba przeciwna i odwrotna.
// Ułożone dla strony. Format jak arkusz (opis w tools/test-arkusze.mjs).
export default {
  nazwa: "Zadania do ćwiczeń – Liczby i działania",
  zadania: [
    {
      nr: "1", dzial: "e8-liczby", temat: "os-liczbowa",
      tresc: "Które liczby całkowite spełniają nierówność $-1 \\le x < 3$? **Wybierz właściwą odpowiedź.**",
      opcje: ["$-1, 0, 1, 2, 3$", "$0, 1, 2$", "$-1, 0, 1, 2$", "$-2, -1, 0, 1, 2$"],
      poprawna: 2,
    },
    {
      nr: "2", dzial: "e8-liczby", temat: "os-liczbowa",
      tresc: "Suma liczby przeciwnej do $4$ i liczby odwrotnej do $4$ jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$4\\frac{1}{4}$", "$3\\frac{3}{4}$", "$-4\\frac{1}{4}$", "$-3\\frac{3}{4}$"],
      poprawna: 3,
    },
    // ---- system dziesiętny i rzymski ----
    {
      nr: "4", dzial: "e8-liczby", temat: "systemy-zapisu",
      tresc: "Ile pełnych setek jest w liczbie $83\\,475$? **Wybierz właściwą odpowiedź.**",
      opcje: ["$4$", "$83$", "$834$", "$8347$"],
      poprawna: 2,
    },
    {
      nr: "5", dzial: "e8-liczby", temat: "systemy-zapisu",
      tresc: "Jaką liczbę zapisano rzymskimi cyframi $\\text{MCMXLVII}$? **Wybierz właściwą odpowiedź.**",
      opcje: ["$1947$", "$2167$", "$1987$", "$1857$"],
      poprawna: 0,
    },
    // ---- zaokrąglanie i szacowanie ----
    {
      nr: "8", dzial: "e8-liczby", temat: "zaokraglanie",
      tresc: "Liczbę $4{,}6951$ zaokrąglono do części setnych. Jaki wynik otrzymano? **Wybierz właściwą odpowiedź.**",
      opcje: ["$4{,}60$", "$4{,}69$", "$4{,}71$", "$4{,}70$"],
      poprawna: 3,
    },
    {
      nr: "9", dzial: "e8-liczby", temat: "zaokraglanie",
      tresc: "Jakie jest przybliżenie liczby $5{,}382$ do części setnych z nadmiarem? **Wybierz właściwą odpowiedź.**",
      opcje: ["$5{,}38$", "$5{,}4$", "$5{,}39$", "$6$"],
      poprawna: 2,
    },
  ],
  otwarte: [
    {
      nr: "3", dzial: "e8-liczby", temat: "os-liczbowa", punkty: 2,
      tresc: "Na osi liczbowej zaznaczono pustą kropkę w punkcie $-3$ i pełną kropkę w punkcie $2$, a cały odcinek między nimi jest zamalowany. Zapisz nierównością zbiór liczb opisany tym rysunkiem, wypisz wszystkie liczby całkowite z tego zbioru i oblicz ich sumę. **Zapisz obliczenia.**",
      rozwiazanie: "Pusta kropka w $-3$ oznacza, że liczba $-3$ nie należy do zbioru ($x > -3$). Pełna kropka w $2$ oznacza, że liczba $2$ należy do zbioru ($x \\le 2$).\n\nNierówność: $-3 < x \\le 2$.\n\nLiczby całkowite: $-2, -1, 0, 1, 2$ (bez $-3$, z $2$).\n\nSuma: $-2 + (-1) + 0 + 1 + 2 = 0$.\n\nOdpowiedź: $-3 < x \\le 2$; liczby całkowite: $-2, -1, 0, 1, 2$; ich suma to $0$.",
    },
    // ---- system dziesiętny i rzymski ----
    {
      nr: "6", dzial: "e8-liczby", temat: "systemy-zapisu", punkty: 2,
      tresc: "Z cyfr $6$, $0$, $3$, $9$ (każdej cyfry użyj dokładnie raz) układamy liczby czterocyfrowe. Zapisz największą i najmniejszą z nich oraz oblicz ich różnicę. Co oznacza cyfra $9$ w największej liczbie? **Zapisz obliczenia.**",
      rozwiazanie: "Największa liczba: cyfry od największej do najmniejszej, czyli $9630$.\n\nNajmniejsza liczba: cyfry od najmniejszej, ale zero nie może stać na początku. Na początku daje się więc najmniejszą cyfrę różną od zera, czyli $3$, a potem $0$, $6$, $9$: $3069$.\n\nRóżnica: $9630 - 3069 = 6561$.\n\nW liczbie $9630$ cyfra $9$ stoi na miejscu tysięcy, więc oznacza $9000$ (dziewięć tysięcy).\n\nOdpowiedź: Największa liczba to $9630$, najmniejsza to $3069$, a ich różnica to $6561$. Cyfra $9$ oznacza $9000$.",
    },
    {
      nr: "7", dzial: "e8-liczby", temat: "systemy-zapisu", punkty: 2,
      tresc: "Na starym pomniku wyryto rok $\\text{MCMXXXIX}$. Zapisz ten rok zwykłymi cyframi i podaj, w którym wieku to było (rzymską liczbą). Zapisz też rzymskimi cyframi rok $2026$. **Zapisz obliczenia.**",
      rozwiazanie: "Czytamy od lewej: $\\text{M}$ to $1000$, $\\text{CM}$ to $1000 - 100 = 900$ (mniejszy znak przed większym), $\\text{XXX}$ to $30$, $\\text{IX}$ to $9$.\n\nRazem: $1000 + 900 + 30 + 9 = 1939$.\n\nRok $1939$ należy do wieku $\\text{XX}$ (lata $1901$–$2000$).\n\nRok $2026$ rozbijamy na $2000 + 20 + 6$. Zapisujemy: $2000 = \\text{MM}$, $20 = \\text{XX}$, $6 = \\text{VI}$, czyli $\\text{MMXXVI}$.\n\nOdpowiedź: Na pomniku jest rok $1939$, czyli wiek $\\text{XX}$. Rok $2026$ zapisujemy $\\text{MMXXVI}$.",
    },
    // ---- zaokrąglanie i szacowanie ----
    {
      nr: "10", dzial: "e8-liczby", temat: "zaokraglanie", punkty: 2,
      tresc: "Ania ma $50$ zł. Chce kupić zeszyt za $7{,}99$ zł, długopis za $3{,}49$ zł, farby za $18{,}90$ zł i blok rysunkowy za $12{,}20$ zł. Zaokrąglij każdą cenę w górę do pełnych złotych i oszacuj sumę. Czy na pewno wystarczy pieniędzy? Potem oblicz dokładną sumę i resztę, jaka zostanie Ani. **Zapisz obliczenia.**",
      rozwiazanie: "Zaokrąglamy każdą cenę **w górę** do pełnych złotych, bo chcemy mieć pewność, że pieniędzy wystarczy.\n\n$7{,}99 \\approx 8$, $3{,}49 \\approx 4$, $18{,}90 \\approx 19$, $12{,}20 \\approx 13$.\n\nSzacunek sumy: $8 + 4 + 19 + 13 = 44$ zł. To mniej niż $50$ zł, więc pieniędzy na pewno wystarczy.\n\nDokładna suma: $7{,}99 + 3{,}49 = 11{,}48$, potem $11{,}48 + 18{,}90 = 30{,}38$, a na końcu $30{,}38 + 12{,}20 = 42{,}58$ zł.\n\nReszta: $50 - 42{,}58 = 7{,}42$ zł.\n\nOdpowiedź: Szacunkowo zakupy kosztują $44$ zł, więc pieniędzy wystarczy. Dokładna suma to $42{,}58$ zł, a Ani zostanie $7{,}42$ zł.",
    },
    {
      nr: "11", dzial: "e8-liczby", temat: "zaokraglanie", punkty: 2,
      tresc: "Pani Ewa ma $20$ litrów soku. Rozlewa go do butelek, z których każda mieści $0{,}75$ l. Ile pełnych butelek napełni? Ile butelek musi przygotować, żeby zmieścić cały sok? Ile soku będzie w ostatniej, niepełnej butelce? **Zapisz obliczenia.**",
      rozwiazanie: "Dzielimy: $20 : 0{,}75 = 2000 : 75 = 26\\frac{2}{3}$, czyli około $26{,}7$.\n\nPytanie „ile pełnych” – zaokrąglamy **w dół**: $26$ pełnych butelek. Sprawdzenie: $26 \\cdot 0{,}75 = 19{,}5$ l.\n\nPytanie „ile potrzeba, żeby zmieścić cały sok” – zaokrąglamy **w górę**: $27$ butelek, bo na resztę soku też trzeba butelki.\n\nW ostatniej butelce będzie $20 - 19{,}5 = 0{,}5$ l soku.\n\nOdpowiedź: Pani Ewa napełni $26$ pełnych butelek, ale musi przygotować $27$ butelek. W ostatniej będzie $0{,}5$ l soku.",
    },
  ],
};
