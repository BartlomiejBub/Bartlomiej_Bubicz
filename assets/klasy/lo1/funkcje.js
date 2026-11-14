// Klasa 1 (liceum i technikum) · rozdział 3 „Funkcje i ich własności” – Matematyka 1, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q, wielomianTex, plusMinus, texNawias } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** „Ładna” odpowiedź: mianownik co najwyżej 12. */
const ladna = (v) => Math.abs(v.n) <= 100000 && v.d <= 12;

/** Współczynnik przed literą: 1 się pomija, -1 zostaje samym minusem. */
const wsp = (n) => (n === 1 ? "" : n === -1 ? "-" : String(n));

/** Składnik do doklejenia po wyrażeniu: dodaj(3) = " + 3", dodaj(-3) = " - 3", dodaj(0) = "". */
const dodaj = (n) => (n === 0 ? "" : ` ${plusMinus(n)}`);

/** Przedział w LaTeX z końcami podanymi jako teksty: przedz("-3", "2", true, false) = "\langle -3, 2)". */
const przedz = (l, p, lc, pc) => `${lc ? "\\langle " : "("}${l}, ${p}${pc ? "\\rangle" : ")"}`;

/** Zbiór skończony liczb (tablica Q) w LaTeX, rosnąco: {-2, 3}. */
const zbiorTex = (lista) => `\\{${[...lista].sort((a, b) => a.cmp(b)).map((v) => v.tex()).join(", ")}\\}`;

/** Wzór ε·(x − h)² + k w LaTeX (ε = 1 albo -1). */
const kwadrat = (eps, h, k) => `${eps < 0 ? "-" : ""}${h === 0 ? "x^2" : `(x ${plusMinus(-h)})^2`}${dodaj(k)}`;

/** Czynnik (x − r) albo samo x dla r = 0. */
const czynnik = (rr) => (rr === 0 ? "x" : `(x ${plusMinus(-rr)})`);

/** Podstawienie p do wielomianu o współczynnikach całkowitych (od najwyższej potęgi): zapis z liczbą, wartości składników, wynik. */
function podstaw(wspolczynniki, p) {
  const st = wspolczynniki.length - 1;
  const baza = (k) => (p.calkowita ? (p.ujemna ? `(${p.tex()})` : p.tex()) : p.ujemna || k > 1 ? `\\left(${p.tex()}\\right)` : p.tex());
  const skl = [];
  wspolczynniki.forEach((a, i) => {
    if (a === 0) return;
    const k = st - i;
    const modul = Math.abs(a);
    const potega = `${baza(k)}${k > 1 ? `^${k}` : ""}`;
    const zapis = k === 0 ? String(modul) : modul === 1 ? potega : `${modul}\\cdot ${potega}`;
    skl.push({ ujemny: a < 0, zapis, wartosc: p.pow(k).mul(a) });
  });
  const zapis = skl.map((e, j) => (j === 0 ? (e.ujemny ? "-" : "") + e.zapis : ` ${e.ujemny ? "-" : "+"} ${e.zapis}`)).join("");
  const wartosci = skl.map((e, j) => (j === 0 ? e.wartosc.tex() : ` ${plusMinus(e.wartosc)}`)).join("");
  const suma = skl.reduce((s, e) => s.add(e.wartosc), q(0));
  return { zapis, wartosci, suma, skladnikow: skl.length };
}

/**
 * Mianownik (albo wyrażenie) z miejscami zerowymi: liniowy, iloczyn dwóch czynników liniowych, różnica kwadratów
 * i „x(x + p)”. Zwraca { tex, zera (tablica Q), kroki (jak je znaleźć, bez zdania wstępnego) }.
 */
function wyrazenieZZerami(r, typ) {
  if (typ === "liniowy") {
    const a = r.intBez(-4, 4, 0), b = r.intBez(-9, 9, 0);
    const z = q(-b, a);
    return { tex: wielomianTex([a, b]), zera: [z], kroki: [`Rozwiązujemy: $${wsp(a)}x = ${-b}$, więc $x = ${z.tex()}$.`] };
  }
  if (typ === "iloczyn") {
    for (;;) {
      const a1 = r.int(1, 3), a2 = r.int(1, 3), b1 = r.intBez(-8, 8, 0), b2 = r.intBez(-8, 8, 0);
      const z1 = q(-b1, a1), z2 = q(-b2, a2);
      if (z1.eq(z2)) continue;
      const c1 = wielomianTex([a1, b1]), c2 = wielomianTex([a2, b2]);
      return {
        tex: `(${c1})(${c2})`,
        zera: [z1, z2],
        kroki: [`Iloczyn jest równy zero, gdy któryś czynnik jest równy zero: $${c1} = 0$ lub $${c2} = 0$, czyli $x = ${z1.tex()}$ lub $x = ${z2.tex()}$.`],
      };
    }
  }
  if (typ === "roznica") {
    const k = r.int(2, 9);
    return { tex: `x^2 - ${k * k}`, zera: [q(k), q(-k)], kroki: [`Z równania $x^2 = ${k * k}$ dostajemy $x = ${k}$ lub $x = -${k}$.`] };
  }
  const p = r.intBez(-8, 8, 0);
  return {
    tex: wielomianTex([1, p, 0]),
    zera: [q(0), q(-p)],
    kroki: [`Wyłączamy $x$ przed nawias: $x(x ${plusMinus(p)}) = 0$, więc $x = 0$ lub $x = ${-p}$.`],
  };
}

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 3.1, 3.2
    {
      id: "pojecie",
      nazwa: "Pojęcie funkcji. Sposoby opisywania funkcji. Wykres funkcji",
      sciaga: [
        {
          nazwa: "Co to jest funkcja",
          slownie: "Funkcja przyporządkowuje każdemu elementowi zbioru $X$ dokładnie jeden element zbioru $Y$. Zbiór $X$ to dziedzina funkcji, a przyporządkowane elementy to jej wartości.",
          tex: "f:X\\to Y\\qquad x\\mapsto f(x)",
          litery: "$x$ – argument, $f(x)$ – wartość funkcji dla argumentu $x$, $X$ – dziedzina.",
          przyklad: "Każdej liczbie z $\\{1,2,3\\}$ przyporządkowujemy jej kwadrat: $f(1)=1$, $f(2)=4$, $f(3)=9$.",
          uwaga: "Jeden argument nie może mieć dwóch wartości, więc przyporządkowanie $1\\to2$ i $1\\to3$ nie jest funkcją. Za to różne argumenty mogą mieć tę samą wartość.",
        },
        {
          nazwa: "Sposoby opisywania funkcji",
          slownie: "Funkcję można opisać wzorem, tabelką, grafem strzałkowym, wykresem albo słowami. Ta sama funkcja ma wtedy wiele zapisów.",
          przyklad: "Wzór $f(x)=2x-1$ to w słowach: „liczbę podwajamy i odejmujemy $1$”. W tabelce dla argumentów $1$, $2$, $3$ mamy wartości $1$, $3$, $5$.",
          uwaga: "Z samej tabelki znamy funkcję tylko dla wypisanych argumentów. Wzór podaje wartość dla każdego argumentu z dziedziny.",
        },
        {
          nazwa: "Obliczanie wartości funkcji",
          slownie: "Aby obliczyć wartość funkcji dla danego argumentu, wpisz ten argument we wzór w miejsce $x$ i wykonaj działania.",
          tex: "f(x)=3x^2-2\\qquad f(-2)=3\\cdot(-2)^2-2",
          przyklad: "Dla $f(x)=3x^2-2$: $f(-2)=3\\cdot(-2)^2-2=3\\cdot4-2=10$.",
          uwaga: "Ujemny argument wstawiaj w nawiasie: $(-2)^2=4$, ale $-2^2=-4$.",
        },
        {
          nazwa: "Wykres funkcji",
          slownie: "Wykres funkcji $f$ to wszystkie punkty $(x,f(x))$ układu współrzędnych, gdzie $x$ należy do dziedziny. Punkt $(a,b)$ leży na wykresie wtedy, gdy $f(a)=b$.",
          przyklad: "Czy punkt $(3,7)$ leży na wykresie funkcji $f(x)=2x+1$? Tak, bo $f(3)=7$. A punkt $(2,6)$? Nie, bo $f(2)=5\\neq6$.",
          uwaga: "Pierwsza współrzędna punktu to argument, a druga to wartość – nie odwrotnie.",
        },
        {
          nazwa: "Czy to wykres funkcji",
          slownie: "Figura jest wykresem funkcji, gdy każda prosta pionowa ma z nią co najwyżej jeden punkt wspólny, bo każdy argument ma tylko jedną wartość.",
          przyklad: "Okrąg nie jest wykresem funkcji, bo pionowa prosta $x=0$ przecina go w dwóch punktach. Prosta, która nie jest pionowa, jest wykresem funkcji.",
          uwaga: "Prosta pionowa $x=2$ nie jest wykresem funkcji: argument $2$ miałby nieskończenie wiele wartości.",
        },
      ],
      jak: [
        "Aby obliczyć $f(a)$, wstaw $a$ za $x$ do wzoru (liczbę ujemną w nawiasie) i wykonaj działania.",
        "Aby sprawdzić, czy punkt $(a,b)$ leży na wykresie, oblicz $f(a)$ i porównaj z $b$.",
        "Aby znaleźć argument, dla którego funkcja ma wartość $b$, rozwiąż równanie $f(x)=b$.",
        "Aby sprawdzić, czy przyporządkowanie jest funkcją, poszukaj argumentu, który ma dwie różne wartości.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Funkcja $f$ jest określona wzorem $f(x)=x^2-3x+1$. Wartość $f(-2)$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$-1$", "$11$", "$3$", "$-9$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Które z przyporządkowań jest funkcją? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "każdej liczbie całkowitej przyporządkowano jej dzielnik dodatni",
            "każdej liczbie dodatniej przyporządkowano liczby, których kwadrat jest równy danej liczbie",
            "każdej liczbie rzeczywistej przyporządkowano liczbę do niej przeciwną",
            "każdej liczbie naturalnej przyporządkowano liczbę od niej większą",
          ],
          poprawna: 2,
        },
        {
          nr: "3",
          tresc: "Funkcja $f$ jest określona wzorem $f(x)=\\frac{x+1}{2}$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$f(3)=2$", litery: "PF", poprawna: 0 },
            { tekst: "Punkt $(-5,2)$ leży na wykresie funkcji $f$.", litery: "PF", poprawna: 1 },
            { tekst: "$f(0)=\\frac{1}{2}$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "4",
          tresc: "Funkcję $f$ opisano tabelką: dla argumentów $-2$, $-1$, $0$, $1$, $2$ przyjmuje ona kolejno wartości $5$, $2$, $1$, $2$, $5$. Wartość wyrażenia $f(-1)+f(2)-f(0)$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$8$", "$3$", "$-4$"],
          poprawna: 0,
        },
        {
          nr: "5",
          tresc: "Do wykresu funkcji $f(x)=x^2+mx$ należy punkt $(2,10)$. Liczba $m$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$5$", "$-7$", "$3$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 3,
          tresc: "Funkcja $f$ jest określona wzorem $f(x)=\\frac{2x-1}{x+3}$. Oblicz $f(1)$ i $f(-2)$ oraz sprawdź, czy punkt $A=\\left(0,-\\frac{1}{3}\\right)$ należy do wykresu tej funkcji. **Zapisz obliczenia.**",
          rozwiazanie: "$f(1)=\\frac{2\\cdot1-1}{1+3}=\\frac{1}{4}$.\n\n$f(-2)=\\frac{2\\cdot(-2)-1}{-2+3}=\\frac{-5}{1}=-5$.\n\nPunkt $A$ ma pierwszą współrzędną $0$, więc obliczamy $f(0)=\\frac{2\\cdot0-1}{0+3}=-\\frac{1}{3}$.\n\nWartość $f(0)$ jest równa drugiej współrzędnej punktu $A$, więc punkt $A$ należy do wykresu.\n\nOdpowiedź: $f(1)=\\frac{1}{4}$, $f(-2)=-5$, punkt $A$ należy do wykresu funkcji $f$.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Dana jest funkcja $f(x)=3x-4$. Dla jakiego argumentu funkcja przyjmuje wartość $8$? Czy punkt $B=(-1,-8)$ należy do wykresu funkcji $f$? **Zapisz obliczenia.**",
          rozwiazanie: "Szukamy argumentu z równania $f(x)=8$, czyli $3x-4=8$.\n\nStąd $3x=12$, więc $x=4$.\n\nDla punktu $B$ obliczamy $f(-1)=3\\cdot(-1)-4=-7$.\n\nSkoro $-7\\neq-8$, punkt $B$ nie leży na wykresie funkcji $f$.\n\nOdpowiedź: wartość $8$ funkcja przyjmuje dla $x=4$; punkt $B$ nie należy do wykresu.",
        },
      ],
      generatory: [
        {
          id: "pojecie-wartosc",
          nazwa: "Wartość funkcji",
          opis: "Oblicz wartość funkcji dla podanego argumentu – ze wzoru liniowego, kwadratowego, ułamkowego albo z pierwiastkiem.",
          generuj(r) {
            const typ = r.pick(["lin", "kw", "kw", "ulamek", "pierwiastek"]);
            let wzor, p, w, kroki;
            if (typ === "lin" || typ === "kw") {
              const wspolcz = typ === "lin" ? [r.intBez(-6, 6, 0), r.intBez(-9, 9, 0)] : [r.intBez(-3, 3, 0), r.int(-6, 6), r.intBez(-9, 9, 0)];
              p = r.chance(0.25) ? q(r.intBez(-7, 7, 0), 2) : q(r.intBez(-6, 6, 0));
              const s = podstaw(wspolcz, p);
              wzor = wielomianTex(wspolcz);
              w = s.suma;
              kroki = [`Wstawiamy $x = ${p.tex()}$ we wzór (liczby ujemne w nawiasach): $f(${p.tex()}) = ${s.zapis}$.`];
              if (s.skladnikow > 1) kroki.push(`Liczymy każdy składnik: $${s.wartosci}$.`);
            } else if (typ === "ulamek") {
              for (;;) {
                const a = r.intBez(-4, 4, 0), b = r.intBez(-9, 9, 0), c = r.intBez(-6, 6, 0);
                const pp = r.intBez(-6, 6, 0);
                if (pp + c === 0) continue;
                p = q(pp);
                wzor = `\\frac{${wielomianTex([a, b])}}{${wielomianTex([1, c])}}`;
                const licz = a * pp + b, mian = pp + c;
                w = q(licz, mian);
                kroki = [
                  `Wstawiamy $x = ${pp}$ do licznika i mianownika: $f(${pp}) = \\frac{${a === 1 ? "" : a === -1 ? "-" : `${a}\\cdot `}${texNawias(p)}${dodaj(b)}}{${texNawias(p)}${dodaj(c)}}$.`,
                  `Liczymy: $f(${pp}) = \\frac{${licz}}{${mian}} = ${w.tex()}$.`,
                ];
                break;
              }
            } else {
              const s = r.int(0, 6), k = r.int(1, 3), pp = r.int(-3, 8), a = s * s - k * pp;
              p = q(pp);
              wzor = `\\sqrt{${wielomianTex([k, a])}}`;
              w = q(s);
              kroki = [
                `Wstawiamy $x = ${pp}$ pod pierwiastek: $f(${pp}) = \\sqrt{${k === 1 ? "" : `${k}\\cdot `}${texNawias(p)}${dodaj(a)}}$.`,
                `Pod pierwiastkiem jest $${s * s}$, więc $f(${pp}) = \\sqrt{${s * s}} = ${s}$.`,
              ];
            }
            return {
              tresc: `Funkcja $f$ jest określona wzorem $f(x) = ${wzor}$. Oblicz $f(${p.tex()})$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: `$f(${p.tex()}) =$` }],
              odpowiedz: { w },
              wynik: `$f(${p.tex()}) = ${w.tex()}$`,
              rozwiazanie: kroki,
            };
          },
        },
        {
          id: "pojecie-parametr",
          nazwa: "Punkt na wykresie",
          opis: "Punkt należy do wykresu funkcji z parametrem $m$ – oblicz $m$.",
          generuj(r) {
            const typ = r.pick(["lin", "kw1", "kw2"]);
            let wzor, p, w, m, kroki;
            if (typ === "lin") {
              const b = r.intBez(-9, 9, 0);
              p = r.intBez(-5, 5, 0);
              w = r.int(-12, 12);
              m = q(w - b, p);
              wzor = `mx ${plusMinus(b)}`;
              kroki = [
                `Punkt należy do wykresu, więc $f(${p}) = ${w}$.`,
                `Podstawiamy: $${wsp(p)}m ${plusMinus(b)} = ${w}$.`,
                `Stąd $${wsp(p)}m = ${w - b}$, czyli $m = ${m.tex()}$.`,
              ];
            } else if (typ === "kw1") {
              const m0 = r.intBez(-6, 6, 0), c = r.int(-9, 9);
              p = r.intBez(-4, 4, 0);
              w = p * p + m0 * p + c;
              m = q(m0);
              wzor = `x^2 + mx${dodaj(c)}`;
              kroki = [
                `Punkt należy do wykresu, więc $f(${p}) = ${w}$.`,
                `Podstawiamy: $${p * p} ${p > 0 ? "+" : "-"} ${Math.abs(p) === 1 ? "" : Math.abs(p)}m${dodaj(c)} = ${w}$.`,
                `Stąd $${wsp(p)}m = ${w - p * p - c}$, czyli $m = ${m0}$.`,
              ];
            } else {
              const a = r.intBez(-3, 3, 0), b = r.int(-5, 5), m0 = r.intBez(-9, 9, 0);
              p = r.intBez(-4, 4, 0);
              w = a * p * p + b * p + m0;
              m = q(m0);
              wzor = `${wielomianTex([a, b, 0])} + m`;
              kroki = [
                `Punkt należy do wykresu, więc $f(${p}) = ${w}$.`,
                `Podstawiamy: $${a * p * p}${dodaj(b * p)} + m = ${w}$.`,
                `Stąd $m = ${w} - ${texNawias(q(a * p * p + b * p))} = ${m0}$.`,
              ];
            }
            return {
              tresc: `Punkt $P=(${p}, ${w})$ należy do wykresu funkcji $f(x) = ${wzor}$. Oblicz $m$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "$m =$" }],
              odpowiedz: { w: m },
              wynik: `$m = ${m.tex()}$`,
              rozwiazanie: kroki,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3.3
    {
      id: "dziedzina",
      nazwa: "Dziedzina funkcji liczbowej",
      sciaga: [
        {
          nazwa: "Czym jest dziedzina",
          slownie: "Dziedzina $D_f$ funkcji liczbowej to zbiór wszystkich liczb, dla których wzór funkcji ma sens. Gdy dziedzina nie jest podana, szukamy największego takiego zbioru.",
          przyklad: "Dla $f(x)=2x+1$ każda liczba rzeczywista jest dozwolona, więc $D_f=\\mathbb{R}$.",
          uwaga: "Gdy w zadaniu podano dziedzinę (np. $x\\in\\langle0,5\\rangle$), obowiązuje właśnie ona – nie szukamy większej.",
        },
        {
          nazwa: "Mianownik różny od zera",
          slownie: "Nie wolno dzielić przez zero, więc z dziedziny wyrzucamy liczby, dla których mianownik jest równy zero.",
          tex: "\\frac{A(x)}{B(x)}\\qquad B(x)\\neq0",
          litery: "$A(x)$ – licznik, $B(x)$ – mianownik.",
          przyklad: "Dla $f(x)=\\frac{3}{x-2}$ mianownik zeruje się dla $x=2$, więc $D_f=\\mathbb{R}\\setminus\\{2\\}$.",
          uwaga: "Wyrzucamy liczby zerujące mianownik, a nie licznik. Licznik może być zerem.",
        },
        {
          nazwa: "Pierwiastek kwadratowy",
          slownie: "Pod pierwiastkiem kwadratowym nie może stać liczba ujemna.",
          tex: "\\sqrt{A(x)}\\qquad A(x)\\ge0",
          przyklad: "Dla $f(x)=\\sqrt{x-3}$ musi być $x-3\\ge0$, czyli $x\\ge3$, więc $D_f=\\langle3,\\infty)$.",
          uwaga: "Gdy pierwiastek stoi w mianowniku, wyrażenie pod nim musi być dodatnie: $\\frac{1}{\\sqrt{x-3}}$ ma dziedzinę $(3,\\infty)$.",
        },
        {
          nazwa: "Kilka warunków naraz",
          slownie: "Gdy we wzorze jest kilka ograniczeń, dziedziną jest część wspólna zbiorów spełniających każde z nich.",
          przyklad: "Dla $f(x)=\\frac{\\sqrt{x+1}}{x-2}$ potrzeba $x\\ge-1$ oraz $x\\neq2$. Stąd $D_f=\\langle-1,2)\\cup(2,\\infty)$.",
          uwaga: "Dziedzinę zapisz zbiorem lub przedziałem, a nie samą nierównością.",
        },
      ],
      jak: [
        "Sprawdź, czy we wzorze jest ułamek (mianownik $\\neq0$) albo pierwiastek kwadratowy (wyrażenie pod nim $\\ge0$, w mianowniku $>0$).",
        "Zapisz każdy warunek jako równanie lub nierówność i je rozwiąż.",
        "Gdy warunków jest kilka, weź ich część wspólną.",
        "Zapisz dziedzinę przedziałem albo zbiorem i sprawdź ją na jednej liczbie.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Dziedziną funkcji $f(x)=\\frac{x+4}{2x-6}$ jest zbiór. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\mathbb{R}\\setminus\\{-4\\}$", "$\\mathbb{R}\\setminus\\{6\\}$", "$\\mathbb{R}\\setminus\\{3\\}$", "$\\mathbb{R}\\setminus\\{-3\\}$"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Dziedziną funkcji $f(x)=\\sqrt{5-2x}$ jest przedział. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\left(-\\infty,\\frac{5}{2}\\right)$", "$\\left(-\\infty,\\frac{5}{2}\\right\\rangle$", "$\\left\\langle\\frac{5}{2},\\infty\\right)$", "$\\left\\langle-\\frac{5}{2},\\infty\\right)$"],
          poprawna: 1,
        },
        {
          nr: "10",
          tresc: "Dziedziną funkcji $f(x)=\\frac{1}{\\sqrt{x+2}}$ jest zbiór. **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-2,\\infty)$", "$\\langle-2,\\infty)$", "$\\mathbb{R}\\setminus\\{-2\\}$", "$(2,\\infty)$"],
          poprawna: 0,
        },
        {
          nr: "11",
          tresc: "Funkcja $f$ jest określona wzorem $f(x)=\\frac{x}{x^2-9}$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Liczba $0$ należy do dziedziny funkcji $f$.", litery: "PF", poprawna: 0 },
            { tekst: "Liczba $-3$ należy do dziedziny funkcji $f$.", litery: "PF", poprawna: 1 },
            { tekst: "$D_f=\\mathbb{R}\\setminus\\{-3,3\\}$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "12",
          tresc: "Dziedziną funkcji $f(x)=\\sqrt{x-1}+\\frac{1}{x-4}$ jest zbiór. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\langle1,\\infty)$", "$(1,\\infty)\\setminus\\{4\\}$", "$\\mathbb{R}\\setminus\\{4\\}$", "$\\langle1,\\infty)\\setminus\\{4\\}$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Wyznacz dziedzinę funkcji $f(x)=\\frac{\\sqrt{3x+6}}{x-1}$. **Zapisz obliczenia.**",
          rozwiazanie: "Pod pierwiastkiem nie może być liczby ujemnej: $3x+6\\ge0$, więc $3x\\ge-6$ i $x\\ge-2$.\n\nMianownik nie może być zerem: $x-1\\neq0$, więc $x\\neq1$.\n\nDziedziną jest część wspólna obu warunków: liczby nie mniejsze niż $-2$ z wyjątkiem liczby $1$.\n\nOdpowiedź: $D_f=\\langle-2,\\infty)\\setminus\\{1\\}$.",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "Wyznacz dziedzinę funkcji $g(x)=\\frac{x^2-16}{x-4}$. Czy funkcja $h(x)=x+4$ jest równa funkcji $g$? Odpowiedź uzasadnij. **Zapisz obliczenia.**",
          rozwiazanie: "Mianownik nie może być zerem, więc $x\\neq4$ i $D_g=\\mathbb{R}\\setminus\\{4\\}$.\n\nDla $x\\neq4$ mamy $g(x)=\\frac{(x-4)(x+4)}{x-4}=x+4$.\n\nFunkcja $h(x)=x+4$ ma dziedzinę $\\mathbb{R}$, czyli inną niż $g$ (liczba $4$ należy do $D_h$, ale nie do $D_g$).\n\nOdpowiedź: $D_g=\\mathbb{R}\\setminus\\{4\\}$; funkcje $g$ i $h$ nie są równe, bo mają różne dziedziny.",
        },
      ],
      generatory: [
        {
          id: "dziedzina-ulamek",
          nazwa: "Liczby spoza dziedziny",
          opis: "Podaj liczby, których nie ma w dziedzinie funkcji z ułamkiem – takich, dla których mianownik jest zerem.",
          generuj(r) {
            const LICZNIKI = [
              { t: "1" }, { t: "3" }, { t: "x^2 + 1" }, { t: "x^2 + 4" },
              { t: "x + 2", z: q(-2) }, { t: "2x - 1", z: q(1, 2) }, { t: "x", z: q(0) }, { t: "5 - x", z: q(5) },
            ];
            for (;;) {
              const typ = r.pick(["liniowy", "iloczyn", "roznica", "wspolny"]);
              const m = wyrazenieZZerami(r, typ);
              const lic = r.pick(LICZNIKI);
              if (lic.z && m.zera.some((z) => z.eq(lic.z))) continue;
              return {
                tresc: `Funkcja $f$ jest określona wzorem $f(x) = \\frac{${lic.t}}{${m.tex}}$. Podaj wszystkie liczby, które nie należą do dziedziny funkcji $f$.`,
                pola: [{ id: "w", typ: "zbior", ile: m.zera.length, etykieta: "Liczby spoza dziedziny" }],
                odpowiedz: { w: m.zera },
                wynik: `$${zbiorTex(m.zera)}$`,
                rozwiazanie: [
                  `Mianownik nie może być równy zero: $${m.tex} = 0$.`,
                  ...m.kroki,
                  `Zatem $D_f = \\mathbb{R}\\setminus${zbiorTex(m.zera)}$, a liczby spoza dziedziny to $${[...m.zera].sort((a, b) => a.cmp(b)).map((z) => z.tex()).join("$ i $")}$.`,
                ],
              };
            }
          },
        },
        {
          id: "dziedzina-przedzial",
          nazwa: "Dziedzina z pierwiastkiem",
          opis: "Wyznacz dziedzinę funkcji z pierwiastkiem kwadratowym (także w mianowniku) i wybierz właściwy przedział.",
          generuj(r) {
            const a = r.intBez(-4, 4, 0), b = r.intBez(-9, 9, 0);
            const scisle = r.chance(0.45);
            const rad = wielomianTex([a, b]);
            const rr = q(-b, a);
            const t = rr.tex();
            const lic = r.pick(["1", "x", "3"]);
            const wzor = scisle ? `\\frac{${lic}}{\\sqrt{${rad}}}` : `\\sqrt{${rad}}`;
            const wszystkie = [
              { o: `$\\langle ${t}, \\infty)$`, ok: a > 0 && !scisle },
              { o: `$(${t}, \\infty)$`, ok: a > 0 && scisle },
              { o: `$(-\\infty, ${t}\\rangle$`, ok: a < 0 && !scisle },
              { o: `$(-\\infty, ${t})$`, ok: a < 0 && scisle },
            ];
            const opcje = r.shuffle(wszystkie);
            const znak = scisle ? ">" : "\\ge";
            const znakX = a > 0 ? znak : scisle ? "<" : "\\le";
            const rozwiazanie = [
              scisle
                ? `Pierwiastek jest w mianowniku, więc wyrażenie pod nim musi być dodatnie: $${rad} > 0$.`
                : `Pod pierwiastkiem nie może być liczby ujemnej: $${rad} \\ge 0$.`,
              `Przenosimy wyraz wolny: $${wsp(a)}x ${znak} ${-b}$.`,
              a > 0
                ? `Dzielimy przez $${a}$: $x ${znakX} ${rr.tex()}$.`
                : `Dzielimy przez liczbę ujemną $${a}$ i zmieniamy zwrot nierówności: $x ${znakX} ${rr.tex()}$.`,
              `Zatem dziedziną jest ${opcje.find((x) => x.ok).o}.`,
            ];
            if (a === 1) rozwiazanie.splice(2, 1);   // dzielenie przez 1 nic nie zmienia
            return {
              tresc: `Wyznacz dziedzinę funkcji $f(x) = ${wzor}$.`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Dziedzina funkcji $f$", opcje: opcje.map((x) => x.o) }],
              odpowiedz: { w: opcje.findIndex((x) => x.ok) },
              wynik: opcje.find((x) => x.ok).o,
              rozwiazanie,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3.4
    {
      id: "wartosci",
      nazwa: "Zbiór wartości funkcji. Najmniejsza i największa wartość",
      sciaga: [
        {
          nazwa: "Zbiór wartości",
          slownie: "Zbiór wartości $\\mathrm{ZW}_f$ to zbiór wszystkich liczb, które funkcja przyjmuje, czyli wartości $f(x)$ dla $x$ z dziedziny.",
          tex: "\\mathrm{ZW}_f=\\{f(x):\\ x\\in D_f\\}",
          przyklad: "Dla $f(x)=x^2$ na dziedzinie $\\{-1,0,1,2\\}$ wartości to $1$, $0$, $1$, $4$, więc $\\mathrm{ZW}_f=\\{0,1,4\\}$.",
          uwaga: "Wartość, która powtarza się dla kilku argumentów, zapisujemy w zbiorze tylko raz.",
        },
        {
          nazwa: "Szacowanie ze wzoru",
          slownie: "Przy prostych wzorach oceniamy wyrażenie: kwadrat jest zawsze nieujemny, a dodanie liczby przesuwa wszystkie wartości. Dla funkcji $ax+b$ w przedziale sprawdzamy wartości na końcach.",
          przyklad: "Dla $f(x)=x^2+3$ mamy $x^2\\ge0$, więc $f(x)\\ge3$ i $\\mathrm{ZW}_f=\\langle3,\\infty)$. Dla $g(x)=2x-1$ w $\\langle0,3\\rangle$: $g(0)=-1$, $g(3)=5$, więc $\\mathrm{ZW}_g=\\langle-1,5\\rangle$.",
          uwaga: "Przy funkcji malejącej mniejszy argument daje większą wartość – uporządkuj końce przedziału wartości od najmniejszego.",
        },
        {
          nazwa: "Najmniejsza i największa wartość",
          slownie: "Największa wartość to największa liczba w zbiorze wartości, a najmniejsza – najmniejsza. Funkcja musi ją naprawdę przyjmować, a nie tylko się do niej zbliżać. Nie każda funkcja ma takie wartości.",
          przyklad: "Dla $f(x)=x^2+3$ najmniejsza wartość to $3$ (dla $x=0$), a największej nie ma, bo wartości rosną bez ograniczenia.",
          uwaga: "Funkcja $f(x)=x$ w przedziale $(0,1)$ zbliża się do $0$ i $1$, ale ich nie przyjmuje – nie ma ani najmniejszej, ani największej wartości.",
        },
        {
          nazwa: "Wartość czy argument",
          slownie: "Pytanie o najmniejszą wartość to pytanie o liczbę $y$. Pytanie, dla jakiego argumentu funkcja ją przyjmuje, to pytanie o liczbę $x$. To dwie różne odpowiedzi.",
          przyklad: "Dla $f(x)=(x-2)^2+1$ najmniejsza wartość to $1$, a przyjmuje ją funkcja dla argumentu $x=2$.",
        },
      ],
      jak: [
        "Jeśli dziedzina jest skończona, policz wartości dla wszystkich argumentów i wypisz je bez powtórzeń.",
        "Dla wzoru oceń wyrażenie: kwadrat $\\ge0$, pierwiastek $\\ge0$, potem uwzględnij dodaną liczbę i znak.",
        "Dla funkcji $ax+b$ w przedziale policz wartości na końcach i uporządkuj je.",
        "Sprawdź, o co pytają: o wartość czy o argument.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Funkcja $f$ jest określona wzorem $f(x)=x^2-1$ dla $x\\in\\{-2,-1,0,1,2\\}$. Zbiorem wartości funkcji $f$ jest. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\{0,3\\}$", "$\\{-1,0,3\\}$", "$\\{-2,-1,0,1,2\\}$", "$\\{-1,0,1,3\\}$"],
          poprawna: 1,
        },
        {
          nr: "16",
          tresc: "Zbiorem wartości funkcji $f(x)=x^2+4$ określonej dla wszystkich liczb rzeczywistych jest. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\mathbb{R}$", "$(4,\\infty)$", "$\\langle0,\\infty)$", "$\\langle4,\\infty)$"],
          poprawna: 3,
        },
        {
          nr: "17",
          tresc: "Najmniejsza wartość funkcji $f(x)=-3x+2$ w przedziale $\\langle-1,4\\rangle$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$-10$", "$5$", "$-1$", "$4$"],
          poprawna: 0,
        },
        {
          nr: "18",
          tresc: "Funkcja $f$ jest określona wzorem $f(x)=\\sqrt{x}+1$ dla $x\\in\\langle0,\\infty)$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\mathrm{ZW}_f=\\langle1,\\infty)$", litery: "PF", poprawna: 0 },
            { tekst: "Najmniejsza wartość funkcji $f$ jest równa $1$.", litery: "PF", poprawna: 0 },
            { tekst: "Funkcja $f$ ma największą wartość.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "19",
          tresc: "Największa wartość funkcji $f(x)=5-(x-3)^2$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$0$", "$5$", "$-4$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Funkcja $f(x)=2x-5$ jest określona w przedziale $\\langle-2,3\\rangle$. Wyznacz zbiór wartości tej funkcji oraz jej najmniejszą i największą wartość. **Zapisz obliczenia.**",
          rozwiazanie: "Współczynnik przy $x$ jest dodatni, więc funkcja jest rosnąca. Najmniejszą wartość przyjmuje na lewym końcu przedziału, a największą na prawym.\n\n$f(-2)=2\\cdot(-2)-5=-9$.\n\n$f(3)=2\\cdot3-5=1$.\n\nOdpowiedź: $\\mathrm{ZW}_f=\\langle-9,1\\rangle$, najmniejsza wartość to $-9$, największa to $1$.",
        },
        {
          nr: "21",
          punkty: 2,
          tresc: "Wyznacz zbiór wartości funkcji $g(x)=-x^2+4$ określonej dla wszystkich liczb rzeczywistych. Podaj, dla jakiego argumentu funkcja $g$ przyjmuje największą wartość. **Zapisz obliczenia.**",
          rozwiazanie: "Kwadrat jest nieujemny: $x^2\\ge0$, więc $-x^2\\le0$ i $g(x)=-x^2+4\\le4$.\n\nWartość $4$ funkcja przyjmuje dla $x=0$. Każdą mniejszą wartość $y\\le4$ też przyjmuje, np. dla $x=\\sqrt{4-y}$.\n\nWartości rosną bez końca w dół, więc funkcja nie ma najmniejszej wartości.\n\nOdpowiedź: $\\mathrm{ZW}_g=(-\\infty,4\\rangle$; największą wartość $4$ funkcja przyjmuje dla $x=0$.",
        },
      ],
      generatory: [
        {
          id: "wartosci-najmniejsza-najwieksza",
          nazwa: "Najmniejsza i największa",
          opis: "Znajdź najmniejszą albo największą wartość funkcji (albo argument, dla którego ją przyjmuje) w danym przedziale.",
          generuj(r) {
            const pytajArg = r.chance(0.3);
            let tresc, wynik, wartosc, rozwiazanie;
            if (r.chance(0.5)) {
              const a = r.intBez(-5, 5, 0), b = r.int(-9, 9);
              const p = r.int(-6, 4), kon = p + r.int(2, 6);
              const maks = r.chance();
              const rosnaca = a > 0;
              const lewy = maks ? !rosnaca : rosnaca;
              const arg = lewy ? p : kon;
              const s = podstaw([a, b], q(arg));
              wartosc = s.suma;
              const nazwa = maks ? "największą" : "najmniejszą";
              tresc = `Funkcja $f(x) = ${wielomianTex([a, b])}$ jest określona w przedziale $\\langle ${p}, ${kon}\\rangle$. ${pytajArg ? `Dla jakiego argumentu z tego przedziału funkcja $f$ przyjmuje ${nazwa} wartość?` : `Oblicz ${nazwa} wartość funkcji $f$.`}`;
              wynik = pytajArg ? `$x = ${arg}$` : `$${wartosc.tex()}$`;
              rozwiazanie = [
                `Współczynnik przy $x$ jest równy $${a}$, więc funkcja jest ${rosnaca ? "rosnąca" : "malejąca"}.`,
                `${maks ? "Największą" : "Najmniejszą"} wartość przyjmuje na ${lewy ? "lewym" : "prawym"} końcu przedziału, czyli dla $x = ${arg}$.`,
                `$f(${arg}) = ${s.zapis} = ${wartosc.tex()}$.`,
              ];
              if (pytajArg) wartosc = q(arg);
            } else {
              const eps = r.pick([1, -1]), h = r.int(-4, 4), k = r.int(-6, 6);
              const p = h - r.int(1, 4), kon = h + r.int(1, 4);
              const maks = eps < 0;
              const nazwa = maks ? "największą" : "najmniejszą";
              tresc = `Funkcja $f(x) = ${kwadrat(eps, h, k)}$ jest określona w przedziale $\\langle ${p}, ${kon}\\rangle$. ${pytajArg ? `Dla jakiego argumentu funkcja $f$ przyjmuje ${nazwa} wartość?` : `Oblicz ${nazwa} wartość funkcji $f$.`}`;
              wartosc = pytajArg ? q(h) : q(k);
              wynik = pytajArg ? `$x = ${h}$` : `$${k}$`;
              const kw = h === 0 ? "x^2" : `(x ${plusMinus(-h)})^2`;
              rozwiazanie = [
                `Wyrażenie $${kw}$ jest nieujemne i równe $0$ dla $x = ${h}$. Liczba $${h}$ należy do przedziału $\\langle ${p}, ${kon}\\rangle$.`,
                maks
                  ? `Zatem $-${kw} \\le 0$ i $f(x) \\le ${k}$, a równość zachodzi dla $x = ${h}$.`
                  : `Zatem $f(x) \\ge ${k}$, a równość zachodzi dla $x = ${h}$.`,
                pytajArg ? `${maks ? "Największą" : "Najmniejszą"} wartość funkcja przyjmuje dla $x = ${h}$.` : `${maks ? "Największa" : "Najmniejsza"} wartość to $${k}$.`,
              ];
            }
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: pytajArg ? "$x =$" : "Szukana wartość" }],
              odpowiedz: { w: wartosc },
              wynik,
              rozwiazanie,
            };
          },
        },
        {
          id: "wartosci-zbior-skonczona",
          nazwa: "Zbiór wartości – tabelka",
          opis: "Funkcja ze wzoru na skończonej dziedzinie: policz wartości i podaj, ile ich jest różnych albo jaka jest najmniejsza lub największa.",
          generuj(r) {
            const eps = r.pick([1, -1]), h = r.int(-2, 3), k = r.int(-4, 4);
            const n = r.int(5, 8), s = r.int(-4, 1);
            const xs = Array.from({ length: n }, (_, i) => s + i);
            const wart = xs.map((x) => eps * (x - h) ** 2 + k);
            const rozne = [...new Set(wart)].sort((a, b) => a - b);
            const rodzaj = r.pick(["ile", "min", "max"]);
            const pytanie = rodzaj === "ile" ? "Ile elementów ma zbiór wartości funkcji $f$?" : rodzaj === "min" ? "Oblicz najmniejszą wartość funkcji $f$." : "Oblicz największą wartość funkcji $f$.";
            const odp = rodzaj === "ile" ? rozne.length : rodzaj === "min" ? rozne[0] : rozne[rozne.length - 1];
            return {
              tresc: `Funkcja $f(x) = ${kwadrat(eps, h, k)}$ ma dziedzinę $D_f = \\{${xs.join(", ")}\\}$. ${pytanie}`,
              pola: [{ id: "w", typ: "liczba", etykieta: rodzaj === "ile" ? "Liczba elementów" : "Szukana wartość" }],
              odpowiedz: { w: q(odp) },
              wynik: `$${odp}$`,
              rozwiazanie: [
                `Liczymy wartości dla kolejnych argumentów: ${wart.map((v) => `$${v}$`).join(", ")}.`,
                `Zbiór wartości zapisujemy bez powtórzeń: $\\mathrm{ZW}_f = \\{${rozne.join(", ")}\\}$.`,
                rodzaj === "ile" ? `Ma on $${rozne.length}$ elementów.` : `${rodzaj === "min" ? "Najmniejsza" : "Największa"} z tych liczb to $${odp}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3.5
    {
      id: "zerowe",
      nazwa: "Miejsce zerowe funkcji",
      sciaga: [
        {
          nazwa: "Miejsce zerowe",
          slownie: "Miejsce zerowe funkcji to taki argument $x_0$, dla którego wartość funkcji jest równa zero. Na wykresie to punkt wspólny wykresu z osią $OX$.",
          tex: "f(x_0)=0",
          litery: "$x_0$ – miejsce zerowe funkcji $f$.",
          przyklad: "Dla $f(x)=2x-6$ mamy $f(3)=0$, więc $3$ jest miejscem zerowym, a wykres przecina oś $OX$ w punkcie $(3,0)$.",
          uwaga: "Miejsce zerowe to liczba $x_0$ (argument), a nie punkt $(x_0,0)$ ani wartość.",
        },
        {
          nazwa: "Jak je znaleźć",
          slownie: "Rozwiąż równanie $f(x)=0$ i zostaw tylko te rozwiązania, które należą do dziedziny funkcji.",
          tex: "f(x)=0\\qquad x\\in D_f",
          przyklad: "Dla $f(x)=\\frac{x-5}{x+1}$ licznik jest zerem dla $x=5$. Liczba $5$ należy do dziedziny, więc jest miejscem zerowym.",
          uwaga: "Jeśli rozwiązanie równania nie należy do dziedziny (np. zeruje też mianownik), nie jest miejscem zerowym.",
        },
        {
          nazwa: "Iloczyn i ułamek równe zero",
          slownie: "Iloczyn jest zerem, gdy któryś czynnik jest zerem. Ułamek jest zerem, gdy licznik jest zerem, a mianownik nie jest zerem.",
          tex: "A\\cdot B=0\\iff A=0\\text{ lub }B=0\\qquad\\frac{A}{B}=0\\iff A=0\\text{ i }B\\neq0",
          przyklad: "Z $(x-1)(x+4)=0$ mamy $x=1$ lub $x=-4$. Dla $\\frac{x^2-9}{x-3}$ licznik zeruje się dla $x=3$ i $x=-3$, ale $x=3$ zeruje też mianownik, więc miejscem zerowym jest tylko $-3$.",
          uwaga: "Nie skracaj ułamka, zanim zapiszesz dziedzinę – liczba $3$ i tak jest z niej wyrzucona.",
        },
        {
          nazwa: "Ile miejsc zerowych",
          slownie: "Funkcja może mieć jedno miejsce zerowe, kilka albo żadnego.",
          przyklad: "Funkcja $f(x)=x^2+1$ nie ma miejsc zerowych, bo $x^2+1\\ge1$. Funkcja $g(x)=x^2-4=(x-2)(x+2)$ ma dwa: $-2$ i $2$.",
          uwaga: "Gdy dziedzina jest ograniczona do przedziału, miejsce zerowe musi do niego należeć. Funkcja $2x-6$ w przedziale $\\langle4,9\\rangle$ nie ma miejsc zerowych.",
        },
      ],
      jak: [
        "Zapisz równanie $f(x)=0$.",
        "Dla ułamka przyrównaj do zera licznik, dla iloczynu – każdy czynnik osobno.",
        "Rozwiąż równanie i sprawdź, czy każde rozwiązanie należy do dziedziny.",
        "Gdy dziedzina jest podana (np. przedział), odrzuć rozwiązania spoza niej.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Miejscem zerowym funkcji $f(x)=-4x+10$ jest liczba. **Wybierz właściwą odpowiedź.**",
          opcje: ["$-\\frac{5}{2}$", "$\\frac{5}{2}$", "$10$", "$\\frac{2}{5}$"],
          poprawna: 1,
        },
        {
          nr: "23",
          tresc: "Miejscami zerowymi funkcji $f(x)=(x-3)(2x+5)$ są liczby. **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$ i $\\frac{5}{2}$", "$-3$ i $-\\frac{5}{2}$", "$3$ i $-\\frac{5}{2}$", "$3$ i $-5$"],
          poprawna: 2,
        },
        {
          nr: "24",
          tresc: "Funkcja $f(x)=\\frac{x^2-25}{x+5}$ ma. **Wybierz właściwą odpowiedź.**",
          opcje: ["tylko jedno miejsce zerowe: liczbę $5$", "dwa miejsca zerowe: liczby $5$ i $-5$", "tylko jedno miejsce zerowe: liczbę $-5$", "brak miejsc zerowych"],
          poprawna: 0,
        },
        {
          nr: "25",
          tresc: "Funkcja $f$ jest określona wzorem $f(x)=3x-12$ dla $x\\in\\langle5,10\\rangle$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Liczba $4$ jest miejscem zerowym funkcji $f$.", litery: "PF", poprawna: 1 },
            { tekst: "Funkcja $f$ ma dokładnie jedno miejsce zerowe.", litery: "PF", poprawna: 1 },
            { tekst: "Wykres funkcji $f$ nie ma punktów wspólnych z osią $OX$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "26",
          tresc: "Wykres funkcji $f(x)=2x+m$ przecina oś $OX$ w punkcie $(3,0)$. Liczba $m$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$6$", "$-3$", "$-6$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Wyznacz miejsca zerowe funkcji $f(x)=\\frac{(x-2)(3x+1)}{x-2}$. **Zapisz obliczenia.**",
          rozwiazanie: "Mianownik nie może być zerem, więc $x\\neq2$ i $D_f=\\mathbb{R}\\setminus\\{2\\}$.\n\nLicznik jest zerem, gdy $x-2=0$ lub $3x+1=0$, czyli $x=2$ lub $x=-\\frac{1}{3}$.\n\nLiczba $2$ nie należy do dziedziny, więc odrzucamy ją. Liczba $-\\frac{1}{3}$ należy do dziedziny.\n\nOdpowiedź: funkcja ma jedno miejsce zerowe: $-\\frac{1}{3}$.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "Funkcja $f$ jest określona wzorem $f(x)=(m-2)x+6$. Wyznacz $m$, dla którego miejscem zerowym funkcji $f$ jest liczba $3$. Dla wyznaczonego $m$ zapisz wzór funkcji. **Zapisz obliczenia.**",
          rozwiazanie: "Liczba $3$ jest miejscem zerowym, więc $f(3)=0$.\n\nPodstawiamy: $(m-2)\\cdot3+6=0$, czyli $3(m-2)=-6$.\n\nStąd $m-2=-2$, więc $m=0$.\n\nWzór funkcji: $f(x)=(0-2)x+6=-2x+6$. Sprawdzenie: $f(3)=-6+6=0$.\n\nOdpowiedź: $m=0$, $f(x)=-2x+6$.",
        },
      ],
      generatory: [
        {
          id: "zerowe-wzor",
          nazwa: "Miejsca zerowe",
          opis: "Wyznacz wszystkie miejsca zerowe funkcji liniowej, iloczynowej, różnicy kwadratów albo ułamka.",
          generuj(r) {
            for (;;) {
              const typ = r.pick(["liniowy", "iloczyn", "roznica", "wspolny", "ulamek"]);
              let tex, zera, kroki;
              if (typ === "ulamek") {
                const a = r.intBez(-4, 4, 0), b = r.intBez(-8, 8, 0), c = r.intBez(-6, 6, 0);
                const z = q(-b, a);
                if (z.add(c).zero) continue;
                tex = `\\frac{${wielomianTex([a, b])}}{${wielomianTex([1, c])}}`;
                zera = [z];
                kroki = [
                  `Ułamek jest zerem, gdy licznik jest zerem, a mianownik nie: $${wielomianTex([a, b])} = 0$, więc $x = ${z.tex()}$.`,
                  `Dla tej liczby mianownik jest równy $${z.add(c).tex()}\\neq0$, więc $${z.tex()}$ jest miejscem zerowym.`,
                ];
              } else {
                const m = wyrazenieZZerami(r, typ);
                tex = m.tex;
                zera = m.zera;
                kroki = m.kroki;
              }
              return {
                tresc: `Wyznacz wszystkie miejsca zerowe funkcji $f(x) = ${tex}$.`,
                pola: [{ id: "w", typ: "zbior", ile: zera.length, etykieta: "Miejsca zerowe funkcji $f$" }],
                odpowiedz: { w: zera },
                wynik: `$${zbiorTex(zera)}$`,
                rozwiazanie: [`Miejsce zerowe to rozwiązanie równania $f(x) = 0$.`, ...kroki],
              };
            }
          },
        },
        {
          id: "zerowe-ile",
          nazwa: "Ile miejsc zerowych",
          opis: "Policz miejsca zerowe funkcji – pamiętaj o dziedzinie: ułamek, przedział albo wzór bez rozwiązań.",
          generuj(r) {
            const typ = r.pick(["iloczyn", "iloczyn", "roznica", "roznica", "przedzial", "przedzial", "brak"]);
            let tresc, ile, kroki;
            if (typ === "iloczyn") {
              const a = r.int(-5, 5);
              const b = r.intBez(-5, 5, a);
              const wspolny = r.chance();
              const c = wspolny ? r.pick([a, b]) : r.intBez(-5, 5, a, b);
              const mian = c === 0 ? "x" : `x ${plusMinus(-c)}`;
              ile = wspolny ? 1 : 2;
              tresc = `Ile miejsc zerowych ma funkcja $f(x) = \\frac{${czynnik(a)}${czynnik(b)}}{${mian}}$?`;
              kroki = [
                `Licznik jest zerem dla $x = ${a}$ lub $x = ${b}$.`,
                `Mianownik nie może być zerem: $x \\neq ${c}$.`,
                wspolny ? `Liczba $${c}$ jest jednym z rozwiązań licznika, więc ją odrzucamy.` : `Liczba $${c}$ nie jest rozwiązaniem licznika, więc nic nie odrzucamy.`,
              ];
            } else if (typ === "roznica") {
              const k = r.int(2, 8);
              const wspolny = r.chance();
              const c = wspolny ? r.pick([k, -k]) : r.intBez(-9, 9, k, -k);
              const mian = c === 0 ? "x" : `x ${plusMinus(-c)}`;
              ile = wspolny ? 1 : 2;
              tresc = `Ile miejsc zerowych ma funkcja $f(x) = \\frac{x^2 - ${k * k}}{${mian}}$?`;
              kroki = [
                `Licznik jest zerem dla $x = ${k}$ lub $x = -${k}$.`,
                `Mianownik nie może być zerem: $x \\neq ${c}$.`,
                wspolny ? `Liczba $${c}$ jest jednym z rozwiązań licznika, więc ją odrzucamy.` : `Liczba $${c}$ nie jest rozwiązaniem licznika, więc nic nie odrzucamy.`,
              ];
            } else if (typ === "przedzial") {
              const a = r.intBez(-4, 4, 0), b = r.int(-9, 9);
              const p = r.int(-6, 4), kon = p + r.int(2, 6);
              const z = q(-b, a);
              const nalezy = z.cmp(p) >= 0 && z.cmp(kon) <= 0;
              ile = nalezy ? 1 : 0;
              tresc = `Funkcja $f(x) = ${wielomianTex([a, b])}$ jest określona w przedziale $\\langle ${p}, ${kon}\\rangle$. Ile miejsc zerowych ma ta funkcja?`;
              kroki = [
                `Rozwiązujemy $${wielomianTex([a, b])} = 0$: $x = ${z.tex()}$.`,
                nalezy ? `Liczba $${z.tex()}$ należy do przedziału $\\langle ${p}, ${kon}\\rangle$, więc jest miejscem zerowym.` : `Liczba $${z.tex()}$ nie należy do przedziału $\\langle ${p}, ${kon}\\rangle$, więc funkcja nie ma miejsc zerowych.`,
              ];
            } else {
              const k = r.int(1, 5);
              const zUlamkiem = r.chance();
              const c = r.intBez(-5, 5, 0);
              ile = 0;
              tresc = zUlamkiem
                ? `Ile miejsc zerowych ma funkcja $f(x) = \\frac{x^2 + ${k}}{x ${plusMinus(-c)}}$?`
                : `Ile miejsc zerowych ma funkcja $f(x) = x^2 + ${k * k}$?`;
              const stala = zUlamkiem ? k : k * k;
              kroki = [
                `Kwadrat jest nieujemny, więc $x^2 + ${stala} \\ge ${stala} > 0$ dla każdego $x$.`,
                zUlamkiem ? "Licznik nigdy nie jest zerem, więc ułamek też nie jest zerem." : "Wartość funkcji nigdy nie jest zerem.",
              ];
            }
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba miejsc zerowych" }],
              odpowiedz: { w: q(ile) },
              wynik: `$${ile}$`,
              rozwiazanie: [...kroki, `Funkcja ma $${ile}$ ${ile === 1 ? "miejsce zerowe" : ile === 0 || ile >= 5 ? "miejsc zerowych" : "miejsca zerowe"}.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3.6, 3.7
    {
      id: "monotonicznosc",
      nazwa: "Monotoniczność funkcji. Funkcje różnowartościowe",
      sciaga: [
        {
          nazwa: "Funkcja rosnąca i malejąca",
          slownie: "Funkcja jest rosnąca w zbiorze $A$, gdy większemu argumentowi odpowiada większa wartość. Jest malejąca, gdy większemu argumentowi odpowiada mniejsza wartość.",
          tex: "x_1<x_2\\Rightarrow f(x_1)<f(x_2)\\qquad x_1<x_2\\Rightarrow f(x_1)>f(x_2)",
          litery: "$x_1$, $x_2$ – dowolne argumenty z $A$. Pierwszy zapis opisuje funkcję rosnącą, drugi – malejącą.",
          przyklad: "Funkcja $f(x)=2x$ jest rosnąca: $f(1)=2<f(3)=6$. Funkcja $g(x)=-x$ jest malejąca: $g(1)=-1>g(3)=-3$.",
          uwaga: "Warunek musi zachodzić dla każdej pary argumentów, a nie dla jednej wybranej.",
        },
        {
          nazwa: "Stała i przedziały monotoniczności",
          slownie: "Funkcja stała ma w zbiorze wszędzie tę samą wartość. Ta sama funkcja może rosnąć w jednym przedziale, a maleć w innym – podajemy wtedy przedziały monotoniczności.",
          przyklad: "Funkcja $f(x)=x^2$ jest malejąca w przedziale $(-\\infty,0\\rangle$ i rosnąca w przedziale $\\langle0,\\infty)$.",
          uwaga: "Liczba, w której funkcja zmienia kierunek (tu $0$), należy do obu przedziałów domkniętych. Nie mów, że funkcja jest rosnąca w całym $\\mathbb{R}$, jeśli gdzieś maleje.",
        },
        {
          nazwa: "Monotoniczność funkcji ax + b",
          slownie: "Dla funkcji $f(x)=ax+b$ liczy się znak współczynnika $a$ przy $x$. Gdy $a=0$, funkcja jest stała.",
          tex: "a>0\\Rightarrow\\nearrow\\qquad a<0\\Rightarrow\\searrow",
          litery: "$\\nearrow$ – funkcja rosnąca, $\\searrow$ – funkcja malejąca; $a$ – współczynnik przy $x$.",
          przyklad: "Funkcja $f(x)=-3x+1$ ma $a=-3<0$, więc jest malejąca. Funkcja $g(x)=\\frac{1}{2}x$ jest rosnąca.",
          uwaga: "Wyraz wolny nie ma znaczenia: funkcja $f(x)=-x+100$ jest malejąca.",
        },
        {
          nazwa: "Funkcja różnowartościowa",
          slownie: "Funkcja jest różnowartościowa, gdy różnym argumentom odpowiadają różne wartości, czyli żadna wartość się nie powtarza. Każda funkcja rosnąca i każda malejąca jest różnowartościowa.",
          tex: "x_1\\neq x_2\\Rightarrow f(x_1)\\neq f(x_2)",
          przyklad: "Funkcja $f(x)=2x+1$ jest różnowartościowa. Funkcja $g(x)=x^2$ nie jest, bo $g(-3)=g(3)=9$.",
          uwaga: "Aby wykazać, że funkcja nie jest różnowartościowa, wystarczy podać jedną parę różnych argumentów o tej samej wartości. Na wykresie: pozioma prosta nie przecina wykresu więcej niż raz.",
        },
      ],
      jak: [
        "Policz wartości dla kilku rosnących argumentów i obserwuj, czy wartości rosną, maleją, czy się nie zmieniają.",
        "Dla wzoru $ax+b$ odczytaj znak współczynnika $a$.",
        "Aby wykazać brak monotoniczności albo różnowartościowości, wskaż konkretny przykład (kontrprzykład).",
        "Dla funkcji różnowartościowej szukaj powtarzających się wartości: jedna powtórka wystarcza, aby odpowiedzieć „nie”.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Funkcja $f(x)=-\\frac{1}{2}x+3$ jest. **Wybierz właściwą odpowiedź.**",
          opcje: [
            "rosnąca w zbiorze $\\mathbb{R}$",
            "malejąca w zbiorze $\\mathbb{R}$",
            "stała w zbiorze $\\mathbb{R}$",
            "rosnąca w przedziale $(-\\infty,0)$ i malejąca w przedziale $\\langle0,\\infty)$",
          ],
          poprawna: 1,
        },
        {
          nr: "30",
          tresc: "Wykres funkcji $f$ jest łamaną o kolejnych wierzchołkach $(-3,2)$, $(0,-1)$, $(2,-1)$, $(4,3)$. Funkcja $f$ jest malejąca w przedziale. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\langle-3,0\\rangle$", "$\\langle-3,2\\rangle$", "$\\langle0,2\\rangle$", "$\\langle2,4\\rangle$"],
          poprawna: 0,
        },
        {
          nr: "31",
          tresc: "Wykres funkcji $g$ określonej w przedziale $\\langle-4,5\\rangle$ jest łamaną o kolejnych wierzchołkach $(-4,1)$, $(-1,4)$, $(2,0)$, $(5,3)$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Funkcja $g$ jest rosnąca w przedziale $\\langle-4,-1\\rangle$.", litery: "PF", poprawna: 0 },
            { tekst: "Funkcja $g$ jest malejąca w przedziale $\\langle-1,5\\rangle$.", litery: "PF", poprawna: 1 },
            { tekst: "Funkcja $g$ jest rosnąca w przedziale $\\langle2,5\\rangle$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "32",
          tresc: "Która z funkcji jest różnowartościowa? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "$f(x)=x^2$, $x\\in\\mathbb{R}$",
            "$h(x)=7$, $x\\in\\mathbb{R}$",
            "$k(x)=x^2$, $x\\in\\langle-2,2\\rangle$",
            "$g(x)=-4x+1$, $x\\in\\mathbb{R}$",
          ],
          poprawna: 3,
        },
        {
          nr: "33",
          tresc: "Funkcja $f$ jest malejąca w zbiorze $\\mathbb{R}$ i $f(2)=7$. Wtedy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$f(5)>7$", "$f(-1)<7$", "$f(0)>7$", "$f(3)>7$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 2,
          tresc: "Wykaż na podstawie definicji, że funkcja $f(x)=2x-3$ jest rosnąca w zbiorze $\\mathbb{R}$. **Zapisz obliczenia.**",
          rozwiazanie: "Weźmy dowolne liczby $x_1$ i $x_2$, dla których $x_1<x_2$.\n\nMnożymy obie strony przez $2$ (liczbę dodatnią, więc nierówność się nie zmienia): $2x_1<2x_2$.\n\nOdejmujemy $3$ od obu stron: $2x_1-3<2x_2-3$, czyli $f(x_1)<f(x_2)$.\n\nOdpowiedź: z $x_1<x_2$ wynika $f(x_1)<f(x_2)$ dla dowolnych liczb, więc funkcja $f$ jest rosnąca w $\\mathbb{R}$.",
        },
        {
          nr: "35",
          punkty: 2,
          tresc: "Funkcja $f(x)=x^2-2x$ jest określona na zbiorze $\\{-2,-1,0,1,2,3\\}$. Czy jest różnowartościowa? Odpowiedź uzasadnij. **Zapisz obliczenia.**",
          rozwiazanie: "Obliczamy wartości: $f(-2)=8$, $f(-1)=3$, $f(0)=0$, $f(1)=-1$, $f(2)=0$, $f(3)=3$.\n\nDla różnych argumentów $0$ i $2$ wartości są równe: $f(0)=f(2)=0$ (podobnie $f(-1)=f(3)=3$).\n\nOdpowiedź: funkcja $f$ nie jest różnowartościowa.",
        },
      ],
      generatory: [
        {
          id: "monotonicznosc-wzor",
          nazwa: "Rosnąca czy malejąca",
          opis: "Rozpoznaj monotoniczność funkcji liniowej ze wzoru albo policz, ile całkowitych wartości parametru $m$ daje funkcję rosnącą lub malejącą.",
          generuj(r) {
            if (r.chance(0.25)) {
              const k = r.int(-2, 3), A = r.int(4, 7), b = r.intBez(-5, 5, 0);
              const malejaca = r.chance();
              const ile = malejaca ? k + A : A - k;
              const wsp_m = k === 0 ? "m" : `(m ${plusMinus(-k)})`;
              return {
                tresc: `Funkcja $f(x) = ${wsp_m}x ${plusMinus(b)}$ jest ${malejaca ? "malejąca" : "rosnąca"} w zbiorze $\\mathbb{R}$. Ile liczb całkowitych $m$ z przedziału $\\langle ${-A}, ${A}\\rangle$ spełnia ten warunek?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba wartości $m$" }],
                odpowiedz: { w: q(ile) },
                wynik: `$${ile}$`,
                rozwiazanie: [
                  `Funkcja liniowa jest ${malejaca ? "malejąca, gdy współczynnik przy $x$ jest ujemny" : "rosnąca, gdy współczynnik przy $x$ jest dodatni"}: $${k === 0 ? "m" : `m ${plusMinus(-k)}`} ${malejaca ? "<" : ">"} 0$, czyli $m ${malejaca ? "<" : ">"} ${k}$.`,
                  malejaca
                    ? `Liczby całkowite z przedziału $\\langle ${-A}, ${A}\\rangle$ mniejsze od $${k}$ to $${-A}, \\ldots, ${k - 1}$.`
                    : `Liczby całkowite z przedziału $\\langle ${-A}, ${A}\\rangle$ większe od $${k}$ to $${k + 1}, \\ldots, ${A}$.`,
                  malejaca ? `Jest ich $${k - 1} - (${-A}) + 1 = ${ile}$.` : `Jest ich $${A} - ${k + 1 < 0 ? `(${k + 1})` : k + 1} + 1 = ${ile}$.`,
                ],
              };
            }
            const rodzaj = r.pick(["zwykla", "zwykla", "odwrocona", "ulamek", "stala"]);
            let wzor, wynik, kroki;
            if (rodzaj === "zwykla") {
              const a = r.intBez(-6, 6, 0), b = r.intBez(-9, 9, 0);
              wzor = wielomianTex([a, b]);
              wynik = a > 0 ? 0 : 1;
              kroki = [`Współczynnik przy $x$ jest równy $${a}$.`, `Jest ${a > 0 ? "dodatni" : "ujemny"}, więc funkcja jest ${a > 0 ? "rosnąca" : "malejąca"}.`];
            } else if (rodzaj === "odwrocona") {
              const a = r.int(1, 6), b = r.int(1, 9);
              wzor = `${b} - ${wsp(a)}x`;
              wynik = 1;
              kroki = [`Zapisujemy wzór w postaci $f(x) = -${wsp(a)}x + ${b}$.`, `Współczynnik przy $x$ jest równy $-${a}$, czyli ujemny, więc funkcja jest malejąca.`];
            } else if (rodzaj === "ulamek") {
              const c = r.pick([-5, -3, -2, 2, 3, 5]), p = r.intBez(-6, 6, 0);
              wzor = `${c < 0 ? "-" : ""}\\frac{x ${plusMinus(-p)}}{${Math.abs(c)}}`;
              wynik = c > 0 ? 0 : 1;
              kroki = [`Zapisujemy wzór w postaci $f(x) = ${q(1, c).tex()}x ${plusMinus(q(-p, c))}$.`,`Współczynnik przy $x$ jest równy $${q(1, c).tex()}$, czyli ${c > 0 ? "dodatni, więc funkcja jest rosnąca" : "ujemny, więc funkcja jest malejąca"}.`];
            } else {
              const mm = r.int(2, 6), n = r.intBez(-5, 5, 0);
              wzor = `${mm}(x ${plusMinus(n)}) - ${mm}x`;
              wynik = 2;
              kroki = [`Wymnażamy: $f(x) = ${mm}x ${plusMinus(mm * n)} - ${mm}x = ${mm * n}$.`, "Wartość nie zależy od $x$, więc funkcja jest stała."];
            }
            return {
              tresc: `Funkcja $f$ jest określona wzorem $f(x) = ${wzor}$ dla $x\\in\\mathbb{R}$. Jaka jest ta funkcja?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Funkcja $f$ jest", opcje: ["rosnąca", "malejąca", "stała"] }],
              odpowiedz: { w: wynik },
              wynik: ["rosnąca", "malejąca", "stała"][wynik],
              rozwiazanie: kroki,
            };
          },
        },
        {
          id: "monotonicznosc-roznowartosciowa",
          nazwa: "Czy różnowartościowa",
          opis: "Funkcja ze wzoru na skończonej dziedzinie: sprawdź, czy któraś wartość się powtarza.",
          generuj(r) {
            const cel = r.chance();   // czy funkcja ma być różnowartościowa
            for (;;) {
              const liniowa = r.chance(0.15);
              const a = r.intBez(-4, 4, 0), b = r.int(-6, 6);
              const eps = r.pick([1, -1]), h = r.int(-2, 3), k = r.int(-3, 3);
              const n = r.int(4, 6), s = r.int(-4, 2);
              const xs = Array.from({ length: n }, (_, i) => s + i);
              const wart = xs.map((x) => (liniowa ? a * x + b : eps * (x - h) ** 2 + k));
              let para = null;
              for (let i = 0; i < n && !para; i++) for (let j = i + 1; j < n; j++) if (wart[i] === wart[j]) { para = [i, j]; break; }
              if (!!para === cel) continue;
              const dziedzina = `\\{${xs.join(", ")}\\}`;
              return {
                tresc: `Funkcja $f(x) = ${liniowa ? wielomianTex([a, b]) : kwadrat(eps, h, k)}$ ma dziedzinę $D_f = ${dziedzina}$. Czy funkcja $f$ jest różnowartościowa?`,
                pola: [{ id: "w", typ: "wybor", etykieta: "Funkcja $f$ jest różnowartościowa", opcje: ["Tak", "Nie"] }],
                odpowiedz: { w: para ? 1 : 0 },
                wynik: para ? "Nie" : "Tak",
                rozwiazanie: [
                  `Liczymy wartości dla kolejnych argumentów: ${wart.map((v) => `$${v}$`).join(", ")}.`,
                  para
                    ? `Dla różnych argumentów $${xs[para[0]]}$ i $${xs[para[1]]}$ wartości są równe: $f(${xs[para[0]]}) = f(${xs[para[1]]}) = ${wart[para[0]]}$.`
                    : "Wszystkie wartości są różne.",
                  para ? "Funkcja nie jest różnowartościowa." : "Funkcja jest różnowartościowa.",
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3.8, 3.9
    {
      id: "odczytywanie",
      nazwa: "Odczytywanie własności funkcji z wykresu. Informacje z wykresu funkcji",
      sciaga: [
        {
          nazwa: "Dziedzina i zbiór wartości",
          slownie: "Dziedzinę odczytujemy z osi $OX$: od lewego do prawego końca wykresu. Zbiór wartości odczytujemy z osi $OY$: od najniższego do najwyższego punktu wykresu.",
          przyklad: "Wykres to łamana o wierzchołkach $(-4,2)$, $(0,-2)$, $(4,2)$. Wtedy $D_f=\\langle-4,4\\rangle$, a wysokości punktów są od $-2$ do $2$, więc $\\mathrm{ZW}_f=\\langle-2,2\\rangle$.",
          uwaga: "Nie myl osi: dziedzina leży na osi poziomej, zbiór wartości na pionowej.",
        },
        {
          nazwa: "Miejsca zerowe i znak funkcji",
          slownie: "Miejsca zerowe to odcięte punktów, w których wykres przecina lub dotyka osi $OX$. Funkcja jest dodatnia tam, gdzie wykres leży nad osią $OX$, a ujemna – pod nią.",
          przyklad: "Dla łamanej $(-4,2)$, $(0,-2)$, $(4,2)$: oś $OX$ jest przecinana w punktach o odciętych $-2$ i $2$. Funkcja jest dodatnia dla $x\\in\\langle-4,-2)\\cup(2,4\\rangle$ i ujemna dla $x\\in(-2,2)$.",
          uwaga: "W miejscu zerowym funkcja nie jest ani dodatnia, ani ujemna – końce takich przedziałów są otwarte.",
        },
        {
          nazwa: "Monotoniczność i wartości ekstremalne",
          slownie: "Gdy idziemy po wykresie w prawo i wykres idzie w górę, funkcja rośnie; w dół – maleje; poziomo – jest stała. Najwyższy punkt wykresu daje największą wartość, najniższy – najmniejszą.",
          przyklad: "Dla łamanej $(-4,2)$, $(0,-2)$, $(4,2)$: funkcja maleje w $\\langle-4,0\\rangle$ i rośnie w $\\langle0,4\\rangle$. Najmniejsza wartość to $-2$ (dla $x=0$), największa to $2$ (dla $x=-4$ i $x=4$).",
          uwaga: "Największa wartość może być przyjęta dla kilku argumentów, ale to wciąż jedna liczba.",
        },
        {
          nazwa: "Argument i wartość z wykresu",
          slownie: "Aby odczytać $f(a)$, z punktu $a$ na osi $OX$ idź pionowo do wykresu i odczytaj wysokość. Aby znaleźć argumenty o wartości $b$, z punktu $b$ na osi $OY$ idź poziomo i sprawdź, w których miejscach napotkasz wykres.",
          przyklad: "Dla łamanej $(-4,2)$, $(0,-2)$, $(4,2)$ wartość $1$ funkcja przyjmuje dla $x=-3$ i dla $x=3$.",
          uwaga: "Jedna wartość może mieć kilka argumentów, ale jeden argument ma tylko jedną wartość.",
        },
        {
          nazwa: "Wykres w zadaniach praktycznych",
          slownie: "W zadaniach z życia oś $OX$ to zwykle czas, a oś $OY$ droga, temperatura lub koszt. Odcinek poziomy oznacza, że wielkość się nie zmienia (np. postój), a im bardziej stromy odcinek, tym szybsza zmiana.",
          tex: "v=\\frac{s_2-s_1}{t_2-t_1}",
          litery: "$v$ – prędkość, $s$ – droga, $t$ – czas.",
          przyklad: "Wykres drogi przechodzi przez punkty $(1,10)$ i $(3,40)$ (godziny, kilometry), więc w $2$ godziny przejechano $30$ km: $v=\\frac{40-10}{3-1}=15$ km/h.",
          uwaga: "Poziomy odcinek na wykresie drogi to postój (prędkość $0$), a nie jazda ze stałą prędkością.",
        },
      ],
      jak: [
        "Zapisz współrzędne wierzchołków wykresu i odczytaj dziedzinę (lewy i prawy koniec).",
        "Dla zbioru wartości znajdź najniższą i najwyższą wysokość wykresu.",
        "Miejsca zerowe znajdź tam, gdzie wysokość jest równa $0$ albo zmienia znak (na odcinku wylicz, w którym miejscu).",
        "W zadaniach praktycznych nazwij osie i jednostki, a odpowiedź podaj z jednostką.",
      ],
      zadania: [
        {
          nr: "36",
          tresc: "Wykres funkcji $f$ jest łamaną o kolejnych wierzchołkach $(-3,1)$, $(-1,4)$, $(2,-2)$, $(5,0)$. Zbiorem wartości funkcji $f$ jest. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\langle-3,5\\rangle$", "$\\langle-2,4\\rangle$", "$\\langle-3,4\\rangle$", "$\\langle-2,5\\rangle$"],
          poprawna: 1,
        },
        {
          nr: "37",
          tresc: "Wykres funkcji $g$ jest łamaną o kolejnych wierzchołkach $(-4,-2)$, $(-1,3)$, $(2,3)$, $(4,-1)$. Funkcja $g$ jest stała w przedziale. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\langle-4,-1\\rangle$", "$\\langle-4,4\\rangle$", "$\\langle-1,2\\rangle$", "$\\langle2,4\\rangle$"],
          poprawna: 2,
        },
        {
          nr: "38",
          tresc: "Wykres funkcji $h$ jest łamaną o kolejnych wierzchołkach $(-2,-2)$, $(0,2)$, $(4,-2)$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Miejscami zerowymi funkcji $h$ są liczby $-1$ i $2$.", litery: "PF", poprawna: 0 },
            { tekst: "Dziedziną funkcji $h$ jest przedział $\\langle-2,2\\rangle$.", litery: "PF", poprawna: 1 },
            { tekst: "Dla $x\\in(-1,2)$ wartości funkcji $h$ są dodatnie.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "39",
          tresc: "Wykres przedstawia drogę $s$ (w km) przebytą przez rowerzystę w zależności od czasu $t$ (w godzinach). Jest łamaną o kolejnych wierzchołkach $(0,0)$, $(2,36)$, $(3,36)$, $(5,66)$. Rowerzysta jechał w ostatnim etapie (od $t=3$ do $t=5$) z prędkością. **Wybierz właściwą odpowiedź.**",
          opcje: ["$13{,}2$ km/h", "$15$ km/h", "$33$ km/h", "$30$ km/h"],
          poprawna: 1,
        },
        {
          nr: "40",
          tresc: "Temperatura powietrza w ciągu doby (w °C) w zależności od godziny $t$ jest opisana łamaną o kolejnych wierzchołkach $(0,-3)$, $(6,-5)$, $(14,7)$, $(24,-1)$. Temperatura rosła przez. **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$ godzin", "$10$ godzin", "$8$ godzin", "$18$ godzin"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "41",
          punkty: 4,
          tresc: "Wykres funkcji $f$ jest łamaną o kolejnych wierzchołkach $(-4,2)$, $(-2,-2)$, $(2,-2)$, $(4,2)$. Odczytaj z wykresu i zapisz: dziedzinę, zbiór wartości, miejsca zerowe oraz przedziały, w których funkcja jest malejąca, stała i rosnąca. **Zapisz obliczenia.**",
          rozwiazanie: "Dziedzina: argumenty od $-4$ do $4$, więc $D_f=\\langle-4,4\\rangle$.\n\nWysokości punktów wykresu są od $-2$ (najniżej) do $2$ (najwyżej), więc $\\mathrm{ZW}_f=\\langle-2,2\\rangle$.\n\nPierwszy odcinek opada o $4$ na długości $2$, więc $f(x)=-2x-6$. Zero: $-2x-6=0$, czyli $x=-3$. Z symetrii drugi punkt przecięcia z osią $OX$ ma odciętą $3$.\n\nWykres idzie w dół od $x=-4$ do $x=-2$, poziomo od $x=-2$ do $x=2$ i w górę od $x=2$ do $x=4$.\n\nOdpowiedź: $D_f=\\langle-4,4\\rangle$, $\\mathrm{ZW}_f=\\langle-2,2\\rangle$, miejsca zerowe: $-3$ i $3$; funkcja jest malejąca w $\\langle-4,-2\\rangle$, stała w $\\langle-2,2\\rangle$, rosnąca w $\\langle2,4\\rangle$.",
        },
        {
          nr: "42",
          punkty: 4,
          tresc: "Wykres przedstawia drogę $s$ (w km) przebytą przez rowerzystkę w zależności od czasu $t$ (w godzinach). Jest łamaną o kolejnych wierzchołkach $(0,0)$, $(1,12)$, $(2,12)$, $(4,42)$. Oblicz: ile kilometrów przejechała w sumie, ile trwał postój, z jaką prędkością jechała w ostatnim etapie i jaka była jej średnia prędkość na całej trasie. **Zapisz obliczenia.**",
          rozwiazanie: "Droga całkowita to wartość $s$ w ostatnim wierzchołku: $42$ km.\n\nPostój to poziomy odcinek od $t=1$ do $t=2$, więc trwał $2-1=1$ godzinę.\n\nW ostatnim etapie (od $t=2$ do $t=4$) przejechała $42-12=30$ km w $2$ godziny, więc $v=\\frac{30}{2}=15$ km/h.\n\nŚrednia prędkość na całej trasie: $\\frac{42}{4}=10{,}5$ km/h.\n\nOdpowiedź: $42$ km; postój $1$ godzina; w ostatnim etapie $15$ km/h; średnia prędkość $10{,}5$ km/h.",
        },
      ],
      generatory: [
        {
          id: "odczyt-lamana",
          nazwa: "Odczyt z wykresu",
          opis: "Wykres jest łamaną opisaną wierzchołkami – odczytaj największą lub najmniejszą wartość, miejsca zerowe, znak albo monotoniczność.",
          generuj(r) {
            for (;;) {
              const n = r.int(4, 5);
              const xs = [r.int(-6, -2)];
              for (let i = 1; i < n; i++) xs.push(xs[i - 1] + r.int(1, 3));
              const ys = Array.from({ length: n }, () => r.int(-5, 6));
              if (ys.slice(1).some((y, i) => y === 0 && ys[i] === 0)) continue;   // bez odcinka poziomego na osi OX
              if (new Set(ys).size < 3) continue;
              const rodzaj = r.pick(["max", "min", "zera", "dodatnie", "rosnaca"]);
              const f = (x) => {
                for (let i = 0; i < n - 1; i++) {
                  if (x >= xs[i] && x <= xs[i + 1]) return q(ys[i]).add(q(ys[i + 1] - ys[i], xs[i + 1] - xs[i]).mul(x - xs[i]));
                }
                throw new Error("poza dziedziną");
              };
              const maks = Math.max(...ys), mini = Math.min(...ys);
              const wierzcholki = xs.map((x, i) => `$(${x}, ${ys[i]})$`).join(", ");
              const dziedzina = `\\langle ${xs[0]}, ${xs[n - 1]}\\rangle`;
              const krok1 = `Wartości funkcji w kolejnych wierzchołkach: ${ys.map((y) => `$${y}$`).join(", ")}.`;
              let pytanie, odp, krokiDalej, pole;
              if (rodzaj === "max" || rodzaj === "min") {
                const ekstremum = rodzaj === "max" ? maks : mini;
                pytanie = `Podaj ${rodzaj === "max" ? "największą" : "najmniejszą"} wartość funkcji $f$.`;
                odp = ekstremum;
                pole = "Szukana wartość";
                krokiDalej = [
                  `Łamana jest ciągła, więc jej najwyższy i najniższy punkt leżą w wierzchołkach: najniżej $${mini}$, najwyżej $${maks}$.`,
                  `${rodzaj === "max" ? "Największa" : "Najmniejsza"} wartość to $${ekstremum}$.`,
                ];
              } else if (rodzaj === "zera") {
                const zera = new Set();
                const opisy = [];
                for (let i = 0; i < n; i++) {
                  if (ys[i] === 0) { zera.add(`w${i}`); opisy.push(`wierzchołek $(${xs[i]}, 0)$ leży na osi $OX$`); }
                  if (i < n - 1 && ys[i] * ys[i + 1] < 0) { zera.add(`o${i}`); opisy.push(`odcinek od $x = ${xs[i]}$ do $x = ${xs[i + 1]}$ przecina oś $OX$ (wysokość zmienia znak z $${ys[i]}$ na $${ys[i + 1]}$)`); }
                }
                pytanie = "Ile miejsc zerowych ma funkcja $f$?";
                odp = zera.size;
                pole = "Liczba miejsc zerowych";
                krokiDalej = [opisy.length ? `Wykres ma punkt wspólny z osią $OX$: ${opisy.join("; ")}.` : "Wysokość nigdzie nie zmienia znaku ani nie jest równa $0$.", `Miejsc zerowych jest $${odp}$.`];
              } else if (rodzaj === "dodatnie") {
                const lista = [];
                for (let x = xs[0]; x <= xs[n - 1]; x++) if (f(x).cmp(0) > 0) lista.push(x);
                if (lista.length < 1 || lista.length > 16) continue;
                pytanie = "Dla ilu argumentów całkowitych funkcja $f$ przyjmuje wartości dodatnie?";
                odp = lista.length;
                pole = "Liczba argumentów";
                krokiDalej = [
                  `Sprawdzamy kolejne liczby całkowite z dziedziny $${dziedzina}$ (na odcinku wyznaczamy wysokość).`,
                  `Wykres leży nad osią $OX$ dla $x = ${lista.join(", ")}$.`,
                  `Takich liczb jest $${odp}$.`,
                ];
              } else {
                let najlepszy = 0, bieg = 0, od = 0, najOd = 0, najDo = 0;
                for (let i = 0; i < n - 1; i++) {
                  if (ys[i + 1] > ys[i]) {
                    if (bieg === 0) od = xs[i];
                    bieg += xs[i + 1] - xs[i];
                    if (bieg > najlepszy) { najlepszy = bieg; najOd = od; najDo = xs[i + 1]; }
                  } else bieg = 0;
                }
                if (najlepszy === 0) continue;
                pytanie = "Podaj długość najdłuższego przedziału, w którym funkcja $f$ jest rosnąca.";
                odp = najlepszy;
                pole = "Długość przedziału";
                krokiDalej = [
                  "Funkcja rośnie na tych odcinkach, na których wysokość rośnie; odcinek malejący albo poziomy przerywa przedział.",
                  `Najdłuższy przedział, w którym funkcja jest rosnąca, to $\\langle ${najOd}, ${najDo}\\rangle$.`,
                  `Jego długość to $${najDo} - ${najOd < 0 ? `(${najOd})` : najOd} = ${odp}$.`,
                ];
              }
              return {
                tresc: `Wykres funkcji $f$ jest łamaną o kolejnych wierzchołkach ${wierzcholki} (dziedziną jest przedział $${dziedzina}$). ${pytanie}`,
                pola: [{ id: "w", typ: "liczba", etykieta: pole }],
                odpowiedz: { w: q(odp) },
                wynik: `$${odp}$`,
                rozwiazanie: [krok1, ...krokiDalej],
              };
            }
          },
        },
        {
          id: "odczyt-droga-czas",
          nazwa: "Droga i czas",
          opis: "Wykres drogi w zależności od czasu (łamana): oblicz prędkość na etapie, czas postoju, całą drogę albo prędkość średnią.",
          generuj(r) {
            const PODMIOTY = [
              { mian: "rowerzysta", bier: "rowerzystę", v: [8, 10, 12, 15, 16, 18, 20, 24] },
              { mian: "pieszy", bier: "pieszego", v: [3, 4, 5, 6] },
              { mian: "samochód", bier: "samochód", v: [40, 50, 60, 72, 80, 90] },
            ];
            for (;;) {
              const pod = r.pick(PODMIOTY);
              const n = r.int(3, 4);
              const odc = [];
              let poprzedniStoi = false;
              for (let i = 0; i < n; i++) {
                const stoi = i > 0 && !poprzedniStoi && r.chance(0.4);
                odc.push(stoi ? { dt: r.int(1, 2), v: 0 } : { dt: r.int(1, 3), v: r.pick(pod.v) });
                poprzedniStoi = stoi;
              }
              if (odc.some((o, i) => i > 0 && o.v > 0 && odc[i - 1].v === o.v)) continue;   // sąsiednie etapy o tej samej prędkości zlałyby się w jeden odcinek
              const ts = [0], ss = [0];
              for (const o of odc) { ts.push(ts[ts.length - 1] + o.dt); ss.push(ss[ss.length - 1] + o.v * o.dt); }
              const T = ts[n], S = ss[n];
              const jazdy = odc.map((o, i) => i).filter((i) => odc[i].v > 0);
              const postoje = odc.map((o, i) => i).filter((i) => odc[i].v === 0);
              const rodzaj = r.pick(["predkosc", "postoj", "droga", "srednia"]);
              if (rodzaj === "postoj" && postoje.length !== 1) continue;   // pytanie o postój ma sens tylko przy jednym postoju
              const wierzcholki = ts.map((t, i) => `$(${t}, ${ss[i]})$`).join(", ");
              const opis = `Wykres przedstawia drogę $s$ (w km) przebytą przez ${pod.bier} w zależności od czasu $t$ (w godzinach). Jest to łamana o kolejnych wierzchołkach ${wierzcholki}.`;
              let pytanie, odp, etykieta, kroki;
              if (rodzaj === "predkosc") {
                const i = r.pick(jazdy);
                pytanie = `Z jaką prędkością (w km/h) poruszał się ${pod.mian} w czasie od $t = ${ts[i]}$ do $t = ${ts[i + 1]}$?`;
                odp = q(odc[i].v);
                etykieta = "Prędkość (w km/h)";
                kroki = [
                  `W tym czasie droga wzrosła od $${ss[i]}$ km do $${ss[i + 1]}$ km, czyli o $${ss[i + 1] - ss[i]}$ km.`,
                  `Czas trwania etapu: $${ts[i + 1]} - ${ts[i]} = ${odc[i].dt}$ godz.`,
                  `Prędkość: $v = \\frac{${ss[i + 1] - ss[i]}}{${odc[i].dt}} = ${odc[i].v}$ km/h.`,
                ];
              } else if (rodzaj === "postoj") {
                const i = r.pick(postoje);
                pytanie = `Ile godzin trwał postój (czas, w którym ${pod.mian} się nie przemieszczał)?`;
                odp = q(odc[i].dt);
                etykieta = "Czas postoju (w godz.)";
                kroki = [
                  `Postojowi odpowiada poziomy odcinek wykresu: droga się nie zmienia, w obu wierzchołkach wynosi $${ss[i]}$ km.`,
                  `Odcinek ten trwa od $t = ${ts[i]}$ do $t = ${ts[i + 1]}$, czyli $${ts[i + 1]} - ${ts[i]} = ${odc[i].dt}$ godz.`,
                ];
              } else if (rodzaj === "droga") {
                pytanie = `Ile kilometrów przebył ${pod.mian} w ciągu całej podróży?`;
                odp = q(S);
                etykieta = "Droga (w km)";
                kroki = [
                  `Droga całkowita to wartość $s$ w ostatnim wierzchołku wykresu, czyli dla $t = ${T}$.`,
                  `Jest to $${S}$ km.`,
                ];
              } else {
                pytanie = `Oblicz średnią prędkość (w km/h) ${pod.bier === pod.mian ? "samochodu" : pod.mian === "pieszy" ? "pieszego" : "rowerzysty"} na całej trasie, razem z postojami.`;
                odp = q(S, T);
                etykieta = "Prędkość średnia (w km/h)";
                kroki = [
                  `Cała droga to $${S}$ km, a cała podróż trwała $${T}$ godz.`,
                  `Prędkość średnia to cała droga podzielona przez cały czas: $\\frac{${S}}{${T}} = ${odp.tex()}$ km/h.`,
                ];
              }
              return {
                tresc: `${opis} ${pytanie}`,
                pola: [{ id: "w", typ: "liczba", etykieta }],
                odpowiedz: { w: odp },
                wynik: `$${odp.tex()}$`,
                rozwiazanie: kroki,
              };
            }
          },
        },
      ],
    },
  ],
};
