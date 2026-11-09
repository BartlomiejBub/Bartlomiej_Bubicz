// Zadania do ćwiczeń – Liczby i działania (szkoła podstawowa): zbiory opisane nierównością, liczba przeciwna i odwrotna.
// Ułożone dla strony. Format jak arkusz (opis w tools/test-arkusze.mjs).
export default {
  nazwa: "Zadania do ćwiczeń – Liczby i działania",
  zadania: [
    {
      nr: "1", dzial: "e8-liczby", temat: "os-liczbowa",
      tresc: "Liczby całkowite, które spełniają nierówność $-1 \\le x < 3$, to. **Wybierz właściwą odpowiedź.**",
      opcje: ["$-1, 0, 1, 2, 3$", "$0, 1, 2$", "$-1, 0, 1, 2$", "$-2, -1, 0, 1, 2$"],
      poprawna: 2,
    },
    {
      nr: "2", dzial: "e8-liczby", temat: "os-liczbowa",
      tresc: "Suma liczby przeciwnej do $4$ i liczby odwrotnej do $4$ jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$4\\frac{1}{4}$", "$3\\frac{3}{4}$", "$-4\\frac{1}{4}$", "$-3\\frac{3}{4}$"],
      poprawna: 3,
    },
  ],
  otwarte: [
    {
      nr: "3", dzial: "e8-liczby", temat: "os-liczbowa", punkty: 2,
      tresc: "Na osi liczbowej zaznaczono pustą kropkę w punkcie $-3$ i pełną kropkę w punkcie $2$, a cały odcinek między nimi jest zamalowany. Zapisz nierównością zbiór liczb opisany tym rysunkiem, wypisz wszystkie liczby całkowite z tego zbioru i oblicz ich sumę. **Zapisz obliczenia.**",
      rozwiazanie: "Pusta kropka w $-3$ oznacza, że liczba $-3$ nie należy do zbioru ($x > -3$). Pełna kropka w $2$ oznacza, że liczba $2$ należy do zbioru ($x \\le 2$).\n\nNierówność: $-3 < x \\le 2$.\n\nLiczby całkowite: $-2, -1, 0, 1, 2$ (bez $-3$, z $2$).\n\nSuma: $-2 + (-1) + 0 + 1 + 2 = 0$.\n\nOdpowiedź: $-3 < x \\le 2$; liczby całkowite: $-2, -1, 0, 1, 2$; ich suma to $0$.",
    },
  ],
};
