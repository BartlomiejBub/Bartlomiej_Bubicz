// Klasa 1 (liceum i technikum) · rozdział 8 „Trygonometria kąta ostrego” – Matematyka 1, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

const F = { sin: "\\sin", cos: "\\cos", tg: "\\operatorname{tg}", ctg: "\\operatorname{ctg}" };
const DOPELNIENIE = { sin: "cos", cos: "sin", tg: "ctg", ctg: "tg" };

/** Wartość funkcji kąta, którego przyprostokątna przeciwległa to a, przyległa b, a przeciwprostokątna c. */
const wart = (f, a, b, c) => (f === "sin" ? q(a, c) : f === "cos" ? q(b, c) : f === "tg" ? q(a, b) : q(b, a));

/** „Ładna” odpowiedź: mianownik co najwyżej 12. */
const ladna = (v) => Math.abs(v.n) <= 100000 && v.d <= 12;

/** Trójki pitagorejskie (a, b, c) w najprostszej postaci – boki każdej pary są względnie pierwsze. */
const TROJKI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]];

/** Nazwy wierzchołków: kąt prosty jest przy trzecim. */
const NAZWY = [["A", "B", "C"], ["K", "L", "M"], ["P", "Q", "R"]];

/** Długość n·√s w LaTeX: dlug(5, 3) = "5\sqrt{3}", dlug(1, 2) = "\sqrt{2}", dlug(7, 1) = "7". */
const dlug = (n, s) => (s === 1 ? `${n}` : `${n === 1 ? "" : n}\\sqrt{${s}}`);

/** Współczynnik przed funkcją: 1 się pomija. */
const wsp = (n) => (n === 1 ? "" : String(n));

/** Boki trójkątów 30°–60°–90° i 45°–45°–90° w jednostkach [współczynnik, liczba pod pierwiastkiem] względem kąta α. */
const BOKI = {
  30: { opp: [1, 1], adj: [1, 3], hyp: [2, 1] },
  45: { opp: [1, 1], adj: [1, 1], hyp: [1, 2] },
  60: { opp: [1, 3], adj: [1, 1], hyp: [2, 1] },
};

/** Wartości funkcji kątów 30°, 45°, 60° w LaTeX. */
const WART = {
  30: { sin: "\\frac{1}{2}", cos: "\\frac{\\sqrt{3}}{2}", tg: "\\frac{\\sqrt{3}}{3}", ctg: "\\sqrt{3}" },
  45: { sin: "\\frac{\\sqrt{2}}{2}", cos: "\\frac{\\sqrt{2}}{2}", tg: "1", ctg: "1" },
  60: { sin: "\\frac{\\sqrt{3}}{2}", cos: "\\frac{1}{2}", tg: "\\sqrt{3}", ctg: "\\frac{\\sqrt{3}}{3}" },
};

/** Dwie funkcje tego samego kąta ostrego z jednego trójkąta prostokątnego; druga ma „ładną” wartość. */
function dwieFunkcje(r) {
  for (;;) {
    let [a, b, c] = r.pick(TROJKI);
    if (r.chance()) [a, b] = [b, a];
    const [f1, f2] = r.shuffle(["sin", "cos", "tg", "ctg"]);
    const w2 = wart(f2, a, b, c);
    if (ladna(w2)) return { a, b, c, f1, f2, w1: wart(f1, a, b, c), w2 };
  }
}

/** Kroki wspólne dla zadań „znając jedną funkcję, oblicz drugą”: boki z danej wartości, trzeci bok z Pitagorasa, szukana funkcja. */
function krokiTrojkat({ a, b, c, f1, f2, w1, w2 }) {
  const [x1, y1] = { sin: ["a", "c"], cos: ["b", "c"], tg: ["a", "b"], ctg: ["b", "a"] }[f1];
  const wartosc = { a, b, c };
  const brak = ["a", "b", "c"].find((s) => s !== x1 && s !== y1);
  const pitagoras = brak === "c"
    ? `$c = \\sqrt{a^2 + b^2} = \\sqrt{${a}^2 + ${b}^2} = ${c}$.`
    : brak === "b"
      ? `$b = \\sqrt{c^2 - a^2} = \\sqrt{${c}^2 - ${a}^2} = ${b}$.`
      : `$a = \\sqrt{c^2 - b^2} = \\sqrt{${c}^2 - ${b}^2} = ${a}$.`;
  const [x2, y2] = { sin: ["a", "c"], cos: ["b", "c"], tg: ["a", "b"], ctg: ["b", "a"] }[f2];
  return [
    "Niech $a$ będzie przyprostokątną przeciwległą do $\\alpha$, $b$ – przyległą, a $c$ – przeciwprostokątną.",
    `Z $${F[f1]}\\alpha = ${w1.tex()}$ przyjmujemy $${x1} = ${wartosc[x1]}$ i $${y1} = ${wartosc[y1]}$. Brakujący bok z twierdzenia Pitagorasa: ${pitagoras}`,
    `$${F[f2]}\\alpha = \\frac{${x2}}{${y2}} = \\frac{${wartosc[x2]}}{${wartosc[y2]}}$.`,
  ];
}

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 8.1
    {
      id: "definicje",
      nazwa: "Sinus, cosinus, tangens i cotangens w trójkącie prostokątnym",
      sciaga: [
        {
          nazwa: "Boki względem kąta ostrego",
          slownie: "Wybierz kąt ostry $\\alpha$ trójkąta prostokątnego. Przyprostokątna leżąca naprzeciw niego jest przeciwległa, druga jest przyległa, a najdłuższy bok to przeciwprostokątna.",
          litery: "$a$ – przyprostokątna przeciwległa do $\\alpha$, $b$ – przyprostokątna przyległa do $\\alpha$, $c$ – przeciwprostokątna.",
          przyklad: "W trójkącie o bokach $3$, $4$, $5$ dla kąta leżącego naprzeciw boku $3$: przeciwległa to $3$, przyległa $4$, przeciwprostokątna $5$.",
          uwaga: "Po zmianie kąta na drugi kąt ostry przyprostokątne zamieniają się rolami: przeciwległa staje się przyległą.",
        },
        {
          nazwa: "Sinus i cosinus",
          slownie: "Sinus to stosunek przyprostokątnej przeciwległej do przeciwprostokątnej, cosinus – przyprostokątnej przyległej do przeciwprostokątnej.",
          tex: "\\sin\\alpha=\\frac{a}{c}\\qquad\\cos\\alpha=\\frac{b}{c}",
          rysunek: `<svg viewBox="0 0 300 170"><polygon class="w" points="30,140 250,140 250,30"/><path class="l" d="M30 140H250M250 140L30 140L250 30"/><path class="a" d="M250 140V30"/><path class="l" d="M237 140V127H250"/><path class="l" d="M64 140A34 34 0 0 0 60.4 124.8"/><text class="t" x="72" y="134">α</text><text class="ta" x="260" y="92">a</text><text class="t" x="140" y="160" text-anchor="middle">b</text><text class="t" x="130" y="76" text-anchor="middle">c</text><text class="tm" x="20" y="152">A</text><text class="tm" x="256" y="152">C</text><text class="tm" x="256" y="28">B</text></svg>`,
          litery: "$a$ – przyprostokątna przeciwległa, $b$ – przyległa, $c$ – przeciwprostokątna.",
          przyklad: "Dla boków $3$, $4$, $5$ i kąta naprzeciw boku $3$: $\\sin\\alpha=\\frac{3}{5}$, $\\cos\\alpha=\\frac{4}{5}$.",
          uwaga: "Sinus i cosinus kąta ostrego są zawsze mniejsze od $1$, bo przeciwprostokątna jest najdłuższym bokiem.",
        },
        {
          nazwa: "Tangens i cotangens",
          slownie: "Tangens to stosunek przyprostokątnej przeciwległej do przyległej, a cotangens – przyległej do przeciwległej. Przeciwprostokątna w ogóle w nich nie występuje.",
          tex: "\\operatorname{tg}\\alpha=\\frac{a}{b}\\qquad\\operatorname{ctg}\\alpha=\\frac{b}{a}",
          litery: "$a$ – przyprostokątna przeciwległa do $\\alpha$, $b$ – przyległa.",
          przyklad: "Dla boków $5$, $12$, $13$ i kąta naprzeciw boku $5$: $\\operatorname{tg}\\alpha=\\frac{5}{12}$, $\\operatorname{ctg}\\alpha=\\frac{12}{5}$.",
          uwaga: "Tangens i cotangens mogą być większe od $1$. Cotangens jest odwrotnością tangensa.",
        },
        {
          nazwa: "Wielkość trójkąta nie ma znaczenia",
          slownie: "Wartość funkcji zależy tylko od miary kąta. Trójkąty prostokątne o tym samym kącie ostrym są podobne, więc stosunki ich boków są takie same.",
          przyklad: "Trójkąty o bokach $3$, $4$, $5$ i $6$, $8$, $10$ mają ten sam kąt ostry i $\\sin\\alpha=\\frac{3}{5}=\\frac{6}{10}$.",
        },
      ],
      jak: [
        "Zaznacz kąt ostry $\\alpha$, o który pytamy.",
        "Wskaż przeciwprostokątną, przyprostokątną przeciwległą i przyległą do $\\alpha$.",
        "Jeśli brakuje któregoś boku, oblicz go z twierdzenia Pitagorasa.",
        "Zapisz stosunek boków z definicji i skróć ułamek.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "W trójkącie prostokątnym $ABC$ kąt prosty jest przy wierzchołku $C$, a $|AC| = 6$, $|BC| = 8$, $|AB| = 10$. Sinus kąta $A$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{3}{5}$", "$\\frac{4}{5}$", "$\\frac{4}{3}$", "$\\frac{3}{4}$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "W trójkącie prostokątnym $ABC$ z kątem prostym przy wierzchołku $C$ mamy $|AC| = 5$ i $|BC| = 12$. Tangens kąta $B$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{12}{5}$", "$\\frac{5}{13}$", "$\\frac{5}{12}$", "$\\frac{12}{13}$"],
          poprawna: 2,
        },
        {
          nr: "3",
          tresc: "Przyprostokątne trójkąta prostokątnego mają długości $9$ i $12$, a kąt ostry $\\alpha$ leży naprzeciw krótszej z nich. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\sin\\alpha=\\frac{3}{5}$", litery: "PF", poprawna: 0 },
            { tekst: "$\\cos\\alpha=\\frac{3}{4}$", litery: "PF", poprawna: 1 },
            { tekst: "$\\operatorname{tg}\\alpha=\\frac{3}{4}$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "4",
          tresc: "Jedna z przyprostokątnych trójkąta prostokątnego ma długość $7$, a przeciwprostokątna ma długość $25$. Kąt ostry $\\alpha$ leży naprzeciw przyprostokątnej o długości $7$. Cosinus kąta $\\alpha$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{7}{25}$", "$\\frac{7}{24}$", "$\\frac{24}{7}$", "$\\frac{24}{25}$"],
          poprawna: 3,
        },
        {
          nr: "5",
          tresc: "Który z trójkątów prostokątnych ma kąt ostry, którego sinus jest równy $\\frac{4}{5}$? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "trójkąt o przyprostokątnych $6$ i $8$",
            "trójkąt o przyprostokątnych $4$ i $5$",
            "trójkąt o przyprostokątnej $4$ i przeciwprostokątnej $6$",
            "trójkąt o przyprostokątnych $5$ i $12$",
          ],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "W trójkącie prostokątnym $ABC$ kąt prosty jest przy wierzchołku $C$, $|AC| = 15$ i $|AB| = 17$. Oblicz $\\sin A$, $\\cos A$ i $\\operatorname{tg} A$. **Zapisz obliczenia.**",
          rozwiazanie: "Z twierdzenia Pitagorasa: $|BC|^2 = 17^2 - 15^2 = 289 - 225 = 64$, więc $|BC| = 8$.\n\nPrzyprostokątna $BC$ leży naprzeciw kąta $A$, a $AC$ jest do niego przyległa.\n\n$\\sin A = \\frac{|BC|}{|AB|} = \\frac{8}{17}$ oraz $\\cos A = \\frac{|AC|}{|AB|} = \\frac{15}{17}$.\n\n$\\operatorname{tg} A = \\frac{|BC|}{|AC|} = \\frac{8}{15}$.\n\nOdpowiedź: $\\sin A = \\frac{8}{17}$, $\\cos A = \\frac{15}{17}$, $\\operatorname{tg} A = \\frac{8}{15}$.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Podstawa trójkąta równoramiennego ma długość $10$, a ramię $13$. Kąt $\\alpha$ leży przy podstawie. Oblicz $\\sin\\alpha$, $\\cos\\alpha$ i $\\operatorname{tg}\\alpha$. **Zapisz obliczenia.**",
          rozwiazanie: "Wysokość poprowadzona do podstawy dzieli ją na dwie części po $5$ i tworzy trójkąt prostokątny o przeciwprostokątnej $13$ (ramię) i przyprostokątnej $5$.\n\nWysokość: $h = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12$.\n\nDla kąta $\\alpha$ przy podstawie przyprostokątna przeciwległa ma długość $12$, a przyległa $5$.\n\n$\\sin\\alpha = \\frac{12}{13}$, $\\cos\\alpha = \\frac{5}{13}$, $\\operatorname{tg}\\alpha = \\frac{12}{5}$.\n\nOdpowiedź: $\\sin\\alpha = \\frac{12}{13}$, $\\cos\\alpha = \\frac{5}{13}$, $\\operatorname{tg}\\alpha = \\frac{12}{5}$.",
        },
      ],
      generatory: [
        {
          id: "definicje-z-bokow",
          nazwa: "Funkcje z boków",
          opis: "Oblicz sinus, cosinus, tangens albo cotangens kąta w trójkącie prostokątnym, gdy znasz jego boki.",
          generuj(r) {
            for (;;) {
              const [p, s, c0] = r.pick(TROJKI);
              const k = r.int(1, 3);
              const [x, y] = r.chance() ? [p * k, s * k] : [s * k, p * k];   // x = |AC|, y = |BC|
              const c = c0 * k;
              const [A, B, C] = r.pick(NAZWY);
              const kat = r.pick([A, B]);
              const f = r.pick(["sin", "cos", "tg", "ctg"]);
              const [opp, adj] = kat === A ? [y, x] : [x, y];
              const w = wart(f, opp, adj, c);
              if (!ladna(w)) continue;
              const AC = `|${A}${C}|`, BC = `|${B}${C}|`, AB = `|${A}${B}|`;
              const nazwa = kat === A ? { opp: BC, adj: AC, hyp: AB } : { opp: AC, adj: BC, hyp: AB };
              const dlugosc = { opp, adj, hyp: c };
              const tryb = r.int(0, 2);
              let dane;
              let pitagoras = null;
              if (tryb === 0) {
                dane = r.shuffle([[AC, x], [BC, y], [AB, c]]);
              } else if (tryb === 1) {
                dane = [[AC, x], [BC, y]];
                pitagoras = `$${AB} = \\sqrt{${x}^2 + ${y}^2} = ${c}$.`;
              } else if (r.chance()) {
                dane = [[AC, x], [AB, c]];
                pitagoras = `$${BC} = \\sqrt{${c}^2 - ${x}^2} = ${y}$.`;
              } else {
                dane = [[BC, y], [AB, c]];
                pitagoras = `$${AC} = \\sqrt{${c}^2 - ${y}^2} = ${x}$.`;
              }
              const [num, den] = { sin: ["opp", "hyp"], cos: ["adj", "hyp"], tg: ["opp", "adj"], ctg: ["adj", "opp"] }[f];
              const ulamek = `\\frac{${dlugosc[num]}}{${dlugosc[den]}}`;
              const rownosc = ulamek === w.tex() ? "" : ` = ${w.tex()}`;
              const rozwiazanie = [`Przyprostokątna przeciwległa do kąta $\\alpha$ to $${nazwa.opp}$, przyległa to $${nazwa.adj}$, a przeciwprostokątna to $${nazwa.hyp}$.`];
              if (pitagoras) rozwiazanie.push(`Brakujący bok z twierdzenia Pitagorasa: ${pitagoras}`);
              rozwiazanie.push(`$${F[f]}\\alpha = \\frac{${nazwa[num]}}{${nazwa[den]}} = ${ulamek}${rownosc}$.`);
              return {
                tresc: `W trójkącie prostokątnym $${A}${B}${C}$ kąt prosty jest przy wierzchołku $${C}$. Wiadomo, że ${dane.map(([n, v]) => `$${n} = ${v}$`).join(", ")}. Oblicz $${F[f]}\\alpha$, gdzie $\\alpha$ jest kątem przy wierzchołku $${kat}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `$${F[f]}\\alpha =$` }],
                odpowiedz: { w },
                wynik: `$${F[f]}\\alpha = ${w.tex()}$`,
                rozwiazanie,
              };
            }
          },
        },
        {
          id: "definicje-bok-z-funkcji",
          nazwa: "Bok z funkcji",
          opis: "Znasz wartość funkcji kąta ostrego i jeden bok trójkąta prostokątnego – oblicz drugi bok.",
          generuj(r) {
            const SC = [[1, 2], [2, 3], [3, 4], [3, 5], [4, 5], [5, 6], [5, 13], [12, 13], [2, 5], [1, 3], [7, 25], [24, 25], [8, 17], [15, 17]];
            const TG = [[1, 2], [2, 3], [3, 4], [4, 3], [3, 2], [5, 2], [2, 1], [3, 1], [5, 12], [12, 5], [3, 5], [5, 3]];
            const f = r.pick(["sin", "cos", "tg"]);
            const licznikSzukany = r.chance();
            const [p, m] = r.pick(f === "tg" ? TG : SC);
            const k = r.int(2, 7);
            const [A, B, C] = r.pick(NAZWY);
            const nazwa = { opp: `|${B}${C}|`, adj: `|${A}${C}|`, hyp: `|${A}${B}|` };
            const [nl, nm] = f === "sin" ? ["opp", "hyp"] : f === "cos" ? ["adj", "hyp"] : ["opp", "adj"];
            const dany = licznikSzukany ? nm : nl;
            const szukany = licznikSzukany ? nl : nm;
            const vDany = (licznikSzukany ? m : p) * k;
            const vSzukany = (licznikSzukany ? p : m) * k;
            const w = q(p, m);
            const wspolczynnik = licznikSzukany ? w : q(m, p);
            const bokWPodst = (klucz) => (klucz === dany ? String(vDany) : nazwa[klucz]);
            return {
              tresc: `W trójkącie prostokątnym $${A}${B}${C}$ kąt prosty jest przy wierzchołku $${C}$, a kąt ostry $\\alpha$ przy wierzchołku $${A}$ spełnia warunek $${F[f]}\\alpha = ${w.tex()}$. Wiadomo, że $${nazwa[dany]} = ${vDany}$. Oblicz $${nazwa[szukany]}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: `$${nazwa[szukany]} =$` }],
              odpowiedz: { w: q(vSzukany) },
              wynik: `$${nazwa[szukany]} = ${vSzukany}$`,
              rozwiazanie: [
                `Z definicji: $${F[f]}\\alpha = \\frac{${nazwa[nl]}}{${nazwa[nm]}}$.`,
                `Podstawiamy dane: $${w.tex()} = \\frac{${bokWPodst(nl)}}{${bokWPodst(nm)}}$.`,
                `Stąd $${nazwa[szukany]} = ${vDany} \\cdot ${wspolczynnik.tex()} = ${vSzukany}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 8.2
    {
      id: "wartosci",
      nazwa: "Wartości funkcji dla kątów 30°, 45°, 60°",
      sciaga: [
        {
          nazwa: "Skąd te wartości",
          slownie: "Biorą się z dwóch trójkątów: połowy trójkąta równobocznego o boku $2$ (kąty $30^\\circ$, $60^\\circ$, boki $1$, $\\sqrt{3}$, $2$) i połowy kwadratu o boku $1$ (kąty $45^\\circ$, boki $1$, $1$, $\\sqrt{2}$).",
          litery: "W trójkącie $30^\\circ$–$60^\\circ$–$90^\\circ$ naprzeciw kąta $30^\\circ$ leży bok $1$, naprzeciw $60^\\circ$ bok $\\sqrt{3}$, naprzeciw $90^\\circ$ bok $2$.",
          przyklad: "Naprzeciw kąta $30^\\circ$ leży bok $1$, a przeciwprostokątna ma $2$, więc $\\sin 30^\\circ = \\frac{1}{2}$.",
        },
        {
          nazwa: "Sinus i cosinus",
          slownie: "Sinus rośnie razem z kątem: $\\frac{1}{2}$, $\\frac{\\sqrt{2}}{2}$, $\\frac{\\sqrt{3}}{2}$. Cosinus maleje – te same liczby w odwrotnej kolejności.",
          tex: "\\sin30^\\circ=\\frac{1}{2}\\qquad\\sin45^\\circ=\\frac{\\sqrt{2}}{2}\\qquad\\sin60^\\circ=\\frac{\\sqrt{3}}{2}\\qquad\\cos30^\\circ=\\frac{\\sqrt{3}}{2}\\qquad\\cos45^\\circ=\\frac{\\sqrt{2}}{2}\\qquad\\cos60^\\circ=\\frac{1}{2}",
          przyklad: "$2\\sin 30^\\circ + \\cos 60^\\circ = 2\\cdot\\frac{1}{2} + \\frac{1}{2} = \\frac{3}{2}$.",
          uwaga: "Sinus większego kąta ostrego jest większy, a cosinus – mniejszy. Pomocne jest $\\sin\\alpha = \\cos(90^\\circ - \\alpha)$.",
        },
        {
          nazwa: "Tangens i cotangens",
          slownie: "Tangens rośnie z kątem, cotangens maleje. Dla $45^\\circ$ obie wartości są równe $1$.",
          tex: "\\operatorname{tg}30^\\circ=\\frac{\\sqrt{3}}{3}\\qquad\\operatorname{tg}45^\\circ=1\\qquad\\operatorname{tg}60^\\circ=\\sqrt{3}\\qquad\\operatorname{ctg}30^\\circ=\\sqrt{3}\\qquad\\operatorname{ctg}45^\\circ=1\\qquad\\operatorname{ctg}60^\\circ=\\frac{\\sqrt{3}}{3}",
          przyklad: "$\\operatorname{tg}60^\\circ\\cdot\\operatorname{ctg}30^\\circ = \\sqrt{3}\\cdot\\sqrt{3} = 3$.",
          uwaga: "$\\operatorname{tg}30^\\circ = \\frac{\\sqrt{3}}{3}$ (czyli $\\frac{1}{\\sqrt{3}}$), a nie $\\frac{\\sqrt{3}}{2}$ – to jest sinus $60^\\circ$.",
        },
      ],
      jak: [
        "Wypisz ze ściągi wartości funkcji występujących w wyrażeniu i podstaw je.",
        "Kwadrat funkcji licz jako kwadrat całej wartości: $\\left(\\frac{\\sqrt{3}}{2}\\right)^2 = \\frac{3}{4}$.",
        "Wykonaj działania na ułamkach i pierwiastkach.",
        "Gdy szukasz kąta, znajdź w ściądze kąt o podanej wartości funkcji.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Wartość wyrażenia $2\\sin 30^\\circ + \\operatorname{tg} 45^\\circ$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$", "$\\frac{3}{2}$", "$1$", "$\\sqrt{3} + 1$"],
          poprawna: 0,
        },
        {
          nr: "9",
          tresc: "Wartość wyrażenia $\\sin^2 60^\\circ + \\cos^2 45^\\circ$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$", "$\\frac{\\sqrt{3} + \\sqrt{2}}{2}$", "$\\frac{5}{4}$", "$\\frac{3}{4}$"],
          poprawna: 2,
        },
        {
          nr: "10",
          tresc: "Kąt ostry $\\alpha$ spełnia warunek $\\cos\\alpha = \\frac{\\sqrt{3}}{2}$. Miara kąta $\\alpha$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$45^\\circ$", "$30^\\circ$", "$60^\\circ$", "$90^\\circ$"],
          poprawna: 1,
        },
        {
          nr: "11",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\sin 60^\\circ > \\sin 30^\\circ$", litery: "PF", poprawna: 0 },
            { tekst: "$\\operatorname{tg}45^\\circ = \\operatorname{ctg}45^\\circ$", litery: "PF", poprawna: 0 },
            { tekst: "$\\cos 30^\\circ = \\frac{1}{2}$", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "12",
          tresc: "W trójkącie prostokątnym jeden z kątów ostrych ma miarę $30^\\circ$, a przeciwprostokątna ma długość $10$. Przyprostokątna leżąca naprzeciw kąta $30^\\circ$ ma długość: **Wybierz właściwą odpowiedź.**",
          opcje: ["$5\\sqrt{3}$", "$10\\sqrt{3}$", "$\\frac{10\\sqrt{3}}{3}$", "$5$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Oblicz wartość wyrażenia $\\frac{\\operatorname{tg}60^\\circ - \\operatorname{ctg}60^\\circ}{\\sin 30^\\circ}$. **Zapisz obliczenia.**",
          rozwiazanie: "Podstawiamy wartości: $\\operatorname{tg}60^\\circ = \\sqrt{3}$, $\\operatorname{ctg}60^\\circ = \\frac{\\sqrt{3}}{3}$, $\\sin 30^\\circ = \\frac{1}{2}$.\n\nLicznik: $\\sqrt{3} - \\frac{\\sqrt{3}}{3} = \\frac{3\\sqrt{3}}{3} - \\frac{\\sqrt{3}}{3} = \\frac{2\\sqrt{3}}{3}$.\n\nDzielenie przez $\\frac{1}{2}$ to mnożenie przez $2$: $\\frac{2\\sqrt{3}}{3}\\cdot 2 = \\frac{4\\sqrt{3}}{3}$.\n\nOdpowiedź: $\\frac{4\\sqrt{3}}{3}$.",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "Trójkąt równoboczny ma bok długości $2$. Poprowadź w nim wysokość i na tej podstawie wyznacz $\\sin 60^\\circ$, $\\cos 60^\\circ$ i $\\operatorname{tg} 60^\\circ$. **Zapisz obliczenia.**",
          rozwiazanie: "Wysokość dzieli trójkąt równoboczny na dwa trójkąty prostokątne o kątach $30^\\circ$, $60^\\circ$, $90^\\circ$. Ich przeciwprostokątna ma długość $2$, a krótsza przyprostokątna $1$ (połowa boku).\n\nDłuższa przyprostokątna to wysokość: $h = \\sqrt{2^2 - 1^2} = \\sqrt{3}$.\n\nKąt $60^\\circ$ leży naprzeciw boku $\\sqrt{3}$, a przyległa do niego jest przyprostokątna $1$.\n\n$\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}$, $\\cos 60^\\circ = \\frac{1}{2}$, $\\operatorname{tg} 60^\\circ = \\frac{\\sqrt{3}}{1} = \\sqrt{3}$.\n\nOdpowiedź: $\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}$, $\\cos 60^\\circ = \\frac{1}{2}$, $\\operatorname{tg} 60^\\circ = \\sqrt{3}$.",
        },
      ],
      generatory: [
        {
          id: "wartosci-wyrazenie",
          nazwa: "Wartość wyrażenia",
          opis: "Oblicz wartość wyrażenia z funkcjami kątów 30°, 45°, 60° o wyniku wymiernym.",
          generuj(r) {
            // t – zapis, p – podstawienie z wartością, v – wartość, prost – czy może mieć współczynnik
            const T = [
              { t: "\\sin 30^\\circ", p: "\\frac{1}{2}", v: q(1, 2), prost: true },
              { t: "\\cos 60^\\circ", p: "\\frac{1}{2}", v: q(1, 2), prost: true },
              { t: "\\operatorname{tg}45^\\circ", p: "1", v: q(1), prost: true },
              { t: "\\operatorname{ctg}45^\\circ", p: "1", v: q(1), prost: true },
              { t: "\\sin^2 45^\\circ", p: "\\left(\\frac{\\sqrt{2}}{2}\\right)^2 = \\frac{1}{2}", v: q(1, 2), prost: true },
              { t: "\\cos^2 45^\\circ", p: "\\left(\\frac{\\sqrt{2}}{2}\\right)^2 = \\frac{1}{2}", v: q(1, 2), prost: true },
              { t: "\\sin^2 60^\\circ", p: "\\left(\\frac{\\sqrt{3}}{2}\\right)^2 = \\frac{3}{4}", v: q(3, 4), prost: true },
              { t: "\\cos^2 30^\\circ", p: "\\left(\\frac{\\sqrt{3}}{2}\\right)^2 = \\frac{3}{4}", v: q(3, 4), prost: true },
              { t: "\\sin^2 30^\\circ", p: "\\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4}", v: q(1, 4), prost: true },
              { t: "\\cos^2 60^\\circ", p: "\\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4}", v: q(1, 4), prost: true },
              { t: "\\operatorname{tg}^2 30^\\circ", p: "\\left(\\frac{\\sqrt{3}}{3}\\right)^2 = \\frac{1}{3}", v: q(1, 3), prost: true },
              { t: "\\operatorname{ctg}^2 60^\\circ", p: "\\left(\\frac{\\sqrt{3}}{3}\\right)^2 = \\frac{1}{3}", v: q(1, 3), prost: true },
              { t: "\\operatorname{tg}^2 60^\\circ", p: "\\left(\\sqrt{3}\\right)^2 = 3", v: q(3), prost: true },
              { t: "\\operatorname{tg}30^\\circ\\cdot\\operatorname{tg}60^\\circ", p: "\\frac{\\sqrt{3}}{3}\\cdot\\sqrt{3} = 1", v: q(1), prost: false },
              { t: "\\sin 60^\\circ\\cdot\\cos 30^\\circ", p: "\\frac{\\sqrt{3}}{2}\\cdot\\frac{\\sqrt{3}}{2} = \\frac{3}{4}", v: q(3, 4), prost: false },
              { t: "\\sin 45^\\circ\\cdot\\cos 45^\\circ", p: "\\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{2}}{2} = \\frac{1}{2}", v: q(1, 2), prost: false },
              { t: "\\operatorname{tg}60^\\circ\\cdot\\operatorname{ctg}30^\\circ", p: "\\sqrt{3}\\cdot\\sqrt{3} = 3", v: q(3), prost: false },
            ];
            for (;;) {
              let t1 = r.pick(T), t2 = r.pick(T);
              if (t1 === t2) continue;
              let m1 = t1.prost ? r.int(1, 4) : 1, m2 = t2.prost ? r.int(1, 4) : 1;
              let plus = r.chance();
              let wynik = plus ? t1.v.mul(m1).add(t2.v.mul(m2)) : t1.v.mul(m1).sub(t2.v.mul(m2));
              if (wynik.zero) continue;
              if (wynik.ujemna) {   // przy odejmowaniu zamieniamy składniki, żeby wynik był dodatni
                [t1, t2] = [t2, t1];
                [m1, m2] = [m2, m1];
                wynik = wynik.neg();
              }
              if (!ladna(wynik)) continue;
              const znak = plus ? "+" : "-";
              const zapis = `${wsp(m1)}${t1.t} ${znak} ${wsp(m2)}${t2.t}`;
              const lic = (m, v) => (m === 1 ? v.tex() : `${m}\\cdot ${v.tex()}`);
              return {
                tresc: `Oblicz wartość wyrażenia $${zapis}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                odpowiedz: { w: wynik },
                wynik: `$${wynik.tex()}$`,
                rozwiazanie: [
                  `Wartości ze ściągi: $${t1.t} = ${t1.p}$ oraz $${t2.t} = ${t2.p}$.`,
                  `Podstawiamy: $${lic(m1, t1.v)} ${znak} ${lic(m2, t2.v)}$.`,
                  `Po wykonaniu działań: $${wynik.tex()}$.`,
                ],
              };
            }
          },
        },
        {
          id: "wartosci-jaki-kat",
          nazwa: "Jaki to kąt",
          opis: "Z wartości funkcji odczytaj miarę kąta ostrego (30°, 45° albo 60°) lub kąta dopełniającego.",
          generuj(r) {
            const kat = r.pick([30, 45, 60]);
            const f = r.pick(["sin", "cos", "tg", "ctg"]);
            const lit = r.pick(["\\alpha", "\\beta", "\\varphi"]);
            const dopelniajacy = r.chance();
            const szukany = dopelniajacy ? 90 - kat : kat;
            const rozwiazanie = [`Ze ściągi: $${F[f]} ${kat}^\\circ = ${WART[kat][f]}$, więc $${lit} = ${kat}^\\circ$.`];
            if (dopelniajacy) rozwiazanie.push(`Zatem $90^\\circ - ${lit} = 90^\\circ - ${kat}^\\circ = ${szukany}^\\circ$.`);
            return {
              tresc: `Kąt ostry $${lit}$ spełnia warunek $${F[f]}${lit} = ${WART[kat][f]}$. Ile mierzy ${dopelniajacy ? `kąt $90^\\circ - ${lit}$` : `kąt $${lit}$`}?`,
              pola: [{ id: "k", typ: "wybor", etykieta: "Miara kąta", opcje: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$"] }],
              odpowiedz: { k: [30, 45, 60].indexOf(szukany) },
              wynik: `$${szukany}^\\circ$`,
              rozwiazanie,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 8.3
    {
      id: "zaleznosci",
      nazwa: "Zależności między funkcjami tego samego kąta",
      sciaga: [
        {
          nazwa: "Jedynka trygonometryczna",
          slownie: "Suma kwadratów sinusa i cosinusa tego samego kąta ostrego jest równa $1$. Wynika to z twierdzenia Pitagorasa: $\\frac{a^2}{c^2} + \\frac{b^2}{c^2} = \\frac{a^2 + b^2}{c^2} = 1$.",
          tex: "\\sin^2\\alpha+\\cos^2\\alpha=1",
          litery: "$\\sin^2\\alpha$ to $(\\sin\\alpha)^2$.",
          przyklad: "Jeśli $\\sin\\alpha = \\frac{3}{5}$, to $\\cos^2\\alpha = 1 - \\frac{9}{25} = \\frac{16}{25}$, więc $\\cos\\alpha = \\frac{4}{5}$.",
          uwaga: "Kąt jest ostry, więc z pierwiastka bierzemy tylko wartość dodatnią.",
        },
        {
          nazwa: "Tangens i cotangens",
          slownie: "Tangens to iloraz sinusa przez cosinus tego samego kąta, a cotangens jest jego odwrotnością, więc iloczyn tangensa i cotangensa jest równy $1$.",
          tex: "\\operatorname{tg}\\alpha=\\frac{\\sin\\alpha}{\\cos\\alpha}\\qquad\\operatorname{tg}\\alpha\\cdot\\operatorname{ctg}\\alpha=1",
          przyklad: "Dla $\\sin\\alpha = \\frac{3}{5}$ i $\\cos\\alpha = \\frac{4}{5}$: $\\operatorname{tg}\\alpha = \\frac{3}{5} : \\frac{4}{5} = \\frac{3}{4}$, a $\\operatorname{ctg}\\alpha = \\frac{4}{3}$.",
        },
        {
          nazwa: "Kąty dopełniające",
          slownie: "Kąty ostre trójkąta prostokątnego sumują się do $90^\\circ$, a przyprostokątna przeciwległa do jednego z nich jest przyległa do drugiego. Dlatego sinus jednego kąta to cosinus drugiego.",
          tex: "\\sin\\alpha=\\cos(90^\\circ-\\alpha)\\qquad\\cos\\alpha=\\sin(90^\\circ-\\alpha)\\qquad\\operatorname{tg}\\alpha=\\operatorname{ctg}(90^\\circ-\\alpha)",
          przyklad: "$\\sin 25^\\circ = \\cos 65^\\circ$ oraz $\\operatorname{tg} 35^\\circ = \\operatorname{ctg} 55^\\circ$.",
          uwaga: "Wzór działa tylko dla kątów dających razem $90^\\circ$. Na przykład $\\sin 40^\\circ \\neq \\cos 40^\\circ$.",
        },
        {
          nazwa: "Pozostałe funkcje z jednej",
          slownie: "Znając jedną funkcję kąta ostrego, zapisz ją jako stosunek boków trójkąta prostokątnego, dopisz trzeci bok z twierdzenia Pitagorasa i odczytaj pozostałe funkcje z definicji.",
          przyklad: "Dla $\\operatorname{tg}\\alpha = 2 = \\frac{2}{1}$ przyjmij $a = 2$, $b = 1$. Wtedy $c = \\sqrt{5}$, więc $\\sin\\alpha = \\frac{2}{\\sqrt{5}} = \\frac{2\\sqrt{5}}{5}$ i $\\cos\\alpha = \\frac{\\sqrt{5}}{5}$.",
          uwaga: "Boki trójkąta nie muszą być równe liczbom z zadania – ważny jest tylko ich stosunek.",
        },
      ],
      jak: [
        "Zapisz daną wartość jako ułamek i wybierz boki trójkąta o takim stosunku (np. $\\sin\\alpha = \\frac{3}{5}$: $a = 3$, $c = 5$).",
        "Oblicz brakujący bok z twierdzenia Pitagorasa (albo użyj wzoru $\\sin^2\\alpha + \\cos^2\\alpha = 1$).",
        "Odczytaj szukane funkcje z definicji.",
        "Dla wyrażeń z $\\sin\\alpha$ i $\\cos\\alpha$ spróbuj podzielić licznik i mianownik przez $\\cos\\alpha$ – dostaniesz $\\operatorname{tg}\\alpha$.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Kąt ostry $\\alpha$ spełnia warunek $\\sin\\alpha = \\frac{5}{13}$. Wtedy $\\cos\\alpha$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{5}{12}$", "$\\frac{8}{13}$", "$\\frac{12}{13}$", "$\\frac{13}{12}$"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "Kąt ostry $\\alpha$ spełnia warunek $\\sin\\alpha = 0{,}6$. Wtedy $\\operatorname{tg}\\alpha$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{4}{3}$", "$\\frac{3}{4}$", "$\\frac{3}{5}$", "$0{,}4$"],
          poprawna: 1,
        },
        {
          nr: "17",
          tresc: "Liczba $\\sin 25^\\circ$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\cos 25^\\circ$", "$\\operatorname{tg} 65^\\circ$", "$\\cos 75^\\circ$", "$\\cos 65^\\circ$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\sin 50^\\circ + \\cos 50^\\circ = 1$", litery: "PF", poprawna: 1 },
            { tekst: "$\\operatorname{tg}10^\\circ \\cdot \\operatorname{ctg}10^\\circ = 1$", litery: "PF", poprawna: 0 },
            { tekst: "$\\sin 40^\\circ = \\cos 50^\\circ$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "19",
          tresc: "Wartość wyrażenia $\\sin^2 20^\\circ + \\cos^2 20^\\circ + \\operatorname{tg}20^\\circ \\cdot \\operatorname{ctg}20^\\circ$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$", "$1$", "$0$", "$\\operatorname{tg}40^\\circ$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 3,
          tresc: "Kąt ostry $\\alpha$ spełnia warunek $\\sin\\alpha = \\frac{8}{17}$. Oblicz $\\cos\\alpha$, $\\operatorname{tg}\\alpha$ i $\\operatorname{ctg}\\alpha$. **Zapisz obliczenia.**",
          rozwiazanie: "Z jedynki trygonometrycznej: $\\cos^2\\alpha = 1 - \\sin^2\\alpha = 1 - \\frac{64}{289} = \\frac{225}{289}$.\n\nKąt $\\alpha$ jest ostry, więc $\\cos\\alpha > 0$ i $\\cos\\alpha = \\frac{15}{17}$.\n\n$\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\frac{8}{17} : \\frac{15}{17} = \\frac{8}{15}$.\n\n$\\operatorname{ctg}\\alpha = \\frac{1}{\\operatorname{tg}\\alpha} = \\frac{15}{8}$.\n\nOdpowiedź: $\\cos\\alpha = \\frac{15}{17}$, $\\operatorname{tg}\\alpha = \\frac{8}{15}$, $\\operatorname{ctg}\\alpha = \\frac{15}{8}$.",
        },
        {
          nr: "21",
          punkty: 2,
          tresc: "Kąt ostry $\\alpha$ spełnia równość $\\sin\\alpha = 2\\cos\\alpha$. Oblicz wartość wyrażenia $\\frac{3\\sin\\alpha + \\cos\\alpha}{\\sin\\alpha - \\cos\\alpha}$. **Zapisz obliczenia.**",
          rozwiazanie: "Kąt jest ostry, więc $\\cos\\alpha \\neq 0$. Dzielimy równość $\\sin\\alpha = 2\\cos\\alpha$ przez $\\cos\\alpha$ i dostajemy $\\operatorname{tg}\\alpha = 2$.\n\nDzielimy licznik i mianownik wyrażenia przez $\\cos\\alpha$: $\\frac{3\\operatorname{tg}\\alpha + 1}{\\operatorname{tg}\\alpha - 1}$.\n\nPodstawiamy $\\operatorname{tg}\\alpha = 2$: $\\frac{3\\cdot 2 + 1}{2 - 1} = \\frac{7}{1} = 7$.\n\nOdpowiedź: $7$.",
        },
      ],
      generatory: [
        {
          id: "zaleznosci-pozostale",
          nazwa: "Druga funkcja z pierwszej",
          opis: "Znasz wartość jednej funkcji kąta ostrego – oblicz inną funkcję tego samego kąta.",
          generuj(r) {
            const d = dwieFunkcje(r);
            return {
              tresc: `Kąt ostry $\\alpha$ spełnia warunek $${F[d.f1]}\\alpha = ${d.w1.tex()}$. Oblicz $${F[d.f2]}\\alpha$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: `$${F[d.f2]}\\alpha =$` }],
              odpowiedz: { w: d.w2 },
              wynik: `$${F[d.f2]}\\alpha = ${d.w2.tex()}$`,
              rozwiazanie: krokiTrojkat(d),
            };
          },
        },
        {
          id: "zaleznosci-dopelnienie",
          nazwa: "Funkcja kąta dopełniającego",
          opis: "Znasz funkcję kąta ostrego α – oblicz funkcję kąta 90° − α.",
          generuj(r) {
            const d = dwieFunkcje(r);
            const g = DOPELNIENIE[d.f2];   // g(90° − α) = f2(α)
            return {
              tresc: `Kąt ostry $\\alpha$ spełnia warunek $${F[d.f1]}\\alpha = ${d.w1.tex()}$. Oblicz $${F[g]}(90^\\circ - \\alpha)$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: `$${F[g]}(90^\\circ - \\alpha) =$` }],
              odpowiedz: { w: d.w2 },
              wynik: `$${F[g]}(90^\\circ - \\alpha) = ${d.w2.tex()}$`,
              rozwiazanie: [`Kąty $\\alpha$ i $90^\\circ - \\alpha$ są dopełniające, więc $${F[g]}(90^\\circ - \\alpha) = ${F[d.f2]}\\alpha$.`, ...krokiTrojkat(d)],
            };
          },
        },
        {
          id: "zaleznosci-wyrazenie-tg",
          nazwa: "Wyrażenie z tangensa",
          opis: "Znasz tg α – oblicz wartość ułamka z sin α i cos α, dzieląc licznik i mianownik przez cos α.",
          generuj(r) {
            for (;;) {
              const t = q(r.int(1, 5), r.int(1, 3));
              const a = r.int(1, 4), b = r.int(1, 4), c = r.int(1, 4), d = r.int(1, 4);
              const minus = r.chance(0.4);
              const mianownik = t.mul(c).add(minus ? -d : d);
              if (mianownik.zero) continue;
              const wynik = t.mul(a).add(b).div(mianownik);
              if (!ladna(wynik)) continue;
              const znak = minus ? "-" : "+";
              const dana = t.calkowita && r.chance() ? `\\sin\\alpha = ${wsp(t.n)}\\cos\\alpha` : `\\operatorname{tg}\\alpha = ${t.tex()}`;
              const wyrazenie = `\\frac{${wsp(a)}\\sin\\alpha + ${wsp(b)}\\cos\\alpha}{${wsp(c)}\\sin\\alpha ${znak} ${wsp(d)}\\cos\\alpha}`;
              const rozwiazanie = [];
              if (dana.startsWith("\\sin")) rozwiazanie.push(`Dzielimy równość przez $\\cos\\alpha$ (kąt ostry, więc $\\cos\\alpha \\neq 0$): $\\operatorname{tg}\\alpha = ${t.tex()}$.`);
              rozwiazanie.push(
                `Dzielimy licznik i mianownik przez $\\cos\\alpha$: $\\frac{${wsp(a)}\\operatorname{tg}\\alpha + ${b}}{${wsp(c)}\\operatorname{tg}\\alpha ${znak} ${d}}$.`,
                `Podstawiamy $\\operatorname{tg}\\alpha = ${t.tex()}$: $\\frac{${a === 1 ? "" : `${a}\\cdot `}${t.tex()} + ${b}}{${c === 1 ? "" : `${c}\\cdot `}${t.tex()} ${znak} ${d}}$.`,
                `Wynik: $${wynik.tex()}$.`,
              );
              return {
                tresc: `Kąt ostry $\\alpha$ spełnia warunek $${dana}$. Oblicz wartość wyrażenia $${wyrazenie}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                odpowiedz: { w: wynik },
                wynik: `$${wynik.tex()}$`,
                rozwiazanie,
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ rozwiązywanie trójkątów prostokątnych (dodane do podstawy w 2024)
    {
      id: "rozwiazywanie",
      nazwa: "Rozwiązywanie trójkątów prostokątnych",
      sciaga: [
        {
          nazwa: "Co znaczy rozwiązać trójkąt",
          slownie: "Rozwiązać trójkąt prostokątny to znaleźć wszystkie jego boki i kąty, gdy znamy bok i jeszcze jedną daną: drugi bok albo kąt ostry.",
          tex: "\\alpha+\\beta=90^\\circ\\qquad a^2+b^2=c^2",
          litery: "$\\alpha$, $\\beta$ – kąty ostre, $a$, $b$ – przyprostokątne, $c$ – przeciwprostokątna.",
          przyklad: "Gdy jeden kąt ostry ma $35^\\circ$, drugi ma $90^\\circ - 35^\\circ = 55^\\circ$.",
        },
        {
          nazwa: "Bok z kąta i boku",
          slownie: "Wybierz funkcję, w której występują dwa boki: ten, który znasz, i ten, którego szukasz. Z jej definicji wyznacz szukany bok.",
          tex: "a=c\\sin\\alpha\\qquad b=c\\cos\\alpha\\qquad a=b\\operatorname{tg}\\alpha",
          litery: "$a$ – przyprostokątna przeciwległa do $\\alpha$, $b$ – przyległa, $c$ – przeciwprostokątna.",
          przyklad: "Dla $c = 12$ i $\\alpha = 30^\\circ$: $a = 12\\cdot\\sin 30^\\circ = 6$, $b = 12\\cdot\\cos 30^\\circ = 6\\sqrt{3}$.",
          uwaga: "Jeśli szukasz przeciwprostokątnej, dzielisz: $c = \\frac{a}{\\sin\\alpha}$, a nie mnożysz.",
        },
        {
          nazwa: "Kąt z dwóch boków",
          slownie: "Gdy znasz dwa boki, policz stosunek z definicji jednej funkcji. Kąt odczytaj ze ściągi (dla $30^\\circ$, $45^\\circ$ i $60^\\circ$).",
          tex: "\\operatorname{tg}\\alpha=\\frac{a}{b}",
          przyklad: "Dla $a = 4\\sqrt{3}$ i $b = 4$: $\\operatorname{tg}\\alpha = \\sqrt{3}$, więc $\\alpha = 60^\\circ$, a drugi kąt ma $30^\\circ$.",
          uwaga: "Z samej wartości funkcji kąt odczytasz tylko dla $30^\\circ$, $45^\\circ$ i $60^\\circ$.",
        },
        {
          nazwa: "Zadania z życia",
          slownie: "Wysokość, długość cienia, rampa, drabina – to często trójkąt prostokątny. Narysuj go, zaznacz kąt prosty (np. pion i poziom) oraz dane i szukane.",
          przyklad: "Drabina o długości $4$ m tworzy z podłożem kąt $60^\\circ$, więc sięga na wysokość $4\\cdot\\sin 60^\\circ = 2\\sqrt{3}$ m.",
          uwaga: "Kąt nachylenia mierzymy od poziomu, a nie od pionu.",
        },
      ],
      jak: [
        "Narysuj trójkąt prostokątny, zaznacz kąt prosty, dane i szukane.",
        "Nazwij boki względem kąta $\\alpha$: przeciwległy, przyległy, przeciwprostokątna.",
        "Wybierz funkcję zawierającą bok znany i bok szukany, zapisz jej definicję i podstaw dane.",
        "Wyznacz szukaną wielkość i sprawdź, czy wynik ma sens (przeciwprostokątna jest najdłuższa).",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "W trójkącie prostokątnym kąt ostry ma miarę $60^\\circ$, a przyprostokątna przyległa do tego kąta ma długość $7$. Przeciwprostokątna ma długość: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{7}{2}$", "$7\\sqrt{3}$", "$14$", "$\\frac{14\\sqrt{3}}{3}$"],
          poprawna: 2,
        },
        {
          nr: "23",
          tresc: "Drabina o długości $6$ m jest oparta o pionową ścianę i tworzy z poziomym podłożem kąt $45^\\circ$. Górny koniec drabiny znajduje się na wysokości: **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$ m", "$3\\sqrt{3}$ m", "$6\\sqrt{2}$ m", "$3\\sqrt{2}$ m"],
          poprawna: 3,
        },
        {
          nr: "24",
          tresc: "Przyprostokątne trójkąta prostokątnego mają długości $5$ i $5\\sqrt{3}$. Kąt ostry leżący naprzeciw krótszej przyprostokątnej ma miarę: **Wybierz właściwą odpowiedź.**",
          opcje: ["$60^\\circ$", "$30^\\circ$", "$45^\\circ$", "$15^\\circ$"],
          poprawna: 1,
        },
        {
          nr: "25",
          tresc: "W trójkącie prostokątnym $ABC$ kąt prosty jest przy wierzchołku $C$, $|AB| = 20$ i $\\angle A = 30^\\circ$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$|BC| = 10$", litery: "PF", poprawna: 0 },
            { tekst: "$\\angle B = 60^\\circ$", litery: "PF", poprawna: 0 },
            { tekst: "$|AC| = 10$", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "26",
          tresc: "Rampa o długości $12$ m jest nachylona do poziomu pod kątem $30^\\circ$. Jej wyższy koniec znajduje się na wysokości: **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$ m", "$6\\sqrt{3}$ m", "$4\\sqrt{3}$ m", "$12\\sqrt{3}$ m"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 3,
          tresc: "W trójkącie prostokątnym przeciwprostokątna ma długość $12$, a jeden z kątów ostrych ma miarę $60^\\circ$. Oblicz pole tego trójkąta. **Zapisz obliczenia.**",
          rozwiazanie: "Przyprostokątna przyległa do kąta $60^\\circ$: $b = 12\\cdot\\cos 60^\\circ = 12\\cdot\\frac{1}{2} = 6$.\n\nPrzyprostokątna przeciwległa do kąta $60^\\circ$: $a = 12\\cdot\\sin 60^\\circ = 12\\cdot\\frac{\\sqrt{3}}{2} = 6\\sqrt{3}$.\n\nPole: $P = \\frac{1}{2}\\cdot a\\cdot b = \\frac{1}{2}\\cdot 6\\sqrt{3}\\cdot 6 = 18\\sqrt{3}$.\n\nOdpowiedź: $18\\sqrt{3}$.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "W trójkącie prostokątnym $ABC$ kąt prosty jest przy wierzchołku $C$, $|AC| = 8$ i $|BC| = 8\\sqrt{3}$. Rozwiąż ten trójkąt: oblicz miary kątów ostrych i długość przeciwprostokątnej. **Zapisz obliczenia.**",
          rozwiazanie: "Przyprostokątna $BC$ leży naprzeciw kąta $A$, więc $\\operatorname{tg} A = \\frac{|BC|}{|AC|} = \\frac{8\\sqrt{3}}{8} = \\sqrt{3}$.\n\nZe ściągi:$\\operatorname{tg} 60^\\circ = \\sqrt{3}$, więc $\\angle A = 60^\\circ$ i $\\angle B = 90^\\circ - 60^\\circ = 30^\\circ$.\n\nPrzeciwprostokątna z twierdzenia Pitagorasa: $|AB| = \\sqrt{8^2 + (8\\sqrt{3})^2} = \\sqrt{64 + 192} = \\sqrt{256} = 16$.\n\nOdpowiedź: $\\angle A = 60^\\circ$, $\\angle B = 30^\\circ$, $|AB| = 16$.",
        },
      ],
      generatory: [
        {
          id: "rozwiazywanie-bok",
          nazwa: "Bok z kąta",
          opis: "Trójkąt prostokątny z kątem 30°, 45° albo 60° i jednym bokiem – oblicz inny bok.",
          generuj(r) {
            const kat = r.pick([30, 45, 60]);
            const [dan, szuk] = r.pick([["hyp", "opp"], ["hyp", "adj"], ["adj", "opp"], ["opp", "adj"], ["opp", "hyp"], ["adj", "hyp"]]);
            const m = r.int(2, 9);
            const [P1, P2, P3] = r.pick(NAZWY);
            const nazwa = { opp: `|${P2}${P3}|`, adj: `|${P1}${P3}|`, hyp: `|${P1}${P2}|` };
            const jd = BOKI[kat][dan], js = BOKI[kat][szuk];
            const dlD = dlug(m * jd[0], jd[1]);
            const dlS = dlug(m * js[0], js[1]);
            const pary = [dan, szuk].sort().join("-");
            const [fn, num, den] = pary === "hyp-opp" ? ["sin", "opp", "hyp"] : pary === "adj-hyp" ? ["cos", "adj", "hyp"] : ["tg", "opp", "adj"];
            const wymierny = js[1] === 1;
            const wspolczynnik = m * js[0];
            return {
              tresc: `W trójkącie prostokątnym $${P1}${P2}${P3}$ kąt prosty jest przy wierzchołku $${P3}$, a kąt przy wierzchołku $${P1}$ ma miarę $${kat}^\\circ$. Wiadomo, że $${nazwa[dan]} = ${dlD}$. Oblicz $${nazwa[szuk]}$.${wymierny ? "" : ` Wynik zapisz w postaci $k\\sqrt{${js[1]}}$.`}`,
              pola: [{ id: "w", typ: "liczba", etykieta: wymierny ? `$${nazwa[szuk]} =$` : `$${nazwa[szuk]} = k\\sqrt{${js[1]}}$, gdzie $k =$` }],
              odpowiedz: { w: q(wspolczynnik) },
              wynik: `$${nazwa[szuk]} = ${dlS}$`,
              rozwiazanie: [
                `Szukany i dany bok występują w definicji funkcji: $${F[fn]} ${kat}^\\circ = \\frac{${nazwa[num]}}{${nazwa[den]}}$.`,
                `Wartość funkcji ze ściągi i dane: $${WART[kat][fn]} = \\frac{${num === dan ? dlD : nazwa[num]}}{${den === dan ? dlD : nazwa[den]}}$.`,
                `Stąd $${nazwa[szuk]} = ${dlS}$.`,
              ],
            };
          },
        },
        {
          id: "rozwiazywanie-kat",
          nazwa: "Kąt z boków",
          opis: "Z dwóch boków trójkąta prostokątnego odczytaj kąt ostry (30°, 45° albo 60°).",
          generuj(r) {
            const kat = r.pick([30, 45, 60]);
            const [d1, d2] = r.pick([["opp", "adj"], ["opp", "hyp"], ["adj", "hyp"]]);
            const m = r.int(2, 9);
            const [A, B, C] = r.pick(NAZWY);
            const nazwa = { opp: `|${B}${C}|`, adj: `|${A}${C}|`, hyp: `|${A}${B}|` };
            const dl = (k) => dlug(m * BOKI[kat][k][0], BOKI[kat][k][1]);
            const pary = `${d1}-${d2}`;
            const fn = pary === "opp-adj" ? "tg" : pary === "opp-hyp" ? "sin" : "cos";
            const przyB = r.chance();
            const wynik = przyB ? 90 - kat : kat;
            const rozwiazanie = [
              `Oznaczmy przez $\\alpha$ kąt przy wierzchołku $${A}$. Przyprostokątna przeciwległa do $\\alpha$ to $${nazwa.opp}$, przyległa to $${nazwa.adj}$, a przeciwprostokątna to $${nazwa.hyp}$.`,
              `$${F[fn]}\\alpha = \\frac{${nazwa[d1]}}{${nazwa[d2]}} = \\frac{${dl(d1)}}{${dl(d2)}} = ${WART[kat][fn]}$.`,
              `Ze ściągi: $${F[fn]} ${kat}^\\circ = ${WART[kat][fn]}$, więc $\\alpha = ${kat}^\\circ$.`,
            ];
            if (przyB) rozwiazanie.push(`Kąt przy wierzchołku $${B}$ ma $90^\\circ - ${kat}^\\circ = ${wynik}^\\circ$.`);
            return {
              tresc: `W trójkącie prostokątnym $${A}${B}${C}$ kąt prosty jest przy wierzchołku $${C}$. Wiadomo, że $${nazwa[d1]} = ${dl(d1)}$ i $${nazwa[d2]} = ${dl(d2)}$. Ile mierzy kąt przy wierzchołku $${przyB ? B : A}$?`,
              pola: [{ id: "k", typ: "wybor", etykieta: "Miara kąta", opcje: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$"] }],
              odpowiedz: { k: [30, 45, 60].indexOf(wynik) },
              wynik: `$${wynik}^\\circ$`,
              rozwiazanie,
            };
          },
        },
      ],
    },
  ],
};
