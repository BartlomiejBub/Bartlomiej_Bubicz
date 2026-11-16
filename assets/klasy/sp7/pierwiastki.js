// Klasa 7 (szkoła podstawowa) · rozdział III „Pierwiastki” – Matematyka z kluczem 7 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Pierwiastek kwadratowy i sześcienny z liczb nieujemnych (sześcienny także z ujemnych). Bez usuwania niewymierności z mianownika
// i bez wyrażeń z literami (litery są tylko we wzorach). Odpowiedzi z pierwiastkiem: współczynnik albo wybór.
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** Zapis dziesiętny z przecinkiem do wzoru: dz(q(9, 25)) = "0{,}36". */
function dz(x) {
  const v = Q.z(x);
  for (let k = 0; k <= 4; k++) {
    const m = v.mul(10 ** k);
    if (m.calkowita) {
      const cyfry = String(Math.abs(m.n)).padStart(k + 1, "0");
      return `${v.ujemna ? "-" : ""}${k ? `${cyfry.slice(0, -k)}{,}${cyfry.slice(-k)}` : cyfry}`;
    }
  }
  return v.tex();
}

/** Powtarza losowanie, aż f() zwróci zadanie (wartość różną od null). */
function probuj(f, proby = 2000) {
  for (let i = 0; i < proby; i++) {
    const w = f();
    if (w) return w;
  }
  throw new Error("Nie udało się wylosować zadania");
}

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });
const sq = (x) => `\\sqrt{${x}}`;
const cb = (x) => `\\sqrt[3]{${x}}`;
const ulamek = (a, b) => `\\frac{${a}}{${b}}`;
/** Współczynnik przed pierwiastkiem: ck(3, 2) = "3\\sqrt{2}", ck(1, 2) = "\\sqrt{2}". */
const ck = (k, m) => (k === 1 ? sq(m) : `${k}${sq(m)}`);
const calk = (n) => {
  let k = Math.floor(Math.sqrt(n));
  while (k * k > n) k--;
  while ((k + 1) * (k + 1) <= n) k++;
  return k;
};
const calk3 = (n) => {
  let k = Math.floor(Math.cbrt(n));
  while (k ** 3 > n) k--;
  while ((k + 1) ** 3 <= n) k++;
  return k;
};
const kwadrat = (n) => calk(n) ** 2 === n;
const szescian = (n) => calk3(n) ** 3 === n;
/** Największy kwadrat dzielący n: n = k²·m. */
function rozloz(n) {
  let k = calk(n);
  while (n % (k * k)) k--;
  return { k, m: n / (k * k) };
}
const BEZ_KWADRATU = [2, 3, 5, 6, 7, 10, 11];

// --- Dane do generatorów

const OGRODY = [
  (p) => `Ogródek w kształcie kwadratu ma pole $${p}$ m$^2$. Ile metrów ma bok ogródka?`,
  (p) => `Kwadratowa działka ma pole $${p}$ m$^2$. Jaką długość ma jej bok (w metrach)?`,
  (p) => `Boisko szkolne ma kształt kwadratu o polu $${p}$ m$^2$. Ile metrów ma jego bok?`,
  (p) => `Kwadratowy dywan ma pole $${p}$ dm$^2$. Ile decymetrów ma jego bok?`,
];
const PUDELKA = [
  (v) => `Sześcienne pudełko ma objętość $${v}$ cm$^3$. Ile centymetrów ma jego krawędź?`,
  (v) => `Akwarium w kształcie sześcianu mieści $${v}$ dm$^3$ wody. Ile decymetrów ma jego krawędź?`,
  (v) => `Kostka do gry jest sześcianem o objętości $${v}$ mm$^3$. Ile milimetrów ma jej krawędź?`,
];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Pierwiastek kwadratowy
    {
      id: "pierwiastek-kwadratowy",
      nazwa: "Pierwiastek kwadratowy",
      sciaga: [
        {
          nazwa: "Pierwiastek kwadratowy",
          slownie: "Pierwiastek kwadratowy z liczby to taka liczba (nieujemna), która podniesiona do kwadratu daje tę liczbę. Pytamy: „co do kwadratu daje $a$?”.",
          tex: "\\sqrt{a}=b\\qquad b^2=a,\\ b\\ge0",
          litery: "$a$ – liczba pod pierwiastkiem, $b$ – wynik (pierwiastek).",
          przyklad: "$\\sqrt{49}=7$, bo $7^2=49$. Także $\\sqrt{100}=10$, bo $10\\cdot10=100$.",
          uwaga: "$\\sqrt{49}$ to nie połowa liczby $49$. Nie jest to $24{,}5$, tylko $7$.",
        },
        {
          nazwa: "Kwadraty do zapamiętania",
          slownie: "Warto znać kwadraty kolejnych liczb. Wtedy pierwiastki z nich widać od razu.",
          tex: "1^2=1\\qquad2^2=4\\qquad3^2=9\\qquad4^2=16\\qquad5^2=25\\qquad6^2=36\\qquad7^2=49\\qquad8^2=64\\qquad9^2=81\\qquad10^2=100",
          przyklad: "Liczby $121$, $144$, $169$ to kwadraty liczb $11$, $12$, $13$. Zatem $\\sqrt{144}=12$.",
        },
        {
          nazwa: "Bok kwadratu",
          slownie: "Jeśli kwadrat ma pole $P$, to jego bok ma długość $\\sqrt{P}$. Pole to bok razy bok, więc szukamy liczby, która pomnożona przez siebie daje pole.",
          tex: "P=a^2\\qquad a=\\sqrt{P}",
          litery: "$P$ – pole kwadratu, $a$ – długość jego boku.",
          przyklad: "Kwadratowy ogródek ma pole $81$ m$^2$. Bok ma $\\sqrt{81}=9$ m, bo $9\\cdot9=81$.",
          uwaga: "Nie myl pola z obwodem. Dla boku $9$ m pole to $81$ m$^2$, a obwód to $4\\cdot9=36$ m.",
        },
        {
          nazwa: "Ułamki i liczby dziesiętne",
          slownie: "Pierwiastek z ułamka to pierwiastek z licznika podzielony przez pierwiastek z mianownika. Liczby dziesiętne sprawdzamy tak: jaka liczba razy ona sama da tę liczbę?",
          tex: "\\sqrt{\\frac{4}{9}}=\\frac{2}{3}\\qquad\\sqrt{0{,}25}=0{,}5",
          przyklad: "$\\sqrt{\\frac{9}{16}}=\\frac{\\sqrt9}{\\sqrt{16}}=\\frac{3}{4}$. Dla $\\sqrt{0{,}09}$: $0{,}3\\cdot0{,}3=0{,}09$, więc $\\sqrt{0{,}09}=0{,}3$.",
          uwaga: "$\\sqrt{0{,}25}$ to $0{,}5$, a nie $0{,}05$. Sprawdź: $0{,}05\\cdot0{,}05=0{,}0025$.",
        },
        {
          nazwa: "Zero i liczby ujemne",
          slownie: "Pierwiastek z zera to zero, a z jedynki jedynka. Z liczby ujemnej pierwiastka kwadratowego nie ma, bo kwadrat żadnej liczby nie jest ujemny. Znak minus przed pierwiastkiem zostaje.",
          tex: "\\sqrt{0}=0\\qquad\\sqrt{1}=1\\qquad-\\sqrt{16}=-4",
          przyklad: "$-\\sqrt{25}=-5$: najpierw liczymy $\\sqrt{25}=5$, a potem dopisujemy minus. Wyrażenie $\\sqrt{-25}$ nie ma sensu.",
          uwaga: "Pierwiastek nie jest ujemny. $\\sqrt{16}=4$, a nie $-4$.",
        },
      ],
      jak: [
        "Zapytaj: jaka liczba podniesiona do kwadratu daje liczbę pod pierwiastkiem?",
        "Przy ułamku licz osobno pierwiastek z licznika i z mianownika.",
        "Przy liczbie dziesiętnej sprawdź, ile ma miejsc po przecinku. Wynik ma ich o połowę mniej.",
        "Sprawdź wynik: podnieś go do kwadratu.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Ile wynosi $\\sqrt{64}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$32$", "$6$", "$8$", "$4$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Kwadratowy ogródek ma pole $144$ m$^2$. Ile metrów ma bok ogródka? **Wybierz właściwą odpowiedź.**",
          opcje: ["$36$ m", "$72$ m", "$576$ m", "$12$ m"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "Ile wynosi $\\sqrt{0{,}36}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}6$", "$0{,}18$", "$0{,}06$", "$6$"],
          poprawna: 0,
        },
        {
          nr: "4",
          tresc: "Ile wynosi $\\sqrt{\\frac{25}{16}}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{25}{8}$", "$\\frac{5}{4}$", "$\\frac{5}{16}$", "$\\frac{25}{4}$"],
          poprawna: 1,
        },
        {
          nr: "5",
          tresc: "Oceń równości. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\sqrt{81}=9$", litery: "PF", poprawna: 0 },
            { tekst: "$\\sqrt{0{,}04}=0{,}02$", litery: "PF", poprawna: 1 },
            { tekst: "$-\\sqrt{16}=-4$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "6",
          tresc: "Ile wynosi $\\sqrt{9}+\\sqrt{16}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$25$", "$12$", "$7$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "7",
          punkty: 2,
          tresc: "Kwadratowy plac ma pole $196$ m$^2$. Chcemy go ogrodzić siatką dookoła. Ile metrów siatki trzeba kupić? **Zapisz obliczenia.**",
          rozwiazanie: "Bok placu to liczba, która pomnożona przez siebie daje $196$. Wiemy, że $14\\cdot14=196$, więc bok ma $\\sqrt{196}=14$ m.\n\nSiatka biegnie wokół placu, więc potrzebujemy obwodu: $4\\cdot14=56$ m.\n\nOdpowiedź: Trzeba kupić $56$ m siatki.",
        },
        {
          nr: "8",
          punkty: 2,
          tresc: "Oblicz $\\sqrt{121}-\\sqrt{0{,}49}+\\sqrt{\\frac{9}{25}}$. **Zapisz obliczenia.**",
          rozwiazanie: "$\\sqrt{121}=11$, bo $11\\cdot11=121$.\n\n$\\sqrt{0{,}49}=0{,}7$, bo $0{,}7\\cdot0{,}7=0{,}49$.\n\n$\\sqrt{\\frac{9}{25}}=\\frac{3}{5}=0{,}6$.\n\n$11-0{,}7+0{,}6=10{,}9$.\n\nOdpowiedź: Wartość wyrażenia to $10{,}9$.",
        },
      ],
      generatory: [
        {
          id: "oblicz-pierwiastek",
          nazwa: "Oblicz pierwiastek",
          opis: "Oblicz pierwiastek kwadratowy z liczby naturalnej, ułamka albo liczby dziesiętnej, albo znajdź bok kwadratu o danym polu.",
          generuj(r) {
            const tryb = r.int(0, 3);
            const polecenie = (x) => r.pick([`Oblicz $${x}$.`, `Ile wynosi $${x}$?`, `Oblicz wartość wyrażenia $${x}$.`]);
            if (tryb === 0) {
              const k = r.int(2, 15);
              const n = k * k;
              return {
                tresc: polecenie(sq(n)),
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(k) },
                wynik: `$${k}$`,
                rozwiazanie: [
                  `Szukamy liczby, która podniesiona do kwadratu daje $${n}$.`,
                  `Sprawdzamy: $${k}\\cdot${k}=${n}$.`,
                  `Zatem $${sq(n)}=${k}$.`,
                ],
              };
            }
            if (tryb === 1) {
              const [p, b] = probuj(() => {
                const b = r.int(2, 9);
                const p = r.int(1, 9);
                return p !== b && [2, 3, 4, 5, 6, 7, 8, 9].every((d) => !(p % d === 0 && b % d === 0)) ? [p, b] : null;
              });
              const w = q(p, b);
              return {
                tresc: `${polecenie(sq(ulamek(p * p, b * b)))} Wynik podaj w postaci ułamka (np. 2/3) albo liczby dziesiętnej.`,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w },
                wynik: `$${w.tex()}$`,
                rozwiazanie: [
                  `Pierwiastek z ułamka liczymy osobno z licznika i z mianownika: $${sq(ulamek(p * p, b * b))}=${ulamek(sq(p * p), sq(b * b))}$.`,
                  `$${sq(p * p)}=${p}$, bo $${p}\\cdot${p}=${p * p}$, oraz $${sq(b * b)}=${b}$, bo $${b}\\cdot${b}=${b * b}$.`,
                  `Wynik: $${w.tex()}$.`,
                ],
              };
            }
            if (tryb === 2) {
              const t = r.pick([1, 1, 1, 2]);
              const k = t === 1 ? r.int(1, 9) : r.int(11, 14);
              const w = q(k, 10);
              const kw = q(k * k, 100);
              return {
                tresc: polecenie(sq(dz(kw))),
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w },
                wynik: `$${dz(w)}$`,
                rozwiazanie: [
                  `Liczba $${dz(kw)}$ ma dwa miejsca po przecinku, więc wynik ma jedno miejsce po przecinku.`,
                  `Sprawdzamy: $${dz(w)}\\cdot${dz(w)}=${dz(kw)}$.`,
                  `Zatem $${sq(dz(kw))}=${dz(w)}$.`,
                ],
              };
            }
            const k = r.int(3, 16);
            const p = k * k;
            return {
              tresc: r.pick(OGRODY)(p),
              pola: [pole("w", "Bok $=$")],
              odpowiedz: { w: q(k) },
              wynik: `$${k}$`,
              rozwiazanie: [
                `Pole kwadratu to bok razy bok, więc bok to liczba, która pomnożona przez siebie daje $${p}$.`,
                `Bok to $${sq(p)}$. Sprawdzamy: $${k}\\cdot${k}=${p}$.`,
                `Bok ma długość $${k}$.`,
              ],
            };
          },
        },
        {
          id: "suma-pierwiastkow",
          nazwa: "Wyrażenie z pierwiastkami",
          opis: "Oblicz wartość wyrażenia z kilkoma pierwiastkami kwadratowymi z liczb naturalnych.",
          generuj(r) {
            const tryb = r.int(0, 3);
            const kw = (k) => `${sq(k * k)}=${k}`;
            if (tryb === 0) {
              const a = r.int(2, 12);
              const b = r.int(2, 12);
              const w = a + b;
              return {
                tresc: `Oblicz $${sq(a * a)}+${sq(b * b)}$.`,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [`Liczymy każdy pierwiastek osobno: $${kw(a)}$ oraz $${kw(b)}$.`, `Dodajemy: $${a}+${b}=${w}$.`],
              };
            }
            if (tryb === 1) {
              const [c, a, b] = probuj(() => {
                const c = r.int(2, 5);
                const a = r.int(2, 9);
                const b = r.int(2, 12);
                return c * a - b > 0 && a !== b ? [c, a, b] : null;
              });
              const w = c * a - b;
              return {
                tresc: `Oblicz $${c}\\cdot${sq(a * a)}-${sq(b * b)}$.`,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Liczymy pierwiastki: $${kw(a)}$ oraz $${kw(b)}$.`,
                  `Mnożenie wykonujemy przed odejmowaniem: $${c}\\cdot${a}=${c * a}$.`,
                  `Odejmujemy: $${c * a}-${b}=${w}$.`,
                ],
              };
            }
            if (tryb === 2) {
              const mnoz = r.chance();
              if (mnoz) {
                const a = r.int(2, 9);
                const b = r.int(2, 9);
                return {
                  tresc: `Oblicz $${sq(a * a)}\\cdot${sq(b * b)}$.`,
                  pola: [pole("w", "Wynik $=$")],
                  odpowiedz: { w: q(a * b) },
                  wynik: `$${a * b}$`,
                  rozwiazanie: [`Liczymy pierwiastki: $${kw(a)}$ oraz $${kw(b)}$.`, `Mnożymy: $${a}\\cdot${b}=${a * b}$.`],
                };
              }
              const b = r.int(2, 6);
              const c = r.int(2, 6);
              const a = b * c;
              return {
                tresc: `Oblicz $${sq(a * a)}:${sq(b * b)}$.`,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(c) },
                wynik: `$${c}$`,
                rozwiazanie: [`Liczymy pierwiastki: $${kw(a)}$ oraz $${kw(b)}$.`, `Dzielimy: $${a}:${b}=${c}$.`],
              };
            }
            const [a, b, c] = probuj(() => {
              const a = r.int(3, 12);
              const b = r.int(2, 9);
              const c = r.int(2, 9);
              return a + b - c > 0 && new Set([a, b, c]).size === 3 ? [a, b, c] : null;
            });
            const w = a + b - c;
            return {
              tresc: `Oblicz $${sq(a * a)}+${sq(b * b)}-${sq(c * c)}$.`,
              pola: [pole("w", "Wynik $=$")],
              odpowiedz: { w: q(w) },
              wynik: `$${w}$`,
              rozwiazanie: [
                `Liczymy każdy pierwiastek: $${kw(a)}$, $${kw(b)}$, $${kw(c)}$.`,
                `Liczymy od lewej: $${a}+${b}-${c}=${w}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Szacowanie pierwiastków
    {
      id: "szacowanie",
      nazwa: "Szacowanie pierwiastków",
      sciaga: [
        {
          nazwa: "Pierwiastek, który nie wychodzi równo",
          slownie: "Nie z każdej liczby pierwiastek jest liczbą całkowitą. Wtedy pierwiastek leży między dwiema kolejnymi liczbami całkowitymi. Szukamy dwóch sąsiednich kwadratów, między którymi jest nasza liczba.",
          tex: "k^2<n<(k+1)^2\\qquad k<\\sqrt{n}<k+1",
          litery: "$n$ – liczba pod pierwiastkiem, $k$ – liczba całkowita.",
          przyklad: "$\\sqrt{30}$: mamy $25<30<36$, czyli $5^2<30<6^2$. Zatem $5<\\sqrt{30}<6$.",
          uwaga: "$\\sqrt{30}$ nie jest równy $15$. Sprawdź kwadratem: $15^2=225$, a nie $30$.",
        },
        {
          nazwa: "Większa liczba, większy pierwiastek",
          slownie: "Im większa liczba pod pierwiastkiem, tym większy pierwiastek. Aby porównać pierwiastek z liczbą całkowitą, zapisz tę liczbę jako pierwiastek.",
          tex: "a<b\\ \\Rightarrow\\ \\sqrt{a}<\\sqrt{b}\\qquad7=\\sqrt{49}",
          litery: "$a$, $b$ – liczby nieujemne.",
          przyklad: "Porównajmy $\\sqrt{50}$ i $7$. Skoro $7=\\sqrt{49}$ i $50>49$, to $\\sqrt{50}>7$.",
          uwaga: "Nie porównuj $\\sqrt{50}$ z $50$. Pierwiastek z liczby większej od $1$ jest od niej mniejszy.",
        },
        {
          nazwa: "Przybliżenia dziesiętne",
          slownie: "Pierwiastek, który nie wychodzi równo, ma nieskończony zapis dziesiętny. Dlatego zapisujemy go w przybliżeniu (znak $\\approx$). Gdy liczba jest bliżej mniejszego kwadratu, pierwiastek jest bliżej mniejszej liczby całkowitej.",
          tex: "\\sqrt{2}\\approx1{,}41\\qquad\\sqrt{3}\\approx1{,}73\\qquad\\sqrt{5}\\approx2{,}24",
          przyklad: "$\\sqrt{10}$: $3^2=9$ i $4^2=16$, a $10$ jest blisko $9$. Zatem $\\sqrt{10}$ jest nieco większy od $3$. Sprawdzenie: $3{,}2^2=10{,}24$, więc $\\sqrt{10}\\approx3{,}2$.",
          uwaga: "Znak $\\approx$ znaczy „około”. Nie pisz $\\sqrt{2}=1{,}41$, bo kwadrat liczby $1{,}41$ to $1{,}9881$, a nie $2$.",
        },
        {
          nazwa: "Ile liczb całkowitych jest między?",
          slownie: "Oszacuj oba pierwiastki między kolejnymi liczbami całkowitymi. Potem wypisz liczby całkowite, które leżą pomiędzy nimi.",
          przyklad: "Ile liczb całkowitych leży między $\\sqrt{10}$ i $\\sqrt{50}$? Mamy $3<\\sqrt{10}<4$ oraz $7<\\sqrt{50}<8$. Pomiędzy są liczby $4$, $5$, $6$, $7$, czyli cztery liczby.",
          uwaga: "Liczb $3$ i $8$ nie liczymy. $3$ jest mniejsze od $\\sqrt{10}$, a $8$ jest większe od $\\sqrt{50}$.",
        },
      ],
      jak: [
        "Wypisz kwadraty kolejnych liczb, aż znajdziesz dwa, między którymi jest liczba pod pierwiastkiem.",
        "Pierwiastki tych kwadratów to liczby całkowite, między którymi leży szukany pierwiastek.",
        "Przy porównywaniu zamień liczbę całkowitą na pierwiastek ($7=\\sqrt{49}$) i porównaj liczby pod pierwiastkami.",
        "Zadanie z polem: bok kwadratu o polu $P$ to $\\sqrt{P}$, więc szacujemy ten pierwiastek.",
      ],
      zadania: [
        {
          nr: "9",
          tresc: "Między którymi kolejnymi liczbami całkowitymi leży liczba $\\sqrt{20}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$ i $4$", "$4$ i $5$", "$5$ i $6$", "$10$ i $11$"],
          poprawna: 1,
        },
        {
          nr: "10",
          tresc: "Jaka jest najmniejsza liczba całkowita większa od $\\sqrt{40}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$6$", "$8$", "$20$"],
          poprawna: 0,
        },
        {
          nr: "11",
          tresc: "Które porównanie jest prawdziwe? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\sqrt{30}<5$", "$\\sqrt{30}>6$", "$\\sqrt{30}<5{,}4$", "$\\sqrt{30}>5$"],
          poprawna: 3,
        },
        {
          nr: "12",
          tresc: "Ile liczb całkowitych leży między $\\sqrt{3}$ i $\\sqrt{30}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$5$", "$4$", "$27$"],
          poprawna: 2,
        },
        {
          nr: "13",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\sqrt{50}>7$", litery: "PF", poprawna: 0 },
            { tekst: "$\\sqrt{17}<4$", litery: "PF", poprawna: 1 },
            { tekst: "$5<\\sqrt{26}<6$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "14",
          tresc: "Kwadratowa działka ma pole $70$ m$^2$. W jakim przedziale mieści się długość jej boku? **Wybierz właściwą odpowiedź.**",
          opcje: ["od $7$ m do $8$ m", "od $9$ m do $10$ m", "od $35$ m do $36$ m", "od $8$ m do $9$ m"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "15",
          punkty: 2,
          tresc: "Oszacuj $\\sqrt{80}$: zapisz, między którymi kolejnymi liczbami całkowitymi leży, i wskaż, do której z nich jest bliżej. **Zapisz obliczenia.**",
          rozwiazanie: "Szukamy kwadratów liczb całkowitych blisko $80$: $8^2=64$ i $9^2=81$.\n\nSkoro $64<80<81$, to $8<\\sqrt{80}<9$.\n\nLiczba $80$ jest tuż przy $81$ (różnica to $1$), a od $64$ dzieli ją $16$. Zatem $\\sqrt{80}$ jest bliżej $9$.\n\nOdpowiedź: $8<\\sqrt{80}<9$ i $\\sqrt{80}$ jest bliżej liczby $9$.",
        },
        {
          nr: "16",
          punkty: 3,
          tresc: "Ustaw liczby $6$, $\\sqrt{35}$, $5{,}5$ i $\\sqrt{26}$ w kolejności od najmniejszej do największej. **Zapisz obliczenia.**",
          rozwiazanie: "Zapiszmy wszystkie liczby jako pierwiastki, czyli podnieśmy je do kwadratu.\n\n$6^2=36$, więc $6=\\sqrt{36}$. $5{,}5^2=30{,}25$, więc $5{,}5=\\sqrt{30{,}25}$.\n\nPorównujemy liczby pod pierwiastkami: $26<30{,}25<35<36$.\n\nZatem $\\sqrt{26}<5{,}5<\\sqrt{35}<6$.\n\nOdpowiedź: $\\sqrt{26}$, $5{,}5$, $\\sqrt{35}$, $6$.",
        },
      ],
      generatory: [
        {
          id: "miedzy-calkowitymi",
          nazwa: "Między liczbami całkowitymi",
          opis: "Oszacuj pierwiastek: podaj mniejszą z dwóch kolejnych liczb całkowitych, między którymi leży, albo bok kwadratu o danym polu.",
          generuj(r) {
            const n = probuj(() => {
              const n = r.int(2, 150);
              return kwadrat(n) ? null : n;
            });
            const k = calk(n);
            const kroki = [
              `Szukamy kwadratów liczb całkowitych blisko $${n}$: $${k}^2=${k * k}$ oraz $${k + 1}^2=${(k + 1) ** 2}$.`,
              `Mamy $${k * k}<${n}<${(k + 1) ** 2}$, więc $${k}<${sq(n)}<${k + 1}$.`,
            ];
            if (r.chance(0.3)) {
              return {
                tresc: `Kwadratowy ogródek ma pole $${n}$ m$^2$. Bok ogródka ma długość między $k$ m a $k+1$ m. Ile wynosi $k$?`,
                pola: [pole("w", "$k=$")],
                odpowiedz: { w: q(k) },
                wynik: `$${k}$`,
                rozwiazanie: [`Bok ogródka to $${sq(n)}$ m.`, ...kroki, `Zatem $k=${k}$.`],
              };
            }
            return {
              tresc: `Liczba $${sq(n)}$ leży między dwiema kolejnymi liczbami całkowitymi. Podaj mniejszą z nich.`,
              pola: [pole("w", "Mniejsza liczba $=$")],
              odpowiedz: { w: q(k) },
              wynik: `$${k}$`,
              rozwiazanie: [...kroki, `Mniejsza z nich to $${k}$.`],
            };
          },
        },
        {
          id: "porownaj-pierwiastek",
          nazwa: "Porównaj z liczbą",
          opis: "Porównaj pierwiastek z liczbą całkowitą albo policz, ile liczb całkowitych leży między dwoma pierwiastkami.",
          generuj(r) {
            if (r.chance(0.55)) {
              const n = probuj(() => {
                const n = r.int(5, 120);
                return kwadrat(n) ? null : n;
              });
              const k = calk(n);
              const b = r.chance() ? k : k + 1;
              const mniej = b === k + 1;
              const opcje = [`$${sq(n)}<${b}$`, `$${sq(n)}>${b}$`];
              const prawdziwa = mniej ? 0 : 1;
              const odwroc = r.chance();
              return {
                tresc: `Porównaj liczby $${sq(n)}$ i $${b}$. Które zdanie jest prawdziwe?`,
                pola: [{ id: "w", typ: "wybor", etykieta: "Prawdziwe zdanie", opcje: odwroc ? [opcje[1], opcje[0]] : opcje }],
                odpowiedz: { w: odwroc ? 1 - prawdziwa : prawdziwa },
                wynik: opcje[prawdziwa],
                rozwiazanie: [
                  `Liczbę $${b}$ zapisujemy jako pierwiastek: $${b}=${sq(b * b)}$, bo $${b}^2=${b * b}$.`,
                  `Porównujemy liczby pod pierwiastkami: $${n}$ i $${b * b}$. Liczba $${n}$ jest ${mniej ? "mniejsza" : "większa"}.`,
                  `Zatem $${sq(n)}${mniej ? "<" : ">"}${b}$.`,
                ],
              };
            }
            const [a, b] = probuj(() => {
              const a = r.int(2, 30);
              const b = r.int(a + 8, 140);
              return kwadrat(a) || kwadrat(b) ? null : [a, b];
            });
            const ka = calk(a);
            const kb = calk(b);
            const w = kb - ka;
            return {
              tresc: `Ile liczb całkowitych leży między $${sq(a)}$ i $${sq(b)}$?`,
              pola: [pole("w", "Liczba liczb $=$")],
              odpowiedz: { w: q(w) },
              wynik: `$${w}$`,
              rozwiazanie: [
                `Szacujemy: $${ka}<${sq(a)}<${ka + 1}$ oraz $${kb}<${sq(b)}<${kb + 1}$.`,
                `Między nimi leżą liczby całkowite od $${ka + 1}$ do $${kb}$.`,
                `Jest ich $${kb}-${ka}=${w}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Własności pierwiastkowania
    {
      id: "wlasnosci",
      nazwa: "Własności pierwiastkowania",
      sciaga: [
        {
          nazwa: "Pierwiastek z iloczynu",
          slownie: "Pierwiastek z iloczynu to iloczyn pierwiastków. Możemy więc rozbić liczbę pod pierwiastkiem na czynniki, z których pierwiastki są łatwe.",
          tex: "\\sqrt{a\\cdot b}=\\sqrt{a}\\cdot\\sqrt{b}",
          litery: "$a$, $b$ – liczby nieujemne.",
          przyklad: "$\\sqrt{4\\cdot25}=\\sqrt{100}=10$ i $\\sqrt4\\cdot\\sqrt{25}=2\\cdot5=10$. Wychodzi to samo.",
          uwaga: "Dla sumy tak nie działa. $\\sqrt{9+16}=\\sqrt{25}=5$, ale $\\sqrt9+\\sqrt{16}=3+4=7$.",
        },
        {
          nazwa: "Pierwiastek z ilorazu",
          slownie: "Pierwiastek z ilorazu (albo z ułamka) to iloraz pierwiastków. Dzielnik musi być większy od zera.",
          tex: "\\sqrt{a:b}=\\sqrt{a}:\\sqrt{b}",
          litery: "$a\\ge0$, $b>0$.",
          przyklad: "$\\sqrt{\\frac{36}{4}}=\\frac{\\sqrt{36}}{\\sqrt4}=\\frac{6}{2}=3$. Sprawdzenie: $36:4=9$ i $\\sqrt9=3$.",
          uwaga: "Dla różnicy też nie działa. $\\sqrt{25-9}=\\sqrt{16}=4$, ale $\\sqrt{25}-\\sqrt9=5-3=2$.",
        },
        {
          nazwa: "Mnożenie i dzielenie pierwiastków",
          slownie: "Wzory działają w obie strony. Dwa pierwiastki można połączyć w jeden. Często wychodzi liczba, z której pierwiastek jest całkowity.",
          tex: "\\sqrt{a}\\cdot\\sqrt{b}=\\sqrt{a\\cdot b}\\qquad\\sqrt{a}:\\sqrt{b}=\\sqrt{a:b}",
          przyklad: "$\\sqrt2\\cdot\\sqrt{18}=\\sqrt{36}=6$. Podobnie $\\sqrt{48}:\\sqrt3=\\sqrt{16}=4$.",
          uwaga: "Pod pierwiastkiem mnożymy liczby, a nie pierwiastki. $\\sqrt2\\cdot\\sqrt8=\\sqrt{16}=4$, a nie $\\sqrt{10}$.",
        },
        {
          nazwa: "Wyłączanie przed pierwiastek",
          slownie: "Gdy pod pierwiastkiem jest liczba, która ma czynnik będący kwadratem (4, 9, 16, 25, 36…), możemy ten czynnik wyciągnąć przed pierwiastek. Szukamy największego takiego czynnika.",
          tex: "\\sqrt{k^2\\cdot m}=k\\sqrt{m}",
          litery: "$k$ – liczba, której kwadrat jest czynnikiem, $m$ – reszta.",
          przyklad: "$\\sqrt{50}=\\sqrt{25\\cdot2}=\\sqrt{25}\\cdot\\sqrt2=5\\sqrt2$. Inny przykład: $\\sqrt{72}=\\sqrt{36\\cdot2}=6\\sqrt2$.",
          uwaga: "Przed pierwiastek wychodzi pierwiastek z kwadratu, a nie sam kwadrat. $\\sqrt{50}$ to $5\\sqrt2$, a nie $25\\sqrt2$.",
        },
        {
          nazwa: "Wciąganie pod pierwiastek",
          slownie: "Liczbę stojącą przed pierwiastkiem możemy wciągnąć pod pierwiastek. Wtedy trzeba ją podnieść do kwadratu.",
          tex: "k\\sqrt{m}=\\sqrt{k^2\\cdot m}",
          przyklad: "$3\\sqrt5=\\sqrt{9}\\cdot\\sqrt5=\\sqrt{9\\cdot5}=\\sqrt{45}$.",
          uwaga: "$3\\sqrt5$ to nie $\\sqrt{15}$. Trójkę wciągamy jako $3^2=9$, a nie jako $3$.",
        },
      ],
      jak: [
        "Przy mnożeniu i dzieleniu pierwiastków połącz je w jeden: pod pierwiastkiem pomnóż albo podziel liczby.",
        "Jeśli pod pierwiastkiem jest duża liczba, rozbij ją na iloczyn, w którym jest kwadrat ($4$, $9$, $16$, $25$, $36$, …).",
        "Wyciągnij pierwiastek z kwadratu przed znak pierwiastka.",
        "Aby wciągnąć liczbę pod pierwiastek, podnieś ją do kwadratu i pomnóż przez liczbę pod pierwiastkiem.",
      ],
      zadania: [
        {
          nr: "17",
          tresc: "Ile wynosi iloczyn $\\sqrt2\\cdot\\sqrt8$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\sqrt{10}$", "$16$", "$2$", "$4$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "Ile wynosi iloraz $\\sqrt{75}:\\sqrt3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$25$", "$5$", "$\\sqrt{72}$", "$\\sqrt{78}$"],
          poprawna: 1,
        },
        {
          nr: "19",
          tresc: "Jak inaczej zapisać liczbę $\\sqrt{50}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$25\\sqrt2$", "$5\\sqrt{10}$", "$5\\sqrt2$", "$10\\sqrt5$"],
          poprawna: 2,
        },
        {
          nr: "20",
          tresc: "Jak inaczej zapisać liczbę $3\\sqrt5$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\sqrt{45}$", "$\\sqrt{15}$", "$\\sqrt{8}$", "$\\sqrt{225}$"],
          poprawna: 0,
        },
        {
          nr: "21",
          tresc: "Oceń równości. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\sqrt9\\cdot\\sqrt4=\\sqrt{36}$", litery: "PF", poprawna: 0 },
            { tekst: "$\\sqrt{9+16}=\\sqrt9+\\sqrt{16}$", litery: "PF", poprawna: 1 },
            { tekst: "$\\sqrt{72}=6\\sqrt2$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "22",
          tresc: "Ile wynosi iloczyn $\\sqrt{0{,}16}\\cdot\\sqrt{100}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}4$", "$40$", "$4$", "$1{,}6$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "23",
          punkty: 2,
          tresc: "Wyłącz czynnik przed znak pierwiastka: a) $\\sqrt{12}$, b) $\\sqrt{98}$, c) $\\sqrt{200}$. **Zapisz obliczenia.**",
          rozwiazanie: "a) $\\sqrt{12}=\\sqrt{4\\cdot3}=\\sqrt4\\cdot\\sqrt3=2\\sqrt3$.\n\nb) $\\sqrt{98}=\\sqrt{49\\cdot2}=\\sqrt{49}\\cdot\\sqrt2=7\\sqrt2$.\n\nc) $\\sqrt{200}=\\sqrt{100\\cdot2}=\\sqrt{100}\\cdot\\sqrt2=10\\sqrt2$.\n\nOdpowiedź: a) $2\\sqrt3$, b) $7\\sqrt2$, c) $10\\sqrt2$.",
        },
        {
          nr: "24",
          punkty: 3,
          tresc: "Oblicz sprytnie, korzystając z własności pierwiastków: a) $\\sqrt2\\cdot\\sqrt{32}$, b) $\\sqrt{180}:\\sqrt5$, c) $\\sqrt{0{,}04\\cdot225}$. **Zapisz obliczenia.**",
          rozwiazanie: "a) $\\sqrt2\\cdot\\sqrt{32}=\\sqrt{2\\cdot32}=\\sqrt{64}=8$.\n\nb) $\\sqrt{180}:\\sqrt5=\\sqrt{180:5}=\\sqrt{36}=6$.\n\nc) $\\sqrt{0{,}04\\cdot225}=\\sqrt{0{,}04}\\cdot\\sqrt{225}=0{,}2\\cdot15=3$.\n\nOdpowiedź: a) $8$, b) $6$, c) $3$.",
        },
      ],
      generatory: [
        {
          id: "iloczyn-iloraz",
          nazwa: "Iloczyn i iloraz pierwiastków",
          opis: "Pomnóż albo podziel dwa pierwiastki, łącząc je w jeden pierwiastek, i oblicz wynik.",
          generuj(r) {
            if (r.chance(0.55)) {
              const m = r.pick([2, 3, 5, 6, 7]);
              const [s, t] = probuj(() => {
                const s = r.int(1, 4);
                const t = r.int(1, 4);
                return m * s * s * m * t * t <= 3000 && s !== t ? [s, t] : null;
              });
              const a = m * s * s;
              const b = m * t * t;
              const p = a * b;
              const w = m * s * t;
              return {
                tresc: `Oblicz $${sq(a)}\\cdot${sq(b)}$.`,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Łączymy pierwiastki w jeden: $${sq(a)}\\cdot${sq(b)}=${sq(`${a}\\cdot${b}`)}=${sq(p)}$.`,
                  `Szukamy liczby, której kwadrat to $${p}$: $${w}\\cdot${w}=${p}$.`,
                  `Zatem wynik to $${w}$.`,
                ],
              };
            }
            const m = r.pick([2, 3, 5, 6, 7, 10]);
            const c = r.int(2, 7);
            const a = m * c * c;
            return {
              tresc: `Oblicz $${sq(a)}:${sq(m)}$.`,
              pola: [pole("w", "Wynik $=$")],
              odpowiedz: { w: q(c) },
              wynik: `$${c}$`,
              rozwiazanie: [
                `Łączymy pierwiastki w jeden: $${sq(a)}:${sq(m)}=${sq(`${a}:${m}`)}=${sq(c * c)}$.`,
                `Szukamy liczby, której kwadrat to $${c * c}$: $${c}\\cdot${c}=${c * c}$.`,
                `Zatem wynik to $${c}$.`,
              ],
            };
          },
        },
        {
          id: "wylacz-wciagnij",
          nazwa: "Przed i pod pierwiastek",
          opis: "Wyłącz czynnik przed pierwiastek, wciągnij liczbę pod pierwiastek albo wybierz poprawny zapis.",
          generuj(r) {
            const tryb = r.int(0, 2);
            const m = r.pick(BEZ_KWADRATU);
            if (tryb === 0) {
              const k = probuj(() => {
                const k = r.int(2, 9);
                return k * k * m <= 400 ? k : null;
              });
              const n = k * k * m;
              return {
                tresc: `Zapisz $${sq(n)}$ w postaci $k\\sqrt{${m}}$. Podaj liczbę $k$.`,
                pola: [pole("w", "$k=$")],
                odpowiedz: { w: q(k) },
                wynik: `$${k}$`,
                rozwiazanie: [
                  `Rozkładamy liczbę pod pierwiastkiem na czynniki z kwadratem: $${n}=${k * k}\\cdot${m}$.`,
                  `$${sq(n)}=${sq(k * k)}\\cdot${sq(m)}=${k}${sq(m)}$.`,
                  `Zatem $k=${k}$.`,
                ],
              };
            }
            if (tryb === 1) {
              const k = probuj(() => {
                const k = r.int(2, 9);
                return k * k * m <= 400 ? k : null;
              });
              const n = k * k * m;
              return {
                tresc: `Wciągnij liczbę przed pierwiastkiem pod pierwiastek: $${k}${sq(m)}=${sq("n")}$. Podaj liczbę $n$.`,
                pola: [pole("w", "$n=$")],
                odpowiedz: { w: q(n) },
                wynik: `$${n}$`,
                rozwiazanie: [
                  `Liczbę $${k}$ zapisujemy pod pierwiastkiem jako kwadrat: $${k}=${sq(k * k)}$.`,
                  `$${k}${sq(m)}=${sq(k * k)}\\cdot${sq(m)}=${sq(`${k * k}\\cdot${m}`)}$.`,
                  `Zatem $n=${k * k}\\cdot${m}=${n}$.`,
                ],
              };
            }
            const [k, zle] = probuj(() => {
              const k = r.int(2, 9);
              if (k * k * m > 400 || k === m) return null;
              return [k, [`${k * k}${sq(m)}`, `${m}${sq(k)}`, `${k}${sq(k * m)}`]];
            });
            const n = k * k * m;
            const dobra = `${k}${sq(m)}`;
            const kol = r.shuffle([dobra, ...zle]);
            return {
              tresc: `Który zapis jest równy $${sq(n)}$?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Poprawny zapis", opcje: kol.map((x) => `$${x}$`) }],
              odpowiedz: { w: kol.indexOf(dobra) },
              wynik: `$${dobra}$`,
              rozwiazanie: [
                `Rozkładamy: $${n}=${k * k}\\cdot${m}$, a $${k * k}$ to kwadrat liczby $${k}$.`,
                `$${sq(n)}=${sq(k * k)}\\cdot${sq(m)}=${dobra}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Pierwiastek trzeciego stopnia
    {
      id: "pierwiastek-szescienny",
      nazwa: "Pierwiastek trzeciego stopnia i działania na nim",
      sciaga: [
        {
          nazwa: "Pierwiastek sześcienny",
          slownie: "Pierwiastek trzeciego stopnia (sześcienny) z liczby to taka liczba, która podniesiona do sześcianu daje tę liczbę. Przy pierwiastku piszemy małą trójkę.",
          tex: "\\sqrt[3]{a}=b\\qquad b^3=a",
          litery: "$a$ – liczba pod pierwiastkiem, $b$ – wynik.",
          przyklad: "$\\sqrt[3]{27}=3$, bo $3\\cdot3\\cdot3=27$. Podobnie $\\sqrt[3]{1000}=10$.",
          uwaga: "$\\sqrt[3]{27}$ to nie $27:3=9$. Wynik podniesiony do sześcianu ma dać $27$.",
        },
        {
          nazwa: "Sześciany do zapamiętania",
          slownie: "Warto znać sześciany kolejnych liczb. Wtedy pierwiastki sześcienne z nich widać od razu.",
          tex: "1^3=1\\qquad2^3=8\\qquad3^3=27\\qquad4^3=64\\qquad5^3=125\\qquad6^3=216\\qquad10^3=1000",
          przyklad: "Z kostki o objętości $64$ cm$^3$ krawędź ma $\\sqrt[3]{64}=4$ cm, bo $4\\cdot4\\cdot4=64$.",
          uwaga: "Nie myl z kwadratem. $\\sqrt{64}=8$, ale $\\sqrt[3]{64}=4$.",
        },
        {
          nazwa: "Liczby ujemne i ułamki",
          slownie: "Pierwiastek sześcienny istnieje także z liczby ujemnej, i wtedy wynik jest ujemny. Z ułamka i liczby dziesiętnej liczymy tak jak przy kwadratowym.",
          tex: "\\sqrt[3]{-8}=-2\\qquad\\sqrt[3]{\\frac{1}{8}}=\\frac{1}{2}",
          przyklad: "$\\sqrt[3]{-27}=-3$, bo $(-3)\\cdot(-3)\\cdot(-3)=-27$. Dla ułamka: $\\sqrt[3]{\\frac{8}{27}}=\\frac{2}{3}$. Dla liczby dziesiętnej: $\\sqrt[3]{0{,}008}=0{,}2$, bo $0{,}2\\cdot0{,}2\\cdot0{,}2=0{,}008$.",
          uwaga: "Pierwiastek kwadratowy z liczby ujemnej nie istnieje, ale sześcienny istnieje: $\\sqrt[3]{-8}=-2$.",
        },
        {
          nazwa: "Mnożenie i dzielenie",
          slownie: "Pierwiastki sześcienne łączymy w jeden tak samo jak kwadratowe. Minus spod pierwiastka można wyciągnąć przed niego.",
          tex: "\\sqrt[3]{a}\\cdot\\sqrt[3]{b}=\\sqrt[3]{a\\cdot b}\\qquad\\sqrt[3]{a}:\\sqrt[3]{b}=\\sqrt[3]{a:b}",
          przyklad: "$\\sqrt[3]{4}\\cdot\\sqrt[3]{16}=\\sqrt[3]{64}=4$. Podobnie $\\sqrt[3]{54}:\\sqrt[3]{2}=\\sqrt[3]{27}=3$. Z ujemną liczbą: $\\sqrt[3]{-8}=-\\sqrt[3]{8}=-2$.",
          uwaga: "Przy dodawaniu tak nie działa. $\\sqrt[3]{8}+\\sqrt[3]{27}=2+3=5$, ale $\\sqrt[3]{35}$ nie jest równe $5$.",
        },
        {
          nazwa: "Szacowanie i wyłączanie",
          slownie: "Pierwiastek sześcienny, który nie wychodzi równo, szacujemy między sześcianami. Gdy pod pierwiastkiem jest czynnik będący sześcianem, wyciągamy go przed pierwiastek.",
          tex: "k^3<n<(k+1)^3\\qquad\\sqrt[3]{k^3\\cdot m}=k\\sqrt[3]{m}",
          przyklad: "$\\sqrt[3]{30}$: $27<30<64$, więc $3<\\sqrt[3]{30}<4$. Wyłączanie: $\\sqrt[3]{54}=\\sqrt[3]{27\\cdot2}=3\\sqrt[3]{2}$.",
        },
      ],
      jak: [
        "Zapytaj: jaka liczba podniesiona do sześcianu (trzykrotnie pomnożona przez siebie) daje liczbę pod pierwiastkiem?",
        "Przy liczbie ujemnej policz pierwiastek z liczby bez minusa i dopisz minus.",
        "Przy ułamku i liczbie dziesiętnej licz osobno licznik i mianownik albo sprawdzaj mnożeniem.",
        "Sprawdź wynik: podnieś go do sześcianu.",
      ],
      zadania: [
        {
          nr: "25",
          tresc: "Ile wynosi $\\sqrt[3]{125}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$25$", "$5$", "$\\frac{125}{3}$", "$15$"],
          poprawna: 1,
        },
        {
          nr: "26",
          tresc: "Ile wynosi $\\sqrt[3]{-64}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$-8$", "$-4$", "$-16$"],
          poprawna: 2,
        },
        {
          nr: "27",
          tresc: "Sześcienne pudełko ma objętość $343$ cm$^3$. Ile centymetrów ma jego krawędź? **Wybierz właściwą odpowiedź.**",
          opcje: ["$49$ cm", "$21$ cm", "$7$ cm", "$34{,}3$ cm"],
          poprawna: 2,
        },
        {
          nr: "28",
          tresc: "Ile wynosi $\\sqrt[3]{\\frac{8}{27}}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{2}{3}$", "$\\frac{8}{9}$", "$\\frac{2}{9}$", "$\\frac{8}{3}$"],
          poprawna: 0,
        },
        {
          nr: "29",
          tresc: "Oceń równości. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\sqrt[3]{-1}=-1$", litery: "PF", poprawna: 0 },
            { tekst: "$\\sqrt[3]{27}=9$", litery: "PF", poprawna: 1 },
            { tekst: "$\\sqrt[3]{0{,}001}=0{,}1$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "30",
          tresc: "Ile wynosi iloczyn $\\sqrt[3]{16}\\cdot\\sqrt[3]{4}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\sqrt[3]{20}$", "$2$", "$8$", "$4$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "31",
          punkty: 2,
          tresc: "Pudełko w kształcie sześcianu ma objętość $125$ cm$^3$. Oblicz długość jego krawędzi i pole powierzchni całego pudełka. **Zapisz obliczenia.**",
          rozwiazanie: "Krawędź to liczba, której sześcian wynosi $125$. Mamy $5\\cdot5\\cdot5=125$, więc krawędź ma $\\sqrt[3]{125}=5$ cm.\n\nSześcian ma $6$ jednakowych ścian, a każda jest kwadratem o boku $5$ cm. Pole jednej ściany to $5\\cdot5=25$ cm$^2$.\n\nPole całego pudełka to $6\\cdot25=150$ cm$^2$.\n\nOdpowiedź: Krawędź ma $5$ cm, a pole powierzchni to $150$ cm$^2$.",
        },
        {
          nr: "32",
          punkty: 3,
          tresc: "Oblicz: a) $\\sqrt[3]{-8}+\\sqrt[3]{125}$, b) $\\sqrt[3]{54}:\\sqrt[3]{2}$, c) $\\sqrt{81}\\cdot\\sqrt[3]{-1}$. **Zapisz obliczenia.**",
          rozwiazanie: "a) $\\sqrt[3]{-8}=-2$ oraz $\\sqrt[3]{125}=5$, więc $-2+5=3$.\n\nb) Łączymy w jeden pierwiastek: $\\sqrt[3]{54:2}=\\sqrt[3]{27}=3$.\n\nc) $\\sqrt{81}=9$ oraz $\\sqrt[3]{-1}=-1$, więc $9\\cdot(-1)=-9$.\n\nOdpowiedź: a) $3$, b) $3$, c) $-9$.",
        },
      ],
      generatory: [
        {
          id: "pierwiastek-szescienny",
          nazwa: "Oblicz pierwiastek sześcienny",
          opis: "Oblicz pierwiastek trzeciego stopnia z liczby naturalnej, ujemnej, ułamka albo liczby dziesiętnej, albo krawędź sześcianu o danej objętości.",
          generuj(r) {
            const tryb = r.int(0, 4);
            const polecenie = (x) => r.pick([`Oblicz $${x}$.`, `Ile wynosi $${x}$?`, `Oblicz wartość wyrażenia $${x}$.`]);
            if (tryb === 0) {
              const k = r.int(2, 10);
              const n = k ** 3;
              return {
                tresc: polecenie(cb(n)),
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(k) },
                wynik: `$${k}$`,
                rozwiazanie: [
                  `Szukamy liczby, która podniesiona do sześcianu daje $${n}$.`,
                  `Sprawdzamy: $${k}\\cdot${k}\\cdot${k}=${n}$.`,
                  `Zatem $${cb(n)}=${k}$.`,
                ],
              };
            }
            if (tryb === 1) {
              const k = r.int(2, 9);
              const n = k ** 3;
              return {
                tresc: polecenie(cb(`-${n}`)),
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(-k) },
                wynik: `$${-k}$`,
                rozwiazanie: [
                  `Pierwiastek sześcienny z liczby ujemnej jest ujemny. Najpierw $${cb(n)}=${k}$, bo $${k}\\cdot${k}\\cdot${k}=${n}$.`,
                  `Sprawdzamy: $(-${k})\\cdot(-${k})\\cdot(-${k})=-${n}$.`,
                  `Zatem $${cb(`-${n}`)}=-${k}$.`,
                ],
              };
            }
            if (tryb === 2) {
              const [p, b] = probuj(() => {
                const b = r.int(2, 5);
                const p = r.int(1, 6);
                return p !== b && [2, 3, 4, 5].every((d) => !(p % d === 0 && b % d === 0)) ? [p, b] : null;
              });
              const w = q(p, b);
              return {
                tresc: `${polecenie(cb(ulamek(p ** 3, b ** 3)))} Wynik podaj w postaci ułamka (np. 2/3) albo liczby dziesiętnej.`,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w },
                wynik: `$${w.tex()}$`,
                rozwiazanie: [
                  `Pierwiastek z ułamka liczymy osobno z licznika i z mianownika: $${cb(ulamek(p ** 3, b ** 3))}=${ulamek(cb(p ** 3), cb(b ** 3))}$.`,
                  `$${cb(p ** 3)}=${p}$ oraz $${cb(b ** 3)}=${b}$.`,
                  `Wynik: $${w.tex()}$.`,
                ],
              };
            }
            if (tryb === 3) {
              const k = r.int(1, 9);
              const kw = q(k ** 3, 1000);
              const w = q(k, 10);
              return {
                tresc: polecenie(cb(dz(kw))),
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w },
                wynik: `$${dz(w)}$`,
                rozwiazanie: [
                  `Liczba $${dz(kw)}$ ma trzy miejsca po przecinku, więc wynik ma jedno miejsce po przecinku.`,
                  `Sprawdzamy: $${dz(w)}\\cdot${dz(w)}\\cdot${dz(w)}=${dz(kw)}$.`,
                  `Zatem $${cb(dz(kw))}=${dz(w)}$.`,
                ],
              };
            }
            const k = r.int(2, 10);
            const v = k ** 3;
            return {
              tresc: r.pick(PUDELKA)(v),
              pola: [pole("w", "Krawędź $=$")],
              odpowiedz: { w: q(k) },
              wynik: `$${k}$`,
              rozwiazanie: [
                `Objętość sześcianu to krawędź razy krawędź razy krawędź. Szukamy liczby, która trzy razy pomnożona przez siebie daje $${v}$.`,
                `Krawędź to $${cb(v)}$. Sprawdzamy: $${k}\\cdot${k}\\cdot${k}=${v}$.`,
                `Krawędź ma długość $${k}$.`,
              ],
            };
          },
        },
        {
          id: "dzialania-szescienne",
          nazwa: "Działania na sześciennych",
          opis: "Pomnóż, podziel albo dodaj pierwiastki sześcienne, albo oszacuj pierwiastek sześcienny między liczbami całkowitymi.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const m = r.int(2, 6);
              const c = m <= 3 ? r.int(1, 3) : 1;
              const a = m;
              const b = m * m * c ** 3;
              const w = m * c;
              return {
                tresc: `Oblicz $${cb(a)}\\cdot${cb(b)}$.`,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Łączymy pierwiastki w jeden: $${cb(a)}\\cdot${cb(b)}=${cb(`${a}\\cdot${b}`)}=${cb(a * b)}$.`,
                  `Szukamy liczby, której sześcian to $${a * b}$: $${w}\\cdot${w}\\cdot${w}=${a * b}$.`,
                  `Zatem wynik to $${w}$.`,
                ],
              };
            }
            if (tryb === 1) {
              const b = r.int(2, 7);
              const c = r.int(2, 4);
              const a = b * c ** 3;
              return {
                tresc: `Oblicz $${cb(a)}:${cb(b)}$.`,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(c) },
                wynik: `$${c}$`,
                rozwiazanie: [
                  `Łączymy pierwiastki w jeden: $${cb(a)}:${cb(b)}=${cb(`${a}:${b}`)}=${cb(c ** 3)}$.`,
                  `Szukamy liczby, której sześcian to $${c ** 3}$: $${c}\\cdot${c}\\cdot${c}=${c ** 3}$.`,
                  `Zatem wynik to $${c}$.`,
                ],
              };
            }
            if (tryb === 2) {
              const [a, b] = probuj(() => {
                const a = r.int(1, 7);
                const b = r.int(1, 7);
                return [a, b];
              });
              const s = r.chance();
              const znak = s ? "+" : "-";
              const w = s ? b - a : -a - b;
              const l1 = a ** 3;
              const l2 = b ** 3;
              return {
                tresc: `Oblicz $${cb(`-${l1}`)}${znak}${cb(l2)}$.`,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Liczymy każdy pierwiastek: $${cb(`-${l1}`)}=-${a}$ oraz $${cb(l2)}=${b}$.`,
                  s ? `Dodajemy: $-${a}+${b}=${w}$.` : `Odejmujemy: $-${a}-${b}=${w}$.`,
                ],
              };
            }
            const n = probuj(() => {
              const n = r.int(2, 700);
              return szescian(n) ? null : n;
            });
            const k = calk3(n);
            return {
              tresc: `Liczba $${cb(n)}$ leży między dwiema kolejnymi liczbami całkowitymi. Podaj mniejszą z nich.`,
              pola: [pole("w", "Mniejsza liczba $=$")],
              odpowiedz: { w: q(k) },
              wynik: `$${k}$`,
              rozwiazanie: [
                `Szukamy sześcianów liczb całkowitych blisko $${n}$: $${k}^3=${k ** 3}$ oraz $${k + 1}^3=${(k + 1) ** 3}$.`,
                `Mamy $${k ** 3}<${n}<${(k + 1) ** 3}$, więc $${k}<${cb(n)}<${k + 1}$.`,
                `Mniejsza z nich to $${k}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Działania na potęgach i pierwiastkach
    {
      id: "potegi-i-pierwiastki",
      nazwa: "Działania na potęgach i pierwiastkach",
      sciaga: [
        {
          nazwa: "Kwadrat i pierwiastek",
          slownie: "Podniesienie do kwadratu i pierwiastek kwadratowy „cofają się” nawzajem. Działa to w obie strony dla liczb nieujemnych.",
          tex: "(\\sqrt{a})^2=a\\qquad\\sqrt{a^2}=a",
          litery: "$a\\ge0$.",
          przyklad: "$(\\sqrt7)^2=7$ oraz $\\sqrt{7^2}=\\sqrt{49}=7$.",
          uwaga: "$(\\sqrt7)^2$ to nie $\\sqrt{49}$ ani $14$. Pierwiastek i kwadrat po prostu się skracają, wychodzi $7$.",
        },
        {
          nazwa: "Sześcian i pierwiastek",
          slownie: "Podobnie jest z sześcianem i pierwiastkiem trzeciego stopnia. To działa także dla liczb ujemnych.",
          tex: "(\\sqrt[3]{a})^3=a\\qquad\\sqrt[3]{a^3}=a",
          przyklad: "$\\sqrt[3]{4^3}=\\sqrt[3]{64}=4$ oraz $(\\sqrt[3]{10})^3=10$. Dla ujemnej: $\\sqrt[3]{(-2)^3}=\\sqrt[3]{-8}=-2$.",
        },
        {
          nazwa: "Pierwiastek z potęgi",
          slownie: "Gdy pod pierwiastkiem jest potęga, zapisujemy ją tak, żeby wykładnik dzielił się przez $2$ (przy kwadratowym) albo przez $3$ (przy sześciennym). Potem wynik to ta sama podstawa z mniejszym wykładnikiem.",
          tex: "\\sqrt{a^{2n}}=a^n\\qquad\\sqrt[3]{a^{3n}}=a^n",
          litery: "$a\\ge0$, $n$ – liczba naturalna.",
          przyklad: "$\\sqrt{2^6}=\\sqrt{(2^3)^2}=2^3=8$. Podobnie $\\sqrt[3]{2^6}=\\sqrt[3]{(2^2)^3}=2^2=4$.",
          uwaga: "Wykładnik dzielimy przez $2$ (albo $3$). $\\sqrt{3^6}=3^3=27$, a nie $3^{6-2}=3^4=81$.",
        },
        {
          nazwa: "Dodawanie takich samych pierwiastków",
          slownie: "Pierwiastki z tej samej liczby dodajemy jak „jednakowe przedmioty”: dodajemy liczby przed pierwiastkiem. Jeśli pod pierwiastkami są różne liczby, spróbuj najpierw wyłączyć czynnik przed pierwiastek.",
          tex: "a\\sqrt{m}+b\\sqrt{m}=(a+b)\\sqrt{m}",
          przyklad: "$3\\sqrt2+5\\sqrt2=8\\sqrt2$. Dla różnych liczb: $\\sqrt8+\\sqrt{18}=2\\sqrt2+3\\sqrt2=5\\sqrt2$.",
          uwaga: "$\\sqrt2+\\sqrt3$ nie jest równe $\\sqrt5$. Różnych pierwiastków (których nie da się sprowadzić do takich samych) nie dodajemy.",
        },
        {
          nazwa: "Kolejność działań",
          slownie: "Kolejność jest taka jak zawsze: najpierw potęgi i pierwiastki, potem mnożenie i dzielenie, na końcu dodawanie i odejmowanie. Pierwiastek obejmuje tylko to, co jest pod jego kreską.",
          przyklad: "$3^2+\\sqrt{36}-\\sqrt[3]{8}\\cdot2=9+6-2\\cdot2=15-4=11$.",
          uwaga: "$\\sqrt9+16$ to $3+16=19$, a nie $\\sqrt{25}$. Pierwiastek obejmuje tylko $9$.",
        },
      ],
      jak: [
        "Policz osobno każdy pierwiastek i każdą potęgę. Przy potędze pod pierwiastkiem podziel wykładnik przez $2$ albo $3$.",
        "Zachowaj kolejność działań: potęgi i pierwiastki, mnożenie i dzielenie, dodawanie i odejmowanie.",
        "Przy różnych pierwiastkach wyłącz czynnik przed pierwiastek, aby wyszły takie same.",
        "Dodaj lub odejmij liczby przed takimi samymi pierwiastkami.",
      ],
      zadania: [
        {
          nr: "33",
          tresc: "Ile wynosi $(\\sqrt7)^2$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$49$", "$14$", "$\\sqrt{14}$", "$7$"],
          poprawna: 3,
        },
        {
          nr: "34",
          tresc: "Ile wynosi $\\sqrt{3^4}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$", "$9$", "$12$", "$81$"],
          poprawna: 1,
        },
        {
          nr: "35",
          tresc: "Ile wynosi $\\sqrt{2^6}+\\sqrt[3]{2^6}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$", "$16$", "$6$", "$32$"],
          poprawna: 0,
        },
        {
          nr: "36",
          tresc: "Ile wynosi suma $\\sqrt8+\\sqrt{18}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\sqrt{26}$", "$6\\sqrt2$", "$13\\sqrt2$", "$5\\sqrt2$"],
          poprawna: 3,
        },
        {
          nr: "37",
          tresc: "Oceń równości. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\sqrt{25}+\\sqrt[3]{8}=7$", litery: "PF", poprawna: 0 },
            { tekst: "$\\sqrt{9+16}=3+4$", litery: "PF", poprawna: 1 },
            { tekst: "$\\sqrt[3]{3^6}=9$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "38",
          tresc: "Ile wynosi $3^2+\\sqrt{36}-\\sqrt[3]{8}\\cdot2$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$", "$13$", "$11$", "$15$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "39",
          punkty: 2,
          tresc: "Oblicz $\\sqrt{2^6}\\cdot\\sqrt[3]{3^3}-(\\sqrt5)^2$. **Zapisz obliczenia.**",
          rozwiazanie: "$\\sqrt{2^6}=\\sqrt{(2^3)^2}=2^3=8$.\n\n$\\sqrt[3]{3^3}=3$.\n\n$(\\sqrt5)^2=5$.\n\nLiczymy w kolejności: $8\\cdot3-5=24-5=19$.\n\nOdpowiedź: Wartość wyrażenia to $19$.",
        },
        {
          nr: "40",
          punkty: 3,
          tresc: "Zapisz w najprostszej postaci (w postaci $k\\sqrt{m}$): a) $\\sqrt{12}+\\sqrt{27}$, b) $2\\sqrt{50}-\\sqrt8$, c) $\\sqrt{45}-\\sqrt{20}$. **Zapisz obliczenia.**",
          rozwiazanie: "a) $\\sqrt{12}=2\\sqrt3$ i $\\sqrt{27}=3\\sqrt3$, więc $2\\sqrt3+3\\sqrt3=5\\sqrt3$.\n\nb) $\\sqrt{50}=5\\sqrt2$, więc $2\\sqrt{50}=10\\sqrt2$. Ponadto $\\sqrt8=2\\sqrt2$. Zatem $10\\sqrt2-2\\sqrt2=8\\sqrt2$.\n\nc) $\\sqrt{45}=3\\sqrt5$ i $\\sqrt{20}=2\\sqrt5$, więc $3\\sqrt5-2\\sqrt5=\\sqrt5$.\n\nOdpowiedź: a) $5\\sqrt3$, b) $8\\sqrt2$, c) $\\sqrt5$.",
        },
      ],
      generatory: [
        {
          id: "potegi-pierwiastki",
          nazwa: "Potęgi i pierwiastki",
          opis: "Oblicz wartość wyrażenia z potęgami i pierwiastkami: (√a)², pierwiastek z potęgi albo kilka działań.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const a = r.int(2, 40);
              const b = r.int(2, 12);
              const w = a + b;
              const odw = r.chance();
              return {
                tresc: odw ? `Oblicz $(${sq(a)})^2+${sq(b * b)}$.` : `Oblicz $${sq(b * b)}+(${sq(a)})^2$.`,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Pierwiastek i kwadrat się skracają: $(${sq(a)})^2=${a}$.`,
                  `$${sq(b * b)}=${b}$.`,
                  `Dodajemy: $${odw ? `${a}+${b}` : `${b}+${a}`}=${w}$.`,
                ],
              };
            }
            if (tryb === 1) {
              const kw = r.chance();
              const [a, n] = probuj(() => {
                const a = r.pick([2, 3, 5, 10]);
                const n = r.int(2, 4);
                return a ** (kw ? 2 * n : 3 * n) <= 1e6 ? [a, n] : null;
              });
              const e = kw ? 2 * n : 3 * n;
              const w = a ** n;
              const wyr = kw ? sq(`${a}^{${e}}`) : cb(`${a}^{${e}}`);
              const w2 = kw ? `(${a}^{${n}})^2` : `(${a}^{${n}})^3`;
              return {
                tresc: `Oblicz $${wyr}$.`,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Wykładnik dzielimy przez $${kw ? 2 : 3}$: $${e}=${kw ? 2 : 3}\\cdot${n}$, więc $${a}^{${e}}=${w2}$.`,
                  `Pierwiastek i ${kw ? "kwadrat" : "sześcian"} się skracają: $${wyr}=${a}^{${n}}$.`,
                  `Obliczamy: $${a}^{${n}}=${w}$.`,
                ],
              };
            }
            if (tryb === 2) {
              const [a, b, c] = probuj(() => {
                const a = r.int(2, 6);
                const b = r.int(2, 12);
                const c = r.int(1, 5);
                return a * a + b - c * 2 > 0 ? [a, b, c] : null;
              });
              const w = a * a + b - c * 2;
              return {
                tresc: `Oblicz $${a}^2+${sq(b * b)}-${cb(c ** 3)}\\cdot2$.`,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Liczymy potęgę i pierwiastki: $${a}^2=${a * a}$, $${sq(b * b)}=${b}$, $${cb(c ** 3)}=${c}$.`,
                  `Mnożenie przed dodawaniem: $${c}\\cdot2=${c * 2}$.`,
                  `Liczymy od lewej: $${a * a}+${b}-${c * 2}=${w}$.`,
                ],
              };
            }
            const [a, b] = probuj(() => {
              const a = r.int(2, 9);
              const b = r.int(1, 5);
              return [a, b];
            });
            const w = a * b;
            return {
              tresc: `Oblicz $${sq(`${a}^2`)}\\cdot${cb(`${b}^3`)}$.`,
              pola: [pole("w", "Wynik $=$")],
              odpowiedz: { w: q(w) },
              wynik: `$${w}$`,
              rozwiazanie: [
                `$${sq(`${a}^2`)}=${a}$, bo pierwiastek i kwadrat się skracają.`,
                `$${cb(`${b}^3`)}=${b}$, bo pierwiastek i sześcian się skracają.`,
                `Mnożymy: $${a}\\cdot${b}=${w}$.`,
              ],
            };
          },
        },
        {
          id: "dodawanie-pierwiastkow",
          nazwa: "Dodawanie pierwiastków",
          opis: "Dodaj lub odejmij takie same pierwiastki (czasem po wyłączeniu czynnika przed pierwiastek). Podaj liczbę stojącą przed pierwiastkiem.",
          generuj(r) {
            const m = r.pick(BEZ_KWADRATU);
            if (r.chance()) {
              const [a, b, c] = probuj(() => {
                const a = r.int(2, 9);
                const b = r.int(1, 9);
                const c = r.int(1, 6);
                return a + b - c >= 2 ? [a, b, c] : null;
              });
              const w = a + b - c;
              return {
                tresc: `Zapisz $${ck(a, m)}+${ck(b, m)}-${ck(c, m)}$ w postaci $k${sq(m)}$. Podaj liczbę $k$.`,
                pola: [pole("w", "$k=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}${sq(m)}$`,
                rozwiazanie: [
                  `Pierwiastki są takie same, więc dodajemy i odejmujemy liczby przed nimi.`,
                  `$${a}+${b}-${c}=${w}$.`,
                  `Zatem wynik to $${w}${sq(m)}$.`,
                ],
              };
            }
            const minus = r.chance(0.3);
            const [k1, k2] = probuj(() => {
              const k1 = r.int(2, 6);
              const k2 = r.int(2, 7);
              if (k1 * k1 * m > 300 || k2 * k2 * m > 300) return null;
              return (minus ? k2 - k1 : k1 + k2) >= 2 ? [k1, k2] : null;
            });
            const w = minus ? k2 - k1 : k1 + k2;
            const znak = minus ? "-" : "+";
            const n1 = k1 * k1 * m;
            const n2 = k2 * k2 * m;
            return {
              tresc: `Zapisz $${sq(n2)}${znak}${sq(n1)}$ w postaci $k${sq(m)}$. Podaj liczbę $k$.`,
              pola: [pole("w", "$k=$")],
              odpowiedz: { w: q(w) },
              wynik: `$${w}${sq(m)}$`,
              rozwiazanie: [
                `Wyłączamy czynnik przed pierwiastek: $${sq(n2)}=${sq(k2 * k2)}\\cdot${sq(m)}=${ck(k2, m)}$ oraz $${sq(n1)}=${ck(k1, m)}$.`,
                `Teraz pierwiastki są takie same: $${ck(k2, m)}${znak}${ck(k1, m)}=(${k2}${znak}${k1})${sq(m)}$.`,
                `$${k2}${znak}${k1}=${w}$, więc wynik to $${w}${sq(m)}$.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
