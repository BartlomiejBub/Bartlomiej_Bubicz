// Klasa 7 (szkoła podstawowa) · rozdział VII „Układ współrzędnych” – Matematyka z kluczem 7 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Geometria kartki w kratkę (pola i odcinki na kratkach), punkty w układzie współrzędnych (także ujemne, ćwiartki, osie),
// długości i pola (boki równoległe do osi), odcinki ukośne z twierdzenia Pitagorasa, środek odcinka.
// Bez równań prostych i funkcji (to klasa 8 i liceum). Odpowiedzi z pierwiastkiem: współczynnik (k i m).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** Powtarza losowanie, aż f() zwróci zadanie (wartość różną od null). */
function probuj(f, proby = 2000) {
  for (let i = 0; i < proby; i++) {
    const w = f();
    if (w) return w;
  }
  throw new Error("Nie udało się wylosować zadania");
}

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });
const sq = (x) => `\\sqrt{${x}}`;
/** Liczba ujemna w nawiasie: nb(-3) = "(-3)". */
const nb = (v) => (v < 0 ? `(${v})` : `${v}`);
/** Punkt: (3, -2); gdy któraś współrzędna jest ułamkiem dziesiętnym (przecinek), średnik: (2{,}5; 3). */
const P = (x, y) => (`${x}${y}`.includes("{,}") ? `(${x};\\,${y})` : `(${x},\\,${y})`);
/** Poprawna polska forma po liczbie: pl(1, "kratkę", "kratki", "kratek"). */
const pl = (n, f1, f2, f5) => {
  const a = Math.abs(n);
  if (a === 1) return f1;
  const j = a % 10;
  const d = a % 100;
  return j >= 2 && j <= 4 && !(d >= 12 && d <= 14) ? f2 : f5;
};
const kr = (n) => `${n} ${pl(n, "kratkę", "kratki", "kratek")}`;
const jedn = (n) => `${n} ${pl(n, "jednostkę", "jednostki", "jednostek")}`;
/** Ułamek o mianowniku 1 lub 2 jako liczba dziesiętna z przecinkiem: 7{,}5. */
const dec = (v) => {
  if (v.d === 1) return String(v.n);
  if (v.d === 2) return `${v.n < 0 ? "-" : ""}${Math.floor(Math.abs(v.n) / 2)}{,}5`;
  return v.tex();
};
const calk = (n) => {
  let k = Math.floor(Math.sqrt(n));
  while (k * k > n) k--;
  while ((k + 1) * (k + 1) <= n) k++;
  return k;
};
/** Największy kwadrat dzielący n: n = k²·m. */
function rozloz(n) {
  let k = calk(n);
  while (n % (k * k)) k--;
  return { k, m: n / (k * k) };
}

/** Trójki pitagorejskie (a < b < c) z małymi liczbami. */
const TROJKI = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20]];

/** Losuje liczbę z [-zakres, zakres] i drugą: s i s+d (lub odwrotnie), obie w zakresie. Zwraca [pierwsza, druga]. */
function przesun(r, d, zakres) {
  const s = r.int(-zakres, zakres - d);
  return r.chance() ? [s, s + d] : [s + d, s];
}

const ZNAKI_CWIARTEK = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
const CWIARTKI = ["I", "II", "III", "IV"];
const dodatnia = (v) => (v > 0 ? "dodatnia" : v < 0 ? "ujemna" : "równa $0$");

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Geometria kartki w kratkę
    {
      id: "kartka-w-kratke",
      nazwa: "Geometria kartki w kratkę",
      sciaga: [
        {
          nazwa: "Pole figury na kratkach",
          slownie: "Gdy bok kratki ma $1$ cm, jedna kratka ma pole $1$ cm$^2$. Pole figury liczysz, dzieląc ją na prostokąty albo odejmując od dużego prostokąta kawałki, które wycięto.",
          tex: "P=a\\cdot b\\qquad P=P_1-P_2",
          litery: "$a$, $b$ – boki prostokąta, $P_1$ – pole dużego prostokąta, $P_2$ – pole wyciętego kawałka.",
          przyklad: "Prostokąt o bokach $6$ cm i $4$ cm ma pole $24$ cm$^2$. Wycięto z niego w rogu kwadrat o boku $2$ cm. Zostało $24-4=20$ cm$^2$.",
          uwaga: "Pole wyciętego kawałka odejmujemy, a nie dodajemy.",
        },
        {
          nazwa: "Trójkąt na kratkach",
          slownie: "Jeśli jeden bok trójkąta leży na linii kratki, to jest podstawą. Wysokość to liczba kratek od podstawy w górę do przeciwległego wierzchołka. Pole to połowa podstawy razy wysokość.",
          tex: "P=\\frac{1}{2}\\cdot a\\cdot h",
          litery: "$a$ – podstawa, $h$ – wysokość.",
          przyklad: "Podstawa ma $5$ cm, a wierzchołek leży $4$ cm nad nią. Wtedy $P=\\frac{1}{2}\\cdot5\\cdot4=10$ cm$^2$.",
          uwaga: "Wysokość mierzymy prosto w górę od podstawy, a nie wzdłuż skośnego boku.",
        },
        {
          nazwa: "Odcinek ukośny na kratkach",
          slownie: "Odcinek łączący dwa węzły kratki jest przeciwprostokątną trójkąta prostokątnego. Jego przyprostokątne biegną po liniach kratki. Policz kratki w poziomie i w pionie, a potem użyj twierdzenia Pitagorasa.",
          tex: "c^2=a^2+b^2",
          litery: "$a$ – liczba kratek w poziomie, $b$ – liczba kratek w pionie, $c$ – długość odcinka.",
          przyklad: "Odcinek idzie $5$ kratek w prawo i $12$ kratek w górę. Wtedy $c^2=25+144=169$, więc $c=13$ kratek. Gdy bok kratki ma $2$ cm, odcinek ma $26$ cm.",
          uwaga: "Nie liczymy kratek wzdłuż skosu. Długość $c$ jest też mniejsza niż $a+b$.",
        },
        {
          nazwa: "Przekątna kratki",
          slownie: "Przekątna kwadratu o boku $k$ ma długość $k\\sqrt2$. Tak jest też w kratce: odcinek idący $k$ kratek w prawo i $k$ kratek w górę ma $k\\sqrt2$ kratek.",
          tex: "d=k\\sqrt2",
          litery: "$k$ – bok kwadratu, $d$ – przekątna.",
          przyklad: "Odcinek idzie $3$ kratki w prawo i $3$ kratki w górę. Wtedy $d=3\\sqrt2\\approx4{,}2$ kratki.",
          uwaga: "Przekątna kwadratu $k\\times k$ nie ma $2k$. Jest krótsza, bo $\\sqrt2\\approx1{,}4$.",
        },
      ],
      jak: [
        "Sprawdź, ile ma bok kratki (np. $1$ cm albo $100$ m) i w jakich jednostkach masz podać wynik.",
        "Pole dziwnej figury: podziel ją na prostokąty i trójkąty albo odejmij wycięte części od dużego prostokąta.",
        "Odcinek ukośny: policz kratki w poziomie i w pionie, zapisz $c^2=a^2+b^2$ i wyciągnij pierwiastek.",
        "Na końcu pomnóż przez długość boku kratki, jeśli liczysz w kratkach, i sprawdź, czy wynik ma sens (skos jest krótszy niż $a+b$).",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Na kratkach (bok kratki ma $1$ cm) narysowano prostokąt o bokach $5$ cm i $4$ cm. W jednym rogu wycięto kwadrat o boku $2$ cm. Jakie jest pole powstałej figury? **Wybierz właściwą odpowiedź.**",
          opcje: ["$20$ cm$^2$", "$18$ cm$^2$", "$16$ cm$^2$", "$24$ cm$^2$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Trójkąt prostokątny narysowano na kratkach (bok kratki ma $1$ cm). Jego przyprostokątne leżą na liniach kratki i mają $6$ cm i $5$ cm. Jakie jest pole tego trójkąta? **Wybierz właściwą odpowiedź.**",
          opcje: ["$15$ cm$^2$", "$30$ cm$^2$", "$11$ cm$^2$", "$7{,}5$ cm$^2$"],
          poprawna: 0,
        },
        {
          nr: "3",
          tresc: "Punkty $A$ i $B$ leżą w węzłach kratki (bok kratki ma $1$ cm). Punkt $B$ leży o $8$ kratek na prawo i o $6$ kratek wyżej niż punkt $A$. Ile centymetrów ma odcinek $AB$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$ cm", "$48$ cm", "$\\sqrt{14}$ cm", "$10$ cm"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Odcinek idący $3$ kratki w prawo i $3$ kratki w górę ma długość $3\\sqrt2$ kratki.", litery: "PF", poprawna: 0 },
            { tekst: "Odcinek idący $5$ kratek w prawo i $12$ kratek w górę ma $17$ kratek.", litery: "PF", poprawna: 1 },
            { tekst: "Gdy bok kratki ma $1$ cm, trójkąt o podstawie $4$ cm leżącej na linii kratki i wysokości $3$ cm ma pole $6$ cm$^2$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "5",
          tresc: "Odcinek łączy dwa węzły kratki: idzie $3$ kratki w prawo i $2$ kratki w górę. Bok kratki ma $1$ cm. Ile centymetrów ma ten odcinek? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$ cm", "$\\sqrt{13}$ cm", "$\\sqrt5$ cm", "$13$ cm"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 3,
          tresc: "Działka narysowana na kratkach (bok kratki ma $1$ m) powstała z prostokąta o bokach $9$ m i $6$ m, z którego w dwóch przeciwległych rogach wycięto kwadraty o boku $2$ m. Oblicz pole i obwód działki. **Zapisz obliczenia.**",
          rozwiazanie: "Pole prostokąta: $9\\cdot6=54$ m$^2$. Pole jednego wyciętego kwadratu: $2\\cdot2=4$ m$^2$.\n\nWycięto dwa kwadraty, więc pole działki to $54-2\\cdot4=46$ m$^2$.\n\nObwód: wycięcie kwadratu w rogu zastępuje dwa boki o długości $2$ m innymi dwoma bokami o długości $2$ m. Obwód się więc nie zmienia i jest taki, jak obwód prostokąta: $2\\cdot9+2\\cdot6=30$ m.\n\nOdpowiedź: Działka ma pole $46$ m$^2$ i obwód $30$ m.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Punkty $A$ i $B$ leżą w węzłach kratki, w której bok kratki ma $2$ cm. Punkt $B$ leży o $9$ kratek na prawo i o $12$ kratek wyżej niż punkt $A$. Oblicz długość odcinka $AB$ w centymetrach. **Zapisz obliczenia.**",
          rozwiazanie: "Jedna kratka ma $2$ cm, więc poziomo odcinek ma $9\\cdot2=18$ cm, a pionowo $12\\cdot2=24$ cm.\n\nZ twierdzenia Pitagorasa: $|AB|^2=18^2+24^2=324+576=900$.\n\nStąd $|AB|=\\sqrt{900}=30$ cm.\n\nOdpowiedź: Odcinek $AB$ ma $30$ cm.",
        },
      ],
      generatory: [
        {
          id: "pole-na-kratkach",
          nazwa: "Pole na kratkach",
          opis: "Pole figury na kratkach: prostokąt z wyciętym rogiem, trójkąt prostokątny, trójkąt z podstawą na linii kratki albo dwa połączone prostokąty.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const W = r.int(6, 12);
              const H = r.int(5, 9);
              const w = r.int(2, W - 3);
              const h = r.int(2, H - 3);
              const p = W * H - w * h;
              return {
                tresc: `Na kratkach (bok kratki ma $1$ cm) narysowano prostokąt o bokach $${W}$ cm i $${H}$ cm. W jednym rogu wycięto prostokąt o bokach $${w}$ cm i $${h}$ cm. Oblicz pole powstałej figury (w cm$^2$).`,
                pola: [pole("w", "Pole (cm$^2$) $=$")],
                odpowiedz: { w: q(p) },
                wynik: `$${p}$ cm$^2$`,
                rozwiazanie: [
                  `Pole dużego prostokąta: $${W}\\cdot${H}=${W * H}$ cm$^2$.`,
                  `Pole wyciętego prostokąta: $${w}\\cdot${h}=${w * h}$ cm$^2$.`,
                  `Pole figury: $${W * H}-${w * h}=${p}$ cm$^2$.`,
                ],
              };
            }
            if (tryb === 1) {
              const a = r.int(3, 12);
              const b = r.int(3, 12);
              const p = q(a * b, 2);
              return {
                tresc: `Trójkąt prostokątny narysowano na kratkach (bok kratki ma $1$ cm). Jego przyprostokątne leżą na liniach kratki i mają $${a}$ cm i $${b}$ cm. Oblicz pole tego trójkąta (w cm$^2$).`,
                pola: [pole("w", "Pole (cm$^2$) $=$")],
                odpowiedz: { w: p },
                wynik: `$${dec(p)}$ cm$^2$`,
                rozwiazanie: [
                  `Jedna przyprostokątna jest podstawą, a druga wysokością.`,
                  `$P=\\frac{1}{2}\\cdot${a}\\cdot${b}=\\frac{${a * b}}{2}=${dec(p)}$ cm$^2$.`,
                ],
              };
            }
            if (tryb === 2) {
              const a = r.int(3, 12);
              const h = r.int(2, 9);
              const p = q(a * h, 2);
              return {
                tresc: `Trójkąt narysowano na kratkach (bok kratki ma $1$ cm). Jeden jego bok leży na linii kratki i ma $${a}$ cm. Przeciwległy wierzchołek leży $${h}$ cm nad tą linią. Oblicz pole tego trójkąta (w cm$^2$).`,
                pola: [pole("w", "Pole (cm$^2$) $=$")],
                odpowiedz: { w: p },
                wynik: `$${dec(p)}$ cm$^2$`,
                rozwiazanie: [
                  `Podstawa ma $${a}$ cm, a wysokość $${h}$ cm (liczymy prosto w górę od podstawy).`,
                  `$P=\\frac{1}{2}\\cdot${a}\\cdot${h}=\\frac{${a * h}}{2}=${dec(p)}$ cm$^2$.`,
                ],
              };
            }
            const A = r.int(5, 10);
            const B = r.int(3, 6);
            const C = r.int(2, 4);
            const D = r.int(2, 5);
            const p = A * B + C * D;
            return {
              tresc: `Figura na kratkach (bok kratki ma $1$ cm) składa się z dwóch prostokątów, które się nie nakładają. Pierwszy ma boki $${A}$ cm i $${B}$ cm, a drugi $${C}$ cm i $${D}$ cm. Oblicz pole całej figury (w cm$^2$).`,
              pola: [pole("w", "Pole (cm$^2$) $=$")],
              odpowiedz: { w: q(p) },
              wynik: `$${p}$ cm$^2$`,
              rozwiazanie: [
                `Pole pierwszego prostokąta: $${A}\\cdot${B}=${A * B}$ cm$^2$.`,
                `Pole drugiego prostokąta: $${C}\\cdot${D}=${C * D}$ cm$^2$.`,
                `Pole figury: $${A * B}+${C * D}=${p}$ cm$^2$.`,
              ],
            };
          },
        },
        {
          id: "odcinek-po-kratkach",
          nazwa: "Odcinek na kratkach",
          opis: "Długość odcinka między węzłami kratki, przekątna prostokąta, skrót na planie miasta albo przekątna kwadratu $k\\sqrt2$.",
          generuj(r) {
            const tryb = r.int(0, 3);
            const [a0, b0, c] = r.pick(TROJKI);
            const [a, b] = r.chance() ? [a0, b0] : [b0, a0];
            const hit = [
              `Odcinek $AB$ jest przeciwprostokątną trójkąta prostokątnego, którego przyprostokątne biegną po liniach kratki.`,
              `$|AB|^2=${a}^2+${b}^2=${a * a}+${b * b}=${c * c}$.`,
            ];
            if (tryb === 0) {
              const prawo = r.pick(["na prawo", "na lewo"]);
              const gora = r.pick(["wyżej", "niżej"]);
              return {
                tresc: `Punkty $A$ i $B$ leżą w węzłach kratki (bok kratki ma $1$ cm). Punkt $B$ leży o ${kr(a)} ${prawo} i o ${kr(b)} ${gora} niż punkt $A$. Ile centymetrów ma odcinek $AB$?`,
                pola: [pole("w", "$|AB|=$")],
                odpowiedz: { w: q(c) },
                wynik: `$${c}$ cm`,
                rozwiazanie: [...hit, `$|AB|=${sq(c * c)}=${c}$ cm.`],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Prostokąt narysowany na kratkach ma boki $${a}$ cm i $${b}$ cm (bok kratki ma $1$ cm). Ile centymetrów ma jego przekątna?`,
                pola: [pole("w", "Przekątna (cm) $=$")],
                odpowiedz: { w: q(c) },
                wynik: `$${c}$ cm`,
                rozwiazanie: [
                  `Przekątna prostokąta jest przeciwprostokątną trójkąta o przyprostokątnych $${a}$ cm i $${b}$ cm.`,
                  `$d^2=${a}^2+${b}^2=${a * a}+${b * b}=${c * c}$.`,
                  `$d=${sq(c * c)}=${c}$ cm.`,
                ],
              };
            }
            if (tryb === 2) {
              const oszcz = (a + b - c) * 100;
              return {
                tresc: `Na planie miasta ulice tworzą kratę, a bok kwadratowego kwartału ma $100$ m. Marek musi dojść ulicami $${a}$ ${pl(a, "kwartał", "kwartały", "kwartałów")} na wschód i $${b}$ ${pl(b, "kwartał", "kwartały", "kwartałów")} na północ. Jest też ścieżka w linii prostej przez park. O ile metrów ścieżka jest krótsza od drogi ulicami?`,
                pola: [pole("w", "Różnica (m) $=$")],
                odpowiedz: { w: q(oszcz) },
                wynik: `$${oszcz}$ m`,
                rozwiazanie: [
                  `Ulicami Marek przejdzie $${a}\\cdot100+${b}\\cdot100=${(a + b) * 100}$ m.`,
                  `Ścieżka to przeciwprostokątna: $c^2=${a}^2+${b}^2=${c * c}$, więc $c=${c}$ kwartałów, czyli $${c * 100}$ m.`,
                  `Różnica: $${(a + b) * 100}-${c * 100}=${oszcz}$ m.`,
                ],
              };
            }
            const k = r.int(2, 12);
            return {
              tresc: `Odcinek łączy dwa węzły kratki: idzie ${kr(k)} w prawo i ${kr(k)} w górę (bok kratki ma $1$ cm). Jego długość można zapisać jako $k\\sqrt2$ cm. Podaj liczbę $k$.`,
              pola: [pole("w", "$k=$")],
              odpowiedz: { w: q(k) },
              wynik: `$${k}$`,
              rozwiazanie: [
                `Odcinek jest przekątną kwadratu o boku $${k}$ cm.`,
                `$d^2=${k}^2+${k}^2=${2 * k * k}$, więc $d=${sq(2 * k * k)}=${k}\\sqrt2$.`,
                `Zatem $k=${k}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Punkty w układzie współrzędnych
    {
      id: "punkty-w-ukladzie",
      nazwa: "Punkty w układzie współrzędnych",
      sciaga: [
        {
          nazwa: "Układ współrzędnych",
          slownie: "To dwie prostopadłe osie liczbowe. Oś $Ox$ jest pozioma, a oś $Oy$ pionowa. Przecinają się w punkcie $O=(0,\\,0)$. Punkt zapisujemy jako parę liczb: najpierw ruch w prawo lub w lewo, potem w górę lub w dół.",
          tex: "P=(x,\\,y)",
          litery: "$x$ – pierwsza współrzędna (w prawo lub w lewo od osi $Oy$), $y$ – druga współrzędna (w górę lub w dół od osi $Ox$).",
          przyklad: "$A=(3,\\,2)$: $3$ jednostki w prawo i $2$ w górę. $B=(-2,\\,-4)$: $2$ jednostki w lewo i $4$ w dół.",
          uwaga: "Kolejność ma znaczenie: $(3,\\,2)$ i $(2,\\,3)$ to dwa różne punkty.",
        },
        {
          nazwa: "Ćwiartki układu",
          slownie: "Osie dzielą płaszczyznę na cztery ćwiartki. Numerujemy je przeciwnie do ruchu wskazówek zegara, zaczynając od prawej górnej. O ćwiartce decydują znaki współrzędnych.",
          tex: "\\text{I}:\\ (+,\\,+)\\qquad\\text{II}:\\ (-,\\,+)\\qquad\\text{III}:\\ (-,\\,-)\\qquad\\text{IV}:\\ (+,\\,-)",
          przyklad: "Punkt $(-4,\\,3)$ ma pierwszą współrzędną ujemną, a drugą dodatnią, więc leży w II ćwiartce.",
          uwaga: "Punkty leżące na osiach nie należą do żadnej ćwiartki.",
        },
        {
          nazwa: "Punkty na osiach",
          slownie: "Punkt na osi $Ox$ ma drugą współrzędną równą $0$. Punkt na osi $Oy$ ma pierwszą współrzędną równą $0$. Początek układu leży na obu osiach.",
          tex: "Ox:\\ (a,\\,0)\\qquad Oy:\\ (0,\\,b)",
          przyklad: "Punkt $(5,\\,0)$ leży na osi $Ox$, a punkt $(0,\\,-3)$ na osi $Oy$.",
          uwaga: "Łatwo pomylić osie. Na osi $Ox$ zero jest na drugim miejscu, a na osi $Oy$ na pierwszym.",
        },
        {
          nazwa: "Odbicie i przesunięcie punktu",
          slownie: "Odbicie względem osi $Ox$ zmienia znak drugiej współrzędnej, a względem osi $Oy$ zmienia znak pierwszej. Przesuwając punkt, dodajesz liczby do współrzędnych: w prawo i w górę dodatnie, w lewo i w dół ujemne.",
          tex: "Ox:\\ (x,\\,-y)\\qquad Oy:\\ (-x,\\,y)",
          przyklad: "Punkt $(4,\\,-1)$ odbity względem osi $Oy$ to $(-4,\\,-1)$. Przesunięty o $3$ w lewo i $5$ w górę: $(4-3,\\,-1+5)=(1,\\,4)$.",
          uwaga: "Przy odbiciu względem osi $Ox$ zmienia się druga współrzędna, a pierwsza zostaje.",
        },
      ],
      jak: [
        "Czytając punkt $(x,\\,y)$, zacznij od początku układu: najpierw $x$ w poziomie, potem $y$ w pionie.",
        "Ćwiartkę wskażesz po znakach obu współrzędnych. Jeśli któraś jest zerem, punkt leży na osi.",
        "Przy przesunięciu dodaj do $x$ ruch w poziomie, a do $y$ ruch w pionie. Pamiętaj o znakach.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "W której ćwiartce układu współrzędnych leży punkt $A=(-4,\\,3)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["w I ćwiartce", "w II ćwiartce", "w III ćwiartce", "w IV ćwiartce"],
          poprawna: 1,
        },
        {
          nr: "9",
          tresc: "Który z podanych punktów leży na osi $Oy$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$(4,\\,0)$", "$(4,\\,4)$", "$(-3,\\,0)$", "$(0,\\,-3)$"],
          poprawna: 3,
        },
        {
          nr: "10",
          tresc: "Punkt $C$ leży $3$ jednostki na lewo od osi $Oy$ i $2$ jednostki poniżej osi $Ox$. Jakie ma współrzędne? **Wybierz właściwą odpowiedź.**",
          opcje: ["$(3,\\,2)$", "$(-2,\\,-3)$", "$(-3,\\,-2)$", "$(3,\\,-2)$"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Punkt $(0,\\,0)$ jest początkiem układu współrzędnych.", litery: "PF", poprawna: 0 },
            { tekst: "Punkt $(-2,\\,5)$ leży w IV ćwiartce.", litery: "PF", poprawna: 1 },
            { tekst: "Punkty $(1,\\,3)$ i $(3,\\,1)$ to ten sam punkt.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "12",
          tresc: "Punkt $A=(5,\\,-2)$ odbito względem osi $Ox$. Jakie współrzędne ma obraz punktu $A$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$(5,\\,2)$", "$(-5,\\,-2)$", "$(-5,\\,2)$", "$(2,\\,-5)$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Punkt $P=(-6,\\,4)$ przesunięto o $5$ jednostek w prawo, a potem o $7$ jednostek w dół. Otrzymano punkt $Q$. Podaj współrzędne punktu $Q$ i napisz, w której ćwiartce leży. **Zapisz obliczenia.**",
          rozwiazanie: "Ruch w prawo zwiększa pierwszą współrzędną: $-6+5=-1$.\n\nRuch w dół zmniejsza drugą współrzędną: $4-7=-3$.\n\nZatem $Q=(-1,\\,-3)$. Obie współrzędne są ujemne, więc punkt leży w III ćwiartce.\n\nOdpowiedź: $Q=(-1,\\,-3)$ i leży w III ćwiartce.",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "Punkt $M=(a,\\,b)$ leży w IV ćwiartce. W której ćwiartce leży punkt $N=(-a,\\,b)$, a w której punkt $K=(b,\\,a)$? **Zapisz uzasadnienie.**",
          rozwiazanie: "W IV ćwiartce pierwsza współrzędna jest dodatnia, a druga ujemna: $a>0$ i $b<0$.\n\nPunkt $N=(-a,\\,b)$: pierwsza współrzędna $-a$ jest ujemna, druga $b$ też. Zatem $N$ leży w III ćwiartce.\n\nPunkt $K=(b,\\,a)$: pierwsza współrzędna $b$ jest ujemna, druga $a$ dodatnia. Zatem $K$ leży w II ćwiartce.\n\nOdpowiedź: $N$ leży w III ćwiartce, a $K$ w II ćwiartce.",
        },
      ],
      generatory: [
        {
          id: "cwiartka",
          nazwa: "Ćwiartka lub oś",
          opis: "Gdzie leży punkt (ćwiartka albo oś) albo który z czterech punktów leży w podanej ćwiartce.",
          generuj(r) {
            if (r.chance(0.6)) {
              const rodzaj = r.pick([0, 0, 0, 1, 2]);
              let x = r.intBez(-9, 9, 0);
              let y = r.intBez(-9, 9, 0);
              if (rodzaj === 1) y = 0;
              if (rodzaj === 2) x = 0;
              const idx = rodzaj === 1 ? 4 : rodzaj === 2 ? 5 : ZNAKI_CWIARTEK.findIndex(([sx, sy]) => sx === Math.sign(x) && sy === Math.sign(y));
              const wynik = ["w I ćwiartce", "w II ćwiartce", "w III ćwiartce", "w IV ćwiartce", "na osi $Ox$", "na osi $Oy$"][idx];
              return {
                tresc: `Gdzie leży punkt $K=${P(x, y)}$ w układzie współrzędnych?`,
                pola: [{ id: "w", typ: "wybor", etykieta: "Położenie punktu", opcje: ["w I ćwiartce", "w II ćwiartce", "w III ćwiartce", "w IV ćwiartce", "na osi $Ox$", "na osi $Oy$"] }],
                odpowiedz: { w: idx },
                wynik,
                rozwiazanie: [
                  `Pierwsza współrzędna to $${x}$: jest ${dodatnia(x)}. Druga to $${y}$: jest ${dodatnia(y)}.`,
                  idx < 4
                    ? `Znaki $(${x > 0 ? "+" : "-"},\\,${y > 0 ? "+" : "-"})$ oznaczają ${CWIARTKI[idx]} ćwiartkę.`
                    : idx === 4 ? `Druga współrzędna jest równa $0$, więc punkt leży na osi $Ox$.` : `Pierwsza współrzędna jest równa $0$, więc punkt leży na osi $Oy$.`,
                ],
              };
            }
            const cel = r.int(0, 3);
            const kolej = r.shuffle([0, 1, 2, 3]);
            const pts = kolej.map((i) => {
              const [sx, sy] = ZNAKI_CWIARTEK[i];
              return { i, x: sx * r.int(1, 9), y: sy * r.int(1, 9) };
            });
            const dobry = pts.findIndex((p) => p.i === cel);
            return {
              tresc: `Który z punktów leży w ${CWIARTKI[cel]} ćwiartce układu współrzędnych?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Punkt", opcje: pts.map((p) => `$${P(p.x, p.y)}$`) }],
              odpowiedz: { w: dobry },
              wynik: `$${P(pts[dobry].x, pts[dobry].y)}$`,
              rozwiazanie: [
                ZNAKI_CWIARTEK[cel][0] === ZNAKI_CWIARTEK[cel][1]
                  ? `W ${CWIARTKI[cel]} ćwiartce obie współrzędne są ${ZNAKI_CWIARTEK[cel][0] > 0 ? "dodatnie" : "ujemne"}.`
                  : `W ${CWIARTKI[cel]} ćwiartce pierwsza współrzędna jest ${ZNAKI_CWIARTEK[cel][0] > 0 ? "dodatnia" : "ujemna"}, a druga ${ZNAKI_CWIARTEK[cel][1] > 0 ? "dodatnia" : "ujemna"}.`,
                `Pasuje punkt $${P(pts[dobry].x, pts[dobry].y)}$.`,
              ],
            };
          },
        },
        {
          id: "odbicie-przesuniecie",
          nazwa: "Odbicie i przesunięcie",
          opis: "Współrzędne obrazu punktu po odbiciu względem osi $Ox$ albo $Oy$ albo po przesunięciu o podaną liczbę jednostek.",
          generuj(r) {
            const x = r.intBez(-9, 9, 0);
            const y = r.intBez(-9, 9, 0);
            const tryb = r.int(0, 2);
            const polaXY = [pole("x", "$x'=$"), pole("y", "$y'=$")];
            if (tryb === 0) {
              return {
                tresc: `Punkt $A=${P(x, y)}$ odbito względem osi $Ox$ (osi poziomej). Podaj współrzędne obrazu $A'=(x',\\,y')$.`,
                pola: polaXY,
                odpowiedz: { x: q(x), y: q(-y) },
                wynik: `$A'=${P(x, -y)}$`,
                rozwiazanie: [
                  `Odbicie względem osi $Ox$ zmienia znak drugiej współrzędnej, a pierwsza zostaje.`,
                  `$x'=${x}$ oraz $y'=-(${y})=${-y}$.`,
                ],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Punkt $B=${P(x, y)}$ odbito względem osi $Oy$ (osi pionowej). Podaj współrzędne obrazu $B'=(x',\\,y')$.`,
                pola: polaXY,
                odpowiedz: { x: q(-x), y: q(y) },
                wynik: `$B'=${P(-x, y)}$`,
                rozwiazanie: [
                  `Odbicie względem osi $Oy$ zmienia znak pierwszej współrzędnej, a druga zostaje.`,
                  `$x'=-(${x})=${-x}$ oraz $y'=${y}$.`,
                ],
              };
            }
            const p = r.int(1, 8);
            const s = r.int(1, 8);
            const lewo = r.chance();
            const gora = r.chance();
            const dx = lewo ? -p : p;
            const dy = gora ? s : -s;
            return {
              tresc: `Punkt $C=${P(x, y)}$ przesunięto o ${jedn(p)} w ${lewo ? "lewo" : "prawo"} i o ${jedn(s)} w ${gora ? "górę" : "dół"}. Podaj współrzędne nowego punktu $C'=(x',\\,y')$.`,
              pola: polaXY,
              odpowiedz: { x: q(x + dx), y: q(y + dy) },
              wynik: `$C'=${P(x + dx, y + dy)}$`,
              rozwiazanie: [
                `Ruch w ${lewo ? "lewo zmniejsza" : "prawo zwiększa"} pierwszą współrzędną: $x'=${x}${dx < 0 ? "-" : "+"}${p}=${x + dx}$.`,
                `Ruch w ${gora ? "górę zwiększa" : "dół zmniejsza"} drugą współrzędną: $y'=${y}${dy < 0 ? "-" : "+"}${s}=${y + dy}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Długości i pola w układzie współrzędnych
    {
      id: "dlugosci-i-pola",
      nazwa: "Długości i pola w układzie współrzędnych",
      sciaga: [
        {
          nazwa: "Odcinek poziomy i pionowy",
          slownie: "Gdy końce odcinka mają taką samą drugą współrzędną, odcinek jest poziomy. Jego długość to odległość między pierwszymi współrzędnymi: większa liczba minus mniejsza. Gdy takie same są pierwsze współrzędne, odcinek jest pionowy i liczysz różnicę drugich.",
          tex: "|AB|=|x_B-x_A|\\qquad|AB|=|y_B-y_A|",
          litery: "Pierwszy wzór dla odcinka poziomego, drugi dla pionowego.",
          przyklad: "$A=(-3,\\,2)$ i $B=(4,\\,2)$. Druga współrzędna jest wspólna, więc $|AB|=4-(-3)=7$.",
          uwaga: "Przy liczbie ujemnej uważaj na znak: $4-(-3)=7$, a nie $1$.",
        },
        {
          nazwa: "Pole i obwód prostokąta",
          slownie: "Jeśli boki prostokąta są równoległe do osi, to jeden bok ma długość różnicy pierwszych współrzędnych, a drugi różnicy drugich. Takie wymiary pozwalają policzyć pole i obwód.",
          tex: "P=a\\cdot b\\qquad O=2a+2b",
          litery: "$a$, $b$ – boki prostokąta.",
          przyklad: "Przeciwległe wierzchołki to $A=(-2,\\,-1)$ i $C=(4,\\,3)$. Wtedy $a=4-(-2)=6$, $b=3-(-1)=4$, więc $P=24$ i $O=20$.",
          uwaga: "Pole to iloczyn boków, a nie iloczyn współrzędnych punktów.",
        },
        {
          nazwa: "Pole trójkąta z poziomym bokiem",
          slownie: "Gdy dwa wierzchołki mają taką samą drugą współrzędną, bok między nimi jest poziomy i jest podstawą. Wysokość to różnica drugiej współrzędnej trzeciego wierzchołka i drugiej współrzędnej podstawy.",
          tex: "P=\\frac{1}{2}\\cdot a\\cdot h",
          litery: "$a$ – podstawa, $h$ – wysokość.",
          przyklad: "$A=(-2,\\,0)$, $B=(4,\\,0)$, $C=(1,\\,-3)$. Podstawa $a=6$, wysokość $h=|{-3}-0|=3$, więc $P=\\frac{1}{2}\\cdot6\\cdot3=9$.",
          uwaga: "Pierwsza współrzędna punktu $C$ nie zmienia pola. Wysokość liczymy w pionie.",
        },
        {
          nazwa: "Czwarty wierzchołek prostokąta",
          slownie: "W prostokącie o bokach równoległych do osi wierzchołki powtarzają swoje współrzędne. Brakujący wierzchołek ma pierwszą współrzędną taką samą jak wierzchołek leżący nad nim albo pod nim, a drugą taką samą jak wierzchołek leżący obok.",
          przyklad: "$A=(1,\\,1)$, $B=(5,\\,1)$, $C=(5,\\,4)$. Wierzchołek $D$ leży nad $A$ i obok $C$, więc $D=(1,\\,4)$.",
          uwaga: "Warto zrobić szkic, bo łatwo pomylić, który wierzchołek jest obok, a który nad.",
        },
      ],
      jak: [
        "Sprawdź, czy dwa punkty mają takie same pierwsze albo drugie współrzędne. Wtedy odcinek jest pionowy albo poziomy.",
        "Długość takiego odcinka to większa liczba minus mniejsza. Z liczbami ujemnymi policz uważnie, np. $4-(-3)=7$.",
        "Pole prostokąta liczysz z dwóch różnic współrzędnych, a pole trójkąta z poziomym bokiem ze wzoru $\\frac{1}{2}\\cdot a\\cdot h$.",
        "Szkic z osiami i punktami pomaga znaleźć brakujący wierzchołek.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Jaką długość ma odcinek $AB$, jeśli $A=(-3,\\,2)$ i $B=(4,\\,2)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1$", "$7$", "$12$", "$-7$"],
          poprawna: 1,
        },
        {
          nr: "16",
          tresc: "Boki prostokąta $ABCD$ są równoległe do osi układu współrzędnych. Wierzchołki $A=(-2,\\,-1)$ i $C=(4,\\,3)$ są przeciwległe. Jakie jest pole tego prostokąta? **Wybierz właściwą odpowiedź.**",
          opcje: ["$20$", "$10$", "$24$", "$12$"],
          poprawna: 2,
        },
        {
          nr: "17",
          tresc: "Trójkąt $ABC$ ma wierzchołki $A=(1,\\,1)$, $B=(7,\\,1)$ i $C=(3,\\,5)$. Jakie jest pole tego trójkąta? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$", "$24$", "$18$", "$10$"],
          poprawna: 0,
        },
        {
          nr: "18",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Odcinek o końcach $(-5,\\,-2)$ i $(-5,\\,6)$ ma długość $8$.", litery: "PF", poprawna: 0 },
            { tekst: "Odcinek o końcach $(2,\\,3)$ i $(-4,\\,3)$ ma długość $2$.", litery: "PF", poprawna: 1 },
            { tekst: "Kwadrat o wierzchołkach $(0,\\,0)$, $(3,\\,0)$, $(3,\\,3)$ i $(0,\\,3)$ ma pole $9$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "19",
          tresc: "Trzy wierzchołki prostokąta $ABCD$ o bokach równoległych do osi to $A=(-1,\\,2)$, $B=(5,\\,2)$ i $C=(5,\\,-3)$. Jakie współrzędne ma wierzchołek $D$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-1,\\,3)$", "$(-3,\\,-1)$", "$(-5,\\,-3)$", "$(-1,\\,-3)$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Prostokąt $ABCD$ ma wierzchołki $A=(-4,\\,-2)$, $B=(3,\\,-2)$, $C=(3,\\,1)$ i $D=(-4,\\,1)$. Oblicz jego pole i obwód. **Zapisz obliczenia.**",
          rozwiazanie: "Bok $AB$ jest poziomy: $|AB|=3-(-4)=7$.\n\nBok $BC$ jest pionowy: $|BC|=1-(-2)=3$.\n\nPole: $7\\cdot3=21$. Obwód: $2\\cdot7+2\\cdot3=20$.\n\nOdpowiedź: Pole prostokąta to $21$, a obwód $20$.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Trójkąt $ABC$ ma wierzchołki $A=(-2,\\,1)$, $B=(6,\\,1)$ i $C=(0,\\,-5)$. a) Oblicz pole trójkąta $ABC$. b) Punkt $C$ zastąpiono punktem $C'=(5,\\,-7)$. Oblicz pole trójkąta $ABC'$. **Zapisz obliczenia.**",
          rozwiazanie: "a) Bok $AB$ jest poziomy: $|AB|=6-(-2)=8$. Wysokość to odległość punktu $C$ od prostej poziomej przez $A$ i $B$: $|1-(-5)|=6$. Pole: $\\frac{1}{2}\\cdot8\\cdot6=24$.\n\nb) Podstawa jest ta sama, $8$. Nowa wysokość: $|1-(-7)|=8$. Pole: $\\frac{1}{2}\\cdot8\\cdot8=32$.\n\nOdpowiedź: a) Pole to $24$. b) Pole to $32$.",
        },
      ],
      generatory: [
        {
          id: "dlugosc-rownolegla",
          nazwa: "Odcinek poziomy lub pionowy",
          opis: "Długość odcinka równoległego do jednej z osi, także gdy współrzędne są ujemne.",
          generuj(r) {
            const [n1, n2] = r.pick([["A", "B"], ["K", "L"], ["P", "Q"], ["M", "N"]]);
            const poziomy = r.chance();
            const wsp = r.int(-8, 8);
            const d = r.int(2, 14);
            const [u, v] = przesun(r, d, 9);
            const lo = Math.min(u, v);
            const hi = Math.max(u, v);
            const p1 = poziomy ? P(u, wsp) : P(wsp, u);
            const p2 = poziomy ? P(v, wsp) : P(wsp, v);
            return {
              tresc: `W układzie współrzędnych dane są punkty $${n1}=${p1}$ i $${n2}=${p2}$. Jaką długość ma odcinek $${n1}${n2}$ (w jednostkach osi)?`,
              pola: [pole("w", `$|${n1}${n2}|=$`)],
              odpowiedz: { w: q(d) },
              wynik: `$${d}$`,
              rozwiazanie: [
                poziomy ? `Oba punkty mają drugą współrzędną $${wsp}$, więc odcinek jest poziomy.` : `Oba punkty mają pierwszą współrzędną $${wsp}$, więc odcinek jest pionowy.`,
                `Długość to większa liczba minus mniejsza: $${hi}-${nb(lo)}=${d}$.`,
              ],
            };
          },
        },
        {
          id: "pole-w-ukladzie",
          nazwa: "Pole i obwód figury",
          opis: "Pole albo obwód prostokąta o bokach równoległych do osi albo pole trójkąta z bokiem równoległym do osi.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb < 2) {
              const [x1, x2] = przesun(r, r.int(2, 9), 8);
              const [y1, y2] = przesun(r, r.int(2, 8), 8);
              const a = Math.abs(x2 - x1);
              const b = Math.abs(y2 - y1);
              const pole1 = tryb === 0;
              const wart = pole1 ? a * b : 2 * a + 2 * b;
              return {
                tresc: `Boki prostokąta $ABCD$ są równoległe do osi układu współrzędnych. Wierzchołki $A=${P(x1, y1)}$ i $C=${P(x2, y2)}$ są przeciwległe. Oblicz ${pole1 ? "pole" : "obwód"} tego prostokąta.`,
                pola: [pole("w", pole1 ? "Pole $=$" : "Obwód $=$")],
                odpowiedz: { w: q(wart) },
                wynik: `$${wart}$`,
                rozwiazanie: [
                  `Jeden bok ma długość $|${x2}-${nb(x1)}|=${a}$, drugi $|${y2}-${nb(y1)}|=${b}$.`,
                  pole1 ? `Pole: $${a}\\cdot${b}=${wart}$.` : `Obwód: $2\\cdot${a}+2\\cdot${b}=${wart}$.`,
                ],
              };
            }
            const pion = r.chance(0.3);
            const [u1, u2] = przesun(r, r.int(2, 10), 8);
            const wsp = r.int(-8, 8);
            const w3 = r.intBez(-8, 8, wsp);
            const t3 = r.int(-8, 8);
            const a = Math.abs(u2 - u1);
            const h = Math.abs(w3 - wsp);
            const p = q(a * h, 2);
            const A = pion ? P(wsp, u1) : P(u1, wsp);
            const B = pion ? P(wsp, u2) : P(u2, wsp);
            const C = pion ? P(w3, t3) : P(t3, w3);
            return {
              tresc: `Trójkąt $ABC$ ma wierzchołki $A=${A}$, $B=${B}$ i $C=${C}$. Oblicz pole tego trójkąta.`,
              pola: [pole("w", "Pole $=$")],
              odpowiedz: { w: p },
              wynik: `$${dec(p)}$`,
              rozwiazanie: [
                pion
                  ? `Punkty $A$ i $B$ mają pierwszą współrzędną $${wsp}$, więc bok $AB$ jest pionowy: $|AB|=${a}$.`
                  : `Punkty $A$ i $B$ mają drugą współrzędną $${wsp}$, więc bok $AB$ jest poziomy: $|AB|=${a}$.`,
                `Wysokość to odległość punktu $C$ od tej prostej: $|${w3}-${nb(wsp)}|=${h}$.`,
                `$P=\\frac{1}{2}\\cdot${a}\\cdot${h}=${dec(p)}$.`,
              ],
            };
          },
        },
        {
          id: "czwarty-wierzcholek",
          nazwa: "Czwarty wierzchołek",
          opis: "Brakujący wierzchołek prostokąta o bokach równoległych do osi, gdy znasz trzy pozostałe.",
          generuj(r) {
            const [x1, x2] = przesun(r, r.int(2, 9), 8);
            const [y1, y2] = przesun(r, r.int(2, 9), 8);
            const V = [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];
            const nazwy = ["A", "B", "C", "D"];
            const brak = r.int(0, 3);
            const poz = brak ^ 1;
            const pio = 3 - brak;
            const dane = [0, 1, 2, 3].filter((i) => i !== brak).map((i) => `$${nazwy[i]}=${P(V[i][0], V[i][1])}$`);
            const [ex, ey] = V[brak];
            return {
              tresc: `Boki prostokąta $ABCD$ są równoległe do osi układu współrzędnych. Trzy jego wierzchołki to ${dane[0]}, ${dane[1]} i ${dane[2]}. Podaj współrzędne wierzchołka $${nazwy[brak]}=(x,\\,y)$.`,
              pola: [pole("x", "$x=$"), pole("y", "$y=$")],
              odpowiedz: { x: q(ex), y: q(ey) },
              wynik: `$${nazwy[brak]}=${P(ex, ey)}$`,
              rozwiazanie: [
                `Wierzchołek $${nazwy[brak]}$ leży na jednym poziomie z $${nazwy[poz]}$, więc ma tę samą drugą współrzędną: $y=${ey}$.`,
                `Leży też w jednej pionowej linii z $${nazwy[pio]}$, więc ma tę samą pierwszą współrzędną: $x=${ex}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Odcinki w układzie współrzędnych
    {
      id: "odcinki-w-ukladzie",
      nazwa: "Odcinki w układzie współrzędnych",
      sciaga: [
        {
          nazwa: "Długość odcinka ukośnego",
          slownie: "Odcinek $AB$ jest przeciwprostokątną trójkąta prostokątnego. Jego przyprostokątne to różnice współrzędnych w poziomie i w pionie. Potem używamy twierdzenia Pitagorasa.",
          tex: "a=|x_B-x_A|\\qquad b=|y_B-y_A|\\qquad|AB|=\\sqrt{a^2+b^2}",
          litery: "$a$ – różnica pierwszych współrzędnych, $b$ – różnica drugich współrzędnych.",
          przyklad: "$A=(-1,\\,1)$, $B=(4,\\,13)$. Mamy $a=5$, $b=12$, więc $|AB|^2=25+144=169$ i $|AB|=13$.",
          uwaga: "Nie dodawaj samych różnic: $5+12=17$, a odcinek ma $13$. Zawsze dodajemy kwadraty.",
        },
        {
          nazwa: "Długość z pierwiastkiem",
          slownie: "Gdy $a^2+b^2$ nie jest kwadratem liczby całkowitej, zostaw pierwiastek i uprość go: wyłącz największy kwadrat spod pierwiastka.",
          tex: "\\sqrt{45}=\\sqrt{9\\cdot5}=3\\sqrt5",
          przyklad: "$A=(0,\\,0)$, $B=(6,\\,3)$. Wtedy $|AB|^2=36+9=45$, więc $|AB|=\\sqrt{45}=3\\sqrt5$.",
          uwaga: "Nie zostawiaj $\\sqrt{45}$, jeśli da się uprościć. Sprawdź, czy $4$, $9$, $16$ lub $25$ dzieli liczbę pod pierwiastkiem.",
        },
        {
          nazwa: "Środek odcinka",
          slownie: "Środek odcinka leży w połowie drogi między końcami. Jego współrzędne to średnie arytmetyczne odpowiednich współrzędnych końców: dodajesz i dzielisz przez $2$.",
          tex: "x_S=\\frac{x_A+x_B}{2}\\qquad y_S=\\frac{y_A+y_B}{2}",
          litery: "$S$ – środek odcinka $AB$.",
          przyklad: "$A=(-5,\\,2)$, $B=(3,\\,6)$. Wtedy $x_S=\\frac{-5+3}{2}=-1$, $y_S=\\frac{2+6}{2}=4$, czyli $S=(-1,\\,4)$.",
          uwaga: "Współrzędne dodajemy, a nie odejmujemy. Wynik może być ułamkiem, np. $2{,}5$.",
        },
        {
          nazwa: "Drugi koniec odcinka",
          slownie: "Gdy znasz jeden koniec i środek, możesz znaleźć drugi koniec. Środek jest średnią końców, więc współrzędną końca $B$ dostajesz, mnożąc współrzędną środka przez $2$ i odejmując współrzędną końca $A$.",
          tex: "x_B=2x_S-x_A\\qquad y_B=2y_S-y_A",
          przyklad: "$S=(2,\\,1)$, $A=(-1,\\,4)$. Wtedy $x_B=2\\cdot2-(-1)=5$ i $y_B=2\\cdot1-4=-2$, czyli $B=(5,\\,-2)$.",
          uwaga: "Nie wystarczy dodać $S$ do $A$. Sprawdź wynik: średnia z $A$ i $B$ musi dać $S$.",
        },
      ],
      jak: [
        "Policz różnicę pierwszych współrzędnych $a$ i różnicę drugich współrzędnych $b$ (znaki nie mają znaczenia, bo potem podnosisz do kwadratu).",
        "Oblicz $|AB|^2=a^2+b^2$. Jeśli wynik jest kwadratem liczby całkowitej, wyciągnij pierwiastek. Jeśli nie, uprość pierwiastek.",
        "Środek odcinka: dodaj odpowiednie współrzędne końców i podziel każdą sumę przez $2$.",
        "Gdy szukasz końca odcinka, skorzystaj ze środka: $x_B=2x_S-x_A$. Na koniec sprawdź średnią.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Jaką długość ma odcinek $AB$, jeśli $A=(1,\\,2)$ i $B=(7,\\,10)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$", "$10$", "$48$", "$\\sqrt{14}$"],
          poprawna: 1,
        },
        {
          nr: "23",
          tresc: "Jaką długość ma odcinek $AB$, jeśli $A=(-3,\\,1)$ i $B=(1,\\,5)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$", "$32$", "$\\sqrt{8}$", "$4\\sqrt2$"],
          poprawna: 3,
        },
        {
          nr: "24",
          tresc: "Jakie współrzędne ma środek odcinka $AB$, jeśli $A=(-3,\\,4)$ i $B=(7,\\,-2)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$(2,\\,1)$", "$(4,\\,2)$", "$(-5,\\,3)$", "$(5,\\,-3)$"],
          poprawna: 0,
        },
        {
          nr: "25",
          tresc: "Punkt $S=(1,\\,-2)$ jest środkiem odcinka $AB$, a $A=(-3,\\,4)$. Jakie współrzędne ma punkt $B$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-1,\\,1)$", "$(-7,\\,10)$", "$(5,\\,-8)$", "$(2,\\,-3)$"],
          poprawna: 2,
        },
        {
          nr: "26",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Odcinek o końcach $(0,\\,0)$ i $(6,\\,8)$ ma długość $10$.", litery: "PF", poprawna: 0 },
            { tekst: "Środkiem odcinka o końcach $(-4,\\,-6)$ i $(2,\\,0)$ jest punkt $(-1,\\,3)$.", litery: "PF", poprawna: 1 },
            { tekst: "Odcinek o końcach $(0,\\,0)$ i $(2,\\,2)$ ma długość $2\\sqrt2$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Dane są punkty $A=(-2,\\,-1)$ i $B=(4,\\,7)$. Oblicz długość odcinka $AB$ i podaj współrzędne środka tego odcinka. **Zapisz obliczenia.**",
          rozwiazanie: "Różnice współrzędnych: $a=4-(-2)=6$ oraz $b=7-(-1)=8$.\n\n$|AB|^2=6^2+8^2=36+64=100$, więc $|AB|=10$.\n\nŚrodek: $x_S=\\frac{-2+4}{2}=1$ oraz $y_S=\\frac{-1+7}{2}=3$.\n\nOdpowiedź: $|AB|=10$, a środek odcinka to $S=(1,\\,3)$.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "Trójkąt $ABC$ ma wierzchołki $A=(-2,\\,-1)$, $B=(6,\\,-1)$ i $C=(6,\\,5)$. Oblicz obwód i pole tego trójkąta. **Zapisz obliczenia.**",
          rozwiazanie: "Bok $AB$ jest poziomy: $|AB|=6-(-2)=8$. Bok $BC$ jest pionowy: $|BC|=5-(-1)=6$.\n\nBok $AC$ jest ukośny: $|AC|^2=8^2+6^2=64+36=100$, więc $|AC|=10$.\n\nObwód: $8+6+10=24$.\n\nKąt przy wierzchołku $B$ jest prosty, więc pole to $\\frac{1}{2}\\cdot8\\cdot6=24$.\n\nOdpowiedź: Obwód trójkąta to $24$, a pole to $24$.",
        },
      ],
      generatory: [
        {
          id: "dlugosc-odcinka",
          nazwa: "Długość odcinka",
          opis: "Długość odcinka ukośnego o końcach w układzie współrzędnych (przyprostokątne tworzą trójkę pitagorejską), także na planie miasta.",
          generuj(r) {
            const [a0, b0, c] = r.pick(TROJKI);
            const [a, b] = r.chance() ? [a0, b0] : [b0, a0];
            const [x1, x2] = przesun(r, a, 10);
            const [y1, y2] = przesun(r, b, 10);
            const plan = r.chance(0.35);
            const [n1, n2] = plan ? ["W_1", "W_2"] : r.pick([["A", "B"], ["K", "L"], ["P", "Q"]]);
            const tresc = plan
              ? `Na planie miasta w układzie współrzędnych (jednostka na osiach to $1$ km) stoją dwie wieże: $${n1}=${P(x1, y1)}$ i $${n2}=${P(x2, y2)}$. Jaka jest odległość między wieżami (w km)?`
              : `W układzie współrzędnych dane są punkty $${n1}=${P(x1, y1)}$ i $${n2}=${P(x2, y2)}$. Oblicz długość odcinka $${n1}${n2}$.`;
            return {
              tresc,
              pola: [pole("w", plan ? "Odległość (km) $=$" : `$|${n1}${n2}|=$`)],
              odpowiedz: { w: q(c) },
              wynik: plan ? `$${c}$ km` : `$${c}$`,
              rozwiazanie: [
                `Różnice współrzędnych: $a=|${x2}-${nb(x1)}|=${a}$ oraz $b=|${y2}-${nb(y1)}|=${b}$.`,
                `$|${n1}${n2}|^2=${a}^2+${b}^2=${a * a}+${b * b}=${c * c}$.`,
                `$|${n1}${n2}|=${sq(c * c)}=${c}$.`,
              ],
            };
          },
        },
        {
          id: "odcinek-z-pierwiastkiem",
          nazwa: "Długość z pierwiastkiem",
          opis: "Długość odcinka zapisana w postaci $k\\sqrt{m}$: podaj liczby $k$ i $m$.",
          generuj(r) {
            const { dx, dy, N, k, m } = probuj(() => {
              const dx = r.int(1, 9);
              const dy = r.int(1, 9);
              const N = dx * dx + dy * dy;
              const { k, m } = rozloz(N);
              return m > 1 ? { dx, dy, N, k, m } : null;
            });
            const [x1, x2] = przesun(r, dx, 9);
            const [y1, y2] = przesun(r, dy, 9);
            return {
              tresc: `Dane są punkty $A=${P(x1, y1)}$ i $B=${P(x2, y2)}$. Długość odcinka $AB$ zapisz w postaci $k\\sqrt{m}$, wyłączając jak największy czynnik przed pierwiastek ($k$ i $m$ są liczbami naturalnymi). Podaj $k$ i $m$.`,
              pola: [pole("k", "$k=$"), pole("m", "$m=$")],
              odpowiedz: { k: q(k), m: q(m) },
              wynik: `$|AB|=${k === 1 ? "" : k}${sq(m)}$`,
              rozwiazanie: [
                `Różnice współrzędnych: $a=|${x2}-${nb(x1)}|=${dx}$ oraz $b=|${y2}-${nb(y1)}|=${dy}$.`,
                `$|AB|^2=${dx}^2+${dy}^2=${dx * dx}+${dy * dy}=${N}$.`,
                k === 1
                  ? `Liczba $${N}$ nie ma czynnika będącego kwadratem, więc $|AB|=${sq(N)}$.`
                  : `$|AB|=${sq(N)}=${sq(`${k * k}\\cdot${m}`)}=${k}${sq(m)}$.`,
              ],
            };
          },
        },
        {
          id: "srodek-odcinka",
          nazwa: "Środek odcinka",
          opis: "Współrzędne środka odcinka o danych końcach (czasem wychodzi liczba z połówką).",
          generuj(r) {
            const { xa, xb, ya, yb } = probuj(() => {
              const xa = r.int(-9, 9);
              const xb = r.int(-9, 9);
              const ya = r.int(-9, 9);
              const yb = r.int(-9, 9);
              return xa === xb && ya === yb ? null : { xa, xb, ya, yb };
            });
            const sx = q(xa + xb, 2);
            const sy = q(ya + yb, 2);
            return {
              tresc: `Punkty $A=${P(xa, ya)}$ i $B=${P(xb, yb)}$ są końcami odcinka $AB$. Podaj współrzędne środka $S=(x,\\,y)$ tego odcinka.`,
              pola: [pole("x", "$x=$"), pole("y", "$y=$")],
              odpowiedz: { x: sx, y: sy },
              wynik: `$S=${P(dec(sx), dec(sy))}$`,
              rozwiazanie: [
                `Współrzędne środka to średnie współrzędnych końców.`,
                `$x=\\frac{${xa}+${nb(xb)}}{2}=\\frac{${xa + xb}}{2}=${dec(sx)}$.`,
                `$y=\\frac{${ya}+${nb(yb)}}{2}=\\frac{${ya + yb}}{2}=${dec(sy)}$.`,
              ],
            };
          },
        },
        {
          id: "drugi-koniec",
          nazwa: "Drugi koniec odcinka",
          opis: "Współrzędne końca $B$ odcinka, gdy znasz koniec $A$ i środek $S$.",
          generuj(r) {
            const { xs, ys, xa, ya, xb, yb } = probuj(() => {
              const xs = r.int(-6, 6);
              const ys = r.int(-6, 6);
              const xa = r.int(-9, 9);
              const ya = r.int(-9, 9);
              const xb = 2 * xs - xa;
              const yb = 2 * ys - ya;
              return xb === xa && yb === ya ? null : { xs, ys, xa, ya, xb, yb };
            });
            return {
              tresc: `Punkt $S=${P(xs, ys)}$ jest środkiem odcinka $AB$, a $A=${P(xa, ya)}$. Podaj współrzędne punktu $B=(x,\\,y)$.`,
              pola: [pole("x", "$x=$"), pole("y", "$y=$")],
              odpowiedz: { x: q(xb), y: q(yb) },
              wynik: `$B=${P(xb, yb)}$`,
              rozwiazanie: [
                `Środek jest średnią końców, więc $x_B=2x_S-x_A$ oraz $y_B=2y_S-y_A$.`,
                `$x=2\\cdot${nb(xs)}-${nb(xa)}=${xb}$.`,
                `$y=2\\cdot${nb(ys)}-${nb(ya)}=${yb}$.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
