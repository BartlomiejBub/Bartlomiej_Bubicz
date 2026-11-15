// Klasa 4 (szkoła podstawowa) · rozdział IV „Figury geometryczne” – Klucz do matematyki 4 (Nowa Era, 2026).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).

// --- Pomocnicze (tylko dla tego pliku)

/** Zdanie zaczynamy wielką literą. */
const wielka = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/** Litery do wypisania: $A$, $B$ i $C$. */
const lista = (litery) => {
  const t = litery.map((x) => `$${x}$`);
  return t.length === 1 ? t[0] : `${t.slice(0, -1).join(", ")} i ${t[t.length - 1]}`;
};

/** Zestawy liter na punkty (wielkie litery, kolejno). */
const PUNKTY = [
  ["A", "B", "C", "D", "E", "F", "G"],
  ["K", "L", "M", "N", "P", "R", "S"],
  ["P", "Q", "R", "S", "T", "U", "V"],
];
const CZWORO = [["A", "B", "C", "D"], ["K", "L", "M", "N"], ["P", "Q", "R", "S"], ["E", "F", "G", "H"]];
const TROJKI = [["A", "B", "C"], ["K", "L", "P"], ["P", "R", "S"], ["D", "E", "F"]];

/** Nazwy wielokątów od trzech boków: mianownik i dopełniacz. */
const WIELOKATY = ["trójkąt", "czworokąt", "pięciokąt", "sześciokąt", "siedmiokąt", "ośmiokąt", "dziewięciokąt"];
const WIELOKATY_D = ["trójkąta", "czworokąta", "pięciokąta", "sześciokąta", "siedmiokąta", "ośmiokąta", "dziewięciokąta"];

/** Czego dotyczą zadania o kawałkach (dopełniacz). */
const KAWALKI = ["sznurka", "wstążki", "listwy", "kabla", "tasiemki"];

/** Jednostki: większa, mniejsza i ile mniejszych mieści się w większej. */
const JEDNOSTKI = [
  { duza: "cm", mala: "mm", f: 10 },
  { duza: "dm", mala: "cm", f: 10 },
  { duza: "m", mala: "cm", f: 100 },
  { duza: "km", mala: "m", f: 1000 },
];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 1. Punkty, odcinki i proste
    {
      id: "punkty-odcinki-proste",
      nazwa: "Punkty, odcinki i proste",
      sciaga: [
        {
          nazwa: "Punkt i jego nazwa",
          slownie: "Punkt rysujemy jako małą kropkę. Nazywamy go wielką literą, na przykład $A$, $B$ albo $K$.",
          przyklad: "Na kartce zaznaczamy trzy punkty: $A$, $B$ i $C$. Czytamy: punkt A, punkt B i punkt C.",
          uwaga: "Punkt jest bardzo malutki. Kropka na rysunku to tylko jego obrazek. Punkty nazywamy wielkimi literami, a nie małymi.",
        },
        {
          nazwa: "Odcinek",
          slownie: "Odcinek ma dwa końce i można zmierzyć jego długość. Nazywamy go literami jego końców. Długość odcinka $AB$ zapisujemy $|AB|$.",
          tex: "|AB|=5\\text{ cm}",
          przyklad: "Odcinek $AB$ ma $5$ cm, czyli $|AB| = 5$ cm. Odcinek $BA$ to ten sam odcinek, tylko czytany od drugiego końca.",
          uwaga: "$AB$ to odcinek (figura), a $|AB|$ to liczba (jego długość). Nie myl odcinka z prostą: odcinek ma końce.",
        },
        {
          nazwa: "Prosta",
          slownie: "Prosta nie ma końców: biegnie prosto w obie strony bez końca. Dlatego nie da się zmierzyć jej długości. Przez dwa różne punkty przechodzi dokładnie jedna prosta.",
          przyklad: "Linijką rysujemy tylko kawałek prostej. Przez punkty $A$ i $B$ poprowadzisz jedną prostą, a przez sam punkt $A$ możesz poprowadzić wiele prostych.",
          uwaga: "Prosta nie ma długości. Gdy ktoś pyta o długość, to chodzi o odcinek.",
        },
        {
          nazwa: "Proste prostopadłe i równoległe",
          slownie: "Proste prostopadłe przecinają się pod kątem prostym, jak brzegi kartki w rogu. Proste równoległe nigdy się nie przecinają i są wszędzie w tej samej odległości od siebie.",
          tex: "k\\perp l\\qquad k\\parallel l",
          litery: "$k \\perp l$ – proste $k$ i $l$ są prostopadłe, $k \\parallel l$ – proste $k$ i $l$ są równoległe.",
          przyklad: "Dwie szyny toru kolejowego są równoległe. Dwie ulice, które krzyżują się pod kątem prostym, leżą na prostych prostopadłych.",
          uwaga: "Dwie proste, które się przecinają, nie zawsze są prostopadłe. Prostopadłe muszą się przecinać pod kątem prostym.",
        },
        {
          nazwa: "Punkt na odcinku, środek",
          slownie: "Gdy punkt $C$ leży na odcinku $AB$, to cały odcinek jest równy sumie dwóch jego części. Środek odcinka dzieli go na dwie równe części.",
          tex: "|AB|=|AC|+|CB|",
          przyklad: "Jeśli $|AC| = 3$ cm i $|CB| = 4$ cm, to $|AB| = 3 + 4 = 7$ cm. Jeśli $M$ jest środkiem odcinka $AB$ o długości $10$ cm, to $|AM| = 10 : 2 = 5$ cm.",
          uwaga: "Punkt leżący na odcinku nie zawsze jest jego środkiem. Środek leży dokładnie w połowie.",
        },
      ],
      jak: [
        "Zapisz, o jakie punkty i odcinki pytają, i zaznacz je na szkicu.",
        "Gdy punkt leży na odcinku, dodajemy długości jego części. Gdy znasz całość i jedną część, odejmujesz.",
        "Gdy jest mowa o środku odcinka, dzielimy długość całego odcinka przez $2$ albo mnożymy połowę przez $2$.",
        "Sprawdź, czy długość części nie wyszła większa od całego odcinka.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Które zdanie o prostej jest prawdziwe? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "Prosta ma dwa końce.",
            "Przez dwa różne punkty przechodzi dokładnie jedna prosta.",
            "Długość prostej można zmierzyć linijką.",
            "Przez dwa różne punkty przechodzą dokładnie dwie proste.",
          ],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Punkt $C$ leży na odcinku $AB$. Wiadomo, że $|AC| = 6$ cm i $|CB| = 9$ cm. Ile centymetrów ma odcinek $AB$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$ cm", "$54$ cm", "$69$ cm", "$15$ cm"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "Punkt $M$ jest środkiem odcinka $AB$, który ma $18$ cm. Ile centymetrów ma odcinek $AM$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$ cm", "$36$ cm", "$6$ cm", "$18$ cm"],
          poprawna: 0,
        },
        {
          nr: "4",
          tresc: "Który opis przedstawia proste prostopadłe? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "Dwie proste, które nigdy się nie przecinają.",
            "Dwa tory kolejowe położone obok siebie.",
            "Dwie sąsiednie krawędzie kartki, które schodzą się w rogu.",
            "Dwie przeciwległe krawędzie kartki.",
          ],
          poprawna: 2,
        },
        {
          nr: "5",
          tresc: "Punkty $A$, $B$, $C$ i $D$ leżą na jednej prostej w tej kolejności. Wiadomo, że $|AB| = 4$ cm, $|BC| = 5$ cm i $|CD| = 3$ cm. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$|AC| = 9$ cm", litery: "PF", poprawna: 0 },
            { tekst: "$|BD| = 7$ cm", litery: "PF", poprawna: 1 },
            { tekst: "$|AD| = 12$ cm", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Punkty $A$, $B$ i $C$ leżą na jednej prostej w tej kolejności (punkt $B$ jest między $A$ i $C$). Odcinek $AB$ ma $12$ cm, a odcinek $AC$ ma $35$ cm. Ile centymetrów ma odcinek $BC$? Punkt $M$ jest środkiem odcinka $AB$. Ile centymetrów ma odcinek $AM$? **Zapisz obliczenia.**",
          rozwiazanie: "Odcinek $AC$ składa się z odcinków $AB$ i $BC$, więc $|BC| = |AC| - |AB| = 35 - 12 = 23$ cm.\n\nPunkt $M$ jest środkiem odcinka $AB$, więc $|AM| = 12 : 2 = 6$ cm.\n\nOdpowiedź: Odcinek $BC$ ma $23$ cm, a odcinek $AM$ ma $6$ cm.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Na kartce zaznaczono cztery punkty $A$, $B$, $C$ i $D$. Żadne trzy z nich nie leżą na jednej prostej. Wypisz wszystkie odcinki, które mają końce w tych punktach, i podaj, ile ich jest. **Zapisz obliczenia.**",
          rozwiazanie: "Liczymy po kolei. Z punktu $A$ wychodzą trzy odcinki: $AB$, $AC$, $AD$.\n\nZ punktu $B$ dochodzą dwa nowe odcinki: $BC$ i $BD$ (odcinka $BA$ już nie liczymy, bo to ten sam odcinek co $AB$).\n\nZ punktu $C$ dochodzi jeden nowy odcinek: $CD$.\n\nRazem: $3 + 2 + 1 = 6$.\n\nOdpowiedź: Jest $6$ odcinków: $AB$, $AC$, $AD$, $BC$, $BD$ i $CD$.",
        },
      ],
      generatory: [
        {
          id: "punkty-ile-odcinkow",
          nazwa: "Ile odcinków",
          opis: "Ile odcinków albo prostych wyznaczają punkty, z których żadne trzy nie leżą na jednej prostej.",
          generuj(r) {
            const n = r.int(3, 7);
            const zestaw = r.pick(PUNKTY).slice(0, n);
            const odcinki = r.chance();
            const kolejno = Array.from({ length: n - 1 }, (_, i) => n - 1 - i);
            const razem = (n * (n - 1)) / 2;
            return {
              tresc: odcinki
                ? `Zaznaczono punkty ${lista(zestaw)}. Żadne trzy z nich nie leżą na jednej prostej. Ile odcinków o końcach w tych punktach można narysować?`
                : `Zaznaczono punkty ${lista(zestaw)}. Żadne trzy z nich nie leżą na jednej prostej. Ile różnych prostych można poprowadzić przez pary tych punktów?`,
              pola: [{ id: "w", typ: "liczba", etykieta: odcinki ? "Liczba odcinków" : "Liczba prostych" }],
              odpowiedz: { w: razem },
              wynik: `$${razem}$`,
              rozwiazanie: [
                odcinki
                  ? `Liczymy po kolei: z pierwszego punktu wychodzi $${n - 1}$ odcinków, z drugiego dochodzą nowe (odcinka, który już liczyliśmy, nie liczymy drugi raz), i tak dalej.`
                  : `Przez każde dwa punkty przechodzi jedna prosta, więc proste liczymy tak samo jak odcinki: z pierwszego punktu do pozostałych, potem nowe z drugiego, i tak dalej.`,
                `$${kolejno.join(" + ")} = ${razem}$.`,
              ],
            };
          },
        },
        {
          id: "punkty-na-odcinku",
          nazwa: "Punkt na odcinku",
          opis: "Punkt leży na odcinku albo jest jego środkiem: oblicz długość całego odcinka albo jego części.",
          generuj(r) {
            const jedn = r.pick(["cm", "m", "mm"]);
            const tryb = r.int(0, 4);
            if (tryb === 4) {
              const [A, B, C, D] = r.pick(CZWORO);
              const x = r.int(2, 30);
              const y = r.int(2, 30);
              const z = r.int(2, 30);
              return {
                tresc: `Punkty $${A}$, $${B}$, $${C}$ i $${D}$ leżą na jednej prostej w tej kolejności. Wiadomo, że $|${A}${B}| = ${x}$ ${jedn}, $|${B}${C}| = ${y}$ ${jedn} i $|${C}${D}| = ${z}$ ${jedn}. Ile ${jedn} ma odcinek $${A}${D}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Długość w ${jedn}` }],
                odpowiedz: { w: x + y + z },
                wynik: `$${x + y + z}$`,
                rozwiazanie: [`Odcinek $${A}${D}$ składa się z trzech odcinków: $${A}${B}$, $${B}${C}$ i $${C}${D}$.`, `Dodajemy: $${x} + ${y} + ${z} = ${x + y + z}$.`],
              };
            }
            const [X, Y, Z] = r.pick(TROJKI);
            if (tryb === 0) {
              const x = r.int(2, 40);
              const y = r.int(2, 40);
              return {
                tresc: `Punkt $${Z}$ leży na odcinku $${X}${Y}$. Wiadomo, że $|${X}${Z}| = ${x}$ ${jedn} i $|${Z}${Y}| = ${y}$ ${jedn}. Ile ${jedn} ma odcinek $${X}${Y}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Długość w ${jedn}` }],
                odpowiedz: { w: x + y },
                wynik: `$${x + y}$`,
                rozwiazanie: [`Cały odcinek składa się z dwóch części, więc dodajemy: $|${X}${Y}| = ${x} + ${y} = ${x + y}$.`],
              };
            }
            if (tryb === 1) {
              const x = r.int(2, 40);
              const y = r.int(2, 40);
              const s = x + y;
              return {
                tresc: `Punkt $${Z}$ leży na odcinku $${X}${Y}$. Wiadomo, że $|${X}${Y}| = ${s}$ ${jedn} i $|${X}${Z}| = ${x}$ ${jedn}. Ile ${jedn} ma odcinek $${Z}${Y}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Długość w ${jedn}` }],
                odpowiedz: { w: y },
                wynik: `$${y}$`,
                rozwiazanie: [`Od długości całego odcinka odejmujemy znaną część: $|${Z}${Y}| = ${s} - ${x} = ${y}$.`, `Sprawdzenie: $${x} + ${y} = ${s}$.`],
              };
            }
            const h = r.int(2, 40);
            if (tryb === 2) {
              return {
                tresc: `Punkt $${Z}$ jest środkiem odcinka $${X}${Y}$, który ma $${2 * h}$ ${jedn}. Ile ${jedn} ma odcinek $${X}${Z}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Długość w ${jedn}` }],
                odpowiedz: { w: h },
                wynik: `$${h}$`,
                rozwiazanie: [`Środek dzieli odcinek na dwie równe części, więc dzielimy przez $2$: $${2 * h} : 2 = ${h}$.`, `Sprawdzenie: $${h} + ${h} = ${2 * h}$.`],
              };
            }
            return {
              tresc: `Punkt $${Z}$ jest środkiem odcinka $${X}${Y}$. Odcinek $${X}${Z}$ ma $${h}$ ${jedn}. Ile ${jedn} ma odcinek $${X}${Y}$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `Długość w ${jedn}` }],
              odpowiedz: { w: 2 * h },
              wynik: `$${2 * h}$`,
              rozwiazanie: [`Środek dzieli odcinek na dwie równe części, więc cały odcinek jest dwa razy dłuższy: $2 \\cdot ${h} = ${2 * h}$.`, `Sprawdzenie: $${2 * h} : 2 = ${h}$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 2. Mierzenie. Jednostki długości
    {
      id: "mierzenie-jednostki",
      nazwa: "Mierzenie. Jednostki długości",
      sciaga: [
        {
          nazwa: "Jednostki długości",
          slownie: "Długość mierzymy w milimetrach, centymetrach, decymetrach, metrach i kilometrach. Każda jednostka jest tyle razy większa od mniejszej, ile pokazują wzory.",
          tex: "1\\text{ cm}=10\\text{ mm}\\qquad1\\text{ dm}=10\\text{ cm}\\qquad1\\text{ m}=100\\text{ cm}\\qquad1\\text{ km}=1000\\text{ m}",
          litery: "mm – milimetr, cm – centymetr, dm – decymetr, m – metr, km – kilometr.",
          przyklad: "Grubość monety mierzymy w milimetrach, długość ołówka w centymetrach, długość boiska w metrach, a drogę do innego miasta w kilometrach.",
          uwaga: "W $1$ m jest $100$ cm, ale w $1$ dm jest tylko $10$ cm. Nie myl tych liczb.",
        },
        {
          nazwa: "Na mniejszą jednostkę",
          slownie: "Gdy zamieniamy na mniejszą jednostkę, mnożymy. Liczba wychodzi większa. Przy długości z dwóch jednostek zamieniamy większą i dodajemy mniejszą.",
          przyklad: "$3$ m $20$ cm $= 3 \\cdot 100 + 20 = 320$ cm. $2$ km $50$ m $= 2 \\cdot 1000 + 50 = 2050$ m.",
          uwaga: "$2$ m $5$ cm to $205$ cm, a nie $25$ cm. Pamiętaj o zerze w środku.",
        },
        {
          nazwa: "Na większą jednostkę",
          slownie: "Gdy zamieniamy na większą jednostkę, bierzemy tyle pełnych większych jednostek, ile się da. To, co zostanie, zapisujemy w mniejszej jednostce.",
          przyklad: "$450$ cm: $400$ cm to $4$ m, zostaje $50$ cm, czyli $4$ m $50$ cm. $3200$ m: $3000$ m to $3$ km, zostaje $200$ m, czyli $3$ km $200$ m.",
          uwaga: "$245$ cm to $2$ m $45$ cm, a nie $2$ m $450$ cm. Reszta musi być mniejsza niż jedna większa jednostka.",
        },
        {
          nazwa: "Mierzenie i porównywanie",
          slownie: "Linijkę przykładamy tak, żeby początek odcinka był przy zerze. Wynik czytamy na końcu odcinka. Gdy porównujemy długości, zamieniamy je na tę samą jednostkę.",
          przyklad: "Odcinek od kreski $3$ cm do kreski $11$ cm ma $11 - 3 = 8$ cm. Porównajmy $2$ m i $190$ cm: $2$ m to $200$ cm, więc $2$ m jest dłuższe.",
          uwaga: "$80$ cm jest dłuższe niż $700$ mm, bo $700$ mm to tylko $70$ cm. Większa liczba nie zawsze oznacza dłuższy odcinek.",
        },
        {
          nazwa: "Dodawanie i odejmowanie długości",
          slownie: "Zanim dodamy albo odejmiemy długości, zamieniamy je na tę samą jednostkę (zwykle na mniejszą). Potem liczymy jak zwykłe liczby.",
          przyklad: "$1$ m $20$ cm $+ 85$ cm $= 120 + 85 = 205$ cm, czyli $2$ m $5$ cm. Z $2$ m odcinamy $45$ cm: $200 - 45 = 155$ cm.",
          uwaga: "Nie dodawaj metrów do centymetrów. $1$ m $+ 50$ cm to $100 + 50 = 150$ cm, a nie $51$.",
        },
      ],
      jak: [
        "Zapisz, w jakich jednostkach są dane i w jakiej jednostce ma być wynik.",
        "Zamień wszystkie długości na tę samą jednostkę: na mniejszą mnożymy, na większą bierzemy pełne jednostki.",
        "Wykonaj działanie: dodaj, odejmij albo porównaj liczby.",
        "Jeśli trzeba, zapisz wynik w dwóch jednostkach, na przykład w km i m.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Ile centymetrów ma $4$ m $35$ cm? **Wybierz właściwą odpowiedź.**",
          opcje: ["$39$ cm", "$4350$ cm", "$435$ cm", "$4035$ cm"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Zapisz $3050$ m w kilometrach i metrach. **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$ km $50$ m", "$3$ km $5$ m", "$30$ km $50$ m", "$3$ km $500$ m"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "Który z odcinków jest najkrótszy? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1$ m $5$ cm", "$1100$ mm", "$1$ m", "$98$ cm"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "Kawałek sznurka miał $2$ m. Odcięto z niego $45$ cm. Ile centymetrów sznurka zostało? **Wybierz właściwą odpowiedź.**",
          opcje: ["$245$ cm", "$155$ cm", "$165$ cm", "$195$ cm"],
          poprawna: 1,
        },
        {
          nr: "12",
          tresc: "Sprawdzamy zamiany jednostek. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$2$ km $= 2000$ m", litery: "PF", poprawna: 0 },
            { tekst: "$5$ m $= 50$ cm", litery: "PF", poprawna: 1 },
            { tekst: "$300$ mm $= 30$ cm", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Tomek przejechał rano na rowerze $2$ km $400$ m, a po południu $1$ km $850$ m. Ile metrów przejechał w ciągu całego dnia? Zapisz wynik w kilometrach i metrach. **Zapisz obliczenia.**",
          rozwiazanie: "Zamieniamy na metry: $2$ km $400$ m $= 2 \\cdot 1000 + 400 = 2400$ m oraz $1$ km $850$ m $= 1000 + 850 = 1850$ m.\n\nDodajemy: $2400 + 1850 = 4250$ m.\n\nZamieniamy na kilometry i metry: $4000$ m to $4$ km, zostaje $250$ m.\n\nOdpowiedź: Tomek przejechał $4250$ m, czyli $4$ km $250$ m.",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "Deska ma długość $2$ m $40$ cm. Ile kawałków po $30$ cm można z niej przyciąć? Ile centymetrów deski zostanie, jeśli ktoś odetnie $5$ takich kawałków? **Zapisz obliczenia.**",
          rozwiazanie: "Zamieniamy długość deski na centymetry: $2$ m $40$ cm $= 240$ cm.\n\nPytamy, ile razy $30$ mieści się w $240$: $240 : 30 = 24 : 3 = 8$. Sprawdzenie: $8 \\cdot 30 = 240$.\n\nPięć kawałków ma razem $5 \\cdot 30 = 150$ cm, więc zostanie $240 - 150 = 90$ cm.\n\nOdpowiedź: Z deski można przyciąć $8$ kawałków. Po odcięciu $5$ kawałków zostanie $90$ cm deski.",
        },
      ],
      generatory: [
        {
          id: "mierzenie-zamiana",
          nazwa: "Zamiana jednostek",
          opis: "Zamień długość na mniejszą albo na większą jednostkę (mm, cm, dm, m, km).",
          generuj(r) {
            const j = r.pick(JEDNOSTKI);
            const { duza, mala, f } = j;
            const krok = f === 1000 ? 10 : 1;
            const tryb = r.int(0, 3);
            const x = r.int(1, 12);
            const y = r.int(1, f / krok - 1) * krok;
            if (tryb === 0) {
              return {
                tresc: `Zamień $${x}$ ${duza} $${y}$ ${mala} na ${mala}.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Liczba: ${mala}` }],
                odpowiedz: { w: x * f + y },
                wynik: `$${x * f + y}$ ${mala}`,
                rozwiazanie: [`$1$ ${duza} to $${f}$ ${mala}, więc $${x}$ ${duza} to $${x} \\cdot ${f} = ${x * f}$ ${mala}.`, `Dodajemy resztę: $${x * f} + ${y} = ${x * f + y}$ ${mala}.`],
              };
            }
            if (tryb === 1) {
              const T = x * f + y;
              return {
                tresc: `Zapisz $${T}$ ${mala} w ${duza} i ${mala}.`,
                pola: [
                  { id: "a", typ: "liczba", etykieta: `Pełne ${duza}` },
                  { id: "b", typ: "liczba", etykieta: `Zostaje ${mala}` },
                ],
                odpowiedz: { a: x, b: y },
                wynik: `$${x}$ ${duza} $${y}$ ${mala}`,
                rozwiazanie: [
                  `Z $${T}$ ${mala} bierzemy tyle pełnych ${duza}, ile się da. $${x}$ ${duza} to $${x} \\cdot ${f} = ${x * f}$ ${mala}.`,
                  `Zostaje: $${T} - ${x * f} = ${y}$ ${mala}.`,
                  `Zatem $${T}$ ${mala} to $${x}$ ${duza} $${y}$ ${mala}.`,
                ],
              };
            }
            if (tryb === 2) {
              const z = r.int(2, 30);
              return {
                tresc: `Ile ${mala} ma $${z}$ ${duza}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Liczba: ${mala}` }],
                odpowiedz: { w: z * f },
                wynik: `$${z * f}$ ${mala}`,
                rozwiazanie: [`Zamieniamy na mniejszą jednostkę, więc mnożymy. W $1$ ${duza} jest $${f}$ ${mala}.`, `$${z} \\cdot ${f} = ${z * f}$ ${mala}.`],
              };
            }
            const z = r.int(2, 30);
            return {
              tresc: `Ile ${duza} ma $${z * f}$ ${mala}?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `Liczba: ${duza}` }],
              odpowiedz: { w: z },
              wynik: `$${z}$ ${duza}`,
              rozwiazanie: [`Zamieniamy na większą jednostkę, więc dzielimy. W $1$ ${duza} jest $${f}$ ${mala}.`, `$${z * f} : ${f} = ${z}$ ${duza}. Sprawdzenie: $${z} \\cdot ${f} = ${z * f}$.`],
            };
          },
        },
        {
          id: "mierzenie-dzialania",
          nazwa: "Dodaj i odejmij długości",
          opis: "Długości w różnych jednostkach: dodaj je, odejmij, odczytaj z linijki albo sprawdź, ile kawałków można uciąć.",
          generuj(r) {
            const tryb = r.int(0, 4);
            const co = r.pick(KAWALKI);
            if (tryb === 0) {
              const x = r.int(1, 6);
              const y = r.int(5, 95);
              const z = r.int(10, 99);
              const p = 100 * x + y;
              return {
                tresc: `Pierwszy kawałek ${co} ma $${x}$ m $${y}$ cm, a drugi $${z}$ cm. Ile centymetrów mają razem?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Razem w cm" }],
                odpowiedz: { w: p + z },
                wynik: `$${p + z}$ cm`,
                rozwiazanie: [`Zamieniamy na centymetry: $${x}$ m $${y}$ cm $= ${x} \\cdot 100 + ${y} = ${p}$ cm.`, `Dodajemy: $${p} + ${z} = ${p + z}$ cm.`],
              };
            }
            if (tryb === 1) {
              const A = r.int(2, 9);
              const b = r.int(5, 100 * A - 10);
              return {
                tresc: `Kawałek ${co} miał $${A}$ m. Odcięto z niego $${b}$ cm. Ile centymetrów zostało?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Zostało w cm" }],
                odpowiedz: { w: 100 * A - b },
                wynik: `$${100 * A - b}$ cm`,
                rozwiazanie: [`$${A}$ m $= ${A} \\cdot 100 = ${100 * A}$ cm.`, `Odejmujemy: $${100 * A} - ${b} = ${100 * A - b}$ cm.`],
              };
            }
            if (tryb === 2) {
              const imie = r.pick(["Adam", "Marek", "Jan", "Piotr", "Tomasz"]);
              const x = r.int(1, 6);
              const y = r.int(1, 19) * 50;
              const z = r.int(2, 30) * 50;
              const p = 1000 * x + y;
              return {
                tresc: `Pan ${imie} przeszedł rano $${x}$ km $${y}$ m, a po południu $${z}$ m. Ile metrów przeszedł razem?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Razem w m" }],
                odpowiedz: { w: p + z },
                wynik: `$${p + z}$ m`,
                rozwiazanie: [`Zamieniamy na metry: $${x}$ km $${y}$ m $= ${x} \\cdot 1000 + ${y} = ${p}$ m.`, `Dodajemy: $${p} + ${z} = ${p + z}$ m.`],
              };
            }
            if (tryb === 3) {
              const A = r.int(1, 6);
              const k = r.pick([10, 20, 25, 50]);
              return {
                tresc: `Z kawałka ${co} o długości $${A}$ m odcinamy części po $${k}$ cm. Ile takich części otrzymamy?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba części" }],
                odpowiedz: { w: (100 * A) / k },
                wynik: `$${(100 * A) / k}$`,
                rozwiazanie: [`$${A}$ m $= ${100 * A}$ cm.`, `Pytamy, ile razy $${k}$ mieści się w $${100 * A}$, więc dzielimy: $${100 * A} : ${k} = ${(100 * A) / k}$.`, `Sprawdzenie: $${(100 * A) / k} \\cdot ${k} = ${100 * A}$.`],
              };
            }
            const p = r.int(1, 9);
            const q = p + r.int(2, 15);
            return {
              tresc: `Odcinek zaczyna się na kresce $${p}$ cm linijki, a kończy na kresce $${q}$ cm. Ile centymetrów ma ten odcinek?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Długość w cm" }],
              odpowiedz: { w: q - p },
              wynik: `$${q - p}$ cm`,
              rozwiazanie: [`Odcinek nie zaczyna się od zera, więc od odczytu na końcu odejmujemy odczyt na początku.`, `$${q} - ${p} = ${q - p}$ cm.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3. Prostokąty i kwadraty
    {
      id: "prostokaty-kwadraty",
      nazwa: "Prostokąty i kwadraty",
      sciaga: [
        {
          nazwa: "Prostokąt",
          slownie: "Prostokąt ma cztery boki i cztery kąty proste, takie jak róg kartki. Boki leżące naprzeciw siebie są równe i równoległe.",
          przyklad: "Kartka, drzwi i ekran telewizora to prostokąty. W prostokącie $ABCD$ o bokach $6$ cm i $4$ cm mamy $|AB| = |CD| = 6$ cm oraz $|BC| = |AD| = 4$ cm.",
          uwaga: "Cztery boki to za mało. Czworokąt, który ma równe boki naprzeciw siebie, ale jego rogi nie są kątami prostymi, nie jest prostokątem.",
        },
        {
          nazwa: "Kwadrat",
          slownie: "Kwadrat to prostokąt, który ma wszystkie cztery boki równe. Wszystkie jego kąty są proste.",
          tex: "|AB|=|BC|=|CD|=|DA|",
          przyklad: "Kwadrat o boku $5$ cm: każdy z czterech boków ma $5$ cm.",
          uwaga: "Prostokąt o bokach $5$ cm i $6$ cm nie jest kwadratem. W kwadracie muszą być równe wszystkie boki, a nie tylko dwa.",
        },
        {
          nazwa: "Kwadrat jest prostokątem",
          slownie: "Kwadrat ma wszystko to, co ma prostokąt: cztery kąty proste i równe boki naprzeciw siebie. Dlatego każdy kwadrat jest prostokątem, ale nie każdy prostokąt jest kwadratem.",
          przyklad: "Kwadrat o boku $4$ cm to też prostokąt o bokach $4$ cm i $4$ cm. Prostokąt o bokach $4$ cm i $7$ cm nie jest kwadratem.",
          uwaga: "Nie mów, że kwadrat nie jest prostokątem. Jest jego szczególnym rodzajem.",
        },
        {
          nazwa: "Wierzchołki, boki, przekątne",
          slownie: "Wierzchołki nazywamy kolejnymi literami wzdłuż brzegu, na przykład $A$, $B$, $C$, $D$. Odcinek łączący dwa przeciwległe wierzchołki to przekątna. W prostokącie obie przekątne mają tę samą długość.",
          przyklad: "W prostokącie $ABCD$ przekątne to $AC$ i $BD$. Jeśli $|AC| = 10$ cm, to też $|BD| = 10$ cm.",
          uwaga: "$AB$ to bok, bo $A$ i $B$ są sąsiednie. $AC$ to przekątna, bo $A$ i $C$ leżą naprzeciw siebie.",
        },
        {
          nazwa: "Jak narysować prostokąt",
          slownie: "Rysujemy jeden bok linijką. Na jego końcach ekierką rysujemy kąty proste. Odmierzamy drugi bok na obu prostopadłych i łączymy końce.",
          przyklad: "Prostokąt $6$ cm na $4$ cm: rysujemy bok $6$ cm, na końcach odcinki prostopadłe po $4$ cm i łączymy ich końce czwartym bokiem.",
          uwaga: "Na końcu sprawdź, czy czwarty bok też ma $6$ cm. Jeśli nie, któryś kąt nie jest prosty.",
        },
      ],
      jak: [
        "Zapisz, jaką figurę masz (prostokąt czy kwadrat) i jakie boki są podane.",
        "Pamiętaj: w prostokącie boki naprzeciw siebie są równe, a w kwadracie wszystkie cztery boki są równe.",
        "Przy przekątnych: w prostokącie obie mają tę samą długość.",
        "Sprawdź, czy wszystkie cztery boki mają sensowne długości (przeciwległe takie same).",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Prostokąt $ABCD$ ma boki $|AB| = 9$ cm i $|BC| = 5$ cm. Ile centymetrów ma bok $CD$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$ cm", "$14$ cm", "$9$ cm", "$4$ cm"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "Który czworokąt na pewno jest kwadratem? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "Czworokąt o czterech kątach prostych i czterech bokach po $7$ cm.",
            "Czworokąt o czterech kątach prostych i bokach $7$ cm, $3$ cm, $7$ cm, $3$ cm.",
            "Czworokąt o czterech bokach po $7$ cm, ale bez kątów prostych.",
            "Czworokąt o bokach $7$ cm, $7$ cm, $5$ cm i $5$ cm.",
          ],
          poprawna: 0,
        },
        {
          nr: "17",
          tresc: "Prostokąt ma wierzchołki $K$, $L$, $M$ i $N$ (kolejno wzdłuż brzegu). Który odcinek jest jego przekątną? **Wybierz właściwą odpowiedź.**",
          opcje: ["$KL$", "$LM$", "$MN$", "$KM$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "Jedna przekątna prostokąta ma $13$ cm. Ile centymetrów ma druga przekątna? **Wybierz właściwą odpowiedź.**",
          opcje: ["$26$ cm", "$13$ cm", "$15$ cm", "$12$ cm"],
          poprawna: 1,
        },
        {
          nr: "19",
          tresc: "Rozważamy kwadraty i prostokąty. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Każdy kwadrat jest prostokątem.", litery: "PF", poprawna: 0 },
            { tekst: "Każdy prostokąt jest kwadratem.", litery: "PF", poprawna: 1 },
            { tekst: "Prostokąt o bokach $6$ cm i $6$ cm jest kwadratem.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Prostokąt $ABCD$ ma boki $|AB| = 12$ cm i $|BC| = 7$ cm. Podaj długości boków $CD$ i $AD$. Kwadrat $KLMN$ ma bok $9$ cm. Podaj długości wszystkich jego boków. **Zapisz obliczenia.**",
          rozwiazanie: "W prostokącie boki naprzeciw siebie są równe. Bok $CD$ leży naprzeciw boku $AB$, więc $|CD| = 12$ cm.\n\nBok $AD$ leży naprzeciw boku $BC$, więc $|AD| = 7$ cm.\n\nW kwadracie wszystkie boki są równe, więc $|KL| = |LM| = |MN| = |NK| = 9$ cm.\n\nOdpowiedź: $|CD| = 12$ cm, $|AD| = 7$ cm, a każdy bok kwadratu $KLMN$ ma $9$ cm.",
        },
        {
          nr: "21",
          punkty: 2,
          tresc: "Kwadrat ma bok $5$ cm. Prostokąt ma jeden bok też $5$ cm, a drugi o $3$ cm dłuższy. Ile centymetrów ma drugi bok prostokąta? Wyjaśnij, dlaczego ten prostokąt nie jest kwadratem. **Zapisz obliczenia.**",
          rozwiazanie: "Drugi bok jest o $3$ cm dłuższy od $5$ cm: $5 + 3 = 8$ cm.\n\nBoki prostokąta mają kolejno $5$ cm, $8$ cm, $5$ cm i $8$ cm.\n\nNie wszystkie boki są równe ($5$ cm to nie to samo co $8$ cm), więc to nie jest kwadrat.\n\nOdpowiedź: Drugi bok ma $8$ cm. Prostokąt nie jest kwadratem, bo jego boki nie są jednakowej długości.",
        },
      ],
      generatory: [
        {
          id: "prostokat-boki",
          nazwa: "Boki prostokąta",
          opis: "Oblicz długość brakującego boku prostokąta albo kwadratu.",
          generuj(r) {
            const [A, B, C, D] = r.pick(CZWORO);
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const a = r.int(2, 20);
              const b = r.intBez(2, 20, a);
              const pytaj = r.chance();
              return {
                tresc: `Prostokąt $${A}${B}${C}${D}$ ma boki $|${A}${B}| = ${a}$ cm i $|${B}${C}| = ${b}$ cm. Ile centymetrów ma bok $${pytaj ? `${C}${D}` : `${D}${A}`}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Długość w cm" }],
                odpowiedz: { w: pytaj ? a : b },
                wynik: `$${pytaj ? a : b}$ cm`,
                rozwiazanie: pytaj
                  ? [`W prostokącie boki naprzeciw siebie są równe. Bok $${C}${D}$ leży naprzeciw boku $${A}${B}$.`, `$|${C}${D}| = |${A}${B}| = ${a}$ cm.`]
                  : [`W prostokącie boki naprzeciw siebie są równe. Bok $${D}${A}$ leży naprzeciw boku $${B}${C}$.`, `$|${D}${A}| = |${B}${C}| = ${b}$ cm.`],
              };
            }
            if (tryb === 1) {
              const a = r.int(2, 30);
              const bok = r.pick([`${B}${C}`, `${C}${D}`, `${D}${A}`]);
              return {
                tresc: `Kwadrat $${A}${B}${C}${D}$ ma bok $|${A}${B}| = ${a}$ cm. Ile centymetrów ma bok $${bok}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Długość w cm" }],
                odpowiedz: { w: a },
                wynik: `$${a}$ cm`,
                rozwiazanie: [`W kwadracie wszystkie cztery boki są równe.`, `$|${bok}| = |${A}${B}| = ${a}$ cm.`],
              };
            }
            if (tryb === 2) {
              const a = r.int(2, 30);
              const d = r.int(2, 20);
              return {
                tresc: `Jeden bok prostokąta ma $${a}$ cm, a drugi jest o $${d}$ cm dłuższy. Ile centymetrów ma dłuższy bok?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Długość w cm" }],
                odpowiedz: { w: a + d },
                wynik: `$${a + d}$ cm`,
                rozwiazanie: [`„O $${d}$ cm dłuższy” to dodawanie: $${a} + ${d} = ${a + d}$ cm.`],
              };
            }
            const a = r.int(2, 15);
            const k = r.int(2, 5);
            return {
              tresc: `Jeden bok prostokąta ma $${a}$ cm, a drugi jest $${k}$ razy dłuższy. Ile centymetrów ma dłuższy bok?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Długość w cm" }],
              odpowiedz: { w: k * a },
              wynik: `$${k * a}$ cm`,
              rozwiazanie: [`„$${k}$ razy dłuższy” to mnożenie: $${k} \\cdot ${a} = ${k * a}$ cm.`],
            };
          },
        },
        {
          id: "prostokat-rozpoznaj",
          nazwa: "Kwadrat czy prostokąt",
          opis: "Rozpoznaj figurę po bokach i kątach albo skorzystaj z równych przekątnych i równych boków prostokąta.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const a = r.int(2, 12);
              const b = r.chance(0.35) ? a : r.intBez(2, 12, a);
              return {
                tresc: `Czworokąt ma cztery kąty proste. Jego kolejne boki mają długości $${a}$ cm, $${b}$ cm, $${a}$ cm i $${b}$ cm. Co to za figura?`,
                pola: [{ id: "w", typ: "wybor", etykieta: "Figura", opcje: ["Kwadrat", "Prostokąt, który nie jest kwadratem"] }],
                odpowiedz: { w: a === b ? 0 : 1 },
                wynik: a === b ? "Kwadrat" : "Prostokąt, który nie jest kwadratem",
                rozwiazanie: [
                  `Cztery kąty proste i boki naprzeciw siebie równe: to prostokąt.`,
                  a === b ? `Wszystkie boki mają po $${a}$ cm, więc to kwadrat.` : `Boki $${a}$ cm i $${b}$ cm są różne, więc to prostokąt, który nie jest kwadratem.`,
                ],
              };
            }
            const [A, B, C, D] = r.pick(CZWORO);
            if (tryb === 1) {
              const x = r.int(2, 40);
              const [P, Q] = r.chance() ? [`${A}${C}`, `${B}${D}`] : [`${B}${D}`, `${A}${C}`];
              return {
                tresc: `Prostokąt $${A}${B}${C}${D}$ ma przekątną $|${P}| = ${x}$ cm. Ile centymetrów ma druga przekątna, $${Q}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Długość w cm" }],
                odpowiedz: { w: x },
                wynik: `$${x}$ cm`,
                rozwiazanie: [`W prostokącie obie przekątne mają tę samą długość.`, `$|${Q}| = |${P}| = ${x}$ cm.`],
              };
            }
            const pary = [
              [`${A}${B}`, `${C}${D}`],
              [`${B}${C}`, `${D}${A}`],
              [`${C}${D}`, `${A}${B}`],
              [`${D}${A}`, `${B}${C}`],
            ];
            const [dany, szukany] = r.pick(pary);
            const kolejnosc = r.shuffle([szukany, [A, C].join(""), [B, D].join(""), pary.map((p) => p[0]).find((s) => s !== dany && s !== szukany)]);
            return {
              tresc: `Prostokąt ma wierzchołki $${A}$, $${B}$, $${C}$ i $${D}$ (kolejno wzdłuż brzegu). Który z podanych odcinków ma taką samą długość jak bok $${dany}$?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Bok", opcje: kolejnosc.map((s) => `$${s}$`) }],
              odpowiedz: { w: kolejnosc.indexOf(szukany) },
              wynik: `$${szukany}$`,
              rozwiazanie: [`W prostokącie równe są boki naprzeciw siebie.`, `Naprzeciw boku $${dany}$ leży bok $${szukany}$, więc to on ma taką samą długość. Pozostałe odcinki to przekątna albo bok sąsiedni.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4. Wielokąty
    {
      id: "wielokaty",
      nazwa: "Wielokąty",
      sciaga: [
        {
          nazwa: "Co to jest wielokąt",
          slownie: "Wielokąt ma brzeg złożony z odcinków, który zamyka się dookoła. Odcinki to boki, a miejsca, w których dwa boki się spotykają, to wierzchołki. Boków jest tyle samo, co wierzchołków.",
          przyklad: "Kartka ma cztery boki i cztery wierzchołki. Trójkąt ma trzy boki i trzy wierzchołki.",
          uwaga: "Koło nie jest wielokątem, bo jego brzeg jest krzywy, a nie z odcinków. Linia, która się nie zamyka, też nie tworzy wielokąta.",
        },
        {
          nazwa: "Nazwy wielokątów",
          slownie: "Nazwa wielokąta mówi, ile ma boków: trójkąt $3$, czworokąt $4$, pięciokąt $5$, sześciokąt $6$, siedmiokąt $7$, ośmiokąt $8$.",
          przyklad: "Znak STOP ma $8$ boków, więc jest ośmiokątem. Plaster miodu w ulu ma $6$ boków, więc jest sześciokątem.",
          uwaga: "Liczba w nazwie to liczba boków (i wierzchołków), a nie liczba przekątnych.",
        },
        {
          nazwa: "Przekątna wielokąta",
          slownie: "Przekątna to odcinek łączący dwa wierzchołki, które nie są sąsiednie. Z jednego wierzchołka nie prowadzimy przekątnych do niego samego ani do dwóch sąsiednich.",
          tex: "6-3=3",
          przyklad: "W sześciokącie z jednego wierzchołka wychodzą $6 - 3 = 3$ przekątne. W trójkącie przekątnych nie ma: $3 - 3 = 0$.",
          uwaga: "Boku nie nazywamy przekątną. Przekątna łączy wierzchołki, które nie leżą obok siebie.",
        },
        {
          nazwa: "Wszystkie przekątne",
          slownie: "Z każdego wierzchołka wychodzi o trzy przekątne mniej niż jest wierzchołków. Mnożymy to przez liczbę wierzchołków i dzielimy przez $2$, bo każdą przekątną policzyliśmy dwa razy: z obu końców.",
          tex: "(5-3)\\cdot 5:2=5",
          przyklad: "Pięciokąt: z jednego wierzchołka wychodzą $5 - 3 = 2$ przekątne. Dla pięciu wierzchołków $2 \\cdot 5 = 10$, a po podzieleniu przez $2$ mamy $5$ przekątnych.",
          uwaga: "Nie zapomnij o dzieleniu przez $2$. Bez niego policzysz każdą przekątną dwa razy.",
        },
      ],
      jak: [
        "Zamień nazwę wielokąta na liczbę boków (na przykład sześciokąt to $6$ boków).",
        "Boków i wierzchołków jest tyle samo.",
        "Przekątne z jednego wierzchołka: od liczby wierzchołków odejmij $3$.",
        "Wszystkie przekątne: pomnóż liczbę wierzchołków przez wynik z jednego wierzchołka i podziel przez $2$.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Który wielokąt ma osiem boków? **Wybierz właściwą odpowiedź.**",
          opcje: ["czworokąt", "siedmiokąt", "sześciokąt", "ośmiokąt"],
          poprawna: 3,
        },
        {
          nr: "23",
          tresc: "Która z podanych figur nie jest wielokątem? **Wybierz właściwą odpowiedź.**",
          opcje: ["kwadrat", "trójkąt", "koło", "sześciokąt"],
          poprawna: 2,
        },
        {
          nr: "24",
          tresc: "Ile przekątnych wychodzi z jednego wierzchołka siedmiokąta? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$5$", "$7$", "$3$"],
          poprawna: 0,
        },
        {
          nr: "25",
          tresc: "Ile wszystkich przekątnych ma pięciokąt? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$", "$5$", "$10$", "$3$"],
          poprawna: 1,
        },
        {
          nr: "26",
          tresc: "Rozważamy sześciokąt. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Sześciokąt ma $5$ wierzchołków.", litery: "PF", poprawna: 1 },
            { tekst: "Z jednego wierzchołka sześciokąta wychodzą $3$ przekątne.", litery: "PF", poprawna: 0 },
            { tekst: "Sześciokąt ma $9$ przekątnych.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Ile przekątnych wychodzi z jednego wierzchołka ośmiokąta? Ile wszystkich przekątnych ma ośmiokąt? **Zapisz obliczenia.**",
          rozwiazanie: "Z jednego wierzchołka nie prowadzimy przekątnych do niego samego i do dwóch sąsiednich, więc wychodzi ich $8 - 3 = 5$.\n\nWierzchołków jest $8$, więc $8 \\cdot 5 = 40$.\n\nKażdą przekątną policzyliśmy dwa razy (z obu końców), więc dzielimy przez $2$: $40 : 2 = 20$.\n\nOdpowiedź: Z jednego wierzchołka wychodzi $5$ przekątnych, a wszystkich jest $20$.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "Basia wycięła z papieru cztery figury: trójkąt, czworokąt, pięciokąt i sześciokąt. Ile boków mają razem wszystkie te figury? Ile mają razem wierzchołków? **Zapisz obliczenia.**",
          rozwiazanie: "Boków jest tyle, co w nazwie: trójkąt ma $3$, czworokąt $4$, pięciokąt $5$ i sześciokąt $6$.\n\nRazem: $3 + 4 + 5 + 6 = 18$ boków.\n\nWierzchołków jest tyle samo co boków, więc też $18$.\n\nOdpowiedź: Wszystkie figury mają razem $18$ boków i $18$ wierzchołków.",
        },
      ],
      generatory: [
        {
          id: "wielokaty-boki",
          nazwa: "Boki i wierzchołki",
          opis: "Ile boków albo wierzchołków ma wielokąt i jak się nazywa wielokąt o danej liczbie boków.",
          generuj(r) {
            const tryb = r.int(0, 2);
            const co = r.pick(["boków", "wierzchołków"]);
            if (tryb === 0) {
              const n = r.int(3, 8);
              return {
                tresc: `Ile ${co} ma ${WIELOKATY[n - 3]}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba" }],
                odpowiedz: { w: n },
                wynik: `$${n}$`,
                rozwiazanie: [`Nazwa „${WIELOKATY[n - 3]}” mówi, że wielokąt ma $${n}$ boków.`, `Wierzchołków jest tyle samo co boków, więc $${n}$.`],
              };
            }
            if (tryb === 1) {
              const n = r.int(3, 8);
              return {
                tresc: `Wielokąt ma $${n}$ ${co}. Jak się nazywa ten wielokąt?`,
                pola: [{ id: "w", typ: "wybor", etykieta: "Nazwa", opcje: WIELOKATY.slice(0, 6) }],
                odpowiedz: { w: n - 3 },
                wynik: WIELOKATY[n - 3],
                rozwiazanie: [`Boków i wierzchołków jest tyle samo, więc wielokąt ma $${n}$ boków.`, `Wielokąt o $${n}$ bokach to ${WIELOKATY[n - 3]}.`],
              };
            }
            const a = r.int(3, 8);
            const b = r.intBez(3, 8, a);
            return {
              tresc: `Ile ${co} mają razem ${WIELOKATY[a - 3]} i ${WIELOKATY[b - 3]}?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Razem" }],
              odpowiedz: { w: a + b },
              wynik: `$${a + b}$`,
              rozwiazanie: [`${wielka(WIELOKATY[a - 3])} ma $${a}$ boków, a ${WIELOKATY[b - 3]} ma $${b}$ boków. Wierzchołków jest tyle samo co boków.`, `Dodajemy: $${a} + ${b} = ${a + b}$.`],
            };
          },
        },
        {
          id: "wielokaty-przekatne",
          nazwa: "Przekątne",
          opis: "Ile przekątnych wychodzi z jednego wierzchołka, ile ich jest razem i ile wierzchołków ma wielokąt.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const n = r.int(4, 9);
              return {
                tresc: r.chance()
                  ? `Ile przekątnych wychodzi z jednego wierzchołka ${WIELOKATY_D[n - 3]}?`
                  : `Ile przekątnych można poprowadzić z jednego wierzchołka ${WIELOKATY_D[n - 3]}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba przekątnych" }],
                odpowiedz: { w: n - 3 },
                wynik: `$${n - 3}$`,
                rozwiazanie: [`Nie prowadzimy przekątnych do samego wierzchołka i do dwóch sąsiednich wierzchołków, czyli do $3$ wierzchołków.`, `$${n} - 3 = ${n - 3}$.`],
              };
            }
            if (tryb === 1) {
              const n = r.int(4, 9);
              const k = n - 3;
              return {
                tresc: r.chance() ? `Ile wszystkich przekątnych ma ${WIELOKATY[n - 3]}?` : `Ile jest wszystkich przekątnych ${WIELOKATY_D[n - 3]}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba przekątnych" }],
                odpowiedz: { w: (n * k) / 2 },
                wynik: `$${(n * k) / 2}$`,
                rozwiazanie: [
                  `Z jednego wierzchołka wychodzi $${n} - 3 = ${k}$ ${k === 1 ? "przekątna" : k < 5 ? "przekątne" : "przekątnych"}.`,
                  `Wierzchołków jest $${n}$, więc $${n} \\cdot ${k} = ${n * k}$.`,
                  `Każdą przekątną policzyliśmy dwa razy, więc dzielimy przez $2$: $${n * k} : 2 = ${(n * k) / 2}$.`,
                ],
              };
            }
            const k = r.int(1, 6);
            return {
              tresc: r.chance()
                ? `Z jednego wierzchołka wielokąta wychodzi $${k}$ ${k === 1 ? "przekątna" : k < 5 ? "przekątne" : "przekątnych"}. Ile wierzchołków ma ten wielokąt?`
                : `W pewnym wielokącie z każdego wierzchołka wychodzi $${k}$ ${k === 1 ? "przekątna" : k < 5 ? "przekątne" : "przekątnych"}. Ile wierzchołków ma ten wielokąt?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba wierzchołków" }],
              odpowiedz: { w: k + 3 },
              wynik: `$${k + 3}$`,
              rozwiazanie: [`Przekątne prowadzą do wszystkich wierzchołków oprócz trzech: samego wierzchołka i dwóch sąsiednich.`, `$${k} + 3 = ${k + 3}$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5. Obwód wielokąta
    {
      id: "obwod-wielokata",
      nazwa: "Obwód wielokąta",
      sciaga: [
        {
          nazwa: "Obwód wielokąta",
          slownie: "Obwód to suma długości wszystkich boków wielokąta. To tyle, ile miałby sznurek położony dookoła figury.",
          tex: "3+5+4=12",
          przyklad: "Trójkąt o bokach $3$ cm, $5$ cm i $4$ cm ma obwód $3 + 5 + 4 = 12$ cm.",
          uwaga: "Dodajemy wszystkie boki, a nie tylko dwa. Obwód jest długością, więc zapisujemy go w cm, m itd.",
        },
        {
          nazwa: "Obwód prostokąta",
          slownie: "Prostokąt ma dwa boki jednej długości i dwa boki drugiej. Obwód to dwa razy pierwszy bok plus dwa razy drugi, albo dwa razy suma dwóch sąsiednich boków.",
          tex: "2\\cdot 7+2\\cdot 3=20",
          przyklad: "Prostokąt o bokach $7$ cm i $3$ cm: $7 + 3 + 7 + 3 = 20$ cm. Krócej: $2 \\cdot (7 + 3) = 2 \\cdot 10 = 20$ cm.",
          uwaga: "Gdy dodasz tylko $7 + 3 = 10$, masz połowę obwodu. Trzeba jeszcze pomnożyć przez $2$.",
        },
        {
          nazwa: "Obwód kwadratu i figury o równych bokach",
          slownie: "Gdy wszystkie boki są równe, mnożymy długość jednego boku przez liczbę boków.",
          tex: "4\\cdot 6=24",
          przyklad: "Kwadrat o boku $6$ cm: $4 \\cdot 6 = 24$ cm. Sześciokąt o wszystkich bokach po $5$ cm: $6 \\cdot 5 = 30$ cm.",
          uwaga: "Kwadrat ma $4$ boki, a nie $2$. Policz, ile boków ma figura.",
        },
        {
          nazwa: "Brakujący bok",
          slownie: "Gdy znamy obwód, odejmujemy od niego znane boki. W kwadracie dzielimy obwód przez $4$. W prostokącie obwód podzielony przez $2$ to suma dwóch sąsiednich boków, a od niej odejmujemy znany bok.",
          tex: "26:2=13\\qquad 13-8=5",
          przyklad: "Prostokąt ma obwód $26$ cm, a jeden bok $8$ cm. Połowa obwodu to $26 : 2 = 13$ cm, a drugi bok to $13 - 8 = 5$ cm. Sprawdzenie: $2 \\cdot (8 + 5) = 26$.",
          uwaga: "Najpierw podziel obwód przez $2$, dopiero potem odejmij bok. Gdy od razu odejmiesz $8$ od $26$, nie dostaniesz boku.",
        },
        {
          nazwa: "Długości w różnych jednostkach",
          slownie: "Zanim dodamy boki, zamieniamy je na tę samą jednostkę. Najwygodniej na mniejszą, a wynik zamieniamy z powrotem na większą, gdy trzeba.",
          przyklad: "Prostokąt ma boki $2$ m i $50$ cm, czyli $200$ cm i $50$ cm. Obwód to $2 \\cdot 200 + 2 \\cdot 50 = 500$ cm, czyli $5$ m.",
          uwaga: "Nie dodawaj metrów do centymetrów. $2 + 50$ nie ma sensu, jeśli jedna liczba jest w m, a druga w cm.",
        },
      ],
      jak: [
        "Policz, ile boków ma figura, i zapisz długość każdego boku.",
        "Jeśli boki są w różnych jednostkach, zamień je na tę samą.",
        "Dodaj wszystkie boki albo skorzystaj ze skrótu: $2 \\cdot (\\text{dwa sąsiednie boki})$ dla prostokąta i $4 \\cdot \\text{bok}$ dla kwadratu.",
        "Gdy szukasz brakującego boku, odejmij od obwodu znane boki albo podziel obwód na równe części.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Trójkąt ma boki $6$ cm, $8$ cm i $9$ cm. Jaki jest jego obwód? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$ cm", "$23$ cm", "$48$ cm", "$17$ cm"],
          poprawna: 1,
        },
        {
          nr: "30",
          tresc: "Prostokąt ma boki $9$ cm i $4$ cm. Jaki jest jego obwód? **Wybierz właściwą odpowiedź.**",
          opcje: ["$13$ cm", "$36$ cm", "$17$ cm", "$26$ cm"],
          poprawna: 3,
        },
        {
          nr: "31",
          tresc: "Bok kwadratu ma $11$ cm. Jaki jest obwód tego kwadratu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$44$ cm", "$22$ cm", "$15$ cm", "$55$ cm"],
          poprawna: 0,
        },
        {
          nr: "32",
          tresc: "Pięciokąt ma wszystkie boki równe, każdy po $8$ cm. Jaki jest jego obwód? **Wybierz właściwą odpowiedź.**",
          opcje: ["$13$ cm", "$32$ cm", "$40$ cm", "$48$ cm"],
          poprawna: 2,
        },
        {
          nr: "33",
          tresc: "Obwód kwadratu wynosi $36$ cm. Ile centymetrów ma bok tego kwadratu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$ cm", "$9$ cm", "$18$ cm", "$32$ cm"],
          poprawna: 1,
        },
        {
          nr: "34",
          tresc: "Prostokątny ogródek ma boki $20$ m i $15$ m. Chcemy go ogrodzić siatką dookoła. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Potrzeba $70$ m siatki.", litery: "PF", poprawna: 0 },
            { tekst: "Obwód ogródka wynosi $35$ m.", litery: "PF", poprawna: 1 },
            { tekst: "Kwadratowy ogródek o boku $20$ m potrzebuje $80$ m siatki.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "35",
          punkty: 2,
          tresc: "Prostokątny obrus ma boki $1$ m $20$ cm i $80$ cm. Brzeg obrusa chcemy obszyć koronką. Ile centymetrów koronki potrzeba? Ile to metrów? **Zapisz obliczenia.**",
          rozwiazanie: "Zamieniamy długość na centymetry: $1$ m $20$ cm $= 100 + 20 = 120$ cm.\n\nObwód prostokąta: $2 \\cdot 120 + 2 \\cdot 80 = 240 + 160 = 400$ cm.\n\nZamieniamy na metry: $400$ cm to $4$ m.\n\nOdpowiedź: Potrzeba $400$ cm koronki, czyli $4$ m.",
        },
        {
          nr: "36",
          punkty: 3,
          tresc: "Prostokąt ma obwód $32$ cm. Jeden jego bok ma $11$ cm. Ile centymetrów ma sąsiedni bok? Ile centymetrów ma bok kwadratu o takim samym obwodzie? **Zapisz obliczenia.**",
          rozwiazanie: "Dwa sąsiednie boki prostokąta to połowa obwodu: $32 : 2 = 16$ cm.\n\nDrugi bok: $16 - 11 = 5$ cm. Sprawdzenie: $2 \\cdot (11 + 5) = 2 \\cdot 16 = 32$ cm.\n\nKwadrat ma $4$ równe boki, więc jego bok to $32 : 4 = 8$ cm. Sprawdzenie: $4 \\cdot 8 = 32$ cm.\n\nOdpowiedź: Sąsiedni bok prostokąta ma $5$ cm, a bok kwadratu ma $8$ cm.",
        },
      ],
      generatory: [
        {
          id: "obwod-oblicz",
          nazwa: "Oblicz obwód",
          opis: "Oblicz obwód prostokąta, kwadratu, trójkąta albo wielokąta o równych bokach.",
          generuj(r) {
            const tryb = r.int(0, 4);
            const jedn = r.pick(["cm", "m"]);
            if (tryb === 0) {
              const a = r.int(2, 30);
              const b = r.intBez(2, 30, a);
              return {
                tresc: `Prostokąt ma boki $${a}$ ${jedn} i $${b}$ ${jedn}. Oblicz jego obwód.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Obwód w ${jedn}` }],
                odpowiedz: { w: 2 * (a + b) },
                wynik: `$${2 * (a + b)}$ ${jedn}`,
                rozwiazanie: [`Prostokąt ma dwa boki po $${a}$ ${jedn} i dwa boki po $${b}$ ${jedn}.`, `$${a} + ${b} + ${a} + ${b} = ${2 * (a + b)}$ ${jedn}.`, `Krócej: $2 \\cdot (${a} + ${b}) = 2 \\cdot ${a + b} = ${2 * (a + b)}$.`],
              };
            }
            if (tryb === 1) {
              const a = r.int(2, 40);
              return {
                tresc: `Oblicz obwód kwadratu o boku $${a}$ ${jedn}.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Obwód w ${jedn}` }],
                odpowiedz: { w: 4 * a },
                wynik: `$${4 * a}$ ${jedn}`,
                rozwiazanie: [`Kwadrat ma $4$ równe boki.`, `$4 \\cdot ${a} = ${4 * a}$ ${jedn}.`],
              };
            }
            if (tryb === 2) {
              const a = r.int(3, 20);
              const b = r.int(3, 20);
              const c = r.int(Math.max(Math.abs(a - b) + 1, 3), Math.min(a + b - 1, 20));
              return {
                tresc: `Trójkąt ma boki $${a}$ ${jedn}, $${b}$ ${jedn} i $${c}$ ${jedn}. Oblicz jego obwód.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Obwód w ${jedn}` }],
                odpowiedz: { w: a + b + c },
                wynik: `$${a + b + c}$ ${jedn}`,
                rozwiazanie: [`Obwód to suma wszystkich boków.`, `$${a} + ${b} + ${c} = ${a + b + c}$ ${jedn}.`],
              };
            }
            if (tryb === 3) {
              const n = r.int(5, 8);
              const a = r.int(2, 15);
              return {
                tresc: `${wielka(WIELOKATY[n - 3])} ma wszystkie boki równe, każdy po $${a}$ ${jedn}. Oblicz jego obwód.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Obwód w ${jedn}` }],
                odpowiedz: { w: n * a },
                wynik: `$${n * a}$ ${jedn}`,
                rozwiazanie: [`${wielka(WIELOKATY[n - 3])} ma $${n}$ boków, a wszystkie są równe.`, `$${n} \\cdot ${a} = ${n * a}$ ${jedn}.`],
              };
            }
            const x = r.int(1, 5);
            const y = r.int(1, 19) * 5;
            const z = r.int(4, 18) * 5;
            const p = 100 * x + y;
            return {
              tresc: `Prostokąt ma boki $${x}$ m $${y}$ cm i $${z}$ cm. Oblicz jego obwód w centymetrach.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Obwód w cm" }],
              odpowiedz: { w: 2 * (p + z) },
              wynik: `$${2 * (p + z)}$ cm`,
              rozwiazanie: [`Zamieniamy na centymetry: $${x}$ m $${y}$ cm $= ${x} \\cdot 100 + ${y} = ${p}$ cm.`, `Obwód: $2 \\cdot ${p} + 2 \\cdot ${z} = ${2 * p} + ${2 * z} = ${2 * (p + z)}$ cm.`],
            };
          },
        },
        {
          id: "obwod-brakujacy-bok",
          nazwa: "Brakujący bok",
          opis: "Znasz obwód i część boków: oblicz brakujący bok kwadratu, prostokąta, trójkąta albo wielokąta o równych bokach.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const a = r.int(2, 30);
              return {
                tresc: `Obwód kwadratu wynosi $${4 * a}$ cm. Ile centymetrów ma bok tego kwadratu?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Bok w cm" }],
                odpowiedz: { w: a },
                wynik: `$${a}$ cm`,
                rozwiazanie: [`Kwadrat ma $4$ równe boki, więc dzielimy obwód przez $4$: $${4 * a} : 4 = ${a}$.`, `Sprawdzenie: $4 \\cdot ${a} = ${4 * a}$.`],
              };
            }
            if (tryb === 1) {
              const a = r.int(2, 25);
              const b = r.intBez(2, 25, a);
              const P = 2 * (a + b);
              return {
                tresc: `Prostokąt ma obwód $${P}$ cm. Jeden jego bok ma $${a}$ cm. Ile centymetrów ma sąsiedni bok?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Bok w cm" }],
                odpowiedz: { w: b },
                wynik: `$${b}$ cm`,
                rozwiazanie: [`Dwa sąsiednie boki to połowa obwodu: $${P} : 2 = ${a + b}$ cm.`, `Drugi bok: $${a + b} - ${a} = ${b}$ cm.`, `Sprawdzenie: $2 \\cdot (${a} + ${b}) = ${P}$.`],
              };
            }
            if (tryb === 2) {
              const n = r.int(5, 8);
              const a = r.int(2, 15);
              return {
                tresc: `Obwód ${WIELOKATY_D[n - 3]}, który ma wszystkie boki równe, wynosi $${n * a}$ cm. Ile centymetrów ma jeden bok?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Bok w cm" }],
                odpowiedz: { w: a },
                wynik: `$${a}$ cm`,
                rozwiazanie: [`Boków jest $${n}$ i wszystkie są równe, więc dzielimy: $${n * a} : ${n} = ${a}$.`, `Sprawdzenie: $${n} \\cdot ${a} = ${n * a}$.`],
              };
            }
            const a = r.int(3, 20);
            const b = r.int(3, 20);
            const c = r.int(Math.max(Math.abs(a - b) + 1, 3), Math.min(a + b - 1, 20));
            const P = a + b + c;
            return {
              tresc: `Obwód trójkąta wynosi $${P}$ cm. Dwa jego boki mają $${a}$ cm i $${b}$ cm. Ile centymetrów ma trzeci bok?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Bok w cm" }],
              odpowiedz: { w: c },
              wynik: `$${c}$ cm`,
              rozwiazanie: [`Znane boki razem: $${a} + ${b} = ${a + b}$ cm.`, `Od obwodu odejmujemy znane boki: $${P} - ${a + b} = ${c}$ cm.`, `Sprawdzenie: $${a} + ${b} + ${c} = ${P}$.`],
            };
          },
        },
      ],
    },
  ],
};
