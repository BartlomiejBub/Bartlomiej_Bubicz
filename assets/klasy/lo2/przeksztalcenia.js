// Klasa 2 (liceum i technikum) · rozdział 1 „Przekształcenia wykresów funkcji” – Matematyka 2, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Bez symetrii wykresów (osiowej i środkowej) – wycofane z podstawy programowej w 2024 r.
import { Q, q, nawiasMinus, plusMinus, wielomianTex, texNawias } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** Wektor o początku i końcu w podanych punktach, np. wv("AB") daje \overrightarrow{AB}. */
const wv = (ab) => `\\overrightarrow{${ab}}`;

/** Argument funkcji po przesunięciu o p wzdłuż osi OX: "x", "x - 3", "x + 3". */
const argX = (p) => (p === 0 ? "x" : p > 0 ? `x - ${p}` : `x + ${-p}`);

/** (x - p) w nawiasie albo samo x, gdy p = 0. */
const kw = (p) => (p === 0 ? "x" : nawiasMinus(p));

/** Składnik stały po przesunięciu w pionie: "" dla zera, inaczej " + 3" albo " - 3". */
const dod = (n) => (n === 0 ? "" : ` ${plusMinus(n)}`);

/** Wektor [p, q] w LaTeX. */
const wek = (p, qq) => `[${p},${qq}]`;

/** Punkt (x, y) w LaTeX. */
const pkt = (x, y) => `(${x},${y})`;

/** Współczynnik przed literą: 1 się pomija, -1 daje "-". */
const wsp = (n) => (n === 1 ? "" : n === -1 ? "-" : String(n));

/** Przedział liczbowy w LaTeX; typ 0 – ⟨a, b⟩, 1 – (a, b), 2 – ⟨a, +∞), 3 – (-∞, b⟩, 4 – (a, +∞). */
function przedzialTex(t, a, b) {
  if (t === 0) return `\\langle ${a},${b}\\rangle`;
  if (t === 1) return `(${a},${b})`;
  if (t === 2) return `\\langle ${a},+\\infty)`;
  if (t === 3) return `(-\\infty,${b}\\rangle`;
  return `(${a},+\\infty)`;
}

/**
 * Cztery opcje przedziałów po przesunięciu: pierwsza (indeks 0) jest poprawna – przesunięcie o s.
 * Pozostałe to typowe błędy: przesunięcie w drugą stronę, brak przesunięcia, przesunięcie tylko lewego końca
 * (albo o drugą podaną liczbę).
 */
function opcjePrzedzialu(t, a, b, s, drugi) {
  const wersja = (sa, sb) => `$${przedzialTex(t, a + sa, b + sb)}$`;
  const kandydaci = [
    wersja(s, s),
    wersja(-s, -s),
    wersja(0, 0),
    t <= 1 ? wersja(s, 0) : wersja(drugi !== s && drugi !== -s && drugi !== 0 ? drugi : 2 * s, drugi !== s && drugi !== -s && drugi !== 0 ? drugi : 2 * s),
    wersja(2 * s, 2 * s),
    wersja(-2 * s, -2 * s),
  ];
  const wynik = [];
  for (const k of kandydaci) if (!wynik.includes(k)) wynik.push(k);
  return wynik.slice(0, 4);
}

/** Losuje funkcję wyjściową f i daje wzór g(x) = f(x - p) + q po przesunięciu o wektor [p, q]. */
function losujBaze(r, { liniowa = true } = {}) {
  const t = r.pick(liniowa ? ["kw", "kw", "odw", "wykl", "lin", "lin"] : ["kw", "odw", "wykl"]);
  if (t === "kw") return { typ: t, f: "x^2", g: (p, qq) => `${kw(p)}^2${dod(qq)}`, ni: (p, qq) => `${kw(p)}^2${dod(qq)}` };
  if (t === "odw") {
    const g = (p, qq) => `\\frac{1}{${argX(p)}}${dod(qq)}`;
    return { typ: t, f: "\\frac{1}{x}", g, ni: g };
  }
  if (t === "wykl") {
    const g = (p, qq) => `2^{${argX(p)}}${dod(qq)}`;
    return { typ: t, f: "2^x", g, ni: g };
  }
  const a = r.pick([2, 3, -2, -3]);
  const b = r.intBez(-5, 5, 0);
  return {
    typ: t,
    f: wielomianTex([a, b]),
    g: (p, qq) => wielomianTex([a, b + qq - a * p]),
    ni: (p, qq) => `${p === 0 ? `${wsp(a)}x` : `${wsp(a)}(${argX(p)})`} ${plusMinus(b)}${dod(qq)}`,
  };
}

/** Zadanie „wskaż wzór funkcji po przesunięciu o wektor [p, q]” (wybór jednej z czterech opcji). */
function zadanieWzor(r, p, qq, baza) {
  for (;;) {
    const pary = [[p, qq], [-p, qq], [p, -qq], [-p, -qq], [qq, p], [-qq, p], [qq, -p], [-qq, -p]];
    const wzory = [];
    for (const [x, y] of pary) {
      const g = baza.g(x, y);
      if (!wzory.includes(g)) wzory.push(g);
    }
    if (wzory.length < 4) { baza = losujBaze(r); continue; }
    const opcje = r.shuffle(wzory.slice(0, 4));
    const poprawna = baza.g(p, qq);
    const ni = baza.ni(p, qq);
    const rozwiazanie = [
      `Przesunięcie o wektor $${wek(p, qq)}$ zmienia wzór funkcji $f$ na $g(x) = f(${argX(p)})${dod(qq)}$.`,
      `Wstawiamy do wzoru funkcji $f$: $g(x) = ${ni}${ni === poprawna ? "" : ` = ${poprawna}`}$.`,
      p !== 0
        ? `Znaki: przesunięcie w ${p > 0 ? "prawo" : "lewo"} o ${Math.abs(p)} daje $${argX(p)}$ w miejscu $x$${qq !== 0 ? `, a przesunięcie w ${qq > 0 ? "górę" : "dół"} o ${Math.abs(qq)} dodaje do wyniku $${qq}$` : ""}.`
        : `Przesunięcie w ${qq > 0 ? "górę" : "dół"} o ${Math.abs(qq)} dodaje do wyniku $${qq}$.`,
    ];
    return {
      tresc: `Wykres funkcji $f(x) = ${baza.f}$ przesunięto o wektor $${wek(p, qq)}$. Wskaż wzór funkcji $g$ otrzymanej po przesunięciu.`,
      pola: [{ id: "g", typ: "wybor", etykieta: "Wzór funkcji $g$", opcje: opcje.map((o) => `$g(x) = ${o}$`) }],
      odpowiedz: { g: opcje.indexOf(poprawna) },
      wynik: `$g(x) = ${poprawna}$`,
      rozwiazanie,
    };
  }
}

/** Zadanie „odczytaj wektor przesunięcia ze wzoru” – tylko p (gdy pionowo = false) albo p i q. */
function zadanieWektor(r, { pionowo }) {
  const baza = losujBaze(r, { liniowa: false });
  const p = pionowo ? r.int(-6, 6) : r.intBez(-6, 6, 0);
  const qq = pionowo ? (p === 0 ? r.intBez(-6, 6, 0) : r.int(-6, 6)) : 0;
  const g = baza.g(p, qq);
  const pola = [{ id: "p", typ: "liczba", etykieta: "$p =$" }];
  const odpowiedz = { p };
  if (pionowo) {
    pola.push({ id: "q", typ: "liczba", etykieta: "$q =$" });
    odpowiedz.q = qq;
  }
  const rozwiazanie = [
    `Porównujemy $g(x) = f(x - p)${pionowo ? " + q" : ""}$ z podanym wzorem $g(x) = ${g}$.`,
    `Liczba odejmowana od $x$ to $p$: w $${argX(p)}$ mamy $p = ${p}$.`,
  ];
  if (pionowo) rozwiazanie.push(`Liczba dodana na końcu to $q$: $q = ${qq}$.`);
  return {
    tresc: `Wykres funkcji $g(x) = ${g}$ otrzymano z wykresu funkcji $f(x) = ${baza.f}$ przez przesunięcie o wektor $${pionowo ? "[p,q]" : "[p,0]"}$. Wyznacz ${pionowo ? "$p$ i $q$" : "$p$"}.`,
    pola,
    odpowiedz,
    wynik: `$${wek(p, qq)}$`,
    rozwiazanie,
  };
}

/** Zbiory kolejnych wartości do ozdobników. */
const NAZWY_PKT = [["P", "P'"], ["A", "A'"], ["M", "M'"], ["K", "K'"]];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 1.1
    {
      id: "wektor-na-plaszczyznie",
      nazwa: "Wektor na płaszczyźnie",
      sciaga: [
        {
          nazwa: "Wektor",
          slownie: "Wektor to odcinek, w którym wyróżniono początek i koniec – jak strzałka. Ma kierunek (prostą, na której leży), zwrot (od początku do końca) i długość.",
          tex: "\\overrightarrow{AB}\\qquad|\\overrightarrow{AB}|=|AB|",
          litery: "$A$ – początek wektora, $B$ – koniec, $|\\overrightarrow{AB}|$ – długość wektora, czyli długość odcinka $AB$.",
          przyklad: "Jeśli $|AB| = 5$, to wektor $\\overrightarrow{AB}$ ma długość $5$. Wektor $\\overrightarrow{BA}$ ma tę samą długość i ten sam kierunek, ale zwrot przeciwny.",
          uwaga: "Kolejność liter ma znaczenie: $\\overrightarrow{AB}$ i $\\overrightarrow{BA}$ to różne wektory.",
        },
        {
          nazwa: "Wektory równe",
          slownie: "Dwa wektory są równe, gdy mają ten sam kierunek, ten sam zwrot i tę samą długość. Nie ma znaczenia, gdzie leży ich początek.",
          tex: "\\overrightarrow{AB}=\\overrightarrow{DC}",
          przyklad: "W równoległoboku $ABCD$ boki $AB$ i $DC$ są równoległe i równe, a strzałki od $A$ do $B$ i od $D$ do $C$ wskazują tę samą stronę, więc $\\overrightarrow{AB}=\\overrightarrow{DC}$. Podobnie $\\overrightarrow{AD}=\\overrightarrow{BC}$.",
          uwaga: "Wektory $\\overrightarrow{AB}$ i $\\overrightarrow{CD}$ w równoległoboku $ABCD$ mają równe długości, ale przeciwne zwroty – nie są równe.",
        },
        {
          nazwa: "Wektor przeciwny",
          slownie: "Wektor przeciwny do danego ma tę samą długość i kierunek, ale przeciwny zwrot. Zamiana początku z końcem daje wektor przeciwny.",
          tex: "-\\overrightarrow{AB}=\\overrightarrow{BA}",
          przyklad: "W równoległoboku $ABCD$ wektor przeciwny do $\\overrightarrow{AB}$ to $\\overrightarrow{BA}$. Jest nim także $\\overrightarrow{CD}$, bo $\\overrightarrow{CD}=\\overrightarrow{BA}$.",
        },
        {
          nazwa: "Przesunięcie o wektor",
          slownie: "Przesunięcie punktu $P$ o wektor $\\vec{u}$ daje taki punkt $P'$, że $\\overrightarrow{PP'}=\\vec{u}$. Przesunięcie figury przesuwa wszystkie jej punkty o ten sam wektor, a figura się nie zmienia.",
          tex: "\\overrightarrow{PP'}=\\vec{u}",
          litery: "$P$ – punkt, $P'$ – jego obraz, $\\vec{u}$ – wektor przesunięcia.",
          przyklad: "Odcinek $AB$ po przesunięciu o wektor $\\vec{u}$, nierównoległy do $AB$, daje odcinek $A'B'$ równoległy i równy $AB$. Czworokąt $ABB'A'$ jest wtedy równoległobokiem.",
        },
      ],
      jak: [
        "Zapisz, który wektor jest dany i jaki ma początek oraz koniec.",
        "Pamiętaj: wektor równy danemu ma ten sam kierunek, zwrot i długość.",
        "W równoległoboku $ABCD$ równe są $\\overrightarrow{AB}=\\overrightarrow{DC}$ i $\\overrightarrow{AD}=\\overrightarrow{BC}$ (przeciwległe boki, strzałki skierowane w tę samą stronę).",
        "Gdy zamienisz początek z końcem, dostaniesz wektor przeciwny, a nie równy.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Czworokąt $ABCD$ jest równoległobokiem. Który wektor jest równy wektorowi $\\overrightarrow{BC}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\overrightarrow{CB}$", "$\\overrightarrow{AB}$", "$\\overrightarrow{AD}$", "$\\overrightarrow{DC}$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Wektor $\\overrightarrow{AB}$ ma długość $7$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wektor $\\overrightarrow{BA}$ ma długość $7$.", litery: "PF", poprawna: 0 },
            { tekst: "$\\overrightarrow{BA}=\\overrightarrow{AB}$", litery: "PF", poprawna: 1 },
            { tekst: "Wektory $\\overrightarrow{AB}$ i $\\overrightarrow{BA}$ mają ten sam kierunek.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "3",
          tresc: "Czworokąt $ABCD$ jest równoległobokiem, a punkt $S$ jest punktem przecięcia jego przekątnych. Który wektor jest równy wektorowi $\\overrightarrow{AS}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\overrightarrow{SC}$", "$\\overrightarrow{CS}$", "$\\overrightarrow{AC}$", "$\\overrightarrow{SB}$"],
          poprawna: 0,
        },
        {
          nr: "4",
          tresc: "Czworokąt $ABCD$ jest równoległobokiem. Który wektor jest przeciwny do wektora $\\overrightarrow{DA}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\overrightarrow{CB}$", "$\\overrightarrow{DC}$", "$\\overrightarrow{AB}$", "$\\overrightarrow{BC}$"],
          poprawna: 3,
        },
        {
          nr: "5",
          tresc: "Odcinek $PQ$ o długości $6$ przesunięto o wektor długości $4$, który nie jest równoległy do prostej $PQ$. Obrazem odcinka jest odcinek $P'Q'$. Jakim czworokątem jest zawsze czworokąt $PQQ'P'$? **Wybierz właściwą odpowiedź.**",
          opcje: ["prostokątem", "równoległobokiem", "rombem", "trapezem, który nie jest równoległobokiem"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Sześciokąt foremny $ABCDEF$ ma środek $O$. Wypisz wszystkie wektory o początku i końcu w punktach $A$, $B$, $C$, $D$, $E$, $F$, $O$, które są równe wektorowi $\\overrightarrow{AB}$ (poza nim samym). **Zapisz uzasadnienie.**",
          rozwiazanie: "Trójkąty $OAB$, $OBC$, $OCD$, $ODE$, $OEF$, $OFA$ są równoboczne, więc wszystkie odcinki $OA$, $OB$, $OC$, $OD$, $OE$, $OF$ i boki sześciokąta mają tę samą długość $a$.\n\nCzworokąty $ABCO$ i $ABOF$ mają wszystkie boki długości $a$, więc są rombami, czyli równoległobokami. Z równoległoboku $ABCO$ mamy $\\overrightarrow{AB}=\\overrightarrow{OC}$, a z $ABOF$ mamy $\\overrightarrow{AB}=\\overrightarrow{FO}$.\n\nCzworokąt $OCDE$ też jest rombem, więc $\\overrightarrow{OC}=\\overrightarrow{ED}$, czyli $\\overrightarrow{AB}=\\overrightarrow{ED}$.\n\nInne wektory o długości $a$ między tymi punktami mają inny kierunek albo inny zwrot niż $\\overrightarrow{AB}$.\n\nOdpowiedź: $\\overrightarrow{OC}$, $\\overrightarrow{FO}$, $\\overrightarrow{ED}$.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Cztery punkty $A$, $B$, $C$, $D$ nie leżą na jednej prostej i spełniają $\\overrightarrow{AB}=\\overrightarrow{DC}$. Uzasadnij, że czworokąt $ABCD$ jest równoległobokiem. **Zapisz uzasadnienie.**",
          rozwiazanie: "Z równości wektorów wynika, że $|AB|=|DC|$ oraz $AB\\parallel DC$.\n\nPrzesunięcie o wektor $\\overrightarrow{AB}=\\overrightarrow{DC}$ przeprowadza punkt $A$ na $B$, a punkt $D$ na $C$. Odcinek $AD$ przechodzi więc na odcinek $BC$.\n\nPrzesunięcie zachowuje długość i kierunek, więc $|AD|=|BC|$ oraz $AD\\parallel BC$.\n\nObie pary przeciwległych boków czworokąta są równoległe, zatem $ABCD$ jest równoległobokiem.\n\nOdpowiedź: czworokąt $ABCD$ jest równoległobokiem.",
        },
      ],
      generatory: [
        {
          id: "wektory-rowne-rownoleglobok",
          nazwa: "Wektory w równoległoboku",
          opis: "Wskaż wektor równy danemu wektorowi w równoległoboku (boki albo połowy przekątnych).",
          generuj(r) {
            const zestawy = [
              { w: ["A", "B", "C", "D"], s: "S" },
              { w: ["K", "L", "M", "N"], s: "O" },
              { w: ["P", "Q", "R", "T"], s: "S" },
              { w: ["E", "F", "G", "H"], s: "O" },
              { w: ["W", "X", "Y", "Z"], s: "O" },
            ];
            const { w, s } = r.pick(zestawy);
            const [a, b, c, d] = w;
            const typy = [
              { cel: [a, b], ok: [d, c], zle: [[c, d], [b, a], [a, d]], bok: true },
              { cel: [b, c], ok: [a, d], zle: [[d, a], [c, b], [b, a]], bok: true },
              { cel: [a, d], ok: [b, c], zle: [[c, b], [d, a], [a, b]], bok: true },
              { cel: [c, d], ok: [b, a], zle: [[a, b], [d, c], [c, b]], bok: true },
              { cel: [a, s], ok: [s, c], zle: [[c, s], [a, c], [s, b]], bok: false },
              { cel: [b, s], ok: [s, d], zle: [[d, s], [b, d], [s, a]], bok: false },
              { cel: [s, c], ok: [a, s], zle: [[c, s], [a, c], [d, s]], bok: false },
            ];
            const t = r.pick(typy);
            const nazwa = (p) => wv(p.join(""));
            const opcje = r.shuffle([t.ok, ...t.zle]);
            const poprawna = opcje.findIndex((o) => o === t.ok);
            const rozwiazanie = t.bok
              ? [
                  `Przeciwległe boki równoległoboku $${w.join("")}$ są równoległe i mają równe długości.`,
                  `Wektor równy $${nazwa(t.cel)}$ musi mieć ten sam zwrot, więc biegnie wzdłuż przeciwległego boku od $${t.ok[0]}$ do $${t.ok[1]}$.`,
                  `Zatem $${nazwa(t.cel)}=${nazwa(t.ok)}$. Pozostałe wektory mają zwrot przeciwny albo inny kierunek.`,
                ]
              : [
                  `Przekątne równoległoboku przecinają się w połowie, więc punkt $${s}$ jest środkiem odcinków $${a}${c}$ i $${b}${d}$.`,
                  `Wektory $${nazwa(t.cel)}$ i $${nazwa(t.ok)}$ leżą na tej samej przekątnej, mają równe długości (połowy przekątnej) i ten sam zwrot.`,
                  `Zatem $${nazwa(t.cel)}=${nazwa(t.ok)}$.`,
                ];
            return {
              tresc: `Czworokąt $${w.join("")}$ jest równoległobokiem, a punkt $${s}$ jest punktem przecięcia jego przekątnych. Który z podanych wektorów jest równy wektorowi $${nazwa(t.cel)}$?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Wektor równy $" + nazwa(t.cel) + "$", opcje: opcje.map((o) => `$${nazwa(o)}$`) }],
              odpowiedz: { w: poprawna },
              wynik: `$${nazwa(t.cel)}=${nazwa(t.ok)}$`,
              rozwiazanie,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 1.2
    {
      id: "wektor-w-ukladzie",
      nazwa: "Wektor w układzie współrzędnych",
      sciaga: [
        {
          nazwa: "Współrzędne wektora",
          slownie: "Współrzędne wektora $\\overrightarrow{AB}$ to różnice współrzędnych: od współrzędnych końca odejmij współrzędne początku.",
          tex: "A=(x_A,y_A),\\ B=(x_B,y_B)\\qquad\\overrightarrow{AB}=[x_B-x_A,\\ y_B-y_A]",
          litery: "$A=(x_A,y_A)$ – początek wektora, $B=(x_B,y_B)$ – koniec wektora.",
          przyklad: "Dla $A=(1,2)$ i $B=(4,-1)$: $\\overrightarrow{AB}=[4-1,\\ -1-2]=[3,-3]$.",
          uwaga: "Zawsze koniec minus początek. Odwrotna kolejność da wektor przeciwny, czyli ze znakami przeciwnymi.",
        },
        {
          nazwa: "Równość i wektor przeciwny",
          slownie: "Dwa wektory są równe, gdy mają równe odpowiednie współrzędne. Wektor przeciwny do $[a,b]$ ma współrzędne $[-a,-b]$.",
          tex: "[a,b]=[c,d]\\iff a=c\\ \\text{i}\\ b=d\\qquad-[a,b]=[-a,-b]",
          przyklad: "Wektorem przeciwnym do $[3,-5]$ jest $[-3,5]$. Wektory $[2,x]$ i $[2,7]$ są równe, gdy $x=7$.",
        },
        {
          nazwa: "Długość wektora",
          slownie: "Długość wektora to pierwiastek z sumy kwadratów jego współrzędnych (twierdzenie Pitagorasa). Jest równa długości odcinka $AB$.",
          tex: "|\\overrightarrow{u}|=\\sqrt{a^2+b^2}\\qquad\\vec{u}=[a,b]",
          przyklad: "Dla $\\vec{u}=[6,-8]$: $|\\vec{u}|=\\sqrt{36+64}=\\sqrt{100}=10$.",
          uwaga: "Pod pierwiastkiem są kwadraty, więc minusy znikają. Długość nigdy nie jest ujemna.",
        },
        {
          nazwa: "Przesunięcie punktu o wektor",
          slownie: "Aby przesunąć punkt o wektor $[a,b]$, dodaj $a$ do pierwszej współrzędnej, a $b$ do drugiej.",
          tex: "P=(x,y)\\qquad P'=(x+a,\\ y+b)",
          litery: "$[a,b]$ – wektor przesunięcia, $P'$ – obraz punktu $P$.",
          przyklad: "Punkt $(2,-3)$ po przesunięciu o wektor $[-4,5]$ trafia na $(2-4,\\ -3+5)=(-2,2)$.",
        },
        {
          nazwa: "Czwarty wierzchołek równoległoboku",
          slownie: "W równoległoboku $ABCD$ jest $\\overrightarrow{AB}=\\overrightarrow{DC}$. Porównaj współrzędne obu wektorów i oblicz brakujący wierzchołek.",
          tex: "x_B-x_A=x_C-x_D\\qquad y_B-y_A=y_C-y_D",
          przyklad: "Dla $A=(0,0)$, $B=(5,1)$, $C=(7,4)$ mamy $[5,1]=[7-x_D,\\ 4-y_D]$, więc $D=(2,3)$.",
          uwaga: "Kolejność liter ma znaczenie: $\\overrightarrow{AB}=\\overrightarrow{DC}$, a nie $\\overrightarrow{CD}$.",
        },
      ],
      jak: [
        "Zapisz współrzędne początku i końca wektora.",
        "Odejmij: współrzędne końca minus współrzędne początku. Zapisz wynik w nawiasie kwadratowym.",
        "Długość policz ze wzoru $\\sqrt{a^2+b^2}$ dla $[a,b]$.",
        "W zadaniach o równoległoboku zapisz równość wektorów i porównaj współrzędne.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Dane są punkty $A=(-2,3)$ i $B=(4,-1)$. Jakie współrzędne ma wektor $\\overrightarrow{AB}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$[-6,4]$", "$[6,4]$", "$[6,-4]$", "$[2,2]$"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Ile wynosi długość wektora $\\vec{u}=[-5,12]$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$17$", "$169$", "$13$"],
          poprawna: 3,
        },
        {
          nr: "10",
          tresc: "Punkt $P=(-1,4)$ przesunięto o wektor $[3,-6]$. Jakie współrzędne ma otrzymany punkt? **Wybierz właściwą odpowiedź.**",
          opcje: ["$(2,-2)$", "$(-4,10)$", "$(2,2)$", "$(-2,2)$"],
          poprawna: 0,
        },
        {
          nr: "11",
          tresc: "Dane są punkty $A=(1,1)$, $B=(5,4)$ i $C=(2,7)$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\overrightarrow{BA}=[4,3]$", litery: "PF", poprawna: 1 },
            { tekst: "$|\\overrightarrow{AB}|=5$", litery: "PF", poprawna: 0 },
            { tekst: "$|\\overrightarrow{AC}|=7$", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "12",
          tresc: "Punkty $A=(1,1)$, $B=(6,2)$, $C=(8,6)$ są kolejnymi wierzchołkami równoległoboku $ABCD$. Jakie współrzędne ma wierzchołek $D$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$(13,7)$", "$(3,5)$", "$(-1,-3)$", "$(15,9)$"],
          poprawna: 1,
        },
        {
          nr: "13",
          tresc: "Dane są punkty $A=(1,m)$ i $B=(4,5)$. Dla jakiej wartości $m$ wektor $\\overrightarrow{AB}$ jest równy wektorowi $[3,-2]$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$m=3$", "$m=-7$", "$m=7$", "$m=-3$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "14",
          punkty: 3,
          tresc: "Wierzchołki trójkąta $ABC$ mają współrzędne $A=(-1,2)$, $B=(3,-1)$, $C=(2,6)$. Oblicz długości boków tego trójkąta i sprawdź, czy jest on prostokątny. **Zapisz obliczenia.**",
          rozwiazanie: "$\\overrightarrow{AB}=[3-(-1),\\ -1-2]=[4,-3]$, więc $|AB|=\\sqrt{16+9}=5$.\n\n$\\overrightarrow{AC}=[2-(-1),\\ 6-2]=[3,4]$, więc $|AC|=\\sqrt{9+16}=5$.\n\n$\\overrightarrow{BC}=[2-3,\\ 6-(-1)]=[-1,7]$, więc $|BC|=\\sqrt{1+49}=\\sqrt{50}=5\\sqrt{2}$.\n\nSprawdzamy: $|AB|^2+|AC|^2=25+25=50=|BC|^2$. Z twierdzenia odwrotnego do twierdzenia Pitagorasa kąt przy wierzchołku $A$ jest prosty.\n\nOdpowiedź: boki mają długości $5$, $5$ i $5\\sqrt{2}$; trójkąt jest prostokątny (kąt prosty przy $A$).",
        },
        {
          nr: "15",
          punkty: 3,
          tresc: "Dane są punkty $A=(-3,1)$, $B=(2,-1)$, $C=(4,3)$. Wyznacz współrzędne takiego punktu $D$, że czworokąt $ABCD$ jest równoległobokiem, i oblicz długość wektora $\\overrightarrow{AD}$. **Zapisz obliczenia.**",
          rozwiazanie: "W równoległoboku $ABCD$ jest $\\overrightarrow{AB}=\\overrightarrow{DC}$.\n\n$\\overrightarrow{AB}=[2-(-3),\\ -1-1]=[5,-2]$ oraz $\\overrightarrow{DC}=[4-x_D,\\ 3-y_D]$.\n\nZ równości współrzędnych: $4-x_D=5$, czyli $x_D=-1$, oraz $3-y_D=-2$, czyli $y_D=5$. Zatem $D=(-1,5)$.\n\n$\\overrightarrow{AD}=[-1-(-3),\\ 5-1]=[2,4]$, więc $|\\overrightarrow{AD}|=\\sqrt{4+16}=\\sqrt{20}=2\\sqrt{5}$.\n\nOdpowiedź: $D=(-1,5)$, $|\\overrightarrow{AD}|=2\\sqrt{5}$.",
        },
      ],
      generatory: [
        {
          id: "wspolrzedne-i-dlugosc",
          nazwa: "Współrzędne i długość wektora",
          opis: "Oblicz współrzędne albo długość wektora o danym początku i końcu.",
          generuj(r) {
            const [A, B] = r.pick([["A", "B"], ["K", "L"], ["P", "Q"], ["M", "N"]]);
            const xA = r.int(-6, 6), yA = r.int(-6, 6);
            if (r.chance()) {
              let dx, dy;
              do { dx = r.int(-7, 7); dy = r.int(-7, 7); } while (dx === 0 && dy === 0);
              const xB = xA + dx, yB = yA + dy;
              return {
                tresc: `Dane są punkty $${A}=${pkt(xA, yA)}$ i $${B}=${pkt(xB, yB)}$. Wyznacz współrzędne wektora $${wv(A + B)}=[a,b]$.`,
                pola: [{ id: "a", typ: "liczba", etykieta: "$a =$" }, { id: "b", typ: "liczba", etykieta: "$b =$" }],
                odpowiedz: { a: dx, b: dy },
                wynik: `$${wv(A + B)}=${wek(dx, dy)}$`,
                rozwiazanie: [
                  `Współrzędne wektora to współrzędne końca minus współrzędne początku.`,
                  `$${wv(A + B)}=[x_${B} - x_${A},\\ y_${B} - y_${A}]=[${xB} - ${texNawias(xA)},\\ ${yB} - ${texNawias(yA)}]=${wek(dx, dy)}$.`,
                ],
              };
            }
            const [u, v, c] = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]);
            const [dx, dy] = (r.chance() ? [u, v] : [v, u]).map((n) => n * r.znak());
            const xB = xA + dx, yB = yA + dy;
            return {
              tresc: `Dane są punkty $${A}=${pkt(xA, yA)}$ i $${B}=${pkt(xB, yB)}$. Oblicz długość wektora $${wv(A + B)}$.`,
              pola: [{ id: "d", typ: "liczba", etykieta: `$|${wv(A + B)}| =$` }],
              odpowiedz: { d: c },
              wynik: `$|${wv(A + B)}|=${c}$`,
              rozwiazanie: [
                `$${wv(A + B)}=[${xB} - ${texNawias(xA)},\\ ${yB} - ${texNawias(yA)}]=${wek(dx, dy)}$.`,
                `$|${wv(A + B)}|=\\sqrt{${texNawias(dx)}^2 + ${texNawias(dy)}^2}=\\sqrt{${dx * dx} + ${dy * dy}}=\\sqrt{${c * c}}=${c}$.`,
              ],
            };
          },
        },
        {
          id: "przesuniecie-i-rownoleglobok",
          nazwa: "Przesunięcie i równoległobok",
          opis: "Znajdź obraz punktu w przesunięciu, początek wektora albo czwarty wierzchołek równoległoboku.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const [P, P1] = r.pick(NAZWY_PKT);
              const x = r.int(-6, 6), y = r.int(-6, 6);
              let a, b;
              do { a = r.int(-6, 6); b = r.int(-6, 6); } while (a === 0 && b === 0);
              return {
                tresc: `Punkt $${P}=${pkt(x, y)}$ przesunięto o wektor $${wek(a, b)}$. Podaj współrzędne obrazu $${P1}=(x,y)$ tego punktu.`,
                pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }, { id: "y", typ: "liczba", etykieta: "$y =$" }],
                odpowiedz: { x: x + a, y: y + b },
                wynik: `$${P1}=${pkt(x + a, y + b)}$`,
                rozwiazanie: [
                  `Przy przesunięciu o wektor $[a,b]$ do pierwszej współrzędnej dodajemy $a$, a do drugiej $b$.`,
                  `$${P1}=(${x} ${plusMinus(a)},\\ ${y} ${plusMinus(b)})=${pkt(x + a, y + b)}$.`,
                ],
              };
            }
            if (tryb === 1) {
              const [A, B] = r.pick([["A", "B"], ["K", "L"], ["P", "Q"]]);
              const xB = r.int(-6, 6), yB = r.int(-6, 6);
              let a, b;
              do { a = r.int(-6, 6); b = r.int(-6, 6); } while (a === 0 && b === 0);
              return {
                tresc: `Wektor $${wv(A + B)}=${wek(a, b)}$ ma koniec w punkcie $${B}=${pkt(xB, yB)}$. Wyznacz współrzędne początku $${A}=(x,y)$ tego wektora.`,
                pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }, { id: "y", typ: "liczba", etykieta: "$y =$" }],
                odpowiedz: { x: xB - a, y: yB - b },
                wynik: `$${A}=${pkt(xB - a, yB - b)}$`,
                rozwiazanie: [
                  `Z definicji $${wek(a, b)}=[${xB} - x,\\ ${yB} - y]$.`,
                  `Stąd $${xB} - x = ${a}$, więc $x = ${xB - a}$, oraz $${yB} - y = ${b}$, więc $y = ${yB - b}$.`,
                ],
              };
            }
            const [A, B, C, D] = r.pick([["A", "B", "C", "D"], ["K", "L", "M", "N"], ["P", "Q", "R", "S"]]);
            for (;;) {
              const xA = r.int(-5, 5), yA = r.int(-5, 5), xB = r.int(-5, 6), yB = r.int(-5, 6), xC = r.int(-5, 7), yC = r.int(-5, 7);
              const iloczyn = (xB - xA) * (yC - yA) - (yB - yA) * (xC - xA);
              if (iloczyn === 0) continue;
              const xD = xA + xC - xB, yD = yA + yC - yB;
              return {
                tresc: `Punkty $${A}=${pkt(xA, yA)}$, $${B}=${pkt(xB, yB)}$, $${C}=${pkt(xC, yC)}$ są kolejnymi wierzchołkami równoległoboku $${A}${B}${C}${D}$. Wyznacz współrzędne wierzchołka $${D}=(x,y)$.`,
                pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }, { id: "y", typ: "liczba", etykieta: "$y =$" }],
                odpowiedz: { x: xD, y: yD },
                wynik: `$${D}=${pkt(xD, yD)}$`,
                rozwiazanie: [
                  `W równoległoboku $${A}${B}${C}${D}$ jest $${wv(A + B)}=${wv(D + C)}$.`,
                  `$${wv(A + B)}=[${xB} - ${texNawias(xA)},\\ ${yB} - ${texNawias(yA)}]=${wek(xB - xA, yB - yA)}$ oraz $${wv(D + C)}=[${xC} - x,\\ ${yC} - y]$.`,
                  `Stąd $${xC} - x = ${xB - xA}$, więc $x = ${xD}$, oraz $${yC} - y = ${yB - yA}$, więc $y = ${yD}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 1.3
    {
      id: "przesuniecie-ox",
      nazwa: "Przesunięcie równoległe wzdłuż osi OX",
      sciaga: [
        {
          nazwa: "Przesunięcie wzdłuż osi OX",
          slownie: "Wykres funkcji $y=f(x-p)$ powstaje z wykresu $y=f(x)$ przez przesunięcie o wektor $[p,0]$: w prawo, gdy $p>0$, w lewo, gdy $p<0$.",
          tex: "y=f(x)\\ \\to\\ y=f(x-p)\\qquad\\vec{u}=[p,0]",
          litery: "$p$ – o ile jednostek przesuwamy wykres wzdłuż osi $OX$ (dodatnia liczba to prawo).",
          przyklad: "Wykres $y=x^2$ przesunięty o wektor $[3,0]$ to wykres $y=(x-3)^2$, a o wektor $[-2,0]$ to wykres $y=(x+2)^2$.",
          uwaga: "Znak jest „na odwrót”: $f(x+2)$ przesuwa wykres o $2$ w lewo, a nie w prawo.",
        },
        {
          nazwa: "Co się zmienia, a co nie",
          slownie: "Każdy punkt $(a,b)$ wykresu trafia na punkt $(a+p,b)$. Dziedzina i miejsca zerowe przesuwają się o $p$, a zbiór wartości oraz najmniejsza i największa wartość zostają bez zmian.",
          tex: "(a,b)\\ \\to\\ (a+p,\\ b)",
          przyklad: "Funkcja $f$ ma dziedzinę $\\langle -1,4\\rangle$ i miejsca zerowe $0$ i $3$. Funkcja $g(x)=f(x-2)$ ma dziedzinę $\\langle 1,6\\rangle$ i miejsca zerowe $2$ i $5$.",
          uwaga: "Zbiór wartości nie zależy od przesunięcia poziomego.",
        },
        {
          nazwa: "Wzór po przesunięciu",
          slownie: "Aby zapisać wzór po przesunięciu o $[p,0]$, w całym wzorze funkcji zamień $x$ na $(x-p)$.",
          tex: "g(x)=f(x-p)",
          przyklad: "Dla $f(x)=2x+1$ i wektora $[3,0]$: $g(x)=2(x-3)+1=2x-5$. Dla $f(x)=\\frac{1}{x}$ i wektora $[2,0]$: $g(x)=\\frac{1}{x-2}$, dziedzina $x\\neq 2$.",
          uwaga: "Nie pomijaj nawiasu: dla $f(x)=2x$ po przesunięciu o $[3,0]$ jest $2(x-3)$, a nie $2x-3$.",
        },
        {
          nazwa: "Wektor przesunięcia ze wzoru",
          slownie: "Z wzoru $g(x)=f(x-p)$ odczytaj $p$: to liczba odejmowana od $x$. Gdy w nawiasie jest plus, $p$ jest ujemne.",
          przyklad: "$g(x)=(x+5)^2=(x-(-5))^2$, więc wykres $y=x^2$ przesunięto o wektor $[-5,0]$. Z kolei $g(x)=2^{x-1}$ powstaje przez przesunięcie $y=2^x$ o $[1,0]$.",
        },
      ],
      jak: [
        "Zapisz wzór funkcji wyjściowej $f$ i wektor $[p,0]$.",
        "W całym wzorze $f$ zastąp $x$ przez $(x-p)$. Uważaj na znak: w prawo odejmujemy, w lewo dodajemy.",
        "Dziedzinę i miejsca zerowe przesuń o $p$, a zbiór wartości przepisz bez zmian.",
        "Sprawdź na jednym punkcie: $(a,b)$ powinien trafić na $(a+p,b)$.",
      ],
      zadania: [
        {
          nr: "16",
          tresc: "Wykres funkcji $f(x)=x^2$ przesunięto o wektor $[4,0]$. Wykresem której funkcji jest otrzymany wykres? **Wybierz właściwą odpowiedź.**",
          opcje: ["$y=x^2+4$", "$y=(x+4)^2$", "$y=x^2-4$", "$y=(x-4)^2$"],
          poprawna: 3,
        },
        {
          nr: "17",
          tresc: "Wykres funkcji $g(x)=\\frac{1}{x+3}$ otrzymano z wykresu funkcji $y=\\frac{1}{x}$ przez przesunięcie. Jaki to wektor? **Wybierz właściwą odpowiedź.**",
          opcje: ["$[3,0]$", "$[0,3]$", "$[-3,0]$", "$[0,-3]$"],
          poprawna: 2,
        },
        {
          nr: "18",
          tresc: "Funkcja $f$ ma dokładnie dwa miejsca zerowe: $-2$ i $1$. Jakie są miejsca zerowe funkcji $g(x)=f(x-5)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-7$ i $-4$", "$3$ i $6$", "$-2$ i $1$", "$-10$ i $5$"],
          poprawna: 1,
        },
        {
          nr: "19",
          tresc: "Funkcja $f$ ma dziedzinę $\\langle -3,2\\rangle$ i zbiór wartości $\\langle 0,9\\rangle$. Funkcja $g$ jest określona wzorem $g(x)=f(x+1)$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Dziedziną funkcji $g$ jest przedział $\\langle -4,1\\rangle$.", litery: "PF", poprawna: 0 },
            { tekst: "Zbiorem wartości funkcji $g$ jest przedział $\\langle 1,10\\rangle$.", litery: "PF", poprawna: 1 },
            { tekst: "Największa wartość funkcji $g$ jest równa $9$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "20",
          tresc: "Wykres funkcji $f(x)=2x+1$ przesunięto o wektor $[3,0]$. Jaki wzór ma funkcja otrzymana po przesunięciu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$g(x)=2x-2$", "$g(x)=2x+7$", "$g(x)=2x-5$", "$g(x)=2x+4$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "21",
          punkty: 2,
          tresc: "Wykres funkcji $f(x)=x^2$ przesunięto o wektor $[-2,0]$ i otrzymano wykres funkcji $g$. Zapisz wzór funkcji $g$, sprawdź, czy punkt $(1,9)$ należy do jej wykresu, i podaj miejsce zerowe funkcji $g$. **Zapisz obliczenia.**",
          rozwiazanie: "Wektor $[-2,0]$ oznacza $p=-2$, więc $g(x)=f(x-(-2))=f(x+2)=(x+2)^2$.\n\nDla $x=1$: $g(1)=(1+2)^2=9$, więc punkt $(1,9)$ należy do wykresu $g$.\n\nMiejsce zerowe: $(x+2)^2=0$, czyli $x=-2$. Jest to miejsce zerowe $f$ (czyli $0$) przesunięte o $-2$.\n\nOdpowiedź: $g(x)=(x+2)^2$, punkt $(1,9)$ należy do wykresu, miejsce zerowe $x=-2$.",
        },
        {
          nr: "22",
          punkty: 2,
          tresc: "Wykres funkcji $f(x)=\\frac{2}{x}$ przesunięto o wektor $[3,0]$ i otrzymano wykres funkcji $g$. Zapisz wzór funkcji $g$, podaj jej dziedzinę i rozwiąż równanie $g(x)=1$. **Zapisz obliczenia.**",
          rozwiazanie: "Dla $p=3$ mamy $g(x)=f(x-3)=\\frac{2}{x-3}$.\n\nDziedzina funkcji $f$ to $\\mathbb{R}\\setminus\\{0\\}$, po przesunięciu o $3$ w prawo: $\\mathbb{R}\\setminus\\{3\\}$, bo mianownik nie może być równy zero.\n\nRównanie $\\frac{2}{x-3}=1$ daje $x-3=2$, czyli $x=5$. Liczba $5$ należy do dziedziny.\n\nOdpowiedź: $g(x)=\\frac{2}{x-3}$, $D_g=\\mathbb{R}\\setminus\\{3\\}$, $x=5$.",
        },
      ],
      generatory: [
        {
          id: "wzor-po-przesunieciu-ox",
          nazwa: "Wzór i wektor poziomy",
          opis: "Wskaż wzór po przesunięciu wzdłuż osi OX albo odczytaj wektor przesunięcia ze wzoru.",
          generuj(r) {
            const p = r.intBez(-6, 6, 0);
            if (r.chance(0.6)) return zadanieWzor(r, p, 0, losujBaze(r));
            return zadanieWektor(r, { pionowo: false });
          },
        },
        {
          id: "dziedzina-i-zera-ox",
          nazwa: "Dziedzina i miejsca zerowe",
          opis: "Znajdź miejsca zerowe albo dziedzinę funkcji po przesunięciu wzdłuż osi OX.",
          generuj(r) {
            const p = r.intBez(-6, 6, 0);
            const zapis = r.chance() ? `g(x) = f(${argX(p)})` : null;
            const wektor = `$${wek(p, 0)}$`;
            const opisPrzes = zapis ? `Funkcja $g$ jest określona wzorem $${zapis}$` : `Wykres funkcji $f$ przesunięto o wektor ${wektor} i otrzymano wykres funkcji $g$`;
            if (r.chance()) {
              const x1 = r.int(-5, 4);
              const x2 = x1 + r.int(1, 6);
              return {
                tresc: `Funkcja $f$ ma dokładnie dwa miejsca zerowe: $${x1}$ i $${x2}$. ${opisPrzes}. Podaj miejsca zerowe funkcji $g$.`,
                pola: [{ id: "m", typ: "zbior", ile: 2, etykieta: "Miejsca zerowe funkcji $g$" }],
                odpowiedz: { m: [x1 + p, x2 + p] },
                wynik: `$x = ${x1 + p}$ lub $x = ${x2 + p}$`,
                rozwiazanie: [
                  `Wykres $g$ powstaje z wykresu $f$ przez przesunięcie o wektor ${wektor}, więc każdy punkt $(a,0)$ przechodzi na $(a ${plusMinus(p)},0)$.`,
                  `$${x1} ${plusMinus(p)} = ${x1 + p}$ oraz $${x2} ${plusMinus(p)} = ${x2 + p}$.`,
                ],
              };
            }
            const t = r.int(0, 4);
            const a = r.int(-6, 2), b = a + r.int(2, 7);
            const opcje = opcjePrzedzialu(t, a, b, p, 0);
            const poprawna = opcje[0];
            const mieszane = r.shuffle(opcje);
            const koniec = (x) => `$${x} ${plusMinus(p)} = ${x + p}$`;
            const kroki = [`Przesunięcie o wektor ${wektor} przesuwa wszystkie punkty wykresu w poziomie o $${p}$, więc końce dziedziny też.`];
            if (t !== 3) kroki.push(`Lewy koniec: ${koniec(a)}.`);
            if (t !== 2 && t !== 4) kroki.push(`Prawy koniec: ${koniec(b)}.`);
            kroki.push(`Dziedzina funkcji $g$: ${poprawna}.`);
            return {
              tresc: `Dziedziną funkcji $f$ jest przedział $${przedzialTex(t, a, b)}$. ${opisPrzes}. Wskaż dziedzinę funkcji $g$.`,
              pola: [{ id: "d", typ: "wybor", etykieta: "Dziedzina funkcji $g$", opcje: mieszane }],
              odpowiedz: { d: mieszane.indexOf(poprawna) },
              wynik: `$D_g = ${przedzialTex(t, a + p, b + p)}$`,
              rozwiazanie: kroki,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 1.4
    {
      id: "przesuniecie-oy",
      nazwa: "Przesunięcie równoległe wzdłuż osi OY",
      sciaga: [
        {
          nazwa: "Przesunięcie wzdłuż osi OY",
          slownie: "Wykres funkcji $y=f(x)+q$ powstaje z wykresu $y=f(x)$ przez przesunięcie o wektor $[0,q]$: w górę, gdy $q>0$, w dół, gdy $q<0$.",
          tex: "y=f(x)\\ \\to\\ y=f(x)+q\\qquad\\vec{u}=[0,q]",
          litery: "$q$ – o ile jednostek przesuwamy wykres wzdłuż osi $OY$ (dodatnia liczba to góra).",
          przyklad: "Wykres $y=x^2$ przesunięty o $[0,3]$ to $y=x^2+3$, a o $[0,-1]$ to $y=x^2-1$.",
          uwaga: "Tu znak jest „zgodny”: $+q$ przesuwa w górę. Inaczej niż przy osi $OX$, gdzie $f(x-p)$ przesuwa w prawo.",
        },
        {
          nazwa: "Co się zmienia, a co nie",
          slownie: "Każdy punkt $(a,b)$ wykresu trafia na $(a,b+q)$. Zbiór wartości oraz największa i najmniejsza wartość przesuwają się o $q$, a dziedzina zostaje bez zmian. Miejsca zerowe trzeba policzyć od nowa.",
          tex: "(a,b)\\ \\to\\ (a,\\ b+q)",
          przyklad: "Funkcja $f(x)=x^2$ ma zbiór wartości $\\langle 0,+\\infty)$, a $g(x)=x^2-4$ ma $\\langle -4,+\\infty)$. Miejsca zerowe $g$: $x^2=4$, czyli $x=-2$ lub $x=2$.",
          uwaga: "Miejsce zerowe nie przesuwa się o $q$. Rozwiąż równanie $g(x)=0$.",
        },
        {
          nazwa: "Przesunięcie o wektor [p, q]",
          slownie: "Przesunięcie o wektor $[p,q]$ to przesunięcie o $p$ wzdłuż osi $OX$ i o $q$ wzdłuż osi $OY$. Kolejność nie ma znaczenia.",
          tex: "y=f(x-p)+q\\qquad\\vec{u}=[p,q]",
          przyklad: "Wykres $y=x^2$ przesunięty o $[2,-3]$ to $y=(x-2)^2-3$. Hiperbola $y=\\frac{1}{x}$ przesunięta o $[1,2]$ to $y=\\frac{1}{x-1}+2$ (dziedzina $x\\neq 1$, zbiór wartości $y\\neq 2$).",
        },
        {
          nazwa: "Wektor ze wzoru",
          slownie: "Ze wzoru $g(x)=f(x-p)+q$ odczytaj: liczba odjęta od $x$ to $p$, a liczba dodana na końcu to $q$.",
          przyklad: "$g(x)=(x+3)^2-7$: $p=-3$, $q=-7$, więc wykres $y=x^2$ przesunięto o wektor $[-3,-7]$.",
        },
      ],
      jak: [
        "Zapisz $f$ i wektor $[p,q]$. Pamiętaj: $p$ dotyczy poziomu (odejmujemy od $x$), $q$ pionu (dodajemy do wyniku).",
        "Zapisz wzór $g(x)=f(x-p)+q$ i uprość.",
        "Zbiór wartości przesuń o $q$, dziedzinę o $p$.",
        "Miejsca zerowe nowej funkcji znajdź z równania $g(x)=0$.",
      ],
      zadania: [
        {
          nr: "23",
          tresc: "Wykres funkcji $f(x)=x^2$ przesunięto o wektor $[0,-5]$. Wykresem której funkcji jest otrzymany wykres? **Wybierz właściwą odpowiedź.**",
          opcje: ["$y=(x-5)^2$", "$y=x^2+5$", "$y=(x+5)^2$", "$y=x^2-5$"],
          poprawna: 3,
        },
        {
          nr: "24",
          tresc: "Wykres funkcji $g(x)=\\frac{1}{x}+2$ otrzymano z wykresu funkcji $y=\\frac{1}{x}$ przez przesunięcie. Jaki to wektor? **Wybierz właściwą odpowiedź.**",
          opcje: ["$[2,0]$", "$[0,2]$", "$[-2,0]$", "$[0,-2]$"],
          poprawna: 1,
        },
        {
          nr: "25",
          tresc: "Funkcja $f$ ma zbiór wartości $\\langle -1,5\\rangle$. Jaki jest zbiór wartości funkcji $g(x)=f(x)+3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\langle -1,5\\rangle$", "$\\langle -4,2\\rangle$", "$\\langle 2,8\\rangle$", "$\\langle -1,8\\rangle$"],
          poprawna: 2,
        },
        {
          nr: "26",
          tresc: "Wykres funkcji $f(x)=x^2$ przesunięto o wektor $[-1,4]$. Jaki wzór ma otrzymana funkcja? **Wybierz właściwą odpowiedź.**",
          opcje: ["$g(x)=(x-1)^2+4$", "$g(x)=(x+1)^2+4$", "$g(x)=(x+1)^2-4$", "$g(x)=(x-1)^2-4$"],
          poprawna: 1,
        },
        {
          nr: "27",
          tresc: "Wykres funkcji $f(x)=x^2$ przesunięto o wektor $[0,-9]$ i otrzymano wykres funkcji $g$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Zbiorem wartości funkcji $g$ jest przedział $\\langle -9,+\\infty)$.", litery: "PF", poprawna: 0 },
            { tekst: "Miejscami zerowymi funkcji $g$ są liczby $-3$ i $3$.", litery: "PF", poprawna: 0 },
            { tekst: "Dziedziną funkcji $g$ jest przedział $\\langle -9,+\\infty)$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "28",
          tresc: "Wykres funkcji $f(x)=2x$ przesunięto o wektor $[0,-6]$. Jakie jest miejsce zerowe otrzymanej funkcji? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-3$", "$6$", "$3$", "$-6$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "29",
          punkty: 3,
          tresc: "Wykres funkcji $f(x)=x^2$ przesunięto o wektor $[2,-4]$ i otrzymano wykres funkcji $g$. Zapisz wzór funkcji $g$, podaj jej zbiór wartości i oblicz jej miejsca zerowe. **Zapisz obliczenia.**",
          rozwiazanie: "Dla $p=2$ i $q=-4$ mamy $g(x)=f(x-2)-4=(x-2)^2-4$.\n\nZbiór wartości funkcji $f$ to $\\langle 0,+\\infty)$. Przesunięcie w dół o $4$ daje zbiór wartości $g$: $\\langle -4,+\\infty)$.\n\nMiejsca zerowe: $(x-2)^2-4=0$, czyli $(x-2)^2=4$, więc $x-2=2$ lub $x-2=-2$.\n\nStąd $x=4$ lub $x=0$.\n\nOdpowiedź: $g(x)=(x-2)^2-4$, $ZW_g=\\langle -4,+\\infty)$, miejsca zerowe $0$ i $4$.",
        },
        {
          nr: "30",
          punkty: 3,
          tresc: "Wykres funkcji $f(x)=\\frac{1}{x}$ przesunięto o wektor $[-2,1]$ i otrzymano wykres funkcji $g$. Zapisz wzór funkcji $g$, podaj jej dziedzinę i zbiór wartości oraz oblicz miejsce zerowe. **Zapisz obliczenia.**",
          rozwiazanie: "Dla $p=-2$ i $q=1$ mamy $g(x)=f(x+2)+1=\\frac{1}{x+2}+1$.\n\nDziedzina $f$ to $\\mathbb{R}\\setminus\\{0\\}$, po przesunięciu o $-2$ poziomo: $D_g=\\mathbb{R}\\setminus\\{-2\\}$. Zbiór wartości $f$ to $\\mathbb{R}\\setminus\\{0\\}$, po przesunięciu o $1$ w górę: $ZW_g=\\mathbb{R}\\setminus\\{1\\}$.\n\nMiejsce zerowe: $\\frac{1}{x+2}+1=0$, czyli $\\frac{1}{x+2}=-1$, więc $x+2=-1$ i $x=-3$. Liczba $-3$ należy do dziedziny.\n\nOdpowiedź: $g(x)=\\frac{1}{x+2}+1$, $D_g=\\mathbb{R}\\setminus\\{-2\\}$, $ZW_g=\\mathbb{R}\\setminus\\{1\\}$, miejsce zerowe $x=-3$.",
        },
      ],
      generatory: [
        {
          id: "wzor-po-przesunieciu-oy",
          nazwa: "Wzór i wektor [p, q]",
          opis: "Wskaż wzór po przesunięciu o wektor [p, q] albo odczytaj p i q ze wzoru.",
          generuj(r) {
            if (r.chance(0.6)) {
              const jednoOs = r.chance(0.5);
              const p = jednoOs ? 0 : r.intBez(-5, 5, 0);
              const qq = r.intBez(-6, 6, 0);
              return zadanieWzor(r, p, qq, losujBaze(r));
            }
            return zadanieWektor(r, { pionowo: true });
          },
        },
        {
          id: "wartosci-i-zera-oy",
          nazwa: "Zbiór wartości i zera",
          opis: "Wyznacz zbiór wartości albo miejsca zerowe funkcji po przesunięciu w pionie.",
          generuj(r) {
            const tryb = r.pick([0, 0, 1, 2]);
            if (tryb === 0) {
              const t = r.pick([0, 2, 3, 4]);
              const a = r.int(-6, 3), b = a + r.int(2, 7);
              const qq = r.intBez(-7, 7, 0);
              const p = r.int(-5, 5);
              const opcje = opcjePrzedzialu(t, a, b, qq, p);
              const poprawna = opcje[0];
              const mieszane = r.shuffle(opcje);
              const koniec = (x) => `$${x} ${plusMinus(qq)} = ${x + qq}$`;
              const kroki = [`Przesunięcie o wektor $${wek(p, qq)}$ w poziomie nie zmienia zbioru wartości, a w pionie przesuwa go o $${qq}$.`];
              if (t !== 3) kroki.push(`Dolny koniec: ${koniec(a)}.`);
              if (t === 0 || t === 3) kroki.push(`Górny koniec: ${koniec(b)}.`);
              kroki.push(`Zbiór wartości funkcji $g$: ${poprawna}.`);
              return {
                tresc: `Zbiorem wartości funkcji $f$ jest przedział $${przedzialTex(t, a, b)}$. Wykres funkcji $f$ przesunięto o wektor $${wek(p, qq)}$ i otrzymano wykres funkcji $g$. Wskaż zbiór wartości funkcji $g$.`,
                pola: [{ id: "z", typ: "wybor", etykieta: "Zbiór wartości funkcji $g$", opcje: mieszane }],
                odpowiedz: { z: mieszane.indexOf(poprawna) },
                wynik: `$ZW_g = ${przedzialTex(t, a + qq, b + qq)}$`,
                rozwiazanie: kroki,
              };
            }
            if (tryb === 1) {
              const a = r.pick([-4, -3, -2, -1, 1, 2, 3, 4]);
              const b = r.int(-6, 6);
              let qq;
              do { qq = r.intBez(-8, 8, 0); } while (b + qq === 0);
              const x0 = q(-(b + qq), a);
              return {
                tresc: `Wykres funkcji $f(x) = ${wielomianTex([a, b])}$ przesunięto o wektor $[0,${qq}]$ i otrzymano wykres funkcji $g$. Podaj miejsce zerowe funkcji $g$.`,
                pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }],
                odpowiedz: { x: x0 },
                wynik: `$x = ${x0.tex()}$`,
                rozwiazanie: [
                  `Przesunięcie o $[0,${qq}]$ daje $g(x) = f(x) ${plusMinus(qq)} = ${wielomianTex([a, b + qq])}$.`,
                  `Miejsce zerowe: $${wielomianTex([a, b + qq])} = 0$, czyli $${wsp(a)}x = ${-(b + qq)}$.`,
                  `Stąd $x = ${x0.tex()}$.`,
                ],
              };
            }
            const k = r.int(1, 6);
            return {
              tresc: `Wykres funkcji $f(x) = x^2$ przesunięto o wektor $[0,${-k * k}]$ i otrzymano wykres funkcji $g$. Podaj miejsca zerowe funkcji $g$.`,
              pola: [{ id: "m", typ: "zbior", ile: 2, etykieta: "Miejsca zerowe funkcji $g$" }],
              odpowiedz: { m: [-k, k] },
              wynik: `$x = ${-k}$ lub $x = ${k}$`,
              rozwiazanie: [
                `$g(x) = x^2 - ${k * k}$.`,
                `Rozwiązujemy $x^2 - ${k * k} = 0$, czyli $x^2 = ${k * k}$.`,
                `Stąd $x = ${-k}$ lub $x = ${k}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 1.7
    {
      id: "rownania-z-wykresu",
      nazwa: "Zastosowanie wykresów funkcji do rozwiązywania równań i nierówności",
      sciaga: [
        {
          nazwa: "Równanie z dwóch wykresów",
          slownie: "Rozwiązaniami równania $f(x)=g(x)$ są pierwsze współrzędne punktów wspólnych wykresów funkcji $f$ i $g$.",
          przyklad: "Wykresy $y=x^2$ i $y=x+2$ przecinają się w punktach $(-1,1)$ i $(2,4)$, więc równanie $x^2=x+2$ ma rozwiązania $x=-1$ i $x=2$.",
          uwaga: "Rozwiązaniem jest pierwsza współrzędna punktu wspólnego ($x$), a nie druga.",
        },
        {
          nazwa: "Nierówność z dwóch wykresów",
          slownie: "Nierówność $f(x)>g(x)$ spełniają te $x$, dla których wykres $f$ leży nad wykresem $g$. Nierówność $f(x)<g(x)$ – te, dla których leży pod.",
          tex: "f(x)>g(x)\\qquad\\text{wykres }f\\text{ nad }g",
          przyklad: "Dla wykresów $y=x^2$ i $y=x+2$: $x^2<x+2$ dla $x\\in(-1,2)$ (parabola pod prostą), a $x^2>x+2$ dla $x\\in(-\\infty,-1)\\cup(2,+\\infty)$.",
          uwaga: "Przy nierówności nieostrej ($\\le$, $\\ge$) do rozwiązania należą też pierwsze współrzędne punktów wspólnych.",
        },
        {
          nazwa: "Liczba rozwiązań równania f(x)=m",
          slownie: "Równanie $f(x)=m$ ma tyle rozwiązań, ile punktów wspólnych ma wykres $f$ z poziomą prostą $y=m$. Dla paraboli $y=(x-p)^2+q$ o ramionach w górę wszystko zależy od położenia prostej względem wierzchołka.",
          tex: "m<q:\\ 0\\ \\text{rozw.}\\qquad m=q:\\ 1\\ \\text{rozw.}\\qquad m>q:\\ 2\\ \\text{rozw.}",
          litery: "$(p,q)$ – wierzchołek paraboli, $m$ – wysokość poziomej prostej $y=m$.",
          przyklad: "Dla $f(x)=(x-1)^2+2$ (wierzchołek $(1,2)$): dla $m<2$ nie ma rozwiązań, dla $m=2$ jest jedno ($x=1$), a dla $m>2$ są dwa.",
          uwaga: "Przy ramionach skierowanych w dół odwróć warunki: wtedy dla $m>q$ nie ma rozwiązań.",
        },
        {
          nazwa: "Równanie z przesuniętej paraboli",
          slownie: "Gdy $m>q$, rozwiązania równania $(x-p)^2+q=m$ leżą symetrycznie względem prostej $x=p$: odejmij $q$, a potem przejdź do dwóch równań liniowych.",
          tex: "(x-p)^2=m-q\\qquad x=p\\pm\\sqrt{m-q}",
          przyklad: "Równanie $(x-3)^2+1=10$ daje $(x-3)^2=9$, więc $x-3=3$ lub $x-3=-3$, czyli $x=6$ lub $x=0$.",
        },
        {
          nazwa: "Nierówność z paraboli i prostej",
          slownie: "Parabola o ramionach w górę leży pod prostą $y=m$ między punktami wspólnymi, a nad nią – na zewnątrz tych punktów.",
          przyklad: "Nierówność $(x-3)^2+1<10$: punkty wspólne dla $x=0$ i $x=6$, parabola jest pod prostą między nimi, więc $x\\in(0,6)$. Nierówność $(x-3)^2+1\\ge 10$: $x\\in(-\\infty,0\\rangle\\cup\\langle 6,+\\infty)$.",
          uwaga: "Dla $<$ i $>$ końce przedziałów są otwarte, dla $\\le$ i $\\ge$ – domknięte.",
        },
      ],
      jak: [
        "Szkicuj oba wykresy w jednym układzie i zaznacz punkty wspólne.",
        "Równanie: odczytaj pierwsze współrzędne punktów wspólnych.",
        "Nierówność: sprawdź, gdzie jeden wykres leży nad drugim, i zapisz przedziały $x$.",
        "Zdecyduj, czy końce przedziałów należą do rozwiązania (nierówność ostra czy nieostra).",
        "Sprawdź wynik, podstawiając jedną liczbę z przedziału.",
      ],
      zadania: [
        {
          nr: "31",
          tresc: "Wykresy funkcji $f(x)=x^2$ i $g(x)=2x+3$ przecinają się w punktach $(-1,1)$ i $(3,9)$. Jakie są rozwiązania równania $x^2=2x+3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$x=-1$", "$x=-1$ lub $x=3$", "$x=1$ lub $x=9$", "$x=3$"],
          poprawna: 1,
        },
        {
          nr: "32",
          tresc: "Wykresy funkcji $f(x)=x^2$ i $g(x)=2x+3$ przecinają się w punktach $(-1,1)$ i $(3,9)$. Jaki zbiór jest rozwiązaniem nierówności $x^2<2x+3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-1,3)$", "$(-\\infty,-1)\\cup(3,+\\infty)$", "$\\langle -1,3\\rangle$", "$(1,9)$"],
          poprawna: 0,
        },
        {
          nr: "33",
          tresc: "Dla jakich wartości $m$ równanie $(x-2)^2+3=m$ ma dwa różne rozwiązania? **Wybierz właściwą odpowiedź.**",
          opcje: ["$m\\in(-\\infty,3)$", "$m\\in\\langle 3,+\\infty)$", "$m=3$", "$m\\in(3,+\\infty)$"],
          poprawna: 3,
        },
        {
          nr: "34",
          tresc: "Dana jest funkcja $f(x)=(x+1)^2-4$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Równanie $f(x)=-4$ ma dokładnie jedno rozwiązanie.", litery: "PF", poprawna: 0 },
            { tekst: "Równanie $f(x)=-5$ ma dwa rozwiązania.", litery: "PF", poprawna: 1 },
            { tekst: "Rozwiązaniami równania $f(x)=0$ są liczby $-3$ i $1$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "35",
          tresc: "Wykres funkcji $y=\\frac{1}{x}$ przecina prostą $y=x$ w punktach $(-1,-1)$ i $(1,1)$. Jaki zbiór jest rozwiązaniem nierówności $\\frac{1}{x}<x$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-1,1)$", "$(-\\infty,-1)\\cup(0,1)$", "$(-1,0)\\cup(1,+\\infty)$", "$(1,+\\infty)$"],
          poprawna: 2,
        },
        {
          nr: "36",
          tresc: "Wykresy funkcji $y=x+1$ i $y=-x+5$ przecinają się w punkcie $(2,3)$. Jaki zbiór jest rozwiązaniem nierówności $x+1\\ge -x+5$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$(2,+\\infty)$", "$(-\\infty,2\\rangle$", "$\\langle 3,+\\infty)$", "$\\langle 2,+\\infty)$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "37",
          punkty: 3,
          tresc: "Wykres funkcji $y=x^2$ przesunięto o wektor $[2,-1]$ i otrzymano wykres funkcji $f$. Wyznacz wszystkie wartości $m$, dla których równanie $f(x)=m$ ma dwa rozwiązania, i rozwiąż równanie $f(x)=8$. **Zapisz obliczenia.**",
          rozwiazanie: "Wzór funkcji: $f(x)=(x-2)^2-1$. Jej wykres jest parabolą o ramionach w górę i wierzchołku $(2,-1)$.\n\nPozioma prosta $y=m$ przecina parabolę w dwóch punktach, gdy leży nad wierzchołkiem, czyli dla $m>-1$.\n\nRównanie $f(x)=8$: $(x-2)^2-1=8$, więc $(x-2)^2=9$.\n\nStąd $x-2=3$ lub $x-2=-3$, czyli $x=5$ lub $x=-1$.\n\nOdpowiedź: dwa rozwiązania dla $m\\in(-1,+\\infty)$; równanie $f(x)=8$ ma rozwiązania $x=-1$ i $x=5$.",
        },
        {
          nr: "38",
          punkty: 2,
          tresc: "Wykresy funkcji $f(x)=(x-1)^2$ i $g(x)=x+1$ mają dwa punkty wspólne. Sprawdź, podstawiając, że są nimi punkty $(0,1)$ i $(3,4)$, a następnie rozwiąż nierówność $(x-1)^2>x+1$. **Zapisz obliczenia.**",
          rozwiazanie: "Punkt $(0,1)$: $f(0)=(0-1)^2=1$ i $g(0)=0+1=1$. Punkt $(3,4)$: $f(3)=(3-1)^2=4$ i $g(3)=3+1=4$. Oba punkty należą do obu wykresów.\n\nParabola $y=(x-1)^2$ ma ramiona w górę, więc leży nad prostą $y=x+1$ na zewnątrz punktów wspólnych, czyli dla $x<0$ lub $x>3$.\n\nSprawdzenie: $x=4$ daje $9>5$, a $x=1$ daje $0>2$ – nieprawda.\n\nOdpowiedź: $x\\in(-\\infty,0)\\cup(3,+\\infty)$.",
        },
      ],
      generatory: [
        {
          id: "parabola-i-prosta-pozioma",
          nazwa: "Równanie z paraboli",
          opis: "Rozwiąż równanie f(x)=m dla przesuniętej paraboli albo podaj liczbę jego rozwiązań.",
          generuj(r) {
            if (r.chance(0.55)) {
              const p = r.intBez(-6, 6, 0);
              const qq = r.int(-5, 5);
              const k = r.int(1, 5);
              const m = qq + k * k;
              const F = `${kw(p)}^2${dod(qq)}`;
              return {
                tresc: `Wykres funkcji $f(x) = ${F}$ jest parabolą o wierzchołku $${pkt(p, qq)}$ i ramionach skierowanych w górę. Korzystając z poziomej prostej $y = ${m}$, rozwiąż równanie $f(x) = ${m}$.`,
                pola: [{ id: "m", typ: "zbior", ile: 2, etykieta: "Rozwiązania równania" }],
                odpowiedz: { m: [p - k, p + k] },
                wynik: `$x = ${p - k}$ lub $x = ${p + k}$`,
                rozwiazanie: [
                  qq === 0 ? `Równanie to $${kw(p)}^2 = ${m}$.` : `Przenosimy $${qq}$ na prawą stronę: $${kw(p)}^2 = ${m} ${plusMinus(-qq)} = ${k * k}$.`,
                  `Prosta $y=${m}$ leży nad wierzchołkiem (bo $${m} > ${qq}$), więc przecina parabolę w dwóch punktach.`,
                  `$${argX(p)} = ${-k}$ lub $${argX(p)} = ${k}$, czyli $x = ${p - k}$ lub $x = ${p + k}$.`,
                ],
              };
            }
            const p = r.int(-5, 5);
            const qq = r.int(-5, 5);
            const eps = r.pick([1, -1]);
            const dm = r.pick([-3, -2, -1, 0, 0, 1, 2, 3]);
            const m = qq + dm;
            const F = `${eps === -1 ? "-" : ""}${kw(p)}^2${dod(qq)}`;
            const ile = dm === 0 ? 1 : (eps === 1) === (dm > 0) ? 2 : 0;
            const polozenie = dm === 0 ? `przechodzi przez wierzchołek` : dm > 0 ? `leży nad wierzchołkiem` : `leży pod wierzchołkiem`;
            return {
              tresc: `Wykres funkcji $f(x) = ${F}$ jest parabolą o wierzchołku $${pkt(p, qq)}$ i ramionach skierowanych ${eps === 1 ? "w górę" : "w dół"}. Ile rozwiązań ma równanie $f(x) = ${m}$?`,
              pola: [{ id: "n", typ: "liczba", etykieta: "Liczba rozwiązań" }],
              odpowiedz: { n: ile },
              wynik: `$${ile}$`,
              rozwiazanie: [
                `Wierzchołek paraboli to $${pkt(p, qq)}$, a ramiona są skierowane ${eps === 1 ? "w górę" : "w dół"}.`,
                `Prosta $y = ${m}$ ${polozenie}.`,
                ile === 0 ? `Parabola i prosta nie mają punktów wspólnych, więc równanie nie ma rozwiązań.` : `Parabola i prosta mają ${ile === 1 ? "jeden punkt wspólny" : "dwa punkty wspólne"}, więc równanie ma ${ile === 1 ? "jedno rozwiązanie" : "dwa rozwiązania"}.`,
              ],
            };
          },
        },
        {
          id: "nierownosc-z-paraboli",
          nazwa: "Nierówność z paraboli",
          opis: "Rozwiąż nierówność, w której przesunięta parabola jest porównana z poziomą prostą.",
          generuj(r) {
            const p = r.intBez(-5, 5, 0);
            const qq = r.int(-4, 4);
            const k = r.int(1, 4);
            const m = qq + k * k;
            const znak = r.pick(["<", ">", "\\le", "\\ge"]);
            const wewn = znak === "<" || znak === "\\le";
            const domkn = znak === "\\le" || znak === "\\ge";
            const l = p - k, pr = p + k;
            const kombinacje = [
              { w: true, d: false, tex: `(${l},${pr})` },
              { w: true, d: true, tex: `\\langle ${l},${pr}\\rangle` },
              { w: false, d: false, tex: `(-\\infty,${l})\\cup(${pr},+\\infty)` },
              { w: false, d: true, tex: `(-\\infty,${l}\\rangle\\cup\\langle ${pr},+\\infty)` },
            ];
            const mieszane = r.shuffle(kombinacje);
            const poprawna = mieszane.findIndex((o) => o.w === wewn && o.d === domkn);
            const wynik = mieszane[poprawna].tex;
            const F = `${kw(p)}^2${dod(qq)}`;
            return {
              tresc: `Wykres funkcji $f(x) = ${F}$ jest parabolą o wierzchołku $${pkt(p, qq)}$ i ramionach skierowanych w górę. Rozwiąż nierówność $${F} ${znak} ${m}$.`,
              pola: [{ id: "z", typ: "wybor", etykieta: "Zbiór rozwiązań", opcje: mieszane.map((o) => `$${o.tex}$`) }],
              odpowiedz: { z: poprawna },
              wynik: `$x \\in ${wynik}$`,
              rozwiazanie: [
                `Punkty wspólne paraboli i prostej $y=${m}$: $${kw(p)}^2 = ${k * k}$, czyli $x = ${l}$ lub $x = ${pr}$.`,
                `Ramiona paraboli są skierowane w górę, więc parabola leży ${wewn ? "pod prostą między tymi punktami" : "nad prostą na zewnątrz tych punktów"}.`,
                `Znak $${znak}$ jest ${domkn ? "nieostry, więc końce przedziałów należą do rozwiązania" : "ostry, więc końce przedziałów nie należą do rozwiązania"}.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
