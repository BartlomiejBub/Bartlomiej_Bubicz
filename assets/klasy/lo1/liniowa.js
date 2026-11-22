// Klasa 1 (liceum i technikum) · rozdział 4 „Funkcja liniowa” – Matematyka 1, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { q, wielomianTex, plusMinus, texNawias } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** Liczba całkowita w nawiasie, gdy jest ujemna: nw(-3) = "(-3)". */
const nw = (n) => (n < 0 ? `(${n})` : String(n));

/** Wzór ax + b w LaTeX (a, b – liczby albo Q): lin(2, -3) = "2x - 3", lin(q(1, 2), 0) = "\frac{1}{2}x". */
const lin = (a, b, zmienna = "x") => wielomianTex([a, b], zmienna);

/** Konteksty zadań praktycznych: opłata/ilość początkowa b i zmiana a na jednostkę (rosnąca albo malejąca). */
const KONTEKSTY = [
  {
    rosnaca: true, f: "K", jednostka: "km", jednostkaWyniku: "zł", etWynik: "Koszt przejazdu w zł", etArg: "Liczba kilometrów",
    opis: (b, a) => `Przejazd taksówką kosztuje $${b}$ zł opłaty początkowej plus $${a}$ zł za każdy przejechany kilometr.`,
    pytA: (x) => `Ile zapłacimy za przejazd $${x}$ km?`,
    pytB: (v) => `Ile kilometrów przejechano, jeśli zapłacono $${v}$ zł?`,
  },
  {
    rosnaca: true, f: "K", jednostka: "godz.", jednostkaWyniku: "zł", etWynik: "Koszt wypożyczenia w zł", etArg: "Liczba godzin",
    opis: (b, a) => `Wypożyczenie roweru kosztuje $${b}$ zł opłaty stałej plus $${a}$ zł za każdą godzinę jazdy.`,
    pytA: (x) => `Ile zapłacimy za wypożyczenie roweru na $${x}$ godz.?`,
    pytB: (v) => `Na ile godzin wypożyczono rower, jeśli zapłacono $${v}$ zł?`,
  },
  {
    rosnaca: true, f: "K", jednostka: "GB", jednostkaWyniku: "zł", etWynik: "Rachunek w zł", etArg: "Liczba gigabajtów",
    opis: (b, a) => `Abonament telefoniczny kosztuje $${b}$ zł miesięcznie plus $${a}$ zł za każdy gigabajt przesłanych danych.`,
    pytA: (x) => `Ile wyniesie rachunek w miesiącu, w którym przesłano $${x}$ GB?`,
    pytB: (v) => `Ile gigabajtów przesłano, jeśli rachunek wyniósł $${v}$ zł?`,
  },
  {
    rosnaca: false, f: "V", jednostka: "min", jednostkaWyniku: "l", etWynik: "Ilość wody w litrach", etArg: "Liczba minut",
    opis: (b, a) => `W zbiorniku jest $${b}$ litrów wody. Po otwarciu kranu ubywa jej $${a}$ litrów na minutę.`,
    pytA: (x) => `Ile litrów wody zostanie w zbiorniku po $${x}$ minutach?`,
    pytB: (v) => `Po ilu minutach w zbiorniku zostanie $${v}$ litrów wody?`,
  },
];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 4.1
    {
      id: "proporcjonalnosc",
      nazwa: "Proporcjonalność prosta",
      sciaga: [
        {
          nazwa: "Proporcjonalność prosta",
          slownie: "Wielkość $y$ jest wprost proporcjonalna do wielkości $x$, gdy iloraz $\\frac{y}{x}$ jest stały. Gdy $x$ rośnie $k$ razy, $y$ też rośnie $k$ razy.",
          tex: "y=ax\\qquad a\\neq 0",
          litery: "$a$ – współczynnik proporcjonalności, czyli stały iloraz $\\frac{y}{x}$.",
          przyklad: "Kilogram jabłek kosztuje $4$ zł, więc koszt $y$ zakupów to $y=4x$, gdzie $x$ to masa w kg. Za $3$ kg zapłacimy $12$ zł.",
          uwaga: "Wzór $y=4x+2$ nie opisuje proporcjonalności prostej, bo dla $x=0$ wychodzi $y=2$, a nie $0$.",
        },
        {
          nazwa: "Jak rozpoznać proporcjonalność",
          slownie: "Podziel każdą wartość $y$ przez odpowiadającą jej wartość $x$. Jeśli wszystkie ilorazy są równe, to proporcjonalność jest prosta.",
          przyklad: "Dla par $(2,6)$, $(5,15)$, $(7,21)$ wszystkie ilorazy są równe $3$, więc $y=3x$. Dla par $(1,3)$ i $(2,5)$ ilorazy to $3$ i $\\frac{5}{2}$ – to nie jest proporcjonalność.",
          uwaga: "Samo to, że $y$ rośnie razem z $x$, nie wystarcza: zależność $y=x+1$ też rośnie, a nie jest proporcjonalna.",
        },
        {
          nazwa: "Obliczanie z proporcji",
          slownie: "Z jednej znanej pary $(x_1,y_1)$ oblicz współczynnik $a$. Potem $y=ax$ dla każdego $x$, a $x=\\frac{y}{a}$ dla każdego $y$.",
          tex: "a=\\frac{y_1}{x_1}\\qquad y_2=a\\cdot x_2",
          litery: "$(x_1,y_1)$ – znana para, $x_2$ – nowy argument, $y_2$ – szukana wartość.",
          przyklad: "Za $5$ kg zapłacono $35$ zł, więc $a=\\frac{35}{5}=7$. Za $8$ kg zapłacimy $7\\cdot 8=56$ zł.",
          uwaga: "Nie dodawaj tej samej liczby do $x$ i do $y$: gdy $x$ wzrasta z $5$ do $8$, to $y$ nie rośnie o $3$, tylko $\\frac{8}{5}$ raza.",
        },
        {
          nazwa: "Wykres proporcjonalności",
          slownie: "Wykresem funkcji $y=ax$ jest prosta przechodząca przez początek układu współrzędnych i przez punkt $(1,a)$.",
          tex: "y=ax\\qquad(0,0)\\qquad(1,a)",
          przyklad: "Wykres $y=-2x$ przechodzi przez punkty $(0,0)$ i $(1,-2)$.",
          uwaga: "Gdy $a<0$, wykres „schodzi w dół”: dla większych $x$ wartości $y$ są mniejsze.",
        },
      ],
      jak: [
        "Sprawdź, czy ilorazy $\\frac{y}{x}$ dla wszystkich par są równe.",
        "Oblicz współczynnik proporcjonalności $a=\\frac{y}{x}$ z jednej znanej pary.",
        "Zapisz wzór $y=ax$.",
        "Podstaw nowy argument (albo nową wartość $y$) i oblicz szukaną wielkość.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Wielkość $y$ jest wprost proporcjonalna do $x$, a dla $x=4$ mamy $y=10$. Współczynnik proporcjonalności jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{2}{5}$", "$6$", "$\\frac{5}{2}$", "$40$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "W której tabelce wielkość $y$ jest wprost proporcjonalna do $x$? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "$x$: $1, 2, 3$ oraz $y$: $3, 5, 7$",
            "$x$: $2, 4, 10$ oraz $y$: $3, 6, 15$",
            "$x$: $1, 2, 4$ oraz $y$: $2, 3, 5$",
            "$x$: $2, 3, 5$ oraz $y$: $6, 5, 3$",
          ],
          poprawna: 1,
        },
        {
          nr: "3",
          tresc: "Samochód jedzie ze stałą prędkością i w ciągu $2$ godzin przejeżdża $150$ km. Droga jest wprost proporcjonalna do czasu. W ciągu $5$ godzin samochód przejedzie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$153$ km", "$300$ km", "$750$ km", "$375$ km"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wykres funkcji $y=-3x$ przechodzi przez punkt $(0,0)$.", litery: "PF", poprawna: 0 },
            { tekst: "Wzór $y=2x+1$ opisuje proporcjonalność prostą.", litery: "PF", poprawna: 1 },
            { tekst: "Jeśli $y=\\frac{3}{4}x$, to dla $x=8$ mamy $y=6$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "5",
          tresc: "Wykres funkcji $y=ax$ przechodzi przez punkt $(3,-12)$. Wzór tej funkcji to: **Wybierz właściwą odpowiedź.**",
          opcje: ["$y=-4x$", "$y=4x$", "$y=-\\frac{1}{4}x$", "$y=x-15$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 3,
          tresc: "Za $6$ kg jabłek zapłacono $21$ zł. Cena jest wprost proporcjonalna do masy. Zapisz wzór opisujący, ile kosztuje $x$ kg jabłek, i oblicz, ile kosztuje $10$ kg oraz ile kilogramów można kupić za $42$ zł. **Zapisz obliczenia.**",
          rozwiazanie: "Cena jest wprost proporcjonalna do masy, więc $y=ax$, gdzie $x$ to masa w kg, a $y$ – cena w zł.\n\nWspółczynnik: $a=\\frac{21}{6}=3{,}5$, więc $y=3{,}5x$.\n\nDla $x=10$: $y=3{,}5\\cdot 10=35$.\n\nDla $y=42$: $3{,}5x=42$, więc $x=42:3{,}5=12$.\n\nOdpowiedź: $y=3{,}5x$; $10$ kg kosztuje $35$ zł; za $42$ zł kupimy $12$ kg.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Funkcja $f$ jest wprost proporcjonalnością, czyli $f(x)=ax$, i $f(-6)=15$. Oblicz $a$, wartość $f(10)$ oraz argument, dla którego funkcja przyjmuje wartość $-20$. **Zapisz obliczenia.**",
          rozwiazanie: "Z warunku $f(-6)=15$ mamy $a\\cdot(-6)=15$, więc $a=15:(-6)=-\\frac{5}{2}$.\n\nWzór: $f(x)=-\\frac{5}{2}x$.\n\n$f(10)=-\\frac{5}{2}\\cdot 10=-25$.\n\nRozwiązujemy $-\\frac{5}{2}x=-20$, więc $x=-20:\\left(-\\frac{5}{2}\\right)=8$.\n\nOdpowiedź: $a=-\\frac{5}{2}$, $f(10)=-25$, wartość $-20$ funkcja przyjmuje dla $x=8$.",
        },
      ],
      generatory: [
        {
          id: "proporcjonalnosc-wartosc",
          nazwa: "Wartość z proporcji",
          opis: "Znasz jedną parę wartości wielkości wprost proporcjonalnych – oblicz brakującą wartość $y$ albo brakujący argument $x$.",
          generuj(r) {
            const d = r.pick([1, 1, 2, 3, 4, 5]);
            const a = q(r.intBez(-9, 9, 0), d);
            const x1 = d * r.int(1, 6);
            const y1 = a.mul(x1).n;
            const szukamy = r.chance();   // true: szukamy y dla podanego x
            const wspolczynnik = `\\frac{${y1}}{${x1}}` === a.tex() ? `$a = ${a.tex()}$` : `$a = \\frac{${y1}}{${x1}} = ${a.tex()}$`;
            const pierwszy = `Wielkość $y$ jest wprost proporcjonalna do wielkości $x$. Dla $x = ${x1}$ mamy $y = ${y1}$.`;
            if (szukamy) {
              const x2 = r.intBez(1, 15, x1);
              const wynik = a.mul(x2);
              return {
                tresc: `${pierwszy} Oblicz $y$ dla $x = ${x2}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$y =$" }],
                odpowiedz: { w: wynik },
                wynik: `$y = ${wynik.tex()}$`,
                rozwiazanie: [
                  "Proporcjonalność prosta ma wzór $y = ax$, gdzie $a = \\frac{y}{x}$.",
                  `Współczynnik: ${wspolczynnik}.`,
                  `Dla $x = ${x2}$: $y = ${a.tex()}\\cdot ${x2} = ${wynik.tex()}$.`,
                ],
              };
            }
            const x2 = d * r.intBez(1, 8, x1 / d);
            const y2 = a.mul(x2).n;
            return {
              tresc: `${pierwszy} Dla jakiego $x$ wielkość $y$ jest równa $${y2}$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "$x =$" }],
              odpowiedz: { w: q(x2) },
              wynik: `$x = ${x2}$`,
              rozwiazanie: [
                "Proporcjonalność prosta ma wzór $y = ax$, gdzie $a = \\frac{y}{x}$.",
                `Współczynnik: ${wspolczynnik}.`,
                `Rozwiązujemy $${a.tex()}\\cdot x = ${y2}$, więc $x = ${y2} : ${texNawias(a)} = ${x2}$.`,
              ],
            };
          },
        },
        {
          id: "proporcjonalnosc-czy",
          nazwa: "Czy proporcjonalność",
          opis: "Z tabelki wartości rozstrzygnij, czy $y$ jest wprost proporcjonalne do $x$.",
          generuj(r) {
            const d = r.pick([1, 1, 2]);
            const xs = r.shuffle([1, 2, 3, 4, 5, 6, 7]).slice(0, 4).sort((p, s) => p - s).map((k) => k * d);
            const a = q(r.intBez(-6, 6, 0), d);
            let ys = xs.map((x) => a.mul(x).n);
            const prop = r.chance();
            if (!prop) {
              if (r.chance()) {
                const b = r.intBez(-6, 6, 0);
                ys = ys.map((y) => y + b);
              } else {
                const i = r.int(0, 3);
                ys[i] += r.pick([-2, -1, 1, 2]);
              }
            }
            const ilorazy = xs.map((x, i) => q(ys[i], x));
            const lista = xs.map((x, i) => `$\\frac{${ys[i]}}{${x}} = ${ilorazy[i].tex()}$`).join(", ");
            const rozne = ilorazy.find((v) => !v.eq(ilorazy[0]));
            return {
              tresc: `Dla $x = ${xs.join(", ")}$ wielkość $y$ przyjmuje odpowiednio wartości $${ys.join(", ")}$. Czy $y$ jest wprost proporcjonalne do $x$?`,
              pola: [{ id: "k", typ: "wybor", etykieta: "Odpowiedź", opcje: ["Tak", "Nie"] }],
              odpowiedz: { k: prop ? 0 : 1 },
              wynik: prop ? "Tak" : "Nie",
              rozwiazanie: [
                `Obliczamy ilorazy $\\frac{y}{x}$: ${lista}.`,
                prop
                  ? `Wszystkie ilorazy są równe $${a.tex()}$, więc $y = ${lin(a, 0)}$ – to proporcjonalność prosta.`
                  : `Ilorazy nie są równe (np. $${ilorazy[0].tex()}$ i $${rozne.tex()}$), więc to nie jest proporcjonalność prosta.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4.2
    {
      id: "wykres",
      nazwa: "Funkcja liniowa. Wykres i miejsce zerowe",
      sciaga: [
        {
          nazwa: "Funkcja liniowa",
          slownie: "Funkcja liniowa to funkcja o wzorze $f(x)=ax+b$, gdzie $a$ i $b$ są liczbami rzeczywistymi. Jej dziedziną jest zbiór wszystkich liczb rzeczywistych.",
          tex: "f(x)=ax+b",
          litery: "$a$ – współczynnik kierunkowy, $b$ – wyraz wolny, $x$ – argument.",
          przyklad: "Dla $f(x)=2x-3$ mamy $a=2$ i $b=-3$. Obliczamy $f(4)=2\\cdot 4-3=5$.",
          uwaga: "Znak należy do współczynnika: w $f(x)=2x-3$ jest $b=-3$, a nie $3$. Dla $a=0$ funkcja jest stała, a dla $b=0$ to proporcjonalność prosta.",
        },
        {
          nazwa: "Wykres funkcji liniowej",
          slownie: "Wykresem jest prosta. Do jej narysowania wystarczą dwa punkty. Wyraz wolny $b$ to druga współrzędna punktu przecięcia z osią $OY$.",
          tex: "f(x)=ax+b\\qquad(0,b)",
          przyklad: "Dla $f(x)=2x-3$: $f(0)=-3$ i $f(2)=1$, więc prosta przechodzi przez punkty $(0,-3)$ i $(2,1)$.",
          uwaga: "Wybieraj argumenty, dla których wartość łatwo obliczyć, np. $0$ i $1$.",
        },
        {
          nazwa: "Miejsce zerowe",
          slownie: "Miejsce zerowe to argument, dla którego $f(x)=0$, czyli punkt przecięcia wykresu z osią $OX$. Rozwiąż równanie $ax+b=0$.",
          tex: "ax+b=0\\qquad x_0=-\\frac{b}{a}",
          litery: "$a\\neq 0$ – współczynnik kierunkowy, $b$ – wyraz wolny.",
          przyklad: "Dla $f(x)=2x-3$: $2x-3=0$, więc $x_0=\\frac{3}{2}$. Wykres przecina oś $OX$ w punkcie $\\left(\\frac{3}{2},0\\right)$.",
          uwaga: "Uważaj na znak: dla $f(x)=2x-3$ jest $x_0=\\frac{3}{2}$, a nie $-\\frac{3}{2}$.",
        },
        {
          nazwa: "Punkt na wykresie",
          slownie: "Punkt $(p,k)$ leży na wykresie funkcji $f$ wtedy, gdy $f(p)=k$. Podstaw $p$ za $x$ i porównaj wynik z $k$. Gdy współrzędna jest nieznana, otrzymasz równanie.",
          przyklad: "Dla $f(x)=2x-3$ punkt $(4,5)$ należy do wykresu, bo $f(4)=5$. Punkt $(m,7)$ należy do wykresu, gdy $2m-3=7$, czyli $m=5$.",
          uwaga: "Pierwsza współrzędna to argument $x$, a druga to wartość $f(x)$ – nie odwrotnie.",
        },
      ],
      jak: [
        "Zapisz wzór w postaci $f(x)=ax+b$ i odczytaj $a$ oraz $b$ razem ze znakami.",
        "Miejsce zerowe: rozwiąż równanie $ax+b=0$.",
        "Punkt przecięcia z osią $OY$: oblicz $f(0)=b$.",
        "Czy punkt leży na wykresie: podstaw jego pierwszą współrzędną do wzoru i porównaj z drugą.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Miejscem zerowym funkcji $f(x)=3x-12$ jest liczba: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-4$", "$4$", "$-12$", "$\\frac{1}{4}$"],
          poprawna: 1,
        },
        {
          nr: "9",
          tresc: "Wykres funkcji $f(x)=-2x+5$ przecina oś $OY$ w punkcie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\left(\\frac{5}{2},0\\right)$", "$(0,-2)$", "$(5,0)$", "$(0,5)$"],
          poprawna: 3,
        },
        {
          nr: "10",
          tresc: "Punkt $P=(k,7)$ należy do wykresu funkcji $f(x)=2x-3$. Wtedy $k$ jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$", "$11$", "$5$", "$4$"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "Dana jest funkcja $f(x)=-3x+6$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Miejscem zerowym funkcji $f$ jest liczba $-2$.", litery: "PF", poprawna: 1 },
            { tekst: "Punkt $(1,3)$ należy do wykresu funkcji $f$.", litery: "PF", poprawna: 0 },
            { tekst: "Wykres funkcji $f$ przechodzi przez punkt $(0,-6)$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "12",
          tresc: "Miejscem zerowym funkcji $f(x)=-\\frac{2}{3}x+4$ jest liczba: **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$-6$", "$\\frac{8}{3}$", "$4$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 3,
          tresc: "Dana jest funkcja $f(x)=-4x+10$. Oblicz miejsce zerowe funkcji $f$, podaj współrzędne punktu przecięcia wykresu z osią $OY$ i sprawdź, czy punkt $(-1,14)$ należy do wykresu. **Zapisz obliczenia.**",
          rozwiazanie: "Miejsce zerowe: $-4x+10=0$, więc $-4x=-10$ i $x_0=\\frac{-10}{-4}=\\frac{5}{2}$.\n\nPunkt przecięcia z osią $OY$: $f(0)=10$, czyli punkt $(0,10)$.\n\nDla punktu $(-1,14)$ obliczamy $f(-1)=-4\\cdot(-1)+10=14$.\n\nWartość $f(-1)$ jest równa drugiej współrzędnej punktu, więc punkt należy do wykresu.\n\nOdpowiedź: $x_0=\\frac{5}{2}$, przecięcie z osią $OY$ w punkcie $(0,10)$, punkt $(-1,14)$ należy do wykresu.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Funkcja liniowa $f(x)=ax-6$ ma miejsce zerowe równe $\\frac{3}{2}$. Oblicz $a$ i sprawdź, czy punkt $(-2,-14)$ należy do wykresu tej funkcji. **Zapisz obliczenia.**",
          rozwiazanie: "Miejsce zerowe spełnia równanie $f\\left(\\frac{3}{2}\\right)=0$, więc $a\\cdot\\frac{3}{2}-6=0$.\n\nStąd $a\\cdot\\frac{3}{2}=6$ i $a=6:\\frac{3}{2}=4$.\n\nWzór: $f(x)=4x-6$.\n\n$f(-2)=4\\cdot(-2)-6=-14$, co jest równe drugiej współrzędnej punktu.\n\nOdpowiedź: $a=4$, punkt $(-2,-14)$ należy do wykresu.",
        },
      ],
      generatory: [
        {
          id: "wykres-miejsce-zerowe",
          nazwa: "Miejsce zerowe",
          opis: "Oblicz miejsce zerowe funkcji liniowej o danym wzorze.",
          generuj(r) {
            const a = q(r.intBez(-6, 6, 0), r.pick([1, 1, 1, 2, 3]));
            const b = r.intBez(-12, 12, 0);
            const x0 = q(-b).div(a);
            return {
              tresc: `Oblicz miejsce zerowe funkcji liniowej $f(x) = ${lin(a, b)}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "$x_0 =$" }],
              odpowiedz: { w: x0 },
              wynik: `$x_0 = ${x0.tex()}$`,
              rozwiazanie: [
                `Miejsce zerowe spełnia równanie $f(x) = 0$, czyli $${lin(a, b)} = 0$.`,
                `Przenosimy wyraz wolny na prawą stronę: $${lin(a, 0)} = ${-b}$.`,
                `Dzielimy przez współczynnik kierunkowy: $x = ${-b} : ${texNawias(a)} = ${x0.tex()}$.`,
              ],
            };
          },
        },
        {
          id: "wykres-wspolrzedna",
          nazwa: "Brakująca współrzędna",
          opis: "Punkt o jednej nieznanej współrzędnej leży na wykresie funkcji liniowej – oblicz tę współrzędną.",
          generuj(r) {
            const d = r.pick([1, 1, 2, 3]);
            const a = q(r.intBez(-5, 5, 0), d);
            const b = r.intBez(-9, 9, 0);
            const x = d * r.intBez(-4, 4, 0);
            const y = a.mul(x).add(b).n;
            const wzor = `f(x) = ${lin(a, b)}`;
            if (r.chance()) {
              return {
                tresc: `Punkt $P = (${x}, k)$ należy do wykresu funkcji $${wzor}$. Oblicz $k$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$k =$" }],
                odpowiedz: { w: q(y) },
                wynik: `$k = ${y}$`,
                rozwiazanie: [
                  `Punkt leży na wykresie, więc druga współrzędna jest wartością funkcji dla argumentu $${x}$: $k = f(${x})$.`,
                  `$k = ${texNawias(a)}\\cdot ${nw(x)} ${plusMinus(b)} = ${y}$.`,
                ],
              };
            }
            return {
              tresc: `Punkt $P = (k, ${y})$ należy do wykresu funkcji $${wzor}$. Oblicz $k$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "$k =$" }],
              odpowiedz: { w: q(x) },
              wynik: `$k = ${x}$`,
              rozwiazanie: [
                `Punkt leży na wykresie, więc $f(k) = ${y}$.`,
                `Podstawiamy do wzoru: $${lin(a, b, "k")} = ${y}$.`,
                `Przenosimy wyraz wolny: $${lin(a, 0, "k")} = ${y - b}$.`,
                `Dzielimy przez współczynnik: $k = ${y - b} : ${texNawias(a)} = ${x}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4.3
    {
      id: "wspolczynnik",
      nazwa: "Znaczenie współczynnika kierunkowego",
      sciaga: [
        {
          nazwa: "Monotoniczność funkcji liniowej",
          slownie: "O tym, czy funkcja liniowa jest rosnąca, malejąca czy stała, decyduje znak współczynnika kierunkowego $a$.",
          tex: "a>0\\text{ – rosnąca}\\qquad a<0\\text{ – malejąca}\\qquad a=0\\text{ – stała}",
          przyklad: "Funkcja $f(x)=-3x+1$ jest malejąca, bo $a=-3<0$. Funkcja $g(x)=\\frac{1}{2}x$ jest rosnąca, a $h(x)=7$ jest stała.",
          uwaga: "Wyraz wolny $b$ nie wpływa na monotoniczność.",
        },
        {
          nazwa: "Co oznacza współczynnik a",
          slownie: "Gdy argument $x$ zwiększymy o $1$, wartość funkcji zmienia się o $a$. Im większe $|a|$, tym bardziej stromy jest wykres.",
          tex: "f(x+1)-f(x)=a",
          przyklad: "Dla $f(x)=3x-1$: $f(1)=2$ i $f(2)=5$, więc wartość rośnie o $3$. Dla $g(x)=-2x$ przy każdym kroku o $1$ wartość maleje o $2$.",
          uwaga: "O stromości decyduje $|a|$: wykres dla $a=-5$ jest bardziej stromy niż dla $a=2$.",
        },
        {
          nazwa: "Proste równoległe",
          slownie: "Wykresy dwóch funkcji liniowych są równoległe, gdy mają równe współczynniki kierunkowe. Jeśli także wyrazy wolne są równe, wykresy się pokrywają.",
          tex: "y=a_1x+b_1\\qquad y=a_2x+b_2\\qquad a_1=a_2",
          litery: "$a_1$, $a_2$ – współczynniki kierunkowe obu prostych.",
          przyklad: "Proste $y=2x+1$ i $y=2x-5$ są równoległe. Prosta $y=-2x+1$ nie jest do nich równoległa.",
          uwaga: "Równoległość nie zależy od wyrazów wolnych.",
        },
        {
          nazwa: "Proste prostopadłe",
          slownie: "Wykresy są prostopadłe, gdy iloczyn ich współczynników kierunkowych jest równy $-1$. Współczynnik prostej prostopadłej to liczba odwrotna do $a$ ze zmienionym znakiem.",
          tex: "a_1\\cdot a_2=-1\\qquad a_2=-\\frac{1}{a_1}",
          przyklad: "Do prostej $y=2x+1$ prostopadła jest $y=-\\frac{1}{2}x+5$, bo $2\\cdot\\left(-\\frac{1}{2}\\right)=-1$. Do prostej $y=-\\frac{3}{4}x$ prostopadła ma $a=\\frac{4}{3}$.",
          uwaga: "Sama zmiana znaku nie wystarcza: liczby $2$ i $-2$ dają iloczyn $-4$, a nie $-1$. Trzeba jeszcze odwrócić ułamek.",
        },
      ],
      jak: [
        "Wyznacz współczynnik kierunkowy $a$ razem ze znakiem – także wtedy, gdy zawiera parametr.",
        "Monotoniczność: zbadaj znak $a$ (rozwiąż nierówność $a>0$ albo $a<0$).",
        "Równoległość: zapisz $a_1=a_2$. Prostopadłość: zapisz $a_1\\cdot a_2=-1$.",
        "Rozwiąż otrzymane równanie i sprawdź wynik, podstawiając go do wzoru.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Funkcja liniowa $f(x)=(3-m)x+2$ jest rosnąca dla: **Wybierz właściwą odpowiedź.**",
          opcje: ["$m>3$", "$m<3$", "$m>-3$", "$m<-3$"],
          poprawna: 1,
        },
        {
          nr: "16",
          tresc: "Wykres funkcji $f(x)=2x+5$ jest równoległy do wykresu funkcji: **Wybierz właściwą odpowiedź.**",
          opcje: ["$g(x)=-2x+5$", "$g(x)=\\frac{1}{2}x+5$", "$g(x)=2x-1$", "$g(x)=5x+2$"],
          poprawna: 2,
        },
        {
          nr: "17",
          tresc: "Prosta prostopadła do prostej $y=-4x+1$ ma równanie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$y=\\frac{1}{4}x-3$", "$y=-\\frac{1}{4}x+3$", "$y=4x-3$", "$y=-4x+3$"],
          poprawna: 0,
        },
        {
          nr: "18",
          tresc: "Dana jest funkcja $f(x)=-5x+2$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Funkcja $f$ jest malejąca.", litery: "PF", poprawna: 0 },
            { tekst: "Wykres funkcji $f$ przecina oś $OY$ w punkcie $(0,-5)$.", litery: "PF", poprawna: 1 },
            { tekst: "Wykres funkcji $f$ jest równoległy do wykresu funkcji $y=-5x-7$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "19",
          tresc: "Funkcja $f(x)=(k-2)x+4$ jest stała dla $k$ równego: **Wybierz właściwą odpowiedź.**",
          opcje: ["$0$", "$-2$", "$4$", "$2$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 3,
          tresc: "Dla jakich wartości parametru $m$ funkcja $f(x)=(2m+6)x-1$ jest rosnąca, dla jakich malejąca, a dla jakich stała? **Zapisz obliczenia.**",
          rozwiazanie: "O monotoniczności decyduje znak współczynnika kierunkowego $a=2m+6$.\n\nFunkcja jest rosnąca, gdy $2m+6>0$, czyli $2m>-6$ i $m>-3$.\n\nFunkcja jest malejąca, gdy $2m+6<0$, czyli $m<-3$.\n\nFunkcja jest stała, gdy $2m+6=0$, czyli $m=-3$ (wtedy $f(x)=-1$).\n\nOdpowiedź: rosnąca dla $m>-3$, malejąca dla $m<-3$, stała dla $m=-3$.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Dla jakiej wartości parametru $m$ prosta $y=(m+2)x+1$ jest a) równoległa do prostej $y=3x-4$, b) prostopadła do prostej $y=\\frac{1}{3}x-5$? **Zapisz obliczenia.**",
          rozwiazanie: "a) Proste są równoległe, gdy mają równe współczynniki kierunkowe: $m+2=3$, więc $m=1$. Wyrazy wolne są różne ($1$ i $-4$), więc proste nie pokrywają się.\n\nb) Proste są prostopadłe, gdy iloczyn współczynników kierunkowych jest równy $-1$: $(m+2)\\cdot\\frac{1}{3}=-1$.\n\nMnożymy przez $3$: $m+2=-3$, więc $m=-5$.\n\nOdpowiedź: a) $m=1$, b) $m=-5$.",
        },
      ],
      generatory: [
        {
          id: "wspolczynnik-parametr-m",
          nazwa: "Parametr m",
          opis: "Dwie proste mają być równoległe albo prostopadłe – oblicz parametr $m$ we współczynniku kierunkowym.",
          generuj(r) {
            const rown = r.chance();
            for (;;) {
              const p = r.pick([-3, -2, -1, 1, 2, 3]);
              const s = r.intBez(-6, 6, 0);
              const m = r.int(-5, 5);
              const a1 = p * m + s;
              if (a1 === 0 || Math.abs(a1) > 8) continue;
              const b1 = r.intBez(-6, 6, 0);
              const a2 = rown ? q(a1) : q(-1, a1);
              const b2 = rown ? r.intBez(-6, 6, b1) : r.intBez(-6, 6, 0);
              const wyr = lin(p, s, "m");
              const kroki = rown
                ? [`Proste są równoległe, gdy mają równe współczynniki kierunkowe: $${wyr} = ${a2.tex()}$.`]
                : [
                  `Proste są prostopadłe, gdy iloczyn ich współczynników kierunkowych jest równy $-1$: $(${wyr})\\cdot ${texNawias(a2)} = -1$.`,
                  `Stąd $${wyr} = ${a1}$.`,
                ];
              kroki.push(`Przenosimy wyraz wolny: $${lin(p, 0, "m")} = ${a1 - s}$.`);
              if (p !== 1) kroki.push(`Dzielimy przez współczynnik przy $m$: $m = ${a1 - s} : ${texNawias(p)} = ${m}$.`);
              return {
                tresc: `Proste o równaniach $y = (${wyr})x ${plusMinus(b1)}$ oraz $y = ${lin(a2, b2)}$ są ${rown ? "równoległe" : "prostopadłe"}. Oblicz $m$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$m =$" }],
                odpowiedz: { w: q(m) },
                wynik: `$m = ${m}$`,
                rozwiazanie: kroki,
              };
            }
          },
        },
        {
          id: "wspolczynnik-monotonicznosc",
          nazwa: "Rosnąca czy malejąca",
          opis: "Dla konkretnej wartości parametru $m$ rozstrzygnij, czy funkcja liniowa jest rosnąca, malejąca czy stała.",
          generuj(r) {
            const p = r.pick([-3, -2, -1, 1, 2, 3]);
            const stala = r.chance(0.3);
            const m = stala ? r.intBez(-5, 5, 0) : r.int(-5, 5);
            const s = stala ? -p * m : r.intBez(-6, 6, 0);
            const b = r.intBez(-6, 6, 0);
            const a = p * m + s;
            const wyr = lin(p, s, "m");
            const iloczyn = p === 1 ? String(m) : `${texNawias(p)}\\cdot ${nw(m)}`;
            const [slowo, indeks] = a > 0 ? ["rosnąca", 0] : a < 0 ? ["malejąca", 1] : ["stała", 2];
            return {
              tresc: `Dana jest funkcja $f(x) = (${wyr})x ${plusMinus(b)}$. Jaka jest ta funkcja dla $m = ${m}$?`,
              pola: [{ id: "k", typ: "wybor", etykieta: "Funkcja jest", opcje: ["rosnąca", "malejąca", "stała"] }],
              odpowiedz: { k: indeks },
              wynik: slowo,
              rozwiazanie: [
                `Dla $m = ${m}$ współczynnik kierunkowy wynosi $a = ${iloczyn} ${plusMinus(s)} = ${a}$.`,
                a === 0
                  ? "Skoro $a = 0$, funkcja jest stała."
                  : `Skoro $a ${a > 0 ? ">" : "<"} 0$, funkcja jest ${slowo}.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4.4
    {
      id: "wlasnosci",
      nazwa: "Własności funkcji liniowej – zadania różne",
      sciaga: [
        {
          nazwa: "Wzór prostej przez dwa punkty",
          slownie: "Z punktów $(x_1,y_1)$ i $(x_2,y_2)$ o różnych pierwszych współrzędnych oblicz najpierw $a$, a potem $b$, podstawiając jeden z punktów.",
          tex: "a=\\frac{y_2-y_1}{x_2-x_1}\\qquad b=y_1-ax_1",
          przyklad: "Dla $(1,3)$ i $(3,7)$: $a=\\frac{7-3}{3-1}=2$, $b=3-2\\cdot 1=1$, więc $f(x)=2x+1$.",
          uwaga: "Odejmuj współrzędne w tej samej kolejności w liczniku i w mianowniku: $\\frac{y_2-y_1}{x_2-x_1}$, a nie $\\frac{y_2-y_1}{x_1-x_2}$.",
        },
        {
          nazwa: "Prosta o danym a przez punkt",
          slownie: "Gdy znasz $a$ i punkt $(x_0,y_0)$ prostej, wstaw je do $y=ax+b$ i wyznacz $b$. Tak znajdziesz też prostą równoległą albo prostopadłą do danej, przechodzącą przez dany punkt.",
          tex: "b=y_0-ax_0",
          przyklad: "Prosta równoległa do $y=-2x+3$ przez $(1,5)$ ma $a=-2$ i $b=5-(-2)\\cdot 1=7$, czyli $y=-2x+7$. Prosta prostopadła ma $a=\\frac{1}{2}$ i $b=5-\\frac{1}{2}=\\frac{9}{2}$.",
          uwaga: "Dla prostej równoległej bierzemy ten sam $a$, a dla prostopadłej liczbę $-\\frac{1}{a}$.",
        },
        {
          nazwa: "Kiedy wartości są dodatnie",
          slownie: "Aby sprawdzić, dla jakich $x$ funkcja przyjmuje wartości dodatnie albo ujemne, rozwiąż nierówność $ax+b>0$ (albo $ax+b<0$). Pomaga miejsce zerowe i monotoniczność.",
          tex: "ax+b>0",
          przyklad: "Dla $f(x)=-2x+8$: $-2x+8>0$, więc $-2x>-8$, czyli $x<4$. Funkcja maleje i zeruje się w $4$, więc dla $x<4$ jej wartości są dodatnie.",
          uwaga: "Gdy mnożysz albo dzielisz nierówność przez liczbę ujemną, zmień zwrot nierówności.",
        },
        {
          nazwa: "Wzór z parametrem",
          slownie: "Jeśli punkt leży na wykresie funkcji o wzorze z parametrem $m$, podstaw współrzędne punktu do wzoru i rozwiąż równanie z niewiadomą $m$.",
          przyklad: "Wykres $f(x)=(m+1)x+3$ przechodzi przez $(2,9)$. Wtedy $(m+1)\\cdot 2+3=9$, więc $2m+2=6$ i $m=2$.",
          uwaga: "Po wyznaczeniu $m$ podstaw go do wzoru i sprawdź, czy punkt naprawdę leży na wykresie.",
        },
      ],
      jak: [
        "Zapisz szukany wzór w postaci $y=ax+b$.",
        "Ze współrzędnych dwóch punktów albo z warunku równoległości lub prostopadłości wyznacz $a$.",
        "Podstaw współrzędne jednego punktu i oblicz $b$.",
        "Sprawdź wynik na drugim punkcie.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Wykres funkcji liniowej przechodzi przez punkty $A=(1,2)$ i $B=(3,8)$. Wzór tej funkcji to: **Wybierz właściwą odpowiedź.**",
          opcje: ["$y=3x+1$", "$y=\\frac{1}{3}x+\\frac{5}{3}$", "$y=3x-1$", "$y=6x-4$"],
          poprawna: 2,
        },
        {
          nr: "23",
          tresc: "Funkcja liniowa $f$ spełnia warunki $f(-1)=7$ i $f(2)=-2$. Wzór funkcji $f$ to: **Wybierz właściwą odpowiedź.**",
          opcje: ["$f(x)=-3x+4$", "$f(x)=-3x-4$", "$f(x)=3x+10$", "$f(x)=-\\frac{1}{3}x+\\frac{20}{3}$"],
          poprawna: 0,
        },
        {
          nr: "24",
          tresc: "Prosta równoległa do prostej $y=-2x+3$ i przechodząca przez punkt $(1,5)$ ma równanie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$y=-2x+5$", "$y=-2x+3$", "$y=\\frac{1}{2}x+\\frac{9}{2}$", "$y=-2x+7$"],
          poprawna: 3,
        },
        {
          nr: "25",
          tresc: "Funkcja liniowa $f(x)=-2x+8$ przyjmuje wartości dodatnie dla: **Wybierz właściwą odpowiedź.**",
          opcje: ["$x>4$", "$x<4$", "$x>-4$", "$x<-4$"],
          poprawna: 1,
        },
        {
          nr: "26",
          tresc: "Wykres funkcji $f(x)=(m+1)x+3$ przechodzi przez punkt $(2,9)$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$m=2$", litery: "PF", poprawna: 0 },
            { tekst: "Funkcja $f$ jest malejąca.", litery: "PF", poprawna: 1 },
            { tekst: "Miejscem zerowym funkcji $f$ jest liczba $-1$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 3,
          tresc: "Wykres funkcji liniowej $f$ przechodzi przez punkty $A=(-2,-1)$ i $B=(4,8)$. Wyznacz wzór funkcji $f$ i oblicz jej miejsce zerowe. **Zapisz obliczenia.**",
          rozwiazanie: "Współczynnik kierunkowy: $a=\\frac{8-(-1)}{4-(-2)}=\\frac{9}{6}=\\frac{3}{2}$.\n\nWyraz wolny z punktu $B$: $b=8-\\frac{3}{2}\\cdot 4=8-6=2$.\n\nWzór: $f(x)=\\frac{3}{2}x+2$. Sprawdzenie dla $A$: $f(-2)=-3+2=-1$.\n\nMiejsce zerowe: $\\frac{3}{2}x+2=0$, więc $\\frac{3}{2}x=-2$ i $x=-2:\\frac{3}{2}=-\\frac{4}{3}$.\n\nOdpowiedź: $f(x)=\\frac{3}{2}x+2$, miejsce zerowe to $-\\frac{4}{3}$.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "Prosta $k$ ma równanie $y=\\frac{1}{2}x-3$. Wyznacz równanie prostej $l$ prostopadłej do prostej $k$ i przechodzącej przez punkt $P=(3,-4)$. Sprawdź, czy punkt $(-2,6)$ leży na prostej $l$. **Zapisz obliczenia.**",
          rozwiazanie: "Iloczyn współczynników kierunkowych prostych prostopadłych jest równy $-1$, więc dla prostej $l$ mamy $a=-1:\\frac{1}{2}=-2$.\n\nPunkt $P$ leży na prostej $l$: $-4=-2\\cdot 3+b$, więc $b=-4+6=2$.\n\nRównanie prostej $l$: $y=-2x+2$.\n\nDla punktu $(-2,6)$: $-2\\cdot(-2)+2=6$, więc punkt leży na prostej $l$.\n\nOdpowiedź: $l:\\ y=-2x+2$, punkt $(-2,6)$ leży na prostej $l$.",
        },
      ],
      generatory: [
        {
          id: "wlasnosci-dwa-punkty",
          nazwa: "Wzór przez dwa punkty",
          opis: "Wykres funkcji liniowej przechodzi przez dwa dane punkty – oblicz $a$ i $b$.",
          generuj(r) {
            const d = r.pick([1, 1, 2, 3]);
            const a = q(r.intBez(-5, 5, 0), d);
            const b = r.int(-9, 9);
            const k1 = r.int(-4, 4);
            const k2 = r.intBez(-4, 4, k1);
            const x1 = d * k1, x2 = d * k2;
            const y1 = a.mul(x1).add(b).n, y2 = a.mul(x2).add(b).n;
            const ulamek = `\\frac{${y2 - y1}}{${x2 - x1}}`;
            return {
              tresc: `Wykres funkcji liniowej $f(x) = ax + b$ przechodzi przez punkty $A = (${x1}, ${y1})$ i $B = (${x2}, ${y2})$. Oblicz $a$ i $b$.`,
              pola: [
                { id: "a", typ: "liczba", etykieta: "$a =$" },
                { id: "b", typ: "liczba", etykieta: "$b =$" },
              ],
              odpowiedz: { a, b: q(b) },
              wynik: `$f(x) = ${lin(a, b)}$`,
              rozwiazanie: [
                `Współczynnik kierunkowy: $a = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{${y2} - ${nw(y1)}}{${x2} - ${nw(x1)}} = ${ulamek}${ulamek === a.tex() ? "" : ` = ${a.tex()}`}$.`,
                `Wyraz wolny z punktu $A$: $b = y_1 - a x_1 = ${y1} - ${texNawias(a)}\\cdot ${nw(x1)} = ${b}$.`,
                `Zatem $f(x) = ${lin(a, b)}$.`,
              ],
            };
          },
        },
        {
          id: "wlasnosci-rownolegla-prostopadla",
          nazwa: "Prosta przez punkt",
          opis: "Znajdź równanie prostej równoległej albo prostopadłej do danej, przechodzącej przez dany punkt.",
          generuj(r) {
            const rown = r.chance();
            const a0 = q(r.intBez(-5, 5, 0), r.pick([1, 1, 2, 3]));
            const b0 = r.intBez(-8, 8, 0);
            const a = rown ? a0 : q(-1).div(a0);
            const x0 = a.d * r.intBez(-4, 4, 0);
            const y0 = r.int(-9, 9);
            const iloczyn = a.mul(x0);
            const b = q(y0).sub(iloczyn);
            return {
              tresc: `Prosta $k$ ma równanie $y = ${lin(a0, b0)}$. Prosta $l$ jest ${rown ? "równoległa" : "prostopadła"} do prostej $k$ i przechodzi przez punkt $P = (${x0}, ${y0})$. Zapisz równanie prostej $l$ w postaci $y = ax + b$ i podaj $a$ oraz $b$.`,
              pola: [
                { id: "a", typ: "liczba", etykieta: "$a =$" },
                { id: "b", typ: "liczba", etykieta: "$b =$" },
              ],
              odpowiedz: { a, b },
              wynik: `$y = ${lin(a, b)}$`,
              rozwiazanie: [
                rown
                  ? `Proste równoległe mają równe współczynniki kierunkowe, więc $a = ${a.tex()}$.`
                  : `Iloczyn współczynników kierunkowych prostych prostopadłych jest równy $-1$, więc $a = -1 : ${texNawias(a0)} = ${a.tex()}$.`,
                `Punkt $P$ leży na prostej $l$: $${y0} = ${texNawias(a)}\\cdot ${nw(x0)} + b$, stąd $b = ${y0} - ${texNawias(iloczyn)} = ${b.tex()}$.`,
                `Prosta $l$ ma równanie $y = ${lin(a, b)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4.5
    {
      id: "praktyczne",
      nazwa: "Zastosowanie funkcji liniowej w zadaniach praktycznych",
      sciaga: [
        {
          nazwa: "Model liniowy",
          slownie: "Zależność jest liniowa, gdy przy każdym kroku o $1$ wielkość zmienia się o tę samą liczbę. Wtedy opisuje ją wzór $y=ax+b$.",
          tex: "y=ax+b",
          litery: "$b$ – wartość początkowa (dla $x=0$), $a$ – stała zmiana na jednostkę (cena za sztukę, prędkość), $x$ – liczba jednostek.",
          przyklad: "Wypożyczenie roweru: $6$ zł opłaty stałej i $4$ zł za godzinę. Koszt $x$ godzin to $K(x)=4x+6$, więc za $3$ godziny zapłacimy $4\\cdot 3+6=18$ zł.",
          uwaga: "Gdy wielkość maleje (np. ubywa wody), współczynnik $a$ jest ujemny.",
        },
        {
          nazwa: "Jak ułożyć wzór",
          slownie: "Zapisz, co jest stałe (to będzie $b$), a co zależy od $x$ (to będzie $a\\cdot x$). Sprawdź wzór na jednej wartości z treści zadania.",
          przyklad: "W zbiorniku jest $120$ l wody i ubywa $5$ l na minutę: $V(t)=120-5t$. Po $4$ minutach zostaje $120-20=100$ l.",
          uwaga: "Pamiętaj o jednostkach i o dziedzinie: w zadaniach praktycznych $x$ nie bywa ujemne, a często musi być całkowite.",
        },
        {
          nazwa: "Wzór z dwóch pomiarów",
          slownie: "Gdy znasz wartości funkcji liniowej dla dwóch argumentów, oblicz $a$ jako iloraz przyrostów, a potem $b$ z jednego z punktów.",
          tex: "a=\\frac{y_2-y_1}{x_2-x_1}\\qquad b=y_1-ax_1",
          przyklad: "Za $1$ godz. zapłacono $34$ zł, a za $4$ godz. – $82$ zł: $a=\\frac{82-34}{4-1}=16$, $b=34-16\\cdot 1=18$, czyli $K(x)=16x+18$.",
          uwaga: "Współczynnik $a$ to cena za jednostkę, a $b$ – opłata stała. Nie myl ich ze sobą.",
        },
        {
          nazwa: "Porównanie dwóch ofert",
          slownie: "Aby sprawdzić, kiedy dwie oferty kosztują tyle samo, przyrównaj ich wzory i rozwiąż równanie. Potem porównaj oferty dla mniejszych i większych $x$.",
          tex: "a_1x+b_1=a_2x+b_2",
          przyklad: "Oferta A: $10+2x$, oferta B: $4x$. Z równania $10+2x=4x$ mamy $x=5$. Dla $x<5$ taniej jest w ofercie B, a dla $x>5$ w ofercie A.",
          uwaga: "Dla $x=5$ ceny są równe, więc żadna oferta nie jest wtedy tańsza.",
        },
      ],
      jak: [
        "Wskaż wielkość zależną $y$ i wielkość niezależną $x$ oraz ich jednostki.",
        "Znajdź wartość początkową $b$ i stałą zmianę $a$, zapisz wzór $y=ax+b$.",
        "Dane z zadania podstaw do wzoru i rozwiąż równanie albo oblicz wartość.",
        "Sprawdź, czy wynik ma sens (np. nie jest ujemny) i podaj odpowiedź z jednostką.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Za kurs taksówką płaci się $8$ zł opłaty początkowej oraz $3$ zł za każdy przejechany kilometr. Koszt przejazdu $x$ kilometrów opisuje wzór: **Wybierz właściwą odpowiedź.**",
          opcje: ["$K(x)=8x+3$", "$K(x)=11x$", "$K(x)=3x+8$", "$K(x)=\\frac{x}{3}+8$"],
          poprawna: 2,
        },
        {
          nr: "30",
          tresc: "W zbiorniku jest $90$ litrów wody. Z otwartego kranu wypływają z niego $3$ litry na minutę. Po $20$ minutach w zbiorniku zostanie: **Wybierz właściwą odpowiedź.**",
          opcje: ["$150$ l", "$87$ l", "$60$ l", "$30$ l"],
          poprawna: 3,
        },
        {
          nr: "31",
          tresc: "Temperatura wody wynosi na początku $15^\\circ$C i rośnie o $2^\\circ$C na minutę. Temperatura $45^\\circ$C zostanie osiągnięta po: **Wybierz właściwą odpowiedź.**",
          opcje: ["$15$ min", "$30$ min", "$22{,}5$ min", "$60$ min"],
          poprawna: 0,
        },
        {
          nr: "32",
          tresc: "Oferta A kosztuje $20$ zł plus $2$ zł za każdy gigabajt, a oferta B kosztuje stałe $40$ zł niezależnie od liczby gigabajtów. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Dla $12$ GB oferta A jest tańsza niż oferta B.", litery: "PF", poprawna: 1 },
            { tekst: "Dla $10$ GB obie oferty kosztują tyle samo.", litery: "PF", poprawna: 0 },
            { tekst: "Dla $5$ GB oferta A jest droższa niż oferta B.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "33",
          tresc: "Koszt $K$ usługi zależy liniowo od liczby godzin $x$. Za $2$ godziny zapłacono $50$ zł, a za $5$ godzin – $95$ zł. Opłata stała (wartość $K(0)$) jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$15$ zł", "$20$ zł", "$35$ zł", "$25$ zł"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 3,
          tresc: "Wypożyczalnia A pobiera $12$ zł opłaty stałej i $4$ zł za każdą godzinę wypożyczenia hulajnogi, a wypożyczalnia B – $6$ zł za godzinę bez opłaty stałej. Zapisz wzory kosztu wypożyczenia na $x$ godzin w obu wypożyczalniach i ustal, dla jakich $x$ oferta A jest tańsza. **Zapisz obliczenia.**",
          rozwiazanie: "Koszt w wypożyczalni A: $K_A(x)=4x+12$. Koszt w wypożyczalni B: $K_B(x)=6x$.\n\nOferta A jest tańsza, gdy $4x+12<6x$.\n\nPrzenosimy $4x$: $12<2x$, więc $x>6$.\n\nDla $x=6$ koszty są równe ($36$ zł), więc A jest tańsza dopiero powyżej $6$ godzin.\n\nOdpowiedź: $K_A(x)=4x+12$, $K_B(x)=6x$; oferta A jest tańsza dla $x>6$ godzin.",
        },
        {
          nr: "35",
          punkty: 3,
          tresc: "Zbiornik zawiera $200$ litrów wody. Po otwarciu kranu woda wypływa z niego równomiernie, $8$ litrów na minutę. Zapisz wzór na ilość wody $V$ w zbiorniku po $t$ minutach, oblicz, po ilu minutach w zbiorniku zostanie $56$ litrów, i po ilu minutach zbiornik będzie pusty. **Zapisz obliczenia.**",
          rozwiazanie: "Na początku jest $200$ l, a co minutę ubywa $8$ l, więc $V(t)=200-8t$.\n\nZ warunku $V(t)=56$: $200-8t=56$, więc $8t=144$ i $t=18$.\n\nZbiornik jest pusty, gdy $V(t)=0$: $200-8t=0$, więc $t=25$.\n\nOdpowiedź: $V(t)=200-8t$; $56$ litrów zostanie po $18$ minutach; zbiornik opróżni się po $25$ minutach.",
        },
      ],
      generatory: [
        {
          id: "praktyczne-wartosc",
          nazwa: "Koszt albo ilość",
          opis: "Wzór liniowy w zadaniu z życia (taksówka, rower, abonament, zbiornik) – oblicz wartość dla danego $x$ albo $x$ dla danej wartości.",
          generuj(r) {
            const k = r.pick(KONTEKSTY);
            const a = r.int(2, 9);
            const x = r.int(2, 14);
            const b = k.rosnaca ? 5 * r.int(1, 12) : a * r.int(15, 20) + r.int(0, 10);
            const znak = k.rosnaca ? 1 : -1;
            const wartosc = b + znak * a * x;
            const wzor = k.rosnaca ? `${k.f}(x) = ${a}x + ${b}` : `${k.f}(x) = ${b} - ${a}x`;
            if (r.chance()) {
              return {
                tresc: `${k.opis(b, a)} ${k.pytA(x)}`,
                pola: [{ id: "w", typ: "liczba", etykieta: k.etWynik }],
                odpowiedz: { w: q(wartosc) },
                wynik: `$${wartosc}$ ${k.jednostkaWyniku}`,
                rozwiazanie: [
                  `Zapisujemy wzór: $${wzor}$, gdzie $x$ to liczba jednostek (${k.jednostka}).`,
                  `Dla $x = ${x}$: $${k.f}(${x}) = ${k.rosnaca ? `${a}\\cdot ${x} + ${b}` : `${b} - ${a}\\cdot ${x}`} = ${wartosc}$.`,
                ],
              };
            }
            return {
              tresc: `${k.opis(b, a)} ${k.pytB(wartosc)}`,
              pola: [{ id: "w", typ: "liczba", etykieta: k.etArg }],
              odpowiedz: { w: q(x) },
              wynik: `$${x}$ ${k.jednostka}`,
              rozwiazanie: [
                `Zapisujemy wzór: $${wzor}$, gdzie $x$ to liczba jednostek (${k.jednostka}).`,
                `Rozwiązujemy równanie $${k.rosnaca ? `${a}x + ${b}` : `${b} - ${a}x`} = ${wartosc}$.`,
                `Przenosimy wyraz wolny: $${a}x = ${k.rosnaca ? wartosc - b : b - wartosc}$.`,
                `Stąd $x = ${x}$.`,
              ],
            };
          },
        },
        {
          id: "praktyczne-porownanie",
          nazwa: "Porównanie ofert",
          opis: "Dwie oferty o kosztach liniowych – oblicz, po ilu godzinach kosztują tyle samo.",
          generuj(r) {
            const a1 = r.int(1, 6);
            const roznica = r.int(1, 4);
            const a2 = a1 + roznica;
            const x0 = r.int(3, 15);
            const b2 = 5 * r.int(1, 8);
            const b1 = b2 + roznica * x0;
            return {
              tresc: `Wypożyczalnia sprzętu ma dwie oferty. W ofercie A płaci się $${b1}$ zł opłaty stałej i $${a1}$ zł za każdą godzinę, a w ofercie B – $${b2}$ zł opłaty stałej i $${a2}$ zł za każdą godzinę. Po ilu godzinach wypożyczenia obie oferty kosztują tyle samo?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba godzin" }],
              odpowiedz: { w: q(x0) },
              wynik: `$${x0}$ godz.`,
              rozwiazanie: [
                `Koszt w ofercie A: $${lin(a1, b1)}$, w ofercie B: $${lin(a2, b2)}$, gdzie $x$ to liczba godzin.`,
                `Przyrównujemy koszty: $${lin(a1, b1)} = ${lin(a2, b2)}$.`,
                `Przenosimy niewiadome na jedną stronę, a liczby na drugą: $${b1} - ${b2} = ${lin(a2, 0)} - ${lin(a1, 0)}$, czyli $${b1 - b2} = ${lin(roznica, 0)}$.`,
                roznica === 1 ? `Stąd $x = ${x0}$.` : `Stąd $x = ${b1 - b2} : ${roznica} = ${x0}$.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
