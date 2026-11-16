// Klasa 7 (szkoła podstawowa) · rozdział V „Równania” – Matematyka z kluczem 7 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Tylko równania pierwszego stopnia z jedną niewiadomą: bez układów równań, bez nierówności, bez równań kwadratowych.
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** Powtarza losowanie, aż f() zwróci zadanie (wartość różną od null); f używa tego samego losownika, więc wynik jest powtarzalny. */
function probuj(f, proby = 2000) {
  for (let i = 0; i < proby; i++) {
    const w = f();
    if (w) return w;
  }
  throw new Error("Nie udało się wylosować zadania");
}

/** Zapis dziesiętny z przecinkiem do wzoru: dz(q(12, 10)) = "1{,}2". */
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

/** Liczba ujemna w nawiasie: nz(-3) = "(-3)". */
const nz = (n) => (n < 0 ? `(${n})` : `${n}`);

/** Wyraz bez znaku wiodącego: czlon(3, "x") = "3x", czlon(1, "x") = "x", czlon(5, "") = "5". */
function czlon(c, v) {
  const a = Math.abs(c);
  return v ? (a === 1 ? v : `${a}${v}`) : `${a}`;
}

/** Suma algebraiczna ze składników [współczynnik, litera]: wyr([[3, "x"], [-1, ""], [5, ""]]) = "3x - 1 + 5". */
function wyr(t) {
  let s = "";
  for (const [c, v] of t) {
    if (c === 0) continue;
    if (!s) s = `${c < 0 ? "-" : ""}${czlon(c, v)}`;
    else s += ` ${c < 0 ? "-" : "+"} ${czlon(c, v)}`;
  }
  return s || "0";
}

/** "p - s" z poprawnym znakiem: odejmij(5, 3) = "5 - 3", odejmij(5, -3) = "5 + 3". */
const odejmij = (p, s) => `${p} ${s < 0 ? "+" : "-"} ${Math.abs(s)}`;

/** Iloczyn z liczbą doklejoną ze znakiem: dzialanie(3, 4, -2) = "3 \\cdot 4 - 2"; dla b = 0 bez doklejki. */
const dzialanie = (c, x, b) => `${c} \\cdot ${nz(x)}${b === 0 ? "" : ` ${b < 0 ? "-" : "+"} ${Math.abs(b)}`}`;

/** Polska odmiana: mn(n, "rok", "lata", "lat"). */
const mn = (n, a, b, c) => (n === 1 ? a : n % 10 >= 2 && n % 10 <= 4 && !(n % 100 >= 12 && n % 100 <= 14) ? b : c);
const lat = (n) => mn(n, "rok", "lata", "lat");

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });
const nonzero = (r, a, b) => r.intBez(a, b, 0);

/** Zadanie z wyborem jednej z czterech odpowiedzi. */
function wybor(r, { tresc, etykieta, poprawne, bledne, rozwiazanie, wynik }) {
  const opcje = r.shuffle([poprawne, ...bledne]).map((o) => `$${o}$`);
  return {
    tresc,
    pola: [{ id: "w", typ: "wybor", etykieta, opcje }],
    odpowiedz: { w: opcje.indexOf(`$${poprawne}$`) },
    wynik: wynik ?? `$${poprawne}$`,
    rozwiazanie,
  };
}

// --- Wzory do generatora „Przekształć wzór”: iloczyn, połowa iloczynu, obwód, suma.

function wzoryZLiter() {
  const lista = [];
  const dodaj = (wzor, szuk, poprawne, bledne, kroki) => lista.push({ wzor, szuk, poprawne, bledne, kroki });
  const iloczyn = ([X, Y, Z]) => {
    const w = `${X} = ${Y} \\cdot ${Z}`;
    dodaj(w, Y, `\\frac{${X}}{${Z}}`, [`${X} \\cdot ${Z}`, `\\frac{${Z}}{${X}}`, `${X} - ${Z}`],
      [`Chcemy mieć $${Y}$ samo po jednej stronie. Dzielimy obie strony wzoru przez $${Z}$.`, `Otrzymujemy $${Y} = \\frac{${X}}{${Z}}$.`]);
    dodaj(w, Z, `\\frac{${X}}{${Y}}`, [`${X} \\cdot ${Y}`, `\\frac{${Y}}{${X}}`, `${X} - ${Y}`],
      [`Chcemy mieć $${Z}$ samo po jednej stronie. Dzielimy obie strony wzoru przez $${Y}$.`, `Otrzymujemy $${Z} = \\frac{${X}}{${Y}}$.`]);
  };
  const trojkat = ([X, Y, Z]) => {
    const w = `${X} = \\frac{${Y} \\cdot ${Z}}{2}`;
    dodaj(w, Y, `\\frac{2${X}}{${Z}}`, [`\\frac{${X}}{2${Z}}`, `\\frac{${X} \\cdot ${Z}}{2}`, `2${X} \\cdot ${Z}`],
      [`Mnożymy obie strony wzoru przez $2$, żeby zniknął ułamek: $2${X} = ${Y} \\cdot ${Z}$.`, `Dzielimy obie strony przez $${Z}$: $${Y} = \\frac{2${X}}{${Z}}$.`]);
    dodaj(w, Z, `\\frac{2${X}}{${Y}}`, [`\\frac{${X}}{2${Y}}`, `\\frac{${X} \\cdot ${Y}}{2}`, `2${X} \\cdot ${Y}`],
      [`Mnożymy obie strony wzoru przez $2$, żeby zniknął ułamek: $2${X} = ${Y} \\cdot ${Z}$.`, `Dzielimy obie strony przez $${Y}$: $${Z} = \\frac{2${X}}{${Y}}$.`]);
  };
  const obwod = ([X, Y, Z]) => {
    const w = `${X} = 2${Y} + 2${Z}`;
    dodaj(w, Y, `\\frac{${X} - 2${Z}}{2}`, [`${X} - 2${Z}`, `\\frac{${X} + 2${Z}}{2}`, `\\frac{${X} - ${Z}}{2}`],
      [`Odejmujemy $2${Z}$ od obu stron: $${X} - 2${Z} = 2${Y}$.`, `Dzielimy obie strony przez $2$: $${Y} = \\frac{${X} - 2${Z}}{2}$.`]);
    dodaj(w, Z, `\\frac{${X} - 2${Y}}{2}`, [`${X} - 2${Y}`, `\\frac{${X} + 2${Y}}{2}`, `\\frac{${X} - ${Y}}{2}`],
      [`Odejmujemy $2${Y}$ od obu stron: $${X} - 2${Y} = 2${Z}$.`, `Dzielimy obie strony przez $2$: $${Z} = \\frac{${X} - 2${Y}}{2}$.`]);
  };
  const suma = ([X, Y, Z]) => {
    const w = `${X} = ${Y} + ${Z}`;
    dodaj(w, Y, `${X} - ${Z}`, [`${X} + ${Z}`, `${Z} - ${X}`, `${X} \\cdot ${Z}`],
      [`Chcemy mieć $${Y}$ samo po jednej stronie, więc odejmujemy $${Z}$ od obu stron.`, `Otrzymujemy $${Y} = ${X} - ${Z}$.`]);
    dodaj(w, Z, `${X} - ${Y}`, [`${X} + ${Y}`, `${Y} - ${X}`, `${X} \\cdot ${Y}`],
      [`Chcemy mieć $${Z}$ samo po jednej stronie, więc odejmujemy $${Y}$ od obu stron.`, `Otrzymujemy $${Z} = ${X} - ${Y}$.`]);
  };
  [["P", "a", "h"], ["s", "v", "t"], ["C", "n", "c"], ["m", "d", "V"], ["F", "m", "a"]].forEach(iloczyn);
  [["P", "a", "h"], ["P", "a", "b"], ["P", "b", "h"]].forEach(trojkat);
  [["Ob", "a", "b"], ["Ob", "x", "y"], ["Ob", "m", "n"]].forEach(obwod);
  [["c", "a", "b"], ["S", "x", "y"], ["w", "p", "r"]].forEach(suma);
  return lista;
}
const WZORY = wzoryZLiter();

const RZECZY = [
  { n: "rower", k: "kosztował" },
  { n: "plecak", k: "kosztował" },
  { n: "telefon", k: "kosztował" },
  { n: "bilet", k: "kosztował" },
  { n: "kurtka", k: "kosztowała" },
  { n: "gra komputerowa", k: "kosztowała" },
  { n: "książka", k: "kosztowała" },
];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Co to jest równanie
    {
      id: "co-to-jest-rownanie",
      nazwa: "Co to jest równanie",
      sciaga: [
        {
          nazwa: "Równanie i niewiadoma",
          slownie: "Równanie to dwa wyrażenia połączone znakiem równości. Litera, której wartości szukamy, to niewiadoma. Po lewej stronie znaku $=$ jest lewa strona równania, a po prawej prawa strona.",
          tex: "x+5=12",
          litery: "$x$ – niewiadoma.",
          przyklad: "W równaniu $x+5=12$ lewa strona to $x+5$, a prawa to $12$. Pytamy: jaką liczbę trzeba dodać do $5$, żeby dostać $12$?",
        },
        {
          nazwa: "Rozwiązanie równania",
          slownie: "Rozwiązaniem równania jest liczba, która po wstawieniu w miejsce niewiadomej daje równość. Rozwiązać równanie to znaleźć taką liczbę.",
          przyklad: "Dla $x=7$ mamy $7+5=12$, więc $7$ jest rozwiązaniem równania $x+5=12$. Liczba $8$ nim nie jest, bo $8+5=13$, a to nie jest $12$.",
          uwaga: "Liczbę ujemną wstawiamy w nawiasie. Dla $x=-2$ w równaniu $3x+1=-5$ liczymy $3\\cdot(-2)+1$.",
        },
        {
          nazwa: "Sprawdzanie rozwiązania",
          slownie: "Aby sprawdzić, czy liczba jest rozwiązaniem, osobno liczymy lewą stronę $L$ i prawą stronę $P$. Jeśli wyjdzie to samo, liczba jest rozwiązaniem.",
          tex: "L=P",
          litery: "$L$ – wartość lewej strony, $P$ – wartość prawej strony.",
          przyklad: "Czy $x=4$ jest rozwiązaniem równania $3x-2=10$? $L=3\\cdot4-2=10$ i $P=10$. Tak, bo $L=P$.",
          uwaga: "Każdą stronę licz osobno. Nie przenoś wyniku z jednej strony na drugą.",
        },
        {
          nazwa: "Zapisywanie równania",
          slownie: "Zadanie opisane słowami zamieniamy na równanie: niewiadomą oznaczamy literą, zapisujemy wyrażenia i łączymy je znakiem $=$.",
          przyklad: "Ola ma $x$ lat, a za $4$ lata będzie miała $15$ lat: $x+4=15$. Liczba $x$ pomnożona przez $3$ i zmniejszona o $2$ daje $19$: $3x-2=19$.",
          uwaga: "„Liczba o $5$ większa od podwojonej liczby $x$” to $2x+5$, a nie $2(x+5)$.",
        },
      ],
      jak: [
        "Zapisz równanie i zobacz, co jest jego lewą, a co prawą stroną.",
        "Wstaw sprawdzaną liczbę w miejsce niewiadomej (liczbę ujemną w nawiasie).",
        "Policz osobno lewą i prawą stronę.",
        "Jeśli obie strony są równe, liczba jest rozwiązaniem. Jeśli nie, nie jest.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Ola ma $x$ lat. Za $4$ lata będzie miała $15$ lat. Które równanie opisuje tę sytuację? **Wybierz właściwą odpowiedź.**",
          opcje: ["$x-4=15$", "$x+4=15$", "$4x=15$", "$x+15=4$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Która liczba jest rozwiązaniem równania $3x-4=11$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$7$", "$15$", "$5$"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "Sprawdzamy, czy liczba $4$ jest rozwiązaniem równań. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Liczba $4$ jest rozwiązaniem równania $2x+3=11$.", litery: "PF", poprawna: 0 },
            { tekst: "Liczba $4$ jest rozwiązaniem równania $5x-6=15$.", litery: "PF", poprawna: 1 },
            { tekst: "Liczba $4$ jest rozwiązaniem równania $3(x-1)=9$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "4",
          tresc: "Liczba o $7$ większa od podwojonej liczby $x$ jest równa $19$. Które równanie opisuje tę sytuację? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2(x+7)=19$", "$2x-7=19$", "$x+7=19$", "$2x+7=19$"],
          poprawna: 3,
        },
        {
          nr: "5",
          tresc: "Które równanie ma rozwiązanie $x=-2$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$x+5=3$", "$2x=4$", "$x-2=0$", "$3x+1=7$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Kasia myśli o pewnej liczbie. Gdy pomnoży ją przez $3$ i odejmie $5$, dostanie $16$. Zapisz równanie opisujące tę sytuację. Sprawdź, czy liczba $7$ jest jego rozwiązaniem. **Zapisz obliczenia.**",
          rozwiazanie: "Niewiadoma: $x$ – liczba, o której myśli Kasia.\n\nRównanie: $3x-5=16$.\n\nDla $x=7$: $L=3\\cdot7-5=21-5=16$ oraz $P=16$.\n\nLewa strona jest równa prawej, więc liczba $7$ jest rozwiązaniem.\n\nOdpowiedź: Równanie to $3x-5=16$, a liczba $7$ jest jego rozwiązaniem.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Paweł miał $x$ zł. Kupił bilet za $12$ zł i zostało mu $18$ zł. Zapisz równanie opisujące tę sytuację. Sprawdź, czy Paweł mógł mieć na początku $20$ zł, a czy $30$ zł. **Zapisz obliczenia.**",
          rozwiazanie: "Po zakupie Paweł miał $x-12$ zł, a to jest $18$ zł.\n\nRównanie: $x-12=18$.\n\nDla $x=20$: $L=20-12=8$, a $P=18$. Strony nie są równe.\n\nDla $x=30$: $L=30-12=18$ oraz $P=18$. Strony są równe.\n\nOdpowiedź: Równanie to $x-12=18$. Paweł miał na początku $30$ zł, a nie $20$ zł.",
        },
      ],
      generatory: [
        {
          id: "ktora-liczba",
          nazwa: "Która liczba pasuje?",
          opis: "Wybierz liczbę, która jest rozwiązaniem równania. Sprawdź ją, wstawiając w miejsce niewiadomej.",
          generuj(r) {
            const v = r.pick(["x", "y", "n", "t"]);
            return probuj(() => {
              const a = r.int(2, 7);
              const b = nonzero(r, -9, 9);
              const x = nonzero(r, -6, 8);
              const c = a * x + b;
              const kand = [c - b, c + b, -x, x + 1, x - 1, x + 2];
              const bledne = [];
              for (const k of kand) if (k !== x && !bledne.includes(k) && bledne.length < 3) bledne.push(k);
              if (bledne.length < 3) return null;
              const rownanie = `${wyr([[a, v], [b, ""]])} = ${c}`;
              const o = bledne[0];
              return wybor(r, {
                tresc: `Która z podanych liczb jest rozwiązaniem równania $${rownanie}$?`,
                etykieta: "Rozwiązanie",
                poprawne: `${x}`,
                bledne: bledne.map(String),
                wynik: `$${v} = ${x}$`,
                rozwiazanie: [
                  `Wstawiamy $${v} = ${x}$ i liczymy lewą stronę: $L = ${dzialanie(a, x, b)} = ${c}$.`,
                  `Prawa strona to $P = ${c}$, więc $L = P$ i liczba $${x}$ jest rozwiązaniem.`,
                  `Dla porównania $${v} = ${o}$ daje $L = ${dzialanie(a, o, b)} = ${a * o + b}$, a to nie jest $${c}$.`,
                ],
              });
            });
          },
        },
        {
          id: "opis-na-rownanie",
          nazwa: "Opis na równanie",
          opis: "Wybierz równanie, które opisuje sytuację z zadania (wiek, cena, liczba, pieniądze).",
          generuj(r) {
            const typ = r.int(0, 3);
            let tresc, poprawne, bledne, kroki;
            if (typ === 0) {
              const A = r.pick(["Ania", "Kasia", "Ola", "Zosia"]);
              const k = r.int(2, 9);
              const m = k + r.int(5, 15);
              tresc = `${A} ma $x$ ${lat(11)}. Za $${k}$ ${lat(k)} będzie miała $${m}$ ${lat(m)}. Które równanie opisuje tę sytuację?`;
              poprawne = `x + ${k} = ${m}`;
              bledne = [`x - ${k} = ${m}`, `${k}x = ${m}`, `x + ${m} = ${k}`];
              kroki = [`Za $${k}$ ${lat(k)} wiek ${A} to teraźniejszy wiek plus $${k}$: $x + ${k}$.`, `Ma to być $${m}$, więc $x + ${k} = ${m}$.`];
            } else if (typ === 1) {
              const k = r.int(3, 9);
              const x0 = r.int(2, 9);
              const m = k * x0;
              tresc = `Zeszyt kosztuje $x$ zł. Za $${k}$ ${mn(k, "zeszyt", "zeszyty", "zeszytów")} zapłacono $${m}$ zł. Które równanie opisuje tę sytuację?`;
              poprawne = `${k}x = ${m}`;
              bledne = [`x + ${k} = ${m}`, `x : ${k} = ${m}`, `x = ${k} + ${m}`];
              kroki = [`Cena $${k}$ zeszytów to liczba zeszytów razy cena jednego: $${k}x$.`, `Ma to być $${m}$ zł, więc $${k}x = ${m}$.`];
            } else if (typ === 2) {
              const k = r.int(2, 6);
              const n = r.int(2, 9);
              const m = k * r.int(2, 9) + n;
              tresc = `Pewną liczbę $x$ pomnożono przez $${k}$ i do wyniku dodano $${n}$. Otrzymano $${m}$. Które równanie opisuje tę sytuację?`;
              poprawne = `${k}x + ${n} = ${m}`;
              bledne = [`${k}(x + ${n}) = ${m}`, `${k}x - ${n} = ${m}`, `x + ${k} + ${n} = ${m}`];
              kroki = [`Najpierw mnożymy: $${k}x$. Potem dodajemy $${n}$: $${k}x + ${n}$.`, `Wynik to $${m}$, więc $${k}x + ${n} = ${m}$.`];
            } else {
              const A = r.pick(["Ula", "Ewa", "Marta", "Basia"]);
              const n = r.int(3, 15);
              const m = r.int(5, 20);
              tresc = `${A} miała $x$ zł. Wydała $${n}$ zł i zostało jej $${m}$ zł. Które równanie opisuje tę sytuację?`;
              poprawne = `x - ${n} = ${m}`;
              bledne = [`x + ${n} = ${m}`, `${n} - x = ${m}`, `${n}x = ${m}`];
              kroki = [`Po wydaniu pieniędzy zostało $x - ${n}$ zł.`, `Zostało $${m}$ zł, więc $x - ${n} = ${m}$.`];
            }
            return wybor(r, { tresc, etykieta: "Równanie", poprawne, bledne, rozwiazanie: kroki });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Rozwiązywanie równań
    {
      id: "rozwiazywanie-rownan",
      nazwa: "Rozwiązywanie równań",
      sciaga: [
        {
          nazwa: "Zasada wagi",
          slownie: "Równanie jest jak waga w równowadze. Gdy po obu stronach dodamy, odejmiemy, pomnożymy albo podzielimy przez tę samą liczbę (różną od zera), rozwiązanie się nie zmieni.",
          tex: "ax=b\\qquad x=\\frac{b}{a}",
          litery: "$a$ – liczba różna od zera.",
          przyklad: "W równaniu $x+5=12$ odejmujemy $5$ od obu stron i dostajemy $x=7$. W równaniu $4x=20$ dzielimy obie strony przez $4$ i dostajemy $x=5$.",
          uwaga: "Robimy to samo po obu stronach, a nie tylko po jednej.",
        },
        {
          nazwa: "Liczba i niewiadoma",
          slownie: "W równaniu $ax+b=c$ najpierw pozbywamy się dodanej lub odjętej liczby, a potem dzielimy przez liczbę stojącą przy niewiadomej.",
          tex: "ax+b=c",
          przyklad: "$3x+4=19$. Odejmujemy $4$: $3x=15$. Dzielimy przez $3$: $x=5$. Sprawdzenie: $3\\cdot5+4=19$.",
          uwaga: "Z $3x+4=19$ nie dostaniemy $3x=19$. Liczbę $4$ odejmujemy od obu stron.",
        },
        {
          nazwa: "Niewiadoma po obu stronach",
          slownie: "Wyrazy z niewiadomą zbieramy po jednej stronie, a same liczby po drugiej. Gdy przenosimy wyraz na drugą stronę, zmieniamy jego znak.",
          przyklad: "$5x-3=2x+9$. Odejmujemy $2x$: $3x-3=9$. Dodajemy $3$: $3x=12$. Dzielimy przez $3$: $x=4$. Sprawdzenie: $L=5\\cdot4-3=17$ i $P=2\\cdot4+9=17$.",
          uwaga: "Przenosząc wyraz, zmień jego znak: $-3$ po drugiej stronie to $+3$.",
        },
        {
          nazwa: "Nawiasy i ułamki",
          slownie: "Najpierw opuszczamy nawiasy, tak jak w poprzednim rozdziale. Gdy w równaniu jest ułamek, mnożymy obie strony przez mianownik.",
          przyklad: "$2(x+3)=14$. Opuszczamy nawias: $2x+6=14$, więc $2x=8$ i $x=4$. Dla $\\frac{x}{3}+1=5$ mamy $\\frac{x}{3}=4$. Mnożymy przez $3$ i dostajemy $x=12$.",
          uwaga: "Mnożymy każdy wyraz, także ten bez ułamka: $\\frac{x}{3}+1=5$ po pomnożeniu przez $3$ daje $x+3=15$.",
        },
        {
          nazwa: "Brak rozwiązania lub wiele",
          slownie: "Czasem po uproszczeniu niewiadoma znika. Gdy zostaje nieprawda (np. $3=7$), równanie nie ma rozwiązania. Gdy zostaje prawda (np. $4=4$), spełnia je każda liczba.",
          przyklad: "$2x+3=2x+7$: po odjęciu $2x$ mamy $3=7$, więc nie ma rozwiązania. $2(x+1)=2x+2$: mamy $2x+2=2x+2$, więc każda liczba jest rozwiązaniem.",
        },
      ],
      jak: [
        "Opuść nawiasy, pozbądź się ułamków (mnożąc obie strony przez mianownik) i zredukuj wyrazy podobne.",
        "Zbierz wyrazy z niewiadomą po jednej stronie, a liczby po drugiej. Przenosząc, zmień znak.",
        "Podziel obie strony przez liczbę stojącą przy niewiadomej.",
        "Sprawdź wynik: policz osobno lewą i prawą stronę.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Jakie jest rozwiązanie równania $4x-7=17$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$x=6$", "$x=\\frac{5}{2}$", "$x=-6$", "$x=24$"],
          poprawna: 0,
        },
        {
          nr: "9",
          tresc: "Jakie jest rozwiązanie równania $7x-5=3x+11$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$x=\\frac{3}{2}$", "$x=4$", "$x=\\frac{8}{5}$", "$x=-4$"],
          poprawna: 1,
        },
        {
          nr: "10",
          tresc: "Jakie jest rozwiązanie równania $3(x-2)=2x+5$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$x=7$", "$x=-1$", "$x=11$", "$x=\\frac{11}{5}$"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "Jakie jest rozwiązanie równania $\\frac{x}{4}+3=7$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$x=4$", "$x=1$", "$x=40$", "$x=16$"],
          poprawna: 3,
        },
        {
          nr: "12",
          tresc: "Dane są trzy równania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Równanie $2(x+3)=2x+6$ ma nieskończenie wiele rozwiązań.", litery: "PF", poprawna: 0 },
            { tekst: "Równanie $3x+1=3x+4$ ma jedno rozwiązanie.", litery: "PF", poprawna: 1 },
            { tekst: "Równanie $5x=0$ ma rozwiązanie $x=0$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "13",
          tresc: "Jakie jest rozwiązanie równania $5-x=2$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$x=7$", "$x=3$", "$x=-3$", "$x=-7$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "14",
          punkty: 2,
          tresc: "Rozwiąż równanie $4(x-3)=2x+10$ i sprawdź rozwiązanie. **Zapisz obliczenia.**",
          rozwiazanie: "Opuszczamy nawias: $4x-12=2x+10$.\n\nOdejmujemy $2x$ od obu stron: $2x-12=10$.\n\nDodajemy $12$ do obu stron: $2x=22$.\n\nDzielimy przez $2$: $x=11$.\n\nSprawdzenie: $L=4\\cdot(11-3)=32$ oraz $P=2\\cdot11+10=32$.\n\nOdpowiedź: $x=11$.",
        },
        {
          nr: "15",
          punkty: 3,
          tresc: "Rozwiąż równanie $\\frac{x}{2}+\\frac{x}{3}=10$ i sprawdź rozwiązanie. **Zapisz obliczenia.**",
          rozwiazanie: "Mianowniki to $2$ i $3$, więc mnożymy obie strony przez $6$.\n\nKażdy wyraz mnożymy przez $6$: $3x+2x=60$.\n\nRedukujemy: $5x=60$.\n\nDzielimy przez $5$: $x=12$.\n\nSprawdzenie: $L=\\frac{12}{2}+\\frac{12}{3}=6+4=10$ oraz $P=10$.\n\nOdpowiedź: $x=12$.",
        },
      ],
      generatory: [
        {
          id: "proste-rownanie",
          nazwa: "Liczba i niewiadoma",
          opis: "Rozwiąż równanie postaci $ax+b=c$. Odejmij (albo dodaj) liczbę, a potem podziel.",
          generuj(r) {
            const v = r.pick(["x", "y", "n", "t"]);
            const a = r.int(2, 9);
            const b = nonzero(r, -12, 12);
            const x = nonzero(r, -6, 9);
            const c = a * x + b;
            return {
              tresc: `Rozwiąż równanie $${wyr([[a, v], [b, ""]])} = ${c}$.`,
              pola: [pole("x", `$${v} =$`)],
              odpowiedz: { x: q(x) },
              wynik: `$${v} = ${x}$`,
              rozwiazanie: [
                `${b > 0 ? "Odejmujemy" : "Dodajemy"} $${Math.abs(b)}$ ${b > 0 ? "od" : "do"} obu stron: $${a}${v} = ${odejmij(c, b)} = ${c - b}$.`,
                `Dzielimy obie strony przez $${a}$: $${v} = ${c - b} : ${a} = ${x}$.`,
                `Sprawdzenie: $L = ${dzialanie(a, x, b)} = ${c}$ i $P = ${c}$.`,
              ],
            };
          },
        },
        {
          id: "obie-strony-nawiasy",
          nazwa: "Nawiasy i ułamki",
          opis: "Rozwiąż równanie z niewiadomą po obu stronach, z nawiasem albo z ułamkiem.",
          generuj(r) {
            const v = r.pick(["x", "y", "n", "t"]);
            const forma = r.int(0, 2);
            if (forma === 0) {
              return probuj(() => {
                const c = r.int(1, 6);
                const a = c + r.int(1, 5);
                const b = nonzero(r, -9, 9);
                const x = nonzero(r, -6, 9);
                const d = (a - c) * x + b;
                const w = a - c;
                const kroki = [
                  `Zbieramy niewiadomą po lewej stronie, a liczby po prawej: $${wyr([[a, v]])} - ${wyr([[c, v]])} = ${odejmij(d, b)}$.`,
                  `Redukujemy: $${wyr([[w, v]])} = ${d - b}$.`,
                ];
                if (w !== 1) kroki.push(`Dzielimy obie strony przez $${w}$: $${v} = ${d - b} : ${w} = ${x}$.`);
                kroki.push(`Sprawdzenie: $L = ${dzialanie(a, x, b)} = ${a * x + b}$ i $P = ${dzialanie(c, x, d)} = ${c * x + d}$.`);
                return {
                  tresc: `Rozwiąż równanie $${wyr([[a, v], [b, ""]])} = ${wyr([[c, v], [d, ""]])}$.`,
                  pola: [pole("x", `$${v} =$`)],
                  odpowiedz: { x: q(x) },
                  wynik: `$${v} = ${x}$`,
                  rozwiazanie: kroki,
                };
              });
            }
            if (forma === 1) {
              return probuj(() => {
                const k = r.int(2, 5);
                const m = r.int(1, k - 1);
                const a = nonzero(r, -6, 6);
                const x = nonzero(r, -5, 8);
                const n = (k - m) * x + k * a;
                const w = k - m;
                const kroki = [
                  `Opuszczamy nawias: $${wyr([[k, v], [k * a, ""]])} = ${wyr([[m, v], [n, ""]])}$.`,
                  `Zbieramy niewiadomą po lewej stronie, a liczby po prawej: $${wyr([[k, v]])} - ${wyr([[m, v]])} = ${odejmij(n, k * a)}$.`,
                  `Redukujemy: $${wyr([[w, v]])} = ${n - k * a}$.`,
                ];
                if (w !== 1) kroki.push(`Dzielimy obie strony przez $${w}$: $${v} = ${n - k * a} : ${w} = ${x}$.`);
                kroki.push(`Sprawdzenie: $L = ${k} \\cdot (${x + a}) = ${k * (x + a)}$ i $P = ${dzialanie(m, x, n)} = ${m * x + n}$.`);
                return {
                  tresc: `Rozwiąż równanie $${k}(${wyr([[1, v], [a, ""]])}) = ${wyr([[m, v], [n, ""]])}$.`,
                  pola: [pole("x", `$${v} =$`)],
                  odpowiedz: { x: q(x) },
                  wynik: `$${v} = ${x}$`,
                  rozwiazanie: kroki,
                };
              });
            }
            const d = r.int(2, 5);
            const e = nonzero(r, -5, 6);
            const f = e + r.int(1, 10);
            const x = d * (f - e);
            return {
              tresc: `Rozwiąż równanie $\\frac{${v}}{${d}} ${e < 0 ? "-" : "+"} ${Math.abs(e)} = ${f}$.`,
              pola: [pole("x", `$${v} =$`)],
              odpowiedz: { x: q(x) },
              wynik: `$${v} = ${x}$`,
              rozwiazanie: [
                `${e > 0 ? "Odejmujemy" : "Dodajemy"} $${Math.abs(e)}$ ${e > 0 ? "od" : "do"} obu stron: $\\frac{${v}}{${d}} = ${odejmij(f, e)} = ${f - e}$.`,
                `Mnożymy obie strony przez $${d}$: $${v} = ${f - e} \\cdot ${d} = ${x}$.`,
                `Sprawdzenie: $L = \\frac{${x}}{${d}} ${e < 0 ? "-" : "+"} ${Math.abs(e)} = ${f - e} ${e < 0 ? "-" : "+"} ${Math.abs(e)} = ${f}$ i $P = ${f}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Zadania tekstowe
    {
      id: "zadania-tekstowe",
      nazwa: "Zadania tekstowe",
      sciaga: [
        {
          nazwa: "Jak ułożyć równanie",
          slownie: "Oznaczamy niewiadomą literą, pozostałe wielkości zapisujemy za pomocą tej litery, układamy równanie i je rozwiązujemy. Na końcu sprawdzamy wynik z treścią zadania.",
          przyklad: "Ala ma o $3$ zł więcej niż Basia. Razem mają $27$ zł. Basia ma $x$ zł, Ala ma $x+3$ zł. Równanie: $x+x+3=27$, czyli $2x=24$ i $x=12$. Basia ma $12$ zł, a Ala $15$ zł.",
          uwaga: "Odpowiedz na pytanie z zadania. Szukana liczba to czasem $x$, a czasem np. $x+3$.",
        },
        {
          nazwa: "Wiek i liczby",
          slownie: "Gdy jedna wielkość jest o $d$ większa od drugiej, zapisujemy $x+d$. Gdy jest $k$ razy większa, zapisujemy $kx$.",
          przyklad: "Mama jest $4$ razy starsza od Kasi. Razem mają $40$ lat. Kasia ma $x$ lat, mama ma $4x$ lat. $x+4x=40$, $5x=40$, $x=8$. Kasia ma $8$ lat, a mama $32$ lata.",
          uwaga: "„$4$ razy starsza” to $4x$, a nie $x+4$.",
        },
        {
          nazwa: "Kolejne liczby",
          slownie: "Kolejne liczby naturalne różnią się o $1$, więc zapisujemy je tak: $n$, $n+1$, $n+2$.",
          tex: "n,\\ n+1,\\ n+2",
          przyklad: "Suma trzech kolejnych liczb naturalnych to $48$. $n+(n+1)+(n+2)=48$, czyli $3n+3=48$ i $n=15$. Te liczby to $15$, $16$ i $17$.",
          uwaga: "Kolejne liczby parzyste różnią się o $2$: $n$, $n+2$, $n+4$.",
        },
        {
          nazwa: "Ceny i obwód",
          slownie: "Cenę kilku sztuk zapisujemy jako liczbę sztuk razy cena jednej sztuki. Obwód prostokąta to dwa razy suma jego boków.",
          przyklad: "Za $3$ zeszyty i długopis za $4$ zł zapłacono $19$ zł. $3x+4=19$, $3x=15$, $x=5$. Zeszyt kosztuje $5$ zł. Prostokąt o bokach $x$ i $x+3$ ma obwód $34$: $2x+2(x+3)=34$, $4x+6=34$, $x=7$.",
          uwaga: "Cena długopisu nie jest razy $3$, bo kupiono tylko jeden.",
        },
      ],
      jak: [
        "Przeczytaj zadanie i ustal, czego szukasz. Oznacz to literą, np. $x$.",
        "Pozostałe wielkości zapisz za pomocą $x$ (o więcej: $+$, razy więcej: mnożenie).",
        "Ułóż równanie z informacji o sumie, cenie albo obwodzie.",
        "Rozwiąż równanie.",
        "Sprawdź wynik z treścią zadania i napisz odpowiedź.",
      ],
      zadania: [
        {
          nr: "16",
          tresc: "Zeszyt kosztuje $x$ zł. Za $5$ zeszytów i długopis za $3$ zł zapłacono $28$ zł. Które równanie opisuje tę sytuację? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5(x+3)=28$", "$5x+3=28$", "$x+5+3=28$", "$5x-3=28$"],
          poprawna: 1,
        },
        {
          nr: "17",
          tresc: "Suma trzech kolejnych liczb naturalnych jest równa $72$. Jaka jest najmniejsza z tych liczb? **Wybierz właściwą odpowiedź.**",
          opcje: ["$24$", "$25$", "$23$", "$69$"],
          poprawna: 2,
        },
        {
          nr: "18",
          tresc: "Brat jest o $5$ lat starszy od siostry. Razem mają $31$ lat. Ile lat ma siostra? **Wybierz właściwą odpowiedź.**",
          opcje: ["$13$ lat", "$18$ lat", "$26$ lat", "$15{,}5$ roku"],
          poprawna: 0,
        },
        {
          nr: "19",
          tresc: "Jeden bok prostokąta jest o $4$ cm dłuższy od drugiego. Obwód prostokąta wynosi $40$ cm. Ile centymetrów ma krótszy bok? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$ cm", "$10$ cm", "$16$ cm", "$8$ cm"],
          poprawna: 3,
        },
        {
          nr: "20",
          tresc: "Kasia ma $x$ zł. Ania ma o $6$ zł więcej niż Kasia. Razem mają $50$ zł. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Sytuację opisuje równanie $x+(x+6)=50$.", litery: "PF", poprawna: 0 },
            { tekst: "Kasia ma $28$ zł.", litery: "PF", poprawna: 1 },
            { tekst: "Ania ma $28$ zł.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "21",
          punkty: 3,
          tresc: "Michał ma $3$ razy więcej naklejek niż Tomek. Gdyby Tomek dostał jeszcze $10$ naklejek, miałby ich tyle samo co Michał. Ile naklejek ma Tomek, a ile Michał? **Zapisz obliczenia.**",
          rozwiazanie: "Tomek ma $x$ naklejek, Michał ma $3x$ naklejek.\n\nPo dostaniu $10$ naklejek Tomek ma $x+10$, a to tyle, co Michał: $x+10=3x$.\n\nOdejmujemy $x$ od obu stron: $10=2x$.\n\nDzielimy przez $2$: $x=5$.\n\nMichał ma $3\\cdot5=15$ naklejek.\n\nSprawdzenie: $5+10=15$.\n\nOdpowiedź: Tomek ma $5$ naklejek, a Michał $15$.",
        },
        {
          nr: "22",
          punkty: 3,
          tresc: "Za $4$ bilety normalne i $2$ bilety ulgowe do kina zapłacono $92$ zł. Bilet ulgowy jest o $8$ zł tańszy od normalnego. Ile kosztuje bilet normalny, a ile ulgowy? **Zapisz obliczenia.**",
          rozwiazanie: "Bilet normalny kosztuje $x$ zł, ulgowy $x-8$ zł.\n\nRównanie: $4x+2(x-8)=92$.\n\nOpuszczamy nawias: $4x+2x-16=92$, czyli $6x-16=92$.\n\nDodajemy $16$: $6x=108$.\n\nDzielimy przez $6$: $x=18$.\n\nBilet ulgowy: $18-8=10$ zł.\n\nSprawdzenie: $4\\cdot18+2\\cdot10=72+20=92$.\n\nOdpowiedź: Bilet normalny kosztuje $18$ zł, a ulgowy $10$ zł.",
        },
      ],
      generatory: [
        {
          id: "dwie-wielkosci",
          nazwa: "Wiek, pieniądze, liczby",
          opis: "Ułóż równanie do zadania o wieku, pieniądzach albo kolejnych liczbach i je rozwiąż.",
          generuj(r) {
            const typ = r.int(0, 3);
            if (typ === 0) {
              const [A, B, Bd] = r.pick([["Ania", "Ola", "Oli"], ["Kasia", "Basia", "Basi"], ["Ewa", "Marta", "Marty"], ["Zosia", "Ela", "Eli"]]);
              const d = r.int(2, 9);
              const x = r.int(6, 30);
              const S = 2 * x + d;
              return {
                tresc: `${A} jest o $${d}$ ${lat(d)} starsza od ${B}. Razem mają $${S}$ ${lat(S)}. Ile lat ma ${B}?`,
                pola: [pole("x", "Wiek (w latach) $=$")],
                odpowiedz: { x: q(x) },
                wynik: `$${x}$`,
                rozwiazanie: [
                  `Niech $x$ oznacza wiek ${Bd}. Wtedy ${A} ma $x + ${d}$ lat.`,
                  `Razem: $x + (x + ${d}) = ${S}$, czyli $2x + ${d} = ${S}$.`,
                  `Odejmujemy $${d}$: $2x = ${S - d}$.`,
                  `Dzielimy przez $2$: $x = ${x}$.`,
                  `Sprawdzenie: $${x} + ${x + d} = ${S}$.`,
                ],
              };
            }
            if (typ === 1) {
              const [A, B, Bd] = r.pick([["Kuba", "Paweł", "Pawła"], ["Ala", "Ola", "Oli"], ["Tomek", "Bartek", "Bartka"], ["Ewa", "Marta", "Marty"]]);
              const k = r.int(2, 5);
              const x = r.int(5, 40);
              const S = (k + 1) * x;
              return {
                tresc: `${A} ma $${k}$ razy więcej pieniędzy niż ${B}. Razem mają $${S}$ zł. Ile złotych ma ${B}?`,
                pola: [pole("x", "Pieniądze (w zł) $=$")],
                odpowiedz: { x: q(x) },
                wynik: `$${x}$ zł`,
                rozwiazanie: [
                  `Niech $x$ oznacza pieniądze ${Bd} (w zł). Wtedy ${A} ma $${k}x$ zł.`,
                  `Razem: $x + ${k}x = ${S}$.`,
                  `Redukujemy: $${k + 1}x = ${S}$.`,
                  `Dzielimy przez $${k + 1}$: $x = ${x}$.`,
                  `Sprawdzenie: $${x} + ${k * x} = ${S}$.`,
                ],
              };
            }
            if (typ === 2) {
              const n = r.int(4, 60);
              const S = 3 * n + 3;
              return {
                tresc: `Suma trzech kolejnych liczb naturalnych jest równa $${S}$. Jaka jest najmniejsza z tych liczb?`,
                pola: [pole("n", "Najmniejsza liczba $=$")],
                odpowiedz: { n: q(n) },
                wynik: `$${n}$`,
                rozwiazanie: [
                  `Kolejne liczby to $n$, $n + 1$ i $n + 2$.`,
                  `Suma: $n + (n + 1) + (n + 2) = ${S}$, czyli $3n + 3 = ${S}$.`,
                  `Odejmujemy $3$: $3n = ${S - 3}$.`,
                  `Dzielimy przez $3$: $n = ${n}$.`,
                  `Sprawdzenie: $${n} + ${n + 1} + ${n + 2} = ${S}$.`,
                ],
              };
            }
            const [dopelniacz, mianownik] = r.pick([["córki", "córka"], ["syna", "syn"]]);
            const k = r.int(3, 4);
            const x = r.int(6, 14);
            const S = (k + 1) * x;
            return {
              tresc: `Mama jest $${k}$ razy starsza od ${dopelniacz}. Razem mają $${S}$ ${lat(S)}. Ile lat ma ${mianownik}?`,
              pola: [pole("x", "Wiek (w latach) $=$")],
              odpowiedz: { x: q(x) },
              wynik: `$${x}$`,
              rozwiazanie: [
                `Niech $x$ oznacza wiek ${dopelniacz}. Wtedy mama ma $${k}x$ lat.`,
                `Razem: $x + ${k}x = ${S}$, czyli $${k + 1}x = ${S}$.`,
                `Dzielimy przez $${k + 1}$: $x = ${x}$.`,
                `Sprawdzenie: $${x} + ${k * x} = ${S}$.`,
              ],
            };
          },
        },
        {
          id: "ceny-i-obwod",
          nazwa: "Ceny i obwód",
          opis: "Ułóż równanie do zadania o cenach albo o obwodzie prostokąta i je rozwiąż.",
          generuj(r) {
            const typ = r.int(0, 2);
            if (typ === 0) {
              const [jedn, kilka, wiele, dodatek] = r.pick([["zeszyt", "zeszyty", "zeszytów", "długopis"], ["batonik", "batoniki", "batoników", "sok"], ["bilet", "bilety", "biletów", "program"]]);
              const [kto, zaplacil] = r.pick([["Kuba", "zapłacił"], ["Ania", "zapłaciła"], ["Ola", "zapłaciła"], ["Paweł", "zapłacił"]]);
              const k = r.int(2, 9);
              const p = r.int(2, 8);
              const x = r.int(2, 9);
              const S = k * x + p;
              return {
                tresc: `Za $${k}$ ${mn(k, jedn, kilka, wiele)} i ${dodatek} za $${p}$ zł ${kto} ${zaplacil} $${S}$ zł. Ile złotych kosztuje jeden ${jedn}?`,
                pola: [pole("x", "Cena (w zł) $=$")],
                odpowiedz: { x: q(x) },
                wynik: `$${x}$ zł`,
                rozwiazanie: [
                  `Niech $x$ oznacza cenę jednej sztuki (w zł).`,
                  `Równanie: $${k}x + ${p} = ${S}$.`,
                  `Odejmujemy $${p}$ od obu stron: $${k}x = ${S - p}$.`,
                  `Dzielimy przez $${k}$: $x = ${x}$.`,
                  `Sprawdzenie: $${k} \\cdot ${x} + ${p} = ${S}$.`,
                ],
              };
            }
            if (typ === 1) {
              const x = r.int(3, 20);
              const d = r.int(2, 9);
              const Ob = 4 * x + 2 * d;
              return {
                tresc: `Jeden bok prostokąta jest o $${d}$ cm dłuższy od drugiego. Obwód prostokąta wynosi $${Ob}$ cm. Ile centymetrów ma krótszy bok?`,
                pola: [pole("x", "Krótszy bok (w cm) $=$")],
                odpowiedz: { x: q(x) },
                wynik: `$${x}$ cm`,
                rozwiazanie: [
                  `Niech $x$ oznacza krótszy bok. Dłuższy bok ma $x + ${d}$ cm.`,
                  `Obwód: $2x + 2(x + ${d}) = ${Ob}$, czyli $4x + ${2 * d} = ${Ob}$.`,
                  `Odejmujemy $${2 * d}$: $4x = ${Ob - 2 * d}$.`,
                  `Dzielimy przez $4$: $x = ${x}$.`,
                  `Sprawdzenie: $2 \\cdot ${x} + 2 \\cdot ${x + d} = ${Ob}$.`,
                ],
              };
            }
            const k = r.int(1, 4);
            const m = r.int(2, 4);
            const d = r.int(4, 10);
            const x = r.int(12, 30);
            const S = (k + m) * x - m * d;
            return {
              tresc: `Za $${k}$ ${mn(k, "bilet normalny", "bilety normalne", "biletów normalnych")} i $${m}$ ${mn(m, "bilet ulgowy", "bilety ulgowe", "biletów ulgowych")} zapłacono $${S}$ zł. Bilet ulgowy jest o $${d}$ zł tańszy od normalnego. Ile złotych kosztuje bilet normalny?`,
              pola: [pole("x", "Cena biletu (w zł) $=$")],
              odpowiedz: { x: q(x) },
              wynik: `$${x}$ zł`,
              rozwiazanie: [
                `Niech $x$ oznacza cenę biletu normalnego. Bilet ulgowy kosztuje $x - ${d}$ zł.`,
                `Równanie: $${wyr([[k, "x"]])} + ${m}(x - ${d}) = ${S}$.`,
                `Opuszczamy nawias i redukujemy: $${k + m}x - ${m * d} = ${S}$.`,
                `Dodajemy $${m * d}$: $${k + m}x = ${S + m * d}$, więc $x = ${x}$.`,
                `Sprawdzenie: $${k} \\cdot ${x} + ${m} \\cdot ${x - d} = ${S}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Zadania tekstowe z procentami
    {
      id: "zadania-z-procentami",
      nazwa: "Zadania tekstowe z procentami",
      sciaga: [
        {
          nazwa: "Procent w równaniu",
          slownie: "Szukaną całość oznaczamy $x$. Procent zamieniamy na ułamek dziesiętny i mnożymy przez $x$. Potem układamy równanie.",
          tex: "p\\%\\text{ z }x=\\frac{p}{100}\\cdot x",
          litery: "$p$ – liczba procent, $x$ – całość.",
          przyklad: "$20\\%$ pewnej liczby to $18$. Równanie: $0{,}2x=18$. Dzielimy przez $0{,}2$: $x=18:0{,}2=90$.",
          uwaga: "$20\\%$ to $0{,}2$, a nie $0{,}02$.",
        },
        {
          nazwa: "Cena po podwyżce",
          slownie: "Po podwyżce o $p\\%$ cena to $x$ plus $p\\%$ z $x$. Po zredukowaniu dostajemy jedno mnożenie.",
          tex: "x+0{,}2x=1{,}2x",
          przyklad: "Po podwyżce o $20\\%$ bilet kosztuje $48$ zł. $1{,}2x=48$, więc $x=48:1{,}2=40$. Przed podwyżką kosztował $40$ zł.",
          uwaga: "Procent liczymy z ceny przed zmianą. Nie odejmuj $20\\%$ od $48$ zł.",
        },
        {
          nazwa: "Cena po obniżce",
          slownie: "Po obniżce o $p\\%$ od ceny $x$ odejmujemy $p\\%$ z $x$. Znowu dostajemy jedno mnożenie.",
          tex: "x-0{,}25x=0{,}75x",
          przyklad: "Po obniżce o $25\\%$ kurtka kosztuje $150$ zł. $0{,}75x=150$, więc $x=150:0{,}75=200$. Przed obniżką kosztowała $200$ zł.",
          uwaga: "Po obniżce o $25\\%$ płacimy $75\\%$ ceny, a nie $25\\%$.",
        },
        {
          nazwa: "Ile procent?",
          slownie: "Gdy pytamy, ile procent jednej liczby stanowi druga, szukaną liczbę procent oznaczamy $x$ i układamy równanie.",
          przyklad: "Ile procent liczby $50$ stanowi $15$? $\\frac{x}{100}\\cdot50=15$, czyli $0{,}5x=15$ i $x=30$. Liczba $15$ to $30\\%$ liczby $50$.",
        },
      ],
      jak: [
        "Oznacz literą $x$ liczbę, której szukasz (zwykle cenę albo liczbę przed zmianą).",
        "Zapisz procent jako ułamek dziesiętny. Po podwyżce o $20\\%$ jest $1{,}2x$, a po obniżce o $20\\%$ jest $0{,}8x$.",
        "Ułóż równanie i je rozwiąż.",
        "Sprawdź: policz procent z wyniku i zobacz, czy wyjdzie liczba z zadania.",
      ],
      zadania: [
        {
          nr: "23",
          tresc: "$25\\%$ pewnej liczby $x$ jest równe $30$. Które równanie opisuje tę sytuację? **Wybierz właściwą odpowiedź.**",
          opcje: ["$25x=30$", "$x+0{,}25=30$", "$0{,}25x=30$", "$0{,}025x=30$"],
          poprawna: 2,
        },
        {
          nr: "24",
          tresc: "Po obniżce o $20\\%$ bluzka kosztuje $64$ zł. Ile złotych kosztowała bluzka przed obniżką? **Wybierz właściwą odpowiedź.**",
          opcje: ["$80$ zł", "$51{,}20$ zł", "$76{,}80$ zł", "$84$ zł"],
          poprawna: 0,
        },
        {
          nr: "25",
          tresc: "Po podwyżce o $10\\%$ bilet kosztuje $33$ zł. Ile złotych kosztował bilet przed podwyżką? **Wybierz właściwą odpowiedź.**",
          opcje: ["$29{,}70$ zł", "$30$ zł", "$23$ zł", "$36{,}30$ zł"],
          poprawna: 1,
        },
        {
          nr: "26",
          tresc: "Ile procent liczby $80$ stanowi liczba $20$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4\\%$", "$20\\%$", "$60\\%$", "$25\\%$"],
          poprawna: 3,
        },
        {
          nr: "27",
          tresc: "Po obniżce o $30\\%$ rower kosztuje $560$ zł. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Cenę $x$ roweru przed obniżką opisuje równanie $0{,}7x=560$.", litery: "PF", poprawna: 0 },
            { tekst: "Rower kosztował przed obniżką $728$ zł.", litery: "PF", poprawna: 1 },
            { tekst: "Obniżka wyniosła $240$ zł.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "28",
          punkty: 3,
          tresc: "Marta kupiła kurtkę po obniżce o $15\\%$ i zapłaciła za nią $170$ zł. Ile złotych kosztowała kurtka przed obniżką? Ile złotych Marta zaoszczędziła dzięki obniżce? **Zapisz obliczenia.**",
          rozwiazanie: "Cena przed obniżką to $x$ zł. Po obniżce o $15\\%$ cena to $x-0{,}15x=0{,}85x$.\n\nRównanie: $0{,}85x=170$.\n\nDzielimy przez $0{,}85$: $x=170:0{,}85=200$.\n\nOszczędność: $200-170=30$ zł.\n\nSprawdzenie: $15\\%$ z $200$ to $0{,}15\\cdot200=30$.\n\nOdpowiedź: Kurtka kosztowała $200$ zł, a Marta zaoszczędziła $30$ zł.",
        },
        {
          nr: "29",
          punkty: 3,
          tresc: "W turnieju wzięło udział $x$ uczniów. Dziewcząt było $40\\%$ wszystkich uczestników, a chłopców o $6$ więcej niż dziewcząt. Ilu uczniów wzięło udział w turnieju? Ile było dziewcząt, a ilu chłopców? **Zapisz obliczenia.**",
          rozwiazanie: "Dziewcząt jest $0{,}4x$. Chłopców jest $100\\%-40\\%=60\\%$, czyli $0{,}6x$.\n\nChłopców jest o $6$ więcej: $0{,}6x-0{,}4x=6$.\n\nRedukujemy: $0{,}2x=6$.\n\nDzielimy przez $0{,}2$: $x=6:0{,}2=30$.\n\nDziewcząt: $0{,}4\\cdot30=12$, chłopców: $0{,}6\\cdot30=18$.\n\nSprawdzenie: $18-12=6$.\n\nOdpowiedź: W turnieju wzięło udział $30$ uczniów: $12$ dziewcząt i $18$ chłopców.",
        },
      ],
      generatory: [
        {
          id: "liczba-z-procentu",
          nazwa: "Całość z procentu",
          opis: "Znając procent całości, ułóż równanie i oblicz całość.",
          generuj(r) {
            const p = r.pick([5, 10, 20, 25, 30, 40, 50, 60, 75]);
            const k = r.int(1, 25);
            const x = 20 * k;
            const a = (p * k) / 5;
            const w = dz(q(p, 100));
            const kontekst = r.int(0, 2);
            let tresc, etyk;
            if (kontekst === 0) {
              tresc = `$${p}\\%$ pewnej liczby jest równe $${a}$. Jaka to liczba?`;
              etyk = "Liczba $=$";
            } else if (kontekst === 1) {
              tresc = `$${p}\\%$ pieniędzy, które ma Kasia, to $${a}$ zł. Ile złotych ma Kasia?`;
              etyk = "Pieniądze (w zł) $=$";
            } else {
              tresc = `Przed meczem sprzedano $${p}\\%$ biletów, czyli $${a}$ ${mn(a, "bilet", "bilety", "biletów")}. Ile biletów było w sprzedaży?`;
              etyk = "Liczba biletów $=$";
            }
            return {
              tresc,
              pola: [pole("x", etyk)],
              odpowiedz: { x: q(x) },
              wynik: `$${x}$`,
              rozwiazanie: [
                `Szukaną liczbę oznaczamy $x$. Zapisujemy $${p}\\%$ jako ułamek dziesiętny: $${w}$.`,
                `Układamy równanie: $${w}x = ${a}$.`,
                `Dzielimy obie strony przez $${w}$: $x = ${a} : ${w} = ${x}$.`,
                `Sprawdzenie: $${w} \\cdot ${x} = ${a}$.`,
              ],
            };
          },
        },
        {
          id: "cena-przed-zmiana",
          nazwa: "Cena przed zmianą",
          opis: "Znając cenę po podwyżce albo obniżce, ułóż równanie i oblicz cenę początkową.",
          generuj(r) {
            const p = r.pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 75]);
            const k = r.int(1, 25);
            const x = 20 * k;
            const wzrost = r.chance();
            const s = wzrost ? 1 : -1;
            const C = (k * (100 + s * p)) / 5;
            const wsp = dz(q(100 + s * p, 100));
            const pr = dz(q(p, 100));
            const rzecz = r.pick(RZECZY);
            return {
              tresc: `Po ${wzrost ? "podwyżce" : "obniżce"} o $${p}\\%$ ${rzecz.n} kosztuje $${C}$ zł. Ile złotych ${rzecz.k} ${rzecz.n} przed ${wzrost ? "podwyżką" : "obniżką"}?`,
              pola: [pole("x", "Cena przed zmianą (w zł) $=$")],
              odpowiedz: { x: q(x) },
              wynik: `$${x}$ zł`,
              rozwiazanie: [
                `Cenę przed zmianą oznaczamy $x$. ${wzrost ? "Podwyżka" : "Obniżka"}: $x ${wzrost ? "+" : "-"} ${pr}x = ${wsp}x$.`,
                `Cena po zmianie to $${C}$ zł, więc $${wsp}x = ${C}$.`,
                `Dzielimy obie strony przez $${wsp}$: $x = ${C} : ${wsp} = ${x}$ zł.`,
                `Sprawdzenie: $${wsp} \\cdot ${x} = ${C}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Przekształcanie wzorów
    {
      id: "przeksztalcanie-wzorow",
      nazwa: "Przekształcanie wzorów",
      sciaga: [
        {
          nazwa: "Wyznaczanie wielkości",
          slownie: "Przekształcić wzór to zostawić jedną literę samą po jednej stronie. Robimy to tak jak przy równaniu: tę samą operację wykonujemy po obu stronach.",
          tex: "P=a\\cdot h\\qquad a=\\frac{P}{h}",
          litery: "$P$ – pole, $a$ – bok, $h$ – wysokość.",
          przyklad: "Wzór $P=a\\cdot h$, chcemy mieć $a$. Dzielimy obie strony przez $h$ i dostajemy $a=\\frac{P}{h}$.",
          uwaga: "Dzielimy obie strony przez $h$, a nie tylko jedną.",
        },
        {
          nazwa: "Droga, prędkość, czas",
          slownie: "Droga to prędkość razy czas. Z tego wzoru możemy wyznaczyć prędkość albo czas.",
          tex: "s=v\\cdot t\\qquad v=\\frac{s}{t}\\qquad t=\\frac{s}{v}",
          litery: "$s$ – droga, $v$ – prędkość, $t$ – czas.",
          przyklad: "Rowerzysta przejechał $s=45$ km w czasie $t=3$ h. Prędkość: $v=\\frac{45}{3}=15$ km/h.",
          uwaga: "Pilnuj jednostek: kilometry i godziny dają kilometry na godzinę.",
        },
        {
          nazwa: "Pole trójkąta",
          slownie: "Najpierw mnożymy obie strony wzoru przez $2$, żeby zniknął ułamek. Potem dzielimy przez drugą literę.",
          tex: "P=\\frac{a\\cdot h}{2}\\qquad a=\\frac{2P}{h}",
          litery: "$P$ – pole, $a$ – podstawa, $h$ – wysokość.",
          przyklad: "Trójkąt ma pole $P=24$ $\\text{cm}^2$ i wysokość $h=6$ cm. Podstawa: $a=\\frac{2\\cdot24}{6}=8$ cm.",
          uwaga: "Z $P=\\frac{a\\cdot h}{2}$ nie dostaniemy $a=\\frac{P}{2h}$. Przez $2$ mnożymy, a nie dzielimy.",
        },
        {
          nazwa: "Wzór z dodawaniem",
          slownie: "Gdy szukana litera stoi w sumie, najpierw odejmujemy pozostałe wyrazy od obu stron, a potem dzielimy.",
          tex: "Ob=2a+2b\\qquad a=\\frac{Ob-2b}{2}",
          litery: "$Ob$ – obwód prostokąta, $a$ i $b$ – jego boki.",
          przyklad: "Obwód to $Ob=30$ cm, a bok $b=5$ cm. Mamy $a=\\frac{30-2\\cdot5}{2}=10$ cm.",
          uwaga: "Dzielimy całą różnicę $Ob-2b$ przez $2$, a nie tylko $Ob$.",
        },
      ],
      jak: [
        "Zapisz wzór i zaznacz literę, którą masz wyznaczyć.",
        "Przenieś na drugą stronę to, co jest dodane lub odjęte (zmień znak).",
        "Pozbądź się mnożenia i dzielenia: pomnóż albo podziel obie strony.",
        "Gdy dane są liczby, wstaw je do przekształconego wzoru i policz.",
      ],
      zadania: [
        {
          nr: "30",
          tresc: "Ze wzoru $P=a\\cdot h$ wyznaczamy $h$. Które wyrażenie jest równe $h$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$h=P\\cdot a$", "$h=\\frac{P}{a}$", "$h=\\frac{a}{P}$", "$h=P-a$"],
          poprawna: 1,
        },
        {
          nr: "31",
          tresc: "Ze wzoru $s=v\\cdot t$ wyznaczamy $t$. Które wyrażenie jest równe $t$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$t=s\\cdot v$", "$t=\\frac{v}{s}$", "$t=\\frac{s}{v}$", "$t=s-v$"],
          poprawna: 2,
        },
        {
          nr: "32",
          tresc: "Ze wzoru $P=\\frac{a\\cdot h}{2}$ wyznaczamy $a$. Które wyrażenie jest równe $a$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$a=\\frac{P}{2h}$", "$a=2P\\cdot h$", "$a=\\frac{P\\cdot h}{2}$", "$a=\\frac{2P}{h}$"],
          poprawna: 3,
        },
        {
          nr: "33",
          tresc: "Ze wzoru $Ob=2a+2b$ wyznaczamy $a$. Które wyrażenie jest równe $a$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$a=\\frac{Ob-2b}{2}$", "$a=Ob-2b$", "$a=\\frac{Ob+2b}{2}$", "$a=\\frac{Ob-b}{2}$"],
          poprawna: 0,
        },
        {
          nr: "34",
          tresc: "Samochód jedzie ze stałą prędkością. Obowiązuje wzór $s=v\\cdot t$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Gdy $s=180$ km i $t=3$ h, to $v=60$ km/h.", litery: "PF", poprawna: 0 },
            { tekst: "Z podanego wzoru wynika, że $t=s\\cdot v$.", litery: "PF", poprawna: 1 },
            { tekst: "Gdy $v=40$ km/h i $s=100$ km, to $t=2{,}5$ h.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "35",
          punkty: 2,
          tresc: "Pole trójkąta wyraża się wzorem $P=\\frac{a\\cdot h}{2}$. Wyznacz ze wzoru $h$. Oblicz $h$ dla $P=30$ $\\text{cm}^2$ i $a=12$ cm. **Zapisz obliczenia.**",
          rozwiazanie: "Mnożymy obie strony wzoru przez $2$: $2P=a\\cdot h$.\n\nDzielimy obie strony przez $a$: $h=\\frac{2P}{a}$.\n\nWstawiamy liczby: $h=\\frac{2\\cdot30}{12}=\\frac{60}{12}=5$ cm.\n\nOdpowiedź: $h=\\frac{2P}{a}$, a wysokość wynosi $5$ cm.",
        },
        {
          nr: "36",
          punkty: 3,
          tresc: "Obwód prostokąta wyraża się wzorem $Ob=2a+2b$. Wyznacz ze wzoru $b$. Oblicz $b$ dla $Ob=46$ cm i $a=15$ cm. Podaj też pole tego prostokąta. **Zapisz obliczenia.**",
          rozwiazanie: "Odejmujemy $2a$ od obu stron: $Ob-2a=2b$.\n\nDzielimy obie strony przez $2$: $b=\\frac{Ob-2a}{2}$.\n\nWstawiamy liczby: $b=\\frac{46-2\\cdot15}{2}=\\frac{16}{2}=8$ cm.\n\nPole: $P=a\\cdot b=15\\cdot8=120$ $\\text{cm}^2$.\n\nOdpowiedź: $b=\\frac{Ob-2a}{2}$, drugi bok ma $8$ cm, a pole wynosi $120$ $\\text{cm}^2$.",
        },
      ],
      generatory: [
        {
          id: "przeksztalc-wzor",
          nazwa: "Przekształć wzór",
          opis: "Wyznacz wskazaną literę ze wzoru (pole, droga, obwód, suma) i wybierz właściwe wyrażenie.",
          generuj(r) {
            const w = r.pick(WZORY);
            return wybor(r, {
              tresc: `Ze wzoru $${w.wzor}$ wyznaczamy $${w.szuk}$. Które wyrażenie jest równe $${w.szuk}$?`,
              etykieta: "Wyrażenie",
              poprawne: `${w.szuk} = ${w.poprawne}`,
              bledne: w.bledne.map((b) => `${w.szuk} = ${b}`),
              rozwiazanie: w.kroki,
            });
          },
        },
        {
          id: "oblicz-ze-wzoru",
          nazwa: "Oblicz ze wzoru",
          opis: "Przekształć wzór, wstaw liczby i oblicz szukaną wielkość.",
          generuj(r) {
            const f = r.int(0, 3);
            if (f === 0) {
              const v = r.int(4, 18) * 5;
              const t = r.int(2, 6);
              const s = v * t;
              if (r.chance()) {
                return {
                  tresc: `Samochód przejechał $s=${s}$ km w czasie $t=${t}$ h ze stałą prędkością $v$. Oblicz prędkość $v$ (w km/h) ze wzoru $s = v \\cdot t$.`,
                  pola: [pole("w", "$v$ (w km/h) $=$")],
                  odpowiedz: { w: q(v) },
                  wynik: `$v = ${v}$ km/h`,
                  rozwiazanie: [
                    `Dzielimy obie strony wzoru przez $t$: $v = \\frac{s}{t}$.`,
                    `Wstawiamy liczby: $v = \\frac{${s}}{${t}} = ${v}$ km/h.`,
                  ],
                };
              }
              return {
                tresc: `Samochód jedzie ze stałą prędkością $v=${v}$ km/h i przejechał $s=${s}$ km. Oblicz czas $t$ (w godzinach) ze wzoru $s = v \\cdot t$.`,
                pola: [pole("w", "$t$ (w godzinach) $=$")],
                odpowiedz: { w: q(t) },
                wynik: `$t = ${t}$ h`,
                rozwiazanie: [
                  `Dzielimy obie strony wzoru przez $v$: $t = \\frac{s}{v}$.`,
                  `Wstawiamy liczby: $t = \\frac{${s}}{${v}} = ${t}$ h.`,
                ],
              };
            }
            if (f === 1) {
              const a = r.int(3, 15);
              const h = r.int(2, 12);
              const P = a * h;
              if (r.chance()) {
                return {
                  tresc: `Pole równoległoboku wynosi $P=${P}$ $\\text{cm}^2$, a jego wysokość $h=${h}$ cm. Oblicz długość boku $a$ (w cm) ze wzoru $P = a \\cdot h$.`,
                  pola: [pole("w", "$a$ (w cm) $=$")],
                  odpowiedz: { w: q(a) },
                  wynik: `$a = ${a}$ cm`,
                  rozwiazanie: [
                    `Dzielimy obie strony wzoru przez $h$: $a = \\frac{P}{h}$.`,
                    `Wstawiamy liczby: $a = \\frac{${P}}{${h}} = ${a}$ cm.`,
                  ],
                };
              }
              return {
                tresc: `Pole równoległoboku wynosi $P=${P}$ $\\text{cm}^2$, a jego bok $a=${a}$ cm. Oblicz wysokość $h$ (w cm) ze wzoru $P = a \\cdot h$.`,
                pola: [pole("w", "$h$ (w cm) $=$")],
                odpowiedz: { w: q(h) },
                wynik: `$h = ${h}$ cm`,
                rozwiazanie: [
                  `Dzielimy obie strony wzoru przez $a$: $h = \\frac{P}{a}$.`,
                  `Wstawiamy liczby: $h = \\frac{${P}}{${a}} = ${h}$ cm.`,
                ],
              };
            }
            if (f === 2) {
              return probuj(() => {
                const a = r.int(4, 16);
                const h = r.int(2, 12);
                if ((a * h) % 2) return null;
                const P = (a * h) / 2;
                const szukaA = r.chance();
                const [zna, znaw, szuk, szw] = szukaA ? ["h", h, "a", a] : ["a", a, "h", h];
                return {
                  tresc: `Pole trójkąta wynosi $P=${P}$ $\\text{cm}^2$, a ${szukaA ? "jego wysokość" : "podstawa"} $${zna}=${znaw}$ cm. Oblicz ${szukaA ? "długość podstawy" : "wysokość"} $${szuk}$ (w cm) ze wzoru $P = \\frac{a \\cdot h}{2}$.`,
                  pola: [pole("w", `$${szuk}$ (w cm) $=$`)],
                  odpowiedz: { w: q(szw) },
                  wynik: `$${szuk} = ${szw}$ cm`,
                  rozwiazanie: [
                    `Mnożymy obie strony wzoru przez $2$: $2P = a \\cdot h$.`,
                    `Dzielimy przez $${zna}$: $${szuk} = \\frac{2P}{${zna}}$.`,
                    `Wstawiamy liczby: $${szuk} = \\frac{2 \\cdot ${P}}{${znaw}} = \\frac{${2 * P}}{${znaw}} = ${szw}$ cm.`,
                  ],
                };
              });
            }
            const a = r.int(3, 20);
            const b = r.int(2, 15);
            const Ob = 2 * a + 2 * b;
            return {
              tresc: `Obwód prostokąta wynosi $Ob=${Ob}$ cm, a jeden bok $a=${a}$ cm. Oblicz drugi bok $b$ (w cm) ze wzoru $Ob = 2a + 2b$.`,
              pola: [pole("w", "$b$ (w cm) $=$")],
              odpowiedz: { w: q(b) },
              wynik: `$b = ${b}$ cm`,
              rozwiazanie: [
                `Odejmujemy $2a$ od obu stron: $Ob - 2a = 2b$.`,
                `Dzielimy przez $2$: $b = \\frac{Ob - 2a}{2}$.`,
                `Wstawiamy liczby: $b = \\frac{${Ob} - 2 \\cdot ${a}}{2} = \\frac{${Ob - 2 * a}}{2} = ${b}$ cm.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
