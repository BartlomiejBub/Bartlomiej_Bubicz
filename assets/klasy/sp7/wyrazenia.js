// Klasa 7 (szkoła podstawowa) · rozdział IV „Wyrażenia algebraiczne” – Matematyka z kluczem 7 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Bez rysunków, bez mnożenia dwóch nawiasów (klasa 8) i bez równań (następny rozdział).
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

/** Suma algebraiczna ze składników [współczynnik, litera]: wyr([[3, "x"], [-1, "y"], [5, ""]]) = "3x - y + 5". */
function wyr(t) {
  let s = "";
  for (const [c, v] of t) {
    if (c === 0) continue;
    if (!s) s = `${c < 0 ? "-" : ""}${czlon(c, v)}`;
    else s += ` ${c < 0 ? "-" : "+"} ${czlon(c, v)}`;
  }
  return s || "0";
}

/** Doklejany na końcu wyraz ze znakiem: ogon(-2, "x") = " - 2x"; dla 0 pusty tekst. */
const ogon = (c, v) => (c === 0 ? "" : ` ${c < 0 ? "-" : "+"} ${czlon(c, v)}`);

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });
const nonzero = (r, a, b) => r.intBez(a, b, 0);

const RZECZY = ["roweru", "plecaka", "kurtki", "telefonu", "biletu", "gry komputerowej"];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Od wzorków do wzorów
    {
      id: "od-wzorkow-do-wzorow",
      nazwa: "Od wzorków do wzorów",
      sciaga: [
        {
          nazwa: "Litera zamiast liczby",
          slownie: "Gdy nie znamy liczby albo może ona być różna, zapisujemy ją literą. Wyrażenie, w którym są litery, nazywamy wyrażeniem algebraicznym.",
          przyklad: "Zeszyt kosztuje $x$ zł. Pięć zeszytów kosztuje $5x$ zł, a zeszyt i długopis za $3$ zł kosztują razem $x+3$ zł.",
          uwaga: "$5x$ to $5\\cdot x$, a nie $5+x$. Znak mnożenia między liczbą a literą pomijamy.",
        },
        {
          nazwa: "Z opisu na wyrażenie",
          slownie: "Słowa zamieniamy na działania: „o więcej” to dodawanie, „o mniej” to odejmowanie, „razy więcej” to mnożenie, „podzielone” to dzielenie.",
          tex: "\\begin{array}{ll}\\text{o 5 więcej niż }a & a+5\\\\\\text{o 5 mniej niż }a & a-5\\\\\\text{3 razy więcej niż }a & 3a\\\\\\text{a podzielone przez 4} & a:4\\end{array}",
          przyklad: "Ania ma $a$ lat. Jej brat jest o $4$ lata starszy, więc ma $a+4$ lat. Mama jest $3$ razy starsza od Ani i ma $3a$ lat.",
          uwaga: "„O $5$ mniej niż $a$” to $a-5$, a nie $5-a$. W odejmowaniu kolejność ma znaczenie.",
        },
        {
          nazwa: "Wzór na obwód i pole",
          slownie: "Wzór to wyrażenie z literami, które mówi, jak obliczyć jakąś wielkość. Za litery wstawiamy liczby i liczymy.",
          tex: "Ob=2a+2b\\qquad P=a\\cdot b",
          litery: "$a$, $b$ – długości sąsiednich boków prostokąta, $Ob$ – obwód, $P$ – pole.",
          przyklad: "Prostokąt ma boki $a=5$ cm i $b=3$ cm. Obwód: $2\\cdot5+2\\cdot3=16$ cm. Pole: $5\\cdot3=15$ $\\text{cm}^2$.",
        },
        {
          nazwa: "Wartość wyrażenia",
          slownie: "Aby obliczyć wartość wyrażenia, wstawiamy liczby w miejsce liter i liczymy według kolejności działań: najpierw mnożenie, potem dodawanie i odejmowanie.",
          przyklad: "Dla $a=4$ i $b=-2$ wyrażenie $3a+5b$ ma wartość $3\\cdot4+5\\cdot(-2)=12-10=2$.",
          uwaga: "Liczbę ujemną wstawiamy w nawiasie: $5\\cdot(-2)$, a nie $5\\cdot-2$.",
        },
        {
          nazwa: "Wzorki z patyczków",
          slownie: "Gdy w kolejnych krokach przybywa zawsze tyle samo, wzór zaczyna się od tej liczby razy $n$. Potem dodajemy albo odejmujemy tyle, żeby zgadzał się pierwszy krok.",
          tex: "3n+1",
          litery: "$n$ – liczba kwadratów w rzędzie.",
          przyklad: "Kwadraty z zapałek w rzędzie: $1$ kwadrat to $4$ zapałki, $2$ kwadraty to $7$, $3$ kwadraty to $10$. Za każdym razem przybywa $3$ zapałki, więc wzór to $3n+1$. Sprawdzenie dla $n=3$: $3\\cdot3+1=10$.",
        },
      ],
      jak: [
        "Wybierz literę dla tego, czego nie znasz (np. $x$ zł) i zapisz, co ona oznacza.",
        "Każdą wielkość z zadania zapisz wyrażeniem: „o $3$ więcej” to $+3$, „$3$ razy więcej” to $3x$.",
        "Połącz wyrażenia w całość (np. cena zeszytów plus cena długopisów).",
        "Sprawdź wyrażenie na prostej liczbie, np. dla $x=10$. Gdy trzeba, wstaw liczbę za literę i policz (liczby ujemne w nawiasie).",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Ania ma $a$ lat. Jej siostra jest o $3$ lata młodsza od Ani. Ile lat ma siostra? **Wybierz właściwą odpowiedź.**",
          opcje: ["$a+3$", "$3a$", "$a-3$", "$3-a$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Zeszyt kosztuje $x$ zł, a długopis $y$ zł. Kasia kupiła $3$ zeszyty i $2$ długopisy. Ile złotych zapłaciła? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3x+2y$", "$5xy$", "$x+y+5$", "$6xy$"],
          poprawna: 0,
        },
        {
          nr: "3",
          tresc: "Ile wynosi wartość wyrażenia $4a-3b$ dla $a=5$ i $b=-2$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$", "$-14$", "$51$", "$26$"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "Prostokąt ma boki długości $a$ cm i $a+2$ cm. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Obwód prostokąta wynosi $2a+2(a+2)$ cm.", litery: "PF", poprawna: 0 },
            { tekst: "Pole prostokąta wynosi $2a+2$ $\\text{cm}^2$.", litery: "PF", poprawna: 1 },
            { tekst: "Pole prostokąta wynosi $a\\cdot(a+2)$ $\\text{cm}^2$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "5",
          tresc: "Z zapałek układamy w rzędzie kolejne kwadraty. Jeden kwadrat to $4$ zapałki, dwa kwadraty to $7$ zapałek, trzy kwadraty to $10$ zapałek (do każdego następnego kwadratu dokładamy $3$ zapałki). Ile zapałek potrzeba na $n$ kwadratów? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4n$", "$3n+1$", "$n+3$", "$3n+4$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 3,
          tresc: "Bilet normalny do kina kosztuje $x$ zł, a ulgowy jest o $6$ zł tańszy. Do kina poszły $2$ osoby z biletem normalnym i $3$ osoby z biletem ulgowym. Zapisz wyrażeniem cenę biletu ulgowego oraz kwotę zapłaconą za wszystkie bilety. Oblicz tę kwotę dla $x=20$. **Zapisz obliczenia.**",
          rozwiazanie: "Bilet ulgowy kosztuje $x-6$ zł.\n\nZa $2$ bilety normalne zapłacono $2x$ zł, a za $3$ ulgowe $3(x-6)$ zł.\n\nRazem: $2x+3(x-6)$ zł.\n\nDla $x=20$: $2\\cdot20+3\\cdot(20-6)=40+3\\cdot14=40+42=82$ zł.\n\nOdpowiedź: Bilet ulgowy kosztuje $x-6$ zł, za wszystkie bilety zapłacono $2x+3(x-6)$ zł, czyli $82$ zł dla $x=20$.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Prostokątna działka ma szerokość $b$ m, a jej długość jest o $5$ m większa od szerokości. Zapisz wyrażeniem obwód działki. Oblicz ten obwód dla $b=12$. **Zapisz obliczenia.**",
          rozwiazanie: "Długość działki to $b+5$ m.\n\nObwód: $2b+2(b+5)$ m.\n\nDla $b=12$: $2\\cdot12+2\\cdot(12+5)=24+2\\cdot17=24+34=58$ m.\n\nOdpowiedź: Obwód działki to $2b+2(b+5)$ m, czyli $58$ m dla $b=12$.",
        },
      ],
      generatory: [
        {
          id: "wartosc-wyrazenia",
          nazwa: "Wartość wyrażenia",
          opis: "Wstaw liczby w miejsce liter (także ujemne) i oblicz wartość wyrażenia.",
          generuj(r) {
            const [v1, v2] = r.pick([["a", "b"], ["x", "y"], ["m", "n"], ["s", "t"]]);
            return probuj(() => {
              const c = r.int(2, 7);
              const d = nonzero(r, -6, 6);
              const e = r.int(-8, 8);
              const x = r.int(-4, 6);
              const y = r.int(-4, 6);
              if (x === 0 || y === 0) return null;
              const w = c * x + d * y + e;
              const wyrazenie = wyr([[c, v1], [d, v2], [e, ""]]);
              const dzialania = `${c} \\cdot ${nz(x)} ${d < 0 ? "-" : "+"} ${Math.abs(d)} \\cdot ${nz(y)}${e === 0 ? "" : ` ${e < 0 ? "-" : "+"} ${Math.abs(e)}`}`;
              return {
                tresc: `Oblicz wartość wyrażenia $${wyrazenie}$ dla $${v1}=${x}$ i $${v2}=${y}$.`,
                pola: [pole("w", "Wartość $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Wstawiamy liczby w miejsce liter (liczby ujemne w nawiasie): $${dzialania}$.`,
                  `Mnożymy: $${c * x} ${d * y < 0 ? "-" : "+"} ${Math.abs(d * y)}${e === 0 ? "" : ` ${e < 0 ? "-" : "+"} ${Math.abs(e)}`}$.`,
                  `Dodajemy i odejmujemy: $${w}$.`,
                ],
              };
            });
          },
        },
        {
          id: "zapis-wyrazenia",
          nazwa: "Opis na wyrażenie",
          opis: "Wybierz wyrażenie, które opisuje sytuację z zadania (wiek, cena, obwód).",
          generuj(r) {
            const typ = r.int(0, 3);
            const k = r.int(2, 9);
            const n = r.int(2, 9);
            let tresc, poprawne, bledne, krok;
            if (typ === 0) {
              tresc = `Kuba ma $x$ lat. Jego mama jest o $${k + 20}$ ${k + 20 < 25 ? "lata" : "lat"} starsza od Kuby. Które wyrażenie opisuje wiek mamy?`;
              poprawne = `x + ${k + 20}`;
              bledne = [`${k + 20}x`, `x - ${k + 20}`, `${k + 20} - x`];
              krok = `„O $${k + 20}$ lat starsza” to dodawanie: $x + ${k + 20}$.`;
            } else if (typ === 1) {
              tresc = `Ola ma $x$ zł. Basia ma $${k}$ razy więcej pieniędzy niż Ola, a Zosia ma o $${n}$ zł mniej niż Ola. Które wyrażenie opisuje, ile pieniędzy mają razem Basia i Zosia?`;
              poprawne = `${k}x + x - ${n}`;
              bledne = [`${k}x + x + ${n}`, `${k} + x + x - ${n}`, `${k}x - ${n}`];
              krok = `Basia ma $${k}x$ zł, Zosia ma $x - ${n}$ zł. Razem: $${k}x + x - ${n}$.`;
            } else if (typ === 2) {
              tresc = `Zeszyt kosztuje $x$ zł, a długopis jest o $${n}$ zł tańszy od zeszytu. Które wyrażenie opisuje cenę $${k}$ zeszytów i $${k}$ długopisów?`;
              poprawne = `${k}x + ${k}(x - ${n})`;
              bledne = [`${k}x + ${k}x - ${n}`, `${k}x + ${k}(x + ${n})`, `${k}x + ${k} - ${n}`];
              krok = `Długopis kosztuje $x - ${n}$ zł. Za $${k}$ ${k < 5 ? "zeszyty" : "zeszytów"} zapłacimy $${k}x$, za $${k}$ ${k < 5 ? "długopisy" : "długopisów"} $${k}(x - ${n})$. Razem: $${k}x + ${k}(x - ${n})$.`;
            } else {
              tresc = `Prostokąt ma jeden bok długości $x$ cm, a drugi o $${n}$ cm dłuższy. Które wyrażenie opisuje obwód tego prostokąta?`;
              poprawne = `2x + 2(x + ${n})`;
              bledne = [`x + x + ${n}`, `x(x + ${n})`, `2x + (x + ${n})`];
              krok = `Drugi bok ma $x + ${n}$ cm. Obwód to dwa razy pierwszy bok plus dwa razy drugi bok: $2x + 2(x + ${n})$.`;
            }
            const opcje = r.shuffle([poprawne, ...bledne]).map((o) => `$${o}$`);
            const idx = opcje.indexOf(`$${poprawne}$`);
            return {
              tresc,
              pola: [{ id: "w", typ: "wybor", etykieta: "Wyrażenie", opcje }],
              odpowiedz: { w: idx },
              wynik: `$${poprawne}$`,
              rozwiazanie: [
                `Zapisujemy każdą wielkość osobno, używając litery $x$.`,
                krok,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Suma algebraiczna i jej wyrazy
    {
      id: "suma-algebraiczna",
      nazwa: "Suma algebraiczna i jej wyrazy",
      sciaga: [
        {
          nazwa: "Suma algebraiczna",
          slownie: "Suma algebraiczna to wyrażenie z wyrazów połączonych znakami $+$ i $-$. Wyrazem może być liczba, litera albo liczba razy litera. Znak stoi przed wyrazem i do niego należy.",
          tex: "3x-5y+7=3x+(-5y)+7",
          przyklad: "W sumie $3x-5y+7$ są trzy wyrazy: $3x$, $-5y$ i $7$.",
          uwaga: "Wyraz $-5y$ ma znak minus. Odejmowanie to dodawanie liczby przeciwnej.",
        },
        {
          nazwa: "Współczynnik",
          slownie: "Współczynnik to liczba, przez którą jest pomnożona litera. Gdy liczby nie widać, współczynnik to $1$. Gdy stoi sam minus, współczynnik to $-1$. Liczba bez litery to wyraz wolny.",
          tex: "x=1\\cdot x\\qquad-x=-1\\cdot x",
          przyklad: "W sumie $4a-b+2$ współczynnik przy $a$ to $4$, przy $b$ to $-1$, a wyraz wolny to $2$.",
          uwaga: "Nie gub znaku: w wyrazie $-3a$ współczynnik to $-3$, a nie $3$.",
        },
        {
          nazwa: "Wyrazy podobne",
          slownie: "Wyrazy podobne mają tę samą część z literami. Mogą się różnić tylko współczynnikiem. Same liczby też są do siebie podobne.",
          przyklad: "Podobne są $5x$ i $-2x$ oraz $7$ i $-4$. Niepodobne są $3a$ i $3b$ (inne litery) oraz $x$ i $x^2$.",
          uwaga: "Nie wszystko da się dodać: $x$ i $x^2$ to jak jabłka i gruszki.",
        },
        {
          nazwa: "Redukcja wyrazów podobnych",
          slownie: "Wyrazy podobne możemy zastąpić jednym: dodajemy lub odejmujemy współczynniki, a literę przepisujemy.",
          tex: "5x+2x=7x\\qquad5x-2x=3x\\qquad x-x=0",
          przyklad: "$6a+2b-4a+5b$: z literą $a$ mamy $6a-4a=2a$, z literą $b$ mamy $2b+5b=7b$. Razem $2a+7b$.",
          uwaga: "Różnych liter nie łączymy: $3a+2b$ nie jest równe $5ab$.",
        },
      ],
      jak: [
        "Znajdź wyrazy podobne: te same litery albo same liczby. Pamiętaj, że znak należy do wyrazu.",
        "Dla każdej grupy dodaj współczynniki (z ich znakami).",
        "Zapisz wynik: najpierw wyrazy z literami, na końcu liczba. Wyrazów z zerowym współczynnikiem nie zapisujemy.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Który wyraz jest podobny do wyrazu $-3a$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3b$", "$a^2$", "$-3$", "$5a$"],
          poprawna: 3,
        },
        {
          nr: "9",
          tresc: "Jaki jest współczynnik przy $b$ w sumie algebraicznej $7a-b+2$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-1$", "$1$", "$-7$", "$0$"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "Które wyrażenie jest równe sumie $5x+3-2x+4$ po uproszczeniu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10x$", "$3x+7$", "$3x-1$", "$7x+7$"],
          poprawna: 1,
        },
        {
          nr: "11",
          tresc: "Dana jest suma algebraiczna $4a-2b+a-7$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wyrazy $-2b$ i $-7$ są wyrazami podobnymi.", litery: "PF", poprawna: 1 },
            { tekst: "Wyrazy $4a$ i $a$ są wyrazami podobnymi.", litery: "PF", poprawna: 0 },
            { tekst: "Po uproszczeniu otrzymamy $5a-2b-7$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "12",
          tresc: "Które wyrażenie jest równe sumie $3a+2b-a-5b$ po uproszczeniu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2a+3b$", "$2a-7b$", "$2a-3b$", "$4a-3b$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Uprość sumę algebraiczną $8x-3y+2-5x+y-6$ i oblicz jej wartość dla $x=3$ i $y=-1$. **Zapisz obliczenia.**",
          rozwiazanie: "Wyrazy z literą $x$: $8x-5x=3x$.\n\nWyrazy z literą $y$: $-3y+y=-2y$.\n\nLiczby: $2-6=-4$.\n\nUproszczona suma: $3x-2y-4$.\n\nDla $x=3$ i $y=-1$: $3\\cdot3-2\\cdot(-1)-4=9+2-4=7$.\n\nOdpowiedź: Po uproszczeniu otrzymujemy $3x-2y-4$, a wartość sumy to $7$.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Zeszyt kosztuje $x$ zł, a długopis $y$ zł. Ala kupiła $4$ zeszyty i $3$ długopisy, a Ola kupiła $2$ zeszyty i $5$ długopisów. Zapisz sumę wydatków obu dziewcząt i uprość ją. Ile złotych zapłaciły razem, gdy zeszyt kosztuje $4$ zł, a długopis $3$ zł? **Zapisz obliczenia.**",
          rozwiazanie: "Ala zapłaciła $4x+3y$, a Ola $2x+5y$.\n\nRazem: $4x+3y+2x+5y$.\n\nWyrazy z $x$: $4x+2x=6x$. Wyrazy z $y$: $3y+5y=8y$. Suma: $6x+8y$.\n\nDla $x=4$ i $y=3$: $6\\cdot4+8\\cdot3=24+24=48$ zł.\n\nOdpowiedź: Razem zapłaciły $6x+8y$ zł, czyli $48$ zł.",
        },
      ],
      generatory: [
        {
          id: "dwie-litery",
          nazwa: "Dwie litery",
          opis: "Uprość sumę z dwiema literami i podaj współczynniki przy obu literach.",
          generuj(r) {
            const [v1, v2] = r.pick([["a", "b"], ["x", "y"], ["m", "n"], ["s", "t"]]);
            return probuj(() => {
              const c1 = nonzero(r, -9, 9);
              const c2 = nonzero(r, -9, 9);
              const d1 = nonzero(r, -9, 9);
              const d2 = nonzero(r, -9, 9);
              const s1 = c1 + c2;
              const s2 = d1 + d2;
              if (s1 === 0 || s2 === 0) return null;
              const wyrazy = r.shuffle([[c1, v1], [d1, v2], [c2, v1], [d2, v2]]);
              if (wyrazy[0][0] < 0) return null;
              return {
                tresc: `Uprość sumę algebraiczną $${wyr(wyrazy)}$. Podaj współczynniki przy $${v1}$ i przy $${v2}$ w uproszczonej sumie.`,
                pola: [pole("p", `Współczynnik przy $${v1}$ $=$`), pole("d", `Współczynnik przy $${v2}$ $=$`)],
                odpowiedz: { p: q(s1), d: q(s2) },
                wynik: `$${wyr([[s1, v1], [s2, v2]])}$`,
                rozwiazanie: [
                  `Wyrazy podobne to te z tą samą literą. Z literą $${v1}$: $${wyr([[c1, v1], [c2, v1]])} = ${wyr([[s1, v1]])}$.`,
                  `Z literą $${v2}$: $${wyr([[d1, v2], [d2, v2]])} = ${wyr([[s2, v2]])}$.`,
                  `Uproszczona suma: $${wyr([[s1, v1], [s2, v2]])}$.`,
                ],
              };
            });
          },
        },
        {
          id: "wyraz-wolny",
          nazwa: "Litera i liczby",
          opis: "Uprość sumę z jedną literą i liczbami. Podaj współczynnik i wyraz wolny.",
          generuj(r) {
            const v = r.pick(["x", "a", "n", "t"]);
            return probuj(() => {
              const a = nonzero(r, -9, 9);
              const b = nonzero(r, -9, 9);
              const c = nonzero(r, -9, 9);
              const d = nonzero(r, -9, 9);
              const s = a + b;
              const t = c + d;
              if (s === 0 || t === 0) return null;
              const wyrazy = r.shuffle([[a, v], [c, ""], [b, v], [d, ""]]);
              if (wyrazy[0][0] < 0) return null;
              return {
                tresc: `Uprość sumę algebraiczną $${wyr(wyrazy)}$. Podaj współczynnik przy $${v}$ i wyraz wolny (liczbę bez litery) w uproszczonej sumie.`,
                pola: [pole("p", `Współczynnik przy $${v}$ $=$`), pole("w", "Wyraz wolny $=$")],
                odpowiedz: { p: q(s), w: q(t) },
                wynik: `$${wyr([[s, v], [t, ""]])}$`,
                rozwiazanie: [
                  `Wyrazy z literą $${v}$: $${wyr([[a, v], [b, v]])} = ${wyr([[s, v]])}$.`,
                  `Same liczby: $${wyr([[c, ""], [d, ""]])} = ${t}$.`,
                  `Uproszczona suma: $${wyr([[s, v], [t, ""]])}$. Współczynnik to $${s}$, wyraz wolny to $${t}$.`,
                ],
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Opuszczanie nawiasów
    {
      id: "opuszczanie-nawiasow",
      nazwa: "Opuszczanie nawiasów",
      sciaga: [
        {
          nazwa: "Plus przed nawiasem",
          slownie: "Gdy przed nawiasem stoi plus (albo nic), nawias po prostu pomijamy. Znaki wyrazów w środku zostają takie same.",
          tex: "a+(b-c)=a+b-c",
          przyklad: "$5x+(3x-2)=5x+3x-2=8x-2$.",
          uwaga: "Przy plusie niczego nie zmieniamy. Zmiana znaków dotyczy tylko minusa.",
        },
        {
          nazwa: "Minus przed nawiasem",
          slownie: "Gdy przed nawiasem stoi minus, zmieniamy znak każdego wyrazu w nawiasie na przeciwny: plus na minus, a minus na plus.",
          tex: "a-(b-c)=a-b+c",
          przyklad: "$7x-(2x-5)=7x-2x+5=5x+5$.",
          uwaga: "Zmieniamy znaki wszystkich wyrazów w nawiasie, nie tylko pierwszego. $7x-(2x-5)$ to nie $7x-2x-5$.",
        },
        {
          nazwa: "Liczba razy nawias",
          slownie: "Liczbę stojącą przed nawiasem mnożymy przez każdy wyraz w nawiasie.",
          tex: "k(a+b)=ka+kb\\qquad k(a-b)=ka-kb",
          litery: "$k$ – liczba przed nawiasem.",
          przyklad: "$3(2x-4)=3\\cdot2x-3\\cdot4=6x-12$.",
          uwaga: "Mnożymy przez wszystkie wyrazy, nie tylko przez pierwszy. $3(2x-4)$ to nie $6x-4$.",
        },
        {
          nazwa: "Liczba ujemna przed nawiasem",
          slownie: "Mnożymy tak samo, ale pilnujemy znaków: minus razy minus daje plus. Sam minus przed nawiasem działa jak mnożenie przez $-1$.",
          tex: "-(a-b)=-a+b\\qquad-2(a-b)=-2a+2b",
          przyklad: "$-2(x-3)=-2\\cdot x-2\\cdot(-3)=-2x+6$.",
          uwaga: "$-2\\cdot(-3)$ to $+6$, a nie $-6$.",
        },
      ],
      jak: [
        "Zobacz, co stoi przed nawiasem: plus, minus czy liczba.",
        "Plus: przepisz wyrazy bez zmian. Minus: zmień znaki wszystkich wyrazów w nawiasie. Liczba: pomnóż ją przez każdy wyraz.",
        "Zbierz wyrazy podobne i uprość.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Które wyrażenie jest równe $5a-(2a-3)$ po uproszczeniu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3a-3$", "$3a+3$", "$7a-3$", "$7a+3$"],
          poprawna: 1,
        },
        {
          nr: "16",
          tresc: "Które wyrażenie jest równe $3(2x-5)$ po opuszczeniu nawiasu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6x-5$", "$6x+15$", "$6x-15$", "$5x-15$"],
          poprawna: 2,
        },
        {
          nr: "17",
          tresc: "Które wyrażenie jest równe $-2(a-4)$ po opuszczeniu nawiasu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-2a-8$", "$-2a-4$", "$2a-8$", "$-2a+8$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "Dane jest wyrażenie $6x-(3x-2)+4$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Po uproszczeniu otrzymamy $3x+6$.", litery: "PF", poprawna: 0 },
            { tekst: "Po opuszczeniu nawiasu otrzymamy $6x-3x-2+4$.", litery: "PF", poprawna: 1 },
            { tekst: "Dla $x=2$ wartość wyrażenia wynosi $12$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "19",
          tresc: "Które wyrażenie jest równe $2(x+3)+(x-4)$ po uproszczeniu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3x+2$", "$3x-1$", "$2x+2$", "$3x+10$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Opuść nawiasy i uprość wyrażenie $5a-(2a-7)+3(a+1)$. **Zapisz obliczenia.**",
          rozwiazanie: "Przed pierwszym nawiasem stoi minus, więc zmieniamy znaki w nawiasie: $-(2a-7)=-2a+7$.\n\nDrugi nawias: $3(a+1)=3a+3$.\n\nCałość: $5a-2a+7+3a+3$.\n\nWyrazy z literą $a$: $5a-2a+3a=6a$. Liczby: $7+3=10$.\n\nOdpowiedź: $6a+10$.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Kwadrat ma bok długości $x+2$ cm. Prostokąt ma boki długości $x$ cm i $x+1$ cm. Zapisz obwód kwadratu i obwód prostokąta, opuść nawiasy i uprość. O ile centymetrów obwód kwadratu jest większy od obwodu prostokąta? **Zapisz obliczenia.**",
          rozwiazanie: "Obwód kwadratu: $4(x+2)=4x+8$ cm.\n\nObwód prostokąta: $2x+2(x+1)=2x+2x+2=4x+2$ cm.\n\nRóżnica: $(4x+8)-(4x+2)=4x+8-4x-2=6$ cm.\n\nOdpowiedź: Obwód kwadratu jest o $6$ cm większy od obwodu prostokąta, niezależnie od $x$.",
        },
      ],
      generatory: [
        {
          id: "minus-przed-nawiasem",
          nazwa: "Plus lub minus przed nawiasem",
          opis: "Opuść nawias, przed którym stoi plus albo minus, i uprość. Podaj współczynnik przy literze i wyraz wolny.",
          generuj(r) {
            const v = r.pick(["x", "a", "y", "m"]);
            return probuj(() => {
              const A = r.int(2, 9);
              const B = nonzero(r, -9, 9);
              const C = nonzero(r, -7, 7);
              const D = nonzero(r, -9, 9);
              const s = r.chance() ? 1 : -1;
              const cx = A + s * C;
              const t = B + s * D;
              if (cx === 0 || t === 0) return null;
              const wyraz = `${wyr([[A, v], [B, ""]])} ${s < 0 ? "-" : "+"} (${wyr([[C, v], [D, ""]])})`;
              const bezNawiasu = wyr([[A, v], [B, ""], [s * C, v], [s * D, ""]]);
              return {
                tresc: `Opuść nawias i uprość wyrażenie $${wyraz}$. Podaj współczynnik przy $${v}$ i wyraz wolny w uproszczonym wyrażeniu.`,
                pola: [pole("p", `Współczynnik przy $${v}$ $=$`), pole("w", "Wyraz wolny $=$")],
                odpowiedz: { p: q(cx), w: q(t) },
                wynik: `$${wyr([[cx, v], [t, ""]])}$`,
                rozwiazanie: [
                  s > 0
                    ? `Przed nawiasem stoi plus, więc opuszczamy go bez zmiany znaków: $${bezNawiasu}$.`
                    : `Przed nawiasem stoi minus, więc zmieniamy znak każdego wyrazu w nawiasie: $${bezNawiasu}$.`,
                  `Wyrazy z literą $${v}$: $${wyr([[A, v], [s * C, v]])} = ${wyr([[cx, v]])}$.`,
                  `Liczby: $${wyr([[B, ""], [s * D, ""]])} = ${t}$.`,
                  `Wynik: $${wyr([[cx, v], [t, ""]])}$.`,
                ],
              };
            });
          },
        },
        {
          id: "liczba-razy-nawias",
          nazwa: "Liczba razy nawias",
          opis: "Pomnóż liczbę przez nawias (także liczbę ujemną), a potem uprość. Podaj współczynnik przy literze i wyraz wolny.",
          generuj(r) {
            const v = r.pick(["x", "a", "n", "t"]);
            return probuj(() => {
              const k = r.pick([-5, -4, -3, -2, 2, 3, 4, 5]);
              const a = nonzero(r, -4, 4);
              const b = nonzero(r, -8, 8);
              const e = r.chance(0.6) ? nonzero(r, -6, 6) : 0;
              const cx = k * a + e;
              const t = k * b;
              if (cx === 0) return null;
              const wyraz = `${k}(${wyr([[a, v], [b, ""]])})${ogon(e, v)}`;
              const kroki = [
                `Liczbę $${k}$ mnożymy przez każdy wyraz w nawiasie: $${nz(k)} \\cdot ${nz(a)} = ${k * a}$ oraz $${nz(k)} \\cdot ${nz(b)} = ${t}$.`,
                `Po opuszczeniu nawiasu: $${wyr([[k * a, v], [t, ""]])}${ogon(e, v)}$.`,
              ];
              if (e !== 0) kroki.push(`Wyrazy z literą $${v}$: $${wyr([[k * a, v], [e, v]])} = ${wyr([[cx, v]])}$.`);
              kroki.push(`Wynik: $${wyr([[cx, v], [t, ""]])}$.`);
              return {
                tresc: `Opuść nawias i uprość wyrażenie $${wyraz}$. Podaj współczynnik przy $${v}$ i wyraz wolny w uproszczonym wyrażeniu.`,
                pola: [pole("p", `Współczynnik przy $${v}$ $=$`), pole("w", "Wyraz wolny $=$")],
                odpowiedz: { p: q(cx), w: q(t) },
                wynik: `$${wyr([[cx, v], [t, ""]])}$`,
                rozwiazanie: kroki,
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Porządkowanie wyrazów w sumach algebraicznych
    {
      id: "porzadkowanie-wyrazow",
      nazwa: "Porządkowanie wyrazów w sumach algebraicznych",
      sciaga: [
        {
          nazwa: "Jak uporządkować sumę",
          slownie: "Najpierw opuszczamy nawiasy. Potem ustawiamy obok siebie wyrazy podobne i je redukujemy. Zwykle zapisujemy najpierw wyrazy z literami, a na końcu liczbę.",
          przyklad: "$3x+4-(x-1)+2x$. Opuszczamy nawias: $3x+4-x+1+2x$. Redukujemy: $3x-x+2x=4x$ oraz $4+1=5$. Wynik: $4x+5$.",
        },
        {
          nazwa: "Przestawianie wyrazów",
          slownie: "Wyrazy w sumie można przestawiać, ale razem ze znakiem, który stoi przed nimi.",
          przyklad: "$5-2x+3x$ możemy zapisać jako $-2x+3x+5$. Po redukcji: $x+5$.",
          uwaga: "Przestawiając wyraz $-2x$, zabierz też minus. Inaczej wynik się zmieni.",
        },
        {
          nazwa: "Kilka liter",
          slownie: "Gdy są dwie litery, wyrazy podobne zbieramy osobno: wszystkie z pierwszą literą, wszystkie z drugą i same liczby.",
          przyklad: "$2a+3b-a+4-b+6$. Z literą $a$: $2a-a=a$. Z literą $b$: $3b-b=2b$. Liczby: $4+6=10$. Wynik: $a+2b+10$.",
        },
        {
          nazwa: "Wartość po uproszczeniu",
          slownie: "Uproszczone wyrażenie ma taką samą wartość jak wyjściowe, ale liczy się je łatwiej. Dlatego najpierw upraszczamy, a dopiero potem wstawiamy liczbę.",
          przyklad: "Dla $x=5$ wyrażenie $4x-(x-2)+x$ upraszczamy: $4x-x+2+x=4x+2$. Potem $4\\cdot5+2=22$.",
          uwaga: "Wstawianie liczby przed opuszczeniem nawiasów łatwo kończy się błędem w znakach.",
        },
      ],
      jak: [
        "Opuść wszystkie nawiasy (plus: bez zmian, minus: zmień znaki, liczba: pomnóż).",
        "Zbierz wyrazy podobne: osobno każda litera i osobno liczby.",
        "Zredukuj je i zapisz wynik: najpierw litery, na końcu liczba.",
        "Gdy trzeba obliczyć wartość, wstaw liczbę dopiero do uproszczonego wyrażenia.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Które wyrażenie jest równe $7x-(3x-5)+2$ po uproszczeniu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4x-3$", "$4x+3$", "$4x+7$", "$10x+7$"],
          poprawna: 2,
        },
        {
          nr: "23",
          tresc: "Które wyrażenie jest równe $2a+5b-a-3b+4$ po uproszczeniu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3a+8b+4$", "$a+8b+4$", "$3a+2b+4$", "$a+2b+4$"],
          poprawna: 3,
        },
        {
          nr: "24",
          tresc: "Które wyrażenie ma już uproszczoną postać (nie ma wyrazów podobnych)? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3a+4b-2$", "$5x-x+2$", "$7+y-3$", "$2m-m$"],
          poprawna: 0,
        },
        {
          nr: "25",
          tresc: "Ile wynosi wartość wyrażenia $3x-(x-4)+x$ dla $x=-2$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$", "$-2$", "$-6$", "$10$"],
          poprawna: 1,
        },
        {
          nr: "26",
          tresc: "Trójkąt ma boki długości $a$ cm, $a+4$ cm i $2a-1$ cm. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Obwód trójkąta wynosi $4a+3$ cm.", litery: "PF", poprawna: 0 },
            { tekst: "Obwód trójkąta wynosi $4a+5$ cm.", litery: "PF", poprawna: 1 },
            { tekst: "Dla $a=2$ obwód trójkąta wynosi $11$ cm.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Uprość wyrażenie $3(2x-1)-4x+(x+5)-2$, a potem oblicz jego wartość dla $x=-4$. **Zapisz obliczenia.**",
          rozwiazanie: "Mnożymy: $3(2x-1)=6x-3$. Nawias z plusem opuszczamy bez zmian: $(x+5)=x+5$.\n\nWyrażenie: $6x-3-4x+x+5-2$.\n\nWyrazy z literą $x$: $6x-4x+x=3x$. Liczby: $-3+5-2=0$.\n\nUproszczone wyrażenie: $3x$.\n\nDla $x=-4$: $3\\cdot(-4)=-12$.\n\nOdpowiedź: Po uproszczeniu otrzymujemy $3x$, a wartość wyrażenia to $-12$.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "W sklepie zeszyt kosztuje $x$ zł, długopis kosztuje $x+2$ zł, a pióro $3x$ zł. Kasia kupiła $2$ zeszyty, $3$ długopisy i $1$ pióro. Zapisz kwotę, którą zapłaciła, i uprość wyrażenie. Ile reszty dostała z banknotu $50$ zł, gdy $x=5$? **Zapisz obliczenia.**",
          rozwiazanie: "Kwota: $2x+3(x+2)+3x$.\n\nOpuszczamy nawias: $3(x+2)=3x+6$, więc kwota to $2x+3x+6+3x$.\n\nWyrazy z literą $x$: $2x+3x+3x=8x$. Razem: $8x+6$.\n\nDla $x=5$: $8\\cdot5+6=46$ zł.\n\nReszta: $50-46=4$ zł.\n\nOdpowiedź: Kasia zapłaciła $8x+6$ zł, czyli $46$ zł, i dostała $4$ zł reszty.",
        },
      ],
      generatory: [
        {
          id: "porzadkowanie-dwie-litery",
          nazwa: "Nawias i dwie litery",
          opis: "Opuść nawias i uprość sumę z dwiema literami. Podaj współczynniki przy obu literach.",
          generuj(r) {
            const [v1, v2] = r.pick([["a", "b"], ["x", "y"], ["m", "n"], ["s", "t"]]);
            return probuj(() => {
              const A = nonzero(r, -6, 6);
              const B = nonzero(r, -6, 6);
              const C = nonzero(r, -6, 6);
              const D = nonzero(r, -6, 6);
              const E = nonzero(r, -6, 6);
              const s = r.chance() ? 1 : -1;
              const naPierwszej = r.chance();
              const ev = naPierwszej ? v1 : v2;
              const cx = A + s * C + (naPierwszej ? E : 0);
              const cy = B + s * D + (naPierwszej ? 0 : E);
              if (cx === 0 || cy === 0 || A < 0) return null;
              const wyraz = `${wyr([[A, v1], [B, v2]])} ${s < 0 ? "-" : "+"} (${wyr([[C, v1], [D, v2]])})${ogon(E, ev)}`;
              const bez = wyr([[A, v1], [B, v2], [s * C, v1], [s * D, v2], [E, ev]]);
              const zV1 = [[A, v1], [s * C, v1], ...(naPierwszej ? [[E, v1]] : [])];
              const zV2 = [[B, v2], [s * D, v2], ...(naPierwszej ? [] : [[E, v2]])];
              return {
                tresc: `Opuść nawias i uprość wyrażenie $${wyraz}$. Podaj współczynniki przy $${v1}$ i przy $${v2}$ w uproszczonym wyrażeniu.`,
                pola: [pole("p", `Współczynnik przy $${v1}$ $=$`), pole("d", `Współczynnik przy $${v2}$ $=$`)],
                odpowiedz: { p: q(cx), d: q(cy) },
                wynik: `$${wyr([[cx, v1], [cy, v2]])}$`,
                rozwiazanie: [
                  s > 0
                    ? `Przed nawiasem stoi plus, więc opuszczamy go bez zmiany znaków: $${bez}$.`
                    : `Przed nawiasem stoi minus, więc zmieniamy znak każdego wyrazu w nawiasie: $${bez}$.`,
                  `Wyrazy z literą $${v1}$: $${wyr(zV1)} = ${wyr([[cx, v1]])}$.`,
                  `Wyrazy z literą $${v2}$: $${wyr(zV2)} = ${wyr([[cy, v2]])}$.`,
                  `Wynik: $${wyr([[cx, v1], [cy, v2]])}$.`,
                ],
              };
            });
          },
        },
        {
          id: "uprosc-i-oblicz",
          nazwa: "Uprość i oblicz",
          opis: "Uprość wyrażenie z nawiasami, a potem oblicz jego wartość dla podanej liczby.",
          generuj(r) {
            const v = r.pick(["x", "a", "t"]);
            return probuj(() => {
              const k = r.int(2, 4);
              const a = r.int(1, 4);
              const b = nonzero(r, -6, 6);
              const c = r.int(1, 5);
              const d = nonzero(r, -6, 6);
              const e = r.int(-6, 6);
              const s = r.chance() ? 1 : -1;
              const liczba = nonzero(r, -4, 5);
              const cx = k * a + s * c;
              const t = k * b + s * d + e;
              if (cx === 0 || (cx === 1 && t === 0)) return null;
              const w = cx * liczba + t;
              const wyraz = `${k}(${wyr([[a, v], [b, ""]])}) ${s < 0 ? "-" : "+"} (${wyr([[c, v], [d, ""]])})${ogon(e, "")}`;
              const bez = wyr([[k * a, v], [k * b, ""], [s * c, v], [s * d, ""], [e, ""]]);
              return {
                tresc: `Uprość wyrażenie $${wyraz}$, a potem oblicz jego wartość dla $${v}=${liczba}$.`,
                pola: [pole("w", "Wartość $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Mnożymy liczbę przez nawias i opuszczamy drugi nawias (${s > 0 ? "plus: bez zmiany znaków" : "minus: zmieniamy znaki"}): $${bez}$.`,
                  `Zbieramy wyrazy podobne: $${wyr([[cx, v], [t, ""]])}$.`,
                  `Wstawiamy $${v}=${liczba}$: $${cx} \\cdot ${nz(liczba)}${t === 0 ? "" : ` ${t < 0 ? "-" : "+"} ${Math.abs(t)}`} = ${w}$.`,
                ],
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Wyrażenia algebraiczne i procenty
    {
      id: "wyrazenia-i-procenty",
      nazwa: "Wyrażenia algebraiczne i procenty",
      sciaga: [
        {
          nazwa: "Procent z całości",
          slownie: "Procent zapisujemy jako ułamek dziesiętny i mnożymy przez $x$. Wynik to wyraz z literą.",
          tex: "p\\%\\text{ z }x=\\frac{p}{100}\\cdot x",
          litery: "$p$ – liczba procent, $x$ – całość.",
          przyklad: "Rower kosztuje $x$ zł. $20\\%$ ceny to $0{,}2x$ zł, a $5\\%$ ceny to $0{,}05x$ zł.",
          uwaga: "$20\\%$ z $x$ to $0{,}2x$, a nie $0{,}02x$ ani $20x$.",
        },
        {
          nazwa: "Podwyżka o dany procent",
          slownie: "Gdy cena $x$ rośnie o $p\\%$, nowa cena to $x$ plus $p\\%$ z $x$. Wyrazy podobne dodajemy i dostajemy jedno mnożenie.",
          tex: "x+0{,}2x=1{,}2x",
          przyklad: "Bilet kosztował $x$ zł i zdrożał o $20\\%$. Nowa cena to $x+0{,}2x=1{,}2x$ zł. Dla $x=40$: $1{,}2\\cdot40=48$ zł.",
          uwaga: "$x+20$ to podwyżka o $20$ zł, a nie o $20\\%$.",
        },
        {
          nazwa: "Obniżka o dany procent",
          slownie: "Gdy cena $x$ maleje o $p\\%$, od $x$ odejmujemy $p\\%$ z $x$. Znowu dostajemy jedno mnożenie.",
          tex: "x-0{,}25x=0{,}75x",
          przyklad: "Kurtka kosztuje $x$ zł. Po obniżce o $25\\%$ kosztuje $x-0{,}25x=0{,}75x$ zł. Dla $x=200$: $0{,}75\\cdot200=150$ zł.",
          uwaga: "$0{,}25x$ to tylko wysokość obniżki, a nie nowa cena.",
        },
        {
          nazwa: "Sumy z procentami",
          slownie: "Gdy jest kilka wielkości, każdą zapisujemy osobno jako wyrażenie z $x$. Potem dodajemy i redukujemy wyrazy podobne.",
          przyklad: "Ala ma $x$ zł, a Ola ma o $50\\%$ więcej, czyli $1{,}5x$ zł. Razem mają $x+1{,}5x=2{,}5x$ zł.",
        },
      ],
      jak: [
        "Oznacz literą wielkość początkową (np. cenę przed zmianą $x$).",
        "Zapisz procent jako ułamek dziesiętny i pomnóż przez $x$, np. $20\\%$ z $x$ to $0{,}2x$.",
        "Podwyżka: dodaj ten wyraz do $x$. Obniżka: odejmij go od $x$. Zredukuj wyrazy podobne.",
        "Wstaw liczbę za $x$ i policz. Sprawdź, czy wynik ma sens (po podwyżce więcej, po obniżce mniej).",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Cena towaru to $x$ zł. Sklep podwyższył ją o $30\\%$. Które wyrażenie opisuje nową cenę? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}3x$", "$1{,}3x$", "$x+30$", "$1{,}03x$"],
          poprawna: 1,
        },
        {
          nr: "30",
          tresc: "Kurtka kosztuje $x$ zł. Sklep obniżył jej cenę o $15\\%$. Które wyrażenie opisuje nową cenę kurtki? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}15x$", "$x-15$", "$1{,}15x$", "$0{,}85x$"],
          poprawna: 3,
        },
        {
          nr: "31",
          tresc: "Spodnie kosztują $x$ zł, a bluzka kosztuje o $40\\%$ więcej niż spodnie. Które wyrażenie opisuje cenę spodni i bluzki razem? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2{,}4x$", "$1{,}4x$", "$2{,}04x$", "$x+40$"],
          poprawna: 0,
        },
        {
          nr: "32",
          tresc: "Telefon kosztował $x$ zł. Sklep obniżył jego cenę o $0{,}15x$ zł. O ile procent obniżono cenę telefonu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1{,}5\\%$", "$0{,}15\\%$", "$15\\%$", "$85\\%$"],
          poprawna: 2,
        },
        {
          nr: "33",
          tresc: "Książka kosztuje $x$ zł. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Po podwyżce o $20\\%$ cena książki wynosi $1{,}2x$ zł.", litery: "PF", poprawna: 0 },
            { tekst: "Po obniżce o $20\\%$ cena książki wynosi $0{,}2x$ zł.", litery: "PF", poprawna: 1 },
            { tekst: "Dla $x=50$ cena książki po obniżce o $20\\%$ wynosi $30$ zł.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 3,
          tresc: "Kasia ma $x$ zł. Basia ma o $20\\%$ więcej niż Kasia, a Zosia ma o $50\\%$ mniej niż Kasia. Zapisz wyrażeniami, ile pieniędzy ma Basia i ile ma Zosia. Zapisz i uprość sumę pieniędzy wszystkich trzech dziewcząt. Ile złotych mają razem, gdy $x=40$? **Zapisz obliczenia.**",
          rozwiazanie: "Basia: $x+0{,}2x=1{,}2x$ zł.\n\nZosia: $x-0{,}5x=0{,}5x$ zł.\n\nRazem: $x+1{,}2x+0{,}5x=2{,}7x$ zł.\n\nDla $x=40$: $2{,}7\\cdot40=108$ zł.\n\nOdpowiedź: Dziewczęta mają razem $2{,}7x$ zł, czyli $108$ zł dla $x=40$.",
        },
        {
          nr: "35",
          punkty: 3,
          tresc: "Cena biletu to $x$ zł. W poniedziałek cenę obniżono o $10\\%$, a w piątek podwyższono o $10\\%$. Zapisz wyrażeniami cenę biletu w poniedziałek i w piątek. Zapisz i uprość różnicę tych cen. O ile złotych bilet jest droższy w piątek niż w poniedziałek, gdy $x=30$? **Zapisz obliczenia.**",
          rozwiazanie: "Poniedziałek: $x-0{,}1x=0{,}9x$ zł.\n\nPiątek: $x+0{,}1x=1{,}1x$ zł.\n\nRóżnica: $1{,}1x-0{,}9x=0{,}2x$ zł.\n\nDla $x=30$: $0{,}2\\cdot30=6$ zł.\n\nOdpowiedź: W piątek bilet jest droższy o $0{,}2x$ zł, czyli o $6$ zł dla $x=30$.",
        },
      ],
      generatory: [
        {
          id: "wzor-z-procentem",
          nazwa: "Który wzór?",
          opis: "Wybierz wyrażenie opisujące cenę po podwyżce lub obniżce o dany procent.",
          generuj(r) {
            const rzecz = r.pick(RZECZY);
            const p = r.pick([5, 10, 15, 20, 25, 30, 40, 60, 70, 75]);
            const wzrost = r.chance();
            const s = wzrost ? 1 : -1;
            const poprawne = `${dz(q(100 + s * p, 100))}x`;
            const bledne = [`${dz(q(p, 100))}x`, `x ${wzrost ? "+" : "-"} ${p}`, `${dz(q(100 - s * p, 100))}x`];
            const opcje = r.shuffle([poprawne, ...bledne]).map((o) => `$${o}$`);
            return {
              tresc: `Cena ${rzecz} wynosi $x$ zł. Sklep ${wzrost ? "podwyższył" : "obniżył"} tę cenę o $${p}\\%$. Które wyrażenie opisuje nową cenę?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Nowa cena", opcje }],
              odpowiedz: { w: opcje.indexOf(`$${poprawne}$`) },
              wynik: `$${poprawne}$`,
              rozwiazanie: [
                `$${p}\\%$ ceny to $${dz(q(p, 100))}x$.`,
                `${wzrost ? "Podwyżka" : "Obniżka"}: $x ${wzrost ? "+" : "-"} ${dz(q(p, 100))}x = ${poprawne}$.`,
              ],
            };
          },
        },
        {
          id: "cena-po-zmianie",
          nazwa: "Cena po zmianie",
          opis: "Zapisz wyrażeniem cenę po podwyżce lub obniżce, wstaw liczbę za $x$ i oblicz.",
          generuj(r) {
            return probuj(() => {
              const p = r.pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 75]);
              const N = r.pick([20, 40, 50, 60, 80, 100, 120, 150, 200, 250, 300, 400]);
              const wzrost = r.chance();
              const s = wzrost ? 1 : -1;
              if (r.chance()) {
                const rzecz = r.pick(RZECZY);
                const wsp = q(100 + s * p, 100);
                const w = wsp.mul(N);
                if (w.d > 2) return null;
                return {
                  tresc: `Cena ${rzecz} wynosi $x$ zł. Sklep ${wzrost ? "podwyższył" : "obniżył"} tę cenę o $${p}\\%$. Zapisz nową cenę wyrażeniem z $x$ i oblicz ją dla $x=${N}$ zł.`,
                  pola: [pole("w", "Nowa cena (w zł) $=$")],
                  odpowiedz: { w },
                  wynik: `$${dz(w)}$ zł`,
                  rozwiazanie: [
                    `$${p}\\%$ ceny to $${dz(q(p, 100))}x$.`,
                    `Nowa cena: $x ${wzrost ? "+" : "-"} ${dz(q(p, 100))}x = ${dz(wsp)}x$.`,
                    `Wstawiamy $x=${N}$: $${dz(wsp)} \\cdot ${N} = ${dz(w)}$ zł.`,
                  ],
                };
              }
              const [A, B] = r.pick([["Ala", "Ola"], ["Kuba", "Paweł"], ["Ewa", "Marta"]]);
              const wspB = q(100 + s * p, 100);
              const wspRazem = q(200 + s * p, 100);
              const w = wspRazem.mul(N);
              if (w.d > 2) return null;
              return {
                tresc: `${A} ma $x$ zł, a ${B} ma o $${p}\\%$ ${wzrost ? "więcej" : "mniej"} pieniędzy niż ${A}. Zapisz wyrażeniem, ile złotych mają razem, i oblicz to dla $x=${N}$.`,
                pola: [pole("w", "Razem (w zł) $=$")],
                odpowiedz: { w },
                wynik: `$${dz(w)}$ zł`,
                rozwiazanie: [
                  `${B} ma $x ${wzrost ? "+" : "-"} ${dz(q(p, 100))}x = ${dz(wspB)}x$ zł.`,
                  `Razem: $x + ${dz(wspB)}x = ${dz(wspRazem)}x$ zł.`,
                  `Wstawiamy $x=${N}$: $${dz(wspRazem)} \\cdot ${N} = ${dz(w)}$ zł.`,
                ],
              };
            });
          },
        },
      ],
    },
  ],
};
