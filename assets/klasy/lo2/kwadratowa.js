// Klasa 2 (liceum i technikum) · rozdział 3 „Funkcja kwadratowa” – Matematyka 2, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q, wielomianTex, plusMinus, nawiasMinus, texNawias } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** „Ładna” odpowiedź: mianownik co najwyżej 12. */
const ladna = (v) => Math.abs(v.n) <= 100000 && v.d <= 12;

/** Współczynnik przed literą: 1 się pomija, -1 daje "-". */
const wsp = (n) => (n === 1 ? "" : n === -1 ? "-" : String(n));

/** Trójmian ax^2 + bx + c w LaTeX. */
const tr = (a, b, c) => wielomianTex([a, b, c]);

/** Składnik liniowy do doklejenia po innym: "+ x", "- 5x". */
const lin = (b) => `${b < 0 ? "-" : "+"} ${wsp(Math.abs(b))}x`;

/** (x - p)^2 albo x^2, gdy p = 0. */
const kw = (p) => (Q.z(p).zero ? "x" : nawiasMinus(p));

/** Postać kanoniczna a(x - p)^2 + q w LaTeX (a całkowite). */
const kanon = (a, p, qq) => `${wsp(a)}${kw(p)}^2${Q.z(qq).zero ? "" : ` ${plusMinus(qq)}`}`;

/** Kwadrat liczby wymiernej w LaTeX, ułamek w nawiasie. */
const pot2 = (x) => (x.calkowita && !x.ujemna ? `${x.tex()}^2` : `\\left(${x.tex()}\\right)^2`);

/** Trójmian o dwóch różnych miejscach zerowych (całkowitych albo połówkowych przy |a| = 2) i całkowitych współczynnikach. */
function trojmian(r) {
  for (;;) {
    const a = r.pick([1, 1, 1, 2, 2, 3, -1, -1, -2]);
    const u = q(r.intBez(-8, 8, 0));
    const v = Math.abs(a) === 2 && r.chance(0.4) ? q(2 * r.int(-4, 3) + 1, 2) : q(r.intBez(-8, 8, 0));
    if (u.eq(v)) continue;
    const [x1, x2] = u.cmp(v) < 0 ? [u, v] : [v, u];
    const b = x1.add(x2).mul(-a);
    const c = x1.mul(x2).mul(a);
    if (!b.calkowita || !c.calkowita) continue;
    return { a, b: b.n, c: c.n, x1, x2 };
  }
}

/** Kroki obliczania miejsc zerowych (delta jest kwadratem liczby całkowitej, delta > 0). */
function krokiZera({ a, b, c }) {
  const D = b * b - 4 * a * c;
  const s = Math.round(Math.sqrt(D));
  const x1 = q(-b - s, 2 * a);
  const x2 = q(-b + s, 2 * a);
  return [
    `$a = ${a}$, $b = ${b}$, $c = ${c}$, więc $\\Delta = b^2 - 4ac = ${texNawias(b)}^2 - 4\\cdot ${texNawias(a)}\\cdot ${texNawias(c)} = ${D}$.`,
    `$\\sqrt{\\Delta} = ${s}$, więc $x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a} = \\frac{${-b} - ${s}}{${2 * a}} = ${x1.tex()}$ oraz $x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a} = \\frac{${-b} + ${s}}{${2 * a}} = ${x2.tex()}$.`,
  ];
}

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 3.1–3.2
    {
      id: "kanoniczna",
      nazwa: "Postać ogólna i kanoniczna",
      sciaga: [
        {
          nazwa: "Postać ogólna i kanoniczna",
          slownie: "Funkcję kwadratową można zapisać wzorem ogólnym albo kanonicznym. Wykresem jest parabola, a postać kanoniczna od razu pokazuje jej wierzchołek.",
          tex: "f(x)=ax^2+bx+c\\qquad f(x)=a(x-p)^2+q",
          litery: "$a\\neq 0$; punkt $W=(p,q)$ to wierzchołek paraboli.",
          przyklad: "Funkcja $f(x)=2(x-3)^2+1$ ma wierzchołek $W=(3,1)$ i ramiona skierowane w górę, bo $a=2>0$.",
          uwaga: "W nawiasie stoi $x-p$, więc dla $f(x)=(x+4)^2$ mamy $p=-4$.",
        },
        {
          nazwa: "Wzory na p, q i deltę",
          slownie: "Wierzchołek paraboli o wzorze ogólnym obliczasz ze wzorów na $p$ i $q$. Do $q$ potrzebna jest delta (wyróżnik trójmianu).",
          tex: "p=\\frac{-b}{2a}\\qquad q=\\frac{-\\Delta}{4a}\\qquad\\Delta=b^2-4ac",
          litery: "$a$, $b$, $c$ – współczynniki wzoru ogólnego, $\\Delta$ – delta.",
          przyklad: "Dla $f(x)=x^2-6x+5$: $\\Delta=36-20=16$, $p=\\frac{6}{2}=3$, $q=\\frac{-16}{4}=-4$, więc $f(x)=(x-3)^2-4$.",
          uwaga: "Liczbę $q$ możesz też obliczyć jako $f(p)$ – to dobry sposób na sprawdzenie wyniku.",
        },
        {
          nazwa: "Z kanonicznej na ogólną",
          slownie: "Rozwiń kwadrat ze wzoru skróconego mnożenia, pomnóż wszystko przez $a$ i dodaj $q$.",
          tex: "(x-p)^2=x^2-2px+p^2",
          przyklad: "$f(x)=3(x-1)^2-2=3(x^2-2x+1)-2=3x^2-6x+1$.",
          uwaga: "Przez $a$ mnożysz wszystkie trzy składniki z nawiasu, a nie tylko pierwszy.",
        },
        {
          nazwa: "Oś symetrii i punkt na osi Oy",
          slownie: "Parabola jest symetryczna względem pionowej prostej przechodzącej przez wierzchołek. Wykres przecina oś $Oy$ w punkcie $(0,c)$.",
          tex: "x=p\\qquad(0,c)",
          przyklad: "Dla $f(x)=x^2-6x+5$ osią symetrii jest $x=3$. Wykres przechodzi przez $(0,5)$ i z symetrii także przez $(6,5)$.",
        },
      ],
      jak: [
        "Zapisz współczynniki $a$, $b$, $c$ razem ze znakami.",
        "Oblicz $p=\\frac{-b}{2a}$.",
        "Oblicz $\\Delta=b^2-4ac$ i $q=\\frac{-\\Delta}{4a}$ (albo $q=f(p)$).",
        "Zapisz $f(x)=a(x-p)^2+q$ i sprawdź wzór na punkcie $(0,c)$.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Wierzchołkiem paraboli o równaniu $y=2(x+3)^2-5$ jest punkt. **Wybierz właściwą odpowiedź.**",
          opcje: ["$(3,-5)$", "$(-3,5)$", "$(-3,-5)$", "$(3,5)$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Współrzędna $p$ wierzchołka paraboli $y=x^2-8x+7$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$-4$", "$8$", "$-8$", "$4$"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "Postać kanoniczna funkcji $f(x)=x^2+6x+4$ to. **Wybierz właściwą odpowiedź.**",
          opcje: ["$(x-3)^2-5$", "$(x+3)^2-5$", "$(x+3)^2+4$", "$(x+6)^2-32$"],
          poprawna: 1,
        },
        {
          nr: "4",
          tresc: "Dana jest funkcja $f(x)=-2x^2+8x-3$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wierzchołek paraboli ma współrzędne $(2,5)$.", litery: "PF", poprawna: 0 },
            { tekst: "Ramiona paraboli są skierowane w górę.", litery: "PF", poprawna: 1 },
            { tekst: "Postać kanoniczna funkcji to $f(x)=-2(x-2)^2+5$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "5",
          tresc: "Funkcję $f(x)=3(x-1)^2-2$ zapisano w postaci ogólnej. Jest to. **Wybierz właściwą odpowiedź.**",
          opcje: ["$3x^2-6x-2$", "$3x^2+6x+1$", "$3x^2-6x+1$", "$3x^2-2x+1$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Funkcja kwadratowa jest dana wzorem $f(x)=2x^2-12x+10$. Zapisz ją w postaci kanonicznej i podaj współrzędne wierzchołka paraboli. **Zapisz obliczenia.**",
          rozwiazanie: "Współczynniki: $a=2$, $b=-12$, $c=10$.\n\n$p=\\frac{-b}{2a}=\\frac{12}{4}=3$.\n\n$\\Delta=b^2-4ac=(-12)^2-4\\cdot 2\\cdot 10=144-80=64$, więc $q=\\frac{-\\Delta}{4a}=\\frac{-64}{8}=-8$.\n\nPostać kanoniczna: $f(x)=2(x-3)^2-8$. Sprawdzenie: $2(x^2-6x+9)-8=2x^2-12x+10$.\n\nOdpowiedź: $f(x)=2(x-3)^2-8$, wierzchołek $W=(3,-8)$.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Wierzchołek paraboli $y=x^2+bx+c$ ma współrzędne $(-2,-9)$. Oblicz $b$ i $c$. **Zapisz obliczenia.**",
          rozwiazanie: "Parabola ma współczynnik $a=1$ i wierzchołek $(-2,-9)$, więc jej wzór kanoniczny to $y=(x+2)^2-9$.\n\nRozwijamy: $y=x^2+4x+4-9=x^2+4x-5$.\n\nPorównujemy ze wzorem $y=x^2+bx+c$: $b=4$ i $c=-5$.\n\nOdpowiedź: $b=4$, $c=-5$.",
        },
      ],
      generatory: [
        {
          id: "kanoniczna-wierzcholek",
          nazwa: "Wierzchołek paraboli",
          opis: "Z wzoru ogólnego oblicz współrzędne wierzchołka paraboli ze wzorów na p i q.",
          generuj(r) {
            const polowka = r.chance(0.3);
            const a = polowka ? r.pick([4, -4]) : r.pick([1, 1, 2, 3, -1, -2, -3]);
            const p = polowka ? q(2 * r.int(-4, 3) + 1, 2) : q(r.intBez(-7, 7, 0));
            const qq = q(r.intBez(-9, 9, 0));
            const b = p.mul(a).mul(-2).n;
            const c = p.mul(p).mul(a).add(qq).n;
            const D = b * b - 4 * a * c;
            return {
              tresc: `Wierzchołkiem paraboli $y = ${tr(a, b, c)}$ jest punkt $W = (p, q)$. Oblicz $p$ i $q$.`,
              pola: [
                { id: "p", typ: "liczba", etykieta: "$p =$" },
                { id: "q", typ: "liczba", etykieta: "$q =$" },
              ],
              odpowiedz: { p, q: qq },
              wynik: `$p = ${p.tex()}$, $q = ${qq.tex()}$`,
              rozwiazanie: [
                `$a = ${a}$, $b = ${b}$, $c = ${c}$.`,
                `$p = \\frac{-b}{2a} = \\frac{${-b}}{${2 * a}} = ${p.tex()}$.`,
                `$\\Delta = b^2 - 4ac = ${texNawias(b)}^2 - 4\\cdot ${texNawias(a)}\\cdot ${texNawias(c)} = ${D}$.`,
                `$q = \\frac{-\\Delta}{4a} = \\frac{${-D}}{${4 * a}} = ${qq.tex()}$.`,
              ],
            };
          },
        },
        {
          id: "kanoniczna-ogolna",
          nazwa: "Z kanonicznej na ogólną",
          opis: "Rozwiń postać kanoniczną i podaj współczynniki b i c wzoru ogólnego.",
          generuj(r) {
            const a = r.pick([1, 1, 2, 3, -1, -2, -3]);
            const p = r.intBez(-6, 6, 0);
            const qq = r.intBez(-9, 9, 0);
            const b = -2 * a * p;
            const c = a * p * p + qq;
            const kwadrat = tr(1, -2 * p, p * p);
            return {
              tresc: `Funkcję $f(x) = ${kanon(a, p, qq)}$ zapisano w postaci ogólnej $f(x) = ${a === 1 ? "" : a === -1 ? "-" : a}x^2 + bx + c$. Oblicz $b$ i $c$.`,
              pola: [
                { id: "b", typ: "liczba", etykieta: "$b =$" },
                { id: "c", typ: "liczba", etykieta: "$c =$" },
              ],
              odpowiedz: { b: q(b), c: q(c) },
              wynik: `$b = ${b}$, $c = ${c}$`,
              rozwiazanie: [
                `Rozwijamy kwadrat: $(x ${plusMinus(-p)})^2 = ${kwadrat}$.`,
                `$f(x) = ${wsp(a)}(${kwadrat}) ${plusMinus(qq)}$.`,
                `Po wymnożeniu i uproszczeniu: $f(x) = ${tr(a, b, c)}$, więc $b = ${b}$ i $c = ${c}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3.3
    {
      id: "zerowe",
      nazwa: "Miejsca zerowe. Postać iloczynowa",
      sciaga: [
        {
          nazwa: "Delta i liczba miejsc zerowych",
          slownie: "Miejsca zerowe to argumenty, dla których $f(x)=0$, czyli rozwiązania równania $ax^2+bx+c=0$. Ich liczbę mówi znak delty.",
          tex: "\\Delta=b^2-4ac",
          litery: "$\\Delta>0$ – dwa miejsca zerowe, $\\Delta=0$ – jedno, $\\Delta<0$ – żadnego.",
          przyklad: "Dla $f(x)=x^2+2x+5$: $\\Delta=4-20=-16<0$, więc funkcja nie ma miejsc zerowych.",
          uwaga: "Brak miejsc zerowych oznacza, że wykres w ogóle nie dotyka osi $Ox$.",
        },
        {
          nazwa: "Wzory na miejsca zerowe",
          slownie: "Gdy $\\Delta>0$, są dwa miejsca zerowe $x_1$ i $x_2$. Gdy $\\Delta=0$, jest jedno miejsce zerowe $x_0$.",
          tex: "x_1=\\frac{-b-\\sqrt{\\Delta}}{2a}\\qquad x_2=\\frac{-b+\\sqrt{\\Delta}}{2a}\\qquad x_0=\\frac{-b}{2a}",
          przyklad: "Dla $f(x)=x^2-x-12$: $\\Delta=1+48=49$, $x_1=\\frac{1-7}{2}=-3$, $x_2=\\frac{1+7}{2}=4$.",
          uwaga: "Liczba $-b$ jest przeciwna do $b$. Dla $b=-3$ mamy $-b=3$.",
        },
        {
          nazwa: "Postać iloczynowa",
          slownie: "Gdy $\\Delta\\geq 0$, wzór funkcji można zapisać jako iloczyn. Gdy $\\Delta<0$, postaci iloczynowej nie ma.",
          tex: "f(x)=a(x-x_1)(x-x_2)\\qquad f(x)=a(x-x_0)^2",
          przyklad: "Dla $f(x)=2x^2-2x-4$: $\\Delta=36$, $x_1=-1$, $x_2=2$, więc $f(x)=2(x+1)(x-2)$.",
          uwaga: "Nie zapomnij współczynnika $a$ przed nawiasami.",
        },
        {
          nazwa: "Przypadki szczególne",
          slownie: "Gdy brakuje $b$ albo $c$, delta nie jest potrzebna: wyłącz $x$ przed nawias albo użyj wzoru skróconego mnożenia.",
          tex: "x^2+bx=x(x+b)\\qquad x^2-k^2=(x-k)(x+k)",
          przyklad: "$x^2-4x=x(x-4)$ ma miejsca zerowe $0$ i $4$. $x^2-9=(x-3)(x+3)$ ma miejsca zerowe $-3$ i $3$.",
          uwaga: "Funkcja $x^2+9$ nie ma miejsc zerowych i nie rozkłada się na czynniki.",
        },
      ],
      jak: [
        "Zapisz $a$, $b$, $c$ i oblicz $\\Delta=b^2-4ac$.",
        "Sprawdź znak delty: ile jest miejsc zerowych?",
        "Podstaw do wzorów na $x_1$ i $x_2$ (albo na $x_0$).",
        "Postać iloczynowa to $a(x-x_1)(x-x_2)$. Sprawdź ją przez $f(0)=a\\cdot x_1\\cdot x_2$.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Wyróżnik trójmianu $f(x)=2x^2-3x-5$ jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$29$", "$-31$", "$49$", "$-49$"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Miejscami zerowymi funkcji $f(x)=x^2-x-12$ są liczby. **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$ i $-3$", "$-4$ i $3$", "$12$ i $-1$", "$6$ i $-2$"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "Która z funkcji ma dokładnie jedno miejsce zerowe? **Wybierz właściwą odpowiedź.**",
          opcje: ["$f(x)=x^2-6x+8$", "$f(x)=x^2+9$", "$f(x)=x^2-9$", "$f(x)=x^2-6x+9$"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "Dana jest funkcja $f(x)=3(x-2)(x+5)$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Miejscami zerowymi funkcji są liczby $2$ i $-5$.", litery: "PF", poprawna: 0 },
            { tekst: "Wykres funkcji przecina oś $Oy$ w punkcie $(0,30)$.", litery: "PF", poprawna: 1 },
            { tekst: "Osią symetrii wykresu jest prosta $x=-1{,}5$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "12",
          tresc: "Postać iloczynowa funkcji $f(x)=2x^2-8x-24$ to. **Wybierz właściwą odpowiedź.**",
          opcje: ["$2(x+6)(x-2)$", "$2(x-6)(x+2)$", "$(x-6)(x+2)$", "$2(x-12)(x+4)$"],
          poprawna: 1,
        },
        {
          nr: "13",
          tresc: "Funkcja $f(x)=x^2-4x+m$ ma dokładnie jedno miejsce zerowe. Wtedy liczba $m$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$16$", "$-4$", "$4$", "$8$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "14",
          punkty: 2,
          tresc: "Wyznacz miejsca zerowe funkcji $f(x)=3x^2+x-2$ i zapisz jej wzór w postaci iloczynowej. **Zapisz obliczenia.**",
          rozwiazanie: "$a=3$, $b=1$, $c=-2$, więc $\\Delta=1^2-4\\cdot 3\\cdot(-2)=1+24=25$ i $\\sqrt{\\Delta}=5$.\n\n$x_1=\\frac{-1-5}{6}=-1$ oraz $x_2=\\frac{-1+5}{6}=\\frac{2}{3}$.\n\nPostać iloczynowa: $f(x)=3(x+1)\\left(x-\\frac{2}{3}\\right)=(x+1)(3x-2)$.\n\nOdpowiedź: miejsca zerowe $-1$ i $\\frac{2}{3}$, $f(x)=3(x+1)\\left(x-\\frac{2}{3}\\right)$.",
        },
        {
          nr: "15",
          punkty: 2,
          tresc: "Dana jest funkcja $f(x)=-x^2+6x-9$. Wyznacz jej miejsca zerowe, zapisz postać iloczynową i podaj współrzędne wierzchołka paraboli. **Zapisz obliczenia.**",
          rozwiazanie: "$a=-1$, $b=6$, $c=-9$, więc $\\Delta=6^2-4\\cdot(-1)\\cdot(-9)=36-36=0$.\n\nDla $\\Delta=0$ jest jedno miejsce zerowe: $x_0=\\frac{-b}{2a}=\\frac{-6}{-2}=3$.\n\nPostać iloczynowa: $f(x)=-(x-3)^2$.\n\nWierzchołek: $p=3$, $q=\\frac{-\\Delta}{4a}=0$, więc $W=(3,0)$ – leży na osi $Ox$.\n\nOdpowiedź: $x_0=3$, $f(x)=-(x-3)^2$, $W=(3,0)$.",
        },
      ],
      generatory: [
        {
          id: "zerowe-miejsca",
          nazwa: "Miejsca zerowe",
          opis: "Oblicz miejsca zerowe funkcji kwadratowej przez deltę (dwa różne miejsca zerowe).",
          generuj(r) {
            const t = trojmian(r);
            return {
              tresc: `Oblicz miejsca zerowe funkcji $f(x) = ${tr(t.a, t.b, t.c)}$.`,
              pola: [{ id: "x", typ: "zbior", ile: 2, etykieta: "Miejsca zerowe" }],
              odpowiedz: { x: [t.x1, t.x2] },
              wynik: `$x = ${t.x1.tex()}$ oraz $x = ${t.x2.tex()}$`,
              rozwiazanie: krokiZera(t),
            };
          },
        },
        {
          id: "zerowe-delta",
          nazwa: "Delta i liczba miejsc",
          opis: "Oblicz deltę i rozstrzygnij, ile miejsc zerowych ma funkcja kwadratowa.",
          generuj(r) {
            const typ = r.pick([0, 1, 2]);   // 0: brak, 1: jedno, 2: dwa
            for (;;) {
              let a, b, c;
              if (typ === 1) {
                a = r.pick([1, 2, 3, -1, -2, -3]);
                const p = r.intBez(-6, 6, 0);
                b = -2 * a * p;
                c = a * p * p;
              } else {
                a = r.intBez(-4, 4, 0);
                b = r.int(-9, 9);
                c = r.int(-9, 9);
              }
              const D = b * b - 4 * a * c;
              if (typ === 0 && D >= 0) continue;
              if (typ === 2 && D <= 0) continue;
              const ile = typ;
              const wniosek = [
                `$\\Delta < 0$, więc funkcja nie ma miejsc zerowych.`,
                `$\\Delta = 0$, więc funkcja ma jedno miejsce zerowe: $x_0 = \\frac{-b}{2a} = \\frac{${-b}}{${2 * a}} = ${q(-b, 2 * a).tex()}$.`,
                `$\\Delta > 0$, więc funkcja ma dwa miejsca zerowe.`,
              ][ile];
              return {
                tresc: `Dla funkcji $f(x) = ${tr(a, b, c)}$ oblicz wyróżnik $\\Delta$ i wskaż liczbę miejsc zerowych.`,
                pola: [
                  { id: "d", typ: "liczba", etykieta: "$\\Delta =$" },
                  { id: "n", typ: "wybor", etykieta: "Liczba miejsc zerowych", opcje: ["brak miejsc zerowych", "jedno miejsce zerowe", "dwa miejsca zerowe"] },
                ],
                odpowiedz: { d: q(D), n: ile },
                wynik: `$\\Delta = ${D}$, ${["brak miejsc zerowych", "jedno miejsce zerowe", "dwa miejsca zerowe"][ile]}`,
                rozwiazanie: [
                  `$a = ${a}$, $b = ${b}$, $c = ${c}$.`,
                  `$\\Delta = b^2 - 4ac = ${texNawias(b)}^2 - 4\\cdot ${texNawias(a)}\\cdot ${texNawias(c)} = ${D}$.`,
                  wniosek,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3.4–3.5
    {
      id: "wykres",
      nazwa: "Wykres, własności i wzór funkcji kwadratowej",
      sciaga: [
        {
          nazwa: "Co widać we wzorze",
          slownie: "O wykresie mówią: znak $a$ (kierunek ramion), wierzchołek $(p,q)$, oś symetrii $x=p$ i punkt $(0,c)$ na osi $Oy$.",
          tex: "W=(p,q)\\qquad x=p\\qquad(0,c)",
          litery: "$a>0$ – ramiona w górę, $a<0$ – ramiona w dół.",
          przyklad: "Dla $f(x)=-x^2+2x+3$: ramiona w dół, $W=(1,4)$, oś symetrii $x=1$, punkt $(0,3)$.",
          uwaga: "Im większe $|a|$, tym parabola jest węższa.",
        },
        {
          nazwa: "Szkic paraboli",
          slownie: "Zaznacz wierzchołek, miejsca zerowe (jeśli są) oraz punkt $(0,c)$ i jego odbicie względem osi symetrii. Poprowadź przez nie gładką krzywą.",
          tex: "p=\\frac{x_1+x_2}{2}",
          litery: "$x_1$, $x_2$ – miejsca zerowe; wierzchołek leży w środku między nimi.",
          przyklad: "Dla $f(x)=x^2-2x-3$: $W=(1,-4)$, miejsca zerowe $-1$ i $3$, punkty $(0,-3)$ i $(2,-3)$.",
        },
        {
          nazwa: "Zbiór wartości i monotoniczność",
          slownie: "Dla $a>0$ funkcja ma wartość najmniejszą $q$: maleje do $p$, a potem rośnie. Dla $a<0$ ma wartość największą $q$: rośnie do $p$, a potem maleje.",
          tex: "a>0:\\ \\langle q,+\\infty)\\qquad a<0:\\ (-\\infty,q\\rangle",
          litery: "Podane przedziały to zbiór wartości funkcji.",
          przyklad: "Dla $f(x)=-(x-3)^2+4$ zbiór wartości to $(-\\infty,4\\rangle$. Funkcja rośnie w $(-\\infty,3\\rangle$ i maleje w $\\langle 3,+\\infty)$.",
          uwaga: "Zbiór wartości zależy od $q$, a przedziały monotoniczności od $p$.",
        },
        {
          nazwa: "Wzór z danych",
          slownie: "Gdy znasz wierzchołek, użyj wzoru kanonicznego, a gdy miejsca zerowe – iloczynowego. Brakujące $a$ wyznacz z podanego punktu wykresu.",
          tex: "f(x)=a(x-p)^2+q\\qquad f(x)=a(x-x_1)(x-x_2)",
          przyklad: "Wierzchołek $W=(1,-2)$ i punkt $(3,6)$: $6=a\\cdot 2^2-2$, więc $a=2$ i $f(x)=2(x-1)^2-2$.",
          uwaga: "Do wyznaczenia $a$ podstawiaj współrzędne podanego punktu, a nie wierzchołka.",
        },
      ],
      jak: [
        "Zapisz, co wiesz: wierzchołek, miejsca zerowe, punkt wykresu.",
        "Wybierz postać: kanoniczną (gdy jest wierzchołek) albo iloczynową (gdy są miejsca zerowe).",
        "Podstaw współrzędne punktu i wyznacz $a$.",
        "Zapisz wzór i sprawdź go na innym punkcie, np. na przecięciu z osią $Oy$.",
      ],
      zadania: [
        {
          nr: "16",
          tresc: "Zbiorem wartości funkcji $f(x)=-(x-3)^2+4$ jest. **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-\\infty,3\\rangle$", "$\\langle 4,+\\infty)$", "$(-\\infty,4\\rangle$", "$\\langle 3,+\\infty)$"],
          poprawna: 2,
        },
        {
          nr: "17",
          tresc: "Osią symetrii wykresu funkcji $f(x)=2(x+1)^2-8$ jest prosta o równaniu. **Wybierz właściwą odpowiedź.**",
          opcje: ["$x=1$", "$x=-1$", "$x=-8$", "$x=8$"],
          poprawna: 1,
        },
        {
          nr: "18",
          tresc: "Funkcja $f(x)=x^2-4x+3$ jest malejąca w przedziale. **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-\\infty,2\\rangle$", "$\\langle 2,+\\infty)$", "$\\langle -2,+\\infty)$", "$(-\\infty,3\\rangle$"],
          poprawna: 0,
        },
        {
          nr: "19",
          tresc: "Wykres funkcji kwadratowej ma wierzchołek w punkcie $W=(2,-3)$ i przechodzi przez punkt $(0,5)$. Wzór tej funkcji to. **Wybierz właściwą odpowiedź.**",
          opcje: ["$f(x)=(x-2)^2-3$", "$f(x)=2(x+2)^2-3$", "$f(x)=2(x-2)^2-3$", "$f(x)=2(x-2)^2+3$"],
          poprawna: 2,
        },
        {
          nr: "20",
          tresc: "Dana jest funkcja $f(x)=-x^2+2x+3$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wykres przecina oś $Ox$ w punktach $(-1,0)$ i $(3,0)$.", litery: "PF", poprawna: 0 },
            { tekst: "Największa wartość funkcji jest równa $4$.", litery: "PF", poprawna: 0 },
            { tekst: "Funkcja jest rosnąca w przedziale $\\langle 1,+\\infty)$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "21",
          tresc: "Funkcja kwadratowa ma miejsca zerowe $1$ i $5$, a jej wykres przechodzi przez punkt $(3,-8)$. Wzór tej funkcji to. **Wybierz właściwą odpowiedź.**",
          opcje: ["$f(x)=(x-1)(x-5)$", "$f(x)=2(x+1)(x+5)$", "$f(x)=-2(x-1)(x-5)$", "$f(x)=2(x-1)(x-5)$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "22",
          punkty: 3,
          tresc: "Wierzchołkiem paraboli będącej wykresem funkcji kwadratowej $f$ jest punkt $W=(-1,4)$, a wykres przechodzi przez punkt $(1,0)$. Wyznacz wzór funkcji w postaci ogólnej oraz jej drugie miejsce zerowe. **Zapisz obliczenia.**",
          rozwiazanie: "Wzór kanoniczny: $f(x)=a(x+1)^2+4$.\n\nPodstawiamy punkt $(1,0)$: $0=a\\cdot 2^2+4$, więc $4a=-4$ i $a=-1$.\n\nStąd $f(x)=-(x+1)^2+4=-(x^2+2x+1)+4=-x^2-2x+3$.\n\nMiejsca zerowe: $-(x+1)^2+4=0$, czyli $(x+1)^2=4$, więc $x=1$ lub $x=-3$.\n\nOdpowiedź: $f(x)=-x^2-2x+3$, drugie miejsce zerowe to $-3$.",
        },
        {
          nr: "23",
          punkty: 3,
          tresc: "Dla funkcji $f(x)=x^2-2x-3$ wyznacz współrzędne wierzchołka paraboli, punkty przecięcia wykresu z osiami układu współrzędnych oraz zbiór wartości i przedziały monotoniczności. Na tej podstawie opisz szkic wykresu. **Zapisz obliczenia.**",
          rozwiazanie: "$a=1$, $b=-2$, $c=-3$. $p=\\frac{2}{2}=1$, $\\Delta=4+12=16$, $q=\\frac{-16}{4}=-4$, więc $W=(1,-4)$.\n\nMiejsca zerowe: $x_1=\\frac{2-4}{2}=-1$ i $x_2=\\frac{2+4}{2}=3$. Z osią $Oy$ wykres przecina się w punkcie $(0,-3)$.\n\nRamiona są skierowane w górę ($a>0$), więc zbiór wartości to $\\langle -4,+\\infty)$.\n\nFunkcja maleje w przedziale $(-\\infty,1\\rangle$ i rośnie w przedziale $\\langle 1,+\\infty)$.\n\nSzkic: parabola z ramionami w górę, przechodząca przez punkty $(-1,0)$, $(0,-3)$, $(2,-3)$, $(3,0)$, z najniższym punktem $(1,-4)$.\n\nOdpowiedź: $W=(1,-4)$, zera $-1$ i $3$, punkt $(0,-3)$, zbiór wartości $\\langle -4,+\\infty)$.",
        },
      ],
      generatory: [
        {
          id: "wykres-wlasnosci",
          nazwa: "Własności z wzoru",
          opis: "Ze wzoru kanonicznego odczytaj zbiór wartości albo przedział monotoniczności.",
          generuj(r) {
            const a = r.pick([1, 2, 3, -1, -2, -3]);
            const p = r.intBez(-6, 6, 0);
            const qq = r.intBez(-8, 8, 0, p);
            const typ = r.pick(["wartosci", "rosnie", "maleje"]);
            const baza = [`\\langle ${qq}, +\\infty)`, `(-\\infty, ${qq}\\rangle`, `\\langle ${p}, +\\infty)`, `(-\\infty, ${p}\\rangle`];
            const dobra = typ === "wartosci" ? (a > 0 ? 0 : 1) : typ === "rosnie" ? (a > 0 ? 2 : 3) : (a > 0 ? 3 : 2);
            const kolejnosc = r.shuffle([0, 1, 2, 3]);
            const pytanie = {
              wartosci: "Wskaż zbiór wartości funkcji $f$.",
              rosnie: "Wskaż największy przedział, w którym funkcja $f$ jest rosnąca.",
              maleje: "Wskaż największy przedział, w którym funkcja $f$ jest malejąca.",
            }[typ];
            const kierunek = a > 0 ? "dodatni, więc ramiona paraboli są skierowane w górę" : "ujemny, więc ramiona paraboli są skierowane w dół";
            const wniosek = typ === "wartosci"
              ? (a > 0 ? `Najmniejsza wartość to $q = ${qq}$, więc zbiór wartości to $${baza[0]}$.` : `Największa wartość to $q = ${qq}$, więc zbiór wartości to $${baza[1]}$.`)
              : `Funkcja ${typ === "rosnie" ? "rośnie" : "maleje"} ${dobra === 2 ? "na prawo" : "na lewo"} od wierzchołka, czyli w przedziale $${baza[dobra]}$.`;
            return {
              tresc: `Dana jest funkcja $f(x) = ${kanon(a, p, qq)}$. ${pytanie}`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Przedział", opcje: kolejnosc.map((i) => `$${baza[i]}$`) }],
              odpowiedz: { w: kolejnosc.indexOf(dobra) },
              wynik: `$${baza[dobra]}$`,
              rozwiazanie: [
                `Współczynnik $a = ${a}$ jest ${kierunek}. Wierzchołek ma współrzędne $W = (${p}, ${qq})$.`,
                wniosek,
              ],
            };
          },
        },
        {
          id: "wykres-wspolczynnik-a",
          nazwa: "Współczynnik a",
          opis: "Wyznacz współczynnik a, znając wierzchołek albo miejsca zerowe i jeden punkt wykresu.",
          generuj(r) {
            const A = [1, 2, 3, -1, -2, -3, q(1, 2), q(-1, 2)];
            if (r.chance()) {
              for (;;) {
                const a = r.pick(A);
                const p = r.intBez(-6, 6, 0);
                const qq = r.intBez(-8, 8, 0);
                const x0 = r.intBez(-7, 7, p);
                const aa = Q.z(a);
                const y = aa.mul((x0 - p) ** 2).add(qq);
                if (!y.calkowita) continue;
                const d = x0 - p;
                return {
                  tresc: `Wykres funkcji kwadratowej $f(x) = a${kw(p)}^2 ${plusMinus(qq)}$ przechodzi przez punkt $P = (${x0}, ${y.n})$. Oblicz $a$.`,
                  pola: [{ id: "a", typ: "liczba", etykieta: "$a =$" }],
                  odpowiedz: { a: aa },
                  wynik: `$a = ${aa.tex()}$`,
                  rozwiazanie: [
                    `Podstawiamy współrzędne punktu $P$: $${y.n} = a\\cdot (${x0} ${plusMinus(-p)})^2 ${plusMinus(qq)}$.`,
                    `Stąd $${y.n} = ${wsp(d * d)}a ${plusMinus(qq)}$, czyli $${wsp(d * d)}a = ${y.n - qq}$.`,
                    `$a = ${aa.tex()}$.`,
                  ],
                };
              }
            }
            for (;;) {
              const a = r.pick(A);
              const x1 = r.intBez(-6, 6, 0);
              const x2 = r.intBez(-6, 6, 0, x1);
              const x0 = r.intBez(-7, 7, x1, x2);
              const iloczyn = (x0 - x1) * (x0 - x2);
              const aa = Q.z(a);
              const y = aa.mul(iloczyn);
              if (!y.calkowita) continue;
              return {
                tresc: `Funkcja kwadratowa $f(x) = a(x ${plusMinus(-x1)})(x ${plusMinus(-x2)})$ ma wykres przechodzący przez punkt $P = (${x0}, ${y.n})$. Oblicz $a$.`,
                pola: [{ id: "a", typ: "liczba", etykieta: "$a =$" }],
                odpowiedz: { a: aa },
                wynik: `$a = ${aa.tex()}$`,
                rozwiazanie: [
                  `Podstawiamy współrzędne punktu $P$: $${y.n} = a(${x0} ${plusMinus(-x1)})(${x0} ${plusMinus(-x2)})$.`,
                  `Stąd $${y.n} = ${wsp(iloczyn)}a$.`,
                  `$a = \\frac{${y.n}}{${iloczyn}} = ${aa.tex()}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3.6–3.7
    {
      id: "ekstrema",
      nazwa: "Najmniejsza i największa wartość. Zadania optymalizacyjne",
      sciaga: [
        {
          nazwa: "Wartości w przedziale domkniętym",
          slownie: "Najmniejszej i największej wartości w przedziale $\\langle m,n\\rangle$ szukaj wśród $f(m)$, $f(n)$ oraz $f(p)$, jeśli wierzchołek leży w przedziale.",
          tex: "f(m)\\qquad f(n)\\qquad f(p)\\ \\text{gdy}\\ p\\in\\langle m,n\\rangle",
          litery: "$p$ – pierwsza współrzędna wierzchołka.",
          przyklad: "$f(x)=x^2-4x+1$ w przedziale $\\langle 0,5\\rangle$: $p=2$, więc $f(0)=1$, $f(2)=-3$, $f(5)=6$. Wartość najmniejsza to $-3$, największa $6$.",
          uwaga: "Wartość w wierzchołku jest ekstremalna tylko wtedy, gdy $p$ leży w przedziale.",
        },
        {
          nazwa: "Wierzchołek poza przedziałem",
          slownie: "Gdy $p$ nie należy do przedziału, funkcja jest w nim monotoniczna, więc obie wartości ekstremalne są na końcach przedziału.",
          przyklad: "$f(x)=x^2-4x+1$ w przedziale $\\langle 3,5\\rangle$: $p=2$ leży poza nim, więc $f(3)=-2$ jest najmniejszą, a $f(5)=6$ największą wartością.",
          uwaga: "Wartość $q$ z wierzchołka nie jest wtedy wartością funkcji w tym przedziale.",
        },
        {
          nazwa: "Zadanie optymalizacyjne",
          slownie: "Wielkość, którą optymalizujesz (pole, iloczyn, wysokość), zapisz jako funkcję kwadratową jednej zmiennej. Sprawdź dziedzinę wynikającą z treści i znajdź wierzchołek.",
          przyklad: "Dwie liczby mają sumę $10$. Ich iloczyn to $x(10-x)=-x^2+10x$. Wierzchołek $p=5$, więc największy iloczyn to $f(5)=25$.",
          uwaga: "Jeśli $p$ nie mieści się w dziedzinie z treści zadania, sprawdź wartości na końcach dziedziny.",
        },
      ],
      jak: [
        "Znajdź $p=\\frac{-b}{2a}$ i sprawdź, czy należy do przedziału.",
        "Oblicz $f$ na końcach przedziału oraz w $p$ (jeśli $p$ należy do przedziału).",
        "Wybierz najmniejszą i największą z obliczonych liczb.",
        "W zadaniu z treścią oznacz jedną wielkość przez $x$, drugą wyraź przez $x$, ułóż funkcję i ustal dziedzinę.",
      ],
      zadania: [
        {
          nr: "24",
          tresc: "Najmniejsza wartość funkcji $f(x)=x^2-6x+5$ w przedziale $\\langle 0,4\\rangle$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$-3$", "$-4$", "$5$", "$-9$"],
          poprawna: 1,
        },
        {
          nr: "25",
          tresc: "Największa wartość funkcji $f(x)=-x^2+4x+1$ w przedziale $\\langle -1,1\\rangle$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$-4$", "$4$", "$1$"],
          poprawna: 2,
        },
        {
          nr: "26",
          tresc: "Zbiorem wartości funkcji $f(x)=2x^2-4x+3$ określonej w przedziale $\\langle 2,4\\rangle$ jest. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\langle 1,19\\rangle$", "$\\langle 3,19\\rangle$", "$\\langle 1,3\\rangle$", "$\\langle 3,11\\rangle$"],
          poprawna: 1,
        },
        {
          nr: "27",
          tresc: "Suma dwóch liczb rzeczywistych jest równa $12$. Największa możliwa wartość iloczynu tych liczb jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$24$", "$35$", "$36$", "$72$"],
          poprawna: 2,
        },
        {
          nr: "28",
          tresc: "Wysokość piłki rzuconej w górę (w metrach) po $t$ sekundach opisuje wzór $h(t)=-5t^2+20t+1$, gdzie $t\\geq 0$. Największa wysokość, na jaką wzniesie się piłka, wynosi. **Wybierz właściwą odpowiedź.**",
          opcje: ["$41$ m", "$20$ m", "$1$ m", "$21$ m"],
          poprawna: 3,
        },
        {
          nr: "29",
          tresc: "Dana jest funkcja $f(x)=x^2-2x-3$ określona w przedziale $\\langle -2,2\\rangle$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Największa wartość funkcji jest równa $5$.", litery: "PF", poprawna: 0 },
            { tekst: "Najmniejsza wartość funkcji jest równa $-3$.", litery: "PF", poprawna: 1 },
            { tekst: "Najmniejszą wartość funkcja przyjmuje dla $x=1$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "30",
          punkty: 3,
          tresc: "Ogrodnik ma $36$ m siatki. Chce ogrodzić prostokątną grządkę przylegającą jednym bokiem do ściany domu, więc przy ścianie siatka nie jest potrzebna. Jakie wymiary powinna mieć grządka, aby jej pole było największe? Oblicz to największe pole. **Zapisz obliczenia.**",
          rozwiazanie: "Niech $x$ będzie długością każdego z dwóch boków prostopadłych do ściany. Bok równoległy do ściany ma wtedy $36-2x$, bo siatka obejmuje trzy boki.\n\nDziedzina: $x>0$ i $36-2x>0$, czyli $0<x<18$.\n\nPole: $P(x)=x(36-2x)=-2x^2+36x$.\n\nWierzchołek: $p=\\frac{-36}{2\\cdot(-2)}=9$. Liczba $9$ należy do dziedziny.\n\n$P(9)=9\\cdot 18=162$, a drugi bok ma $36-2\\cdot 9=18$.\n\nOdpowiedź: grządka ma wymiary $9$ m na $18$ m, a największe pole to $162$ m kwadratowych.",
        },
        {
          nr: "31",
          punkty: 2,
          tresc: "Różnica dwóch liczb rzeczywistych jest równa $6$. Dla jakich liczb suma ich kwadratów jest najmniejsza? Oblicz tę najmniejszą sumę. **Zapisz obliczenia.**",
          rozwiazanie: "Niech jedna liczba to $x$, a druga $x+6$.\n\nSuma kwadratów: $f(x)=x^2+(x+6)^2=2x^2+12x+36$.\n\nParabola ma ramiona w górę, więc najmniejsza wartość jest w wierzchołku: $p=\\frac{-12}{4}=-3$.\n\n$f(-3)=2\\cdot 9-36+36=18$. Liczby to $-3$ i $3$.\n\nOdpowiedź: najmniejsza suma kwadratów to $18$, dla liczb $-3$ i $3$.",
        },
      ],
      generatory: [
        {
          id: "ekstrema-przedzial",
          nazwa: "Wartość w przedziale",
          opis: "Oblicz najmniejszą albo największą wartość funkcji kwadratowej w przedziale domkniętym.",
          generuj(r) {
            const a = r.pick([1, 1, 2, 3, -1, -2]);
            const m = r.int(-6, 4);
            const n = m + r.int(3, 8);
            const wewnatrz = r.chance(0.5);
            const p = wewnatrz ? r.int(m, n) : r.chance() ? m - r.int(1, 3) : n + r.int(1, 3);
            const qq = r.int(-9, 9);
            const b = -2 * a * p;
            const c = a * p * p + qq;
            const f = (x) => a * (x - p) ** 2 + qq;
            const kand = wewnatrz ? [m, p, n] : [m, n];
            const wartosci = kand.map(f);
            const najm = r.chance();
            const wynik = najm ? Math.min(...wartosci) : Math.max(...wartosci);
            return {
              tresc: `Funkcja $f(x) = ${tr(a, b, c)}$ jest określona w przedziale $\\langle ${m}, ${n}\\rangle$. Podaj jej ${najm ? "najmniejszą" : "największą"} wartość w tym przedziale.`,
              pola: [{ id: "w", typ: "liczba", etykieta: najm ? "Najmniejsza wartość" : "Największa wartość" }],
              odpowiedz: { w: q(wynik) },
              wynik: `$${wynik}$`,
              rozwiazanie: [
                `Wierzchołek: $p = \\frac{-b}{2a} = \\frac{${-b}}{${2 * a}} = ${p}$.`,
                wewnatrz
                  ? `Liczba $${p}$ należy do przedziału $\\langle ${m}, ${n}\\rangle$, więc sprawdzamy oba końce i wierzchołek.`
                  : `Liczba $${p}$ nie należy do przedziału $\\langle ${m}, ${n}\\rangle$, więc funkcja jest w nim monotoniczna i wystarczy sprawdzić końce.`,
                `$f(${m}) = ${f(m)}$, $f(${n}) = ${f(n)}$${wewnatrz ? `, $f(${p}) = ${f(p)}$ (wartość w wierzchołku, czyli $q$)` : ""}.`,
                `${najm ? "Najmniejsza" : "Największa"} z tych liczb to $${wynik}$.`,
              ],
            };
          },
        },
        {
          id: "ekstrema-optymalizacja",
          nazwa: "Zadanie optymalizacyjne",
          opis: "Ułóż funkcję kwadratową z treści (pole, iloczyn, suma kwadratów, wysokość) i znajdź jej największą albo najmniejszą wartość.",
          generuj(r) {
            const w = r.int(0, 4);
            if (w === 0) {
              const s = r.int(5, 30);
              const p = q(s, 2);
              const wart = p.mul(p);
              return {
                tresc: `Obwód prostokąta jest równy $${2 * s}$. Jakie największe pole może mieć ten prostokąt?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Największe pole" }],
                odpowiedz: { w: wart },
                wynik: `$${wart.tex()}$`,
                rozwiazanie: [
                  `Niech $x$ będzie długością jednego boku. Półobwód jest równy $${s}$, więc drugi bok ma długość $${s} - x$.`,
                  `Pole: $P(x) = x(${s} - x) = -x^2 + ${s}x$, gdzie $0 < x < ${s}$.`,
                  `Wierzchołek: $p = \\frac{-b}{2a} = \\frac{-${s}}{-2} = ${p.tex()}$, a to jest liczba z dziedziny.`,
                  `Największe pole: $P(${p.tex()}) = ${p.tex()}\\cdot ${p.tex()} = ${wart.tex()}$.`,
                ],
              };
            }
            if (w === 1) {
              const S = r.int(4, 30);
              const p = q(S, 2);
              const wart = p.mul(p);
              return {
                tresc: `Suma dwóch liczb rzeczywistych jest równa $${S}$. Jaka jest największa możliwa wartość iloczynu tych liczb?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Największy iloczyn" }],
                odpowiedz: { w: wart },
                wynik: `$${wart.tex()}$`,
                rozwiazanie: [
                  `Niech jedna z liczb to $x$. Druga jest równa $${S} - x$.`,
                  `Iloczyn: $f(x) = x(${S} - x) = -x^2 + ${S}x$. Ramiona paraboli są skierowane w dół, więc największa wartość jest w wierzchołku.`,
                  `$p = \\frac{-${S}}{-2} = ${p.tex()}$.`,
                  `$f(${p.tex()}) = ${p.tex()}\\cdot ${p.tex()} = ${wart.tex()}$.`,
                ],
              };
            }
            if (w === 2) {
              const S = r.int(4, 24);
              const p = q(S, 2);
              const wart = p.mul(p).mul(2);
              return {
                tresc: `Suma dwóch liczb rzeczywistych jest równa $${S}$. Jaka jest najmniejsza możliwa wartość sumy kwadratów tych liczb?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Najmniejsza suma kwadratów" }],
                odpowiedz: { w: wart },
                wynik: `$${wart.tex()}$`,
                rozwiazanie: [
                  `Niech jedna z liczb to $x$. Druga jest równa $${S} - x$.`,
                  `Suma kwadratów: $f(x) = x^2 + (${S} - x)^2 = 2x^2 - ${2 * S}x + ${S * S}$. Ramiona są skierowane w górę, więc najmniejsza wartość jest w wierzchołku.`,
                  `$p = \\frac{${2 * S}}{4} = ${p.tex()}$.`,
                  `$f(${p.tex()}) = ${pot2(p)} + ${pot2(p)} = ${wart.tex()}$.`,
                ],
              };
            }
            if (w === 3) {
              const v = r.pick([10, 15, 20, 25, 30, 40]);
              const h0 = r.int(1, 6);
              const p = q(v, 10);
              const wart = p.mul(p).mul(5).add(h0);
              return {
                tresc: `Piłkę wyrzucono w górę. Jej wysokość (w metrach) po $t$ sekundach opisuje wzór $h(t) = -5t^2 + ${v}t + ${h0}$, gdzie $t \\geq 0$. Na jaką największą wysokość wzniesie się piłka?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Największa wysokość (w metrach)" }],
                odpowiedz: { w: wart },
                wynik: `$${wart.tex()}$ m`,
                rozwiazanie: [
                  `Funkcja $h$ ma ramiona skierowane w dół, więc największą wartość przyjmuje w wierzchołku.`,
                  `$p = \\frac{-${v}}{-10} = ${p.tex()}$, a to jest liczba z dziedziny $t \\geq 0$.`,
                  `$h(${p.tex()}) = -5\\cdot ${pot2(p)} + ${v}\\cdot ${p.tex()} + ${h0} = ${wart.tex()}$.`,
                ],
              };
            }
            const L = 2 * r.int(4, 20);
            const p = q(L, 4);
            const drugi = q(L).sub(p.mul(2));
            const wart = p.mul(drugi);
            return {
              tresc: `Rolnik ma $${L}$ m siatki. Chce ogrodzić prostokątny wybieg przylegający jednym bokiem do ściany stodoły, więc przy ścianie siatka nie jest potrzebna. Jakie największe pole (w metrach kwadratowych) może mieć wybieg?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Największe pole" }],
              odpowiedz: { w: wart },
              wynik: `$${wart.tex()}$`,
              rozwiazanie: [
                `Niech $x$ będzie długością każdego z dwóch boków prostopadłych do ściany. Bok równoległy do ściany ma $${L} - 2x$.`,
                `Pole: $P(x) = x(${L} - 2x) = -2x^2 + ${L}x$, gdzie $0 < x < ${L / 2}$.`,
                `Wierzchołek: $p = \\frac{-${L}}{-4} = ${p.tex()}$, a to jest liczba z dziedziny.`,
                `$P(${p.tex()}) = ${p.tex()}\\cdot ${drugi.tex()} = ${wart.tex()}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3.8
    {
      id: "rownania",
      nazwa: "Równania kwadratowe",
      sciaga: [
        {
          nazwa: "Równanie kwadratowe",
          slownie: "Równanie postaci $ax^2+bx+c=0$ ($a\\neq 0$) rozwiązujesz przez deltę. Liczba rozwiązań jest taka sama jak liczba miejsc zerowych funkcji $f(x)=ax^2+bx+c$.",
          tex: "ax^2+bx+c=0\\qquad\\Delta=b^2-4ac",
          litery: "$\\Delta>0$ – dwa rozwiązania, $\\Delta=0$ – jedno, $\\Delta<0$ – brak rozwiązań rzeczywistych.",
          przyklad: "Równanie $x^2+x+3=0$ ma $\\Delta=1-12=-11<0$, więc nie ma rozwiązań.",
        },
        {
          nazwa: "Wzory na rozwiązania",
          slownie: "Dla $\\Delta>0$ rozwiązania to $x_1$ i $x_2$, a dla $\\Delta=0$ jedyne rozwiązanie to $x_0$.",
          tex: "x_1=\\frac{-b-\\sqrt{\\Delta}}{2a}\\qquad x_2=\\frac{-b+\\sqrt{\\Delta}}{2a}\\qquad x_0=\\frac{-b}{2a}",
          przyklad: "$x^2-4x-5=0$: $\\Delta=16+20=36$, $x_1=\\frac{4-6}{2}=-1$, $x_2=\\frac{4+6}{2}=5$.",
          uwaga: "Przed użyciem wzorów przenieś wszystkie wyrazy na jedną stronę, tak aby po drugiej było $0$.",
        },
        {
          nazwa: "Równania niepełne",
          slownie: "Gdy brakuje $c$, wyłącz $x$ przed nawias. Gdy brakuje $b$, wyznacz $x^2$ i wyciągnij pierwiastek (pamiętaj o obu znakach).",
          tex: "x(ax+b)=0\\qquad x^2=k",
          przyklad: "$x^2-7x=0$ daje $x(x-7)=0$, więc $x=0$ lub $x=7$. $2x^2=18$ daje $x^2=9$, więc $x=3$ lub $x=-3$.",
          uwaga: "Nie dziel równania $x^2-7x=0$ przez $x$ – zgubisz rozwiązanie $x=0$.",
        },
        {
          nazwa: "Równanie z parametrem",
          slownie: "Liczbę rozwiązań równania z parametrem $m$ ustalasz z warunku na deltę, w której występuje $m$.",
          tex: "\\Delta=0\\ \\text{– jedno}\\qquad\\Delta>0\\ \\text{– dwa}",
          przyklad: "$x^2+4x+m=0$: $\\Delta=16-4m$. Dwa rozwiązania są, gdy $16-4m>0$, czyli $m<4$.",
          uwaga: "Przy dzieleniu przez liczbę ujemną zmienia się zwrot nierówności: $-4m>-16$ daje $m<4$.",
        },
      ],
      jak: [
        "Doprowadź równanie do postaci $ax^2+bx+c=0$.",
        "Gdy brakuje $b$ lub $c$, rozłóż na czynniki albo wyznacz $x^2$.",
        "W pozostałych przypadkach oblicz $\\Delta=b^2-4ac$ i sprawdź jej znak.",
        "Podstaw do wzorów na $x_1$, $x_2$ i sprawdź jedno rozwiązanie w równaniu.",
      ],
      zadania: [
        {
          nr: "32",
          tresc: "Rozwiązaniami równania $2x^2-5x-3=0$ są liczby. **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$ i $-\\frac{1}{2}$", "$-3$ i $\\frac{1}{2}$", "$3$ i $\\frac{1}{2}$", "$-3$ i $-\\frac{1}{2}$"],
          poprawna: 0,
        },
        {
          nr: "33",
          tresc: "Równanie $3x^2-12x+12=0$ ma. **Wybierz właściwą odpowiedź.**",
          opcje: ["dwa rozwiązania: $2$ i $-2$", "jedno rozwiązanie: $x=-2$", "jedno rozwiązanie: $x=2$", "brak rozwiązań"],
          poprawna: 2,
        },
        {
          nr: "34",
          tresc: "Zbiorem rozwiązań równania $3x^2-12x=0$ jest. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\{4\\}$", "$\\{0,-4\\}$", "$\\{-4,4\\}$", "$\\{0,4\\}$"],
          poprawna: 3,
        },
        {
          nr: "35",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Równanie $(x-1)^2=0$ ma dwa rozwiązania.", litery: "PF", poprawna: 1 },
            { tekst: "Równanie $x^2+4=0$ nie ma rozwiązań rzeczywistych.", litery: "PF", poprawna: 0 },
            { tekst: "Równanie $x^2=7$ ma dwa rozwiązania.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "36",
          tresc: "Równanie $x^2-6x+m=0$ ma dwa różne rozwiązania rzeczywiste wtedy i tylko wtedy, gdy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$m>9$", "$m<9$", "$m<-9$", "$m=9$"],
          poprawna: 1,
        },
        {
          nr: "37",
          tresc: "Suma rozwiązań równania $x^2-7x+10=0$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$-7$", "$10$", "$7$", "$3$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "38",
          punkty: 2,
          tresc: "Rozwiąż równanie $2x^2=7x-3$. **Zapisz obliczenia.**",
          rozwiazanie: "Przenosimy wszystko na lewą stronę: $2x^2-7x+3=0$.\n\n$a=2$, $b=-7$, $c=3$, więc $\\Delta=(-7)^2-4\\cdot 2\\cdot 3=49-24=25$ i $\\sqrt{\\Delta}=5$.\n\n$x_1=\\frac{7-5}{4}=\\frac{1}{2}$ oraz $x_2=\\frac{7+5}{4}=3$.\n\nSprawdzenie dla $x=3$: $2\\cdot 9=18$ i $7\\cdot 3-3=18$.\n\nOdpowiedź: $x=\\frac{1}{2}$ lub $x=3$.",
        },
        {
          nr: "39",
          punkty: 3,
          tresc: "Dla jakich wartości parametru $m$ równanie $x^2+mx+9=0$ ma dokładnie jedno rozwiązanie? Rozwiąż to równanie dla każdej takiej wartości $m$. **Zapisz obliczenia.**",
          rozwiazanie: "Równanie ma dokładnie jedno rozwiązanie, gdy $\\Delta=0$.\n\n$\\Delta=m^2-4\\cdot 1\\cdot 9=m^2-36$, więc $m^2=36$ i $m=6$ lub $m=-6$.\n\nDla $m=6$: $x^2+6x+9=(x+3)^2=0$, więc $x=-3$.\n\nDla $m=-6$: $x^2-6x+9=(x-3)^2=0$, więc $x=3$.\n\nOdpowiedź: $m=6$ (wtedy $x=-3$) albo $m=-6$ (wtedy $x=3$).",
        },
      ],
      generatory: [
        {
          id: "rownania-kwadratowe",
          nazwa: "Równanie kwadratowe",
          opis: "Rozwiąż równanie kwadratowe: pełne, niepełne albo wymagające przeniesienia wyrazów.",
          generuj(r) {
            const f = r.pick([0, 0, 1, 2, 3]);
            if (f === 1) {
              const a = r.pick([1, 2, 3, 4, -1, -2]);
              const k = r.intBez(-8, 8, 0);
              const b = -a * k;
              return {
                tresc: `Rozwiąż równanie $${tr(a, b, 0)} = 0$.`,
                pola: [{ id: "x", typ: "zbior", ile: 2, etykieta: "Rozwiązania równania" }],
                odpowiedz: { x: [q(0), q(k)] },
                wynik: `$x = 0$ oraz $x = ${k}$`,
                rozwiazanie: [
                  `Wyłączamy $x$ przed nawias: $x(${wielomianTex([a, b])}) = 0$.`,
                  `Iloczyn jest równy $0$, gdy $x = 0$ albo $${wielomianTex([a, b])} = 0$.`,
                  `Z drugiego warunku $x = ${k}$.`,
                ],
              };
            }
            if (f === 2) {
              const a = r.pick([1, 1, 2, 3, 4, -1, -2, 5]);
              const s = r.int(1, 9);
              const kroki = [];
              if (a !== 1) kroki.push(`Dzielimy równanie stronami przez $${a}$: $x^2 - ${s * s} = 0$.`);
              kroki.push(`Stąd $x^2 = ${s * s}$, więc $x = ${s}$ albo $x = -${s}$.`);
              return {
                tresc: `Rozwiąż równanie $${tr(a, 0, -a * s * s)} = 0$.`,
                pola: [{ id: "x", typ: "zbior", ile: 2, etykieta: "Rozwiązania równania" }],
                odpowiedz: { x: [q(s), q(-s)] },
                wynik: `$x = ${s}$ oraz $x = -${s}$`,
                rozwiazanie: kroki,
              };
            }
            const t = trojmian(r);
            const rozwiazanie = krokiZera(t);
            if (f === 3) {
              return {
                tresc: `Rozwiąż równanie $${tr(t.a, t.b, 0)} = ${-t.c}$.`,
                pola: [{ id: "x", typ: "zbior", ile: 2, etykieta: "Rozwiązania równania" }],
                odpowiedz: { x: [t.x1, t.x2] },
                wynik: `$x = ${t.x1.tex()}$ oraz $x = ${t.x2.tex()}$`,
                rozwiazanie: [`Przenosimy wszystkie wyrazy na lewą stronę: $${tr(t.a, t.b, t.c)} = 0$.`, ...rozwiazanie],
              };
            }
            return {
              tresc: `Rozwiąż równanie $${tr(t.a, t.b, t.c)} = 0$.`,
              pola: [{ id: "x", typ: "zbior", ile: 2, etykieta: "Rozwiązania równania" }],
              odpowiedz: { x: [t.x1, t.x2] },
              wynik: `$x = ${t.x1.tex()}$ oraz $x = ${t.x2.tex()}$`,
              rozwiazanie,
            };
          },
        },
        {
          id: "rownania-parametr",
          nazwa: "Równanie z parametrem",
          opis: "Dobierz parametr m tak, aby równanie kwadratowe miało dokładnie jedno rozwiązanie.",
          generuj(r) {
            const w = r.int(0, 2);
            if (w === 0) {
              const a = r.pick([1, 1, 2, 3, -1, -2]);
              const b = r.intBez(-8, 8, 0);
              const m = q(b * b, 4 * a);
              return {
                tresc: `Dla jakiej wartości parametru $m$ równanie $${tr(a, b, 0)} + m = 0$ ma dokładnie jedno rozwiązanie?`,
                pola: [{ id: "m", typ: "liczba", etykieta: "$m =$" }],
                odpowiedz: { m },
                wynik: `$m = ${m.tex()}$`,
                rozwiazanie: [
                  "Równanie kwadratowe ma dokładnie jedno rozwiązanie, gdy $\\Delta = 0$.",
                  `$\\Delta = ${texNawias(b)}^2 - 4\\cdot ${texNawias(a)}\\cdot m = ${b * b} ${plusMinus(-4 * a)}m$.`,
                  `$${b * b} ${plusMinus(-4 * a)}m = 0$, stąd $m = ${m.tex()}$.`,
                ],
              };
            }
            if (w === 1) {
              const c = r.pick([1, 2, 3, -1, -2, -3]);
              const b = r.intBez(-8, 8, 0);
              const m = q(b * b, 4 * c);
              return {
                tresc: `Dla jakiej wartości parametru $m$ równanie $mx^2 ${lin(b)} ${plusMinus(c)} = 0$ ma dokładnie jedno rozwiązanie?`,
                pola: [{ id: "m", typ: "liczba", etykieta: "$m =$" }],
                odpowiedz: { m },
                wynik: `$m = ${m.tex()}$`,
                rozwiazanie: [
                  "Równanie kwadratowe ($m \\neq 0$) ma dokładnie jedno rozwiązanie, gdy $\\Delta = 0$.",
                  `$\\Delta = ${texNawias(b)}^2 - 4\\cdot m\\cdot ${texNawias(c)} = ${b * b} ${plusMinus(-4 * c)}m$.`,
                  `$${b * b} ${plusMinus(-4 * c)}m = 0$, stąd $m = ${m.tex()}$ (to liczba różna od $0$).`,
                ],
              };
            }
            const k = r.int(1, 9);
            return {
              tresc: `Dla jakich wartości parametru $m$ równanie $x^2 + mx + ${k * k} = 0$ ma dokładnie jedno rozwiązanie? Podaj obie wartości.`,
              pola: [{ id: "m", typ: "zbior", ile: 2, etykieta: "Wartości $m$" }],
              odpowiedz: { m: [q(2 * k), q(-2 * k)] },
              wynik: `$m = ${2 * k}$ albo $m = -${2 * k}$`,
              rozwiazanie: [
                "Równanie ma dokładnie jedno rozwiązanie, gdy $\\Delta = 0$.",
                `$\\Delta = m^2 - 4\\cdot 1\\cdot ${k * k} = m^2 - ${4 * k * k}$, więc $m^2 = ${4 * k * k}$.`,
                `Stąd $m = ${2 * k}$ albo $m = -${2 * k}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3.9–3.10
    {
      id: "nierownosci",
      nazwa: "Nierówności kwadratowe",
      sciaga: [
        {
          nazwa: "Jak rozwiązać nierówność",
          slownie: "Przenieś wszystko na jedną stronę, znajdź miejsca zerowe trójmianu, naszkicuj parabolę i odczytaj, gdzie wykres leży nad osią $Ox$ albo pod nią.",
          tex: "ax^2+bx+c>0\\qquad ax^2+bx+c<0",
          przyklad: "$x^2-x-6<0$: miejsca zerowe $-2$ i $3$, ramiona w górę, wykres jest pod osią między nimi. Zbiór rozwiązań: $(-2,3)$.",
          uwaga: "Nie wolno dzielić ani mnożyć przez $x$ – znak $x$ jest nieznany.",
        },
        {
          nazwa: "Odczytanie zbioru",
          slownie: "Dla $a>0$: znak $>$ daje przedziały na zewnątrz miejsc zerowych, znak $<$ – przedział między nimi. Dla $a<0$ jest odwrotnie. Przy $\\leq$ i $\\geq$ miejsca zerowe należą do zbioru.",
          tex: "(-\\infty,x_1)\\cup(x_2,+\\infty)\\qquad(x_1,x_2)",
          litery: "$x_1<x_2$ – miejsca zerowe; nawiasy okrągłe przy $<$ i $>$, kątowe przy $\\leq$ i $\\geq$.",
          przyklad: "$-x^2+4x\\geq 0$: miejsca zerowe $0$ i $4$, ramiona w dół, więc wykres jest nad osią i na niej w przedziale $\\langle 0,4\\rangle$.",
        },
        {
          nazwa: "Gdy delta nie jest dodatnia",
          slownie: "Gdy $\\Delta=0$, parabola dotyka osi w jednym punkcie. Gdy $\\Delta<0$, leży w całości nad osią (dla $a>0$) albo pod nią (dla $a<0$).",
          przyklad: "$x^2+1>0$ jest prawdziwa dla każdego $x$, czyli zbiór rozwiązań to $\\mathbb{R}$. $(x-2)^2>0$ jest prawdziwa dla $x\\neq 2$. $(x-2)^2\\leq 0$ ma jedno rozwiązanie $x=2$.",
          uwaga: "Zbiór rozwiązań może być pusty, np. dla $x^2+1<0$.",
        },
        {
          nazwa: "Zadania z treścią",
          slownie: "Oznacz niewiadomą, ułóż nierówność z warunków zadania i rozwiąż ją. Na końcu sprawdź, czy wynik pasuje do sensu zadania (długość jest dodatnia).",
          przyklad: "Prostokąt o bokach $x$ i $x+3$ ma pole mniejsze od $40$: $x^2+3x-40<0$, czyli $x\\in(-8,5)$. Boki są dodatnie, więc $x\\in(0,5)$.",
          uwaga: "Rozwiązanie nierówności trzeba jeszcze zawęzić do dziedziny z treści zadania.",
        },
      ],
      jak: [
        "Przenieś wszystko na jedną stronę, aby po drugiej było $0$.",
        "Znajdź miejsca zerowe trójmianu (przez $\\Delta$ albo rozkład).",
        "Naszkicuj parabolę: ramiona w górę dla $a>0$, w dół dla $a<0$.",
        "Odczytaj zbiór: nad osią dla $>0$, pod osią dla $<0$. Przy $\\leq$ i $\\geq$ dołącz miejsca zerowe.",
        "W zadaniu z treścią sprawdź, czy wynik mieści się w dziedzinie.",
      ],
      zadania: [
        {
          nr: "40",
          tresc: "Zbiorem rozwiązań nierówności $x^2-3x-4<0$ jest. **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-\\infty,-1)\\cup(4,+\\infty)$", "$(-1,4)$", "$\\langle -1,4\\rangle$", "$(-4,1)$"],
          poprawna: 1,
        },
        {
          nr: "41",
          tresc: "Zbiorem rozwiązań nierówności $-x^2+4x\\geq 0$ jest. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\langle 0,4\\rangle$", "$(0,4)$", "$\\langle -4,0\\rangle$", "$(-\\infty,0\\rangle\\cup\\langle 4,+\\infty)$"],
          poprawna: 0,
        },
        {
          nr: "42",
          tresc: "Zbiorem rozwiązań nierówności $x^2-6x+9>0$ jest. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\mathbb{R}\\setminus\\{3\\}$", "$\\mathbb{R}$", "$(3,+\\infty)$", "zbiór pusty"],
          poprawna: 0,
        },
        {
          nr: "43",
          tresc: "Ile liczb całkowitych spełnia nierówność $x^2-2x-8<0$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$6$", "$5$", "$4$"],
          poprawna: 2,
        },
        {
          nr: "44",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Nierówność $x^2+2x+5>0$ jest spełniona przez każdą liczbę rzeczywistą.", litery: "PF", poprawna: 0 },
            { tekst: "Zbiorem rozwiązań nierówności $x^2-4\\leq 0$ jest przedział $\\langle -2,2\\rangle$.", litery: "PF", poprawna: 0 },
            { tekst: "Nierówność $-x^2-1\\geq 0$ ma rozwiązanie $x=0$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "45",
          tresc: "Jeden bok prostokąta ma długość $x$ cm, a drugi jest o $4$ cm dłuższy. Pole prostokąta nie przekracza $45$ cm kwadratowych. Ile całkowitych wartości może przyjąć $x$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$", "$4$", "$14$", "$5$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "46",
          punkty: 2,
          tresc: "Rozwiąż nierówność $2x^2-x-6\\geq 0$. **Zapisz obliczenia.**",
          rozwiazanie: "Szukamy miejsc zerowych: $\\Delta=(-1)^2-4\\cdot 2\\cdot(-6)=1+48=49$, $\\sqrt{\\Delta}=7$.\n\n$x_1=\\frac{1-7}{4}=-\\frac{3}{2}$ oraz $x_2=\\frac{1+7}{4}=2$.\n\nRamiona paraboli są skierowane w górę ($a=2>0$), a nierówność jest nieostra, więc rozwiązaniem są liczby na zewnątrz miejsc zerowych razem z nimi.\n\nOdpowiedź: $x\\in\\left(-\\infty,-\\frac{3}{2}\\right\\rangle\\cup\\langle 2,+\\infty)$.",
        },
        {
          nr: "47",
          punkty: 3,
          tresc: "Dla jakich wartości parametru $m$ równanie $x^2-2mx+3m+4=0$ ma dwa różne rozwiązania rzeczywiste? **Zapisz obliczenia.**",
          rozwiazanie: "Dwa różne rozwiązania są, gdy $\\Delta>0$.\n\n$\\Delta=(-2m)^2-4\\cdot 1\\cdot(3m+4)=4m^2-12m-16$.\n\nNierówność $4m^2-12m-16>0$ dzielimy przez $4$: $m^2-3m-4>0$.\n\nMiejsca zerowe: $\\Delta_m=9+16=25$, $m_1=\\frac{3-5}{2}=-1$, $m_2=\\frac{3+5}{2}=4$.\n\nRamiona są skierowane w górę, a znak jest $>$, więc rozwiązaniem są przedziały na zewnątrz miejsc zerowych.\n\nOdpowiedź: $m\\in(-\\infty,-1)\\cup(4,+\\infty)$.",
        },
      ],
      generatory: [
        {
          id: "nierownosci-zbior",
          nazwa: "Zbiór rozwiązań",
          opis: "Rozwiąż nierówność kwadratową i wskaż jej zbiór rozwiązań.",
          generuj(r) {
            const t = trojmian(r);
            const znaki = [["<", "<", true], ["\\le", "\\leq", false], [">", ">", true], ["\\ge", "\\geq", false]];
            const [znak, , ostra] = r.pick(znaki);
            const wiekszy = znak === ">" || znak === "\\ge";
            const zewnatrz = (t.a > 0) === wiekszy;
            const lo = t.x1.tex(), hi = t.x2.tex();
            const baza = [
              `(-\\infty, ${lo}) \\cup (${hi}, +\\infty)`,
              `(-\\infty, ${lo}\\rangle \\cup \\langle ${hi}, +\\infty)`,
              `(${lo}, ${hi})`,
              `\\langle ${lo}, ${hi}\\rangle`,
            ];
            const dobra = (zewnatrz ? 0 : 2) + (ostra ? 0 : 1);
            const kolejnosc = r.shuffle([0, 1, 2, 3]);
            return {
              tresc: `Rozwiąż nierówność $${tr(t.a, t.b, t.c)} ${znak} 0$. Wskaż zbiór rozwiązań.`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Zbiór rozwiązań", opcje: kolejnosc.map((i) => `$${baza[i]}$`) }],
              odpowiedz: { w: kolejnosc.indexOf(dobra) },
              wynik: `$x \\in ${baza[dobra]}$`,
              rozwiazanie: [
                ...krokiZera(t),
                `Miejsca zerowe: $${lo}$ i $${hi}$. Ramiona paraboli są skierowane ${t.a > 0 ? "w górę" : "w dół"}, a szukamy miejsc, gdzie wykres leży ${wiekszy ? "nad" : "pod"} osią $Ox$ – ${zewnatrz ? "to liczby na zewnątrz miejsc zerowych" : "to liczby między miejscami zerowymi"}.`,
                `Znak nierówności jest ${ostra ? "ostry" : "nieostry"}, więc miejsca zerowe ${ostra ? "nie należą" : "należą"} do zbioru: $x \\in ${baza[dobra]}$.`,
              ],
            };
          },
        },
        {
          id: "nierownosci-calkowite",
          nazwa: "Liczby całkowite",
          opis: "Policz, ile liczb całkowitych spełnia nierówność kwadratową o ograniczonym zbiorze rozwiązań.",
          generuj(r) {
            for (;;) {
              const t = trojmian(r);
              const wiekszy = t.a < 0;   // wiekszy: znak > lub >=; wtedy a < 0 daje przedział
              const ostra = r.chance();
              const znak = wiekszy ? (ostra ? ">" : "\\ge") : (ostra ? "<" : "\\le");
              const lo = t.x1.valueOf(), hi = t.x2.valueOf();
              const calk = [];
              for (let k = Math.floor(lo) - 1; k <= Math.ceil(hi) + 1; k++) {
                const dobry = ostra ? k > lo && k < hi : k >= lo && k <= hi;
                if (dobry) calk.push(k);
              }
              if (calk.length < 2) continue;
              const przedzial = ostra ? `(${t.x1.tex()}, ${t.x2.tex()})` : `\\langle ${t.x1.tex()}, ${t.x2.tex()}\\rangle`;
              return {
                tresc: `Ile liczb całkowitych spełnia nierówność $${tr(t.a, t.b, t.c)} ${znak} 0$?`,
                pola: [{ id: "n", typ: "liczba", etykieta: "Liczba liczb całkowitych" }],
                odpowiedz: { n: q(calk.length) },
                wynik: `$${calk.length}$`,
                rozwiazanie: [
                  ...krokiZera(t),
                  `Ramiona paraboli są skierowane ${t.a > 0 ? "w górę" : "w dół"}, więc zbiorem rozwiązań jest przedział $${przedzial}$.`,
                  `Liczby całkowite w tym przedziale to wszystkie od $${calk[0]}$ do $${calk[calk.length - 1]}$, czyli $${calk.length}$ ${calk.length % 10 >= 2 && calk.length % 10 <= 4 && (calk.length < 10 || calk.length > 20) ? "liczby" : "liczb"}.`,
                ],
              };
            }
          },
        },
      ],
    },
  ],
};
