// Klasa 3 (liceum i technikum) · rozdział 5 „Geometria płaska – pole czworokąta” – Matematyka 3, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** Trójki pitagorejskie (a, b, c) w najprostszej postaci. */
const TROJKI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]];

/** Liczba całkowita w LaTeX: od 5 cyfr z cienką spacją tysięcy (12\,500). */
const lc = (n) => (Math.abs(n) >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : String(n));

/** Liczba wymierna jako liczba dziesiętna z przecinkiem (tylko mianowniki 2, 4, 5, 10), inaczej ułamek. */
const dz = (v) => {
  if (v.calkowita) return lc(v.n);
  if (![2, 4, 5, 10].includes(v.d)) return v.tex();
  return String(v.n / v.d).replace(".", "{,}");
};

/** Skala mapy 1:n w LaTeX. */
const skala = (n) => `1:${lc(n)}`;

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 5.1
    {
      id: "prostokat",
      nazwa: "Pole prostokąta. Pole kwadratu",
      sciaga: [
        {
          nazwa: "Pole prostokąta",
          slownie: "Pole prostokąta to iloczyn długości dwóch sąsiednich boków. Obwód to suma długości wszystkich boków.",
          tex: "P=ab\\qquad O=2a+2b",
          litery: "$a$, $b$ – długości sąsiednich boków prostokąta.",
          przyklad: "Dla boków $7$ i $4$: $P = 7\\cdot 4 = 28$, $O = 2\\cdot 7 + 2\\cdot 4 = 22$.",
          uwaga: "Pole mierzymy w jednostkach kwadratowych ($\\text{cm}^2$, $\\text{m}^2$), obwód w zwykłych ($\\text{cm}$, $\\text{m}$). Przed mnożeniem zamień boki na tę samą jednostkę.",
        },
        {
          nazwa: "Pole kwadratu",
          slownie: "Pole kwadratu to kwadrat długości boku. Gdy znasz przekątną, pole jest równe połowie jej kwadratu.",
          tex: "P=a^2\\qquad P=\\frac{d^2}{2}",
          litery: "$a$ – bok kwadratu, $d$ – jego przekątna ($d = a\\sqrt{2}$).",
          przyklad: "Dla $d = 6\\sqrt{2}$: $P = \\frac{(6\\sqrt{2})^2}{2} = \\frac{72}{2} = 36$, więc bok ma długość $6$.",
          uwaga: "Przekątna kwadratu ma długość $a\\sqrt{2}$, a nie $2a$.",
        },
        {
          nazwa: "Przekątna prostokąta",
          slownie: "Przekątna prostokąta jest przeciwprostokątną trójkąta o przyprostokątnych $a$ i $b$, więc liczymy ją z twierdzenia Pitagorasa.",
          tex: "d^2=a^2+b^2",
          litery: "$a$, $b$ – boki prostokąta, $d$ – jego przekątna.",
          przyklad: "Dla boków $9$ i $12$: $d = \\sqrt{81 + 144} = 15$, a pole to $9\\cdot 12 = 108$.",
          uwaga: "Przekątna nie jest sumą boków: $d \\neq a + b$.",
        },
        {
          nazwa: "Jednostki pola",
          slownie: "Jednostka pola to kwadrat o boku równym jednostce długości, dlatego przelicznik jest podniesiony do kwadratu.",
          tex: "1\\,\\text{m}^2=10\\,000\\,\\text{cm}^2\\qquad 1\\,\\text{ha}=10\\,000\\,\\text{m}^2\\qquad 1\\,\\text{km}^2=100\\,\\text{ha}",
          przyklad: "$2{,}5\\ \\text{m}^2 = 2{,}5\\cdot 10\\,000\\ \\text{cm}^2 = 25\\,000\\ \\text{cm}^2$.",
          uwaga: "$1\\ \\text{m}^2$ to $100\\cdot 100 = 10\\,000\\ \\text{cm}^2$, a nie $100\\ \\text{cm}^2$.",
        },
      ],
      jak: [
        "Zamień wszystkie długości na tę samą jednostkę.",
        "Jeśli brakuje boku, policz go z obwodu albo z twierdzenia Pitagorasa.",
        "Wstaw do wzoru $P = ab$ (dla kwadratu $P = a^2$) i sprawdź jednostkę wyniku.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Obwód prostokąta jest równy $30$, a jeden z jego boków ma długość $9$. Pole tego prostokąta jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$135$", "$81$", "$54$", "$270$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Przekątna kwadratu ma długość $10$. Pole tego kwadratu jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$100$", "$50\\sqrt{2}$", "$25$", "$50$"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "Prostokąt ma boki długości $8$ cm i $2{,}5$ dm. Pole tego prostokąta jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$20\\ \\text{cm}^2$", "$200\\ \\text{cm}^2$", "$2000\\ \\text{cm}^2$", "$20{,}5\\ \\text{cm}^2$"],
          poprawna: 1,
        },
        {
          nr: "4",
          tresc: "Pole prostokąta jest równe $60$, a jeden z jego boków ma długość $12$. Przekątna tego prostokąta ma długość: **Wybierz właściwą odpowiedź.**",
          opcje: ["$17$", "$13$", "$\\sqrt{60}$", "$\\sqrt{119}$"],
          poprawna: 1,
        },
        {
          nr: "5",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Kwadrat o obwodzie $20$ ma pole $25$.", litery: "PF", poprawna: 0 },
            { tekst: "$1\\ \\text{m}^2 = 100\\ \\text{cm}^2$", litery: "PF", poprawna: 1 },
            { tekst: "Prostokąt o bokach $4$ i $9$ ma takie samo pole jak kwadrat o boku $6$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 3,
          tresc: "Jeden bok prostokąta jest o $4$ dłuższy od drugiego, a pole prostokąta jest równe $60$. Oblicz obwód tego prostokąta. **Zapisz obliczenia.**",
          rozwiazanie: "Niech $x$ będzie długością krótszego boku. Wtedy drugi bok ma długość $x + 4$ i $x(x + 4) = 60$.\n\nPo przekształceniu: $x^2 + 4x - 60 = 0$, $\\Delta = 16 + 240 = 256$, $\\sqrt{\\Delta} = 16$.\n\n$x = \\frac{-4 - 16}{2} = -10$ (odpada, bo długość jest dodatnia) albo $x = \\frac{-4 + 16}{2} = 6$.\n\nBoki mają długości $6$ i $10$, więc $O = 2\\cdot(6 + 10) = 32$.\n\nOdpowiedź: obwód prostokąta jest równy $32$.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Pole kwadratu jest równe $50$. Oblicz długość przekątnej i obwód tego kwadratu. **Zapisz obliczenia.**",
          rozwiazanie: "Z $a^2 = 50$ dostajemy bok $a = \\sqrt{50} = 5\\sqrt{2}$.\n\nPrzekątna: $d = a\\sqrt{2} = 5\\sqrt{2}\\cdot\\sqrt{2} = 10$ (albo ze wzoru $P = \\frac{d^2}{2}$: $d^2 = 100$).\n\nObwód: $O = 4a = 4\\cdot 5\\sqrt{2} = 20\\sqrt{2}$.\n\nOdpowiedź: przekątna ma długość $10$, a obwód jest równy $20\\sqrt{2}$.",
        },
      ],
      generatory: [
        {
          id: "prostokat-pole",
          nazwa: "Pole prostokąta i kwadratu",
          opis: "Oblicz pole prostokąta lub kwadratu z obwodu, przekątnej albo z boku i przekątnej.",
          generuj(r) {
            const tryb = r.int(0, 3);
            const pole = (v) => ({ pola: [{ id: "p", typ: "liczba", etykieta: "$P =$" }], odpowiedz: { p: q(v) }, wynik: `$P = ${v}$` });
            if (tryb === 0) {
              const a = r.int(3, 15);
              const b = r.intBez(2, 12, a);
              const o = 2 * (a + b);
              return {
                tresc: `Obwód prostokąta jest równy $${o}$, a jeden z jego boków ma długość $${a}$. Oblicz pole tego prostokąta.`,
                ...pole(a * b),
                rozwiazanie: [
                  `Suma długości dwóch sąsiednich boków to połowa obwodu: $${o} : 2 = ${a + b}$.`,
                  `Drugi bok ma długość $${a + b} - ${a} = ${b}$.`,
                  `Pole: $P = ${a}\\cdot ${b} = ${a * b}$.`,
                ],
              };
            }
            if (tryb === 1) {
              const a = r.int(2, 12);
              return {
                tresc: `Przekątna kwadratu ma długość $${a}\\sqrt{2}$. Oblicz pole tego kwadratu.`,
                ...pole(a * a),
                rozwiazanie: [
                  "Pole kwadratu o przekątnej $d$ jest równe $P = \\frac{d^2}{2}$.",
                  `$d^2 = (${a}\\sqrt{2})^2 = ${a * a}\\cdot 2 = ${2 * a * a}$.`,
                  `$P = \\frac{${2 * a * a}}{2} = ${a * a}$.`,
                ],
              };
            }
            if (tryb === 2) {
              const [p, s, c0] = r.pick(TROJKI);
              const k = r.int(1, 3);
              const [x, y] = r.chance() ? [p * k, s * k] : [s * k, p * k];
              const d = c0 * k;
              return {
                tresc: `W prostokącie jeden z boków ma długość $${x}$, a przekątna ma długość $${d}$. Oblicz pole tego prostokąta.`,
                ...pole(x * y),
                rozwiazanie: [
                  `Przekątna i dwa boki tworzą trójkąt prostokątny. Drugi bok: $\\sqrt{${d}^2 - ${x}^2} = ${y}$.`,
                  `Pole: $P = ${x}\\cdot ${y} = ${x * y}$.`,
                ],
              };
            }
            const a = r.int(3, 15);
            return {
              tresc: `Obwód kwadratu jest równy $${4 * a}$. Oblicz pole tego kwadratu.`,
              ...pole(a * a),
              rozwiazanie: [
                `Kwadrat ma cztery równe boki, więc $a = ${4 * a} : 4 = ${a}$.`,
                `Pole: $P = a^2 = ${a}^2 = ${a * a}$.`,
              ],
            };
          },
        },
        {
          id: "prostokat-jednostki",
          nazwa: "Jednostki pola",
          opis: "Zamień jednostki pola: $\\text{m}^2$ na $\\text{cm}^2$, ha na $\\text{m}^2$, $\\text{km}^2$ na ha i z powrotem.",
          generuj(r) {
            const J = [
              { z: "\\text{m}^2", do: "\\text{cm}^2", f: 10000 },
              { z: "\\text{ha}", do: "\\text{m}^2", f: 10000 },
              { z: "\\text{km}^2", do: "\\text{ha}", f: 100 },
            ];
            const W = [q(1, 2), q(1), q(3, 2), q(2), q(5, 2), q(3), q(4), q(5), q(6), q(7), q(8), q(9)];
            const j = r.pick(J);
            const w = r.pick(W);
            const przelicznik = `$1\\ ${j.z} = ${lc(j.f)}\\ ${j.do}$`;
            if (r.chance()) {
              const wynik = w.mul(j.f);
              return {
                tresc: `Wyraź $${dz(w)}\\ ${j.z}$ w jednostkach $${j.do}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Liczba $${j.do}$` }],
                odpowiedz: { w: wynik },
                wynik: `$${dz(w)}\\ ${j.z} = ${dz(wynik)}\\ ${j.do}$`,
                rozwiazanie: [
                  `Przelicznik: ${przelicznik}.`,
                  `Mnożymy: $${dz(w)}\\cdot ${lc(j.f)} = ${dz(wynik)}$.`,
                ],
              };
            }
            const razem = w.mul(j.f);
            return {
              tresc: `Wyraź $${dz(razem)}\\ ${j.do}$ w jednostkach $${j.z}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: `Liczba $${j.z}$` }],
              odpowiedz: { w },
              wynik: `$${dz(razem)}\\ ${j.do} = ${dz(w)}\\ ${j.z}$`,
              rozwiazanie: [
                `Przelicznik: ${przelicznik}.`,
                `Dzielimy: $${dz(razem)} : ${lc(j.f)} = ${dz(w)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5.2
    {
      id: "rownoleglobok",
      nazwa: "Pole równoległoboku. Pole rombu",
      sciaga: [
        {
          nazwa: "Pole równoległoboku",
          slownie: "Pole równoległoboku to iloczyn boku i wysokości opuszczonej na ten bok. Gdy znasz kąt między bokami, użyj sinusa.",
          tex: "P=a\\cdot h\\qquad P=ab\\sin\\alpha",
          litery: "$a$ – bok, $h$ – wysokość opuszczona na bok $a$, $b$ – drugi bok, $\\alpha$ – kąt między bokami $a$ i $b$.",
          przyklad: "Dla $a = 10$, $h = 4$: $P = 40$. Dla boków $6$ i $8$ i kąta $30^\\circ$: $P = 6\\cdot 8\\cdot\\frac{1}{2} = 24$.",
          uwaga: "Wysokość nie jest bokiem: $P \\neq ab$, chyba że równoległobok jest prostokątem. Kąty $\\alpha$ i $180^\\circ - \\alpha$ mają ten sam sinus.",
        },
        {
          nazwa: "Dwie wysokości",
          slownie: "Pole równoległoboku można policzyć z każdego z dwóch boków. Dłuższy bok ma krótszą wysokość.",
          tex: "P=a\\cdot h_a=b\\cdot h_b",
          litery: "$h_a$, $h_b$ – wysokości opuszczone na boki $a$ i $b$.",
          przyklad: "Dla boków $10$ i $6$ i wysokości $h_a = 3$ na bok $10$: $P = 30$, więc $h_b = 30 : 6 = 5$.",
        },
        {
          nazwa: "Pole rombu",
          slownie: "Romb jest równoległobokiem o równych bokach, więc ma wzór równoległoboku. Dodatkowo pole to połowa iloczynu przekątnych.",
          tex: "P=a\\cdot h\\qquad P=a^2\\sin\\alpha\\qquad P=\\frac{ef}{2}",
          litery: "$a$ – bok rombu, $h$ – wysokość, $\\alpha$ – kąt rombu, $e$, $f$ – przekątne.",
          przyklad: "Dla przekątnych $10$ i $24$: $P = \\frac{10\\cdot 24}{2} = 120$.",
          uwaga: "Wzór $P = \\frac{ef}{2}$ nie obowiązuje dla każdego równoległoboku, tylko dla rombu (i innych czworokątów o prostopadłych przekątnych).",
        },
        {
          nazwa: "Bok rombu z przekątnych",
          slownie: "Przekątne rombu są prostopadłe i dzielą się na połowy. Bok rombu jest więc przeciwprostokątną trójkąta o przyprostokątnych $\\frac{e}{2}$ i $\\frac{f}{2}$.",
          tex: "a^2=\\left(\\frac{e}{2}\\right)^2+\\left(\\frac{f}{2}\\right)^2",
          litery: "$a$ – bok rombu, $e$, $f$ – jego przekątne.",
          przyklad: "Dla przekątnych $6$ i $8$: $a = \\sqrt{3^2 + 4^2} = 5$.",
          uwaga: "Do wzoru wstawiamy połowy przekątnych, a nie całe przekątne.",
        },
      ],
      jak: [
        "Sprawdź, co jest dane: bok i wysokość, dwa boki i kąt, czy przekątne.",
        "Wybierz wzór: $P = ah$, $P = ab\\sin\\alpha$ albo $P = \\frac{ef}{2}$ (tylko romb).",
        "Brakującą przekątną rombu lub wysokość policz z twierdzenia Pitagorasa albo z równości pól.",
        "Podstaw dane i sprawdź, czy wynik jest sensowny (np. wysokość nie jest dłuższa od boku).",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Dwa boki równoległoboku mają długości $12$ i $5$, a kąt między nimi ma miarę $30^\\circ$. Pole tego równoległoboku jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$30$", "$60$", "$15$", "$30\\sqrt{3}$"],
          poprawna: 0,
        },
        {
          nr: "9",
          tresc: "Przekątne rombu mają długości $14$ i $9$. Pole tego rombu jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$126$", "$63$", "$23$", "$31{,}5$"],
          poprawna: 1,
        },
        {
          nr: "10",
          tresc: "Pole rombu jest równe $96$, a jedna z jego przekątnych ma długość $12$. Druga przekątna ma długość: **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$", "$32$", "$16$", "$84$"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "W równoległoboku o bokach $15$ i $9$ wysokość opuszczona na dłuższy bok ma długość $6$. Wysokość opuszczona na krótszy bok jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$3{,}6$", "$9$", "$15$", "$10$"],
          poprawna: 3,
        },
        {
          nr: "12",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Romb o boku $10$ i kącie ostrym $30^\\circ$ ma pole równe $50$.", litery: "PF", poprawna: 0 },
            { tekst: "Równoległobok o bokach $6$ i $7$ zawsze ma pole równe $42$.", litery: "PF", poprawna: 1 },
            { tekst: "Romb o przekątnych $6$ i $8$ ma bok długości $5$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 3,
          tresc: "Bok rombu ma długość $13$, a jedna z jego przekątnych ma długość $10$. Oblicz pole tego rombu i jego wysokość. **Zapisz obliczenia.**",
          rozwiazanie: "Przekątne rombu są prostopadłe i dzielą się na połowy. Połowa danej przekątnej ma długość $5$.\n\nPołowa drugiej przekątnej: $\\sqrt{13^2 - 5^2} = \\sqrt{144} = 12$, więc druga przekątna ma długość $24$.\n\nPole: $P = \\frac{10\\cdot 24}{2} = 120$.\n\nZ $P = a\\cdot h$ dostajemy $h = \\frac{120}{13}$.\n\nOdpowiedź: pole rombu jest równe $120$, a wysokość $\\frac{120}{13}$.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Boki równoległoboku mają długości $8$ i $12$, a jego kąt ostry ma miarę $60^\\circ$. Oblicz pole tego równoległoboku oraz długości obu wysokości. **Zapisz obliczenia.**",
          rozwiazanie: "Pole: $P = 8\\cdot 12\\cdot\\sin 60^\\circ = 96\\cdot\\frac{\\sqrt{3}}{2} = 48\\sqrt{3}$.\n\nWysokość opuszczona na bok $12$: $h_{12} = \\frac{48\\sqrt{3}}{12} = 4\\sqrt{3}$.\n\nWysokość opuszczona na bok $8$: $h_8 = \\frac{48\\sqrt{3}}{8} = 6\\sqrt{3}$.\n\nOdpowiedź: $P = 48\\sqrt{3}$, wysokości mają długości $4\\sqrt{3}$ i $6\\sqrt{3}$.",
        },
      ],
      generatory: [
        {
          id: "rownoleglobok-pole",
          nazwa: "Pole równoległoboku",
          opis: "Pole równoległoboku z boku i wysokości, z boków i kąta albo wysokość z pola i drugiej wysokości.",
          generuj(r) {
            const tryb = r.int(0, 4);
            const lit = { id: "p", typ: "liczba", etykieta: "$P =$" };
            if (tryb === 0) {
              const a = r.int(4, 16), h = r.int(2, 12);
              return {
                tresc: `Jeden z boków równoległoboku ma długość $${a}$, a wysokość opuszczona na ten bok ma długość $${h}$. Oblicz pole tego równoległoboku.`,
                pola: [lit],
                odpowiedz: { p: q(a * h) },
                wynik: `$P = ${a * h}$`,
                rozwiazanie: ["Pole równoległoboku to iloczyn boku i wysokości na niego opuszczonej.", `$P = ${a}\\cdot ${h} = ${a * h}$.`],
              };
            }
            if (tryb === 1) {
              const a = r.int(4, 16), b = r.int(3, 14), kat = r.pick([30, 150]);
              const p = q(a * b, 2);
              return {
                tresc: `Boki równoległoboku mają długości $${a}$ i $${b}$, a kąt między nimi ma miarę $${kat}^\\circ$. Oblicz pole tego równoległoboku.`,
                pola: [lit],
                odpowiedz: { p },
                wynik: `$P = ${dz(p)}$`,
                rozwiazanie: [
                  "Pole równoległoboku: $P = ab\\sin\\alpha$.",
                  kat === 30 ? "$\\sin 30^\\circ = \\frac{1}{2}$." : "$\\sin 150^\\circ = \\sin(180^\\circ - 150^\\circ) = \\sin 30^\\circ = \\frac{1}{2}$.",
                  `$P = ${a}\\cdot ${b}\\cdot\\frac{1}{2} = ${dz(p)}$.`,
                ],
              };
            }
            if (tryb === 2) {
              const a = r.int(4, 16), b = r.int(3, 14), kat = r.pick([60, 120]);
              const k = q(a * b, 2);
              return {
                tresc: `Boki równoległoboku mają długości $${a}$ i $${b}$, a kąt między nimi ma miarę $${kat}^\\circ$. Pole tego równoległoboku jest równe $k\\sqrt{3}$. Oblicz $k$.`,
                pola: [{ id: "k", typ: "liczba", etykieta: "$k =$" }],
                odpowiedz: { k },
                wynik: `$k = ${dz(k)}$`,
                rozwiazanie: [
                  "Pole równoległoboku: $P = ab\\sin\\alpha$.",
                  kat === 60 ? "$\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}$." : "$\\sin 120^\\circ = \\sin(180^\\circ - 120^\\circ) = \\sin 60^\\circ = \\frac{\\sqrt{3}}{2}$.",
                  `$P = ${a}\\cdot ${b}\\cdot\\frac{\\sqrt{3}}{2} = ${dz(k)}\\sqrt{3}$.`,
                ],
              };
            }
            if (tryb === 3) {
              const a = r.int(4, 14), h = r.int(2, 12);
              return {
                tresc: `Pole równoległoboku jest równe $${a * h}$, a jeden z jego boków ma długość $${a}$. Oblicz wysokość opuszczoną na ten bok.`,
                pola: [{ id: "h", typ: "liczba", etykieta: "$h =$" }],
                odpowiedz: { h: q(h) },
                wynik: `$h = ${h}$`,
                rozwiazanie: ["Ze wzoru $P = a\\cdot h$ mamy $h = \\frac{P}{a}$.", `$h = ${a * h} : ${a} = ${h}$.`],
              };
            }
            for (;;) {
              const b = r.int(4, 14), hb = r.int(3, 12), P = b * hb;
              const dziel = [];
              for (let a = 4; a <= 20; a++) if (a !== b && P % a === 0) dziel.push(a);
              if (!dziel.length) continue;
              const a = r.pick(dziel), ha = P / a;
              return {
                tresc: `W równoległoboku wysokość opuszczona na bok o długości $${a}$ ma długość $${ha}$. Drugi bok ma długość $${b}$. Oblicz wysokość opuszczoną na ten drugi bok.`,
                pola: [{ id: "h", typ: "liczba", etykieta: "$h =$" }],
                odpowiedz: { h: q(hb) },
                wynik: `$h = ${hb}$`,
                rozwiazanie: [
                  `Pole: $P = ${a}\\cdot ${ha} = ${P}$.`,
                  `To samo pole to $b\\cdot h$, czyli $${P} = ${b}\\cdot h$.`,
                  `$h = ${P} : ${b} = ${hb}$.`,
                ],
              };
            }
          },
        },
        {
          id: "romb-pole",
          nazwa: "Romb – pole i bok",
          opis: "Pole rombu z przekątnych, bok rombu z przekątnych albo brakująca przekątna.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const e = r.int(4, 20), f = r.int(3, 18);
              const p = q(e * f, 2);
              return {
                tresc: `Przekątne rombu mają długości $${e}$ i $${f}$. Oblicz pole tego rombu.`,
                pola: [{ id: "p", typ: "liczba", etykieta: "$P =$" }],
                odpowiedz: { p },
                wynik: `$P = ${dz(p)}$`,
                rozwiazanie: ["Pole rombu to połowa iloczynu przekątnych: $P = \\frac{ef}{2}$.", `$P = \\frac{${e}\\cdot ${f}}{2} = ${dz(p)}$.`],
              };
            }
            if (tryb === 1) {
              const [p0, s0, c0] = r.pick(TROJKI);
              const [p, s] = r.chance() ? [p0, s0] : [s0, p0];
              const k = r.int(1, 3);
              return {
                tresc: `Przekątne rombu mają długości $${2 * p * k}$ i $${2 * s * k}$. Oblicz długość boku tego rombu.`,
                pola: [{ id: "a", typ: "liczba", etykieta: "$a =$" }],
                odpowiedz: { a: q(c0 * k) },
                wynik: `$a = ${c0 * k}$`,
                rozwiazanie: [
                  `Przekątne rombu są prostopadłe i dzielą się na połowy, więc ich połowy mają długości $${p * k}$ i $${s * k}$.`,
                  "Bok rombu jest przeciwprostokątną trójkąta o tych przyprostokątnych.",
                  `$a = \\sqrt{${p * k}^2 + ${s * k}^2} = ${c0 * k}$.`,
                ],
              };
            }
            if (tryb === 2) {
              const e = r.int(4, 16), f = r.int(4, 16);
              if ((e * f) % 2) return this.generuj(r);
              const P = (e * f) / 2;
              return {
                tresc: `Pole rombu jest równe $${P}$, a jedna z jego przekątnych ma długość $${e}$. Oblicz długość drugiej przekątnej.`,
                pola: [{ id: "f", typ: "liczba", etykieta: "$f =$" }],
                odpowiedz: { f: q(f) },
                wynik: `$f = ${f}$`,
                rozwiazanie: [`Ze wzoru $P = \\frac{ef}{2}$ mamy $f = \\frac{2P}{e}$.`, `$f = \\frac{2\\cdot ${P}}{${e}} = ${f}$.`],
              };
            }
            const [p0, s0, c0] = r.pick(TROJKI);
            const [p, s] = r.chance() ? [p0, s0] : [s0, p0];
            const k = r.int(1, 3);
            const P = 2 * p * s * k * k;
            return {
              tresc: `Bok rombu ma długość $${c0 * k}$, a jedna z jego przekątnych ma długość $${2 * p * k}$. Oblicz pole tego rombu.`,
              pola: [{ id: "p", typ: "liczba", etykieta: "$P =$" }],
              odpowiedz: { p: q(P) },
              wynik: `$P = ${P}$`,
              rozwiazanie: [
                `Połowa danej przekątnej ma długość $${p * k}$.`,
                `Połowa drugiej przekątnej: $\\sqrt{${c0 * k}^2 - ${p * k}^2} = ${s * k}$, więc druga przekątna ma długość $${2 * s * k}$.`,
                `$P = \\frac{${2 * p * k}\\cdot ${2 * s * k}}{2} = ${P}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5.3
    {
      id: "trapez",
      nazwa: "Pole trapezu",
      sciaga: [
        {
          nazwa: "Pole trapezu",
          slownie: "Pole trapezu to połowa sumy długości podstaw razy wysokość, czyli odległość między podstawami.",
          tex: "P=\\frac{a+b}{2}\\cdot h",
          litery: "$a$, $b$ – podstawy trapezu, $h$ – wysokość.",
          przyklad: "Dla $a = 10$, $b = 6$, $h = 5$: $P = \\frac{10 + 6}{2}\\cdot 5 = 40$.",
          uwaga: "Wysokość to odległość między podstawami, a nie długość ramienia (chyba że ramię jest prostopadłe do podstaw).",
        },
        {
          nazwa: "Odcinek środkowy",
          slownie: "Odcinek łączący środki ramion ma długość równą połowie sumy podstaw. Dlatego pole trapezu to iloczyn tego odcinka i wysokości.",
          tex: "m=\\frac{a+b}{2}\\qquad P=m\\cdot h",
          litery: "$m$ – odcinek łączący środki ramion, $a$, $b$ – podstawy, $h$ – wysokość.",
          przyklad: "Dla $m = 7$ i $h = 4$: $P = 28$.",
        },
        {
          nazwa: "Wysokość trapezu równoramiennego",
          slownie: "Wysokości poprowadzone z końców krótszej podstawy odcinają dwa przystające trójkąty prostokątne. Ich przyprostokątna na dłuższej podstawie to połowa różnicy podstaw.",
          tex: "h=\\sqrt{c^2-\\left(\\frac{a-b}{2}\\right)^2}",
          litery: "$a$, $b$ – podstawy ($a > b$), $c$ – ramię, $h$ – wysokość.",
          przyklad: "Dla $a = 14$, $b = 8$, $c = 5$: $\\frac{a - b}{2} = 3$, $h = \\sqrt{25 - 9} = 4$, $P = \\frac{22}{2}\\cdot 4 = 44$.",
          uwaga: "Odcinek $\\frac{a-b}{2}$, a nie całą różnicę $a - b$, wstawiamy do wzoru na wysokość.",
        },
        {
          nazwa: "Wysokość z ramienia i kąta",
          slownie: "Ramię, wysokość i odcinek na dłuższej podstawie tworzą trójkąt prostokątny. Gdy znasz ramię i kąt ostry przy podstawie, wysokość liczysz z sinusa.",
          tex: "h=c\\sin\\alpha\\qquad x=c\\cos\\alpha",
          litery: "$c$ – ramię, $\\alpha$ – kąt ostry przy podstawie, $h$ – wysokość, $x$ – odcinek podstawy odcięty wysokością.",
          przyklad: "Dla $c = 8$ i $\\alpha = 30^\\circ$: $h = 8\\cdot\\frac{1}{2} = 4$, $x = 8\\cdot\\frac{\\sqrt{3}}{2} = 4\\sqrt{3}$.",
          uwaga: "W trapezie prostokątnym krótsze ramię jest wysokością, a dłuższe jest przeciwprostokątnym trójkąta o przyprostokątnych $h$ i $a - b$.",
        },
      ],
      jak: [
        "Wypisz podstawy i wysokość. Jeśli wysokości brakuje, narysuj ją i znajdź trójkąt prostokątny.",
        "Wysokość policz z twierdzenia Pitagorasa albo z $h = c\\sin\\alpha$.",
        "Wstaw dane do wzoru $P = \\frac{a+b}{2}\\cdot h$.",
        "Gdy znasz pole, wyznacz niewiadomą z równania, np. $h = \\frac{2P}{a+b}$.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Trapez ma podstawy długości $12$ i $8$ oraz wysokość $5$. Pole tego trapezu jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$100$", "$60$", "$40$", "$50$"],
          poprawna: 3,
        },
        {
          nr: "16",
          tresc: "Pole trapezu jest równe $54$, a jego podstawy mają długości $7$ i $11$. Wysokość tego trapezu jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$12$", "$6$", "$9$"],
          poprawna: 2,
        },
        {
          nr: "17",
          tresc: "Trapez równoramienny ma podstawy długości $20$ i $10$ oraz ramię długości $13$. Pole tego trapezu jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$180$", "$195$", "$360$", "$150$"],
          poprawna: 0,
        },
        {
          nr: "18",
          tresc: "W trapezie prostokątnym podstawy mają długości $9$ i $4$, a krótsze ramię ma długość $12$. Dłuższe ramię tego trapezu ma długość: **Wybierz właściwą odpowiedź.**",
          opcje: ["$15$", "$13$", "$\\sqrt{119}$", "$5$"],
          poprawna: 1,
        },
        {
          nr: "19",
          tresc: "Ramię trapezu ma długość $10$ i tworzy z dłuższą podstawą kąt $30^\\circ$. Podstawy trapezu mają długości $14$ i $6$. Pole tego trapezu jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$100$", "$50$", "$50\\sqrt{3}$", "$25$"],
          poprawna: 1,
        },
        {
          nr: "20",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Trapez równoramienny o podstawach $8$ i $2$ i wysokości $4$ ma pole $20$.", litery: "PF", poprawna: 0 },
            { tekst: "Trapez o podstawach $6$ i $10$ i wysokości $3$ ma pole $48$.", litery: "PF", poprawna: 1 },
            { tekst: "Trapez, w którym odcinek łączący środki ramion ma długość $7$, a wysokość $4$, ma pole $28$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "21",
          punkty: 2,
          tresc: "Trapez równoramienny ma podstawy długości $18$ i $8$ oraz ramię długości $13$. Oblicz pole tego trapezu. **Zapisz obliczenia.**",
          rozwiazanie: "Wysokości poprowadzone z końców krótszej podstawy odcinają na dłuższej podstawie odcinki długości $\\frac{18 - 8}{2} = 5$.\n\nWysokość: $h = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12$.\n\nPole: $P = \\frac{18 + 8}{2}\\cdot 12 = 13\\cdot 12 = 156$.\n\nOdpowiedź: pole trapezu jest równe $156$.",
        },
        {
          nr: "22",
          punkty: 3,
          tresc: "W trapezie prostokątnym dłuższe ramię ma długość $8$ i tworzy z dłuższą podstawą kąt $60^\\circ$. Krótsza podstawa ma długość $5$. Oblicz pole tego trapezu. **Zapisz obliczenia.**",
          rozwiazanie: "Wysokość trapezu: $h = 8\\sin 60^\\circ = 8\\cdot\\frac{\\sqrt{3}}{2} = 4\\sqrt{3}$.\n\nOdcinek dłuższej podstawy wystający poza krótszą: $8\\cos 60^\\circ = 8\\cdot\\frac{1}{2} = 4$, więc dłuższa podstawa ma długość $5 + 4 = 9$.\n\nPole: $P = \\frac{9 + 5}{2}\\cdot 4\\sqrt{3} = 7\\cdot 4\\sqrt{3} = 28\\sqrt{3}$.\n\nOdpowiedź: pole trapezu jest równe $28\\sqrt{3}$.",
        },
      ],
      generatory: [
        {
          id: "trapez-pole",
          nazwa: "Pole trapezu",
          opis: "Pole trapezu z podstaw i wysokości albo brakująca wysokość lub podstawa z pola.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const a = r.int(6, 20), b = r.int(2, a - 2), h = r.int(2, 12);
              const p = q((a + b) * h, 2);
              return {
                tresc: `Trapez ma podstawy długości $${a}$ i $${b}$ oraz wysokość $${h}$. Oblicz pole tego trapezu.`,
                pola: [{ id: "p", typ: "liczba", etykieta: "$P =$" }],
                odpowiedz: { p },
                wynik: `$P = ${dz(p)}$`,
                rozwiazanie: ["Pole trapezu: $P = \\frac{a+b}{2}\\cdot h$.", `$P = \\frac{${a} + ${b}}{2}\\cdot ${h} = ${dz(p)}$.`],
              };
            }
            if (tryb === 1) {
              for (;;) {
                const a = r.int(6, 20), b = r.int(2, a - 2), h = r.int(2, 12);
                if (((a + b) * h) % 2) continue;
                const P = ((a + b) * h) / 2;
                return {
                  tresc: `Pole trapezu jest równe $${P}$, a jego podstawy mają długości $${a}$ i $${b}$. Oblicz wysokość tego trapezu.`,
                  pola: [{ id: "h", typ: "liczba", etykieta: "$h =$" }],
                  odpowiedz: { h: q(h) },
                  wynik: `$h = ${h}$`,
                  rozwiazanie: ["Ze wzoru $P = \\frac{a+b}{2}\\cdot h$ mamy $h = \\frac{2P}{a+b}$.", `$h = \\frac{2\\cdot ${P}}{${a} + ${b}} = \\frac{${2 * P}}{${a + b}} = ${h}$.`],
                };
              }
            }
            if (tryb === 2) {
              const m = r.int(3, 15), h = r.int(2, 12);
              return {
                tresc: `Odcinek łączący środki ramion trapezu ma długość $${m}$, a wysokość trapezu jest równa $${h}$. Oblicz pole tego trapezu.`,
                pola: [{ id: "p", typ: "liczba", etykieta: "$P =$" }],
                odpowiedz: { p: q(m * h) },
                wynik: `$P = ${m * h}$`,
                rozwiazanie: ["Odcinek łączący środki ramion ma długość $\\frac{a+b}{2}$, więc $P = m\\cdot h$.", `$P = ${m}\\cdot ${h} = ${m * h}$.`],
              };
            }
            for (;;) {
              const a = r.int(6, 20), b = r.int(2, a - 2), h = r.int(2, 12);
              if (((a + b) * h) % 2) continue;
              const P = ((a + b) * h) / 2;
              return {
                tresc: `Pole trapezu jest równe $${P}$, wysokość tego trapezu ma długość $${h}$, a jedna z podstaw ma długość $${a}$. Oblicz długość drugiej podstawy.`,
                pola: [{ id: "b", typ: "liczba", etykieta: "$b =$" }],
                odpowiedz: { b: q(b) },
                wynik: `$b = ${b}$`,
                rozwiazanie: [
                  `Z równania $${P} = \\frac{${a} + b}{2}\\cdot ${h}$ mamy $${a} + b = \\frac{2\\cdot ${P}}{${h}} = ${a + b}$.`,
                  `$b = ${a + b} - ${a} = ${b}$.`,
                ],
              };
            }
          },
        },
        {
          id: "trapez-ramie",
          nazwa: "Trapez z ramieniem",
          opis: "Pole trapezu równoramiennego, dłuższe ramię trapezu prostokątnego albo pole z ramienia i kąta 30°.",
          generuj(r) {
            const tryb = r.int(0, 2);
            const [p0, s0, c0] = r.pick(TROJKI);
            const [p, s] = r.chance() ? [p0, s0] : [s0, p0];
            const k = r.int(1, 2);
            const b = r.int(2, 10);
            if (tryb === 0) {
              const x = s * k, h = p * k, a = b + 2 * x, c = c0 * k;
              const P = ((a + b) * h) / 2;
              return {
                tresc: `Trapez równoramienny ma podstawy długości $${a}$ i $${b}$ oraz ramię długości $${c}$. Oblicz pole tego trapezu.`,
                pola: [{ id: "p", typ: "liczba", etykieta: "$P =$" }],
                odpowiedz: { p: q(P) },
                wynik: `$P = ${P}$`,
                rozwiazanie: [
                  `Wysokości odcinają na dłuższej podstawie odcinki długości $\\frac{${a} - ${b}}{2} = ${x}$.`,
                  `Wysokość: $h = \\sqrt{${c}^2 - ${x}^2} = ${h}$.`,
                  `$P = \\frac{${a} + ${b}}{2}\\cdot ${h} = ${P}$.`,
                ],
              };
            }
            if (tryb === 1) {
              const x = s * k, h = p * k, a = b + x, c = c0 * k;
              return {
                tresc: `W trapezie prostokątnym podstawy mają długości $${a}$ i $${b}$, a krótsze ramię (prostopadłe do podstaw) ma długość $${h}$. Oblicz długość dłuższego ramienia.`,
                pola: [{ id: "c", typ: "liczba", etykieta: "$c =$" }],
                odpowiedz: { c: q(c) },
                wynik: `$c = ${c}$`,
                rozwiazanie: [
                  `Krótsze ramię jest wysokością trapezu. Dłuższe ramię jest przeciwprostokątną trójkąta o przyprostokątnych $${h}$ i $${a} - ${b} = ${x}$.`,
                  `$c = \\sqrt{${h}^2 + ${x}^2} = ${c}$.`,
                ],
              };
            }
            const c = 2 * r.int(2, 8), bb = r.int(3, 10), a = bb + r.int(2, 10);
            const P = q((a + bb) * c, 4);
            return {
              tresc: `W trapezie ramię o długości $${c}$ tworzy z dłuższą podstawą kąt $30^\\circ$. Podstawy trapezu mają długości $${a}$ i $${bb}$. Oblicz pole tego trapezu.`,
              pola: [{ id: "p", typ: "liczba", etykieta: "$P =$" }],
              odpowiedz: { p: P },
              wynik: `$P = ${dz(P)}$`,
              rozwiazanie: [
                `Wysokość trapezu: $h = ${c}\\sin 30^\\circ = ${c}\\cdot\\frac{1}{2} = ${c / 2}$.`,
                `$P = \\frac{${a} + ${bb}}{2}\\cdot ${c / 2} = ${dz(P)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5.4
    {
      id: "zadania-rozne",
      nazwa: "Pole czworokąta – zadania różne",
      sciaga: [
        {
          nazwa: "Podział na trójkąty",
          slownie: "Przekątna dzieli czworokąt wypukły na dwa trójkąty. Pole czworokąta to suma pól tych trójkątów.",
          tex: "P=\\frac{1}{2}d\\,(h_1+h_2)",
          litery: "$d$ – przekątna, $h_1$, $h_2$ – odległości pozostałych wierzchołków od prostej, w której leży przekątna.",
          przyklad: "Dla $d = 10$, $h_1 = 3$, $h_2 = 4$: $P = \\frac{1}{2}\\cdot 10\\cdot 3 + \\frac{1}{2}\\cdot 10\\cdot 4 = 35$.",
        },
        {
          nazwa: "Pole z przekątnych",
          slownie: "Pole czworokąta wypukłego można policzyć z przekątnych i kąta między nimi. Gdy przekątne są prostopadłe, sinus jest równy $1$.",
          tex: "P=\\frac{1}{2}ef\\sin\\varphi\\qquad P=\\frac{ef}{2}\\ (\\varphi=90^\\circ)",
          litery: "$e$, $f$ – przekątne, $\\varphi$ – kąt między nimi.",
          przyklad: "Dla $e = 8$, $f = 10$, $\\varphi = 30^\\circ$: $P = \\frac{1}{2}\\cdot 8\\cdot 10\\cdot\\frac{1}{2} = 20$. Dla przekątnych prostopadłych: $P = 40$.",
          uwaga: "Wzór $\\frac{ef}{2}$ bez sinusa działa tylko dla przekątnych prostopadłych (romb, kwadrat, deltoid).",
        },
        {
          nazwa: "Pole wielokąta",
          slownie: "Wielokąt dziel na prostokąty, trójkąty i trapezy albo dopełnij do prostokąta i odejmij pola części, których w wielokącie nie ma.",
          przyklad: "Z prostokąta $10\\times 8$ odcięto narożnik $4\\times 3$: $P = 80 - 12 = 68$.",
          uwaga: "Przy odcinaniu prostokątnego narożnika obwód się nie zmienia, ale pole maleje.",
        },
        {
          nazwa: "Przypomnienie: pole trójkąta",
          slownie: "Pole trójkąta liczysz z boku i wysokości albo z dwóch boków i kąta między nimi. Trójkąt równoboczny ma gotowy wzór.",
          tex: "P=\\frac{1}{2}ah\\qquad P=\\frac{1}{2}ab\\sin\\gamma\\qquad P=\\frac{a^2\\sqrt{3}}{4}",
          litery: "$a$, $b$ – boki, $h$ – wysokość opuszczona na bok $a$, $\\gamma$ – kąt między bokami $a$ i $b$.",
          przyklad: "Sześciokąt foremny o boku $4$ składa się z $6$ trójkątów równobocznych: $P = 6\\cdot\\frac{4^2\\sqrt{3}}{4} = 24\\sqrt{3}$.",
        },
      ],
      jak: [
        "Naszkicuj czworokąt (lub wielokąt) i zaznacz wszystkie dane.",
        "Wybierz sposób: podział na trójkąty, wzór z przekątnych albo dopełnienie do prostokąta.",
        "Brakujące długości policz z twierdzenia Pitagorasa lub funkcji trygonometrycznych.",
        "Dodaj albo odejmij pola części i zapisz odpowiedź z jednostką.",
      ],
      zadania: [
        {
          nr: "23",
          tresc: "Przekątne czworokąta wypukłego mają długości $12$ i $10$ i przecinają się pod kątem $30^\\circ$. Pole tego czworokąta jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$60$", "$30$", "$15$", "$30\\sqrt{3}$"],
          poprawna: 1,
        },
        {
          nr: "24",
          tresc: "Przekątne deltoidu mają długości $10$ i $7$ i są prostopadłe. Pole tego deltoidu jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$70$", "$17$", "$17{,}5$", "$35$"],
          poprawna: 3,
        },
        {
          nr: "25",
          tresc: "Sześciokąt foremny ma bok długości $4$. Pole tego sześciokąta jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$16\\sqrt{3}$", "$48$", "$24\\sqrt{3}$", "$12\\sqrt{3}$"],
          poprawna: 2,
        },
        {
          nr: "26",
          tresc: "W czworokącie wypukłym $ABCD$ przekątna $AC$ ma długość $14$. Wierzchołek $B$ leży w odległości $3$ od prostej $AC$, a wierzchołek $D$ – w odległości $5$ od tej prostej, po przeciwnej stronie. Pole czworokąta $ABCD$ jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$56$", "$112$", "$42$", "$70$"],
          poprawna: 0,
        },
        {
          nr: "27",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Czworokąt o przekątnych $6$ i $8$ zawsze ma pole $24$.", litery: "PF", poprawna: 1 },
            { tekst: "Każdy czworokąt wypukły można podzielić przekątną na dwa trójkąty.", litery: "PF", poprawna: 0 },
            { tekst: "Czworokąt o prostopadłych przekątnych $5$ i $12$ ma pole $30$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "28",
          punkty: 3,
          tresc: "Działka ma kształt wielokąta powstałego z prostokąta o bokach $20$ m i $12$ m po odcięciu z jednego rogu prostokąta o bokach $8$ m i $5$ m. Oblicz pole i obwód tej działki. **Zapisz obliczenia.**",
          rozwiazanie: "Pole prostokąta: $20\\cdot 12 = 240\\ \\text{m}^2$. Pole odciętego prostokąta: $8\\cdot 5 = 40\\ \\text{m}^2$.\n\nPole działki: $240 - 40 = 200\\ \\text{m}^2$.\n\nBoki działki mają długości (m): $20$, $12$, $20 - 8 = 12$, $5$, $8$, $12 - 5 = 7$.\n\nObwód: $20 + 12 + 12 + 5 + 8 + 7 = 64\\ \\text{m}$ (tyle samo co obwód dużego prostokąta: $2\\cdot(20 + 12) = 64$).\n\nOdpowiedź: pole działki jest równe $200\\ \\text{m}^2$, a obwód $64\\ \\text{m}$.",
        },
        {
          nr: "29",
          punkty: 3,
          tresc: "W czworokącie $ABCD$ kąt $ABC$ jest prosty, $|AB| = 6$, $|BC| = 8$. Kąt $ACD$ też jest prosty i $|CD| = 24$. Oblicz pole czworokąta $ABCD$. **Zapisz obliczenia.**",
          rozwiazanie: "Czworokąt dzielimy przekątną $AC$ na dwa trójkąty prostokątne $ABC$ i $ACD$.\n\nZ twierdzenia Pitagorasa w trójkącie $ABC$: $|AC| = \\sqrt{6^2 + 8^2} = 10$.\n\nPole trójkąta $ABC$: $\\frac{1}{2}\\cdot 6\\cdot 8 = 24$.\n\nPole trójkąta $ACD$ (kąt prosty przy $C$): $\\frac{1}{2}\\cdot 10\\cdot 24 = 120$.\n\nPole czworokąta: $24 + 120 = 144$.\n\nOdpowiedź: pole czworokąta $ABCD$ jest równe $144$.",
        },
      ],
      generatory: [
        {
          id: "przekatne-pole",
          nazwa: "Pole z przekątnych",
          opis: "Pole czworokąta o przekątnych prostopadłych albo przecinających się pod kątem 30° lub 150°.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const e = r.int(4, 20), f = r.int(3, 18);
              const p = q(e * f, 2);
              return {
                tresc: `Przekątne czworokąta wypukłego mają długości $${e}$ i $${f}$ i są prostopadłe. Oblicz pole tego czworokąta.`,
                pola: [{ id: "p", typ: "liczba", etykieta: "$P =$" }],
                odpowiedz: { p },
                wynik: `$P = ${dz(p)}$`,
                rozwiazanie: ["Dla przekątnych prostopadłych $\\sin\\varphi = 1$, więc $P = \\frac{ef}{2}$.", `$P = \\frac{${e}\\cdot ${f}}{2} = ${dz(p)}$.`],
              };
            }
            if (tryb === 1) {
              const e = r.int(4, 20), f = r.int(3, 18), kat = r.pick([30, 150]);
              const p = q(e * f, 4);
              return {
                tresc: `Przekątne czworokąta wypukłego mają długości $${e}$ i $${f}$ i przecinają się pod kątem $${kat}^\\circ$. Oblicz pole tego czworokąta.`,
                pola: [{ id: "p", typ: "liczba", etykieta: "$P =$" }],
                odpowiedz: { p },
                wynik: `$P = ${dz(p)}$`,
                rozwiazanie: [
                  "Pole czworokąta wypukłego: $P = \\frac{1}{2}ef\\sin\\varphi$.",
                  kat === 30 ? "$\\sin 30^\\circ = \\frac{1}{2}$." : "$\\sin 150^\\circ = \\sin 30^\\circ = \\frac{1}{2}$.",
                  `$P = \\frac{1}{2}\\cdot ${e}\\cdot ${f}\\cdot\\frac{1}{2} = ${dz(p)}$.`,
                ],
              };
            }
            for (;;) {
              const e = r.int(4, 16), f = r.int(4, 16);
              if ((e * f) % 2) continue;
              const P = (e * f) / 2;
              return {
                tresc: `Pole czworokąta o prostopadłych przekątnych jest równe $${P}$, a jedna z przekątnych ma długość $${e}$. Oblicz długość drugiej przekątnej.`,
                pola: [{ id: "f", typ: "liczba", etykieta: "$f =$" }],
                odpowiedz: { f: q(f) },
                wynik: `$f = ${f}$`,
                rozwiazanie: ["Dla przekątnych prostopadłych $P = \\frac{ef}{2}$, więc $f = \\frac{2P}{e}$.", `$f = \\frac{2\\cdot ${P}}{${e}} = ${f}$.`],
              };
            }
          },
        },
        {
          id: "pole-wielokata",
          nazwa: "Pole wielokąta",
          opis: "Pole czworokąta z przekątnej i wysokości, prostokąta z wyciętym narożnikiem, sześciokąta foremnego i czworokąta z dwoma kątami prostymi.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const d = r.int(4, 20), h1 = r.int(2, 9), h2 = r.int(2, 9);
              const p = q(d * (h1 + h2), 2);
              return {
                tresc: `W czworokącie wypukłym $ABCD$ przekątna $AC$ ma długość $${d}$. Wierzchołek $B$ leży w odległości $${h1}$ od prostej $AC$, a wierzchołek $D$ – w odległości $${h2}$ od tej prostej, po przeciwnej stronie. Oblicz pole czworokąta $ABCD$.`,
                pola: [{ id: "p", typ: "liczba", etykieta: "$P =$" }],
                odpowiedz: { p },
                wynik: `$P = ${dz(p)}$`,
                rozwiazanie: [
                  "Przekątna $AC$ dzieli czworokąt na trójkąty $ABC$ i $ACD$ o wspólnej podstawie $AC$.",
                  `$P = \\frac{1}{2}\\cdot ${d}\\cdot ${h1} + \\frac{1}{2}\\cdot ${d}\\cdot ${h2} = \\frac{1}{2}\\cdot ${d}\\cdot ${h1 + h2}$.`,
                  `$P = ${dz(p)}$.`,
                ],
              };
            }
            if (tryb === 1) {
              const A = r.int(8, 24), B = r.int(6, 18), c = r.int(2, A - 3), d = r.int(2, B - 3);
              const P = A * B - c * d;
              return {
                tresc: `Z prostokąta o bokach $${A}$ i $${B}$ odcięto jeden narożnik – prostokąt o bokach $${c}$ i $${d}$. Oblicz pole powstałego wielokąta.`,
                pola: [{ id: "p", typ: "liczba", etykieta: "$P =$" }],
                odpowiedz: { p: q(P) },
                wynik: `$P = ${P}$`,
                rozwiazanie: [
                  `Pole całego prostokąta: $${A}\\cdot ${B} = ${A * B}$.`,
                  `Pole odciętego prostokąta: $${c}\\cdot ${d} = ${c * d}$.`,
                  `$P = ${A * B} - ${c * d} = ${P}$.`,
                ],
              };
            }
            if (tryb === 2) {
              const a = r.int(2, 8);
              const k = q(3 * a * a, 2);
              return {
                tresc: `Sześciokąt foremny ma bok długości $${a}$. Jego pole jest równe $k\\sqrt{3}$. Oblicz $k$.`,
                pola: [{ id: "k", typ: "liczba", etykieta: "$k =$" }],
                odpowiedz: { k },
                wynik: `$k = ${dz(k)}$`,
                rozwiazanie: [
                  "Sześciokąt foremny składa się z sześciu trójkątów równobocznych o boku $a$.",
                  `Pole jednego trójkąta: $\\frac{${a}^2\\sqrt{3}}{4} = \\frac{${a * a}\\sqrt{3}}{4}$.`,
                  `$P = 6\\cdot\\frac{${a * a}\\sqrt{3}}{4} = ${dz(k)}\\sqrt{3}$.`,
                ],
              };
            }
            const [p0, s0, c0] = r.pick(TROJKI);
            const [p, s] = r.chance() ? [p0, s0] : [s0, p0];
            const k = r.int(1, 2);
            const x = p * k, y = s * k, ac = c0 * k, m = r.int(2, 14);
            const P = q(x * y + ac * m, 2);
            return {
              tresc: `W czworokącie $ABCD$ kąt $ABC$ jest prosty, $|AB| = ${x}$ i $|BC| = ${y}$. Kąt $ACD$ też jest prosty i $|CD| = ${m}$. Oblicz pole czworokąta $ABCD$.`,
              pola: [{ id: "p", typ: "liczba", etykieta: "$P =$" }],
              odpowiedz: { p: P },
              wynik: `$P = ${dz(P)}$`,
              rozwiazanie: [
                `Z twierdzenia Pitagorasa: $|AC| = \\sqrt{${x}^2 + ${y}^2} = ${ac}$.`,
                `Pole trójkąta $ABC$: $\\frac{1}{2}\\cdot ${x}\\cdot ${y} = ${dz(q(x * y, 2))}$. Pole trójkąta $ACD$: $\\frac{1}{2}\\cdot ${ac}\\cdot ${m} = ${dz(q(ac * m, 2))}$.`,
                `$P = ${dz(P)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5.5
    {
      id: "pola-podobne",
      nazwa: "Pola figur podobnych",
      sciaga: [
        {
          nazwa: "Skala podobieństwa",
          slownie: "Skala podobieństwa to stosunek długości odpowiednich odcinków figury drugiej do pierwszej. Wszystkie odpowiednie odcinki (boki, przekątne, wysokości, obwody) zmieniają się w tej samej skali.",
          tex: "k=\\frac{|EF|}{|AB|}=\\frac{L_2}{L_1}",
          litery: "$|AB|$, $|EF|$ – odpowiednie boki figur, $L_1$, $L_2$ – ich obwody.",
          przyklad: "Gdy bok $4$ odpowiada bokowi $6$, to $k = \\frac{6}{4} = \\frac{3}{2}$.",
          uwaga: "Przy $k > 1$ figura drugiej jest większa od pierwszej, przy $k < 1$ – mniejsza.",
        },
        {
          nazwa: "Stosunek pól",
          slownie: "Pola figur podobnych mają się do siebie jak kwadrat skali podobieństwa.",
          tex: "\\frac{P_2}{P_1}=k^2",
          litery: "$P_1$, $P_2$ – pola figur, $k$ – skala podobieństwa figury drugiej do pierwszej.",
          przyklad: "Dla $k = 3$ i $P_1 = 5$: $P_2 = 3^2\\cdot 5 = 45$.",
          uwaga: "Pole rośnie $k^2$ razy, a nie $k$ razy. Powiększenie boków $2$ razy daje pole $4$ razy większe.",
        },
        {
          nazwa: "Skala z pól",
          slownie: "Gdy znasz oba pola, skalę podobieństwa wyznacz z pierwiastka ze stosunku pól. Skala jest dodatnia.",
          tex: "k=\\sqrt{\\frac{P_2}{P_1}}",
          przyklad: "Dla pól $18$ i $50$: $k = \\sqrt{\\frac{50}{18}} = \\sqrt{\\frac{25}{9}} = \\frac{5}{3}$.",
          uwaga: "Stosunek pól to $k^2$, więc nie zapomnij o pierwiastku.",
        },
        {
          nazwa: "Obwód i pole",
          slownie: "Obwody figur podobnych mają się do siebie jak $k$, a pola jak $k^2$. Z obwodów możesz więc znaleźć skalę, a z niej stosunek pól.",
          przyklad: "Dla obwodów $12$ i $36$: $k = 3$, więc pole większej figury jest $9$ razy większe.",
        },
      ],
      jak: [
        "Ustal, która figura jest pierwsza, a która druga, i zapisz skalę $k = \\frac{\\text{druga}}{\\text{pierwsza}}$.",
        "Skalę policz z odpowiednich boków, obwodów albo z pierwiastka ze stosunku pól.",
        "Pole zmienia się w skali $k^2$: $P_2 = k^2\\cdot P_1$.",
        "Sprawdź sensowność: dla $k > 1$ pole musi wzrosnąć.",
      ],
      zadania: [
        {
          nr: "30",
          tresc: "Prostokąty $K$ i $L$ są podobne, a skala podobieństwa prostokąta $L$ do prostokąta $K$ jest równa $3$. Pole prostokąta $K$ jest równe $8$. Pole prostokąta $L$ jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$11$", "$24$", "$72$", "$216$"],
          poprawna: 2,
        },
        {
          nr: "31",
          tresc: "Obwody dwóch podobnych czworokątów mają się do siebie jak $2:5$. Stosunek pola mniejszego czworokąta do pola większego jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{4}{25}$", "$\\frac{2}{5}$", "$\\frac{8}{125}$", "$\\frac{4}{5}$"],
          poprawna: 0,
        },
        {
          nr: "32",
          tresc: "Pola dwóch podobnych rombów są równe $20$ i $45$. Skala podobieństwa większego rombu do mniejszego jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{9}{4}$", "$\\frac{2}{3}$", "$\\frac{5}{4}$", "$\\frac{3}{2}$"],
          poprawna: 3,
        },
        {
          nr: "33",
          tresc: "Prostokąt o bokach $6$ i $10$ powiększono w pewnej skali tak, że jego krótszy bok ma teraz długość $9$. Pole powiększonego prostokąta jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$90$", "$135$", "$81$", "$225$"],
          poprawna: 1,
        },
        {
          nr: "34",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Dwa prostokąty są zawsze podobne.", litery: "PF", poprawna: 1 },
            { tekst: "Dwa kwadraty są zawsze podobne.", litery: "PF", poprawna: 0 },
            { tekst: "Gdy skala podobieństwa wynosi $\\frac{1}{2}$, to pole figury zmniejsza się $2$ razy.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "35",
          punkty: 2,
          tresc: "Trapezy $T_1$ i $T_2$ są podobne. Obwód trapezu $T_1$ jest równy $18$, a obwód trapezu $T_2$ jest równy $27$. Pole trapezu $T_1$ jest równe $12$. Oblicz pole trapezu $T_2$. **Zapisz obliczenia.**",
          rozwiazanie: "Skala podobieństwa trapezu $T_2$ do $T_1$ jest równa stosunkowi obwodów: $k = \\frac{27}{18} = \\frac{3}{2}$.\n\nPola mają się do siebie jak $k^2 = \\frac{9}{4}$.\n\n$P_2 = \\frac{9}{4}\\cdot 12 = 27$.\n\nOdpowiedź: pole trapezu $T_2$ jest równe $27$.",
        },
        {
          nr: "36",
          punkty: 3,
          tresc: "Romb o przekątnych $6$ i $8$ jest podobny do rombu, którego bok ma długość $15$. Oblicz pole większego rombu. **Zapisz obliczenia.**",
          rozwiazanie: "Bok mniejszego rombu: $\\sqrt{3^2 + 4^2} = 5$.\n\nSkala podobieństwa większego rombu do mniejszego: $k = \\frac{15}{5} = 3$.\n\nPole mniejszego rombu: $\\frac{6\\cdot 8}{2} = 24$.\n\nPole większego rombu: $P = k^2\\cdot 24 = 9\\cdot 24 = 216$.\n\nOdpowiedź: pole większego rombu jest równe $216$.",
        },
      ],
      generatory: [
        {
          id: "podobne-pole",
          nazwa: "Pole figury podobnej",
          opis: "Oblicz pole figury podobnej, gdy znasz skalę (z boków albo z obwodów) i pole drugiej figury.",
          generuj(r) {
            const RAT = [[2, 1], [3, 1], [3, 2], [4, 3], [5, 2], [5, 3], [4, 1], [1, 2], [1, 3], [2, 3], [3, 4], [2, 5], [1, 4], [3, 5]];
            const [p, s] = r.pick(RAT);
            const k = q(p, s);
            const u = r.int(1, 4), m = r.int(1, 6);
            const P1 = m * s * s, P2 = m * p * p;
            const tryb = r.int(0, 2);
            const pole = (v) => ({ pola: [{ id: "p", typ: "liczba", etykieta: "$P =$" }], odpowiedz: { p: q(v) }, wynik: `$P = ${v}$` });
            if (tryb === 0) {
              return {
                tresc: `Czworokąty $ABCD$ i $EFGH$ są podobne. Bok $AB$ ma długość $${u * s}$, a odpowiadający mu bok $EF$ ma długość $${u * p}$. Pole czworokąta $ABCD$ jest równe $${P1}$. Oblicz pole czworokąta $EFGH$.`,
                ...pole(P2),
                rozwiazanie: [
                  `Skala podobieństwa: $k = \\frac{${u * p}}{${u * s}} = ${k.tex()}$.`,
                  `Pola mają się do siebie jak $k^2 = ${k.pow(2).tex()}$.`,
                  `$P = ${k.pow(2).tex()}\\cdot ${P1} = ${P2}$.`,
                ],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Czworokąty $ABCD$ i $EFGH$ są podobne. Obwód czworokąta $ABCD$ jest równy $${u * s}$, a obwód czworokąta $EFGH$ jest równy $${u * p}$. Pole czworokąta $ABCD$ jest równe $${P1}$. Oblicz pole czworokąta $EFGH$.`,
                ...pole(P2),
                rozwiazanie: [
                  `Skala podobieństwa jest równa stosunkowi obwodów: $k = \\frac{${u * p}}{${u * s}} = ${k.tex()}$.`,
                  `Pola mają się do siebie jak $k^2 = ${k.pow(2).tex()}$.`,
                  `$P = ${k.pow(2).tex()}\\cdot ${P1} = ${P2}$.`,
                ],
              };
            }
            return {
              tresc: `Czworokąty $ABCD$ i $EFGH$ są podobne w skali $k = ${k.tex()}$ (czworokąta $EFGH$ do czworokąta $ABCD$). Pole czworokąta $EFGH$ jest równe $${P2}$. Oblicz pole czworokąta $ABCD$.`,
              ...pole(P1),
              rozwiazanie: [
                `Pola mają się do siebie jak $k^2 = ${k.pow(2).tex()}$, czyli $P_{EFGH} = ${k.pow(2).tex()}\\cdot P_{ABCD}$.`,
                `$${P2} = ${k.pow(2).tex()}\\cdot P_{ABCD}$.`,
                `$P_{ABCD} = ${P2} : ${k.pow(2).tex()} = ${P1}$.`,
              ],
            };
          },
        },
        {
          id: "podobne-skala",
          nazwa: "Skala z pól",
          opis: "Oblicz skalę podobieństwa z pól dwóch figur albo długość boku figury podobnej.",
          generuj(r) {
            const RAT = [[2, 1], [3, 1], [3, 2], [4, 3], [5, 2], [5, 3], [4, 1], [1, 2], [1, 3], [2, 3], [3, 4], [2, 5], [1, 4], [3, 5]];
            const [p, s] = r.pick(RAT);
            const k = q(p, s);
            const m = r.int(1, 6);
            const P1 = m * s * s, P2 = m * p * p;
            if (r.chance()) {
              return {
                tresc: `Pola dwóch podobnych czworokątów są równe $${P1}$ i $${P2}$. Oblicz skalę podobieństwa czworokąta o polu $${P2}$ do czworokąta o polu $${P1}$.`,
                pola: [{ id: "k", typ: "liczba", etykieta: "$k =$" }],
                odpowiedz: { k },
                wynik: `$k = ${k.tex()}$`,
                rozwiazanie: [
                  `Pola mają się do siebie jak $k^2$: $k^2 = \\frac{${P2}}{${P1}} = ${k.pow(2).tex()}$.`,
                  `$k = \\sqrt{${k.pow(2).tex()}} = ${k.tex()}$ (skala jest dodatnia).`,
                ],
              };
            }
            const u = r.int(1, 4);
            const x1 = u * s, x2 = u * p;
            return {
              tresc: `Dwa podobne prostokąty mają pola $${P1}$ i $${P2}$. Krótszy bok prostokąta o polu $${P1}$ ma długość $${x1}$. Oblicz długość odpowiadającego mu boku prostokąta o polu $${P2}$.`,
              pola: [{ id: "x", typ: "liczba", etykieta: "Długość boku" }],
              odpowiedz: { x: q(x2) },
              wynik: `$${x2}$`,
              rozwiazanie: [
                `Skala podobieństwa: $k = \\sqrt{\\frac{${P2}}{${P1}}} = \\sqrt{${k.pow(2).tex()}} = ${k.tex()}$.`,
                `Odpowiedni bok drugiego prostokąta: $${x1}\\cdot ${k.tex()} = ${x2}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5.6
    {
      id: "mapa",
      nazwa: "Mapa. Skala mapy",
      sciaga: [
        {
          nazwa: "Skala mapy",
          slownie: "Skala $1:n$ oznacza, że $1$ cm na mapie odpowiada $n$ cm w terenie. Mapa jest figurą podobną do terenu, a skala podobieństwa to $\\frac{1}{n}$.",
          tex: "\\text{skala}=\\frac{1}{n}=1:n",
          litery: "$n$ – ile razy odległości w terenie są większe niż na mapie.",
          przyklad: "W skali $1:50\\,000$ odcinek $4$ cm na mapie ma w terenie $4\\cdot 50\\,000 = 200\\,000$ cm $= 2000$ m $= 2$ km.",
          uwaga: "Zamiana jednostek: $100$ cm $= 1$ m, $1000$ m $= 1$ km, więc $100\\,000$ cm $= 1$ km.",
        },
        {
          nazwa: "Długość na mapie i w terenie",
          slownie: "Aby z mapy poznać odległość w terenie, mnożymy długość na mapie przez $n$. Aby przenieść odległość z terenu na mapę, dzielimy przez $n$.",
          tex: "d_{\\text{teren}}=d_{\\text{mapa}}\\cdot n\\qquad d_{\\text{mapa}}=\\frac{d_{\\text{teren}}}{n}",
          przyklad: "Odległość $12$ km w skali $1:300\\,000$: $1\\,200\\,000 : 300\\,000 = 4$ cm na mapie.",
          uwaga: "Przed dzieleniem zamień obie długości na centymetry.",
        },
        {
          nazwa: "Skala z odległości",
          slownie: "Gdy znasz odległość na mapie i w terenie (w tych samych jednostkach), skala to ich iloraz. Zapisz ją w postaci $1:n$.",
          tex: "n=\\frac{d_{\\text{teren}}}{d_{\\text{mapa}}}",
          przyklad: "Gdy $1$ cm na mapie odpowiada $2$ km w terenie: $2\\ \\text{km} = 200\\,000$ cm, więc skala to $1:200\\,000$.",
        },
        {
          nazwa: "Pole na mapie i w terenie",
          slownie: "Pola figur podobnych mają się do siebie jak kwadrat skali. W skali $1:n$ pole w terenie jest $n^2$ razy większe niż na mapie.",
          tex: "P_{\\text{teren}}=P_{\\text{mapa}}\\cdot n^2",
          przyklad: "W skali $1:1000$ działka ma na mapie $4\\ \\text{cm}^2$. W terenie: $4\\cdot 1000^2 = 4\\,000\\,000\\ \\text{cm}^2 = 400\\ \\text{m}^2$.",
          uwaga: "Pole mnożysz przez $n^2$, a nie przez $n$. Wynik w $\\text{cm}^2$ zamień na $\\text{m}^2$, dzieląc przez $10\\,000$.",
        },
      ],
      jak: [
        "Zapisz skalę jako $1:n$ i zamień wszystkie długości na centymetry.",
        "Długości: z mapy do terenu mnóż przez $n$, z terenu na mapę dziel przez $n$.",
        "Pola: mnóż albo dziel przez $n^2$.",
        "Zamień wynik na wygodną jednostkę (m, km, $\\text{m}^2$, ha).",
      ],
      zadania: [
        {
          nr: "37",
          tresc: "Na mapie w skali $1:25\\,000$ odległość między dwiema wsiami wynosi $6$ cm. W rzeczywistości te wsie dzieli odległość: **Wybierz właściwą odpowiedź.**",
          opcje: ["$150$ m", "$15$ km", "$150$ km", "$1{,}5$ km"],
          poprawna: 3,
        },
        {
          nr: "38",
          tresc: "Odległość między dwoma miastami w terenie jest równa $18$ km. Na mapie w skali $1:600\\,000$ ta odległość ma długość: **Wybierz właściwą odpowiedź.**",
          opcje: ["$30$ cm", "$0{,}3$ cm", "$3$ cm", "$108$ cm"],
          poprawna: 2,
        },
        {
          nr: "39",
          tresc: "Na mapie $1$ cm odpowiada w terenie $2$ km. Skala tej mapy jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$1:200\\,000$", "$1:2000$", "$1:20\\,000$", "$1:2\\,000\\,000$"],
          poprawna: 0,
        },
        {
          nr: "40",
          tresc: "Na mapie w skali $1:2000$ pole parku jest równe $3\\ \\text{cm}^2$. Rzeczywiste pole parku jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}6\\ \\text{m}^2$", "$12\\,000\\ \\text{m}^2$", "$1200\\ \\text{m}^2$", "$120\\ \\text{m}^2$"],
          poprawna: 2,
        },
        {
          nr: "41",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "W skali $1:100$ odcinek o długości $3$ cm na mapie odpowiada w rzeczywistości $3$ m.", litery: "PF", poprawna: 0 },
            { tekst: "W skali $1:1000$ odcinek o długości $2$ cm na mapie odpowiada w rzeczywistości $200$ m.", litery: "PF", poprawna: 1 },
            { tekst: "Jeśli długości na mapie zwiększymy dwukrotnie (przy tym samym terenie), to pola na mapie zwiększą się czterokrotnie.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "42",
          punkty: 2,
          tresc: "Odległość w terenie między schroniskiem a szczytem jest równa $4{,}5$ km, a na mapie ta odległość ma długość $9$ cm. Oblicz skalę tej mapy i zapisz ją w postaci $1:n$. **Zapisz obliczenia.**",
          rozwiazanie: "Zamieniamy odległość w terenie na centymetry: $4{,}5\\ \\text{km} = 4500\\ \\text{m} = 450\\,000\\ \\text{cm}$.\n\nSkala to stosunek odległości na mapie do odległości w terenie: $\\frac{9}{450\\,000} = \\frac{1}{50\\,000}$.\n\nOdpowiedź: skala mapy jest równa $1:50\\,000$.",
        },
        {
          nr: "43",
          punkty: 3,
          tresc: "Na mapie w skali $1:20\\,000$ jezioro ma kształt prostokąta o wymiarach $2{,}5$ cm i $1{,}2$ cm. Oblicz rzeczywiste pole jeziora w hektarach. **Zapisz obliczenia.**",
          rozwiazanie: "Rzeczywiste wymiary: $2{,}5\\cdot 20\\,000 = 50\\,000$ cm $= 500$ m oraz $1{,}2\\cdot 20\\,000 = 24\\,000$ cm $= 240$ m.\n\nPole: $500\\cdot 240 = 120\\,000\\ \\text{m}^2$.\n\nZamiana: $1\\ \\text{ha} = 10\\,000\\ \\text{m}^2$, więc $120\\,000 : 10\\,000 = 12$ ha.\n\nOdpowiedź: rzeczywiste pole jeziora jest równe $12$ ha.",
        },
      ],
      generatory: [
        {
          id: "mapa-odleglosc",
          nazwa: "Odległość i skala",
          opis: "Przelicz odległość z mapy na teren (w km), z terenu na mapę (w cm) albo wyznacz skalę mapy.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const n = r.pick([10000, 20000, 25000, 50000, 100000, 200000, 500000]);
              const d = r.int(2, 12);
              const km = q(d * n, 100000);
              return {
                tresc: `Na mapie w skali $${skala(n)}$ odległość między dwiema miejscowościami wynosi $${d}$ cm. Ile kilometrów dzieli te miejscowości w rzeczywistości?`,
                pola: [{ id: "d", typ: "liczba", etykieta: "Odległość w km" }],
                odpowiedz: { d: km },
                wynik: `$${dz(km)}$ km`,
                rozwiazanie: [
                  `W terenie odległość jest $${lc(n)}$ razy większa: $${d}\\cdot ${lc(n)} = ${lc(d * n)}$ cm.`,
                  `Zamieniamy na kilometry ($100\\,000$ cm $= 1$ km): $${lc(d * n)} : 100\\,000 = ${dz(km)}$ km.`,
                ],
              };
            }
            if (tryb === 1) {
              const n = r.pick([10000, 20000, 25000, 50000, 100000, 200000, 500000]);
              const mapa = q(1).mul(r.int(2, 12));
              const D = mapa.mul(n).div(100000);
              if (D.d > 10 || D.n > 100) return this.generuj(r);
              return {
                tresc: `Odległość między dwoma miejscami w terenie jest równa $${dz(D)}$ km. Jaką długość ma ta odległość na mapie w skali $${skala(n)}$? Podaj wynik w centymetrach.`,
                pola: [{ id: "d", typ: "liczba", etykieta: "Długość na mapie w cm" }],
                odpowiedz: { d: mapa },
                wynik: `$${dz(mapa)}$ cm`,
                rozwiazanie: [
                  `Zamieniamy na centymetry: $${dz(D)}$ km $= ${dz(D.mul(100000))}$ cm.`,
                  `Na mapie odległość jest $${lc(n)}$ razy mniejsza: $${dz(D.mul(100000))} : ${lc(n)} = ${dz(mapa)}$ cm.`,
                ],
              };
            }
            if (tryb === 2) {
              const n = r.pick([10000, 20000, 25000, 50000, 100000]);
              const d = r.int(2, 10);
              const D = q(d * n, 100000);
              return {
                tresc: `Odległość $${d}$ cm na mapie odpowiada w terenie odległości $${dz(D)}$ km. Skala tej mapy ma postać $1:n$. Oblicz $n$.`,
                pola: [{ id: "n", typ: "liczba", etykieta: "$n =$" }],
                odpowiedz: { n: q(n) },
                wynik: `$n = ${lc(n)}$`,
                rozwiazanie: [
                  `Zamieniamy odległość w terenie na centymetry: $${dz(D)}$ km $= ${lc(d * n)}$ cm.`,
                  `$n = \\frac{${lc(d * n)}}{${d}} = ${lc(n)}$, czyli skala to $${skala(n)}$.`,
                ],
              };
            }
            const n = r.pick([5000, 10000, 20000, 25000, 50000, 100000]);
            const m = n / 100;
            const jedn = m >= 1000 ? `${dz(q(m, 1000))} km` : `${m} m`;
            return {
              tresc: `Na mapie $1$ cm odpowiada w terenie ${jedn.replace(/^(\d[\d{},]*) /, "$$$1$ ")}. Skala tej mapy ma postać $1:n$. Oblicz $n$.`,
              pola: [{ id: "n", typ: "liczba", etykieta: "$n =$" }],
              odpowiedz: { n: q(n) },
              wynik: `$n = ${lc(n)}$`,
              rozwiazanie: [
                `Zamieniamy na centymetry: ${jedn.replace(/^(\d[\d{},]*) /, "$$$1$ ")} $= ${lc(n)}$ cm.`,
                `$1$ cm na mapie odpowiada $${lc(n)}$ cm w terenie, więc skala to $${skala(n)}$.`,
              ],
            };
          },
        },
        {
          id: "mapa-pole",
          nazwa: "Pole na mapie",
          opis: "Przelicz pole z mapy na teren (m² lub ha), z terenu na mapę albo wyznacz skalę z pól.",
          generuj(r) {
            const tryb = r.int(0, 2);
            const MALE = [500, 1000, 2000, 5000];
            const DUZE = [10000, 20000, 50000];
            if (tryb === 0) {
              const duza = r.chance();
              const n = r.pick(duza ? DUZE : MALE);
              const P = r.int(1, duza ? 8 : 9);
              const m2 = (P * n * n) / 10000;
              const ha = m2 / 10000;
              const wynik = duza ? ha : m2;
              return {
                tresc: `Na mapie w skali $${skala(n)}$ pole lasu jest równe $${P}\\ \\text{cm}^2$. Jakie jest rzeczywiste pole lasu (w ${duza ? "hektarach" : "metrach kwadratowych"})?`,
                pola: [{ id: "p", typ: "liczba", etykieta: duza ? "Pole w ha" : "Pole w $\\text{m}^2$" }],
                odpowiedz: { p: q(wynik) },
                wynik: duza ? `$${lc(wynik)}$ ha` : `$${lc(wynik)}\\ \\text{m}^2$`,
                rozwiazanie: [
                  `Pola mają się do siebie jak kwadrat skali, więc w terenie pole jest $${lc(n)}^2$ razy większe.`,
                  `$${P}\\cdot ${lc(n)}^2 = ${lc(P * n * n)}\\ \\text{cm}^2 = ${lc(m2)}\\ \\text{m}^2$.`,
                  ...(duza ? [`$${lc(m2)}\\ \\text{m}^2 = ${lc(ha)}$ ha.`] : []),
                ],
              };
            }
            if (tryb === 1) {
              const duza = r.chance();
              const n = r.pick(duza ? DUZE : MALE);
              const P = r.int(1, duza ? 8 : 9);
              const m2 = (P * n * n) / 10000;
              const ha = m2 / 10000;
              return {
                tresc: `Rzeczywiste pole jeziora jest równe $${duza ? `${lc(ha)}$ ha` : `${lc(m2)}\\ \\text{m}^2$`}. Jakie pole (w $\\text{cm}^2$) ma to jezioro na mapie w skali $${skala(n)}$?`,
                pola: [{ id: "p", typ: "liczba", etykieta: "Pole na mapie w $\\text{cm}^2$" }],
                odpowiedz: { p: q(P) },
                wynik: `$${P}\\ \\text{cm}^2$`,
                rozwiazanie: [
                  duza ? `Zamieniamy na $\\text{m}^2$ i $\\text{cm}^2$: $${lc(ha)}$ ha $= ${lc(m2)}\\ \\text{m}^2 = ${lc(m2 * 10000)}\\ \\text{cm}^2$.` : `Zamieniamy na $\\text{cm}^2$: $${lc(m2)}\\ \\text{m}^2 = ${lc(m2 * 10000)}\\ \\text{cm}^2$.`,
                  `Na mapie pole jest $${lc(n)}^2$ razy mniejsze: $${lc(m2 * 10000)} : ${lc(n)}^2 = ${P}\\ \\text{cm}^2$.`,
                ],
              };
            }
            const n = r.pick(MALE);
            const P = r.int(1, 9);
            const m2 = (P * n * n) / 10000;
            return {
              tresc: `Działka o rzeczywistym polu $${lc(m2)}\\ \\text{m}^2$ ma na mapie pole $${P}\\ \\text{cm}^2$. Skala tej mapy ma postać $1:n$. Oblicz $n$.`,
              pola: [{ id: "n", typ: "liczba", etykieta: "$n =$" }],
              odpowiedz: { n: q(n) },
              wynik: `$n = ${lc(n)}$`,
              rozwiazanie: [
                `Pole w terenie w $\\text{cm}^2$: $${lc(m2)}\\ \\text{m}^2 = ${lc(m2 * 10000)}\\ \\text{cm}^2$.`,
                `Pola mają się do siebie jak $n^2$: $n^2 = \\frac{${lc(m2 * 10000)}}{${P}} = ${lc(n * n)}$.`,
                `$n = \\sqrt{${lc(n * n)}} = ${lc(n)}$, czyli skala to $${skala(n)}$.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
