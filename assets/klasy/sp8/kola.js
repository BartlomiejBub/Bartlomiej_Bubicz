// Klasa 8 (szkoła podstawowa) · rozdział VII „Koła i okręgi. Symetrie” – Matematyka z kluczem 8 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Bez rysunków: każdą figurę opisano słowami. Wyniki z liczbą π podajemy jako współczynnik przy π albo z π ≈ 3,14.
import { q } from "../../generatory/wspolne.js";

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

/** Liczba z przecinkiem dziesiętnym do wzoru: 31.4 -> "31{,}4". */
const dz = (x) => String(x).replace(".", "{,}");

/** Liczba ujemna w nawiasie (do zapisu działań): -3 -> "(-3)". */
const ot = (v) => (v < 0 ? `(${v})` : `${v}`);

/** Współczynnik przy π w LaTeX: 1 -> "\pi", 9 -> "9\pi", 9/2 -> "\frac{9}{2}\pi". */
const kpi = (v) => (v.eq(1) ? "\\pi" : `${v.tex()}\\pi`);

/** Trójki pitagorejskie (p, H, h): połowa odcinka, odległość od odcinka, odległość od końca (p² + H² = h²). */
const TROJKI = [
  [3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13], [9, 12, 15], [12, 9, 15], [8, 15, 17], [15, 8, 17],
];

/** Figury i liczba ich osi symetrii (do generatora). */
const FIGURY = [
  ["kwadrat", 4],
  ["prostokąt, który nie jest kwadratem", 2],
  ["romb, który nie jest kwadratem", 2],
  ["trójkąt równoboczny", 3],
  ["trójkąt równoramienny, który nie jest równoboczny", 1],
  ["trapez równoramienny, który nie jest prostokątem", 1],
  ["równoległobok, który nie jest rombem ani prostokątem", 0],
  ["trójkąt, który ma trzy różne boki", 0],
  ["pięciokąt foremny", 5],
  ["sześciokąt foremny", 6],
  ["ośmiokąt foremny", 8],
  ["deltoid, który nie jest rombem", 1],
];
/** Wielkie litery drukowane (proste, bez ozdób) i liczba ich osi symetrii. */
const LITERY = [
  ["H", 2], ["O", 2], ["X", 2], ["I", 2], ["A", 1], ["T", 1], ["M", 1], ["Y", 1], ["U", 1], ["Z", 0], ["N", 0], ["S", 0], ["F", 0], ["P", 0], ["R", 0],
];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Długość okręgu
    {
      id: "dlugosc-okregu",
      nazwa: "Długość okręgu",
      sciaga: [
        {
          nazwa: "Okrąg i koło",
          slownie: "Okrąg to sama linia, jak obręcz hula-hop. Koło to okrąg razem z wnętrzem, jak talerz. Promień $r$ biegnie ze środka na okrąg. Średnica $d$ przechodzi przez środek i jest dwa razy dłuższa od promienia.",
          tex: "d=2r\\qquad r=d:2",
          litery: "$r$ – promień, $d$ – średnica.",
          przyklad: "Pizza ma średnicę $30$ cm, więc jej promień to $30:2=15$ cm.",
          uwaga: "Promień to połowa średnicy. Nie myl ich w obliczeniach.",
        },
        {
          nazwa: "Liczba π",
          slownie: "Gdy zmierzysz, jak długi jest okrąg, i podzielisz tę długość przez średnicę, zawsze wyjdzie to samo: trochę więcej niż $3$. Tę liczbę nazywamy $\\pi$. Nie da się jej zapisać dokładnie, więc zostawiamy symbol $\\pi$ albo liczymy z przybliżeniem $3{,}14$.",
          tex: "\\pi\\approx3{,}14",
          przyklad: "Okrąg o średnicy $10$ cm ma długość $10\\pi$ cm, czyli około $31{,}4$ cm.",
          uwaga: "Liczba $\\pi$ nie jest równa $3{,}14$ dokładnie. To tylko przybliżenie.",
        },
        {
          nazwa: "Wzór na długość okręgu",
          slownie: "Długość okręgu to średnica razy $\\pi$. Ten sam wzór można zapisać z promieniem, bo średnica to dwa promienie.",
          tex: "L=\\pi d\\qquad L=2\\pi r",
          litery: "$L$ – długość okręgu, $d$ – średnica, $r$ – promień.",
          przyklad: "Dla $r=5$ cm: $L=2\\cdot\\pi\\cdot5=10\\pi$ cm. Z przybliżeniem: $10\\cdot3{,}14=31{,}4$ cm.",
          uwaga: "Nie zapomnij o liczbie $2$ we wzorze z promieniem. Wzór $\\pi r$ jest błędny.",
        },
        {
          nazwa: "Szukanie promienia",
          slownie: "Gdy znasz długość okręgu, odwracasz wzór. Jeśli długość to $k\\pi$, to promień jest równy $k$ podzielone przez $2$, a średnica jest równa $k$.",
          tex: "L=k\\pi\\ \\Rightarrow\\ r=k:2",
          litery: "$k$ – liczba stojąca przy $\\pi$.",
          przyklad: "Okrąg ma długość $18\\pi$ cm. Wtedy $d=18$ cm, a $r=18:2=9$ cm.",
          uwaga: "Dzielimy przez $2\\pi$, a nie tylko przez $\\pi$. Dlatego promień to połowa liczby $k$.",
        },
        {
          nazwa: "Koło się toczy",
          slownie: "Gdy koło obraca się raz, przejeżdża drogę równą długości swojego okręgu. Przy kilku obrotach mnożymy długość okręgu przez liczbę obrotów.",
          tex: "s=n\\cdot L",
          litery: "$s$ – droga, $n$ – liczba obrotów, $L$ – długość okręgu koła.",
          przyklad: "Koło o średnicy $50$ cm ma $L=3{,}14\\cdot50=157$ cm. Po $10$ obrotach przejedzie $1570$ cm, czyli $15{,}7$ m.",
          uwaga: "Uważaj na jednostki. Zamień cm na m dopiero na końcu: $100$ cm to $1$ m.",
        },
      ],
      jak: [
        "Sprawdź, czy dany jest promień, czy średnica. Gdy trzeba, zamień jedno na drugie.",
        "Wstaw do wzoru $L=2\\pi r$ albo $L=\\pi d$.",
        "Zostaw $\\pi$ w wyniku (np. $12\\pi$) albo policz z $3{,}14$, jeśli tak mówi zadanie.",
        "Gdy szukasz promienia, odwróć wzór: $r=L:(2\\pi)$. Dla $L=k\\pi$ jest $r=k:2$.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Promień okręgu ma $7$ cm. Jaka jest długość tego okręgu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7\\pi$ cm", "$14\\pi$ cm", "$49\\pi$ cm", "$3{,}5\\pi$ cm"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Średnica okręgu ma $12$ cm. Jaka jest długość tego okręgu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12\\pi$ cm", "$24\\pi$ cm", "$6\\pi$ cm", "$144\\pi$ cm"],
          poprawna: 0,
        },
        {
          nr: "3",
          tresc: "Okrąg ma długość $20\\pi$ cm. Jaki jest jego promień? **Wybierz właściwą odpowiedź.**",
          opcje: ["$40$ cm", "$20$ cm", "$5$ cm", "$10$ cm"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "Koło roweru ma średnicę $50$ cm. Rowerzysta jedzie tak, że to koło obraca się $100$ razy. Ile metrów przejedzie? Przyjmij $\\pi\\approx3{,}14$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$78{,}5$ m", "$157$ m", "$15{,}7$ m", "$1570$ m"],
          poprawna: 1,
        },
        {
          nr: "5",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Okrąg o promieniu $3$ cm ma długość $6\\pi$ cm.", litery: "PF", poprawna: 0 },
            { tekst: "Jeśli promień okręgu zwiększymy dwa razy, to jego długość zwiększy się cztery razy.", litery: "PF", poprawna: 1 },
            { tekst: "Liczba $\\pi$ jest równa dokładnie $3{,}14$.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Zegar ścienny ma tarczę o średnicy $30$ cm. Wzdłuż brzegu tarczy trzeba okleić ozdobną taśmą. Czy wystarczy kawałek taśmy długości $1$ m? Przyjmij $\\pi\\approx3{,}14$. **Zapisz obliczenia.**",
          rozwiazanie: "Brzeg tarczy to okrąg o średnicy $30$ cm. Jego długość: $L=\\pi d\\approx3{,}14\\cdot30=94{,}2$ cm.\n\nKawałek taśmy ma $1$ m, czyli $100$ cm. Potrzeba $94{,}2$ cm, a $94{,}2<100$.\n\nOdpowiedź: Tak, taśmy wystarczy. Zostanie jej $100-94{,}2=5{,}8$ cm.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Koło wózka ma promień $25$ cm. Ile pełnych obrotów wykona to koło na drodze długości $15{,}7$ m? Przyjmij $\\pi\\approx3{,}14$. **Zapisz obliczenia.**",
          rozwiazanie: "Długość okręgu koła: $L=2\\pi r\\approx2\\cdot3{,}14\\cdot25=157$ cm.\n\nDroga: $15{,}7$ m $=1570$ cm.\n\nLiczba obrotów: $1570:157=10$.\n\nOdpowiedź: Koło wykona $10$ obrotów.",
        },
      ],
      generatory: [
        {
          id: "dlugosc-okregu",
          nazwa: "Długość okręgu",
          opis: "Oblicz długość okręgu z promienia albo ze średnicy (wynik jako $k\\pi$ albo z $\\pi\\approx3{,}14$) albo szukaj promienia lub średnicy.",
          generuj(r) {
            const tryb = r.int(0, 4);
            if (tryb === 0) {
              const rr = r.int(2, 15);
              const k = 2 * rr;
              return {
                tresc: `Promień okręgu ma $${rr}$ cm. Oblicz długość tego okręgu. Wynik zapisz w postaci $k\\pi$ cm i wpisz liczbę $k$.`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(k) },
                wynik: `$${k}\\pi$ cm`,
                rozwiazanie: [`Wzór: $L=2\\pi r$.`, `$L=2\\cdot\\pi\\cdot${rr}=${k}\\pi$ cm.`],
              };
            }
            if (tryb === 1) {
              const d = r.int(3, 30);
              return {
                tresc: `Średnica okręgu ma $${d}$ cm. Oblicz długość tego okręgu. Wynik zapisz w postaci $k\\pi$ cm i wpisz liczbę $k$.`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(d) },
                wynik: `$${d}\\pi$ cm`,
                rozwiazanie: [`Wzór: $L=\\pi d$.`, `$L=\\pi\\cdot${d}=${d}\\pi$ cm.`],
              };
            }
            if (tryb === 2) {
              const k = 2 * r.int(2, 20);
              return {
                tresc: `Długość okręgu to $${k}\\pi$ cm. Oblicz promień tego okręgu (w cm).`,
                pola: [pole("r", "$r=$")],
                odpowiedz: { r: q(k / 2) },
                wynik: `$${k / 2}$ cm`,
                rozwiazanie: [`Z wzoru $L=2\\pi r$ mamy $2\\pi r=${k}\\pi$.`, `Dzielimy przez $2\\pi$: $r=${k}:2=${k / 2}$ cm.`],
              };
            }
            if (tryb === 3) {
              const k = r.int(4, 40);
              return {
                tresc: `Długość okręgu to $${k}\\pi$ cm. Oblicz średnicę tego okręgu (w cm).`,
                pola: [pole("d", "$d=$")],
                odpowiedz: { d: q(k) },
                wynik: `$${k}$ cm`,
                rozwiazanie: [`Z wzoru $L=\\pi d$ mamy $\\pi d=${k}\\pi$.`, `Dzielimy przez $\\pi$: $d=${k}$ cm.`],
              };
            }
            const rr = r.pick([1, 2, 3, 4, 5, 6, 8, 10, 15, 20]);
            const l = (314 * 2 * rr) / 100;
            return {
              tresc: `Promień okręgu ma $${rr}$ cm. Oblicz długość tego okręgu. Przyjmij $\\pi\\approx3{,}14$. Podaj wynik w cm.`,
              pola: [pole("l", "$L=$")],
              odpowiedz: { l: q(314 * 2 * rr, 100) },
              wynik: `$${dz(l)}$ cm`,
              rozwiazanie: [`Wzór: $L=2\\pi r$.`, `$L\\approx2\\cdot3{,}14\\cdot${rr}=${dz(l)}$ cm.`],
            };
          },
        },
        {
          id: "obroty-kola",
          nazwa: "Obroty koła",
          opis: "Koło toczy się po drodze. Oblicz drogę po $n$ obrotach albo liczbę obrotów. Przyjmij $\\pi\\approx3{,}14$.",
          generuj(r) {
            const nazwy = ["Koło roweru", "Koło hulajnogi", "Koło wózka", "Koło taczki"];
            const kto = r.pick(nazwy);
            const d = r.pick([20, 30, 40, 50, 60, 70, 80]);
            const n = r.int(5, 40);
            const l = (314 * d) / 100;
            const s = (314 * d * n) / 100;
            if (r.chance(0.5)) {
              return {
                tresc: `${kto} ma średnicę $${d}$ cm. Ile centymetrów przejedzie to koło, gdy obróci się $${n}$ razy? Przyjmij $\\pi\\approx3{,}14$.`,
                pola: [pole("s", "Droga (cm) $=$")],
                odpowiedz: { s: q(314 * d * n, 100) },
                wynik: `$${dz(s)}$ cm`,
                rozwiazanie: [`Jeden obrót to długość okręgu: $L=\\pi d\\approx3{,}14\\cdot${d}=${dz(l)}$ cm.`, `Po $${n}$ obrotach: $${n}\\cdot${dz(l)}=${dz(s)}$ cm.`],
              };
            }
            return {
              tresc: `${kto} ma średnicę $${d}$ cm. Koło to przetoczyło się po drodze długości $${dz(s)}$ cm. Ile pełnych obrotów wykonało? Przyjmij $\\pi\\approx3{,}14$.`,
              pola: [pole("n", "Obroty $=$")],
              odpowiedz: { n: q(n) },
              wynik: `$${n}$`,
              rozwiazanie: [`Jeden obrót to długość okręgu: $L=\\pi d\\approx3{,}14\\cdot${d}=${dz(l)}$ cm.`, `Liczba obrotów: $${dz(s)}:${dz(l)}=${n}$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Pole koła
    {
      id: "pole-kola",
      nazwa: "Pole koła",
      sciaga: [
        {
          nazwa: "Wzór na pole koła",
          slownie: "Pole mówi, ile miejsca zajmuje koło, np. ile ciasta potrzeba na spód okrągłej pizzy. Liczymy: promień razy promień razy $\\pi$.",
          tex: "P=\\pi r^2",
          litery: "$P$ – pole koła, $r$ – promień.",
          przyklad: "Dla $r=4$ cm: $P=\\pi\\cdot4^2=16\\pi$ cm$^2$. Z przybliżeniem: $16\\cdot3{,}14=50{,}24$ cm$^2$.",
          uwaga: "$r^2$ to $r\\cdot r$, a nie $2\\cdot r$. Dla $r=4$ jest $r^2=16$, a nie $8$.",
        },
        {
          nazwa: "Promień, nie średnica",
          slownie: "Do wzoru na pole zawsze wstawiamy promień. Gdy dana jest średnica, najpierw dzielimy ją na pół.",
          tex: "r=d:2\\qquad P=\\pi r^2",
          litery: "$d$ – średnica, $r$ – promień.",
          przyklad: "Pizza ma średnicę $30$ cm. Promień: $15$ cm. Pole: $\\pi\\cdot15^2=225\\pi$ cm$^2$, czyli około $706{,}5$ cm$^2$.",
          uwaga: "Gdy wstawisz średnicę $30$ zamiast promienia $15$, wynik wyjdzie cztery razy za duży.",
        },
        {
          nazwa: "Szukanie promienia z pola",
          slownie: "Jeśli pole to $k\\pi$, to $r^2=k$. Szukamy liczby, która pomnożona przez samą siebie daje $k$.",
          tex: "P=k\\pi\\ \\Rightarrow\\ r^2=k",
          litery: "$k$ – liczba stojąca przy $\\pi$.",
          przyklad: "Pole koła to $49\\pi$ cm$^2$. Wtedy $r^2=49$, czyli $r=7$ cm.",
          uwaga: "Promień to nie $k$ ani $k:2$. Trzeba wyciągnąć pierwiastek z $k$.",
        },
        {
          nazwa: "Koło dwa razy większe",
          slownie: "Gdy promień zwiększymy $m$ razy, długość okręgu zwiększy się $m$ razy, ale pole zwiększy się $m\\cdot m$ razy.",
          tex: "r\\to m\\cdot r\\qquad L\\to m\\cdot L\\qquad P\\to m^2\\cdot P",
          przyklad: "Mała pizza ma $r=10$ cm i pole $100\\pi$. Duża ma $r=20$ cm i pole $400\\pi$. Duża pizza ma cztery razy większe pole.",
          uwaga: "Dwa razy większy promień to nie dwa razy większe pole, tylko cztery razy.",
        },
      ],
      jak: [
        "Znajdź promień: z danej średnicy podziel na $2$.",
        "Wstaw $r$ do wzoru $P=\\pi r^2$. Najpierw policz $r^2$.",
        "Zostaw $\\pi$ w wyniku albo policz z $3{,}14$, jeśli zadanie tego chce.",
        "Gdy znasz pole $k\\pi$ i szukasz promienia, wyciągnij pierwiastek: $r=\\sqrt{k}$.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Koło ma średnicę $10$ cm. Jakie jest pole tego koła? **Wybierz właściwą odpowiedź.**",
          opcje: ["$100\\pi$ cm$^2$", "$10\\pi$ cm$^2$", "$25\\pi$ cm$^2$", "$50\\pi$ cm$^2$"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Koło ma promień $5$ cm. Jakie jest jego pole? Przyjmij $\\pi\\approx3{,}14$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$78{,}5$ cm$^2$", "$31{,}4$ cm$^2$", "$15{,}7$ cm$^2$", "$157$ cm$^2$"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "Pole koła jest równe $81\\pi$ cm$^2$. Jaki jest promień tego koła? **Wybierz właściwą odpowiedź.**",
          opcje: ["$81$ cm", "$40{,}5$ cm", "$27$ cm", "$9$ cm"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "Promień drugiego koła jest $3$ razy większy od promienia pierwszego koła. Ile razy większe jest pole drugiego koła? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$ razy", "$9$ razy", "$6$ razy", "$27$ razy"],
          poprawna: 1,
        },
        {
          nr: "12",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Koło o promieniu $2$ cm ma pole $4\\pi$ cm$^2$.", litery: "PF", poprawna: 0 },
            { tekst: "Koło o średnicy $8$ cm ma pole $64\\pi$ cm$^2$.", litery: "PF", poprawna: 1 },
            { tekst: "Pole koła mierzymy w centymetrach kwadratowych.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "W pizzerii mała pizza ma średnicę $24$ cm i kosztuje $18$ zł. Duża pizza ma średnicę $36$ cm i kosztuje $36$ zł. Która pizza jest korzystniejsza, jeśli porównujemy cenę za taką samą ilość pizzy? **Zapisz obliczenia.**",
          rozwiazanie: "Mała pizza: $r=24:2=12$ cm, pole $\\pi\\cdot12^2=144\\pi$ cm$^2$.\n\nDuża pizza: $r=36:2=18$ cm, pole $\\pi\\cdot18^2=324\\pi$ cm$^2$.\n\nPorównujemy: $324\\pi:144\\pi=2{,}25$. Duża pizza ma $2{,}25$ razy większe pole, a kosztuje tylko $36:18=2$ razy więcej.\n\nOdpowiedź: Korzystniejsza jest duża pizza.",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "Okrągły trawnik ma średnicę $8$ m. Jeden kilogram nasion trawy wystarcza na $25$ m$^2$. Ile całych kilogramów nasion trzeba kupić? Przyjmij $\\pi\\approx3{,}14$. **Zapisz obliczenia.**",
          rozwiazanie: "Promień trawnika: $8:2=4$ m.\n\nPole trawnika: $P=\\pi r^2\\approx3{,}14\\cdot4^2=3{,}14\\cdot16=50{,}24$ m$^2$.\n\nNasion potrzeba: $50{,}24:25\\approx2{,}01$ kg. To trochę więcej niż $2$ kg, a nasiona kupujemy w całych kilogramach.\n\nOdpowiedź: Trzeba kupić $3$ kg nasion.",
        },
      ],
      generatory: [
        {
          id: "pole-kola",
          nazwa: "Pole koła",
          opis: "Oblicz pole koła z promienia albo ze średnicy (wynik jako $k\\pi$ albo z $\\pi\\approx3{,}14$) albo szukaj promienia, gdy dane jest pole.",
          generuj(r) {
            const tryb = r.int(0, 4);
            if (tryb === 0) {
              const rr = r.int(2, 15);
              return {
                tresc: `Promień koła ma $${rr}$ cm. Oblicz pole tego koła. Wynik zapisz w postaci $k\\pi$ cm$^2$ i wpisz liczbę $k$.`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(rr * rr) },
                wynik: `$${rr * rr}\\pi$ cm$^2$`,
                rozwiazanie: [`Wzór: $P=\\pi r^2$.`, `$P=\\pi\\cdot${rr}^2=${rr * rr}\\pi$ cm$^2$.`],
              };
            }
            if (tryb === 1) {
              const rr = r.int(2, 15);
              const d = 2 * rr;
              return {
                tresc: `Średnica koła ma $${d}$ cm. Oblicz pole tego koła. Wynik zapisz w postaci $k\\pi$ cm$^2$ i wpisz liczbę $k$.`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(rr * rr) },
                wynik: `$${rr * rr}\\pi$ cm$^2$`,
                rozwiazanie: [`Promień: $r=${d}:2=${rr}$ cm.`, `$P=\\pi r^2=\\pi\\cdot${rr}^2=${rr * rr}\\pi$ cm$^2$.`],
              };
            }
            if (tryb === 2) {
              const rr = r.int(2, 15);
              return {
                tresc: `Pole koła to $${rr * rr}\\pi$ cm$^2$. Oblicz promień tego koła (w cm).`,
                pola: [pole("r", "$r=$")],
                odpowiedz: { r: q(rr) },
                wynik: `$${rr}$ cm`,
                rozwiazanie: [`Z wzoru $P=\\pi r^2$ mamy $\\pi r^2=${rr * rr}\\pi$, czyli $r^2=${rr * rr}$.`, `Szukamy liczby, która razy sama siebie daje $${rr * rr}$: $r=${rr}$ cm.`],
              };
            }
            if (tryb === 3) {
              const rr = r.pick([1, 2, 3, 4, 5, 6, 7, 8, 10]);
              const p = (314 * rr * rr) / 100;
              return {
                tresc: `Promień koła ma $${rr}$ cm. Oblicz pole tego koła. Przyjmij $\\pi\\approx3{,}14$. Podaj wynik w cm$^2$.`,
                pola: [pole("p", "$P=$")],
                odpowiedz: { p: q(314 * rr * rr, 100) },
                wynik: `$${dz(p)}$ cm$^2$`,
                rozwiazanie: [`Wzór: $P=\\pi r^2$.`, `$P\\approx3{,}14\\cdot${rr}^2=3{,}14\\cdot${rr * rr}=${dz(p)}$ cm$^2$.`],
              };
            }
            const rr = r.pick([2, 3, 4, 5, 6, 8, 10]);
            const d = 2 * rr;
            const p = (314 * rr * rr) / 100;
            return {
              tresc: `Okrągły stolik ma średnicę $${d}$ dm. Oblicz pole jego blatu. Przyjmij $\\pi\\approx3{,}14$. Podaj wynik w dm$^2$.`,
              pola: [pole("p", "$P=$")],
              odpowiedz: { p: q(314 * rr * rr, 100) },
              wynik: `$${dz(p)}$ dm$^2$`,
              rozwiazanie: [`Promień: $r=${d}:2=${rr}$ dm.`, `$P=\\pi r^2\\approx3{,}14\\cdot${rr}^2=3{,}14\\cdot${rr * rr}=${dz(p)}$ dm$^2$.`],
            };
          },
        },
        {
          id: "porownanie-kol",
          nazwa: "Które koło większe",
          opis: "Porównaj pola dwóch kół, gdy jedno ma $m$ razy większy promień (np. dwie pizze).",
          generuj(r) {
            const m = r.int(2, 6);
            const r1 = r.int(2, 12);
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              return {
                tresc: `Mała pizza ma średnicę $${2 * r1}$ cm, a duża $${2 * r1 * m}$ cm. Ile razy pole dużej pizzy jest większe od pola małej?`,
                pola: [pole("m", "Ile razy $=$")],
                odpowiedz: { m: q(m * m) },
                wynik: `$${m * m}$`,
                rozwiazanie: [`Promienie: $${r1}$ cm i $${r1 * m}$ cm. Promień dużej jest $${m}$ razy większy.`, `Pole rośnie $${m}\\cdot${m}$ razy, czyli $${m * m}$ razy.`],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Koło A ma promień $${r1}$ cm, a koło B ma promień $${r1 * m}$ cm. Ile razy pole koła B jest większe od pola koła A?`,
                pola: [pole("m", "Ile razy $=$")],
                odpowiedz: { m: q(m * m) },
                wynik: `$${m * m}$`,
                rozwiazanie: [`Pole A: $\\pi\\cdot${r1}^2=${r1 * r1}\\pi$. Pole B: $\\pi\\cdot${r1 * m}^2=${r1 * r1 * m * m}\\pi$.`, `$${r1 * r1 * m * m}\\pi:${r1 * r1}\\pi=${m * m}$.`],
              };
            }
            if (tryb === 2) {
              return {
                tresc: `Pole pewnego koła to $${r1 * r1}\\pi$ cm$^2$. Promień drugiego koła jest $${m}$ razy większy. Ile wynosi pole drugiego koła? Wynik zapisz w postaci $k\\pi$ cm$^2$ i wpisz liczbę $k$.`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(r1 * r1 * m * m) },
                wynik: `$${r1 * r1 * m * m}\\pi$ cm$^2$`,
                rozwiazanie: [`Pole rośnie $${m}\\cdot${m}=${m * m}$ razy.`, `$${m * m}\\cdot${r1 * r1}=${r1 * r1 * m * m}$, więc pole to $${r1 * r1 * m * m}\\pi$ cm$^2$.`],
              };
            }
            return {
              tresc: `Pole jednego koła jest $${m * m}$ razy większe od pola drugiego koła. Ile razy promień większego koła jest większy od promienia mniejszego?`,
              pola: [pole("m", "Ile razy $=$")],
              odpowiedz: { m: q(m) },
              wynik: `$${m}$`,
              rozwiazanie: [`Pole rośnie tyle razy, ile wynosi promień razy promień.`, `Szukamy liczby, która razy sama siebie daje $${m * m}$. To $${m}$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Długość okręgu i pole koła – zadania
    {
      id: "okrag-kolo-zadania",
      nazwa: "Długość okręgu i pole koła – zadania",
      sciaga: [
        {
          nazwa: "Od długości do pola",
          slownie: "W zadaniu mamy często jedną wielkość, a pytają o drugą. Najpierw znajdź promień, potem policz to, o co pytają.",
          tex: "L=2\\pi r\\ \\Rightarrow\\ r\\qquad r\\ \\Rightarrow\\ P=\\pi r^2",
          przyklad: "Okrąg ma długość $10\\pi$ cm. Stąd $r=5$ cm. Pole koła o tym promieniu: $\\pi\\cdot5^2=25\\pi$ cm$^2$.",
          uwaga: "Nie wstawiaj długości okręgu do wzoru na pole. Najpierw policz promień.",
        },
        {
          nazwa: "Półkole i ćwiartka koła",
          slownie: "Połowa koła ma połowę pola, a ćwiartka koła – jedną czwartą pola. Podobnie łuk, czyli połowa okręgu, ma połowę długości okręgu.",
          tex: "P_{1/2}=\\frac{\\pi r^2}{2}\\qquad P_{1/4}=\\frac{\\pi r^2}{4}",
          litery: "$r$ – promień całego koła.",
          przyklad: "Dla $r=4$ cm: pole półkola to $16\\pi:2=8\\pi$ cm$^2$, a ćwiartki $16\\pi:4=4\\pi$ cm$^2$. Półokrąg ma długość $\\pi\\cdot4=4\\pi$ cm.",
          uwaga: "Obwód półkola to półokrąg plus średnica. Dla $r=3$ cm: $3\\pi+6$ cm.",
        },
        {
          nazwa: "Koło i kwadrat",
          slownie: "Koło wpisane w kwadrat dotyka wszystkich czterech boków kwadratu. Jego średnica jest równa bokowi kwadratu. Pole narożników to pole kwadratu bez pola koła.",
          tex: "d=a\\qquad P_{nar}=a^2-\\pi r^2",
          litery: "$a$ – bok kwadratu, $r=a:2$ – promień koła.",
          przyklad: "Kwadrat o boku $10$ cm: $r=5$ cm, pole koła $25\\pi\\approx78{,}5$ cm$^2$. Narożniki: $100-78{,}5=21{,}5$ cm$^2$.",
          uwaga: "Promień jest połową boku kwadratu, a nie całym bokiem.",
        },
        {
          nazwa: "Figury złożone",
          slownie: "Figurę złożoną dzielimy na proste kawałki: prostokąty, trójkąty, koła, półkola. Pola kawałków dodajemy, a gdy coś wycięto, odejmujemy.",
          tex: "P=P_1+P_2\\qquad P=P_1-P_2",
          przyklad: "Z blachy $10\\times6$ cm wycięto koło o promieniu $2$ cm. Zostało $60-4\\pi\\approx60-12{,}56=47{,}44$ cm$^2$.",
          uwaga: "Gdy liczysz długość brzegu, nie dodawaj części, które znajdują się w środku figury.",
        },
      ],
      jak: [
        "Przeczytaj, o jaką część koła chodzi: całe, połowa, ćwiartka. Zapisz promień.",
        "Policz pole ze wzoru $P=\\pi r^2$ albo długość ze wzoru $L=2\\pi r$ i weź potrzebną część.",
        "Gdy figura jest złożona, podziel ją na kawałki. Pola dodaj albo odejmij.",
        "Sprawdź na końcu, czy wynik ma właściwą jednostkę (cm albo cm$^2$).",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Okrąg wpisany w kwadrat o boku $8$ cm dotyka wszystkich boków kwadratu. Jakie jest pole koła ograniczonego tym okręgiem? **Wybierz właściwą odpowiedź.**",
          opcje: ["$64\\pi$ cm$^2$", "$32\\pi$ cm$^2$", "$8\\pi$ cm$^2$", "$16\\pi$ cm$^2$"],
          poprawna: 3,
        },
        {
          nr: "16",
          tresc: "Okrąg ma długość $14\\pi$ cm. Jakie jest pole koła o tym obwodzie? **Wybierz właściwą odpowiedź.**",
          opcje: ["$49\\pi$ cm$^2$", "$196\\pi$ cm$^2$", "$14\\pi$ cm$^2$", "$7\\pi$ cm$^2$"],
          poprawna: 0,
        },
        {
          nr: "17",
          tresc: "Półkole ma promień $6$ cm. Jakie jest jego pole? **Wybierz właściwą odpowiedź.**",
          opcje: ["$36\\pi$ cm$^2$", "$9\\pi$ cm$^2$", "$18\\pi$ cm$^2$", "$12\\pi$ cm$^2$"],
          poprawna: 2,
        },
        {
          nr: "18",
          tresc: "Półkole ma średnicę $10$ cm. Jaki jest obwód tego półkola, czyli półokrąg razem ze średnicą? Przyjmij $\\pi\\approx3{,}14$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$15{,}7$ cm", "$25{,}7$ cm", "$31{,}4$ cm", "$41{,}4$ cm"],
          poprawna: 1,
        },
        {
          nr: "19",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Pole półkola o promieniu $r$ jest równe $\\pi r$.", litery: "PF", poprawna: 1 },
            { tekst: "Pole ćwiartki koła o średnicy $6$ cm to $\\frac{9}{4}\\pi$ cm$^2$.", litery: "PF", poprawna: 0 },
            { tekst: "Koło wpisane w kwadrat ma średnicę równą bokowi kwadratu.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Z prostokątnej blachy o wymiarach $20$ cm na $10$ cm wycięto koło o promieniu $5$ cm. Ile centymetrów kwadratowych blachy zostało? Przyjmij $\\pi\\approx3{,}14$. **Zapisz obliczenia.**",
          rozwiazanie: "Pole prostokąta: $20\\cdot10=200$ cm$^2$.\n\nPole koła: $\\pi r^2\\approx3{,}14\\cdot5^2=3{,}14\\cdot25=78{,}5$ cm$^2$.\n\nPozostało: $200-78{,}5=121{,}5$ cm$^2$.\n\nOdpowiedź: Zostało $121{,}5$ cm$^2$ blachy.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Boisko ma kształt prostokąta o wymiarach $40$ m na $20$ m. Do każdego z krótszych boków (długości $20$ m) dołączono półkole, którego średnicą jest ten bok. Oblicz pole całego boiska i długość jego brzegu. Przyjmij $\\pi\\approx3{,}14$. **Zapisz obliczenia.**",
          rozwiazanie: "Dwa półkola razem tworzą jedno koło o średnicy $20$ m, czyli o promieniu $10$ m.\n\nPole prostokąta: $40\\cdot20=800$ m$^2$. Pole koła: $3{,}14\\cdot10^2=314$ m$^2$. Pole boiska: $800+314=1114$ m$^2$.\n\nBrzeg składa się z dwóch dłuższych boków prostokąta, czyli $2\\cdot40=80$ m, i z dwóch półokręgów. Dwa półokręgi to jeden okrąg: $2\\cdot3{,}14\\cdot10=62{,}8$ m.\n\nDługość brzegu: $80+62{,}8=142{,}8$ m.\n\nOdpowiedź: Pole boiska to $1114$ m$^2$, a długość brzegu to $142{,}8$ m.",
        },
      ],
      generatory: [
        {
          id: "polkole-cwiartka",
          nazwa: "Półkole i ćwiartka",
          opis: "Oblicz pole półkola albo ćwiartki koła, albo długość łuku (półokręgu, ćwiartki okręgu).",
          generuj(r) {
            const tryb = r.int(0, 4);
            const rr = r.int(2, 14);
            if (tryb === 0) {
              const k = q(rr * rr, 2);
              return {
                tresc: `Półkole ma promień $${rr}$ cm. Oblicz pole tego półkola. Wynik zapisz w postaci $k\\pi$ cm$^2$ i wpisz liczbę $k$.`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k },
                wynik: `$${kpi(k)}$ cm$^2$`,
                rozwiazanie: [`Pole całego koła: $\\pi\\cdot${rr}^2=${rr * rr}\\pi$ cm$^2$.`, `Półkole to połowa: $${rr * rr}\\pi:2=${kpi(k)}$ cm$^2$.`],
              };
            }
            if (tryb === 1) {
              const k = q(rr * rr, 4);
              return {
                tresc: `Ćwiartka koła ma promień $${rr}$ cm. Oblicz pole tej ćwiartki. Wynik zapisz w postaci $k\\pi$ cm$^2$ i wpisz liczbę $k$.`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k },
                wynik: `$${kpi(k)}$ cm$^2$`,
                rozwiazanie: [`Pole całego koła: $\\pi\\cdot${rr}^2=${rr * rr}\\pi$ cm$^2$.`, `Ćwiartka to czwarta część: $${rr * rr}\\pi:4=${kpi(k)}$ cm$^2$.`],
              };
            }
            if (tryb === 2) {
              return {
                tresc: `Półokrąg (połowa okręgu) ma promień $${rr}$ cm. Oblicz jego długość. Wynik zapisz w postaci $k\\pi$ cm i wpisz liczbę $k$.`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(rr) },
                wynik: `$${rr}\\pi$ cm`,
                rozwiazanie: [`Długość całego okręgu: $2\\pi\\cdot${rr}=${2 * rr}\\pi$ cm.`, `Połowa: $${2 * rr}\\pi:2=${rr}\\pi$ cm.`],
              };
            }
            if (tryb === 3) {
              const k = q(rr, 2);
              return {
                tresc: `Łuk będący ćwiartką okręgu ma promień $${rr}$ cm. Oblicz długość tego łuku. Wynik zapisz w postaci $k\\pi$ cm i wpisz liczbę $k$.`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k },
                wynik: `$${kpi(k)}$ cm`,
                rozwiazanie: [`Długość całego okręgu: $2\\pi\\cdot${rr}=${2 * rr}\\pi$ cm.`, `Ćwiartka to czwarta część: $${2 * rr}\\pi:4=${kpi(k)}$ cm.`],
              };
            }
            const p = (314 * rr * rr) / 200;
            return {
              tresc: `Półkole ma promień $${rr}$ cm. Oblicz pole tego półkola. Przyjmij $\\pi\\approx3{,}14$. Podaj wynik w cm$^2$.`,
              pola: [pole("p", "$P=$")],
              odpowiedz: { p: q(314 * rr * rr, 200) },
              wynik: `$${dz(p)}$ cm$^2$`,
              rozwiazanie: [`Pole całego koła: $3{,}14\\cdot${rr}^2=${dz((314 * rr * rr) / 100)}$ cm$^2$.`, `Półkole to połowa: $${dz((314 * rr * rr) / 100)}:2=${dz(p)}$ cm$^2$.`],
            };
          },
        },
        {
          id: "kolo-w-kwadracie",
          nazwa: "Koło i kwadrat",
          opis: "Koło wpisane w kwadrat albo koło wycięte z prostokąta. Oblicz pole koła, długość okręgu albo pole, które zostało.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const rr = r.int(2, 10);
              const a = 2 * rr;
              return {
                tresc: `W kwadrat o boku $${a}$ cm wpisano koło (dotyka wszystkich boków kwadratu). Oblicz pole tego koła. Wynik zapisz w postaci $k\\pi$ cm$^2$ i wpisz liczbę $k$.`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(rr * rr) },
                wynik: `$${rr * rr}\\pi$ cm$^2$`,
                rozwiazanie: [`Średnica koła jest równa bokowi kwadratu, więc $r=${a}:2=${rr}$ cm.`, `$P=\\pi r^2=${rr * rr}\\pi$ cm$^2$.`],
              };
            }
            if (tryb === 1) {
              const a = r.int(3, 20);
              return {
                tresc: `W kwadrat o boku $${a}$ cm wpisano koło (dotyka wszystkich boków kwadratu). Oblicz długość okręgu ograniczającego to koło. Wynik zapisz w postaci $k\\pi$ cm i wpisz liczbę $k$.`,
                pola: [pole("k", "$k=$")],
                odpowiedz: { k: q(a) },
                wynik: `$${a}\\pi$ cm`,
                rozwiazanie: [`Średnica koła jest równa bokowi kwadratu: $d=${a}$ cm.`, `$L=\\pi d=${a}\\pi$ cm.`],
              };
            }
            if (tryb === 2) {
              const rr = r.int(2, 8);
              const a = 2 * rr;
              const nar = (100 * a * a - 314 * rr * rr) / 100;
              return {
                tresc: `W kwadrat o boku $${a}$ cm wpisano koło (dotyka wszystkich boków kwadratu). Ile centymetrów kwadratowych kwadratu nie jest zajęte przez koło? Przyjmij $\\pi\\approx3{,}14$.`,
                pola: [pole("p", "Pole $=$")],
                odpowiedz: { p: q(100 * a * a - 314 * rr * rr, 100) },
                wynik: `$${dz(nar)}$ cm$^2$`,
                rozwiazanie: [`Pole kwadratu: $${a}\\cdot${a}=${a * a}$ cm$^2$.`, `Promień koła: $${rr}$ cm. Pole koła: $3{,}14\\cdot${rr * rr}=${dz((314 * rr * rr) / 100)}$ cm$^2$.`, `Różnica: $${a * a}-${dz((314 * rr * rr) / 100)}=${dz(nar)}$ cm$^2$.`],
              };
            }
            const rr = r.int(1, 4);
            const a = 2 * rr + r.int(2, 10);
            const b = 2 * rr + r.int(2, 10);
            const zostalo = (100 * a * b - 314 * rr * rr) / 100;
            return {
              tresc: `Z prostokątnej płytki o wymiarach $${a}$ cm na $${b}$ cm wycięto koło o promieniu $${rr}$ cm. Ile centymetrów kwadratowych płytki zostało? Przyjmij $\\pi\\approx3{,}14$.`,
              pola: [pole("p", "Pole $=$")],
              odpowiedz: { p: q(100 * a * b - 314 * rr * rr, 100) },
              wynik: `$${dz(zostalo)}$ cm$^2$`,
              rozwiazanie: [`Pole prostokąta: $${a}\\cdot${b}=${a * b}$ cm$^2$.`, `Pole koła: $3{,}14\\cdot${rr}^2=${dz((314 * rr * rr) / 100)}$ cm$^2$.`, `Zostało: $${a * b}-${dz((314 * rr * rr) / 100)}=${dz(zostalo)}$ cm$^2$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Oś symetrii i środek symetrii
    {
      id: "symetrie",
      nazwa: "Oś symetrii i środek symetrii",
      sciaga: [
        {
          nazwa: "Oś symetrii",
          slownie: "Oś symetrii to prosta, po której można złożyć figurę tak, że obie połowy dokładnie się pokrywają, jak w lustrze. Figura może mieć jedną oś, kilka osi albo żadnej.",
          przyklad: "Kwadrat ma $4$ osie, prostokąt (nie kwadrat) $2$, trójkąt równoboczny $3$, trójkąt równoramienny (nie równoboczny) $1$. Okrąg ma nieskończenie wiele osi: każda prosta przechodząca przez jego środek jest osią symetrii.",
          uwaga: "Przekątna prostokąta, który nie jest kwadratem, nie jest osią symetrii. Połowy po złożeniu się nie pokryją.",
        },
        {
          nazwa: "Środek symetrii",
          slownie: "Środek symetrii to punkt, wokół którego można obrócić figurę o połowę pełnego obrotu, czyli o $180^\\circ$ („do góry nogami”), i dostać tę samą figurę. Dla każdego punktu figury drugi taki punkt leży po przeciwnej stronie środka w tej samej odległości.",
          przyklad: "Równoległobok, prostokąt, romb, kwadrat i okrąg mają środek symetrii. To punkt przecięcia przekątnych (okręgu: jego środek). Litery H, N, O, S, X, Z też go mają.",
          uwaga: "Trójkąt nie ma środka symetrii. Litera T ma oś symetrii, ale nie ma środka.",
        },
        {
          nazwa: "Punkt symetryczny względem prostej",
          slownie: "Punkt $A'$ jest symetryczny do $A$ względem prostej, gdy leży po drugiej stronie, na prostej prostopadłej do osi, w takiej samej odległości od osi. Na osiach układu współrzędnych zmieniamy znak jednej współrzędnej.",
          tex: "OX:(x,y)\\to(x,-y)\\qquad OY:(x,y)\\to(-x,y)",
          litery: "Względem prostej $x=k$: $(x,y)\\to(2k-x,\\,y)$.",
          przyklad: "$A=(3,2)$. Względem osi $OX$: $(3,-2)$. Względem osi $OY$: $(-3,2)$. Względem prostej $x=1$: $(2\\cdot1-3,\\,2)=(-1,2)$.",
          uwaga: "Względem osi $OX$ zmienia się znak drugiej współrzędnej $y$, a nie pierwszej.",
        },
        {
          nazwa: "Punkt symetryczny względem punktu",
          slownie: "Punkt $A'$ jest symetryczny do $A$ względem punktu $S$, gdy $S$ leży dokładnie w środku odcinka $AA'$. Względem początku układu zmieniamy znaki obu współrzędnych.",
          tex: "(0,0):(x,y)\\to(-x,-y)",
          litery: "Względem punktu $S=(a,b)$: $(x,y)\\to(2a-x,\\,2b-y)$.",
          przyklad: "$A=(4,-1)$. Względem $(0,0)$: $(-4,1)$. Względem $S=(1,1)$: od $A$ do $S$ przesuwamy się o $3$ w lewo i $2$ w górę, i jeszcze raz tyle: $(-2,3)$.",
          uwaga: "Samo zmienienie znaków działa tylko wtedy, gdy środkiem symetrii jest punkt $(0,0)$.",
        },
      ],
      jak: [
        "Aby znaleźć osie symetrii, sprawdź w myślach, czy figurę da się złożyć na pół tak, żeby połowy się pokryły.",
        "Aby znaleźć środek symetrii, obróć figurę w myślach „do góry nogami” i sprawdź, czy wygląda tak samo.",
        "W układzie współrzędnych względem osi $OX$ zmień znak $y$, względem osi $OY$ zmień znak $x$, względem $(0,0)$ zmień oba znaki.",
        "Dla innej prostej albo innego punktu policz, o ile punkt jest od nich oddalony, i odmierz tyle samo po drugiej stronie.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Ile osi symetrii ma prostokąt, który nie jest kwadratem? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1$", "$2$", "$4$", "$0$"],
          poprawna: 1,
        },
        {
          nr: "23",
          tresc: "Która z wielkich liter drukowanych ma środek symetrii, ale nie ma żadnej osi symetrii? **Wybierz właściwą odpowiedź.**",
          opcje: ["H", "T", "A", "Z"],
          poprawna: 3,
        },
        {
          nr: "24",
          tresc: "Punkt $A=(-3,5)$ odbito symetrycznie względem osi $OX$. Jakie współrzędne ma obraz tego punktu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$(-3,-5)$", "$(3,5)$", "$(3,-5)$", "$(5,-3)$"],
          poprawna: 0,
        },
        {
          nr: "25",
          tresc: "Punkt $B=(2,-4)$ odbito symetrycznie względem punktu $(0,0)$. Jakie współrzędne ma obraz tego punktu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$(2,4)$", "$(-2,-4)$", "$(-2,4)$", "$(-4,2)$"],
          poprawna: 2,
        },
        {
          nr: "26",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Trójkąt równoramienny, który nie jest równoboczny, ma trzy osie symetrii.", litery: "PF", poprawna: 1 },
            { tekst: "Okrąg ma nieskończenie wiele osi symetrii.", litery: "PF", poprawna: 0 },
            { tekst: "Każda figura, która ma oś symetrii, ma też środek symetrii.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 3,
          tresc: "Dane są punkty $A=(2,3)$, $B=(-1,4)$ i $C=(-3,-2)$. Wyznacz: a) punkt symetryczny do $A$ względem osi $OY$, b) punkt symetryczny do $B$ względem osi $OX$, c) punkt symetryczny do $C$ względem punktu $(0,0)$, d) punkt symetryczny do $A$ względem punktu $S=(1,1)$. **Zapisz obliczenia.**",
          rozwiazanie: "a) Względem osi $OY$ zmieniamy znak pierwszej współrzędnej: $A'=(-2,3)$.\n\nb) Względem osi $OX$ zmieniamy znak drugiej współrzędnej: $B'=(-1,-4)$.\n\nc) Względem punktu $(0,0)$ zmieniamy oba znaki: $C'=(3,2)$.\n\nd) Od $A=(2,3)$ do $S=(1,1)$ przesuwamy się o $1$ w lewo i o $2$ w dół. Przesuwamy się tak jeszcze raz od $S$: $A''=(1-1,\\,1-2)=(0,-1)$.\n\nOdpowiedź: a) $(-2,3)$, b) $(-1,-4)$, c) $(3,2)$, d) $(0,-1)$.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "Kasia twierdzi, że prostokąt o bokach $6$ cm i $4$ cm ma cztery osie symetrii: dwie przechodzące przez środki boków i dwie przekątne. Czy ma rację? Ile osi symetrii ma ten prostokąt? Czy ma środek symetrii? **Uzasadnij odpowiedź.**",
          rozwiazanie: "Prostą przechodzącą przez środki dwóch naprzeciwległych boków da się złożyć tak, że połowy się pokryją. Takie proste są dwie (przez środki dłuższych boków i przez środki krótszych boków).\n\nJeśli złożymy prostokąt wzdłuż przekątnej, to wystaje on poza siebie: bok $6$ cm nie leży na boku $4$ cm. Przekątna nie jest więc osią symetrii.\n\nProstokąt ma środek symetrii: punkt przecięcia przekątnych.\n\nOdpowiedź: Kasia nie ma racji. Prostokąt ma $2$ osie symetrii i ma środek symetrii.",
        },
      ],
      generatory: [
        {
          id: "punkt-symetryczny",
          nazwa: "Punkt symetryczny",
          opis: "Znajdź punkt symetryczny do danego względem osi układu, względem początku układu, prostej pionowej albo poziomej lub względem innego punktu.",
          generuj(r) {
            const x = r.intBez(-8, 8, 0);
            const y = r.intBez(-8, 8, 0);
            const tryb = r.int(0, 5);
            const A = `$A=(${x},${y})$`;
            const pola = [pole("x", "$x'=$"), pole("y", "$y'=$")];
            const dane = "Podaj współrzędne $A'=(x',y')$.";
            const wyn = (a, b) => `$A'=(${a},${b})$`;
            if (tryb === 0) {
              return {
                tresc: `Punkt ${A} odbito symetrycznie względem osi $OX$. ${dane}`,
                pola,
                odpowiedz: { x: q(x), y: q(-y) },
                wynik: wyn(x, -y),
                rozwiazanie: [`Względem osi $OX$ pierwsza współrzędna zostaje, a druga zmienia znak.`, `$A'=(${x},${-y})$.`],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Punkt ${A} odbito symetrycznie względem osi $OY$. ${dane}`,
                pola,
                odpowiedz: { x: q(-x), y: q(y) },
                wynik: wyn(-x, y),
                rozwiazanie: [`Względem osi $OY$ druga współrzędna zostaje, a pierwsza zmienia znak.`, `$A'=(${-x},${y})$.`],
              };
            }
            if (tryb === 2) {
              return {
                tresc: `Punkt ${A} odbito symetrycznie względem punktu $(0,0)$. ${dane}`,
                pola,
                odpowiedz: { x: q(-x), y: q(-y) },
                wynik: wyn(-x, -y),
                rozwiazanie: [`Względem punktu $(0,0)$ obie współrzędne zmieniają znak.`, `$A'=(${-x},${-y})$.`],
              };
            }
            if (tryb === 3) {
              const k = r.intBez(-6, 6, 0);
              const xn = 2 * k - x;
              return {
                tresc: `Punkt ${A} odbito symetrycznie względem prostej $x=${k}$. ${dane}`,
                pola,
                odpowiedz: { x: q(xn), y: q(y) },
                wynik: wyn(xn, y),
                rozwiazanie: [`Prosta $x=${k}$ jest pionowa, więc druga współrzędna się nie zmienia.`, `Pierwsza: $2\\cdot${ot(k)}-${ot(x)}=${xn}$.`, `$A'=(${xn},${y})$.`],
              };
            }
            if (tryb === 4) {
              const k = r.intBez(-6, 6, 0);
              const yn = 2 * k - y;
              return {
                tresc: `Punkt ${A} odbito symetrycznie względem prostej $y=${k}$. ${dane}`,
                pola,
                odpowiedz: { x: q(x), y: q(yn) },
                wynik: wyn(x, yn),
                rozwiazanie: [`Prosta $y=${k}$ jest pozioma, więc pierwsza współrzędna się nie zmienia.`, `Druga: $2\\cdot${ot(k)}-${ot(y)}=${yn}$.`, `$A'=(${x},${yn})$.`],
              };
            }
            const a = r.int(-5, 5);
            const b = r.int(-5, 5);
            const xn = 2 * a - x;
            const yn = 2 * b - y;
            return {
              tresc: `Punkt ${A} odbito symetrycznie względem punktu $S=(${a},${b})$. ${dane}`,
              pola,
              odpowiedz: { x: q(xn), y: q(yn) },
              wynik: wyn(xn, yn),
              rozwiazanie: [`Punkt $S$ jest środkiem odcinka $AA'$.`, `Pierwsza współrzędna: $2\\cdot${ot(a)}-${ot(x)}=${xn}$. Druga: $2\\cdot${ot(b)}-${ot(y)}=${yn}$.`, `$A'=(${xn},${yn})$.`],
            };
          },
        },
        {
          id: "liczba-osi",
          nazwa: "Ile osi symetrii",
          opis: "Podaj liczbę osi symetrii figury (kwadrat, prostokąt, trójkąty, wielokąty foremne) albo wielkiej litery drukowanej.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const [nazwa, ile] = r.pick(FIGURY);
              const uzas = ile === 0 ? "Takiej figury nie da się złożyć na pół tak, żeby połowy się pokryły." : ile === 1 ? "Jest tylko jeden sposób złożenia jej na pół." : `Takich sposobów złożenia jej na pół jest $${ile}$.`;
              return {
                tresc: `Ile osi symetrii ma ${nazwa}?`,
                pola: [pole("n", "Osie symetrii $=$")],
                odpowiedz: { n: q(ile) },
                wynik: `$${ile}$`,
                rozwiazanie: [`Sprawdzamy, na ile sposobów można złożyć figurę na pół tak, żeby połowy się pokryły.`, `${uzas} Osi symetrii: $${ile}$.`],
              };
            }
            if (tryb === 1) {
              const n = r.int(3, 10);
              const nazwy = { 3: "trójkąt", 4: "czworokąt", 5: "pięciokąt", 6: "sześciokąt", 7: "siedmiokąt", 8: "ośmiokąt", 9: "dziewięciokąt", 10: "dziesięciokąt" };
              return {
                tresc: `Ile osi symetrii ma ${nazwy[n]} foremny?`,
                pola: [pole("n", "Osie symetrii $=$")],
                odpowiedz: { n: q(n) },
                wynik: `$${n}$`,
                rozwiazanie: [`Wielokąt foremny o $n$ bokach ma $n$ osi symetrii.`, `Tu $n=${n}$, więc osi jest $${n}$.`],
              };
            }
            const [lit, ile] = r.pick(LITERY);
            return {
              tresc: `Ile osi symetrii ma wielka litera drukowana $\\mathrm{${lit}}$ (zapisana prosto, bez ozdób)?`,
              pola: [pole("n", "Osie symetrii $=$")],
              odpowiedz: { n: q(ile) },
              wynik: `$${ile}$`,
              rozwiazanie: [`Wyobraź sobie literę $\\mathrm{${lit}}$ i sprawdź, czy po złożeniu na pół połowy się pokrywają.`, ile === 0 ? `Litera $\\mathrm{${lit}}$ nie ma osi symetrii: $0$.` : `Litera $\\mathrm{${lit}}$ ma ${ile === 1 ? "jedną oś" : "dwie osie"} symetrii: $${ile}$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Symetralna odcinka i dwusieczna kąta
    {
      id: "symetralna-dwusieczna",
      nazwa: "Symetralna odcinka i dwusieczna kąta",
      sciaga: [
        {
          nazwa: "Symetralna odcinka",
          slownie: "Symetralna odcinka $AB$ to prosta prostopadła do odcinka, przechodząca przez jego środek. Każdy punkt symetralnej leży tak samo daleko od $A$ i od $B$. I odwrotnie: punkt, który jest tak samo daleko od $A$ i od $B$, leży na symetralnej.",
          tex: "P\\in\\text{symetralnej}\\iff|PA|=|PB|",
          litery: "$P$ – dowolny punkt, $|PA|$ – odległość od $A$ do $P$.",
          przyklad: "$|AB|=8$ cm. Punkt $P$ leży na symetralnej i $|PA|=5$ cm. Wtedy $|PB|=5$ cm, a obwód trójkąta $APB$ to $5+5+8=18$ cm.",
          uwaga: "Sama prosta, która dzieli odcinek na pół, nie musi być symetralną. Symetralna jest jeszcze prostopadła do odcinka.",
        },
        {
          nazwa: "Konstrukcja symetralnej",
          slownie: "Wbij cyrkiel w punkt $A$ i narysuj łuk o promieniu większym niż połowa $|AB|$. Nie zmieniając rozstawu, narysuj taki łuk wokół $B$. Łuki przetną się w dwóch punktach. Prosta przez te dwa punkty to symetralna odcinka.",
          przyklad: "Dla $|AB|=10$ cm weź rozstaw cyrkla np. $7$ cm, bo $7>5$. Łuki wokół $A$ i $B$ przetną się w dwóch punktach.",
          uwaga: "Gdy rozstaw cyrkla jest mniejszy niż połowa $|AB|$, łuki się nie spotkają.",
        },
        {
          nazwa: "Dwusieczna kąta",
          slownie: "Dwusieczna kąta to półprosta zaczynająca się w wierzchołku kąta, która dzieli go na dwa równe kąty. Każdy punkt dwusiecznej leży tak samo daleko od obu ramion kąta. Odległość punktu od ramienia mierzymy prostopadle.",
          tex: "\\alpha=\\frac{\\alpha}{2}+\\frac{\\alpha}{2}",
          litery: "$\\alpha$ – miara kąta.",
          przyklad: "Kąt $70^\\circ$ dzieli się na dwa kąty po $35^\\circ$. Punkt dwusiecznej jest $4$ cm od jednego ramienia, więc jest też $4$ cm od drugiego.",
          uwaga: "Każdy z dwóch kątów ma miarę $\\alpha:2$, a nie $\\alpha$.",
        },
        {
          nazwa: "Konstrukcja dwusiecznej",
          slownie: "Wbij cyrkiel w wierzchołek kąta i narysuj łuk, który przetnie oba ramiona w punktach $K$ i $L$. Potem z $K$ i z $L$ narysuj łuki o tym samym promieniu (większym niż połowa $|KL|$). Przetną się w punkcie $P$. Półprosta od wierzchołka przez $P$ to dwusieczna.",
          przyklad: "Kąt $80^\\circ$: po konstrukcji półprosta tworzy z każdym ramieniem kąt $40^\\circ$.",
          uwaga: "Wszystkie łuki z punktów $K$ i $L$ rysujemy tym samym rozstawem cyrkla.",
        },
      ],
      jak: [
        "Gdy punkt leży na symetralnej odcinka $AB$, zapisz $|PA|=|PB|$.",
        "Gdy w zadaniu jest trójkąt prostokątny (środek odcinka, punkt $P$ i koniec odcinka), użyj twierdzenia Pitagorasa.",
        "Przy dwusiecznej kąta zapisz, że każdy z dwóch kątów ma połowę miary całego kąta.",
        "Gdy punkt leży na dwusiecznej, jego odległości od obu ramion kąta są równe.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Punkt $P$ leży na symetralnej odcinka $AB$ i $|PA|=7$ cm. Ile wynosi $|PB|$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$ cm", "$3{,}5$ cm", "$7$ cm", "$49$ cm"],
          poprawna: 2,
        },
        {
          nr: "30",
          tresc: "Dwusieczna kąta o mierze $84^\\circ$ dzieli ten kąt na dwa kąty. Jaką miarę ma każdy z nich? **Wybierz właściwą odpowiedź.**",
          opcje: ["$42^\\circ$", "$84^\\circ$", "$168^\\circ$", "$21^\\circ$"],
          poprawna: 0,
        },
        {
          nr: "31",
          tresc: "Punkt $P$ leży na dwusiecznej kąta. Jego odległość od jednego ramienia kąta wynosi $5$ cm. Jaka jest jego odległość od drugiego ramienia? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2{,}5$ cm", "$10$ cm", "$25$ cm", "$5$ cm"],
          poprawna: 3,
        },
        {
          nr: "32",
          tresc: "Który opis przedstawia konstrukcję symetralnej odcinka $AB$? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "Rysujemy łuki o promieniu mniejszym niż połowa $|AB|$ wokół $A$ i wokół $B$ i łączymy punkty ich przecięcia.",
            "Rysujemy łuki o tym samym promieniu, większym niż połowa $|AB|$, wokół $A$ i wokół $B$ i łączymy punkty ich przecięcia.",
            "Znajdujemy środek odcinka i rysujemy przez niego prostą równoległą do $AB$.",
            "Rysujemy prostą przez punkty $A$ i $B$.",
          ],
          poprawna: 1,
        },
        {
          nr: "33",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Symetralna odcinka dzieli go na dwie części o równej długości.", litery: "PF", poprawna: 0 },
            { tekst: "Symetralna odcinka jest równoległa do tego odcinka.", litery: "PF", poprawna: 1 },
            { tekst: "Dwusieczna kąta $60^\\circ$ tworzy z jednym z ramion kąt $60^\\circ$.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 2,
          tresc: "Odcinek $AB$ ma $10$ cm. Punkt $P$ leży na symetralnej tego odcinka i $|PA|=13$ cm. Jak daleko od odcinka $AB$ leży punkt $P$, czyli jak długi jest odcinek łączący $P$ ze środkiem $M$ odcinka $AB$? **Zapisz obliczenia.**",
          rozwiazanie: "Symetralna jest prostopadła do $AB$ i przechodzi przez środek $M$. Trójkąt $AMP$ jest prostokątny.\n\n$|AM|=10:2=5$ cm, a przeciwprostokątna $|PA|=13$ cm.\n\nZ twierdzenia Pitagorasa: $|PM|^2+5^2=13^2$, czyli $|PM|^2=169-25=144$.\n\nStąd $|PM|=12$ cm.\n\nOdpowiedź: Punkt $P$ leży $12$ cm od odcinka $AB$.",
        },
        {
          nr: "35",
          punkty: 2,
          tresc: "W trójkącie $ABC$ kąt przy wierzchołku $A$ ma $50^\\circ$, a kąt przy wierzchołku $B$ ma $70^\\circ$. Dwusieczna kąta $C$ przecina bok $AB$ w punkcie $D$. Oblicz miary kątów $ACD$ i $ADC$. **Zapisz obliczenia.**",
          rozwiazanie: "Kąt $C$: $180^\\circ-50^\\circ-70^\\circ=60^\\circ$.\n\nDwusieczna dzieli ten kąt na pół: $\\angle ACD=60^\\circ:2=30^\\circ$.\n\nW trójkącie $ACD$ kąty mają razem $180^\\circ$: $\\angle ADC=180^\\circ-50^\\circ-30^\\circ=100^\\circ$.\n\nOdpowiedź: $\\angle ACD=30^\\circ$, $\\angle ADC=100^\\circ$.",
        },
      ],
      generatory: [
        {
          id: "symetralna-odcinka",
          nazwa: "Symetralna odcinka",
          opis: "Punkt leży na symetralnej odcinka. Oblicz odległość od końca odcinka, obwód trójkąta, odległość od środka albo długość odcinka.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const c = r.int(4, 20);
              const a = r.int(3, 20);
              return {
                tresc: `Odcinek $AB$ ma $${c}$ cm. Punkt $P$ leży na symetralnej tego odcinka i $|PA|=${a}$ cm. Oblicz obwód trójkąta $APB$ (w cm).`,
                pola: [pole("o", "Obwód $=$")],
                odpowiedz: { o: q(c + 2 * a) },
                wynik: `$${c + 2 * a}$ cm`,
                rozwiazanie: [`Punkt na symetralnej leży tak samo daleko od końców odcinka: $|PB|=|PA|=${a}$ cm.`, `Obwód: $|PA|+|PB|+|AB|=${a}+${a}+${c}=${c + 2 * a}$ cm.`],
              };
            }
            if (tryb === 1) {
              const x = r.int(2, 12);
              const a1 = r.int(2, 5);
              const c1 = r.int(1, a1 - 1);
              const b1 = r.int(1, 8);
              const d1 = b1 + (a1 - c1) * x;
              return {
                tresc: `Punkt $P$ leży na symetralnej odcinka $AB$. Jego odległości od końców odcinka to $|PA|=${a1}x+${b1}$ i $|PB|=${c1 === 1 ? "" : c1}x+${d1}$ (w cm). Oblicz $x$.`,
                pola: [pole("x", "$x=$")],
                odpowiedz: { x: q(x) },
                wynik: `$${x}$`,
                rozwiazanie: [`Punkt leży na symetralnej, więc $|PA|=|PB|$: $${a1}x+${b1}=${c1 === 1 ? "" : c1}x+${d1}$.`, `Przenosimy: $${a1 - c1 === 1 ? "" : a1 - c1}x=${d1}-${b1}=${d1 - b1}$.`, a1 - c1 === 1 ? `$x=${x}$.` : `$x=${d1 - b1}:${a1 - c1}=${x}$.`],
              };
            }
            const [p, h, k] = r.pick(TROJKI);
            const m = r.pick([1, 1, 2]);
            const pp = p * m, hh = h * m, kk = k * m;
            if (tryb === 2) {
              return {
                tresc: `Odcinek $AB$ ma $${2 * pp}$ cm. Punkt $P$ leży na symetralnej tego odcinka i $|PA|=${kk}$ cm. Jak daleko (w cm) punkt $P$ leży od środka $M$ odcinka $AB$?`,
                pola: [pole("d", "$|PM|=$")],
                odpowiedz: { d: q(hh) },
                wynik: `$${hh}$ cm`,
                rozwiazanie: [`$|AM|=${2 * pp}:2=${pp}$ cm. Trójkąt $AMP$ jest prostokątny, a przeciwprostokątna to $|PA|=${kk}$ cm.`, `$|PM|^2=${kk}^2-${pp}^2=${kk * kk}-${pp * pp}=${hh * hh}$.`, `$|PM|=${hh}$ cm.`],
              };
            }
            return {
              tresc: `Punkt $P$ leży na symetralnej odcinka $AB$ i $|PA|=${kk}$ cm. Odległość punktu $P$ od środka $M$ odcinka $AB$ to $${hh}$ cm. Jaką długość (w cm) ma odcinek $AB$?`,
              pola: [pole("c", "$|AB|=$")],
              odpowiedz: { c: q(2 * pp) },
              wynik: `$${2 * pp}$ cm`,
              rozwiazanie: [`Trójkąt $AMP$ jest prostokątny: przeciwprostokątna $|PA|=${kk}$ cm, przyprostokątna $|PM|=${hh}$ cm.`, `$|AM|^2=${kk}^2-${hh}^2=${kk * kk}-${hh * hh}=${pp * pp}$, więc $|AM|=${pp}$ cm.`, `$|AB|=2\\cdot${pp}=${2 * pp}$ cm.`],
            };
          },
        },
        {
          id: "dwusieczna-kata",
          nazwa: "Dwusieczna kąta",
          opis: "Dwusieczna dzieli kąt na dwa równe kąty. Oblicz miarę kąta, odległość punktu od ramienia albo kąty w trójkącie.",
          generuj(r) {
            const tryb = r.int(0, 4);
            if (tryb === 0) {
              const a = 2 * r.int(10, 85);
              return {
                tresc: `Kąt o mierze $${a}^\\circ$ podzielono dwusieczną. Jaką miarę (w stopniach) ma każdy z dwóch kątów?`,
                pola: [pole("a", "Kąt $=$")],
                odpowiedz: { a: q(a / 2) },
                wynik: `$${a / 2}^\\circ$`,
                rozwiazanie: [`Dwusieczna dzieli kąt na dwa równe kąty.`, `$${a}^\\circ:2=${a / 2}^\\circ$.`],
              };
            }
            if (tryb === 1) {
              const a = r.int(10, 85);
              return {
                tresc: `Dwusieczna kąta tworzy z jednym z jego ramion kąt $${a}^\\circ$. Jaką miarę (w stopniach) ma cały kąt?`,
                pola: [pole("a", "Kąt $=$")],
                odpowiedz: { a: q(2 * a) },
                wynik: `$${2 * a}^\\circ$`,
                rozwiazanie: [`Dwusieczna dzieli kąt na dwa równe kąty, każdy po $${a}^\\circ$.`, `Cały kąt: $2\\cdot${a}^\\circ=${2 * a}^\\circ$.`],
              };
            }
            if (tryb === 2) {
              const d = r.int(2, 20);
              return {
                tresc: `Punkt $P$ leży na dwusiecznej kąta. Jego odległość od jednego ramienia tego kąta wynosi $${d}$ cm. Jaka jest jego odległość od drugiego ramienia (w cm)?`,
                pola: [pole("d", "Odległość $=$")],
                odpowiedz: { d: q(d) },
                wynik: `$${d}$ cm`,
                rozwiazanie: [`Każdy punkt dwusiecznej leży tak samo daleko od obu ramion kąta.`, `Odległość od drugiego ramienia to też $${d}$ cm.`],
              };
            }
            const { alfa, c2, beta } = probuj(() => {
              const al = r.int(30, 80);
              const c = r.int(10, 40);
              const be = 180 - al - 2 * c;
              return be >= 20 && be <= 120 ? { alfa: al, c2: c, beta: be } : null;
            });
            if (tryb === 3) {
              return {
                tresc: `W trójkącie $ABC$ kąt przy wierzchołku $A$ ma $${alfa}^\\circ$, a kąt przy wierzchołku $B$ ma $${beta}^\\circ$. Dwusieczna kąta $C$ przecina bok $AB$ w punkcie $D$. Oblicz miarę kąta $ACD$ (w stopniach).`,
                pola: [pole("a", "$\\angle ACD=$")],
                odpowiedz: { a: q(c2) },
                wynik: `$${c2}^\\circ$`,
                rozwiazanie: [`Kąt $C$: $180^\\circ-${alfa}^\\circ-${beta}^\\circ=${2 * c2}^\\circ$.`, `Dwusieczna dzieli go na pół: $\\angle ACD=${2 * c2}^\\circ:2=${c2}^\\circ$.`],
              };
            }
            const adc = 180 - alfa - c2;
            return {
              tresc: `W trójkącie $ABC$ kąt przy wierzchołku $A$ ma $${alfa}^\\circ$, a kąt przy wierzchołku $B$ ma $${beta}^\\circ$. Dwusieczna kąta $C$ przecina bok $AB$ w punkcie $D$. Oblicz miarę kąta $ADC$ (w stopniach).`,
              pola: [pole("a", "$\\angle ADC=$")],
              odpowiedz: { a: q(adc) },
              wynik: `$${adc}^\\circ$`,
              rozwiazanie: [`Kąt $C$: $180^\\circ-${alfa}^\\circ-${beta}^\\circ=${2 * c2}^\\circ$. Dwusieczna daje $\\angle ACD=${c2}^\\circ$.`, `W trójkącie $ACD$: $\\angle ADC=180^\\circ-${alfa}^\\circ-${c2}^\\circ=${adc}^\\circ$.`],
            };
          },
        },
      ],
    },
  ],
};
