// Klasa 3 (liceum i technikum) · rozdział 4 „Geometria płaska – czworokąty” – Matematyka 3, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** „Ładna” odpowiedź: mianownik co najwyżej 12. */
const ladna = (v) => Math.abs(v.n) <= 100000 && v.d <= 12;

/** Trójki pitagorejskie (a, b, c) w najprostszej postaci. */
const TROJKI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]];

/** Nazwy wierzchołków czworokątów. */
const NAZWY4 = [["A", "B", "C", "D"], ["K", "L", "M", "N"], ["P", "Q", "R", "S"]];

/** Współczynnik przed literą: 1 się pomija. */
const wsp = (n) => (n === 1 ? "" : String(n));

/** Liczba w tekście zadania z przecinkiem dziesiętnym: 21/2 -> "10{,}5". */
const dec = (v) => (v.d === 1 ? String(v.n) : String(v.n / v.d).replace(".", "{,}"));

const nwd = (a, b) => (b ? nwd(b, a % b) : a);

/** Nazwy wielokątów (dopełniacz bez końcówki „a”): ośmiokąt -> „ośmiokąta”. */
const WIELOKAT = { 5: "pięciokąt", 6: "sześciokąt", 7: "siedmiokąt", 8: "ośmiokąt", 9: "dziewięciokąt", 10: "dziesięciokąt", 11: "jedenastokąt", 12: "dwunastokąt", 13: "trzynastokąt", 14: "czternastokąt", 15: "piętnastokąt", 16: "szesnastokąt" };

/** Wysokości z dwoma różnymi trójkątami prostokątnymi: h -> pary [x, a], gdzie x² + h² = a². */
const WYSOKOSCI = {
  8: [[6, 10], [15, 17]],
  12: [[5, 13], [9, 15], [16, 20], [35, 37]],
  15: [[8, 17], [20, 25]],
  20: [[15, 25], [21, 29]],
  24: [[7, 25], [10, 26], [32, 40]],
};

/** Trójki (x, h, c) dla trapezu równoramiennego: x = (a − b)/2, h – wysokość, c – ramię. */
const TRAPEZ = [[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [8, 6, 10], [9, 12, 15], [12, 16, 20], [8, 15, 17], [15, 8, 17], [7, 24, 25]];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 4.1
    {
      id: "podzial",
      nazwa: "Podział czworokątów. Trapezoidy",
      sciaga: [
        {
          nazwa: "Rodzaje czworokątów",
          slownie: "Trapez ma co najmniej jedną parę boków równoległych, równoległobok – dwie pary. Romb to równoległobok o równych bokach, prostokąt – o równych kątach, a kwadrat jest jednocześnie rombem i prostokątem. Czworokąt bez boków równoległych to trapezoid.",
          przyklad: "Czworokąt o czterech równych bokach i kątach prostych jest kwadratem, a więc także rombem, prostokątem, równoległobokiem i trapezem.",
          uwaga: "Zależność działa tylko w jedną stronę: każdy kwadrat jest rombem, ale nie każdy romb jest kwadratem.",
        },
        {
          nazwa: "Suma kątów czworokąta",
          slownie: "Przekątna dzieli czworokąt wypukły na dwa trójkąty, z których każdy ma sumę kątów $180^\\circ$. Dlatego cztery kąty czworokąta dają razem $360^\\circ$.",
          tex: "\\alpha+\\beta+\\gamma+\\delta=360^\\circ",
          litery: "$\\alpha$, $\\beta$, $\\gamma$, $\\delta$ – kąty wewnętrzne czworokąta.",
          przyklad: "Kąty $80^\\circ$, $95^\\circ$ i $110^\\circ$ mają sumę $285^\\circ$, więc czwarty kąt ma $360^\\circ - 285^\\circ = 75^\\circ$.",
          uwaga: "W trójkącie suma kątów to $180^\\circ$, w czworokącie $360^\\circ$ – nie mieszaj tych liczb.",
        },
        {
          nazwa: "Deltoid",
          slownie: "Deltoid to czworokąt, który ma dwie pary sąsiednich boków równych. Jego przekątne są prostopadłe, a jedna z nich jest osią symetrii i dzieli drugą na połowy.",
          tex: "|AB|=|AD|\\qquad|CB|=|CD|",
          litery: "Przekątna $AC$ jest osią symetrii, a $BD$ jest do niej prostopadła.",
          przyklad: "Dla $|AB|=|AD|=5$ i $|CB|=|CD|=8$ obwód to $2\\cdot5+2\\cdot8=26$.",
          uwaga: "W deltoidzie tylko jedna przekątna dzieli drugą na połowy (w równoległoboku – każda).",
        },
      ],
      jak: [
        "Zapisz, co wiadomo o bokach (równe? równoległe?) i o kątach (proste? równe?).",
        "Porównaj z definicjami: od najbardziej szczegółowej (kwadrat) do najogólniejszej (trapezoid).",
        "Gdy w zadaniu występują kąty czworokąta, wykorzystaj sumę $360^\\circ$.",
        "Gdy brakuje długości w deltoidzie lub rombie, narysuj przekątne i szukaj trójkątów prostokątnych.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Czworokąt ma wszystkie boki równej długości, jego przeciwległe boki są równoległe, ale kąty nie są proste. Ten czworokąt to. **Wybierz właściwą odpowiedź.**",
          opcje: ["prostokąt", "romb", "kwadrat", "trapez równoramienny"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Kąty czworokąta pozostają w stosunku $1 : 2 : 3 : 4$. Miara największego z nich jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$36^\\circ$", "$72^\\circ$", "$144^\\circ$", "$160^\\circ$"],
          poprawna: 2,
        },
        {
          nr: "3",
          tresc: "Trzy kąty czworokąta mają miary $100^\\circ$, $90^\\circ$ i $60^\\circ$. Czwarty kąt ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$170^\\circ$", "$250^\\circ$", "$70^\\circ$", "$110^\\circ$"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "Przyjmij, że trapez to czworokąt, który ma co najmniej jedną parę boków równoległych. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Każdy kwadrat jest rombem.", litery: "PF", poprawna: 0 },
            { tekst: "Każdy romb jest prostokątem.", litery: "PF", poprawna: 1 },
            { tekst: "Każdy równoległobok jest trapezem.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "5",
          tresc: "Deltoid $ABCD$ ma boki $|AB| = |AD| = 6$ i $|CB| = |CD| = 9$. Obwód tego deltoidu jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$30$", "$15$", "$21$", "$36$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Kąty wewnętrzne czworokąta mają miary $x$, $x + 20^\\circ$, $2x$ i $3x - 10^\\circ$. Oblicz miary tych kątów. **Zapisz obliczenia.**",
          rozwiazanie: "Suma kątów czworokąta jest równa $360^\\circ$, więc $x + (x + 20^\\circ) + 2x + (3x - 10^\\circ) = 360^\\circ$.\n\nPo uproszczeniu: $7x + 10^\\circ = 360^\\circ$, czyli $7x = 350^\\circ$ i $x = 50^\\circ$.\n\nKąty: $50^\\circ$, $50^\\circ + 20^\\circ = 70^\\circ$, $2\\cdot50^\\circ = 100^\\circ$, $3\\cdot50^\\circ - 10^\\circ = 140^\\circ$. Ich suma to $360^\\circ$.\n\nOdpowiedź: $50^\\circ$, $70^\\circ$, $100^\\circ$, $140^\\circ$.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Deltoid $ABCD$ ma boki $|AB| = |AD| = 10$ i $|CB| = |CD| = 17$, a jego przekątna $AC$ ma długość $21$. Oblicz długość drugiej przekątnej $BD$. **Zapisz obliczenia.**",
          rozwiazanie: "Przekątne deltoidu są prostopadłe, a $AC$ dzieli $BD$ na połowy. Niech $E$ będzie punktem przecięcia przekątnych oraz $|AE| = x$, więc $|EC| = 21 - x$.\n\nBok $BE$ jest wspólną przyprostokątną trójkątów $ABE$ i $CBE$: $10^2 - x^2 = 17^2 - (21 - x)^2$.\n\nStąd $100 - x^2 = 289 - 441 + 42x - x^2$, czyli $252 = 42x$ i $x = 6$.\n\n$|BE| = \\sqrt{10^2 - 6^2} = \\sqrt{64} = 8$, więc $|BD| = 2\\cdot8 = 16$.\n\nOdpowiedź: $|BD| = 16$.",
        },
      ],
      generatory: [
        {
          id: "podzial-kat",
          nazwa: "Kąt czworokąta",
          opis: "Oblicz kąt czworokąta z sumy kątów $360^\\circ$: brakujący kąt, kąty w stosunku albo kąty z niewiadomą.",
          generuj(r) {
            const [A, B, C, D] = r.pick(NAZWY4);
            const kw = `$${A}${B}${C}${D}$`;
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              for (;;) {
                const k1 = r.int(50, 140), k2 = r.int(50, 140), k3 = r.int(50, 140);
                const k4 = 360 - k1 - k2 - k3;
                if (k4 < 40 || k4 > 150) continue;
                return {
                  tresc: `Trzy kąty czworokąta ${kw} mają miary $${k1}^\\circ$, $${k2}^\\circ$ i $${k3}^\\circ$. Ile stopni ma czwarty kąt?`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Czwarty kąt (w stopniach)" }],
                  odpowiedz: { w: q(k4) },
                  wynik: `$${k4}^\\circ$`,
                  rozwiazanie: [
                    "Suma kątów czworokąta jest równa $360^\\circ$.",
                    `Suma trzech danych kątów: $${k1}^\\circ + ${k2}^\\circ + ${k3}^\\circ = ${k1 + k2 + k3}^\\circ$.`,
                    `Czwarty kąt: $360^\\circ - ${k1 + k2 + k3}^\\circ = ${k4}^\\circ$.`,
                  ],
                };
              }
            }
            if (tryb === 1) {
              for (;;) {
                const p = [r.int(1, 6), r.int(1, 6), r.int(1, 6), r.int(1, 6)];
                const s = p[0] + p[1] + p[2] + p[3];
                const najw = Math.max(...p), najm = Math.min(...p);
                if (360 % s || najw === najm || (360 / s) * najw >= 170) continue;
                const u = 360 / s;
                const duzy = r.chance();
                const cel = duzy ? najw : najm;
                return {
                  tresc: `Kąty czworokąta ${kw} pozostają w stosunku $${p.join(" : ")}$. Ile stopni ma ${duzy ? "największy" : "najmniejszy"} z tych kątów?`,
                  pola: [{ id: "w", typ: "liczba", etykieta: `${duzy ? "Największy" : "Najmniejszy"} kąt (w stopniach)` }],
                  odpowiedz: { w: q(cel * u) },
                  wynik: `$${cel * u}^\\circ$`,
                  rozwiazanie: [
                    `Kąty mają miary $${p.map((x) => `${wsp(x)}x`).join("$, $")}$, a ich suma jest równa $360^\\circ$.`,
                    `$${p.map((x) => `${wsp(x)}x`).join(" + ")} = ${s}x = 360^\\circ$, więc $x = ${u}^\\circ$.`,
                    `${duzy ? "Największy" : "Najmniejszy"} kąt: $${cel}\\cdot${u}^\\circ = ${cel * u}^\\circ$.`,
                  ],
                };
              }
            }
            for (;;) {
              const x = r.int(40, 80);
              const a = r.int(5, 50), b = r.int(5, 50);
              const c = 360 - 4 * x - a - b;
              if (c < 5 || c > 60) continue;
              const dod = [a, b, c].sort((u, v) => u - v);
              const najw = x + dod[2];
              return {
                tresc: `Kąty czworokąta ${kw} mają miary $x$, $x + ${dod[0]}^\\circ$, $x + ${dod[1]}^\\circ$ i $x + ${dod[2]}^\\circ$. Ile stopni ma największy kąt?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Największy kąt (w stopniach)" }],
                odpowiedz: { w: q(najw) },
                wynik: `$${najw}^\\circ$`,
                rozwiazanie: [
                  `Suma kątów jest równa $360^\\circ$: $x + (x + ${dod[0]}^\\circ) + (x + ${dod[1]}^\\circ) + (x + ${dod[2]}^\\circ) = 360^\\circ$.`,
                  `$4x + ${dod[0] + dod[1] + dod[2]}^\\circ = 360^\\circ$, więc $4x = ${360 - dod[0] - dod[1] - dod[2]}^\\circ$ i $x = ${x}^\\circ$.`,
                  `Największy kąt: $${x}^\\circ + ${dod[2]}^\\circ = ${najw}^\\circ$.`,
                ],
              };
            }
          },
        },
        {
          id: "podzial-deltoid",
          nazwa: "Przekątna deltoidu",
          opis: "Znasz boki deltoidu i jedną przekątną – oblicz drugą przekątną.",
          generuj(r) {
            const [A, B, C, D] = r.pick(NAZWY4);
            const h = r.pick([12, 15, 20, 24, 8]);
            const lista = WYSOKOSCI[h];
            const i = r.int(0, lista.length - 1);
            const j = r.intBez(0, lista.length - 1, i);
            const [x, a] = lista[i], [y, b] = lista[j];
            const e = x + y;
            return {
              tresc: `Deltoid $${A}${B}${C}${D}$ ma boki $|${A}${B}| = |${A}${D}| = ${a}$ i $|${C}${B}| = |${C}${D}| = ${b}$, a jego przekątna $${A}${C}$ ma długość $${e}$. Oblicz długość przekątnej $${B}${D}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: `$|${B}${D}| =$` }],
              odpowiedz: { w: q(2 * h) },
              wynik: `$|${B}${D}| = ${2 * h}$`,
              rozwiazanie: [
                `Przekątne deltoidu są prostopadłe, a $${A}${C}$ dzieli $${B}${D}$ na połowy. Niech $E$ będzie punktem ich przecięcia i $|${A}E| = x$.`,
                `Bok $${B}E$ jest wspólny dla trójkątów $${A}${B}E$ i $${C}${B}E$: $${a}^2 - x^2 = ${b}^2 - (${e} - x)^2$, skąd $x = ${x}$.`,
                `$|${B}E| = \\sqrt{${a}^2 - ${x}^2} = ${h}$.`,
                `$|${B}${D}| = 2\\cdot${h} = ${2 * h}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4.2
    {
      id: "trapezy",
      nazwa: "Trapezy",
      sciaga: [
        {
          nazwa: "Trapez i jego elementy",
          slownie: "Równoległe boki trapezu to podstawy, pozostałe dwa – ramiona. Wysokość to odległość między podstawami. Kąty leżące przy tym samym ramieniu dają razem $180^\\circ$.",
          tex: "\\alpha+\\delta=180^\\circ\\qquad\\beta+\\gamma=180^\\circ",
          litery: "W trapezie $ABCD$ z $AB \\parallel CD$: $\\alpha$, $\\beta$, $\\gamma$, $\\delta$ – kąty przy wierzchołkach $A$, $B$, $C$, $D$.",
          przyklad: "Jeśli $\\angle A = 65^\\circ$, to $\\angle D = 180^\\circ - 65^\\circ = 115^\\circ$.",
          uwaga: "Sumę $180^\\circ$ mają kąty przy tym samym ramieniu, a nie przy tej samej podstawie.",
        },
        {
          nazwa: "Odcinek łączący środki ramion",
          slownie: "Odcinek łączący środki ramion trapezu jest równoległy do podstaw, a jego długość to średnia arytmetyczna długości podstaw.",
          tex: "|MN|=\\frac{a+b}{2}",
          litery: "$a$, $b$ – długości podstaw, $M$, $N$ – środki ramion.",
          przyklad: "Dla podstaw $14$ i $6$: $|MN| = \\frac{14+6}{2} = 10$.",
          uwaga: "To średnia, a nie różnica podstaw. Gdy znasz $|MN|$ i jedną podstawę, drugą policz z $a + b = 2|MN|$.",
        },
        {
          nazwa: "Trapez równoramienny",
          slownie: "Ma równe ramiona, równe kąty przy każdej podstawie i równe przekątne. Wysokości poprowadzone z końców krótszej podstawy odcinają na dłuższej dwa jednakowe odcinki o długości $x$.",
          tex: "x=\\frac{a-b}{2}\\qquad h^2=c^2-x^2",
          litery: "$a$ – dłuższa podstawa, $b$ – krótsza podstawa, $c$ – ramię, $h$ – wysokość.",
          przyklad: "Dla $a=16$, $b=6$, $c=13$: $x = 5$, $h = \\sqrt{13^2 - 5^2} = 12$.",
          uwaga: "Odcinki $x$ są równe tylko w trapezie równoramiennym.",
        },
        {
          nazwa: "Trapez prostokątny",
          slownie: "Jedno z ramion jest prostopadłe do podstaw i jest wysokością. Drugie ramię jest przeciwprostokątną trójkąta prostokątnego o przyprostokątnych $h$ i $a - b$.",
          tex: "c^2=h^2+(a-b)^2",
          litery: "$a$, $b$ – podstawy, $h$ – krótsze ramię (wysokość), $c$ – dłuższe ramię.",
          przyklad: "Dla $a=12$, $b=7$, $h=12$: $c = \\sqrt{12^2 + 5^2} = 13$.",
        },
      ],
      jak: [
        "Zaznacz podstawy (boki równoległe) i ramiona.",
        "Poprowadź wysokości z końców krótszej podstawy – dostajesz prostokąt i trójkąty prostokątne.",
        "W trapezie równoramiennym odcinki na dłuższej podstawie mają długość $\\frac{a-b}{2}$ każdy.",
        "Brakujący bok oblicz z twierdzenia Pitagorasa, a gdy dany jest kąt – z funkcji trygonometrycznych.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "W trapezie $ABCD$ boki $AB$ i $CD$ są równoległe. Kąt $A$ ma miarę $72^\\circ$, a kąt $C$ miarę $115^\\circ$. Kąt $D$ ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$108^\\circ$", "$115^\\circ$", "$72^\\circ$", "$65^\\circ$"],
          poprawna: 0,
        },
        {
          nr: "9",
          tresc: "Podstawy trapezu mają długości $18$ i $10$. Odcinek łączący środki ramion tego trapezu ma długość. **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$14$", "$8$", "$28$"],
          poprawna: 1,
        },
        {
          nr: "10",
          tresc: "Odcinek łączący środki ramion trapezu ma długość $9$, a jedna z podstaw ma długość $12$. Druga podstawa ma długość. **Wybierz właściwą odpowiedź.**",
          opcje: ["$10{,}5$", "$3$", "$21$", "$6$"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "Podstawy trapezu równoramiennego mają długości $18$ i $8$, a ramię ma długość $13$. Wysokość tego trapezu jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$\\sqrt{69}$", "$12$", "$\\sqrt{105}$"],
          poprawna: 2,
        },
        {
          nr: "12",
          tresc: "Rozważ trapez równoramienny, który nie jest prostokątem. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Kąty przy tej samej podstawie mają równe miary.", litery: "PF", poprawna: 0 },
            { tekst: "Przekątne mają równe długości.", litery: "PF", poprawna: 0 },
            { tekst: "Kąty przy tym samym ramieniu mają równe miary.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 3,
          tresc: "W trapezie równoramiennym $ABCD$ ($AB \\parallel CD$) mamy $|AB| = 21$, $|CD| = 9$, a wysokość trapezu jest równa $8$. Oblicz obwód trapezu i długość jego przekątnej $AC$. **Zapisz obliczenia.**",
          rozwiazanie: "Wysokości poprowadzone z końców krótszej podstawy odcinają na dłuższej podstawie odcinki długości $\\frac{21 - 9}{2} = 6$.\n\nRamię: $c = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$. Obwód: $21 + 9 + 2\\cdot10 = 50$.\n\nSpodek wysokości poprowadzonej z $C$ leży na $AB$ w odległości $6 + 9 = 15$ od punktu $A$.\n\nPrzekątna: $|AC| = \\sqrt{15^2 + 8^2} = \\sqrt{289} = 17$.\n\nOdpowiedź: obwód jest równy $50$, a $|AC| = 17$.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "W trapezie prostokątnym $ABCD$ podstawy $AB$ i $CD$ są równoległe, kąt $A$ jest prosty, $|AB| = 14$, $|CD| = 8$ oraz $\\angle B = 60^\\circ$. Oblicz wysokość trapezu i długość ramienia $BC$. **Zapisz obliczenia.**",
          rozwiazanie: "Niech $E$ będzie spodkiem wysokości poprowadzonej z wierzchołka $C$ na bok $AB$. Wtedy $|AE| = |CD| = 8$, więc $|EB| = 14 - 8 = 6$.\n\nW trójkącie prostokątnym $EBC$ kąt przy $B$ ma $60^\\circ$, a przyprostokątna $EB$ jest do niego przyległa.\n\n$|BC| = \\frac{|EB|}{\\cos 60^\\circ} = 6 : \\frac{1}{2} = 12$.\n\nWysokość: $|CE| = |EB|\\cdot\\operatorname{tg}60^\\circ = 6\\sqrt{3}$.\n\nOdpowiedź: wysokość jest równa $6\\sqrt{3}$, a $|BC| = 12$.",
        },
      ],
      generatory: [
        {
          id: "trapezy-linia",
          nazwa: "Środki ramion",
          opis: "Odcinek łączący środki ramion trapezu: oblicz jego długość albo długość drugiej podstawy.",
          generuj(r) {
            if (r.chance()) {
              const a = r.int(6, 30), b = r.intBez(2, 28, a);
              const mn = q(a + b, 2);
              return {
                tresc: `Podstawy trapezu mają długości $${a}$ i $${b}$. Oblicz długość odcinka łączącego środki ramion tego trapezu.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$|MN| =$" }],
                odpowiedz: { w: mn },
                wynik: `$|MN| = ${mn.tex()}$`,
                rozwiazanie: [
                  "Odcinek łączący środki ramion ma długość równą średniej arytmetycznej podstaw.",
                  `$|MN| = \\frac{${a} + ${b}}{2} = \\frac{${a + b}}{2}$.`,
                  `$|MN| = ${mn.tex()}$.`,
                ],
              };
            }
            for (;;) {
              const a = r.int(6, 30), m = r.int(5, 25);
              const b = 2 * m - a;
              if (b < 2 || b === a) continue;
              return {
                tresc: `Odcinek łączący środki ramion trapezu ma długość $${m}$, a jedna z podstaw ma długość $${a}$. Oblicz długość drugiej podstawy.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Druga podstawa" }],
                odpowiedz: { w: q(b) },
                wynik: `$${b}$`,
                rozwiazanie: [
                  "Odcinek łączący środki ramion ma długość $\\frac{a + b}{2}$, więc $a + b = 2\\cdot|MN|$.",
                  `$${a} + b = 2\\cdot${m} = ${2 * m}$.`,
                  `$b = ${2 * m} - ${a} = ${b}$.`,
                ],
              };
            }
          },
        },
        {
          id: "trapezy-rownoramienny",
          nazwa: "Trapez równoramienny",
          opis: "Trapez równoramienny: oblicz wysokość, obwód albo długość dłuższej podstawy z twierdzenia Pitagorasa.",
          generuj(r) {
            const [x, h, c] = r.pick(TRAPEZ);
            const b = r.int(3, 12);
            const a = b + 2 * x;
            const tryb = r.int(0, 2);
            const odc = `Wysokości poprowadzone z końców krótszej podstawy odcinają na dłuższej podstawie odcinki długości $\\frac{${a} - ${b}}{2} = ${x}$.`;
            if (tryb === 0) {
              return {
                tresc: `W trapezie równoramiennym $ABCD$ ($AB \\parallel CD$) mamy $|AB| = ${a}$, $|CD| = ${b}$ i $|BC| = |AD| = ${c}$. Oblicz wysokość tego trapezu.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wysokość" }],
                odpowiedz: { w: q(h) },
                wynik: `$${h}$`,
                rozwiazanie: [odc, `Wysokość jest przyprostokątną trójkąta o przeciwprostokątnej $${c}$ i przyprostokątnej $${x}$.`, `$h = \\sqrt{${c}^2 - ${x}^2} = ${h}$.`],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `W trapezie równoramiennym $ABCD$ ($AB \\parallel CD$) mamy $|AB| = ${a}$, $|CD| = ${b}$, a wysokość trapezu jest równa $${h}$. Oblicz obwód tego trapezu.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Obwód" }],
                odpowiedz: { w: q(a + b + 2 * c) },
                wynik: `$${a + b + 2 * c}$`,
                rozwiazanie: [odc, `Ramię: $c = \\sqrt{${x}^2 + ${h}^2} = ${c}$.`, `Obwód: $${a} + ${b} + 2\\cdot${c} = ${a + b + 2 * c}$.`],
              };
            }
            return {
              tresc: `W trapezie równoramiennym $ABCD$ ($AB \\parallel CD$) mamy $|CD| = ${b}$, $|BC| = |AD| = ${c}$, a wysokość trapezu jest równa $${h}$. Oblicz długość podstawy $AB$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "$|AB| =$" }],
              odpowiedz: { w: q(a) },
              wynik: `$|AB| = ${a}$`,
              rozwiazanie: [
                `Wysokości poprowadzone z końców krótszej podstawy odcinają na $AB$ odcinki o długości $x = \\sqrt{${c}^2 - ${h}^2} = ${x}$.`,
                `$|AB| = |CD| + 2x = ${b} + 2\\cdot${x}$.`,
                `$|AB| = ${a}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4.3
    {
      id: "rownolegloboki",
      nazwa: "Równoległoboki",
      sciaga: [
        {
          nazwa: "Własności równoległoboku",
          slownie: "Przeciwległe boki są równe i równoległe, przeciwległe kąty są równe, a kąty przy tym samym boku dają razem $180^\\circ$. Przekątne dzielą się na połowy.",
          tex: "|AB|=|CD|\\qquad|BC|=|AD|\\qquad\\angle A=\\angle C\\qquad\\angle A+\\angle B=180^\\circ",
          przyklad: "Jeśli $\\angle A = 70^\\circ$, to $\\angle C = 70^\\circ$ oraz $\\angle B = \\angle D = 110^\\circ$.",
          uwaga: "Przekątne równoległoboku na ogół nie są równe ani prostopadłe.",
        },
        {
          nazwa: "Prostokąt i kwadrat",
          slownie: "W prostokącie wszystkie kąty są proste, a przekątne są równe i dzielą się na połowy. Przekątną liczymy z twierdzenia Pitagorasa. Kwadrat to prostokąt o równych bokach.",
          tex: "d=\\sqrt{a^2+b^2}\\qquad d=a\\sqrt{2}",
          litery: "$a$, $b$ – boki prostokąta, $d$ – przekątna; drugi wzór dotyczy kwadratu o boku $a$.",
          przyklad: "Dla boków $6$ i $8$: $d = \\sqrt{36 + 64} = 10$. Dla kwadratu o boku $5$: $d = 5\\sqrt{2}$.",
        },
        {
          nazwa: "Romb",
          slownie: "Romb ma cztery równe boki. Jego przekątne są prostopadłe, dzielą się na połowy i są dwusiecznymi kątów. Bok jest przeciwprostokątną trójkąta o przyprostokątnych równych połowom przekątnych.",
          tex: "a^2=\\left(\\frac{e}{2}\\right)^2+\\left(\\frac{f}{2}\\right)^2",
          litery: "$a$ – bok rombu, $e$, $f$ – jego przekątne.",
          przyklad: "Dla $e = 16$ i $f = 12$: $a = \\sqrt{8^2 + 6^2} = 10$.",
          uwaga: "W trójkącie prostokątnym liczą się połowy przekątnych, a nie całe przekątne.",
        },
        {
          nazwa: "Wysokość równoległoboku",
          slownie: "Wysokość opuszczona na bok $a$ jest prostopadła do tego boku. Razem z drugim bokiem $b$ tworzy trójkąt prostokątny, w którym $b$ jest przeciwprostokątną, a kąt ostry równoległoboku leży naprzeciw wysokości.",
          tex: "h=b\\sin\\alpha",
          litery: "$h$ – wysokość opuszczona na bok $a$, $b$ – drugi bok, $\\alpha$ – kąt ostry równoległoboku.",
          przyklad: "Dla $b = 8$ i $\\alpha = 30^\\circ$: $h = 8\\cdot\\sin30^\\circ = 4$.",
          uwaga: "Wysokość opuszczona na bok $a$ zależy od drugiego boku $b$, a nie od $a$.",
        },
      ],
      jak: [
        "Narysuj figurę i zaznacz dane. Rozpoznaj, czy to równoległobok, romb czy prostokąt.",
        "Dla kątów użyj własności: przeciwległe są równe, sąsiednie dają razem $180^\\circ$.",
        "Gdy w zadaniu są przekątne rombu albo prostokąta, wyróżnij trójkąt prostokątny i użyj twierdzenia Pitagorasa.",
        "Wysokość równoległoboku znajdź z trójkąta prostokątnego, używając sinusa kąta ostrego.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "W równoległoboku $ABCD$ kąt $A$ ma miarę $68^\\circ$. Kąt $B$ ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$68^\\circ$", "$112^\\circ$", "$22^\\circ$", "$292^\\circ$"],
          poprawna: 1,
        },
        {
          nr: "16",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "W każdym prostokącie przekątne są prostopadłe.", litery: "PF", poprawna: 1 },
            { tekst: "W każdym rombie przekątne są prostopadłe.", litery: "PF", poprawna: 0 },
            { tekst: "W każdym równoległoboku przekątne dzielą się na połowy.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "17",
          tresc: "Przekątne rombu mają długości $10$ i $24$. Bok tego rombu ma długość. **Wybierz właściwą odpowiedź.**",
          opcje: ["$17$", "$26$", "$34$", "$13$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "Boki prostokąta mają długości $9$ i $12$. Przekątna tego prostokąta ma długość. **Wybierz właściwą odpowiedź.**",
          opcje: ["$15$", "$21$", "$3\\sqrt{7}$", "$108$"],
          poprawna: 0,
        },
        {
          nr: "19",
          tresc: "Boki równoległoboku mają długości $12$ i $8$, a jego kąt ostry ma miarę $30^\\circ$. Wysokość opuszczona na dłuższy bok jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$4\\sqrt{3}$", "$4$", "$8$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Bok rombu ma długość $17$, a jedna z jego przekątnych ma długość $30$. Oblicz długość drugiej przekątnej. **Zapisz obliczenia.**",
          rozwiazanie: "Przekątne rombu są prostopadłe i dzielą się na połowy. Bok rombu jest więc przeciwprostokątną trójkąta, którego przyprostokątnymi są połowy przekątnych.\n\nPołowa danej przekątnej ma długość $15$, a połowa drugiej: $\\sqrt{17^2 - 15^2} = \\sqrt{64} = 8$.\n\nDruga przekątna ma więc długość $2\\cdot8 = 16$.\n\nOdpowiedź: $16$.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "W równoległoboku $ABCD$ mamy $|AB| = 14$, $|AD| = 6\\sqrt{2}$ i $\\angle DAB = 45^\\circ$. Oblicz długość wysokości poprowadzonej z wierzchołka $D$ na bok $AB$ oraz długość krótszej przekątnej. **Zapisz obliczenia.**",
          rozwiazanie: "Niech $E$ będzie spodkiem wysokości z wierzchołka $D$ na bok $AB$. W trójkącie prostokątnym $AED$ przeciwprostokątna ma długość $6\\sqrt{2}$, a kąt przy $A$ ma $45^\\circ$.\n\n$|DE| = 6\\sqrt{2}\\cdot\\sin45^\\circ = 6\\sqrt{2}\\cdot\\frac{\\sqrt{2}}{2} = 6$ oraz $|AE| = 6\\sqrt{2}\\cdot\\cos45^\\circ = 6$.\n\nPunkt $E$ leży między $A$ i $B$, $|EB| = 14 - 6 = 8$, więc $|BD| = \\sqrt{8^2 + 6^2} = 10$.\n\nDrugą przekątną liczymy podobnie: spodek wysokości z $C$ leży w odległości $14 + 6 = 20$ od $A$, więc $|AC| = \\sqrt{20^2 + 6^2} = \\sqrt{436}$, a $\\sqrt{436} > 10$.\n\nOdpowiedź: wysokość jest równa $6$, a krótsza przekątna to $BD$ i $|BD| = 10$.",
        },
      ],
      generatory: [
        {
          id: "rownolegloboki-przekatne",
          nazwa: "Romb i prostokąt",
          opis: "Oblicz bok lub przekątną rombu albo prostokąta, korzystając z twierdzenia Pitagorasa.",
          generuj(r) {
            for (;;) {
              const [p, s, c0] = r.pick(TROJKI);
              const k = r.int(1, 2);
              const [u, v] = r.chance() ? [p * k, s * k] : [s * k, p * k];
              const c = c0 * k;
              if (c > 40) continue;
              const [A, B, C, D] = r.pick(NAZWY4);
              const tryb = r.int(0, 3);
              if (tryb === 0) {
                return {
                  tresc: `Przekątne rombu $${A}${B}${C}${D}$ mają długości $|${A}${C}| = ${2 * u}$ i $|${B}${D}| = ${2 * v}$. Oblicz długość boku tego rombu.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: `$|${A}${B}| =$` }],
                  odpowiedz: { w: q(c) },
                  wynik: `$|${A}${B}| = ${c}$`,
                  rozwiazanie: [
                    `Przekątne rombu są prostopadłe i dzielą się na połowy: połowy mają długości $${u}$ i $${v}$.`,
                    `Bok jest przeciwprostokątną trójkąta o przyprostokątnych $${u}$ i $${v}$.`,
                    `$|${A}${B}| = \\sqrt{${u}^2 + ${v}^2} = ${c}$.`,
                  ],
                };
              }
              if (tryb === 1) {
                return {
                  tresc: `Bok rombu $${A}${B}${C}${D}$ ma długość $${c}$, a jedna z przekątnych ma długość $|${A}${C}| = ${2 * u}$. Oblicz długość drugiej przekątnej $${B}${D}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: `$|${B}${D}| =$` }],
                  odpowiedz: { w: q(2 * v) },
                  wynik: `$|${B}${D}| = ${2 * v}$`,
                  rozwiazanie: [
                    `Przekątne rombu są prostopadłe i dzielą się na połowy. Połowa przekątnej $${A}${C}$ ma długość $${u}$.`,
                    `Połowa drugiej przekątnej: $\\sqrt{${c}^2 - ${u}^2} = ${v}$.`,
                    `$|${B}${D}| = 2\\cdot${v} = ${2 * v}$.`,
                  ],
                };
              }
              if (tryb === 2) {
                return {
                  tresc: `Boki prostokąta $${A}${B}${C}${D}$ mają długości $|${A}${B}| = ${u}$ i $|${B}${C}| = ${v}$. Oblicz długość jego przekątnej.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: `$|${A}${C}| =$` }],
                  odpowiedz: { w: q(c) },
                  wynik: `$|${A}${C}| = ${c}$`,
                  rozwiazanie: [
                    `Przekątna jest przeciwprostokątną trójkąta prostokątnego $${A}${B}${C}$.`,
                    `$|${A}${C}| = \\sqrt{${u}^2 + ${v}^2} = ${c}$.`,
                  ],
                };
              }
              return {
                tresc: `Przekątna prostokąta $${A}${B}${C}${D}$ ma długość $${c}$, a bok $|${A}${B}| = ${u}$. Oblicz długość boku $${B}${C}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `$|${B}${C}| =$` }],
                odpowiedz: { w: q(v) },
                wynik: `$|${B}${C}| = ${v}$`,
                rozwiazanie: [
                  `Trójkąt $${A}${B}${C}$ jest prostokątny, a $${A}${C}$ jest jego przeciwprostokątną.`,
                  `$|${B}${C}| = \\sqrt{${c}^2 - ${u}^2} = ${v}$.`,
                ],
              };
            }
          },
        },
        {
          id: "rownolegloboki-wysokosc",
          nazwa: "Wysokość równoległoboku",
          opis: "Znasz kąt ostry (30°, 45° albo 60°) i bok równoległoboku – oblicz wysokość.",
          generuj(r) {
            const alfa = r.pick([30, 45, 60]);
            const [A, B, C, D] = r.pick(NAZWY4);
            const a = r.int(8, 24);
            let b, bTex, h, hTex, pole, krok;
            if (alfa === 30) {
              b = r.int(3, 20);
              bTex = String(b);
              h = q(b, 2);
              hTex = h.tex();
              pole = { id: "w", typ: "liczba", etykieta: "Wysokość" };
              krok = `$h = ${b}\\cdot\\sin30^\\circ = ${b}\\cdot\\frac{1}{2} = ${hTex}$.`;
            } else if (alfa === 45) {
              const t = r.int(2, 12);
              b = t;
              bTex = `${t}\\sqrt{2}`;
              h = q(t);
              hTex = String(t);
              pole = { id: "w", typ: "liczba", etykieta: "Wysokość" };
              krok = `$h = ${t}\\sqrt{2}\\cdot\\sin45^\\circ = ${t}\\sqrt{2}\\cdot\\frac{\\sqrt{2}}{2} = ${t}$.`;
            } else {
              const t = r.int(2, 10);
              b = 2 * t;
              bTex = String(2 * t);
              h = q(t);
              hTex = `${wsp(t)}\\sqrt{3}`;
              pole = { id: "w", typ: "liczba", etykieta: "$h = k\\sqrt{3}$, gdzie $k =$" };
              krok = `$h = ${2 * t}\\cdot\\sin60^\\circ = ${2 * t}\\cdot\\frac{\\sqrt{3}}{2} = ${hTex}$.`;
            }
            return {
              tresc: `W równoległoboku $${A}${B}${C}${D}$ mamy $|${A}${B}| = ${a}$, $|${A}${D}| = ${bTex}$ i $\\angle ${D}${A}${B} = ${alfa}^\\circ$. Oblicz wysokość poprowadzoną z wierzchołka $${D}$ na bok $${A}${B}$.${alfa === 60 ? ` Wynik zapisz w postaci $k\\sqrt{3}$.` : ""}`,
              pola: [pole],
              odpowiedz: { w: h },
              wynik: `$h = ${hTex}$`,
              rozwiazanie: [
                `Niech $E$ będzie spodkiem wysokości z wierzchołka $${D}$. Trójkąt $${A}E${D}$ jest prostokątny, a jego przeciwprostokątna $${A}${D}$ ma długość $${bTex}$.`,
                `Wysokość $${D}E$ leży naprzeciw kąta $${alfa}^\\circ$, więc $h = |${A}${D}|\\cdot\\sin${alfa}^\\circ$.`,
                krok,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4.4
    {
      id: "wielokaty",
      nazwa: "Wielokąty. Wielokąt foremny",
      sciaga: [
        {
          nazwa: "Suma kątów wielokąta",
          slownie: "Przekątne wychodzące z jednego wierzchołka dzielą wielokąt wypukły o $n$ bokach na $n - 2$ trójkąty. Każdy ma sumę kątów $180^\\circ$.",
          tex: "S_n=(n-2)\\cdot180^\\circ",
          litery: "$n$ – liczba boków (i wierzchołków), $S_n$ – suma kątów wewnętrznych.",
          przyklad: "Dla sześciokąta: $S_6 = 4\\cdot180^\\circ = 720^\\circ$.",
          uwaga: "Dla $n = 3$ i $n = 4$ wzór daje znane sumy $180^\\circ$ i $360^\\circ$.",
        },
        {
          nazwa: "Wielokąt foremny",
          slownie: "Wielokąt foremny ma wszystkie boki równe i wszystkie kąty równe. Kąt wewnętrzny to suma kątów podzielona przez $n$, a kąt zewnętrzny uzupełnia go do $180^\\circ$.",
          tex: "\\alpha=\\frac{(n-2)\\cdot180^\\circ}{n}\\qquad\\beta=\\frac{360^\\circ}{n}",
          litery: "$\\alpha$ – kąt wewnętrzny, $\\beta$ – kąt zewnętrzny, $\\alpha + \\beta = 180^\\circ$.",
          przyklad: "Ośmiokąt foremny: $\\alpha = \\frac{6\\cdot180^\\circ}{8} = 135^\\circ$, $\\beta = \\frac{360^\\circ}{8} = 45^\\circ$.",
          uwaga: "Gdy dany jest kąt wewnętrzny, najłatwiej obliczyć kąt zewnętrzny $180^\\circ - \\alpha$ i podzielić $360^\\circ$ przez niego.",
        },
        {
          nazwa: "Liczba przekątnych",
          slownie: "Z jednego wierzchołka wychodzi $n - 3$ przekątnych (nie liczymy dwóch sąsiednich wierzchołków i samego siebie). Każdą przekątną liczymy dwa razy, więc wynik dzielimy przez $2$.",
          tex: "\\frac{n(n-3)}{2}",
          litery: "$n$ – liczba wierzchołków.",
          przyklad: "Dziesięciokąt ma $\\frac{10\\cdot7}{2} = 35$ przekątnych.",
          uwaga: "Nie zapomnij o dzieleniu przez $2$.",
        },
        {
          nazwa: "Kąt środkowy",
          slownie: "Środek $O$ wielokąta foremnego jest jednakowo odległy od wszystkich wierzchołków. Kąt środkowy, oparty na jednym boku, mierzy $\\frac{360^\\circ}{n}$. W sześciokącie foremnym trójkąt $AOB$ jest równoboczny.",
          tex: "\\varphi=\\frac{360^\\circ}{n}",
          litery: "$\\varphi$ – kąt środkowy, $n$ – liczba boków.",
          przyklad: "Sześciokąt foremny o boku $4$: $\\varphi = 60^\\circ$, więc $|OA| = |OB| = |AB| = 4$.",
        },
      ],
      jak: [
        "Ustal liczbę boków $n$ (z nazwy wielokąta lub z treści zadania).",
        "Suma kątów to $(n-2)\\cdot180^\\circ$. Gdy wielokąt jest foremny, podziel ją przez $n$.",
        "Gdy szukasz $n$ z podanego kąta lub sumy, zapisz równanie i je rozwiąż.",
        "W zadaniach z długościami narysuj trójkąt równoramienny z kątem środkowym albo wewnętrznym i użyj trygonometrii.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Suma kątów wewnętrznych ośmiokąta wypukłego jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$720^\\circ$", "$1080^\\circ$", "$1260^\\circ$", "$1440^\\circ$"],
          poprawna: 1,
        },
        {
          nr: "23",
          tresc: "Kąt wewnętrzny dwunastokąta foremnego ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$150^\\circ$", "$30^\\circ$", "$135^\\circ$", "$120^\\circ$"],
          poprawna: 0,
        },
        {
          nr: "24",
          tresc: "Liczba przekątnych dziewięciokąta wypukłego jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$18$", "$54$", "$27$", "$36$"],
          poprawna: 2,
        },
        {
          nr: "25",
          tresc: "Kąt wewnętrzny pewnego wielokąta foremnego ma miarę $140^\\circ$. Ten wielokąt ma. **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$ boków", "$10$ boków", "$8$ boków", "$9$ boków"],
          poprawna: 3,
        },
        {
          nr: "26",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Suma kątów wewnętrznych każdego sześciokąta wypukłego jest równa $720^\\circ$.", litery: "PF", poprawna: 0 },
            { tekst: "Kąt wewnętrzny pięciokąta foremnego ma miarę $100^\\circ$.", litery: "PF", poprawna: 1 },
            { tekst: "Z jednego wierzchołka siedmiokąta wypukłego można poprowadzić $4$ przekątne.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Suma kątów wewnętrznych pewnego wielokąta wypukłego jest równa $2340^\\circ$. Ile boków i ile przekątnych ma ten wielokąt? **Zapisz obliczenia.**",
          rozwiazanie: "Suma kątów to $(n - 2)\\cdot180^\\circ = 2340^\\circ$, więc $n - 2 = 2340 : 180 = 13$ i $n = 15$.\n\nLiczba przekątnych: $\\frac{n(n-3)}{2} = \\frac{15\\cdot12}{2} = 90$.\n\nOdpowiedź: wielokąt ma $15$ boków i $90$ przekątnych.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "Sześciokąt foremny $ABCDEF$ ma bok długości $6$. Oblicz miarę kąta $ABC$ oraz długości przekątnych $AC$ i $AD$. **Zapisz obliczenia.**",
          rozwiazanie: "Kąt wewnętrzny sześciokąta foremnego: $\\frac{(6-2)\\cdot180^\\circ}{6} = 120^\\circ$, więc $\\angle ABC = 120^\\circ$.\n\nTrójkąt $ABC$ jest równoramienny ($|AB| = |BC| = 6$), a jego kąty przy podstawie $AC$ mają po $\\frac{180^\\circ - 120^\\circ}{2} = 30^\\circ$.\n\nWysokość z $B$ dzieli $AC$ na połowy: $\\frac{|AC|}{2} = 6\\cdot\\cos30^\\circ = 3\\sqrt{3}$, więc $|AC| = 6\\sqrt{3}$.\n\nKąt środkowy ma $\\frac{360^\\circ}{6} = 60^\\circ$, więc trójkąt $AOB$ (gdzie $O$ jest środkiem sześciokąta) jest równoboczny i $|AO| = 6$. Przekątna $AD$ przechodzi przez $O$, więc $|AD| = 2\\cdot6 = 12$.\n\nOdpowiedź: $\\angle ABC = 120^\\circ$, $|AC| = 6\\sqrt{3}$, $|AD| = 12$.",
        },
      ],
      generatory: [
        {
          id: "wielokaty-suma",
          nazwa: "Suma kątów i przekątne",
          opis: "Suma kątów wewnętrznych i liczba przekątnych wielokąta wypukłego o $n$ bokach.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const n = r.int(5, 16);
              return {
                tresc: `Oblicz sumę kątów wewnętrznych ${WIELOKAT[n]}a wypukłego (w stopniach).`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Suma kątów (w stopniach)" }],
                odpowiedz: { w: q((n - 2) * 180) },
                wynik: `$${(n - 2) * 180}^\\circ$`,
                rozwiazanie: [`Wielokąt ma $${n}$ boków, więc suma kątów to $(n - 2)\\cdot180^\\circ$.`, `$(${n} - 2)\\cdot180^\\circ = ${n - 2}\\cdot180^\\circ = ${(n - 2) * 180}^\\circ$.`],
              };
            }
            if (tryb === 1) {
              const n = r.int(5, 20);
              const s = (n - 2) * 180;
              return {
                tresc: `Suma kątów wewnętrznych pewnego wielokąta wypukłego jest równa $${s}^\\circ$. Ile boków ma ten wielokąt?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba boków" }],
                odpowiedz: { w: q(n) },
                wynik: `$${n}$`,
                rozwiazanie: [`Suma kątów to $(n - 2)\\cdot180^\\circ = ${s}^\\circ$.`, `$n - 2 = ${s} : 180 = ${n - 2}$.`, `$n = ${n}$.`],
              };
            }
            if (tryb === 2) {
              const n = r.int(5, 20);
              const d = (n * (n - 3)) / 2;
              return {
                tresc: n <= 16
                  ? `Ile przekątnych ma ${WIELOKAT[n]} wypukły?`
                  : `Ile przekątnych ma wielokąt wypukły o $${n}$ bokach?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba przekątnych" }],
                odpowiedz: { w: q(d) },
                wynik: `$${d}$`,
                rozwiazanie: [`Z jednego wierzchołka wychodzi $n - 3 = ${n - 3}$ przekątnych.`, `Każdą przekątną policzyliśmy dwa razy: $\\frac{n(n-3)}{2} = \\frac{${n}\\cdot${n - 3}}{2}$.`, `Liczba przekątnych: $${d}$.`],
              };
            }
            const n = r.int(6, 16);
            const d = (n * (n - 3)) / 2;
            return {
              tresc: `Z jednego wierzchołka wielokąta wypukłego można poprowadzić $${n - 3}$ przekątnych. Ile przekątnych ma ten wielokąt?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba przekątnych" }],
              odpowiedz: { w: q(d) },
              wynik: `$${d}$`,
              rozwiazanie: [`Z jednego wierzchołka wychodzi $n - 3$ przekątnych, więc $n - 3 = ${n - 3}$ i $n = ${n}$.`, `Liczba przekątnych: $\\frac{n(n-3)}{2} = \\frac{${n}\\cdot${n - 3}}{2} = ${d}$.`],
            };
          },
        },
        {
          id: "wielokaty-foremny",
          nazwa: "Wielokąt foremny",
          opis: "Kąt wewnętrzny, zewnętrzny albo środkowy wielokąta foremnego, a także liczba jego boków.",
          generuj(r) {
            const n = r.pick([5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36]);
            const wew = 180 - 360 / n;
            const zew = 360 / n;
            const o = n <= 12 ? `${WIELOKAT[n]}a foremnego` : `wielokąta foremnego o $${n}$ bokach`;
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              return {
                tresc: `Ile stopni ma kąt wewnętrzny ${o}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Kąt wewnętrzny (w stopniach)" }],
                odpowiedz: { w: q(wew) },
                wynik: `$${wew}^\\circ$`,
                rozwiazanie: [`Suma kątów wewnętrznych: $(${n} - 2)\\cdot180^\\circ = ${(n - 2) * 180}^\\circ$.`, `Kąty są równe, więc jeden z nich ma $${(n - 2) * 180}^\\circ : ${n} = ${wew}^\\circ$.`],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Kąt wewnętrzny pewnego wielokąta foremnego ma miarę $${wew}^\\circ$. Ile boków ma ten wielokąt?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba boków" }],
                odpowiedz: { w: q(n) },
                wynik: `$${n}$`,
                rozwiazanie: [`Kąt zewnętrzny: $180^\\circ - ${wew}^\\circ = ${zew}^\\circ$.`, `Kąty zewnętrzne dają razem $360^\\circ$, więc $n = 360 : ${zew} = ${n}$.`],
              };
            }
            if (tryb === 2) {
              return {
                tresc: `Kąt zewnętrzny pewnego wielokąta foremnego ma miarę $${zew}^\\circ$. Ile stopni ma kąt wewnętrzny tego wielokąta?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Kąt wewnętrzny (w stopniach)" }],
                odpowiedz: { w: q(wew) },
                wynik: `$${wew}^\\circ$`,
                rozwiazanie: [`Kąt wewnętrzny i zewnętrzny dają razem $180^\\circ$.`, `$180^\\circ - ${zew}^\\circ = ${wew}^\\circ$.`],
              };
            }
            return {
              tresc: `Ile stopni ma kąt środkowy ${o}?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Kąt środkowy (w stopniach)" }],
              odpowiedz: { w: q(zew) },
              wynik: `$${zew}^\\circ$`,
              rozwiazanie: [`Kąty środkowe, oparte na kolejnych bokach, wypełniają pełny kąt $360^\\circ$.`, `$360^\\circ : ${n} = ${zew}^\\circ$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4.5
    {
      id: "podobienstwo",
      nazwa: "Podobieństwo. Czworokąty podobne",
      sciaga: [
        {
          nazwa: "Figury podobne",
          slownie: "Figura jest podobna do drugiej w skali $k$, gdy każdy jej odcinek jest $k$ razy dłuższy od odpowiedniego odcinka drugiej figury, a odpowiednie kąty są równe. Dla $k > 1$ figura jest powiększona, dla $k < 1$ – pomniejszona.",
          tex: "k=\\frac{|A'B'|}{|AB|}",
          litery: "$|AB|$ – odcinek figury wyjściowej, $|A'B'|$ – odpowiadający mu odcinek figury podobnej.",
          przyklad: "Odcinek $6$ zamieniony na $15$ daje skalę $k = \\frac{15}{6} = \\frac{5}{2}$.",
          uwaga: "Skalę liczymy jako stosunek odpowiadających sobie odcinków i pilnujemy kolejności: nowy do wyjściowego.",
        },
        {
          nazwa: "Czworokąty podobne",
          slownie: "Dwa czworokąty są podobne, gdy mają równe odpowiednie kąty i proporcjonalne odpowiednie boki. Same kąty ani same boki nie wystarczą.",
          tex: "\\frac{a'}{a}=\\frac{b'}{b}=k\\qquad\\frac{c'}{c}=\\frac{d'}{d}=k",
          litery: "$a, b, c, d$ – boki jednego czworokąta, $a', b', c', d'$ – odpowiadające im boki drugiego.",
          przyklad: "Prostokąty $3\\times5$ i $9\\times15$ są podobne ($k = 3$). Prostokąty $3\\times5$ i $6\\times9$ nie są podobne, bo $\\frac{6}{3} \\neq \\frac{9}{5}$.",
          uwaga: "Dwa prostokąty mają równe kąty, ale nie zawsze są podobne. Kwadrat i romb mają proporcjonalne boki, ale różne kąty.",
        },
        {
          nazwa: "Obwody figur podobnych",
          slownie: "Obwód to suma długości boków, więc w figurze podobnej w skali $k$ zmienia się tyle samo razy co każdy bok.",
          tex: "\\frac{L'}{L}=k",
          litery: "$L$ – obwód figury wyjściowej, $L'$ – obwód figury podobnej, $k$ – skala podobieństwa.",
          przyklad: "Kwadrat o boku $4$ i kwadrat o boku $10$: $k = \\frac{5}{2}$, obwody $16$ i $40$, bo $16\\cdot\\frac{5}{2} = 40$.",
        },
        {
          nazwa: "Trójkąty podobne w trapezie",
          slownie: "Przekątne trapezu $ABCD$ ($AB \\parallel CD$) przecinają się w punkcie $P$. Trójkąty $ABP$ i $CDP$ są podobne (kąty naprzemianległe i wierzchołkowe), a skalą jest stosunek podstaw.",
          tex: "\\frac{|AP|}{|PC|}=\\frac{|AB|}{|CD|}\\qquad\\frac{|BP|}{|PD|}=\\frac{|AB|}{|CD|}",
          przyklad: "Dla $|AB| = 12$, $|CD| = 8$ i $|AC| = 20$ stosunek $|AP| : |PC|$ to $3 : 2$, więc $|AP| = 12$, $|PC| = 8$.",
          uwaga: "Dłuższy odcinek przekątnej leży po stronie dłuższej podstawy.",
        },
      ],
      jak: [
        "Ustal, które boki sobie odpowiadają (zwykle w tej samej kolejności wierzchołków).",
        "Oblicz skalę podobieństwa z pary boków, których długości znasz obie.",
        "Pozostałe długości (boki, obwód) przemnóż przez $k$. Jeśli figury zamieniają role, podziel przez $k$.",
        "Dla trapezu użyj podobnych trójkątów przy przekątnych: stosunek odcinków przekątnych to stosunek podstaw.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Czworokąt o bokach $6$, $8$, $10$, $12$ jest podobny do czworokąta, którego najkrótszy bok ma długość $9$. Najdłuższy bok drugiego czworokąta ma długość. **Wybierz właściwą odpowiedź.**",
          opcje: ["$15$", "$21$", "$24$", "$18$"],
          poprawna: 3,
        },
        {
          nr: "30",
          tresc: "Który z prostokątów jest podobny do prostokąta o bokach $4$ i $10$? **Wybierz właściwą odpowiedź.**",
          opcje: ["prostokąt o bokach $6$ i $12$", "prostokąt o bokach $6$ i $15$", "prostokąt o bokach $8$ i $14$", "prostokąt o bokach $5$ i $11$"],
          poprawna: 1,
        },
        {
          nr: "31",
          tresc: "Obwód czworokąta jest równy $36$. Czworokąt podobny do niego w skali $\\frac{2}{3}$ ma obwód równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$54$", "$12$", "$34$", "$24$"],
          poprawna: 3,
        },
        {
          nr: "32",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Każde dwa kwadraty są podobne.", litery: "PF", poprawna: 0 },
            { tekst: "Każde dwa prostokąty są podobne.", litery: "PF", poprawna: 1 },
            { tekst: "Każde dwa romby są podobne.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "33",
          tresc: "Przekątne trapezu $ABCD$ ($AB \\parallel CD$) przecinają się w punkcie $P$. Wiadomo, że $|AB| = 20$, $|CD| = 12$ i $|AP| = 15$. Długość odcinka $PC$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$", "$25$", "$8$", "$12$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 2,
          tresc: "Czworokąt $ABCD$ o bokach długości $4$, $6$, $8$ i $10$ jest podobny do czworokąta $A'B'C'D'$, którego obwód jest równy $70$. Oblicz długości boków czworokąta $A'B'C'D'$. **Zapisz obliczenia.**",
          rozwiazanie: "Obwód czworokąta $ABCD$: $4 + 6 + 8 + 10 = 28$.\n\nObwody figur podobnych mają się do siebie jak ich skala: $k = \\frac{70}{28} = \\frac{5}{2}$.\n\nBoki czworokąta $A'B'C'D'$: $4\\cdot\\frac{5}{2} = 10$, $6\\cdot\\frac{5}{2} = 15$, $8\\cdot\\frac{5}{2} = 20$, $10\\cdot\\frac{5}{2} = 25$ (suma $70$).\n\nOdpowiedź: $10$, $15$, $20$, $25$.",
        },
        {
          nr: "35",
          punkty: 3,
          tresc: "W trapezie $ABCD$ podstawy mają długości $|AB| = 24$ i $|CD| = 16$, a przekątne $|AC| = 30$ i $|BD| = 35$ przecinają się w punkcie $P$. Wykaż, że trójkąty $ABP$ i $CDP$ są podobne, i oblicz $|AP|$, $|PC|$, $|BP|$ i $|PD|$. **Zapisz obliczenia.**",
          rozwiazanie: "Proste $AB$ i $CD$ są równoległe, więc $\\angle BAP = \\angle DCP$ (kąty naprzemianległe przy siecznej $AC$) i $\\angle ABP = \\angle CDP$ (przy siecznej $BD$). Trójkąty $ABP$ i $CDP$ mają dwa równe kąty, więc są podobne.\n\nSkala: $k = \\frac{|AB|}{|CD|} = \\frac{24}{16} = \\frac{3}{2}$, więc $|AP| : |PC| = 3 : 2$ i $|BP| : |PD| = 3 : 2$.\n\nPrzekątna $AC = 30$ dzieli się na $5$ części: $|AP| = \\frac{3}{5}\\cdot30 = 18$, $|PC| = \\frac{2}{5}\\cdot30 = 12$.\n\nPrzekątna $BD = 35$: $|BP| = \\frac{3}{5}\\cdot35 = 21$, $|PD| = \\frac{2}{5}\\cdot35 = 14$.\n\nOdpowiedź: $|AP| = 18$, $|PC| = 12$, $|BP| = 21$, $|PD| = 14$.",
        },
      ],
      generatory: [
        {
          id: "podobienstwo-skala",
          nazwa: "Czworokąty podobne",
          opis: "Dwa podobne czworokąty: z jednej pary boków znajdź skalę, potem obwód albo bok drugiego czworokąta.",
          generuj(r) {
            for (;;) {
              const mian = r.pick([2, 3, 4, 5]);
              const licz = r.int(1, 8);
              if (licz === mian || nwd(licz, mian) !== 1) continue;
              const m = [r.int(1, 6), r.int(1, 6), r.int(1, 6), r.int(1, 6)];
              if (new Set(m).size < 3) continue;
              const [A, B, C, D] = r.pick(NAZWY4);
              const k = q(licz, mian);
              const bok = m.map((x) => x * mian);
              const nazwa = [`${A}${B}`, `${B}${C}`, `${C}${D}`, `${D}${A}`];
              const prim = (s) => s.split("").map((l) => `${l}'`).join("");
              const nowa = (i) => `|${prim(nazwa[i])}|`;
              const stara = (i) => `|${nazwa[i]}|`;
              const dane = `$${stara(0)} = ${bok[0]}$, $${stara(1)} = ${bok[1]}$, $${stara(2)} = ${bok[2]}$, $${stara(3)} = ${bok[3]}$`;
              const skala = `$k = \\frac{${nowa(0)}}{${stara(0)}} = \\frac{${licz * m[0]}}{${bok[0]}} = ${k.tex()}$`;
              const sumaStara = bok[0] + bok[1] + bok[2] + bok[3];
              const wstep = `Czworokąt $${A}${B}${C}${D}$ ma boki ${dane}. Czworokąt $${prim(A + B + C + D)}$ jest do niego podobny, a boki $${nowa(0)}$ i $${stara(0)}$ są odpowiadające, przy czym $${nowa(0)} = ${licz * m[0]}$.`;
              if (r.chance()) {
                const wynik = licz * (m[0] + m[1] + m[2] + m[3]);
                return {
                  tresc: `${wstep} Oblicz obwód czworokąta $${prim(A + B + C + D)}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Obwód" }],
                  odpowiedz: { w: q(wynik) },
                  wynik: `$${wynik}$`,
                  rozwiazanie: [`Skala podobieństwa: ${skala}.`, `Obwód czworokąta $${A}${B}${C}${D}$: $${bok.join(" + ")} = ${sumaStara}$.`, `Obwód czworokąta $${prim(A + B + C + D)}$: $${k.tex()}\\cdot${sumaStara} = ${wynik}$.`],
                };
              }
              const i = r.pick([1, 2, 3]);
              const wynik = licz * m[i];
              return {
                tresc: `${wstep} Oblicz długość boku $${nowa(i)}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `$${nowa(i)} =$` }],
                odpowiedz: { w: q(wynik) },
                wynik: `$${nowa(i)} = ${wynik}$`,
                rozwiazanie: [`Skala podobieństwa: ${skala}.`, `Bok $${nowa(i)}$ odpowiada bokowi $${stara(i)} = ${bok[i]}$.`, `$${nowa(i)} = ${k.tex()}\\cdot${bok[i]} = ${wynik}$.`],
              };
            }
          },
        },
        {
          id: "podobienstwo-trapez",
          nazwa: "Przekątne trapezu",
          opis: "Przekątne trapezu przecinają się w punkcie P – z podobieństwa trójkątów oblicz brakujący odcinek.",
          generuj(r) {
            for (;;) {
              const p = r.int(1, 7), s = r.int(1, 7);
              if (p === s || nwd(p, s) !== 1) continue;
              const t = r.int(1, 6), u = r.int(1, 6);
              const L = { AB: p * t, CD: s * t, AP: p * u, PC: s * u };
              const szuk = r.pick(["AB", "CD", "AP", "PC"]);
              const wzor = {
                AB: ["CD", "AP", "PC"],   // |AB| = |CD|·|AP| / |PC|
                CD: ["AB", "PC", "AP"],
                AP: ["AB", "PC", "CD"],
                PC: ["CD", "AP", "AB"],
              }[szuk];
              const dane = ["AB", "CD", "AP", "PC"].filter((x) => x !== szuk);
              const [x1, x2, x3] = wzor;
              const podst = (n) => (n === szuk ? "x" : L[n]);
              return {
                tresc: `Przekątne trapezu $ABCD$ ($AB \\parallel CD$) przecinają się w punkcie $P$. Wiadomo, że ${dane.map((n) => `$|${n}| = ${L[n]}$`).join(", ").replace(/, ([^,]*)$/, " i $1")}. Oblicz $|${szuk}|$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `$|${szuk}| =$` }],
                odpowiedz: { w: q(L[szuk]) },
                wynik: `$|${szuk}| = ${L[szuk]}$`,
                rozwiazanie: [
                  "Trójkąty $ABP$ i $CDP$ są podobne (kąty naprzemianległe i wierzchołkowe), więc $\\frac{|AB|}{|CD|} = \\frac{|AP|}{|PC|}$.",
                  `Podstawiamy dane: $\\frac{${podst("AB")}}{${podst("CD")}} = \\frac{${podst("AP")}}{${podst("PC")}}$, gdzie $x = |${szuk}|$.`,
                  `Stąd $x = \\frac{${L[x1]}\\cdot${L[x2]}}{${L[x3]}} = ${L[szuk]}$.`,
                ],
              };
            }
          },
        },
      ],
    },
  ],
};
