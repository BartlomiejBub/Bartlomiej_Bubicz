// Klasa 6 (szkoła podstawowa) · rozdział VI „Bryły” – Matematyka z kluczem 6 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Nie ma tu brył obrotowych (klasa 8), twierdzenia Pitagorasa (klasa 7) ani objętości ostrosłupa (klasa 8).
import { q } from "../../generatory/wspolne.js";   // tylko pomocnicze z wspolne.js

// --- Pomocnicze (tylko dla tego pliku)

/** Liczba całkowita w LaTeX: odstęp tysięcy dopiero od 5 cyfr (12\,500). */
const lcz = (n) => (Math.abs(n) >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : String(n));

/** Liczba n/10^k w LaTeX z przecinkiem dziesiętnym: dec(2500, 3) -> "2{,}5". */
const dec = (n, k = 0) => {
  if (k === 0) return lcz(n);
  const s = String(Math.abs(n)).padStart(k + 1, "0");
  const c = s.slice(0, -k);
  const u = s.slice(-k).replace(/0+$/, "");
  return u ? `${lcz(Number(c))}{,}${u}` : lcz(Number(c));
};

/** Odmiana rzeczownika po liczbie: mn(1, "klocek", "klocki", "klocków"). */
const mn = (n, a, b, c) => {
  const m10 = n % 10, m100 = n % 100;
  if (n === 1) return a;
  if (m10 >= 2 && m10 <= 4 && !(m100 >= 12 && m100 <= 14)) return b;
  return c;
};

/** Liczba z rzeczownikiem: lm(5, "butelka", "butelki", "butelek") -> "$5$ butelek". */
const lm = (n, a, b, c) => `$${lcz(n)}$ ${mn(n, a, b, c)}`;

/** Długość z jednostką: dl(12, "cm") -> "$12$ cm". */
const dl = (x, j) => `$${lcz(x)}$ ${j}`;

/** Działanie z wynikiem i jednostką: wz("5 \\cdot 4", 20, "cm", 2) -> "$5 \cdot 4 = 20$ cm$^2$". */
const wz = (wyr, x, j, p) => `$${wyr} = ${lcz(x)}$ ${j}$^${p}$`;

/** Podpis pola odpowiedzi: etV("cm") -> "Objętość (w cm$^3$) $=$". */
const etV = (j) => `Objętość (w ${j}$^3$) $=$`;
const etP = (j) => `Pole (w ${j}$^2$) $=$`;

/** Jednostki długości w dopełniaczu liczby mnogiej. */
const DL = { cm: "centymetrów", dm: "decymetrów", m: "metrów" };

/** Nazwy graniastosłupów i ostrosłupów od liczby boków podstawy. */
const NK = { 3: "trójkątny", 4: "czworokątny", 5: "pięciokątny", 6: "sześciokątny", 7: "siedmiokątny", 8: "ośmiokątny", 9: "dziewięciokątny", 10: "dziesięciokątny" };
/** Ta sama nazwa w dopełniaczu: "pięciokątny" -> "pięciokątnego". */
const NKD = (n) => NK[n].replace(/ny$/, "nego");

/** Zadanie z jednym polem liczbowym. */
const zad = (tresc, etykieta, w, wynik, rozwiazanie) => ({
  tresc,
  pola: [{ id: "w", typ: "liczba", etykieta }],
  odpowiedz: { w },
  wynik,
  rozwiazanie,
});

/** Podstawa graniastosłupa: opis słowny, pole i obliczenie pola (jednostka u). */
function podstawa(r, u) {
  const t = r.int(0, 5);
  if (t === 0) {
    const a = r.int(2, 12), b = r.intBez(2, 12, a);
    return { opis: `prostokąt o bokach ${dl(a, u)} i ${dl(b, u)}`, P: a * b, krok: wz(`${a} \\cdot ${b}`, a * b, u, 2) };
  }
  if (t === 1) {
    const a = r.int(2, 12);
    return { opis: `kwadrat o boku ${dl(a, u)}`, P: a * a, krok: wz(`${a} \\cdot ${a}`, a * a, u, 2) };
  }
  if (t === 2) {
    const a = r.int(2, 12);
    const b = a % 2 === 1 ? 2 * r.int(1, 6) : r.intBez(2, 12, a);
    return { opis: `trójkąt prostokątny o przyprostokątnych ${dl(a, u)} i ${dl(b, u)}`, P: (a * b) / 2, krok: wz(`${a} \\cdot ${b} : 2`, (a * b) / 2, u, 2) };
  }
  if (t === 3) {
    const a = r.int(5, 12), b = r.int(2, a - 1);
    const h = (a + b) % 2 === 1 ? 2 * r.int(1, 4) : r.int(2, 8);
    const P = ((a + b) * h) / 2;
    return { opis: `trapez o podstawach ${dl(a, u)} i ${dl(b, u)} i wysokości ${dl(h, u)}`, P, krok: wz(`(${a} + ${b}) \\cdot ${h} : 2`, P, u, 2) };
  }
  if (t === 4) {
    if (r.chance()) {
      const e = r.int(4, 12);
      const f = e % 2 === 1 ? 2 * r.int(2, 6) : r.intBez(4, 12, e);
      return { opis: `romb o przekątnych ${dl(e, u)} i ${dl(f, u)}`, P: (e * f) / 2, krok: wz(`${e} \\cdot ${f} : 2`, (e * f) / 2, u, 2) };
    }
    const a = r.int(4, 12), h = r.int(2, a - 1);
    return { opis: `romb o boku ${dl(a, u)} i wysokości ${dl(h, u)}`, P: a * h, krok: wz(`${a} \\cdot ${h}`, a * h, u, 2) };
  }
  const a = r.int(3, 12), h = r.int(2, 9);
  return { opis: `równoległobok o boku ${dl(a, u)} i opuszczonej na ten bok wysokości ${dl(h, u)}`, P: a * h, krok: wz(`${a} \\cdot ${h}`, a * h, u, 2) };
}

// Jednostki objętości do zamiany: zapis, nazwa w dopełniaczu i biernik (po „na”).
const J = {
  mm3: { t: "mm$^3$", gen: "milimetrów sześciennych", na: "milimetry sześcienne" },
  cm3: { t: "cm$^3$", gen: "centymetrów sześciennych", na: "centymetry sześcienne" },
  dm3: { t: "dm$^3$", gen: "decymetrów sześciennych", na: "decymetry sześcienne" },
  m3: { t: "m$^3$", gen: "metrów sześciennych", na: "metry sześcienne" },
  l: { t: "l", gen: "litrów", na: "litry" },
  ml: { t: "ml", gen: "mililitrów", na: "mililitry" },
};
// Pary [większa, mniejsza]: w każdej większa jednostka to 1000 mniejszych.
const PARY = [["dm3", "cm3"], ["cm3", "mm3"], ["m3", "dm3"], ["l", "ml"], ["l", "cm3"], ["m3", "l"], ["dm3", "ml"]];

// --- Materiały

export default {
  tematy: [
    // ------------------------------------------------------------------ 1
    {
      id: "bryly-objetosc",
      nazwa: "Bryły i ich objętość",
      sciaga: [
        {
          nazwa: "Graniastosłup prosty",
          slownie: "Graniastosłup prosty ma dwie takie same podstawy leżące naprzeciw siebie. Ściany boczne są prostokątami, a krawędzie boczne są prostopadłe do podstaw. Wysokość graniastosłupa to długość krawędzi bocznej. Podstawą może być każdy wielokąt, np. trójkąt, trapez albo romb.",
          przyklad: "Prostopadłościan to graniastosłup o podstawie prostokąta, a sześcian – o podstawie kwadratu. Graniastosłup o podstawie trapezu ma $6$ ścian: $2$ trapezy i $4$ prostokąty.",
          uwaga: "Wysokość graniastosłupa to nie wysokość figury z podstawy (np. trapezu). To krawędź boczna.",
        },
        {
          nazwa: "Ostrosłup",
          slownie: "Ostrosłup ma jedną podstawę (wielokąt). Ściany boczne są trójkątami i zbiegają się w jednym punkcie, czyli w wierzchołku ostrosłupa. Nazwę ostrosłupa podaje jego podstawa.",
          przyklad: "Piramida w Egipcie ma kształt ostrosłupa czworokątnego: jej podstawa to kwadrat, a cztery ściany boczne to trójkąty. Ostrosłup trójkątny ma $4$ ściany i wszystkie są trójkątami.",
          uwaga: "Graniastosłup ma dwie podstawy i ściany boczne w kształcie prostokątów. Ostrosłup ma jedną podstawę i trójkątne ściany boczne.",
        },
        {
          nazwa: "Pola figur w podstawie",
          slownie: "Żeby obliczyć objętość graniastosłupa, trzeba umieć obliczyć pole jego podstawy. Przypomnij sobie wzory na pola figur płaskich.",
          tex: "P=a\\cdot b\\qquad P=a\\cdot a\\qquad P=\\frac{a\\cdot h}{2}\\qquad P=a\\cdot h\\qquad P=\\frac{e\\cdot f}{2}\\qquad P=\\frac{(a+b)\\cdot h}{2}",
          litery: "Kolejno: prostokąt, kwadrat, trójkąt, równoległobok, romb, trapez. $a$, $b$ – boki lub podstawy, $h$ – wysokość, $e$, $f$ – przekątne rombu.",
          przyklad: "Trójkąt prostokątny o przyprostokątnych $6$ cm i $5$ cm ma pole $6 \\cdot 5 : 2 = 15$ cm$^2$. Romb o przekątnych $8$ cm i $6$ cm ma pole $8 \\cdot 6 : 2 = 24$ cm$^2$.",
          uwaga: "W trójkącie i w rombie dzielimy przez $2$. W trapezie najpierw dodaj obie podstawy.",
        },
        {
          nazwa: "Objętość graniastosłupa",
          slownie: "Objętość graniastosłupa to pole podstawy razy wysokość graniastosłupa. Wynik zapisujemy w jednostkach sześciennych.",
          tex: "V=P_p\\cdot H",
          litery: "$V$ – objętość, $P_p$ – pole podstawy, $H$ – wysokość graniastosłupa.",
          przyklad: "Podstawa to trójkąt prostokątny o przyprostokątnych $3$ cm i $4$ cm, wysokość graniastosłupa to $10$ cm. Pole podstawy: $3 \\cdot 4 : 2 = 6$ cm$^2$. Objętość: $V = 6 \\cdot 10 = 60$ cm$^3$.",
          uwaga: "Do wzoru bierzemy pole podstawy, a nie pole ściany bocznej. Nie mnóż wszystkich liczb z treści zadania bez zastanowienia.",
        },
        {
          nazwa: "Brakująca wysokość",
          slownie: "Gdy znamy objętość i pole podstawy, wysokość graniastosłupa dostajemy przez dzielenie. Podobnie znajdziemy pole podstawy, gdy znamy objętość i wysokość.",
          tex: "H=V:P_p\\qquad P_p=V:H",
          litery: "$V$ – objętość, $P_p$ – pole podstawy, $H$ – wysokość graniastosłupa.",
          przyklad: "Objętość $96$ cm$^3$, pole podstawy $12$ cm$^2$. Wysokość: $H = 96 : 12 = 8$ cm.",
          uwaga: "Szukany wymiar dostajemy przez dzielenie, a nie przez odejmowanie.",
        },
      ],
      jak: [
        "Ustal, jaka figura jest podstawą, i oblicz jej pole.",
        "Znajdź wysokość graniastosłupa. To długość krawędzi bocznej, a nie wysokość figury z podstawy.",
        "Pomnóż pole podstawy przez wysokość graniastosłupa.",
        "Dopisz jednostkę sześcienną. Gdy szukasz wysokości, podziel objętość przez pole podstawy.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Podstawą graniastosłupa prostego jest trapez. Jakie figury są ścianami bocznymi tego graniastosłupa? **Wybierz właściwą odpowiedź.**",
          opcje: ["trapezy", "trójkąty", "prostokąty", "równoległoboki"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Podstawą ostrosłupa jest kwadrat. Jakie figury są ścianami bocznymi tego ostrosłupa? **Wybierz właściwą odpowiedź.**",
          opcje: ["cztery kwadraty", "cztery trójkąty", "cztery prostokąty", "dwa kwadraty i dwa trójkąty"],
          poprawna: 1,
        },
        {
          nr: "3",
          tresc: "Podstawą graniastosłupa prostego jest trójkąt prostokątny o przyprostokątnych $6$ cm i $5$ cm. Wysokość graniastosłupa ma $8$ cm. Jaka jest objętość tego graniastosłupa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$120$ cm$^3$", "$240$ cm$^3$", "$60$ cm$^3$", "$19$ cm$^3$"],
          poprawna: 0,
        },
        {
          nr: "4",
          tresc: "Rozważ trzy zdania o graniastosłupach i ostrosłupach. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Graniastosłup o polu podstawy $20$ cm$^2$ i wysokości $5$ cm ma objętość $100$ cm$^3$.", litery: "PF", poprawna: 0 },
            { tekst: "Ostrosłup ma dwie podstawy, tak jak graniastosłup.", litery: "PF", poprawna: 1 },
            { tekst: "Gdy wysokość graniastosłupa zmaleje dwa razy, a podstawa się nie zmieni, to objętość też zmaleje dwa razy.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "5",
          tresc: "Objętość graniastosłupa prostego wynosi $84$ cm$^3$, a pole jego podstawy to $12$ cm$^2$. Ile centymetrów ma wysokość tego graniastosłupa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$72$ cm", "$96$ cm", "$1008$ cm", "$7$ cm"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Podstawą graniastosłupa prostego jest trapez o podstawach $9$ cm i $5$ cm i wysokości $4$ cm. Wysokość graniastosłupa ma $10$ cm. Oblicz objętość tego graniastosłupa. **Zapisz obliczenia.**",
          rozwiazanie: "Pole podstawy (trapezu): $(9 + 5) \\cdot 4 : 2 = 14 \\cdot 4 : 2 = 28$ cm$^2$.\n\nObjętość to pole podstawy razy wysokość graniastosłupa: $28 \\cdot 10 = 280$ cm$^3$.\n\nOdpowiedź: objętość graniastosłupa wynosi $280$ cm$^3$.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Pierwsze pudełko jest graniastosłupem prostym, którego podstawą jest romb o boku $6$ cm i wysokości $5$ cm. Wysokość pudełka to $12$ cm. Drugie pudełko jest graniastosłupem prostym o podstawie w kształcie kwadratu o boku $5$ cm i wysokości $12$ cm. Które pudełko ma większą objętość i o ile centymetrów sześciennych? **Zapisz obliczenia.**",
          rozwiazanie: "Pole podstawy pierwszego pudełka (rombu, czyli szczególnego równoległoboku): $6 \\cdot 5 = 30$ cm$^2$.\n\nObjętość pierwszego pudełka: $30 \\cdot 12 = 360$ cm$^3$.\n\nPole podstawy drugiego pudełka: $5 \\cdot 5 = 25$ cm$^2$. Objętość drugiego pudełka: $25 \\cdot 12 = 300$ cm$^3$.\n\nRóżnica: $360 - 300 = 60$ cm$^3$.\n\nOdpowiedź: większą objętość ma pierwsze pudełko, o $60$ cm$^3$.",
        },
      ],
      generatory: [
        {
          id: "objetosc-graniastoslupa",
          nazwa: "Objętość graniastosłupa",
          opis: "Oblicz objętość graniastosłupa prostego o podstawie: prostokąt, kwadrat, trójkąt prostokątny, trapez, romb albo równoległobok.",
          generuj(r) {
            const u = r.pick(["cm", "dm"]);
            const p = podstawa(r, u);
            const H = r.int(2, 12);
            const V = p.P * H;
            return zad(
              r.chance()
                ? `Podstawą graniastosłupa prostego jest ${p.opis}. Wysokość graniastosłupa ma ${dl(H, u)}. Oblicz objętość tego graniastosłupa.`
                : `Podstawą graniastosłupa prostego jest ${p.opis}, a krawędź boczna tego graniastosłupa ma ${dl(H, u)}. Jaka jest jego objętość?`,
              etV(u),
              V,
              `$${lcz(V)}$ ${u}$^3$`,
              [
                `Pole podstawy: ${p.krok}.`,
                "Objętość graniastosłupa to pole podstawy razy wysokość.",
                `${wz(`${p.P} \\cdot ${H}`, V, u, 3)}.`,
              ],
            );
          },
        },
        {
          id: "wymiar-graniastoslupa",
          nazwa: "Brakujący wymiar",
          opis: "Oblicz wysokość graniastosłupa, pole jego podstawy albo brakujący bok prostokątnej podstawy, gdy znasz objętość.",
          generuj(r) {
            const u = r.pick(["cm", "dm"]);
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const P = r.int(4, 40), H = r.int(2, 12);
              return zad(
                `Objętość graniastosłupa prostego wynosi $${lcz(P * H)}$ ${u}$^3$, a pole jego podstawy to $${P}$ ${u}$^2$. Ile ${DL[u]} ma wysokość tego graniastosłupa?`,
                `Wysokość (w ${u}) $=$`,
                H,
                `$${H}$ ${u}`,
                ["Objętość to pole podstawy razy wysokość, więc wysokość to objętość podzielona przez pole podstawy.", `$${lcz(P * H)} : ${P} = ${H}$ ${u}.`],
              );
            }
            if (tryb === 1) {
              const P = r.int(4, 40), H = r.int(2, 12);
              return zad(
                `Graniastosłup prosty ma wysokość ${dl(H, u)} i objętość $${lcz(P * H)}$ ${u}$^3$. Jakie jest pole podstawy tego graniastosłupa?`,
                etP(u),
                P,
                `$${P}$ ${u}$^2$`,
                ["Objętość to pole podstawy razy wysokość, więc pole podstawy to objętość podzielona przez wysokość.", `$${lcz(P * H)} : ${H} = ${P}$ ${u}$^2$.`],
              );
            }
            const a = r.int(2, 12), b = r.intBez(2, 12, a), H = r.int(2, 12);
            return zad(
              `Podstawą graniastosłupa prostego jest prostokąt, którego jeden bok ma ${dl(a, u)}. Wysokość graniastosłupa to ${dl(H, u)}, a jego objętość wynosi $${lcz(a * b * H)}$ ${u}$^3$. Ile ${DL[u]} ma drugi bok podstawy?`,
              `Drugi bok (w ${u}) $=$`,
              b,
              `$${b}$ ${u}`,
              [
                `Pole podstawy: $${lcz(a * b * H)} : ${H} = ${a * b}$ ${u}$^2$.`,
                "Pole prostokąta to iloczyn jego boków, więc drugi bok to pole podzielone przez znany bok.",
                `$${a * b} : ${a} = ${b}$ ${u}.`,
              ],
            );
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 2
    {
      id: "zamiana-jednostek",
      nazwa: "Zamiana jednostek",
      sciaga: [
        {
          nazwa: "Jednostki objętości",
          slownie: "Objętość mierzymy w milimetrach, centymetrach, decymetrach i metrach sześciennych. Każda większa jednostka to $1000$ mniejszych, bo w sześcianie o krawędzi $1$ dm mieści się $10 \\cdot 10 \\cdot 10 = 1000$ sześcianików o krawędzi $1$ cm.",
          tex: "1\\ \\text{cm}^3=1000\\ \\text{mm}^3\\qquad 1\\ \\text{dm}^3=1000\\ \\text{cm}^3\\qquad 1\\ \\text{m}^3=1000\\ \\text{dm}^3",
          przyklad: "W $1$ dm$^3$ jest $1000$ cm$^3$, a w $1$ m$^3$ jest $1000$ dm$^3$.",
          uwaga: "To nie jest tak jak z długością. Długości zamieniamy przez $10$ lub $100$, a objętości przez $1000$.",
        },
        {
          nazwa: "Zamiana jednostek objętości",
          slownie: "Zamieniając na mniejszą jednostkę, mnożymy przez $1000$. Zamieniając na większą jednostkę, dzielimy przez $1000$. Przy przejściu przez dwie jednostki robimy to dwa razy.",
          tex: "\\cdot\\,1000\\qquad :\\,1000",
          litery: "$\\cdot 1000$ – zamiana na mniejszą jednostkę, $: 1000$ – zamiana na większą jednostkę.",
          przyklad: "$2{,}5$ dm$^3$ $= 2{,}5 \\cdot 1000 = 2500$ cm$^3$. $4275$ cm$^3$ $= 4275 : 1000 = 4{,}275$ dm$^3$. $1$ m$^3$ $= 1000 \\cdot 1000 = 1\\,000\\,000$ cm$^3$.",
          uwaga: "Przy dzieleniu przez $1000$ przecinek przesuwa się o trzy miejsca w lewo, przy mnożeniu – o trzy w prawo.",
        },
        {
          nazwa: "Litr i mililitr",
          slownie: "Pojemność naczynia mierzymy w litrach i mililitrach. Litr to to samo co decymetr sześcienny, a mililitr to to samo co centymetr sześcienny. W metrze sześciennym mieści się $1000$ litrów.",
          tex: "1\\ \\text{l}=1\\ \\text{dm}^3\\qquad 1\\ \\text{ml}=1\\ \\text{cm}^3\\qquad 1\\ \\text{m}^3=1000\\ \\text{l}",
          przyklad: "Butelka $1{,}5$ l to $1500$ ml, czyli $1500$ cm$^3$. Zbiornik $2{,}5$ m$^3$ mieści $2500$ l.",
          uwaga: "Litry na mililitry też zamieniamy przez $1000$: $2$ l to $2000$ ml, a nie $200$ ml.",
        },
        {
          nazwa: "Wymiary w różnych jednostkach",
          slownie: "Przed obliczeniem objętości zamień wszystkie wymiary na tę samą jednostkę. Gdy pytają o litry, najwygodniej zamienić wymiary na decymetry. Wtedy objętość w dm$^3$ to od razu litry.",
          przyklad: "Akwarium ma wymiary $50$ cm, $4$ dm i $30$ cm. Zamieniamy na decymetry: $5$ dm, $4$ dm, $3$ dm. Objętość: $5 \\cdot 4 \\cdot 3 = 60$ dm$^3$, czyli $60$ l.",
          uwaga: "Długości w cm zamieniamy na dm, dzieląc przez $10$. Dopiero objętość w cm$^3$ dzielimy przez $1000$.",
        },
        {
          nazwa: "Porównywanie objętości",
          slownie: "Żeby porównać objętości, zapisz je w tej samej jednostce. Potem porównaj same liczby.",
          przyklad: "Co jest większe: $2{,}5$ dm$^3$ czy $2400$ cm$^3$? Zamieniamy: $2{,}5$ dm$^3$ $= 2500$ cm$^3$. Zatem $2500 > 2400$, więc większe jest $2{,}5$ dm$^3$.",
          uwaga: "Nie porównuj liczb bez jednostek: $2400$ jest większe od $2{,}5$, ale $2400$ cm$^3$ jest mniejsze od $2{,}5$ dm$^3$.",
        },
      ],
      jak: [
        "Sprawdź, w jakiej jednostce jest dana liczba i w jakiej masz podać wynik.",
        "Przypomnij sobie: jedna większa jednostka to $1000$ mniejszych ($1$ l $= 1$ dm$^3$, $1$ ml $= 1$ cm$^3$).",
        "Na mniejszą jednostkę mnożysz przez $1000$, na większą dzielisz przez $1000$.",
        "Przed obliczeniem objętości zapisz wszystkie wymiary w jednej jednostce i dopisz jednostkę do wyniku.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Ile centymetrów sześciennych to $4$ dm$^3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$40$ cm$^3$", "$400$ cm$^3$", "$4000$ cm$^3$", "$4\\,000\\,000$ cm$^3$"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Ile metrów sześciennych to $7500$ dm$^3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7{,}5$ m$^3$", "$75$ m$^3$", "$0{,}75$ m$^3$", "$7\\,500\\,000$ m$^3$"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "Zbiornik ma pojemność $2{,}5$ m$^3$. Ile litrów wody mieści się w tym zbiorniku? **Wybierz właściwą odpowiedź.**",
          opcje: ["$25$ l", "$250$ l", "$25\\,000$ l", "$2500$ l"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "Rozważ trzy zdania o jednostkach objętości. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$2$ l $= 2000$ cm$^3$", litery: "PF", poprawna: 0 },
            { tekst: "$0{,}5$ m$^3$ $= 50$ dm$^3$", litery: "PF", poprawna: 1 },
            { tekst: "$6$ cm$^3$ $= 60$ mm$^3$", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "12",
          tresc: "Która z podanych objętości jest największa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2{,}5$ dm$^3$", "$0{,}003$ m$^3$", "$2400$ cm$^3$", "$2$ l"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "W beczce jest $0{,}2$ m$^3$ soku. Sok rozlano do butelek o pojemności $0{,}5$ l. Ile butelek napełniono? **Zapisz obliczenia.**",
          rozwiazanie: "Zamieniamy metry sześcienne na decymetry sześcienne: $0{,}2$ m$^3$ $= 0{,}2 \\cdot 1000 = 200$ dm$^3$.\n\nDecymetr sześcienny to litr, więc w beczce jest $200$ l soku.\n\nW $1$ l mieszczą się dwie butelki po $0{,}5$ l, więc butelek jest $200 \\cdot 2 = 400$.\n\nOdpowiedź: napełniono $400$ butelek.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Zbiornik ma kształt prostopadłościanu o wymiarach $2$ m, $15$ dm i $80$ cm. Ile litrów wody mieści się w zbiorniku po brzegi? Ile to metrów sześciennych? **Zapisz obliczenia.**",
          rozwiazanie: "Zamieniamy wszystkie wymiary na decymetry: $2$ m $= 20$ dm, $15$ dm, $80$ cm $= 8$ dm.\n\nObjętość: $20 \\cdot 15 \\cdot 8 = 2400$ dm$^3$.\n\nDecymetr sześcienny to litr, więc zbiornik mieści $2400$ l.\n\nZamieniamy na metry sześcienne: $2400 : 1000 = 2{,}4$ m$^3$.\n\nOdpowiedź: w zbiorniku mieści się $2400$ l wody, czyli $2{,}4$ m$^3$.",
        },
      ],
      generatory: [
        {
          id: "zamiana-objetosci",
          nazwa: "Zamiana jednostek",
          opis: "Zamień jednostki objętości i pojemności: mm$^3$, cm$^3$, dm$^3$, m$^3$, litry i mililitry.",
          generuj(r) {
            const [wi, ma] = r.pick(PARY);
            const W = J[wi], M = J[ma];
            const zapis = (tex, jj) => `$${tex}$ ${jj.t}`;
            const wprost = r.chance();
            if (r.chance()) {
              // z większej jednostki na mniejszą: mnożymy przez 1000
              const k = r.int(0, 2);
              const n = k === 0 ? r.int(2, 99) : r.int(11, 999);
              const wynik = n * 10 ** (3 - k);
              const dane = zapis(dec(n, k), W);
              return zad(
                wprost ? `Zamień ${dane} na ${M.na}.` : `Ile ${M.gen} to ${dane}?`,
                `${M.t === "l" || M.t === "ml" ? "Pojemność" : "Objętość"} (w ${M.t}) $=$`,
                wynik,
                zapis(lcz(wynik), M),
                [
                  `W jednej większej jednostce mieści się $1000$ mniejszych: ${zapis("1", W)} $= 1000$ ${M.t}.`,
                  `Zamieniamy na mniejszą jednostkę, więc mnożymy przez $1000$.`,
                  `${zapis(`${dec(n, k)} \\cdot 1000 = ${lcz(wynik)}`, M)}.`,
                ],
              );
            }
            // z mniejszej jednostki na większą: dzielimy przez 1000
            const S = r.int(1, 9999);
            const dane = zapis(lcz(S), M);
            return zad(
              wprost ? `Zamień ${dane} na ${W.na}.` : `Ile ${W.gen} to ${dane}?`,
              `${W.t === "l" ? "Pojemność" : "Objętość"} (w ${W.t}) $=$`,
              q(S, 1000),
              zapis(dec(S, 3), W),
              [
                `W jednej większej jednostce mieści się $1000$ mniejszych: ${zapis("1", W)} $= 1000$ ${M.t}.`,
                `Zamieniamy na większą jednostkę, więc dzielimy przez $1000$.`,
                `${zapis(`${lcz(S)} : 1000 = ${dec(S, 3)}`, W)}.`,
              ],
            );
          },
        },
        {
          id: "zbiornik-litry",
          nazwa: "Ile litrów wody",
          opis: "Oblicz, ile litrów mieści zbiornik w kształcie prostopadłościanu, albo ile butelek można napełnić.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const a = 5 * r.int(4, 12), b = 5 * r.int(4, 12), c = 5 * r.int(4, 12);
              const V = a * b * c;
              return zad(
                `Akwarium ma kształt prostopadłościanu o wymiarach ${dl(a, "cm")}, ${dl(b, "cm")} i ${dl(c, "cm")}. Ile litrów wody mieści się w nim po brzegi?`,
                "Pojemność (w l) $=$",
                q(V, 1000),
                `$${dec(V, 3)}$ l`,
                [
                  `Objętość: ${wz(`${a} \\cdot ${b} \\cdot ${c}`, V, "cm", 3)}.`,
                  "Litr to $1000$ cm$^3$, więc dzielimy przez $1000$.",
                  `$${lcz(V)} : 1000 = ${dec(V, 3)}$ l.`,
                ],
              );
            }
            if (tryb === 1) {
              const L = r.int(3, 40), m = r.pick([100, 200, 250, 500]);
              const n = (1000 * L) / m;
              return zad(
                `W kanistrze jest ${dl(L, "l")} soku. Sok rozlano do szklanek o pojemności $${m}$ ml, napełniając każdą po brzegi. Ile szklanek napełniono?`,
                "Liczba szklanek $=$",
                n,
                `$${n}$`,
                [
                  `Zamieniamy litry na mililitry: $${L} \\cdot 1000 = ${lcz(1000 * L)}$ ml.`,
                  `Liczba szklanek: $${lcz(1000 * L)} : ${m} = ${n}$.`,
                ],
              );
            }
            let a, b, c;
            do { a = r.int(4, 12); b = r.int(3, 8); c = r.int(1, 2); } while (a * b * c > 99 || b > a);
            const V = a * b * c;
            return zad(
              `Basen ma kształt prostopadłościanu. Ma ${dl(a, "m")} długości, ${dl(b, "m")} szerokości i ${dl(c, "m")} głębokości. Ile litrów wody mieści się w nim po brzegi?`,
              "Pojemność (w l) $=$",
              V * 1000,
              `$${lcz(V * 1000)}$ l`,
              [
                `Objętość: ${wz(`${a} \\cdot ${b} \\cdot ${c}`, V, "m", 3)}.`,
                "W $1$ m$^3$ mieści się $1000$ l, więc mnożymy przez $1000$.",
                `$${V} \\cdot 1000 = ${lcz(V * 1000)}$ l.`,
              ],
            );
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3
    {
      id: "siatki-bryl",
      nazwa: "Siatki brył",
      sciaga: [
        {
          nazwa: "Siatka graniastosłupa",
          slownie: "Siatka graniastosłupa prostego to dwie takie same podstawy i tyle prostokątów, ile boków ma podstawa. Razem figur jest o $2$ więcej niż boków podstawy.",
          przyklad: "Graniastosłup o podstawie trapezu: $2$ trapezy i $4$ prostokąty, razem $6$ figur.",
          uwaga: "Prostokąty ścian bocznych mają wspólną wysokość, czyli wysokość graniastosłupa. Ich długości to boki podstawy.",
        },
        {
          nazwa: "Siatka ostrosłupa",
          slownie: "Siatka ostrosłupa to jedna podstawa i tyle trójkątów, ile boków ma podstawa. Razem figur jest o $1$ więcej niż boków podstawy.",
          przyklad: "Ostrosłup czworokątny: kwadrat (podstawa) i $4$ trójkąty, razem $5$ figur. Ostrosłup trójkątny: $4$ trójkąty.",
          uwaga: "Ostrosłup ma tylko jedną podstawę. Nie dodawaj drugiej, jak w graniastosłupie.",
        },
        {
          nazwa: "Ostrosłup prawidłowy",
          slownie: "W ostrosłupie prawidłowym podstawą jest wielokąt foremny (wszystkie boki równe), a ściany boczne są takimi samymi trójkątami równoramiennymi. Krawędzie podstawy są równe i krawędzie boczne są równe.",
          przyklad: "Ostrosłup prawidłowy czworokątny o krawędzi podstawy $6$ cm i krawędzi bocznej $5$ cm: siatka to kwadrat $6$ cm na $6$ cm i $4$ trójkąty równoramienne o podstawie $6$ cm i ramionach $5$ cm.",
          uwaga: "Podstawa trójkąta ściany bocznej to krawędź podstawy ostrosłupa. Ramiona trójkąta to krawędzie boczne.",
        },
        {
          nazwa: "Krawędzie i ściany",
          slownie: "Gdy podstawa ma $n$ boków, graniastosłup ma $n + 2$ ściany, $3n$ krawędzi i $2n$ wierzchołków, a ostrosłup ma $n + 1$ ścian, $2n$ krawędzi i $n + 1$ wierzchołków. Sumę długości krawędzi liczymy, dodając krawędzie podstawy i boczne.",
          tex: "n\\cdot a+n\\cdot b",
          litery: "Wzór na sumę długości krawędzi ostrosłupa prawidłowego. $n$ – liczba boków podstawy, $a$ – krawędź podstawy, $b$ – krawędź boczna.",
          przyklad: "Ostrosłup prawidłowy czworokątny, $a = 6$ cm, $b = 5$ cm: ma $2 \\cdot 4 = 8$ krawędzi, a suma ich długości to $4 \\cdot 6 + 4 \\cdot 5 = 44$ cm.",
          uwaga: "Krawędzi nie ma tyle co ścian. Ostrosłup czworokątny ma $5$ ścian, ale $8$ krawędzi.",
        },
        {
          nazwa: "Czy to siatka bryły",
          slownie: "Sprawdź, czy figury pasują do siebie. Podstawa ma tyle boków, ile jest ścian bocznych. Sklejane boki muszą mieć tę samą długość, a po złożeniu figury nie mogą nachodzić na siebie.",
          przyklad: "Kwadrat o boku $4$ cm i cztery trójkąty o podstawach $4$ cm mogą być siatką ostrosłupa. Gdy trójkąty miałyby podstawy $5$ cm, boki by nie pasowały.",
          uwaga: "Sama liczba figur nie wystarczy. Sprawdź jeszcze długości sklejanych boków.",
        },
      ],
      jak: [
        "Ustal, jaka to bryła: dwie podstawy i prostokąty to graniastosłup, jedna podstawa i trójkąty to ostrosłup.",
        "Policz boki podstawy. Graniastosłup: figur w siatce o $2$ więcej, ostrosłup: o $1$ więcej.",
        "Krawędzie: graniastosłup ma $3$ razy tyle krawędzi co boków podstawy, ostrosłup $2$ razy tyle.",
        "Sumę długości krawędzi policz grupami: krawędzie podstawy i krawędzie boczne, i dodaj.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Z ilu figur składa się siatka ostrosłupa, którego podstawą jest sześciokąt? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$7$", "$12$", "$8$"],
          poprawna: 1,
        },
        {
          nr: "16",
          tresc: "Siatka składa się z kwadratu i czterech trójkątów równoramiennych. Jaką bryłę można z niej złożyć? **Wybierz właściwą odpowiedź.**",
          opcje: ["prostopadłościan", "ostrosłup trójkątny", "graniastosłup czworokątny", "ostrosłup czworokątny"],
          poprawna: 3,
        },
        {
          nr: "17",
          tresc: "Podstawą ostrosłupa jest ośmiokąt. Ile krawędzi ma ten ostrosłup? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$", "$24$", "$16$", "$9$"],
          poprawna: 2,
        },
        {
          nr: "18",
          tresc: "Rozważ trzy zdania o siatkach brył. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Siatka graniastosłupa trójkątnego składa się z $4$ figur.", litery: "PF", poprawna: 1 },
            { tekst: "Siatka ostrosłupa czworokątnego składa się z $5$ figur.", litery: "PF", poprawna: 0 },
            { tekst: "W siatce ostrosłupa jest tyle trójkątów, ile boków ma podstawa.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "19",
          tresc: "Ostrosłup prawidłowy czworokątny ma krawędź podstawy $8$ cm i krawędź boczną $6$ cm. Jaka jest suma długości wszystkich krawędzi tego ostrosłupa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$56$ cm", "$14$ cm", "$28$ cm", "$32$ cm"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 3,
          tresc: "Ostrosłup prawidłowy sześciokątny ma krawędź podstawy $4$ cm i krawędź boczną $7$ cm. Z jakich figur składa się siatka tego ostrosłupa? Ile krawędzi ma ostrosłup i jaka jest suma ich długości? **Zapisz obliczenia.**",
          rozwiazanie: "Podstawa ma $6$ boków, więc siatka składa się z jednego sześciokąta (podstawy) i $6$ trójkątów równoramiennych (ścian bocznych), razem $7$ figur.\n\nKrawędzi jest $2 \\cdot 6 = 12$: sześć w podstawie i sześć bocznych.\n\nKrawędzie podstawy: $6 \\cdot 4 = 24$ cm. Krawędzie boczne: $6 \\cdot 7 = 42$ cm.\n\nSuma długości krawędzi: $24 + 42 = 66$ cm.\n\nOdpowiedź: siatka składa się z sześciokąta i sześciu trójkątów, ostrosłup ma $12$ krawędzi o łącznej długości $66$ cm.",
        },
        {
          nr: "21",
          punkty: 2,
          tresc: "Ola narysowała kwadrat o boku $4$ cm i dołączyła do każdego jego boku trójkąt równoramienny o podstawie $5$ cm. Czy z takiego rysunku można złożyć ostrosłup? Uzasadnij odpowiedź i napisz, jaką długość powinna mieć podstawa każdego trójkąta. **Zapisz uzasadnienie.**",
          rozwiazanie: "Podstawa trójkąta ściany bocznej jest sklejana z bokiem kwadratu, więc oba boki muszą mieć tę samą długość.\n\nBok kwadratu ma $4$ cm, a podstawa trójkąta $5$ cm, więc boki nie pasują do siebie.\n\nAby siatka była dobra, podstawa każdego trójkąta powinna mieć $4$ cm.\n\nOdpowiedź: nie, z takiego rysunku nie da się złożyć ostrosłupa. Podstawy trójkątów powinny mieć po $4$ cm.",
        },
      ],
      generatory: [
        {
          id: "figury-w-siatce",
          nazwa: "Figury w siatce",
          opis: "Siatka graniastosłupa albo ostrosłupa: oblicz, z ilu figur się składa, ile ma trójkątów albo ile boków ma podstawa.",
          generuj(r) {
            const tryb = r.int(0, 4);
            const n = r.int(3, 10);
            if (tryb === 0) {
              return zad(
                r.chance() ? `Z ilu figur składa się siatka graniastosłupa ${NKD(n)}?` : `Podstawą graniastosłupa prostego jest wielokąt o $${n}$ bokach. Z ilu figur składa się siatka tego graniastosłupa?`,
                "Liczba figur $=$",
                n + 2,
                `$${n + 2}$`,
                [`Prostokątów jest tyle, ile boków ma podstawa, czyli $${n}$.`, `Do tego dwie podstawy: $${n} + 2 = ${n + 2}$.`],
              );
            }
            if (tryb === 1) {
              return zad(
                r.chance() ? `Z ilu figur składa się siatka ostrosłupa ${NKD(n)}?` : `Podstawą ostrosłupa jest wielokąt o $${n}$ bokach. Z ilu figur składa się siatka tego ostrosłupa?`,
                "Liczba figur $=$",
                n + 1,
                `$${n + 1}$`,
                [`Trójkątów jest tyle, ile boków ma podstawa, czyli $${n}$.`, `Do tego jedna podstawa: $${n} + 1 = ${n + 1}$.`],
              );
            }
            if (tryb === 2) {
              return zad(
                `Siatka graniastosłupa prostego składa się z $${n + 2}$ figur. Ile boków ma podstawa tego graniastosłupa?`,
                "Liczba boków podstawy $=$",
                n,
                `$${n}$`,
                ["W siatce są dwie podstawy, a pozostałe figury to prostokąty.", `Prostokątów jest $${n + 2} - 2 = ${n}$, a tyle boków ma podstawa.`],
              );
            }
            if (tryb === 3) {
              return zad(
                `Siatka ostrosłupa składa się z $${n + 1}$ figur. Ile boków ma podstawa tego ostrosłupa?`,
                "Liczba boków podstawy $=$",
                n,
                `$${n}$`,
                ["W siatce ostrosłupa jest jedna podstawa, a pozostałe figury to trójkąty.", `Trójkątów jest $${n + 1} - 1 = ${n}$, a tyle boków ma podstawa.`],
              );
            }
            return zad(
              `Ile trójkątów ma siatka ostrosłupa ${NKD(n)}?`,
              "Liczba trójkątów $=$",
              n,
              `$${n}$`,
              ["Trójkątami są ściany boczne ostrosłupa. Podstawa jest wielokątem.", `Ścian bocznych jest tyle, ile boków ma podstawa, czyli $${n}$.`],
            );
          },
        },
        {
          id: "krawedzie-ostroslupa",
          nazwa: "Krawędzie brył",
          opis: "Oblicz sumę długości krawędzi ostrosłupa prawidłowego, długość krawędzi bocznej albo liczbę krawędzi.",
          generuj(r) {
            const tryb = r.int(0, 3);
            const n = r.int(3, 8);
            const a = r.int(2, 9);
            const b = r.int(Math.floor(a / 2) + 1, 12);
            if (tryb === 0) {
              return zad(
                `Ostrosłup prawidłowy ${NK[n]} ma krawędź podstawy ${dl(a, "cm")} i krawędź boczną ${dl(b, "cm")}. Jaka jest suma długości wszystkich krawędzi tego ostrosłupa?`,
                "Suma krawędzi (w cm) $=$",
                n * (a + b),
                `$${n * (a + b)}$ cm`,
                [
                  `Krawędzie podstawy: $${n} \\cdot ${a} = ${n * a}$ cm.`,
                  `Krawędzie boczne: $${n} \\cdot ${b} = ${n * b}$ cm.`,
                  `Razem: $${n * a} + ${n * b} = ${n * (a + b)}$ cm.`,
                ],
              );
            }
            if (tryb === 1) {
              return zad(
                `Suma długości wszystkich krawędzi ostrosłupa prawidłowego ${NKD(n)} wynosi $${n * (a + b)}$ cm, a krawędź podstawy ma ${dl(a, "cm")}. Ile centymetrów ma krawędź boczna tego ostrosłupa?`,
                "Krawędź boczna (w cm) $=$",
                b,
                `$${b}$ cm`,
                [
                  `Krawędzie podstawy i krawędzie boczne mają razem $${n} \\cdot ${a} + ${n} \\cdot b$, a ich suma jest równa $${n} \\cdot (${a} + b)$.`,
                  `Suma jednej krawędzi podstawy i jednej bocznej: $${n * (a + b)} : ${n} = ${a + b}$ cm.`,
                  `Krawędź boczna: $${a + b} - ${a} = ${b}$ cm.`,
                ],
              );
            }
            if (tryb === 2) {
              return zad(
                `Ostrosłup ma ${lm(n + 1, "wierzchołek", "wierzchołki", "wierzchołków")}. Ile krawędzi ma ten ostrosłup?`,
                "Liczba krawędzi $=$",
                2 * n,
                `$${2 * n}$`,
                [
                  `Jeden wierzchołek jest na górze, więc podstawa ma $${n + 1} - 1 = ${n}$ ${mn(n, "wierzchołek", "wierzchołki", "wierzchołków")}, czyli tyle samo boków.`,
                  `Krawędzi jest $2$ razy tyle: $2 \\cdot ${n} = ${2 * n}$.`,
                ],
              );
            }
            return zad(
              `Graniastosłup prosty ma $${n + 2}$ ${mn(n + 2, "ścianę", "ściany", "ścian")}. Ile krawędzi ma ten graniastosłup?`,
              "Liczba krawędzi $=$",
              3 * n,
              `$${3 * n}$`,
              [
                `Dwie ściany to podstawy, więc podstawa ma $${n + 2} - 2 = ${n}$ ${mn(n, "bok", "boki", "boków")}.`,
                `Krawędzi jest $3$ razy tyle: $3 \\cdot ${n} = ${3 * n}$.`,
              ],
            );
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4
    {
      id: "pole-powierzchni",
      nazwa: "Pole powierzchni bryły",
      sciaga: [
        {
          nazwa: "Pole powierzchni bryły",
          slownie: "Pole powierzchni całkowitej bryły to suma pól wszystkich jej ścian. Pole powierzchni bocznej to suma pól tylko ścian bocznych, bez podstaw. Pole mierzymy w jednostkach kwadratowych.",
          tex: "P_c=2\\cdot P_p+P_b\\qquad P_c=P_p+P_b",
          litery: "$P_c$ – pole powierzchni całkowitej, $P_p$ – pole podstawy, $P_b$ – pole powierzchni bocznej. Pierwszy wzór dla graniastosłupa (dwie podstawy), drugi dla ostrosłupa (jedna podstawa).",
          przyklad: "Graniastosłup: podstawy mają razem $2 \\cdot 6 = 12$ cm$^2$, ściany boczne $120$ cm$^2$, więc $P_c = 132$ cm$^2$.",
          uwaga: "Pole powierzchni mierzymy w cm$^2$, a objętość w cm$^3$. Nie mylimy tych jednostek.",
        },
        {
          nazwa: "Prostopadłościan i sześcian",
          slownie: "Prostopadłościan ma trzy pary jednakowych ścian. Pole powierzchni to dwa razy suma pól trzech różnych ścian. Sześcian ma sześć jednakowych kwadratów.",
          tex: "P_c=2\\cdot(ab+bc+ac)\\qquad P_c=6\\cdot a^2",
          litery: "$a$, $b$, $c$ – wymiary prostopadłościanu, $a$ w drugim wzorze – krawędź sześcianu.",
          przyklad: "Prostopadłościan $5$ cm, $3$ cm, $2$ cm: $2 \\cdot (15 + 10 + 6) = 62$ cm$^2$. Sześcian o krawędzi $4$ cm: $6 \\cdot 4 \\cdot 4 = 96$ cm$^2$.",
          uwaga: "Nie zapomnij o mnożeniu przez $2$ w prostopadłościanie. Ścian jest $6$, a nie $3$.",
        },
        {
          nazwa: "Graniastosłup prosty",
          slownie: "Ściany boczne graniastosłupa po rozłożeniu tworzą jeden prostokąt. Jego jeden bok to obwód podstawy, a drugi to wysokość graniastosłupa. Do tego dodajemy dwie podstawy.",
          tex: "P_b=\\text{obwód}\\cdot H\\qquad P_c=2\\cdot P_p+P_b",
          litery: "$H$ – wysokość graniastosłupa, $P_p$ – pole podstawy, $P_b$ – pole powierzchni bocznej.",
          przyklad: "Podstawa: trójkąt prostokątny o bokach $3$, $4$, $5$ cm, wysokość $10$ cm. $P_p = 3 \\cdot 4 : 2 = 6$ cm$^2$, $P_b = (3 + 4 + 5) \\cdot 10 = 120$ cm$^2$, $P_c = 2 \\cdot 6 + 120 = 132$ cm$^2$.",
          uwaga: "W $P_b$ liczymy obwód podstawy, czyli sumę wszystkich jej boków, a nie pole. Pamiętaj o dwóch podstawach.",
        },
        {
          nazwa: "Ostrosłup",
          slownie: "Pole powierzchni ostrosłupa to pole podstawy plus pola wszystkich trójkątnych ścian bocznych. Pole trójkąta liczymy z jego podstawy i wysokości.",
          tex: "P_c=P_p+P_b",
          litery: "$P_p$ – pole podstawy, $P_b$ – suma pól ścian bocznych.",
          przyklad: "Ostrosłup prawidłowy czworokątny: krawędź podstawy $6$ cm, wysokość każdej ściany bocznej $5$ cm. $P_p = 36$ cm$^2$, jedna ściana ma $6 \\cdot 5 : 2 = 15$ cm$^2$, a cztery ściany $60$ cm$^2$. $P_c = 36 + 60 = 96$ cm$^2$.",
          uwaga: "Wysokość ściany bocznej to nie wysokość ostrosłupa. Do pola trójkąta bierzemy tę pierwszą, a trójkąty liczymy każdy osobno.",
        },
        {
          nazwa: "Bryła bez jednej ściany",
          slownie: "Pudełko bez wieka albo akwarium bez pokrywy nie ma jednej ściany. Pole potrzebnego materiału to pole powierzchni całkowitej bez pola tej ściany.",
          przyklad: "Akwarium bez pokrywy ma wymiary $5$ dm, $3$ dm i $4$ dm. Pole całej powierzchni: $2 \\cdot (15 + 20 + 12) = 94$ dm$^2$. Odejmujemy pokrywę $5 \\cdot 3 = 15$ dm$^2$, więc szkła potrzeba $79$ dm$^2$.",
          uwaga: "Najpierw zastanów się, których ścian bryła nie ma. Dopiero potem licz.",
        },
      ],
      jak: [
        "Ustal, jaka to bryła, i policz jej ściany: które są podstawami, a które bocznymi.",
        "Oblicz pole podstawy. Dla graniastosłupa oblicz też obwód podstawy.",
        "Oblicz pole powierzchni bocznej: graniastosłup – obwód razy wysokość, ostrosłup – suma pól trójkątów.",
        "Dodaj pola: graniastosłup – dwie podstawy i ściany boczne, ostrosłup – jedna podstawa i ściany boczne. Dopisz jednostkę kwadratową.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Sześcian ma krawędź długości $5$ cm. Jakie jest pole powierzchni tego sześcianu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$25$ cm$^2$", "$125$ cm$^2$", "$150$ cm$^2$", "$30$ cm$^2$"],
          poprawna: 2,
        },
        {
          nr: "23",
          tresc: "Prostopadłościan ma wymiary $4$ cm, $3$ cm i $2$ cm. Jakie jest pole powierzchni tego prostopadłościanu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$52$ cm$^2$", "$26$ cm$^2$", "$24$ cm$^2$", "$9$ cm$^2$"],
          poprawna: 0,
        },
        {
          nr: "24",
          tresc: "Podstawą graniastosłupa prostego jest romb o boku $5$ cm i wysokości $4$ cm. Wysokość graniastosłupa ma $10$ cm. Jakie jest pole powierzchni bocznej tego graniastosłupa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$50$ cm$^2$", "$100$ cm$^2$", "$240$ cm$^2$", "$200$ cm$^2$"],
          poprawna: 3,
        },
        {
          nr: "25",
          tresc: "Rozważ trzy zdania o polu powierzchni brył. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Pole powierzchni sześcianu o krawędzi $2$ cm wynosi $24$ cm$^2$.", litery: "PF", poprawna: 0 },
            { tekst: "Pole powierzchni bocznej graniastosłupa to pole podstawy razy wysokość.", litery: "PF", poprawna: 1 },
            { tekst: "Pole powierzchni bocznej graniastosłupa prostego to obwód podstawy razy wysokość graniastosłupa.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "26",
          tresc: "Ostrosłup prawidłowy czworokątny ma krawędź podstawy $8$ cm, a wysokość każdej ściany bocznej ma $5$ cm. Jakie jest pole powierzchni całkowitej tego ostrosłupa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$80$ cm$^2$", "$144$ cm$^2$", "$224$ cm$^2$", "$104$ cm$^2$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 3,
          tresc: "Podstawą graniastosłupa prostego jest trapez równoramienny o podstawach $10$ cm i $4$ cm, ramionach długości $5$ cm i wysokości $4$ cm. Wysokość graniastosłupa ma $8$ cm. Oblicz pole powierzchni całkowitej tego graniastosłupa. **Zapisz obliczenia.**",
          rozwiazanie: "Pole podstawy (trapezu): $(10 + 4) \\cdot 4 : 2 = 28$ cm$^2$.\n\nObwód podstawy: $10 + 4 + 5 + 5 = 24$ cm.\n\nPole powierzchni bocznej: $24 \\cdot 8 = 192$ cm$^2$.\n\nPole powierzchni całkowitej: $2 \\cdot 28 + 192 = 56 + 192 = 248$ cm$^2$.\n\nOdpowiedź: pole powierzchni całkowitej wynosi $248$ cm$^2$.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "Akwarium bez pokrywy ma kształt prostopadłościanu o wymiarach $6$ dm, $4$ dm i $5$ dm (wysokość akwarium to $5$ dm). Ile decymetrów kwadratowych szkła zużyto na to akwarium? Ile litrów wody mieści się w nim po brzegi? **Zapisz obliczenia.**",
          rozwiazanie: "Szkło tworzy dno ($6$ dm na $4$ dm) i cztery ściany boczne, pokrywy nie ma.\n\nDno: $6 \\cdot 4 = 24$ dm$^2$.\n\nDwie ściany $6$ dm na $5$ dm: $2 \\cdot 6 \\cdot 5 = 60$ dm$^2$. Dwie ściany $4$ dm na $5$ dm: $2 \\cdot 4 \\cdot 5 = 40$ dm$^2$.\n\nRazem: $24 + 60 + 40 = 124$ dm$^2$.\n\nObjętość: $6 \\cdot 4 \\cdot 5 = 120$ dm$^3$, czyli $120$ l.\n\nOdpowiedź: zużyto $124$ dm$^2$ szkła, a akwarium mieści $120$ l wody.",
        },
      ],
      generatory: [
        {
          id: "pole-prostopadloscianu",
          nazwa: "Prostopadłościan i sześcian",
          opis: "Oblicz pole powierzchni prostopadłościanu, sześcianu, pudełka bez wieka albo sześcianu o danym polu ściany.",
          generuj(r) {
            const u = r.pick(["cm", "dm", "m"]);
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const a = r.int(2, 9), b = r.intBez(2, 9, a), c = r.intBez(2, 9, a, b);
              const P = 2 * (a * b + b * c + a * c);
              return zad(
                `Prostopadłościan ma wymiary ${dl(a, u)}, ${dl(b, u)} i ${dl(c, u)}. Oblicz pole powierzchni tego prostopadłościanu.`,
                etP(u),
                P,
                `$${P}$ ${u}$^2$`,
                [
                  "Prostopadłościan ma trzy pary jednakowych ścian.",
                  `Pola trzech różnych ścian: $${a} \\cdot ${b} = ${a * b}$, $${b} \\cdot ${c} = ${b * c}$ i $${a} \\cdot ${c} = ${a * c}$.`,
                  `${wz(`2 \\cdot (${a * b} + ${b * c} + ${a * c})`, P, u, 2)}.`,
                ],
              );
            }
            if (tryb === 1) {
              const a = r.int(2, 15);
              return zad(
                r.chance() ? `Sześcian ma krawędź długości ${dl(a, u)}. Oblicz pole powierzchni tego sześcianu.` : `Kostka ma kształt sześcianu o krawędzi ${dl(a, u)}. Jakie jest pole powierzchni tej kostki?`,
                etP(u),
                6 * a * a,
                `$${6 * a * a}$ ${u}$^2$`,
                [`Sześcian ma $6$ jednakowych ścian. Pole jednej ściany: ${wz(`${a} \\cdot ${a}`, a * a, u, 2)}.`, `${wz(`6 \\cdot ${a * a}`, 6 * a * a, u, 2)}.`],
              );
            }
            if (tryb === 2) {
              const a = r.int(2, 9), b = r.intBez(2, 9, a), c = r.int(2, 9);
              const P = 2 * (a * b + b * c + a * c) - a * b;
              return zad(
                `Pudełko bez wieka ma kształt prostopadłościanu. Jego dno ma wymiary ${dl(a, u)} na ${dl(b, u)}, a wysokość pudełka to ${dl(c, u)}. Ile ${DL[u]} kwadratowych kartonu potrzeba na to pudełko (bez zakładek)?`,
                etP(u),
                P,
                `$${P}$ ${u}$^2$`,
                [
                  `Pole dna: ${wz(`${a} \\cdot ${b}`, a * b, u, 2)}.`,
                  `Cztery ściany boczne: dwie $${a} \\cdot ${c} = ${a * c}$ i dwie $${b} \\cdot ${c} = ${b * c}$, razem $2 \\cdot ${a * c} + 2 \\cdot ${b * c} = ${2 * a * c + 2 * b * c}$ ${u}$^2$.`,
                  `Wieka nie ma, więc razem: $${a * b} + ${2 * a * c + 2 * b * c} = ${P}$ ${u}$^2$.`,
                ],
              );
            }
            const s = r.int(4, 60);
            return zad(
              `Pole jednej ściany sześcianu wynosi $${s}$ ${u}$^2$. Jakie jest pole powierzchni tego sześcianu?`,
              etP(u),
              6 * s,
              `$${6 * s}$ ${u}$^2$`,
              ["Sześcian ma $6$ jednakowych ścian.", `${wz(`6 \\cdot ${s}`, 6 * s, u, 2)}.`],
            );
          },
        },
        {
          id: "pole-graniastoslupa-ostroslupa",
          nazwa: "Graniastosłup i ostrosłup",
          opis: "Oblicz pole powierzchni bocznej albo całkowitej graniastosłupa prostego (trójkąt, romb, trapez w podstawie) albo ostrosłupa prawidłowego czworokątnego.",
          generuj(r) {
            const u = r.pick(["cm", "dm"]);
            const tryb = r.int(0, 3);
            const calk = r.chance();
            const H = r.int(2, 12);
            const koniec = (nazwaBryly) => `Oblicz pole powierzchni ${calk ? "całkowitej" : "bocznej"} ${nazwaBryly}.`;
            if (tryb === 3) {
              const a = 2 * r.int(1, 6), h = r.int(2, 12);
              const Pp = a * a, Pb = 2 * a * h;
              const P = calk ? Pp + Pb : Pb;
              const kroki = [
                `Jedna ściana boczna jest trójkątem o podstawie ${dl(a, u)} i wysokości ${dl(h, u)}: ${wz(`${a} \\cdot ${h} : 2`, (a * h) / 2, u, 2)}.`,
                `Ściany boczne (cztery): ${wz(`4 \\cdot ${(a * h) / 2}`, Pb, u, 2)}.`,
              ];
              if (calk) kroki.push(`Pole podstawy: ${wz(`${a} \\cdot ${a}`, Pp, u, 2)}. Razem: $${Pp} + ${Pb} = ${P}$ ${u}$^2$.`);
              return zad(
                `Ostrosłup prawidłowy czworokątny ma krawędź podstawy ${dl(a, u)}, a wysokość każdej ściany bocznej ma ${dl(h, u)}. ${koniec("tego ostrosłupa")}`,
                etP(u),
                P,
                `$${P}$ ${u}$^2$`,
                kroki,
              );
            }
            let opis, obwod, obwodTex, Pp, krokP;
            if (tryb === 0) {
              const [x, y, z] = r.pick([[3, 4, 5], [6, 8, 10], [9, 12, 15], [5, 12, 13], [8, 15, 17]]);
              opis = `trójkąt prostokątny o bokach ${dl(x, u)}, ${dl(y, u)} i ${dl(z, u)} (przyprostokątne mają ${dl(x, u)} i ${dl(y, u)})`;
              obwod = x + y + z;
              obwodTex = `${x} + ${y} + ${z}`;
              Pp = (x * y) / 2;
              krokP = wz(`${x} \\cdot ${y} : 2`, Pp, u, 2);
            } else if (tryb === 1) {
              const a = r.int(4, 12), h = r.int(2, a - 1);
              opis = `romb o boku ${dl(a, u)} i wysokości ${dl(h, u)}`;
              obwod = 4 * a;
              obwodTex = `4 \\cdot ${a}`;
              Pp = a * h;
              krokP = wz(`${a} \\cdot ${h}`, Pp, u, 2);
            } else {
              const [l, h, c] = r.pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10]]);
              const b = r.int(2, 8), a = b + 2 * l;
              opis = `trapez równoramienny o podstawach ${dl(a, u)} i ${dl(b, u)}, ramionach długości ${dl(c, u)} i wysokości ${dl(h, u)}`;
              obwod = a + b + 2 * c;
              obwodTex = `${a} + ${b} + 2 \\cdot ${c}`;
              Pp = ((a + b) * h) / 2;
              krokP = wz(`(${a} + ${b}) \\cdot ${h} : 2`, Pp, u, 2);
            }
            const Pb = obwod * H;
            const P = calk ? 2 * Pp + Pb : Pb;
            const kroki = [
              `Obwód podstawy: ${wz(obwodTex, obwod, u, 1).replace("$^1$", "")}.`,
              `Pole powierzchni bocznej to obwód podstawy razy wysokość: ${wz(`${obwod} \\cdot ${H}`, Pb, u, 2)}.`,
            ];
            if (calk) kroki.push(`Pole podstawy: ${krokP}.`, `Są dwie podstawy: $2 \\cdot ${Pp} + ${Pb} = ${P}$ ${u}$^2$.`);
            return zad(
              `Podstawą graniastosłupa prostego jest ${opis}. Wysokość graniastosłupa ma ${dl(H, u)}. ${koniec("tego graniastosłupa")}`,
              etP(u),
              P,
              `$${lcz(P)}$ ${u}$^2$`,
              kroki,
            );
          },
        },
      ],
    },
  ],
};
