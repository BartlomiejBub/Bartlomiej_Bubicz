// Klasa 5 (szkoła podstawowa) · rozdział I „Liczby naturalne” – Matematyka z kluczem 5 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).

// --- Pomocnicze (tylko dla tego pliku)

/** Liczba do zapisu w $…$: od pięciu cyfr z małą spacją między tysiącami (12\,345), cztery cyfry bez spacji. */
const T = (n) => (n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : String(n));

/** „trzy zera”, „jedno zero”, „pięć zer” */
function zer(n) {
  if (n === 1) return "jedno zero";
  return `${["", "", "dwa", "trzy", "cztery", "pięć", "sześć"][n]} ${n <= 4 ? "zera" : "zer"}`;
}

/** Liczba z przedziału [lo, hi] spełniająca warunek. */
function losuj(r, lo, hi, ok) {
  for (;;) {
    const x = r.int(lo, hi);
    if (ok(x)) return x;
  }
}

const cyfry = (n) => String(n).split("").map(Number);
const sumaCyfr = (n) => cyfry(n).reduce((a, b) => a + b, 0);
const NAZWY_MIEJSC = ["jedności", "dziesiątki", "setki", "tysiące", "dziesiątki tysięcy"];

/** Cyfry rzymskie: rozbicie liczby (1–3999) na części, np. 1949 -> [["M",1000],["CM",900],["XL",40],["IX",9]]. */
const RZYMSKIE = [["M", 1000], ["CM", 900], ["D", 500], ["CD", 400], ["C", 100], ["XC", 90], ["L", 50], ["XL", 40], ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]];
function rozbijRzymskie(n) {
  const cz = [];
  for (const [znak, w] of RZYMSKIE) {
    while (n >= w) {
      cz.push([znak, w]);
      n -= w;
    }
  }
  return cz;
}
const doRzymskich = (n) => rozbijRzymskie(n).map((c) => c[0]).join("");
const rz = (s) => `\\mathrm{${s}}`;

// --- Kolejność działań (szablony wyrażeń)

/** Wyrażenie: zapis w TeX, kroki rozwiązania i wynik. */
const W = (tex, kroki, wynik) => ({ tex, kroki, wynik });

const SZABLONY = [
  // bez nawiasów i potęg
  (r) => {
    const a = r.int(2, 60), b = r.int(2, 9), c = r.int(2, 9);
    return W(`${a} + ${b} \\cdot ${c}`, [`Najpierw mnożenie: $${b} \\cdot ${c} = ${b * c}$.`, `Potem dodawanie: $${a} + ${b * c} = ${a + b * c}$.`], a + b * c);
  },
  (r) => {
    const a = r.int(3, 9), b = r.int(3, 9), c = r.int(1, a * b - 1);
    return W(`${a} \\cdot ${b} - ${c}`, [`Najpierw mnożenie: $${a} \\cdot ${b} = ${a * b}$.`, `Potem odejmowanie: $${a * b} - ${c} = ${a * b - c}$.`], a * b - c);
  },
  (r) => {
    const b = r.int(2, 9), c = r.int(2, 9), a = b * c + r.int(1, 40);
    return W(`${a} - ${b} \\cdot ${c}`, [`Najpierw mnożenie: $${b} \\cdot ${c} = ${b * c}$.`, `Potem odejmowanie: $${a} - ${b * c} = ${a - b * c}$.`], a - b * c);
  },
  (r) => {
    const c = r.int(2, 9), k = r.int(2, 12), a = r.int(2, 60);
    return W(`${a} + ${c * k} : ${c}`, [`Najpierw dzielenie: $${c * k} : ${c} = ${k}$.`, `Potem dodawanie: $${a} + ${k} = ${a + k}$.`], a + k);
  },
  (r) => {
    const a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9), d = r.int(2, 9);
    return W(`${a} \\cdot ${b} + ${c} \\cdot ${d}`, [`Najpierw oba mnożenia: $${a} \\cdot ${b} = ${a * b}$ i $${c} \\cdot ${d} = ${c * d}$.`, `Potem dodawanie: $${a * b} + ${c * d} = ${a * b + c * d}$.`], a * b + c * d);
  },
  (r) => {
    const b = r.int(2, 40), a = b + r.int(1, 40), c = r.int(2, 40);
    return W(`${a} - ${b} + ${c}`, [`Są tylko dodawanie i odejmowanie, więc liczymy od lewej do prawej.`, `$${a} - ${b} = ${a - b}$, a potem $${a - b} + ${c} = ${a - b + c}$.`], a - b + c);
  },
  (r) => {
    const b = r.int(2, 9), k = r.int(2, 12), c = r.int(2, 9);
    return W(`${b * k} : ${b} \\cdot ${c}`, [`Są tylko dzielenie i mnożenie, więc liczymy od lewej do prawej.`, `$${b * k} : ${b} = ${k}$, a potem $${k} \\cdot ${c} = ${k * c}$.`], k * c);
  },
  // z nawiasami
  (r) => {
    const a = r.int(1, 20), b = r.int(1, 20), c = r.int(2, 9);
    return W(`(${a} + ${b}) \\cdot ${c}`, [`Najpierw nawias: $${a} + ${b} = ${a + b}$.`, `Potem mnożenie: $${a + b} \\cdot ${c} = ${(a + b) * c}$.`], (a + b) * c);
  },
  (r) => {
    const b = r.int(1, 20), a = b + r.int(1, 20), c = r.int(2, 9);
    return W(`(${a} - ${b}) \\cdot ${c}`, [`Najpierw nawias: $${a} - ${b} = ${a - b}$.`, `Potem mnożenie: $${a - b} \\cdot ${c} = ${(a - b) * c}$.`], (a - b) * c);
  },
  (r) => {
    const c = r.int(2, 9), k = r.int(2, 12), s = c * k, a = r.int(1, s - 1);
    return W(`(${a} + ${s - a}) : ${c}`, [`Najpierw nawias: $${a} + ${s - a} = ${s}$.`, `Potem dzielenie: $${s} : ${c} = ${k}$.`], k);
  },
  (r) => {
    const a = r.int(2, 9), c = r.int(1, 20), b = c + r.int(1, 20);
    return W(`${a} \\cdot (${b} - ${c})`, [`Najpierw nawias: $${b} - ${c} = ${b - c}$.`, `Potem mnożenie: $${a} \\cdot ${b - c} = ${a * (b - c)}$.`], a * (b - c));
  },
  (r) => {
    const a = r.int(2, 30), b = r.int(2, 9), c = r.int(2, 9), d = r.int(1, 20);
    return W(`${a} + ${b} \\cdot (${c + d} - ${d})`, [`Najpierw nawias: $${c + d} - ${d} = ${c}$.`, `Potem mnożenie: $${b} \\cdot ${c} = ${b * c}$.`, `Na końcu dodawanie: $${a} + ${b * c} = ${a + b * c}$.`], a + b * c);
  },
  // z potęgami
  (r) => {
    const a = r.int(2, 60), b = r.int(2, 9);
    return W(`${a} + ${b}^2`, [`Najpierw potęga: $${b}^2 = ${b} \\cdot ${b} = ${b * b}$.`, `Potem dodawanie: $${a} + ${b * b} = ${a + b * b}$.`], a + b * b);
  },
  (r) => {
    const a = r.int(5, 12);
    let b, c;
    do {
      b = r.int(2, 9);
      c = r.int(2, 9);
    } while (b * c >= a * a);
    return W(`${a}^2 - ${b} \\cdot ${c}`, [`Najpierw potęga: $${a}^2 = ${a * a}$.`, `Potem mnożenie: $${b} \\cdot ${c} = ${b * c}$.`, `Na końcu odejmowanie: $${a * a} - ${b * c} = ${a * a - b * c}$.`], a * a - b * c);
  },
  (r) => {
    const a = r.int(1, 6), b = r.int(1, 6), s = a + b;
    return W(`(${a} + ${b})^2`, [`Najpierw nawias: $${a} + ${b} = ${s}$.`, `Potem potęga: $${s}^2 = ${s} \\cdot ${s} = ${s * s}$.`], s * s);
  },
  (r) => {
    const a = r.int(2, 9), b = r.int(2, 6);
    return W(`${a} \\cdot ${b}^2`, [`Najpierw potęga: $${b}^2 = ${b * b}$.`, `Potem mnożenie: $${a} \\cdot ${b * b} = ${a * b * b}$.`], a * b * b);
  },
  (r) => {
    const b = r.pick([2, 4, 6, 8]), c = r.pick([2, 4].concat(b === 6 ? [3, 6] : [])), a = b * b + r.int(1, 30);
    return W(`${a} - ${b}^2 : ${c}`, [`Najpierw potęga: $${b}^2 = ${b * b}$.`, `Potem dzielenie: $${b * b} : ${c} = ${(b * b) / c}$.`, `Na końcu odejmowanie: $${a} - ${(b * b) / c} = ${a - (b * b) / c}$.`], a - (b * b) / c);
  },
  (r) => {
    const a = r.int(2, 4), b = r.int(2, 50);
    return W(`${a}^3 + ${b}`, [`Najpierw potęga: $${a}^3 = ${a} \\cdot ${a} \\cdot ${a} = ${a ** 3}$.`, `Potem dodawanie: $${a ** 3} + ${b} = ${a ** 3 + b}$.`], a ** 3 + b);
  },
];

export default {
  tematy: [
    // ------------------------------------------------------------------------------------------------
    {
      id: "dzialania-pamieciowe",
      nazwa: "Działania pamięciowe",
      sciaga: [
        {
          nazwa: "Dodawanie i odejmowanie w pamięci",
          slownie: "Rozbij drugą liczbę na dziesiątki i jedności albo dobij do pełnej dziesiątki lub setki. Dodawaj i odejmuj po kawałku.",
          tex: "47+38=47+30+8=77+8=85",
          przyklad: "$58 + 27$: dobijam do pełnej dziesiątki, $58 + 2 = 60$, a potem $60 + 25 = 85$. Odejmowanie: $83 - 29$ to $83 - 30 + 1 = 54$.",
          uwaga: "Gdy odejmujesz za dużo (np. $30$ zamiast $29$), pamiętaj, żeby oddać różnicę.",
        },
        {
          nazwa: "Mnożenie w pamięci",
          slownie: "Rozbij jedną liczbę na dziesiątki i jedności, pomnóż osobno i dodaj wyniki. Mnożenie przez $5$ to połowa mnożenia przez $10$.",
          tex: "14\\cdot 6=10\\cdot 6+4\\cdot 6\\qquad =60+24=84",
          przyklad: "$15 \\cdot 6 = 10 \\cdot 6 + 5 \\cdot 6 = 60 + 30 = 90$. Przez $5$: $48 \\cdot 5$, bo $48 \\cdot 10 = 480$, a połowa z $480$ to $240$.",
          uwaga: "Nie zapomnij o drugiej części: $14 \\cdot 6$ to nie $60 + 4$.",
        },
        {
          nazwa: "Liczby z zerami na końcu",
          slownie: "Pomnóż liczby bez zer, a potem dopisz tyle zer, ile było ich razem. Przy dzieleniu skreślaj po tyle samo zer z obu liczb.",
          przyklad: "$60 \\cdot 700$: $6 \\cdot 7 = 42$, zer jest razem trzy, więc wynik to $42\\,000$. Dzielenie: $8100 : 90$, skreślam po jednym zerze, $810 : 9 = 90$.",
          uwaga: "Policz zera uważnie: $40 \\cdot 50 = 2000$, a nie $200$.",
        },
        {
          nazwa: "Dzielenie w pamięci",
          slownie: "Rozbij dzielną na części, które łatwo podzielić przez dzielnik. Wyniki częściowe dodaj.",
          przyklad: "$156 : 3$: $150 : 3 = 50$ i $6 : 3 = 2$, razem $52$.",
        },
      ],
      jak: [
        "Przyjrzyj się liczbom. Czy jedna jest bliska pełnej dziesiątki lub setki (np. $99$, $198$)?",
        "Rozbij jedną liczbę na wygodne części: dziesiątki i jedności albo setki.",
        "Policz osobno każdą część w pamięci.",
        "Złóż wynik i sprawdź, czy ma sens (czy jest mniej więcej taki, jak się spodziewałeś).",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Ala ma $58$ naklejek. Dostała jeszcze $37$ naklejek. Ile naklejek ma teraz Ala? **Wybierz właściwą odpowiedź.**",
          opcje: ["$85$", "$95$", "$105$", "$94$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Który zapis pomaga obliczyć w pamięci $83 - 29$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$83 - 30 + 1$", "$83 - 30 - 1$", "$83 - 20 + 9$", "$83 - 30 + 9$"],
          poprawna: 0,
        },
        {
          nr: "3",
          tresc: "Ile to jest $14 \\cdot 6$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$74$", "$64$", "$94$", "$84$"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "Ile to jest $60 \\cdot 700$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4\\,200$", "$420$", "$42\\,000$", "$420\\,000$"],
          poprawna: 2,
        },
        {
          nr: "5",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$25 \\cdot 4 = 100$", litery: "PF", poprawna: 0 },
            { tekst: "$8100 : 90 = 900$", litery: "PF", poprawna: 1 },
            { tekst: "$45 + 38 = 83$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "W sklepie kupiono $6$ paczek zeszytów. W każdej paczce jest $15$ zeszytów. Ile zeszytów kupiono? Policz w pamięci, rozbijając $15$ na $10$ i $5$. **Zapisz obliczenia.**",
          rozwiazanie: "Rozbijamy $15 = 10 + 5$.\n\nPaczki po $10$ zeszytów: $6 \\cdot 10 = 60$.\n\nPaczki po $5$ zeszytów: $6 \\cdot 5 = 30$.\n\nRazem: $60 + 30 = 90$.\n\nOdpowiedź: Kupiono $90$ zeszytów.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Kasia miała $200$ zł. Kupiła $3$ książki po $45$ zł każda. Ile pieniędzy jej zostało? **Zapisz obliczenia.**",
          rozwiazanie: "Cena trzech książek: $3 \\cdot 45 = 3 \\cdot 40 + 3 \\cdot 5 = 120 + 15 = 135$ zł.\n\nZostało: $200 - 135 = 65$ zł.\n\nOdpowiedź: Kasi zostało $65$ zł.",
        },
      ],
      generatory: [
        {
          id: "pamiec-dodawanie",
          nazwa: "Dodaj i odejmij w pamięci",
          opis: "Dodawanie i odejmowanie w pamięci: dwucyfrowe, pełne dziesiątki, dopełnianie do $100$ lub $1000$.",
          generuj(r) {
            const typ = r.int(0, 3);
            let tresc, odp, wynik, rozw;
            if (typ === 0) {
              const a = r.int(15, 89), d = r.int(1, 8), j = r.int(2, 9), b = d * 10 + j;
              odp = a + b;
              tresc = r.pick([`Oblicz w pamięci: $${a} + ${b}$.`, `Dodaj w pamięci $${a}$ i $${b}$.`, `Ile to jest $${a} + ${b}$?`]);
              rozw = [`Rozbijamy drugi składnik: $${b} = ${d * 10} + ${j}$.`, `Najpierw dziesiątki: $${a} + ${d * 10} = ${a + d * 10}$.`, `Potem jedności: $${a + d * 10} + ${j} = ${odp}$.`];
            } else if (typ === 1) {
              const j = r.int(1, 8), d = r.int(1, 7), b = d * 10 + j;
              const a = b + r.int(11, 99 - b);
              odp = a - b;
              tresc = r.pick([`Oblicz w pamięci: $${a} - ${b}$.`, `Odejmij w pamięci $${b}$ od $${a}$.`, `Ile to jest $${a} - ${b}$?`]);
              const pelna = (d + 1) * 10;
              rozw = [`Liczba $${b}$ jest blisko pełnej dziesiątki $${pelna}$ (brakuje $${pelna - b}$).`, `Odejmujemy $${pelna}$: $${a} - ${pelna} = ${a - pelna}$.`, `Odjęliśmy o $${pelna - b}$ za dużo, więc oddajemy: $${a - pelna} + ${pelna - b} = ${odp}$.`];
            } else if (typ === 2) {
              const a = 10 * r.int(12, 90), b = 10 * r.int(12, 90);
              const dodaj = r.chance(0.5) || a === b;
              const [x, y] = dodaj || a > b ? [a, b] : [b, a];
              odp = dodaj ? x + y : x - y;
              tresc = dodaj ? `Oblicz w pamięci: $${x} + ${y}$.` : `Oblicz w pamięci: $${x} - ${y}$.`;
              rozw = [`Obie liczby kończą się zerem, więc liczymy dziesiątkami: $${x / 10} ${dodaj ? "+" : "-"} ${y / 10} = ${odp / 10}$.`, `Dopisujemy zero: $${odp}$.`];
            } else {
              const sto = r.chance(0.5);
              const cel = sto ? 100 : 1000;
              const n = sto ? r.int(11, 99) : 10 * r.int(11, 99);
              odp = cel - n;
              tresc = r.pick([`Ile brakuje do $${cel}$ liczbie $${n}$? Wpisz liczbę, którą trzeba dodać.`, `Jaką liczbę trzeba dodać do $${n}$, żeby otrzymać $${cel}$?`]);
              const doDziesiatki = (10 - (n % 10)) % 10;
              if (!sto) rozw = [`Obie liczby kończą się zerem, więc liczymy dziesiątkami: $${cel / 10} - ${n / 10} = ${odp / 10}$.`, `Dopisujemy zero: $${odp}$.`];
              else if (doDziesiatki === 0) rozw = [`Odejmujemy: $${cel} - ${n} = ${odp}$.`, `Sprawdzenie: $${n} + ${odp} = ${cel}$.`];
              else rozw = [`Dobijamy do pełnej dziesiątki: $${n} + ${doDziesiatki} = ${n + doDziesiatki}$.`, `Do $${cel}$ brakuje jeszcze $${cel - n - doDziesiatki}$.`, `Razem: $${doDziesiatki} + ${cel - n - doDziesiatki} = ${odp}$.`];
            }
            return { tresc, pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }], odpowiedz: { w: odp }, wynik: `$${odp}$`, rozwiazanie: rozw };
          },
        },
        {
          id: "pamiec-mnozenie",
          nazwa: "Mnóż i dziel w pamięci",
          opis: "Mnożenie dwucyfrowej liczby przez jednocyfrową, mnożenie i dzielenie liczb z zerami, mnożenie przez $5$.",
          generuj(r) {
            const typ = r.int(0, 3);
            let tresc, odp, rozw;
            if (typ === 0) {
              const d = r.int(1, 9), j = r.int(2, 9), b = r.int(3, 9), a = d * 10 + j;
              odp = a * b;
              tresc = r.pick([`Oblicz w pamięci: $${a} \\cdot ${b}$.`, `Pomnóż w pamięci $${a}$ przez $${b}$.`, `Ile to jest $${b} \\cdot ${a}$?`]);
              rozw = [`Rozbijamy: $${a} = ${d * 10} + ${j}$.`, `$${d * 10} \\cdot ${b} = ${d * 10 * b}$ oraz $${j} \\cdot ${b} = ${j * b}$.`, `Dodajemy: $${d * 10 * b} + ${j * b} = ${odp}$.`];
            } else if (typ === 1) {
              let p1, p2;
              do {
                p1 = r.int(0, 2);
                p2 = r.int(0, 2);
              } while (p1 + p2 < 1 || p1 + p2 > 3);
              const u = r.int(2, 9), v = r.int(2, 9);
              const a = u * 10 ** p1, b = v * 10 ** p2;
              odp = a * b;
              tresc = r.pick([`Oblicz w pamięci: $${a} \\cdot ${b}$.`, `Ile to jest $${a} \\cdot ${b}$?`]);
              rozw = [`Mnożymy liczby bez zer: $${u} \\cdot ${v} = ${u * v}$.`, `Zer jest razem $${p1 + p2}$, więc tyle zer dopisujemy do wyniku.`, `$${a} \\cdot ${b} = ${T(odp)}$.`];
            } else if (typ === 2) {
              const u = r.int(2, 9), q = r.int(2, 12), s = r.int(1, 2), t = s + r.int(0, 1);
              const b = u * 10 ** s, a = u * q * 10 ** t;
              odp = q * 10 ** (t - s);
              tresc = r.pick([`Oblicz w pamięci: $${a} : ${b}$.`, `Ile to jest $${a} : ${b}$?`]);
              rozw = [`Skreślamy z obu liczb ${s === 1 ? "po jednym zerze" : "po dwa zera"}: $${a / 10 ** s} : ${u}$.`, `$${a / 10 ** s} : ${u} = ${odp}$.`];
            } else {
              const n = r.int(12, 99);
              odp = n * 5;
              tresc = r.pick([`Oblicz w pamięci: $${n} \\cdot 5$.`, `Ile to jest $5 \\cdot ${n}$? Podpowiedź: pomnóż przez $10$ i weź połowę.`]);
              rozw = [`Mnożenie przez $5$ to połowa mnożenia przez $10$.`, `$${n} \\cdot 10 = ${n * 10}$.`, `Połowa z $${n * 10}$ to $${odp}$.`];
            }
            return { tresc, pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }], odpowiedz: { w: odp }, wynik: `$${T(odp)}$`, rozwiazanie: rozw };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "potegi-kolejnosc",
      nazwa: "Potęgowanie i kolejność działań",
      sciaga: [
        {
          nazwa: "Potęga",
          slownie: "Potęga to skrót zapisu mnożenia tej samej liczby. Podstawa mówi, jaką liczbę mnożymy, a wykładnik – ile razy ją piszemy.",
          tex: "3^4=3\\cdot3\\cdot3\\cdot3=81",
          litery: "$3$ – podstawa, $4$ – wykładnik (czytamy: trzy do czwartej).",
          przyklad: "$2^5 = 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 = 32$.",
          uwaga: "$2^3$ to nie $2 \\cdot 3$. Mamy $2^3 = 8$, a $2 \\cdot 3 = 6$.",
        },
        {
          nazwa: "Kwadraty i sześciany",
          slownie: "Druga potęga to kwadrat liczby, a trzecia potęga to sześcian liczby. Warto znać je na pamięć.",
          tex: "a^2=a\\cdot a\\qquad a^3=a\\cdot a\\cdot a",
          przyklad: "Kwadraty: $1$, $4$, $9$, $16$, $25$, $36$, $49$, $64$, $81$, $100$. Sześciany: $1$, $8$, $27$, $64$, $125$, $1000$. Na przykład $6^2 = 36$, a $4^3 = 4 \\cdot 4 \\cdot 4 = 64$.",
        },
        {
          nazwa: "Potęgi liczby 10, 1 i 0",
          slownie: "Potęga liczby $10$ to jedynka z tyloma zerami, ile wynosi wykładnik. Liczba $1$ do każdej potęgi daje $1$, a $0$ do dodatniej potęgi daje $0$.",
          tex: "10^3=1000\\qquad 1^{50}=1\\qquad 0^4=0",
          przyklad: "$10^5 = 100\\,000$, a $3 \\cdot 10^4 = 3 \\cdot 10\\,000 = 30\\,000$.",
        },
        {
          nazwa: "Kolejność działań",
          slownie: "Najpierw liczymy to, co jest w nawiasach, potem potęgi, potem mnożenie i dzielenie, a na końcu dodawanie i odejmowanie. Działania tego samego rodzaju liczymy od lewej do prawej.",
          tex: "\\text{nawiasy}\\qquad\\text{potęgi}\\qquad\\cdot\\ \\text{i}\\ :\\qquad+\\ \\text{i}\\ -",
          przyklad: "$30 - 2^3 \\cdot 3 = 30 - 8 \\cdot 3 = 30 - 24 = 6$.",
          uwaga: "$2 + 3 \\cdot 4 = 14$, a nie $20$. Mnożenie jest ważniejsze od dodawania.",
        },
      ],
      jak: [
        "Zaznacz w wyrażeniu nawiasy, potęgi, mnożenia i dzielenia.",
        "Policz najpierw nawiasy, potem potęgi.",
        "Policz mnożenia i dzielenia, idąc od lewej do prawej.",
        "Na końcu policz dodawania i odejmowania, też od lewej do prawej. Przepisuj za każdym razem resztę wyrażenia.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Który zapis jest równy $4 \\cdot 4 \\cdot 4 \\cdot 4$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4^3$", "$3^4$", "$4^4$", "$16^4$"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Ile to jest $2^5$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10$", "$25$", "$16$", "$32$"],
          poprawna: 3,
        },
        {
          nr: "10",
          tresc: "Ile to jest $10^4$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$40$", "$10\\,000$", "$1000$", "$100\\,000$"],
          poprawna: 1,
        },
        {
          nr: "11",
          tresc: "Ile to jest $24 - 4 \\cdot 3 + 2$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$", "$62$", "$10$", "$26$"],
          poprawna: 0,
        },
        {
          nr: "12",
          tresc: "Ile to jest $(7 + 3)^2$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$20$", "$58$", "$100$", "$52$"],
          poprawna: 2,
        },
        {
          nr: "13",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$2^4 = 8$", litery: "PF", poprawna: 1 },
            { tekst: "$5^2 = 25$", litery: "PF", poprawna: 0 },
            { tekst: "$0^5 = 0$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "14",
          punkty: 2,
          tresc: "Oblicz $100 - 3 \\cdot 4^2 + 5$. **Zapisz obliczenia.**",
          rozwiazanie: "Najpierw potęga: $4^2 = 16$.\n\nPotem mnożenie: $3 \\cdot 16 = 48$.\n\nOdejmowanie i dodawanie liczymy od lewej: $100 - 48 = 52$, a potem $52 + 5 = 57$.\n\nOdpowiedź: Wynik to $57$.",
        },
        {
          nr: "15",
          punkty: 2,
          tresc: "Marta ma $3$ pudełka. W każdym pudełku są $3$ woreczki, a w każdym woreczku $3$ kulki. Zapisz liczbę kulek w postaci potęgi i ją oblicz. Potem Marta dołożyła jeszcze $13$ kulek. Ile kulek ma teraz? **Zapisz obliczenia.**",
          rozwiazanie: "Liczba kulek: $3 \\cdot 3 \\cdot 3 = 3^3$.\n\n$3^3 = 9 \\cdot 3 = 27$.\n\nPo dołożeniu: $27 + 13 = 40$.\n\nOdpowiedź: Marta ma teraz $40$ kulek.",
        },
      ],
      generatory: [
        {
          id: "potega-wartosc",
          nazwa: "Oblicz potęgę",
          opis: "Oblicz wartość potęgi (podstawa $2$–$9$, potęgi liczby $10$ i liczby takie jak $3 \\cdot 10^4$).",
          generuj(r) {
            const typ = r.int(0, 3);
            if (typ === 3) {
              const a = r.int(2, 9), e = r.int(2, 4), w = a * 10 ** e;
              return {
                tresc: r.pick([`Oblicz $${a} \\cdot 10^${e}$.`, `Ile to jest $${a} \\cdot 10^${e}$?`]),
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w },
                wynik: `$${T(w)}$`,
                rozwiazanie: [`$10^${e}$ to jedynka i ${zer(e)}: $10^${e} = ${T(10 ** e)}$.`, `$${a} \\cdot ${T(10 ** e)} = ${T(w)}$.`],
              };
            }
            let b, e;
            if (typ === 0) {
              b = 10;
              e = r.int(2, 5);
            } else {
              b = r.int(2, 9);
              e = r.int(2, 5);
              while (b ** e > 100000 || (e === 5 && b > 6)) e = r.int(2, 4);
            }
            const w = b ** e;
            const tresc = r.pick([
              `Oblicz $${b}^${e}$.`,
              `Ile to jest $${b}^${e}$?`,
              `Zapisz $${Array(e).fill(b).join(" \\cdot ")}$ w postaci potęgi i oblicz jej wartość.`,
              `Podstawa potęgi to $${b}$, a wykładnik to $${e}$. Oblicz tę potęgę.`,
            ]);
            let rozw;
            if (b === 10) {
              rozw = [`Potęga liczby $10$ to jedynka z tyloma zerami, ile wynosi wykładnik.`, `Wykładnik to $${e}$, więc dopisujemy ${zer(e)}: $10^${e} = ${T(w)}$.`];
            } else {
              rozw = [`Potęga $${b}^${e}$ to liczba $${b}$ pomnożona przez siebie $${e}$ razy (czyli $${e}$ czynników równych $${b}$).`];
              let akt = b;
              for (let k = 2; k <= e; k++) {
                rozw.push(`$${b}^${k} = ${akt} \\cdot ${b} = ${akt * b}$.`);
                akt *= b;
              }
            }
            return { tresc, pola: [{ id: "w", typ: "liczba", etykieta: "Wartość" }], odpowiedz: { w }, wynik: `$${T(w)}$`, rozwiazanie: rozw };
          },
        },
        {
          id: "kolejnosc-dzialan",
          nazwa: "Kolejność działań",
          opis: "Oblicz wartość wyrażenia z nawiasami i potęgami, pamiętając o kolejności działań.",
          generuj(r) {
            const w = r.pick(SZABLONY)(r);
            return {
              tresc: r.pick([`Oblicz $${w.tex}$.`, `Ile to jest $${w.tex}$?`, `Oblicz wartość wyrażenia $${w.tex}$.`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w: w.wynik },
              wynik: `$${w.wynik}$`,
              rozwiazanie: [...w.kroki, `Wynik: $${w.wynik}$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "rzymskie-przyblizone",
      nazwa: "Cyfry rzymskie i obliczenia przybliżone",
      sciaga: [
        {
          nazwa: "Cyfry rzymskie",
          slownie: "Liczby rzymskie zapisujemy siedmioma literami. Każda litera ma swoją wartość.",
          tex: "\\mathrm{I}=1\\qquad\\mathrm{V}=5\\qquad\\mathrm{X}=10\\qquad\\mathrm{L}=50\\qquad\\mathrm{C}=100\\qquad\\mathrm{D}=500\\qquad\\mathrm{M}=1000",
          przyklad: "$\\mathrm{XXVII} = 10 + 10 + 5 + 1 + 1 = 27$.",
        },
        {
          nazwa: "Jak czytać liczby rzymskie",
          slownie: "Czytamy od największej litery do najmniejszej i dodajemy. Gdy mniejsza litera stoi przed większą, odejmujemy ją (tak jest w $\\mathrm{IV}$, $\\mathrm{IX}$, $\\mathrm{XL}$, $\\mathrm{XC}$, $\\mathrm{CD}$, $\\mathrm{CM}$). Litery $\\mathrm{I}$, $\\mathrm{X}$, $\\mathrm{C}$, $\\mathrm{M}$ piszemy najwyżej trzy razy pod rząd.",
          przyklad: "$\\mathrm{XIV} = 10 + (5 - 1) = 14$. Liczba $\\mathrm{MCMXC}$ to $1000 + 900 + 90 = 1990$.",
          uwaga: "Cztery to $\\mathrm{IV}$, a nie $\\mathrm{IIII}$. Liczba $49$ to $\\mathrm{XLIX}$, a nie $\\mathrm{IL}$.",
        },
        {
          nazwa: "Zaokrąglanie liczb",
          slownie: "Patrzymy na cyfrę zaraz za miejscem, do którego zaokrąglamy. Jeśli to $0$, $1$, $2$, $3$ albo $4$, cyfrę zostawiamy. Jeśli $5$, $6$, $7$, $8$ albo $9$, zwiększamy ją o $1$. Dalsze cyfry zamieniamy na zera.",
          przyklad: "$3\\,462$ do setek to $3\\,500$ (cyfra dziesiątek to $6$). $3\\,462$ do dziesiątek to $3\\,460$ (cyfra jedności to $2$).",
          uwaga: "$1\\,950$ do setek to $2\\,000$, bo po zwiększeniu $19$ setek o $1$ mamy $20$ setek.",
        },
        {
          nazwa: "Szacowanie wyniku",
          slownie: "Zaokrąglij liczby do wygodnych (dziesiątek lub setek) i policz w pamięci. Otrzymasz wynik przybliżony, który pomaga sprawdzić, czy dokładny wynik ma sens.",
          tex: "398+604\\approx 400+600=1000",
          przyklad: "$49 \\cdot 21 \\approx 50 \\cdot 20 = 1000$. Dokładny wynik to $1029$, więc oszacowanie jest dobre.",
          uwaga: "Znak $\\approx$ czytamy „jest w przybliżeniu równe”. Wynik przybliżony nie jest dokładny.",
        },
      ],
      jak: [
        "Cyfry rzymskie: rozbij liczbę na tysiące, setki, dziesiątki i jedności i każdą część zapisz osobno.",
        "Odczytywanie: znajdź w zapisie pary $\\mathrm{IV}$, $\\mathrm{IX}$, $\\mathrm{XL}$, $\\mathrm{XC}$, $\\mathrm{CD}$, $\\mathrm{CM}$ i policz je jako jedną liczbę.",
        "Szacowanie: zaokrąglij każdą liczbę do podanego rzędu (dziesiątek, setek).",
        "Policz z zaokrąglonymi liczbami w pamięci i napisz wynik ze znakiem „około”.",
      ],
      zadania: [
        {
          nr: "16",
          tresc: "Którą liczbę zapisano jako $\\mathrm{XLIV}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$66$", "$46$", "$44$", "$36$"],
          poprawna: 2,
        },
        {
          nr: "17",
          tresc: "Który zapis jest poprawnym zapisem liczby $29$ cyframi rzymskimi? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\mathrm{XXIX}$", "$\\mathrm{XIX}$", "$\\mathrm{XXXI}$", "$\\mathrm{XXIIX}$"],
          poprawna: 0,
        },
        {
          nr: "18",
          tresc: "Rok $\\mathrm{MMXXIV}$ to rok: **Wybierz właściwą odpowiedź.**",
          opcje: ["$2014$", "$2026$", "$2034$", "$2024$"],
          poprawna: 3,
        },
        {
          nr: "19",
          tresc: "Liczbę $7\\,382$ zaokrąglono do setek. Otrzymano: **Wybierz właściwą odpowiedź.**",
          opcje: ["$7\\,300$", "$7\\,400$", "$7\\,380$", "$7\\,000$"],
          poprawna: 1,
        },
        {
          nr: "20",
          tresc: "Jeden bilet kosztuje $48$ zł. Chcemy kupić $19$ takich biletów. Ile mniej więcej pieniędzy potrzeba? Zaokrąglij ceny i liczby do wygodnych liczb. **Wybierz właściwą odpowiedź.**",
          opcje: ["około $100$ zł", "około $500$ zł", "około $1000$ zł", "około $2000$ zł"],
          poprawna: 2,
        },
        {
          nr: "21",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\mathrm{CDXL}$ oznacza liczbę $440$.", litery: "PF", poprawna: 0 },
            { tekst: "$\\mathrm{IC}$ jest poprawnym zapisem liczby $99$.", litery: "PF", poprawna: 1 },
            { tekst: "Liczba $4\\,449$ zaokrąglona do setek to $4\\,500$.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "22",
          punkty: 2,
          tresc: "Zapisz cyframi rzymskimi liczby $38$ i $1949$. **Zapisz, jak do nich doszedłeś.**",
          rozwiazanie: "$38 = 10 + 10 + 10 + 5 + 1 + 1 + 1$, czyli $\\mathrm{XXXVIII}$.\n\n$1949 = 1000 + 900 + 40 + 9$.\n\nZapisujemy kolejno: $1000 = \\mathrm{M}$, $900 = \\mathrm{CM}$, $40 = \\mathrm{XL}$, $9 = \\mathrm{IX}$, czyli $\\mathrm{MCMXLIX}$.\n\nOdpowiedź: $38 = \\mathrm{XXXVIII}$, $1949 = \\mathrm{MCMXLIX}$.",
        },
        {
          nr: "23",
          punkty: 2,
          tresc: "Piekarnia sprzedała w poniedziałek $398$ chlebów, a we wtorek $612$ chlebów. Oszacuj, ile chlebów sprzedano w te dwa dni, zaokrąglając liczby do setek. Potem policz dokładnie i podaj, o ile różni się oszacowanie od dokładnego wyniku. **Zapisz obliczenia.**",
          rozwiazanie: "Zaokrąglamy do setek: $398 \\approx 400$ i $612 \\approx 600$.\n\nOszacowanie: $400 + 600 = 1000$.\n\nDokładnie: $398 + 612 = 1010$.\n\nRóżnica: $1010 - 1000 = 10$.\n\nOdpowiedź: Oszacowanie to około $1000$ chlebów, dokładnie sprzedano $1010$, więc różnica wynosi $10$.",
        },
      ],
      generatory: [
        {
          id: "rzymskie",
          nazwa: "Cyfry rzymskie",
          opis: "Odczytaj liczbę zapisaną cyframi rzymskimi albo wybierz poprawny zapis rzymski podanej liczby.",
          generuj(r) {
            const n = r.chance(0.4) ? r.int(4, 99) : r.int(100, 2999);
            const cz = rozbijRzymskie(n);
            const zapis = doRzymskich(n);
            const czesci = cz.map((c) => `$${rz(c[0])}$`).join(", ");
            const wartosci = cz.map((c) => c[1]).join(" + ");
            if (r.chance(0.5)) {
              return {
                tresc: r.pick([`Jaką liczbę zapisano jako $${rz(zapis)}$?`, `Zamień na zwykłą liczbę: $${rz(zapis)}$.`, `Odczytaj liczbę rzymską $${rz(zapis)}$.`]),
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba" }],
                odpowiedz: { w: n },
                wynik: `$${n}$`,
                rozwiazanie: [`Dzielimy zapis na części: ${czesci}.`, `Ich wartości to $${wartosci}$.`, `Dodajemy: $${n}$.`],
              };
            }
            const kand = [n - 1, n + 1, n + 10, n - 10, n + 5, n - 5, n + 100, n - 100].filter((x) => x >= 1 && x <= 3999 && doRzymskich(x) !== zapis);
            const zle = r.shuffle([...new Set(kand.map(doRzymskich))]).slice(0, 3);
            const opcje = r.shuffle([zapis, ...zle]);
            return {
              tresc: r.pick([`Wybierz poprawny zapis liczby $${n}$ cyframi rzymskimi.`, `Jak zapisać liczbę $${n}$ cyframi rzymskimi?`]),
              pola: [{ id: "w", typ: "wybor", etykieta: `Liczba $${n}$ cyframi rzymskimi`, opcje: opcje.map((o) => `$${rz(o)}$`) }],
              odpowiedz: { w: opcje.indexOf(zapis) },
              wynik: `$${rz(zapis)}$`,
              rozwiazanie: [`Rozbijamy liczbę: $${n} = ${wartosci}$.`, `Każdą część zapisujemy rzymsko: ${czesci}.`, `Łączymy: $${rz(zapis)}$.`],
            };
          },
        },
        {
          id: "zaokraglanie",
          nazwa: "Zaokrąglanie i szacowanie",
          opis: "Zaokrąglij liczbę do dziesiątek, setek lub tysięcy albo oszacuj sumę po zaokrągleniu składników.",
          generuj(r) {
            const rzedy = [[10, "dziesiątek", "jedności"], [100, "setek", "dziesiątek"], [1000, "tysięcy", "setek"]];
            if (r.chance(0.7)) {
              const [p, nazwa, patrz] = r.pick(rzedy);
              const n = r.int(3 * p + 1, 99499);
              const d = Math.floor(n / (p / 10)) % 10;
              const w = Math.floor((n + p / 2) / p) * p;
              return {
                tresc: r.pick([`Zaokrąglij liczbę $${T(n)}$ do ${nazwa}.`, `Ile to jest $${T(n)}$ po zaokrągleniu do ${nazwa}?`, `Zaokrąglij $${T(n)}$ do ${nazwa} i wpisz wynik.`]),
                pola: [{ id: "w", typ: "liczba", etykieta: `Po zaokrągleniu do ${nazwa}` }],
                odpowiedz: { w },
                wynik: `$${T(w)}$`,
                rozwiazanie: [`Zaokrąglamy do ${nazwa}, więc patrzymy na cyfrę ${patrz}: to $${d}$.`, d >= 5 ? `Cyfra $${d}$ to co najmniej $5$, więc zwiększamy poprzednią cyfrę o $1$.` : `Cyfra $${d}$ jest mniejsza od $5$, więc poprzednią cyfrę zostawiamy.`, `Dalsze cyfry zamieniamy na zera: $${T(w)}$.`],
              };
            }
            const a = r.int(110, 899), b = r.int(110, 899);
            const ra = Math.round(a / 100) * 100, rb = Math.round(b / 100) * 100;
            return {
              tresc: r.pick([`Oszacuj sumę $${a} + ${b}$, zaokrąglając obie liczby do setek.`, `Zaokrąglij składniki do setek i oszacuj wynik dodawania $${a} + ${b}$.`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Oszacowanie sumy" }],
              odpowiedz: { w: ra + rb },
              wynik: `$${ra + rb}$`,
              rozwiazanie: [`$${a}$ zaokrąglamy do setek: $${ra}$.`, `$${b}$ zaokrąglamy do setek: $${rb}$.`, `Dodajemy: $${ra} + ${rb} = ${ra + rb}$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "dzialania-pisemne",
      nazwa: "Dodawanie, odejmowanie i mnożenie pisemne",
      sciaga: [
        {
          nazwa: "Dodawanie pisemne",
          slownie: "Liczby piszemy jedna pod drugą: jedności pod jednościami, dziesiątki pod dziesiątkami itd. Dodajemy kolumnami od prawej. Gdy w kolumnie wyjdzie więcej niż $9$, piszemy ostatnią cyfrę, a $1$ dodajemy w następnej kolumnie.",
          przyklad: "$478 + 365$: jedności $8 + 5 = 13$, piszę $3$ i pamiętam $1$. Dziesiątki $7 + 6 + 1 = 14$, piszę $4$ i pamiętam $1$. Setki $4 + 3 + 1 = 8$. Wynik: $843$.",
          uwaga: "Nie zapomnij dodać zapamiętanej jedynki w następnej kolumnie.",
        },
        {
          nazwa: "Odejmowanie pisemne",
          slownie: "Odejmujemy kolumnami od prawej. Gdy na górze jest mniejsza cyfra niż na dole, pożyczamy $1$ z sąsiedniej kolumny po lewej: tam jest o $1$ mniej, a tu mamy dodatkowe $10$.",
          przyklad: "$523 - 278$: jedności $13 - 8 = 5$ (pożyczka). Dziesiątki zostało $1$, więc znów pożyczamy: $11 - 7 = 4$. Setki zostały $4$, więc $4 - 2 = 2$. Wynik: $245$.",
          uwaga: "Sprawdzenie: dodaj wynik do odjemnika. $245 + 278 = 523$, więc wynik jest dobry.",
        },
        {
          nazwa: "Mnożenie pisemne",
          slownie: "Mnożymy górną liczbę przez każdą cyfrę dolnej liczby, zaczynając od jedności. Wynik dla każdej następnej cyfry przesuwamy o jedno miejsce w lewo (dopisujemy zero). Na końcu dodajemy wyniki.",
          przyklad: "$246 \\cdot 13$: $246 \\cdot 3 = 738$, $246 \\cdot 10 = 2460$, a razem $738 + 2460 = 3198$.",
          uwaga: "Nie zapomnij przesunąć drugiego wyniku w lewo. Bez tego wyszłoby $738 + 246$.",
        },
      ],
      jak: [
        "Napisz liczby jedna pod drugą tak, aby kolumny się zgadzały (jedności pod jednościami).",
        "Licz kolumnami od prawej do lewej. Zapisuj przeniesienia albo pożyczki.",
        "Przy mnożeniu przez wielocyfrową liczbę: policz iloczyn przez każdą cyfrę osobno i przesuwaj w lewo.",
        "Sprawdź wynik: odejmowanie dodawaniem, dodawanie odejmowaniem, a mnożenie szacowaniem.",
      ],
      zadania: [
        {
          nr: "24",
          tresc: "Ile to jest $4578 + 2964$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7\\,442$", "$6\\,542$", "$7\\,542$", "$7\\,552$"],
          poprawna: 2,
        },
        {
          nr: "25",
          tresc: "Ile to jest $6004 - 2857$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3\\,147$", "$3\\,257$", "$4\\,153$", "$3\\,153$"],
          poprawna: 0,
        },
        {
          nr: "26",
          tresc: "Ile to jest $236 \\cdot 40$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$944$", "$9\\,440$", "$94\\,400$", "$9\\,040$"],
          poprawna: 1,
        },
        {
          nr: "27",
          tresc: "W sali kinowej jest $18$ rzędów i w każdym rzędzie po $24$ miejsca. Ile jest wszystkich miejsc w sali? **Wybierz właściwą odpowiedź.**",
          opcje: ["$42$", "$332$", "$452$", "$432$"],
          poprawna: 3,
        },
        {
          nr: "28",
          tresc: "Wiadomo, że $5231 - 1478 = 3753$. Jak można to sprawdzić? **Wybierz właściwą odpowiedź.**",
          opcje: ["Odjąć $1478$ od $3753$.", "Dodać $3753$ i $1478$ i zobaczyć, czy wyjdzie $5231$.", "Dodać $5231$ i $1478$.", "Pomnożyć $3753$ przez $1478$."],
          poprawna: 1,
        },
        {
          nr: "29",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$99 + 101 = 200$", litery: "PF", poprawna: 0 },
            { tekst: "$3000 - 1 = 2999$", litery: "PF", poprawna: 0 },
            { tekst: "$12 \\cdot 15 = 160$", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "30",
          punkty: 2,
          tresc: "W magazynie było $5000$ zeszytów. W poniedziałek wydano $1748$ zeszytów, a we wtorek $1265$ zeszytów. Ile zeszytów zostało w magazynie? **Zapisz obliczenia.**",
          rozwiazanie: "Wydano w dwa dni: $1748 + 1265 = 3013$ zeszytów.\n\nZostało: $5000 - 3013 = 1987$ zeszytów.\n\nSprawdzenie: $1987 + 3013 = 5000$.\n\nOdpowiedź: W magazynie zostało $1987$ zeszytów.",
        },
        {
          nr: "31",
          punkty: 3,
          tresc: "Bilet do kina kosztuje $27$ zł. Do kina idzie klasa 5a, w której jest $23$ uczniów, i klasa 5b, w której jest $26$ uczniów. Ile złotych zapłacą za bilety obie klasy razem? **Zapisz obliczenia.**",
          rozwiazanie: "Liczba uczniów obu klas: $23 + 26 = 49$.\n\nKoszt biletów: $49 \\cdot 27$.\n\n$49 \\cdot 7 = 343$ oraz $49 \\cdot 20 = 980$.\n\n$343 + 980 = 1323$.\n\nOdpowiedź: Za bilety obie klasy zapłacą $1323$ zł.",
        },
      ],
      generatory: [
        {
          id: "dodawanie-odejmowanie-pisemne",
          nazwa: "Dodaj i odejmij pisemnie",
          opis: "Dodawanie lub odejmowanie pisemne liczb trzy- i czterocyfrowych, z opisem kolumn.",
          generuj(r) {
            if (r.chance(0.5)) {
              const dl = r.int(3, 4);
              const a = r.int(10 ** (dl - 1), 10 ** dl - 1), b = r.int(10 ** (dl - 1), 10 ** dl - 1);
              const A = cyfry(a).reverse(), B = cyfry(b).reverse();
              const kroki = [];
              let c = 0;
              for (let i = 0; i < Math.max(A.length, B.length); i++) {
                const x = A[i] ?? 0, y = B[i] ?? 0, s = x + y + c;
                kroki.push(`${NAZWY_MIEJSC[i][0].toUpperCase() + NAZWY_MIEJSC[i].slice(1)}: $${x} + ${y}${c ? ` + ${c}` : ""} = ${s}$ – piszę $${s % 10}$${s >= 10 ? ", pamiętam $1$" : ""}.`);
                c = s >= 10 ? 1 : 0;
              }
              if (c) kroki[kroki.length - 1] += ` Zapamiętane $1$ piszę na początku wyniku.`;
              kroki.push(`Wynik: $${T(a)} + ${T(b)} = ${T(a + b)}$.`);
              return {
                tresc: r.pick([`Dodaj pisemnie $${T(a)} + ${T(b)}$.`, `Oblicz pisemnie $${T(a)} + ${T(b)}$.`]),
                pola: [{ id: "w", typ: "liczba", etykieta: "Suma" }],
                odpowiedz: { w: a + b },
                wynik: `$${T(a + b)}$`,
                rozwiazanie: kroki,
              };
            }
            const dl = r.int(3, 4);
            const cyfraBez0 = () => r.int(1, 9);
            const dc = Array.from({ length: dl }, cyfraBez0);
            const a = Number(dc.join(""));
            const b = r.int(10 ** (dl - 2), a - 1);
            const A = cyfry(a).reverse(), B = cyfry(b).reverse();
            const kroki = [];
            let poz = 0;
            for (let i = 0; i < A.length; i++) {
              const x = A[i] - poz, y = B[i] ?? 0;
              const nazwa = NAZWY_MIEJSC[i][0].toUpperCase() + NAZWY_MIEJSC[i].slice(1);
              const po = poz ? `po pożyczce mamy $${x}$; ` : "";
              if (x < y) {
                kroki.push(`${nazwa}: ${po}$${x} < ${y}$, więc pożyczam: $${x + 10} - ${y} = ${x + 10 - y}$.`);
                poz = 1;
              } else {
                kroki.push(`${nazwa}: ${po}$${x} - ${y} = ${x - y}$.`);
                poz = 0;
              }
            }
            kroki.push(`Wynik: $${T(a)} - ${T(b)} = ${T(a - b)}$. Sprawdzenie: $${T(a - b)} + ${T(b)} = ${T(a)}$.`);
            return {
              tresc: r.pick([`Odejmij pisemnie $${T(a)} - ${T(b)}$.`, `Oblicz pisemnie $${T(a)} - ${T(b)}$.`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Różnica" }],
              odpowiedz: { w: a - b },
              wynik: `$${T(a - b)}$`,
              rozwiazanie: kroki,
            };
          },
        },
        {
          id: "mnozenie-pisemne",
          nazwa: "Pomnóż pisemnie",
          opis: "Mnożenie pisemne przez liczbę jednocyfrową albo dwucyfrową, z opisem kroków.",
          generuj(r) {
            if (r.chance(0.4)) {
              const a = r.int(100, 9999), b = r.int(2, 9);
              const A = cyfry(a).reverse();
              const kroki = [];
              let c = 0;
              for (let i = 0; i < A.length; i++) {
                const p = A[i] * b + c;
                const nazwa = NAZWY_MIEJSC[i][0].toUpperCase() + NAZWY_MIEJSC[i].slice(1);
                kroki.push(`${nazwa}: $${A[i]} \\cdot ${b}${c ? ` + ${c}` : ""} = ${p}$ – piszę $${p % 10}$${p >= 10 ? `, pamiętam $${Math.floor(p / 10)}$` : ""}.`);
                c = Math.floor(p / 10);
              }
              if (c) kroki[kroki.length - 1] += ` Zapamiętane $${c}$ piszę na początku wyniku.`;
              kroki.push(`Wynik: $${T(a)} \\cdot ${b} = ${T(a * b)}$.`);
              return {
                tresc: r.pick([`Pomnóż pisemnie $${T(a)} \\cdot ${b}$.`, `Oblicz pisemnie $${b} \\cdot ${T(a)}$.`]),
                pola: [{ id: "w", typ: "liczba", etykieta: "Iloczyn" }],
                odpowiedz: { w: a * b },
                wynik: `$${T(a * b)}$`,
                rozwiazanie: kroki,
              };
            }
            const a = r.int(100, 999), b = r.int(11, 99);
            const j = b % 10, d = Math.floor(b / 10);
            const kroki = [
              `Mnożymy przez cyfrę jedności: $${a} \\cdot ${j} = ${a * j}$.`,
              `Mnożymy przez cyfrę dziesiątek: $${a} \\cdot ${d} = ${a * d}$, a po przesunięciu o jedno miejsce w lewo to $${a * d * 10}$.`,
              `Dodajemy: $${a * j} + ${a * d * 10} = ${a * b}$.`,
            ];
            if (j === 0) {
              kroki.splice(0, 3, `Liczba $${b}$ kończy się zerem, więc mnożymy przez $${d}$: $${a} \\cdot ${d} = ${a * d}$.`, `Dopisujemy zero na końcu: $${a * b}$.`);
            }
            return {
              tresc: r.pick([`Pomnóż pisemnie $${a} \\cdot ${b}$.`, `Oblicz pisemnie $${a} \\cdot ${b}$.`, `Oblicz pisemnie iloczyn liczb $${a}$ i $${b}$.`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Iloczyn" }],
              odpowiedz: { w: a * b },
              wynik: `$${T(a * b)}$`,
              rozwiazanie: kroki,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "podzielnosc-pierwsze",
      nazwa: "Dzielenie i podzielność, liczby pierwsze i złożone",
      sciaga: [
        {
          nazwa: "Dzielnik i wielokrotność",
          slownie: "Liczba jest podzielna przez inną, gdy dzielenie wychodzi bez reszty. Wtedy ta druga liczba jest dzielnikiem pierwszej, a pierwsza jest wielokrotnością drugiej.",
          przyklad: "$24 : 6 = 4$ bez reszty, więc $6$ jest dzielnikiem liczby $24$, a $24$ jest wielokrotnością liczby $6$. Dzielniki liczby $12$: $1$, $2$, $3$, $4$, $6$, $12$. Wielokrotności liczby $5$: $5$, $10$, $15$, $20$, …",
          uwaga: "Dzielnik nie jest większy od liczby, a wielokrotność nie jest mniejsza od niej.",
        },
        {
          nazwa: "Dzielenie z resztą",
          slownie: "Gdy dzielenie nie wychodzi bez reszty, zapisujemy iloraz i resztę. Reszta jest zawsze mniejsza od dzielnika.",
          tex: "47:6=7\\text{ reszty }5\\qquad 7\\cdot 6+5=47",
          przyklad: "$50$ cukierków dzielimy po równo na $6$ osób: $50 : 6 = 8$ reszty $2$, bo $8 \\cdot 6 = 48$ i brakuje $2$ do $50$.",
          uwaga: "Reszta nie może być równa dzielnikowi ani od niego większa. Przy dzieleniu przez $6$ reszta jest jedną z liczb $0$, $1$, $2$, $3$, $4$, $5$.",
        },
        {
          nazwa: "Podzielność przez 2, 5, 10, 100",
          slownie: "Przez $2$ dzieli się liczba kończąca się cyfrą $0$, $2$, $4$, $6$ lub $8$. Przez $5$ – kończąca się $0$ lub $5$. Przez $10$ – kończąca się $0$. Przez $100$ – kończąca się dwoma zerami.",
          przyklad: "$4\\,730$ dzieli się przez $2$, $5$ i $10$, ale nie przez $100$. $2\\,500$ dzieli się przez $100$.",
          uwaga: "Liczba kończąca się cyfrą $5$ dzieli się przez $5$, ale nie przez $10$.",
        },
        {
          nazwa: "Podzielność przez 3 i 9",
          slownie: "Dodaj wszystkie cyfry liczby. Jeśli suma dzieli się przez $3$, to liczba dzieli się przez $3$. Jeśli suma dzieli się przez $9$, to liczba dzieli się przez $9$.",
          przyklad: "$4\\,725$: suma cyfr $4 + 7 + 2 + 5 = 18$. Liczba $18$ dzieli się przez $3$ i przez $9$, więc $4\\,725$ też. Kończy się cyfrą $5$, więc dzieli się też przez $5$.",
          uwaga: "Liczba $1\\,236$ ma sumę cyfr $12$. Dzieli się przez $3$, ale nie dzieli się przez $9$.",
        },
        {
          nazwa: "Liczby pierwsze i złożone",
          slownie: "Liczba pierwsza ma dokładnie dwa dzielniki: $1$ i samą siebie. Liczba złożona ma więcej niż dwa dzielniki. Liczba $1$ nie jest ani pierwsza, ani złożona.",
          przyklad: "Liczby pierwsze mniejsze od $30$: $2$, $3$, $5$, $7$, $11$, $13$, $17$, $19$, $23$, $29$. Liczba $12$ jest złożona, bo dzieli się przez $1$, $2$, $3$, $4$, $6$, $12$.",
          uwaga: "$2$ jest jedyną parzystą liczbą pierwszą. Nie każda nieparzysta jest pierwsza: $9$, $15$, $21$ są złożone.",
        },
        {
          nazwa: "Jak sprawdzić, czy liczba jest pierwsza",
          slownie: "Dla liczby mniejszej od $100$ sprawdź, czy dzieli się przez $2$, $3$, $5$ lub $7$. Jeśli przez żadną z nich, liczba jest pierwsza. Jeśli przez którąś (a nie jest nią samą), jest złożona.",
          przyklad: "$91$ nie dzieli się przez $2$, $3$, $5$, ale $91 = 7 \\cdot 13$, więc jest złożona. $97$ nie dzieli się przez $2$, $3$, $5$, $7$, więc jest pierwsza.",
        },
      ],
      jak: [
        "Do sprawdzenia podzielności użyj cech podzielności: patrz na ostatnie cyfry albo dodaj cyfry.",
        "Dzielniki liczby szukaj parami: zacznij od $1$ i samej liczby, potem sprawdzaj $2$, $3$, $4$, … po kolei.",
        "Liczbę pierwszą rozpoznasz po tym, że nie ma żadnego dzielnika oprócz $1$ i siebie. Sprawdź $2$, $3$, $5$, $7$.",
        "W dzieleniu z resztą pamiętaj: dzielna to iloraz razy dzielnik plus reszta, a reszta jest mniejsza od dzielnika.",
      ],
      zadania: [
        {
          nr: "32",
          tresc: "Która z liczb jest podzielna przez $9$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1\\,236$", "$2\\,358$", "$3\\,450$", "$5\\,420$"],
          poprawna: 1,
        },
        {
          nr: "33",
          tresc: "Którą cyfrą należy zastąpić $\\square$, aby liczba $58\\square$ dzieliła się przez $5$ i przez $2$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$0$", "$2$", "$4$"],
          poprawna: 1,
        },
        {
          nr: "34",
          tresc: "Który zbiór to wszystkie dzielniki liczby $18$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2, 3, 6, 9$", "$1, 2, 3, 6, 9$", "$1, 2, 3, 6, 9, 18$", "$18, 36, 54, 72$"],
          poprawna: 2,
        },
        {
          nr: "35",
          tresc: "Która z liczb jest liczbą pierwszą? **Wybierz właściwą odpowiedź.**",
          opcje: ["$51$", "$49$", "$53$", "$57$"],
          poprawna: 2,
        },
        {
          nr: "36",
          tresc: "Jaki jest wynik dzielenia z resztą $83 : 7$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$ reszty $1$", "$11$ reszty $7$", "$10$ reszty $13$", "$11$ reszty $6$"],
          poprawna: 3,
        },
        {
          nr: "37",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Liczba $1$ jest liczbą pierwszą.", litery: "PF", poprawna: 1 },
            { tekst: "Liczba $91$ jest liczbą pierwszą.", litery: "PF", poprawna: 1 },
            { tekst: "Liczba $2$ jest jedyną parzystą liczbą pierwszą.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "38",
          punkty: 2,
          tresc: "Sprawdź, przez które z liczb $2$, $3$, $5$, $9$ dzieli się liczba $3465$. **Zapisz uzasadnienie.**",
          rozwiazanie: "Liczba kończy się cyfrą $5$, więc nie dzieli się przez $2$, ale dzieli się przez $5$.\n\nSuma cyfr: $3 + 4 + 6 + 5 = 18$.\n\nLiczba $18$ dzieli się przez $3$ i przez $9$, więc liczba $3465$ też.\n\nOdpowiedź: Liczba $3465$ dzieli się przez $3$, $5$ i $9$, a nie dzieli się przez $2$.",
        },
        {
          nr: "39",
          punkty: 2,
          tresc: "Czy liczba $91$ jest pierwsza? Czy liczba $97$ jest pierwsza? **Uzasadnij odpowiedź.**",
          rozwiazanie: "Liczba $91$ nie dzieli się przez $2$, $3$ i $5$, ale $7 \\cdot 13 = 91$. Ma więc dzielnik $7$, czyli jest złożona.\n\nLiczba $97$ nie dzieli się przez $2$ (kończy się $7$), przez $3$ (suma cyfr $16$), przez $5$ ani przez $7$ (bo $7 \\cdot 13 = 91$, a $7 \\cdot 14 = 98$).\n\nOdpowiedź: Liczba $91$ nie jest pierwsza, a liczba $97$ jest pierwsza.",
        },
      ],
      generatory: [
        {
          id: "podzielnosc-wybor",
          nazwa: "Czy się dzieli",
          opis: "Wybierz liczbę podzielną przez $2$, $3$, $5$, $9$, $10$ albo $100$, albo odpowiedz, czy podana liczba jest podzielna.",
          generuj(r) {
            const CECHY = {
              2: "Liczba dzieli się przez $2$, gdy kończy się cyfrą $0$, $2$, $4$, $6$ lub $8$.",
              3: "Liczba dzieli się przez $3$, gdy suma jej cyfr dzieli się przez $3$.",
              5: "Liczba dzieli się przez $5$, gdy kończy się cyfrą $0$ lub $5$.",
              9: "Liczba dzieli się przez $9$, gdy suma jej cyfr dzieli się przez $9$.",
              10: "Liczba dzieli się przez $10$, gdy kończy się cyfrą $0$.",
              100: "Liczba dzieli się przez $100$, gdy kończy się dwoma zerami.",
            };
            const uzasadnij = (n, d) => {
              const ok = n % d === 0;
              if (d === 3 || d === 9) {
                const s = sumaCyfr(n);
                return `Suma cyfr liczby $${T(n)}$: $${cyfry(n).join(" + ")} = ${s}$. Liczba $${s}$ ${s % d === 0 ? "dzieli się" : "nie dzieli się"} przez $${d}$, więc $${T(n)}$ ${ok ? "dzieli się" : "nie dzieli się"} przez $${d}$.`;
              }
              if (d === 100) return `Dwie ostatnie cyfry liczby $${T(n)}$ to $${String(n % 100).padStart(2, "0")}$, więc liczba ${ok ? "dzieli się" : "nie dzieli się"} przez $100$.`;
              return `Liczba $${T(n)}$ kończy się cyfrą $${n % 10}$, więc ${ok ? "dzieli się" : "nie dzieli się"} przez $${d}$.`;
            };
            const d = r.pick([2, 3, 5, 9, 10, 100]);
            const lo = d === 100 ? 300 : 1000;
            const hi = d === 100 ? 99900 : 99999;
            const dobra = () => (d === 100 ? r.int(3, 999) * 100 : losuj(r, lo, hi, (x) => x % d === 0));
            const zla = (pulapka) => {
              if (d === 2) return losuj(r, lo, hi, (x) => x % 2 === 1);
              if (d === 3) return losuj(r, lo, hi, (x) => x % 3 !== 0);
              if (d === 5) return losuj(r, lo, hi, (x) => x % 5 !== 0);
              if (d === 9) return pulapka ? losuj(r, lo, hi, (x) => x % 3 === 0 && x % 9 !== 0) : losuj(r, lo, hi, (x) => x % 3 !== 0);
              if (d === 10) return pulapka ? losuj(r, lo, hi, (x) => x % 10 === 5) : losuj(r, lo, hi, (x) => x % 10 !== 0);
              return pulapka ? losuj(r, lo, hi, (x) => x % 100 !== 0 && x % 10 === 0) : losuj(r, lo, hi, (x) => x % 100 !== 0);
            };
            if (r.chance(0.65)) {
              const g = dobra();
              const liczby = [g];
              while (liczby.length < 4) {
                const z = zla(liczby.length === 1);
                if (!liczby.includes(z)) liczby.push(z);
              }
              const opcje = r.shuffle(liczby);
              return {
                tresc: r.pick([`Która z liczb jest podzielna przez $${d}$?`, `Wskaż liczbę, która dzieli się przez $${d}$.`]),
                pola: [{ id: "w", typ: "wybor", etykieta: `Liczba podzielna przez $${d}$`, opcje: opcje.map((x) => `$${T(x)}$`) }],
                odpowiedz: { w: opcje.indexOf(g) },
                wynik: `$${T(g)}$`,
                rozwiazanie: [CECHY[d], uzasadnij(g, d), `Pozostałe liczby nie spełniają tej cechy.`],
              };
            }
            const ok = r.chance(0.5);
            const n = ok ? dobra() : zla(r.chance(0.5));
            return {
              tresc: r.pick([`Czy liczba $${T(n)}$ jest podzielna przez $${d}$?`, `Czy $${T(n)}$ dzieli się przez $${d}$?`]),
              pola: [{ id: "w", typ: "wybor", etykieta: "Odpowiedź", opcje: ["tak", "nie"] }],
              odpowiedz: { w: n % d === 0 ? 0 : 1 },
              wynik: n % d === 0 ? "tak" : "nie",
              rozwiazanie: [CECHY[d], uzasadnij(n, d)],
            };
          },
        },
        {
          id: "pierwsze-dzielniki",
          nazwa: "Liczby pierwsze i dzielniki",
          opis: "Wybierz liczbę pierwszą spośród czterech albo policz dzielniki podanej liczby.",
          generuj(r) {
            const PIERWSZE = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
            const ZLOZONE = [15, 21, 25, 27, 33, 35, 39, 45, 49, 51, 55, 57, 63, 65, 69, 75, 77, 81, 85, 87, 91, 93, 95, 99];
            const najmniejszy = (n) => {
              for (let k = 2; k * k <= n; k++) if (n % k === 0) return k;
              return n;
            };
            if (r.chance(0.6)) {
              const p = r.pick(PIERWSZE);
              const zle = r.shuffle(ZLOZONE).slice(0, 3);
              const opcje = r.shuffle([p, ...zle]);
              return {
                tresc: r.pick([`Która z liczb jest liczbą pierwszą?`, `Wskaż liczbę pierwszą.`]),
                pola: [{ id: "w", typ: "wybor", etykieta: "Liczba pierwsza", opcje: opcje.map((x) => `$${x}$`) }],
                odpowiedz: { w: opcje.indexOf(p) },
                wynik: `$${p}$`,
                rozwiazanie: [...zle.map((z) => `$${z} = ${najmniejszy(z)} \\cdot ${z / najmniejszy(z)}$, więc jest złożona.`), `Liczba $${p}$ nie dzieli się przez $2$, $3$, $5$ ani $7$, więc jest pierwsza.`],
              };
            }
            const n = r.int(6, 60);
            const dz = [];
            for (let k = 1; k <= n; k++) if (n % k === 0) dz.push(k);
            const pary = dz.filter((k) => k * k <= n).map((k) => `$${k} \\cdot ${n / k}$`).join(", ");
            return {
              tresc: r.pick([`Ile dzielników ma liczba $${n}$?`, `Policz wszystkie dzielniki liczby $${n}$. Ile ich jest?`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba dzielników" }],
              odpowiedz: { w: dz.length },
              wynik: `$${dz.length}$`,
              rozwiazanie: [`Szukamy par liczb, które pomnożone dają $${n}$: ${pary}.`, `Dzielniki: ${dz.map((k) => `$${k}$`).join(", ")}.`, `Jest ich $${dz.length}$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "dzielenie-pisemne",
      nazwa: "Dzielenie pisemne",
      sciaga: [
        {
          nazwa: "Dzielenie przez liczbę jednocyfrową",
          slownie: "Dzielimy kolejnymi cyframi dzielnej, od lewej. Za każdym razem: dzielimy, mnożymy, odejmujemy i znosimy następną cyfrę.",
          przyklad: "$738 : 6$: $7 : 6 = 1$, reszta $1$. Znoszę $3$: $13 : 6 = 2$, reszta $1$. Znoszę $8$: $18 : 6 = 3$. Wynik: $123$.",
        },
        {
          nazwa: "Dzielenie przez liczbę dwucyfrową",
          slownie: "Zastanawiamy się, ile razy dzielnik mieści się w kolejnej części dzielnej. Pomaga zaokrąglenie dzielnika do dziesiątek.",
          przyklad: "$936 : 24$: $93 : 24 = 3$, bo $3 \\cdot 24 = 72$, reszta $21$. Znoszę $6$: $216 : 24 = 9$, bo $9 \\cdot 24 = 216$. Wynik: $39$.",
        },
        {
          nazwa: "Zero w ilorazie i reszta",
          slownie: "Jeśli po zniesieniu cyfry liczba jest za mała, w ilorazie piszemy $0$ i znosimy następną cyfrę. Reszta na końcu musi być mniejsza od dzielnika.",
          przyklad: "$4235 : 7$: $42 : 7 = 6$. Znoszę $3$: $3 : 7 = 0$, w ilorazie piszę $0$. Znoszę $5$: $35 : 7 = 5$. Wynik: $605$.",
          uwaga: "Nie gub zer w ilorazie. Wynik $65$ zamiast $605$ jest błędny.",
        },
        {
          nazwa: "Sprawdzanie dzielenia",
          slownie: "Iloraz razy dzielnik plus reszta powinny dać dzielną.",
          przyklad: "$123 \\cdot 6 = 738$, więc dzielenie $738 : 6 = 123$ jest dobre. Z resztą: $8 \\cdot 6 + 2 = 50$, więc $50 : 6 = 8$ reszty $2$.",
        },
      ],
      jak: [
        "Znajdź pierwszą część dzielnej, która jest nie mniejsza od dzielnika.",
        "Zapisz w ilorazie, ile razy dzielnik się w niej mieści. Pomnóż i odejmij, aby znaleźć resztę.",
        "Zniesienie następnej cyfry: dopisz ją do reszty i dziel dalej. Jeśli wychodzi za mało, w ilorazie piszesz $0$.",
        "Sprawdź wynik mnożeniem: iloraz razy dzielnik plus reszta.",
      ],
      zadania: [
        {
          nr: "40",
          tresc: "Ile to jest $912 : 4$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$208$", "$228$", "$218$", "$238$"],
          poprawna: 1,
        },
        {
          nr: "41",
          tresc: "Ile to jest $7308 : 9$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$82$", "$802$", "$812$", "$8\\,012$"],
          poprawna: 2,
        },
        {
          nr: "42",
          tresc: "Ile to jest $1092 : 21$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$52$", "$42$", "$520$", "$62$"],
          poprawna: 0,
        },
        {
          nr: "43",
          tresc: "Dzieląc pewną liczbę przez $8$, otrzymano iloraz $14$ i resztę $5$. Jaką liczbę dzielono? **Wybierz właściwą odpowiedź.**",
          opcje: ["$112$", "$19$", "$126$", "$117$"],
          poprawna: 3,
        },
        {
          nr: "44",
          tresc: "Do autobusów po $45$ miejsc mają wsiąść $400$ osób. Ile autobusów potrzeba, żeby wszyscy się zmieścili? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$", "$9$", "$10$", "$40$"],
          poprawna: 1,
        },
        {
          nr: "45",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$480 : 12 = 48$", litery: "PF", poprawna: 1 },
            { tekst: "$85 : 8 = 10$ reszty $5$", litery: "PF", poprawna: 0 },
            { tekst: "Przy dzieleniu przez $7$ reszta może być równa $7$.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "46",
          punkty: 2,
          tresc: "W szkole jest $1224$ uczniów. Na wycieczkę jadą autokarami po $48$ miejsc. Ile autokarów potrzeba, aby zabrać wszystkich uczniów? **Zapisz obliczenia.**",
          rozwiazanie: "Dzielimy: $1224 : 48$. Mamy $122 : 48 = 2$, bo $2 \\cdot 48 = 96$, reszta $26$.\n\nZnoszę $4$: $264 : 48 = 5$, bo $5 \\cdot 48 = 240$, reszta $24$.\n\nIloraz to $25$, reszta $24$. Pełnych autokarów jest $25$, a $24$ uczniów nie mieści się w nich.\n\nPotrzebny jest jeszcze jeden autokar: $25 + 1 = 26$.\n\nOdpowiedź: Potrzeba $26$ autokarów.",
        },
        {
          nr: "47",
          punkty: 3,
          tresc: "Oblicz pisemnie $5096 : 8$ i sprawdź wynik mnożeniem. **Zapisz obliczenia.**",
          rozwiazanie: "$50 : 8 = 6$, bo $6 \\cdot 8 = 48$, reszta $2$.\n\nZnoszę $9$: $29 : 8 = 3$, bo $3 \\cdot 8 = 24$, reszta $5$.\n\nZnoszę $6$: $56 : 8 = 7$, bo $7 \\cdot 8 = 56$, reszta $0$.\n\nIloraz: $637$.\n\nSprawdzenie: $637 \\cdot 8 = 5096$.\n\nOdpowiedź: $5096 : 8 = 637$.",
        },
      ],
      generatory: [
        {
          id: "dzielenie-pisemne-bez-reszty",
          nazwa: "Podziel pisemnie",
          opis: "Dzielenie pisemne bez reszty przez liczbę jednocyfrową lub dwucyfrową, z opisem kroków.",
          generuj(r) {
            const b = r.chance(0.6) ? r.int(2, 9) : r.int(11, 49);
            const q = r.int(b < 10 ? 20 : 5, Math.min(1111, Math.floor(9999 / b)));
            const a = b * q;
            const w = dzielPisemnie(a, b);
            const SCEN = [
              `Rozdzielono po równo $${T(a)}$ zł między $${b}$ osób. Ile złotych dostała jedna osoba?`,
              `$${T(a)}$ cukierków włożono po równo do $${b}$ pudełek. Ile cukierków jest w jednym pudełku?`,
              `Oblicz pisemnie $${T(a)} : ${b}$.`,
              `Podziel pisemnie $${T(a)}$ przez $${b}$.`,
              `Wykonaj dzielenie pisemne: $${T(a)} : ${b}$.`,
            ];
            return {
              tresc: r.pick(SCEN),
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w: q },
              wynik: `$${T(a)} : ${b} = ${q}$`,
              rozwiazanie: [...w.kroki, `Sprawdzenie: $${q} \\cdot ${b} = ${T(a)}$.`],
            };
          },
        },
        {
          id: "dzielenie-pisemne-z-reszta",
          nazwa: "Iloraz i reszta",
          opis: "Dzielenie pisemne z resztą: wpisz iloraz i resztę.",
          generuj(r) {
            const b = r.chance(0.55) ? r.int(3, 9) : r.int(11, 45);
            const q = r.int(b < 10 ? 20 : 5, b < 10 ? 999 : Math.floor(3000 / b));
            const reszta = r.chance(0.1) ? 0 : r.int(1, b - 1);
            const a = b * q + reszta;
            const w = dzielPisemnie(a, b);
            return {
              tresc: r.pick([`Podziel pisemnie z resztą $${T(a)} : ${b}$. Wpisz iloraz i resztę.`, `Oblicz $${T(a)} : ${b}$ z resztą. Podaj iloraz i resztę.`]),
              pola: [{ id: "i", typ: "liczba", etykieta: "Iloraz" }, { id: "r", typ: "liczba", etykieta: "Reszta" }],
              odpowiedz: { i: q, r: reszta },
              wynik: `$${T(a)} : ${b} = ${q}$ reszty $${reszta}$`,
              rozwiazanie: [...w.kroki, `Reszta jest mniejsza od $${b}$. Sprawdzenie: $${q} \\cdot ${b} + ${reszta} = ${T(a)}$.`],
            };
          },
        },
      ],
    },
  ],
};

/** Dzielenie pisemne a : b – kroki opisane słowami, iloraz i reszta (a ≥ b). */
function dzielPisemnie(a, b) {
  const c = cyfry(a);
  let i = 0, cur = 0;
  while (i < c.length && cur < b) {
    cur = cur * 10 + c[i];
    i++;
  }
  const kroki = [];
  let q = "";
  let rest = 0;
  let pierwszy = true;
  for (;;) {
    const d = Math.floor(cur / b);
    rest = cur - d * b;
    q += d;
    const poczatek = pierwszy ? "Dzielimy pierwsze cyfry: " : `Znoszę $${c[i - 1]}$: `;
    kroki.push(`${poczatek}$${cur} : ${b} = ${d}$, bo $${d} \\cdot ${b} = ${d * b}$, reszta $${rest}$.`);
    pierwszy = false;
    if (i >= c.length) break;
    cur = rest * 10 + c[i];
    i++;
  }
  return { q: Number(q), r: rest, kroki };
}
