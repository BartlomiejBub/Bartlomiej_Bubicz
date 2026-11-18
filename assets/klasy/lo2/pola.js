// Klasa 2 (liceum i technikum) · rozdział 7 „Rozwiązywanie trójkątów. Pole koła i trójkąta” – Matematyka 2, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Bez twierdzenia sinusów (usunięte z podstawy w 2024 r.).
import { q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** „Ładna” odpowiedź: mianownik co najwyżej 12. */
const ladna = (v) => Math.abs(v.n) <= 100000 && v.d <= 12;

/** Nazwy wierzchołków trójkąta. */
const NAZWY = [["A", "B", "C"], ["K", "L", "M"], ["P", "Q", "R"]];

/** Liczba w·√s (s liczba naturalna) albo w·π (s = "pi") w LaTeX; w wymierne dodatnie, s = 1 – sama liczba w. */
function kpier(w, s) {
  if (s === 1) return w.tex();
  const sym = s === "pi" ? "\\pi" : `\\sqrt{${s}}`;
  if (w.calkowita) return w.n === 1 ? sym : `${w.n}${sym}`;
  return w.n === 1 ? `\\frac{${sym}}{${w.d}}` : `\\frac{${w.n}${sym}}{${w.d}}`;
}

/** Pole odpowiedzi i dopisek do treści dla wyniku w·√s albo w·π (litera – oznaczenie szukanej wielkości). */
function odp(w, s, lit = "P") {
  if (s === 1) return { pola: [{ id: "w", typ: "liczba", etykieta: `$${lit} =$` }], dopisek: "", wynik: `$${lit} = ${w.tex()}$` };
  const sym = s === "pi" ? "\\pi" : `\\sqrt{${s}}`;
  return {
    pola: [{ id: "w", typ: "liczba", etykieta: `$${lit} = k${sym}$, gdzie $k =$` }],
    dopisek: ` Wynik zapisz w postaci $k${sym}$.`,
    wynik: `$${lit} = ${kpier(w, s)}$`,
  };
}

/** Sinus kątów 30°, 45°, 60° (i kątów rozwartych 150°, 135°, 120°): sin α = ½·√s. */
const SIN_S = { 30: 1, 45: 2, 60: 3 };
const SIN_TEX = { 30: "\\frac{1}{2}", 45: "\\frac{\\sqrt{2}}{2}", 60: "\\frac{\\sqrt{3}}{2}" };
const ostry = (a) => (a > 90 ? 180 - a : a);
const krokSin = (a) => (a > 90
  ? `$\\sin ${a}^\\circ = \\sin(180^\\circ - ${180 - a}^\\circ) = \\sin ${180 - a}^\\circ = ${SIN_TEX[180 - a]}$`
  : `$\\sin ${a}^\\circ = ${SIN_TEX[a]}$`);

/** Boki całkowite trójkątów o całkowitym polu (wzór Herona daje liczbę całkowitą, a obwód jest parzysty). */
const TR3 = [[3, 4, 5], [5, 5, 6], [5, 5, 8], [5, 12, 13], [13, 14, 15], [10, 13, 13], [13, 13, 24], [8, 15, 17], [9, 10, 17], [7, 15, 20], [4, 13, 15], [6, 25, 29], [17, 25, 28]];

/** Losuje trójkąt z TR3 (czasem powiększony dwukrotnie) i miesza kolejność boków. */
function losujTrojkat(r) {
  const k = r.chance(0.3) ? 2 : 1;
  const [a, b, c] = r.shuffle(r.pick(TR3)).map((x) => x * k);
  const p = (a + b + c) / 2;
  const kwadrat = p * (p - a) * (p - b) * (p - c);
  return { a, b, c, p, kwadrat, pole: Math.round(Math.sqrt(kwadrat)) };
}

/** Pary (m, n) – stosunek podziału odcinka. */
const PARY = [[1, 2], [2, 3], [1, 3], [3, 4], [2, 5], [3, 5], [1, 4], [4, 5], [1, 5], [3, 7], [2, 7], [5, 6]];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 7.2, 7.3
    {
      id: "cosinusow",
      nazwa: "Twierdzenie cosinusów",
      sciaga: [
        {
          nazwa: "Twierdzenie cosinusów",
          slownie: "Kwadrat boku trójkąta jest równy sumie kwadratów dwóch pozostałych boków pomniejszonej o podwojony iloczyn tych boków i cosinusa kąta między nimi. To uogólnienie twierdzenia Pitagorasa.",
          tex: "c^2=a^2+b^2-2ab\\cos\\gamma",
          litery: "$a$, $b$, $c$ – boki trójkąta, $\\gamma$ – kąt między bokami $a$ i $b$, leżący naprzeciw boku $c$.",
          przyklad: "Dla $a=3$, $b=5$, $\\gamma=120^\\circ$: $c^2=9+25-2\\cdot3\\cdot5\\cdot\\left(-\\frac{1}{2}\\right)=34+15=49$, więc $c=7$.",
          uwaga: "Kąt $\\gamma$ musi leżeć między bokami $a$ i $b$. Dla $\\gamma=90^\\circ$ jest $\\cos\\gamma=0$ i dostajemy zwykłe twierdzenie Pitagorasa.",
        },
        {
          nazwa: "Znak cosinusa a rodzaj kąta",
          slownie: "Cosinus kąta ostrego jest dodatni, kąta prostego równy $0$, a kąta rozwartego ujemny: $\\cos(180^\\circ-\\alpha)=-\\cos\\alpha$. Dla kąta rozwartego trzeci bok jest dłuższy niż $\\sqrt{a^2+b^2}$.",
          tex: "\\cos60^\\circ=\\frac{1}{2}\\qquad\\cos120^\\circ=-\\frac{1}{2}\\qquad\\cos135^\\circ=-\\frac{\\sqrt{2}}{2}\\qquad\\cos150^\\circ=-\\frac{\\sqrt{3}}{2}",
          przyklad: "Boki $4$, $5$, $7$: $7^2=49>4^2+5^2=41$, więc kąt naprzeciw boku $7$ jest rozwarty.",
          uwaga: "Nie gub minusa: dla $120^\\circ$ jest $-2ab\\cos120^\\circ=+ab$.",
        },
        {
          nazwa: "Cosinus kąta z trzech boków",
          slownie: "Gdy znasz wszystkie boki, przekształć wzór i oblicz cosinus kąta leżącego naprzeciw boku $c$. Potem odczytaj kąt (np. $60^\\circ$ albo $120^\\circ$).",
          tex: "\\cos\\gamma=\\frac{a^2+b^2-c^2}{2ab}",
          litery: "$c$ – bok leżący naprzeciw kąta $\\gamma$, $a$ i $b$ – boki przy tym kącie.",
          przyklad: "Dla boków $4$, $5$, $6$ i kąta naprzeciw boku $6$: $\\cos\\gamma=\\frac{16+25-36}{2\\cdot4\\cdot5}=\\frac{5}{40}=\\frac{1}{8}$.",
          uwaga: "W liczniku odejmujesz kwadrat boku leżącego naprzeciw szukanego kąta, a nie dowolnego boku.",
        },
        {
          nazwa: "Przekątne równoległoboku",
          slownie: "Przekątna równoległoboku jest trzecim bokiem trójkąta o bokach $a$, $b$. Przekątna naprzeciw kąta ostrego $\\alpha$ ma w tym trójkącie kąt $\\alpha$, a przekątna naprzeciw kąta rozwartego – kąt $180^\\circ-\\alpha$.",
          tex: "e^2=a^2+b^2-2ab\\cos\\alpha\\qquad f^2=a^2+b^2+2ab\\cos\\alpha",
          litery: "$a$, $b$ – boki równoległoboku, $\\alpha$ – jego kąt ostry, $e$ – krótsza przekątna, $f$ – dłuższa.",
          przyklad: "Dla $a=3$, $b=5$, $\\alpha=60^\\circ$: $e^2=9+25-15=19$ oraz $f^2=9+25+15=49$, więc $f=7$.",
        },
      ],
      jak: [
        "Narysuj trójkąt, zaznacz dane boki i kąt. Sprawdź, który bok leży naprzeciw kąta.",
        "Szukasz boku: zapisz wzór dla boku leżącego naprzeciw danego kąta. Szukasz kąta: zapisz wzór na cosinus.",
        "Podstaw wartość cosinusa (uwaga na minus dla kąta rozwartego) i oblicz.",
        "Szukany bok: wyciągnij pierwiastek. Szukany kąt: odczytaj go z wartości cosinusa.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "W trójkącie $ABC$ dane są $|AC| = 5$, $|BC| = 8$ oraz $\\angle ACB = 60^\\circ$. Długość boku $AB$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\sqrt{129}$", "$7$", "$3$", "$\\sqrt{89}$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Boki trójkąta mają długości $3$, $5$ i $7$. Kąt leżący naprzeciw najdłuższego boku ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$60^\\circ$", "$150^\\circ$", "$135^\\circ$", "$120^\\circ$"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "W trójkącie $ABC$ mamy $|AB| = 4$, $|BC| = 5$ oraz $|AC| = 7$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Kąt $B$ jest rozwarty.", litery: "PF", poprawna: 0 },
            { tekst: "$\\cos B = \\frac{1}{5}$", litery: "PF", poprawna: 1 },
            { tekst: "$\\cos A > 0$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "4",
          tresc: "Boki równoległoboku mają długości $8$ i $15$, a jego kąt ostry ma miarę $60^\\circ$. Krótsza przekątna tego równoległoboku ma długość. **Wybierz właściwą odpowiedź.**",
          opcje: ["$13$", "$\\sqrt{409}$", "$23$", "$7$"],
          poprawna: 0,
        },
        {
          nr: "5",
          tresc: "W trójkącie $ABC$ dane są $|AC| = 2$, $|BC| = 3\\sqrt{3}$ oraz $\\angle ACB = 150^\\circ$. Długość boku $AB$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\sqrt{31}$", "$\\sqrt{13}$", "$7$", "$2 + 3\\sqrt{3}$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Boki trójkąta mają długości $7$, $8$ i $13$. Oblicz miarę największego kąta tego trójkąta. **Zapisz obliczenia.**",
          rozwiazanie: "Największy kąt leży naprzeciw najdłuższego boku, czyli boku o długości $13$.\n\nZ twierdzenia cosinusów: $\\cos\\gamma = \\frac{7^2 + 8^2 - 13^2}{2\\cdot 7\\cdot 8} = \\frac{49 + 64 - 169}{112} = \\frac{-56}{112} = -\\frac{1}{2}$.\n\nCosinus jest ujemny, więc kąt jest rozwarty. Ponieważ $\\cos 120^\\circ = -\\frac{1}{2}$, mamy $\\gamma = 120^\\circ$.\n\nOdpowiedź: $120^\\circ$.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Dwie proste ścieżki wychodzą z jednego punktu i tworzą kąt $120^\\circ$. Jedna osoba przeszła pierwszą ścieżką $300$ m, a druga drugą ścieżką $500$ m. Oblicz odległość w linii prostej między tymi osobami. **Zapisz obliczenia.**",
          rozwiazanie: "Miejsca, w których stoją osoby, i punkt wyjścia są wierzchołkami trójkąta o bokach $300$ i $500$ oraz kącie $120^\\circ$ między nimi. Szukana odległość $d$ jest trzecim bokiem.\n\nZ twierdzenia cosinusów: $d^2 = 300^2 + 500^2 - 2\\cdot 300\\cdot 500\\cdot\\cos 120^\\circ$.\n\nPonieważ $\\cos 120^\\circ = -\\frac{1}{2}$: $d^2 = 90000 + 250000 + 150000 = 490000$.\n\nStąd $d = \\sqrt{490000} = 700$.\n\nOdpowiedź: odległość wynosi $700$ m.",
        },
      ],
      generatory: [
        {
          id: "cosinusow-bok",
          nazwa: "Trzeci bok trójkąta",
          opis: "Znasz dwa boki i kąt między nimi (60°, 120°, 45° albo 135°) – oblicz trzeci bok z twierdzenia cosinusów.",
          generuj(r) {
            const kat = r.pick([60, 120, 45, 135]);
            const k = r.int(1, 2);
            const TAB = {
              60: [[3, 8, 7], [5, 8, 7], [7, 15, 13], [8, 15, 13], [5, 21, 19]],
              120: [[3, 5, 7], [7, 8, 13], [5, 16, 19]],
              45: [[3, 7, 5], [4, 7, 5], [5, 17, 13], [6, 14, 10], [12, 17, 13]],
              135: [[3, 1, 5], [5, 7, 13], [6, 2, 10], [9, 3, 15], [8, 7, 17]],
            };
            let [a, b, c] = r.pick(TAB[kat]).map((x) => x * k);
            const niewymierny = kat === 45 || kat === 135;   // pierwszy bok ma postać a·√2
            if (!niewymierny && r.chance()) [a, b] = [b, a];
            const [A, B, C] = r.pick(NAZWY);
            const aTex = niewymierny ? `${a}\\sqrt{2}` : `${a}`;
            const aKw = niewymierny ? 2 * a * a : a * a;
            const iloczyn = niewymierny ? 2 * a * b : a * b;   // 2·a·b·|cos|
            const COS = { 60: "\\frac{1}{2}", 120: "\\left(-\\frac{1}{2}\\right)", 45: "\\frac{\\sqrt{2}}{2}", 135: "\\left(-\\frac{\\sqrt{2}}{2}\\right)" };
            const znak = kat === 60 || kat === 45 ? "-" : "+";
            const kw = niewymierny ? `\\left(${aTex}\\right)^2` : `${a}^2`;
            return {
              tresc: `W trójkącie $${A}${B}${C}$ dane są $|${A}${C}| = ${aTex}$, $|${B}${C}| = ${b}$ oraz $\\angle ${A}${C}${B} = ${kat}^\\circ$. Oblicz $|${A}${B}|$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: `$|${A}${B}| =$` }],
              odpowiedz: { w: q(c) },
              wynik: `$|${A}${B}| = ${c}$`,
              rozwiazanie: [
                `Kąt $${C}$ leży między danymi bokami, naprzeciw boku $${A}${B}$. Z twierdzenia cosinusów: $|${A}${B}|^2 = |${A}${C}|^2 + |${B}${C}|^2 - 2\\cdot|${A}${C}|\\cdot|${B}${C}|\\cdot\\cos ${C}$.`,
                `$\\cos ${kat}^\\circ = ${kat === 60 ? "\\frac{1}{2}" : kat === 120 ? "-\\frac{1}{2}" : kat === 45 ? "\\frac{\\sqrt{2}}{2}" : "-\\frac{\\sqrt{2}}{2}"}$.`,
                `$|${A}${B}|^2 = ${kw} + ${b}^2 - 2\\cdot ${aTex}\\cdot ${b}\\cdot ${COS[kat]} = ${aKw} + ${b * b} ${znak} ${iloczyn} = ${c * c}$.`,
                `$|${A}${B}| = \\sqrt{${c * c}} = ${c}$.`,
              ],
            };
          },
        },
        {
          id: "cosinusow-kat",
          nazwa: "Cosinus kąta z boków",
          opis: "Znasz trzy boki trójkąta – oblicz cosinus jednego z jego kątów i zdecyduj, czy kąt jest ostry, czy rozwarty.",
          generuj(r) {
            for (;;) {
              const x = r.int(3, 12), y = r.int(3, 12), z = r.int(3, 12);
              if (x + y <= z || x + z <= y || y + z <= x) continue;
              const [P1, P2, P3] = r.pick(NAZWY);
              const wierzcholek = r.int(0, 2);
              // |P1P2| = x, |P2P3| = y, |P1P3| = z
              const [V, u, w, o, nazwaO] = [
                [P1, x, z, y, `${P2}${P3}`],
                [P2, x, y, z, `${P1}${P3}`],
                [P3, y, z, x, `${P1}${P2}`],
              ][wierzcholek];
              const licznik = u * u + w * w - o * o;
              if (licznik === 0) continue;
              const v = q(licznik, 2 * u * w);
              if (!ladna(v)) continue;
              return {
                tresc: `W trójkącie $${P1}${P2}${P3}$ dane są $|${P1}${P2}| = ${x}$, $|${P2}${P3}| = ${y}$ oraz $|${P1}${P3}| = ${z}$. Oblicz cosinus kąta przy wierzchołku $${V}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `$\\cos\\angle ${V} =$` }],
                odpowiedz: { w: v },
                wynik: `$\\cos\\angle ${V} = ${v.tex()}$`,
                rozwiazanie: [
                  `Kąt przy wierzchołku $${V}$ leży naprzeciw boku $${nazwaO}$ o długości $${o}$. Z twierdzenia cosinusów: $\\cos\\angle ${V} = \\frac{${u}^2 + ${w}^2 - ${o}^2}{2\\cdot ${u}\\cdot ${w}}$.`,
                  `$\\cos\\angle ${V} = \\frac{${u * u} + ${w * w} - ${o * o}}{${2 * u * w}} = \\frac{${licznik}}{${2 * u * w}} = ${v.tex()}$.`,
                  v.ujemna ? "Cosinus jest ujemny, więc kąt jest rozwarty." : "Cosinus jest dodatni, więc kąt jest ostry.",
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 7.4, 7.5
    {
      id: "pole-trojkata-1",
      nazwa: "Pole figury płaskiej. Pole trójkąta, cz. 1",
      sciaga: [
        {
          nazwa: "Pola figur z wysokością",
          slownie: "Pole równoległoboku to podstawa razy wysokość, pole trójkąta – połowa podstawy razy wysokość, a pole trapezu – średnia arytmetyczna podstaw razy wysokość. Wysokość jest prostopadła do podstawy.",
          tex: "P=ah\\qquad P=\\frac{1}{2}ah\\qquad P=\\frac{a+b}{2}\\cdot h",
          litery: "Kolejno: równoległobok, trójkąt, trapez. $a$, $b$ – podstawy, $h$ – wysokość opuszczona na podstawę.",
          przyklad: "Trapez o podstawach $9$ i $5$ i wysokości $6$: $P=\\frac{9+5}{2}\\cdot6=42$.",
          uwaga: "Wysokość to odległość między prostymi zawierającymi podstawy, a nie długość ramienia.",
        },
        {
          nazwa: "Romb",
          slownie: "Pole rombu to połowa iloczynu jego przekątnych. Romb jest też równoległobokiem o równych bokach, więc można użyć wzoru z sinusem kąta.",
          tex: "P=\\frac{1}{2}ef\\qquad P=a^2\\sin\\alpha",
          litery: "$e$, $f$ – przekątne, $a$ – bok rombu, $\\alpha$ – kąt rombu.",
          przyklad: "Dla przekątnych $6$ i $8$: $P=\\frac{1}{2}\\cdot6\\cdot8=24$. Dla boku $4$ i kąta $30^\\circ$: $P=16\\cdot\\frac{1}{2}=8$.",
        },
        {
          nazwa: "Pole z sinusem kąta",
          slownie: "Pole równoległoboku to iloczyn dwóch sąsiednich boków i sinusa kąta między nimi. Pole trójkąta jest połową takiego iloczynu.",
          tex: "P=ab\\sin\\alpha\\qquad P=\\frac{1}{2}ab\\sin\\gamma",
          litery: "Pierwszy wzór: równoległobok, $\\alpha$ – kąt między bokami $a$ i $b$. Drugi: trójkąt, $\\gamma$ – kąt między bokami $a$ i $b$.",
          przyklad: "Trójkąt o bokach $6$ i $10$ i kącie $150^\\circ$ między nimi: $P=\\frac{1}{2}\\cdot6\\cdot10\\cdot\\sin150^\\circ=30\\cdot\\frac{1}{2}=15$.",
          uwaga: "Kąt musi leżeć między danymi bokami. Dla kąta rozwartego korzystamy z $\\sin(180^\\circ-\\alpha)=\\sin\\alpha$.",
        },
        {
          nazwa: "Trójkąt równoboczny",
          slownie: "Wysokość trójkąta równobocznego dzieli go na dwa trójkąty $30^\\circ$–$60^\\circ$–$90^\\circ$. Stąd wzory na wysokość i pole.",
          tex: "h=\\frac{a\\sqrt{3}}{2}\\qquad P=\\frac{a^2\\sqrt{3}}{4}",
          litery: "$a$ – bok trójkąta, $h$ – jego wysokość.",
          przyklad: "Dla $a=6$: $h=3\\sqrt{3}$ i $P=\\frac{36\\sqrt{3}}{4}=9\\sqrt{3}$.",
          uwaga: "W liczniku wzoru na pole jest $a^2$, a nie $a$.",
        },
        {
          nazwa: "Figury złożone",
          slownie: "Figurę złożoną rozetnij na proste części (prostokąty, trójkąty) i dodaj ich pola albo odejmij pole wyciętej części od pola większej figury. Figury przystające mają równe pola.",
          przyklad: "Trapez prostokątny o podstawach $7$, $3$ i wysokości $4$: prostokąt $3\\times4$ ma pole $12$, a trójkąt o podstawie $4$ i wysokości $4$ ma pole $8$. Razem $20$.",
        },
      ],
      jak: [
        "Sprawdź, co jest dane: podstawa i wysokość, przekątne, czy dwa boki i kąt między nimi.",
        "Dobierz wzór: z wysokością – $\\frac{1}{2}ah$; z kątem – $\\frac{1}{2}ab\\sin\\gamma$.",
        "Dla kąta rozwartego zamień sinus na sinus kąta ostrego: $\\sin\\alpha=\\sin(180^\\circ-\\alpha)$.",
        "Podstaw dane, oblicz i sprawdź, czy wynik jest sensowny (np. pole trójkąta jest mniejsze od pola prostokąta o tych samych bokach).",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Równoległobok ma boki długości $6$ cm i $10$ cm, a kąt między nimi ma miarę $30^\\circ$. Pole tego równoległoboku jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$30\\ \\text{cm}^2$", "$60\\ \\text{cm}^2$", "$15\\ \\text{cm}^2$", "$30\\sqrt{3}\\ \\text{cm}^2$"],
          poprawna: 0,
        },
        {
          nr: "9",
          tresc: "Trójkąt ma boki długości $8$ i $9$, a kąt między nimi ma miarę $135^\\circ$. Pole tego trójkąta jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$18\\sqrt{3}$", "$36\\sqrt{2}$", "$18\\sqrt{2}$", "$-18\\sqrt{2}$"],
          poprawna: 2,
        },
        {
          nr: "10",
          tresc: "Romb ma przekątne długości $10$ i $14$. Pole tego rombu jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$140$", "$70$", "$24$", "$35$"],
          poprawna: 1,
        },
        {
          nr: "11",
          tresc: "Wysokość trójkąta równobocznego ma długość $3\\sqrt{3}$. Pole tego trójkąta jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$9\\sqrt{3}$", "$18\\sqrt{3}$", "$\\frac{27\\sqrt{3}}{4}$", "$\\frac{9\\sqrt{3}}{2}$"],
          poprawna: 0,
        },
        {
          nr: "12",
          tresc: "Trapez ma podstawy długości $9$ i $5$ oraz wysokość $6$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Pole tego trapezu jest równe $42$.", litery: "PF", poprawna: 0 },
            { tekst: "Pole tego trapezu jest równe $54$.", litery: "PF", poprawna: 1 },
            { tekst: "Trapez o podstawach $9$ i $5$ oraz wysokości $3$ ma pole $21$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "13",
          tresc: "Przekątna prostokąta ma długość $10$ i tworzy z dłuższym bokiem kąt $30^\\circ$. Pole tego prostokąta jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$25$", "$50$", "$\\frac{25\\sqrt{3}}{2}$", "$25\\sqrt{3}$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "14",
          punkty: 2,
          tresc: "Ramiona trójkąta równoramiennego mają długość $8$, a kąt między nimi ma miarę $120^\\circ$. Oblicz pole tego trójkąta. **Zapisz obliczenia.**",
          rozwiazanie: "Pole trójkąta o bokach $a$, $b$ i kącie $\\gamma$ między nimi to $P = \\frac{1}{2}ab\\sin\\gamma$.\n\nZ wzorów redukcyjnych: $\\sin 120^\\circ = \\sin(180^\\circ - 60^\\circ) = \\sin 60^\\circ = \\frac{\\sqrt{3}}{2}$.\n\n$P = \\frac{1}{2}\\cdot 8\\cdot 8\\cdot\\frac{\\sqrt{3}}{2} = 16\\sqrt{3}$.\n\nOdpowiedź: $16\\sqrt{3}$.",
        },
        {
          nr: "15",
          punkty: 3,
          tresc: "Trapez równoramienny ma podstawy długości $12$ i $6$ oraz kąt ostry o mierze $60^\\circ$. Oblicz pole tego trapezu. **Zapisz obliczenia.**",
          rozwiazanie: "Poprowadź wysokości z końców krótszej podstawy. Odcinki dłuższej podstawy odcięte przez te wysokości po bokach mają długość $\\frac{12 - 6}{2} = 3$.\n\nW powstałym trójkącie prostokątnym kąt ostry ma miarę $60^\\circ$, a przyprostokątna przyległa ma długość $3$, więc wysokość trapezu to $h = 3\\cdot\\operatorname{tg}60^\\circ = 3\\sqrt{3}$.\n\nPole trapezu: $P = \\frac{12 + 6}{2}\\cdot 3\\sqrt{3} = 9\\cdot 3\\sqrt{3} = 27\\sqrt{3}$.\n\nOdpowiedź: $27\\sqrt{3}$.",
        },
      ],
      generatory: [
        {
          id: "pole-czworokata",
          nazwa: "Pole czworokąta",
          opis: "Oblicz pole równoległoboku, rombu albo trapezu (z wysokością lub z ramieniem i kątem).",
          generuj(r) {
            const rodzaj = r.int(0, 3);
            if (rodzaj === 0 || rodzaj === 1) {
              const a = r.int(3, 12);
              const b = rodzaj === 0 ? r.int(2, 10) : a;
              const kat = r.pick([30, 45, 60, 120, 135, 150]);
              const s = SIN_S[ostry(kat)];
              const w = q(a * b, 2);
              const o = odp(w, s);
              const opis = rodzaj === 0
                ? `Równoległobok ma boki długości $${a}$ i $${b}$, a kąt między nimi ma miarę $${kat}^\\circ$.`
                : `Romb ma bok długości $${a}$ i kąt o mierze $${kat}^\\circ$.`;
              return {
                tresc: `${opis} Oblicz pole tej figury.${o.dopisek}`,
                pola: o.pola,
                odpowiedz: { w },
                wynik: o.wynik,
                rozwiazanie: [
                  rodzaj === 0
                    ? "Pole równoległoboku o bokach $a$ i $b$ i kącie $\\alpha$ między nimi: $P = ab\\sin\\alpha$."
                    : "Romb jest równoległobokiem o równych bokach, więc $P = a^2\\sin\\alpha$.",
                  `${krokSin(kat)}.`,
                  `$P = ${rodzaj === 0 ? `${a}\\cdot ${b}` : `${a}^2`}\\cdot ${SIN_TEX[ostry(kat)]} = ${kpier(w, s)}$.`,
                ],
              };
            }
            if (rodzaj === 2) {
              const a = r.int(4, 14), b = r.int(2, a - 1), h = r.int(2, 9);
              const w = q((a + b) * h, 2);
              return {
                tresc: `Podstawy trapezu mają długości $${a}$ i $${b}$, a jego wysokość ma długość $${h}$. Oblicz pole tego trapezu.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$P =$" }],
                odpowiedz: { w },
                wynik: `$P = ${w.tex()}$`,
                rozwiazanie: [
                  "Pole trapezu: $P = \\frac{a + b}{2}\\cdot h$.",
                  `$P = \\frac{${a} + ${b}}{2}\\cdot ${h} = ${w.tex()}$.`,
                ],
              };
            }
            const a = r.int(5, 14), b = r.int(2, a - 1), c = r.int(2, 12);
            const kat = r.pick([30, 45, 60]);
            const s = SIN_S[kat];
            const w = q((a + b) * c, 4);
            const o = odp(w, s);
            const h = kpier(q(c, 2), s);
            return {
              tresc: `Podstawy trapezu mają długości $${a}$ i $${b}$, a jedno z ramion ma długość $${c}$ i tworzy z dłuższą podstawą kąt ostry o mierze $${kat}^\\circ$. Oblicz pole tego trapezu.${o.dopisek}`,
              pola: o.pola,
              odpowiedz: { w },
              wynik: o.wynik,
              rozwiazanie: [
                `Ramię, wysokość i odcinek podstawy tworzą trójkąt prostokątny, więc wysokość to $h = ${c}\\sin ${kat}^\\circ = ${c}\\cdot ${SIN_TEX[kat]} = ${h}$.`,
                `Pole trapezu: $P = \\frac{${a} + ${b}}{2}\\cdot h = \\frac{${a + b}}{2}\\cdot ${h} = ${kpier(w, s)}$.`,
              ],
            };
          },
        },
        {
          id: "pole-trojkata-wzory",
          nazwa: "Pole trójkąta",
          opis: "Oblicz pole trójkąta z dwóch boków i kąta albo pole (bok) trójkąta równobocznego.",
          generuj(r) {
            const rodzaj = r.int(0, 3);
            if (rodzaj === 0) {
              const a = r.int(3, 14), b = r.int(3, 14);
              const kat = r.pick([30, 45, 60, 120, 135, 150]);
              const s = SIN_S[ostry(kat)];
              const w = q(a * b, 4);
              const o = odp(w, s);
              const [A, B, C] = r.pick(NAZWY);
              return {
                tresc: `W trójkącie $${A}${B}${C}$ dane są $|${A}${C}| = ${a}$, $|${B}${C}| = ${b}$ oraz $\\angle ${A}${C}${B} = ${kat}^\\circ$. Oblicz pole tego trójkąta.${o.dopisek}`,
                pola: o.pola,
                odpowiedz: { w },
                wynik: o.wynik,
                rozwiazanie: [
                  "Pole trójkąta o bokach $a$, $b$ i kącie $\\gamma$ między nimi: $P = \\frac{1}{2}ab\\sin\\gamma$.",
                  `${krokSin(kat)}.`,
                  `$P = \\frac{1}{2}\\cdot ${a}\\cdot ${b}\\cdot ${SIN_TEX[ostry(kat)]} = ${kpier(w, s)}$.`,
                ],
              };
            }
            if (rodzaj === 1) {
              const a = r.int(2, 12);
              const w = q(a * a, 4);
              const o = odp(w, 3);
              return {
                tresc: `Trójkąt równoboczny ma bok długości $${a}$. Oblicz pole tego trójkąta.${o.dopisek}`,
                pola: o.pola,
                odpowiedz: { w },
                wynik: o.wynik,
                rozwiazanie: [
                  "Pole trójkąta równobocznego o boku $a$: $P = \\frac{a^2\\sqrt{3}}{4}$.",
                  `$P = \\frac{${a}^2\\sqrt{3}}{4} = \\frac{${a * a}\\sqrt{3}}{4} = ${kpier(w, 3)}$.`,
                ],
              };
            }
            const n = r.int(1, 9);
            if (rodzaj === 2) {
              const w = q(n * n);
              const o = odp(w, 3);
              return {
                tresc: `Wysokość trójkąta równobocznego ma długość $${n === 1 ? "" : n}\\sqrt{3}$. Oblicz pole tego trójkąta.${o.dopisek}`,
                pola: o.pola,
                odpowiedz: { w },
                wynik: o.wynik,
                rozwiazanie: [
                  `Z wzoru $h = \\frac{a\\sqrt{3}}{2}$ mamy $\\frac{a\\sqrt{3}}{2} = ${n === 1 ? "" : n}\\sqrt{3}$, więc $a = ${2 * n}$.`,
                  `$P = \\frac{a^2\\sqrt{3}}{4} = \\frac{${2 * n}^2\\sqrt{3}}{4} = ${kpier(w, 3)}$.`,
                ],
              };
            }
            return {
              tresc: `Pole trójkąta równobocznego jest równe $${n * n === 1 ? "" : n * n}\\sqrt{3}$. Oblicz długość boku tego trójkąta.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "$a =$" }],
              odpowiedz: { w: q(2 * n) },
              wynik: `$a = ${2 * n}$`,
              rozwiazanie: [
                `Ze wzoru $P = \\frac{a^2\\sqrt{3}}{4}$ mamy $\\frac{a^2\\sqrt{3}}{4} = ${n * n === 1 ? "" : n * n}\\sqrt{3}$.`,
                `Dzielimy przez $\\sqrt{3}$ i mnożymy przez $4$: $a^2 = ${4 * n * n}$.`,
                `Stąd $a = \\sqrt{${4 * n * n}} = ${2 * n}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 7.6
    {
      id: "pole-trojkata-2",
      nazwa: "Pole trójkąta, cz. 2",
      sciaga: [
        {
          nazwa: "Wzór Herona",
          slownie: "Pole trójkąta można obliczyć, znając tylko jego trzy boki. Najpierw liczymy połowę obwodu $p$, potem podstawiamy do wzoru.",
          tex: "P=\\sqrt{p(p-a)(p-b)(p-c)}\\qquad p=\\frac{a+b+c}{2}",
          litery: "$a$, $b$, $c$ – boki trójkąta, $p$ – połowa jego obwodu.",
          przyklad: "Dla boków $13$, $14$, $15$: $p=21$, więc $P=\\sqrt{21\\cdot8\\cdot7\\cdot6}=\\sqrt{7056}=84$.",
          uwaga: "$p$ to połowa obwodu, nie cały obwód. Od $p$ odejmujesz po kolei każdy bok.",
        },
        {
          nazwa: "Okrąg wpisany",
          slownie: "Środek okręgu wpisanego łączymy z wierzchołkami i dostajemy trzy trójkąty o wysokości $r$. Ich pola dają razem pole całego trójkąta.",
          tex: "P=pr\\qquad r=\\frac{P}{p}",
          litery: "$p$ – połowa obwodu trójkąta, $r$ – promień okręgu wpisanego.",
          przyklad: "Trójkąt o bokach $5$, $12$, $13$ ma pole $30$ i $p=15$, więc $r=\\frac{30}{15}=2$.",
          uwaga: "We wzorze występuje połowa obwodu $p$, a nie obwód.",
        },
        {
          nazwa: "Okrąg opisany",
          slownie: "Promień okręgu opisanego na trójkącie (przechodzącego przez jego wierzchołki) obliczysz z iloczynu boków i pola.",
          tex: "P=\\frac{abc}{4R}\\qquad R=\\frac{abc}{4P}",
          litery: "$a$, $b$, $c$ – boki trójkąta, $P$ – jego pole, $R$ – promień okręgu opisanego.",
          przyklad: "Dla boków $5$, $12$, $13$ i pola $30$: $R=\\frac{5\\cdot12\\cdot13}{4\\cdot30}=\\frac{780}{120}=\\frac{13}{2}$.",
          uwaga: "Nie myl $R$ (okrąg opisany) z $r$ (okrąg wpisany): zawsze $R>r$.",
        },
        {
          nazwa: "Wysokości trójkąta",
          slownie: "Pole trójkąta można zapisać na trzy sposoby, wybierając różne boki za podstawę. Z równości pól wyliczysz brakującą wysokość.",
          tex: "P=\\frac{1}{2}ah_a=\\frac{1}{2}bh_b=\\frac{1}{2}ch_c",
          litery: "$h_a$ – wysokość opuszczona na bok $a$, $h_b$ – na bok $b$, $h_c$ – na bok $c$.",
          przyklad: "Trójkąt o bokach $13$, $14$, $15$ ma pole $84$. Wysokość na bok $14$: $h=\\frac{2\\cdot84}{14}=12$.",
          uwaga: "Do dłuższego boku opuszczona jest krótsza wysokość.",
        },
        {
          nazwa: "Który wzór wybrać",
          slownie: "Wysokość i podstawa: $\\frac{1}{2}ah$. Dwa boki i kąt między nimi: $\\frac{1}{2}ab\\sin\\gamma$. Trzy boki: wzór Herona. Znane $r$ albo $R$ razem z bokami: wzory $P=pr$ i $P=\\frac{abc}{4R}$.",
          przyklad: "Dane: boki $5$, $5$, $6$ – nie ma wysokości ani kąta, więc użyj wzoru Herona: $p=8$, $P=\\sqrt{8\\cdot3\\cdot3\\cdot2}=12$.",
        },
      ],
      jak: [
        "Wypisz dane (boki, kąt, promień) i wybierz wzór na pole.",
        "Policz połowę obwodu $p$ i podstaw do wzoru Herona; pole zostaw w postaci pierwiastka, który da się obliczyć.",
        "Promień okręgu wpisanego: $r=\\frac{P}{p}$. Promień okręgu opisanego: $R=\\frac{abc}{4P}$.",
        "Sprawdź wynik: $R$ jest zawsze większy od $r$, a pole mniejsze od pola prostokąta o dwóch najdłuższych bokach.",
      ],
      zadania: [
        {
          nr: "16",
          tresc: "Trójkąt równoramienny ma podstawę długości $10$ i ramiona długości $13$. Pole tego trójkąta jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$60$", "$30$", "$120$", "$65$"],
          poprawna: 0,
        },
        {
          nr: "17",
          tresc: "W trójkącie prostokątnym przyprostokątne mają długości $5$ i $12$. Promień okręgu wpisanego w ten trójkąt jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{13}{2}$", "$1$", "$\\frac{30}{13}$", "$2$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "Trójkąt o bokach $13$, $14$, $15$ ma pole $84$. Promień okręgu opisanego na tym trójkącie jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$\\frac{65}{8}$", "$\\frac{15}{2}$", "$\\frac{65}{4}$"],
          poprawna: 1,
        },
        {
          nr: "19",
          tresc: "Trójkąt ma boki długości $4$, $13$ i $15$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Połowa obwodu tego trójkąta jest równa $16$.", litery: "PF", poprawna: 0 },
            { tekst: "Pole tego trójkąta jest równe $24$.", litery: "PF", poprawna: 0 },
            { tekst: "Wysokość opuszczona na bok długości $13$ jest równa $4$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "20",
          tresc: "W trójkącie bok ma długość $12$, a wysokość opuszczona na ten bok ma długość $6$. Wysokość opuszczona na bok długości $8$ ma długość. **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$12$", "$9$", "$\\frac{9}{2}$"],
          poprawna: 2,
        },
        {
          nr: "21",
          tresc: "Pole trójkąta jest równe $30$, a jego obwód też jest równy $30$. Promień okręgu wpisanego w ten trójkąt jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$1$", "$4$", "$15$", "$2$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "22",
          punkty: 3,
          tresc: "Boki trójkąta mają długości $17$, $25$ i $28$. Oblicz pole tego trójkąta oraz promień okręgu wpisanego w ten trójkąt. **Zapisz obliczenia.**",
          rozwiazanie: "Połowa obwodu: $p = \\frac{17 + 25 + 28}{2} = 35$.\n\nWzór Herona: $P = \\sqrt{35\\cdot 18\\cdot 10\\cdot 7} = \\sqrt{44100} = 210$.\n\nZ wzoru $P = pr$: $r = \\frac{P}{p} = \\frac{210}{35} = 6$.\n\nOdpowiedź: $P = 210$, $r = 6$.",
        },
        {
          nr: "23",
          punkty: 3,
          tresc: "Trójkąt równoramienny ma podstawę długości $6$ i ramiona długości $5$. Oblicz promień okręgu wpisanego w ten trójkąt i promień okręgu opisanego na tym trójkącie. **Zapisz obliczenia.**",
          rozwiazanie: "Wysokość poprowadzona do podstawy dzieli ją na odcinki długości $3$, więc $h = \\sqrt{5^2 - 3^2} = 4$.\n\nPole: $P = \\frac{1}{2}\\cdot 6\\cdot 4 = 12$. Połowa obwodu: $p = \\frac{5 + 5 + 6}{2} = 8$.\n\nPromień okręgu wpisanego: $r = \\frac{P}{p} = \\frac{12}{8} = \\frac{3}{2}$.\n\nPromień okręgu opisanego: $R = \\frac{abc}{4P} = \\frac{5\\cdot 5\\cdot 6}{4\\cdot 12} = \\frac{150}{48} = \\frac{25}{8}$.\n\nOdpowiedź: $r = \\frac{3}{2}$, $R = \\frac{25}{8}$.",
        },
      ],
      generatory: [
        {
          id: "heron-pole",
          nazwa: "Wzór Herona",
          opis: "Oblicz pole trójkąta, gdy znasz jego trzy boki (wzór Herona).",
          generuj(r) {
            const { a, b, c, p, kwadrat, pole } = losujTrojkat(r);
            const [A, B, C] = r.pick(NAZWY);
            return {
              tresc: `Boki trójkąta $${A}${B}${C}$ mają długości $|${A}${B}| = ${a}$, $|${B}${C}| = ${b}$ i $|${A}${C}| = ${c}$. Oblicz pole tego trójkąta.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "$P =$" }],
              odpowiedz: { w: q(pole) },
              wynik: `$P = ${pole}$`,
              rozwiazanie: [
                `Połowa obwodu: $p = \\frac{${a} + ${b} + ${c}}{2} = ${p}$.`,
                `Wzór Herona: $P = \\sqrt{p(p - a)(p - b)(p - c)} = \\sqrt{${p}\\cdot ${p - a}\\cdot ${p - b}\\cdot ${p - c}}$.`,
                `$P = \\sqrt{${kwadrat}} = ${pole}$.`,
              ],
            };
          },
        },
        {
          id: "heron-promien",
          nazwa: "Promień okręgu",
          opis: "Oblicz promień okręgu wpisanego w trójkąt albo opisanego na trójkącie, gdy znasz jego boki.",
          generuj(r) {
            for (;;) {
              const { a, b, c, p, kwadrat, pole } = losujTrojkat(r);
              const wpisany = r.chance();
              const podanePole = r.chance();
              const v = wpisany ? q(pole, p) : q(a * b * c, 4 * pole);
              if (!ladna(v)) continue;
              const rozwiazanie = [];
              if (!podanePole) {
                rozwiazanie.push(
                  `Połowa obwodu: $p = \\frac{${a} + ${b} + ${c}}{2} = ${p}$.`,
                  `Pole ze wzoru Herona: $P = \\sqrt{${p}\\cdot ${p - a}\\cdot ${p - b}\\cdot ${p - c}} = \\sqrt{${kwadrat}} = ${pole}$.`,
                );
              } else if (wpisany) {
                rozwiazanie.push(`Połowa obwodu: $p = \\frac{${a} + ${b} + ${c}}{2} = ${p}$.`);
              }
              rozwiazanie.push(wpisany
                ? `Z wzoru $P = pr$: $r = \\frac{P}{p} = \\frac{${pole}}{${p}} = ${v.tex()}$.`
                : `Ze wzoru $P = \\frac{abc}{4R}$: $R = \\frac{abc}{4P} = \\frac{${a}\\cdot ${b}\\cdot ${c}}{4\\cdot ${pole}} = \\frac{${a * b * c}}{${4 * pole}} = ${v.tex()}$.`);
              const lit = wpisany ? "r" : "R";
              return {
                tresc: `Trójkąt ma boki długości $${a}$, $${b}$ i $${c}$${podanePole ? ` oraz pole $${pole}$` : ""}. Oblicz promień okręgu ${wpisany ? "wpisanego w ten trójkąt" : "opisanego na tym trójkącie"}.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `$${lit} =$` }],
                odpowiedz: { w: v },
                wynik: `$${lit} = ${v.tex()}$`,
                rozwiazanie,
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 7.7
    {
      id: "pola-podobnych",
      nazwa: "Pola trójkątów podobnych",
      sciaga: [
        {
          nazwa: "Skala podobieństwa",
          slownie: "Figury podobne mają równe odpowiednie kąty, a odpowiednie odcinki (boki, wysokości, obwody) są w tym samym stosunku. Ten stosunek nazywamy skalą podobieństwa.",
          tex: "k=\\frac{a'}{a}",
          litery: "$a$ – bok figury wyjściowej, $a'$ – odpowiedni bok figury podobnej, $k$ – skala. Dla $k>1$ figura jest powiększona.",
          przyklad: "Boki $4$ i $6$ są odpowiednie, więc skala drugiego trójkąta do pierwszego to $k=\\frac{6}{4}=\\frac{3}{2}$.",
          uwaga: "Porównuj odpowiednie boki, czyli leżące naprzeciw równych kątów.",
        },
        {
          nazwa: "Stosunek pól",
          slownie: "Jeśli figury są podobne w skali $k$, to ich obwody mają się do siebie jak $k$, a pola jak $k^2$.",
          tex: "\\frac{L'}{L}=k\\qquad\\frac{P'}{P}=k^2",
          litery: "$L$, $P$ – obwód i pole figury wyjściowej, $L'$, $P'$ – obwód i pole figury podobnej.",
          przyklad: "Dla $k=3$ pole jest $9$ razy większe. Dla $k=\\frac{1}{2}$ pole trójkąta o polu $12$ zmniejsza się do $12\\cdot\\frac{1}{4}=3$.",
          uwaga: "Pole zmienia się $k^2$ razy, a nie $k$ razy.",
        },
        {
          nazwa: "Skala z pól",
          slownie: "Gdy znasz pola dwóch figur podobnych, skalę podobieństwa dostaniesz, wyciągając pierwiastek z ilorazu pól.",
          tex: "k=\\sqrt{\\frac{P'}{P}}",
          przyklad: "Pola trójkątów podobnych wynoszą $18$ i $32$: $\\frac{32}{18}=\\frac{16}{9}$, więc $k=\\frac{4}{3}$.",
          uwaga: "Pierwiastek trzeba wyciągnąć dla ilorazu pól, a nie dla każdego pola osobno.",
        },
        {
          nazwa: "Skąd wiemy, że trójkąty są podobne",
          slownie: "Trójkąty są podobne, gdy mają dwa równe kąty, albo proporcjonalne trzy boki, albo proporcjonalne dwa boki i równy kąt między nimi. Prosta równoległa do boku trójkąta odcina trójkąt podobny do danego.",
          przyklad: "Jeśli $D$ leży na boku $AB$, $E$ na boku $BC$ i $DE\\parallel AC$, to trójkąty $DBE$ i $ABC$ są podobne (mają wspólny kąt $B$ i równe kąty odpowiadające).",
          uwaga: "W trapezie przekątne tworzą dwa podobne trójkąty o podstawach równych podstawom trapezu.",
        },
      ],
      jak: [
        "Uzasadnij podobieństwo (równe kąty) i wskaż odpowiednie boki.",
        "Oblicz skalę $k$ z pary odpowiednich boków (albo obwodów, albo wysokości).",
        "Pole przemnóż przez $k^2$; gdy znasz pola, skalę dostaniesz jako $\\sqrt{\\frac{P'}{P}}$.",
        "Sprawdź, czy wynik pasuje do skali: dla $k>1$ pole ma wyjść większe.",
      ],
      zadania: [
        {
          nr: "24",
          tresc: "Trójkąt $T_2$ jest podobny do trójkąta $T_1$ w skali $3$. Pole trójkąta $T_1$ jest równe $8$. Pole trójkąta $T_2$ jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$", "$72$", "$24$", "$\\frac{8}{9}$"],
          poprawna: 1,
        },
        {
          nr: "25",
          tresc: "Pola dwóch podobnych trójkątów są równe $20$ i $45$. Skala podobieństwa większego trójkąta do mniejszego jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{3}{2}$", "$\\frac{9}{4}$", "$\\frac{2}{3}$", "$\\frac{4}{9}$"],
          poprawna: 0,
        },
        {
          nr: "26",
          tresc: "Trójkąt o obwodzie $24$ i polu $48$ jest podobny do trójkąta o obwodzie $36$. Pole drugiego trójkąta jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$72$", "$162$", "$32$", "$108$"],
          poprawna: 3,
        },
        {
          nr: "27",
          tresc: "Trójkąt $A'B'C'$ jest podobny do trójkąta $ABC$ w skali $2$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Pole trójkąta $A'B'C'$ jest $4$ razy większe od pola trójkąta $ABC$.", litery: "PF", poprawna: 0 },
            { tekst: "Obwód trójkąta $A'B'C'$ jest $4$ razy większy od obwodu trójkąta $ABC$.", litery: "PF", poprawna: 1 },
            { tekst: "Kąty trójkąta $A'B'C'$ mają miary dwa razy większe od odpowiednich kątów trójkąta $ABC$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "28",
          tresc: "W trójkącie $ABC$ punkt $D$ leży na boku $AB$, a punkt $E$ na boku $BC$, przy czym $DE \\parallel AC$. Wiadomo, że $|BD| = 4$, $|AB| = 10$, a pole trójkąta $ABC$ jest równe $50$. Pole trójkąta $DBE$ jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$20$", "$8$", "$25$", "$42$"],
          poprawna: 1,
        },
        {
          nr: "29",
          tresc: "Działka na planie w skali $1:500$ ma pole $40\\ \\text{cm}^2$. Rzeczywiste pole tej działki jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$1000\\ \\text{m}^2$", "$2\\ \\text{m}^2$", "$20\\ \\text{m}^2$", "$100\\ \\text{m}^2$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "30",
          punkty: 2,
          tresc: "W trapezie $ABCD$ o podstawach $AB$ i $CD$ przekątne przecinają się w punkcie $S$. Wiadomo, że $|AB| = 9$, $|CD| = 6$, a pole trójkąta $CDS$ jest równe $24$. Oblicz pole trójkąta $ABS$. **Zapisz obliczenia.**",
          rozwiazanie: "Trójkąty $ABS$ i $CDS$ są podobne: mają równe kąty wierzchołkowe przy punkcie $S$ oraz równe kąty naprzemianległe, bo $AB \\parallel CD$.\n\nOdpowiednimi bokami są podstawy trapezu, więc skala podobieństwa trójkąta $ABS$ do $CDS$ wynosi $k = \\frac{9}{6} = \\frac{3}{2}$.\n\nPola mają się do siebie jak $k^2$: $P_{ABS} = \\left(\\frac{3}{2}\\right)^2\\cdot 24 = \\frac{9}{4}\\cdot 24 = 54$.\n\nOdpowiedź: $54$.",
        },
        {
          nr: "31",
          punkty: 3,
          tresc: "Odcinek $DE$ jest równoległy do boku $BC$ trójkąta $ABC$ (punkt $D$ leży na boku $AB$, a punkt $E$ na boku $AC$) i dzieli ten trójkąt na trójkąt $ADE$ oraz trapez $DBCE$ o równych polach. Wiadomo, że $|BC| = 10\\sqrt{2}$. Oblicz $|DE|$. **Zapisz obliczenia.**",
          rozwiazanie: "Trójkąty $ADE$ i $ABC$ są podobne (wspólny kąt $A$ i równe kąty odpowiadające, bo $DE \\parallel BC$).\n\nTrójkąt $ADE$ i trapez mają równe pola, więc $P_{ADE} = \\frac{1}{2}P_{ABC}$.\n\nPola figur podobnych mają się jak kwadrat skali: $k^2 = \\frac{1}{2}$, czyli $k = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$.\n\n$|DE| = k\\cdot|BC| = \\frac{\\sqrt{2}}{2}\\cdot 10\\sqrt{2} = \\frac{10\\cdot 2}{2} = 10$.\n\nOdpowiedź: $|DE| = 10$.",
        },
      ],
      generatory: [
        {
          id: "podobne-pole",
          nazwa: "Pole z podobieństwa",
          opis: "Znasz pole jednego trójkąta i skalę podobieństwa (albo odpowiednie boki, obwody) – oblicz pole trójkąta podobnego.",
          generuj(r) {
            const K = [[2, 1], [3, 1], [3, 2], [2, 3], [1, 2], [1, 3], [4, 3], [3, 4], [5, 2], [5, 3], [1, 4], [4, 1], [5, 4], [2, 5]];
            for (;;) {
              const [p, m] = r.pick(K);   // skala k = p/m (trójkąt T2 do trójkąta T1)
              const P1 = r.int(2, 60);
              const P2 = q(P1).mul(q(p * p, m * m));
              if (!ladna(P2)) continue;
              const k = q(p, m);
              const rodzaj = r.int(0, 3);
              const u = r.int(1, 4);
              const ulamek = `\\frac{${p * u}}{${m * u}}`;
              const rowne = ulamek === k.tex() ? ulamek : `${ulamek} = ${k.tex()}`;
              const opis = [
                `Trójkąt $T_2$ jest podobny do trójkąta $T_1$ w skali $k = ${k.tex()}$.`,
                `Trójkąty $T_1$ i $T_2$ są podobne. Odpowiednie boki tych trójkątów mają długości $${m * u}$ (w $T_1$) i $${p * u}$ (w $T_2$).`,
                `Trójkąty $T_1$ i $T_2$ są podobne. Obwód trójkąta $T_1$ jest równy $${m * u}$, a obwód trójkąta $T_2$ jest równy $${p * u}$.`,
                `Trójkąty $T_1$ i $T_2$ są podobne. Wysokość trójkąta $T_1$ ma długość $${m * u}$, a odpowiednia wysokość trójkąta $T_2$ ma długość $${p * u}$.`,
              ][rodzaj];
              const krok1 = [
                `Skala podobieństwa jest dana: $k = ${k.tex()}$.`,
                `Skala podobieństwa: $k = ${rowne}$.`,
                `Obwody podobnych trójkątów mają się jak skala: $k = ${rowne}$.`,
                `Wysokości podobnych trójkątów mają się jak skala: $k = ${rowne}$.`,
              ][rodzaj];
              return {
                tresc: `${opis} Pole trójkąta $T_1$ jest równe $${P1}$. Oblicz pole trójkąta $T_2$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Pole trójkąta $T_2$" }],
                odpowiedz: { w: P2 },
                wynik: `$P_2 = ${P2.tex()}$`,
                rozwiazanie: [
                  krok1,
                  `Pola mają się do siebie jak $k^2$: $P_2 = k^2\\cdot P_1 = \\left(${k.tex()}\\right)^2\\cdot ${P1}$.`,
                  `$P_2 = ${k.mul(k).tex()}\\cdot ${P1} = ${P2.tex()}$.`,
                ],
              };
            }
          },
        },
        {
          id: "podobne-skala",
          nazwa: "Skala z pól",
          opis: "Znasz pola dwóch figur podobnych – oblicz skalę podobieństwa albo długość odpowiedniego boku.",
          generuj(r) {
            for (;;) {
              const m = r.int(1, 6), p = r.int(1, 6);
              if (m === p) continue;
              const t = r.int(1, 9);
              const P1 = t * m * m, P2 = t * p * p;
              const k = q(p, m);
              if (k.eq(1)) continue;
              if (r.chance()) {
                return {
                  tresc: `Pola dwóch podobnych trójkątów są równe $${P1}$ i $${P2}$. Oblicz skalę podobieństwa trójkąta o polu $${P2}$ do trójkąta o polu $${P1}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "$k =$" }],
                  odpowiedz: { w: k },
                  wynik: `$k = ${k.tex()}$`,
                  rozwiazanie: [
                    "Pola figur podobnych mają się do siebie jak $k^2$, więc $k = \\sqrt{\\frac{P_2}{P_1}}$.",
                    `$\\frac{P_2}{P_1} = \\frac{${P2}}{${P1}} = ${q(P2, P1).tex()}$.`,
                    `$k = \\sqrt{${q(P2, P1).tex()}} = ${k.tex()}$.`,
                  ],
                };
              }
              const a1 = r.int(2, 12);
              const a2 = k.mul(a1);
              if (!ladna(a2)) continue;
              return {
                tresc: `Pola dwóch podobnych trójkątów są równe $${P1}$ i $${P2}$. Bok trójkąta o polu $${P1}$ ma długość $${a1}$. Oblicz długość odpowiedniego boku trójkąta o polu $${P2}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Długość boku" }],
                odpowiedz: { w: a2 },
                wynik: `$${a2.tex()}$`,
                rozwiazanie: [
                  `Skala podobieństwa to pierwiastek ilorazu pól: $k = \\sqrt{\\frac{${P2}}{${P1}}} = \\sqrt{${q(P2, P1).tex()}} = ${k.tex()}$.`,
                  `Odpowiedni bok ma długość $k\\cdot ${a1} = ${k.tex()}\\cdot ${a1} = ${a2.tex()}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 7.8
    {
      id: "pole-kola",
      nazwa: "Pole koła, pole wycinka koła",
      sciaga: [
        {
          nazwa: "Pole i obwód koła",
          slownie: "Pole koła to $\\pi$ razy kwadrat promienia, a obwód – $2\\pi$ razy promień. Promień jest połową średnicy.",
          tex: "P=\\pi r^2\\qquad L=2\\pi r",
          litery: "$r$ – promień koła, $P$ – jego pole, $L$ – obwód.",
          przyklad: "Dla $r=5$: $P=25\\pi$ i $L=10\\pi$. Dla średnicy $12$ jest $r=6$ i $P=36\\pi$.",
          uwaga: "W polu jest $r^2$ (nie $2r$) – kwadrat promienia, a nie średnicy.",
        },
        {
          nazwa: "Wycinek koła",
          slownie: "Wycinek jest częścią koła ograniczoną dwoma promieniami. Kąt środkowy $\\alpha$ mówi, jaką część całego koła ($360^\\circ$) zajmuje wycinek; taką samą część stanowi długość łuku w obwodzie.",
          tex: "P=\\frac{\\alpha}{360^\\circ}\\cdot\\pi r^2\\qquad l=\\frac{\\alpha}{360^\\circ}\\cdot2\\pi r",
          litery: "$\\alpha$ – kąt środkowy wycinka (w stopniach), $r$ – promień, $P$ – pole wycinka, $l$ – długość łuku.",
          przyklad: "Dla $r=6$ i $\\alpha=60^\\circ$: $P=\\frac{1}{6}\\cdot36\\pi=6\\pi$ oraz $l=\\frac{1}{6}\\cdot12\\pi=2\\pi$.",
          uwaga: "Kąt dzielisz przez $360^\\circ$, a nie przez $180^\\circ$.",
        },
        {
          nazwa: "Pole z długości łuku",
          slownie: "Wycinek przypomina trójkąt o podstawie równej długości łuku i wysokości $r$. Dlatego jego pole to połowa iloczynu długości łuku i promienia.",
          tex: "P=\\frac{1}{2}lr",
          litery: "$l$ – długość łuku wycinka, $r$ – promień koła.",
          przyklad: "Dla $l=4\\pi$ i $r=6$: $P=\\frac{1}{2}\\cdot4\\pi\\cdot6=12\\pi$.",
          uwaga: "We wzorze jest promień $r$, a nie średnica.",
        },
        {
          nazwa: "Pierścień kołowy",
          slownie: "Pierścień to część płaszczyzny między dwoma okręgami o wspólnym środku. Jego pole to różnica pól większego i mniejszego koła.",
          tex: "P=\\pi R^2-\\pi r^2=\\pi(R^2-r^2)",
          litery: "$R$ – promień większego okręgu, $r$ – promień mniejszego.",
          przyklad: "Dla $R=7$ i $r=5$: $P=\\pi(49-25)=24\\pi$.",
          uwaga: "To nie jest $\\pi(R-r)^2$: odejmujemy kwadraty, a nie podnosimy różnicę do kwadratu.",
        },
      ],
      jak: [
        "Ustal promień (z średnicy albo z obwodu: $r=\\frac{L}{2\\pi}$).",
        "Dla całego koła użyj wzoru $\\pi r^2$. Dla wycinka pomnóż pole koła przez $\\frac{\\alpha}{360^\\circ}$.",
        "Figury złożone licz jako sumę albo różnicę pól kół, wycinków i wielokątów.",
        "Zostaw wynik z $\\pi$ (np. $24\\pi$), chyba że zadanie każe go przybliżyć.",
      ],
      zadania: [
        {
          nr: "32",
          tresc: "Średnica koła ma długość $10$. Pole tego koła jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$10\\pi$", "$100\\pi$", "$50\\pi$", "$25\\pi$"],
          poprawna: 3,
        },
        {
          nr: "33",
          tresc: "Obwód koła jest równy $16\\pi$. Pole tego koła jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$64\\pi$", "$256\\pi$", "$16\\pi$", "$32\\pi$"],
          poprawna: 0,
        },
        {
          nr: "34",
          tresc: "Wycinek koła o promieniu $12$ ma kąt środkowy $150^\\circ$. Pole tego wycinka jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$72\\pi$", "$60\\pi$", "$30\\pi$", "$120\\pi$"],
          poprawna: 1,
        },
        {
          nr: "35",
          tresc: "Wycinek koła ma promień $6$ i kąt środkowy $60^\\circ$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Pole tego wycinka jest równe $12\\pi$.", litery: "PF", poprawna: 1 },
            { tekst: "Długość łuku tego wycinka jest równa $2\\pi$.", litery: "PF", poprawna: 0 },
            { tekst: "Pole tego wycinka stanowi $\\frac{1}{6}$ pola całego koła.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "36",
          tresc: "Dwa współśrodkowe koła mają promienie $9$ i $7$. Pole pierścienia kołowego między ich brzegami jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$4\\pi$", "$130\\pi$", "$32\\pi$", "$2\\pi$"],
          poprawna: 2,
        },
        {
          nr: "37",
          tresc: "Wycinek koła o promieniu $8$ ma łuk o długości $4\\pi$. Pole tego wycinka jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$32\\pi$", "$8\\pi$", "$16\\pi$", "$64\\pi$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "38",
          punkty: 2,
          tresc: "Z koła o promieniu $12$ wycięto wycinek o kącie środkowym $120^\\circ$. Oblicz pole pozostałej części koła. **Zapisz obliczenia.**",
          rozwiazanie: "Pole całego koła: $P = \\pi\\cdot 12^2 = 144\\pi$.\n\nWycinek o kącie $120^\\circ$ stanowi $\\frac{120}{360} = \\frac{1}{3}$ koła, więc jego pole to $\\frac{1}{3}\\cdot 144\\pi = 48\\pi$.\n\nPozostała część: $144\\pi - 48\\pi = 96\\pi$.\n\nOdpowiedź: $96\\pi$.",
        },
        {
          nr: "39",
          punkty: 3,
          tresc: "W kwadracie o boku $6$ narysowano okrąg styczny do wszystkich czterech boków kwadratu. Oblicz pole tej części kwadratu, która leży poza kołem ograniczonym tym okręgiem. **Zapisz obliczenia.**",
          rozwiazanie: "Okrąg styczny do wszystkich boków kwadratu ma średnicę równą bokowi kwadratu, więc jego promień to $r = 3$.\n\nPole koła: $\\pi\\cdot 3^2 = 9\\pi$.\n\nPole kwadratu: $6^2 = 36$.\n\nPole części kwadratu poza kołem: $36 - 9\\pi$.\n\nOdpowiedź: $36 - 9\\pi$.",
        },
      ],
      generatory: [
        {
          id: "kolo-pole",
          nazwa: "Pole koła",
          opis: "Oblicz pole koła (z promienia, średnicy albo obwodu) lub pole pierścienia kołowego.",
          generuj(r) {
            const rodzaj = r.int(0, 3);
            if (rodzaj === 0) {
              const prom = r.int(2, 15);
              const w = q(prom * prom);
              const o = odp(w, "pi");
              return {
                tresc: `Promień koła ma długość $${prom}$. Oblicz pole tego koła.${o.dopisek}`,
                pola: o.pola,
                odpowiedz: { w },
                wynik: o.wynik,
                rozwiazanie: ["Pole koła: $P = \\pi r^2$.", `$P = \\pi\\cdot ${prom}^2 = ${kpier(w, "pi")}$.`],
              };
            }
            if (rodzaj === 1) {
              const prom = r.int(2, 12);
              const w = q(prom * prom);
              const o = odp(w, "pi");
              return {
                tresc: `Średnica koła ma długość $${2 * prom}$. Oblicz pole tego koła.${o.dopisek}`,
                pola: o.pola,
                odpowiedz: { w },
                wynik: o.wynik,
                rozwiazanie: [
                  `Promień to połowa średnicy: $r = ${2 * prom}:2 = ${prom}$.`,
                  `$P = \\pi r^2 = \\pi\\cdot ${prom}^2 = ${kpier(w, "pi")}$.`,
                ],
              };
            }
            if (rodzaj === 2) {
              const prom = r.int(2, 12);
              const w = q(prom * prom);
              const o = odp(w, "pi");
              return {
                tresc: `Obwód koła jest równy $${2 * prom}\\pi$. Oblicz pole tego koła.${o.dopisek}`,
                pola: o.pola,
                odpowiedz: { w },
                wynik: o.wynik,
                rozwiazanie: [
                  `Obwód to $2\\pi r$, więc $2\\pi r = ${2 * prom}\\pi$ i $r = ${prom}$.`,
                  `$P = \\pi r^2 = \\pi\\cdot ${prom}^2 = ${kpier(w, "pi")}$.`,
                ],
              };
            }
            const R = r.int(4, 14), prom = r.int(2, R - 1);
            const w = q(R * R - prom * prom);
            const o = odp(w, "pi");
            return {
              tresc: `Dwa współśrodkowe koła mają promienie $${R}$ i $${prom}$. Oblicz pole pierścienia kołowego ograniczonego ich brzegami.${o.dopisek}`,
              pola: o.pola,
              odpowiedz: { w },
              wynik: o.wynik,
              rozwiazanie: [
                "Pole pierścienia to różnica pól kół: $P = \\pi R^2 - \\pi r^2 = \\pi(R^2 - r^2)$.",
                `$P = \\pi(${R}^2 - ${prom}^2) = \\pi(${R * R} - ${prom * prom}) = ${kpier(w, "pi")}$.`,
              ],
            };
          },
        },
        {
          id: "kolo-wycinek",
          nazwa: "Pole wycinka koła",
          opis: "Oblicz pole wycinka, długość jego łuku albo miarę kąta środkowego.",
          generuj(r) {
            const KATY = [30, 45, 60, 90, 120, 135, 150, 180, 210, 240, 270, 300];
            const rodzaj = r.int(0, 3);
            if (rodzaj === 2) {
              const m = r.int(1, 9), prom = r.int(2, 12);
              const w = q(m * prom, 2);
              const o = odp(w, "pi");
              return {
                tresc: `Wycinek koła o promieniu $${prom}$ ma łuk o długości $${m === 1 ? "" : m}\\pi$. Oblicz pole tego wycinka.${o.dopisek}`,
                pola: o.pola,
                odpowiedz: { w },
                wynik: o.wynik,
                rozwiazanie: [
                  "Pole wycinka z długości łuku: $P = \\frac{1}{2}lr$.",
                  `$P = \\frac{1}{2}\\cdot ${m === 1 ? "" : m}\\pi\\cdot ${prom} = ${kpier(w, "pi")}$.`,
                ],
              };
            }
            for (;;) {
              const kat = r.pick(KATY), prom = r.int(2, 12);
              const pole = q(kat * prom * prom, 360);
              const luk = q(kat * prom, 180);
              if (!ladna(pole) || !ladna(luk)) continue;
              if (rodzaj === 0) {
                const o = odp(pole, "pi");
                return {
                  tresc: `Wycinek koła o promieniu $${prom}$ ma kąt środkowy $${kat}^\\circ$. Oblicz pole tego wycinka.${o.dopisek}`,
                  pola: o.pola,
                  odpowiedz: { w: pole },
                  wynik: o.wynik,
                  rozwiazanie: [
                    `Wycinek stanowi $\\frac{${kat}}{360}$ koła: $P = \\frac{${kat}}{360}\\cdot\\pi r^2$.`,
                    `$P = \\frac{${kat}}{360}\\cdot\\pi\\cdot ${prom}^2 = \\frac{${kat}}{360}\\cdot ${prom * prom}\\pi = ${kpier(pole, "pi")}$.`,
                  ],
                };
              }
              if (rodzaj === 1) {
                const o = odp(luk, "pi", "l");
                return {
                  tresc: `Wycinek koła o promieniu $${prom}$ ma kąt środkowy $${kat}^\\circ$. Oblicz długość łuku tego wycinka.${o.dopisek}`,
                  pola: o.pola,
                  odpowiedz: { w: luk },
                  wynik: o.wynik,
                  rozwiazanie: [
                    `Długość łuku to $\\frac{${kat}}{360}$ obwodu koła: $l = \\frac{${kat}}{360}\\cdot 2\\pi r$.`,
                    `$l = \\frac{${kat}}{360}\\cdot 2\\pi\\cdot ${prom} = \\frac{${kat}}{360}\\cdot ${2 * prom}\\pi = ${kpier(luk, "pi")}$.`,
                  ],
                };
              }
              return {
                tresc: `Pole wycinka koła o promieniu $${prom}$ jest równe $${kpier(pole, "pi")}$. Oblicz miarę kąta środkowego tego wycinka (w stopniach).`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Miara kąta (w stopniach)" }],
                odpowiedz: { w: q(kat) },
                wynik: `$${kat}^\\circ$`,
                rozwiazanie: [
                  `Pole wycinka: $\\frac{\\alpha}{360^\\circ}\\cdot\\pi r^2 = \\frac{\\alpha}{360^\\circ}\\cdot ${prom * prom}\\pi = ${kpier(pole, "pi")}$.`,
                  `Stąd $\\frac{\\alpha}{360^\\circ} = \\frac{${pole.tex()}}{${prom * prom}}$.`,
                  `$\\alpha = 360^\\circ\\cdot\\frac{${pole.tex()}}{${prom * prom}} = ${kat}^\\circ$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 7.9
    {
      id: "pole-w-dowodzeniu",
      nazwa: "Pole w dowodzeniu twierdzeń",
      sciaga: [
        {
          nazwa: "Wspólna wysokość",
          slownie: "Dwa trójkąty o wspólnej wysokości (wierzchołek ten sam, podstawy na jednej prostej) mają pola w takim samym stosunku, jak ich podstawy.",
          tex: "\\frac{P_1}{P_2}=\\frac{a_1}{a_2}",
          litery: "$P_1$, $P_2$ – pola trójkątów, $a_1$, $a_2$ – ich podstawy leżące na jednej prostej.",
          przyklad: "Punkt $D$ dzieli bok $BC$ w stosunku $|BD|:|DC|=2:3$. Trójkąty $ABD$ i $ADC$ mają wspólną wysokość z $A$, więc ich pola są w stosunku $2:3$.",
          uwaga: "Wspólna wysokość musi opadać na tę samą prostą.",
        },
        {
          nazwa: "Środkowa i przekątne",
          slownie: "Środkowa dzieli trójkąt na dwa trójkąty o równych polach (równe podstawy, wspólna wysokość). Przekątne równoległoboku dzielą go na cztery trójkąty o równych polach.",
          przyklad: "Trójkąt o polu $30$ dzieli środkowa na dwa trójkąty o polach $15$. Równoległobok o polu $48$ ma cztery trójkąty po $12$.",
          uwaga: "Równe pola nie oznaczają, że trójkąty są przystające.",
        },
        {
          nazwa: "Pole liczone na dwa sposoby",
          slownie: "Gdy to samo pole zapiszesz dwoma wzorami, możesz je porównać i wyliczyć szukaną wielkość albo udowodnić zależność.",
          tex: "\\frac{1}{2}ah_a=\\frac{1}{2}bh_b\\qquad\\frac{1}{2}ab=\\frac{1}{2}ch",
          litery: "W trójkącie prostokątnym $a$, $b$ – przyprostokątne, $c$ – przeciwprostokątna, $h$ – wysokość na przeciwprostokątną.",
          przyklad: "Dla boków $3$, $4$, $5$: $\\frac{1}{2}\\cdot3\\cdot4=\\frac{1}{2}\\cdot5\\cdot h$, więc $h=\\frac{12}{5}$.",
        },
        {
          nazwa: "Odległości w trójkącie równobocznym",
          slownie: "Suma odległości punktu leżącego wewnątrz trójkąta równobocznego od jego trzech boków jest równa wysokości tego trójkąta. Dowód: pole trójkąta to suma pól trzech trójkątów o wspólnej podstawie $a$ i wysokościach $d_1$, $d_2$, $d_3$.",
          tex: "d_1+d_2+d_3=h",
          litery: "$a$ – bok trójkąta, $h$ – jego wysokość, $d_1$, $d_2$, $d_3$ – odległości punktu od boków.",
          przyklad: "Dla boku $4\\sqrt{3}$ jest $h=6$. Jeśli punkt jest oddalony od dwóch boków o $1$ i $2$, to od trzeciego o $6-1-2=3$.",
          uwaga: "Punkt musi leżeć wewnątrz (lub na brzegu) trójkąta, a trójkąt musi być równoboczny.",
        },
      ],
      jak: [
        "Wypisz, jakie trójkąty mają wspólną wysokość albo wspólną podstawę.",
        "Zapisz pola tych trójkątów wzorami z wysokością lub kątem.",
        "Porównaj pola (suma, różnica, stosunek) i uprość.",
        "W dowodzie zakończ zdaniem, że teza została wykazana.",
      ],
      zadania: [
        {
          nr: "40",
          tresc: "Punkt $D$ leży na boku $BC$ trójkąta $ABC$ i dzieli go w stosunku $|BD|:|DC| = 3:5$. Pole trójkąta $ABD$ jest równe $18$. Pole trójkąta $ABC$ jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$30$", "$72$", "$48$", "$108$"],
          poprawna: 2,
        },
        {
          nr: "41",
          tresc: "Przekątne równoległoboku $ABCD$ o polu $60$ przecinają się w punkcie $S$. Pole trójkąta $ABS$ jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$30$", "$20$", "$15$", "$10$"],
          poprawna: 2,
        },
        {
          nr: "42",
          tresc: "Przyprostokątne trójkąta prostokątnego mają długości $5$ i $12$. Wysokość opuszczona na przeciwprostokątną ma długość. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{30}{13}$", "$\\frac{60}{13}$", "$\\frac{13}{2}$", "$6$"],
          poprawna: 1,
        },
        {
          nr: "43",
          tresc: "Punkt $M$ jest środkiem boku $AB$ trójkąta $ABC$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Trójkąty $AMC$ i $MBC$ mają równe pola.", litery: "PF", poprawna: 0 },
            { tekst: "Jeśli pole trójkąta $ABC$ wynosi $36$, to pole trójkąta $AMC$ wynosi $18$.", litery: "PF", poprawna: 0 },
            { tekst: "Jeśli pole trójkąta $ABC$ wynosi $36$, to pole trójkąta $AMC$ wynosi $12$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "44",
          tresc: "Trójkąt równoboczny ma bok długości $6\\sqrt{3}$. Punkt $S$ leży wewnątrz tego trójkąta, a jego odległości od dwóch boków wynoszą $2$ i $4$. Odległość punktu $S$ od trzeciego boku jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$12$", "$6\\sqrt{3} - 6$", "$9$"],
          poprawna: 0,
        },
        {
          nr: "45",
          tresc: "W trapezie $ABCD$ o podstawach $AB$ i $CD$ przekątne $AC$ i $BD$ przecinają się w punkcie $S$. Które dwa trójkąty zawsze mają równe pola? **Wybierz właściwą odpowiedź.**",
          opcje: ["trójkąty $ASD$ i $ASB$", "trójkąty $ABC$ i $ACD$", "trójkąty $BSC$ i $CSD$", "trójkąty $ABD$ i $ABC$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "46",
          punkty: 3,
          tresc: "Punkt $S$ leży wewnątrz równoległoboku $ABCD$. Wykaż, że suma pól trójkątów $ABS$ i $CDS$ jest równa połowie pola równoległoboku. **Zapisz uzasadnienie.**",
          rozwiazanie: "Niech $a = |AB| = |CD|$, niech $h$ będzie odległością prostych $AB$ i $CD$ (wysokością równoległoboku), a $h_1$ i $h_2$ – odległościami punktu $S$ od tych prostych. Punkt $S$ leży wewnątrz równoległoboku, więc $h_1 + h_2 = h$.\n\nPola trójkątów: $P_{ABS} = \\frac{1}{2}ah_1$ oraz $P_{CDS} = \\frac{1}{2}ah_2$.\n\nSuma pól: $\\frac{1}{2}ah_1 + \\frac{1}{2}ah_2 = \\frac{1}{2}a(h_1 + h_2) = \\frac{1}{2}ah$.\n\nPole równoległoboku to $ah$, więc suma pól tych trójkątów jest jego połową.\n\nOdpowiedź: suma pól trójkątów $ABS$ i $CDS$ jest równa połowie pola równoległoboku, co należało wykazać.",
        },
        {
          nr: "47",
          punkty: 3,
          tresc: "W trójkącie $ABC$ punkt $D$ leży na boku $AB$ i $|AD|:|DB| = 1:3$, a punkt $E$ jest środkiem boku $BC$. Pole trójkąta $ABC$ jest równe $48$. Oblicz pole trójkąta $DBE$. **Zapisz obliczenia.**",
          rozwiazanie: "Trójkąty $DBE$ i $ABC$ mają wspólny kąt $B$: $P_{DBE} = \\frac{1}{2}|DB|\\cdot|BE|\\cdot\\sin B$ oraz $P_{ABC} = \\frac{1}{2}|AB|\\cdot|BC|\\cdot\\sin B$.\n\nZ danych: $|DB| = \\frac{3}{4}|AB|$ i $|BE| = \\frac{1}{2}|BC|$.\n\nStąd $\\frac{P_{DBE}}{P_{ABC}} = \\frac{3}{4}\\cdot\\frac{1}{2} = \\frac{3}{8}$.\n\n$P_{DBE} = \\frac{3}{8}\\cdot 48 = 18$.\n\nOdpowiedź: $18$.",
        },
      ],
      generatory: [
        {
          id: "dowodzenie-podzial",
          nazwa: "Podział boku trójkąta",
          opis: "Punkt dzieli bok trójkąta w danym stosunku – oblicz pola trójkątów o wspólnej wysokości albo ten stosunek.",
          generuj(r) {
            const rodzaj = r.int(0, 2);
            const pierwsze = "Trójkąty $ABD$ i $ADC$ mają wspólną wysokość poprowadzoną z wierzchołka $A$ na prostą $BC$, więc ich pola mają się do siebie jak podstawy $|BD|$ i $|DC|$.";
            for (;;) {
              const [m, n] = r.pick(PARY);
              if (rodzaj === 0) {
                const P = r.int(10, 60);
                const w = q(P * m, m + n);
                if (!ladna(w)) continue;
                return {
                  tresc: `Punkt $D$ leży na boku $BC$ trójkąta $ABC$ i $|BD|:|DC| = ${m}:${n}$. Pole trójkąta $ABC$ jest równe $${P}$. Oblicz pole trójkąta $ABD$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Pole trójkąta $ABD$" }],
                  odpowiedz: { w },
                  wynik: `$${w.tex()}$`,
                  rozwiazanie: [
                    pierwsze,
                    `Podstawy mają się jak $${m}:${n}$, więc trójkąt $ABD$ stanowi $\\frac{${m}}{${m + n}}$ pola trójkąta $ABC$.`,
                    `$P_{ABD} = \\frac{${m}}{${m + n}}\\cdot ${P} = ${w.tex()}$.`,
                  ],
                };
              }
              if (rodzaj === 1) {
                const a = r.int(2, 20);
                const szukaAdc = r.chance();
                const w = szukaAdc ? q(a * n, m) : q(a * (m + n), m);
                if (!ladna(w)) continue;
                return {
                  tresc: `Punkt $D$ leży na boku $BC$ trójkąta $ABC$ i $|BD|:|DC| = ${m}:${n}$. Pole trójkąta $ABD$ jest równe $${a}$. Oblicz pole trójkąta $${szukaAdc ? "ADC" : "ABC"}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: `Pole trójkąta $${szukaAdc ? "ADC" : "ABC"}$` }],
                  odpowiedz: { w },
                  wynik: `$${w.tex()}$`,
                  rozwiazanie: szukaAdc
                    ? [
                      pierwsze,
                      `$\\frac{P_{ABD}}{P_{ADC}} = \\frac{${m}}{${n}}$, więc $P_{ADC} = ${a}\\cdot\\frac{${n}}{${m}}$.`,
                      `$P_{ADC} = ${w.tex()}$.`,
                    ]
                    : [
                      pierwsze,
                      `$\\frac{P_{ABD}}{P_{ADC}} = \\frac{${m}}{${n}}$, więc $P_{ADC} = ${a}\\cdot\\frac{${n}}{${m}} = ${q(a * n, m).tex()}$.`,
                      `$P_{ABC} = P_{ABD} + P_{ADC} = ${a} + ${q(a * n, m).tex()} = ${w.tex()}$.`,
                    ],
                };
              }
              const a = m * r.int(1, 6), b = n * r.int(1, 6);
              const w = q(a, b);
              if (!ladna(w) || w.eq(1)) continue;
              return {
                tresc: `Punkt $D$ leży na boku $BC$ trójkąta $ABC$. Pole trójkąta $ABD$ jest równe $${a}$, a pole trójkąta $ADC$ jest równe $${b}$. Oblicz $\\frac{|BD|}{|DC|}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$\\frac{|BD|}{|DC|} =$" }],
                odpowiedz: { w },
                wynik: `$\\frac{|BD|}{|DC|} = ${w.tex()}$`,
                rozwiazanie: [
                  pierwsze,
                  `$\\frac{|BD|}{|DC|} = \\frac{P_{ABD}}{P_{ADC}} = \\frac{${a}}{${b}}${`\\frac{${a}}{${b}}` === w.tex() ? "" : ` = ${w.tex()}`}$.`,
                ],
              };
            }
          },
        },
        {
          id: "dowodzenie-odleglosci",
          nazwa: "Odległości od boków",
          opis: "Punkt wewnątrz trójkąta równobocznego – oblicz trzecią odległość od boku albo długość boku.",
          generuj(r) {
            const suma = "Suma odległości punktu wewnątrz trójkąta równobocznego od jego boków jest równa wysokości tego trójkąta (pole trójkąta to suma pól trzech trójkątów o wspólnej podstawie $a$).";
            if (r.chance()) {
              const m = r.int(2, 8);
              const h = 3 * m;
              const d1 = r.int(1, h - 2), d2 = r.int(1, h - 1 - d1);
              const d3 = h - d1 - d2;
              return {
                tresc: `Trójkąt równoboczny ma bok długości $${2 * m}\\sqrt{3}$. Punkt $S$ leży wewnątrz tego trójkąta, a jego odległości od dwóch boków wynoszą $${d1}$ i $${d2}$. Oblicz odległość punktu $S$ od trzeciego boku.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Odległość od trzeciego boku" }],
                odpowiedz: { w: q(d3) },
                wynik: `$${d3}$`,
                rozwiazanie: [
                  suma,
                  `Wysokość trójkąta: $h = \\frac{a\\sqrt{3}}{2} = \\frac{${2 * m}\\sqrt{3}\\cdot\\sqrt{3}}{2} = \\frac{${6 * m}}{2} = ${h}$.`,
                  `Szukana odległość: $${h} - ${d1} - ${d2} = ${d3}$.`,
                ],
              };
            }
            const d1 = r.int(1, 8), d2 = r.int(1, 8), d3 = r.int(1, 8);
            const h = d1 + d2 + d3;
            const w = q(2 * h, 3);
            const o = odp(w, 3, "a");
            return {
              tresc: `Punkt $S$ leży wewnątrz trójkąta równobocznego, a jego odległości od boków tego trójkąta wynoszą $${d1}$, $${d2}$ i $${d3}$. Oblicz długość boku trójkąta.${o.dopisek}`,
              pola: o.pola,
              odpowiedz: { w },
              wynik: o.wynik,
              rozwiazanie: [
                suma,
                `Wysokość: $h = ${d1} + ${d2} + ${d3} = ${h}$.`,
                `Z wzoru $h = \\frac{a\\sqrt{3}}{2}$: $a = \\frac{2h}{\\sqrt{3}} = \\frac{${2 * h}}{\\sqrt{3}} = \\frac{${2 * h}\\sqrt{3}}{3} = ${kpier(w, 3)}$.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
