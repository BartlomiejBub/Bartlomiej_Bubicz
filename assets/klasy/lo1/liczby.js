// Klasa 1 (liceum i technikum) · rozdział 1 „Zbiory liczbowe. Liczby rzeczywiste” – Matematyka 1, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** „Ładna” odpowiedź: mianownik co najwyżej 12. */
const ladna = (v) => Math.abs(v.n) <= 100000 && v.d <= 12;

/** Liczba z przecinkiem dziesiętnym, gdy ma rozwinięcie skończone: dec(q(5, 2)) = "2{,}5", dec(q(1, 20)) = "0{,}05". */
function dec(v) {
  if (v.d === 1) return String(v.n);
  for (let k = 1; k <= 4; k++) {
    if (10 ** k % v.d === 0) {
      const cal = Math.abs(v.n) * (10 ** k / v.d);
      const s = String(cal).padStart(k + 1, "0");
      return `${v.n < 0 ? "-" : ""}${s.slice(0, -k)}{,}${s.slice(-k)}`;
    }
  }
  return v.tex();
}

/** Zbiór liczb w LaTeX: zb([1, 3]) = "\{1, 3\}". */
const zb = (t) => `\\{${t.join(", ")}\\}`;

/** Losowy podzbiór {min, …, max} o podanej liczbie elementów, rosnąco. */
const podzbior = (r, min, max, ile) => r.shuffle(Array.from({ length: max - min + 1 }, (_, i) => min + i)).slice(0, ile).sort((a, b) => a - b);

/** Przedział w LaTeX z końcami podanymi jako teksty: przedzial("-3", "2", true, false) = "\langle -3, 2)". */
const przedzial = (l, r, lc, rc) => `${lc ? "\\langle " : "("}${l}, ${r}${rc ? "\\rangle" : ")"}`;

/** Wyrażenie ax + b w LaTeX: lin(3, -5) = "3x - 5", lin(-1, 2) = "-x + 2", lin(0, 4) = "4", lin(2, 0) = "2x". */
function lin(a, b, x = "x") {
  const czesci = [];
  if (a !== 0) czesci.push(a === 1 ? x : a === -1 ? `-${x}` : `${a}${x}`);
  if (b !== 0 || czesci.length === 0) czesci.push(czesci.length === 0 ? `${b}` : b < 0 ? `- ${-b}` : `+ ${b}`);
  return czesci.join(" ");
}

/** (x + p) albo (x - p) bez nawiasów: xp(3) = "x + 3", xp(-3) = "x - 3". */
const xp = (p) => `x ${p < 0 ? "-" : "+"} ${Math.abs(p)}`;

/** Krok „dzielimy przez w”: dla w = 1 samo przepisanie, dla w = -1 mnożenie przez -1. */
function dziel(w, x) {
  if (w === 1) return `Stąd $x = ${x.tex()}$.`;
  if (w === -1) return `Mnożymy obie strony przez $-1$: $x = ${x.tex()}$.`;
  return `Dzielimy obie strony przez $${w}$: $x = ${x.tex()}$.`;
}

/** „punkt procentowy” z poprawną odmianą: 1 punkt, 2 punkty, 5 punktów. */
const ppl = (n) => (n === 1 ? "punkt procentowy" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? "punkty procentowe" : "punktów procentowych");

const nwd = (a, b) => (b ? nwd(b, a % b) : Math.abs(a));
const nww = (a, b) => (a / nwd(a, b)) * b;

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 1.1
    {
      id: "zbiory",
      nazwa: "Zbiór. Działania na zbiorach",
      sciaga: [
        {
          nazwa: "Zbiór i jego elementy",
          slownie: "Zbiór to zestaw elementów zapisany w nawiasach klamrowych. Kolejność i powtórzenia nie mają znaczenia. Zbiór bez elementów to zbiór pusty.",
          tex: "2\\in A\\qquad5\\notin A\\qquad\\emptyset",
          litery: "$\\in$ – należy do, $\\notin$ – nie należy do, $\\emptyset$ – zbiór pusty.",
          przyklad: "Dla $A=\\{1,2,4\\}$: $2\\in A$, $3\\notin A$. Zbiory $\\{2,1,2\\}$ i $\\{1,2\\}$ są takie same.",
          uwaga: "$\\{0\\}$ nie jest zbiorem pustym – ma jeden element, liczbę $0$.",
        },
        {
          nazwa: "Podzbiór",
          slownie: "Zbiór $A$ jest podzbiorem zbioru $B$, gdy każdy element $A$ należy do $B$. Zbiór pusty jest podzbiorem każdego zbioru.",
          tex: "A\\subset B",
          litery: "$A\\subset B$ czytamy: $A$ zawiera się w $B$.",
          przyklad: "$\\{1,2\\}\\subset\\{1,2,3\\}$, ale $\\{1,5\\}\\not\\subset\\{1,2,3\\}$, bo $5\\notin\\{1,2,3\\}$.",
          uwaga: "Znak $\\in$ stawiamy między elementem a zbiorem, a $\\subset$ między dwoma zbiorami: $2\\in\\{1,2\\}$, ale $\\{2\\}\\subset\\{1,2\\}$.",
        },
        {
          nazwa: "Suma i iloczyn zbiorów",
          slownie: "Suma $A\\cup B$ to elementy należące do $A$ lub do $B$ (do co najmniej jednego). Iloczyn $A\\cap B$ to część wspólna: elementy należące do obu zbiorów naraz.",
          tex: "A\\cup B\\qquad A\\cap B",
          przyklad: "Dla $A=\\{1,2,3,4\\}$ i $B=\\{3,4,5\\}$: $A\\cup B=\\{1,2,3,4,5\\}$, $A\\cap B=\\{3,4\\}$.",
          uwaga: "W sumie wspólny element wypisujemy tylko raz. Gdy zbiory nie mają wspólnych elementów, iloczyn jest równy $\\emptyset$.",
        },
        {
          nazwa: "Różnica i dopełnienie",
          slownie: "Różnica $A\\setminus B$ to elementy $A$, które nie należą do $B$. Dopełnienie $A'$ to elementy przestrzeni $X$, których nie ma w $A$.",
          tex: "A\\setminus B\\qquad A'=X\\setminus A",
          litery: "$X$ – zbiór, w którym pracujemy (przestrzeń), a $A\\subset X$.",
          przyklad: "Dla $A=\\{1,2,3,4\\}$, $B=\\{3,4,5\\}$: $A\\setminus B=\\{1,2\\}$, $B\\setminus A=\\{5\\}$. Gdy $X=\\{1,2,3,4,5,6\\}$, to $A'=\\{5,6\\}$.",
          uwaga: "Różnica nie jest przemienna: zwykle $A\\setminus B\\neq B\\setminus A$.",
        },
        {
          nazwa: "Liczba elementów sumy",
          slownie: "Elementy wspólne policzone w $A$ i w $B$ liczymy dwa razy, więc przy liczeniu elementów sumy odejmujemy je raz.",
          tex: "|A\\cup B|=|A|+|B|-|A\\cap B|",
          litery: "$|A|$ – liczba elementów zbioru $A$.",
          przyklad: "W klasie $8$ osób lubi matematykę, $6$ fizykę, a $3$ oba przedmioty. Co najmniej jeden z nich lubi $8+6-3=11$ osób.",
          uwaga: "Dodanie samych liczebności $|A|+|B|$ daje za dużo – trzeba odjąć część wspólną.",
        },
      ],
      jak: [
        "Wypisz elementy każdego zbioru (warunek zamień na listę liczb).",
        "Suma: zbierz wszystkie elementy z obu zbiorów, każdy tylko raz. Iloczyn: zostaw tylko elementy wspólne.",
        "Różnica $A\\setminus B$: wykreśl z $A$ elementy należące do $B$. Dopełnienie: wypisz elementy $X$, których nie ma w $A$.",
        "W zadaniach o liczbie osób użyj wzoru $|A\\cup B|=|A|+|B|-|A\\cap B|$ i policz resztę przez odejmowanie.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Dane są zbiory $A=\\{1,2,3,5,8\\}$ i $B=\\{2,3,4,5,6\\}$. Zbiór $A\\cap B$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\{1,2,3,4,5,6,8\\}$", "$\\{1,8\\}$", "$\\{2,3,5\\}$", "$\\{4,6\\}$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Dane są zbiory $A=\\{1,3,5,7,9\\}$ i $B=\\{3,6,9,12\\}$. Zbiór $(A\\cup B)\\setminus(A\\cap B)$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\{1,5,7\\}$", "$\\{3,9\\}$", "$\\{1,3,5,6,7,9,12\\}$", "$\\{1,5,6,7,12\\}$"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "Zbiór $A$ składa się z liczb naturalnych mniejszych od $5$, a $B=\\{0,2,4,6\\}$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$6\\in A$", litery: "PF", poprawna: 1 },
            { tekst: "$A\\cap B=\\{0,2,4\\}$", litery: "PF", poprawna: 0 },
            { tekst: "$A\\setminus B=\\{1,3\\}$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "4",
          tresc: "Niech $X=\\{1,2,3,4,5,6,7,8\\}$ i niech $A$ będzie zbiorem liczb parzystych należących do $X$. Dopełnienie $A'$ zbioru $A$ w zbiorze $X$ jest równe: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\{1,3,5,7\\}$", "$\\{2,4,6,8\\}$", "$\\{1,3,5,7,9\\}$", "$\\{0,1,3,5,7\\}$"],
          poprawna: 0,
        },
        {
          nr: "5",
          tresc: "W grupie $30$ uczniów $18$ uczy się angielskiego, $14$ niemieckiego, a $5$ uczy się obu tych języków. Liczba uczniów, którzy nie uczą się żadnego z tych języków, jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$27$", "$3$", "$13$", "$9$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Zbiór $A$ składa się z liczb całkowitych $x$ takich, że $-2<x\\le3$, a zbiór $B$ z liczb całkowitych $x$ takich, że $1\\le x<6$. Wypisz elementy zbiorów $A$, $B$, $A\\cup B$, $A\\cap B$ i $A\\setminus B$. **Zapisz obliczenia.**",
          rozwiazanie: "Liczby całkowite spełniające $-2<x\\le3$ to $-1, 0, 1, 2, 3$, więc $A=\\{-1,0,1,2,3\\}$.\n\nLiczby całkowite spełniające $1\\le x<6$ to $1, 2, 3, 4, 5$, więc $B=\\{1,2,3,4,5\\}$.\n\nSuma (wszystkie elementy, bez powtórzeń): $A\\cup B=\\{-1,0,1,2,3,4,5\\}$. Iloczyn (wspólne): $A\\cap B=\\{1,2,3\\}$.\n\nRóżnica (z $A$ usuwamy liczby z $B$): $A\\setminus B=\\{-1,0\\}$.\n\nOdpowiedź: $A\\cup B=\\{-1,0,1,2,3,4,5\\}$, $A\\cap B=\\{1,2,3\\}$, $A\\setminus B=\\{-1,0\\}$.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "W klasie jest $28$ uczniów. Na koszykówkę chodzi $15$ z nich, na pływanie $12$, a na oba te zajęcia $7$ uczniów. Ilu uczniów nie chodzi na żadne z tych zajęć? Ilu chodzi tylko na pływanie? **Zapisz obliczenia.**",
          rozwiazanie: "Niech $A$ – uczniowie chodzący na koszykówkę, $B$ – na pływanie. Wtedy $|A|=15$, $|B|=12$, $|A\\cap B|=7$.\n\nNa co najmniej jedne zajęcia chodzi $|A\\cup B|=15+12-7=20$ uczniów.\n\nNa żadne zajęcia nie chodzi $28-20=8$ uczniów.\n\nTylko na pływanie chodzi $|B|-|A\\cap B|=12-7=5$ uczniów.\n\nOdpowiedź: na żadne z tych zajęć nie chodzi $8$ uczniów, a tylko na pływanie chodzi $5$ uczniów.",
        },
      ],
      generatory: [
        {
          id: "zbiory-dzialanie",
          nazwa: "Działanie na zbiorach",
          opis: "Wyznacz sumę, iloczyn, różnicę albo dopełnienie zbiorów liczb naturalnych.",
          generuj(r) {
            for (;;) {
              const op = r.pick(["suma", "iloczyn", "AB", "BA", "dop"]);
              if (op === "dop") {
                const X = Array.from({ length: 10 }, (_, i) => i + 1);
                const A = podzbior(r, 1, 10, r.int(3, 6));
                const wynik = X.filter((x) => !A.includes(x));
                return {
                  tresc: `Niech $X = ${zb(X)}$ oraz $A = ${zb(A)}$. Wyznacz dopełnienie $A'$ zbioru $A$ w zbiorze $X$.`,
                  pola: [{ id: "z", typ: "zbior", ile: wynik.length, etykieta: "Elementy zbioru (w dowolnej kolejności)" }],
                  odpowiedz: { z: wynik },
                  wynik: `$A' = ${zb(wynik)}$`,
                  rozwiazanie: ["Dopełnienie to elementy zbioru $X$, których nie ma w $A$.", `$A' = ${zb(wynik)}$.`],
                };
              }
              const A = podzbior(r, 1, 12, r.int(4, 7));
              const B = podzbior(r, 1, 12, r.int(4, 7));
              const wspolne = A.filter((x) => B.includes(x));
              const wynik = { suma: [...new Set([...A, ...B])].sort((a, b) => a - b), iloczyn: wspolne, AB: A.filter((x) => !B.includes(x)), BA: B.filter((x) => !A.includes(x)) }[op];
              if (wynik.length < 2 || wynik.length > 8) continue;
              const zapis = { suma: "A \\cup B", iloczyn: "A \\cap B", AB: "A \\setminus B", BA: "B \\setminus A" }[op];
              const kroki = [];
              if (op === "suma") kroki.push("Do sumy należą liczby, które są w $A$ lub w $B$ – każdą wpisujemy tylko raz.");
              if (op === "iloczyn") kroki.push("Do iloczynu należą liczby, które są i w $A$, i w $B$.");
              if (op === "AB" || op === "BA") {
                kroki.push(`Elementy wspólne $A$ i $B$: $${zb(wspolne)}$.`);
                kroki.push(op === "AB" ? "Z $A$ wykreślamy liczby, które należą do $B$." : "Z $B$ wykreślamy liczby, które należą do $A$.");
              }
              kroki.push(`$${zapis} = ${zb(wynik)}$.`);
              return {
                tresc: `Dane są zbiory $A = ${zb(A)}$ i $B = ${zb(B)}$. Wyznacz $${zapis}$.`,
                pola: [{ id: "z", typ: "zbior", ile: wynik.length, etykieta: "Elementy zbioru (w dowolnej kolejności)" }],
                odpowiedz: { z: wynik },
                wynik: `$${zapis} = ${zb(wynik)}$`,
                rozwiazanie: kroki,
              };
            }
          },
        },
        {
          id: "zbiory-liczebnosc",
          nazwa: "Ile osób",
          opis: "Zadanie o liczbie elementów sumy zbiorów: ile osób robi coś, ile nie robi nic albo ile robi tylko jedno.",
          generuj(r) {
            const AKT = [
              [{ tak: "chodzi na koszykówkę", nie: "nie chodzi na koszykówkę" }, { tak: "chodzi na pływanie", nie: "nie chodzi na pływanie" }],
              [{ tak: "gra w szachy", nie: "nie gra w szachy" }, { tak: "gra w warcaby", nie: "nie gra w warcaby" }],
              [{ tak: "uczy się angielskiego", nie: "nie uczy się angielskiego" }, { tak: "uczy się niemieckiego", nie: "nie uczy się niemieckiego" }],
              [{ tak: "należy do chóru", nie: "nie należy do chóru" }, { tak: "należy do koła teatralnego", nie: "nie należy do koła teatralnego" }],
              [{ tak: "jeździ na rowerze", nie: "nie jeździ na rowerze" }, { tak: "jeździ na rolkach", nie: "nie jeździ na rolkach" }],
            ];
            const [A, B] = r.pick(AKT);
            const a = r.int(7, 18), b = r.int(7, 18);
            const c = r.int(2, Math.min(a, b) - 2);
            const s = a + b - c;
            const tryb = r.pick(["suma", "zaden", "tylko", "oba"]);
            const N = s + (tryb === "zaden" ? r.int(2, 9) : r.int(0, 6));
            const wstep = `W klasie jest $${N}$ uczniów. Spośród nich $${a}$ ${A.tak}, $${b}$ ${B.tak}`;
            const krokWzor = "Niech $A$ i $B$ będą zbiorami uczniów z obu wymienionych grup. Korzystamy ze wzoru $|A \\cup B| = |A| + |B| - |A \\cap B|$.";
            let tresc, wynik, kroki;
            if (tryb === "suma") {
              tresc = `${wstep}, a $${c}$ uczniów robi jedno i drugie. Ilu uczniów robi co najmniej jedną z tych rzeczy?`;
              wynik = s;
              kroki = [krokWzor, `$|A \\cup B| = ${a} + ${b} - ${c} = ${s}$.`];
            } else if (tryb === "zaden") {
              tresc = `${wstep}, a $${c}$ uczniów robi jedno i drugie. Ilu uczniów nie robi żadnej z tych rzeczy?`;
              wynik = N - s;
              kroki = [krokWzor, `$|A \\cup B| = ${a} + ${b} - ${c} = ${s}$.`, `Żadnej z tych rzeczy nie robi $${N} - ${s} = ${N - s}$ uczniów.`];
            } else if (tryb === "tylko") {
              tresc = `${wstep}, a $${c}$ uczniów robi jedno i drugie. Ilu uczniów ${A.tak}, ale ${B.nie}?`;
              wynik = a - c;
              kroki = [`Do pierwszej grupy należy $${a}$ uczniów, a $${c}$ z nich należy też do drugiej grupy.`,`Zostaje $${a} - ${c} = ${a - c}$ uczniów.`];
            } else {
              tresc = `${wstep}, a co najmniej jedną z tych rzeczy robi $${s}$ uczniów. Ilu uczniów robi jedno i drugie?`;
              wynik = c;
              kroki = [krokWzor, `Podstawiamy: $${s} = ${a} + ${b} - |A \\cap B|$.`, `Stąd $|A \\cap B| = ${a} + ${b} - ${s} = ${c}$.`];
            }
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba uczniów" }],
              odpowiedz: { w: wynik },
              wynik: `$${wynik}$`,
              rozwiazanie: kroki,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 1.2–1.3
    {
      id: "zbiory-liczbowe",
      nazwa: "Zbiory liczbowe. Oś liczbowa. Prawa działań",
      sciaga: [
        {
          nazwa: "Zbiory liczbowe",
          slownie: "Liczby naturalne $\\mathbb{N}$ (z zerem) zawierają się w całkowitych $\\mathbb{C}$, te w wymiernych $\\mathbb{W}$, a te w rzeczywistych $\\mathbb{R}$. Liczby rzeczywiste niewymierne tworzą zbiór $\\mathrm{NW}$.",
          tex: "\\mathbb{N}\\subset\\mathbb{C}\\subset\\mathbb{W}\\subset\\mathbb{R}",
          litery: "$\\mathbb{W}$ – liczby zapisywane ułamkiem $\\frac{m}{n}$, gdzie $m$ jest całkowita, a $n$ całkowita i różna od $0$. $\\mathrm{NW}$ – liczby rzeczywiste, które nie są wymierne.",
          przyklad: "$-3\\in\\mathbb{C}$, $\\frac{2}{5}\\in\\mathbb{W}$ (ale $\\frac{2}{5}\\notin\\mathbb{C}$), $\\sqrt{2}\\in\\mathrm{NW}$.",
          uwaga: "Pierwiastek nie zawsze jest niewymierny: $\\sqrt{16}=4$ jest liczbą naturalną. Każda liczba całkowita jest wymierna, bo $4=\\frac{4}{1}$.",
        },
        {
          nazwa: "Rozwinięcie dziesiętne",
          slownie: "Liczba wymierna ma rozwinięcie dziesiętne skończone albo nieskończone okresowe. Liczba niewymierna ma rozwinięcie nieskończone i nieokresowe. Ułamek okresowy zamieniamy na zwykły: w liczniku okres, w mianowniku tyle dziewiątek, ile cyfr ma okres.",
          tex: "0{,}(3)=\\frac{3}{9}=\\frac{1}{3}\\qquad0{,}(27)=\\frac{27}{99}=\\frac{3}{11}",
          litery: "Okres zapisujemy w nawiasie: $0{,}(27)=0{,}272727\\ldots$",
          przyklad: "$0{,}(6)=\\frac{6}{9}=\\frac{2}{3}$, a $\\sqrt{2}=1{,}41421\\ldots$ nie ma okresu, więc jest niewymierna.",
          uwaga: "Rozwinięcie skończone to nie to samo co okresowe: $0{,}333=\\frac{333}{1000}$, a $0{,}(3)=\\frac{1}{3}$.",
        },
        {
          nazwa: "Oś liczbowa",
          slownie: "Każdej liczbie rzeczywistej odpowiada dokładnie jeden punkt osi i odwrotnie. Im dalej w prawo, tym liczba większa. Liczby przeciwne leżą symetrycznie względem zera.",
          przyklad: "Liczba $-1{,}5$ leży między $-2$ a $-1$, więc $-2<-1{,}5<-1$. Liczbą przeciwną do niej jest $1{,}5$.",
          uwaga: "Z dwóch liczb ujemnych większa jest ta bliższa zera: $-0{,}5>-3$.",
        },
        {
          nazwa: "Prawa działań",
          slownie: "Dodawanie i mnożenie liczb rzeczywistych są przemienne i łączne. Mnożenie jest rozdzielne względem dodawania i odejmowania. Dzięki temu liczymy sprytnie, grupując wygodne liczby.",
          tex: "a+b=b+a\\qquad ab=ba\\qquad(a+b)+c=a+(b+c)\\qquad(ab)c=a(bc)\\qquad a(b+c)=ab+ac",
          litery: "$a$, $b$, $c$ – dowolne liczby rzeczywiste.",
          przyklad: "$25\\cdot37\\cdot4=(25\\cdot4)\\cdot37=3700$ oraz $7\\cdot98=7\\cdot(100-2)=686$.",
          uwaga: "Odejmowanie i dzielenie nie są przemienne ani łączne: $10-(4-1)=7$, ale $(10-4)-1=5$.",
        },
      ],
      jak: [
        "Uprość zapis liczby (np. $\\sqrt{16}=4$, $\\frac{12}{4}=3$) i dopiero wtedy ustal, do jakiego zbioru należy.",
        "Ułamek okresowy zamień na zwykły: w liczniku okres, w mianowniku tyle dziewiątek, ile cyfr ma okres; całość dodaj na końcu.",
        "Rozwinięcie skończone lub okresowe oznacza liczbę wymierną, nieskończone nieokresowe – niewymierną.",
        "Przy sprytnym liczeniu szukaj liczb, które razem lub w iloczynie dają okrągły wynik.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Liczbą niewymierną jest: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\sqrt{49}$", "$\\frac{22}{7}$", "$\\sqrt{20}$", "$0{,}(3)$"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Wskaż najmniejszy z podanych zbiorów, do którego należy liczba $\\frac{-12}{3}$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\mathbb{N}$", "$\\mathbb{C}$", "$\\mathbb{W}$", "$\\mathbb{R}$"],
          poprawna: 1,
        },
        {
          nr: "10",
          tresc: "Liczba $0{,}(45)$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{5}{11}$", "$\\frac{9}{20}$", "$\\frac{45}{9}$", "$\\frac{1}{2}$"],
          poprawna: 0,
        },
        {
          nr: "11",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Każda liczba całkowita jest liczbą wymierną.", litery: "PF", poprawna: 0 },
            { tekst: "Liczba $\\sqrt{9}$ jest niewymierna.", litery: "PF", poprawna: 1 },
            { tekst: "Liczba $0{,}125$ jest wymierna.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "12",
          tresc: "Wartość wyrażenia $17\\cdot48+17\\cdot52$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$1600$", "$1000$", "$17\\,000$", "$1700$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Zapisz liczbę $x=0{,}(18)$ w postaci ułamka zwykłego nieskracalnego, a następnie oblicz $x+\\frac{1}{11}$. **Zapisz obliczenia.**",
          rozwiazanie: "Okres ma dwie cyfry, więc mnożymy równość $x=0{,}(18)$ przez $100$: $100x=18{,}(18)$.\n\nOdejmujemy stronami: $100x-x=18{,}(18)-0{,}(18)=18$, czyli $99x=18$.\n\nStąd $x=\\frac{18}{99}=\\frac{2}{11}$.\n\nWtedy $x+\\frac{1}{11}=\\frac{2}{11}+\\frac{1}{11}=\\frac{3}{11}$.\n\nOdpowiedź: $x=\\frac{2}{11}$, a $x+\\frac{1}{11}=\\frac{3}{11}$.",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "Oblicz bez kalkulatora, korzystając z praw działań: a) $8\\cdot17\\cdot125$, b) $\\frac{5}{7}\\cdot19+\\frac{5}{7}\\cdot9$. **Zapisz obliczenia.**",
          rozwiazanie: "a) Mnożenie jest przemienne i łączne, więc grupujemy: $8\\cdot17\\cdot125=(8\\cdot125)\\cdot17=1000\\cdot17=17\\,000$.\n\nb) Wyłączamy wspólny czynnik (rozdzielność): $\\frac{5}{7}\\cdot19+\\frac{5}{7}\\cdot9=\\frac{5}{7}\\cdot(19+9)=\\frac{5}{7}\\cdot28$.\n\nSkracamy: $\\frac{5}{7}\\cdot28=5\\cdot4=20$.\n\nOdpowiedź: a) $17\\,000$, b) $20$.",
        },
      ],
      generatory: [
        {
          id: "liczby-okresowe",
          nazwa: "Ułamek okresowy",
          opis: "Zamień liczbę z rozwinięciem okresowym na ułamek zwykły (jednocyfrowy albo dwucyfrowy okres).",
          generuj(r) {
            for (;;) {
              const m = r.chance() ? 1 : 2;
              const okres = m === 1 ? r.int(1, 8) : r.int(10, 98);
              if (m === 2 && okres % 11 === 0) continue;
              const cal = r.chance(0.4) ? 0 : r.int(1, 5);
              const mian = 10 ** m - 1;
              const v = q(okres, mian).add(cal);
              if (!ladna(v)) continue;
              const ulamek = `\\frac{${okres}}{${mian}}`;
              const kroki = [];
              if (cal > 0) kroki.push(`Zapisujemy $${cal}{,}(${okres}) = ${cal} + 0{,}(${okres})$ i zamieniamy na ułamek część okresową.`);
              kroki.push(
                `Niech $x = 0{,}(${okres})$. Okres ma ${m === 1 ? "1 cyfrę" : "2 cyfry"}, więc mnożymy przez $${10 ** m}$: $${10 ** m}x = ${okres}{,}(${okres})$.`,
                `Odejmujemy stronami: $${10 ** m}x - x = ${okres}$, czyli $${mian}x = ${okres}$, stąd $x = \\frac{${okres}}{${mian}}$.`,
              );
              const fr = q(okres, mian);
              if (cal > 0) kroki.push(`$${cal}{,}(${okres}) = ${cal} + ${fr.tex()} = ${v.tex()}$.`);
              else kroki.push(`$x = ${ulamek}${fr.tex() === ulamek ? "" : ` = ${fr.tex()}`}$.`);
              return {
                tresc: `Zapisz liczbę $${cal}{,}(${okres})$ w postaci ułamka zwykłego (lub liczby całkowitej).`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wartość liczby" }],
                odpowiedz: { w: v },
                wynik: `$${v.tex()}$`,
                rozwiazanie: kroki,
              };
            }
          },
        },
        {
          id: "liczby-zbior",
          nazwa: "Do jakiego zbioru",
          opis: "Wskaż najmniejszy ze zbiorów N, C, W, NW, do którego należy podana liczba.",
          generuj(r) {
            // t – zapis, u – uproszczenie (albo null), w – wyjaśnienie
            const N = [["7", null], ["0", null], ["\\sqrt{25}", "5"], ["\\sqrt{81}", "9"], ["\\frac{12}{4}", "3"], ["\\frac{20}{5}", "4"], ["\\sqrt{100}", "10"], ["\\frac{36}{9}", "4"]];
            const C = [["-5", null], ["-\\sqrt{16}", "-4"], ["\\frac{-18}{3}", "-6"], ["-\\sqrt{49}", "-7"], ["-\\frac{20}{4}", "-5"], ["\\frac{-24}{6}", "-4"]];
            const W = [["\\frac{3}{7}", null], ["-\\frac{5}{2}", null], ["0{,}25", "\\frac{1}{4}"], ["-1{,}5", "-\\frac{3}{2}"], ["0{,}(3)", "\\frac{1}{3}"], ["2{,}(18)", "\\frac{24}{11}"], ["\\frac{7}{9}", null], ["-0{,}8", "-\\frac{4}{5}"]];
            const NW = [["\\sqrt{2}", null], ["\\sqrt{7}", null], ["\\pi", null], ["-\\sqrt{3}", null], ["\\sqrt{20}", null], ["2\\sqrt{3}", null], ["\\frac{\\sqrt{2}}{2}", null], ["\\sqrt{50}", null]];
            const kat = r.int(0, 3);
            const [t, u] = r.pick([N, C, W, NW][kat]);
            const opisy = [
              "To liczba naturalna (całkowita nieujemna), więc najmniejszym zbiorem jest $\\mathbb{N}$.",
              "To liczba całkowita ujemna, więc nie jest naturalna. Najmniejszym zbiorem jest $\\mathbb{C}$.",
              "To ułamek, który nie jest liczbą całkowitą (rozwinięcie skończone lub okresowe), więc najmniejszym zbiorem jest $\\mathbb{W}$.",
              "Jej rozwinięcie dziesiętne jest nieskończone i nieokresowe, więc jest niewymierna: $\\mathrm{NW}$.",
            ];
            const rozwiazanie = [];
            if (u !== null) rozwiazanie.push(`Upraszczamy zapis: $${t} = ${u}$.`);
            rozwiazanie.push(opisy[kat]);
            return {
              tresc: `Wskaż najmniejszy z podanych zbiorów, do którego należy liczba $${t}$.`,
              pola: [{ id: "k", typ: "wybor", etykieta: "Zbiór", opcje: ["$\\mathbb{N}$", "$\\mathbb{C}$", "$\\mathbb{W}$", "$\\mathrm{NW}$"] }],
              odpowiedz: { k: kat },
              wynik: `$${["\\mathbb{N}", "\\mathbb{C}", "\\mathbb{W}", "\\mathrm{NW}"][kat]}$`,
              rozwiazanie,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 1.4–1.5
    {
      id: "przedzialy",
      nazwa: "Przedziały. Liczby naturalne i całkowite",
      sciaga: [
        {
          nazwa: "Przedziały ograniczone",
          slownie: "Przedział to zbiór liczb rzeczywistych leżących między dwoma końcami. Nawias okrągły oznacza, że koniec nie należy do przedziału, a ostry – że należy.",
          tex: "(a,b)\\qquad\\langle a,b\\rangle\\qquad(a,b\\rangle\\qquad\\langle a,b)",
          litery: "$a<b$ – końce przedziału.",
          przyklad: "$(-1,4\\rangle$ to liczby $x$, dla których $-1<x\\le4$: liczba $4$ należy do przedziału, a $-1$ nie.",
          uwaga: "Sprawdzaj końce: liczba $2$ nie należy do $(2,5)$, ale należy do $\\langle2,5)$.",
        },
        {
          nazwa: "Przedziały nieograniczone",
          slownie: "Gdy przedział nie ma końca z jednej strony, wpisujemy $\\infty$ albo $-\\infty$. Przy nieskończoności zawsze jest nawias okrągły, bo to nie jest liczba.",
          tex: "(a,\\infty)\\qquad\\langle a,\\infty)\\qquad(-\\infty,b)\\qquad(-\\infty,b\\rangle",
          przyklad: "$x\\ge3$ to $\\langle3,\\infty)$, a $x<-2$ to $(-\\infty,-2)$. Cała oś to $(-\\infty,\\infty)=\\mathbb{R}$.",
          uwaga: "Nie piszemy $\\langle3,\\infty\\rangle$ – nieskończoność nie jest liczbą i nie może należeć do przedziału.",
        },
        {
          nazwa: "Suma, iloczyn i różnica",
          slownie: "Zaznacz oba przedziały na osi. Iloczyn to część wspólna, suma to wszystko, co leży w którymś z nich. Przy wspólnym końcu sprawdź, czy należy do wyniku.",
          przyklad: "Dla $A=(-2,3\\rangle$ i $B=\\langle1,5)$: $A\\cap B=\\langle1,3\\rangle$, $A\\cup B=(-2,5)$, $A\\setminus B=(-2,1)$.",
          uwaga: "Gdy przedziały nie mają punktów wspólnych, iloczyn jest zbiorem pustym, a suma składa się z dwóch części, np. $(0,1)\\cup(2,3)$.",
        },
        {
          nazwa: "Liczby całkowite w przedziale",
          slownie: "Aby wypisać liczby całkowite z przedziału, ustal pierwszą i ostatnią z nich, pamiętając o tym, które końce należą do przedziału. Potem wypisz je po kolei.",
          tex: "n-m+1",
          litery: "Liczb całkowitych od $m$ do $n$ włącznie ($m\\le n$) jest $n-m+1$.",
          przyklad: "W przedziale $(-2{,}5;\\,1\\rangle$ są liczby całkowite $-2,-1,0,1$ – cztery liczby.",
          uwaga: "Liczb od $3$ do $7$ włącznie jest $5$, a nie $4$. Trzeba policzyć też pierwszą z nich.",
        },
        {
          nazwa: "Parzyste, nieparzyste, reszty",
          slownie: "Każdą liczbę całkowitą można zapisać w postaci $2k$ (parzysta) albo $2k+1$ (nieparzysta), gdzie $k$ jest całkowite. Dzieląc przez $3$, otrzymujemy resztę $0$, $1$ albo $2$.",
          tex: "2k\\qquad2k+1\\qquad3k\\qquad3k+1\\qquad3k+2",
          litery: "$k$ – dowolna liczba całkowita.",
          przyklad: "$17=3\\cdot5+2$ daje resztę $2$ z dzielenia przez $3$. Suma nieparzystych $(2k+1)+(2l+1)=2(k+l+1)$ jest parzysta.",
          uwaga: "Zero jest liczbą parzystą, bo $0=2\\cdot0$.",
        },
      ],
      jak: [
        "Zamień nierówność na przedział: sprawdź, które końce należą do zbioru, a które nie.",
        "Zaznacz każdy przedział innym kolorem na osi liczbowej.",
        "Dla sumy bierz wszystko, co jest pokolorowane; dla iloczynu – tylko to, co pokolorowane dwa razy.",
        "Przy wspólnym końcu sprawdź osobno, czy należy do wyniku. Wynik zapisz przedziałem.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Zbiór $\\{x\\in\\mathbb{R}:\\,-3\\le x<2\\}$ jest równy przedziałowi: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-3,2)$", "$\\langle-3,2)$", "$(-3,2\\rangle$", "$\\langle-3,2\\rangle$"],
          poprawna: 1,
        },
        {
          nr: "16",
          tresc: "Przedział $(-\\infty,4\\rangle$ to zbiór liczb rzeczywistych $x$ spełniających warunek: **Wybierz właściwą odpowiedź.**",
          opcje: ["$x<4$", "$x>4$", "$x\\le4$", "$x\\ge4$"],
          poprawna: 2,
        },
        {
          nr: "17",
          tresc: "Dane są przedziały $A=\\langle-4,1)$ i $B=(-1,6\\rangle$. Zbiór $A\\cap B$ jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-1,1)$", "$\\langle-1,1)$", "$\\langle-4,6\\rangle$", "$(-1,1\\rangle$"],
          poprawna: 0,
        },
        {
          nr: "18",
          tresc: "Dane są przedziały $A=(-2,3\\rangle$ i $B=\\langle3,7)$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$A\\cap B=\\{3\\}$", litery: "PF", poprawna: 0 },
            { tekst: "$-2\\in A$", litery: "PF", poprawna: 1 },
            { tekst: "$A\\cup B=(-2,7\\rangle$", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "19",
          tresc: "Liczba liczb całkowitych należących do przedziału $(-3{,}2;\\,4\\rangle$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$9$", "$6$", "$8$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 3,
          tresc: "Dane są przedziały $A=\\langle-3,2)$ i $B=(0,5\\rangle$. Wyznacz $A\\cup B$, $A\\cap B$, $A\\setminus B$ i $B\\setminus A$. **Zapisz obliczenia.**",
          rozwiazanie: "Zaznaczamy oba przedziały na osi: $A$ zaczyna się w $-3$ (z tą liczbą) i kończy w $2$ (bez niej), a $B$ zaczyna się w $0$ (bez niej) i kończy w $5$ (z tą liczbą).\n\nSuma: od najmniejszego lewego końca do największego prawego: $A\\cup B=\\langle-3,5\\rangle$.\n\nIloczyn: od $0$ do $2$, bez obu końców: $A\\cap B=(0,2)$.\n\nRóżnica $A\\setminus B$: z $A$ usuwamy liczby większe od $0$, ale liczba $0$ nie należy do $B$, więc zostaje: $A\\setminus B=\\langle-3,0\\rangle$.\n\nRóżnica $B\\setminus A$: z $B$ usuwamy liczby mniejsze od $2$, a liczba $2$ nie należy do $A$, więc zostaje: $B\\setminus A=\\langle2,5\\rangle$.\n\nOdpowiedź: $A\\cup B=\\langle-3,5\\rangle$, $A\\cap B=(0,2)$, $A\\setminus B=\\langle-3,0\\rangle$, $B\\setminus A=\\langle2,5\\rangle$.",
        },
        {
          nr: "21",
          punkty: 2,
          tresc: "Wykaż, że suma trzech kolejnych liczb całkowitych jest podzielna przez $3$. **Zapisz obliczenia.**",
          rozwiazanie: "Niech $n$ będzie liczbą całkowitą. Trzy kolejne liczby całkowite to $n$, $n+1$, $n+2$.\n\nIch suma: $n+(n+1)+(n+2)=3n+3$.\n\nWyłączamy $3$: $3n+3=3(n+1)$.\n\nLiczba $n+1$ jest całkowita, więc $3(n+1)$ jest wielokrotnością $3$.\n\nOdpowiedź: suma jest równa $3(n+1)$, więc dzieli się przez $3$.",
        },
      ],
      generatory: [
        {
          id: "przedzialy-dzialanie",
          nazwa: "Suma lub iloczyn",
          opis: "Wskaż sumę albo iloczyn dwóch przedziałów o końcach całkowitych.",
          generuj(r) {
            const tex = (p) => przedzial(p.l, p.r, p.lc, p.rc);
            const iloczyn = (A, B) => {
              const l = Math.max(A.l, B.l), p = Math.min(A.r, B.r);
              const lc = A.l === B.l ? A.lc && B.lc : A.l > B.l ? A.lc : B.lc;
              const rc = A.r === B.r ? A.rc && B.rc : A.r < B.r ? A.rc : B.rc;
              return l < p ? { l, r: p, lc, rc } : null;
            };
            const suma = (A, B) => {
              const [P, R] = A.l <= B.l ? [A, B] : [B, A];
              if (!(P.r > R.l || (P.r === R.l && (P.rc || R.lc)))) return null;
              const l = Math.min(A.l, B.l), p = Math.max(A.r, B.r);
              const lc = A.l === B.l ? A.lc || B.lc : A.l < B.l ? A.lc : B.lc;
              const rc = A.r === B.r ? A.rc || B.rc : A.r > B.r ? A.rc : B.rc;
              return { l, r: p, lc, rc };
            };
            for (;;) {
              const losowy = () => {
                const l = r.int(-6, 4);
                return { l, r: l + r.int(2, 7), lc: r.chance(), rc: r.chance() };
              };
              const A = losowy(), B = losowy();
              const op = r.chance() ? "iloczyn" : "suma";
              const W = op === "iloczyn" ? iloczyn(A, B) : suma(A, B);
              if (!W) continue;
              const inna = op === "iloczyn" ? suma(A, B) : iloczyn(A, B);
              const poprawny = tex(W);
              const zle = [];
              const flipL = tex({ ...W, lc: !W.lc }), flipR = tex({ ...W, rc: !W.rc }), flipLR = tex({ ...W, lc: !W.lc, rc: !W.rc });
              if (inna && tex(inna) !== poprawny) {
                zle.push(tex(inna));
                zle.push(...r.shuffle([flipL, flipR, flipLR]).slice(0, 2));
              } else {
                zle.push(flipL, flipR, flipLR);
              }
              const opcje = r.shuffle([poprawny, ...zle]);
              if (new Set(opcje).size !== 4) continue;
              const nazwaOp = op === "iloczyn" ? "iloczyn" : "suma";
              const opis = (flag) => (op === "iloczyn"
                ? (flag ? "należy do obu przedziałów, więc należy do wyniku" : "nie należy do jednego z przedziałów, więc nie należy do wyniku")
                : (flag ? "należy do co najmniej jednego z przedziałów, więc należy do wyniku" : "nie należy do żadnego z przedziałów, więc nie należy do wyniku"));
              return {
                tresc: `Dane są przedziały $A = ${tex(A)}$ i $B = ${tex(B)}$. Wskaż ${nazwaOp === "iloczyn" ? "iloczyn $A \\cap B$" : "sumę $A \\cup B$"}.`,
                pola: [{ id: "p", typ: "wybor", etykieta: "Przedział", opcje: opcje.map((o) => `$${o}$`) }],
                odpowiedz: { p: opcje.indexOf(poprawny) },
                wynik: `$${poprawny}$`,
                rozwiazanie: [
                  "Zaznaczamy oba przedziały na osi liczbowej.",
                  op === "iloczyn"
                    ? `Część wspólna zaczyna się w $${W.l}$ (większy z lewych końców) i kończy w $${W.r}$ (mniejszy z prawych końców).`
                    : `Suma zaczyna się w $${W.l}$ (mniejszy z lewych końców) i kończy w $${W.r}$ (większy z prawych końców).`,
                  `Liczba $${W.l}$ ${opis(W.lc)}. Liczba $${W.r}$ ${opis(W.rc)}.`,
                  `Wynik: $${poprawny}$.`,
                ],
              };
            }
          },
        },
        {
          id: "przedzialy-calkowite",
          nazwa: "Ile liczb całkowitych",
          opis: "Policz liczby całkowite należące do przedziału o końcach dziesiętnych.",
          generuj(r) {
            for (;;) {
              const l = r.chance(0.4) ? q(r.int(-5, 3)) : q(r.int(-45, 25), 10);
              const p = l.add(q(r.int(25, 90), 10));
              const lc = r.chance(), rc = r.chance();
              const calk = [];
              for (let i = Math.floor(l.valueOf()) - 1; i <= Math.ceil(p.valueOf()) + 1; i++) {
                const okL = lc ? q(i).cmp(l) >= 0 : q(i).cmp(l) > 0;
                const okP = rc ? q(i).cmp(p) <= 0 : q(i).cmp(p) < 0;
                if (okL && okP) calk.push(i);
              }
              if (calk.length < 3 || calk.length > 9) continue;
              const zapis = `${lc ? "\\langle " : "("}${dec(l)};\\, ${dec(p)}${rc ? "\\rangle" : ")"}`;
              return {
                tresc: `Ile liczb całkowitych należy do przedziału $${zapis}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba liczb całkowitych" }],
                odpowiedz: { w: calk.length },
                wynik: `$${calk.length}$`,
                rozwiazanie: [
                  `Lewy koniec $${dec(l)}$ ${lc ? "należy" : "nie należy"} do przedziału, a prawy koniec $${dec(p)}$ ${rc ? "należy" : "nie należy"}.`,
                  `Liczby całkowite z przedziału: $${calk.join(", ")}$.`,
                  `Jest ich $${calk.length}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 1.6–1.7
    {
      id: "rownania",
      nazwa: "Równania. Metoda równań równoważnych",
      sciaga: [
        {
          nazwa: "Równania równoważne",
          slownie: "Dwa równania są równoważne, gdy mają te same rozwiązania. Rozwiązywanie polega na zamianie równania na coraz prostsze równania równoważne: do obu stron dodajemy tę samą liczbę albo obie strony mnożymy przez tę samą liczbę różną od $0$.",
          tex: "A=B\\iff A+c=B+c\\qquad A=B\\iff cA=cB\\ (c\\neq0)",
          litery: "$A$, $B$ – wyrażenia, $c$ – liczba.",
          przyklad: "$3x+5=11$: odejmujemy $5$, dostajemy $3x=6$; dzielimy przez $3$, dostajemy $x=2$.",
          uwaga: "Mnożenie przez $0$ (albo przez wyrażenie, które może być równe $0$) może zmienić zbiór rozwiązań.",
        },
        {
          nazwa: "Równanie liniowe",
          slownie: "Wyrazy z niewiadomą zbieramy po jednej stronie, liczby po drugiej, a potem dzielimy przez współczynnik przy $x$. Przenosząc wyraz na drugą stronę, zmieniamy jego znak.",
          tex: "ax=b\\Rightarrow x=\\frac{b}{a}\\ (a\\neq0)",
          litery: "$a$ – współczynnik przy $x$, $b$ – liczba po prawej stronie.",
          przyklad: "$5x-3=2x+9$: $5x-2x=9+3$, $3x=12$, $x=4$.",
          uwaga: "Przy przenoszeniu zmieniaj znak: z $5x-3=2x+9$ nie wynika $5x-2x=9-3$.",
        },
        {
          nazwa: "Sprzeczne i tożsamościowe",
          slownie: "Gdy po uproszczeniu niewiadoma znika i zostaje równość fałszywa, równanie jest sprzeczne i nie ma rozwiązań. Gdy zostaje równość prawdziwa, równanie jest tożsamościowe, a rozwiązaniem jest każda liczba rzeczywista.",
          tex: "0\\cdot x=5\\Rightarrow x\\in\\emptyset\\qquad0\\cdot x=0\\Rightarrow x\\in\\mathbb{R}",
          przyklad: "$2(x+1)=2x+5$ daje $2x+2=2x+5$, czyli $2=5$ – brak rozwiązań. $3x+3=3(x+1)$ daje $0=0$ – każda liczba.",
          uwaga: "Nie myl przypadków: $0\\cdot x=5$ nie ma rozwiązań, a $0\\cdot x=0$ ma ich nieskończenie wiele.",
        },
        {
          nazwa: "Równania z ułamkami",
          slownie: "Gdy niewiadoma jest w mianowniku, najpierw zapisz założenie, że mianowniki są różne od $0$, a potem mnóż „na krzyż”. Przy ułamkach liczbowych mnóż obie strony przez wspólny mianownik.",
          tex: "\\frac{a}{b}=\\frac{c}{d}\\iff ad=bc\\ (b,d\\neq0)",
          przyklad: "$\\frac{3}{x-1}=\\frac{6}{x+2}$, $x\\neq1$, $x\\neq-2$: $3(x+2)=6(x-1)$, $3x+6=6x-6$, $x=4$.",
          uwaga: "Po obliczeniu sprawdź, czy wynik spełnia założenie o mianownikach.",
        },
        {
          nazwa: "Równanie iloczynowe",
          slownie: "Iloczyn jest równy zero, gdy co najmniej jeden z czynników jest równy zero. Rozwiązujemy więc osobno każdy czynnik.",
          tex: "A\\cdot B=0\\iff A=0\\text{ lub }B=0",
          przyklad: "$(x-2)(2x+3)=0$: $x-2=0$ lub $2x+3=0$, czyli $x=2$ lub $x=-\\frac{3}{2}$.",
          uwaga: "To działa tylko dla zera po prawej stronie: z $(x-1)(x-2)=6$ nie wynika, że $x-1=6$ lub $x-2=6$.",
        },
      ],
      jak: [
        "Pozbądź się mianowników (mnożąc przez wspólny mianownik albo „na krzyż”) i nawiasów.",
        "Zbierz wyrazy z $x$ po jednej stronie, a liczby po drugiej, zmieniając znaki przy przenoszeniu.",
        "Podziel przez współczynnik przy $x$. Gdy $x$ znika, sprawdź: równość fałszywa – brak rozwiązań, prawdziwa – każda liczba.",
        "Sprawdź wynik, podstawiając do wyjściowego równania (przy ułamkach także założenie o mianowniku).",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Rozwiązaniem równania $4x-7=2x+9$ jest liczba: **Wybierz właściwą odpowiedź.**",
          opcje: ["$1$", "$16$", "$8$", "$-8$"],
          poprawna: 2,
        },
        {
          nr: "23",
          tresc: "Równanie $3(x-2)=3x+4$. **Wybierz właściwą odpowiedź.**",
          opcje: ["ma dokładnie jedno rozwiązanie", "nie ma rozwiązań", "ma dokładnie dwa rozwiązania", "ma nieskończenie wiele rozwiązań"],
          poprawna: 1,
        },
        {
          nr: "24",
          tresc: "Rozwiązaniem równania $\\frac{x+1}{2}-\\frac{x}{3}=2$ jest liczba: **Wybierz właściwą odpowiedź.**",
          opcje: ["$-1$", "$11$", "$\\frac{9}{5}$", "$9$"],
          poprawna: 3,
        },
        {
          nr: "25",
          tresc: "Równanie $(x-3)(2x+4)=0$ ma rozwiązania: **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$ i $-2$", "$-3$ i $2$", "$3$ i $2$", "$-3$ i $-2$"],
          poprawna: 0,
        },
        {
          nr: "26",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Równania $x=2$ i $x^2=4$ są równoważne.", litery: "PF", poprawna: 1 },
            { tekst: "Liczba $2$ jest rozwiązaniem równania $\\frac{x-2}{x-2}=1$.", litery: "PF", poprawna: 1 },
            { tekst: "Równanie $0\\cdot x=3$ nie ma rozwiązań.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Rozwiąż równanie $\\frac{5}{x-2}=\\frac{10}{x+1}$. **Zapisz obliczenia.**",
          rozwiazanie: "Założenie: mianowniki są różne od $0$, więc $x\\neq2$ i $x\\neq-1$.\n\nMnożymy na krzyż: $5(x+1)=10(x-2)$.\n\nRozwijamy nawiasy: $5x+5=10x-20$.\n\nPrzenosimy: $5+20=10x-5x$, czyli $25=5x$, stąd $x=5$.\n\nLiczba $5$ spełnia założenie ($5\\neq2$ i $5\\neq-1$).\n\nOdpowiedź: $x=5$.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "Rozwiąż równanie $\\frac{2x-1}{3}-\\frac{x+2}{4}=\\frac{x}{2}+1$. **Zapisz obliczenia.**",
          rozwiazanie: "Mnożymy obie strony przez wspólny mianownik $12$: $4(2x-1)-3(x+2)=6x+12$.\n\nRozwijamy nawiasy: $8x-4-3x-6=6x+12$, czyli $5x-10=6x+12$.\n\nPrzenosimy: $5x-6x=12+10$, czyli $-x=22$.\n\nStąd $x=-22$.\n\nSprawdzenie: lewa strona $\\frac{-45}{3}-\\frac{-20}{4}=-15+5=-10$, prawa strona $-11+1=-10$.\n\nOdpowiedź: $x=-22$.",
        },
      ],
      generatory: [
        {
          id: "rownania-liniowe",
          nazwa: "Równanie liniowe",
          opis: "Rozwiąż równanie liniowe: proste, z nawiasem albo z ułamkami.",
          generuj(r) {
            for (;;) {
              const typ = r.int(0, 2);
              if (typ === 0) {
                const a = r.int(2, 9), c = r.int(-4, 8), b = r.int(-12, 12), d = r.int(-12, 12);
                if (a === c) continue;
                const x = q(d - b, a - c);
                if (!ladna(x) || Math.abs(x.n) > 40) continue;
                const wart = x.mul(a).add(b);
                return {
                  tresc: `Rozwiąż równanie $${lin(a, b)} = ${lin(c, d)}$.`,
                  pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }],
                  odpowiedz: { x },
                  wynik: `$x = ${x.tex()}$`,
                  rozwiazanie: [
                    `Przenosimy wyrazy z $x$ na lewo, a liczby na prawo (zmieniając znaki): $${lin(a - c, 0)} = ${d - b}$.`,
                    ...(a - c === 1 ? [] : [dziel(a - c, x)]),
                    `Sprawdzenie: obie strony równania są równe $${wart.tex()}$.`,
                  ],
                };
              }
              if (typ === 1) {
                const k = r.int(2, 6), p = r.intBez(-6, 6, 0), b = r.intBez(-10, 10, 0), c = r.int(-3, 8), d = r.int(-12, 12);
                if (k === c) continue;
                const rozw = lin(k, k * p + b);
                const x = q(d - (k * p + b), k - c);
                if (!ladna(x) || Math.abs(x.n) > 40) continue;
                return {
                  tresc: `Rozwiąż równanie $${k}(${xp(p)}) ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${lin(c, d)}$.`,
                  pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }],
                  odpowiedz: { x },
                  wynik: `$x = ${x.tex()}$`,
                  rozwiazanie: [
                    `Rozwijamy nawias: $${rozw} = ${lin(c, d)}$.`,
                    `Przenosimy wyrazy z $x$ na lewo, a liczby na prawo: $${lin(k - c, 0)} = ${d - (k * p + b)}$.`,
                    ...(k - c === 1 ? [] : [dziel(k - c, x)]),
                  ],
                };
              }
              const m = r.int(2, 6), n = r.int(2, 6);
              if (m === n) continue;
              const L = nww(m, n);
              const minus = r.chance(0.4);
              const x = q(L * r.intBez(-3, 4, 0));
              const k = x.div(m).add(minus ? x.div(n).neg() : x.div(n));
              if (!k.calkowita) continue;
              const wsp = minus ? L / m - L / n : L / m + L / n;
              return {
                tresc: `Rozwiąż równanie $\\frac{x}{${m}} ${minus ? "-" : "+"} \\frac{x}{${n}} = ${k.tex()}$.`,
                pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }],
                odpowiedz: { x },
                wynik: `$x = ${x.tex()}$`,
                rozwiazanie: [
                  `Mnożymy obie strony przez wspólny mianownik $${L}$: $${lin(L / m, 0)} ${minus ? "-" : "+"} ${lin(L / n, 0)} = ${k.mul(L).tex()}$.`,
                  `Redukujemy wyrazy podobne: $${lin(wsp, 0)} = ${k.mul(L).tex()}$.`,
                  ...(wsp === 1 ? [] : [dziel(wsp, x)]),
                ],
              };
            }
          },
        },
        {
          id: "rownania-ulamek",
          nazwa: "Równanie z ułamkiem",
          opis: "Rozwiąż równanie, w którym niewiadoma jest w mianownikach, mnożąc na krzyż i pamiętając o założeniu.",
          generuj(r) {
            for (;;) {
              const a = r.int(1, 9), b = r.int(1, 9);
              const p = r.intBez(-6, 6, 0), s = r.intBez(-6, 6, 0);
              if (a === b || p === s) continue;
              const x = q(b * p - a * s, a - b);
              if (!ladna(x) || Math.abs(x.n) > 40) continue;
              if (!x.calkowita && r.chance(0.6)) continue;
              if (x.eq(-p) || x.eq(-s)) continue;
              return {
                tresc: `Rozwiąż równanie $\\frac{${a}}{${xp(p)}} = \\frac{${b}}{${xp(s)}}$.`,
                pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }],
                odpowiedz: { x },
                wynik: `$x = ${x.tex()}$`,
                rozwiazanie: [
                  `Założenie: mianowniki są różne od $0$, więc $x \\neq ${-p}$ i $x \\neq ${-s}$.`,
                  `Mnożymy na krzyż: $${a} \\cdot (${xp(s)}) = ${b} \\cdot (${xp(p)})$.`,
                  `Rozwijamy nawiasy: $${lin(a, a * s)} = ${lin(b, b * p)}$.`,
                  ...(a - b === 1
                    ? [`Przenosimy: $x = ${x.tex()}$ – to spełnia założenie.`]
                    : [`Przenosimy: $${lin(a - b, 0)} = ${b * p - a * s}$.`, `${dziel(a - b, x)} Ta liczba spełnia założenie.`]),
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 1.8
    {
      id: "nierownosci",
      nazwa: "Nierówność z jedną niewiadomą",
      sciaga: [
        {
          nazwa: "Nierówności równoważne",
          slownie: "Do obu stron nierówności możemy dodać tę samą liczbę albo pomnożyć (podzielić) obie strony przez tę samą liczbę dodatnią. Gdy mnożymy lub dzielimy przez liczbę ujemną, zmieniamy zwrot nierówności na przeciwny.",
          tex: "A<B\\iff A+c<B+c\\qquad A<B\\iff cA<cB\\ (c>0)\\qquad A<B\\iff cA>cB\\ (c<0)",
          litery: "$A$, $B$ – wyrażenia, $c$ – liczba.",
          przyklad: "$-2x<6$: dzielimy przez $-2$ i zmieniamy znak nierówności: $x>-3$.",
          uwaga: "Najczęstszy błąd: dzielenie przez liczbę ujemną bez zmiany zwrotu nierówności.",
        },
        {
          nazwa: "Nierówność liniowa",
          slownie: "Rozwiązujemy ją jak równanie liniowe, pilnując zwrotu przy dzieleniu przez liczbę ujemną. Rozwiązanie zapisujemy przedziałem i zaznaczamy na osi.",
          tex: "ax+b<c\\iff ax<c-b",
          przyklad: "$3x-4\\ge5x+2$: $-2x\\ge6$, więc $x\\le-3$, czyli $x\\in(-\\infty,-3\\rangle$.",
          uwaga: "Nierówność ostra daje przedział otwarty (nawias okrągły), a nieostra – domknięty (ostry).",
        },
        {
          nazwa: "Sprzeczne i tożsamościowe",
          slownie: "Gdy niewiadoma znika i zostaje nierówność prawdziwa, rozwiązaniem jest każda liczba rzeczywista. Gdy zostaje fałszywa, nierówność nie ma rozwiązań.",
          tex: "x\\in\\mathbb{R}\\qquad x\\in\\emptyset",
          przyklad: "$2x+1<2x+3$ daje $1<3$ – prawda, więc $x\\in\\mathbb{R}$. $2x+1>2x+3$ daje $1>3$ – fałsz, więc $x\\in\\emptyset$.",
        },
        {
          nazwa: "Nierówność podwójna",
          slownie: "Nierówność postaci $m<ax+b\\le n$ rozwiązujemy, wykonując to samo działanie na wszystkich trzech częściach naraz.",
          przyklad: "$-1<2x+3\\le9$: odejmujemy $3$, dostajemy $-4<2x\\le6$; dzielimy przez $2$: $-2<x\\le3$, czyli $x\\in(-2,3\\rangle$.",
          uwaga: "Dzieląc przez liczbę ujemną, odwracamy oba znaki i zamieniamy miejscami skrajne liczby.",
        },
        {
          nazwa: "Liczby całkowite z rozwiązania",
          slownie: "Najpierw rozwiąż nierówność, potem wybierz z przedziału liczby całkowite, uważając na to, czy koniec należy do zbioru.",
          przyklad: "Z $x<2{,}5$ największa całkowita to $2$. Z $x\\le3$ największa to $3$, a z $x<3$ – tylko $2$.",
          uwaga: "Dla $x>3$ najmniejsza liczba całkowita to $4$, a nie $3$.",
        },
      ],
      jak: [
        "Rozwiń nawiasy i pozbądź się ułamków (mnożąc przez dodatnią liczbę).",
        "Zbierz wyrazy z $x$ po jednej stronie, a liczby po drugiej.",
        "Podziel przez współczynnik przy $x$ – jeśli jest ujemny, zmień zwrot nierówności.",
        "Zapisz rozwiązanie przedziałem i w razie potrzeby wybierz liczby całkowite.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Zbiorem rozwiązań nierówności $5-2x>-3$ jest: **Wybierz właściwą odpowiedź.**",
          opcje: ["$(4,\\infty)$", "$(-\\infty,4)$", "$(-\\infty,-4)$", "$(-\\infty,4\\rangle$"],
          poprawna: 1,
        },
        {
          nr: "30",
          tresc: "Najmniejszą liczbą całkowitą spełniającą nierówność $3x+1>10$ jest: **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$2$", "$9$", "$4$"],
          poprawna: 3,
        },
        {
          nr: "31",
          tresc: "Nierówność $2(x-1)\\le4x+6$ jest równoważna nierówności: **Wybierz właściwą odpowiedź.**",
          opcje: ["$x\\ge-4$", "$x\\le-4$", "$x\\ge-2$", "$x\\le4$"],
          poprawna: 0,
        },
        {
          nr: "32",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Nierówność $-x<5$ jest równoważna nierówności $x<-5$.", litery: "PF", poprawna: 1 },
            { tekst: "Nierówność $x+5>x+2$ jest spełniona przez każdą liczbę rzeczywistą.", litery: "PF", poprawna: 0 },
            { tekst: "Liczba $-1$ spełnia nierówność $4-3x\\ge7$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "33",
          tresc: "Zbiorem rozwiązań nierówności $-3\\le2x-1<5$ jest przedział: **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\langle-2,6)$", "$(-1,3\\rangle$", "$\\langle-1,3)$", "$\\langle-1,3\\rangle$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 2,
          tresc: "Rozwiąż nierówność $\\frac{x+2}{3}\\le\\frac{3x-1}{4}$ i podaj najmniejszą liczbę całkowitą, która ją spełnia. **Zapisz obliczenia.**",
          rozwiazanie: "Mnożymy obie strony przez $12$ (liczbę dodatnią, więc zwrot się nie zmienia): $4(x+2)\\le3(3x-1)$.\n\nRozwijamy nawiasy: $4x+8\\le9x-3$.\n\nPrzenosimy: $4x-9x\\le-3-8$, czyli $-5x\\le-11$.\n\nDzielimy przez $-5$ i zmieniamy zwrot: $x\\ge\\frac{11}{5}=2{,}2$.\n\nNajmniejszą liczbą całkowitą, która jest nie mniejsza niż $2{,}2$, jest $3$.\n\nOdpowiedź: $x\\in\\langle\\frac{11}{5},\\infty)$, najmniejsza liczba całkowita to $3$.",
        },
        {
          nr: "35",
          punkty: 3,
          tresc: "Rozwiąż nierówność $-4<\\frac{3-2x}{2}\\le1$ i wypisz wszystkie liczby całkowite, które ją spełniają. **Zapisz obliczenia.**",
          rozwiazanie: "Mnożymy wszystkie trzy części przez $2$: $-8<3-2x\\le2$.\n\nOdejmujemy $3$: $-11<-2x\\le-1$.\n\nDzielimy przez $-2$, odwracamy oba znaki i zamieniamy miejscami skrajne liczby: $\\frac{1}{2}\\le x<\\frac{11}{2}$.\n\nZbiór rozwiązań: $x\\in\\langle\\frac{1}{2},\\frac{11}{2})$, czyli $\\langle0{,}5;\\,5{,}5)$.\n\nLiczby całkowite z tego przedziału: $1, 2, 3, 4, 5$.\n\nOdpowiedź: $x\\in\\langle\\frac{1}{2},\\frac{11}{2})$; liczby całkowite: $1, 2, 3, 4, 5$.",
        },
      ],
      generatory: [
        {
          id: "nierownosci-przedzial",
          nazwa: "Zbiór rozwiązań",
          opis: "Rozwiąż nierówność liniową i wskaż przedział rozwiązań (uwaga na dzielenie przez liczbę ujemną).",
          generuj(r) {
            const n = nierownoscLiniowa(r);
            const opcje = [
              przedzial("-\\infty", n.t.tex(), false, false),
              przedzial("-\\infty", n.t.tex(), false, true),
              przedzial(n.t.tex(), "\\infty", false, false),
              przedzial(n.t.tex(), "\\infty", true, false),
            ];
            const poprawny = n.dol ? (n.nieostra ? 1 : 0) : n.nieostra ? 3 : 2;
            const kolejnosc = r.shuffle([0, 1, 2, 3]);
            return {
              tresc: `Rozwiąż nierówność $${n.tekst}$. Wskaż zbiór jej rozwiązań.`,
              pola: [{ id: "p", typ: "wybor", etykieta: "Zbiór rozwiązań", opcje: kolejnosc.map((i) => `$${opcje[i]}$`) }],
              odpowiedz: { p: kolejnosc.indexOf(poprawny) },
              wynik: `$${opcje[poprawny]}$`,
              rozwiazanie: [...n.kroki, `Zbiór rozwiązań: $${opcje[poprawny]}$.`],
            };
          },
        },
        {
          id: "nierownosci-calkowite",
          nazwa: "Liczba całkowita",
          opis: "Znajdź największą albo najmniejszą liczbę całkowitą spełniającą nierówność liniową.",
          generuj(r) {
            const n = nierownoscLiniowa(r);
            const t = n.t, fl = Math.floor(t.valueOf()), ce = Math.ceil(t.valueOf());
            const wynik = n.dol ? (n.nieostra ? fl : ce - 1) : n.nieostra ? ce : fl + 1;
            const gran = n.dol
              ? `Największa liczba całkowita ${n.nieostra ? "nie większa niż" : "mniejsza od"} $${t.tex()}$ to $${wynik}$.`
              : `Najmniejsza liczba całkowita ${n.nieostra ? "nie mniejsza niż" : "większa od"} $${t.tex()}$ to $${wynik}$.`;
            return {
              tresc: `Podaj ${n.dol ? "największą" : "najmniejszą"} liczbę całkowitą spełniającą nierówność $${n.tekst}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba całkowita" }],
              odpowiedz: { w: wynik },
              wynik: `$${wynik}$`,
              rozwiazanie: [...n.kroki, gran],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 1.9–1.11
    {
      id: "procenty",
      nazwa: "Procenty. Punkty procentowe. Przybliżenia",
      sciaga: [
        {
          nazwa: "Procent liczby",
          slownie: "$p\\%$ liczby $a$ to $\\frac{p}{100}\\cdot a$. Aby sprawdzić, jakim procentem liczby $b$ jest liczba $a$, dzielimy $a$ przez $b$ i mnożymy przez $100\\%$.",
          tex: "p\\%\\cdot a=\\frac{p}{100}\\cdot a\\qquad\\frac{a}{b}\\cdot100\\%",
          litery: "$a$ – część, $b$ – całość (liczba, do której porównujemy), $p$ – liczba procent.",
          przyklad: "$15\\%$ z $80$ to $0{,}15\\cdot80=12$. Liczba $18$ to $\\frac{18}{60}\\cdot100\\%=30\\%$ liczby $60$.",
          uwaga: "Całością jest liczba, do której porównujemy: $20$ to $50\\%$ liczby $40$, ale $40$ to $200\\%$ liczby $20$.",
        },
        {
          nazwa: "Zwiększanie i zmniejszanie",
          slownie: "Zwiększenie o $p\\%$ to mnożenie przez $1+\\frac{p}{100}$, a zmniejszenie o $p\\%$ – przez $1-\\frac{p}{100}$. Kolejne zmiany mnożymy przez siebie.",
          tex: "a\\cdot\\left(1+\\frac{p}{100}\\right)\\qquad a\\cdot\\left(1-\\frac{p}{100}\\right)",
          litery: "$a$ – wartość początkowa, $p$ – liczba procent zmiany.",
          przyklad: "Cena $200$ zł po podwyżce o $30\\%$: $200\\cdot1{,}3=260$ zł. Po obniżce tej ceny o $30\\%$: $260\\cdot0{,}7=182$ zł.",
          uwaga: "Podwyżka o $30\\%$ i obniżka o $30\\%$ nie dają ceny początkowej ($182\\neq200$), bo obniżka liczona jest od wyższej ceny.",
        },
        {
          nazwa: "Punkty procentowe",
          slownie: "Różnicę dwóch wartości podanych w procentach mierzymy w punktach procentowych. Procentową zmianę liczymy od wartości początkowej.",
          tex: "p_2-p_1\\ \\text{p.p.}\\qquad\\frac{p_2-p_1}{p_1}\\cdot100\\%",
          litery: "$p_1$ – wartość początkowa (w procentach), $p_2$ – końcowa.",
          przyklad: "Poparcie wzrosło z $20\\%$ do $25\\%$: o $5$ punktów procentowych, czyli o $\\frac{5}{20}\\cdot100\\%=25\\%$.",
          uwaga: "Wzrost o $5$ punktów procentowych to nie to samo co wzrost o $5\\%$.",
        },
        {
          nazwa: "Błąd przybliżenia",
          slownie: "Błąd bezwzględny to odległość wartości dokładnej od przybliżonej. Błąd względny to błąd bezwzględny podzielony przez wartość dokładną, zwykle podawany w procentach.",
          tex: "\\Delta=|x-x_p|\\qquad\\delta=\\frac{\\Delta}{|x|}\\cdot100\\%",
          litery: "$x$ – wartość dokładna, $x_p$ – przybliżenie, $\\Delta$ – błąd bezwzględny, $\\delta$ – błąd względny.",
          przyklad: "Dla $x=8$ i $x_p=7{,}5$: $\\Delta=0{,}5$, a $\\delta=\\frac{0{,}5}{8}\\cdot100\\%=6{,}25\\%$.",
          uwaga: "Błąd względny dzielimy przez wartość dokładną, a nie przez przybliżenie.",
        },
        {
          nazwa: "Zaokrąglanie i szacowanie",
          slownie: "Przy zaokrąglaniu patrzymy na pierwszą odrzucaną cyfrę: $0$–$4$ – zostawiamy ostatnią cyfrę, $5$–$9$ – zwiększamy ją o $1$. Przybliżenie z niedomiarem jest mniejsze od wartości dokładnej, a z nadmiarem – większe.",
          przyklad: "$3{,}46\\approx3{,}5$ (z nadmiarem), $3{,}42\\approx3{,}4$ (z niedomiarem). Szacowanie: $4{,}96\\cdot19{,}8\\approx5\\cdot20=100$.",
          uwaga: "Liczy się tylko pierwsza odrzucana cyfra: $2{,}449\\approx2{,}4$, a nie $2{,}5$.",
        },
      ],
      jak: [
        "Ustal, co jest całością ($100\\%$) – to do niej porównujesz wszystko inne.",
        "Zmianę o $p\\%$ zamień na mnożnik $1\\pm\\frac{p}{100}$. Przy kilku zmianach pomnóż mnożniki, nie dodawaj procentów.",
        "Punkty procentowe: odejmij dwie wartości w procentach. Zmiana procentowa: podziel różnicę przez wartość początkową.",
        "Błąd względny: błąd bezwzględny podziel przez wartość dokładną i zamień na procenty.",
      ],
      zadania: [
        {
          nr: "36",
          tresc: "Liczba $35\\%$ liczby $240$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$840$", "$84$", "$8{,}4$", "$205$"],
          poprawna: 1,
        },
        {
          nr: "37",
          tresc: "Cenę towaru obniżono o $20\\%$, a następnie nową cenę podwyższono o $20\\%$. Cena końcowa jest w porównaniu z początkową: **Wybierz właściwą odpowiedź.**",
          opcje: ["wyższa o $4\\%$", "niższa o $2\\%$", "taka sama", "niższa o $4\\%$"],
          poprawna: 3,
        },
        {
          nr: "38",
          tresc: "Liczba $18$ stanowi $p\\%$ liczby $24$. Liczba $p$ jest równa: **Wybierz właściwą odpowiedź.**",
          opcje: ["$75$", "$25$", "$133\\frac{1}{3}$", "$6$"],
          poprawna: 0,
        },
        {
          nr: "39",
          tresc: "Stopa bezrobocia wzrosła z $5\\%$ do $6\\%$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Stopa bezrobocia wzrosła o $1$ punkt procentowy.", litery: "PF", poprawna: 0 },
            { tekst: "Stopa bezrobocia wzrosła o $20\\%$.", litery: "PF", poprawna: 0 },
            { tekst: "Stopa bezrobocia wzrosła o $1\\%$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "40",
          tresc: "Odcinek o długości $50$ cm zmierzono z błędem i otrzymano $48$ cm. Błąd względny tego pomiaru jest równy: **Wybierz właściwą odpowiedź.**",
          opcje: ["$2\\%$", "$\\frac{25}{6}\\%$", "$4\\%$", "$0{,}4\\%$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "41",
          punkty: 2,
          tresc: "Cena kurtki wzrosła z $240$ zł do $300$ zł. O ile procent wzrosła cena? Jakim procentem nowej ceny jest cena poprzednia? **Zapisz obliczenia.**",
          rozwiazanie: "Wzrost ceny: $300-240=60$ zł.\n\nProcent wzrostu liczymy od ceny początkowej: $\\frac{60}{240}\\cdot100\\%=25\\%$.\n\nCena poprzednia jako procent nowej: $\\frac{240}{300}\\cdot100\\%=80\\%$.\n\nOdpowiedź: cena wzrosła o $25\\%$, a cena poprzednia to $80\\%$ ceny nowej.",
        },
        {
          nr: "42",
          punkty: 3,
          tresc: "Bok kwadratu ma długość dokładnie $20$ cm, a zmierzono go jako $21$ cm. Oblicz błąd bezwzględny i względny pomiaru boku oraz błąd względny pola kwadratu obliczonego z tego pomiaru. **Zapisz obliczenia.**",
          rozwiazanie: "Błąd bezwzględny pomiaru boku: $\\Delta=|20-21|=1$ cm.\n\nBłąd względny pomiaru boku: $\\delta=\\frac{1}{20}\\cdot100\\%=5\\%$.\n\nPole dokładne: $20^2=400$ cm$^2$. Pole obliczone z pomiaru: $21^2=441$ cm$^2$. Błąd bezwzględny pola: $441-400=41$ cm$^2$.\n\nBłąd względny pola: $\\frac{41}{400}\\cdot100\\%=10{,}25\\%$.\n\nOdpowiedź: $\\Delta=1$ cm, błąd względny boku to $5\\%$, błąd względny pola to $10{,}25\\%$.",
        },
      ],
      generatory: [
        {
          id: "procenty-cena",
          nazwa: "Cena po zmianie",
          opis: "Podwyżka lub obniżka o procent: cena po zmianie, cena przed zmianą albo cena po dwóch zmianach.",
          generuj(r) {
            const RZECZY = ["roweru", "kurtki", "telefonu", "laptopa", "butów", "plecaka", "biletu", "zegarka"];
            const PROC = [5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80];
            const CENY = [100, 120, 160, 200, 240, 300, 400, 500, 800, 1000, 1200, 2000];
            const rzecz = r.pick(RZECZY);
            const tryb = r.pick(["po", "przed", "dwie"]);
            for (;;) {
              const a = r.pick(CENY);
              const p1 = r.pick(PROC), g1 = r.chance();
              const m1 = q(100 + (g1 ? p1 : -p1), 100);
              const c1 = m1.mul(a);
              if (!c1.calkowita) continue;
              const slowo = (g) => (g ? "podwyższono" : "obniżono");
              const mno = (p, g) => `1 ${g ? "+" : "-"} \\frac{${p}}{100} = ${dec(q(100 + (g ? p : -p), 100))}`;
              if (tryb === "po") {
                return {
                  tresc: `Cena ${rzecz} wynosiła $${a}$ zł. Cenę ${slowo(g1)} o $${p1}\\%$. Ile złotych wynosi teraz cena?`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Cena (zł)" }],
                  odpowiedz: { w: c1 },
                  wynik: `$${c1.tex()}$ zł`,
                  rozwiazanie: [`Mnożnik zmiany: $${mno(p1, g1)}$.`, `Nowa cena: $${a} \\cdot ${dec(m1)} = ${c1.tex()}$ zł.`],
                };
              }
              if (tryb === "przed") {
                return {
                  tresc: `Po ${g1 ? "podwyżce" : "obniżce"} o $${p1}\\%$ cena ${rzecz} wynosi $${c1.tex()}$ zł. Ile złotych wynosiła cena przed zmianą?`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Cena przed zmianą (zł)" }],
                  odpowiedz: { w: a },
                  wynik: `$${a}$ zł`,
                  rozwiazanie: [
                    `Nowa cena to ${g1 ? "" : "tylko "}$${dec(m1)}$ ceny początkowej ($${mno(p1, g1)}$). Niech $x$ będzie ceną przed zmianą: $${dec(m1)} \\cdot x = ${c1.tex()}$.`,
                    `Dzielimy: $x = ${c1.tex()} : ${dec(m1)} = ${a}$ zł.`,
                  ],
                };
              }
              const p2 = r.pick(PROC), g2 = r.chance();
              const m2 = q(100 + (g2 ? p2 : -p2), 100);
              const c2 = c1.mul(m2);
              if (!c2.calkowita || (g1 === g2 && p1 === p2)) continue;
              return {
                tresc: `Cena ${rzecz} wynosiła $${a}$ zł. Najpierw cenę ${slowo(g1)} o $${p1}\\%$, a potem nową cenę ${slowo(g2)} o $${p2}\\%$. Ile złotych wynosi cena końcowa?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Cena końcowa (zł)" }],
                odpowiedz: { w: c2 },
                wynik: `$${c2.tex()}$ zł`,
                rozwiazanie: [
                  `Po pierwszej zmianie: $${a} \\cdot ${dec(m1)} = ${c1.tex()}$ zł (mnożnik $${mno(p1, g1)}$).`,
                  `Po drugiej zmianie: $${c1.tex()} \\cdot ${dec(m2)} = ${c2.tex()}$ zł (mnożnik $${mno(p2, g2)}$).`,
                ],
              };
            }
          },
        },
        {
          id: "procenty-punkty",
          nazwa: "Punkty i procenty",
          opis: "Punkty procentowe, procentowa zmiana wartości i porównywanie dwóch liczb w procentach.",
          generuj(r) {
            const tryb = r.pick(["pp", "zmiana", "porownanie"]);
            if (tryb === "porownanie") {
              for (;;) {
                const y = r.pick([1000, 1200, 1500, 1600, 2000, 2400, 2500, 3000, 4000]);
                const pr = r.pick([10, 20, 25, 30, 40, 50, 60, 75, 100]);
                const x = q(y).mul(q(100 + pr, 100));
                if (!x.calkowita) continue;
                const [A, B] = r.pick([["Ani", "Basi"], ["Kasi", "Tomka"], ["Marka", "Ewy"]]);
                const wieksza = r.chance();
                const v = wieksza ? q(x.n - y, y) .mul(100) : q(x.n - y, x.n).mul(100);
                if (!ladna(v) || v.d > 4) continue;
                const [kogo, kogoBaza] = wieksza ? [A, B] : [B, A];
                return {
                  tresc: `Pensja ${A} wynosi $${x.n}$ zł, a pensja ${B} wynosi $${y}$ zł. O ile procent pensja ${kogo} jest ${wieksza ? "większa od" : "mniejsza od"} pensji ${kogoBaza}?`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Wynik w procentach" }],
                  odpowiedz: { w: v },
                  wynik: `$${dec(v)}\\%$`,
                  rozwiazanie: [
                    `Różnica pensji: $${x.n} - ${y} = ${x.n - y}$ zł.`,
                    `Całością jest pensja ${kogoBaza} ($${wieksza ? y : x.n}$ zł), więc: $\\frac{${x.n - y}}{${wieksza ? y : x.n}} \\cdot 100\\% = ${dec(v)}\\%$.`,
                  ],
                };
              }
            }
            const KTO = [
              { k: "Poparcie dla kandydata", w: "wzrosło", s: "spadło" },
              { k: "Frekwencja w wyborach", w: "wzrosła", s: "spadła" },
              { k: "Stopa bezrobocia w mieście", w: "wzrosła", s: "spadła" },
              { k: "Oprocentowanie lokaty", w: "wzrosło", s: "spadło" },
            ];
            for (;;) {
              const p1 = r.pick([2, 4, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50]);
              const d = r.pick([1, 2, 3, 4, 5, 6, 8, 10]);
              const rosnie = r.chance();
              const p2 = rosnie ? p1 + d : p1 - d;
              if (p2 <= 0) continue;
              const kto = r.pick(KTO);
              const slowo = rosnie ? kto.w : kto.s;
              if (tryb === "pp") {
                return {
                  tresc: `${kto.k} ${slowo} z $${p1}\\%$ do $${p2}\\%$. O ile punktów procentowych ${slowo}?`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Punkty procentowe" }],
                  odpowiedz: { w: d },
                  wynik: `$${d}$ p.p.`,
                  rozwiazanie: ["Punkty procentowe to różnica dwóch wartości podanych w procentach.", `$${Math.max(p1, p2)} - ${Math.min(p1, p2)} = ${d}$ ${ppl(d)}.`],
                };
              }
              const v = q(d, p1).mul(100);
              if (!ladna(v) || v.d > 4) continue;
              return {
                tresc: `${kto.k} ${slowo} z $${p1}\\%$ do $${p2}\\%$. O ile procent ${slowo} (w stosunku do wartości początkowej)?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Zmiana w procentach" }],
                odpowiedz: { w: v },
                wynik: `$${dec(v)}\\%$`,
                rozwiazanie: [
                  `Zmiana: $${Math.max(p1, p2)} - ${Math.min(p1, p2)} = ${d}$ ${ppl(d)}.`,
                  `Procent zmiany liczymy od wartości początkowej: $\\frac{${d}}{${p1}} \\cdot 100\\% = ${dec(v)}\\%$.`,
                ],
              };
            }
          },
        },
        {
          id: "procenty-przyblizenia",
          nazwa: "Przybliżenia i błędy",
          opis: "Zaokrąglanie liczby oraz błąd bezwzględny i względny przybliżenia.",
          generuj(r) {
            const tryb = r.pick(["zaokraglanie", "bezwzgledny", "wzgledny"]);
            if (tryb === "zaokraglanie") {
              const miejsce = r.pick(["jedności", "części dziesiątych", "dziesiątek"]);
              const N = r.int(miejsce === "dziesiątek" ? 15000 : 1500, 98000);
              const x = q(N, 1000);
              const cyfra = miejsce === "jedności" ? Math.floor(N / 100) % 10 : miejsce === "części dziesiątych" ? Math.floor(N / 10) % 10 : Math.floor(N / 1000) % 10;
              const zaokr = (v) => Math.floor(v + 0.5);
              const wynik = miejsce === "jedności" ? q(zaokr(N / 1000)) : miejsce === "części dziesiątych" ? q(zaokr(N / 100), 10) : q(10 * zaokr(N / 10000));
              const odrzucana = miejsce === "jedności" ? "pierwsza cyfra po przecinku" : miejsce === "części dziesiątych" ? "druga cyfra po przecinku" : "cyfra jedności";
              return {
                tresc: `Zaokrąglij liczbę $${dec(x)}$ do ${miejsce}.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba po zaokrągleniu" }],
                odpowiedz: { w: wynik },
                wynik: `$${dec(wynik)}$`,
                rozwiazanie: [
                  `Pierwsza odrzucana cyfra (${odrzucana}) to $${cyfra}$.`,
                  cyfra >= 5 ? "Ta cyfra jest równa co najmniej $5$, więc ostatnią zostawianą cyfrę zwiększamy o $1$." : "Ta cyfra jest mniejsza od $5$, więc ostatnią zostawianą cyfrę zostawiamy bez zmian.",
                  `$${dec(x)} \\approx ${dec(wynik)}$.`,
                ],
              };
            }
            const KONTEKST = [
              ["Długość rury wynosi dokładnie", "a pomiar pokazał", "m"],
              ["Masa ładunku wynosi dokładnie", "a waga wskazała", "kg"],
              ["Długość trasy wynosi dokładnie", "a w nawigacji zapisano", "km"],
            ];
            for (;;) {
              const x = q(r.pick([4, 5, 8, 10, 16, 20, 25, 40, 50, 80, 100, 125, 200, 250, 400, 500]));
              const delta = r.pick([q(1), q(2), q(4), q(5), q(10), q(25), q(1, 2), q(1, 4), q(1, 10), q(5, 2)]);
              const xp = r.chance() ? x.add(delta) : x.sub(delta);
              if (xp.n <= 0 || delta.mul(4).cmp(x) > 0) continue;
              const blad = delta;
              const wz = blad.div(x).mul(100);
              const [k1, k2, jedn] = r.pick(KONTEKST);
              const opisDane = `${k1} $${dec(x)}$ ${jedn}, ${k2} $${dec(xp)}$ ${jedn}.`;
              const krokDelta = `Błąd bezwzględny: $\\Delta = |x - x_p| = |${dec(x)} - ${dec(xp)}| = ${dec(blad)}$ ${jedn}.`;
              if (tryb === "bezwzgledny") {
                if (!ladna(blad)) continue;
                return {
                  tresc: `${opisDane} Oblicz błąd bezwzględny tego przybliżenia (w ${jedn}).`,
                  pola: [{ id: "w", typ: "liczba", etykieta: `Błąd bezwzględny (${jedn})` }],
                  odpowiedz: { w: blad },
                  wynik: `$${dec(blad)}$ ${jedn}`,
                  rozwiazanie: ["Błąd bezwzględny to odległość wartości dokładnej od przybliżonej.", krokDelta],
                };
              }
              if (!ladna(wz) || wz.d > 4) continue;
              return {
                tresc: `${opisDane} Oblicz błąd względny tego przybliżenia (w procentach).`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Błąd względny (w %)" }],
                odpowiedz: { w: wz },
                wynik: `$${dec(wz)}\\%$`,
                rozwiazanie: [
                  krokDelta,
                  `Błąd względny dzielimy przez wartość dokładną: $\\delta = \\frac{\\Delta}{x} \\cdot 100\\% = \\frac{${dec(blad)}}{${dec(x)}} \\cdot 100\\% = ${dec(wz)}\\%$.`,
                ],
              };
            }
          },
        },
      ],
    },
  ],
};

// --- Nierówność liniowa (wspólna dla dwóch generatorów rozdziału)

const ODWROTNA = { "<": ">", ">": "<", "\\le": "\\ge", "\\ge": "\\le" };

/** Losowa nierówność ax + b ⋄ cx + d z „ładnym” progiem; zwraca tekst, próg t, kierunek i kroki rozwiązania. */
function nierownoscLiniowa(r) {
  for (;;) {
    const a = r.intBez(-6, 8, 0), c = r.int(-6, 8), b = r.int(-12, 12), d = r.int(-12, 12);
    if (a === c) continue;
    const rel = r.pick(["<", "\\le", ">", "\\ge"]);
    const t = q(d - b, a - c);
    if (!ladna(t) || Math.abs(t.n) > 30) continue;
    const ujemny = a - c < 0;
    const wynRel = ujemny ? ODWROTNA[rel] : rel;
    return {
      tekst: `${lin(a, b)} ${rel} ${lin(c, d)}`,
      t,
      dol: wynRel === "<" || wynRel === "\\le",
      nieostra: wynRel === "\\le" || wynRel === "\\ge",
      kroki: [
        `Przenosimy wyrazy z $x$ na lewo, a liczby na prawo (zmieniając znaki): $${lin(a - c, 0)} ${rel} ${d - b}$.`,
        a - c === 1
          ? `Stąd $x ${wynRel} ${t.tex()}$.`
          : `${a - c === -1 ? "Mnożymy obie strony przez $-1$" : `Dzielimy przez $${a - c}$`}${ujemny ? " – to liczba ujemna, więc zmieniamy zwrot nierówności" : ""}: $x ${wynRel} ${t.tex()}$.`,
      ],
    };
  }
}
