// Klasa 1 (liceum i technikum) · rozdział 7 „Geometria płaska – pojęcia wstępne. Trójkąty” – Matematyka 1, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** Trójki pitagorejskie (a, b, c) w najprostszej postaci i największy mnożnik, jaki w generatorach daje rozsądne liczby. */
const TROJKI = [[3, 4, 5, 6], [5, 12, 13, 3], [8, 15, 17, 2], [7, 24, 25, 1], [20, 21, 29, 1]];

/** Nazwy wierzchołków trójkąta. */
const NAZWY = [["A", "B", "C"], ["K", "L", "M"], ["P", "Q", "R"]];

/** Ułamek a/b w LaTeX z uproszczeniem: frakcja(4, 6) = "\frac{4}{6} = \frac{2}{3}", frakcja(2, 3) = "\frac{2}{3}". */
const frakcja = (a, b) => {
  const surowy = `\\frac{${a}}{${b}}`;
  const v = q(a, b).tex();
  return surowy === v ? surowy : `${surowy} = ${v}`;
};

/** Wysokość/pole trójkąta równobocznego w postaci k√3: pierw3(1) = "\sqrt{3}", pierw3(5) = "5\sqrt{3}". */
const pierw3 = (k) => (k === 1 ? "\\sqrt{3}" : `${k}\\sqrt{3}`);

/** Ustawienie z twierdzenia Talesa używane w wielu zadaniach. */
const TALES = "Ramiona kąta o wierzchołku $O$ przecięto prostymi równoległymi $AC$ i $BD$. Punkty $A$, $B$ leżą na jednym ramieniu ($A$ między $O$ i $B$), a punkty $C$, $D$ na drugim ($C$ między $O$ i $D$).";

/** Rodzaj trójkąta po porównaniu kwadratu najdłuższego boku z sumą kwadratów pozostałych: 0 ostrokątny, 1 prostokątny, 2 rozwartokątny. */
const rodzajTrojkata = (a, b, c) => {
  const [x, y, z] = [a, b, c].sort((u, v) => u - v);
  const s = x * x + y * y;
  return s === z * z ? 1 : s > z * z ? 0 : 2;
};

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 7.1, 7.2
    {
      id: "proste-katy",
      nazwa: "Proste, kąty, symetralna i dwusieczna",
      sciaga: [
        {
          nazwa: "Odcinek, prosta, półprosta",
          slownie: "Prosta jest nieograniczona w obie strony, półprosta ma początek i biegnie w jedną stronę, a odcinek ma dwa końce i długość. Figura jest wypukła, gdy z każdymi dwoma swoimi punktami zawiera cały łączący je odcinek.",
          litery: "$|AB|$ – długość odcinka $AB$, czyli odległość punktów $A$ i $B$.",
          przyklad: "Trójkąt i koło są figurami wypukłymi, a figura w kształcie litery L nie jest wypukła.",
          uwaga: "Odcinek $AB$ to figura, a $|AB|$ to liczba (jego długość) – nie myl tych zapisów.",
        },
        {
          nazwa: "Rodzaje kątów",
          slownie: "Kąt ostry ma mniej niż $90^\\circ$, prosty dokładnie $90^\\circ$, a rozwarty więcej niż $90^\\circ$ i mniej niż $180^\\circ$. Kąt półpełny ma $180^\\circ$, a pełny $360^\\circ$.",
          przyklad: "Kąt $135^\\circ$ jest rozwarty, a kąt $89^\\circ$ jest ostry.",
        },
        {
          nazwa: "Kąty przyległe i wierzchołkowe",
          slownie: "Dwa kąty przyległe mają wspólne ramię, a ich pozostałe ramiona tworzą prostą, więc dają razem $180^\\circ$. Kąty wierzchołkowe powstają przy przecięciu dwóch prostych i leżą naprzeciw siebie – są równe.",
          tex: "\\alpha+\\beta=180^\\circ\\qquad\\alpha=\\gamma",
          litery: "$\\alpha$, $\\beta$ – kąty przyległe, $\\alpha$, $\\gamma$ – kąty wierzchołkowe.",
          przyklad: "Jeśli jeden z kątów przy przecięciu prostych ma $50^\\circ$, to kąt wierzchołkowy też ma $50^\\circ$, a każdy z dwóch pozostałych kątów ma $130^\\circ$.",
          uwaga: "Kąty przyległe są równe tylko wtedy, gdy każdy z nich ma $90^\\circ$.",
        },
        {
          nazwa: "Odległość i prostopadłość",
          slownie: "Odległość punktu od prostej to długość odcinka prostopadłego łączącego ten punkt z prostą – to najkrótszy odcinek od punktu do prostej. Odległość między prostymi równoległymi to odległość dowolnego punktu jednej z nich od drugiej.",
          przyklad: "Proste równoległe $k$ i $l$ są oddalone o $4$, więc każdy punkt prostej $k$ leży w odległości $4$ od prostej $l$.",
          uwaga: "Odległość mierzymy prostopadle. Odcinek poprowadzony ukośnie jest dłuższy.",
        },
        {
          nazwa: "Symetralna i dwusieczna",
          slownie: "Symetralna odcinka jest do niego prostopadła i przechodzi przez jego środek; każdy jej punkt jest tak samo oddalony od obu końców odcinka. Dwusieczna kąta to półprosta o początku w wierzchołku, która dzieli kąt na dwa równe kąty.",
          tex: "|PA|=|PB|",
          litery: "$P$ – dowolny punkt symetralnej odcinka $AB$.",
          przyklad: "Dwusieczna kąta $70^\\circ$ tworzy z każdym z ramion kąt $35^\\circ$.",
          uwaga: "Prosta przechodząca przez środek odcinka pod innym kątem niż prosty nie jest jego symetralną.",
        },
      ],
      jak: [
        "Zrób rysunek i zapisz na nim dane kąty.",
        "Rozpoznaj kąty: przyległe dają razem $180^\\circ$, wierzchołkowe są równe.",
        "Zapisz równanie, np. $x + (x + 40^\\circ) = 180^\\circ$, i rozwiąż je.",
        "Sprawdź, czy wszystkie kąty mają sensowną miarę (np. dodatnią i mniejszą od $180^\\circ$).",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Dwie proste przecinają się, tworząc cztery kąty. Jeden z nich ma miarę $38^\\circ$. Największy z tych czterech kątów ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$38^\\circ$", "$52^\\circ$", "$142^\\circ$", "$322^\\circ$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Kąt wypukły ma miarę $84^\\circ$. Dwusieczna tego kąta tworzy z jego ramieniem kąt o mierze. **Wybierz właściwą odpowiedź.**",
          opcje: ["$42^\\circ$", "$84^\\circ$", "$168^\\circ$", "$48^\\circ$"],
          poprawna: 0,
        },
        {
          nr: "3",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Każdy punkt symetralnej odcinka $AB$ leży tak samo daleko od punktu $A$ jak od punktu $B$.", litery: "PF", poprawna: 0 },
            { tekst: "Dwa kąty wierzchołkowe mają razem $180^\\circ$.", litery: "PF", poprawna: 1 },
            { tekst: "Kąt o mierze $100^\\circ$ jest kątem rozwartym.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "4",
          tresc: "Punkt $P$ leży w odległości $12$ od prostej $k$, a punkt $Q$ leży na prostej $k$. Długość odcinka $PQ$ może być równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$9$", "$11$", "$13$"],
          poprawna: 3,
        },
        {
          nr: "5",
          tresc: "Dwa kąty przyległe mają miary w stosunku $2:3$. Mniejszy z tych kątów ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$36^\\circ$", "$72^\\circ$", "$108^\\circ$", "$60^\\circ$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Dwie proste przecinają się. Miara jednego z utworzonych kątów jest o $40^\\circ$ większa od miary kąta do niego przyległego. Oblicz miary wszystkich czterech kątów. **Zapisz obliczenia.**",
          rozwiazanie: "Niech mniejszy z dwóch przyległych kątów ma miarę $x$. Wtedy drugi ma miarę $x + 40^\\circ$.\n\nKąty przyległe dają razem $180^\\circ$: $x + (x + 40^\\circ) = 180^\\circ$, czyli $2x = 140^\\circ$ i $x = 70^\\circ$.\n\nDrugi kąt ma $70^\\circ + 40^\\circ = 110^\\circ$.\n\nKąty wierzchołkowe są równe, więc cztery kąty mają miary $70^\\circ$, $110^\\circ$, $70^\\circ$, $110^\\circ$.\n\nOdpowiedź: $70^\\circ$, $110^\\circ$, $70^\\circ$, $110^\\circ$.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Punkty $A$, $O$, $C$ leżą na jednej prostej, przy czym punkt $O$ leży między $A$ i $C$. Punkt $B$ leży poza tą prostą i $|\\angle AOB| = 64^\\circ$. Półprosta $OD$ jest dwusieczną kąta $BOC$ (punkt $D$ leży po tej samej stronie prostej $AC$ co punkt $B$). Oblicz miarę kąta $AOD$. **Zapisz obliczenia.**",
          rozwiazanie: "Kąty $AOB$ i $BOC$ są przyległe, więc $|\\angle BOC| = 180^\\circ - 64^\\circ = 116^\\circ$.\n\nDwusieczna dzieli kąt $BOC$ na dwa równe kąty: $|\\angle BOD| = 116^\\circ : 2 = 58^\\circ$.\n\nPółprosta $OB$ leży wewnątrz kąta $AOD$, więc $|\\angle AOD| = |\\angle AOB| + |\\angle BOD| = 64^\\circ + 58^\\circ = 122^\\circ$.\n\nOdpowiedź: $122^\\circ$.",
        },
      ],
      generatory: [
        {
          id: "proste-katy-przylegle",
          nazwa: "Kąty przyległe",
          opis: "Oblicz miarę kąta przyległego lub wierzchołkowego, także gdy dany jest stosunek albo różnica kątów.",
          generuj(r) {
            const tryb = r.int(0, 3);
            const pole = { id: "w", typ: "liczba", etykieta: "Miara kąta (w stopniach)" };
            if (tryb === 0) {
              const x = r.intBez(20, 160, 90);
              const w = 180 - x;
              return {
                tresc: `Kąt $\\alpha$ ma miarę $${x}^\\circ$. Ile stopni ma kąt przyległy do kąta $\\alpha$?`,
                pola: [pole],
                odpowiedz: { w },
                wynik: `$${w}^\\circ$`,
                rozwiazanie: ["Kąty przyległe dają razem $180^\\circ$.", `$180^\\circ - ${x}^\\circ = ${w}^\\circ$.`],
              };
            }
            if (tryb === 1) {
              const [m, n] = r.pick([[1, 2], [1, 3], [1, 4], [2, 3], [1, 5], [4, 5], [2, 7], [3, 7], [5, 7]]);
              const czesc = 180 / (m + n);
              const mniejszy = r.chance();
              const w = (mniejszy ? m : n) * czesc;
              return {
                tresc: `Dwa kąty przyległe mają miary w stosunku $${m}:${n}$. Ile stopni ma ${mniejszy ? "mniejszy" : "większy"} z tych kątów?`,
                pola: [pole],
                odpowiedz: { w },
                wynik: `$${w}^\\circ$`,
                rozwiazanie: [
                  `Kąty przyległe dają razem $180^\\circ$, czyli ${m + n} równych części (${m} + ${n}).`,
                  `Jedna część ma $180^\\circ : ${m + n} = ${czesc}^\\circ$.`,
                  `${mniejszy ? "Mniejszy" : "Większy"} kąt to $${mniejszy ? m : n}$ części: $${mniejszy ? m : n}\\cdot ${czesc}^\\circ = ${w}^\\circ$.`,
                ],
              };
            }
            if (tryb === 2) {
              const d = 2 * r.int(5, 55);
              const mniejszy = r.chance();
              const maly = (180 - d) / 2;
              const w = mniejszy ? maly : maly + d;
              return {
                tresc: `Dwa kąty przyległe różnią się o $${d}^\\circ$. Ile stopni ma ${mniejszy ? "mniejszy" : "większy"} z nich?`,
                pola: [pole],
                odpowiedz: { w },
                wynik: `$${w}^\\circ$`,
                rozwiazanie: [
                  `Niech mniejszy kąt ma miarę $x$, wtedy większy ma $x + ${d}^\\circ$. Razem dają $180^\\circ$: $x + (x + ${d}^\\circ) = 180^\\circ$.`,
                  `$2x = ${180 - d}^\\circ$, więc $x = ${maly}^\\circ$.`,
                  mniejszy ? `Mniejszy kąt ma $${maly}^\\circ$.` : `Większy kąt ma $${maly}^\\circ + ${d}^\\circ = ${w}^\\circ$.`,
                ],
              };
            }
            const s = 2 * r.intBez(20, 160, 90);
            const kat = s / 2;
            const w = 180 - kat;
            return {
              tresc: `Dwie proste przecinają się, tworząc cztery kąty. Dwa z nich, leżące naprzeciw siebie (kąty wierzchołkowe), mają razem $${s}^\\circ$. Ile stopni ma każdy z dwóch pozostałych kątów?`,
              pola: [pole],
              odpowiedz: { w },
              wynik: `$${w}^\\circ$`,
              rozwiazanie: [
                `Kąty wierzchołkowe są równe, więc każdy z nich ma $${s}^\\circ : 2 = ${kat}^\\circ$.`,
                `Pozostałe kąty są do nich przyległe: $180^\\circ - ${kat}^\\circ = ${w}^\\circ$.`,
              ],
            };
          },
        },
        {
          id: "proste-katy-dwusieczna",
          nazwa: "Kąty i dwusieczna",
          opis: "Oblicz miarę kąta, gdy znasz kąt utworzony z dwusieczną albo kąt przyległy.",
          generuj(r) {
            const tryb = r.int(0, 2);
            const pole = { id: "w", typ: "liczba", etykieta: "Miara kąta (w stopniach)" };
            if (tryb === 0) {
              const alfa = 2 * r.int(10, 80);
              const poł = (180 - alfa) / 2;
              const w = alfa + poł;
              return {
                tresc: `Punkty $A$, $O$, $C$ leżą na jednej prostej, przy czym punkt $O$ leży między $A$ i $C$. Punkt $B$ leży poza tą prostą i $|\\angle AOB| = ${alfa}^\\circ$. Półprosta $OD$ jest dwusieczną kąta $BOC$ (punkt $D$ leży po tej samej stronie prostej $AC$ co punkt $B$). Oblicz miarę kąta $AOD$.`,
                pola: [pole],
                odpowiedz: { w },
                wynik: `$${w}^\\circ$`,
                rozwiazanie: [
                  `Kąty $AOB$ i $BOC$ są przyległe: $|\\angle BOC| = 180^\\circ - ${alfa}^\\circ = ${180 - alfa}^\\circ$.`,
                  `Dwusieczna dzieli kąt $BOC$ na połowy: $|\\angle BOD| = ${180 - alfa}^\\circ : 2 = ${poł}^\\circ$.`,
                  `$|\\angle AOD| = |\\angle AOB| + |\\angle BOD| = ${alfa}^\\circ + ${poł}^\\circ = ${w}^\\circ$.`,
                ],
              };
            }
            if (tryb === 1) {
              const x = r.int(8, 88);
              const w = 2 * x;
              return {
                tresc: `Dwusieczna kąta wypukłego tworzy z ramieniem tego kąta kąt o mierze $${x}^\\circ$. Ile stopni ma ten kąt?`,
                pola: [pole],
                odpowiedz: { w },
                wynik: `$${w}^\\circ$`,
                rozwiazanie: [
                  "Dwusieczna dzieli kąt na dwa równe kąty, więc cały kąt jest dwa razy większy od kąta między dwusieczną a ramieniem.",
                  `$2\\cdot ${x}^\\circ = ${w}^\\circ$.`,
                ],
              };
            }
            const x = r.int(10, 85);
            const w = 180 - 2 * x;
            return {
              tresc: `Półprosta $OC$ jest dwusieczną kąta $AOB$ i $|\\angle AOC| = ${x}^\\circ$. Ile stopni ma kąt przyległy do kąta $AOB$?`,
              pola: [pole],
              odpowiedz: { w },
              wynik: `$${w}^\\circ$`,
              rozwiazanie: [
                `Dwusieczna dzieli kąt $AOB$ na połowy, więc $|\\angle AOB| = 2\\cdot ${x}^\\circ = ${2 * x}^\\circ$.`,
                `Kąt przyległy: $180^\\circ - ${2 * x}^\\circ = ${w}^\\circ$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 7.3, 7.4
    {
      id: "katy-w-trojkacie-i-wielokacie",
      nazwa: "Kąty w trójkącie i wielokącie",
      sciaga: [
        {
          nazwa: "Proste równoległe i trzecia prosta",
          slownie: "Gdy proste równoległe przetniemy trzecią prostą, kąty naprzemianległe są równe, kąty odpowiadające są równe, a kąty jednostronne dają razem $180^\\circ$.",
          tex: "\\alpha=\\beta\\qquad\\alpha+\\gamma=180^\\circ",
          litery: "$\\alpha$, $\\beta$ – kąty naprzemianległe (albo odpowiadające), $\\alpha$, $\\gamma$ – kąty jednostronne.",
          przyklad: "Jeśli jeden z kątów ma $65^\\circ$, to kąty naprzemianległy i odpowiadający mają po $65^\\circ$, a jednostronny $115^\\circ$.",
          uwaga: "Nie myl: kąty naprzemianległe są równe, a jednostronne sumują się do $180^\\circ$.",
        },
        {
          nazwa: "Suma kątów trójkąta",
          slownie: "Suma kątów wewnętrznych trójkąta jest równa $180^\\circ$. Kąt zewnętrzny trójkąta (przyległy do kąta wewnętrznego) jest równy sumie dwóch pozostałych kątów wewnętrznych.",
          tex: "\\alpha+\\beta+\\gamma=180^\\circ\\qquad\\delta=\\alpha+\\beta",
          litery: "$\\alpha$, $\\beta$, $\\gamma$ – kąty wewnętrzne, $\\delta$ – kąt zewnętrzny przyległy do $\\gamma$.",
          przyklad: "Kąty $50^\\circ$ i $60^\\circ$: trzeci kąt ma $180^\\circ - 110^\\circ = 70^\\circ$, a kąt zewnętrzny przy nim ma $50^\\circ + 60^\\circ = 110^\\circ$.",
          uwaga: "W trójkącie równoramiennym kąty przy podstawie są równe, więc jeden kąt wystarczy do wyznaczenia pozostałych.",
        },
        {
          nazwa: "Suma kątów wielokąta",
          slownie: "Wielokąt wypukły o $n$ bokach dzielimy przekątnymi z jednego wierzchołka na $n-2$ trójkąty, więc suma jego kątów wewnętrznych to $(n-2)\\cdot180^\\circ$.",
          tex: "S_n=(n-2)\\cdot180^\\circ",
          litery: "$n$ – liczba boków wielokąta.",
          przyklad: "Czworokąt: $2\\cdot180^\\circ = 360^\\circ$. Sześciokąt: $4\\cdot180^\\circ = 720^\\circ$.",
          uwaga: "Mnożymy przez $n-2$, a nie przez $n$.",
        },
        {
          nazwa: "Wielokąt foremny",
          slownie: "Wielokąt foremny ma wszystkie boki równe i wszystkie kąty równe. Kąt wewnętrzny dostajemy, dzieląc sumę kątów przez liczbę boków.",
          tex: "\\alpha=\\frac{(n-2)\\cdot180^\\circ}{n}",
          litery: "$n$ – liczba boków, $\\alpha$ – kąt wewnętrzny.",
          przyklad: "Dziewięciokąt foremny: $\\alpha=\\frac{7\\cdot180^\\circ}{9}=140^\\circ$.",
          uwaga: "Kąt zewnętrzny wielokąta foremnego ma $\\frac{360^\\circ}{n}$. Dla $n=9$ jest to $40^\\circ$, a $140^\\circ + 40^\\circ = 180^\\circ$.",
        },
        {
          nazwa: "Przekątne wielokąta",
          slownie: "Z każdego wierzchołka $n$-kąta wychodzi $n-3$ przekątnych, a każdą przekątną policzyliśmy dwa razy (z obu końców), więc dzielimy przez $2$.",
          tex: "\\frac{n(n-3)}{2}",
          litery: "$n$ – liczba boków wielokąta.",
          przyklad: "Sześciokąt ma $\\frac{6\\cdot3}{2}=9$ przekątnych.",
          uwaga: "Bez dzielenia przez $2$ każda przekątna zostanie policzona podwójnie.",
        },
      ],
      jak: [
        "Dla kątów przy prostych równoległych znajdź kąty równe (naprzemianległe, odpowiadające) i kąty sumujące się do $180^\\circ$.",
        "W trójkącie zapisz $\\alpha + \\beta + \\gamma = 180^\\circ$ albo skorzystaj z kąta zewnętrznego.",
        "Dla wielokąta policz sumę kątów $(n-2)\\cdot180^\\circ$, a w foremnym podziel ją przez $n$.",
        "Gdy dany jest stosunek kątów, podziel sumę na tyle równych części, ile wynosi suma liczb ze stosunku.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "W trójkącie dwa kąty mają miary $48^\\circ$ i $67^\\circ$. Trzeci kąt tego trójkąta ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$115^\\circ$", "$65^\\circ$", "$132^\\circ$", "$75^\\circ$"],
          poprawna: 1,
        },
        {
          nr: "9",
          tresc: "Kąt zewnętrzny trójkąta $ABC$ przy wierzchołku $A$ ma miarę $110^\\circ$, a kąt wewnętrzny przy wierzchołku $B$ ma miarę $40^\\circ$. Kąt wewnętrzny przy wierzchołku $C$ ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$70^\\circ$", "$30^\\circ$", "$110^\\circ$", "$140^\\circ$"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "Suma kątów wewnętrznych ośmiokąta wypukłego jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$720^\\circ$", "$1260^\\circ$", "$1080^\\circ$", "$1440^\\circ$"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Kąt wewnętrzny sześciokąta foremnego ma miarę $120^\\circ$.", litery: "PF", poprawna: 0 },
            { tekst: "Istnieje wielokąt wypukły, w którym suma kątów wewnętrznych jest równa $900^\\circ$.", litery: "PF", poprawna: 0 },
            { tekst: "Pięciokąt wypukły ma $6$ przekątnych.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "12",
          tresc: "Proste równoległe $k$ i $l$ przecięto prostą $m$. Jeden z utworzonych kątów ma miarę $65^\\circ$. Kąt jednostronny do niego ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$65^\\circ$", "$25^\\circ$", "$125^\\circ$", "$115^\\circ$"],
          poprawna: 3,
        },
        {
          nr: "13",
          tresc: "Kąt wewnętrzny wielokąta foremnego ma miarę $140^\\circ$. Ten wielokąt ma. **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$ boków", "$9$ boków", "$10$ boków", "$12$ boków"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "14",
          punkty: 2,
          tresc: "Kąty trójkąta pozostają w stosunku $2:3:4$. Oblicz miary tych kątów i rozstrzygnij, czy trójkąt jest ostrokątny. **Zapisz obliczenia.**",
          rozwiazanie: "Kąty mają miary $2x$, $3x$, $4x$. Ich suma jest równa $180^\\circ$: $2x + 3x + 4x = 9x = 180^\\circ$, więc $x = 20^\\circ$.\n\nKąty mają miary $2\\cdot20^\\circ = 40^\\circ$, $3\\cdot20^\\circ = 60^\\circ$ i $4\\cdot20^\\circ = 80^\\circ$.\n\nWszystkie kąty są mniejsze od $90^\\circ$, więc trójkąt jest ostrokątny.\n\nOdpowiedź: $40^\\circ$, $60^\\circ$, $80^\\circ$; trójkąt jest ostrokątny.",
        },
        {
          nr: "15",
          punkty: 2,
          tresc: "Oblicz miarę kąta wewnętrznego dziesięciokąta foremnego oraz liczbę przekątnych dziesięciokąta wypukłego. **Zapisz obliczenia.**",
          rozwiazanie: "Suma kątów wewnętrznych dziesięciokąta: $(10 - 2)\\cdot180^\\circ = 8\\cdot180^\\circ = 1440^\\circ$.\n\nW dziesięciokącie foremnym wszystkie kąty są równe, więc jeden ma $1440^\\circ : 10 = 144^\\circ$.\n\nZ każdego wierzchołka wychodzi $10 - 3 = 7$ przekątnych. Każdą liczymy dwa razy, więc przekątnych jest $\\frac{10\\cdot7}{2} = 35$.\n\nOdpowiedź: kąt wewnętrzny ma $144^\\circ$, przekątnych jest $35$.",
        },
      ],
      generatory: [
        {
          id: "katy-trojkat",
          nazwa: "Kąty trójkąta",
          opis: "Oblicz miarę kąta trójkąta z sumy kątów, ze stosunku kątów, z kąta zewnętrznego albo w trójkącie równoramiennym.",
          generuj(r) {
            const tryb = r.int(0, 3);
            const [A, B, C] = r.pick(NAZWY);
            const kat = (w) => `$|\\angle ${w}| = `;
            const pole = { id: "w", typ: "liczba", etykieta: "Miara kąta (w stopniach)" };
            if (tryb === 0) {
              const a = r.int(20, 100), b = r.int(20, 150 - a);
              const w = 180 - a - b;
              return {
                tresc: `W trójkącie $${A}${B}${C}$ mamy ${kat(A)}${a}^\\circ$ i ${kat(B)}${b}^\\circ$. Oblicz miarę kąta przy wierzchołku $${C}$.`,
                pola: [pole],
                odpowiedz: { w },
                wynik: `$${w}^\\circ$`,
                rozwiazanie: ["Suma kątów trójkąta jest równa $180^\\circ$.", `$180^\\circ - ${a}^\\circ - ${b}^\\circ = ${w}^\\circ$.`],
              };
            }
            if (tryb === 1) {
              const [m, n, p] = r.pick([[1, 2, 3], [2, 3, 4], [1, 1, 2], [1, 2, 6], [2, 3, 5], [3, 4, 5], [1, 4, 7]]);
              const czesc = 180 / (m + n + p);
              const najwiekszy = r.chance();
              const w = (najwiekszy ? p : m) * czesc;
              return {
                tresc: `Kąty trójkąta pozostają w stosunku $${m}:${n}:${p}$. Ile stopni ma ${najwiekszy ? "największy" : "najmniejszy"} kąt tego trójkąta?`,
                pola: [pole],
                odpowiedz: { w },
                wynik: `$${w}^\\circ$`,
                rozwiazanie: [
                  `Kąty mają miary $${m === 1 ? "" : m}x$, $${n === 1 ? "" : n}x$, $${p}x$ i dają razem $180^\\circ$: $${m + n + p}x = 180^\\circ$.`,
                  `Stąd $x = ${czesc}^\\circ$.`,
                  `${najwiekszy ? "Największy" : "Najmniejszy"} kąt: $${najwiekszy ? p : m}\\cdot ${czesc}^\\circ = ${w}^\\circ$.`,
                ],
              };
            }
            if (tryb === 2) {
              const b = r.int(20, 80), e = r.int(b + 15, 160);
              const w = e - b;
              return {
                tresc: `Kąt zewnętrzny trójkąta $${A}${B}${C}$ przy wierzchołku $${A}$ ma miarę $${e}^\\circ$, a ${kat(B)}${b}^\\circ$. Oblicz miarę kąta przy wierzchołku $${C}$.`,
                pola: [pole],
                odpowiedz: { w },
                wynik: `$${w}^\\circ$`,
                rozwiazanie: [
                  `Kąt zewnętrzny przy wierzchołku $${A}$ jest równy sumie kątów wewnętrznych przy $${B}$ i $${C}$.`,
                  `$|\\angle ${C}| = ${e}^\\circ - ${b}^\\circ = ${w}^\\circ$.`,
                ],
              };
            }
            if (r.chance()) {
              const wierzcholek = 2 * r.int(10, 70);
              const w = (180 - wierzcholek) / 2;
              return {
                tresc: `W trójkącie równoramiennym $${A}${B}${C}$ ($|${A}${C}| = |${B}${C}|$) kąt przy wierzchołku $${C}$ ma miarę $${wierzcholek}^\\circ$. Oblicz miarę kąta przy wierzchołku $${A}$.`,
                pola: [pole],
                odpowiedz: { w },
                wynik: `$${w}^\\circ$`,
                rozwiazanie: [
                  `Kąty przy podstawie $${A}${B}$ są równe, więc razem mają $180^\\circ - ${wierzcholek}^\\circ = ${180 - wierzcholek}^\\circ$.`,
                  `Jeden z nich: $${180 - wierzcholek}^\\circ : 2 = ${w}^\\circ$.`,
                ],
              };
            }
            const podstawa = r.int(20, 80);
            const w = 180 - 2 * podstawa;
            return {
              tresc: `W trójkącie równoramiennym $${A}${B}${C}$ ($|${A}${C}| = |${B}${C}|$) kąt przy wierzchołku $${A}$ ma miarę $${podstawa}^\\circ$. Oblicz miarę kąta przy wierzchołku $${C}$.`,
              pola: [pole],
              odpowiedz: { w },
              wynik: `$${w}^\\circ$`,
              rozwiazanie: [
                `Kąty przy podstawie są równe, więc $|\\angle ${B}| = ${podstawa}^\\circ$.`,
                `$|\\angle ${C}| = 180^\\circ - 2\\cdot ${podstawa}^\\circ = ${w}^\\circ$.`,
              ],
            };
          },
        },
        {
          id: "katy-wielokat",
          nazwa: "Kąty wielokąta",
          opis: "Suma kątów, kąt wielokąta foremnego, liczba boków albo liczba przekątnych wielokąta wypukłego.",
          generuj(r) {
            const tryb = r.int(0, 4);
            const FOREMNE = [5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30];
            if (tryb === 0) {
              const n = r.int(4, 14);
              const w = (n - 2) * 180;
              return {
                tresc: `Oblicz sumę kątów wewnętrznych wielokąta wypukłego o ${n} bokach (w stopniach).`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Suma kątów (w stopniach)" }],
                odpowiedz: { w },
                wynik: `$${w}^\\circ$`,
                rozwiazanie: ["Suma kątów wielokąta o $n$ bokach to $(n-2)\\cdot180^\\circ$.", `$(${n} - 2)\\cdot180^\\circ = ${n - 2}\\cdot180^\\circ = ${w}^\\circ$.`],
              };
            }
            if (tryb === 1) {
              const n = r.pick(FOREMNE);
              const suma = (n - 2) * 180;
              const w = suma / n;
              return {
                tresc: `Oblicz miarę kąta wewnętrznego wielokąta foremnego o ${n} bokach (w stopniach).`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Miara kąta (w stopniach)" }],
                odpowiedz: { w },
                wynik: `$${w}^\\circ$`,
                rozwiazanie: [`Suma kątów: $(${n} - 2)\\cdot180^\\circ = ${suma}^\\circ$.`, `Kąty są równe, więc jeden ma $${suma}^\\circ : ${n} = ${w}^\\circ$.`],
              };
            }
            if (tryb === 2) {
              const n = r.pick(FOREMNE);
              const kat = ((n - 2) * 180) / n;
              return {
                tresc: `Kąt wewnętrzny wielokąta foremnego ma miarę $${kat}^\\circ$. Ile boków ma ten wielokąt?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba boków" }],
                odpowiedz: { w: n },
                wynik: `$${n}$`,
                rozwiazanie: [
                  `Kąt zewnętrzny (przyległy do wewnętrznego) ma $180^\\circ - ${kat}^\\circ = ${180 - kat}^\\circ$.`,
                  `Kąt zewnętrzny wielokąta foremnego to $\\frac{360^\\circ}{n}$, więc $n = 360 : ${180 - kat} = ${n}$.`,
                ],
              };
            }
            if (tryb === 3) {
              const n = r.int(5, 16);
              const w = (n * (n - 3)) / 2;
              return {
                tresc: `Ile przekątnych ma wielokąt wypukły o ${n} bokach?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba przekątnych" }],
                odpowiedz: { w },
                wynik: `$${w}$`,
                rozwiazanie: [`Z każdego wierzchołka wychodzi $${n} - 3 = ${n - 3}$ przekątnych.`, `Każdą przekątną policzyliśmy dwa razy: $\\frac{${n}\\cdot ${n - 3}}{2} = ${w}$.`],
              };
            }
            const n = r.int(5, 14);
            const suma = (n - 2) * 180;
            return {
              tresc: `Suma kątów wewnętrznych pewnego wielokąta wypukłego jest równa $${suma}^\\circ$. Ile boków ma ten wielokąt?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba boków" }],
              odpowiedz: { w: n },
              wynik: `$${n}$`,
              rozwiazanie: [`Z równania $(n-2)\\cdot180^\\circ = ${suma}^\\circ$ dostajemy $n - 2 = ${suma} : 180 = ${n - 2}$.`, `Stąd $n = ${n}$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 7.5
    {
      id: "twierdzenie-talesa",
      nazwa: "Twierdzenie Talesa",
      sciaga: [
        {
          nazwa: "Twierdzenie Talesa",
          slownie: "Jeśli ramiona kąta przetniemy dwiema prostymi równoległymi, to odcinki wyznaczone na jednym ramieniu są proporcjonalne do odpowiednich odcinków na drugim ramieniu.",
          tex: "\\frac{|OA|}{|AB|}=\\frac{|OC|}{|CD|}\\qquad\\frac{|OA|}{|OB|}=\\frac{|OC|}{|OD|}",
          litery: "$O$ – wierzchołek kąta, $A$, $B$ – punkty na jednym ramieniu, $C$, $D$ – na drugim, $AC\\parallel BD$.",
          przyklad: "Dla $|OA|=4$, $|AB|=6$, $|OC|=6$ z pierwszej proporcji: $\\frac{4}{6}=\\frac{6}{|CD|}$, więc $|CD|=9$.",
          uwaga: "Zestawiaj część z częścią albo całość z całością. Nie dziel $|OA|$ przez $|OD|$.",
        },
        {
          nazwa: "Twierdzenie odwrotne",
          slownie: "Jeśli odcinki wyznaczone na ramionach kąta są proporcjonalne, to proste $AC$ i $BD$ są równoległe.",
          tex: "\\frac{|OA|}{|OB|}=\\frac{|OC|}{|OD|}\\qquad\\Rightarrow\\ AC\\parallel BD",
          przyklad: "Dla $|OA|=4$, $|OB|=6$, $|OC|=6$, $|OD|=9$: $\\frac{4}{6}=\\frac{6}{9}=\\frac{2}{3}$, więc $AC\\parallel BD$.",
          uwaga: "Ułamki porównuj po skróceniu albo mnożąc na krzyż: $4\\cdot9=6\\cdot6$.",
        },
        {
          nazwa: "Rozwiązywanie proporcji",
          slownie: "Proporcję $\\frac{a}{b}=\\frac{c}{d}$ rozwiązujemy, mnożąc na krzyż.",
          tex: "a\\cdot d=b\\cdot c",
          przyklad: "$\\frac{3}{5}=\\frac{6}{x}$ daje $3x=30$, więc $x=10$.",
          uwaga: "Pamiętaj o nawiasach: z $\\frac{x}{x+3}=\\frac{2}{3}$ mamy $3x=2(x+3)$, a nie $3x=2x+3$.",
        },
      ],
      jak: [
        "Narysuj ramiona kąta i proste równoległe, zaznacz dane i szukane odcinki.",
        "Wybierz proporcję: część z częścią ($\\frac{|OA|}{|AB|}=\\frac{|OC|}{|CD|}$) albo całość z całością ($\\frac{|OA|}{|OB|}=\\frac{|OC|}{|OD|}$).",
        "Podstaw dane, pomnóż na krzyż i oblicz niewiadomą.",
        "Sprawdź, czy wynik ma sens (całość jest dłuższa od części).",
      ],
      zadania: [
        {
          nr: "16",
          tresc: `${TALES} Wiadomo, że $|OA|=4$, $|AB|=6$ i $|OC|=6$. Długość odcinka $CD$ jest równa. **Wybierz właściwą odpowiedź.**`,
          opcje: ["$4$", "$9$", "$10$", "$15$"],
          poprawna: 1,
        },
        {
          nr: "17",
          tresc: `${TALES} Wiadomo, że $|OA|=3$, $|OB|=9$ i $|OC|=5$. Długość odcinka $CD$ jest równa. **Wybierz właściwą odpowiedź.**`,
          opcje: ["$15$", "$6$", "$5$", "$10$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "Punkty $A$, $B$ leżą na jednym ramieniu kąta o wierzchołku $O$ ($A$ między $O$ i $B$), a punkty $C$, $D$ na drugim ($C$ między $O$ i $D$). **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Gdy $|OA|=2$, $|OB|=5$, $|OC|=4$ i $|OD|=10$, to proste $AC$ i $BD$ są równoległe.", litery: "PF", poprawna: 0 },
            { tekst: "Gdy $|OA|=3$, $|OB|=7$, $|OC|=6$ i $|OD|=15$, to proste $AC$ i $BD$ są równoległe.", litery: "PF", poprawna: 1 },
            { tekst: "Gdy $AC\\parallel BD$ i $|OA|=|AB|$, to $|OC|=|CD|$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "19",
          tresc: "Trzy proste równoległe przecinają dwie inne proste. Na pierwszej z nich wyznaczają odcinki o długościach $4$ i $6$, a na drugiej pierwszy odcinek ma długość $10$. Drugi odcinek na drugiej prostej ma długość. **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{20}{3}$", "$12$", "$15$", "$16$"],
          poprawna: 2,
        },
        {
          nr: "20",
          tresc: `${TALES} Wiadomo, że $|OA|=5$, $|AB|=10$ i $|OC|=4$. Długość odcinka $OD$ jest równa. **Wybierz właściwą odpowiedź.**`,
          opcje: ["$12$", "$8$", "$20$", "$6$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "21",
          punkty: 2,
          tresc: `${TALES} Wiadomo, że $|OA|=6$, $|AB|=9$ i $|OC|=8$. Oblicz $|CD|$ oraz $|OD|$. **Zapisz obliczenia.**`,
          rozwiazanie: "Z twierdzenia Talesa: $\\frac{|OA|}{|AB|}=\\frac{|OC|}{|CD|}$, czyli $\\frac{6}{9}=\\frac{8}{|CD|}$.\n\nMnożymy na krzyż: $6\\cdot|CD| = 9\\cdot8 = 72$, więc $|CD| = 12$.\n\nOdcinek $OD$ składa się z $OC$ i $CD$: $|OD| = |OC| + |CD| = 8 + 12 = 20$.\n\nOdpowiedź: $|CD| = 12$, $|OD| = 20$.",
        },
        {
          nr: "22",
          punkty: 2,
          tresc: `${TALES} Wiadomo, że $|OA|=x$, $|OB|=x+3$, $|OC|=8$ i $|OD|=12$. Oblicz $x$. **Zapisz obliczenia.**`,
          rozwiazanie: "Z twierdzenia Talesa: $\\frac{|OA|}{|OB|}=\\frac{|OC|}{|OD|}$, czyli $\\frac{x}{x+3}=\\frac{8}{12}=\\frac{2}{3}$.\n\nMnożymy na krzyż: $3x = 2(x+3)$, czyli $3x = 2x + 6$.\n\nStąd $x = 6$.\n\nSprawdzenie: $|OA| = 6$, $|OB| = 9$ i $\\frac{6}{9}=\\frac{2}{3}=\\frac{8}{12}$.\n\nOdpowiedź: $x = 6$.",
        },
      ],
      generatory: [
        {
          id: "tales-odcinek",
          nazwa: "Odcinek z Talesa",
          opis: "Ramiona kąta przecięte prostymi równoległymi – oblicz brakującą długość odcinka z twierdzenia Talesa.",
          generuj(r) {
            const p = r.int(1, 5), s = r.int(1, 5), t = r.int(1, 4), u = r.intBez(1, 4, t);
            const d = { OA: p * t, AB: s * t, OB: (p + s) * t, OC: p * u, CD: s * u, OD: (p + s) * u };
            const wariant = r.int(0, 3);
            // proporcja a/b = c/e; szukana jest ostatnia (wariant 0, 1) albo trzecia (2, 3) wielkość
            const [a, b, c, e, szukany] = [
              ["OA", "AB", "OC", "CD", "CD"],
              ["OA", "OB", "OC", "OD", "OD"],
              ["OA", "AB", "OC", "CD", "OC"],
              ["OA", "OB", "OC", "OD", "OC"],
            ][wariant];
            const dane = [a, b, c, e].filter((k) => k !== szukany);
            const zapis = (k) => `|${k}|`;
            const uklad = `\\frac{${zapis(a)}}{${zapis(b)}} = \\frac{${zapis(c)}}{${zapis(e)}}`;
            const podstawione = `\\frac{${d[a]}}{${d[b]}} = ${szukany === c ? `\\frac{x}{${d[e]}}` : `\\frac{${d[c]}}{x}`}`;
            const dzialanie = szukany === e
              ? `x = \\frac{${d[b]}\\cdot ${d[c]}}{${d[a]}} = ${d[szukany]}`
              : `x = \\frac{${d[a]}\\cdot ${d[e]}}{${d[b]}} = ${d[szukany]}`;
            return {
              tresc: `${TALES} Wiadomo, że ${dane.map((k) => `$|${k}| = ${d[k]}$`).join(", ")}. Oblicz $|${szukany}|$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: `$|${szukany}| =$` }],
              odpowiedz: { w: d[szukany] },
              wynik: `$|${szukany}| = ${d[szukany]}$`,
              rozwiazanie: [
                `Z twierdzenia Talesa: $${uklad}$.`,
                `Podstawiamy dane i oznaczamy $x = |${szukany}|$: $${podstawione}$.`,
                `Mnożymy na krzyż: $${dzialanie}$.`,
              ],
            };
          },
        },
        {
          id: "tales-rownolegle",
          nazwa: "Czy proste są równoległe",
          opis: "Sprawdź z twierdzenia odwrotnego do Talesa, czy proste AC i BD są równoległe.",
          generuj(r) {
            const p = r.int(1, 6), s = r.int(p + 1, 8), t = r.int(1, 4), u = r.intBez(1, 4, t);
            const rownolegle = r.chance();
            const OA = p * t, OB = s * t, OC = p * u;
            const OD = s * u + (rownolegle ? 0 : r.pick([1, 2]));
            const l = frakcja(OA, OB), pr = frakcja(OC, OD);
            return {
              tresc: `Punkty $A$, $B$ leżą na jednym ramieniu kąta o wierzchołku $O$ ($A$ między $O$ i $B$), a punkty $C$, $D$ na drugim ($C$ między $O$ i $D$). Wiadomo, że $|OA| = ${OA}$, $|OB| = ${OB}$, $|OC| = ${OC}$ i $|OD| = ${OD}$. Czy proste $AC$ i $BD$ są równoległe?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Odpowiedź", opcje: ["Tak, są równoległe", "Nie, nie są równoległe"] }],
              odpowiedz: { w: rownolegle ? 0 : 1 },
              wynik: rownolegle ? "Tak, są równoległe" : "Nie, nie są równoległe",
              rozwiazanie: [
                "Sprawdzamy twierdzenie odwrotne do twierdzenia Talesa: porównujemy $\\frac{|OA|}{|OB|}$ z $\\frac{|OC|}{|OD|}$.",
                `$\\frac{|OA|}{|OB|} = ${l}$ oraz $\\frac{|OC|}{|OD|} = ${pr}$.`,
                rownolegle ? "Ułamki są równe, więc proste $AC$ i $BD$ są równoległe." : "Ułamki są różne, więc proste $AC$ i $BD$ nie są równoległe.",
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 7.6, 7.7
    {
      id: "pitagoras",
      nazwa: "Podział trójkątów. Twierdzenie Pitagorasa",
      sciaga: [
        {
          nazwa: "Podział trójkątów",
          slownie: "Ze względu na kąty: ostrokątny (wszystkie kąty ostre), prostokątny (jeden kąt prosty), rozwartokątny (jeden kąt rozwarty). Ze względu na boki: równoboczny (trzy równe boki), równoramienny (co najmniej dwa równe boki), różnoboczny (wszystkie boki różne).",
          przyklad: "Trójkąt o kątach $50^\\circ$, $60^\\circ$, $70^\\circ$ jest ostrokątny i różnoboczny.",
          uwaga: "Trójkąt równoboczny jest też równoramienny (ma kąty po $60^\\circ$). Trójkąt ma co najwyżej jeden kąt prosty lub rozwarty.",
        },
        {
          nazwa: "Nierówność trójkąta",
          slownie: "Z trzech odcinków można zbudować trójkąt wtedy, gdy każdy z nich jest krótszy od sumy dwóch pozostałych. Wystarczy sprawdzić najdłuższy odcinek.",
          tex: "a+b>c\\qquad a+c>b\\qquad b+c>a",
          litery: "$a$, $b$, $c$ – długości odcinków.",
          przyklad: "Odcinki $3$, $4$, $8$: $3+4=7<8$, więc trójkąta nie zbudujemy. Odcinki $3$, $4$, $6$: $3+4=7>6$, więc można.",
          uwaga: "Gdy $a+b=c$, trójkąta też nie ma (odcinki układają się w jedną prostą).",
        },
        {
          nazwa: "Odcinek łączący środki boków",
          slownie: "Odcinek łączący środki dwóch boków trójkąta jest równoległy do trzeciego boku i ma długość równą jego połowie.",
          tex: "DE\\parallel AB\\qquad|DE|=\\frac{1}{2}|AB|",
          litery: "$D$, $E$ – środki boków $AC$ i $BC$ trójkąta $ABC$.",
          przyklad: "Dla $|AB|=14$ mamy $|DE|=7$. Trójkąt o wierzchołkach w środkach wszystkich boków ma obwód równy połowie obwodu danego trójkąta.",
          uwaga: "Wzór dotyczy tylko odcinka łączącego środki boków, a nie dowolnych punktów na bokach.",
        },
        {
          nazwa: "Twierdzenie Pitagorasa",
          slownie: "W trójkącie prostokątnym kwadrat długości przeciwprostokątnej jest równy sumie kwadratów długości przyprostokątnych.",
          tex: "a^2+b^2=c^2",
          litery: "$a$, $b$ – przyprostokątne, $c$ – przeciwprostokątna (najdłuższy bok, leży naprzeciw kąta prostego).",
          przyklad: "Dla $a=6$, $b=8$: $c=\\sqrt{36+64}=\\sqrt{100}=10$.",
          uwaga: "Dodajemy kwadraty, a nie długości: $6+8\\neq10$. Przeciwprostokątna to zawsze $c$.",
        },
        {
          nazwa: "Twierdzenie odwrotne i rodzaj trójkąta",
          slownie: "Gdy kwadrat najdłuższego boku jest równy sumie kwadratów dwóch pozostałych, trójkąt jest prostokątny. Gdy jest od niej mniejszy, trójkąt jest ostrokątny, a gdy większy – rozwartokątny.",
          tex: "a^2+b^2=c^2\\qquad a^2+b^2>c^2\\qquad a^2+b^2<c^2",
          litery: "Po kolei: trójkąt prostokątny, ostrokątny, rozwartokątny. $c$ – najdłuższy bok.",
          przyklad: "Boki $7$, $8$, $12$: $7^2+8^2=113<144=12^2$, więc trójkąt jest rozwartokątny.",
          uwaga: "Za $c$ zawsze podstaw najdłuższy bok – inaczej porównanie nic nie mówi.",
        },
      ],
      jak: [
        "Ustal, który bok jest przeciwprostokątną (leży naprzeciw kąta prostego, jest najdłuższy).",
        "Zapisz $a^2+b^2=c^2$ z danymi, podstawiając liczbę w miejsce szukanego boku.",
        "Rozwiąż równanie i wyciągnij pierwiastek (długość jest dodatnia).",
        "Dla rodzaju trójkąta porównaj kwadrat najdłuższego boku z sumą kwadratów pozostałych.",
      ],
      zadania: [
        {
          nr: "23",
          tresc: "Z odcinków o długościach $5$, $7$ i $x$ można zbudować trójkąt. Liczba $x$ może być równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$", "$2$", "$13$", "$6$"],
          poprawna: 3,
        },
        {
          nr: "24",
          tresc: "Boki trójkąta mają długości $7$, $8$ i $12$. Ten trójkąt jest. **Wybierz właściwą odpowiedź.**",
          opcje: ["ostrokątny", "prostokątny", "rozwartokątny", "równoramienny"],
          poprawna: 2,
        },
        {
          nr: "25",
          tresc: "Przekątna prostokąta ma długość $13$, a jeden z jego boków ma długość $5$. Drugi bok ma długość. **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$", "$12$", "$\\sqrt{194}$", "$18$"],
          poprawna: 1,
        },
        {
          nr: "26",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Z odcinków o długościach $4$, $4$ i $9$ można zbudować trójkąt.", litery: "PF", poprawna: 1 },
            { tekst: "Trójkąt o bokach $5$, $6$ i $8$ jest rozwartokątny.", litery: "PF", poprawna: 0 },
            { tekst: "Odcinek łączący środki dwóch boków trójkąta jest równoległy do trzeciego boku.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "27",
          tresc: "Obwód trójkąta $ABC$ jest równy $30$. Punkty $D$, $E$, $F$ są środkami boków tego trójkąta. Obwód trójkąta $DEF$ jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$15$", "$30$", "$10$", "$60$"],
          poprawna: 0,
        },
        {
          nr: "28",
          tresc: "Trójkąt równoramienny ma podstawę długości $16$ i ramię długości $17$. Wysokość poprowadzona do podstawy ma długość. **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$", "$9$", "$15$", "$\\sqrt{353}$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "29",
          punkty: 2,
          tresc: "Drabina o długości $6{,}5$ m stoi oparta o pionową ścianę. Dolny koniec drabiny jest oddalony od ściany o $2{,}5$ m. Na jakiej wysokości drabina dotyka ściany? **Zapisz obliczenia.**",
          rozwiazanie: "Drabina, ściana i podłoże tworzą trójkąt prostokątny o przeciwprostokątnej $6{,}5$ m (drabina) i przyprostokątnej $2{,}5$ m (odległość od ściany).\n\nNiech $h$ będzie szukaną wysokością. Z twierdzenia Pitagorasa: $h^2 + 2{,}5^2 = 6{,}5^2$.\n\n$h^2 = 42{,}25 - 6{,}25 = 36$, więc $h = 6$.\n\nOdpowiedź: drabina dotyka ściany na wysokości $6$ m.",
        },
        {
          nr: "30",
          punkty: 3,
          tresc: "Boki trójkąta mają długości $20$, $21$ i $29$. Wykaż, że ten trójkąt jest prostokątny, oblicz jego pole oraz długość odcinka łączącego środki przyprostokątnych. **Zapisz obliczenia.**",
          rozwiazanie: "Najdłuższy bok ma długość $29$. Sprawdzamy: $20^2 + 21^2 = 400 + 441 = 841$ oraz $29^2 = 841$.\n\nKwadrat najdłuższego boku jest równy sumie kwadratów pozostałych, więc z twierdzenia odwrotnego do twierdzenia Pitagorasa trójkąt jest prostokątny, a $20$ i $21$ to przyprostokątne.\n\nPole: $P = \\frac{1}{2}\\cdot20\\cdot21 = 210$.\n\nOdcinek łączący środki przyprostokątnych jest równoległy do przeciwprostokątnej i ma długość równą jej połowie: $29 : 2 = 14{,}5$.\n\nOdpowiedź: trójkąt jest prostokątny, pole jest równe $210$, a szukany odcinek ma długość $14{,}5$.",
        },
      ],
      generatory: [
        {
          id: "pitagoras-bok",
          nazwa: "Bok z Pitagorasa",
          opis: "Oblicz długość boku trójkąta prostokątnego, przekątnej prostokąta, boku rombu, wysokości albo drabiny.",
          generuj(r) {
            const [a0, b0, c0, maks] = r.pick(TROJKI);
            const k = r.int(1, maks);
            let [a, b] = r.chance() ? [a0 * k, b0 * k] : [b0 * k, a0 * k];
            const c = c0 * k;
            const tryb = r.int(0, 5);
            const pole = (et) => [{ id: "w", typ: "liczba", etykieta: et }];
            const [X, Y, Z] = r.pick(NAZWY);
            if (tryb === 0) {
              return {
                tresc: `W trójkącie prostokątnym $${X}${Y}${Z}$ kąt prosty jest przy wierzchołku $${Z}$, $|${X}${Z}| = ${a}$ i $|${Y}${Z}| = ${b}$. Oblicz $|${X}${Y}|$.`,
                pola: pole(`$|${X}${Y}| =$`),
                odpowiedz: { w: c },
                wynik: `$|${X}${Y}| = ${c}$`,
                rozwiazanie: [
                  `Bok $${X}${Y}$ leży naprzeciw kąta prostego, jest więc przeciwprostokątną.`,
                  `$|${X}${Y}|^2 = ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${c * c}$.`,
                  `$|${X}${Y}| = \\sqrt{${c * c}} = ${c}$.`,
                ],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `W trójkącie prostokątnym $${X}${Y}${Z}$ kąt prosty jest przy wierzchołku $${Z}$, $|${X}${Y}| = ${c}$ i $|${X}${Z}| = ${a}$. Oblicz $|${Y}${Z}|$.`,
                pola: pole(`$|${Y}${Z}| =$`),
                odpowiedz: { w: b },
                wynik: `$|${Y}${Z}| = ${b}$`,
                rozwiazanie: [
                  `Bok $${X}${Y}$ jest przeciwprostokątną, więc $|${Y}${Z}|^2 + ${a}^2 = ${c}^2$.`,
                  `$|${Y}${Z}|^2 = ${c * c} - ${a * a} = ${b * b}$.`,
                  `$|${Y}${Z}| = \\sqrt{${b * b}} = ${b}$.`,
                ],
              };
            }
            if (tryb === 2) {
              return {
                tresc: `Boki prostokąta mają długości $${a}$ i $${b}$. Oblicz długość przekątnej tego prostokąta.`,
                pola: pole("Długość przekątnej"),
                odpowiedz: { w: c },
                wynik: `$${c}$`,
                rozwiazanie: [
                  "Przekątna dzieli prostokąt na dwa trójkąty prostokątne, w których jest przeciwprostokątną.",
                  `$d^2 = ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${c * c}$.`,
                  `$d = \\sqrt{${c * c}} = ${c}$.`,
                ],
              };
            }
            if (tryb === 3) {
              return {
                tresc: `Przekątne rombu mają długości $${2 * a}$ i $${2 * b}$. Oblicz długość boku tego rombu.`,
                pola: pole("Długość boku"),
                odpowiedz: { w: c },
                wynik: `$${c}$`,
                rozwiazanie: [
                  `Przekątne rombu przecinają się pod kątem prostym i połowią się, więc bok jest przeciwprostokątną trójkąta o przyprostokątnych $${a}$ i $${b}$.`,
                  `$x^2 = ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${c * c}$.`,
                  `$x = \\sqrt{${c * c}} = ${c}$.`,
                ],
              };
            }
            if (tryb === 4) {
              return {
                tresc: `Trójkąt równoramienny ma ramię długości $${c}$ i podstawę długości $${2 * a}$. Oblicz długość wysokości poprowadzonej do podstawy.`,
                pola: pole("Długość wysokości"),
                odpowiedz: { w: b },
                wynik: `$${b}$`,
                rozwiazanie: [
                  `Wysokość dzieli podstawę na dwie części po $${2 * a} : 2 = ${a}$ i tworzy trójkąt prostokątny o przeciwprostokątnej $${c}$ (ramię).`,
                  `$h^2 = ${c}^2 - ${a}^2 = ${c * c} - ${a * a} = ${b * b}$.`,
                  `$h = \\sqrt{${b * b}} = ${b}$.`,
                ],
              };
            }
            return {
              tresc: `Drabina o długości $${c}$ m stoi oparta o pionową ścianę. Jej dolny koniec jest oddalony od ściany o $${a}$ m. Na jakiej wysokości (w metrach) drabina dotyka ściany?`,
              pola: pole("Wysokość (w metrach)"),
              odpowiedz: { w: b },
              wynik: `$${b}$ m`,
              rozwiazanie: [
                `Drabina, ściana i podłoże tworzą trójkąt prostokątny, w którym drabina ($${c}$ m) jest przeciwprostokątną.`,
                `$h^2 = ${c}^2 - ${a}^2 = ${c * c} - ${a * a} = ${b * b}$.`,
                `$h = \\sqrt{${b * b}} = ${b}$ m.`,
              ],
            };
          },
        },
        {
          id: "pitagoras-rodzaj",
          nazwa: "Jaki to trójkąt",
          opis: "Określ, czy trójkąt o podanych bokach jest ostrokątny, prostokątny czy rozwartokątny.",
          generuj(r) {
            const cel = r.int(0, 2);
            for (;;) {
              let a, b, c;
              if (cel === 1) {
                const [x, y, z, maks] = r.pick(TROJKI);
                const k = r.int(1, maks);
                [a, b, c] = [x * k, y * k, z * k];
              } else {
                a = r.int(3, 14);
                b = r.int(a, 14);
                c = r.int(b, a + b - 1);
              }
              if (rodzajTrojkata(a, b, c) !== cel) continue;
              const [u, v, w] = r.shuffle([a, b, c]);
              const znak = cel === 1 ? "=" : cel === 0 ? ">" : "<";
              const opis = ["ostrokątny", "prostokątny", "rozwartokątny"][cel];
              return {
                tresc: `Boki trójkąta mają długości $${u}$, $${v}$ i $${w}$. Jaki jest ten trójkąt?`,
                pola: [{ id: "w", typ: "wybor", etykieta: "Rodzaj trójkąta", opcje: ["ostrokątny", "prostokątny", "rozwartokątny"] }],
                odpowiedz: { w: cel },
                wynik: opis,
                rozwiazanie: [
                  `Najdłuższy bok ma długość $${c}$. Porównujemy $${c}^2$ z sumą kwadratów pozostałych boków.`,
                  `$${a}^2 + ${b}^2 = ${a * a + b * b}$ oraz $${c}^2 = ${c * c}$, czyli $${a * a + b * b} ${znak} ${c * c}$.`,
                  `Zatem trójkąt jest ${opis}.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 7.8
    {
      id: "wysokosci-i-srodkowe",
      nazwa: "Wysokości i środkowe w trójkącie",
      sciaga: [
        {
          nazwa: "Wysokość trójkąta",
          slownie: "Wysokość trójkąta to odcinek poprowadzony z wierzchołka prostopadle do prostej zawierającej przeciwległy bok. Trzy wysokości (lub ich przedłużenia) przecinają się w jednym punkcie. W trójkącie rozwartokątnym dwie wysokości leżą poza trójkątem.",
          tex: "P=\\frac{1}{2}ah",
          litery: "$a$ – bok trójkąta, $h$ – wysokość opuszczona na ten bok.",
          przyklad: "Trójkąt o przyprostokątnych $6$ i $8$ ma pole $24$ i przeciwprostokątną $10$. Wysokość na nią: $h=\\frac{2\\cdot24}{10}=4{,}8$.",
          uwaga: "Iloczyn $a\\cdot h$ jest taki sam dla każdego boku (to podwojone pole).",
        },
        {
          nazwa: "Środkowa i środek ciężkości",
          slownie: "Środkowa to odcinek łączący wierzchołek ze środkiem przeciwległego boku. Trzy środkowe przecinają się w jednym punkcie (środku ciężkości), który dzieli każdą z nich w stosunku $2:1$, licząc od wierzchołka.",
          tex: "|AS|=\\frac{2}{3}|AD|\\qquad|SD|=\\frac{1}{3}|AD|",
          litery: "$AD$ – środkowa ($D$ – środek boku $BC$), $S$ – środek ciężkości.",
          przyklad: "Środkowa o długości $12$ jest podzielona przez $S$ na odcinki $8$ (przy wierzchołku) i $4$ (przy boku).",
          uwaga: "Dłuższa część (dwie trzecie) leży przy wierzchołku, a nie przy boku.",
        },
        {
          nazwa: "Trójkąt równoboczny",
          slownie: "W trójkącie równobocznym wysokość jest jednocześnie środkową, dwusieczną kąta i symetralną boku. Wysokość i pole obliczamy z boku.",
          tex: "h=\\frac{a\\sqrt{3}}{2}\\qquad P=\\frac{a^2\\sqrt{3}}{4}",
          litery: "$a$ – długość boku, $h$ – wysokość, $P$ – pole.",
          przyklad: "Dla $a=6$: $h=\\frac{6\\sqrt{3}}{2}=3\\sqrt{3}$, a $P=\\frac{36\\sqrt{3}}{4}=9\\sqrt{3}$.",
          uwaga: "Gdy nie pamiętasz wzoru, wyprowadź go z Pitagorasa: $h^2=a^2-\\left(\\frac{a}{2}\\right)^2$.",
        },
        {
          nazwa: "Trójkąt równoramienny",
          slownie: "Wysokość opuszczona na podstawę trójkąta równoramiennego jest jednocześnie środkową, dwusieczną kąta przy wierzchołku i symetralną podstawy. Dzieli trójkąt na dwa przystające trójkąty prostokątne.",
          tex: "h^2+\\left(\\frac{a}{2}\\right)^2=b^2",
          litery: "$a$ – podstawa, $b$ – ramię, $h$ – wysokość opuszczona na podstawę.",
          przyklad: "Podstawa $10$, ramię $13$: $h=\\sqrt{169-25}=12$, pole $\\frac{1}{2}\\cdot10\\cdot12=60$.",
          uwaga: "W twierdzeniu Pitagorasa bierzemy połowę podstawy, a nie całą.",
        },
      ],
      jak: [
        "Narysuj trójkąt i zaznacz wysokość albo środkową, o którą pytamy.",
        "Dla środkowych użyj stosunku $2:1$ od wierzchołka: cała środkowa to $3$ równe części.",
        "Wysokość często tworzy trójkąt prostokątny – użyj twierdzenia Pitagorasa lub wzoru na pole $P=\\frac{1}{2}ah$ zapisanego dwa razy.",
        "W trójkącie równobocznym skorzystaj z gotowych wzorów na $h$ i $P$.",
      ],
      zadania: [
        {
          nr: "31",
          tresc: "Środkowa trójkąta ma długość $18$. Odległość środka ciężkości tego trójkąta od wierzchołka, z którego wychodzi ta środkowa, jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$9$", "$12$", "$15$"],
          poprawna: 2,
        },
        {
          nr: "32",
          tresc: "Wysokość trójkąta równobocznego o boku długości $8$ jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$4\\sqrt{3}$", "$4$", "$8\\sqrt{3}$", "$2\\sqrt{3}$"],
          poprawna: 0,
        },
        {
          nr: "33",
          tresc: "Wysokość trójkąta równobocznego ma długość $6\\sqrt{3}$. Pole tego trójkąta jest równe. **Wybierz właściwą odpowiedź.**",
          opcje: ["$18\\sqrt{3}$", "$36\\sqrt{3}$", "$36$", "$72\\sqrt{3}$"],
          poprawna: 1,
        },
        {
          nr: "34",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Środkowa trójkąta jest zawsze prostopadła do boku, do którego jest poprowadzona.", litery: "PF", poprawna: 1 },
            { tekst: "W trójkącie rozwartokątnym co najmniej jedna wysokość leży poza trójkątem.", litery: "PF", poprawna: 0 },
            { tekst: "W trójkącie równobocznym wysokość jest jednocześnie środkową.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "35",
          tresc: "Przyprostokątne trójkąta prostokątnego mają długości $6$ i $8$. Wysokość opuszczona na przeciwprostokątną ma długość. **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$7$", "$2{,}4$", "$4{,}8$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "36",
          punkty: 3,
          tresc: "Trójkąt równoramienny ma ramię długości $13$ i podstawę długości $24$. Oblicz jego pole oraz długość wysokości poprowadzonej do ramienia. **Zapisz obliczenia.**",
          rozwiazanie: "Wysokość $h$ poprowadzona do podstawy dzieli ją na dwie części po $12$. Z twierdzenia Pitagorasa: $h^2 = 13^2 - 12^2 = 169 - 144 = 25$, więc $h = 5$.\n\nPole: $P = \\frac{1}{2}\\cdot24\\cdot5 = 60$.\n\nNiech $h_r$ będzie wysokością poprowadzoną do ramienia. Pole można zapisać też jako $P = \\frac{1}{2}\\cdot13\\cdot h_r$, więc $\\frac{13}{2}h_r = 60$.\n\nStąd $h_r = \\frac{120}{13}$.\n\nOdpowiedź: pole jest równe $60$, a wysokość poprowadzona do ramienia ma długość $\\frac{120}{13}$.",
        },
        {
          nr: "37",
          punkty: 2,
          tresc: "Środkowe $AD$ i $BE$ trójkąta $ABC$ przecinają się w punkcie $S$. Wiadomo, że $|AD| = 15$ i $|BS| = 8$. Oblicz $|AS|$ oraz $|BE|$. **Zapisz obliczenia.**",
          rozwiazanie: "Punkt $S$ jest środkiem ciężkości i dzieli każdą środkową w stosunku $2:1$, licząc od wierzchołka.\n\nZatem $|AS| = \\frac{2}{3}|AD| = \\frac{2}{3}\\cdot15 = 10$.\n\nOdcinek $BS$ stanowi dwie trzecie środkowej $BE$: $\\frac{2}{3}|BE| = 8$, więc $|BE| = 8\\cdot\\frac{3}{2} = 12$.\n\nOdpowiedź: $|AS| = 10$, $|BE| = 12$.",
        },
      ],
      generatory: [
        {
          id: "wysokosc-rownoboczny",
          nazwa: "Trójkąt równoboczny",
          opis: "Wysokość lub pole trójkąta równobocznego w postaci k√3 albo bok z wysokości – podaj liczbę k (albo długość boku).",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const a = 2 * r.int(1, 12);
              const k = a / 2;
              return {
                tresc: `Bok trójkąta równobocznego ma długość $${a}$. Wysokość tego trójkąta ma długość $k\\sqrt{3}$. Oblicz $k$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$k =$" }],
                odpowiedz: { w: k },
                wynik: `$k = ${k}$`,
                rozwiazanie: ["Wysokość trójkąta równobocznego: $h = \\frac{a\\sqrt{3}}{2}$.", `$h = \\frac{${a}\\sqrt{3}}{2} = ${pierw3(k)}$, więc $k = ${k}$.`],
              };
            }
            if (tryb === 1) {
              const m = r.int(1, 10);
              const a = 2 * m;
              const k = m * m;
              return {
                tresc: `Bok trójkąta równobocznego ma długość $${a}$. Pole tego trójkąta jest równe $k\\sqrt{3}$. Oblicz $k$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "$k =$" }],
                odpowiedz: { w: k },
                wynik: `$k = ${k}$`,
                rozwiazanie: ["Pole trójkąta równobocznego: $P = \\frac{a^2\\sqrt{3}}{4}$.", `$P = \\frac{${a}^2\\sqrt{3}}{4} = \\frac{${a * a}\\sqrt{3}}{4} = ${pierw3(k)}$, więc $k = ${k}$.`],
              };
            }
            const k = r.int(1, 12);
            const a = 2 * k;
            return {
              tresc: `Wysokość trójkąta równobocznego ma długość $${pierw3(k)}$. Oblicz długość boku tego trójkąta.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Długość boku" }],
              odpowiedz: { w: a },
              wynik: `$${a}$`,
              rozwiazanie: [
                `Z $h = \\frac{a\\sqrt{3}}{2}$ dostajemy $\\frac{a\\sqrt{3}}{2} = ${pierw3(k)}$.`,
                `Dzielimy przez $\\sqrt{3}$ i mnożymy przez $2$: $a = 2\\cdot ${k} = ${a}$.`,
              ],
            };
          },
        },
        {
          id: "srodkowe-srodek-ciezkosci",
          nazwa: "Środkowe i środek ciężkości",
          opis: "Środek ciężkości dzieli środkową w stosunku 2:1 od wierzchołka – oblicz długość jednego odcinka z drugiego.",
          generuj(r) {
            const m = r.int(1, 15);
            const [V, M, bok] = r.pick([["A", "D", "BC"], ["B", "E", "AC"], ["C", "F", "AB"]]);
            const DL = { cala: { nazwa: `|${V}${M}|`, czesci: 3 }, blisko: { nazwa: `|${V}S|`, czesci: 2 }, daleko: { nazwa: `|S${M}|`, czesci: 1 } };
            const [dane, szukane] = r.pick([["cala", "blisko"], ["cala", "daleko"], ["blisko", "cala"], ["daleko", "cala"], ["blisko", "daleko"], ["daleko", "blisko"]]);
            const wartosc = (k) => DL[k].czesci * m;
            return {
              tresc: `W trójkącie $ABC$ środkowa $${V}${M}$ ($${M}$ jest środkiem boku $${bok}$) przecina się z pozostałymi środkowymi w punkcie $S$. Wiadomo, że $${DL[dane].nazwa} = ${wartosc(dane)}$. Oblicz $${DL[szukane].nazwa}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: `$${DL[szukane].nazwa} =$` }],
              odpowiedz: { w: wartosc(szukane) },
              wynik: `$${DL[szukane].nazwa} = ${wartosc(szukane)}$`,
              rozwiazanie: [
                `Punkt $S$ dzieli środkową $${V}${M}$ w stosunku $2:1$, licząc od wierzchołka: $|${V}S| = 2\\cdot|S${M}|$, czyli cała środkowa to $3$ równe części.`,
                DL[dane].czesci === 1 ? `$${DL[dane].nazwa}$ to jedna część, więc jedna część ma długość $${m}$.` : `Jedna część ma długość $${wartosc(dane)} : ${DL[dane].czesci} = ${m}$.`,
                DL[szukane].czesci === 1 ? `$${DL[szukane].nazwa}$ to jedna część: $${DL[szukane].nazwa} = ${m}$.` : `$${DL[szukane].nazwa} = ${DL[szukane].czesci}\\cdot ${m} = ${wartosc(szukane)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 7.9, 7.10, 7.11
    {
      id: "przystawanie-i-podobienstwo",
      nazwa: "Przystawanie i podobieństwo trójkątów",
      sciaga: [
        {
          nazwa: "Cechy przystawania",
          slownie: "Dwa trójkąty są przystające (mają te same kształt i rozmiar), gdy mają równe: trzy pary boków (bbb), albo dwie pary boków i kąt między nimi (bkb), albo bok i dwa kąty do niego przyległe (kbk).",
          tex: "bbb\\qquad bkb\\qquad kbk",
          litery: "b – bok, k – kąt. W „bkb” kąt leży między bokami, w „kbk” bok leży między kątami.",
          przyklad: "Dwa trójkąty o bokach $3$, $4$, $5$ są przystające (cecha bbb).",
          uwaga: "Trzy pary równych kątów nie wystarczą – takie trójkąty są tylko podobne.",
        },
        {
          nazwa: "Figury podobne i skala",
          slownie: "Figury są podobne, gdy jedną z nich da się powiększyć lub pomniejszyć tak, by dokładnie pokryła drugą: odpowiednie kąty są równe, a odpowiednie boki proporcjonalne. Stosunek odpowiednich boków to skala podobieństwa.",
          tex: "k=\\frac{|A'B'|}{|AB|}",
          litery: "$k$ – skala, $|A'B'|$ i $|AB|$ – odpowiadające sobie boki.",
          przyklad: "Trójkąty o bokach $3$, $4$, $5$ i $6$, $8$, $10$ są podobne w skali $k=\\frac{6}{3}=2$.",
          uwaga: "Skala zależy od kolejności: z $A'B'C'$ do $ABC$ jest $\\frac{1}{2}$. Boki dobieraj we właściwej kolejności (najkrótszy do najkrótszego).",
        },
        {
          nazwa: "Cechy podobieństwa",
          slownie: "Dwa trójkąty są podobne, gdy: mają trzy pary boków proporcjonalnych (bbb), albo dwie pary boków proporcjonalnych i równe kąty między nimi (bkb), albo dwie pary równych kątów (kk).",
          tex: "bbb\\qquad bkb\\qquad kk",
          litery: "b – bok, k – kąt. W „bkb” kąt leży między tymi bokami.",
          przyklad: "Trójkąt o kątach $40^\\circ$ i $75^\\circ$ jest podobny do trójkąta o kątach $75^\\circ$ i $65^\\circ$ (cecha kk): w obu trzeci kąt dopełnia zestaw $40^\\circ$, $65^\\circ$, $75^\\circ$.",
          uwaga: "Cecha kk wymaga tylko dwóch kątów, bo trzeci wynika z sumy $180^\\circ$.",
        },
        {
          nazwa: "Obwód i wysokości w skali",
          slownie: "W trójkątach podobnych w skali $k$ wszystkie odpowiadające sobie odcinki (boki, wysokości, środkowe) oraz obwody mają stosunek $k$.",
          tex: "\\frac{L'}{L}=k",
          litery: "$L$, $L'$ – obwody albo odpowiadające sobie wysokości.",
          przyklad: "Trójkąt o obwodzie $20$ i trójkąt podobny w skali $1{,}5$: obwód drugiego to $20\\cdot1{,}5=30$.",
          uwaga: "Skala dotyczy długości. Pola figur podobnych zmieniają się inaczej – nie mnóż ich przez $k$.",
        },
        {
          nazwa: "Podobieństwo w zadaniach",
          slownie: "Trójkąty podobne wyszukuj tam, gdzie są proste równoległe (kąty naprzemianległe i odpowiadające są równe) albo promienie słońca padające pod tym samym kątem. Zapisz proporcję odpowiadających boków i ją rozwiąż.",
          przyklad: "Patyk $2$ m rzuca cień $3$ m, a drzewo w tej chwili cień $12$ m. Z podobieństwa $\\frac{h}{12}=\\frac{2}{3}$, więc $h=8$ m.",
          uwaga: "Najpierw ustal, które wierzchołki sobie odpowiadają, i według tego dobierz boki do proporcji.",
        },
      ],
      jak: [
        "Znajdź dwa trójkąty i sprawdź, które kąty są równe (np. z prostych równoległych albo kąta wspólnego).",
        "Wskaż cechę przystawania (bbb, bkb, kbk) lub podobieństwa (bbb, bkb, kk) i zapisz, które wierzchołki sobie odpowiadają.",
        "Ułóż proporcję odpowiadających boków albo oblicz skalę $k$.",
        "Rozwiąż proporcję i sprawdź, czy wynik ma sens.",
      ],
      zadania: [
        {
          nr: "38",
          tresc: "Trójkąty $ABC$ i $A'B'C'$ są podobne w skali $3$ (trójkąt $A'B'C'$ jest większy). Bok $AB$ ma długość $4$. Odpowiadający mu bok $A'B'$ ma długość. **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$12$", "$\\frac{4}{3}$", "$3$"],
          poprawna: 1,
        },
        {
          nr: "39",
          tresc: "Trójkąt o kątach $40^\\circ$ i $75^\\circ$ jest podobny do trójkąta o kątach. **Wybierz właściwą odpowiedź.**",
          opcje: ["$75^\\circ$ i $75^\\circ$", "$50^\\circ$ i $65^\\circ$", "$40^\\circ$ i $65^\\circ$", "$40^\\circ$ i $100^\\circ$"],
          poprawna: 2,
        },
        {
          nr: "40",
          tresc: "Trójkąt o bokach $6$, $8$, $10$ jest podobny do trójkąta o bokach. **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$, $12$, $14$", "$7$, $9$, $11$", "$12$, $14$, $16$", "$9$, $12$, $15$"],
          poprawna: 3,
        },
        {
          nr: "41",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Dwa trójkąty, w których boki mają długości $3$, $4$, $5$, są przystające.", litery: "PF", poprawna: 0 },
            { tekst: "Dwa trójkąty, w których odpowiednio równe są dwa boki i kąt, który nie leży między nimi, są zawsze przystające.", litery: "PF", poprawna: 1 },
            { tekst: "Dwa trójkąty równoboczne o boku $4$ są przystające.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "42",
          tresc: "Pionowy patyk o wysokości $2$ m rzuca cień o długości $1{,}5$ m. W tej samej chwili drzewo rzuca cień o długości $9$ m. Wysokość drzewa jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$6{,}75$ m", "$9{,}5$ m", "$12$ m", "$18$ m"],
          poprawna: 2,
        },
        {
          nr: "43",
          tresc: "Obwód trójkąta $ABC$ jest równy $20$. Trójkąt $A'B'C'$ jest do niego podobny w skali $1{,}5$. Obwód trójkąta $A'B'C'$ jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$30$", "$22{,}5$", "$21{,}5$", "$40$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "44",
          punkty: 3,
          tresc: "W trójkącie $ABC$ mamy $|AC| = |BC|$, a punkt $D$ jest środkiem boku $AB$. Wykaż, że trójkąty $ACD$ i $BCD$ są przystające oraz że odcinek $CD$ jest prostopadły do boku $AB$. **Zapisz uzasadnienie.**",
          rozwiazanie: "Porównujemy boki trójkątów $ACD$ i $BCD$: $|AC| = |BC|$ (z założenia), $|AD| = |BD|$ (bo $D$ jest środkiem $AB$) oraz bok $CD$ jest wspólny.\n\nTrójkąty mają trzy pary równych boków, więc są przystające (cecha bbb).\n\nW trójkątach przystających odpowiednie kąty są równe, więc $|\\angle ADC| = |\\angle BDC|$.\n\nTe kąty są przyległe (punkty $A$, $D$, $B$ leżą na jednej prostej), więc razem dają $180^\\circ$. Każdy z nich ma zatem $90^\\circ$.\n\nOdpowiedź: trójkąty $ACD$ i $BCD$ są przystające, a $CD \\perp AB$.",
        },
        {
          nr: "45",
          punkty: 3,
          tresc: "W trójkącie $ABC$ punkt $D$ leży na boku $AC$, a punkt $E$ na boku $BC$, przy czym $DE \\parallel AB$. Wiadomo, że $|CD| = 4$, $|DA| = 2$ i $|AB| = 12$. Uzasadnij, że trójkąty $CDE$ i $CAB$ są podobne, i oblicz $|DE|$. **Zapisz obliczenia.**",
          rozwiazanie: "Kąt $C$ jest wspólny dla obu trójkątów. Ponieważ $DE \\parallel AB$, kąty $CDE$ i $CAB$ są odpowiadające, więc są równe.\n\nTrójkąty $CDE$ i $CAB$ mają dwie pary równych kątów, więc są podobne (cecha kk), przy czym $D$ odpowiada $A$, a $E$ odpowiada $B$.\n\nObliczamy $|CA| = |CD| + |DA| = 4 + 2 = 6$, więc skala podobieństwa trójkąta $CDE$ do $CAB$ wynosi $k = \\frac{|CD|}{|CA|} = \\frac{4}{6} = \\frac{2}{3}$.\n\nStąd $|DE| = k\\cdot|AB| = \\frac{2}{3}\\cdot12 = 8$.\n\nOdpowiedź: $|DE| = 8$.",
        },
      ],
      generatory: [
        {
          id: "podobienstwo-bok",
          nazwa: "Bok lub obwód z podobieństwa",
          opis: "Dane są boki trójkąta ABC i jeden bok podobnego trójkąta A'B'C' – oblicz inny jego bok albo obwód.",
          generuj(r) {
            const [x, y, z] = r.pick([[3, 4, 5], [2, 3, 4], [4, 5, 6], [5, 6, 7], [3, 5, 7], [5, 12, 13], [6, 7, 8], [4, 6, 7], [5, 5, 6], [7, 8, 9]]);
            const n = r.int(1, 5), m = r.intBez(1, 6, n);
            const k = q(m, n);
            const bok = [x * n, y * n, z * n], bokPrim = [x * m, y * m, z * m];
            const nazwa = ["AB", "BC", "CA"], nazwaPrim = ["A'B'", "B'C'", "C'A'"];
            const i = r.int(0, 2);
            const j = (i + r.int(1, 2)) % 3;
            const obwod = r.chance(0.35);
            const wstep = `Boki trójkąta $ABC$ mają długości $|AB| = ${bok[0]}$, $|BC| = ${bok[1]}$, $|CA| = ${bok[2]}$. Trójkąt $A'B'C'$ jest do niego podobny (wierzchołki $A$, $B$, $C$ odpowiadają kolejno $A'$, $B'$, $C'$), a $|${nazwaPrim[i]}| = ${bokPrim[i]}$.`;
            const skala = `Skala podobieństwa: $k = \\frac{|${nazwaPrim[i]}|}{|${nazwa[i]}|} = ${frakcja(bokPrim[i], bok[i])}$.`;
            if (obwod) {
              const L = bok[0] + bok[1] + bok[2];
              const w = bokPrim[0] + bokPrim[1] + bokPrim[2];
              return {
                tresc: `${wstep} Oblicz obwód trójkąta $A'B'C'$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Obwód trójkąta $A'B'C'$" }],
                odpowiedz: { w },
                wynik: `$${w}$`,
                rozwiazanie: [
                  skala,
                  `Obwód trójkąta $ABC$: $${bok[0]} + ${bok[1]} + ${bok[2]} = ${L}$.`,
                  `Obwody figur podobnych są w tej samej skali: $${k.tex()}\\cdot ${L} = ${w}$.`,
                ],
              };
            }
            return {
              tresc: `${wstep} Oblicz $|${nazwaPrim[j]}|$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: `$|${nazwaPrim[j]}| =$` }],
              odpowiedz: { w: bokPrim[j] },
              wynik: `$|${nazwaPrim[j]}| = ${bokPrim[j]}$`,
              rozwiazanie: [
                skala,
                `Odpowiednikiem boku $${nazwa[j]}$ jest bok $${nazwaPrim[j]}$.`,
                `$|${nazwaPrim[j]}| = k\\cdot|${nazwa[j]}| = ${k.tex()}\\cdot ${bok[j]} = ${bokPrim[j]}$.`,
              ],
            };
          },
        },
        {
          id: "podobienstwo-cien",
          nazwa: "Wysokość z cienia",
          opis: "Z długości cieni i wysokości jednego przedmiotu oblicz wysokość drugiego, korzystając z podobieństwa trójkątów.",
          generuj(r) {
            const [m, n] = r.pick([[1, 2], [2, 3], [3, 2], [3, 4], [4, 3], [5, 4], [3, 5], [5, 6], [4, 5], [2, 1]]);
            const t = r.int(1, 3), u = r.intBez(2, 8, t);
            const h1 = m * t, c1 = n * t, c2 = n * u, h2 = m * u;
            const [pierwszy, drugi] = r.pick([["pionowy słup", "drzewo"], ["pionowa tyczka", "komin"], ["pionowy słupek", "maszt"], ["pionowa tyczka", "budynek"], ["pionowy pal", "wieża"]]);
            return {
              tresc: `W pewnej chwili ${pierwszy} o wysokości $${h1}$ m rzuca cień długości $${c1}$ m. W tej samej chwili ${drugi} rzuca cień długości $${c2}$ m. Oblicz wysokość tego obiektu (w metrach).`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Wysokość (w metrach)" }],
              odpowiedz: { w: h2 },
              wynik: `$${h2}$ m`,
              rozwiazanie: [
                "Promienie słońca padają pod tym samym kątem, więc trójkąty prostokątne (przedmiot, jego cień, promień) są podobne (cecha kk).",
                `Niech $x$ będzie szukaną wysokością: $\\frac{x}{${c2}} = \\frac{${h1}}{${c1}}$.`,
                `$x = \\frac{${h1}\\cdot ${c2}}{${c1}} = ${h2}$.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
