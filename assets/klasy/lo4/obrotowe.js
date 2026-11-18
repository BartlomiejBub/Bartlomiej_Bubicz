// Klasa 4 (liceum i technikum) · rozdział 4 „Geometria przestrzenna – bryły obrotowe” – Matematyka 4, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Bez rysunków: każdą bryłę opisano słowami. Bez przekrojów płaszczyzną (poza osiowym) – zgodnie z podstawą programową 2024.
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });

/** Powtarza losowanie, aż f() zwróci zadanie (wartość różną od null); f używa tego samego losownika, więc wynik jest powtarzalny. */
function probuj(f, proby = 3000) {
  for (let i = 0; i < proby; i++) {
    const w = f();
    if (w) return w;
  }
  throw new Error("Nie udało się wylosować zadania");
}

/** Trójki pitagorejskie (przyprostokątna, przyprostokątna, przeciwprostokątna). W każdej jedna przyprostokątna dzieli się przez 3. */
const TROJKI = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15]];

/** Liczba przed $\pi$ w LaTeX: 1 -> „\pi”, 36 -> „36\pi”, 32/3 -> „\frac{32}{3}\pi”. */
const piTex = (x) => {
  const v = Q.z(x);
  return v.eq(1) ? "\\pi" : `${v.tex()}\\pi`;
};

/** Końcówka polecenia: wynik w postaci k·π. */
const wynikPi = (jedn) => ` Wynik zapisz w postaci $k\\pi$ ${jedn} i wpisz liczbę $k$.`;

const CM2 = "cm$^2$";
const CM3 = "cm$^3$";

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Walec
    {
      id: "walec",
      nazwa: "Walec",
      sciaga: [
        {
          nazwa: "Walec i jego elementy",
          slownie: "Walec powstaje z obrotu prostokąta wokół jednego z jego boków. Ten bok to oś obrotu i wysokość walca $H$, a drugi bok (prostopadły do osi) zakreśla podstawę, czyli koło o promieniu $r$. Przekrój osiowy walca (płaszczyzną przez oś) jest prostokątem $2r\\times H$.",
          litery: "$r$ – promień podstawy, $H$ – wysokość walca (długość tworzącej).",
          przyklad: "Prostokąt $4\\times6$ cm obracamy wokół boku $6$ cm. Wtedy $H=6$ cm, a $r=4$ cm. Przekrój osiowy ma wymiary $8\\times6$ cm.",
          uwaga: "Promieniem jest bok prostopadły do osi, a nie ten, wokół którego obracamy. Gdy zmienisz oś obrotu, zmienią się $r$ i $H$.",
        },
        {
          nazwa: "Pole powierzchni walca",
          slownie: "Walec ma dwie podstawy (koła) i powierzchnię boczną. Pole całkowite to dwa pola podstaw plus pole powierzchni bocznej.",
          tex: "P_p=\\pi r^2\\qquad P_b=2\\pi rH\\qquad P_c=2P_p+P_b",
          litery: "$P_p$ – pole jednej podstawy, $P_b$ – pole powierzchni bocznej, $P_c$ – pole całkowite.",
          przyklad: "$r=3$ cm, $H=5$ cm. $P_p=9\\pi$, $P_b=2\\pi\\cdot3\\cdot5=30\\pi$, $P_c=2\\cdot9\\pi+30\\pi=48\\pi$ cm$^2$.",
          uwaga: "Podstawy są dwie, więc w $P_c$ liczymy $2\\pi r^2$, a nie $\\pi r^2$.",
        },
        {
          nazwa: "Siatka walca",
          slownie: "Gdy rozetniemy powierzchnię boczną walca wzdłuż tworzącej i rozłożymy, powstanie prostokąt. Jego jeden bok to obwód podstawy $2\\pi r$, a drugi to wysokość $H$.",
          tex: "P_b=2\\pi r\\cdot H",
          litery: "$2\\pi r$ – obwód podstawy, $H$ – wysokość walca.",
          przyklad: "Dla $r=2$ cm i $H=7$ cm prostokąt ma wymiary $4\\pi\\times7$ cm, więc $P_b=28\\pi$ cm$^2$.",
          uwaga: "Długość prostokąta to $2\\pi r$ (obwód koła), a nie sam promień.",
        },
        {
          nazwa: "Objętość walca",
          slownie: "Objętość walca to pole podstawy razy wysokość, tak samo jak w graniastosłupie.",
          tex: "V=\\pi r^2H",
          litery: "$V$ – objętość, $r$ – promień podstawy, $H$ – wysokość walca.",
          przyklad: "$r=3$ cm, $H=5$ cm. $V=\\pi\\cdot3^2\\cdot5=45\\pi$ cm$^3$.",
          uwaga: "Do kwadratu podnosimy tylko promień, a nie wysokość. Gdy podano średnicę, najpierw podziel ją przez $2$.",
        },
      ],
      jak: [
        "Ustal, które boki to promień $r$ i wysokość $H$ (przy obrocie prostokąta oś obrotu to $H$).",
        "Jeśli podano średnicę, podziel ją przez $2$, żeby dostać $r$.",
        "Wybierz wzór: $P_b=2\\pi rH$, $P_c=2\\pi r^2+2\\pi rH$ albo $V=\\pi r^2H$ i podstaw liczby.",
        "Wynik zostaw w postaci z $\\pi$ i dopisz jednostkę (cm$^2$ dla pól, cm$^3$ dla objętości).",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Prostokąt o bokach $3$ cm i $8$ cm obraca się wokół dłuższego boku. Jaką objętość ma powstały walec? **Wybierz właściwą odpowiedź.**",
          opcje: ["$72\\pi$ cm$^3$", "$192\\pi$ cm$^3$", "$24\\pi$ cm$^3$", "$48\\pi$ cm$^3$"],
          poprawna: 0,
        },
        {
          nr: "2",
          tresc: "Walec ma promień podstawy $4$ cm i wysokość $5$ cm. Jakie jest pole powierzchni bocznej tego walca? **Wybierz właściwą odpowiedź.**",
          opcje: ["$20\\pi$ cm$^2$", "$40\\pi$ cm$^2$", "$80\\pi$ cm$^2$", "$72\\pi$ cm$^2$"],
          poprawna: 1,
        },
        {
          nr: "3",
          tresc: "Średnica podstawy walca ma $6$ cm, a wysokość walca $10$ cm. Jakie jest pole powierzchni całkowitej tego walca? **Wybierz właściwą odpowiedź.**",
          opcje: ["$60\\pi$ cm$^2$", "$69\\pi$ cm$^2$", "$78\\pi$ cm$^2$", "$192\\pi$ cm$^2$"],
          poprawna: 2,
        },
        {
          nr: "4",
          tresc: "Przekrój osiowy walca jest kwadratem o boku $10$ cm. Jaka jest objętość tego walca? **Wybierz właściwą odpowiedź.**",
          opcje: ["$100\\pi$ cm$^3$", "$500\\pi$ cm$^3$", "$1000\\pi$ cm$^3$", "$250\\pi$ cm$^3$"],
          poprawna: 3,
        },
        {
          nr: "5",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Powierzchnia boczna walca po rozłożeniu na płaszczyźnie jest prostokątem o bokach $2\\pi r$ i $H$.", litery: "PF", poprawna: 0 },
            { tekst: "Jeśli promień podstawy walca podwoimy, a wysokość zostawimy bez zmian, to objętość też się podwoi.", litery: "PF", poprawna: 1 },
            { tekst: "Prostokąt o bokach $2$ cm i $5$ cm obracany wokół boku $5$ cm daje walec o promieniu $2$ cm i wysokości $5$ cm.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Prostokąt o bokach $6$ cm i $10$ cm obraca się najpierw wokół krótszego, a potem wokół dłuższego boku. Oblicz objętość każdego z powstałych walców i wskaż ten o większej objętości. **Zapisz obliczenia.**",
          rozwiazanie: "Obrót wokół boku $6$ cm: $H=6$ cm, $r=10$ cm. $V_1=\\pi\\cdot10^2\\cdot6=600\\pi$ cm$^3$.\n\nObrót wokół boku $10$ cm: $H=10$ cm, $r=6$ cm. $V_2=\\pi\\cdot6^2\\cdot10=360\\pi$ cm$^3$.\n\nPorównanie: $600\\pi>360\\pi$.\n\nOdpowiedź: Większą objętość ($600\\pi$ cm$^3$) ma walec powstały przy obrocie wokół krótszego boku. Drugi walec ma objętość $360\\pi$ cm$^3$.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Puszka ma kształt walca o średnicy $8$ cm i wysokości $12$ cm. Oblicz, ile centymetrów kwadratowych blachy potrzeba na całą puszkę (z dwoma denkami, bez zakładek). Wynik zapisz w postaci z $\\pi$. **Zapisz obliczenia.**",
          rozwiazanie: "Średnica ma $8$ cm, więc promień $r=8:2=4$ cm.\n\nPole jednego denka: $\\pi\\cdot4^2=16\\pi$ cm$^2$. Dwa denka: $2\\cdot16\\pi=32\\pi$ cm$^2$.\n\nPole powierzchni bocznej: $P_b=2\\pi\\cdot4\\cdot12=96\\pi$ cm$^2$.\n\nRazem: $P_c=32\\pi+96\\pi=128\\pi$ cm$^2$.\n\nOdpowiedź: Potrzeba $128\\pi$ cm$^2$ blachy.",
        },
      ],
      generatory: [
        {
          id: "walec-z-obrotu",
          nazwa: "Walec z obrotu prostokąta",
          opis: "Prostokąt obraca się wokół swojego boku. Ustal promień i wysokość walca i oblicz objętość albo pole powierzchni.",
          generuj(r) {
            const a = r.int(2, 9);
            const b = r.intBez(2, 9, a);
            const dl = Math.max(a, b);
            const kr = Math.min(a, b);
            const dluzszy = r.chance();
            const H = dluzszy ? dl : kr;
            const rr = dluzszy ? kr : dl;
            const [x, y] = r.chance() ? [a, b] : [b, a];
            const os = r.chance() ? `wokół ${dluzszy ? "dłuższego" : "krótszego"} boku` : `wokół boku długości $${H}$ cm`;
            const tryb = r.int(0, 2);
            const start = `Prostokąt o bokach $${x}$ cm i $${y}$ cm obraca się ${os}.`;
            const krokOs = `Oś obrotu ma $${H}$ cm, więc $H=${H}$ cm. Drugi bok jest promieniem podstawy: $r=${rr}$ cm.`;
            if (tryb === 0) {
              const k = rr * rr * H;
              return {
                tresc: `${start} Oblicz objętość powstałego walca.${wynikPi(CM3)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$V=${k}\\pi$ cm$^3$`,
                rozwiazanie: [krokOs, `$V=\\pi r^2H=\\pi\\cdot${rr}^2\\cdot${H}$.`, `$V=${k}\\pi$ cm$^3$.`],
              };
            }
            if (tryb === 1) {
              const k = 2 * rr * H;
              return {
                tresc: `${start} Oblicz pole powierzchni bocznej powstałego walca.${wynikPi(CM2)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$P_b=${k}\\pi$ cm$^2$`,
                rozwiazanie: [krokOs, `$P_b=2\\pi rH=2\\pi\\cdot${rr}\\cdot${H}$.`, `$P_b=${k}\\pi$ cm$^2$.`],
              };
            }
            const k = 2 * rr * rr + 2 * rr * H;
            return {
              tresc: `${start} Oblicz pole powierzchni całkowitej powstałego walca.${wynikPi(CM2)}`,
              pola: [pole("k", "$k=$")],
              odpowiedz: { k: q(k) },
              wynik: `$P_c=${k}\\pi$ cm$^2$`,
              rozwiazanie: [krokOs, `Dwie podstawy: $2\\pi r^2=2\\pi\\cdot${rr}^2=${2 * rr * rr}\\pi$. Powierzchnia boczna: $2\\pi rH=${2 * rr * H}\\pi$.`, `$P_c=${2 * rr * rr}\\pi+${2 * rr * H}\\pi=${k}\\pi$ cm$^2$.`],
            };
          },
        },
        {
          id: "walec-wzory",
          nazwa: "Pole i objętość walca",
          opis: "Walec dany promieniem (albo średnicą) i wysokością. Oblicz objętość lub pole, albo odwrotnie: wysokość z objętości lub pola bocznego.",
          generuj(r) {
            const tryb = r.int(0, 6);
            if (tryb === 0) {
              const rr = r.int(2, 9);
              const H = r.int(2, 12);
              const k = rr * rr * H;
              return {
                tresc: `Promień podstawy walca ma $${rr}$ cm, a wysokość walca $${H}$ cm. Oblicz objętość walca.${wynikPi(CM3)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$V=${k}\\pi$ cm$^3$`,
                rozwiazanie: [`$V=\\pi r^2H$.`, `$V=\\pi\\cdot${rr}^2\\cdot${H}=${k}\\pi$ cm$^3$.`],
              };
            }
            if (tryb === 1) {
              const rr = r.int(2, 9);
              const H = r.int(2, 12);
              const k = 2 * rr * H;
              return {
                tresc: `Walec ma promień podstawy $${rr}$ cm i wysokość $${H}$ cm. Oblicz pole powierzchni bocznej tego walca.${wynikPi(CM2)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$P_b=${k}\\pi$ cm$^2$`,
                rozwiazanie: [`$P_b=2\\pi rH$.`, `$P_b=2\\pi\\cdot${rr}\\cdot${H}=${k}\\pi$ cm$^2$.`],
              };
            }
            if (tryb === 2) {
              const rr = r.int(2, 8);
              const H = r.int(2, 12);
              const k = 2 * rr * rr + 2 * rr * H;
              return {
                tresc: `Średnica podstawy walca ma $${2 * rr}$ cm, a wysokość walca $${H}$ cm. Oblicz pole powierzchni całkowitej walca.${wynikPi(CM2)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$P_c=${k}\\pi$ cm$^2$`,
                rozwiazanie: [`Promień: $r=${2 * rr}:2=${rr}$ cm.`, `$P_c=2\\pi r^2+2\\pi rH=2\\pi\\cdot${rr}^2+2\\pi\\cdot${rr}\\cdot${H}$.`, `$P_c=${2 * rr * rr}\\pi+${2 * rr * H}\\pi=${k}\\pi$ cm$^2$.`],
              };
            }
            if (tryb === 3) {
              const rr = r.int(2, 7);
              const H = r.int(2, 12);
              const v = rr * rr * H;
              return {
                tresc: `Objętość walca o promieniu podstawy $${rr}$ cm wynosi $${v}\\pi$ cm$^3$. Oblicz wysokość tego walca (w cm).`,
                pola: [pole("H", "$H=$")],
                odpowiedz: { H: q(H) },
                wynik: `$H=${H}$ cm`,
                rozwiazanie: [`$V=\\pi r^2H$, więc $${v}\\pi=\\pi\\cdot${rr}^2\\cdot H$.`, `$${v}=${rr * rr}\\cdot H$, stąd $H=${v}:${rr * rr}=${H}$ cm.`],
              };
            }
            if (tryb === 4) {
              const rr = r.int(2, 9);
              const H = r.int(2, 12);
              const pb = 2 * rr * H;
              return {
                tresc: `Pole powierzchni bocznej walca o promieniu podstawy $${rr}$ cm wynosi $${pb}\\pi$ cm$^2$. Oblicz wysokość tego walca (w cm).`,
                pola: [pole("H", "$H=$")],
                odpowiedz: { H: q(H) },
                wynik: `$H=${H}$ cm`,
                rozwiazanie: [`$P_b=2\\pi rH$, więc $${pb}\\pi=2\\pi\\cdot${rr}\\cdot H$.`, `$${pb}=${2 * rr}\\cdot H$, stąd $H=${pb}:${2 * rr}=${H}$ cm.`],
              };
            }
            if (tryb === 5) {
              const m = r.int(1, 6);
              const s = 2 * m;
              const k = 2 * m * m * m;
              return {
                tresc: `Przekrój osiowy walca jest kwadratem o boku $${s}$ cm. Oblicz objętość tego walca.${wynikPi(CM3)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$V=${k}\\pi$ cm$^3$`,
                rozwiazanie: [`Przekrój osiowy to prostokąt $2r\\times H$. Jest kwadratem, więc $H=${s}$ cm i $2r=${s}$ cm, czyli $r=${m}$ cm.`, `$V=\\pi r^2H=\\pi\\cdot${m}^2\\cdot${s}=${k}\\pi$ cm$^3$.`],
              };
            }
            const rr = r.int(2, 7);
            const H = r.int(2, 12);
            const a = 2 * rr;
            const k = rr * rr * H;
            return {
              tresc: `Przekrój osiowy walca jest prostokątem o wymiarach $${a}$ cm i $${H}$ cm, przy czym $${a}$ cm to średnica podstawy. Oblicz objętość tego walca.${wynikPi(CM3)}`,
              pola: [pole("k", "$k=$")],
              odpowiedz: { k: q(k) },
              wynik: `$V=${k}\\pi$ cm$^3$`,
              rozwiazanie: [`Przekrój osiowy to prostokąt $2r\\times H$, więc $2r=${a}$ cm, czyli $r=${rr}$ cm, oraz $H=${H}$ cm.`, `$V=\\pi r^2H=\\pi\\cdot${rr}^2\\cdot${H}=${k}\\pi$ cm$^3$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Stożek
    {
      id: "stozek",
      nazwa: "Stożek",
      sciaga: [
        {
          nazwa: "Stożek i jego elementy",
          slownie: "Stożek powstaje z obrotu trójkąta prostokątnego wokół jednej z przyprostokątnych. Ta przyprostokątna jest wysokością $H$, druga jest promieniem podstawy $r$, a przeciwprostokątna jest tworzącą $l$. Z twierdzenia Pitagorasa wszystkie trzy są powiązane.",
          tex: "l^2=r^2+H^2",
          litery: "$r$ – promień podstawy, $H$ – wysokość, $l$ – tworząca (najdłuższy bok trójkąta).",
          przyklad: "Trójkąt o bokach $3$, $4$, $5$ cm obracamy wokół boku $4$ cm. Wtedy $H=4$ cm, $r=3$ cm, $l=5$ cm.",
          uwaga: "Tworząca $l$ jest zawsze dłuższa od wysokości $H$ i od promienia $r$.",
        },
        {
          nazwa: "Pole powierzchni stożka",
          slownie: "Stożek ma jedną podstawę (koło) i powierzchnię boczną, która po rozłożeniu jest wycinkiem koła o promieniu $l$. Pole boczne liczymy z promienia podstawy i tworzącej.",
          tex: "P_p=\\pi r^2\\qquad P_b=\\pi rl\\qquad P_c=\\pi r^2+\\pi rl",
          litery: "$P_p$ – pole podstawy, $P_b$ – pole powierzchni bocznej, $P_c$ – pole całkowite.",
          przyklad: "$r=3$ cm, $l=5$ cm. $P_p=9\\pi$, $P_b=\\pi\\cdot3\\cdot5=15\\pi$, $P_c=9\\pi+15\\pi=24\\pi$ cm$^2$.",
          uwaga: "W $P_b$ występuje tworząca $l$, a nie wysokość $H$.",
        },
        {
          nazwa: "Objętość stożka",
          slownie: "Objętość stożka to jedna trzecia objętości walca o tej samej podstawie i wysokości.",
          tex: "V=\\frac13\\pi r^2H",
          litery: "$r$ – promień podstawy, $H$ – wysokość stożka.",
          przyklad: "$r=3$ cm, $H=4$ cm. $V=\\frac13\\pi\\cdot3^2\\cdot4=12\\pi$ cm$^3$.",
          uwaga: "Nie zapomnij o $\\frac13$ i użyj wysokości $H$, a nie tworzącej $l$.",
        },
        {
          nazwa: "Przekrój osiowy i kąty",
          slownie: "Przekrój osiowy stożka to trójkąt równoramienny o podstawie $2r$, ramionach $l$ i wysokości $H$. Kąt $\\alpha$ między tworzącą a podstawą to kąt nachylenia tworzącej. Kąt rozwarcia $\\gamma$ to kąt przy wierzchołku tego trójkąta, czyli $\\gamma=180^\\circ-2\\alpha$.",
          tex: "\\cos\\alpha=\\frac{r}{l}\\qquad\\sin\\alpha=\\frac{H}{l}\\qquad\\operatorname{tg}\\alpha=\\frac{H}{r}",
          litery: "$\\alpha$ – kąt nachylenia tworzącej do podstawy, $\\gamma$ – kąt rozwarcia stożka.",
          przyklad: "Kąt rozwarcia $60^\\circ$ daje $\\alpha=60^\\circ$, więc przekrój osiowy jest trójkątem równobocznym i $l=2r$. Kąt rozwarcia $90^\\circ$ daje $\\alpha=45^\\circ$, więc $H=r$.",
          uwaga: "Kąt rozwarcia jest cały przy wierzchołku, a nie jego połowa.",
        },
      ],
      jak: [
        "Ustal $r$, $H$ i $l$. Przy obrocie trójkąta prostokątnego oś obrotu to $H$, drugi bok to $r$, a przeciwprostokątna to $l$.",
        "Brakujący z trzech odcinków policz z twierdzenia Pitagorasa: $l^2=r^2+H^2$.",
        "Gdy jest podany kąt, użyj $\\sin\\alpha$, $\\cos\\alpha$ albo $\\operatorname{tg}\\alpha$ w trójkącie prostokątnym z przekroju osiowego.",
        "Podstaw do wzoru: $P_b=\\pi rl$, $P_c=\\pi r(r+l)$ albo $V=\\frac13\\pi r^2H$ i zapisz wynik z $\\pi$ oraz jednostką.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Trójkąt prostokątny o przyprostokątnych $6$ cm i $8$ cm obraca się wokół krótszej przyprostokątnej. Jaką długość ma tworząca powstałego stożka? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$ cm", "$2\\sqrt{7}$ cm", "$10$ cm", "$48$ cm"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Stożek ma promień podstawy $5$ cm i wysokość $12$ cm. Jakie jest pole powierzchni bocznej tego stożka? **Wybierz właściwą odpowiedź.**",
          opcje: ["$60\\pi$ cm$^2$", "$65\\pi$ cm$^2$", "$130\\pi$ cm$^2$", "$90\\pi$ cm$^2$"],
          poprawna: 1,
        },
        {
          nr: "10",
          tresc: "Stożek ma promień podstawy $6$ cm i wysokość $5$ cm. Jaka jest objętość tego stożka? **Wybierz właściwą odpowiedź.**",
          opcje: ["$180\\pi$ cm$^3$", "$30\\pi$ cm$^3$", "$90\\pi$ cm$^3$", "$60\\pi$ cm$^3$"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "Przekrój osiowy stożka jest trójkątem równobocznym o boku $10$ cm. Jakie jest pole powierzchni całkowitej tego stożka? **Wybierz właściwą odpowiedź.**",
          opcje: ["$75\\pi$ cm$^2$", "$50\\pi$ cm$^2$", "$100\\pi$ cm$^2$", "$150\\pi$ cm$^2$"],
          poprawna: 0,
        },
        {
          nr: "12",
          tresc: "Kąt rozwarcia stożka ma miarę $90^\\circ$, a wysokość stożka ma $6$ cm. Jaki promień ma podstawa stożka? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$ cm", "$12$ cm", "$6$ cm", "$6\\sqrt{2}$ cm"],
          poprawna: 2,
        },
        {
          nr: "13",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Tworząca stożka jest zawsze dłuższa od jego wysokości.", litery: "PF", poprawna: 0 },
            { tekst: "Stożek o promieniu podstawy $3$ cm i wysokości $4$ cm ma pole powierzchni bocznej równe $12\\pi$ cm$^2$.", litery: "PF", poprawna: 1 },
            { tekst: "Stożek i walec o takich samych podstawach i takich samych wysokościach mają równe objętości.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "14",
          punkty: 2,
          tresc: "Tworząca stożka ma $17$ cm, a jego wysokość $15$ cm. Oblicz objętość tego stożka. **Zapisz obliczenia.**",
          rozwiazanie: "Z twierdzenia Pitagorasa: $r^2+H^2=l^2$, czyli $r^2+15^2=17^2$.\n\nStąd $r^2=289-225=64$, więc $r=8$ cm.\n\nObjętość: $V=\\frac13\\pi r^2H=\\frac13\\pi\\cdot64\\cdot15=320\\pi$ cm$^3$.\n\nOdpowiedź: Objętość stożka wynosi $320\\pi$ cm$^3$.",
        },
        {
          nr: "15",
          punkty: 3,
          tresc: "Tworząca stożka ma $12$ cm i tworzy z płaszczyzną podstawy kąt $60^\\circ$. Oblicz promień podstawy, wysokość, pole powierzchni bocznej i objętość tego stożka. **Zapisz obliczenia.**",
          rozwiazanie: "W trójkącie prostokątnym z przekroju osiowego tworząca $l=12$ cm jest przeciwprostokątną, a kąt $\\alpha=60^\\circ$ leży przy podstawie.\n\nPromień: $\\cos60^\\circ=\\frac{r}{l}$, więc $r=12\\cdot\\frac12=6$ cm.\n\nWysokość: $\\sin60^\\circ=\\frac{H}{l}$, więc $H=12\\cdot\\frac{\\sqrt3}{2}=6\\sqrt3$ cm.\n\nPole boczne: $P_b=\\pi rl=\\pi\\cdot6\\cdot12=72\\pi$ cm$^2$.\n\nObjętość: $V=\\frac13\\pi r^2H=\\frac13\\pi\\cdot36\\cdot6\\sqrt3=72\\sqrt3\\pi$ cm$^3$.\n\nOdpowiedź: $r=6$ cm, $H=6\\sqrt3$ cm, $P_b=72\\pi$ cm$^2$, $V=72\\sqrt3\\pi$ cm$^3$.",
        },
      ],
      generatory: [
        {
          id: "stozek-z-obrotu",
          nazwa: "Stożek z obrotu trójkąta",
          opis: "Trójkąt prostokątny obraca się wokół przyprostokątnej. Wyznacz $r$, $H$, $l$ i oblicz objętość albo pole powierzchni stożka.",
          generuj(r) {
            const [a, b, c] = r.pick(TROJKI);
            const dluzsza = r.chance();
            const H = dluzsza ? b : a;
            const rr = dluzsza ? a : b;
            const [x, y] = r.chance() ? [a, b] : [b, a];
            const os = r.chance() ? `wokół ${dluzsza ? "dłuższej" : "krótszej"} przyprostokątnej` : `wokół przyprostokątnej długości $${H}$ cm`;
            const tryb = r.int(0, 2);
            const start = `Trójkąt prostokątny o przyprostokątnych $${x}$ cm i $${y}$ cm obraca się ${os}.`;
            const kroki0 = [
              `Oś obrotu ma $${H}$ cm, więc $H=${H}$ cm, a $r=${rr}$ cm.`,
              `Tworząca z twierdzenia Pitagorasa: $l^2=${rr}^2+${H}^2=${rr * rr + H * H}$, więc $l=${c}$ cm.`,
            ];
            if (tryb === 0) {
              const k = (rr * rr * H) / 3;
              return {
                tresc: `${start} Oblicz objętość powstałego stożka.${wynikPi(CM3)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$V=${k}\\pi$ cm$^3$`,
                rozwiazanie: [kroki0[0], `$V=\\frac13\\pi r^2H=\\frac13\\pi\\cdot${rr}^2\\cdot${H}$.`, `$V=${k}\\pi$ cm$^3$.`],
              };
            }
            if (tryb === 1) {
              const k = rr * c;
              return {
                tresc: `${start} Oblicz pole powierzchni bocznej powstałego stożka.${wynikPi(CM2)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$P_b=${k}\\pi$ cm$^2$`,
                rozwiazanie: [...kroki0, `$P_b=\\pi rl=\\pi\\cdot${rr}\\cdot${c}=${k}\\pi$ cm$^2$.`],
              };
            }
            const k = rr * rr + rr * c;
            return {
              tresc: `${start} Oblicz pole powierzchni całkowitej powstałego stożka.${wynikPi(CM2)}`,
              pola: [pole("k", "$k=$")],
              odpowiedz: { k: q(k) },
              wynik: `$P_c=${k}\\pi$ cm$^2$`,
              rozwiazanie: [...kroki0, `$P_c=\\pi r^2+\\pi rl=${rr * rr}\\pi+${rr * c}\\pi$.`, `$P_c=${k}\\pi$ cm$^2$.`],
            };
          },
        },
        {
          id: "stozek-wzory",
          nazwa: "Wzory dla stożka",
          opis: "Stożek dany dwiema wielkościami z $r$, $H$, $l$. Oblicz brakującą długość, pole powierzchni lub objętość.",
          generuj(r) {
            const [a, b, c] = r.pick(TROJKI);
            const [rr, H] = r.chance() ? [a, b] : [b, a];
            const l = c;
            const tryb = r.int(0, 6);
            const pit = `$l^2=r^2+H^2$.`;
            if (tryb === 0) {
              return {
                tresc: `Promień podstawy stożka ma $${rr}$ cm, a wysokość stożka $${H}$ cm. Oblicz długość tworzącej tego stożka (w cm).`,
                pola: [pole("l", "$l=$")],
                odpowiedz: { l: q(l) },
                wynik: `$l=${l}$ cm`,
                rozwiazanie: [pit, `$l^2=${rr}^2+${H}^2=${rr * rr + H * H}$, stąd $l=${l}$ cm.`],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Promień podstawy stożka ma $${rr}$ cm, a tworząca stożka $${l}$ cm. Oblicz wysokość tego stożka (w cm).`,
                pola: [pole("H", "$H=$")],
                odpowiedz: { H: q(H) },
                wynik: `$H=${H}$ cm`,
                rozwiazanie: [`$H^2=l^2-r^2=${l}^2-${rr}^2=${l * l - rr * rr}$.`, `$H=${H}$ cm.`],
              };
            }
            if (tryb === 2) {
              const k = (rr * rr * H) / 3;
              return {
                tresc: `Promień podstawy stożka ma $${rr}$ cm, a wysokość stożka $${H}$ cm. Oblicz objętość tego stożka.${wynikPi(CM3)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$V=${k}\\pi$ cm$^3$`,
                rozwiazanie: [`$V=\\frac13\\pi r^2H=\\frac13\\pi\\cdot${rr}^2\\cdot${H}$.`, `$V=${k}\\pi$ cm$^3$.`],
              };
            }
            if (tryb === 3) {
              const k = (rr * rr * H) / 3;
              return {
                tresc: `Promień podstawy stożka ma $${rr}$ cm, a tworząca stożka $${l}$ cm. Oblicz objętość tego stożka.${wynikPi(CM3)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$V=${k}\\pi$ cm$^3$`,
                rozwiazanie: [`Wysokość: $H^2=${l}^2-${rr}^2=${l * l - rr * rr}$, więc $H=${H}$ cm.`, `$V=\\frac13\\pi r^2H=\\frac13\\pi\\cdot${rr}^2\\cdot${H}=${k}\\pi$ cm$^3$.`],
              };
            }
            if (tryb === 4) {
              const k = rr * l;
              return {
                tresc: `Promień podstawy stożka ma $${rr}$ cm, a wysokość stożka $${H}$ cm. Oblicz pole powierzchni bocznej tego stożka.${wynikPi(CM2)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$P_b=${k}\\pi$ cm$^2$`,
                rozwiazanie: [`Tworząca: $l^2=${rr}^2+${H}^2=${rr * rr + H * H}$, więc $l=${l}$ cm.`, `$P_b=\\pi rl=\\pi\\cdot${rr}\\cdot${l}=${k}\\pi$ cm$^2$.`],
              };
            }
            if (tryb === 5) {
              const k = rr * rr + rr * l;
              return {
                tresc: `Promień podstawy stożka ma $${rr}$ cm, a wysokość stożka $${H}$ cm. Oblicz pole powierzchni całkowitej tego stożka.${wynikPi(CM2)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$P_c=${k}\\pi$ cm$^2$`,
                rozwiazanie: [`Tworząca: $l^2=${rr}^2+${H}^2=${rr * rr + H * H}$, więc $l=${l}$ cm.`, `$P_c=\\pi r^2+\\pi rl=${rr * rr}\\pi+${rr * l}\\pi=${k}\\pi$ cm$^2$.`],
              };
            }
            const pb = rr * l;
            return {
              tresc: `Pole powierzchni bocznej stożka o promieniu podstawy $${rr}$ cm wynosi $${pb}\\pi$ cm$^2$. Oblicz wysokość tego stożka (w cm).`,
              pola: [pole("H", "$H=$")],
              odpowiedz: { H: q(H) },
              wynik: `$H=${H}$ cm`,
              rozwiazanie: [`$P_b=\\pi rl$, więc $${pb}\\pi=\\pi\\cdot${rr}\\cdot l$, stąd $l=${pb}:${rr}=${l}$ cm.`, `$H^2=l^2-r^2=${l}^2-${rr}^2=${l * l - rr * rr}$, więc $H=${H}$ cm.`],
            };
          },
        },
        {
          id: "stozek-katy",
          nazwa: "Stożek i kąty",
          opis: "Stożek opisany kątem rozwarcia albo kątem nachylenia tworzącej. Oblicz promień, wysokość, pole lub objętość.",
          generuj(r) {
            const tryb = r.int(0, 6);
            if (tryb <= 1) {
              const m = r.int(2, 9);
              const l = 2 * m;
              if (tryb === 0) {
                const k = 2 * m * m;
                return {
                  tresc: `Kąt rozwarcia stożka ma miarę $60^\\circ$, a tworząca stożka $${l}$ cm. Oblicz pole powierzchni bocznej tego stożka.${wynikPi(CM2)}`,
                  pola: [pole("k", "$k=$")],
                  odpowiedz: { k: q(k) },
                  wynik: `$P_b=${k}\\pi$ cm$^2$`,
                  rozwiazanie: [`Przekrój osiowy ma kąt $60^\\circ$ przy wierzchołku i ramiona $l$, więc jest trójkątem równobocznym: $2r=l=${l}$ cm, czyli $r=${m}$ cm.`, `$P_b=\\pi rl=\\pi\\cdot${m}\\cdot${l}=${k}\\pi$ cm$^2$.`],
                };
              }
              const k = 3 * m * m;
              return {
                tresc: `Kąt rozwarcia stożka ma miarę $60^\\circ$, a tworząca stożka $${l}$ cm. Oblicz pole powierzchni całkowitej tego stożka.${wynikPi(CM2)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$P_c=${k}\\pi$ cm$^2$`,
                rozwiazanie: [`Przekrój osiowy jest trójkątem równobocznym: $2r=l=${l}$ cm, czyli $r=${m}$ cm.`, `$P_c=\\pi r^2+\\pi rl=${m * m}\\pi+${m * l}\\pi=${k}\\pi$ cm$^2$.`],
              };
            }
            if (tryb <= 3) {
              const m = r.int(2, 9);
              const l = 2 * m;
              if (tryb === 2) {
                return {
                  tresc: `Tworząca stożka ma długość $${l}$ cm i tworzy z płaszczyzną podstawy kąt $60^\\circ$. Oblicz promień podstawy tego stożka (w cm).`,
                  pola: [pole("r", "$r=$")],
                  odpowiedz: { r: q(m) },
                  wynik: `$r=${m}$ cm`,
                  rozwiazanie: [`W trójkącie prostokątnym z przekroju osiowego: $\\cos60^\\circ=\\frac{r}{l}$.`, `$r=l\\cdot\\cos60^\\circ=${l}\\cdot\\frac12=${m}$ cm.`],
                };
              }
              const k = 2 * m * m;
              return {
                tresc: `Tworząca stożka ma długość $${l}$ cm i tworzy z płaszczyzną podstawy kąt $60^\\circ$. Oblicz pole powierzchni bocznej tego stożka.${wynikPi(CM2)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$P_b=${k}\\pi$ cm$^2$`,
                rozwiazanie: [`$\\cos60^\\circ=\\frac{r}{l}$, więc $r=${l}\\cdot\\frac12=${m}$ cm.`, `$P_b=\\pi rl=\\pi\\cdot${m}\\cdot${l}=${k}\\pi$ cm$^2$.`],
              };
            }
            if (tryb <= 5) {
              const m = r.int(2, 9);
              const l = 2 * m;
              if (tryb === 4) {
                return {
                  tresc: `Tworząca stożka ma długość $${l}$ cm i tworzy z płaszczyzną podstawy kąt $30^\\circ$. Oblicz wysokość tego stożka (w cm).`,
                  pola: [pole("H", "$H=$")],
                  odpowiedz: { H: q(m) },
                  wynik: `$H=${m}$ cm`,
                  rozwiazanie: [`W trójkącie prostokątnym z przekroju osiowego: $\\sin30^\\circ=\\frac{H}{l}$.`, `$H=l\\cdot\\sin30^\\circ=${l}\\cdot\\frac12=${m}$ cm.`],
                };
              }
              const k = m * m * m;
              return {
                tresc: `Tworząca stożka ma długość $${l}$ cm i tworzy z płaszczyzną podstawy kąt $30^\\circ$. Oblicz objętość tego stożka.${wynikPi(CM3)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$V=${k}\\pi$ cm$^3$`,
                rozwiazanie: [`$H=l\\cdot\\sin30^\\circ=${m}$ cm oraz $r=l\\cdot\\cos30^\\circ=${m}\\sqrt3$ cm, więc $r^2=${3 * m * m}$.`, `$V=\\frac13\\pi r^2H=\\frac13\\pi\\cdot${3 * m * m}\\cdot${m}=${k}\\pi$ cm$^3$.`],
              };
            }
            const h = 3 * r.int(1, 4);
            const k = (h * h * h) / 3;
            return {
              tresc: `Kąt rozwarcia stożka ma miarę $90^\\circ$, a wysokość stożka $${h}$ cm. Oblicz objętość tego stożka.${wynikPi(CM3)}`,
              pola: [pole("k", "$k=$")],
              odpowiedz: { k: q(k) },
              wynik: `$V=${k}\\pi$ cm$^3$`,
              rozwiazanie: [`Przekrój osiowy jest trójkątem prostokątnym równoramiennym, więc $\\alpha=45^\\circ$ i $r=H=${h}$ cm.`, `$V=\\frac13\\pi r^2H=\\frac13\\pi\\cdot${h}^2\\cdot${h}=${k}\\pi$ cm$^3$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Kula i sfera
    {
      id: "kula",
      nazwa: "Kula i sfera",
      sciaga: [
        {
          nazwa: "Kula i sfera",
          slownie: "Kula powstaje z obrotu półkola (albo koła) wokół średnicy. Sfera to sama powierzchnia kuli, a kula to sfera razem z wnętrzem. Wszystkie punkty sfery leżą w tej samej odległości $r$ od środka.",
          tex: "d=2r",
          litery: "$r$ – promień kuli (sfery), $d$ – średnica.",
          przyklad: "Piłka o średnicy $20$ cm ma promień $r=10$ cm. Jej powierzchnia to sfera.",
          uwaga: "Pole powierzchni liczymy dla sfery, a objętość dla kuli. Do wzorów wstawiamy promień, nie średnicę.",
        },
        {
          nazwa: "Pole sfery",
          slownie: "Pole powierzchni sfery jest cztery razy większe niż pole koła o tym samym promieniu.",
          tex: "P=4\\pi r^2",
          litery: "$P$ – pole powierzchni kuli (sfery), $r$ – promień.",
          przyklad: "$r=3$ cm: $P=4\\pi\\cdot9=36\\pi$ cm$^2$. Dla średnicy $10$ cm mamy $r=5$ cm i $P=100\\pi$ cm$^2$.",
          uwaga: "Wzór to $4\\pi r^2$, a nie $(4\\pi r)^2$, i podnosimy do kwadratu tylko $r$.",
        },
        {
          nazwa: "Objętość kuli",
          slownie: "Objętość kuli zależy od sześcianu promienia. Gdy podwoisz promień, objętość wzrośnie ośmiokrotnie.",
          tex: "V=\\frac43\\pi r^3",
          litery: "$V$ – objętość kuli, $r$ – promień.",
          przyklad: "$r=3$ cm: $V=\\frac43\\pi\\cdot27=36\\pi$ cm$^3$. Dla $r=6$ cm: $V=\\frac43\\pi\\cdot216=288\\pi$ cm$^3$.",
          uwaga: "W objętości jest $r^3$ (nie $r^2$) i ułamek $\\frac43$.",
        },
        {
          nazwa: "Promień z pola lub objętości",
          slownie: "Gdy dane jest pole albo objętość, wstaw je do wzoru i wyznacz $r$. Z pola wychodzi $r^2$, więc potrzebny jest pierwiastek kwadratowy. Z objętości wychodzi $r^3$, czyli szukamy liczby, której sześcian się zgadza.",
          tex: "r^2=\\frac{P}{4\\pi}\\qquad r^3=\\frac{3V}{4\\pi}",
          litery: "$P$ – pole sfery, $V$ – objętość kuli.",
          przyklad: "$P=100\\pi$: $r^2=25$, więc $r=5$. $V=288\\pi$: $r^3=\\frac{3\\cdot288}{4}=216$, więc $r=6$.",
          uwaga: "Dla pola szukamy liczby, której kwadrat jest równy $r^2$, a dla objętości – liczby, której sześcian jest równy $r^3$.",
        },
      ],
      jak: [
        "Ustal promień $r$ (gdy dana jest średnica, podziel ją przez $2$).",
        "Wybierz wzór: pole $4\\pi r^2$ albo objętość $\\frac43\\pi r^3$.",
        "Gdy szukasz promienia, wstaw dane do wzoru, wyznacz $r^2$ albo $r^3$ i znajdź $r$.",
        "Wynik zapisz z $\\pi$ i jednostką (cm$^2$ albo cm$^3$).",
      ],
      zadania: [
        {
          nr: "16",
          tresc: "Kula ma promień $6$ cm. Jaka jest objętość tej kuli? **Wybierz właściwą odpowiedź.**",
          opcje: ["$48\\pi$ cm$^3$", "$144\\pi$ cm$^3$", "$288\\pi$ cm$^3$", "$864\\pi$ cm$^3$"],
          poprawna: 2,
        },
        {
          nr: "17",
          tresc: "Sfera ma średnicę $10$ cm. Jakie jest pole powierzchni tej sfery? **Wybierz właściwą odpowiedź.**",
          opcje: ["$400\\pi$ cm$^2$", "$100\\pi$ cm$^2$", "$25\\pi$ cm$^2$", "$50\\pi$ cm$^2$"],
          poprawna: 1,
        },
        {
          nr: "18",
          tresc: "Pole powierzchni kuli wynosi $64\\pi$ cm$^2$. Jaki promień ma ta kula? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$ cm", "$8$ cm", "$16$ cm", "$4$ cm"],
          poprawna: 3,
        },
        {
          nr: "19",
          tresc: "Objętość kuli wynosi $288\\pi$ cm$^3$. Jakie jest pole powierzchni tej kuli? **Wybierz właściwą odpowiedź.**",
          opcje: ["$144\\pi$ cm$^2$", "$288\\pi$ cm$^2$", "$72\\pi$ cm$^2$", "$36\\pi$ cm$^2$"],
          poprawna: 0,
        },
        {
          nr: "20",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Pole powierzchni kuli o promieniu $r$ jest równe $4\\pi r^2$.", litery: "PF", poprawna: 0 },
            { tekst: "Gdy promień kuli podwoimy, jej objętość też się podwoi.", litery: "PF", poprawna: 1 },
            { tekst: "Pole powierzchni kuli jest cztery razy większe niż pole koła o tym samym promieniu.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "21",
          punkty: 2,
          tresc: "Piłka ma kształt kuli o średnicy $12$ cm. Oblicz objętość tej kuli i pole jej powierzchni. Wyniki zapisz w postaci z $\\pi$. **Zapisz obliczenia.**",
          rozwiazanie: "Promień: $r=12:2=6$ cm.\n\nObjętość: $V=\\frac43\\pi r^3=\\frac43\\pi\\cdot216=288\\pi$ cm$^3$.\n\nPole powierzchni: $P=4\\pi r^2=4\\pi\\cdot36=144\\pi$ cm$^2$.\n\nOdpowiedź: Objętość kuli to $288\\pi$ cm$^3$, a pole jej powierzchni to $144\\pi$ cm$^2$.",
        },
        {
          nr: "22",
          punkty: 3,
          tresc: "W walcu o promieniu podstawy $3$ cm i wysokości $6$ cm umieszczono kulę, która dotyka obu podstaw walca i jego powierzchni bocznej. Oblicz objętość części walca, której nie zajmuje kula, oraz jaką część objętości walca stanowi kula. **Zapisz obliczenia.**",
          rozwiazanie: "Kula dotyka podstaw i ścianki bocznej, więc jej promień jest równy promieniowi walca: $r=3$ cm (a wysokość walca to średnica kuli, $6$ cm).\n\nObjętość walca: $V_w=\\pi\\cdot3^2\\cdot6=54\\pi$ cm$^3$.\n\nObjętość kuli: $V_k=\\frac43\\pi\\cdot3^3=36\\pi$ cm$^3$.\n\nCzęść walca poza kulą: $54\\pi-36\\pi=18\\pi$ cm$^3$.\n\nKula stanowi $\\frac{36\\pi}{54\\pi}=\\frac23$ objętości walca.\n\nOdpowiedź: Poza kulą jest $18\\pi$ cm$^3$ walca, a kula stanowi $\\frac23$ jego objętości.",
        },
      ],
      generatory: [
        {
          id: "kula-wzory",
          nazwa: "Pole i objętość kuli",
          opis: "Oblicz pole lub objętość kuli z promienia albo średnicy, albo odwrotnie: promień z pola lub objętości.",
          generuj(r) {
            const tryb = r.int(0, 5);
            if (tryb === 0) {
              const rr = r.int(1, 12);
              const k = 4 * rr * rr;
              return {
                tresc: `Promień sfery ma $${rr}$ cm. Oblicz pole powierzchni tej sfery.${wynikPi(CM2)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$P=${k}\\pi$ cm$^2$`,
                rozwiazanie: [`$P=4\\pi r^2$.`, `$P=4\\pi\\cdot${rr}^2=${k}\\pi$ cm$^2$.`],
              };
            }
            if (tryb === 1) {
              const rr = r.int(1, 12);
              const k = 4 * rr * rr;
              return {
                tresc: `Średnica kuli ma $${2 * rr}$ cm. Oblicz pole powierzchni tej kuli.${wynikPi(CM2)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$P=${k}\\pi$ cm$^2$`,
                rozwiazanie: [`Promień: $r=${2 * rr}:2=${rr}$ cm.`, `$P=4\\pi r^2=4\\pi\\cdot${rr}^2=${k}\\pi$ cm$^2$.`],
              };
            }
            if (tryb === 2) {
              const rr = r.pick([3, 6, 9]);
              const k = (4 * rr * rr * rr) / 3;
              const zSrednicy = r.chance();
              return {
                tresc: `${zSrednicy ? `Średnica kuli ma $${2 * rr}$ cm.` : `Promień kuli ma $${rr}$ cm.`} Oblicz objętość tej kuli.${wynikPi(CM3)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$V=${k}\\pi$ cm$^3$`,
                rozwiazanie: [zSrednicy ? `Promień: $r=${2 * rr}:2=${rr}$ cm.` : `Promień: $r=${rr}$ cm.`, `$V=\\frac43\\pi r^3=\\frac43\\pi\\cdot${rr * rr * rr}$.`, `$V=${k}\\pi$ cm$^3$.`],
              };
            }
            if (tryb === 3) {
              const rr = r.int(2, 12);
              const p = 4 * rr * rr;
              return {
                tresc: `Pole powierzchni sfery wynosi $${p}\\pi$ cm$^2$. Oblicz promień tej sfery (w cm).`,
                pola: [pole("r", "$r=$")],
                odpowiedz: { r: q(rr) },
                wynik: `$r=${rr}$ cm`,
                rozwiazanie: [`$4\\pi r^2=${p}\\pi$, więc $r^2=${p}:4=${rr * rr}$.`, `$r=${rr}$ cm.`],
              };
            }
            if (tryb === 4) {
              const rr = r.int(2, 9);
              const v = q(4 * rr * rr * rr, 3);
              return {
                tresc: `Objętość kuli wynosi $${piTex(v)}$ cm$^3$. Oblicz promień tej kuli (w cm).`,
                pola: [pole("r", "$r=$")],
                odpowiedz: { r: q(rr) },
                wynik: `$r=${rr}$ cm`,
                rozwiazanie: [`$\\frac43\\pi r^3=${piTex(v)}$, więc $r^3=${piTex(v).replace("\\pi", "")}\\cdot\\frac34=${rr * rr * rr}$.`, `$${rr}^3=${rr * rr * rr}$, więc $r=${rr}$ cm.`],
              };
            }
            const rr = r.pick([3, 6, 9]);
            const p = 4 * rr * rr;
            const k = (4 * rr * rr * rr) / 3;
            return {
              tresc: `Pole powierzchni kuli wynosi $${p}\\pi$ cm$^2$. Oblicz objętość tej kuli.${wynikPi(CM3)}`,
              pola: [pole("k", "$k=$")],
              odpowiedz: { k: q(k) },
              wynik: `$V=${k}\\pi$ cm$^3$`,
              rozwiazanie: [`$4\\pi r^2=${p}\\pi$, więc $r^2=${rr * rr}$ i $r=${rr}$ cm.`, `$V=\\frac43\\pi r^3=\\frac43\\pi\\cdot${rr * rr * rr}=${k}\\pi$ cm$^3$.`],
            };
          },
        },
        {
          id: "kula-w-walcu",
          nazwa: "Kula wpisana w walec",
          opis: "Kula dotyka obu podstaw i powierzchni bocznej walca. Oblicz pole lub objętość walca albo część poza kulą.",
          generuj(r) {
            const tryb = r.int(0, 3);
            const kula = (rr) => `Kula o promieniu $${rr}$ cm jest wpisana w walec: dotyka obu podstaw i powierzchni bocznej walca.`;
            const krok = (rr) => `Promień walca jest równy promieniowi kuli ($r=${rr}$ cm), a wysokość walca to średnica kuli: $H=${2 * rr}$ cm.`;
            if (tryb === 0) {
              const rr = r.int(1, 9);
              const k = 2 * rr * rr * rr;
              return {
                tresc: `${kula(rr)} Oblicz objętość tego walca.${wynikPi(CM3)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$V=${k}\\pi$ cm$^3$`,
                rozwiazanie: [krok(rr), `$V=\\pi r^2H=\\pi\\cdot${rr}^2\\cdot${2 * rr}=${k}\\pi$ cm$^3$.`],
              };
            }
            if (tryb === 1) {
              const rr = r.int(1, 9);
              const k = 4 * rr * rr;
              return {
                tresc: `${kula(rr)} Oblicz pole powierzchni bocznej tego walca.${wynikPi(CM2)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$P_b=${k}\\pi$ cm$^2$`,
                rozwiazanie: [krok(rr), `$P_b=2\\pi rH=2\\pi\\cdot${rr}\\cdot${2 * rr}=${k}\\pi$ cm$^2$.`],
              };
            }
            if (tryb === 2) {
              const rr = r.int(1, 9);
              const k = 6 * rr * rr;
              return {
                tresc: `${kula(rr)} Oblicz pole powierzchni całkowitej tego walca.${wynikPi(CM2)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$P_c=${k}\\pi$ cm$^2$`,
                rozwiazanie: [krok(rr), `$P_c=2\\pi r^2+2\\pi rH=${2 * rr * rr}\\pi+${4 * rr * rr}\\pi=${k}\\pi$ cm$^2$.`],
              };
            }
            const rr = r.pick([3, 6, 9]);
            const vw = 2 * rr * rr * rr;
            const vk = (4 * rr * rr * rr) / 3;
            const k = vw - vk;
            return {
              tresc: `${kula(rr)} Oblicz objętość tej części walca, której nie zajmuje kula.${wynikPi(CM3)}`,
              pola: [pole("k", "$k=$")],
              odpowiedz: { k: q(k) },
              wynik: `$V=${k}\\pi$ cm$^3$`,
              rozwiazanie: [krok(rr), `Walec: $V_w=\\pi\\cdot${rr}^2\\cdot${2 * rr}=${vw}\\pi$. Kula: $V_k=\\frac43\\pi\\cdot${rr * rr * rr}=${vk}\\pi$.`, `$V_w-V_k=${vw}\\pi-${vk}\\pi=${k}\\pi$ cm$^3$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Bryły podobne i zadania różne
    {
      id: "podobne",
      nazwa: "Bryły obrotowe podobne. Zadania różne",
      sciaga: [
        {
          nazwa: "Bryły podobne",
          slownie: "Dwie bryły są podobne, gdy jedną można dostać z drugiej przez powiększenie lub pomniejszenie w tej samej skali $k$. Wszystkie odpowiadające sobie długości mają ten sam stosunek $k$. Każde dwie kule są podobne, a dwa walce (stożki) są podobne, gdy promienie i wysokości mają ten sam stosunek.",
          tex: "k=\\frac{r_2}{r_1}=\\frac{H_2}{H_1}",
          litery: "$k$ – skala podobieństwa, $r_1$, $H_1$ – wymiary pierwszej bryły, $r_2$, $H_2$ – drugiej.",
          przyklad: "Walec o $r=2$ i $H=5$ oraz walec o $r=6$ i $H=15$ są podobne w skali $k=3$. Walce o $r=2$, $H=4$ i o $r=4$, $H=12$ nie są podobne.",
          uwaga: "Nie wystarczy, że jeden wymiar zmienił się $k$ razy. Promień i wysokość muszą zmienić się w tej samej skali.",
        },
        {
          nazwa: "Pola i objętości brył podobnych",
          slownie: "Jeśli bryły są podobne w skali $k$, to ich pola powierzchni są w stosunku $k^2$, a objętości w stosunku $k^3$.",
          tex: "\\frac{P_2}{P_1}=k^2\\qquad\\frac{V_2}{V_1}=k^3",
          litery: "$P_1$, $P_2$ – pola powierzchni, $V_1$, $V_2$ – objętości brył.",
          przyklad: "Walec o objętości $10$ cm$^3$ powiększamy $3$ razy. Pole powierzchni rośnie $9$ razy, a objętość $27$ razy, czyli do $270$ cm$^3$.",
          uwaga: "Pole nie rośnie $k$ razy, a objętość nie rośnie $k^2$ razy. Pole to $k^2$, objętość to $k^3$.",
        },
        {
          nazwa: "Skala z pola lub objętości",
          slownie: "Gdy znamy stosunek pól, skalę $k$ dostajemy z pierwiastka kwadratowego. Gdy znamy stosunek objętości, bierzemy pierwiastek trzeciego stopnia.",
          tex: "k=\\sqrt{\\frac{P_2}{P_1}}\\qquad k=\\sqrt[3]{\\frac{V_2}{V_1}}",
          litery: "$k$ – skala podobieństwa drugiej bryły względem pierwszej.",
          przyklad: "Pola $16$ i $49$: $k=\\sqrt{\\frac{49}{16}}=\\frac74$. Objętości $8$ cm$^3$ i $27$ cm$^3$: $k=\\sqrt[3]{\\frac{27}{8}}=\\frac32$.",
          uwaga: "Dla pól bierzemy pierwiastek kwadratowy, a dla objętości trzeciego stopnia. Nie myl ich.",
        },
        {
          nazwa: "Przetapianie i przelewanie",
          slownie: "Gdy bryłę przetapiamy na inną (albo przelewamy ciecz z naczynia do naczynia), objętość się nie zmienia. Wystarczy porównać objętości, a niewiadomy wymiar wyznaczyć z równania.",
          tex: "V_{\\text{przed}}=V_{\\text{po}}",
          litery: "$V_{\\text{przed}}$ – objętość przed przetopieniem, $V_{\\text{po}}$ – objętość po.",
          przyklad: "Kulę o $r=3$ cm ($V=36\\pi$ cm$^3$) przetapiamy na walec o $r=2$ cm: $\\pi\\cdot4\\cdot H=36\\pi$, więc $H=9$ cm.",
          uwaga: "Nie zmienia się objętość, a pole powierzchni po przetopieniu najczęściej jest inne.",
        },
      ],
      jak: [
        "Sprawdź, czy bryły są podobne i wyznacz skalę $k$ (z odpowiadających sobie długości).",
        "Dla pól użyj $k^2$, dla objętości $k^3$. Gdy dany jest stosunek pól lub objętości, najpierw wyznacz $k$ z pierwiastka.",
        "W zadaniach z przetapianiem lub przelewaniem zapisz równość objętości i wyznacz szukaną wielkość.",
        "Zapisz wynik z odpowiednią jednostką (cm$^2$ dla pól, cm$^3$ dla objętości).",
      ],
      zadania: [
        {
          nr: "23",
          tresc: "Dwa walce są podobne w skali $3$. Mniejszy walec ma objętość $10$ cm$^3$. Jaką objętość ma większy walec? **Wybierz właściwą odpowiedź.**",
          opcje: ["$30$ cm$^3$", "$90$ cm$^3$", "$270$ cm$^3$", "$13$ cm$^3$"],
          poprawna: 2,
        },
        {
          nr: "24",
          tresc: "Promienie dwóch kul mają $2$ cm i $6$ cm. Ile razy pole powierzchni większej kuli jest większe od pola powierzchni mniejszej kuli? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$", "$3$", "$6$", "$27$"],
          poprawna: 0,
        },
        {
          nr: "25",
          tresc: "Pola powierzchni bocznych dwóch podobnych stożków mają się jak $4:25$. W jakim stosunku mają się objętości tych stożków? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2:5$", "$8:125$", "$4:25$", "$16:625$"],
          poprawna: 1,
        },
        {
          nr: "26",
          tresc: "Dwa podobne stożki mają wysokości $6$ cm i $15$ cm. Objętość mniejszego stożka wynosi $40$ cm$^3$. Jaką objętość ma większy stożek? **Wybierz właściwą odpowiedź.**",
          opcje: ["$100$ cm$^3$", "$250$ cm$^3$", "$1000$ cm$^3$", "$625$ cm$^3$"],
          poprawna: 3,
        },
        {
          nr: "27",
          tresc: "Walec o promieniu podstawy $3$ cm i wysokości $6$ cm jest podobny do walca o promieniu podstawy $5$ cm. Jaką wysokość ma drugi walec? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$ cm", "$9$ cm", "$10$ cm", "$12$ cm"],
          poprawna: 2,
        },
        {
          nr: "28",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Każde dwie kule są figurami podobnymi.", litery: "PF", poprawna: 0 },
            { tekst: "Gdy promień kuli zwiększymy $2$ razy, jej pole powierzchni zwiększy się $4$ razy.", litery: "PF", poprawna: 0 },
            { tekst: "Dwa walce o takiej samej wysokości i różnych promieniach podstaw są podobne.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "29",
          punkty: 2,
          tresc: "Metalową kulę o promieniu $6$ cm przetopiono na walec o promieniu podstawy $4$ cm. Oblicz wysokość tego walca. **Zapisz obliczenia.**",
          rozwiazanie: "Objętość kuli: $V_k=\\frac43\\pi\\cdot6^3=\\frac43\\pi\\cdot216=288\\pi$ cm$^3$.\n\nObjętość walca: $V_w=\\pi\\cdot4^2\\cdot H=16\\pi H$.\n\nPrzy przetapianiu objętość się nie zmienia: $16\\pi H=288\\pi$, stąd $H=288:16=18$ cm.\n\nOdpowiedź: Wysokość walca wynosi $18$ cm.",
        },
        {
          nr: "30",
          punkty: 3,
          tresc: "Stożek ma promień podstawy $5$ cm i wysokość $12$ cm. Drugi stożek jest do niego podobny, a jego tworząca ma $26$ cm. Oblicz objętość drugiego stożka. **Zapisz obliczenia.**",
          rozwiazanie: "Tworząca pierwszego stożka: $l^2=5^2+12^2=169$, więc $l=13$ cm.\n\nSkala podobieństwa: $k=\\frac{26}{13}=2$.\n\nObjętość pierwszego stożka: $V_1=\\frac13\\pi\\cdot25\\cdot12=100\\pi$ cm$^3$.\n\nObjętości brył podobnych są w stosunku $k^3=8$, więc $V_2=8\\cdot100\\pi=800\\pi$ cm$^3$.\n\nOdpowiedź: Objętość drugiego stożka wynosi $800\\pi$ cm$^3$.",
        },
      ],
      generatory: [
        {
          id: "podobne-skala",
          nazwa: "Bryły podobne w skali",
          opis: "Podobne walce, stożki i kule: z pola lub objętości jednej bryły oblicz pole lub objętość drugiej albo wyznacz skalę podobieństwa.",
          generuj(r) {
            const tryb = r.int(0, 5);
            if (tryb === 0) {
              const k = r.int(2, 5);
              const A = r.int(3, 30);
              return {
                tresc: `Dwa walce są podobne w skali $${k}$. Pole powierzchni całkowitej mniejszego walca wynosi $${A}\\pi$ cm$^2$. Oblicz pole powierzchni całkowitej większego walca.${wynikPi(CM2)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k * k * A) },
                wynik: `$P=${k * k * A}\\pi$ cm$^2$`,
                rozwiazanie: [`Stosunek pól jest równy $k^2=${k}^2=${k * k}$.`, `$P=${k * k}\\cdot${A}\\pi=${k * k * A}\\pi$ cm$^2$.`],
              };
            }
            if (tryb === 1) {
              const k = r.int(2, 4);
              const A = r.int(1, 20);
              return {
                tresc: `Dwa stożki są podobne w skali $${k}$. Objętość mniejszego stożka wynosi $${A}\\pi$ cm$^3$. Oblicz objętość większego stożka.${wynikPi(CM3)}`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k * k * k * A) },
                wynik: `$V=${k * k * k * A}\\pi$ cm$^3$`,
                rozwiazanie: [`Stosunek objętości jest równy $k^3=${k}^3=${k * k * k}$.`, `$V=${k * k * k}\\cdot${A}\\pi=${k * k * k * A}\\pi$ cm$^3$.`],
              };
            }
            if (tryb === 2) {
              const k = r.int(2, 4);
              const r1 = r.int(1, 5);
              return {
                tresc: `Promienie dwóch kul mają $${r1}$ cm i $${k * r1}$ cm. Ile razy objętość większej kuli jest większa od objętości mniejszej kuli?`,
                pola: [pole("n", "Razy $=$")],
                odpowiedz: { n: q(k * k * k) },
                wynik: `$${k * k * k}$`,
                rozwiazanie: [`Skala podobieństwa kul: $k=${k * r1}:${r1}=${k}$.`, `Objętości są w stosunku $k^3=${k}^3=${k * k * k}$.`],
              };
            }
            if (tryb === 3) {
              const k = r.int(2, 4);
              const r1 = r.int(1, 5);
              return {
                tresc: `Promienie dwóch kul mają $${r1}$ cm i $${k * r1}$ cm. Ile razy pole powierzchni większej kuli jest większe od pola powierzchni mniejszej kuli?`,
                pola: [pole("n", "Razy $=$")],
                odpowiedz: { n: q(k * k) },
                wynik: `$${k * k}$`,
                rozwiazanie: [`Skala podobieństwa kul: $k=${k * r1}:${r1}=${k}$.`, `Pola są w stosunku $k^2=${k}^2=${k * k}$.`],
              };
            }
            const [p, s] = r.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [4, 5], [1, 5]]);
            if (tryb === 4) {
              return {
                tresc: `Objętości dwóch kul mają się jak $${p * p * p}:${s * s * s}$. Ile razy promień większej kuli jest większy od promienia mniejszej kuli? Wpisz ułamek zwykły (np. $3/2$) albo liczbę.`,
                pola: [pole("k", "Razy $=$")],
                odpowiedz: { k: q(s, p) },
                wynik: `$${q(s, p).tex()}$`,
                rozwiazanie: [`Objętości są w stosunku $k^3=\\frac{${s * s * s}}{${p * p * p}}$.`, `$k=\\sqrt[3]{\\frac{${s * s * s}}{${p * p * p}}}=${q(s, p).tex()}$.`],
              };
            }
            return {
              tresc: `Pola powierzchni dwóch kul mają się jak $${p * p}:${s * s}$. Ile razy promień większej kuli jest większy od promienia mniejszej kuli? Wpisz ułamek zwykły (np. $3/2$) albo liczbę.`,
              pola: [pole("k", "Razy $=$")],
              odpowiedz: { k: q(s, p) },
              wynik: `$${q(s, p).tex()}$`,
              rozwiazanie: [`Pola są w stosunku $k^2=\\frac{${s * s}}{${p * p}}$.`, `$k=\\sqrt{\\frac{${s * s}}{${p * p}}}=${q(s, p).tex()}$.`],
            };
          },
        },
        {
          id: "podobne-stozki",
          nazwa: "Podobne stożki",
          opis: "Dwa podobne stożki dane wysokościami. Z objętości mniejszego oblicz objętość większego, gdy skala nie jest liczbą całkowitą.",
          generuj(r) {
            const [p, s] = r.pick([[2, 3], [3, 2], [3, 4], [4, 3], [5, 2], [2, 5], [5, 3], [3, 5], [4, 5], [5, 4]]);
            // Wysokości: mniejszy stożek mal·u, większy duz·u; skala k = duz/mal.
            const mal = Math.min(p, s);
            const duz = Math.max(p, s);
            const u = r.int(2, 4);
            const t = r.int(1, 5);
            const v1 = mal * mal * mal * t;
            const v2 = duz * duz * duz * t;
            return {
              tresc: `Wysokości dwóch podobnych stożków mają $${mal * u}$ cm i $${duz * u}$ cm. Objętość mniejszego stożka wynosi $${v1}\\pi$ cm$^3$. Oblicz objętość większego stożka.${wynikPi(CM3)}`,
              pola: [pole("k", "$k=$")],
              odpowiedz: { k: q(v2) },
              wynik: `$V=${v2}\\pi$ cm$^3$`,
              rozwiazanie: [`Skala podobieństwa: $k=${duz * u}:${mal * u}=\\frac{${duz}}{${mal}}$.`, `Objętości są w stosunku $k^3=\\frac{${duz * duz * duz}}{${mal * mal * mal}}$.`, `$V=${v1}\\pi\\cdot\\frac{${duz * duz * duz}}{${mal * mal * mal}}=${v2}\\pi$ cm$^3$.`],
            };
          },
        },
        {
          id: "przetapianie",
          nazwa: "Przetapianie i przelewanie",
          opis: "Bryła jest przetapiana na inną albo woda jest przelewana do innego naczynia. Objętość się nie zmienia – oblicz brakujący wymiar albo liczbę brył.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const rr = r.pick([3, 6, 9]);
              const v = (4 * rr * rr * rr) / 3;
              const dobre = [2, 3, 4, 6, 9, 12].filter((r2) => v % (r2 * r2) === 0 && v / (r2 * r2) <= 150);
              const r2 = r.pick(dobre);
              const H = v / (r2 * r2);
              return {
                tresc: `Metalową kulę o promieniu $${rr}$ cm przetopiono na walec o promieniu podstawy $${r2}$ cm. Oblicz wysokość tego walca (w cm).`,
                pola: [pole("H", "$H=$")],
                odpowiedz: { H: q(H) },
                wynik: `$H=${H}$ cm`,
                rozwiazanie: [`Objętość kuli: $V=\\frac43\\pi\\cdot${rr}^3=${v}\\pi$ cm$^3$.`, `Objętość walca: $\\pi\\cdot${r2}^2\\cdot H=${r2 * r2}\\pi H$.`, `$${r2 * r2}\\pi H=${v}\\pi$, więc $H=${v}:${r2 * r2}=${H}$ cm.`],
              };
            }
            if (tryb === 1) {
              const r3 = r.pick([1, 2, 3]);
              const n = r3 === 3 ? r.int(2, 8) : 3 * r.int(1, r3 === 1 ? 4 : 3);
              const v = (n * 4 * r3 * r3 * r3) / 3;
              const dobre = [2, 3, 4, 6].filter((rw) => v % (rw * rw) === 0);
              const rw = r.pick(dobre);
              const H = v / (rw * rw);
              return {
                tresc: `Z metalowego walca o promieniu podstawy $${rw}$ cm i wysokości $${H}$ cm odlano kule o promieniu $${r3}$ cm. Ile takich kul odlano z całego walca?`,
                pola: [pole("n", "Liczba kul $=$")],
                odpowiedz: { n: q(n) },
                wynik: `$${n}$`,
                rozwiazanie: [`Objętość walca: $\\pi\\cdot${rw}^2\\cdot${H}=${v}\\pi$ cm$^3$.`, `Objętość jednej kuli: $\\frac43\\pi\\cdot${r3}^3=${q(4 * r3 * r3 * r3, 3).tex()}\\pi$ cm$^3$.`, `Liczba kul: $${v}:${q(4 * r3 * r3 * r3, 3).tex()}=${n}$.`],
              };
            }
            const rr = r.int(2, 9);
            const t = r.int(2, 8);
            const H = 3 * t;
            return {
              tresc: `Naczynie w kształcie stożka o promieniu podstawy $${rr}$ cm i wysokości $${H}$ cm jest pełne wody. Całą wodę przelano do walca o takim samym promieniu podstawy. Jak wysoko (w cm) sięga woda w walcu?`,
              pola: [pole("h", "$h=$")],
              odpowiedz: { h: q(t) },
              wynik: `$h=${t}$ cm`,
              rozwiazanie: [`Woda ze stożka: $V=\\frac13\\pi\\cdot${rr}^2\\cdot${H}=${(rr * rr * H) / 3}\\pi$ cm$^3$.`, `W walcu: $\\pi\\cdot${rr}^2\\cdot h=${rr * rr}\\pi h$.`, `$${rr * rr}\\pi h=${(rr * rr * H) / 3}\\pi$, więc $h=${H}:3=${t}$ cm.`],
            };
          },
        },
      ],
    },
  ],
};
