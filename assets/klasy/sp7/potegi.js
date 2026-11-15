// Klasa 7 (szkoła podstawowa) · rozdział II „Potęgi” – Matematyka z kluczem 7 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Bez pierwiastków (są w następnym rozdziale) i bez wyrażeń z literami: wzory sprawdzamy na liczbach.
// Wykładniki ujemne tylko jako 10^(-k) przy zapisie bardzo małych liczb w notacji wykładniczej.
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

function nwd(a, b) {
  while (b) [a, b] = [b, a % b];
  return Math.abs(a);
}

/** Zapis dziesiętny z przecinkiem do wzoru: dz(q(9, 2)) = "4{,}5"; gdy się nie da, ułamek zwykły. */
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

/** Liczba całkowita (tekst) z odstępami tysięcy dla liczb od 5 cyfr: "63000" -> "63\\,000". */
const tys = (s) => {
  const t = String(s);
  return t.length >= 5 ? t.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : t;
};

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });
const ulamek = (a, b) => `\\frac{${a}}{${b}}`;
const pot = (a, n) => `${a}^{${n}}`;
/** Iloczyn tych samych czynników: iloczyn(3, 3) = "3\\cdot 3\\cdot 3". */
const iloczyn = (a, n) => Array(n).fill(a).join("\\cdot ");
/** Zapis a·10^k: notacja(q(45, 10), 7) = "4{,}5\\cdot 10^{7}". */
const notacja = (v, e) => `${dz(v)}\\cdot 10^{${e}}`;

/** Sprowadza liczbę v·10^e do postaci a·10^k z 1 ≤ a < 10. */
function normuj(v, e) {
  while (v.cmp(10) >= 0) {
    v = v.div(10);
    e++;
  }
  while (v.cmp(1) < 0) {
    v = v.mul(10);
    e--;
  }
  return { v, e };
}

/** Powtarza losowanie, aż f() zwróci zadanie (wartość różną od null); f używa tego samego losownika, więc wynik jest powtarzalny. */
function probuj(f, proby = 2000) {
  for (let i = 0; i < proby; i++) {
    const w = f();
    if (w) return w;
  }
  throw new Error("Nie udało się wylosować zadania");
}

/** Kolejne potęgi do podglądu: "2^{2}=4, 2^{3}=8, ..." */
function kolejne(a, n) {
  const czesci = [];
  for (let k = 2; k <= n; k++) czesci.push(`${pot(a, k)}=${a ** k}`);
  return czesci.join(",\\ ");
}

// --- Dane do generatorów

const WZROST = [
  (k, b, n) => `W probówce jest $${k}$ ${k === 1 ? "bakteria" : k < 5 ? "bakterie" : "bakterii"}. Co godzinę liczba bakterii zwiększa się $${b}$ razy. Ile bakterii będzie w probówce po $${n}$ godzinach?`,
  (k, b, n) => `Ola powiedziała plotkę $${k}$ ${k === 1 ? "osobie" : "osobom"}. Co godzinę liczba osób, które znają plotkę, zwiększa się $${b}$ razy. Ile osób będzie znało plotkę po $${n}$ godzinach?`,
  (k, b, n) => `W grze komputerowej masz $${k}$ ${k === 1 ? "punkt" : k < 5 ? "punkty" : "punktów"}. Po każdym zaliczonym poziomie liczba punktów zwiększa się $${b}$ razy. Ile punktów będziesz mieć po zaliczeniu $${n}$ poziomów?`,
];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Potęga o wykładniku naturalnym
    {
      id: "potega-naturalna",
      nazwa: "Potęga o wykładniku naturalnym",
      sciaga: [
        {
          nazwa: "Potęga, podstawa, wykładnik",
          slownie: "Potęga to skrót zapisu mnożenia tej samej liczby przez siebie. Podstawa to liczba, którą mnożymy. Wykładnik mówi, ile razy wpisujemy ją do iloczynu.",
          tex: "a^n=\\underbrace{a\\cdot\\ldots\\cdot a}_{n\\text{ razy}}",
          litery: "$a$ – podstawa, $n$ – wykładnik (ile razy mnożymy).",
          przyklad: "$2^5=2\\cdot2\\cdot2\\cdot2\\cdot2=32$. Podstawa to $2$, wykładnik to $5$, czyli dwójkę wpisujemy pięć razy.",
          uwaga: "$2^5$ to nie $2\\cdot5$. Wykładnik nie mnoży, tylko mówi, ile razy mnożymy podstawę. $2^5=32$, a $2\\cdot5=10$.",
        },
        {
          nazwa: "Kwadrat i sześcian",
          slownie: "Drugą potęgę nazywamy kwadratem, a trzecią sześcianem. Te nazwy znasz z pola kwadratu i objętości sześcianu.",
          tex: "a^2=a\\cdot a\\qquad a^3=a\\cdot a\\cdot a",
          przyklad: "$5^2=5\\cdot5=25$ (pięć do kwadratu). $4^3=4\\cdot4\\cdot4=64$ (cztery do sześcianu).",
          uwaga: "Liczymy po kolei: $4\\cdot4\\cdot4=16\\cdot4=64$. Wynik to nie $4\\cdot3=12$.",
        },
        {
          nazwa: "Wykładnik 1 i wykładnik 0",
          slownie: "Liczba do potęgi $1$ jest równa samej sobie. Każda liczba różna od zera do potęgi $0$ jest równa $1$.",
          tex: "a^1=a\\qquad a^0=1",
          litery: "$a$ – dowolna liczba (przy $a^0$ różna od zera).",
          przyklad: "$8^1=8$ oraz $8^0=1$. Także $10^0=1$.",
          uwaga: "$8^0$ nie jest równe $0$ ani $8$. Wynik to zawsze $1$.",
        },
        {
          nazwa: "Potęga liczby ujemnej",
          slownie: "Przy parzystym wykładniku wynik jest dodatni, a przy nieparzystym ujemny. Ujemną podstawę zawsze piszemy w nawiasie.",
          tex: "(-2)^3=-8\\qquad(-2)^4=16",
          przyklad: "$(-2)^3=(-2)\\cdot(-2)\\cdot(-2)=-8$. Dwa minusy dają plus. Przy trzech czynnikach jeden minus zostaje, a przy czterech wszystkie się parują, więc $(-2)^4=16$.",
          uwaga: "Nawias robi różnicę: $(-3)^2=9$, ale $-3^2=-9$. Bez nawiasu potęgujemy tylko trójkę, a minus dopisujemy na końcu.",
        },
        {
          nazwa: "Potęga ułamka i liczby dziesiętnej",
          slownie: "Ułamek mnożymy przez siebie tyle razy, ile pokazuje wykładnik. Przy liczbie dziesiętnej mnożymy cyfry, a potem liczymy miejsca po przecinku.",
          tex: "\\left(\\frac{2}{3}\\right)^3=\\frac{8}{27}\\qquad(0{,}2)^3=0{,}008",
          przyklad: "$\\left(\\frac{2}{3}\\right)^3=\\frac{2}{3}\\cdot\\frac{2}{3}\\cdot\\frac{2}{3}=\\frac{8}{27}$. Dla $(0{,}3)^2$ mnożymy $3\\cdot3=9$, a po przecinku mają być dwa miejsca, więc $(0{,}3)^2=0{,}09$.",
          uwaga: "Do potęgi podnosimy cały ułamek. $\\left(\\frac{2}{3}\\right)^3$ to nie $\\frac{6}{3}$.",
        },
      ],
      jak: [
        "Zapisz, co jest podstawą, a co wykładnikiem.",
        "Wpisz podstawę tyle razy, ile mówi wykładnik, i połącz kropkami mnożenia.",
        "Przy liczbie ujemnej sprawdź wykładnik: parzysty daje wynik dodatni, nieparzysty ujemny.",
        "Mnóż po kolei, po dwa czynniki naraz, i sprawdź wynik.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Ile wynosi $2^5$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10$", "$25$", "$32$", "$64$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Wartość wyrażenia $(-3)^3$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$27$", "$-27$", "$-9$", "$9$"],
          poprawna: 1,
        },
        {
          nr: "3",
          tresc: "Iloczyn $5\\cdot5\\cdot5\\cdot5$ można zapisać jako: **Wybierz właściwą odpowiedź.**",
          opcje: ["$4^{5}$", "$20$", "$5^{3}$", "$5^{4}$"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "Która z liczb jest najmniejsza? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1^{10}$", "$2^{3}$", "$3^{2}$", "$10^{1}$"],
          poprawna: 0,
        },
        {
          nr: "5",
          tresc: "Oceń równości. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$(-2)^4=16$", litery: "PF", poprawna: 0 },
            { tekst: "$-2^4=16$", litery: "PF", poprawna: 1 },
            { tekst: "$\\left(\\frac{1}{2}\\right)^3=\\frac{3}{2}$", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "6",
          tresc: "Ile wynosi $5^0+5^1$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$10$", "$6$", "$1$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "7",
          punkty: 2,
          tresc: "W probówce jest $1$ bakteria. Co godzinę każda bakteria dzieli się na dwie. Ile bakterii będzie po $6$ godzinach? Zapisz wynik w postaci potęgi i oblicz. Po ilu godzinach bakterii będzie po raz pierwszy więcej niż $100$? **Zapisz obliczenia.**",
          rozwiazanie: "Po godzinie jest $2$ bakterie, po dwóch godzinach $2\\cdot2=4$. Po $n$ godzinach jest $2^n$ bakterii.\n\nPo $6$ godzinach jest $2^6=2\\cdot2\\cdot2\\cdot2\\cdot2\\cdot2=64$ bakterii.\n\nPo $7$ godzinach jest $2^7=128$ bakterii, a $128>100$. Po $6$ godzinach było tylko $64$.\n\nOdpowiedź: Po $6$ godzinach będzie $2^6=64$ bakterii. Więcej niż $100$ będzie po raz pierwszy po $7$ godzinach.",
        },
        {
          nr: "8",
          punkty: 2,
          tresc: "Oblicz wartość wyrażenia $(-2)^3+3^2\\cdot2-(-1)^{15}$. **Zapisz obliczenia.**",
          rozwiazanie: "$(-2)^3=-8$, bo wykładnik jest nieparzysty.\n\n$3^2=9$, więc $3^2\\cdot2=9\\cdot2=18$.\n\n$(-1)^{15}=-1$, bo wykładnik jest nieparzysty.\n\n$-8+18-(-1)=-8+18+1=11$.\n\nOdpowiedź: Wartość wyrażenia to $11$.",
        },
      ],
      generatory: [
        {
          id: "oblicz-potege",
          nazwa: "Oblicz potęgę",
          opis: "Oblicz potęgę liczby naturalnej, ujemnej, ułamka albo liczby dziesiętnej.",
          generuj(r) {
            const tryb = r.int(0, 3);
            const polecenie = (x) => r.pick([`Oblicz $${x}$.`, `Ile wynosi $${x}$?`, `Oblicz wartość potęgi $${x}$.`]);
            if (tryb === 0) {
              const [a, n] = probuj(() => {
                const a = r.int(2, 10);
                const n = r.int(2, 6);
                return a ** n <= 20000 ? [a, n] : null;
              });
              const w = a ** n;
              const kroki = [
                n <= 4
                  ? `Wpisujemy podstawę $${a}$ tyle razy, ile mówi wykładnik: $${pot(a, n)}=${iloczyn(a, n)}$.`
                  : `Wykładnik to $${n}$, więc mnożymy $${a}$ przez siebie $${n}$ razy. Liczymy po kolei: $${kolejne(a, n)}$.`,
                `Wynik: $${pot(a, n)}=${w}$.`,
              ];
              return {
                tresc: polecenie(pot(a, n)),
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: kroki,
              };
            }
            if (tryb === 1) {
              const [a, n] = probuj(() => {
                const a = r.int(2, 6);
                const n = r.int(2, 5);
                return [a, n];
              });
              const w = (-a) ** n;
              const par = n % 2 === 0;
              return {
                tresc: polecenie(`(-${a})^{${n}}`),
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Wykładnik $${n}$ jest ${par ? "parzysty" : "nieparzysty"}, więc wynik jest ${par ? "dodatni" : "ujemny"}.`,
                  `Liczymy potęgę bez znaku: $${pot(a, n)}=${a ** n}$.`,
                  `Wynik: $(-${a})^{${n}}=${w}$.`,
                ],
              };
            }
            if (tryb === 2) {
              const [p, b, n] = probuj(() => {
                const b = r.int(2, 5);
                const p = r.int(1, b + 2);
                const n = r.int(2, 4);
                return nwd(p, b) === 1 && b ** n <= 40 ? [p, b, n] : null;
              });
              const w = q(p ** n, b ** n);
              const f = ulamek(p, b);
              return {
                tresc: `${polecenie(`\\left(${f}\\right)^{${n}}`)} Wynik podaj w postaci ułamka (np. 8/27) albo liczby.`,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w },
                wynik: `$${w.tex()}$`,
                rozwiazanie: [
                  `Mnożymy ułamek przez siebie $${n}$ razy: $\\left(${f}\\right)^{${n}}=${Array(n).fill(f).join("\\cdot ")}$.`,
                  `Mnożymy liczniki: $${iloczyn(p, n)}=${p ** n}$, i mianowniki: $${iloczyn(b, n)}=${b ** n}$.`,
                  `Wynik: $${ulamek(p ** n, b ** n)}${w.d !== b ** n ? `=${w.tex()}` : ""}$.`,
                ],
              };
            }
            const [c, n] = probuj(() => {
              const c = r.int(1, 9);
              const n = r.int(2, 4);
              return n === 4 && ![1, 2, 5].includes(c) ? null : [c, n];
            });
            const w = q(c ** n, 10 ** n);
            return {
              tresc: polecenie(`(0{,}${c})^{${n}}`),
              pola: [pole("w", "Wynik $=$")],
              odpowiedz: { w },
              wynik: `$${dz(w)}$`,
              rozwiazanie: [
                `Mnożymy cyfry tak, jakby nie było przecinka: $${iloczyn(c, n)}=${c ** n}$.`,
                `Każdy czynnik ma jedno miejsce po przecinku, więc wynik ma ich $${n}$.`,
                `Wynik: $(0{,}${c})^{${n}}=${dz(w)}$.`,
              ],
            };
          },
        },
        {
          id: "bakterie",
          nazwa: "Rośnie razy po razy",
          opis: "Coś rośnie dwa albo trzy razy co godzinę (bakterie, plotka, punkty). Oblicz, ile będzie po kilku godzinach.",
          generuj(r) {
            const b = r.pick([2, 3]);
            const n = b === 2 ? r.int(2, 7) : r.int(2, 5);
            const k = r.int(1, 5);
            const t = r.pick(WZROST);
            const P = b ** n;
            const W = k * P;
            const kroki = [
              `Co godzinę mnożymy przez $${b}$. Robimy to $${n}$ razy, więc liczba rośnie $${pot(b, n)}$ razy.`,
              n <= 4 ? `$${pot(b, n)}=${iloczyn(b, n)}=${P}$.` : `Liczymy po kolei: $${kolejne(b, n)}$.`,
            ];
            if (k > 1) kroki.push(`Na początku było $${k}$, więc na końcu będzie $${k}\\cdot${P}=${W}$.`);
            return {
              tresc: t(k, b, n),
              pola: [pole("w", "Wynik $=$")],
              odpowiedz: { w: q(W) },
              wynik: `$${W}$`,
              rozwiazanie: kroki,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Potęgi o tych samych podstawach
    {
      id: "te-same-podstawy",
      nazwa: "Potęgi o tych samych podstawach",
      sciaga: [
        {
          nazwa: "Mnożenie potęg",
          slownie: "Gdy mnożymy potęgi o tej samej podstawie, podstawę przepisujemy, a wykładniki dodajemy.",
          tex: "a^m\\cdot a^n=a^{m+n}",
          litery: "$a$ – podstawa, $m$ i $n$ – wykładniki.",
          przyklad: "$2^3\\cdot2^4=(2\\cdot2\\cdot2)\\cdot(2\\cdot2\\cdot2\\cdot2)=2^7=128$. Dwójkę wpisaliśmy razem $3+4=7$ razy.",
          uwaga: "Wykładniki dodajemy, a nie mnożymy. $2^3\\cdot2^4$ to $2^7$, a nie $2^{12}$. Podstawa zostaje taka sama, więc to nie jest $4^7$.",
        },
        {
          nazwa: "Dzielenie potęg",
          slownie: "Gdy dzielimy potęgi o tej samej podstawie, podstawę przepisujemy, a od wykładnika dzielnej odejmujemy wykładnik dzielnika.",
          tex: "a^m:a^n=a^{m-n}",
          litery: "$a$ – podstawa (różna od $0$), $m$ i $n$ – wykładniki, $m\\ge n$.",
          przyklad: "$5^6:5^2=\\frac{5\\cdot5\\cdot5\\cdot5\\cdot5\\cdot5}{5\\cdot5}=5^4=625$. Dwie piątki się skróciły.",
          uwaga: "Odejmujemy wykładniki, a nie dzielimy ich. $5^6:5^2$ to $5^4$, a nie $5^3$. Podstaw też nie dzielimy, więc nie wychodzi $1^4$.",
        },
        {
          nazwa: "Wykładnik zero",
          slownie: "Gdy dzielimy potęgę przez taką samą potęgę, dostajemy $1$. Stąd wiemy, że liczba różna od zera do potęgi $0$ jest równa $1$.",
          tex: "a^n:a^n=a^0=1",
          przyklad: "$7^3:7^3=343:343=1$. Ze wzoru: $7^3:7^3=7^{3-3}=7^0$. Zatem $7^0=1$.",
          uwaga: "$7^0$ to nie $0$. Każda liczba różna od zera do potęgi zerowej daje $1$.",
        },
        {
          nazwa: "Zamiana podstawy",
          slownie: "Czasem podstawy są różne, ale jedną liczbę można zapisać jako potęgę drugiej. Najpierw ją zamieniamy, a potem używamy wzorów.",
          tex: "4=2^2\\qquad8=2^3\\qquad9=3^2",
          przyklad: "$4\\cdot2^3=2^2\\cdot2^3=2^5=32$. Sprawdzenie: $4\\cdot8=32$.",
          uwaga: "Wzorów na dodawanie i odejmowanie wykładników używamy tylko wtedy, gdy podstawy są takie same.",
        },
      ],
      jak: [
        "Sprawdź, czy podstawy są takie same. Jeśli nie, spróbuj zapisać jedną liczbę jako potęgę drugiej.",
        "Przy mnożeniu wykładniki dodaj, przy dzieleniu odejmij.",
        "Gdy jest kilka działań, licz po kolei od lewej do prawej.",
        "Na końcu oblicz wartość potęgi, jeśli zadanie tego wymaga.",
      ],
      zadania: [
        {
          nr: "9",
          tresc: "Wynik działania $3^4\\cdot3^5$ to: **Wybierz właściwą odpowiedź.**",
          opcje: ["$3^{20}$", "$9^{9}$", "$3^{9}$", "$9^{20}$"],
          poprawna: 2,
        },
        {
          nr: "10",
          tresc: "Wynik działania $7^8:7^3$ to: **Wybierz właściwą odpowiedź.**",
          opcje: ["$7^{11}$", "$7^{5}$", "$1^{5}$", "$7^{24}$"],
          poprawna: 1,
        },
        {
          nr: "11",
          tresc: "Liczba $2^5\\cdot2^3:2^4$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$2^{12}$", "$4^{4}$", "$2^{4}$", "$2^{11}$"],
          poprawna: 2,
        },
        {
          nr: "12",
          tresc: "Liczba $2^{10}:2^{10}$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$0$", "$2$", "$2^{20}$", "$1$"],
          poprawna: 3,
        },
        {
          nr: "13",
          tresc: "Liczba $4\\cdot2^3$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$2^{5}$", "$8^{3}$", "$2^{6}$", "$2^{4}$"],
          poprawna: 0,
        },
        {
          nr: "14",
          tresc: "Oceń równości. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$5^3\\cdot5^4=5^7$", litery: "PF", poprawna: 0 },
            { tekst: "$6^9:6^3=6^3$", litery: "PF", poprawna: 1 },
            { tekst: "$2^4\\cdot2^4=4^8$", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "15",
          punkty: 2,
          tresc: "Zapisz w postaci jednej potęgi i oblicz: $(3^5\\cdot3^2):3^4$. **Zapisz obliczenia.**",
          rozwiazanie: "Najpierw mnożymy: $3^5\\cdot3^2=3^{5+2}=3^7$.\n\nPotem dzielimy: $3^7:3^4=3^{7-4}=3^3$.\n\nObliczamy: $3^3=3\\cdot3\\cdot3=27$.\n\nOdpowiedź: $(3^5\\cdot3^2):3^4=3^3=27$.",
        },
        {
          nr: "16",
          punkty: 3,
          tresc: "Zapisz w postaci potęgi liczby $2$ i oblicz: a) $8\\cdot2^4$, b) $16:2^2$, c) $2^9:64$. **Zapisz obliczenia.**",
          rozwiazanie: "a) $8=2^3$, więc $8\\cdot2^4=2^3\\cdot2^4=2^7=128$.\n\nb) $16=2^4$, więc $16:2^2=2^4:2^2=2^2=4$.\n\nc) $64=2^6$, więc $2^9:64=2^9:2^6=2^3=8$.\n\nOdpowiedź: a) $2^7=128$, b) $2^2=4$, c) $2^3=8$.",
        },
      ],
      generatory: [
        {
          id: "wykladnik-wyniku",
          nazwa: "Wykładnik wyniku",
          opis: "Zapisz iloczyn lub iloraz potęg o tej samej podstawie jako jedną potęgę. Podaj jej wykładnik.",
          generuj(r) {
            const a = r.int(2, 9);
            const tryb = r.int(0, 2);
            const polecenie = (x) => `Zapisz $${x}$ w postaci jednej potęgi liczby $${a}$. Podaj wykładnik tej potęgi.`;
            if (tryb === 0) {
              const m = r.int(2, 9);
              const n = r.int(2, 9);
              const s = m + n;
              return {
                tresc: polecenie(`${pot(a, m)}\\cdot ${pot(a, n)}`),
                pola: [pole("w", "Wykładnik $=$")],
                odpowiedz: { w: q(s) },
                wynik: `$${s}$`,
                rozwiazanie: [
                  `Podstawy są takie same, więc przy mnożeniu wykładniki dodajemy: $${m}+${n}=${s}$.`,
                  `Zatem $${pot(a, m)}\\cdot ${pot(a, n)}=${pot(a, s)}$.`,
                ],
              };
            }
            if (tryb === 1) {
              const m = r.int(5, 15);
              const n = r.int(2, m - 3);
              const s = m - n;
              return {
                tresc: polecenie(`${pot(a, m)}:${pot(a, n)}`),
                pola: [pole("w", "Wykładnik $=$")],
                odpowiedz: { w: q(s) },
                wynik: `$${s}$`,
                rozwiazanie: [
                  `Podstawy są takie same, więc przy dzieleniu wykładniki odejmujemy: $${m}-${n}=${s}$.`,
                  `Zatem $${pot(a, m)}:${pot(a, n)}=${pot(a, s)}$.`,
                ],
              };
            }
            const m = r.int(2, 8);
            const n = r.int(2, 8);
            const k = r.int(2, m + n - 2);
            const s = m + n - k;
            return {
              tresc: polecenie(`${pot(a, m)}\\cdot ${pot(a, n)}:${pot(a, k)}`),
              pola: [pole("w", "Wykładnik $=$")],
              odpowiedz: { w: q(s) },
              wynik: `$${s}$`,
              rozwiazanie: [
                `Liczymy od lewej. Mnożenie: wykładniki dodajemy, $${m}+${n}=${m + n}$, więc $${pot(a, m)}\\cdot ${pot(a, n)}=${pot(a, m + n)}$.`,
                `Dzielenie: wykładniki odejmujemy, $${m + n}-${k}=${s}$.`,
                `Zatem całe wyrażenie to $${pot(a, s)}$.`,
              ],
            };
          },
        },
        {
          id: "brakujacy-wykladnik",
          nazwa: "Brakujący wykładnik",
          opis: "W równości z potęgami o tej samej podstawie brakuje jednego wykładnika. Znajdź go.",
          generuj(r) {
            const a = r.int(2, 9);
            const tryb = r.int(0, 2);
            const tr = (x) => `Jaka liczba powinna stać w miejscu kwadratu, aby równość była prawdziwa? $${x}$`;
            if (tryb === 0) {
              const m = r.int(2, 8);
              const p = r.int(2, 8);
              const N = m + p;
              return {
                tresc: tr(`${pot(a, m)}\\cdot ${a}^{\\square}=${pot(a, N)}`),
                pola: [pole("w", "Liczba w kwadracie $=$")],
                odpowiedz: { w: q(p) },
                wynik: `$${p}$`,
                rozwiazanie: [
                  `Przy mnożeniu wykładniki dodajemy: $${m}+\\square=${N}$.`,
                  `Zatem $\\square=${N}-${m}=${p}$.`,
                ],
              };
            }
            if (tryb === 1) {
              const m = r.int(6, 15);
              const p = r.int(2, m - 3);
              const N = m - p;
              return {
                tresc: tr(`${pot(a, m)}:${a}^{\\square}=${pot(a, N)}`),
                pola: [pole("w", "Liczba w kwadracie $=$")],
                odpowiedz: { w: q(p) },
                wynik: `$${p}$`,
                rozwiazanie: [
                  `Przy dzieleniu wykładniki odejmujemy: $${m}-\\square=${N}$.`,
                  `Zatem $\\square=${m}-${N}=${p}$.`,
                ],
              };
            }
            const N = r.int(2, 8);
            const n = r.int(2, 8);
            const p = N + n;
            return {
              tresc: tr(`${a}^{\\square}:${pot(a, n)}=${pot(a, N)}`),
              pola: [pole("w", "Liczba w kwadracie $=$")],
              odpowiedz: { w: q(p) },
              wynik: `$${p}$`,
              rozwiazanie: [
                `Przy dzieleniu wykładniki odejmujemy: $\\square-${n}=${N}$.`,
                `Zatem $\\square=${N}+${n}=${p}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Własności potęgowania
    {
      id: "wlasnosci",
      nazwa: "Własności potęgowania",
      sciaga: [
        {
          nazwa: "Potęga potęgi",
          slownie: "Gdy potęgę podnosimy do potęgi, podstawę przepisujemy, a wykładniki mnożymy.",
          tex: "(a^m)^n=a^{m\\cdot n}",
          litery: "$a$ – podstawa, $m$ i $n$ – wykładniki.",
          przyklad: "$(2^3)^2=2^3\\cdot2^3=2^6=64$. Potęgę $2^3$ bierzemy dwa razy, więc wykładnik to $3\\cdot2=6$.",
          uwaga: "Tu wykładniki mnożymy. $(2^3)^2=2^6$, a nie $2^5$. Dodawanie wykładników jest tylko przy mnożeniu potęg.",
        },
        {
          nazwa: "Potęga iloczynu",
          slownie: "Iloczyn podnosimy do potęgi tak: do potęgi podnosimy każdy czynnik, a wyniki mnożymy.",
          tex: "(a\\cdot b)^n=a^n\\cdot b^n",
          przyklad: "$(2\\cdot5)^3=2^3\\cdot5^3=8\\cdot125=1000$. Tak samo $10^3=1000$.",
          uwaga: "Dla sumy tak nie działa! $(2+3)^2=25$, ale $2^2+3^2=13$.",
        },
        {
          nazwa: "Potęga ilorazu i ułamka",
          slownie: "Z dzieleniem i z ułamkiem jest tak samo: do potęgi podnosimy dzielną i dzielnik (licznik i mianownik).",
          tex: "(a:b)^n=a^n:b^n\\qquad\\left(\\frac{a}{b}\\right)^n=\\frac{a^n}{b^n}",
          litery: "$a$ – dzielna lub licznik, $b$ – dzielnik lub mianownik (różny od $0$).",
          przyklad: "$(10:2)^3=5^3=125$ i $10^3:2^3=1000:8=125$. Dla ułamka: $\\left(\\frac{2}{5}\\right)^3=\\frac{2^3}{5^3}=\\frac{8}{125}$.",
          uwaga: "Wykładnik dotyczy licznika i mianownika. $\\left(\\frac{2}{5}\\right)^3$ to nie $\\frac{8}{5}$.",
        },
        {
          nazwa: "Taki sam wykładnik",
          slownie: "Gdy wykładniki są takie same, a podstawy różne, możemy podstawy pomnożyć (albo podzielić), a wykładnik przepisać. To sprytny sposób liczenia w pamięci.",
          tex: "a^n\\cdot b^n=(a\\cdot b)^n\\qquad a^n:b^n=(a:b)^n",
          przyklad: "$2^4\\cdot5^4=(2\\cdot5)^4=10^4=10000$ oraz $12^3:6^3=(12:6)^3=2^3=8$.",
          uwaga: "To działa tylko przy takich samych wykładnikach. W $2^3\\cdot5^2$ wykładniki są różne, więc podstaw nie połączymy.",
        },
      ],
      jak: [
        "Sprawdź, co jest podnoszone do potęgi: potęga (jak w $(a^m)^n$), iloczyn czy ułamek.",
        "Potęga potęgi: mnóż wykładniki.",
        "Iloczyn lub iloraz: podnieś do potęgi każdy składnik albo – gdy wykładniki są takie same – połącz podstawy.",
        "Sprawdź wzór na małych liczbach, np. $(2\\cdot3)^2$ i $2^2\\cdot3^2$ dają to samo.",
      ],
      zadania: [
        {
          nr: "17",
          tresc: "Liczba $(3^2)^4$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$3^{6}$", "$3^{8}$", "$3^{16}$", "$6^{8}$"],
          poprawna: 1,
        },
        {
          nr: "18",
          tresc: "Ile wynosi $(2\\cdot3)^2$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$", "$18$", "$36$", "$13$"],
          poprawna: 2,
        },
        {
          nr: "19",
          tresc: "Liczba $2^3\\cdot5^3$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$10^{3}$", "$7^{3}$", "$10^{6}$", "$10^{9}$"],
          poprawna: 0,
        },
        {
          nr: "20",
          tresc: "Ile wynosi $\\left(\\frac{2}{5}\\right)^3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{6}{15}$", "$\\frac{2}{125}$", "$\\frac{8}{125}$", "$\\frac{8}{5}$"],
          poprawna: 2,
        },
        {
          nr: "21",
          tresc: "Oceń równości. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$(4^2)^3=4^6$", litery: "PF", poprawna: 0 },
            { tekst: "$(2+3)^2=2^2+3^2$", litery: "PF", poprawna: 1 },
            { tekst: "$(10:2)^3=10^3:2^3$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "22",
          tresc: "Która z liczb jest największa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2^2\\cdot2^3$", "$(2^2)^3$", "$2^3:2^2$", "$(2\\cdot3)^2$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "23",
          punkty: 2,
          tresc: "Oblicz $(2^2)^3\\cdot2^2:2^5$. **Zapisz obliczenia.**",
          rozwiazanie: "Potęga potęgi: $(2^2)^3=2^{2\\cdot3}=2^6$.\n\nMnożenie: $2^6\\cdot2^2=2^{6+2}=2^8$.\n\nDzielenie: $2^8:2^5=2^{8-5}=2^3$.\n\nObliczamy: $2^3=8$.\n\nOdpowiedź: Wartość wyrażenia to $8$.",
        },
        {
          nr: "24",
          punkty: 3,
          tresc: "Oblicz sprytnie, korzystając z własności potęgowania: a) $2^5\\cdot5^5$, b) $18^3:9^3$, c) $\\left(\\frac{1}{2}\\right)^4\\cdot2^4$. **Zapisz obliczenia.**",
          rozwiazanie: "a) Wykładniki są takie same, więc mnożymy podstawy: $2^5\\cdot5^5=(2\\cdot5)^5=10^5=100000$.\n\nb) Dzielimy podstawy: $18^3:9^3=(18:9)^3=2^3=8$.\n\nc) $\\left(\\frac{1}{2}\\right)^4\\cdot2^4=\\left(\\frac{1}{2}\\cdot2\\right)^4=1^4=1$.\n\nOdpowiedź: a) $100000$, b) $8$, c) $1$.",
        },
      ],
      generatory: [
        {
          id: "potega-potegi",
          nazwa: "Potęga potęgi",
          opis: "Oblicz potęgę potęgi: podaj wykładnik wyniku albo jego wartość.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const a = r.int(2, 9);
              const m = r.int(2, 6);
              const n = r.int(2, 6);
              const s = m * n;
              return {
                tresc: `Zapisz $(${pot(a, m)})^{${n}}$ w postaci jednej potęgi liczby $${a}$. Podaj wykładnik tej potęgi.`,
                pola: [pole("w", "Wykładnik $=$")],
                odpowiedz: { w: q(s) },
                wynik: `$${s}$`,
                rozwiazanie: [
                  `Potęgę podnosimy do potęgi, więc wykładniki mnożymy: $${m}\\cdot${n}=${s}$.`,
                  `Zatem $(${pot(a, m)})^{${n}}=${pot(a, s)}$.`,
                ],
              };
            }
            if (tryb === 1) {
              const [a, m, n] = probuj(() => {
                const a = r.pick([2, 2, 3, 5, 10]);
                const m = r.int(2, 5);
                const n = r.int(2, 5);
                const lim = { 2: 16, 3: 10, 5: 7, 10: 4 }[a];
                return m * n <= lim ? [a, m, n] : null;
              });
              const s = m * n;
              const w = a ** s;
              return {
                tresc: `Oblicz $(${pot(a, m)})^{${n}}$.`,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${tys(w)}$`,
                rozwiazanie: [
                  `Wykładniki mnożymy: $(${pot(a, m)})^{${n}}=${a}^{${m}\\cdot${n}}=${pot(a, s)}$.`,
                  `Obliczamy potęgę: $${pot(a, s)}=${tys(w)}$.`,
                ],
              };
            }
            const a = r.int(2, 9);
            const m = r.int(2, 5);
            const n = r.int(2, 5);
            const k = r.int(2, m * n - 2);
            const s = m * n - k;
            return {
              tresc: `Zapisz $(${pot(a, m)})^{${n}}:${pot(a, k)}$ w postaci jednej potęgi liczby $${a}$. Podaj wykładnik tej potęgi.`,
              pola: [pole("w", "Wykładnik $=$")],
              odpowiedz: { w: q(s) },
              wynik: `$${s}$`,
              rozwiazanie: [
                `Potęga potęgi: wykładniki mnożymy, $${m}\\cdot${n}=${m * n}$, więc $(${pot(a, m)})^{${n}}=${pot(a, m * n)}$.`,
                `Dzielenie: wykładniki odejmujemy, $${m * n}-${k}=${s}$.`,
                `Zatem całe wyrażenie to $${pot(a, s)}$.`,
              ],
            };
          },
        },
        {
          id: "sprytne-liczenie",
          nazwa: "Sprytne liczenie",
          opis: "Potęgi o takich samych wykładnikach: połącz podstawy i oblicz wynik w pamięci.",
          generuj(r) {
            if (r.chance()) {
              const [a, b, n] = probuj(() => {
                const [a, b] = r.pick([[2, 5], [2, 5], [4, 25], [2, 3], [4, 5], [2, 7], [3, 5], [5, 6]]);
                const n = r.int(2, 5);
                return (a * b) ** n <= 100000 ? [a, b, n] : null;
              });
              const c = a * b;
              const w = c ** n;
              return {
                tresc: `Oblicz $${pot(a, n)}\\cdot ${pot(b, n)}$. Skorzystaj z tego, że wykładniki są takie same.`,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${tys(w)}$`,
                rozwiazanie: [
                  `Wykładniki są takie same, więc mnożymy podstawy: $${a}\\cdot${b}=${c}$.`,
                  `$${pot(a, n)}\\cdot ${pot(b, n)}=${pot(c, n)}$.`,
                  `Obliczamy: $${pot(c, n)}=${tys(w)}$.`,
                ],
              };
            }
            const y = r.int(2, 9);
            const c = r.int(2, 5);
            const n = r.int(2, 4);
            const x = y * c;
            const w = c ** n;
            return {
              tresc: `Oblicz $${pot(x, n)}:${pot(y, n)}$. Skorzystaj z tego, że wykładniki są takie same.`,
              pola: [pole("w", "Wynik $=$")],
              odpowiedz: { w: q(w) },
              wynik: `$${w}$`,
              rozwiazanie: [
                `Wykładniki są takie same, więc dzielimy podstawy: $${x}:${y}=${c}$.`,
                `$${pot(x, n)}:${pot(y, n)}=${pot(c, n)}$.`,
                `Obliczamy: $${pot(c, n)}=${w}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Notacja wykładnicza
    {
      id: "notacja",
      nazwa: "Notacja wykładnicza",
      sciaga: [
        {
          nazwa: "Potęgi liczby 10",
          slownie: "Liczba $10$ do potęgi $n$ to jedynka i $n$ zer. Dlatego potęgami dziesięciu krótko zapisujemy wielkie liczby. Mnożenie przez $10^n$ przesuwa przecinek o $n$ miejsc w prawo.",
          tex: "10^3=1000\\qquad10^6=1\\,000\\,000",
          przyklad: "$10^2=100$ (sto), $10^3=1000$ (tysiąc), $10^6=1\\,000\\,000$ (milion). Natomiast $3{,}2\\cdot10^3=3200$: przecinek przesuwamy o $3$ miejsca w prawo.",
          uwaga: "$10^3$ to nie $10\\cdot3=30$. To jedynka i trzy zera: $1000$.",
        },
        {
          nazwa: "Notacja wykładnicza",
          slownie: "To krótki zapis bardzo dużych (albo bardzo małych) liczb: liczba od $1$ do $10$ razy potęga dziesięciu.",
          tex: "a\\cdot10^k\\qquad1\\le a<10",
          litery: "$a$ – liczba od $1$ do $10$ (może mieć przecinek), $k$ – wykładnik (liczba całkowita).",
          przyklad: "$45\\,000\\,000=4{,}5\\cdot10^7$. Przed $10^7$ stoi $4{,}5$, czyli liczba większa lub równa $1$ i mniejsza od $10$.",
          uwaga: "$45\\cdot10^6$ to ta sama liczba, ale to nie jest notacja wykładnicza, bo $45$ jest większe niż $10$. Tak samo $0{,}45\\cdot10^8$.",
        },
        {
          nazwa: "Jak zapisać liczbę w notacji",
          slownie: "Przesuwamy przecinek tak, żeby przed nim została jedna cyfra różna od zera. Liczba przesunięć to wykładnik. Odwrotnie: wykładnik mówi, o ile miejsc przesunąć przecinek w prawo i dopisać zera.",
          przyklad: "$7\\,300\\,000=7{,}3\\cdot10^6$, bo przecinek z końca liczby przesuwamy o $6$ miejsc w lewo. Odwrotnie: $6{,}2\\cdot10^5=620\\,000$, bo przecinek przesuwamy o $5$ miejsc w prawo.",
          uwaga: "Licz miejsca uważnie. Liczba $7\\,300\\,000$ ma siedem cyfr, więc wykładnik to $6$, a nie $7$.",
        },
        {
          nazwa: "Bardzo małe liczby",
          slownie: "Małe liczby zapisujemy tak samo, ale przecinek przesuwamy w prawo, a wykładnik jest ujemny. Ujemny wykładnik mówi, że liczba jest mała.",
          tex: "0{,}001=1\\cdot10^{-3}\\qquad0{,}02=2\\cdot10^{-2}",
          przyklad: "$0{,}00052=5{,}2\\cdot10^{-4}$. Przecinek przesuwamy o $4$ miejsca w prawo (za pierwszą cyfrę różną od zera), więc wykładnik to $-4$. Sprawdzenie: $5{,}2\\cdot10^{-4}=5{,}2:10\\,000=0{,}00052$.",
          uwaga: "Ujemny wykładnik nie oznacza ujemnej liczby. $3\\cdot10^{-2}=0{,}03$ jest dodatnie.",
        },
        {
          nazwa: "Porównywanie liczb",
          slownie: "Najpierw porównujemy wykładniki: większy wykładnik oznacza większą liczbę. Gdy wykładniki są takie same, porównujemy liczby przed potęgą dziesięciu.",
          przyklad: "$3{,}2\\cdot10^5>9{,}8\\cdot10^4$, bo $5>4$. Natomiast $2{,}1\\cdot10^6<4{,}5\\cdot10^6$, bo $2{,}1<4{,}5$.",
          uwaga: "Nie patrz najpierw na $9{,}8$ i $3{,}2$. Liczba $9{,}8\\cdot10^4=98\\,000$ jest mniejsza od $3{,}2\\cdot10^5=320\\,000$.",
        },
      ],
      jak: [
        "Przesuń przecinek tak, żeby przed nim została jedna cyfra różna od zera.",
        "Policz, o ile miejsc go przesunięto. To jest wykładnik (dla dużych liczb dodatni, dla małych ujemny).",
        "Zapisz $a\\cdot10^k$ i sprawdź, czy $1\\le a<10$.",
        "Przy odczytywaniu postępuj odwrotnie: przesuń przecinek o $k$ miejsc i dopisz zera.",
      ],
      zadania: [
        {
          nr: "25",
          tresc: "Liczbę $5\\,300\\,000$ zapisano w notacji wykładniczej. Który zapis jest poprawny? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5{,}3\\cdot10^{5}$", "$5{,}3\\cdot10^{6}$", "$53\\cdot10^{6}$", "$5{,}3\\cdot10^{7}$"],
          poprawna: 1,
        },
        {
          nr: "26",
          tresc: "Liczba $4{,}2\\cdot10^4$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$4\\,200$", "$420\\,000$", "$42\\,000$", "$4\\,200\\,000$"],
          poprawna: 2,
        },
        {
          nr: "27",
          tresc: "Który zapis jest zapisem w notacji wykładniczej? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}7\\cdot10^{5}$", "$3{,}6\\cdot10^{4}$", "$12\\cdot10^{3}$", "$10\\cdot10^{2}$"],
          poprawna: 1,
        },
        {
          nr: "28",
          tresc: "Odległość Ziemi od Słońca to około $150\\,000\\,000$ km. W notacji wykładniczej zapisujemy ją tak: **Wybierz właściwą odpowiedź.**",
          opcje: ["$1{,}5\\cdot10^{7}$ km", "$1{,}5\\cdot10^{9}$ km", "$1{,}5\\cdot10^{8}$ km", "$1{,}5\\cdot10^{6}$ km"],
          poprawna: 2,
        },
        {
          nr: "29",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$3\\cdot10^5>9\\cdot10^4$", litery: "PF", poprawna: 0 },
            { tekst: "$2{,}5\\cdot10^3=250$", litery: "PF", poprawna: 1 },
            { tekst: "$6{,}1\\cdot10^{-3}=0{,}061$", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "30",
          tresc: "Która z liczb jest najmniejsza? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9\\cdot10^{5}$", "$4\\cdot10^{6}$", "$8\\cdot10^{4}$", "$2{,}5\\cdot10^{6}$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "31",
          punkty: 2,
          tresc: "Zapisz w notacji wykładniczej: a) $85\\,000\\,000$, b) $12\\,400$, c) $0{,}0032$. **Zapisz obliczenia.**",
          rozwiazanie: "a) Przecinek z końca liczby przesuwamy o $7$ miejsc w lewo, aż zostanie jedna cyfra przed nim: $8{,}5$. Zatem $85\\,000\\,000=8{,}5\\cdot10^7$.\n\nb) Przesuwamy przecinek o $4$ miejsca w lewo: $1{,}24$. Zatem $12\\,400=1{,}24\\cdot10^4$.\n\nc) Przesuwamy przecinek o $3$ miejsca w prawo: $3{,}2$. Zatem $0{,}0032=3{,}2\\cdot10^{-3}$.\n\nOdpowiedź: a) $8{,}5\\cdot10^7$, b) $1{,}24\\cdot10^4$, c) $3{,}2\\cdot10^{-3}$.",
        },
        {
          nr: "32",
          punkty: 3,
          tresc: "Ustaw liczby $6{,}3\\cdot10^4$, $2{,}1\\cdot10^5$ i $9{,}9\\cdot10^3$ w kolejności od najmniejszej do największej. Zapisz każdą z nich bez potęgi. **Zapisz obliczenia.**",
          rozwiazanie: "Porównujemy wykładniki: $3<4<5$. Im większy wykładnik, tym większa liczba.\n\nZapis bez potęgi: $9{,}9\\cdot10^3=9900$, $6{,}3\\cdot10^4=63\\,000$, $2{,}1\\cdot10^5=210\\,000$.\n\nSprawdzenie: $9900<63\\,000<210\\,000$.\n\nOdpowiedź: Kolejność od najmniejszej do największej: $9{,}9\\cdot10^3$, $6{,}3\\cdot10^4$, $2{,}1\\cdot10^5$.",
        },
      ],
      generatory: [
        {
          id: "zapis-notacja",
          nazwa: "Zapis w notacji",
          opis: "Zapisz liczbę w notacji wykładniczej (podaj wykładnik albo liczbę przed potęgą) albo odczytaj liczbę z notacji.",
          generuj(r) {
            const tryb = r.int(0, 3);
            /** Cyfry liczby a: s = "45" daje a = 4,5 */
            const mantysa = () => {
              const c = r.int(1, 3);
              if (c === 1) return String(r.int(1, 9));
              return probuj(() => {
                const s = String(r.int(10 ** (c - 1), 10 ** c - 1));
                return s.endsWith("0") ? null : s;
              });
            };
            const wartoscA = (s) => q(Number(s), 10 ** (s.length - 1));
            if (tryb <= 1) {
              const s = mantysa();
              const a = wartoscA(s);
              const f = s.length - 1;
              const k = r.int(Math.max(4, f + 1), 10);
              const N = tys(s + "0".repeat(k - f));
              const pytaj = r.chance();
              return {
                tresc: `Zapisz liczbę $${N}$ w notacji wykładniczej $a\\cdot10^k$. Podaj ${pytaj ? "wykładnik $k$" : "liczbę $a$"}.`,
                pola: [pole("w", pytaj ? "Wykładnik $k=$" : "Liczba $a=$")],
                odpowiedz: { w: pytaj ? q(k) : a },
                wynik: pytaj ? `$${k}$` : `$${dz(a)}$`,
                rozwiazanie: [
                  `Przesuwamy przecinek tak, żeby przed nim została jedna cyfra różna od zera: dostajemy $${dz(a)}$.`,
                  `Przecinek przesunęliśmy o $${k}$ miejsc w lewo, więc wykładnik to $${k}$.`,
                  `Zatem $${N}=${notacja(a, k)}$.`,
                ],
              };
            }
            if (tryb === 2) {
              const [a, k] = probuj(() => {
                const s = mantysa();
                const f = s.length - 1;
                const k = r.int(Math.max(2, f), 4);
                return [wartoscA(s), k];
              });
              const w = a.mul(10 ** k);
              return {
                tresc: `Zapisz liczbę $${notacja(a, k)}$ bez potęgi (zwykłym zapisem).`,
                pola: [pole("w", "Liczba $=$")],
                odpowiedz: { w },
                wynik: `$${tys(w.n)}$`,
                rozwiazanie: [
                  `Wykładnik to $${k}$, więc przecinek przesuwamy o $${k}$ miejsca w prawo.`,
                  `Jeśli zabraknie cyfr, dopisujemy zera: $${notacja(a, k)}=${tys(w.n)}$.`,
                ],
              };
            }
            const s = mantysa();
            const a = wartoscA(s);
            const j = r.int(3, 7);
            const zapis = `0{,}${"0".repeat(j - 1)}${s}`;
            return {
              tresc: `Zapisz liczbę $${zapis}$ w notacji wykładniczej $a\\cdot10^k$. Podaj wykładnik $k$.`,
              pola: [pole("w", "Wykładnik $k=$")],
              odpowiedz: { w: q(-j) },
              wynik: `$${-j}$`,
              rozwiazanie: [
                `Przesuwamy przecinek w prawo tak, żeby przed nim została jedna cyfra różna od zera: dostajemy $${dz(a)}$.`,
                `Przecinek przesunęliśmy o $${j}$ miejsc w prawo, więc wykładnik jest ujemny: $-${j}$.`,
                `Zatem $${zapis}=${notacja(a, -j)}$.`,
              ],
            };
          },
        },
        {
          id: "ktora-wieksza",
          nazwa: "Która liczba większa",
          opis: "Porównaj dwie liczby zapisane w notacji wykładniczej i wskaż większą.",
          generuj(r) {
            return probuj(() => {
              const ujemne = r.chance(0.25);
              const a = q(r.int(10, 99), 10);
              const b = q(r.int(10, 99), 10);
              const k = ujemne ? -r.int(2, 8) : r.int(2, 9);
              const m = r.chance(0.4) ? k : ujemne ? -r.int(2, 8) : r.int(2, 9);
              if (a.eq(b) && k === m) return null;
              const A = notacja(a, k);
              const B = notacja(b, m);
              const pierwsza = k !== m ? k > m : a.cmp(b) > 0;
              const opis =
                k !== m
                  ? `Wykładniki są różne: $${k}$ i $${m}$. Większy wykładnik oznacza większą liczbę, a $${Math.max(k, m)}>${Math.min(k, m)}$.`
                  : `Wykładniki są takie same ($${k}$), więc porównujemy liczby przed potęgą: $${dz(a)}$ i $${dz(b)}$.`;
              return {
                tresc: `Która z liczb jest większa: $${A}$ czy $${B}$?`,
                pola: [{ id: "w", typ: "wybor", etykieta: "Większa liczba", opcje: [`$${A}$`, `$${B}$`] }],
                odpowiedz: { w: pierwsza ? 0 : 1 },
                wynik: `$${pierwsza ? A : B}$`,
                rozwiazanie: [opis, `Większa jest liczba $${pierwsza ? A : B}$.`],
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Obliczenia w notacji wykładniczej
    {
      id: "obliczenia-notacja",
      nazwa: "Obliczenia w notacji wykładniczej",
      sciaga: [
        {
          nazwa: "Mnożenie w notacji",
          slownie: "Mnożymy osobno liczby przed potęgami dziesięciu, a osobno potęgi dziesięciu (wykładniki dodajemy). Na koniec sprawdzamy, czy wynik jest w notacji wykładniczej.",
          tex: "(a\\cdot10^k)\\cdot(b\\cdot10^l)\\qquad=(a\\cdot b)\\cdot10^{k+l}",
          przyklad: "$(2\\cdot10^3)\\cdot(3\\cdot10^4)=(2\\cdot3)\\cdot10^{3+4}=6\\cdot10^7$.",
          uwaga: "Gdy iloczyn liczb wyjdzie $10$ albo więcej, przesuwamy przecinek: $(4\\cdot10^3)\\cdot(5\\cdot10^2)=20\\cdot10^5=2\\cdot10^6$.",
        },
        {
          nazwa: "Dzielenie w notacji",
          slownie: "Dzielimy osobno liczby przed potęgami dziesięciu, a osobno potęgi dziesięciu (wykładniki odejmujemy).",
          tex: "(a\\cdot10^k):(b\\cdot10^l)\\qquad=(a:b)\\cdot10^{k-l}",
          przyklad: "$(8\\cdot10^7):(4\\cdot10^3)=(8:4)\\cdot10^{7-3}=2\\cdot10^4$.",
          uwaga: "Gdy iloraz liczb jest mniejszy od $1$, przesuwamy przecinek w drugą stronę: $(3\\cdot10^6):(6\\cdot10^2)=0{,}5\\cdot10^4=5\\cdot10^3$.",
        },
        {
          nazwa: "Dodawanie i odejmowanie",
          slownie: "Najpierw zamieniamy liczby tak, żeby miały tę samą potęgę dziesięciu. Wtedy dodajemy (odejmujemy) tylko liczby przed potęgą, a potęgę przepisujemy.",
          tex: "a\\cdot10^k+b\\cdot10^k\\qquad=(a+b)\\cdot10^k",
          przyklad: "$3\\cdot10^5+4\\cdot10^4=30\\cdot10^4+4\\cdot10^4=34\\cdot10^4=3{,}4\\cdot10^5$.",
          uwaga: "Przy dodawaniu nie dodajemy wykładników. $3\\cdot10^5+4\\cdot10^5=7\\cdot10^5$, a nie $7\\cdot10^{10}$.",
        },
        {
          nazwa: "Zadania z kosmosu",
          slownie: "Światło biegnie z prędkością około $3\\cdot10^5$ km na sekundę. Czas liczymy, dzieląc drogę przez prędkość, i robimy to w notacji wykładniczej.",
          tex: "t=s:v",
          litery: "$t$ – czas, $s$ – droga, $v$ – prędkość.",
          przyklad: "Słońce jest od Ziemi w odległości około $1{,}5\\cdot10^8$ km. Światło biegnie więc $(1{,}5\\cdot10^8):(3\\cdot10^5)=0{,}5\\cdot10^3=500$ sekund, czyli ponad $8$ minut.",
          uwaga: "Pilnuj jednostek. Droga w kilometrach i prędkość w kilometrach na sekundę dają czas w sekundach.",
        },
      ],
      jak: [
        "Zapisz liczby w notacji $a\\cdot10^k$.",
        "Mnożenie i dzielenie: osobno liczby, osobno potęgi dziesięciu.",
        "Dodawanie i odejmowanie: najpierw doprowadź do tej samej potęgi dziesięciu.",
        "Sprawdź, czy wynik jest w notacji: liczba przed $10^k$ ma być od $1$ do $10$. Jeśli nie, przesuń przecinek i zmień wykładnik.",
      ],
      zadania: [
        {
          nr: "33",
          tresc: "Ile wynosi $(2\\cdot10^3)\\cdot(4\\cdot10^5)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8\\cdot10^{15}$", "$8\\cdot10^{8}$", "$6\\cdot10^{8}$", "$8\\cdot10^{2}$"],
          poprawna: 1,
        },
        {
          nr: "34",
          tresc: "Ile wynosi $(9\\cdot10^8):(3\\cdot10^2)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3\\cdot10^{10}$", "$6\\cdot10^{6}$", "$3\\cdot10^{4}$", "$3\\cdot10^{6}$"],
          poprawna: 3,
        },
        {
          nr: "35",
          tresc: "Ile wynosi $5\\cdot10^3+3\\cdot10^3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8\\cdot10^{3}$", "$15\\cdot10^{3}$", "$8\\cdot10^{6}$", "$53\\cdot10^{3}$"],
          poprawna: 0,
        },
        {
          nr: "36",
          tresc: "Oblicz $(4\\cdot10^5)\\cdot(5\\cdot10^2)$ i zapisz wynik w notacji wykładniczej. **Wybierz właściwą odpowiedź.**",
          opcje: ["$2\\cdot10^{7}$", "$9\\cdot10^{7}$", "$2\\cdot10^{10}$", "$2\\cdot10^{8}$"],
          poprawna: 3,
        },
        {
          nr: "37",
          tresc: "Światło w ciągu jednej sekundy pokonuje około $3\\cdot10^5$ km. Ile kilometrów pokona w ciągu $20$ sekund? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6\\cdot10^{7}$ km", "$6\\cdot10^{6}$ km", "$6\\cdot10^{5}$ km", "$2\\cdot10^{6}$ km"],
          poprawna: 1,
        },
        {
          nr: "38",
          tresc: "Księżyc jest oddalony od Ziemi o około $4\\cdot10^5$ km, a Słońce o około $1{,}5\\cdot10^8$ km. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Droga na Księżyc i z powrotem ma około $8\\cdot10^5$ km.", litery: "PF", poprawna: 0 },
            { tekst: "Słońce jest około $375$ razy dalej od Ziemi niż Księżyc.", litery: "PF", poprawna: 0 },
            { tekst: "Słońce jest około $3{,}75$ razy dalej od Ziemi niż Księżyc.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "39",
          punkty: 2,
          tresc: "Oblicz i zapisz wynik w notacji wykładniczej: a) $(6\\cdot10^4)\\cdot(5\\cdot10^3)$, b) $3\\cdot10^5+4\\cdot10^4$. **Zapisz obliczenia.**",
          rozwiazanie: "a) Mnożymy liczby i dodajemy wykładniki: $(6\\cdot10^4)\\cdot(5\\cdot10^3)=(6\\cdot5)\\cdot10^{4+3}=30\\cdot10^7$.\n\n$30$ jest większe niż $10$, więc przesuwamy przecinek: $30\\cdot10^7=3\\cdot10^8$.\n\nb) Doprowadzamy do tej samej potęgi: $3\\cdot10^5=30\\cdot10^4$.\n\nDodajemy: $30\\cdot10^4+4\\cdot10^4=34\\cdot10^4=3{,}4\\cdot10^5$.\n\nOdpowiedź: a) $3\\cdot10^8$, b) $3{,}4\\cdot10^5$.",
        },
        {
          nr: "40",
          punkty: 3,
          tresc: "Światło biegnie z prędkością około $3\\cdot10^5$ km na sekundę. Odległość Ziemi od Słońca to około $1{,}5\\cdot10^8$ km. Po ilu sekundach światło ze Słońca dociera do Ziemi? Ile to minut i sekund? **Zapisz obliczenia.**",
          rozwiazanie: "Czas to droga podzielona przez prędkość: $t=(1{,}5\\cdot10^8):(3\\cdot10^5)$.\n\nDzielimy liczby i odejmujemy wykładniki: $(1{,}5:3)\\cdot10^{8-5}=0{,}5\\cdot10^3$.\n\n$0{,}5\\cdot10^3=5\\cdot10^2=500$ sekund.\n\n$500$ s to $8\\cdot60=480$ s i jeszcze $20$ s, czyli $8$ minut i $20$ sekund.\n\nOdpowiedź: Światło ze Słońca biegnie do Ziemi około $5\\cdot10^2=500$ sekund, czyli $8$ minut i $20$ sekund.",
        },
      ],
      generatory: [
        {
          id: "mnozenie-dzielenie-notacja",
          nazwa: "Mnożenie i dzielenie",
          opis: "Pomnóż lub podziel dwie liczby w notacji wykładniczej. Wynik zapisz też w notacji: podaj liczbę przed potęgą i wykładnik.",
          generuj(r) {
            const mnoz = r.chance();
            return probuj(() => {
              const a = q(r.int(2, 9));
              let A = a;
              let B;
              let e;
              let k;
              let l;
              let v;
              if (mnoz) {
                B = r.chance() ? q(r.int(2, 9)) : q(r.int(11, 99), 10);
                k = r.int(2, 9);
                l = r.int(2, 9);
                v = a.mul(B);
                e = k + l;
              } else {
                A = r.chance() ? a : q(r.int(11, 99), 10);
                B = q(r.int(2, 9));
                k = r.int(5, 12);
                l = r.int(2, k - 3);
                v = A.div(B);
                if (![1, 2, 4, 5, 10].includes(v.d)) return null;
                e = k - l;
              }
              const n = normuj(v, e);
              const op = mnoz ? "\\cdot " : ":";
              const kroki = mnoz
                ? [
                    `Mnożymy osobno liczby: $${dz(A)}\\cdot ${dz(B)}=${dz(v)}$. Wykładniki dodajemy: $${k}+${l}=${k + l}$.`,
                    `Mamy $${dz(v)}\\cdot10^{${k + l}}$.`,
                  ]
                : [
                    `Dzielimy osobno liczby: $${dz(A)}:${dz(B)}=${dz(v)}$. Wykładniki odejmujemy: $${k}-${l}=${k - l}$.`,
                    `Mamy $${dz(v)}\\cdot10^{${k - l}}$.`,
                  ];
              if (n.e !== e) {
                kroki.push(
                  v.cmp(10) >= 0
                    ? `Liczba $${dz(v)}$ jest większa lub równa $10$, więc przesuwamy przecinek w lewo i zwiększamy wykładnik: $${dz(v)}\\cdot10^{${e}}=${notacja(n.v, n.e)}$.`
                    : `Liczba $${dz(v)}$ jest mniejsza od $1$, więc przesuwamy przecinek w prawo i zmniejszamy wykładnik: $${dz(v)}\\cdot10^{${e}}=${notacja(n.v, n.e)}$.`
                );
              }
              return {
                tresc: `Oblicz $(${notacja(A, k)})${op}(${notacja(B, l)})$. Wynik zapisz w notacji wykładniczej $a\\cdot10^k$ i podaj $a$ oraz $k$.`,
                pola: [pole("a", "Liczba $a=$"), pole("k", "Wykładnik $k=$")],
                odpowiedz: { a: n.v, k: q(n.e) },
                wynik: `$${notacja(n.v, n.e)}$`,
                rozwiazanie: kroki,
              };
            });
          },
        },
        {
          id: "dodawanie-notacja",
          nazwa: "Dodawanie i odejmowanie",
          opis: "Dodaj lub odejmij liczby w notacji wykładniczej. Najpierw doprowadź je do tej samej potęgi dziesięciu.",
          generuj(r) {
            const odejmij = r.chance(0.4);
            const rozne = r.chance();
            const znak = odejmij ? "-" : "+";
            if (!rozne) {
              return probuj(() => {
                const a = r.int(1, 9);
                const b = r.int(1, 9);
                if (odejmij && a <= b) return null;
                const k = r.int(2, 9);
                const s = odejmij ? a - b : a + b;
                const n = normuj(q(s), k);
                const kroki = [`Potęgi dziesięciu są takie same, więc ${odejmij ? "odejmujemy" : "dodajemy"} liczby przed potęgą: $${a}${znak}${b}=${s}$.`, `Mamy $${s}\\cdot10^{${k}}$.`];
                if (n.e !== k) kroki.push(`$${s}\\cdot10^{${k}}=${notacja(n.v, n.e)}$, bo przed potęgą ma stać liczba od $1$ do $10$.`);
                return {
                  tresc: `Oblicz $${a}\\cdot10^{${k}}${znak}${b}\\cdot10^{${k}}$. Wynik zapisz w notacji wykładniczej $a\\cdot10^k$ i podaj $a$ oraz $k$.`,
                  pola: [pole("a", "Liczba $a=$"), pole("k", "Wykładnik $k=$")],
                  odpowiedz: { a: n.v, k: q(n.e) },
                  wynik: `$${notacja(n.v, n.e)}$`,
                  rozwiazanie: kroki,
                };
              });
            }
            const a = r.int(2, 9);
            const b = r.int(1, 9);
            const k = r.int(3, 9);
            const X = odejmij ? 10 * a - b : 10 * a + b;
            const n = normuj(q(X), k - 1);
            return {
              tresc: `Oblicz $${a}\\cdot10^{${k}}${znak}${b}\\cdot10^{${k - 1}}$. Wynik zapisz w notacji wykładniczej $a\\cdot10^k$ i podaj $a$ oraz $k$.`,
              pola: [pole("a", "Liczba $a=$"), pole("k", "Wykładnik $k=$")],
              odpowiedz: { a: n.v, k: q(n.e) },
              wynik: `$${notacja(n.v, n.e)}$`,
              rozwiazanie: [
                `Doprowadzamy do tej samej potęgi dziesięciu: $${a}\\cdot10^{${k}}=${10 * a}\\cdot10^{${k - 1}}$.`,
                `${odejmij ? "Odejmujemy" : "Dodajemy"} liczby przed potęgą: $${10 * a}${znak}${b}=${X}$, więc wynik to $${X}\\cdot10^{${k - 1}}$.`,
                `Przed potęgą ma stać liczba od $1$ do $10$: $${X}\\cdot10^{${k - 1}}=${notacja(n.v, n.e)}$.`,
              ],
            };
          },
        },
        {
          id: "czas-swiatla",
          nazwa: "Czas światła",
          opis: "Światło biegnie z prędkością 3·10^5 km/s. Oblicz, ile sekund biegnie na daną odległość zapisaną w notacji wykładniczej.",
          generuj(r) {
            const m = r.pick([4, 5, 7, 8, 10, 12, 15, 18, 20, 24, 25, 30]);
            const a = q(3 * m, 10);
            const k = r.int(7, 9);
            const iloraz = a.div(3);
            const t = m * 10 ** (k - 6);
            const co = r.pick([
              "Sonda kosmiczna jest od Ziemi w odległości",
              "Pewna planeta jest od Słońca w odległości",
              "Satelita jest od stacji naziemnej w odległości",
            ]);
            return {
              tresc: `Światło biegnie z prędkością około $3\\cdot10^5$ km na sekundę. ${co} $${notacja(a, k)}$ km. Po ilu sekundach sygnał świetlny pokona tę odległość?`,
              pola: [pole("t", "Czas (w sekundach) $=$")],
              odpowiedz: { t: q(t) },
              wynik: `$${tys(t)}$ s`,
              rozwiazanie: [
                `Czas to droga podzielona przez prędkość: $(${notacja(a, k)}):(3\\cdot10^{5})$.`,
                `Dzielimy liczby, $${dz(a)}:3=${dz(iloraz)}$, i odejmujemy wykładniki, $${k}-5=${k - 5}$.`,
                `Mamy $${dz(iloraz)}\\cdot10^{${k - 5}}=${tys(t)}$ s.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
