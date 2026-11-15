// Klasa 5 (szkoła podstawowa) · rozdział IV „Ułamki dziesiętne” – Matematyka z kluczem 5 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)
// Ułamek dziesiętny trzymamy jako liczbę całkowitą n i liczbę miejsc po przecinku p: wartość to n / 10^p.

/** Liczba całkowita do zapisu w $…$: od pięciu cyfr z małą spacją między tysiącami (12\,345). */
const T = (n) => (n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : String(n));

const cyfry = (n) => String(n).split("").map(Number);

/** n/10^p z przecinkiem i wszystkimi p miejscami po przecinku (np. fixed(305, 2) = "3{,}05", fixed(370, 2) = "3{,}70"). */
function fixed(n, p) {
  const s = String(n).padStart(p + 1, "0");
  const cal = Number(p ? s.slice(0, -p) : s);
  return p ? `${T(cal)}{,}${s.slice(-p)}` : T(cal);
}

/** To samo, ale bez zer na końcu części ułamkowej (ds(370, 2) = "3{,}7", ds(300, 2) = "3"). */
function ds(n, p) {
  while (p > 0 && n % 10 === 0) {
    n /= 10;
    p--;
  }
  return fixed(n, p);
}

/** Liczba miejsc po przecinku po skreśleniu zer na końcu. */
function miejscaPo(n, p) {
  while (p > 0 && n % 10 === 0) {
    n /= 10;
    p--;
  }
  return p;
}

const qd = (n, p) => q(n, 10 ** p);

const MIEJSCE = { "-4": "dziesięciotysięczne", "-3": "tysięczne", "-2": "setne", "-1": "dziesiąte", 0: "jedności", 1: "dziesiątki", 2: "setki", 3: "tysiące", 4: "dziesiątki tysięcy" };
/** Nazwa miejsca dla kolumny i (od prawej), gdy po przecinku jest p miejsc: „Setne”, „Jedności”… */
function miejsce(i, p) {
  const s = MIEJSCE[i - p];
  return s[0].toUpperCase() + s.slice(1);
}

/** „jedno miejsce”, „dwa miejsca”… */
const miejsc = (k) => ["zero miejsc", "jedno miejsce", "dwa miejsca", "trzy miejsca", "cztery miejsca"][k];

/** Liczba z p miejscami po przecinku, nie więcej niż `cyfr` cyfr, ostatnia cyfra po przecinku różna od zera. */
function los(r, p, cyfr, min = 2, max = 10 ** cyfr - 1) {
  for (;;) {
    const n = r.int(min, max);
    if (p === 0 || n % 10 !== 0) return n;
  }
}

/** Wyrównanie liczb do wspólnej liczby miejsc po przecinku; zwraca { A, B, p, opis }. */
function rownaj(a, b) {
  const p = Math.max(a.p, b.p);
  const A = a.n * 10 ** (p - a.p), B = b.n * 10 ** (p - b.p);
  const zera = [];
  if (a.p < p) zera.push(`$${ds(a.n, a.p)} = ${fixed(A, p)}$`);
  if (b.p < p) zera.push(`$${ds(b.n, b.p)} = ${fixed(B, p)}$`);
  const opis = `Piszemy liczby jedna pod drugą, przecinek pod przecinkiem.${zera.length ? ` Dopisujemy zera, żeby obie liczby miały tyle samo miejsc po przecinku: ${zera.join(" i ")}.` : ""}`;
  return { A, B, p, opis };
}

/** Dodawanie pisemne kolumnami: kroki rozwiązania (A i B mają tyle samo miejsc po przecinku p). */
function krokiDodaj(A, B, p) {
  const a = cyfry(A).reverse(), b = cyfry(B).reverse();
  const len = Math.max(a.length, b.length);
  const kroki = [];
  let c = 0;
  for (let i = 0; i < len; i++) {
    const x = a[i] ?? 0, y = b[i] ?? 0, s = x + y + c;
    kroki.push(`${miejsce(i, p)}: $${x} + ${y}${c ? ` + ${c}` : ""} = ${s}$, piszę $${s % 10}$${s >= 10 ? " i pamiętam $1$" : ""}.`);
    c = s >= 10 ? 1 : 0;
  }
  if (c) kroki[kroki.length - 1] += " Zapamiętaną $1$ piszę w następnej kolumnie.";
  kroki[kroki.length - 1] += ` Wynik: $${fixed(A + B, p)}$ (przecinek stawiamy pod przecinkami).`;
  return kroki;
}

/** Odejmowanie pisemne kolumnami (A > B, ta sama liczba miejsc po przecinku p). */
function krokiOdejmij(A, B, p) {
  const a = cyfry(A).reverse(), b = cyfry(B).reverse();
  const kroki = [];
  let poz = 0;
  for (let i = 0; i < a.length; i++) {
    const x = a[i], y = b[i] ?? 0;
    const pozycz = x - poz < y ? 1 : 0;
    const gora = x + 10 * pozycz;
    const wyn = gora - poz - y;
    kroki.push(`${miejsce(i, p)}: $${gora}${poz ? " - 1" : ""} - ${y} = ${wyn}$${poz ? " (minus $1$, bo wcześniej pożyczyliśmy)" : ""}${pozycz ? ", pożyczam $1$ z kolumny po lewej" : ""}.`);
    poz = pozycz;
  }
  kroki[kroki.length - 1] += ` Wynik: $${fixed(A - B, p)}$. Sprawdzenie: $${fixed(A - B, p)} + ${fixed(B, p)} = ${fixed(A, p)}$.`;
  return kroki;
}

/** Mnożenie liczb a = {n, p} i b = {n, p}: kroki i wynik {n, p}. */
function krokiMnoz(a, b) {
  const N = a.n * b.n, P = a.p + b.p;
  const wynik = fixed(N, P);
  const sk = ds(N, P);
  return {
    kroki: [
      `Mnożymy tak, jakby nie było przecinków: $${a.n} \\cdot ${b.n} = ${T(N)}$.`,
      `Liczymy miejsca po przecinku w obu czynnikach: $${a.p} + ${b.p} = ${P}$.`,
      `Wynik ma mieć ${miejsc(P)} po przecinku${String(N).length <= P ? " (brakujące cyfry uzupełniamy zerami z przodu)" : ""}: $${wynik}$${sk !== wynik ? `, czyli $${sk}$` : ""}.`,
    ],
    n: N,
    p: P,
  };
}

const IMIONA = [["Ola", "kupiła", "zapłaciła"], ["Kuba", "kupił", "zapłacił"], ["Ania", "kupiła", "zapłaciła"], ["Tomek", "kupił", "zapłacił"]];

export default {
  tematy: [
    // ------------------------------------------------------------------------------------------------
    {
      id: "ulamek-dziesietny",
      nazwa: "Ułamek dziesiętny",
      sciaga: [
        {
          nazwa: "Zapis ułamka dziesiętnego",
          slownie: "Cyfry przed przecinkiem to całości. Pierwsza cyfra po przecinku to dziesiąte części, druga to setne, a trzecia to tysięczne.",
          tex: "5{,}37=5+\\frac{3}{10}+\\frac{7}{100}",
          litery: "W liczbie $5{,}37$ cyfra $3$ to dziesiąte części, a cyfra $7$ to setne części.",
          przyklad: "W liczbie $12{,}845$ cyfra $8$ to dziesiąte, $4$ to setne, $5$ to tysięczne. Czytamy: dwanaście i osiemset czterdzieści pięć tysięcznych.",
          uwaga: "W liczbie $0{,}7$ cyfra $7$ oznacza siedem dziesiątych, a nie siedem całości.",
        },
        {
          nazwa: "Ułamek dziesiętny i zwykły",
          slownie: "Ułamek dziesiętny to inny zapis ułamka zwykłego o mianowniku $10$, $100$ albo $1000$. Tyle miejsc po przecinku, ile zer w mianowniku.",
          tex: "0{,}7=\\frac{7}{10}\\qquad 0{,}25=\\frac{25}{100}\\qquad 0{,}045=\\frac{45}{1000}",
          przyklad: "$2{,}3 = 2\\frac{3}{10}$. Dalej: $0{,}25 = \\frac{25}{100} = \\frac{1}{4}$, bo skracamy przez $25$.",
          uwaga: "$0{,}05$ to $\\frac{5}{100}$, a nie $\\frac{5}{10}$. Dwa miejsca po przecinku, więc w mianowniku jest $100$.",
        },
        {
          nazwa: "Ułamek zwykły na dziesiętny",
          slownie: "Rozszerz ułamek tak, żeby w mianowniku było $10$, $100$ albo $1000$. Potem zapisz go z przecinkiem. W liczbie mieszanej całości po prostu przepisz.",
          tex: "\\frac{3}{4}=\\frac{75}{100}=0{,}75",
          przyklad: "$\\frac{7}{20} = \\frac{35}{100} = 0{,}35$. Dalej: $\\frac{3}{8} = \\frac{375}{1000} = 0{,}375$ (rozszerzamy przez $125$) i $4\\frac{1}{2} = 4{,}5$. Warto pamiętać: $\\frac{1}{2} = 0{,}5$, $\\frac{1}{4} = 0{,}25$, $\\frac{3}{4} = 0{,}75$, $\\frac{1}{5} = 0{,}2$.",
          uwaga: "Nie każdy ułamek da się tak zapisać. Z $\\frac{1}{3}$ nie zrobimy mianownika $100$. Takimi ułamkami na razie się nie zajmujemy.",
        },
        {
          nazwa: "Porównywanie ułamków dziesiętnych",
          slownie: "Najpierw porównaj całości. Gdy są równe, porównuj cyfry po przecinku po kolei: dziesiąte, potem setne, potem tysięczne. Zera na końcu można dopisać i liczba się nie zmienia.",
          tex: "0{,}7=0{,}70=0{,}700",
          przyklad: "$3{,}49 < 3{,}5$, bo $3{,}5 = 3{,}50$, a $49$ setnych to mniej niż $50$ setnych. Od najmniejszej: $0{,}08 < 0{,}78 < 0{,}8$.",
          uwaga: "$0{,}25$ nie jest większe od $0{,}3$ tylko dlatego, że $25 > 3$. Dopisz zero: $0{,}25$ i $0{,}30$. Większe jest $0{,}30$.",
        },
      ],
      jak: [
        "Policz miejsca po przecinku. To mówi, jaki będzie mianownik: jedno miejsce to $10$, dwa miejsca to $100$, trzy to $1000$.",
        "Zamieniając ułamek zwykły na dziesiętny, rozszerz go do mianownika $10$, $100$ albo $1000$ i zapisz z przecinkiem.",
        "Porównując, dopisz zera, żeby obie liczby miały tyle samo miejsc po przecinku.",
        "Porównuj od lewej: najpierw całości, potem dziesiąte, setne i tysięczne.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Jaka cyfra stoi na miejscu setnych w liczbie $36{,}418$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$1$", "$8$", "$6$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Ułamek $\\frac{9}{100}$ zapisany w postaci dziesiętnej to: **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}9$", "$0{,}009$", "$9{,}1$", "$0{,}09$"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "Ułamek $\\frac{3}{4}$ zapisany w postaci dziesiętnej to: **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}75$", "$0{,}34$", "$0{,}25$", "$3{,}4$"],
          poprawna: 0,
        },
        {
          nr: "4",
          tresc: "Która z liczb jest największa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}6$", "$0{,}59$", "$0{,}611$", "$0{,}06$"],
          poprawna: 2,
        },
        {
          nr: "5",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$4{,}5 = 4\\frac{1}{2}$", litery: "PF", poprawna: 0 },
            { tekst: "$0{,}07 = \\frac{7}{10}$", litery: "PF", poprawna: 1 },
            { tekst: "$1{,}3 < 1{,}29$", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "W konkursie skoku w dal Ala skoczyła $3{,}2$ m, Bartek $3{,}19$ m, Celina $3\\frac{1}{4}$ m, a Darek $3{,}205$ m. Ustaw uczestników od tego, kto skoczył najkrócej, do tego, kto skoczył najdalej. **Zapisz obliczenia.**",
          rozwiazanie: "Zapisujemy wynik Celiny jako ułamek dziesiętny: $3\\frac{1}{4} = 3\\frac{25}{100} = 3{,}25$.\n\nDopisujemy zera, żeby wszystkie liczby miały po trzy miejsca po przecinku: $3{,}200$, $3{,}190$, $3{,}250$, $3{,}205$.\n\nPorównujemy: $3{,}190 < 3{,}200 < 3{,}205 < 3{,}250$.\n\nOdpowiedź: Od najkrótszego skoku: Bartek, Ala, Darek, Celina.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Zapisz liczby $0{,}35$ i $2{,}04$ w postaci ułamka zwykłego albo liczby mieszanej. Skróć ułamki. **Zapisz obliczenia.**",
          rozwiazanie: "Liczba $0{,}35$ ma dwa miejsca po przecinku, więc mianownik to $100$: $0{,}35 = \\frac{35}{100}$.\n\nSkracamy przez $5$: $\\frac{35}{100} = \\frac{7}{20}$.\n\nLiczba $2{,}04$: całości zostają, a $0{,}04 = \\frac{4}{100} = \\frac{1}{25}$.\n\nOdpowiedź: $0{,}35 = \\frac{7}{20}$ oraz $2{,}04 = 2\\frac{1}{25}$.",
        },
      ],
      generatory: [
        {
          id: "zamiana-ulamkow",
          nazwa: "Zamiana ułamków",
          opis: "Zamień ułamek dziesiętny na zwykły albo ułamek zwykły (też liczbę mieszaną) na dziesiętny.",
          generuj(r) {
            if (r.chance(0.45)) {
              const p = r.int(1, 3);
              const n = los(r, p, p, 1);
              const x = qd(n, p), mian = 10 ** p;
              const kroki = [
                `Liczba $${fixed(n, p)}$ ma ${miejsc(p)} po przecinku, więc w mianowniku piszemy $${mian}$.`,
                `W liczniku piszemy cyfry po przecinku: $${fixed(n, p)} = \\frac{${n}}{${mian}}$.`,
              ];
              if (x.d !== mian) kroki.push(`Skracamy ułamek: $\\frac{${n}}{${mian}} = ${x.tex()}$.`);
              return {
                tresc: r.pick([`Zapisz ułamek dziesiętny $${fixed(n, p)}$ w postaci ułamka zwykłego. Skróć go, jeśli się da.`, `Zamień $${fixed(n, p)}$ na ułamek zwykły i skróć go, jeśli to możliwe.`]),
                pola: [{ id: "w", typ: "liczba", etykieta: "Ułamek zwykły (wpisz jako licznik/mianownik)" }],
                odpowiedz: { w: x },
                wynik: `$${x.tex()}$`,
                rozwiazanie: kroki,
              };
            }
            const d = r.pick([2, 4, 5, 8, 20, 25, 50]);
            const n = r.int(1, d - 1);
            const w = r.chance(0.35) ? r.int(1, 9) : 0;
            let m = 1;
            while (10 ** m % d !== 0) m++;
            const mult = 10 ** m / d, N = n * mult, razem = w * 10 ** m + N;
            const zap = `${w ? w : ""}\\frac{${n}}{${d}}`;
            return {
              tresc: r.pick([`Zapisz $${zap}$ w postaci ułamka dziesiętnego.`, `Zamień $${zap}$ na ułamek dziesiętny.`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Ułamek dziesiętny" }],
              odpowiedz: { w: q(w * d + n, d) },
              wynik: `$${ds(razem, m)}$`,
              rozwiazanie: [
                `Szukamy liczby, przez którą pomnożymy mianownik, żeby dostać $${10 ** m}$: $${d} \\cdot ${mult} = ${10 ** m}$.`,
                `Tę samą liczbę mnożymy w liczniku: $\\frac{${n}}{${d}} = \\frac{${n} \\cdot ${mult}}{${d} \\cdot ${mult}} = \\frac{${N}}{${10 ** m}}$.`,
                `Zapisujemy z przecinkiem${w ? ` (całości $${w}$ po prostu przepisujemy)` : ""}: $${ds(razem, m)}$.`,
              ],
            };
          },
        },
        {
          id: "porownaj-dziesietne",
          nazwa: "Porównaj liczby",
          opis: "Wstaw znak $<$, $=$ lub $>$ między dwoma ułamkami dziesiętnymi albo między ułamkiem zwykłym a dziesiętnym.",
          generuj(r) {
            const ZN = ["<", "=", ">"];
            let A3, B3, TA, TB;
            let wstep = null;
            const typ = r.int(0, 4);
            if (typ === 0) {
              const k = r.int(1, 2), i = r.int(0, 9);
              const X = i * 10 ** k + los(r, k, k, 1);
              A3 = B3 = X * 10 ** (3 - k);
              TA = fixed(X, k);
              TB = fixed(X * 10, k + 1);
            } else if (typ === 1) {
              const i = r.int(0, 9), t = r.int(2, 9), u = r.int(5, 9);
              A3 = (i * 10 + t) * 100;
              B3 = (i * 100 + (t - 1) * 10 + u) * 10;
              TA = fixed(i * 10 + t, 1);
              TB = fixed(i * 100 + (t - 1) * 10 + u, 2);
            } else if (typ === 2) {
              A3 = los(r, 3, 4, 101);
              B3 = los(r, 3, 4, 101);
              TA = ds(A3, 3);
              TB = ds(B3, 3);
            } else if (typ === 3) {
              const i = r.int(0, 8);
              A3 = i * 1000 + los(r, 3, 3, 11);
              B3 = A3 + r.pick([-1, 1]) * r.pick([1, 10, 100]) * r.int(1, 9);
              if (B3 < 1000 * i || B3 % 10 === 0 && r.chance(0.5)) B3 = A3 + r.pick([1, 10, 100]);
              TA = ds(A3, 3);
              TB = ds(B3, 3);
            } else {
              const [fn, fd] = r.pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [7, 10], [1, 20], [3, 20], [9, 20], [3, 25], [7, 25]]);
              const n100 = (fn * 100) / fd;
              const b100 = Math.min(99, Math.max(1, n100 + r.pick([-10, -5, -1, 0, 0, 1, 5, 10])));
              A3 = n100 * 10;
              B3 = b100 * 10;
              TA = `\\frac{${fn}}{${fd}}`;
              TB = ds(B3, 3);
              wstep = `$${TA} = ${ds(A3, 3)}$ (rozszerzamy ułamek do mianownika $10$ albo $100$).`;
            }
            if (r.chance(0.5)) [A3, B3, TA, TB] = [B3, A3, TB, TA];
            const wyn = A3 < B3 ? 0 : A3 === B3 ? 1 : 2;
            const da = ds(A3, 3), db = ds(B3, 3);
            const P = Math.max(miejscaPo(A3, 3), miejscaPo(B3, 3), 1);
            const A1 = A3 / 10 ** (3 - P), B1 = B3 / 10 ** (3 - P);
            const sa = String(A1).padStart(P + 1, "0"), sb = String(B1).padStart(P + 1, "0");
            const kroki = [];
            if (wstep) kroki.push(wstep);
            if (miejscaPo(A3, 3) !== miejscaPo(B3, 3)) kroki.push(`Dopisujemy zera, żeby obie liczby miały po ${P === 1 ? "jednym miejscu" : `${P} miejsca`} po przecinku: $${fixed(A1, P)}$ i $${fixed(B1, P)}$.`);
            let j = 0;
            while (j < sa.length && sa[j] === sb[j]) j++;
            if (j === sa.length) {
              kroki.push(`Wszystkie cyfry są takie same, więc liczby są równe.`);
            } else {
              const nazwa = j === 0 ? "całości" : ["dziesiąte", "setne", "tysięczne"][j - 1];
              kroki.push(`Porównujemy cyfry od lewej. Pierwsza różnica jest na miejscu: ${nazwa}. Mamy tam $${sa[j]}$ i $${sb[j]}$, a $${sa[j]} ${sa[j] < sb[j] ? "<" : ">"} ${sb[j]}$.`);
            }
            kroki.push(`Zatem $${TA} ${ZN[wyn]} ${TB}$.`);
            return {
              tresc: r.pick([`Porównaj liczby $${TA}$ i $${TB}$. Jaki znak należy wstawić między nie?`, `Jaki znak ($<$, $=$ albo $>$) trzeba wstawić między $${TA}$ i $${TB}$?`]),
              pola: [{ id: "w", typ: "wybor", etykieta: "Znak", opcje: ["$<$", "$=$", "$>$"] }],
              odpowiedz: { w: wyn },
              wynik: `$${TA} ${ZN[wyn]} ${TB}$`,
              rozwiazanie: kroki,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "dodawanie-odejmowanie",
      nazwa: "Dodawanie i odejmowanie ułamków dziesiętnych",
      sciaga: [
        {
          nazwa: "Dodawanie pisemne",
          slownie: "Piszemy liczby jedna pod drugą tak, żeby przecinek stał pod przecinkiem. Dodajemy kolumnami od prawej, jak liczby naturalne. Przecinek w wyniku piszemy pod przecinkami.",
          tex: "\\begin{array}{r}12{,}45\\\\ +\\ 3{,}70\\\\ \\hline 16{,}15\\end{array}",
          przyklad: "$12{,}45 + 3{,}7$: dopisuję zero, $3{,}7 = 3{,}70$. Setne: $5 + 0 = 5$. Dziesiąte: $4 + 7 = 11$, piszę $1$ i pamiętam $1$. Jedności: $2 + 3 + 1 = 6$. Dziesiątki: $1$. Wynik: $16{,}15$.",
          uwaga: "Nie dodawaj „pod spodem” cyfr o różnych wartościach. Nie wolno dodać $0{,}6$ do setnych z drugiej liczby.",
        },
        {
          nazwa: "Odejmowanie pisemne",
          slownie: "Też piszemy przecinek pod przecinkiem. Gdy na górze jest mniejsza cyfra niż na dole, pożyczamy $1$ z sąsiedniej kolumny po lewej. Wynik sprawdzamy dodawaniem.",
          tex: "\\begin{array}{r}5{,}00\\\\ -\\ 2{,}35\\\\ \\hline 2{,}65\\end{array}",
          przyklad: "$5 - 2{,}35$: zapisuję $5 = 5{,}00$. Setne: $10 - 5 = 5$ (pożyczka). Dziesiąte: $10 - 1 - 3 = 6$ (znów pożyczka). Jedności: $5 - 1 - 2 = 2$. Wynik: $2{,}65$. Sprawdzenie: $2{,}65 + 2{,}35 = 5$.",
          uwaga: "Od większej liczby odejmujemy mniejszą. Nie zamieniaj miejscami cyfr w kolumnie, np. $4 - 9$ nie daje $5$.",
        },
        {
          nazwa: "Dopisywanie zer",
          slownie: "Zera na końcu części po przecinku nie zmieniają liczby. Dopisz je, żeby obie liczby miały tyle samo miejsc po przecinku. Liczbę naturalną zapisz z przecinkiem i zerami.",
          tex: "7=7{,}0=7{,}00\\qquad 2{,}5=2{,}50",
          przyklad: "$3{,}6 + 4{,}75$: zapisuję $3{,}6 = 3{,}60$. Wtedy $3{,}60 + 4{,}75 = 8{,}35$. Liczba naturalna: $10 - 3{,}45$, więc $10 = 10{,}00$.",
          uwaga: "Zera dopisujemy na końcu części po przecinku. $2{,}5$ to nie to samo co $2{,}05$.",
        },
        {
          nazwa: "Szacowanie i sprawdzanie",
          slownie: "Zaokrąglij liczby do całości i policz w pamięci. Wynik dokładny powinien być bliski oszacowaniu. Dodawanie sprawdzamy odejmowaniem, a odejmowanie dodawaniem.",
          tex: "4{,}8+5{,}15\\approx 5+5=10",
          przyklad: "Dokładnie $4{,}8 + 5{,}15 = 9{,}95$, a oszacowanie to $10$. Pasuje. Ceny w złotych mają dwa miejsca po przecinku: $4{,}50$ zł to $4$ zł $50$ gr.",
          uwaga: "Gdy wynik odejmowania wyszedł większy od odjemnej, to gdzieś jest błąd.",
        },
      ],
      jak: [
        "Zapisz liczby jedna pod drugą: przecinek pod przecinkiem.",
        "Dopisz zera, żeby obie liczby miały tyle samo miejsc po przecinku. Liczbę naturalną zapisz z przecinkiem.",
        "Licz kolumnami od prawej do lewej. Pamiętaj o zapamiętanej jedynce albo o pożyczce.",
        "Wpisz przecinek w wyniku pod przecinkami. Sprawdź wynik szacowaniem albo działaniem odwrotnym.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Ile to jest $3{,}6 + 4{,}75$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7{,}81$", "$8{,}35$", "$5{,}11$", "$7{,}35$"],
          poprawna: 1,
        },
        {
          nr: "9",
          tresc: "Ile to jest $10 - 3{,}45$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6{,}65$", "$7{,}45$", "$7{,}55$", "$6{,}55$"],
          poprawna: 3,
        },
        {
          nr: "10",
          tresc: "Ola kupiła chleb za $3{,}80$ zł i masło za $6{,}45$ zł. Zapłaciła banknotem $20$ zł. Ile reszty dostała? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10{,}25$ zł", "$9{,}25$ zł", "$9{,}75$ zł", "$16{,}20$ zł"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "Ile to jest $8{,}4 - 5{,}9$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3{,}5$", "$3{,}1$", "$2{,}15$", "$2{,}5$"],
          poprawna: 3,
        },
        {
          nr: "12",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$0{,}7 + 0{,}5 = 0{,}12$", litery: "PF", poprawna: 1 },
            { tekst: "$6 - 0{,}6 = 5{,}4$", litery: "PF", poprawna: 0 },
            { tekst: "$1{,}25 + 0{,}75 = 2$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Trasa rowerowa składa się z trzech odcinków o długościach $4{,}7$ km, $3{,}85$ km i $2{,}5$ km. Ile kilometrów ma cała trasa? **Zapisz obliczenia.**",
          rozwiazanie: "Zapisujemy liczby z dwoma miejscami po przecinku: $4{,}70$, $3{,}85$, $2{,}50$.\n\nDodajemy pierwsze dwie: $4{,}70 + 3{,}85 = 8{,}55$.\n\nDodajemy trzecią: $8{,}55 + 2{,}50 = 11{,}05$.\n\nOdpowiedź: Cała trasa ma $11{,}05$ km.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Tomek miał $50$ zł. Kupił piłkę za $27{,}90$ zł i skarpetki za $8{,}50$ zł. Ile pieniędzy mu zostało? Czy starczy mu jeszcze na koszulkę za $15$ zł? **Zapisz obliczenia.**",
          rozwiazanie: "Wydał: $27{,}90 + 8{,}50 = 36{,}40$ zł.\n\nZostało: $50 - 36{,}40 = 13{,}60$ zł.\n\nPorównujemy z ceną koszulki: $13{,}60 < 15$, więc Tomkowi brakuje $15 - 13{,}60 = 1{,}40$ zł.\n\nOdpowiedź: Zostało mu $13{,}60$ zł. Na koszulkę nie starczy, brakuje $1{,}40$ zł.",
        },
      ],
      generatory: [
        {
          id: "dodaj-dziesietne",
          nazwa: "Dodaj pisemnie",
          opis: "Dodawanie pisemne ułamków dziesiętnych (także liczba naturalna plus ułamek) i ceny w złotych.",
          generuj(r) {
            const zakupy = r.chance(0.35);
            let a, b;
            for (;;) {
              if (zakupy) {
                a = { n: r.int(105, 4999), p: 2 };
                b = { n: r.int(55, 999), p: 2 };
              } else {
                const pa = r.int(0, 2), pb = r.int(1, 2);
                a = { n: los(r, pa, r.int(pa + 1, 4), 10 ** pa), p: pa };
                b = { n: los(r, pb, r.int(pb, 3), 1), p: pb };
              }
              const { A, B } = rownaj(a, b);
              if (String(A).length <= 4 && String(B).length <= 4 && cyfry(a.n).length + cyfry(b.n).length <= 6) break;
            }
            const { A, B, p, opis } = rownaj(a, b);
            const kroki = [opis, ...krokiDodaj(A, B, p)];
            const sa = ds(a.n, a.p), sb = ds(b.n, b.p);
            const sum = A + B;
            if (zakupy) {
              const [im, kup, zap] = r.pick(IMIONA);
              const [t1, t2] = r.pick([["chleb", "masło"], ["bułki", "ser"], ["zeszyt", "długopis"], ["piłkę", "skakankę"], ["sok", "kanapkę"]]);
              return {
                tresc: `${im} ${kup} ${t1} za $${fixed(a.n, 2)}$ zł i ${t2} za $${fixed(b.n, 2)}$ zł. Ile złotych ${zap} za oba zakupy?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Razem (zł)" }],
                odpowiedz: { w: qd(sum, 2) },
                wynik: `$${fixed(sum, 2)}$ zł`,
                rozwiazanie: kroki,
              };
            }
            return {
              tresc: r.pick([`Oblicz pisemnie $${sa} + ${sb}$.`, `Dodaj pisemnie $${sa} + ${sb}$.`, `Ile to jest $${sa} + ${sb}$?`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Suma" }],
              odpowiedz: { w: qd(sum, p) },
              wynik: `$${ds(sum, p)}$`,
              rozwiazanie: kroki,
            };
          },
        },
        {
          id: "odejmij-dziesietne",
          nazwa: "Odejmij pisemnie",
          opis: "Odejmowanie pisemne ułamków dziesiętnych, odejmowanie od liczby naturalnej i obliczanie reszty z banknotu.",
          generuj(r) {
            const typ = r.int(0, 2);
            let a, b, reszta = false, banknot = 0;
            for (;;) {
              if (typ === 0) {
                const pa = r.int(1, 2), pb = r.int(1, 2);
                a = { n: los(r, pa, r.int(pa + 1, 4), 10 ** pa), p: pa };
                b = { n: los(r, pb, r.int(pb, 3), 1), p: pb };
              } else if (typ === 1) {
                const pb = r.int(1, 2);
                a = { n: r.int(3, pb === 2 ? 99 : 120), p: 0 };
                b = { n: los(r, pb, r.int(pb + 1, 3), 10 ** pb), p: pb };
              } else {
                banknot = r.pick([10, 20, 50]);
                reszta = true;
                a = { n: banknot, p: 0 };
                b = { n: r.int(105, banknot * 100 - 105), p: 2 };
              }
              const { A, B } = rownaj(a, b);
              if (A > B && String(A).length <= 4 && cyfry(a.n).length + cyfry(b.n).length <= 6) break;
            }
            const { A, B, p, opis } = rownaj(a, b);
            const kroki = [opis, ...krokiOdejmij(A, B, p)];
            const roz = A - B;
            if (reszta) {
              const [im, , zap] = r.pick(IMIONA);
              return {
                tresc: `${im} ${zap} banknotem $${banknot}$ zł za zakupy o wartości $${fixed(b.n, 2)}$ zł. Ile złotych reszty ${im === "Ola" || im === "Ania" ? "dostała" : "dostał"}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Reszta (zł)" }],
                odpowiedz: { w: qd(roz, 2) },
                wynik: `$${fixed(roz, 2)}$ zł`,
                rozwiazanie: kroki,
              };
            }
            const sa = ds(a.n, a.p), sb = ds(b.n, b.p);
            return {
              tresc: r.pick([`Oblicz pisemnie $${sa} - ${sb}$.`, `Odejmij pisemnie $${sa} - ${sb}$.`, `Ile to jest $${sa} - ${sb}$?`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Różnica" }],
              odpowiedz: { w: qd(roz, p) },
              wynik: `$${ds(roz, p)}$`,
              rozwiazanie: kroki,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "mnozenie-dziesietne",
      nazwa: "Mnożenie ułamków dziesiętnych",
      sciaga: [
        {
          nazwa: "Mnożenie ułamków dziesiętnych",
          slownie: "Mnożymy tak, jakby nie było przecinków. Potem w wyniku odliczamy od prawej tyle miejsc po przecinku, ile było ich razem w obu czynnikach.",
          tex: "24\\cdot 13=312\\qquad 2{,}4\\cdot 1{,}3=3{,}12",
          przyklad: "$0{,}6 \\cdot 0{,}07$: mnożymy $6 \\cdot 7 = 42$. Po przecinku są $1 + 2 = 3$ miejsca, więc wynik to $0{,}042$. Brakujące cyfry uzupełniamy zerami z przodu.",
          uwaga: "$0{,}3 \\cdot 0{,}2 = 0{,}06$, a nie $0{,}6$. Policz miejsca po przecinku w obu czynnikach.",
        },
        {
          nazwa: "Mnożenie przez liczbę naturalną",
          slownie: "Pomnóż jak liczby naturalne. W wyniku zostaw tyle miejsc po przecinku, ile miała liczba z przecinkiem.",
          tex: "3\\cdot 12{,}50=37{,}50",
          przyklad: "$3 \\cdot 12{,}50$: $3 \\cdot 1250 = 3750$, a po przecinku mają być dwa miejsca, więc wynik to $37{,}50$ zł. Dalej $4 \\cdot 2{,}5 = 10{,}0 = 10$.",
          uwaga: "Zera na końcu części po przecinku możesz skreślić: $10{,}0$ to $10$.",
        },
        {
          nazwa: "Mnożenie przez 10, 100, 1000",
          slownie: "Przesuwamy przecinek w prawo o tyle miejsc, ile zer ma mnożnik. Gdy zabraknie cyfr, dopisujemy zera.",
          tex: "3{,}45\\cdot 10=34{,}5\\qquad 3{,}45\\cdot 100=345\\qquad 0{,}7\\cdot 1000=700",
          przyklad: "$2{,}6 \\cdot 100 = 260$. Przecinek przesunęliśmy o dwa miejsca, więc po cyfrze $6$ dopisaliśmy zero.",
        },
        {
          nazwa: "Mnożenie przez 0,1; 0,01; 0,001",
          slownie: "Mnożenie przez $0{,}1$ to to samo, co dzielenie przez $10$. Przesuwamy przecinek w lewo: o jedno miejsce przy $0{,}1$, o dwa przy $0{,}01$, o trzy przy $0{,}001$.",
          tex: "45\\cdot 0{,}1=4{,}5\\qquad 45\\cdot 0{,}01=0{,}45",
          przyklad: "$3{,}6 \\cdot 0{,}1 = 0{,}36$ i $250 \\cdot 0{,}01 = 2{,}5$. Dalej $8 \\cdot 0{,}5 = 4$, bo $0{,}5$ to połowa.",
          uwaga: "Mnożenie przez liczbę mniejszą od $1$ zmniejsza wynik. Iloczyn $8 \\cdot 0{,}5$ jest mniejszy od $8$.",
        },
      ],
      jak: [
        "Zapisz działanie i policz, ile miejsc po przecinku mają oba czynniki razem.",
        "Pomnóż liczby tak, jakby nie miały przecinków (pisemnie albo w pamięci).",
        "Odlicz od prawej w wyniku tyle miejsc, ile policzyłeś, i wstaw przecinek. Gdy brakuje cyfr, dopisz zera z przodu.",
        "Sprawdź, czy wynik ma sens: $0{,}5 \\cdot 8$ to połowa z $8$, czyli $4$.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Ile to jest $0{,}4 \\cdot 0{,}3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1{,}2$", "$0{,}7$", "$0{,}12$", "$0{,}012$"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "Ile to jest $1{,}2 \\cdot 7$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$84$", "$8{,}4$", "$0{,}84$", "$8{,}2$"],
          poprawna: 1,
        },
        {
          nr: "17",
          tresc: "Jeden metr taśmy kosztuje $3{,}25$ zł. Ile kosztują $4$ metry tej taśmy? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7{,}25$ zł", "$1{,}30$ zł", "$12{,}20$ zł", "$13$ zł"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "Ile to jest $3{,}7 \\cdot 0{,}01$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}37$", "$37$", "$0{,}0037$", "$0{,}037$"],
          poprawna: 3,
        },
        {
          nr: "19",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$0{,}5 \\cdot 8 = 4$", litery: "PF", poprawna: 0 },
            { tekst: "$0{,}2 \\cdot 0{,}2 = 0{,}4$", litery: "PF", poprawna: 1 },
            { tekst: "$3{,}5 \\cdot 100 = 35$", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Kilogram jabłek kosztuje $4{,}80$ zł. Ile zapłacimy za $2{,}5$ kg jabłek? **Zapisz obliczenia.**",
          rozwiazanie: "Mnożymy bez przecinków: $25 \\cdot 480 = 12\\,000$.\n\nPo przecinku mamy: $1 + 2 = 3$ miejsca.\n\nWstawiamy przecinek: $12{,}000 = 12$.\n\nSprawdzenie: $2{,}5$ kg to więcej niż $2$ kg, więc zapłacimy ponad $2 \\cdot 4{,}80 = 9{,}60$ zł. Wynik pasuje.\n\nOdpowiedź: Za jabłka zapłacimy $12$ zł.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Na prostej ścieżce ustawiono w jednej linii $6$ pachołków. Odległość między sąsiednimi pachołkami to $1{,}35$ m. Jaka jest odległość między pierwszym a ostatnim pachołkiem? **Zapisz obliczenia.**",
          rozwiazanie: "Między $6$ pachołkami jest o jeden odstęp mniej, czyli $6 - 1 = 5$ odstępów.\n\nDługość: $5 \\cdot 1{,}35$. Mnożymy bez przecinków: $5 \\cdot 135 = 675$.\n\nPo przecinku są dwa miejsca, więc wynik to $6{,}75$.\n\nOdpowiedź: Pierwszy i ostatni pachołek dzieli $6{,}75$ m.",
        },
      ],
      generatory: [
        {
          id: "mnoz-dziesietne",
          nazwa: "Pomnóż ułamki",
          opis: "Mnożenie ułamków dziesiętnych, mnożenie przez liczbę naturalną i przesuwanie przecinka (przez $10$, $100$, $0{,}1$, $0{,}01$).",
          generuj(r) {
            const typ = r.int(0, 3);
            if (typ <= 1) {
              let a, b;
              if (typ === 0) {
                const pa = r.int(1, 2), pb = r.int(1, 3 - pa);
                a = { n: los(r, pa, r.int(pa, 3)), p: pa };
                b = { n: los(r, pb, r.int(pb, 2)), p: pb };
              } else {
                const pa = r.int(1, 2);
                a = { n: los(r, pa, r.int(pa, 3)), p: pa };
                b = { n: r.int(2, 12), p: 0 };
              }
              const w = krokiMnoz(a, b);
              const sa = ds(a.n, a.p), sb = ds(b.n, b.p);
              return {
                tresc: r.pick([`Oblicz $${sa} \\cdot ${sb}$.`, `Pomnóż $${sa}$ przez $${sb}$.`, `Ile to jest $${sa} \\cdot ${sb}$?`]),
                pola: [{ id: "w", typ: "liczba", etykieta: "Iloczyn" }],
                odpowiedz: { w: qd(w.n, w.p) },
                wynik: `$${ds(w.n, w.p)}$`,
                rozwiazanie: w.kroki,
              };
            }
            if (typ === 2) {
              const p = r.int(1, 3), k = r.int(1, 3);
              const n = los(r, p, r.int(p, 3));
              const wynN = n * 10 ** k;
              return {
                tresc: r.pick([`Oblicz $${fixed(n, p)} \\cdot ${10 ** k}$.`, `Ile to jest $${fixed(n, p)} \\cdot ${10 ** k}$?`]),
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w: qd(wynN, p) },
                wynik: `$${ds(wynN, p)}$`,
                rozwiazanie: [
                  `Mnożymy przez $${10 ** k}$ (jedynka i ${k === 1 ? "jedno zero" : k === 2 ? "dwa zera" : "trzy zera"}), więc przesuwamy przecinek w prawo o ${miejsc(k)}.`,
                  `Gdy brakuje cyfr, dopisujemy zera: $${fixed(n, p)} \\cdot ${10 ** k} = ${ds(wynN, p)}$.`,
                ],
              };
            }
            const j = r.int(1, 3);
            const p = r.int(0, Math.min(1, 4 - j));
            const n = p === 0 ? r.int(2, 600) : los(r, 1, 3);
            const mn = j === 1 ? "0{,}1" : j === 2 ? "0{,}01" : "0{,}001";
            return {
              tresc: r.pick([`Oblicz $${fixed(n, p)} \\cdot ${mn}$.`, `Ile to jest $${fixed(n, p)} \\cdot ${mn}$?`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w: qd(n, p + j) },
              wynik: `$${ds(n, p + j)}$`,
              rozwiazanie: [
                `Mnożenie przez $${mn}$ to to samo, co dzielenie przez $${10 ** j}$.`,
                `Przesuwamy przecinek w lewo o ${miejsc(j)} (gdy brakuje cyfr, dopisujemy zera z przodu): $${fixed(n, p)} \\cdot ${mn} = ${ds(n, p + j)}$.`,
              ],
            };
          },
        },
        {
          id: "zakupy-mnozenie",
          nazwa: "Zadania z cenami",
          opis: "Zadania tekstowe: cena razy ilość, długość razy liczba okrążeń, odległość między przedmiotami ustawionymi w linii.",
          generuj(r) {
            const ctx = r.int(0, 3);
            let tresc, a, b, jednostka, kroki0 = [], etykieta;
            if (ctx === 0) {
              const towar = r.pick(["jabłek", "gruszek", "wiśni", "truskawek", "ziemniaków", "marchewki"]);
              if (r.chance(0.5)) {
                const pa = r.int(1, 2);
                a = { n: los(r, pa, pa + 1, 10 ** pa + 1), p: pa };
                b = { n: r.int(2, 6), p: 0 };
                tresc = `Kilogram ${towar} kosztuje $${fixed(a.n, a.p)}$ zł. Ile złotych kosztuje $${b.n}$ kg?`;
              } else {
                a = { n: los(r, 1, 2, 11), p: 1 };
                b = { n: r.pick([5, 15, 25, 35, 12, 24, 32]), p: 1 };
                tresc = `Kilogram ${towar} kosztuje $${fixed(a.n, 1)}$ zł. Ile złotych kosztuje $${fixed(b.n, 1)}$ kg?`;
              }
              jednostka = "zł";
              etykieta = "Koszt (zł)";
            } else if (ctx === 1) {
              a = { n: los(r, 2, 3, 101), p: 2 };
              b = { n: r.int(5, 9), p: 0 };
              tresc = `Bilet do kina kosztuje $${fixed(a.n, 2)}$ zł. Ile złotych zapłacimy za $${b.n}$ takich biletów?`;
              jednostka = "zł";
              etykieta = "Koszt (zł)";
            } else if (ctx === 2) {
              const k = r.int(5, 9), pa = r.int(1, 2);
              a = { n: los(r, pa, pa + 1, 10 ** pa + 1, 4 * 10 ** pa - 1), p: pa };
              b = { n: k - 1, p: 0 };
              tresc = `W jednej linii ustawiono $${k}$ pachołków. Odległość między sąsiednimi pachołkami to $${fixed(a.n, a.p)}$ m. Jaka jest odległość między pierwszym a ostatnim pachołkiem?`;
              jednostka = "m";
              etykieta = "Odległość (m)";
              kroki0 = [`Między $${k}$ pachołkami jest o jeden odstęp mniej: $${k} - 1 = ${k - 1}$.`, `Mnożymy długość odstępu przez liczbę odstępów: $${ds(a.n, a.p)} \\cdot ${k - 1}$.`];
            } else {
              a = { n: los(r, 2, 2, 11), p: 2 };
              b = { n: r.int(3, 8), p: 0 };
              tresc = `Ścieżka wokół stawu ma długość $${fixed(a.n, 2)}$ km. Ile kilometrów przejdzie turysta, który obejdzie staw $${b.n}$ razy?`;
              jednostka = "km";
              etykieta = "Długość (km)";
            }
            const w = krokiMnoz(a, b);
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta }],
              odpowiedz: { w: qd(w.n, w.p) },
              wynik: `$${ds(w.n, w.p)}$ ${jednostka}`,
              rozwiazanie: [...kroki0, ...w.kroki],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "dzielenie-dziesietne",
      nazwa: "Dzielenie ułamków dziesiętnych",
      sciaga: [
        {
          nazwa: "Dzielenie przez liczbę naturalną",
          slownie: "Dzielimy pisemnie jak liczby naturalne. Gdy w dzielnej przekroczymy przecinek, w wyniku też piszemy przecinek. Jeśli zabraknie cyfr, dopisujemy zera na końcu dzielnej.",
          tex: "9{,}6:3=3{,}2\\qquad 3:4=0{,}75",
          przyklad: "$13{,}5 : 5$: $13 : 5 = 2$ reszty $3$, piszę przecinek, $35 : 5 = 7$, wynik $2{,}7$. Dalej $3 : 4$: zapisuję $3{,}00 : 4$, a to daje $0{,}75$.",
          uwaga: "Nie zapomnij o przecinku w wyniku: $4{,}8 : 4 = 1{,}2$, a nie $12$. Mniejszą liczbę też można dzielić przez większą.",
        },
        {
          nazwa: "Dzielenie przez 10, 100, 1000",
          slownie: "Przesuwamy przecinek w lewo o tyle miejsc, ile zer ma dzielnik. Gdy zabraknie cyfr, dopisujemy zera z przodu.",
          tex: "45{,}6:10=4{,}56\\qquad 7:100=0{,}07",
          przyklad: "$382 : 100 = 3{,}82$, a $5{,}4 : 10 = 0{,}54$.",
        },
        {
          nazwa: "Dzielenie przez ułamek dziesiętny",
          slownie: "Dzielnik ma być liczbą naturalną. Przesuwamy przecinek w dzielnej i w dzielniku o tyle samo miejsc w prawo. Wynik się nie zmienia.",
          tex: "7{,}5:0{,}25=750:25=30",
          przyklad: "$4{,}8 : 0{,}6 = 48 : 6 = 8$. Dalej $1{,}2 : 0{,}04 = 120 : 4 = 30$.",
          uwaga: "Przesuń przecinek w obu liczbach. Zapis $2 : 0{,}5$ zamieniamy na $20 : 5 = 4$, a nie na $2 : 5$.",
        },
        {
          nazwa: "Ile razy się mieści",
          slownie: "Dzielenie odpowiada na pytanie, ile razy jedna liczba mieści się w drugiej. Gdy dzielnik jest mniejszy od $1$, wynik jest większy od dzielnej.",
          tex: "3:0{,}25=300:25=12",
          przyklad: "Ile kawałków sznurka po $0{,}25$ m utniemy z $3$ m? $3 : 0{,}25 = 12$ kawałków. Dalej $5 : 0{,}1 = 50$, bo w $5$ mieści się $50$ razy po $0{,}1$.",
          uwaga: "$6 : 0{,}5 = 12$, a nie $3$. Połowa z $6$ to $6 \\cdot 0{,}5 = 3$, a to inne działanie.",
        },
      ],
      jak: [
        "Gdy dzielnik ma przecinek, przesuń przecinek w obu liczbach o tyle samo miejsc w prawo. Dzielnik ma zostać liczbą naturalną.",
        "Podziel jak liczby naturalne. Jeśli zabraknie cyfr w dzielnej, dopisz zera na jej końcu.",
        "W wyniku postaw przecinek tam, gdzie w dzielnej przekroczyłeś przecinek.",
        "Sprawdź mnożeniem: wynik razy dzielnik ma dać dzielną.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Ile to jest $8{,}4 : 4$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2{,}1$", "$21$", "$0{,}21$", "$2{,}01$"],
          poprawna: 0,
        },
        {
          nr: "23",
          tresc: "Ile to jest $6 : 8$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}68$", "$1{,}3$", "$0{,}75$", "$0{,}875$"],
          poprawna: 2,
        },
        {
          nr: "24",
          tresc: "Ile to jest $9{,}6 : 0{,}3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3{,}2$", "$32$", "$0{,}32$", "$320$"],
          poprawna: 1,
        },
        {
          nr: "25",
          tresc: "Ile to jest $45{,}7 : 100$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4{,}57$", "$457$", "$0{,}0457$", "$0{,}457$"],
          poprawna: 3,
        },
        {
          nr: "26",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$5 : 0{,}5 = 10$", litery: "PF", poprawna: 0 },
            { tekst: "$3{,}6 : 9 = 4$", litery: "PF", poprawna: 1 },
            { tekst: "$0{,}9 : 10 = 0{,}09$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Z wstążki o długości $4{,}5$ m robimy kokardki. Na jedną kokardkę potrzeba $0{,}3$ m wstążki. Ile kokardek zrobimy? **Zapisz obliczenia.**",
          rozwiazanie: "Pytamy, ile razy $0{,}3$ mieści się w $4{,}5$, więc dzielimy: $4{,}5 : 0{,}3$.\n\nPrzesuwamy przecinek w obu liczbach o jedno miejsce w prawo: $4{,}5 : 0{,}3 = 45 : 3$.\n\n$45 : 3 = 15$.\n\nSprawdzenie: $15 \\cdot 0{,}3 = 4{,}5$.\n\nOdpowiedź: Zrobimy $15$ kokardek.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "Cztery koleżanki kupiły wspólnie piłkę za $37{,}80$ zł i podzieliły koszt po równo. Potem każda dołożyła jeszcze $2{,}55$ zł na torbę. Ile złotych w sumie wydała każda z koleżanek? **Zapisz obliczenia.**",
          rozwiazanie: "Koszt piłki na jedną osobę: $37{,}80 : 4$.\n\nDzielimy $378 : 4 = 94{,}5$, a w wyniku mają być dwa miejsca po przecinku, więc $37{,}80 : 4 = 9{,}45$.\n\nSprawdzenie: $4 \\cdot 9{,}45 = 37{,}80$.\n\nDodajemy dopłatę na torbę: $9{,}45 + 2{,}55 = 12{,}00$.\n\nOdpowiedź: Każda koleżanka wydała w sumie $12$ zł.",
        },
      ],
      generatory: [
        {
          id: "dziel-naturalna",
          nazwa: "Dziel przez liczbę",
          opis: "Dzielenie ułamka dziesiętnego lub liczby naturalnej przez liczbę naturalną, także z dopisywaniem zer.",
          generuj(r) {
            let P, n, d;
            if (r.chance(0.12)) {
              d = 8;
              P = 3;
              n = r.pick([125, 375, 625, 875]);
            } else {
              P = r.int(1, 2);
              n = los(r, P, P + 1, P === 1 ? 11 : 11);
              d = r.int(2, 9);
            }
            const Nfull = n * d;
            const sk = ds(Nfull, P);
            const pStrip = miejscaPo(Nfull, P);
            const kroki = [];
            if (pStrip < P) kroki.push(`Dopisujemy zera na końcu dzielnej, żeby miała ${miejsc(P)} po przecinku: $${sk} = ${fixed(Nfull, P)}$.`);
            kroki.push(`Dzielimy jak liczby naturalne, bez przecinka: $${Nfull} : ${d} = ${n}$.`);
            kroki.push(`W wyniku stawiamy przecinek tak, żeby miał tyle samo miejsc po przecinku co dzielna: $${ds(n, P)}$. Sprawdzenie: $${ds(n, P)} \\cdot ${d} = ${sk}$.`);
            if (P === 2 && Nfull % 10 !== 0 && d >= 5 && r.chance(0.3)) {
              const rzecz = r.pick(["batoników", "zeszytów", "długopisów", "bułek", "lizaków"]);
              return {
                tresc: `Zapłacono $${sk}$ zł za $${d}$ takich samych ${rzecz}. Ile złotych kosztuje jeden?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Cena jednego (zł)" }],
                odpowiedz: { w: qd(n, P) },
                wynik: `$${ds(n, P)}$ zł`,
                rozwiazanie: kroki,
              };
            }
            return {
              tresc: r.pick([`Oblicz $${sk} : ${d}$.`, `Podziel $${sk}$ przez $${d}$.`, `Ile to jest $${sk} : ${d}$?`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Iloraz" }],
              odpowiedz: { w: qd(n, P) },
              wynik: `$${ds(n, P)}$`,
              rozwiazanie: kroki,
            };
          },
        },
        {
          id: "dziel-dziesietna",
          nazwa: "Dziel przez ułamek",
          opis: "Dzielenie przez ułamek dziesiętny (przesuwanie przecinka), przez $10$, $100$, $1000$ oraz przez $0{,}1$ i $0{,}01$.",
          generuj(r) {
            const typ = r.int(0, 3);
            if (typ <= 1) {
              // dzielnik z przecinkiem
              let b, k, dziel;
              for (;;) {
                const kdz = typ === 0;
                const [bn, pb] = kdz ? r.pick([[2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [8, 1], [12, 1], [15, 1], [25, 1], [4, 2], [5, 2], [8, 2], [25, 2]]) : r.pick([[2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [8, 1], [4, 2], [5, 2], [8, 2]]);
                b = { n: bn, p: pb };
                k = kdz ? { n: r.int(2, 30), p: 0 } : { n: los(r, 1, 2, 11), p: 1 };
                dziel = { n: b.n * k.n, p: b.p + k.p };
                const sd = ds(dziel.n, dziel.p);
                if (cyfry(dziel.n).length + cyfry(b.n).length <= 6 && miejscaPo(dziel.n, dziel.p) >= 1 && dziel.n % 10 !== 0) break;
              }
              const sd = ds(dziel.n, dziel.p), sb = ds(b.n, b.p);
              const pd = miejscaPo(dziel.n, dziel.p);
              const przesun = b.p;
              const nowaDziel = ds(dziel.n * 10 ** przesun, dziel.p);
              const nowyDziel = b.n;
              const kroki = [
                `Przesuwamy przecinek w obu liczbach o ${miejsc(przesun)} w prawo, żeby dzielnik był liczbą naturalną: $${sd} : ${sb} = ${nowaDziel} : ${nowyDziel}$.`,
                `Dzielimy: $${nowaDziel} : ${nowyDziel} = ${ds(k.n, k.p)}$.`,
                `Sprawdzenie: $${ds(k.n, k.p)} \\cdot ${sb} = ${sd}$.`,
              ];
              if (pd === 0) kroki.shift();
              if (typ === 0 && r.chance(0.5)) {
                return {
                  tresc: `Z drutu o długości $${sd}$ m odcinamy kawałki po $${sb}$ m. Ile kawałków otrzymamy?`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Liczba kawałków" }],
                  odpowiedz: { w: k.n },
                  wynik: `$${k.n}$`,
                  rozwiazanie: kroki,
                };
              }
              return {
                tresc: r.pick([`Oblicz $${sd} : ${sb}$.`, `Podziel $${sd}$ przez $${sb}$.`, `Ile to jest $${sd} : ${sb}$?`]),
                pola: [{ id: "w", typ: "liczba", etykieta: "Iloraz" }],
                odpowiedz: { w: qd(k.n, k.p) },
                wynik: `$${ds(k.n, k.p)}$`,
                rozwiazanie: kroki,
              };
            }
            if (typ === 2) {
              // przez 10, 100, 1000
              const j = r.int(1, 3);
              const p = r.int(0, Math.min(2, 4 - j));
              const n = p === 0 ? r.int(2, 900) : los(r, p, 3);
              return {
                tresc: r.pick([`Oblicz $${fixed(n, p)} : ${10 ** j}$.`, `Ile to jest $${fixed(n, p)} : ${10 ** j}$?`]),
                pola: [{ id: "w", typ: "liczba", etykieta: "Iloraz" }],
                odpowiedz: { w: qd(n, p + j) },
                wynik: `$${ds(n, p + j)}$`,
                rozwiazanie: [
                  `Dzielimy przez $${10 ** j}$ (jedynka i ${j === 1 ? "jedno zero" : j === 2 ? "dwa zera" : "trzy zera"}), więc przesuwamy przecinek w lewo o ${miejsc(j)}.`,
                  `Gdy brakuje cyfr, dopisujemy zera z przodu: $${fixed(n, p)} : ${10 ** j} = ${ds(n, p + j)}$.`,
                ],
              };
            }
            // przez 0,1; 0,01
            const j = r.int(1, 2);
            const p = r.int(0, 1);
            const n = p === 0 ? r.int(2, 90) : los(r, 1, 3);
            const dz = j === 1 ? "0{,}1" : "0{,}01";
            const wynN = n * 10 ** j;
            return {
              tresc: r.pick([`Oblicz $${fixed(n, p)} : ${dz}$.`, `Ile to jest $${fixed(n, p)} : ${dz}$?`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Iloraz" }],
              odpowiedz: { w: qd(wynN, p) },
              wynik: `$${ds(wynN, p)}$`,
              rozwiazanie: [
                `Dzielenie przez $${dz}$ to to samo, co mnożenie przez $${10 ** j}$.`,
                `Przesuwamy przecinek w prawo o ${miejsc(j)} (gdy brakuje cyfr, dopisujemy zera): $${fixed(n, p)} : ${dz} = ${ds(wynN, p)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "zamiana-jednostek",
      nazwa: "Zamiana jednostek",
      sciaga: [
        {
          nazwa: "Jednostki długości",
          slownie: "Przy zamianie jednostek ważne jest, ile razy jedna jednostka mieści się w drugiej. Warto znać tę tabelkę na pamięć.",
          tex: "1\\ \\text{km}=1000\\ \\text{m}\\qquad 1\\ \\text{m}=100\\ \\text{cm}\\qquad 1\\ \\text{cm}=10\\ \\text{mm}",
          przyklad: "$2{,}35$ m $= 235$ cm, bo $2{,}35 \\cdot 100 = 235$. Dalej $1{,}2$ km $= 1200$ m i $45$ mm $= 4{,}5$ cm.",
        },
        {
          nazwa: "Jednostki masy i pieniądze",
          slownie: "Tona to $1000$ kg, a kilogram to $1000$ g albo $100$ dag. Złoty to $100$ groszy.",
          tex: "1\\ \\text{t}=1000\\ \\text{kg}\\qquad 1\\ \\text{kg}=1000\\ \\text{g}\\qquad 1\\ \\text{kg}=100\\ \\text{dag}\\qquad 1\\ \\text{dag}=10\\ \\text{g}\\qquad 1\\ \\text{zł}=100\\ \\text{gr}",
          przyklad: "$0{,}75$ kg $= 750$ g $= 75$ dag. Dalej $3250$ g $= 3{,}25$ kg i $2{,}4$ t $= 2400$ kg.",
        },
        {
          nazwa: "Jak zamieniać jednostki",
          slownie: "Z większej jednostki na mniejszą mnożymy (przecinek idzie w prawo). Z mniejszej na większą dzielimy (przecinek idzie w lewo). Mnożymy lub dzielimy przez $10$, $100$ albo $1000$.",
          przyklad: "Z metrów na centymetry mnożymy: $3{,}4$ m $= 3{,}4 \\cdot 100 = 340$ cm. Z gramów na kilogramy dzielimy: $2500$ g $= 2500 : 1000 = 2{,}5$ kg.",
          uwaga: "Większa jednostka, to mniejsza liczba. $2$ m to $200$ cm, a nie $0{,}02$ cm. Zawsze sprawdź, czy wynik ma sens.",
        },
        {
          nazwa: "Zapis w dwóch jednostkach",
          slownie: "Mniejszą jednostkę zamień na część większej jednostki i dodaj całości. Aby zapisać w dwóch jednostkach, całości zostaw, a część po przecinku zamień na mniejszą jednostkę.",
          tex: "3\\ \\text{m}\\ 25\\ \\text{cm}=3{,}25\\ \\text{m}",
          przyklad: "$2$ kg $350$ g $= 2{,}35$ kg. Dalej $4$ zł $5$ gr $= 4{,}05$ zł. W drugą stronę $1{,}8$ m to $1$ m $80$ cm.",
          uwaga: "$5$ gr to $0{,}05$ zł, a nie $0{,}5$ zł. Zapis $4$ zł $5$ gr to $4{,}05$ zł, a nie $4{,}5$ zł.",
        },
      ],
      jak: [
        "Zapisz, jaką jednostkę masz i na jaką zamieniasz.",
        "Przypomnij sobie, ile mniejszych jednostek mieści się w większej: $10$, $100$ czy $1000$.",
        "Z większej na mniejszą: mnóż. Z mniejszej na większą: dziel. Przesuń przecinek.",
        "Sprawdź sens: w mniejszych jednostkach liczba ma być większa.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Ile centymetrów ma $2{,}6$ m? **Wybierz właściwą odpowiedź.**",
          opcje: ["$26$", "$2600$", "$0{,}026$", "$260$"],
          poprawna: 3,
        },
        {
          nr: "30",
          tresc: "Ile kilogramów to $3500$ g? **Wybierz właściwą odpowiedź.**",
          opcje: ["$350$", "$3{,}5$", "$35$", "$0{,}35$"],
          poprawna: 1,
        },
        {
          nr: "31",
          tresc: "Zapisz $4$ zł $7$ gr w złotych. **Wybierz właściwą odpowiedź.**",
          opcje: ["$4{,}7$ zł", "$47$ zł", "$4{,}07$ zł", "$4{,}007$ zł"],
          poprawna: 2,
        },
        {
          nr: "32",
          tresc: "Paczka waży $2$ kg $60$ g. Ile to kilogramów? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2{,}06$ kg", "$2{,}6$ kg", "$2{,}006$ kg", "$20{,}6$ kg"],
          poprawna: 0,
        },
        {
          nr: "33",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$1{,}5$ km $= 1500$ m", litery: "PF", poprawna: 0 },
            { tekst: "$75$ dag $= 0{,}75$ kg", litery: "PF", poprawna: 0 },
            { tekst: "$0{,}4$ m $= 4$ cm", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 2,
          tresc: "Ola kupiła $2$ kg $350$ g jabłek i $0{,}75$ kg gruszek. Ile gramów owoców kupiła Ola? **Zapisz obliczenia.**",
          rozwiazanie: "Jabłka: $2$ kg $350$ g $= 2000$ g $+ 350$ g $= 2350$ g.\n\nGruszki: $0{,}75$ kg $= 0{,}75 \\cdot 1000 = 750$ g.\n\nRazem: $2350 + 750 = 3100$ g.\n\nOdpowiedź: Ola kupiła $3100$ g owoców (czyli $3{,}1$ kg).",
        },
        {
          nr: "35",
          punkty: 3,
          tresc: "W skoku w dal Ania skoczyła $2{,}85$ m, Bartek $3$ m $12$ cm, a Ela $308$ cm. Zapisz wszystkie wyniki w metrach i ustaw je od najlepszego do najsłabszego. O ile centymetrów Bartek skoczył dalej niż Ela? **Zapisz obliczenia.**",
          rozwiazanie: "Wynik Bartka: $3$ m $12$ cm $= 3 + 0{,}12 = 3{,}12$ m.\n\nWynik Eli: $308$ cm $= 308 : 100 = 3{,}08$ m.\n\nPorównujemy: $3{,}12 > 3{,}08 > 2{,}85$, więc od najlepszego: Bartek, Ela, Ania.\n\nRóżnica: $3{,}12 - 3{,}08 = 0{,}04$ m, czyli $0{,}04 \\cdot 100 = 4$ cm.\n\nOdpowiedź: Kolejność: Bartek, Ela, Ania. Bartek skoczył dalej od Eli o $4$ cm.",
        },
      ],
      generatory: [
        {
          id: "zamien-jednostki",
          nazwa: "Zamień jednostki",
          opis: "Zamiana jednostek długości, masy i pieniędzy: z większej na mniejszą (mnożenie) albo z mniejszej na większą (dzielenie).",
          generuj(r) {
            const [W, M, f] = r.pick([["km", "m", 1000], ["m", "cm", 100], ["cm", "mm", 10], ["m", "mm", 1000], ["t", "kg", 1000], ["kg", "g", 1000], ["kg", "dag", 100], ["dag", "g", 10], ["zł", "gr", 100]]);
            const k = String(f).length - 1;
            if (r.chance(0.5)) {
              const p = r.int(1, k);
              const n = los(r, p, p + 1, 1) + 10 ** p;
              const wyn = n * 10 ** (k - p);
              return {
                tresc: r.pick([`Zamień $${fixed(n, p)}$ ${W} na ${M}.`, `Ile ${M} to $${fixed(n, p)}$ ${W}?`]),
                pola: [{ id: "w", typ: "liczba", etykieta: `Wynik w ${M}` }],
                odpowiedz: { w: wyn },
                wynik: `$${T(wyn)}$ ${M}`,
                rozwiazanie: [
                  `$1$ ${W} $= ${f}$ ${M}.`,
                  `Zamieniamy na mniejszą jednostkę, więc mnożymy przez $${f}$ (przecinek przesuwamy w prawo o ${miejsc(k)}): $${fixed(n, p)} \\cdot ${f} = ${T(wyn)}$.`,
                ],
              };
            }
            let N;
            do N = r.int(11, 9999);
            while (N % 10 === 0);
            return {
              tresc: r.pick([`Zamień $${T(N)}$ ${M} na ${W}.`, `Ile ${W} to $${T(N)}$ ${M}?`]),
              pola: [{ id: "w", typ: "liczba", etykieta: `Wynik w ${W}` }],
              odpowiedz: { w: qd(N, k) },
              wynik: `$${ds(N, k)}$ ${W}`,
              rozwiazanie: [
                `$1$ ${W} $= ${f}$ ${M}.`,
                `Zamieniamy na większą jednostkę, więc dzielimy przez $${f}$ (przecinek przesuwamy w lewo o ${miejsc(k)}): $${T(N)} : ${f} = ${ds(N, k)}$.`,
              ],
            };
          },
        },
        {
          id: "zapis-dwoch-jednostek",
          nazwa: "Zapis w dwóch jednostkach",
          opis: "Zamień zapis w dwóch jednostkach (np. $3$ m $25$ cm) na ułamek dziesiętny albo odwrotnie.",
          generuj(r) {
            const [W, M, f] = r.pick([["m", "cm", 100], ["kg", "g", 1000], ["zł", "gr", 100], ["km", "m", 1000], ["cm", "mm", 10]]);
            const k = String(f).length - 1;
            const A = r.int(1, 9);
            let B;
            do B = r.int(1, f - 1);
            while (B % 10 === 0);
            const n = A * f + B;
            if (r.chance(0.5)) {
              return {
                tresc: r.pick([`Zapisz $${A}$ ${W} $${B}$ ${M} w ${W}, jako ułamek dziesiętny.`, `Ile ${W} to $${A}$ ${W} $${B}$ ${M}? Wpisz ułamek dziesiętny.`]),
                pola: [{ id: "w", typ: "liczba", etykieta: `Wynik w ${W}` }],
                odpowiedz: { w: qd(n, k) },
                wynik: `$${ds(n, k)}$ ${W}`,
                rozwiazanie: [
                  `$${B}$ ${M} to $${B} : ${f}$ ${W}, czyli $${fixed(B, k)}$ ${W}.`,
                  `Dodajemy całości: $${A} + ${fixed(B, k)} = ${ds(n, k)}$ ${W}.`,
                ],
              };
            }
            return {
              tresc: r.pick([`Zapisz $${ds(n, k)}$ ${W} w dwóch jednostkach: w ${W} i w ${M}.`, `Zamień $${ds(n, k)}$ ${W} na ${W} i ${M}.`]),
              pola: [{ id: "a", typ: "liczba", etykieta: `Ile ${W}` }, { id: "b", typ: "liczba", etykieta: `Ile ${M}` }],
              odpowiedz: { a: A, b: B },
              wynik: `$${A}$ ${W} $${B}$ ${M}`,
              rozwiazanie: [
                `Całości to $${A}$ ${W}.`,
                `Część po przecinku zamieniamy na ${M}: $${fixed(B, k)} \\cdot ${f} = ${B}$ ${M}.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
