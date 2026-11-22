// Klasa 2 (liceum i technikum) · rozdział 6 „Geometria analityczna” – Matematyka 2, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q, texNawias } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
};

/** „Ładna” odpowiedź: mianownik co najwyżej 12. */
const ladna = (v) => Math.abs(v.n) <= 100000 && v.d <= 12;

/** Liczba w LaTeX: połówki z przecinkiem dziesiętnym (2{,}5), inne ułamki jako \frac. */
function dz(v) {
  const x = Q.z(v);
  if (x.d === 1) return String(x.n);
  if (x.d === 2) {
    const m = Math.abs(x.n);
    return `${x.n < 0 ? "-" : ""}${Math.floor(m / 2)}{,}5`;
  }
  return x.tex();
}

/** Liczba w nawiasie, gdy jest ujemna (do wstawiania w działania). */
const nw = (v) => (Q.z(v).ujemna ? `(${dz(v)})` : dz(v));

/** Punkt w LaTeX: (3, -2) albo (1{,}5; -2), gdy któraś współrzędna ma przecinek. */
const pkt = (x, y) => `(${dz(x)}${Q.z(x).calkowita && Q.z(y).calkowita ? ", " : "; "}${dz(y)})`;

/** Wyrażenie liniowe z listy [współczynnik, symbol]; symbol "" to wyraz wolny: suma([[2, "x"], [-1, "y"], [3, ""]]) = "2x - y + 3". */
function suma(czlony) {
  let s = "";
  for (const [c, v] of czlony) {
    const x = Q.z(c);
    if (x.zero) continue;
    const abs = x.ujemna ? x.neg() : x;
    const liczba = v !== "" && abs.eq(1) ? "" : abs.tex();
    if (s === "") s = `${x.ujemna ? "-" : ""}${liczba}${v}`;
    else s += ` ${x.ujemna ? "-" : "+"} ${liczba}${v}`;
  }
  return s || "0";
}

/** Kwadrat różnicy z całkowitą współrzędną środka: kw("x", 3) = "(x - 3)^2", kw("y", -2) = "(y + 2)^2", kw("x", 0) = "x^2". */
const kw = (zm, c) => (c === 0 ? `${zm}^2` : c > 0 ? `(${zm} - ${c})^2` : `(${zm} + ${-c})^2`);

/** Równanie okręgu w postaci kanonicznej o środku (a, b) i prawej stronie rhs. */
const okrag = (a, b, rhs) => `${kw("x", a)} + ${kw("y", b)} = ${rhs}`;

/** Losowa liczba z [min, max] bez zera. */
const bezZera = (r, min, max) => r.intBez(min, max, 0);

/** Nazwy końców odcinka. */
const NAZWY = [["A", "B"], ["K", "L"], ["M", "N"], ["C", "D"]];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 6.1
    {
      id: "odcinek",
      nazwa: "Odcinek w układzie współrzędnych",
      sciaga: [
        {
          nazwa: "Długość odcinka",
          slownie: "Odcinek $AB$ jest przeciwprostokątną trójkąta prostokątnego, którego przyprostokątne to różnice współrzędnych. Z twierdzenia Pitagorasa dostajemy wzór na odległość dwóch punktów.",
          tex: "|AB|=\\sqrt{(\\Delta x)^2+(\\Delta y)^2}\\qquad\\Delta x=x_B-x_A\\qquad\\Delta y=y_B-y_A",
          litery: "$A=(x_A, y_A)$, $B=(x_B, y_B)$ – końce odcinka, $\\Delta x$, $\\Delta y$ – różnice współrzędnych.",
          przyklad: "Dla $A=(1, 2)$ i $B=(4, 6)$: $\\Delta x=3$, $\\Delta y=4$, więc $|AB|=\\sqrt{3^2+4^2}=\\sqrt{25}=5$.",
          uwaga: "Różnice są podnoszone do kwadratu, więc kolejność odejmowania nie ma znaczenia. Nie zapomnij o pierwiastku na końcu.",
        },
        {
          nazwa: "Środek odcinka",
          slownie: "Współrzędne środka odcinka to średnie arytmetyczne odpowiednich współrzędnych jego końców.",
          tex: "x_S=\\frac{x_A+x_B}{2}\\qquad y_S=\\frac{y_A+y_B}{2}",
          litery: "$S=(x_S, y_S)$ – środek odcinka $AB$.",
          przyklad: "Dla $A=(-2, 3)$ i $B=(6, -1)$: $x_S=\\frac{-2+6}{2}=2$, $y_S=\\frac{3+(-1)}{2}=1$, czyli $S=(2, 1)$.",
          uwaga: "Dodajemy współrzędne, a nie je odejmujemy. Różnica podzielona przez $2$ to połowa długości odcinka, a nie jego środek.",
        },
        {
          nazwa: "Drugi koniec odcinka",
          slownie: "Gdy znasz środek $S$ i jeden koniec $A$, drugi koniec $B$ jest punktem symetrycznym do $A$ względem $S$. Z wzoru na środek wyznacz współrzędne $B$.",
          tex: "x_B=2x_S-x_A\\qquad y_B=2y_S-y_A",
          litery: "$S=(x_S, y_S)$ – środek odcinka, $A=(x_A, y_A)$ – znany koniec, $B=(x_B, y_B)$ – szukany koniec.",
          przyklad: "Dla $A=(1, 2)$ i $S=(4, 5)$: $x_B=2\\cdot 4-1=7$, $y_B=2\\cdot 5-2=8$, czyli $B=(7, 8)$.",
        },
        {
          nazwa: "Odcinek równoległy do osi",
          slownie: "Gdy końce mają równe rzędne, odcinek jest poziomy, a gdy równe odcięte – pionowy. Wtedy długość to wartość bezwzględna różnicy tych współrzędnych, które się różnią.",
          tex: "|AB|=|x_B-x_A|\\qquad|AB|=|y_B-y_A|",
          litery: "Pierwszy wzór dla odcinka poziomego ($y_A=y_B$), drugi dla pionowego ($x_A=x_B$).",
          przyklad: "Dla $A=(-3, 2)$ i $B=(5, 2)$ odcinek jest poziomy: $|AB|=|5-(-3)|=8$.",
          uwaga: "Długość nie może być ujemna, więc przy odejmowaniu używamy wartości bezwzględnej.",
        },
      ],
      jak: [
        "Zapisz współrzędne końców odcinka: $A=(x_A, y_A)$ i $B=(x_B, y_B)$.",
        "Długość: oblicz $\\Delta x$ i $\\Delta y$, podnieś je do kwadratu, dodaj i wyciągnij pierwiastek.",
        "Środek: dodaj współrzędne $x$ obu końców i podziel przez $2$, tak samo dla współrzędnych $y$.",
        "Gdy znasz środek i jeden koniec, pomnóż współrzędne środka przez $2$ i odejmij współrzędne znanego końca.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Dane są punkty $A = (-2, 1)$ i $B = (4, 9)$. Długość odcinka $AB$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$", "$10$", "$100$", "$\\sqrt{104}$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Dane są punkty $A = (-4, 7)$ i $B = (10, -3)$. Środek odcinka $AB$ ma współrzędne: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(6, 4)$", "$(7, -5)$", "$(-3, -2)$", "$(3, 2)$"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "Punkt $S = (2, -1)$ jest środkiem odcinka $AB$, gdzie $A = (-3, 4)$. Punkt $B$ ma współrzędne: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-1, 3)$", "$(5, -5)$", "$(7, -6)$", "$(-8, 9)$"],
          poprawna: 2,
        },
        {
          nr: "4",
          tresc: "Dane są punkty $A = (1, 1)$ i $B = (7, 9)$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Długość odcinka $AB$ jest równa $10$.", litery: "PF", poprawna: 0 },
            { tekst: "Odcinek $AB$ jest równoległy do osi $OY$.", litery: "PF", poprawna: 1 },
            { tekst: "Środek odcinka $AB$ ma współrzędne $(4, 5)$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "5",
          tresc: "Dane są punkty $A = (2, 1)$ i $B = (7, y)$, gdzie $y > 1$. Odcinek $AB$ ma długość $13$. Liczba $y$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$13$", "$12$", "$-11$", "$144$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Dane są punkty $A = (-3, -1)$ i $B = (9, 4)$. Oblicz długość odcinka $AB$ i podaj współrzędne jego środka. **Zapisz obliczenia.**",
          rozwiazanie: "Różnice współrzędnych: $x_B - x_A = 9 - (-3) = 12$ oraz $y_B - y_A = 4 - (-1) = 5$.\n\nDługość: $|AB| = \\sqrt{12^2 + 5^2} = \\sqrt{144 + 25} = \\sqrt{169} = 13$.\n\nŚrodek: $x_S = \\frac{-3 + 9}{2} = 3$ oraz $y_S = \\frac{-1 + 4}{2} = \\frac{3}{2}$.\n\nOdpowiedź: $|AB| = 13$, $S = \\left(3, \\frac{3}{2}\\right)$.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Wierzchołki trójkąta $ABC$ mają współrzędne $A = (1, 1)$, $B = (7, 1)$, $C = (4, 5)$. Sprawdź, czy ten trójkąt jest równoramienny, i oblicz jego obwód. **Zapisz obliczenia.**",
          rozwiazanie: "Bok $AB$ jest poziomy (równe rzędne): $|AB| = 7 - 1 = 6$.\n\n$|AC| = \\sqrt{(4 - 1)^2 + (5 - 1)^2} = \\sqrt{9 + 16} = 5$.\n\n$|BC| = \\sqrt{(4 - 7)^2 + (5 - 1)^2} = \\sqrt{9 + 16} = 5$.\n\nBoki $AC$ i $BC$ mają równe długości, więc trójkąt jest równoramienny. Obwód: $6 + 5 + 5 = 16$.\n\nOdpowiedź: trójkąt jest równoramienny, obwód jest równy $16$.",
        },
      ],
      generatory: [
        {
          id: "odcinek-dlugosc",
          nazwa: "Długość odcinka",
          opis: "Oblicz długość odcinka o danych końcach (wynik całkowity).",
          generuj(r) {
            const [p, s] = r.pick([[3, 4], [4, 3], [6, 8], [8, 6], [5, 12], [12, 5], [3, 4], [4, 3], [6, 8], [8, 6], [3, 0], [0, 6]]);
            const dx = p * r.znak(), dy = s * r.znak();
            const pocz = (d) => r.int(Math.max(-10, -10 - d), Math.min(10, 10 - d));
            const xa = pocz(dx), ya = pocz(dy), xb = xa + dx, yb = ya + dy;
            const d = Math.sqrt(dx * dx + dy * dy);
            const [A, B] = r.pick(NAZWY);
            return {
              tresc: `Dane są punkty $${A} = ${pkt(xa, ya)}$ i $${B} = ${pkt(xb, yb)}$. Oblicz długość odcinka $${A}${B}$.`,
              pola: [{ id: "d", typ: "liczba", etykieta: `$|${A}${B}| =$` }],
              odpowiedz: { d: q(d) },
              wynik: `$|${A}${B}| = ${d}$`,
              rozwiazanie: [
                `Różnice współrzędnych: $x_${B} - x_${A} = ${xb} - ${nw(xa)} = ${dx}$ oraz $y_${B} - y_${A} = ${yb} - ${nw(ya)} = ${dy}$.`,
                `$|${A}${B}| = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2} = \\sqrt{${nw(dx)}^2 + ${nw(dy)}^2} = \\sqrt{${dx * dx} + ${dy * dy}} = \\sqrt{${dx * dx + dy * dy}} = ${d}$.`,
              ],
            };
          },
        },
        {
          id: "odcinek-srodek",
          nazwa: "Środek i koniec odcinka",
          opis: "Oblicz współrzędne środka odcinka albo drugiego końca, gdy znasz środek i jeden koniec.",
          generuj(r) {
            let xa, ya, xb, yb;
            do {
              xa = r.int(-9, 9); ya = r.int(-9, 9); xb = r.int(-9, 9); yb = r.int(-9, 9);
            } while (xa === xb && ya === yb);
            const xs = q(xa + xb, 2), ys = q(ya + yb, 2);
            const [A, B] = r.pick(NAZWY);
            if (r.chance()) {
              return {
                tresc: `Dane są punkty $${A} = ${pkt(xa, ya)}$ i $${B} = ${pkt(xb, yb)}$. Oblicz współrzędne środka $S$ odcinka $${A}${B}$.`,
                pola: [{ id: "x", typ: "liczba", etykieta: "$x_S =$" }, { id: "y", typ: "liczba", etykieta: "$y_S =$" }],
                odpowiedz: { x: xs, y: ys },
                wynik: `$S = ${pkt(xs, ys)}$`,
                rozwiazanie: [
                  `$x_S = \\frac{x_${A} + x_${B}}{2} = \\frac{${xa} + ${nw(xb)}}{2} = ${dz(xs)}$.`,
                  `$y_S = \\frac{y_${A} + y_${B}}{2} = \\frac{${ya} + ${nw(yb)}}{2} = ${dz(ys)}$.`,
                  `Środek odcinka: $S = ${pkt(xs, ys)}$.`,
                ],
              };
            }
            return {
              tresc: `Punkt $S = ${pkt(xs, ys)}$ jest środkiem odcinka $${A}${B}$, gdzie $${A} = ${pkt(xa, ya)}$. Oblicz współrzędne punktu $${B}$.`,
              pola: [{ id: "x", typ: "liczba", etykieta: `$x_${B} =$` }, { id: "y", typ: "liczba", etykieta: `$y_${B} =$` }],
              odpowiedz: { x: q(xb), y: q(yb) },
              wynik: `$${B} = ${pkt(xb, yb)}$`,
              rozwiazanie: [
                `Ze wzoru na środek: $x_${B} = 2x_S - x_${A} = 2\\cdot ${nw(xs)} - ${nw(xa)} = ${xb}$.`,
                `$y_${B} = 2y_S - y_${A} = 2\\cdot ${nw(ys)} - ${nw(ya)} = ${yb}$.`,
                `Drugi koniec odcinka: $${B} = ${pkt(xb, yb)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 6.2
    {
      id: "kierunkowa",
      nazwa: "Równanie kierunkowe prostej",
      sciaga: [
        {
          nazwa: "Postać kierunkowa",
          slownie: "Prosta, która nie jest pionowa, ma równanie $y=ax+b$. Współczynnik $a$ mówi, o ile zmienia się $y$, gdy $x$ rośnie o $1$.",
          tex: "y=ax+b",
          litery: "$a$ – współczynnik kierunkowy, $b$ – wyraz wolny: prosta przecina oś $OY$ w punkcie $(0, b)$.",
          przyklad: "Prosta $y=2x-3$ ma $a=2$ i $b=-3$, więc przecina oś $OY$ w punkcie $(0, -3)$.",
          uwaga: "Prosta pionowa $x=c$ nie ma równania kierunkowego. Punkt leży na prostej, gdy jego współrzędne spełniają równanie.",
        },
        {
          nazwa: "Współczynnik z dwóch punktów",
          slownie: "Dla prostej przez punkty $A$ i $B$ o różnych odciętych współczynnik kierunkowy to iloraz różnicy rzędnych przez różnicę odciętych.",
          tex: "a=\\frac{y_B-y_A}{x_B-x_A}\\qquad x_A\\neq x_B",
          litery: "$A=(x_A, y_A)$, $B=(x_B, y_B)$ – dwa punkty prostej.",
          przyklad: "Dla $A=(1, 2)$ i $B=(4, 8)$: $a=\\frac{8-2}{4-1}=2$.",
          uwaga: "W liczniku i w mianowniku odejmuj w tej samej kolejności: od punktu $B$ odejmij punkt $A$ w obu różnicach.",
        },
        {
          nazwa: "Prosta przez dwa punkty",
          slownie: "Oblicz $a$ z dwóch punktów, potem podstaw współrzędne jednego z nich do $y=ax+b$ i wyznacz $b$.",
          tex: "y=ax+b\\qquad y_A=ax_A+b",
          przyklad: "Dla $A=(-1, 1)$ i $B=(3, 9)$: $a=\\frac{9-1}{3-(-1)}=2$. Z punktu $A$: $1=2\\cdot(-1)+b$, więc $b=3$ i $y=2x+3$.",
          uwaga: "Dla sprawdzenia podstaw drugi punkt: $2\\cdot 3+3=9$. Zgadza się.",
        },
        {
          nazwa: "Proste równoległe i prostopadłe",
          slownie: "Proste $y=a_1x+b_1$ i $y=a_2x+b_2$ są równoległe, gdy mają równe współczynniki kierunkowe, a prostopadłe, gdy iloczyn tych współczynników jest równy $-1$.",
          tex: "a_1=a_2\\qquad a_1\\cdot a_2=-1",
          litery: "Pierwszy warunek dla prostych równoległych, drugi dla prostopadłych.",
          przyklad: "Do prostej $y=2x+1$ równoległa jest $y=2x-5$, a prostopadła ma $a_2=-\\frac{1}{2}$, bo $2\\cdot\\left(-\\frac{1}{2}\\right)=-1$.",
          uwaga: "Współczynnik prostej prostopadłej to liczba odwrotna z przeciwnym znakiem. Sama zmiana znaku nie wystarcza.",
        },
      ],
      jak: [
        "Prosta przez dwa punkty: oblicz $a=\\frac{y_B-y_A}{x_B-x_A}$.",
        "Podstaw współrzędne jednego z punktów do $y=ax+b$ i wyznacz $b$.",
        "Prosta równoległa do danej ma ten sam $a$. Prosta prostopadła ma $a_2=-\\frac{1}{a_1}$.",
        "Podstaw współrzędne punktu, przez który ma przechodzić szukana prosta, aby wyznaczyć $b$.",
        "Sprawdź wynik: współrzędne obu danych punktów muszą spełniać równanie.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Prosta przechodzi przez punkty $A = (-1, 4)$ i $B = (3, -2)$. Jej współczynnik kierunkowy jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{3}{2}$", "$-\\frac{2}{3}$", "$-\\frac{3}{2}$", "$\\frac{2}{3}$"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Prosta o równaniu $y = -2x + 6$ przecina oś $OX$ w punkcie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(0, 6)$", "$(6, 0)$", "$(-3, 0)$", "$(3, 0)$"],
          poprawna: 3,
        },
        {
          nr: "10",
          tresc: "Prosta równoległa do prostej $y = 3x - 4$ i przechodząca przez punkt $P = (1, 5)$ ma równanie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$y = 3x + 2$", "$y = 3x + 5$", "$y = -\\frac{1}{3}x + \\frac{16}{3}$", "$y = 3x - 4$"],
          poprawna: 0,
        },
        {
          nr: "11",
          tresc: "Dana jest prosta $k$ o równaniu $y = -\\frac{1}{2}x + 3$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Prosta $y = 2x - 1$ jest prostopadła do prostej $k$.", litery: "PF", poprawna: 0 },
            { tekst: "Prosta $y = \\frac{1}{2}x + 3$ jest równoległa do prostej $k$.", litery: "PF", poprawna: 1 },
            { tekst: "Punkt $(4, 1)$ leży na prostej $k$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "12",
          tresc: "Prosta $y = (2m - 1)x + 3$ jest prostopadła do prostej $y = -\\frac{1}{2}x + 1$. Liczba $m$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{4}$", "$\\frac{3}{2}$", "$\\frac{3}{4}$", "$-\\frac{1}{2}$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 3,
          tresc: "Wyznacz równanie kierunkowe prostej przechodzącej przez punkty $A = (-2, 7)$ i $B = (4, -5)$. Sprawdź, czy punkt $C = (5, -7)$ leży na tej prostej. **Zapisz obliczenia.**",
          rozwiazanie: "Współczynnik kierunkowy: $a = \\frac{-5 - 7}{4 - (-2)} = \\frac{-12}{6} = -2$.\n\nPodstawiamy punkt $A$ do $y = -2x + b$: $7 = -2\\cdot(-2) + b = 4 + b$, więc $b = 3$.\n\nRównanie prostej: $y = -2x + 3$.\n\nDla punktu $C$: $-2\\cdot 5 + 3 = -7$, a rzędna punktu $C$ to $-7$. Równanie jest spełnione.\n\nOdpowiedź: $y = -2x + 3$, punkt $C$ leży na tej prostej.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Prosta $k$ ma równanie $y = \\frac{1}{2}x - 4$. Wyznacz równanie prostej $l$ prostopadłej do $k$ i przechodzącej przez punkt $P = (3, -2)$. Podaj punkty przecięcia prostej $l$ z osiami układu. **Zapisz obliczenia.**",
          rozwiazanie: "Prosta $k$ ma $a_1 = \\frac{1}{2}$. Dla prostej prostopadłej $a_2 = -\\frac{1}{a_1} = -2$.\n\nPodstawiamy punkt $P$ do $y = -2x + b$: $-2 = -2\\cdot 3 + b = -6 + b$, więc $b = 4$.\n\nRównanie prostej $l$: $y = -2x + 4$.\n\nOś $OY$: dla $x = 0$ mamy $y = 4$. Oś $OX$: dla $y = 0$ mamy $-2x + 4 = 0$, czyli $x = 2$.\n\nOdpowiedź: $l: y = -2x + 4$, punkty przecięcia z osiami: $(0, 4)$ i $(2, 0)$.",
        },
      ],
      generatory: [
        {
          id: "kierunkowa-przez-punkty",
          nazwa: "Prosta przez dwa punkty",
          opis: "Wyznacz współczynniki a i b prostej przechodzącej przez dwa punkty.",
          generuj(r) {
            const m = r.int(1, 3);
            const a = q(bezZera(r, -3, 3), m);
            const b = r.int(-4, 4);
            const dozwolone = [-4, -3, -2, -1, 0, 1, 2, 3, 4].filter((x) => x % m === 0);
            const xa = r.pick(dozwolone);
            const xb = r.pick(dozwolone.filter((x) => x !== xa));
            const ya = a.mul(xa).add(b), yb = a.mul(xb).add(b);
            const [A, B] = r.pick(NAZWY);
            return {
              tresc: `Prosta przechodzi przez punkty $${A} = ${pkt(xa, ya)}$ i $${B} = ${pkt(xb, yb)}$. Wyznacz jej równanie kierunkowe $y = ax + b$.`,
              pola: [{ id: "a", typ: "liczba", etykieta: "$a =$" }, { id: "b", typ: "liczba", etykieta: "$b =$" }],
              odpowiedz: { a, b: q(b) },
              wynik: `$y = ${suma([[a, "x"], [b, ""]])}$`,
              rozwiazanie: [
                `Współczynnik kierunkowy: $a = \\frac{y_${B} - y_${A}}{x_${B} - x_${A}} = \\frac{${nw(yb)} - ${nw(ya)}}{${nw(xb)} - ${nw(xa)}} = ${a.tex()}$.`,
                `Podstawiamy punkt $${A}$ do $y = ax + b$: $${dz(ya)} = ${texNawias(a)}\\cdot ${nw(xa)} + b$, stąd $b = ${b}$.`,
                `Równanie prostej: $y = ${suma([[a, "x"], [b, ""]])}$.`,
              ],
            };
          },
        },
        {
          id: "kierunkowa-rownolegla-prostopadla",
          nazwa: "Prosta równoległa lub prostopadła",
          opis: "Wyznacz równanie prostej równoległej albo prostopadłej do danej, przechodzącej przez punkt.",
          generuj(r) {
            const a1 = q(bezZera(r, -4, 4), r.pick([1, 1, 2, 3]));
            const b1 = r.int(-6, 6);
            const prostopadla = r.chance();
            const a2 = prostopadla ? q(1).div(a1).neg() : a1;
            const x0 = a2.d * r.int(-2, 2);
            const y0 = r.int(-8, 8);
            const b2 = q(y0).sub(a2.mul(x0));
            const krok1 = prostopadla
              ? `Proste prostopadłe spełniają $a_1\\cdot a_2 = -1$, więc $a_2 = -\\frac{1}{a_1} = \\frac{-1}{${a1.tex()}} = ${a2.tex()}$.`
              : `Proste równoległe mają równe współczynniki kierunkowe: $a_2 = a_1 = ${a1.tex()}$.`;
            return {
              tresc: `Prosta $k$ ma równanie $y = ${suma([[a1, "x"], [b1, ""]])}$. Wyznacz równanie prostej $l$ ${prostopadla ? "prostopadłej" : "równoległej"} do $k$ i przechodzącej przez punkt $P = ${pkt(x0, y0)}$. Prosta $l$ ma równanie $y = a_2x + b_2$.`,
              pola: [{ id: "a", typ: "liczba", etykieta: "$a_2 =$" }, { id: "b", typ: "liczba", etykieta: "$b_2 =$" }],
              odpowiedz: { a: a2, b: b2 },
              wynik: `$y = ${suma([[a2, "x"], [b2, ""]])}$`,
              rozwiazanie: [
                `Współczynnik kierunkowy prostej $k$: $a_1 = ${a1.tex()}$. ${krok1}`,
                `Punkt $P$ leży na prostej $l$: $${y0} = ${texNawias(a2)}\\cdot ${nw(x0)} + b_2$, stąd $b_2 = ${b2.tex()}$.`,
                `Równanie prostej $l$: $y = ${suma([[a2, "x"], [b2, ""]])}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 6.3
    {
      id: "ogolna",
      nazwa: "Równanie ogólne prostej",
      sciaga: [
        {
          nazwa: "Postać ogólna",
          slownie: "Każdą prostą na płaszczyźnie opisuje równanie $Ax+By+C=0$, gdzie $A$ i $B$ nie są jednocześnie równe zero. Obejmuje ono też proste pionowe.",
          tex: "Ax+By+C=0\\qquad A^2+B^2\\neq0",
          litery: "$A$, $B$, $C$ – liczby rzeczywiste.",
          przyklad: "Równanie $2x-3y+6=0$ opisuje prostą. Pomnożone przez $2$ daje $4x-6y+12=0$ – to ta sama prosta.",
          uwaga: "Dla $B=0$ dostajemy prostą pionową, np. $x-4=0$, czyli $x=4$.",
        },
        {
          nazwa: "Z ogólnej na kierunkową",
          slownie: "Gdy $B\\neq0$, wyznacz $y$: przenieś wyrazy z $x$ i wyraz wolny na prawą stronę i podziel obie strony przez $B$.",
          tex: "a=-\\frac{A}{B}\\qquad b=-\\frac{C}{B}",
          litery: "$y=ax+b$ – postać kierunkowa tej samej prostej.",
          przyklad: "Z $2x-3y+6=0$: $-3y=-2x-6$, więc $y=\\frac{2}{3}x+2$, czyli $a=\\frac{2}{3}$, $b=2$.",
          uwaga: "Dziel przez $B$ ze znakiem. Dla $B<0$ zmieniają się znaki obu współczynników.",
        },
        {
          nazwa: "Z kierunkowej na ogólną",
          slownie: "Przenieś wszystkie wyrazy na jedną stronę. Jeśli są ułamki, pomnóż równanie przez wspólny mianownik.",
          tex: "y=ax+b\\qquad ax-y+b=0",
          przyklad: "Z $y=\\frac{1}{2}x-3$ po pomnożeniu przez $2$: $2y=x-6$, czyli $x-2y-6=0$.",
        },
        {
          nazwa: "Proste równoległe i prostopadłe",
          slownie: "Dla prostych $A_1x+B_1y+C_1=0$ i $A_2x+B_2y+C_2=0$ warunki mają postać z samych współczynników, bez przechodzenia do postaci kierunkowej.",
          tex: "\\parallel:\\ A_1B_2=A_2B_1\\qquad\\perp:\\ A_1A_2+B_1B_2=0",
          litery: "Pierwszy warunek dla prostych równoległych, drugi dla prostopadłych.",
          przyklad: "Proste $2x-y+1=0$ i $4x-2y+7=0$: $2\\cdot(-2)=4\\cdot(-1)$, więc są równoległe. Proste $2x+3y=0$ i $3x-2y+5=0$: $2\\cdot3+3\\cdot(-2)=0$, więc prostopadłe.",
        },
        {
          nazwa: "Przecięcie z osiami",
          slownie: "Z osią $OX$ prosta przecina się tam, gdzie $y=0$, a z osią $OY$ tam, gdzie $x=0$. Podstaw to do równania.",
          tex: "y=0:\\ x=-\\frac{C}{A}\\qquad x=0:\\ y=-\\frac{C}{B}",
          przyklad: "Prosta $3x+2y-12=0$: dla $y=0$ mamy $x=4$, dla $x=0$ mamy $y=6$. Punkty $(4, 0)$ i $(0, 6)$.",
          uwaga: "Wzory mają sens tylko dla $A\\neq0$ i $B\\neq0$. Gdy jedno z nich jest zerem, prosta jest równoległa do jednej z osi.",
        },
      ],
      jak: [
        "Do postaci kierunkowej: przenieś $Ax$ i $C$ na prawą stronę i podziel przez współczynnik przy $y$.",
        "Do postaci ogólnej: przenieś wszystkie wyrazy na jedną stronę. Ułamki usuń, mnożąc przez mianownik.",
        "Punkty przecięcia z osiami: podstaw $y=0$ (oś $OX$) albo $x=0$ (oś $OY$).",
        "Zadania z parametrem $m$: zapisz warunek równoległości lub prostopadłości i rozwiąż otrzymane równanie.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Prosta o równaniu $4x - 2y + 6 = 0$ ma w postaci kierunkowej równanie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$y = -2x + 3$", "$y = 2x - 3$", "$y = 2x + 3$", "$y = -2x - 3$"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "Prosta $2x + 5y - 10 = 0$ przecina oś $OX$ i oś $OY$ odpowiednio w punktach: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(2, 0)$ i $(0, 5)$", "$(5, 0)$ i $(0, 2)$", "$(-5, 0)$ i $(0, -2)$", "$(10, 0)$ i $(0, 10)$"],
          poprawna: 1,
        },
        {
          nr: "17",
          tresc: "Prostą o równaniu $y = -\\frac{3}{4}x + 2$ opisuje również równanie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$3x - 4y + 8 = 0$", "$4x + 3y - 8 = 0$", "$3x + 4y + 2 = 0$", "$3x + 4y - 8 = 0$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "Dana jest prosta $k$ o równaniu $3x - y + 2 = 0$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Prosta $k$ jest równoległa do prostej $6x - 2y - 5 = 0$.", litery: "PF", poprawna: 0 },
            { tekst: "Prosta $k$ przechodzi przez punkt $(0, -2)$.", litery: "PF", poprawna: 1 },
            { tekst: "Prosta $k$ jest prostopadła do prostej $x + 3y - 1 = 0$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "19",
          tresc: "Proste $mx + 2y - 1 = 0$ oraz $3x - y + 4 = 0$ są prostopadłe. Liczba $m$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{2}{3}$", "$-6$", "$\\frac{3}{2}$", "$6$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Prosta ma równanie $6x - 4y + 12 = 0$. Zapisz je w postaci kierunkowej i wyznacz punkty przecięcia prostej z osiami układu. **Zapisz obliczenia.**",
          rozwiazanie: "Wyznaczamy $y$: $-4y = -6x - 12$, więc $y = \\frac{3}{2}x + 3$.\n\nOś $OY$: dla $x = 0$ mamy $y = 3$, czyli punkt $(0, 3)$.\n\nOś $OX$: dla $y = 0$ mamy $6x + 12 = 0$, czyli $x = -2$ i punkt $(-2, 0)$.\n\nOdpowiedź: $y = \\frac{3}{2}x + 3$, punkty przecięcia z osiami: $(0, 3)$ i $(-2, 0)$.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Wyznacz równanie ogólne prostej prostopadłej do prostej $2x - 3y + 6 = 0$ i przechodzącej przez punkt $P = (4, 1)$. **Zapisz obliczenia.**",
          rozwiazanie: "Zapisujemy daną prostą w postaci kierunkowej: $-3y = -2x - 6$, więc $y = \\frac{2}{3}x + 2$ i $a_1 = \\frac{2}{3}$.\n\nProsta prostopadła ma $a_2 = -\\frac{1}{a_1} = -\\frac{3}{2}$.\n\nPodstawiamy punkt $P$ do $y = -\\frac{3}{2}x + b$: $1 = -\\frac{3}{2}\\cdot 4 + b = -6 + b$, więc $b = 7$.\n\nMamy $y = -\\frac{3}{2}x + 7$. Mnożymy przez $2$: $2y = -3x + 14$, czyli $3x + 2y - 14 = 0$.\n\nOdpowiedź: $3x + 2y - 14 = 0$.",
        },
      ],
      generatory: [
        {
          id: "ogolna-kierunkowa",
          nazwa: "Z ogólnej na kierunkową",
          opis: "Zamień równanie ogólne prostej na kierunkowe: podaj a i b.",
          generuj(r) {
            for (;;) {
              const B = bezZera(r, -6, 6);
              if (Math.abs(B) < 2) continue;
              const A = bezZera(r, -7, 7), C = r.int(-9, 9);
              if (gcd(gcd(A, B), C) !== 1) continue;
              const a = q(-A, B), b = q(-C, B);
              return {
                tresc: `Prosta ma równanie $${suma([[A, "x"], [B, "y"], [C, ""]])} = 0$. Zapisz je w postaci kierunkowej $y = ax + b$.`,
                pola: [{ id: "a", typ: "liczba", etykieta: "$a =$" }, { id: "b", typ: "liczba", etykieta: "$b =$" }],
                odpowiedz: { a, b },
                wynik: `$y = ${suma([[a, "x"], [b, ""]])}$`,
                rozwiazanie: [
                  `Przenosimy $x$ i wyraz wolny na prawą stronę: $${suma([[B, "y"]])} = ${suma([[-A, "x"], [-C, ""]])}$.`,
                  `Dzielimy obie strony przez $${B}$: $y = ${suma([[a, "x"], [b, ""]])}$.`,
                  `Stąd $a = ${a.tex()}$ i $b = ${b.tex()}$.`,
                ],
              };
            }
          },
        },
        {
          id: "ogolna-parametr",
          nazwa: "Proste z parametrem m",
          opis: "Dla jakiego m dwie proste dane równaniami ogólnymi są równoległe albo prostopadłe?",
          generuj(r) {
            for (;;) {
              const rownolegle = r.chance();
              const A2 = bezZera(r, -4, 4), B2 = bezZera(r, -4, 4), B1 = bezZera(r, -4, 4);
              const C1 = r.int(-6, 6), C2 = r.int(-6, 6);
              const m = rownolegle ? q(A2 * B1, B2) : q(-B1 * B2, A2);
              if (m.zero) continue;
              if (rownolegle && B2 * C1 === B1 * C2) continue;   // proste nie mogą się pokrywać
              const reszta = suma([[B1, "y"], [C1, ""]]);
              const k = `m x ${reszta.startsWith("-") ? "- " + reszta.slice(1) : "+ " + reszta} = 0`.replace("m x", "mx");
              const l = `${suma([[A2, "x"], [B2, "y"], [C2, ""]])} = 0`;
              const krok = rownolegle
                ? [
                    "Proste są równoległe, gdy $A_1B_2 = A_2B_1$.",
                    `Podstawiamy: $m\\cdot ${nw(B2)} = ${nw(A2)}\\cdot ${nw(B1)}$.`,
                  ]
                : [
                    "Proste są prostopadłe, gdy $A_1A_2 + B_1B_2 = 0$.",
                    `Podstawiamy: $m\\cdot ${nw(A2)} + ${nw(B1)}\\cdot ${nw(B2)} = 0$.`,
                  ];
              return {
                tresc: `Dla jakiej wartości $m$ proste $${k}$ oraz $${l}$ są ${rownolegle ? "równoległe" : "prostopadłe"}?`,
                pola: [{ id: "m", typ: "liczba", etykieta: "$m =$" }],
                odpowiedz: { m },
                wynik: `$m = ${m.tex()}$`,
                rozwiazanie: [...krok, `Stąd $m = ${m.tex()}$.`],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 6.4
    {
      id: "okrag",
      nazwa: "Równanie okręgu",
      sciaga: [
        {
          nazwa: "Równanie okręgu",
          slownie: "Okrąg to wszystkie punkty płaszczyzny oddalone o $r$ od środka $S$. Zapis odległości przez współrzędne daje równanie okręgu.",
          tex: "(x-a)^2+(y-b)^2=r^2\\qquad S=(a, b)\\qquad r>0",
          litery: "$S=(a, b)$ – środek okręgu, $r$ – promień.",
          przyklad: "Okrąg o środku $(2, -3)$ i promieniu $4$: $(x-2)^2+(y+3)^2=16$.",
          uwaga: "Znaki w nawiasach są przeciwne do współrzędnych środka, a po prawej stronie stoi $r^2$, nie $r$. Dla środka $(0, 0)$ równanie to $x^2+y^2=r^2$.",
        },
        {
          nazwa: "Środek i promień z danych",
          slownie: "Gdy okrąg przechodzi przez punkt $P$, promień to odległość $|SP|$. Gdy odcinek $AB$ jest średnicą, środek okręgu to środek odcinka, a promień to połowa jego długości.",
          tex: "r=|SP|\\qquad S=\\frac{A+B}{2}\\qquad r=\\frac{|AB|}{2}",
          przyklad: "Dla $S=(1, 2)$ i $P=(4, 6)$: $r^2=3^2+4^2=25$, więc $(x-1)^2+(y-2)^2=25$.",
          uwaga: "W równaniu potrzebne jest $r^2$, więc często nie musisz liczyć pierwiastka.",
        },
        {
          nazwa: "Położenie punktu względem okręgu",
          slownie: "Oblicz kwadrat odległości punktu $P$ od środka i porównaj go z $r^2$. Mniejszy – punkt leży wewnątrz okręgu, równy – na okręgu, większy – na zewnątrz.",
          tex: "d^2=(x_P-a)^2+(y_P-b)^2\\qquad d^2<r^2\\qquad d^2=r^2\\qquad d^2>r^2",
          litery: "$d$ – odległość punktu $P$ od środka $S=(a, b)$. Kolejne warunki: wewnątrz, na okręgu, na zewnątrz.",
          przyklad: "Dla okręgu $(x-1)^2+(y+2)^2=25$ i punktu $P=(4, 2)$: $d^2=3^2+4^2=25=r^2$, więc $P$ leży na okręgu.",
          uwaga: "Porównuj $d^2$ z $r^2$ albo $d$ z $r$ – nie mieszaj ich.",
        },
        {
          nazwa: "Postać ogólna równania",
          slownie: "Równanie $x^2+y^2-2ax-2by+c=0$ opisuje okrąg, gdy $r^2=a^2+b^2-c>0$. Środek odczytaj ze współczynników przy $x$ i $y$ albo zwiń wyrażenia do kwadratów.",
          tex: "x^2+y^2-2ax-2by+c=0\\qquad r^2=a^2+b^2-c",
          litery: "$S=(a, b)$ – środek, $c$ – wyraz wolny. Warunek $r^2>0$ jest konieczny.",
          przyklad: "Z $x^2+y^2-6x+4y-3=0$: $-2a=-6$, $-2b=4$, więc $S=(3, -2)$, a $r^2=9+4+3=16$ i $r=4$.",
          uwaga: "Gdy wyjdzie $r^2\\leq0$, to równanie nie opisuje okręgu.",
        },
      ],
      jak: [
        "Z postaci kanonicznej odczytaj środek (znaki przeciwne niż w nawiasach) i promień jako pierwiastek z prawej strony.",
        "Gdy znasz środek i punkt okręgu, oblicz $r^2$ jako kwadrat odległości tych punktów. Dla średnicy najpierw wyznacz środek odcinka.",
        "Z postaci ogólnej wyznacz $a$, $b$ ze współczynników przy $x$ i $y$, a potem $r^2=a^2+b^2-c$.",
        "Położenie punktu: policz $d^2$ i porównaj z $r^2$.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Okrąg ma środek w punkcie $S = (-3, 2)$ i promień $5$. Jego równanie to: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(x - 3)^2 + (y + 2)^2 = 25$", "$(x + 3)^2 + (y - 2)^2 = 5$", "$(x + 3)^2 + (y - 2)^2 = 25$", "$(x + 3)^2 + (y + 2)^2 = 25$"],
          poprawna: 2,
        },
        {
          nr: "23",
          tresc: "Okrąg ma równanie $(x - 4)^2 + (y + 1)^2 = 36$. Środek i promień tego okręgu to: **Wybierz właściwą odpowiedź.**",
          opcje: ["$S = (4, -1)$, $r = 6$", "$S = (-4, 1)$, $r = 6$", "$S = (4, -1)$, $r = 36$", "$S = (-4, 1)$, $r = 36$"],
          poprawna: 0,
        },
        {
          nr: "24",
          tresc: "Odcinek $AB$, gdzie $A = (-1, 2)$ i $B = (5, 10)$, jest średnicą okręgu. Równanie tego okręgu to: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(x - 2)^2 + (y - 6)^2 = 100$", "$(x - 2)^2 + (y - 6)^2 = 25$", "$(x - 4)^2 + (y - 12)^2 = 25$", "$(x + 2)^2 + (y + 6)^2 = 25$"],
          poprawna: 1,
        },
        {
          nr: "25",
          tresc: "Dany jest okrąg o równaniu $x^2 + y^2 - 4x + 6y - 12 = 0$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Środek tego okręgu ma współrzędne $(2, -3)$.", litery: "PF", poprawna: 0 },
            { tekst: "Promień tego okręgu jest równy $25$.", litery: "PF", poprawna: 1 },
            { tekst: "Punkt $(5, 1)$ leży na tym okręgu.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "26",
          tresc: "Dany jest okrąg o równaniu $(x - 1)^2 + (y - 1)^2 = 16$ i punkt $P = (5, -2)$. Punkt $P$. **Wybierz właściwą odpowiedź.**",
          opcje: ["leży wewnątrz okręgu", "leży na okręgu", "jest środkiem okręgu", "leży na zewnątrz okręgu"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 3,
          tresc: "Wykaż, że równanie $x^2 + y^2 - 8x + 2y + 8 = 0$ opisuje okrąg, i podaj jego środek oraz promień. **Zapisz obliczenia.**",
          rozwiazanie: "Porównujemy z $x^2 + y^2 - 2ax - 2by + c = 0$: $-2a = -8$, więc $a = 4$; $-2b = 2$, więc $b = -1$; $c = 8$.\n\nObliczamy $r^2 = a^2 + b^2 - c = 16 + 1 - 8 = 9$.\n\nPonieważ $r^2 > 0$, równanie opisuje okrąg o promieniu $r = 3$.\n\nOdpowiedź: środek $S = (4, -1)$, promień $r = 3$.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "Okrąg ma środek w punkcie $S = (-1, 3)$ i przechodzi przez punkt $P = (2, 7)$. Napisz równanie tego okręgu i sprawdź, czy punkt $Q = (-4, 7)$ leży na tym okręgu. **Zapisz obliczenia.**",
          rozwiazanie: "Kwadrat promienia to kwadrat odległości $|SP|$: $r^2 = (2 - (-1))^2 + (7 - 3)^2 = 9 + 16 = 25$.\n\nRównanie okręgu: $(x + 1)^2 + (y - 3)^2 = 25$.\n\nDla punktu $Q$: $d^2 = (-4 + 1)^2 + (7 - 3)^2 = 9 + 16 = 25 = r^2$.\n\nOdpowiedź: $(x + 1)^2 + (y - 3)^2 = 25$, punkt $Q$ leży na tym okręgu.",
        },
      ],
      generatory: [
        {
          id: "okrag-odczyt",
          nazwa: "Środek i promień",
          opis: "Odczytaj środek i promień okręgu z równania kanonicznego albo ogólnego.",
          generuj(r) {
            let a, b;
            do {
              a = r.int(-6, 6);
              b = r.int(-6, 6);
            } while (a === 0 && b === 0);
            const rr = r.int(2, 9), r2 = rr * rr;
            const pola = [
              { id: "a", typ: "liczba", etykieta: "$a =$" },
              { id: "b", typ: "liczba", etykieta: "$b =$" },
              { id: "r", typ: "liczba", etykieta: "$r =$" },
            ];
            const odpowiedz = { a: q(a), b: q(b), r: q(rr) };
            const wynik = `$S = ${pkt(a, b)}$, $r = ${rr}$`;
            if (r.chance()) {
              return {
                tresc: `Okrąg ma równanie $${okrag(a, b, r2)}$. Podaj współrzędne środka $S = (a, b)$ i promień $r$.`,
                pola,
                odpowiedz,
                wynik,
                rozwiazanie: [
                  "Porównujemy z $(x - a)^2 + (y - b)^2 = r^2$. Znak w nawiasie jest przeciwny do współrzędnej środka.",
                  `Stąd $a = ${a}$ i $b = ${b}$, a $r^2 = ${r2}$.`,
                  `Promień: $r = \\sqrt{${r2}} = ${rr}$.`,
                ],
              };
            }
            const c = a * a + b * b - r2;
            return {
              tresc: `Równanie $${suma([[1, "x^2"], [1, "y^2"], [-2 * a, "x"], [-2 * b, "y"], [c, ""]])} = 0$ opisuje okrąg. Podaj współrzędne środka $S = (a, b)$ i promień $r$.`,
              pola,
              odpowiedz,
              wynik,
              rozwiazanie: [
                `Porównujemy z $x^2 + y^2 - 2ax - 2by + c = 0$: $-2a = ${-2 * a}$, więc $a = ${a}$, oraz $-2b = ${-2 * b}$, więc $b = ${b}$.`,
                `Wyraz wolny: $c = ${c}$, zatem $r^2 = a^2 + b^2 - c = ${a * a} + ${b * b} - ${nw(c)} = ${r2}$.`,
                `Promień: $r = \\sqrt{${r2}} = ${rr}$.`,
              ],
            };
          },
        },
        {
          id: "okrag-z-danych",
          nazwa: "Równanie okręgu z danych",
          opis: "Wybierz równanie okręgu o danym środku i punkcie na okręgu albo o danej średnicy.",
          generuj(r) {
            for (;;) {
              const srednica = r.chance();
              let a, b, r2, tresc, kroki;
              let zleR2;
              if (!srednica) {
                a = r.int(-5, 5); b = r.int(-5, 5);
                const dx = r.int(-6, 6), dy = r.int(-6, 6);
                if (dx === 0 && dy === 0) continue;
                const xp = a + dx, yp = b + dy;
                r2 = dx * dx + dy * dy;
                zleR2 = (Math.abs(dx) + Math.abs(dy)) ** 2 === r2 ? -1 : Math.abs(dx) + Math.abs(dy);
                tresc = `Okrąg ma środek w punkcie $S = ${pkt(a, b)}$ i przechodzi przez punkt $P = ${pkt(xp, yp)}$. Które równanie opisuje ten okrąg?`;
                kroki = [
                  `Promień to odległość środka od punktu $P$: $r^2 = |SP|^2 = (${xp} - ${nw(a)})^2 + (${yp} - ${nw(b)})^2 = ${dx * dx} + ${dy * dy} = ${r2}$.`,
                ];
              } else {
                const xa = r.int(-8, 8), ya = r.int(-8, 8);
                const u = r.int(-4, 4), v = r.int(-4, 4);
                if (u === 0 && v === 0) continue;
                const xb = xa + 2 * u, yb = ya + 2 * v;
                a = xa + u; b = ya + v;
                r2 = u * u + v * v;
                zleR2 = 4 * r2;
                tresc = `Odcinek $AB$, gdzie $A = ${pkt(xa, ya)}$ i $B = ${pkt(xb, yb)}$, jest średnicą okręgu. Które równanie opisuje ten okrąg?`;
                kroki = [
                  `Środek okręgu to środek odcinka $AB$: $S = \\left(\\frac{${xa} + ${nw(xb)}}{2}, \\frac{${ya} + ${nw(yb)}}{2}\\right) = ${pkt(a, b)}$.`,
                  `Kwadrat promienia: $r^2 = |SA|^2 = (${xa} - ${nw(a)})^2 + (${ya} - ${nw(b)})^2 = ${u * u} + ${v * v} = ${r2}$.`,
                ];
              }
              if (a === 0 && b === 0) continue;
              if (zleR2 < 0 || zleR2 === r2) continue;
              const dobra = okrag(a, b, r2);
              const opcje = [dobra, okrag(-a, -b, r2), okrag(a, b, zleR2), okrag(b, a, r2)];
              if (new Set(opcje).size !== 4) continue;
              const tasowane = r.shuffle(opcje);
              return {
                tresc,
                pola: [{ id: "w", typ: "wybor", etykieta: "Równanie okręgu", opcje: tasowane.map((o) => `$${o}$`) }],
                odpowiedz: { w: tasowane.indexOf(dobra) },
                wynik: `$${dobra}$`,
                rozwiazanie: [
                  ...kroki,
                  `Równanie okręgu: $(x - a)^2 + (y - b)^2 = r^2$, czyli $${dobra}$.`,
                ],
              };
            }
          },
        },
      ],
    },
  ],
};
