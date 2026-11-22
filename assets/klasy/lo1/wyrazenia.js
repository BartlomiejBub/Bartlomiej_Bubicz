// Klasa 1 (liceum i technikum) · rozdział 2 „Wyrażenia algebraiczne” – Matematyka 1, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** „Ładna” odpowiedź: mianownik co najwyżej 12. */
const ladna = (v) => Math.abs(v.n) <= 100000 && v.d <= 12;

/** Współczynnik przed literą: 1 się pomija. */
const wsp = (n) => (n === 1 ? "" : String(n));

/** Potęga w LaTeX bez wykładnika 1: pw(2, 1) = "2", pw(2, 3) = "2^{3}", pw(2, -2) = "2^{-2}". */
const pw = (podstawa, wykladnik) => (wykladnik === 1 ? `${podstawa}` : `${podstawa}^{${wykladnik}}`);

/** Długość n·√s w LaTeX: dlug(5, 3) = "5\sqrt{3}", dlug(1, 3) = "\sqrt{3}". */
const dlug = (n, s) => `${n === 1 ? "" : n}\\sqrt{${s}}`;

/** Dwumian px + c w LaTeX: lin(3, -2) = "3x - 2", lin(1, 4) = "x + 4". */
const lin = (p, c) => `${wsp(p)}x ${c < 0 ? "-" : "+"} ${Math.abs(c)}`;

/** Trójmian Ax^2 + Bx + C w LaTeX, pomija zerowe wyrazy i współczynnik 1. */
function trin(A, B, C) {
  const czesci = [];
  const dodaj = (c, lit) => {
    if (c === 0) return;
    const abs = Math.abs(c);
    const tekst = lit && abs === 1 ? lit : `${abs}${lit}`;
    czesci.push(czesci.length === 0 ? `${c < 0 ? "-" : ""}${tekst}` : `${c < 0 ? "-" : "+"} ${tekst}`);
  };
  dodaj(A, "x^2");
  dodaj(B, "x");
  dodaj(C, "");
  return czesci.join(" ") || "0";
}

/** Logarytm w LaTeX: dla podstawy 10 logarytm dziesiętny. */
const lg = (a) => (a === 10 ? "\\log" : `\\log_{${a}}`);

const jestPierwsza = (n) => {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
};

const nwd = (a, b) => (b ? nwd(b, a % b) : Math.abs(a));

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 2.1–2.2
    {
      id: "potegi-pierwiastki",
      nazwa: "Potęga o wykładniku naturalnym. Pierwiastki",
      sciaga: [
        {
          nazwa: "Potęga o wykładniku naturalnym",
          slownie: "Potęga $a^n$ to iloczyn $n$ czynników równych $a$. Dodatkowo $a^1 = a$, a dla $a \\neq 0$ jest $a^0 = 1$.",
          tex: "a^n=a\\cdot a\\cdot\\ldots\\cdot a",
          litery: "$a$ – podstawa, $n$ – wykładnik (liczba czynników).",
          przyklad: "$2^4 = 2\\cdot 2\\cdot 2\\cdot 2 = 16$ oraz $(-2)^3 = -8$.",
          uwaga: "$(-3)^2 = 9$, ale $-3^2 = -9$: potęga dotyczy tylko $3$. Potęga liczby ujemnej o wykładniku parzystym jest dodatnia, o nieparzystym – ujemna.",
        },
        {
          nazwa: "Działania na potęgach",
          slownie: "Przy tych samych podstawach wykładniki dodajemy (mnożenie), odejmujemy (dzielenie) albo mnożymy (potęga potęgi). Przy tych samych wykładnikach można mnożyć lub dzielić podstawy.",
          tex: "a^m\\cdot a^n=a^{m+n}\\qquad a^m:a^n=a^{m-n}\\qquad(a^m)^n=a^{m\\cdot n}\\qquad(a\\cdot b)^n=a^n\\cdot b^n\\qquad\\left(\\frac{a}{b}\\right)^n=\\frac{a^n}{b^n}",
          litery: "$a$, $b$ – podstawy, $m$, $n$ – wykładniki naturalne (w dzieleniu $m \\geq n$, $a, b \\neq 0$).",
          przyklad: "$2^3 \\cdot 2^4 = 2^7 = 128$ oraz $(3^2)^2 = 3^4 = 81$.",
          uwaga: "Wzory mnożenia i dzielenia działają tylko przy tych samych podstawach: $2^3 \\cdot 3^2 \\neq 6^5$. Sumy potęg nie upraszczamy: $2^3 + 2^4 \\neq 2^7$.",
        },
        {
          nazwa: "Pierwiastek kwadratowy",
          slownie: "Pierwiastek arytmetyczny $\\sqrt{a}$ to nieujemna liczba, której kwadrat jest równy $a$. Istnieje tylko dla $a \\geq 0$.",
          tex: "\\sqrt{a}=b\\iff b\\geq 0\\ \\text{i}\\ b^2=a",
          litery: "$a \\geq 0$ – liczba pod pierwiastkiem, $b$ – wynik.",
          przyklad: "$\\sqrt{49} = 7$, bo $7^2 = 49$ i $7 \\geq 0$; $\\sqrt{0} = 0$.",
          uwaga: "$\\sqrt{16} = 4$, a nie $\\pm 4$. Zawsze $\\sqrt{a^2} = |a|$, np. $\\sqrt{(-5)^2} = 5$.",
        },
        {
          nazwa: "Pierwiastek sześcienny",
          slownie: "Pierwiastek stopnia nieparzystego istnieje dla każdej liczby, także ujemnej: $\\sqrt[3]{a}$ to liczba, której sześcian jest równy $a$.",
          tex: "\\sqrt[3]{a}=b\\iff b^3=a",
          przyklad: "$\\sqrt[3]{-27} = -3$, bo $(-3)^3 = -27$; $\\sqrt[3]{8} = 2$.",
          uwaga: "Pierwiastek stopnia parzystego z liczby ujemnej nie istnieje: $\\sqrt{-4}$ nie ma sensu, ale $\\sqrt[3]{-8} = -2$.",
        },
        {
          nazwa: "Działania na pierwiastkach",
          slownie: "Pierwiastek z iloczynu to iloczyn pierwiastków, a z ilorazu – iloraz pierwiastków. Dzięki temu wyłączamy czynnik spod pierwiastka.",
          tex: "\\sqrt{a}\\cdot\\sqrt{b}=\\sqrt{a\\cdot b}\\qquad\\frac{\\sqrt{a}}{\\sqrt{b}}=\\sqrt{\\frac{a}{b}}",
          litery: "$a \\geq 0$, $b > 0$ (przy dzieleniu).",
          przyklad: "$\\sqrt{12} = \\sqrt{4\\cdot 3} = 2\\sqrt{3}$ oraz $\\sqrt{18}\\cdot\\sqrt{2} = \\sqrt{36} = 6$.",
          uwaga: "$\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$, np. $\\sqrt{9 + 16} = 5$, a $\\sqrt{9} + \\sqrt{16} = 7$.",
        },
      ],
      jak: [
        "Zapisz potęgi (i pierwiastki) tak, żeby miały te same podstawy, np. $9 = 3^2$, $6 = 2\\cdot 3$.",
        "Zastosuj prawa działań na potęgach: wykładniki dodaj, odejmij albo pomnóż.",
        "Pod pierwiastkiem szukaj czynnika będącego kwadratem liczby ($4$, $9$, $16$, $25$, …) i wyłącz go przed pierwiastek.",
        "Dopiero na końcu zredukuj wyrazy podobne i oblicz wartość.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Liczba $3^4 \\cdot 3^2 : 3^5$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$3^{5}$", "$3$", "$9$", "$1$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Wartość wyrażenia $(-2)^3 + (-3)^2 - 2^4$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$17$", "$1$", "$-33$", "$-15$"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "Wyrażenie $\\left(x^3\\right)^4 \\cdot x^2 : x^5$ jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$x^{4}$", "$x^{19}$", "$x^{9}$", "$x^{14}$"],
          poprawna: 2,
        },
        {
          nr: "4",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$2^3 \\cdot 2^4 = 4^7$", litery: "PF", poprawna: 1 },
            { tekst: "$\\left(2^3\\right)^2 = 2^6$", litery: "PF", poprawna: 0 },
            { tekst: "$-3^2 = 9$", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "5",
          tresc: "Liczba $\\sqrt{49} + \\sqrt[3]{-27}$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-2$", "$4$", "$10$", "nie istnieje"],
          poprawna: 1,
        },
        {
          nr: "6",
          tresc: "Liczba $\\sqrt{18}\\cdot\\sqrt{2}$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$\\sqrt{20}$", "$3\\sqrt{2}$", "$36$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "7",
          punkty: 2,
          tresc: "Oblicz wartość wyrażenia $\\frac{2^5 \\cdot 9^2}{6^4}$. **Zapisz obliczenia.**",
          rozwiazanie: "Zapisujemy podstawy za pomocą liczb $2$ i $3$: $9^2 = \\left(3^2\\right)^2 = 3^4$ oraz $6^4 = (2\\cdot 3)^4 = 2^4 \\cdot 3^4$.\n\nPodstawiamy: $\\frac{2^5 \\cdot 3^4}{2^4 \\cdot 3^4}$.\n\nDzielimy potęgi o tych samych podstawach: $2^{5-4} \\cdot 3^{4-4} = 2 \\cdot 1 = 2$.\n\nOdpowiedź: $2$.",
        },
        {
          nr: "8",
          punkty: 2,
          tresc: "Zapisz liczbę $\\sqrt{75} - \\sqrt{12} + \\sqrt{27}$ w postaci $k\\sqrt{3}$. **Zapisz obliczenia.**",
          rozwiazanie: "Wyłączamy czynniki spod pierwiastków: $\\sqrt{75} = \\sqrt{25\\cdot 3} = 5\\sqrt{3}$, $\\sqrt{12} = \\sqrt{4\\cdot 3} = 2\\sqrt{3}$, $\\sqrt{27} = \\sqrt{9\\cdot 3} = 3\\sqrt{3}$.\n\nPodstawiamy: $5\\sqrt{3} - 2\\sqrt{3} + 3\\sqrt{3} = (5 - 2 + 3)\\sqrt{3}$.\n\nOdpowiedź: $6\\sqrt{3}$.",
        },
      ],
      generatory: [
        {
          id: "potegi-dzialania",
          nazwa: "Działania na potęgach",
          opis: "Oblicz wartość wyrażenia z potęgami o wykładnikach naturalnych, korzystając z praw działań na potęgach.",
          generuj(r) {
            for (;;) {
              const rodzaj = r.int(0, 2);
              if (rodzaj === 0) {
                const b = r.pick([2, 3, 5, 10]);
                const m = r.int(2, 6), n = r.int(2, 6), k = r.int(1, m + n - 2);
                const e = m + n - k;
                const v = b ** e;
                if (e < 2 || v > 100000) continue;
                return {
                  tresc: `Oblicz wartość wyrażenia $${b}^{${m}} \\cdot ${b}^{${n}} : ${pw(b, k)}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                  odpowiedz: { w: q(v) },
                  wynik: `$${v}$`,
                  rozwiazanie: [
                    `Podstawy są takie same, więc przy mnożeniu dodajemy wykładniki, a przy dzieleniu je odejmujemy.`,
                    `$${b}^{${m}} \\cdot ${b}^{${n}} : ${pw(b, k)} =${b}^{${m}+${n}-${k}} = ${b}^{${e}}$.`,
                    `$${b}^{${e}} = ${v}$.`,
                  ],
                };
              }
              if (rodzaj === 1) {
                const b = r.pick([2, 3, 5, 10]);
                const m = r.int(2, 4), n = r.int(2, 4), k = r.int(1, m * n - 2);
                const e = m * n - k;
                const v = b ** e;
                if (e < 2 || v > 100000) continue;
                return {
                  tresc: `Oblicz wartość wyrażenia $\\left(${b}^{${m}}\\right)^{${n}} : ${pw(b, k)}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                  odpowiedz: { w: q(v) },
                  wynik: `$${v}$`,
                  rozwiazanie: [
                    `Przy potędze potęgi mnożymy wykładniki: $\\left(${b}^{${m}}\\right)^{${n}} = ${b}^{${m}\\cdot ${n}} = ${b}^{${m * n}}$.`,
                    `Przy dzieleniu odejmujemy wykładniki: $${b}^{${m * n}} : ${pw(b, k)} =${b}^{${m * n}-${k}} = ${b}^{${e}}$.`,
                    `$${b}^{${e}} = ${v}$.`,
                  ],
                };
              }
              const [a, c] = r.pick([[2, 5], [2, 3], [5, 4], [3, 4], [4, 5], [5, 6]]);
              const n = r.int(2, 4);
              const iloczyn = a * c;
              const v = iloczyn ** n;
              if (v > 100000) continue;
              const [x, y] = r.chance() ? [a, c] : [c, a];
              return {
                tresc: `Oblicz wartość wyrażenia $${x}^{${n}} \\cdot ${y}^{${n}}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                odpowiedz: { w: q(v) },
                wynik: `$${v}$`,
                rozwiazanie: [
                  `Wykładniki są takie same, więc mnożymy podstawy: $${x}^{${n}} \\cdot ${y}^{${n}} = (${x}\\cdot ${y})^{${n}}$.`,
                  `$(${x}\\cdot ${y})^{${n}} = ${iloczyn}^{${n}}$.`,
                  `$${iloczyn}^{${n}} = ${v}$.`,
                ],
              };
            }
          },
        },
        {
          id: "pierwiastki-wylaczanie",
          nazwa: "Wyłączanie spod pierwiastka",
          opis: "Wyłącz czynniki spod pierwiastków i zapisz sumę w postaci k√s – podaj współczynnik k.",
          generuj(r) {
            for (;;) {
              const s = r.pick([2, 3, 5, 6, 7]);
              const il = r.chance(0.4) ? 2 : 3;
              const wsp3 = Array.from({ length: il }, () => r.int(2, 6));
              const znaki = [1, ...Array.from({ length: il - 1 }, () => r.pick([1, -1]))];
              const k = wsp3.reduce((suma, c, i) => suma + znaki[i] * c, 0);
              if (k < 1) continue;
              const skladnik = (c) => `\\sqrt{${c * c * s}}`;
              const wyrazenie = wsp3.map((c, i) => (i === 0 ? skladnik(c) : `${znaki[i] < 0 ? "-" : "+"} ${skladnik(c)}`)).join(" ");
              const wylaczone = wsp3.map((c) => `$${skladnik(c)} = \\sqrt{${c * c} \\cdot ${s}} = ${dlug(c, s)}$`).join(", ");
              const zsumowane = wsp3.map((c, i) => (i === 0 ? `${c}` : `${znaki[i] < 0 ? "-" : "+"} ${c}`)).join(" ");
              return {
                tresc: `Zapisz liczbę $${wyrazenie}$ w postaci $k\\sqrt{${s}}$. Podaj $k$.`,
                pola: [{ id: "k", typ: "liczba", etykieta: `$k$ (liczba $k\\sqrt{${s}}$)` }],
                odpowiedz: { k: q(k) },
                wynik: `$${dlug(k, s)}$, czyli $k = ${k}$`,
                rozwiazanie: [
                  `Wyłączamy czynniki spod pierwiastków: ${wylaczone}.`,
                  `Wszystkie składniki mają ten sam pierwiastek $\\sqrt{${s}}$, więc dodajemy współczynniki: $(${zsumowane})\\sqrt{${s}}$.`,
                  `Stąd $${dlug(k, s)}$, więc $k = ${k}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 2.3–2.4
    {
      id: "wyrazenia-wzory",
      nazwa: "Działania na wyrażeniach algebraicznych. Wzory skróconego mnożenia",
      sciaga: [
        {
          nazwa: "Redukcja i mnożenie nawiasów",
          slownie: "Wyrazy podobne (z tą samą literą w tej samej potędze) dodajemy i odejmujemy. Nawiasy rozwijamy, mnożąc każdy wyraz przez każdy.",
          tex: "a(b+c)=ab+ac\\qquad(a+b)(c+d)=ac+ad+bc+bd",
          przyklad: "$3(x-2) - (x-5) = 3x - 6 - x + 5 = 2x - 1$.",
          uwaga: "Minus przed nawiasem zmienia znak każdego wyrazu w nawiasie: $-(x - 5) = -x + 5$.",
        },
        {
          nazwa: "Kwadrat sumy i różnicy",
          slownie: "Kwadrat sumy to kwadrat pierwszego składnika, podwojony iloczyn składników i kwadrat drugiego. Przy różnicy środkowy wyraz ma znak minus.",
          tex: "(a+b)^2=a^2+2ab+b^2\\qquad(a-b)^2=a^2-2ab+b^2",
          litery: "$a$, $b$ – dowolne liczby lub wyrażenia.",
          przyklad: "$(x+3)^2 = x^2 + 6x + 9$ oraz $(2x-1)^2 = 4x^2 - 4x + 1$.",
          uwaga: "$(a+b)^2 \\neq a^2 + b^2$ – brakuje podwojonego iloczynu $2ab$.",
        },
        {
          nazwa: "Różnica kwadratów",
          slownie: "Różnicę kwadratów zamieniamy na iloczyn różnicy i sumy tych samych wyrażeń, i odwrotnie.",
          tex: "a^2-b^2=(a-b)(a+b)",
          przyklad: "$(x-4)(x+4) = x^2 - 16$ oraz $9x^2 - 25 = (3x-5)(3x+5)$.",
          uwaga: "Wzór dotyczy różnicy kwadratów; sumy $a^2 + b^2$ w ten sposób nie rozłożysz.",
        },
        {
          nazwa: "Rachunki na dużych liczbach",
          slownie: "Liczbę bliską okrągłej zapisz jako sumę lub różnicę i użyj wzoru skróconego mnożenia – policzysz bez kalkulatora.",
          przyklad: "$101^2 = (100+1)^2 = 10201$ oraz $49\\cdot 51 = (50-1)(50+1) = 2500 - 1 = 2499$.",
          uwaga: "Trzy składniki wzoru, $a^2$, $2ab$ i $b^2$, licz osobno i dopiero potem dodaj.",
        },
      ],
      jak: [
        "Rozwiń kwadraty sumy i różnicy ze wzorów, nie opuszczając środkowego wyrazu $2ab$.",
        "Gdy przed nawiasem stoi minus, zmień znaki wszystkich wyrazów w nawiasie.",
        "Zredukuj wyrazy podobne: osobno $x^2$, osobno $x$, osobno liczby.",
        "Jeśli trzeba obliczyć wartość dla danej liczby, najpierw uprość, a dopiero potem podstaw.",
      ],
      zadania: [
        {
          nr: "9",
          tresc: "Wyrażenie $(x+4)^2 - (x-4)^2$ jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$16x$", "$0$", "$8x$", "$32$"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "Wyrażenie $(2x-3)^2$ jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$4x^2-9$", "$4x^2-6x+9$", "$4x^2-12x+9$", "$2x^2-12x+9$"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "Wartość wyrażenia $103^2 - 97^2$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$36$", "$200$", "$2400$", "$1200$"],
          poprawna: 3,
        },
        {
          nr: "12",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$(x+y)^2 = x^2 + y^2$ dla dowolnych liczb $x$, $y$", litery: "PF", poprawna: 1 },
            { tekst: "$x^2 - 25 = (x-5)(x+5)$", litery: "PF", poprawna: 0 },
            { tekst: "$(x-3)^2 = x^2 - 6x + 9$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "13",
          tresc: "Liczby $a$ i $b$ spełniają warunki $a + b = 7$ oraz $ab = 10$. Wtedy $a^2 + b^2$ jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$39$", "$29$", "$69$", "$49$"],
          poprawna: 1,
        },
        {
          nr: "14",
          tresc: "Po uproszczeniu wyrażenie $(x-2)(x+2) - (x-1)^2$ jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-5$", "$2x-3$", "$-2x-5$", "$2x-5$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "15",
          punkty: 2,
          tresc: "Uprość wyrażenie $(3x+1)^2 - (3x-1)(3x+1) - 6x$. **Zapisz obliczenia.**",
          rozwiazanie: "Kwadrat sumy: $(3x+1)^2 = 9x^2 + 6x + 1$.\n\nRóżnica kwadratów: $(3x-1)(3x+1) = 9x^2 - 1$.\n\nPodstawiamy i zmieniamy znaki w nawiasie: $9x^2 + 6x + 1 - 9x^2 + 1 - 6x$.\n\nRedukujemy wyrazy podobne: $(9x^2 - 9x^2) + (6x - 6x) + (1 + 1) = 2$.\n\nOdpowiedź: $2$.",
        },
        {
          nr: "16",
          punkty: 2,
          tresc: "Oblicz wartość wyrażenia $\\left(\\sqrt{7}+2\\right)^2 + \\left(\\sqrt{7}-2\\right)^2$. **Zapisz obliczenia.**",
          rozwiazanie: "Kwadrat sumy: $\\left(\\sqrt{7}+2\\right)^2 = 7 + 4\\sqrt{7} + 4 = 11 + 4\\sqrt{7}$.\n\nKwadrat różnicy: $\\left(\\sqrt{7}-2\\right)^2 = 7 - 4\\sqrt{7} + 4 = 11 - 4\\sqrt{7}$.\n\nDodajemy: $11 + 4\\sqrt{7} + 11 - 4\\sqrt{7} = 22$.\n\nOdpowiedź: $22$.",
        },
      ],
      generatory: [
        {
          id: "wyrazenia-wzory-liczby",
          nazwa: "Wzory na liczbach",
          opis: "Oblicz bez kalkulatora kwadrat liczby bliskiej okrągłej, iloczyn albo różnicę kwadratów, używając wzoru skróconego mnożenia.",
          generuj(r) {
            const rodzaj = r.int(0, 2);
            if (rodzaj === 0) {
              const B = r.pick([20, 30, 40, 50, 60, 70, 80, 90, 100, 200]);
              const s = r.int(1, 3);
              const minus = r.chance();
              const x = minus ? B - s : B + s;
              const v = x * x;
              const znak = minus ? "-" : "+";
              return {
                tresc: `Oblicz $${x}^2$, korzystając ze wzoru skróconego mnożenia.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `$${x}^2 =$` }],
                odpowiedz: { w: q(v) },
                wynik: `$${v}$`,
                rozwiazanie: [
                  `Zapisujemy $${x} = ${B} ${znak} ${s}$.`,
                  `Wzór: $(a ${znak} b)^2 = a^2 ${znak} 2ab + b^2$, więc $${x}^2 = ${B}^2 ${znak} 2\\cdot ${B}\\cdot ${s} + ${s}^2$.`,
                  `$${x}^2 = ${B * B} ${znak} ${2 * B * s} + ${s * s} = ${v}$.`,
                ],
              };
            }
            if (rodzaj === 1) {
              const m = r.pick([20, 30, 40, 50, 60, 70, 80, 90, 100]);
              const s = r.int(1, 3);
              const v = m * m - s * s;
              return {
                tresc: `Oblicz $${m - s}\\cdot ${m + s}$, korzystając ze wzoru skróconego mnożenia.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `$${m - s}\\cdot ${m + s} =$` }],
                odpowiedz: { w: q(v) },
                wynik: `$${v}$`,
                rozwiazanie: [
                  `Liczby są równo oddalone od $${m}$: $${m - s} = ${m} - ${s}$ i $${m + s} = ${m} + ${s}$.`,
                  `Wzór: $(a - b)(a + b) = a^2 - b^2$, więc $${m - s}\\cdot ${m + s} = ${m}^2 - ${s}^2$.`,
                  `$${m}^2 - ${s}^2 = ${m * m} - ${s * s} = ${v}$.`,
                ],
              };
            }
            const S = r.pick([50, 100, 200]);
            const d = 2 * r.int(1, 10);
            const a = (S + d) / 2, b = (S - d) / 2;
            const v = S * d;
            return {
              tresc: `Oblicz $${a}^2 - ${b}^2$, korzystając ze wzoru skróconego mnożenia.`,
              pola: [{ id: "w", typ: "liczba", etykieta: `$${a}^2 - ${b}^2 =$` }],
              odpowiedz: { w: q(v) },
              wynik: `$${v}$`,
              rozwiazanie: [
                `Różnica kwadratów: $a^2 - b^2 = (a - b)(a + b)$.`,
                `$${a}^2 - ${b}^2 = (${a} - ${b})(${a} + ${b}) = ${d}\\cdot ${S}$.`,
                `$${d}\\cdot ${S} = ${v}$.`,
              ],
            };
          },
        },
        {
          id: "wyrazenia-wspolczynnik",
          nazwa: "Współczynnik po uproszczeniu",
          opis: "Uprość wyrażenie z kwadratem dwumianu i iloczynem (rx − s)(rx + s) i podaj wskazany współczynnik.",
          generuj(r) {
            for (;;) {
              const p = r.int(1, 4), c = r.intBez(-5, 5, 0);
              const rr = r.int(1, 4), s = r.int(1, 5);
              const minus = r.chance();
              if (minus && p === rr) continue;
              const A = p * p + (minus ? -1 : 1) * rr * rr;
              const B = 2 * p * c;
              const C = c * c + (minus ? 1 : -1) * s * s;
              const szuk = r.int(0, 2);
              const wartosc = [A, B, C][szuk];
              const nazwa = ["współczynnik przy $x^2$", "współczynnik przy $x$", "wyraz wolny"][szuk];
              const t1 = trin(p * p, B, c * c);
              const t2 = trin(rr * rr, 0, -s * s);
              return {
                tresc: `Po uproszczeniu wyrażenia $(${lin(p, c)})^2 ${minus ? "-" : "+"} (${lin(rr, -s)})(${lin(rr, s)})$ otrzymujemy trójmian postaci $Ax^2 + Bx + C$. Podaj ${nazwa}.`,
                pola: [{ id: "w", typ: "liczba", etykieta: ["$A =$", "$B =$", "$C =$"][szuk] }],
                odpowiedz: { w: q(wartosc) },
                wynik: `$${["A", "B", "C"][szuk]} = ${wartosc}$`,
                rozwiazanie: [
                  `Kwadrat dwumianu: $(${lin(p, c)})^2 = ${t1}$.`,
                  `Różnica kwadratów: $(${lin(rr, -s)})(${lin(rr, s)}) = ${t2}$.`,
                  minus
                    ? `Odejmujemy (zmieniamy znaki w nawiasie): $${t1} - (${t2}) = ${trin(A, B, C)}$.`
                    : `Dodajemy: $${t1} + ${t2} = ${trin(A, B, C)}$.`,
                  `Szukany ${nazwa === "wyraz wolny" ? "wyraz wolny" : nazwa} to $${wartosc}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 2.5–2.7
    {
      id: "potegi-wykladniki",
      nazwa: "Potęga o wykładniku całkowitym, wymiernym i rzeczywistym",
      sciaga: [
        {
          nazwa: "Wykładnik całkowity ujemny",
          slownie: "Potęga z ujemnym wykładnikiem to odwrotność potęgi z wykładnikiem przeciwnym. Ułamek podnosimy do ujemnej potęgi, odwracając go.",
          tex: "a^{-n}=\\frac{1}{a^{n}}\\qquad\\left(\\frac{a}{b}\\right)^{-n}=\\left(\\frac{b}{a}\\right)^{n}",
          litery: "$a, b \\neq 0$, $n$ – liczba naturalna.",
          przyklad: "$2^{-3} = \\frac{1}{8}$ oraz $\\left(\\frac{2}{3}\\right)^{-2} = \\left(\\frac{3}{2}\\right)^{2} = \\frac{9}{4}$.",
          uwaga: "$2^{-3}$ nie jest równe $-8$ ani $-6$. Wykładnik ujemny nie zmienia znaku liczby, tylko ją odwraca.",
        },
        {
          nazwa: "Wykładnik wymierny",
          slownie: "Potęga o wykładniku $\\frac{1}{n}$ to pierwiastek $n$-tego stopnia. Przy wykładniku $\\frac{m}{n}$ pierwiastek możesz wziąć przed podniesieniem do potęgi $m$.",
          tex: "a^{\\frac{1}{n}}=\\sqrt[n]{a}\\qquad a^{\\frac{m}{n}}=\\left(\\sqrt[n]{a}\\right)^{m}",
          litery: "$a > 0$, $m$ – liczba całkowita, $n$ – liczba naturalna, $n \\geq 2$.",
          przyklad: "$8^{\\frac{2}{3}} = \\left(\\sqrt[3]{8}\\right)^2 = 4$ oraz $25^{-\\frac{1}{2}} = \\frac{1}{\\sqrt{25}} = \\frac{1}{5}$.",
          uwaga: "Wykładnik $\\frac{1}{2}$ oznacza pierwiastek, a nie dzielenie przez $2$: $16^{\\frac{1}{2}} = 4$, a nie $8$.",
        },
        {
          nazwa: "Prawa działań i wykładnik rzeczywisty",
          slownie: "Potęga o dodatniej podstawie i wykładniku niewymiernym (np. $3^{\\sqrt{2}}$) jest określona, a wszystkie prawa działań na potęgach zachowują ważność dla dowolnych wykładników rzeczywistych.",
          tex: "a^r\\cdot a^s=a^{r+s}\\qquad\\frac{a^r}{a^s}=a^{r-s}\\qquad(a^r)^s=a^{r\\cdot s}\\qquad(a\\cdot b)^r=a^r\\cdot b^r",
          litery: "$a, b > 0$, $r, s$ – dowolne liczby rzeczywiste.",
          przyklad: "$3^{\\sqrt{2}} \\cdot 3^{2-\\sqrt{2}} = 3^{2} = 9$ oraz $\\left(2^{\\sqrt{3}}\\right)^{\\sqrt{3}} = 2^{3} = 8$.",
          uwaga: "Przy mnożeniu potęg o tej samej podstawie dodajemy wykładniki, a podstawa zostaje bez zmian.",
        },
      ],
      jak: [
        "Ujemny wykładnik zamień na odwrotność: $a^{-n} = \\frac{1}{a^n}$.",
        "Wykładnik ułamkowy zamień na pierwiastek: mianownik to stopień pierwiastka, licznik to potęga.",
        "Zapisz podstawy jako potęgi tej samej liczby i zastosuj prawa działań.",
        "Na końcu oblicz wartość i skróć ułamek.",
      ],
      zadania: [
        {
          nr: "17",
          tresc: "Liczba $2^{-3} + 2^{-1}$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-10$", "$\\frac{1}{16}$", "$\\frac{5}{8}$", "$\\frac{1}{10}$"],
          poprawna: 2,
        },
        {
          nr: "18",
          tresc: "Liczba $\\left(\\frac{2}{3}\\right)^{-3}$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{27}{8}$", "$\\frac{8}{27}$", "$-\\frac{8}{27}$", "$-2$"],
          poprawna: 0,
        },
        {
          nr: "19",
          tresc: "Liczba $16^{\\frac{3}{4}}$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$", "$64$", "$8$", "$4$"],
          poprawna: 2,
        },
        {
          nr: "20",
          tresc: "Liczba $25^{-\\frac{1}{2}} \\cdot 8^{\\frac{2}{3}}$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$20$", "$\\frac{4}{25}$", "$\\frac{5}{4}$", "$\\frac{4}{5}$"],
          poprawna: 3,
        },
        {
          nr: "21",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$4^{-1} = -4$", litery: "PF", poprawna: 1 },
            { tekst: "$8^{\\frac{1}{3}} = 2$", litery: "PF", poprawna: 0 },
            { tekst: "$2^{\\sqrt{3}} \\cdot 2^{2-\\sqrt{3}} = 4$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "22",
          tresc: "Liczba $\\left(3^{\\sqrt{2}}\\right)^{\\sqrt{2}}$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$3^{2\\sqrt{2}}$", "$9$", "$3^{\\sqrt{2}}$", "$6$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "23",
          punkty: 2,
          tresc: "Oblicz wartość wyrażenia $\\left(\\frac{1}{2}\\right)^{-3} + 27^{\\frac{2}{3}} - 4^{-\\frac{1}{2}}$. **Zapisz obliczenia.**",
          rozwiazanie: "Pierwszy składnik: $\\left(\\frac{1}{2}\\right)^{-3} = 2^3 = 8$.\n\nDrugi składnik: $27^{\\frac{2}{3}} = \\left(\\sqrt[3]{27}\\right)^2 = 3^2 = 9$.\n\nTrzeci składnik: $4^{-\\frac{1}{2}} = \\frac{1}{\\sqrt{4}} = \\frac{1}{2}$.\n\nDodajemy i odejmujemy: $8 + 9 - \\frac{1}{2} = 17 - \\frac{1}{2} = \\frac{33}{2}$.\n\nOdpowiedź: $\\frac{33}{2}$.",
        },
        {
          nr: "24",
          punkty: 3,
          tresc: "Zapisz liczbę $\\frac{\\sqrt[3]{4}\\cdot 2^{\\frac{1}{3}}}{\\sqrt{2}}$ w postaci potęgi liczby $2$ i oblicz jej wartość. **Zapisz obliczenia.**",
          rozwiazanie: "Zapisujemy pierwiastki jako potęgi liczby $2$: $\\sqrt[3]{4} = 4^{\\frac{1}{3}} = \\left(2^2\\right)^{\\frac{1}{3}} = 2^{\\frac{2}{3}}$ oraz $\\sqrt{2} = 2^{\\frac{1}{2}}$.\n\nLicznik: $2^{\\frac{2}{3}} \\cdot 2^{\\frac{1}{3}} = 2^{\\frac{2}{3}+\\frac{1}{3}} = 2^1 = 2$.\n\nDzielimy: $\\frac{2^1}{2^{\\frac{1}{2}}} = 2^{1-\\frac{1}{2}} = 2^{\\frac{1}{2}} = \\sqrt{2}$.\n\nOdpowiedź: $2^{\\frac{1}{2}} = \\sqrt{2}$.",
        },
      ],
      generatory: [
        {
          id: "wykladniki-ujemne",
          nazwa: "Wykładnik ujemny",
          opis: "Oblicz wartość wyrażenia z potęgami o ujemnych wykładnikach całkowitych.",
          generuj(r) {
            for (;;) {
              const rodzaj = r.int(0, 2);
              if (rodzaj === 0) {
                const [p, s] = r.pick([[1, 2], [1, 3], [2, 3], [3, 2], [2, 5], [3, 4], [4, 3], [5, 2], [1, 4], [5, 3]]);
                const n = r.int(2, 3);
                const v = q(s, p).pow(n);
                if (!ladna(v)) continue;
                return {
                  tresc: `Oblicz wartość wyrażenia $\\left(\\frac{${p}}{${s}}\\right)^{-${n}}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                  odpowiedz: { w: v },
                  wynik: `$${v.tex()}$`,
                  rozwiazanie: [
                    `Ujemny wykładnik oznacza odwrócenie ułamka: $\\left(\\frac{${p}}{${s}}\\right)^{-${n}} = \\left(\\frac{${s}}{${p}}\\right)^{${n}}$.`,
                    `Podnosimy licznik i mianownik do potęgi $${n}$: $\\frac{${s}^{${n}}}{${p}^{${n}}} = \\frac{${s ** n}}{${p ** n}}$.`,
                    `Wynik: $${v.tex()}$.`,
                  ],
                };
              }
              if (rodzaj === 1) {
                const b = r.pick([2, 3, 4, 5, 10]), c = r.pick([2, 3, 4, 5, 10]);
                let m = r.int(1, 3), n = r.int(1, 3);
                const minus = r.chance(0.4);
                let v = q(1, b ** m).add(minus ? q(1, c ** n).neg() : q(1, c ** n));
                let [b1, m1, b2, n1] = [b, m, c, n];
                if (v.ujemna) { [b1, m1, b2, n1] = [c, n, b, m]; v = v.neg(); }
                if (!ladna(v) || v.zero) continue;
                const znak = minus ? "-" : "+";
                return {
                  tresc: `Oblicz wartość wyrażenia $${b1}^{-${m1}} ${znak} ${b2}^{-${n1}}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                  odpowiedz: { w: v },
                  wynik: `$${v.tex()}$`,
                  rozwiazanie: [
                    `Zamieniamy wykładniki ujemne na odwrotności: $${b1}^{-${m1}} = \\frac{1}{${b1 ** m1}}$ oraz $${b2}^{-${n1}} = \\frac{1}{${b2 ** n1}}$.`,
                    `Dodajemy lub odejmujemy ułamki: $\\frac{1}{${b1 ** m1}} ${znak} \\frac{1}{${b2 ** n1}}$.`,
                    `Wynik: $${v.tex()}$.`,
                  ],
                };
              }
              const b = r.pick([2, 3, 5]);
              const e = r.pick([-3, -2, 2, 3]);
              const m = r.int(1, 5), n = m + e;
              if (n < 1) continue;
              const v = q(b).pow(e);
              if (!ladna(v)) continue;
              return {
                tresc: `Oblicz wartość wyrażenia $\\frac{${b}^{-${m}}}{${b}^{-${n}}}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                odpowiedz: { w: v },
                wynik: `$${v.tex()}$`,
                rozwiazanie: [
                  `Podstawy są takie same, więc odejmujemy wykładniki: $${b}^{-${m}-(-${n})} = ${b}^{${-m + n}}$.`,
                  `Obliczamy: $${b}^{${e}} = ${v.tex()}$.`,
                ],
              };
            }
          },
        },
        {
          id: "wykladniki-wymierne",
          nazwa: "Wykładnik wymierny",
          opis: "Oblicz potęgę o wykładniku ułamkowym albo iloczyn potęg tej samej liczby o wykładnikach wymiernych lub niewymiernych.",
          generuj(r) {
            for (;;) {
              const rodzaj = r.int(0, 2);
              if (rodzaj === 0) {
                const rt = r.pick([2, 3, 4, 5, 10]);
                const st = r.int(2, 4);
                const p = r.pick([1, 2, 3, -1, -2, -3]);
                if (nwd(p, st) !== 1) continue;
                const podstawa = rt ** st;
                if (podstawa > 1000) continue;
                const v = q(rt).pow(p);
                if (!ladna(v)) continue;
                const wykl = `${p < 0 ? "-" : ""}\\frac{${Math.abs(p)}}{${st}}`;
                return {
                  tresc: `Oblicz wartość wyrażenia $${podstawa}^{${wykl}}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                  odpowiedz: { w: v },
                  wynik: `$${v.tex()}$`,
                  rozwiazanie: [
                    `Zapisujemy podstawę jako potęgę: $${podstawa} = ${rt}^{${st}}$.`,
                    `Mnożymy wykładniki: $\\left(${rt}^{${st}}\\right)^{${wykl}} = ${pw(rt, p)}$.`,
                    `Obliczamy: $${pw(rt, p)} = ${v.tex()}$.`,
                  ],
                };
              }
              if (rodzaj === 1) {
                const a = r.pick([2, 3, 5]);
                const st = r.int(2, 4);
                const u = r.int(1, st - 1);
                const k = r.int(1, 3);
                if (nwd(u, st) !== 1) continue;
                const w2 = k * st - u;
                const v = q(a).pow(k);
                return {
                  tresc: `Oblicz wartość wyrażenia $${a}^{\\frac{${u}}{${st}}} \\cdot ${a}^{\\frac{${w2}}{${st}}}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                  odpowiedz: { w: v },
                  wynik: `$${v.tex()}$`,
                  rozwiazanie: [
                    `Podstawy są takie same, więc dodajemy wykładniki: $\\frac{${u}}{${st}} + \\frac{${w2}}{${st}} = \\frac{${u + w2}}{${st}} = ${k}$.`,
                    `Zatem iloczyn jest równy $${pw(a, k)}$.`,
                    `$${pw(a, k)} = ${v.tex()}$.`,
                  ],
                };
              }
              const a = r.pick([2, 3, 5]);
              const s = r.pick([2, 3, 5]);
              const k = r.int(2, 3);
              const v = q(a).pow(k);
              return {
                tresc: `Oblicz wartość wyrażenia $${a}^{\\sqrt{${s}}} \\cdot ${a}^{${k}-\\sqrt{${s}}}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                odpowiedz: { w: v },
                wynik: `$${v.tex()}$`,
                rozwiazanie: [
                  `Podstawy są takie same, więc dodajemy wykładniki: $\\sqrt{${s}} + \\left(${k} - \\sqrt{${s}}\\right) = ${k}$.`,
                  `Zatem iloczyn jest równy $${a}^{${k}}$.`,
                  `$${a}^{${k}} = ${v.tex()}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 2.8–2.9
    {
      id: "logarytmy",
      nazwa: "Logarytmy: określenie i zastosowania",
      sciaga: [
        {
          nazwa: "Definicja logarytmu",
          slownie: "Logarytm $\\log_a b$ to wykładnik, do którego trzeba podnieść $a$, żeby otrzymać $b$.",
          tex: "\\log_a b=c\\iff a^c=b",
          litery: "$a > 0$, $a \\neq 1$ – podstawa, $b > 0$ – liczba logarytmowana, $c$ – wynik.",
          przyklad: "$\\log_2 8 = 3$, bo $2^3 = 8$; $\\log_3 \\frac{1}{9} = -2$, bo $3^{-2} = \\frac{1}{9}$.",
          uwaga: "Logarytm zera i liczby ujemnej nie istnieje, bo potęga o dodatniej podstawie jest zawsze dodatnia.",
        },
        {
          nazwa: "Szczególne wartości",
          slownie: "Logarytm z jedynki to zero, logarytm z podstawy to jeden, a podniesienie podstawy do logarytmu daje liczbę logarytmowaną.",
          tex: "\\log_a1=0\\qquad\\log_aa=1\\qquad a^{\\log_a b}=b",
          przyklad: "$\\log_5 1 = 0$, $\\log_7 7 = 1$ oraz $7^{\\log_7 3} = 3$.",
        },
        {
          nazwa: "Logarytm iloczynu i ilorazu",
          slownie: "Logarytm iloczynu to suma logarytmów, a logarytm ilorazu – ich różnica (przy tej samej podstawie).",
          tex: "\\log_a(b\\cdot c)=\\log_a b+\\log_a c\\qquad\\log_a\\frac{b}{c}=\\log_a b-\\log_a c",
          litery: "$a > 0$, $a \\neq 1$, $b, c > 0$.",
          przyklad: "$\\log_6 2 + \\log_6 3 = \\log_6 6 = 1$ oraz $\\log_2 40 - \\log_2 5 = \\log_2 8 = 3$.",
          uwaga: "$\\log_a (b + c) \\neq \\log_a b + \\log_a c$ – sumy pod logarytmem nie rozdzielamy.",
        },
        {
          nazwa: "Logarytm potęgi",
          slownie: "Wykładnik potęgi pod logarytmem wychodzi przed logarytm jako współczynnik.",
          tex: "\\log_a b^n=n\\cdot\\log_a b",
          litery: "$b > 0$, $n$ – dowolna liczba rzeczywista.",
          przyklad: "$2\\log_3 6 - \\log_3 4 = \\log_3 36 - \\log_3 4 = \\log_3 9 = 2$.",
          uwaga: "Współczynnik przed logarytmem przenosisz do wykładnika liczby logarytmowanej, a nie podstawy.",
        },
        {
          nazwa: "Logarytm dziesiętny",
          slownie: "Logarytm przy podstawie $10$ zapisujemy bez podstawy: $\\log x = \\log_{10} x$.",
          przyklad: "$\\log 1000 = 3$, bo $10^3 = 1000$, oraz $\\log 0{,}01 = -2$.",
        },
      ],
      jak: [
        "Sprawdź, czy liczba logarytmowana jest potęgą podstawy (np. $8 = 2^3$, $\\frac{1}{9} = 3^{-2}$).",
        "Przy działaniach na logarytmach o tej samej podstawie zamień sumy i różnice na jeden logarytm.",
        "Współczynnik przed logarytmem wprowadź jako wykładnik: $n\\log_a b = \\log_a b^n$.",
        "Zapisz liczbę pod logarytmem jako potęgę podstawy i odczytaj wynik.",
      ],
      zadania: [
        {
          nr: "25",
          tresc: "Liczba $\\log_3 81$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$27$", "$4$", "$3$", "$\\frac{1}{4}$"],
          poprawna: 1,
        },
        {
          nr: "26",
          tresc: "Liczba $\\log_2 \\frac{1}{8}$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$\\frac{1}{3}$", "$-3$", "$-6$"],
          poprawna: 2,
        },
        {
          nr: "27",
          tresc: "Liczba $\\log_5 10 + \\log_5 \\frac{5}{2}$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\log_5 12{,}5$", "$3$", "$2$", "$\\log_5 4$"],
          poprawna: 2,
        },
        {
          nr: "28",
          tresc: "Liczba $2\\log_3 6 - \\log_3 4$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\log_3 8$", "$\\log_3 32$", "$\\log_3 18$", "$2$"],
          poprawna: 3,
        },
        {
          nr: "29",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\log_4 2 = 2$", litery: "PF", poprawna: 1 },
            { tekst: "$\\log_2 8 = 3$", litery: "PF", poprawna: 0 },
            { tekst: "$\\log 100 + \\log 10 = 3$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "30",
          tresc: "Rozwiązaniem równania $\\log_x 16 = 4$, gdzie $x > 0$ i $x \\neq 1$, jest liczba: **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$", "$4$", "$-2$", "$64$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "31",
          punkty: 2,
          tresc: "Oblicz wartość wyrażenia $\\log_2 24 - \\log_2 3 + \\log_3 \\sqrt{3}$. **Zapisz obliczenia.**",
          rozwiazanie: "Różnica logarytmów o tej samej podstawie: $\\log_2 24 - \\log_2 3 = \\log_2 \\frac{24}{3} = \\log_2 8 = 3$.\n\nPonieważ $\\sqrt{3} = 3^{\\frac{1}{2}}$, mamy $\\log_3 \\sqrt{3} = \\frac{1}{2}$.\n\nDodajemy: $3 + \\frac{1}{2} = \\frac{7}{2}$.\n\nOdpowiedź: $\\frac{7}{2}$.",
        },
        {
          nr: "32",
          punkty: 3,
          tresc: "Oblicz $\\log_4 32 + \\log_{\\frac{1}{3}} 9$. **Zapisz obliczenia.**",
          rozwiazanie: "Niech $x = \\log_4 32$. Wtedy $4^x = 32$, czyli $2^{2x} = 2^5$, więc $2x = 5$ i $x = \\frac{5}{2}$.\n\nNiech $y = \\log_{\\frac{1}{3}} 9$. Wtedy $\\left(\\frac{1}{3}\\right)^y = 9$, czyli $3^{-y} = 3^2$, więc $y = -2$.\n\nDodajemy: $\\frac{5}{2} + (-2) = \\frac{1}{2}$.\n\nOdpowiedź: $\\frac{1}{2}$.",
        },
      ],
      generatory: [
        {
          id: "logarytmy-wartosc",
          nazwa: "Wartość logarytmu",
          opis: "Oblicz logarytm liczby będącej potęgą podstawy (także o wyniku ułamkowym).",
          generuj(r) {
            for (;;) {
              if (r.chance(0.6)) {
                const a = r.pick([2, 3, 4, 5, 6, 7, 10]);
                const k = r.pick([-3, -2, -1, 0, 1, 2, 3, 4]);
                const arg = q(a).pow(k);
                if (arg.n > 1000 || arg.d > 1000) continue;
                return {
                  tresc: `Oblicz $${lg(a)} ${arg.tex()}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: `$${lg(a)} ${arg.tex()} =$` }],
                  odpowiedz: { w: q(k) },
                  wynik: `$${k}$`,
                  rozwiazanie: [
                    `Z definicji: $${lg(a)} ${arg.tex()} = c$ oznacza $${a}^{c} = ${arg.tex()}$.`,
                    k === 1
                      ? `Liczba logarytmowana jest równa podstawie: $${a}^{c} = ${a}$ dla $c = 1$.`
                      : `Zapisujemy liczbę logarytmowaną jako potęgę podstawy: $${arg.tex()} = ${pw(a, k)}$.`,
                    `Zatem $c = ${k}$.`,
                  ],
                };
              }
              const rt = r.pick([2, 3]);
              const u = r.int(2, 4), v = r.int(1, 5);
              if (u === v) continue;
              const podst = rt ** u, arg = rt ** v;
              if (podst > 100 || arg > 300) continue;
              const w = q(v, u);
              return {
                tresc: `Oblicz $\\log_{${podst}} ${arg}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `$\\log_{${podst}} ${arg} =$` }],
                odpowiedz: { w },
                wynik: `$${w.tex()}$`,
                rozwiazanie: [
                  `Zapisujemy podstawę i liczbę logarytmowaną jako potęgi liczby $${rt}$: $${podst} = ${rt}^{${u}}$${v === 1 ? `, a $${arg} = ${rt}$ (pierwsza potęga)` : `, $${arg} = ${rt}^{${v}}$`}.`,
                  `Niech $\\log_{${podst}} ${arg} = c$. Wtedy $\\left(${rt}^{${u}}\\right)^c = ${pw(rt, v)}$, czyli $${rt}^{${u}c} = ${pw(rt, v)}$.`,
                  `Stąd $${u}c = ${v}$, więc $c = ${w.tex()}$.`,
                ],
              };
            }
          },
        },
        {
          id: "logarytmy-dzialania",
          nazwa: "Suma i różnica logarytmów",
          opis: "Oblicz wartość wyrażenia z logarytmami o tej samej podstawie, korzystając ze wzorów na iloczyn, iloraz i potęgę.",
          generuj(r) {
            for (;;) {
              const a = r.pick([2, 3, 5, 6, 10]);
              const k = r.int(1, 3);
              const A = a ** k;
              if (A > 1000) continue;
              const koniec = k === 1
                ? [`Liczba $${A}$ jest równa podstawie, więc logarytm jest równy $1$.`]
                : [`Zapisujemy $${A} = ${pw(a, k)}$.`, `$${lg(a)} ${pw(a, k)} = ${k}$.`];
              const rodzaj = r.int(0, 2);
              if (rodzaj === 0) {
                const kand = [];
                for (let x = 2; x < A; x++) if (A % x === 0 && A / x >= 2) kand.push([x, A / x]);
                if (!kand.length) continue;
                const [x, y] = r.pick(kand);
                return {
                  tresc: `Oblicz $${lg(a)} ${x} + ${lg(a)} ${y}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                  odpowiedz: { w: q(k) },
                  wynik: `$${k}$`,
                  rozwiazanie: [
                    `Suma logarytmów o tej samej podstawie to logarytm iloczynu: $${lg(a)} ${x} + ${lg(a)} ${y} = ${lg(a)} (${x}\\cdot ${y}) = ${lg(a)} ${A}$.`,
                    ...koniec,
                  ],
                };
              }
              if (rodzaj === 1) {
                const y = r.int(2, 6);
                const x = y * A;
                if (x > 1000) continue;
                return {
                  tresc: `Oblicz $${lg(a)} ${x} - ${lg(a)} ${y}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                  odpowiedz: { w: q(k) },
                  wynik: `$${k}$`,
                  rozwiazanie: [
                    `Różnica logarytmów o tej samej podstawie to logarytm ilorazu: $${lg(a)} ${x} - ${lg(a)} ${y} = ${lg(a)} \\frac{${x}}{${y}} = ${lg(a)} ${A}$.`,
                    ...koniec,
                  ],
                };
              }
              const kand = [];
              for (let x = 2; x <= 9; x++) {
                if (x === a) continue;
                for (const n of [2, 3]) {
                  if (A % (x ** n) === 0 && A / x ** n >= 2) kand.push([x, n, A / x ** n]);
                }
              }
              if (!kand.length) continue;
              const [x, n, y] = r.pick(kand);
              return {
                tresc: `Oblicz $${n}${lg(a)} ${x} + ${lg(a)} ${y}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                odpowiedz: { w: q(k) },
                wynik: `$${k}$`,
                rozwiazanie: [
                  `Współczynnik wprowadzamy jako wykładnik: $${n}${lg(a)} ${x} = ${lg(a)} ${x}^{${n}} = ${lg(a)} ${x ** n}$.`,
                  `Suma logarytmów to logarytm iloczynu: $${lg(a)} ${x ** n} + ${lg(a)} ${y} = ${lg(a)} (${x ** n}\\cdot ${y}) = ${lg(a)} ${A}$.`,
                  ...koniec,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 2.10–2.12
    {
      id: "zdania-dowody",
      nazwa: "Zdania, zaprzeczenia i dowody",
      sciaga: [
        {
          nazwa: "Zdanie i jego zaprzeczenie",
          slownie: "Zdanie w logice jest prawdziwe albo fałszywe. Zaprzeczenie zdania ma zawsze przeciwną wartość logiczną.",
          tex: "\\neg(x>a)\\iff x\\leq a\\qquad\\neg(x\\geq a)\\iff x<a",
          litery: "$\\neg p$ – zaprzeczenie zdania $p$ (czytamy: „nieprawda, że $p$”).",
          przyklad: "Zaprzeczeniem „$x > 3$” jest „$x \\leq 3$”, a zaprzeczeniem „$x = 3$” jest „$x \\neq 3$”.",
          uwaga: "Zaprzeczeniem „$x > 3$” nie jest „$x < 3$” – gubimy wtedy $x = 3$.",
        },
        {
          nazwa: "Koniunkcja i alternatywa",
          slownie: "Koniunkcja „$p$ i $q$” jest prawdziwa tylko wtedy, gdy oba zdania są prawdziwe. Alternatywa „$p$ lub $q$” jest fałszywa tylko wtedy, gdy oba zdania są fałszywe.",
          tex: "p\\land q\\qquad p\\lor q",
          litery: "$p$, $q$ – zdania, $\\land$ – „i”, $\\lor$ – „lub”.",
          przyklad: "Zdanie „$5$ jest nieparzysta i $5 > 7$” jest fałszywe, a „$5$ jest nieparzysta lub $5 > 7$” – prawdziwe.",
          uwaga: "W matematyce „lub” nie wyklucza sytuacji, w której oba zdania są prawdziwe.",
        },
        {
          nazwa: "Implikacja i równoważność",
          slownie: "Implikacja „jeśli $p$, to $q$” jest fałszywa tylko wtedy, gdy $p$ jest prawdziwe, a $q$ fałszywe. Równoważność „$p$ wtedy i tylko wtedy, gdy $q$” jest prawdziwa, gdy oba zdania mają tę samą wartość logiczną.",
          tex: "p\\Rightarrow q\\qquad p\\Leftrightarrow q",
          przyklad: "„Jeśli $4 > 5$, to $4 > 6$” jest prawdziwe, bo poprzednik jest fałszywy, a „jeśli $6$ jest podzielne przez $3$, to $6$ jest nieparzyste” – fałszywe, bo poprzednik jest prawdziwy, a następnik fałszywy.",
          uwaga: "Z fałszywego poprzednika wynika każde zdanie: implikacja z fałszywym $p$ jest zawsze prawdziwa.",
        },
        {
          nazwa: "Zaprzeczenia zdań złożonych",
          slownie: "Zaprzeczenie koniunkcji to alternatywa zaprzeczeń, a zaprzeczenie alternatywy to koniunkcja zaprzeczeń (prawa De Morgana). Zaprzeczenie „dla każdego” to „istnieje takie, że nie”.",
          tex: "\\neg(p\\land q)\\iff\\neg p\\lor\\neg q\\qquad\\neg(p\\lor q)\\iff\\neg p\\land\\neg q\\qquad\\neg(p\\Rightarrow q)\\iff p\\land\\neg q",
          przyklad: "Zaprzeczeniem „$x > 1$ i $x < 5$” jest „$x \\leq 1$ lub $x \\geq 5$”.",
          uwaga: "Przy zaprzeczaniu zmienia się spójnik („i” na „lub”) i zaprzecza się każdą część.",
        },
        {
          nazwa: "Twierdzenie i dowód",
          slownie: "Twierdzenie ma postać „jeśli założenie, to teza”. Dowodzimy go ogólnie, dla dowolnych liczb (litery zamiast konkretnych wartości), a obalamy jednym kontrprzykładem.",
          przyklad: "Suma dwóch liczb parzystych $2k$ i $2m$ jest parzysta: $2k + 2m = 2(k+m)$.",
          uwaga: "Sprawdzenie kilku liczb nie jest dowodem. Wystarczy jeden kontrprzykład, żeby twierdzenie okazało się fałszywe.",
        },
      ],
      jak: [
        "Zapisz zdanie symbolami i wskaż spójnik („i”, „lub”, „jeśli … to”).",
        "Zaprzeczając zdaniu złożonemu, zmień spójnik i zaprzecz każdej części.",
        "Wartość logiczną zdania złożonego ustal z wartości części: oceń $p$, oceń $q$, zastosuj regułę spójnika.",
        "W dowodzie algebraicznym zapisz wyrażenie przez litery i przekształć je do postaci, w której widać tezę (np. $8\\cdot(\\ldots)$).",
      ],
      zadania: [
        {
          nr: "33",
          tresc: "Zaprzeczeniem nierówności $x \\geq 2$ jest: **Wybierz właściwą odpowiedź.**",
          opcje: ["$x \\leq 2$", "$x > 2$", "$x < 2$", "$x \\leq -2$"],
          poprawna: 2,
        },
        {
          nr: "34",
          tresc: "Zaprzeczeniem zdania „$x > 1$ i $x < 5$” jest zdanie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$x \\leq 1$ lub $x \\geq 5$", "$x \\leq 1$ i $x \\geq 5$", "$x < 1$ lub $x > 5$", "$x \\leq 1$ lub $x < 5$"],
          poprawna: 0,
        },
        {
          nr: "35",
          tresc: "Zaprzeczeniem zdania „Każda liczba pierwsza jest nieparzysta” jest zdanie: **Wybierz właściwą odpowiedź.**",
          opcje: [
            "Każda liczba pierwsza jest parzysta.",
            "Istnieje liczba pierwsza nieparzysta.",
            "Istnieje liczba pierwsza, która jest parzysta.",
            "Istnieje liczba nieparzysta, która nie jest pierwsza.",
          ],
          poprawna: 2,
        },
        {
          nr: "36",
          tresc: "Zdanie $p$ jest fałszywe, a zdanie $q$ jest prawdziwe. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$p \\land q$", litery: "PF", poprawna: 1 },
            { tekst: "$p \\Rightarrow q$", litery: "PF", poprawna: 0 },
            { tekst: "$q \\Rightarrow p$", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "37",
          tresc: "Które z poniższych zdań jest fałszywe? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "Jeśli $2 > 3$, to $1 > 5$.",
            "$7$ jest liczbą pierwszą lub $7 > 10$.",
            "$3^2 = 9$ i $\\sqrt{9} = 3$.",
            "Jeśli $6$ jest podzielne przez $3$, to $6$ jest nieparzyste.",
          ],
          poprawna: 3,
        },
        {
          nr: "38",
          tresc: "Aby obalić twierdzenie „Jeśli liczba jest podzielna przez $3$, to jest podzielna przez $6$”, wystarczy wskazać liczbę: **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$", "$10$", "$9$", "$18$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "39",
          punkty: 2,
          tresc: "Wykaż, że dla każdej liczby całkowitej $n$ liczba $(n+3)^2 - (n-1)^2$ jest podzielna przez $8$. **Zapisz obliczenia.**",
          rozwiazanie: "Stosujemy wzór na różnicę kwadratów: $(n+3)^2 - (n-1)^2 = \\big((n+3) - (n-1)\\big)\\big((n+3) + (n-1)\\big)$.\n\nUpraszczamy nawiasy: $(n + 3 - n + 1)(n + 3 + n - 1) = 4\\cdot(2n + 2)$.\n\nWyłączamy czynnik: $4\\cdot(2n+2) = 4\\cdot 2\\cdot(n+1) = 8(n+1)$.\n\nLiczba $n+1$ jest całkowita, więc $8(n+1)$ jest podzielne przez $8$, co kończy dowód.",
        },
        {
          nr: "40",
          punkty: 2,
          tresc: "Zapisz zaprzeczenie zdania „Dla każdej liczby rzeczywistej $x$ zachodzi $x^2 > x$”. Które z tych dwóch zdań – wyjściowe czy jego zaprzeczenie – jest prawdziwe? Odpowiedź uzasadnij. **Zapisz obliczenia.**",
          rozwiazanie: "Zaprzeczeniem zdania „dla każdego $x$ zachodzi $x^2 > x$” jest zdanie „istnieje taka liczba rzeczywista $x$, że $x^2 \\leq x$” (zaprzeczamy też nierówność).\n\nSzukamy przykładu: dla $x = 0$ mamy $0^2 = 0$ i $0 \\leq 0$, więc nierówność $x^2 \\leq x$ jest spełniona.\n\nZatem zaprzeczenie jest prawdziwe, a zdanie wyjściowe – fałszywe (liczba $0$ jest kontrprzykładem).\n\nOdpowiedź: zaprzeczenie „istnieje $x$, że $x^2 \\leq x$” jest prawdziwe, a zdanie wyjściowe fałszywe.",
        },
      ],
      generatory: [
        {
          id: "zdania-zaprzeczenie",
          nazwa: "Zaprzeczenie nierówności",
          opis: "Wybierz zaprzeczenie nierówności albo koniunkcji lub alternatywy dwóch nierówności.",
          generuj(r) {
            const TEX = { ">": ">", ">=": "\\geq", "<": "<", "<=": "\\leq" };
            const NEG = { ">": "<=", "<=": ">", ">=": "<", "<": ">=" };
            const ODWR = { ">": "<", "<": ">", ">=": "<=", "<=": ">=" };
            const SCIS = { ">": ">=", ">=": ">", "<": "<=", "<=": "<" };
            const x = r.pick(["x", "t", "n"]);
            const rel = (R, a) => `${x} ${TEX[R]} ${a}`;
            if (r.chance(0.4)) {
              const a = r.int(-5, 9);
              const R = r.pick(Object.keys(TEX));
              const opcje = r.shuffle([NEG[R], ODWR[R], R, SCIS[R]].map((Rx, i) => ({ t: `$${rel(Rx, a)}$`, ok: i === 0 })));
              return {
                tresc: `Wskaż zaprzeczenie nierówności $${rel(R, a)}$.`,
                pola: [{ id: "o", typ: "wybor", etykieta: "Zaprzeczenie", opcje: opcje.map((o) => o.t) }],
                odpowiedz: { o: opcje.findIndex((o) => o.ok) },
                wynik: `$${rel(NEG[R], a)}$`,
                rozwiazanie: [
                  `Zaprzeczenie nierówności zmienia jej kierunek i znak ostrości: zaprzeczeniem $${TEX[R]}$ jest $${TEX[NEG[R]]}$.`,
                  `Zatem zaprzeczeniem $${rel(R, a)}$ jest $${rel(NEG[R], a)}$.`,
                ],
              };
            }
            const i = r.chance();   // true – koniunkcja, false – alternatywa
            const a = r.int(-5, 5), b = a + r.int(2, 6);
            const R1 = i ? r.pick([">", ">="]) : r.pick(["<", "<="]);
            const R2 = i ? r.pick(["<", "<="]) : r.pick([">", ">="]);
            const sp = i ? "i" : "lub", spN = i ? "lub" : "i";
            const zd = (S) => `$${rel(R1, a)}$ ${S} $${rel(R2, b)}$`;
            const opcje = r.shuffle([
              `$${rel(NEG[R1], a)}$ ${spN} $${rel(NEG[R2], b)}$`,
              `$${rel(NEG[R1], a)}$ ${sp} $${rel(NEG[R2], b)}$`,
              `$${rel(ODWR[R1], a)}$ ${spN} $${rel(ODWR[R2], b)}$`,
              `$${rel(NEG[R1], a)}$ ${spN} $${rel(R2, b)}$`,
            ].map((t, k) => ({ t, ok: k === 0 })));
            return {
              tresc: `Wskaż zaprzeczenie zdania „${zd(sp)}”.`,
              pola: [{ id: "o", typ: "wybor", etykieta: "Zaprzeczenie", opcje: opcje.map((o) => o.t) }],
              odpowiedz: { o: opcje.findIndex((o) => o.ok) },
              wynik: `$${rel(NEG[R1], a)}$ ${spN} $${rel(NEG[R2], b)}$`,
              rozwiazanie: [
                `Zaprzeczenie ${i ? "koniunkcji („i”)" : "alternatywy („lub”)"} to ${i ? "alternatywa („lub”)" : "koniunkcja („i”)"} zaprzeczeń (prawa De Morgana).`,
                `Zaprzeczamy każdą nierówność: $${rel(R1, a)}$ zmienia się w $${rel(NEG[R1], a)}$, a $${rel(R2, b)}$ w $${rel(NEG[R2], b)}$.`,
                `Zaprzeczenie: $${rel(NEG[R1], a)}$ ${spN} $${rel(NEG[R2], b)}$.`,
              ],
            };
          },
        },
        {
          id: "zdania-wartosc",
          nazwa: "Prawda czy fałsz",
          opis: "Oceń prawdziwość zdania złożonego („i”, „lub”, „jeśli … to”) o konkretnej liczbie.",
          generuj(r) {
            const n = r.int(2, 40);
            const k = r.int(5, 35);
            const PRED = [
              { t: "$n$ jest liczbą parzystą", f: n % 2 === 0 },
              { t: "$n$ jest podzielne przez $3$", f: n % 3 === 0 },
              { t: "$n$ jest podzielne przez $5$", f: n % 5 === 0 },
              { t: "$n$ jest liczbą pierwszą", f: jestPierwsza(n) },
              { t: `$n > ${k}$`, f: n > k },
              { t: "$n$ jest kwadratem liczby naturalnej", f: Number.isInteger(Math.sqrt(n)) },
            ];
            const [p, s] = r.shuffle(PRED);
            const rodzaj = r.int(0, 2);
            const zdanie = rodzaj === 0 ? `${p.t} i ${s.t}` : rodzaj === 1 ? `${p.t} lub ${s.t}` : `Jeśli ${p.t}, to ${s.t}`;
            const wartosc = rodzaj === 0 ? p.f && s.f : rodzaj === 1 ? p.f || s.f : !p.f || s.f;
            const reguly = [
              "Koniunkcja („i”) jest prawdziwa tylko wtedy, gdy oba zdania są prawdziwe.",
              "Alternatywa („lub”) jest fałszywa tylko wtedy, gdy oba zdania są fałszywe.",
              "Implikacja („jeśli … to”) jest fałszywa tylko wtedy, gdy poprzednik jest prawdziwy, a następnik fałszywy.",
            ];
            const pf = (b) => (b ? "prawdziwe" : "fałszywe");
            const cz = (b) => (b ? "prawdziwa" : "fałszywa");
            return {
              tresc: `Dla $n = ${n}$ oceń prawdziwość zdania: „${zdanie}”.`,
              pola: [{ id: "o", typ: "wybor", etykieta: "Zdanie jest", opcje: ["prawdziwe", "fałszywe"] }],
              odpowiedz: { o: wartosc ? 0 : 1 },
              wynik: `Zdanie jest ${pf(wartosc)}.`,
              rozwiazanie: [
                `Pierwsza część („${p.t}”) jest ${cz(p.f)}, druga część („${s.t}”) jest ${cz(s.f)}.`,
                reguly[rodzaj],
                `Zatem całe zdanie jest ${pf(wartosc)}.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 2.13
    {
      id: "wzory",
      nazwa: "Przekształcanie wzorów",
      sciaga: [
        {
          nazwa: "Wyznaczanie litery ze wzoru",
          slownie: "Wzór traktujemy jak równanie, w którym niewiadomą jest szukana litera. Te same działania wykonujemy po obu stronach, aż szukana litera zostanie sama.",
          tex: "P=\\frac{(a+b)\\cdot h}{2}\\Rightarrow b=\\frac{2P}{h}-a",
          litery: "$P$ – pole trapezu, $a$, $b$ – podstawy, $h$ – wysokość.",
          przyklad: "Z $P = \\frac{(a+b)h}{2}$: mnożymy przez $2$, dzielimy przez $h$ i odejmujemy $a$, więc $b = \\frac{2P}{h} - a$.",
          uwaga: "Przez wyrażenie można dzielić tylko wtedy, gdy jest różne od zera (tu $h \\neq 0$).",
        },
        {
          nazwa: "Szukana litera w kilku miejscach",
          slownie: "Przenieś wszystkie wyrazy z szukaną literą na jedną stronę, wyłącz ją przed nawias i podziel przez współczynnik.",
          tex: "ax+b=cx+d\\Rightarrow x=\\frac{d-b}{a-c}",
          litery: "$x$ – szukana, $a \\neq c$.",
          przyklad: "Z $3x + 2 = x + 8$ dostajemy $2x = 6$, czyli $x = 3$.",
          uwaga: "Wyłączając $x$ przed nawias, pilnuj znaków: $ax - cx = (a - c)x$.",
        },
        {
          nazwa: "Wzory z ułamkami",
          slownie: "Gdy szukana litera jest w mianowniku, najpierw zbierz ułamki po jednej stronie. Potem sprowadź do wspólnego mianownika i odwróć ułamek.",
          tex: "\\frac{1}{f}=\\frac{1}{x}+\\frac{1}{y}\\Rightarrow y=\\frac{fx}{x-f}",
          litery: "$f$, $x$, $y$ – liczby dodatnie, $x \\neq f$.",
          przyklad: "Dla $f = 2$ i $x = 6$: $\\frac{1}{y} = \\frac{1}{2} - \\frac{1}{6} = \\frac{1}{3}$, czyli $y = 3$.",
          uwaga: "$y$ nie jest równe $\\frac{1}{f} - \\frac{1}{x}$ – to jest wartość $\\frac{1}{y}$, trzeba ją jeszcze odwrócić.",
        },
      ],
      jak: [
        "Jeśli we wzorze są ułamki, pomnóż obie strony przez mianownik.",
        "Przenieś wyrazy z szukaną literą na jedną stronę, a pozostałe na drugą.",
        "Wyłącz szukaną literę przed nawias i podziel obie strony przez współczynnik.",
        "Dopiero potem podstaw liczby i oblicz wynik.",
      ],
      zadania: [
        {
          nr: "41",
          tresc: "Ze wzoru $P = \\frac{(a+b)\\cdot h}{2}$ wynika, że $h$ jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$2P-(a+b)$", "$\\frac{P}{2(a+b)}$", "$\\frac{2P}{a+b}$", "$\\frac{2(a+b)}{P}$"],
          poprawna: 2,
        },
        {
          nr: "42",
          tresc: "Ze wzoru $v = v_0 + at$ wynika, że $t$ jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{v}{a}-v_0$", "$\\frac{v-v_0}{a}$", "$a(v-v_0)$", "$v-v_0-a$"],
          poprawna: 1,
        },
        {
          nr: "43",
          tresc: "Ze wzoru $y = 3x - 2z$ wynika, że $x$ jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{y-2z}{3}$", "$3y+2z$", "$y+\\frac{2z}{3}$", "$\\frac{y+2z}{3}$"],
          poprawna: 3,
        },
        {
          nr: "44",
          tresc: "Temperaturę w stopniach Celsjusza $C$ obliczamy ze wzoru $C = \\frac{5}{9}(F - 32)$, gdzie $F$ to temperatura w stopniach Fahrenheita. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$F = \\frac{9}{5}C + 32$", litery: "PF", poprawna: 0 },
            { tekst: "$F = \\frac{9}{5}(C + 32)$", litery: "PF", poprawna: 1 },
            { tekst: "$F = \\frac{5}{9}C + 32$", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "45",
          tresc: "Obwód prostokąta wyraża się wzorem $O = 2(a + b)$. Obwód prostokąta jest równy $30$, a jeden bok ma długość $a = 4$. Długość drugiego boku $b$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$26$", "$7{,}5$", "$11$", "$22$"],
          poprawna: 2,
        },
        {
          nr: "46",
          tresc: "Ze wzoru $\\frac{1}{f} = \\frac{1}{x} + \\frac{1}{y}$ (gdzie $f$, $x$, $y$ są dodatnie) wynika, że $y$ jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{f}-\\frac{1}{x}$", "$\\frac{fx}{x-f}$", "$f-x$", "$\\frac{x-f}{fx}$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "47",
          punkty: 2,
          tresc: "Ze wzoru $s = v_0 t + \\frac{at^2}{2}$ wyznacz $a$, a następnie oblicz $a$ dla $s = 60$, $v_0 = 10$ i $t = 4$. **Zapisz obliczenia.**",
          rozwiazanie: "Odejmujemy $v_0 t$ od obu stron: $s - v_0 t = \\frac{at^2}{2}$.\n\nMnożymy przez $2$ i dzielimy przez $t^2$ (dla $t \\neq 0$): $a = \\frac{2(s - v_0 t)}{t^2}$.\n\nPodstawiamy: $a = \\frac{2(60 - 10\\cdot 4)}{4^2} = \\frac{2\\cdot 20}{16} = \\frac{40}{16} = \\frac{5}{2}$.\n\nOdpowiedź: $a = \\frac{2(s - v_0 t)}{t^2}$, dla podanych danych $a = \\frac{5}{2}$.",
        },
        {
          nr: "48",
          punkty: 2,
          tresc: "Wyznacz $x$ ze wzoru $\\frac{x+a}{b} = \\frac{x}{c}$, gdzie $b \\neq c$, $b \\neq 0$, $c \\neq 0$. **Zapisz obliczenia.**",
          rozwiazanie: "Mnożymy obie strony przez $bc$: $c(x + a) = bx$.\n\nRozwijamy nawias: $cx + ac = bx$.\n\nPrzenosimy wyrazy z $x$ na jedną stronę: $ac = bx - cx = (b - c)x$.\n\nDzielimy przez $b - c \\neq 0$: $x = \\frac{ac}{b - c}$.\n\nOdpowiedź: $x = \\frac{ac}{b - c}$.",
        },
      ],
      generatory: [
        {
          id: "wzory-wyznacz",
          nazwa: "Wyznacz i oblicz",
          opis: "Ze znanego wzoru wyznacz wskazaną literę i oblicz jej wartość dla podanych liczb.",
          generuj(r) {
            const rodzaj = r.int(0, 4);
            const etykieta = (lit) => `$${lit} =$`;
            if (rodzaj === 0) {
              for (;;) {
                const a = r.int(1, 12), b = r.int(1, 12), h = r.int(2, 12);
                if (((a + b) * h) % 2) continue;
                const P = ((a + b) * h) / 2;
                const szukanaB = r.chance();
                if (szukanaB) {
                  return {
                    tresc: `Ze wzoru $P = \\frac{(a+b)\\cdot h}{2}$ wyznacz $b$ i oblicz jego wartość dla $P = ${P}$, $a = ${a}$, $h = ${h}$.`,
                    pola: [{ id: "w", typ: "liczba", etykieta: etykieta("b") }],
                    odpowiedz: { w: q(b) },
                    wynik: `$b = ${b}$`,
                    rozwiazanie: [
                      "Mnożymy obie strony przez $2$: $2P = (a+b)\\cdot h$.",
                      "Dzielimy przez $h$ i odejmujemy $a$: $b = \\frac{2P}{h} - a$.",
                      `Podstawiamy: $b = \\frac{2\\cdot ${P}}{${h}} - ${a} = ${(2 * P) / h} - ${a} = ${b}$.`,
                    ],
                  };
                }
                return {
                  tresc: `Ze wzoru $P = \\frac{(a+b)\\cdot h}{2}$ wyznacz $h$ i oblicz jego wartość dla $P = ${P}$, $a = ${a}$, $b = ${b}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: etykieta("h") }],
                  odpowiedz: { w: q(h) },
                  wynik: `$h = ${h}$`,
                  rozwiazanie: [
                    "Mnożymy obie strony przez $2$: $2P = (a+b)\\cdot h$.",
                    "Dzielimy przez $a + b$: $h = \\frac{2P}{a+b}$.",
                    `Podstawiamy: $h = \\frac{2\\cdot ${P}}{${a} + ${b}} = \\frac{${2 * P}}{${a + b}} = ${h}$.`,
                  ],
                };
              }
            }
            if (rodzaj === 1) {
              const v0 = r.int(0, 20), a = r.int(2, 9), t = r.int(2, 9);
              const v = v0 + a * t;
              if (r.chance()) {
                return {
                  tresc: `Ze wzoru $v = v_0 + at$ wyznacz $t$ i oblicz jego wartość dla $v = ${v}$, $v_0 = ${v0}$, $a = ${a}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: etykieta("t") }],
                  odpowiedz: { w: q(t) },
                  wynik: `$t = ${t}$`,
                  rozwiazanie: [
                    "Odejmujemy $v_0$ od obu stron: $v - v_0 = at$.",
                    "Dzielimy przez $a$: $t = \\frac{v - v_0}{a}$.",
                    `Podstawiamy: $t = \\frac{${v} - ${v0}}{${a}} = \\frac{${v - v0}}{${a}} = ${t}$.`,
                  ],
                };
              }
              return {
                tresc: `Ze wzoru $v = v_0 + at$ wyznacz $a$ i oblicz jego wartość dla $v = ${v}$, $v_0 = ${v0}$, $t = ${t}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: etykieta("a") }],
                odpowiedz: { w: q(a) },
                wynik: `$a = ${a}$`,
                rozwiazanie: [
                  "Odejmujemy $v_0$ od obu stron: $v - v_0 = at$.",
                  "Dzielimy przez $t$: $a = \\frac{v - v_0}{t}$.",
                  `Podstawiamy: $a = \\frac{${v} - ${v0}}{${t}} = \\frac{${v - v0}}{${t}} = ${a}$.`,
                ],
              };
            }
            if (rodzaj === 2) {
              for (;;) {
                const v0 = r.int(1, 15), t = r.int(2, 8), a = r.int(1, 8);
                if ((a * t * t) % 2) continue;
                const s = v0 * t + (a * t * t) / 2;
                return {
                  tresc: `Ze wzoru $s = v_0 t + \\frac{at^2}{2}$ wyznacz $a$ i oblicz jego wartość dla $s = ${s}$, $v_0 = ${v0}$, $t = ${t}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: etykieta("a") }],
                  odpowiedz: { w: q(a) },
                  wynik: `$a = ${a}$`,
                  rozwiazanie: [
                    "Odejmujemy $v_0 t$ od obu stron: $s - v_0 t = \\frac{at^2}{2}$.",
                    "Mnożymy przez $2$ i dzielimy przez $t^2$: $a = \\frac{2(s - v_0 t)}{t^2}$.",
                    `Podstawiamy: $a = \\frac{2(${s} - ${v0}\\cdot ${t})}{${t}^2} = \\frac{${2 * (s - v0 * t)}}{${t * t}} = ${a}$.`,
                  ],
                };
              }
            }
            if (rodzaj === 3) {
              const pary = [];
              for (let x = 2; x <= 20; x++) for (let y = 2; y <= 20; y++) if ((x * y) % (x + y) === 0) pary.push([x, y]);
              const [x, y] = r.pick(pary);
              const f = (x * y) / (x + y);
              return {
                tresc: `Ze wzoru $\\frac{1}{f} = \\frac{1}{x} + \\frac{1}{y}$ wyznacz $y$ i oblicz jego wartość dla $f = ${f}$, $x = ${x}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: etykieta("y") }],
                odpowiedz: { w: q(y) },
                wynik: `$y = ${y}$`,
                rozwiazanie: [
                  "Odejmujemy $\\frac{1}{x}$: $\\frac{1}{y} = \\frac{1}{f} - \\frac{1}{x} = \\frac{x - f}{fx}$.",
                  "Odwracamy obie strony: $y = \\frac{fx}{x - f}$.",
                  `Podstawiamy: $y = \\frac{${f}\\cdot ${x}}{${x} - ${f}} = \\frac{${f * x}}{${x - f}} = ${y}$.`,
                ],
              };
            }
            const k = r.int(1, 15);
            const C = 5 * k, F = 9 * k + 32;
            return {
              tresc: `Ze wzoru $C = \\frac{5}{9}(F - 32)$ wyznacz $F$ i oblicz jego wartość dla $C = ${C}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: etykieta("F") }],
              odpowiedz: { w: q(F) },
              wynik: `$F = ${F}$`,
              rozwiazanie: [
                "Mnożymy obie strony przez $\\frac{9}{5}$: $\\frac{9}{5}C = F - 32$.",
                "Dodajemy $32$: $F = \\frac{9}{5}C + 32$.",
                `Podstawiamy: $F = \\frac{9}{5}\\cdot ${C} + 32 = ${9 * k} + 32 = ${F}$.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
