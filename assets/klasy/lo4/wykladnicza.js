// Klasa 4 (liceum i technikum) · rozdział 1 „Funkcja wykładnicza. Funkcja logarytmiczna” – Matematyka 4, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Bez rysunków: wykresy opisane słowami (monotoniczność, asymptota, punkty charakterystyczne, przesunięcie o wektor).
// Zgodnie z podstawą programową 2024: równania i nierówności wykładnicze tylko sprowadzalne do tej samej podstawy (bez podstawiania t = a^x),
// równania logarytmiczne tylko z definicji logarytmu (z dziedziną), bez symetrii wykresów y = −f(x) i y = f(−x).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });

/** Powtarza losowanie, aż f() zwróci zadanie (wartość różną od null); f używa tego samego losownika, więc wynik jest powtarzalny. */
function probuj(f, proby = 5000) {
  for (let i = 0; i < proby; i++) {
    const w = f();
    if (w) return w;
  }
  throw new Error("Nie udało się wylosować zadania");
}

/** Zadanie z odpowiedzią liczbową. */
const zadanie = (tresc, kroki, v, etykieta, wynikTex) => ({
  tresc,
  pola: [pole("x", etykieta)],
  odpowiedz: { x: v },
  wynik: `$${wynikTex ?? Q.z(v).tex()}$`,
  rozwiazanie: kroki,
});

/** Poprawna forma rzeczownika po liczebniku: pl(2, "rok", "lata", "lat"). */
const pl = (n, jeden, kilka, wiele) => (n === 1 ? jeden : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? kilka : wiele);

/** Liczba w zapisie dziesiętnym z przecinkiem (gdy rozwinięcie jest skończone), inaczej ułamek: 7/2 -> „3{,}5”. */
function dec(v) {
  const x = Q.z(v);
  for (let k = 0; k <= 4; k++) {
    const m = 10 ** k;
    if ((x.n * m) % x.d === 0) {
      const w = (x.n * m) / x.d;
      if (k === 0) return String(w);
      const s = String(Math.abs(w)).padStart(k + 1, "0");
      return `${w < 0 ? "-" : ""}${s.slice(0, -k)}{,}${s.slice(-k)}`;
    }
  }
  return x.tex();
}

const nwd = (a, b) => (b ? nwd(b, a % b) : Math.abs(a));

/** Znak i wartość do doklejenia po wyrażeniu: pm(3) -> "+3", pm(-3) -> "-3". */
const pm = (n) => (n < 0 ? `-${-n}` : `+${n}`);

/** Potęga bez zbędnych jedynek: pw("2", 1) -> "2", pw("2", 3) -> "2^{3}". */
const pw = (b, e) => (e === 1 ? `${b}` : e === 0 ? "1" : `${b}^{${e}}`);

/** Liczba z odstępem tysięcy (od 5 cyfr): 12500 -> „12\,500”. */
const tys = (n) => (Math.abs(n) >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : String(n));

/** Wyrażenie liniowe: liniowy(2, -3) -> „2x-3”, liniowy(1, 0) -> „x”. */
const liniowy = (m, c) => `${m === 1 ? "" : m}x${c === 0 ? "" : pm(c)}`;

/** Podstawa potęgi: liczba całkowita albo ułamek w nawiasie. */
const baza = (a) => {
  const v = Q.z(a);
  return v.d === 1 ? String(v.n) : `\\left(${dec(v)}\\right)`;
};

/** Logarytm o podstawie a (dla 10 – zwykły \log). */
const logT = (a) => {
  const v = Q.z(a);
  return v.eq(10) ? "\\log" : `\\log_{${v.d === 1 ? v.n : dec(v)}}`;
};

/** Zbiory rozwiązań nierówności: cztery możliwe przedziały z jednym końcem x0. */
const przedzialy = (x0) => [
  `$x\\in(${x0.tex()},+\\infty)$`,
  `$x\\in(-\\infty,${x0.tex()})$`,
  `$x\\in\\langle${x0.tex()},+\\infty)$`,
  `$x\\in(-\\infty,${x0.tex()}\\rangle$`,
];

const ZNAKI = [">", "<", "\\ge", "\\le"];
const ODWROC = { ">": "<", "<": ">", "\\ge": "\\le", "\\le": "\\ge" };

/** Czy wartość mieści się w „ładnym” zakresie (mianownik ≤ 12, licznik ≤ 1000). */
const ladnaWartosc = (v) => v.d <= 12 && Math.abs(v.n) <= 1000;

const BAZY = [q(2), q(3), q(4), q(5), q(1, 2), q(1, 3), q(1, 4), q(1, 5), q(2, 3), q(3, 2), q(3, 4)];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Potęgi i funkcja wykładnicza
    {
      id: "potegi-wykladnicza",
      nazwa: "Potęga o wykładniku rzeczywistym. Funkcja wykładnicza",
      sciaga: [
        {
          nazwa: "Wykładnik ujemny i ułamkowy",
          slownie: "Wykładnik ujemny oznacza odwrotność potęgi, a wykładnik ułamkowy – pierwiastek. Potęgi o wykładniku niewymiernym (np. $2^{\\sqrt{2}}$) też istnieją i mają te same własności.",
          tex: "a^{-n}=\\frac{1}{a^{n}}\\qquad a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}",
          litery: "$a>0$ – podstawa, $m$, $n$ – liczby całkowite, $n>0$.",
          przyklad: "$2^{-3}=\\frac{1}{2^{3}}=\\frac{1}{8}$. Dalej: $8^{\\frac{2}{3}}=\\left(\\sqrt[3]{8}\\right)^{2}=2^{2}=4$.",
          uwaga: "Wykładnik ujemny nie zmienia znaku liczby: $2^{-3}$ to nie $-8$, tylko $\\frac{1}{8}$.",
        },
        {
          nazwa: "Działania na potęgach",
          slownie: "Przy tej samej podstawie wykładniki dodajemy (mnożenie), odejmujemy (dzielenie) albo mnożymy (potęga potęgi).",
          tex: "a^{x}\\cdot a^{y}=a^{x+y}\\qquad a^{x}:a^{y}=a^{x-y}\\qquad\\left(a^{x}\\right)^{y}=a^{x\\cdot y}\\qquad(ab)^{x}=a^{x}b^{x}",
          litery: "$a>0$, $b>0$ – podstawy, $x$, $y$ – dowolne liczby rzeczywiste.",
          przyklad: "$2^{5}\\cdot2^{-3}=2^{2}=4$ oraz $\\left(3^{2}\\right)^{\\frac{1}{2}}=3$.",
          uwaga: "Wzory działają tylko dla równych podstaw: $2^{3}\\cdot3^{2}$ to nie $6^{5}$. Wykładniki dodajemy, a nie mnożymy.",
        },
        {
          nazwa: "Funkcja wykładnicza",
          slownie: "To funkcja, w której niewiadoma jest w wykładniku. Jej dziedziną są wszystkie liczby rzeczywiste, a wartości są zawsze dodatnie. Wykres przechodzi przez punkt $(0,1)$ i zbliża się do osi $OX$ (asymptota $y=0$), ale jej nie przecina.",
          tex: "f(x)=a^{x}\\qquad a>0,\\ a\\ne1\\qquad D=\\mathbb{R}\\qquad ZW=(0,+\\infty)",
          litery: "$a$ – podstawa, $D$ – dziedzina, $ZW$ – zbiór wartości.",
          przyklad: "Dla $f(x)=3^{x}$: $f(0)=1$, $f(2)=9$, $f(-1)=\\frac{1}{3}$. Funkcja nie ma miejsc zerowych.",
          uwaga: "Dla $a=1$ mamy $1^{x}=1$ – to funkcja stała, a nie wykładnicza.",
        },
        {
          nazwa: "Monotoniczność",
          slownie: "Gdy $a>1$, funkcja rośnie: większemu $x$ odpowiada większa wartość. Gdy $0<a<1$, funkcja maleje: większemu $x$ odpowiada mniejsza wartość.",
          tex: "a>1:\\ x\\uparrow,\\ a^{x}\\uparrow\\qquad0<a<1:\\ x\\uparrow,\\ a^{x}\\downarrow",
          litery: "$\\uparrow$ – rośnie, $\\downarrow$ – maleje.",
          przyklad: "Funkcja $2^{x}$ rośnie: $2^{1}=2<2^{3}=8$. Funkcja $\\left(\\frac{1}{2}\\right)^{x}$ maleje: $\\left(\\frac{1}{2}\\right)^{1}=\\frac{1}{2}>\\left(\\frac{1}{2}\\right)^{3}=\\frac{1}{8}$.",
          uwaga: "Przy podstawie mniejszej od $1$ większy wykładnik daje mniejszą potęgę: $\\left(\\frac{1}{2}\\right)^{2}>\\left(\\frac{1}{2}\\right)^{5}$.",
        },
      ],
      jak: [
        "Ujemny wykładnik zamień na odwrotność, a ułamkowy na pierwiastek.",
        "Przy działaniach sprowadź potęgi do tej samej podstawy i dodawaj albo odejmuj wykładniki.",
        "Przy funkcji wykładniczej sprawdź, czy podstawa jest większa od $1$ (rośnie), czy z przedziału $(0,1)$ (maleje).",
        "Gdy wykres przechodzi przez dany punkt, podstaw jego współrzędne do wzoru $a^{x}=y$.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Jaka jest wartość potęgi $8^{\\frac{2}{3}}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{16}{3}$", "$4$", "$64$", "$\\frac{1}{4}$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Jaka jest wartość potęgi $\\left(\\frac{1}{3}\\right)^{-2}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-\\frac{1}{9}$", "$\\frac{1}{9}$", "$-9$", "$9$"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "Jaka jest wartość wyrażenia $\\frac{2^{7}\\cdot2^{-3}}{2^{2}}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$16$", "$64$", "$4$", "$256$"],
          poprawna: 2,
        },
        {
          nr: "4",
          tresc: "Wykres funkcji $f(x)=a^{x}$ przechodzi przez punkt $(-2,\\ 25)$. Ile wynosi $a$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{5}$", "$5$", "$\\frac{1}{25}$", "$25$"],
          poprawna: 0,
        },
        {
          nr: "5",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Funkcja $f(x)=\\left(\\frac{3}{4}\\right)^{x}$ jest malejąca.", litery: "PF", poprawna: 0 },
            { tekst: "Zbiorem wartości funkcji $f(x)=5^{x}$ jest zbiór wszystkich liczb rzeczywistych.", litery: "PF", poprawna: 1 },
            { tekst: "Dla $x=-1$ wartość funkcji $f(x)=\\left(\\frac{1}{2}\\right)^{x}$ jest równa $\\frac{1}{2}$.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Oblicz wartość wyrażenia $\\frac{27^{\\frac{1}{3}}\\cdot2^{-2}}{\\left(\\frac{1}{2}\\right)^{3}}$. **Zapisz obliczenia.**",
          rozwiazanie: "Obliczamy osobno: $27^{\\frac{1}{3}}=\\sqrt[3]{27}=3$, $2^{-2}=\\frac{1}{4}$, $\\left(\\frac{1}{2}\\right)^{3}=\\frac{1}{8}$.\n\nPodstawiamy: $\\frac{3\\cdot\\frac{1}{4}}{\\frac{1}{8}}=\\frac{\\frac{3}{4}}{\\frac{1}{8}}$.\n\nDzielimy: $\\frac{3}{4}:\\frac{1}{8}=\\frac{3}{4}\\cdot8=6$.\n\nOdpowiedź: Wartość wyrażenia jest równa $6$.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Wykres funkcji $f(x)=a^{x}$ przechodzi przez punkt $A=(-3,\\ 27)$. Wyznacz $a$, rozstrzygnij, czy funkcja jest rosnąca, i oblicz $f(2)$. **Zapisz obliczenia.**",
          rozwiazanie: "Punkt $A$ leży na wykresie, więc $a^{-3}=27$, czyli $\\frac{1}{a^{3}}=27$.\n\nStąd $a^{3}=\\frac{1}{27}$, a więc $a=\\frac{1}{3}$.\n\nPodstawa należy do przedziału $(0,1)$, więc funkcja jest malejąca (nie jest rosnąca).\n\nObliczamy: $f(2)=\\left(\\frac{1}{3}\\right)^{2}=\\frac{1}{9}$.\n\nOdpowiedź: $a=\\frac{1}{3}$, funkcja jest malejąca, $f(2)=\\frac{1}{9}$.",
        },
      ],
      generatory: [
        {
          id: "potegi-obliczanie",
          nazwa: "Wartość potęgi",
          opis: "Potęga z wykładnikiem ułamkowym albo ujemnym oraz wyrażenia z potęgami o tej samej podstawie.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb <= 1) {
              const neg = tryb === 1;
              const { c, m, p } = probuj(() => {
                const [c, m] = r.pick([[2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [2, 3], [3, 3], [4, 3], [5, 3], [2, 4], [3, 4], [2, 5]]);
                const p = r.int(1, 4);
                if (nwd(p, m) !== 1 || c ** p > (neg ? 12 : 150)) return null;
                return { c, m, p };
              });
              const a = c ** m;
              const w = c ** p;
              const e = `${neg ? "-" : ""}\\frac{${p}}{${m}}`;
              const eNawias = neg ? `\\left(${e}\\right)` : e;
              const v = neg ? q(1, w) : q(w);
              return zadanie(
                `Oblicz wartość potęgi $${a}^{${e}}$.`,
                [
                  `Zapisujemy podstawę jako potęgę liczby $${c}$: $${a}=${c}^{${m}}$.`,
                  `Wtedy $${a}^{${e}}=\\left(${c}^{${m}}\\right)^{${e}}=${c}^{${m}\\cdot${eNawias}}=${pw(c, neg ? -p : p)}$.`,
                  neg ? `Wykładnik ujemny: $${c}^{${-p}}=\\frac{1}{${pw(c, p)}}=\\frac{1}{${w}}$.` : `Zatem $${a}^{${e}}=${pw(c, p)}=${w}$.`,
                ],
                v, "Wartość $=$",
              );
            }
            if (tryb === 2) {
              const { u, v, n, wynik } = probuj(() => {
                const [u, v] = r.pick([[1, 2], [1, 3], [1, 4], [1, 5], [2, 3], [3, 2], [3, 4], [4, 3], [2, 5], [3, 5]]);
                const n = r.int(1, 3);
                const wynik = q(v, u).pow(n);
                return u ** n <= 12 && v ** n <= 125 ? { u, v, n, wynik } : null;
              });
              const podst = u === 1 ? `\\left(\\frac{1}{${v}}\\right)` : `\\left(\\frac{${u}}{${v}}\\right)`;
              const odwr = u === 1 ? `${v}` : `\\left(\\frac{${v}}{${u}}\\right)`;
              const kroki =
                n === 1
                  ? [`Wykładnik ujemny: odwracamy ułamek, czyli $${podst}^{-1}=${u === 1 ? "" : `${odwr}=`}${wynik.tex()}$.`]
                  : [
                      `Wykładnik ujemny: odwracamy ułamek, czyli $${podst}^{-${n}}=${odwr}^{${n}}$.`,
                      `Potęgujemy: $${odwr}^{${n}}=${wynik.tex()}$.`,
                    ];
              return zadanie(`Oblicz wartość potęgi $${podst}^{-${n}}$.`, kroki, wynik, "Wartość $=$");
            }
            const { a, e1, e2, e3, e } = probuj(() => {
              const a = r.pick([2, 3, 5]);
              const e1 = r.int(2, 7);
              const e2 = r.pick([-4, -3, -2, 2, 3, 4]);
              const e3 = r.pick([-3, -2, 2, 3, 4]);
              const e = e1 + e2 - e3;
              return e === 2 || e === 3 ? { a, e1, e2, e3, e } : null;
            });
            const nw = (n) => (n < 0 ? `(${n})` : `${n}`);
            return zadanie(
              `Oblicz wartość wyrażenia $\\frac{${a}^{${e1}}\\cdot${a}^{${e2}}}{${a}^{${e3}}}$.`,
              [
                `Podstawy są równe, więc w liczniku dodajemy wykładniki: $${e1}+${nw(e2)}=${e1 + e2}$.`,
                `W dzieleniu odejmujemy wykładniki: $${e1 + e2}-${nw(e3)}=${e}$.`,
                `Wartość wyrażenia: $${a}^{${e}}=${a ** e}$.`,
              ],
              q(a ** e), "Wartość $=$",
            );
          },
        },
        {
          id: "wykladnicza-wlasnosci",
          nazwa: "Własności funkcji wykładniczej",
          opis: "Wartość funkcji wykładniczej, podstawa z punktu na wykresie albo liczba funkcji malejących.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const { a, k, w } = probuj(() => {
                const a = r.pick(BAZY);
                const k = r.pick([-3, -2, -1, 2, 3, 4]);
                const w = a.pow(k);
                return ladnaWartosc(w) ? { a, k, w } : null;
              });
              const odwr = q(1).div(a);
              const kroki = [`Podstawiamy: $f(${k})=${baza(a)}^{${k}}$.`];
              if (k < 0) kroki.push(`Wykładnik ujemny – odwracamy podstawę: $${baza(a)}^{${k}}=${pw(baza(odwr), -k)}$.`);
              kroki.push(`Obliczamy: $f(${k})=${w.tex()}$.`);
              return zadanie(`Dana jest funkcja $f(x)=${baza(a)}^{x}$. Oblicz $f(${k})$.`, kroki, w, `$f(${k}) =$`);
            }
            if (tryb === 1) {
              const { a, k, w } = probuj(() => {
                const a = r.pick(BAZY);
                const k = r.pick([-3, -2, -1, 2, 3]);
                const w = a.pow(k);
                return w.d <= 12 && w.n <= 125 ? { a, k, w } : null;
              });
              return zadanie(
                `Wykres funkcji $f(x)=a^{x}$, gdzie $a>0$ i $a\\ne1$, przechodzi przez punkt $(${k},\\ ${w.tex()})$. Wyznacz $a$.`,
                [
                  `Punkt leży na wykresie, więc $a^{${k}}=${w.tex()}$.`,
                  `Ponieważ $${baza(a)}^{${k}}=${w.tex()}$ i podstawa jest dodatnia, to $a=${a.tex()}$.`,
                ],
                a, "$a =$",
              );
            }
            const pula = r.shuffle([q(2), q(3), q(4), q(5), q(1, 2), q(1, 3), q(1, 4), q(2, 3), q(3, 2), q(4, 5), q(5, 4), q(1, 5)]).slice(0, 5);
            const mal = pula.filter((a) => a.cmp(1) < 0);
            if (mal.length < 1 || mal.length > 4) {
              pula[0] = q(1, 2);
              pula[1] = q(3);
            }
            const mal2 = pula.filter((a) => a.cmp(1) < 0);
            const lista = pula.map((a, i) => `$f_{${i + 1}}(x)=${baza(a)}^{x}$`).join(", ");
            return zadanie(
              `Dane są funkcje: ${lista}. Ile spośród nich jest malejących?`,
              [
                "Funkcja $a^{x}$ jest malejąca, gdy $0<a<1$, a rosnąca, gdy $a>1$.",
                `Podstawy mniejsze od $1$ mają funkcje: ${mal2.length ? mal2.map((a) => `$f_{${pula.indexOf(a) + 1}}$`).join(", ") : "żadna"}.`,
                `Funkcji malejących jest $${mal2.length}$.`,
              ],
              q(mal2.length), "Liczba funkcji malejących $=$",
            );
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Przekształcenia wykresów funkcji wykładniczych
    {
      id: "przeksztalcenia-wykladnicze",
      nazwa: "Przekształcenia wykresów funkcji wykładniczych",
      sciaga: [
        {
          nazwa: "Przesunięcie poziome",
          slownie: "Wykres funkcji $g(x)=a^{x-p}$ powstaje z wykresu $f(x)=a^{x}$ przez przesunięcie o $p$ jednostek w prawo (gdy $p>0$) albo w lewo (gdy $p<0$). Asymptota i zbiór wartości się nie zmieniają.",
          tex: "g(x)=a^{x-p}\\qquad\\vec{v}=[p,\\ 0]",
          litery: "$p$ – o ile przesuwamy w poziomie, $\\vec{v}$ – wektor przesunięcia.",
          przyklad: "Wykres $g(x)=2^{x-3}$ to wykres $2^{x}$ przesunięty o $3$ w prawo. Punkt $(0,1)$ przechodzi na punkt $(3,1)$.",
          uwaga: "Znak jest „na odwrót”: $x-3$ oznacza przesunięcie w prawo, a $x+3$ w lewo.",
        },
        {
          nazwa: "Przesunięcie pionowe",
          slownie: "Wykres funkcji $g(x)=a^{x}+q$ powstaje przez przesunięcie wykresu $a^{x}$ o $q$ jednostek w górę (gdy $q>0$) albo w dół (gdy $q<0$). Asymptota też się przesuwa: z osi $OX$ na prostą $y=q$.",
          tex: "g(x)=a^{x}+q\\qquad y=q\\qquad ZW=(q,+\\infty)",
          litery: "$q$ – o ile przesuwamy w pionie, $y=q$ – równanie asymptoty, $ZW$ – zbiór wartości.",
          przyklad: "Dla $g(x)=2^{x}-3$: asymptota $y=-3$, zbiór wartości $(-3,+\\infty)$, punkt $(0,1)$ przechodzi na $(0,-2)$.",
          uwaga: "Przesunięcie poziome nie zmienia asymptoty ani zbioru wartości. Dziedzina zawsze zostaje $\\mathbb{R}$.",
        },
        {
          nazwa: "Przesunięcie o wektor",
          slownie: "Przesunięcie o wektor $[p,\\ q]$ łączy oba przesunięcia. Dziedzina to nadal $\\mathbb{R}$, monotoniczność jest taka jak dla $a^{x}$, a punkt $(0,1)$ przechodzi na $(p,\\ 1+q)$.",
          tex: "g(x)=a^{x-p}+q\\qquad(0,1)\\to(p,\\ 1+q)",
          litery: "$[p,\\ q]$ – wektor przesunięcia: $p$ w poziomie, $q$ w pionie.",
          przyklad: "Wykres $f(x)=\\left(\\frac{1}{2}\\right)^{x}$ przesuwamy o $[2,\\ -1]$: $g(x)=\\left(\\frac{1}{2}\\right)^{x-2}-1$. Asymptota $y=-1$, $ZW=(-1,+\\infty)$, funkcja maleje, a punkt $(2,0)$ jest miejscem zerowym.",
          uwaga: "Miejsce zerowe istnieje tylko wtedy, gdy $q<0$ (wykres musi zejść poniżej osi $OX$).",
        },
        {
          nazwa: "Punkt przecięcia z osią OY",
          slownie: "Aby znaleźć punkt wspólny z osią $OY$, podstawiamy $x=0$ do wzoru funkcji.",
          tex: "g(0)=a^{-p}+q",
          litery: "$p$, $q$ – liczby ze wzoru $g(x)=a^{x-p}+q$.",
          przyklad: "Dla $g(x)=2^{x-3}+1$: $g(0)=2^{-3}+1=\\frac{1}{8}+1=\\frac{9}{8}$.",
          uwaga: "Przy $x=0$ wykładnik jest równy $-p$, a nie $p$.",
        },
      ],
      jak: [
        "Z wzoru $a^{x-p}+q$ odczytaj wektor przesunięcia $[p,\\ q]$ (pamiętaj o znaku przy $p$).",
        "Asymptota ma równanie $y=q$, a zbiór wartości to $(q,+\\infty)$.",
        "Punkty szczególne przesuń o wektor: $(0,1)\\to(p,\\ 1+q)$.",
        "Wartości funkcji liczysz podstawieniem do wzoru, uważając na ujemne wykładniki.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Wykres funkcji $f(x)=3^{x}$ przesunięto o wektor $[2,\\ -4]$. Wzór otrzymanej funkcji $g$ ma postać: **Wybierz właściwą odpowiedź.**",
          opcje: ["$g(x)=3^{x+2}-4$", "$g(x)=3^{x-2}-4$", "$g(x)=3^{x-2}+4$", "$g(x)=3^{x-4}+2$"],
          poprawna: 1,
        },
        {
          nr: "9",
          tresc: "Jakie równanie ma asymptota wykresu funkcji $g(x)=\\left(\\frac{1}{2}\\right)^{x-1}+3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$y=1$", "$x=3$", "$y=3$", "$y=-1$"],
          poprawna: 2,
        },
        {
          nr: "10",
          tresc: "Jaki jest zbiór wartości funkcji $g(x)=2^{x+1}-5$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-\\infty,-5)$", "$(5,+\\infty)$", "$(-1,+\\infty)$", "$(-5,+\\infty)$"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "Ile wynosi $g(0)$ dla funkcji $g(x)=3^{x-2}+1$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10$", "$\\frac{10}{9}$", "$\\frac{1}{9}$", "$0$"],
          poprawna: 1,
        },
        {
          nr: "12",
          tresc: "Dana jest funkcja $g(x)=\\left(\\frac{1}{2}\\right)^{x+2}-3$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Asymptotą wykresu funkcji $g$ jest prosta $y=-3$.", litery: "PF", poprawna: 0 },
            { tekst: "Funkcja $g$ jest rosnąca.", litery: "PF", poprawna: 1 },
            { tekst: "Wykres funkcji $g$ przecina oś $OY$ w punkcie $\\left(0,\\ -\\frac{11}{4}\\right)$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 3,
          tresc: "Wykres funkcji $f(x)=2^{x}$ przesunięto o wektor $[-1,\\ 3]$ i otrzymano wykres funkcji $g$. a) Podaj wzór funkcji $g$. b) Podaj równanie asymptoty i zbiór wartości funkcji $g$. c) Oblicz $g(-3)$. **Zapisz obliczenia.**",
          rozwiazanie: "a) Przesunięcie o wektor $[p,\\ q]=[-1,\\ 3]$ daje wzór $g(x)=2^{x-p}+q=2^{x-(-1)}+3=2^{x+1}+3$.\n\nb) Asymptota przesuwa się z osi $OX$ o $3$ w górę, więc ma równanie $y=3$. Zbiór wartości: $(3,+\\infty)$.\n\nc) $g(-3)=2^{-3+1}+3=2^{-2}+3=\\frac{1}{4}+3=3\\frac{1}{4}$.\n\nOdpowiedź: a) $g(x)=2^{x+1}+3$, b) $y=3$, $ZW=(3,+\\infty)$, c) $g(-3)=3\\frac{1}{4}$.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Wykres funkcji $g(x)=2^{x-p}+q$ ma asymptotę o równaniu $y=-4$ i przechodzi przez punkt $(3,\\ 0)$. Wyznacz $p$ oraz $q$ i podaj zbiór wartości funkcji $g$. **Zapisz obliczenia.**",
          rozwiazanie: "Asymptota funkcji $2^{x-p}+q$ ma równanie $y=q$, więc $q=-4$.\n\nPunkt $(3,0)$ leży na wykresie: $2^{3-p}-4=0$, czyli $2^{3-p}=4=2^{2}$.\n\nPodstawy są równe, więc $3-p=2$, a stąd $p=1$.\n\nZbiór wartości: $(q,+\\infty)=(-4,+\\infty)$.\n\nOdpowiedź: $p=1$, $q=-4$, $ZW=(-4,+\\infty)$.",
        },
      ],
      generatory: [
        {
          id: "przesuniecie-wykladniczej",
          nazwa: "Przesunięta funkcja wykładnicza",
          opis: "Asymptota, wartość funkcji i wektor przesunięcia dla wzoru $a^{x-p}+q$.",
          generuj(r) {
            const a = r.pick([q(2), q(3), q(4), q(1, 2), q(1, 3), q(2, 3)]);
            const p = r.pick([-3, -2, -1, 1, 2, 3]);
            const qq = r.pick([-4, -3, -2, -1, 1, 2, 3, 4]);
            const wzor = `g(x)=${baza(a)}^{x${pm(-p)}}${pm(qq)}`;
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              return zadanie(
                `Wykres funkcji $f(x)=${baza(a)}^{x}$ przesunięto o wektor $[${p},\\ ${qq}]$ i otrzymano wykres funkcji $g$. Asymptota pozioma wykresu funkcji $g$ ma równanie $y=c$. Podaj $c$.`,
                [
                  `Przesunięcie o wektor $[p,\\ q]$ daje wzór $a^{x-p}+q$, czyli tu $${wzor}$.`,
                  `Asymptotą funkcji $f$ jest prosta $y=0$. Przesuwamy ją o $${Math.abs(qq)}$ ${qq > 0 ? "w górę" : "w dół"}, więc asymptota $g$ to prosta $y=${qq}$.`,
                ],
                q(qq), "$c =$",
              );
            }
            if (tryb === 1) {
              const w = a.pow(-p).add(qq);
              if (!ladnaWartosc(w)) return this.generuj(r);
              return zadanie(
                `Dana jest funkcja $${wzor}$. Oblicz $g(0)$.`,
                [
                  `Podstawiamy $x=0$: wykładnik to $0${pm(-p)}=${-p}$.`,
                  `$g(0)=${pw(baza(a), -p)}${pm(qq)}=${a.pow(-p).tex()}${pm(qq)}=${w.tex()}$.`,
                ],
                w, "$g(0) =$",
              );
            }
            if (tryb === 2) {
              const k = r.pick([-2, -1, 1, 2, 3]);
              const w = a.pow(k).add(qq);
              if (!ladnaWartosc(w)) return this.generuj(r);
              const X = p + k;
              return zadanie(
                `Dana jest funkcja $${wzor}$. Oblicz $g(${X})$.`,
                [
                  `Wykładnik dla $x=${X}$ to $${X}${pm(-p)}=${k}$.`,
                  `$g(${X})=${pw(baza(a), k)}${pm(qq)}=${a.pow(k).tex()}${pm(qq)}=${w.tex()}$.`,
                ],
                w, `$g(${X}) =$`,
              );
            }
            return zadanie(
              `Wykres funkcji $f(x)=${baza(a)}^{x}$ przesunięto o pewien wektor $[u,\\ v]$ i otrzymano wykres funkcji $${wzor}$. Podaj $u+v$.`,
              [
                `Przesunięcie o wektor $[u,\\ v]$ daje wzór $${baza(a)}^{x-u}+v$.`,
                `Porównujemy z $${wzor}$: wykładnik $x-u$ ma postać $x${pm(-p)}$, więc $u=${p}$, a $v=${qq}$.`,
                `Suma: $u+v=${p}${pm(qq)}=${p + qq}$.`,
              ],
              q(p + qq), "$u+v =$",
            );
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Równania i nierówności wykładnicze
    {
      id: "rownania-nierownosci-wykladnicze",
      nazwa: "Równania i nierówności wykładnicze",
      sciaga: [
        {
          nazwa: "Równanie wykładnicze",
          slownie: "Obie strony zapisujemy jako potęgi tej samej podstawy. Skoro funkcja wykładnicza jest różnowartościowa, to równe potęgi o tej samej podstawie mają równe wykładniki.",
          tex: "a^{u}=a^{v}\\iff u=v\\qquad a>0,\\ a\\ne1",
          litery: "$u$, $v$ – wyrażenia w wykładnikach (mogą zawierać $x$).",
          przyklad: "$2^{x}=32$: $32=2^{5}$, więc $x=5$. Dalej: $3^{x-1}=\\frac{1}{9}=3^{-2}$, więc $x-1=-2$ i $x=-1$.",
          uwaga: "Nie dziel stron przez podstawę: z $2^{x}=32$ nie wynika $x=16$.",
        },
        {
          nazwa: "Ta sama podstawa",
          slownie: "Liczby zapisujemy jako potęgi wspólnej podstawy: ułamek $\\frac{1}{9}$ to $3^{-2}$, a podstawa $\\frac{1}{2}$ to $2^{-1}$. Przydają się wzory na potęgę ułamka i potęgę potęgi.",
          tex: "\\frac{1}{a^{n}}=a^{-n}\\qquad\\left(\\frac{1}{a}\\right)^{x}=a^{-x}\\qquad\\left(a^{m}\\right)^{x}=a^{mx}",
          litery: "$a$ – wspólna podstawa, $m$, $n$ – liczby całkowite.",
          przyklad: "$5^{2x}=125=5^{3}$, więc $2x=3$ i $x=\\frac{3}{2}$. Dalej: $\\left(\\frac{1}{2}\\right)^{x}=8$ daje $2^{-x}=2^{3}$, czyli $x=-3$.",
          uwaga: "Podstawa $4$ czy $9$ to też potęga: $4^{x}=\\left(2^{2}\\right)^{x}=2^{2x}$.",
        },
        {
          nazwa: "Nierówność wykładnicza",
          slownie: "Sprowadzamy obie strony do tej samej podstawy i porównujemy wykładniki. Dla podstawy większej od $1$ zwrot nierówności zostaje, dla podstawy z przedziału $(0,1)$ zmienia się na przeciwny.",
          tex: "a>1:\\ a^{u}<a^{v}\\iff u<v\\qquad0<a<1:\\ a^{u}<a^{v}\\iff u>v",
          litery: "$u$, $v$ – wykładniki, $a$ – podstawa.",
          przyklad: "$2^{x}\\ge16$ daje $x\\ge4$. Natomiast $\\left(\\frac{1}{2}\\right)^{x}>4$, czyli $\\left(\\frac{1}{2}\\right)^{x}>\\left(\\frac{1}{2}\\right)^{-2}$, daje $x<-2$.",
          uwaga: "Najczęstszy błąd: nieodwrócony znak przy podstawie z przedziału $(0,1)$.",
        },
      ],
      jak: [
        "Zapisz obie strony jako potęgi tej samej podstawy (np. $8=2^{3}$, $\\frac{1}{9}=3^{-2}$, $\\frac{1}{2}=2^{-1}$).",
        "Porównaj wykładniki: dla równania – przyrównaj, dla nierówności – zachowaj lub odwróć zwrot (zależnie od podstawy).",
        "Rozwiąż otrzymane równanie albo nierówność liniową.",
        "Rozwiązanie nierówności zapisz jako przedział i sprawdź jeden punkt.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Rozwiązaniem równania $3^{x+1}=81$ jest liczba: **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$27$", "$3$", "$5$"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "Rozwiązaniem równania $\\left(\\frac{1}{2}\\right)^{x}=16$ jest liczba: **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$-4$", "$-8$", "$\\frac{1}{4}$"],
          poprawna: 1,
        },
        {
          nr: "17",
          tresc: "Rozwiązaniem równania $2^{3x-1}=\\frac{1}{4}$ jest liczba: **Wybierz właściwą odpowiedź.**",
          opcje: ["$1$", "$-1$", "$\\frac{1}{3}$", "$-\\frac{1}{3}$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "Zbiorem rozwiązań nierówności $\\left(\\frac{1}{3}\\right)^{x}<\\frac{1}{27}$ jest: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-\\infty,3)$", "$(3,+\\infty)$", "$(-\\infty,-3)$", "$(-3,+\\infty)$"],
          poprawna: 1,
        },
        {
          nr: "19",
          tresc: "Zbiorem rozwiązań nierówności $2^{x-1}\\le8$ jest: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\langle4,+\\infty)$", "$(-\\infty,4)$", "$(-\\infty,2\\rangle$", "$(-\\infty,4\\rangle$"],
          poprawna: 3,
        },
        {
          nr: "20",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Równanie $7^{x}=-7$ nie ma rozwiązań.", litery: "PF", poprawna: 0 },
            { tekst: "Rozwiązaniem równania $4^{x}=8$ jest liczba $2$.", litery: "PF", poprawna: 1 },
            { tekst: "Liczba $3$ spełnia nierówność $\\left(\\frac{1}{2}\\right)^{x}<\\frac{1}{4}$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "21",
          punkty: 2,
          tresc: "Rozwiąż równanie $\\left(\\frac{1}{4}\\right)^{x-1}=8$. **Zapisz obliczenia.**",
          rozwiazanie: "Zapisujemy obie strony jako potęgi liczby $2$: $\\frac{1}{4}=2^{-2}$ oraz $8=2^{3}$.\n\nLewa strona: $\\left(2^{-2}\\right)^{x-1}=2^{-2(x-1)}=2^{-2x+2}$.\n\nPrzyrównujemy wykładniki: $-2x+2=3$, czyli $-2x=1$.\n\nStąd $x=-\\frac{1}{2}$.\n\nSprawdzenie: $\\left(\\frac{1}{4}\\right)^{-\\frac{3}{2}}=4^{\\frac{3}{2}}=8$.\n\nOdpowiedź: $x=-\\frac{1}{2}$.",
        },
        {
          nr: "22",
          punkty: 3,
          tresc: "Rozwiąż nierówność $\\left(\\frac{2}{3}\\right)^{2x-1}\\ge\\frac{9}{4}$ i podaj największą liczbę całkowitą, która ją spełnia. **Zapisz obliczenia.**",
          rozwiazanie: "Zapisujemy prawą stronę jako potęgę podstawy $\\frac{2}{3}$: $\\frac{9}{4}=\\left(\\frac{2}{3}\\right)^{-2}$.\n\nNierówność ma postać $\\left(\\frac{2}{3}\\right)^{2x-1}\\ge\\left(\\frac{2}{3}\\right)^{-2}$.\n\nPodstawa należy do przedziału $(0,1)$, więc zwrot nierówności zmieniamy: $2x-1\\le-2$.\n\nStąd $2x\\le-1$, czyli $x\\le-\\frac{1}{2}$, a zbiór rozwiązań to $\\left(-\\infty,-\\frac{1}{2}\\right\\rangle$.\n\nNajwiększa liczba całkowita w tym zbiorze to $-1$. Sprawdzenie: $\\left(\\frac{2}{3}\\right)^{-3}=\\frac{27}{8}\\ge\\frac{9}{4}$, a dla $x=0$ mamy $\\frac{3}{2}<\\frac{9}{4}$.\n\nOdpowiedź: $x\\le-\\frac{1}{2}$, największa liczba całkowita to $-1$.",
        },
      ],
      generatory: [
        {
          id: "rownanie-wykladnicze",
          nazwa: "Równanie wykładnicze",
          opis: "Równanie $a^{mx+b}=a^{k}$ sprowadzalne do tej samej podstawy (także podstawa $\\frac{1}{a}$ albo $a^{2}$).",
          generuj(r) {
            const tryb = r.int(0, 3);
            const rhs = (c, k) => (k >= 0 ? String(c ** k) : `\\frac{1}{${c ** -k}}`);
            if (tryb <= 1) {
              const { c, k, m, b } = probuj(() => {
                const c = r.pick([2, 3, 4, 5]);
                const k = r.intBez(-3, 4, 0, 1);
                if (c ** Math.abs(k) > 250) return null;
                return { c, k, m: r.pick([1, 1, 2, 3]), b: r.int(-3, 3) };
              });
              const x = q(k - b, m);
              const kroki = [
                `Zapisujemy prawą stronę jako potęgę liczby $${c}$: $${rhs(c, k)}=${c}^{${k}}$.`,
                `Podstawy są równe, więc przyrównujemy wykładniki: $${liniowy(m, b)}=${k}$.`,
              ];
              if (b === 0) {
                if (m > 1) kroki.push(`Stąd $x=${x.tex()}$.`);
              } else if (m === 1) kroki.push(`Stąd $x=${k}${pm(-b)}=${x.tex()}$.`);
              else kroki.push(`Stąd $${m}x=${k - b}$, czyli $x=${x.tex()}$.`);
              return zadanie(`Rozwiąż równanie $${c}^{${liniowy(m, b)}}=${rhs(c, k)}$.`, kroki, x, "$x =$");
            }
            if (tryb === 2) {
              const { c, k, m, b } = probuj(() => {
                const c = r.pick([2, 3, 4, 5]);
                const k = r.intBez(-3, 4, 0, 1);
                if (c ** Math.abs(k) > 250) return null;
                return { c, k, m: r.pick([1, 1, 2]), b: r.int(-3, 3) };
              });
              const x = q(-k - b, m);
              const u = liniowy(m, b);
              const minus = b === 0 ? `-${u}` : `-(${u})`;
              const kroki = [
                `Zapisujemy podstawę jako potęgę liczby $${c}$: $\\left(\\frac{1}{${c}}\\right)^{${u}}=${c}^{${minus}}$, a prawa strona to $${c}^{${k}}$.`,
                `Przyrównujemy wykładniki: $${minus}=${k}$, czyli $${u}=${-k}$.`,
              ];
              if (b === 0) {
                if (m > 1) kroki.push(`Stąd $x=${x.tex()}$.`);
              } else if (m === 1) kroki.push(`Stąd $x=${-k}${pm(-b)}=${x.tex()}$.`);
              else kroki.push(`Stąd $${m}x=${-k - b}$, czyli $x=${x.tex()}$.`);
              return zadanie(`Rozwiąż równanie $\\left(\\frac{1}{${c}}\\right)^{${u}}=${rhs(c, k)}$.`, kroki, x, "$x =$");
            }
            const { c, s, k } = probuj(() => {
              const c = r.pick([2, 3, 5]);
              const s = r.pick([2, 2, 3]);
              const k = r.int(2, 6);
              return c ** k <= 243 && (c !== 5 || s === 2) ? { c, s, k } : null;
            });
            const x = q(k, s);
            return zadanie(
              `Rozwiąż równanie $${c ** s}^{x}=${c ** k}$.`,
              [
                `Zapisujemy $${c ** s}=${c}^{${s}}$, więc $${c ** s}^{x}=\\left(${c}^{${s}}\\right)^{x}=${c}^{${s}x}$.`,
                `Prawa strona: $${c ** k}=${c}^{${k}}$. Przyrównujemy wykładniki: $${s}x=${k}$.`,
                `Stąd $x=${x.tex()}$.`,
              ],
              x, "$x =$",
            );
          },
        },
        {
          id: "nierownosc-wykladnicza",
          nazwa: "Nierówność wykładnicza",
          opis: "Nierówność $a^{mx+b}\\gtrless a^{k}$ dla podstawy większej lub mniejszej od 1: koniec przedziału i zbiór rozwiązań.",
          generuj(r) {
            const { a, k, m, b, rhs } = probuj(() => {
              const a = r.pick([q(2), q(3), q(5), q(1, 2), q(1, 3), q(2, 3), q(3, 2), q(1, 4)]);
              const k = r.intBez(-3, 3, 0, 1);
              const rhs = a.pow(k);
              if (rhs.n > 125 || rhs.d > 125) return null;
              return { a, k, m: r.pick([1, 1, 2, 3]), b: r.int(-3, 3), rhs };
            });
            const znak = r.pick(ZNAKI);
            const rosnie = a.cmp(1) > 0;
            const znakX = rosnie ? znak : ODWROC[znak];
            const x0 = q(k - b, m);
            const prawo = znakX === ">" || znakX === "\\ge";
            const ostra = znak === ">" || znak === "<";
            const idx = ostra ? (prawo ? 0 : 1) : prawo ? 2 : 3;
            const opcje = przedzialy(x0);
            const kroki = [
              `Zapisujemy prawą stronę jako potęgę tej samej podstawy: $${rhs.tex()}=${pw(baza(a), k)}$.`,
              rosnie
                ? `Podstawa $${a.tex()}$ jest większa od $1$, więc funkcja jest rosnąca i zwrot nierówności zostaje.`
                : `Podstawa $${a.tex()}$ należy do przedziału $(0,1)$, więc funkcja jest malejąca i zwrot nierówności się odwraca.`,
              `Porównujemy wykładniki: $${liniowy(m, b)}\\ ${znakX}\\ ${k}$.`,
              m === 1 && b === 0
                ? null
                : m === 1 || b === 0
                  ? `Stąd $x\\ ${znakX}\\ ${x0.tex()}$.`
                  : `Stąd $${m}x\\ ${znakX}\\ ${k - b}$, czyli $x\\ ${znakX}\\ ${x0.tex()}$.`,
              `Zbiór rozwiązań: ${opcje[idx]}.`,
            ].filter(Boolean);
            return {
              tresc: `Rozwiąż nierówność $${baza(a)}^{${liniowy(m, b)}}\\ ${znak}\\ ${rhs.tex()}$. W pierwszym polu wpisz liczbę będącą końcem przedziału rozwiązań, a w drugim wybierz zbiór rozwiązań.`,
              pola: [pole("x0", "Koniec przedziału $x_{0} =$"), { id: "zb", typ: "wybor", etykieta: "Zbiór rozwiązań", opcje }],
              odpowiedz: { x0, zb: idx },
              wynik: opcje[idx],
              rozwiazanie: kroki,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Logarytm. Funkcja logarytmiczna
    {
      id: "logarytm",
      nazwa: "Logarytm. Funkcja logarytmiczna",
      sciaga: [
        {
          nazwa: "Definicja logarytmu",
          slownie: "Logarytm przy podstawie $a$ z liczby $b$ to wykładnik, do którego trzeba podnieść $a$, żeby dostać $b$. Podstawa musi być dodatnia i różna od $1$, a liczba logarytmowana dodatnia.",
          tex: "\\log_{a}b=c\\iff a^{c}=b\\qquad a>0,\\ a\\ne1,\\ b>0",
          litery: "$a$ – podstawa, $b$ – liczba logarytmowana, $c$ – wartość logarytmu.",
          przyklad: "$\\log_{2}8=3$, bo $2^{3}=8$. Dalej: $\\log_{3}\\frac{1}{9}=-2$, bo $3^{-2}=\\frac{1}{9}$, oraz $\\log_{9}3=\\frac{1}{2}$, bo $9^{\\frac{1}{2}}=3$.",
          uwaga: "Logarytm liczby ujemnej ani zera nie istnieje: $\\log_{2}(-4)$ nie ma sensu.",
        },
        {
          nazwa: "Logarytm dziesiętny i wartości szczególne",
          slownie: "Logarytm o podstawie $10$ zapisujemy bez podstawy: $\\log x=\\log_{10}x$. Zawsze $\\log_{a}1=0$ i $\\log_{a}a=1$, a podniesienie $a$ do logarytmu o podstawie $a$ „zjada” logarytm.",
          tex: "\\log x=\\log_{10}x\\qquad\\log_{a}1=0\\qquad\\log_{a}a=1\\qquad a^{\\log_{a}b}=b",
          litery: "$a$ – podstawa, $b>0$ – liczba logarytmowana.",
          przyklad: "$\\log1000=3$, $\\log0{,}01=-2$, $5^{\\log_{5}7}=7$.",
          uwaga: "Wartość $\\log_{a}b$ może być ujemna (np. $\\log_{2}\\frac{1}{8}=-3$), ale liczba logarytmowana nigdy.",
        },
        {
          nazwa: "Wzory na logarytm",
          slownie: "Logarytm iloczynu to suma logarytmów, logarytm ilorazu to różnica logarytmów, a wykładnik potęgi wychodzi przed logarytm. Wszystkie logarytmy mają tę samą podstawę.",
          tex: "\\log_{a}(xy)=\\log_{a}x+\\log_{a}y\\qquad\\log_{a}\\frac{x}{y}=\\log_{a}x-\\log_{a}y\\qquad\\log_{a}x^{r}=r\\cdot\\log_{a}x",
          litery: "$a>0$, $a\\ne1$, $x>0$, $y>0$, $r$ – dowolna liczba rzeczywista.",
          przyklad: "$\\log_{6}4+\\log_{6}9=\\log_{6}36=2$. Dalej: $\\log_{3}54-\\log_{3}2=\\log_{3}27=3$ oraz $2\\log_{5}10-\\log_{5}4=\\log_{5}100-\\log_{5}4=\\log_{5}25=2$.",
          uwaga: "Nie istnieje wzór na $\\log_{a}(x+y)$: to nie jest $\\log_{a}x+\\log_{a}y$.",
        },
        {
          nazwa: "Funkcja logarytmiczna",
          slownie: "Funkcja $f(x)=\\log_{a}x$ jest określona tylko dla dodatnich $x$, a przyjmuje wszystkie wartości rzeczywiste. Wykres przechodzi przez punkty $(1,0)$ i $(a,1)$, a prosta $x=0$ (oś $OY$) jest asymptotą pionową. Dla $a>1$ funkcja rośnie, dla $0<a<1$ maleje.",
          tex: "f(x)=\\log_{a}x\\qquad D=(0,+\\infty)\\qquad ZW=\\mathbb{R}\\qquad f(1)=0",
          litery: "$a>0$, $a\\ne1$ – podstawa, $D$ – dziedzina, $ZW$ – zbiór wartości.",
          przyklad: "Dla $f(x)=\\log_{2}x$: $f(1)=0$, $f(2)=1$, $f(8)=3$, $f\\left(\\frac{1}{4}\\right)=-2$, funkcja rośnie. Dla $g(x)=\\log_{\\frac{1}{2}}x$: $g(4)=-2$, funkcja maleje.",
          uwaga: "Porównując logarytmy o podstawie z przedziału $(0,1)$, odwracamy nierówność: $\\log_{\\frac{1}{2}}2>\\log_{\\frac{1}{2}}8$.",
        },
      ],
      jak: [
        "Najpierw sprawdź założenia: podstawa dodatnia i różna od $1$, liczba logarytmowana dodatnia.",
        "Aby obliczyć $\\log_{a}b$, szukaj wykładnika $c$, dla którego $a^{c}=b$ (zapisz $b$ jako potęgę podstawy).",
        "Sumę lub różnicę logarytmów o tej samej podstawie zamień na jeden logarytm (iloczyn lub iloraz), a potem oblicz.",
        "Przy funkcji logarytmicznej pamiętaj: dziedzina $x>0$, a monotoniczność zależy od podstawy.",
      ],
      zadania: [
        {
          nr: "23",
          tresc: "Ile wynosi $\\log_{3}81$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$27$", "$4$", "$3$", "$\\frac{1}{4}$"],
          poprawna: 1,
        },
        {
          nr: "24",
          tresc: "Ile wynosi $\\log_{\\frac{1}{2}}8$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$-\\frac{1}{3}$", "$-3$", "$\\frac{1}{3}$"],
          poprawna: 2,
        },
        {
          nr: "25",
          tresc: "Ile wynosi $\\log_{2}5+\\log_{2}\\frac{8}{5}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\log_{2}\\frac{33}{5}$", "$3$", "$8$", "$\\frac{8}{5}$"],
          poprawna: 1,
        },
        {
          nr: "26",
          tresc: "Wykres funkcji $f(x)=\\log_{a}x$ przechodzi przez punkt $(4,\\ -2)$. Ile wynosi $a$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-2$", "$2$", "$\\frac{1}{4}$", "$\\frac{1}{2}$"],
          poprawna: 3,
        },
        {
          nr: "27",
          tresc: "Ile wynosi $2\\log_{3}6-\\log_{3}4$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\log_{3}8$", "$4$", "$2$", "$\\log_{3}2$"],
          poprawna: 2,
        },
        {
          nr: "28",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\log0{,}001=-3$.", litery: "PF", poprawna: 0 },
            { tekst: "Funkcja $f(x)=\\log_{0{,}5}x$ jest rosnąca.", litery: "PF", poprawna: 1 },
            { tekst: "$\\log_{4}2=\\frac{1}{2}$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "29",
          punkty: 2,
          tresc: "Oblicz $\\log_{2}\\frac{1}{16}+\\log_{9}3-\\log1000$. **Zapisz obliczenia.**",
          rozwiazanie: "Z definicji: $\\log_{2}\\frac{1}{16}=-4$, bo $2^{-4}=\\frac{1}{16}$.\n\n$\\log_{9}3=\\frac{1}{2}$, bo $9^{\\frac{1}{2}}=3$.\n\n$\\log1000=\\log_{10}1000=3$, bo $10^{3}=1000$.\n\nSumujemy: $-4+\\frac{1}{2}-3=-\\frac{13}{2}=-6{,}5$.\n\nOdpowiedź: Wartość wyrażenia jest równa $-6{,}5$.",
        },
        {
          nr: "30",
          punkty: 3,
          tresc: "Oblicz $2\\log_{5}10-\\log_{5}4+\\log_{5}\\frac{1}{5}$. **Zapisz obliczenia.**",
          rozwiazanie: "Wykładnik wprowadzamy pod logarytm: $2\\log_{5}10=\\log_{5}10^{2}=\\log_{5}100$.\n\nRóżnica logarytmów: $\\log_{5}100-\\log_{5}4=\\log_{5}\\frac{100}{4}=\\log_{5}25=2$.\n\nOstatni składnik: $\\log_{5}\\frac{1}{5}=-1$, bo $5^{-1}=\\frac{1}{5}$.\n\nSumujemy: $2+(-1)=1$.\n\nOdpowiedź: Wartość wyrażenia jest równa $1$.",
        },
      ],
      generatory: [
        {
          id: "logarytm-obliczanie",
          nazwa: "Obliczanie logarytmu",
          opis: "Logarytm z definicji: podstawa całkowita, ułamkowa lub dziesiętna, liczba logarytmowana całkowita albo ułamek.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0 || tryb === 1) {
              const a = r.pick([2, 3, 4, 5, 10]);
              const k = tryb === 0 ? r.int(2, 4) : r.int(1, 3);
              if (a ** k > 1000 || (a === 4 && k > 3) || (a === 5 && k > 3)) return this.generuj(r);
              const b = tryb === 0 ? q(a ** k) : q(1, a ** k);
              const arg = a === 10 ? dec(b) : b.tex();
              const wyk = tryb === 0 ? k : -k;
              return zadanie(
                `Oblicz $${logT(a)}${a === 10 ? "\\," : " "}${arg}$.`,
                [
                  `Szukamy wykładnika $x$, dla którego $${a}^{x}=${arg}$.`,
                  `Zapisujemy $${arg}=${pw(a, wyk)}$, więc $x=${wyk}$.`,
                ],
                q(wyk), "Wartość $=$",
              );
            }
            if (tryb === 2) {
              const { c, m, p } = probuj(() => {
                const [c, m] = r.pick([[2, 2], [3, 2], [5, 2], [2, 3], [3, 3], [2, 4], [3, 4]]);
                const p = r.int(1, 5);
                return p % m !== 0 && c ** p <= 250 ? { c, m, p } : null;
              });
              const x = q(p, m);
              return zadanie(
                `Oblicz $\\log_{${c ** m}}${c ** p}$.`,
                [
                  `Szukamy $x$ takiego, że $${c ** m}^{x}=${c ** p}$.`,
                  p === 1
                    ? `Zapisujemy podstawę jako potęgę liczby $${c}$: $${c ** m}=${c}^{${m}}$. Liczba $${c}$ jest pierwszą potęgą liczby $${c}$.`
                    : `Zapisujemy obie liczby jako potęgi liczby $${c}$: $${c ** m}=${c}^{${m}}$, $${c ** p}=${c}^{${p}}$.`,
                  `Wtedy $${c}^{${m}x}=${pw(c, p)}$, więc $${m}x=${p}$ i $x=${x.tex()}$.`,
                ],
                x, "Wartość $=$",
              );
            }
            const c = r.pick([2, 3, 4, 5]);
            const k = r.int(2, 4);
            if (c ** k > 250) return this.generuj(r);
            const odwrotna = r.chance();
            const arg = odwrotna ? `\\frac{1}{${c ** k}}` : String(c ** k);
            const wyk = odwrotna ? k : -k;
            return zadanie(
              `Oblicz $\\log_{${dec(q(1, c))}}${arg}$.`,
              [
                `Szukamy $x$ takiego, że $${baza(q(1, c))}^{x}=${arg}$.`,
                odwrotna
                  ? `Zachodzi $${baza(q(1, c))}^{${k}}=\\frac{1}{${c ** k}}$, więc $x=${k}$.`
                  : `Zachodzi $${baza(q(1, c))}^{-${k}}=${c}^{${k}}=${c ** k}$, więc $x=-${k}$.`,
              ],
              q(wyk), "Wartość $=$",
            );
          },
        },
        {
          id: "wzory-logarytmow",
          nazwa: "Wzory na logarytm",
          opis: "Suma, różnica i wielokrotność logarytmów o tej samej podstawie – wartość wyrażenia.",
          generuj(r) {
            const tryb = r.int(0, 3);
            const a = r.pick([2, 3, 5, 6, 10]);
            if (tryb === 0 || tryb === 3) {
              const k = r.int(2, 3);
              const N = a ** k;
              if (N > 1000) return this.generuj(r);
              const u = r.pick([2, 3, 4, 5, 6, 7, 9, 12, 15, 18, 20, 25]);
              if (u >= N) return this.generuj(r);
              const v = q(N, u);
              if (tryb === 0 && !v.calkowita) return this.generuj(r);
              if (tryb === 3 && v.calkowita) return this.generuj(r);
              return zadanie(
                `Oblicz wartość wyrażenia $${logT(a)}${a === 10 ? "\\," : " "}${u}+${logT(a)}${a === 10 ? "\\," : " "}${v.tex()}$.`,
                [
                  `Podstawy są równe, więc dodajemy logarytmy iloczynu: $${logT(a)}${a === 10 ? "\\," : " "}${u}+${logT(a)}${a === 10 ? "\\," : " "}${v.tex()}=${logT(a)}\\left(${u}\\cdot${v.tex()}\\right)$.`,
                  `Iloczyn: $${u}\\cdot${v.tex()}=${N}=${a}^{${k}}$.`,
                  `Zatem $${logT(a)}${a === 10 ? "\\," : " "}${a}^{${k}}=${k}$.`,
                ],
                q(k), "Wartość $=$",
              );
            }
            if (tryb === 1) {
              const k = r.int(2, 3);
              const v = r.pick([2, 3, 4, 5, 7]);
              const u = v * a ** k;
              if (u > 1000) return this.generuj(r);
              const sp = a === 10 ? "\\," : " ";
              return zadanie(
                `Oblicz wartość wyrażenia $${logT(a)}${sp}${u}-${logT(a)}${sp}${v}$.`,
                [
                  `Podstawy są równe, więc odejmujemy logarytmy ilorazu: $${logT(a)}${sp}${u}-${logT(a)}${sp}${v}=${logT(a)}\\frac{${u}}{${v}}$.`,
                  `Iloraz: $\\frac{${u}}{${v}}=${a ** k}=${a}^{${k}}$.`,
                  `Zatem $${logT(a)}${sp}${a}^{${k}}=${k}$.`,
                ],
                q(k), "Wartość $=$",
              );
            }
            const { b, n, v, k, aa } = probuj(() => {
              const aa = r.pick([2, 3, 5, 10]);
              const b = r.int(2, 10);
              const n = r.pick([2, 3]);
              const k = r.int(2, 3);
              const pot = (x, e) => Math.round(x ** e);
              let t = 0;
              while (aa ** t < b) t++;
              if (aa ** t === b || b ** n % aa ** k !== 0) return null;
              const v = pot(b, n) / aa ** k;
              return v >= 2 && v <= 1000 && v !== b ? { b, n, v, k, aa } : null;
            });
            const sp = aa === 10 ? "\\," : " ";
            return zadanie(
              `Oblicz wartość wyrażenia $${n}${logT(aa)}${sp}${b}-${logT(aa)}${sp}${v}$.`,
              [
                `Wykładnik wprowadzamy pod logarytm: $${n}${logT(aa)}${sp}${b}=${logT(aa)}${sp}${b}^{${n}}=${logT(aa)}${sp}${b ** n}$.`,
                `Odejmujemy logarytmy: $${logT(aa)}${sp}${b ** n}-${logT(aa)}${sp}${v}=${logT(aa)}\\frac{${b ** n}}{${v}}=${logT(aa)}${sp}${aa ** k}$.`,
                `Zatem $${logT(aa)}${sp}${aa ** k}=${k}$, bo $${aa}^{${k}}=${aa ** k}$.`,
              ],
              q(k), "Wartość $=$",
            );
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Przekształcenia wykresów logarytmów. Równania logarytmiczne
    {
      id: "przeksztalcenia-rownania-logarytmiczne",
      nazwa: "Przekształcenia wykresów funkcji logarytmicznych. Równania logarytmiczne",
      sciaga: [
        {
          nazwa: "Przesunięcie wykresu logarytmu",
          slownie: "Wykres funkcji $g(x)=\\log_{a}(x-p)+q$ powstaje z wykresu $\\log_{a}x$ przez przesunięcie o wektor $[p,\\ q]$. Asymptotą pionową staje się prosta $x=p$, dziedziną przedział $(p,+\\infty)$, a zbiór wartości nadal jest równy $\\mathbb{R}$.",
          tex: "g(x)=\\log_{a}(x-p)+q\\qquad x=p\\qquad D=(p,+\\infty)\\qquad(1,0)\\to(p+1,\\ q)",
          litery: "$[p,\\ q]$ – wektor przesunięcia, $x=p$ – asymptota pionowa.",
          przyklad: "Dla $g(x)=\\log_{2}(x+3)-1$ mamy $p=-3$, $q=-1$: asymptota $x=-3$, $D=(-3,+\\infty)$, a punkt $(1,0)$ przechodzi na $(-2,-1)$. Sprawdzenie: $g(-2)=\\log_{2}1-1=-1$.",
          uwaga: "Przesunięcie w pionie nie zmienia dziedziny, a w poziomie nie zmienia zbioru wartości. Asymptota jest pionowa ($x=p$), a nie pozioma.",
        },
        {
          nazwa: "Dziedzina logarytmu",
          slownie: "Liczba, z której bierzemy logarytm, musi być dodatnia. Zapisujemy to nierównością i ją rozwiązujemy.",
          tex: "\\log_{a}(mx+c)\\ \\Rightarrow\\ mx+c>0",
          litery: "$mx+c$ – wyrażenie pod logarytmem, $a$ – podstawa.",
          przyklad: "Dla $\\log_{5}(2x-6)$: $2x-6>0$, czyli $x>3$ i $D=(3,+\\infty)$.",
          uwaga: "Nierówność jest ostra: wartość $x=3$ nie należy do dziedziny.",
        },
        {
          nazwa: "Równanie logarytmiczne",
          slownie: "Najpierw wyznaczamy dziedzinę. Potem z definicji logarytmu zamieniamy równanie na równanie bez logarytmu i je rozwiązujemy. Na końcu sprawdzamy, czy rozwiązanie należy do dziedziny.",
          tex: "\\log_{a}u=c\\iff u=a^{c}\\qquad u>0",
          litery: "$u$ – wyrażenie pod logarytmem (z niewiadomą), $a$ – podstawa, $c$ – liczba.",
          przyklad: "$\\log_{3}(x-1)=2$. Dziedzina: $x-1>0$, czyli $x>1$. Z definicji $x-1=3^{2}=9$, więc $x=10$, a to należy do dziedziny.",
          uwaga: "Rozwiązanie spoza dziedziny trzeba odrzucić.",
        },
        {
          nazwa: "Niewiadoma w podstawie",
          slownie: "Gdy niewiadoma jest w podstawie, zakładamy $x>0$ i $x\\ne1$. Z definicji logarytmu dostajemy równanie potęgowe.",
          tex: "\\log_{x}b=c\\iff x^{c}=b\\qquad x>0,\\ x\\ne1",
          litery: "$b>0$ – liczba logarytmowana, $c$ – wartość logarytmu.",
          przyklad: "$\\log_{x}49=2$. Dziedzina: $x>0$, $x\\ne1$. Z definicji $x^{2}=49$, więc $x=7$ lub $x=-7$. Dziedzinie odpowiada tylko $x=7$.",
          uwaga: "Ujemna podstawa odpada: $x=-7$ nie jest rozwiązaniem.",
        },
      ],
      jak: [
        "Zapisz dziedzinę: wyrażenie pod logarytmem dodatnie, a podstawa dodatnia i różna od $1$.",
        "Z definicji logarytmu zamień równanie na równanie bez logarytmu ($u=a^{c}$ albo $x^{c}=b$).",
        "Rozwiąż otrzymane równanie.",
        "Sprawdź, czy rozwiązanie należy do dziedziny, i odrzuć te, które do niej nie należą.",
      ],
      zadania: [
        {
          nr: "31",
          tresc: "Jaka jest dziedzina funkcji $f(x)=\\log_{2}(x+5)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-\\infty,-5)$", "$(5,+\\infty)$", "$(-5,+\\infty)$", "$\\mathbb{R}\\setminus\\{-5\\}$"],
          poprawna: 2,
        },
        {
          nr: "32",
          tresc: "Jakie równanie ma asymptota pionowa wykresu funkcji $g(x)=\\log_{3}(x-4)+2$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$x=4$", "$y=2$", "$x=-4$", "$x=2$"],
          poprawna: 0,
        },
        {
          nr: "33",
          tresc: "Wykres funkcji $f(x)=\\log_{2}x$ przesunięto o wektor $[3,\\ -1]$ i otrzymano wykres funkcji $g$. Który punkt należy do wykresu funkcji $g$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-2,\\ 1)$", "$(4,\\ 1)$", "$(4,\\ -1)$", "$(2,\\ -1)$"],
          poprawna: 2,
        },
        {
          nr: "34",
          tresc: "Rozwiązaniem równania $\\log_{3}(x-1)=2$ jest liczba: **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$9$", "$5$", "$10$"],
          poprawna: 3,
        },
        {
          nr: "35",
          tresc: "Rozwiązaniem równania $\\log_{x}25=2$ jest: **Wybierz właściwą odpowiedź.**",
          opcje: ["$x=5$ i $x=-5$", "$x=5$", "$x=\\frac{25}{2}$", "$x=-5$"],
          poprawna: 1,
        },
        {
          nr: "36",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Dziedziną funkcji $g(x)=\\log_{2}(x+3)$ jest przedział $(3,+\\infty)$.", litery: "PF", poprawna: 1 },
            { tekst: "Rozwiązaniem równania $\\log_{2}(x+1)=-1$ jest liczba $-\\frac{1}{2}$.", litery: "PF", poprawna: 0 },
            { tekst: "Liczba $4$ jest rozwiązaniem równania $\\log_{2}(x-2)=3$.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "37",
          punkty: 2,
          tresc: "Rozwiąż równanie $\\log_{2}(3x-1)=3$. Najpierw wyznacz dziedzinę. **Zapisz obliczenia.**",
          rozwiazanie: "Dziedzina: $3x-1>0$, czyli $x>\\frac{1}{3}$.\n\nZ definicji logarytmu: $3x-1=2^{3}=8$.\n\nStąd $3x=9$, czyli $x=3$.\n\nSprawdzenie: $3>\\frac{1}{3}$, więc rozwiązanie należy do dziedziny.\n\nOdpowiedź: $x=3$.",
        },
        {
          nr: "38",
          punkty: 3,
          tresc: "Dana jest funkcja $g(x)=\\log_{2}(x+1)-3$. Podaj jej dziedzinę i równanie asymptoty pionowej, wyznacz miejsce zerowe oraz oblicz $g(0)$. **Zapisz obliczenia.**",
          rozwiazanie: "Dziedzina: $x+1>0$, czyli $D=(-1,+\\infty)$. Asymptota pionowa: prosta $x=-1$.\n\nMiejsce zerowe: $\\log_{2}(x+1)-3=0$, czyli $\\log_{2}(x+1)=3$.\n\nZ definicji $x+1=2^{3}=8$, więc $x=7$. Liczba $7$ należy do dziedziny.\n\nWartość dla zera: $g(0)=\\log_{2}1-3=0-3=-3$.\n\nOdpowiedź: $D=(-1,+\\infty)$, asymptota $x=-1$, miejsce zerowe $x=7$, $g(0)=-3$.",
        },
      ],
      generatory: [
        {
          id: "wykres-logarytmu",
          nazwa: "Przesunięty logarytm",
          opis: "Dziedzina, asymptota, wartość i miejsce zerowe funkcji $\\log_{a}(x-p)+q$ oraz podstawa z punktu na wykresie.",
          generuj(r) {
            const tryb = r.int(0, 4);
            if (tryb === 0) {
              const a = r.pick([2, 3, 5, 10]);
              const m = r.pick([1, 1, 2, 3]);
              const c = r.intBez(-8, 8, 0);
              const p = q(-c, m);
              const u = liniowy(m, c);
              return zadanie(
                `Dziedziną funkcji $g(x)=${logT(a)}\\left(${u}\\right)$ jest przedział $(p,+\\infty)$. Podaj $p$.`,
                [
                  `Liczba pod logarytmem musi być dodatnia: $${u}>0$.`,
                  m === 1 ? `Stąd $x>${p.tex()}$.` : `Stąd $${m}x>${-c}$, czyli $x>${p.tex()}$.`,
                  `Dziedzina: $\\left(${p.tex()},+\\infty\\right)$, więc $p=${p.tex()}$.`,
                ],
                p, "$p =$",
              );
            }
            const a = r.pick([2, 3, 5]);
            const p = r.intBez(-4, 4, 0);
            const qq = r.intBez(-3, 3, 0);
            const wzor = `g(x)=${logT(a)}\\left(x${pm(-p)}\\right)${pm(qq)}`;
            if (tryb === 1) {
              return zadanie(
                `Wykres funkcji $f(x)=${logT(a)}x$ przesunięto o wektor $[${p},\\ ${qq}]$ i otrzymano wykres funkcji $g$. Asymptota pionowa wykresu funkcji $g$ ma równanie $x=c$. Podaj $c$.`,
                [
                  `Przesunięcie o wektor $[p,\\ q]$ daje wzór $\\log_{a}(x-p)+q$, czyli tu $${wzor}$.`,
                  `Asymptotą funkcji $f$ jest prosta $x=0$. Przesuwamy ją o $${Math.abs(p)}$ ${p > 0 ? "w prawo" : "w lewo"}, więc asymptota $g$ to prosta $x=${p}$.`,
                ],
                q(p), "$c =$",
              );
            }
            if (tryb === 2) {
              const k = r.int(2, 3);
              const N = a ** k;
              if (N > 125) return this.generuj(r);
              const X = p + N;
              return zadanie(
                `Dana jest funkcja $${wzor}$. Oblicz $g(${X})$.`,
                [
                  `Liczba pod logarytmem: $${X}${pm(-p)}=${N}=${a}^{${k}}$.`,
                  `$g(${X})=${logT(a)}${a === 10 ? "\\," : " "}${a}^{${k}}${pm(qq)}=${k}${pm(qq)}=${k + qq}$.`,
                ],
                q(k + qq), `$g(${X}) =$`,
              );
            }
            if (tryb === 3) {
              const aa = r.pick([2, 3]);
              const w = q(aa).pow(-qq);
              if (w.d > 12 || w.n > 100 || qq === -1) return this.generuj(r);
              const x = w.add(p);
              const wz = `g(x)=${logT(aa)}\\left(x${pm(-p)}\\right)${pm(qq)}`;
              return zadanie(
                `Wyznacz miejsce zerowe funkcji $${wz}$.`,
                [
                  `Rozwiązujemy $g(x)=0$: $${logT(aa)}\\left(x${pm(-p)}\\right)=${-qq}$.`,
                  `Z definicji logarytmu $x${pm(-p)}=${pw(aa, -qq)}=${w.tex()}$.`,
                  `Stąd $x=${w.tex()}${pm(p)}=${x.tex()}$. Liczba pod logarytmem jest dodatnia, więc rozwiązanie należy do dziedziny.`,
                ],
                x, "$x =$",
              );
            }
            const { b, k, v } = probuj(() => {
              const b = r.pick([q(2), q(3), q(4), q(5), q(1, 2), q(1, 3), q(1, 4)]);
              const k = r.pick([-2, -1, 2, 3]);
              const v = b.pow(k);
              return v.n <= 125 && v.d <= 125 ? { b, k, v } : null;
            });
            return zadanie(
              `Wykres funkcji $f(x)=\\log_{a}x$, gdzie $a>0$ i $a\\ne1$, przechodzi przez punkt $(${v.tex()},\\ ${k})$. Wyznacz $a$.`,
              [
                `Punkt leży na wykresie, więc $\\log_{a}${v.tex()}=${k}$.`,
                `Z definicji logarytmu $a^{${k}}=${v.tex()}$.`,
                `Ponieważ $${baza(b)}^{${k}}=${v.tex()}$ i podstawa jest dodatnia, to $a=${b.tex()}$.`,
              ],
              b, "$a =$",
            );
          },
        },
        {
          id: "rownanie-logarytmiczne",
          nazwa: "Równanie logarytmiczne",
          opis: "Równanie logarytmiczne z definicji logarytmu, z dziedziną: $\\log_{a}x=k$, $\\log_{a}(mx+c)=k$ oraz $\\log_{x}b=n$.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const a = r.pick([q(2), q(3), q(5), q(10), q(1, 2)]);
              const k = r.intBez(-3, 4, 0, 1);
              const x = a.pow(k);
              if (x.d > 12 || x.n > 1000) return this.generuj(r);
              return zadanie(
                `Rozwiąż równanie $${logT(a)}${a.eq(10) ? "\\," : " "}x=${k}$.`,
                [
                  "Dziedzina: $x>0$.",
                  `Z definicji logarytmu $x=${baza(a)}^{${k}}$.`,
                  `Obliczamy: $x=${x.tex()}$. Liczba jest dodatnia, więc należy do dziedziny.`,
                ],
                x, "$x =$",
              );
            }
            if (tryb === 1) {
              const a = r.pick([2, 3, 5]);
              const k = r.int(2, 3);
              const c = r.intBez(-5, 5, 0);
              if (a ** k > 125) return this.generuj(r);
              const x = a ** k - c;
              return {
                tresc: `Rozwiąż równanie $\\log_{${a}}(x${pm(c)})=${k}$. W pierwszym polu wpisz liczbę $p$, taką że dziedziną równania jest $x>p$, a w drugim rozwiązanie równania.`,
                pola: [pole("p", "Dziedzina: $x>p$, $p =$"), pole("x", "Rozwiązanie $x =$")],
                odpowiedz: { p: q(-c), x: q(x) },
                wynik: `$p=${-c},\\ x=${x}$`,
                rozwiazanie: [
                  `Dziedzina: $x${pm(c)}>0$, czyli $x>${-c}$.`,
                  `Z definicji logarytmu $x${pm(c)}=${pw(a, k)}=${a ** k}$.`,
                  `Stąd $x=${a ** k}${pm(-c)}=${x}$. Ta liczba spełnia warunek $x>${-c}$.`,
                ],
              };
            }
            if (tryb === 2) {
              const { x0, n, A } = probuj(() => {
                const x0 = r.pick([q(2), q(3), q(4), q(5), q(6), q(7), q(10), q(1, 2), q(1, 3)]);
                const n = r.int(2, 4);
                const A = x0.pow(n);
                return A.n <= 1000 && A.d <= 100 ? { x0, n, A } : null;
              });
              return zadanie(
                `Rozwiąż równanie $\\log_{x}${A.tex()}=${n}$.`,
                [
                  "Dziedzina: podstawa $x>0$ i $x\\ne1$.",
                  `Z definicji logarytmu $x^{${n}}=${A.tex()}$.`,
                  n % 2 === 0
                    ? `Równanie ma rozwiązania $x=${x0.tex()}$ i $x=-${x0.tex()}$, ale podstawa logarytmu musi być dodatnia, więc zostaje $x=${x0.tex()}$.`
                    : `Stąd $x=${x0.tex()}$. Ta liczba spełnia warunki dziedziny.`,
                ],
                x0, "$x =$",
              );
            }
            const a = r.pick([2, 3, 5]);
            const k = r.int(2, 3);
            const m = r.pick([2, 3]);
            const c = r.int(1, 9);
            if (a ** k > 125) return this.generuj(r);
            const x = q(a ** k + c, m);
            return {
              tresc: `Rozwiąż równanie $\\log_{${a}}\\left(${liniowy(m, -c)}\\right)=${k}$. W pierwszym polu wpisz liczbę $p$, taką że dziedziną równania jest $x>p$, a w drugim rozwiązanie równania.`,
              pola: [pole("p", "Dziedzina: $x>p$, $p =$"), pole("x", "Rozwiązanie $x =$")],
              odpowiedz: { p: q(c, m), x },
              wynik: `$p=${q(c, m).tex()},\\ x=${x.tex()}$`,
              rozwiazanie: [
                `Dziedzina: $${liniowy(m, -c)}>0$, czyli $${m}x>${c}$ i $x>${q(c, m).tex()}$.`,
                `Z definicji logarytmu $${liniowy(m, -c)}=${pw(a, k)}=${a ** k}$.`,
                `Stąd $${m}x=${a ** k + c}$, czyli $x=${x.tex()}$. Ta liczba jest większa od $${q(c, m).tex()}$, więc należy do dziedziny.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Zastosowania w praktyce
    {
      id: "zastosowania",
      nazwa: "Zastosowania w praktyce",
      sciaga: [
        {
          nazwa: "Procent składany",
          slownie: "Gdy kwota co okres rośnie o ten sam procent (odsetki doliczane do kapitału), po każdym okresie mnożymy ją przez ten sam czynnik. Po $n$ okresach mnożymy $n$ razy.",
          tex: "K_{n}=K\\cdot\\left(1+\\frac{p}{100}\\right)^{n}",
          litery: "$K$ – kwota początkowa, $p$ – oprocentowanie w procentach za jeden okres, $n$ – liczba okresów, $K_{n}$ – kwota po $n$ okresach.",
          przyklad: "$5000$ zł przy $10\\%$ rocznie przez $2$ lata: $5000\\cdot1{,}1^{2}=5000\\cdot1{,}21=6050$ zł.",
          uwaga: "Odsetki rosną na odsetkach: to nie jest $5000+2\\cdot500=6000$.",
        },
        {
          nazwa: "Spadek wartości",
          slownie: "Gdy wartość co okres maleje o ten sam procent, mnożymy ją przez czynnik mniejszy od $1$ (od $100\\%$ odejmujemy ten procent).",
          tex: "V_{n}=V\\cdot\\left(1-\\frac{p}{100}\\right)^{n}",
          litery: "$V$ – wartość początkowa, $p$ – roczny spadek w procentach, $n$ – liczba lat.",
          przyklad: "Samochód za $40\\,000$ zł traci $20\\%$ wartości rocznie. Po $2$ latach: $40\\,000\\cdot0{,}8^{2}=40\\,000\\cdot0{,}64=25\\,600$ zł.",
          uwaga: "Dwa spadki o $20\\%$ to nie spadek o $40\\%$: wartość wynosi $64\\%$ początkowej.",
        },
        {
          nazwa: "Wzrost i zanik wykładniczy",
          slownie: "Gdy wielkość w każdym okresie mnoży się przez to samo $a$, mamy funkcję wykładniczą. Dla $a>1$ wielkość rośnie (np. bakterie), a dla $0<a<1$ maleje.",
          tex: "N(t)=N_{0}\\cdot a^{t}\\qquad a>1:\\ \\text{wzrost}\\qquad0<a<1:\\ \\text{spadek}",
          litery: "$N_{0}$ – wartość początkowa, $a$ – czynnik zmiany w jednym okresie, $t$ – liczba okresów.",
          przyklad: "$100$ bakterii podwaja się co godzinę ($a=2$). Po $5$ godzinach jest ich $100\\cdot2^{5}=3200$.",
          uwaga: "Czas $t$ musi być liczony w tych samych okresach, w których mnożymy (np. co $20$ minut, więc godzina to $3$ okresy).",
        },
        {
          nazwa: "Rozpad promieniotwórczy",
          slownie: "Okres połowicznego rozpadu $T$ to czas, po którym zostaje połowa substancji. Po $k$ takich okresach zostaje $\\left(\\frac{1}{2}\\right)^{k}$ początkowej masy.",
          tex: "m(t)=m_{0}\\cdot\\left(\\frac{1}{2}\\right)^{\\frac{t}{T}}",
          litery: "$m_{0}$ – masa początkowa, $T$ – okres połowicznego rozpadu, $t$ – czas, $\\frac{t}{T}$ – liczba okresów.",
          przyklad: "Masa początkowa $80$ g, $T=3$ dni. Po $9$ dniach jest $\\frac{9}{3}=3$ okresów: $80\\cdot\\left(\\frac{1}{2}\\right)^{3}=10$ g.",
          uwaga: "Po dwóch okresach połowicznego rozpadu zostaje $\\frac{1}{4}$ masy, a nie nic.",
        },
      ],
      jak: [
        "Ustal czynnik zmiany w jednym okresie: $1+\\frac{p}{100}$ (wzrost), $1-\\frac{p}{100}$ (spadek), $2$ (podwojenie), $\\frac{1}{2}$ (połowienie).",
        "Policz liczbę okresów $n$ (np. $t:T$).",
        "Podstaw do wzoru: wartość początkowa razy czynnik do potęgi $n$.",
        "Gdy szukasz liczby okresów, zapisz równanie wykładnicze (ta sama podstawa) albo licz kolejne okresy po kolei.",
      ],
      zadania: [
        {
          nr: "39",
          tresc: "Na lokatę wpłacono $2000$ zł na $2$ lata. Oprocentowanie roczne wynosi $10\\%$, a odsetki dopisuje się po każdym roku. Ile złotych będzie na lokacie po $2$ latach? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2400$", "$2200$", "$2420$", "$2100$"],
          poprawna: 2,
        },
        {
          nr: "40",
          tresc: "Samochód kosztował $50\\,000$ zł. Co roku jego wartość spada o $20\\%$ wartości z początku roku. Ile będzie wart po $2$ latach? **Wybierz właściwą odpowiedź.**",
          opcje: ["$40\\,000$ zł", "$30\\,000$ zł", "$32\\,000$ zł", "$45\\,000$ zł"],
          poprawna: 2,
        },
        {
          nr: "41",
          tresc: "Co $20$ minut liczba bakterii w hodowli podwaja się. Na początku było $300$ bakterii. Ile bakterii będzie po godzinie? **Wybierz właściwą odpowiedź.**",
          opcje: ["$900$", "$1800$", "$2400$", "$600$"],
          poprawna: 2,
        },
        {
          nr: "42",
          tresc: "Okres połowicznego rozpadu pewnego izotopu wynosi $5$ dni. Na początku było $64$ g izotopu. Ile gramów zostanie po $15$ dniach? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$", "$16$", "$32$", "$4$"],
          poprawna: 0,
        },
        {
          nr: "43",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Jeśli wartość samochodu co roku spada o $10\\%$, to po dwóch latach spadnie łącznie o $20\\%$.", litery: "PF", poprawna: 1 },
            { tekst: "Jeśli liczba bakterii podwaja się co godzinę, to po $4$ godzinach jest ich $16$ razy więcej niż na początku.", litery: "PF", poprawna: 0 },
            { tekst: "Po trzech okresach połowicznego rozpadu zostaje $\\frac{1}{8}$ początkowej masy.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "44",
          tresc: "Na lokatę wpłacono $1000$ zł. Oprocentowanie roczne wynosi $10\\%$, a odsetki dopisuje się po każdym roku. Po ilu latach na lokacie będzie $1331$ zł? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$3$", "$2$", "$5$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "45",
          punkty: 2,
          tresc: "Na lokatę wpłacono $4000$ zł na $3$ lata. Oprocentowanie roczne wynosi $10\\%$, a odsetki dopisuje się po każdym roku. Oblicz, ile złotych będzie na lokacie po $3$ latach oraz ile wynoszą odsetki. **Zapisz obliczenia.**",
          rozwiazanie: "Co roku kwota rośnie $10\\%$, czyli mnożymy ją przez $1+\\frac{10}{100}=1{,}1$.\n\nPo $3$ latach: $4000\\cdot1{,}1^{3}=4000\\cdot1{,}331=5324$.\n\nOdsetki to różnica: $5324-4000=1324$.\n\nOdpowiedź: Na lokacie będzie $5324$ zł, a odsetki wyniosą $1324$ zł.",
        },
        {
          nr: "46",
          punkty: 3,
          tresc: "Okres połowicznego rozpadu pewnej substancji wynosi $4$ dni. Początkowa masa próbki to $96$ g. a) Ile gramów substancji zostanie po $12$ dniach? b) Po ilu dniach masa próbki spadnie do $3$ g? **Zapisz obliczenia.**",
          rozwiazanie: "a) Po $12$ dniach minęły $\\frac{12}{4}=3$ okresy połowicznego rozpadu. Zostanie $96\\cdot\\left(\\frac{1}{2}\\right)^{3}=96\\cdot\\frac{1}{8}=12$ g.\n\nb) Szukamy liczby okresów $n$, dla której $96\\cdot\\left(\\frac{1}{2}\\right)^{n}=3$, czyli $\\left(\\frac{1}{2}\\right)^{n}=\\frac{3}{96}=\\frac{1}{32}=\\left(\\frac{1}{2}\\right)^{5}$.\n\nStąd $n=5$ okresów, czyli $t=5\\cdot4=20$ dni.\n\nSprawdzenie po kolei: $96\\to48\\to24\\to12\\to6\\to3$ (pięć połowień).\n\nOdpowiedź: a) $12$ g, b) po $20$ dniach.",
        },
      ],
      generatory: [
        {
          id: "wzrost-i-spadek",
          nazwa: "Wzrost i spadek",
          opis: "Procent składany, spadek wartości, bakterie i rozpad promieniotwórczy – wartość po kilku okresach.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb <= 1) {
              const wzrost = tryb === 0;
              const { K, p, n, w, f } = probuj(() => {
                const p = r.pick(wzrost ? [5, 10, 20, 25, 50] : [10, 20, 25, 50]);
                const n = r.pick([2, 3]);
                const K = r.pick([1000, 2000, 2500, 4000, 5000, 8000, 10000, 16000, 20000, 25000, 40000, 50000]);
                const f = q(wzrost ? 100 + p : 100 - p, 100);
                const wq = f.pow(n).mul(K);
                if (wq.d !== 1 || wq.n > 100000 || dec(f.pow(n)).includes("frac")) return null;
                return { K, p, n, w: wq.n, f };
              });
              const lata = `${n} ${pl(n, "rok", "lata", "lat")}`;
              const tresc = wzrost
                ? `Na lokatę wpłacono $${tys(K)}$ zł na ${lata}. Oprocentowanie roczne wynosi $${p}\\%$, a odsetki dopisuje się po każdym roku (kapitalizacja roczna). Ile złotych będzie na lokacie po tym czasie? Pomiń podatki.`
                : `Samochód kosztował $${tys(K)}$ zł. Co roku jego wartość spada o $${p}\\%$ wartości z początku roku. Ile złotych będzie wart po ${n} latach?`;
              return zadanie(
                tresc,
                [
                  wzrost
                    ? `Co roku kwota rośnie o $${p}\\%$, więc mnożymy ją przez $1+\\frac{${p}}{100}=${dec(f)}$.`
                    : `Co roku wartość spada o $${p}\\%$, więc mnożymy ją przez $1-\\frac{${p}}{100}=${dec(f)}$.`,
                  `Po $${n}$ latach: $${tys(K)}\\cdot${dec(f)}^{${n}}=${tys(K)}\\cdot${dec(f.pow(n))}=${tys(w)}$.`,
                ],
                q(w), "Wynik w złotych $=$", tys(w),
              );
            }
            if (tryb === 2) {
              const { N0, f, n } = probuj(() => {
                const f = r.pick([2, 2, 3]);
                const n = f === 2 ? r.int(3, 6) : r.int(2, 4);
                const N0 = r.pick([100, 200, 250, 300, 400, 500, 1000]);
                return N0 * f ** n <= 100000 ? { N0, f, n } : null;
              });
              const [dop, loc] = r.pick([["godzinę", "godzinach"], ["dobę", "dobach"]]);
              return zadanie(
                `W hodowli na początku było $${tys(N0)}$ bakterii. Liczba bakterii ${f === 2 ? "podwaja się" : "potraja się"} co ${dop}. Ile bakterii będzie po $${n}$ ${loc}?`,
                [
                  `W każdym okresie liczba bakterii mnoży się przez $${f}$.`,
                  `Po $${n}$ okresach: $${tys(N0)}\\cdot${f}^{${n}}$, a $${f}^{${n}}=${f ** n}$.`,
                  `Liczba bakterii: $${tys(N0)}\\cdot${f ** n}=${tys(N0 * f ** n)}$.`,
                ],
                q(N0 * f ** n), "Liczba bakterii $=$", tys(N0 * f ** n),
              );
            }
            const { T, k, m0 } = probuj(() => {
              const T = r.int(2, 6);
              const k = r.int(2, 4);
              const m0 = 2 ** k * r.int(1, 12);
              return m0 <= 400 ? { T, k, m0 } : null;
            });
            const wynik = m0 / 2 ** k;
            return zadanie(
              `Okres połowicznego rozpadu pewnego izotopu wynosi $${T}$ ${pl(T, "dzień", "dni", "dni")}. Próbka miała początkowo masę $${m0}$ g. Ile gramów izotopu zostanie po $${k * T}$ dniach?`,
              [
                `Od początku minęło $${k * T}:${T}=${k}$ okresy połowicznego rozpadu.`,
                `Po każdym okresie masa maleje o połowę: $${m0}\\cdot\\left(\\frac{1}{2}\\right)^{${k}}=${m0}\\cdot\\frac{1}{${2 ** k}}$.`,
                `Masa: $${m0}:${2 ** k}=${wynik}$ g.`,
              ],
              q(wynik), "Masa w gramach $=$",
            );
          },
        },
        {
          id: "kiedy-wartosc",
          nazwa: "Po ilu okresach",
          opis: "Szukanie liczby okresów (godzin, dni, lat), po których osiągnięta jest dana wartość: bakterie, rozpad, lokata, spadek wartości.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const { N0, f, n } = probuj(() => {
                const f = r.pick([2, 2, 3]);
                const n = f === 2 ? r.int(3, 6) : r.int(2, 4);
                const N0 = r.pick([100, 200, 250, 300, 400, 500]);
                return N0 * f ** n <= 100000 ? { N0, f, n } : null;
              });
              const W = N0 * f ** n;
              return zadanie(
                `W hodowli na początku było $${tys(N0)}$ bakterii. Liczba bakterii ${f === 2 ? "podwaja się" : "potraja się"} co godzinę. Po ilu godzinach będzie ich dokładnie $${tys(W)}$?`,
                [
                  `Szukamy $n$, dla którego $${tys(N0)}\\cdot${f}^{n}=${tys(W)}$, czyli $${f}^{n}=${tys(W)}:${tys(N0)}=${f ** n}$.`,
                  `Zapisujemy $${f ** n}=${pw(f, n)}$, więc $n=${n}$.`,
                  `Będzie to po $${n}$ godzinach.`,
                ],
                q(n), "Liczba godzin $=$",
              );
            }
            if (tryb === 1) {
              const { T, k, m, m0 } = probuj(() => {
                const T = r.int(2, 6);
                const k = r.int(2, 5);
                const m = r.pick([1, 2, 3, 5, 6, 7]);
                return m * 2 ** k <= 500 ? { T, k, m, m0: m * 2 ** k } : null;
              });
              return zadanie(
                `Okres połowicznego rozpadu pewnego izotopu wynosi $${T}$ ${pl(T, "dzień", "dni", "dni")}. Początkowa masa próbki wynosiła $${m0}$ g. Po ilu dniach masa próbki spadnie do $${m}$ g?`,
                [
                  `Szukamy liczby okresów $n$: $${m0}\\cdot\\left(\\frac{1}{2}\\right)^{n}=${m}$, czyli $\\left(\\frac{1}{2}\\right)^{n}=\\frac{${m}}{${m0}}=\\frac{1}{${2 ** k}}$.`,
                  `Ponieważ $\\frac{1}{${2 ** k}}=\\left(\\frac{1}{2}\\right)^{${k}}$, więc $n=${k}$ okresy.`,
                  `Czas: $${k}\\cdot${T}=${k * T}$ dni.`,
                ],
                q(k * T), "Liczba dni $=$",
              );
            }
            const wzrost = tryb === 2;
            const { K, p, n, kw } = probuj(() => {
              const p = r.pick(wzrost ? [10, 20, 50, 100] : [10, 20, 50]);
              const n = r.int(2, 4);
              const K = r.pick([1000, 2000, 2500, 4000, 5000, 8000, 10000, 16000, 20000, 40000]);
              const f = q(wzrost ? 100 + p : 100 - p, 100);
              const kw = [];
              for (let j = 1; j <= n; j++) {
                const v = f.pow(j).mul(K);
                if (v.d !== 1 || v.n > 100000) return null;
                kw.push(v.n);
              }
              return { K, p, n, kw };
            });
            const W = kw[n - 1];
            const f = wzrost ? 1 + p / 100 : 1 - p / 100;
            const lista = kw.map((v, j) => `po ${j + 1}. roku $${tys(v)}$ zł`).join(", ");
            return zadanie(
              wzrost
                ? `Na lokatę wpłacono $${tys(K)}$ zł. Oprocentowanie roczne wynosi $${p}\\%$, a odsetki dopisuje się po każdym roku. Po ilu latach na lokacie będzie $${tys(W)}$ zł?`
                : `Samochód kosztował $${tys(K)}$ zł. Co roku jego wartość spada o $${p}\\%$ wartości z początku roku. Po ilu latach będzie wart $${tys(W)}$ zł?`,
              [
                `Co roku kwotę mnożymy przez $${dec(q(Math.round(f * 100), 100))}$.`,
                `Kolejne wartości: ${lista}.`,
                `Kwota $${tys(W)}$ zł jest po $${n}$ latach.`,
              ],
              q(n), "Liczba lat $=$",
            );
          },
        },
      ],
    },
  ],
};
