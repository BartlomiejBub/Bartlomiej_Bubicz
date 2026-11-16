// Klasa 6 (szkoła podstawowa) · rozdział I „Liczby całkowite” – Matematyka z kluczem 6 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).

// --- Pomocnicze (tylko dla tego pliku)

/** Poprawna forma rzeczownika po liczbie: 1 piętro, 2 piętra, 5 pięter. */
function mn(n, a, b, c) {
  const m10 = n % 10, m100 = n % 100;
  if (n === 1) return a;
  return m10 >= 2 && m10 <= 4 && !(m100 >= 12 && m100 <= 14) ? b : c;
}
const lw = (n, a, b, c) => `${n} ${mn(n, a, b, c)}`;

/** Liczba całkowita, ujemna w nawiasie: 5, (-5). */
const nw = (n) => (n < 0 ? `(${n})` : `${n}`);

/** Kroki rozwiązania dodawania dwóch liczb całkowitych różnych od zera (a + b). */
function sumaKroki(a, b) {
  const w = a + b, pa = Math.abs(a), pb = Math.abs(b);
  if (w === 0) return [`Liczby $${a}$ i $${b}$ są przeciwne, więc ich suma to $0$.`];
  if (a > 0 && b > 0) return [`Obie liczby są dodatnie, więc dodajemy: $${a} + ${b} = ${w}$.`];
  if (a < 0 && b < 0) {
    return [`Obie liczby są ujemne. Dodajemy ich odległości od zera: $${pa} + ${pb} = ${pa + pb}$.`, `Wynik jest ujemny: $${w}$.`];
  }
  const dalej = pa > pb ? a : b;
  return [
    `Liczby mają różne znaki. Odległości od zera to $${pa}$ i $${pb}$.`,
    `Odejmujemy mniejszą od większej: $${Math.max(pa, pb)} - ${Math.min(pa, pb)} = ${Math.abs(w)}$.`,
    `Dalej od zera leży $${dalej}$ (liczba ${dalej < 0 ? "ujemna" : "dodatnia"}), więc wynik jest ${dalej < 0 ? "ujemny" : "dodatni"}: $${w}$.`,
  ];
}

export default {
  tematy: [
    // ------------------------------------------------------------------------------------------------
    {
      id: "liczby-ujemne",
      nazwa: "Liczby dodatnie i ujemne",
      sciaga: [
        {
          nazwa: "Liczby całkowite",
          slownie: "Liczby całkowite to liczby naturalne, zero i liczby do nich przeciwne. Używamy ich tam, gdzie coś może być „poniżej zera”: przy temperaturze, piętrach, wysokości, długach.",
          tex: "\\ldots,-2,-1,0,1,2,\\ldots",
          przyklad: "$-5$°C to $5$ stopni poniżej zera. Wysokość $-20$ m to $20$ m poniżej poziomu morza. Dług $30$ zł to $-30$ zł. Piętro $-2$ to drugi poziom garażu pod ziemią.",
          uwaga: "Zero nie jest ani dodatnie, ani ujemne. Liczba $2{,}5$ nie jest całkowita, bo leży między $2$ a $3$.",
        },
        {
          nazwa: "Oś liczbowa",
          slownie: "Na osi liczbowej zero jest w środku. Liczby dodatnie leżą na prawo od zera, a ujemne na lewo. Im dalej w prawo, tym liczba jest większa.",
          tex: "\\ldots<-2<-1<0<1<2<\\ldots",
          przyklad: "Od $-3$ do $2$ idziemy przez liczby $-3$, $-2$, $-1$, $0$, $1$, $2$. Między $-3$ a $2$ (bez tych dwóch liczb) leżą cztery liczby całkowite: $-2$, $-1$, $0$, $1$.",
          uwaga: "Przy liczeniu liczb całkowitych między dwiema liczbami nie zapomnij o zerze.",
        },
        {
          nazwa: "Porównywanie liczb",
          slownie: "Większa jest ta liczba, która leży bardziej na prawo. Każda liczba ujemna jest mniejsza od zera i od każdej liczby dodatniej. Z dwóch liczb ujemnych większa jest ta, która leży bliżej zera.",
          tex: "-9<-4\\qquad -4<0\\qquad 0<5",
          przyklad: "$-12 < -3$, bo $-12$ leży dalej od zera. Mróz $-12$°C jest mocniejszy niż $-3$°C. Liczby $4$, $-6$, $0$, $-1$ od najmniejszej: $-6 < -1 < 0 < 4$.",
          uwaga: "$-20$ nie jest większe od $-5$ tylko dlatego, że $20 > 5$. Liczba $-5$ jest bliżej zera, więc $-5 > -20$.",
        },
        {
          nazwa: "Liczby przeciwne",
          slownie: "Liczby przeciwne leżą po dwóch stronach zera, w tej samej odległości od niego. Różnią się tylko znakiem. Liczbą przeciwną do zera jest zero.",
          tex: "7\\text{ i }-7\\qquad -12\\text{ i }12",
          przyklad: "Przeciwna do $15$ to $-15$. Przeciwna do $-8$ to $8$. Suma liczb przeciwnych jest równa zero: $9 + (-9) = 0$.",
          uwaga: "Liczba przeciwna do ujemnej jest dodatnia. Przeciwna do $-8$ to $8$, a nie $-8$.",
        },
        {
          nazwa: "Odległość od zera",
          slownie: "Odległość liczby od zera to liczba kroków na osi od zera do tej liczby. Odległość nigdy nie jest ujemna. Liczby przeciwne mają taką samą odległość od zera.",
          przyklad: "Liczba $-7$ leży $7$ kroków od zera. Liczby $-7$ i $7$ mają tę samą odległość od zera. W odległości $3$ od zera leżą dwie liczby: $-3$ i $3$.",
          uwaga: "Odległość od zera nie ma minusa. Liczba $-7$ jest w odległości $7$ od zera, a nie $-7$.",
        },
      ],
      jak: [
        "Wyobraź sobie termometr albo oś liczbową. Liczby ujemne są na lewo od zera.",
        "Porównując, szukaj liczby bardziej na prawo. Z dwóch liczb ujemnych większa jest ta, która jest bliżej zera.",
        "Liczbę przeciwną dostajesz, zmieniając znak liczby. Odległość od zera to liczba bez znaku.",
        "Zadania o piętrach i temperaturach: narysuj małą oś i zaznacz na niej liczby.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Rano termometr pokazywał $-3$°C, w południe $2$°C, wieczorem $-8$°C, a w nocy $-5$°C. Kiedy było najzimniej? **Wybierz właściwą odpowiedź.**",
          opcje: ["rano", "w południe", "wieczorem", "w nocy"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Którą liczbą zapiszemy wysokość $35$ m poniżej poziomu morza? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-35$ m", "$35$ m", "$-3{,}5$ m", "$53$ m"],
          poprawna: 0,
        },
        {
          nr: "3",
          tresc: "Która nierówność jest prawdziwa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-9 > -2$", "$-1 < -6$", "$3 < -3$", "$-5 < -4$"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "Ile liczb całkowitych leży na osi liczbowej między $-4$ a $3$ (bez tych dwóch liczb)? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$6$", "$7$", "$8$"],
          poprawna: 1,
        },
        {
          nr: "5",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Liczba $-10$ leży bliżej zera niż liczba $-4$.", litery: "PF", poprawna: 1 },
            { tekst: "Liczba przeciwna do $-6$ to $6$.", litery: "PF", poprawna: 0 },
            { tekst: "Zero jest liczbą dodatnią.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Na osi liczbowej zaznaczono liczby $-5$, $3$, $-1$, $-8$, $6$ i $2$. Ustaw je od najmniejszej do największej. Która z nich leży najbliżej zera, a która najdalej od zera? **Zapisz obliczenia.**",
          rozwiazanie: "Liczby ujemne to $-5$, $-1$ i $-8$. Z ujemnych najmniejsza jest ta, która leży najdalej od zera: $-8 < -5 < -1$.\n\nLiczby dodatnie ustawiamy zwyczajnie: $2 < 3 < 6$.\n\nWszystkie razem: $-8 < -5 < -1 < 2 < 3 < 6$.\n\nOdległości od zera to kolejno $5$, $3$, $1$, $8$, $6$, $2$. Najmniejsza jest $1$ (liczba $-1$), a największa $8$ (liczba $-8$).\n\nOdpowiedź: Od najmniejszej: $-8$, $-5$, $-1$, $2$, $3$, $6$. Najbliżej zera leży $-1$, a najdalej $-8$.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Ewa zaparkowała samochód na piętrze garażu oznaczonym $-3$. Jej mieszkanie jest na piętrze o numerze przeciwnym do numeru piętra garażu. Na którym piętrze jest mieszkanie? Ile pięter pokona winda, jadąc z garażu do mieszkania? **Zapisz obliczenia.**",
          rozwiazanie: "Liczba przeciwna do $-3$ to $3$, więc mieszkanie jest na piętrze $3$.\n\nWinda jedzie z piętra $-3$ na parter ($0$): to $3$ piętra.\n\nPotem z parteru na piętro $3$: jeszcze $3$ piętra.\n\nRazem: $3 + 3 = 6$.\n\nOdpowiedź: Mieszkanie jest na piętrze $3$, a winda pokona $6$ pięter.",
        },
      ],
      generatory: [
        {
          id: "porownaj-calkowite",
          nazwa: "Porównaj liczby",
          opis: "Wstaw znak $<$, $=$ lub $>$ albo wskaż najmniejszą lub największą z czterech liczb całkowitych.",
          generuj(r) {
            if (r.chance(0.4)) {
              let n;
              do {
                n = Array.from({ length: 4 }, () => r.int(-15, 15));
              } while (new Set(n).size < 4 || !n.some((x) => x < 0));
              const mal = r.chance(0.5);
              const sorted = [...n].sort((a, b) => a - b);
              const w = mal ? sorted[0] : sorted[3];
              const lista = n.map((x) => `$${x}$`).join(", ");
              return {
                tresc: `Która z liczb ${lista} jest ${mal ? "najmniejsza" : "największa"}?`,
                pola: [{ id: "w", typ: "wybor", etykieta: mal ? "Najmniejsza liczba" : "Największa liczba", opcje: n.map((x) => `$${x}$`) }],
                odpowiedz: { w: n.indexOf(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Ustawiamy liczby od najmniejszej do największej: $${sorted.join(" < ")}$.`,
                  `${mal ? "Najmniejsza" : "Największa"} jest liczba $${w}$, bo leży ${mal ? "najbardziej na lewo" : "najbardziej na prawo"} na osi liczbowej.`,
                ],
              };
            }
            let a, b;
            do {
              a = r.int(-20, 20);
              b = r.chance(0.1) ? a : r.int(-20, 20);
            } while (a >= 0 && b >= 0);
            const c = Math.sign(a - b);
            const wyn = c < 0 ? 0 : c === 0 ? 1 : 2;
            const ZN = ["<", "=", ">"];
            const kroki = [];
            if (c === 0) {
              kroki.push(`Obie liczby leżą w tym samym miejscu osi liczbowej, więc są równe.`);
            } else if (a < 0 && b < 0) {
              const blizej = c > 0 ? a : b;
              kroki.push(`Obie liczby są ujemne. Większa jest ta, która leży bliżej zera.`);
              kroki.push(`Liczba $${blizej}$ jest bliżej zera, więc jest większa.`);
            } else {
              kroki.push(`Jedna liczba jest ujemna, a druga nie. Liczba ujemna leży na osi na lewo od zera, więc jest mniejsza.`);
            }
            kroki.push(`Zatem $${a} ${ZN[wyn]} ${b}$.`);
            return {
              tresc: r.pick([`Jaki znak ($<$, $=$ albo $>$) trzeba wstawić między $${a}$ i $${b}$?`, `Porównaj liczby $${a}$ i $${b}$. Jaki znak należy wstawić między nie?`]),
              pola: [{ id: "w", typ: "wybor", etykieta: "Znak", opcje: ["$<$", "$=$", "$>$"] }],
              odpowiedz: { w: wyn },
              wynik: `$${a} ${ZN[wyn]} ${b}$`,
              rozwiazanie: kroki,
            };
          },
        },
        {
          id: "przeciwna-odleglosc",
          nazwa: "Przeciwna i odległość",
          opis: "Podaj liczbę przeciwną, odległość od zera albo policz liczby całkowite leżące między dwiema liczbami.",
          generuj(r) {
            const typ = r.int(0, 2);
            if (typ === 0) {
              const x = r.intBez(-60, 60, 0);
              const odp = -x;
              return {
                tresc: r.pick([`Podaj liczbę przeciwną do liczby $${x}$.`, `Jaka liczba leży w tej samej odległości od zera co $${x}$, ale po drugiej stronie zera?`, `Wpisz liczbę przeciwną do $${x}$.`]),
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba przeciwna" }],
                odpowiedz: { w: odp },
                wynik: `$${odp}$`,
                rozwiazanie: [
                  `Liczba $${x}$ leży ${x < 0 ? "na lewo" : "na prawo"} od zera, w odległości $${Math.abs(x)}$.`,
                  `Liczba przeciwna leży tyle samo kroków od zera, ale po drugiej stronie: $${odp}$.`,
                ],
              };
            }
            if (typ === 1) {
              const x = r.intBez(-60, 60, 0);
              return {
                tresc: r.pick([`Jaka jest odległość liczby $${x}$ od zera?`, `Ile kroków na osi liczbowej dzieli liczbę $${x}$ od zera?`]),
                pola: [{ id: "w", typ: "liczba", etykieta: "Odległość od zera" }],
                odpowiedz: { w: Math.abs(x) },
                wynik: `$${Math.abs(x)}$`,
                rozwiazanie: [
                  `Odległość od zera to liczba kroków do zera, więc nigdy nie jest ujemna.`,
                  `Z liczby $${x}$ do zera jest $${Math.abs(x)}$ ${mn(Math.abs(x), "krok", "kroki", "kroków")}.`,
                ],
              };
            }
            const a = r.int(-9, -1), b = r.int(1, 9);
            const ile = b - a - 1;
            return {
              tresc: r.pick([`Ile liczb całkowitych leży na osi liczbowej między $${a}$ a $${b}$ (bez tych dwóch liczb)?`, `Ile jest liczb całkowitych większych od $${a}$ i mniejszych od $${b}$?`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba liczb całkowitych" }],
              odpowiedz: { w: ile },
              wynik: `$${ile}$`,
              rozwiazanie: [
                `Liczb ujemnych większych od $${a}$ jest $${-a - 1}$. Zero to $1$ liczba. Liczb dodatnich mniejszych od $${b}$ jest $${b - 1}$.`,
                `Razem: $${-a - 1} + 1 + ${b - 1} = ${ile}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "dodawanie-calkowitych",
      nazwa: "Dodawanie liczb całkowitych",
      sciaga: [
        {
          nazwa: "Dodawanie na osi liczbowej",
          slownie: "Zaczynamy w miejscu pierwszej liczby. Gdy dodajemy liczbę dodatnią, idziemy w prawo. Gdy dodajemy liczbę ujemną, idziemy w lewo.",
          tex: "3+(-5)=-2",
          przyklad: "$-2 + 6$: zaczynamy w $-2$ i idziemy $6$ kroków w prawo. Dochodzimy do $4$. Dalej: $3 + (-5)$: zaczynamy w $3$ i idziemy $5$ kroków w lewo, dochodzimy do $-2$.",
          uwaga: "Liczbę ujemną w sumie zapisujemy w nawiasie, np. $3 + (-5)$. Bez nawiasu dwa znaki stoją obok siebie i łatwo się pomylić.",
        },
        {
          nazwa: "Liczby o takich samych znakach",
          slownie: "Gdy obie liczby są ujemne, dodajemy ich odległości od zera i przed wynikiem piszemy minus. Gdy obie są dodatnie, po prostu dodajemy.",
          tex: "-3+(-4)=-7",
          przyklad: "$-12 + (-5)$: odległości od zera to $12$ i $5$, razem $17$. Obie liczby są ujemne, więc wynik to $-17$.",
          uwaga: "$-3 + (-4)$ nie jest równe $1$. Dwa spadki temperatury razem dają większy spadek.",
        },
        {
          nazwa: "Liczby o różnych znakach",
          slownie: "Od większej odległości od zera odejmij mniejszą. Wynik ma taki znak, jaki ma liczba leżąca dalej od zera.",
          tex: "-9+4=-5\\qquad 9+(-4)=5",
          przyklad: "$-7 + 10$: odległości od zera to $7$ i $10$. Dalej od zera jest $10$ (liczba dodatnia), więc wynik jest dodatni: $10 - 7 = 3$.",
          uwaga: "$-9 + 4$ nie daje $5$. Liczba $-9$ leży dalej od zera niż $4$, więc wynik jest ujemny: $-5$.",
        },
        {
          nazwa: "Suma liczb przeciwnych i zero",
          slownie: "Suma dwóch liczb przeciwnych jest równa zero. Dodanie zera niczego nie zmienia.",
          tex: "5+(-5)=0\\qquad -8+0=-8",
          przyklad: "$-9 + 9 = 0$. W grze wynik wynosi $-4$ punkty, potem dostajemy $4$ punkty: $-4 + 4 = 0$. Dalej: $0 + (-6) = -6$.",
          uwaga: "$-5 + 5$ nie jest równe $-10$. Liczba przeciwna „kasuje” drugą liczbę, zostaje zero.",
        },
        {
          nazwa: "Dodawanie kilku liczb",
          slownie: "Dodajemy osobno wszystkie liczby dodatnie i osobno wszystkie ujemne. Na końcu łączymy te dwa wyniki. Można też liczyć po kolei od lewej strony.",
          tex: "-5+8+(-3)+6=14+(-8)=6",
          przyklad: "$-7 + 4 + (-2) + 9$: dodatnie $4 + 9 = 13$. Ujemne $-7 + (-2) = -9$. Razem $13 + (-9) = 4$.",
          uwaga: "Nie gub minusów. Liczby $-7$ i $7$ są różne, więc i sumy wychodzą różne.",
        },
      ],
      jak: [
        "Sprawdź znaki obu liczb.",
        "Takie same znaki: dodaj odległości od zera. Wynik ma ten sam znak.",
        "Różne znaki: odejmij mniejszą odległość od większej. Znak wyniku jest taki jak znak liczby leżącej dalej od zera.",
        "Gdy się pogubisz, narysuj oś liczbową i policz kroki w prawo albo w lewo.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Ile to jest $-7 + 12$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$-5$", "$19$", "$-19$"],
          poprawna: 0,
        },
        {
          nr: "9",
          tresc: "Ile to jest $-9 + (-6)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-3$", "$3$", "$15$", "$-15$"],
          poprawna: 3,
        },
        {
          nr: "10",
          tresc: "Rano na termometrze było $-4$°C. Do południa temperatura wzrosła o $11$ stopni, a wieczorem spadła o $9$ stopni. Ile stopni było wieczorem? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$°C", "$-24$°C", "$-2$°C", "$16$°C"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "Które z działań ma wynik $-3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8 + (-5)$", "$-8 + 5$", "$-8 + (-5)$", "$-5 + 8$"],
          poprawna: 1,
        },
        {
          nr: "12",
          tresc: "Ile wynosi $-15 + 8 + (-6) + 20$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$19$", "$-7$", "$-49$", "$7$"],
          poprawna: 3,
        },
        {
          nr: "13",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$6 + (-9) = 3$", litery: "PF", poprawna: 1 },
            { tekst: "$-5 + (-5) = -10$", litery: "PF", poprawna: 0 },
            { tekst: "$-13 + 13 = 0$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "14",
          punkty: 2,
          tresc: "Zosia ma $24$ zł, ale jest winna bratu $40$ zł. Dług zapisujemy jako liczbę ujemną. Ile wynosi stan pieniędzy Zosi, czyli suma jej pieniędzy i długu? Potem mama dała Zosi $30$ zł. Jaki jest teraz jej stan pieniędzy? **Zapisz obliczenia.**",
          rozwiazanie: "Pieniądze i dług: $24 + (-40)$. Liczby mają różne znaki, odległości od zera to $24$ i $40$. Dalej od zera leży $-40$, więc wynik jest ujemny: $40 - 24 = 16$, czyli $-16$.\n\nPo otrzymaniu $30$ zł: $-16 + 30$. Dalej od zera leży $30$ (liczba dodatnia), więc wynik jest dodatni: $30 - 16 = 14$.\n\nOdpowiedź: Najpierw stan Zosi to $-16$ zł (jest $16$ zł na minusie), a po pieniądzach od mamy $14$ zł.",
        },
        {
          nr: "15",
          punkty: 2,
          tresc: "Nurek zanurzył się na głębokość $15$ m pod powierzchnią wody (poziom $-15$ m). Potem wynurzył się o $6$ m, a następnie zanurzył się o $4$ m. Na jakiej głębokości jest teraz? **Zapisz obliczenia.**",
          rozwiazanie: "Wynurzenie o $6$ m to dodanie $6$: $-15 + 6$. Dalej od zera leży $-15$, więc wynik jest ujemny: $15 - 6 = 9$, czyli $-9$.\n\nZanurzenie o $4$ m to dodanie $-4$: $-9 + (-4)$. Obie liczby są ujemne, więc dodajemy odległości: $9 + 4 = 13$, czyli $-13$.\n\nOdpowiedź: Nurek jest na poziomie $-13$ m, czyli $13$ m pod powierzchnią wody.",
        },
      ],
      generatory: [
        {
          id: "suma-dwoch",
          nazwa: "Dodaj liczby",
          opis: "Dodaj dwie liczby całkowite (dodatnie i ujemne).",
          generuj(r) {
            let a = r.intBez(-30, 30, 0);
            let b = r.intBez(-30, 30, 0);
            if (r.chance(0.1)) b = -a;
            const w = a + b;
            return {
              tresc: r.pick([`Oblicz $${a} + ${nw(b)}$.`, `Ile to jest $${a} + ${nw(b)}$?`, `Podaj wynik działania $${a} + ${nw(b)}$.`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w },
              wynik: `$${w}$`,
              rozwiazanie: sumaKroki(a, b),
            };
          },
        },
        {
          id: "zmiany-po-kolei",
          nazwa: "Zmiany po kolei",
          opis: "Trzy zmiany po sobie: temperatura, piętro windy albo wynik w grze. Policz wynik końcowy.",
          generuj(r) {
            const kt = r.int(0, 2);
            let s, c;
            for (;;) {
              if (kt === 0) {
                s = r.int(-10, 10);
                c = [0, 1, 2].map(() => r.intBez(-9, 9, 0));
              } else if (kt === 1) {
                s = r.int(-3, 6);
                c = [0, 1, 2].map(() => r.intBez(-8, 8, 0));
              } else {
                s = r.int(-15, 15);
                c = [0, 1, 2].map(() => r.intBez(-15, 15, 0));
              }
              const t = [s, s + c[0], s + c[0] + c[1], s + c[0] + c[1] + c[2]];
              const ok = kt === 1 ? t.slice(1).every((v) => v >= -3 && v <= 12) : t.every((v) => Math.abs(v) <= (kt === 0 ? 15 : 25));
              if (ok) break;
            }
            const f = s + c[0] + c[1] + c[2];
            const nazwa = (x) => (kt === 0 ? (x > 0 ? "Wzrost" : "Spadek") : kt === 1 ? (x > 0 ? "Jazda w górę" : "Jazda w dół") : x > 0 ? "Wzrost liczby punktów" : "Spadek liczby punktów");
            const kroki = [];
            let cur = s;
            for (const x of c) {
              kroki.push(`${nazwa(x)} to dodanie liczby $${x}$: $${cur} + ${nw(x)} = ${cur + x}$.`);
              cur += x;
            }
            let tresc, pole, wynik;
            if (kt === 0) {
              const op = (x) => `${x > 0 ? "wzrosła" : "spadła"} o ${lw(Math.abs(x), "stopień", "stopnie", "stopni")}`;
              tresc = `Rano temperatura wynosiła $${s}$°C. Do południa ${op(c[0])}, po południu ${op(c[1])}, a wieczorem ${op(c[2])}. Ile stopni było wieczorem?`;
              pole = "Temperatura wieczorem w °C";
              wynik = `$${f}$°C`;
            } else if (kt === 1) {
              const op = (x) => `${x > 0 ? "w górę" : "w dół"} o ${lw(Math.abs(x), "piętro", "piętra", "pięter")}`;
              tresc = `Winda stała na piętrze $${s}$ (piętra ujemne są pod ziemią). Pojechała ${op(c[0])}, potem ${op(c[1])}, a na końcu ${op(c[2])}. Na którym piętrze jest teraz?`;
              pole = "Numer piętra";
              wynik = `$${f}$`;
            } else {
              const op = (x) => `${x > 0 ? "wzrosła" : "zmalała"} o ${lw(Math.abs(x), "punkt", "punkty", "punktów")}`;
              tresc = `Na początku gry liczba punktów wynosiła $${s}$ (ujemna liczba to „minus”). Najpierw ${op(c[0])}, potem ${op(c[1])}, a na końcu ${op(c[2])}. Ile wynosi teraz liczba punktów?`;
              pole = "Liczba punktów";
              wynik = `$${f}$`;
            }
            return { tresc, pola: [{ id: "w", typ: "liczba", etykieta: pole }], odpowiedz: { w: f }, wynik, rozwiazanie: kroki };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "mnozenie-dzielenie",
      nazwa: "Mnożenie i dzielenie liczb całkowitych",
      sciaga: [
        {
          nazwa: "Znak iloczynu",
          slownie: "Gdy mnożymy liczby o różnych znakach, wynik jest ujemny. Gdy mnożymy liczby o takich samych znakach (obie dodatnie albo obie ujemne), wynik jest dodatni. Najpierw mnożymy tak, jakby znaków nie było, potem dopisujemy znak.",
          tex: "(+)\\cdot(+)=+\\qquad (-)\\cdot(-)=+\\qquad (+)\\cdot(-)=-\\qquad (-)\\cdot(+)=-",
          przyklad: "$(-6) \\cdot 4$: $6 \\cdot 4 = 24$, znaki różne, więc $-24$. Dalej: $(-5) \\cdot (-3)$: $5 \\cdot 3 = 15$, znaki takie same, więc $15$.",
          uwaga: "$(-5) \\cdot (-3)$ nie jest równe $-15$. Minus razy minus daje plus.",
        },
        {
          nazwa: "Dlaczego tak jest?",
          slownie: "Mnożenie to wielokrotne dodawanie. Trzy razy $-4$ to trzy długi po $4$ zł, więc razem dług $12$ zł. Mnożenie przez $-1$ zamienia liczbę na przeciwną.",
          tex: "3\\cdot(-4)=-12\\qquad (-1)\\cdot 5=-5\\qquad (-1)\\cdot(-5)=5",
          przyklad: "$2 \\cdot (-7) = (-7) + (-7) = -14$. Dalej: $(-1) \\cdot 6 = -6$, a $(-1) \\cdot (-6) = 6$. Mnożenie przez $-1$ zmienia znak na przeciwny.",
          uwaga: "Minus przy liczbie to nie to samo co minus jako odejmowanie. W iloczynie $(-3) \\cdot 4$ liczba $-3$ jest po prostu liczbą ujemną.",
        },
        {
          nazwa: "Dzielenie liczb całkowitych",
          slownie: "Znaki w dzieleniu są takie same jak w mnożeniu: różne znaki dają wynik ujemny, takie same znaki dają dodatni. Zero podzielone przez liczbę to zero. Przez zero dzielić nie wolno.",
          tex: "(-20):4=-5\\qquad (-20):(-4)=5\\qquad 20:(-4)=-5",
          przyklad: "$(-18) : 3$: $18 : 3 = 6$, znaki różne, więc $-6$. Sprawdzenie: $(-6) \\cdot 3 = -18$. Dalej: $0 : (-7) = 0$.",
          uwaga: "Działanie $5 : 0$ nie ma wyniku. Nie wolno dzielić przez zero.",
        },
        {
          nazwa: "Mnożenie wielu liczb",
          slownie: "Gdy mnożymy kilka liczb, policz liczby ujemne. Jeśli jest ich parzyście wiele ($0$, $2$, $4$, …), wynik jest dodatni. Jeśli nieparzyście wiele ($1$, $3$, …), wynik jest ujemny.",
          tex: "(-2)\\cdot(-3)\\cdot(-4)=-24",
          przyklad: "$(-2) \\cdot 5 \\cdot (-3) \\cdot (-1)$: są $3$ liczby ujemne, a to liczba nieparzysta, więc wynik jest ujemny. Mnożymy bez znaków: $2 \\cdot 5 \\cdot 3 \\cdot 1 = 30$, czyli wynik to $-30$.",
          uwaga: "Jeśli któryś czynnik jest zerem, to cały iloczyn jest równy zero, niezależnie od znaków.",
        },
        {
          nazwa: "Mnożenie przez 0, 1 i −1",
          slownie: "Każda liczba razy $0$ daje $0$. Razy $1$ liczba się nie zmienia. Razy $-1$ zamienia się na liczbę przeciwną.",
          tex: "7\\cdot 0=0\\qquad (-7)\\cdot 1=-7\\qquad (-7)\\cdot(-1)=7",
          przyklad: "$(-12) \\cdot 0 = 0$, $(-12) \\cdot 1 = -12$, $(-12) \\cdot (-1) = 12$.",
          uwaga: "Liczba ujemna razy $-1$ jest dodatnia. Nie zostaje ujemna.",
        },
      ],
      jak: [
        "Sprawdź znaki obu liczb. Takie same znaki dają wynik dodatni, różne dają ujemny.",
        "Policz wynik tak, jakby znaków nie było (mnożymy albo dzielimy odległości od zera).",
        "Dopisz znak według reguły. Dzielenie możesz sprawdzić mnożeniem.",
        "Przy wielu czynnikach policz, ile jest liczb ujemnych: parzyście wiele daje plus, nieparzyście wiele daje minus.",
      ],
      zadania: [
        {
          nr: "16",
          tresc: "Ile to jest $(-7) \\cdot 6$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$42$", "$-13$", "$-42$", "$13$"],
          poprawna: 2,
        },
        {
          nr: "17",
          tresc: "Ile to jest $(-8) \\cdot (-5)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-40$", "$40$", "$-13$", "$3$"],
          poprawna: 1,
        },
        {
          nr: "18",
          tresc: "Ile to jest $(-56) : 7$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-8$", "$8$", "$-49$", "$49$"],
          poprawna: 0,
        },
        {
          nr: "19",
          tresc: "Ile wynosi iloczyn $(-2) \\cdot 3 \\cdot (-4) \\cdot (-5)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$120$", "$-14$", "$-60$", "$-120$"],
          poprawna: 3,
        },
        {
          nr: "20",
          tresc: "Rano było $2$°C. Przez $4$ godziny temperatura spadała o $3$ stopnie na godzinę. Ile stopni było po tych $4$ godzinach? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-12$°C", "$14$°C", "$-10$°C", "$10$°C"],
          poprawna: 2,
        },
        {
          nr: "21",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$(-30) : (-5) = -6$", litery: "PF", poprawna: 1 },
            { tekst: "Iloczyn trzech liczb ujemnych jest ujemny.", litery: "PF", poprawna: 0 },
            { tekst: "$7 : 0 = 0$", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "22",
          punkty: 2,
          tresc: "Co dzień poziom wody w basenie obniża się o $4$ cm. Zmianę poziomu o $4$ cm w dół zapisujemy jako $-4$. Policz, jaka jest zmiana poziomu wody po $6$ dniach. Jak wysoko będzie sięgać woda po $6$ dniach, jeśli dziś sięga $120$ cm? **Zapisz obliczenia.**",
          rozwiazanie: "Zmiana w ciągu $6$ dni: $6 \\cdot (-4)$. Znaki są różne, więc wynik jest ujemny: $6 \\cdot 4 = 24$, czyli $-24$.\n\nPoziom wody po $6$ dniach: $120 + (-24) = 96$.\n\nOdpowiedź: Poziom zmieni się o $-24$ cm, czyli woda obniży się o $24$ cm. Będzie sięgać $96$ cm.",
        },
        {
          nr: "23",
          punkty: 2,
          tresc: "Oblicz $(-3) \\cdot (-4) \\cdot (-2)$ oraz $(-48) : (-6) \\cdot (-1)$. Który z dwóch wyników jest mniejszy? **Zapisz obliczenia.**",
          rozwiazanie: "Pierwszy iloczyn: są $3$ liczby ujemne, więc wynik jest ujemny. $3 \\cdot 4 \\cdot 2 = 24$, czyli $-24$.\n\nDrugi wynik liczymy od lewej strony: $(-48) : (-6) = 8$ (takie same znaki, więc plus).\n\nPotem $8 \\cdot (-1) = -8$.\n\nPorównujemy: $-24 < -8$, bo $-24$ leży dalej od zera.\n\nOdpowiedź: Pierwszy wynik to $-24$, drugi to $-8$. Mniejszy jest pierwszy, czyli $-24$.",
        },
      ],
      generatory: [
        {
          id: "iloczyn-iloraz",
          nazwa: "Iloczyn i iloraz",
          opis: "Pomnóż albo podziel dwie liczby całkowite (dodatnie i ujemne).",
          generuj(r) {
            const mnoz = r.chance(0.55);
            let x, y, wynik;
            if (mnoz) {
              x = r.intBez(-12, 12, 0, 1, -1);
              y = r.intBez(-9, 9, 0, 1, -1);
              wynik = x * y;
            } else {
              y = r.intBez(-9, 9, 0, 1, -1);
              wynik = r.intBez(-12, 12, 0, 1, -1);
              x = y * wynik;
            }
            const pierwsze = Math.abs(x);
            const p = Math.abs(wynik);
            const te = (x < 0) === (y < 0);
            const kroki = [
              `Liczby mają ${te ? "takie same" : "różne"} znaki, więc wynik jest ${te ? "dodatni" : "ujemny"}.`,
              mnoz
                ? `Mnożymy tak, jakby znaków nie było: $${Math.abs(x)} \\cdot ${Math.abs(y)} = ${p}$.`
                : `Dzielimy tak, jakby znaków nie było: $${pierwsze} : ${Math.abs(y)} = ${p}$.`,
              `Wynik: $${wynik}$.`,
            ];
            const dz = mnoz ? `${nw(x)} \\cdot ${nw(y)}` : `${nw(x)} : ${nw(y)}`;
            return {
              tresc: r.pick([`Oblicz $${dz}$.`, `Ile to jest $${dz}$?`, `Podaj wynik działania $${dz}$.`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w: wynik },
              wynik: `$${wynik}$`,
              rozwiazanie: kroki,
            };
          },
        },
        {
          id: "wiele-czynnikow",
          nazwa: "Wiele czynników",
          opis: "Pomnóż trzy lub cztery liczby całkowite albo policz zmianę temperatury i poziomu wody po kilku godzinach lub dniach.",
          generuj(r) {
            if (r.chance(0.6)) {
              const k = r.pick([3, 3, 4]);
              let f;
              for (;;) {
                f = Array.from({ length: k }, () => r.intBez(-5, 5, 0));
                const ujemne = f.filter((x) => x < 0).length;
                if (ujemne >= 1 && Math.abs(f.reduce((a, b) => a * b, 1)) <= 240) break;
              }
              const w = f.reduce((a, b) => a * b, 1);
              const neg = f.filter((x) => x < 0).length;
              const nieparz = neg % 2 === 1;
              return {
                tresc: r.pick([`Oblicz $${f.map(nw).join(" \\cdot ")}$.`, `Ile to jest $${f.map(nw).join(" \\cdot ")}$?`]),
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Liczb ujemnych jest $${neg}$. To liczba ${nieparz ? "nieparzysta" : "parzysta"}, więc iloczyn jest ${nieparz ? "ujemny" : "dodatni"}.`,
                  `Mnożymy bez znaków: $${f.map((x) => Math.abs(x)).join(" \\cdot ")} = ${Math.abs(w)}$.`,
                  `Wynik: $${w}$.`,
                ],
              };
            }
            const woda = r.chance(0.5);
            const k = r.int(1, 6), n = r.int(2, 8);
            const spadek = r.chance(0.5);
            const zm = spadek ? -k : k;
            const w = zm * n;
            let tresc, pole;
            if (woda) {
              tresc = `Co dzień poziom wody w stawie ${spadek ? "obniża się" : "podnosi się"} o $${k}$ cm. Zmianę poziomu zapisujemy liczbą całkowitą (ujemną, gdy woda się obniża). Jaka jest zmiana poziomu wody po $${n}$ dniach?`;
              pole = "Zmiana poziomu w cm";
            } else {
              tresc = `Co godzinę temperatura ${spadek ? "spada" : "rośnie"} o $${k}$ ${mn(k, "stopień", "stopnie", "stopni")}. Zmianę temperatury zapisujemy liczbą całkowitą (ujemną, gdy temperatura spada). Jaka jest zmiana temperatury po $${n}$ godzinach?`;
              pole = "Zmiana temperatury w °C";
            }
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: pole }],
              odpowiedz: { w },
              wynik: `$${w}$`,
              rozwiazanie: [
                `Zmiana w ciągu ${woda ? "jednego dnia" : "jednej godziny"}: $${zm}$.`,
                `Po $${n}$ ${woda ? "dniach" : "godzinach"}: $${n} \\cdot ${nw(zm)} = ${w}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "odejmowanie-calkowitych",
      nazwa: "Odejmowanie liczb całkowitych",
      sciaga: [
        {
          nazwa: "Odejmowanie to dodawanie liczby przeciwnej",
          slownie: "Odjąć liczbę to dodać liczbę do niej przeciwną. Dzięki temu każde odejmowanie zamieniamy na dodawanie, które już umiemy.",
          tex: "a-b=a+(-b)",
          litery: "$a$ i $b$ to dowolne liczby całkowite.",
          przyklad: "$5 - 8 = 5 + (-8) = -3$. Sprawdzenie: $-3 + 8 = 5$.",
          uwaga: "$5 - 8$ nie jest równe $3$. Od mniejszej liczby odejmujemy większą, więc wynik jest ujemny.",
        },
        {
          nazwa: "Odejmowanie liczby ujemnej",
          slownie: "Odjąć liczbę ujemną to dodać liczbę dodatnią (jej przeciwną). Dwa minusy obok siebie dają plus.",
          tex: "7-(-3)=7+3=10",
          przyklad: "$-4 - (-9) = -4 + 9 = 5$. Dalej: $2 - (-6) = 2 + 6 = 8$.",
          uwaga: "$7 - (-3)$ nie jest równe $4$. Odjęcie liczby ujemnej zwiększa wynik.",
        },
        {
          nazwa: "Odejmowanie od liczby ujemnej",
          slownie: "Gdy od liczby ujemnej odejmujemy liczbę dodatnią, idziemy na osi w lewo, więc wynik jest jeszcze mniejszy. Zamieniamy to na dodawanie dwóch liczb ujemnych.",
          tex: "-3-5=-3+(-5)=-8",
          przyklad: "$-6 - 4 = -6 + (-4) = -10$. W temperaturze: było $-6$°C, spadło o $4$ stopnie, jest $-10$°C.",
          uwaga: "$-6 - 4$ nie jest równe $-2$. Nie odejmujemy tu odległości od zera, tylko dodajemy liczbę ujemną.",
        },
        {
          nazwa: "Różnica liczb",
          slownie: "Różnica to wynik odejmowania. Żeby sprawdzić, o ile jedna liczba jest większa od drugiej, od większej odejmujemy mniejszą. Wtedy wynik jest dodatni.",
          tex: "5-(-3)=5+3=8",
          przyklad: "Najwyższa temperatura była $4$°C, a najniższa $-6$°C. Różnica: $4 - (-6) = 4 + 6 = 10$ stopni.",
          uwaga: "Gdy od mniejszej liczby odejmiemy większą, wyjdzie liczba ujemna. Pytanie „o ile różnią się liczby” ma zawsze odpowiedź dodatnią.",
        },
        {
          nazwa: "Kilka działań po kolei",
          slownie: "Przy kilku dodawaniach i odejmowaniach zamieniamy każde odejmowanie na dodawanie liczby przeciwnej. Potem liczymy po kolei od lewej strony.",
          tex: "4-9-(-2)=4+(-9)+2",
          przyklad: "$4 - 9 - (-2) = 4 + (-9) + 2 = -5 + 2 = -3$.",
          uwaga: "$4 - (-2)$ to $4 + 2$, a nie $4 - 2$. Nie gub znaku przy zamianie odejmowania na dodawanie.",
        },
      ],
      jak: [
        "Zamień odejmowanie na dodawanie liczby przeciwnej: $a - b = a + (-b)$.",
        "Teraz dodaj według zasad dodawania: te same znaki albo różne znaki.",
        "Aby sprawdzić, o ile jedna liczba jest większa od drugiej, od większej odejmij mniejszą.",
        "Gdy jest kilka działań, licz po kolei od lewej strony.",
      ],
      zadania: [
        {
          nr: "24",
          tresc: "Ile to jest $6 - 10$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$16$", "$-16$", "$-4$"],
          poprawna: 3,
        },
        {
          nr: "25",
          tresc: "Ile to jest $-3 - 8$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-11$", "$11$", "$5$", "$-5$"],
          poprawna: 0,
        },
        {
          nr: "26",
          tresc: "Ile to jest $9 - (-4)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$-5$", "$13$", "$-13$"],
          poprawna: 2,
        },
        {
          nr: "27",
          tresc: "Rano było $-5$°C, a w południe $7$°C. O ile stopni wzrosła temperatura? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$ stopnie", "$12$ stopni", "$-12$ stopni", "$-2$ stopnie"],
          poprawna: 1,
        },
        {
          nr: "28",
          tresc: "Które z działań ma taki sam wynik jak $-4 - (-6)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-4 - 6$", "$-4 + (-6)$", "$4 + 6$", "$-4 + 6$"],
          poprawna: 3,
        },
        {
          nr: "29",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$2 - 9 = 7$", litery: "PF", poprawna: 1 },
            { tekst: "$-6 - (-6) = 0$", litery: "PF", poprawna: 0 },
            { tekst: "$-2 - (-8) = 6$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "30",
          punkty: 2,
          tresc: "Szczyt góry leży na wysokości $320$ m nad poziomem morza. Dno jeziora u jej stóp leży na wysokości $-45$ m (czyli $45$ m poniżej poziomu morza). O ile metrów szczyt jest wyżej niż dno jeziora? **Zapisz obliczenia.**",
          rozwiazanie: "Od większej wysokości odejmujemy mniejszą: $320 - (-45)$.\n\nOdejmowanie zamieniamy na dodawanie liczby przeciwnej: $320 - (-45) = 320 + 45 = 365$.\n\nOdpowiedź: Szczyt jest wyżej niż dno jeziora o $365$ m.",
        },
        {
          nr: "31",
          punkty: 2,
          tresc: "Oblicz $-5 - 7 - (-12) - 4$. Zamień każde odejmowanie na dodawanie liczby przeciwnej i zapisz kolejne kroki. **Zapisz obliczenia.**",
          rozwiazanie: "Zamieniamy odejmowanie na dodawanie liczby przeciwnej: $-5 - 7 - (-12) - 4 = -5 + (-7) + 12 + (-4)$.\n\nLiczymy od lewej strony: $-5 + (-7) = -12$.\n\nPotem $-12 + 12 = 0$ (liczby przeciwne), a na końcu $0 + (-4) = -4$.\n\nOdpowiedź: Wynik to $-4$.",
        },
      ],
      generatory: [
        {
          id: "roznica-calkowitych",
          nazwa: "Odejmij liczby",
          opis: "Odejmij dwie liczby całkowite (dodatnie i ujemne), zamieniając odejmowanie na dodawanie liczby przeciwnej.",
          generuj(r) {
            const a = r.intBez(-20, 20, 0);
            const b = r.intBez(-20, 20, 0);
            const w = a - b;
            const kroki = [`Odejmowanie zamieniamy na dodawanie liczby przeciwnej: $${a} - ${nw(b)} = ${a} + ${nw(-b)}$.`, ...sumaKroki(a, -b)];
            return {
              tresc: r.pick([`Oblicz $${a} - ${nw(b)}$.`, `Ile to jest $${a} - ${nw(b)}$?`, `Podaj wynik działania $${a} - ${nw(b)}$.`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w },
              wynik: `$${w}$`,
              rozwiazanie: kroki,
            };
          },
        },
        {
          id: "roznica-wysokosci",
          nazwa: "O ile różnią się",
          opis: "Policz, o ile różnią się dwie temperatury, wysokości albo piętra windy, odejmując mniejszą liczbę od większej.",
          generuj(r) {
            const kt = r.int(0, 2);
            let lo, hi, tresc, pole;
            if (kt === 0) {
              lo = r.int(-20, 5);
              hi = lo + r.int(3, 25);
              tresc = r.pick([
                `W ciągu doby najwyższa temperatura wynosiła $${hi}$°C, a najniższa $${lo}$°C. O ile stopni różnią się te temperatury?`,
                `Rano termometr pokazywał $${lo}$°C, a w południe $${hi}$°C. O ile stopni wzrosła temperatura?`,
              ]);
              pole = "Różnica w stopniach";
            } else if (kt === 1) {
              lo = -r.int(3, 60);
              hi = r.int(5, 200);
              tresc = r.pick([
                `Szczyt wzgórza leży na wysokości $${hi}$ m nad poziomem morza, a dno doliny na wysokości $${lo}$ m. O ile metrów szczyt jest wyżej niż dno doliny?`,
                `Ptak leci na wysokości $${hi}$ m nad poziomem morza, a nurek jest na głębokości $${-lo}$ m pod poziomem morza (wysokość $${lo}$ m). O ile metrów ptak jest wyżej niż nurek?`,
              ]);
              pole = "Różnica w metrach";
            } else {
              lo = r.int(-4, 1);
              hi = lo + r.int(3, 10);
              tresc = `Winda jechała z piętra $${lo}$ na piętro $${hi}$. O ile pięter pojechała w górę?`;
              pole = "Liczba pięter";
            }
            const w = hi - lo;
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: pole }],
              odpowiedz: { w },
              wynik: `$${w}$`,
              rozwiazanie: [
                `Od większej liczby odejmujemy mniejszą: $${hi} - ${nw(lo)}$.`,
                `Odejmowanie zamieniamy na dodawanie liczby przeciwnej: $${hi} - ${nw(lo)} = ${hi} + ${nw(-lo)} = ${w}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "wlasnosci-dzialan",
      nazwa: "Własności działań na liczbach całkowitych",
      sciaga: [
        {
          nazwa: "Przemienność i łączność",
          slownie: "Dodawać i mnożyć możemy w dowolnej kolejności. Możemy też dowolnie grupować liczby. Liczymy najpierw to, co łatwiej połączyć.",
          tex: "a+b=b+a\\qquad a\\cdot b=b\\cdot a\\qquad (a+b)+c=a+(b+c)",
          litery: "$a$, $b$, $c$ – dowolne liczby całkowite.",
          przyklad: "$-17 + 9 + 17 + (-4)$: łączymy $-17$ i $17$, ich suma to $0$. Zostaje $9 + (-4) = 5$. Dalej: $(-5) \\cdot 7 \\cdot (-2)$: łatwiej $(-5) \\cdot (-2) = 10$, a potem $10 \\cdot 7 = 70$.",
          uwaga: "Odejmowanie i dzielenie nie są przemienne: $3 - 5 \\neq 5 - 3$.",
        },
        {
          nazwa: "Rozdzielność mnożenia",
          slownie: "Gdy mnożymy liczbę przez sumę albo różnicę, możemy pomnożyć ją przez każdy składnik osobno. Potem dodajemy albo odejmujemy wyniki.",
          tex: "a\\cdot(b+c)=a\\cdot b+a\\cdot c\\qquad a\\cdot(b-c)=a\\cdot b-a\\cdot c",
          litery: "$a$, $b$, $c$ – dowolne liczby całkowite.",
          przyklad: "$(-4) \\cdot (5 + 3) = (-4) \\cdot 5 + (-4) \\cdot 3 = -20 + (-12) = -32$. Sprawdzenie: $(-4) \\cdot 8 = -32$. Wygodnie liczyć też tak: $6 \\cdot 98 = 6 \\cdot (100 - 2) = 600 - 12 = 588$.",
          uwaga: "Pomnóż przez każdy składnik w nawiasie, a nie tylko przez pierwszy: $3 \\cdot (4 + 5)$ nie jest równe $3 \\cdot 4 + 5$.",
        },
        {
          nazwa: "Kolejność wykonywania działań",
          slownie: "Najpierw liczymy w nawiasach. Potem mnożymy i dzielimy (od lewej do prawej). Na końcu dodajemy i odejmujemy (od lewej do prawej).",
          tex: "2+3\\cdot(-4)=2+(-12)=-10",
          przyklad: "$-6 + 4 \\cdot (-3)$: najpierw mnożenie $4 \\cdot (-3) = -12$, potem $-6 + (-12) = -18$. Dalej: $(-6 + 4) \\cdot (-3) = (-2) \\cdot (-3) = 6$.",
          uwaga: "$2 + 3 \\cdot (-4)$ to nie $5 \\cdot (-4)$. Mnożenie liczymy przed dodawaniem.",
        },
        {
          nazwa: "Minus przed nawiasem",
          slownie: "Gdy przed nawiasem stoi minus, odejmujemy każdy składnik z nawiasu, więc wszystkie znaki w nawiasie zmieniają się na przeciwne. Gdy przed nawiasem stoi plus, znaki się nie zmieniają.",
          tex: "10-(4-7)=10-4+7=13",
          przyklad: "$5 - (2 + 3) = 5 - 2 - 3 = 0$. Dalej: $8 - (-3 + 6) = 8 + 3 - 6 = 5$. Sprawdzenie: w nawiasie jest $3$, więc $8 - 3 = 5$.",
          uwaga: "$10 - (4 - 7)$ nie jest równe $10 - 4 - 7$. Drugi składnik w nawiasie też zmienia znak.",
        },
        {
          nazwa: "Liczby 0, 1 i −1 w działaniach",
          slownie: "Dodanie zera niczego nie zmienia. Mnożenie przez $1$ też nie. Liczba plus liczba przeciwna daje $0$. Mnożenie przez $-1$ daje liczbę przeciwną.",
          tex: "a+0=a\\qquad a\\cdot 1=a\\qquad a+(-a)=0\\qquad a\\cdot(-1)=-a",
          litery: "$a$ – dowolna liczba całkowita.",
          przyklad: "$-9 + 0 = -9$, $-9 \\cdot 1 = -9$, $-9 + 9 = 0$, $-9 \\cdot (-1) = 9$.",
          uwaga: "Dodając zero, nie zmieniasz liczby. Mnożąc przez zero, dostajesz zero, a nie tę samą liczbę.",
        },
      ],
      jak: [
        "Zobacz, czy da się policzyć wygodnie: poszukaj liczb przeciwnych albo liczb, które łatwo pomnożyć.",
        "W wyrażeniu z kilkoma działaniami: nawiasy, potem mnożenie i dzielenie, na końcu dodawanie i odejmowanie.",
        "Minus przed nawiasem zmienia znaki wszystkich składników w nawiasie.",
        "Wynik możesz sprawdzić, licząc inną drogą (np. najpierw nawias, a potem mnożenie).",
      ],
      zadania: [
        {
          nr: "32",
          tresc: "Ile wynosi $-4 + 3 \\cdot (-2)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$", "$-10$", "$-14$", "$10$"],
          poprawna: 1,
        },
        {
          nr: "33",
          tresc: "Ile wynosi $(-6 + 2) \\cdot (-5)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-20$", "$-16$", "$20$", "$-4$"],
          poprawna: 2,
        },
        {
          nr: "34",
          tresc: "Który zapis jest równy $12 - (5 - 9)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12 - 5 + 9$", "$12 - 5 - 9$", "$12 + 5 - 9$", "$12 + 5 + 9$"],
          poprawna: 0,
        },
        {
          nr: "35",
          tresc: "Ile wynosi $-48 + 27 + 48 + (-7)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$34$", "$-20$", "$-14$", "$20$"],
          poprawna: 3,
        },
        {
          nr: "36",
          tresc: "Ile wynosi $(-4) \\cdot 17 + (-4) \\cdot 3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$80$", "$-80$", "$-68$", "$-20$"],
          poprawna: 1,
        },
        {
          nr: "37",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$8 + (-3) = (-3) + 8$", litery: "PF", poprawna: 0 },
            { tekst: "$3 - 7 = 7 - 3$", litery: "PF", poprawna: 1 },
            { tekst: "$-(5 - 8) = -5 - 8$", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "38",
          punkty: 2,
          tresc: "Oblicz $(-3) \\cdot (-2 + 7) - 4 \\cdot (6 - 9)$. Zapisz kolejność działań. **Zapisz obliczenia.**",
          rozwiazanie: "Najpierw liczymy w nawiasach: $-2 + 7 = 5$ oraz $6 - 9 = -3$.\n\nWyrażenie ma teraz postać $(-3) \\cdot 5 - 4 \\cdot (-3)$.\n\nPotem mnożymy: $(-3) \\cdot 5 = -15$ oraz $4 \\cdot (-3) = -12$.\n\nNa końcu odejmujemy: $-15 - (-12) = -15 + 12 = -3$.\n\nOdpowiedź: Wynik to $-3$.",
        },
        {
          nr: "39",
          punkty: 2,
          tresc: "W zeszycie zapisano: $15 - (8 - 20) = 15 - 8 - 20 = -13$. Znajdź błąd i podaj poprawny wynik. **Zapisz obliczenia.**",
          rozwiazanie: "Błąd jest przy opuszczaniu nawiasu. Przed nawiasem stoi minus, więc oba składniki zmieniają znak. Znak przy $20$ powinien zmienić się na plus: $15 - (8 - 20) = 15 - 8 + 20$.\n\nPoprawne obliczenie: $15 - 8 + 20 = 7 + 20 = 27$.\n\nSprawdzenie: $8 - 20 = -12$, więc $15 - (-12) = 15 + 12 = 27$.\n\nOdpowiedź: Poprawny wynik to $27$.",
        },
      ],
      generatory: [
        {
          id: "kolejnosc-dzialan",
          nazwa: "Kolejność działań",
          opis: "Oblicz wartość wyrażenia z nawiasami, mnożeniem, dzieleniem, dodawaniem i odejmowaniem liczb całkowitych.",
          generuj(r) {
            for (;;) {
              const a = r.intBez(-9, 9, 0), b = r.intBez(-9, 9, 0), c = r.intBez(-9, 9, 0), d = r.intBez(-9, 9, 0);
              const t = r.int(0, 5);
              let tex, kroki, w;
              if (t === 0) {
                const p = b * c;
                w = a + p;
                tex = `${a} + ${nw(b)} \\cdot ${nw(c)}`;
                kroki = [`Najpierw mnożenie: $${nw(b)} \\cdot ${nw(c)} = ${p}$.`, `Potem dodawanie: $${a} + ${nw(p)} = ${w}$.`];
              } else if (t === 1) {
                const s = a + b;
                w = s * c;
                tex = `(${a} + ${nw(b)}) \\cdot ${nw(c)}`;
                kroki = [`Najpierw nawias: $${a} + ${nw(b)} = ${s}$.`, `Potem mnożenie: $${nw(s)} \\cdot ${nw(c)} = ${w}$.`];
              } else if (t === 2) {
                const p = b * c;
                w = a - p;
                tex = `${a} - ${nw(b)} \\cdot ${nw(c)}`;
                kroki = [`Najpierw mnożenie: $${nw(b)} \\cdot ${nw(c)} = ${p}$.`, `Potem odejmowanie: $${a} - ${nw(p)} = ${a} + ${nw(-p)} = ${w}$.`];
              } else if (t === 3) {
                const p = a * b, u = c * d;
                w = p + u;
                tex = `${nw(a)} \\cdot ${nw(b)} + ${nw(c)} \\cdot ${nw(d)}`;
                kroki = [`Najpierw oba mnożenia: $${nw(a)} \\cdot ${nw(b)} = ${p}$ oraz $${nw(c)} \\cdot ${nw(d)} = ${u}$.`, `Potem dodawanie: $${p} + ${nw(u)} = ${w}$.`];
              } else if (t === 4) {
                const s = b + c;
                w = a - s;
                tex = `${a} - (${b} + ${nw(c)})`;
                kroki = [`Najpierw nawias: $${b} + ${nw(c)} = ${s}$.`, `Potem odejmowanie: $${a} - ${nw(s)} = ${a} + ${nw(-s)} = ${w}$.`];
              } else {
                const dz = r.intBez(-5, 5, 0, 1, -1), q = r.intBez(-8, 8, 0);
                const bb = b, aa = bb + dz * q;
                if (aa === 0 || Math.abs(aa) > 30) continue;
                const roz = aa - bb;
                w = q;
                tex = `(${aa} - ${nw(bb)}) : ${nw(dz)}`;
                kroki = [`Najpierw nawias: $${aa} - ${nw(bb)} = ${aa} + ${nw(-bb)} = ${roz}$.`, `Potem dzielenie: $${nw(roz)} : ${nw(dz)} = ${w}$.`];
              }
              if (Math.abs(w) > 100) continue;
              return {
                tresc: r.pick([`Oblicz $${tex}$.`, `Ile to jest $${tex}$?`, `Podaj wartość wyrażenia $${tex}$.`]),
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w },
                wynik: `$${w}$`,
                rozwiazanie: kroki,
              };
            }
          },
        },
        {
          id: "wygodne-obliczenia",
          nazwa: "Wygodne obliczenia",
          opis: "Oblicz sprytnie: zbierz liczby przeciwne albo skorzystaj z rozdzielności mnożenia.",
          generuj(r) {
            if (r.chance(0.5)) {
              const x = r.int(10, 60);
              const y = r.intBez(-30, 30, 0), z = r.intBez(-30, 30, 0);
              const skl = r.shuffle([x, y, -x, z]);
              const w = y + z;
              const zapis = skl.map((v, i) => (i === 0 ? `${v}` : nw(v))).join(" + ");
              return {
                tresc: r.pick([`Oblicz wygodnie $${zapis}$.`, `Oblicz $${zapis}$. Zacznij od połączenia liczb przeciwnych.`]),
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Liczby $${x}$ i $${-x}$ są przeciwne, więc ich suma to $0$. Możemy je połączyć, bo dodawanie jest przemienne i łączne.`,
                  `Zostaje: $${y} + ${nw(z)} = ${w}$.`,
                ],
              };
            }
            const k = r.intBez(-9, 9, 0, 1, -1);
            const a = r.intBez(-12, 12, 0), b = r.intBez(-12, 12, 0);
            const w = k * (a + b);
            return {
              tresc: r.pick([`Oblicz $${nw(k)} \\cdot (${a} + ${nw(b)})$, korzystając z rozdzielności mnożenia.`, `Oblicz $${nw(k)} \\cdot (${a} + ${nw(b)})$. Pomnóż liczbę $${k}$ przez każdy składnik sumy.`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w },
              wynik: `$${w}$`,
              rozwiazanie: [
                `Mnożymy przez każdy składnik: $${nw(k)} \\cdot ${nw(a)} + ${nw(k)} \\cdot ${nw(b)}$.`,
                `Liczymy iloczyny: $${nw(k)} \\cdot ${nw(a)} = ${k * a}$ oraz $${nw(k)} \\cdot ${nw(b)} = ${k * b}$.`,
                `Dodajemy: $${k * a} + ${nw(k * b)} = ${w}$.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
