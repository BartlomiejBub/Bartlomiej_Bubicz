// Klasa 1 (liceum i technikum) · rozdział 5 „Układy równań liniowych z dwiema niewiadomymi” – Matematyka 1, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

const nwd = (a, b) => (b ? nwd(b, a % b) : Math.abs(a));

/** Liczba w nawiasie, gdy jest ujemna: nw(-3) = "(-3)". */
const nw = (n) => (n < 0 ? `(${n})` : String(n));

/** Składnik z własnym znakiem do doklejenia po innym: czlon(-3, "y") = "- 3y", czlon(1, "y") = "+ y", czlon(-1, "") = "- 1". */
const czlon = (c, lit) => `${c < 0 ? "-" : "+"} ${lit && Math.abs(c) === 1 ? "" : Math.abs(c)}${lit}`;

/** Iloczyn na początku wyrażenia: term1(3, -2) = "3\cdot (-2)", term1(1, 5) = "5", term1(-1, 5) = "-5". */
const term1 = (c, v) => (c === 1 ? String(v) : c === -1 ? `-${nw(v)}` : `${c}\\cdot ${nw(v)}`);

/** Iloczyn po znaku (c > 0): termPo(2, -3) = "2\cdot (-3)", termPo(1, -3) = "(-3)". */
const termPo = (c, v) => (c === 1 ? nw(v) : `${c}\\cdot ${nw(v)}`);

/** Wyrażenie liniowe ze składników [współczynnik, litera]; litera "" oznacza wyraz wolny. Zera pomijamy, 1 przy literze też. */
function wyr(skladniki) {
  let s = "";
  for (const [c0, lit] of skladniki) {
    const c = Q.z(c0);
    if (c.zero) continue;
    const abs = c.ujemna ? c.neg() : c;
    const liczba = lit && abs.eq(1) ? "" : abs.tex();
    s += s === "" ? `${c.ujemna ? "-" : ""}${liczba}${lit}` : ` ${c.ujemna ? "-" : "+"} ${liczba}${lit}`;
  }
  return s || "0";
}

/** Równanie a x + b y = c w LaTeX. */
const rown = (e) => `${wyr([[e.a, "x"], [e.b, "y"]])} = ${e.c}`;

/** Układ dwóch równań (nawias klamrowy) w LaTeX. */
const uklad = (r1, r2) => `\\begin{cases} ${r1} \\\\ ${r2} \\end{cases}`;

/** Lewa strona równania a x + b y z wstawioną liczbą v w miejsce niewiadomej u. */
const zPod = (a, b, u, v) => (u === "x"
  ? `${term1(a, v)} ${czlon(b, "y")}`
  : `${wyr([[a, "x"]])} ${b < 0 ? "-" : "+"} ${termPo(Math.abs(b), v)}`);

/** Lewa strona równania a x + b y z wstawionym wyrażeniem w (tekst) w miejsce niewiadomej u. */
const zWyr = (a, b, u, w) => (u === "y"
  ? `${wyr([[a, "x"]])} ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}(${w})`
  : `${a === 1 ? "" : a === -1 ? "-" : a}(${w}) ${czlon(b, "y")}`);

/** Mnożniki m1, m2 takie, że m1·w1 + m2·w2 = 0, dla niezerowych całkowitych w1, w2.
 *  Gdy jeden współczynnik dzieli drugi, mnożymy tylko jedno równanie (to z mniejszym współczynnikiem). */
function mnozniki(w1, w2) {
  if (Math.abs(w1) >= Math.abs(w2) && w1 % w2 === 0) return [1, -w1 / w2];
  if (w2 % w1 === 0) return [-w2 / w1, 1];
  const g = nwd(w1, w2);
  return [Math.abs(w2) / g, (-Math.sign(w2) * w1) / g];
}

/** Rozwiązanie układu metodą przeciwnych współczynników (kroki słowne). e1, e2 = { a, b, c }, el – niewiadoma, którą eliminujemy. */
function krokiPrzeciwne(e1, e2, el, x0, y0) {
  const os = el === "x" ? "y" : "x";
  const wsp = (e, lit) => (lit === "x" ? e.a : e.b);
  const [m1, m2] = mnozniki(wsp(e1, el), wsp(e2, el));
  const mn = (e, m) => ({ a: m * e.a, b: m * e.b, c: m * e.c });
  const s1 = mn(e1, m1), s2 = mn(e2, m2);
  const sumaWsp = wsp(s1, os) + wsp(s2, os);
  const sumaPrawa = s1.c + s2.c;
  const osWart = os === "x" ? x0 : y0, elWart = el === "x" ? x0 : y0;
  const kroki = [];
  if (m1 === 1 && m2 === 1) {
    kroki.push(`Przy $${el}$ są liczby przeciwne, więc dodajemy równania stronami.`);
  } else {
    const ktore = [m1 !== 1 && `pierwsze równanie przez $${m1}$`, m2 !== 1 && `drugie równanie przez $${m2}$`].filter(Boolean).join(" i ");
    kroki.push(`Aby przy $${el}$ były liczby przeciwne, mnożymy obustronnie ${ktore}.`);
    kroki.push(`Otrzymujemy: $${rown(s1)}$ oraz $${rown(s2)}$. Dodajemy równania stronami.`);
  }
  kroki.push(`Po dodaniu: $${wyr([[sumaWsp, os]])} = ${sumaPrawa}$, więc $${os} = ${osWart}$.`);
  const prawa = e1.c - wsp(e1, os) * osWart;
  kroki.push(wsp(e1, el) === 1
    ? `Podstawiamy do pierwszego równania: $${zPod(e1.a, e1.b, os, osWart)} = ${e1.c}$, stąd $${el} = ${elWart}$.`
    : `Podstawiamy do pierwszego równania: $${zPod(e1.a, e1.b, os, osWart)} = ${e1.c}$, stąd $${wyr([[wsp(e1, el), el]])} = ${prawa}$, czyli $${el} = ${elWart}$.`);
  return kroki;
}

/** Zadanie tekstowe: dwie niewiadome x, y, układ e1, e2, rozwiązywany metodą przeciwnych współczynników. */
function zadanieUklad({ tresc, def, e1, e2, el, x0, y0, etykiety }) {
  return {
    tresc,
    pola: [{ id: "x", typ: "liczba", etykieta: etykiety[0] }, { id: "y", typ: "liczba", etykieta: etykiety[1] }],
    odpowiedz: { x: q(x0), y: q(y0) },
    wynik: `$x = ${x0}$, $y = ${y0}$`,
    rozwiazanie: [`${def} Z treści: $${rown(e1)}$ oraz $${rown(e2)}$.`, ...krokiPrzeciwne(e1, e2, el, x0, y0)],
  };
}

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 5.1
    {
      id: "rownanie",
      nazwa: "Równania pierwszego stopnia z dwiema niewiadomymi",
      sciaga: [
        {
          nazwa: "Równanie z dwiema niewiadomymi",
          slownie: "Równanie $ax+by=c$ ma dwie niewiadome. Jego rozwiązaniem jest para liczb $(x, y)$, która po podstawieniu daje równość prawdziwą.",
          tex: "ax+by=c",
          litery: "$x$, $y$ – niewiadome, $a$, $b$, $c$ – liczby, przy czym $a$ i $b$ nie są jednocześnie równe $0$.",
          przyklad: "Para $(2, 3)$ spełnia równanie $2x+y=7$, bo $2\\cdot 2+3=7$. Para $(3, 2)$ nie spełnia go: $2\\cdot 3+2=8$.",
          uwaga: "Kolejność w parze ma znaczenie: pierwsza liczba to $x$, druga to $y$.",
        },
        {
          nazwa: "Wyznaczanie niewiadomej",
          slownie: "Żeby znaleźć rozwiązania, wyznacz jedną niewiadomą za pomocą drugiej i podstawiaj kolejne wartości. Takie równanie ma nieskończenie wiele rozwiązań.",
          tex: "ax+by=c\\qquad y=\\frac{c-ax}{b}",
          litery: "Wzór na $y$ jest prawdziwy dla $b\\neq 0$.",
          przyklad: "Z $3x+y=8$ mamy $y=8-3x$. Dla $x=1$ jest $y=5$, dla $x=2$ jest $y=2$, więc $(1, 5)$ i $(2, 2)$ są rozwiązaniami.",
          uwaga: "Przenosząc składnik na drugą stronę, zmień jego znak. Dla $-y=4$ mamy $y=-4$.",
        },
        {
          nazwa: "Wykres równania",
          slownie: "Wszystkie rozwiązania $ax+by=c$, narysowane jako punkty $(x, y)$, leżą na jednej prostej. Do jej narysowania wystarczą dwa punkty.",
          tex: "y=-\\frac{a}{b}x+\\frac{c}{b}",
          litery: "Dla $b\\neq 0$ jest to funkcja liniowa o współczynniku kierunkowym $-\\frac{a}{b}$.",
          przyklad: "Dla $x+2y=4$ mamy $y=-\\frac{1}{2}x+2$. Prosta przechodzi przez punkty $(0, 2)$ i $(4, 0)$.",
          uwaga: "Równanie $x=3$ też jest równaniem prostej, ale pionowej – nie jest wykresem funkcji.",
        },
      ],
      jak: [
        "Aby sprawdzić, czy para $(x_0, y_0)$ spełnia równanie, wstaw $x_0$ za $x$ i $y_0$ za $y$ i porównaj obie strony.",
        "Aby znaleźć brakującą liczbę w parze, podstaw znaną liczbę i rozwiąż równanie z jedną niewiadomą.",
        "Aby narysować prostą, wyznacz $y$ i oblicz dwa punkty, np. dla $x=0$ i $y=0$.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Para liczb $(2, -1)$ jest rozwiązaniem równania: **Wybierz właściwą odpowiedź.**",
          opcje: ["$3x - 2y = 4$", "$x + y = 3$", "$3x + 2y = 4$", "$2x - y = 3$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Po wyznaczeniu $y$ z równania $4x - 2y = 10$ otrzymujemy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$y = 2x - 5$", "$y = 2x + 5$", "$y = -2x + 5$", "$y = -2x - 5$"],
          poprawna: 0,
        },
        {
          nr: "3",
          tresc: "Dane jest równanie $x + 2y = 6$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Para $(4, 1)$ jest rozwiązaniem tego równania.", litery: "PF", poprawna: 0 },
            { tekst: "Para $(2, 3)$ jest rozwiązaniem tego równania.", litery: "PF", poprawna: 1 },
            { tekst: "Wykres tego równania przechodzi przez punkt $(0, 3)$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "4",
          tresc: "Para $(3, a)$ jest rozwiązaniem równania $2x + 3y = 3$. Liczba $a$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$1$", "$-1$", "$3$", "$-3$"],
          poprawna: 1,
        },
        {
          nr: "5",
          tresc: "Prosta o równaniu $2x - y = 4$ przecina oś $Oy$ w punkcie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(2, 0)$", "$(0, 4)$", "$(-4, 0)$", "$(0, -4)$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Wyznacz $y$ z równania $5x - 2y = 12$ i oblicz $y$ dla $x = 0$, $x = 2$ oraz $x = -2$. **Zapisz obliczenia.**",
          rozwiazanie: "Z równania $5x - 2y = 12$ mamy $-2y = 12 - 5x$, więc $y = \\frac{5x - 12}{2}$.\n\nDla $x = 0$: $y = \\frac{-12}{2} = -6$.\n\nDla $x = 2$: $y = \\frac{10 - 12}{2} = -1$.\n\nDla $x = -2$: $y = \\frac{-10 - 12}{2} = -11$.\n\nOdpowiedź: $(0, -6)$, $(2, -1)$, $(-2, -11)$.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Prosta ma równanie $3x + 4y = 12$. Oblicz współrzędne punktów, w których przecina ona osie układu współrzędnych, i podaj jej współczynnik kierunkowy. **Zapisz obliczenia.**",
          rozwiazanie: "Na osi $Ox$ mamy $y = 0$: $3x = 12$, więc $x = 4$ i punkt $(4, 0)$.\n\nNa osi $Oy$ mamy $x = 0$: $4y = 12$, więc $y = 3$ i punkt $(0, 3)$.\n\nWyznaczamy $y$: $4y = 12 - 3x$, czyli $y = -\\frac{3}{4}x + 3$. Współczynnik kierunkowy to $-\\frac{3}{4}$.\n\nOdpowiedź: punkty $(4, 0)$ i $(0, 3)$, współczynnik kierunkowy $-\\frac{3}{4}$.",
        },
      ],
      generatory: [
        {
          id: "rownanie-brakujaca",
          nazwa: "Brakująca liczba w parze",
          opis: "Para liczb ma jedną współrzędną nieznaną – oblicz ją tak, aby para spełniała równanie.",
          generuj(r) {
            const a = r.intBez(-6, 6, 0), b = r.intBez(-6, 6, 0);
            const x0 = r.int(-5, 5), y0 = r.int(-5, 5);
            const c = a * x0 + b * y0;
            const lit = r.pick(["k", "m", "t"]);
            const brakujeY = r.chance();
            const para = brakujeY ? `(${x0}, ${lit})` : `(${lit}, ${y0})`;
            const podst = brakujeY
              ? `${term1(a, x0)} ${czlon(b, lit)} = ${c}`
              : `${wyr([[a, lit]])} ${b < 0 ? "-" : "+"} ${termPo(Math.abs(b), y0)} = ${c}`;
            const wsp = brakujeY ? b : a;
            const prawa = brakujeY ? c - a * x0 : c - b * y0;
            const wart = brakujeY ? y0 : x0;
            return {
              tresc: `Para liczb $${para}$ jest rozwiązaniem równania $${wyr([[a, "x"], [b, "y"]])} = ${c}$. Oblicz $${lit}$.`,
              pola: [{ id: "k", typ: "liczba", etykieta: `$${lit} =$` }],
              odpowiedz: { k: q(wart) },
              wynik: `$${lit} = ${wart}$`,
              rozwiazanie: [
                `Podstawiamy współrzędne pary do równania: $${podst}$.`,
                `Stąd $${wyr([[wsp, lit]])} = ${prawa}$, więc $${lit} = ${wart}$.`,
              ],
            };
          },
        },
        {
          id: "rownanie-osie",
          nazwa: "Przecięcia z osiami",
          opis: "Oblicz, w których punktach prosta o danym równaniu przecina osie układu współrzędnych.",
          generuj(r) {
            const a = r.intBez(-6, 6, 0), b = r.intBez(-6, 6, 0), c = r.intBez(-24, 24, 0);
            const p = q(c, a), s = q(c, b);
            return {
              tresc: `Prosta o równaniu $${wyr([[a, "x"], [b, "y"]])} = ${c}$ przecina oś $Ox$ w punkcie $(p, 0)$, a oś $Oy$ w punkcie $(0, s)$. Oblicz $p$ i $s$.`,
              pola: [{ id: "p", typ: "liczba", etykieta: "$p =$" }, { id: "s", typ: "liczba", etykieta: "$s =$" }],
              odpowiedz: { p, s },
              wynik: `$p = ${p.tex()}$, $s = ${s.tex()}$`,
              rozwiazanie: [
                `Na osi $Ox$ mamy $y = 0$. Wtedy $${wyr([[a, "x"]])} = ${c}$, więc $x = ${p.tex()}$.`,
                `Na osi $Oy$ mamy $x = 0$. Wtedy $${wyr([[b, "y"]])} = ${c}$, więc $y = ${s.tex()}$.`,
                `Punkty przecięcia z osiami: $(${p.tex()}, 0)$ i $(0, ${s.tex()})$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5.2
    {
      id: "graficznie",
      nazwa: "Układy równań. Graficzne rozwiązywanie",
      sciaga: [
        {
          nazwa: "Układ równań i jego rozwiązanie",
          slownie: "Układ to dwa równania z tymi samymi niewiadomymi, które mają być spełnione jednocześnie. Rozwiązaniem jest para $(x, y)$ spełniająca oba równania.",
          tex: "\\begin{cases}x+y=5\\\\x-y=1\\end{cases}",
          przyklad: "Para $(3, 2)$ jest rozwiązaniem układu: $3+2=5$ oraz $3-2=1$.",
          uwaga: "Para spełniająca tylko jedno równanie nie jest rozwiązaniem układu.",
        },
        {
          nazwa: "Rozwiązanie graficzne",
          slownie: "Narysuj obie proste. Współrzędne punktu przecięcia to rozwiązanie układu. Można go też znaleźć, przyrównując wartości $y$ z obu równań, a wynik zawsze sprawdź.",
          tex: "m_1x+k_1=m_2x+k_2",
          litery: "$y=m_1x+k_1$ i $y=m_2x+k_2$ – równania obu prostych po wyznaczeniu $y$.",
          przyklad: "Proste $y=x+1$ i $y=-x+3$ przecinają się, gdy $x+1=-x+3$, czyli $x=1$. Wtedy $y=2$, więc rozwiązanie to $(1, 2)$.",
          uwaga: "Odczyt z rysunku bywa niedokładny, dlatego wynik sprawdź w obu równaniach.",
        },
        {
          nazwa: "Trzy rodzaje układów",
          slownie: "Proste przecinają się w jednym punkcie – układ ma jedno rozwiązanie (oznaczony). Są równoległe – brak rozwiązań (sprzeczny). Pokrywają się – nieskończenie wiele rozwiązań (nieoznaczony).",
          przyklad: "Układ $x+y=2$, $x+y=5$ jest sprzeczny (proste równoległe). Układ $x+y=2$, $2x+2y=4$ jest nieoznaczony (ta sama prosta).",
        },
        {
          nazwa: "Rodzaj układu bez rysowania",
          slownie: "Wyznacz $y$ z obu równań i porównaj współczynniki kierunkowe $m$ oraz wyrazy wolne $k$. Różne $m$ – jedno rozwiązanie. Równe $m$ i różne $k$ – brak rozwiązań. Równe $m$ i równe $k$ – nieskończenie wiele.",
          przyklad: "Z $2x+y=3$ mamy $y=-2x+3$, a z $4x+2y=10$ mamy $y=-2x+5$. Równe $m$ i różne $k$, więc układ jest sprzeczny.",
          uwaga: "Równania mogą wyglądać różnie, a opisywać tę samą prostą: $x-y=1$ i $3x-3y=3$.",
        },
      ],
      jak: [
        "Wyznacz $y$ z każdego równania: $y=mx+k$.",
        "Porównaj współczynniki kierunkowe $m$ i wyrazy wolne $k$, aby ustalić, ile jest rozwiązań.",
        "Gdy proste się przecinają, znajdź punkt przecięcia: narysuj proste albo rozwiąż $m_1x+k_1=m_2x+k_2$.",
        "Sprawdź znalezioną parę w obu równaniach układu.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Rozwiązaniem układu równań $\\begin{cases} x + y = 4 \\\\ 2x - y = 2 \\end{cases}$ jest para: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(3, 1)$", "$(2, 2)$", "$(1, 3)$", "$(0, 4)$"],
          poprawna: 1,
        },
        {
          nr: "9",
          tresc: "Wykresami równań pewnego układu są proste $y = 2x - 1$ oraz $y = 2x + 3$. Który opis tego układu jest prawdziwy? **Wybierz właściwą odpowiedź.**",
          opcje: ["ma dokładnie jedno rozwiązanie", "ma dokładnie dwa rozwiązania", "ma nieskończenie wiele rozwiązań", "nie ma rozwiązań"],
          poprawna: 3,
        },
        {
          nr: "10",
          tresc: "Który opis układu równań $\\begin{cases} x - 2y = 4 \\\\ 2x - 4y = 8 \\end{cases}$ jest prawdziwy? **Wybierz właściwą odpowiedź.**",
          opcje: ["nie ma rozwiązań", "ma dokładnie jedno rozwiązanie", "ma nieskończenie wiele rozwiązań", "ma dokładnie dwa rozwiązania"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "Dany jest układ równań $\\begin{cases} y = x + 1 \\\\ y = -x + 3 \\end{cases}$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Rozwiązaniem układu jest para $(1, 2)$.", litery: "PF", poprawna: 0 },
            { tekst: "Obie proste mają ten sam współczynnik kierunkowy.", litery: "PF", poprawna: 1 },
            { tekst: "Para $(2, 3)$ spełnia pierwsze równanie, ale nie spełnia drugiego.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "12",
          tresc: "Układ równań $\\begin{cases} y = ax + 1 \\\\ y = 3x - 2 \\end{cases}$ nie ma rozwiązań dla $a$ równego: **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$-3$", "$\\frac{1}{3}$", "$-2$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Bez rysowania ustal, ile rozwiązań ma każdy z układów: (a) $\\begin{cases} 2x + y = 5 \\\\ 4x + 2y = 7 \\end{cases}$, (b) $\\begin{cases} x - y = 1 \\\\ 3x - 3y = 3 \\end{cases}$. **Zapisz obliczenia.**",
          rozwiazanie: "(a) Z pierwszego równania $y = -2x + 5$. Z drugiego $2y = -4x + 7$, czyli $y = -2x + \\frac{7}{2}$.\n\nWspółczynniki kierunkowe są równe ($-2$), a wyrazy wolne różne ($5 \\neq \\frac{7}{2}$). Proste są równoległe i różne, więc układ nie ma rozwiązań.\n\n(b) Z pierwszego równania $y = x - 1$. Z drugiego $-3y = -3x + 3$, czyli $y = x - 1$.\n\nTo ta sama prosta, więc układ ma nieskończenie wiele rozwiązań.\n\nOdpowiedź: (a) brak rozwiązań, (b) nieskończenie wiele rozwiązań.",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "Rozwiąż graficznie układ równań $\\begin{cases} y = 2x - 1 \\\\ y = -x + 5 \\end{cases}$. Najpierw sporządź tabelkę wartości obu funkcji dla $x = 0, 1, 2, 3$. **Zapisz obliczenia.**",
          rozwiazanie: "Dla funkcji $y = 2x - 1$: $x = 0, 1, 2, 3$ daje $y = -1, 1, 3, 5$.\n\nDla funkcji $y = -x + 5$: $x = 0, 1, 2, 3$ daje $y = 5, 4, 3, 2$.\n\nDla $x = 2$ obie funkcje mają wartość $3$, więc proste przecinają się w punkcie $(2, 3)$.\n\nSprawdzenie: $2\\cdot 2 - 1 = 3$ oraz $-2 + 5 = 3$. Współczynniki kierunkowe są różne ($2 \\neq -1$), więc to jedyny punkt wspólny.\n\nOdpowiedź: $x = 2$, $y = 3$.",
        },
      ],
      generatory: [
        {
          id: "graficznie-rodzaj",
          nazwa: "Rodzaj układu",
          opis: "Bez rysowania ustal, czy układ ma jedno rozwiązanie, nie ma rozwiązań, czy ma ich nieskończenie wiele.",
          generuj(r) {
            const typ = r.int(0, 2);
            for (;;) {
              const a1 = r.intBez(-3, 3, 0), b1 = r.intBez(-3, 3, 0), c1 = r.int(-8, 8);
              let a2, b2, c2;
              if (typ === 0) {
                a2 = r.intBez(-4, 4, 0); b2 = r.intBez(-4, 4, 0); c2 = r.int(-8, 8);
                if (a1 * b2 === a2 * b1) continue;
              } else {
                const m = r.pick([-3, -2, 2, 3]);
                a2 = m * a1; b2 = m * b1;
                c2 = typ === 2 ? m * c1 : m * c1 + r.intBez(-6, 6, 0);
              }
              const e1 = { a: a1, b: b1, c: c1 }, e2 = { a: a2, b: b2, c: c2 };
              const [p1, p2] = r.chance() ? [e1, e2] : [e2, e1];
              const m1 = q(-p1.a, p1.b), k1 = q(p1.c, p1.b), m2 = q(-p2.a, p2.b), k2 = q(p2.c, p2.b);
              const opisy = [
                `Współczynniki kierunkowe są różne ($${m1.tex()} \\neq ${m2.tex()}$), więc proste przecinają się w jednym punkcie.`,
                `Współczynniki kierunkowe są równe ($${m1.tex()}$), a wyrazy wolne różne ($${k1.tex()} \\neq ${k2.tex()}$), więc proste są równoległe i różne.`,
                `Współczynniki kierunkowe są równe ($${m1.tex()}$) i wyrazy wolne też ($${k1.tex()}$), więc to ta sama prosta.`,
              ];
              const nazwy = ["jedno rozwiązanie", "brak rozwiązań", "nieskończenie wiele rozwiązań"];
              return {
                tresc: `Ile rozwiązań ma układ równań $${uklad(rown(p1), rown(p2))}$?`,
                pola: [{ id: "t", typ: "wybor", etykieta: "Liczba rozwiązań", opcje: nazwy }],
                odpowiedz: { t: typ },
                wynik: nazwy[typ],
                rozwiazanie: [
                  `Wyznaczamy $y$ z obu równań: $y = ${wyr([[m1, "x"], [k1, ""]])}$ oraz $y = ${wyr([[m2, "x"], [k2, ""]])}$.`,
                  opisy[typ],
                ],
              };
            }
          },
        },
        {
          id: "graficznie-przeciecie",
          nazwa: "Punkt przecięcia prostych",
          opis: "Znajdź rozwiązanie układu jako punkt przecięcia dwóch prostych o równaniach y = mx + k.",
          generuj(r) {
            const x0 = r.intBez(-5, 5, 0), y0 = r.int(-6, 6);
            const m1 = r.intBez(-4, 4, 0), m2 = r.intBez(-4, 4, 0, m1);
            const k1 = y0 - m1 * x0, k2 = y0 - m2 * x0;
            const w1 = wyr([[m1, "x"], [k1, ""]]), w2 = wyr([[m2, "x"], [k2, ""]]);
            return {
              tresc: `Wykresami równań układu $${uklad(`y = ${w1}`, `y = ${w2}`)}$ są dwie proste. Oblicz współrzędne punktu, w którym się przecinają.`,
              pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }, { id: "y", typ: "liczba", etykieta: "$y =$" }],
              odpowiedz: { x: q(x0), y: q(y0) },
              wynik: `$x = ${x0}$, $y = ${y0}$`,
              rozwiazanie: [
                `Rozwiązaniem układu jest punkt przecięcia prostych. W nim wartości $y$ są równe: $${w1} = ${w2}$.`,
                `Stąd $${wyr([[m1 - m2, "x"]])} = ${k2 - k1}$, więc $x = ${x0}$.`,
                `Obliczamy $y$ z pierwszego równania: $y = ${w1}$ dla $x = ${x0}$, czyli $y = ${y0}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5.3
    {
      id: "podstawianie",
      nazwa: "Metoda podstawiania",
      sciaga: [
        {
          nazwa: "Na czym polega metoda",
          slownie: "Z jednego równania wyznacz jedną niewiadomą, wstaw to wyrażenie do drugiego równania, rozwiąż równanie z jedną niewiadomą, a potem oblicz drugą niewiadomą.",
          przyklad: "Dla $y=2x-1$ i $3x+y=9$: $3x+(2x-1)=9$, więc $5x=10$ i $x=2$. Wtedy $y=2\\cdot 2-1=3$.",
          uwaga: "Wyrażenie wstawiamy do drugiego równania – nie do tego, z którego je wyznaczono. Sumę lub różnicę wstawiaj w nawiasie.",
        },
        {
          nazwa: "Którą niewiadomą wyznaczyć",
          slownie: "Najwygodniej wyznaczyć tę niewiadomą, przy której stoi współczynnik $1$ lub $-1$ – unikniesz ułamków.",
          przyklad: "Z $x+3y=7$ mamy $x=7-3y$. Z $2x-y=5$ mamy $y=2x-5$.",
          uwaga: "Gdy dzielisz przez współczynnik, podziel każdy składnik, np. $2x+4y=6$ daje $x+2y=3$.",
        },
        {
          nazwa: "Nawiasy i znaki",
          slownie: "Wstawiając wyrażenie za niewiadomą, zapisz je w nawiasie i wymnóż przez współczynnik każdy jego składnik.",
          przyklad: "Dla $x=7-3y$ i $2x+y=4$: $2(7-3y)+y=4$, więc $14-6y+y=4$, $-5y=-10$, $y=2$ i $x=1$.",
          uwaga: "Pamiętaj: $2(7-3y)=14-6y$, a nie $14-3y$.",
        },
        {
          nazwa: "Układy sprzeczne i nieoznaczone",
          slownie: "Jeśli po podstawieniu niewiadome się skracają i wychodzi fałsz (np. $1=4$), układ jest sprzeczny. Jeśli wychodzi prawda (np. $6=6$), ma nieskończenie wiele rozwiązań.",
          przyklad: "Dla $y=2x+1$ i $y=2x+4$ dostajemy $2x+1=2x+4$, czyli $1=4$ – brak rozwiązań.",
          uwaga: "Wynik $0=0$ nie znaczy, że $x=0$, tylko że każda para spełniająca jedno równanie spełnia też drugie.",
        },
      ],
      jak: [
        "Wybierz równanie i niewiadomą, którą najłatwiej wyznaczyć (współczynnik $1$ lub $-1$).",
        "Wyznacz tę niewiadomą, np. $y=2x-5$.",
        "Wstaw wyrażenie w nawiasie do drugiego równania i rozwiąż równanie z jedną niewiadomą.",
        "Oblicz drugą niewiadomą z wyznaczonego wzoru.",
        "Sprawdź parę w obu równaniach i zapisz odpowiedź.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Układ $\\begin{cases} y = 3x - 2 \\\\ 2x + y = 8 \\end{cases}$ po podstawieniu pierwszego równania do drugiego prowadzi do równania: **Wybierz właściwą odpowiedź.**",
          opcje: ["$5x - 2 = 8$", "$5x + 2 = 8$", "$2x + 3x = 8$", "$-x - 2 = 8$"],
          poprawna: 0,
        },
        {
          nr: "16",
          tresc: "Rozwiązaniem układu równań $\\begin{cases} x = y + 3 \\\\ 2x + y = 9 \\end{cases}$ jest para $(x, y)$ równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(1, 4)$", "$(5, 2)$", "$(4, 1)$", "$(3, 0)$"],
          poprawna: 2,
        },
        {
          nr: "17",
          tresc: "Dla układu $\\begin{cases} 2x - y = 5 \\\\ x + 3y = 6 \\end{cases}$ niewiadoma $x$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$1$", "$3$", "$\\frac{11}{7}$", "$21$"],
          poprawna: 1,
        },
        {
          nr: "18",
          tresc: "Dany jest układ równań $\\begin{cases} x + y = 6 \\\\ 3x - y = 2 \\end{cases}$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Rozwiązaniem układu jest para $(2, 4)$.", litery: "PF", poprawna: 0 },
            { tekst: "Para $(1, 5)$ spełnia oba równania układu.", litery: "PF", poprawna: 1 },
            { tekst: "Po wstawieniu $y = 6 - x$ do drugiego równania otrzymujemy $3x - 6 - x = 2$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "19",
          tresc: "Który z układów równań ma nieskończenie wiele rozwiązań? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "$y = 2x - 1$ i $2x - y = 3$",
            "$y = 2x - 1$ i $2x + y = 1$",
            "$y = 2x - 1$ i $y = -2x - 1$",
            "$y = 2x - 1$ i $2x - y = 1$",
          ],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 3,
          tresc: "Rozwiąż metodą podstawiania układ równań $\\begin{cases} x + 2y = -4 \\\\ 3x - y = 9 \\end{cases}$. **Zapisz obliczenia.**",
          rozwiazanie: "Z pierwszego równania: $x = -4 - 2y$.\n\nWstawiamy do drugiego równania, w nawiasie: $3(-4 - 2y) - y = 9$.\n\nWymnażamy: $-12 - 6y - y = 9$, czyli $-7y = 21$, więc $y = -3$.\n\nObliczamy $x = -4 - 2\\cdot(-3) = -4 + 6 = 2$.\n\nSprawdzenie: $2 + 2\\cdot(-3) = -4$ oraz $3\\cdot 2 - (-3) = 9$.\n\nOdpowiedź: $x = 2$, $y = -3$.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Rozwiąż metodą podstawiania każdy z układów i napisz, ile ma rozwiązań: (a) $\\begin{cases} x + y = 4 \\\\ 3x + 3y = 12 \\end{cases}$, (b) $\\begin{cases} 2x - y = 3 \\\\ 4x - 2y = 5 \\end{cases}$. **Zapisz obliczenia.**",
          rozwiazanie: "(a) Z pierwszego równania $y = 4 - x$. Wstawiamy do drugiego: $3x + 3(4 - x) = 12$, czyli $3x + 12 - 3x = 12$, więc $12 = 12$.\n\nRówność jest zawsze prawdziwa, więc układ ma nieskończenie wiele rozwiązań (każda para $(x, 4 - x)$).\n\n(b) Z pierwszego równania $y = 2x - 3$. Wstawiamy do drugiego: $4x - 2(2x - 3) = 5$, czyli $4x - 4x + 6 = 5$, więc $6 = 5$.\n\nRówność jest fałszywa, więc układ nie ma rozwiązań.\n\nOdpowiedź: (a) nieskończenie wiele rozwiązań, (b) brak rozwiązań.",
        },
      ],
      generatory: [
        {
          id: "podstawianie-gotowe",
          nazwa: "Gotowa niewiadoma",
          opis: "Jedno równanie ma już wyznaczoną niewiadomą – wstaw ją do drugiego i rozwiąż układ.",
          generuj(r) {
            for (;;) {
              const x0 = r.int(-5, 5), y0 = r.int(-5, 5);
              const u = r.chance() ? "y" : "x", v = u === "y" ? "x" : "y";
              const u0 = u === "x" ? x0 : y0, v0 = u === "x" ? y0 : x0;
              const m = r.intBez(-4, 4, 0), k = u0 - m * v0;
              if (k === 0) continue;
              const a = r.intBez(-5, 5, 0), b = r.intBez(-5, 5, 0);
              const p = u === "x" ? a : b, s = u === "x" ? b : a;   // p – współczynnik przy u, s – przy v w drugim równaniu
              const wsp = s + p * m;
              if (wsp === 0) continue;
              const c = a * x0 + b * y0;
              const w = wyr([[m, v], [k, ""]]);
              return {
                tresc: `Rozwiąż układ równań $${uklad(`${u} = ${w}`, rown({ a, b, c }))}$.`,
                pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }, { id: "y", typ: "liczba", etykieta: "$y =$" }],
                odpowiedz: { x: q(x0), y: q(y0) },
                wynik: `$x = ${x0}$, $y = ${y0}$`,
                rozwiazanie: [
                  `W pierwszym równaniu jest wyznaczone $${u}$. Wstawiamy to wyrażenie do drugiego równania: $${zWyr(a, b, u, w)} = ${c}$.`,
                  `Po wymnożeniu i redukcji: $${wyr([[wsp, v]])} = ${c - p * k}$, więc $${v} = ${v0}$.`,
                  `Obliczamy $${u}$: $${u} = ${term1(m, v0)} ${czlon(k, "")} = ${u0}$.`,
                ],
              };
            }
          },
        },
        {
          id: "podstawianie-wyznacz",
          nazwa: "Wyznacz i podstaw",
          opis: "W pierwszym równaniu jedna niewiadoma ma współczynnik 1 – wyznacz ją, wstaw do drugiego i rozwiąż układ.",
          generuj(r) {
            for (;;) {
              const x0 = r.int(-5, 5), y0 = r.int(-5, 5);
              const u = r.chance() ? "y" : "x", v = u === "y" ? "x" : "y";
              const u0 = u === "x" ? x0 : y0, v0 = u === "x" ? y0 : x0;
              const t = r.intBez(-4, 4, 0);
              const s1 = u0 + t * v0;
              if (s1 === 0) continue;
              const a = r.intBez(-5, 5, 0), b = r.intBez(-5, 5, 0);
              const p = u === "x" ? a : b, s = u === "x" ? b : a;
              const wsp = s - p * t;
              if (wsp === 0) continue;
              const c = a * x0 + b * y0;
              const e1 = { a: u === "x" ? 1 : t, b: u === "y" ? 1 : t, c: s1 };
              const w = wyr([[s1, ""], [-t, v]]);
              return {
                tresc: `Rozwiąż układ równań $${uklad(rown(e1), rown({ a, b, c }))}$.`,
                pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }, { id: "y", typ: "liczba", etykieta: "$y =$" }],
                odpowiedz: { x: q(x0), y: q(y0) },
                wynik: `$x = ${x0}$, $y = ${y0}$`,
                rozwiazanie: [
                  `W pierwszym równaniu przy $${u}$ stoi $1$, więc wyznaczamy $${u}$: $${u} = ${w}$.`,
                  `Wstawiamy do drugiego równania: $${zWyr(a, b, u, w)} = ${c}$. Po wymnożeniu i redukcji: $${wyr([[wsp, v]])} = ${c - p * s1}$, więc $${v} = ${v0}$.`,
                  `Obliczamy $${u}$: $${u} = ${s1} ${t < 0 ? "+" : "-"} ${termPo(Math.abs(t), v0)} = ${u0}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5.4
    {
      id: "przeciwne",
      nazwa: "Metoda przeciwnych współczynników",
      sciaga: [
        {
          nazwa: "Na czym polega metoda",
          slownie: "Gdy przy jednej niewiadomej stoją liczby przeciwne, dodaj równania stronami (lewą stronę do lewej, prawą do prawej) – ta niewiadoma zniknie.",
          przyklad: "Dla $2x+y=7$ i $3x-y=8$: po dodaniu $5x=15$, więc $x=3$. Z pierwszego: $y=7-6=1$.",
          uwaga: "Dodawaj wszystkie składniki obu stron, a nie tylko jeden wybrany.",
        },
        {
          nazwa: "Dopasowanie współczynników",
          slownie: "Gdy współczynniki nie są przeciwne, pomnóż jedno równanie (każdy wyraz, także po prawej stronie) przez taką liczbę, by przy jednej niewiadomej były liczby przeciwne.",
          przyklad: "Dla $3x+2y=12$ i $x+y=5$ mnożymy drugie przez $-2$: $-2x-2y=-10$. Po dodaniu $x=2$, a z drugiego $y=3$.",
          uwaga: "Mnożąc przez liczbę ujemną, zmień znak każdego składnika, także po prawej stronie.",
        },
        {
          nazwa: "Mnożenie obu równań",
          slownie: "Gdy trzeba pomnożyć oba równania, dobierz mnożniki tak, by współczynniki przy wybranej niewiadomej stały się równe co do wartości, ale przeciwne co do znaku (np. przez NWW).",
          przyklad: "Dla $2x+3y=8$ i $3x+2y=7$: pierwsze razy $3$, drugie razy $-2$ daje $6x+9y=24$ i $-6x-4y=-14$. Po dodaniu $5y=10$, więc $y=2$ i $x=1$.",
          uwaga: "Gdy znasz jedną niewiadomą, drugą oblicz z dowolnego równania, a wynik sprawdź w drugim.",
        },
        {
          nazwa: "Układy sprzeczne i nieoznaczone",
          slownie: "Jeśli po dodaniu znikają obie niewiadome i wychodzi fałsz (np. $0=7$), układ jest sprzeczny. Jeśli wychodzi $0=0$, układ ma nieskończenie wiele rozwiązań.",
          przyklad: "Dla $x-y=2$ i $-x+y=5$ po dodaniu $0=7$ – brak rozwiązań. Dla $x-y=2$ i $-x+y=-2$ po dodaniu $0=0$ – nieskończenie wiele.",
        },
      ],
      jak: [
        "Wybierz niewiadomą do wyeliminowania – tę, przy której współczynniki łatwiej uczynić przeciwnymi.",
        "Pomnóż równania (każdy wyraz!) przez liczby, aby przy niej były liczby przeciwne.",
        "Dodaj równania stronami i rozwiąż równanie z jedną niewiadomą.",
        "Podstaw wynik do jednego z równań i oblicz drugą niewiadomą.",
        "Sprawdź parę w obu równaniach początkowych.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Po dodaniu stronami równań układu $\\begin{cases} 2x + 3y = 13 \\\\ 5x - 3y = 1 \\end{cases}$ otrzymujemy równanie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$7x + 6y = 14$", "$7x = 14$", "$-3x + 6y = 12$", "$7x = 12$"],
          poprawna: 1,
        },
        {
          nr: "23",
          tresc: "Rozwiązaniem układu równań $\\begin{cases} 3x + y = 10 \\\\ x - y = 2 \\end{cases}$ jest para: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(3, 1)$", "$(1, 3)$", "$(2, 4)$", "$(4, -2)$"],
          poprawna: 0,
        },
        {
          nr: "24",
          tresc: "W układzie $\\begin{cases} x + 2y = 5 \\\\ 3x + y = 10 \\end{cases}$ pierwsze równanie mnożymy przez liczbę $k$, a następnie dodajemy stronami do drugiego tak, aby zniknęła niewiadoma $x$. Liczba $k$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$-\\frac{1}{3}$", "$-3$", "$-2$"],
          poprawna: 2,
        },
        {
          nr: "25",
          tresc: "Dany jest układ równań $\\begin{cases} 2x + y = 5 \\\\ 2x - 3y = 1 \\end{cases}$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Po odjęciu drugiego równania od pierwszego otrzymujemy $4y = 4$.", litery: "PF", poprawna: 0 },
            { tekst: "Dodanie równań stronami eliminuje niewiadomą $x$.", litery: "PF", poprawna: 1 },
            { tekst: "Para $(1, 3)$ jest rozwiązaniem układu.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "26",
          tresc: "Rozwiązaniem układu równań $\\begin{cases} 3x + 2y = 13 \\\\ 2x - y = 4 \\end{cases}$ jest para $(x, y)$. Iloczyn $x \\cdot y$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$1$", "$9$", "$6$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 3,
          tresc: "Rozwiąż metodą przeciwnych współczynników układ równań $\\begin{cases} 3x + 4y = 9 \\\\ 5x - 6y = -23 \\end{cases}$. **Zapisz obliczenia.**",
          rozwiazanie: "Eliminujemy $y$: współczynniki $4$ i $-6$, ich najmniejsza wspólna wielokrotność to $12$. Pierwsze równanie mnożymy przez $3$, drugie przez $2$.\n\nOtrzymujemy: $9x + 12y = 27$ oraz $10x - 12y = -46$.\n\nDodajemy stronami: $19x = -19$, więc $x = -1$.\n\nPodstawiamy do pierwszego równania: $3\\cdot(-1) + 4y = 9$, stąd $4y = 12$ i $y = 3$.\n\nSprawdzenie: $5\\cdot(-1) - 6\\cdot 3 = -5 - 18 = -23$.\n\nOdpowiedź: $x = -1$, $y = 3$.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "Rozwiąż metodą przeciwnych współczynników każdy z układów i napisz, ile ma rozwiązań: (a) $\\begin{cases} 2x - 3y = 4 \\\\ -2x + 3y = 1 \\end{cases}$, (b) $\\begin{cases} x + 4y = 3 \\\\ -x - 4y = -3 \\end{cases}$. **Zapisz obliczenia.**",
          rozwiazanie: "(a) Dodajemy równania stronami: $(2x - 2x) + (-3y + 3y) = 4 + 1$, czyli $0 = 5$. To jest równość fałszywa, więc układ jest sprzeczny i nie ma rozwiązań.\n\n(b) Dodajemy równania stronami: $0 = 0$. To jest równość prawdziwa; drugie równanie to pierwsze pomnożone przez $-1$, więc układ ma nieskończenie wiele rozwiązań.\n\nOdpowiedź: (a) brak rozwiązań, (b) nieskończenie wiele rozwiązań.",
        },
      ],
      generatory: [
        {
          id: "przeciwne-dodawanie",
          nazwa: "Od razu przeciwne",
          opis: "Przy jednej niewiadomej stoją liczby przeciwne – dodaj równania stronami i rozwiąż układ.",
          generuj(r) {
            for (;;) {
              const x0 = r.int(-6, 6), y0 = r.int(-6, 6);
              const el = r.chance() ? "y" : "x";
              const cel = r.intBez(-5, 5, 0);
              const co1 = r.intBez(-5, 5, 0), co2 = r.intBez(-5, 5, 0);
              if (co1 + co2 === 0) continue;
              let e1 = el === "y" ? { a: co1, b: cel } : { a: cel, b: co1 };
              let e2 = el === "y" ? { a: co2, b: -cel } : { a: -cel, b: co2 };
              e1 = { ...e1, c: e1.a * x0 + e1.b * y0 };
              e2 = { ...e2, c: e2.a * x0 + e2.b * y0 };
              if (r.chance()) [e1, e2] = [e2, e1];
              return {
                tresc: `Rozwiąż układ równań $${uklad(rown(e1), rown(e2))}$.`,
                pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }, { id: "y", typ: "liczba", etykieta: "$y =$" }],
                odpowiedz: { x: q(x0), y: q(y0) },
                wynik: `$x = ${x0}$, $y = ${y0}$`,
                rozwiazanie: krokiPrzeciwne(e1, e2, el, x0, y0),
              };
            }
          },
        },
        {
          id: "przeciwne-mnozenie",
          nazwa: "Z mnożeniem równań",
          opis: "Współczynniki nie są przeciwne – pomnóż równania przez odpowiednie liczby, dodaj stronami i rozwiąż układ.",
          generuj(r) {
            for (;;) {
              const x0 = r.int(-6, 6), y0 = r.int(-6, 6);
              const el = r.chance() ? "y" : "x";
              const cw1 = r.intBez(-5, 5, 0), cw2 = r.intBez(-5, 5, 0);
              if (Math.abs(cw1) === Math.abs(cw2)) continue;
              const cu1 = r.intBez(-5, 5, 0), cu2 = r.intBez(-5, 5, 0);
              const [m1, m2] = mnozniki(cw1, cw2);
              if (m1 * cu1 + m2 * cu2 === 0) continue;
              let e1 = el === "y" ? { a: cu1, b: cw1 } : { a: cw1, b: cu1 };
              let e2 = el === "y" ? { a: cu2, b: cw2 } : { a: cw2, b: cu2 };
              e1 = { ...e1, c: e1.a * x0 + e1.b * y0 };
              e2 = { ...e2, c: e2.a * x0 + e2.b * y0 };
              return {
                tresc: `Rozwiąż układ równań $${uklad(rown(e1), rown(e2))}$.`,
                pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }, { id: "y", typ: "liczba", etykieta: "$y =$" }],
                odpowiedz: { x: q(x0), y: q(y0) },
                wynik: `$x = ${x0}$, $y = ${y0}$`,
                rozwiazanie: krokiPrzeciwne(e1, e2, el, x0, y0),
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5.5
    {
      id: "zadania",
      nazwa: "Zastosowanie układów równań do zadań",
      sciaga: [
        {
          nazwa: "Jak ułożyć układ",
          slownie: "Oznacz niewiadome literami i zapisz, co oznaczają. Z treści zadania wypisz dwa warunki jako dwa równania, rozwiąż układ i sprawdź wynik w treści.",
          przyklad: "Suma dwóch liczb to $25$, a różnica $7$: $x+y=25$ i $x-y=7$. Po dodaniu $2x=32$, więc $x=16$ i $y=9$.",
          uwaga: "Wynik musi mieć sens: liczba osób jest całkowita i dodatnia, długość boku jest dodatnia.",
        },
        {
          nazwa: "Liczby i wiek",
          slownie: "Zwroty „o $k$ więcej”, „$k$ razy większa”, „razem” zamień na równania. „$k$ razy większa” to mnożenie, „o $k$ więcej” to dodawanie.",
          przyklad: "Ojciec jest $4$ razy starszy od syna, razem mają $50$ lat: $x=4y$ i $x+y=50$. Wtedy $5y=50$, $y=10$, $x=40$.",
          uwaga: "Nie myl „o $4$ więcej” ($x=y+4$) z „$4$ razy więcej” ($x=4y$).",
        },
        {
          nazwa: "Ceny i ilości",
          slownie: "Jedno równanie opisuje ilości (ile sztuk), drugie koszt (cena razy ilość). Nie mieszaj ich w jednym równaniu.",
          przyklad: "Kupiono $10$ biletów po $8$ zł i po $12$ zł za $96$ zł. Mamy $x+y=10$ i $8x+12y=96$. Stąd $x=6$ biletów po $8$ zł i $y=4$ po $12$ zł.",
          uwaga: "Suma $x+y$ to liczba biletów, a $8x+12y$ to koszt w złotych.",
        },
        {
          nazwa: "Obwód prostokąta",
          slownie: "Obwód prostokąta o bokach $a$ i $b$ to $2a+2b$. Informację „jeden bok jest o $d$ dłuższy” zapisz jako $a-b=d$.",
          tex: "2a+2b=O\\qquad a-b=d",
          przyklad: "Obwód $28$ cm i różnica boków $4$ cm: $a+b=14$ i $a-b=4$, więc $a=9$ cm, $b=5$ cm.",
        },
        {
          nazwa: "Droga, prędkość, czas",
          slownie: "Droga to prędkość razy czas. Gdy dwa ciała jadą naprzeciw siebie i spotykają się po tym samym czasie, ich drogi sumują się do odległości początkowej.",
          tex: "s=v\\cdot t",
          litery: "$s$ – droga, $v$ – prędkość, $t$ – czas.",
          przyklad: "Pieszy i rowerzysta wyszli naprzeciw siebie z miejsc odległych o $30$ km i spotkali się po $2$ h. Rowerzysta jedzie o $3$ km/h szybciej: $2x+2y=30$, $x-y=3$, więc $x=9$ km/h, $y=6$ km/h.",
          uwaga: "Pilnuj jednostek – prędkość w km/h wymaga czasu w godzinach.",
        },
      ],
      jak: [
        "Przeczytaj zadanie i zapisz, co oznaczają $x$ i $y$ (z jednostkami).",
        "Zapisz dwa warunki z treści jako dwa równania.",
        "Rozwiąż układ wybraną metodą.",
        "Sprawdź wynik w treści zadania i napisz odpowiedź zdaniem.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Suma dwóch liczb jest równa $40$, a ich różnica jest równa $12$. Mniejsza z tych liczb jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$26$", "$14$", "$28$", "$20$"],
          poprawna: 1,
        },
        {
          nr: "30",
          tresc: "Kasia kupiła $3$ zeszyty i $2$ długopisy i zapłaciła $13$ zł. Zeszyt kosztuje o $1$ zł więcej niż długopis. Niech $x$ oznacza cenę zeszytu, a $y$ cenę długopisu. Które równania opisują tę sytuację? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "$2x + 3y = 13$ i $x = y + 1$",
            "$x + y = 13$ i $x = y + 1$",
            "$3x + 2y = 13$ i $x = y + 1$",
            "$3x + 2y = 13$ i $y = x + 1$",
          ],
          poprawna: 2,
        },
        {
          nr: "31",
          tresc: "Obwód prostokąta jest równy $36$ cm, a jeden z jego boków jest o $6$ cm dłuższy od drugiego. Pole tego prostokąta jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$72$ cm$^2$", "$108$ cm$^2$", "$81$ cm$^2$", "$66$ cm$^2$"],
          poprawna: 0,
        },
        {
          nr: "32",
          tresc: "W klasie jest $28$ uczniów, a dziewcząt jest o $4$ więcej niż chłopców. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Chłopców jest $12$.", litery: "PF", poprawna: 0 },
            { tekst: "Dziewcząt jest $14$.", litery: "PF", poprawna: 1 },
            { tekst: "Układ $x + y = 28$, $y = x + 4$ (gdzie $x$ – liczba dziewcząt, $y$ – liczba chłopców) opisuje tę sytuację.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "33",
          tresc: "Za $2$ kg jabłek i $3$ kg gruszek zapłacono $19$ zł, a za $3$ kg jabłek i $2$ kg gruszek zapłacono $16$ zł. Kilogram jabłek kosztuje: **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$ zł", "$3$ zł", "$4$ zł", "$2$ zł"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 3,
          tresc: "Na parkingu stoją samochody (cztery koła) i motocykle (dwa koła). Pojazdów jest razem $22$, a mają one razem $70$ kół. Ile jest samochodów, a ile motocykli? **Zapisz obliczenia.**",
          rozwiazanie: "Niech $x$ – liczba samochodów, $y$ – liczba motocykli.\n\nPojazdów jest $22$: $x + y = 22$. Kół jest $70$: $4x + 2y = 70$.\n\nZ pierwszego równania $y = 22 - x$. Wstawiamy do drugiego: $4x + 2(22 - x) = 70$, czyli $4x + 44 - 2x = 70$, więc $2x = 26$ i $x = 13$.\n\nWtedy $y = 22 - 13 = 9$.\n\nSprawdzenie: $4\\cdot 13 + 2\\cdot 9 = 52 + 18 = 70$.\n\nOdpowiedź: jest $13$ samochodów i $9$ motocykli.",
        },
        {
          nr: "35",
          punkty: 3,
          tresc: "Zmieszano roztwór $10$-procentowy z roztworem $30$-procentowym i otrzymano $20$ kg roztworu $25$-procentowego. Ile kilogramów każdego roztworu zmieszano? **Zapisz obliczenia.**",
          rozwiazanie: "Niech $x$ – masa roztworu $10$-procentowego (w kg), $y$ – masa roztworu $30$-procentowego (w kg).\n\nŁączna masa: $x + y = 20$. Masa substancji: $0{,}1x + 0{,}3y = 0{,}25\\cdot 20 = 5$.\n\nMnożymy drugie równanie przez $10$: $x + 3y = 50$. Odejmujemy od niego pierwsze równanie: $2y = 30$, więc $y = 15$.\n\nWtedy $x = 20 - 15 = 5$.\n\nSprawdzenie: $0{,}1\\cdot 5 + 0{,}3\\cdot 15 = 0{,}5 + 4{,}5 = 5$.\n\nOdpowiedź: $5$ kg roztworu $10$-procentowego i $15$ kg roztworu $30$-procentowego.",
        },
      ],
      generatory: [
        {
          id: "zadania-ceny",
          nazwa: "Ceny i ilości",
          opis: "Zadanie tekstowe o biletach albo o cenach towarów – ułóż układ równań i rozwiąż go.",
          generuj(r) {
            if (r.chance()) {
              const u = r.int(4, 12), p = u + r.int(2, 10);
              const x0 = r.int(5, 30), y0 = r.int(5, 30);
              const e1 = { a: 1, b: 1, c: x0 + y0 }, e2 = { a: p, b: u, c: p * x0 + u * y0 };
              return zadanieUklad({
                tresc: `W kinie sprzedano $${x0 + y0}$ biletów: normalnych po $${p}$ zł i ulgowych po $${u}$ zł. Utarg wyniósł $${e2.c}$ zł. Ile sprzedano biletów normalnych, a ile ulgowych?`,
                def: "Niech $x$ – liczba biletów normalnych, $y$ – liczba biletów ulgowych.",
                e1, e2, el: r.pick(["x", "y"]), x0, y0,
                etykiety: ["Biletów normalnych", "Biletów ulgowych"],
              });
            }
            for (;;) {
              const x0 = r.int(2, 12), y0 = r.int(2, 12);
              const a = r.int(1, 5), b = r.int(1, 5), c = r.int(1, 5), d = r.int(1, 5);
              const el = r.pick(["x", "y"]);
              const [m1, m2] = mnozniki(el === "x" ? a : b, el === "x" ? c : d);
              if (m1 * (el === "x" ? b : a) + m2 * (el === "x" ? d : c) === 0) continue;
              const e1 = { a, b, c: a * x0 + b * y0 }, e2 = { a: c, b: d, c: c * x0 + d * y0 };
              return zadanieUklad({
                tresc: `Za $${a}$ kg jabłek i $${b}$ kg gruszek zapłacono $${e1.c}$ zł, a za $${c}$ kg jabłek i $${d}$ kg gruszek – $${e2.c}$ zł. Ile kosztuje $1$ kg jabłek, a ile $1$ kg gruszek?`,
                def: "Niech $x$ – cena 1 kg jabłek (w zł), $y$ – cena 1 kg gruszek (w zł).",
                e1, e2, el, x0, y0,
                etykiety: ["Cena 1 kg jabłek (zł)", "Cena 1 kg gruszek (zł)"],
              });
            }
          },
        },
        {
          id: "zadania-sytuacje",
          nazwa: "Liczby, boki, ruch",
          opis: "Zadanie tekstowe o dwóch liczbach, bokach prostokąta albo o ruchu – ułóż układ równań i rozwiąż go.",
          generuj(r) {
            const typ = r.int(0, 3);
            if (typ === 0) {
              const x0 = r.int(6, 40), y0 = r.int(1, x0 - 1);
              return zadanieUklad({
                tresc: `Suma dwóch liczb jest równa $${x0 + y0}$, a ich różnica jest równa $${x0 - y0}$. Oblicz te liczby.`,
                def: "Niech $x$ – większa liczba, $y$ – mniejsza liczba.",
                e1: { a: 1, b: 1, c: x0 + y0 }, e2: { a: 1, b: -1, c: x0 - y0 }, el: "y", x0, y0,
                etykiety: ["Większa liczba", "Mniejsza liczba"],
              });
            }
            if (typ === 1) {
              const y0 = r.int(2, 15), k = r.int(2, 5), x0 = k * y0;
              return zadanieUklad({
                tresc: `Suma dwóch liczb jest równa $${x0 + y0}$, a jedna z nich jest $${k}$ razy większa od drugiej. Oblicz te liczby.`,
                def: "Niech $x$ – większa liczba, $y$ – mniejsza liczba.",
                e1: { a: 1, b: -k, c: 0 }, e2: { a: 1, b: 1, c: x0 + y0 }, el: "x", x0, y0,
                etykiety: ["Większa liczba", "Mniejsza liczba"],
              });
            }
            if (typ === 2) {
              const y0 = r.int(3, 20), d = r.int(2, 9), x0 = y0 + d;
              return zadanieUklad({
                tresc: `Obwód prostokąta jest równy $${2 * (x0 + y0)}$ cm, a jeden z jego boków jest o $${d}$ cm dłuższy od drugiego. Oblicz długości boków tego prostokąta.`,
                def: "Niech $x$ – długość dłuższego boku (w cm), $y$ – długość krótszego boku (w cm).",
                e1: { a: 2, b: 2, c: 2 * (x0 + y0) }, e2: { a: 1, b: -1, c: d }, el: "y", x0, y0,
                etykiety: ["Dłuższy bok (cm)", "Krótszy bok (cm)"],
              });
            }
            const y0 = r.int(40, 70), e = r.int(5, 20), x0 = y0 + e, t = r.int(2, 3);
            return zadanieUklad({
              tresc: `Dwa samochody wyjechały jednocześnie z miast odległych o $${t * (x0 + y0)}$ km i jadą naprzeciw siebie. Spotkały się po $${t}$ godzinach. Jeden z nich jedzie szybciej od drugiego o $${e}$ km/h. Oblicz prędkości samochodów.`,
              def: "Niech $x$ – prędkość szybszego samochodu (w km/h), $y$ – prędkość wolniejszego (w km/h).",
              e1: { a: t, b: t, c: t * (x0 + y0) }, e2: { a: 1, b: -1, c: e }, el: "y", x0, y0,
              etykiety: ["Prędkość szybszego (km/h)", "Prędkość wolniejszego (km/h)"],
            });
          },
        },
      ],
    },
  ],
};
