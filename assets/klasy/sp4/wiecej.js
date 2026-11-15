// Klasa 4 (szkoła podstawowa) · rozdział V „Więcej o liczbach i działaniach” – Klucz do matematyki 4 (Nowa Era, 2026).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).

// --- Pomocnicze (tylko dla tego pliku)

/** Zdanie zaczynamy wielką literą. */
const wielka = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Rzeczy i miejsca do zadań o dzieleniu z resztą (bez liczebników przy rzeczach, żeby nie mylić „5 ołówków” z „3 ołówki”).
 * rz – dopełniacz („ołówków”), bie – biernik („ołówki”), gen – „pudełek”, kazde – „w każdym pudełku”.
 */
const SCENARIUSZE = [
  { rz: "ołówków", bie: "ołówki", gen: "pudełek", kazde: "każdym pudełku" },
  { rz: "cukierków", bie: "cukierki", gen: "torebek", kazde: "każdej torebce" },
  { rz: "jabłek", bie: "jabłka", gen: "koszyków", kazde: "każdym koszyku" },
  { rz: "gruszek", bie: "gruszki", gen: "skrzynek", kazde: "każdej skrzynce" },
  { rz: "zeszytów", bie: "zeszyty", gen: "paczek", kazde: "każdej paczce" },
  { rz: "tulipanów", bie: "tulipany", gen: "wazonów", kazde: "każdym wazonie" },
  { rz: "skarpetek", bie: "skarpetki", gen: "szuflad", kazde: "każdej szufladzie" },
  { rz: "naklejek", bie: "naklejki", gen: "kopert", kazde: "każdej kopercie" },
];

/** Cechy podzielności, krótko (do rozwiązań generatorów). */
const CECHY = {
  2: "Liczba jest podzielna przez $2$, gdy kończy się cyfrą $0$, $2$, $4$, $6$ albo $8$.",
  3: "Liczba jest podzielna przez $3$, gdy suma jej cyfr dzieli się przez $3$.",
  5: "Liczba jest podzielna przez $5$, gdy kończy się cyfrą $0$ albo $5$.",
  9: "Liczba jest podzielna przez $9$, gdy suma jej cyfr dzieli się przez $9$.",
  10: "Liczba jest podzielna przez $10$, gdy kończy się cyfrą $0$.",
  100: "Liczba jest podzielna przez $100$, gdy kończy się dwoma zerami.",
};

const cyfry = (n) => String(n).split("").map(Number);
const sumaCyfr = (n) => cyfry(n).reduce((a, b) => a + b, 0);

/** Jedno zdanie: czy liczba n jest podzielna przez d i dlaczego. */
function uzasadnij(n, d) {
  const ok = n % d === 0;
  const jest = ok ? "jest" : "nie jest";
  if (d === 3 || d === 9) {
    const s = sumaCyfr(n);
    return `Suma cyfr: $${cyfry(n).join(" + ")} = ${s}$. Liczba $${s}$ ${s % d === 0 ? "dzieli się" : "nie dzieli się"} przez $${d}$, więc liczba $${n}$ ${jest} podzielna przez $${d}$.`;
  }
  if (d === 100) {
    const dd = String(n % 100).padStart(2, "0");
    return `Dwie ostatnie cyfry liczby $${n}$ to $${dd}$, więc liczba ${jest} podzielna przez $100$.`;
  }
  return `Liczba $${n}$ kończy się cyfrą $${n % 10}$, więc ${jest} podzielna przez $${d}$.`;
}

/** Liczba z przedziału [lo, hi] spełniająca warunek. */
function losuj(r, lo, hi, ok) {
  for (;;) {
    const x = r.int(lo, hi);
    if (ok(x)) return x;
  }
}

/** Wyrażenie do zadań o kolejności działań: zapis w TeX, kroki rozwiązania i wynik. */
const W = (tex, kroki, wynik) => ({ tex, kroki, wynik });

/** Wyrażenia bez nawiasów i potęg. */
const SZABLONY_PROSTE = [
  (r) => {
    const a = r.int(2, 30), b = r.int(2, 9), c = r.int(2, 9);
    return W(`${a} + ${b} \\cdot ${c}`, [`Najpierw mnożenie: $${b} \\cdot ${c} = ${b * c}$.`, `Potem dodawanie: $${a} + ${b * c} = ${a + b * c}$.`], a + b * c);
  },
  (r) => {
    const a = r.int(2, 9), b = r.int(2, 9);
    const c = r.int(1, Math.min(30, a * b - 1));
    return W(`${a} \\cdot ${b} - ${c}`, [`Najpierw mnożenie: $${a} \\cdot ${b} = ${a * b}$.`, `Potem odejmowanie: $${a * b} - ${c} = ${a * b - c}$.`], a * b - c);
  },
  (r) => {
    const b = r.int(2, 9), c = r.int(2, 9);
    const a = b * c + r.int(1, 25);
    return W(`${a} - ${b} \\cdot ${c}`, [`Najpierw mnożenie: $${b} \\cdot ${c} = ${b * c}$.`, `Potem odejmowanie: $${a} - ${b * c} = ${a - b * c}$.`], a - b * c);
  },
  (r) => {
    const c = r.int(2, 9), k = r.int(2, 9), a = r.int(2, 30);
    const b = c * k;
    return W(`${a} + ${b} : ${c}`, [`Najpierw dzielenie: $${b} : ${c} = ${k}$.`, `Potem dodawanie: $${a} + ${k} = ${a + k}$.`], a + k);
  },
  (r) => {
    const c = r.int(2, 9), k = r.int(2, 9);
    const b = c * k;
    const a = k + r.int(1, 30);
    return W(`${a} - ${b} : ${c}`, [`Najpierw dzielenie: $${b} : ${c} = ${k}$.`, `Potem odejmowanie: $${a} - ${k} = ${a - k}$.`], a - k);
  },
  (r) => {
    const a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9), d = r.int(2, 9);
    return W(`${a} \\cdot ${b} + ${c} \\cdot ${d}`, [`Najpierw oba mnożenia: $${a} \\cdot ${b} = ${a * b}$ oraz $${c} \\cdot ${d} = ${c * d}$.`, `Potem dodawanie: $${a * b} + ${c * d} = ${a * b + c * d}$.`], a * b + c * d);
  },
  (r) => {
    let a, b, c, d;
    do {
      a = r.int(3, 9); b = r.int(3, 9); c = r.int(2, 9); d = r.int(2, 9);
    } while (a * b <= c * d);
    return W(`${a} \\cdot ${b} - ${c} \\cdot ${d}`, [`Najpierw oba mnożenia: $${a} \\cdot ${b} = ${a * b}$ oraz $${c} \\cdot ${d} = ${c * d}$.`, `Potem odejmowanie: $${a * b} - ${c * d} = ${a * b - c * d}$.`], a * b - c * d);
  },
  (r) => {
    const b = r.int(2, 25), a = b + r.int(1, 30), c = r.int(2, 30);
    return W(`${a} - ${b} + ${c}`, [`Są tylko dodawanie i odejmowanie, więc liczymy od lewej do prawej.`, `$${a} - ${b} = ${a - b}$, a potem $${a - b} + ${c} = ${a - b + c}$.`], a - b + c);
  },
  (r) => {
    const b = r.int(2, 25), c = r.int(2, 25), a = b + c + r.int(0, 20);
    return W(`${a} - ${b} - ${c}`, [`Są tylko odejmowania, więc liczymy od lewej do prawej.`, `$${a} - ${b} = ${a - b}$, a potem $${a - b} - ${c} = ${a - b - c}$.`], a - b - c);
  },
  (r) => {
    const b = r.int(2, 9), k = r.int(2, 9), c = r.int(2, 9);
    const a = b * k;
    return W(`${a} : ${b} \\cdot ${c}`, [`Są tylko dzielenie i mnożenie, więc liczymy od lewej do prawej.`, `$${a} : ${b} = ${k}$, a potem $${k} \\cdot ${c} = ${k * c}$.`], k * c);
  },
];

/** Wyrażenia z nawiasami i potęgami. */
const SZABLONY_NAWIAS = [
  (r) => {
    const a = r.int(1, 12), b = r.int(1, 12), c = r.int(2, 9);
    return W(`(${a} + ${b}) \\cdot ${c}`, [`Najpierw nawias: $${a} + ${b} = ${a + b}$.`, `Potem mnożenie: $${a + b} \\cdot ${c} = ${(a + b) * c}$.`], (a + b) * c);
  },
  (r) => {
    const b = r.int(1, 12), a = b + r.int(1, 12), c = r.int(2, 9);
    return W(`(${a} - ${b}) \\cdot ${c}`, [`Najpierw nawias: $${a} - ${b} = ${a - b}$.`, `Potem mnożenie: $${a - b} \\cdot ${c} = ${(a - b) * c}$.`], (a - b) * c);
  },
  (r) => {
    const c = r.int(2, 9), k = r.int(2, 9), s = c * k;
    const a = r.int(1, s - 1), b = s - a;
    return W(`(${a} + ${b}) : ${c}`, [`Najpierw nawias: $${a} + ${b} = ${s}$.`, `Potem dzielenie: $${s} : ${c} = ${k}$.`], k);
  },
  (r) => {
    const c = r.int(1, 12), b = c + r.int(1, 12), a = r.int(2, 9);
    return W(`${a} \\cdot (${b} - ${c})`, [`Najpierw nawias: $${b} - ${c} = ${b - c}$.`, `Potem mnożenie: $${a} \\cdot ${b - c} = ${a * (b - c)}$.`], a * (b - c));
  },
  (r) => {
    const a = r.int(2, 30), b = r.int(2, 9);
    return W(`${a} + ${b}^2`, [`Najpierw potęga: $${b}^2 = ${b} \\cdot ${b} = ${b * b}$.`, `Potem dodawanie: $${a} + ${b * b} = ${a + b * b}$.`], a + b * b);
  },
  (r) => {
    let a, b, c;
    do {
      a = r.int(4, 10); b = r.int(2, 9); c = r.int(2, 9);
    } while (b * c >= a * a);
    return W(`${a}^2 - ${b} \\cdot ${c}`, [`Najpierw potęga: $${a}^2 = ${a} \\cdot ${a} = ${a * a}$.`, `Potem mnożenie: $${b} \\cdot ${c} = ${b * c}$.`, `Na końcu odejmowanie: $${a * a} - ${b * c} = ${a * a - b * c}$.`], a * a - b * c);
  },
  (r) => {
    const a = r.int(1, 5), b = r.int(1, 5);
    const s = a + b;
    return W(`(${a} + ${b})^2`, [`Najpierw nawias: $${a} + ${b} = ${s}$.`, `Potem potęga: $${s}^2 = ${s} \\cdot ${s} = ${s * s}$.`], s * s);
  },
  (r) => {
    const c = r.int(2, 5), a = r.int(2, 6), b = r.int(2, 20);
    return W(`${c} \\cdot ${a}^2 + ${b}`, [`Najpierw potęga: $${a}^2 = ${a * a}$.`, `Potem mnożenie: $${c} \\cdot ${a * a} = ${c * a * a}$.`, `Na końcu dodawanie: $${c * a * a} + ${b} = ${c * a * a + b}$.`], c * a * a + b);
  },
  (r) => {
    const a = r.int(2, 4), a3 = a * a * a, b = r.int(1, a3 - 1);
    return W(`${a}^3 - ${b}`, [`Najpierw potęga: $${a}^3 = ${a} \\cdot ${a} \\cdot ${a} = ${a3}$.`, `Potem odejmowanie: $${a3} - ${b} = ${a3 - b}$.`], a3 - b);
  },
];

const TRESCI_WYRAZENIA = [(t) => `Oblicz $${t}$.`, (t) => `Oblicz wartość wyrażenia $${t}$.`, (t) => `Ile jest równe $${t}$?`];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 1. Dzielenie z resztą
    {
      id: "dzielenie-z-reszta",
      nazwa: "Dzielenie z resztą",
      sciaga: [
        {
          nazwa: "Co to jest reszta",
          slownie: "Gdy nie da się podzielić po równo, część rzeczy zostaje. To, co zostaje, nazywamy resztą.",
          tex: "17:5=3\\text{ reszta }2",
          przyklad: "$17$ cukierków dzielimy po równo między $5$ dzieci. Każde dostaje $3$ cukierki i zostają $2$ cukierki. Zapisujemy: $17 : 5 = 3$ reszta $2$.",
          uwaga: "Reszta to nie iloraz. Iloraz to $3$ (tyle dostaje każde dziecko), a reszta to $2$ (tyle zostało).",
        },
        {
          nazwa: "Reszta jest mniejsza od dzielnika",
          slownie: "Reszta jest zawsze mniejsza od dzielnika. Gdyby była równa dzielnikowi albo większa, dałoby się jeszcze raz podzielić.",
          tex: "\\text{reszta}<\\text{dzielnik}",
          przyklad: "Dzieląc przez $4$, możemy dostać resztę $0$, $1$, $2$ albo $3$. Reszta $4$ jest niemożliwa, bo wtedy da się jeszcze raz wziąć $4$.",
          uwaga: "Jeśli wyszła reszta równa dzielnikowi albo większa, iloraz jest za mały. Zwiększ go i policz resztę jeszcze raz.",
        },
        {
          nazwa: "Jak dzielić z resztą",
          slownie: "Szukamy największej wielokrotności dzielnika, która nie jest większa od dzielnej. Tyle razy dzielnik się mieści. Resztę liczymy odejmowaniem.",
          tex: "29:6=4\\text{ reszta }5",
          przyklad: "$29 : 6$. Wielokrotności szóstki to $6$, $12$, $18$, $24$, $30$. Liczba $30$ jest już za duża, więc bierzemy $24 = 4 \\cdot 6$. Iloraz to $4$, a reszta to $29 - 24 = 5$.",
          uwaga: "Wielokrotność nie może być większa od dzielnej, bo nie dałoby się odjąć. Bierz największą, która jeszcze się mieści.",
        },
        {
          nazwa: "Sprawdzanie dzielenia z resztą",
          slownie: "Wynik sprawdzamy mnożeniem i dodawaniem: iloraz razy dzielnik plus reszta musi dać dzielną.",
          tex: "3\\cdot 5+2=17",
          przyklad: "$29 : 6 = 4$ reszta $5$. Sprawdzenie: $4 \\cdot 6 + 5 = 24 + 5 = 29$. Zgadza się.",
          uwaga: "Nie zapomnij dodać reszty. Samo $4 \\cdot 6 = 24$ to jeszcze nie $29$.",
        },
        {
          nazwa: "Reszta w zadaniach",
          slownie: "W zadaniu sprawdź, o co pytają: o pełne grupy, o to, co zostało, czy o to, ile grup trzeba, żeby zmieściło się wszystko.",
          przyklad: "$23$ osoby jadą samochodami po $4$ osoby. $23 : 4 = 5$ reszta $3$. Pełnych samochodów jest $5$, a $3$ osoby zostają. Żeby zabrać wszystkich, potrzeba $6$ samochodów.",
          uwaga: "Gdy reszta jest większa od $0$, to na pytanie „ile grup potrzeba” odpowiedź to iloraz plus $1$.",
        },
      ],
      jak: [
        "Zapisz dzielenie i wypisz kolejne wielokrotności dzielnika, aż dojdziesz do liczby tuż przed dzielną albo równej dzielnej.",
        "Weź największą wielokrotność, która nie jest większa od dzielnej. Ile razy dzielnik się w niej mieści, to jest iloraz.",
        "Odejmij tę wielokrotność od dzielnej. Wynik to reszta. Sprawdź, że jest mniejsza od dzielnika.",
        "Sprawdź mnożeniem i dodawaniem: iloraz razy dzielnik plus reszta. W zadaniu przeczytaj pytanie: czy chodzi o iloraz, o resztę, czy o iloraz plus $1$.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Oblicz $23 : 5$ z resztą. **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$, reszta $4$", "$4$, reszta $2$", "$4$, reszta $3$", "$5$, reszta $3$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Która z liczb **może** być resztą z dzielenia przez $6$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$5$", "$7$", "$12$"],
          poprawna: 1,
        },
        {
          nr: "3",
          tresc: "Dzieląc pewną liczbę przez $7$, otrzymano iloraz $4$ i resztę $3$. Jaką liczbę dzielono? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$", "$28$", "$25$", "$31$"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "Na wycieczkę jedzie $38$ osób. W jednym samochodzie mieści się $5$ osób. Ile samochodów potrzeba, żeby zabrać wszystkich? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$", "$7$", "$3$", "$190$"],
          poprawna: 0,
        },
        {
          nr: "5",
          tresc: "Wiadomo, że $47 : 6 = 7$ reszta $5$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$7 \\cdot 6 + 5 = 47$", litery: "PF", poprawna: 0 },
            { tekst: "Reszta $5$ jest mniejsza od dzielnika $6$.", litery: "PF", poprawna: 0 },
            { tekst: "Dzieląc $47$ przez $6$, dostajemy iloraz $8$.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Z wstążki o długości $50$ cm odcinamy kawałki po $6$ cm. Ile takich kawałków można uciąć? Ile centymetrów wstążki zostanie? **Zapisz obliczenia.**",
          rozwiazanie: "Dzielimy z resztą: $50 : 6$. Wielokrotności szóstki: $6 \\cdot 8 = 48$, a $6 \\cdot 9 = 54$ jest już za dużo.\n\nIloraz to $8$, a reszta to $50 - 48 = 2$.\n\nSprawdzenie: $8 \\cdot 6 + 2 = 48 + 2 = 50$.\n\nOdpowiedź: Można uciąć $8$ kawałków i zostanie $2$ cm wstążki.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "W klasie jest $29$ uczniów. Nauczyciel ustawia ich w rzędy po $4$ osoby. Ile jest pełnych rzędów? Ile osób stanie w ostatnim, niepełnym rzędzie? Ile rzędów trzeba w sumie? **Zapisz obliczenia.**",
          rozwiazanie: "Dzielimy z resztą: $29 : 4$. Mamy $4 \\cdot 7 = 28$, a $4 \\cdot 8 = 32$ to za dużo.\n\nIloraz to $7$, a reszta to $29 - 28 = 1$.\n\nPełnych rzędów jest $7$, a w ostatnim rzędzie stoi $1$ osoba. Żeby ustawić wszystkich, potrzeba jeszcze jednego rzędu: $7 + 1 = 8$ rzędów.\n\nOdpowiedź: Pełnych rzędów jest $7$, w ostatnim rzędzie stoi $1$ osoba, a w sumie trzeba $8$ rzędów.",
        },
      ],
      generatory: [
        {
          id: "dzielenie-reszta",
          nazwa: "Iloraz i reszta",
          opis: "Podziel liczbę z resztą i wpisz iloraz oraz resztę albo odtwórz liczbę, którą dzielono.",
          generuj(r) {
            const b = r.int(3, 9);
            const k = r.int(2, 12);
            if (r.chance(0.8)) {
              const reszta = r.chance(0.15) ? 0 : r.int(1, b - 1);
              const N = b * k + reszta;
              const tresc = r.pick([
                `Podziel z resztą $${N} : ${b}$. Wpisz iloraz i resztę.`,
                `Oblicz $${N} : ${b}$ z resztą.`,
                `Jaki jest iloraz, a jaka reszta w dzieleniu $${N}$ przez $${b}$?`,
              ]);
              return {
                tresc,
                pola: [
                  { id: "i", typ: "liczba", etykieta: "Iloraz" },
                  { id: "r", typ: "liczba", etykieta: "Reszta" },
                ],
                odpowiedz: { i: k, r: reszta },
                wynik: `$${N} : ${b} = ${k}$ reszta $${reszta}$`,
                rozwiazanie: [
                  `Szukamy największej wielokrotności liczby $${b}$, która nie jest większa od $${N}$: $${b} \\cdot ${k} = ${b * k}$.`,
                  `Następna wielokrotność, $${b} \\cdot ${k + 1} = ${b * (k + 1)}$, jest już za duża, więc iloraz to $${k}$.`,
                  `Reszta: $${N} - ${b * k} = ${reszta}$.`,
                  `Sprawdzenie: $${k} \\cdot ${b} + ${reszta} = ${N}$.`,
                ],
              };
            }
            const reszta = r.int(1, b - 1);
            const N = b * k + reszta;
            return {
              tresc: `Dzieląc pewną liczbę przez $${b}$, otrzymano iloraz $${k}$ i resztę $${reszta}$. Jaką liczbę dzielono?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Dzielna" }],
              odpowiedz: { w: N },
              wynik: `$${N}$`,
              rozwiazanie: [
                `Dzielną sprawdzamy tak: iloraz razy dzielnik plus reszta.`,
                `$${k} \\cdot ${b} = ${k * b}$.`,
                `$${k * b} + ${reszta} = ${N}$.`,
              ],
            };
          },
        },
        {
          id: "dzielenie-reszta-zadanie",
          nazwa: "Zadanie z resztą",
          opis: "Rzeczy wkładamy do pojemników po tyle samo: ile pojemników zapełnimy, ile rzeczy zostanie albo ile pojemników trzeba.",
          generuj(r) {
            const c = r.pick(SCENARIUSZE);
            const tryb = r.int(0, 2);
            const k = r.int(3, 9);
            const q = r.int(2, 9);
            const reszta = r.int(1, k - 1);
            const N = k * q + reszta;
            const wstep = `${wielka(c.rz)} jest razem $${N}$. Wkładamy je do ${c.gen}, po $${k}$ w ${c.kazde}.`;
            const dziel = `$${N} : ${k} = ${q}$ reszta $${reszta}$`;
            const sprawdzenie = `Sprawdzenie: $${q} \\cdot ${k} + ${reszta} = ${N}$.`;
            if (tryb === 0) {
              return {
                tresc: `${wstep} Ile ${c.gen} zostanie zapełnionych do pełna?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Pełnych" }],
                odpowiedz: { w: q },
                wynik: `$${q}$`,
                rozwiazanie: [`Dzielimy z resztą: ${dziel}.`, `Iloraz mówi, ile jest pełnych grup po $${k}$: $${q}$.`, sprawdzenie],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `${wstep} Ile ${c.rz} zostanie, gdy zapełnimy do pełna tyle ${c.gen}, ile się da?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Zostanie" }],
                odpowiedz: { w: reszta },
                wynik: `$${reszta}$`,
                rozwiazanie: [`Dzielimy z resztą: ${dziel}.`, `Reszta mówi, ile zostało: $${reszta}$.`, sprawdzenie],
              };
            }
            return {
              tresc: `${wstep} Ile ${c.gen} potrzeba, żeby zmieścić wszystkie ${c.bie}?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Potrzeba" }],
              odpowiedz: { w: q + 1 },
              wynik: `$${q + 1}$`,
              rozwiazanie: [
                `Dzielimy z resztą: ${dziel}.`,
                `Pełnych jest $${q}$. Reszta jest większa od $0$, więc pozostałe ${c.bie} potrzebują jeszcze jednego miejsca.`,
                `$${q} + 1 = ${q + 1}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 2. Podzielność
    {
      id: "podzielnosc",
      nazwa: "Podzielność",
      sciaga: [
        {
          nazwa: "Dzielnik i wielokrotność",
          slownie: "Gdy jedna liczba dzieli się przez drugą bez reszty, mówimy, że jest przez nią podzielna. Liczba, przez którą dzielimy, to dzielnik. Liczba, która dzieli się przez dzielnik, to wielokrotność.",
          tex: "24:6=4\\text{ reszta }0",
          przyklad: "$24 : 6 = 4$ bez reszty. Liczba $24$ jest podzielna przez $6$. Liczba $6$ jest dzielnikiem liczby $24$, a $24$ jest wielokrotnością liczby $6$. Wielokrotności szóstki to $6$, $12$, $18$, $24$, $30$.",
          uwaga: "Dzielnik nie jest większy od liczby, a wielokrotność nie jest mniejsza. $6$ jest dzielnikiem liczby $24$, a nie odwrotnie.",
        },
        {
          nazwa: "Podzielność przez 2, 5 i 10",
          slownie: "Patrzymy na ostatnią cyfrę. Liczba jest podzielna przez $2$, gdy kończy się cyfrą $0$, $2$, $4$, $6$ albo $8$ (jest parzysta). Przez $5$, gdy kończy się cyfrą $0$ albo $5$. Przez $10$, gdy kończy się cyfrą $0$.",
          tex: "\\text{przez }2:\\ 0,2,4,6,8\\qquad\\text{przez }5:\\ 0,5\\qquad\\text{przez }10:\\ 0",
          przyklad: "$340$ jest podzielna przez $2$, $5$ i $10$. $275$ jest podzielna tylko przez $5$. $128$ jest podzielna tylko przez $2$.",
          uwaga: "Liczba podzielna przez $10$ dzieli się też przez $2$ i przez $5$, ale nie odwrotnie: $15$ dzieli się przez $5$, a przez $10$ już nie.",
        },
        {
          nazwa: "Podzielność przez 100",
          slownie: "Liczba jest podzielna przez $100$, gdy kończy się dwoma zerami.",
          tex: "4500:100=45",
          przyklad: "$4500$ i $300$ są podzielne przez $100$. $4050$ nie jest, bo kończy się cyframi $50$, a nie $00$.",
          uwaga: "Jedno zero na końcu nie wystarcza. $4050$ dzieli się przez $10$, ale nie dzieli się przez $100$.",
        },
        {
          nazwa: "Podzielność przez 3 i 9",
          slownie: "Dodajemy wszystkie cyfry liczby. Jeśli suma dzieli się przez $3$, to cała liczba dzieli się przez $3$. Jeśli suma dzieli się przez $9$, to cała liczba dzieli się przez $9$.",
          tex: "4+6+2=12\\qquad 12:3=4",
          przyklad: "$462$: $4 + 6 + 2 = 12$. Liczba $12$ dzieli się przez $3$, ale nie przez $9$, więc $462$ jest podzielna przez $3$, a przez $9$ nie. $729$: $7 + 2 + 9 = 18$, a $18$ dzieli się przez $9$, więc $729$ dzieli się przez $9$ (i przez $3$).",
          uwaga: "Tu nie patrzymy na ostatnią cyfrę, tylko na sumę wszystkich cyfr. Liczba $21$ kończy się jedynką, a dzieli się przez $3$.",
        },
        {
          nazwa: "Jak znaleźć dzielniki",
          slownie: "Sprawdzamy po kolei liczby $1$, $2$, $3$ i dalej. Jeśli liczba dzieli się bez reszty, zapisujemy ją razem z jej parą. Kończymy, gdy pary zaczynają się powtarzać.",
          przyklad: "Dzielniki liczby $20$: $20 : 1 = 20$, więc $1$ i $20$. $20 : 2 = 10$, więc $2$ i $10$. Przez $3$ się nie dzieli. $20 : 4 = 5$, więc $4$ i $5$. Dalej pary się powtarzają. Dzielniki to $1$, $2$, $4$, $5$, $10$, $20$.",
          uwaga: "Pamiętaj o $1$ i o samej liczbie. Zawsze są jej dzielnikami.",
        },
      ],
      jak: [
        "Zobacz, przez jaką liczbę pytają: przez $2$, $5$, $10$ i $100$ patrzymy na koniec liczby, a przez $3$ i $9$ liczymy sumę cyfr.",
        "Przy $3$ i $9$ dodaj wszystkie cyfry i sprawdź, czy suma dzieli się przez $3$ albo przez $9$.",
        "Gdy brakuje cyfry w liczbie, wypróbuj kolejne cyfry albo policz, ile brakuje do sumy podzielnej przez $3$ lub $9$.",
        "Szukając dzielników, sprawdzaj kolejne liczby od $1$ i zapisuj pary.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Która z liczb jest podzielna przez $5$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$512$", "$253$", "$405$", "$154$"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Która z liczb jest podzielna przez $9$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$57$", "$126$", "$236$", "$145$"],
          poprawna: 1,
        },
        {
          nr: "10",
          tresc: "Jaką cyfrę trzeba wpisać w miejsce $\\square$ w liczbie $5\\square$, żeby liczba była podzielna przez $9$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$", "$5$", "$6$", "$4$"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "Rozważamy liczbę $7230$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Liczba $7230$ jest podzielna przez $10$.", litery: "PF", poprawna: 0 },
            { tekst: "Liczba $7230$ jest podzielna przez $100$.", litery: "PF", poprawna: 1 },
            { tekst: "Liczba $7230$ jest podzielna przez $3$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "12",
          tresc: "Która z liczb **nie** jest dzielnikiem liczby $20$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$8$", "$5$", "$10$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Czy liczba $4230$ jest podzielna przez $2$, $3$, $5$, $9$, $10$ i $100$? Sprawdź każdą podzielność. **Zapisz obliczenia.**",
          rozwiazanie: "Liczba $4230$ kończy się cyfrą $0$, więc jest podzielna przez $2$, przez $5$ i przez $10$.\n\nKończy się cyframi $30$, a nie $00$, więc nie jest podzielna przez $100$.\n\nSuma cyfr: $4 + 2 + 3 + 0 = 9$. Liczba $9$ dzieli się przez $3$ i przez $9$, więc $4230$ jest podzielna przez $3$ i przez $9$.\n\nOdpowiedź: Liczba $4230$ jest podzielna przez $2$, $3$, $5$, $9$ i $10$, a nie jest podzielna przez $100$.",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "W klasie jest $24$ uczniów. Nauczycielka chce podzielić ich na równe grupy, w których jest więcej niż $1$ osoba i mniej niż $24$ osoby. Ile osób może być w jednej grupie? Wypisz wszystkie możliwości. **Zapisz obliczenia.**",
          rozwiazanie: "Szukamy dzielników liczby $24$, więc sprawdzamy kolejne liczby.\n\n$24 : 2 = 12$, $24 : 3 = 8$, $24 : 4 = 6$. Przez $5$ się nie dzieli (reszta $4$). $24 : 6 = 4$.\n\nPrzez $7$, $9$, $10$ i $11$ się nie dzieli. $24 : 8 = 3$, $24 : 12 = 2$. Pary się powtarzają: $2$ i $12$, $3$ i $8$, $4$ i $6$.\n\nOdpowiedź: W grupie może być $2$, $3$, $4$, $6$, $8$ albo $12$ osób.",
        },
      ],
      generatory: [
        {
          id: "podzielnosc-wybor",
          nazwa: "Czy się dzieli",
          opis: "Wybierz liczbę podzielną przez $2$, $3$, $5$, $9$, $10$ lub $100$ albo odpowiedz, czy podana liczba jest podzielna.",
          generuj(r) {
            const d = r.pick([2, 3, 5, 9, 10, 100]);
            const lo = d === 100 ? 200 : 100;
            const hi = d === 100 ? 9900 : r.chance(0.6) ? 999 : 2999;
            const dobra = () => (d === 100 ? r.int(2, 99) * 100 : losuj(r, lo, hi, (x) => x % d === 0));
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
                tresc: `Która z liczb jest podzielna przez $${d}$?`,
                pola: [{ id: "w", typ: "wybor", etykieta: "Liczba", opcje: opcje.map((x) => `$${x}$`) }],
                odpowiedz: { w: opcje.indexOf(g) },
                wynik: `$${g}$`,
                rozwiazanie: [CECHY[d], uzasadnij(g, d), `Pozostałe liczby nie spełniają tej cechy.`],
              };
            }
            const tak = r.chance(0.5);
            const n = tak ? dobra() : zla(r.chance(0.5));
            return {
              tresc: `Czy liczba $${n}$ jest podzielna przez $${d}$?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Odpowiedź", opcje: ["tak", "nie"] }],
              odpowiedz: { w: tak ? 0 : 1 },
              wynik: tak ? "tak" : "nie",
              rozwiazanie: [CECHY[d], uzasadnij(n, d)],
            };
          },
        },
        {
          id: "podzielnosc-cyfra",
          nazwa: "Brakująca cyfra",
          opis: "Wpisz cyfrę w miejsce kwadracika tak, żeby liczba była podzielna przez $3$ albo przez $9$.",
          generuj(r) {
            const d = r.pick([3, 3, 9, 9]);
            const len = r.int(3, 4);
            const poz = r.int(1, len - 1);
            let cyf, reszta;
            do {
              cyf = Array.from({ length: len }, (_, i) => (i === 0 ? r.int(1, 9) : r.int(0, 9)));
              reszta = cyf.reduce((s, x, i) => s + (i === poz ? 0 : x), 0);
            } while (d === 9 && reszta % 9 === 0);
            const pasuje = [];
            for (let x = 0; x <= 9; x++) if ((reszta + x) % d === 0) pasuje.push(x);
            const pozostale = cyf.filter((_, i) => i !== poz);
            const numer = cyf.map((x, i) => (i === poz ? "\\square" : String(x))).join("");
            const sumaBez = `Suma pozostałych cyfr: $${pozostale.join(" + ")} = ${reszta}$.`;
            const lista = pasuje.map((x) => `$${x}$`).join(", ");
            let tryb = "jedyna";
            if (d === 3) tryb = r.pick(["najmniejsza", "największa", "ile"]);
            let odp, pytanie, opisOdp;
            if (tryb === "jedyna") {
              odp = pasuje[0];
              pytanie = `Jaka cyfra pasuje w miejsce $\\square$ w liczbie $${numer}$, aby liczba była podzielna przez $9$?`;
              opisOdp = `Pasuje tylko cyfra $${odp}$.`;
            } else if (tryb === "najmniejsza") {
              odp = pasuje[0];
              pytanie = `Jaka jest najmniejsza cyfra, którą można wpisać w miejsce $\\square$ w liczbie $${numer}$, aby liczba była podzielna przez $3$?`;
              opisOdp = `Najmniejsza z nich to $${odp}$.`;
            } else if (tryb === "największa") {
              odp = pasuje[pasuje.length - 1];
              pytanie = `Jaka jest największa cyfra, którą można wpisać w miejsce $\\square$ w liczbie $${numer}$, aby liczba była podzielna przez $3$?`;
              opisOdp = `Największa z nich to $${odp}$.`;
            } else {
              odp = pasuje.length;
              pytanie = `Ile różnych cyfr można wpisać w miejsce $\\square$ w liczbie $${numer}$, aby liczba była podzielna przez $3$?`;
              opisOdp = `Takich cyfr jest $${odp}$.`;
            }
            const rozw = [sumaBez, `Do $${reszta}$ trzeba dodać taką cyfrę, żeby suma dzieliła się przez $${d}$. Pasują cyfry: ${lista}.`, opisOdp];
            if (tryb !== "ile") {
              const s = reszta + odp;
              rozw.push(`Sprawdzenie: suma cyfr to $${s}$, a $${s}$ dzieli się przez $${d}$.`);
            }
            return {
              tresc: pytanie,
              pola: [{ id: "w", typ: "liczba", etykieta: tryb === "ile" ? "Ile cyfr" : "Cyfra" }],
              odpowiedz: { w: odp },
              wynik: `$${odp}$`,
              rozwiazanie: rozw,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3. Druga i trzecia potęga
    {
      id: "druga-i-trzecia-potega",
      nazwa: "Druga i trzecia potęga",
      sciaga: [
        {
          nazwa: "Druga potęga",
          slownie: "Druga potęga liczby to ta liczba pomnożona przez siebie. Mówimy też: liczba do kwadratu.",
          tex: "5^2=5\\cdot 5=25",
          przyklad: "$7^2 = 7 \\cdot 7 = 49$. Tyle kafelków ma kwadrat z $7$ rzędów po $7$ kafelków.",
          uwaga: "$5^2$ to nie $5 \\cdot 2$. Mały numerek mówi, ile razy piszemy liczbę w mnożeniu.",
        },
        {
          nazwa: "Trzecia potęga",
          slownie: "Trzecia potęga liczby to trzy takie same liczby pomnożone przez siebie. Mówimy też: liczba do sześcianu.",
          tex: "4^3=4\\cdot 4\\cdot 4=64",
          przyklad: "$2^3 = 2 \\cdot 2 \\cdot 2 = 4 \\cdot 2 = 8$. Tyle klocków ma kostka, która ma $2$ klocki w długość, $2$ w szerokość i $2$ w wysokość.",
          uwaga: "$4^3$ to nie $4 \\cdot 3 = 12$. Mnożymy trzy czwórki: najpierw $4 \\cdot 4 = 16$, potem $16 \\cdot 4 = 64$.",
        },
        {
          nazwa: "Podstawa i wykładnik",
          slownie: "W zapisie potęgi duża liczba to podstawa, a mały numerek u góry to wykładnik. Podstawa mówi, co mnożymy, a wykładnik mówi, ile razy.",
          tex: "5^3=5\\cdot 5\\cdot 5",
          litery: "$5$ to podstawa (liczba, którą mnożymy), $3$ to wykładnik (ile razy ją piszemy).",
          przyklad: "W potędze $6^2$ podstawa to $6$, a wykładnik to $2$. Zapis $6^2$ oznacza $6 \\cdot 6 = 36$.",
          uwaga: "Nie mnóż podstawy przez wykładnik. $2^3 = 8$, a nie $6$.",
        },
        {
          nazwa: "Potęgi liczb 0, 1 i 10",
          slownie: "Zero i jedynka w każdej potędze zostają takie same. Potęga liczby $10$ to jedynka z zerami: tyle zer, ile wynosi wykładnik.",
          tex: "1^3=1\\qquad 10^2=100\\qquad 10^3=1000",
          przyklad: "$0^2 = 0 \\cdot 0 = 0$. $1^3 = 1 \\cdot 1 \\cdot 1 = 1$. $10^2 = 100$, a $10^3 = 1000$.",
          uwaga: "$10^2$ to nie $20$. To $10 \\cdot 10 = 100$.",
        },
        {
          nazwa: "Kwadraty i sześciany do zapamiętania",
          slownie: "Warto znać na pamięć kwadraty liczb od $1$ do $10$ oraz kilka sześcianów.",
          przyklad: "Kwadraty: $1$, $4$, $9$, $16$, $25$, $36$, $49$, $64$, $81$, $100$. Sześciany liczb $1$, $2$, $3$, $4$, $5$, $10$: $1$, $8$, $27$, $64$, $125$, $1000$.",
          uwaga: "Liczba $64$ jest i kwadratem ($8^2$), i sześcianem ($4^3$). Patrz, o którą potęgę pytają.",
        },
      ],
      jak: [
        "Znajdź podstawę (duża liczba) i wykładnik (mały numerek u góry).",
        "Zapisz mnożenie: przy wykładniku $2$ dwie takie same liczby, przy wykładniku $3$ trzy takie same liczby.",
        "Mnóż po kolei. Przy trzeciej potędze najpierw pierwsze dwie liczby, potem wynik razy trzecia.",
        "Sprawdź, czy podstawa nie została pomnożona przez wykładnik: $4^3$ to $64$, a nie $12$.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Oblicz $6^2$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$36$", "$12$", "$8$", "$216$"],
          poprawna: 0,
        },
        {
          nr: "16",
          tresc: "Oblicz $3^3$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$27$", "$9$", "$81$"],
          poprawna: 1,
        },
        {
          nr: "17",
          tresc: "Iloczyn $4 \\cdot 4 \\cdot 4$ zapisujemy w postaci potęgi. Jak? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3^4$", "$4 \\cdot 3$", "$4^3$", "$4^2$"],
          poprawna: 2,
        },
        {
          nr: "18",
          tresc: "Rozważamy potęgę $5^3$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Liczba $5$ jest podstawą tej potęgi.", litery: "PF", poprawna: 0 },
            { tekst: "$5^3 = 15$", litery: "PF", poprawna: 1 },
            { tekst: "$5^3 = 125$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "19",
          tresc: "Która z liczb jest największa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2^3$", "$3^2$", "$10$", "$4^2$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Pan Adam układa kwadrat z płytek: $9$ rzędów po $9$ płytek. Ile płytek potrzebuje? Ile płytek potrzeba na kwadrat, w którym jest $10$ rzędów po $10$ płytek? O ile więcej? Zapisz obliczenia za pomocą potęg. **Zapisz obliczenia.**",
          rozwiazanie: "Mniejszy kwadrat: $9^2 = 9 \\cdot 9 = 81$ płytek.\n\nWiększy kwadrat: $10^2 = 10 \\cdot 10 = 100$ płytek.\n\nRóżnica: $100 - 81 = 19$.\n\nOdpowiedź: Na mniejszy kwadrat potrzeba $81$ płytek, na większy $100$ płytek, czyli o $19$ więcej.",
        },
        {
          nr: "21",
          punkty: 2,
          tresc: "Kostka zbudowana z klocków ma $4$ klocki w długość, $4$ klocki w szerokość i $4$ klocki w wysokość. Ile klocków ma ta kostka? Ile klocków potrzeba na dwie takie kostki? **Zapisz obliczenia.**",
          rozwiazanie: "Jedna kostka: $4^3 = 4 \\cdot 4 \\cdot 4$. Najpierw $4 \\cdot 4 = 16$, potem $16 \\cdot 4 = 64$.\n\nDwie kostki: $2 \\cdot 64 = 128$.\n\nOdpowiedź: Jedna kostka ma $64$ klocki, a dwie kostki to $128$ klocków.",
        },
      ],
      generatory: [
        {
          id: "potega-oblicz",
          nazwa: "Oblicz potęgę",
          opis: "Oblicz drugą albo trzecią potęgę liczby, także potęgę liczby $10$.",
          generuj(r) {
            const rodzaj = r.pick(["kw", "kw", "szes", "szes", "dziesiec"]);
            if (rodzaj === "kw") {
              const a = r.int(2, 10);
              const w = a * a;
              const tresc = r.pick([`Oblicz $${a}^2$.`, `Oblicz drugą potęgę liczby $${a}$.`, `Podnieś liczbę $${a}$ do kwadratu.`]);
              return {
                tresc,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w },
                wynik: `$${w}$`,
                rozwiazanie: [`Druga potęga to liczba pomnożona przez siebie: $${a}^2 = ${a} \\cdot ${a}$.`, `$${a} \\cdot ${a} = ${w}$.`],
              };
            }
            if (rodzaj === "szes") {
              const a = r.int(2, 6);
              const w = a * a * a;
              const tresc = r.pick([`Oblicz $${a}^3$.`, `Oblicz trzecią potęgę liczby $${a}$.`, `Podnieś liczbę $${a}$ do sześcianu.`]);
              return {
                tresc,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Trzecia potęga to liczba pomnożona trzy razy: $${a}^3 = ${a} \\cdot ${a} \\cdot ${a}$.`,
                  `Najpierw $${a} \\cdot ${a} = ${a * a}$.`,
                  `Potem $${a * a} \\cdot ${a} = ${w}$.`,
                ],
              };
            }
            const k = r.int(2, 3);
            const w = 10 ** k;
            const iloczyn = k === 2 ? "10 \\cdot 10" : "10 \\cdot 10 \\cdot 10";
            return {
              tresc: `Oblicz $10^${k}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w },
              wynik: `$${w}$`,
              rozwiazanie: [`Potęga liczby $10$ to jedynka z zerami. Zapisujemy: $10^${k} = ${iloczyn}$.`, `$10^${k} = ${w}$.`],
            };
          },
        },
        {
          id: "potega-dzialania",
          nazwa: "Potęgi w działaniach",
          opis: "Oblicz sumę, różnicę albo iloczyn z potęgami, albo znajdź liczbę, której kwadrat jest podany.",
          generuj(r) {
            const tryb = r.int(0, 4);
            if (tryb === 0) {
              const a = r.int(1, 9), b = r.int(1, 9);
              const w = a * a + b * b;
              return {
                tresc: `Oblicz $${a}^2 + ${b}^2$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w },
                wynik: `$${w}$`,
                rozwiazanie: [`Najpierw potęgi: $${a}^2 = ${a * a}$ oraz $${b}^2 = ${b * b}$.`, `Potem dodawanie: $${a * a} + ${b * b} = ${w}$.`],
              };
            }
            if (tryb === 1) {
              const a = r.int(3, 10), b = r.int(1, a - 1);
              const w = a * a - b * b;
              return {
                tresc: `Oblicz $${a}^2 - ${b}^2$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w },
                wynik: `$${w}$`,
                rozwiazanie: [`Najpierw potęgi: $${a}^2 = ${a * a}$ oraz $${b}^2 = ${b * b}$.`, `Potem odejmowanie: $${a * a} - ${b * b} = ${w}$.`],
              };
            }
            if (tryb === 2) {
              const a = r.int(2, 4), b = r.int(2, 9);
              const w = a * a * a + b * b;
              return {
                tresc: `Oblicz $${a}^3 + ${b}^2$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Najpierw potęgi: $${a}^3 = ${a} \\cdot ${a} \\cdot ${a} = ${a * a * a}$ oraz $${b}^2 = ${b * b}$.`,
                  `Potem dodawanie: $${a * a * a} + ${b * b} = ${w}$.`,
                ],
              };
            }
            if (tryb === 3) {
              const c = r.int(2, 5), a = r.int(2, 6);
              const w = c * a * a;
              return {
                tresc: `Oblicz $${c} \\cdot ${a}^2$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w },
                wynik: `$${w}$`,
                rozwiazanie: [`Najpierw potęga: $${a}^2 = ${a * a}$.`, `Potem mnożenie: $${c} \\cdot ${a * a} = ${w}$.`],
              };
            }
            const a = r.int(2, 10);
            const P = a * a;
            return {
              tresc: r.pick([`Jaka liczba pomnożona przez siebie daje $${P}$?`, `Jaka liczba spełnia równość $\\square^2 = ${P}$?`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba" }],
              odpowiedz: { w: a },
              wynik: `$${a}$`,
              rozwiazanie: [`Szukamy liczby, której druga potęga jest równa $${P}$. Sprawdzamy kwadraty kolejnych liczb.`, `$${a}^2 = ${a} \\cdot ${a} = ${P}$, więc szukana liczba to $${a}$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4. Kolejność wykonywania działań
    {
      id: "kolejnosc-dzialan",
      nazwa: "Kolejność wykonywania działań",
      sciaga: [
        {
          nazwa: "Kolejność działań",
          slownie: "Gdy w jednym wyrażeniu jest kilka działań, liczymy w stałej kolejności: najpierw nawiasy, potem potęgi, potem mnożenie i dzielenie, a na końcu dodawanie i odejmowanie.",
          tex: "\\text{1. nawiasy}\\qquad\\text{2. potęgi}\\qquad\\text{3. mnożenie, dzielenie}\\qquad\\text{4. dodawanie, odejmowanie}",
          przyklad: "$2 + (7 - 3) \\cdot 2^2$. Nawias: $7 - 3 = 4$. Potęga: $2^2 = 4$. Mnożenie: $4 \\cdot 4 = 16$. Dodawanie: $2 + 16 = 18$.",
          uwaga: "Mnożenie i dzielenie są równorzędne, tak samo dodawanie i odejmowanie. Wśród nich liczymy od lewej do prawej.",
        },
        {
          nazwa: "Mnożenie przed dodawaniem",
          slownie: "Mnożenie i dzielenie liczymy wcześniej niż dodawanie i odejmowanie.",
          tex: "3+4\\cdot 5=3+20=23",
          przyklad: "$10 - 2 \\cdot 4 = 10 - 8 = 2$. Najpierw $2 \\cdot 4 = 8$, potem odejmujemy.",
          uwaga: "Nie liczymy po prostu od lewej do prawej. Wtedy $3 + 4 \\cdot 5$ dałoby $7 \\cdot 5 = 35$, a poprawny wynik to $23$.",
        },
        {
          nazwa: "Od lewej do prawej",
          slownie: "Gdy są same dodawania i odejmowania albo same mnożenia i dzielenia, liczymy po kolei od lewej do prawej.",
          tex: "20-8+3=12+3=15\\qquad 24:6\\cdot 2=4\\cdot 2=8",
          przyklad: "$20 - 8 + 3$: najpierw $20 - 8 = 12$, potem $12 + 3 = 15$. $24 : 6 \\cdot 2$: najpierw $24 : 6 = 4$, potem $4 \\cdot 2 = 8$.",
          uwaga: "Nie wolno zacząć od prawej strony. $20 - 8 + 3 = 15$, a nie $20 - 11 = 9$.",
        },
        {
          nazwa: "Nawiasy",
          slownie: "To, co jest w nawiasie, liczymy jako pierwsze. Nawias może zmienić kolejność działań.",
          tex: "(3+4)\\cdot 5=7\\cdot 5=35",
          przyklad: "$18 : (2 + 1) = 18 : 3 = 6$. A bez nawiasu: $18 : 2 + 1 = 9 + 1 = 10$.",
          uwaga: "Nawias nie znika. Najpierw policz w nawiasie, a dopiero potem mnóż albo dziel.",
        },
        {
          nazwa: "Potęgi w wyrażeniu",
          slownie: "Potęgi liczymy przed mnożeniem i dzieleniem. Jeśli potęgujemy nawias, najpierw liczymy w nawiasie.",
          tex: "2+3^2=2+9=11\\qquad (2+3)^2=5^2=25",
          przyklad: "$2 \\cdot 3^2 = 2 \\cdot 9 = 18$. Najpierw potęga $3^2 = 9$, potem mnożenie.",
          uwaga: "Potęga dotyczy tylko liczby tuż przed wykładnikiem. W $2 \\cdot 3^2$ podnosimy do kwadratu liczbę $3$, a nie $6$.",
        },
      ],
      jak: [
        "Przeczytaj całe wyrażenie i zaznacz w myślach nawiasy, potęgi, mnożenia i dzielenia.",
        "Policz najpierw nawiasy, potem potęgi.",
        "Policz mnożenia i dzielenia od lewej do prawej, a na końcu dodawania i odejmowania, także od lewej do prawej.",
        "Zapisuj wyrażenie po każdym kroku, tak żeby zostawało coraz krótsze.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Oblicz $4 + 6 \\cdot 3$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$30$", "$22$", "$13$", "$18$"],
          poprawna: 1,
        },
        {
          nr: "23",
          tresc: "Oblicz $36 : 6 \\cdot 2$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$6$", "$12$", "$24$"],
          poprawna: 2,
        },
        {
          nr: "24",
          tresc: "Oblicz $(14 - 4) \\cdot 3$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$30$", "$2$", "$13$", "$42$"],
          poprawna: 0,
        },
        {
          nr: "25",
          tresc: "Oblicz $2 \\cdot 3^2$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$36$", "$12$", "$8$", "$18$"],
          poprawna: 3,
        },
        {
          nr: "26",
          tresc: "Sprawdzamy obliczenia. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$8 + 2 \\cdot 5 = 18$", litery: "PF", poprawna: 0 },
            { tekst: "$20 - 6 + 4 = 10$", litery: "PF", poprawna: 1 },
            { tekst: "$2 + 3^2 = 11$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Ania kupiła $3$ bułki po $2$ zł i $2$ jogurty po $4$ zł. Zapłaciła banknotem $20$ zł. Ile reszty dostała? Zapisz jedno wyrażenie z nawiasem i oblicz jego wartość. **Zapisz obliczenia.**",
          rozwiazanie: "Za zakupy zapłaciła $3 \\cdot 2 + 2 \\cdot 4$ zł, a reszta to $20$ zł minus ta kwota. Zapisujemy: $20 - (3 \\cdot 2 + 2 \\cdot 4)$.\n\nNajpierw nawias. W nawiasie najpierw mnożenia: $3 \\cdot 2 = 6$ oraz $2 \\cdot 4 = 8$. Potem $6 + 8 = 14$.\n\nNa końcu odejmowanie: $20 - 14 = 6$.\n\nOdpowiedź: Ania dostała $6$ zł reszty.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "Oblicz wartości wyrażeń i zapisz kolejne kroki: $48 : 6 + 2 \\cdot 5$, $3 + (20 - 8) : 4$ oraz $2^3 + 3^2$. **Zapisz obliczenia.**",
          rozwiazanie: "Pierwsze wyrażenie: najpierw dzielenie i mnożenie, $48 : 6 = 8$ oraz $2 \\cdot 5 = 10$. Potem dodawanie: $8 + 10 = 18$.\n\nDrugie wyrażenie: najpierw nawias, $20 - 8 = 12$. Potem dzielenie, $12 : 4 = 3$. Na końcu dodawanie: $3 + 3 = 6$.\n\nTrzecie wyrażenie: najpierw potęgi, $2^3 = 8$ oraz $3^2 = 9$. Potem dodawanie: $8 + 9 = 17$.\n\nOdpowiedź: Wartości wyrażeń to $18$, $6$ i $17$.",
        },
      ],
      generatory: [
        {
          id: "kolejnosc-proste",
          nazwa: "Kolejność działań",
          opis: "Oblicz wyrażenie z dodawaniem, odejmowaniem, mnożeniem i dzieleniem bez nawiasów.",
          generuj(r) {
            const w = r.pick(SZABLONY_PROSTE)(r);
            return {
              tresc: r.pick(TRESCI_WYRAZENIA)(w.tex),
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w: w.wynik },
              wynik: `$${w.wynik}$`,
              rozwiazanie: w.kroki,
            };
          },
        },
        {
          id: "kolejnosc-nawias-potega",
          nazwa: "Nawiasy i potęgi",
          opis: "Oblicz wyrażenie z nawiasem albo z drugą lub trzecią potęgą.",
          generuj(r) {
            const w = r.pick(SZABLONY_NAWIAS)(r);
            return {
              tresc: r.pick(TRESCI_WYRAZENIA)(w.tex),
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w: w.wynik },
              wynik: `$${w.wynik}$`,
              rozwiazanie: w.kroki,
            };
          },
        },
      ],
    },
  ],
};
