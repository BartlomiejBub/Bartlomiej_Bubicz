// Klasa 6 (szkoła podstawowa) · rozdział III „Działania na liczbach, cz. 2” – Matematyka z kluczem 6 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";   // tylko pomocnicze z wspolne.js

// --- Pomocnicze (tylko dla tego pliku)

/** Poprawna forma rzeczownika po liczbie: 1 cyfra, 2 cyfry, 5 cyfr. */
function mn(n, a, b, c) {
  const m10 = n % 10, m100 = n % 100;
  if (n === 1) return a;
  return m10 >= 2 && m10 <= 4 && !(m100 >= 12 && m100 <= 14) ? b : c;
}

const nwdf = (a, b) => { while (b) [a, b] = [b, a % b]; return a; };

const fr = (n, d) => `\\frac{${n}}{${d}}`;
/** Liczba wymierna dodatnia jako ułamek, liczba mieszana albo liczba całkowita (LaTeX). */
const qm = (v) => (v.d === 1 ? `${v.n}` : v.n < v.d ? fr(v.n, v.d) : `${Math.floor(v.n / v.d)}${fr(v.n % v.d, v.d)}`);
const qf = (v) => (v.d === 1 ? `${v.n}` : fr(v.n, v.d));

/** Ułamek dziesiętny (liczba dodatnia, mianownik dzieli 10^4) do tekstu: 3/4 -> "0{,}75". */
function fmtD(v) {
  for (let k = 0; k <= 4; k++) {
    const p = 10 ** k;
    if (p % v.d === 0) {
      const x = v.n * (p / v.d);
      const c = Math.floor(x / p);
      const f = String(x % p).padStart(k, "0").replace(/0+$/, "");
      return f === "" ? `${c}` : `${c}{,}${f}`;
    }
  }
  throw new Error(`Nie da się zapisać dziesiętnie: ${v}`);
}

/** Liczba x / 10^p zapisana z dokładnie p cyframi po przecinku: (705, 2) -> "7{,}05". */
function fmtP(x, p) {
  if (p === 0) return `${x}`;
  const m = 10 ** p;
  return `${Math.floor(x / m)}{,}${String(x % m).padStart(p, "0")}`;
}

/** Łańcuch zapisu wyniku: ułamek, ułamek skrócony, liczba mieszana (bez powtórzeń). */
function lancuch(n, d) {
  const res = q(n, d);
  const ch = [fr(n, d)];
  const red = res.d === 1 ? `${res.n}` : fr(res.n, res.d);
  if (red !== ch[0]) ch.push(red);
  const mix = qm(res);
  if (mix !== ch[ch.length - 1]) ch.push(mix);
  return ch.join(" = ");
}

/** Liczba do działań na ułamkach: właściwy ("wl"), mieszany ("mie") albo naturalny ("nat"). */
function liczba(r, rodzaj) {
  if (rodzaj === "nat") {
    const N = r.int(2, 12);
    return { tex: `${N}`, impTex: `${N}`, nn: N, dd: 1, imp: q(N), mieszana: false };
  }
  let d, n;
  do {
    d = r.pick([2, 3, 4, 5, 6, 8, 9, 10]);
    n = r.int(1, d - 1);
  } while (nwdf(n, d) !== 1);
  if (rodzaj === "wl") return { tex: fr(n, d), impTex: fr(n, d), nn: n, dd: d, imp: q(n, d), mieszana: false };
  const w = r.int(1, 4);
  return { tex: `${w}${fr(n, d)}`, impTex: fr(w * d + n, d), nn: w * d + n, dd: d, imp: q(w * d + n, d), mieszana: true };
}

const zamianaMieszanych = (...L) => {
  const m = L.filter((x) => x.mieszana);
  return m.length ? [`Zamieniamy ${m.length > 1 ? "liczby mieszane" : "liczbę mieszaną"} na ${m.length > 1 ? "ułamki niewłaściwe" : "ułamek niewłaściwy"}: ${m.map((x) => `$${x.tex} = ${x.impTex}$`).join(", ")}.`] : [];
};

/** Rozwinięcie dziesiętne n/d: cyfry przed okresem i cyfry okresu. */
function rozwin(n, d) {
  const cyfry = [], seen = new Map();
  let rem = n % d;
  while (rem !== 0 && !seen.has(rem)) {
    seen.set(rem, cyfry.length);
    rem *= 10;
    cyfry.push(Math.floor(rem / d));
    rem %= d;
  }
  if (rem === 0) return { pre: cyfry, per: [] };
  const st = seen.get(rem);
  return { pre: cyfry.slice(0, st), per: cyfry.slice(st) };
}

export default {
  tematy: [
    // ------------------------------------------------------------------------------------------------
    {
      id: "mnozenie",
      nazwa: "Mnożenie ułamków",
      sciaga: [
        {
          nazwa: "Mnożenie ułamków zwykłych",
          slownie: "Mnożymy licznik przez licznik i mianownik przez mianownik. Jeśli można, skracamy przed mnożeniem albo po nim. Wspólny mianownik nie jest potrzebny.",
          tex: "\\frac{a}{b}\\cdot\\frac{c}{d}=\\frac{a\\cdot c}{b\\cdot d}",
          litery: "$a$, $c$ – liczniki; $b$, $d$ – mianowniki.",
          przyklad: "$\\frac{2}{3}\\cdot\\frac{3}{8}=\\frac{2\\cdot3}{3\\cdot8}=\\frac{6}{24}=\\frac{1}{4}$.",
          uwaga: "Wspólny mianownik szukamy tylko przy dodawaniu i odejmowaniu, nie przy mnożeniu.",
        },
        {
          nazwa: "Ułamek razy liczba naturalna",
          slownie: "Liczbę naturalną zapisujemy jako ułamek z mianownikiem $1$. Mnożymy tylko licznik, mianownik zostaje taki sam.",
          tex: "6\\cdot\\frac{5}{8}=\\frac{30}{8}=3\\frac{3}{4}",
          przyklad: "$6\\cdot\\frac{5}{8}=\\frac{6\\cdot5}{8}=\\frac{30}{8}=\\frac{15}{4}=3\\frac{3}{4}$.",
          uwaga: "Nie mnóż mianownika przez liczbę naturalną.",
        },
        {
          nazwa: "Liczby mieszane",
          slownie: "Najpierw zamieniamy liczby mieszane na ułamki niewłaściwe. Potem mnożymy jak zwykłe ułamki i na końcu skracamy.",
          tex: "1\\frac{1}{2}\\cdot2\\frac{2}{3}=\\frac{3}{2}\\cdot\\frac{8}{3}=4",
          przyklad: "$1\\frac{1}{2}=\\frac{3}{2}$ i $2\\frac{2}{3}=\\frac{8}{3}$. Zatem $\\frac{3}{2}\\cdot\\frac{8}{3}=\\frac{24}{6}=4$.",
          uwaga: "Nie mnóż osobno całości i osobno ułamków. Wynik byłby inny.",
        },
        {
          nazwa: "Ułamki dziesiętne",
          slownie: "Mnożymy bez przecinków, jak liczby naturalne. W wyniku odliczamy od prawej tyle cyfr po przecinku, ile jest ich w obu czynnikach razem.",
          tex: "2{,}4\\cdot0{,}3=0{,}72",
          przyklad: "$24\\cdot3=72$. W liczbach $2{,}4$ i $0{,}3$ jest razem $2$ cyfry po przecinku, więc wynik to $0{,}72$.",
          uwaga: "$0{,}2\\cdot0{,}3=0{,}06$, a nie $0{,}6$. Brakujące miejsce uzupełniamy zerem.",
        },
        {
          nazwa: "Mnożenie przez 10, 100 i 0,1",
          slownie: "Przy mnożeniu przez $10$, $100$, $1000$ przesuwamy przecinek w prawo o tyle miejsc, ile jest zer. Mnożenie przez $0{,}1$ przesuwa przecinek w lewo o jedno miejsce.",
          tex: "4{,}7\\cdot10=47\\qquad4{,}7\\cdot0{,}1=0{,}47",
          przyklad: "$3{,}25\\cdot100=325$. Gdy brakuje cyfr, dopisujemy zera: $0{,}6\\cdot100=60$.",
          uwaga: "Mnożenie przez liczbę mniejszą od $1$ zmniejsza wynik.",
        },
      ],
      jak: [
        "Zamień liczby mieszane na ułamki niewłaściwe. Liczbę naturalną zapisz jako ułamek z mianownikiem $1$.",
        "Pomnóż liczniki i pomnóż mianowniki. Wcześniej skróć, co się da.",
        "Ułamki dziesiętne pomnóż bez przecinków i odlicz w wyniku tyle cyfr po przecinku, ile było w obu czynnikach.",
        "Zamień wynik na liczbę mieszaną i sprawdź, czy ma sens (np. czy wynik jest mniejszy od czynnika, gdy mnożysz przez ułamek właściwy).",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Ile wynosi $\\frac{3}{4}\\cdot\\frac{2}{9}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{5}{13}$", "$\\frac{1}{6}$", "$\\frac{3}{2}$", "$\\frac{6}{9}$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Ile wynosi $1\\frac{1}{2}\\cdot2\\frac{1}{3}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2\\frac{1}{6}$", "$3\\frac{1}{3}$", "$\\frac{7}{6}$", "$3\\frac{1}{2}$"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "Ile wynosi $0{,}8\\cdot0{,}05$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}4$", "$0{,}004$", "$0{,}04$", "$4$"],
          poprawna: 2,
        },
        {
          nr: "4",
          tresc: "Kilogram jabłek kosztuje $3{,}60$ zł. Ile złotych zapłacimy za $2{,}5$ kg jabłek? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7{,}20$ zł", "$9$ zł", "$90$ zł", "$6{,}10$ zł"],
          poprawna: 1,
        },
        {
          nr: "5",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\frac{2}{5}\\cdot10=4$", litery: "PF", poprawna: 0 },
            { tekst: "$3{,}7\\cdot100=37$", litery: "PF", poprawna: 1 },
            { tekst: "Iloczyn $0{,}6\\cdot\\frac{1}{2}$ jest mniejszy od $0{,}6$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Prostokątna grządka ma boki długości $2\\frac{1}{2}$ m i $1\\frac{3}{5}$ m. Jakie jest pole tej grządki? **Zapisz obliczenia.**",
          rozwiazanie: "Pole prostokąta to iloczyn długości boków. Zamieniamy liczby mieszane: $2\\frac{1}{2}=\\frac{5}{2}$ oraz $1\\frac{3}{5}=\\frac{8}{5}$.\n\nMnożymy: $\\frac{5}{2}\\cdot\\frac{8}{5}=\\frac{40}{10}=4$.\n\nOdpowiedź: Pole grządki to $4$ m$^2$.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Kilogram wiśni kosztuje $12{,}50$ zł. Pani Ewa kupiła $1{,}6$ kg wiśni i zapłaciła banknotem $50$ zł. Ile złotych reszty dostała? **Zapisz obliczenia.**",
          rozwiazanie: "Koszt wiśni: $12{,}5\\cdot1{,}6$. Mnożymy bez przecinków: $125\\cdot16=2000$. W czynnikach są razem $2$ cyfry po przecinku, więc koszt to $20{,}00$ zł, czyli $20$ zł.\n\nReszta: $50-20=30$.\n\nOdpowiedź: Pani Ewa dostała $30$ zł reszty.",
        },
      ],
      generatory: [
        {
          id: "mnozenie-ulamkow",
          nazwa: "Mnożenie ułamków zwykłych",
          opis: "Pomnóż dwa ułamki zwykłe, liczby mieszane albo ułamek i liczbę naturalną. Wynik wpisz jako ułamek (może być niewłaściwy) albo liczbę całkowitą.",
          generuj(r) {
            const rodz = r.pick([["wl", "wl"], ["wl", "wl"], ["mie", "wl"], ["mie", "mie"], ["nat", "wl"], ["wl", "nat"]]);
            for (;;) {
              const A = liczba(r, rodz[0]), B = liczba(r, rodz[1]);
              const res = A.imp.mul(B.imp);
              if (res.d > 40 || res.n > 2000) continue;
              const kr = [
                ...zamianaMieszanych(A, B),
                `Mnożymy licznik przez licznik i mianownik przez mianownik: $${A.impTex} \\cdot ${B.impTex} = ${fr(A.nn * B.nn, A.dd * B.dd)}$.`,
                ...(lancuch(A.nn * B.nn, A.dd * B.dd).includes("=") ? [`Skracamy i zapisujemy wynik: $${lancuch(A.nn * B.nn, A.dd * B.dd)}$.`] : [`Wyniku nie da się już skrócić.`]),
              ];
              const dwaUl = rodz[0] !== "nat" && rodz[1] !== "nat";
              const tresc = dwaUl && r.chance(0.25)
                ? `Prostokąt ma boki długości $${A.tex}$ m i $${B.tex}$ m. Jakie jest jego pole w metrach kwadratowych?`
                : r.pick([`Oblicz $${A.tex} \\cdot ${B.tex}$.`, `Ile to jest $${A.tex} \\cdot ${B.tex}$?`]);
              return {
                tresc,
                pola: [{ id: "w", typ: "liczba", etykieta: `Wynik jako ułamek (np. ${res.d === 1 ? "7/2" : `${res.n}/${res.d}`})` }],
                odpowiedz: { w: res },
                wynik: `$${qm(res)}$`,
                rozwiazanie: kr,
              };
            }
          },
        },
        {
          id: "mnozenie-dziesietnych",
          nazwa: "Mnożenie dziesiętnych",
          opis: "Pomnóż ułamki dziesiętne (także w zadaniach z cenami), licząc najpierw bez przecinków.",
          generuj(r) {
            let p, s;
            do { p = r.int(1, 2); s = r.int(0, 2); } while (p + s > 3 || (s === 2 && p === 2));
            let A, B;
            do {
              A = p === 1 ? r.int(11, 99) : r.int(101, 999);
              B = s === 0 ? r.int(2, 12) : s === 1 ? r.int(2, 99) : r.int(2, 19);
            } while (A % 10 === 0 || (s > 0 && B % 10 === 0));
            const P = A * B, k = p + s;
            const res = q(P, 10 ** k);
            const a = fmtP(A, p), b = s === 0 ? `${B}` : fmtP(B, s);
            const cena = k <= 2 && r.chance(0.4);
            const tresc = cena
              ? `Kilogram sera kosztuje $${a}$ zł. Ile złotych zapłacimy za $${b}$ kg sera?`
              : r.pick([`Oblicz $${a} \\cdot ${b}$.`, `Ile to jest $${a} \\cdot ${b}$?`]);
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: cena ? "Cena w zł" : "Wynik" }],
              odpowiedz: { w: res },
              wynik: `$${fmtD(res)}$`,
              rozwiazanie: [
                `Mnożymy bez przecinków: $${A} \\cdot ${B} = ${P}$.`,
                `W czynnikach jest razem $${k}$ ${mn(k, "cyfra", "cyfry", "cyfr")} po przecinku (w $${a}$ jest $${p}$, w $${b}$ jest $${s}$).`,
                `W wyniku odliczamy $${k}$ ${mn(k, "cyfrę", "cyfry", "cyfr")} od prawej: $${fmtP(P, k)}$${fmtP(P, k) === fmtD(res) ? "" : `, czyli $${fmtD(res)}$`}.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "dzielenie",
      nazwa: "Dzielenie ułamków",
      sciaga: [
        {
          nazwa: "Odwrotność liczby",
          slownie: "Odwrotność ułamka dostajemy, zamieniając licznik z mianownikiem. Liczba razy jej odwrotność daje $1$. Odwrotność liczby naturalnej $n$ to $\\frac{1}{n}$.",
          tex: "\\frac{a}{b}\\ \\to\\ \\frac{b}{a}",
          przyklad: "Odwrotność $\\frac{3}{5}$ to $\\frac{5}{3}$. Odwrotność $4$ to $\\frac{1}{4}$. Odwrotność $2\\frac{1}{2}=\\frac{5}{2}$ to $\\frac{2}{5}$.",
          uwaga: "Liczba $0$ nie ma odwrotności. Nie można dzielić przez zero.",
        },
        {
          nazwa: "Dzielenie ułamków",
          slownie: "Dzielenie zamieniamy na mnożenie przez odwrotność dzielnika, czyli drugiej liczby. Potem mnożymy i skracamy.",
          tex: "\\frac{a}{b}:\\frac{c}{d}=\\frac{a}{b}\\cdot\\frac{d}{c}",
          przyklad: "$\\frac{3}{4}:\\frac{9}{10}=\\frac{3}{4}\\cdot\\frac{10}{9}=\\frac{30}{36}=\\frac{5}{6}$.",
          uwaga: "Odwracamy drugą liczbę (tę, przez którą dzielimy), a nie pierwszą.",
        },
        {
          nazwa: "Liczby mieszane i naturalne",
          slownie: "Liczby mieszane zamieniamy na ułamki niewłaściwe. Liczbę naturalną zapisujemy jako ułamek z mianownikiem $1$. Potem dzielimy jak zwykłe ułamki.",
          tex: "6:\\frac{3}{4}=6\\cdot\\frac{4}{3}=8",
          przyklad: "$2\\frac{1}{4}:3=\\frac{9}{4}:\\frac{3}{1}=\\frac{9}{4}\\cdot\\frac{1}{3}=\\frac{3}{4}$.",
          uwaga: "Najpierw zamień liczby mieszane na ułamki niewłaściwe. Dopiero potem odwracaj dzielnik.",
        },
        {
          nazwa: "Ile razy się mieści?",
          slownie: "Dzielenie $a : b$ pytamy: ile razy $b$ mieści się w $a$. Gdy dzielimy przez ułamek mniejszy od $1$, wynik jest większy od dzielnej.",
          przyklad: "Z $3$ m wstążki tniemy kawałki po $\\frac{1}{4}$ m. Kawałków jest $3:\\frac{1}{4}=3\\cdot4=12$.",
          uwaga: "Dzielenie przez ułamek mniejszy od $1$ nie zmniejsza liczby. Zmniejsza ją dzielenie przez liczbę większą od $1$.",
        },
      ],
      jak: [
        "Zamień liczby mieszane na ułamki niewłaściwe, a liczby naturalne na ułamki z mianownikiem $1$.",
        "Zamień dzielenie na mnożenie przez odwrotność drugiej liczby.",
        "Pomnóż liczniki i mianowniki (skróć, co się da).",
        "Zapisz wynik jako liczbę mieszaną i sprawdź mnożeniem: wynik razy dzielnik ma dać dzielną.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Ile wynosi $\\frac{5}{6}:\\frac{5}{12}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{25}{72}$", "$\\frac{1}{2}$", "$2$", "$\\frac{25}{36}$"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Ile wynosi $4:\\frac{2}{3}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{8}{3}$", "$6$", "$\\frac{1}{6}$", "$4\\frac{2}{3}$"],
          poprawna: 1,
        },
        {
          nr: "10",
          tresc: "Ile wynosi $1\\frac{1}{2}:2\\frac{1}{4}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1\\frac{1}{2}$", "$3\\frac{3}{8}$", "$\\frac{3}{4}$", "$\\frac{2}{3}$"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "Ile szklanek o pojemności $\\frac{1}{4}$ l można napełnić $3\\frac{1}{2}$ l soku? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$", "$7$", "$\\frac{7}{8}$", "$13$"],
          poprawna: 0,
        },
        {
          nr: "12",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Odwrotnością liczby $\\frac{2}{7}$ jest liczba $\\frac{7}{2}$.", litery: "PF", poprawna: 0 },
            { tekst: "$5:\\frac{1}{2}=2\\frac{1}{2}$", litery: "PF", poprawna: 1 },
            { tekst: "Wynik działania $\\frac{3}{4}:\\frac{1}{2}$ jest większy od $1$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Z kawałka tkaniny o długości $4$ m pani Basia szyje woreczki. Na jeden woreczek potrzeba $\\frac{3}{4}$ m tkaniny. Ile całych woreczków uszyje i ile metrów tkaniny zostanie? **Zapisz obliczenia.**",
          rozwiazanie: "Dzielimy: $4:\\frac{3}{4}=4\\cdot\\frac{4}{3}=\\frac{16}{3}=5\\frac{1}{3}$. Całych woreczków będzie $5$.\n\nZużyto $5\\cdot\\frac{3}{4}=\\frac{15}{4}=3\\frac{3}{4}$ m tkaniny.\n\nZostanie $4-3\\frac{3}{4}=\\frac{1}{4}$ m.\n\nOdpowiedź: Pani Basia uszyje $5$ woreczków i zostanie jej $\\frac{1}{4}$ m tkaniny.",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "Iloczyn dwóch liczb jest równy $\\frac{3}{5}$. Jedna z tych liczb to $\\frac{9}{10}$. Jaka jest druga liczba? **Zapisz obliczenia.**",
          rozwiazanie: "Drugą liczbę dostaniemy, dzieląc iloczyn przez pierwszą liczbę: $\\frac{3}{5}:\\frac{9}{10}$.\n\nZamieniamy na mnożenie: $\\frac{3}{5}\\cdot\\frac{10}{9}=\\frac{30}{45}=\\frac{2}{3}$.\n\nSprawdzenie: $\\frac{9}{10}\\cdot\\frac{2}{3}=\\frac{18}{30}=\\frac{3}{5}$.\n\nOdpowiedź: Druga liczba to $\\frac{2}{3}$.",
        },
      ],
      generatory: [
        {
          id: "dzielenie-ulamkow",
          nazwa: "Dzielenie ułamków",
          opis: "Podziel ułamki zwykłe, liczby mieszane albo ułamek przez liczbę naturalną (i odwrotnie). Wynik wpisz jako ułamek lub liczbę całkowitą.",
          generuj(r) {
            const rodz = r.pick([["wl", "wl"], ["wl", "wl"], ["mie", "wl"], ["wl", "mie"], ["nat", "wl"], ["wl", "nat"], ["mie", "nat"]]);
            for (;;) {
              const A = liczba(r, rodz[0]), B = liczba(r, rodz[1]);
              const res = A.imp.div(B.imp);
              if (res.d > 40 || res.n > 2000) continue;
              const odw = fr(B.dd, B.nn);
              const kr = [
                ...zamianaMieszanych(A, B),
                `Zamieniamy dzielenie na mnożenie przez odwrotność dzielnika: $${A.impTex} : ${B.impTex} = ${A.impTex} \\cdot ${odw}$.`,
                `Mnożymy: $${A.impTex} \\cdot ${odw} = ${lancuch(A.nn * B.dd, A.dd * B.nn)}$.`,
              ];
              const kontekst = res.d === 1 && rodz[0] !== "nat" && rodz[1] !== "nat" && r.chance(0.6);
              const tresc = kontekst
                ? `Ile szklanek o pojemności $${B.tex}$ l można napełnić $${A.tex}$ l soku?`
                : r.pick([`Oblicz $${A.tex} : ${B.tex}$.`, `Ile to jest $${A.tex} : ${B.tex}$?`]);
              return {
                tresc,
                pola: [{ id: "w", typ: "liczba", etykieta: `Wynik jako ułamek (np. ${res.d === 1 ? "7/2" : `${res.n}/${res.d}`})` }],
                odpowiedz: { w: res },
                wynik: `$${qm(res)}$`,
                rozwiazanie: kr,
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "dzielenie-pisemne",
      nazwa: "Dzielenie pisemne",
      sciaga: [
        {
          nazwa: "Ułamek dziesiętny przez liczbę naturalną",
          slownie: "Dzielimy jak liczby naturalne. Gdy znosimy pierwszą cyfrę po przecinku, w wyniku stawiamy przecinek. Gdy dzielenie się nie kończy, dopisujemy zero na końcu dzielnej.",
          tex: "7{,}2:3=2{,}4",
          przyklad: "$7:3=2$, reszta $1$. Stawiamy przecinek, znosimy $2$: $12:3=4$. Wynik $2{,}4$. Dla $3:4$ dopisujemy zera: $3{,}00:4=0{,}75$.",
          uwaga: "Gdy liczba jest za mała na dzielenie, wpisz $0$ w wyniku: $0{,}6:4$ to $0{,}60:4=0{,}15$.",
        },
        {
          nazwa: "Dzielenie przez ułamek dziesiętny",
          slownie: "Przesuwamy przecinek w dzielniku i w dzielnej o tyle samo miejsc w prawo, aż dzielnik będzie liczbą naturalną. Potem dzielimy.",
          tex: "7{,}2:0{,}4=72:4=18",
          przyklad: "$4{,}5:0{,}09$: przesuwamy przecinki o $2$ miejsca, mamy $450:9=50$.",
          uwaga: "Oba przecinki przesuwamy o tyle samo miejsc. Przesunięcie tylko jednego zmienia wynik.",
        },
        {
          nazwa: "Dzielenie przez 10, 100, 1000",
          slownie: "Przy dzieleniu przez $10$, $100$, $1000$ przesuwamy przecinek w lewo o tyle miejsc, ile jest zer. W razie potrzeby dopisujemy zera.",
          tex: "45{,}6:100=0{,}456",
          przyklad: "$45{,}6:10=4{,}56$. Dalej: $5:100=0{,}05$, bo przesuwamy przecinek o dwa miejsca i dopisujemy zero.",
          uwaga: "Dzielenie przez $10$ zmniejsza liczbę dziesięć razy. Przecinek idzie w lewo, a nie w prawo.",
        },
        {
          nazwa: "Ułamek zwykły jako dzielenie",
          slownie: "Kreska ułamkowa oznacza dzielenie. Aby zapisać ułamek zwykły jako dziesiętny, dzielimy licznik przez mianownik.",
          tex: "\\frac{3}{8}=3:8=0{,}375",
          przyklad: "$3:8$: dopisujemy zera, $3{,}000:8=0{,}375$. Podobnie $\\frac{7}{20}=7:20=0{,}35$.",
          uwaga: "Nie każdy ułamek zwykły ma skończony zapis dziesiętny (zob. ułamki okresowe w następnym temacie).",
        },
      ],
      jak: [
        "Gdy dzielnik jest ułamkiem dziesiętnym, przesuń przecinki w obu liczbach o tyle samo miejsc, aby dzielnik był liczbą naturalną.",
        "Dziel jak liczby naturalne. Przy przejściu przez przecinek w dzielnej postaw przecinek w wyniku.",
        "Gdy zostaje reszta, dopisz zero do dzielnej i dziel dalej.",
        "Sprawdź mnożeniem: wynik razy dzielnik ma dać dzielną.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Ile wynosi $9{,}6:4$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$24$", "$2{,}4$", "$0{,}24$", "$2{,}04$"],
          poprawna: 1,
        },
        {
          nr: "16",
          tresc: "Ile wynosi $4{,}5:0{,}09$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}5$", "$5$", "$500$", "$50$"],
          poprawna: 3,
        },
        {
          nr: "17",
          tresc: "Ile wynosi $0{,}7:5$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1{,}4$", "$0{,}35$", "$0{,}14$", "$0{,}014$"],
          poprawna: 2,
        },
        {
          nr: "18",
          tresc: "Jak zapisać ułamek $\\frac{7}{20}$ w postaci dziesiętnej? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}35$", "$0{,}27$", "$0{,}035$", "$0{,}7$"],
          poprawna: 0,
        },
        {
          nr: "19",
          tresc: "Trzy przyjaciółki zapłaciły za pizzę $40{,}50$ zł i podzieliły rachunek po równo. Ile złotych zapłaciła każda z nich? **Wybierz właściwą odpowiedź.**",
          opcje: ["$135$ zł", "$13{,}50$ zł", "$13{,}05$ zł", "$12{,}50$ zł"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Przewód ma długość $5{,}76$ m. Pocięto go na $8$ równych części. Ile metrów ma jedna część? Ile kawałków po $0{,}36$ m można by zrobić z całego przewodu? **Zapisz obliczenia.**",
          rozwiazanie: "Jedna część: $5{,}76:8$. Dzielimy jak liczby naturalne: $57:8=7$, reszta $1$; po przecinku $16:8=2$. Wynik: $0{,}72$ m.\n\nKawałki po $0{,}36$ m: $5{,}76:0{,}36$. Przesuwamy przecinki o $2$ miejsca: $576:36=16$.\n\nSprawdzenie: $0{,}72\\cdot8=5{,}76$ oraz $0{,}36\\cdot16=5{,}76$.\n\nOdpowiedź: Jedna część ma $0{,}72$ m, a kawałków po $0{,}36$ m byłoby $16$.",
        },
        {
          nr: "21",
          punkty: 1,
          tresc: "Zapisz ułamek $\\frac{5}{8}$ w postaci dziesiętnej, dzieląc pisemnie licznik przez mianownik. Sprawdź wynik mnożeniem. **Zapisz obliczenia.**",
          rozwiazanie: "Dzielimy $5:8$. Dopisujemy zera: $5{,}000:8$. Mamy $50:8=6$, reszta $2$; $20:8=2$, reszta $4$; $40:8=5$.\n\nZatem $\\frac{5}{8}=0{,}625$. Sprawdzenie: $0{,}625\\cdot8=5$.\n\nOdpowiedź: $\\frac{5}{8}=0{,}625$.",
        },
      ],
      generatory: [
        {
          id: "dzielenie-dziesietnych",
          nazwa: "Dzielenie dziesiętnych",
          opis: "Podziel ułamek dziesiętny przez liczbę naturalną albo przez ułamek dziesiętny. Wynik wychodzi bez reszty.",
          generuj(r) {
            if (r.chance(0.5)) {
              const p = r.int(1, 2), k = r.int(2, 9);
              let R;
              do { R = r.int(11, Math.floor(9999 / k)); } while (R % 10 === 0);
              const D = R * k;
              const dz = fmtP(D, p), wynik = q(R, 10 ** p);
              const ctx = r.chance(0.5);
              return {
                tresc: ctx
                  ? `Deskę o długości $${dz}$ m pocięto na $${k}$ ${mn(k, "równą część", "równe części", "równych części")}. Ile metrów ma jedna część?`
                  : r.pick([`Oblicz $${dz} : ${k}$.`, `Ile to jest $${dz} : ${k}$?`]),
                pola: [{ id: "w", typ: "liczba", etykieta: ctx ? "Długość w m" : "Wynik" }],
                odpowiedz: { w: wynik },
                wynik: `$${fmtD(wynik)}$`,
                rozwiazanie: [
                  `Dzielimy jak liczby naturalne, bez przecinka: $${D} : ${k} = ${R}$.`,
                  `W dzielnej $${dz}$ są $${p}$ ${mn(p, "cyfra", "cyfry", "cyfr")} po przecinku, więc w wyniku też: $${fmtP(R, p)}$.`,
                  `Sprawdzenie: $${fmtD(wynik)} \\cdot ${k} = ${fmtD(q(D, 10 ** p))}$.`,
                ],
              };
            }
            const s = r.int(1, 2), B = r.int(2, 9), R = r.int(2, 60);
            const D = R * B;
            const dividend = q(D, 10 ** s), divisor = q(B, 10 ** s);
            const ctx = r.chance(0.5);
            return {
              tresc: ctx
                ? `Ile kawałków przewodu po $${fmtD(divisor)}$ m można uzyskać z przewodu o długości $${fmtD(dividend)}$ m?`
                : r.pick([`Oblicz $${fmtD(dividend)} : ${fmtD(divisor)}$.`, `Ile to jest $${fmtD(dividend)} : ${fmtD(divisor)}$?`]),
              pola: [{ id: "w", typ: "liczba", etykieta: ctx ? "Liczba kawałków" : "Wynik" }],
              odpowiedz: { w: R },
              wynik: `$${R}$`,
              rozwiazanie: [
                `Przesuwamy przecinki w obu liczbach o $${s}$ ${mn(s, "miejsce", "miejsca", "miejsc")} w prawo, aby dzielnik był liczbą naturalną: $${fmtD(dividend)} : ${fmtD(divisor)} = ${D} : ${B}$.`,
                `Dzielimy: $${D} : ${B} = ${R}$.`,
                `Sprawdzenie: $${R} \\cdot ${fmtD(divisor)} = ${fmtD(dividend)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "zaokraglanie-okresowe",
      nazwa: "Zaokrąglanie i ułamki okresowe",
      sciaga: [
        {
          nazwa: "Zaokrąglanie ułamków dziesiętnych",
          slownie: "Patrzymy na cyfrę tuż za miejscem, do którego zaokrąglamy. Jeśli to $0$, $1$, $2$, $3$ albo $4$, ostatnią zostawianą cyfrę zostawiamy. Jeśli to $5$, $6$, $7$, $8$ albo $9$, zwiększamy ją o $1$.",
          tex: "3{,}468\\approx3{,}47\\qquad3{,}468\\approx3{,}5",
          przyklad: "$3{,}468$ do części setnych (dwie cyfry po przecinku): za $6$ stoi $8$, więc $3{,}47$. Do części dziesiątych: za $4$ stoi $6$, więc $3{,}5$.",
          uwaga: "Patrz tylko na jedną cyfrę. $2{,}449$ do części dziesiątych to $2{,}4$, a nie $2{,}5$.",
        },
        {
          nazwa: "Zaokrąglanie w życiu",
          slownie: "Kwoty w złotówkach zaokrąglamy do groszy, czyli do części setnych. Zaokrąglamy dopiero wynik, a nie liczby w trakcie obliczeń.",
          przyklad: "$2{,}5$ kg po $7{,}99$ zł: $7{,}99\\cdot2{,}5=19{,}975$. Do groszy: $19{,}98$ zł.",
          uwaga: "Zaokrąglenie to przybliżenie, więc zapisujemy je ze znakiem $\\approx$, a nie $=$.",
        },
        {
          nazwa: "Ułamek okresowy",
          slownie: "Gdy dzielenie licznika przez mianownik się nie kończy, od pewnego miejsca powtarza się ta sama cyfra albo grupa cyfr. Tę powtarzającą się część nazywamy okresem i zapisujemy w nawiasie.",
          tex: "\\frac{1}{3}=0{,}(3)\\qquad\\frac{5}{6}=0{,}8(3)",
          przyklad: "W dzieleniu $1:3$ ciągle zostaje reszta $1$, więc cyfra $3$ powtarza się: $0{,}(3)$. W dzieleniu $5:6$ pierwsza cyfra to $8$, a potem powtarza się $3$: $0{,}8(3)$.",
          uwaga: "W nawiasie piszemy tylko to, co się powtarza. Zapisy $0{,}83$ i $0{,}8(3)$ to różne liczby.",
        },
        {
          nazwa: "Zaokrąglanie ułamka okresowego",
          slownie: "Najpierw dzielimy tak długo, aż mamy cyfrę tuż za miejscem zaokrąglenia. Potem zaokrąglamy jak zwykły ułamek dziesiętny.",
          przyklad: "$\\frac{2}{3}=0{,}(6)$. Do części setnych: za $0{,}66$ stoi $6$, więc $\\frac{2}{3}\\approx0{,}67$. Dla $\\frac{1}{6}=0{,}1(6)$ do części dziesiątych: za $1$ stoi $6$, więc $\\frac{1}{6}\\approx0{,}2$.",
          uwaga: "Wynik zaokrąglenia nie jest równy ułamkowi. Używaj znaku $\\approx$.",
        },
      ],
      jak: [
        "Ustal, do którego miejsca zaokrąglamy (części dziesiąte – jedna cyfra po przecinku, setne – dwie cyfry).",
        "Spójrz na następną cyfrę: od $0$ do $4$ – zostaw, od $5$ do $9$ – zwiększ ostatnią cyfrę o $1$.",
        "Przy ułamku zwykłym najpierw podziel licznik przez mianownik. Gdy cyfra się powtarza, zapisz ją w nawiasie.",
        "W zadaniach z pieniędzmi zaokrąglaj do groszy.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Jaki jest wynik zaokrąglenia liczby $5{,}347$ do części setnych? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5{,}3$", "$5{,}34$", "$5{,}35$", "$5{,}4$"],
          poprawna: 2,
        },
        {
          nr: "23",
          tresc: "Jaki jest wynik zaokrąglenia liczby $8{,}449$ do części dziesiątych? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8{,}5$", "$8{,}4$", "$8{,}45$", "$8{,}44$"],
          poprawna: 1,
        },
        {
          nr: "24",
          tresc: "Który zapis jest równy ułamkowi $\\frac{5}{6}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}(83)$", "$0{,}83$", "$0{,}(8)$", "$0{,}8(3)$"],
          poprawna: 3,
        },
        {
          nr: "25",
          tresc: "Kilogram sera kosztuje $18{,}90$ zł. Ile zapłacimy za $0{,}75$ kg sera, jeśli wynik zaokrąglimy do groszy? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14{,}17$ zł", "$14{,}18$ zł", "$14{,}20$ zł", "$14$ zł"],
          poprawna: 1,
        },
        {
          nr: "26",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\frac{2}{3}=0{,}(6)$", litery: "PF", poprawna: 0 },
            { tekst: "Zapisy $0{,}(3)$ i $0{,}3$ oznaczają tę samą liczbę.", litery: "PF", poprawna: 1 },
            { tekst: "Liczba $6{,}996$ zaokrąglona do części setnych to $7{,}00$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Pan Tomek kupił $1{,}35$ kg wędliny po $29{,}90$ zł za kilogram. Ile złotych zapłacił? Wynik zaokrąglij do groszy. **Zapisz obliczenia.**",
          rozwiazanie: "Liczymy $29{,}9\\cdot1{,}35$. Mnożymy bez przecinków: $299\\cdot135=40\\,365$. W czynnikach są razem $3$ cyfry po przecinku ($1$ w liczbie $29{,}9$ i $2$ w liczbie $1{,}35$), więc wychodzi $40{,}365$ zł.\n\nZaokrąglamy do groszy, czyli do części setnych. Za $40{,}36$ stoi $5$, więc zwiększamy: $40{,}37$.\n\nOdpowiedź: Pan Tomek zapłacił około $40{,}37$ zł.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "Zapisz $\\frac{7}{12}$ w postaci ułamka dziesiętnego okresowego. Następnie zaokrąglij tę liczbę do części setnych. **Zapisz obliczenia.**",
          rozwiazanie: "Dzielimy $7:12$. Mamy $70:12=5$, reszta $10$; $100:12=8$, reszta $4$; $40:12=3$, reszta $4$. Reszta $4$ się powtarza, więc cyfra $3$ powtarza się w nieskończoność.\n\nZatem $\\frac{7}{12}=0{,}58(3)$.\n\nDo części setnych: za $0{,}58$ stoi $3$, więc zostawiamy $0{,}58$.\n\nOdpowiedź: $\\frac{7}{12}=0{,}58(3)\\approx0{,}58$.",
        },
      ],
      generatory: [
        {
          id: "zaokraglanie",
          nazwa: "Zaokrąglanie",
          opis: "Zaokrąglij ułamek dziesiętny do części dziesiątych albo setnych (także kwotę do groszy).",
          generuj(r) {
            let X;
            do { X = r.int(1001, 99999); } while (X % 10 === 0);
            const p = r.int(1, 2);
            const shift = 10 ** (3 - p);
            const baza = Math.floor(X / shift);
            const nd = Math.floor((X % shift) / (shift / 10));
            const wynikX = baza + (nd >= 5 ? 1 : 0);
            const wynik = q(wynikX, 10 ** p);
            const x = fmtP(X, 3);
            const grosze = p === 2 && r.chance(0.4);
            const miejsce = p === 1 ? "części dziesiątych" : "części setnych";
            return {
              tresc: grosze
                ? `Na kalkulatorze wyszło $${x}$ zł. Zaokrąglij tę kwotę do groszy (do części setnych).`
                : r.pick([`Zaokrąglij liczbę $${x}$ do ${miejsce}.`, `Jaki jest wynik zaokrąglenia liczby $${x}$ do ${miejsce}?`]),
              pola: [{ id: "w", typ: "liczba", etykieta: grosze ? "Kwota w zł" : "Wynik" }],
              odpowiedz: { w: wynik },
              wynik: `$${fmtP(wynikX, p)}$`,
              rozwiazanie: [
                `Zostawiamy $${p}$ ${mn(p, "cyfrę", "cyfry", "cyfr")} po przecinku: $${fmtP(baza, p)}$.`,
                `Następna cyfra to $${nd}$. ${nd >= 5 ? `Jest to $5$ lub więcej, więc zwiększamy ostatnią cyfrę o $1$.` : `Jest mniejsza od $5$, więc ostatnia cyfra się nie zmienia.`}`,
                `Wynik: $${x} \\approx ${fmtP(wynikX, p)}$.`,
              ],
            };
          },
        },
        {
          id: "okresowe",
          nazwa: "Ułamki okresowe",
          opis: "Zamień ułamek zwykły na dziesiętny okresowy (np. $\\frac{5}{6}=0{,}8(3)$) i podaj cyfrę okresu albo cyfrę na wskazanym miejscu po przecinku.",
          generuj(r) {
            let n, d, rz;
            for (;;) {
              d = r.pick([3, 6, 9, 12, 15, 18]);
              n = r.int(1, d - 1);
              if (nwdf(n, d) !== 1) continue;
              rz = rozwin(n, d);
              if (rz.per.length === 1) break;
            }
            const x = rz.per[0];
            const zapis = `0{,}${rz.pre.join("")}(${x})`;
            const wspolne = `Dzielimy licznik przez mianownik: $${n} : ${d}$. Dzielenie się nie kończy, a od pewnego miejsca powtarza się cyfra $${x}$. Zatem $${fr(n, d)} = ${zapis}$.`;
            if (r.chance(0.5)) {
              return {
                tresc: `Ułamek $${fr(n, d)}$ zapisano w postaci dziesiętnej okresowej. Jaka cyfra jest w okresie (w nawiasie)?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Cyfra okresu" }],
                odpowiedz: { w: x },
                wynik: `$${x}$`,
                rozwiazanie: [wspolne, `W nawiasie stoi cyfra $${x}$.`],
              };
            }
            const k = r.int(4, 25);
            const m = rz.pre.length;
            const cyfra = k <= m ? rz.pre[k - 1] : x;
            return {
              tresc: `Ułamek $${fr(n, d)}$ zapisano w postaci dziesiętnej. Jaka cyfra stoi na miejscu numer $${k}$ po przecinku?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Cyfra" }],
              odpowiedz: { w: cyfra },
              wynik: `$${cyfra}$`,
              rozwiazanie: [
                wspolne,
                m === 0 ? `Od pierwszego miejsca po przecinku wszystkie cyfry są równe $${x}$.` : `Przed okresem stoją cyfry: $${rz.pre.join(", ")}$. Od miejsca numer $${m + 1}$ wszystkie cyfry są równe $${x}$.`,
                `Na miejscu numer $${k}$ stoi cyfra $${cyfra}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "ulamek-liczby",
      nazwa: "Ułamek liczby i zadania",
      sciaga: [
        {
          nazwa: "Ułamek liczby",
          slownie: "Żeby obliczyć ułamek liczby, dzielimy liczbę przez mianownik (to jedna część) i mnożymy przez licznik.",
          tex: "\\frac{a}{b}\\text{ z }N=N:b\\cdot a",
          litery: "$N$ – liczba, z której bierzemy ułamek.",
          przyklad: "$\\frac{3}{5}$ z $40$: $40:5=8$, potem $8\\cdot3=24$. To samo: $\\frac{3}{5}\\cdot40=24$.",
          uwaga: "Słowo „z” w tym zadaniu oznacza mnożenie: $\\frac{3}{5}$ z $40$ to $\\frac{3}{5}\\cdot40$.",
        },
        {
          nazwa: "Ułamek ułamka",
          slownie: "Ułamek z ułamka też liczymy mnożeniem.",
          tex: "\\frac{1}{2}\\text{ z }\\frac{3}{4}=\\frac{1}{2}\\cdot\\frac{3}{4}=\\frac{3}{8}",
          przyklad: "Tort jest podzielony tak, że zostało $\\frac{3}{4}$ tortu. Zjedzono połowę tego, co zostało: $\\frac{1}{2}\\cdot\\frac{3}{4}=\\frac{3}{8}$ całego tortu.",
          uwaga: "Wynik jest mniejszy od obu liczb, gdy oba ułamki są właściwe.",
        },
        {
          nazwa: "Ile zostało?",
          slownie: "Gdy zużyto $\\frac{a}{b}$ całości, zostało $\\frac{b-a}{b}$ całości. Możemy też policzyć zużytą część i odjąć ją od całości.",
          przyklad: "Ola miała $35$ zł i wydała $\\frac{2}{7}$ tej kwoty. Zostało $\\frac{5}{7}$ z $35$: $35:7=5$, $5\\cdot5=25$ zł.",
          uwaga: "Pytanie „ile wydała?” i „ile zostało?” mają różne odpowiedzi. Przeczytaj pytanie do końca.",
        },
        {
          nazwa: "Liczba, gdy znamy jej ułamek",
          slownie: "Jeśli $\\frac{a}{b}$ liczby to $W$, to dzielimy $W$ przez licznik, aby dostać jedną część, a potem mnożymy przez mianownik.",
          tex: "\\frac{3}{8}\\text{ liczby}=15\\ \\Rightarrow\\ 15:3\\cdot8=40",
          przyklad: "$\\frac{3}{8}$ liczby to $15$. Jedna ósma to $15:3=5$. Cała liczba to $5\\cdot8=40$. Sprawdzenie: $\\frac{3}{8}\\cdot40=15$.",
          uwaga: "Nie mnóż $W$ przez ułamek. Wtedy liczysz ułamek z $W$, a nie całość.",
        },
      ],
      jak: [
        "Ustal, czy szukasz ułamka danej liczby, czy całej liczby, gdy znasz jej ułamek.",
        "Ułamek liczby: podziel liczbę przez mianownik i pomnóż przez licznik.",
        "Całość: podziel daną wartość przez licznik i pomnóż przez mianownik.",
        "Sprawdź, czy wynik pasuje do pytania (ile zostało? ile było? ile razem?) i napisz odpowiedź.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Ile wynosi $\\frac{3}{8}$ z $64$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$", "$40$", "$24$", "$21\\frac{1}{3}$"],
          poprawna: 2,
        },
        {
          nr: "30",
          tresc: "W klasie jest $28$ uczniów. Dziewczynki to $\\frac{3}{7}$ wszystkich uczniów. Ilu chłopców jest w klasie? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$", "$4$", "$21$", "$16$"],
          poprawna: 3,
        },
        {
          nr: "31",
          tresc: "Marek wydał $\\frac{2}{5}$ swoich pieniędzy. Zostało mu $36$ zł. Ile złotych miał na początku? **Wybierz właściwą odpowiedź.**",
          opcje: ["$60$ zł", "$72$ zł", "$24$ zł", "$14{,}40$ zł"],
          poprawna: 0,
        },
        {
          nr: "32",
          tresc: "Co jest większe: $\\frac{3}{4}$ z $20$ czy $\\frac{2}{3}$ z $24$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{3}{4}$ z $20$, bo wynosi $16$", "$\\frac{3}{4}$ z $20$, bo wynosi $15$", "$\\frac{2}{3}$ z $24$, bo wynosi $16$", "Obie liczby są równe."],
          poprawna: 2,
        },
        {
          nr: "33",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\frac{1}{2}$ z $\\frac{1}{3}$ to $\\frac{1}{6}$.", litery: "PF", poprawna: 0 },
            { tekst: "$\\frac{3}{10}$ z $50$ to $150$.", litery: "PF", poprawna: 1 },
            { tekst: "Jeśli $\\frac{2}{9}$ pewnej liczby to $8$, to ta liczba jest równa $36$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 2,
          tresc: "Książka ma $240$ stron. W sobotę Ania przeczytała $\\frac{3}{8}$ książki, a w niedzielę $\\frac{1}{4}$ książki. Ile stron jeszcze zostało jej do przeczytania? **Zapisz obliczenia.**",
          rozwiazanie: "W sobotę: $\\frac{3}{8}$ z $240$. Mamy $240:8=30$, a $30\\cdot3=90$ stron.\n\nW niedzielę: $\\frac{1}{4}$ z $240=240:4=60$ stron.\n\nPrzeczytane razem: $90+60=150$ stron. Zostało: $240-150=90$ stron.\n\nOdpowiedź: Ani zostało do przeczytania $90$ stron.",
        },
        {
          nr: "35",
          punkty: 3,
          tresc: "Pan Adam przejechał najpierw $\\frac{2}{5}$ trasy, a potem jeszcze $\\frac{3}{10}$ trasy. Do końca zostało mu $90$ km. Jaką długość ma cała trasa? **Zapisz obliczenia.**",
          rozwiazanie: "Przejechane części razem: $\\frac{2}{5}+\\frac{3}{10}=\\frac{4}{10}+\\frac{3}{10}=\\frac{7}{10}$ trasy.\n\nZostało $1-\\frac{7}{10}=\\frac{3}{10}$ trasy i to jest $90$ km.\n\nJedna dziesiąta trasy: $90:3=30$ km. Cała trasa: $30\\cdot10=300$ km.\n\nSprawdzenie: $\\frac{3}{10}\\cdot300=90$.\n\nOdpowiedź: Cała trasa ma $300$ km.",
        },
      ],
      generatory: [
        {
          id: "ulamek-z-liczby",
          nazwa: "Ułamek liczby",
          opis: "Oblicz ułamek liczby albo ile zostało po wydaniu części.",
          generuj(r) {
            let a, b;
            do {
              b = r.pick([2, 3, 4, 5, 6, 8, 10]);
              a = r.int(1, b - 1);
            } while (nwdf(a, b) !== 1);
            const t = r.int(0, 3);
            const m = t === 3 ? r.int(12, 40) : r.int(2, 15), N = b * m;   // książka: co najmniej 24 strony
            const f = fr(a, b);
            if (t === 0) {
              return {
                tresc: `Oblicz $${f}$ z $${N}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w: a * m },
                wynik: `$${a * m}$`,
                rozwiazanie: [`Dzielimy $${N}$ przez mianownik: $${N} : ${b} = ${m}$ (jedna część).`, `Mnożymy przez licznik: $${m} \\cdot ${a} = ${a * m}$.`],
              };
            }
            if (t === 1) {
              return {
                tresc: `W skrzynce jest $${N}$ jabłek. Czerwone jabłka to $${f}$ wszystkich jabłek w skrzynce. Ile jest czerwonych jabłek?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba jabłek" }],
                odpowiedz: { w: a * m },
                wynik: `$${a * m}$`,
                rozwiazanie: [`Szukamy $${f}$ z $${N}$. Dzielimy przez mianownik: $${N} : ${b} = ${m}$.`, `Mnożymy przez licznik: $${m} \\cdot ${a} = ${a * m}$.`],
              };
            }
            if (t === 2) {
              const zostalo = (b - a) * m;
              return {
                tresc: `Pan Jan miał $${N}$ zł. Wydał $${f}$ tej kwoty. Ile złotych mu zostało?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Kwota w zł" }],
                odpowiedz: { w: zostalo },
                wynik: `$${zostalo}$`,
                rozwiazanie: [
                  a === 1
                    ? `Jedna część to $${N} : ${b} = ${m}$ zł. Wydano jedną część, czyli $${m}$ zł.`
                    : `Jedna część to $${N} : ${b} = ${m}$ zł. Wydano $${a}$ ${mn(a, "część", "części", "części")}: $${m} \\cdot ${a} = ${a * m}$ zł.`,
                  `Zostało: $${N} - ${a * m} = ${zostalo}$ zł.`,
                ],
              };
            }
            return {
              tresc: `Ola przeczytała $${f}$ książki, czyli $${a * m}$ ${mn(a * m, "stronę", "strony", "stron")}. Ile stron ma cała książka?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba stron" }],
              odpowiedz: { w: N },
              wynik: `$${N}$`,
              rozwiazanie: [
                a === 1
                  ? `$${f}$ książki to $${m}$ ${mn(m, "stronę", "strony", "stron")} i to jest jedna część.`
                  : `$${f}$ książki to $${a * m}$ ${mn(a * m, "stronę", "strony", "stron")}. Dzielimy przez licznik: $${a * m} : ${a} = ${m}$ (to jedna część).`,
                `Cała książka to $${b}$ takich części: $${m} \\cdot ${b} = ${N}$.`,
                `Sprawdzenie: $${f}$ z $${N}$ to $${a * m}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "kolejnosc-dzialan",
      nazwa: "Kolejność wykonywania działań",
      sciaga: [
        {
          nazwa: "Kolejność działań",
          slownie: "Najpierw wykonujemy działania w nawiasach. Potem mnożenie i dzielenie, a na końcu dodawanie i odejmowanie. Działania tego samego rodzaju wykonujemy od lewej do prawej.",
          tex: "(\\ )\\ \\to\\ \\cdot\\ :\\ \\to\\ +\\ -",
          przyklad: "$\\frac{1}{2}+\\frac{3}{4}\\cdot\\frac{2}{3}=\\frac{1}{2}+\\frac{1}{2}=1$. Najpierw mnożenie, potem dodawanie.",
          uwaga: "Nie dodawaj przed mnożeniem. Gdyby dodać najpierw, wynik byłby błędny.",
        },
        {
          nazwa: "Nawiasy i ułamki",
          slownie: "Wyrażenie w nawiasie liczymy jako pierwsze. Wynik nawiasu traktujemy jak jedną liczbę.",
          tex: "(\\frac{1}{2}+\\frac{1}{3}):\\frac{5}{6}=1",
          przyklad: "Nawias: $\\frac{1}{2}+\\frac{1}{3}=\\frac{3}{6}+\\frac{2}{6}=\\frac{5}{6}$. Dzielenie: $\\frac{5}{6}:\\frac{5}{6}=1$.",
          uwaga: "Gdy nawias jest w wyrażeniu, nie rozdzielaj go. Najpierw policz całą jego zawartość.",
        },
        {
          nazwa: "Ułamki dziesiętne w wyrażeniach",
          slownie: "Zasady są te same. Mnożenie i dzielenie wykonujemy przed dodawaniem i odejmowaniem, a nawiasy przed wszystkim.",
          przyklad: "$5-0{,}4\\cdot3=5-1{,}2=3{,}8$. Z nawiasem: $(2{,}5+1{,}5):0{,}8=4:0{,}8=5$.",
          uwaga: "W $5-0{,}4\\cdot3$ nie odejmuj najpierw $0{,}4$ od $5$. Najpierw mnożenie.",
        },
        {
          nazwa: "Dzielenie i mnożenie od lewej",
          slownie: "Gdy w wyrażeniu są tylko mnożenie i dzielenie, liczymy po kolei od lewej strony.",
          tex: "12:\\frac{3}{4}\\cdot\\frac{1}{2}=16\\cdot\\frac{1}{2}=8",
          przyklad: "$12:\\frac{3}{4}=12\\cdot\\frac{4}{3}=16$. Potem $16\\cdot\\frac{1}{2}=8$.",
          uwaga: "Nie wykonuj mnożenia przed dzieleniem, gdy dzielenie stoi z lewej strony.",
        },
      ],
      jak: [
        "Zaznacz działania i ustal ich kolejność: nawiasy, potem mnożenie i dzielenie, na końcu dodawanie i odejmowanie.",
        "Licz po jednym działaniu naraz i zapisuj wynik, a resztę przepisuj.",
        "Ułamki zwykłe i dziesiętne wykonuj osobno, gdy to ułatwia, albo zamień je na jedną postać.",
        "Sprawdź wynik, np. szacując go w głowie.",
      ],
      zadania: [
        {
          nr: "36",
          tresc: "Ile wynosi $\\frac{1}{2}+\\frac{1}{3}\\cdot6$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$2\\frac{1}{2}$", "$\\frac{5}{6}$", "$2\\frac{1}{3}$"],
          poprawna: 1,
        },
        {
          nr: "37",
          tresc: "Ile wynosi $\\left(2\\frac{1}{2}-1\\frac{1}{4}\\right):\\frac{5}{8}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1\\frac{1}{4}$", "$\\frac{1}{2}$", "$2\\frac{1}{2}$", "$2$"],
          poprawna: 3,
        },
        {
          nr: "38",
          tresc: "Ile wynosi $8-1{,}5\\cdot4$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$26$", "$6{,}5$", "$2$", "$12$"],
          poprawna: 2,
        },
        {
          nr: "39",
          tresc: "Ile wynosi $6:\\frac{3}{4}\\cdot\\frac{1}{2}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$9$", "$16$", "$\\frac{1}{4}$"],
          poprawna: 0,
        },
        {
          nr: "40",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$2+3\\cdot\\frac{1}{3}=3$", litery: "PF", poprawna: 0 },
            { tekst: "$\\left(\\frac{1}{2}+\\frac{1}{2}\\right)\\cdot4=3$", litery: "PF", poprawna: 1 },
            { tekst: "$10-2\\cdot2{,}5=5$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "41",
          punkty: 2,
          tresc: "Oblicz wartość wyrażenia $\\left(3\\frac{1}{2}-1\\frac{3}{4}\\right):\\frac{7}{8}+2\\cdot\\frac{3}{4}$. **Zapisz obliczenia.**",
          rozwiazanie: "Najpierw nawias: $3\\frac{1}{2}-1\\frac{3}{4}=3\\frac{2}{4}-1\\frac{3}{4}=2\\frac{6}{4}-1\\frac{3}{4}=1\\frac{3}{4}=\\frac{7}{4}$.\n\nDzielenie: $\\frac{7}{4}:\\frac{7}{8}=\\frac{7}{4}\\cdot\\frac{8}{7}=2$.\n\nMnożenie: $2\\cdot\\frac{3}{4}=\\frac{6}{4}=1\\frac{1}{2}$.\n\nDodawanie: $2+1\\frac{1}{2}=3\\frac{1}{2}$.\n\nOdpowiedź: Wartość wyrażenia to $3\\frac{1}{2}$.",
        },
        {
          nr: "42",
          punkty: 3,
          tresc: "Kasia kupiła $2$ kg jabłek po $3{,}80$ zł za kilogram i $1{,}5$ kg gruszek po $4{,}60$ zł za kilogram. Zapłaciła banknotem $20$ zł. Zapisz jednym wyrażeniem, ile złotych reszty dostała, i oblicz jego wartość. **Zapisz obliczenia.**",
          rozwiazanie: "Wyrażenie: $20-(2\\cdot3{,}8+1{,}5\\cdot4{,}6)$.\n\nW nawiasie najpierw mnożenie: $2\\cdot3{,}8=7{,}6$ oraz $1{,}5\\cdot4{,}6=6{,}9$.\n\nDodajemy w nawiasie: $7{,}6+6{,}9=14{,}5$.\n\nOdejmujemy: $20-14{,}5=5{,}5$.\n\nOdpowiedź: Kasia dostała $5{,}50$ zł reszty.",
        },
      ],
      generatory: [
        {
          id: "kolejnosc",
          nazwa: "Kolejność działań",
          opis: "Oblicz wyrażenie z ułamkami zwykłymi albo dziesiętnymi, pamiętając o kolejności działań.",
          generuj(r) {
            const t = r.int(0, 3);
            if (t === 0) {
              for (;;) {
                const d1 = r.pick([2, 3, 4, 5, 6, 8]), d2 = r.pick([2, 3, 4, 5, 6, 8]);
                const A = q(r.int(1, 3 * d1), d1), B = q(r.int(1, d2 - 1), d2), C = r.int(2, 8);
                const X = B.mul(C);
                const minus = A.cmp(X) > 0 && r.chance(0.5);
                const res = minus ? A.sub(X) : A.add(X);
                if (res.d > 24 || res.cmp(0) <= 0) continue;
                const op = minus ? "-" : "+";
                return {
                  tresc: `Oblicz $${qm(A)} ${op} ${qf(B)} \\cdot ${C}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Wynik jako ułamek lub liczba" }],
                  odpowiedz: { w: res },
                  wynik: `$${qm(res)}$`,
                  rozwiazanie: [
                    `Najpierw mnożenie: $${qf(B)} \\cdot ${C} = ${qm(X)}$.`,
                    `Potem ${minus ? "odejmowanie" : "dodawanie"}: $${qm(A)} ${op} ${qm(X)} = ${qm(res)}$.`,
                  ],
                };
              }
            }
            if (t === 1) {
              for (;;) {
                const d1 = r.pick([2, 3, 4, 5, 6, 8]), d2 = r.pick([2, 3, 4, 5, 6, 8]);
                const A = q(r.int(1, d1 - 1), d1), B = q(r.int(1, d2 - 1), d2), N = r.int(2, 12);
                const minus = A.cmp(B) > 0 && r.chance(0.5);
                const S = minus ? A.sub(B) : A.add(B);
                const dziel = r.chance(0.4);
                const res = dziel ? S.div(N) : S.mul(N);
                if (res.d > 40 || res.cmp(0) <= 0) continue;
                const op = minus ? "-" : "+";
                return {
                  tresc: `Oblicz $\\left(${qf(A)} ${op} ${qf(B)}\\right) ${dziel ? ":" : "\\cdot"} ${N}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Wynik jako ułamek lub liczba" }],
                  odpowiedz: { w: res },
                  wynik: `$${qm(res)}$`,
                  rozwiazanie: [
                    `Najpierw nawias: $${qf(A)} ${op} ${qf(B)} = ${qm(S)}$.`,
                    `Potem ${dziel ? "dzielenie" : "mnożenie"}: $${qm(S)} ${dziel ? ":" : "\\cdot"} ${N} = ${qm(res)}$.`,
                  ],
                };
              }
            }
            if (t === 2) {
              const B = r.int(2, 9), c = r.int(2, 9);
              const minus = r.chance(0.5);
              let A;
              do { A = minus ? r.int(B * c + 10, 200) : r.int(11, 200); } while (A % 10 === 0);
              const X = q(B * c, 10), a = q(A, 10), b = q(B, 10);
              const res = minus ? a.sub(X) : a.add(X);
              const op = minus ? "-" : "+";
              return {
                tresc: `Oblicz $${fmtD(a)} ${op} ${fmtD(b)} \\cdot ${c}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w: res },
                wynik: `$${fmtD(res)}$`,
                rozwiazanie: [
                  `Najpierw mnożenie: $${fmtD(b)} \\cdot ${c} = ${fmtD(X)}$.`,
                  `Potem ${minus ? "odejmowanie" : "dodawanie"}: $${fmtD(a)} ${op} ${fmtD(X)} = ${fmtD(res)}$.`,
                ],
              };
            }
            for (;;) {
              const d = r.pick([2, 3, 4, 5, 6]), d2 = r.pick([2, 3, 4, 5, 6, 8]);
              const A = q(r.int(1, d - 1), d), B = q(r.int(1, d2 - 1), d2), N = r.int(2, 9);
              const X = q(N).div(A);
              const minus = r.chance(0.5);
              const res = minus ? X.sub(B) : X.add(B);
              if (res.d > 40 || res.cmp(0) <= 0) continue;
              const op = minus ? "-" : "+";
              return {
                tresc: `Oblicz $${N} : ${qf(A)} ${op} ${qf(B)}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik jako ułamek lub liczba" }],
                odpowiedz: { w: res },
                wynik: `$${qm(res)}$`,
                rozwiazanie: [
                  `Najpierw dzielenie: $${N} : ${qf(A)} = ${N} \\cdot ${fr(A.d, A.n)} = ${qm(X)}$.`,
                  `Potem ${minus ? "odejmowanie" : "dodawanie"}: $${qm(X)} ${op} ${qf(B)} = ${qm(res)}$.`,
                ],
              };
            }
          },
        },
      ],
    },
  ],
};
