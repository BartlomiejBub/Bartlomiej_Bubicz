// Klasa 5 (szkoła podstawowa) · rozdział II „Figury geometryczne” – Matematyka z kluczem 5 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// --- Pomocnicze (tylko dla tego pliku)

/** Miara kąta w LaTeX: st(35) = "35^\circ". */
const st = (n) => `${n}^\\circ`;

/** Lista po polsku: "$A$, $B$ i $C$". */
const lista = (a) => (a.length === 1 ? a[0] : `${a.slice(0, -1).join(", ")} i ${a[a.length - 1]}`);

/** Litery na nazwy punktów i wierzchołków. */
const LITERY = [["A", "B", "C", "D", "E", "F", "G"], ["K", "L", "M", "N", "P", "R", "S"], ["P", "Q", "R", "S", "T", "U", "W"], ["M", "N", "O", "P", "Q", "R", "S"]];
const TROJKI = [["A", "B", "C"], ["K", "L", "M"], ["P", "Q", "R"]];

/** Rodzaje kątów według miary. */
const RODZAJE = ["ostry", "prosty", "rozwarty", "półpełny", "pełny"];

/** Rodzina czworokątów: kto jest czyim szczególnym przypadkiem. */
const FIG = ["kwadrat", "prostokąt", "romb", "równoległobok", "trapez", "czworokąt"];
const NAR = { kwadrat: "kwadratem", prostokąt: "prostokątem", romb: "rombem", równoległobok: "równoległobokiem", trapez: "trapezem", czworokąt: "czworokątem" };
const JEST = { kwadrat: ["prostokąt", "romb"], prostokąt: ["równoległobok"], romb: ["równoległobok"], równoległobok: ["trapez"], trapez: ["czworokąt"], czworokąt: [] };
const CECHA = {
  kwadrat: "ma wszystkie boki równe i wszystkie kąty proste",
  prostokąt: "ma wszystkie kąty proste",
  romb: "ma wszystkie boki równe",
  równoległobok: "ma dwie pary boków równoległych",
  trapez: "ma co najmniej jedną parę boków równoległych",
};

/** Najkrótsza droga „jest szczególnym przypadkiem” od x do y albo null. */
function sciezka(x, y) {
  const kolejka = [[x]];
  while (kolejka.length) {
    const p = kolejka.shift();
    const ost = p[p.length - 1];
    if (ost === y) return p;
    for (const n of JEST[ost]) if (!p.includes(n)) kolejka.push([...p, n]);
  }
  return null;
}

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 1–2
    {
      id: "proste-i-katy",
      nazwa: "Proste, półproste i rodzaje kątów",
      sciaga: [
        {
          nazwa: "Prosta, półprosta, odcinek",
          slownie: "Prosta nie ma początku ani końca. Półprosta ma początek, ale nie ma końca. Odcinek ma początek i koniec, więc możemy zmierzyć jego długość.",
          przyklad: "Promień latarki to półprosta: zaczyna się w żarówce i biegnie w jedną stronę. Linia między dwoma słupkami bramki to odcinek.",
          uwaga: "Długość mierzymy tylko dla odcinka. Prostej i półprostej nie da się zmierzyć, bo się nie kończą.",
        },
        {
          nazwa: "Proste równoległe i prostopadłe",
          slownie: "Proste równoległe nigdy się nie spotykają, jak szyny kolejowe. Proste prostopadłe przecinają się pod kątem prostym, jak sąsiednie krawędzie kartki.",
          tex: "a\\parallel b\\qquad a\\perp b",
          litery: "$a\\parallel b$ – proste $a$ i $b$ są równoległe, $a\\perp b$ – proste $a$ i $b$ są prostopadłe.",
          przyklad: "Przeciwległe krawędzie kartki leżą na prostych równoległych, a sąsiednie – na prostych prostopadłych.",
          uwaga: "Proste równoległe są zawsze w tej samej odległości od siebie i nie mają żadnego wspólnego punktu.",
        },
        {
          nazwa: "Dwie proste prostopadłe do trzeciej",
          slownie: "Dwie proste prostopadłe do tej samej prostej są równoległe.",
          tex: "a\\perp c,\\ b\\perp c\\qquad\\Rightarrow\\qquad a\\parallel b",
          litery: "$a$, $b$, $c$ – proste leżące na jednej płaszczyźnie (na kartce).",
          przyklad: "Lewa i prawa krawędź kartki są prostopadłe do dolnej krawędzi, więc są równoległe do siebie.",
        },
        {
          nazwa: "Prosta prostopadła do dwóch równoległych",
          slownie: "Prosta prostopadła do jednej z dwóch prostych równoległych jest prostopadła także do drugiej.",
          tex: "a\\parallel b,\\ c\\perp a\\qquad\\Rightarrow\\qquad c\\perp b",
          litery: "$a$, $b$, $c$ – proste leżące na jednej płaszczyźnie (na kartce).",
          przyklad: "Górna i dolna krawędź kartki są równoległe. Lewa krawędź jest prostopadła do górnej, więc jest też prostopadła do dolnej.",
        },
        {
          nazwa: "Rodzaje kątów",
          slownie: "Kąt prosty ma $90^\\circ$, jak róg kartki. Ostry jest mniejszy od prostego, a rozwarty – większy od prostego, ale mniejszy od półpełnego. Półpełny ma $180^\\circ$, a pełny $360^\\circ$.",
          tex: "\\text{ostry}<90^\\circ\\qquad\\text{prosty}=90^\\circ\\qquad90^\\circ<\\text{rozwarty}<180^\\circ\\qquad\\text{półpełny}=180^\\circ\\qquad\\text{pełny}=360^\\circ",
          przyklad: "Kąt $45^\\circ$ jest ostry, $90^\\circ$ – prosty, $120^\\circ$ – rozwarty, $180^\\circ$ – półpełny, a $360^\\circ$ – pełny.",
          uwaga: "Kąt $90^\\circ$ nie jest ani ostry, ani rozwarty. Kąt $180^\\circ$ wygląda jak prosta, ale to kąt półpełny.",
        },
        {
          nazwa: "Jak nazywamy kąt",
          slownie: "Kąt ma dwa ramiona, które zaczynają się w jednym punkcie – wierzchołku. Zapisujemy go trzema literami, a litera wierzchołka stoi w środku.",
          tex: "\\angle ABC",
          litery: "$B$ – wierzchołek kąta, $A$ i $C$ – punkty leżące na ramionach.",
          przyklad: "W kącie $\\angle KLM$ wierzchołek to punkt $L$, a ramiona biegną w stronę punktów $K$ i $M$.",
        },
      ],
      jak: [
        "Przy kącie sprawdź, ile ma stopni, i porównaj z $90^\\circ$ oraz $180^\\circ$.",
        "Mniej niż $90^\\circ$ to kąt ostry, dokładnie $90^\\circ$ – prosty, między $90^\\circ$ a $180^\\circ$ – rozwarty.",
        "Przy prostych sprawdź, czy się spotkają: jeśli nie – są równoległe, jeśli spotkają się pod kątem prostym – są prostopadłe.",
        "Przy trzech prostych rozpisz po kolei, która z którą jest równoległa albo prostopadła.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Długość którego z tych elementów można zmierzyć linijką? **Wybierz właściwą odpowiedź.**",
          opcje: ["prostej", "półprostej", "odcinka", "żadnego z nich"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Który punkt jest wierzchołkiem kąta $\\angle PQR$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$P$", "$Q$", "$R$", "każdy z trzech punktów"],
          poprawna: 1,
        },
        {
          nr: "3",
          tresc: "Proste $a$ i $b$ są prostopadłe do prostej $c$, a prosta $d$ jest równoległa do prostej $c$. Wszystkie leżą na jednej kartce. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Proste $a$ i $b$ są równoległe.", litery: "PF", poprawna: 0 },
            { tekst: "Proste $a$ i $b$ są prostopadłe.", litery: "PF", poprawna: 1 },
            { tekst: "Prosta $d$ jest prostopadła do prostej $a$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "4",
          tresc: "Który z kątów jest rozwarty? **Wybierz właściwą odpowiedź.**",
          opcje: ["$140^\\circ$", "$90^\\circ$", "$35^\\circ$", "$180^\\circ$"],
          poprawna: 0,
        },
        {
          nr: "5",
          tresc: "Ile kątów prostych mieści się w kącie pełnym? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$3$", "$2$", "$4$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Na prostej leżą po kolei punkty $A$, $B$, $C$ i $D$. Wypisz wszystkie odcinki, których końcami są te punkty, i podaj, ile ich jest. **Zapisz obliczenia.**",
          rozwiazanie: "Odcinki zaczynające się w punkcie $A$: $AB$, $AC$, $AD$ – to $3$ odcinki.\n\nOdcinki zaczynające się w punkcie $B$ (bez $AB$, który już mamy): $BC$, $BD$ – to $2$ odcinki.\n\nZaczynający się w punkcie $C$ (nowy): $CD$ – to $1$ odcinek.\n\nRazem: $3 + 2 + 1 = 6$.\n\nOdpowiedź: jest $6$ odcinków: $AB$, $AC$, $AD$, $BC$, $BD$, $CD$.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Proste $a$ i $b$ są równoległe. Prosta $c$ jest prostopadła do prostej $a$, a prosta $d$ jest prostopadła do prostej $b$. Jak położone są względem siebie proste $c$ i $d$? **Uzasadnij odpowiedź.**",
          rozwiazanie: "Prosta $c$ jest prostopadła do $a$, a $a \\parallel b$, więc $c$ jest prostopadła także do $b$.\n\nProsta $d$ też jest prostopadła do $b$.\n\nProste $c$ i $d$ są więc obie prostopadłe do tej samej prostej $b$, a takie proste są równoległe.\n\nOdpowiedź: proste $c$ i $d$ są równoległe.",
        },
      ],
      generatory: [
        {
          id: "proste-liczba-odcinkow",
          nazwa: "Liczba odcinków",
          opis: "Na prostej leży kilka punktów. Ile jest odcinków o końcach w tych punktach?",
          generuj(r) {
            const n = r.int(3, 7);
            const lit = r.pick(LITERY).slice(0, n);
            const pary = [];
            for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) pary.push(`$${lit[i]}${lit[j]}$`);
            const w = (n * (n - 1)) / 2;
            const skladniki = [];
            for (let k = n - 1; k >= 1; k--) skladniki.push(k);
            const pkt = lista(lit.map((l) => `$${l}$`));
            const tresc = r.chance()
              ? `Na prostej zaznaczono po kolei punkty ${pkt}. Ile jest odcinków, których końcami są dwa z tych punktów?`
              : `Na prostej ${n <= 4 ? "leżą" : "leży"} ${n} ${n <= 4 ? "punkty" : "punktów"}: ${pkt}. Ile odcinków można narysować, wybierając za ich końce dwa z tych punktów?`;
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba odcinków $=$" }],
              odpowiedz: { w },
              wynik: `$${w}$`,
              rozwiazanie: [
                `Wypisujemy odcinki: ${pary.join(", ")}.`,
                `Liczymy odcinki zaczynające się w kolejnych punktach: $${skladniki.join(" + ")} = ${w}$.`,
              ],
            };
          },
        },
        {
          id: "proste-rodzaj-kata",
          nazwa: "Rodzaj kąta",
          opis: "Na podstawie miary w stopniach wskaż, czy kąt jest ostry, prosty, rozwarty, półpełny czy pełny.",
          generuj(r) {
            const k = r.int(1, 10);
            let m, i;
            if (k <= 3 || k === 10) { m = r.int(5, 88); i = 0; }
            else if (k === 4) { m = 90; i = 1; }
            else if (k <= 7) { m = r.int(92, 178); i = 2; }
            else if (k === 8) { m = 180; i = 3; }
            else { m = 360; i = 4; }
            const [A, B, C] = r.pick(TROJKI);
            const opis = [
              `$${st(m)}$ jest mniejsze niż $${st(90)}$, więc kąt jest ostry.`,
              `Kąt $${st(m)}$ ma dokładnie tyle, co kąt prosty, więc jest prosty.`,
              `$${st(m)}$ jest większe niż $${st(90)}$, ale mniejsze niż $${st(180)}$, więc kąt jest rozwarty.`,
              `Kąt $${st(m)}$ to pół obrotu, więc jest półpełny.`,
              `$${st(m)}$ to cały obrót, czyli $${st(360)}$, więc kąt jest pełny.`,
            ][i];
            return {
              tresc: `Kąt $\\angle ${A}${B}${C}$ ma miarę $${st(m)}$. Jakiego rodzaju jest ten kąt?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Rodzaj kąta", opcje: RODZAJE }],
              odpowiedz: { w: i },
              wynik: `$${st(m)}$ – kąt ${RODZAJE[i]}`,
              rozwiazanie: [
                `Porównujemy miarę kąta z $${st(90)}$, $${st(180)}$ i $${st(360)}$.`,
                opis,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3
    {
      id: "mierzenie-katow",
      nazwa: "Mierzenie kątów",
      sciaga: [
        {
          nazwa: "Kątomierz",
          slownie: "Kąty mierzymy kątomierzem i podajemy w stopniach. Środek kątomierza kładziemy na wierzchołku, a jedno ramię kąta na zerze skali. Drugie ramię pokazuje miarę kąta.",
          przyklad: "Gdy pierwsze ramię leży na zerze, a drugie wskazuje liczbę $70$, kąt ma $70^\\circ$.",
          uwaga: "Kątomierz ma dwie skale. Czytaj tę, która zaczyna się od zera przy ramieniu leżącym na zerze. Sprawdź jeszcze: kąt ostry ma mniej niż $90^\\circ$.",
        },
        {
          nazwa: "Ile brakuje do $90^\\circ$ i $180^\\circ$",
          slownie: "Dwa kąty tworzą razem kąt prosty, gdy ich miary dają $90^\\circ$, a razem kąt półpełny, gdy dają $180^\\circ$. Brakującą miarę liczymy odejmowaniem.",
          tex: "90^\\circ-\\alpha\\qquad180^\\circ-\\alpha",
          litery: "$\\alpha$ – miara kąta, który już znamy.",
          przyklad: "Do kąta prostego kątowi $35^\\circ$ brakuje $90^\\circ - 35^\\circ = 55^\\circ$, a do półpełnego $180^\\circ - 35^\\circ = 145^\\circ$.",
          uwaga: "Najpierw sprawdź, czy chodzi o kąt prosty ($90^\\circ$), czy o półpełny ($180^\\circ$).",
        },
        {
          nazwa: "Dodawanie miar kątów",
          slownie: "Gdy ramię dzieli kąt na dwa mniejsze kąty, miara dużego kąta jest sumą miar tych mniejszych.",
          tex: "\\angle AOC=\\angle AOB+\\angle BOC",
          litery: "$O$ – wierzchołek, ramię $OB$ leży wewnątrz kąta $\\angle AOC$.",
          przyklad: "Jeśli $\\angle AOB = 25^\\circ$ i $\\angle BOC = 40^\\circ$, to $\\angle AOC = 25^\\circ + 40^\\circ = 65^\\circ$.",
        },
        {
          nazwa: "Kąt na zegarze",
          slownie: "Tarcza zegara to kąt pełny, czyli $360^\\circ$, podzielony na $12$ równych części. Między sąsiednimi godzinami jest więc $30^\\circ$.",
          tex: "360^\\circ:12=30^\\circ",
          przyklad: "O godzinie 4:00 między wskazówkami są $4$ godziny, czyli kąt $4\\cdot 30^\\circ = 120^\\circ$.",
          uwaga: "Liczymy krótszą drogę, czyli najwyżej $6$ godzin. O godzinie 8:00 mniejszy kąt to $4\\cdot 30^\\circ = 120^\\circ$, a nie $8\\cdot 30^\\circ$.",
        },
      ],
      jak: [
        "Zdecyduj, czy kąt trzeba zmierzyć kątomierzem, czy można go obliczyć.",
        "Gdy dwa kąty tworzą razem kąt prosty, odejmij znaną miarę od $90^\\circ$, a gdy półpełny – od $180^\\circ$.",
        "Gdy kąt jest podzielony na części, dodaj miary części.",
        "Na zegarze policz, ile godzin dzieli wskazówki (najwyżej $6$), i pomnóż przez $30^\\circ$.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Kąt ostry ma miarę $27^\\circ$. Ile stopni brakuje mu do kąta prostego? **Wybierz właściwą odpowiedź.**",
          opcje: ["$53^\\circ$", "$63^\\circ$", "$73^\\circ$", "$153^\\circ$"],
          poprawna: 1,
        },
        {
          nr: "9",
          tresc: "Kąt ma miarę $65^\\circ$. Ile stopni brakuje mu do kąta półpełnego? **Wybierz właściwą odpowiedź.**",
          opcje: ["$115^\\circ$", "$25^\\circ$", "$125^\\circ$", "$295^\\circ$"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "Jaką miarę ma mniejszy z kątów między wskazówkami zegara o godzinie 8:00? **Wybierz właściwą odpowiedź.**",
          opcje: ["$80^\\circ$", "$240^\\circ$", "$120^\\circ$", "$150^\\circ$"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "Ramię $OB$ leży wewnątrz kąta $\\angle AOC$. Wiadomo, że $\\angle AOB = 48^\\circ$ i $\\angle BOC = 32^\\circ$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Kąt $\\angle AOC$ ma $80^\\circ$.", litery: "PF", poprawna: 0 },
            { tekst: "Kąt $\\angle AOC$ ma $16^\\circ$.", litery: "PF", poprawna: 1 },
            { tekst: "Kąt $\\angle AOC$ jest rozwarty.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "12",
          tresc: "Dwa kąty tworzą razem kąt półpełny. Jeden z nich jest trzy razy większy od drugiego. Ile stopni ma mniejszy z tych kątów? **Wybierz właściwą odpowiedź.**",
          opcje: ["$60^\\circ$", "$90^\\circ$", "$135^\\circ$", "$45^\\circ$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Wskazówka minutowa zegara w ciągu godziny obraca się o kąt pełny. O ile stopni obróci się w ciągu $20$ minut, a o ile w ciągu $5$ minut? **Zapisz obliczenia.**",
          rozwiazanie: "Godzina ma $60$ minut, a kąt pełny to $360^\\circ$.\n\nW ciągu $1$ minuty wskazówka obraca się o $360^\\circ : 60 = 6^\\circ$.\n\nW ciągu $20$ minut: $20 \\cdot 6^\\circ = 120^\\circ$.\n\nW ciągu $5$ minut: $5 \\cdot 6^\\circ = 30^\\circ$.\n\nOdpowiedź: w ciągu $20$ minut o $120^\\circ$, a w ciągu $5$ minut o $30^\\circ$.",
        },
      ],
      generatory: [
        {
          id: "mierzenie-dopelnienie",
          nazwa: "Ile brakuje do kąta",
          opis: "Oblicz, ile stopni brakuje kątowi do kąta prostego albo do półpełnego.",
          generuj(r) {
            const prosty = r.chance();
            const pelny = prosty ? 90 : 180;
            const m = prosty ? r.int(5, 85) : r.int(10, 170);
            const w = pelny - m;
            const nazwa = prosty ? "prosty" : "półpełny";
            const tresc = r.chance()
              ? `Kąt $\\alpha$ ma miarę $${st(m)}$. Ile stopni ma kąt, który razem z kątem $\\alpha$ tworzy kąt ${nazwa}?`
              : `Dwa kąty tworzą razem kąt ${nazwa}. Jeden z nich ma $${st(m)}$. Ile stopni ma drugi?`;
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: "Szukany kąt (w stopniach) $=$" }],
              odpowiedz: { w },
              wynik: `$${st(w)}$`,
              rozwiazanie: [
                `Kąt ${nazwa} ma $${st(pelny)}$.`,
                `Odejmujemy znaną miarę: $${pelny} - ${m} = ${w}$.`,
              ],
            };
          },
        },
        {
          id: "mierzenie-zegar",
          nazwa: "Kąt na zegarze",
          opis: "Oblicz mniejszy kąt między wskazówkami zegara o pełnej godzinie.",
          generuj(r) {
            const g = r.intBez(1, 23, 12);
            const h = g % 12;
            const k = Math.min(h, 12 - h);
            const w = k * 30;
            const tresc = r.chance()
              ? `Jaką miarę ma mniejszy z kątów między wskazówkami zegara o godzinie ${g}:00?`
              : `Zegar pokazuje dokładnie godzinę ${g}:00. Ile stopni ma mniejszy kąt między wskazówką godzinową i minutową?`;
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: "Kąt (w stopniach) $=$" }],
              odpowiedz: { w },
              wynik: `$${st(w)}$`,
              rozwiazanie: [
                `Cała tarcza to $${st(360)}$, więc między sąsiednimi godzinami jest $360 : 12 = 30$ stopni.`,
                h > 6
                  ? `Minutowa wskazówka wskazuje $12$, godzinowa $${h}$. Krótsza droga między nimi to $12 - ${h} = ${k}$ godz.`
                  : `Minutowa wskazówka wskazuje $12$, godzinowa $${h}$. Dzieli je $${k}$ godz.`,
                `$${k} \\cdot 30 = ${w}$, czyli $${st(w)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4–5
    {
      id: "trojkaty",
      nazwa: "Rodzaje i własności trójkątów",
      sciaga: [
        {
          nazwa: "Trójkąty według boków",
          slownie: "Trójkąt różnoboczny ma wszystkie boki różnej długości. Równoramienny ma dwa boki równe (ramiona), a trzeci to podstawa. Równoboczny ma wszystkie trzy boki równe.",
          przyklad: "Trójkąt o bokach $3$, $4$, $5$ jest różnoboczny, o bokach $4$, $4$, $6$ – równoramienny, a o bokach $5$, $5$, $5$ – równoboczny.",
          uwaga: "Trójkąt równoboczny ma też dwa równe boki, więc jest szczególnym trójkątem równoramiennym.",
        },
        {
          nazwa: "Trójkąty według kątów",
          slownie: "Trójkąt ostrokątny ma wszystkie kąty ostre. Prostokątny ma jeden kąt prosty. Rozwartokątny ma jeden kąt rozwarty.",
          przyklad: "Kąty $50^\\circ$, $60^\\circ$, $70^\\circ$ – trójkąt ostrokątny. Kąty $30^\\circ$, $60^\\circ$, $90^\\circ$ – prostokątny. Kąty $20^\\circ$, $30^\\circ$, $130^\\circ$ – rozwartokątny.",
          uwaga: "Trójkąt ma najwyżej jeden kąt prosty albo rozwarty. Dwa takie kąty nie zmieszczą się w trójkącie, bo razem miałyby co najmniej $180^\\circ$.",
        },
        {
          nazwa: "Suma kątów trójkąta",
          slownie: "Trzy kąty każdego trójkąta dają razem $180^\\circ$. Gdy znasz dwa kąty, trzeci to $180^\\circ$ minus ich suma.",
          tex: "\\alpha+\\beta+\\gamma=180^\\circ",
          litery: "$\\alpha$, $\\beta$, $\\gamma$ – miary kątów trójkąta.",
          przyklad: "Kąty $50^\\circ$ i $60^\\circ$: trzeci kąt to $180^\\circ - (50^\\circ + 60^\\circ) = 70^\\circ$.",
          uwaga: "Najpierw dodaj dwa znane kąty, dopiero potem odejmij sumę od $180^\\circ$.",
        },
        {
          nazwa: "Trójkąt równoramienny",
          slownie: "W trójkącie równoramiennym kąty przy podstawie są równe. Kąt między ramionami to kąt przy wierzchołku.",
          tex: "\\alpha=\\beta\\qquad\\gamma=180^\\circ-2\\cdot\\alpha",
          litery: "$\\alpha$, $\\beta$ – kąty przy podstawie, $\\gamma$ – kąt przy wierzchołku.",
          przyklad: "Kąt przy wierzchołku ma $40^\\circ$, więc kąty przy podstawie mają po $(180^\\circ - 40^\\circ) : 2 = 70^\\circ$.",
          uwaga: "Równe są kąty przy podstawie, a nie kąt przy wierzchołku.",
        },
        {
          nazwa: "Trójkąt równoboczny i prostokątny",
          slownie: "W trójkącie równobocznym każdy kąt ma $60^\\circ$. W trójkącie prostokątnym dwa kąty ostre dają razem $90^\\circ$.",
          tex: "180^\\circ:3=60^\\circ\\qquad\\alpha+\\beta=90^\\circ",
          litery: "$\\alpha$, $\\beta$ – kąty ostre trójkąta prostokątnego.",
          przyklad: "W trójkącie prostokątnym z kątem $35^\\circ$ drugi kąt ostry ma $90^\\circ - 35^\\circ = 55^\\circ$.",
          uwaga: "Trójkąt prostokątny równoramienny ma kąty $90^\\circ$, $45^\\circ$ i $45^\\circ$.",
        },
      ],
      jak: [
        "Zapisz, co wiesz: które boki są równe i czy jest kąt prosty.",
        "Pamiętaj, że trzy kąty trójkąta dają razem $180^\\circ$.",
        "W trójkącie równoramiennym kąty przy podstawie są równe, a w równobocznym każdy kąt ma $60^\\circ$.",
        "Sprawdź wynik: dodaj wszystkie trzy kąty, powinno wyjść $180^\\circ$.",
      ],
      zadania: [
        {
          nr: "14",
          tresc: "Trójkąt ma boki długości $6$ cm, $6$ cm i $9$ cm. Jaki to trójkąt ze względu na długości boków? **Wybierz właściwą odpowiedź.**",
          opcje: ["równoboczny", "równoramienny", "różnoboczny", "żaden z wymienionych"],
          poprawna: 1,
        },
        {
          nr: "15",
          tresc: "Dwa kąty trójkąta mają miary $48^\\circ$ i $67^\\circ$. Jaką miarę ma trzeci kąt? **Wybierz właściwą odpowiedź.**",
          opcje: ["$115^\\circ$", "$75^\\circ$", "$65^\\circ$", "$132^\\circ$"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "Trójkąt ma kąty o miarach $25^\\circ$, $35^\\circ$ i $120^\\circ$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Jest to trójkąt ostrokątny.", litery: "PF", poprawna: 1 },
            { tekst: "Jest to trójkąt rozwartokątny.", litery: "PF", poprawna: 0 },
            { tekst: "Suma jego kątów wynosi $180^\\circ$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "17",
          tresc: "W trójkącie równoramiennym kąt przy wierzchołku ma $50^\\circ$. Ile stopni ma każdy z kątów przy podstawie? **Wybierz właściwą odpowiedź.**",
          opcje: ["$65^\\circ$", "$130^\\circ$", "$40^\\circ$", "$50^\\circ$"],
          poprawna: 0,
        },
        {
          nr: "18",
          tresc: "Który zestaw liczb może być miarami kątów trójkąta? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "$60^\\circ$, $60^\\circ$, $70^\\circ$",
            "$90^\\circ$, $50^\\circ$, $50^\\circ$",
            "$30^\\circ$, $60^\\circ$, $100^\\circ$",
            "$100^\\circ$, $40^\\circ$, $40^\\circ$",
          ],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "19",
          punkty: 2,
          tresc: "Jeden z kątów przy podstawie trójkąta równoramiennego ma $72^\\circ$. Oblicz miary pozostałych kątów tego trójkąta. **Zapisz obliczenia.**",
          rozwiazanie: "Kąty przy podstawie trójkąta równoramiennego są równe, więc drugi kąt przy podstawie też ma $72^\\circ$.\n\nOba kąty przy podstawie razem: $72^\\circ + 72^\\circ = 144^\\circ$.\n\nKąt przy wierzchołku: $180^\\circ - 144^\\circ = 36^\\circ$.\n\nOdpowiedź: pozostałe kąty mają $72^\\circ$ i $36^\\circ$.",
        },
        {
          nr: "20",
          punkty: 3,
          tresc: "W trójkącie prostokątnym jeden kąt ostry jest o $20^\\circ$ większy od drugiego kąta ostrego. Oblicz miary wszystkich kątów tego trójkąta. **Zapisz obliczenia.**",
          rozwiazanie: "Kąt prosty ma $90^\\circ$, a dwa kąty ostre dają razem $180^\\circ - 90^\\circ = 90^\\circ$.\n\nGdyby większy kąt ostry był o $20^\\circ$ mniejszy, oba kąty byłyby równe i miałyby razem $90^\\circ - 20^\\circ = 70^\\circ$.\n\nMniejszy kąt ostry: $70^\\circ : 2 = 35^\\circ$. Większy: $35^\\circ + 20^\\circ = 55^\\circ$.\n\nSprawdzenie: $90^\\circ + 35^\\circ + 55^\\circ = 180^\\circ$.\n\nOdpowiedź: kąty trójkąta mają $90^\\circ$, $35^\\circ$ i $55^\\circ$.",
        },
      ],
      generatory: [
        {
          id: "trojkaty-trzeci-kat",
          nazwa: "Trzeci kąt trójkąta",
          opis: "Znasz dwa kąty trójkąta – oblicz trzeci.",
          generuj(r) {
            for (;;) {
              const a = r.int(20, 100);
              const b = r.int(20, 100);
              const c = 180 - a - b;
              if (c < 10 || c > 130) continue;
              const [A, B, C] = r.pick(TROJKI);
              return {
                tresc: `W trójkącie $${A}${B}${C}$ kąt przy wierzchołku $${A}$ ma $${st(a)}$, a kąt przy wierzchołku $${B}$ ma $${st(b)}$. Ile stopni ma kąt przy wierzchołku $${C}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Kąt przy wierzchołku $${C}$ (w stopniach) $=$` }],
                odpowiedz: { w: c },
                wynik: `$${st(c)}$`,
                rozwiazanie: [
                  "Trzy kąty trójkąta dają razem $180^\\circ$.",
                  `Dodajemy znane kąty: $${a} + ${b} = ${a + b}$.`,
                  `Odejmujemy od $180$: $180 - ${a + b} = ${c}$.`,
                ],
              };
            }
          },
        },
        {
          id: "trojkaty-rownoramienny",
          nazwa: "Trójkąt równoramienny",
          opis: "Oblicz kąt przy podstawie albo przy wierzchołku trójkąta równoramiennego.",
          generuj(r) {
            const [A, B, C] = r.pick(TROJKI);
            if (r.chance()) {
              const g = 2 * r.int(10, 70);   // kąt przy wierzchołku, parzysty
              const w = (180 - g) / 2;
              return {
                tresc: `Trójkąt $${A}${B}${C}$ jest równoramienny, a jego podstawą jest bok $${A}${B}$. Kąt przy wierzchołku $${C}$ ma $${st(g)}$. Ile stopni ma kąt przy wierzchołku $${A}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Kąt przy wierzchołku $${A}$ (w stopniach) $=$` }],
                odpowiedz: { w },
                wynik: `$${st(w)}$`,
                rozwiazanie: [
                  "Trzy kąty trójkąta dają razem $180^\\circ$, a kąty przy podstawie są równe.",
                  `Na dwa kąty przy podstawie zostaje $180 - ${g} = ${180 - g}$.`,
                  `Jeden kąt przy podstawie: $${180 - g} : 2 = ${w}$.`,
                ],
              };
            }
            const a = r.int(20, 80);
            const w = 180 - 2 * a;
            return {
              tresc: `Trójkąt $${A}${B}${C}$ jest równoramienny, a jego podstawą jest bok $${A}${B}$. Kąt przy wierzchołku $${A}$ ma $${st(a)}$. Ile stopni ma kąt przy wierzchołku $${C}$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `Kąt przy wierzchołku $${C}$ (w stopniach) $=$` }],
              odpowiedz: { w },
              wynik: `$${st(w)}$`,
              rozwiazanie: [
                `Kąty przy podstawie są równe, więc kąt przy wierzchołku $${B}$ też ma $${st(a)}$.`,
                `Oba kąty przy podstawie razem: $${a} + ${a} = ${2 * a}$.`,
                `Kąt przy wierzchołku $${C}$: $180 - ${2 * a} = ${w}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 6
    {
      id: "wysokosc-trojkata",
      nazwa: "Wysokość trójkąta",
      sciaga: [
        {
          nazwa: "Co to jest wysokość",
          slownie: "Wysokość trójkąta to odcinek, który wychodzi z wierzchołka i jest prostopadły do przeciwległego boku (albo do jego przedłużenia). Ten bok nazywamy podstawą.",
          przyklad: "W trójkącie $ABC$ wysokość z wierzchołka $C$ jest prostopadła do boku $AB$, czyli tworzy z nim kąt $90^\\circ$.",
          uwaga: "Wysokość nie musi trafiać w środek podstawy. Zwykle nie jest też bokiem trójkąta.",
        },
        {
          nazwa: "Trzy wysokości",
          slownie: "Każdy trójkąt ma trzy wysokości – po jednej z każdego wierzchołka. Każda ma swoją podstawę i może mieć inną długość.",
          przyklad: "W trójkącie $ABC$: wysokość z $A$ opada na $BC$, z $B$ na $AC$, a z $C$ na $AB$.",
          uwaga: "Wysokości jednego trójkąta zwykle mają różne długości.",
        },
        {
          nazwa: "Wysokość w różnych trójkątach",
          slownie: "W trójkącie ostrokątnym wszystkie wysokości leżą wewnątrz. W prostokątnym dwie wysokości to przyprostokątne. W rozwartokątnym dwie wysokości leżą na zewnątrz i opadają na przedłużenia boków.",
          przyklad: "W trójkącie prostokątnym o przyprostokątnych $3$ i $4$ wysokość opuszczona na przyprostokątną $3$ ma długość $4$.",
          uwaga: "Przy trójkącie rozwartokątnym trzeba przedłużyć podstawę (linią przerywaną), żeby poprowadzić wysokość.",
        },
        {
          nazwa: "Jak narysować wysokość",
          slownie: "Przyłóż ekierkę jednym bokiem prostego kąta do podstawy, a drugi bok przesuń tak, by dotykał wierzchołka. Narysuj odcinek wzdłuż tego boku.",
          przyklad: "Tak samo rysujesz wysokość z każdego z trzech wierzchołków – za każdym razem zmieniasz podstawę.",
        },
      ],
      jak: [
        "Wskaż podstawę, czyli bok, na który ma opaść wysokość.",
        "Wierzchołek naprzeciw podstawy to początek wysokości.",
        "W trójkącie prostokątnym wysokość opuszczona na przyprostokątną jest drugą przyprostokątną.",
        "W trójkącie rozwartokątnym przedłuż podstawę i dopiero wtedy rysuj wysokość.",
      ],
      zadania: [
        {
          nr: "21",
          tresc: "Ile wysokości ma każdy trójkąt? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$3$", "$2$", "$1$"],
          poprawna: 1,
        },
        {
          nr: "22",
          tresc: "Jaką miarę ma kąt między wysokością trójkąta a podstawą, na którą ta wysokość opada? **Wybierz właściwą odpowiedź.**",
          opcje: ["$45^\\circ$", "$60^\\circ$", "$90^\\circ$", "$180^\\circ$"],
          poprawna: 2,
        },
        {
          nr: "23",
          tresc: "Trójkąt prostokątny ma przyprostokątne długości $5$ cm i $12$ cm. Wysokość opuszczona na przyprostokątną o długości $5$ cm. Jaką długość ma ta wysokość? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$ cm", "$5$ cm", "$17$ cm", "$7$ cm"],
          poprawna: 0,
        },
        {
          nr: "24",
          tresc: "Trójkąt $ABC$ jest rozwartokątny, a kąt rozwarty jest przy wierzchołku $C$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wysokość poprowadzona z wierzchołka $C$ leży wewnątrz trójkąta.", litery: "PF", poprawna: 0 },
            { tekst: "Wysokość poprowadzona z wierzchołka $A$ opada na przedłużenie boku $BC$.", litery: "PF", poprawna: 0 },
            { tekst: "Wysokość poprowadzona z wierzchołka $B$ jest bokiem trójkąta.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "25",
          tresc: "Który trójkąt ma dwie wysokości będące jego bokami? **Wybierz właściwą odpowiedź.**",
          opcje: ["równoboczny", "ostrokątny", "rozwartokątny", "prostokątny"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "26",
          punkty: 2,
          tresc: "W trójkącie prostokątnym $KLM$ kąt prosty jest przy wierzchołku $L$, a $|KL| = 8$ cm i $|LM| = 6$ cm. Podaj długości wysokości poprowadzonych z wierzchołków $K$ i $M$. Uzasadnij odpowiedź. **Zapisz obliczenia.**",
          rozwiazanie: "Wysokość z wierzchołka $K$ ma opaść prostopadle na prostą $LM$.\n\nBok $KL$ jest prostopadły do $LM$, bo kąt przy $L$ jest prosty. To właśnie jest ta wysokość, więc ma długość $8$ cm.\n\nWysokość z wierzchołka $M$ opada prostopadle na prostą $KL$. Bok $ML$ jest prostopadły do $KL$, więc ta wysokość ma długość $6$ cm.\n\nOdpowiedź: wysokość z $K$ ma $8$ cm, a wysokość z $M$ ma $6$ cm.",
        },
      ],
      generatory: [
        {
          id: "wysokosc-przyprostokatna",
          nazwa: "Wysokość w prostokątnym",
          opis: "W trójkącie prostokątnym podaj długość wysokości opuszczonej z jednego z wierzchołków przy przyprostokątnych.",
          generuj(r) {
            const [p, s, c0] = r.pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15]]);
            const [x, y] = r.chance() ? [p, s] : [s, p];   // x = |AC|, y = |BC|
            const [A, B, C] = r.pick(TROJKI);
            const zA = r.chance();
            const w = zA ? x : y;
            const [V, P, bok] = zA ? [A, B, `${A}${C}`] : [B, A, `${B}${C}`];
            return {
              tresc: `W trójkącie prostokątnym $${A}${B}${C}$ kąt prosty jest przy wierzchołku $${C}$. Wiadomo, że $|${A}${C}| = ${x}$ cm, $|${B}${C}| = ${y}$ cm i $|${A}${B}| = ${c0}$ cm. Jaką długość ma wysokość poprowadzona z wierzchołka $${V}$ na prostą $${P}${C}$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Wysokość (w cm) $=$" }],
              odpowiedz: { w },
              wynik: `$${w}$ cm`,
              rozwiazanie: [
                `Kąt przy wierzchołku $${C}$ jest prosty, więc bok $${bok}$ jest prostopadły do prostej $${P}${C}$.`,
                `Odcinek z wierzchołka $${V}$ prostopadły do $${P}${C}$ to właśnie bok $${bok}$.`,
                `Wysokość ma długość $|${bok}| = ${w}$ cm. Najdłuższy bok $${A}${B}$ nie jest tu potrzebny.`,
              ],
            };
          },
        },
        {
          id: "wysokosc-na-zewnatrz",
          nazwa: "Wysokości na zewnątrz",
          opis: "Na podstawie kątów trójkąta powiedz, ile jego wysokości leży poza trójkątem.",
          generuj(r) {
            let kat;
            const rodzaj = r.int(0, 2);
            for (;;) {
              if (rodzaj === 0) {
                kat = [r.int(35, 85), r.int(35, 85)];
                kat.push(180 - kat[0] - kat[1]);
                if (kat[2] < 30 || kat[2] > 85) continue;
              } else if (rodzaj === 1) {
                const a = r.int(15, 75);
                kat = [90, a, 90 - a];
              } else {
                const c = r.int(95, 150);
                const a = r.int(10, 80);
                const b = 180 - c - a;
                if (b < 10) continue;
                kat = [c, a, b];
              }
              break;
            }
            kat = r.shuffle(kat);
            const [A, B, C] = r.pick(TROJKI);
            const w = rodzaj === 2 ? 2 : 0;
            const nazwa = ["ostrokątny", "prostokątny", "rozwartokątny"][rodzaj];
            const koniec = rodzaj === 0
              ? "Wszystkie kąty są ostre, więc wszystkie wysokości leżą wewnątrz trójkąta."
              : rodzaj === 1
                ? "Dwie wysokości to przyprostokątne (leżą na bokach trójkąta), a trzecia leży wewnątrz. Żadna nie wychodzi na zewnątrz."
                : "W trójkącie rozwartokątnym dwie wysokości (z wierzchołków kątów ostrych) opadają na przedłużenia boków, więc leżą na zewnątrz.";
            return {
              tresc: `Trójkąt $${A}${B}${C}$ ma kąty o miarach $${st(kat[0])}$, $${st(kat[1])}$ i $${st(kat[2])}$. Ile wysokości tego trójkąta leży całkowicie poza trójkątem (opada na przedłużenia boków)?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba wysokości $=$" }],
              odpowiedz: { w },
              wynik: `$${w}$`,
              rozwiazanie: [
                `Najpierw sprawdzamy rodzaj trójkąta: największy kąt ma $${st(Math.max(...kat))}$, więc trójkąt jest ${nazwa}.`,
                koniec,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 7–8
    {
      id: "rownolegloboki",
      nazwa: "Równoległoboki i ich wysokości",
      sciaga: [
        {
          nazwa: "Równoległobok",
          slownie: "Równoległobok to czworokąt, który ma dwie pary boków równoległych. Przeciwległe boki mają taką samą długość.",
          przyklad: "Pochylona ramka od obrazka ma kształt równoległoboku: górny bok jest równoległy do dolnego, a lewy do prawego.",
          uwaga: "Prostokąt i kwadrat też są równoległobokami, ale nie każdy równoległobok ma kąty proste.",
        },
        {
          nazwa: "Kąty w równoległoboku",
          slownie: "Przeciwległe kąty równoległoboku są równe. Dwa kąty leżące przy tym samym boku dają razem $180^\\circ$.",
          tex: "\\alpha+\\beta=180^\\circ",
          litery: "$\\alpha$, $\\beta$ – kąty leżące przy jednym boku równoległoboku.",
          przyklad: "Jeśli jeden kąt ma $70^\\circ$, to kąt naprzeciw też ma $70^\\circ$, a dwa pozostałe mają po $180^\\circ - 70^\\circ = 110^\\circ$.",
          uwaga: "Przy każdym boku jest jeden kąt ostry i jeden rozwarty (chyba że wszystkie kąty są proste).",
        },
        {
          nazwa: "Romb",
          slownie: "Romb to równoległobok, który ma wszystkie boki równej długości. Jego obwód to cztery razy długość boku.",
          tex: "\\text{obwód}=4\\cdot a",
          litery: "$a$ – długość boku rombu.",
          przyklad: "Romb o boku $6$ cm ma obwód $4 \\cdot 6 = 24$ cm.",
          uwaga: "Kąty rombu są takie jak w każdym równoległoboku: przeciwległe równe, sąsiednie dają razem $180^\\circ$.",
        },
        {
          nazwa: "Obwód równoległoboku",
          slownie: "Obwód to suma długości wszystkich boków. W równoległoboku boki są parami równe, więc dodajemy dwa sąsiednie boki i mnożymy przez $2$.",
          tex: "\\text{obwód}=2\\cdot(a+b)",
          litery: "$a$, $b$ – długości sąsiednich boków.",
          przyklad: "Boki $5$ cm i $8$ cm: obwód to $2 \\cdot (5 + 8) = 26$ cm.",
          uwaga: "Nie wystarczy dodać dwóch boków. W obwodzie są zawsze cztery boki.",
        },
        {
          nazwa: "Wysokość równoległoboku",
          slownie: "Wysokość równoległoboku to odcinek prostopadły do dwóch równoległych boków, który je łączy. Równoległobok ma dwie różne wysokości – po jednej dla każdej pary boków.",
          przyklad: "W pochylonej ramce wysokość to odcinek poprowadzony prosto w dół z górnego boku na dolny, pod kątem $90^\\circ$ do obu.",
          uwaga: "Wysokość nie jest pochyłym bokiem. Bok pochylony jest dłuższy od wysokości.",
        },
      ],
      jak: [
        "Sprawdź, czy figura ma dwie pary boków równoległych – jeśli tak, to jest równoległobokiem.",
        "Przy kątach pamiętaj: przeciwległe są równe, a sąsiednie dają razem $180^\\circ$.",
        "Obwód: dodaj dwa sąsiednie boki i pomnóż przez $2$ (romb: bok razy $4$).",
        "Wysokość rysuj prostopadle do podstawy, aż dotknie boku naprzeciw.",
      ],
      zadania: [
        {
          nr: "27",
          tresc: "Jeden z kątów równoległoboku ma $65^\\circ$. Ile stopni ma kąt leżący naprzeciw niego? **Wybierz właściwą odpowiedź.**",
          opcje: ["$115^\\circ$", "$65^\\circ$", "$25^\\circ$", "$130^\\circ$"],
          poprawna: 1,
        },
        {
          nr: "28",
          tresc: "Jeden z kątów równoległoboku ma $72^\\circ$. Ile stopni ma kąt leżący przy tym samym boku (sąsiedni)? **Wybierz właściwą odpowiedź.**",
          opcje: ["$18^\\circ$", "$72^\\circ$", "$118^\\circ$", "$108^\\circ$"],
          poprawna: 3,
        },
        {
          nr: "29",
          tresc: "Boki równoległoboku mają długości $7$ cm i $9$ cm. Jaki obwód ma ten równoległobok? **Wybierz właściwą odpowiedź.**",
          opcje: ["$32$ cm", "$16$ cm", "$63$ cm", "$28$ cm"],
          poprawna: 0,
        },
        {
          nr: "30",
          tresc: "Romb ma bok długości $5$ cm i kąt ostry $50^\\circ$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Naprzeciw kąta $50^\\circ$ leży kąt $130^\\circ$.", litery: "PF", poprawna: 1 },
            { tekst: "Obwód tego rombu wynosi $20$ cm.", litery: "PF", poprawna: 0 },
            { tekst: "Kąt rozwarty tego rombu ma $130^\\circ$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "31",
          tresc: "Jaki odcinek jest wysokością równoległoboku? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "odcinek łączący dwa przeciwległe wierzchołki",
            "odcinek łączący środki dwóch przeciwległych boków",
            "odcinek łączący dwa równoległe boki i prostopadły do nich",
            "odcinek dzielący kąt na dwa równe kąty",
          ],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "32",
          punkty: 2,
          tresc: "Obwód równoległoboku wynosi $36$ cm, a jeden z jego boków ma $11$ cm. Oblicz długość sąsiedniego boku. **Zapisz obliczenia.**",
          rozwiazanie: "Obwód to dwa razy suma dwóch sąsiednich boków, więc suma sąsiednich boków wynosi $36 : 2 = 18$ cm.\n\nDrugi bok: $18 - 11 = 7$ cm.\n\nSprawdzenie: $2 \\cdot (11 + 7) = 36$ cm.\n\nOdpowiedź: sąsiedni bok ma $7$ cm.",
        },
        {
          nr: "33",
          punkty: 3,
          tresc: "W równoległoboku jeden z kątów rozwartych jest o $80^\\circ$ większy od kąta ostrego. Oblicz miary wszystkich kątów tego równoległoboku. **Zapisz obliczenia.**",
          rozwiazanie: "Kąt ostry i kąt rozwarty leżą przy jednym boku, więc razem mają $180^\\circ$.\n\nGdyby od sumy odjąć $80^\\circ$, zostałoby $180^\\circ - 80^\\circ = 100^\\circ$ do podziału na dwa równe kąty.\n\nKąt ostry: $100^\\circ : 2 = 50^\\circ$. Kąt rozwarty: $50^\\circ + 80^\\circ = 130^\\circ$.\n\nPrzeciwległe kąty są równe, więc kąty równoległoboku to $50^\\circ$, $130^\\circ$, $50^\\circ$, $130^\\circ$.\n\nOdpowiedź: dwa kąty mają $50^\\circ$, a dwa $130^\\circ$.",
        },
      ],
      generatory: [
        {
          id: "rownolegloboki-katy",
          nazwa: "Kąty równoległoboku",
          opis: "Znasz jeden kąt równoległoboku – oblicz kąt leżący naprzeciw albo przy tym samym boku.",
          generuj(r) {
            const m = r.intBez(35, 145, 90);
            const naprzeciw = r.chance();
            const w = naprzeciw ? m : 180 - m;
            const [A, B, C, D] = r.pick([["A", "B", "C", "D"], ["K", "L", "M", "N"], ["P", "Q", "R", "S"]]);
            const szukany = naprzeciw ? C : B;
            return {
              tresc: `W równoległoboku $${A}${B}${C}${D}$ kąt przy wierzchołku $${A}$ ma $${st(m)}$. Ile stopni ma kąt przy wierzchołku $${szukany}$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `Kąt przy wierzchołku $${szukany}$ (w stopniach) $=$` }],
              odpowiedz: { w },
              wynik: `$${st(w)}$`,
              rozwiazanie: naprzeciw
                ? [`Wierzchołki $${A}$ i $${C}$ leżą naprzeciw siebie, a przeciwległe kąty równoległoboku są równe.`, `Kąt przy $${C}$ ma tyle samo co kąt przy $${A}$: $${st(w)}$.`]
                : [`Wierzchołki $${A}$ i $${B}$ leżą przy jednym boku, więc ich kąty dają razem $180^\\circ$.`, `$180 - ${m} = ${w}$, czyli kąt przy $${B}$ ma $${st(w)}$.`],
            };
          },
        },
        {
          id: "rownolegloboki-obwod",
          nazwa: "Obwód równoległoboku",
          opis: "Oblicz obwód równoległoboku albo rombu, albo brakujący bok, gdy znasz obwód.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 1) {
              const a = r.int(3, 25);
              const o = 4 * a;
              return {
                tresc: `Bok rombu ma długość $${a}$ cm. Oblicz obwód tego rombu.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Obwód (w cm) $=$" }],
                odpowiedz: { w: o },
                wynik: `$${o}$ cm`,
                rozwiazanie: ["Romb ma cztery równe boki.", `Obwód: $4 \\cdot ${a} = ${o}$ cm.`],
              };
            }
            const a = r.int(3, 20);
            const b = r.intBez(3, 20, a);
            const o = 2 * (a + b);
            if (tryb === 0) {
              return {
                tresc: `Sąsiednie boki równoległoboku mają długości $${a}$ cm i $${b}$ cm. Oblicz obwód tego równoległoboku.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Obwód (w cm) $=$" }],
                odpowiedz: { w: o },
                wynik: `$${o}$ cm`,
                rozwiazanie: ["Przeciwległe boki równoległoboku są równe, więc obwód to $2$ razy suma sąsiednich boków.", `$2 \\cdot (${a} + ${b}) = 2 \\cdot ${a + b} = ${o}$ cm.`],
              };
            }
            return {
              tresc: `Obwód równoległoboku wynosi $${o}$ cm, a jeden z jego boków ma $${a}$ cm. Ile centymetrów ma sąsiedni bok?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Sąsiedni bok (w cm) $=$" }],
              odpowiedz: { w: b },
              wynik: `$${b}$ cm`,
              rozwiazanie: [`Suma dwóch sąsiednich boków to połowa obwodu: $${o} : 2 = ${a + b}$ cm.`, `Szukany bok: $${a + b} - ${a} = ${b}$ cm.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 9–10
    {
      id: "trapezy-i-czworokaty",
      nazwa: "Trapezy i klasyfikacja czworokątów",
      sciaga: [
        {
          nazwa: "Trapez",
          slownie: "Trapez to czworokąt, który ma co najmniej jedną parę boków równoległych. Boki równoległe to podstawy, a pozostałe dwa to ramiona.",
          przyklad: "Wiaderko widziane z boku: górna i dolna krawędź są równoległe, a boki pochylone.",
          uwaga: "Równoległobok też jest trapezem, bo ma pary boków równoległych.",
        },
        {
          nazwa: "Rodzaje trapezów",
          slownie: "Trapez równoramienny ma ramiona tej samej długości. Trapez prostokątny ma jedno ramię prostopadłe do podstaw.",
          przyklad: "Trapez prostokątny ma dwa kąty proste, a trapez równoramienny ma takie same kąty przy każdej z podstaw.",
          uwaga: "Ramiona trapezu równoramiennego są równe, ale nie są równoległe.",
        },
        {
          nazwa: "Kąty w trapezie",
          slownie: "Dwa kąty przy tym samym ramieniu dają razem $180^\\circ$. W trapezie równoramiennym kąty przy tej samej podstawie są równe.",
          tex: "\\alpha+\\beta=180^\\circ",
          litery: "$\\alpha$, $\\beta$ – kąty leżące przy jednym ramieniu.",
          przyklad: "Gdy kąt przy ramieniu ma $70^\\circ$, to drugi kąt przy tym samym ramieniu ma $180^\\circ - 70^\\circ = 110^\\circ$.",
          uwaga: "Suma $180^\\circ$ dotyczy kątów przy ramieniu, a nie przy podstawie.",
        },
        {
          nazwa: "Wysokość trapezu",
          slownie: "Wysokość trapezu to odcinek prostopadły do obu podstaw, który je łączy. Wszystkie takie odcinki mają tę samą długość.",
          przyklad: "Podstawy trapezu leżą na prostych oddalonych od siebie o $4$ cm, więc wysokość trapezu ma $4$ cm.",
          uwaga: "Wysokość nie jest pochyłym ramieniem. Ramię jest prostopadłe do podstaw tylko w trapezie prostokątnym.",
        },
        {
          nazwa: "Który czworokąt jest którym",
          slownie: "Kwadrat jest prostokątem i rombem. Prostokąt i romb są równoległobokami, a każdy równoległobok jest trapezem.",
          przyklad: "Kwadrat to prostokąt o równych bokach i zarazem romb o prostych kątach.",
          uwaga: "Nie na odwrót: nie każdy trapez jest równoległobokiem, nie każdy prostokąt jest kwadratem.",
        },
      ],
      jak: [
        "Sprawdź, ile par boków równoległych ma czworokąt.",
        "Dwie pary to równoległobok. Gdy boki są jeszcze równe, jest rombem, a gdy kąty są proste – prostokątem.",
        "Jedna para (co najmniej) to trapez.",
        "Kąty w trapezie: przy jednym ramieniu razem $180^\\circ$, a w równoramiennym przy podstawie – takie same.",
      ],
      zadania: [
        {
          nr: "34",
          tresc: "Który opis jest poprawną definicją trapezu? **Wybierz właściwą odpowiedź.**",
          opcje: ["czworokąt, który ma dokładnie dwa kąty proste", "czworokąt, który ma co najmniej jedną parę boków równoległych", "czworokąt, który ma wszystkie boki równe", "czworokąt, który ma dwie pary boków równoległych"],
          poprawna: 1,
        },
        {
          nr: "35",
          tresc: "W trapezie $ABCD$ boki $AB$ i $CD$ są równoległe. Kąt przy wierzchołku $A$ ma $75^\\circ$. Ile stopni ma kąt przy wierzchołku $D$ (oba kąty leżą przy ramieniu $AD$)? **Wybierz właściwą odpowiedź.**",
          opcje: ["$105^\\circ$", "$75^\\circ$", "$115^\\circ$", "$285^\\circ$"],
          poprawna: 0,
        },
        {
          nr: "36",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Każdy kwadrat jest rombem.", litery: "PF", poprawna: 0 },
            { tekst: "Każdy prostokąt jest kwadratem.", litery: "PF", poprawna: 1 },
            { tekst: "Każdy trapez jest równoległobokiem.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "37",
          tresc: "Który czworokąt ma wszystkie boki równe, ale jego kąty nie muszą być proste? **Wybierz właściwą odpowiedź.**",
          opcje: ["kwadrat", "prostokąt", "trapez", "romb"],
          poprawna: 3,
        },
        {
          nr: "38",
          tresc: "W trapezie równoramiennym jeden kąt przy dłuższej podstawie ma $70^\\circ$. Ile stopni ma drugi kąt przy tej samej podstawie? **Wybierz właściwą odpowiedź.**",
          opcje: ["$110^\\circ$", "$70^\\circ$", "$20^\\circ$", "$140^\\circ$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "39",
          punkty: 2,
          tresc: "Trapez prostokątny ma kąt ostry o mierze $56^\\circ$. Oblicz miary pozostałych kątów tego trapezu. **Zapisz obliczenia.**",
          rozwiazanie: "Trapez prostokątny ma jedno ramię prostopadłe do podstaw, więc dwa jego kąty (przy tym ramieniu) są proste: $90^\\circ$ i $90^\\circ$.\n\nKąt ostry $56^\\circ$ leży przy drugim ramieniu, więc razem z czwartym kątem daje $180^\\circ$.\n\nCzwarty kąt: $180^\\circ - 56^\\circ = 124^\\circ$.\n\nOdpowiedź: pozostałe kąty mają $90^\\circ$, $90^\\circ$ i $124^\\circ$.",
        },
        {
          nr: "40",
          punkty: 3,
          tresc: "Trapez równoramienny ma kąt ostry $65^\\circ$. Oblicz miary wszystkich jego kątów i sprawdź, czy ich suma jest równa $360^\\circ$. **Zapisz obliczenia.**",
          rozwiazanie: "W trapezie równoramiennym kąty przy tej samej podstawie są równe, więc kąty ostre to $65^\\circ$ i $65^\\circ$.\n\nKąt przy tym samym ramieniu razem z kątem ostrym daje $180^\\circ$, więc kąt rozwarty ma $180^\\circ - 65^\\circ = 115^\\circ$.\n\nDrugi kąt rozwarty (przy drugiej podstawie) też ma $115^\\circ$.\n\nSuma: $65^\\circ + 65^\\circ + 115^\\circ + 115^\\circ = 360^\\circ$.\n\nOdpowiedź: kąty mają $65^\\circ$, $65^\\circ$, $115^\\circ$, $115^\\circ$; ich suma to $360^\\circ$.",
        },
      ],
      generatory: [
        {
          id: "trapezy-katy",
          nazwa: "Kąty trapezu",
          opis: "Oblicz kąt trapezu, gdy znasz kąt przy tym samym ramieniu albo przy tej samej podstawie trapezu równoramiennego.",
          generuj(r) {
            const [A, B, C, D] = r.pick([["A", "B", "C", "D"], ["K", "L", "M", "N"], ["P", "Q", "R", "S"]]);
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const m = r.intBez(35, 145, 90);
              const w = 180 - m;
              return {
                tresc: `W trapezie $${A}${B}${C}${D}$ podstawy $${A}${B}$ i $${C}${D}$ są równoległe. Kąt przy wierzchołku $${A}$ ma $${st(m)}$. Ile stopni ma kąt przy wierzchołku $${D}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Kąt przy wierzchołku $${D}$ (w stopniach) $=$` }],
                odpowiedz: { w },
                wynik: `$${st(w)}$`,
                rozwiazanie: [`Kąty przy wierzchołkach $${A}$ i $${D}$ leżą przy tym samym ramieniu $${A}${D}$, więc dają razem $180^\\circ$.`, `$180 - ${m} = ${w}$, czyli $${st(w)}$.`],
              };
            }
            const a = r.int(45, 80);
            if (tryb === 1) {
              const w = 180 - a;
              return {
                tresc: `Trapez $${A}${B}${C}${D}$ jest równoramienny, a jego dłuższą podstawą jest $${A}${B}$. Kąt przy wierzchołku $${A}$ ma $${st(a)}$. Ile stopni ma kąt przy wierzchołku $${D}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Kąt przy wierzchołku $${D}$ (w stopniach) $=$` }],
                odpowiedz: { w },
                wynik: `$${st(w)}$`,
                rozwiazanie: [`Kąty przy wierzchołkach $${A}$ i $${D}$ leżą przy tym samym ramieniu, więc dają razem $180^\\circ$.`, `$180 - ${a} = ${w}$, czyli $${st(w)}$.`],
              };
            }
            return {
              tresc: `Trapez $${A}${B}${C}${D}$ jest równoramienny, a jego podstawą jest $${A}${B}$. Kąt przy wierzchołku $${A}$ ma $${st(a)}$. Ile stopni ma kąt przy wierzchołku $${B}$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `Kąt przy wierzchołku $${B}$ (w stopniach) $=$` }],
              odpowiedz: { w: a },
              wynik: `$${st(a)}$`,
              rozwiazanie: [`Oba kąty przy tej samej podstawie $${A}${B}$ trapezu równoramiennego są równe.`, `Kąt przy $${B}$ ma więc tyle samo co kąt przy $${A}$: $${st(a)}$.`],
            };
          },
        },
        {
          id: "trapezy-rodzina",
          nazwa: "Rodzina czworokątów",
          opis: "Czy każdy kwadrat jest rombem? Czy każdy trapez jest równoległobokiem? Odpowiedz tak albo nie.",
          generuj(r) {
            let x, y;
            do { x = r.pick(FIG); y = r.pick(FIG); } while (x === y);
            const sc = sciezka(x, y);
            const jest = sc !== null;
            const tresc = r.chance()
              ? `Czy każdy ${x} jest ${NAR[y]}?`
              : `Czy to prawda, że każdy ${x} jest ${NAR[y]}?`;
            let rozwiazanie;
            if (jest) {
              rozwiazanie = [];
              for (let i = 0; i + 1 < sc.length; i++) rozwiazanie.push(`Każdy ${sc[i]} jest ${NAR[sc[i + 1]]}.`);
              rozwiazanie.push(`Zatem każdy ${x} jest ${NAR[y]}. Odpowiedź: tak.`);
            } else {
              rozwiazanie = [
                `Każdy ${y} ${CECHA[y]}.`,
                `Nie każdy ${x} musi to mieć, więc nie każdy ${x} jest ${NAR[y]}. Odpowiedź: nie.`,
              ];
            }
            return {
              tresc,
              pola: [{ id: "w", typ: "wybor", etykieta: "Odpowiedź", opcje: ["tak", "nie"] }],
              odpowiedz: { w: jest ? 0 : 1 },
              wynik: jest ? "tak" : "nie",
              rozwiazanie,
            };
          },
        },
      ],
    },
  ],
};
