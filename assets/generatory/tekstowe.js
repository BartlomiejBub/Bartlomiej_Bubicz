// Generatory zadań z działu „Zadania z treścią” (matura podstawowa, formuła 2023): ruch i wspólna praca, procenty i pieniądze,
// równania i układy równań z treści, ciągi w praktyce. Kontrakt zadania i narzędzia: zob. wspolne.js.
// Każde zadanie budujemy od końca – z ładnych liczb, tak by odpowiedzi były całkowite albo proste (pieniądze co do grosza).
import { Q, q } from "./wspolne.js";

// --- Drobne pomocnicze

const nwd = (a, b) => (b ? nwd(b, a % b) : Math.abs(a));
const nww = (a, b) => (a / nwd(a, b)) * b;

/** Liczba do tekstu z przecinkiem dziesiętnym: 7,5 -> "7{,}5" (min – najmniej miejsc po przecinku). Tysiące rozdzielone, gdy ≥ 10 000. */
function dz(x, min = 0) {
  const v = Q.z(x);
  for (let k = min; k <= 4; k++) {
    const m = v.mul(10 ** k);
    if (m.calkowita) {
      const cyfry = String(Math.abs(m.n)).padStart(k + 1, "0");
      let calosc = k ? cyfry.slice(0, -k) : cyfry;
      if (calosc.length >= 5) calosc = calosc.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
      return `${v.ujemna ? "-" : ""}${calosc}${k ? `{,}${cyfry.slice(-k)}` : ""}`;
    }
  }
  return v.tex();
}

/** Kwota w złotych: całe złote bez przecinka, w przeciwnym razie z groszami ("1102{,}50"). */
const zl = (x) => dz(x, Q.z(x).calkowita ? 0 : 2);

/** Odmiana rzeczownika po liczebniku: lm(3, ["rok", "lata", "lat"]). */
function lm(n, [jedna, kilka, wiele]) {
  if (n === 1) return jedna;
  const j = n % 10, d = n % 100;
  return j >= 2 && j <= 4 && !(d >= 12 && d <= 14) ? kilka : wiele;
}

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });
const zad = (tresc, pola, odpowiedz, wynik, rozwiazanie) => ({ tresc, pola, odpowiedz, wynik, rozwiazanie });

// --- 1. Średnia prędkość

const JAZDA = [
  {
    smin: 100, smax: 360, pary: [[60, 40], [60, 30], [90, 45], [40, 24], [80, 48], [45, 30], [56, 42], [50, 30], [90, 60]],
    osoby: [["Pan Tomasz", true], ["Pani Ewa", false], ["Pan Krzysztof", true], ["Pani Marta", false]],
    dojazd: (m) => `${m ? "pojechał" : "pojechała"} samochodem z miasta A do miasta B, odległego o`,
    tam: (m) => (m ? "jechał" : "jechała"), cala: (m) => `${m ? "przejechał" : "przejechała"} samochodem trasę o długości`,
  },
  {
    smin: 12, smax: 60, pary: [[30, 20], [20, 12], [24, 8], [15, 10], [24, 12]],
    osoby: [["Kuba", true], ["Ania", false], ["Michał", true], ["Kasia", false]],
    dojazd: (m) => `${m ? "pojechał" : "pojechała"} rowerem z domu nad jezioro, odległe o`,
    tam: (m) => (m ? "jechał" : "jechała"), cala: (m) => `${m ? "przejechał" : "przejechała"} rowerem trasę o długości`,
  },
  {
    smin: 6, smax: 12, pary: [[6, 3], [6, 4]],
    osoby: [["Marek", true], ["Ola", false]],
    dojazd: (m) => `${m ? "poszedł" : "poszła"} z domu do schroniska, odległego o`,
    tam: (m) => (m ? "szedł" : "szła"), cala: (m) => `${m ? "przeszedł" : "przeszła"} trasę o długości`,
  },
];

function sredniaPredkosc(r) {
  const g = r.pick(JAZDA);
  const para = r.pick(g.pary);
  const [v1, v2] = r.chance(0.5) ? para : [para[1], para[0]];
  const l = nww(v1, v2);
  const mMin = Math.max(1, Math.ceil(g.smin / l));
  const mMax = Math.max(mMin, Math.floor(g.smax / l));
  const s = l * r.int(mMin, mMax);   // droga w jedną stronę (albo połowa trasy)
  const [imie, m] = r.pick(g.osoby);
  const polowy = r.chance(0.4);
  const t1 = q(s, v1), t2 = q(s, v2), T = t1.add(t2), vsr = q(2 * s).div(T);
  const tresc = polowy
    ? `${imie} ${g.cala(m)} $${2 * s}$ km. Pierwszą połowę trasy ${g.tam(m)} ze średnią prędkością $${v1}$ km/h, a drugą połowę – ze średnią prędkością $${v2}$ km/h. Oblicz średnią prędkość na całej trasie oraz czas całej podróży (bez postojów).`
    : `${imie} ${g.dojazd(m)} $${s}$ km. Tam ${g.tam(m)} ze średnią prędkością $${v1}$ km/h, a z powrotem tą samą drogą – ze średnią prędkością $${v2}$ km/h. Oblicz średnią prędkość na całej trasie (tam i z powrotem) oraz czas całej podróży (bez postojów).`;
  const rozwiazanie = [
    polowy
      ? `Połowa trasy to $${s}$ km. Czas na pierwszej połowie: $t_1 = \\frac{s}{v} = \\frac{${s}}{${v1}} = ${dz(t1)}$ h.`
      : `Czas jazdy tam: $t_1 = \\frac{s}{v} = \\frac{${s}}{${v1}} = ${dz(t1)}$ h.`,
    `Czas na drugiej części drogi: $t_2 = \\frac{${s}}{${v2}} = ${dz(t2)}$ h.`,
    `Cała droga: $${s} + ${s} = ${2 * s}$ km. Cały czas: $${dz(t1)} + ${dz(t2)} = ${dz(T)}$ h.`,
    `Średnia prędkość to cała droga podzielona przez cały czas: $v_{\\text{śr}} = \\frac{${2 * s}}{${dz(T)}} = ${dz(vsr)}$ km/h.`,
    `Zwróć uwagę: średnia arytmetyczna prędkości to $\\frac{${v1} + ${v2}}{2} = ${dz(q(v1 + v2, 2))}$ km/h – to inna liczba, bo więcej czasu spędzono na wolniejszej części drogi.`,
  ];
  return zad(
    tresc,
    [pole("v", "Średnia prędkość (w km/h)"), pole("t", "Czas całej podróży (w godzinach)")],
    { v: vsr, t: T },
    `Średnia prędkość: $${dz(vsr)}$ km/h, czas podróży: $${dz(T)}$ h`,
    rozwiazanie,
  );
}

// --- 2. Wspólna praca

const PARY_PRACY = [[6, 3], [12, 4], [10, 15], [20, 5], [30, 20], [6, 12], [12, 24], [18, 9], [30, 15], [24, 8], [40, 10], [21, 28], [14, 35], [45, 90], [60, 20], [36, 18]];
const PARY_OTWARTE = [[3, 6], [4, 12], [10, 15], [6, 12], [8, 24], [4, 6], [6, 9], [12, 24], [9, 18], [5, 10]];   // napełnianie i odpływ

const PRACE = [
  {
    jedn: "godzin", wstep: "", a: "Pierwsza pompa", b: "druga", czyn: "napełnia pusty basen",
    razem: (t) => `Obie pompy włączone jednocześnie napełniają ten basen w ciągu $${t}$ godzin.`,
    pytRazem: "W ciągu ilu godzin napełnią basen obie pompy pracujące jednocześnie?",
    pytDruga: "W ciągu ilu godzin napełniłaby ten basen sama druga pompa?",
  },
  {
    jedn: "godzin", wstep: "Pracując samodzielnie, ", a: "pierwszy malarz", b: "drugi", czyn: "maluje cały pokój",
    razem: (t) => `Pracując razem, malarze malują ten pokój w ciągu $${t}$ godzin.`,
    pytRazem: "W ciągu ilu godzin pomalują pokój, pracując razem?",
    pytDruga: "W ciągu ilu godzin cały pokój pomalowałby sam drugi malarz?",
  },
  {
    jedn: "godzin", wstep: "", a: "Pierwsza drukarka", b: "druga", czyn: "drukuje cały nakład książki",
    razem: (t) => `Obie drukarki pracujące jednocześnie drukują ten nakład w ciągu $${t}$ godzin.`,
    pytRazem: "W ciągu ilu godzin wydrukują cały nakład, pracując jednocześnie?",
    pytDruga: "W ciągu ilu godzin cały nakład wydrukowałaby sama druga drukarka?",
  },
  {
    jedn: "dni", wstep: "", a: "Pierwsza brygada", b: "druga", czyn: "układa chodnik na całej ulicy",
    razem: (t) => `Obie brygady pracujące razem układają ten chodnik w ciągu $${t}$ dni.`,
    pytRazem: "W ciągu ilu dni ułożą chodnik, pracując razem?",
    pytDruga: "W ciągu ilu dni chodnik ułożyłaby sama druga brygada?",
  },
];

const cap = (s) => s[0].toUpperCase() + s.slice(1);
const podmiot = (c) => (c.wstep ? c.a : cap(c.a));

function wspolnaPraca(r) {
  const wariant = r.int(0, 2);
  const c = r.pick(PRACE);
  if (wariant === 2) {
    const [a, b] = r.pick(PARY_OTWARTE);   // wlew napełnia w a godzin, odpływ opróżnia w b godzin (a < b)
    const T = q(a * b, b - a);
    return zad(
      `Pusty basen napełnia się samą rurą dopływową w ciągu $${a}$ godzin. Pełny basen opróżnia się samą rurą odpływową w ciągu $${b}$ godzin. W ciągu ilu godzin napełni się pusty basen, jeśli jednocześnie otworzymy obie rury?`,
      [pole("t", "Czas napełniania basenu (w godzinach)")],
      { t: T },
      `$${dz(T)}$ godz.`,
      [
        `W ciągu $1$ godziny rura dopływowa napełnia $\\frac{1}{${a}}$ basenu, a odpływowa opróżnia $\\frac{1}{${b}}$ basenu.`,
        `Gdy obie są otwarte, w ciągu godziny przybywa $\\frac{1}{${a}} - \\frac{1}{${b}} = \\frac{${b} - ${a}}{${a * b}} = ${q(b - a, a * b).tex()}$ basenu.`,
        `Cały basen to $1$, więc czas: $1 : ${q(b - a, a * b).tex()} = ${dz(T)}$ godz.`,
      ],
    );
  }
  const [x, y] = r.pick(PARY_PRACY);
  const [t1, t2] = r.chance(0.5) ? [x, y] : [y, x];
  const T = q(t1 * t2, t1 + t2);
  if (wariant === 0) {
    return zad(
      `${c.wstep}${podmiot(c)} ${c.czyn} w ciągu $${t1}$ ${c.jedn}, a ${c.b} – w ciągu $${t2}$ ${c.jedn}. ${c.pytRazem}`,
      [pole("t", `Czas pracy razem (w ${c.jedn === "dni" ? "dniach" : "godzinach"})`)],
      { t: T },
      `$${dz(T)}$ ${c.jedn === "dni" ? "dni" : "godz."}`,
      [
        `W ciągu $1$ ${c.jedn === "dni" ? "dnia" : "godziny"} pierwszy wykonuje $\\frac{1}{${t1}}$ pracy, a drugi $\\frac{1}{${t2}}$ pracy.`,
        `Razem w ciągu ${c.jedn === "dni" ? "dnia" : "godziny"}: $\\frac{1}{${t1}} + \\frac{1}{${t2}} = \\frac{${t2} + ${t1}}{${t1 * t2}} = ${q(t1 + t2, t1 * t2).tex()}$ pracy.`,
        `Cała praca to $1$, więc czas: $1 : ${q(t1 + t2, t1 * t2).tex()} = ${dz(T)}$ ${c.jedn === "dni" ? "dnia" : "godziny"}.`,
      ],
    );
  }
  // Znamy czas jednego i czas razem – szukamy czasu drugiego.
  return zad(
    `${c.wstep}${podmiot(c)} ${c.czyn} w ciągu $${t1}$ ${c.jedn}. ${c.razem(dz(T))} ${c.pytDruga}`,
    [pole("t", `Czas pracy drugiego (w ${c.jedn === "dni" ? "dniach" : "godzinach"})`)],
    { t: q(t2) },
    `$${t2}$ ${c.jedn === "dni" ? "dni" : "godz."}`,
    [
      `W ciągu $1$ ${c.jedn === "dni" ? "dnia" : "godziny"} pierwszy wykonuje $\\frac{1}{${t1}}$ pracy, a razem wykonują $${q(1).div(T).tex()}$ pracy.`,
      `Na drugiego zostaje: $${q(1).div(T).tex()} - \\frac{1}{${t1}} = ${q(1).div(T).sub(q(1, t1)).tex()}$ pracy w ciągu ${c.jedn === "dni" ? "dnia" : "godziny"}.`,
      `Cała praca to $1$, więc drugi potrzebuje: $1 : ${q(1).div(T).sub(q(1, t1)).tex()} = ${t2}$ ${c.jedn === "dni" ? "dni" : "godz."}`,
    ],
  );
}

// --- 3. Procenty: zmiany ceny, cena przed zmianą, VAT, punkty procentowe

const RZECZY = [
  ["kurtki", [120, 150, 160, 200, 240, 250, 300]], ["roweru", [400, 500, 600, 800]], ["plecaka", [80, 100, 120, 150, 160, 200]],
  ["telewizora", [800, 1000, 1200, 1500, 2000]], ["laptopa", [2000, 2400, 2500, 3000, 4000]],
];
const PRZEDMIOTY = [
  ["sweter", [60, 80, 100, 120, 150]], ["rower", [400, 500, 600, 800]], ["plecak", [80, 100, 120, 150, 200]],
  ["zegarek", [100, 150, 200, 250, 300, 400]], ["telewizor", [800, 1000, 1200, 1500, 2000]],
];

const op = (c) => (c > 0 ? `podwyższono o $${c}\\%$` : `obniżono o $${-c}\\%$`);

function zmianyCeny(r) {
  const ZM = [10, 20, 25, 30, 40, 50];
  for (let i = 0; i < 200; i++) {
    const c1 = r.pick(ZM) * r.znak(), c2 = r.pick(ZM) * r.znak();
    const [rzecz, ceny] = r.pick(RZECZY);
    const C = r.pick(ceny);
    const f1 = q(100 + c1, 100), f2 = q(100 + c2, 100), f = f1.mul(f2);
    const koniec = q(C).mul(f), zmiana = f.sub(1).mul(100);
    if (koniec.mul(100).calkowita === false || koniec.d > 4 || zmiana.d > 2 || zmiana.zero) continue;
    const po1 = q(C).mul(f1);
    return zad(
      `Cena ${rzecz} wynosiła $${C}$ zł. Najpierw tę cenę ${op(c1)}, a następnie nową cenę ${op(c2)}. Ile złotych wynosi cena ${rzecz} po obu zmianach? O ile procent cena końcowa różni się od ceny początkowej?`,
      [pole("c", "Cena końcowa (w zł)"), pole("p", "Zmiana ceny w procentach (liczba ujemna, jeśli cena spadła)")],
      { c: koniec, p: zmiana },
      `Cena końcowa: $${zl(koniec)}$ zł, zmiana: $${dz(zmiana)}\\%$`,
      [
        `Po pierwszej zmianie cena to $${100 + c1}\\%$ ceny początkowej: $${C} \\cdot ${dz(f1)} = ${zl(po1)}$ zł.`,
        `Po drugiej zmianie to $${100 + c2}\\%$ tej ceny: $${zl(po1)} \\cdot ${dz(f2)} = ${zl(koniec)}$ zł.`,
        `Cena końcowa to $${dz(f1)} \\cdot ${dz(f2)} = ${dz(f, 2)}$ ceny początkowej, czyli $${dz(f.mul(100))}\\%$. Cena zmieniła się o $${dz(f.mul(100))}\\% - 100\\% = ${dz(zmiana)}\\%$.`,
        `Procentów z dwóch zmian nie wolno po prostu dodawać ani odejmować – każda zmiana liczy się od innej ceny.`,
      ],
    );
  }
  throw new Error("zmianyCeny: brak ładnych liczb");
}

function cenaPrzedZmiana(r) {
  const spadek = r.chance(0.5);
  const p = r.pick(spadek ? [10, 20, 25, 30, 40, 50] : [10, 20, 25, 50]);
  const [rzecz, ceny] = r.pick(PRZEDMIOTY);
  const C = r.pick(ceny);
  const X = q(C).mul(q(spadek ? 100 - p : 100 + p, 100)), roznica = q(C * p, 100);
  return zad(
    spadek
      ? `Po obniżce ceny o $${p}\\%$ ${rzecz} kosztuje $${zl(X)}$ zł. Ile kosztował ${rzecz} przed obniżką? Ile złotych wynosiła obniżka?`
      : `Po podwyżce ceny o $${p}\\%$ ${rzecz} kosztuje $${zl(X)}$ zł. Ile kosztował ${rzecz} przed podwyżką? Ile złotych wynosiła podwyżka?`,
    [pole("c", spadek ? "Cena przed obniżką (w zł)" : "Cena przed podwyżką (w zł)"), pole("d", spadek ? "Obniżka (w zł)" : "Podwyżka (w zł)")],
    { c: q(C), d: roznica },
    `Cena przed zmianą: $${C}$ zł, ${spadek ? "obniżka" : "podwyżka"}: $${zl(roznica)}$ zł`,
    [
      `Niech $x$ to cena przed ${spadek ? "obniżką" : "podwyżką"}. Po zmianie cena to $${100 + (spadek ? -p : p)}\\%$ ceny $x$, czyli $${dz(q(spadek ? 100 - p : 100 + p, 100))} \\cdot x$.`,
      `Równanie: $${dz(q(spadek ? 100 - p : 100 + p, 100))} \\cdot x = ${zl(X)}$, więc $x = ${zl(X)} : ${dz(q(spadek ? 100 - p : 100 + p, 100))} = ${C}$ zł.`,
      `${spadek ? "Obniżka" : "Podwyżka"}: $${p}\\%$ ceny pierwotnej, czyli $${dz(q(p, 100))} \\cdot ${C} = ${zl(roznica)}$ zł. Sprawdzenie: $${C} ${spadek ? "-" : "+"} ${zl(roznica)} = ${zl(X)}$ zł – zgadza się z treścią.`,
    ],
  );
}

function vat(r) {
  const stawka = r.pick([23, 23, 8]);
  if (r.chance(0.5)) {
    const N = 50 * r.int(6, 60);
    const B = q(N * (100 + stawka), 100), V = q(N * stawka, 100);
    const rzecz = r.pick(["Cena netto monitora", "Cena netto drukarki", "Cena netto krzesła biurowego", "Cena netto zestawu słuchawkowego"]);
    return zad(
      `${rzecz} wynosi $${N}$ zł. Do ceny netto doliczany jest podatek VAT w wysokości $${stawka}\\%$. Oblicz cenę brutto i kwotę podatku VAT.`,
      [pole("b", "Cena brutto (w zł)"), pole("v", "Kwota VAT (w zł)")],
      { b: B, v: V },
      `Cena brutto: $${zl(B)}$ zł, VAT: $${zl(V)}$ zł`,
      [
        `VAT to $${stawka}\\%$ ceny netto: $${dz(q(stawka, 100))} \\cdot ${N} = ${zl(V)}$ zł.`,
        `Cena brutto to cena netto plus VAT: $${N} + ${zl(V)} = ${zl(B)}$ zł (to samo co $${dz(q(100 + stawka, 100))} \\cdot ${N}$).`,
      ],
    );
  }
  const [rzecz, kMin, kMax] = r.pick([["Cena brutto rowerka dziecięcego", 2, 6], ["Cena brutto odkurzacza", 2, 8], ["Cena brutto fotela", 2, 10], ["Cena brutto czajnika", 1, 4]]);
  const k = r.int(kMin, kMax);
  const B = (100 + stawka) * k;
  return zad(
    `${rzecz} wynosi $${B}$ zł i zawiera podatek VAT w wysokości $${stawka}\\%$ ceny netto. Oblicz cenę netto oraz kwotę podatku VAT.`,
    [pole("n", "Cena netto (w zł)"), pole("v", "Kwota VAT (w zł)")],
    { n: q(100 * k), v: q(stawka * k) },
    `Cena netto: $${100 * k}$ zł, VAT: $${stawka * k}$ zł`,
    [
      `Niech $x$ to cena netto. Cena brutto to $${100 + stawka}\\%$ ceny netto, czyli $${dz(q(100 + stawka, 100))} \\cdot x = ${B}$.`,
      `Stąd $x = ${B} : ${dz(q(100 + stawka, 100))} = ${100 * k}$ zł.`,
      `VAT to różnica: $${B} - ${100 * k} = ${stawka * k}$ zł. Sprawdzenie: $${stawka}\\%$ z $${100 * k}$ to $${stawka * k}$ – zgadza się.`,
    ],
  );
}

function punktyProcentowe(r) {
  const wzrost = r.chance(0.5);
  const [a, b] = wzrost
    ? r.pick([[2, 3], [4, 5], [4, 6], [5, 6], [10, 12], [8, 10], [5, 8], [20, 25], [4, 7], [3, 6], [2, 5], [10, 15]])
    : r.pick([[4, 3], [5, 4], [10, 8], [8, 6], [20, 15], [10, 5], [6, 3], [5, 2]]);
  const pp = Math.abs(b - a), procent = q(100 * pp, a);
  const kontekst = r.pick([
    (x, y) => `Stopa bezrobocia w pewnym powiecie ${wzrost ? "wzrosła" : "spadła"} z $${x}\\%$ do $${y}\\%$.`,
    (x, y) => `Oprocentowanie kredytu ${wzrost ? "wzrosło" : "spadło"} z $${x}\\%$ do $${y}\\%$ w skali roku.`,
    (x, y) => `Odsetek uczniów dojeżdżających do szkoły rowerem ${wzrost ? "wzrósł" : "spadł"} z $${x}\\%$ do $${y}\\%$.`,
  ]);
  return zad(
    `${kontekst(a, b)} O ile punktów procentowych ${wzrost ? "wzrosła" : "spadła"} ta wielkość? O ile procent ${wzrost ? "wzrosła" : "spadła"} ona w stosunku do wartości początkowej ($${a}\\%$)?`,
    [pole("pp", "Zmiana w punktach procentowych"), pole("p", `${wzrost ? "Wzrost" : "Spadek"} w procentach`)],
    { pp: q(pp), p: procent },
    `$${pp}$ ${lm(pp, ["punkt procentowy", "punkty procentowe", "punktów procentowych"])}, czyli o $${dz(procent)}\\%$`,
    [
      `Różnica w punktach procentowych to po prostu różnica liczb: $${Math.max(a, b)} - ${Math.min(a, b)} = ${pp}$.`,
      `Zmiana w procentach to zmiana podzielona przez wartość początkową: $\\frac{${pp}}{${a}} = ${dz(q(pp, a), 2)}$, czyli $${dz(procent)}\\%$.`,
      `Punkty procentowe i procenty to dwie różne miary – nie myl ich ze sobą.`,
    ],
  );
}

function procenty(r) {
  const w = r.int(0, 5);
  if (w <= 1) return zmianyCeny(r);
  if (w === 2) return cenaPrzedZmiana(r);
  if (w === 3) return vat(r);
  return punktyProcentowe(r);
}

// --- 4. Lokata

const KAPITALY = [500, 800, 1000, 1200, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 8000, 10000, 12000, 15000, 20000];
const STOPY = [2, 3, 4, 5, 6, 8, 10];
const mnoz = (K, p, n) => q(K).mul(q(100 + p, 100).pow(n));
const nice = (v) => v.mul(100).calkowita && v.d <= 4;

const LOK_ZLOZONE = [], LOK_PROSTE = [], LOK_PODATEK = [];
for (const K of KAPITALY) for (const p of STOPY) {
  for (const n of [2, 3]) if (nice(mnoz(K, p, n))) LOK_ZLOZONE.push([K, p, n]);
  for (const n of [2, 3, 4, 5]) if (nice(q(K * p * n, 100))) LOK_PROSTE.push([K, p, n]);
  if (nice(q(K * p * 81, 10000))) LOK_PODATEK.push([K, p]);
}

function lokata(r) {
  const osoba = r.pick([["Pani Anna", "wpłaciła"], ["Pan Piotr", "wpłacił"], ["Pani Karolina", "wpłaciła"], ["Pan Adam", "wpłacił"]]);
  const w = r.int(0, 2);
  if (w === 0) {
    const [K, p, n] = r.pick(LOK_ZLOZONE);
    const F = mnoz(K, p, n), odsetki = F.sub(K);
    const f = q(100 + p, 100);
    return zad(
      `${osoba[0]} ${osoba[1]} $${zl(K)}$ zł na lokatę na $${n}$ ${lm(n, ["rok", "lata", "lat"])} z roczną kapitalizacją odsetek. Oprocentowanie lokaty jest stałe i wynosi $${p}\\%$ w skali roku. Ile złotych będzie na lokacie po zakończeniu lokaty? Ile wynoszą odsetki? (Pomiń podatek od odsetek.)`,
      [pole("k", "Kwota po zakończeniu lokaty (w zł)"), pole("o", "Odsetki (w zł)")],
      { k: F, o: odsetki },
      `Kwota końcowa: $${zl(F)}$ zł, odsetki: $${zl(odsetki)}$ zł`,
      [
        `Co roku kwota rośnie o $${p}\\%$, czyli jest mnożona przez $1 + \\frac{${p}}{100} = ${dz(f)}$.`,
        `Po $${n}$ ${lm(n, ["roku", "latach", "latach"])}: $K_n = K \\cdot ${dz(f)}^{${n}} = ${zl(K)} \\cdot ${dz(f.pow(n), 2)} = ${zl(F)}$ zł.`,
        `Odsetki to kwota końcowa minus wpłata: $${zl(F)} - ${zl(K)} = ${zl(odsetki)}$ zł.`,
      ],
    );
  }
  if (w === 1) {
    const [K, p, n] = r.pick(LOK_PROSTE);
    const odsetki = q(K * p * n, 100), F = q(K).add(odsetki);
    return zad(
      `${osoba[0]} ${osoba[1]} $${zl(K)}$ zł na lokatę na $${n}$ ${lm(n, ["rok", "lata", "lat"])}. Oprocentowanie lokaty wynosi $${p}\\%$ w skali roku, a odsetki naliczane są co roku od kwoty wpłaconej i wypłacane na zakończenie lokaty (bez kapitalizacji). Ile złotych odsetek wypłaci bank? Jaką łączną kwotę dostanie klient?`,
      [pole("o", "Odsetki (w zł)"), pole("k", "Łączna wypłata (w zł)")],
      { o: odsetki, k: F },
      `Odsetki: $${zl(odsetki)}$ zł, wypłata: $${zl(F)}$ zł`,
      [
        `Odsetki za jeden rok: $${p}\\%$ z $${zl(K)}$ to $${dz(q(p, 100))} \\cdot ${zl(K)} = ${zl(q(K * p, 100))}$ zł.`,
        `Odsetki są liczone od tej samej kwoty przez $${n}$ ${lm(n, ["rok", "lata", "lat"])}: $${n} \\cdot ${zl(q(K * p, 100))} = ${zl(odsetki)}$ zł.`,
        `Łącznie klient dostanie: $${zl(K)} + ${zl(odsetki)} = ${zl(F)}$ zł.`,
      ],
    );
  }
  const [K, p] = r.pick(LOK_PODATEK);
  const odsetki = q(K * p, 100), podatek = odsetki.mul(q(19, 100)), netto = odsetki.sub(podatek), F = q(K).add(netto);
  return zad(
    `${osoba[0]} ${osoba[1]} $${zl(K)}$ zł na roczną lokatę oprocentowaną $${p}\\%$ w skali roku. Od odsetek bank pobiera $19\\%$ podatku. Ile złotych wynosi podatek? Jaką kwotę klient otrzyma po zakończeniu lokaty (wpłata plus odsetki po odjęciu podatku)?`,
    [pole("p", "Podatek (w zł)"), pole("k", "Kwota po zakończeniu lokaty (w zł)")],
    { p: podatek, k: F },
    `Podatek: $${zl(podatek)}$ zł, wypłata: $${zl(F)}$ zł`,
    [
      `Odsetki przed podatkiem: $${p}\\%$ z $${zl(K)}$ to $${zl(odsetki)}$ zł.`,
      `Podatek to $19\\%$ odsetek: $${dz(q(19, 100))} \\cdot ${zl(odsetki)} = ${zl(podatek)}$ zł.`,
      `Odsetki po podatku: $${zl(odsetki)} - ${zl(podatek)} = ${zl(netto)}$ zł. Klient dostanie $${zl(K)} + ${zl(netto)} = ${zl(F)}$ zł.`,
    ],
  );
}

// --- 5. Układ równań z treści: bilety i monety, ceny zakupów, wiek, prostokąt

function ukladBilety(r) {
  const x = r.int(8, 45), y = r.int(8, 45);
  const kino = r.chance(0.6);
  const [a, b] = kino ? [r.pick([20, 24, 25, 28, 30]), r.pick([12, 14, 15, 16, 18])] : [5, 2];
  const n = x + y, S = a * x + b * y;
  const tresc = kino
    ? `Na seans w kinie sprzedano łącznie $${n}$ biletów. Bilet normalny kosztował $${a}$ zł, a ulgowy $${b}$ zł. Ze sprzedaży wszystkich biletów uzyskano $${S}$ zł. Ile sprzedano biletów normalnych, a ile ulgowych?`
    : `W skarbonce są same monety dwuzłotowe i pięciozłotowe, razem $${n}$ monet o łącznej wartości $${S}$ zł. Ile jest monet pięciozłotowych, a ile dwuzłotowych?`;
  const [nazA, nazB] = kino ? ["normalnych", "ulgowych"] : ["pięciozłotowych", "dwuzłotowych"];
  return zad(
    tresc,
    [pole("x", kino ? "Liczba biletów normalnych" : "Liczba monet pięciozłotowych"), pole("y", kino ? "Liczba biletów ulgowych" : "Liczba monet dwuzłotowych")],
    { x: q(x), y: q(y) },
    `${nazA[0].toUpperCase() + nazA.slice(1)}: $${x}$, ${nazB}: $${y}$`,
    [
      `Niech $x$ to liczba ${kino ? "biletów normalnych" : "monet pięciozłotowych"}, a $y$ – ${kino ? "ulgowych" : "dwuzłotowych"}.`,
      `Razem jest $${n}$ sztuk: $x + y = ${n}$. Wartość: $${a}x + ${b}y = ${S}$.`,
      `Z pierwszego równania $y = ${n} - x$. Wstawiamy do drugiego: $${a}x + ${b}(${n} - x) = ${S}$, czyli $${a - b}x + ${b * n} = ${S}$, więc $${a - b}x = ${S - b * n}$ i $x = ${x}$.`,
      `Wtedy $y = ${n} - ${x} = ${y}$.`,
      `Sprawdzenie: $${a} \\cdot ${x} + ${b} \\cdot ${y} = ${a * x} + ${b * y} = ${S}$ – zgadza się z treścią.`,
    ],
  );
}

const PARY_ZAKUPOW = [
  { a: ["zeszyt", "zeszyty", "zeszytów"], an: "zeszyt", ag: "jednego zeszytu", b: ["długopis", "długopisy", "długopisów"], bn: "długopis", bg: "jednego długopisu", pa: [6, 16], pb: [2, 8] },
  { a: ["kanapkę", "kanapki", "kanapek"], an: "kanapka", ag: "jednej kanapki", b: ["sok", "soki", "soków"], bn: "sok", bg: "jednego soku", pa: [10, 24], pb: [4, 12] },
];

function ukladZakupy(r) {
  const t = r.pick(PARY_ZAKUPOW);
  const x = q(r.int(t.pa[0], t.pa[1]), 2), y = q(r.int(t.pb[0], t.pb[1]), 2);   // ceny w złotych (co 50 gr)
  const k1 = r.int(2, 3), l1 = r.int(1, 2), l2 = r.int(2, 4);
  const S1 = x.mul(k1).add(y.mul(l1)), S2 = x.add(y.mul(l2));
  const roznicaY = q(k1 * l2 - l1);   // y(k1·l2 − l1) = k1·S2 − S1
  return zad(
    `W sklepie za ${k1} ${lm(k1, t.a)} i ${l1} ${lm(l1, t.b)} zapłacono $${zl(S1)}$ zł, a za 1 ${t.a[0]} i ${l2} ${lm(l2, t.b)} – $${zl(S2)}$ zł. Oblicz cenę ${t.ag} oraz cenę ${t.bg}.`,
    [pole("x", `Cena: ${t.an} (w zł)`), pole("y", `Cena: ${t.bn} (w zł)`)],
    { x, y },
    `${cap(t.an)}: $${zl(x)}$ zł, ${t.bn}: $${zl(y)}$ zł`,
    [
      `Niech $x$ to cena produktu „${t.an}”, a $y$ – „${t.bn}” (w złotych). Z treści: $${k1}x + ${l1}y = ${zl(S1)}$ oraz $x + ${l2}y = ${zl(S2)}$.`,
      `Z drugiego równania $x = ${zl(S2)} - ${l2}y$. Wstawiamy do pierwszego: $${k1}(${zl(S2)} - ${l2}y) + ${l1}y = ${zl(S1)}$.`,
      `Po wymnożeniu: $${zl(S2.mul(k1))} - ${k1 * l2}y + ${l1}y = ${zl(S1)}$, czyli $${roznicaY.n}y = ${zl(S2.mul(k1).sub(S1))}$, więc $y = ${zl(y)}$ zł.`,
      `Wtedy $x = ${zl(S2)} - ${l2} \\cdot ${zl(y)} = ${zl(x)}$ zł.`,
      `Sprawdzenie pierwszego zakupu: $${k1} \\cdot ${zl(x)} + ${l1} \\cdot ${zl(y)} = ${zl(S1)}$ zł – zgadza się z treścią.`,
    ],
  );
}

const WIEKI = [
  { st: "Ojciec", sf: "starszy", mlod: "syna", mlod2: "syna", gen: "ojca", nom: "syn", wiek: [28, 50] },
  { st: "Mama", sf: "starsza", mlod: "córki", mlod2: "córki", gen: "mamy", nom: "córka", wiek: [28, 50] },
  { st: "Babcia", sf: "starsza", mlod: "wnuczki", mlod2: "wnuczki", gen: "babci", nom: "wnuczka", wiek: [50, 75] },
  { st: "Dziadek", sf: "starszy", mlod: "wnuka", mlod2: "wnuka", gen: "dziadka", nom: "wnuk", wiek: [50, 75] },
];
const UKLADY_WIEKU = [];
for (let s = 6; s <= 16; s++) for (let k = 3; k <= 7; k++) for (let l = 2; l < k; l++) {
  const m = (s * (k - l)) / (l - 1);
  if (Number.isInteger(m) && m >= 2 && m <= 12 && k * s >= 28 && k * s <= 75) UKLADY_WIEKU.push([s, k, l, m]);
}

function ukladWiek(r) {
  const w = r.pick(WIEKI);
  const [s, k, l, m] = r.pick(UKLADY_WIEKU.filter(([s0, k0]) => k0 * s0 >= w.wiek[0] && k0 * s0 <= w.wiek[1]));
  const f = k * s;
  return zad(
    `${w.st} jest $${k}$ razy ${w.sf} od ${w.mlod}. Za $${m}$ ${lm(m, ["rok", "lata", "lat"])} ${w.st.toLowerCase()} będzie $${l}$ razy ${w.sf} od ${w.mlod2}. Ile lat ma teraz ${w.st.toLowerCase()}, a ile ${w.nom}?`,
    [pole("f", `Wiek ${w.gen} (w latach)`), pole("s", `Wiek ${w.mlod} (w latach)`)],
    { f: q(f), s: q(s) },
    `${w.st}: $${f}$ lat, ${w.nom}: $${s}$ lat`,
    [
      `Niech $x$ to obecny wiek ${w.mlod}. Wtedy wiek ${w.gen} to $${k}x$.`,
      `Za $${m}$ ${lm(m, ["rok", "lata", "lat"])} będą mieli odpowiednio $x + ${m}$ i $${k}x + ${m}$ lat, a z treści drugi wiek jest $${l}$ razy większy: $${k}x + ${m} = ${l}(x + ${m})$.`,
      `Po wymnożeniu: $${k}x + ${m} = ${l}x + ${l * m}$, więc $${k - l === 1 ? "" : k - l}x = ${l * m - m}$, czyli $x = ${s}$.`,
      `Wiek ${w.gen}: $${k} \\cdot ${s} = ${f}$ lat.`,
      `Sprawdzenie: za $${m}$ ${lm(m, ["rok", "lata", "lat"])} będą mieli $${f + m}$ i $${s + m}$ lat, a $${f + m} = ${l} \\cdot ${s + m}$ – zgadza się z treścią.`,
    ],
  );
}

function ukladProstokat(r) {
  const b = r.int(3, 25);
  const roznica = r.chance(0.6);
  if (roznica) {
    const d = r.int(2, 12), a = b + d, L = 2 * (a + b);
    return zad(
      `Działka ma kształt prostokąta. Jej obwód jest równy $${L}$ m, a jeden bok jest o $${d}$ m dłuższy od drugiego. Oblicz długości boków działki.`,
      [pole("b", "Krótszy bok (w m)"), pole("a", "Dłuższy bok (w m)")],
      { b: q(b), a: q(a) },
      `Boki: $${b}$ m i $${a}$ m`,
      [
        `Niech $x$ to krótszy bok. Dłuższy ma wtedy $x + ${d}$.`,
        `Obwód: $2x + 2(x + ${d}) = ${L}$, czyli $4x + ${2 * d} = ${L}$, więc $4x = ${L - 2 * d}$ i $x = ${b}$ m.`,
        `Dłuższy bok: $${b} + ${d} = ${a}$ m.`,
        `Sprawdzenie: obwód $2 \\cdot ${b} + 2 \\cdot ${a} = ${L}$ m – zgadza się z treścią.`,
      ],
    );
  }
  const k = r.int(2, 4), a = k * b, L = 2 * (a + b);
  return zad(
    `Plac zabaw ma kształt prostokąta. Do ogrodzenia go potrzeba $${L}$ m siatki (to obwód placu), a jeden bok jest $${k}$ razy dłuższy od drugiego. Oblicz długości boków placu.`,
    [pole("b", "Krótszy bok (w m)"), pole("a", "Dłuższy bok (w m)")],
    { b: q(b), a: q(a) },
    `Boki: $${b}$ m i $${a}$ m`,
    [
      `Niech $x$ to krótszy bok. Dłuższy ma wtedy $${k}x$.`,
      `Obwód: $2x + 2 \\cdot ${k}x = ${L}$, czyli $${2 + 2 * k}x = ${L}$, więc $x = ${b}$ m.`,
      `Dłuższy bok: $${k} \\cdot ${b} = ${a}$ m.`,
      `Sprawdzenie: obwód $2 \\cdot ${b} + 2 \\cdot ${a} = ${L}$ m – zgadza się z treścią.`,
    ],
  );
}

function ukladRownan(r) {
  const w = r.int(0, 3);
  if (w === 0) return ukladBilety(r);
  if (w === 1) return ukladZakupy(r);
  if (w === 2) return ukladWiek(r);
  return ukladProstokat(r);
}

// --- 6. Ciągi w praktyce

function ciagArytmetyczny(r) {
  const w = r.int(0, 2);
  if (w === 0) {
    const [imie, m] = r.pick([["Ola", false], ["Kuba", true], ["Ewa", false], ["Marek", true]]);
    const a1 = 10 * r.int(2, 10), d = 5 * r.int(1, 4), n = r.int(6, 12);
    const an = a1 + (n - 1) * d, S = (n * (a1 + an)) / 2;
    return zad(
      `${imie} ${m ? "postanowił" : "postanowiła"} oszczędzać. W pierwszym miesiącu ${m ? "odłożył" : "odłożyła"} $${a1}$ zł, a w każdym następnym miesiącu ${m ? "odkładał" : "odkładała"} o $${d}$ zł więcej niż w poprzednim. Ile złotych ${m ? "odłożył" : "odłożyła"} w $${n}$-tym miesiącu? Ile złotych ${m ? "odłożył" : "odłożyła"} łącznie przez $${n}$ miesięcy?`,
      [pole("a", `Kwota w ${n}-tym miesiącu (w zł)`), pole("s", `Suma oszczędności z ${n} miesięcy (w zł)`)],
      { a: q(an), s: q(S) },
      `W ostatnim miesiącu: $${an}$ zł, łącznie: $${S}$ zł`,
      [
        `Kwoty tworzą ciąg arytmetyczny: $a_1 = ${a1}$, różnica $r = ${d}$.`,
        `Wyraz o numerze $n$: $a_n = a_1 + (n - 1) \\cdot r$, więc $a_{${n}} = ${a1} + ${n - 1} \\cdot ${d} = ${an}$ zł.`,
        `Suma: $S_{${n}} = \\frac{a_1 + a_{${n}}}{2} \\cdot ${n} = \\frac{${a1} + ${an}}{2} \\cdot ${n} = ${S}$ zł.`,
      ],
    );
  }
  if (w === 1) {
    const a1 = r.int(12, 20), d = r.int(2, 4), n = r.int(8, 20);
    const an = a1 + (n - 1) * d, S = (n * (a1 + an)) / 2;
    const sala = r.pick(["Sala kinowa", "Aula szkolna", "Sala koncertowa"]);
    return zad(
      `${sala} ma $${n}$ rzędów. W pierwszym rzędzie jest $${a1}$ miejsc, a w każdym następnym rzędzie jest o $${d}$ ${lm(d, ["miejsce", "miejsca", "miejsc"])} więcej niż w poprzednim. Ile miejsc jest w ostatnim rzędzie? Ile miejsc jest na całej sali?`,
      [pole("a", "Miejsca w ostatnim rzędzie"), pole("s", "Wszystkich miejsc na sali")],
      { a: q(an), s: q(S) },
      `W ostatnim rzędzie: $${an}$, na całej sali: $${S}$`,
      [
        `Liczby miejsc w rzędach tworzą ciąg arytmetyczny: $a_1 = ${a1}$, różnica $r = ${d}$.`,
        `Ostatni rząd: $a_{${n}} = a_1 + (${n} - 1) \\cdot r = ${a1} + ${n - 1} \\cdot ${d} = ${an}$.`,
        `Razem: $S_{${n}} = \\frac{a_1 + a_{${n}}}{2} \\cdot ${n} = \\frac{${a1} + ${an}}{2} \\cdot ${n} = ${S}$ miejsc.`,
      ],
    );
  }
  const a1 = r.int(15, 24), n = r.int(8, 14);
  const an = a1 - (n - 1), S = (n * (a1 + an)) / 2;
  const co = r.pick([["rur", "rury"], ["bali drewna", "bale"], ["puszek", "puszki"]]);
  return zad(
    `${cap(co[1])} ułożono w stos o $${n}$ warstwach. W najniższej warstwie jest $${a1}$ sztuk, a w każdej wyższej warstwie o $1$ sztukę mniej niż w warstwie bezpośrednio pod nią. Ile sztuk jest w najwyższej warstwie? Ile sztuk jest w całym stosie?`,
    [pole("a", "Sztuk w najwyższej warstwie"), pole("s", "Sztuk w całym stosie")],
    { a: q(an), s: q(S) },
    `W najwyższej warstwie: $${an}$, w całym stosie: $${S}$`,
    [
      `Liczby sztuk w warstwach (od dołu) tworzą ciąg arytmetyczny: $a_1 = ${a1}$, różnica $r = -1$.`,
      `Najwyższa warstwa: $a_{${n}} = ${a1} + (${n} - 1) \\cdot (-1) = ${a1} - ${n - 1} = ${an}$.`,
      `Razem: $S_{${n}} = \\frac{${a1} + ${an}}{2} \\cdot ${n} = ${S}$ sztuk.`,
    ],
  );
}

const WZROSTY = [];
for (const wzrost of [true, false]) for (const p of [10, 20, 25, 50, 100]) {
  if (!wzrost && p === 100) continue;
  const f = q(wzrost ? 100 + p : 100 - p, 100);
  for (const n of [2, 3, 4, 5]) {
    const D = f.d ** n;
    const kMin = Math.ceil(300 / D), kMax = Math.floor(Math.min(20000, 60000 / Number(f.pow(n))) / D);
    if (D <= 1000 && kMax >= kMin) WZROSTY.push({ wzrost, p, n, f, D, kMin, kMax });
  }
}

function ciagGeometryczny(r) {
  const { wzrost, p, n, f, D, kMin, kMax } = r.pick(WZROSTY);
  const U = D * r.int(kMin, kMax);
  const po1 = q(U).mul(f), pon = q(U).mul(f.pow(n));
  const rok = n === 1 ? "rok" : lm(n, ["rok", "lata", "lat"]);
  let tresc, etykiety, jednostka = "";
  if (wzrost && p === 100) {
    tresc = `Liczba bakterii w hodowli wynosi na początku $${dz(U)}$ i podwaja się co godzinę. Ile bakterii będzie po godzinie, a ile po $${n}$ ${lm(n, ["godzinie", "godzinach", "godzinach"])}?`;
    etykiety = ["Po 1 godzinie", `Po ${n} godzinach`];
  } else if (wzrost) {
    const co = r.pick(["użytkowników aplikacji", "mieszkańców miasteczka", "uczniów w sieci szkół", "obserwujących kanał"]);
    tresc = `Liczba ${co} wynosi obecnie $${dz(U)}$ i rośnie co roku o $${p}\\%$ w stosunku do poprzedniego roku. Ile ich będzie za rok, a ile za $${n}$ ${rok}?`;
    etykiety = ["Za rok", `Za ${n} ${rok}`];
  } else {
    const co = r.pick(["samochodu", "laptopa", "motocykla"]);
    jednostka = " (w zł)";
    tresc = `Wartość ${co} wynosi obecnie $${dz(U)}$ zł i maleje co roku o $${p}\\%$ w stosunku do wartości z poprzedniego roku. Ile będzie wart za rok, a ile za $${n}$ ${rok}?`;
    etykiety = ["Wartość za rok", `Wartość za ${n} ${rok}`];
  }
  return zad(
    tresc,
    [pole("a", etykiety[0] + jednostka), pole("b", etykiety[1] + jednostka)],
    { a: po1, b: pon },
    wzrost && p === 100
      ? `Po godzinie: $${dz(po1)}$, po $${n}$ godzinach: $${dz(pon)}$`
      : `Za rok: $${dz(po1)}$${jednostka ? " zł" : ""}, za $${n}$ ${rok}: $${dz(pon)}$${jednostka ? " zł" : ""}`,
    [
      wzrost && p === 100
        ? `Co godzinę liczba jest mnożona przez $2$ – to ciąg geometryczny o ilorazie $q = 2$.`
        : `Co roku wartość jest mnożona przez $1 ${wzrost ? "+" : "-"} \\frac{${p}}{100} = ${dz(f)}$ – to ciąg geometryczny o ilorazie $q = ${dz(f)}$.`,
      `Po pierwszym okresie: $${U} \\cdot ${dz(f)} = ${dz(po1)}$.`,
      `Po $${n}$ okresach: $${U} \\cdot ${dz(f)}^{${n}} = ${U} \\cdot ${dz(f.pow(n), 2)} = ${dz(pon)}$.`,
    ],
  );
}

function ciagi(r) {
  return r.chance(0.6) ? ciagArytmetyczny(r) : ciagGeometryczny(r);
}

// --- Lista generatorów

export const GENERATORY = [
  { id: "srednia-predkosc", nazwa: "Średnia prędkość", opis: "Średnia prędkość na całej trasie przy różnych prędkościach tam i z powrotem (albo na dwóch połowach trasy) oraz czas podróży.", generuj: sredniaPredkosc },
  { id: "wspolna-praca", nazwa: "Wspólna praca", opis: "Po jakim czasie dwie osoby lub maszyny wykonają pracę razem; ile zajmie drugiej samej; napełnianie z odpływem.", generuj: wspolnaPraca },
  { id: "procenty", nazwa: "Procenty – ceny, VAT, punkty procentowe", opis: "Kolejne zmiany ceny, cena przed obniżką lub podwyżką, cena netto i brutto, punkty procentowe a procenty.", generuj: procenty },
  { id: "lokata", nazwa: "Lokata – odsetki", opis: "Kwota po zakończeniu lokaty z kapitalizacją roczną, odsetki proste i podatek od odsetek.", generuj: lokata },
  { id: "uklad-rownan", nazwa: "Układ równań z treści", opis: "Bilety i monety, ceny zakupów, wiek oraz boki prostokąta zapisane układem równań.", generuj: ukladRownan },
  { id: "ciagi-w-praktyce", nazwa: "Ciągi w praktyce", opis: "Oszczędności, rzędy miejsc i stosy (ciąg arytmetyczny) oraz wzrost lub spadek o stały procent rocznie (ciąg geometryczny).", generuj: ciagi },
];
