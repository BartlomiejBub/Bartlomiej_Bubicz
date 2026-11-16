// Klasa 5 (szkoła podstawowa) · rozdział V „Pola figur” – Matematyka z kluczem 5 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";   // tylko pomocnicze z wspolne.js

// --- Pomocnicze (tylko dla tego pliku)

/** Liczba całkowita w LaTeX: odstęp tysięcy dopiero od 5 cyfr (12\,500). */
const lcz = (n) => (Math.abs(n) >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : String(n));

/** Liczba (całkowita albo ułamek dziesiętny zapisany jako Q) w LaTeX z przecinkiem: 7/2 -> "3{,}5". */
function dz(v) {
  const x = Q.z(v);
  for (let k = 0; k <= 4; k++) {
    const m = x.n * 10 ** k;
    if (m % x.d === 0) {
      const c = m / x.d;
      if (k === 0) return lcz(c);
      const s = String(Math.abs(c)).padStart(k + 1, "0");
      return `${c < 0 ? "-" : ""}${lcz(Number(s.slice(0, -k)))}{,}${s.slice(-k)}`;
    }
  }
  throw new Error(`Nie da się zapisać dziesiętnie: ${x}`);
}

/** Pole z jednostką jako osobny wzór: pl(24, "cm") -> "$24\ \text{cm}^2$". */
const pl = (x, j) => `$${x}\\ \\text{${j}}^2$`;

/** Działanie z wynikiem i jednostką pola: rown("8 \\cdot 5", 40, "cm") -> "$8 \cdot 5 = 40\ \text{cm}^2$". */
const rown = (wyr, x, j) => `$${wyr} = ${x}\\ \\text{${j}}^2$`;

/** Podpis pola odpowiedzi: "Pole (w $\text{cm}^2$) $=$". */
const et = (j) => `Pole (w $\\text{${j}}^2$) $=$`;

/** Litery na nazwy wierzchołków. */
const TROJKI = [["A", "B", "C"], ["K", "L", "M"], ["P", "Q", "R"]];

/** Jednostki pola w LaTeX (do zamiany jednostek). */
const U = { mm: "\\text{mm}^2", cm: "\\text{cm}^2", dm: "\\text{dm}^2", m: "\\text{m}^2", a: "\\text{a}", ha: "\\text{ha}", km: "\\text{km}^2" };
/** Pary [większa, mniejsza, ile mniejszych mieści się w większej]. */
const PARY = [["cm", "mm", 100], ["dm", "cm", 100], ["m", "dm", 100], ["m", "cm", 10000], ["a", "m", 100], ["ha", "a", 100], ["ha", "m", 10000], ["km", "ha", 100]];

// --- Zadania, ściągi i generatory

export default {
  tematy: [
    // ------------------------------------------------------------------ 1
    {
      id: "pole-figury",
      nazwa: "Pole figury",
      sciaga: [
        {
          nazwa: "Co to jest pole",
          slownie: "Pole mówi, ile miejsca zajmuje figura. Sprawdzamy, ile kwadracików jednostkowych w niej się mieści. Kwadracik o boku $1$ cm ma pole $1$ cm$^2$.",
          przyklad: "Prostokąt z $3$ rzędów po $4$ kratki ma $12$ kratek, więc jego pole to $12$ cm$^2$ (gdy kratka ma bok $1$ cm).",
          uwaga: "Pole zapisujemy w jednostkach kwadratowych (cm$^2$, m$^2$), a obwód – w zwykłych (cm, m). To dwie różne rzeczy.",
        },
        {
          nazwa: "Pole prostokąta",
          slownie: "Mnożymy długości dwóch sąsiednich boków. Oba boki muszą być podane w tej samej jednostce.",
          tex: "P=a\\cdot b",
          litery: "$a$, $b$ – długości sąsiednich boków prostokąta.",
          przyklad: "Boki $8$ cm i $5$ cm: $P = 8 \\cdot 5 = 40$ cm$^2$.",
          uwaga: "Nie dodawaj boków. Dodawanie daje pół obwodu, a nie pole.",
        },
        {
          nazwa: "Pole kwadratu",
          slownie: "Kwadrat ma wszystkie boki równe, więc mnożymy bok przez ten sam bok.",
          tex: "P=a\\cdot a",
          litery: "$a$ – długość boku kwadratu.",
          przyklad: "Bok $6$ cm: $P = 6 \\cdot 6 = 36$ cm$^2$.",
          uwaga: "Pole kwadratu to nie $a \\cdot 2$ ani $a \\cdot 4$. Mnożymy bok przez bok.",
        },
        {
          nazwa: "Figura złożona",
          slownie: "Figurę złożoną dzielimy na prostokąty i dodajemy ich pola. Można też od dużego prostokąta odjąć kawałek, którego brakuje.",
          tex: "P=P_1+P_2\\qquad P=P_1-P_2",
          litery: "$P_1$, $P_2$ – pola prostokątów (kawałków).",
          przyklad: "Prostokąt $6$ cm na $4$ cm ma pole $24$ cm$^2$. Z rogu wycięto kwadrat $2$ cm na $2$ cm (pole $4$ cm$^2$). Zostało $24 - 4 = 20$ cm$^2$.",
          uwaga: "Odejmujemy pola, a nie długości boków.",
        },
        {
          nazwa: "Przekładanie kawałków",
          slownie: "Gdy przecinamy figurę i układamy kawałki inaczej, jej pole się nie zmienia. Różne figury mogą więc mieć takie samo pole.",
          przyklad: "Prostokąt $8$ cm na $3$ cm ma pole $24$ cm$^2$ i prostokąt $6$ cm na $4$ cm też ma pole $24$ cm$^2$.",
          uwaga: "Takie same pola nie oznaczają takich samych obwodów: ten pierwszy prostokąt ma obwód $22$ cm, a drugi $20$ cm.",
        },
      ],
      jak: [
        "Sprawdź, w jakich jednostkach są podane boki. Muszą być jednakowe.",
        "Prostokąt: pomnóż dwa sąsiednie boki. Kwadrat: bok razy bok.",
        "Figurę złożoną podziel na prostokąty albo od dużego prostokąta odejmij brakujący kawałek.",
        "Do wyniku dopisz jednostkę kwadratową, np. cm$^2$.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Prostokąt ma boki długości $9$ cm i $4$ cm. Jakie jest jego pole? **Wybierz właściwą odpowiedź.**",
          opcje: ["$13\\ \\text{cm}^2$", "$26\\ \\text{cm}^2$", "$36\\ \\text{cm}^2$", "$18\\ \\text{cm}^2$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Bok kwadratu ma $7$ cm. Jakie jest pole tego kwadratu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$28\\ \\text{cm}^2$", "$49\\ \\text{cm}^2$", "$14\\ \\text{cm}^2$", "$77\\ \\text{cm}^2$"],
          poprawna: 1,
        },
        {
          nr: "3",
          tresc: "Pole prostokąta wynosi $48$ cm$^2$, a jeden jego bok ma $6$ cm. Ile centymetrów ma drugi bok? **Wybierz właściwą odpowiedź.**",
          opcje: ["$288$ cm", "$42$ cm", "$54$ cm", "$8$ cm"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "Prostokąt $A$ ma boki $8$ cm i $3$ cm, a prostokąt $B$ ma boki $6$ cm i $4$ cm. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Oba prostokąty mają takie samo pole.", litery: "PF", poprawna: 0 },
            { tekst: "Prostokąt $A$ ma większy obwód niż prostokąt $B$.", litery: "PF", poprawna: 0 },
            { tekst: "Pole prostokąta $B$ wynosi $10$ cm$^2$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "5",
          tresc: "Z prostokąta o bokach $10$ cm i $6$ cm wycięto kwadrat o boku $3$ cm. Jakie pole ma pozostała figura? **Wybierz właściwą odpowiedź.**",
          opcje: ["$51\\ \\text{cm}^2$", "$57\\ \\text{cm}^2$", "$69\\ \\text{cm}^2$", "$54\\ \\text{cm}^2$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Ścianę o wymiarach $5$ m na $3$ m trzeba pomalować. Jedna puszka farby wystarcza na $6$ m$^2$ ściany. Ile puszek farby trzeba kupić? **Zapisz obliczenia.**",
          rozwiazanie: "Pole ściany: $5 \\cdot 3 = 15$ m$^2$.\n\nDwie puszki wystarczą na $2 \\cdot 6 = 12$ m$^2$. To za mało, bo $12 < 15$.\n\nTrzy puszki wystarczą na $3 \\cdot 6 = 18$ m$^2$, a $18 > 15$.\n\nOdpowiedź: trzeba kupić $3$ puszki farby.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Działka ma kształt litery L. Powstała z prostokąta o bokach $20$ m i $15$ m, z którego w rogu wycięto prostokąt o bokach $8$ m i $5$ m. Oblicz pole tej działki na dwa sposoby. **Zapisz obliczenia.**",
          rozwiazanie: "Sposób I (od dużego prostokąta odejmujemy wycięty). Duży prostokąt: $20 \\cdot 15 = 300$ m$^2$. Wycięty: $8 \\cdot 5 = 40$ m$^2$. Zostaje $300 - 40 = 260$ m$^2$.\n\nSposób II (dzielimy działkę na dwa prostokąty). Pierwszy ma pełną szerokość $20$ m i wysokość $15 - 5 = 10$ m, więc jego pole to $20 \\cdot 10 = 200$ m$^2$.\n\nDrugi ma szerokość $20 - 8 = 12$ m i wysokość $5$ m, więc jego pole to $12 \\cdot 5 = 60$ m$^2$. Razem: $200 + 60 = 260$ m$^2$.\n\nOba sposoby dają ten sam wynik.\n\nOdpowiedź: pole działki wynosi $260$ m$^2$.",
        },
      ],
      generatory: [
        {
          id: "pole-prostokata",
          nazwa: "Pole prostokąta",
          opis: "Oblicz pole prostokąta albo kwadratu, albo brakujący bok prostokąta.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const a = r.int(3, 15);
              const b = r.intBez(3, 15, a);
              const ogrod = r.chance();
              const u = ogrod ? "m" : r.pick(["cm", "dm", "m"]);
              const tresc = ogrod
                ? `Prostokątny ogródek ma wymiary $${a}$ m na $${b}$ m. Ile metrów kwadratowych ma jego pole?`
                : `Prostokąt ma boki długości $${a}$ ${u} i $${b}$ ${u}. Oblicz jego pole.`;
              return {
                tresc,
                pola: [{ id: "w", typ: "liczba", etykieta: et(u) }],
                odpowiedz: { w: a * b },
                wynik: pl(a * b, u),
                rozwiazanie: [
                  "Pole prostokąta to iloczyn dwóch sąsiednich boków.",
                  `${rown(`${a} \\cdot ${b}`, a * b, u)}.`,
                ],
              };
            }
            if (tryb === 1) {
              const a = r.int(2, 15);
              const plytka = r.chance();
              const u = plytka ? "cm" : r.pick(["cm", "dm", "m"]);
              const tresc = plytka
                ? `Kwadratowa płytka ma bok długości $${a}$ cm. Jakie jest pole tej płytki?`
                : `Kwadrat ma bok długości $${a}$ ${u}. Oblicz jego pole.`;
              return {
                tresc,
                pola: [{ id: "w", typ: "liczba", etykieta: et(u) }],
                odpowiedz: { w: a * a },
                wynik: pl(a * a, u),
                rozwiazanie: [
                  "Kwadrat ma wszystkie boki równe, więc mnożymy bok przez bok.",
                  `${rown(`${a} \\cdot ${a}`, a * a, u)}.`,
                ],
              };
            }
            const a = r.int(3, 15);
            const b = r.intBez(3, 15, a);
            const u = r.pick(["cm", "m"]);
            return {
              tresc: `Pole prostokąta wynosi ${pl(a * b, u)}, a jeden jego bok ma $${a}$ ${u}. Ile ${u === "cm" ? "centymetrów" : "metrów"} ma drugi bok?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `Drugi bok (w ${u}) $=$` }],
              odpowiedz: { w: b },
              wynik: `$${b}$ ${u}`,
              rozwiazanie: [
                "Pole prostokąta to bok razy bok, więc drugi bok to pole podzielone przez znany bok.",
                `$${a * b} : ${a} = ${b}$ ${u}.`,
              ],
            };
          },
        },
        {
          id: "pole-figury-zlozonej",
          nazwa: "Figura złożona",
          opis: "Oblicz pole figury złożonej z prostokątów albo powstałej przez wycięcie prostokąta.",
          generuj(r) {
            const w = r.int(0, 2);
            if (w === 0) {
              const A = r.int(8, 20), B = r.int(6, 14);
              const c = r.int(2, A - 3), d = r.int(2, B - 3);
              return {
                tresc: `Plan działki ma kształt litery L. Powstał z prostokąta o bokach $${A}$ m i $${B}$ m, z którego w rogu wycięto prostokąt o bokach $${c}$ m i $${d}$ m. Ile metrów kwadratowych ma pole działki?`,
                pola: [{ id: "w", typ: "liczba", etykieta: et("m") }],
                odpowiedz: { w: A * B - c * d },
                wynik: pl(A * B - c * d, "m"),
                rozwiazanie: [
                  `Duży prostokąt: ${rown(`${A} \\cdot ${B}`, A * B, "m")}.`,
                  `Wycięty prostokąt: ${rown(`${c} \\cdot ${d}`, c * d, "m")}.`,
                  `Odejmujemy pola: ${rown(`${A * B} - ${c * d}`, A * B - c * d, "m")}.`,
                ],
              };
            }
            if (w === 1) {
              const A = r.int(4, 10), B = r.int(3, 6);
              const c = r.int(1, 3), d = r.int(1, 2);
              return {
                tresc: `Ściana ma kształt prostokąta o wymiarach $${A}$ m na $${B}$ m. Na ścianie jest okno o wymiarach $${c}$ m na $${d}$ m. Ile metrów kwadratowych ściany (bez okna) trzeba pomalować?`,
                pola: [{ id: "w", typ: "liczba", etykieta: et("m") }],
                odpowiedz: { w: A * B - c * d },
                wynik: pl(A * B - c * d, "m"),
                rozwiazanie: [
                  `Cała ściana: ${rown(`${A} \\cdot ${B}`, A * B, "m")}.`,
                  `Okno: ${rown(`${c} \\cdot ${d}`, c * d, "m")}.`,
                  `Okna nie malujemy, więc odejmujemy: ${rown(`${A * B} - ${c * d}`, A * B - c * d, "m")}.`,
                ],
              };
            }
            const a = r.int(4, 12), b = r.int(2, 8), c = r.int(2, 8), d = r.int(2, 6);
            return {
              tresc: `Taras składa się z dwóch prostokątnych części. Pierwsza ma wymiary $${a}$ m na $${b}$ m, a druga $${c}$ m na $${d}$ m. Części nie zachodzą na siebie. Jakie pole ma cały taras?`,
              pola: [{ id: "w", typ: "liczba", etykieta: et("m") }],
              odpowiedz: { w: a * b + c * d },
              wynik: pl(a * b + c * d, "m"),
              rozwiazanie: [
                `Pierwsza część: ${rown(`${a} \\cdot ${b}`, a * b, "m")}.`,
                `Druga część: ${rown(`${c} \\cdot ${d}`, c * d, "m")}.`,
                `Dodajemy pola: ${rown(`${a * b} + ${c * d}`, a * b + c * d, "m")}.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 2
    {
      id: "rownoleglobok-romb",
      nazwa: "Pole równoległoboku i rombu",
      sciaga: [
        {
          nazwa: "Pole równoległoboku",
          slownie: "Mnożymy długość podstawy przez wysokość opuszczoną na tę podstawę. Wysokość jest prostopadła do podstawy.",
          tex: "P=a\\cdot h",
          litery: "$a$ – długość podstawy, $h$ – wysokość opuszczona na tę podstawę.",
          przyklad: "Podstawa $8$ cm, wysokość $5$ cm: $P = 8 \\cdot 5 = 40$ cm$^2$.",
          uwaga: "Do wzoru bierzemy wysokość, a nie pochyły bok. Pochyły bok jest dłuższy od wysokości.",
        },
        {
          nazwa: "Skąd się bierze wzór",
          slownie: "Odetnij z jednego końca równoległoboku trójkąt i przyłóż go z drugiej strony. Powstaje prostokąt o bokach $a$ i $h$. Pole się nie zmieniło, więc jest takie samo jak pole prostokąta.",
          przyklad: "Równoległobok o podstawie $6$ cm i wysokości $4$ cm ma takie samo pole jak prostokąt $6$ cm na $4$ cm, czyli $24$ cm$^2$.",
        },
        {
          nazwa: "Dwie podstawy, dwie wysokości",
          slownie: "Równoległobok ma dwie pary boków, więc dwie podstawy i dwie wysokości. Każda wysokość pasuje tylko do swojej podstawy. Pole wychodzi takie samo.",
          tex: "P=a\\cdot h_a=b\\cdot h_b",
          litery: "$h_a$ – wysokość opuszczona na bok $a$, $h_b$ – wysokość opuszczona na bok $b$.",
          przyklad: "Boki $10$ cm i $6$ cm. Wysokość na bok $10$ cm ma $3$ cm: $P = 10 \\cdot 3 = 30$ cm$^2$. Wtedy wysokość na bok $6$ cm to $30 : 6 = 5$ cm.",
          uwaga: "Nie mnóż boku przez wysokość, która opada na inny bok.",
        },
        {
          nazwa: "Pole rombu",
          slownie: "Romb jest równoległobokiem, więc liczymy tak samo: bok razy wysokość opuszczona na ten bok.",
          tex: "P=a\\cdot h",
          litery: "$a$ – długość boku rombu, $h$ – jego wysokość.",
          przyklad: "Bok $6$ cm, wysokość $5$ cm: $P = 6 \\cdot 5 = 30$ cm$^2$.",
          uwaga: "Romb nie jest kwadratem, więc jego pole to nie $a \\cdot a$. Wysokość jest krótsza od boku.",
        },
        {
          nazwa: "Pole rombu z przekątnych",
          slownie: "Przekątne rombu przecinają się pod kątem prostym. Pole rombu to połowa iloczynu długości jego przekątnych.",
          tex: "P=\\dfrac{e\\cdot f}{2}",
          litery: "$e$, $f$ – długości przekątnych rombu.",
          przyklad: "Przekątne $10$ cm i $6$ cm: $10 \\cdot 6 = 60$, a $60 : 2 = 30$ cm$^2$.",
          uwaga: "Nie zapomnij podzielić przez $2$. Iloczyn przekątnych to pole prostokąta, w którym romb mieści się dokładnie dwa razy.",
        },
      ],
      jak: [
        "Znajdź podstawę i wysokość, która na nią opada. To para, która pasuje do siebie.",
        "Pomnóż podstawę przez wysokość. Dla rombu możesz też pomnożyć przekątne i podzielić przez $2$.",
        "Gdy znasz pole, brakujący wymiar to pole podzielone przez drugi wymiar.",
        "Dopisz jednostkę kwadratową.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Równoległobok ma podstawę $12$ cm i wysokość $5$ cm opuszczoną na tę podstawę. Jakie jest jego pole? **Wybierz właściwą odpowiedź.**",
          opcje: ["$60\\ \\text{cm}^2$", "$30\\ \\text{cm}^2$", "$17\\ \\text{cm}^2$", "$34\\ \\text{cm}^2$"],
          poprawna: 0,
        },
        {
          nr: "9",
          tresc: "Boki równoległoboku mają $10$ cm i $6$ cm. Wysokość opuszczona na bok $10$ cm ma $4$ cm. Jakie jest pole tego równoległoboku? **Wybierz właściwą odpowiedź.**",
          opcje: ["$60\\ \\text{cm}^2$", "$24\\ \\text{cm}^2$", "$20\\ \\text{cm}^2$", "$40\\ \\text{cm}^2$"],
          poprawna: 3,
        },
        {
          nr: "10",
          tresc: "Romb ma bok długości $8$ cm i wysokość $7$ cm. Jakie jest jego pole? **Wybierz właściwą odpowiedź.**",
          opcje: ["$15\\ \\text{cm}^2$", "$56\\ \\text{cm}^2$", "$64\\ \\text{cm}^2$", "$28\\ \\text{cm}^2$"],
          poprawna: 1,
        },
        {
          nr: "11",
          tresc: "Przekątne rombu mają $12$ cm i $8$ cm. Jakie jest pole tego rombu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$96\\ \\text{cm}^2$", "$20\\ \\text{cm}^2$", "$48\\ \\text{cm}^2$", "$40\\ \\text{cm}^2$"],
          poprawna: 2,
        },
        {
          nr: "12",
          tresc: "Pole równoległoboku wynosi $36$ cm$^2$, a jeden jego bok ma $9$ cm. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wysokość opuszczona na ten bok ma $4$ cm.", litery: "PF", poprawna: 0 },
            { tekst: "Wysokość opuszczona na ten bok ma $27$ cm.", litery: "PF", poprawna: 1 },
            { tekst: "Równoległobok o podstawie $6$ cm i wysokości $6$ cm ma takie samo pole.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Boki równoległoboku mają długości $15$ cm i $9$ cm. Wysokość opuszczona na bok $15$ cm ma $6$ cm. Oblicz pole tego równoległoboku oraz wysokość opuszczoną na bok $9$ cm. **Zapisz obliczenia.**",
          rozwiazanie: "Pole: podstawa $15$ cm razy wysokość $6$ cm, czyli $15 \\cdot 6 = 90$ cm$^2$.\n\nTo samo pole ma wyjść z podstawą $9$ cm: $9 \\cdot h = 90$.\n\nWysokość: $h = 90 : 9 = 10$ cm.\n\nOdpowiedź: pole wynosi $90$ cm$^2$, a wysokość opuszczona na bok $9$ cm ma $10$ cm.",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "Pole rombu wynosi $54$ cm$^2$, a jedna z jego przekątnych ma $9$ cm. Oblicz długość drugiej przekątnej. **Zapisz obliczenia.**",
          rozwiazanie: "Pole rombu to połowa iloczynu przekątnych, więc iloczyn przekątnych jest dwa razy większy od pola: $2 \\cdot 54 = 108$.\n\nDruga przekątna: $108 : 9 = 12$ cm.\n\nSprawdzenie: $9 \\cdot 12 : 2 = 108 : 2 = 54$ cm$^2$.\n\nOdpowiedź: druga przekątna ma $12$ cm.",
        },
      ],
      generatory: [
        {
          id: "rownoleglobok-pole",
          nazwa: "Równoległobok i romb",
          opis: "Znasz bok i wysokość równoległoboku albo rombu. Oblicz pole albo brakujący wymiar.",
          generuj(r) {
            const a = r.int(5, 16);
            const h = r.int(2, a - 1);
            const p = a * h;
            const romb = r.chance();
            const u = r.pick(["cm", "dm", "m"]);
            const tryb = r.int(0, 2);
            const fig = romb ? "Romb" : "Równoległobok";
            const figM = romb ? "rombu" : "równoległoboku";
            const bok = romb ? "bok" : "podstawa";
            const wz = "Pole to długość boku razy wysokość opuszczona na ten bok.";
            if (tryb === 0) {
              return {
                tresc: romb
                  ? `Romb ma bok długości $${a}$ ${u}, a wysokość opuszczona na ten bok ma $${h}$ ${u}. Oblicz pole rombu.`
                  : `Równoległobok ma podstawę $${a}$ ${u} i wysokość $${h}$ ${u} opuszczoną na tę podstawę. Oblicz pole równoległoboku.`,
                pola: [{ id: "w", typ: "liczba", etykieta: et(u) }],
                odpowiedz: { w: p },
                wynik: pl(p, u),
                rozwiazanie: [wz, `${rown(`${a} \\cdot ${h}`, p, u)}.`],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `${fig === "Romb" ? "Pole rombu" : "Pole równoległoboku"} wynosi ${pl(p, u)}. Długość ${romb ? "boku" : "podstawy"} to $${a}$ ${u}. Ile ${u === "cm" ? "centymetrów" : u === "dm" ? "decymetrów" : "metrów"} ma wysokość opuszczona na ${romb ? "ten bok" : "tę podstawę"}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Wysokość (w ${u}) $=$` }],
                odpowiedz: { w: h },
                wynik: `$${h}$ ${u}`,
                rozwiazanie: [wz, `Wysokość to pole podzielone przez ${bok === "bok" ? "bok" : "podstawę"}: $${p} : ${a} = ${h}$ ${u}.`],
              };
            }
            return {
              tresc: `Pole ${figM} wynosi ${pl(p, u)}, a wysokość opuszczona na ${romb ? "jego bok" : "jego podstawę"} ma $${h}$ ${u}. Ile ${u === "cm" ? "centymetrów" : u === "dm" ? "decymetrów" : "metrów"} ma ${romb ? "ten bok" : "ta podstawa"}?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `${romb ? "Bok" : "Podstawa"} (w ${u}) $=$` }],
              odpowiedz: { w: a },
              wynik: `$${a}$ ${u}`,
              rozwiazanie: [wz, `${romb ? "Bok" : "Podstawa"} to pole podzielone przez wysokość: $${p} : ${h} = ${a}$ ${u}.`],
            };
          },
        },
        {
          id: "romb-przekatne",
          nazwa: "Romb z przekątnych",
          opis: "Oblicz pole rombu z jego przekątnych albo brakującą przekątną.",
          generuj(r) {
            let e, f;
            do { e = r.int(4, 20); f = r.int(4, 20); } while ((e * f) % 2 !== 0 || e === f);
            const p = (e * f) / 2;
            const u = r.pick(["cm", "dm", "m"]);
            if (r.chance()) {
              return {
                tresc: r.chance()
                  ? `Przekątne rombu mają długości $${e}$ ${u} i $${f}$ ${u}. Oblicz pole tego rombu.`
                  : `Dwie przekątne rombu mają $${e}$ ${u} oraz $${f}$ ${u}. Jakie jest pole tego rombu?`,
                pola: [{ id: "w", typ: "liczba", etykieta: et(u) }],
                odpowiedz: { w: p },
                wynik: pl(p, u),
                rozwiazanie: [
                  "Pole rombu to połowa iloczynu jego przekątnych.",
                  `Mnożymy przekątne: $${e} \\cdot ${f} = ${e * f}$.`,
                  `Dzielimy przez $2$: ${rown(`${e * f} : 2`, p, u)}.`,
                ],
              };
            }
            return {
              tresc: `Pole rombu wynosi ${pl(p, u)}, a jedna z jego przekątnych ma $${e}$ ${u}. Ile ${u === "cm" ? "centymetrów" : u === "dm" ? "decymetrów" : "metrów"} ma druga przekątna?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `Druga przekątna (w ${u}) $=$` }],
              odpowiedz: { w: f },
              wynik: `$${f}$ ${u}`,
              rozwiazanie: [
                "Pole rombu to połowa iloczynu przekątnych, więc iloczyn przekątnych to dwa razy pole.",
                `$2 \\cdot ${p} = ${e * f}$.`,
                `Druga przekątna: $${e * f} : ${e} = ${f}$ ${u}.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3
    {
      id: "trojkat",
      nazwa: "Pole trójkąta",
      sciaga: [
        {
          nazwa: "Pole trójkąta",
          slownie: "Pole trójkąta to połowa iloczynu podstawy i wysokości opuszczonej na tę podstawę.",
          tex: "P=\\dfrac{a\\cdot h}{2}",
          litery: "$a$ – długość podstawy, $h$ – wysokość opuszczona na tę podstawę.",
          przyklad: "Podstawa $10$ cm, wysokość $6$ cm: $10 \\cdot 6 = 60$, a $60 : 2 = 30$ cm$^2$.",
          uwaga: "Nie zapomnij podzielić przez $2$. Wysokość musi pasować do podstawy, na którą opada.",
        },
        {
          nazwa: "Dlaczego połowa",
          slownie: "Dwa takie same trójkąty można złożyć w równoległobok o podstawie $a$ i wysokości $h$. Jeden trójkąt to połowa tego równoległoboku.",
          przyklad: "Równoległobok o podstawie $8$ cm i wysokości $5$ cm ma pole $40$ cm$^2$. Przekątna dzieli go na dwa trójkąty po $20$ cm$^2$.",
        },
        {
          nazwa: "Trójkąt prostokątny",
          slownie: "W trójkącie prostokątnym przyprostokątne są prostopadłe, więc jedna jest wysokością drugiej. Pole to połowa iloczynu przyprostokątnych.",
          tex: "P=\\dfrac{a\\cdot b}{2}",
          litery: "$a$, $b$ – długości przyprostokątnych.",
          przyklad: "Przyprostokątne $6$ cm i $8$ cm: $P = 6 \\cdot 8 : 2 = 24$ cm$^2$.",
          uwaga: "Najdłuższego boku (przeciwprostokątnej) w tym wzorze nie używamy.",
        },
        {
          nazwa: "Trzy podstawy, jedno pole",
          slownie: "Trójkąt ma trzy podstawy i trzy wysokości. Dla każdej pary wychodzi to samo pole.",
          tex: "P=\\dfrac{a\\cdot h_a}{2}=\\dfrac{b\\cdot h_b}{2}",
          litery: "$h_a$ – wysokość opuszczona na bok $a$, $h_b$ – wysokość opuszczona na bok $b$.",
          przyklad: "Podstawa $12$ cm i wysokość $5$ cm dają $30$ cm$^2$. Podstawa $10$ cm i wysokość $6$ cm też dają $30$ cm$^2$.",
          uwaga: "Nie łącz podstawy z wysokością, która opada na inny bok.",
        },
        {
          nazwa: "Brakująca podstawa lub wysokość",
          slownie: "Gdy znamy pole, mnożymy je przez $2$ i dzielimy przez znany wymiar.",
          tex: "h=\\dfrac{2\\cdot P}{a}\\qquad a=\\dfrac{2\\cdot P}{h}",
          litery: "$P$ – pole trójkąta, $a$ – podstawa, $h$ – wysokość.",
          przyklad: "Pole $18$ cm$^2$ i podstawa $9$ cm: $2 \\cdot 18 = 36$, a $36 : 9 = 4$ cm. Wysokość ma $4$ cm.",
          uwaga: "Najpierw pomnóż pole przez $2$, dopiero potem dziel.",
        },
      ],
      jak: [
        "Wskaż podstawę i wysokość, która na nią opada.",
        "Pomnóż podstawę przez wysokość i podziel przez $2$.",
        "W trójkącie prostokątnym za podstawę i wysokość weź przyprostokątne.",
        "Gdy szukasz podstawy lub wysokości, pomnóż pole przez $2$ i podziel przez drugi wymiar.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Podstawa trójkąta ma $10$ cm, a wysokość opuszczona na nią ma $7$ cm. Jakie jest pole tego trójkąta? **Wybierz właściwą odpowiedź.**",
          opcje: ["$70\\ \\text{cm}^2$", "$17\\ \\text{cm}^2$", "$35\\ \\text{cm}^2$", "$34\\ \\text{cm}^2$"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "Przyprostokątne trójkąta prostokątnego mają $6$ cm i $9$ cm. Jakie jest pole tego trójkąta? **Wybierz właściwą odpowiedź.**",
          opcje: ["$27\\ \\text{cm}^2$", "$54\\ \\text{cm}^2$", "$15\\ \\text{cm}^2$", "$30\\ \\text{cm}^2$"],
          poprawna: 0,
        },
        {
          nr: "17",
          tresc: "Pole trójkąta wynosi $40$ cm$^2$, a jego podstawa ma $10$ cm. Ile centymetrów ma wysokość opuszczona na tę podstawę? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$ cm", "$20$ cm", "$80$ cm", "$8$ cm"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "Trójkąt ma podstawę $8$ cm i wysokość $6$ cm. Równoległobok ma podstawę $8$ cm i wysokość $6$ cm. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Pole trójkąta wynosi $24$ cm$^2$.", litery: "PF", poprawna: 0 },
            { tekst: "Pole równoległoboku jest dwa razy większe od pola trójkąta.", litery: "PF", poprawna: 0 },
            { tekst: "Pole trójkąta jest równe polu równoległoboku.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "19",
          tresc: "Który z trójkątów ma największe pole? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "podstawa $8$ cm, wysokość $6$ cm",
            "podstawa $9$ cm, wysokość $6$ cm",
            "podstawa $10$ cm, wysokość $5$ cm",
            "podstawa $4$ cm, wysokość $12$ cm",
          ],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Żagiel ma kształt trójkąta o podstawie $3$ m i wysokości $4$ m. Ile metrów kwadratowych tkaniny potrzeba na uszycie $5$ takich żagli? **Zapisz obliczenia.**",
          rozwiazanie: "Pole jednego żagla: $3 \\cdot 4 : 2 = 12 : 2 = 6$ m$^2$.\n\nPięć żagli: $5 \\cdot 6 = 30$ m$^2$.\n\nOdpowiedź: potrzeba $30$ m$^2$ tkaniny.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Trójkąt prostokątny ma przyprostokątne długości $9$ cm i $12$ cm, a przeciwprostokątną długości $15$ cm. Oblicz pole tego trójkąta, a następnie wysokość opuszczoną na przeciwprostokątną. **Zapisz obliczenia.**",
          rozwiazanie: "Za podstawę i wysokość bierzemy przyprostokątne: $P = 9 \\cdot 12 : 2 = 108 : 2 = 54$ cm$^2$.\n\nTo samo pole policzymy z podstawą $15$ cm (przeciwprostokątna): $15 \\cdot h : 2 = 54$.\n\nStąd $15 \\cdot h = 2 \\cdot 54 = 108$, więc $h = 108 : 15 = 7{,}2$ cm.\n\nSprawdzenie: $15 \\cdot 7{,}2 : 2 = 108 : 2 = 54$ cm$^2$.\n\nOdpowiedź: pole wynosi $54$ cm$^2$, a wysokość opuszczona na przeciwprostokątną ma $7{,}2$ cm.",
        },
      ],
      generatory: [
        {
          id: "trojkat-pole",
          nazwa: "Pole trójkąta",
          opis: "Znasz podstawę i wysokość trójkąta – oblicz pole albo brakujący wymiar.",
          generuj(r) {
            let a, h;
            do { a = r.int(4, 16); h = r.int(3, 14); } while ((a * h) % 2 !== 0);
            const p = (a * h) / 2;
            const tryb = r.int(0, 2);
            const [A, B, C] = r.pick(TROJKI);
            const u = r.pick(["cm", "dm", "m"]);
            const slowo = u === "cm" ? "centymetrów" : u === "dm" ? "decymetrów" : "metrów";
            if (tryb === 0) {
              const zagiel = r.chance();
              const um = zagiel ? "m" : u;
              return {
                tresc: zagiel
                  ? `Żagiel ma kształt trójkąta o podstawie $${a}$ m i wysokości $${h}$ m. Ile metrów kwadratowych ma jego pole?`
                  : `W trójkącie $${A}${B}${C}$ podstawa $${A}${B}$ ma $${a}$ ${u}, a wysokość opuszczona na nią ma $${h}$ ${u}. Oblicz pole tego trójkąta.`,
                pola: [{ id: "w", typ: "liczba", etykieta: et(um) }],
                odpowiedz: { w: p },
                wynik: pl(p, um),
                rozwiazanie: [
                  "Pole trójkąta to połowa iloczynu podstawy i wysokości.",
                  `Mnożymy: $${a} \\cdot ${h} = ${a * h}$.`,
                  `Dzielimy przez $2$: ${rown(`${a * h} : 2`, p, um)}.`,
                ],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Pole trójkąta $${A}${B}${C}$ wynosi ${pl(p, u)}, a podstawa $${A}${B}$ ma $${a}$ ${u}. Ile ${slowo} ma wysokość opuszczona na tę podstawę?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Wysokość (w ${u}) $=$` }],
                odpowiedz: { w: h },
                wynik: `$${h}$ ${u}`,
                rozwiazanie: [
                  "Pole trójkąta to połowa iloczynu podstawy i wysokości, więc iloczyn to dwa razy pole.",
                  `$2 \\cdot ${p} = ${a * h}$.`,
                  `Wysokość: $${a * h} : ${a} = ${h}$ ${u}.`,
                ],
              };
            }
            return {
              tresc: `Pole trójkąta $${A}${B}${C}$ wynosi ${pl(p, u)}, a wysokość opuszczona na bok $${A}${B}$ ma $${h}$ ${u}. Ile ${slowo} ma bok $${A}${B}$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `Długość boku (w ${u}) $=$` }],
              odpowiedz: { w: a },
              wynik: `$${a}$ ${u}`,
              rozwiazanie: [
                "Pole trójkąta to połowa iloczynu podstawy i wysokości, więc iloczyn to dwa razy pole.",
                `$2 \\cdot ${p} = ${a * h}$.`,
                `Podstawa: $${a * h} : ${h} = ${a}$ ${u}.`,
              ],
            };
          },
        },
        {
          id: "trojkat-prostokatny-pole",
          nazwa: "Trójkąt prostokątny",
          opis: "Oblicz pole trójkąta prostokątnego z przyprostokątnych albo brakującą przyprostokątną.",
          generuj(r) {
            let a, b;
            do { a = r.int(3, 16); b = r.intBez(3, 16, a); } while ((a * b) % 2 !== 0);
            const p = (a * b) / 2;
            const [K, L, M] = r.pick(TROJKI);
            const u = r.pick(["cm", "dm", "m"]);
            if (r.chance()) {
              return {
                tresc: `Trójkąt $${K}${L}${M}$ jest prostokątny, a kąt prosty jest przy wierzchołku $${L}$. Wiadomo, że $|${K}${L}| = ${a}$ ${u} i $|${L}${M}| = ${b}$ ${u}. Oblicz pole tego trójkąta.`,
                pola: [{ id: "w", typ: "liczba", etykieta: et(u) }],
                odpowiedz: { w: p },
                wynik: pl(p, u),
                rozwiazanie: [
                  `Boki $${K}${L}$ i $${L}${M}$ są prostopadłe, więc jeden jest wysokością drugiego.`,
                  `Mnożymy przyprostokątne: $${a} \\cdot ${b} = ${a * b}$.`,
                  `Dzielimy przez $2$: ${rown(`${a * b} : 2`, p, u)}.`,
                ],
              };
            }
            return {
              tresc: `Pole trójkąta prostokątnego $${K}${L}${M}$ wynosi ${pl(p, u)}. Kąt prosty jest przy wierzchołku $${L}$ i $|${K}${L}| = ${a}$ ${u}. Ile ${u === "cm" ? "centymetrów" : u === "dm" ? "decymetrów" : "metrów"} ma bok $${L}${M}$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `$|${L}${M}|$ (w ${u}) $=$` }],
              odpowiedz: { w: b },
              wynik: `$${b}$ ${u}`,
              rozwiazanie: [
                `Boki $${K}${L}$ i $${L}${M}$ są prostopadłe, więc jeden jest wysokością drugiego.`,
                `Iloczyn przyprostokątnych to dwa razy pole: $2 \\cdot ${p} = ${a * b}$.`,
                `$|${L}${M}| = ${a * b} : ${a} = ${b}$ ${u}.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4
    {
      id: "trapez",
      nazwa: "Pole trapezu",
      sciaga: [
        {
          nazwa: "Podstawy i wysokość trapezu",
          slownie: "Dwa równoległe boki trapezu to jego podstawy. Wysokość jest prostopadła do podstaw i łączy je. Pozostałe boki to ramiona.",
          przyklad: "Trapez ma podstawy $8$ cm i $4$ cm, a odległość między nimi to $5$ cm. Wysokość ma więc $5$ cm.",
          uwaga: "Wysokość to nie ramię. Ramię jest pochyłe, więc zwykle jest dłuższe od wysokości.",
        },
        {
          nazwa: "Pole trapezu",
          slownie: "Dodajemy długości obu podstaw, mnożymy przez wysokość i dzielimy przez $2$.",
          tex: "P=\\dfrac{(a+b)\\cdot h}{2}",
          litery: "$a$, $b$ – długości podstaw, $h$ – wysokość.",
          przyklad: "Podstawy $8$ cm i $4$ cm, wysokość $5$ cm: $8 + 4 = 12$, $12 \\cdot 5 = 60$, $60 : 2 = 30$ cm$^2$.",
          uwaga: "Najpierw dodaj podstawy, potem mnóż. Ramion we wzorze nie używamy.",
        },
        {
          nazwa: "Skąd się bierze wzór",
          slownie: "Dwa takie same trapezy można złożyć w równoległobok. Jego podstawa ma długość $a + b$, a wysokość jest ta sama. Jeden trapez to połowa równoległoboku.",
          przyklad: "Z dwóch trapezów o podstawach $8$ cm i $4$ cm powstaje równoległobok o podstawie $12$ cm. Przy wysokości $5$ cm ma pole $60$ cm$^2$, a trapez ma $30$ cm$^2$.",
        },
        {
          nazwa: "Brakująca podstawa lub wysokość",
          slownie: "Pomnóż pole przez $2$ i podziel przez wysokość – dostaniesz sumę podstaw. Od niej odejmij znaną podstawę.",
          tex: "a+b=\\dfrac{2\\cdot P}{h}\\qquad h=\\dfrac{2\\cdot P}{a+b}",
          litery: "$P$ – pole trapezu, $a$, $b$ – podstawy, $h$ – wysokość.",
          przyklad: "Pole $30$ cm$^2$, wysokość $5$ cm, podstawa $8$ cm: $a + b = 2 \\cdot 30 : 5 = 12$, więc druga podstawa ma $12 - 8 = 4$ cm.",
          uwaga: "Po obliczeniu sumy podstaw nie zapomnij odjąć znanej podstawy.",
        },
        {
          nazwa: "Trapez z prostokąta i trójkąta",
          slownie: "Trapez prostokątny można podzielić na prostokąt i trójkąt prostokątny i dodać ich pola. Wynik jest taki sam jak ze wzoru.",
          przyklad: "Podstawy $9$ cm i $5$ cm, wysokość $4$ cm. Prostokąt: $5 \\cdot 4 = 20$ cm$^2$. Trójkąt: podstawa $9 - 5 = 4$ cm, więc $4 \\cdot 4 : 2 = 8$ cm$^2$. Razem $28$ cm$^2$.",
          uwaga: "Ze wzoru też wychodzi $(9 + 5) \\cdot 4 : 2 = 28$ cm$^2$. Możesz sprawdzić wynik drugim sposobem.",
        },
      ],
      jak: [
        "Wskaż dwie podstawy (boki równoległe) i wysokość między nimi.",
        "Dodaj podstawy, pomnóż przez wysokość i podziel przez $2$.",
        "Gdy szukasz podstawy, najpierw oblicz sumę podstaw, a potem odejmij znaną podstawę.",
        "Wynik możesz sprawdzić, dzieląc trapez na prostokąt i trójkąt.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Podstawy trapezu mają $9$ cm i $5$ cm, a jego wysokość ma $4$ cm. Jakie jest pole tego trapezu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$56\\ \\text{cm}^2$", "$28\\ \\text{cm}^2$", "$90\\ \\text{cm}^2$", "$18\\ \\text{cm}^2$"],
          poprawna: 1,
        },
        {
          nr: "23",
          tresc: "Podstawy trapezu mają $7$ cm i $3$ cm, a wysokość $6$ cm. Jakie jest pole tego trapezu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$30\\ \\text{cm}^2$", "$60\\ \\text{cm}^2$", "$16\\ \\text{cm}^2$", "$21\\ \\text{cm}^2$"],
          poprawna: 0,
        },
        {
          nr: "24",
          tresc: "Pole trapezu wynosi $40$ cm$^2$, a jego wysokość ma $5$ cm. Jedna podstawa ma $10$ cm. Ile centymetrów ma druga podstawa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$16$ cm", "$8$ cm", "$26$ cm", "$6$ cm"],
          poprawna: 3,
        },
        {
          nr: "25",
          tresc: "Który wzór opisuje pole trapezu o podstawach $a$ i $b$ oraz wysokości $h$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$a\\cdot h$", "$\\dfrac{a\\cdot b\\cdot h}{2}$", "$\\dfrac{(a+b)\\cdot h}{2}$", "$(a+b)\\cdot h$"],
          poprawna: 2,
        },
        {
          nr: "26",
          tresc: "Trapez ma podstawy $12$ cm i $6$ cm oraz wysokość $4$ cm. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Pole tego trapezu wynosi $36$ cm$^2$.", litery: "PF", poprawna: 0 },
            { tekst: "Pole tego trapezu wynosi $72$ cm$^2$.", litery: "PF", poprawna: 1 },
            { tekst: "Trapez o podstawach $10$ cm i $8$ cm i wysokości $4$ cm ma takie samo pole.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Blat stołu ma kształt trapezu o podstawach $120$ cm i $80$ cm. Odległość między podstawami wynosi $60$ cm. Oblicz pole blatu w centymetrach kwadratowych. **Zapisz obliczenia.**",
          rozwiazanie: "Suma podstaw: $120 + 80 = 200$ cm.\n\nPole: $200 \\cdot 60 : 2 = 12\\,000 : 2 = 6000$ cm$^2$.\n\nOdpowiedź: pole blatu wynosi $6000$ cm$^2$.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "Trapez prostokątny ma podstawy $10$ cm i $6$ cm oraz wysokość $5$ cm (jedno ramię jest prostopadłe do podstaw). Oblicz jego pole na dwa sposoby: ze wzoru oraz dzieląc trapez na prostokąt i trójkąt. **Zapisz obliczenia.**",
          rozwiazanie: "Sposób I (wzór): $(10 + 6) \\cdot 5 : 2 = 16 \\cdot 5 : 2 = 80 : 2 = 40$ cm$^2$.\n\nSposób II (podział). Prostokąt ma boki $6$ cm i $5$ cm, więc jego pole to $6 \\cdot 5 = 30$ cm$^2$.\n\nTrójkąt ma podstawę $10 - 6 = 4$ cm i wysokość $5$ cm, więc jego pole to $4 \\cdot 5 : 2 = 10$ cm$^2$.\n\nRazem: $30 + 10 = 40$ cm$^2$.\n\nOdpowiedź: pole trapezu wynosi $40$ cm$^2$.",
        },
      ],
      generatory: [
        {
          id: "trapez-pole",
          nazwa: "Pole trapezu",
          opis: "Znasz podstawy i wysokość trapezu – oblicz jego pole.",
          generuj(r) {
            let a, b, h;
            do {
              b = r.int(3, 10);
              a = b + r.int(1, 8);
              h = r.int(2, 10);
            } while (((a + b) * h) % 2 !== 0);
            const p = ((a + b) * h) / 2;
            const [A, B, C, D] = r.pick([["A", "B", "C", "D"], ["K", "L", "M", "N"], ["P", "Q", "R", "S"]]);
            const stol = r.chance();
            const u = stol ? "dm" : r.pick(["cm", "dm", "m"]);
            return {
              tresc: stol
                ? `Blat stołu ma kształt trapezu o podstawach $${a}$ dm i $${b}$ dm. Odległość między podstawami wynosi $${h}$ dm. Ile decymetrów kwadratowych ma pole blatu?`
                : `Trapez $${A}${B}${C}${D}$ ma podstawy $${a}$ ${u} i $${b}$ ${u} oraz wysokość $${h}$ ${u}. Oblicz pole tego trapezu.`,
              pola: [{ id: "w", typ: "liczba", etykieta: et(u) }],
              odpowiedz: { w: p },
              wynik: pl(p, u),
              rozwiazanie: [
                "Pole trapezu to suma podstaw razy wysokość, podzielona przez $2$.",
                `Suma podstaw: $${a} + ${b} = ${a + b}$.`,
                `Mnożymy przez wysokość: $${a + b} \\cdot ${h} = ${(a + b) * h}$.`,
                `Dzielimy przez $2$: ${rown(`${(a + b) * h} : 2`, p, u)}.`,
              ],
            };
          },
        },
        {
          id: "trapez-brakujacy",
          nazwa: "Brakujący wymiar trapezu",
          opis: "Znasz pole trapezu – oblicz brakującą podstawę albo wysokość.",
          generuj(r) {
            let a, b, h;
            do {
              b = r.int(3, 10);
              a = b + r.int(1, 8);
              h = r.int(2, 10);
            } while (((a + b) * h) % 2 !== 0);
            const p = ((a + b) * h) / 2;
            const u = r.pick(["cm", "dm", "m"]);
            const slowo = u === "cm" ? "centymetrów" : u === "dm" ? "decymetrów" : "metrów";
            if (r.chance()) {
              return {
                tresc: `Pole trapezu wynosi ${pl(p, u)}, a jego wysokość ma $${h}$ ${u}. Jedna podstawa ma $${a}$ ${u}. Ile ${slowo} ma druga podstawa?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Druga podstawa (w ${u}) $=$` }],
                odpowiedz: { w: b },
                wynik: `$${b}$ ${u}`,
                rozwiazanie: [
                  `Dwa razy pole podzielone przez wysokość to suma podstaw: $2 \\cdot ${p} : ${h} = ${a + b}$.`,
                  `Odejmujemy znaną podstawę: $${a + b} - ${a} = ${b}$ ${u}.`,
                ],
              };
            }
            return {
              tresc: `Podstawy trapezu mają $${a}$ ${u} i $${b}$ ${u}, a jego pole wynosi ${pl(p, u)}. Ile ${slowo} ma wysokość tego trapezu?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `Wysokość (w ${u}) $=$` }],
              odpowiedz: { w: h },
              wynik: `$${h}$ ${u}`,
              rozwiazanie: [
                `Suma podstaw: $${a} + ${b} = ${a + b}$.`,
                `Dwa razy pole: $2 \\cdot ${p} = ${2 * p}$.`,
                `Wysokość: $${2 * p} : ${a + b} = ${h}$ ${u}.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5
    {
      id: "jednostki-pola",
      nazwa: "Różne jednostki pola",
      sciaga: [
        {
          nazwa: "Jednostki pola",
          slownie: "Pole mierzymy w jednostkach kwadratowych: mm$^2$, cm$^2$, dm$^2$, m$^2$, km$^2$. Metr kwadratowy to pole kwadratu o boku $1$ m.",
          tex: "1\\ \\text{m}^2=1\\ \\text{m}\\cdot1\\ \\text{m}",
          przyklad: "Pole znaczka podajemy w cm$^2$, pole pokoju w m$^2$, a pole kraju w km$^2$.",
          uwaga: "Metr kwadratowy to pole, a metr to długość. Dlatego $1$ m$^2$ to nie to samo co $2$ m.",
        },
        {
          nazwa: "Mniejsze jednostki pola",
          slownie: "Sąsiednie jednostki pola różnią się $100$ razy. Kwadrat o boku $1$ dm ma bok $10$ cm, więc jego pole to $10 \\cdot 10 = 100$ cm$^2$.",
          tex: "1\\ \\text{cm}^2=100\\ \\text{mm}^2\\qquad1\\ \\text{dm}^2=100\\ \\text{cm}^2\\qquad1\\ \\text{m}^2=100\\ \\text{dm}^2\\qquad1\\ \\text{m}^2=10\\,000\\ \\text{cm}^2",
          przyklad: "$3$ m$^2$ to $3 \\cdot 100 = 300$ dm$^2$.",
          uwaga: "Przy polu mnożymy przez $100$, a nie przez $10$ jak przy długości.",
        },
        {
          nazwa: "Ar i hektar",
          slownie: "Pola działek i pól uprawnych podajemy w arach (a) i hektarach (ha). Ar to pole kwadratu o boku $10$ m, a hektar – kwadratu o boku $100$ m.",
          tex: "1\\ \\text{a}=100\\ \\text{m}^2\\qquad1\\ \\text{ha}=100\\ \\text{a}=10\\,000\\ \\text{m}^2\\qquad1\\ \\text{km}^2=100\\ \\text{ha}",
          litery: "a – ar, ha – hektar.",
          przyklad: "Działka $20$ m na $30$ m ma pole $600$ m$^2$, czyli $6$ a.",
          uwaga: "Symbol a oznacza tu jednostkę (ar), a nie długość boku.",
        },
        {
          nazwa: "Jak zamieniać jednostki",
          slownie: "Przy zamianie na mniejszą jednostkę mnożymy, a na większą – dzielimy. Mnożenie lub dzielenie przez $100$ przesuwa przecinek o dwa miejsca.",
          tex: "\\text{na mniejszą: }\\cdot\\,100\\qquad\\text{na większą: }:\\,100",
          przyklad: "$0{,}35$ m$^2$ $= 0{,}35 \\cdot 100 = 35$ dm$^2$. Odwrotnie: $250$ cm$^2$ $= 250 : 100 = 2{,}5$ dm$^2$.",
          uwaga: "Sprawdź wynik: gdy jednostka jest mniejsza, liczba musi być większa.",
        },
        {
          nazwa: "Pole przy różnych jednostkach",
          slownie: "Zanim obliczysz pole, zamień wszystkie długości na tę samą jednostkę. Dopiero wtedy mnóż.",
          tex: "300\\cdot50=15\\,000\\ \\text{cm}^2",
          przyklad: "Prostokąt $3$ m na $50$ cm: $3$ m $= 300$ cm, więc $P = 300 \\cdot 50 = 15\\,000$ cm$^2$, czyli $1{,}5$ m$^2$.",
          uwaga: "Nie mnóż metrów przez centymetry. Wynik nie miałby sensu.",
        },
      ],
      jak: [
        "Zdecyduj, czy zamieniasz na mniejszą jednostkę (wtedy mnóż), czy na większą (wtedy dziel).",
        "Przypomnij sobie, ile razy jedna jednostka mieści się w drugiej ($100$ albo $10\\,000$).",
        "Przesuń przecinek o $2$ miejsca (przy $100$) albo o $4$ miejsca (przy $10\\,000$).",
        "Przed liczeniem pola zamień długości na jedną jednostkę.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Ile centymetrów kwadratowych ma $1$ metr kwadratowy? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10$", "$100$", "$1000$", "$10\\,000$"],
          poprawna: 3,
        },
        {
          nr: "30",
          tresc: "Pole działki wynosi $3$ a. Ile metrów kwadratowych ma ta działka? **Wybierz właściwą odpowiedź.**",
          opcje: ["$30\\ \\text{m}^2$", "$300\\ \\text{m}^2$", "$3000\\ \\text{m}^2$", "$3\\ \\text{m}^2$"],
          poprawna: 1,
        },
        {
          nr: "31",
          tresc: "Ile metrów kwadratowych to $450$ dm$^2$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$45\\ \\text{m}^2$", "$0{,}45\\ \\text{m}^2$", "$4{,}5\\ \\text{m}^2$", "$45\\,000\\ \\text{m}^2$"],
          poprawna: 2,
        },
        {
          nr: "32",
          tresc: "Oceń zamiany jednostek. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$5\\ \\text{m}^2=500\\ \\text{dm}^2$", litery: "PF", poprawna: 0 },
            { tekst: "$2\\ \\text{ha}=2000\\ \\text{m}^2$", litery: "PF", poprawna: 1 },
            { tekst: "$30\\,000\\ \\text{cm}^2=3\\ \\text{m}^2$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "33",
          tresc: "Ogródek ma kształt prostokąta o bokach $40$ m i $25$ m. Ile arów ma jego pole? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10$ a", "$100$ a", "$1000$ a", "$1$ a"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 2,
          tresc: "Podłoga w pokoju ma wymiary $4$ m na $5$ m. Chcemy ją pokryć kwadratowymi płytkami o boku $50$ cm. Ile płytek potrzeba (bez cięcia i bez zapasu)? **Zapisz obliczenia.**",
          rozwiazanie: "Zamieniamy metry na centymetry: $4$ m $= 400$ cm, $5$ m $= 500$ cm.\n\nWzdłuż krótszego boku zmieści się $400 : 50 = 8$ płytek, a wzdłuż dłuższego $500 : 50 = 10$ płytek.\n\nRazem: $8 \\cdot 10 = 80$ płytek.\n\nSprawdzenie: pole podłogi to $4 \\cdot 5 = 20$ m$^2$, pole płytki to $0{,}5 \\cdot 0{,}5 = 0{,}25$ m$^2$, a $20 : 0{,}25 = 80$.\n\nOdpowiedź: potrzeba $80$ płytek.",
        },
        {
          nr: "35",
          punkty: 3,
          tresc: "Prostokątne pole ma długość $300$ m i szerokość $200$ m. Oblicz jego pole w metrach kwadratowych, w arach i w hektarach. **Zapisz obliczenia.**",
          rozwiazanie: "Pole w metrach kwadratowych: $300 \\cdot 200 = 60\\,000$ m$^2$.\n\nJeden ar to $100$ m$^2$, więc w arach: $60\\,000 : 100 = 600$ a.\n\nJeden hektar to $10\\,000$ m$^2$, więc w hektarach: $60\\,000 : 10\\,000 = 6$ ha.\n\nSprawdzenie: $1$ ha $= 100$ a, a $600 : 100 = 6$.\n\nOdpowiedź: pole ma $60\\,000$ m$^2$, czyli $600$ a, czyli $6$ ha.",
        },
      ],
      generatory: [
        {
          id: "jednostki-zamiana",
          nazwa: "Zamiana jednostek",
          opis: "Zamień jednostki pola: mm², cm², dm², m², ar, hektar i km².",
          generuj(r) {
            const [duza, mala, f] = r.pick(PARY);
            const wDol = r.chance();
            let v, wyn;
            if (wDol) {
              const k = r.int(0, 2);
              const max = (f === 10000 ? 9 : 99) * 10 ** k;
              let n;
              do { n = r.int(1, max); } while (k > 0 && n % 10 === 0);
              v = q(n, 10 ** k);
              wyn = v.mul(f);
            } else {
              v = q(r.int(10, 999));
              wyn = v.div(f);
            }
            const [z, na] = wDol ? [duza, mala] : [mala, duza];
            return {
              tresc: r.chance()
                ? `Zamień $${dz(v)}\\ ${U[z]}$ na $${U[na]}$.`
                : `Ile $${U[na]}$ to $${dz(v)}\\ ${U[z]}$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `Wynik (w $${U[na]}$) $=$` }],
              odpowiedz: { w: wyn },
              wynik: `$${dz(wyn)}\\ ${U[na]}$`,
              rozwiazanie: [
                `Pamiętamy: $1\\ ${U[duza]} = ${lcz(f)}\\ ${U[mala]}$.`,
                wDol
                  ? `Zamieniamy na mniejszą jednostkę, więc mnożymy: $${dz(v)} \\cdot ${lcz(f)} = ${dz(wyn)}$.`
                  : `Zamieniamy na większą jednostkę, więc dzielimy: $${dz(v)} : ${lcz(f)} = ${dz(wyn)}$.`,
                `Odpowiedź: $${dz(v)}\\ ${U[z]} = ${dz(wyn)}\\ ${U[na]}$.`,
              ],
            };
          },
        },
        {
          id: "jednostki-dzialka",
          nazwa: "Działka i pole uprawne",
          opis: "Pole prostokątnej działki lub pola w arach i hektarach albo brakujący bok.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const a = 10 * r.int(1, 9), b = 10 * r.int(1, 9);
              const w = (a * b) / 100;
              return {
                tresc: `Prostokątna działka ma wymiary $${a}$ m na $${b}$ m. Ile arów ma jej pole?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Pole (w arach) $=$" }],
                odpowiedz: { w },
                wynik: `$${w}$ a`,
                rozwiazanie: [
                  `Pole w metrach kwadratowych: ${rown(`${a} \\cdot ${b}`, lcz(a * b), "m")}.`,
                  `Jeden ar to $100$ m$^2$, więc dzielimy: $${lcz(a * b)} : 100 = ${w}$ a.`,
                ],
              };
            }
            if (tryb === 1) {
              let i, j;
              do { i = r.int(1, 9); j = r.int(1, 9); } while (i * j > 10);
              const a = 100 * i, b = 100 * j;
              const w = i * j;
              return {
                tresc: `Pole uprawne ma kształt prostokąta o wymiarach $${a}$ m na $${b}$ m. Ile hektarów ma to pole?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Pole (w hektarach) $=$" }],
                odpowiedz: { w },
                wynik: `$${w}$ ha`,
                rozwiazanie: [
                  `Pole w metrach kwadratowych: ${rown(`${a} \\cdot ${b}`, lcz(a * b), "m")}.`,
                  `Jeden hektar to $10\\,000$ m$^2$, więc dzielimy: $${lcz(a * b)} : 10\\,000 = ${w}$ ha.`,
                ],
              };
            }
            let a, b;
            do { a = r.pick([10, 20, 25, 40, 50]); b = r.int(4, 40); } while ((a * b) % 100 !== 0 || a === b);
            const p = (a * b) / 100;
            return {
              tresc: `Prostokątna działka ma pole $${p}$ a. Jeden jej bok ma $${a}$ m. Ile metrów ma drugi bok?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Drugi bok (w m) $=$" }],
              odpowiedz: { w: b },
              wynik: `$${b}$ m`,
              rozwiazanie: [
                `Zamieniamy pole na metry kwadratowe: $${p} \\cdot 100 = ${p * 100}$ m$^2$.`,
                `Drugi bok to pole podzielone przez znany bok: $${p * 100} : ${a} = ${b}$ m.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
