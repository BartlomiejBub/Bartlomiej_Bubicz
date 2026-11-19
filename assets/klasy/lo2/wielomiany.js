// Klasa 2 (liceum i technikum) · rozdział 8 „Wielomiany” – Matematyka 2, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q, wielomianTex, plusMinus, nawiasMinus, texNawias } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** Wielomian z tablicy współczynników (od najwyższej potęgi) w LaTeX. */
const wt = (w) => wielomianTex(w);

/** Współczynnik przed literą: 1 się pomija. */
const wsp = (n) => (n === 1 ? "" : String(n));

/** Składnik do doklejenia po innym: skladnik(-3, "x") = " - 3x", skladnik(1, "x") = " + x", skladnik(0) = "". */
const skladnik = (c, lit = "") => {
  if (c === 0) return "";
  const a = Math.abs(c);
  return ` ${c < 0 ? "-" : "+"} ${a === 1 && lit ? "" : a}${lit}`;
};

/** Suma zapisana z odpowiednimi znakami: suma(["3x", "-2", "5"]) = "3x - 2 + 5". */
const suma = (t) => t.map((s, i) => (i === 0 ? s : s.startsWith("-") ? ` - ${s.slice(1)}` : ` + ${s}`)).join("");

/** Czynnik liniowy x - r w postaci rozwiązywanej: liniowy(3) = "x - 3", liniowy(-2) = "x + 2", liniowy(0) = "x". */
const liniowy = (r) => (r === 0 ? "x" : `x ${plusMinus(-r)}`);

/** Wyraz jednomianu c·x^k w LaTeX. */
const jedn = (c, k) => wt([c, ...Array(k).fill(0)]);

const padd = (a, b) => {
  const n = Math.max(a.length, b.length);
  const A = [...Array(n - a.length).fill(0), ...a];
  const B = [...Array(n - b.length).fill(0), ...b];
  return A.map((x, i) => x + B[i]);
};
const pneg = (a) => a.map((x) => -x);
const psub = (a, b) => padd(a, pneg(b));
const pmul = (a, b) => {
  const o = Array(a.length + b.length - 1).fill(0);
  a.forEach((x, i) => b.forEach((y, j) => { o[i + j] += x * y; }));
  return o;
};
/** Współczynnik przy x^k. */
const wspPrzy = (w, k) => w[w.length - 1 - k] ?? 0;
const jestZerem = (w) => w.every((c) => c === 0);

/** Opis szukanego współczynnika. */
const opisWsp = (k) => (k === 0 ? "wyraz wolny" : k === 1 ? "współczynnik przy $x$" : `współczynnik przy $x^${k}$`);

/** Zbiór pierwiastków w LaTeX, rosnąco. */
const zbiorTex = (roots) => `\\{${[...roots].sort((a, b) => a.cmp(b)).map((v) => v.tex()).join(", ")}\\}`;

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 8.1
    {
      id: "pojecie",
      nazwa: "Wielomiany jednej zmiennej",
      sciaga: [
        {
          nazwa: "Wielomian i jego stopień",
          slownie: "Wielomian zmiennej $x$ to suma jednomianów postaci $a_kx^k$, w których wykładnik $k$ jest liczbą naturalną. Stopień wielomianu to najwyższa potęga $x$ z niezerowym współczynnikiem.",
          tex: "W(x)=a_nx^n+\\ldots+a_1x+a_0\\qquad a_n\\neq0",
          litery: "$n$ – stopień, $a_n$ – współczynnik wiodący, $a_0$ – wyraz wolny, $a_k$ – współczynnik przy $x^k$.",
          przyklad: "$W(x)=3x^4-2x^2+x-5$ ma stopień $4$, współczynnik wiodący $3$ i wyraz wolny $-5$. Brak $x^3$ oznacza współczynnik $0$.",
          uwaga: "Wyrażenia $\\frac{1}{x}$, $\\sqrt{x}$ i $2^x$ nie są wielomianami – wykładnik przy $x$ musi być liczbą naturalną.",
        },
        {
          nazwa: "Wartość wielomianu",
          slownie: "Wartość wielomianu dla liczby $a$ to liczba $W(a)$, którą dostajemy po podstawieniu $a$ w miejsce każdego $x$. Liczby ujemne wstawiaj w nawiasie.",
          tex: "W(a)=a_na^n+\\ldots+a_1a+a_0",
          przyklad: "Dla $W(x)=x^3-2x+1$: $W(-2)=(-2)^3-2\\cdot(-2)+1=-8+4+1=-3$.",
          uwaga: "Pilnuj znaków: $(-2)^2=4$, ale $-2^2=-4$.",
        },
        {
          nazwa: "Wyraz wolny i suma współczynników",
          slownie: "Wyraz wolny to wartość wielomianu dla $x=0$, a suma wszystkich współczynników – wartość dla $x=1$. Dzięki temu nie trzeba wymnażać nawiasów.",
          tex: "W(0)=a_0\\qquad W(1)=a_n+\\ldots+a_0",
          przyklad: "Dla $W(x)=(2x-1)(x+3)$: $W(0)=(-1)\\cdot3=-3$, a suma współczynników to $W(1)=1\\cdot4=4$. Po wymnożeniu $W(x)=2x^2+5x-3$ i $2+5-3=4$.",
        },
      ],
      jak: [
        "Zapisz wielomian w kolejności malejących potęg. Najwyższa potęga z niezerowym współczynnikiem to stopień.",
        "Brakujące potęgi mają współczynnik $0$ – nie pomiń ich, porównując lub czytając współczynniki.",
        "Obliczając $W(a)$, wstaw $a$ w nawiasie w miejsce każdego $x$ i wykonaj działania w kolejności: potęgi, mnożenie, dodawanie.",
        "Gdy pytają o wyraz wolny albo sumę współczynników, podstaw $x=0$ albo $x=1$ zamiast wymnażać.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Stopień wielomianu $W(x)=5x^3-x^4+2x-7$ jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$4$", "$5$", "$7$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Wartość wielomianu $W(x)=2x^3-3x^2+x-4$ dla $x=-1$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$-6$", "$4$", "$-10$", "$-4$"],
          poprawna: 2,
        },
        {
          nr: "3",
          tresc: "Dany jest wielomian $W(x)=x^3-4x^2+x+6$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wielomian $W$ jest stopnia czwartego.", litery: "PF", poprawna: 1 },
            { tekst: "$W(0)=6$", litery: "PF", poprawna: 0 },
            { tekst: "$W(-1)=2$", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "4",
          tresc: "Które z podanych wyrażeń jest wielomianem zmiennej $x$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$x^3-\\frac{1}{x}+2$", "$\\sqrt{x}+x^2$", "$2^x+x$", "$3x^2-5x+\\sqrt{2}$"],
          poprawna: 3,
        },
        {
          nr: "5",
          tresc: "Dla jakiej wartości $m$ wielomian $W(x)=(m-3)x^3+4x^2-x$ jest wielomianem stopnia drugiego? **Wybierz właściwą odpowiedź.**",
          opcje: ["$m=3$", "$m=-3$", "$m=4$", "$m\\neq3$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Dany jest wielomian $W(x)=2x^3-x^2+ax+6$. Wiadomo, że $W(2)=22$. Wyznacz $a$ i oblicz $W(-1)$. **Zapisz obliczenia.**",
          rozwiazanie: "Z warunku $W(2)=22$: $W(2)=2\\cdot2^3-2^2+2a+6=16-4+2a+6=18+2a$.\n\nZ równania $18+2a=22$ dostajemy $a=2$, więc $W(x)=2x^3-x^2+2x+6$.\n\n$W(-1)=2\\cdot(-1)^3-(-1)^2+2\\cdot(-1)+6=-2-1-2+6=1$.\n\nOdpowiedź: $a=2$, $W(-1)=1$.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Dany jest wielomian $W(x)=x^3+px^2-2x+q$. Wiadomo, że $W(0)=-4$ i $W(1)=0$. Wyznacz $p$ i $q$, a następnie oblicz $W(-1)$. **Zapisz obliczenia.**",
          rozwiazanie: "Wyraz wolny to $W(0)$, więc $q=-4$.\n\nZ warunku $W(1)=0$: $1+p-2-4=0$, czyli $p-5=0$ i $p=5$.\n\nWięc $W(x)=x^3+5x^2-2x-4$.\n\n$W(-1)=-1+5+2-4=2$.\n\nOdpowiedź: $p=5$, $q=-4$, $W(-1)=2$.",
        },
      ],
      generatory: [
        {
          id: "pojecie-wartosc",
          nazwa: "Wartość wielomianu",
          opis: "Oblicz wartość wielomianu stopnia 3 albo 4 dla podanej liczby całkowitej.",
          generuj(r) {
            for (;;) {
              const st = r.int(3, 4);
              const w = [r.intBez(-3, 3, 0)];
              for (let i = 1; i <= st; i++) w.push(r.int(-5, 5));
              if (w.filter((c) => c !== 0).length < 3) continue;
              const a = r.intBez(-3, 3, 0);
              const L = r.pick(["W", "P", "Q"]);
              const skl = [];
              const wart = [];
              w.forEach((c, i) => {
                if (c === 0) return;
                const k = st - i;
                const abs = Math.abs(c);
                const baza = `${texNawias(a)}${k > 1 ? `^{${k}}` : ""}`;
                const cialo = k === 0 ? `${abs}` : `${abs === 1 ? "" : `${abs}\\cdot `}${baza}`;
                skl.push(`${c < 0 ? "-" : ""}${cialo}`);
                wart.push(String(c * a ** k));
              });
              const wynik = w.reduce((s, c) => s * a + c, 0);
              return {
                tresc: `Dany jest wielomian $${L}(x) = ${wt(w)}$. Oblicz $${L}(${a})$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `$${L}(${a}) =$` }],
                odpowiedz: { w: q(wynik) },
                wynik: `$${L}(${a}) = ${wynik}$`,
                rozwiazanie: [
                  `Podstawiamy $x = ${a}$ w miejsce każdego $x$${a < 0 ? " (liczbę ujemną bierzemy w nawias)" : ""}: $${L}(${a}) = ${suma(skl)}$.`,
                  `Obliczamy potęgi i iloczyny: $${L}(${a}) = ${suma(wart)}$.`,
                  `Dodajemy: $${L}(${a}) = ${wynik}$.`,
                ],
              };
            }
          },
        },
        {
          id: "pojecie-suma-wsp",
          nazwa: "Suma współczynników",
          opis: "Oblicz sumę współczynników albo wyraz wolny wielomianu danego w postaci iloczynu – bez wymnażania nawiasów.",
          generuj(r) {
            const A = [1, 1, 2, 3];
            const czynniki = [0, 1, 2].map(() => [r.pick(A), r.intBez(-4, 4, 0)]);
            const sumaWsp = r.chance();
            const zapis = czynniki.map(([a, b]) => `(${wsp(a)}x ${plusMinus(b)})`).join("");
            const wartosci = czynniki.map(([a, b]) => (sumaWsp ? a + b : b));
            const wynik = wartosci.reduce((s, v) => s * v, 1);
            const podst = czynniki.map(([a, b]) => (sumaWsp ? `(${a} ${plusMinus(b)})` : `(${a}\\cdot 0 ${plusMinus(b)})`)).join("");
            return {
              tresc: `Dany jest wielomian $W(x) = ${zapis}$. Oblicz ${sumaWsp ? "sumę jego współczynników" : "jego wyraz wolny"}.`,
              pola: [{ id: "w", typ: "liczba", etykieta: sumaWsp ? "Suma współczynników" : "Wyraz wolny" }],
              odpowiedz: { w: q(wynik) },
              wynik: `$${wynik}$`,
              rozwiazanie: [
                sumaWsp
                  ? "Suma współczynników wielomianu to jego wartość dla $x = 1$, więc nie trzeba wymnażać nawiasów."
                  : "Wyraz wolny wielomianu to jego wartość dla $x = 0$, więc nie trzeba wymnażać nawiasów.",
                `$W(${sumaWsp ? 1 : 0}) = ${podst}$.`,
                `$W(${sumaWsp ? 1 : 0}) = ${wartosci.map((v) => texNawias(v)).join("\\cdot ")} = ${wynik}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 8.2
    {
      id: "dzialania",
      nazwa: "Dodawanie, odejmowanie i mnożenie wielomianów",
      sciaga: [
        {
          nazwa: "Dodawanie i odejmowanie",
          slownie: "Dodając lub odejmując wielomiany, łączymy wyrazy podobne, czyli te z tą samą potęgą $x$. Minus przed nawiasem zmienia znak każdego składnika w nawiasie.",
          przyklad: "$(2x^3-x+4)-(x^3+3x-1)=2x^3-x+4-x^3-3x+1=x^3-4x+5$.",
          uwaga: "Po opuszczeniu nawiasu z minusem zmień znaki wszystkich składników, także ostatniego.",
        },
        {
          nazwa: "Mnożenie wielomianów",
          slownie: "Mnożymy każdy składnik jednego wielomianu przez każdy składnik drugiego, a potem łączymy wyrazy podobne.",
          przyklad: "$(x-2)(x^2+3x-1)=x^3+3x^2-x-2x^2-6x+2=x^3+x^2-7x+2$.",
          uwaga: "Współczynniki mnożymy, a wykładniki dodajemy: $x\\cdot x^2=x^3$. Nie pomiń żadnego iloczynu.",
        },
        {
          nazwa: "Stopień sumy i iloczynu",
          slownie: "Stopień iloczynu niezerowych wielomianów to suma ich stopni. Stopień sumy lub różnicy nie jest większy niż większy ze stopni, a bywa mniejszy, gdy najwyższe wyrazy się znoszą.",
          tex: "\\operatorname{st}(WP)=\\operatorname{st}W+\\operatorname{st}P\\qquad\\operatorname{st}(W\\pm P)\\leq\\max(\\operatorname{st}W,\\operatorname{st}P)",
          przyklad: "$(x^3+x)-(x^3-2)=x+2$ ma stopień $1$, a $(x^2+1)(x^3-2)$ ma stopień $2+3=5$.",
          uwaga: "Stopnie przy mnożeniu się dodają, nie mnożą: wielomiany stopnia $2$ i $3$ dają stopień $5$, nie $6$.",
        },
      ],
      jak: [
        "Przy odejmowaniu zamknij drugi wielomian w nawiasie i zmień znaki wszystkich jego składników.",
        "Przy mnożeniu zapisz wszystkie iloczyny składnik po składniku, a dopiero potem łącz wyrazy podobne.",
        "Uporządkuj wynik od najwyższej potęgi i sprawdź, czy najwyższe wyrazy się nie zniosły.",
        "Stopień iloczynu znajdziesz bez mnożenia: dodaj stopnie czynników.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Dane są wielomiany $W(x)=x^2-3x+1$ i $P(x)=2x^2+x-4$. Wielomian $W(x)+P(x)$ jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$3x^4-2x^2-3$", "$3x^2-4x-3$", "$3x^2-2x+5$", "$3x^2-2x-3$"],
          poprawna: 3,
        },
        {
          nr: "9",
          tresc: "Dane są wielomiany $W(x)=x^2-3x+1$ i $P(x)=2x^2+x-4$. Wielomian $W(x)-P(x)$ jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$-x^2-4x+5$", "$-x^2-2x-3$", "$x^2+4x-5$", "$-x^2-4x-3$"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "Wielomian $(x-3)(x^2+2x-1)$ jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$x^3-x^2-7x-3$", "$x^3-x^2-5x+3$", "$x^3-x^2-7x+3$", "$x^3+x^2-7x+3$"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "Stopień wielomianu $W(x)=(x^3-2x)(x^2+5)-x^5$ jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$5$", "$6$", "$1$"],
          poprawna: 0,
        },
        {
          nr: "12",
          tresc: "Dane są wielomiany $W(x)=x^3+x$ i $P(x)=2-x^3$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Stopień wielomianu $W+P$ jest równy $3$.", litery: "PF", poprawna: 1 },
            { tekst: "Stopień wielomianu $W\\cdot P$ jest równy $6$.", litery: "PF", poprawna: 0 },
            { tekst: "Stopień wielomianu $W-P$ jest równy $3$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Wykonaj działania i uporządkuj wielomian: $(x+2)(x^2-2x+4)-(x^3-3x^2)$. Podaj stopień otrzymanego wielomianu. **Zapisz obliczenia.**",
          rozwiazanie: "$(x+2)(x^2-2x+4)=x^3-2x^2+4x+2x^2-4x+8=x^3+8$.\n\nOdejmujemy drugi wielomian, zmieniając znaki jego składników: $x^3+8-x^3+3x^2=3x^2+8$.\n\nOdpowiedź: $3x^2+8$, wielomian stopnia $2$.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Dane są wielomiany $W(x)=2x^2-x$ i $P(x)=x^2+3x-2$. Wyznacz wielomian $2W(x)-P(x)\\cdot(x-1)$ i podaj jego stopień. **Zapisz obliczenia.**",
          rozwiazanie: "$2W(x)=4x^2-2x$.\n\n$P(x)\\cdot(x-1)=x^3+3x^2-2x-x^2-3x+2=x^3+2x^2-5x+2$.\n\nOdejmujemy: $4x^2-2x-x^3-2x^2+5x-2=-x^3+2x^2+3x-2$.\n\nOdpowiedź: $-x^3+2x^2+3x-2$, wielomian stopnia $3$.",
        },
      ],
      generatory: [
        {
          id: "dzialania-suma",
          nazwa: "Suma lub różnica",
          opis: "Dodaj albo odejmij dwa wielomiany i podaj wskazany współczynnik wyniku.",
          generuj(r) {
            for (;;) {
              const W = [r.intBez(-4, 4, 0), r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)];
              const P = r.chance() ? [r.intBez(-4, 4, 0), r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)] : [r.intBez(-4, 4, 0), r.int(-5, 5), r.int(-5, 5)];
              const plus = r.chance();
              const wyn = plus ? padd(W, P) : psub(W, P);
              const k = r.int(0, 3);
              const c = wspPrzy(wyn, k);
              if (jestZerem(wyn) || c === 0) continue;
              const znak = plus ? "+" : "-";
              const rozwiazanie = [`$W(x) ${znak} P(x) = (${wt(W)}) ${znak} (${wt(P)})$.`];
              if (!plus) rozwiazanie.push(`Opuszczamy nawias poprzedzony minusem i zmieniamy znaki jego składników: $-(${wt(P)}) = ${wt(pneg(P))}$.`);
              rozwiazanie.push(`Łączymy wyrazy podobne: $W(x) ${znak} P(x) = ${wt(wyn)}$.`);
              rozwiazanie.push(`${k === 0 ? "Wyraz wolny" : k === 1 ? "Współczynnik przy $x$" : `Współczynnik przy $x^${k}$`} jest równy $${c}$.`);
              return {
                tresc: `Dane są wielomiany $W(x) = ${wt(W)}$ i $P(x) = ${wt(P)}$. Oblicz ${opisWsp(k)} wielomianu $W(x) ${znak} P(x)$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Szukana liczba" }],
                odpowiedz: { w: q(c) },
                wynik: `$${c}$`,
                rozwiazanie,
              };
            }
          },
        },
        {
          id: "dzialania-iloczyn",
          nazwa: "Iloczyn wielomianów",
          opis: "Wymnóż dwumian przez trójmian i podaj wskazany współczynnik iloczynu.",
          generuj(r) {
            for (;;) {
              const a = r.pick([1, 2, 3]), b = r.intBez(-4, 4, 0);
              const c = r.pick([1, 2, 3]), d = r.intBez(-4, 4, 0), e = r.intBez(-4, 4, 0);
              const wyn = pmul([a, b], [c, d, e]);
              const k = r.int(0, 3);
              const wsp_k = wspPrzy(wyn, k);
              if (wsp_k === 0) continue;
              const skladniki = [jedn(a * c, 3), jedn(a * d, 2), jedn(a * e, 1), jedn(b * c, 2), jedn(b * d, 1), jedn(b * e, 0)];
              return {
                tresc: `Wymnóż wielomiany $${wsp(a)}x ${plusMinus(b)}$ i $${wt([c, d, e])}$ i podaj ${opisWsp(k)} otrzymanego wielomianu.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Szukana liczba" }],
                odpowiedz: { w: q(wsp_k) },
                wynik: `$${wsp_k}$`,
                rozwiazanie: [
                  `Mnożymy każdy składnik pierwszego nawiasu przez każdy składnik drugiego: $(${wsp(a)}x ${plusMinus(b)})(${wt([c, d, e])}) = ${suma(skladniki)}$.`,
                  `Łączymy wyrazy podobne: $${wt(wyn)}$.`,
                  `${k === 0 ? "Wyraz wolny" : k === 1 ? "Współczynnik przy $x$" : `Współczynnik przy $x^${k}$`} jest równy $${wsp_k}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 8.3
    {
      id: "rownosc",
      nazwa: "Równość wielomianów",
      sciaga: [
        {
          nazwa: "Kiedy wielomiany są równe",
          slownie: "Dwa wielomiany są równe, gdy mają ten sam stopień i równe współczynniki przy każdej potędze $x$. Brak wyrazu oznacza współczynnik $0$.",
          tex: "W=P\\iff a_n=b_n,\\ \\ldots,\\ a_0=b_0",
          litery: "$a_k$ – współczynniki wielomianu $W$, $b_k$ – współczynniki wielomianu $P$ przy tych samych potęgach.",
          przyklad: "Z równości $ax^2+bx+c=2x^2-5$ dostajemy $a=2$, $b=0$, $c=-5$.",
          uwaga: "Tu nie rozwiązujemy równania z niewiadomą $x$ – porównujemy współczynniki stojące przy tych samych potęgach.",
        },
        {
          nazwa: "Wyznaczanie parametrów",
          slownie: "Wykonaj działania po obu stronach i uporządkuj wielomiany. Porównaj współczynniki przy kolejnych potęgach – dostaniesz równania na parametry.",
          przyklad: "$(x-2)(x+a)=x^2+3x-10$. Lewa strona to $x^2+(a-2)x-2a$, więc $a-2=3$ i $-2a=-10$, czyli $a=5$.",
          uwaga: "Gdy parametrów jest kilka, korzystaj kolejno z tych potęg, które dają najprostsze równania.",
        },
        {
          nazwa: "Równe wartości to nie równe wielomiany",
          slownie: "Wielomiany równe mają te same wartości dla każdej liczby. Odwrotnie nie zawsze: dwa różne wielomiany mogą mieć tę samą wartość w pojedynczym punkcie.",
          przyklad: "Wielomiany $x^2$ i $x$ mają tę samą wartość dla $x=1$, ale nie są równe, bo mają różne współczynniki.",
        },
      ],
      jak: [
        "Wykonaj wszystkie działania w obu wielomianach i uporządkuj je od najwyższej potęgi.",
        "Zapisz brakujące potęgi ze współczynnikiem $0$.",
        "Przyrównaj współczynniki przy tych samych potęgach i rozwiąż otrzymany układ równań.",
        "Sprawdź wyznaczone liczby, wymnażając wielomiany jeszcze raz.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Wielomiany $W(x)=ax^3+(b+1)x^2-4x$ i $P(x)=2x^3+3x^2-4x$ są równe. Wtedy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$a=2,\\ b=3$", "$a=2,\\ b=2$", "$a=2,\\ b=4$", "$a=3,\\ b=2$"],
          poprawna: 1,
        },
        {
          nr: "16",
          tresc: "Wielomiany $W(x)=(x+2)(x-a)$ i $P(x)=x^2-5x-14$ są równe. Liczba $a$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$-7$", "$5$", "$7$", "$-5$"],
          poprawna: 2,
        },
        {
          nr: "17",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wielomiany $x^2-1$ i $(x-1)(x+1)$ są równe.", litery: "PF", poprawna: 0 },
            { tekst: "Wielomiany $x^2$ i $x$ są równe, bo dla $x=1$ mają tę samą wartość.", litery: "PF", poprawna: 1 },
            { tekst: "Wielomiany $(x-2)^2$ i $x^2-4$ są równe.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "18",
          tresc: "Wielomian $W(x)=x^3+ax^2+bx+2$ jest równy wielomianowi $P(x)=(x+1)(x^2+x+2)$. Wtedy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$a=1,\\ b=2$", "$a=2,\\ b=2$", "$a=1,\\ b=3$", "$a=2,\\ b=3$"],
          poprawna: 3,
        },
        {
          nr: "19",
          tresc: "Wielomian $W(x)=(a-1)x^2+(b+3)x+c$ jest równy wielomianowi $P(x)=5x-4$. Wtedy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$a=0,\\ b=2,\\ c=-4$", "$a=1,\\ b=8,\\ c=-4$", "$a=1,\\ b=2,\\ c=-4$", "$a=1,\\ b=2,\\ c=4$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 3,
          tresc: "Wyznacz liczby $a$, $b$, $c$, dla których wielomiany $W(x)=(x-1)(x^2+ax+b)$ i $P(x)=x^3+2x^2-x+c$ są równe. **Zapisz obliczenia.**",
          rozwiazanie: "Wymnażamy: $(x-1)(x^2+ax+b)=x^3+ax^2+bx-x^2-ax-b=x^3+(a-1)x^2+(b-a)x-b$.\n\nPorównujemy z $P(x)=x^3+2x^2-x+c$. Przy $x^2$: $a-1=2$, więc $a=3$.\n\nPrzy $x$: $b-a=-1$, więc $b=a-1=2$.\n\nWyraz wolny: $-b=c$, więc $c=-2$.\n\nOdpowiedź: $a=3$, $b=2$, $c=-2$.",
        },
        {
          nr: "21",
          punkty: 2,
          tresc: "Wyznacz liczby $a$ i $b$, dla których wielomiany $W(x)=(x+a)(x-3)+b$ i $P(x)=x^2+2x+1$ są równe. **Zapisz obliczenia.**",
          rozwiazanie: "$(x+a)(x-3)+b=x^2-3x+ax-3a+b=x^2+(a-3)x+(b-3a)$.\n\nPrzy $x$: $a-3=2$, więc $a=5$.\n\nWyraz wolny: $b-3a=1$, czyli $b-15=1$ i $b=16$.\n\nOdpowiedź: $a=5$, $b=16$.",
        },
      ],
      generatory: [
        {
          id: "rownosc-iloczyn",
          nazwa: "Parametry z iloczynu",
          opis: "Wielomian w postaci iloczynu równa się wielomianowi trzeciego stopnia – wyznacz dwa parametry.",
          generuj(r) {
            const p = r.intBez(-4, 4, 0), a = r.intBez(-5, 5, 0), b = r.intBez(-5, 5, 0);
            const wyn = pmul([1, p], [1, a, b]);
            const [, c, d, e] = wyn;
            return {
              tresc: `Wielomiany $W(x) = ${nawiasMinus(-p)}(x^2 + ax + b)$ i $P(x) = ${wt(wyn)}$ są równe. Oblicz $a$ i $b$.`,
              pola: [
                { id: "a", typ: "liczba", etykieta: "$a =$" },
                { id: "b", typ: "liczba", etykieta: "$b =$" },
              ],
              odpowiedz: { a: q(a), b: q(b) },
              wynik: `$a = ${a}$, $b = ${b}$`,
              rozwiazanie: [
                `Wymnażamy: $W(x) = x^3 + (a${skladnik(p)})x^2 + (b${skladnik(p, "a")})x${skladnik(p, "b")}$.`,
                `Przy $x^2$: $a${skladnik(p)} = ${c}$, stąd $a = ${a}$.`,
                `Przy $x$: $b${skladnik(p, "a")} = ${d}$. Podstawiamy $a = ${a}$ i dostajemy $b = ${b}$.`,
                `Sprawdzenie wyrazu wolnego: $${texNawias(p)}\\cdot ${texNawias(b)} = ${e}$ – zgadza się.`,
              ],
            };
          },
        },
        {
          id: "rownosc-wspolczynniki",
          nazwa: "Porównaj współczynniki",
          opis: "Dwa wielomiany trzeciego stopnia są równe – z porównania współczynników wyznacz trzy parametry.",
          generuj(r) {
            for (;;) {
              const a = r.intBez(-5, 5, 0), b = r.intBez(-5, 5, 0), c = r.intBez(-5, 5, 0);
              const n1 = r.pick([1, 2, 3]), n3 = r.pick([1, 2, 3]);
              const k1 = r.intBez(-5, 5, 0), k2 = r.intBez(-5, 5, 0), k3 = r.intBez(-5, 5, 0);
              const d0 = r.intBez(-9, 9, 0);
              const v3 = n1 * a + k1, v2 = b + k2, v1 = n3 * c + k3;
              if (v3 === 0 || v2 === 0 || v1 === 0) continue;
              const l1 = `${wsp(n1)}a${skladnik(k1)}`, l2 = `b${skladnik(k2)}`, l3 = `${wsp(n3)}c${skladnik(k3)}`;
              return {
                tresc: `Wielomiany $W(x) = (${l1})x^3 + (${l2})x^2 + (${l3})x${skladnik(d0)}$ i $P(x) = ${wt([v3, v2, v1, d0])}$ są równe. Oblicz $a$, $b$ i $c$.`,
                pola: [
                  { id: "a", typ: "liczba", etykieta: "$a =$" },
                  { id: "b", typ: "liczba", etykieta: "$b =$" },
                  { id: "c", typ: "liczba", etykieta: "$c =$" },
                ],
                odpowiedz: { a: q(a), b: q(b), c: q(c) },
                wynik: `$a = ${a}$, $b = ${b}$, $c = ${c}$`,
                rozwiazanie: [
                  `Przy $x^3$: $${l1} = ${v3}$, stąd $a = ${a}$.`,
                  `Przy $x^2$: $${l2} = ${v2}$, stąd $b = ${b}$.`,
                  `Przy $x$: $${l3} = ${v1}$, stąd $c = ${c}$.`,
                  `Wyrazy wolne są takie same, więc wszystkie współczynniki się zgadzają.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 8.4
    {
      id: "pierwiastek",
      nazwa: "Pierwiastek wielomianu",
      sciaga: [
        {
          nazwa: "Pierwiastek wielomianu",
          slownie: "Liczba $a$ jest pierwiastkiem wielomianu $W$, gdy $W(a)=0$. To są miejsca zerowe funkcji $y=W(x)$.",
          tex: "W(a)=0",
          przyklad: "Dla $W(x)=x^2-x-6$: $W(3)=9-3-6=0$, więc $3$ jest pierwiastkiem, a $W(1)=-6\\neq0$, więc $1$ nim nie jest.",
        },
        {
          nazwa: "Pierwiastki z postaci iloczynowej",
          slownie: "Iloczyn jest równy zero, gdy któryś czynnik jest równy zero. Dlatego pierwiastki wielomianu zapisanego jako iloczyn czynników liniowych odczytujesz z każdego czynnika osobno.",
          tex: "(x-a)(x-b)(x-c)=0\\iff x\\in\\{a,b,c\\}",
          przyklad: "Wielomian $(x+2)(x-5)(2x-3)$ ma pierwiastki $-2$, $5$ i $\\frac{3}{2}$.",
          uwaga: "Czynnik $x+2=x-(-2)$ daje pierwiastek $-2$, czyli liczbę o przeciwnym znaku.",
        },
        {
          nazwa: "Twierdzenie Bezouta",
          slownie: "Liczba $a$ jest pierwiastkiem wielomianu $W$ wtedy i tylko wtedy, gdy $W(x)$ dzieli się przez dwumian $x-a$, czyli ma w rozkładzie czynnik $x-a$.",
          tex: "W(a)=0\\iff W(x)=(x-a)\\cdot P(x)",
          litery: "$P(x)$ – wielomian o stopniu o $1$ niższym niż $W$.",
          przyklad: "Dla $W(x)=x^3-x^2-4x+4$ mamy $W(1)=0$, więc $x-1$ jest czynnikiem: $W(x)=(x-1)(x^2-4)$.",
          uwaga: "Czynnik $x-1$ odpowiada pierwiastkowi $1$, a nie $-1$.",
        },
        {
          nazwa: "Ile może być pierwiastków",
          slownie: "Wielomian stopnia $n$ ma co najwyżej $n$ pierwiastków rzeczywistych. Niektóre czynniki, np. $x^2+1$, nie dają żadnego pierwiastka.",
          przyklad: "$W(x)=x(x-2)(x^2+1)$ ma stopień $4$, ale tylko dwa pierwiastki: $0$ i $2$.",
        },
      ],
      jak: [
        "Aby sprawdzić, czy $a$ jest pierwiastkiem, oblicz $W(a)$ – wynik $0$ oznacza pierwiastek.",
        "Gdy wielomian jest iloczynem, przyrównaj każdy czynnik do zera i rozwiąż otrzymane równania.",
        "Gdy znasz pierwiastek i szukasz parametru, podstaw ten pierwiastek do wzoru i rozwiąż równanie na parametr.",
        "Czynnik $x-a$ daje pierwiastek $a$, czynnik $px+s$ daje pierwiastek $-\\frac{s}{p}$.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Pierwiastkiem wielomianu $W(x)=x^3-2x^2-5x+6$ jest liczba. **Wybierz właściwą odpowiedź.**",
          opcje: ["$-1$", "$2$", "$1$", "$-3$"],
          poprawna: 2,
        },
        {
          nr: "23",
          tresc: "Pierwiastkami wielomianu $W(x)=(x-4)(2x+6)(x+1)$ są liczby. **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$, $-3$, $-1$", "$-4$, $3$, $-1$", "$4$, $6$, $-1$", "$4$, $3$, $1$"],
          poprawna: 0,
        },
        {
          nr: "24",
          tresc: "Liczba $2$ jest pierwiastkiem wielomianu $W(x)=x^3+ax^2-3x+2$. Liczba $a$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$-2$", "$1$", "$0$", "$-1$"],
          poprawna: 3,
        },
        {
          nr: "25",
          tresc: "Dany jest wielomian $W(x)=x(x-2)(x+3)(x^2+1)$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Liczba $0$ jest pierwiastkiem wielomianu $W$.", litery: "PF", poprawna: 0 },
            { tekst: "Liczba $-2$ jest pierwiastkiem wielomianu $W$.", litery: "PF", poprawna: 1 },
            { tekst: "Wielomian $W$ ma dokładnie trzy pierwiastki.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "26",
          tresc: "Wielomian $W(x)=x^3-2x^2+kx-6$ jest podzielny przez dwumian $x-3$. Liczba $k$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$k=-1$", "$k=1$", "$k=3$", "$k=-3$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Sprawdź, które z liczb $-2$, $1$, $3$ są pierwiastkami wielomianu $W(x)=x^3-3x^2-4x+12$. **Zapisz obliczenia.**",
          rozwiazanie: "Obliczamy wartości wielomianu $W(x)=x^3-3x^2-4x+12$.\n\n$W(-2)=-8-12+8+12=0$, więc $-2$ jest pierwiastkiem.\n\n$W(1)=1-3-4+12=6\\neq0$, więc $1$ nie jest pierwiastkiem.\n\n$W(3)=27-27-12+12=0$, więc $3$ jest pierwiastkiem.\n\nOdpowiedź: pierwiastkami są liczby $-2$ i $3$.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "Liczby $1$ i $-2$ są pierwiastkami wielomianu $W(x)=x^3+ax^2+bx+6$. Wyznacz $a$ i $b$. **Zapisz obliczenia.**",
          rozwiazanie: "Podstawiamy $x=1$: $W(1)=1+a+b+6=0$, czyli $a+b=-7$.\n\nPodstawiamy $x=-2$: $W(-2)=-8+4a-2b+6=0$, czyli $2a-b=1$.\n\nDodajemy równania stronami: $3a=-6$, więc $a=-2$, a stąd $b=-5$.\n\nSprawdzenie: $W(x)=x^3-2x^2-5x+6$ i $W(3)=27-18-15+6=0$, więc trzecim pierwiastkiem jest $3$.\n\nOdpowiedź: $a=-2$, $b=-5$.",
        },
      ],
      generatory: [
        {
          id: "pierwiastek-iloczynowy",
          nazwa: "Pierwiastki z iloczynu",
          opis: "Podaj wszystkie pierwiastki wielomianu zapisanego jako iloczyn trzech czynników liniowych.",
          generuj(r) {
            for (;;) {
              const czynniki = [];
              if (r.chance(0.35)) czynniki.push([1, 0]);
              while (czynniki.length < 3) czynniki.push([r.pick([1, 1, 2, 3]), r.intBez(-6, 6, 0)]);
              const korzenie = czynniki.map(([p, s]) => q(-s, p));
              if (new Set(korzenie.map((v) => v.toString())).size < 3) continue;
              const kolejnosc = r.shuffle(czynniki.map((c, i) => i));
              const tex = (i) => (czynniki[i][1] === 0 ? "x" : `${wsp(czynniki[i][0])}x ${plusMinus(czynniki[i][1])}`);
              const zapis = kolejnosc.map((i) => (czynniki[i][1] === 0 ? "x" : `(${tex(i)})`)).join("");
              return {
                tresc: `Podaj wszystkie pierwiastki wielomianu $W(x) = ${zapis}$.`,
                pola: [{ id: "x", typ: "zbior", ile: 3, etykieta: "Pierwiastki wielomianu" }],
                odpowiedz: { x: korzenie },
                wynik: `$x \\in ${zbiorTex(korzenie)}$`,
                rozwiazanie: [
                  "Iloczyn jest równy $0$, gdy któryś z czynników jest równy $0$, więc każdy czynnik przyrównujemy do zera.",
                  ...kolejnosc.map((i) => `$${tex(i)} = 0$, stąd $x = ${korzenie[i].tex()}$.`),
                ],
              };
            }
          },
        },
        {
          id: "pierwiastek-parametr",
          nazwa: "Parametr i pierwiastek",
          opis: "Znasz pierwiastek wielomianu trzeciego stopnia – wyznacz współczynnik przy x².",
          generuj(r) {
            for (;;) {
              const p = r.pick([-3, -2, -1, 1, 2, 3]);
              const m = r.intBez(-4, 4, 0), b = r.int(-4, 4);
              const c = -(p ** 3 + m * p * p + b * p);
              if (Math.abs(c) > 40) continue;
              const reszta = p ** 3 + b * p + c;   // = -m·p²
              const bp = b === 0 ? "" : ` ${b < 0 ? "-" : "+"} ${Math.abs(b)}\\cdot ${texNawias(p)}`;
              const mp = `${texNawias(p)}`;
              return {
                tresc: `Liczba $${p}$ jest pierwiastkiem wielomianu $W(x) = x^3 + mx^2${skladnik(b, "x")}${skladnik(c)}$. Oblicz $m$.`,
                pola: [{ id: "m", typ: "liczba", etykieta: "$m =$" }],
                odpowiedz: { m: q(m) },
                wynik: `$m = ${m}$`,
                rozwiazanie: [
                  `Skoro $${p}$ jest pierwiastkiem, to $W(${p}) = 0$: $${mp}^{3} + m\\cdot ${mp}^{2}${bp}${skladnik(c)} = 0$.`,
                  `Obliczamy potęgi i iloczyny: $${wsp(p * p)}m ${plusMinus(reszta)} = 0$.`,
                  `Stąd $${wsp(p * p)}m = ${-reszta}$${p * p === 1 ? "" : ` i $m = ${m}$`}.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 8.5
    {
      id: "rozkladanie",
      nazwa: "Rozkładanie wielomianów na czynniki",
      sciaga: [
        {
          nazwa: "Wyłączanie wspólnego czynnika",
          slownie: "Wyłącz przed nawias najwyższą potęgę $x$, która występuje w każdym składniku, oraz największy wspólny dzielnik współczynników.",
          przyklad: "$6x^4-9x^3+3x^2=3x^2(2x^2-3x+1)$.",
          uwaga: "Sprawdź, wymnażając: w nawiasie nie może zniknąć żaden składnik, a wyłączony cały składnik zostawia w nawiasie $1$.",
        },
        {
          nazwa: "Grupowanie wyrazów",
          slownie: "Przy czterech wyrazach połącz je w dwie pary tak, aby po wyłączeniu z każdej pary został ten sam nawias. Potem wyłącz ten nawias.",
          tex: "ac+ad+bc+bd=(a+b)(c+d)",
          przyklad: "$x^3-2x^2-9x+18=x^2(x-2)-9(x-2)=(x-2)(x^2-9)=(x-2)(x-3)(x+3)$.",
          uwaga: "Przy wyłączaniu liczby ujemnej zmień znaki w nawiasie: $-9x+18=-9(x-2)$.",
        },
        {
          nazwa: "Wzory skróconego mnożenia",
          slownie: "Różnicę kwadratów i kwadrat dwumianu zwijamy do iloczynu według wzorów.",
          tex: "a^2-b^2=(a-b)(a+b)\\qquad a^2+2ab+b^2=(a+b)^2\\qquad a^2-2ab+b^2=(a-b)^2",
          przyklad: "$4x^2-25=(2x-5)(2x+5)$ oraz $x^2-6x+9=(x-3)^2$.",
          uwaga: "Sumy kwadratów, np. $x^2+9$, nie rozkładamy na czynniki liniowe – nie ma wzoru na $a^2+b^2$.",
        },
        {
          nazwa: "Trójmian kwadratowy",
          slownie: "Trójmian $ax^2+bx+c$ z $\\Delta\\geq0$ zapisujemy za pomocą jego miejsc zerowych.",
          tex: "ax^2+bx+c=a(x-x_1)(x-x_2)",
          litery: "$x_1$, $x_2$ – miejsca zerowe trójmianu, $a$ – współczynnik przy $x^2$.",
          przyklad: "$x^2-x-6$: $\\Delta=25$, $x_1=-2$, $x_2=3$, więc $x^2-x-6=(x+2)(x-3)$.",
          uwaga: "Nie zapomnij współczynnika $a$: $2x^2-8x+6=2(x-1)(x-3)$, a nie $(x-1)(x-3)$.",
        },
      ],
      jak: [
        "Najpierw wyłącz wspólny czynnik (np. $x$ lub liczbę), jeśli występuje we wszystkich składnikach.",
        "Sprawdź, czy wielomian lub jego część to wzór skróconego mnożenia.",
        "Przy czterech wyrazach spróbuj grupowania, a przy trzech – rozkładu trójmianu kwadratowego.",
        "Rozkładaj do końca: każdy czynnik kwadratowy sprawdź, czy ma miejsca zerowe.",
        "Na koniec wymnóż czynniki (choćby pobieżnie) i porównaj z wielomianem z zadania.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Wielomian $W(x)=2x^3-8x$ jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$2x(x-2)^2$", "$2x(x+2)^2$", "$2x(x^2+4)$", "$2x(x-2)(x+2)$"],
          poprawna: 3,
        },
        {
          nr: "30",
          tresc: "Wielomian $W(x)=x^3-3x^2-x+3$ jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$(x-3)(x-1)^2$", "$(x-3)(x-1)(x+1)$", "$(x+3)(x-1)(x+1)$", "$(x-3)(x^2+1)$"],
          poprawna: 1,
        },
        {
          nr: "31",
          tresc: "Wielomian $W(x)=x^4-16$ jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$(x-4)(x+4)(x^2+1)$", "$(x^2-4)^2$", "$(x-2)(x+2)(x^2+4)$", "$(x-2)^2(x+2)^2$"],
          poprawna: 2,
        },
        {
          nr: "32",
          tresc: "Wielomian $W(x)=2x^2-x-6$ jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$(x+2)(2x-3)$", "$(x-2)\\left(x+\\frac{3}{2}\\right)$", "$(2x-2)(x+3)$", "$(x-2)(2x+3)$"],
          poprawna: 3,
        },
        {
          nr: "33",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$x^2+4=(x-2)(x+2)$", litery: "PF", poprawna: 1 },
            { tekst: "$4x^2-12x+9=(2x-3)^2$", litery: "PF", poprawna: 0 },
            { tekst: "$x^3-x=x(x-1)(x+1)$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 2,
          tresc: "Rozłóż na czynniki wielomian $W(x)=x^3+2x^2-4x-8$. **Zapisz obliczenia.**",
          rozwiazanie: "Grupujemy: $x^3+2x^2-4x-8=x^2(x+2)-4(x+2)$.\n\nWyłączamy wspólny nawias: $(x+2)(x^2-4)$.\n\nZ różnicy kwadratów: $x^2-4=(x-2)(x+2)$.\n\nOdpowiedź: $W(x)=(x+2)^2(x-2)$.",
        },
        {
          nr: "35",
          punkty: 3,
          tresc: "Rozłóż na czynniki wielomian $W(x)=3x^4-12x^3-15x^2$. **Zapisz obliczenia.**",
          rozwiazanie: "Wyłączamy $3x^2$: $3x^4-12x^3-15x^2=3x^2(x^2-4x-5)$.\n\nTrójmian: $\\Delta=16+20=36$, $\\sqrt{\\Delta}=6$, $x_1=\\frac{4-6}{2}=-1$, $x_2=\\frac{4+6}{2}=5$.\n\nWięc $x^2-4x-5=(x+1)(x-5)$.\n\nOdpowiedź: $W(x)=3x^2(x+1)(x-5)$.",
        },
      ],
      generatory: [
        {
          id: "rozkladanie-grupowanie",
          nazwa: "Grupowanie wyrazów",
          opis: "Rozłóż wielomian trzeciego stopnia o czterech wyrazach przez grupowanie i podaj jego pierwiastki.",
          generuj(r) {
            for (;;) {
              const q0 = r.pick([1, 1, 2, 3]), p = r.intBez(-6, 6, 0), a = r.int(2, 5);
              if (p === q0 * a || p === -q0 * a) continue;
              const w = [q0, p, -q0 * a * a, -p * a * a];
              const korzenie = [q(-p, q0), q(a), q(-a)];
              const nawias = `${wsp(q0)}x${skladnik(p)}`;
              return {
                tresc: `Rozłóż na czynniki wielomian $W(x) = ${wt(w)}$ i podaj jego pierwiastki.`,
                pola: [{ id: "x", typ: "zbior", ile: 3, etykieta: "Pierwiastki wielomianu" }],
                odpowiedz: { x: korzenie },
                wynik: `$x \\in ${zbiorTex(korzenie)}$`,
                rozwiazanie: [
                  `Grupujemy wyrazy: $W(x) = x^2(${nawias}) - ${a * a}(${nawias})$.`,
                  `Wyłączamy wspólny nawias: $W(x) = (${nawias})(x^2 - ${a * a})$.`,
                  `Ze wzoru na różnicę kwadratów: $W(x) = (${nawias})(x - ${a})(x + ${a})$.`,
                  `Każdy czynnik przyrównujemy do zera: $x = ${korzenie[0].tex()}$, $x = ${a}$, $x = ${-a}$.`,
                ],
              };
            }
          },
        },
        {
          id: "rozkladanie-wylaczanie",
          nazwa: "Wyłączanie i trójmian",
          opis: "Wyłącz wspólny czynnik, rozłóż trójmian kwadratowy i podaj pierwiastki wielomianu.",
          generuj(r) {
            for (;;) {
              const k = r.pick([2, 3, 4, 5]), m = r.pick([1, 2]);
              const a = r.intBez(-5, 5, 0), b = r.intBez(-5, 5, 0);
              if (a >= b) continue;
              const s = -(a + b), t = a * b, D = s * s - 4 * t, sq = b - a;
              const xm = m === 1 ? "x" : "x^2";
              const w = [k, k * s, k * t, ...Array(m).fill(0)];
              return {
                tresc: `Rozłóż na czynniki wielomian $W(x) = ${wt(w)}$ i podaj jego pierwiastki.`,
                pola: [{ id: "x", typ: "zbior", ile: 3, etykieta: "Pierwiastki wielomianu" }],
                odpowiedz: { x: [q(0), q(a), q(b)] },
                wynik: `$x \\in ${zbiorTex([q(0), q(a), q(b)])}$`,
                rozwiazanie: [
                  `Wyłączamy $${k}${xm}$ przed nawias: $W(x) = ${k}${xm}(x^2${skladnik(s, "x")}${skladnik(t)})$.`,
                  `Trójmian w nawiasie: $\\Delta = ${texNawias(s)}^2 - 4\\cdot ${texNawias(t)} = ${D}$, $\\sqrt{\\Delta} = ${sq}$.`,
                  `$x_1 = \\frac{${-s} - ${sq}}{2} = ${a}$, $x_2 = \\frac{${-s} + ${sq}}{2} = ${b}$.`,
                  `Rozkład: $W(x) = ${k}${xm}${nawiasMinus(a)}${nawiasMinus(b)}$, więc pierwiastki to $0$, $${a}$, $${b}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 8.6 i 8.7
    {
      id: "rownania",
      nazwa: "Równania wielomianowe i zadania tekstowe",
      sciaga: [
        {
          nazwa: "Równanie wielomianowe",
          slownie: "Równanie wielomianowe ma postać $W(x)=0$, a jego rozwiązania to pierwiastki wielomianu $W$. Przenieś wszystko na jedną stronę, rozłóż wielomian na czynniki i każdy czynnik przyrównaj do zera.",
          przyklad: "$x^3-4x=0\\iff x(x-2)(x+2)=0$, więc $x\\in\\{-2,0,2\\}$.",
          uwaga: "Rozkładaj do końca i podaj wszystkie rozwiązania – także te, które dają czynniki takie jak $x$.",
        },
        {
          nazwa: "Iloczyn równy zero",
          slownie: "Iloczyn jest równy zero wtedy i tylko wtedy, gdy któryś z czynników jest równy zero. Czynnik, który nigdy nie jest zerem, nie daje rozwiązań.",
          tex: "A\\cdot B=0\\iff A=0\\ \\text{lub}\\ B=0",
          przyklad: "$(x+1)(2x-5)(x^2+4)=0$: $x=-1$ lub $x=\\frac{5}{2}$. Równanie $x^2+4=0$ nie ma rozwiązań, bo $x^2+4\\geq4>0$.",
        },
        {
          nazwa: "Nie dziel przez niewiadomą",
          slownie: "Nie skracaj równania przez $x$ ani przez inne wyrażenie z niewiadomą – możesz zgubić rozwiązanie. Zamiast tego wyłącz je przed nawias.",
          tex: "x^3=4x\\Rightarrow x(x^2-4)=0",
          przyklad: "Po podzieleniu $x^3=4x$ przez $x$ zostałoby tylko $\\pm2$, a rozwiązaniem jest też $0$.",
        },
        {
          nazwa: "Zadania tekstowe",
          slownie: "Oznacz niewiadomą, zapisz równanie wielomianowe, rozwiąż je i sprawdź, które rozwiązania pasują do treści: długość jest dodatnia, a liczba naturalna to nie ułamek ani liczba ujemna.",
          przyklad: "Trzy kolejne liczby naturalne to $n-1$, $n$, $n+1$. Ich iloczyn to $n(n^2-1)$, a suma to $3n$.",
          uwaga: "Rozwiązanie równania nie zawsze jest rozwiązaniem zadania – wróć do warunków i odrzuć np. długość ujemną.",
        },
      ],
      jak: [
        "Przenieś wszystkie wyrazy na jedną stronę, tak aby po drugiej stronie było $0$.",
        "Rozłóż wielomian na czynniki: wspólny czynnik, grupowanie, wzór skróconego mnożenia, trójmian kwadratowy.",
        "Przyrównaj każdy czynnik do zera i zapisz wszystkie rozwiązania.",
        "W zadaniu tekstowym oznacz niewiadomą, zapisz równanie i na końcu wybierz rozwiązania zgodne z treścią.",
      ],
      zadania: [
        {
          nr: "36",
          tresc: "Zbiorem wszystkich rozwiązań równania $x^3-9x=0$ jest. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\{-3,3\\}$", "$\\{0,9\\}$", "$\\{-3,0,3\\}$", "$\\{0,3\\}$"],
          poprawna: 2,
        },
        {
          nr: "37",
          tresc: "Zbiorem wszystkich rozwiązań równania $(x-1)(2x+3)(x^2+5)=0$ jest. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\left\\{1,-\\frac{3}{2}\\right\\}$", "$\\left\\{-1,\\frac{3}{2}\\right\\}$", "$\\left\\{1,\\frac{3}{2}\\right\\}$", "$\\left\\{1,-\\frac{3}{2},-\\sqrt{5},\\sqrt{5}\\right\\}$"],
          poprawna: 0,
        },
        {
          nr: "38",
          tresc: "Suma wszystkich rozwiązań równania $x^3+2x^2-x-2=0$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$-1$", "$-2$", "$2$", "$0$"],
          poprawna: 1,
        },
        {
          nr: "39",
          tresc: "Dane jest równanie $2x^3-8x^2+8x=0$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Liczba $0$ jest rozwiązaniem tego równania.", litery: "PF", poprawna: 0 },
            { tekst: "Równanie ma dokładnie trzy rozwiązania.", litery: "PF", poprawna: 1 },
            { tekst: "Liczba $2$ jest rozwiązaniem tego równania.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "40",
          tresc: "Iloczyn trzech kolejnych liczb naturalnych jest $5$ razy większy od ich sumy. Najmniejsza z tych liczb jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$2$", "$3$", "$5$"],
          poprawna: 2,
        },
        {
          nr: "41",
          tresc: "Prostopadłościan ma w podstawie kwadrat o boku $x$, a jego wysokość jest o $3$ większa od boku podstawy. Objętość tego prostopadłościanu jest liczbowo równa polu jego powierzchni bocznej. Bok podstawy jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$", "$3$", "$7$", "$4$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "42",
          punkty: 2,
          tresc: "Rozwiąż równanie $x^3+3x^2-4x-12=0$. **Zapisz obliczenia.**",
          rozwiazanie: "Grupujemy wyrazy: $x^2(x+3)-4(x+3)=0$.\n\nWyłączamy nawias: $(x+3)(x^2-4)=0$, czyli $(x+3)(x-2)(x+2)=0$.\n\nKażdy czynnik przyrównujemy do zera: $x=-3$ lub $x=2$ lub $x=-2$.\n\nOdpowiedź: $x\\in\\{-3,-2,2\\}$.",
        },
        {
          nr: "43",
          punkty: 4,
          tresc: "Suma sześcianów trzech kolejnych liczb całkowitych jest równa dziewięciokrotności kwadratu środkowej z nich. Znajdź wszystkie takie trójki liczb. **Zapisz obliczenia.**",
          rozwiazanie: "Oznaczmy liczby przez $n-1$, $n$, $n+1$.\n\nSuma sześcianów: $(n-1)^3+n^3+(n+1)^3=(n^3-3n^2+3n-1)+n^3+(n^3+3n^2+3n+1)=3n^3+6n$.\n\nRównanie: $3n^3+6n=9n^2$, czyli $3n^3-9n^2+6n=0$ i $3n(n^2-3n+2)=0$.\n\nTrójmian: $n^2-3n+2=(n-1)(n-2)$, więc $3n(n-1)(n-2)=0$ i $n\\in\\{0,1,2\\}$.\n\nWszystkie trzy wartości $n$ pasują, bo liczby mają być całkowite.\n\nOdpowiedź: trójki $(-1,0,1)$, $(0,1,2)$, $(1,2,3)$.",
        },
      ],
      generatory: [
        {
          id: "rownania-rozwiazania",
          nazwa: "Rozwiąż równanie",
          opis: "Równanie wielomianowe, które rozwiązujesz przez rozkład na czynniki – podaj wszystkie rozwiązania.",
          generuj(r) {
            for (;;) {
              const rodzaj = r.int(0, 2);
              if (rodzaj === 0) {   // x^n = a²·x^(n-2) – wyłączenie i wzór na różnicę kwadratów
                const a = r.int(2, 9), n = r.pick([3, 4]);
                const kw = a * a;
                const stare = n === 3 ? "x" : "x^2";
                const korzenie = [q(0), q(a), q(-a)];
                return {
                  tresc: `Rozwiąż równanie $x^${n} = ${kw}${stare}$.`,
                  pola: [{ id: "x", typ: "zbior", ile: 3, etykieta: "Rozwiązania równania" }],
                  odpowiedz: { x: korzenie },
                  wynik: `$x \\in ${zbiorTex(korzenie)}$`,
                  rozwiazanie: [
                    `Przenosimy wszystko na lewą stronę: $x^${n} - ${kw}${stare} = 0$.`,
                    `Wyłączamy wspólny czynnik $${stare}$ (nie dzielimy przez $x$): $${stare}(x^2 - ${kw}) = 0$.`,
                    `Różnica kwadratów: $${stare}(x - ${a})(x + ${a}) = 0$.`,
                    `Każdy czynnik przyrównujemy do zera: $x = 0$, $x = ${a}$ lub $x = ${-a}$.`,
                  ],
                };
              }
              if (rodzaj === 1) {   // x³ + p·x² = a²·x + p·a² – grupowanie
                const p = r.intBez(-6, 6, 0), a = r.int(2, 5);
                if (Math.abs(p) === a) continue;
                const korzenie = [q(-p), q(a), q(-a)];
                return {
                  tresc: `Rozwiąż równanie $x^3${skladnik(p, "x^2")} = ${a * a}x${skladnik(p * a * a)}$.`,
                  pola: [{ id: "x", typ: "zbior", ile: 3, etykieta: "Rozwiązania równania" }],
                  odpowiedz: { x: korzenie },
                  wynik: `$x \\in ${zbiorTex(korzenie)}$`,
                  rozwiazanie: [
                    `Przenosimy wszystko na lewą stronę: $${wt([1, p, -a * a, -p * a * a])} = 0$.`,
                    `Grupujemy wyrazy: $x^2(x${skladnik(p)}) - ${a * a}(x${skladnik(p)}) = 0$, czyli $(x${skladnik(p)})(x^2 - ${a * a}) = 0$.`,
                    `Różnica kwadratów: $(x${skladnik(p)})(x - ${a})(x + ${a}) = 0$.`,
                    `Każdy czynnik przyrównujemy do zera: $x = ${-p}$, $x = ${a}$ lub $x = ${-a}$.`,
                  ],
                };
              }
              // iloczyn z czynnikiem x² + c, który nie ma pierwiastków
              const r1 = r.int(-6, 6), r2 = r.int(-6, 6), c = r.int(1, 9);
              if (r1 === r2) continue;
              const korzenie = [q(r1), q(r2)];
              return {
                tresc: `Rozwiąż równanie $${nawiasMinus(r1)}${nawiasMinus(r2)}(x^2 + ${c}) = 0$.`,
                pola: [{ id: "x", typ: "zbior", ile: 2, etykieta: "Rozwiązania równania" }],
                odpowiedz: { x: korzenie },
                wynik: `$x \\in ${zbiorTex(korzenie)}$`,
                rozwiazanie: [
                  "Iloczyn jest równy $0$, gdy któryś z czynników jest równy $0$.",
                  `$${liniowy(r1)} = 0$, stąd $x = ${r1}$. Podobnie $${liniowy(r2)} = 0$, stąd $x = ${r2}$.`,
                  `Czynnik $x^2 + ${c}$ nie jest równy $0$ dla żadnej liczby, bo $x^2 \\geq 0$, więc $x^2 + ${c} \\geq ${c} > 0$.`,
                  `Rozwiązania: $x = ${r1}$ i $x = ${r2}$.`,
                ],
              };
            }
          },
        },
        {
          id: "rownania-tekstowe",
          nazwa: "Zadanie tekstowe",
          opis: "Zadanie, które prowadzi do równania wielomianowego: kolejne liczby naturalne albo prostopadłościan o podstawie kwadratowej.",
          generuj(r) {
            const rodzaj = r.int(0, 2);
            if (rodzaj === 0) {
              const m = r.pick([4, 5, 7, 8, 10, 11]);
              const k = (m * m - 1) / 3;
              const najmniejsza = r.chance();
              const wynik = najmniejsza ? m - 1 : m + 1;
              return {
                tresc: `Iloczyn trzech kolejnych liczb naturalnych jest ${k} razy większy od ich sumy. Znajdź ${najmniejsza ? "najmniejszą" : "największą"} z tych liczb.`,
                pola: [{ id: "w", typ: "liczba", etykieta: najmniejsza ? "Najmniejsza liczba" : "Największa liczba" }],
                odpowiedz: { w: q(wynik) },
                wynik: `$${wynik}$`,
                rozwiazanie: [
                  "Oznaczmy środkową liczbę przez $n$. Liczby to $n-1$, $n$, $n+1$, ich iloczyn to $(n-1)n(n+1)$, a suma to $3n$.",
                  `Równanie: $(n-1)n(n+1) = ${k}\\cdot 3n$. Ponieważ $(n-1)(n+1) = n^2-1$, mamy $n(n^2-1) = ${3 * k}n$, czyli $n(n^2 - ${3 * k + 1}) = 0$.`,
                  `Liczby są naturalne, więc $n \\neq 0$. Zostaje $n^2 = ${m * m}$, stąd $n = ${m}$.`,
                  `Szukane liczby: $${m - 1}$, $${m}$, $${m + 1}$. ${najmniejsza ? "Najmniejsza" : "Największa"} z nich to $${wynik}$.`,
                ],
              };
            }
            const a = r.int(1, 6);
            const pytaNajwyzsza = r.chance();
            const nazwaSzukana = pytaNajwyzsza ? "wysokość" : "bok podstawy";
            if (rodzaj === 1) {
              const t = r.pick([1, 2, 3]);
              const x = 4 * t;
              const opis = t === 1 ? "polu jego powierzchni bocznej" : t === 2 ? "dwukrotności pola jego powierzchni bocznej" : "trzykrotności pola jego powierzchni bocznej";
              const wynik = pytaNajwyzsza ? x + a : x;
              return {
                tresc: `Prostopadłościan ma w podstawie kwadrat o boku $x$ cm, a jego wysokość jest o ${a} cm większa od boku podstawy. Liczbowo objętość tego prostopadłościanu (w cm³) jest równa ${opis} (w cm²). Oblicz ${nazwaSzukana} (w cm).`,
                pola: [{ id: "w", typ: "liczba", etykieta: `${nazwaSzukana[0].toUpperCase()}${nazwaSzukana.slice(1)} w cm` }],
                odpowiedz: { w: q(wynik) },
                wynik: `$${wynik}$`,
                rozwiazanie: [
                  `Objętość: $V = x^2(x${skladnik(a)})$. Pole powierzchni bocznej (cztery prostokąty): $P_b = 4x(x${skladnik(a)})$.`,
                  `Równanie: $x^2(x${skladnik(a)}) = ${4 * t}x(x${skladnik(a)})$.`,
                  `Przenosimy na jedną stronę i wyłączamy wspólny czynnik: $x(x${skladnik(a)})(x - ${4 * t}) = 0$.`,
                  `Rozwiązania: $x = 0$, $x = ${-a}$ lub $x = ${4 * t}$. Bok jest dodatni, więc $x = ${x}$.`,
                  ...(pytaNajwyzsza ? [`Wysokość: $x${skladnik(a)} = ${x} + ${a} = ${x + a}$.`] : []),
                ],
              };
            }
            const x = r.int(1, 8);
            const k = x + a;
            const wynik = pytaNajwyzsza ? k : x;
            return {
              tresc: `Prostopadłościan ma w podstawie kwadrat o boku $x$ cm, a jego wysokość jest o ${a} cm większa od boku podstawy. Liczbowo objętość tego prostopadłościanu (w cm³) jest ${k} razy większa od pola jego podstawy (w cm²). Oblicz ${nazwaSzukana} (w cm).`,
              pola: [{ id: "w", typ: "liczba", etykieta: `${nazwaSzukana[0].toUpperCase()}${nazwaSzukana.slice(1)} w cm` }],
              odpowiedz: { w: q(wynik) },
              wynik: `$${wynik}$`,
              rozwiazanie: [
                `Objętość: $V = x^2(x${skladnik(a)})$, pole podstawy: $x^2$.`,
                `Równanie: $x^2(x${skladnik(a)}) = ${k}x^2$.`,
                `Przenosimy na jedną stronę i wyłączamy $x^2$: $x^2(x${skladnik(a)} - ${k}) = 0$, czyli $x^2(x - ${x}) = 0$.`,
                `Rozwiązania: $x = 0$ lub $x = ${x}$. Bok jest dodatni, więc $x = ${x}$.`,
                ...(pytaNajwyzsza ? [`Wysokość: $x${skladnik(a)} = ${x} + ${a} = ${k}$.`] : []),
              ],
            };
          },
        },
      ],
    },
  ],
};
