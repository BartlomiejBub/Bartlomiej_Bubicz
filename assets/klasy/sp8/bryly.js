// Klasa 8 (szkoła podstawowa) · rozdział V „Geometria przestrzenna” – Matematyka z kluczem 8 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Bez rysunków: każdą bryłę opisano słowami. Tylko graniastosłupy proste i ostrosłupy o prostych podstawach.
import { q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });

/** Powtarza losowanie, aż f() zwróci zadanie (wartość różną od null); f używa tego samego losownika, więc wynik jest powtarzalny. */
function probuj(f, proby = 3000) {
  for (let i = 0; i < proby; i++) {
    const w = f();
    if (w) return w;
  }
  throw new Error("Nie udało się wylosować zadania");
}

/** Przymiotnik od liczby boków podstawy. */
const ADJ = {
  3: "trójkątny",
  4: "czworokątny",
  5: "pięciokątny",
  6: "sześciokątny",
  7: "siedmiokątny",
  8: "ośmiokątny",
  9: "dziewięciokątny",
  10: "dziesięciokątny",
};
/** Nazwa wielokąta w podstawie (mianownik). */
const WIELOKAT = {
  3: "trójkąt",
  4: "czworokąt",
  5: "pięciokąt",
  6: "sześciokąt",
  7: "siedmiokąt",
  8: "ośmiokąt",
  9: "dziewięciokąt",
  10: "dziesięciokąt",
};

/** Trójki (p, H, h): połowa krawędzi podstawy, wysokość ostrosłupa, wysokość ściany bocznej (p² + H² = h²). */
const TROJKI = [
  [3, 4, 5], [6, 8, 10], [9, 12, 15],
  [4, 3, 5], [8, 6, 10], [12, 9, 15],
  [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17],
];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Graniastosłupy
    {
      id: "graniastoslupy",
      nazwa: "Graniastosłupy",
      sciaga: [
        {
          nazwa: "Graniastosłup prosty",
          slownie: "Graniastosłup prosty ma dwie takie same podstawy, które leżą naprzeciw siebie. Ściany boczne są prostokątami. Krawędzie boczne są prostopadłe do podstaw, a ich długość to wysokość graniastosłupa. Nazwa zależy od podstawy: w podstawie trójkąt – graniastosłup trójkątny, sześciokąt – sześciokątny.",
          przyklad: "Pudełko w kształcie prostopadłościanu to graniastosłup czworokątny. Namiot, który z boku wygląda jak trójkąt, to graniastosłup trójkątny.",
          uwaga: "Podstawy to nie zawsze „dół” i „góra”. To te dwie takie same ściany leżące naprzeciw siebie. Resztę ścian nazywamy bocznymi.",
        },
        {
          nazwa: "Graniastosłup prawidłowy",
          slownie: "Graniastosłup prawidłowy jest prosty, a jego podstawą jest wielokąt foremny, czyli taki o równych bokach i równych kątach. Wtedy wszystkie ściany boczne są takimi samymi prostokątami.",
          przyklad: "Graniastosłup prawidłowy czworokątny ma w podstawie kwadrat. Sześcian to taki graniastosłup, w którym wysokość jest równa krawędzi podstawy.",
          uwaga: "Prostopadłościan o podstawie $2\\times3$ jest graniastosłupem prostym, ale nie prawidłowym. Prostokąt nie jest wielokątem foremnym.",
        },
        {
          nazwa: "Wierzchołki, krawędzie, ściany",
          slownie: "Niech podstawa ma $n$ boków. Wierzchołków jest dwa razy tyle, co w podstawie. Krawędzie to dwie podstawy po $n$ krawędzi oraz $n$ krawędzi bocznych. Ścian jest $n$ bocznych i dwie podstawy.",
          tex: "W=2n\\qquad K=3n\\qquad S=n+2",
          litery: "$n$ – liczba boków podstawy, $W$ – wierzchołki, $K$ – krawędzie, $S$ – ściany.",
          przyklad: "Graniastosłup sześciokątny: $W=2\\cdot6=12$, $K=3\\cdot6=18$, $S=6+2=8$. Prostopadłościan ($n=4$): $8$ wierzchołków, $12$ krawędzi, $6$ ścian.",
          uwaga: "Do ścian dodaj obie podstawy: $n+2$, a nie samo $n$.",
        },
        {
          nazwa: "Siatka i szkielet",
          slownie: "Siatka graniastosłupa to dwie podstawy i $n$ prostokątów (ściany boczne), czyli jedna długa „taśma”. Szkielet to wszystkie krawędzie, np. z drutu. Aby policzyć jego długość, dodajemy krawędzie obu podstaw i krawędzie boczne.",
          tex: "L=2\\cdot\\text{Ob}+n\\cdot H",
          litery: "$\\text{Ob}$ – obwód podstawy, $n$ – liczba krawędzi bocznych, $H$ – wysokość.",
          przyklad: "Podstawa to trójkąt o bokach $3$, $4$, $5$ cm, a wysokość $10$ cm. Obwód podstawy: $12$ cm. Drutu: $2\\cdot12+3\\cdot10=54$ cm.",
          uwaga: "Podstawy są dwie, więc obwód podstawy liczymy dwa razy.",
        },
      ],
      jak: [
        "Sprawdź, ile boków ma podstawa. To jest liczba $n$.",
        "Policz wierzchołki ($2n$), krawędzie ($3n$) albo ściany ($n+2$), zależnie od pytania.",
        "Gdy trzeba policzyć długość szkieletu, dodaj dwa obwody podstaw i $n$ krawędzi bocznych.",
        "Gdy dane jest $W$, $K$ albo $S$, najpierw wylicz $n$ i dopiero potem resztę.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Podstawą graniastosłupa prostego jest ośmiokąt. Ile krawędzi ma ten graniastosłup? **Wybierz właściwą odpowiedź.**",
          opcje: ["$16$", "$24$", "$10$", "$18$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Graniastosłup prosty ma $15$ krawędzi. Ile ścian ma ten graniastosłup? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$6$", "$7$", "$10$"],
          poprawna: 2,
        },
        {
          nr: "3",
          tresc: "Z drutu zrobiono szkielet graniastosłupa prawidłowego trójkątnego (każda krawędź to kawałek drutu). Krawędź podstawy ma $4$ cm, a krawędź boczna $9$ cm. Ile centymetrów drutu potrzeba? **Wybierz właściwą odpowiedź.**",
          opcje: ["$51$ cm", "$39$ cm", "$48$ cm", "$27$ cm"],
          poprawna: 0,
        },
        {
          nr: "4",
          tresc: "Która lista ścian może być siatką graniastosłupa prawidłowego czworokątnego? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "dwa trójkąty i cztery prostokąty",
            "jeden kwadrat i cztery prostokąty",
            "dwa kwadraty i trzy prostokąty",
            "dwa kwadraty i cztery jednakowe prostokąty",
          ],
          poprawna: 3,
        },
        {
          nr: "5",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wysokość graniastosłupa prostego jest równa długości jego krawędzi bocznej.", litery: "PF", poprawna: 0 },
            { tekst: "Każdy prostopadłościan jest graniastosłupem prostym.", litery: "PF", poprawna: 0 },
            { tekst: "Graniastosłup, który ma w podstawie pięciokąt, ma $10$ krawędzi.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Z kawałka drutu o długości $1{,}3$ m Kasia chce zrobić szkielet graniastosłupa prawidłowego sześciokątnego. Krawędź podstawy ma $5$ cm, a krawędź boczna $12$ cm. Czy drutu wystarczy? **Zapisz obliczenia.**",
          rozwiazanie: "Obwód podstawy: $6\\cdot5=30$ cm. Są dwie podstawy, więc na nie potrzeba $2\\cdot30=60$ cm.\n\nKrawędzi bocznych jest $6$, więc na nie potrzeba $6\\cdot12=72$ cm.\n\nRazem: $60+72=132$ cm.\n\nKawałek drutu ma $1{,}3$ m, czyli $130$ cm. Potrzeba $132$ cm, a to więcej niż $130$ cm.\n\nOdpowiedź: Nie, drutu nie wystarczy. Brakuje $2$ cm.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Graniastosłup prosty ma $20$ wierzchołków. Ile boków ma jego podstawa? Ile krawędzi i ile ścian ma ten graniastosłup? **Zapisz obliczenia.**",
          rozwiazanie: "Wierzchołków jest $2n$, gdzie $n$ to liczba boków podstawy. Stąd $2n=20$, czyli $n=10$.\n\nKrawędzi jest $3n=3\\cdot10=30$.\n\nŚcian jest $n+2=10+2=12$.\n\nOdpowiedź: Podstawa ma $10$ boków (to dziesięciokąt), graniastosłup ma $30$ krawędzi i $12$ ścian.",
        },
      ],
      generatory: [
        {
          id: "elementy-graniastoslupa",
          nazwa: "Wierzchołki i krawędzie",
          opis: "Graniastosłup prosty o podstawie z $n$ bokami. Policz wierzchołki, krawędzie, ściany albo liczbę boków podstawy.",
          generuj(r) {
            const n = r.int(3, 10);
            const tryb = r.int(0, 4);
            const kto = `graniastosłup prosty, którego podstawą jest ${WIELOKAT[n]}`;
            if (tryb === 0) {
              const w = 2 * n;
              return {
                tresc: `Ile wierzchołków ma ${kto}?`,
                pola: [pole("w", "Wierzchołki $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [`Podstawa ma $${n}$ wierzchołków, a graniastosłup ma dwie podstawy.`, `$W=2n=2\\cdot${n}=${w}$.`],
              };
            }
            if (tryb === 1) {
              const k = 3 * n;
              return {
                tresc: `Ile krawędzi ma ${kto}?`,
                pola: [pole("w", "Krawędzie $=$")],
                odpowiedz: { w: q(k) },
                wynik: `$${k}$`,
                rozwiazanie: [`Każda z dwóch podstaw ma $${n}$ krawędzi, a krawędzi bocznych jest tyle, ile wierzchołków podstawy, czyli $${n}$.`, `$K=3n=3\\cdot${n}=${k}$.`],
              };
            }
            if (tryb === 2) {
              const s = n + 2;
              return {
                tresc: `Ile ścian ma ${kto}?`,
                pola: [pole("w", "Ściany $=$")],
                odpowiedz: { w: q(s) },
                wynik: `$${s}$`,
                rozwiazanie: [`Ścian bocznych jest $${n}$, bo tyle, ile boków podstawy. Dochodzą dwie podstawy.`, `$S=n+2=${n}+2=${s}$.`],
              };
            }
            if (tryb === 3) {
              const k = 3 * n;
              return {
                tresc: `Graniastosłup prosty ma $${k}$ krawędzi. Ile boków ma jego podstawa?`,
                pola: [pole("w", "Boki podstawy $=$")],
                odpowiedz: { w: q(n) },
                wynik: `$${n}$`,
                rozwiazanie: [`Krawędzi jest $3n$, więc $3n=${k}$.`, `$n=${k}:3=${n}$.`],
              };
            }
            const s = n + 2;
            const k = 3 * n;
            return {
              tresc: `Graniastosłup prosty ma $${s}$ ścian. Ile ma krawędzi?`,
              pola: [pole("w", "Krawędzie $=$")],
              odpowiedz: { w: q(k) },
              wynik: `$${k}$`,
              rozwiazanie: [`Ścian jest $n+2$, więc $n+2=${s}$, czyli $n=${n}$.`, `Krawędzi jest $3n=3\\cdot${n}=${k}$.`],
            };
          },
        },
        {
          id: "szkielet-graniastoslupa",
          nazwa: "Szkielet z drutu",
          opis: "Szkielet graniastosłupa prawidłowego z drutu. Oblicz, ile centymetrów drutu potrzeba na wszystkie krawędzie.",
          generuj(r) {
            const n = r.pick([3, 4, 5, 6]);
            const a = r.int(2, 9);
            const h = r.int(3, 15);
            const ob = n * a;
            const l = 2 * ob + n * h;
            return {
              tresc: `Z drutu robimy szkielet graniastosłupa prawidłowego ${ADJ[n].replace(/y$/, "ego")}. Krawędź podstawy ma $${a}$ cm, a krawędź boczna $${h}$ cm. Ile centymetrów drutu potrzeba na wszystkie krawędzie?`,
              pola: [pole("w", "Drut (cm) $=$")],
              odpowiedz: { w: q(l) },
              wynik: `$${l}$ cm`,
              rozwiazanie: [
                `Obwód podstawy: $${n}\\cdot${a}=${ob}$ cm. Są dwie podstawy: $2\\cdot${ob}=${2 * ob}$ cm.`,
                `Krawędzi bocznych jest $${n}$: $${n}\\cdot${h}=${n * h}$ cm.`,
                `Razem: $${2 * ob}+${n * h}=${l}$ cm.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Objętość graniastosłupa
    {
      id: "objetosc-graniastoslupa",
      nazwa: "Objętość graniastosłupa",
      sciaga: [
        {
          nazwa: "Objętość graniastosłupa",
          slownie: "Objętość mówi, ile miejsca zajmuje bryła, czyli ile sześcianów jednostkowych się w niej zmieści. Aby ją policzyć, mnożymy pole podstawy przez wysokość graniastosłupa.",
          tex: "V=P_p\\cdot H",
          litery: "$V$ – objętość, $P_p$ – pole jednej podstawy, $H$ – wysokość graniastosłupa.",
          przyklad: "Prostopadłościan $3\\times4\\times5$ cm. Pole podstawy: $3\\cdot4=12$ cm$^2$. Objętość: $12\\cdot5=60$ cm$^3$.",
          uwaga: "Wysokość graniastosłupa to długość krawędzi bocznej. Nie myl jej z wysokością trójkąta w podstawie.",
        },
        {
          nazwa: "Pole podstawy",
          slownie: "Najpierw policz pole podstawy wzorem, który znasz z wcześniejszych klas.",
          tex: "P=a\\cdot b\\qquad P=a^2\\qquad P=\\frac{a\\cdot h}{2}",
          litery: "Prostokąt: $a\\cdot b$. Kwadrat: $a^2$. Trójkąt: bok $a$ razy wysokość $h$ opuszczona na ten bok, podzielone przez $2$.",
          przyklad: "Trójkąt prostokątny o przyprostokątnych $6$ i $8$: $P=6\\cdot8:2=24$. Kwadrat o boku $5$: $P=25$.",
          uwaga: "W trójkącie nie zapomnij o dzieleniu przez $2$.",
        },
        {
          nazwa: "Jednostki objętości",
          slownie: "Objętość liczymy w centymetrach, decymetrach lub metrach sześciennych. Litr to to samo co decymetr sześcienny. Przed liczeniem zamień wszystkie wymiary na tę samą jednostkę.",
          tex: "1\\text{ l}=1\\text{ dm}^3\\qquad1\\text{ dm}^3=1000\\text{ cm}^3",
          litery: "Dalej: $1\\text{ m}^3=1000\\text{ dm}^3=1000\\text{ l}$.",
          przyklad: "Akwarium $50\\times30\\times40$ cm ma objętość $60000$ cm$^3$. To $60$ dm$^3$, czyli $60$ litrów.",
          uwaga: "Z cm$^3$ na litry dzielimy przez $1000$, a nie przez $100$.",
        },
        {
          nazwa: "Szukana wysokość",
          slownie: "Gdy znasz objętość i pole podstawy, dzielisz objętość przez pole podstawy. Sprawdź wynik: pole razy wysokość ma dać objętość.",
          tex: "H=V:P_p",
          przyklad: "Graniastosłup ma objętość $90$ cm$^3$, a pole podstawy $15$ cm$^2$. Wysokość: $90:15=6$ cm.",
          uwaga: "Dzielimy objętość przez pole podstawy, a nie na odwrót.",
        },
      ],
      jak: [
        "Zapisz, jaka figura jest w podstawie, i policz jej pole $P_p$.",
        "Sprawdź wysokość graniastosłupa $H$ (krawędź boczna) i zamień jednostki, jeśli trzeba.",
        "Oblicz $V=P_p\\cdot H$.",
        "Jeśli pytają o litry, zamień cm$^3$ na dm$^3$ ($1000$ cm$^3=1$ l).",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Podstawą graniastosłupa prostego jest trójkąt prostokątny o przyprostokątnych $6$ cm i $8$ cm. Wysokość graniastosłupa ma $10$ cm. Jaka jest objętość? **Wybierz właściwą odpowiedź.**",
          opcje: ["$480$ cm$^3$", "$240$ cm$^3$", "$120$ cm$^3$", "$80$ cm$^3$"],
          poprawna: 1,
        },
        {
          nr: "9",
          tresc: "Akwarium ma kształt prostopadłościanu o wymiarach $60$ cm, $30$ cm i $40$ cm. Ile litrów wody się w nim zmieści? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7{,}2$ l", "$720$ l", "$72$ l", "$7200$ l"],
          poprawna: 2,
        },
        {
          nr: "10",
          tresc: "Graniastosłup prawidłowy czworokątny ma krawędź podstawy $5$ cm i wysokość $8$ cm. Jaka jest jego objętość? **Wybierz właściwą odpowiedź.**",
          opcje: ["$40$ cm$^3$", "$100$ cm$^3$", "$160$ cm$^3$", "$200$ cm$^3$"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "Graniastosłup prosty ma objętość $120$ cm$^3$, a pole podstawy $15$ cm$^2$. Jaką wysokość ma ten graniastosłup? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$ cm", "$1800$ cm", "$105$ cm", "$135$ cm"],
          poprawna: 0,
        },
        {
          nr: "12",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Jeśli wysokość graniastosłupa podwoimy, a podstawy nie zmienimy, to objętość też się podwoi.", litery: "PF", poprawna: 0 },
            { tekst: "Zbiornik o objętości $1$ m$^3$ mieści $100$ litrów wody.", litery: "PF", poprawna: 1 },
            { tekst: "Dwa graniastosłupy o takich samych polach podstaw i takich samych wysokościach mają równe objętości.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Namiot ma kształt graniastosłupa prostego, którego podstawą jest trójkąt równoramienny. Podstawa tego trójkąta ma $2$ m, a opuszczona na nią wysokość $1{,}5$ m. Namiot ma $3$ m długości. Oblicz objętość namiotu. **Zapisz obliczenia.**",
          rozwiazanie: "Podstawą jest trójkąt. Pole podstawy: $P_p=2\\cdot1{,}5:2=1{,}5$ m$^2$.\n\nWysokość graniastosłupa to długość namiotu: $H=3$ m.\n\nObjętość: $V=1{,}5\\cdot3=4{,}5$ m$^3$.\n\nOdpowiedź: Objętość namiotu to $4{,}5$ m$^3$.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Akwarium ma wymiary dna $80$ cm na $40$ cm i wysokość $50$ cm. Wlano do niego wodę do wysokości $40$ cm. Ile litrów wody jest w akwarium? Czy po dolaniu jeszcze $16$ litrów woda się nie przeleje? **Zapisz obliczenia.**",
          rozwiazanie: "Pole dna: $80\\cdot40=3200$ cm$^2$.\n\nObjętość wody: $3200\\cdot40=128000$ cm$^3$. Dzielimy przez $1000$: $128$ litrów.\n\nDolewamy $16$ litrów, czyli $16000$ cm$^3$. Woda podniesie się o $16000:3200=5$ cm.\n\nNowy poziom wody: $40+5=45$ cm. Akwarium ma $50$ cm wysokości, więc woda się nie przeleje.\n\nOdpowiedź: W akwarium jest $128$ litrów wody. Po dolaniu $16$ litrów woda sięgnie $45$ cm i się nie przeleje.",
        },
      ],
      generatory: [
        {
          id: "objetosc-graniastoslupa",
          nazwa: "Objętość graniastosłupa",
          opis: "Graniastosłup prosty o podstawie prostokątnej, kwadratowej albo trójkątnej. Oblicz objętość.",
          generuj(r) {
            const tryb = r.int(0, 3);
            let opis;
            let pp;
            let krokPp;
            const h = r.int(2, 12);
            if (tryb === 0) {
              const a = r.int(2, 12);
              const b = r.int(2, 12);
              pp = a * b;
              opis = `Podstawą graniastosłupa prostego jest prostokąt o bokach $${a}$ cm i $${b}$ cm.`;
              krokPp = `Pole podstawy: $${a}\\cdot${b}=${pp}$ cm$^2$.`;
            } else if (tryb === 1) {
              const a = r.int(2, 9);
              pp = a * a;
              opis = `Podstawą graniastosłupa prostego jest kwadrat o boku $${a}$ cm.`;
              krokPp = `Pole podstawy: $${a}\\cdot${a}=${pp}$ cm$^2$.`;
            } else if (tryb === 2) {
              const x = r.int(3, 12);
              const y = probuj(() => {
                const v = r.int(3, 12);
                return (x * v) % 2 === 0 ? v : null;
              });
              pp = (x * y) / 2;
              opis = `Podstawą graniastosłupa prostego jest trójkąt prostokątny o przyprostokątnych $${x}$ cm i $${y}$ cm.`;
              krokPp = `Pole podstawy: $${x}\\cdot${y}:2=${pp}$ cm$^2$.`;
            } else {
              const a = 2 * r.int(1, 7);
              const w = r.int(2, 10);
              pp = (a * w) / 2;
              opis = `Podstawą graniastosłupa prostego jest trójkąt, w którym bok ma $${a}$ cm, a wysokość opuszczona na ten bok ma $${w}$ cm.`;
              krokPp = `Pole podstawy: $${a}\\cdot${w}:2=${pp}$ cm$^2$.`;
            }
            const v = pp * h;
            return {
              tresc: `${opis} Wysokość graniastosłupa ma $${h}$ cm. Oblicz objętość.`,
              pola: [pole("w", "Objętość (cm$^3$) $=$")],
              odpowiedz: { w: q(v) },
              wynik: `$${v}$ cm$^3$`,
              rozwiazanie: [krokPp, `Objętość: $V=P_p\\cdot H=${pp}\\cdot${h}$.`, `$V=${v}$ cm$^3$.`],
            };
          },
        },
        {
          id: "akwarium-litry",
          nazwa: "Akwarium w litrach",
          opis: "Akwarium w kształcie prostopadłościanu. Oblicz, ile litrów wody się mieści, albo jak wysoko sięga woda.",
          generuj(r) {
            return probuj(() => {
              const a = r.pick([20, 30, 40, 50, 60, 80]);
              const b = r.pick([20, 30, 40, 50, 60]);
              const h = r.pick([10, 15, 20, 25, 30, 40, 50]);
              const vcm = a * b * h;
              if (vcm % 1000 !== 0) return null;
              const l = vcm / 1000;
              if (r.chance(0.5)) {
                return {
                  tresc: `Akwarium ma dno o wymiarach $${a}$ cm na $${b}$ cm. Woda w akwarium sięga $${h}$ cm. Ile litrów wody jest w akwarium?`,
                  pola: [pole("w", "Woda (litry) $=$")],
                  odpowiedz: { w: q(l) },
                  wynik: `$${l}$ l`,
                  rozwiazanie: [`Pole dna: $${a}\\cdot${b}=${a * b}$ cm$^2$.`, `Objętość wody: $${a * b}\\cdot${h}=${vcm}$ cm$^3$.`, `$1$ litr to $1000$ cm$^3$, więc $${vcm}:1000=${l}$ litrów.`],
                };
              }
              return {
                tresc: `Akwarium ma dno o wymiarach $${a}$ cm na $${b}$ cm. Wlano do niego $${l}$ litrów wody. Jak wysoko (w centymetrach) sięga woda?`,
                pola: [pole("w", "Wysokość wody (cm) $=$")],
                odpowiedz: { w: q(h) },
                wynik: `$${h}$ cm`,
                rozwiazanie: [`$${l}$ litrów to $${l}\\cdot1000=${vcm}$ cm$^3$.`, `Pole dna: $${a}\\cdot${b}=${a * b}$ cm$^2$.`, `Wysokość: $H=V:P_p=${vcm}:${a * b}=${h}$ cm.`],
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Pole powierzchni graniastosłupa
    {
      id: "pole-graniastoslupa",
      nazwa: "Pole powierzchni graniastosłupa",
      sciaga: [
        {
          nazwa: "Pole powierzchni całkowitej",
          slownie: "Pole powierzchni całkowitej to pole wszystkich ścian, czyli ile papieru albo farby potrzeba, żeby okleić całą bryłę. To dwie podstawy plus ściany boczne.",
          tex: "P_c=2\\cdot P_p+P_b",
          litery: "$P_c$ – pole całkowite, $P_p$ – pole jednej podstawy, $P_b$ – pole powierzchni bocznej.",
          przyklad: "Podstawy mają po $6$ cm$^2$, a ściany boczne razem $40$ cm$^2$. Wtedy $P_c=2\\cdot6+40=52$ cm$^2$.",
          uwaga: "Podstaw jest dwie. Nie zapomnij pomnożyć $P_p$ przez $2$.",
        },
        {
          nazwa: "Pole powierzchni bocznej",
          slownie: "Ściany boczne rozwinięte na płasko tworzą jeden długi prostokąt. Jego jeden bok to obwód podstawy, a drugi to wysokość graniastosłupa.",
          tex: "P_b=\\text{Ob}\\cdot H",
          litery: "$\\text{Ob}$ – obwód podstawy, $H$ – wysokość graniastosłupa.",
          przyklad: "Podstawa to trójkąt o bokach $3$, $4$, $5$ cm, a $H=10$ cm. Obwód: $12$ cm. Pole boczne: $12\\cdot10=120$ cm$^2$.",
          uwaga: "Obwód to suma wszystkich boków podstawy, a nie jeden bok.",
        },
        {
          nazwa: "Prostopadłościan i sześcian",
          slownie: "Prostopadłościan ma trzy pary takich samych prostokątów. Pole całkowite to dwa razy suma pól trzech różnych ścian. Sześcian ma sześć takich samych kwadratów.",
          tex: "P_c=2(ab+ac+bc)\\qquad P_c=6a^2",
          litery: "$a$, $b$, $c$ – wymiary prostopadłościanu, $a$ – krawędź sześcianu.",
          przyklad: "Prostopadłościan $3\\times4\\times5$: $2\\cdot(12+15+20)=94$. Sześcian o krawędzi $2$: $6\\cdot4=24$.",
          uwaga: "W sześcianie $6a^2$, a nie $(6a)^2$.",
        },
        {
          nazwa: "Bryła bez jednej ściany",
          slownie: "Akwarium albo pudełko bez wieczka nie ma górnej ściany. Od pola całkowitego odejmujemy wtedy pole jednej podstawy. Namiot bez podłogi liczymy bez tej ściany.",
          przyklad: "Pudełko bez wieczka o wymiarach $20\\times15\\times10$ cm. Dno: $300$. Boki: $2\\cdot(20+15)\\cdot10=700$. Razem $1000$ cm$^2$.",
          uwaga: "Przeczytaj uważnie, której ściany brakuje. Nie dodawaj pola ściany, której w bryle nie ma.",
        },
      ],
      jak: [
        "Policz pole podstawy $P_p$ (jeśli potrzebne).",
        "Policz obwód podstawy i pomnóż go przez wysokość: to $P_b$.",
        "Dodaj: $P_c=2\\cdot P_p+P_b$.",
        "Gdy bryła jest bez wieczka (albo bez podłogi), policz tylko te ściany, które istnieją.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Jakie pole powierzchni całkowitej ma sześcian o krawędzi $5$ cm? **Wybierz właściwą odpowiedź.**",
          opcje: ["$25$ cm$^2$", "$100$ cm$^2$", "$125$ cm$^2$", "$150$ cm$^2$"],
          poprawna: 3,
        },
        {
          nr: "16",
          tresc: "Podstawą graniastosłupa prostego jest prostokąt o bokach $6$ cm i $4$ cm. Wysokość graniastosłupa to $5$ cm. Jakie jest pole powierzchni całkowitej? **Wybierz właściwą odpowiedź.**",
          opcje: ["$120$ cm$^2$", "$148$ cm$^2$", "$124$ cm$^2$", "$100$ cm$^2$"],
          poprawna: 1,
        },
        {
          nr: "17",
          tresc: "Podstawą graniastosłupa prostego jest trójkąt o bokach $5$ cm, $5$ cm i $6$ cm. Wysokość graniastosłupa to $10$ cm. Jakie jest pole powierzchni bocznej? **Wybierz właściwą odpowiedź.**",
          opcje: ["$16$ cm$^2$", "$80$ cm$^2$", "$160$ cm$^2$", "$320$ cm$^2$"],
          poprawna: 2,
        },
        {
          nr: "18",
          tresc: "Pudełko bez wieczka ma kształt prostopadłościanu o wymiarach $20$ cm, $15$ cm i $10$ cm. Ile centymetrów kwadratowych kartonu zużyto na to pudełko? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1000$ cm$^2$", "$1300$ cm$^2$", "$700$ cm$^2$", "$600$ cm$^2$"],
          poprawna: 0,
        },
        {
          nr: "19",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Pole powierzchni bocznej graniastosłupa prostego to obwód podstawy razy wysokość.", litery: "PF", poprawna: 0 },
            { tekst: "Sześcian o krawędzi $2$ cm ma pole powierzchni całkowitej $24$ cm$^2$.", litery: "PF", poprawna: 0 },
            { tekst: "Pole powierzchni całkowitej graniastosłupa to pole boczne plus jedno pole podstawy.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Namiot ma kształt graniastosłupa prostego. Jego podstawą (przodem i tyłem namiotu) jest trójkąt równoramienny o podstawie $3$ m i wysokości $2$ m. Dwa pozostałe boki każdego takiego trójkąta mają po $2{,}5$ m. Namiot ma $4$ m długości. Ile metrów kwadratowych płótna potrzeba na dwa skosy dachu i dwie ściany trójkątne (bez podłogi)? **Zapisz obliczenia.**",
          rozwiazanie: "Jedna ściana trójkątna: $3\\cdot2:2=3$ m$^2$. Są dwie takie ściany: $2\\cdot3=6$ m$^2$.\n\nJeden skos dachu to prostokąt $2{,}5$ m na $4$ m: $2{,}5\\cdot4=10$ m$^2$. Są dwa skosy: $2\\cdot10=20$ m$^2$.\n\nRazem: $6+20=26$ m$^2$.\n\nOdpowiedź: Potrzeba $26$ m$^2$ płótna.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Akwarium bez górnej ściany ma kształt prostopadłościanu o wymiarach $60$ cm, $30$ cm i $40$ cm (wysokość). Oblicz, ile centymetrów kwadratowych szkła zużyto na to akwarium i ile litrów wody się w nim zmieści. **Zapisz obliczenia.**",
          rozwiazanie: "Dno: $60\\cdot30=1800$ cm$^2$.\n\nObwód dna: $2\\cdot(60+30)=180$ cm. Cztery ściany boczne: $180\\cdot40=7200$ cm$^2$.\n\nSzkło: $1800+7200=9000$ cm$^2$. Górnej ściany nie ma, więc jej nie liczymy.\n\nObjętość: $1800\\cdot40=72000$ cm$^3$, czyli $72$ litry.\n\nOdpowiedź: Zużyto $9000$ cm$^2$ szkła, a w akwarium zmieści się $72$ litry wody.",
        },
      ],
      generatory: [
        {
          id: "pole-boczne-graniastoslupa",
          nazwa: "Pole boczne graniastosłupa",
          opis: "Podstawa jest opisana bokami. Policz obwód podstawy i pole powierzchni bocznej graniastosłupa prostego.",
          generuj(r) {
            const h = r.int(2, 12);
            const tryb = r.int(0, 4);
            let opis;
            let ob;
            let krok;
            if (tryb === 0) {
              const k = r.int(1, 3);
              const [a, b, c] = [3 * k, 4 * k, 5 * k];
              ob = a + b + c;
              opis = `trójkąt prostokątny o bokach $${a}$ cm, $${b}$ cm i $${c}$ cm`;
              krok = `Obwód podstawy: $${a}+${b}+${c}=${ob}$ cm.`;
            } else if (tryb === 1) {
              const a = r.int(2, 9);
              ob = 4 * a;
              opis = `kwadrat o boku $${a}$ cm`;
              krok = `Obwód podstawy: $4\\cdot${a}=${ob}$ cm.`;
            } else if (tryb === 2) {
              const a = r.int(2, 10);
              const b = probuj(() => {
                const v = r.int(2, 10);
                return v !== a ? v : null;
              });
              ob = 2 * (a + b);
              opis = `prostokąt o bokach $${a}$ cm i $${b}$ cm`;
              krok = `Obwód podstawy: $2\\cdot(${a}+${b})=${ob}$ cm.`;
            } else if (tryb === 3) {
              const a = r.int(2, 8);
              ob = 6 * a;
              opis = `sześciokąt foremny o boku $${a}$ cm`;
              krok = `Obwód podstawy: $6\\cdot${a}=${ob}$ cm.`;
            } else {
              const a = r.int(3, 9);
              const b = probuj(() => {
                const v = r.int(2, 9);
                return v < 2 * a && v !== a ? v : null;
              });
              ob = 2 * a + b;
              opis = `trójkąt równoramienny o ramionach $${a}$ cm i podstawie $${b}$ cm`;
              krok = `Obwód podstawy: $${a}+${a}+${b}=${ob}$ cm.`;
            }
            const pb = ob * h;
            return {
              tresc: `Podstawą graniastosłupa prostego jest ${opis}. Wysokość graniastosłupa ma $${h}$ cm. Oblicz pole powierzchni bocznej.`,
              pola: [pole("w", "Pole boczne (cm$^2$) $=$")],
              odpowiedz: { w: q(pb) },
              wynik: `$${pb}$ cm$^2$`,
              rozwiazanie: [krok, `Pole boczne: $P_b=\\text{Ob}\\cdot H=${ob}\\cdot${h}$.`, `$P_b=${pb}$ cm$^2$.`],
            };
          },
        },
        {
          id: "pole-calkowite-graniastoslupa",
          nazwa: "Pole całkowite graniastosłupa",
          opis: "Prostopadłościan, sześcian, pudełko bez wieczka albo graniastosłup o podstawie trójkąta prostokątnego. Oblicz pole powierzchni.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const a = r.int(2, 10);
              const b = r.int(2, 10);
              const c = r.int(2, 10);
              const pp = a * b;
              const pb = 2 * (a + b) * c;
              const pc = 2 * pp + pb;
              return {
                tresc: `Prostopadłościan ma wymiary $${a}$ cm, $${b}$ cm i $${c}$ cm (wysokość). Oblicz pole powierzchni całkowitej.`,
                pola: [pole("w", "Pole całkowite (cm$^2$) $=$")],
                odpowiedz: { w: q(pc) },
                wynik: `$${pc}$ cm$^2$`,
                rozwiazanie: [`Pole podstawy: $${a}\\cdot${b}=${pp}$ cm$^2$.`, `Pole boczne: $2\\cdot(${a}+${b})\\cdot${c}=${pb}$ cm$^2$.`, `$P_c=2\\cdot${pp}+${pb}=${pc}$ cm$^2$.`],
              };
            }
            if (tryb === 1) {
              const a = r.int(2, 12);
              const pc = 6 * a * a;
              return {
                tresc: `Krawędź sześcianu ma $${a}$ cm. Oblicz pole powierzchni całkowitej tego sześcianu.`,
                pola: [pole("w", "Pole całkowite (cm$^2$) $=$")],
                odpowiedz: { w: q(pc) },
                wynik: `$${pc}$ cm$^2$`,
                rozwiazanie: [`Sześcian ma $6$ takich samych kwadratów o boku $${a}$ cm.`, `Pole jednego kwadratu: $${a}\\cdot${a}=${a * a}$ cm$^2$.`, `$P_c=6\\cdot${a * a}=${pc}$ cm$^2$.`],
              };
            }
            if (tryb === 2) {
              const a = r.int(3, 10);
              const b = r.int(3, 10);
              const c = r.int(2, 8);
              const dno = a * b;
              const pb = 2 * (a + b) * c;
              const p = dno + pb;
              return {
                tresc: `Pudełko bez wieczka ma kształt prostopadłościanu. Dno ma wymiary $${a}$ cm na $${b}$ cm, a wysokość pudełka to $${c}$ cm. Ile centymetrów kwadratowych kartonu potrzeba na to pudełko?`,
                pola: [pole("w", "Karton (cm$^2$) $=$")],
                odpowiedz: { w: q(p) },
                wynik: `$${p}$ cm$^2$`,
                rozwiazanie: [`Dno: $${a}\\cdot${b}=${dno}$ cm$^2$.`, `Cztery ściany boczne: $2\\cdot(${a}+${b})\\cdot${c}=${pb}$ cm$^2$.`, `Wieczka nie ma, więc razem: $${dno}+${pb}=${p}$ cm$^2$.`],
              };
            }
            const k = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13]]);
            const [x, y, z] = k;
            const h = r.int(2, 9);
            const pp = (x * y) / 2;
            const ob = x + y + z;
            const pb = ob * h;
            const pc = 2 * pp + pb;
            return {
              tresc: `Podstawą graniastosłupa prostego jest trójkąt prostokątny o bokach $${x}$ cm, $${y}$ cm i $${z}$ cm (przyprostokątne mają $${x}$ cm i $${y}$ cm). Wysokość graniastosłupa ma $${h}$ cm. Oblicz pole powierzchni całkowitej.`,
              pola: [pole("w", "Pole całkowite (cm$^2$) $=$")],
              odpowiedz: { w: q(pc) },
              wynik: `$${pc}$ cm$^2$`,
              rozwiazanie: [`Pole podstawy: $${x}\\cdot${y}:2=${pp}$ cm$^2$.`, `Obwód podstawy: $${x}+${y}+${z}=${ob}$ cm. Pole boczne: $${ob}\\cdot${h}=${pb}$ cm$^2$.`, `$P_c=2\\cdot${pp}+${pb}=${pc}$ cm$^2$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Ostrosłupy
    {
      id: "ostroslupy",
      nazwa: "Ostrosłupy",
      sciaga: [
        {
          nazwa: "Ostrosłup",
          slownie: "Ostrosłup ma jedną podstawę, którą jest wielokąt. Ściany boczne to trójkąty, które spotykają się w jednym punkcie, czyli w wierzchołku ostrosłupa. Wysokość ostrosłupa to odcinek z wierzchołka prostopadły do podstawy.",
          przyklad: "Piramida w Egipcie to ostrosłup czworokątny. Dach wieżyczki zamku często ma kształt ostrosłupa.",
          uwaga: "Nazwa zależy od podstawy: w podstawie pięciokąt – ostrosłup pięciokątny.",
        },
        {
          nazwa: "Ostrosłup prawidłowy",
          slownie: "Ostrosłup prawidłowy ma w podstawie wielokąt foremny, a wierzchołek jest nad środkiem podstawy. Wszystkie ściany boczne są takimi samymi trójkątami równoramiennymi.",
          przyklad: "Ostrosłup prawidłowy czworokątny ma w podstawie kwadrat i cztery takie same trójkąty równoramienne jako ściany boczne.",
          uwaga: "Ściany boczne ostrosłupa nie są prostokątami. To zawsze trójkąty.",
        },
        {
          nazwa: "Wierzchołki, krawędzie, ściany",
          slownie: "Niech podstawa ma $n$ boków. Wierzchołków jest tyle, co w podstawie, i jeszcze wierzchołek ostrosłupa. Krawędzie to $n$ krawędzi podstawy i $n$ krawędzi bocznych. Ścian jest $n$ bocznych i jedna podstawa.",
          tex: "W=n+1\\qquad K=2n\\qquad S=n+1",
          litery: "$n$ – liczba boków podstawy.",
          przyklad: "Ostrosłup czworokątny: $W=5$, $K=8$, $S=5$. Ostrosłup sześciokątny: $W=7$, $K=12$, $S=7$.",
          uwaga: "Ostrosłup ma jedną podstawę, więc ścian jest $n+1$, a nie $n+2$ jak w graniastosłupie.",
        },
        {
          nazwa: "Wysokość z Pitagorasa",
          slownie: "W ostrosłupie prawidłowym czworokątnym wysokość ostrosłupa, połowa krawędzi podstawy i wysokość ściany bocznej tworzą trójkąt prostokątny. Wysokość ściany bocznej to najdłuższy bok, czyli przeciwprostokątna.",
          tex: "H^2+\\left(\\frac{a}{2}\\right)^2=h^2",
          litery: "$H$ – wysokość ostrosłupa, $a$ – krawędź podstawy, $h$ – wysokość ściany bocznej.",
          przyklad: "Gdy $a=6$ i $h=5$, to $H^2+3^2=5^2$, czyli $H^2=25-9=16$ i $H=4$.",
          uwaga: "Do wzoru bierzemy połowę krawędzi podstawy ($a:2$), a nie całą krawędź.",
        },
      ],
      jak: [
        "Sprawdź, ile boków ma podstawa. To jest liczba $n$.",
        "Policz wierzchołki ($n+1$), krawędzie ($2n$) albo ściany ($n+1$).",
        "Gdy trzeba wyznaczyć wysokość, narysuj w myślach trójkąt prostokątny: $H$, połowa krawędzi podstawy i $h$.",
        "Z twierdzenia Pitagorasa policz brakujący bok. Pamiętaj, że $h$ jest przeciwprostokątną.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Podstawą ostrosłupa jest siedmiokąt. Ile ścian ma ten ostrosłup? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$8$", "$9$", "$14$"],
          poprawna: 1,
        },
        {
          nr: "23",
          tresc: "Ostrosłup ma $12$ krawędzi. Ile ma wierzchołków? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$12$", "$13$", "$7$"],
          poprawna: 3,
        },
        {
          nr: "24",
          tresc: "Jakimi figurami są ściany boczne ostrosłupa prawidłowego czworokątnego? **Wybierz właściwą odpowiedź.**",
          opcje: ["prostokątami", "kwadratami", "takimi samymi trójkątami równoramiennymi", "trapezami równoramiennymi"],
          poprawna: 2,
        },
        {
          nr: "25",
          tresc: "Ostrosłup prawidłowy czworokątny ma krawędź podstawy $6$ cm, a wysokość ściany bocznej $5$ cm. Jaką wysokość ma ten ostrosłup? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$ cm", "$2$ cm", "$\\sqrt{34}$ cm", "$\\sqrt{61}$ cm"],
          poprawna: 0,
        },
        {
          nr: "26",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wszystkie ściany boczne ostrosłupa są trójkątami.", litery: "PF", poprawna: 0 },
            { tekst: "Ostrosłup, który ma w podstawie sześciokąt, ma $12$ wierzchołków.", litery: "PF", poprawna: 1 },
            { tekst: "Ostrosłup, który ma w podstawie trójkąt, ma $6$ krawędzi.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Model ostrosłupa prawidłowego czworokątnego ma krawędź podstawy $10$ cm. Wysokość ściany bocznej tego ostrosłupa ma $13$ cm. Oblicz wysokość ostrosłupa. **Zapisz obliczenia.**",
          rozwiazanie: "Wysokość ostrosłupa $H$, połowa krawędzi podstawy $10:2=5$ cm i wysokość ściany bocznej $13$ cm tworzą trójkąt prostokątny. Przeciwprostokątna ma $13$ cm.\n\nZ twierdzenia Pitagorasa: $H^2+5^2=13^2$.\n\nStąd $H^2=169-25=144$, więc $H=12$ cm.\n\nOdpowiedź: Wysokość ostrosłupa to $12$ cm.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "Ostrosłup ma $20$ krawędzi. Jaki wielokąt jest jego podstawą? Ile wierzchołków i ile ścian ma ten ostrosłup? **Zapisz obliczenia.**",
          rozwiazanie: "Krawędzi jest $2n$, gdzie $n$ to liczba boków podstawy. Stąd $2n=20$, czyli $n=10$.\n\nWierzchołków jest $n+1=11$.\n\nŚcian jest $n+1=11$.\n\nOdpowiedź: Podstawą jest dziesięciokąt. Ostrosłup ma $11$ wierzchołków i $11$ ścian.",
        },
      ],
      generatory: [
        {
          id: "elementy-ostroslupa",
          nazwa: "Elementy ostrosłupa",
          opis: "Ostrosłup o podstawie z $n$ bokami. Policz wierzchołki, krawędzie, ściany albo liczbę boków podstawy.",
          generuj(r) {
            const n = r.int(3, 10);
            const tryb = r.int(0, 4);
            const kto = `ostrosłup, którego podstawą jest ${WIELOKAT[n]}`;
            if (tryb === 0) {
              const w = n + 1;
              return {
                tresc: `Ile wierzchołków ma ${kto}?`,
                pola: [pole("w", "Wierzchołki $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [`Podstawa ma $${n}$ wierzchołków i dochodzi jeszcze wierzchołek ostrosłupa.`, `$W=n+1=${n}+1=${w}$.`],
              };
            }
            if (tryb === 1) {
              const k = 2 * n;
              return {
                tresc: `Ile krawędzi ma ${kto}?`,
                pola: [pole("w", "Krawędzie $=$")],
                odpowiedz: { w: q(k) },
                wynik: `$${k}$`,
                rozwiazanie: [`Podstawa ma $${n}$ krawędzi, a krawędzi bocznych jest tyle samo, czyli $${n}$.`, `$K=2n=2\\cdot${n}=${k}$.`],
              };
            }
            if (tryb === 2) {
              const s = n + 1;
              return {
                tresc: `Ile ścian ma ${kto}?`,
                pola: [pole("w", "Ściany $=$")],
                odpowiedz: { w: q(s) },
                wynik: `$${s}$`,
                rozwiazanie: [`Ścian bocznych jest $${n}$ (każda to trójkąt) i jest jedna podstawa.`, `$S=n+1=${n}+1=${s}$.`],
              };
            }
            if (tryb === 3) {
              const k = 2 * n;
              return {
                tresc: `Ostrosłup ma $${k}$ krawędzi. Ile boków ma jego podstawa?`,
                pola: [pole("w", "Boki podstawy $=$")],
                odpowiedz: { w: q(n) },
                wynik: `$${n}$`,
                rozwiazanie: [`Krawędzi jest $2n$, więc $2n=${k}$.`, `$n=${k}:2=${n}$.`],
              };
            }
            const w = n + 1;
            const k = 2 * n;
            return {
              tresc: `Ostrosłup ma $${w}$ wierzchołków. Ile ma krawędzi?`,
              pola: [pole("w", "Krawędzie $=$")],
              odpowiedz: { w: q(k) },
              wynik: `$${k}$`,
              rozwiazanie: [`Wierzchołków jest $n+1$, więc $n+1=${w}$, czyli $n=${n}$.`, `Krawędzi jest $2n=2\\cdot${n}=${k}$.`],
            };
          },
        },
        {
          id: "wysokosc-ostroslupa",
          nazwa: "Wysokość ostrosłupa",
          opis: "Ostrosłup prawidłowy czworokątny. Z twierdzenia Pitagorasa oblicz wysokość ostrosłupa, wysokość ściany bocznej albo krawędź podstawy.",
          generuj(r) {
            const [p, H, h] = r.pick(TROJKI);
            const a = 2 * p;
            const kto = r.pick(["Dach wieżyczki", "Model piramidy", "Ostrosłup z papieru"]);
            const opis = `${kto} ma kształt ostrosłupa prawidłowego czworokątnego.`;
            const tryb = r.int(0, 2);
            const baza = `Wysokość ostrosłupa $H$, połowa krawędzi podstawy $a:2$ i wysokość ściany bocznej $h$ tworzą trójkąt prostokątny. Jego przeciwprostokątna to $h$: $H^2+(a:2)^2=h^2$.`;
            if (tryb === 0) {
              return {
                tresc: `${opis} Krawędź podstawy ma $${a}$ cm, a wysokość ściany bocznej $${h}$ cm. Ile centymetrów ma wysokość ostrosłupa?`,
                pola: [pole("w", "Wysokość $H$ (cm) $=$")],
                odpowiedz: { w: q(H) },
                wynik: `$${H}$ cm`,
                rozwiazanie: [baza, `Połowa krawędzi podstawy: $${a}:2=${p}$ cm.`, `$H^2=${h}^2-${p}^2=${h * h}-${p * p}=${H * H}$.`, `$H=${H}$ cm.`],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `${opis} Krawędź podstawy ma $${a}$ cm, a wysokość ostrosłupa $${H}$ cm. Ile centymetrów ma wysokość ściany bocznej?`,
                pola: [pole("w", "Wysokość ściany $h$ (cm) $=$")],
                odpowiedz: { w: q(h) },
                wynik: `$${h}$ cm`,
                rozwiazanie: [baza, `Połowa krawędzi podstawy: $${a}:2=${p}$ cm.`, `$h^2=${H}^2+${p}^2=${H * H}+${p * p}=${h * h}$.`, `$h=${h}$ cm.`],
              };
            }
            return {
              tresc: `${opis} Wysokość ostrosłupa ma $${H}$ cm, a wysokość ściany bocznej $${h}$ cm. Ile centymetrów ma krawędź podstawy?`,
              pola: [pole("w", "Krawędź podstawy $a$ (cm) $=$")],
              odpowiedz: { w: q(a) },
              wynik: `$${a}$ cm`,
              rozwiazanie: [baza, `$(a:2)^2=${h}^2-${H}^2=${h * h}-${H * H}=${p * p}$, więc $a:2=${p}$ cm.`, `Krawędź podstawy: $a=2\\cdot${p}=${a}$ cm.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Objętość i pole powierzchni ostrosłupa
    {
      id: "objetosc-i-pole-ostroslupa",
      nazwa: "Objętość i pole powierzchni ostrosłupa",
      sciaga: [
        {
          nazwa: "Objętość ostrosłupa",
          slownie: "Objętość ostrosłupa to jedna trzecia iloczynu pola podstawy i wysokości. Ostrosłup ma trzy razy mniejszą objętość niż graniastosłup o takiej samej podstawie i takiej samej wysokości.",
          tex: "V=\\frac{1}{3}\\cdot P_p\\cdot H",
          litery: "$V$ – objętość, $P_p$ – pole podstawy, $H$ – wysokość ostrosłupa.",
          przyklad: "Podstawa ma pole $36$ cm$^2$, a wysokość ostrosłupa to $5$ cm. Najpierw $36\\cdot5=180$, a potem $180:3=60$ cm$^3$.",
          uwaga: "Nie zapomnij o jednej trzeciej. Bez niej wychodzi objętość graniastosłupa.",
        },
        {
          nazwa: "Szukana wysokość",
          slownie: "Gdy znasz objętość ostrosłupa i pole podstawy, pomnóż objętość przez $3$ i podziel przez pole podstawy.",
          tex: "H=\\frac{3V}{P_p}",
          przyklad: "Objętość $48$ cm$^3$, pole podstawy $16$ cm$^2$. Wysokość: $3\\cdot48:16=144:16=9$ cm.",
          uwaga: "Mnożymy przez $3$, a nie dzielimy. Sprawdź wynik: $\\frac{1}{3}\\cdot16\\cdot9=48$.",
        },
        {
          nazwa: "Pole powierzchni ostrosłupa",
          slownie: "Pole całkowite to pole podstawy plus pola wszystkich trójkątnych ścian bocznych. W ostrosłupie prawidłowym czworokątnym są cztery takie same ściany.",
          tex: "P_c=P_p+P_b",
          litery: "$P_p$ – pole podstawy, $P_b$ – suma pól ścian bocznych.",
          przyklad: "Ostrosłup prawidłowy czworokątny: $a=6$ cm, ściana ma wysokość $h=5$ cm. Jedna ściana: $6\\cdot5:2=15$. Cztery: $60$. Podstawa: $36$. Razem $P_c=96$ cm$^2$.",
          uwaga: "Podstawa jest tylko jedna. Nie mnóż jej przez $2$ jak w graniastosłupie.",
        },
        {
          nazwa: "Dwie różne wysokości",
          slownie: "W ostrosłupie są dwie wysokości. Wysokość ostrosłupa $H$ wchodzi do wzoru na objętość. Wysokość ściany bocznej $h$ wchodzi do wzoru na pole ściany: $\\frac{a\\cdot h}{2}$.",
          przyklad: "Gdy $a=10$, $H=12$, $h=13$: objętość to $\\frac{1}{3}\\cdot100\\cdot12=400$, a jedna ściana ma pole $10\\cdot13:2=65$.",
          uwaga: "Do objętości bierzemy $H$, a do pola ściany bocznej $h$. Nie zamieniaj ich miejscami.",
        },
      ],
      jak: [
        "Zapisz dane i ustal, o którą wysokość chodzi: $H$ (ostrosłupa) czy $h$ (ściany bocznej).",
        "Jeśli jej brakuje, policz $H$ albo $h$ z twierdzenia Pitagorasa.",
        "Objętość: $V=\\frac{1}{3}P_pH$. Najpierw pomnóż, potem podziel przez $3$.",
        "Pole: policz pole jednej ściany bocznej, pomnóż przez liczbę ścian i dodaj pole podstawy.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Pole podstawy ostrosłupa to $30$ cm$^2$, a jego wysokość to $9$ cm. Jaka jest objętość tego ostrosłupa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$270$ cm$^3$", "$90$ cm$^3$", "$19$ cm$^3$", "$45$ cm$^3$"],
          poprawna: 1,
        },
        {
          nr: "30",
          tresc: "Ostrosłup prawidłowy czworokątny ma krawędź podstawy $6$ cm i wysokość $4$ cm. Jaka jest jego objętość? **Wybierz właściwą odpowiedź.**",
          opcje: ["$144$ cm$^3$", "$24$ cm$^3$", "$48$ cm$^3$", "$96$ cm$^3$"],
          poprawna: 2,
        },
        {
          nr: "31",
          tresc: "Graniastosłup i ostrosłup mają takie same podstawy i takie same wysokości. Objętość graniastosłupa to $60$ cm$^3$. Jaka jest objętość ostrosłupa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$20$ cm$^3$", "$180$ cm$^3$", "$30$ cm$^3$", "$60$ cm$^3$"],
          poprawna: 0,
        },
        {
          nr: "32",
          tresc: "Ostrosłup prawidłowy czworokątny ma krawędź podstawy $8$ cm, a wysokość ściany bocznej $5$ cm. Jakie jest pole powierzchni całkowitej? **Wybierz właściwą odpowiedź.**",
          opcje: ["$80$ cm$^2$", "$104$ cm$^2$", "$224$ cm$^2$", "$144$ cm$^2$"],
          poprawna: 3,
        },
        {
          nr: "33",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Objętość ostrosłupa jest równa polu podstawy razy wysokość.", litery: "PF", poprawna: 1 },
            { tekst: "Pole powierzchni bocznej ostrosłupa prawidłowego czworokątnego to cztery pola jednej ściany bocznej.", litery: "PF", poprawna: 0 },
            { tekst: "Jeśli wysokość ostrosłupa zwiększymy dwa razy, a podstawy nie zmienimy, to objętość też zwiększy się dwa razy.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 2,
          tresc: "Podstawą ostrosłupa jest prostokąt o bokach $9$ cm i $8$ cm, a wysokość ostrosłupa ma $10$ cm. O ile centymetrów sześciennych objętość tego ostrosłupa jest mniejsza od objętości prostopadłościanu o takiej samej podstawie i takiej samej wysokości? **Zapisz obliczenia.**",
          rozwiazanie: "Pole podstawy: $9\\cdot8=72$ cm$^2$.\n\nObjętość ostrosłupa: $\\frac{1}{3}\\cdot72\\cdot10=720:3=240$ cm$^3$.\n\nObjętość prostopadłościanu: $72\\cdot10=720$ cm$^3$.\n\nRóżnica: $720-240=480$ cm$^3$.\n\nOdpowiedź: Objętość ostrosłupa jest mniejsza o $480$ cm$^3$.",
        },
        {
          nr: "35",
          punkty: 4,
          tresc: "Ostrosłup prawidłowy czworokątny ma krawędź podstawy $10$ cm i wysokość $12$ cm. Oblicz wysokość jego ściany bocznej, pole powierzchni całkowitej i objętość. **Zapisz obliczenia.**",
          rozwiazanie: "Wysokość ściany $h$: trójkąt prostokątny o bokach $H=12$, $a:2=5$ i $h$.\n\n$h^2=12^2+5^2=144+25=169$, więc $h=13$ cm.\n\nPole jednej ściany bocznej: $10\\cdot13:2=65$ cm$^2$. Cztery ściany: $4\\cdot65=260$ cm$^2$.\n\nPole podstawy: $10\\cdot10=100$ cm$^2$. Pole całkowite: $100+260=360$ cm$^2$.\n\nObjętość: $\\frac{1}{3}\\cdot100\\cdot12=1200:3=400$ cm$^3$.\n\nOdpowiedź: Wysokość ściany to $13$ cm, pole całkowite to $360$ cm$^2$, a objętość to $400$ cm$^3$.",
        },
      ],
      generatory: [
        {
          id: "objetosc-ostroslupa",
          nazwa: "Objętość ostrosłupa",
          opis: "Ostrosłup o podstawie kwadratowej, prostokątnej albo trójkątnej. Oblicz objętość albo szukaną wysokość.",
          generuj(r) {
            return probuj(() => {
              const tryb = r.int(0, 2);
              let opis;
              let pp;
              let krokPp;
              if (tryb === 0) {
                const a = r.int(2, 12);
                pp = a * a;
                opis = `kwadrat o boku $${a}$ cm`;
                krokPp = `Pole podstawy: $${a}\\cdot${a}=${pp}$ cm$^2$.`;
              } else if (tryb === 1) {
                const a = r.int(2, 12);
                const b = r.int(2, 12);
                if (a === b) return null;
                pp = a * b;
                opis = `prostokąt o bokach $${a}$ cm i $${b}$ cm`;
                krokPp = `Pole podstawy: $${a}\\cdot${b}=${pp}$ cm$^2$.`;
              } else {
                const x = r.int(3, 12);
                const y = r.int(3, 12);
                if ((x * y) % 2 !== 0) return null;
                pp = (x * y) / 2;
                opis = `trójkąt prostokątny o przyprostokątnych $${x}$ cm i $${y}$ cm`;
                krokPp = `Pole podstawy: $${x}\\cdot${y}:2=${pp}$ cm$^2$.`;
              }
              const h = r.int(2, 15);
              if ((pp * h) % 3 !== 0) return null;
              const v = (pp * h) / 3;
              if (r.chance(0.65)) {
                return {
                  tresc: `Podstawą ostrosłupa jest ${opis}. Wysokość ostrosłupa ma $${h}$ cm. Oblicz objętość tego ostrosłupa.`,
                  pola: [pole("w", "Objętość (cm$^3$) $=$")],
                  odpowiedz: { w: q(v) },
                  wynik: `$${v}$ cm$^3$`,
                  rozwiazanie: [krokPp, `Najpierw $P_p\\cdot H=${pp}\\cdot${h}=${pp * h}$.`, `Objętość: $V=${pp * h}:3=${v}$ cm$^3$.`],
                };
              }
              return {
                tresc: `Podstawą ostrosłupa jest ${opis}. Objętość ostrosłupa to $${v}$ cm$^3$. Ile centymetrów ma wysokość ostrosłupa?`,
                pola: [pole("w", "Wysokość (cm) $=$")],
                odpowiedz: { w: q(h) },
                wynik: `$${h}$ cm`,
                rozwiazanie: [krokPp, `Wzór $H=3V:P_p$. Liczymy $3\\cdot${v}=${3 * v}$.`, `$H=${3 * v}:${pp}=${h}$ cm.`],
              };
            });
          },
        },
        {
          id: "pole-ostroslupa",
          nazwa: "Pole ostrosłupa",
          opis: "Ostrosłup prawidłowy czworokątny. Oblicz pole powierzchni bocznej lub całkowitej (czasem najpierw trzeba policzyć wysokość ściany).",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 2) {
              const [p, H, h] = r.pick(TROJKI);
              const a = 2 * p;
              const sciana = (a * h) / 2;
              const pb = 4 * sciana;
              const pc = a * a + pb;
              return {
                tresc: `Ostrosłup prawidłowy czworokątny ma krawędź podstawy $${a}$ cm i wysokość $${H}$ cm. Oblicz pole powierzchni całkowitej.`,
                pola: [pole("w", "Pole całkowite (cm$^2$) $=$")],
                odpowiedz: { w: q(pc) },
                wynik: `$${pc}$ cm$^2$`,
                rozwiazanie: [
                  `Wysokość ściany bocznej: $h^2=${H}^2+${p}^2=${H * H + p * p}$, więc $h=${h}$ cm.`,
                  `Jedna ściana: $${a}\\cdot${h}:2=${sciana}$ cm$^2$. Cztery ściany: $${pb}$ cm$^2$.`,
                  `$P_c=${a}\\cdot${a}+${pb}=${a * a}+${pb}=${pc}$ cm$^2$.`,
                ],
              };
            }
            const a = 2 * r.int(2, 9);
            const h = r.int(Math.floor(a / 2) + 1, a / 2 + 9);
            const sciana = (a * h) / 2;
            const pb = 4 * sciana;
            const kroki = [`Jedna ściana boczna: $${a}\\cdot${h}:2=${sciana}$ cm$^2$.`, `Cztery ściany: $4\\cdot${sciana}=${pb}$ cm$^2$.`];
            if (tryb === 0) {
              return {
                tresc: `Ostrosłup prawidłowy czworokątny ma krawędź podstawy $${a}$ cm, a wysokość ściany bocznej $${h}$ cm. Oblicz pole powierzchni bocznej.`,
                pola: [pole("w", "Pole boczne (cm$^2$) $=$")],
                odpowiedz: { w: q(pb) },
                wynik: `$${pb}$ cm$^2$`,
                rozwiazanie: kroki,
              };
            }
            const pc = a * a + pb;
            return {
              tresc: `Ostrosłup prawidłowy czworokątny ma krawędź podstawy $${a}$ cm, a wysokość ściany bocznej $${h}$ cm. Oblicz pole powierzchni całkowitej.`,
              pola: [pole("w", "Pole całkowite (cm$^2$) $=$")],
              odpowiedz: { w: q(pc) },
              wynik: `$${pc}$ cm$^2$`,
              rozwiazanie: [...kroki, `Pole podstawy: $${a}\\cdot${a}=${a * a}$ cm$^2$.`, `$P_c=${a * a}+${pb}=${pc}$ cm$^2$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Graniastosłupy i ostrosłupy, bryły – zadania
    {
      id: "bryly-zadania",
      nazwa: "Bryły – zadania",
      sciaga: [
        {
          nazwa: "Wzory na jednej kartce",
          slownie: "Graniastosłup: objętość to pole podstawy razy wysokość. Ostrosłup: to samo, ale jedna trzecia. Pole całkowite graniastosłupa ma dwie podstawy, ostrosłupa ma jedną.",
          tex: "V_{gr}=P_p\\cdot H\\qquad V_{os}=\\frac{1}{3}P_p\\cdot H",
          litery: "$P_c=2P_p+P_b$ dla graniastosłupa, $P_c=P_p+P_b$ dla ostrosłupa.",
          przyklad: "Podstawa ma pole $12$ cm$^2$, wysokość $6$ cm. Graniastosłup: $V=72$ cm$^3$. Ostrosłup: $V=24$ cm$^3$.",
          uwaga: "Przed liczeniem ustal, czy to graniastosłup, czy ostrosłup.",
        },
        {
          nazwa: "Pole albo objętość",
          slownie: "Pole mówi, ile trzeba materiału na powierzchnię bryły (papieru, farby, szkła) i jest w cm$^2$ albo m$^2$. Objętość mówi, ile bryła mieści (wody, piasku) i jest w cm$^3$, dm$^3$ albo m$^3$.",
          przyklad: "Ile blachy na dach? To pole. Ile wody w basenie? To objętość.",
          uwaga: "Jednostki pomogą sprawdzić wynik: sześcienne to objętość, kwadratowe to pole.",
        },
        {
          nazwa: "Bryła z kilku brył",
          slownie: "Gdy bryła składa się z dwóch części (np. dom i dach), liczymy każdą część osobno i objętości dodajemy. Gdy z bryły coś wycięto, objętość odejmujemy.",
          przyklad: "Kostka $6\\times6\\times5$ cm z dachem w kształcie ostrosłupa o wysokości $4$ cm: $180+48=228$ cm$^3$.",
          uwaga: "Przy objętości wystarczy dodać części. Przy polu powierzchni nie wolno liczyć ścian, które się stykają i są ukryte w środku.",
        },
        {
          nazwa: "Gdy krawędź rośnie",
          slownie: "Gdy każdą krawędź sześcianu zwiększymy $2$ razy, pole powierzchni wzrośnie $4$ razy, a objętość $8$ razy. Najlepiej policzyć oba przypadki na liczbach.",
          przyklad: "Krawędź $3$ cm: $V=27$, $P_c=54$. Krawędź $6$ cm: $V=216$, $P_c=216$. Objętość jest $216:27=8$ razy większa.",
          uwaga: "Dwa razy dłuższa krawędź nie daje dwa razy większej objętości.",
        },
      ],
      jak: [
        "Przeczytaj zadanie i ustal, o jaką bryłę chodzi. Zapisz dane z jednostkami.",
        "Zdecyduj, czy pytają o pole, czy o objętość, i czy bryła ma wszystkie ściany.",
        "Jeśli brakuje którejś wysokości, policz ją z twierdzenia Pitagorasa.",
        "Policz i zapisz wynik z właściwą jednostką. Zamień jednostki (np. na litry), jeśli trzeba.",
      ],
      zadania: [
        {
          nr: "36",
          tresc: "Basen ma kształt prostopadłościanu o wymiarach $5$ m, $4$ m i $2$ m (głębokość). Wlano tyle wody, że basen jest napełniony do połowy głębokości. Ile litrów wody wlano? **Wybierz właściwą odpowiedź.**",
          opcje: ["$20$ l", "$200$ l", "$2000$ l", "$20000$ l"],
          poprawna: 3,
        },
        {
          nr: "37",
          tresc: "Klocek ma kształt graniastosłupa prawidłowego czworokątnego o krawędzi podstawy $3$ cm i wysokości $10$ cm. Ile centymetrów kwadratowych papieru potrzeba, żeby okleić tylko cztery ściany boczne? **Wybierz właściwą odpowiedź.**",
          opcje: ["$90$ cm$^2$", "$120$ cm$^2$", "$138$ cm$^2$", "$300$ cm$^2$"],
          poprawna: 1,
        },
        {
          nr: "38",
          tresc: "Dach wieżyczki ma kształt ostrosłupa prawidłowego czworokątnego (bez podstawy). Krawędź podstawy ma $6$ m, a wysokość ściany bocznej $5$ m. Ile metrów kwadratowych blachy potrzeba na ten dach? **Wybierz właściwą odpowiedź.**",
          opcje: ["$60$ m$^2$", "$96$ m$^2$", "$120$ m$^2$", "$30$ m$^2$"],
          poprawna: 0,
        },
        {
          nr: "39",
          tresc: "Sześcian ma krawędź $6$ cm. Ostrosłup prawidłowy czworokątny ma w podstawie kwadrat o boku $6$ cm i wysokość $6$ cm. Ile razy objętość ostrosłupa jest mniejsza od objętości sześcianu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$ razy", "$4$ razy", "$3$ razy", "$6$ razy"],
          poprawna: 2,
        },
        {
          nr: "40",
          tresc: "Krawędź sześcianu zwiększono z $3$ cm do $6$ cm. Ile razy większa jest objętość nowego sześcianu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$ razy", "$2$ razy", "$4$ razy", "$6$ razy"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "41",
          punkty: 3,
          tresc: "Domek z kartonu składa się z prostopadłościanu o podstawie kwadratowej $6$ cm na $6$ cm i wysokości $5$ cm oraz dachu. Dach ma kształt ostrosłupa prawidłowego czworokątnego, którego podstawą jest górna ściana prostopadłościanu, a wysokość ma $4$ cm. Oblicz objętość całego domku. **Zapisz obliczenia.**",
          rozwiazanie: "Pole podstawy: $6\\cdot6=36$ cm$^2$.\n\nObjętość prostopadłościanu: $36\\cdot5=180$ cm$^3$.\n\nObjętość dachu: $\\frac{1}{3}\\cdot36\\cdot4=144:3=48$ cm$^3$.\n\nRazem: $180+48=228$ cm$^3$.\n\nOdpowiedź: Objętość domku to $228$ cm$^3$.",
        },
        {
          nr: "42",
          punkty: 4,
          tresc: "Pole podstawy ostrosłupa prawidłowego czworokątnego jest równe $64$ cm$^2$, a wysokość jego ściany bocznej ma $5$ cm. Oblicz objętość tego ostrosłupa. **Zapisz obliczenia.**",
          rozwiazanie: "Podstawą jest kwadrat o polu $64$ cm$^2$, więc krawędź podstawy to $a=8$ cm, bo $8\\cdot8=64$.\n\nPołowa krawędzi podstawy: $8:2=4$ cm.\n\nWysokość ostrosłupa $H$, połowa krawędzi $4$ cm i wysokość ściany $5$ cm tworzą trójkąt prostokątny: $H^2+4^2=5^2$.\n\n$H^2=25-16=9$, więc $H=3$ cm.\n\nObjętość: $\\frac{1}{3}\\cdot64\\cdot3=64$ cm$^3$.\n\nOdpowiedź: Objętość ostrosłupa to $64$ cm$^3$.",
        },
      ],
      generatory: [
        {
          id: "domek-z-dachem",
          nazwa: "Bryła złożona",
          opis: "Prostopadłościan z dachem w kształcie ostrosłupa albo prostopadłościan z wyciętym ostrosłupem. Oblicz objętość.",
          generuj(r) {
            return probuj(() => {
              const a = r.int(3, 9);
              const h1 = r.int(2, 8);
              const h2 = r.int(2, 9);
              const pp = a * a;
              if ((pp * h2) % 3 !== 0) return null;
              const ost = (pp * h2) / 3;
              if (r.chance(0.55)) {
                const kost = pp * h1;
                const v = kost + ost;
                return {
                  tresc: `Domek składa się z prostopadłościanu o podstawie kwadratowej $${a}$ cm na $${a}$ cm i wysokości $${h1}$ cm oraz dachu. Dach ma kształt ostrosłupa prawidłowego czworokątnego o tej samej podstawie i wysokości $${h2}$ cm. Oblicz objętość całego domku.`,
                  pola: [pole("w", "Objętość (cm$^3$) $=$")],
                  odpowiedz: { w: q(v) },
                  wynik: `$${v}$ cm$^3$`,
                  rozwiazanie: [`Prostopadłościan: $${pp}\\cdot${h1}=${kost}$ cm$^3$.`, `Dach: $\\frac{1}{3}\\cdot${pp}\\cdot${h2}=${ost}$ cm$^3$.`, `Razem: $${kost}+${ost}=${v}$ cm$^3$.`],
                };
              }
              const kost = pp * h2;
              const v = kost - ost;
              return {
                tresc: `Z drewnianego prostopadłościanu o podstawie kwadratowej $${a}$ cm na $${a}$ cm i wysokości $${h2}$ cm wycięto ostrosłup prawidłowy czworokątny. Ostrosłup ma tę samą podstawę (dolną ścianę prostopadłościanu) i tę samą wysokość co prostopadłościan. Ile centymetrów sześciennych drewna zostało?`,
                pola: [pole("w", "Drewno (cm$^3$) $=$")],
                odpowiedz: { w: q(v) },
                wynik: `$${v}$ cm$^3$`,
                rozwiazanie: [`Prostopadłościan: $${pp}\\cdot${h2}=${kost}$ cm$^3$.`, `Ostrosłup: $\\frac{1}{3}\\cdot${pp}\\cdot${h2}=${ost}$ cm$^3$.`, `Zostało: $${kost}-${ost}=${v}$ cm$^3$.`],
              };
            });
          },
        },
        {
          id: "wzrost-szescianu",
          nazwa: "Krawędź rośnie",
          opis: "Krawędź sześcianu zwiększamy kilka razy. Policz, jak zmienia się objętość i pole powierzchni.",
          generuj(r) {
            const a = r.int(2, 5);
            const k = r.int(2, 4);
            const b = a * k;
            const tryb = r.int(0, 2);
            const baza = `Sześcian o krawędzi $${a}$ cm: $V=${a}^3=${a ** 3}$ cm$^3$. Sześcian o krawędzi $${b}$ cm: $V=${b}^3=${b ** 3}$ cm$^3$.`;
            if (tryb === 0) {
              return {
                tresc: `Krawędź sześcianu zwiększono z $${a}$ cm do $${b}$ cm. Ile razy większa jest objętość nowego sześcianu?`,
                pola: [pole("w", "Objętość jest razy większa $=$")],
                odpowiedz: { w: q(k ** 3) },
                wynik: `$${k ** 3}$ razy`,
                rozwiazanie: [baza, `Dzielimy: $${b ** 3}:${a ** 3}=${k ** 3}$.`],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Krawędź sześcianu zwiększono z $${a}$ cm do $${b}$ cm. Ile razy większe jest pole powierzchni całkowitej nowego sześcianu?`,
                pola: [pole("w", "Pole jest razy większe $=$")],
                odpowiedz: { w: q(k ** 2) },
                wynik: `$${k ** 2}$ razy`,
                rozwiazanie: [`Sześcian o krawędzi $${a}$ cm: $P_c=6\\cdot${a}^2=${6 * a * a}$ cm$^2$. Sześcian o krawędzi $${b}$ cm: $P_c=6\\cdot${b}^2=${6 * b * b}$ cm$^2$.`, `Dzielimy: $${6 * b * b}:${6 * a * a}=${k ** 2}$.`],
              };
            }
            return {
              tresc: `Krawędź sześcianu zwiększono z $${a}$ cm do $${b}$ cm. O ile centymetrów sześciennych zwiększyła się objętość?`,
              pola: [pole("w", "Przyrost objętości (cm$^3$) $=$")],
              odpowiedz: { w: q(b ** 3 - a ** 3) },
              wynik: `$${b ** 3 - a ** 3}$ cm$^3$`,
              rozwiazanie: [baza, `Różnica: $${b ** 3}-${a ** 3}=${b ** 3 - a ** 3}$ cm$^3$.`],
            };
          },
        },
      ],
    },
  ],
};
