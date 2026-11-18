// Klasa 3 (liceum i technikum) · rozdział 6 „Geometria analityczna” – Matematyka 3, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Zgodnie z podstawą z 2024 r.: bez odległości punktu od prostej, bez pola trójkąta i wielokąta ze współrzędnych,
// bez punktów wspólnych prostej i okręgu z układu równań. Położenie prostej poziomej/pionowej i okręgu ocenia się
// przez porównanie odległości środka od prostej z promieniem. Przekształcenia: symetrie względem osi i początku układu
// oraz przesunięcie o wektor. Rozszerza i powtarza rozdział „Geometria analityczna” z klasy 2.
import { Q, q, texNawias } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

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

/** Para liczb w nawiasie: (3, -2) albo (1{,}5; -2), gdy któraś liczba ma przecinek. */
const para = (x, y, o, z) => `${o}${dz(x)}${Q.z(x).calkowita && Q.z(y).calkowita ? ", " : "; "}${dz(y)}${z}`;

/** Punkt w LaTeX. */
const pkt = (x, y) => para(x, y, "(", ")");

/** Współrzędne wektora w LaTeX: [3, -2]. */
const wek = (x, y) => para(x, y, "[", "]");

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

/** Równanie prostej y = ax + b. */
const prosta = (a, b) => `y = ${suma([[a, "x"], [b, ""]])}`;

/** Początek odcinka tak, by koniec (początek + d) mieścił się w [-9, 9]. */
const pocz = (r, d) => r.int(Math.max(-9, -9 - d), Math.min(9, 9 - d));

/** Nazwy końców odcinka. */
const NAZWY = [["A", "B"], ["K", "L"], ["M", "N"], ["C", "D"]];

/** Współrzędne wektora \vec{AB} w LaTeX: wAB("A", "B") = "\vec{AB}". */
const vAB = (A, B) => `\\vec{${A}${B}}`;

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 6.1 (wektory)
    {
      id: "wektory",
      nazwa: "Wektor w układzie współrzędnych",
      sciaga: [
        {
          nazwa: "Współrzędne wektora",
          slownie: "Wektor $\\vec{AB}$ zaczyna się w punkcie $A$ i kończy w punkcie $B$. Jego współrzędne to różnice współrzędnych: od końca odejmujemy początek.",
          tex: "\\vec{AB}=[x_B-x_A,\\ y_B-y_A]",
          litery: "$A=(x_A, y_A)$ – początek, $B=(x_B, y_B)$ – koniec wektora.",
          przyklad: "Dla $A=(1, 2)$ i $B=(4, -1)$: $\\vec{AB}=[4-1,\\ -1-2]=[3, -3]$.",
          uwaga: "Wektor zapisujemy w nawiasie kwadratowym, a punkt w okrągłym. Wektor $\\vec{BA}$ ma współrzędne przeciwne: $\\vec{BA}=[-3, 3]$.",
        },
        {
          nazwa: "Długość wektora",
          slownie: "Długość wektora to długość odcinka, który go przedstawia. Liczymy ją z twierdzenia Pitagorasa dla współrzędnych wektora.",
          tex: "|\\vec{AB}|=|AB|=\\sqrt{x^2+y^2}\\qquad\\vec{AB}=[x, y]",
          litery: "$[x, y]$ – współrzędne wektora $\\vec{AB}$.",
          przyklad: "Dla $\\vec{u}=[3, -4]$: $|\\vec{u}|=\\sqrt{3^2+(-4)^2}=\\sqrt{25}=5$.",
          uwaga: "Długość nie zależy od znaków współrzędnych, bo są podnoszone do kwadratu. Nie zapomnij o pierwiastku.",
        },
        {
          nazwa: "Równość i działania na wektorach",
          slownie: "Wektory są równe, gdy mają równe współrzędne. Wektory dodajemy, odejmujemy i mnożymy przez liczbę osobno po każdej współrzędnej.",
          tex: "\\vec{u}\\pm\\vec{v}=[a\\pm c,\\ b\\pm d]\\qquad k\\vec{u}=[ka,\\ kb]",
          litery: "$\\vec{u}=[a, b]$, $\\vec{v}=[c, d]$ – wektory, $k$ – liczba. Wektory $\\vec{u}$ i $\\vec{v}$ są równe, gdy $a=c$ i $b=d$.",
          przyklad: "Dla $\\vec{u}=[2, -3]$ i $\\vec{v}=[-1, 4]$: $\\vec{u}+\\vec{v}=[1, 1]$, $3\\vec{u}=[6, -9]$, $2\\vec{u}-\\vec{v}=[4+1,\\ -6-4]=[5, -10]$.",
          uwaga: "Mnożenie przez liczbę ujemną zmienia zwrot wektora: $-\\vec{u}=[-2, 3]$. Przy odejmowaniu uważaj na znaki: $-\\vec{v}=[1, -4]$.",
        },
        {
          nazwa: "Koniec wektora",
          slownie: "Gdy znasz początek $A$ i wektor $\\vec{AB}=[p, q]$, współrzędne końca $B$ dostajesz, dodając współrzędne wektora do współrzędnych punktu $A$.",
          tex: "x_B=x_A+p\\qquad y_B=y_A+q",
          litery: "$A=(x_A, y_A)$ – początek, $[p, q]$ – współrzędne wektora $\\vec{AB}$, $B=(x_B, y_B)$ – szukany koniec.",
          przyklad: "Dla $A=(2, -1)$ i $\\vec{AB}=[3, 5]$: $B=(2+3,\\ -1+5)=(5, 4)$.",
          uwaga: "Gdy znasz koniec $B$, a szukasz początku $A$, współrzędne wektora odejmujemy: $x_A=x_B-p$ i $y_A=y_B-q$.",
        },
        {
          nazwa: "Wektory a równoległobok",
          slownie: "Czworokąt $ABCD$ jest równoległobokiem, gdy $\\vec{AB}=\\vec{DC}$. Z tej równości wyznaczysz brakujący wierzchołek.",
          tex: "\\vec{AB}=\\vec{DC}\\qquad\\vec{AD}=\\vec{BC}",
          litery: "Wierzchołki $A$, $B$, $C$, $D$ idą kolejno wzdłuż obwodu czworokąta.",
          przyklad: "Dla $A=(0, 0)$, $B=(4, 1)$, $C=(5, 4)$: $\\vec{AD}=\\vec{BC}=[1, 3]$, więc $D=(1, 3)$. Sprawdzenie: $\\vec{DC}=[4, 1]=\\vec{AB}$.",
          uwaga: "Porównuj $\\vec{AB}$ z $\\vec{DC}$ (zgodnie z kolejnością wierzchołków), a nie z $\\vec{CD}$ – to wektor przeciwny.",
        },
      ],
      jak: [
        "Współrzędne wektora $\\vec{AB}$: od współrzędnych końca $B$ odejmij współrzędne początku $A$ (osobno $x$ i $y$).",
        "Długość wektora $[x, y]$: oblicz $\\sqrt{x^2+y^2}$.",
        "Działania na wektorach wykonuj osobno na pierwszej i na drugiej współrzędnej. Przy odejmowaniu pilnuj znaków.",
        "Brakujący wierzchołek równoległoboku $ABCD$: zapisz $\\vec{AB}=\\vec{DC}$ albo $\\vec{AD}=\\vec{BC}$ i porównaj współrzędne.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Dane są punkty $A = (-2, 3)$ i $B = (4, -1)$. Wektor $\\vec{AB}$ ma współrzędne: **Wybierz właściwą odpowiedź.**",
          opcje: ["$[6, -4]$", "$[-6, 4]$", "$[2, 2]$", "$[6, 4]$"],
          poprawna: 0,
        },
        {
          nr: "2",
          tresc: "Wektor $\\vec{u} = [5, -12]$ ma długość równą: **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$17$", "$13$", "$169$"],
          poprawna: 2,
        },
        {
          nr: "3",
          tresc: "Dane są wektory $\\vec{u} = [2, -3]$ i $\\vec{v} = [-1, 4]$. Wektor $2\\vec{u} - \\vec{v}$ ma współrzędne: **Wybierz właściwą odpowiedź.**",
          opcje: ["$[3, -2]$", "$[5, -2]$", "$[3, -10]$", "$[5, -10]$"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "Dane są punkty $A = (1, 2)$, $B = (4, 6)$, $C = (2, -1)$ i $D = (5, 3)$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wektory $\\vec{AB}$ i $\\vec{CD}$ są równe.", litery: "PF", poprawna: 0 },
            { tekst: "Wektor $\\vec{BA}$ ma współrzędne $[3, 4]$.", litery: "PF", poprawna: 1 },
            { tekst: "Długość wektora $\\vec{AB}$ jest równa $7$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "5",
          tresc: "Dany jest punkt $A = (1, 4)$ i wektor $\\vec{AB} = [3, -2]$. Punkt $B$ ma współrzędne: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-2, 6)$", "$(4, 2)$", "$(3, -8)$", "$(4, 6)$"],
          poprawna: 1,
        },
        {
          nr: "6",
          tresc: "Punkty $A = (-1, 0)$, $B = (3, 1)$ i $C = (4, 4)$ są kolejnymi wierzchołkami równoległoboku $ABCD$. Wierzchołek $D$ ma współrzędne: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(0, 3)$", "$(8, 5)$", "$(1, 3)$", "$(-2, -3)$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "7",
          punkty: 2,
          tresc: "Dane są wektory $\\vec{u} = [4, 1]$ i $\\vec{v} = [3, -10]$. Wyznacz współrzędne wektora $\\vec{w} = 2\\vec{u} - \\vec{v}$ i oblicz jego długość. **Zapisz obliczenia.**",
          rozwiazanie: "Mnożymy wektor $\\vec{u}$ przez $2$: $2\\vec{u} = [8, 2]$.\n\nOdejmujemy wektor $\\vec{v}$: $\\vec{w} = [8 - 3,\\ 2 - (-10)] = [5, 12]$.\n\nDługość: $|\\vec{w}| = \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$.\n\nOdpowiedź: $\\vec{w} = [5, 12]$, $|\\vec{w}| = 13$.",
        },
        {
          nr: "8",
          punkty: 3,
          tresc: "Punkty $A = (-1, -2)$, $B = (2, 2)$ i $C = (8, 2)$ są kolejnymi wierzchołkami równoległoboku $ABCD$. Wyznacz współrzędne wierzchołka $D$ i oblicz obwód tego równoległoboku. **Zapisz obliczenia.**",
          rozwiazanie: "W równoległoboku $\\vec{AD} = \\vec{BC}$. Obliczamy $\\vec{BC} = [8 - 2,\\ 2 - 2] = [6, 0]$.\n\nStąd $D = (-1 + 6,\\ -2 + 0) = (5, -2)$.\n\nDługości boków: $\\vec{AB} = [3, 4]$, więc $|AB| = \\sqrt{9 + 16} = 5$, oraz $|BC| = |[6, 0]| = 6$.\n\nObwód: $2\\cdot(5 + 6) = 22$.\n\nOdpowiedź: $D = (5, -2)$, obwód jest równy $22$.",
        },
      ],
      generatory: [
        {
          id: "wektor-ab",
          nazwa: "Współrzędne i długość wektora",
          opis: "Oblicz współrzędne wektora o danych końcach, koniec wektora albo długość wektora.",
          generuj(r) {
            const [A, B] = r.pick(NAZWY);
            const tryb = r.pick(["wsp", "wsp", "koniec", "dlugosc"]);
            if (tryb === "dlugosc") {
              const [p, s] = r.pick([[3, 4], [4, 3], [6, 8], [8, 6], [5, 12], [12, 5], [0, 5], [7, 0], [9, 12], [8, 15]]);
              const dx = p * r.znak(), dy = s * r.znak();
              const d = Math.sqrt(dx * dx + dy * dy);
              return {
                tresc: `Wektor $${vAB(A, B)} = ${wek(dx, dy)}$. Oblicz długość tego wektora.`,
                pola: [{ id: "d", typ: "liczba", etykieta: `$|${vAB(A, B)}| =$` }],
                odpowiedz: { d: q(d) },
                wynik: `$|${vAB(A, B)}| = ${d}$`,
                rozwiazanie: [
                  `Długość wektora $[x, y]$ to $\\sqrt{x^2 + y^2}$.`,
                  `$|${vAB(A, B)}| = \\sqrt{${nw(dx)}^2 + ${nw(dy)}^2} = \\sqrt{${dx * dx} + ${dy * dy}} = \\sqrt{${dx * dx + dy * dy}} = ${d}$.`,
                ],
              };
            }
            let dx, dy;
            do {
              dx = r.int(-9, 9);
              dy = r.int(-9, 9);
            } while (dx === 0 && dy === 0);
            const xa = pocz(r, dx), ya = pocz(r, dy), xb = xa + dx, yb = ya + dy;
            if (tryb === "wsp") {
              return {
                tresc: `Dane są punkty $${A} = ${pkt(xa, ya)}$ i $${B} = ${pkt(xb, yb)}$. Podaj współrzędne wektora $${vAB(A, B)} = [x, y]$.`,
                pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }, { id: "y", typ: "liczba", etykieta: "$y =$" }],
                odpowiedz: { x: q(dx), y: q(dy) },
                wynik: `$${vAB(A, B)} = ${wek(dx, dy)}$`,
                rozwiazanie: [
                  `Od współrzędnych końca odejmujemy współrzędne początku: $${vAB(A, B)} = [x_${B} - x_${A},\\ y_${B} - y_${A}]$.`,
                  `$x = ${xb} - ${nw(xa)} = ${dx}$ oraz $y = ${yb} - ${nw(ya)} = ${dy}$.`,
                  `Wektor: $${vAB(A, B)} = ${wek(dx, dy)}$.`,
                ],
              };
            }
            return {
              tresc: `Dany jest punkt $${A} = ${pkt(xa, ya)}$ i wektor $${vAB(A, B)} = ${wek(dx, dy)}$. Oblicz współrzędne punktu $${B}$.`,
              pola: [{ id: "x", typ: "liczba", etykieta: `$x_${B} =$` }, { id: "y", typ: "liczba", etykieta: `$y_${B} =$` }],
              odpowiedz: { x: q(xb), y: q(yb) },
              wynik: `$${B} = ${pkt(xb, yb)}$`,
              rozwiazanie: [
                `Współrzędne wektora dodajemy do współrzędnych początku: $x_${B} = x_${A} + ${nw(dx)}$, $y_${B} = y_${A} + ${nw(dy)}$.`,
                `$x_${B} = ${xa} + ${nw(dx)} = ${xb}$ oraz $y_${B} = ${ya} + ${nw(dy)} = ${yb}$.`,
                `Punkt: $${B} = ${pkt(xb, yb)}$.`,
              ],
            };
          },
        },
        {
          id: "wektor-dzialania",
          nazwa: "Działania na wektorach",
          opis: "Oblicz współrzędne wektora k·u + l·v dla danych wektorów u i v.",
          generuj(r) {
            const [a, b, c, d] = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)];
            const k = r.intBez(-3, 3, 0), l = r.intBez(-3, 3, 0);
            const wx = k * a + l * c, wy = k * b + l * d;
            return {
              tresc: `Dane są wektory $\\vec{u} = ${wek(a, b)}$ i $\\vec{v} = ${wek(c, d)}$. Oblicz współrzędne wektora $\\vec{w} = ${suma([[k, "\\vec{u}"], [l, "\\vec{v}"]])}$.`,
              pola: [{ id: "x", typ: "liczba", etykieta: "$w_x =$" }, { id: "y", typ: "liczba", etykieta: "$w_y =$" }],
              odpowiedz: { x: q(wx), y: q(wy) },
              wynik: `$\\vec{w} = ${wek(wx, wy)}$`,
              rozwiazanie: [
                `Mnożymy wektory przez liczby: $${suma([[k, "\\vec{u}"]])} = ${wek(k * a, k * b)}$ oraz $${suma([[l, "\\vec{v}"]])} = ${wek(l * c, l * d)}$.`,
                `Dodajemy współrzędne: $w_x = ${nw(k * a)} + ${nw(l * c)} = ${wx}$ oraz $w_y = ${nw(k * b)} + ${nw(l * d)} = ${wy}$.`,
                `Wektor: $\\vec{w} = ${wek(wx, wy)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 6.1 (podział odcinka)
    {
      id: "podzial-odcinka",
      nazwa: "Podział odcinka",
      sciaga: [
        {
          nazwa: "Środek odcinka (powtórka)",
          slownie: "Środek $S$ odcinka $AB$ leży w połowie drogi od $A$ do $B$, czyli $\\vec{AS}=\\frac{1}{2}\\vec{AB}$. Jego współrzędne to średnie współrzędnych końców.",
          tex: "x_S=\\frac{x_A+x_B}{2}\\qquad y_S=\\frac{y_A+y_B}{2}",
          litery: "$A=(x_A, y_A)$, $B=(x_B, y_B)$ – końce odcinka, $S=(x_S, y_S)$ – jego środek.",
          przyklad: "Dla $A=(-2, 3)$ i $B=(6, -1)$: $S=\\left(\\frac{-2+6}{2},\\ \\frac{3+(-1)}{2}\\right)=(2, 1)$.",
          uwaga: "Gdy znasz środek $S$ i koniec $A$, drugi koniec to $B=2S-A$, czyli $x_B=2x_S-x_A$ i $y_B=2y_S-y_A$.",
        },
        {
          nazwa: "Podział odcinka w stosunku",
          slownie: "Punkt $P$ leży na odcinku $AB$ i dzieli go w stosunku $|AP|:|PB|=m:n$. Odcinek $AB$ ma wtedy $m+n$ równych części, a $AP$ to $m$ z nich.",
          tex: "\\vec{AP}=\\frac{m}{m+n}\\vec{AB}\\qquad P=A+\\vec{AP}",
          litery: "$m$, $n$ – liczby dodatnie ze stosunku, $\\frac{m}{m+n}$ – jaką część odcinka $AB$ stanowi odcinek $AP$.",
          przyklad: "Dla $A=(1, 2)$, $B=(7, 8)$ i stosunku $1:2$: $\\vec{AB}=[6, 6]$, $\\vec{AP}=\\frac{1}{3}[6, 6]=[2, 2]$, więc $P=(1+2,\\ 2+2)=(3, 4)$.",
          uwaga: "Kolejność w stosunku ma znaczenie: pierwsza liczba odnosi się do odcinka $AP$ (od punktu $A$). Dla stosunku $2:1$ ten sam odcinek dałby punkt bliższy $B$.",
        },
        {
          nazwa: "Podział na równe części",
          slownie: "Punkty dzielące odcinek $AB$ na $n$ równych części to $A+\\frac{k}{n}\\vec{AB}$ dla $k=1, 2, \\ldots, n-1$.",
          tex: "P_k=A+\\frac{k}{n}\\vec{AB}\\qquad k=1,\\ \\ldots,\\ n-1",
          litery: "$n$ – liczba części, $P_k$ – $k$-ty punkt podziału licząc od $A$.",
          przyklad: "Dla $A=(0, 0)$, $B=(9, 6)$ i $n=3$: $\\frac{1}{3}\\vec{AB}=[3, 2]$, więc $P_1=(3, 2)$ i $P_2=(6, 4)$.",
          uwaga: "Dla $n=2$ dostajesz środek odcinka. Punktów podziału jest o jeden mniej niż części.",
        },
      ],
      jak: [
        "Oblicz współrzędne wektora $\\vec{AB}$.",
        "Dla stosunku $|AP|:|PB|=m:n$ oblicz $\\vec{AP}=\\frac{m}{m+n}\\vec{AB}$ (pomnóż obie współrzędne wektora przez ułamek).",
        "Dodaj współrzędne wektora $\\vec{AP}$ do współrzędnych punktu $A$ – dostajesz punkt $P$.",
        "Sprawdź wynik: punkt $P$ powinien leżeć między $A$ i $B$, bliżej tego końca, który odpowiada mniejszej liczbie ze stosunku.",
      ],
      zadania: [
        {
          nr: "9",
          tresc: "Dane są punkty $A = (-3, 5)$ i $B = (7, -1)$. Środek odcinka $AB$ ma współrzędne: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(4, 4)$", "$(5, -3)$", "$(2, 2)$", "$(10, -6)$"],
          poprawna: 2,
        },
        {
          nr: "10",
          tresc: "Punkt $P$ leży na odcinku $AB$, gdzie $A = (1, -2)$ i $B = (10, 4)$, oraz $|AP| : |PB| = 1 : 2$. Punkt $P$ ma współrzędne: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(7, 2)$", "$(4, 0)$", "$(3, 2)$", "$(5{,}5; 1)$"],
          poprawna: 1,
        },
        {
          nr: "11",
          tresc: "Punkt $S = (1, -1)$ jest środkiem odcinka $AB$, gdzie $A = (-2, 6)$. Punkt $B$ ma współrzędne: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(4, -8)$", "$(-5, 13)$", "$(0{,}5; 2{,}5)$", "$(3, -7)$"],
          poprawna: 0,
        },
        {
          nr: "12",
          tresc: "Dane są punkty $A = (0, 0)$, $B = (12, 6)$, $P = (4, 2)$ i $Q = (8, 4)$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Punkt $P$ jest środkiem odcinka $AB$.", litery: "PF", poprawna: 1 },
            { tekst: "Punkt $Q$ dzieli odcinek $AB$ w stosunku $|AQ| : |QB| = 2 : 1$.", litery: "PF", poprawna: 0 },
            { tekst: "Punkt $Q$ jest środkiem odcinka $PB$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "13",
          tresc: "Punkt $P$ leży na odcinku $AB$, gdzie $A = (2, -1)$ i $B = (10, 7)$, oraz $|AP| : |PB| = 3 : 1$. Punkt $P$ ma współrzędne: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(4, 1)$", "$(6, 3)$", "$(6, 6)$", "$(8, 5)$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "14",
          punkty: 2,
          tresc: "Dane są punkty $A = (-4, 1)$ i $B = (8, 10)$. Punkty $P$ i $Q$ dzielą odcinek $AB$ na trzy odcinki równej długości, przy czym $P$ leży bliżej $A$. Oblicz współrzędne punktów $P$ i $Q$ oraz długość odcinka $AP$. **Zapisz obliczenia.**",
          rozwiazanie: "Obliczamy wektor $\\vec{AB} = [8 - (-4),\\ 10 - 1] = [12, 9]$.\n\nOdcinek podzielono na $3$ równe części: $\\vec{AP} = \\frac{1}{3}\\vec{AB} = [4, 3]$, więc $P = (-4 + 4,\\ 1 + 3) = (0, 4)$.\n\nDla punktu $Q$: $\\vec{AQ} = \\frac{2}{3}\\vec{AB} = [8, 6]$, więc $Q = (-4 + 8,\\ 1 + 6) = (4, 7)$.\n\nDługość: $|AP| = |[4, 3]| = \\sqrt{16 + 9} = 5$.\n\nOdpowiedź: $P = (0, 4)$, $Q = (4, 7)$, $|AP| = 5$.",
        },
        {
          nr: "15",
          punkty: 3,
          tresc: "Punkt $S = (2, 1)$ jest środkiem odcinka $AB$, gdzie $A = (-1, -3)$. Wyznacz współrzędne punktu $B$ i oblicz długość odcinka $AB$. Następnie wyznacz współrzędne punktu $P$ leżącego na odcinku $AB$, takiego że $|AP| : |PB| = 1 : 3$. **Zapisz obliczenia.**",
          rozwiazanie: "Ze wzoru na środek: $x_B = 2\\cdot 2 - (-1) = 5$ oraz $y_B = 2\\cdot 1 - (-3) = 5$, czyli $B = (5, 5)$.\n\nWektor $\\vec{AB} = [5 - (-1),\\ 5 - (-3)] = [6, 8]$, więc $|AB| = \\sqrt{36 + 64} = 10$.\n\nDla stosunku $1:3$ mamy $\\vec{AP} = \\frac{1}{1+3}\\vec{AB} = \\frac{1}{4}[6, 8] = \\left[\\frac{3}{2}, 2\\right]$.\n\nStąd $P = \\left(-1 + \\frac{3}{2},\\ -3 + 2\\right) = \\left(\\frac{1}{2}, -1\\right)$.\n\nOdpowiedź: $B = (5, 5)$, $|AB| = 10$, $P = \\left(\\frac{1}{2}, -1\\right)$.",
        },
      ],
      generatory: [
        {
          id: "podzial-stosunek",
          nazwa: "Podział w stosunku",
          opis: "Oblicz współrzędne punktu dzielącego odcinek w danym stosunku.",
          generuj(r) {
            const [m, n] = r.pick([[1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2], [1, 4], [4, 1], [1, 2], [2, 1]]);
            const s = m + n;
            let tx, ty;
            do {
              tx = r.int(-3, 3);
              ty = r.int(-3, 3);
            } while (tx === 0 && ty === 0);
            const dx = s * tx, dy = s * ty;
            const xa = pocz(r, dx), ya = pocz(r, dy), xb = xa + dx, yb = ya + dy;
            const xp = xa + m * tx, yp = ya + m * ty;
            const [A, B] = r.pick(NAZWY);
            return {
              tresc: `Punkt $P$ leży na odcinku $${A}${B}$, gdzie $${A} = ${pkt(xa, ya)}$ i $${B} = ${pkt(xb, yb)}$, oraz $|${A}P| : |P${B}| = ${m} : ${n}$. Oblicz współrzędne punktu $P$.`,
              pola: [{ id: "x", typ: "liczba", etykieta: "$x_P =$" }, { id: "y", typ: "liczba", etykieta: "$y_P =$" }],
              odpowiedz: { x: q(xp), y: q(yp) },
              wynik: `$P = ${pkt(xp, yp)}$`,
              rozwiazanie: [
                `Wektor $${vAB(A, B)} = [${xb} - ${nw(xa)},\\ ${yb} - ${nw(ya)}] = ${wek(dx, dy)}$.`,
                `Odcinek ma $${m} + ${n} = ${s}$ równych części, a $${A}P$ to $${m}$ z nich: $\\vec{${A}P} = \\frac{${m}}{${s}}${vAB(A, B)} = ${wek(m * tx, m * ty)}$.`,
                `Dodajemy do punktu $${A}$: $P = (${xa} + ${nw(m * tx)},\\ ${ya} + ${nw(m * ty)}) = ${pkt(xp, yp)}$.`,
              ],
            };
          },
        },
        {
          id: "podzial-rowne-czesci",
          nazwa: "Podział na równe części",
          opis: "Oblicz współrzędne jednego z punktów dzielących odcinek na 3 albo 4 równe części.",
          generuj(r) {
            const n = r.pick([3, 4]);
            const k = r.int(1, n - 1);
            let tx, ty;
            do {
              tx = r.int(-3, 3);
              ty = r.int(-3, 3);
            } while (tx === 0 && ty === 0);
            const dx = n * tx, dy = n * ty;
            const xa = pocz(r, dx), ya = pocz(r, dy), xb = xa + dx, yb = ya + dy;
            const xp = xa + k * tx, yp = ya + k * ty;
            const nazwy = ["P", "Q", "R"].slice(0, n - 1);
            const L = nazwy[k - 1];
            const slowa = n === 3 ? "trzy" : "cztery";
            return {
              tresc: `Dane są punkty $A = ${pkt(xa, ya)}$ i $B = ${pkt(xb, yb)}$. Punkty ${nazwy.map((x) => `$${x}$`).join(", ")} dzielą odcinek $AB$ na ${slowa} odcinki równej długości (kolejno od punktu $A$). Oblicz współrzędne punktu $${L}$.`,
              pola: [{ id: "x", typ: "liczba", etykieta: `$x_${L} =$` }, { id: "y", typ: "liczba", etykieta: `$y_${L} =$` }],
              odpowiedz: { x: q(xp), y: q(yp) },
              wynik: `$${L} = ${pkt(xp, yp)}$`,
              rozwiazanie: [
                `Wektor $\\vec{AB} = [${xb} - ${nw(xa)},\\ ${yb} - ${nw(ya)}] = ${wek(dx, dy)}$.`,
                `Jedna część to $\\frac{1}{${n}}\\vec{AB} = ${wek(tx, ty)}$. Punkt $${L}$ jest ${k}. punktem podziału: $\\vec{A${L}} = ${k}\\cdot ${wek(tx, ty)} = ${wek(k * tx, k * ty)}$.`,
                `$${L} = (${xa} + ${nw(k * tx)},\\ ${ya} + ${nw(k * ty)}) = ${pkt(xp, yp)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 6.2
    {
      id: "proste",
      nazwa: "Proste w układzie współrzędnych",
      sciaga: [
        {
          nazwa: "Przypomnienie: równanie prostej",
          slownie: "Prosta niepionowa ma równanie $y=ax+b$. Współczynnik $a$ obliczasz z dwóch punktów, a $b$ z podstawienia współrzędnych jednego z nich.",
          tex: "y=ax+b\\qquad a=\\frac{y_B-y_A}{x_B-x_A}",
          litery: "$A=(x_A, y_A)$, $B=(x_B, y_B)$ – dwa punkty prostej.",
          przyklad: "Dla $A=(1, 2)$ i $B=(3, 8)$: $a=\\frac{8-2}{3-1}=3$. Z $2=3\\cdot 1+b$ mamy $b=-1$, czyli $y=3x-1$.",
          uwaga: "Prosta pionowa $x=c$ nie ma współczynnika kierunkowego, a prosta pozioma $y=c$ ma $a=0$.",
        },
        {
          nazwa: "Proste równoległe",
          slownie: "Dwie proste niepionowe są równoległe, gdy mają ten sam współczynnik kierunkowy. Proste pionowe $x=c_1$ i $x=c_2$ też są równoległe.",
          tex: "a_1=a_2\\qquad b_1\\neq b_2",
          litery: "$y=a_1x+b_1$ i $y=a_2x+b_2$ – dwie proste.",
          przyklad: "Proste $y=3x-2$ i $y=3x+5$ są równoległe, bo obie mają $a=3$.",
          uwaga: "Gdy także $b_1=b_2$, to proste się pokrywają – to jedna prosta, a nie dwie proste równoległe.",
        },
        {
          nazwa: "Proste prostopadłe",
          slownie: "Dwie proste o współczynnikach kierunkowych $a_1$ i $a_2$ są prostopadłe, gdy $a_1\\cdot a_2=-1$. Prosta pozioma jest prostopadła do prostej pionowej.",
          tex: "a_1\\cdot a_2=-1\\qquad a_2=-\\frac{1}{a_1}",
          litery: "$a_1$, $a_2$ – współczynniki kierunkowe prostych.",
          przyklad: "Do prostej $y=\\frac{2}{3}x+1$ prostopadła ma $a_2=-\\frac{3}{2}$, bo $\\frac{2}{3}\\cdot\\left(-\\frac{3}{2}\\right)=-1$.",
          uwaga: "Trzeba odwrócić liczbę i zmienić znak. Sama zmiana znaku ($-\\frac{2}{3}$) albo samo odwrócenie ($\\frac{3}{2}$) nie wystarcza. Prosta prostopadła do $y=4$ to prosta pionowa $x=c$.",
        },
        {
          nazwa: "Prosta przez dany punkt",
          slownie: "Prosta o współczynniku $a$ przechodząca przez punkt $P$ ma równanie $y=a(x-x_P)+y_P$. Dla prostej równoległej bierzesz to samo $a$, dla prostopadłej $a_2=-\\frac{1}{a_1}$.",
          tex: "y=a(x-x_P)+y_P",
          litery: "$P=(x_P, y_P)$ – punkt, przez który ma przechodzić prosta, $a$ – jej współczynnik kierunkowy.",
          przyklad: "Prosta równoległa do $y=2x+1$ przez $P=(3, 4)$: $y=2(x-3)+4=2x-2$. Prostopadła: $y=-\\frac{1}{2}(x-3)+4=-\\frac{1}{2}x+\\frac{11}{2}$.",
          uwaga: "Możesz też podstawić współrzędne $P$ do $y=ax+b$ i obliczyć $b$ – wynik będzie ten sam.",
        },
        {
          nazwa: "Symetralna odcinka",
          slownie: "Symetralna odcinka $AB$ to prosta prostopadła do $AB$, przechodząca przez środek $S$ tego odcinka. Każdy jej punkt jest tak samo oddalony od $A$ i od $B$.",
          tex: "a=-\\frac{1}{a_{AB}}\\qquad y_S=ax_S+b",
          litery: "$a_{AB}$ – współczynnik kierunkowy prostej $AB$, $S=(x_S, y_S)$ – środek odcinka.",
          przyklad: "Dla $A=(0, 1)$ i $B=(4, 3)$: $a_{AB}=\\frac{1}{2}$, więc $a=-2$. Środek $S=(2, 2)$, z $2=-2\\cdot 2+b$ mamy $b=6$: symetralna to $y=-2x+6$.",
          uwaga: "Współczynnik symetralnej liczysz z prostej $AB$, ale $b$ wyznaczasz z punktu $S$ – nie z $A$ ani $B$.",
        },
      ],
      jak: [
        "Gdy prosta jest dana dwoma punktami, oblicz $a=\\frac{y_B-y_A}{x_B-x_A}$.",
        "Prosta równoległa ma ten sam współczynnik $a$. Prosta prostopadła ma $a_2=-\\frac{1}{a_1}$.",
        "Podstaw współrzędne punktu, przez który ma przechodzić szukana prosta, do $y=ax+b$ i oblicz $b$.",
        "Symetralna odcinka: wyznacz środek odcinka i współczynnik prostopadły do $AB$, potem $b$ z podstawienia środka.",
        "Sprawdź wynik: współrzędne danego punktu muszą spełniać równanie szukanej prostej.",
      ],
      zadania: [
        {
          nr: "16",
          tresc: "Prosta równoległa do prostej $y = -2x + 5$ i przechodząca przez punkt $P = (3, 1)$ ma równanie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$y = \\frac{1}{2}x - \\frac{1}{2}$", "$y = -2x + 7$", "$y = -2x + 1$", "$y = 2x - 5$"],
          poprawna: 1,
        },
        {
          nr: "17",
          tresc: "Prosta prostopadła do prostej $y = 3x - 4$ i przechodząca przez punkt $P = (6, 1)$ ma równanie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$y = 3x - 17$", "$y = \\frac{1}{3}x - 1$", "$y = -3x + 19$", "$y = -\\frac{1}{3}x + 3$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "Proste $y = (2m + 1)x - 3$ oraz $y = -\\frac{1}{3}x + 4$ są prostopadłe. Liczba $m$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$1$", "$3$", "$-2$", "$-\\frac{2}{3}$"],
          poprawna: 0,
        },
        {
          nr: "19",
          tresc: "Dane są proste $k: y = 2x - 3$, $l: y = 2x + 5$ oraz $m: y = -\\frac{1}{2}x + 1$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Punkt $(2, 1)$ leży na prostej $k$.", litery: "PF", poprawna: 0 },
            { tekst: "Prosta $m$ jest prostopadła do prostej $l$.", litery: "PF", poprawna: 0 },
            { tekst: "Prosta $l$ jest prostopadła do prostej $k$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "20",
          tresc: "Prosta prostopadła do prostej $y = 4$ i przechodząca przez punkt $(-3, 7)$ ma równanie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$y = 7$", "$x = -3$", "$x = 7$", "$y = -3$"],
          poprawna: 1,
        },
        {
          nr: "21",
          tresc: "Symetralna odcinka o końcach $A = (1, 2)$ i $B = (5, 4)$ ma równanie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$y = \\frac{1}{2}x + \\frac{3}{2}$", "$y = 2x - 3$", "$y = -2x + 9$", "$y = -2x + 3$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "22",
          punkty: 3,
          tresc: "Prosta $k$ ma równanie $y = \\frac{2}{3}x - 1$. Wyznacz równanie prostej $l$ prostopadłej do $k$ i przechodzącej przez punkt $P = (4, -5)$. Sprawdź, czy punkt $Q = (2, -2)$ leży na prostej $l$. **Zapisz obliczenia.**",
          rozwiazanie: "Prosta $k$ ma $a_1 = \\frac{2}{3}$. Dla prostej prostopadłej $a_2 = -\\frac{1}{a_1} = -\\frac{3}{2}$.\n\nPodstawiamy punkt $P$ do $y = -\\frac{3}{2}x + b$: $-5 = -\\frac{3}{2}\\cdot 4 + b = -6 + b$, więc $b = 1$.\n\nRównanie prostej $l$: $y = -\\frac{3}{2}x + 1$.\n\nDla punktu $Q$: $-\\frac{3}{2}\\cdot 2 + 1 = -2$, a rzędna punktu $Q$ to $-2$. Równanie jest spełnione.\n\nOdpowiedź: $l: y = -\\frac{3}{2}x + 1$, punkt $Q$ leży na prostej $l$.",
        },
        {
          nr: "23",
          punkty: 3,
          tresc: "Dane są punkty $A = (-1, 3)$ i $B = (5, 1)$. Wyznacz równanie symetralnej odcinka $AB$. Wykaż, że punkt $C = (1, -1)$ leży na tej symetralnej i że $|CA| = |CB|$. **Zapisz obliczenia.**",
          rozwiazanie: "Współczynnik prostej $AB$: $a_{AB} = \\frac{1 - 3}{5 - (-1)} = \\frac{-2}{6} = -\\frac{1}{3}$. Symetralna jest prostopadła do $AB$, więc $a = 3$.\n\nŚrodek odcinka: $S = \\left(\\frac{-1 + 5}{2},\\ \\frac{3 + 1}{2}\\right) = (2, 2)$.\n\nZ $2 = 3\\cdot 2 + b$ mamy $b = -4$, więc symetralna ma równanie $y = 3x - 4$.\n\nDla punktu $C$: $3\\cdot 1 - 4 = -1$, więc $C$ leży na symetralnej.\n\n$|CA| = \\sqrt{(-1 - 1)^2 + (3 - (-1))^2} = \\sqrt{4 + 16} = \\sqrt{20}$ oraz $|CB| = \\sqrt{(5 - 1)^2 + (1 - (-1))^2} = \\sqrt{16 + 4} = \\sqrt{20}$.\n\nOdpowiedź: symetralna ma równanie $y = 3x - 4$, punkt $C$ leży na niej i $|CA| = |CB|$.",
        },
      ],
      generatory: [
        {
          id: "prosta-przez-punkt",
          nazwa: "Równoległa lub prostopadła",
          opis: "Prosta k jest dana dwoma punktami. Wyznacz prostą równoległą albo prostopadłą do k, przechodzącą przez punkt P.",
          generuj(r) {
            const dx = r.intBez(-4, 4, 0), dy = r.intBez(-4, 4, 0);
            const xa = r.int(-5, 5), ya = r.int(-5, 5), xb = xa + dx, yb = ya + dy;
            const a1 = q(dy, dx);
            const prostopadla = r.chance();
            const a2 = prostopadla ? q(1).div(a1).neg() : a1;
            const x0 = r.int(-4, 4), y0 = r.int(-6, 6);
            const b2 = q(y0).sub(a2.mul(x0));
            const krok2 = prostopadla
              ? `Prosta prostopadła ma $a_2 = -\\frac{1}{a_1} = ${a2.tex()}$.`
              : `Prosta równoległa ma ten sam współczynnik: $a_2 = a_1 = ${a1.tex()}$.`;
            return {
              tresc: `Prosta $k$ przechodzi przez punkty $A = ${pkt(xa, ya)}$ i $B = ${pkt(xb, yb)}$. Wyznacz równanie prostej $l$ ${prostopadla ? "prostopadłej" : "równoległej"} do $k$ i przechodzącej przez punkt $P = ${pkt(x0, y0)}$. Prosta $l$ ma równanie $y = ax + b$.`,
              pola: [{ id: "a", typ: "liczba", etykieta: "$a =$" }, { id: "b", typ: "liczba", etykieta: "$b =$" }],
              odpowiedz: { a: a2, b: b2 },
              wynik: `$${prosta(a2, b2)}$`,
              rozwiazanie: [
                `Współczynnik prostej $k$: $a_1 = \\frac{y_B - y_A}{x_B - x_A} = \\frac{${yb} - ${nw(ya)}}{${xb} - ${nw(xa)}} = ${a1.tex()}$.`,
                krok2,
                `Punkt $P$ leży na prostej $l$: $${y0} = ${texNawias(a2)}\\cdot ${nw(x0)} + b$, stąd $b = ${b2.tex()}$.`,
                `Równanie prostej $l$: $${prosta(a2, b2)}$.`,
              ],
            };
          },
        },
        {
          id: "symetralna-odcinka",
          nazwa: "Symetralna odcinka",
          opis: "Wyznacz równanie symetralnej odcinka o danych końcach (współczynniki a i b).",
          generuj(r) {
            const u = r.intBez(-4, 4, 0), v = r.intBez(-4, 4, 0);
            const xa = r.int(-6, 6), ya = r.int(-6, 6);
            const xb = xa + 2 * u, yb = ya + 2 * v;
            const xs = xa + u, ys = ya + v;
            const aAB = q(v, u);
            const a = q(1).div(aAB).neg();
            const b = q(ys).sub(a.mul(xs));
            return {
              tresc: `Dane są punkty $A = ${pkt(xa, ya)}$ i $B = ${pkt(xb, yb)}$. Wyznacz równanie symetralnej odcinka $AB$ w postaci $y = ax + b$.`,
              pola: [{ id: "a", typ: "liczba", etykieta: "$a =$" }, { id: "b", typ: "liczba", etykieta: "$b =$" }],
              odpowiedz: { a, b },
              wynik: `$${prosta(a, b)}$`,
              rozwiazanie: [
                `Środek odcinka: $S = \\left(\\frac{${xa} + ${nw(xb)}}{2},\\ \\frac{${ya} + ${nw(yb)}}{2}\\right) = ${pkt(xs, ys)}$.`,
                `Prosta $AB$: $a_{AB} = \\frac{${yb} - ${nw(ya)}}{${xb} - ${nw(xa)}} = ${aAB.tex()}$. Symetralna jest prostopadła, więc $a = -\\frac{1}{a_{AB}} = ${a.tex()}$.`,
                `Środek $S$ leży na symetralnej: $${ys} = ${texNawias(a)}\\cdot ${nw(xs)} + b$, stąd $b = ${b.tex()}$.`,
                `Symetralna: $${prosta(a, b)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 6.5
    {
      id: "okrag-i-prosta",
      nazwa: "Równanie okręgu. Prosta i okrąg",
      sciaga: [
        {
          nazwa: "Równanie okręgu (powtórka)",
          slownie: "Okrąg o środku $S=(a, b)$ i promieniu $r$ ma równanie kanoniczne. Środek i promień odczytujesz wprost z równania.",
          tex: "(x-a)^2+(y-b)^2=r^2",
          litery: "$S=(a, b)$ – środek okręgu, $r>0$ – promień.",
          przyklad: "Okrąg o środku $(2, -3)$ i promieniu $4$: $(x-2)^2+(y+3)^2=16$.",
          uwaga: "Znaki w nawiasach są przeciwne do współrzędnych środka, a po prawej stronie stoi $r^2$, nie $r$.",
        },
        {
          nazwa: "Odległość środka od prostej",
          slownie: "Dla prostej poziomej $y=c$ odległość środka $S=(a, b)$ to $|b-c|$, a dla prostej pionowej $x=c$ to $|a-c|$. Jest to różnica odpowiednich współrzędnych (bez znaku).",
          tex: "y=c:\\ d=|b-c|\\qquad x=c:\\ d=|a-c|",
          litery: "$d$ – odległość środka okręgu od prostej, $S=(a, b)$ – środek.",
          przyklad: "Dla $S=(1, -2)$ i prostej $y=1$: $d=|-2-1|=3$. Dla prostej $x=8$: $d=|1-8|=7$.",
          uwaga: "Do prostej poziomej liczysz różnicę rzędnych, a do pionowej – różnicę odciętych.",
        },
        {
          nazwa: "Liczba punktów wspólnych",
          slownie: "Gdy $d<r$, prosta przecina okrąg w dwóch punktach. Gdy $d=r$, ma z nim jeden punkt wspólny i jest styczna do okręgu. Gdy $d>r$, leży poza okręgiem.",
          tex: "d<r:\\ 2\\text{ punkty}\\qquad d=r:\\ 1\\text{ punkt}\\qquad d>r:\\ 0\\text{ punktów}",
          litery: "$d$ – odległość środka od prostej, $r$ – promień okręgu.",
          przyklad: "Okrąg $(x-1)^2+(y+2)^2=25$ ma $S=(1, -2)$ i $r=5$. Prosta $y=1$: $d=3<5$, dwa punkty. Prosta $y=3$: $d=5=r$, styczna. Prosta $x=8$: $d=7>5$, brak punktów.",
          uwaga: "Porównuj $d$ z promieniem $r$, a nie z $r^2$. W równaniu okręgu stoi $r^2$, więc najpierw oblicz $r$.",
        },
        {
          nazwa: "Styczne poziome i pionowe",
          slownie: "Okrąg o środku $S=(a, b)$ i promieniu $r$ ma cztery styczne równoległe do osi układu: dwie poziome i dwie pionowe.",
          tex: "y=b\\pm r\\qquad x=a\\pm r",
          litery: "$S=(a, b)$ – środek, $r$ – promień.",
          przyklad: "Dla okręgu $(x-3)^2+(y+1)^2=4$: $S=(3, -1)$, $r=2$. Styczne: $y=1$, $y=-3$, $x=5$, $x=1$.",
          uwaga: "Styczna pozioma ma równanie $y=\\ldots$ (wynika z rzędnej środka), a pionowa $x=\\ldots$ (z odciętej).",
        },
        {
          nazwa: "Okrąg styczny do osi",
          slownie: "Okrąg jest styczny do osi $OX$, gdy promień jest równy odległości środka od tej osi, czyli $r=|b|$. Do osi $OY$ jest styczny, gdy $r=|a|$.",
          tex: "OX:\\ r=|b|\\qquad OY:\\ r=|a|",
          litery: "$S=(a, b)$ – środek okręgu, $r$ – promień.",
          przyklad: "Okrąg o środku $S=(3, -4)$ styczny do osi $OY$ ma $r=|3|=3$, więc $(x-3)^2+(y+4)^2=9$.",
          uwaga: "Do osi $OX$ liczy się rzędna środka, a do osi $OY$ – odcięta. Łatwo je pomylić. Okrąg styczny do obu osi ma $|a|=|b|=r$.",
        },
      ],
      jak: [
        "Z równania kanonicznego odczytaj środek $S=(a, b)$ (znaki przeciwne niż w nawiasach) i promień $r=\\sqrt{r^2}$.",
        "Dla prostej $y=c$ oblicz $d=|b-c|$, dla prostej $x=c$ oblicz $d=|a-c|$.",
        "Porównaj $d$ z $r$: $d<r$ – dwa punkty wspólne, $d=r$ – jeden (styczna), $d>r$ – żadnego.",
        "Okrąg styczny do osi: promień to $|b|$ (oś $OX$) albo $|a|$ (oś $OY$). W równaniu wpisz $r^2$.",
      ],
      zadania: [
        {
          nr: "24",
          tresc: "Ile punktów wspólnych mają prosta $y = -1$ i okrąg o równaniu $(x + 2)^2 + (y - 3)^2 = 16$? **Wybierz właściwą odpowiedź.**",
          opcje: ["dokładnie dwa punkty wspólne", "dokładnie jeden punkt wspólny", "nie mają punktów wspólnych", "dokładnie trzy punkty wspólne"],
          poprawna: 1,
        },
        {
          nr: "25",
          tresc: "Ile punktów wspólnych mają prosta $x = 4$ i okrąg o równaniu $x^2 + (y - 2)^2 = 9$? **Wybierz właściwą odpowiedź.**",
          opcje: ["dokładnie dwa punkty wspólne", "dokładnie jeden punkt wspólny", "nie mają punktów wspólnych", "dokładnie cztery punkty wspólne"],
          poprawna: 2,
        },
        {
          nr: "26",
          tresc: "Dany jest okrąg o równaniu $(x + 1)^2 + (y - 2)^2 = 9$. Styczną do tego okręgu jest prosta o równaniu: **Wybierz właściwą odpowiedź.**",
          opcje: ["$x = 3$", "$y = 3$", "$x = 2$", "$y = -2$"],
          poprawna: 2,
        },
        {
          nr: "27",
          tresc: "Okrąg o środku $S = (3, -4)$ jest styczny do osi $OX$. Równanie tego okręgu ma postać: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(x - 3)^2 + (y + 4)^2 = 4$", "$(x - 3)^2 + (y + 4)^2 = 9$", "$(x - 3)^2 + (y + 4)^2 = 25$", "$(x - 3)^2 + (y + 4)^2 = 16$"],
          poprawna: 3,
        },
        {
          nr: "28",
          tresc: "Dany jest okrąg o równaniu $(x - 2)^2 + (y - 1)^2 = 4$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Prosta $y = 3$ jest styczna do tego okręgu.", litery: "PF", poprawna: 0 },
            { tekst: "Prosta $x = 5$ przecina ten okrąg w dwóch punktach.", litery: "PF", poprawna: 1 },
            { tekst: "Okrąg jest styczny do osi $OY$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "29",
          tresc: "Okrąg o promieniu $3$ jest styczny do obu osi układu współrzędnych i leży w drugiej ćwiartce. Równanie tego okręgu to: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(x + 3)^2 + (y - 3)^2 = 9$", "$(x - 3)^2 + (y + 3)^2 = 9$", "$(x + 3)^2 + (y - 3)^2 = 3$", "$(x + 3)^2 + (y + 3)^2 = 9$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "30",
          punkty: 3,
          tresc: "Dany jest okrąg o równaniu $(x - 3)^2 + (y + 1)^2 = 25$. Określ liczbę punktów wspólnych tego okręgu z każdą z prostych: $y = 4$, $x = -1$, $x = 9$. Podaj równania wszystkich czterech stycznych do tego okręgu równoległych do osi układu. **Zapisz obliczenia.**",
          rozwiazanie: "Środek okręgu to $S = (3, -1)$, promień $r = \\sqrt{25} = 5$.\n\nProsta $y = 4$: $d = |-1 - 4| = 5 = r$, jeden punkt wspólny (prosta jest styczna).\n\nProsta $x = -1$: $d = |3 - (-1)| = 4 < 5$, dwa punkty wspólne.\n\nProsta $x = 9$: $d = |3 - 9| = 6 > 5$, brak punktów wspólnych.\n\nStyczne poziome: $y = -1 \\pm 5$, czyli $y = 4$ i $y = -6$. Styczne pionowe: $x = 3 \\pm 5$, czyli $x = 8$ i $x = -2$.\n\nOdpowiedź: $y = 4$ – jeden punkt, $x = -1$ – dwa punkty, $x = 9$ – brak punktów; styczne: $y = 4$, $y = -6$, $x = 8$, $x = -2$.",
        },
        {
          nr: "31",
          punkty: 3,
          tresc: "Okrąg o środku $S = (4, -3)$ jest styczny do osi $OY$. Napisz równanie tego okręgu. Sprawdź, czy ten okrąg jest styczny do prostej $y = 1$, i ustal, ile punktów wspólnych ma z osią $OX$. **Zapisz obliczenia.**",
          rozwiazanie: "Okrąg styczny do osi $OY$ ma promień równy $|a| = |4| = 4$, więc $r^2 = 16$.\n\nRównanie okręgu: $(x - 4)^2 + (y + 3)^2 = 16$.\n\nProsta $y = 1$: odległość środka $d = |-3 - 1| = 4 = r$, więc prosta jest styczna do okręgu.\n\nOś $OX$ to prosta $y = 0$: $d = |-3 - 0| = 3 < 4$, więc okrąg ma z osią $OX$ dwa punkty wspólne.\n\nOdpowiedź: $(x - 4)^2 + (y + 3)^2 = 16$, prosta $y = 1$ jest styczna do okręgu, z osią $OX$ są dwa punkty wspólne.",
        },
      ],
      generatory: [
        {
          id: "okrag-prosta-polozenie",
          nazwa: "Prosta i okrąg",
          opis: "Ile punktów wspólnych mają okrąg i prosta pozioma albo pionowa?",
          generuj(r) {
            const a = r.int(-6, 6), b = r.int(-6, 6);
            const rr = r.int(2, 7);
            const ile = r.pick([0, 1, 2]);
            const d = ile === 1 ? rr : ile === 2 ? r.int(0, rr - 1) : rr + r.int(1, 3);
            const pozioma = r.chance();
            const c = (pozioma ? b : a) + d * r.znak();
            const roz = ile === 2 ? "$d < r$, więc prosta przecina okrąg w dwóch punktach." : ile === 1 ? "$d = r$, więc prosta jest styczna do okręgu i ma z nim jeden punkt wspólny." : "$d > r$, więc prosta leży poza okręgiem i nie ma punktów wspólnych.";
            return {
              tresc: `Dany jest okrąg o równaniu $${okrag(a, b, rr * rr)}$ i prosta $${pozioma ? "y" : "x"} = ${c}$. Ile punktów wspólnych mają ta prosta i ten okrąg?`,
              pola: [{ id: "n", typ: "liczba", etykieta: "Liczba punktów wspólnych" }],
              odpowiedz: { n: q(ile) },
              wynik: `$${ile}$`,
              rozwiazanie: [
                `Środek okręgu to $S = ${pkt(a, b)}$, promień $r = \\sqrt{${rr * rr}} = ${rr}$.`,
                pozioma
                  ? `Odległość środka od prostej poziomej $y = ${c}$: $d = |${b} - ${nw(c)}| = ${d}$.`
                  : `Odległość środka od prostej pionowej $x = ${c}$: $d = |${a} - ${nw(c)}| = ${d}$.`,
                `Porównujemy $d = ${d}$ z $r = ${rr}$: ${roz}`,
              ],
            };
          },
        },
        {
          id: "okrag-styczne",
          nazwa: "Okrąg i styczne",
          opis: "Promień okręgu stycznego do osi albo równanie stycznej poziomej lub pionowej.",
          generuj(r) {
            if (r.chance()) {
              const a = r.intBez(-7, 7, 0), b = r.intBez(-7, 7, 0);
              const osX = r.chance();
              const rr = Math.abs(osX ? b : a);
              return {
                tresc: `Okrąg o środku $S = ${pkt(a, b)}$ jest styczny do osi $O${osX ? "X" : "Y"}$. Podaj promień $r$ tego okręgu i liczbę $r^2$.`,
                pola: [{ id: "r", typ: "liczba", etykieta: "$r =$" }, { id: "r2", typ: "liczba", etykieta: "$r^2 =$" }],
                odpowiedz: { r: q(rr), r2: q(rr * rr) },
                wynik: `$r = ${rr}$, $r^2 = ${rr * rr}$`,
                rozwiazanie: [
                  osX
                    ? `Okrąg jest styczny do osi $OX$, więc promień jest równy odległości środka od tej osi, czyli rzędnej środka: $r = |${b}| = ${rr}$.`
                    : `Okrąg jest styczny do osi $OY$, więc promień jest równy odległości środka od tej osi, czyli odciętej środka: $r = |${a}| = ${rr}$.`,
                  `Zatem $r^2 = ${rr}^2 = ${rr * rr}$ i równanie okręgu to $${okrag(a, b, rr * rr)}$.`,
                ],
              };
            }
            const a = r.int(-6, 6), b = r.int(-6, 6), rr = r.int(2, 8);
            const wariant = r.pick([
              { opis: "leży na prawo od niego", zmienna: "x", c: a + rr, krok: `$c = a + r = ${a} + ${rr} = ${a + rr}$` },
              { opis: "leży na lewo od niego", zmienna: "x", c: a - rr, krok: `$c = a - r = ${a} - ${rr} = ${a - rr}$` },
              { opis: "leży nad nim", zmienna: "y", c: b + rr, krok: `$c = b + r = ${b} + ${rr} = ${b + rr}$` },
              { opis: "leży pod nim", zmienna: "y", c: b - rr, krok: `$c = b - r = ${b} - ${rr} = ${b - rr}$` },
            ]);
            return {
              tresc: `Dany jest okrąg o równaniu $${okrag(a, b, rr * rr)}$. Prosta $${wariant.zmienna} = c$ jest styczna do tego okręgu i ${wariant.opis}. Podaj liczbę $c$.`,
              pola: [{ id: "c", typ: "liczba", etykieta: "$c =$" }],
              odpowiedz: { c: q(wariant.c) },
              wynik: `$${wariant.zmienna} = ${wariant.c}$`,
              rozwiazanie: [
                `Środek okręgu to $S = ${pkt(a, b)}$, promień $r = \\sqrt{${rr * rr}} = ${rr}$.`,
                `Styczna jest oddalona od środka o $r$ w kierunku osi ${wariant.zmienna === "x" ? "$OX$ (zmienia się odcięta)" : "$OY$ (zmienia się rzędna)"}: ${wariant.krok}.`,
                `Styczna: $${wariant.zmienna} = ${wariant.c}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 6.6
    {
      id: "zadania-rozne",
      nazwa: "Zadania różne z geometrii analitycznej",
      sciaga: [
        {
          nazwa: "Równoległobok",
          slownie: "Czworokąt $ABCD$ jest równoległobokiem, gdy $\\vec{AB}=\\vec{DC}$ albo gdy jego przekątne $AC$ i $BD$ mają wspólny środek.",
          tex: "\\vec{AB}=\\vec{DC}\\qquad S_{AC}=S_{BD}",
          litery: "$S_{AC}$, $S_{BD}$ – środki przekątnych $AC$ i $BD$.",
          przyklad: "Dla $A=(1, 1)$, $B=(5, 2)$, $C=(6, 5)$: $D=A+C-B=(2, 4)$. Środek $AC$ to $(3{,}5; 3)$ i środek $BD$ też.",
          uwaga: "Brakujący wierzchołek: $D=A+C-B$, czyli suma przeciwległych wierzchołków $A$ i $C$ minus sąsiedni wierzchołek $B$.",
        },
        {
          nazwa: "Prostokąt, romb, kwadrat",
          slownie: "Równoległobok jest prostokątem, gdy ma równe przekątne, a rombem, gdy ma równe sąsiednie boki. Kwadrat jest jednocześnie prostokątem i rombem.",
          tex: "|AC|=|BD|\\qquad|AB|=|BC|",
          litery: "Pierwszy warunek: równoległobok jest prostokątem. Drugi: równoległobok jest rombem.",
          przyklad: "Dla $A=(0, 0)$, $B=(4, 2)$, $C=(3, 4)$, $D=(-1, 2)$: $\\vec{AB}=\\vec{DC}=[4, 2]$ oraz $|AC|=|BD|=5$, więc to prostokąt.",
          uwaga: "Najpierw sprawdź, czy czworokąt jest równoległobokiem. Same równe przekątne nie wystarczą.",
        },
        {
          nazwa: "Trójkąt prostokątny",
          slownie: "Trójkąt jest prostokątny, gdy kwadrat najdłuższego boku jest równy sumie kwadratów pozostałych boków. Kąt prosty leży naprzeciw tego najdłuższego boku.",
          tex: "|AB|^2+|AC|^2=|BC|^2",
          litery: "Kąt prosty jest przy wierzchołku $A$, a przeciwprostokątna to bok $BC$.",
          przyklad: "Dla $A=(0, 0)$, $B=(3, 1)$, $C=(-1, 3)$: $|AB|^2=10$, $|AC|^2=10$, $|BC|^2=20$. Skoro $10+10=20$, kąt prosty jest przy $A$.",
          uwaga: "Porównuj kwadraty długości – unikasz pierwiastków. Możesz też sprawdzić, czy dwa boki mają współczynniki kierunkowe o iloczynie $-1$.",
        },
        {
          nazwa: "Okrąg opisany na trójkącie prostokątnym",
          slownie: "Środkiem okręgu opisanego na trójkącie prostokątnym jest środek przeciwprostokątnej, a promień to połowa jej długości.",
          tex: "S=\\frac{B+C}{2}\\qquad r=\\frac{|BC|}{2}",
          litery: "$BC$ – przeciwprostokątna (kąt prosty przy $A$), $S$ – środek odcinka $BC$.",
          przyklad: "Dla $A=(0, 0)$, $B=(6, 0)$, $C=(0, 8)$ kąt prosty jest przy $A$. $S=(3, 4)$, $|BC|=10$, $r=5$, więc $(x-3)^2+(y-4)^2=25$.",
          uwaga: "Najpierw ustal, przy którym wierzchołku jest kąt prosty – środek szukaj na przeciwległym boku, a nie na dowolnym.",
        },
      ],
      jak: [
        "Zapisz współrzędne wierzchołków i oblicz potrzebne wektory albo długości boków.",
        "Równoległobok: sprawdź $\\vec{AB}=\\vec{DC}$ albo to, że środki przekątnych są równe.",
        "Kąt prosty: porównaj kwadraty długości boków (Pitagoras) albo iloczyn współczynników kierunkowych.",
        "Okrąg opisany na trójkącie prostokątnym: środek przeciwprostokątnej to środek okręgu, $r^2$ to kwadrat odległości środka od wierzchołka.",
      ],
      zadania: [
        {
          nr: "32",
          tresc: "Dane są punkty $A = (0, 0)$, $B = (4, 2)$ i $C = (-1, 2)$. Kąt prosty trójkąta $ABC$ znajduje się przy wierzchołku: **Wybierz właściwą odpowiedź.**",
          opcje: ["$B$", "$A$", "$C$", "żadnym, bo trójkąt nie jest prostokątny"],
          poprawna: 1,
        },
        {
          nr: "33",
          tresc: "Trójkąt $ABC$ jest prostokątny z kątem prostym przy wierzchołku $C$, gdzie $A = (-2, 1)$ i $B = (6, 7)$. Środek okręgu opisanego na tym trójkącie ma współrzędne: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(4, 8)$", "$(4, 3)$", "$(2, 4)$", "$(8, 6)$"],
          poprawna: 2,
        },
        {
          nr: "34",
          tresc: "Punkty $A = (1, -2)$, $B = (6, 0)$ i $C = (9, 5)$ są kolejnymi wierzchołkami równoległoboku $ABCD$. Wierzchołek $D$ ma współrzędne: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(14, 7)$", "$(-2, -7)$", "$(3, 2)$", "$(4, 3)$"],
          poprawna: 3,
        },
        {
          nr: "35",
          tresc: "Dany jest czworokąt $ABCD$, gdzie $A = (0, 0)$, $B = (5, 1)$, $C = (6, 4)$ i $D = (1, 3)$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Czworokąt $ABCD$ jest równoległobokiem.", litery: "PF", poprawna: 0 },
            { tekst: "Czworokąt $ABCD$ jest prostokątem.", litery: "PF", poprawna: 1 },
            { tekst: "Środek przekątnej $BD$ ma współrzędne $(3, 1)$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "36",
          tresc: "W prostokącie $ABCD$ dane są wierzchołki $A = (-1, 0)$ i $C = (5, 2)$. Długość przekątnej $BD$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$2\\sqrt{10}$", "$\\sqrt{10}$", "$40$", "$2\\sqrt{5}$"],
          poprawna: 0,
        },
        {
          nr: "37",
          tresc: "Dane są punkty $A = (0, 0)$, $B = (8, 0)$ i $C = (0, 6)$. Okrąg opisany na trójkącie $ABC$ ma równanie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(x - 4)^2 + (y - 3)^2 = 5$", "$(x - 4)^2 + (y - 3)^2 = 25$", "$(x - 4)^2 + (y - 3)^2 = 100$", "$(x + 4)^2 + (y + 3)^2 = 25$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "38",
          punkty: 3,
          tresc: "Dane są punkty $A = (1, -1)$, $B = (7, 1)$ i $C = (-3, 11)$. Wykaż, że trójkąt $ABC$ jest prostokątny, i napisz równanie okręgu opisanego na tym trójkącie. **Zapisz obliczenia.**",
          rozwiazanie: "Obliczamy kwadraty długości boków: $|AB|^2 = (7 - 1)^2 + (1 - (-1))^2 = 36 + 4 = 40$, $|AC|^2 = (-3 - 1)^2 + (11 - (-1))^2 = 16 + 144 = 160$, $|BC|^2 = (-3 - 7)^2 + (11 - 1)^2 = 100 + 100 = 200$.\n\nPonieważ $40 + 160 = 200$, czyli $|AB|^2 + |AC|^2 = |BC|^2$, trójkąt jest prostokątny, a kąt prosty jest przy wierzchołku $A$. Przeciwprostokątna to $BC$.\n\nŚrodek okręgu to środek odcinka $BC$: $S = \\left(\\frac{7 + (-3)}{2},\\ \\frac{1 + 11}{2}\\right) = (2, 6)$.\n\nKwadrat promienia: $r^2 = \\frac{|BC|^2}{4} = \\frac{200}{4} = 50$.\n\nOdpowiedź: trójkąt jest prostokątny, okrąg ma równanie $(x - 2)^2 + (y - 6)^2 = 50$.",
        },
        {
          nr: "39",
          punkty: 4,
          tresc: "Dane są punkty $A = (0, -1)$, $B = (4, 1)$, $C = (3, 3)$ i $D = (-1, 1)$. Wykaż, że czworokąt $ABCD$ jest prostokątem, i oblicz jego pole. **Zapisz obliczenia.**",
          rozwiazanie: "Obliczamy wektory: $\\vec{AB} = [4, 2]$ oraz $\\vec{DC} = [3 - (-1),\\ 3 - 1] = [4, 2]$. Zatem $\\vec{AB} = \\vec{DC}$ i czworokąt $ABCD$ jest równoległobokiem.\n\nWektor $\\vec{BC} = [3 - 4,\\ 3 - 1] = [-1, 2]$.\n\nWspółczynnik prostej $AB$: $\\frac{2}{4} = \\frac{1}{2}$, a prostej $BC$: $\\frac{2}{-1} = -2$. Iloczyn $\\frac{1}{2}\\cdot(-2) = -1$, więc $AB \\perp BC$. Równoległobok z kątem prostym jest prostokątem.\n\nDługości boków: $|AB| = \\sqrt{16 + 4} = 2\\sqrt{5}$ oraz $|BC| = \\sqrt{1 + 4} = \\sqrt{5}$.\n\nPole: $2\\sqrt{5}\\cdot\\sqrt{5} = 10$.\n\nOdpowiedź: czworokąt jest prostokątem, jego pole jest równe $10$.",
        },
      ],
      generatory: [
        {
          id: "rownoleglobok-wierzcholek",
          nazwa: "Równoległobok",
          opis: "Oblicz brakujący wierzchołek równoległoboku albo punkt przecięcia jego przekątnych.",
          generuj(r) {
            let p, q2, s, t;
            do {
              p = r.int(-4, 4); q2 = r.int(-4, 4); s = r.int(-4, 4); t = r.int(-4, 4);
            } while (p * t - q2 * s === 0);
            const xa = r.int(-5, 5), ya = r.int(-5, 5);
            const A = [xa, ya], B = [xa + p, ya + q2], D = [xa + s, ya + t], C = [xa + p + s, ya + q2 + t];
            const tryb = r.pick(["D", "A", "S"]);
            if (tryb === "D") {
              return {
                tresc: `Punkty $A = ${pkt(...A)}$, $B = ${pkt(...B)}$ i $C = ${pkt(...C)}$ są kolejnymi wierzchołkami równoległoboku $ABCD$. Oblicz współrzędne wierzchołka $D$.`,
                pola: [{ id: "x", typ: "liczba", etykieta: "$x_D =$" }, { id: "y", typ: "liczba", etykieta: "$y_D =$" }],
                odpowiedz: { x: q(D[0]), y: q(D[1]) },
                wynik: `$D = ${pkt(...D)}$`,
                rozwiazanie: [
                  `W równoległoboku $\\vec{AB} = \\vec{DC}$. Obliczamy $\\vec{AB} = [${B[0]} - ${nw(A[0])},\\ ${B[1]} - ${nw(A[1])}] = ${wek(p, q2)}$.`,
                  `Z $\\vec{DC} = [${C[0]} - x_D,\\ ${C[1]} - y_D] = ${wek(p, q2)}$ mamy $x_D = ${C[0]} - ${nw(p)} = ${D[0]}$ oraz $y_D = ${C[1]} - ${nw(q2)} = ${D[1]}$.`,
                  `Wierzchołek: $D = ${pkt(...D)}$.`,
                ],
              };
            }
            if (tryb === "A") {
              return {
                tresc: `Punkty $B = ${pkt(...B)}$, $C = ${pkt(...C)}$ i $D = ${pkt(...D)}$ są kolejnymi wierzchołkami równoległoboku $ABCD$. Oblicz współrzędne wierzchołka $A$.`,
                pola: [{ id: "x", typ: "liczba", etykieta: "$x_A =$" }, { id: "y", typ: "liczba", etykieta: "$y_A =$" }],
                odpowiedz: { x: q(A[0]), y: q(A[1]) },
                wynik: `$A = ${pkt(...A)}$`,
                rozwiazanie: [
                  `W równoległoboku $\\vec{AB} = \\vec{DC}$. Obliczamy $\\vec{DC} = [${C[0]} - ${nw(D[0])},\\ ${C[1]} - ${nw(D[1])}] = ${wek(p, q2)}$.`,
                  `Z $\\vec{AB} = [${B[0]} - x_A,\\ ${B[1]} - y_A] = ${wek(p, q2)}$ mamy $x_A = ${B[0]} - ${nw(p)} = ${A[0]}$ oraz $y_A = ${B[1]} - ${nw(q2)} = ${A[1]}$.`,
                  `Wierzchołek: $A = ${pkt(...A)}$.`,
                ],
              };
            }
            const xs = q(A[0] + C[0], 2), ys = q(A[1] + C[1], 2);
            return {
              tresc: `Punkty $A = ${pkt(...A)}$, $B = ${pkt(...B)}$ i $C = ${pkt(...C)}$ są kolejnymi wierzchołkami równoległoboku $ABCD$. Oblicz współrzędne punktu $S$ przecięcia jego przekątnych.`,
              pola: [{ id: "x", typ: "liczba", etykieta: "$x_S =$" }, { id: "y", typ: "liczba", etykieta: "$y_S =$" }],
              odpowiedz: { x: xs, y: ys },
              wynik: `$S = ${pkt(xs, ys)}$`,
              rozwiazanie: [
                "Przekątne równoległoboku przecinają się w ich wspólnym środku, więc $S$ jest środkiem przekątnej $AC$.",
                `$x_S = \\frac{${A[0]} + ${nw(C[0])}}{2} = ${dz(xs)}$ oraz $y_S = \\frac{${A[1]} + ${nw(C[1])}}{2} = ${dz(ys)}$.`,
                `Punkt przecięcia przekątnych: $S = ${pkt(xs, ys)}$.`,
              ],
            };
          },
        },
        {
          id: "okrag-opisany-prostokatny",
          nazwa: "Okrąg opisany na trójkącie",
          opis: "Trójkąt prostokątny o danych wierzchołkach: środek i kwadrat promienia okręgu opisanego.",
          generuj(r) {
            let p, q2;
            do {
              p = r.int(-2, 2); q2 = r.int(-2, 2);
            } while (p === 0 && q2 === 0);
            const s = r.pick([1, 2, 2]);
            const x0 = r.int(-4, 4), y0 = r.int(-4, 4);
            const kat = [x0, y0], P1 = [x0 + 2 * p, y0 + 2 * q2], P2 = [x0 - 2 * s * q2, y0 + 2 * s * p];
            const xs = x0 + p - s * q2, ys = y0 + q2 + s * p;
            const r2 = (1 + s * s) * (p * p + q2 * q2);
            const wierz = r.shuffle([kat, P1, P2]);
            const nazwa = ["A", "B", "C"];
            const kw2 = (i, j) => (wierz[i][0] - wierz[j][0]) ** 2 + (wierz[i][1] - wierz[j][1]) ** 2;
            const boki = [[0, 1], [1, 2], [0, 2]].map(([i, j]) => ({ i, j, d: kw2(i, j) }));
            const dl = boki.reduce((x, y) => (y.d > x.d ? y : x));
            const reszta = boki.filter((b) => b !== dl);
            const k = [0, 1, 2].find((i) => i !== dl.i && i !== dl.j);
            const N = (i) => nazwa[i];
            const bok = (b) => `|${N(b.i)}${N(b.j)}|^2`;
            const sumaStr = reszta.map((b) => b.d).join(" + ");
            return {
              tresc: `Trójkąt $ABC$ o wierzchołkach $A = ${pkt(...wierz[0])}$, $B = ${pkt(...wierz[1])}$ i $C = ${pkt(...wierz[2])}$ jest prostokątny. Podaj współrzędne środka $S$ okręgu opisanego na tym trójkącie oraz liczbę $r^2$, gdzie $r$ jest promieniem tego okręgu.`,
              pola: [
                { id: "x", typ: "liczba", etykieta: "$x_S =$" },
                { id: "y", typ: "liczba", etykieta: "$y_S =$" },
                { id: "r2", typ: "liczba", etykieta: "$r^2 =$" },
              ],
              odpowiedz: { x: q(xs), y: q(ys), r2: q(r2) },
              wynik: `$S = ${pkt(xs, ys)}$, $r^2 = ${r2}$`,
              rozwiazanie: [
                `Kwadraty długości boków: ${boki.map((b) => `$${bok(b)} = ${b.d}$`).join(", ")}.`,
                `Najdłuższy jest bok $${N(dl.i)}${N(dl.j)}$ i $${sumaStr} = ${dl.d}$, więc kąt prosty jest przy wierzchołku $${N(k)}$, a przeciwprostokątna to $${N(dl.i)}${N(dl.j)}$.`,
                `Środek okręgu to środek przeciwprostokątnej: $S = \\left(\\frac{${wierz[dl.i][0]} + ${nw(wierz[dl.j][0])}}{2},\\ \\frac{${wierz[dl.i][1]} + ${nw(wierz[dl.j][1])}}{2}\\right) = ${pkt(xs, ys)}$.`,
                `Kwadrat promienia to kwadrat połowy przeciwprostokątnej: $r^2 = \\frac{${dl.d}}{4} = ${r2}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 6.7
    {
      id: "przeksztalcenia",
      nazwa: "Wybrane przekształcenia geometryczne w układzie współrzędnych",
      sciaga: [
        {
          nazwa: "Symetria względem osi układu",
          slownie: "W symetrii względem osi $OX$ zmienia się znak rzędnej, a w symetrii względem osi $OY$ – znak odciętej.",
          tex: "S_{OX}:\\ (x, y)\\to(x, -y)\\qquad S_{OY}:\\ (x, y)\\to(-x, y)",
          litery: "$P=(x, y)$ – dany punkt, $P'$ – jego obraz w symetrii.",
          przyklad: "Dla $P=(3, -2)$: obraz w symetrii względem $OX$ to $(3, 2)$, a względem $OY$ to $(-3, -2)$.",
          uwaga: "Punkt leżący na osi symetrii nie zmienia położenia. W symetrii względem $OX$ nie zmienia się odcięta, a w symetrii względem $OY$ – rzędna.",
        },
        {
          nazwa: "Symetria względem początku układu",
          slownie: "W symetrii względem początku układu $O=(0, 0)$ zmieniają się znaki obu współrzędnych. Punkt $O$ jest środkiem odcinka łączącego punkt z jego obrazem.",
          tex: "S_O:\\ (x, y)\\to(-x, -y)",
          litery: "$P=(x, y)$ – dany punkt, $P'=(-x, -y)$ – jego obraz.",
          przyklad: "Dla $P=(2, -7)$: $P'=(-2, 7)$. Środek odcinka $PP'$ to $\\left(\\frac{2+(-2)}{2},\\ \\frac{-7+7}{2}\\right)=(0, 0)$.",
          uwaga: "Wykonanie dwóch symetrii po kolei, względem $OX$ i względem $OY$, daje symetrię względem początku układu.",
        },
        {
          nazwa: "Przesunięcie o wektor",
          slownie: "W przesunięciu o wektor $\\vec{u}=[a, b]$ do odciętej dodajemy $a$, a do rzędnej $b$. Każdy punkt przesuwa się o ten sam wektor.",
          tex: "(x, y)\\to(x+a,\\ y+b)\\qquad\\vec{PP'}=\\vec{u}",
          litery: "$P=(x, y)$ – dany punkt, $P'$ – jego obraz, $\\vec{u}=[a, b]$ – wektor przesunięcia.",
          przyklad: "Dla $P=(-1, 2)$ i $\\vec{u}=[3, -4]$: $P'=(-1+3,\\ 2-4)=(2, -2)$. Wektor $\\vec{PP'}=[3, -4]=\\vec{u}$.",
          uwaga: "Gdy znasz obraz $P'$ i szukasz punktu $P$, odejmij wektor: $P=P'-\\vec{u}$.",
        },
        {
          nazwa: "Obraz figury",
          slownie: "Obraz odcinka, trójkąta czy czworokąta znajdziesz, przekształcając jego wierzchołki. Symetrie i przesunięcie nie zmieniają długości odcinków, więc obwód figury zostaje taki sam.",
          tex: "A\\to A'\\qquad B\\to B'\\qquad |A'B'|=|AB|",
          litery: "$A'$, $B'$ – obrazy punktów $A$ i $B$.",
          przyklad: "Trójkąt $A=(0, 0)$, $B=(4, 0)$, $C=(4, 3)$ po symetrii względem $OX$ ma wierzchołki $A'=(0, 0)$, $B'=(4, 0)$, $C'=(4, -3)$. Boki mają długości $4$, $3$, $5$, jak przed przekształceniem.",
          uwaga: "Każdy wierzchołek przekształcaj tym samym wzorem. Pomyłka w jednym wierzchołku zmienia kształt figury.",
        },
      ],
      jak: [
        "Rozpoznaj przekształcenie: symetria względem $OX$, względem $OY$, względem początku układu czy przesunięcie o wektor.",
        "Zapisz wzór: $(x, -y)$, $(-x, y)$, $(-x, -y)$ albo $(x+a,\\ y+b)$.",
        "Podstaw współrzędne każdego wierzchołka figury i zapisz jego obraz.",
        "Gdy szukasz przekształcenia, porównaj współrzędne punktu i jego obrazu: który znak się zmienił, o ile przesunęły się współrzędne.",
      ],
      zadania: [
        {
          nr: "40",
          tresc: "Obrazem punktu $P = (-4, 5)$ w symetrii względem osi $OX$ jest punkt: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(4, 5)$", "$(-4, -5)$", "$(4, -5)$", "$(5, -4)$"],
          poprawna: 1,
        },
        {
          nr: "41",
          tresc: "Obrazem punktu $A = (2, -7)$ w symetrii względem początku układu współrzędnych jest punkt: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(2, 7)$", "$(-2, -7)$", "$(7, -2)$", "$(-2, 7)$"],
          poprawna: 3,
        },
        {
          nr: "42",
          tresc: "Punkt $P = (-1, 2)$ przesunięto o wektor $\\vec{u} = [3, -4]$. Otrzymano punkt: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(2, -2)$", "$(-4, 6)$", "$(2, 6)$", "$(-3, -8)$"],
          poprawna: 0,
        },
        {
          nr: "43",
          tresc: "Dany jest trójkąt $ABC$, gdzie $A = (1, 1)$, $B = (5, 1)$ i $C = (5, 4)$. Trójkąt $A'B'C'$ jest jego obrazem w symetrii względem osi $OX$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Punkt $C'$ ma współrzędne $(-5, 4)$.", litery: "PF", poprawna: 1 },
            { tekst: "Obwód trójkąta $A'B'C'$ jest równy $12$.", litery: "PF", poprawna: 0 },
            { tekst: "Obrazem punktu $B$ w symetrii względem początku układu jest punkt $(-5, -1)$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "44",
          tresc: "Punkt $P = (3, -2)$ w pewnym przesunięciu przechodzi na punkt $P' = (-1, 5)$. Wektor tego przesunięcia ma współrzędne: **Wybierz właściwą odpowiedź.**",
          opcje: ["$[4, -7]$", "$[2, 3]$", "$[-4, 7]$", "$[-2, 3]$"],
          poprawna: 2,
        },
        {
          nr: "45",
          tresc: "Obrazem punktu $(-3, 4)$ w pewnej symetrii jest punkt $(3, 4)$. Jest to symetria: **Wybierz właściwą odpowiedź.**",
          opcje: ["względem osi $OX$", "względem osi $OY$", "względem początku układu", "inna niż wymienione"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "46",
          punkty: 3,
          tresc: "Dany jest trójkąt $ABC$, gdzie $A = (-1, 2)$, $B = (3, 2)$ i $C = (3, 5)$. Wyznacz współrzędne wierzchołków trójkąta $A'B'C'$ będącego obrazem trójkąta $ABC$ w symetrii względem początku układu. Następnie przesuń trójkąt $A'B'C'$ o wektor $\\vec{u} = [2, 3]$ i oblicz obwód otrzymanego trójkąta. **Zapisz obliczenia.**",
          rozwiazanie: "W symetrii względem początku układu zmieniamy znaki obu współrzędnych: $A' = (1, -2)$, $B' = (-3, -2)$, $C' = (-3, -5)$.\n\nPrzesuwamy o wektor $[2, 3]$: $A'' = (1 + 2,\\ -2 + 3) = (3, 1)$, $B'' = (-3 + 2,\\ -2 + 3) = (-1, 1)$, $C'' = (-3 + 2,\\ -5 + 3) = (-1, -2)$.\n\nSymetria i przesunięcie nie zmieniają długości odcinków, ale policzmy boki: $|A''B''| = |3 - (-1)| = 4$, $|B''C''| = |1 - (-2)| = 3$, $|A''C''| = \\sqrt{(3 + 1)^2 + (1 + 2)^2} = \\sqrt{16 + 9} = 5$.\n\nObwód: $4 + 3 + 5 = 12$.\n\nOdpowiedź: $A'' = (3, 1)$, $B'' = (-1, 1)$, $C'' = (-1, -2)$, obwód jest równy $12$.",
        },
        {
          nr: "47",
          punkty: 2,
          tresc: "Punkt $A = (5, -3)$ jest obrazem punktu $P$ w przesunięciu o wektor $\\vec{u} = [-2, 4]$. Wyznacz współrzędne punktu $P$, a następnie punktu $P'$ symetrycznego do $P$ względem osi $OY$. **Zapisz obliczenia.**",
          rozwiazanie: "Skoro $A = P + \\vec{u}$, to $P = A - \\vec{u} = (5 - (-2),\\ -3 - 4) = (7, -7)$.\n\nW symetrii względem osi $OY$ zmienia się znak odciętej: $P' = (-7, -7)$.\n\nOdpowiedź: $P = (7, -7)$, $P' = (-7, -7)$.",
        },
      ],
      generatory: [
        {
          id: "obraz-punktu",
          nazwa: "Obraz punktu",
          opis: "Oblicz obraz punktu w symetrii względem osi, początku układu albo w przesunięciu o wektor.",
          generuj(r) {
            const x = r.intBez(-9, 9, 0), y = r.intBez(-9, 9, 0);
            const tryb = r.pick(["OX", "OY", "O", "wektor", "wektor"]);
            if (tryb === "wektor") {
              const a = r.int(-6, 6), b = r.intBez(-6, 6, 0);
              return {
                tresc: `Punkt $P = ${pkt(x, y)}$ przesunięto o wektor $\\vec{u} = ${wek(a, b)}$. Oblicz współrzędne otrzymanego punktu $P'$.`,
                pola: [{ id: "x", typ: "liczba", etykieta: "$x_{P'} =$" }, { id: "y", typ: "liczba", etykieta: "$y_{P'} =$" }],
                odpowiedz: { x: q(x + a), y: q(y + b) },
                wynik: `$P' = ${pkt(x + a, y + b)}$`,
                rozwiazanie: [
                  "W przesunięciu o wektor $[a, b]$ dodajemy $a$ do odciętej i $b$ do rzędnej.",
                  `$x_{P'} = ${x} + ${nw(a)} = ${x + a}$ oraz $y_{P'} = ${y} + ${nw(b)} = ${y + b}$.`,
                  `Punkt: $P' = ${pkt(x + a, y + b)}$.`,
                ],
              };
            }
            const opis = { OX: "względem osi $OX$", OY: "względem osi $OY$", O: "względem początku układu współrzędnych" };
            const wzor = { OX: "$(x, y)\\to(x, -y)$", OY: "$(x, y)\\to(-x, y)$", O: "$(x, y)\\to(-x, -y)$" };
            const xp = tryb === "OX" ? x : -x;
            const yp = tryb === "OY" ? y : -y;
            return {
              tresc: `Oblicz współrzędne punktu $P'$, który jest obrazem punktu $P = ${pkt(x, y)}$ w symetrii ${opis[tryb]}.`,
              pola: [{ id: "x", typ: "liczba", etykieta: "$x_{P'} =$" }, { id: "y", typ: "liczba", etykieta: "$y_{P'} =$" }],
              odpowiedz: { x: q(xp), y: q(yp) },
              wynik: `$P' = ${pkt(xp, yp)}$`,
              rozwiazanie: [
                `Symetria ${opis[tryb]}: ${wzor[tryb]}.`,
                `Dla $P = ${pkt(x, y)}$ dostajemy $x_{P'} = ${xp}$ oraz $y_{P'} = ${yp}$.`,
                `Punkt: $P' = ${pkt(xp, yp)}$.`,
              ],
            };
          },
        },
        {
          id: "przesuniecie-wektor",
          nazwa: "Wektor przesunięcia",
          opis: "Znajdź wektor przesunięcia albo punkt, który po przesunięciu o wektor przechodzi na dany punkt.",
          generuj(r) {
            const x = r.int(-8, 8), y = r.int(-8, 8);
            const a = r.int(-6, 6), b = r.intBez(-6, 6, 0);
            const xp = x + a, yp = y + b;
            if (r.chance()) {
              return {
                tresc: `W pewnym przesunięciu punkt $P = ${pkt(x, y)}$ przechodzi na punkt $P' = ${pkt(xp, yp)}$. Podaj współrzędne wektora $\\vec{u} = [a, b]$ tego przesunięcia.`,
                pola: [{ id: "a", typ: "liczba", etykieta: "$a =$" }, { id: "b", typ: "liczba", etykieta: "$b =$" }],
                odpowiedz: { a: q(a), b: q(b) },
                wynik: `$\\vec{u} = ${wek(a, b)}$`,
                rozwiazanie: [
                  "Wektor przesunięcia to wektor $\\vec{PP'}$: od współrzędnych obrazu odejmujemy współrzędne punktu.",
                  `$a = ${xp} - ${nw(x)} = ${a}$ oraz $b = ${yp} - ${nw(y)} = ${b}$.`,
                  `Wektor: $\\vec{u} = ${wek(a, b)}$.`,
                ],
              };
            }
            return {
              tresc: `Punkt $P' = ${pkt(xp, yp)}$ jest obrazem punktu $P$ w przesunięciu o wektor $\\vec{u} = ${wek(a, b)}$. Oblicz współrzędne punktu $P$.`,
              pola: [{ id: "x", typ: "liczba", etykieta: "$x_P =$" }, { id: "y", typ: "liczba", etykieta: "$y_P =$" }],
              odpowiedz: { x: q(x), y: q(y) },
              wynik: `$P = ${pkt(x, y)}$`,
              rozwiazanie: [
                "Skoro $P' = P + \\vec{u}$, to $P = P' - \\vec{u}$: od współrzędnych obrazu odejmujemy współrzędne wektora.",
                `$x_P = ${xp} - ${nw(a)} = ${x}$ oraz $y_P = ${yp} - ${nw(b)} = ${y}$.`,
                `Punkt: $P = ${pkt(x, y)}$.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
