// Klasa 1 (liceum i technikum) · rozdział 6 „Podstawowe własności wybranych funkcji” – Matematyka 1, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** „Ładna” odpowiedź: mianownik co najwyżej 12. */
const ladna = (v) => Math.abs(v.n) <= 100000 && v.d <= 12;

/** Liczba całkowita w LaTeX, ujemna w nawiasie: zn(-3) = "(-3)". */
const zn = (n) => (n < 0 ? `(${n})` : String(n));

/** „x - 3”, „x + 3” albo „x” (dla p = 0). */
const xm = (p) => (p === 0 ? "x" : p > 0 ? `x - ${p}` : `x + ${-p}`);

/** Kwadrat z postaci kanonicznej: „(x - 3)^2” albo „x^2”. */
const kw = (p) => (p === 0 ? "x^2" : `(${xm(p)})^2`);

/** Współczynnik przed nawiasem: 1 się pomija, -1 to znak minus. */
const wspA = (a) => (a === 1 ? "" : a === -1 ? "-" : String(a));

/** Wzór w postaci kanonicznej a(x - p)^2 + q. */
const kanon = (a, p, qq) => `${wspA(a)}${kw(p)}${qq === 0 ? "" : qq > 0 ? ` + ${qq}` : ` - ${-qq}`}`;

/** Potęga w LaTeX: pot(q(1, 2), -3) = "\left(\frac{1}{2}\right)^{-3}", wykładnik 1 się pomija. */
const pot = (b, ex) => {
  const podstawa = b.d === 1 ? String(b.n) : `\\left(${b.tex()}\\right)`;
  return String(ex) === "1" ? podstawa : `${podstawa}^{${ex}}`;
};

/** Ciąg równości z pominięciem sąsiednich powtórzeń: lancuch("a", "b", "b", "c") = "a = b = c". */
const lancuch = (...cz) => cz.filter(Boolean).filter((c, i, t) => i === 0 || c !== t[i - 1]).join(" = ");

/** Podstawa potęgi albo logarytmu w LaTeX do indeksu dolnego: 2 albo \frac{1}{2}. */
const podst = (b) => b.tex();

/** Kroki „znajdź a z równości a^e = v” (e całkowite, różne od 0 i 1) – wspólne dla funkcji wykładniczej i logarytmicznej. */
function krokiPodstawa(b, e, v) {
  const inv = b.pow(-1);
  if (e > 0) return [`Zapisujemy $${v.tex()} = ${pot(b, e)}$, więc $a = ${b.tex()}$.`];
  return [
    `Wykładnik jest ujemny: $a^{${e}} = \\left(\\frac{1}{a}\\right)^{${-e}}$, więc $\\left(\\frac{1}{a}\\right)^{${-e}} = ${v.tex()}$.`,
    `Ponieważ $${v.tex()} = ${pot(inv, -e)}$, mamy $\\frac{1}{a} = ${inv.tex()}$, czyli $a = ${b.tex()}$.`,
  ];
}

/** Krok o monotoniczności dla podstawy b. */
const krokMonot = (b) => (b.cmp(1) > 0
  ? `Ponieważ $a = ${b.tex()} > 1$, funkcja jest rosnąca.`
  : `Ponieważ $0 < a = ${b.tex()} < 1$, funkcja jest malejąca.`);

/** Podstawy używane w generatorach funkcji wykładniczej i logarytmicznej. */
const PODSTAWY = [q(2), q(3), q(4), q(5), q(10), q(1, 2), q(1, 3), q(1, 4), q(1, 5), q(2, 3), q(3, 2), q(4, 3)];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 6.1
    {
      id: "kwadratowa",
      nazwa: "Funkcja kwadratowa",
      sciaga: [
        {
          nazwa: "Funkcja y = ax²",
          slownie: "Najprostsza funkcja kwadratowa ma wzór $f(x) = ax^2$, gdzie $a \\neq 0$. Jej wykresem jest parabola o wierzchołku $(0, 0)$ i osi symetrii $x = 0$. Dla $a > 0$ ramiona idą w górę, dla $a < 0$ – w dół.",
          tex: "f(x)=ax^2\\qquad a\\neq0",
          litery: "$a$ – współczynnik; im większe $|a|$, tym parabola jest węższa.",
          przyklad: "Dla $f(x) = -2x^2$ ramiona idą w dół, a $f(3) = -2\\cdot 3^2 = -18$ oraz $f(-3) = -18$.",
          uwaga: "Kwadrat liczby ujemnej jest dodatni: $(-3)^2 = 9$, więc $f(-3) = -2\\cdot 9 = -18$.",
        },
        {
          nazwa: "Postać kanoniczna",
          slownie: "Parabolę można opisać wzorem $f(x) = a(x - p)^2 + q$. Ma takie same ramiona jak $y = ax^2$, ale wierzchołek w punkcie $(p, q)$, a osią symetrii jest prosta $x = p$.",
          tex: "f(x)=a(x-p)^2+q\\qquad W=(p,\\,q)\\qquad x=p",
          litery: "$a$ – kierunek ramion, $p$ – pierwsza współrzędna wierzchołka, $q$ – druga współrzędna wierzchołka.",
          przyklad: "Dla $f(x) = 2(x - 3)^2 + 1$: $a = 2$, $p = 3$, $q = 1$, więc $W = (3, 1)$, ramiona idą w górę, a oś symetrii to $x = 3$.",
          uwaga: "Znak $p$ jest przeciwny do znaku w nawiasie: $f(x) = (x + 4)^2 - 5$ ma $p = -4$, więc $W = (-4, -5)$.",
        },
        {
          nazwa: "Zbiór wartości i monotoniczność",
          slownie: "Wierzchołek to najniższy albo najwyższy punkt paraboli. Dla $a > 0$ funkcja ma wartość najmniejszą $q$, dla $a < 0$ – wartość największą $q$. Po jednej stronie osi $x = p$ funkcja rośnie, po drugiej maleje.",
          tex: "a>0:\\ y\\geq q\\qquad a<0:\\ y\\leq q",
          litery: "$y$ – wartość funkcji, $q$ – druga współrzędna wierzchołka.",
          przyklad: "Dla $f(x) = -(x - 2)^2 + 5$ jest $a < 0$, więc największa wartość to $5$ (dla $x = 2$), zbiór wartości to $(-\\infty, 5\\rangle$, a funkcja rośnie w $(-\\infty, 2\\rangle$ i maleje w $\\langle 2, \\infty)$.",
          uwaga: "Zbiór wartości zależy od $q$, a nie od $p$. Liczba $p$ mówi, gdzie funkcja zmienia monotoniczność.",
        },
        {
          nazwa: "Miejsca zerowe z postaci kanonicznej",
          slownie: "Rozwiąż równanie $a(x - p)^2 + q = 0$, czyli $(x - p)^2 = -\\frac{q}{a}$. Gdy prawa strona jest dodatnia, są dwa miejsca zerowe, gdy jest równa $0$ – jedno, a gdy jest ujemna – żadnego.",
          tex: "(x-p)^2=-\\frac{q}{a}",
          litery: "$a$, $p$, $q$ – liczby z postaci kanonicznej.",
          przyklad: "Dla $f(x) = 2(x - 1)^2 - 8$: $(x - 1)^2 = 4$, więc $x - 1 = 2$ lub $x - 1 = -2$, czyli $x = 3$ lub $x = -1$.",
          uwaga: "Z $(x - 1)^2 = 4$ wynikają dwie możliwości, a nie tylko $x - 1 = 2$. Gdy $a$ i $q$ mają ten sam znak, miejsc zerowych nie ma.",
        },
        {
          nazwa: "Wzór z wierzchołka i punktu",
          slownie: "Gdy znasz wierzchołek $(p, q)$ i jeszcze jeden punkt paraboli, wstaw jego współrzędne do postaci kanonicznej i wyznacz $a$.",
          tex: "a=\\frac{y_0-q}{(x_0-p)^2}",
          litery: "$(p, q)$ – wierzchołek, $(x_0, y_0)$ – inny punkt paraboli, $x_0 \\neq p$.",
          przyklad: "Dla $W = (1, -2)$ i punktu $(3, 6)$: $a = \\frac{6 - (-2)}{(3 - 1)^2} = \\frac{8}{4} = 2$, więc $f(x) = 2(x - 1)^2 - 2$.",
          uwaga: "Za $x$ i $y$ wstawiamy współrzędne punktu $(x_0, y_0)$, a $p$ i $q$ bierzemy z wierzchołka.",
        },
      ],
      jak: [
        "Zapisz wzór w postaci $a(x - p)^2 + q$ i odczytaj $a$, $p$, $q$ (uwaga na znak $p$).",
        "Wierzchołek to $(p, q)$; ramiona idą w górę, gdy $a > 0$, w dół, gdy $a < 0$.",
        "Zbiór wartości odczytaj z $q$ i znaku $a$, a monotoniczność – z $p$.",
        "Miejsca zerowe: rozwiąż $(x - p)^2 = -\\frac{q}{a}$ i pamiętaj o obu pierwiastkach.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Wierzchołek paraboli będącej wykresem funkcji $f(x) = 3(x + 2)^2 - 7$ ma współrzędne. **Wybierz właściwą odpowiedź.**",
          opcje: ["$(2, -7)$", "$(-2, 7)$", "$(-2, -7)$", "$(3, -7)$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Zbiorem wartości funkcji $f(x) = -(x - 3)^2 + 4$ jest. **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-\\infty, 4\\rangle$", "$\\langle 4, \\infty)$", "$(-\\infty, 3\\rangle$", "$\\langle 3, \\infty)$"],
          poprawna: 0,
        },
        {
          nr: "3",
          tresc: "Dana jest funkcja $f(x) = 2(x - 1)^2 - 3$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wierzchołkiem paraboli jest punkt $(1, -3)$.", litery: "PF", poprawna: 0 },
            { tekst: "Największa wartość funkcji jest równa $-3$.", litery: "PF", poprawna: 1 },
            { tekst: "Funkcja jest malejąca w przedziale $(-\\infty, 1\\rangle$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "4",
          tresc: "Do wykresu funkcji $f(x) = ax^2$ należy punkt $(3, -18)$. Współczynnik $a$ jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$-6$", "$-2$", "$2$", "$-\\frac{1}{2}$"],
          poprawna: 1,
        },
        {
          nr: "5",
          tresc: "Osią symetrii paraboli będącej wykresem funkcji $f(x) = -(x - 5)^2 + 1$ jest prosta o równaniu. **Wybierz właściwą odpowiedź.**",
          opcje: ["$x = -5$", "$y = 1$", "$x = 1$", "$x = 5$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Funkcja kwadratowa jest dana wzorem $f(x) = 2(x - 3)^2 - 8$. Wyznacz współrzędne wierzchołka paraboli, miejsca zerowe funkcji i jej zbiór wartości. **Zapisz obliczenia.**",
          rozwiazanie: "Funkcja jest zapisana w postaci kanonicznej $f(x) = a(x - p)^2 + q$, gdzie $a = 2$, $p = 3$, $q = -8$. Wierzchołek: $W = (3, -8)$.\n\nMiejsca zerowe: $2(x - 3)^2 - 8 = 0$, więc $(x - 3)^2 = 4$.\n\nStąd $x - 3 = 2$ lub $x - 3 = -2$, czyli $x = 5$ lub $x = 1$.\n\nWspółczynnik $a = 2 > 0$, więc najmniejsza wartość to $q = -8$, a zbiór wartości to $\\langle -8, \\infty)$.\n\nOdpowiedź: $W = (3, -8)$, miejsca zerowe: $1$ i $5$, zbiór wartości: $\\langle -8, \\infty)$.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Wierzchołkiem paraboli będącej wykresem funkcji $f$ jest punkt $W = (2, -3)$, a wykres przechodzi przez punkt $A = (4, 5)$. Wyznacz wzór funkcji $f$ w postaci kanonicznej i sprawdź, czy punkt $B = (0, 5)$ należy do wykresu. **Zapisz obliczenia.**",
          rozwiazanie: "Wierzchołek to $(2, -3)$, więc $f(x) = a(x - 2)^2 - 3$.\n\nPunkt $A = (4, 5)$ leży na wykresie: $5 = a\\cdot (4 - 2)^2 - 3 = 4a - 3$.\n\nStąd $4a = 8$, więc $a = 2$ i $f(x) = 2(x - 2)^2 - 3$.\n\nDla punktu $B$: $f(0) = 2\\cdot (0 - 2)^2 - 3 = 8 - 3 = 5$. Wartość zgadza się z drugą współrzędną punktu $B$.\n\nOdpowiedź: $f(x) = 2(x - 2)^2 - 3$; punkt $B = (0, 5)$ należy do wykresu (jest symetryczny do $A$ względem osi $x = 2$).",
        },
      ],
      generatory: [
        {
          id: "kwadratowa-wierzcholek",
          nazwa: "Wierzchołek paraboli",
          opis: "Funkcja kwadratowa w postaci kanonicznej – odczytaj współrzędne wierzchołka.",
          generuj(r) {
            const a = r.pick([-4, -3, -2, -1, 1, 2, 3, 4]);
            const p = r.intBez(-7, 7, 0);
            const qq = r.intBez(-9, 9, 0);
            const krokP = p > 0
              ? `W nawiasie jest $${xm(p)}$, czyli $x - ${p}$, więc $p = ${p}$.`
              : `W nawiasie jest $${xm(p)} = x - (${p})$, więc $p = ${p}$.`;
            return {
              tresc: `Wykresem funkcji kwadratowej $f(x) = ${kanon(a, p, qq)}$ jest parabola. Podaj współrzędne jej wierzchołka $W = (p, q)$.`,
              pola: [
                { id: "p", typ: "liczba", etykieta: "$p =$" },
                { id: "q", typ: "liczba", etykieta: "$q =$" },
              ],
              odpowiedz: { p, q: qq },
              wynik: `$W = (${p}, ${qq})$`,
              rozwiazanie: [
                "Wzór ma postać kanoniczną $f(x) = a(x - p)^2 + q$, więc wierzchołek ma współrzędne $W = (p, q)$.",
                krokP,
                `Wyraz dodany na końcu to $q = ${qq}$. Zatem $W = (${p}, ${qq})$.`,
              ],
            };
          },
        },
        {
          id: "kwadratowa-miejsca-zerowe",
          nazwa: "Miejsca zerowe",
          opis: "Funkcja kwadratowa w postaci kanonicznej – oblicz jej miejsca zerowe.",
          generuj(r) {
            const a = r.pick([-4, -3, -2, -1, 1, 2, 3, 4]);
            const k = r.int(1, 5);
            const p = r.int(-6, 6);
            const qq = -a * k * k;
            const f = kanon(a, p, qq);
            return {
              tresc: `Wyznacz miejsca zerowe funkcji $f(x) = ${f}$.`,
              pola: [{ id: "x", typ: "zbior", ile: 2, etykieta: "Miejsca zerowe" }],
              odpowiedz: { x: [p - k, p + k] },
              wynik: `$x = ${p - k}$ lub $x = ${p + k}$`,
              rozwiazanie: [
                `Rozwiązujemy równanie $f(x) = 0$: $${f} = 0$.`,
                `Przenosimy wyraz wolny na drugą stronę i dzielimy przez współczynnik $a = ${a}$: $${kw(p)} = ${k * k}$.`,
                `Stąd $${xm(p)} = ${k}$ lub $${xm(p)} = ${-k}$.`,
                `Miejsca zerowe: $x = ${p - k}$ i $x = ${p + k}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 6.2
    {
      id: "kwadratowa-zastosowania",
      nazwa: "Funkcja kwadratowa – zastosowania",
      sciaga: [
        {
          nazwa: "Wartości w przedziale domkniętym",
          slownie: "Aby znaleźć najmniejszą i największą wartość funkcji kwadratowej w przedziale $\\langle m, n\\rangle$, policz jej wartości na obu końcach przedziału oraz w wierzchołku, jeśli leży on w tym przedziale. Spośród tych liczb wybierz najmniejszą i największą.",
          tex: "f(m)\\qquad f(n)\\qquad f(p),\\ p\\in\\langle m,n\\rangle",
          litery: "$m$, $n$ – końce przedziału, $p$ – pierwsza współrzędna wierzchołka.",
          przyklad: "Dla $f(x) = (x - 1)^2 - 4$ w przedziale $\\langle -2, 3\\rangle$: $p = 1$ leży w przedziale, $f(-2) = 5$, $f(3) = 0$, $f(1) = -4$. Najmniejsza wartość to $-4$, największa to $5$.",
          uwaga: "Gdy wierzchołek leży poza przedziałem, nie liczysz go: funkcja jest wtedy monotoniczna w tym przedziale, a wartości skrajne są na jego końcach.",
        },
        {
          nazwa: "Symetria paraboli",
          slownie: "Parabola jest symetryczna względem osi $x = p$. Jeśli $f(x_1) = f(x_2)$ dla $x_1 \\neq x_2$, to oś symetrii leży dokładnie w środku między nimi. Dotyczy to też miejsc zerowych.",
          tex: "p=\\frac{x_1+x_2}{2}",
          litery: "$x_1$, $x_2$ – dwa różne argumenty, dla których funkcja przyjmuje tę samą wartość.",
          przyklad: "Jeśli $f(1) = f(7)$, to $p = \\frac{1 + 7}{2} = 4$. Dla $f(x) = x(10 - x)$ miejsca zerowe to $0$ i $10$, więc $p = 5$.",
          uwaga: "Średnia arytmetyczna daje tylko $p$. Wartość $q$ liczysz osobno: $q = f(p)$.",
        },
        {
          nazwa: "Zadania optymalizacyjne",
          slownie: "Oznacz jedną wielkość przez $x$, zapisz szukaną wielkość (pole, iloczyn, wysokość) jako funkcję kwadratową zmiennej $x$ i wypisz ograniczenia na $x$. Znajdź wierzchołek i sprawdź, czy mieści się w dozwolonych wartościach $x$.",
          przyklad: "Prostokąt ma obwód $20$, więc jego boki to $x$ i $10 - x$ dla $0 < x < 10$. Pole $P(x) = x(10 - x)$ ma miejsca zerowe $0$ i $10$, więc $p = 5$, a $P(5) = 25$ – największe pole ma kwadrat $5 \\times 5$.",
          uwaga: "Odpowiedź musi mieć sens w zadaniu: długość boku jest dodatnia. Jeśli wierzchołek wypada poza dozwolonymi $x$, szukaj wyniku na brzegu.",
        },
      ],
      jak: [
        "Znajdź $p$: z postaci kanonicznej albo ze środka między miejscami zerowymi.",
        "Sprawdź, czy $p$ należy do danego przedziału (albo do dziedziny wynikającej z zadania).",
        "Policz wartości funkcji w wierzchołku i na końcach przedziału.",
        "Wybierz najmniejszą i największą z nich i odpowiedz na pytanie z zadania (z jednostką).",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Najmniejsza wartość funkcji $f(x) = -(x - 2)^2 + 9$ w przedziale $\\langle 0, 5\\rangle$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$", "$5$", "$0$", "$-9$"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Funkcja kwadratowa $f$ spełnia warunek $f(-1) = f(5)$. Osią symetrii wykresu tej funkcji jest prosta o równaniu. **Wybierz właściwą odpowiedź.**",
          opcje: ["$x = 3$", "$x = 2$", "$x = 4$", "$x = -2$"],
          poprawna: 1,
        },
        {
          nr: "10",
          tresc: "Dana jest funkcja $f(x) = (x - 3)^2 - 1$ określona w przedziale $\\langle 4, 6\\rangle$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Funkcja $f$ jest w tym przedziale rosnąca.", litery: "PF", poprawna: 0 },
            { tekst: "Najmniejsza wartość funkcji $f$ w tym przedziale jest równa $-1$.", litery: "PF", poprawna: 1 },
            { tekst: "Największa wartość funkcji $f$ w tym przedziale jest równa $8$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "11",
          tresc: "Suma dwóch liczb jest równa $12$. Największa możliwa wartość iloczynu tych liczb jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$", "$24$", "$72$", "$36$"],
          poprawna: 3,
        },
        {
          nr: "12",
          tresc: "Wysokość (w metrach) piłki rzuconej pionowo w górę po $t$ sekundach opisuje wzór $h(t) = -5t^2 + 20t$. Największa wysokość, jaką osiąga piłka, jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$20$ m", "$40$ m", "$15$ m", "$2$ m"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 3,
          tresc: "Ogrodnik ma $40$ m siatki. Chce ogrodzić prostokątną grządkę przylegającą do ściany domu: ściana jest jednym z boków, a siatką ogradza trzy pozostałe boki. Jakie wymiary powinna mieć grządka, aby jej pole było największe? Oblicz to pole. **Zapisz obliczenia.**",
          rozwiazanie: "Boki prostopadłe do ściany mają długość $x$, a bok równoległy do ściany ma długość $40 - 2x$. Warunek: $0 < x < 20$.\n\nPole: $P(x) = x(40 - 2x) = -2x^2 + 40x$.\n\nFunkcja ma ramiona w dół, a jej miejsca zerowe to $x = 0$ i $x = 20$. Wierzchołek leży w środku: $p = \\frac{0 + 20}{2} = 10$, a liczba $10$ należy do dziedziny $(0, 20)$.\n\nWymiary: $x = 10$ oraz $40 - 2\\cdot 10 = 20$. Pole: $P(10) = 10\\cdot 20 = 200$.\n\nOdpowiedź: grządka o wymiarach $10$ m na $20$ m (dłuższy bok przy ścianie), pole $200$ m².",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "Wyznacz najmniejszą i największą wartość funkcji $f(x) = 2(x + 1)^2 - 6$ w przedziale $\\langle -4, 1\\rangle$. **Zapisz obliczenia.**",
          rozwiazanie: "Wzór jest w postaci kanonicznej: $p = -1$, $q = -6$. Liczba $-1$ należy do przedziału $\\langle -4, 1\\rangle$, więc liczymy wartości w wierzchołku i na obu końcach.\n\n$f(-1) = -6$.\n\n$f(-4) = 2\\cdot (-4 + 1)^2 - 6 = 2\\cdot 9 - 6 = 12$ oraz $f(1) = 2\\cdot (1 + 1)^2 - 6 = 8 - 6 = 2$.\n\nNajmniejsza z liczb $-6$, $12$, $2$ to $-6$, a największa to $12$.\n\nOdpowiedź: najmniejsza wartość to $-6$, największa wartość to $12$.",
        },
      ],
      generatory: [
        {
          id: "zastosowania-przedzial",
          nazwa: "Wartość w przedziale",
          opis: "Najmniejsza albo największa wartość funkcji kwadratowej w przedziale domkniętym.",
          generuj(r) {
            for (;;) {
              const a = r.pick([-3, -2, -1, 1, 2, 3]);
              const p = r.int(-5, 5);
              const qq = r.intBez(-8, 8, 0);
              const m = r.int(-7, 4);
              const n = m + r.int(2, 8);
              if (n > 8) continue;
              const f = (x) => a * (x - p) ** 2 + qq;
              const wewnatrz = p >= m && p <= n;
              const punkty = wewnatrz ? [m, p, n] : [m, n];
              const najw = r.chance();
              const wartosci = punkty.map(f);
              const wynik = najw ? Math.max(...wartosci) : Math.min(...wartosci);
              const licz = (x) => (x === p
                ? `$f(${p}) = ${qq}$`
                : `$f(${x}) = ${a === 1 ? "" : `${zn(a)}\\cdot `}${zn(x - p)}^2 ${qq > 0 ? "+" : "-"} ${Math.abs(qq)} = ${f(x)}$`);
              return {
                tresc: `Funkcja kwadratowa jest określona wzorem $f(x) = ${kanon(a, p, qq)}$. Oblicz ${najw ? "największą" : "najmniejszą"} wartość tej funkcji w przedziale $\\langle ${m}, ${n}\\rangle$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: najw ? "Największa wartość" : "Najmniejsza wartość" }],
                odpowiedz: { w: wynik },
                wynik: `$${wynik}$`,
                rozwiazanie: [
                  `Z postaci kanonicznej: $p = ${p}$, $q = ${qq}$.`,
                  wewnatrz
                    ? `Liczba $${p}$ należy do przedziału $\\langle ${m}, ${n}\\rangle$, więc liczymy wartości w wierzchołku i na obu końcach.`
                    : `Liczba $${p}$ nie należy do przedziału $\\langle ${m}, ${n}\\rangle$, więc wartości skrajne są na końcach przedziału.`,
                  `${punkty.map(licz).join(", ")}.`,
                  `${najw ? "Największa" : "Najmniejsza"} z liczb ${[...new Set(wartosci)].map((v) => `$${v}$`).join(", ")} to $${wynik}$.`,
                ],
              };
            }
          },
        },
        {
          id: "zastosowania-optymalizacja",
          nazwa: "Zadanie optymalizacyjne",
          opis: "Największy iloczyn, największe pole albo największa wysokość – z miejsc zerowych i symetrii paraboli.",
          generuj(r) {
            const typ = r.int(0, 2);
            if (typ === 0) {
              const s = 2 * r.int(3, 20);
              const w = (s / 2) * (s / 2);
              return {
                tresc: `Suma dwóch liczb jest równa ${s}. Oblicz największą możliwą wartość iloczynu tych liczb.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Największy iloczyn" }],
                odpowiedz: { w },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Jedna liczba to $x$, druga to $${s} - x$, a iloczyn to $P(x) = x(${s} - x)$.`,
                  `To funkcja kwadratowa z ramionami w dół ($a = -1$), której miejsca zerowe to $x = 0$ i $x = ${s}$.`,
                  `Wierzchołek leży w środku między miejscami zerowymi: $p = \\frac{0 + ${s}}{2} = ${s / 2}$.`,
                  `$P(${s / 2}) = ${s / 2}\\cdot ${s / 2} = ${w}$.`,
                ],
              };
            }
            if (typ === 1) {
              const k = r.int(3, 20);
              const L = 4 * k;
              const w = 2 * k * k;
              return {
                tresc: `Rolnik ma ${L} m siatki i ogradza prostokątny wybieg przylegający do ściany stodoły: ściana jest jednym z boków, a siatką ogradza trzy pozostałe boki. Oblicz największe możliwe pole wybiegu (w metrach kwadratowych).`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Największe pole (w m²)" }],
                odpowiedz: { w },
                wynik: `$${w}$ m²`,
                rozwiazanie: [
                  `Boki prostopadłe do ściany mają długość $x$, a bok równoległy ma długość $${L} - 2x$. Pole: $P(x) = x(${L} - 2x)$.`,
                  `Ramiona paraboli idą w dół ($a = -2$), a miejsca zerowe to $x = 0$ i $x = ${2 * k}$.`,
                  `Wierzchołek: $p = \\frac{0 + ${2 * k}}{2} = ${k}$, a liczba $${k}$ mieści się w dozwolonym przedziale $(0, ${2 * k})$.`,
                  `$P(${k}) = ${k}\\cdot ${2 * k} = ${w}$.`,
                ],
              };
            }
            const k = r.int(1, 8);
            const v = 10 * k;
            const w = 5 * k * k;
            return {
              tresc: `Wysokość (w metrach) piłki rzuconej pionowo w górę po $t$ sekundach opisuje wzór $h(t) = -5t^2 + ${v}t$. Oblicz największą wysokość, jaką osiąga piłka.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Największa wysokość (w m)" }],
              odpowiedz: { w },
              wynik: `$${w}$ m`,
              rozwiazanie: [
                `Przekształcamy wzór: $h(t) = t(-5t + ${v})$, więc miejsca zerowe to $t = 0$ i $t = ${2 * k}$.`,
                `Ramiona paraboli idą w dół, więc największa wartość jest w wierzchołku: $p = \\frac{0 + ${2 * k}}{2} = ${k}$.`,
                `$h(${k}) = -5\\cdot ${k}^2 + ${v}\\cdot ${k} = ${w}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 6.3
    {
      id: "odwrotna",
      nazwa: "Proporcjonalność odwrotna",
      sciaga: [
        {
          nazwa: "Proporcjonalność odwrotna",
          slownie: "Dwie wielkości są odwrotnie proporcjonalne, gdy ich iloczyn jest stały: gdy jedna rośnie kilka razy, druga tyle samo razy maleje. Opisuje je funkcja $y = \\frac{a}{x}$ dla $x \\neq 0$.",
          tex: "y=\\frac{a}{x}\\qquad xy=a",
          litery: "$a$ – współczynnik proporcjonalności (stała, $a \\neq 0$), $x$, $y$ – wielkości odwrotnie proporcjonalne.",
          przyklad: "Przy prędkości $60$ km/h przejazd trwa $2$ h, więc droga to $a = 60\\cdot 2 = 120$ km i $t = \\frac{120}{v}$. Przy $40$ km/h potrzeba $\\frac{120}{40} = 3$ h.",
          uwaga: "Nie myl z proporcjonalnością prostą $y = ax$, w której stały jest iloraz $\\frac{y}{x}$.",
        },
        {
          nazwa: "Wykres – hiperbola",
          slownie: "Wykres składa się z dwóch gałęzi i nie przecina żadnej z osi. Dla $a > 0$ leży w ćwiartkach I i III, dla $a < 0$ – w ćwiartkach II i IV. Jest symetryczny względem początku układu współrzędnych.",
          tex: "D=\\mathbb{R}\\setminus\\{0\\}\\qquad \\mathrm{ZW}=\\mathbb{R}\\setminus\\{0\\}",
          litery: "$D$ – dziedzina, $\\mathrm{ZW}$ – zbiór wartości.",
          przyklad: "Wykres $f(x) = \\frac{6}{x}$ przechodzi przez punkty $(1, 6)$, $(2, 3)$, $(-2, -3)$, $(-6, -1)$. Wszystkie leżą w ćwiartkach I i III.",
          uwaga: "Funkcja nie ma miejsc zerowych, bo ułamek $\\frac{a}{x}$ z $a \\neq 0$ nigdy nie jest równy $0$.",
        },
        {
          nazwa: "Monotoniczność",
          slownie: "Dla $a > 0$ funkcja maleje osobno w przedziale $(-\\infty, 0)$ i osobno w przedziale $(0, \\infty)$. Dla $a < 0$ rośnie w każdym z tych przedziałów. W całej dziedzinie nie jest monotoniczna.",
          przyklad: "Dla $f(x) = \\frac{4}{x}$: $f(1) = 4 > f(2) = 2$, więc w $(0, \\infty)$ funkcja maleje. Ale $-1 < 1$, a $f(-1) = -4 < f(1) = 4$, więc w całej dziedzinie nie maleje.",
          uwaga: "Nie zapisuj, że funkcja maleje w $(-\\infty, 0) \\cup (0, \\infty)$ – podawaj te przedziały osobno.",
        },
        {
          nazwa: "Wyznaczanie współczynnika a",
          slownie: "Gdy punkt $(x_0, y_0)$ leży na wykresie, jego współrzędne spełniają równanie $y_0 = \\frac{a}{x_0}$, więc $a$ jest iloczynem współrzędnych punktu.",
          tex: "a=x_0\\cdot y_0",
          litery: "$(x_0, y_0)$ – punkt należący do wykresu.",
          przyklad: "Dla punktu $(-3, 2)$: $a = -3\\cdot 2 = -6$, więc $f(x) = \\frac{-6}{x}$ i wykres leży w ćwiartkach II i IV.",
          uwaga: "Punkt należy do wykresu, gdy iloczyn jego współrzędnych jest równy $a$: dla $a = -6$ punkt $(2, -3)$ należy, a $(-2, -3)$ nie.",
        },
      ],
      jak: [
        "Sprawdź, czy iloczyn obu wielkości jest stały – wtedy to proporcjonalność odwrotna.",
        "Wyznacz $a$ z danych (iloczyn współrzędnych punktu albo iloczyn wielkości z zadania).",
        "Zapisz wzór $y = \\frac{a}{x}$ i podstaw szukaną wartość.",
        "Znak $a$ mówi, w których ćwiartkach leży wykres i czy funkcja maleje, czy rośnie.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Wykres funkcji $f(x) = \\frac{a}{x}$ przechodzi przez punkt $(-4, 3)$. Współczynnik $a$ jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$-\\frac{3}{4}$", "$-12$", "$12$", "$-1$"],
          poprawna: 1,
        },
        {
          nr: "16",
          tresc: "Dziedziną funkcji $f(x) = \\frac{-5}{x}$ jest zbiór. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\mathbb{R}$", "$(0, \\infty)$", "$\\mathbb{R} \\setminus \\{-5\\}$", "$\\mathbb{R} \\setminus \\{0\\}$"],
          poprawna: 3,
        },
        {
          nr: "17",
          tresc: "Dana jest funkcja $f(x) = \\frac{-6}{x}$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Funkcja $f$ jest rosnąca w przedziale $(0, \\infty)$.", litery: "PF", poprawna: 0 },
            { tekst: "Wykres funkcji $f$ leży w ćwiartkach I i III.", litery: "PF", poprawna: 1 },
            { tekst: "Punkt $(2, -3)$ należy do wykresu funkcji $f$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "18",
          tresc: "Osiem jednakowo wydajnych robotników wykonuje pewną pracę w $15$ dni. W ile dni tę samą pracę wykona $10$ takich robotników? **Wybierz właściwą odpowiedź.**",
          opcje: ["$18{,}75$", "$17$", "$12$", "$13$"],
          poprawna: 2,
        },
        {
          nr: "19",
          tresc: "Dana jest funkcja $f(x) = \\frac{12}{x}$. Wartość wyrażenia $f(-4) + f(3)$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$1$", "$-1$", "$7$", "$-7$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Wykres funkcji $f(x) = \\frac{a}{x}$ przechodzi przez punkt $A = (-2, 5)$. Wyznacz $a$ i sprawdź, czy do wykresu należą punkty $B = (5, -2)$ oraz $C = (-5, -2)$. **Zapisz obliczenia.**",
          rozwiazanie: "Punkt $A$ leży na wykresie, więc $5 = \\frac{a}{-2}$, stąd $a = 5\\cdot (-2) = -10$ i $f(x) = \\frac{-10}{x}$.\n\n$f(5) = \\frac{-10}{5} = -2$, więc punkt $B = (5, -2)$ należy do wykresu.\n\n$f(-5) = \\frac{-10}{-5} = 2 \\neq -2$, więc punkt $C = (-5, -2)$ nie należy do wykresu.\n\nOdpowiedź: $a = -10$; punkt $B$ należy do wykresu, a punkt $C$ nie należy.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Autobus jadący ze średnią prędkością $60$ km/h pokonuje pewną trasę w czasie $4{,}5$ h. Zapisz czas $t$ przejazdu tej trasy jako funkcję średniej prędkości $v$. Oblicz, ile godzin potrwa przejazd z prędkością $45$ km/h oraz z jaką średnią prędkością trzeba jechać, aby pokonać trasę w $3$ h. **Zapisz obliczenia.**",
          rozwiazanie: "Droga jest stała: $s = v\\cdot t = 60\\cdot 4{,}5 = 270$ km, więc $t(v) = \\frac{270}{v}$.\n\nDla $v = 45$: $t = \\frac{270}{45} = 6$ h.\n\nDla $t = 3$: $3 = \\frac{270}{v}$, stąd $v = \\frac{270}{3} = 90$ km/h.\n\nOdpowiedź: $t = \\frac{270}{v}$; przy $45$ km/h przejazd trwa $6$ h; w $3$ h można pokonać trasę ze średnią prędkością $90$ km/h.",
        },
      ],
      generatory: [
        {
          id: "odwrotna-wzor",
          nazwa: "Wzór y = a/x",
          opis: "Wyznacz a z punktu wykresu albo oblicz wartość funkcji y = a/x lub argument, dla którego przyjmuje ona daną wartość.",
          generuj(r) {
            const tryb = r.int(0, 2);
            const ulamek = (a) => (a < 0 ? `-\\frac{${-a}}{x}` : `\\frac{${a}}{x}`);
            if (tryb === 0) {
              const x0 = r.intBez(-8, 8, 0);
              const y0 = r.intBez(-8, 8, 0);
              const a = x0 * y0;
              const cw = a > 0 ? "I i III" : "II i IV";
              return {
                tresc: `Wykres funkcji $f(x) = \\frac{a}{x}$ przechodzi przez punkt $A = (${x0}, ${y0})$. Oblicz $a$ i rozstrzygnij, w których ćwiartkach układu współrzędnych leży wykres.`,
                pola: [
                  { id: "a", typ: "liczba", etykieta: "$a =$" },
                  { id: "c", typ: "wybor", etykieta: "Wykres leży w ćwiartkach", opcje: ["I i III", "II i IV"] },
                ],
                odpowiedz: { a, c: a > 0 ? 0 : 1 },
                wynik: `$a = ${a}$, ćwiartki ${cw}`,
                rozwiazanie: [
                  `Punkt należy do wykresu, więc $${y0} = \\frac{a}{${x0}}$, czyli $a = ${zn(x0)}\\cdot ${zn(y0)} = ${a}$.`,
                  `Współczynnik $a$ jest ${a > 0 ? "dodatni" : "ujemny"}, więc wykres leży w ćwiartkach ${cw}.`,
                ],
              };
            }
            const a = r.intBez(-24, 24, 0);
            const t = r.intBez(-8, 8, 0);
            const w = q(a, t);
            if (tryb === 1) {
              return {
                tresc: `Funkcja $f$ jest określona wzorem $f(x) = ${ulamek(a)}$. Oblicz $f(${t})$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `$f(${t}) =$` }],
                odpowiedz: { w },
                wynik: `$f(${t}) = ${w.tex()}$`,
                rozwiazanie: [
                  `Podstawiamy $x = ${t}$ do wzoru.`,
                  `$f(${t}) = \\frac{${a}}{${t}} = ${w.tex()}$.`,
                ],
              };
            }
            return {
              tresc: `Funkcja $f$ jest określona wzorem $f(x) = ${ulamek(a)}$. Dla jakiego argumentu $x$ wartość funkcji jest równa $${t}$?`,
              pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }],
              odpowiedz: { x: w },
              wynik: `$x = ${w.tex()}$`,
              rozwiazanie: [
                `Rozwiązujemy równanie $\\frac{${a}}{x} = ${t}$ przy założeniu $x \\neq 0$.`,
                `Mnożymy obie strony przez $x$ i dzielimy przez $${t}$: $x = \\frac{${a}}{${t}} = ${w.tex()}$.`,
              ],
            };
          },
        },
        {
          id: "odwrotna-tekstowe",
          nazwa: "Zadanie tekstowe",
          opis: "Praca, droga albo składka – wielkości odwrotnie proporcjonalne (stały iloczyn).",
          generuj(r) {
            for (;;) {
              const typ = r.int(0, 2);
              if (typ === 0) {
                const n1 = r.pick([2, 3, 4, 5, 6, 8, 9, 10, 12]);
                const d1 = r.int(2, 15);
                const a = n1 * d1;
                const n2 = r.int(2, 24);
                if (n2 === n1 || a % n2 !== 0 || a / n2 < 2) continue;
                const w = a / n2;
                return {
                  tresc: `Grupa ${n1} jednakowo wydajnych robotników wykonuje pewną pracę w ${d1} dni. W ile dni tę samą pracę wykona grupa ${n2} takich robotników?`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Liczba dni" }],
                  odpowiedz: { w },
                  wynik: `$${w}$ dni`,
                  rozwiazanie: [
                    "Liczba robotników i liczba dni są odwrotnie proporcjonalne, więc ich iloczyn jest stały.",
                    `$a = ${n1}\\cdot ${d1} = ${a}$, czyli $y = \\frac{${a}}{x}$.`,
                    `Dla $x = ${n2}$ robotników: $y = \\frac{${a}}{${n2}} = ${w}$ dni.`,
                  ],
                };
              }
              if (typ === 1) {
                const v1 = r.pick([30, 40, 45, 50, 60, 72, 80, 90]);
                const t1 = r.int(2, 8);
                const a = v1 * t1;
                const opisTrasy = `Autobus jadący ze średnią prędkością ${v1} km/h pokonuje trasę w ${t1} h.`;
                const wstep = [
                  "Droga jest stała, więc średnia prędkość i czas przejazdu są odwrotnie proporcjonalne: $v\\cdot t = a$.",
                  `$a = ${v1}\\cdot ${t1} = ${a}$ km.`,
                ];
                if (r.chance()) {
                  const v2 = r.pick([20, 24, 25, 30, 36, 40, 45, 48, 50, 60, 72, 75, 80, 90, 100, 120]);
                  if (v2 === v1 || a % v2 !== 0 || a / v2 < 2 || a / v2 > 15) continue;
                  const w = a / v2;
                  return {
                    tresc: `${opisTrasy} Ile godzin potrwa przejazd tej samej trasy ze średnią prędkością ${v2} km/h?`,
                    pola: [{ id: "w", typ: "liczba", etykieta: "Czas (w godzinach)" }],
                    odpowiedz: { w },
                    wynik: `$${w}$ h`,
                    rozwiazanie: [...wstep, `$t = \\frac{${a}}{${v2}} = ${w}$ h.`],
                  };
                }
                const t2 = r.int(2, 12);
                if (t2 === t1 || a % t2 !== 0 || a / t2 < 20 || a / t2 > 130) continue;
                const w = a / t2;
                return {
                  tresc: `${opisTrasy} Z jaką średnią prędkością (w km/h) trzeba jechać, aby pokonać tę samą trasę w ${t2} h?`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Prędkość (w km/h)" }],
                  odpowiedz: { w },
                  wynik: `$${w}$ km/h`,
                  rozwiazanie: [...wstep, `$v = \\frac{${a}}{${t2}} = ${w}$ km/h.`],
                };
              }
              const k = r.int(8, 30);
              const c = r.pick([10, 12, 15, 20, 24, 25, 30, 36, 40, 45, 50]);
              const a = k * c;
              const m = r.int(5, 40);
              if (m === k || a % m !== 0) continue;
              const w = a / m;
              return {
                tresc: `${k} osób zrzuca się na wspólny prezent, każda po ${c} zł. Ile złotych musiałaby wpłacić każda osoba, gdyby na ten sam prezent składało się ${m} osób, każda po tyle samo?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wpłata jednej osoby (w zł)" }],
                odpowiedz: { w },
                wynik: `$${w}$ zł`,
                rozwiazanie: [
                  "Liczba osób i wpłata jednej osoby są odwrotnie proporcjonalne, bo łączna kwota jest stała.",
                  `$a = ${k}\\cdot ${c} = ${a}$ zł.`,
                  `Dla $${m}$ osób: $\\frac{${a}}{${m}} = ${w}$ zł.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 6.4
    {
      id: "wykladnicza",
      nazwa: "Funkcja wykładnicza",
      sciaga: [
        {
          nazwa: "Funkcja wykładnicza",
          slownie: "Funkcja wykładnicza ma wzór $f(x) = a^x$, gdzie podstawa $a > 0$ i $a \\neq 1$, a zmienna $x$ stoi w wykładniku. Jest określona dla wszystkich liczb rzeczywistych.",
          tex: "f(x)=a^x\\qquad a>0,\\ a\\neq1",
          litery: "$a$ – podstawa potęgi, $x$ – wykładnik.",
          przyklad: "Dla $f(x) = 2^x$: $f(3) = 8$, $f(0) = 1$, $f(-2) = \\frac{1}{4}$.",
          uwaga: "$2^x$ i $x^2$ to różne funkcje: dla $x = 3$ mamy $2^3 = 8$, ale $3^2 = 9$.",
        },
        {
          nazwa: "Własności wykresu",
          slownie: "Wykres zawsze przechodzi przez punkt $(0, 1)$ i leży nad osią $OX$: wartości są tylko dodatnie. Zbliża się do osi $OX$, ale jej nie przecina, więc funkcja nie ma miejsc zerowych.",
          tex: "\\mathrm{ZW}=(0,\\infty)\\qquad f(0)=1",
          litery: "$\\mathrm{ZW}$ – zbiór wartości funkcji.",
          przyklad: "Dla $f(x) = 3^x$ zawsze $f(x) > 0$, więc równanie $3^x = -9$ ani $3^x = 0$ nie ma rozwiązań.",
          uwaga: "Wartość funkcji wykładniczej nigdy nie jest równa $0$ ani ujemna.",
        },
        {
          nazwa: "Monotoniczność",
          slownie: "Dla $a > 1$ funkcja jest rosnąca, a dla $0 < a < 1$ – malejąca. Dlatego przy tej samej podstawie większą wartość ma potęga o większym wykładniku, gdy $a > 1$, a o mniejszym – gdy $0 < a < 1$.",
          tex: "a>1:\\ \\text{rosnąca}\\qquad 0<a<1:\\ \\text{malejąca}",
          przyklad: "$f(x) = 2^x$ rośnie: $2^{-1} < 2^3$. Funkcja $g(x) = \\left(\\frac{1}{2}\\right)^x$ maleje: $g(-2) = 4 > g(3) = \\frac{1}{8}$, choć $-2 < 3$.",
          uwaga: "Dla podstawy z przedziału $(0, 1)$ nierówność między wartościami ma kierunek przeciwny niż między wykładnikami.",
        },
        {
          nazwa: "Podstawa z punktu wykresu",
          slownie: "Gdy punkt $(x_0, y_0)$ leży na wykresie, jego współrzędne spełniają równanie $a^{x_0} = y_0$. Zapisz $y_0$ jako potęgę o wykładniku $x_0$ i odczytaj $a$.",
          tex: "a^{x_0}=y_0",
          litery: "$(x_0, y_0)$ – punkt należący do wykresu, $a$ – szukana podstawa.",
          przyklad: "Dla punktu $(3, 8)$: $a^3 = 8 = 2^3$, więc $a = 2$. Dla punktu $(-2, 9)$: $a^{-2} = 9$, czyli $\\frac{1}{a^2} = 9$, więc $\\frac{1}{a} = 3$ i $a = \\frac{1}{3}$.",
          uwaga: "Podstawa musi spełniać $a > 0$ i $a \\neq 1$, więc ujemnego rozwiązania nie bierzemy pod uwagę.",
        },
      ],
      jak: [
        "Sprawdź podstawę: $a > 1$ (funkcja rosnąca) czy $0 < a < 1$ (funkcja malejąca).",
        "Do porównywania potęg o tej samej podstawie porównaj wykładniki, pamiętając o monotoniczności.",
        "Wartości liczysz zgodnie z zasadami potęg: $a^{-n} = \\left(\\frac{1}{a}\\right)^n$, $a^0 = 1$.",
        "Podstawę z punktu wykresu znajdź z równości $a^{x_0} = y_0$.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Dana jest funkcja $f(x) = \\left(\\frac{1}{3}\\right)^x$. Wartość $f(-2)$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{9}$", "$-\\frac{2}{3}$", "$9$", "$-9$"],
          poprawna: 2,
        },
        {
          nr: "23",
          tresc: "Wykres funkcji wykładniczej $f(x) = a^x$ przechodzi przez punkt $(2, 25)$. Podstawa $a$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$-5$", "$5$", "$\\frac{25}{2}$", "$625$"],
          poprawna: 1,
        },
        {
          nr: "24",
          tresc: "Która z nierówności jest prawdziwa? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "$\\left(\\frac{1}{2}\\right)^{3} > \\left(\\frac{1}{2}\\right)^{2}$",
            "$3^{-2} > 3^{-1}$",
            "$5^{0} < 5^{-3}$",
            "$\\left(\\frac{2}{3}\\right)^{-2} > \\left(\\frac{2}{3}\\right)^{2}$",
          ],
          poprawna: 3,
        },
        {
          nr: "25",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Funkcja $f(x) = \\left(\\frac{3}{2}\\right)^x$ jest rosnąca.", litery: "PF", poprawna: 0 },
            { tekst: "Wykres funkcji $g(x) = (0{,}2)^x$ leży pod osią $OX$.", litery: "PF", poprawna: 1 },
            { tekst: "Punkt $(-1, 2)$ należy do wykresu funkcji $h(x) = \\left(\\frac{1}{2}\\right)^x$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "26",
          tresc: "Dana jest funkcja $f(x) = 4^x$. Wartość $f\\left(\\frac{3}{2}\\right)$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$", "$6$", "$16$", "$2$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 3,
          tresc: "Wykres funkcji wykładniczej $f(x) = a^x$ przechodzi przez punkt $P = \\left(-2, \\frac{4}{9}\\right)$. Wyznacz $a$, oblicz $f(3)$ i rozstrzygnij, czy funkcja jest rosnąca, czy malejąca. **Zapisz obliczenia.**",
          rozwiazanie: "Punkt należy do wykresu: $a^{-2} = \\frac{4}{9}$, czyli $\\left(\\frac{1}{a}\\right)^2 = \\frac{4}{9}$.\n\nPonieważ $a > 0$, mamy $\\frac{1}{a} = \\frac{2}{3}$, stąd $a = \\frac{3}{2}$.\n\n$f(3) = \\left(\\frac{3}{2}\\right)^3 = \\frac{27}{8}$.\n\nPodstawa $\\frac{3}{2} > 1$, więc funkcja jest rosnąca.\n\nOdpowiedź: $a = \\frac{3}{2}$, $f(3) = \\frac{27}{8}$, funkcja jest rosnąca.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "Uporządkuj rosnąco liczby: $\\left(\\frac{1}{2}\\right)^{-2}$, $\\left(\\frac{1}{2}\\right)^{3}$, $\\left(\\frac{1}{2}\\right)^{0}$, $\\left(\\frac{1}{2}\\right)^{2}$. **Zapisz obliczenia.**",
          rozwiazanie: "Podstawa $\\frac{1}{2}$ należy do przedziału $(0, 1)$, więc funkcja $f(x) = \\left(\\frac{1}{2}\\right)^x$ jest malejąca: większy wykładnik daje mniejszą wartość.\n\nWykładniki rosnąco: $-2 < 0 < 2 < 3$, więc wartości ustawiają się malejąco: $\\left(\\frac{1}{2}\\right)^{-2} > \\left(\\frac{1}{2}\\right)^{0} > \\left(\\frac{1}{2}\\right)^{2} > \\left(\\frac{1}{2}\\right)^{3}$.\n\nSprawdzenie: $4 > 1 > \\frac{1}{4} > \\frac{1}{8}$.\n\nOdpowiedź (rosnąco): $\\left(\\frac{1}{2}\\right)^{3} < \\left(\\frac{1}{2}\\right)^{2} < \\left(\\frac{1}{2}\\right)^{0} < \\left(\\frac{1}{2}\\right)^{-2}$.",
        },
      ],
      generatory: [
        {
          id: "wykladnicza-wartosc",
          nazwa: "Wartość funkcji",
          opis: "Oblicz wartość funkcji wykładniczej dla wykładnika całkowitego, ujemnego albo połówkowego (np. 4^(3/2)).",
          generuj(r) {
            for (;;) {
              if (r.chance(0.65)) {
                const b = r.pick(PODSTAWY);
                const k = r.pick([-3, -2, 0, 2, 3, 4]);
                const w = b.pow(k);
                if (!ladna(w)) continue;
                const inv = b.pow(-1);
                return {
                  tresc: `Funkcja wykładnicza jest określona wzorem $f(x) = ${pot(b, "x")}$. Oblicz $f(${k})$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: `$f(${k}) =$` }],
                  odpowiedz: { w },
                  wynik: `$f(${k}) = ${w.tex()}$`,
                  rozwiazanie: [
                    `Podstawiamy $x = ${k}$: $f(${k}) = ${pot(b, k)}$.`,
                    k < 0
                      ? `Wykładnik ujemny zamieniamy na dodatni, odwracając podstawę: $${pot(b, k)} = ${pot(inv, -k)}$.`
                      : k === 0
                        ? "Każda liczba różna od $0$ podniesiona do potęgi $0$ daje $1$."
                        : "Obliczamy potęgę.",
                    `$f(${k}) = ${lancuch(pot(b, k), k < 0 ? pot(inv, -k) : "", w.tex())}$.`,
                  ],
                };
              }
              const b = r.pick([q(4), q(9), q(16), q(25), q(36), q(1, 4), q(1, 9), q(1, 16), q(4, 9), q(9, 4), q(9, 16), q(16, 9)]);
              const m = r.pick([1, 3, 5, -1, -3]);
              const korzen = q(Math.round(Math.sqrt(b.n)), Math.round(Math.sqrt(b.d)));
              const w = korzen.pow(m);
              if (!ladna(w)) continue;
              const x = q(m, 2);
              const sqrtTex = `\\sqrt{${b.tex()}}`;
              const wyr = m === 1 ? sqrtTex : `\\left(${sqrtTex}\\right)^{${m}}`;
              return {
                tresc: `Funkcja wykładnicza jest określona wzorem $f(x) = ${pot(b, "x")}$. Oblicz $f\\left(${x.tex()}\\right)$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `$f\\left(${x.tex()}\\right) =$` }],
                odpowiedz: { w },
                wynik: `$f\\left(${x.tex()}\\right) = ${w.tex()}$`,
                rozwiazanie: [
                  `Podstawiamy $x = ${x.tex()}$: $f\\left(${x.tex()}\\right) = ${pot(b, x.tex())}$.`,
                  `Wykładnik z mianownikiem $2$ oznacza pierwiastek kwadratowy: $${pot(b, x.tex())} = ${wyr}$.`,
                  `$${sqrtTex} = ${korzen.tex()}$, więc $f\\left(${x.tex()}\\right) = ${lancuch(wyr, pot(korzen, m), w.tex())}$.`,
                ],
              };
            }
          },
        },
        {
          id: "wykladnicza-podstawa",
          nazwa: "Podstawa z punktu",
          opis: "Znajdź podstawę funkcji wykładniczej z punktu jej wykresu i rozstrzygnij, czy funkcja rośnie, czy maleje.",
          generuj(r) {
            const b = r.pick(PODSTAWY);
            const e = r.pick([-3, -2, 2, 3, 4]);
            const v = b.pow(e);
            return {
              tresc: `Wykres funkcji wykładniczej $f(x) = a^x$ przechodzi przez punkt $P = (${e}, ${v.tex()})$. Oblicz $a$ i rozstrzygnij, czy funkcja jest rosnąca, czy malejąca.`,
              pola: [
                { id: "a", typ: "liczba", etykieta: "$a =$" },
                { id: "m", typ: "wybor", etykieta: "Funkcja $f$ jest", opcje: ["rosnąca", "malejąca"] },
              ],
              odpowiedz: { a: b, m: b.cmp(1) > 0 ? 0 : 1 },
              wynik: `$a = ${b.tex()}$, funkcja ${b.cmp(1) > 0 ? "rosnąca" : "malejąca"}`,
              rozwiazanie: [
                `Punkt należy do wykresu, więc $a^{${e}} = ${v.tex()}$.`,
                ...krokiPodstawa(b, e, v),
                krokMonot(b),
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 6.5
    {
      id: "logarytmiczna",
      nazwa: "Funkcja logarytmiczna",
      sciaga: [
        {
          nazwa: "Funkcja logarytmiczna",
          slownie: "Funkcja logarytmiczna ma wzór $f(x) = \\log_a x$, gdzie $a > 0$ i $a \\neq 1$. Logarytm istnieje tylko dla argumentów dodatnich, więc dziedziną jest przedział $(0, \\infty)$.",
          tex: "f(x)=\\log_a x\\qquad a>0,\\ a\\neq1",
          litery: "$a$ – podstawa logarytmu, $x>0$ – argument.",
          przyklad: "Dla $f(x) = \\log_2 x$: $f(8) = 3$, bo $2^3 = 8$; $f\\left(\\frac{1}{4}\\right) = -2$, bo $2^{-2} = \\frac{1}{4}$; $f(1) = 0$.",
          uwaga: "Nie ma $\\log_2 (-4)$ ani $\\log_2 0$ – argument musi być dodatni.",
        },
        {
          nazwa: "Własności wykresu",
          slownie: "Zbiorem wartości jest cały zbiór liczb rzeczywistych. Wykres przechodzi przez punkt $(1, 0)$, więc jedynym miejscem zerowym jest $x = 1$. Leży po prawej stronie osi $OY$. Funkcje $a^x$ i $\\log_a x$ są odwrotne: punkt $(x, y)$ jednego wykresu odpowiada punktowi $(y, x)$ drugiego.",
          tex: "D=(0,\\infty)\\qquad \\mathrm{ZW}=\\mathbb{R}\\qquad f(1)=0",
          litery: "$D$ – dziedzina, $\\mathrm{ZW}$ – zbiór wartości.",
          przyklad: "Dla $f(x) = \\log_3 x$ punkt $(9, 2)$ leży na wykresie, bo $3^2 = 9$. Wartości mogą być ujemne: $f\\left(\\frac{1}{3}\\right) = -1$.",
          uwaga: "Wartość logarytmu może być ujemna, ale argument – nigdy.",
        },
        {
          nazwa: "Monotoniczność i porównywanie",
          slownie: "Dla $a > 1$ funkcja jest rosnąca, a dla $0 < a < 1$ – malejąca. Przy $a > 1$ większemu argumentowi odpowiada większy logarytm, a przy $0 < a < 1$ – mniejszy.",
          tex: "a>1:\\ \\text{rosnąca}\\qquad 0<a<1:\\ \\text{malejąca}",
          przyklad: "$\\log_2 5 < \\log_2 7$, ale $\\log_{\\frac{1}{2}} 5 > \\log_{\\frac{1}{2}} 7$.",
          uwaga: "Dla podstawy z przedziału $(0, 1)$ nierówność między logarytmami ma kierunek przeciwny niż między argumentami.",
        },
        {
          nazwa: "Podstawa albo argument z punktu",
          slownie: "Punkt $(x_0, y_0)$ leży na wykresie $f(x) = \\log_a x$ wtedy i tylko wtedy, gdy $a^{y_0} = x_0$. Z tej równości wyznacz podstawę albo argument.",
          tex: "\\log_a x_0=y_0\\iff a^{y_0}=x_0",
          litery: "$x_0$ – argument (pierwsza współrzędna), $y_0$ – wartość logarytmu (druga współrzędna).",
          przyklad: "Dla punktu $(16, 4)$: $a^4 = 16$, więc $a = 2$. Dla punktu $(8, -3)$: $a^{-3} = 8$, więc $\\left(\\frac{1}{a}\\right)^3 = 8$, $\\frac{1}{a} = 2$ i $a = \\frac{1}{2}$.",
          uwaga: "Pierwsza współrzędna punktu to argument i musi być dodatnia; druga to wartość logarytmu, a nie wykładnik argumentu.",
        },
      ],
      jak: [
        "Zamień logarytm na potęgę: $\\log_a x = c$ oznacza $a^c = x$.",
        "Zapisz argument jako potęgę podstawy i odczytaj wykładnik.",
        "Do porównywania logarytmów o tej samej podstawie sprawdź, czy podstawa jest większa od $1$, czy mniejsza.",
        "Punkt wykresu $(x_0, y_0)$ daje równość $a^{y_0} = x_0$.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Wykres funkcji $f(x) = \\log_a x$ przechodzi przez punkt $(9, 2)$. Podstawa $a$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$81$", "$\\frac{9}{2}$", "$-3$", "$3$"],
          poprawna: 3,
        },
        {
          nr: "30",
          tresc: "Miejscem zerowym funkcji $f(x) = \\log_4 x$ jest liczba. **Wybierz właściwą odpowiedź.**",
          opcje: ["$0$", "$1$", "$4$", "$\\frac{1}{4}$"],
          poprawna: 1,
        },
        {
          nr: "31",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Funkcja $f(x) = \\log_{\\frac{1}{2}} x$ jest malejąca.", litery: "PF", poprawna: 0 },
            { tekst: "Zbiorem wartości funkcji $g(x) = \\log_3 x$ jest przedział $(0, \\infty)$.", litery: "PF", poprawna: 1 },
            { tekst: "Do wykresu funkcji $h(x) = \\log_2 x$ należy punkt $\\left(\\frac{1}{8}, -3\\right)$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "32",
          tresc: "Która z nierówności jest prawdziwa? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "$\\log_{\\frac{1}{3}} 4 < \\log_{\\frac{1}{3}} 2$",
            "$\\log_{\\frac{1}{3}} 4 > \\log_{\\frac{1}{3}} 2$",
            "$\\log_{3} 4 < \\log_{3} 2$",
            "$\\log_{2} \\frac{1}{4} > \\log_{2} \\frac{1}{2}$",
          ],
          poprawna: 0,
        },
        {
          nr: "33",
          tresc: "Dana jest funkcja $f(x) = \\log_2 x$. Wartość wyrażenia $f\\left(\\frac{1}{8}\\right) + f(4)$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$-5$", "$1$", "$-1$", "$5$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 3,
          tresc: "Wykres funkcji $f(x) = \\log_a x$ przechodzi przez punkt $P = \\left(\\frac{1}{9}, 2\\right)$. Wyznacz $a$, oblicz $f(27)$ i rozstrzygnij, czy funkcja jest rosnąca, czy malejąca. **Zapisz obliczenia.**",
          rozwiazanie: "Punkt należy do wykresu: $\\log_a \\frac{1}{9} = 2$, czyli $a^2 = \\frac{1}{9}$.\n\nPodstawa jest dodatnia, więc $a = \\frac{1}{3}$.\n\n$f(27) = c$ oznacza $\\left(\\frac{1}{3}\\right)^c = 27$. Ponieważ $27 = 3^3 = \\left(\\frac{1}{3}\\right)^{-3}$, mamy $c = -3$.\n\nPodstawa $\\frac{1}{3}$ należy do przedziału $(0, 1)$, więc funkcja jest malejąca.\n\nOdpowiedź: $a = \\frac{1}{3}$, $f(27) = -3$, funkcja jest malejąca.",
        },
        {
          nr: "35",
          punkty: 2,
          tresc: "Uporządkuj rosnąco liczby: $\\log_2 16$, $\\log_2 \\frac{1}{2}$, $\\log_{\\frac{1}{2}} 8$, $\\log_5 1$. **Zapisz obliczenia.**",
          rozwiazanie: "$\\log_2 16 = 4$, bo $2^4 = 16$.\n\n$\\log_2 \\frac{1}{2} = -1$, bo $2^{-1} = \\frac{1}{2}$.\n\n$\\log_{\\frac{1}{2}} 8 = -3$, bo $\\left(\\frac{1}{2}\\right)^{-3} = 8$.\n\n$\\log_5 1 = 0$, bo $5^0 = 1$.\n\nUstawiamy liczby $4$, $-1$, $-3$, $0$ rosnąco: $-3 < -1 < 0 < 4$.\n\nOdpowiedź: $\\log_{\\frac{1}{2}} 8 < \\log_2 \\frac{1}{2} < \\log_5 1 < \\log_2 16$.",
        },
      ],
      generatory: [
        {
          id: "logarytmiczna-wartosc",
          nazwa: "Wartość logarytmu",
          opis: "Oblicz logarytm albo wartość funkcji logarytmicznej, zapisując argument jako potęgę podstawy.",
          generuj(r) {
            for (;;) {
              const b = r.pick(PODSTAWY);
              const k = r.pick([-3, -2, 0, 2, 3, 4]);
              const x = b.pow(k);
              if (x.n > 10000 || x.d > 10000) continue;
              const funkcja = r.chance();
              const log = `\\log_{${podst(b)}}`;
              return {
                tresc: funkcja
                  ? `Funkcja logarytmiczna jest określona wzorem $f(x) = ${log} x$. Oblicz $f(${x.tex()})$.`
                  : `Oblicz $${log} ${x.d === 1 ? x.n : `\\frac{${x.n}}{${x.d}}`}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: funkcja ? `$f(${x.tex()}) =$` : "Wartość logarytmu" }],
                odpowiedz: { w: q(k) },
                wynik: `$${k}$`,
                rozwiazanie: [
                  `Szukamy liczby $c$, dla której $${pot(b, "c")} = ${x.tex()}$.`,
                  `Zapisujemy argument jako potęgę podstawy: $${x.tex()} = ${pot(b, k)}$.`,
                  `Zatem $${log} ${x.tex()} = ${k}$.`,
                ],
              };
            }
          },
        },
        {
          id: "logarytmiczna-punkt",
          nazwa: "Punkt wykresu",
          opis: "Znajdź podstawę funkcji logarytmicznej z punktu wykresu albo argument, dla którego funkcja przyjmuje daną wartość.",
          generuj(r) {
            for (;;) {
              const b = r.pick(PODSTAWY);
              const e = r.pick([-3, -2, 2, 3, 4]);
              const x = b.pow(e);
              if (r.chance(0.6)) {
                if (x.n > 10000 || x.d > 10000) continue;
                return {
                  tresc: `Wykres funkcji $f(x) = \\log_a x$ przechodzi przez punkt $P = \\left(${x.tex()}, ${e}\\right)$. Oblicz $a$ i rozstrzygnij, czy funkcja jest rosnąca, czy malejąca.`,
                  pola: [
                    { id: "a", typ: "liczba", etykieta: "$a =$" },
                    { id: "m", typ: "wybor", etykieta: "Funkcja $f$ jest", opcje: ["rosnąca", "malejąca"] },
                  ],
                  odpowiedz: { a: b, m: b.cmp(1) > 0 ? 0 : 1 },
                  wynik: `$a = ${b.tex()}$, funkcja ${b.cmp(1) > 0 ? "rosnąca" : "malejąca"}`,
                  rozwiazanie: [
                    `Punkt należy do wykresu, więc $\\log_a ${x.tex()} = ${e}$, czyli $a^{${e}} = ${x.tex()}$.`,
                    ...krokiPodstawa(b, e, x),
                    krokMonot(b),
                  ],
                };
              }
              if (!ladna(x)) continue;
              return {
                tresc: `Funkcja $f$ jest określona wzorem $f(x) = \\log_{${podst(b)}} x$. Dla jakiego argumentu $x$ wartość funkcji jest równa $${e}$?`,
                pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }],
                odpowiedz: { x },
                wynik: `$x = ${x.tex()}$`,
                rozwiazanie: [
                  `Z równości $\\log_{${podst(b)}} x = ${e}$ dostajemy $x = ${pot(b, e)}$.`,
                  `$x = ${lancuch(pot(b, e), pot(b.pow(e < 0 ? -1 : 1), Math.abs(e)), x.tex())}$.`,
                ],
              };
            }
          },
        },
      ],
    },
  ],
};
