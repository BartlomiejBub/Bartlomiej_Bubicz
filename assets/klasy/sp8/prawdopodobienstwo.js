// Klasa 8 (szkoła podstawowa) · rozdział VIII „Rachunek prawdopodobieństwa” – Matematyka z kluczem 8 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Bez rysunków: tabele wyników zapisane małą tabelką albo opisane słowami. Bez wzorów na permutacje i kombinacje –
// wszystko liczymy regułą mnożenia (np. ustawienie 3 osób to $3\cdot2\cdot1$).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

const sum = (a) => a.reduce((x, y) => x + y, 0);
const iloczyn = (a) => a.reduce((x, y) => x * y, 1);

/** Czynniki do wzoru: razy([3, 4, 2]) = "3 \\cdot 4 \\cdot 2". */
const razy = (a) => a.join(" \\cdot ");

/** Liczby jako osobne $…$ po przecinkach – długa lista łamie się na wąskim ekranie. */
const lista = (a) => a.map((x) => `$${x}$`).join(", ");

/** Liczby od a do b malejąco: malej(4) = [4, 3, 2, 1]. */
const malej = (n) => Array.from({ length: n }, (_, i) => n - i);

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });

/** Powtarza losowanie, aż f() zwróci zadanie (wartość różną od null); f używa tego samego losownika, więc wynik jest powtarzalny. */
function probuj(f, proby = 1000) {
  for (let i = 0; i < proby; i++) {
    const w = f();
    if (w) return w;
  }
  throw new Error("Nie udało się wylosować zadania");
}

/** Poprawna odmiana: „$1$ sposób”, „$3$ sposoby”, „$5$ sposobów”. */
const odmien = (s) =>
  s.replace(/\$(\d+)\$ sposobów/g, (m, n) => {
    const x = Number(n);
    const forma = x === 1 ? "sposób" : x % 10 >= 2 && x % 10 <= 4 && (x < 12 || x > 14) ? "sposoby" : "sposobów";
    return `$${n}$ ${forma}`;
  });

/** Zadanie z odpowiedzią „liczba sposobów”. */
const zadanieLiczba = (tresc, kroki, wynik) => ({
  tresc: odmien(tresc),
  pola: [pole("n", "Liczba $=$")],
  odpowiedz: { n: q(wynik) },
  wynik: `$${wynik}$`,
  rozwiazanie: kroki.map(odmien),
});

/** Ostatni krok: P = k/n, a gdy się da, skrócone. */
function krokP(k, n) {
  const w = q(k, n);
  const surowy = `\\frac{${k}}{${n}}`;
  return surowy === w.tex() ? `$P = ${surowy}$.` : `$P = ${surowy} = ${w.tex()}$.`;
}

/** Zadanie z odpowiedzią „prawdopodobieństwo” (ułamek w najprostszej postaci). */
function zadanieP(tresc, k, n, kroki) {
  const w = q(k, n);
  return {
    tresc: odmien(tresc),
    pola: [pole("p", "$P =$")],
    odpowiedz: { p: w },
    wynik: `$${w.tex()}$`,
    rozwiazanie: [...kroki.map(odmien), krokP(k, n)],
  };
}

/** „symbole” albo „symboli” po liczbie. */
const symboli = (n) => (n % 10 >= 2 && n % 10 <= 4 && (n < 12 || n > 14) ? "symbole" : "symboli");

const OSOBY = ["Ala", "Bartek", "Celina", "Darek", "Ewa", "Filip", "Gosia"];
const LITERY = ["A", "B", "C", "D", "E", "F", "G"];

/** Ile par (a, b) z dwóch kostek daje sumę s. */
const ileSuma = (s) => 6 - Math.abs(s - 7);
/** Pary dające sumę s: "$(1, 6)$, $(2, 5)$, …". */
const pary = (s) => {
  const w = [];
  for (let a = 1; a <= 6; a++) if (s - a >= 1 && s - a <= 6) w.push(`$(${a}, ${s - a})$`);
  return w.join(", ");
};

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Reguła mnożenia
    {
      id: "regula-mnozenia",
      nazwa: "Reguła mnożenia",
      sciaga: [
        {
          nazwa: "Reguła mnożenia",
          slownie: "Gdy wybieramy w dwóch krokach, liczbę wszystkich sposobów dostajemy, mnożąc liczby możliwości z obu kroków.",
          tex: "m\\cdot n",
          litery: "$m$ – na ile sposobów można wykonać pierwszy krok, $n$ – na ile sposobów drugi krok.",
          przyklad: "Ania ma $3$ bluzki i $4$ spódnice. Bluzkę wybiera na $3$ sposoby, a do niej spódnicę na $4$ sposoby. Strojów jest $3\\cdot4=12$.",
          uwaga: "Nie dodawaj! $3+4=7$ to liczba wszystkich ubrań, a nie liczba strojów.",
        },
        {
          nazwa: "Trzy i więcej kroków",
          slownie: "Gdy kroków jest więcej, mnożymy liczby możliwości ze wszystkich kroków.",
          tex: "a\\cdot b\\cdot c",
          litery: "$a$, $b$, $c$ – liczby możliwości w kolejnych krokach.",
          przyklad: "Obiad: zupa na $2$ sposoby, drugie danie na $3$ sposoby, deser na $4$ sposoby. Obiadów jest $2\\cdot3\\cdot4=24$.",
          uwaga: "Każdy krok musi mieć swoją liczbę. Nie pomijaj żadnego kroku.",
        },
        {
          nazwa: "Gdy wybory się nie powtarzają",
          slownie: "Jeśli tego samego elementu nie wolno użyć drugi raz, to w drugim kroku mamy o jedną możliwość mniej.",
          tex: "m\\cdot(m-1)",
          litery: "$m$ – ile jest wszystkich elementów do wyboru.",
          przyklad: "Liczby dwucyfrowe z cyfr $1, 2, 3$ o różnych cyfrach: cyfrę dziesiątek wybieramy na $3$ sposoby, a cyfrę jedności na $2$ sposoby. Jest $3\\cdot2=6$ takich liczb: $12, 13, 21, 23, 31, 32$.",
          uwaga: "Gdy cyfry mogą się powtarzać, w obu krokach jest tyle samo możliwości: $3\\cdot3=9$.",
        },
        {
          nazwa: "Tabela wyników",
          slownie: "Wyniki dwóch rzutów zapisujemy w tabeli: wiersz to wynik pierwszego rzutu, kolumna – drugiego. Liczba pól to liczba wszystkich wyników.",
          tex: "\\begin{array}{c|cc} & \\text{O} & \\text{R} \\\\ \\hline \\text{O} & \\text{OO} & \\text{OR} \\\\ \\text{R} & \\text{RO} & \\text{RR} \\end{array}",
          litery: "O – orzeł, R – reszka.",
          przyklad: "Dwie monety dają $2\\cdot2=4$ wyniki. Dwie kostki dają $6\\cdot6=36$ wyników, bo każdy z $6$ wyników pierwszej kostki łączy się z $6$ wynikami drugiej.",
          uwaga: "Wyniki OR i RO są różne (na pierwszej monecie wypadło co innego). Podobnie $(1, 2)$ i $(2, 1)$ to dwa różne wyniki dla dwóch kostek.",
        },
      ],
      jak: [
        "Zapisz, z jakich kroków składa się wybór (np. bluzka, spodnie, buty).",
        "Dla każdego kroku policz, na ile sposobów można go wykonać. Jeśli coś nie może się powtórzyć, w kolejnym kroku jest o jedną możliwość mniej.",
        "Pomnóż liczby z kolejnych kroków.",
        "Sprawdź, czy nic nie pominąłeś. Przy małych liczbach możesz wypisać wszystkie możliwości i je policzyć.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Ania ma w szafie $4$ bluzki i $3$ spódnice. Na ile sposobów może ubrać się w jedną bluzkę i jedną spódnicę? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$12$", "$14$", "$24$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "W szkolnym bufecie można zamówić zupę (do wyboru $3$ rodzaje), drugie danie ($4$ rodzaje) i deser ($2$ rodzaje). Ile różnych obiadów składających się z zupy, drugiego dania i deseru można zamówić? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$", "$12$", "$24$", "$14$"],
          poprawna: 2,
        },
        {
          nr: "3",
          tresc: "Z cyfr $1, 2, 3, 4$ układamy liczby dwucyfrowe o różnych cyfrach. Ile jest takich liczb? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$", "$16$", "$8$", "$7$"],
          poprawna: 0,
        },
        {
          nr: "4",
          tresc: "Rzucamy jednocześnie białą i czerwoną sześcienną kostką do gry. Ile jest wszystkich możliwych wyników rzutu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$", "$30$", "$6$", "$36$"],
          poprawna: 3,
        },
        {
          nr: "5",
          tresc: "Rzucamy trzy razy monetą. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wszystkich możliwych wyników jest $8$.", litery: "PF", poprawna: 0 },
            { tekst: "Wyniki ORO i OOR są takie same, bo w obu są dwa orły.", litery: "PF", poprawna: 1 },
            { tekst: "Dla trzech rzutów jest o $4$ wyniki więcej niż dla dwóch rzutów.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "W sklepiku szkolnym można kupić zestaw: bułka (do wyboru $3$ rodzaje), dodatek ($4$ rodzaje) i napój ($3$ rodzaje). a) Ile jest różnych zestawów z bułką, dodatkiem i napojem? b) Ile jest różnych zestawów, jeśli ktoś nie chce napoju i bierze tylko bułkę z dodatkiem? **Zapisz obliczenia.**",
          rozwiazanie: "a) Wybór ma trzy kroki: bułka ($3$ sposoby), dodatek ($4$ sposoby), napój ($3$ sposoby).\n\nMnożymy: $3\\cdot4\\cdot3=36$.\n\nb) Teraz są tylko dwa kroki: $3\\cdot4=12$.\n\nOdpowiedź: a) $36$ zestawów, b) $12$ zestawów.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Z cyfr $0, 1, 2, 3$ układamy liczby dwucyfrowe o różnych cyfrach. a) Ile jest takich liczb? b) Wypisz je wszystkie i zaznacz, ile z nich jest parzystych. **Zapisz obliczenia.**",
          rozwiazanie: "a) Cyfrą dziesiątek nie może być $0$, więc wybieramy ją na $3$ sposoby: $1$, $2$ albo $3$.\n\nCyfrę jedności wybieramy spośród pozostałych $3$ cyfr (teraz może to być także $0$), czyli na $3$ sposoby.\n\nLiczb jest $3\\cdot3=9$.\n\nb) Wszystkie liczby: $10, 12, 13, 20, 21, 23, 30, 31, 32$.\n\nParzyste (cyfra jedności $0$ albo $2$): $10, 12, 20, 30, 32$, czyli $5$ liczb.\n\nOdpowiedź: a) $9$ liczb, b) $5$ liczb parzystych.",
        },
      ],
      generatory: [
        {
          id: "zestawy-menu",
          nazwa: "Zestawy i menu",
          opis: "Wybór w kilku krokach (strój, obiad, kanapka) – oblicz, ile jest różnych możliwości, mnożąc liczby wyborów.",
          generuj(r) {
            const ZESTAWY = [
              { start: "Ola wybiera strój do szkoły.", kroki: ["bluzka", "spodnie", "buty"], pyt: "Ile różnych strojów (bluzka, spodnie i buty) może skompletować?" },
              { start: "W stołówce można zamówić obiad.", kroki: ["zupa", "drugie danie", "deser"], pyt: "Ile jest różnych obiadów składających się z zupy, drugiego dania i deseru?" },
              { start: "Kuba robi sobie kanapkę.", kroki: ["pieczywo", "wędlina lub ser", "dodatek"], pyt: "Ile różnych kanapek może zrobić?" },
              { start: "Pan Marek kupuje rower.", kroki: ["kolor ramy", "rodzaj siodełka", "rodzaj dzwonka"], pyt: "Ile jest możliwych wersji roweru?" },
              { start: "Klasa planuje jednodniową wycieczkę.", kroki: ["miejsce", "środek transportu"], pyt: "Ile jest różnych planów wycieczki (miejsce i środek transportu)?" },
              { start: "Marta zamawia pizzę.", kroki: ["rozmiar", "rodzaj ciasta", "rodzaj sosu"], pyt: "Ile różnych pizz może zamówić?" },
              { start: "Podróż z miasta A do miasta C prowadzi przez miasto B.", kroki: ["liczba dróg z A do B", "liczba dróg z B do C"], pyt: "Na ile sposobów można pojechać z A do C?" },
            ];
            const z = r.pick(ZESTAWY);
            const n = z.kroki.map(() => r.int(2, 6));
            const N = iloczyn(n);
            const opis = z.kroki.map((k, i) => `${k} – $${n[i]}$`).join(", ");
            return zadanieLiczba(
              `${z.start} Liczba możliwości: ${opis}. ${z.pyt}`,
              [
                `Wybór ma ${n.length === 2 ? "dwa kroki" : "trzy kroki"}, a liczby możliwości w kolejnych krokach to ${lista(n)}.`,
                `Mnożymy liczby możliwości: $${razy(n)} = ${N}$.`,
              ],
              N,
            );
          },
        },
        {
          id: "bez-powtorzen",
          nazwa: "Bez powtórzeń",
          opis: "Liczby o różnych cyfrach, hasła o różnych literach i ustawianie osób w kolejce – po każdym wyborze zostaje o jedną możliwość mniej.",
          generuj(r) {
            const typ = r.int(0, 3);
            if (typ === 0) {
              const k = r.int(4, 7);
              const cyfry = Array.from({ length: k }, (_, i) => i + 1);
              return zadanieLiczba(
                `Z cyfr ${lista(cyfry)} układamy liczby dwucyfrowe o różnych cyfrach. Ile jest takich liczb?`,
                [`Cyfrę dziesiątek wybieramy na $${k}$ sposobów.`, `Cyfra jedności musi być inna, więc zostaje $${k - 1}$ sposobów.`, `$${k} \\cdot ${k - 1} = ${k * (k - 1)}$.`],
                k * (k - 1),
              );
            }
            if (typ === 1) {
              const k = r.int(3, 5);
              const cyfry = Array.from({ length: k + 1 }, (_, i) => i);
              return zadanieLiczba(
                `Z cyfr ${lista(cyfry)} układamy liczby dwucyfrowe o różnych cyfrach. Ile jest takich liczb?`,
                [
                  `Cyfrą dziesiątek nie może być $0$, więc wybieramy ją na $${k}$ sposobów.`,
                  `Cyfrę jedności wybieramy spośród pozostałych cyfr (teraz może być $0$): $${k}$ sposobów.`,
                  `$${k} \\cdot ${k} = ${k * k}$.`,
                ],
                k * k,
              );
            }
            if (typ === 2) {
              const m = r.int(3, 5);
              const imiona = r.shuffle(OSOBY).slice(0, m);
              const f = iloczyn(malej(m));
              return zadanieLiczba(
                `${imiona.join(", ")} ustawiają się jedno za drugim w kolejce. Na ile sposobów mogą to zrobić?`,
                [
                  `Na pierwsze miejsce mamy $${m}$ możliwości, na drugie o jedną mniej, i tak dalej, aż do ostatniego miejsca.`,
                  `$${razy(malej(m))} = ${f}$.`,
                ],
                f,
              );
            }
            const k = r.int(4, 6);
            const lit = r.shuffle(LITERY).slice(0, k).sort();
            return zadanieLiczba(
              `Hasło składa się z dwóch liter, które muszą być różne. Do dyspozycji są litery: ${lista(lit)}. Ile jest takich haseł?`,
              [`Pierwszą literę wybieramy na $${k}$ sposobów.`, `Druga litera musi być inna, więc zostaje $${k - 1}$ sposobów.`, `$${k} \\cdot ${k - 1} = ${k * (k - 1)}$.`],
              k * (k - 1),
            );
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Zastosowania reguły mnożenia
    {
      id: "zastosowania",
      nazwa: "Zastosowania reguły mnożenia",
      sciaga: [
        {
          nazwa: "Kody i hasła",
          slownie: "Gdy znaki w kodzie mogą się powtarzać, w każdym miejscu jest tyle samo możliwości. Mnożymy je tyle razy, ile jest miejsc.",
          tex: "n\\cdot n\\cdot\\ldots\\cdot n",
          litery: "$n$ – ile jest możliwych znaków na jednym miejscu.",
          przyklad: "Kod PIN ma $4$ cyfry. Na każdym miejscu jest $10$ cyfr, więc kodów jest $10\\cdot10\\cdot10\\cdot10=10000$.",
          uwaga: "Kod $0000$ też jest kodem. Cyfra $0$ jest zwykłą cyfrą.",
        },
        {
          nazwa: "Liczby wielocyfrowe",
          slownie: "Pierwsza cyfra liczby nie może być zerem. Pozostałe cyfry mogą być dowolne.",
          tex: "9\\cdot10\\cdot10",
          litery: "Pierwsza cyfra: $9$ sposobów (od $1$ do $9$), każda następna: $10$ sposobów.",
          przyklad: "Liczb trzycyfrowych jest $9\\cdot10\\cdot10=900$. Zgadza się: to liczby od $100$ do $999$, a $999-100+1=900$.",
          uwaga: "Nie wpisuj $10\\cdot10\\cdot10$, bo liczyłbyś też „liczby” typu $007$.",
        },
        {
          nazwa: "Liczba z warunkiem",
          slownie: "Gdy liczba ma spełniać warunek (np. być parzysta), zaczynamy od miejsca z warunkiem. Potem wybieramy pozostałe cyfry.",
          tex: "5\\cdot5\\cdot2",
          litery: "Kolejno: cyfra setek, cyfra dziesiątek, cyfra jedności (parzysta).",
          przyklad: "Liczby trzycyfrowe parzyste z cyfr $1, 2, 3, 4, 5$ (cyfry mogą się powtarzać). Cyfra jedności musi być $2$ albo $4$ – to $2$ sposoby. Pozostałe cyfry po $5$ sposobów: $5\\cdot5\\cdot2=50$.",
          uwaga: "Liczba jest parzysta, gdy parzysta jest jej ostatnia cyfra. Inne cyfry nie mają znaczenia.",
        },
        {
          nazwa: "Ustawianie w kolejce",
          slownie: "Na pierwsze miejsce możemy wybrać każdą osobę, na drugie – o jedną mniej, i tak dalej. Mnożymy liczby, aż dojdziemy do $1$.",
          tex: "3\\cdot2\\cdot1=6",
          litery: "$3$ osoby: $3$ możliwości na pierwsze miejsce, $2$ na drugie, $1$ na trzecie.",
          przyklad: "Ala, Bartek i Celina mogą stanąć w kolejce na $6$ sposobów: ABC, ACB, BAC, BCA, CAB, CBA. Czterech osób jest $4\\cdot3\\cdot2\\cdot1=24$ ustawień.",
          uwaga: "Rośnie to bardzo szybko: pięć osób to już $120$ ustawień.",
        },
      ],
      jak: [
        "Policz miejsca (cyfry kodu, miejsca w kolejce) i narysuj w myślach tyle kresek.",
        "Zacznij od miejsca z warunkiem (np. ostatnia cyfra parzysta) albo od miejsca, które ma ograniczenie (pierwsza cyfra nie jest zerem).",
        "Przy każdym miejscu zapisz, ile jest możliwości. Gdy elementy nie mogą się powtarzać, odejmuj po jednej.",
        "Pomnóż liczby i sprawdź, czy wynik ma sens (czy nie jest za duży lub za mały).",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Kłódka ma kod z trzech cyfr. Na każdym z trzech pokręteł można ustawić cyfrę od $0$ do $9$. Ile jest możliwych kodów? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1000$", "$30$", "$720$", "$100$"],
          poprawna: 0,
        },
        {
          nr: "9",
          tresc: "Ile jest wszystkich liczb trzycyfrowych? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1000$", "$900$", "$648$", "$810$"],
          poprawna: 1,
        },
        {
          nr: "10",
          tresc: "Czworo dzieci ustawia się w rzędzie do zdjęcia. Na ile sposobów mogą się ustawić? **Wybierz właściwą odpowiedź.**",
          opcje: ["$16$", "$10$", "$4$", "$24$"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "Hasło składa się z jednej litery wybranej spośród $A, B, C, D, E$ oraz z dwóch cyfr. Cyfry mogą się powtarzać. Ile jest takich haseł? **Wybierz właściwą odpowiedź.**",
          opcje: ["$50$", "$450$", "$500$", "$250$"],
          poprawna: 2,
        },
        {
          nr: "12",
          tresc: "Z cyfr $1, 2, 3, 4$ układamy liczby trzycyfrowe. Cyfry mogą się powtarzać. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wszystkich takich liczb jest $64$.", litery: "PF", poprawna: 0 },
            { tekst: "Liczb parzystych jest $32$.", litery: "PF", poprawna: 0 },
            { tekst: "Liczb mniejszych od $200$ jest $32$.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Ala, Bartek, Celina i Darek ustawiają się w kolejce do kasy. a) Na ile sposobów mogą się ustawić? b) Na ile sposobów mogą się ustawić tak, żeby Ala stała pierwsza? **Zapisz obliczenia.**",
          rozwiazanie: "a) Na pierwsze miejsce są $4$ osoby, na drugie $3$, na trzecie $2$, na czwarte $1$: $4\\cdot3\\cdot2\\cdot1=24$.\n\nb) Gdy Ala stoi pierwsza, na pierwsze miejsce jest tylko $1$ możliwość. Pozostałe trzy osoby ustawiamy na $3\\cdot2\\cdot1=6$ sposobów.\n\nOdpowiedź: a) $24$ sposoby, b) $6$ sposobów.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Z cyfr $0, 1, 2, 3, 4$ układamy liczby trzycyfrowe o różnych cyfrach. a) Ile jest takich liczb? b) Ile z nich jest większych od $400$? **Zapisz obliczenia.**",
          rozwiazanie: "a) Cyfra setek nie może być $0$, więc wybieramy ją na $4$ sposoby.\n\nCyfrę dziesiątek wybieramy z pozostałych $4$ cyfr (teraz może być $0$): $4$ sposoby.\n\nCyfrę jedności wybieramy z pozostałych $3$ cyfr: $3$ sposoby.\n\nLiczb jest $4\\cdot4\\cdot3=48$.\n\nb) Liczba większa od $400$ musi zaczynać się od cyfry $4$ (większej cyfry nie mamy), więc cyfra setek: $1$ sposób. Dalej $4\\cdot3=12$.\n\nOdpowiedź: a) $48$ liczb, b) $12$ liczb.",
        },
      ],
      generatory: [
        {
          id: "kody-hasla",
          nazwa: "Kody i hasła",
          opis: "Kod PIN, hasło z liter i cyfr, kłódka z pokrętłami – oblicz, ile jest możliwych kodów (znaki mogą się powtarzać).",
          generuj(r) {
            const typ = r.int(0, 3);
            if (typ === 0) {
              const d = r.int(2, 4);
              const N = 10 ** d;
              return zadanieLiczba(
                `Kod PIN ma $${d}$ cyfry. Każda z nich to cyfra od $0$ do $9$, a cyfry mogą się powtarzać. Ile jest możliwych kodów?`,
                [`Na każdym z $${d}$ miejsc jest $10$ możliwości.`, `$${razy(Array(d).fill(10))} = ${N}$.`],
                N,
              );
            }
            if (typ === 1) {
              const a = r.int(3, 6);
              const lit = LITERY.slice(0, a);
              const N = a * 100;
              return zadanieLiczba(
                `Hasło składa się z jednej litery wybranej spośród ${lista(lit)} i z dwóch cyfr. Cyfry mogą się powtarzać. Ile jest takich haseł?`,
                [`Literę wybieramy na $${a}$ sposobów, a każdą z dwóch cyfr na $10$ sposobów.`, `$${a} \\cdot 10 \\cdot 10 = ${N}$.`],
                N,
              );
            }
            if (typ === 2) {
              const a = r.int(3, 5);
              const lit = LITERY.slice(0, a);
              const N = a * a * 10;
              return zadanieLiczba(
                `Kod składa się z dwóch liter wybranych spośród ${lista(lit)} (litery mogą się powtarzać) i jednej cyfry. Ile jest takich kodów?`,
                [`Każdą z dwóch liter wybieramy na $${a}$ sposobów, a cyfrę na $10$ sposobów.`, `$${a} \\cdot ${a} \\cdot 10 = ${N}$.`],
                N,
              );
            }
            const w = [r.int(2, 9), r.int(2, 9), r.int(2, 9)];
            const N = iloczyn(w);
            return zadanieLiczba(
              `Kłódka ma trzy pokrętła. Na pierwszym jest $${w[0]}$ ${symboli(w[0])}, na drugim $${w[1]}$ ${symboli(w[1])}, a na trzecim $${w[2]}$ ${symboli(w[2])}. Ile jest różnych ustawień kłódki?`,
              [`Na każdym pokrętle ustawiamy jeden symbol, więc mamy kolejno $${w[0]}$, $${w[1]}$ i $${w[2]}$ możliwości.`, `$${razy(w)} = ${N}$.`],
              N,
            );
          },
        },
        {
          id: "liczby-warunek",
          nazwa: "Liczby z warunkiem",
          opis: "Ile jest liczb trzycyfrowych lub czterocyfrowych o podanych cyfrach i warunku (pierwsza cyfra różna od zera, liczba parzysta, cyfry różne).",
          generuj(r) {
            const typ = r.int(0, 5);
            if (typ === 0) {
              const d = r.int(3, 4);
              const N = 9 * 10 ** (d - 1);
              return zadanieLiczba(
                `Ile jest wszystkich liczb ${d === 3 ? "trzycyfrowych" : "czterocyfrowych"}?`,
                [`Pierwsza cyfra nie może być zerem: $9$ sposobów (od $1$ do $9$).`, `Każda z pozostałych ${d - 1} cyfr: $10$ sposobów.`, `$${razy([9, ...Array(d - 1).fill(10)])} = ${N}$.`],
                N,
              );
            }
            if (typ === 1) {
              const k = r.int(3, 6);
              const cyfry = Array.from({ length: k }, (_, i) => i + 1);
              const N = k ** 3;
              return zadanieLiczba(
                `Z cyfr ${lista(cyfry)} układamy liczby trzycyfrowe. Cyfry mogą się powtarzać. Ile jest takich liczb?`,
                [`Każdą z trzech cyfr wybieramy na $${k}$ sposobów.`, `$${k} \\cdot ${k} \\cdot ${k} = ${N}$.`],
                N,
              );
            }
            if (typ === 2) {
              const k = r.int(3, 6);
              const parz = r.chance();
              const cyfry = Array.from({ length: k }, (_, i) => i + 1);
              const ile = parz ? Math.floor(k / 2) : Math.ceil(k / 2);
              const N = k * k * ile;
              const ktore = cyfry.filter((c) => (c % 2 === 0) === parz);
              return zadanieLiczba(
                `Z cyfr ${lista(cyfry)} układamy liczby trzycyfrowe ${parz ? "parzyste" : "nieparzyste"}. Cyfry mogą się powtarzać. Ile jest takich liczb?`,
                [
                  `Zaczynamy od cyfry jedności. Liczba jest ${parz ? "parzysta" : "nieparzysta"}, gdy ta cyfra jest ${parz ? "parzysta" : "nieparzysta"}: ${lista(ktore)}, czyli $${ile}$ sposobów.`,
                  `Cyfry setek i dziesiątek wybieramy dowolnie: po $${k}$ sposobów.`,
                  `$${k} \\cdot ${k} \\cdot ${ile} = ${N}$.`,
                ],
                N,
              );
            }
            if (typ === 3) {
              const k = r.int(4, 6);
              const cyfry = Array.from({ length: k }, (_, i) => i + 1);
              const N = k * (k - 1) * (k - 2);
              return zadanieLiczba(
                `Z cyfr ${lista(cyfry)} układamy liczby trzycyfrowe o różnych cyfrach. Ile jest takich liczb?`,
                [`Cyfrę setek wybieramy na $${k}$ sposobów, cyfrę dziesiątek na $${k - 1}$, a cyfrę jedności na $${k - 2}$ sposobów.`, `$${k} \\cdot ${k - 1} \\cdot ${k - 2} = ${N}$.`],
                N,
              );
            }
            if (typ === 4) {
              const k = r.int(3, 5);
              const cyfry = Array.from({ length: k + 1 }, (_, i) => i);
              const N = k * (k + 1) * (k + 1);
              return zadanieLiczba(
                `Z cyfr ${lista(cyfry)} układamy liczby trzycyfrowe. Cyfry mogą się powtarzać. Ile jest takich liczb?`,
                [`Cyfrą setek nie może być $0$: $${k}$ sposobów.`, `Cyfry dziesiątek i jedności są dowolne: po $${k + 1}$ sposobów.`, `$${k} \\cdot ${k + 1} \\cdot ${k + 1} = ${N}$.`],
                N,
              );
            }
            const k = r.int(4, 8);
            const parz = r.chance();
            const cyfry = Array.from({ length: k }, (_, i) => i + 1);
            const ile = parz ? Math.floor(k / 2) : Math.ceil(k / 2);
            const N = k * ile;
            const ktore = cyfry.filter((c) => (c % 2 === 0) === parz);
            return zadanieLiczba(
              `Z cyfr ${lista(cyfry)} układamy liczby dwucyfrowe ${parz ? "parzyste" : "nieparzyste"}. Cyfry mogą się powtarzać. Ile jest takich liczb?`,
              [
                `Zaczynamy od cyfry jedności: ${lista(ktore)}, czyli $${ile}$ sposobów.`,
                `Cyfrę dziesiątek wybieramy dowolnie: $${k}$ sposobów.`,
                `$${k} \\cdot ${ile} = ${N}$.`,
              ],
              N,
            );
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Obliczanie prawdopodobieństwa
    {
      id: "obliczanie",
      nazwa: "Obliczanie prawdopodobieństwa",
      sciaga: [
        {
          nazwa: "Prawdopodobieństwo klasyczne",
          slownie: "Gdy wszystkie wyniki są jednakowo możliwe, dzielimy liczbę wyników sprzyjających przez liczbę wszystkich wyników. Wszystkie wyniki liczymy regułą mnożenia albo wypisujemy w tabeli.",
          tex: "P=\\frac{k}{n}",
          litery: "$k$ – liczba wyników sprzyjających, $n$ – liczba wszystkich wyników.",
          przyklad: "Rzucamy dwa razy monetą: $n=2\\cdot2=4$. Dwa orły to jeden wynik (OO), więc $P=\\frac{1}{4}$.",
          uwaga: "Wynik zapisz ułamkiem w najprostszej postaci: $\\frac{6}{36}=\\frac{1}{6}$.",
        },
        {
          nazwa: "Dwie kostki",
          slownie: "Wyniki zapisujemy jako pary $(a, b)$: $a$ – pierwsza kostka, $b$ – druga. Wszystkich par jest $6\\cdot6=36$. Sprzyjające pary wypisujemy albo liczymy.",
          tex: "n=6\\cdot6=36",
          litery: "Pary $(1, 6)$ i $(6, 1)$ to dwa różne wyniki.",
          przyklad: "Suma oczek $7$: pary $(1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1)$ – razem $6$. Więc $P=\\frac{6}{36}=\\frac{1}{6}$.",
          uwaga: "Suma $7$ ma $6$ par, a suma $12$ tylko jedną: $(6, 6)$. Nie każda suma jest tak samo prawdopodobna.",
        },
        {
          nazwa: "Ile par daje daną sumę",
          slownie: "Sumy od $2$ do $12$ mają różnie wiele par. Im bliżej $7$, tym par jest więcej. Można je liczyć od razu.",
          przyklad: "Suma $2$: $1$ para, $3$: $2$, $4$: $3$, $5$: $4$, $6$: $5$, $7$: $6$, $8$: $5$, $9$: $4$, $10$: $3$, $11$: $2$, $12$: $1$. Razem $36$. Suma co najmniej $10$: $3+2+1=6$ par, więc $P=\\frac{6}{36}=\\frac{1}{6}$.",
          uwaga: "Sprawdź na końcu, czy wszystkie liczby par dają razem $36$.",
        },
        {
          nazwa: "Monety i zdarzenie przeciwne",
          slownie: "Trzy monety dają $2\\cdot2\\cdot2=8$ wyników. Gdy w zadaniu jest „co najmniej jeden”, łatwiej policzyć wyniki bez tego i odjąć od $1$.",
          tex: "P(A)=1-P(A')",
          litery: "$A$ – zdarzenie, $A'$ – zdarzenie przeciwne („nie $A$”).",
          przyklad: "Co najmniej jeden orzeł w trzech rzutach: jedyny wynik bez orła to RRR, więc $P(A')=\\frac{1}{8}$. Stąd $P(A)=1-\\frac{1}{8}=\\frac{7}{8}$.",
          uwaga: "OOR, ORO, ROO to trzy różne wyniki: dokładnie dwa orły to $\\frac{3}{8}$, a nie $\\frac{1}{8}$.",
        },
      ],
      jak: [
        "Policz wszystkie wyniki ($n$): regułą mnożenia (dwie kostki: $6\\cdot6$, trzy monety: $2\\cdot2\\cdot2$) albo wypisz w tabeli.",
        "Policz wyniki sprzyjające ($k$): wypisz je albo policz regułą mnożenia.",
        "Zapisz $\\frac{k}{n}$ i skróć ułamek.",
        "Przy słowach „co najmniej jeden” policz zdarzenie przeciwne i odejmij od $1$.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Rzucamy dwiema sześciennymi kostkami do gry (jedną białą i jedną czerwoną). Prawdopodobieństwo, że suma oczek będzie równa $5$, jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{9}$", "$\\frac{1}{6}$", "$\\frac{1}{4}$", "$\\frac{1}{12}$"],
          poprawna: 0,
        },
        {
          nr: "16",
          tresc: "Rzucamy dwa razy symetryczną monetą. Prawdopodobieństwo, że wypadnie dokładnie jeden orzeł, jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{4}$", "$\\frac{1}{2}$", "$\\frac{1}{3}$", "$\\frac{3}{4}$"],
          poprawna: 1,
        },
        {
          nr: "17",
          tresc: "Rzucamy dwiema sześciennymi kostkami do gry. Prawdopodobieństwo, że na obu kostkach wypadnie parzysta liczba oczek, jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{2}$", "$\\frac{1}{3}$", "$\\frac{1}{4}$", "$\\frac{1}{9}$"],
          poprawna: 2,
        },
        {
          nr: "18",
          tresc: "Rzucamy trzy razy symetryczną monetą. Prawdopodobieństwo, że wypadnie co najmniej jeden orzeł, jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{8}$", "$\\frac{3}{8}$", "$\\frac{3}{4}$", "$\\frac{7}{8}$"],
          poprawna: 3,
        },
        {
          nr: "19",
          tresc: "Rzucamy dwiema sześciennymi kostkami do gry. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Prawdopodobieństwo, że suma oczek wyniesie $12$, jest równe $\\frac{1}{36}$.", litery: "PF", poprawna: 0 },
            { tekst: "Suma $2$ i suma $12$ mają takie samo prawdopodobieństwo.", litery: "PF", poprawna: 0 },
            { tekst: "Prawdopodobieństwo, że suma oczek wyniesie $7$, jest równe $\\frac{1}{7}$.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Rzucamy dwiema sześciennymi kostkami do gry. Oblicz prawdopodobieństwo, że: a) suma oczek będzie równa $9$, b) suma oczek będzie równa co najmniej $10$. **Zapisz obliczenia.**",
          rozwiazanie: "Wszystkich wyników jest $n=6\\cdot6=36$.\n\na) Sumę $9$ dają pary: $(3, 6), (4, 5), (5, 4), (6, 3)$, czyli $4$ pary. $P=\\frac{4}{36}=\\frac{1}{9}$.\n\nb) Suma $10$: $3$ pary, suma $11$: $2$ pary, suma $12$: $1$ para. Razem $3+2+1=6$ par. $P=\\frac{6}{36}=\\frac{1}{6}$.\n\nOdpowiedź: a) $\\frac{1}{9}$, b) $\\frac{1}{6}$.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Rzucamy trzy razy symetryczną monetą. Oblicz prawdopodobieństwo, że wypadną: a) dokładnie dwa orły, b) co najmniej dwa orły, c) co najmniej jedna reszka. **Zapisz obliczenia.**",
          rozwiazanie: "Wszystkich wyników jest $n=2\\cdot2\\cdot2=8$.\n\na) Dokładnie dwa orły: OOR, ORO, ROO – $3$ wyniki. $P=\\frac{3}{8}$.\n\nb) Co najmniej dwa orły to dokładnie dwa (te $3$ wyniki) albo trzy (OOO, $1$ wynik). Razem $3+1=4$ wyniki. $P=\\frac{4}{8}=\\frac{1}{2}$.\n\nc) Zdarzenie przeciwne to brak reszki, czyli OOO – $1$ wynik, więc $P(A')=\\frac{1}{8}$. Stąd $P=1-\\frac{1}{8}=\\frac{7}{8}$.\n\nOdpowiedź: a) $\\frac{3}{8}$, b) $\\frac{1}{2}$, c) $\\frac{7}{8}$.",
        },
      ],
      generatory: [
        {
          id: "dwie-kostki",
          nazwa: "Dwie kostki",
          opis: "Rzut dwiema kostkami – oblicz prawdopodobieństwo zdarzenia (suma oczek, takie same liczby, liczby parzyste).",
          generuj(r) {
            const wstep = r.pick([
              "Rzucamy dwiema sześciennymi kostkami do gry: pierwszą i drugą.",
              "Rzucamy jednocześnie białą i czerwoną sześcienną kostką do gry (biała to pierwsza kostka, czerwona to druga).",
            ]);
            const zd = [];
            for (let s = 2; s <= 12; s++) {
              zd.push({
                opis: `suma oczek będzie równa $${s}$`,
                k: ileSuma(s),
                kroki: [`Sumę $${s}$ dają pary: ${pary(s)}. Jest ich $${ileSuma(s)}$.`],
              });
            }
            for (let s = 4; s <= 11; s++) {
              const c = [];
              for (let t = s; t <= 12; t++) c.push(ileSuma(t));
              zd.push({
                opis: `suma oczek będzie równa co najmniej $${s}$`,
                k: sum(c),
                kroki: [`Sumy od $${s}$ do $12$ mają kolejno $${c.join("$, $")}$ par. Razem $${c.join(" + ")} = ${sum(c)}$.`],
              });
            }
            for (let s = 3; s <= 10; s++) {
              const c = [];
              for (let t = 2; t <= s; t++) c.push(ileSuma(t));
              zd.push({
                opis: `suma oczek będzie równa co najwyżej $${s}$`,
                k: sum(c),
                kroki: [`Sumy od $2$ do $${s}$ mają kolejno $${c.join("$, $")}$ par. Razem $${c.join(" + ")} = ${sum(c)}$.`],
              });
            }
            zd.push(
              { opis: "na obu kostkach wypadnie taka sama liczba oczek", k: 6, kroki: ["Sprzyjają pary $(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6)$. Jest ich $6$."] },
              { opis: "na obu kostkach wypadnie parzysta liczba oczek", k: 9, kroki: ["Parzyste liczby oczek to $2, 4, 6$, czyli $3$ możliwości na każdej kostce. Par jest $3 \\cdot 3 = 9$."] },
              { opis: "na obu kostkach wypadnie nieparzysta liczba oczek", k: 9, kroki: ["Nieparzyste liczby oczek to $1, 3, 5$, czyli $3$ możliwości na każdej kostce. Par jest $3 \\cdot 3 = 9$."] },
              {
                opis: "na pierwszej kostce wypadnie więcej oczek niż na drugiej",
                k: 15,
                kroki: ["Gdy na pierwszej kostce jest $2$, to na drugiej może być $1$ (1 sposób); dla $3$ są $2$ sposoby, dla $4$ – $3$, dla $5$ – $4$, dla $6$ – $5$. Razem $1 + 2 + 3 + 4 + 5 = 15$."],
              },
              {
                opis: "suma oczek będzie liczbą parzystą",
                k: 18,
                kroki: ["Suma jest parzysta, gdy obie liczby są parzyste albo obie nieparzyste: $3 \\cdot 3 + 3 \\cdot 3 = 18$."],
              },
              {
                opis: "suma oczek będzie podzielna przez $3$",
                k: 12,
                kroki: [`Sumy $3, 6, 9, 12$ mają kolejno $2, 5, 4, 1$ par. Razem $2 + 5 + 4 + 1 = 12$.`],
              },
            );
            const z = r.pick(zd);
            return zadanieP(`${wstep} Oblicz prawdopodobieństwo, że ${z.opis}.`, z.k, 36, ["Każda kostka ma $6$ wyników, więc wszystkich wyników jest $n = 6 \\cdot 6 = 36$.", ...z.kroki]);
          },
        },
        {
          id: "monety",
          nazwa: "Monety",
          opis: "Rzut dwiema albo trzema monetami – oblicz prawdopodobieństwo, że wypadnie dana liczba orłów albo reszek.",
          generuj(r) {
            const m = r.int(2, 3);
            const wstep = r.pick(
              m === 2 ? ["Rzucamy dwa razy symetryczną monetą.", "Rzucamy jednocześnie dwiema symetrycznymi monetami."] : ["Rzucamy trzy razy symetryczną monetą.", "Rzucamy jednocześnie trzema symetrycznymi monetami."],
            );
            const orzel = r.chance();
            const cel = orzel ? "O" : "R";
            const nazwa = orzel ? "orłów" : "reszek";
            const wszystkie = [];
            for (let i = 0; i < 2 ** m; i++) wszystkie.push(Array.from({ length: m }, (_, b) => ((i >> b) & 1 ? "O" : "R")).join(""));
            const ile = (w) => [...w].filter((c) => c === cel).length;
            const zd = [];
            for (let j = 1; j <= m; j++) zd.push({ opis: `liczba ${nazwa} będzie równa $${j}$`, ok: (w) => ile(w) === j });
            for (let j = 1; j < m; j++) zd.push({ opis: `liczba ${nazwa} będzie nie mniejsza niż $${j}$`, ok: (w) => ile(w) >= j });
            zd.push({ opis: "na wszystkich monetach wypadnie ta sama strona", ok: (w) => ile(w) === 0 || ile(w) === m });
            const z = r.pick(zd);
            const n = 2 ** m;
            const sprz = wszystkie.filter(z.ok);
            const niesprz = wszystkie.filter((w) => !z.ok(w));
            const w = (l) => l.map((x) => `$${x}$`).join(", ");
            const kroki = [
              `Każda moneta ma $2$ wyniki, więc wszystkich wyników jest $n = ${razy(Array(m).fill(2))} = ${n}$. Orła oznaczamy literą O, a reszkę literą R.`,
            ];
            if (sprz.length * 2 > n) {
              kroki.push(`Łatwiej policzyć zdarzenie przeciwne. Niesprzyjające wyniki: ${w(niesprz)} – jest ich $${niesprz.length}$, więc sprzyjających jest $${n} - ${niesprz.length} = ${sprz.length}$.`);
            } else {
              kroki.push(`Sprzyjające wyniki: ${w(sprz)}. Jest ich $${sprz.length}$.`);
            }
            return zadanieP(`${wstep} Oblicz prawdopodobieństwo, że ${z.opis}.`, sprz.length, n, kroki);
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Kombinatoryka a prawdopodobieństwo
    {
      id: "kombinatoryka",
      nazwa: "Kombinatoryka a prawdopodobieństwo",
      sciaga: [
        {
          nazwa: "Wszystkie wyniki regułą mnożenia",
          slownie: "Gdy doświadczenie ma kilka kroków (kolejne cyfry kodu, kolejne losowania), nie wypisujemy wszystkich wyników. Liczbę $n$ obliczamy regułą mnożenia.",
          tex: "P=\\frac{k}{n}",
          litery: "$n$ i $k$ liczymy regułą mnożenia.",
          przyklad: "Kłódka ma kod z $3$ cyfr (od $0$ do $9$). Wszystkich kodów jest $n=10\\cdot10\\cdot10=1000$. Trafiamy za pierwszym razem z prawdopodobieństwem $\\frac{1}{1000}$.",
          uwaga: "Jeśli któryś znak jest już znany, ten krok ma tylko $1$ możliwość.",
        },
        {
          nazwa: "Wyniki sprzyjające",
          slownie: "Liczbę $k$ też liczymy regułą mnożenia, ale z warunkiem. Najpierw wybieramy miejsce z warunkiem, potem resztę.",
          przyklad: "Liczby dwucyfrowe z cyfr $1,2,3,4,5$ (cyfry mogą się powtarzać): $n=5\\cdot5=25$. Obie cyfry takie same: $5$ liczb ($11, 22, \\ldots, 55$). $P=\\frac{5}{25}=\\frac{1}{5}$.",
          uwaga: "Nie myl liczby wszystkich wyników z liczbą sprzyjających. Dzielimy $k$ przez $n$, a nie odwrotnie.",
        },
        {
          nazwa: "Losowanie bez zwracania",
          slownie: "Gdy losujemy kolejno kilka rzeczy i nie odkładamy ich z powrotem, w każdym następnym losowaniu jest o jedną rzecz mniej.",
          tex: "n=5\\cdot4=20",
          litery: "Pięć kartek: za pierwszym razem $5$ możliwości, za drugim $4$.",
          przyklad: "Z kartek $1, 2, 3, 4, 5$ losujemy kolejno dwie. Pierwsza parzysta ($2$ sposoby), druga nieparzysta ($3$ sposoby): $k=2\\cdot3=6$. $P=\\frac{6}{20}=\\frac{3}{10}$.",
          uwaga: "W drugim losowaniu jest $4$ kartki, a nie $5$. Przy parzystej pierwszej zostały też wszystkie $3$ nieparzyste.",
        },
        {
          nazwa: "Ułożenie osób",
          slownie: "Gdy osoby ustawiają się losowo, wszystkie ustawienia są jednakowo możliwe. Ustawienia liczymy regułą mnożenia.",
          tex: "n=3\\cdot2\\cdot1=6",
          litery: "Trzy osoby – $6$ ustawień.",
          przyklad: "Ala, Bartek i Celina stają losowo w kolejce. Ala pierwsza: $1\\cdot2\\cdot1=2$ ustawienia. $P=\\frac{2}{6}=\\frac{1}{3}$.",
          uwaga: "Gdy Ala ma stać na ustalonym miejscu, to miejsce ma $1$ możliwość. Pozostałe osoby ustawiamy dalej regułą mnożenia.",
        },
      ],
      jak: [
        "Opisz doświadczenie krok po kroku (kolejne cyfry, kolejne losowania, kolejne osoby).",
        "Policz $n$ – wszystkie wyniki – regułą mnożenia. Pamiętaj: bez zwracania to w każdym kroku o jedną możliwość mniej.",
        "Policz $k$ – wyniki sprzyjające – regułą mnożenia z warunkiem. Najpierw miejsce z warunkiem.",
        "Zapisz $P=\\frac{k}{n}$ i skróć ułamek. Czasem prościej policzyć zdarzenie przeciwne i odjąć od $1$.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Kłódka na rower ma kod z trzech cyfr. Na każdym pokrętle jest cyfra od $0$ do $9$. Ktoś wybiera kod na chybił trafił. Prawdopodobieństwo, że od razu trafi właściwy kod, jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{30}$", "$\\frac{1}{100}$", "$\\frac{1}{1000}$", "$\\frac{1}{10000}$"],
          poprawna: 2,
        },
        {
          nr: "23",
          tresc: "Z cyfr $1, 2, 3, 4$ układamy liczby dwucyfrowe (cyfry mogą się powtarzać) i losujemy jedną z nich. Prawdopodobieństwo, że wylosowana liczba ma dwie różne cyfry, jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{4}$", "$\\frac{3}{4}$", "$\\frac{1}{2}$", "$\\frac{2}{3}$"],
          poprawna: 1,
        },
        {
          nr: "24",
          tresc: "Ala, Bartek i Celina stają losowo w kolejce do kasy. Prawdopodobieństwo, że Ala będzie pierwsza, jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{3}$", "$\\frac{1}{6}$", "$\\frac{1}{2}$", "$\\frac{2}{3}$"],
          poprawna: 0,
        },
        {
          nr: "25",
          tresc: "W pudełku jest $5$ kartek ponumerowanych liczbami od $1$ do $5$. Losujemy kolejno dwie kartki, nie odkładając pierwszej z powrotem. Prawdopodobieństwo, że obie liczby będą parzyste, jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{4}{25}$", "$\\frac{1}{5}$", "$\\frac{2}{5}$", "$\\frac{1}{10}$"],
          poprawna: 3,
        },
        {
          nr: "26",
          tresc: "Kod do szafki składa się z dwóch cyfr. Każda to cyfra od $0$ do $9$, a cyfry mogą się powtarzać. Ktoś wpisuje kod na chybił trafił. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wszystkich możliwych kodów jest $100$.", litery: "PF", poprawna: 0 },
            { tekst: "Prawdopodobieństwo, że kod składa się z dwóch takich samych cyfr, jest równe $\\frac{1}{10}$.", litery: "PF", poprawna: 0 },
            { tekst: "Prawdopodobieństwo, że kod składa się z dwóch różnych cyfr, jest równe $\\frac{1}{10}$.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 3,
          tresc: "W pudełku jest $6$ kartek ponumerowanych liczbami od $1$ do $6$. Losujemy kolejno dwie kartki, nie odkładając pierwszej z powrotem, i układamy z nich liczbę dwucyfrową (pierwsza kartka to cyfra dziesiątek). Oblicz: a) ile jest wszystkich możliwych liczb, b) prawdopodobieństwo, że liczba będzie parzysta, c) prawdopodobieństwo, że liczba będzie większa od $60$. **Zapisz obliczenia.**",
          rozwiazanie: "a) Pierwszą kartkę wybieramy na $6$ sposobów, drugą z pozostałych $5$: $n=6\\cdot5=30$.\n\nb) Liczba jest parzysta, gdy cyfra jedności jest parzysta: $2$, $4$ albo $6$ – to $3$ sposoby. Cyfrę dziesiątek wybieramy z pozostałych $5$ kartek: $5$ sposobów. Sprzyjających jest $k=5\\cdot3=15$. $P=\\frac{15}{30}=\\frac{1}{2}$.\n\nc) Liczba większa od $60$ ma cyfrę dziesiątek $6$ ($1$ sposób), a cyfrę jedności dowolną z pozostałych $5$ kartek. Sprzyjających jest $1\\cdot5=5$. $P=\\frac{5}{30}=\\frac{1}{6}$.\n\nOdpowiedź: a) $30$, b) $\\frac{1}{2}$, c) $\\frac{1}{6}$.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "Ala, Bartek, Celina i Darek ustawiają się losowo w kolejce. Oblicz prawdopodobieństwo, że: a) Ala będzie pierwsza, b) Ala będzie pierwsza, a Bartek ostatni, c) Ala nie będzie pierwsza. **Zapisz obliczenia.**",
          rozwiazanie: "Wszystkich ustawień jest $n=4\\cdot3\\cdot2\\cdot1=24$.\n\na) Ala pierwsza: pozostałe trzy osoby ustawiamy na $3\\cdot2\\cdot1=6$ sposobów. $P=\\frac{6}{24}=\\frac{1}{4}$.\n\nb) Ala pierwsza i Bartek ostatni: pozostałe dwie osoby ustawiamy na $2\\cdot1=2$ sposoby. $P=\\frac{2}{24}=\\frac{1}{12}$.\n\nc) To zdarzenie przeciwne do a): $P=1-\\frac{1}{4}=\\frac{3}{4}$.\n\nOdpowiedź: a) $\\frac{1}{4}$, b) $\\frac{1}{12}$, c) $\\frac{3}{4}$.",
        },
      ],
      generatory: [
        {
          id: "kod-liczba",
          nazwa: "Kod albo liczba",
          opis: "Losowy kod PIN albo losowa liczba z podanych cyfr – oblicz prawdopodobieństwo, licząc wyniki regułą mnożenia.",
          generuj(r) {
            const typ = r.int(0, 3);
            if (typ === 0) {
              const d = r.int(2, 4);
              const n = 10 ** d;
              return zadanieP(
                `Kod PIN ma $${d}$ cyfry (każda od $0$ do $9$, cyfry mogą się powtarzać). Ktoś wpisuje kod na chybił trafił. Oblicz prawdopodobieństwo, że od razu trafi właściwy kod.`,
                1,
                n,
                [`Wszystkich kodów jest $n = ${razy(Array(d).fill(10))} = ${n}$.`, "Tylko jeden kod jest właściwy, więc $k = 1$."],
              );
            }
            if (typ === 1) {
              const d = r.int(3, 4);
              const n = 10 ** (d - 1);
              return zadanieP(
                `Kod PIN ma $${d}$ cyfry (każda od $0$ do $9$, cyfry mogą się powtarzać). Wiemy, że pierwsza cyfra to $7$. Pozostałe cyfry wpisujemy na chybił trafił. Oblicz prawdopodobieństwo, że od razu trafimy właściwy kod.`,
                1,
                n,
                [`Pierwsza cyfra jest znana, więc wybieramy tylko ${d - 1} cyfry: $n = ${razy(Array(d - 1).fill(10))} = ${n}$.`, "Tylko jeden kod jest właściwy, więc $k = 1$."],
              );
            }
            if (typ === 2) {
              const k = r.int(4, 8);
              const cyfry = Array.from({ length: k }, (_, i) => i + 1);
              const n = k * k;
              const zd = [
                { opis: "obie cyfry będą takie same", ile: k, krok: `Sprzyjają liczby $${cyfry.map((c) => `${c}${c}`).join(", ")}$ – jest ich $${k}$.` },
                { opis: "cyfry będą różne", ile: k * (k - 1), krok: `Cyfrę dziesiątek wybieramy na $${k}$ sposobów, cyfrę jedności na $${k - 1}$: $${k} \\cdot ${k - 1} = ${k * (k - 1)}$.` },
                { opis: "liczba będzie parzysta", ile: k * Math.floor(k / 2), krok: `Cyfra jedności musi być parzysta: $${Math.floor(k / 2)}$ sposobów. Cyfra dziesiątek dowolna: $${k}$ sposobów. $${k} \\cdot ${Math.floor(k / 2)} = ${k * Math.floor(k / 2)}$.` },
              ];
              const z = r.pick(zd);
              return zadanieP(
                `Z cyfr ${lista(cyfry)} układamy liczby dwucyfrowe (cyfry mogą się powtarzać) i losujemy jedną z nich. Oblicz prawdopodobieństwo, że ${z.opis}.`,
                z.ile,
                n,
                [`Wszystkich liczb jest $n = ${k} \\cdot ${k} = ${n}$.`, z.krok],
              );
            }
            const k = r.int(3, 5);
            const cyfry = Array.from({ length: k }, (_, i) => i + 1);
            const n = k ** 3;
            const zd = [
              { opis: "wszystkie trzy cyfry będą takie same", ile: k, krok: `Sprzyjają liczby $${cyfry.map((c) => `${c}${c}${c}`).join(", ")}$ – jest ich $${k}$.` },
              { opis: "wszystkie trzy cyfry będą różne", ile: k * (k - 1) * (k - 2), krok: `Cyfry wybieramy kolejno na $${k}$, $${k - 1}$ i $${k - 2}$ sposobów: $${k} \\cdot ${k - 1} \\cdot ${k - 2} = ${k * (k - 1) * (k - 2)}$.` },
            ];
            const z = r.pick(zd);
            return zadanieP(
              `Z cyfr ${lista(cyfry)} układamy liczby trzycyfrowe (cyfry mogą się powtarzać) i losujemy jedną z nich. Oblicz prawdopodobieństwo, że ${z.opis}.`,
              z.ile,
              n,
              [`Wszystkich liczb jest $n = ${k} \\cdot ${k} \\cdot ${k} = ${n}$.`, z.krok],
            );
          },
        },
        {
          id: "kolejka-losowanie",
          nazwa: "Kolejka i losowanie",
          opis: "Osoby ustawiają się losowo w kolejce albo losujemy kolejno dwie karteczki bez zwracania – oblicz prawdopodobieństwo.",
          generuj(r) {
            if (r.chance()) {
              const m = r.int(3, 5);
              const imiona = OSOBY.slice(0, m);
              const [A, B] = r.shuffle(imiona);
              const n = iloczyn(malej(m));
              const wstep = `${imiona.join(", ")} stają losowo w kolejce.`;
              const typy = ["pierwsza", "nie-pierwsza"];
              if (m >= 4) typy.push("pierwsza-ostatnia");
              const typ = r.pick(typy);
              const kroki = [`Wszystkich ustawień jest $n = ${razy(malej(m))} = ${n}$.`];
              if (typ === "pierwsza") {
                const k = iloczyn(malej(m - 1));
                kroki.push(`Gdy ${A} stoi na pierwszym miejscu, pozostałe $${m - 1}$ osoby ustawiamy na tyle sposobów, ile wynosi $${razy(malej(m - 1))} = ${k}$.`);
                return zadanieP(`${wstep} Oblicz prawdopodobieństwo, że ${A} będzie stać na pierwszym miejscu.`, k, n, kroki);
              }
              if (typ === "nie-pierwsza") {
                const k1 = iloczyn(malej(m - 1));
                kroki.push(`Ustawień, w których ${A} stoi na pierwszym miejscu: $${razy(malej(m - 1))} = ${k1}$.`, `Pozostałe ustawienia sprzyjają zdarzeniu: $${n} - ${k1} = ${n - k1}$.`);
                return zadanieP(`${wstep} Oblicz prawdopodobieństwo, że ${A} nie będzie stać na pierwszym miejscu.`, n - k1, n, kroki);
              }
              const k = iloczyn(malej(m - 2));
              kroki.push(`Gdy ${A} stoi na pierwszym miejscu, a ${B} na ostatnim, pozostałe $${m - 2}$ osoby ustawiamy na tyle sposobów, ile wynosi $${razy(malej(m - 2))} = ${k}$.`);
              return zadanieP(`${wstep} Oblicz prawdopodobieństwo, że ${A} będzie stać na pierwszym miejscu, a ${B} na ostatnim.`, k, n, kroki);
            }
            const N = r.int(5, 8);
            const e = Math.floor(N / 2);
            const o = N - e;
            const rzecz = r.pick(["karteczek", "kartek"]);
            const zd = [
              { opis: "obie wylosowane liczby będą parzyste", k: e * (e - 1), krok: `Pierwsza parzysta: $${e}$ sposobów, druga parzysta (jedna parzysta już wylosowana): $${e - 1}$ sposobów. $k = ${e} \\cdot ${e - 1} = ${e * (e - 1)}$.` },
              { opis: "obie wylosowane liczby będą nieparzyste", k: o * (o - 1), krok: `Pierwsza nieparzysta: $${o}$ sposobów, druga nieparzysta: $${o - 1}$ sposobów. $k = ${o} \\cdot ${o - 1} = ${o * (o - 1)}$.` },
              { opis: "pierwsza wylosowana liczba będzie parzysta, a druga nieparzysta", k: e * o, krok: `Pierwsza parzysta: $${e}$ sposobów, druga nieparzysta: $${o}$ sposobów. $k = ${e} \\cdot ${o} = ${e * o}$.` },
            ];
            const z = r.pick(zd);
            return zadanieP(
              `W pudełku jest $${N}$ ${rzecz} ponumerowanych kolejnymi liczbami od $1$ do $${N}$. Losujemy kolejno dwie, nie odkładając pierwszej z powrotem. Oblicz prawdopodobieństwo, że ${z.opis}.`,
              z.k,
              N * (N - 1),
              [`Pierwszą wybieramy na $${N}$ sposobów, drugą na $${N - 1}$, więc $n = ${N} \\cdot ${N - 1} = ${N * (N - 1)}$.`, `Parzystych jest $${e}$, nieparzystych $${o}$.`, z.krok],
            );
          },
        },
      ],
    },
  ],
};
