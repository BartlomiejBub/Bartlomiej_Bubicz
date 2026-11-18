// Klasa 4 (liceum i technikum) · rozdział 2 „Statystyka. Rachunek prawdopodobieństwa” – Matematyka 4, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Bez rysunków: dane podane w tabelach opisanych tekstem albo listą liczb, drzewka opisane słowami.
// Zgodnie z podstawą programową 2024: bez odchylenia standardowego, skali centylowej i wartości oczekiwanej;
// kombinatoryka bez wzorów na kombinacje i symbolu Newtona (wszystko regułą mnożenia); bez prawdopodobieństwa warunkowego.
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

const sum = (a) => a.reduce((x, y) => x + y, 0);
const plus = (a) => a.join(" + ");

/** Liczby jako osobne $…$ po przecinkach – długa lista łamie się na wąskim ekranie. */
const lista = (a) => a.map((x) => `$${x}$`).join(", ");

/** Poprawna forma rzeczownika po liczebniku: pl(2, "drużyna", "drużyny", "drużyn"). */
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

/** Ostatni krok: P = k/n, a gdy się da, skrócone. */
function krokP(k, n) {
  const w = q(k, n);
  const surowy = `\\frac{${k}}{${n}}`;
  return surowy === w.tex() ? `$P=${surowy}$.` : `$P=${surowy}=${w.tex()}$.`;
}

/** Zadanie z odpowiedzią liczbową. */
const zadanie = (tresc, kroki, v, etykieta, wynikTex) => ({
  tresc,
  pola: [pole("x", etykieta)],
  odpowiedz: { x: v },
  wynik: `$${wynikTex ?? Q.z(v).tex()}$`,
  rozwiazanie: kroki,
});

/** Zadanie z odpowiedzią „prawdopodobieństwo”. */
const zadanieP = (tresc, k, n, kroki) => zadanie(tresc, [...kroki, krokP(k, n)], q(k, n), "$P =$");

const pierwsza = (x) => {
  if (x < 2) return false;
  for (let d = 2; d * d <= x; d++) if (x % d === 0) return false;
  return true;
};
const kwadrat = (x) => Number.isInteger(Math.sqrt(x));

/** Kolory kul: mianownik liczby pojedynczej i dopełniacz liczby mnogiej („białych jest 5”). */
const KOLORY = [
  { sg: "biała", gen: "białych" },
  { sg: "czerwona", gen: "czerwonych" },
  { sg: "zielona", gen: "zielonych" },
  { sg: "niebieska", gen: "niebieskich" },
  { sg: "żółta", gen: "żółtych" },
];

const KONTEKSTY = [
  ["Liczba punktów zdobytych w teście przez kolejne osoby", 1, 20],
  ["Czas dojazdu do szkoły (w minutach) w kolejnych dniach", 8, 30],
  ["Ceny zeszytu (w złotych) w kolejnych sklepach", 2, 15],
  ["Liczba goli strzelonych przez drużynę w kolejnych meczach", 0, 6],
];

/** Wszystkie 36 wyników rzutu dwiema kostkami jako pary (pierwsza, druga). */
const PARY = [];
for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) PARY.push([a, b]);

/** Warunki dla dwóch kostek: treść do zdania „…, że ${t}” i funkcja f(a, b). */
const WARUNKI_KOSTEK = [
  ...[4, 5, 7, 9, 10].map((s) => ({ t: `suma oczek jest równa $${s}$`, f: (a, b) => a + b === s })),
  ...[10, 11].map((s) => ({ t: `suma oczek wynosi co najmniej $${s}$`, f: (a, b) => a + b >= s })),
  ...[3, 4].map((s) => ({ t: `suma oczek wynosi co najwyżej $${s}$`, f: (a, b) => a + b <= s })),
  { t: "suma oczek jest podzielna przez $3$", f: (a, b) => (a + b) % 3 === 0 },
  { t: "suma oczek jest liczbą parzystą", f: (a, b) => (a + b) % 2 === 0 },
  { t: "suma oczek jest liczbą pierwszą", f: (a, b) => pierwsza(a + b) },
  { t: "iloczyn oczek jest liczbą nieparzystą", f: (a, b) => (a * b) % 2 === 1 },
  { t: "iloczyn oczek jest liczbą parzystą", f: (a, b) => (a * b) % 2 === 0 },
  ...[6, 12].map((p) => ({ t: `iloczyn oczek jest równy $${p}$`, f: (a, b) => a * b === p })),
  { t: "na obu kostkach wypadła ta sama liczba oczek", f: (a, b) => a === b },
  { t: "na obu kostkach wypadła parzysta liczba oczek", f: (a, b) => a % 2 === 0 && b % 2 === 0 },
  { t: "na obu kostkach wypadła liczba pierwsza", f: (a, b) => pierwsza(a) && pierwsza(b) },
  { t: "na pierwszej kostce wypadło więcej oczek niż na drugiej", f: (a, b) => a > b },
  ...[2, 3, 4].map((d) => ({ t: `liczby oczek na kostkach różnią się o $${d}$`, f: (a, b) => Math.abs(a - b) === d })),
  { t: "jedna z liczb oczek jest dwa razy większa od drugiej", f: (a, b) => a === 2 * b || b === 2 * a },
];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Dane i średnia
    {
      id: "dane-srednia",
      nazwa: "Prezentowanie danych. Średnia z próby",
      sciaga: [
        {
          nazwa: "Tabela liczności i diagram",
          slownie: "Dane zapisujemy w tabeli: obok każdej wartości piszemy, ile razy wystąpiła (to jej liczność). Na diagramie słupkowym wysokość słupka to liczność, a na kołowym kąt wycinka jest proporcjonalny do liczności – całe koło to wszystkie dane.",
          tex: "\\alpha=\\frac{n_i}{n}\\cdot360^\\circ\\qquad p=\\frac{n_i}{n}\\cdot100\\%",
          litery: "$n_i$ – liczność jednej wartości, $n$ – liczba wszystkich danych, $\\alpha$ – kąt wycinka, $p$ – jaki procent danych.",
          przyklad: "Wśród $40$ uczniów $10$ jeździ do szkoły rowerem. Kąt wycinka: $\\frac{10}{40}\\cdot360^\\circ=90^\\circ$, czyli $25\\%$ uczniów.",
          uwaga: "Sprawdź, czy liczności dają razem $n$, a kąty wszystkich wycinków razem $360^\\circ$.",
        },
        {
          nazwa: "Średnia arytmetyczna",
          slownie: "Dodajemy wszystkie dane i dzielimy sumę przez liczbę danych. Średnia mówi, ile wynosiłaby każda dana, gdyby wszystkie były równe.",
          tex: "\\bar{x}=\\frac{x_1+x_2+\\ldots+x_n}{n}",
          litery: "$x_1, x_2, \\ldots, x_n$ – dane, $n$ – ich liczba, $\\bar{x}$ – średnia.",
          przyklad: "Dane: $2, 5, 4, 3, 6$. Suma $=20$, danych jest $5$, więc $\\bar{x}=\\frac{20}{5}=4$.",
          uwaga: "Dzielimy przez liczbę wszystkich danych (także powtarzających się), a nie przez liczbę różnych wartości.",
        },
        {
          nazwa: "Średnia z tabeli (ważona)",
          slownie: "Gdy wartość występuje kilka razy (albo ma wagę), mnożymy ją przez jej liczność (wagę), dodajemy iloczyny i dzielimy przez sumę liczności (wag).",
          tex: "\\bar{x}=\\frac{x_1n_1+x_2n_2+\\ldots+x_kn_k}{n_1+n_2+\\ldots+n_k}",
          litery: "$x_i$ – wartość (np. ocena), $n_i$ – jej liczność albo waga.",
          przyklad: "Ocena $3$ wystąpiła $2$ razy, a ocena $5$ wystąpiła $3$ razy. $\\bar{x}=\\frac{3\\cdot2+5\\cdot3}{2+3}=\\frac{21}{5}=4{,}2$.",
          uwaga: "Dzielimy przez sumę liczności (wag), a nie przez liczbę różnych wartości.",
        },
        {
          nazwa: "Brakująca dana",
          slownie: "Gdy znasz średnią, to znasz sumę wszystkich danych: średnia razy liczba danych. Od tej sumy odejmij dane, które już masz.",
          tex: "x_1+\\ldots+x_n=n\\cdot\\bar{x}",
          litery: "$n$ – liczba wszystkich danych (razem z brakującą), $\\bar{x}$ – średnia.",
          przyklad: "Średnia z $4$ wyników to $5$, trzy wyniki to $3, 4, 6$. Suma wszystkich: $4\\cdot5=20$, znane: $13$, brakuje $20-13=7$.",
          uwaga: "Liczba danych w $n\\cdot\\bar{x}$ obejmuje też brakującą daną.",
        },
      ],
      jak: [
        "Zapisz wszystkie dane (albo odczytaj je z tabeli lub opisu diagramu).",
        "Przy tabeli pomnóż każdą wartość przez jej liczność (wagę) i dodaj iloczyny.",
        "Podziel sumę przez liczbę danych (przy tabeli: przez sumę liczności).",
        "Gdy brakuje jednej danej, najpierw policz sumę ze wzoru $n\\cdot\\bar{x}$, a potem odejmij dane, które znasz.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Wyniki sześciu rzutów kostką: $2, 5, 3, 6, 4, 4$. Jaka jest średnia arytmetyczna tych wyników? **Wybierz właściwą odpowiedź.**",
          opcje: ["$24$", "$4$", "$4{,}8$", "$3{,}5$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Tabela podaje liczbę uczniów, którzy dostali daną ocenę ze sprawdzianu (ocena – liczba uczniów): $2$ – $3$, $3$ – $5$, $4$ – $6$, $5$ – $4$, $6$ – $2$. Jaka jest średnia ocen z tego sprawdzianu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$15{,}4$", "$3{,}85$", "$77$"],
          poprawna: 2,
        },
        {
          nr: "3",
          tresc: "Diagram kołowy przedstawia sposób dojazdu do szkoły. Wszystkich badanych było $40$, a wycinek „autobus” ma kąt $135^\\circ$. Ilu badanych jeździ autobusem? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$", "$25$", "$135$", "$15$"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "Średnia arytmetyczna czterech wyników testu jest równa $7$ punktów. Trzy z tych wyników to $6$, $9$ i $5$ punktów. Ile punktów wynosi czwarty wynik? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$", "$7$", "$28$", "$20$"],
          poprawna: 0,
        },
        {
          nr: "5",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Jeśli każdą z danych zwiększymy o $3$, to średnia arytmetyczna też zwiększy się o $3$.", litery: "PF", poprawna: 0 },
            { tekst: "Średnia arytmetyczna liczb $1, 2, 3, 10$ jest równa $3$.", litery: "PF", poprawna: 1 },
            { tekst: "Dwie piątki i jedna dwójka dają średnią ocen równą $4$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "W klasie zapytano uczniów o liczbę rodzeństwa. Wyniki (liczba rodzeństwa – liczba uczniów): $0$ – $4$, $1$ – $8$, $2$ – $6$, $3$ – $2$. Oblicz średnią liczbę rodzeństwa przypadającą na jednego ucznia oraz jaki procent uczniów ma dokładnie jedno rodzeństwo. **Zapisz obliczenia.**",
          rozwiazanie: "Liczba uczniów: $n=4+8+6+2=20$.\n\nSuma liczb rodzeństwa: $0\\cdot4+1\\cdot8+2\\cdot6+3\\cdot2=0+8+12+6=26$.\n\nŚrednia: $\\bar{x}=\\frac{26}{20}=1{,}3$.\n\nDokładnie jedno rodzeństwo ma $8$ uczniów, czyli $\\frac{8}{20}\\cdot100\\%=40\\%$.\n\nOdpowiedź: Średnio jest $1{,}3$ rodzeństwa na ucznia, a jedno rodzeństwo ma $40\\%$ uczniów.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Ocena końcowa z matematyki jest średnią ważoną: ocena ze sprawdzianu ma wagę $3$, z kartkówki wagę $2$, a z aktywności wagę $1$. Olek dostał ze sprawdzianu $4$, z kartkówki $5$, a z aktywności $6$. Oblicz jego średnią ważoną i rozstrzygnij, czy jest ona co najmniej równa $4{,}5$. **Zapisz obliczenia.**",
          rozwiazanie: "Licznik: $4\\cdot3+5\\cdot2+6\\cdot1=12+10+6=28$.\n\nMianownik (suma wag): $3+2+1=6$.\n\nŚrednia ważona: $\\frac{28}{6}=\\frac{14}{3}=4\\frac{2}{3}$.\n\nPorównanie: $\\frac{28}{6}>\\frac{27}{6}=4{,}5$.\n\nOdpowiedź: Średnia ważona Olka to $4\\frac{2}{3}$, więc jest większa niż $4{,}5$.",
        },
      ],
      generatory: [
        {
          id: "srednia-z-danych",
          nazwa: "Średnia z danych",
          opis: "Średnia arytmetyczna z listy liczb, średnia z tabeli (liczności albo wagi) albo brakujący wynik przy znanej średniej.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const [opis, lo, hi] = r.pick(KONTEKSTY);
              const n = r.pick([4, 5, 8, 10]);
              const d = Array.from({ length: n }, () => r.int(lo, hi));
              const S = sum(d);
              const v = q(S, n);
              return zadanie(
                `${opis}: ${lista(d)}. Oblicz średnią arytmetyczną tych liczb. Wynik wpisz jako liczbę (może być dziesiętna).`,
                [`Suma liczb: $${plus(d)}=${S}$.`, `Liczb jest $${n}$, więc średnia to $\\frac{${S}}{${n}}=${dec(v)}$.`],
                v, "Średnia $=$", dec(v),
              );
            }
            if (tryb === 1) {
              const k = r.int(3, 4);
              const w = r.shuffle([2, 3, 4, 5, 6]).slice(0, k).sort((a, b) => a - b);
              const n = r.pick([4, 5, 8, 10]);
              const c = w.map(() => 1);
              for (let i = 0; i < n - k; i++) c[r.int(0, k - 1)]++;
              const S = sum(w.map((x, i) => x * c[i]));
              const v = q(S, n);
              const pary = w.map((x, i) => `$${x}$ – $${c[i]}$`).join(", ");
              const wagi = r.chance();
              const tresc = wagi
                ? `Ocena końcowa jest średnią ważoną. Oceny cząstkowe i ich wagi (ocena – waga): ${pary}. Oblicz średnią ważoną. Wynik wpisz jako liczbę (może być dziesiętna).`
                : `Liczba uczniów, którzy dostali daną ocenę ze sprawdzianu (ocena – liczba uczniów): ${pary}. Oblicz średnią ocen. Wynik wpisz jako liczbę (może być dziesiętna).`;
              return zadanie(
                tresc,
                [
                  `Licznik: $${w.map((x, i) => `${x}\\cdot${c[i]}`).join(" + ")}=${S}$.`,
                  `Mianownik – suma ${wagi ? "wag" : "liczności"}: $${plus(c)}=${n}$.`,
                  `Średnia: $\\frac{${S}}{${n}}=${dec(v)}$.`,
                ],
                v, "Średnia $=$", dec(v),
              );
            }
            const n = r.pick([4, 5]);
            const m = r.int(4, 8);
            const { znane, brak } = probuj(() => {
              const znane = Array.from({ length: n - 1 }, () => r.int(1, 10));
              const brak = n * m - sum(znane);
              return brak >= 1 && brak <= 10 ? { znane, brak } : null;
            });
            return zadanie(
              `Średnia arytmetyczna ${n === 4 ? "czterech" : "pięciu"} wyników testu (w punktach) jest równa $${m}$. ${n === 4 ? "Trzy" : "Cztery"} z nich to: ${lista(znane)}. Jaki jest brakujący wynik?`,
              [
                `Suma wszystkich wyników: $${n}\\cdot${m}=${n * m}$.`,
                `Suma znanych wyników: $${plus(znane)}=${sum(znane)}$.`,
                `Brakujący wynik: $${n * m}-${sum(znane)}=${brak}$.`,
              ],
              q(brak), "Brakujący wynik $=$",
            );
          },
        },
        {
          id: "diagram-kolowy",
          nazwa: "Diagram kołowy",
          opis: "Kąt wycinka koła dla danej liczby badanych albo liczba badanych dla danego kąta.",
          generuj(r) {
            const N = r.pick([20, 24, 30, 36, 40, 45, 60]);
            const temat = r.pick([
              { co: "sposób dojazdu do szkoły", kat: ["autobus", "rower", "pieszo", "samochód"] },
              { co: "ulubiony przedmiot", kat: ["matematyka", "informatyka", "wychowanie fizyczne", "język polski"] },
              { co: "ulubiony sposób spędzania wolnego czasu", kat: ["sport", "muzyka", "czytanie", "gry komputerowe"] },
            ]);
            const kat = r.pick(temat.kat);
            const k = r.int(2, Math.floor(N / 2));
            const jeden = 360 / N;
            const alfa = k * jeden;
            const start = `W badaniu ankietowym zapytano o ${temat.co}; wszystkich badanych było $${N}$. Wyniki przedstawiono na diagramie kołowym.`;
            const krokJeden = `Całe koło ma $360^\\circ$ i odpowiada $${N}$ badanym, więc jednemu badanemu odpowiada $360^\\circ:${N}=${jeden}^\\circ$.`;
            if (r.chance()) {
              return zadanie(
                `${start} Liczba badanych, którzy wybrali odpowiedź „${kat}”, jest równa $${k}$. Jaką miarę (w stopniach) ma kąt wycinka koła odpowiadającego tej odpowiedzi?`,
                [krokJeden, `Wycinek: $${k}\\cdot${jeden}^\\circ=${alfa}^\\circ$.`],
                q(alfa), "Kąt w stopniach $=$", `${alfa}^\\circ`,
              );
            }
            return zadanie(
              `${start} Wycinek koła odpowiadający odpowiedzi „${kat}” ma kąt $${alfa}^\\circ$. Ile osób wybrało tę odpowiedź?`,
              [krokJeden, `Liczba osób: $${alfa}:${jeden}=${k}$.`],
              q(k), "Liczba osób $=$",
            );
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Mediana i moda
    {
      id: "mediana-moda",
      nazwa: "Mediana i moda z próby",
      sciaga: [
        {
          nazwa: "Mediana – nieparzysta liczba danych",
          slownie: "Dane porządkujemy rosnąco. Gdy jest ich nieparzyście wiele, mediana to liczba stojąca dokładnie w środku.",
          tex: "\\text{Me}=x_{\\frac{n+1}{2}}",
          litery: "$n$ – liczba danych, $x_{\\frac{n+1}{2}}$ – dana na miejscu $\\frac{n+1}{2}$ po uporządkowaniu.",
          przyklad: "Dane: $7, 2, 9, 4, 5$. Po uporządkowaniu: $2, 4, 5, 7, 9$. Danych jest $5$, więc mediana jest na $3.$ miejscu: $\\text{Me}=5$.",
          uwaga: "Najpierw uporządkuj dane! Środkowa liczba z listy nieuporządkowanej to nie mediana.",
        },
        {
          nazwa: "Mediana – parzysta liczba danych",
          slownie: "Gdy danych jest parzyście wiele, po uporządkowaniu są dwie środkowe liczby. Mediana to ich średnia arytmetyczna.",
          tex: "\\text{Me}=\\frac{a+b}{2}",
          litery: "$a$, $b$ – dwie środkowe dane po uporządkowaniu.",
          przyklad: "Dane: $3, 4, 4, 5, 6, 9$ ($6$ danych). Środkowe to $4$ (na $3.$ miejscu) i $5$ (na $4.$ miejscu), więc $\\text{Me}=\\frac{4+5}{2}=4{,}5$.",
          uwaga: "Mediana nie musi być jedną z danych. Dla parzystej liczby danych często jest ich średnią.",
        },
        {
          nazwa: "Moda (dominanta)",
          slownie: "Moda to wartość, która występuje najczęściej. Jeśli kilka wartości ma tę samą największą liczność, moda jest kilka. Gdy wszystkie wartości występują tyle samo razy (np. wszystkie są różne), moda nie istnieje.",
          litery: "Moda to wartość (nie jej liczność).",
          przyklad: "Dane: $2, 3, 3, 5, 3, 2$. Wartość $3$ występuje $3$ razy, $2$ występuje $2$ razy, $5$ raz. Moda to $3$. W danych $4, 4, 7, 7, 9$ są dwie mody: $4$ i $7$. W danych $1, 2, 3$ mody nie ma.",
          uwaga: "Moda to wartość, która się powtarza najczęściej (tu $3$), a nie liczba jej wystąpień (tu $3$ razy).",
        },
        {
          nazwa: "Mediana a średnia",
          slownie: "Jedna bardzo duża albo bardzo mała dana mocno zmienia średnią, ale prawie nie zmienia mediany. Dlatego przy danych z wartościami skrajnymi mediana lepiej opisuje typową wartość.",
          przyklad: "Dane: $2, 3, 3, 4, 18$. Średnia to $\\frac{30}{5}=6$, a mediana to $3$. Liczba $18$ podniosła średnią, a medianę zostawiła bez zmian.",
          uwaga: "Średnia nie musi być równa medianie, nawet gdy dane są podobne.",
        },
      ],
      jak: [
        "Uporządkuj dane rosnąco (przy tabeli rozpisz wszystkie dane według liczności).",
        "Policz, ile jest danych: nieparzyście wiele – bierz środkową; parzyście wiele – średnią dwóch środkowych.",
        "Modę znajdź, zliczając wystąpienia każdej wartości. Sprawdź, czy największa liczność nie powtarza się u kilku wartości.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Jaka jest mediana liczb $9, 3, 7, 1, 4$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$4{,}8$", "$4$", "$3{,}5$"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Wyniki skoku w dal (w metrach) sześciu zawodników to: $6, 3, 9, 4, 5, 4$. Jaka jest mediana tych wyników? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4{,}5$", "$4$", "$5$", "$5{,}5$"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "W tabeli podano rozmiary butów uczniów jednej klasy (rozmiar – liczba osób): $38$ – $4$, $39$ – $7$, $40$ – $7$, $41$ – $2$. Jaka jest moda rozmiarów butów w tej klasie? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$39$ i $40$", "$40$", "$39$"],
          poprawna: 1,
        },
        {
          nr: "11",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Dla liczb $2, 7, 7, 9$ mediana jest równa $7$.", litery: "PF", poprawna: 0 },
            { tekst: "Dla liczb $1, 2, 3, 4$ mediana jest równa $2$.", litery: "PF", poprawna: 1 },
            { tekst: "Zestaw liczb $1, 2, 3, 4, 5$ nie ma mody.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "12",
          tresc: "Do zestawu liczb $2, 5, 7, 8, 8$ dopisano liczbę $100$. Jak zmieniła się mediana? **Wybierz właściwą odpowiedź.**",
          opcje: ["Nie zmieniła się.", "Wzrosła o $93$.", "Wzrosła o $1$.", "Wzrosła o $0{,}5$."],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Dziesięcioro uczniów zapisało, ile minut zajęło im odrobienie pracy domowej: $15, 20, 10, 25, 20, 30, 15, 20, 45, 10$. Oblicz średnią, medianę i modę tych danych. **Zapisz obliczenia.**",
          rozwiazanie: "Średnia: suma to $15+20+10+25+20+30+15+20+45+10=210$, danych jest $10$, więc $\\bar{x}=\\frac{210}{10}=21$.\n\nMediana: po uporządkowaniu mamy $10, 10, 15, 15, 20, 20, 20, 25, 30, 45$. Danych jest $10$ (parzyście wiele), środkowe to $5.$ i $6.$ liczba, czyli $20$ i $20$. $\\text{Me}=\\frac{20+20}{2}=20$.\n\nModa: liczba $20$ występuje $3$ razy, $10$ i $15$ po $2$ razy, pozostałe raz. Moda to $20$.\n\nOdpowiedź: średnia $21$ minut, mediana $20$ minut, moda $20$ minut.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Dane są trzy liczby: $4, 8, 6$. Jaką liczbę należy do nich dopisać, aby mediana czterech liczb była równa $7$? Podaj wszystkie takie liczby. **Zapisz obliczenia.**",
          rozwiazanie: "Trzy liczby po uporządkowaniu: $4, 6, 8$. Dopisaną liczbę oznaczmy $x$. Dla czterech liczb mediana to średnia dwóch środkowych liczb. Rozważamy, gdzie po uporządkowaniu stanie $x$.\n\nGdy $x\\le4$: kolejność $x, 4, 6, 8$, środkowe $4$ i $6$, mediana $5$. Nie pasuje.\n\nGdy $4<x<6$: kolejność $4, x, 6, 8$, środkowe $x$ i $6$. Z równania $\\frac{x+6}{2}=7$ mamy $x=8$, co jest sprzeczne z $x<6$. Nie pasuje.\n\nGdy $6\\le x\\le8$: kolejność $4, 6, x, 8$, środkowe $6$ i $x$. Z równania $\\frac{6+x}{2}=7$ mamy $x=8$. Pasuje: $4, 6, 8, 8$ ma medianę $\\frac{6+8}{2}=7$.\n\nGdy $x>8$: kolejność $4, 6, 8, x$, środkowe $6$ i $8$, mediana $\\frac{6+8}{2}=7$. Pasuje każde takie $x$.\n\nOdpowiedź: Mediana jest równa $7$ dla każdej dopisanej liczby większej lub równej $8$.",
        },
      ],
      generatory: [
        {
          id: "mediana-danych",
          nazwa: "Mediana danych",
          opis: "Mediana z listy liczb (nieparzysta albo parzysta liczba danych) albo z tabeli liczności.",
          generuj(r) {
            const tryb = r.int(0, 2);
            let s, n, kroki, start;
            if (tryb < 2) {
              const [opis, lo, hi] = r.pick(KONTEKSTY);
              n = tryb === 0 ? r.pick([5, 7, 9]) : r.pick([6, 8, 10]);
              const d = Array.from({ length: n }, () => r.int(Math.max(lo, 1), hi + 5));
              s = [...d].sort((a, b) => a - b);
              start = `${opis}: ${lista(d)}. Wyznacz medianę tych liczb. Wynik wpisz jako liczbę (może być dziesiętna).`;
              kroki = [`Porządkujemy rosnąco: ${lista(s)}.`];
            } else {
              const k = r.int(3, 5);
              const w = r.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, k).sort((a, b) => a - b);
              const c = probuj(() => {
                const c = w.map(() => r.int(1, 4));
                return sum(c) >= 7 && sum(c) <= 12 ? c : null;
              });
              s = w.flatMap((x, i) => Array(c[i]).fill(x));
              n = s.length;
              start = `Dane przedstawiono w tabeli (wartość – liczność): ${w.map((x, i) => `$${x}$ – $${c[i]}$`).join(", ")}. Wyznacz medianę tych danych. Wynik wpisz jako liczbę (może być dziesiętna).`;
              kroki = [`Danych jest $${plus(c)}=${n}$. Wypisujemy je rosnąco: ${lista(s)}.`];
            }
            let v;
            if (n % 2 === 1) {
              v = q(s[(n - 1) / 2]);
              kroki.push(`Danych jest $${n}$ (nieparzyście wiele), więc mediana to liczba środkowa, czyli ${(n + 1) / 2}. liczba: $${dec(v)}$.`);
            } else {
              const a = s[n / 2 - 1], b = s[n / 2];
              v = q(a + b, 2);
              kroki.push(`Danych jest $${n}$ (parzyście wiele), więc mediana to średnia dwóch środkowych liczb (${n / 2}. i ${n / 2 + 1}.): $\\frac{${a}+${b}}{2}=${dec(v)}$.`);
            }
            return zadanie(start, kroki, v, "Mediana $=$", dec(v));
          },
        },
        {
          id: "moda-danych",
          nazwa: "Moda danych",
          opis: "Moda zestawu liczb albo liczba jej wystąpień.",
          generuj(r) {
            const { w, c, d } = probuj(() => {
              const m = r.int(4, 6);
              const w = r.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, m).sort((a, b) => a - b);
              const c = w.map(() => r.int(1, 5));
              const max = Math.max(...c);
              if (c.filter((x) => x === max).length !== 1 || sum(c) < 8 || sum(c) > 14) return null;
              const d = r.shuffle(w.flatMap((x, i) => Array(c[i]).fill(x)));
              return { w, c, d };
            });
            const max = Math.max(...c);
            const moda = w[c.indexOf(max)];
            const zlicz = w.map((x, i) => `$${x}$: $${c[i]}$`).join(", ");
            const kroki = [
              `Zliczamy wystąpienia (wartość: liczność): ${zlicz}.`,
              `Największą liczność, równą $${max}$, ma wartość $${moda}$.`,
            ];
            if (r.chance()) {
              return zadanie(`W zestawie liczb ${lista(d)} jest dokładnie jedna moda. Podaj tę modę.`, [...kroki, `Moda to $${moda}$.`], q(moda), "Moda $=$");
            }
            return zadanie(`W zestawie liczb ${lista(d)} jest dokładnie jedna moda. Ile razy występuje w nim moda?`, [...kroki, `Moda występuje $${max}$ razy w tym zestawie.`], q(max), "Liczba wystąpień $=$");
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Kombinatoryka
    {
      id: "kombinatoryka",
      nazwa: "Kombinatoryka – powtórzenie",
      sciaga: [
        {
          nazwa: "Reguła mnożenia",
          slownie: "Gdy wybór składa się z kilku kroków wykonywanych kolejno (to i to), liczby możliwości w kolejnych krokach mnożymy.",
          tex: "n_1\\cdot n_2\\cdot\\ldots\\cdot n_k",
          litery: "$n_1, n_2, \\ldots$ – liczby możliwości w kolejnych krokach.",
          przyklad: "Kod: jedna litera z $3$ liter i dwie cyfry (mogą się powtarzać). Kodów jest $3\\cdot10\\cdot10=300$.",
          uwaga: "Jeśli czegoś nie wolno powtórzyć, w następnym kroku jest o jedną możliwość mniej.",
        },
        {
          nazwa: "Reguła dodawania",
          slownie: "Gdy mamy kilka przypadków, które się wykluczają (to albo to), liczby możliwości z przypadków dodajemy.",
          tex: "|A\\cup B|=|A|+|B|",
          litery: "$|A|$ – liczba możliwości w przypadku $A$, a $|B|$ – w przypadku $B$ (przypadki nie mają wspólnych możliwości).",
          przyklad: "Z miasta do miasta jadą $3$ autobusy albo $2$ pociągi. Wybierzemy pojazd na $3+2=5$ sposobów.",
          uwaga: "„i” – mnożymy, „albo” – dodajemy. Gdy przypadki mają wspólne możliwości, wspólne policz tylko raz.",
        },
        {
          nazwa: "Permutacje",
          slownie: "Ustawienie $n$ różnych elementów w rzędzie to permutacja. Pierwszy element wybieramy na $n$ sposobów, drugi na $n-1$, i tak dalej.",
          tex: "n!=n\\cdot(n-1)\\cdot\\ldots\\cdot1\\qquad3!=6\\qquad4!=24\\qquad5!=120",
          litery: "$n!$ czytamy „$n$ silnia”.",
          przyklad: "Cztery osoby w kolejce można ustawić na $4!=4\\cdot3\\cdot2\\cdot1=24$ sposobów.",
          uwaga: "Silnia rośnie bardzo szybko: $6!=720$.",
        },
        {
          nazwa: "Wybór bez uwzględniania kolejności",
          slownie: "Gdy kolejność nie ma znaczenia (para, drużyna), najpierw policz wybory z kolejnością, a potem podziel przez liczbę ustawień tych samych elementów.",
          tex: "\\frac{n(n-1)}{2}\\qquad\\frac{n(n-1)(n-2)}{6}",
          litery: "$n$ – liczba wszystkich elementów; pierwszy wzór dla pary, drugi dla trójki.",
          przyklad: "Z $5$ osób wybieramy parę: kolejno $5\\cdot4=20$, ale każda para liczy się dwa razy, więc par jest $\\frac{20}{2}=10$.",
          uwaga: "Dla trójki dzielimy przez $3!=6$, bo każdą trójkę można ustawić na $6$ sposobów.",
        },
        {
          nazwa: "Liczby z cyfr – warunki",
          slownie: "Gdy jest warunek (liczba parzysta, pierwsza cyfra nie jest zerem), zaczynamy od kroku z ograniczeniem. Cyfry mogą się powtarzać albo nie, zależnie od treści.",
          litery: "Liczba parzysta kończy się cyfrą $0, 2, 4, 6$ lub $8$.",
          przyklad: "Liczby trzycyfrowe parzyste z cyfr $1, 2, 3, 4$ (mogą się powtarzać): ostatnia cyfra na $2$ sposoby ($2$ albo $4$), pozostałe po $4$: $4\\cdot4\\cdot2=32$.",
          uwaga: "Przy cyfrze $0$ w zestawie na pierwszym miejscu nie może stać $0$.",
        },
      ],
      jak: [
        "Rozpisz, z jakich kroków składa się wybór. Zacznij od kroku z ograniczeniem (np. ostatnia cyfra parzysta).",
        "Dla każdego kroku policz możliwości, pamiętając, co już zostało użyte.",
        "Kroki po kolei (i) – mnóż; osobne przypadki (albo) – dodawaj.",
        "Gdy kolejność nie ma znaczenia, podziel przez liczbę ustawień tego samego wyboru.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Z cyfr $1, 2, 3, 4, 5$ tworzymy liczby trzycyfrowe o różnych cyfrach. Ile jest takich liczb? **Wybierz właściwą odpowiedź.**",
          opcje: ["$15$", "$125$", "$60$", "$10$"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "W bibliotece jest $7$ różnych powieści historycznych i $5$ różnych powieści fantasy. Na ile sposobów można wybrać jedną powieść do wypożyczenia? **Wybierz właściwą odpowiedź.**",
          opcje: ["$35$", "$12$", "$2$", "$7$"],
          poprawna: 1,
        },
        {
          nr: "17",
          tresc: "Na półce stoi w jednym rzędzie $5$ różnych książek. Na ile sposobów można je ustawić? **Wybierz właściwą odpowiedź.**",
          opcje: ["$24$", "$25$", "$5$", "$120$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "W turnieju szachowym gra $6$ zawodników, każdy z każdym dokładnie jedną partię. Ile partii zostanie rozegranych? **Wybierz właściwą odpowiedź.**",
          opcje: ["$15$", "$30$", "$36$", "$21$"],
          poprawna: 0,
        },
        {
          nr: "19",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Liczb trzycyfrowych podzielnych przez $5$ jest $180$.", litery: "PF", poprawna: 0 },
            { tekst: "Liczb dwucyfrowych o różnych cyfrach jest $90$.", litery: "PF", poprawna: 1 },
            { tekst: "Trzy osoby można ustawić w rzędzie na $9$ sposobów.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 3,
          tresc: "Z cyfr $0, 1, 2, 3, 4$ tworzymy liczby trzycyfrowe o różnych cyfrach. a) Ile jest wszystkich takich liczb? b) Ile z nich jest parzystych? **Zapisz obliczenia.**",
          rozwiazanie: "a) Cyfrą setek nie może być $0$: $4$ możliwości. Cyfrę dziesiątek wybieramy spośród $4$ pozostałych cyfr (może być $0$): $4$ możliwości. Cyfrę jedności spośród $3$ pozostałych: $3$ możliwości. Liczb jest $4\\cdot4\\cdot3=48$.\n\nb) Liczba jest parzysta, gdy kończy się cyfrą $0$, $2$ albo $4$. Rozważamy przypadki.\n\nOstatnia cyfra $0$: cyfra setek na $4$ sposoby, dziesiątek na $3$ sposoby, razem $4\\cdot3=12$.\n\nOstatnia cyfra $2$ albo $4$ (dwie możliwości): cyfra setek nie jest $0$ ani cyfrą jedności, więc $3$ możliwości; cyfra dziesiątek spośród $3$ pozostałych: $3$ możliwości. Razem $2\\cdot3\\cdot3=18$.\n\nPrzypadki się wykluczają, więc dodajemy: $12+18=30$.\n\nOdpowiedź: a) $48$ liczb, b) $30$ liczb parzystych.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Do konkursu zgłosiło się $5$ chłopców i $4$ dziewczęta. Na ile sposobów można wybrać dwie osoby (kolejność nie ma znaczenia): a) dowolne, b) chłopca i dziewczynę, c) dwie osoby tej samej płci? **Zapisz obliczenia.**",
          rozwiazanie: "a) Wszystkich osób jest $9$. Kolejno: $9\\cdot8=72$, a każda para liczy się dwa razy, więc par jest $\\frac{72}{2}=36$.\n\nb) Chłopca wybieramy na $5$ sposobów, dziewczynę na $4$: $5\\cdot4=20$ (tu kolejność jest narzucona: chłopiec, dziewczyna).\n\nc) Dwóch chłopców: $\\frac{5\\cdot4}{2}=10$. Dwie dziewczyny: $\\frac{4\\cdot3}{2}=6$. Przypadki się wykluczają, więc $10+6=16$.\n\nSprawdzenie: $20+16=36$, czyli tyle, ile w punkcie a).\n\nOdpowiedź: a) $36$, b) $20$, c) $16$ sposobów.",
        },
      ],
      generatory: [
        {
          id: "reguly-zliczania",
          nazwa: "Reguły zliczania",
          opis: "Reguła mnożenia i dodawania: zestawy, kody, drogi, liczby z cyfr.",
          generuj(r) {
            const tryb = r.int(0, 4);
            if (tryb === 0) {
              const a = r.int(2, 6), b = r.int(2, 5), c = r.int(2, 4);
              return zadanie(
                `Do wyboru są: koszulki w $${a}$ wzorach, spodnie w $${b}$ wzorach i buty w $${c}$ wzorach. Zestaw składa się z jednej koszulki, jednych spodni i jednej pary butów. Ile jest różnych zestawów?`,
                [`Trzy kroki: koszulka ($${a}$ możliwości), spodnie ($${b}$), buty ($${c}$).`, `Mnożymy: $${a}\\cdot${b}\\cdot${c}=${a * b * c}$.`],
                q(a * b * c), "Liczba zestawów $=$",
              );
            }
            if (tryb === 1) {
              const m = r.int(3, 9), d = r.pick([2, 3]);
              const w = m * 10 ** d;
              return zadanie(
                `Kod składa się z jednej litery wybranej spośród $${m}$ liter oraz z ${d === 2 ? "dwóch" : "trzech"} cyfr (cyfry mogą się powtarzać). Ile jest różnych kodów?`,
                [`Litera: $${m}$ możliwości. Każda cyfra: $10$ możliwości.`, `Mnożymy: $${m}\\cdot${Array(d).fill(10).join("\\cdot")}=${w}$.`],
                q(w), "Liczba kodów $=$",
              );
            }
            if (tryb === 2) {
              const a = r.int(2, 6), b = r.int(2, 6), c = r.int(2, 6);
              const w = a * b + c;
              return zadanie(
                `Dróg z miasta A do miasta B bezpośrednio jest $${c}$. Dróg z A do C jest $${a}$, a z C do B jest $${b}$. Na ile sposobów można dojechać z A do B (bezpośrednio albo przez C)?`,
                [`Przez C: najpierw z A do C ($${a}$), potem z C do B ($${b}$): $${a}\\cdot${b}=${a * b}$.`, `Bezpośrednio: $${c}$. Przypadki się wykluczają, więc dodajemy: $${a * b}+${c}=${w}$.`],
                q(w), "Liczba sposobów $=$",
              );
            }
            if (tryb === 3) {
              const m = r.int(4, 6), k = r.int(2, 3), ruznych = r.chance();
              const cyfry = r.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, m).sort((x, y) => x - y);
              const mn = Array.from({ length: k }, (_, i) => (ruznych ? m - i : m));
              const w = mn.reduce((x, y) => x * y, 1);
              return zadanie(
                `Z cyfr $${cyfry.join(", ")}$ tworzymy liczby ${k === 2 ? "dwucyfrowe" : "trzycyfrowe"}. ${ruznych ? "Cyfry w liczbie muszą być różne" : "Cyfry mogą się powtarzać"}. Ile jest takich liczb?`,
                [`Mamy $${k}$ kroki: kolejne cyfry. Możliwości w kolejnych krokach: $${mn.join(", ")}$.`, `Mnożymy: $${mn.join("\\cdot")}=${w}$.`],
                q(w), "Liczba liczb $=$",
              );
            }
            const { cyfry, e, m } = probuj(() => {
              const m = r.int(5, 6);
              const cyfry = r.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, m).sort((x, y) => x - y);
              const e = cyfry.filter((x) => x % 2 === 0).length;
              return e >= 1 && e < m ? { cyfry, e, m } : null;
            });
            return zadanie(
              `Z cyfr $${cyfry.join(", ")}$ tworzymy liczby trzycyfrowe (cyfry mogą się powtarzać). Ile z nich jest parzystych?`,
              [`Zaczynamy od cyfry jedności: musi być parzysta, a parzystych cyfr jest $${e}$.`, `Cyfry setek i dziesiątek: po $${m}$ możliwości.`, `Mnożymy: $${m}\\cdot${m}\\cdot${e}=${m * m * e}$.`],
              q(m * m * e), "Liczba liczb $=$",
            );
          },
        },
        {
          id: "permutacje-wybory",
          nazwa: "Permutacje i wybory",
          opis: "Ustawianie w rzędzie, pary, trójki i miejsca na podium.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const k = r.int(3, 7);
              const f = Array.from({ length: k }, (_, i) => k - i);
              const w = f.reduce((x, y) => x * y, 1);
              const co = r.pick(["Na półce ustawiamy w jednym rzędzie różne książki; jest ich", "Do kolejki ustawiają się różne osoby; jest ich"]);
              return zadanie(
                `${co} $${k}$. Na ile sposobów można je ustawić?`,
                [`Pierwsze miejsce: $${k}$ możliwości, drugie: $${k - 1}$, i tak dalej, aż do jednej.`, `$${k}!=${f.join("\\cdot")}=${w}$.`],
                q(w), "Liczba sposobów $=$",
              );
            }
            if (tryb === 1) {
              const n = r.int(5, 12);
              const w = (n * (n - 1)) / 2;
              const uscisk = r.chance();
              return zadanie(
                uscisk
                  ? `Na spotkaniu każda osoba wita się uściskiem dłoni z każdą inną dokładnie raz; osób jest $${n}$. Ile uścisków dłoni nastąpi?`
                  : `W turnieju każda drużyna gra z każdą inną dokładnie jeden mecz; drużyn jest $${n}$. Ile meczów zostanie rozegranych?`,
                [
                  `Każdy z $${n}$ ${uscisk ? "uczestników" : "zespołów"} spotyka się z $${n - 1}$ innymi: $${n}\\cdot${n - 1}=${n * (n - 1)}$.`,
                  `Każde spotkanie policzyliśmy dwa razy, więc $${n * (n - 1)}:2=${w}$.`,
                ],
                q(w), uscisk ? "Liczba uścisków $=$" : "Liczba meczów $=$",
              );
            }
            if (tryb === 2) {
              const n = r.int(5, 9);
              const w = (n * (n - 1) * (n - 2)) / 6;
              return zadanie(
                `Z grupy liczącej $${n}$ osób wybieramy trzyosobową delegację (kolejność wyboru nie ma znaczenia). Na ile sposobów można to zrobić?`,
                [`Z kolejnością: $${n}\\cdot${n - 1}\\cdot${n - 2}=${n * (n - 1) * (n - 2)}$.`, `Każdą trójkę policzyliśmy $3!=6$ razy, więc $${n * (n - 1) * (n - 2)}:6=${w}$.`],
                q(w), "Liczba sposobów $=$",
              );
            }
            const n = r.int(5, 9);
            const w = n * (n - 1) * (n - 2);
            return zadanie(
              `W zawodach bierze udział $${n}$ zawodników. Na podium (1., 2. i 3. miejsce) staje trzech z nich. Ile jest możliwych podiów?`,
              [`Pierwsze miejsce: $${n}$ możliwości, drugie: $${n - 1}$, trzecie: $${n - 2}$.`, `Mnożymy: $${n}\\cdot${n - 1}\\cdot${n - 2}=${w}$ (tu kolejność ma znaczenie).`],
              q(w), "Liczba podiów $=$",
            );
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Zdarzenia i prawdopodobieństwo
    {
      id: "zdarzenia",
      nazwa: "Zdarzenia i prawdopodobieństwo",
      sciaga: [
        {
          nazwa: "Doświadczenie losowe i zdarzenia",
          slownie: "W doświadczeniu losowym znamy wszystkie możliwe wyniki, ale nie umiemy przewidzieć, który wypadnie. Zbiór wszystkich wyników to $\\Omega$. Zdarzenie to dowolny podzbiór $\\Omega$, a jego elementy sprzyjają zdarzeniu.",
          tex: "\\Omega=\\{1,2,3,4,5,6\\}\\qquad A=\\{2,4,6\\}",
          litery: "$\\Omega$ – zbiór wszystkich wyników, $A$ – zdarzenie „wypadła liczba parzysta”.",
          przyklad: "Rzut kostką: $\\Omega=\\{1,2,3,4,5,6\\}$. Zdarzenie „wypadło więcej niż $4$ oczek” to $\\{5,6\\}$.",
          uwaga: "Zdarzenie pewne to cały zbiór $\\Omega$, a niemożliwe to zbiór pusty $\\varnothing$.",
        },
        {
          nazwa: "Działania na zdarzeniach",
          slownie: "Suma $A\\cup B$ zachodzi, gdy zachodzi $A$ lub $B$. Iloczyn $A\\cap B$ – gdy zachodzą oba. Różnica $A\\setminus B$ – gdy zachodzi $A$, a $B$ nie. Zdarzenie przeciwne $A'$ – gdy $A$ nie zachodzi.",
          tex: "A\\cup B\\qquad A\\cap B\\qquad A\\setminus B\\qquad A'=\\Omega\\setminus A",
          litery: "Zdarzenia rozłączne (wykluczające się) mają $A\\cap B=\\varnothing$.",
          przyklad: "Kostka, $A=\\{2,4,6\\}$, $B=\\{4,5,6\\}$. $A\\cup B=\\{2,4,5,6\\}$, $A\\cap B=\\{4,6\\}$, $A\\setminus B=\\{2\\}$, $A'=\\{1,3,5\\}$.",
          uwaga: "W sumie $A\\cup B$ elementy wspólne zapisujemy tylko raz.",
        },
        {
          nazwa: "Własności prawdopodobieństwa",
          slownie: "Prawdopodobieństwo zdarzenia jest liczbą od $0$ do $1$. Zdarzenie pewne ma prawdopodobieństwo $1$, a niemożliwe $0$. Prawdopodobieństwa zdarzenia i zdarzenia przeciwnego dają razem $1$.",
          tex: "0\\le P(A)\\le1\\qquad P(\\Omega)=1\\qquad P(A')=1-P(A)",
          litery: "$P(A)$ – prawdopodobieństwo zdarzenia $A$.",
          przyklad: "Jeśli szansa na deszcz to $0{,}3$, to szansa na brak deszczu to $1-0{,}3=0{,}7$.",
          uwaga: "Wynik większy niż $1$ albo ujemny oznacza błąd w rachunkach.",
        },
        {
          nazwa: "Prawdopodobieństwo sumy zdarzeń",
          slownie: "Dla zdarzeń rozłącznych prawdopodobieństwa dodajemy. Dla dowolnych zdarzeń odejmujemy część wspólną, żeby nie policzyć jej dwa razy.",
          tex: "P(A\\cup B)=P(A)+P(B)-P(A\\cap B)",
          litery: "Gdy $A\\cap B=\\varnothing$, to $P(A\\cap B)=0$ i wzór upraszcza się do $P(A)+P(B)$.",
          przyklad: "$P(A)=0{,}5$, $P(B)=0{,}4$, $P(A\\cap B)=0{,}2$. Wtedy $P(A\\cup B)=0{,}5+0{,}4-0{,}2=0{,}7$.",
          uwaga: "Nie dodawaj prawdopodobieństw zdarzeń, które mogą zajść jednocześnie, bez odjęcia części wspólnej.",
        },
      ],
      jak: [
        "Wypisz zbiór $\\Omega$ i zbiory sprzyjające zdarzeniom (dla małych zbiorów).",
        "Działania na zdarzeniach wykonuj na zbiorach: suma – wszystko, co w $A$ lub $B$, iloczyn – to, co w obu.",
        "Dla zdarzenia przeciwnego użyj $P(A')=1-P(A)$.",
        "Dla sumy zdarzeń użyj wzoru z odjęciem części wspólnej (albo dodaj, gdy zdarzenia są rozłączne).",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Rzucamy raz sześcienną kostką. Zdarzenie $A$ polega na tym, że wypadła liczba oczek większa od $4$. Który zbiór opisuje zdarzenie $A$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\{4,5,6\\}$", "$\\{5,6\\}$", "$\\{1,2,3,4\\}$", "$\\{6\\}$"],
          poprawna: 1,
        },
        {
          nr: "23",
          tresc: "Zdarzenia $A$ i $B$ są rozłączne, $P(A)=0{,}3$ i $P(B)=0{,}5$. Ile wynosi $P(A\\cup B)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}15$", "$0{,}2$", "$0{,}8$", "$0{,}5$"],
          poprawna: 2,
        },
        {
          nr: "24",
          tresc: "Dla zdarzeń $A$ i $B$ mamy $P(A)=0{,}6$, $P(B)=0{,}5$ i $P(A\\cup B)=0{,}8$. Ile wynosi $P(A\\cap B)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1{,}1$", "$0{,}3$", "$0{,}1$", "$0{,}2$"],
          poprawna: 1,
        },
        {
          nr: "25",
          tresc: "Prawdopodobieństwo, że autobus przyjedzie punktualnie, wynosi $0{,}85$. Jakie jest prawdopodobieństwo zdarzenia przeciwnego, czyli że autobus się spóźni lub przyjedzie za wcześnie? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}85$", "$1{,}85$", "$0{,}05$", "$0{,}15$"],
          poprawna: 3,
        },
        {
          nr: "26",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Zdarzenia $A$ i $A'$ są zawsze rozłączne.", litery: "PF", poprawna: 0 },
            { tekst: "Przy rzucie kostką zdarzenia „wypadła liczba parzysta” i „wypadła liczba pierwsza” są rozłączne.", litery: "PF", poprawna: 1 },
            { tekst: "Prawdopodobieństwo zdarzenia niemożliwego jest równe $0$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Rzucamy raz sześcienną kostką. Zdarzenie $A$: wypadła liczba parzysta, zdarzenie $B$: wypadła liczba podzielna przez $3$. Wypisz elementy zbiorów $A\\cup B$, $A\\cap B$, $A\\setminus B$ i $A'$. Następnie, wiedząc, że $P(A)=\\frac{1}{2}$, $P(B)=\\frac{1}{3}$ i $P(A\\cap B)=\\frac{1}{6}$, oblicz $P(A\\cup B)$ wzorem. **Zapisz obliczenia.**",
          rozwiazanie: "$A=\\{2,4,6\\}$, $B=\\{3,6\\}$.\n\n$A\\cup B=\\{2,3,4,6\\}$, $A\\cap B=\\{6\\}$, $A\\setminus B=\\{2,4\\}$, $A'=\\{1,3,5\\}$.\n\nWzór: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)=\\frac{1}{2}+\\frac{1}{3}-\\frac{1}{6}=\\frac{3}{6}+\\frac{2}{6}-\\frac{1}{6}=\\frac{4}{6}=\\frac{2}{3}$.\n\nSprawdzenie: zbiór $A\\cup B$ ma $4$ z $6$ wyników, czyli $\\frac{4}{6}=\\frac{2}{3}$.\n\nOdpowiedź: $P(A\\cup B)=\\frac{2}{3}$.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "Dla zdarzeń $A$ i $B$ mamy $P(A)=0{,}4$, $P(B)=0{,}35$ i $P(A\\cup B)=0{,}6$. Oblicz $P(A\\cap B)$ oraz prawdopodobieństwo zdarzenia polegającego na tym, że nie zajdzie ani $A$, ani $B$. **Zapisz obliczenia.**",
          rozwiazanie: "Ze wzoru $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$ mamy $P(A\\cap B)=P(A)+P(B)-P(A\\cup B)$.\n\n$P(A\\cap B)=0{,}4+0{,}35-0{,}6=0{,}15$.\n\nNie zajdzie ani $A$, ani $B$ to zdarzenie przeciwne do $A\\cup B$, czyli $(A\\cup B)'$.\n\n$P((A\\cup B)')=1-P(A\\cup B)=1-0{,}6=0{,}4$.\n\nOdpowiedź: $P(A\\cap B)=0{,}15$, a szansa, że nie zajdzie ani $A$, ani $B$, wynosi $0{,}4$.",
        },
      ],
      generatory: [
        {
          id: "suma-zdarzen",
          nazwa: "Własności prawdopodobieństwa",
          opis: "Prawdopodobieństwo sumy, iloczynu albo zdarzenia przeciwnego z danych ułamków.",
          generuj(r) {
            const n = r.pick([8, 10, 12]);
            const t = (k) => q(k, n).tex();
            const tryb = r.int(0, 3);
            if (tryb === 3) {
              const a = r.int(1, n - 1);
              return zadanieP(
                `Prawdopodobieństwo zdarzenia $A$ jest równe $${t(a)}$. Oblicz prawdopodobieństwo zdarzenia przeciwnego $A'$.`,
                n - a, n,
                [`$P(A')=1-P(A)=1-\\frac{${a}}{${n}}=\\frac{${n}}{${n}}-\\frac{${a}}{${n}}=\\frac{${n - a}}{${n}}$.`],
              );
            }
            if (tryb === 2) {
              const a = r.int(1, n - 2), b = r.int(1, n - a - 1);
              return zadanieP(
                `Zdarzenia $A$ i $B$ wykluczają się, $P(A)=${t(a)}$ i $P(B)=${t(b)}$. Oblicz $P(A\\cup B)$.`,
                a + b, n,
                [`Zdarzenia są rozłączne, więc $P(A\\cup B)=P(A)+P(B)=\\frac{${a}}{${n}}+\\frac{${b}}{${n}}=\\frac{${a + b}}{${n}}$.`],
              );
            }
            const a = r.int(2, n - 2), b = r.int(2, n - 2);
            const c = r.int(Math.max(1, a + b - n), Math.min(a, b));
            const u = a + b - c;
            if (tryb === 0) {
              return zadanieP(
                `Dla zdarzeń $A$ i $B$ mamy $P(A)=${t(a)}$, $P(B)=${t(b)}$ i $P(A\\cap B)=${t(c)}$. Oblicz $P(A\\cup B)$.`,
                u, n,
                [`$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)=\\frac{${a}}{${n}}+\\frac{${b}}{${n}}-\\frac{${c}}{${n}}=\\frac{${a}+${b}-${c}}{${n}}=\\frac{${u}}{${n}}$.`],
              );
            }
            return zadanieP(
              `Dla zdarzeń $A$ i $B$ mamy $P(A)=${t(a)}$, $P(B)=${t(b)}$ i $P(A\\cup B)=${t(u)}$. Oblicz $P(A\\cap B)$.`,
              c, n,
              [`Ze wzoru $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$ mamy $P(A\\cap B)=P(A)+P(B)-P(A\\cup B)$.`, `$P(A\\cap B)=\\frac{${a}}{${n}}+\\frac{${b}}{${n}}-\\frac{${u}}{${n}}=\\frac{${a}+${b}-${u}}{${n}}=\\frac{${c}}{${n}}$.`],
            );
          },
        },
        {
          id: "zdarzenia-zbiory",
          nazwa: "Działania na zdarzeniach",
          opis: "Liczba elementów sumy, iloczynu, różnicy i zdarzenia przeciwnego dla liczb losowanych z małego zbioru.",
          generuj(r) {
            const N = r.pick([10, 12, 15, 20]);
            const wszystkie = (f) => Array.from({ length: N }, (_, i) => i + 1).filter(f);
            const dz = r.int(2, 5), dz2 = r.intBez(2, 5, dz), k = r.int(Math.floor(N / 3), Math.floor((2 * N) / 3));
            const WARUNKI = [
              { t: `jest podzielna przez $${dz}$`, f: (x) => x % dz === 0 },
              { t: `jest podzielna przez $${dz2}$`, f: (x) => x % dz2 === 0 },
              { t: "jest nieparzysta", f: (x) => x % 2 === 1 },
              { t: "jest liczbą pierwszą", f: pierwsza },
              { t: `jest większa od $${k}$`, f: (x) => x > k },
              { t: "jest kwadratem liczby naturalnej", f: kwadrat },
            ];
            const OPER = [
              { tex: "A\\cup B", f: (a, b, x) => a(x) || b(x), nazwa: "suma $A\\cup B$: liczby z $A$ lub z $B$" },
              { tex: "A\\cap B", f: (a, b, x) => a(x) && b(x), nazwa: "iloczyn $A\\cap B$: liczby i z $A$, i z $B$" },
              { tex: "A\\setminus B", f: (a, b, x) => a(x) && !b(x), nazwa: "różnica $A\\setminus B$: liczby z $A$, których nie ma w $B$" },
              { tex: "B\\setminus A", f: (a, b, x) => b(x) && !a(x), nazwa: "różnica $B\\setminus A$: liczby z $B$, których nie ma w $A$" },
              { tex: "A'", f: (a, b, x) => !a(x), nazwa: "zdarzenie przeciwne $A'$: liczby spoza $A$" },
              { tex: "(A\\cup B)'", f: (a, b, x) => !(a(x) || b(x)), nazwa: "zdarzenie $(A\\cup B)'$: liczby, których nie ma ani w $A$, ani w $B$" },
            ];
            return probuj(() => {
              const A = r.pick(WARUNKI), B = r.pick(WARUNKI);
              if (A.t === B.t) return null;
              const op = r.pick(OPER);
              const zA = wszystkie(A.f), zB = wszystkie(B.f);
              if (zA.length < 2 || zB.length < 2) return null;
              const w = wszystkie((x) => op.f(A.f, B.f, x));
              if (w.length === 0) return null;
              return zadanie(
                `Losujemy jedną liczbę ze zbioru $\\Omega=\\{1,2,\\ldots,${N}\\}$. Zdarzenie $A$: wylosowana liczba ${A.t}. Zdarzenie $B$: wylosowana liczba ${B.t}. Ile elementów ma zbiór $${op.tex}$?`,
                [`$A$: ${lista(zA)}.`, `$B$: ${lista(zB)}.`, `Z definicji, ${op.nazwa}: ${lista(w)}.`, `Elementów jest $${w.length}$.`],
                q(w.length), "Liczba elementów $=$",
              );
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Prawdopodobieństwo klasyczne
    {
      id: "klasyczne",
      nazwa: "Prawdopodobieństwo klasyczne",
      sciaga: [
        {
          nazwa: "Wzór klasyczny",
          slownie: "Gdy wszystkie wyniki doświadczenia są jednakowo możliwe, prawdopodobieństwo zdarzenia to liczba wyników sprzyjających podzielona przez liczbę wszystkich wyników. Wynik skracamy.",
          tex: "P(A)=\\frac{|A|}{|\\Omega|}",
          litery: "$|A|$ – liczba wyników sprzyjających zdarzeniu $A$, $|\\Omega|$ – liczba wszystkich wyników.",
          przyklad: "Rzut kostką, $A$ – wypadła liczba pierwsza: $A=\\{2,3,5\\}$, więc $P(A)=\\frac{3}{6}=\\frac{1}{2}$.",
          uwaga: "Najpierw sprawdź, czy wyniki są jednakowo możliwe. Gdy nie są (np. „suma oczek”), wybierz taki opis wyników, żeby były (np. pary oczek).",
        },
        {
          nazwa: "Dwie kostki",
          slownie: "Wynikiem rzutu dwiema kostkami jest para (oczka na pierwszej, oczka na drugiej). Takich par jest $36$ i wszystkie są jednakowo możliwe. Pary $(1,4)$ i $(4,1)$ to różne wyniki.",
          tex: "|\\Omega|=6\\cdot6=36",
          litery: "Liczba par o danej sumie $s$: dla $s=2,3,4,5,6,7$ jest ich $1, 2, 3, 4, 5, 6$, a dla $s=8,\\ldots,12$ jest $5, 4, 3, 2, 1$.",
          przyklad: "Suma $5$: $(1,4), (2,3), (3,2), (4,1)$ – cztery pary, więc $P=\\frac{4}{36}=\\frac{1}{9}$.",
          uwaga: "Sumy $2$ i $7$ nie są jednakowo prawdopodobne: $2$ ma jedną parę, a $7$ ma sześć.",
        },
        {
          nazwa: "Losowanie jednej kuli lub karty",
          slownie: "Przy losowaniu jednej rzeczy wyników jest tyle, ile rzeczy w urnie albo talii. Wyniki sprzyjające to te rzeczy, które mają żądaną cechę.",
          litery: "Gdy cech jest kilka („biała lub zielona”), dodaj liczby rzeczy z każdej cechy.",
          przyklad: "W urnie: $5$ kul białych, $3$ czerwone, $2$ zielone. P(nie czerwona) $=\\frac{5+2}{10}=\\frac{7}{10}$.",
          uwaga: "Do $|\\Omega|$ wlicz wszystkie kule, także te w innym kolorze.",
        },
        {
          nazwa: "Losowanie dwóch kul",
          slownie: "Losując dwie kule jednocześnie (albo kolejno bez zwracania), możemy liczyć pary uporządkowane: $n(n-1)$ wyników. Tak samo liczymy sprzyjające. Albo liczymy obie liczby bez kolejności i dzielimy każdą przez $2$.",
          tex: "|\\Omega|=n(n-1)\\qquad|\\Omega|=\\frac{n(n-1)}{2}",
          litery: "$n$ – liczba kul w urnie.",
          przyklad: "$4$ kule białe, $2$ czarne, losujemy $2$ naraz. Bez kolejności: $|\\Omega|=\\frac{6\\cdot5}{2}=15$, obie białe: $\\frac{4\\cdot3}{2}=6$. $P=\\frac{6}{15}=\\frac{2}{5}$.",
          uwaga: "Nie mieszaj sposobów: licznik i mianownik liczymy tak samo (oba z kolejnością albo oba bez).",
        },
        {
          nazwa: "Zdarzenie przeciwne i „co najmniej”",
          slownie: "Gdy zdarzenie ma wiele wyników sprzyjających (np. „co najmniej jedna szóstka”), łatwiej policzyć zdarzenie przeciwne i odjąć od $1$.",
          tex: "P(A)=1-P(A')",
          litery: "$A'$ – zdarzenie przeciwne do $A$.",
          przyklad: "Dwie monety, „co najmniej jeden orzeł”: przeciwne to RR, czyli $\\frac{1}{4}$. Zatem $P=1-\\frac{1}{4}=\\frac{3}{4}$.",
          uwaga: "Przeciwne do „co najmniej jeden” to „żaden” (a nie „dokładnie jeden”).",
        },
      ],
      jak: [
        "Opisz wyniki tak, by były jednakowo możliwe (pary oczek, ponumerowane kule) i policz $|\\Omega|$ regułą mnożenia.",
        "Policz wyniki sprzyjające $|A|$ – wypisz je lub zlicz regułą mnożenia i dodawania.",
        "Zapisz $P(A)=\\frac{|A|}{|\\Omega|}$ i skróć ułamek. Wynik musi być w przedziale od $0$ do $1$.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "W pudełku jest $20$ kul ponumerowanych liczbami od $1$ do $20$. Losujemy jedną kulę. Jakie jest prawdopodobieństwo, że numer tej kuli jest podzielny przez $4$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{4}$", "$\\frac{1}{5}$", "$\\frac{1}{20}$", "$\\frac{3}{20}$"],
          poprawna: 0,
        },
        {
          nr: "30",
          tresc: "Rzucamy dwa razy symetryczną sześcienną kostką. Jakie jest prawdopodobieństwo, że suma wyrzuconych oczek jest równa $8$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{11}$", "$\\frac{5}{36}$", "$\\frac{1}{6}$", "$\\frac{5}{12}$"],
          poprawna: 1,
        },
        {
          nr: "31",
          tresc: "W urnie wszystkie kule różnią się tylko kolorem: białych jest $5$, czerwonych $3$, a zielonych $2$. Losujemy jedną kulę. Jakie jest prawdopodobieństwo, że wylosowana kula nie jest czerwona? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{3}{10}$", "$\\frac{3}{7}$", "$\\frac{7}{10}$", "$\\frac{1}{2}$"],
          poprawna: 2,
        },
        {
          nr: "32",
          tresc: "W pudełku jest $4$ kul białych i $2$ czarne (kule różnią się tylko kolorem). Losujemy jednocześnie dwie kule. Jakie jest prawdopodobieństwo, że obie są białe? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{2}{3}$", "$\\frac{4}{9}$", "$\\frac{1}{3}$", "$\\frac{2}{5}$"],
          poprawna: 3,
        },
        {
          nr: "33",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Przy rzucie dwiema kostkami suma oczek równa $2$ jest tak samo prawdopodobna jak suma równa $7$.", litery: "PF", poprawna: 1 },
            { tekst: "Prawdopodobieństwo, że na obu kostkach wypadnie ta sama liczba oczek, jest równe $\\frac{1}{6}$.", litery: "PF", poprawna: 0 },
            { tekst: "Prawdopodobieństwo, że losowa liczba ze zbioru $\\{1, 2, \\ldots, 10\\}$ jest pierwsza, wynosi $\\frac{3}{10}$.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 3,
          tresc: "Rzucamy dwa razy symetryczną sześcienną kostką. Oblicz prawdopodobieństwo, że: a) iloczyn wyrzuconych oczek jest liczbą nieparzystą, b) suma oczek wynosi co najmniej $10$, c) na żadnej kostce nie wypadła szóstka. **Zapisz obliczenia.**",
          rozwiazanie: "Wszystkich wyników jest $|\\Omega|=6\\cdot6=36$ (pary oczek).\n\na) Iloczyn jest nieparzysty, gdy obie liczby oczek są nieparzyste: po $3$ możliwości na każdej kostce, $3\\cdot3=9$ par. $P=\\frac{9}{36}=\\frac{1}{4}$.\n\nb) Suma $10$: $(4,6),(5,5),(6,4)$ – $3$ pary. Suma $11$: $(5,6),(6,5)$ – $2$ pary. Suma $12$: $(6,6)$ – $1$ para. Razem $6$ par. $P=\\frac{6}{36}=\\frac{1}{6}$.\n\nc) Bez szóstki: po $5$ możliwości na każdej kostce, $5\\cdot5=25$ par. $P=\\frac{25}{36}$.\n\nOdpowiedź: a) $\\frac{1}{4}$, b) $\\frac{1}{6}$, c) $\\frac{25}{36}$.",
        },
        {
          nr: "35",
          punkty: 3,
          tresc: "W pudełku są kule różniące się tylko kolorem: $2$ czerwone, $3$ niebieskie i $4$ zielone. Losujemy jednocześnie dwie kule. Oblicz prawdopodobieństwo, że wylosowane kule mają ten sam kolor. **Zapisz obliczenia.**",
          rozwiazanie: "Kul jest $9$. Dwie kule wybieramy bez uwzględniania kolejności: $|\\Omega|=\\frac{9\\cdot8}{2}=36$.\n\nSprzyjające: dwie czerwone $\\frac{2\\cdot1}{2}=1$, dwie niebieskie $\\frac{3\\cdot2}{2}=3$, dwie zielone $\\frac{4\\cdot3}{2}=6$. Przypadki się wykluczają, więc $|A|=1+3+6=10$.\n\n$P(A)=\\frac{10}{36}=\\frac{5}{18}$.\n\nOdpowiedź: Prawdopodobieństwo jest równe $\\frac{5}{18}$.",
        },
      ],
      generatory: [
        {
          id: "dwie-kostki",
          nazwa: "Dwie kostki",
          opis: "Prawdopodobieństwo zdarzenia przy rzucie dwiema kostkami: suma, iloczyn, równe lub różne oczka.",
          generuj(r) {
            return probuj(() => {
              const W = r.pick(WARUNKI_KOSTEK);
              const sprzyj = PARY.filter(([a, b]) => W.f(a, b));
              if (sprzyj.length === 0 || q(sprzyj.length, 36).d > 12) return null;
              const intro = r.pick([
                "Rzucamy dwa razy symetryczną sześcienną kostką",
                "Rzucamy jednocześnie białą i czarną symetryczną kostką sześcienną (wynik to para: biała, czarna)",
              ]);
              const lk = sprzyj.length;
              return zadanieP(
                `${intro}. Jakie jest prawdopodobieństwo, że ${W.t}?`,
                lk, 36,
                [
                  "Wynikiem jest para liczb oczek. Wszystkich wyników jest $|\\Omega|=6\\cdot6=36$.",
                  lk <= 10 ? `Wyniki sprzyjające: ${sprzyj.map(([a, b]) => `$(${a}, ${b})$`).join(", ")}, czyli $|A|=${lk}$.` : `Wyniki sprzyjające (pary o tej własności): $|A|=${lk}$.`,
                ],
              );
            });
          },
        },
        {
          id: "losowanie-jednego",
          nazwa: "Losowanie jednej rzeczy",
          opis: "Prawdopodobieństwo przy losowaniu jednej kuli, jednej liczby albo jednej karty z talii.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              return probuj(() => {
                const kol = r.shuffle(KOLORY).slice(0, 3);
                const c = kol.map(() => r.int(1, 8));
                const N = sum(c);
                const j = r.int(0, 2);
                const rodzaj = r.int(0, 2);
                let sprzyj, opis, krok;
                if (rodzaj === 0) {
                  sprzyj = c[j];
                  opis = `jest ${kol[j].sg}`;
                  krok = `Kul ${kol[j].gen} jest $${c[j]}$, więc $|A|=${c[j]}$.`;
                } else if (rodzaj === 1) {
                  sprzyj = N - c[j];
                  opis = `nie jest ${kol[j].sg}`;
                  krok = `Kul innych kolorów niż ${kol[j].sg} jest $${N}-${c[j]}=${N - c[j]}$, więc $|A|=${N - c[j]}$.`;
                } else {
                  const j2 = (j + 1) % 3;
                  sprzyj = c[j] + c[j2];
                  opis = `jest ${kol[j].sg} albo ${kol[j2].sg}`;
                  krok = `Kul ${kol[j].gen} jest $${c[j]}$, a ${kol[j2].gen} $${c[j2]}$, więc $|A|=${c[j]}+${c[j2]}=${sprzyj}$.`;
                }
                if (q(sprzyj, N).d > 12) return null;
                return zadanieP(
                  `W urnie wszystkie kule różnią się tylko kolorem: ${kol.map((k, i) => `${k.gen} jest $${c[i]}$`).join(", ")}. Losujemy jedną kulę. Jakie jest prawdopodobieństwo, że wylosowana kula ${opis}?`,
                  sprzyj, N,
                  [`Kul jest $${plus(c)}=${N}$, więc $|\\Omega|=${N}$.`, krok],
                );
              });
            }
            if (tryb === 1) {
              return probuj(() => {
                const N = r.int(10, 30);
                const d = r.int(2, 7), kk = r.int(3, N - 2);
                const WARUNKI = [
                  { t: "jest liczbą pierwszą", f: pierwsza },
                  { t: `jest podzielny przez $${d}$`, f: (x) => x % d === 0 },
                  { t: `nie jest podzielny przez $${d}$`, f: (x) => x % d !== 0 },
                  { t: "jest kwadratem liczby naturalnej", f: kwadrat },
                  { t: `jest mniejszy od $${kk}$`, f: (x) => x < kk },
                  { t: `jest większy od $${kk}$`, f: (x) => x > kk },
                ];
                const W = r.pick(WARUNKI);
                const sprzyj = Array.from({ length: N }, (_, i) => i + 1).filter(W.f);
                if (sprzyj.length === 0 || q(sprzyj.length, N).d > 12) return null;
                return zadanieP(
                  `Z kartek ponumerowanych kolejnymi liczbami od $1$ do $${N}$ losujemy jedną. Jakie jest prawdopodobieństwo, że numer na wylosowanej kartce ${W.t}?`,
                  sprzyj.length, N,
                  [`Kartek jest $${N}$, więc $|\\Omega|=${N}$.`, sprzyj.length <= 12 ? `Sprzyjające numery: ${lista(sprzyj)}, czyli $|A|=${sprzyj.length}$.` : `Sprzyjających numerów jest $|A|=${sprzyj.length}$.`],
                );
              });
            }
            const KOLORY_KART = ["pik", "kier", "karo", "trefl"], FIGURY = ["9", "10", "walet", "dama", "król", "as"];
            const talia = KOLORY_KART.flatMap((k) => FIGURY.map((f) => ({ k, f })));
            const WARUNKI = [
              { t: "jest asem", f: (c) => c.f === "as" },
              { t: "jest kierem", f: (c) => c.k === "kier" },
              { t: "jest figurą (waletem, damą albo królem)", f: (c) => ["walet", "dama", "król"].includes(c.f) },
              { t: "jest czerwona (kier albo karo)", f: (c) => c.k === "kier" || c.k === "karo" },
              { t: "nie jest kierem", f: (c) => c.k !== "kier" },
              { t: "jest kierem albo asem", f: (c) => c.k === "kier" || c.f === "as" },
              { t: "jest waletem albo damą", f: (c) => c.f === "walet" || c.f === "dama" },
              { t: "ma wartość 9 albo 10", f: (c) => c.f === "9" || c.f === "10" },
              { t: "jest trefl, ale nie jest figurą", f: (c) => c.k === "trefl" && !["walet", "dama", "król"].includes(c.f) },
            ];
            return probuj(() => {
              const W = r.pick(WARUNKI);
              const lk = talia.filter(W.f).length;
              if (lk === 0 || q(lk, 24).d > 12) return null;
              return zadanieP(
                `Z talii $24$ kart (cztery kolory: pik, kier, karo, trefl; w każdym kolorze karty: 9, 10, walet, dama, król, as) losujemy jedną. Jakie jest prawdopodobieństwo, że wylosowana karta ${W.t}?`,
                lk, 24,
                ["Kart jest $4\\cdot6=24$, więc $|\\Omega|=24$.", `Kart sprzyjających zliczamy w talii: $|A|=${lk}$.`],
              );
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Doświadczenia wieloetapowe
    {
      id: "wieloetapowe",
      nazwa: "Doświadczenie losowe wieloetapowe",
      sciaga: [
        {
          nazwa: "Drzewko doświadczenia",
          slownie: "Doświadczenie wieloetapowe przedstawiamy drzewkiem: z początku wychodzą gałęzie możliwych wyników pierwszego etapu, z końca każdej z nich gałęzie drugiego etapu i tak dalej. Na każdej gałęzi zapisujemy jej prawdopodobieństwo. Droga od początku do końca to jeden wynik.",
          litery: "Prawdopodobieństwa gałęzi wychodzących z jednego punktu dają razem $1$.",
          przyklad: "Dwa rzuty monetą: z początku wychodzą gałęzie O i R (po $\\frac12$), z każdej z nich znowu O i R (po $\\frac12$). Dróg jest $4$: OO, OR, RO, RR.",
          uwaga: "Przy losowaniu bez zwracania prawdopodobieństwa gałęzi w drugim etapie zależą od tego, co wylosowano w pierwszym.",
        },
        {
          nazwa: "Prawdopodobieństwo drogi",
          slownie: "Prawdopodobieństwo jednej drogi (wyniku) to iloczyn prawdopodobieństw wszystkich gałęzi na tej drodze.",
          tex: "P=p_1\\cdot p_2\\cdot\\ldots\\cdot p_k",
          litery: "$p_1, p_2, \\ldots$ – prawdopodobieństwa kolejnych gałęzi na drodze.",
          przyklad: "Urna: $3$ kule białe i $2$ czarne. Bez zwracania: biała, potem biała: $\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{6}{20}=\\frac{3}{10}$.",
          uwaga: "Po pierwszym losowaniu bez zwracania w urnie jest o jedną kulę mniej – zmienia się mianownik.",
        },
        {
          nazwa: "Zdarzenie złożone z kilku dróg",
          slownie: "Jeśli zdarzenie zachodzi na kilka sposobów, czyli wzdłuż kilku dróg drzewka, to prawdopodobieństwa tych dróg dodajemy.",
          tex: "P(A)=P(\\text{droga 1})+P(\\text{droga 2})+\\ldots",
          przyklad: "Kule różnych kolorów (BC lub CB) z urny z przykładu wyżej: $\\frac{3}{5}\\cdot\\frac{2}{4}+\\frac{2}{5}\\cdot\\frac{3}{4}=\\frac{3}{10}+\\frac{3}{10}=\\frac{3}{5}$.",
          uwaga: "Wzdłuż drogi mnożymy, a między drogami dodajemy.",
        },
        {
          nazwa: "Ze zwracaniem i bez zwracania",
          slownie: "Ze zwracaniem: po losowaniu kulę odkładamy, więc skład urny w każdym etapie jest taki sam. Bez zwracania: kuli nie odkładamy, więc w następnym etapie kul jest mniej.",
          przyklad: "Urna: $4$ kule białe, $2$ czarne. Dwie białe ze zwracaniem: $\\frac{4}{6}\\cdot\\frac{4}{6}=\\frac{4}{9}$. Bez zwracania: $\\frac{4}{6}\\cdot\\frac{3}{5}=\\frac{2}{5}$.",
          uwaga: "Losowanie jednoczesne dwóch kul ma te same prawdopodobieństwa co losowanie kolejno bez zwracania.",
        },
        {
          nazwa: "Zdarzenie przeciwne w drzewku",
          slownie: "Gdy zdarzenie ma wiele dróg, wygodnie policzyć drogę zdarzenia przeciwnego i odjąć od $1$.",
          tex: "P(\\text{co najmniej raz})=1-P(\\text{ani razu})",
          przyklad: "Trzy rzuty monetą, co najmniej jeden orzeł: przeciwne to RRR z $P=\\frac{1}{8}$. Zatem $P=1-\\frac{1}{8}=\\frac{7}{8}$.",
          uwaga: "Przeciwne do „co najmniej jeden orzeł” to „żadnego orła”.",
        },
      ],
      jak: [
        "Narysuj (albo opisz słowami) drzewko: ile jest etapów i jakie wyniki w każdym.",
        "Przy losowaniu bez zwracania zmniejszaj liczbę kul w kolejnym etapie.",
        "Wzdłuż każdej drogi pomnóż prawdopodobieństwa gałęzi.",
        "Znajdź wszystkie drogi sprzyjające zdarzeniu i dodaj ich prawdopodobieństwa (albo użyj zdarzenia przeciwnego).",
      ],
      zadania: [
        {
          nr: "36",
          tresc: "Rzucamy trzy razy symetryczną monetą. Jakie jest prawdopodobieństwo, że orzeł wypadnie dokładnie raz? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{8}$", "$\\frac{1}{3}$", "$\\frac{3}{8}$", "$\\frac{1}{2}$"],
          poprawna: 2,
        },
        {
          nr: "37",
          tresc: "W urnie jest $4$ kule białe i $2$ czarne (kule różnią się tylko kolorem). Losujemy kolejno dwie kule bez zwracania. Jakie jest prawdopodobieństwo, że obie są czarne? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{9}$", "$\\frac{1}{15}$", "$\\frac{1}{3}$", "$\\frac{4}{15}$"],
          poprawna: 1,
        },
        {
          nr: "38",
          tresc: "W urnie jest $4$ kule białe i $2$ czarne (kule różnią się tylko kolorem). Losujemy kolejno dwie kule ze zwracaniem. Jakie jest prawdopodobieństwo, że wylosujemy jedną kulę białą i jedną czarną (w dowolnej kolejności)? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{8}{15}$", "$\\frac{2}{9}$", "$\\frac{1}{3}$", "$\\frac{4}{9}$"],
          poprawna: 3,
        },
        {
          nr: "39",
          tresc: "Rzucamy raz symetryczną monetą i raz symetryczną sześcienną kostką. Jakie jest prawdopodobieństwo, że wypadnie orzeł i liczba oczek podzielna przez $3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{6}$", "$\\frac{5}{6}$", "$\\frac{1}{3}$", "$\\frac{1}{2}$"],
          poprawna: 0,
        },
        {
          nr: "40",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Prawdopodobieństwo wyrzucenia trzech orłów w trzech rzutach symetryczną monetą wynosi $\\frac{1}{8}$.", litery: "PF", poprawna: 0 },
            { tekst: "Przy losowaniu bez zwracania prawdopodobieństwo wylosowania kuli białej w drugim losowaniu nie zależy od wyniku pierwszego.", litery: "PF", poprawna: 1 },
            { tekst: "Aby obliczyć prawdopodobieństwo zdarzenia złożonego z dwóch dróg drzewka, mnożymy prawdopodobieństwa tych dróg.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "41",
          punkty: 3,
          tresc: "W urnie jest $5$ kul białych i $3$ czarne (kule różnią się tylko kolorem). Losujemy kolejno dwie kule bez zwracania. Oblicz prawdopodobieństwo, że: a) obie kule są białe, b) kule mają różne kolory. **Zapisz obliczenia.**",
          rozwiazanie: "Drzewko: w pierwszym losowaniu kula biała z prawdopodobieństwem $\\frac{5}{8}$, czarna $\\frac{3}{8}$. Po wylosowaniu białej zostaje $4$ białe i $3$ czarne (razem $7$), po wylosowaniu czarnej zostaje $5$ białych i $2$ czarne.\n\na) Droga BB: $\\frac{5}{8}\\cdot\\frac{4}{7}=\\frac{20}{56}=\\frac{5}{14}$.\n\nb) Dwie drogi: BC i CB. BC: $\\frac{5}{8}\\cdot\\frac{3}{7}=\\frac{15}{56}$. CB: $\\frac{3}{8}\\cdot\\frac{5}{7}=\\frac{15}{56}$. Drogi się wykluczają, więc dodajemy: $\\frac{15}{56}+\\frac{15}{56}=\\frac{30}{56}=\\frac{15}{28}$.\n\nOdpowiedź: a) $\\frac{5}{14}$, b) $\\frac{15}{28}$.",
        },
        {
          nr: "42",
          punkty: 3,
          tresc: "Rzucamy trzy razy symetryczną monetą. Oblicz prawdopodobieństwo, że: a) orzeł wypadnie dokładnie dwa razy, b) orzeł wypadnie co najmniej raz. **Zapisz obliczenia.**",
          rozwiazanie: "Każdy z $3$ rzutów daje O albo R, więc dróg jest $2\\cdot2\\cdot2=8$, każda o prawdopodobieństwie $\\frac12\\cdot\\frac12\\cdot\\frac12=\\frac18$.\n\na) Dokładnie dwa orły: OOR, ORO, ROO – $3$ drogi. $P=3\\cdot\\frac{1}{8}=\\frac{3}{8}$.\n\nb) Zdarzenie przeciwne: ani jednego orła, czyli droga RRR z prawdopodobieństwem $\\frac{1}{8}$. $P=1-\\frac{1}{8}=\\frac{7}{8}$.\n\nOdpowiedź: a) $\\frac{3}{8}$, b) $\\frac{7}{8}$.",
        },
      ],
      generatory: [
        {
          id: "moneta-kostka",
          nazwa: "Monety i kostka",
          opis: "Kilka rzutów monetą albo moneta i kostka: drogi drzewka i ich prawdopodobieństwa.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 2) {
              const W = r.pick([
                { t: "wypadnie parzysta liczba oczek", k: 3 },
                { t: "wypadnie liczba oczek podzielna przez $3$", k: 2 },
                { t: "wypadnie liczba oczek większa od $4$", k: 2 },
                { t: "wypadnie liczba oczek mniejsza od $3$", k: 2 },
                { t: "wypadnie liczba pierwsza", k: 3 },
                { t: "wypadnie szóstka", k: 1 },
              ]);
              const strona = r.pick([["orzeł", "orła"], ["reszka", "reszki"]]);
              return zadanieP(
                `Rzucamy raz symetryczną monetą i raz symetryczną sześcienną kostką. Jakie jest prawdopodobieństwo, że wypadnie ${strona[0]} i ${W.t.replace("wypadnie ", "")}?`,
                W.k, 12,
                [`Moneta: $P=\\frac{1}{2}$. Kostka: $P=\\frac{${W.k}}{6}$ (sprzyjających wyników jest $${W.k}$).`, `Etapy mnożymy: $\\frac{1}{2}\\cdot\\frac{${W.k}}{6}=\\frac{${W.k}}{12}$.`],
              );
            }
            const n = r.int(2, 4);
            const wyniki = Array.from({ length: 2 ** n }, (_, i) => i.toString(2).padStart(n, "0").replaceAll("0", "R").replaceAll("1", "O"));
            const od = r.chance() ? "O" : "R";
            const ile = (s) => [...s].filter((c) => c === od).length;
            if (tryb === 0) {
              return probuj(() => {
                const k = r.int(1, n - 1);
                const sprzyj = wyniki.filter((s) => ile(s) === k);
                if (q(sprzyj.length, 2 ** n).d > 12) return null;
                const razy = k === 1 ? "raz" : "razy";
                return zadanieP(
                  `Rzucamy $${n}$ razy symetryczną monetą. Jakie jest prawdopodobieństwo, że wypadnie dokładnie $${k}$ ${razy} ${od === "O" ? "orzeł" : "reszka"}?`,
                  sprzyj.length, 2 ** n,
                  [
                    `Każda z $${n}$ rzutów daje O albo R, więc dróg jest $2^{${n}}=${2 ** n}$, każda o prawdopodobieństwie $\\frac{1}{${2 ** n}}$.`,
                    `Sprzyjające drogi (${od === "O" ? "O" : "R"} dokładnie $${k}$ ${razy}): ${sprzyj.join(", ")} – razem $${sprzyj.length}$.`,
                    `Dodajemy prawdopodobieństwa dróg: $${sprzyj.length}\\cdot\\frac{1}{${2 ** n}}=\\frac{${sprzyj.length}}{${2 ** n}}$.`,
                  ],
                );
              });
            }
            return probuj(() => {
              const m = r.int(2, 3);
              const brak = 1;
              if (q(2 ** m - brak, 2 ** m).d > 12) return null;
              return zadanieP(
                `Rzucamy $${m}$ razy symetryczną monetą. Jakie jest prawdopodobieństwo, że ${od === "O" ? "orzeł" : "reszka"} wypadnie co najmniej raz?`,
                2 ** m - 1, 2 ** m,
                [
                  `Zdarzenie przeciwne: ${od === "O" ? "orzeł" : "reszka"} ani razu. To jedna droga, o prawdopodobieństwie $\\left(\\frac{1}{2}\\right)^{${m}}=\\frac{1}{${2 ** m}}$.`,
                  `Zatem odejmujemy to od $1$: $1-\\frac{1}{${2 ** m}}$.`,   // wynik dopisuje zadanieP
                ],
              );
            });
          },
        },
        {
          id: "dwa-losowania",
          nazwa: "Dwa losowania z urny",
          opis: "Dwie kule losowane z urny z dwoma kolorami, ze zwracaniem albo bez zwracania; drzewko i dodawanie dróg.",
          generuj(r) {
            return probuj(() => {
              const w = r.int(2, 6), cz = r.int(2, 6);
              const N = w + cz;
              if (N > 10) return null;
              const bez = r.chance();
              const ile = { B: w, C: cz };
              const nazwa = { B: "biała", C: "czarna" };
              const droga = (x, y) => {
                const licz = ile[x] * (bez ? ile[y] - (x === y ? 1 : 0) : ile[y]);
                const mian = bez ? N * (N - 1) : N * N;
                const m2 = bez ? N - 1 : N;
                const l2 = bez ? ile[y] - (x === y ? 1 : 0) : ile[y];
                return { x, y, licz, mian, tex: `\\frac{${ile[x]}}{${N}}\\cdot\\frac{${l2}}{${m2}}=\\frac{${licz}}{${mian}}` };
              };
              const ZDARZENIA = [
                { t: "obie kule są białe", d: [["B", "B"]] },
                { t: "obie kule są czarne", d: [["C", "C"]] },
                { t: "kule mają różne kolory", d: [["B", "C"], ["C", "B"]] },
                { t: "kule mają ten sam kolor", d: [["B", "B"], ["C", "C"]] },
              ];
              const Z = r.pick(ZDARZENIA);
              const drogi = Z.d.map(([x, y]) => droga(x, y));
              const licz = sum(drogi.map((d) => d.licz));
              const mian = drogi[0].mian;
              if (q(licz, mian).d > 12) return null;
              const kroki = [
                `Urna: $${w}$ białych i $${cz}$ czarnych, razem $${N}$ kul. ${bez ? `Bez zwracania: w drugim losowaniu jest $${N - 1}$ kul.` : `Ze zwracaniem: w drugim losowaniu znów jest $${N}$ kul.`}`,
                ...drogi.map((d) => `Droga „${nazwa[d.x]}, potem ${nazwa[d.y]}”: $${d.tex}$.`),
              ];
              if (drogi.length > 1) kroki.push(`Drogi się wykluczają, więc dodajemy: $${plus(drogi.map((d) => `\\frac{${d.licz}}{${d.mian}}`))}=\\frac{${licz}}{${mian}}$.`);
              return zadanieP(
                `W urnie wszystkie kule różnią się tylko kolorem: białych jest $${w}$, czarnych $${cz}$. Losujemy kolejno dwie kule ${bez ? "bez zwracania" : "ze zwracaniem (po każdym losowaniu kulę odkładamy do urny)"}. Jakie jest prawdopodobieństwo, że ${Z.t}?`,
                licz, mian, kroki,
              );
            });
          },
        },
      ],
    },
  ],
};
