// Klasa 8 (szkoła podstawowa) · rozdział II „Wyrażenia algebraiczne i równania” – Matematyka z kluczem 8 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Bez rysunków: oś liczbowa opisana słowami. Bez nierówności, układów równań i równań kwadratowych.
import { Q, q, wielomianTex, texNawias, plusMinus } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });

/** Powtarza losowanie, aż f() zwróci zadanie (wartość różną od null); f używa tego samego losownika, więc wynik jest powtarzalny. */
function probuj(f, proby = 2000) {
  for (let i = 0; i < proby; i++) {
    const w = f();
    if (w) return w;
  }
  throw new Error("Nie udało się wylosować zadania");
}

/** Zapis dziesiętny z przecinkiem do wzoru: dz(q(9, 2)) = "4{,}5"; gdy się nie da, ułamek zwykły. */
function dz(x) {
  const v = Q.z(x);
  for (let k = 0; k <= 4; k++) {
    const m = v.mul(10 ** k);
    if (m.calkowita) {
      const cyfry = String(Math.abs(m.n)).padStart(k + 1, "0");
      return `${v.ujemna ? "-" : ""}${k ? `${cyfry.slice(0, -k)}{,}${cyfry.slice(-k)}` : cyfry}`;
    }
  }
  return v.tex();
}

/** Liczba dziesiętna, ujemna w nawiasie: dn(q(-7, 2)) = "(-3{,}5)". */
const dn = (x) => (Q.z(x).ujemna ? `(${dz(x)})` : dz(x));

/** ax + b (z literą z). */
const Lx = (a, b, z = "x") => wielomianTex([a, b], z);

/** Suma składników [współczynnik, litera]: laczTex([[3, "x"], [-5, ""]]) = "3x - 5"; zera pomija. */
function laczTex(items) {
  let s = "";
  for (const [c, lit] of items) {
    if (c === 0) continue;
    const abs = Math.abs(c);
    const liczba = lit && abs === 1 ? "" : String(abs);
    s += s === "" ? `${c < 0 ? "-" : ""}${liczba}${lit}` : ` ${c < 0 ? "-" : "+"} ${liczba}${lit}`;
  }
  return s || "0";
}

/** Zwykła suma liczb w zapisie: sumaLiczb([3, -2, 4]) = "3 - 2 + 4". */
const sumaLiczb = (a) => laczTex(a.map((c) => [c, ""]));

const LITERY = ["x", "y", "a", "n", "t"];
const IMIONA = [["Ania", "Bartek"], ["Kasia", "Tomek"], ["Ola", "Michał"], ["Zosia", "Jacek"], ["Marta", "Kuba"]];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Liczby na osi liczbowej
    {
      id: "os-liczbowa",
      nazwa: "Liczby na osi liczbowej",
      sciaga: [
        {
          nazwa: "Liczby na osi",
          slownie: "Na osi liczby rosną w prawo. Liczba leżąca bardziej na prawo jest większa. Liczby ujemne leżą na lewo od zera, a dodatnie na prawo.",
          przyklad: "Liczba $-5$ leży na lewo od $-2$, więc $-5<-2$. Liczba $-5$ jest też o $3$ na lewo od $-2$.",
          uwaga: "Liczba $-5$ jest mniejsza niż $-2$, choć $5$ jest większe niż $2$. Przy liczbach ujemnych im dalej od zera, tym mniejsza liczba.",
        },
        {
          nazwa: "Odległość dwóch liczb",
          slownie: "Aby obliczyć, jak daleko od siebie leżą dwa punkty na osi, od większej współrzędnej odejmujemy mniejszą. Wynik nigdy nie jest ujemny.",
          tex: "|AB|=b-a",
          litery: "$a$ – mniejsza współrzędna (punkt bardziej na lewo), $b$ – większa współrzędna.",
          przyklad: "Punkt $A$ ma współrzędną $-3$, a punkt $B$ współrzędną $5$. Odległość: $5-(-3)=5+3=8$.",
          uwaga: "Odejmowanie liczby ujemnej to dodawanie: $5-(-3)=5+3$, a nie $5-3$.",
        },
        {
          nazwa: "Wartość bezwzględna",
          slownie: "Wartość bezwzględna liczby to jej odległość od zera na osi liczbowej. Zapisujemy ją w kreskach. Nigdy nie jest ujemna.",
          tex: "|-4|=4\\qquad|4|=4\\qquad|0|=0",
          przyklad: "$|-7|+|3|=7+3=10$. Liczymy też w środku: $|5-8|=|-3|=3$.",
          uwaga: "Kreski usuwają minus tylko z liczby w środku: $-|3|=-3$, a nie $3$.",
        },
        {
          nazwa: "Środek odcinka",
          slownie: "Środek jest tak samo daleko od obu końców. Dodajemy współrzędne końców i dzielimy sumę przez $2$.",
          tex: "s=\\frac{a+b}{2}",
          litery: "$a$, $b$ – współrzędne końców odcinka, $s$ – współrzędna środka.",
          przyklad: "Końce $-3$ i $9$: $(-3+9):2=3$. Sprawdzenie: od $-3$ do $3$ jest $6$ i od $3$ do $9$ też $6$.",
          uwaga: "Środek odcinka to nie jest jego długość podzielona przez $2$ – trzeba jeszcze doliczyć początek odcinka.",
        },
        {
          nazwa: "Drugi koniec odcinka",
          slownie: "Gdy znasz środek $S$ i jeden koniec $A$, zrób od $S$ taki sam krok, jaki dzieli $A$ od $S$. Trafisz w drugi koniec $B$.",
          tex: "B=2S-A",
          litery: "$S$ – środek odcinka, $A$ – znany koniec, $B$ – szukany koniec.",
          przyklad: "Środek $S=5$ i koniec $A=2$. Od $2$ do $5$ jest $3$, więc $B=5+3=8$. Ze wzoru: $2\\cdot5-2=8$.",
        },
      ],
      jak: [
        "Naszkicuj oś i zaznacz na niej dane punkty (większa liczba bardziej na prawo).",
        "Odległość to większa liczba minus mniejsza. Przy liczbie ujemnej pamiętaj o nawiasie.",
        "Wartość bezwzględna: patrz, jak daleko liczba jest od zera, i zapisz ją bez minusa.",
        "Środek odcinka: suma końców podzielona przez $2$. Sprawdź, czy odległości od obu końców są równe.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Punkt $A$ ma na osi liczbowej współrzędną $-4$, a punkt $B$ współrzędną $7$. Jaka jest odległość między punktami $A$ i $B$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$-11$", "$11$", "$28$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Jaką wartość ma wyrażenie $|-6|-|2|$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$8$", "$-8$", "$-4$"],
          poprawna: 0,
        },
        {
          nr: "3",
          tresc: "Punkty $A=-5$ i $B=9$ leżą na osi liczbowej. Jaka jest współrzędna środka odcinka $AB$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$7$", "$-7$", "$2$"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "Punkt $S=3$ jest środkiem odcinka $AB$, a punkt $A$ ma współrzędną $-2$. Jaką współrzędną ma punkt $B$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$8$", "$4$", "$1$"],
          poprawna: 1,
        },
        {
          nr: "5",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Liczba $-3$ leży na osi liczbowej na lewo od liczby $-1$.", litery: "PF", poprawna: 0 },
            { tekst: "Odległość między punktami $-2$ i $-8$ jest równa $10$.", litery: "PF", poprawna: 1 },
            { tekst: "Wartość bezwzględna liczby $-9$ jest równa $9$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Na osi liczbowej punkt $A$ ma współrzędną $-6$. Punkt $B$ leży na prawo od $A$ w odległości $15$. Oblicz współrzędną punktu $B$ oraz współrzędną środka odcinka $AB$. **Zapisz obliczenia.**",
          rozwiazanie: "Idziemy w prawo, więc dodajemy: $B=-6+15=9$.\n\nŚrodek odcinka: $\\frac{-6+9}{2}=\\frac{3}{2}=1{,}5$.\n\nSprawdzenie: od $-6$ do $1{,}5$ jest $7{,}5$, a od $1{,}5$ do $9$ też $7{,}5$.\n\nOdpowiedź: Punkt $B$ ma współrzędną $9$, a środek odcinka $1{,}5$.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Punkty $K$ i $L$ leżą na osi liczbowej, $K=-3{,}5$ oraz $L=2{,}5$. Oblicz długość odcinka $KL$, współrzędną jego środka oraz wartość wyrażenia $|K|-|L|$. **Zapisz obliczenia.**",
          rozwiazanie: "Długość odcinka: od większej liczby odejmujemy mniejszą, $2{,}5-(-3{,}5)=2{,}5+3{,}5=6$.\n\nŚrodek: $\\frac{-3{,}5+2{,}5}{2}=\\frac{-1}{2}=-0{,}5$.\n\nWartości bezwzględne: $|K|=|-3{,}5|=3{,}5$ i $|L|=|2{,}5|=2{,}5$, więc $|K|-|L|=3{,}5-2{,}5=1$.\n\nOdpowiedź: Długość $KL$ to $6$, środek ma współrzędną $-0{,}5$, a $|K|-|L|=1$.",
        },
      ],
      generatory: [
        {
          id: "os-odleglosc",
          nazwa: "Na osi liczbowej",
          opis: "Odległość między punktami, przesunięcie punktu o kilka jednostek albo wartość bezwzględna.",
          generuj(r) {
            const [P, R] = r.pick([["A", "B"], ["K", "L"], ["M", "N"], ["P", "R"]]);
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const polowki = r.chance(0.3);
              const a = polowki ? q(r.int(-24, 10), 2) : q(r.int(-12, 8));
              const d = polowki ? q(r.int(5, 30), 2) : q(r.int(3, 16));
              const b = a.add(d);
              const odwr = r.chance();
              const [c1, c2] = odwr ? [b, a] : [a, b];
              return {
                tresc: `Na osi liczbowej punkt $${P}$ ma współrzędną $${dz(c1)}$, a punkt $${R}$ ma współrzędną $${dz(c2)}$. Oblicz długość odcinka $${P}${R}$.`,
                pola: [pole("d", `Długość $${P}${R} =$`)],
                odpowiedz: { d },
                wynik: `$${dz(d)}$`,
                rozwiazanie: [
                  `Większa współrzędna to $${dz(b)}$, a mniejsza to $${dz(a)}$.`,
                  `Odległość to większa liczba minus mniejsza: $${dz(b)} - ${dn(a)} = ${dz(d)}$.`,
                ],
              };
            }
            if (tryb === 1) {
              const a = q(r.int(-12, 12));
              const d = q(r.int(5, 15));
              const prawo = r.chance();
              const wyn = prawo ? a.add(d) : a.sub(d);
              return {
                tresc: `Punkt $${P}$ ma na osi liczbowej współrzędną $${dz(a)}$. Punkt $${R}$ leży o $${dz(d)}$ jednostek na ${prawo ? "prawo" : "lewo"} od punktu $${P}$. Jaką współrzędną ma punkt $${R}$?`,
                pola: [pole("w", `Współrzędna $${R} =$`)],
                odpowiedz: { w: wyn },
                wynik: `$${dz(wyn)}$`,
                rozwiazanie: [
                  prawo
                    ? "Na prawo współrzędne rosną, więc dodajemy odległość do współrzędnej punktu."
                    : "Na lewo współrzędne maleją, więc odejmujemy odległość od współrzędnej punktu.",
                  `$${dz(a)} ${prawo ? "+" : "-"} ${dz(d)} = ${dz(wyn)}$.`,
                ],
              };
            }
            const a = r.intBez(-12, 12, 0);
            const b = r.intBez(-12, 12, 0, a);
            const f = r.int(0, 2);
            const A = Math.abs(a);
            const B = Math.abs(b);
            if (f === 2) {
              const w = Math.abs(a - b);
              return {
                tresc: `Oblicz wartość wyrażenia $|${a} - ${dn(b)}|$.`,
                pola: [pole("w", "Wartość $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Najpierw liczymy w środku: $${a} - ${dn(b)} = ${a - b}$.`,
                  `Wartość bezwzględna to odległość od zera, więc $|${a - b}| = ${w}$.`,
                ],
              };
            }
            const znak = f === 0 ? "+" : "-";
            const w = f === 0 ? A + B : A - B;
            return {
              tresc: `Oblicz wartość wyrażenia $|${a}| ${znak} |${b}|$.`,
              pola: [pole("w", "Wartość $=$")],
              odpowiedz: { w: q(w) },
              wynik: `$${w}$`,
              rozwiazanie: [
                `Wartość bezwzględna liczby to jej odległość od zera: $|${a}| = ${A}$ oraz $|${b}| = ${B}$.`,
                `Obliczamy: $${A} ${znak} ${B} = ${w}$.`,
              ],
            };
          },
        },
        {
          id: "os-srodek",
          nazwa: "Środek odcinka",
          opis: "Oblicz środek odcinka o danych końcach albo drugi koniec odcinka, gdy znasz środek i jeden koniec.",
          generuj(r) {
            const [P, R] = r.pick([["A", "B"], ["K", "L"], ["M", "N"], ["P", "R"]]);
            if (r.chance()) {
              const a = r.int(-15, 12);
              const b = r.intBez(-15, 15, a);
              const s = q(a + b, 2);
              return {
                tresc: `Na osi liczbowej punkt $${P}$ ma współrzędną $${a}$, a punkt $${R}$ współrzędną $${b}$. Oblicz współrzędną środka odcinka $${P}${R}$.`,
                pola: [pole("s", "Środek $=$")],
                odpowiedz: { s },
                wynik: `$${dz(s)}$`,
                rozwiazanie: [
                  `Dodajemy współrzędne końców: $${a} + ${texNawias(b)} = ${a + b}$.`,
                  `Dzielimy przez $2$: $${a + b} : 2 = ${dz(s)}$.`,
                ],
              };
            }
            const S = r.int(-8, 8);
            const A = r.int(-10, 10);
            const B = 2 * S - A;
            if (B === A) return this.generuj(r);
            const k = S - A;
            return {
              tresc: `Punkt $S$ o współrzędnej $${S}$ jest środkiem odcinka $${P}${R}$. Punkt $${P}$ ma współrzędną $${A}$. Jaką współrzędną ma punkt $${R}$?`,
              pola: [pole("b", `Współrzędna $${R} =$`)],
              odpowiedz: { b: q(B) },
              wynik: `$${B}$`,
              rozwiazanie: [
                `Od $${P}$ do $S$ jest $${S} - ${texNawias(A)} = ${k}$.`,
                `Od środka $S$ idziemy dalej o tyle samo: $${texNawias(S)} + ${texNawias(k)} = ${B}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Wyrażenia algebraiczne
    {
      id: "wyrazenia",
      nazwa: "Wyrażenia algebraiczne",
      sciaga: [
        {
          nazwa: "Wyrazy podobne",
          slownie: "Wyrazy podobne mają tę samą literę (albo oba są zwykłymi liczbami). Dodajemy i odejmujemy tylko takie wyrazy: liczymy liczby stojące przy literze.",
          tex: "ax+bx=(a+b)x",
          litery: "$a$, $b$ – liczby stojące przy $x$.",
          przyklad: "$5x+3-2x+4=(5-2)x+(3+4)=3x+7$.",
          uwaga: "Litery nie dodajemy do liczb: $3x+4$ nie jest równe $7x$.",
        },
        {
          nazwa: "Minus przed nawiasem",
          slownie: "Przed nawiasem z plusem znaki w nawiasie zostają. Przed nawiasem z minusem wszystkie znaki w środku zmieniają się na przeciwne.",
          tex: "-(a+b)=-a-b\\qquad-(a-b)=-a+b",
          przyklad: "$4x-(2x-5)=4x-2x+5=2x+5$.",
          uwaga: "Zmieniamy znak każdego wyrazu w nawiasie, a nie tylko pierwszego.",
        },
        {
          nazwa: "Wartość wyrażenia",
          slownie: "Za literę wstawiamy daną liczbę i liczymy według kolejności działań. Liczbę ujemną wstawiamy w nawiasie.",
          przyklad: "Dla $x=-2$: $3x+5=3\\cdot(-2)+5=-6+5=-1$.",
          uwaga: "Dla $x=-2$ wyrażenie $-x$ ma wartość $-(-2)=2$, a nie $-2$.",
        },
        {
          nazwa: "Wyrażenie z treści zadania",
          slownie: "Nieznaną liczbę oznaczamy literą. „O 3 więcej” to $+3$, „o 3 mniej” to $-3$, „2 razy tyle” to $2\\cdot$. Kolejna liczba naturalna po $n$ to $n+1$.",
          przyklad: "Ola ma $x$ zł, Bartek o $4$ zł więcej, a Celina dwa razy tyle co Ola. Razem: $x+(x+4)+2x=4x+4$ zł.",
          uwaga: "„O 3 mniej niż $x$” to $x-3$, a nie $3-x$.",
        },
      ],
      jak: [
        "Oznacz nieznaną wielkość literą i zapisz kolejne wielkości z treści zadania.",
        "Opuść nawiasy: pamiętaj o zmianie znaków po minusie.",
        "Dodaj osobno wyrazy z literą i osobno same liczby.",
        "Gdy trzeba, wstaw liczbę za literę (ujemną w nawiasie) i policz.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Do jakiej postaci upraszcza się wyrażenie $6a+5-(2a-3)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4a+2$", "$4a+8$", "$8a+8$", "$8a+2$"],
          poprawna: 1,
        },
        {
          nr: "9",
          tresc: "Jaką wartość ma wyrażenie $4-3x$ dla $x=-2$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-2$", "$-10$", "$10$", "$2$"],
          poprawna: 2,
        },
        {
          nr: "10",
          tresc: "Ania ma $x$ kart. Bartek ma o $5$ kart mniej niż Ania, a Celina ma $3$ razy więcej kart niż Ania. Które wyrażenie opisuje, ile kart mają razem wszyscy troje? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5x+5$", "$3x-5$", "$4x-5$", "$5x-5$"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "Jaką wartość ma wyrażenie $2a-(a+4)$ dla $a=-3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-7$", "$1$", "$-5$", "$-13$"],
          poprawna: 0,
        },
        {
          nr: "12",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wyrazy $4x$ i $-7x$ są wyrazami podobnymi.", litery: "PF", poprawna: 0 },
            { tekst: "Wyrażenie $2x+3$ jest równe $5x$.", litery: "PF", poprawna: 1 },
            { tekst: "Wyrażenie $8-(x+2)$ jest równe $6-x$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Uprość wyrażenie $(7x-3)-(2x+5)+(4-x)$ i oblicz jego wartość dla $x=-2$. **Zapisz obliczenia.**",
          rozwiazanie: "Opuszczamy nawiasy: przed drugim nawiasem jest minus, więc zmieniamy znaki w tym nawiasie.\n\n$7x-3-2x-5+4-x$.\n\nWyrazy z $x$: $7-2-1=4$, czyli $4x$. Liczby: $-3-5+4=-4$.\n\nPo uproszczeniu: $4x-4$.\n\nDla $x=-2$: $4\\cdot(-2)-4=-8-4=-12$.\n\nOdpowiedź: Wyrażenie jest równe $4x-4$, a jego wartość dla $x=-2$ to $-12$.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Zeszyt kosztuje $x$ zł. Długopis kosztuje o $3$ zł więcej niż zeszyt, a piórnik $4$ razy tyle co zeszyt. Zapisz za pomocą $x$ cenę zestawu: $2$ zeszyty, długopis i piórnik. Uprość wyrażenie i oblicz cenę zestawu dla $x=4$. **Zapisz obliczenia.**",
          rozwiazanie: "Cena długopisu: $x+3$. Cena piórnika: $4x$.\n\nZestaw: $2x+(x+3)+4x$.\n\nPo uproszczeniu: $2x+x+4x+3=7x+3$.\n\nDla $x=4$: $7\\cdot4+3=28+3=31$.\n\nSprawdzenie: zeszyt $4$ zł, długopis $7$ zł, piórnik $16$ zł, więc $2\\cdot4+7+16=31$.\n\nOdpowiedź: Zestaw kosztuje $7x+3$ zł, czyli dla $x=4$ jest to $31$ zł.",
        },
      ],
      generatory: [
        {
          id: "uprosc-sume",
          nazwa: "Uprość wyrażenie",
          opis: "Opuść nawiasy (także po minusie) i dodaj wyrazy podobne. Podaj współczynnik przy literze i wyraz wolny.",
          generuj(r) {
            const lit = r.pick(LITERY);
            return probuj(() => {
              const g = [0, 1, 2].map(() => [r.intBez(-6, 6, 0), r.intBez(-9, 9, 0)]);
              const s2 = r.znak();
              const s3 = r.znak();
              const A = g[0][0] + s2 * g[1][0] + s3 * g[2][0];
              const B = g[0][1] + s2 * g[1][1] + s3 * g[2][1];
              if (A === 0) return null;
              const naw = (i, s) => ` ${s < 0 ? "-" : "+"} (${Lx(g[i][0], g[i][1], lit)})`;
              const wyr = `${Lx(g[0][0], g[0][1], lit)}${naw(1, s2)}${naw(2, s3)}`;
              const bez = laczTex([[g[0][0], lit], [g[0][1], ""], [s2 * g[1][0], lit], [s2 * g[1][1], ""], [s3 * g[2][0], lit], [s3 * g[2][1], ""]]);
              return {
                tresc: `Uprość wyrażenie $${wyr}$. Podaj liczbę stojącą przy $${lit}$ i wyraz wolny (samą liczbę).`,
                pola: [pole("a", `Liczba przy $${lit}$ $=$`), pole("b", "Wyraz wolny $=$")],
                odpowiedz: { a: q(A), b: q(B) },
                wynik: `$${Lx(A, B, lit)}$`,
                rozwiazanie: [
                  "Opuszczamy nawiasy: przed nawiasem z plusem znaki zostają, a przed nawiasem z minusem zmieniają się na przeciwne.",
                  `$${bez}$.`,
                  `Wyrazy z $${lit}$: $${sumaLiczb([g[0][0], s2 * g[1][0], s3 * g[2][0]])} = ${A}$.`,
                  `Same liczby: $${sumaLiczb([g[0][1], s2 * g[1][1], s3 * g[2][1]])} = ${B}$.`,
                  `Wynik: $${Lx(A, B, lit)}$.`,
                ],
              };
            });
          },
        },
        {
          id: "wartosc-wyrazenia",
          nazwa: "Wartość wyrażenia",
          opis: "Wstaw liczbę za literę albo ułóż wyrażenie z krótkiej historyjki, a potem oblicz jego wartość.",
          generuj(r) {
            if (r.chance(0.45)) {
              const lit = r.pick(LITERY);
              const v = r.intBez(-6, 6, 0);
              if (r.chance()) {
                const a = r.pick([-1, 1]) * r.int(2, 7);
                const b = r.intBez(-9, 9, 0);
                const w = a * v + b;
                return {
                  tresc: `Oblicz wartość wyrażenia $${Lx(a, b, lit)}$ dla $${lit} = ${v}$.`,
                  pola: [pole("w", "Wartość $=$")],
                  odpowiedz: { w: q(w) },
                  wynik: `$${w}$`,
                  rozwiazanie: [
                    `Wstawiamy $${v}$ za $${lit}$${v < 0 ? " (liczbę ujemną w nawiasie)" : ""}: $${a} \\cdot ${texNawias(v)} ${plusMinus(b)}$.`,
                    `Mnożymy: $${a * v} ${plusMinus(b)} = ${w}$.`,
                  ],
                };
              }
              const a = r.int(1, 12);
              const b = r.int(2, 6);
              const w = a - b * v;
              return {
                tresc: `Oblicz wartość wyrażenia $${a} - ${b}${lit}$ dla $${lit} = ${v}$.`,
                pola: [pole("w", "Wartość $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Wstawiamy $${v}$ za $${lit}$${v < 0 ? " (liczbę ujemną w nawiasie)" : ""}: $${a} - ${b} \\cdot ${texNawias(v)}$.`,
                  `Mnożymy: $${a} ${plusMinus(-b * v)} = ${w}$.`,
                ],
              };
            }
            const [im1, im2] = r.pick(IMIONA);
            const t = r.int(0, 2);
            if (t === 0) {
              const k = r.int(2, 9);
              const m = r.int(2, 4);
              const n = r.int(4, 20);
              const w = n + (n + k) + m * n;
              return {
                tresc: `${im1} ma $x$ zł. ${im2} ma o $${k}$ zł więcej niż ${im1}, a ich koleżanka $${m}$ razy tyle co ${im1}. Ile złotych mają razem, gdy $x = ${n}$?`,
                pola: [pole("w", "Razem (zł) $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `${im2} ma $x+${k}$, a koleżanka $${m}x$. Razem: $x + (x+${k}) + ${m}x$.`,
                  `Dla $x = ${n}$: $${n} + (${n}+${k}) + ${m} \\cdot ${n} = ${n} + ${n + k} + ${m * n}$.`,
                  `$${n} + ${n + k} + ${m * n} = ${w}$.`,
                ],
              };
            }
            if (t === 1) {
              const k = r.int(1, 4);
              const a = r.int(2, 4);
              const b = r.int(2, 4);
              const n = r.int(k + 1, k + 8);
              const w = a * n + b * (n - k);
              return {
                tresc: `Zeszyt kosztuje $x$ zł, a długopis o $${k}$ zł mniej. Ile złotych zapłacimy za $${a}$ zeszyty i $${b}$ długopisy, gdy $x = ${n}$?`,
                pola: [pole("w", "Razem (zł) $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Cena długopisu: $x-${k}$. Za zeszyty zapłacimy $${a}x$, a za długopisy $${b}(x-${k})$.`,
                  `Dla $x = ${n}$: $${a} \\cdot ${n} + ${b} \\cdot (${n} - ${k}) = ${a * n} + ${b} \\cdot ${n - k}$.`,
                  `$${a * n} + ${b * (n - k)} = ${w}$.`,
                ],
              };
            }
            const k = r.int(2, 8);
            const n = r.int(2, 15);
            const w = 2 * n + 2 * (n + k);
            return {
              tresc: `Jeden bok prostokąta ma $x$ cm, a drugi o $${k}$ cm więcej. Ile centymetrów wynosi obwód prostokąta, gdy $x = ${n}$?`,
              pola: [pole("w", "Obwód (cm) $=$")],
              odpowiedz: { w: q(w) },
              wynik: `$${w}$`,
              rozwiazanie: [
                `Boki: $x$ i $x+${k}$. Obwód to $2x + 2(x+${k})$.`,
                `Dla $x = ${n}$: $2 \\cdot ${n} + 2 \\cdot (${n}+${k}) = ${2 * n} + 2 \\cdot ${n + k}$.`,
                `$${2 * n} + ${2 * (n + k)} = ${w}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Mnożenie sum algebraicznych
    {
      id: "mnozenie",
      nazwa: "Mnożenie sum algebraicznych",
      sciaga: [
        {
          nazwa: "Liczba razy nawias",
          slownie: "Liczbę stojącą przed nawiasem mnożymy przez każdy wyraz w nawiasie.",
          tex: "a(b+c)=ab+ac",
          litery: "$a$ – liczba przed nawiasem, $b$, $c$ – wyrazy w nawiasie.",
          przyklad: "$3(2x-5)=3\\cdot2x-3\\cdot5=6x-15$. Z minusem: $-2(x-3)=-2x+6$.",
          uwaga: "Pomnóż każdy wyraz, także ostatni. Minus razy minus daje plus: $-2\\cdot(-3)=6$.",
        },
        {
          nazwa: "Nawias razy nawias",
          slownie: "Każdy wyraz z pierwszego nawiasu mnożymy przez każdy wyraz z drugiego. Potem dodajemy wyrazy podobne.",
          tex: "(a+b)(c+d)=ac+ad+bc+bd",
          litery: "$a$, $b$ – wyrazy pierwszego nawiasu, $c$, $d$ – drugiego.",
          przyklad: "$(x+2)(x+5)=x\\cdot x+x\\cdot5+2\\cdot x+2\\cdot5=x^2+5x+2x+10=x^2+7x+10$.",
          uwaga: "Dwa wyrazy razy dwa wyrazy to $4$ iloczyny. Sprawdź, czy masz je wszystkie.",
        },
        {
          nazwa: "Ten sam nawias dwa razy",
          slownie: "Kwadrat sumy to ten sam nawias pomnożony przez siebie. Wyraz środkowy pojawia się dwa razy.",
          tex: "(a+b)^2=a^2+2ab+b^2\\qquad(a-b)^2=a^2-2ab+b^2",
          przyklad: "$(x+3)^2=(x+3)(x+3)=x^2+3x+3x+9=x^2+6x+9$.",
          uwaga: "$(x+3)^2$ to nie jest $x^2+9$. Brakuje wyrazu $6x$.",
        },
        {
          nazwa: "Suma razy różnica",
          slownie: "Gdy mnożymy $(a+b)$ przez $(a-b)$, wyrazy środkowe się znoszą i zostaje różnica kwadratów.",
          tex: "(a+b)(a-b)=a^2-b^2",
          przyklad: "$(x+4)(x-4)=x^2-4x+4x-16=x^2-16$.",
          uwaga: "Wyrazy $-4x$ i $+4x$ dają razem $0$, dlatego wyrazu z $x$ nie ma.",
        },
        {
          nazwa: "Sprytne rachunki",
          slownie: "Mnożenie nawiasów pomaga liczyć w pamięci. Rozbij liczbę na okrągłą i małą, np. $51=50+1$.",
          przyklad: "$51^2=(50+1)(50+1)=2500+50+50+1=2601$. Podobnie $49\\cdot51=(50-1)(50+1)=2500-1=2499$.",
          uwaga: "Rozbijaj tak, żeby jedna z liczb była okrągła (np. $20$, $50$, $100$).",
        },
      ],
      jak: [
        "Zapisz nawiasy i zobacz, ile wyrazów jest w każdym.",
        "Pomnóż każdy wyraz z jednego nawiasu przez każdy wyraz z drugiego (albo liczbę przez każdy wyraz w nawiasie). Uważaj na znaki.",
        "Zapisz wszystkie iloczyny, a dopiero potem dodaj wyrazy podobne.",
        "Sprawdź na jednej liczbie, np. dla $x=1$ wyrażenie przed i po wymnożeniu ma mieć tę samą wartość.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Jaką postać ma wyrażenie $3(2x-5)$ po wymnożeniu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6x-5$", "$5x-2$", "$6x-15$", "$6x+15$"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "Jaką postać ma wyrażenie $-2(x-4)$ po wymnożeniu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-2x-8$", "$-2x+8$", "$2x-8$", "$-2x+4$"],
          poprawna: 1,
        },
        {
          nr: "17",
          tresc: "Jaką postać ma wyrażenie $(x+3)(x+4)$ po wymnożeniu i uproszczeniu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$x^2+12$", "$x^2+7x+7$", "$2x+7$", "$x^2+7x+12$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "Któremu wyrażeniu jest równe $(x+5)^2$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$x^2+10x+25$", "$x^2+25$", "$x^2+5x+25$", "$x^2+10x+10$"],
          poprawna: 0,
        },
        {
          nr: "19",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$(x-2)(x+2)=x^2-4$", litery: "PF", poprawna: 0 },
            { tekst: "$(x-3)^2=x^2-9$", litery: "PF", poprawna: 1 },
            { tekst: "$2(x+1)-3(x-1)=-x+5$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Wymnóż nawiasy i uprość wyrażenie $(2x+1)(x-3)-2x^2$. **Zapisz obliczenia.**",
          rozwiazanie: "Mnożymy każdy wyraz z pierwszego nawiasu przez każdy wyraz z drugiego:\n\n$(2x+1)(x-3)=2x\\cdot x+2x\\cdot(-3)+1\\cdot x+1\\cdot(-3)=2x^2-6x+x-3$.\n\nDodajemy wyrazy podobne: $2x^2-5x-3$.\n\nOdejmujemy $2x^2$: $2x^2-5x-3-2x^2=-5x-3$.\n\nOdpowiedź: Wyrażenie jest równe $-5x-3$.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Prostokątny ogródek ma boki o długościach $(x+2)$ m i $(x+6)$ m. Zapisz pole ogródka jako sumę algebraiczną (po wymnożeniu nawiasów). Oblicz pole dla $x=4$ i sprawdź wynik, mnożąc długości boków. **Zapisz obliczenia.**",
          rozwiazanie: "Pole to iloczyn boków: $(x+2)(x+6)$.\n\nMnożymy każdy z każdym: $x\\cdot x+x\\cdot6+2\\cdot x+2\\cdot6=x^2+6x+2x+12=x^2+8x+12$.\n\nDla $x=4$: $4^2+8\\cdot4+12=16+32+12=60$.\n\nSprawdzenie: boki to $4+2=6$ m i $4+6=10$ m, więc pole to $6\\cdot10=60$.\n\nOdpowiedź: Pole ogródka to $x^2+8x+12$ m$^2$, czyli dla $x=4$ jest to $60$ m$^2$.",
        },
      ],
      generatory: [
        {
          id: "liczba-razy-nawias",
          nazwa: "Liczba razy nawias",
          opis: "Wymnóż liczby przez nawiasy, dodaj wyrazy podobne i podaj współczynnik przy literze oraz wyraz wolny.",
          generuj(r) {
            const lit = r.pick(LITERY);
            return probuj(() => {
              const gr = [0, 1].map(() => ({
                m: r.intBez(-5, 5, 0, 1, -1),
                a: r.intBez(-4, 4, 0),
                b: r.intBez(-7, 7, 0),
              }));
              const A = gr[0].m * gr[0].a + gr[1].m * gr[1].a;
              const B = gr[0].m * gr[0].b + gr[1].m * gr[1].b;
              if (A === 0) return null;
              const gtex = (g) => `${g.m}(${Lx(g.a, g.b, lit)})`;
              const drugi = `${gr[1].m < 0 ? "-" : "+"} ${Math.abs(gr[1].m)}(${Lx(gr[1].a, gr[1].b, lit)})`;
              const prod = (g) => [[g.m * g.a, lit], [g.m * g.b, ""]];
              return {
                tresc: `Wymnóż i uprość wyrażenie $${gtex(gr[0])} ${drugi}$. Podaj liczbę stojącą przy $${lit}$ i wyraz wolny (samą liczbę).`,
                pola: [pole("a", `Liczba przy $${lit}$ $=$`), pole("b", "Wyraz wolny $=$")],
                odpowiedz: { a: q(A), b: q(B) },
                wynik: `$${Lx(A, B, lit)}$`,
                rozwiazanie: [
                  `Liczbę przed nawiasem mnożymy przez każdy wyraz w nawiasie: $${gtex(gr[0])} = ${laczTex(prod(gr[0]))}$.`,
                  `Drugi nawias (ze znakiem przed nim): $${gr[1].m}(${Lx(gr[1].a, gr[1].b, lit)}) = ${laczTex(prod(gr[1]))}$.`,
                  `Wyrazy z $${lit}$: $${sumaLiczb([gr[0].m * gr[0].a, gr[1].m * gr[1].a])} = ${A}$. Same liczby: $${sumaLiczb([gr[0].m * gr[0].b, gr[1].m * gr[1].b])} = ${B}$.`,
                  `Wynik: $${Lx(A, B, lit)}$.`,
                ],
              };
            });
          },
        },
        {
          id: "nawias-razy-nawias",
          nazwa: "Nawias razy nawias",
          opis: "Wymnóż dwa nawiasy „każdy z każdym” i podaj trzy liczby: przy $x^2$, przy $x$ oraz wyraz wolny.",
          generuj(r) {
            const rodzaj = r.pick(["ogolny", "ogolny", "kwadrat", "roznica"]);
            return probuj(() => {
              const a = r.int(1, 3);
              const b = r.intBez(-6, 6, 0);
              let c = r.int(1, 3);
              let d = r.intBez(-6, 6, 0);
              if (rodzaj === "kwadrat") [c, d] = [a, b];
              if (rodzaj === "roznica") [c, d] = [a, -b];
              const P2 = a * c;
              const P1 = a * d + b * c;
              const P0 = b * d;
              const wyr = rodzaj === "kwadrat" ? `(${Lx(a, b)})^{2}` : `(${Lx(a, b)})(${Lx(c, d)})`;
              const cztery = laczTex([[P2, "x^{2}"], [a * d, "x"], [b * c, "x"], [P0, ""]]);
              const kroki = [];
              if (rodzaj === "kwadrat") kroki.push(`Kwadrat to ten sam nawias razy samego siebie: $${wyr} = (${Lx(a, b)})(${Lx(c, d)})$.`);
              kroki.push(`Mnożymy każdy wyraz z pierwszego nawiasu przez każdy wyraz z drugiego: $${cztery}$.`);
              kroki.push(`Wyrazy z $x$: $${sumaLiczb([a * d, b * c])} = ${P1}$.`);
              kroki.push(`Wynik: $${wielomianTex([P2, P1, P0])}$.`);
              return {
                tresc: `Wymnóż i uprość wyrażenie $${wyr}$. Podaj liczbę stojącą przy $x^2$, liczbę przy $x$ i wyraz wolny (samą liczbę).`,
                pola: [pole("a", "Liczba przy $x^2$ $=$"), pole("b", "Liczba przy $x$ $=$"), pole("c", "Wyraz wolny $=$")],
                odpowiedz: { a: q(P2), b: q(P1), c: q(P0) },
                wynik: `$${wielomianTex([P2, P1, P0])}$`,
                rozwiazanie: kroki,
              };
            });
          },
        },
        {
          id: "sprytne-mnozenie",
          nazwa: "Sprytne mnożenie",
          opis: "Oblicz w pamięci kwadrat liczby albo iloczyn dwóch bliskich liczb, rozbijając je na okrągłą liczbę i małą.",
          generuj(r) {
            const baza = r.pick([20, 30, 40, 50, 60, 70, 80, 90, 100]);
            if (r.chance()) {
              const e = r.int(1, 3);
              const s = r.znak();
              const n = baza + s * e;
              const w = n * n;
              const zn = s < 0 ? "-" : "+";
              return {
                tresc: `Oblicz w pamięci (rozbij liczbę na okrągłą i małą): $${n} \\cdot ${n}$.`,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Rozbijamy: $${n} = ${baza} ${zn} ${e}$, więc $${n} \\cdot ${n} = (${baza} ${zn} ${e})(${baza} ${zn} ${e})$.`,
                  `Mnożymy każdy z każdym: $${baza * baza} ${plusMinus(s * e * baza)} ${plusMinus(s * e * baza)} + ${e * e}$.`,
                  `Wynik: $${w}$.`,
                ],
              };
            }
            const e = r.int(1, 5);
            const w = baza * baza - e * e;
            return {
              tresc: `Oblicz w pamięci (rozbij liczby na okrągłą i małą): $${baza - e} \\cdot ${baza + e}$.`,
              pola: [pole("w", "Wynik $=$")],
              odpowiedz: { w: q(w) },
              wynik: `$${w}$`,
              rozwiazanie: [
                `Rozbijamy: $${baza - e} \\cdot ${baza + e} = (${baza} - ${e})(${baza} + ${e})$.`,
                `Mnożymy każdy z każdym: $${baza * baza} + ${baza * e} - ${baza * e} - ${e * e}$.`,
                `Dwa środkowe wyrazy się znoszą, więc zostaje $${baza * baza} - ${e * e} = ${w}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Równania
    {
      id: "rownania",
      nazwa: "Równania",
      sciaga: [
        {
          nazwa: "Równanie jak waga",
          slownie: "Równanie to waga w równowadze. To, co robimy z jedną stroną, robimy z drugą: dodajemy, odejmujemy, mnożymy lub dzielimy obie strony przez tę samą liczbę (nie przez zero). Rozwiązanie się nie zmienia.",
          przyklad: "$x+7=12$: odejmujemy $7$ i mamy $x=5$. $3x=12$: dzielimy przez $3$ i mamy $x=4$.",
          uwaga: "Dzielimy lub mnożymy całą stronę, a nie tylko jeden wyraz.",
        },
        {
          nazwa: "Równanie z nawiasami",
          slownie: "Opuść nawiasy i uporządkuj obie strony. Przenieś wyrazy z $x$ na jedną stronę, liczby na drugą (zmieniając znaki). Na końcu podziel przez liczbę stojącą przy $x$.",
          tex: "ax+b=cx+d\\qquad(a-c)x=d-b",
          litery: "$a$, $c$ – liczby przy $x$, $b$, $d$ – same liczby.",
          przyklad: "$2(x+3)=x+10$, czyli $2x+6=x+10$. Stąd $2x-x=10-6$, więc $x=4$. Sprawdzenie: $2\\cdot7=14$ i $4+10=14$.",
          uwaga: "Gdy wyraz przechodzi przez znak „$=$”, zmienia znak na przeciwny.",
        },
        {
          nazwa: "Proporcja",
          slownie: "Proporcja to równanie z dwoma ułamkami. Mnożymy na krzyż: licznik jednego ułamka razy mianownik drugiego.",
          tex: "\\frac{a}{b}=\\frac{c}{d}\\qquad a\\cdot d=b\\cdot c",
          litery: "$a$, $c$ – liczniki, $b$, $d$ – mianowniki.",
          przyklad: "$\\frac{x}{6}=\\frac{5}{2}$. Na krzyż: $2x=6\\cdot5=30$, więc $x=15$.",
          uwaga: "Mnożymy na krzyż (przekątnymi), a nie licznik przez licznik.",
        },
        {
          nazwa: "Zadanie z proporcją",
          slownie: "Gdy dwie wielkości rosną razem w tym samym tempie (np. kilogramy i cena), ich stosunek się nie zmienia. Zapisz proporcję i oblicz niewiadomą.",
          przyklad: "$4$ kg jabłek kosztuje $14$ zł. Ile kosztuje $6$ kg? $\\frac{4}{6}=\\frac{14}{x}$, więc $4x=84$ i $x=21$ zł.",
          uwaga: "Wielkości tego samego rodzaju zapisuj w tych samych miejscach: kilogramy nad kilogramami, złote nad złotymi.",
        },
        {
          nazwa: "Zadanie tekstowe",
          slownie: "Najpierw oznacz niewiadomą literą. Potem zapisz równanie z treści i je rozwiąż. Na końcu sprawdź wynik z treścią i odpowiedz na pytanie.",
          przyklad: "Suma trzech kolejnych liczb naturalnych to $48$. Liczby: $n$, $n+1$, $n+2$. Równanie: $3n+3=48$, więc $3n=45$ i $n=15$. Liczby: $15$, $16$, $17$.",
          uwaga: "Odpowiedz na pytanie z zadania. Gdy pytają o największą liczbę, to $n$ to jeszcze nie odpowiedź.",
        },
      ],
      jak: [
        "Oznacz niewiadomą literą i zapisz, co ona oznacza.",
        "Ułóż równanie z treści (lub opuść nawiasy w danym równaniu).",
        "Przenieś wyrazy z $x$ na jedną stronę, liczby na drugą. Podziel przez liczbę przy $x$.",
        "Sprawdź wynik, wstawiając go do równania lub do treści zadania. Zapisz odpowiedź zdaniem.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Jakie jest rozwiązanie równania $3x-7=11$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$18$", "$\\frac{4}{3}$", "$6$", "$-6$"],
          poprawna: 2,
        },
        {
          nr: "23",
          tresc: "Jakie jest rozwiązanie równania $2(x+4)=5x-4$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{8}{3}$", "$4$", "$-4$", "$12$"],
          poprawna: 1,
        },
        {
          nr: "24",
          tresc: "Jakie jest rozwiązanie proporcji $\\frac{4}{x}=\\frac{6}{9}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$\\frac{8}{3}$", "$9$", "$\\frac{27}{2}$"],
          poprawna: 0,
        },
        {
          nr: "25",
          tresc: "Na $4$ porcje naleśników potrzeba $300$ ml mleka. Ile mleka potrzeba na $10$ porcji? **Wybierz właściwą odpowiedź.**",
          opcje: ["$306$ ml", "$120$ ml", "$7500$ ml", "$750$ ml"],
          poprawna: 3,
        },
        {
          nr: "26",
          tresc: "Ania jest o $5$ lat starsza od Kuby. Razem mają $31$ lat. Ile lat ma Kuba? **Wybierz właściwą odpowiedź.**",
          opcje: ["$13$", "$18$", "$26$", "$15{,}5$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 3,
          tresc: "Rozwiąż równanie $4(x+1)-2(x-3)=x+15$ i sprawdź rozwiązanie. **Zapisz obliczenia.**",
          rozwiazanie: "Opuszczamy nawiasy: $4x+4-2x+6=x+15$.\n\nPo lewej stronie dodajemy wyrazy podobne: $2x+10=x+15$.\n\nPrzenosimy $x$ na lewo, a liczby na prawo (zmieniając znaki): $2x-x=15-10$.\n\nStąd $x=5$.\n\nSprawdzenie: lewa strona $4\\cdot6-2\\cdot2=24-4=20$, prawa strona $5+15=20$.\n\nOdpowiedź: $x=5$.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "Obwód trójkąta równoramiennego wynosi $38$ cm. Podstawa jest o $4$ cm krótsza od ramienia. Ile centymetrów ma ramię, a ile podstawa? **Zapisz obliczenia.**",
          rozwiazanie: "Niech $x$ oznacza długość ramienia (w cm). Wtedy podstawa ma $x-4$ cm.\n\nRamiona są dwa, więc obwód to $x+x+(x-4)=38$.\n\nUpraszczamy: $3x-4=38$, więc $3x=42$ i $x=14$.\n\nPodstawa: $14-4=10$.\n\nSprawdzenie: $14+14+10=38$.\n\nOdpowiedź: Ramię ma $14$ cm, a podstawa $10$ cm.",
        },
      ],
      generatory: [
        {
          id: "rownanie-liniowe",
          nazwa: "Równanie liniowe",
          opis: "Rozwiąż równanie z niewiadomą po obu stronach, z nawiasami lub z kilkoma nawiasami. Ułamek wpisz np. jako 7/2 lub 3,5.",
          generuj(r) {
            const forma = r.int(0, 2);
            return probuj(() => {
              let A, B, C, D, tekst, kr;
              if (forma === 0) {
                A = r.intBez(-7, 7, 0);
                C = r.intBez(-7, 7, 0, A);
                B = r.intBez(-12, 12, 0);
                D = r.intBez(-12, 12, 0);
                tekst = `${Lx(A, B)} = ${Lx(C, D)}`;
                kr = [];
              } else if (forma === 1) {
                const a = r.int(2, 6);
                const b = r.intBez(-8, 8, 0);
                A = a;
                B = a * b;
                C = r.intBez(-7, 7, 0, a);
                D = r.intBez(-15, 15, 0);
                tekst = `${a}(${Lx(1, b)}) = ${Lx(C, D)}`;
                kr = [`Opuszczamy nawias: $${Lx(A, B)} = ${Lx(C, D)}$.`];
              } else {
                const a = r.int(2, 6);
                const c = r.intBez(2, 5, a);
                const b = r.intBez(-6, 6, 0);
                const d = r.intBez(-6, 6, 0);
                A = a - c;
                B = a * b - c * d;
                C = 0;
                D = r.int(-12, 12);
                tekst = `${a}(${Lx(1, b)}) - ${c}(${Lx(1, d)}) = ${D}`;
                kr = [
                  `Opuszczamy nawiasy (przed drugim jest minus): $${laczTex([[a, "x"], [a * b, ""], [-c, "x"], [-c * d, ""]])} = ${D}$.`,
                  `Porządkujemy lewą stronę: $${Lx(A, B)} = ${D}$.`,
                ];
              }
              if (A - C === 0) return null;
              const x = q(D - B, A - C);
              if (Math.abs(x.n) > 40 || x.d > 2) return null;
              if (x.d > 1 && !r.chance(0.3)) return null;
              const krok1 = `Przenosimy wyrazy z $x$ na lewo, a liczby na prawo (zmieniając znaki): $${Lx(A - C, 0)} = ${D - B}$.`;
              const krok2 = A - C === 1
                ? `Zostaje $x = ${x.tex()}$.`
                : `Dzielimy obie strony przez $${A - C}$: $x = ${texNawias(D - B)} : ${texNawias(A - C)} = ${x.tex()}$.`;
              return {
                tresc: `Rozwiąż równanie $${tekst}$.`,
                pola: [pole("x", "$x =$")],
                odpowiedz: { x },
                wynik: `$x = ${x.tex()}$`,
                rozwiazanie: [...kr, krok1, krok2, `Sprawdzenie: po wstawieniu $x = ${x.tex()}$ obie strony równania są równe.`],
              };
            });
          },
        },
        {
          id: "proporcja",
          nazwa: "Proporcja",
          opis: "Rozwiąż proporcję (mnożenie na krzyż) albo oblicz niewiadomą w zadaniu o wielkościach proporcjonalnych.",
          generuj(r) {
            if (r.chance(0.5)) {
              const v = r.int(0, 2);
              return probuj(() => {
                const a = r.int(2, 12);
                const b = r.int(2, 12);
                const c = r.int(2, 12);
                const k = r.int(1, 8);
                let x, tekst, kr;
                if (v === 0) {
                  x = q(a * b, c);
                  tekst = `\\frac{x}{${a}} = \\frac{${b}}{${c}}`;
                  kr = [`Mnożymy na krzyż: $${c}x = ${a} \\cdot ${b} = ${a * b}$.`, `Dzielimy przez $${c}$: $x = ${a * b} : ${c} = ${x.tex()}$.`];
                } else if (v === 1) {
                  x = q(a * c, b);
                  tekst = `\\frac{${a}}{x} = \\frac{${b}}{${c}}`;
                  kr = [`Mnożymy na krzyż: $${b}x = ${a} \\cdot ${c} = ${a * c}$.`, `Dzielimy przez $${b}$: $x = ${a * c} : ${b} = ${x.tex()}$.`];
                } else {
                  x = q(a * b, c).sub(k);
                  tekst = `\\frac{x+${k}}{${a}} = \\frac{${b}}{${c}}`;
                  kr = [
                    `Mnożymy na krzyż: $${c}(x+${k}) = ${a} \\cdot ${b} = ${a * b}$.`,
                    `Dzielimy przez $${c}$: $x+${k} = ${a * b} : ${c} = ${q(a * b, c).tex()}$.`,
                    `Odejmujemy $${k}$: $x = ${q(a * b, c).tex()} - ${k} = ${x.tex()}$.`,
                  ];
                }
                if (x.d > 2 || Math.abs(x.n) > 60 || x.n <= 0) return null;
                return {
                  tresc: `Rozwiąż proporcję $${tekst}$. Ułamek wpisz np. jako 7/2 lub 3,5.`,
                  pola: [pole("x", "$x =$")],
                  odpowiedz: { x },
                  wynik: `$x = ${x.tex()}$`,
                  rozwiazanie: kr,
                };
              });
            }
            const HIST = [
              { t: (a, b, c) => `Do deseru dla $${a}$ osób potrzeba $${b}$ ml mleka. Ile mililitrów mleka potrzeba na taki sam deser dla $${c}$ osób?`, et: "Mleko (ml) $=$", b: [4, 24], mn: 50, m1: "osoby", m2: "mleko" },
              { t: (a, b, c) => `$${a}$ kg jabłek kosztuje $${b}$ zł. Ile złotych zapłacimy za $${c}$ kg takich jabłek?`, et: "Cena (zł) $=$", b: [6, 40], mn: 1, m1: "kilogramy", m2: "złote" },
              { t: (a, b, c) => `Rowerzysta w ciągu $${a}$ min przejeżdża $${b}$ km. Ile kilometrów przejedzie w ciągu $${c}$ min, jadąc tak samo szybko?`, et: "Kilometry $=$", b: [2, 9], mn: 1, m1: "minuty", m2: "kilometry" },
            ];
            const h = r.pick(HIST);
            return probuj(() => {
              const a = r.pick([2, 3, 4, 5, 6, 8, 10]);
              const b = r.int(h.b[0], h.b[1]) * h.mn;
              const c = r.int(2, 15);
              if (c === a) return null;
              const x = q(b * c, a);
              if (x.d > 2) return null;
              return {
                tresc: h.t(a, b, c),
                pola: [pole("x", h.et)],
                odpowiedz: { x },
                wynik: `$${dz(x)}$`,
                rozwiazanie: [
                  `Zapisujemy proporcję (${h.m1} nad ${h.m1}, ${h.m2} nad ${h.m2}): $\\frac{${a}}{${c}} = \\frac{${b}}{x}$.`,
                  `Mnożymy na krzyż: $${a}x = ${b} \\cdot ${c} = ${b * c}$.`,
                  `Dzielimy przez $${a}$: $x = ${b * c} : ${a} = ${dz(x)}$.`,
                ],
              };
            });
          },
        },
        {
          id: "zadanie-tekstowe",
          nazwa: "Zadanie z treści",
          opis: "Ułóż równanie do zadania tekstowego (liczby, pieniądze, wiek, obwód) i je rozwiąż.",
          generuj(r) {
            const t = r.int(0, 5);
            const [im1, im2] = r.pick(IMIONA);
            if (t === 0) {
              const a = r.int(2, 9);
              const x0 = r.int(2, 15);
              const b = r.int(1, 20);
              const c = a * x0 + b;
              return {
                tresc: `Pewną liczbę pomnożono przez $${a}$ i dodano $${b}$. Otrzymano $${c}$. Jaka to liczba?`,
                pola: [pole("x", "Liczba $=$")],
                odpowiedz: { x: q(x0) },
                wynik: `$${x0}$`,
                rozwiazanie: [
                  "Niech $x$ oznacza szukaną liczbę.",
                  `Równanie z treści: $${a}x + ${b} = ${c}$.`,
                  `Odejmujemy $${b}$ od obu stron: $${a}x = ${c - b}$.`,
                  `Dzielimy przez $${a}$: $x = ${c - b} : ${a} = ${x0}$.`,
                  `Sprawdzenie: $${a} \\cdot ${x0} + ${b} = ${c}$.`,
                ],
              };
            }
            if (t === 1) {
              const x0 = r.int(5, 30);
              const k = r.int(2, 15);
              const S = 2 * x0 + k;
              return {
                tresc: `${im1} i ${im2} mają razem $${S}$ zł. ${im2} ma o $${k}$ zł więcej niż ${im1}. Ile złotych ma ${im1}?`,
                pola: [pole("x", `Złote $=$`)],
                odpowiedz: { x: q(x0) },
                wynik: `$${x0}$`,
                rozwiazanie: [
                  `Niech $x$ oznacza, ile złotych ma ${im1}. Wtedy ${im2} ma $x+${k}$.`,
                  `Równanie z treści: $x + (x+${k}) = ${S}$, czyli $2x + ${k} = ${S}$.`,
                  `Odejmujemy $${k}$: $2x = ${S - k}$.`,
                  `Dzielimy przez $2$: $x = ${S - k} : 2 = ${x0}$.`,
                  `Sprawdzenie: ${im2} ma $${x0 + k}$ zł, a razem $${x0} + ${x0 + k} = ${S}$.`,
                ],
              };
            }
            if (t === 2) {
              const x0 = r.int(5, 60);
              const S = 3 * x0 + 3;
              const najw = r.chance();
              return {
                tresc: `Suma trzech kolejnych liczb naturalnych wynosi $${S}$. Jaka jest ${najw ? "największa" : "najmniejsza"} z tych liczb?`,
                pola: [pole("x", "Liczba $=$")],
                odpowiedz: { x: q(najw ? x0 + 2 : x0) },
                wynik: `$${najw ? x0 + 2 : x0}$`,
                rozwiazanie: [
                  "Niech $x$ będzie najmniejszą z liczb. Kolejne to $x+1$ i $x+2$.",
                  `Równanie z treści: $x + (x+1) + (x+2) = ${S}$, czyli $3x + 3 = ${S}$.`,
                  `Odejmujemy $3$: $3x = ${S - 3}$, więc $x = ${S - 3} : 3 = ${x0}$.`,
                  `Liczby to $${x0}$, $${x0 + 1}$ i $${x0 + 2}$.`,
                  `Odpowiedź: ${najw ? "największa" : "najmniejsza"} to $${najw ? x0 + 2 : x0}$.`,
                ],
              };
            }
            if (t === 3) {
              const x0 = r.int(3, 20);
              const k = r.int(2, 9);
              const P = 4 * x0 + 2 * k;
              return {
                tresc: `Obwód prostokąta wynosi $${P}$ cm. Jeden bok jest o $${k}$ cm dłuższy od drugiego. Ile centymetrów ma krótszy bok?`,
                pola: [pole("x", "Bok (cm) $=$")],
                odpowiedz: { x: q(x0) },
                wynik: `$${x0}$`,
                rozwiazanie: [
                  `Niech $x$ oznacza krótszy bok. Dłuższy ma $x+${k}$.`,
                  `Równanie z treści: $2x + 2(x+${k}) = ${P}$, czyli $4x + ${2 * k} = ${P}$.`,
                  `Odejmujemy $${2 * k}$: $4x = ${P - 2 * k}$.`,
                  `Dzielimy przez $4$: $x = ${P - 2 * k} : 4 = ${x0}$.`,
                  `Sprawdzenie: boki $${x0}$ i $${x0 + k}$, obwód $2 \\cdot ${x0} + 2 \\cdot ${x0 + k} = ${P}$.`,
                ],
              };
            }
            if (t === 4) {
              const d = r.int(6, 14);
              const x0 = r.int(2, 9);
              const m = 2 * d + x0;
              // „22 lata”, ale „25 lat”: bierzemy tylko wiek, przy którym pasuje słowo „lat”
              if ([2, 3, 4].includes(m % 10) && ![12, 13, 14].includes(m % 100)) return this.generuj(r);
              return {
                tresc: `Mama ma $${m}$ lat, a jej córka $${d}$ lat. Za ile lat mama będzie dwa razy starsza od córki?`,
                pola: [pole("x", "Za ile lat $=$")],
                odpowiedz: { x: q(x0) },
                wynik: `$${x0}$`,
                rozwiazanie: [
                  "Niech $x$ oznacza, za ile lat to nastąpi. Wtedy mama będzie miała $" + m + "+x$ lat, a córka $" + d + "+x$ lat.",
                  `Równanie z treści: $${m} + x = 2(${d} + x)$.`,
                  `Opuszczamy nawias: $${m} + x = ${2 * d} + 2x$.`,
                  `Przenosimy: $${m} - ${2 * d} = 2x - x$, więc $x = ${x0}$.`,
                  `Sprawdzenie: po $${x0}$ latach mama będzie mieć $${m + x0}$, a córka $${d + x0}$, i rzeczywiście $2 \\cdot ${d + x0} = ${m + x0}$.`,
                ],
              };
            }
            const x0 = r.int(5, 25);
            const k = r.int(2, 10);
            const S = 4 * x0 + k;
            return {
              tresc: `Babcia podzieliła $${S}$ zł między troje wnucząt. ${im1} dostała najmniej, ${im2} dwa razy tyle co ${im1}, a Celina o $${k}$ zł więcej niż ${im1}. Ile złotych dostała ${im1}?`,
              pola: [pole("x", "Złote $=$")],
              odpowiedz: { x: q(x0) },
              wynik: `$${x0}$`,
              rozwiazanie: [
                `Niech $x$ oznacza, ile dostała ${im1}. Wtedy ${im2} dostał $2x$, a Celina $x+${k}$.`,
                `Równanie z treści: $x + 2x + (x+${k}) = ${S}$, czyli $4x + ${k} = ${S}$.`,
                `Odejmujemy $${k}$: $4x = ${S - k}$.`,
                `Dzielimy przez $4$: $x = ${S - k} : 4 = ${x0}$.`,
                `Sprawdzenie: $${x0} + ${2 * x0} + ${x0 + k} = ${S}$.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
