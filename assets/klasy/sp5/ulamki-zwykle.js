// Klasa 5 (szkoła podstawowa) · rozdział III „Ułamki zwykłe” – Matematyka z kluczem 5 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

const NWD = (a, b) => (b ? NWD(b, a % b) : Math.abs(a));
const NWW = (a, b) => (a / NWD(a, b)) * b;

/** „Ładna” odpowiedź w szkole podstawowej: mianownik co najwyżej 40. */
const ladna = (v) => Math.abs(v.n) <= 100000 && (v.d <= 40 || 10000 % v.d === 0);

/** Ułamek zwykły w LaTeX: fr(3, 4) = "\frac{3}{4}". */
const fr = (n, d) => `\\frac{${n}}{${d}}`;

/** Liczba mieszana w LaTeX: mn(2, 1, 3) = "2\frac{1}{3}" (bez całości, gdy w = 0). */
const mn = (w, n, d) => (w === 0 ? fr(n, d) : `${w}\\frac{${n}}{${d}}`);

/** Wartość w postaci liczby mieszanej (albo ułamka właściwego, albo liczby naturalnej). */
const mieszana = (v) => {
  v = Q.z(v);
  if (v.d === 1) return `${v.n}`;
  const w = Math.floor(v.n / v.d);
  return mn(w, v.n - w * v.d, v.d);
};

/** Wynik do pokazania: ułamek niewłaściwy z liczbą mieszaną, np. "\frac{7}{4}=1\frac{3}{4}". */
const wynikTex = (v) => (v.d !== 1 && v.n > v.d ? `${v.tex()} = ${mieszana(v)}` : v.tex());

/** Końcówka rozwiązania: skracanie ułamka [licznik, mianownik] i zamiana ułamka niewłaściwego na liczbę mieszaną. */
function koncowka([n, d], res) {
  const kroki = [];
  if (res.n !== n || res.d !== d) kroki.push(`Skracamy: $${fr(n, d)} = ${res.tex()}$.`);
  if (res.d !== 1 && res.n > res.d) kroki.push(`To ułamek niewłaściwy, więc możemy go zapisać jako liczbę mieszaną: $${res.tex()} = ${mieszana(res)}$.`);
  return kroki;
}

/** Ułamek właściwy nieskracalny [licznik, mianownik] z mianownikiem od dMin do dMax. */
function prosty(r, dMin, dMax) {
  for (;;) {
    const d = r.int(dMin, dMax);
    const n = r.int(1, d - 1);
    if (NWD(n, d) === 1) return [n, d];
  }
}

/** Odmiana rzeczownika po liczebniku: liczebnik(3, ["pizza", "pizze", "pizz"]) = "pizze". */
const liczebnik = (n, [f1, f24, f5]) => (n === 1 ? f1 : n % 10 >= 2 && n % 10 <= 4 && !(n % 100 >= 12 && n % 100 <= 14) ? f24 : f5);

const POLECENIE = "Wynik wpisz jako ułamek (np. 7/4) albo liczbę.";

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 1
    {
      id: "ulamek-czesc-iloraz",
      nazwa: "Ułamek jako część i jako iloraz",
      sciaga: [
        {
          nazwa: "Ułamek jako część całości",
          slownie: "Mianownik mówi, na ile równych części podzielono całość. Licznik mówi, ile takich części bierzemy.",
          tex: "\\frac{\\text{licznik}}{\\text{mianownik}}",
          przyklad: "Pizzę pokrojono na $8$ równych kawałków. Jaś zjadł $3$ kawałki, czyli $\\frac{3}{8}$ pizzy.",
          uwaga: "Części muszą być równe. Gdy kawałki są różnej wielkości, nie możemy zapisać ich ułamkiem.",
        },
        {
          nazwa: "Ułamek jako iloraz",
          slownie: "Kreska ułamkowa oznacza dzielenie. Licznik to liczba dzielona, a mianownik to liczba, przez którą dzielimy.",
          tex: "a:b=\\frac{a}{b}",
          litery: "$a$ – liczba dzielona (licznik), $b$ – dzielnik (mianownik), $b$ nie może być równe $0$.",
          przyklad: "$3$ pizze dzielimy po równo między $4$ osoby: $3:4=\\frac{3}{4}$, czyli jedna osoba dostanie $\\frac{3}{4}$ pizzy.",
          uwaga: "Nie wolno dzielić przez $0$, dlatego mianownik nigdy nie jest zerem.",
        },
        {
          nazwa: "Ułamek niewłaściwy i liczba mieszana",
          slownie: "Gdy licznik jest większy od mianownika (albo równy), mamy ułamek niewłaściwy: to co najmniej jedna całość. Można go zapisać jako liczbę mieszaną.",
          tex: "\\frac{11}{4}=2\\frac{3}{4}\\qquad 3\\frac{2}{5}=\\frac{17}{5}",
          przyklad: "$11:4=2$ i reszta $3$, więc $\\frac{11}{4}=2\\frac{3}{4}$. W drugą stronę: $3\\frac{2}{5}=\\frac{3\\cdot 5+2}{5}=\\frac{17}{5}$.",
          uwaga: "Mianownik przy zamianie się nie zmienia, zmienia się tylko licznik.",
        },
        {
          nazwa: "Porównywanie ułamków",
          slownie: "Gdy mianowniki są takie same, większy jest ułamek z większym licznikiem. Gdy liczniki są takie same, większy jest ułamek z mniejszym mianownikiem.",
          przyklad: "$\\frac{5}{9}>\\frac{2}{9}$, bo $5>2$. Natomiast $\\frac{3}{4}>\\frac{3}{8}$, bo ćwiartki są większe niż ósemki.",
          uwaga: "Na im więcej części dzielimy całość, tym mniejsza jest jedna część.",
        },
      ],
      jak: [
        "Ułamek niewłaściwy na liczbę mieszaną: podziel licznik przez mianownik.",
        "Wynik dzielenia to liczba całości, a reszta to nowy licznik. Mianownik zostaje taki sam.",
        "Liczba mieszana na ułamek niewłaściwy: pomnóż całości przez mianownik i dodaj licznik. Mianownik zostaje taki sam.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Tort podzielono na $12$ równych kawałków. Kasia zjadła $5$ kawałków. Jaką część tortu zjadła Kasia? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{7}{12}$", "$\\frac{5}{12}$", "$\\frac{12}{5}$", "$\\frac{5}{7}$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Jak zapisać ułamek niewłaściwy $\\frac{17}{5}$ jako liczbę mieszaną? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3\\frac{1}{5}$", "$2\\frac{3}{5}$", "$5\\frac{2}{3}$", "$3\\frac{2}{5}$"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Ułamek $\\frac{9}{4}$ jest ułamkiem niewłaściwym.", litery: "PF", poprawna: 0 },
            { tekst: "Iloraz $3:5$ jest równy $\\frac{5}{3}$.", litery: "PF", poprawna: 1 },
            { tekst: "Liczba mieszana $1\\frac{2}{5}$ jest równa $\\frac{7}{5}$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "4",
          tresc: "Trzy jednakowe pizze podzielono po równo między $4$ osoby. Jaką część pizzy dostała jedna osoba? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{3}{4}$", "$\\frac{4}{3}$", "$\\frac{1}{3}$", "$\\frac{1}{4}$"],
          poprawna: 0,
        },
        {
          nr: "5",
          tresc: "Który z podanych ułamków jest największy? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{3}{10}$", "$\\frac{3}{8}$", "$\\frac{3}{4}$", "$\\frac{3}{5}$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Zapisz liczbę mieszaną $4\\frac{3}{7}$ jako ułamek niewłaściwy, a ułamek $\\frac{23}{6}$ jako liczbę mieszaną. **Zapisz obliczenia.**",
          rozwiazanie: "Liczba $4\\frac{3}{7}$: całości mnożymy przez mianownik i dodajemy licznik: $4\\cdot 7+3=31$. Mianownik zostaje, więc $4\\frac{3}{7}=\\frac{31}{7}$.\n\nUłamek $\\frac{23}{6}$: dzielimy $23:6=3$ i reszta to $5$, bo $3\\cdot 6=18$, a $23-18=5$.\n\nLiczba całości to $3$, licznik to reszta $5$, a mianownik zostaje: $\\frac{23}{6}=3\\frac{5}{6}$.\n\nOdpowiedź: $4\\frac{3}{7}=\\frac{31}{7}$ oraz $\\frac{23}{6}=3\\frac{5}{6}$.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Pięć czekolad podzielono po równo między $8$ dzieci. Jaką część czekolady dostało jedno dziecko? Potem $11$ pizz podzielono po równo między $4$ osoby. Ile pizzy dostała jedna osoba? Drugi wynik zapisz jako liczbę mieszaną. **Zapisz obliczenia.**",
          rozwiazanie: "Ułamek to dzielenie. Jedno dziecko dostało $5:8=\\frac{5}{8}$ czekolady.\n\nJedna osoba dostała $11:4=\\frac{11}{4}$ pizzy.\n\n$11:4=2$ i reszta $3$, więc $\\frac{11}{4}=2\\frac{3}{4}$.\n\nOdpowiedź: Dziecko dostało $\\frac{5}{8}$ czekolady, a osoba $2\\frac{3}{4}$ pizzy.",
        },
      ],
      generatory: [
        {
          id: "zamiana-ulamka",
          nazwa: "Liczba mieszana",
          opis: "Zamień liczbę mieszaną na ułamek niewłaściwy albo ułamek niewłaściwy na liczbę mieszaną.",
          generuj(r) {
            const [n, d] = prosty(r, 2, 12);
            const w = r.int(1, 9);
            const L = w * d + n;
            if (r.chance()) {
              return {
                tresc: `Zamień liczbę mieszaną $${mn(w, n, d)}$ na ułamek niewłaściwy. Wpisz jego licznik i mianownik.`,
                pola: [
                  { id: "l", typ: "liczba", etykieta: "Licznik:" },
                  { id: "m", typ: "liczba", etykieta: "Mianownik:" },
                ],
                odpowiedz: { l: L, m: d },
                wynik: `$${mn(w, n, d)} = ${fr(L, d)}$`,
                rozwiazanie: [
                  `Całości mnożymy przez mianownik i dodajemy licznik: $${w} \\cdot ${d} + ${n} = ${L}$.`,
                  `Mianownik zostaje taki sam: $${mn(w, n, d)} = ${fr(L, d)}$.`,
                ],
              };
            }
            return {
              tresc: `Zamień ułamek niewłaściwy $${fr(L, d)}$ na liczbę mieszaną. Wpisz liczbę całości i licznik ułamka.`,
              pola: [
                { id: "c", typ: "liczba", etykieta: "Całości:" },
                { id: "l", typ: "liczba", etykieta: "Licznik:" },
              ],
              odpowiedz: { c: w, l: n },
              wynik: `$${fr(L, d)} = ${mn(w, n, d)}$`,
              rozwiazanie: [
                `Dzielimy licznik przez mianownik: $${L} : ${d} = ${w}$ i reszta $${n}$.`,
                `Wynik dzielenia to liczba całości, a reszta to nowy licznik. Mianownik zostaje: $${fr(L, d)} = ${mn(w, n, d)}$.`,
              ],
            };
          },
        },
        {
          id: "podzial-po-rowno",
          nazwa: "Dzielenie po równo",
          opis: "Podziel kilka przedmiotów po równo między osoby i zapisz wynik jako ułamek.",
          generuj(r) {
            const PRZEDMIOTY = [
              { acc: ["pizzę", "pizze", "pizz"], gen: "pizzy" },
              { acc: ["czekoladę", "czekolady", "czekolad"], gen: "czekolady" },
              { acc: ["tort", "torty", "tortów"], gen: "tortu" },
              { acc: ["chałkę", "chałki", "chałek"], gen: "chałki" },
            ];
            let a, b;
            do {
              a = r.int(1, 11);
              b = r.int(2, 12);
            } while (a === b || NWD(a, b) !== 1);
            const p = r.pick(PRZEDMIOTY);
            const osoby = liczebnik(b, ["osobę", "osoby", "osób"]);
            const v = q(a, b);
            const pytanie = a < b ? `Jaką część ${p.gen} dostała jedna osoba?` : `Ile ${p.gen} dostała jedna osoba?`;
            const rozwiazanie = [
              "Dzielenie zapisujemy jako ułamek: licznik to liczba dzielona, mianownik to dzielnik.",
              `$${a} : ${b} = ${fr(a, b)}$.`,
            ];
            if (a > b) rozwiazanie.push(`To więcej niż całość: $${fr(a, b)} = ${mieszana(v)}$.`);
            return {
              tresc: `${a} ${liczebnik(a, p.acc)} podzielono po równo między ${b} ${osoby}. ${pytanie} Wpisz ułamek (np. 3/4).`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Jedna osoba dostała:" }],
              odpowiedz: { w: v },
              wynik: `$${fr(a, b)}$`,
              rozwiazanie,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 2
    {
      id: "rozszerzanie-skracanie",
      nazwa: "Rozszerzanie i skracanie ułamków",
      sciaga: [
        {
          nazwa: "Rozszerzanie ułamka",
          slownie: "Mnożymy licznik i mianownik przez tę samą liczbę (większą od zera). Ułamek ma wtedy tę samą wartość, tylko całość jest pokrojona na drobniejsze kawałki.",
          tex: "\\frac{a}{b}=\\frac{a\\cdot k}{b\\cdot k}",
          litery: "$k$ – liczba, przez którą rozszerzamy.",
          przyklad: "$\\frac{2}{3}=\\frac{2\\cdot 4}{3\\cdot 4}=\\frac{8}{12}$.",
          uwaga: "Mnożymy oba: licznik i mianownik. Gdy pomnożysz tylko jedno z nich, dostaniesz inny ułamek.",
        },
        {
          nazwa: "Skracanie ułamka",
          slownie: "Dzielimy licznik i mianownik przez tę samą liczbę większą od $1$. Wartość ułamka się nie zmienia. Skracamy tak długo, aż się już nie da.",
          tex: "\\frac{a}{b}=\\frac{a:k}{b:k}",
          litery: "$k$ – liczba, przez którą dzielą się i licznik, i mianownik.",
          przyklad: "$\\frac{12}{18}=\\frac{12:6}{18:6}=\\frac{2}{3}$. Ułamek $\\frac{2}{3}$ jest nieskracalny.",
          uwaga: "Możesz skracać kilka razy po trochu, np. najpierw przez $2$, potem przez $3$. Ważne, żeby na końcu ułamek był nieskracalny.",
        },
        {
          nazwa: "Wspólny mianownik",
          slownie: "Aby porównać ułamki o różnych mianownikach, rozszerzamy je tak, żeby miały ten sam mianownik. Potem porównujemy liczniki.",
          przyklad: "Porównujemy $\\frac{1}{4}$ i $\\frac{1}{6}$. Wspólny mianownik to $12$: $\\frac{3}{12}$ i $\\frac{2}{12}$. Zatem $\\frac{1}{4}>\\frac{1}{6}$.",
          uwaga: "Wspólny mianownik to liczba, która dzieli się przez oba mianowniki, np. $12$ dla $4$ i $6$.",
        },
      ],
      jak: [
        "Skracanie: znajdź liczbę (np. $2$, $3$, $5$), przez którą dzieli się licznik i mianownik.",
        "Podziel licznik i mianownik przez tę liczbę. Powtarzaj, aż się nie da.",
        "Rozszerzanie do danego mianownika: podziel nowy mianownik przez stary – wyjdzie liczba $k$.",
        "Pomnóż licznik przez to samo $k$.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Który z ułamków jest równy $\\frac{3}{5}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{6}{15}$", "$\\frac{3}{10}$", "$\\frac{9}{15}$", "$\\frac{5}{3}$"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Ułamek $\\frac{18}{24}$ skrócono do postaci nieskracalnej. Jaki ułamek otrzymano? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{3}{4}$", "$\\frac{9}{12}$", "$\\frac{6}{8}$", "$\\frac{2}{3}$"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "Rozszerzamy ułamek $\\frac{5}{8}$ tak, żeby miał mianownik $40$: $\\frac{5}{8}=\\frac{?}{40}$. Jaka liczba jest brakującym licznikiem? **Wybierz właściwą odpowiedź.**",
          opcje: ["$37$", "$25$", "$8$", "$35$"],
          poprawna: 1,
        },
        {
          nr: "11",
          tresc: "Które porównanie jest prawdziwe? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{2}{3}<\\frac{3}{5}$", "$\\frac{3}{4}>\\frac{7}{8}$", "$\\frac{1}{2}=\\frac{2}{5}$", "$\\frac{5}{6}>\\frac{4}{5}$"],
          poprawna: 3,
        },
        {
          nr: "12",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Ułamek $\\frac{14}{21}$ można skrócić przez $7$.", litery: "PF", poprawna: 0 },
            { tekst: "Ułamek $\\frac{7}{9}$ można jeszcze skrócić.", litery: "PF", poprawna: 1 },
            { tekst: "Ułamki $\\frac{4}{6}$ i $\\frac{10}{15}$ są równe.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Skróć do postaci nieskracalnej ułamki $\\frac{36}{48}$ i $\\frac{45}{75}$. **Zapisz obliczenia.**",
          rozwiazanie: "Liczby $36$ i $48$ dzielą się przez $12$: $\\frac{36}{48}=\\frac{36:12}{48:12}=\\frac{3}{4}$.\n\nLiczby $45$ i $75$ dzielą się przez $15$: $\\frac{45}{75}=\\frac{45:15}{75:15}=\\frac{3}{5}$.\n\nUłamków $\\frac{3}{4}$ i $\\frac{3}{5}$ nie da się już skrócić.\n\nOdpowiedź: $\\frac{36}{48}=\\frac{3}{4}$ oraz $\\frac{45}{75}=\\frac{3}{5}$.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Ustaw ułamki $\\frac{2}{3}$, $\\frac{3}{4}$ i $\\frac{5}{8}$ w kolejności od najmniejszego do największego. **Zapisz obliczenia.**",
          rozwiazanie: "Szukamy wspólnego mianownika. Liczba $24$ dzieli się przez $3$, przez $4$ i przez $8$.\n\n$\\frac{2}{3}=\\frac{2\\cdot 8}{3\\cdot 8}=\\frac{16}{24}$.\n\n$\\frac{3}{4}=\\frac{3\\cdot 6}{4\\cdot 6}=\\frac{18}{24}$ oraz $\\frac{5}{8}=\\frac{5\\cdot 3}{8\\cdot 3}=\\frac{15}{24}$.\n\nPorównujemy liczniki: $15<16<18$.\n\nOdpowiedź: $\\frac{5}{8}<\\frac{2}{3}<\\frac{3}{4}$.",
        },
      ],
      generatory: [
        {
          id: "skracanie-ulamkow",
          nazwa: "Skracanie ułamka",
          opis: "Skróć ułamek do postaci nieskracalnej albo znajdź liczbę, przez którą go skrócono.",
          generuj(r) {
            const [p, m] = prosty(r, 2, 9);
            const k = r.int(2, 9);
            const L = p * k, M = m * k;
            if (r.chance(0.35)) {
              return {
                tresc: `Ułamek $${fr(L, M)}$ skrócono do ułamka $${fr(p, m)}$. Przez jaką liczbę podzielono licznik i mianownik?`,
                pola: [{ id: "k", typ: "liczba", etykieta: "Liczba:" }],
                odpowiedz: { k },
                wynik: `$${k}$`,
                rozwiazanie: [
                  `Licznik: $${L} : ${p} = ${k}$.`,
                  `Mianownik: $${M} : ${m} = ${k}$.`,
                  `Licznik i mianownik podzielono przez $${k}$.`,
                ],
              };
            }
            return {
              tresc: `Skróć ułamek $${fr(L, M)}$ do postaci nieskracalnej. Wpisz licznik i mianownik.`,
              pola: [
                { id: "l", typ: "liczba", etykieta: "Licznik:" },
                { id: "m", typ: "liczba", etykieta: "Mianownik:" },
              ],
              odpowiedz: { l: p, m },
              wynik: `$${fr(L, M)} = ${fr(p, m)}$`,
              rozwiazanie: [
                `Liczby $${L}$ i $${M}$ dzielą się przez $${k}$.`,
                `Dzielimy licznik i mianownik: $${fr(L, M)} = ${fr(`${L}:${k}`, `${M}:${k}`)} = ${fr(p, m)}$.`,
                `Ułamek $${fr(p, m)}$ jest nieskracalny.`,
              ],
            };
          },
        },
        {
          id: "rozszerzanie-ulamkow",
          nazwa: "Rozszerzanie ułamka",
          opis: "Uzupełnij brakujący licznik albo mianownik tak, aby ułamki były równe.",
          generuj(r) {
            const [p, m] = prosty(r, 2, 9);
            const k = r.int(2, 9);
            if (r.chance()) {
              return {
                tresc: `Uzupełnij: $${fr(p, m)} = \\frac{?}{${m * k}}$. Jaka liczba powinna stać w liczniku?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Brakujący licznik:" }],
                odpowiedz: { w: p * k },
                wynik: `$${fr(p, m)} = ${fr(p * k, m * k)}$`,
                rozwiazanie: [
                  `Mianownik zmienił się z $${m}$ na $${m * k}$: $${m * k} : ${m} = ${k}$.`,
                  `Licznik też mnożymy przez $${k}$: $${p} \\cdot ${k} = ${p * k}$.`,
                  `$${fr(p, m)} = ${fr(`${p} \\cdot ${k}`, `${m} \\cdot ${k}`)} = ${fr(p * k, m * k)}$.`,
                ],
              };
            }
            return {
              tresc: `Uzupełnij: $${fr(p, m)} = \\frac{${p * k}}{?}$. Jaka liczba powinna stać w mianowniku?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Brakujący mianownik:" }],
              odpowiedz: { w: m * k },
              wynik: `$${fr(p, m)} = ${fr(p * k, m * k)}$`,
              rozwiazanie: [
                `Licznik zmienił się z $${p}$ na $${p * k}$: $${p * k} : ${p} = ${k}$.`,
                `Mianownik też mnożymy przez $${k}$: $${m} \\cdot ${k} = ${m * k}$.`,
                `$${fr(p, m)} = ${fr(`${p} \\cdot ${k}`, `${m} \\cdot ${k}`)} = ${fr(p * k, m * k)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3
    {
      id: "dodawanie-odejmowanie",
      nazwa: "Dodawanie i odejmowanie ułamków",
      sciaga: [
        {
          nazwa: "Takie same mianowniki",
          slownie: "Dodajemy (albo odejmujemy) tylko liczniki. Mianownik przepisujemy bez zmian.",
          tex: "\\frac{a}{c}+\\frac{b}{c}=\\frac{a+b}{c}\\qquad\\frac{a}{c}-\\frac{b}{c}=\\frac{a-b}{c}",
          przyklad: "$\\frac{2}{9}+\\frac{5}{9}=\\frac{7}{9}$ oraz $\\frac{7}{10}-\\frac{3}{10}=\\frac{4}{10}=\\frac{2}{5}$.",
          uwaga: "Mianowników nie dodajemy! $\\frac{1}{5}+\\frac{1}{5}=\\frac{2}{5}$, a nie $\\frac{2}{10}$.",
        },
        {
          nazwa: "Różne mianowniki",
          slownie: "Najpierw rozszerzamy ułamki do wspólnego mianownika. Potem liczymy tak jak przy takich samych mianownikach.",
          tex: "\\frac{1}{2}+\\frac{1}{3}\\qquad=\\frac{3}{6}+\\frac{2}{6}\\qquad=\\frac{5}{6}",
          przyklad: "$\\frac{3}{4}-\\frac{1}{6}=\\frac{9}{12}-\\frac{2}{12}=\\frac{7}{12}$.",
          uwaga: "Wspólnym mianownikiem może być też iloczyn mianowników. Na końcu sprawdź, czy wynik da się skrócić.",
        },
        {
          nazwa: "Liczby mieszane",
          slownie: "Dodajemy osobno całości i osobno ułamki. Jeśli ułamki dają razem więcej niż $1$, przenosimy całość. Przy odejmowaniu, gdy brakuje ułamka, pożyczamy jedną całość.",
          przyklad: "$2\\frac{3}{5}+1\\frac{4}{5}=3\\frac{7}{5}=4\\frac{2}{5}$. A tak: $3\\frac{1}{4}-1\\frac{3}{4}=2\\frac{5}{4}-1\\frac{3}{4}=1\\frac{2}{4}=1\\frac{1}{2}$.",
          uwaga: "Pożyczona całość to $\\frac{4}{4}$ (albo tyle, ile wynosi mianownik).",
        },
        {
          nazwa: "Odejmowanie od całości",
          slownie: "Całość zamieniamy na ułamek o takim samym mianowniku, jak drugi ułamek. Przydaje się, gdy pytamy, ile zostało.",
          tex: "1-\\frac{3}{8}\\qquad=\\frac{8}{8}-\\frac{3}{8}\\qquad=\\frac{5}{8}",
          przyklad: "$3-\\frac{2}{5}=2\\frac{5}{5}-\\frac{2}{5}=2\\frac{3}{5}$.",
        },
      ],
      jak: [
        "Sprawdź mianowniki. Jeśli są różne, znajdź wspólny mianownik i rozszerz oba ułamki.",
        "Dodaj albo odejmij liczniki, mianownik przepisz.",
        "Skróć wynik, jeśli się da. Ułamek niewłaściwy zamień na liczbę mieszaną.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Ola przeczytała w poniedziałek $\\frac{3}{7}$ książki, a we wtorek jeszcze $\\frac{2}{7}$ tej książki. Jaką część książki przeczytała w ciągu tych dwóch dni? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{5}{14}$", "$\\frac{5}{7}$", "$\\frac{6}{7}$", "$\\frac{1}{7}$"],
          poprawna: 1,
        },
        {
          nr: "16",
          tresc: "Ile wynosi suma $\\frac{1}{2}+\\frac{1}{3}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{2}{5}$", "$\\frac{2}{6}$", "$\\frac{5}{6}$", "$\\frac{1}{6}$"],
          poprawna: 2,
        },
        {
          nr: "17",
          tresc: "Ile wynosi różnica $\\frac{7}{8}-\\frac{1}{4}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{6}{4}$", "$\\frac{3}{4}$", "$\\frac{1}{2}$", "$\\frac{5}{8}$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "Ile wynosi suma $2\\frac{3}{5}+1\\frac{4}{5}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4\\frac{7}{5}$", "$3\\frac{7}{10}$", "$3\\frac{2}{5}$", "$4\\frac{2}{5}$"],
          poprawna: 3,
        },
        {
          nr: "19",
          tresc: "W dzbanku było $3\\frac{1}{4}$ litra soku. Wypito $1\\frac{3}{4}$ litra. Ile litrów soku zostało w dzbanku? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1\\frac{1}{2}$", "$2\\frac{1}{2}$", "$2\\frac{1}{4}$", "$1\\frac{1}{4}$"],
          poprawna: 0,
        },
        {
          nr: "20",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\frac{2}{5}+\\frac{2}{5}=\\frac{4}{10}$", litery: "PF", poprawna: 1 },
            { tekst: "$1-\\frac{3}{8}=\\frac{5}{8}$", litery: "PF", poprawna: 0 },
            { tekst: "$\\frac{1}{2}+\\frac{1}{4}=\\frac{3}{4}$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "21",
          punkty: 2,
          tresc: "W butelce był $1$ litr mleka. Basia wypiła rano $\\frac{3}{8}$ litra, a po południu $\\frac{1}{4}$ litra. Ile mleka zostało w butelce? **Zapisz obliczenia.**",
          rozwiazanie: "Wspólny mianownik to $8$: $\\frac{1}{4}=\\frac{2}{8}$.\n\nBasia wypiła razem $\\frac{3}{8}+\\frac{2}{8}=\\frac{5}{8}$ litra.\n\nZostało $1-\\frac{5}{8}=\\frac{8}{8}-\\frac{5}{8}=\\frac{3}{8}$ litra.\n\nOdpowiedź: W butelce zostało $\\frac{3}{8}$ litra mleka.",
        },
        {
          nr: "22",
          punkty: 3,
          tresc: "Do wiadra o pojemności $5$ litrów wlano najpierw $2\\frac{1}{3}$ litra wody, a potem jeszcze $1\\frac{5}{6}$ litra wody. Ile litrów wody można jeszcze dolać, aby wiadro było pełne? **Zapisz obliczenia.**",
          rozwiazanie: "Wspólny mianownik to $6$: $2\\frac{1}{3}=2\\frac{2}{6}$.\n\nWlano razem $2\\frac{2}{6}+1\\frac{5}{6}=3\\frac{7}{6}=4\\frac{1}{6}$ litra.\n\nDo pełnego wiadra brakuje $5-4\\frac{1}{6}=4\\frac{6}{6}-4\\frac{1}{6}=\\frac{5}{6}$ litra.\n\nOdpowiedź: Można jeszcze dolać $\\frac{5}{6}$ litra wody.",
        },
      ],
      generatory: [
        {
          id: "dodawanie-ulamkow",
          nazwa: "Dodawanie i odejmowanie",
          opis: "Dodaj albo odejmij dwa ułamki o takich samych lub różnych mianownikach.",
          generuj(r) {
            const D = [2, 3, 4, 5, 6, 8, 10, 12];
            for (;;) {
              const b = r.pick(D);
              const d = r.chance(0.35) ? b : r.pick(D);
              const M = NWW(b, d);
              if (M > 24) continue;
              let A = [r.int(1, b - 1), b];
              let B = [r.int(1, d - 1), d];
              if (NWD(...A) !== 1 || NWD(...B) !== 1) continue;
              const plus = r.chance();
              if (!plus) {
                const c = q(...A).cmp(q(...B));
                if (c === 0) continue;
                if (c < 0) [A, B] = [B, A];
              }
              const [a1, b1] = A, [c1, d1] = B;
              const fa = a1 * (M / b1), fc = c1 * (M / d1);
              const s = plus ? fa + fc : fa - fc;
              const res = q(s, M);
              const znak = plus ? "+" : "-";
              const wyr = `${fr(a1, b1)} ${znak} ${fr(c1, d1)}`;
              const rozwiazanie = [];
              if (b1 !== d1) {
                const czesci = [];
                if (M !== b1) czesci.push(`$${fr(a1, b1)} = ${fr(`${a1} \\cdot ${M / b1}`, `${b1} \\cdot ${M / b1}`)} = ${fr(fa, M)}$`);
                if (M !== d1) czesci.push(`$${fr(c1, d1)} = ${fr(`${c1} \\cdot ${M / d1}`, `${d1} \\cdot ${M / d1}`)} = ${fr(fc, M)}$`);
                rozwiazanie.push(`Wspólny mianownik to $${M}$. Rozszerzamy: ${czesci.join(" oraz ")}.`);
              }
              if (b1 === d1) rozwiazanie.push(`Mianowniki są takie same, więc ${plus ? "dodajemy" : "odejmujemy"} tylko liczniki.`);
              rozwiazanie.push(`Działamy na licznikach, a mianownik przepisujemy: $${fr(fa, M)} ${znak} ${fr(fc, M)} = ${fr(s, M)}$.`);
              rozwiazanie.push(...koncowka([s, M], res));
              return {
                tresc: `Oblicz $${wyr}$. ${POLECENIE}`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik:" }],
                odpowiedz: { w: res },
                wynik: `$${wyr} = ${wynikTex(res)}$`,
                rozwiazanie,
              };
            }
          },
        },
        {
          id: "liczby-mieszane-dodawanie",
          nazwa: "Liczby mieszane",
          opis: "Dodaj albo odejmij dwie liczby mieszane. Wynik wpisz jako ułamek niewłaściwy.",
          generuj(r) {
            const D = [2, 3, 4, 5, 6, 8, 10];
            for (;;) {
              const b = r.pick(D);
              const d = r.chance(0.4) ? b : r.pick(D);
              const M = NWW(b, d);
              if (M > 20) continue;
              let X = [r.int(1, 6), r.int(1, b - 1), b];
              let Y = [r.int(1, 6), r.int(1, d - 1), d];
              if (NWD(X[1], b) !== 1 || NWD(Y[1], d) !== 1) continue;
              const plus = r.chance();
              const wartosc = ([w, n, m]) => q(w * m + n, m);
              if (!plus) {
                const c = wartosc(X).cmp(wartosc(Y));
                if (c === 0) continue;
                if (c < 0) [X, Y] = [Y, X];
              }
              const [w1, n1, b1] = X, [w2, n2, d1] = Y;
              const fa = n1 * (M / b1), fb = n2 * (M / d1);
              const res = plus ? wartosc(X).add(wartosc(Y)) : wartosc(X).sub(wartosc(Y));
              const znak = plus ? "+" : "-";
              const wyr = `${mn(w1, n1, b1)} ${znak} ${mn(w2, n2, d1)}`;
              const rozwiazanie = [];
              if (b1 !== d1) {
                const czesci = [];
                if (M !== b1) czesci.push(`$${mn(w1, n1, b1)} = ${mn(w1, fa, M)}$`);
                if (M !== d1) czesci.push(`$${mn(w2, n2, d1)} = ${mn(w2, fb, M)}$`);
                rozwiazanie.push(`Wspólny mianownik to $${M}$. Rozszerzamy ułamki: ${czesci.join(" oraz ")}.`);
              }
              if (b1 === d1) rozwiazanie.push("Mianowniki są takie same, więc nie musimy ich zmieniać.");
              let W, F;
              if (plus) {
                W = w1 + w2;
                F = fa + fb;
                rozwiazanie.push(`Dodajemy osobno całości i osobno ułamki: $${w1} + ${w2} = ${W}$ oraz $${fr(fa, M)} + ${fr(fb, M)} = ${fr(F, M)}$, czyli $${mn(W, F, M)}$.`);
              } else if (fa >= fb) {
                W = w1 - w2;
                F = fa - fb;
                rozwiazanie.push(`Odejmujemy osobno całości i osobno ułamki: $${w1} - ${w2} = ${W}$ oraz $${fr(fa, M)} - ${fr(fb, M)} = ${fr(F, M)}$, czyli $${mn(W, F, M)}$.`);
              } else {
                W = w1 - 1 - w2;
                F = fa + M - fb;
                rozwiazanie.push(`Ułamek odjemnika jest większy, więc pożyczamy jedną całość: $${mn(w1, fa, M)} = ${mn(w1 - 1, fa + M, M)}$.`);
                rozwiazanie.push(`Teraz odejmujemy: $${w1 - 1} - ${w2} = ${W}$ oraz $${fr(fa + M, M)} - ${fr(fb, M)} = ${fr(F, M)}$, czyli $${mn(W, F, M)}$.`);
              }
              const lacznie = mn(W, F, M);
              if (lacznie !== mieszana(res)) rozwiazanie.push(`Upraszczamy: $${lacznie} = ${mieszana(res)}$.`);
              if (res.d !== 1 && res.n > res.d) rozwiazanie.push(`Jako ułamek niewłaściwy: $${mieszana(res)} = ${res.tex()}$.`);
              return {
                tresc: `Oblicz $${wyr}$. Wynik wpisz jako ułamek niewłaściwy (np. 17/4) albo liczbę.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik:" }],
                odpowiedz: { w: res },
                wynik: `$${wyr} = ${wynikTex(res)}$`,
                rozwiazanie,
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4
    {
      id: "mnozenie-ulamkow",
      nazwa: "Mnożenie ułamków. Ułamek liczby",
      sciaga: [
        {
          nazwa: "Ułamek razy liczba naturalna",
          slownie: "Mnożymy licznik przez liczbę naturalną, a mianownik przepisujemy. Wynik skracamy i, jeśli trzeba, zapisujemy jako liczbę mieszaną.",
          tex: "\\frac{a}{b}\\cdot n=\\frac{a\\cdot n}{b}",
          przyklad: "$\\frac{3}{8}\\cdot 4=\\frac{12}{8}=\\frac{3}{2}=1\\frac{1}{2}$.",
          uwaga: "Mnożymy tylko licznik. Mianownika nie mnożymy.",
        },
        {
          nazwa: "Ułamek danej liczby",
          slownie: "Żeby obliczyć ułamek liczby, dzielimy liczbę przez mianownik, a wynik mnożymy przez licznik. Słowo „z” oznacza mnożenie.",
          tex: "\\frac{a}{b}\\text{ z }n=n:b\\cdot a",
          przyklad: "$\\frac{3}{5}$ z $40$ zł: $40:5=8$, potem $8\\cdot 3=24$. To $24$ zł.",
          uwaga: "Najpierw dzielimy przez mianownik, dopiero potem mnożymy przez licznik. Tak liczby są mniejsze i łatwiej się liczy.",
        },
        {
          nazwa: "Mnożenie dwóch ułamków",
          slownie: "Mnożymy liczniki przez siebie i mianowniki przez siebie. Przed mnożeniem warto skrócić licznik jednego ułamka z mianownikiem drugiego.",
          tex: "\\frac{a}{b}\\cdot\\frac{c}{d}\\qquad=\\frac{a\\cdot c}{b\\cdot d}",
          przyklad: "$\\frac{2}{3}\\cdot\\frac{3}{4}=\\frac{2\\cdot 3}{3\\cdot 4}=\\frac{6}{12}=\\frac{1}{2}$. Szybciej: trójka w liczniku i trójka w mianowniku się skracają, zostaje $\\frac{2}{4}=\\frac{1}{2}$.",
          uwaga: "Przy mnożeniu nie szukamy wspólnego mianownika. To jest potrzebne tylko przy dodawaniu i odejmowaniu.",
        },
        {
          nazwa: "Liczby mieszane w mnożeniu",
          slownie: "Liczbę mieszaną najpierw zamieniamy na ułamek niewłaściwy. Dopiero potem mnożymy.",
          tex: "1\\frac{1}{2}\\cdot 2\\frac{2}{3}\\qquad=\\frac{3}{2}\\cdot\\frac{8}{3}\\qquad=4",
          przyklad: "$\\frac{3}{2}\\cdot\\frac{8}{3}=\\frac{24}{6}=4$.",
          uwaga: "Nie mnóż osobno całości i osobno ułamków. To daje zły wynik.",
        },
      ],
      jak: [
        "Liczby mieszane zamień na ułamki niewłaściwe. Liczbę naturalną możesz zapisać jako ułamek z mianownikiem $1$.",
        "Skróć, co się da, np. licznik jednego ułamka z mianownikiem drugiego.",
        "Pomnóż liczniki i pomnóż mianowniki.",
        "Wynik skróć albo zapisz jako liczbę mieszaną.",
      ],
      zadania: [
        {
          nr: "23",
          tresc: "Ile wynosi iloczyn $\\frac{2}{5}\\cdot 3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{6}{15}$", "$\\frac{2}{15}$", "$\\frac{6}{5}$", "$\\frac{5}{6}$"],
          poprawna: 2,
        },
        {
          nr: "24",
          tresc: "Karol miał $20$ zł. Wydał $\\frac{3}{4}$ tej kwoty. Ile złotych wydał Karol? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$ zł", "$15$ zł", "$60$ zł", "$17$ zł"],
          poprawna: 1,
        },
        {
          nr: "25",
          tresc: "Ile wynosi iloczyn $\\frac{2}{3}\\cdot\\frac{3}{8}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{5}{11}$", "$\\frac{16}{9}$", "$\\frac{1}{4}$", "$\\frac{3}{4}$"],
          poprawna: 2,
        },
        {
          nr: "26",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\frac{1}{2}\\cdot\\frac{1}{3}=\\frac{1}{5}$", litery: "PF", poprawna: 1 },
            { tekst: "$\\frac{3}{4}\\cdot 8=6$", litery: "PF", poprawna: 0 },
            { tekst: "$\\frac{2}{5}$ z $30$ jest równe $12$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "27",
          tresc: "Ile wynosi iloczyn $1\\frac{1}{2}\\cdot 2\\frac{2}{3}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2\\frac{1}{3}$", "$3\\frac{1}{3}$", "$4\\frac{1}{6}$", "$4$"],
          poprawna: 3,
        },
        {
          nr: "28",
          tresc: "Prostokątna tablica ma wymiary $\\frac{2}{3}$ m i $\\frac{3}{5}$ m. Jakie jest pole tej tablicy? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{2}{5}\\ \\text{m}^2$", "$\\frac{38}{15}\\ \\text{m}^2$", "$\\frac{19}{15}\\ \\text{m}^2$", "$\\frac{5}{8}\\ \\text{m}^2$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "29",
          punkty: 2,
          tresc: "W klasie jest $36$ uczniów. Dziewczynki stanowią $\\frac{5}{9}$ wszystkich uczniów, a $\\frac{3}{4}$ dziewczynek ma długie włosy. Ile dziewczynek ma długie włosy? **Zapisz obliczenia.**",
          rozwiazanie: "Liczba dziewczynek to $\\frac{5}{9}$ z $36$. Dzielimy $36:9=4$ i mnożymy $4\\cdot 5=20$.\n\nDługie włosy ma $\\frac{3}{4}$ z $20$ dziewczynek. Dzielimy $20:4=5$ i mnożymy $5\\cdot 3=15$.\n\nOdpowiedź: Długie włosy ma $15$ dziewczynek.",
        },
        {
          nr: "30",
          punkty: 2,
          tresc: "Oblicz $2\\frac{1}{4}\\cdot 1\\frac{1}{3}$ oraz $\\frac{5}{6}\\cdot\\frac{9}{10}$. **Zapisz obliczenia.**",
          rozwiazanie: "Liczby mieszane zamieniamy na ułamki niewłaściwe: $2\\frac{1}{4}=\\frac{9}{4}$ i $1\\frac{1}{3}=\\frac{4}{3}$.\n\n$\\frac{9}{4}\\cdot\\frac{4}{3}=\\frac{9\\cdot 4}{4\\cdot 3}=\\frac{36}{12}=3$.\n\n$\\frac{5}{6}\\cdot\\frac{9}{10}=\\frac{5\\cdot 9}{6\\cdot 10}=\\frac{45}{60}=\\frac{3}{4}$.\n\nOdpowiedź: $2\\frac{1}{4}\\cdot 1\\frac{1}{3}=3$ oraz $\\frac{5}{6}\\cdot\\frac{9}{10}=\\frac{3}{4}$.",
        },
      ],
      generatory: [
        {
          id: "ulamek-liczby",
          nazwa: "Ułamek liczby",
          opis: "Oblicz ułamek danej liczby, np. trzy piąte z 40 zł.",
          generuj(r) {
            const [a, b] = prosty(r, 2, 10);
            const k = r.int(2, 12);
            const N = b * k;
            const f = fr(a, b);
            const WARIANTY = [
              { t: `Ala ma $${N}$ zł. Na książkę wydała $${f}$ tej kwoty. Ile złotych kosztowała książka?`, j: "zł" },
              { t: `Trasa wycieczki ma $${N}$ km. Turyści przeszli już $${f}$ trasy. Ile kilometrów już przeszli?`, j: "km" },
              { t: `W zbiorniku jest $${N}$ l wody. Wylano $${f}$ wody. Ile litrów wody wylano?`, j: "l" },
              { t: `Sznurek ma $${N}$ cm długości. Odcięto $${f}$ sznurka. Ile centymetrów sznurka odcięto?`, j: "cm" },
              { t: `Oblicz $${f}$ liczby $${N}$.`, j: "" },
              { t: `Sklep miał $${N}$ kg ziemniaków. Sprzedano $${f}$ ziemniaków. Ile kilogramów ziemniaków sprzedano?`, j: "kg" },
            ];
            const w = r.pick(WARIANTY);
            const wynik = a * k;
            const jednostka = w.j ? ` ${w.j}` : "";
            return {
              tresc: w.t,
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik:" }],
              odpowiedz: { w: wynik },
              wynik: `$${wynik}$${jednostka}`,
              rozwiazanie: [
                `Dzielimy liczbę przez mianownik: $${N} : ${b} = ${k}$.`,
                `Wynik mnożymy przez licznik: $${k} \\cdot ${a} = ${wynik}$.`,
                `Czyli $${f}$ z $${N}$ to $${wynik}$.`,
              ],
            };
          },
        },
        {
          id: "mnozenie-ulamkow",
          nazwa: "Mnożenie ułamków",
          opis: "Pomnóż dwa ułamki, ułamek przez liczbę naturalną albo liczbę mieszaną przez ułamek.",
          generuj(r) {
            for (;;) {
              const tryb = r.int(0, 2);
              let wyr, rozwiazanie, pre, res;
              if (tryb === 0) {
                const [a, b] = prosty(r, 2, 9), [c, d] = prosty(r, 2, 9);
                res = q(a * c, b * d);
                pre = [a * c, b * d];
                wyr = `${fr(a, b)} \\cdot ${fr(c, d)}`;
                rozwiazanie = ["Mnożymy liczniki przez siebie i mianowniki przez siebie.", `$${wyr} = ${fr(`${a} \\cdot ${c}`, `${b} \\cdot ${d}`)} = ${fr(a * c, b * d)}$.`];
              } else if (tryb === 1) {
                const [a, b] = prosty(r, 2, 10);
                const n = r.int(2, 9);
                res = q(a * n, b);
                pre = [a * n, b];
                const przod = r.chance();
                wyr = przod ? `${fr(a, b)} \\cdot ${n}` : `${n} \\cdot ${fr(a, b)}`;
                rozwiazanie = ["Mnożymy tylko licznik przez liczbę naturalną, a mianownik przepisujemy.", `$${wyr} = ${fr(przod ? `${a} \\cdot ${n}` : `${n} \\cdot ${a}`, b)} = ${fr(a * n, b)}$.`];
              } else {
                const w = r.int(1, 4);
                const [n, d] = prosty(r, 2, 6), [c, e] = prosty(r, 2, 6);
                const W = w * d + n;
                res = q(W * c, d * e);
                pre = [W * c, d * e];
                wyr = `${mn(w, n, d)} \\cdot ${fr(c, e)}`;
                rozwiazanie = [
                  `Zamieniamy liczbę mieszaną na ułamek niewłaściwy: $${mn(w, n, d)} = ${fr(`${w} \\cdot ${d} + ${n}`, d)} = ${fr(W, d)}$.`,
                  `Mnożymy liczniki i mianowniki: $${fr(W, d)} \\cdot ${fr(c, e)} = ${fr(`${W} \\cdot ${c}`, `${d} \\cdot ${e}`)} = ${fr(W * c, d * e)}$.`,
                ];
              }
              if (!ladna(res)) continue;
              rozwiazanie.push(...koncowka(pre, res));
              return {
                tresc: `Oblicz $${wyr}$. ${POLECENIE}`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik:" }],
                odpowiedz: { w: res },
                wynik: `$${wyr} = ${wynikTex(res)}$`,
                rozwiazanie,
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5
    {
      id: "odwrotnosci-dzielenie",
      nazwa: "Odwrotności liczb. Dzielenie ułamków",
      sciaga: [
        {
          nazwa: "Odwrotność liczby",
          slownie: "Odwrotność to liczba, która pomnożona przez daną liczbę daje $1$. Aby ją znaleźć, zamieniamy miejscami licznik i mianownik.",
          tex: "\\frac{a}{b}\\cdot\\frac{b}{a}=1",
          przyklad: "Odwrotność $\\frac{2}{5}$ to $\\frac{5}{2}$. Odwrotność $4$ to $\\frac{1}{4}$. Odwrotność $1\\frac{1}{2}=\\frac{3}{2}$ to $\\frac{2}{3}$.",
          uwaga: "Liczbę mieszaną najpierw zamień na ułamek niewłaściwy. Liczba $0$ nie ma odwrotności.",
        },
        {
          nazwa: "Dzielenie przez liczbę naturalną",
          slownie: "Dzielimy ułamek przez liczbę naturalną: mnożymy mianownik przez tę liczbę. Gdy licznik dzieli się przez nią bez reszty, możemy podzielić licznik.",
          tex: "\\frac{a}{b}:n=\\frac{a}{b\\cdot n}",
          przyklad: "$\\frac{3}{5}:2=\\frac{3}{10}$ oraz $\\frac{6}{7}:3=\\frac{2}{7}$.",
          uwaga: "Dzielenie na $2$ części robi mniejsze kawałki, więc wynik jest mniejszy od ułamka na początku.",
        },
        {
          nazwa: "Dzielenie ułamków",
          slownie: "Dzielenie zamieniamy na mnożenie przez odwrotność drugiej liczby (tej, przez którą dzielimy).",
          tex: "\\frac{a}{b}:\\frac{c}{d}\\qquad=\\frac{a}{b}\\cdot\\frac{d}{c}",
          przyklad: "$\\frac{3}{4}:\\frac{9}{8}=\\frac{3}{4}\\cdot\\frac{8}{9}=\\frac{24}{36}=\\frac{2}{3}$.",
          uwaga: "Odwracamy tylko drugi ułamek (dzielnik). Pierwszy zostaje bez zmian.",
        },
        {
          nazwa: "Ile razy się mieści?",
          slownie: "Dzielenie odpowiada na pytanie, ile razy jedna liczba mieści się w drugiej.",
          przyklad: "$\\frac{3}{4}:\\frac{1}{4}=3$, bo ćwiartka mieści się w $\\frac{3}{4}$ trzy razy. Ile kawałków po $\\frac{1}{3}$ pizzy wyjdzie z $2$ pizz? $2:\\frac{1}{3}=2\\cdot 3=6$ kawałków.",
          uwaga: "Dzieląc przez ułamek mniejszy od $1$, dostajemy wynik większy od dzielnej.",
        },
      ],
      jak: [
        "Liczby mieszane zamień na ułamki niewłaściwe.",
        "Zamień dzielenie na mnożenie: przepisz pierwszy ułamek i pomnóż go przez odwrotność drugiego.",
        "Skróć co się da, pomnóż liczniki i mianowniki.",
        "Zapisz wynik jako ułamek nieskracalny albo liczbę mieszaną.",
      ],
      zadania: [
        {
          nr: "31",
          tresc: "Jaka liczba jest odwrotnością liczby $2\\frac{1}{3}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3\\frac{1}{2}$", "$\\frac{1}{7}$", "$\\frac{7}{3}$", "$\\frac{3}{7}$"],
          poprawna: 3,
        },
        {
          nr: "32",
          tresc: "Ile wynosi iloczyn liczby $\\frac{4}{9}$ i jej odwrotności? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{16}{81}$", "$1$", "$0$", "$\\frac{4}{9}$"],
          poprawna: 1,
        },
        {
          nr: "33",
          tresc: "Ile wynosi iloraz $\\frac{3}{5}:6$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{10}$", "$\\frac{18}{5}$", "$\\frac{3}{11}$", "$\\frac{1}{2}$"],
          poprawna: 0,
        },
        {
          nr: "34",
          tresc: "Ile wynosi iloraz $\\frac{2}{3}:\\frac{4}{9}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{8}{27}$", "$\\frac{2}{3}$", "$1\\frac{1}{2}$", "$\\frac{3}{4}$"],
          poprawna: 2,
        },
        {
          nr: "35",
          tresc: "Z $3$ litrów soku nalewamy szklanki po $\\frac{1}{4}$ litra. Ile szklanek można napełnić? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{3}{4}$", "$7$", "$\\frac{1}{12}$", "$12$"],
          poprawna: 3,
        },
        {
          nr: "36",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$4:\\frac{1}{2}=2$", litery: "PF", poprawna: 1 },
            { tekst: "$\\frac{1}{2}:\\frac{1}{4}=2$", litery: "PF", poprawna: 0 },
            { tekst: "Odwrotnością ułamka $\\frac{5}{3}$ jest $\\frac{3}{5}$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "37",
          punkty: 2,
          tresc: "Wstążka ma długość $2\\frac{1}{2}$ m. Z całej wstążki odcinamy paski po $\\frac{5}{8}$ m. Ile takich pasków można odciąć? **Zapisz obliczenia.**",
          rozwiazanie: "Pytamy, ile razy $\\frac{5}{8}$ mieści się w $2\\frac{1}{2}$, więc dzielimy: $2\\frac{1}{2}:\\frac{5}{8}$.\n\nZamieniamy liczbę mieszaną: $2\\frac{1}{2}=\\frac{5}{2}$.\n\nDzielenie zamieniamy na mnożenie przez odwrotność: $\\frac{5}{2}:\\frac{5}{8}=\\frac{5}{2}\\cdot\\frac{8}{5}=\\frac{40}{10}=4$.\n\nOdpowiedź: Można odciąć $4$ paski.",
        },
        {
          nr: "38",
          punkty: 2,
          tresc: "Oblicz $\\frac{4}{5}:\\frac{2}{15}$ oraz $3\\frac{1}{3}:5$. **Zapisz obliczenia.**",
          rozwiazanie: "$\\frac{4}{5}:\\frac{2}{15}=\\frac{4}{5}\\cdot\\frac{15}{2}=\\frac{60}{10}=6$.\n\nLiczbę mieszaną zamieniamy na ułamek niewłaściwy: $3\\frac{1}{3}=\\frac{10}{3}$.\n\n$\\frac{10}{3}:5=\\frac{10}{3}\\cdot\\frac{1}{5}=\\frac{10}{15}=\\frac{2}{3}$.\n\nOdpowiedź: $\\frac{4}{5}:\\frac{2}{15}=6$ oraz $3\\frac{1}{3}:5=\\frac{2}{3}$.",
        },
      ],
      generatory: [
        {
          id: "odwrotnosc-liczby",
          nazwa: "Odwrotność liczby",
          opis: "Podaj odwrotność ułamka, liczby naturalnej albo liczby mieszanej.",
          generuj(r) {
            const rodzaj = r.int(0, 2);
            let X, res, rozwiazanie;
            if (rodzaj === 0) {
              let a, b;
              do {
                a = r.int(1, 9);
                b = r.int(1, 9);
              } while (NWD(a, b) !== 1 || a === b);
              X = fr(a, b);
              res = q(b, a);
              rozwiazanie = [
                "Odwrotność to liczba, która pomnożona przez daną daje $1$. Zamieniamy miejscami licznik i mianownik.",
                `Odwrotność $${X}$ to $${fr(b, a)}$.`,
                `Sprawdzenie: $${fr(a, b)} \\cdot ${fr(b, a)} = ${fr(a * b, a * b)} = 1$.`,
              ];
            } else if (rodzaj === 1) {
              const n = r.int(2, 12);
              X = `${n}`;
              res = q(1, n);
              rozwiazanie = [
                `Liczbę naturalną zapisujemy jako ułamek: $${n} = ${fr(n, 1)}$.`,
                `Zamieniamy miejscami licznik i mianownik: odwrotność to $${fr(1, n)}$.`,
                `Sprawdzenie: $${n} \\cdot ${fr(1, n)} = 1$.`,
              ];
            } else {
              const [n, d] = prosty(r, 2, 9);
              const w = r.int(1, Math.min(5, Math.floor(30 / d)));
              const W = w * d + n;
              X = mn(w, n, d);
              res = q(d, W);
              rozwiazanie = [
                `Zamieniamy liczbę mieszaną na ułamek niewłaściwy: $${X} = ${fr(`${w} \\cdot ${d} + ${n}`, d)} = ${fr(W, d)}$.`,
                `Zamieniamy miejscami licznik i mianownik: odwrotność to $${fr(d, W)}$.`,
              ];
            }
            return {
              tresc: `Podaj odwrotność liczby $${X}$. Wynik wpisz jako ułamek (np. 5/3) albo liczbę.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Odwrotność:" }],
              odpowiedz: { w: res },
              wynik: `$${res.tex()}$`,
              rozwiazanie,
            };
          },
        },
        {
          id: "dzielenie-ulamkow",
          nazwa: "Dzielenie ułamków",
          opis: "Podziel ułamek przez liczbę, liczbę przez ułamek albo dwa ułamki.",
          generuj(r) {
            for (;;) {
              const tryb = r.int(0, 3);
              let wyr, rozwiazanie, pre, res;
              if (tryb === 0) {
                const [a, b] = prosty(r, 2, 9);
                const n = r.int(2, 9);
                res = q(a, b * n);
                pre = [a, b * n];
                wyr = `${fr(a, b)} : ${n}`;
                rozwiazanie = [`Odwrotnością liczby $${n}$ jest $${fr(1, n)}$.`, `Dzielenie zamieniamy na mnożenie przez odwrotność: $${wyr} = ${fr(a, b)} \\cdot ${fr(1, n)} = ${fr(a, `${b} \\cdot ${n}`)} = ${fr(a, b * n)}$.`];
              } else if (tryb === 1) {
                const [a, b] = prosty(r, 2, 9);
                const n = r.int(2, 9);
                res = q(n * b, a);
                pre = [n * b, a];
                wyr = `${n} : ${fr(a, b)}`;
                rozwiazanie = [`Odwrotnością $${fr(a, b)}$ jest $${fr(b, a)}$.`, `Zamieniamy dzielenie na mnożenie: $${wyr} = ${n} \\cdot ${fr(b, a)} = ${fr(`${n} \\cdot ${b}`, a)} = ${fr(n * b, a)}$.`];
              } else if (tryb === 2) {
                const [a, b] = prosty(r, 2, 9), [c, d] = prosty(r, 2, 9);
                res = q(a * d, b * c);
                pre = [a * d, b * c];
                wyr = `${fr(a, b)} : ${fr(c, d)}`;
                rozwiazanie = [`Odwrotnością $${fr(c, d)}$ jest $${fr(d, c)}$.`, `Zamieniamy dzielenie na mnożenie przez odwrotność drugiego ułamka: $${wyr} = ${fr(a, b)} \\cdot ${fr(d, c)} = ${fr(`${a} \\cdot ${d}`, `${b} \\cdot ${c}`)} = ${fr(a * d, b * c)}$.`];
              } else {
                const w = r.int(1, 4);
                const [n, d] = prosty(r, 2, 6), [c, e] = prosty(r, 2, 6);
                const W = w * d + n;
                res = q(W * e, d * c);
                pre = [W * e, d * c];
                wyr = `${mn(w, n, d)} : ${fr(c, e)}`;
                rozwiazanie = [
                  `Zamieniamy liczbę mieszaną na ułamek niewłaściwy: $${mn(w, n, d)} = ${fr(`${w} \\cdot ${d} + ${n}`, d)} = ${fr(W, d)}$.`,
                  `Zamieniamy dzielenie na mnożenie przez odwrotność: $${fr(W, d)} : ${fr(c, e)} = ${fr(W, d)} \\cdot ${fr(e, c)} = ${fr(`${W} \\cdot ${e}`, `${d} \\cdot ${c}`)} = ${fr(W * e, d * c)}$.`,
                ];
              }
              if (!ladna(res)) continue;
              rozwiazanie.push(...koncowka(pre, res));
              return {
                tresc: `Oblicz $${wyr}$. ${POLECENIE}`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik:" }],
                odpowiedz: { w: res },
                wynik: `$${wyr} = ${wynikTex(res)}$`,
                rozwiazanie,
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 6
    {
      id: "dzialania-na-ulamkach",
      nazwa: "Działania na ułamkach",
      sciaga: [
        {
          nazwa: "Kolejność działań",
          slownie: "Tak samo jak przy liczbach naturalnych: najpierw nawiasy, potem mnożenie i dzielenie (od lewej), na końcu dodawanie i odejmowanie (od lewej).",
          przyklad: "$\\frac{1}{2}+\\frac{1}{3}\\cdot\\frac{3}{4}=\\frac{1}{2}+\\frac{1}{4}=\\frac{3}{4}$.",
          uwaga: "Nie licz od lewej do prawej, gdy w przykładzie jest mnożenie lub dzielenie. Najpierw mnożenie!",
        },
        {
          nazwa: "Jaka część została?",
          slownie: "Gdy pytamy o resztę, od całości (czyli od $1$) odejmujemy ułamki, które już wykorzystano. Potem liczymy ułamek liczby.",
          przyklad: "Trasa ma $60$ km, a przejechano $\\frac{2}{5}$ trasy. Zostało $1-\\frac{2}{5}=\\frac{3}{5}$ trasy, czyli $60:5\\cdot 3=36$ km.",
          uwaga: "Można też najpierw obliczyć, ile już zrobiono ($24$ km), i odjąć to od $60$ km. Wyjdzie tak samo.",
        },
        {
          nazwa: "Którego działania użyć?",
          slownie: "Dodawanie i odejmowanie ułamków wymaga wspólnego mianownika. Mnożenie i dzielenie – nie. Liczby mieszane przy mnożeniu i dzieleniu zamieniamy na ułamki niewłaściwe.",
          przyklad: "Ile razy $\\frac{1}{4}$ mieści się w $3$? Dzielimy: $3:\\frac{1}{4}=3\\cdot 4=12$. Połowa z $\\frac{1}{3}$? Mnożymy: $\\frac{1}{2}\\cdot\\frac{1}{3}=\\frac{1}{6}$.",
        },
      ],
      jak: [
        "Przeczytaj zadanie i zdecyduj, jakie działanie jest potrzebne: dodawanie, odejmowanie, mnożenie czy dzielenie.",
        "Zapisz działanie. Pamiętaj o kolejności: nawiasy, mnożenie i dzielenie, na końcu dodawanie i odejmowanie.",
        "Policz po kolei, wynik skróć albo zapisz jako liczbę mieszaną i sprawdź, czy ma sens w zadaniu.",
      ],
      zadania: [
        {
          nr: "39",
          tresc: "Jaką wartość ma wyrażenie $\\frac{1}{2}+\\frac{1}{3}\\cdot\\frac{3}{4}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{5}{8}$", "$\\frac{1}{4}$", "$\\frac{3}{4}$", "$\\frac{5}{6}$"],
          poprawna: 2,
        },
        {
          nr: "40",
          tresc: "Jaką wartość ma wyrażenie $\\left(\\frac{3}{4}-\\frac{1}{2}\\right):\\frac{1}{8}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{2}$", "$2$", "$\\frac{1}{32}$", "$\\frac{5}{8}$"],
          poprawna: 1,
        },
        {
          nr: "41",
          tresc: "Trasa rowerowa ma $60$ km. Pan Marek przejechał już $\\frac{2}{5}$ trasy. Ile kilometrów trasy zostało mu do przejechania? **Wybierz właściwą odpowiedź.**",
          opcje: ["$36$ km", "$24$ km", "$12$ km", "$58$ km"],
          poprawna: 0,
        },
        {
          nr: "42",
          tresc: "Ala miała $24$ cukierki. Trzecią część cukierków dała Basi, a czwartą część dała Oli. Ile cukierków zostało Ali? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$", "$18$", "$12$", "$10$"],
          poprawna: 3,
        },
        {
          nr: "43",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\frac{1}{2}:\\frac{1}{3}=\\frac{1}{6}$", litery: "PF", poprawna: 1 },
            { tekst: "$1\\frac{1}{2}-\\frac{3}{4}=\\frac{3}{4}$", litery: "PF", poprawna: 0 },
            { tekst: "$\\frac{2}{3}\\cdot\\left(\\frac{1}{2}+\\frac{1}{4}\\right)=\\frac{1}{2}$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "44",
          tresc: "Jaką wartość ma wyrażenie $2\\frac{1}{2}:\\frac{5}{6}-1\\frac{1}{3}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{3}{4}$", "$4\\frac{1}{3}$", "$1\\frac{2}{3}$", "$1\\frac{1}{3}$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "45",
          punkty: 3,
          tresc: "Sklep miał $80$ kg mąki. W poniedziałek sprzedano $\\frac{2}{5}$ zapasu, a we wtorek $\\frac{1}{4}$ zapasu. Ile kilogramów mąki zostało w sklepie? **Zapisz obliczenia.**",
          rozwiazanie: "W poniedziałek sprzedano $\\frac{2}{5}$ z $80$ kg: $80:5=16$, $16\\cdot 2=32$ kg.\n\nWe wtorek sprzedano $\\frac{1}{4}$ z $80$ kg: $80:4=20$ kg.\n\nRazem sprzedano $32+20=52$ kg.\n\nZostało $80-52=28$ kg.\n\nOdpowiedź: W sklepie zostało $28$ kg mąki.",
        },
        {
          nr: "46",
          punkty: 3,
          tresc: "Oblicz $\\left(1\\frac{1}{2}+\\frac{3}{4}\\right):\\frac{9}{8}-\\frac{1}{3}\\cdot 3$. **Zapisz obliczenia.**",
          rozwiazanie: "Najpierw nawias: $1\\frac{1}{2}+\\frac{3}{4}=1\\frac{2}{4}+\\frac{3}{4}=1\\frac{5}{4}=2\\frac{1}{4}=\\frac{9}{4}$.\n\nDzielenie: $\\frac{9}{4}:\\frac{9}{8}=\\frac{9}{4}\\cdot\\frac{8}{9}=\\frac{72}{36}=2$.\n\nMnożenie: $\\frac{1}{3}\\cdot 3=\\frac{3}{3}=1$.\n\nOdejmowanie: $2-1=1$.\n\nOdpowiedź: Wartość wyrażenia to $1$.",
        },
      ],
      generatory: [
        {
          id: "kolejnosc-dzialan",
          nazwa: "Kolejność działań",
          opis: "Oblicz wyrażenie z trzema ułamkami, zachowując kolejność działań.",
          generuj(r) {
            for (;;) {
              const [x, y, z] = [prosty(r, 2, 6), prosty(r, 2, 6), prosty(r, 2, 6)].map(([a, b]) => q(a, b));
              const X = x.tex(), Y = y.tex(), Z = z.tex();
              const typ = r.int(0, 5);
              let wyr, inner, res, kroki;
              if (typ === 0) {
                inner = y.mul(z);
                res = x.add(inner);
                wyr = `${X} + ${Y} \\cdot ${Z}`;
                kroki = [`Najpierw mnożenie: $${Y} \\cdot ${Z} = ${inner.tex()}$.`, `Potem dodawanie: $${X} + ${inner.tex()} = ${res.tex()}$.`];
              } else if (typ === 1) {
                inner = y.mul(z);
                if (x.cmp(inner) <= 0) continue;
                res = x.sub(inner);
                wyr = `${X} - ${Y} \\cdot ${Z}`;
                kroki = [`Najpierw mnożenie: $${Y} \\cdot ${Z} = ${inner.tex()}$.`, `Potem odejmowanie: $${X} - ${inner.tex()} = ${res.tex()}$.`];
              } else if (typ === 2) {
                inner = x.add(y);
                res = inner.mul(z);
                wyr = `\\left(${X} + ${Y}\\right) \\cdot ${Z}`;
                kroki = [`Najpierw nawias: $${X} + ${Y} = ${inner.tex()}$.`, `Potem mnożenie: $${inner.tex()} \\cdot ${Z} = ${res.tex()}$.`];
              } else if (typ === 3) {
                if (x.cmp(y) <= 0) continue;
                inner = x.sub(y);
                res = inner.mul(z);
                wyr = `\\left(${X} - ${Y}\\right) \\cdot ${Z}`;
                kroki = [`Najpierw nawias: $${X} - ${Y} = ${inner.tex()}$.`, `Potem mnożenie: $${inner.tex()} \\cdot ${Z} = ${res.tex()}$.`];
              } else if (typ === 4) {
                inner = y.div(z);
                res = x.add(inner);
                wyr = `${X} + ${Y} : ${Z}`;
                kroki = [`Najpierw dzielenie: $${Y} : ${Z} = ${Y} \\cdot ${fr(z.d, z.n)} = ${inner.tex()}$.`,`Potem dodawanie: $${X} + ${inner.tex()} = ${res.tex()}$.`];
              } else {
                inner = x.add(y);
                res = inner.div(z);
                wyr = `\\left(${X} + ${Y}\\right) : ${Z}`;
                kroki = [`Najpierw nawias: $${X} + ${Y} = ${inner.tex()}$.`, `Potem dzielenie: $${inner.tex()} : ${Z} = ${inner.tex()} \\cdot ${fr(z.d, z.n)} = ${res.tex()}$.`];
              }
              if (!ladna(res) || !ladna(inner) || res.zero) continue;
              if (res.d !== 1 && res.n > res.d) kroki.push(`Zapisujemy jako liczbę mieszaną: $${res.tex()} = ${mieszana(res)}$.`);
              return {
                tresc: `Oblicz $${wyr}$. ${POLECENIE}`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik:" }],
                odpowiedz: { w: res },
                wynik: `$${wyr} = ${wynikTex(res)}$`,
                rozwiazanie: kroki,
              };
            }
          },
        },
        {
          id: "zadanie-reszta",
          nazwa: "Ile zostało?",
          opis: "Zadanie tekstowe: z całości zabrano dwie części (ułamki) – ile zostało?",
          generuj(r) {
            const D = [2, 3, 4, 5, 6, 8, 10];
            for (;;) {
              const b = r.pick(D), d = r.pick(D);
              const [a] = [r.int(1, b - 1)];
              const c = r.int(1, d - 1);
              if (NWD(a, b) !== 1 || NWD(c, d) !== 1) continue;
              if (q(a, b).add(q(c, d)).cmp(1) >= 0) continue;
              const M = NWW(b, d);
              const k = r.int(1, 5);
              const N = M * k;
              if (N > 120 || N < 12) continue;
              const p1 = (N / b) * a, p2 = (N / d) * c;
              const reszta = N - p1 - p2;
              const f1 = fr(a, b), f2 = fr(c, d);
              const WARIANTY = [
                { t: `Ola miała $${N}$ zł. Na bilet wydała $${f1}$ swoich pieniędzy, a na lody $${f2}$ swoich pieniędzy. Ile złotych jej zostało?`, j: "zł" },
                { t: `Trasa wycieczki ma $${N}$ km. Pierwszego dnia turyści przeszli $${f1}$ trasy, a drugiego dnia $${f2}$ trasy. Ile kilometrów zostało im jeszcze do przejścia?`, j: "km" },
                { t: `W zbiorniku było $${N}$ l wody. Rano zużyto $${f1}$ wody, a wieczorem $${f2}$ wody. Ile litrów wody zostało w zbiorniku?`, j: "l" },
                { t: `Sklep miał $${N}$ kg mąki. W poniedziałek sprzedano $${f1}$ mąki, a we wtorek $${f2}$ mąki. Ile kilogramów mąki zostało w sklepie?`, j: "kg" },
              ];
              const w = r.pick(WARIANTY);
              return {
                tresc: w.t,
                pola: [{ id: "w", typ: "liczba", etykieta: "Zostało:" }],
                odpowiedz: { w: reszta },
                wynik: `$${reszta}$ ${w.j}`,
                rozwiazanie: [
                  `Pierwsza część: $${N} : ${b} = ${N / b}$ i $${N / b} \\cdot ${a} = ${p1}$ ${w.j}.`,
                  `Druga część: $${N} : ${d} = ${N / d}$ i $${N / d} \\cdot ${c} = ${p2}$ ${w.j}.`,
                  `Razem zabrano $${p1} + ${p2} = ${p1 + p2}$ ${w.j}.`,
                  `Zostało $${N} - ${p1 + p2} = ${reszta}$ ${w.j}.`,
                ],
              };
            }
          },
        },
      ],
    },
  ],
};
