// Klasa 2 (liceum i technikum) · rozdział 5 „Trygonometria” – Matematyka 2, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

const F = { sin: "\\sin", cos: "\\cos", tg: "\\operatorname{tg}", ctg: "\\operatorname{ctg}" };
const FUN = ["sin", "cos", "tg", "ctg"];

/** Wartość funkcji kąta, którego przyprostokątna przeciwległa to a, przyległa b, a przeciwprostokątna c. */
const wart = (f, a, b, c) => (f === "sin" ? q(a, c) : f === "cos" ? q(b, c) : f === "tg" ? q(a, b) : q(b, a));

/** „Ładna” odpowiedź: mianownik co najwyżej 12. */
const ladna = (v) => Math.abs(v.n) <= 100000 && v.d <= 12;

/** Trójki pitagorejskie (a, b, c) w najprostszej postaci. */
const TROJKI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]];

/** Nazwy wierzchołków: kąt prosty jest przy trzecim. */
const NAZWY = [["A", "B", "C"], ["K", "L", "M"], ["P", "Q", "R"]];

/** Współczynnik przed funkcją: 1 się pomija. */
const wsp = (n) => (n === 1 ? "" : String(n));

/** Liczba w nawiasie, gdy jest ujemna lub ułamkiem w potędze. */
const nawias = (v) => (v.ujemna ? `\\left(${v.tex()}\\right)` : v.tex());

/** Wartości funkcji kątów 30°, 45°, 60° w LaTeX. */
const WART = {
  30: { sin: "\\frac{1}{2}", cos: "\\frac{\\sqrt{3}}{2}", tg: "\\frac{\\sqrt{3}}{3}", ctg: "\\sqrt{3}" },
  45: { sin: "\\frac{\\sqrt{2}}{2}", cos: "\\frac{\\sqrt{2}}{2}", tg: "1", ctg: "1" },
  60: { sin: "\\frac{\\sqrt{3}}{2}", cos: "\\frac{1}{2}", tg: "\\sqrt{3}", ctg: "\\frac{\\sqrt{3}}{3}" },
};
/** Te same wartości, gdy są wymierne (inaczej null), oraz ich kwadraty. */
const WQ = {
  30: { sin: q(1, 2), cos: null, tg: null, ctg: null },
  45: { sin: null, cos: null, tg: q(1), ctg: q(1) },
  60: { sin: null, cos: q(1, 2), tg: null, ctg: null },
};
const WQ2 = {
  30: { sin: q(1, 4), cos: q(3, 4), tg: q(1, 3), ctg: q(3) },
  45: { sin: q(1, 2), cos: q(1, 2), tg: q(1), ctg: q(1) },
  60: { sin: q(3, 4), cos: q(1, 4), tg: q(3), ctg: q(1, 3) },
};

const KW = ["I", "II", "III", "IV"];

/** Dopisek na początku treści zadań spoza podstawy programowej (kąty powyżej 180°, cotangens, wzory dla 180° + α i 360° − α). */
const POZA = "(poza wymaganiami matury podstawowej)";
/** Treść zadania z dopiskiem POZA na początku, gdy `poza` jest prawdą. */
const zPoza = (poza, tresc) => (poza ? `${POZA} ${tresc}` : tresc);

/** Wartości funkcji dla 30°, 45°, 60° w postaci [współczynnik, pierwiastek] dla boków trójkąta (przyprostokątna przeciwległa, przyległa, przeciwprostokątna). */
const BOKI = {
  30: { a: [1, 1], b: [1, 3], c: [2, 1] },
  45: { a: [1, 1], b: [1, 1], c: [1, 2] },
  60: { a: [1, 3], b: [1, 1], c: [2, 1] },
};
const NAZWA_BOKU = {
  a: "przyprostokątna leżąca naprzeciw kąta $\\alpha$",
  b: "przyprostokątna leżąca przy kącie $\\alpha$",
  c: "przeciwprostokątna",
};
const nwd = (x, y) => (y ? nwd(y, x % y) : Math.abs(x));
/** Liczba w postaci współczynnik·√m (m = 1 – liczba całkowita) do LaTeX. */
const zPierw = (wsp_, m) => (m === 1 ? String(wsp_) : `${wsp(wsp_)}\\sqrt{${m}}`);

/** Znak funkcji w ćwiartce cw (1–4). */
const znakF = (f, cw) => ({ sin: [1, 1, -1, -1], cos: [1, -1, -1, 1], tg: [1, -1, 1, -1], ctg: [1, -1, 1, -1] }[f][cw - 1]);

/** Kąt th (nieosiowy, 90°–360°) sprowadzony do ostrego: ćwiartka, kąt ostry i zapis wzoru redukcyjnego. */
const redukcja = (th) => (th < 180
  ? { cw: 2, ref: 180 - th, form: `180^\\circ - ${180 - th}^\\circ` }
  : th < 270
    ? { cw: 3, ref: th - 180, form: `180^\\circ + ${th - 180}^\\circ` }
    : { cw: 4, ref: 360 - th, form: `360^\\circ - ${360 - th}^\\circ` });

/** Składniki o wartościach wymiernych: funkcje kątów z II–IV ćwiartki z wymiernym wynikiem oraz kwadraty każdej funkcji. */
const SKLADNIKI = [];
for (const th of [120, 135, 150, 210, 225, 240, 300, 315, 330]) {
  const { cw, ref, form } = redukcja(th);
  for (const f of FUN) {
    const s = znakF(f, cw);
    const pref = s < 0 ? "-" : "";
    const poza = cw > 2 || f === "ctg";
    if (WQ[ref][f]) {
      SKLADNIKI.push({
        poza,
        t: `${F[f]} ${th}^\\circ`,
        v: WQ[ref][f].mul(s),
        krok: `${F[f]} ${th}^\\circ = ${F[f]}(${form}) = ${pref}${F[f]} ${ref}^\\circ = ${pref}${WART[ref][f]}`,
      });
    }
    SKLADNIKI.push({
      poza,
      t: `${F[f]}^2 ${th}^\\circ`,
      v: WQ2[ref][f],
      krok: `${F[f]}^2 ${th}^\\circ = \\left(${F[f]}(${form})\\right)^2 = \\left(${pref}${WART[ref][f]}\\right)^2 = ${WQ2[ref][f].tex()}`,
    });
  }
}

/** Dwie funkcje tego samego kąta ostrego z jednego trójkąta prostokątnego; druga ma „ładną” wartość. */
function dwieFunkcje(r) {
  for (;;) {
    let [a, b, c] = r.pick(TROJKI);
    if (r.chance()) [a, b] = [b, a];
    const [f1, f2] = r.shuffle(FUN);
    const w2 = wart(f2, a, b, c);
    if (ladna(w2)) return { a, b, c, f1, f2, w1: wart(f1, a, b, c), w2 };
  }
}

/** Kroki wspólne dla zadań „znając jedną funkcję, oblicz drugą”: boki z danej wartości, trzeci bok z Pitagorasa, szukana funkcja. */
function krokiTrojkat({ a, b, c, f1, f2, w1 }) {
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
    // ------------------------------------------------------------------ 5.1
    {
      id: "powtorzenie",
      nazwa: "Trygonometria kąta ostrego – powtórzenie",
      sciaga: [
        {
          nazwa: "Funkcje w trójkącie prostokątnym",
          slownie: "Dla kąta ostrego $\\alpha$ sinus to stosunek przyprostokątnej przeciwległej do przeciwprostokątnej, a cosinus – przyległej do przeciwprostokątnej. Tangens to przeciwległa przez przyległą, a cotangens – odwrotnie.",
          tex: "\\sin\\alpha=\\frac{a}{c}\\qquad\\cos\\alpha=\\frac{b}{c}\\qquad\\operatorname{tg}\\alpha=\\frac{a}{b}\\qquad\\operatorname{ctg}\\alpha=\\frac{b}{a}",
          rysunek: `<svg viewBox="0 0 300 170"><path class="l" d="M40 140L250 140L250 52.5Z"/><path class="l" d="M239 140L239 129L250 129"/><path class="a" d="M78 140A38 38 0 0 0 75.1 125.4"/><text class="t" x="258" y="101.3">a = 5</text><text class="t" x="145" y="160" text-anchor="middle">b = 12</text><text class="t" x="138.5" y="85.6" text-anchor="middle">c = 13</text><text class="ta" x="100" y="134" text-anchor="middle">α</text><text class="tm" x="32" y="144" text-anchor="end">A</text><text class="tm" x="258" y="154">C</text><text class="tm" x="258" y="48.5">B</text></svg>`,
          litery: "$a$ – przyprostokątna przeciwległa do $\\alpha$ (leży naprzeciw kąta), $b$ – przyległa do $\\alpha$ (leży przy kącie), $c$ – przeciwprostokątna (leży naprzeciw kąta prostego, jest najdłuższa).",
          przyklad: "Dla boków $5$, $12$, $13$ i kąta naprzeciw boku $5$: $\\sin\\alpha=\\frac{5}{13}$, $\\cos\\alpha=\\frac{12}{13}$, $\\operatorname{tg}\\alpha=\\frac{5}{12}$, $\\operatorname{ctg}\\alpha=\\frac{12}{5}$.",
          uwaga: "Sinus i cosinus kąta ostrego są mniejsze od $1$, a tangens może być dowolnie duży. Cotangens (poza wymaganiami matury podstawowej) to odwrotność tangensa.",
        },
        {
          nazwa: "Sinus i cosinus: 30°, 45°, 60°",
          slownie: "Wartości te pamiętamy ze ściągi albo odczytujemy z rysunku: z połowy trójkąta równobocznego o boku $2$ i z połowy kwadratu o boku $1$. Sinus rośnie razem z kątem, a cosinus maleje.",
          tex: "\\sin30^\\circ=\\frac{1}{2}\\qquad\\sin45^\\circ=\\frac{\\sqrt{2}}{2}\\qquad\\sin60^\\circ=\\frac{\\sqrt{3}}{2}\\qquad\\cos30^\\circ=\\frac{\\sqrt{3}}{2}\\qquad\\cos45^\\circ=\\frac{\\sqrt{2}}{2}\\qquad\\cos60^\\circ=\\frac{1}{2}",
          rysunek: `<svg viewBox="0 0 300 170"><path class="l" d="M20 150L141.2 150L141.2 80Z"/><path class="l" d="M132.2 150L132.2 141L141.2 141"/><path class="a" d="M44 150A24 24 0 0 0 40.8 138"/><path class="a" d="M141.2 98A18 18 0 0 1 125.7 89"/><text class="t" x="80.6" y="166" text-anchor="middle">√3</text><text class="t" x="149.2" y="120">1</text><text class="t" x="68.6" y="107" text-anchor="middle">2</text><text class="tm" x="58" y="147" text-anchor="middle">30°</text><text class="tm" x="119.2" y="108" text-anchor="middle">60°</text><path class="l" d="M170 150L265 150L265 55Z"/><path class="l" d="M256 150L256 141L265 141"/><path class="a" d="M190 150A20 20 0 0 0 184.1 135.9"/><text class="t" x="217.5" y="166" text-anchor="middle">1</text><text class="t" x="273" y="107.5">1</text><text class="t" x="205.5" y="94.5" text-anchor="middle">√2</text><text class="tm" x="213" y="147" text-anchor="middle">45°</text><text class="tm" x="80" y="20" text-anchor="middle">połowa trójkąta równobocznego</text><text class="tm" x="225" y="20" text-anchor="middle">połowa kwadratu</text></svg>`,
          przyklad: "$2\\sin 30^\\circ + \\cos 60^\\circ = 2\\cdot\\frac{1}{2} + \\frac{1}{2} = \\frac{3}{2}$.",
          uwaga: "$\\sin^2 45^\\circ$ to $\\left(\\frac{\\sqrt{2}}{2}\\right)^2 = \\frac{1}{2}$ – podnosimy do kwadratu całą wartość.",
        },
        {
          nazwa: "Tangens i cotangens: 30°, 45°, 60°",
          slownie: "Tangens rośnie z kątem, cotangens maleje. Dla $45^\\circ$ obie wartości są równe $1$.",
          tex: "\\operatorname{tg}30^\\circ=\\frac{\\sqrt{3}}{3}\\qquad\\operatorname{tg}45^\\circ=1\\qquad\\operatorname{tg}60^\\circ=\\sqrt{3}\\qquad\\operatorname{ctg}30^\\circ=\\sqrt{3}\\qquad\\operatorname{ctg}45^\\circ=1\\qquad\\operatorname{ctg}60^\\circ=\\frac{\\sqrt{3}}{3}",
          przyklad: "$\\operatorname{tg}60^\\circ\\cdot\\operatorname{ctg}30^\\circ = \\sqrt{3}\\cdot\\sqrt{3} = 3$.",
          uwaga: "$\\operatorname{tg}30^\\circ = \\frac{\\sqrt{3}}{3}$, a nie $\\frac{\\sqrt{3}}{2}$ – to jest sinus $60^\\circ$. Wartości cotangensa (poza wymaganiami matury podstawowej) są odwrotnościami wartości tangensa.",
        },
        {
          nazwa: "Zależności dla jednego kąta",
          slownie: "Suma kwadratów sinusa i cosinusa tego samego kąta jest równa $1$. Tangens to iloraz sinusa przez cosinus. Sinus kąta to cosinus kąta dopełniającego do $90^\\circ$.",
          tex: "\\sin^2\\alpha+\\cos^2\\alpha=1\\qquad\\operatorname{tg}\\alpha=\\frac{\\sin\\alpha}{\\cos\\alpha}\\qquad\\sin(90^\\circ-\\alpha)=\\cos\\alpha",
          litery: "$\\sin^2\\alpha$ to $(\\sin\\alpha)^2$.",
          przyklad: "Jeśli $\\sin\\alpha = \\frac{3}{5}$, to $\\cos^2\\alpha = 1 - \\frac{9}{25} = \\frac{16}{25}$, więc dla kąta ostrego $\\cos\\alpha = \\frac{4}{5}$.",
          uwaga: "Wzór $\\sin(90^\\circ-\\alpha)=\\cos\\alpha$ działa tylko dla kątów dających razem $90^\\circ$.",
        },
        {
          nazwa: "Bok z kąta ostrego",
          slownie: "Gdy znasz kąt ostry i jeden bok trójkąta prostokątnego, wybierz funkcję, w której występuje bok znany i bok szukany, i wyznacz szukany bok z jej definicji.",
          tex: "a=c\\sin\\alpha\\qquad b=c\\cos\\alpha\\qquad a=b\\operatorname{tg}\\alpha",
          litery: "$a$ – przyprostokątna przeciwległa do $\\alpha$, $b$ – przyległa, $c$ – przeciwprostokątna.",
          przyklad: "Dla $c = 12$ i $\\alpha = 30^\\circ$: $a = 12\\cdot\\frac{1}{2} = 6$ i $b = 12\\cdot\\frac{\\sqrt{3}}{2} = 6\\sqrt{3}$.",
          uwaga: "Przeciwprostokątną z kąta i przyprostokątnej liczymy dzieleniem: $c = \\frac{a}{\\sin\\alpha}$.",
        },
      ],
      jak: [
        "Zaznacz kąt ostry $\\alpha$ i nazwij boki: przeciwległy, przyległy, przeciwprostokątna.",
        "Jeśli brakuje boku, oblicz go z twierdzenia Pitagorasa.",
        "Zapisz stosunek boków z definicji wybranej funkcji i skróć ułamek.",
        "W wyrażeniach z kątami $30^\\circ$, $45^\\circ$, $60^\\circ$ podstaw wartości ze ściągi i wykonaj działania.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "W trójkącie prostokątnym $ABC$ kąt prosty jest przy wierzchołku $C$, $|AC| = 8$ i $|AB| = 17$. Cosinus kąta $B$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{8}{17}$", "$\\frac{8}{15}$", "$\\frac{15}{17}$", "$\\frac{15}{8}$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Kąt ostry $\\alpha$ spełnia warunek $\\sin\\alpha = \\frac{5}{13}$. Wtedy $\\operatorname{tg}\\alpha$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{5}{12}$", "$\\frac{12}{5}$", "$\\frac{12}{13}$", "$\\frac{5}{13}$"],
          poprawna: 0,
        },
        {
          nr: "3",
          tresc: "Wartość wyrażenia $\\sin 60^\\circ\\cdot\\cos 30^\\circ - \\operatorname{tg}45^\\circ$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{4}$", "$-\\frac{1}{4}$", "$-\\frac{1}{2}$", "$\\frac{\\sqrt{3}-2}{2}$"],
          poprawna: 1,
        },
        {
          nr: "4",
          tresc: "Kąt ostry $\\alpha$ spełnia warunek $\\sin\\alpha = \\frac{4}{5}$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\cos\\alpha=\\frac{3}{5}$", litery: "PF", poprawna: 0 },
            { tekst: "$\\operatorname{tg}\\alpha=\\frac{3}{4}$", litery: "PF", poprawna: 1 },
            { tekst: "(poza wymaganiami matury podstawowej) $\\operatorname{ctg}\\alpha=\\frac{3}{4}$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "5",
          tresc: "W trójkącie prostokątnym jeden z kątów ostrych ma miarę $30^\\circ$, a przeciwprostokątna ma długość $18$. Przyprostokątna przyległa do kąta $30^\\circ$ ma długość: **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$", "$18\\sqrt{3}$", "$6\\sqrt{3}$", "$9\\sqrt{3}$"],
          poprawna: 3,
        },
        {
          nr: "6",
          tresc: "W trójkącie prostokątnym jeden z kątów ostrych ma miarę $45^\\circ$, a przeciwprostokątna ma długość $14$. Każda z przyprostokątnych ma długość: **Wybierz właściwą odpowiedź.**",
          opcje: ["$7\\sqrt{2}$", "$14\\sqrt{2}$", "$7$", "$7\\sqrt{3}$"],
          poprawna: 0,
        },
        {
          nr: "7",
          tresc: "Liczba $\\cos 70^\\circ$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\sin 20^\\circ$", "$\\cos 20^\\circ$", "$\\operatorname{tg}20^\\circ$", "$-\\sin 20^\\circ$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "8",
          punkty: 2,
          tresc: "Oblicz wartość wyrażenia $\\operatorname{tg}^2 60^\\circ - 4\\sin^2 30^\\circ + \\cos 60^\\circ$. **Zapisz obliczenia.**",
          rozwiazanie: "Wartości ze ściągi: $\\operatorname{tg}60^\\circ = \\sqrt{3}$, $\\sin 30^\\circ = \\frac{1}{2}$, $\\cos 60^\\circ = \\frac{1}{2}$.\n\nKwadraty: $\\operatorname{tg}^2 60^\\circ = (\\sqrt{3})^2 = 3$ oraz $\\sin^2 30^\\circ = \\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4}$.\n\nPodstawiamy: $3 - 4\\cdot\\frac{1}{4} + \\frac{1}{2} = 3 - 1 + \\frac{1}{2} = \\frac{5}{2}$.\n\nOdpowiedź: $\\frac{5}{2}$.",
        },
        {
          nr: "9",
          punkty: 3,
          tresc: "Kąt ostry $\\alpha$ spełnia warunek $\\operatorname{tg}\\alpha = 2{,}4$. Oblicz $\\sin\\alpha$ i $\\cos\\alpha$. **Zapisz obliczenia.**",
          rozwiazanie: "Zapisujemy $\\operatorname{tg}\\alpha = 2{,}4 = \\frac{12}{5}$, więc przyjmujemy przyprostokątną przeciwległą $a = 12$ i przyległą $b = 5$.\n\nPrzeciwprostokątna z twierdzenia Pitagorasa: $c = \\sqrt{12^2 + 5^2} = \\sqrt{169} = 13$.\n\n$\\sin\\alpha = \\frac{a}{c} = \\frac{12}{13}$ oraz $\\cos\\alpha = \\frac{b}{c} = \\frac{5}{13}$.\n\nOdpowiedź: $\\sin\\alpha = \\frac{12}{13}$, $\\cos\\alpha = \\frac{5}{13}$.",
        },
        {
          nr: "10",
          punkty: 2,
          tresc: "W trójkącie prostokątnym przeciwprostokątna ma długość $20$, a jeden z kątów ostrych ma miarę $30^\\circ$. Oblicz obwód tego trójkąta. **Zapisz obliczenia.**",
          rozwiazanie: "Niech $\\alpha = 30^\\circ$, $a$ będzie przyprostokątną naprzeciw kąta $\\alpha$, $b$ – przyprostokątną przy kącie $\\alpha$, a $c = 20$ – przeciwprostokątną.\n\n$a = c\\sin 30^\\circ = 20\\cdot\\frac{1}{2} = 10$ oraz $b = c\\cos 30^\\circ = 20\\cdot\\frac{\\sqrt{3}}{2} = 10\\sqrt{3}$.\n\nObwód: $a + b + c = 10 + 10\\sqrt{3} + 20 = 30 + 10\\sqrt{3}$.\n\nOdpowiedź: obwód jest równy $30 + 10\\sqrt{3}$.",
        },
      ],
      generatory: [
        {
          id: "powtorzenie-z-bokow",
          nazwa: "Funkcje z boków",
          opis: "Oblicz sinus, cosinus, tangens albo cotangens kąta w trójkącie prostokątnym, gdy znasz jego boki.",
          generuj(r) {
            for (;;) {
              const [p, s, c0] = r.pick(TROJKI);
              const k = r.int(1, 2);
              const [x, y] = r.chance() ? [p * k, s * k] : [s * k, p * k];   // x = |AC|, y = |BC|
              const c = c0 * k;
              const [A, B, C] = r.pick(NAZWY);
              const kat = r.pick([A, B]);
              const f = r.pick(FUN);
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
                tresc: zPoza(f === "ctg", `W trójkącie prostokątnym $${A}${B}${C}$ kąt prosty jest przy wierzchołku $${C}$. Wiadomo, że ${dane.map(([n, v]) => `$${n} = ${v}$`).join(", ")}. Oblicz $${F[f]}\\alpha$, gdzie $\\alpha$ jest kątem przy wierzchołku $${kat}$.`),
                pola: [{ id: "w", typ: "liczba", etykieta: `$${F[f]}\\alpha =$` }],
                odpowiedz: { w },
                wynik: `$${F[f]}\\alpha = ${w.tex()}$`,
                rozwiazanie,
              };
            }
          },
        },
        {
          id: "powtorzenie-wyrazenie",
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
              const plus = r.chance();
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
                tresc: zPoza(zapis.includes("ctg"), `Oblicz wartość wyrażenia $${zapis}$.`),
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
          id: "powtorzenie-bok-z-kata",
          nazwa: "Bok z kąta 30°, 45° lub 60°",
          opis: "W trójkącie prostokątnym znasz kąt ostry (30°, 45° albo 60°) i jeden bok – oblicz inny bok.",
          generuj(r) {
            for (;;) {
              const kat = r.pick([30, 45, 60]);
              const [znany, szukany] = r.shuffle(["a", "b", "c"]).slice(0, 2);
              const [cz, mz] = BOKI[kat][znany], [cs, ms] = BOKI[kat][szukany];
              // szukany bok = n (liczba całkowita); znany = n · cz√mz / (cs√ms) = n · cz/(cs·ms) · √(mz·ms)
              const iloczyn = mz * ms;
              const pierw = Math.round(Math.sqrt(iloczyn));
              const [wspolczynnik, m] = pierw * pierw === iloczyn ? [pierw, 1] : [1, iloczyn];
              let licz = cz * wspolczynnik, mian = cs * ms;
              const g = nwd(licz, mian);
              licz /= g;
              mian /= g;
              if (m === 1 && licz === mian) continue;   // oba boki równe – za proste
              const k = r.int(1, 6);
              const n = mian * k;                        // długość szukanego boku
              const dlugoscZnanego = zPierw(licz * k, m);
              // funkcja łącząca oba boki: licznik i mianownik jej definicji (a – przeciwległa, b – przyległa, c – przeciwprostokątna)
              const para = { sin: ["a", "c"], cos: ["b", "c"], tg: ["a", "b"] };
              const f = Object.keys(para).find((x) => para[x].includes(znany) && para[x].includes(szukany));
              const [lic, mia] = para[f];
              const wf = WART[kat][f];
              const wf_ = { sin: "\\sin", cos: "\\cos", tg: "\\operatorname{tg}" }[f];
              let wzor, podstawienie;
              if (szukany === lic) {          // szukany bok w liczniku: szukany = znany · funkcja
                wzor = `${szukany} = ${znany}\\cdot ${wf_}\\alpha`;
                podstawienie = `${szukany} = ${dlugoscZnanego}\\cdot ${wf} = ${n}`;
              } else {                         // szukany bok w mianowniku: szukany = znany : funkcja
                wzor = `${szukany} = \\frac{${znany}}{${wf_}\\alpha}`;
                podstawienie = `${szukany} = ${dlugoscZnanego} : ${wf} = ${n}`;
              }
              return {
                tresc: `W trójkącie prostokątnym kąt ostry $\\alpha$ ma miarę $${kat}^\\circ$. Przyprostokątną leżącą naprzeciw kąta $\\alpha$ oznaczamy $a$, przyprostokątną leżącą przy kącie $\\alpha$ oznaczamy $b$, a przeciwprostokątną $c$. Wiadomo, że $${znany} = ${dlugoscZnanego}$. Oblicz $${szukany}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `$${szukany} =$` }],
                odpowiedz: { w: q(n) },
                wynik: `$${szukany} = ${n}$`,
                rozwiazanie: [
                  `Znany bok to $${znany}$ (${NAZWA_BOKU[znany]}), a szukany to $${szukany}$ (${NAZWA_BOKU[szukany]}). Łączy je ${{ sin: "sinus", cos: "cosinus", tg: "tangens" }[f]}: $${wf_}\\alpha = \\frac{${lic}}{${mia}}$.`,
                  `Stąd $${wzor}$, a $${wf_} ${kat}^\\circ = ${wf}$.`,
                  `$${podstawienie}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5.2
    {
      id: "dowolny-kat",
      nazwa: "Sinus, cosinus, tangens i cotangens dowolnego kąta",
      sciaga: [
        {
          nazwa: "Kąt w układzie współrzędnych",
          slownie: "Wierzchołek kąta $\\alpha$ umieszczamy w początku układu, a pierwsze ramię kładziemy na dodatniej półosi $OX$. Drugie ramię obracamy przeciwnie do ruchu wskazówek zegara, a kąt dodatni kończy się w jednej z czterech ćwiartek.",
          litery: "I ćwiartka: od $0^\\circ$ do $90^\\circ$, II: od $90^\\circ$ do $180^\\circ$, III: od $180^\\circ$ do $270^\\circ$, IV: od $270^\\circ$ do $360^\\circ$.",
          przyklad: "Kąt $120^\\circ$ leży w II ćwiartce, bo $90^\\circ < 120^\\circ < 180^\\circ$. Kąt $215^\\circ$ leży w III ćwiartce, bo $180^\\circ < 215^\\circ < 270^\\circ$.",
          uwaga: "Kąty $0^\\circ$, $90^\\circ$, $180^\\circ$, $270^\\circ$ leżą na osiach, a nie w ćwiartkach. Kąty większe niż $180^\\circ$, czyli III i IV ćwiartka, są poza wymaganiami matury podstawowej (wymagane są kąty od $0^\\circ$ do $180^\\circ$).",
        },
        {
          nazwa: "Funkcje przez punkt na ramieniu",
          slownie: "Weź dowolny punkt $P=(x,y)$ na drugim ramieniu kąta, różny od początku układu, i oblicz jego odległość $r$ od punktu $(0,0)$. Funkcje wynikają ze współrzędnych punktu.",
          tex: "r=\\sqrt{x^2+y^2}\\qquad\\sin\\alpha=\\frac{y}{r}\\qquad\\cos\\alpha=\\frac{x}{r}\\qquad\\operatorname{tg}\\alpha=\\frac{y}{x}\\qquad\\operatorname{ctg}\\alpha=\\frac{x}{y}",
          rysunek: `<svg viewBox="0 0 300 160"><path class="l" d="M20 120H290M170 150V10"/><path class="l" d="M284 116L290 120L284 124M166 16L170 10L174 16"/><path class="p" d="M104 32V120M104 32H170"/><path class="a" d="M170 120L104 32"/><path class="l" d="M196 120A26 26 0 0 0 154.4 99.2"/><circle class="k" cx="104" cy="32" r="4"/><text class="t" x="98" y="26" text-anchor="end">P = (x, y)</text><text class="t" x="104" y="138" text-anchor="middle">x</text><text class="t" x="178" y="37">y</text><text class="ta" x="128" y="70">r</text><text class="t" x="186" y="92">α</text><text class="tm" x="286" y="136" text-anchor="end">x</text><text class="tm" x="178" y="16">y</text><text class="tm" x="176" y="136">O</text></svg>`,
          litery: "$x$, $y$ – współrzędne punktu $P$, $r$ – jego odległość od początku układu. Tangens istnieje dla $x\\neq 0$. Cotangens (poza wymaganiami matury podstawowej) istnieje dla $y\\neq 0$.",
          przyklad: "Dla $P=(-3,4)$: $r=\\sqrt{9+16}=5$, więc $\\sin\\alpha=\\frac{4}{5}$, $\\cos\\alpha=-\\frac{3}{5}$, $\\operatorname{tg}\\alpha=-\\frac{4}{3}$, $\\operatorname{ctg}\\alpha=-\\frac{3}{4}$.",
          uwaga: "Wynik nie zależy od wyboru punktu na ramieniu. Uważaj na znaki współrzędnych, bo $r$ jest zawsze dodatnie.",
        },
        {
          nazwa: "Kąt rozwarty",
          slownie: "Ramię kąta rozwartego leży w II ćwiartce, więc punkt $P=(x,y)$ ma $x<0$ i $y>0$. Dlatego sinus jest dodatni, a cosinus i tangens są ujemne.",
          tex: "\\sin\\alpha>0\\qquad\\cos\\alpha<0\\qquad\\operatorname{tg}\\alpha<0",
          litery: "Kąt rozwarty to kąt od $90^\\circ$ do $180^\\circ$ (bez końców).",
          przyklad: "Dla $P=(-4,3)$: $r=5$, więc $\\sin\\alpha=\\frac{3}{5}$, $\\cos\\alpha=-\\frac{4}{5}$, $\\operatorname{tg}\\alpha=-\\frac{3}{4}$.",
          uwaga: "Dla kąta $90^\\circ$ tangens nie istnieje, bo $x=0$.",
        },
        {
          nazwa: "Znaki funkcji w ćwiartkach",
          slownie: "Ponieważ $r>0$, znak sinusa to znak $y$, a znak cosinusa to znak $x$. Tangens i cotangens są dodatnie, gdy $x$ i $y$ mają ten sam znak. W I ćwiartce wszystkie funkcje są dodatnie.",
          tex: "\\sin\\alpha>0:\\ \\mathrm{I,\\,II}\\qquad\\cos\\alpha>0:\\ \\mathrm{I,\\,IV}\\qquad\\operatorname{tg}\\alpha>0:\\ \\mathrm{I,\\,III}",
          rysunek: `<svg viewBox="0 0 300 170"><path class="l" d="M16 88H284M150 164V8"/><path class="l" d="M278 84L284 88L278 92M146 14L150 8L154 14"/><text class="ta" x="162" y="27">I ćwiartka</text><text class="tm" x="162" y="39">0°–90°</text><text class="t" x="162" y="54">sin +</text><text class="t" x="162" y="68">cos +</text><text class="t" x="162" y="82">tg +</text><text class="ta" x="138" y="27" text-anchor="end">II ćwiartka</text><text class="tm" x="138" y="39" text-anchor="end">90°–180°</text><text class="t" x="138" y="54" text-anchor="end">sin +</text><text class="t" x="138" y="68" text-anchor="end">cos −</text><text class="t" x="138" y="82" text-anchor="end">tg −</text><text class="tm" x="138" y="106" text-anchor="end">III ćwiartka · 180°–270°</text><text class="tm" x="138" y="120" text-anchor="end">poza podstawą</text><text class="tm" x="138" y="134" text-anchor="end">sin −  cos −  tg +</text><text class="tm" x="162" y="106">IV ćwiartka · 270°–360°</text><text class="tm" x="162" y="120">poza podstawą</text><text class="tm" x="162" y="134">sin −  cos +  tg −</text><text class="tm" x="280" y="80" text-anchor="end">x</text><text class="tm" x="160" y="14">y</text></svg>`,
          przyklad: "Dla $\\alpha=120^\\circ$ (II ćwiartka): $\\sin\\alpha>0$, $\\cos\\alpha<0$, $\\operatorname{tg}\\alpha<0$. Dla $\\alpha=215^\\circ$ (III ćwiartka): $\\sin\\alpha<0$, $\\cos\\alpha<0$, $\\operatorname{tg}\\alpha>0$.",
          uwaga: "Wymagane są tylko kąty od $0^\\circ$ do $180^\\circ$ (I i II ćwiartka). III i IV ćwiartka oraz cotangens są dodatkiem (poza wymaganiami matury podstawowej). Cotangens ma zawsze taki sam znak jak tangens tego samego kąta.",
        },
        {
          nazwa: "Kąty 0°, 90° i 180°",
          slownie: "Dla kąta, którego ramię leży na osi, bierzemy punkt na osi w odległości $r=1$: $(1,0)$ dla $0^\\circ$, $(0,1)$ dla $90^\\circ$, $(-1,0)$ dla $180^\\circ$. Wtedy sinus to $y$, a cosinus to $x$. Kąt $270^\\circ$ (poza wymaganiami matury podstawowej) to punkt $(0,-1)$.",
          tex: "\\sin0^\\circ=0\\qquad\\cos0^\\circ=1\\qquad\\operatorname{tg}0^\\circ=0\\qquad\\sin90^\\circ=1\\qquad\\cos90^\\circ=0\\qquad\\sin180^\\circ=0\\qquad\\cos180^\\circ=-1\\qquad\\operatorname{tg}180^\\circ=0",
          przyklad: "$2\\sin 90^\\circ+\\cos 180^\\circ=2\\cdot 1+(-1)=1$.",
          uwaga: "Tangens nie istnieje dla $90^\\circ$ (bo $x=0$). Dla $270^\\circ$ też go nie ma, a cotangens nie istnieje dla $0^\\circ$ i $180^\\circ$ (bo $y=0$) – to jest poza wymaganiami matury podstawowej.",
        },
      ],
      jak: [
        "Zapisz współrzędne punktu $P=(x,y)$ leżącego na ramieniu kąta.",
        "Oblicz $r=\\sqrt{x^2+y^2}$.",
        "Zapisz funkcje: $\\sin\\alpha=\\frac{y}{r}$, $\\cos\\alpha=\\frac{x}{r}$, $\\operatorname{tg}\\alpha=\\frac{y}{x}$, i skróć ułamki wraz ze znakami. Cotangens $\\operatorname{ctg}\\alpha=\\frac{x}{y}$ jest poza wymaganiami matury podstawowej.",
        "Gdy pytają tylko o znak, ustal ćwiartkę, w której leży kąt.",
      ],
      zadania: [
        {
          nr: "11",
          tresc: "Punkt $P=(-5,12)$ leży na końcowym ramieniu kąta $\\alpha$ (początkowe ramię leży na dodatniej półosi $OX$). Cosinus kąta $\\alpha$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{5}{13}$", "$-\\frac{5}{13}$", "$-\\frac{5}{12}$", "$-\\frac{12}{13}$"],
          poprawna: 1,
        },
        {
          nr: "12",
          tresc: "(poza wymaganiami matury podstawowej) Końcowe ramię kąta $\\alpha$ przechodzi przez punkt $(6,-8)$. Tangens kąta $\\alpha$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-\\frac{3}{4}$", "$\\frac{4}{3}$", "$-\\frac{4}{3}$", "$-\\frac{4}{5}$"],
          poprawna: 2,
        },
        {
          nr: "13",
          tresc: "(poza wymaganiami matury podstawowej) Kąt $\\alpha$ ma miarę $230^\\circ$. Wtedy: **Wybierz właściwą odpowiedź.**",
          opcje: [
            "$\\sin\\alpha<0$ i $\\cos\\alpha<0$",
            "$\\sin\\alpha>0$ i $\\cos\\alpha<0$",
            "$\\sin\\alpha<0$ i $\\cos\\alpha>0$",
            "$\\sin\\alpha>0$ i $\\cos\\alpha>0$",
          ],
          poprawna: 0,
        },
        {
          nr: "14",
          tresc: "(poza wymaganiami matury podstawowej) **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\sin 210^\\circ > 0$", litery: "PF", poprawna: 1 },
            { tekst: "$\\cos 300^\\circ > 0$", litery: "PF", poprawna: 0 },
            { tekst: "$\\operatorname{ctg}100^\\circ > 0$", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "15",
          tresc: "(poza wymaganiami matury podstawowej) Punkt $P=(x,-4)$, gdzie $x<0$, leży na końcowym ramieniu kąta $\\alpha$ i $|OP| = 5$. Tangens kąta $\\alpha$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-\\frac{4}{3}$", "$\\frac{3}{4}$", "$-\\frac{3}{4}$", "$\\frac{4}{3}$"],
          poprawna: 3,
        },
        {
          nr: "16",
          tresc: "Kąt $\\alpha$ jest rozwarty. Wtedy: **Wybierz właściwą odpowiedź.**",
          opcje: [
            "$\\sin\\alpha>0$ i $\\operatorname{tg}\\alpha>0$",
            "$\\sin\\alpha>0$ i $\\operatorname{tg}\\alpha<0$",
            "$\\sin\\alpha<0$ i $\\operatorname{tg}\\alpha<0$",
            "$\\cos\\alpha>0$ i $\\operatorname{tg}\\alpha<0$",
          ],
          poprawna: 1,
        },
        {
          nr: "17",
          tresc: "Wartość wyrażenia $2\\sin 90^\\circ - \\cos 180^\\circ$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$1$", "$3$", "$-1$", "$2$"],
          poprawna: 1,
        },
        {
          nr: "18",
          tresc: "Końcowe ramię kąta rozwartego $\\alpha$ przechodzi przez punkt $(-8,6)$. Sinus kąta $\\alpha$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{3}{5}$", "$-\\frac{3}{5}$", "$\\frac{4}{5}$", "$\\frac{3}{4}$"],
          poprawna: 0,
        },
        {
          nr: "19",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\sin 100^\\circ>0$", litery: "PF", poprawna: 0 },
            { tekst: "$\\cos 170^\\circ>0$", litery: "PF", poprawna: 1 },
            { tekst: "$\\operatorname{tg}95^\\circ<0$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "(poza wymaganiami matury podstawowej) Końcowe ramię kąta $\\alpha$ przechodzi przez punkt $P=(-12,-5)$. Oblicz $\\sin\\alpha$, $\\cos\\alpha$, $\\operatorname{tg}\\alpha$ i $\\operatorname{ctg}\\alpha$. **Zapisz obliczenia.**",
          rozwiazanie: "Odległość punktu od początku układu: $r = \\sqrt{(-12)^2 + (-5)^2} = \\sqrt{169} = 13$.\n\n$\\sin\\alpha = \\frac{y}{r} = \\frac{-5}{13} = -\\frac{5}{13}$ oraz $\\cos\\alpha = \\frac{x}{r} = \\frac{-12}{13} = -\\frac{12}{13}$.\n\n$\\operatorname{tg}\\alpha = \\frac{y}{x} = \\frac{-5}{-12} = \\frac{5}{12}$ oraz $\\operatorname{ctg}\\alpha = \\frac{x}{y} = \\frac{-12}{-5} = \\frac{12}{5}$.\n\nOdpowiedź: $\\sin\\alpha = -\\frac{5}{13}$, $\\cos\\alpha = -\\frac{12}{13}$, $\\operatorname{tg}\\alpha = \\frac{5}{12}$, $\\operatorname{ctg}\\alpha = \\frac{12}{5}$.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Końcowe ramię kąta rozwartego $\\alpha$ leży na prostej $y = -2x$. Oblicz $\\sin\\alpha$, $\\cos\\alpha$ i $\\operatorname{tg}\\alpha$. **Zapisz obliczenia.**",
          rozwiazanie: "Kąt rozwarty leży w II ćwiartce, czyli na ramieniu mamy $x<0$ i $y>0$. Na prostej $y=-2x$ wybieramy punkt $P=(-1,2)$.\n\nOdległość od początku układu: $r = \\sqrt{(-1)^2 + 2^2} = \\sqrt{5}$.\n\n$\\sin\\alpha = \\frac{2}{\\sqrt{5}} = \\frac{2\\sqrt{5}}{5}$ oraz $\\cos\\alpha = \\frac{-1}{\\sqrt{5}} = -\\frac{\\sqrt{5}}{5}$.\n\n$\\operatorname{tg}\\alpha = \\frac{y}{x} = \\frac{2}{-1} = -2$.\n\nOdpowiedź: $\\sin\\alpha = \\frac{2\\sqrt{5}}{5}$, $\\cos\\alpha = -\\frac{\\sqrt{5}}{5}$, $\\operatorname{tg}\\alpha = -2$.",
        },
        {
          nr: "22",
          punkty: 2,
          tresc: "Oblicz wartość wyrażenia $2\\sin 90^\\circ + 3\\cos 180^\\circ - \\operatorname{tg}0^\\circ + \\cos 0^\\circ$. **Zapisz obliczenia.**",
          rozwiazanie: "Wartości dla kątów na osiach: $\\sin 90^\\circ = 1$, $\\cos 180^\\circ = -1$, $\\operatorname{tg}0^\\circ = \\frac{\\sin 0^\\circ}{\\cos 0^\\circ} = \\frac{0}{1} = 0$ oraz $\\cos 0^\\circ = 1$.\n\nPodstawiamy: $2\\cdot 1 + 3\\cdot(-1) - 0 + 1 = 2 - 3 - 0 + 1 = 0$.\n\nOdpowiedź: $0$.",
        },
        {
          nr: "23",
          punkty: 3,
          tresc: "Punkt $P=(-9,12)$ leży na końcowym ramieniu kąta $\\alpha$. Oblicz $\\sin\\alpha$, $\\cos\\alpha$ i $\\operatorname{tg}\\alpha$ oraz podaj, czy kąt $\\alpha$ jest ostry, czy rozwarty. **Zapisz obliczenia.**",
          rozwiazanie: "Odległość punktu od początku układu: $r = \\sqrt{(-9)^2 + 12^2} = \\sqrt{81 + 144} = \\sqrt{225} = 15$.\n\n$\\sin\\alpha = \\frac{y}{r} = \\frac{12}{15} = \\frac{4}{5}$ oraz $\\cos\\alpha = \\frac{x}{r} = \\frac{-9}{15} = -\\frac{3}{5}$.\n\n$\\operatorname{tg}\\alpha = \\frac{y}{x} = \\frac{12}{-9} = -\\frac{4}{3}$.\n\nPunkt ma $x<0$ i $y>0$, więc leży w II ćwiartce, a kąt $\\alpha$ jest rozwarty (cosinus jest ujemny).\n\nOdpowiedź: $\\sin\\alpha = \\frac{4}{5}$, $\\cos\\alpha = -\\frac{3}{5}$, $\\operatorname{tg}\\alpha = -\\frac{4}{3}$, kąt jest rozwarty.",
        },
      ],
      generatory: [
        {
          id: "dowolny-kat-z-punktu",
          nazwa: "Funkcje z punktu",
          opis: "Punkt leży na końcowym ramieniu kąta – oblicz sinus, cosinus, tangens albo cotangens tego kąta.",
          generuj(r) {
            for (;;) {
              const [p, s, c0] = r.pick(TROJKI);
              const k = r.int(1, 2);
              const sx = r.znak(), sy = r.znak();
              const [ax, ay] = r.chance() ? [p * k, s * k] : [s * k, p * k];
              const x = sx * ax, y = sy * ay, rr = c0 * k;
              const f = r.pick(FUN);
              const w = f === "sin" ? q(y, rr) : f === "cos" ? q(x, rr) : f === "tg" ? q(y, x) : q(x, y);
              if (!ladna(w)) continue;
              const P = r.pick(["P", "K", "M"]);
              const lit = r.pick(["\\alpha", "\\beta", "\\varphi"]);
              const nx = x < 0 ? `(${x})` : String(x), ny = y < 0 ? `(${y})` : String(y);
              const [licznik, mianownik] = { sin: [y, rr], cos: [x, rr], tg: [y, x], ctg: [x, y] }[f];
              const [lz, mz] = { sin: ["y", "r"], cos: ["x", "r"], tg: ["y", "x"], ctg: ["x", "y"] }[f];
              const ulamek = `\\frac{${licznik}}{${mianownik}}`;
              const rownosc = ulamek === w.tex() ? "" : ` = ${w.tex()}`;
              return {
                tresc: zPoza(f === "ctg" || y < 0, `Punkt $${P} = (${x}, ${y})$ leży na końcowym ramieniu kąta $${lit}$ (początkowe ramię leży na dodatniej półosi $OX$). Oblicz $${F[f]}${lit}$.`),
                pola: [{ id: "w", typ: "liczba", etykieta: `$${F[f]}${lit} =$` }],
                odpowiedz: { w },
                wynik: `$${F[f]}${lit} = ${w.tex()}$`,
                rozwiazanie: [
                  `Odległość punktu od początku układu: $r = \\sqrt{${nx}^2 + ${ny}^2} = ${rr}$.`,
                  `$${F[f]}${lit} = \\frac{${lz}}{${mz}} = ${ulamek}${rownosc}$.`,
                ],
              };
            }
          },
        },
        {
          id: "dowolny-kat-znak",
          nazwa: "Znak funkcji",
          opis: "Ustal znak wyrażenia dla kąta o danej mierze albo ćwiartkę, w której leży kąt o danych znakach funkcji.",
          generuj(r) {
            if (r.chance()) {
              const [f1, f2] = r.shuffle(FUN);
              let th;
              do th = r.int(10, 350); while (th % 90 === 0);
              const cw = Math.floor(th / 90) + 1;
              const s1 = znakF(f1, cw), s2 = znakF(f2, cw);
              const ujemna = s1 * s2 < 0;
              return {
                tresc: zPoza(cw > 2 || f1 === "ctg" || f2 === "ctg", `Kąt $\\alpha$ ma miarę $${th}^\\circ$. Czy liczba $${F[f1]}\\alpha\\cdot${F[f2]}\\alpha$ jest dodatnia, czy ujemna?`),
                pola: [{ id: "z", typ: "wybor", etykieta: "Liczba jest", opcje: ["dodatnia", "ujemna"] }],
                odpowiedz: { z: ujemna ? 1 : 0 },
                wynik: ujemna ? "ujemna" : "dodatnia",
                rozwiazanie: [
                  `Kąt $${th}^\\circ$ leży w ${KW[cw - 1]} ćwiartce, bo $${(cw - 1) * 90}^\\circ < ${th}^\\circ < ${cw * 90}^\\circ$.`,
                  `W ${KW[cw - 1]} ćwiartce $${F[f1]}\\alpha ${s1 > 0 ? ">" : "<"} 0$ oraz $${F[f2]}\\alpha ${s2 > 0 ? ">" : "<"} 0$.`,
                  `Iloczyn liczb ${s1 * s2 > 0 ? (s1 > 0 ? "dodatnich" : "ujemnych") : "o różnych znakach"} jest ${ujemna ? "ujemny" : "dodatni"}.`,
                ],
              };
            }
            const cw = r.int(1, 4);
            const rodz = r.shuffle(["sin", "cos", "tg"]).slice(0, 2);
            const zapis = rodz.map((f) => {
              const g = f === "tg" && r.chance() ? "ctg" : f;
              return { g, s: znakF(g, cw) };
            });
            const war = zapis.map(({ g, s }) => `$${F[g]}\\alpha ${s > 0 ? ">" : "<"} 0$`).join(" i ");
            return {
              tresc: zPoza(cw > 2 || zapis.some(({ g }) => g === "ctg"), `Dla kąta $\\alpha$ spełnione są warunki ${war}. W której ćwiartce układu współrzędnych leży kąt $\\alpha$?`),
              pola: [{ id: "c", typ: "wybor", etykieta: "Ćwiartka", opcje: ["I ćwiartka", "II ćwiartka", "III ćwiartka", "IV ćwiartka"] }],
              odpowiedz: { c: cw - 1 },
              wynik: `${KW[cw - 1]} ćwiartka`,
              rozwiazanie: [
                "Znaki funkcji w ćwiartkach: sinus jest dodatni w I i II, cosinus w I i IV, a tangens i cotangens w I i III.",
                `Warunki ${war} spełnia tylko ${KW[cw - 1]} ćwiartka.`,
              ],
            };
          },
        },
        {
          id: "dowolny-kat-punkt-0-180",
          nazwa: "Funkcje kąta od 0° do 180°",
          opis: "Punkt leży na końcowym ramieniu kąta ostrego albo rozwartego – oblicz sinus, cosinus albo tangens tego kąta.",
          generuj(r) {
            for (;;) {
              const [p, s, c0] = r.pick(TROJKI);
              const k = r.int(1, 2);
              const [ax, ay] = r.chance() ? [p * k, s * k] : [s * k, p * k];
              const x = r.znak() * ax, y = ay, rr = c0 * k;   // y > 0: kąt ostry albo rozwarty
              const f = r.pick(["sin", "cos", "tg"]);
              const w = f === "sin" ? q(y, rr) : f === "cos" ? q(x, rr) : q(y, x);
              if (!ladna(w)) continue;
              const P = r.pick(["P", "K", "M"]);
              const lit = r.pick(["\\alpha", "\\beta", "\\varphi"]);
              const nx = x < 0 ? `(${x})` : String(x);
              const [licznik, mianownik] = { sin: [y, rr], cos: [x, rr], tg: [y, x] }[f];
              const [lz, mz] = { sin: ["y", "r"], cos: ["x", "r"], tg: ["y", "x"] }[f];
              const ulamek = `\\frac{${licznik}}{${mianownik}}`;
              const rownosc = ulamek === w.tex() ? "" : ` = ${w.tex()}`;
              return {
                tresc: `Punkt $${P} = (${x}, ${y})$ leży na końcowym ramieniu kąta $${lit}$ (początkowe ramię leży na dodatniej półosi $OX$). Oblicz $${F[f]}${lit}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `$${F[f]}${lit} =$` }],
                odpowiedz: { w },
                wynik: `$${F[f]}${lit} = ${w.tex()}$`,
                rozwiazanie: [
                  `Odległość punktu od początku układu: $r = \\sqrt{${nx}^2 + ${y}^2} = ${rr}$.`,
                  `$${F[f]}${lit} = \\frac{${lz}}{${mz}} = ${ulamek}${rownosc}$.`,
                ],
              };
            }
          },
        },
        {
          id: "dowolny-kat-osie",
          nazwa: "Kąty 0°, 90° i 180°",
          opis: "Oblicz wartość wyrażenia z sinusem, cosinusem i tangensem kątów 0°, 90° i 180°.",
          generuj(r) {
            // zapis, wartość (tg 90° nie istnieje, więc go nie używamy)
            const W = [
              { t: "\\sin 0^\\circ", v: 0 }, { t: "\\cos 0^\\circ", v: 1 }, { t: "\\operatorname{tg}0^\\circ", v: 0 },
              { t: "\\sin 90^\\circ", v: 1 }, { t: "\\cos 90^\\circ", v: 0 },
              { t: "\\sin 180^\\circ", v: 0 }, { t: "\\cos 180^\\circ", v: -1 }, { t: "\\operatorname{tg}180^\\circ", v: 0 },
            ];
            for (;;) {
              const [t1, t2, t3] = r.shuffle(W).slice(0, 3);
              const m1 = r.int(1, 5), m2 = r.int(1, 5);
              const znak2 = r.chance() ? 1 : -1;
              const wynik = m1 * t1.v + znak2 * m2 * t2.v + t3.v;
              if (wynik === 0 && r.chance(0.7)) continue;
              const zapis = `${wsp(m1)}${t1.t} ${znak2 > 0 ? "+" : "-"} ${wsp(m2)}${t2.t} + ${t3.t}`;
              const podst = (m, t) => (m === 1 ? `${t.v < 0 ? `(${t.v})` : t.v}` : `${m}\\cdot ${t.v < 0 ? `(${t.v})` : t.v}`);
              return {
                tresc: `Oblicz wartość wyrażenia $${zapis}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                odpowiedz: { w: q(wynik) },
                wynik: `$${wynik}$`,
                rozwiazanie: [
                  `Wartości: $${t1.t} = ${t1.v}$, $${t2.t} = ${t2.v}$, $${t3.t} = ${t3.v}$ (dla punktów $(1,0)$, $(0,1)$ albo $(-1,0)$ sinus to $y$, cosinus to $x$, a tangens to $\\frac{y}{x}$).`,
                  `Podstawiamy: $${podst(m1, t1)} ${znak2 > 0 ? "+" : "-"} ${podst(m2, t2)} + ${podst(1, t3)}$.`,
                  `Po wykonaniu działań: $${wynik}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5.3
    {
      id: "tozsamosci",
      nazwa: "Podstawowe tożsamości trygonometryczne",
      sciaga: [
        {
          nazwa: "Jedynka trygonometryczna",
          slownie: "Dla każdego kąta suma kwadratów sinusa i cosinusa jest równa $1$. Wynika to z $x^2+y^2=r^2$, bo $\\left(\\frac{y}{r}\\right)^2+\\left(\\frac{x}{r}\\right)^2=1$.",
          tex: "\\sin^2\\alpha+\\cos^2\\alpha=1",
          litery: "$\\sin^2\\alpha$ to $(\\sin\\alpha)^2$.",
          przyklad: "Jeśli $\\sin\\alpha=\\frac{5}{13}$, to $\\cos^2\\alpha=1-\\frac{25}{169}=\\frac{144}{169}$, więc $\\cos\\alpha=\\frac{12}{13}$ (kąt ostry) albo $\\cos\\alpha=-\\frac{12}{13}$ (kąt rozwarty).",
          uwaga: "To $\\sin^2\\alpha+\\cos^2\\alpha=1$, a nie $\\sin\\alpha+\\cos\\alpha=1$.",
        },
        {
          nazwa: "Tangens i cotangens",
          slownie: "Tangens to iloraz sinusa przez cosinus (gdy cosinus nie jest zerem). Cotangens (poza wymaganiami matury podstawowej) to iloraz cosinusa przez sinus. Gdy istnieją oba, ich iloczyn jest równy $1$.",
          tex: "\\operatorname{tg}\\alpha=\\frac{\\sin\\alpha}{\\cos\\alpha}\\qquad\\operatorname{ctg}\\alpha=\\frac{\\cos\\alpha}{\\sin\\alpha}\\qquad\\operatorname{tg}\\alpha\\cdot\\operatorname{ctg}\\alpha=1",
          przyklad: "Dla $\\sin\\alpha=\\frac{3}{5}$ i $\\cos\\alpha=-\\frac{4}{5}$: $\\operatorname{tg}\\alpha=\\frac{3}{5}:\\left(-\\frac{4}{5}\\right)=-\\frac{3}{4}$, a $\\operatorname{ctg}\\alpha=-\\frac{4}{3}$.",
          uwaga: "Przy dzieleniu ułamków pamiętaj o znakach: iloraz dwóch liczb ujemnych jest dodatni.",
        },
        {
          nazwa: "Druga funkcja z pierwszej",
          slownie: "Znając sinus albo cosinus i wiedząc, czy kąt jest ostry, czy rozwarty, policz drugą funkcję z jedynki trygonometrycznej. Kąt ostry: obie funkcje dodatnie. Kąt rozwarty: sinus dodatni, a cosinus ujemny.",
          przyklad: "Niech $\\alpha$ będzie rozwarty i $\\sin\\alpha=\\frac{3}{5}$. Wtedy $\\cos^2\\alpha=1-\\frac{9}{25}=\\frac{16}{25}$, a dla kąta rozwartego cosinus jest ujemny, więc $\\cos\\alpha=-\\frac{4}{5}$.",
          uwaga: "Bez informacji o kącie są dwie możliwe wartości: dodatnia i ujemna. Kąty z III i IV ćwiartki (poza wymaganiami matury podstawowej) mają inne znaki: sinus jest tam ujemny.",
        },
        {
          nazwa: "Dwa kąty o tym samym sinusie",
          slownie: "Jeśli znasz tylko sinus kąta z przedziału od $0^\\circ$ do $180^\\circ$, to pasują do niego dwa kąty: ostry $\\alpha$ i rozwarty $180^\\circ-\\alpha$. Ich cosinusy różnią się tylko znakiem.",
          tex: "\\cos\\alpha=\\sqrt{1-\\sin^2\\alpha}\\qquad\\cos(180^\\circ-\\alpha)=-\\sqrt{1-\\sin^2\\alpha}",
          litery: "Pierwszy wzór opisuje kąt ostry $\\alpha$, drugi – kąt rozwarty $180^\\circ-\\alpha$.",
          przyklad: "Dla $\\sin\\alpha=\\frac{5}{13}$ mamy $\\cos\\alpha=\\frac{12}{13}$ (kąt ostry) albo $\\cos\\alpha=-\\frac{12}{13}$ (kąt rozwarty).",
          uwaga: "Dla $\\sin\\alpha=1$ jest tylko jeden kąt, $90^\\circ$, i wtedy $\\cos 90^\\circ=0$.",
        },
        {
          nazwa: "Przekształcanie wyrażeń",
          slownie: "Wyrażenie $\\sin^2\\alpha+\\cos^2\\alpha$ zastępujemy jedynką. Kwadrat sumy lub różnicy rozwijamy wzorami skróconego mnożenia, a potem upraszczamy.",
          przyklad: "$(\\sin\\alpha-\\cos\\alpha)^2+2\\sin\\alpha\\cos\\alpha=\\sin^2\\alpha-2\\sin\\alpha\\cos\\alpha+\\cos^2\\alpha+2\\sin\\alpha\\cos\\alpha=1$.",
          uwaga: "$(\\sin\\alpha+\\cos\\alpha)^2$ to nie $\\sin^2\\alpha+\\cos^2\\alpha$ – brakuje podwojonego iloczynu.",
        },
      ],
      jak: [
        "Zapisz daną wartość i ustal, w której ćwiartce leży kąt – z niej odczytasz znaki funkcji.",
        "Z jedynki trygonometrycznej oblicz kwadrat drugiej funkcji i wyciągnij pierwiastek.",
        "Wybierz znak zgodny z ćwiartką.",
        "Tangens i cotangens policz jako iloraz sinusa i cosinusa albo jego odwrotność.",
      ],
      zadania: [
        {
          nr: "24",
          tresc: "Kąt $\\alpha$ jest rozwarty i $\\sin\\alpha = \\frac{3}{5}$. Wtedy $\\cos\\alpha$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{4}{5}$", "$-\\frac{4}{5}$", "$-\\frac{3}{4}$", "$\\frac{16}{25}$"],
          poprawna: 1,
        },
        {
          nr: "25",
          tresc: "(poza wymaganiami matury podstawowej) Kąt $\\alpha$ leży w III ćwiartce układu współrzędnych i $\\cos\\alpha = -\\frac{5}{13}$. Wtedy $\\sin\\alpha$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-\\frac{12}{13}$", "$\\frac{12}{13}$", "$-\\frac{8}{13}$", "$-\\frac{12}{5}$"],
          poprawna: 0,
        },
        {
          nr: "26",
          tresc: "(poza wymaganiami matury podstawowej) Dla pewnego kąta $\\alpha$ prawdziwe są równości $\\sin\\alpha = -0{,}6$ i $\\cos\\alpha = 0{,}8$. Wtedy $\\operatorname{tg}\\alpha$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-\\frac{4}{3}$", "$\\frac{3}{4}$", "$-\\frac{3}{4}$", "$-0{,}6$"],
          poprawna: 2,
        },
        {
          nr: "27",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Istnieje kąt $\\alpha$, dla którego $\\sin\\alpha=0{,}6$ i $\\cos\\alpha=0{,}4$.", litery: "PF", poprawna: 1 },
            { tekst: "Dla każdego kąta $\\alpha$ prawdziwa jest równość $\\sin^2\\alpha+\\cos^2\\alpha=1$.", litery: "PF", poprawna: 0 },
            { tekst: "(poza wymaganiami matury podstawowej) Jeśli $\\operatorname{tg}\\alpha=-\\frac{1}{2}$, to $\\operatorname{ctg}\\alpha=-2$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "28",
          tresc: "Wyrażenie $(\\sin\\alpha+\\cos\\alpha)^2-2\\sin\\alpha\\cos\\alpha$ jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$", "$1+2\\sin\\alpha\\cos\\alpha$", "$0$", "$1$"],
          poprawna: 3,
        },
        {
          nr: "29",
          tresc: "Kąt $\\alpha$ spełnia warunki $0^\\circ<\\alpha<180^\\circ$ i $\\sin\\alpha = \\frac{8}{17}$. Wtedy $\\cos\\alpha$ może być równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["tylko $\\frac{15}{17}$", "tylko $-\\frac{15}{17}$", "$\\frac{15}{17}$ albo $-\\frac{15}{17}$", "$\\frac{8}{15}$ albo $-\\frac{8}{15}$"],
          poprawna: 2,
        },
        {
          nr: "30",
          tresc: "Dla kąta $\\alpha$ prawdziwe są równości $\\sin\\alpha = \\frac{4}{5}$ i $\\cos\\alpha = -\\frac{3}{5}$. Wtedy $\\operatorname{tg}\\alpha$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-\\frac{4}{3}$", "$\\frac{4}{3}$", "$-\\frac{3}{4}$", "$-\\frac{4}{5}$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "31",
          punkty: 3,
          tresc: "Kąt rozwarty $\\alpha$ spełnia warunek $\\cos\\alpha = -\\frac{8}{17}$. Oblicz $\\sin\\alpha$ i $\\operatorname{tg}\\alpha$ oraz $\\operatorname{ctg}\\alpha$ (poza wymaganiami matury podstawowej). **Zapisz obliczenia.**",
          rozwiazanie: "Z jedynki trygonometrycznej: $\\sin^2\\alpha = 1 - \\cos^2\\alpha = 1 - \\frac{64}{289} = \\frac{225}{289}$.\n\nKąt rozwarty leży w II ćwiartce, w której sinus jest dodatni, więc $\\sin\\alpha = \\frac{15}{17}$.\n\n$\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\frac{15}{17} : \\left(-\\frac{8}{17}\\right) = -\\frac{15}{8}$.\n\n$\\operatorname{ctg}\\alpha = \\frac{1}{\\operatorname{tg}\\alpha} = -\\frac{8}{15}$.\n\nOdpowiedź: $\\sin\\alpha = \\frac{15}{17}$, $\\operatorname{tg}\\alpha = -\\frac{15}{8}$, $\\operatorname{ctg}\\alpha = -\\frac{8}{15}$.",
        },
        {
          nr: "32",
          punkty: 2,
          tresc: "Wykaż, że dla każdego kąta $\\alpha$ prawdziwa jest równość $(1-\\sin\\alpha)(1+\\sin\\alpha)=\\cos^2\\alpha$. **Zapisz obliczenia.**",
          rozwiazanie: "Lewą stronę przekształcamy wzorem skróconego mnożenia na różnicę kwadratów: $(1-\\sin\\alpha)(1+\\sin\\alpha) = 1 - \\sin^2\\alpha$.\n\nZ jedynki trygonometrycznej $\\sin^2\\alpha + \\cos^2\\alpha = 1$, więc $1 - \\sin^2\\alpha = \\cos^2\\alpha$.\n\nLewa strona jest równa prawej, co kończy dowód.\n\nOdpowiedź: $(1-\\sin\\alpha)(1+\\sin\\alpha)=\\cos^2\\alpha$ dla każdego kąta $\\alpha$.",
        },
        {
          nr: "33",
          punkty: 3,
          tresc: "Kąt ostry $\\alpha$ spełnia warunek $\\operatorname{tg}\\alpha = \\frac{3}{4}$. Oblicz $\\sin\\alpha\\cdot\\cos\\alpha$. **Zapisz obliczenia.**",
          rozwiazanie: "Ze wzoru $\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}$ mamy $\\sin\\alpha = \\frac{3}{4}\\cos\\alpha$.\n\nPodstawiamy do jedynki trygonometrycznej: $\\left(\\frac{3}{4}\\cos\\alpha\\right)^2 + \\cos^2\\alpha = 1$, czyli $\\frac{9}{16}\\cos^2\\alpha + \\cos^2\\alpha = \\frac{25}{16}\\cos^2\\alpha = 1$.\n\nStąd $\\cos^2\\alpha = \\frac{16}{25}$, a dla kąta ostrego $\\cos\\alpha = \\frac{4}{5}$. Wtedy $\\sin\\alpha = \\frac{3}{4}\\cdot\\frac{4}{5} = \\frac{3}{5}$.\n\n$\\sin\\alpha\\cdot\\cos\\alpha = \\frac{3}{5}\\cdot\\frac{4}{5} = \\frac{12}{25}$.\n\nOdpowiedź: $\\frac{12}{25}$.",
        },
      ],
      generatory: [
        {
          id: "tozsamosci-druga-funkcja",
          nazwa: "Druga funkcja",
          opis: "Znasz sinus albo cosinus kąta i ćwiartkę – oblicz inną funkcję tego kąta.",
          generuj(r) {
            for (;;) {
              let [a, b, c] = r.pick(TROJKI);
              if (r.chance()) [a, b] = [b, a];
              const cw = r.int(1, 4);
              const sx = cw === 1 || cw === 4 ? 1 : -1, sy = cw <= 2 ? 1 : -1;
              const sn = q(sy * a, c), cs = q(sx * b, c);
              const dane = r.chance() ? "sin" : "cos";
              const inna = dane === "sin" ? "cos" : "sin";
              const szuk = r.pick([inna, "tg", "ctg"]);
              const wartosci = { sin: sn, cos: cs, tg: sn.div(cs), ctg: cs.div(sn) };
              const w = wartosci[szuk];
              if (!ladna(w)) continue;
              const opis = ["Kąt $\\alpha$ jest ostry", "Kąt $\\alpha$ jest rozwarty", "Kąt $\\alpha$ leży w III ćwiartce układu współrzędnych", "Kąt $\\alpha$ leży w IV ćwiartce układu współrzędnych"][cw - 1];
              const wd = wartosci[dane], wi = wartosci[inna];
              const rozwiazanie = [
                `Z jedynki trygonometrycznej: $${F[inna]}^2\\alpha = 1 - ${F[dane]}^2\\alpha = 1 - \\left(${wd.tex()}\\right)^2 = ${wi.mul(wi).tex()}$.`,
                `Kąt leży w ${KW[cw - 1]} ćwiartce, więc $${F[inna]}\\alpha ${wi.ujemna ? "<" : ">"} 0$ i $${F[inna]}\\alpha = ${wi.tex()}$.`,
              ];
              if (szuk === "tg") rozwiazanie.push(`$\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} = ${sn.tex()} : ${nawias(cs)} = ${w.tex()}$.`);
              if (szuk === "ctg") rozwiazanie.push(`$\\operatorname{ctg}\\alpha = \\frac{\\cos\\alpha}{\\sin\\alpha} = ${cs.tex()} : ${nawias(sn)} = ${w.tex()}$.`);
              return {
                tresc: zPoza(cw > 2 || szuk === "ctg", `${opis} i $${F[dane]}\\alpha = ${wd.tex()}$. Oblicz $${F[szuk]}\\alpha$.`),
                pola: [{ id: "w", typ: "liczba", etykieta: `$${F[szuk]}\\alpha =$` }],
                odpowiedz: { w },
                wynik: `$${F[szuk]}\\alpha = ${w.tex()}$`,
                rozwiazanie,
              };
            }
          },
        },
        {
          id: "tozsamosci-wyrazenie-tg",
          nazwa: "Wyrażenie z tangensa",
          opis: "Znasz tg α – oblicz wartość ułamka z sin α i cos α, dzieląc licznik i mianownik przez cos α.",
          generuj(r) {
            for (;;) {
              const t = q(r.znak() * r.int(1, 5), r.int(1, 3));
              const a = r.int(1, 4), b = r.int(1, 4), c = r.int(1, 4), d = r.int(1, 4);
              const minus = r.chance(0.4);
              const mianownik = t.mul(c).add(minus ? -d : d);
              if (mianownik.zero) continue;
              const wynik = t.mul(a).add(b).div(mianownik);
              if (!ladna(wynik)) continue;
              const znak = minus ? "-" : "+";
              const wspT = t.n === -1 ? "-" : wsp(t.n);
              const dana = t.calkowita && r.chance() ? `\\sin\\alpha = ${wspT}\\cos\\alpha` : `\\operatorname{tg}\\alpha = ${t.tex()}`;
              const wyrazenie = `\\frac{${wsp(a)}\\sin\\alpha + ${wsp(b)}\\cos\\alpha}{${wsp(c)}\\sin\\alpha ${znak} ${wsp(d)}\\cos\\alpha}`;
              const rozwiazanie = [];
              if (dana.startsWith("\\sin")) rozwiazanie.push(`Dzielimy równość przez $\\cos\\alpha$ (nie jest ono równe $0$, bo wtedy też $\\sin\\alpha = 0$, a to niemożliwe): $\\operatorname{tg}\\alpha = ${t.tex()}$.`);
              rozwiazanie.push(
                `Dzielimy licznik i mianownik przez $\\cos\\alpha$: $\\frac{${wsp(a)}\\operatorname{tg}\\alpha + ${b}}{${wsp(c)}\\operatorname{tg}\\alpha ${znak} ${d}}$.`,
                `Podstawiamy $\\operatorname{tg}\\alpha = ${t.tex()}$: $\\frac{${a === 1 ? "" : `${a}\\cdot `}${nawias(t)} + ${b}}{${c === 1 ? "" : `${c}\\cdot `}${nawias(t)} ${znak} ${d}}$.`,
                `Wynik: $${wynik.tex()}$.`,
              );
              return {
                tresc: `Dla kąta $\\alpha$ spełniony jest warunek $${dana}$. Oblicz wartość wyrażenia $${wyrazenie}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                odpowiedz: { w: wynik },
                wynik: `$${wynik.tex()}$`,
                rozwiazanie,
              };
            }
          },
        },
        {
          id: "tozsamosci-dwa-katy",
          nazwa: "Tangens kąta ostrego i rozwartego",
          opis: "Znasz sinus kąta z przedziału od 0° do 180° – oblicz tangens dla kąta ostrego i dla kąta rozwartego.",
          generuj(r) {
            for (;;) {
              const [a, b, c] = r.pick(TROJKI);
              const [s, k] = r.chance() ? [a, b] : [b, a];
              const sn = q(s, c), cs = q(k, c), tg = sn.div(cs);
              if (!ladna(tg)) continue;
              const lit = r.pick(["\\alpha", "\\beta", "\\varphi"]);
              const pola = [
                { id: "o", typ: "liczba", etykieta: `$\\operatorname{tg}${lit}$ (kąt ostry) $=$` },
                { id: "r", typ: "liczba", etykieta: `$\\operatorname{tg}${lit}$ (kąt rozwarty) $=$` },
              ];
              const odwrotnie = r.chance();
              if (odwrotnie) pola.reverse();
              return {
                tresc: `Kąt $${lit}$ spełnia warunki $0^\\circ<${lit}<180^\\circ$ i $\\sin${lit} = ${sn.tex()}$. Oblicz $\\operatorname{tg}${lit}$ dla kąta ${odwrotnie ? "rozwartego i dla kąta ostrego" : "ostrego i dla kąta rozwartego"}.`,
                pola,
                odpowiedz: { o: tg, r: tg.neg() },
                wynik: `$\\operatorname{tg}${lit} = ${tg.tex()}$ (kąt ostry) albo $\\operatorname{tg}${lit} = ${tg.neg().tex()}$ (kąt rozwarty)`,
                rozwiazanie: [
                  `Z jedynki trygonometrycznej: $\\cos^2${lit} = 1 - \\sin^2${lit} = 1 - \\left(${sn.tex()}\\right)^2 = ${cs.mul(cs).tex()}$.`,
                  `Kąt ostry: $\\cos${lit} = ${cs.tex()}$, więc $\\operatorname{tg}${lit} = \\frac{\\sin${lit}}{\\cos${lit}} = ${sn.tex()} : ${cs.tex()} = ${tg.tex()}$.`,
                  `Kąt rozwarty: $\\cos${lit} = ${cs.neg().tex()}$, więc $\\operatorname{tg}${lit} = ${sn.tex()} : \\left(${cs.neg().tex()}\\right) = ${tg.neg().tex()}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5.4
    {
      id: "redukcyjne",
      nazwa: "Wybrane wzory redukcyjne",
      sciaga: [
        {
          nazwa: "Wzory dla 180° − α",
          slownie: "Kąt z II ćwiartki zapisujemy jako $180^\\circ-\\alpha$ z kątem ostrym $\\alpha$. Nazwa funkcji się nie zmienia, a znak wynika z II ćwiartki: sinus jest dodatni, cosinus i tangens ujemne.",
          tex: "\\sin(180^\\circ-\\alpha)=\\sin\\alpha\\qquad\\cos(180^\\circ-\\alpha)=-\\cos\\alpha\\qquad\\operatorname{tg}(180^\\circ-\\alpha)=-\\operatorname{tg}\\alpha",
          rysunek: `<svg viewBox="0 0 340 170"><path class="l" d="M20 140H322M170 162V8"/><path class="l" d="M316 136L322 140L316 144M166 14L170 8L174 14"/><path class="p" d="M240.5 80.9V140M99.5 80.9V140M99.5 80.9H240.5"/><path class="a" d="M170 140L240.5 80.9M170 140L99.5 80.9"/><path class="l" d="M196 140A26 26 0 0 0 189.9 123.3"/><path class="l" d="M144 140A26 26 0 0 1 150.1 123.3"/><path class="p" d="M224 140A54 54 0 0 0 128.6 105.3"/><circle class="k" cx="240.5" cy="80.9" r="4"/><circle class="k" cx="99.5" cy="80.9" r="4"/><text class="t" x="247.5" y="74.9">P = (x, y)</text><text class="t" x="92.5" y="74.9" text-anchor="end">P′ = (−x, y)</text><text class="ta" x="208" y="135" text-anchor="middle">α</text><text class="ta" x="130" y="135" text-anchor="middle">α</text><text class="tm" x="170" y="112" text-anchor="middle">180° − α</text><text class="tm" x="240.5" y="154" text-anchor="middle">x</text><text class="tm" x="99.5" y="154" text-anchor="middle">−x</text><text class="tm" x="247.5" y="114.4">y</text></svg>`,
          litery: "$\\alpha$ – kąt ostry. Punkty $P=(x,y)$ i $P'=(-x,y)$ leżą symetrycznie względem osi $OY$ na ramionach kątów $\\alpha$ i $180^\\circ-\\alpha$: mają ten sam $y$ i przeciwne $x$.",
          przyklad: "$\\sin 150^\\circ=\\sin(180^\\circ-30^\\circ)=\\sin 30^\\circ=\\frac{1}{2}$ oraz $\\cos 150^\\circ=-\\cos 30^\\circ=-\\frac{\\sqrt{3}}{2}$.",
          uwaga: "Nazwa funkcji się nie zmienia: $\\sin(180^\\circ-\\alpha)$ to $\\sin\\alpha$, a nie $\\cos\\alpha$.",
        },
        {
          nazwa: "Wartości dla 120°, 135° i 150°",
          slownie: "Zapisz kąt jako $180^\\circ-\\alpha$: $120^\\circ=180^\\circ-60^\\circ$, $135^\\circ=180^\\circ-45^\\circ$, $150^\\circ=180^\\circ-30^\\circ$. Sinus się nie zmienia, a cosinus i tangens zmieniają znak.",
          tex: "\\sin120^\\circ=\\frac{\\sqrt{3}}{2}\\qquad\\cos120^\\circ=-\\frac{1}{2}\\qquad\\operatorname{tg}120^\\circ=-\\sqrt{3}\\qquad\\sin135^\\circ=\\frac{\\sqrt{2}}{2}\\qquad\\cos135^\\circ=-\\frac{\\sqrt{2}}{2}\\qquad\\operatorname{tg}135^\\circ=-1\\qquad\\sin150^\\circ=\\frac{1}{2}\\qquad\\cos150^\\circ=-\\frac{\\sqrt{3}}{2}\\qquad\\operatorname{tg}150^\\circ=-\\frac{\\sqrt{3}}{3}",
          przyklad: "$\\cos 120^\\circ=\\cos(180^\\circ-60^\\circ)=-\\cos 60^\\circ=-\\frac{1}{2}$ oraz $\\operatorname{tg}135^\\circ=-\\operatorname{tg}45^\\circ=-1$.",
          uwaga: "Sinus kąta rozwartego jest dodatni, a cosinus i tangens są ujemne. Nie pomyl $\\sin 150^\\circ=\\frac{1}{2}$ z $\\cos 150^\\circ=-\\frac{\\sqrt{3}}{2}$.",
        },
        {
          nazwa: "Wzory dla 180° + α",
          slownie: "Kąt z III ćwiartki zapisujemy jako $180^\\circ+\\alpha$. Sinus i cosinus zmieniają znak, a tangens ma ten sam znak (III ćwiartka: tylko tangens i cotangens dodatnie).",
          tex: "\\sin(180^\\circ+\\alpha)=-\\sin\\alpha\\qquad\\cos(180^\\circ+\\alpha)=-\\cos\\alpha\\qquad\\operatorname{tg}(180^\\circ+\\alpha)=\\operatorname{tg}\\alpha",
          litery: "$\\alpha$ – kąt ostry.",
          przyklad: "$\\cos 225^\\circ=\\cos(180^\\circ+45^\\circ)=-\\cos 45^\\circ=-\\frac{\\sqrt{2}}{2}$ oraz $\\operatorname{tg}225^\\circ=\\operatorname{tg}45^\\circ=1$.",
          uwaga: "(poza wymaganiami matury podstawowej) Ten wzór dotyczy kątów większych niż $180^\\circ$.",
        },
        {
          nazwa: "Wzory dla 360° − α",
          slownie: "Kąt z IV ćwiartki zapisujemy jako $360^\\circ-\\alpha$. Cosinus się nie zmienia, a sinus i tangens zmieniają znak.",
          tex: "\\sin(360^\\circ-\\alpha)=-\\sin\\alpha\\qquad\\cos(360^\\circ-\\alpha)=\\cos\\alpha\\qquad\\operatorname{tg}(360^\\circ-\\alpha)=-\\operatorname{tg}\\alpha",
          litery: "$\\alpha$ – kąt ostry.",
          przyklad: "$\\sin 300^\\circ=\\sin(360^\\circ-60^\\circ)=-\\sin 60^\\circ=-\\frac{\\sqrt{3}}{2}$ oraz $\\cos 300^\\circ=\\cos 60^\\circ=\\frac{1}{2}$.",
          uwaga: "(poza wymaganiami matury podstawowej) Ten wzór dotyczy kątów większych niż $180^\\circ$.",
        },
        {
          nazwa: "Jak użyć wzoru",
          slownie: "Ustal ćwiartkę, odczytaj kąt ostry $\\alpha$ ze wzoru poniżej, zapisz funkcję tego kąta ze znakiem z ćwiartki i podstaw wartość. Cotangens ma te same znaki co tangens.",
          tex: "\\mathrm{II}:\\ \\alpha=180^\\circ-\\theta\\qquad\\mathrm{III}:\\ \\alpha=\\theta-180^\\circ\\qquad\\mathrm{IV}:\\ \\alpha=360^\\circ-\\theta",
          litery: "$\\theta$ – dany kąt, $\\alpha$ – kąt ostry, do którego go sprowadzamy.",
          przyklad: "Dla $\\theta=210^\\circ$ (III ćwiartka) $\\alpha=30^\\circ$, więc $\\operatorname{ctg}210^\\circ=\\operatorname{ctg}30^\\circ=\\sqrt{3}$. Dla kąta rozwartego (II ćwiartka), np. $\\theta=135^\\circ$: $\\alpha=45^\\circ$ i $\\cos 135^\\circ=-\\cos 45^\\circ$.",
          uwaga: "Dla $180^\\circ\\pm\\alpha$ i $360^\\circ-\\alpha$ funkcja nie zmienia nazwy (sinus zostaje sinusem). Zamiana na cosinus jest tylko dla $90^\\circ-\\alpha$. Wymagana jest tylko II ćwiartka; III i IV ćwiartka oraz cotangens są poza wymaganiami matury podstawowej.",
        },
      ],
      jak: [
        "Ustal, w której ćwiartce leży kąt, i sprawdź znak szukanej funkcji.",
        "Zapisz kąt jako $180^\\circ-\\alpha$ z kątem ostrym $\\alpha$ (kąt rozwarty). Kąty $180^\\circ+\\alpha$ i $360^\\circ-\\alpha$ są poza wymaganiami matury podstawowej.",
        "Zastosuj wzór redukcyjny: ta sama funkcja kąta $\\alpha$ ze znakiem z ćwiartki.",
        "Podstaw wartość dla $30^\\circ$, $45^\\circ$ lub $60^\\circ$ i wykonaj działania.",
      ],
      zadania: [
        {
          nr: "34",
          tresc: "Liczba $\\sin 150^\\circ$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-\\frac{1}{2}$", "$\\frac{\\sqrt{3}}{2}$", "$-\\frac{\\sqrt{3}}{2}$", "$\\frac{1}{2}$"],
          poprawna: 3,
        },
        {
          nr: "35",
          tresc: "(poza wymaganiami matury podstawowej) Liczba $\\cos 240^\\circ$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{2}$", "$-\\frac{\\sqrt{3}}{2}$", "$-\\frac{1}{2}$", "$\\frac{\\sqrt{3}}{2}$"],
          poprawna: 2,
        },
        {
          nr: "36",
          tresc: "(poza wymaganiami matury podstawowej) Liczba $\\operatorname{tg}315^\\circ$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$1$", "$-1$", "$-\\frac{\\sqrt{3}}{3}$", "$\\sqrt{3}$"],
          poprawna: 1,
        },
        {
          nr: "37",
          tresc: "(poza wymaganiami matury podstawowej) **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\sin 160^\\circ = \\sin 20^\\circ$", litery: "PF", poprawna: 0 },
            { tekst: "$\\cos 200^\\circ = \\cos 20^\\circ$", litery: "PF", poprawna: 1 },
            { tekst: "$\\operatorname{tg}340^\\circ = -\\operatorname{tg}20^\\circ$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "38",
          tresc: "Wartość wyrażenia $\\sin 150^\\circ + \\cos 120^\\circ + \\operatorname{tg}135^\\circ$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-1$", "$1$", "$0$", "$-2$"],
          poprawna: 0,
        },
        {
          nr: "39",
          tresc: "Liczba $\\operatorname{tg}120^\\circ$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-\\sqrt{3}$", "$\\sqrt{3}$", "$-\\frac{\\sqrt{3}}{3}$", "$-\\frac{1}{2}$"],
          poprawna: 0,
        },
        {
          nr: "40",
          tresc: "Kąt ostry $\\alpha$ spełnia warunek $\\cos\\alpha = \\frac{3}{5}$. Wtedy $\\cos(180^\\circ-\\alpha)$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-\\frac{3}{5}$", "$\\frac{3}{5}$", "$-\\frac{4}{5}$", "$\\frac{4}{5}$"],
          poprawna: 0,
        },
        {
          nr: "41",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\sin 120^\\circ = \\sin 60^\\circ$", litery: "PF", poprawna: 0 },
            { tekst: "$\\cos 135^\\circ = \\cos 45^\\circ$", litery: "PF", poprawna: 1 },
            { tekst: "$\\operatorname{tg}150^\\circ = -\\operatorname{tg}30^\\circ$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "42",
          punkty: 2,
          tresc: "(poza wymaganiami matury podstawowej) Oblicz wartość wyrażenia $\\sin 210^\\circ\\cdot\\cos 300^\\circ + \\operatorname{tg}225^\\circ\\cdot\\operatorname{ctg}135^\\circ$. **Zapisz obliczenia.**",
          rozwiazanie: "Kąty $210^\\circ$ i $225^\\circ$ leżą w III ćwiartce, $300^\\circ$ w IV, a $135^\\circ$ w II.\n\n$\\sin 210^\\circ = \\sin(180^\\circ+30^\\circ) = -\\sin 30^\\circ = -\\frac{1}{2}$ oraz $\\cos 300^\\circ = \\cos(360^\\circ-60^\\circ) = \\cos 60^\\circ = \\frac{1}{2}$.\n\n$\\operatorname{tg}225^\\circ = \\operatorname{tg}(180^\\circ+45^\\circ) = \\operatorname{tg}45^\\circ = 1$ oraz $\\operatorname{ctg}135^\\circ = \\operatorname{ctg}(180^\\circ-45^\\circ) = -\\operatorname{ctg}45^\\circ = -1$.\n\nPodstawiamy: $-\\frac{1}{2}\\cdot\\frac{1}{2} + 1\\cdot(-1) = -\\frac{1}{4} - 1 = -\\frac{5}{4}$.\n\nOdpowiedź: $-\\frac{5}{4}$.",
        },
        {
          nr: "43",
          punkty: 3,
          tresc: "(poza wymaganiami matury podstawowej) Kąt ostry $\\alpha$ spełnia warunek $\\sin\\alpha = \\frac{5}{13}$. Oblicz $\\cos(180^\\circ-\\alpha)$, $\\operatorname{tg}(180^\\circ+\\alpha)$ i $\\sin(360^\\circ-\\alpha)$. **Zapisz obliczenia.**",
          rozwiazanie: "Kąt $\\alpha$ jest ostry, więc $\\cos\\alpha > 0$ i $\\cos^2\\alpha = 1 - \\frac{25}{169} = \\frac{144}{169}$, czyli $\\cos\\alpha = \\frac{12}{13}$.\n\nStąd $\\operatorname{tg}\\alpha = \\frac{5}{13} : \\frac{12}{13} = \\frac{5}{12}$.\n\nWzory redukcyjne: $\\cos(180^\\circ-\\alpha) = -\\cos\\alpha = -\\frac{12}{13}$.\n\n$\\operatorname{tg}(180^\\circ+\\alpha) = \\operatorname{tg}\\alpha = \\frac{5}{12}$ oraz $\\sin(360^\\circ-\\alpha) = -\\sin\\alpha = -\\frac{5}{13}$.\n\nOdpowiedź: $\\cos(180^\\circ-\\alpha) = -\\frac{12}{13}$, $\\operatorname{tg}(180^\\circ+\\alpha) = \\frac{5}{12}$, $\\sin(360^\\circ-\\alpha) = -\\frac{5}{13}$.",
        },
        {
          nr: "44",
          punkty: 2,
          tresc: "Oblicz wartość wyrażenia $\\sin 150^\\circ\\cdot\\cos 120^\\circ + \\operatorname{tg}135^\\circ$. **Zapisz obliczenia.**",
          rozwiazanie: "Zapisujemy kąty w postaci $180^\\circ-\\alpha$ z kątem ostrym $\\alpha$ i stosujemy wzory: sinus się nie zmienia, a cosinus i tangens zmieniają znak.\n\n$\\sin 150^\\circ = \\sin(180^\\circ-30^\\circ) = \\sin 30^\\circ = \\frac{1}{2}$.\n\n$\\cos 120^\\circ = \\cos(180^\\circ-60^\\circ) = -\\cos 60^\\circ = -\\frac{1}{2}$.\n\n$\\operatorname{tg}135^\\circ = \\operatorname{tg}(180^\\circ-45^\\circ) = -\\operatorname{tg}45^\\circ = -1$.\n\nPodstawiamy: $\\frac{1}{2}\\cdot\\left(-\\frac{1}{2}\\right) + (-1) = -\\frac{1}{4} - 1 = -\\frac{5}{4}$.\n\nOdpowiedź: $-\\frac{5}{4}$.",
        },
        {
          nr: "45",
          punkty: 3,
          tresc: "Kąt ostry $\\alpha$ spełnia warunek $\\sin\\alpha = \\frac{3}{5}$. Oblicz $\\sin(180^\\circ-\\alpha)$, $\\cos(180^\\circ-\\alpha)$ i $\\operatorname{tg}(180^\\circ-\\alpha)$. **Zapisz obliczenia.**",
          rozwiazanie: "Kąt $\\alpha$ jest ostry, więc $\\cos\\alpha>0$. Z jedynki trygonometrycznej: $\\cos^2\\alpha = 1 - \\frac{9}{25} = \\frac{16}{25}$, czyli $\\cos\\alpha = \\frac{4}{5}$.\n\nStąd $\\operatorname{tg}\\alpha = \\frac{3}{5} : \\frac{4}{5} = \\frac{3}{4}$.\n\nWzory dla kąta rozwartego: $\\sin(180^\\circ-\\alpha) = \\sin\\alpha = \\frac{3}{5}$, $\\cos(180^\\circ-\\alpha) = -\\cos\\alpha = -\\frac{4}{5}$ oraz $\\operatorname{tg}(180^\\circ-\\alpha) = -\\operatorname{tg}\\alpha = -\\frac{3}{4}$.\n\nOdpowiedź: $\\sin(180^\\circ-\\alpha) = \\frac{3}{5}$, $\\cos(180^\\circ-\\alpha) = -\\frac{4}{5}$, $\\operatorname{tg}(180^\\circ-\\alpha) = -\\frac{3}{4}$.",
        },
      ],
      generatory: [
        {
          id: "redukcyjne-wartosc",
          nazwa: "Wartość wyrażenia",
          opis: "Oblicz wartość wyrażenia z funkcjami kątów z II, III i IV ćwiartki (np. 150°, 225°, 300°) o wyniku wymiernym.",
          generuj(r) {
            for (;;) {
              const s1 = r.pick(SKLADNIKI), s2 = r.pick(SKLADNIKI);
              if (s1 === s2) continue;
              const m1 = r.int(1, 3), m2 = r.int(1, 3);
              const plus = r.chance();
              const wynik = plus ? s1.v.mul(m1).add(s2.v.mul(m2)) : s1.v.mul(m1).sub(s2.v.mul(m2));
              if (wynik.zero || !ladna(wynik)) continue;
              const znak = plus ? "+" : "-";
              const zapis = `${wsp(m1)}${s1.t} ${znak} ${wsp(m2)}${s2.t}`;
              const lic1 = m1 === 1 ? s1.v.tex() : `${m1}\\cdot ${nawias(s1.v)}`;
              const lic2 = m2 === 1 ? nawias(s2.v) : `${m2}\\cdot ${nawias(s2.v)}`;
              return {
                tresc: zPoza(s1.poza || s2.poza, `Oblicz wartość wyrażenia $${zapis}$.`),
                pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                odpowiedz: { w: wynik },
                wynik: `$${wynik.tex()}$`,
                rozwiazanie: [
                  "Zapisujemy każdy kąt w postaci $180^\\circ - \\alpha$, $180^\\circ + \\alpha$ albo $360^\\circ - \\alpha$ z kątem ostrym $\\alpha$ i stosujemy wzory redukcyjne.",
                  `$${s1.krok}$.`,
                  `$${s2.krok}$.`,
                  `Podstawiamy: $${lic1} ${znak} ${lic2} = ${wynik.tex()}$.`,
                ],
              };
            }
          },
        },
        {
          id: "redukcyjne-z-funkcji",
          nazwa: "Funkcja kąta 180° ± α",
          opis: "Znasz funkcję kąta ostrego α – oblicz funkcję kąta 180° − α, 180° + α albo 360° − α.",
          generuj(r) {
            const d = dwieFunkcje(r);
            const cw = r.int(2, 4);
            const form = ["180^\\circ - \\alpha", "180^\\circ + \\alpha", "360^\\circ - \\alpha"][cw - 2];
            const g = d.f2;
            const s = znakF(g, cw);
            const wynik = d.w2.mul(s);
            const pref = s < 0 ? "-" : "";
            const wzor = `${F[g]}(${form}) = ${pref}${F[g]}\\alpha`;
            return {
              tresc: zPoza(cw > 2 || g === "ctg" || d.f1 === "ctg", `Kąt ostry $\\alpha$ spełnia warunek $${F[d.f1]}\\alpha = ${d.w1.tex()}$. Oblicz $${F[g]}(${form})$.`),
              pola: [{ id: "w", typ: "liczba", etykieta: `$${F[g]}(${form}) =$` }],
              odpowiedz: { w: wynik },
              wynik: `$${F[g]}(${form}) = ${wynik.tex()}$`,
              rozwiazanie: [
                `Kąt $${form}$ leży w ${KW[cw - 1]} ćwiartce, w której ${{ sin: "sinus", cos: "cosinus", tg: "tangens", ctg: "cotangens" }[g]} jest ${s < 0 ? "ujemny" : "dodatni"}, więc $${wzor}$.`,
                ...krokiTrojkat(d),
                `Zatem $${F[g]}(${form}) = ${wynik.tex()}$.`,
              ],
            };
          },
        },
        {
          id: "redukcyjne-rozwarty",
          nazwa: "Wartość wyrażenia dla 120°, 135°, 150°",
          opis: "Oblicz wartość wyrażenia z sinusem, cosinusem i tangensem kątów rozwartych 120°, 135° i 150° o wyniku wymiernym.",
          generuj(r) {
            const rozwarte = SKLADNIKI.filter((s) => !s.poza);
            for (;;) {
              const s1 = r.pick(rozwarte), s2 = r.pick(rozwarte);
              if (s1 === s2) continue;
              const m1 = r.int(1, 3), m2 = r.int(1, 3);
              const plus = r.chance();
              const wynik = plus ? s1.v.mul(m1).add(s2.v.mul(m2)) : s1.v.mul(m1).sub(s2.v.mul(m2));
              if (wynik.zero || !ladna(wynik)) continue;
              const znak = plus ? "+" : "-";
              const zapis = `${wsp(m1)}${s1.t} ${znak} ${wsp(m2)}${s2.t}`;
              const lic1 = m1 === 1 ? s1.v.tex() : `${m1}\\cdot ${nawias(s1.v)}`;
              const lic2 = m2 === 1 ? nawias(s2.v) : `${m2}\\cdot ${nawias(s2.v)}`;
              return {
                tresc: `Oblicz wartość wyrażenia $${zapis}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                odpowiedz: { w: wynik },
                wynik: `$${wynik.tex()}$`,
                rozwiazanie: [
                  "Zapisujemy każdy kąt w postaci $180^\\circ - \\alpha$ z kątem ostrym $\\alpha$: sinus się nie zmienia, a cosinus i tangens zmieniają znak.",
                  `$${s1.krok}$.`,
                  `$${s2.krok}$.`,
                  `Podstawiamy: $${lic1} ${znak} ${lic2} = ${wynik.tex()}$.`,
                ],
              };
            }
          },
        },
        {
          id: "redukcyjne-180-minus",
          nazwa: "Funkcja kąta 180° − α",
          opis: "Znasz sinus, cosinus albo tangens kąta ostrego α – oblicz funkcję kąta rozwartego 180° − α.",
          generuj(r) {
            for (;;) {
              let [a, b, c] = r.pick(TROJKI);
              if (r.chance()) [a, b] = [b, a];
              const [f1, f2] = r.shuffle(["sin", "cos", "tg"]);
              const w1 = wart(f1, a, b, c), w2 = wart(f2, a, b, c);
              if (!ladna(w2)) continue;
              const s = znakF(f2, 2);
              const wynik = w2.mul(s);
              const lit = r.pick(["\\alpha", "\\beta", "\\varphi"]);
              const wzor = `${F[f2]}(180^\\circ - ${lit}) = ${s < 0 ? "-" : ""}${F[f2]}${lit}`;
              const kroki = krokiTrojkat({ a, b, c, f1, f2, w1 }).map((t) => t.split("\\alpha").join(lit));
              return {
                tresc: `Kąt ostry $${lit}$ spełnia warunek $${F[f1]}${lit} = ${w1.tex()}$. Oblicz $${F[f2]}(180^\\circ - ${lit})$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `$${F[f2]}(180^\\circ - ${lit}) =$` }],
                odpowiedz: { w: wynik },
                wynik: `$${F[f2]}(180^\\circ - ${lit}) = ${wynik.tex()}$`,
                rozwiazanie: [
                  `Kąt $180^\\circ - ${lit}$ jest rozwarty, więc ${{ sin: "sinus się nie zmienia", cos: "cosinus zmienia znak", tg: "tangens zmienia znak" }[f2]}: $${wzor}$.`,
                  ...kroki,
                  `Zatem $${F[f2]}(180^\\circ - ${lit}) = ${wynik.tex()}$.`,
                ],
              };
            }
          },
        },
      ],
    },
  ],
};
