// Klasa 5 (szkoła podstawowa) · rozdział VII „Figury przestrzenne” – Matematyka z kluczem 5 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";   // tylko pomocnicze z wspolne.js

// --- Pomocnicze (tylko dla tego pliku)

/** Liczba całkowita w LaTeX: odstęp tysięcy dopiero od 5 cyfr (12\,500). */
const lcz = (n) => (Math.abs(n) >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : String(n));

/** Liczba (całkowita albo ułamek dziesiętny zapisany jako Q) w LaTeX z przecinkiem: 7/2 -> "3{,}5". */
function dz(v) {
  const x = Q.z(v);
  for (let k = 0; k <= 4; k++) {
    const m = x.n * 10 ** k;
    if (m % x.d === 0) {
      const c = m / x.d;
      if (k === 0) return lcz(c);
      const s = String(Math.abs(c)).padStart(k + 1, "0");
      return `${c < 0 ? "-" : ""}${lcz(Number(s.slice(0, -k)))}{,}${s.slice(-k)}`;
    }
  }
  throw new Error(`Nie da się zapisać dziesiętnie: ${x}`);
}

/** Poprawna forma rzeczownika po liczbie: odm(2, "ściana", "ściany", "ścian") -> "2 ściany". */
const odm = (n, a, b, c) => {
  const m10 = n % 10, m100 = n % 100;
  if (n === 1) return `${n} ${a}`;
  if (m10 >= 2 && m10 <= 4 && !(m100 >= 12 && m100 <= 14)) return `${n} ${b}`;
  return `${n} ${c}`;
};

/** Objętość z jednostką jako osobny wzór: obj(24, "cm") -> "$24\ \text{cm}^3$". */
const obj = (x, j) => `$${x}\\ \\text{${j}}^3$`;

/** Działanie z wynikiem i jednostką objętości: rown("5 \\cdot 4 \\cdot 3", 60, "cm") -> "$5 \cdot 4 \cdot 3 = 60\ \text{cm}^3$". */
const rown = (wyr, x, j) => `$${wyr} = ${x}\\ \\text{${j}}^3$`;

/** Podpis pola odpowiedzi: "Objętość (w $\text{cm}^3$) $=$". */
const et = (j) => `Objętość (w $\\text{${j}}^3$) $=$`;

/** Jednostki długości w dopełniaczu liczby mnogiej. */
const DL = { cm: "centymetrów", dm: "decymetrów", m: "metrów" };

/** Nazwy graniastosłupów i ostrosłupów od liczby boków podstawy. */
const NK = { 3: "trójkątny", 4: "czworokątny", 5: "pięciokątny", 6: "sześciokątny", 7: "siedmiokątny", 8: "ośmiokątny", 9: "dziewięciokątny", 10: "dziesięciokątny" };
/** Ta sama nazwa w dopełniaczu: "pięciokątny" -> "pięciokątnego" (graniastosłupa pięciokątnego). */
const NKD = (n) => NK[n].replace(/ny$/, "nego");
/** Nazwy wielokątów (mianownik). */
const WK = { 5: "pięciokąt", 6: "sześciokąt", 7: "siedmiokąt", 8: "ośmiokąt" };

// --- Zadania, ściągi i generatory

export default {
  tematy: [
    // ------------------------------------------------------------------ 1
    {
      id: "bryly",
      nazwa: "Bryły",
      sciaga: [
        {
          nazwa: "Rodzaje brył",
          slownie: "Bryła to figura przestrzenna. Wielościany mają same płaskie ściany: to prostopadłościan, sześcian, graniastosłup i ostrosłup. Walec, stożek i kula mają powierzchnię zakrzywioną.",
          przyklad: "Pudełko po butach to prostopadłościan, puszka to walec, piłka to kula, rożek na lody to stożek, a dach w kształcie piramidy to ostrosłup.",
          uwaga: "Walec, stożek i kula nie są wielościanami, bo nie mają samych płaskich ścian.",
        },
        {
          nazwa: "Ściany, krawędzie, wierzchołki",
          slownie: "Ściana to płaska część powierzchni bryły. Krawędź to odcinek, w którym spotykają się dwie ściany. Wierzchołek to punkt, w którym spotykają się krawędzie.",
          przyklad: "Kostka do gry (sześcian) ma $6$ ścian, $12$ krawędzi i $8$ wierzchołków.",
          uwaga: "Krawędź jest odcinkiem, a wierzchołek punktem. Nie myl ich przy liczeniu.",
        },
        {
          nazwa: "Prostopadłościan i sześcian",
          slownie: "Prostopadłościan ma $6$ ścian (prostokątów), $12$ krawędzi i $8$ wierzchołków. Ściany leżące naprzeciw siebie są takie same. Krawędzi są trzy grupy po $4$ równe. Sześcian ma wszystkie krawędzie równe, więc wszystkie ściany są kwadratami.",
          tex: "4\\cdot(a+b+c)\\qquad 12\\cdot a",
          litery: "$a$, $b$, $c$ – wymiary prostopadłościanu. Drugi wzór: $a$ – krawędź sześcianu. Oba wzory dają sumę długości wszystkich krawędzi.",
          przyklad: "Prostopadłościan $5$ cm, $3$ cm i $2$ cm: $4 \\cdot (5+3+2) = 4 \\cdot 10 = 40$ cm. Sześcian o krawędzi $3$ cm: $12 \\cdot 3 = 36$ cm.",
          uwaga: "Nie mnóż przez $6$ (tyle jest ścian). Krawędzi jest $12$.",
        },
        {
          nazwa: "Graniastosłup",
          slownie: "Graniastosłup ma dwie takie same podstawy (wielokąty) leżące naprzeciw siebie. Ściany boczne są prostokątami. Nazwa zależy od podstawy, np. graniastosłup trójkątny. Ścian jest o $2$ więcej niż boków podstawy, krawędzi $3$ razy tyle, a wierzchołków $2$ razy tyle.",
          przyklad: "Graniastosłup pięciokątny: ścian $5 + 2 = 7$, krawędzi $3 \\cdot 5 = 15$, wierzchołków $2 \\cdot 5 = 10$.",
          uwaga: "Do ścian doliczaj obie podstawy, nie tylko ściany boczne. Prostopadłościan to graniastosłup czworokątny.",
        },
        {
          nazwa: "Ostrosłup",
          slownie: "Ostrosłup ma jedną podstawę (wielokąt). Ściany boczne są trójkątami i spotykają się w jednym wierzchołku na górze. Ścian jest o $1$ więcej niż boków podstawy, krawędzi $2$ razy tyle, a wierzchołków o $1$ więcej.",
          przyklad: "Ostrosłup czworokątny (jak piramida): ścian $4 + 1 = 5$, krawędzi $2 \\cdot 4 = 8$, wierzchołków $4 + 1 = 5$.",
          uwaga: "Ostrosłup ma jedną podstawę, a graniastosłup dwie.",
        },
      ],
      jak: [
        "Ustal, jaka to bryła: ile ma podstaw i jakie są ściany boczne (prostokąty – graniastosłup, trójkąty – ostrosłup).",
        "Policz, ile boków ma podstawa.",
        "Graniastosłup: ścian o $2$ więcej, krawędzi $3$ razy tyle, wierzchołków $2$ razy tyle. Ostrosłup: ścian o $1$ więcej, krawędzi $2$ razy tyle, wierzchołków o $1$ więcej.",
        "Sumę długości krawędzi policz, grupując krawędzie według długości, i dodaj grupy.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Która z brył nie jest wielościanem, czyli nie ma samych płaskich ścian? **Wybierz właściwą odpowiedź.**",
          opcje: ["sześcian", "ostrosłup czworokątny", "walec", "graniastosłup trójkątny"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Ile wierzchołków ma prostopadłościan? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$8$", "$12$", "$4$"],
          poprawna: 1,
        },
        {
          nr: "3",
          tresc: "Podstawą graniastosłupa jest sześciokąt. Ile ścian ma ten graniastosłup (razem z podstawami)? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$12$", "$18$", "$8$"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "Rozważ trzy zdania o bryłach. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Graniastosłup trójkątny ma $9$ krawędzi.", litery: "PF", poprawna: 0 },
            { tekst: "Ostrosłup czworokątny ma $5$ wierzchołków.", litery: "PF", poprawna: 0 },
            { tekst: "Ściany boczne graniastosłupa mają kształt trójkątów.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "5",
          tresc: "Sześcian ma krawędź długości $5$ cm. Jaka jest suma długości wszystkich jego krawędzi? **Wybierz właściwą odpowiedź.**",
          opcje: ["$60$ cm", "$30$ cm", "$20$ cm", "$25$ cm"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Z drutu zrobiono szkielet pudełka w kształcie prostopadłościanu o wymiarach $30$ cm, $20$ cm i $10$ cm. Ile metrów drutu zużyto? (Drutu na łączenia nie liczymy.) **Zapisz obliczenia.**",
          rozwiazanie: "Prostopadłościan ma $12$ krawędzi: cztery o długości $30$ cm, cztery o długości $20$ cm i cztery o długości $10$ cm.\n\nSuma długości krawędzi: $4 \\cdot 30 + 4 \\cdot 20 + 4 \\cdot 10 = 120 + 80 + 40 = 240$ cm.\n\nTo samo wychodzi ze wzoru: $4 \\cdot (30 + 20 + 10) = 4 \\cdot 60 = 240$ cm.\n\nZamieniamy na metry: $240$ cm $= 2{,}4$ m.\n\nOdpowiedź: zużyto $2{,}4$ m drutu.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Podstawą graniastosłupa jest siedmiokąt. Ile ten graniastosłup ma ścian, krawędzi i wierzchołków? Czy może istnieć graniastosłup, który ma $15$ wierzchołków? **Zapisz obliczenia.**",
          rozwiazanie: "Siedmiokąt ma $7$ boków.\n\nŚciany: $2$ podstawy i $7$ ścian bocznych, czyli $2 + 7 = 9$.\n\nKrawędzie: po $7$ w każdej z dwóch podstaw i $7$ bocznych, czyli $2 \\cdot 7 + 7 = 21$.\n\nWierzchołki: po $7$ w każdej z dwóch podstaw, czyli $2 \\cdot 7 = 14$.\n\nW graniastosłupie są dwie takie same podstawy, więc liczba wierzchołków jest zawsze parzysta. Liczba $15$ jest nieparzysta, więc taki graniastosłup nie istnieje.\n\nOdpowiedź: graniastosłup ma $9$ ścian, $21$ krawędzi i $14$ wierzchołków. Graniastosłup z $15$ wierzchołkami nie istnieje.",
        },
      ],
      generatory: [
        {
          id: "bryla-elementy",
          nazwa: "Ściany i krawędzie",
          opis: "Policz ściany, krawędzie albo wierzchołki graniastosłupa lub ostrosłupa o danej podstawie.",
          generuj(r) {
            const n = r.int(3, 9);
            const gran = r.chance();
            const co = r.int(0, 2);
            const dane = gran ? [n + 2, 3 * n, 2 * n] : [n + 1, 2 * n, n + 1];
            const w = dane[co];
            const pyt = ["ścian", "krawędzi", "wierzchołków"][co];
            const nazwa = `${gran ? "graniastosłup" : "ostrosłup"} ${NK[n]}`;
            const pod = gran ? "razem z podstawami" : "razem z podstawą";
            const tresc = r.chance()
              ? `Ile ${pyt} ma ${nazwa}${co === 0 ? ` (${pod})` : ""}?`
              : `Podstawą ${gran ? "graniastosłupa" : "ostrosłupa"} jest wielokąt o $${n}$ bokach. Ile ${pyt} ma ta bryła${co === 0 ? ` (${pod})` : ""}?`;
            const roz = gran
              ? [
                  [`Graniastosłup ma $2$ podstawy i tyle ścian bocznych, ile boków ma podstawa.`, `$2 + ${n} = ${w}$.`],
                  [`Każda z $2$ podstaw ma $${n}$ krawędzi, a krawędzi bocznych jest tyle, ile boków podstawy.`, `$2 \\cdot ${n} + ${n} = ${w}$.`],
                  [`Każda z $2$ podstaw ma tyle wierzchołków, ile boków.`, `$2 \\cdot ${n} = ${w}$.`],
                ]
              : [
                  [`Ostrosłup ma $1$ podstawę i tyle ścian bocznych, ile boków ma podstawa.`, `$1 + ${n} = ${w}$.`],
                  [`Podstawa ma $${n}$ krawędzi, a krawędzi bocznych jest tyle, ile boków podstawy.`, `$${n} + ${n} = ${w}$.`],
                  [`Podstawa ma $${n}$ wierzchołków i jest jeszcze jeden wierzchołek na górze.`, `$${n} + 1 = ${w}$.`],
                ];
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: `Liczba ${pyt} $=$` }],
              odpowiedz: { w },
              wynik: `$${w}$`,
              rozwiazanie: roz[co],
            };
          },
        },
        {
          id: "szkielet-krawedzi",
          nazwa: "Suma krawędzi",
          opis: "Oblicz sumę długości wszystkich krawędzi prostopadłościanu lub sześcianu albo długość jednej krawędzi sześcianu.",
          generuj(r) {
            const u = r.pick(["cm", "dm"]);
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const a = r.int(2, 12);
              const b = r.intBez(2, 12, a);
              const c = r.intBez(2, 12, a, b);
              const s = a + b + c;
              return {
                tresc: `Z drutu zrobiono szkielet prostopadłościanu o wymiarach $${a}$ ${u}, $${b}$ ${u} i $${c}$ ${u}. Ile ${DL[u]} drutu zużyto?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Długość drutu (w ${u}) $=$` }],
                odpowiedz: { w: 4 * s },
                wynik: `$${4 * s}$ ${u}`,
                rozwiazanie: [
                  "Prostopadłościan ma $12$ krawędzi: po cztery o każdym z trzech wymiarów.",
                  `Suma wymiarów: $${a} + ${b} + ${c} = ${s}$.`,
                  `Razem: $4 \\cdot ${s} = ${4 * s}$ ${u}.`,
                ],
              };
            }
            if (tryb === 1) {
              const a = r.int(2, 12);
              return {
                tresc: `Szkielet sześcianu zrobiono z listewek. Krawędź sześcianu ma $${a}$ ${u}. Ile ${DL[u]} listewek potrzeba?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Długość listewek (w ${u}) $=$` }],
                odpowiedz: { w: 12 * a },
                wynik: `$${12 * a}$ ${u}`,
                rozwiazanie: [
                  "Sześcian ma $12$ krawędzi i wszystkie są równe.",
                  `$12 \\cdot ${a} = ${12 * a}$ ${u}.`,
                ],
              };
            }
            const a = r.int(2, 12);
            return {
              tresc: `Z drutu o długości $${12 * a}$ ${u} zrobiono szkielet sześcianu (zużyto cały drut). Ile ${DL[u]} ma krawędź tego sześcianu?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `Krawędź (w ${u}) $=$` }],
              odpowiedz: { w: a },
              wynik: `$${a}$ ${u}`,
              rozwiazanie: [
                "Sześcian ma $12$ równych krawędzi, więc długość drutu dzielimy na $12$ części.",
                `$${12 * a} : 12 = ${a}$ ${u}.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 2
    {
      id: "objetosc-pojemnosc",
      nazwa: "Objętość i pojemność",
      sciaga: [
        {
          nazwa: "Co to jest objętość",
          slownie: "Objętość mówi, ile miejsca zajmuje bryła. Sprawdzamy, ile sześcianików jednostkowych się w niej mieści. Sześcianik o krawędzi $1$ cm ma objętość $1$ cm$^3$.",
          przyklad: "Prostopadłościan złożony z $12$ klocków (każdy to sześcian o krawędzi $1$ cm) ma objętość $12$ cm$^3$.",
          uwaga: "Objętość zapisujemy w jednostkach sześciennych (cm$^3$), a pole w kwadratowych (cm$^2$).",
        },
        {
          nazwa: "Bryła z klocków",
          slownie: "Policz klocki w jednej warstwie: rzędy razy klocki w rzędzie. Potem pomnóż przez liczbę warstw.",
          przyklad: "W warstwie są $3$ rzędy po $4$ klocki: $3 \\cdot 4 = 12$. Warstwy są $2$: $12 \\cdot 2 = 24$ klocki.",
          uwaga: "Nie dodawaj liczby rzędów, klocków i warstw. Je się mnoży.",
        },
        {
          nazwa: "Jednostki objętości",
          slownie: "Sześcian o krawędzi $1$ dm ma objętość $1$ dm$^3$. Mieści się w nim $10 \\cdot 10 \\cdot 10 = 1000$ sześcianików o krawędzi $1$ cm.",
          tex: "1\\ \\text{dm}^3=1000\\ \\text{cm}^3",
          przyklad: "$3$ dm$^3$ to $3 \\cdot 1000 = 3000$ cm$^3$. A $2500$ cm$^3$ to $2500 : 1000 = 2{,}5$ dm$^3$.",
          uwaga: "W $1$ dm$^3$ mieści się $1000$ cm$^3$, a nie $10$ ani $100$.",
        },
        {
          nazwa: "Pojemność i litr",
          slownie: "Pojemność mówi, ile płynu mieści się w naczyniu. Mierzymy ją w litrach (l) i mililitrach (ml). Litr to to samo co decymetr sześcienny, a mililitr to centymetr sześcienny.",
          tex: "1\\ \\text{l}=1\\ \\text{dm}^3\\qquad 1\\ \\text{ml}=1\\ \\text{cm}^3\\qquad 1\\ \\text{l}=1000\\ \\text{ml}",
          przyklad: "Akwarium o pojemności $40$ l mieści $40$ dm$^3$ wody. Szklanka $250$ ml to $250$ cm$^3$.",
          uwaga: "Litry zamieniamy na mililitry, mnożąc przez $1000$: $2$ l to $2000$ ml, a nie $200$ ml.",
        },
        {
          nazwa: "Ta sama objętość, inny kształt",
          slownie: "Gdy z tych samych klocków zbudujemy inną bryłę, objętość się nie zmieni. Gdy klocki wyjmiemy, objętość maleje o tyle, ile klocków wyjęto.",
          przyklad: "Z $24$ klocków można ułożyć prostopadłościan $4 \\cdot 3 \\cdot 2$ albo $6 \\cdot 4 \\cdot 1$. Obie bryły mają objętość $24$ cm$^3$.",
          uwaga: "Taka sama objętość nie oznacza takiego samego kształtu.",
        },
      ],
      jak: [
        "Sprawdź jednostki w zadaniu: klocki, cm$^3$, dm$^3$, litry czy mililitry.",
        "Bryłę z klocków licz warstwami: klocki w jednej warstwie razy liczba warstw.",
        "Zamieniaj: $1$ dm$^3$ $= 1000$ cm$^3$, $1$ l $= 1$ dm$^3$, $1$ l $= 1000$ ml. Na mniejszą jednostkę mnożysz, na większą dzielisz.",
        "Dopisz do wyniku jednostkę.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Z jednakowych sześciennych klocków zbudowano prostopadłościan. W każdej warstwie są $2$ rzędy po $5$ klocków, a warstw jest $3$. Ile klocków użyto? **Wybierz właściwą odpowiedź.**",
          opcje: ["$30$", "$10$", "$15$", "$6$"],
          poprawna: 0,
        },
        {
          nr: "9",
          tresc: "Ile sześcianików o krawędzi $1$ cm zmieści się w sześcianie o krawędzi $1$ dm? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10$", "$100$", "$1000$", "$10\\,000$"],
          poprawna: 2,
        },
        {
          nr: "10",
          tresc: "Akwarium ma pojemność $40$ l. Ile decymetrów sześciennych wody się w nim zmieści? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4\\ \\text{dm}^3$", "$400\\ \\text{dm}^3$", "$40\\ \\text{cm}^3$", "$40\\ \\text{dm}^3$"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "Rozważ trzy zdania o objętości. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Objętość mierzymy w centymetrach kwadratowych.", litery: "PF", poprawna: 1 },
            { tekst: "Sześcian o krawędzi $1$ cm ma objętość $1$ cm$^3$.", litery: "PF", poprawna: 0 },
            { tekst: "W butelce o pojemności $1$ l mieści się $1000$ ml wody.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "12",
          tresc: "Która z ilości płynu jest największa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$ l", "$2100$ cm$^3$", "$1800$ ml", "$1$ dm$^3$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "W kanistrze jest $5$ l soku. Sok rozlewamy do szklanek o pojemności $250$ ml. Ile szklanek można w ten sposób napełnić? **Zapisz obliczenia.**",
          rozwiazanie: "Zamieniamy litry na mililitry: $5$ l $= 5 \\cdot 1000 = 5000$ ml.\n\nLiczba szklanek: $5000 : 250 = 20$.\n\nSprawdzenie: cztery szklanki po $250$ ml to $1000$ ml, czyli $1$ l, więc w $5$ l jest $5 \\cdot 4 = 20$ szklanek.\n\nOdpowiedź: można napełnić $20$ szklanek.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Prostopadłościan zbudowano z klocków, z których każdy jest sześcianem o krawędzi $1$ cm. W jednej warstwie są $4$ rzędy po $6$ klocków, a warstw jest $3$. Z tego prostopadłościanu wyjęto $10$ klocków. Jaką objętość ma bryła po wyjęciu klocków? **Zapisz obliczenia.**",
          rozwiazanie: "Klocki w jednej warstwie: $4 \\cdot 6 = 24$.\n\nWszystkie klocki: $24 \\cdot 3 = 72$, więc objętość prostopadłościanu to $72$ cm$^3$.\n\nPo wyjęciu $10$ klocków zostało $72 - 10 = 62$ klocki, więc objętość bryły to $62$ cm$^3$.\n\nOdpowiedź: bryła ma objętość $62$ cm$^3$.",
        },
      ],
      generatory: [
        {
          id: "klocki-warstwy",
          nazwa: "Klocki w warstwach",
          opis: "Bryła z klocków ułożonych w warstwy: oblicz liczbę klocków, objętość albo liczbę warstw.",
          generuj(r) {
            const R = r.int(2, 6), K = r.int(2, 7), W = r.int(2, 6);
            const T = R * K * W;
            const tryb = r.int(0, 2);
            const warstwa = `W każdej warstwie ułożono ${odm(R, "rząd", "rzędy", "rzędów")} po ${odm(K, "klocek", "klocki", "klocków")}.`;
            const maWarstw = `Ma on ${odm(W, "warstwa", "warstwy", "warstw")}.`;
            if (tryb === 0) {
              return {
                tresc: `Prostopadłościan zbudowano z jednakowych klocków-sześcianów. ${maWarstw} ${warstwa} Ile klocków użyto?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba klocków $=$" }],
                odpowiedz: { w: T },
                wynik: `$${T}$`,
                rozwiazanie: [
                  `Klocki w jednej warstwie: $${R} \\cdot ${K} = ${R * K}$.`,
                  `Klocki we wszystkich warstwach: $${R * K} \\cdot ${W} = ${T}$.`,
                ],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Prostopadłościan złożono z klocków-sześcianów o krawędzi $1$ cm. ${maWarstw} ${warstwa} Jaka jest objętość tego prostopadłościanu?`,
                pola: [{ id: "w", typ: "liczba", etykieta: et("cm") }],
                odpowiedz: { w: T },
                wynik: obj(T, "cm"),
                rozwiazanie: [
                  `Klocki w jednej warstwie: $${R} \\cdot ${K} = ${R * K}$.`,
                  `Wszystkich klocków jest $${R * K} \\cdot ${W} = ${T}$.`,
                  `Każdy klocek ma objętość $1$ cm$^3$, więc objętość to ${obj(T, "cm")}.`,
                ],
              };
            }
            return {
              tresc: `Z ${T} jednakowych klocków-sześcianów zbudowano prostopadłościan. ${warstwa} Ile warstw ma ten prostopadłościan?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba warstw $=$" }],
              odpowiedz: { w: W },
              wynik: `$${W}$`,
              rozwiazanie: [
                `Klocki w jednej warstwie: $${R} \\cdot ${K} = ${R * K}$.`,
                `Liczba warstw to wszystkie klocki podzielone przez klocki w warstwie: $${T} : ${R * K} = ${W}$.`,
              ],
            };
          },
        },
        {
          id: "jednostki-pojemnosci",
          nazwa: "Litry i decymetry",
          opis: "Zamień jednostki: litry na mililitry, decymetry sześcienne na centymetry sześcienne i odwrotnie.",
          generuj(r) {
            const tryb = r.int(0, 4);
            const pyt = r.chance();
            if (tryb === 0) {
              const x = r.int(2, 9);
              return {
                tresc: pyt ? `Zamień $${x}$ l na mililitry.` : `Ile mililitrów to $${x}$ l?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Pojemność (w ml) $=$" }],
                odpowiedz: { w: x * 1000 },
                wynik: `$${x * 1000}$ ml`,
                rozwiazanie: [
                  "Litr to $1000$ ml, więc zamieniając litry na mililitry, mnożymy przez $1000$.",
                  `$${x} \\cdot 1000 = ${x * 1000}$ ml.`,
                ],
              };
            }
            if (tryb === 1) {
              const v = 250 * r.int(1, 19);
              const w = q(v, 1000);
              return {
                tresc: pyt ? `Zamień $${v}$ ml na litry.` : `Ile litrów to $${v}$ ml?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Pojemność (w l) $=$" }],
                odpowiedz: { w },
                wynik: `$${dz(w)}$ l`,
                rozwiazanie: [
                  "Litr to $1000$ ml, więc zamieniając mililitry na litry, dzielimy przez $1000$.",
                  `$${v} : 1000 = ${dz(w)}$ l.`,
                ],
              };
            }
            if (tryb === 2) {
              const x = r.int(2, 9);
              return {
                tresc: pyt ? `Zamień ${obj(x, "dm")} na centymetry sześcienne.` : `Ile centymetrów sześciennych to ${obj(x, "dm")}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: et("cm") }],
                odpowiedz: { w: x * 1000 },
                wynik: obj(x * 1000, "cm"),
                rozwiazanie: [
                  "W $1$ dm$^3$ mieści się $1000$ cm$^3$, więc mnożymy przez $1000$.",
                  `${rown(`${x} \\cdot 1000`, x * 1000, "cm")}.`,
                ],
              };
            }
            if (tryb === 3) {
              const v = 500 * r.int(1, 19);
              const w = q(v, 1000);
              return {
                tresc: pyt ? `Zamień ${obj(v, "cm")} na decymetry sześcienne.` : `Ile decymetrów sześciennych to ${obj(v, "cm")}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: et("dm") }],
                odpowiedz: { w },
                wynik: obj(dz(w), "dm"),
                rozwiazanie: [
                  "W $1$ dm$^3$ mieści się $1000$ cm$^3$, więc dzielimy przez $1000$.",
                  `${rown(`${v} : 1000`, dz(w), "dm")}.`,
                ],
              };
            }
            const x = r.int(10, 90);
            if (pyt) {
              return {
                tresc: `Akwarium ma pojemność $${x}$ l. Ile decymetrów sześciennych wody się w nim zmieści?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Objętość wody (w $\\text{dm}^3$) $=$" }],
                odpowiedz: { w: x },
                wynik: obj(x, "dm"),
                rozwiazanie: [
                  "Litr to to samo co decymetr sześcienny: $1$ l $= 1$ dm$^3$.",
                  `Zatem $${x}$ l to ${obj(x, "dm")}.`,
                ],
              };
            }
            return {
              tresc: `Zbiornik ma objętość ${obj(x, "dm")}. Ile litrów wody się w nim zmieści?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Pojemność (w l) $=$" }],
              odpowiedz: { w: x },
              wynik: `$${x}$ l`,
              rozwiazanie: [
                "Litr to to samo co decymetr sześcienny: $1$ l $= 1$ dm$^3$.",
                `Zatem ${obj(x, "dm")} to $${x}$ l.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3
    {
      id: "objetosc-prostopadloscianu",
      nazwa: "Objętość prostopadłościanu",
      sciaga: [
        {
          nazwa: "Objętość prostopadłościanu",
          slownie: "Mnożymy trzy wymiary: długość, szerokość i wysokość. Wszystkie wymiary muszą być w tej samej jednostce.",
          tex: "V=a\\cdot b\\cdot c",
          litery: "$a$, $b$, $c$ – wymiary prostopadłościanu.",
          przyklad: "Wymiary $5$ cm, $4$ cm i $3$ cm: $V = 5 \\cdot 4 \\cdot 3 = 60$ cm$^3$.",
          uwaga: "Nie dodawaj wymiarów i nie mnóż tylko dwóch z nich. Wynik zapisz w cm$^3$, czyli w jednostkach sześciennych.",
        },
        {
          nazwa: "Objętość sześcianu",
          slownie: "Sześcian ma trzy równe wymiary, więc mnożymy krawędź przez siebie trzy razy.",
          tex: "V=a\\cdot a\\cdot a=a^3",
          litery: "$a$ – długość krawędzi sześcianu.",
          przyklad: "Krawędź $4$ cm: $V = 4 \\cdot 4 \\cdot 4 = 64$ cm$^3$.",
          uwaga: "$a^3$ to nie $3 \\cdot a$. Dla $a = 4$ jest $4^3 = 64$, a $3 \\cdot 4 = 12$.",
        },
        {
          nazwa: "Pole podstawy razy wysokość",
          slownie: "Najpierw liczymy pole podstawy, potem mnożymy je przez wysokość. Pole podstawy to liczba klocków w jednej warstwie, a wysokość to liczba warstw.",
          tex: "V=P_p\\cdot H",
          litery: "$P_p$ – pole podstawy, $H$ – wysokość prostopadłościanu.",
          przyklad: "Podstawa $6$ cm na $5$ cm, wysokość $4$ cm: $P_p = 6 \\cdot 5 = 30$ cm$^2$, a $V = 30 \\cdot 4 = 120$ cm$^3$.",
          uwaga: "Wysokość to krawędź prostopadła do podstawy, a nie krawędź leżąca w podstawie.",
        },
        {
          nazwa: "Brakujący wymiar",
          slownie: "Gdy znamy objętość i dwa wymiary, dzielimy objętość przez iloczyn tych dwóch wymiarów.",
          tex: "c=\\dfrac{V}{a\\cdot b}",
          litery: "$V$ – objętość, $a$, $b$ – znane wymiary, $c$ – szukany wymiar.",
          przyklad: "$V = 60$ cm$^3$, $a = 5$ cm, $b = 4$ cm: $5 \\cdot 4 = 20$, a $c = 60 : 20 = 3$ cm.",
          uwaga: "Objętość to iloczyn wymiarów, więc szukany wymiar dostajemy przez dzielenie, a nie odejmowanie.",
        },
        {
          nazwa: "Ile litrów się zmieści",
          slownie: "Pojemność naczynia w kształcie prostopadłościanu to jego objętość. Gdy wymiary są w decymetrach, objętość w dm$^3$ to od razu litry.",
          przyklad: "Akwarium $5$ dm, $3$ dm i $4$ dm: $5 \\cdot 3 \\cdot 4 = 60$ dm$^3$, czyli $60$ l. Wymiary podane w cm zamień najpierw na dm: $10$ cm to $1$ dm.",
          uwaga: "Wynik w cm$^3$ to jeszcze nie litry: $60\\,000$ cm$^3$ to $60$ l.",
        },
      ],
      jak: [
        "Zapisz wszystkie wymiary w tej samej jednostce.",
        "Pomnóż trzy wymiary (w sześcianie: krawędź trzy razy).",
        "Szukasz wymiaru? Podziel objętość przez iloczyn dwóch pozostałych wymiarów.",
        "Dopisz jednostkę sześcienną. Jeśli pytają o litry, licz w dm$^3$.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Prostopadłościan ma wymiary $6$ cm, $5$ cm i $4$ cm. Jaka jest jego objętość? **Wybierz właściwą odpowiedź.**",
          opcje: ["$30\\ \\text{cm}^3$", "$120\\ \\text{cm}^3$", "$15\\ \\text{cm}^3$", "$24\\ \\text{cm}^3$"],
          poprawna: 1,
        },
        {
          nr: "16",
          tresc: "Krawędź sześcianu ma długość $3$ cm. Jaka jest objętość tego sześcianu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9\\ \\text{cm}^3$", "$12\\ \\text{cm}^3$", "$81\\ \\text{cm}^3$", "$27\\ \\text{cm}^3$"],
          poprawna: 3,
        },
        {
          nr: "17",
          tresc: "Objętość prostopadłościanu wynosi $90$ cm$^3$, a jego podstawa jest prostokątem o bokach $6$ cm i $5$ cm. Ile centymetrów ma wysokość tego prostopadłościanu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$ cm", "$15$ cm", "$60$ cm", "$540$ cm"],
          poprawna: 0,
        },
        {
          nr: "18",
          tresc: "Akwarium ma wymiary $5$ dm, $4$ dm i $3$ dm. Ile litrów wody mieści się w nim po brzegi? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$ l", "$20$ l", "$60$ l", "$600$ l"],
          poprawna: 2,
        },
        {
          nr: "19",
          tresc: "Pudełko ma kształt sześcianu o krawędzi $10$ cm. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Objętość pudełka wynosi $1000$ cm$^3$.", litery: "PF", poprawna: 0 },
            { tekst: "W pudełku mieści się $1$ l wody.", litery: "PF", poprawna: 0 },
            { tekst: "Pudełko o krawędzi $20$ cm ma dwa razy większą objętość.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 3,
          tresc: "Akwarium ma kształt prostopadłościanu o wymiarach $60$ cm (długość), $30$ cm (szerokość) i $40$ cm (wysokość). Ile litrów wody mieści się w nim po brzegi? Ile litrów wody jest w akwarium, gdy woda sięga do wysokości $30$ cm? **Zapisz obliczenia.**",
          rozwiazanie: "Zamieniamy wymiary na decymetry: $60$ cm $= 6$ dm, $30$ cm $= 3$ dm, $40$ cm $= 4$ dm.\n\nPo brzegi: $6 \\cdot 3 \\cdot 4 = 72$ dm$^3$, czyli $72$ l.\n\nWoda sięga do $30$ cm, czyli $3$ dm. Woda tworzy prostopadłościan o wymiarach $6$ dm, $3$ dm i $3$ dm: $6 \\cdot 3 \\cdot 3 = 54$ dm$^3$, czyli $54$ l.\n\nOdpowiedź: po brzegi mieści się $72$ l wody, a do wysokości $30$ cm jest $54$ l.",
        },
        {
          nr: "21",
          punkty: 2,
          tresc: "Z sześcianu o krawędzi $6$ cm wycięto prostopadłościan o wymiarach $6$ cm, $2$ cm i $3$ cm. Jaką objętość ma pozostała część? **Zapisz obliczenia.**",
          rozwiazanie: "Objętość sześcianu: $6 \\cdot 6 \\cdot 6 = 216$ cm$^3$.\n\nObjętość wyciętego prostopadłościanu: $6 \\cdot 2 \\cdot 3 = 36$ cm$^3$.\n\nPozostała część: $216 - 36 = 180$ cm$^3$.\n\nOdpowiedź: pozostała część ma objętość $180$ cm$^3$.",
        },
      ],
      generatory: [
        {
          id: "objetosc-prostopadloscianu",
          nazwa: "Objętość bryły",
          opis: "Oblicz objętość prostopadłościanu albo sześcianu, albo brakującą wysokość prostopadłościanu.",
          generuj(r) {
            const tryb = r.int(0, 2);
            const u = r.pick(["cm", "dm", "m"]);
            if (tryb === 0) {
              const a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9);
              return {
                tresc: r.chance()
                  ? `Prostopadłościan ma wymiary $${a}$ ${u}, $${b}$ ${u} i $${c}$ ${u}. Oblicz jego objętość.`
                  : `Pudełko ma kształt prostopadłościanu: długość $${a}$ ${u}, szerokość $${b}$ ${u}, wysokość $${c}$ ${u}. Jaka jest objętość tego pudełka?`,
                pola: [{ id: "w", typ: "liczba", etykieta: et(u) }],
                odpowiedz: { w: a * b * c },
                wynik: obj(a * b * c, u),
                rozwiazanie: [
                  "Objętość prostopadłościanu to iloczyn trzech wymiarów.",
                  `${rown(`${a} \\cdot ${b} \\cdot ${c}`, a * b * c, u)}.`,
                ],
              };
            }
            if (tryb === 1) {
              const a = r.int(2, 9);
              return {
                tresc: r.chance()
                  ? `Sześcian ma krawędź długości $${a}$ ${u}. Oblicz jego objętość.`
                  : `Kostka ma kształt sześcianu o krawędzi $${a}$ ${u}. Jaka jest jej objętość?`,
                pola: [{ id: "w", typ: "liczba", etykieta: et(u) }],
                odpowiedz: { w: a * a * a },
                wynik: obj(a * a * a, u),
                rozwiazanie: [
                  "Sześcian ma trzy równe wymiary, więc mnożymy krawędź przez siebie trzy razy.",
                  `${rown(`${a} \\cdot ${a} \\cdot ${a}`, a * a * a, u)}.`,
                ],
              };
            }
            const a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9);
            const V = a * b * c;
            return {
              tresc: `Objętość prostopadłościanu wynosi ${obj(V, u)}. Jego podstawa jest prostokątem o bokach $${a}$ ${u} i $${b}$ ${u}. Ile ${DL[u]} ma wysokość tego prostopadłościanu?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `Wysokość (w ${u}) $=$` }],
              odpowiedz: { w: c },
              wynik: `$${c}$ ${u}`,
              rozwiazanie: [
                `Pole podstawy: $${a} \\cdot ${b} = ${a * b}$ ${u}$^2$.`,
                "Objętość to pole podstawy razy wysokość, więc wysokość to objętość podzielona przez pole podstawy.",
                `$${V} : ${a * b} = ${c}$ ${u}.`,
              ],
            };
          },
        },
        {
          id: "akwarium-litry",
          nazwa: "Ile litrów wody",
          opis: "Oblicz, ile litrów wody mieści się w naczyniu w kształcie prostopadłościanu albo ile jest jej przy danym poziomie.",
          generuj(r) {
            const tryb = r.int(0, 2);
            const a = r.int(2, 8), b = r.int(2, 8), c = r.int(3, 8);
            if (tryb === 0) {
              const V = a * b * c;
              return {
                tresc: `Akwarium ma kształt prostopadłościanu o wymiarach $${a}$ dm, $${b}$ dm i $${c}$ dm. Ile litrów wody mieści się w nim po brzegi?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Pojemność (w l) $=$" }],
                odpowiedz: { w: V },
                wynik: `$${V}$ l`,
                rozwiazanie: [
                  `Objętość: ${rown(`${a} \\cdot ${b} \\cdot ${c}`, V, "dm")}.`,
                  `Jeden decymetr sześcienny to $1$ l, więc akwarium mieści $${V}$ l.`,
                ],
              };
            }
            if (tryb === 1) {
              const h = r.int(1, c - 1);
              const V = a * b * h;
              return {
                tresc: `Podstawa akwarium jest prostokątem o bokach $${a}$ dm i $${b}$ dm, a wysokość akwarium to $${c}$ dm. Wodę wlano do wysokości $${h}$ dm. Ile litrów wody jest w akwarium?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Ilość wody (w l) $=$" }],
                odpowiedz: { w: V },
                wynik: `$${V}$ l`,
                rozwiazanie: [
                  `Woda tworzy prostopadłościan o podstawie $${a}$ dm na $${b}$ dm i wysokości $${h}$ dm.`,
                  `Jej objętość: ${rown(`${a} \\cdot ${b} \\cdot ${h}`, V, "dm")}.`,
                  `Jeden decymetr sześcienny to $1$ l, więc w akwarium jest $${V}$ l wody.`,
                ],
              };
            }
            const V = a * b * c;
            return {
              tresc: `Zbiornik ma kształt prostopadłościanu o wymiarach $${10 * a}$ cm, $${10 * b}$ cm i $${10 * c}$ cm. Ile litrów wody mieści się w nim po brzegi?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Pojemność (w l) $=$" }],
              odpowiedz: { w: V },
              wynik: `$${V}$ l`,
              rozwiazanie: [
                `Zamieniamy na decymetry ($10$ cm to $1$ dm): $${a}$ dm, $${b}$ dm i $${c}$ dm.`,
                `Objętość: ${rown(`${a} \\cdot ${b} \\cdot ${c}`, V, "dm")}.`,
                `Jeden decymetr sześcienny to $1$ l, więc zbiornik mieści $${V}$ l.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4
    {
      id: "siatki-prostopadloscianow",
      nazwa: "Siatki prostopadłościanów",
      sciaga: [
        {
          nazwa: "Co to jest siatka",
          slownie: "Siatka to powierzchnia bryły rozcięta wzdłuż krawędzi i rozłożona na płasko. Gdy ją zegniemy i skleimy, znów powstaje bryła.",
          przyklad: "Rozcięte pudełko po butach rozłożone na stole to siatka prostopadłościanu.",
          uwaga: "Ściany siatki nie mogą na siebie nachodzić, a sklejane boki muszą mieć jednakową długość.",
        },
        {
          nazwa: "Siatka prostopadłościanu",
          slownie: "Siatka prostopadłościanu składa się z $6$ prostokątów. Ściany leżące naprzeciw siebie są takie same, więc są $3$ pary jednakowych prostokątów.",
          przyklad: "Prostopadłościan $5$ cm, $3$ cm i $2$ cm: dwa prostokąty $5$ cm na $3$ cm, dwa $5$ cm na $2$ cm i dwa $3$ cm na $2$ cm.",
          uwaga: "Nie wszystkie $6$ prostokątów są różne. Zawsze są trzy jednakowe pary.",
        },
        {
          nazwa: "Siatka sześcianu",
          slownie: "Siatka sześcianu składa się z $6$ jednakowych kwadratów. Sześcian ma $11$ różnych siatek.",
          przyklad: "Cztery kwadraty w jednym rzędzie to ściany boczne. Jeden kwadrat nad rzędem to góra, a jeden pod rzędem to dół.",
          uwaga: "Dwa kwadraty nad rzędem nie dadzą siatki: oba przykryłyby górę, a dołu by zabrakło.",
        },
        {
          nazwa: "Rząd ścian bocznych",
          slownie: "Cztery ściany boczne prostopadłościanu można narysować w jednym rzędzie. Długość rzędu to obwód podstawy, a wysokość rzędu to wysokość prostopadłościanu.",
          tex: "d=2\\cdot(a+b)",
          litery: "$a$, $b$ – boki podstawy, $d$ – długość rzędu ścian bocznych.",
          przyklad: "Podstawa $6$ cm na $4$ cm, wysokość $7$ cm: rząd ma długość $2 \\cdot (6+4) = 20$ cm i wysokość $7$ cm.",
          uwaga: "Do długości rzędu nie dodajemy wysokości prostopadłościanu.",
        },
        {
          nazwa: "Czy to siatka",
          slownie: "Wyobraź sobie zginanie kartki. Każda ściana ma przykleić się do sąsiedniej, żadna nie może wejść na inną i żadnej nie może zabraknąć. Sprawdź też, czy sklejane boki są równe.",
          przyklad: "Sześć kwadratów w jednym rzędzie to nie jest siatka sześcianu: po zagięciu pierwszy kwadrat nałożyłby się na piąty.",
          uwaga: "Sześć ścian to za mało. Liczy się też to, jak są ułożone.",
        },
      ],
      jak: [
        "Policz ściany: siatka prostopadłościanu ma $6$ prostokątów.",
        "Dopasuj ściany w pary: leżące naprzeciw siebie są jednakowe.",
        "Rząd ścian bocznych ma długość równą obwodowi podstawy, a wysokość równą wysokości prostopadłościanu.",
        "Sprawdź, czy sklejane boki mają tę samą długość i czy ściany po zagięciu nie nakładają się na siebie.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Z ilu prostokątów składa się siatka prostopadłościanu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$6$", "$8$", "$12$"],
          poprawna: 1,
        },
        {
          nr: "23",
          tresc: "Prostopadłościan ma wymiary $5$ cm, $3$ cm i $2$ cm. Ile ścian tego prostopadłościanu ma wymiary $5$ cm na $3$ cm? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1$", "$4$", "$6$", "$2$"],
          poprawna: 3,
        },
        {
          nr: "24",
          tresc: "Siatka sześcianu składa się z kwadratów o boku $4$ cm. Jaka jest objętość sześcianu, który z niej złożono? **Wybierz właściwą odpowiedź.**",
          opcje: ["$64\\ \\text{cm}^3$", "$16\\ \\text{cm}^3$", "$24\\ \\text{cm}^3$", "$12\\ \\text{cm}^3$"],
          poprawna: 0,
        },
        {
          nr: "25",
          tresc: "Rozważ trzy zdania o siatkach. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Siatka sześcianu składa się z $6$ kwadratów.", litery: "PF", poprawna: 0 },
            { tekst: "Siatka prostopadłościanu, który nie jest sześcianem, składa się z $6$ kwadratów.", litery: "PF", poprawna: 1 },
            { tekst: "Sześcian ma więcej niż jedną siatkę.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "26",
          tresc: "Podstawa prostopadłościanu jest prostokątem o bokach $6$ cm i $4$ cm, a wysokość prostopadłościanu ma $7$ cm. W siatce ściany boczne tworzą jeden rząd. Jaką długość ma ten rząd? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10$ cm", "$24$ cm", "$20$ cm", "$34$ cm"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 3,
          tresc: "W siatce prostopadłościanu ściany boczne tworzą rząd o długości $28$ cm i wysokości $7$ cm. Jeden bok podstawy ma $9$ cm. Oblicz drugi bok podstawy oraz objętość tego prostopadłościanu. **Zapisz obliczenia.**",
          rozwiazanie: "Długość rzędu to obwód podstawy, więc obwód wynosi $28$ cm.\n\nObwód prostokąta to dwa razy suma sąsiednich boków, więc suma boków podstawy to $28 : 2 = 14$ cm.\n\nDrugi bok: $14 - 9 = 5$ cm.\n\nWysokość prostopadłościanu to wysokość rzędu, czyli $7$ cm. Objętość: $9 \\cdot 5 \\cdot 7 = 315$ cm$^3$.\n\nOdpowiedź: drugi bok podstawy ma $5$ cm, a objętość wynosi $315$ cm$^3$.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "Ola narysowała cztery kwadraty w jednym rzędzie. Pozostałe dwa kwadraty dorysowała oba nad tym rzędem: jeden nad pierwszym, a drugi nad drugim kwadratem rzędu. Czy z takiego rysunku można złożyć sześcian? Uzasadnij odpowiedź. **Zapisz uzasadnienie.**",
          rozwiazanie: "Cztery kwadraty w rzędzie po zagięciu tworzą ściany boczne sześcianu.\n\nKwadrat nad pierwszym kwadratem rzędu zagina się i staje się górą sześcianu. Kwadrat nad drugim kwadratem też zagina się do góry, więc przykryje tę samą ścianę.\n\nGóra byłaby wtedy zakryta dwa razy, a dołu by zabrakło.\n\nOdpowiedź: nie, z takiego rysunku nie da się złożyć sześcianu.",
        },
      ],
      generatory: [
        {
          id: "rzad-scian-bocznych",
          nazwa: "Rząd ścian bocznych",
          opis: "Siatka prostopadłościanu lub sześcianu: oblicz długość rzędu ścian bocznych albo brakujący bok podstawy.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const a = r.int(2, 12), b = r.intBez(2, 12, a), c = r.int(2, 12);
              return {
                tresc: `Podstawa prostopadłościanu jest prostokątem o bokach $${a}$ cm i $${b}$ cm, a wysokość prostopadłościanu ma $${c}$ cm. W siatce ściany boczne tworzą jeden rząd. Jaką długość (w cm) ma ten rząd?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Długość rzędu (w cm) $=$" }],
                odpowiedz: { w: 2 * (a + b) },
                wynik: `$${2 * (a + b)}$ cm`,
                rozwiazanie: [
                  "Długość rzędu ścian bocznych to obwód podstawy.",
                  `$2 \\cdot (${a} + ${b}) = 2 \\cdot ${a + b} = ${2 * (a + b)}$ cm.`,
                ],
              };
            }
            if (tryb === 1) {
              const a = r.int(2, 15);
              return {
                tresc: `Krawędź sześcianu ma $${a}$ cm. W siatce cztery ściany boczne tworzą jeden rząd. Jaką długość (w cm) ma ten rząd?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Długość rzędu (w cm) $=$" }],
                odpowiedz: { w: 4 * a },
                wynik: `$${4 * a}$ cm`,
                rozwiazanie: [
                  "W rzędzie są cztery kwadraty o boku równym krawędzi sześcianu.",
                  `$4 \\cdot ${a} = ${4 * a}$ cm.`,
                ],
              };
            }
            const a = r.int(2, 12), b = r.intBez(2, 12, a), c = r.int(2, 12);
            const L = 2 * (a + b);
            return {
              tresc: `W siatce prostopadłościanu ściany boczne tworzą rząd o długości $${L}$ cm i wysokości $${c}$ cm. Jeden bok podstawy ma $${a}$ cm. Ile centymetrów ma drugi bok podstawy?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Drugi bok (w cm) $=$" }],
              odpowiedz: { w: b },
              wynik: `$${b}$ cm`,
              rozwiazanie: [
                "Długość rzędu to obwód podstawy, czyli dwa razy suma sąsiednich boków.",
                `Suma boków podstawy: $${L} : 2 = ${a + b}$ cm.`,
                `Drugi bok: $${a + b} - ${a} = ${b}$ cm.`,
              ],
            };
          },
        },
        {
          id: "siatka-sciany",
          nazwa: "Ściany w siatce",
          opis: "Ile ścian prostopadłościanu lub sześcianu ma dany kształt i wymiary.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const [a, b, c] = r.shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10, 12]).slice(0, 3);
              const [p, s] = r.pick([[a, b], [a, c], [b, c]]);
              return {
                tresc: `Prostopadłościan ma wymiary $${a}$ cm, $${b}$ cm i $${c}$ cm. Ile jego ścian ma kształt prostokąta o wymiarach $${p}$ cm na $${s}$ cm?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba ścian $=$" }],
                odpowiedz: { w: 2 },
                wynik: "$2$",
                rozwiazanie: [
                  "Ściany leżące naprzeciw siebie są takie same, więc ściany tworzą trzy pary.",
                  `Ścian o wymiarach $${p}$ cm na $${s}$ cm jest jedna para, czyli $2$ ściany.`,
                ],
              };
            }
            if (tryb === 1) {
              const a = r.int(2, 12), c = r.intBez(2, 12, a);
              const kw = r.chance();
              return {
                tresc: `Podstawą prostopadłościanu jest kwadrat o boku $${a}$ cm, a wysokość ma $${c}$ cm. Ile ścian tej bryły ma kształt ${kw ? `kwadratu o boku $${a}$ cm` : `prostokąta o wymiarach $${a}$ cm na $${c}$ cm`}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba ścian $=$" }],
                odpowiedz: { w: kw ? 2 : 4 },
                wynik: kw ? "$2$" : "$4$",
                rozwiazanie: kw
                  ? ["Kwadratami są tylko dwie podstawy.", "Ścian o kształcie kwadratu jest $2$."]
                  : ["Podstawy są kwadratami, a cztery ściany boczne są jednakowymi prostokątami.", `Ścian o wymiarach $${a}$ cm na $${c}$ cm jest $4$.`],
              };
            }
            const a = r.int(2, 12);
            return {
              tresc: `Sześcian ma krawędź $${a}$ cm. Ile jego ścian ma kształt kwadratu o boku $${a}$ cm?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba ścian $=$" }],
              odpowiedz: { w: 6 },
              wynik: "$6$",
              rozwiazanie: [
                "Sześcian ma wszystkie krawędzie równe, więc wszystkie jego ściany są jednakowymi kwadratami.",
                "Ścian jest $6$.",
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5
    {
      id: "siatki-graniastoslupow",
      nazwa: "Siatki graniastosłupów",
      sciaga: [
        {
          nazwa: "Siatka graniastosłupa",
          slownie: "Siatka graniastosłupa to dwie takie same podstawy (wielokąty) i prostokąty, które są ścianami bocznymi. Prostokątów jest tyle, ile boków ma podstawa.",
          przyklad: "Graniastosłup trójkątny: $2$ trójkąty i $3$ prostokąty, razem $5$ figur.",
          uwaga: "Trójkątne ściany boczne ma ostrosłup, a nie graniastosłup.",
        },
        {
          nazwa: "Ile figur w siatce",
          slownie: "Liczba figur w siatce to liczba boków podstawy plus $2$ podstawy.",
          przyklad: "Graniastosłup sześciokątny: $6 + 2 = 8$ figur, czyli $6$ prostokątów i $2$ sześciokąty.",
          uwaga: "Nie licz tylko prostokątów i nie zapomnij o obu podstawach.",
        },
        {
          nazwa: "Rząd ścian bocznych",
          slownie: "Ściany boczne można narysować w jednym rzędzie. Długość rzędu to suma długości wszystkich boków podstawy, czyli obwód podstawy. Wysokość rzędu to wysokość graniastosłupa. Każdy prostokąt ma wymiary: bok podstawy na wysokość.",
          przyklad: "Podstawa: trójkąt o bokach $3$ cm, $4$ cm i $5$ cm, wysokość $6$ cm. Prostokąty: $3$ na $6$, $4$ na $6$ i $5$ na $6$. Rząd ma długość $3 + 4 + 5 = 12$ cm.",
          uwaga: "Wysokość graniastosłupa jest wspólna dla wszystkich ścian bocznych. Do długości rzędu jej nie dodajemy.",
        },
        {
          nazwa: "Bryła z siatki",
          slownie: "Nazwę graniastosłupa podaje podstawa. Dwa trójkąty i trzy prostokąty to graniastosłup trójkątny. Dwa sześciokąty i sześć prostokątów to graniastosłup sześciokątny.",
          przyklad: "Siatka z dwóch pięciokątów i pięciu prostokątów składa się w graniastosłup pięciokątny.",
          uwaga: "Jedna podstawa i trójkątne ściany boczne to ostrosłup, a nie graniastosłup.",
        },
        {
          nazwa: "Krawędzie graniastosłupa",
          slownie: "Krawędzie to boki obu podstaw i krawędzie boczne. Krawędzi bocznych jest tyle, ile boków ma podstawa.",
          przyklad: "Podstawa: trójkąt o wszystkich bokach po $5$ cm, wysokość $8$ cm. Krawędzie podstaw: $2 \\cdot 3 \\cdot 5 = 30$ cm. Krawędzie boczne: $3 \\cdot 8 = 24$ cm. Razem $54$ cm.",
          uwaga: "Nie zapomnij o krawędziach drugiej podstawy.",
        },
      ],
      jak: [
        "Policz boki podstawy.",
        "Liczba figur w siatce to boki podstawy plus $2$.",
        "Prostokątów bocznych jest tyle, ile boków podstawy. Ich długości to boki podstawy, a wspólna wysokość to wysokość graniastosłupa.",
        "Długość rzędu ścian bocznych to suma wszystkich boków podstawy.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Siatka składa się z dwóch pięciokątów i pięciu prostokątów. Jaką bryłę można z niej złożyć? **Wybierz właściwą odpowiedź.**",
          opcje: ["graniastosłup siedmiokątny", "ostrosłup pięciokątny", "prostopadłościan", "graniastosłup pięciokątny"],
          poprawna: 3,
        },
        {
          nr: "30",
          tresc: "Z ilu figur składa się siatka graniastosłupa sześciokątnego? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$", "$6$", "$12$", "$7$"],
          poprawna: 0,
        },
        {
          nr: "31",
          tresc: "Podstawą graniastosłupa jest trójkąt o bokach $3$ cm, $4$ cm i $5$ cm, a wysokość graniastosłupa ma $6$ cm. W siatce ściany boczne tworzą jeden rząd. Jaką długość ma ten rząd? **Wybierz właściwą odpowiedź.**",
          opcje: ["$18$ cm", "$60$ cm", "$12$ cm", "$6$ cm"],
          poprawna: 2,
        },
        {
          nr: "32",
          tresc: "Rozważ trzy zdania o siatkach graniastosłupów. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Siatka graniastosłupa czworokątnego składa się z $6$ figur.", litery: "PF", poprawna: 0 },
            { tekst: "Siatka graniastosłupa ośmiokątnego składa się z $8$ figur.", litery: "PF", poprawna: 1 },
            { tekst: "W siatce graniastosłupa są dwie takie same podstawy.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "33",
          tresc: "Podstawą graniastosłupa jest sześciokąt, który ma wszystkie boki długości $2$ cm, a wysokość graniastosłupa ma $7$ cm. W siatce ściany boczne tworzą jeden rząd. Jakie wymiary ma ten rząd? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$ cm na $7$ cm", "$12$ cm na $7$ cm", "$12$ cm na $2$ cm", "$14$ cm na $12$ cm"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 2,
          tresc: "Podstawą graniastosłupa jest trójkąt o bokach $5$ cm, $5$ cm i $6$ cm, a wysokość graniastosłupa ma $10$ cm. Opisz siatkę tego graniastosłupa: z jakich figur się składa i jakie wymiary mają prostokąty. Ile centymetrów ma rząd ścian bocznych? **Zapisz obliczenia.**",
          rozwiazanie: "Podstawa ma $3$ boki, więc siatka składa się z $2$ trójkątów (podstaw) i $3$ prostokątów (ścian bocznych), razem z $5$ figur.\n\nProstokąty mają wymiary: dwa $5$ cm na $10$ cm i jeden $6$ cm na $10$ cm.\n\nUłożone w jeden rząd tworzą prostokąt o wysokości $10$ cm i długości $5 + 5 + 6 = 16$ cm.\n\nOdpowiedź: siatka składa się z dwóch trójkątów i trzech prostokątów. Rząd ścian bocznych ma $16$ cm długości i $10$ cm wysokości.",
        },
        {
          nr: "35",
          punkty: 3,
          tresc: "Z listewek zrobiono model graniastosłupa pięciokątnego. Podstawą jest pięciokąt, którego wszystkie boki mają po $4$ cm, a krawędź boczna ma $10$ cm. Ile krawędzi ma ten model i ile centymetrów listewek zużyto? **Zapisz obliczenia.**",
          rozwiazanie: "Krawędzi jest: $2 \\cdot 5$ w podstawach i $5$ bocznych, czyli $10 + 5 = 15$.\n\nKrawędzie obu podstaw: $2 \\cdot 5 \\cdot 4 = 40$ cm.\n\nKrawędzie boczne: $5 \\cdot 10 = 50$ cm.\n\nRazem: $40 + 50 = 90$ cm.\n\nOdpowiedź: model ma $15$ krawędzi, a listewek zużyto $90$ cm.",
        },
      ],
      generatory: [
        {
          id: "siatka-liczba-figur",
          nazwa: "Figury w siatce",
          opis: "Siatka graniastosłupa: oblicz, z ilu figur się składa, ile ma prostokątów albo ile boków ma podstawa.",
          generuj(r) {
            const tryb = r.int(0, 2);
            const n = r.int(3, 10);
            if (tryb === 0) {
              return {
                tresc: r.chance()
                  ? `Podstawą graniastosłupa jest wielokąt o $${n}$ bokach. Z ilu figur składa się siatka tego graniastosłupa?`
                  : `Z ilu figur składa się siatka graniastosłupa ${NKD(n)}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba figur $=$" }],
                odpowiedz: { w: n + 2 },
                wynik: `$${n + 2}$`,
                rozwiazanie: [
                  `Prostokątów jest tyle, ile boków ma podstawa, czyli $${n}$.`,
                  `Do tego dwie podstawy: $${n} + 2 = ${n + 2}$.`,
                ],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Siatka graniastosłupa składa się z ${n + 2} figur. Ile boków ma podstawa tego graniastosłupa?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba boków podstawy $=$" }],
                odpowiedz: { w: n },
                wynik: `$${n}$`,
                rozwiazanie: [
                  "W siatce są dwie podstawy, a pozostałe figury to prostokąty boczne.",
                  `Prostokątów jest $${n + 2} - 2 = ${n}$, a tyle boków ma podstawa.`,
                ],
              };
            }
            return {
              tresc: r.chance()
                ? `Ile prostokątów ma siatka graniastosłupa ${NKD(n)}?`
                : `Podstawą graniastosłupa jest wielokąt o $${n}$ bokach. Ile prostokątów ma siatka tego graniastosłupa?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba prostokątów $=$" }],
              odpowiedz: { w: n },
              wynik: `$${n}$`,
              rozwiazanie: [
                "Prostokątami są ściany boczne. Dwie podstawy to wielokąty, a nie prostokąty.",
                `Ścian bocznych jest tyle, ile boków ma podstawa, czyli $${n}$.`,
              ],
            };
          },
        },
        {
          id: "graniastoslup-rzad",
          nazwa: "Rząd i krawędzie",
          opis: "Graniastosłup: oblicz długość rzędu ścian bocznych w siatce albo sumę długości krawędzi.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const x = r.int(3, 9), y = r.int(3, 9);
              const z = r.int(Math.abs(x - y) + 1, Math.min(x + y - 1, 12));
              const H = r.int(2, 9);
              return {
                tresc: `Podstawą graniastosłupa jest trójkąt o bokach $${x}$ cm, $${y}$ cm i $${z}$ cm, a wysokość graniastosłupa ma $${H}$ cm. W siatce ściany boczne tworzą jeden rząd. Jaką długość (w cm) ma ten rząd?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Długość rzędu (w cm) $=$" }],
                odpowiedz: { w: x + y + z },
                wynik: `$${x + y + z}$ cm`,
                rozwiazanie: [
                  "Długość rzędu to suma wszystkich boków podstawy.",
                  `$${x} + ${y} + ${z} = ${x + y + z}$ cm.`,
                ],
              };
            }
            if (tryb === 1) {
              const n = r.int(5, 8), a = r.int(2, 6), H = r.int(2, 9);
              return {
                tresc: `Podstawą graniastosłupa jest ${WK[n]}, który ma wszystkie boki długości $${a}$ cm, a wysokość graniastosłupa ma $${H}$ cm. W siatce ściany boczne tworzą jeden rząd. Jaką długość (w cm) ma ten rząd?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Długość rzędu (w cm) $=$" }],
                odpowiedz: { w: n * a },
                wynik: `$${n * a}$ cm`,
                rozwiazanie: [
                  `Rząd składa się z $${n}$ jednakowych prostokątów, bo podstawa ma $${n}$ boków po $${a}$ cm.`,
                  `$${n} \\cdot ${a} = ${n * a}$ cm.`,
                ],
              };
            }
            const n = r.int(3, 6), a = r.int(2, 6), H = r.int(2, 9);
            return {
              tresc: `Z listewek zrobiono szkielet graniastosłupa. Podstawą jest wielokąt o $${n}$ bokach, z których każdy ma $${a}$ cm, a krawędź boczna ma $${H}$ cm. Ile centymetrów listewek zużyto?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Długość listewek (w cm) $=$" }],
              odpowiedz: { w: 2 * n * a + n * H },
              wynik: `$${2 * n * a + n * H}$ cm`,
              rozwiazanie: [
                `Krawędzie obu podstaw: $2 \\cdot ${n} \\cdot ${a} = ${2 * n * a}$ cm.`,
                `Krawędzie boczne (jest ich $${n}$): $${n} \\cdot ${H} = ${n * H}$ cm.`,
                `Razem: $${2 * n * a} + ${n * H} = ${2 * n * a + n * H}$ cm.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
