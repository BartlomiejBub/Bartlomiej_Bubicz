// Klasa 2 (liceum i technikum) · rozdział 4 „Geometria płaska – okręgi i koła” – Matematyka 2, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** „Ładna” odpowiedź: mianownik co najwyżej 12. */
const ladna = (v) => Math.abs(v.n) <= 100000 && v.d <= 12;

/** Trójki pitagorejskie (a, b, c) w najprostszej postaci – boki każdej pary są względnie pierwsze. */
const TROJKI = [[3, 4, 5], [5, 12, 13], [8, 15, 17]];

/** Współczynnik przed literą: 1 się pomija. */
const wsp = (n) => (n === 1 ? "" : String(n));

/** Miara kąta w stopniach w LaTeX. */
const st = (n) => `${n}^\\circ`;

/** Wszystkie rozkłady liczby n na iloczyn x·y, gdzie 1 < x < y. */
const pary = (n) => {
  const w = [];
  for (let x = 2; x * x < n; x++) if (n % x === 0) w.push([x, n / x]);
  return w;
};

/** Boki trójkątów o całkowitym polu (a, b, c, P) – do promienia okręgu wpisanego. */
const HERON = [
  [13, 14, 15, 84], [5, 5, 6, 12], [10, 10, 12, 48], [17, 17, 16, 120], [9, 10, 17, 36], [6, 25, 29, 60],
  [7, 15, 20, 42], [13, 13, 10, 60], [4, 13, 15, 24], [10, 17, 21, 84], [9, 12, 15, 54], [8, 15, 17, 60],
];

const OPCJE_POLOZENIE = [
  "rozłączne zewnętrznie",
  "styczne zewnętrznie",
  "przecinają się w dwóch punktach",
  "styczne wewnętrznie",
  "jeden leży wewnątrz drugiego (bez punktów wspólnych)",
];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 4.2
    {
      id: "prosta-i-okrag",
      nazwa: "Okrąg. Położenie prostej i okręgu",
      sciaga: [
        {
          nazwa: "Okrąg i jego elementy",
          slownie: "Okrąg o środku $O$ i promieniu $r$ to wszystkie punkty płaszczyzny oddalone od $O$ o $r$. Odcinek łączący dwa punkty okręgu to cięciwa, a cięciwa przechodząca przez środek to średnica.",
          tex: "d=2r",
          litery: "$d$ – średnica, $r$ – promień okręgu.",
          przyklad: "Okrąg o promieniu $5$ ma średnicę $10$, a żadna jego cięciwa nie jest dłuższa niż $10$.",
          uwaga: "Okrąg to sama linia, a koło to linia razem z wnętrzem.",
        },
        {
          nazwa: "Prosta i okrąg",
          slownie: "Położenie prostej względem okręgu zależy od odległości $d$ środka okręgu od tej prostej. Porównujemy ją z promieniem $r$.",
          tex: "d>r\\ \\text{(0 punktów)}\\qquad d=r\\ \\text{(1 punkt)}\\qquad d<r\\ \\text{(2 punkty)}",
          litery: "$d$ – odległość środka okręgu od prostej, $r$ – promień. W trzech przypadkach prosta jest odpowiednio rozłączna z okręgiem, styczna i sieczna.",
          przyklad: "Dla $r=5$ i $d=3$ prosta jest sieczna, bo $3<5$, i ma z okręgiem dwa punkty wspólne.",
          uwaga: "Odległość mierzymy prostopadle do prostej – to najkrótszy odcinek od środka do prostej.",
        },
        {
          nazwa: "Styczna do okręgu",
          slownie: "Styczna ma z okręgiem jeden punkt wspólny i jest prostopadła do promienia poprowadzonego do punktu styczności. Dzięki temu powstaje trójkąt prostokątny.",
          tex: "OA\\perp k",
          litery: "$A$ – punkt styczności, $O$ – środek okręgu, $k$ – styczna.",
          przyklad: "Okrąg ma promień $3$, a punkt $P$ leży na stycznej w odległości $5$ od środka $O$. Wtedy $|PA|=\\sqrt{5^2-3^2}=4$.",
          uwaga: "Kąt prosty jest przy punkcie styczności $A$, więc przeciwprostokątną jest $OP$.",
        },
        {
          nazwa: "Cięciwa i odległość od środka",
          slownie: "Odcinek poprowadzony ze środka okręgu prostopadle do cięciwy dzieli tę cięciwę na połowy. Powstaje trójkąt prostokątny z promieniem jako przeciwprostokątną.",
          tex: "r^2=d^2+\\left(\\frac{|AB|}{2}\\right)^2",
          litery: "$r$ – promień, $d$ – odległość środka od cięciwy $AB$.",
          przyklad: "Dla $r=13$ i $d=5$ połowa cięciwy to $\\sqrt{13^2-5^2}=12$, więc cięciwa ma długość $24$.",
          uwaga: "Z twierdzenia Pitagorasa dostajemy połowę cięciwy – nie zapomnij jej podwoić.",
        },
      ],
      jak: [
        "Dla zadania o położeniu prostej porównaj odległość $d$ środka od prostej z promieniem $r$.",
        "Gdy w zadaniu jest styczna, poprowadź promień do punktu styczności – jest on prostopadły do stycznej.",
        "Gdy w zadaniu jest cięciwa, opuść ze środka prostopadłą na cięciwę; dzieli ona cięciwę na połowy.",
        "Z powstałego trójkąta prostokątnego policz brakujący bok z twierdzenia Pitagorasa.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Okrąg ma promień $6$, a prosta $k$ leży w odległości $6$ od jego środka. Liczba punktów wspólnych prostej $k$ i okręgu jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$0$", "$1$", "$2$", "nieskończenie wiele"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Okrąg ma promień $8$, a środek okręgu leży w odległości $5$ od prostej $k$. **Wybierz właściwą odpowiedź.**",
          opcje: [
            "Prosta $k$ jest styczna do okręgu.",
            "Prosta $k$ nie ma z okręgiem punktów wspólnych.",
            "Prosta $k$ jest sieczną okręgu.",
            "Prosta $k$ przechodzi przez środek okręgu.",
          ],
          poprawna: 2,
        },
        {
          nr: "3",
          tresc: "Okrąg ma promień $10$, a jego cięciwa $AB$ ma długość $16$. Odległość środka okręgu od cięciwy $AB$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$", "$8$", "$12$", "$6$"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "Okrąg o środku $O$ i promieniu $3$ jest styczny do prostej $k$ w punkcie $A$. Punkt $P$ leży na prostej $k$, a $|OP|=5$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$|PA|=4$", litery: "PF", poprawna: 0 },
            { tekst: "Kąt prosty trójkąta $OAP$ jest przy wierzchołku $P$.", litery: "PF", poprawna: 1 },
            { tekst: "$|PA|<|OP|$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "5",
          tresc: "W trójkącie prostokątnym $ABC$ kąt prosty jest przy wierzchołku $C$, a $|AC|=6$ i $|BC|=8$. Okrąg o środku $C$ jest styczny do prostej $AB$. Promień tego okręgu jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$4{,}8$", "$5$", "$3{,}6$", "$7$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Okrąg o środku $O$ ma promień $17$. Cięciwa $AB$ tego okręgu ma długość $30$. Oblicz odległość środka $O$ od cięciwy $AB$ oraz pole trójkąta $AOB$. **Zapisz obliczenia.**",
          rozwiazanie: "Odcinek z $O$ prostopadły do cięciwy dzieli ją na dwie części po $15$. Z twierdzenia Pitagorasa: $d^2 = 17^2 - 15^2 = 289 - 225 = 64$, więc $d = 8$.\n\nTrójkąt $AOB$ ma podstawę $|AB|=30$ i wysokość $d=8$.\n\nPole: $\\frac{1}{2}\\cdot 30\\cdot 8 = 120$.\n\nOdpowiedź: odległość środka od cięciwy to $8$, a pole trójkąta $AOB$ to $120$.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Dwie równoległe cięciwy okręgu o promieniu $13$ mają długości $10$ i $24$ i leżą po przeciwnych stronach środka okręgu. Oblicz odległość między tymi cięciwami. **Zapisz obliczenia.**",
          rozwiazanie: "Odległość środka od cięciwy długości $10$: połowa cięciwy to $5$, więc $d_1 = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12$.\n\nOdległość środka od cięciwy długości $24$: połowa cięciwy to $12$, więc $d_2 = \\sqrt{13^2 - 12^2} = \\sqrt{25} = 5$.\n\nCięciwy leżą po przeciwnych stronach środka, więc odległości dodajemy: $12 + 5 = 17$.\n\nOdpowiedź: $17$.",
        },
      ],
      generatory: [
        {
          id: "prosta-okrag-polozenie",
          nazwa: "Prosta i okrąg",
          opis: "Porównaj odległość środka od prostej z promieniem i wskaż położenie prostej względem okręgu.",
          generuj(r) {
            const R = r.int(2, 12);
            const przypadek = r.int(0, 2);   // 0 – rozłączna, 1 – styczna, 2 – sieczna
            const d = przypadek === 0 ? r.int(R + 1, R + 6) : przypadek === 1 ? R : r.int(1, R - 1);
            const prosta = r.pick(["k", "l", "m"]);
            const przez = r.chance(0.35);
            const dane = przez ? `Średnica okręgu ma długość $${2 * R}$` : `Okrąg ma promień $${R}$`;
            const znak = przypadek === 0 ? ">" : przypadek === 1 ? "=" : "<";
            const wnioski = ["prosta i okrąg nie mają punktów wspólnych", "prosta jest styczna do okręgu", "prosta jest sieczną okręgu"];
            const rozwiazanie = [];
            if (przez) rozwiazanie.push(`Promień to połowa średnicy: $r = ${2 * R}:2 = ${R}$.`);
            rozwiazanie.push(
              `Porównujemy odległość środka od prostej z promieniem: $d = ${d}$ i $r = ${R}$, więc $d ${znak} r$.`,
              `Zatem ${wnioski[przypadek]}.`,
            );
            return {
              tresc: `${dane}, a odległość jego środka od prostej $${prosta}$ jest równa $${d}$. Jakie jest położenie prostej $${prosta}$ względem okręgu?`,
              pola: [{ id: "p", typ: "wybor", etykieta: "Położenie prostej", opcje: ["prosta jest styczna do okręgu", "prosta jest sieczną okręgu", "prosta i okrąg nie mają punktów wspólnych"] }],
              odpowiedz: { p: [2, 0, 1][przypadek] },
              wynik: wnioski[przypadek],
              rozwiazanie,
            };
          },
        },
        {
          id: "prosta-okrag-cieciwa",
          nazwa: "Cięciwa i środek",
          opis: "Oblicz długość cięciwy, odległość cięciwy od środka albo promień okręgu z trójkąta prostokątnego.",
          generuj(r) {
            const [a0, b0, c0] = r.pick(TROJKI);
            const k = r.int(1, 2);
            const [x, y] = r.chance() ? [a0, b0] : [b0, a0];
            const R = c0 * k, d = x * k, pol = y * k;
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              return {
                tresc: `W okręgu o promieniu $${R}$ poprowadzono cięciwę $AB$ w odległości $${d}$ od środka okręgu. Oblicz długość cięciwy $AB$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$|AB| =$" }],
                odpowiedz: { w: q(2 * pol) },
                wynik: `$|AB| = ${2 * pol}$`,
                rozwiazanie: [
                  `Odcinek z środka prostopadły do cięciwy dzieli ją na połowy. Połowa cięciwy $h$ spełnia $h^2 = r^2 - d^2$.`,
                  `$h = \\sqrt{${R}^2 - ${d}^2} = \\sqrt{${R * R - d * d}} = ${pol}$.`,
                  `Cała cięciwa: $|AB| = 2h = ${2 * pol}$.`,
                ],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Cięciwa $AB$ okręgu o promieniu $${R}$ ma długość $${2 * pol}$. Oblicz odległość środka okręgu od tej cięciwy.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Odległość od środka" }],
                odpowiedz: { w: q(d) },
                wynik: `$d = ${d}$`,
                rozwiazanie: [
                  `Odcinek z środka prostopadły do cięciwy dzieli ją na połowy, każda ma długość $${2 * pol}:2 = ${pol}$.`,
                  `Z twierdzenia Pitagorasa: $d^2 = r^2 - ${pol}^2 = ${R}^2 - ${pol}^2 = ${d * d}$.`,
                  `Stąd $d = ${d}$.`,
                ],
              };
            }
            return {
              tresc: `Cięciwa okręgu ma długość $${2 * pol}$ i leży w odległości $${d}$ od środka okręgu. Oblicz promień okręgu.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "$r =$" }],
              odpowiedz: { w: q(R) },
              wynik: `$r = ${R}$`,
              rozwiazanie: [
                `Odcinek z środka prostopadły do cięciwy dzieli ją na połowy, każda ma długość $${2 * pol}:2 = ${pol}$.`,
                `Promień jest przeciwprostokątną trójkąta o przyprostokątnych $${d}$ i $${pol}$: $r = \\sqrt{${d}^2 + ${pol}^2} = \\sqrt{${d * d + pol * pol}}$.`,
                `Stąd $r = ${R}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4.3
    {
      id: "dwa-okregi",
      nazwa: "Wzajemne położenie dwóch okręgów",
      sciaga: [
        {
          nazwa: "Odległość środków",
          slownie: "O położeniu dwóch okręgów decyduje odległość ich środków $d$ w porównaniu z sumą i różnicą promieni.",
          tex: "d=|O_1O_2|\\qquad r_1+r_2\\qquad r_1-r_2",
          litery: "$O_1$, $O_2$ – środki okręgów, $r_1\\geq r_2$ – ich promienie, $d$ – odległość środków.",
          przyklad: "Dla promieni $5$ i $3$: suma to $8$, a różnica $2$. Z tymi liczbami porównujemy $d$.",
        },
        {
          nazwa: "Rozłączne i styczne zewnętrznie",
          slownie: "Gdy środki są daleko od siebie, okręgi leżą obok siebie. Gdy odległość jest równa sumie promieni, mają jeden punkt wspólny, leżący na odcinku $O_1O_2$.",
          tex: "d>r_1+r_2\\qquad d=r_1+r_2",
          litery: "Pierwszy zapis: okręgi rozłączne zewnętrznie (brak punktów wspólnych), drugi: styczne zewnętrznie (jeden punkt wspólny).",
          przyklad: "Dla promieni $5$ i $3$ okręgi są styczne zewnętrznie, gdy $d=8$, a rozłączne zewnętrznie, gdy np. $d=10$.",
        },
        {
          nazwa: "Okręgi przecinające się",
          slownie: "Okręgi mają dwa punkty wspólne, gdy odległość środków jest większa od różnicy promieni i mniejsza od ich sumy.",
          tex: "r_1-r_2<d<r_1+r_2",
          litery: "$r_1\\geq r_2$ – promienie okręgów, $d$ – odległość środków.",
          przyklad: "Dla promieni $5$ i $3$ okręgi przecinają się, gdy $2<d<8$, np. dla $d=6$.",
          uwaga: "Nierówności są ostre. Dla $d=2$ albo $d=8$ okręgi są styczne, a nie przecinają się.",
        },
        {
          nazwa: "Jeden okrąg w drugim",
          slownie: "Gdy odległość środków jest równa różnicy promieni, okręgi są styczne wewnętrznie. Gdy jest od niej mniejsza, jeden okrąg leży wewnątrz drugiego i nie mają punktów wspólnych.",
          tex: "d=r_1-r_2\\qquad d<r_1-r_2",
          litery: "Pierwszy zapis: okręgi styczne wewnętrznie (jeden punkt wspólny), drugi: jeden okrąg wewnątrz drugiego.",
          przyklad: "Dla promieni $5$ i $3$ okręgi są styczne wewnętrznie, gdy $d=2$, a gdy $d=1$ (lub $d=0$), mniejszy leży w większym.",
          uwaga: "Dla $d=0$ okręgi mają wspólny środek – to szczególny przypadek jednego okręgu wewnątrz drugiego.",
        },
      ],
      jak: [
        "Zapisz promienie tak, aby $r_1\\geq r_2$, i oblicz ich sumę $r_1+r_2$ oraz różnicę $r_1-r_2$.",
        "Porównaj odległość środków $d$ z obiema liczbami.",
        "Odczytaj położenie: $d>$ suma, $d=$ suma, między różnicą a sumą, $d=$ różnica, $d<$ różnica.",
        "Jeśli szukasz odległości $d$ okręgów stycznych, dodaj albo odejmij promienie.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Okręgi o promieniach $7$ i $3$ mają środki oddalone o $10$. Te okręgi są. **Wybierz właściwą odpowiedź.**",
          opcje: ["rozłączne zewnętrznie", "styczne zewnętrznie", "przecinające się w dwóch punktach", "styczne wewnętrznie"],
          poprawna: 1,
        },
        {
          nr: "9",
          tresc: "Okręgi o promieniach $9$ i $4$ mają środki oddalone o $5$. Te okręgi są. **Wybierz właściwą odpowiedź.**",
          opcje: [
            "przecinające się w dwóch punktach",
            "styczne zewnętrznie",
            "styczne wewnętrznie",
            "takie, że jeden leży wewnątrz drugiego i nie mają punktów wspólnych",
          ],
          poprawna: 2,
        },
        {
          nr: "10",
          tresc: "Okręgi o promieniach $6$ i $2$ przecinają się w dwóch punktach. Odległość ich środków może być równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$8$", "$10$", "$6$"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "Okręgi mają promienie $4$ i $1$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Jeśli odległość środków wynosi $3$, to okręgi są styczne zewnętrznie.", litery: "PF", poprawna: 1 },
            { tekst: "Jeśli odległość środków wynosi $4$, to okręgi mają dwa punkty wspólne.", litery: "PF", poprawna: 0 },
            { tekst: "Jeśli środki okręgów pokrywają się, to jeden okrąg leży wewnątrz drugiego.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "12",
          tresc: "Dwa okręgi o promieniach $5$ i $12$ są styczne zewnętrznie. Odległość ich środków jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$17$", "$7$", "$13$", "$60$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Okręgi o promieniach $7$ i $4$ przecinają się w dwóch punktach, a odległość ich środków jest liczbą całkowitą. Podaj wszystkie możliwe wartości tej odległości i ich liczbę. **Zapisz obliczenia.**",
          rozwiazanie: "Okręgi przecinają się, gdy $r_1 - r_2 < d < r_1 + r_2$.\n\nRóżnica promieni: $7 - 4 = 3$, suma: $7 + 4 = 11$, więc $3 < d < 11$.\n\nLiczby całkowite spełniające nierówność: $4, 5, 6, 7, 8, 9, 10$.\n\nOdpowiedź: $d$ może przyjąć $7$ wartości: od $4$ do $10$.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Okręgi o środkach $O_1$ i $O_2$ oraz promieniach $9$ i $4$ są styczne zewnętrznie. Prosta $k$ jest styczna do obu okręgów w punktach $A$ i $B$, przy czym oba okręgi leżą po tej samej stronie prostej $k$. Oblicz $|AB|$. **Zapisz obliczenia.**",
          rozwiazanie: "Okręgi są styczne zewnętrznie, więc $|O_1O_2| = 9 + 4 = 13$.\n\nPromienie $O_1A$ i $O_2B$ są prostopadłe do stycznej $k$, więc są równoległe. Czworokąt $ABO_2O_1$ jest trapezem prostokątnym.\n\nPoprowadźmy z $O_2$ odcinek równoległy do $AB$ do przecięcia z $O_1A$ w punkcie $C$. Wtedy $|O_1C| = 9 - 4 = 5$ i trójkąt $O_1CO_2$ jest prostokątny z przeciwprostokątną $13$.\n\n$|CO_2| = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12$, a $|AB| = |CO_2|$.\n\nOdpowiedź: $|AB| = 12$.",
        },
      ],
      generatory: [
        {
          id: "dwa-okregi-polozenie",
          nazwa: "Położenie dwóch okręgów",
          opis: "Na podstawie promieni i odległości środków wskaż, jak położone są dwa okręgi.",
          generuj(r) {
            const kat = r.int(0, 4);   // indeks na liście OPCJE_POLOZENIE
            const R1 = r.int(3, 12), R2 = r.int(1, R1 - 1);
            const suma = R1 + R2, roznica = R1 - R2;
            const d = [() => r.int(suma + 1, suma + 5), () => suma, () => r.int(roznica + 1, suma - 1), () => roznica, () => r.int(0, roznica - 1)][kat]();
            const [pierwszy, drugi] = r.chance() ? [R1, R2] : [R2, R1];
            const odleglosc = d === 0 ? "Środki obu okręgów leżą w tym samym punkcie" : `Odległość środków tych okręgów jest równa $${d}$`;
            const porownanie = [
              `$${d} > ${suma}$, czyli $d > r_1 + r_2$`,
              `$${d} = ${suma}$, czyli $d = r_1 + r_2$`,
              `$${roznica} < ${d} < ${suma}$, czyli $r_1 - r_2 < d < r_1 + r_2$`,
              `$${d} = ${roznica}$, czyli $d = r_1 - r_2$`,
              `$${d} < ${roznica}$, czyli $d < r_1 - r_2$`,
            ][kat];
            return {
              tresc: `Okrąg o środku $O_1$ ma promień $${pierwszy}$, a okrąg o środku $O_2$ ma promień $${drugi}$. ${odleglosc}. Jak położone są te okręgi?`,
              pola: [{ id: "p", typ: "wybor", etykieta: "Położenie okręgów", opcje: OPCJE_POLOZENIE }],
              odpowiedz: { p: kat },
              wynik: OPCJE_POLOZENIE[kat],
              rozwiazanie: [
                `Suma promieni: $${R1} + ${R2} = ${suma}$, różnica: $${R1} - ${R2} = ${roznica}$.`,
                d === 0 ? "Środki się pokrywają, więc $d = 0$." : `Odległość środków: $d = ${d}$.`,
                `Porównujemy: ${porownanie}.`,
                `Zatem okręgi są: ${OPCJE_POLOZENIE[kat]}.`,
              ],
            };
          },
        },
        {
          id: "dwa-okregi-odleglosc",
          nazwa: "Odległość środków",
          opis: "Dla okręgów stycznych oblicz odległość środków albo promień; dla przecinających się policz możliwe odległości całkowite.",
          generuj(r) {
            const tryb = r.int(0, 3);
            const R1 = r.int(4, 14), R2 = r.int(1, R1 - 1);
            if (tryb === 0) {
              return {
                tresc: `Dwa okręgi o promieniach $${R1}$ i $${R2}$ są styczne zewnętrznie. Oblicz odległość ich środków.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$d =$" }],
                odpowiedz: { w: q(R1 + R2) },
                wynik: `$d = ${R1 + R2}$`,
                rozwiazanie: [`Dla okręgów stycznych zewnętrznie $d = r_1 + r_2$.`, `$d = ${R1} + ${R2} = ${R1 + R2}$.`],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Dwa okręgi o promieniach $${R1}$ i $${R2}$ są styczne wewnętrznie. Oblicz odległość ich środków.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$d =$" }],
                odpowiedz: { w: q(R1 - R2) },
                wynik: `$d = ${R1 - R2}$`,
                rozwiazanie: [`Dla okręgów stycznych wewnętrznie $d = r_1 - r_2$, gdzie $r_1$ jest większym promieniem.`, `$d = ${R1} - ${R2} = ${R1 - R2}$.`],
              };
            }
            if (tryb === 2) {
              const zewn = r.chance();
              const d = zewn ? R1 + R2 : R1 - R2;
              return {
                tresc: zewn
                  ? `Okręgi o środkach $O_1$ i $O_2$ są styczne zewnętrznie, $|O_1O_2| = ${d}$, a okrąg o środku $O_1$ ma promień $${R1}$. Oblicz promień drugiego okręgu.`
                  : `Okręgi o środkach $O_1$ i $O_2$ są styczne wewnętrznie, $|O_1O_2| = ${d}$, a większy z nich ma promień $${R1}$. Oblicz promień mniejszego okręgu.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$r_2 =$" }],
                odpowiedz: { w: q(R2) },
                wynik: `$r_2 = ${R2}$`,
                rozwiazanie: zewn
                  ? [`Dla okręgów stycznych zewnętrznie $d = r_1 + r_2$, więc $r_2 = d - r_1$.`, `$r_2 = ${d} - ${R1} = ${R2}$.`]
                  : [`Dla okręgów stycznych wewnętrznie $d = r_1 - r_2$, więc $r_2 = r_1 - d$.`, `$r_2 = ${R1} - ${d} = ${R2}$.`],
              };
            }
            const mniejszy = Math.min(R1, R2), wiekszy = Math.max(R1, R2);
            return {
              tresc: `Okręgi o promieniach $${R1}$ i $${R2}$ przecinają się w dwóch punktach, a odległość ich środków jest liczbą całkowitą. Ile różnych wartości może mieć ta odległość?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba wartości" }],
              odpowiedz: { w: q(2 * mniejszy - 1) },
              wynik: `$${2 * mniejszy - 1}$`,
              rozwiazanie: [
                `Okręgi przecinają się, gdy $${wiekszy} - ${mniejszy} < d < ${wiekszy} + ${mniejszy}$, czyli $${wiekszy - mniejszy} < d < ${wiekszy + mniejszy}$.`,
                `Liczby całkowite od $${wiekszy - mniejszy + 1}$ do $${wiekszy + mniejszy - 1}$.`,
                `Jest ich $${wiekszy + mniejszy - 1} - ${wiekszy - mniejszy + 1} + 1 = ${2 * mniejszy - 1}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4.4
    {
      id: "katy-i-kola",
      nazwa: "Kąty i koła",
      sciaga: [
        {
          nazwa: "Kąt środkowy i wpisany",
          slownie: "Kąt środkowy ma wierzchołek w środku okręgu, a kąt wpisany – na okręgu. Jeśli są oparte na tym samym łuku, kąt środkowy jest dwa razy większy od wpisanego.",
          tex: "\\angle AOB=2\\cdot\\angle ACB",
          litery: "$O$ – środek okręgu, $A$, $B$, $C$ – punkty okręgu; kąt $ACB$ jest oparty na łuku $AB$ niezawierającym punktu $C$.",
          przyklad: "Kąt wpisany ma $35^\\circ$, więc kąt środkowy oparty na tym samym łuku ma $70^\\circ$.",
          uwaga: "Porównujemy tylko kąty oparte na tym samym łuku.",
        },
        {
          nazwa: "Kąty wpisane oparte na łuku",
          slownie: "Kąty wpisane oparte na tym samym łuku są równe. Kąty wpisane oparte na dwóch łukach uzupełniających się do okręgu (punkty $C$, $D$ po przeciwnych stronach cięciwy $AB$) dają razem $180^\\circ$.",
          tex: "\\angle ACB=\\angle ADB\\qquad \\angle ACB+\\angle ADB=180^\\circ",
          litery: "Pierwsza równość: $C$ i $D$ leżą po tej samej stronie cięciwy $AB$. Druga: po przeciwnych stronach.",
          przyklad: "Jeśli $\\angle ACB=50^\\circ$, to $D$ po tej samej stronie daje $50^\\circ$, a po przeciwnej $130^\\circ$.",
        },
        {
          nazwa: "Kąt oparty na średnicy",
          slownie: "Kąt wpisany oparty na średnicy jest prosty, bo odpowiadający mu kąt środkowy jest półpełny. Odwrotnie: przeciwprostokątna trójkąta prostokątnego wpisanego w okrąg jest jego średnicą.",
          tex: "\\angle ACB=90^\\circ\\qquad\\text{gdy }|AB|=2r",
          litery: "$AB$ – średnica okręgu, $C$ – dowolny inny punkt okręgu.",
          przyklad: "Gdy $AB$ jest średnicą, a $\\angle CAB=35^\\circ$, to $\\angle ABC=90^\\circ-35^\\circ=55^\\circ$.",
        },
        {
          nazwa: "Czworokąt wpisany w okrąg",
          slownie: "W czworokącie wpisanym w okrąg sumy miar kątów przeciwległych są równe $180^\\circ$. Odwrotnie: jeśli sumy kątów przeciwległych są równe $180^\\circ$, na czworokącie można opisać okrąg.",
          tex: "\\alpha+\\gamma=180^\\circ\\qquad\\beta+\\delta=180^\\circ",
          litery: "$\\alpha$, $\\beta$, $\\gamma$, $\\delta$ – kolejne kąty czworokąta $ABCD$.",
          przyklad: "Dla $\\angle A=80^\\circ$ i $\\angle B=95^\\circ$ mamy $\\angle C=100^\\circ$ i $\\angle D=85^\\circ$.",
          uwaga: "Sumę $180^\\circ$ tworzą kąty naprzeciw siebie, a nie sąsiednie.",
        },
        {
          nazwa: "Kąt między styczną a cięciwą",
          slownie: "Kąt między styczną w punkcie $A$ a cięciwą $AB$ jest równy kątowi wpisanemu opartemu na łuku $AB$ leżącym wewnątrz tego kąta. Kąt środkowy oparty na tym łuku jest dwa razy większy.",
          tex: "\\varphi=\\angle ACB\\qquad \\angle AOB=2\\varphi",
          litery: "$\\varphi$ – kąt między styczną a cięciwą $AB$, $C$ – punkt okręgu po drugiej stronie cięciwy, $O$ – środek okręgu.",
          przyklad: "Gdy cięciwa tworzy ze styczną kąt $50^\\circ$, kąt środkowy oparty na tym łuku ma $100^\\circ$.",
        },
      ],
      jak: [
        "Zaznacz łuk, na którym oparty jest dany kąt, i sprawdź, po której stronie cięciwy leży wierzchołek.",
        "Dla kąta środkowego i wpisanego opartych na tym samym łuku użyj zależności $2:1$.",
        "Gdy w zadaniu jest średnica, zauważ kąt prosty. Gdy jest czworokąt wpisany, zapisz $\\alpha+\\gamma=180^\\circ$.",
        "Zapisz równanie i oblicz szukany kąt.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Kąt wpisany $ACB$ oparty na łuku $AB$ ma miarę $38^\\circ$. Kąt środkowy $AOB$ oparty na tym samym łuku ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$19^\\circ$", "$38^\\circ$", "$76^\\circ$", "$142^\\circ$"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "Punkty $A$, $B$, $C$ leżą na okręgu o środku $O$, przy czym $C$ leży na większym łuku $AB$ i $\\angle AOB=140^\\circ$. Kąt $ACB$ ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$140^\\circ$", "$70^\\circ$", "$280^\\circ$", "$110^\\circ$"],
          poprawna: 1,
        },
        {
          nr: "17",
          tresc: "Odcinek $AB$ jest średnicą okręgu, punkt $C$ leży na okręgu i $\\angle CAB=28^\\circ$. Kąt $ABC$ ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$152^\\circ$", "$56^\\circ$", "$28^\\circ$", "$62^\\circ$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "Czworokąt $ABCD$ jest wpisany w okrąg, $\\angle A=70^\\circ$ i $\\angle B=95^\\circ$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\angle C=110^\\circ$", litery: "PF", poprawna: 0 },
            { tekst: "$\\angle D=95^\\circ$", litery: "PF", poprawna: 1 },
            { tekst: "$\\angle A+\\angle B=180^\\circ$", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "19",
          tresc: "Prosta $k$ jest styczna do okręgu o środku $O$ w punkcie $A$. Cięciwa $AB$ tworzy z prostą $k$ kąt ostry $50^\\circ$. Kąt środkowy $AOB$ ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$100^\\circ$", "$50^\\circ$", "$25^\\circ$", "$130^\\circ$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Czworokąt $ABCD$ jest wpisany w okrąg. Wiadomo, że $\\angle A=(2x+20)^\\circ$, $\\angle C=(3x+10)^\\circ$ i $\\angle B=105^\\circ$. Oblicz miary wszystkich kątów tego czworokąta. **Zapisz obliczenia.**",
          rozwiazanie: "W czworokącie wpisanym w okrąg kąty przeciwległe sumują się do $180^\\circ$, więc $\\angle A + \\angle C = 180^\\circ$.\n\n$(2x+20) + (3x+10) = 180$, czyli $5x + 30 = 180$, stąd $x = 30$.\n\n$\\angle A = 2\\cdot 30 + 20 = 80^\\circ$ oraz $\\angle C = 3\\cdot 30 + 10 = 100^\\circ$.\n\n$\\angle D = 180^\\circ - \\angle B = 180^\\circ - 105^\\circ = 75^\\circ$.\n\nOdpowiedź: $\\angle A=80^\\circ$, $\\angle B=105^\\circ$, $\\angle C=100^\\circ$, $\\angle D=75^\\circ$.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Trójkąt $ABC$ jest wpisany w okrąg o środku $O$, a środek $O$ leży wewnątrz trójkąta. Kąty trójkąta mają miary $\\angle C=50^\\circ$ i $\\angle B=70^\\circ$. Oblicz miary kątów $AOB$, $BOC$ i $COA$. **Zapisz obliczenia.**",
          rozwiazanie: "Trzeci kąt trójkąta: $\\angle A = 180^\\circ - 50^\\circ - 70^\\circ = 60^\\circ$.\n\nKąt $AOB$ jest środkowym kątem opartym na tym samym łuku co kąt wpisany $C$, więc $\\angle AOB = 2\\cdot 50^\\circ = 100^\\circ$.\n\nKąt $BOC$ jest oparty na tym samym łuku co kąt $A$: $\\angle BOC = 2\\cdot 60^\\circ = 120^\\circ$.\n\nKąt $COA$ jest oparty na tym samym łuku co kąt $B$: $\\angle COA = 2\\cdot 70^\\circ = 140^\\circ$.\n\nSprawdzenie: $100^\\circ + 120^\\circ + 140^\\circ = 360^\\circ$.\n\nOdpowiedź: $\\angle AOB=100^\\circ$, $\\angle BOC=120^\\circ$, $\\angle COA=140^\\circ$.",
        },
      ],
      generatory: [
        {
          id: "katy-w-okregu",
          nazwa: "Kąty w okręgu",
          opis: "Kąt środkowy i wpisany, kąty oparte na średnicy, kąt między styczną a cięciwą – oblicz szukany kąt.",
          generuj(r) {
            const v = r.int(0, 4);
            if (v === 0) {
              const a = r.int(15, 85);
              return {
                tresc: `Punkty $A$, $B$, $C$ leżą na okręgu o środku $O$, a punkt $C$ leży na większym łuku $AB$. Kąt wpisany $ACB$ ma miarę $${st(a)}$. Oblicz miarę kąta środkowego $AOB$ (w stopniach).`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$\\angle AOB$ (w stopniach)" }],
                odpowiedz: { w: q(2 * a) },
                wynik: `$${st(2 * a)}$`,
                rozwiazanie: [
                  "Kąt wpisany $ACB$ i kąt środkowy $AOB$ są oparte na tym samym łuku $AB$.",
                  `Kąt środkowy jest dwa razy większy: $\\angle AOB = 2\\cdot ${st(a)} = ${st(2 * a)}$.`,
                ],
              };
            }
            if (v === 1) {
              const b = 2 * r.int(20, 80);
              return {
                tresc: `Punkty $A$, $B$, $C$ leżą na okręgu o środku $O$, a punkt $C$ leży na większym łuku $AB$. Kąt środkowy $AOB$ ma miarę $${st(b)}$. Oblicz miarę kąta wpisanego $ACB$ (w stopniach).`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$\\angle ACB$ (w stopniach)" }],
                odpowiedz: { w: q(b / 2) },
                wynik: `$${st(b / 2)}$`,
                rozwiazanie: [
                  "Kąt wpisany $ACB$ i kąt środkowy $AOB$ są oparte na tym samym łuku $AB$.",
                  `Kąt wpisany jest dwa razy mniejszy: $\\angle ACB = ${st(b)}:2 = ${st(b / 2)}$.`,
                ],
              };
            }
            if (v === 2) {
              const a = r.int(35, 145);
              return {
                tresc: `Punkty $A$, $B$, $C$, $D$ leżą na okręgu, przy czym $C$ i $D$ leżą po przeciwnych stronach cięciwy $AB$. Kąt $ACB$ ma miarę $${st(a)}$. Oblicz miarę kąta $ADB$ (w stopniach).`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$\\angle ADB$ (w stopniach)" }],
                odpowiedz: { w: q(180 - a) },
                wynik: `$${st(180 - a)}$`,
                rozwiazanie: [
                  "Czworokąt $ACBD$ jest wpisany w okrąg, a kąty $ACB$ i $ADB$ są jego kątami przeciwległymi.",
                  `Kąty przeciwległe sumują się do $180^\\circ$: $\\angle ADB = 180^\\circ - ${st(a)} = ${st(180 - a)}$.`,
                ],
              };
            }
            if (v === 3) {
              const a = r.int(15, 75);
              return {
                tresc: `Odcinek $AB$ jest średnicą okręgu, a punkt $C$ leży na tym okręgu i jest różny od $A$ i $B$. Kąt $CAB$ ma miarę $${st(a)}$. Oblicz miarę kąta $ABC$ (w stopniach).`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$\\angle ABC$ (w stopniach)" }],
                odpowiedz: { w: q(90 - a) },
                wynik: `$${st(90 - a)}$`,
                rozwiazanie: [
                  "Kąt wpisany $ACB$ jest oparty na średnicy, więc $\\angle ACB = 90^\\circ$.",
                  `Suma kątów trójkąta: $\\angle ABC = 180^\\circ - 90^\\circ - ${st(a)} = ${st(90 - a)}$.`,
                ],
              };
            }
            const f = r.int(15, 85);
            return {
              tresc: `Prosta $k$ jest styczna do okręgu o środku $O$ w punkcie $A$, a punkt $B$ leży na okręgu. Kąt ostry między prostą $k$ a cięciwą $AB$ ma miarę $${st(f)}$. Oblicz miarę kąta środkowego $AOB$ (w stopniach).`,
              pola: [{ id: "w", typ: "liczba", etykieta: "$\\angle AOB$ (w stopniach)" }],
              odpowiedz: { w: q(2 * f) },
              wynik: `$${st(2 * f)}$`,
              rozwiazanie: [
                `Kąt między styczną a cięciwą jest równy kątowi wpisanemu opartemu na łuku $AB$, czyli ma $${st(f)}$.`,
                `Kąt środkowy oparty na tym samym łuku jest dwa razy większy: $\\angle AOB = 2\\cdot ${st(f)} = ${st(2 * f)}$.`,
              ],
            };
          },
        },
        {
          id: "katy-czworokat-wpisany",
          nazwa: "Czworokąt wpisany",
          opis: "Czworokąt wpisany w okrąg: oblicz kąt przeciwległy albo wyznacz $x$ z równania.",
          generuj(r) {
            if (r.chance(0.5)) {
              const A = r.int(50, 130), B = r.int(50, 130);
              const szukany = r.chance() ? "C" : "D";
              const wynik = szukany === "C" ? 180 - A : 180 - B;
              const [dane, drugi] = szukany === "C" ? ["A", A] : ["B", B];
              return {
                tresc: `Czworokąt $ABCD$ jest wpisany w okrąg. Kąty $A$ i $B$ mają miary $${st(A)}$ i $${st(B)}$. Oblicz miarę kąta $${szukany}$ (w stopniach).`,
                pola: [{ id: "w", typ: "liczba", etykieta: `$\\angle ${szukany}$ (w stopniach)` }],
                odpowiedz: { w: q(wynik) },
                wynik: `$${st(wynik)}$`,
                rozwiazanie: [
                  `Kąt $${szukany}$ jest przeciwległy do kąta $${dane}$, a w czworokącie wpisanym w okrąg kąty przeciwległe sumują się do $180^\\circ$.`,
                  `$\\angle ${szukany} = 180^\\circ - ${st(drugi)} = ${st(wynik)}$.`,
                ],
              };
            }
            for (;;) {
              const x = r.int(10, 40), p = r.int(1, 3), s = r.int(1, 3);
              const A = r.int(50, 130);
              const m = A - p * x, n = 180 - A - s * x;
              if (m < 5 || m > 40 || n < 5 || n > 40) continue;
              return {
                tresc: `Czworokąt $ABCD$ jest wpisany w okrąg, $\\angle A = (${wsp(p)}x + ${m})^\\circ$ i $\\angle C = (${wsp(s)}x + ${n})^\\circ$. Oblicz $x$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$x =$" }],
                odpowiedz: { w: q(x) },
                wynik: `$x = ${x}$`,
                rozwiazanie: [
                  "Kąty $A$ i $C$ są przeciwległe, więc $\\angle A + \\angle C = 180^\\circ$.",
                  `$(${wsp(p)}x + ${m}) + (${wsp(s)}x + ${n}) = 180$, czyli $${p + s}x + ${m + n} = 180$.`,
                  `Stąd $${p + s}x = ${180 - m - n}$ i $x = ${x}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4.5
    {
      id: "styczna-sieczna",
      nazwa: "Twierdzenie o stycznej i siecznej",
      sciaga: [
        {
          nazwa: "Odcinki stycznych z punktu",
          slownie: "Dwie styczne poprowadzone do okręgu z punktu $P$ leżącego na zewnątrz mają równe odcinki od $P$ do punktów styczności. Długość każdego z nich liczymy z trójkąta prostokątnego.",
          tex: "|PA|=|PB|=\\sqrt{|PO|^2-r^2}",
          litery: "$A$, $B$ – punkty styczności, $O$ – środek okręgu, $r$ – promień.",
          przyklad: "Dla $r=5$ i $|PO|=13$ mamy $|PA|=\\sqrt{13^2-5^2}=12$.",
          uwaga: "Kąt prosty jest przy $A$, więc $PO$ jest przeciwprostokątną i pod pierwiastkiem odejmujemy.",
        },
        {
          nazwa: "Styczna i sieczna",
          slownie: "Z punktu $P$ poza okręgiem poprowadzono styczną w punkcie $A$ i sieczną przecinającą okrąg w $B$ i $C$ (punkt $B$ jest bliżej $P$). Kwadrat odcinka stycznej jest równy iloczynowi odcinków siecznej od $P$ do obu punktów przecięcia.",
          tex: "|PA|^2=|PB|\\cdot|PC|",
          litery: "$|PB|$ – odcinek od $P$ do bliższego punktu przecięcia, $|PC|$ – do dalszego.",
          przyklad: "Dla $|PB|=4$ i $|PC|=9$ mamy $|PA|^2=36$, czyli $|PA|=6$. Cięciwa $|BC|=9-4=5$.",
          uwaga: "W iloczynie bierzemy odcinek $PC$ do dalszego punktu, a nie samą cięciwę $BC$.",
        },
        {
          nazwa: "Dwie sieczne",
          slownie: "Dwie sieczne poprowadzone z punktu $P$ przecinają okrąg w punktach $A$, $B$ oraz $C$, $D$ (punkty $A$ i $C$ są bliżej $P$). Iloczyny odcinków od $P$ do punktów przecięcia na obu siecznych są równe.",
          tex: "|PA|\\cdot|PB|=|PC|\\cdot|PD|",
          litery: "$|PA|$, $|PC|$ – odcinki do bliższych punktów, $|PB|$, $|PD|$ – do dalszych.",
          przyklad: "Dla $|PA|=2$ i $|PB|=9$ iloczyn to $18$. Przy $|PC|=3$ mamy $|PD|=18:3=6$.",
        },
      ],
      jak: [
        "Rozpoznaj, co jest dane: styczna, sieczna czy dwie sieczne, i oznacz odcinki od punktu $P$.",
        "Zapisz odpowiedni wzór: $|PA|^2=|PB|\\cdot|PC|$ albo iloczyny odcinków dwóch siecznych.",
        "Podstaw dane i wyznacz szukany odcinek (przy kwadracie pamiętaj o pierwiastku).",
        "Jeśli pytają o cięciwę, odejmij: $|BC|=|PC|-|PB|$.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Z punktu $P$ odległego o $10$ od środka okręgu o promieniu $6$ poprowadzono styczną do okręgu w punkcie $A$. Długość odcinka $PA$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$16$", "$4$", "$8$", "$\\sqrt{136}$"],
          poprawna: 2,
        },
        {
          nr: "23",
          tresc: "Z punktu $P$ poprowadzono styczną do okręgu w punkcie $A$ oraz sieczną przecinającą okrąg w punktach $B$ i $C$, przy czym $|PB|=3$ i $|PC|=12$. Długość odcinka $PA$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$4{,}5$", "$6$", "$9$", "$7{,}5$"],
          poprawna: 1,
        },
        {
          nr: "24",
          tresc: "Z punktu $P$ poprowadzono styczną $PA$ o długości $10$ oraz sieczną przecinającą okrąg w punktach $B$ i $C$, przy czym $|PB|=4$. Długość cięciwy $BC$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$25$", "$2{,}5$", "$21$"],
          poprawna: 3,
        },
        {
          nr: "25",
          tresc: "Z punktu $P$ poprowadzono dwie styczne do okręgu o środku $O$ i promieniu $3$ w punktach $A$ i $B$. Wiadomo, że $|PO|=5$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$|PA|=5$", litery: "PF", poprawna: 1 },
            { tekst: "Trójkąt $OAP$ ma boki $3$, $4$, $5$.", litery: "PF", poprawna: 0 },
            { tekst: "$|PB|=|PA|$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "26",
          tresc: "Z punktu $P$ poprowadzono dwie sieczne okręgu. Pierwsza przecina okrąg w punktach $A$ i $B$, gdzie $|PA|=4$ i $|PB|=10$. Druga przecina okrąg w punktach $C$ i $D$, gdzie $|PC|=5$. Długość odcinka $PD$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$", "$3$", "$12{,}5$", "$14$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 3,
          tresc: "Z punktu $P$ poprowadzono styczną do okręgu w punkcie $A$, gdzie $|PA|=12$, oraz sieczną przecinającą okrąg w punktach $B$ i $C$. Cięciwa $BC$ ma długość $7$. Oblicz $|PB|$. **Zapisz obliczenia.**",
          rozwiazanie: "Niech $|PB| = x$. Wtedy $|PC| = x + 7$.\n\nZ twierdzenia o stycznej i siecznej: $|PA|^2 = |PB|\\cdot|PC|$, czyli $144 = x(x+7)$.\n\nStąd $x^2 + 7x - 144 = 0$, $\\Delta = 49 + 576 = 625$, $\\sqrt{\\Delta} = 25$.\n\n$x = \\frac{-7 - 25}{2} = -16$ (odpada, długość jest dodatnia) lub $x = \\frac{-7 + 25}{2} = 9$.\n\nSprawdzenie: $9\\cdot 16 = 144$.\n\nOdpowiedź: $|PB| = 9$.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "Punkt $P$ leży w odległości $13$ od środka $O$ okręgu o promieniu $5$. Z punktu $P$ poprowadzono styczną $PA$ i sieczną przechodzącą przez środek $O$, która przecina okrąg w punktach $B$ i $C$. Oblicz $|PA|$ z twierdzenia o stycznej i siecznej i sprawdź wynik twierdzeniem Pitagorasa. **Zapisz obliczenia.**",
          rozwiazanie: "Sieczna przechodzi przez środek, więc $|PB| = 13 - 5 = 8$ i $|PC| = 13 + 5 = 18$.\n\n$|PA|^2 = |PB|\\cdot|PC| = 8\\cdot 18 = 144$, stąd $|PA| = 12$.\n\nSprawdzenie: trójkąt $OAP$ jest prostokątny z kątem prostym przy $A$, więc $|PA| = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12$.\n\nOdpowiedź: $|PA| = 12$.",
        },
      ],
      generatory: [
        {
          id: "styczna-sieczna-odcinki",
          nazwa: "Styczna i sieczna",
          opis: "Oblicz odcinek stycznej, siecznej albo cięciwy (lub odcinek drugiej siecznej) z twierdzenia o stycznej i siecznej.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 3) {
              const N = r.pick([24, 30, 36, 40, 48, 60, 72]);
              const [[a, b], [c, d]] = r.shuffle(pary(N)).slice(0, 2);
              const dane = { PA: a, PB: b, PC: c, PD: d };
              const szukany = r.pick(["PA", "PB", "PC", "PD"]);
              const podane = ["PA", "PB", "PC", "PD"].filter((n) => n !== szukany);
              const para = (s) => (s === "PA" || s === "PB" ? ["PA", "PB"] : ["PC", "PD"]);
              const wlasna = para(szukany), inna = wlasna[0] === "PA" ? ["PC", "PD"] : ["PA", "PB"];
              const drugi = wlasna.find((s) => s !== szukany);
              return {
                tresc: `Z punktu $P$ poprowadzono dwie sieczne okręgu. Pierwsza przecina okrąg w punktach $A$ i $B$ (punkt $A$ jest bliżej $P$), a druga w punktach $C$ i $D$ (punkt $C$ jest bliżej $P$). Wiadomo, że ${podane.map((n) => `$|${n}| = ${dane[n]}$`).join(", ")}. Oblicz $|${szukany}|$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `$|${szukany}| =$` }],
                odpowiedz: { w: q(dane[szukany]) },
                wynik: `$|${szukany}| = ${dane[szukany]}$`,
                rozwiazanie: [
                  "Iloczyny odcinków od punktu $P$ na obu siecznych są równe: $|PA|\\cdot|PB| = |PC|\\cdot|PD|$.",
                  `Iloczyn dla znanej siecznej: $|${inna[0]}|\\cdot|${inna[1]}| = ${dane[inna[0]]}\\cdot ${dane[inna[1]]} = ${N}$.`,
                  `Stąd $|${szukany}| = ${N}:${dane[drugi]} = ${dane[szukany]}$.`,
                ],
              };
            }
            const t = r.pick([4, 6, 8, 9, 10, 12]);
            const m = r.pick(Array.from({ length: t - 2 }, (_, i) => i + 2).filter((x) => (t * t) % x === 0));
            const n = (t * t) / m;
            if (tryb === 0) {
              return {
                tresc: `Z punktu $P$ poprowadzono styczną do okręgu w punkcie $A$ oraz sieczną przecinającą okrąg w punktach $B$ i $C$ (punkt $B$ jest bliżej $P$). Wiadomo, że $|PB| = ${m}$ i $|PC| = ${n}$. Oblicz $|PA|$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$|PA| =$" }],
                odpowiedz: { w: q(t) },
                wynik: `$|PA| = ${t}$`,
                rozwiazanie: [
                  "Z twierdzenia o stycznej i siecznej: $|PA|^2 = |PB|\\cdot|PC|$.",
                  `$|PA|^2 = ${m}\\cdot ${n} = ${t * t}$.`,
                  `Odcinek jest dodatni, więc $|PA| = ${t}$.`,
                ],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Z punktu $P$ poprowadzono styczną do okręgu w punkcie $A$ oraz sieczną przecinającą okrąg w punktach $B$ i $C$ (punkt $B$ jest bliżej $P$). Wiadomo, że $|PA| = ${t}$ i $|PB| = ${m}$. Oblicz $|PC|$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$|PC| =$" }],
                odpowiedz: { w: q(n) },
                wynik: `$|PC| = ${n}$`,
                rozwiazanie: [
                  "Z twierdzenia o stycznej i siecznej: $|PA|^2 = |PB|\\cdot|PC|$.",
                  `$${t}^2 = ${m}\\cdot |PC|$, czyli $${t * t} = ${m}\\cdot |PC|$.`,
                  `Stąd $|PC| = ${t * t}:${m} = ${n}$.`,
                ],
              };
            }
            return {
              tresc: `Z punktu $P$ poprowadzono styczną do okręgu w punkcie $A$ oraz sieczną przecinającą okrąg w punktach $B$ i $C$ (punkt $B$ jest bliżej $P$). Wiadomo, że $|PA| = ${t}$ i $|PB| = ${m}$. Oblicz długość cięciwy $BC$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "$|BC| =$" }],
              odpowiedz: { w: q(n - m) },
              wynik: `$|BC| = ${n - m}$`,
              rozwiazanie: [
                `Z twierdzenia o stycznej i siecznej: $|PA|^2 = |PB|\\cdot|PC|$, czyli $${t * t} = ${m}\\cdot |PC|$.`,
                `Stąd $|PC| = ${t * t}:${m} = ${n}$.`,
                `Cięciwa to różnica odcinków: $|BC| = |PC| - |PB| = ${n} - ${m} = ${n - m}$.`,
              ],
            };
          },
        },
        {
          id: "styczna-odcinek",
          nazwa: "Odcinek stycznej",
          opis: "Z punktu poza okręgiem poprowadzono styczną – oblicz jej odcinek, promień albo odległość od środka.",
          generuj(r) {
            const [a0, b0, c0] = r.pick(TROJKI);
            const k = r.int(1, 2);
            const [x, y] = r.chance() ? [a0, b0] : [b0, a0];
            const R = x * k, t = y * k, PO = c0 * k;
            const tryb = r.int(0, 2);
            const wstep = "Promień $OA$ poprowadzony do punktu styczności jest prostopadły do stycznej, więc trójkąt $OAP$ jest prostokątny z kątem prostym przy $A$.";
            if (tryb === 0) {
              return {
                tresc: `Z punktu $P$ poprowadzono styczną do okręgu o środku $O$ i promieniu $${R}$ w punkcie $A$. Wiadomo, że $|PO| = ${PO}$. Oblicz $|PA|$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$|PA| =$" }],
                odpowiedz: { w: q(t) },
                wynik: `$|PA| = ${t}$`,
                rozwiazanie: [wstep, `$|PA| = \\sqrt{|PO|^2 - r^2} = \\sqrt{${PO}^2 - ${R}^2} = \\sqrt{${PO * PO - R * R}}$.`, `Stąd $|PA| = ${t}$.`],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Z punktu $P$ poprowadzono styczną do okręgu o środku $O$ w punkcie $A$. Wiadomo, że $|PA| = ${t}$ i $|PO| = ${PO}$. Oblicz promień okręgu.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$r =$" }],
                odpowiedz: { w: q(R) },
                wynik: `$r = ${R}$`,
                rozwiazanie: [wstep, `$r = |OA| = \\sqrt{|PO|^2 - |PA|^2} = \\sqrt{${PO}^2 - ${t}^2} = \\sqrt{${PO * PO - t * t}}$.`, `Stąd $r = ${R}$.`],
              };
            }
            return {
              tresc: `Okrąg o środku $O$ ma promień $${R}$. Z punktu $P$ poprowadzono do niego styczną w punkcie $A$ i $|PA| = ${t}$. Oblicz odległość $|PO|$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "$|PO| =$" }],
              odpowiedz: { w: q(PO) },
              wynik: `$|PO| = ${PO}$`,
              rozwiazanie: [wstep, `$|PO| = \\sqrt{|PA|^2 + r^2} = \\sqrt{${t}^2 + ${R}^2} = \\sqrt{${t * t + R * R}}$.`, `Stąd $|PO| = ${PO}$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4.6, 4.7
    {
      id: "okrag-opisany",
      nazwa: "Okrąg opisany na trójkącie",
      sciaga: [
        {
          nazwa: "Symetralna odcinka",
          slownie: "Symetralna odcinka to prosta prostopadła do niego, przechodząca przez jego środek. Każdy jej punkt jest jednakowo oddalony od końców odcinka. Konstrukcja: cyrklem rysujemy z obu końców łuki o tym samym promieniu, większym od połowy odcinka, i łączymy punkty przecięcia.",
          tex: "|PA|=|PB|",
          litery: "$A$, $B$ – końce odcinka, $P$ – dowolny punkt symetralnej.",
          przyklad: "Dla odcinka $AB$ o długości $8$ symetralna przechodzi przez punkt oddalony o $4$ od $A$ i od $B$.",
        },
        {
          nazwa: "Okrąg opisany na trójkącie",
          slownie: "Okrąg opisany przechodzi przez wszystkie trzy wierzchołki trójkąta. Można go opisać na każdym trójkącie, a jego środek jest punktem przecięcia symetralnych boków.",
          tex: "|OA|=|OB|=|OC|=R",
          litery: "$O$ – środek okręgu opisanego, $R$ – jego promień.",
          przyklad: "Środek leży na przecięciu symetralnych boków $AB$ i $BC$, więc jest jednakowo oddalony od $A$, $B$ i $C$.",
          uwaga: "Wystarczą dwie symetralne – trzecia przechodzi przez ten sam punkt.",
        },
        {
          nazwa: "Trójkąt prostokątny",
          slownie: "Środek okręgu opisanego na trójkącie prostokątnym jest środkiem przeciwprostokątnej, a promień jest równy jej połowie. W trójkącie ostrokątnym środek leży wewnątrz trójkąta, a w rozwartokątnym – na zewnątrz.",
          tex: "R=\\frac{c}{2}",
          litery: "$c$ – przeciwprostokątna.",
          przyklad: "Dla przyprostokątnych $6$ i $8$ przeciwprostokątna to $10$, więc $R=5$.",
          uwaga: "Wzór $R=\\frac{c}{2}$ dotyczy tylko trójkąta prostokątnego.",
        },
        {
          nazwa: "Trójkąt równoboczny",
          slownie: "W trójkącie równobocznym środek okręgu opisanego leży w punkcie przecięcia wysokości i dzieli każdą z nich w stosunku $2:1$ licząc od wierzchołka.",
          tex: "R=\\frac{2}{3}h\\qquad h=\\frac{a\\sqrt{3}}{2}",
          litery: "$a$ – bok, $h$ – wysokość trójkąta równobocznego.",
          przyklad: "Dla $h=9$ mamy $R=\\frac{2}{3}\\cdot 9=6$. Dla $a=6$ mamy $h=3\\sqrt{3}$ i $R=2\\sqrt{3}$.",
        },
        {
          nazwa: "Trójkąt równoramienny",
          slownie: "Środek okręgu leży na wysokości poprowadzonej do podstawy. Oznacz odległość od wierzchołka do środka przez $R$ – odległość środka od podstawy to $h-R$ i z twierdzenia Pitagorasa dostajemy równanie.",
          tex: "(h-R)^2+\\left(\\frac{a}{2}\\right)^2=R^2",
          litery: "$a$ – podstawa, $h$ – wysokość opuszczona na podstawę, $R$ – promień okręgu opisanego.",
          przyklad: "Dla $a=6$ i $h=9$: $(9-R)^2+9=R^2$, czyli $90=18R$ i $R=5$.",
          uwaga: "Po uproszczeniu znikają kwadraty $R^2$ i zostaje równanie liniowe: $R=\\frac{h^2+(a/2)^2}{2h}$.",
        },
      ],
      jak: [
        "Rozpoznaj typ trójkąta: prostokątny, równoboczny albo równoramienny.",
        "Dla prostokątnego oblicz przeciwprostokątną i weź jej połowę.",
        "Dla równobocznego znajdź wysokość i weź $\\frac{2}{3}$ jej długości.",
        "Dla równoramiennego zapisz równanie z twierdzenia Pitagorasa dla trójkąta z promieniem jako przeciwprostokątną.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Na trójkącie prostokątnym o przyprostokątnych długości $9$ i $12$ opisano okrąg. Promień tego okręgu jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$15$", "$7{,}5$", "$6$", "$10{,}5$"],
          poprawna: 1,
        },
        {
          nr: "30",
          tresc: "Środek okręgu opisanego na trójkącie jest punktem przecięcia. **Wybierz właściwą odpowiedź.**",
          opcje: ["dwusiecznych kątów trójkąta", "wysokości trójkąta", "symetralnych boków trójkąta", "środkowych trójkąta"],
          poprawna: 2,
        },
        {
          nr: "31",
          tresc: "Wysokość trójkąta równobocznego ma długość $12$. Promień okręgu opisanego na tym trójkącie jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$6$", "$12$", "$8$"],
          poprawna: 3,
        },
        {
          nr: "32",
          tresc: "Trójkąt $ABC$ ma boki długości $5$, $12$ i $13$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Środek okręgu opisanego na tym trójkącie jest środkiem boku o długości $13$.", litery: "PF", poprawna: 0 },
            { tekst: "Promień okręgu opisanego na tym trójkącie jest równy $6$.", litery: "PF", poprawna: 1 },
            { tekst: "Środek okręgu opisanego leży wewnątrz trójkąta.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "33",
          tresc: "Trójkąt równoramienny ma podstawę długości $12$ i wysokość opuszczoną na podstawę równą $9$. Promień okręgu opisanego na tym trójkącie jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$6{,}5$", "$7{,}5$", "$9$", "$7$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 3,
          tresc: "W trójkącie prostokątnym $ABC$ kąt prosty jest przy wierzchołku $C$, a $|AC|=20$ i $|AB|=29$. Oblicz promień okręgu opisanego na tym trójkącie oraz odległość środka tego okręgu od przyprostokątnej $BC$. **Zapisz obliczenia.**",
          rozwiazanie: "Środek okręgu opisanego na trójkącie prostokątnym jest środkiem przeciwprostokątnej, więc $R = \\frac{|AB|}{2} = \\frac{29}{2} = 14{,}5$.\n\nZ twierdzenia Pitagorasa: $|BC|^2 = 29^2 - 20^2 = 841 - 400 = 441$, więc $|BC| = 21$.\n\nŚrodek $O$ leży w środku $AB$. Odcinek z $O$ prostopadły do $BC$ jest równoległy do $AC$ i łączy środki boków $AB$ i $BC$ – jest więc linią środkową trójkąta.\n\nJego długość to połowa $|AC|$: $\\frac{20}{2} = 10$.\n\nOdpowiedź: $R = 14{,}5$, a odległość środka okręgu od $BC$ jest równa $10$.",
        },
        {
          nr: "35",
          punkty: 3,
          tresc: "Trójkąt równoramienny $ABC$ ma podstawę $AB$ długości $12$ i ramiona $|AC|=|BC|=10$. Oblicz promień okręgu opisanego na tym trójkącie. **Zapisz obliczenia.**",
          rozwiazanie: "Wysokość $CD$ opuszczona na podstawę dzieli ją na połowy po $6$. Z twierdzenia Pitagorasa: $h = \\sqrt{10^2 - 6^2} = \\sqrt{64} = 8$.\n\nŚrodek $O$ okręgu opisanego leży na wysokości $CD$. Niech $|OC| = R$. Wtedy $|OD| = 8 - R$.\n\nW trójkącie prostokątnym $OAD$ mamy $|OA| = R$, $|AD| = 6$ i $|OD| = 8 - R$, więc $(8-R)^2 + 6^2 = R^2$.\n\n$64 - 16R + R^2 + 36 = R^2$, czyli $100 = 16R$ i $R = \\frac{100}{16} = \\frac{25}{4}$.\n\nOdpowiedź: $R = \\frac{25}{4} = 6{,}25$.",
        },
      ],
      generatory: [
        {
          id: "opisany-prostokatny",
          nazwa: "Okrąg na trójkącie prostokątnym",
          opis: "Trójkąt prostokątny: oblicz promień okręgu opisanego albo drugą przyprostokątną.",
          generuj(r) {
            const [a0, b0, c0] = r.pick(TROJKI);
            const k = r.int(1, 2);
            const [a, b] = r.chance() ? [a0 * k, b0 * k] : [b0 * k, a0 * k];
            const c = c0 * k;
            const tryb = r.int(0, 2);
            const wstep = "Środek okręgu opisanego na trójkącie prostokątnym jest środkiem przeciwprostokątnej, więc $R = \\frac{c}{2}$.";
            if (tryb === 0) {
              return {
                tresc: `Przyprostokątne trójkąta prostokątnego mają długości $${a}$ i $${b}$. Oblicz promień okręgu opisanego na tym trójkącie.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$R =$" }],
                odpowiedz: { w: q(c, 2) },
                wynik: `$R = ${q(c, 2).tex()}$`,
                rozwiazanie: [`Przeciwprostokątna: $c = \\sqrt{${a}^2 + ${b}^2} = ${c}$.`, wstep, `$R = ${c}:2 = ${q(c, 2).tex()}$.`],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `W trójkącie prostokątnym jedna z przyprostokątnych ma długość $${a}$, a przeciwprostokątna $${c}$. Oblicz promień okręgu opisanego na tym trójkącie.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$R =$" }],
                odpowiedz: { w: q(c, 2) },
                wynik: `$R = ${q(c, 2).tex()}$`,
                rozwiazanie: [wstep, `$R = ${c}:2 = ${q(c, 2).tex()}$.`],
              };
            }
            return {
              tresc: `Okrąg opisany na trójkącie prostokątnym ma promień $${q(c, 2).tex()}$, a jedna z przyprostokątnych tego trójkąta ma długość $${a}$. Oblicz długość drugiej przyprostokątnej.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Druga przyprostokątna" }],
              odpowiedz: { w: q(b) },
              wynik: `$${b}$`,
              rozwiazanie: [
                `Promień to połowa przeciwprostokątnej, więc $c = 2R = ${c}$.`,
                `Z twierdzenia Pitagorasa: $b = \\sqrt{c^2 - a^2} = \\sqrt{${c}^2 - ${a}^2} = \\sqrt{${c * c - a * a}}$.`,
                `Stąd $b = ${b}$.`,
              ],
            };
          },
        },
        {
          id: "opisany-rownoramienny",
          nazwa: "Okrąg na trójkącie równoramiennym",
          opis: "Trójkąt równoboczny albo równoramienny: oblicz promień okręgu opisanego.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const k = r.int(2, 6);
              return {
                tresc: `Wysokość trójkąta równobocznego ma długość $${3 * k}$. Oblicz promień okręgu opisanego na tym trójkącie.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$R =$" }],
                odpowiedz: { w: q(2 * k) },
                wynik: `$R = ${2 * k}$`,
                rozwiazanie: [
                  "Środek okręgu opisanego leży w punkcie przecięcia wysokości i dzieli je w stosunku $2:1$ od wierzchołka.",
                  `$R = \\frac{2}{3}h = \\frac{2}{3}\\cdot ${3 * k} = ${2 * k}$.`,
                ],
              };
            }
            for (;;) {
              let b, h, ramie = null;
              if (tryb === 1) {
                b = r.int(3, 12);
                h = r.int(3, 12);
              } else {
                [b, h, ramie] = r.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [8, 6, 10], [9, 12, 15], [8, 15, 17], [12, 9, 15]]);
              }
              const R = q(h * h + b * b, 2 * h);
              if (!ladna(R)) continue;
              const podstawa = 2 * b;
              const dane = tryb === 1
                ? `Podstawa trójkąta równoramiennego ma długość $${podstawa}$, a wysokość opuszczona na podstawę ma długość $${h}$.`
                : `Trójkąt równoramienny ma podstawę długości $${podstawa}$ i ramiona długości $${ramie}$.`;
              const rozwiazanie = [];
              if (tryb === 2) rozwiazanie.push(`Wysokość opuszczona na podstawę: $h = \\sqrt{${ramie}^2 - ${b}^2} = ${h}$.`);
              rozwiazanie.push(
                `Środek okręgu leży na wysokości. Dla $|OC| = R$ mamy $(${h} - R)^2 + ${b}^2 = R^2$.`,
                `$${h * h} - ${2 * h}R + ${b * b} = 0$, czyli $${2 * h}R = ${h * h + b * b}$.`,
                `$R = ${R.tex()}$.`,
              );
              return {
                tresc: `${dane} Oblicz promień okręgu opisanego na tym trójkącie.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$R =$" }],
                odpowiedz: { w: R },
                wynik: `$R = ${R.tex()}$`,
                rozwiazanie,
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4.8
    {
      id: "okrag-wpisany",
      nazwa: "Okrąg wpisany w trójkąt",
      sciaga: [
        {
          nazwa: "Dwusieczna kąta",
          slownie: "Dwusieczna kąta to półprosta dzieląca kąt na dwa równe kąty. Każdy jej punkt jest jednakowo oddalony od ramion kąta. Konstrukcja: łuk o środku w wierzchołku wyznacza punkty na ramionach, z nich rysujemy łuki o tym samym promieniu i prowadzimy półprostą przez punkt ich przecięcia.",
          tex: "\\angle BAD=\\angle DAC",
          litery: "$AD$ – dwusieczna kąta $BAC$.",
          przyklad: "Dla kąta $70^\\circ$ każdy z kątów utworzonych przez dwusieczną ma $35^\\circ$.",
        },
        {
          nazwa: "Okrąg wpisany w trójkąt",
          slownie: "Okrąg wpisany jest styczny do wszystkich trzech boków trójkąta. Można go wpisać w każdy trójkąt, a jego środek jest punktem przecięcia dwusiecznych kątów. Promień $r$ jest prostopadły do boku w punkcie styczności. Z pola trójkąta wynika wzór.",
          tex: "r=\\frac{P}{p}\\qquad p=\\frac{a+b+c}{2}",
          litery: "$P$ – pole trójkąta, $p$ – połowa obwodu, $a$, $b$, $c$ – boki. (Pole to suma pól trzech trójkątów o wysokości $r$: $P=pr$.)",
          przyklad: "Dla trójkąta o bokach $13$, $14$, $15$ i polu $84$: $p=21$ i $r=\\frac{84}{21}=4$.",
          uwaga: "W mianowniku jest połowa obwodu $p$, a nie cały obwód.",
        },
        {
          nazwa: "Trójkąt prostokątny i równoboczny",
          slownie: "W trójkącie prostokątnym promień okręgu wpisanego liczymy z długości boków. W równobocznym środek okręgu wpisanego jest też środkiem opisanego, a promień jest trzecią częścią wysokości.",
          tex: "r=\\frac{a+b-c}{2}\\qquad r=\\frac{1}{3}h",
          litery: "Pierwszy wzór: $a$, $b$ – przyprostokątne, $c$ – przeciwprostokątna. Drugi: $h$ – wysokość trójkąta równobocznego.",
          przyklad: "Dla boków $5$, $12$, $13$: $r=\\frac{5+12-13}{2}=2$. Dla równobocznego o $h=9$: $r=3$.",
          uwaga: "W pierwszym wzorze przeciwprostokątną odejmujemy, a nie dodajemy.",
        },
        {
          nazwa: "Odcinki od wierzchołków",
          slownie: "Z każdego wierzchołka trójkąta do punktów styczności prowadzą dwa równe odcinki. Odcinek wychodzący z wierzchołka leżącego naprzeciw boku $a$ ma długość $p-a$.",
          tex: "x=p-a",
          litery: "$p$ – połowa obwodu, $a$ – bok leżący naprzeciw danego wierzchołka.",
          przyklad: "Dla boków $7$, $8$, $9$ mamy $p=12$ i odcinki z wierzchołków: $12-7=5$, $12-8=4$, $12-9=3$.",
          uwaga: "Sprawdź: każdy bok jest sumą dwóch odcinków, np. $9=5+4$.",
        },
        {
          nazwa: "Czworokąt opisany na okręgu",
          slownie: "W czworokąt wypukły można wpisać okrąg wtedy i tylko wtedy, gdy sumy długości przeciwległych boków są równe. Wynika to z równości odcinków stycznych.",
          tex: "a+c=b+d",
          litery: "$a$, $b$, $c$, $d$ – kolejne boki czworokąta.",
          przyklad: "Dla boków $7$, $6$, $5$ i $d$: $7+5=6+d$, więc $d=6$.",
          uwaga: "Sumy tworzą boki naprzeciw siebie, a nie sąsiednie.",
        },
      ],
      jak: [
        "Zapisz boki trójkąta i oblicz połowę obwodu $p=\\frac{a+b+c}{2}$.",
        "Znajdź pole trójkąta (z wzoru, z wysokości lub z przyprostokątnych) i oblicz $r=\\frac{P}{p}$.",
        "Dla trójkąta prostokątnego użyj od razu $r=\\frac{a+b-c}{2}$.",
        "Dla odcinków stycznych użyj $x=p-a$ albo zapisz równania na sumy odcinków przy wierzchołkach.",
      ],
      zadania: [
        {
          nr: "36",
          tresc: "W trójkąt prostokątny o bokach długości $6$, $8$, $10$ wpisano okrąg. Promień tego okręgu jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$", "$2{,}4$", "$4$", "$5$"],
          poprawna: 0,
        },
        {
          nr: "37",
          tresc: "Środek okręgu wpisanego w trójkąt jest punktem przecięcia. **Wybierz właściwą odpowiedź.**",
          opcje: ["symetralnych boków trójkąta", "dwusiecznych kątów trójkąta", "wysokości trójkąta", "środkowych trójkąta"],
          poprawna: 1,
        },
        {
          nr: "38",
          tresc: "Trójkąt ma boki długości $13$, $14$, $15$ i pole równe $84$. Promień okręgu wpisanego w ten trójkąt jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$3{,}5$", "$6$", "$7$", "$4$"],
          poprawna: 3,
        },
        {
          nr: "39",
          tresc: "W czworokąt $ABCD$ wpisano okrąg. Wiadomo, że $|AB|=9$, $|BC|=8$ i $|CD|=5$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$|AD|=8$", litery: "PF", poprawna: 1 },
            { tekst: "Obwód czworokąta $ABCD$ jest równy $28$.", litery: "PF", poprawna: 0 },
            { tekst: "Okrąg można wpisać w każdy czworokąt.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "40",
          tresc: "W trójkąt o bokach długości $7$, $8$ i $9$ wpisano okrąg. Punkt styczności dzieli bok o długości $9$ na odcinki o długościach. **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$ i $6$", "$4{,}5$ i $4{,}5$", "$4$ i $5$", "$2$ i $7$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "41",
          punkty: 3,
          tresc: "Trójkąt równoramienny ma podstawę długości $12$ i ramiona długości $10$. Oblicz promień okręgu wpisanego w ten trójkąt. **Zapisz obliczenia.**",
          rozwiazanie: "Wysokość opuszczona na podstawę dzieli ją na połowy po $6$: $h = \\sqrt{10^2 - 6^2} = \\sqrt{64} = 8$.\n\nPole trójkąta: $P = \\frac{1}{2}\\cdot 12\\cdot 8 = 48$.\n\nPołowa obwodu: $p = \\frac{12 + 10 + 10}{2} = 16$.\n\nPromień okręgu wpisanego: $r = \\frac{P}{p} = \\frac{48}{16} = 3$.\n\nOdpowiedź: $r = 3$.",
        },
        {
          nr: "42",
          punkty: 4,
          tresc: "W trójkąt prostokątny wpisano okrąg. Punkt styczności okręgu z przeciwprostokątną dzieli ją na odcinki długości $3$ i $10$. Oblicz promień okręgu i długości przyprostokątnych. **Zapisz obliczenia.**",
          rozwiazanie: "Przeciwprostokątna ma długość $3 + 10 = 13$.\n\nPunkt styczności przy wierzchołku kąta prostego, środek okręgu i dwa punkty styczności na przyprostokątnych tworzą kwadrat o boku $r$. Zatem odcinki stycznych z wierzchołka kąta prostego mają długość $r$.\n\nPrzyprostokątne mają więc długości $r + 3$ oraz $r + 10$ (odcinki stycznych z końców przeciwprostokątnej to $3$ i $10$).\n\nZ twierdzenia Pitagorasa: $(r+3)^2 + (r+10)^2 = 13^2$, czyli $2r^2 + 26r + 109 = 169$.\n\n$r^2 + 13r - 30 = 0$, $\\Delta = 169 + 120 = 289$, $r = \\frac{-13 + 17}{2} = 2$ (drugi pierwiastek $-15$ odpada).\n\nPrzyprostokątne: $2 + 3 = 5$ oraz $2 + 10 = 12$. Sprawdzenie: $5^2 + 12^2 = 169$.\n\nOdpowiedź: $r = 2$, a przyprostokątne mają długości $5$ i $12$.",
        },
      ],
      generatory: [
        {
          id: "wpisany-promien",
          nazwa: "Promień okręgu wpisanego",
          opis: "Oblicz promień okręgu wpisanego w trójkąt prostokątny, równoboczny albo trójkąt o danym polu.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0 || tryb === 1) {
              const [a0, b0, c0] = r.pick(TROJKI);
              const k = r.int(1, 2);
              const [a, b] = r.chance() ? [a0 * k, b0 * k] : [b0 * k, a0 * k];
              const c = c0 * k;
              const rr = (a + b - c) / 2;
              const dane = tryb === 0 ? `Boki trójkąta prostokątnego mają długości $${a}$, $${b}$ i $${c}$.` : `Przyprostokątne trójkąta prostokątnego mają długości $${a}$ i $${b}$.`;
              const rozwiazanie = [];
              if (tryb === 1) rozwiazanie.push(`Przeciwprostokątna: $c = \\sqrt{${a}^2 + ${b}^2} = ${c}$.`);
              rozwiazanie.push("W trójkącie prostokątnym $r = \\frac{a + b - c}{2}$.", `$r = \\frac{${a} + ${b} - ${c}}{2} = ${rr}$.`);
              return {
                tresc: `${dane} Oblicz promień okręgu wpisanego w ten trójkąt.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$r =$" }],
                odpowiedz: { w: q(rr) },
                wynik: `$r = ${rr}$`,
                rozwiazanie,
              };
            }
            if (tryb === 2) {
              const k = r.int(1, 9);
              return {
                tresc: `Wysokość trójkąta równobocznego ma długość $${3 * k}$. Oblicz promień okręgu wpisanego w ten trójkąt.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$r =$" }],
                odpowiedz: { w: q(k) },
                wynik: `$r = ${k}$`,
                rozwiazanie: ["W trójkącie równobocznym promień okręgu wpisanego to trzecia część wysokości: $r = \\frac{1}{3}h$.", `$r = \\frac{1}{3}\\cdot ${3 * k} = ${k}$.`],
              };
            }
            for (;;) {
              const [a, b, c, P] = r.pick(HERON);
              const p = (a + b + c) / 2;
              const w = q(P, p);
              if (!ladna(w)) continue;
              const [x, y, z] = r.shuffle([a, b, c]);
              return {
                tresc: `Trójkąt ma boki długości $${x}$, $${y}$, $${z}$ i pole równe $${P}$. Oblicz promień okręgu wpisanego w ten trójkąt.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$r =$" }],
                odpowiedz: { w },
                wynik: `$r = ${w.tex()}$`,
                rozwiazanie: [
                  `Połowa obwodu: $p = \\frac{${x} + ${y} + ${z}}{2} = ${p}$.`,
                  `Promień okręgu wpisanego: $r = \\frac{P}{p} = \\frac{${P}}{${p}}$.`,
                  `$r = ${w.tex()}$.`,
                ],
              };
            }
          },
        },
        {
          id: "wpisany-odcinki",
          nazwa: "Odcinki stycznych i czworokąt",
          opis: "Oblicz odcinek od wierzchołka do punktu styczności albo brakujący bok czworokąta opisanego na okręgu.",
          generuj(r) {
            if (r.chance(0.6)) {
              const x = r.int(1, 8), y = r.int(1, 8), z = r.int(1, 8);   // odcinki od wierzchołków A, B, C
              const a = y + z, b = x + z, c = x + y;   // a = |BC|, b = |CA|, c = |AB|
              const p = x + y + z;
              const szukany = r.pick([["A", x, a], ["B", y, b], ["C", z, c]]);
              return {
                tresc: `W trójkąt $ABC$ o bokach $|BC| = ${a}$, $|CA| = ${b}$ i $|AB| = ${c}$ wpisano okrąg. Oblicz odległość wierzchołka $${szukany[0]}$ od punktów styczności okręgu z bokami wychodzącymi z tego wierzchołka.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Odległość wierzchołka $${szukany[0]}$` }],
                odpowiedz: { w: q(szukany[1]) },
                wynik: `$${szukany[1]}$`,
                rozwiazanie: [
                  `Połowa obwodu: $p = \\frac{${a} + ${b} + ${c}}{2} = ${p}$.`,
                  `Odcinek z wierzchołka $${szukany[0]}$ ma długość $p - ${["a", "b", "c"][["A", "B", "C"].indexOf(szukany[0])]}$, gdzie $${["a", "b", "c"][["A", "B", "C"].indexOf(szukany[0])]}$ jest bokiem naprzeciw $${szukany[0]}$ (długość $${szukany[2]}$).`,
                  `$${p} - ${szukany[2]} = ${szukany[1]}$.`,
                ],
              };
            }
            for (;;) {
              const a = r.int(3, 12), c = r.int(3, 12), b = r.int(3, 12);
              const d = a + c - b;
              if (d < 1 || d > 14) continue;
              return {
                tresc: `W czworokąt $ABCD$ wpisano okrąg. Wiadomo, że $|AB| = ${a}$, $|BC| = ${b}$ i $|CD| = ${c}$. Oblicz $|AD|$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$|AD| =$" }],
                odpowiedz: { w: q(d) },
                wynik: `$|AD| = ${d}$`,
                rozwiazanie: [
                  "W czworokącie opisanym na okręgu sumy długości przeciwległych boków są równe: $|AB| + |CD| = |BC| + |AD|$.",
                  `$${a} + ${c} = ${b} + |AD|$.`,
                  `Stąd $|AD| = ${a + c} - ${b} = ${d}$.`,
                ],
              };
            }
          },
        },
      ],
    },
  ],
};
