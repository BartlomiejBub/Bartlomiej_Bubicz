// Klasa 2 (liceum i technikum) · rozdział 2 „Wartość bezwzględna” – Matematyka 2, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Zgodnie z podstawą programową od 2024 r. nie ma tu nierówności z wartością bezwzględną (lekcja 2.4 usunięta).
import { q, plusMinus, texNawias } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** „Ładna” odpowiedź: mianownik co najwyżej 12. */
const ladna = (v) => Math.abs(v.n) <= 100000 && v.d <= 12;

/** Współczynnik przed niewiadomą: 1 się pomija, -1 zostaje jako minus. */
const wsp = (n) => (n === 1 ? "" : n === -1 ? "-" : String(n));

/** Wyrażenie ax + b (a, b całkowite) w LaTeX: lin(2, -3) = "2x - 3", lin(-1, 4) = "-x + 4", lin(0, 5) = "5". */
function lin(a, b) {
  if (a === 0) return String(b);
  const pierwszy = `${wsp(a)}x`;
  return b === 0 ? pierwszy : `${pierwszy} ${plusMinus(b)}`;
}

/** Wyrażenie x - p w LaTeX (p całkowite): xm(3) = "x - 3", xm(-2) = "x + 2", xm(0) = "x". */
const xm = (p) => lin(1, -p);

/** Wartość bezwzględna liczby wymiernej. */
const abs = (v) => (v.ujemna ? v.neg() : v);

/** Liczba całkowita albo połówka, np. -3, 5/2, -7/2. */
const liczba = (r, max = 12) => (r.chance(0.6) ? q(r.int(-max, max)) : q(r.int(-2 * max + 1, 2 * max - 1), 2));

/** Nazwy punktów na osi liczbowej. */
const NAZWY_PUNKTOW = [["A", "B"], ["K", "L"], ["P", "R"]];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 2.1
    {
      id: "definicja",
      nazwa: "Wartość bezwzględna liczby rzeczywistej",
      sciaga: [
        {
          nazwa: "Definicja",
          slownie: "Wartość bezwzględna liczby to jej odległość od zera na osi liczbowej. Liczby dodatniej i zera nie zmienia, a przy liczbie ujemnej zmienia znak na przeciwny.",
          tex: "|a|=a\\ \\text{ dla }a\\geq 0\\qquad|a|=-a\\ \\text{ dla }a<0",
          litery: "$a$ – dowolna liczba rzeczywista.",
          przyklad: "$|5|=5$, $|0|=0$, $|-7|=7$.",
          uwaga: "Wartość bezwzględna nigdy nie jest ujemna. Zapis $-a$ nie musi być ujemny: dla $a=-7$ jest $-a=7$.",
        },
        {
          nazwa: "Własności",
          slownie: "Liczby przeciwne mają tę samą wartość bezwzględną. Wartość bezwzględna iloczynu i ilorazu to iloczyn i iloraz wartości bezwzględnych.",
          tex: "|a|\\geq 0\\qquad|-a|=|a|\\qquad|a\\cdot b|=|a|\\cdot|b|\\qquad\\left|\\frac{a}{b}\\right|=\\frac{|a|}{|b|}",
          litery: "$a$, $b$ – liczby rzeczywiste, w ostatnim wzorze $b\\neq 0$.",
          przyklad: "$|-3\\cdot 4|=|-12|=12$ oraz $|-3|\\cdot|4|=3\\cdot 4=12$.",
          uwaga: "Dla sumy nie ma takiej reguły: $|3+(-5)|=2$, ale $|3|+|-5|=8$.",
        },
        {
          nazwa: "Pierwiastek z kwadratu",
          slownie: "Pierwiastek arytmetyczny jest nieujemny, więc pierwiastek z kwadratu liczby to jej wartość bezwzględna.",
          tex: "\\sqrt{a^2}=|a|",
          litery: "$a$ – dowolna liczba rzeczywista.",
          przyklad: "$\\sqrt{(-4)^2}=\\sqrt{16}=4=|-4|$.",
          uwaga: "Równość $\\sqrt{a^2}=a$ jest prawdziwa tylko dla $a\\geq 0$.",
        },
        {
          nazwa: "Wyrażenie z niewiadomą pod modułem",
          slownie: "Gdy pod wartością bezwzględną jest wyrażenie z $x$, sprawdź jego znak. Dla wyrażenia nieujemnego pomiń moduł, dla ujemnego zmień znaki wszystkich jego składników.",
          tex: "|x-3|=x-3\\ \\text{ dla }x\\geq 3\\qquad|x-3|=3-x\\ \\text{ dla }x<3",
          przyklad: "Dla $x=1$ jest $x<3$, więc $|x-3|=3-x=2$. Rzeczywiście $|1-3|=|-2|=2$.",
          uwaga: "Zmiana znaku dotyczy całego wyrażenia: $-(x-3)=-x+3$, a nie $-x-3$.",
        },
      ],
      jak: [
        "Policz wyrażenie pod wartością bezwzględną (albo ustal jego znak, gdy zawiera $x$).",
        "Jeśli jest nieujemne, opuść moduł bez zmian; jeśli ujemne, zmień znak całego wyrażenia.",
        "Dopiero potem wykonuj pozostałe działania – kolejność: najpierw moduł, potem mnożenie, na końcu dodawanie i odejmowanie.",
        "Przy $x$ w przedziale sprawdź znak dla każdego modułu osobno.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Wartość wyrażenia $|-7| - |2 - 5|$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-4$", "$10$", "$4$", "$-10$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Liczba $|\\sqrt{2} - 3|$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\sqrt{2} - 3$", "$3 - \\sqrt{2}$", "$3 + \\sqrt{2}$", "$-\\sqrt{2} - 3$"],
          poprawna: 1,
        },
        {
          nr: "3",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$|-4| = -4$", litery: "PF", poprawna: 1 },
            { tekst: "$|-3| + |3| = 6$", litery: "PF", poprawna: 0 },
            { tekst: "$|-2 + 5| = |-2| + |5|$", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "4",
          tresc: "Wyrażenie $\\sqrt{(2 - \\sqrt{5})^2}$ jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$2 - \\sqrt{5}$", "$\\sqrt{5} + 2$", "$-2 - \\sqrt{5}$", "$\\sqrt{5} - 2$"],
          poprawna: 3,
        },
        {
          nr: "5",
          tresc: "Dla $x < -1$ wyrażenie $|x + 1|$ jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-x - 1$", "$x + 1$", "$-x + 1$", "$x - 1$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Oblicz wartość wyrażenia $|3 - 7| \\cdot |-2| - |5 - (-1)|$. **Zapisz obliczenia.**",
          rozwiazanie: "Liczymy wyrażenia pod modułami: $3 - 7 = -4$ oraz $5 - (-1) = 6$.\n\nWartości bezwzględne: $|-4| = 4$, $|-2| = 2$, $|6| = 6$.\n\nPodstawiamy: $4 \\cdot 2 - 6 = 8 - 6 = 2$.\n\nOdpowiedź: $2$.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Dla $-3 < x < 2$ uprość wyrażenie $|x - 2| + |x + 3|$. **Zapisz obliczenia.**",
          rozwiazanie: "Dla $x < 2$ wyrażenie $x - 2$ jest ujemne, więc $|x - 2| = -(x - 2) = -x + 2$.\n\nDla $x > -3$ wyrażenie $x + 3$ jest dodatnie, więc $|x + 3| = x + 3$.\n\nSuma: $(-x + 2) + (x + 3) = 5$.\n\nOdpowiedź: $5$ (wartość nie zależy od $x$).",
        },
      ],
      generatory: [
        {
          id: "definicja-wyrazenie",
          nazwa: "Wartość wyrażenia",
          opis: "Oblicz wartość wyrażenia z dwiema wartościami bezwzględnymi liczb całkowitych lub ułamków.",
          generuj(r) {
            const wyraz = () => {
              for (;;) {
                const a = liczba(r, 9);
                if (r.chance(0.45)) {
                  return { zapis: `|${a.tex()}|`, A: abs(a), krok: `|${a.tex()}| = ${abs(a).tex()}` };
                }
                const b = liczba(r, 9);
                const v = a.sub(b);
                if (v.zero) continue;
                return {
                  zapis: `|${a.tex()} - ${texNawias(b)}|`,
                  A: abs(v),
                  krok: `|${a.tex()} - ${texNawias(b)}| = |${v.tex()}| = ${abs(v).tex()}`,
                };
              }
            };
            for (;;) {
              const T1 = wyraz(), T2 = wyraz();
              const m1 = r.chance(0.35) ? r.int(2, 3) : 1, m2 = r.chance(0.35) ? r.int(2, 3) : 1;
              const lead = r.chance(0.25) ? -1 : 1;
              const s2 = r.chance() ? 1 : -1;
              const w = T1.A.mul(m1 * lead).add(T2.A.mul(m2 * s2));
              if (w.zero || Math.abs(Number(w)) > 100 || !ladna(w)) continue;
              const op = s2 > 0 ? "+" : "-";
              const zapis = `${lead < 0 ? "-" : ""}${m1 > 1 ? m1 : ""}${T1.zapis} ${op} ${m2 > 1 ? m2 : ""}${T2.zapis}`;
              const licz = (m, A) => `${m > 1 ? `${m}\\cdot ` : ""}${A.tex()}`;
              return {
                tresc: `Oblicz wartość wyrażenia $${zapis}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
                odpowiedz: { w },
                wynik: `$${w.tex()}$`,
                rozwiazanie: [
                  `Liczymy każdą wartość bezwzględną: $${T1.krok}$ oraz $${T2.krok}$.`,
                  `Podstawiamy: $${lead < 0 ? "-" : ""}${licz(m1, T1.A)} ${op} ${licz(m2, T2.A)}$.`,
                  `Po wykonaniu działań: $${w.tex()}$.`,
                ],
              };
            }
          },
        },
        {
          id: "definicja-opuszczanie",
          nazwa: "Opuszczanie modułu",
          opis: "Dla podanego przedziału zmiennej x uprość sumę lub różnicę dwóch wartości bezwzględnych.",
          generuj(r) {
            for (;;) {
              const a = r.int(-6, 6), b = r.int(-6, 6);
              if (a === b) continue;
              const lo = Math.min(a, b), hi = Math.max(a, b);
              const reg = r.int(0, 2);
              const s2 = r.chance(0.6) ? 1 : -1;
              const op = s2 > 0 ? "+" : "-";
              const sigma = (p) => (reg === 0 ? -1 : reg === 1 ? 1 : p === lo ? 1 : -1);
              const war = reg === 0 ? `x < ${lo}` : reg === 1 ? `x > ${hi}` : `${lo} < x < ${hi}`;
              const wynik = (s1, s2x) => lin(s1 + s2 * s2x, -(s1 * a + s2 * s2x * b));
              const s1 = sigma(a), s2x = sigma(b);
              const poprawny = wynik(s1, s2x);
              const zle = [[1, 1], [1, -1], [-1, 1], [-1, -1]].filter(([u, v]) => u !== s1 || v !== s2x).map(([u, v]) => wynik(u, v));
              const opcje = [poprawny, ...zle];
              if (new Set(opcje).size !== 4) continue;
              const kolejnosc = r.shuffle([0, 1, 2, 3]);
              const krok = (p) => {
                const s = sigma(p);
                const X = xm(p);
                return s > 0
                  ? `$${X} > 0$, więc $|${X}| = ${X}$`
                  : `$${X} < 0$, więc $|${X}| = -${p === 0 ? "x" : `(${X})`} = ${lin(-1, p)}$`;
              };
              return {
                tresc: `Dla $${war}$ uprość wyrażenie $|${xm(a)}| ${op} |${xm(b)}|$.`,
                pola: [{ id: "w", typ: "wybor", etykieta: "Wyrażenie jest równe", opcje: kolejnosc.map((i) => `$${opcje[i]}$`) }],
                odpowiedz: { w: kolejnosc.indexOf(0) },
                wynik: `$${poprawny}$`,
                rozwiazanie: [
                  `Dla $${war}$: ${krok(a)} oraz ${krok(b)}.`,
                  `Zatem wyrażenie jest równe $${lin(s1, -s1 * a)} ${op} (${lin(s2x, -s2x * b)})$.`,
                  `Po uproszczeniu: $${poprawny}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 2.2
    {
      id: "odleglosc",
      nazwa: "Odległość między liczbami na osi liczbowej",
      sciaga: [
        {
          nazwa: "Odległość dwóch liczb",
          slownie: "Odległość punktów o współrzędnych $a$ i $b$ na osi liczbowej to wartość bezwzględna ich różnicy. Kolejność odejmowania nie ma znaczenia.",
          tex: "|AB|=|a-b|=|b-a|",
          litery: "$A$, $B$ – punkty na osi, $a$, $b$ – ich współrzędne.",
          przyklad: "Dla $A=-2$ i $B=5$: $|AB|=|-2-5|=|-7|=7$.",
          uwaga: "Dla liczb po tej samej stronie zera nie dodawaj modułów: odległość liczb $-6$ i $-2$ to $|-6-(-2)|=4$, a nie $6+2$.",
        },
        {
          nazwa: "Zapis |x − a| jako odległość",
          slownie: "Zapis $|x-a|$ oznacza odległość liczby $x$ od liczby $a$. Zapis $|x|$ to odległość $x$ od zera.",
          przyklad: "$|x-4|$ to odległość $x$ od $4$. Dla $x=1$ wynosi $3$.",
          uwaga: "$|x+2|=|x-(-2)|$ to odległość od $-2$, a nie od $2$.",
        },
        {
          nazwa: "Równanie |x − a| = d",
          slownie: "Liczby oddalone od $a$ o $d$ leżą po obu stronach $a$ na osi: na lewo i na prawo.",
          tex: "|x-a|=d,\\ d>0\\qquad x=a-d\\ \\text{ lub }\\ x=a+d",
          litery: "$a$ – liczba, od której mierzymy odległość, $d$ – odległość.",
          przyklad: "$|x-3|=5$ daje $x=3-5=-2$ lub $x=3+5=8$.",
          uwaga: "Dla $d=0$ jest jedno rozwiązanie $x=a$, a dla $d<0$ nie ma żadnego, bo odległość nie bywa ujemna.",
        },
        {
          nazwa: "Liczba równo oddalona od dwóch liczb",
          slownie: "Liczba o jednakowej odległości od $a$ i $b$ leży w środku między nimi: jest ich średnią arytmetyczną.",
          tex: "|x-a|=|x-b|\\qquad x=\\frac{a+b}{2}",
          przyklad: "Liczba równo oddalona od $-3$ i $9$ to $\\frac{-3+9}{2}=3$. Obie odległości wynoszą $6$.",
          uwaga: "Nie dziel odległości przez $2$ zamiast sumy liczb: środek $-3$ i $9$ to nie $6$.",
        },
      ],
      jak: [
        "Zapisz, czyja odległość od czyjej jest szukana, i narysuj w myślach oś liczbową.",
        "Odległość dwóch liczb to wartość bezwzględna ich różnicy: $|a-b|$.",
        "Gdy szukasz liczb w danej odległości $d$ od $a$, odejmij i dodaj $d$ do $a$.",
        "Sprawdź wynik: odległości od obu liczb mają wyjść takie, jak w treści.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Odległość między punktami osi liczbowej o współrzędnych $-3$ i $5$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$", "$8$", "$15$", "$5$"],
          poprawna: 1,
        },
        {
          nr: "9",
          tresc: "Zbiorem wszystkich liczb, których odległość od liczby $2$ na osi liczbowej jest równa $5$, jest: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\{-3,\\,7\\}$", "$\\{-5,\\,5\\}$", "$\\{-7,\\,3\\}$", "$\\{7\\}$"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "Wyrażenie $|x + 3|$ oznacza odległość liczby $x$ od liczby: **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$4$", "$-3$", "$-4$"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Odległość liczb $-4$ i $-9$ jest równa $13$.", litery: "PF", poprawna: 1 },
            { tekst: "Liczby $-2$ i $8$ są jednakowo oddalone od liczby $3$.", litery: "PF", poprawna: 0 },
            { tekst: "Równanie $|x - 1| = -2$ ma dwa rozwiązania.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "12",
          tresc: "Liczba jednakowo oddalona od liczb $-7$ i $3$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-4$", "$2$", "$5$", "$-2$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Na osi liczbowej punkt $A$ ma współrzędną $-4$, a punkt $B$ współrzędną $6$. Wyznacz współrzędne wszystkich punktów $C$, których odległość od punktu $A$ wynosi $3$, i oblicz dla każdego z nich $|BC|$. **Zapisz obliczenia.**",
          rozwiazanie: "Punkty w odległości $3$ od $-4$ spełniają równanie $|x + 4| = 3$, czyli $x = -4 - 3 = -7$ lub $x = -4 + 3 = -1$.\n\nDla $C = -7$: $|BC| = |6 - (-7)| = 13$.\n\nDla $C = -1$: $|BC| = |6 - (-1)| = 7$.\n\nOdpowiedź: $C = -7$ i $|BC| = 13$ albo $C = -1$ i $|BC| = 7$.",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "Punkt $P$ leży na osi liczbowej w jednakowej odległości od punktów o współrzędnych $-5$ i $9$. Oblicz współrzędną punktu $P$ i jego odległość od każdego z tych punktów. **Zapisz obliczenia.**",
          rozwiazanie: "Punkt równo oddalony od dwóch punktów leży w środku odcinka między nimi: $x = \\frac{-5 + 9}{2} = 2$.\n\nOdległość od punktu $-5$: $|2 - (-5)| = 7$.\n\nOdległość od punktu $9$: $|2 - 9| = |-7| = 7$ – odległości są równe.\n\nOdpowiedź: $P = 2$, a odległość od każdego z punktów wynosi $7$.",
        },
      ],
      generatory: [
        {
          id: "odleglosc-os",
          nazwa: "Odległość i środek",
          opis: "Oblicz odległość dwóch punktów na osi liczbowej albo liczbę jednakowo oddaloną od dwóch liczb.",
          generuj(r) {
            for (;;) {
              const a = liczba(r), b = liczba(r);
              if (a.eq(b)) continue;
              const [P, R] = r.pick(NAZWY_PUNKTOW);
              if (r.chance(0.55)) {
                const d = abs(a.sub(b));
                if (!ladna(d)) continue;
                const oba = a.sub(b);
                return {
                  tresc: `Na osi liczbowej punkt $${P}$ ma współrzędną $${a.tex()}$, a punkt $${R}$ współrzędną $${b.tex()}$. Oblicz odległość $|${P}${R}|$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: `$|${P}${R}| =$` }],
                  odpowiedz: { w: d },
                  wynik: `$|${P}${R}| = ${d.tex()}$`,
                  rozwiazanie: [
                    `Odległość to wartość bezwzględna różnicy współrzędnych: $|${P}${R}| = |a - b|$.`,
                    `Podstawiamy: $|${a.tex()} - ${texNawias(b)}| = |${oba.tex()}|$.`,
                    `Stąd $|${P}${R}| = ${d.tex()}$.`,
                  ],
                };
              }
              const x = a.add(b).div(2);
              if (!ladna(x)) continue;
              const lewo = (c) => `|x ${c.ujemna ? "+" : "-"} ${abs(c).tex()}|`;
              const rownanie = a.zero || b.zero ? null : `${lewo(a)} = ${lewo(b)}`;
              return {
                tresc: `Liczba $x$ jest jednakowo oddalona od liczb $${a.tex()}$ i $${b.tex()}$ na osi liczbowej. Oblicz $x$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$x =$" }],
                odpowiedz: { w: x },
                wynik: `$x = ${x.tex()}$`,
                rozwiazanie: [
                  `Liczba jednakowo oddalona od dwóch liczb leży w środku między nimi: $x = \\frac{a + b}{2}$.`,
                  `Podstawiamy: $x = \\frac{${a.tex()} + ${texNawias(b)}}{2} = \\frac{${a.add(b).tex()}}{2}$.`,
                  `Stąd $x = ${x.tex()}$${rownanie ? `, czyli spełnione jest $${rownanie}$` : ""}.`,
                ],
              };
            }
          },
        },
        {
          id: "odleglosc-punkty",
          nazwa: "Liczby w danej odległości",
          opis: "Znajdź dwie liczby, których odległość od danej liczby jest równa d (albo rozwiąż równanie |x − a| = d).",
          generuj(r) {
            for (;;) {
              const a = liczba(r, 10);
              const d = r.chance(0.7) ? q(r.int(1, 9)) : q(r.int(1, 9) * 2 - 1, 2);
              const lewy = a.sub(d), prawy = a.add(d);
              if (!ladna(lewy) || !ladna(prawy)) continue;
              const rownanie = r.chance(0.5);
              const X = a.calkowita ? xm(a.n) : `x ${a.ujemna ? "+" : "-"} ${abs(a).tex()}`;
              return {
                tresc: rownanie
                  ? `Rozwiąż równanie $|${X}| = ${d.tex()}$.`
                  : `Podaj wszystkie liczby, których odległość od liczby $${a.tex()}$ na osi liczbowej jest równa $${d.tex()}$.`,
                pola: [{ id: "x", typ: "zbior", ile: 2, etykieta: rownanie ? "Rozwiązania równania" : "Szukane liczby" }],
                odpowiedz: { x: [lewy, prawy] },
                wynik: `$x = ${lewy.tex()}$ lub $x = ${prawy.tex()}$`,
                rozwiazanie: [
                  `Wyrażenie $|${X}|$ oznacza odległość liczby $x$ od liczby $${a.tex()}$, a ta odległość ma być równa $${d.tex()}$.`,
                  `Szukane liczby leżą po obu stronach liczby $${a.tex()}$: $x = ${a.tex()} - ${d.tex()}$ lub $x = ${a.tex()} + ${d.tex()}$.`,
                  `Stąd $x = ${lewy.tex()}$ lub $x = ${prawy.tex()}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 2.3
    {
      id: "rownania",
      nazwa: "Proste równania z wartością bezwzględną",
      sciaga: [
        {
          nazwa: "Równanie |x| = c",
          slownie: "Wartość bezwzględna równa się liczbie dodatniej dla dwóch liczb: tej liczby i liczby przeciwnej. Dla zera jest jedno rozwiązanie, a dla liczby ujemnej żadnego.",
          tex: "c>0:\\ x=-c\\ \\text{ lub }\\ x=c\\qquad c=0:\\ x=0\\qquad c<0:\\ \\text{brak rozwiązań}",
          przyklad: "$|x|=4$ daje $x=-4$ lub $x=4$. Równanie $|x|=-4$ nie ma rozwiązań.",
          uwaga: "Nie ma liczby o ujemnej wartości bezwzględnej, więc przy prawej stronie ujemnej od razu piszemy: brak rozwiązań.",
        },
        {
          nazwa: "Równanie |ax + b| = c",
          slownie: "Dla $c>0$ wyrażenie pod modułem jest równe $c$ albo $-c$. Rozwiąż oba równania liniowe.",
          tex: "|ax+b|=c,\\ c>0\\qquad ax+b=c\\ \\text{ lub }\\ ax+b=-c",
          litery: "$a\\neq 0$, $b$ – liczby, $c$ – liczba dodatnia.",
          przyklad: "$|2x-1|=5$: z $2x-1=5$ jest $x=3$, a z $2x-1=-5$ jest $x=-2$.",
          uwaga: "Przeciwną liczbą jest cała prawa strona: drugie równanie to $ax+b=-c$, a nie $ax-b=c$.",
        },
        {
          nazwa: "Moduł z dodatkami",
          slownie: "Gdy przy module jest współczynnik albo składnik, najpierw zostaw moduł samotnie po jednej stronie, a dopiero potem rozbij na dwa równania.",
          przyklad: "$3|x-2|+1=10$ daje $3|x-2|=9$, więc $|x-2|=3$ i $x=-1$ lub $x=5$.",
          uwaga: "Dzieląc przez współczynnik, nie ruszaj wnętrza modułu: z $3|x-2|=9$ jest $|x-2|=3$, a nie $|x-\\frac{2}{3}|=3$.",
        },
        {
          nazwa: "Dwa moduły",
          slownie: "Dwie wartości bezwzględne są równe, gdy wyrażenia pod nimi są równe albo przeciwne.",
          tex: "|A|=|B|\\qquad A=B\\ \\text{ lub }\\ A=-B",
          litery: "$A$, $B$ – wyrażenia (np. $x+2$ i $2x-1$).",
          przyklad: "$|x+2|=|2x-1|$: z $x+2=2x-1$ jest $x=3$, a z $x+2=-(2x-1)$ jest $x=-\\frac{1}{3}$.",
          uwaga: "Przy zmianie znaku weź w nawias całe wyrażenie: $-(2x-1)=-2x+1$.",
        },
      ],
      jak: [
        "Zostaw wartość bezwzględną samą po jednej stronie równania (przenieś składniki, podziel przez współczynnik).",
        "Sprawdź prawą stronę: ujemna – brak rozwiązań; zero – jedno rozwiązanie; dodatnia – dwa przypadki.",
        "Zapisz dwa równania: wyrażenie pod modułem równa się $c$ oraz równa się $-c$.",
        "Rozwiąż oba równania i sprawdź wyniki, podstawiając do równania wyjściowego.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Zbiorem rozwiązań równania $|x - 5| = 3$ jest: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\{-8,\\,-2\\}$", "$\\{3,\\,5\\}$", "$\\{2,\\,8\\}$", "$\\{8\\}$"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "Rozwiązaniami równania $|2x + 1| = 7$ są liczby: **Wybierz właściwą odpowiedź.**",
          opcje: ["$x = 3$", "$x = 3$ lub $x = -3$", "$x = 4$ lub $x = -3$", "$x = 3$ lub $x = -4$"],
          poprawna: 3,
        },
        {
          nr: "17",
          tresc: "Ile rozwiązań ma równanie $|x + 4| + 2 = 1$? **Wybierz właściwą odpowiedź.**",
          opcje: ["jedno", "żadnego", "dwa", "cztery"],
          poprawna: 1,
        },
        {
          nr: "18",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Równanie $|x| = -3$ ma dwa rozwiązania.", litery: "PF", poprawna: 1 },
            { tekst: "Równanie $|x - 2| = |x + 2|$ ma rozwiązanie $x = 0$.", litery: "PF", poprawna: 0 },
            { tekst: "Liczba $1$ spełnia równanie $|3x - 1| = 2$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "19",
          tresc: "Najmniejszym rozwiązaniem równania $2|x - 1| - 3 = 5$ jest liczba: **Wybierz właściwą odpowiedź.**",
          opcje: ["$1$", "$-3$", "$-7$", "$-5$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Rozwiąż równanie $|3x - 2| = 10$. **Zapisz obliczenia.**",
          rozwiazanie: "Prawa strona jest dodatnia, więc $3x - 2 = 10$ lub $3x - 2 = -10$.\n\nZ pierwszego równania: $3x = 12$, więc $x = 4$.\n\nZ drugiego równania: $3x = -8$, więc $x = -\\frac{8}{3}$.\n\nOdpowiedź: $x = 4$ lub $x = -\\frac{8}{3}$.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Rozwiąż równanie $|x + 2| = |2x - 1|$. **Zapisz obliczenia.**",
          rozwiazanie: "Wartości bezwzględne są równe, gdy wyrażenia pod nimi są równe albo przeciwne: $x + 2 = 2x - 1$ lub $x + 2 = -(2x - 1)$.\n\nPierwsze równanie: $x + 2 = 2x - 1$, więc $x = 3$.\n\nDrugie równanie: $x + 2 = -2x + 1$, więc $3x = -1$ i $x = -\\frac{1}{3}$.\n\nSprawdzenie: dla $x = 3$ obie strony są równe $5$, a dla $x = -\\frac{1}{3}$ obie są równe $\\frac{5}{3}$.\n\nOdpowiedź: $x = 3$ lub $x = -\\frac{1}{3}$.",
        },
      ],
      generatory: [
        {
          id: "rownania-rozwiaz",
          nazwa: "Rozwiąż równanie",
          opis: "Rozwiąż równanie postaci |ax + b| = c albo k|x − p| + m = n, które ma dwa rozwiązania.",
          generuj(r) {
            if (r.chance(0.5)) {
              const a = r.int(1, 5) * (r.chance(0.25) ? -1 : 1);
              const b = r.int(-9, 9);
              const c = r.int(1, 12);
              const L = lin(a, b);
              const x1 = q(c - b, a), x2 = q(-c - b, a);
              const [mniejsze, wieksze] = x1.cmp(x2) < 0 ? [x1, x2] : [x2, x1];
              return {
                tresc: `Rozwiąż równanie $|${L}| = ${c}$.`,
                pola: [{ id: "x", typ: "zbior", ile: 2, etykieta: "Rozwiązania równania" }],
                odpowiedz: { x: [mniejsze, wieksze] },
                wynik: `$x = ${mniejsze.tex()}$ lub $x = ${wieksze.tex()}$`,
                rozwiazanie: [
                  `Prawa strona jest dodatnia, więc $${L} = ${c}$ lub $${L} = -${c}$.`,
                  a === 1
                    ? `Z pierwszego równania: $x = ${x1.tex()}$.`
                    : `Z pierwszego równania: $${wsp(a)}x = ${c - b}$, więc $x = ${x1.tex()}$.`,
                  a === 1
                    ? `Z drugiego równania: $x = ${x2.tex()}$.`
                    : `Z drugiego równania: $${wsp(a)}x = ${-c - b}$, więc $x = ${x2.tex()}$.`,
                ],
              };
            }
            const k = r.int(2, 5), p = r.int(-8, 8), m = r.int(-6, 6), d = r.int(1, 9);
            const n = k * d + m;
            const X = xm(p);
            return {
              tresc: `Rozwiąż równanie $${k}|${X}|${m === 0 ? "" : ` ${plusMinus(m)}`} = ${n}$.`,
              pola: [{ id: "x", typ: "zbior", ile: 2, etykieta: "Rozwiązania równania" }],
              odpowiedz: { x: [q(p - d), q(p + d)] },
              wynik: `$x = ${p - d}$ lub $x = ${p + d}$`,
              rozwiazanie: [
                `Zostawiamy moduł samotnie po lewej stronie: $${k}|${X}| = ${n - m}$, więc $|${X}| = ${d}$.`,
                `Wyrażenie pod modułem jest równe $${d}$ albo $-${d}$: $${X} = ${d}$ lub $${X} = -${d}$.`,
                `Stąd $x = ${p + d}$ lub $x = ${p - d}$.`,
              ],
            };
          },
        },
        {
          id: "rownania-liczba",
          nazwa: "Ile rozwiązań",
          opis: "Rozstrzygnij, czy równanie z wartością bezwzględną nie ma rozwiązań, ma jedno czy dwa.",
          generuj(r) {
            const o = r.int(0, 2);
            const NAZWY = ["brak rozwiązań", "jedno rozwiązanie", "dwa rozwiązania"];
            const pole = { id: "l", typ: "wybor", etykieta: "Liczba rozwiązań", opcje: NAZWY };
            if (r.chance(0.5)) {
              const a = r.int(1, 5) * (r.chance(0.25) ? -1 : 1);
              const b = r.int(-9, 9);
              const c = o === 0 ? -r.int(1, 9) : o === 1 ? 0 : r.int(1, 9);
              const L = lin(a, b);
              const kroki = [
                [`Wartość bezwzględna nie przyjmuje wartości ujemnych, a po prawej stronie jest $${c}$.`, "Zatem równanie nie ma rozwiązań."],
                [`Wartość bezwzględna jest równa $0$ tylko wtedy, gdy wyrażenie pod nią jest równe $0$.`, `Z $${L} = 0$ mamy $x = ${q(-b, a).tex()}$, więc jest jedno rozwiązanie.`],
                [`Prawa strona jest dodatnia, więc $${L} = ${c}$ lub $${L} = -${c}$.`, `Każde z tych równań liniowych ma jedno rozwiązanie ($x = ${q(c - b, a).tex()}$ i $x = ${q(-c - b, a).tex()}$), więc są dwa rozwiązania.`],
              ][o];
              return {
                tresc: `Ile rozwiązań ma równanie $|${L}| = ${c}$?`,
                pola: [pole],
                odpowiedz: { l: o },
                wynik: NAZWY[o],
                rozwiazanie: kroki,
              };
            }
            const k = r.int(2, 5), p = r.int(-8, 8), m = r.int(-6, 6);
            const d = o === 0 ? -r.int(1, 6) : o === 1 ? 0 : r.int(1, 6);
            const n = k * d + m;
            const X = xm(p);
            const kroki = [
              `Zostawiamy moduł samotnie po lewej stronie: $${k}|${X}| = ${n - m}$, więc $|${X}| = ${d}$.`,
              [
                `Wartość bezwzględna nie jest ujemna, a po prawej stronie jest $${d}$, więc równanie nie ma rozwiązań.`,
                `Wartość bezwzględna jest równa $0$ tylko dla $${X} = 0$, czyli $x = ${p}$ – jedno rozwiązanie.`,
                `Prawa strona jest dodatnia: $${X} = ${d}$ lub $${X} = -${d}$, czyli $x = ${p + d}$ lub $x = ${p - d}$ – dwa rozwiązania.`,
              ][o],
            ];
            return {
              tresc: `Ile rozwiązań ma równanie $${k}|${X}|${m === 0 ? "" : ` ${plusMinus(m)}`} = ${n}$?`,
              pola: [pole],
              odpowiedz: { l: o },
              wynik: NAZWY[o],
              rozwiazanie: kroki,
            };
          },
        },
      ],
    },
  ],
};
