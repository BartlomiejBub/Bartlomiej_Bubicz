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
  ],
};
