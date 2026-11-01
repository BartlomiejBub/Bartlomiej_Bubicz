// Generatory zadań z działu „Egzamin ósmoklasisty – liczby i działania”: zapis liczb (dziesiętny i rzymski), oś liczbowa, ułamki i rozwinięcia dziesiętne,
// dzielniki i liczby pierwsze, zaokrąglanie i szacowanie, potęgi, pierwiastki. Zadania ćwiczą dokładnie to, co tłumaczą karty z assets/wzory/e8-liczby.js.
// Kontrakt zadania i narzędzia: zob. wspolne.js. Każdy generator ma pole temat – id tematu z assets/arkusze/tematy.js (dział "e8-liczby").
// Rozwiązania są pisane prostym językiem, kilka krótkich kroków. Odpowiedzi liczymy dokładnie na Q (bez liczb zmiennoprzecinkowych);
// pola z ułamkiem zwykłym przyjmują zarówno zapis dziesiętny (0,75), jak i zwykły (3/4) – Q porównuje wartości.
import { Q, q } from "./wspolne.js";

/** Lista liczb jako osobne wzory po przecinkach – długa lista łamie się wtedy na wąskim ekranie. */
const listaTex = (arr) => arr.map((x) => `$${x}$`).join(", ");

// --- Drobne pomocnicze

const nwd = (a, b) => (b ? nwd(b, a % b) : Math.abs(a));
const nww = (a, b) => (a / nwd(a, b)) * b;
const cap = (s) => s[0].toUpperCase() + s.slice(1);

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

/** Odmiana rzeczownika po liczebniku: lm(3, ["rok", "lata", "lat"]). */
function lm(n, [jedna, kilka, wiele]) {
  if (n === 1) return jedna;
  const j = n % 10, d = n % 100;
  return j >= 2 && j <= 4 && !(d >= 12 && d <= 14) ? kilka : wiele;
}

/** „$24$ zeszyty” – liczba w TeX-u i rzeczownik we właściwej formie. */
const ile = (n, formy) => `$${dz(n)}$ ${lm(n, formy)}`;

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });
const polew = (id, etykieta, opcje) => ({ id, typ: "wybor", etykieta, opcje });
const zad = (tresc, pola, odpowiedz, wynik, rozwiazanie) => ({ tresc, pola, odpowiedz, wynik, rozwiazanie });
/** Odpowiedź „ładna”: liczba całkowita do 100 000, ułamek o mianowniku do 40 albo dziesiętny z najwyżej 4 cyframi po przecinku. */
const ladna = (v) => Math.abs(v.n) <= 100000 && (v.d <= 40 || 10000 % v.d === 0);
const skonczonyDz = (v) => 10000 % v.d === 0;

/** Powtarza losowanie, aż f() zwróci zadanie (wartość różną od null); f korzysta z tego samego losownika, więc wynik jest powtarzalny. */
function probuj(f, proby = 800) {
  for (let i = 0; i < proby; i++) {
    const w = f();
    if (w) return w;
  }
  throw new Error("Nie udało się wylosować zadania");
}

/** Miesza opcje wyboru: poprawna + błędne. Zwraca { opcje, ind } albo null, gdy dwie opcje są takie same. */
function mieszaj(r, poprawna, zle) {
  const wszystkie = [poprawna, ...zle];
  if (new Set(wszystkie).size !== wszystkie.length) return null;
  const opcje = r.shuffle(wszystkie);
  return { opcje, ind: opcje.indexOf(poprawna) };
}

const nawias = (v) => (v < 0 ? `(${v})` : String(v));
/** Liczba (Q) w TeX-u, ujemna w nawiasie; ulamkowy – zawsze ułamek zwykły, inaczej zapis dziesiętny, gdy się da. */
const fm = (v, ulamkowy = false) => (ulamkowy ? Q.z(v).tex() : dz(v));
const nawQ = (v, ulamkowy = false) => (Q.z(v).ujemna ? `(${fm(v, ulamkowy)})` : fm(v, ulamkowy));
const fr = (a, b) => `\\frac{${a}}{${b}}`;

function rozklad(n) {
  const out = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) while (m % p === 0) { out.push(p); m /= p; }
  if (m > 1) out.push(m);
  return out;
}
/** 12 -> "2^{2} \cdot 3" */
function rozkladTex(n) {
  const gr = new Map();
  for (const p of rozklad(n)) gr.set(p, (gr.get(p) ?? 0) + 1);
  return [...gr].map(([p, e]) => (e > 1 ? `${p}^{${e}}` : String(p))).join(" \\cdot ");
}
const czyPierwsza = (n) => n >= 2 && rozklad(n).length === 1;
function dzielnikiLiczby(n) {
  const d = [];
  for (let i = 1; i <= n; i++) if (n % i === 0) d.push(i);
  return d;
}

/**
 * Dzielenie pisemne a : b po przecinku. cyfry – kolejne cyfry po przecinku do powtórzenia reszty, reszty – reszty przed każdą cyfrą,
 * pre – cyfry przed okresem, okres – cyfry okresu ("" dla rozwinięcia skończonego).
 */
function rozwiniecie(a, b) {
  const cal = Math.floor(a / b);
  let reszta = a % b;
  const gdzie = new Map();
  const cyfry = [], reszty = [];
  while (reszta !== 0 && !gdzie.has(reszta)) {
    gdzie.set(reszta, cyfry.length);
    reszty.push(reszta);
    reszta *= 10;
    cyfry.push(Math.floor(reszta / b));
    reszta %= b;
  }
  const start = reszta === 0 ? -1 : gdzie.get(reszta);
  return {
    cal, cyfry, reszty,
    pre: (start < 0 ? cyfry : cyfry.slice(0, start)).join(""),
    okres: start < 0 ? "" : cyfry.slice(start).join(""),
  };
}
/** n-ta cyfra po przecinku (n ≥ 1) rozwinięcia z funkcji rozwiniecie(). */
const cyfraRozwiniecia = (rw, n) => Number(n <= rw.pre.length ? rw.pre[n - 1] : rw.okres[(n - rw.pre.length - 1) % rw.okres.length]);
/** Zapis dziesiętny z nawiasem okresu: 0{,}1(6), 0{,}375, 2. */
function dzOkres(rw) {
  if (!rw.pre && !rw.okres) return String(rw.cal);
  return `${rw.cal}{,}${rw.pre}${rw.okres ? `(${rw.okres})` : ""}`;
}

// --- 1. Liczby rzymskie ↔ dziesiętne

const CYFRY_RZYM = [
  ["", "M", "MM", "MMM"],
  ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
  ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
  ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
];
const cyfryLiczby = (n) => [Math.floor(n / 1000), Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];
/** Części zapisu rzymskiego liczby 1–3999: [[wartość, zapis], ...] od tysięcy do jedności, bez pustych miejsc. */
const rzymCzesci = (n) => cyfryLiczby(n).map((d, i) => [d * 10 ** (3 - i), CYFRY_RZYM[i][d]]).filter(([w]) => w > 0);
const rzym = (n) => rzymCzesci(n).map(([, z]) => z).join("");
const WART_RZYM = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
function zRzym(s) {
  let suma = 0;
  for (let i = 0; i < s.length; i++) {
    const a = WART_RZYM[s[i]], b = WART_RZYM[s[i + 1]] ?? 0;
    suma += a < b ? -a : a;
  }
  return suma;
}
const poprawnyRzym = (s) => s.length > 0 && rzym(zRzym(s)) === s;
/** Zapis rzymski rozbity na pojedyncze znaki i pary z odejmowaniem: "MCMXCIV" -> ["M", "CM", "XC", "IV"]. */
function tokenyRzym(s) {
  const t = [];
  for (let i = 0; i < s.length; i++) {
    if (i + 1 < s.length && WART_RZYM[s[i]] < WART_RZYM[s[i + 1]]) { t.push(s[i] + s[i + 1]); i++; } else t.push(s[i]);
  }
  return t;
}
const wartoscTokenu = (t) => (t.length === 2 ? WART_RZYM[t[1]] - WART_RZYM[t[0]] : WART_RZYM[t]);
const rz = (s) => `\\text{${s}}`;
/** Liczba rzymska w TeX-u wewnątrz tekstu: „$\text{XV}$”. */
const rzT = (s) => `$${rz(s)}$`;

const NAIWNE_RZYM = [["M", null], ["C", "D"], ["X", "L"], ["I", "V"]];
/** Zapis „bez odejmowania” (IIII zamiast IV) – typowy błąd. */
function naiwnyRzym(n) {
  return cyfryLiczby(n).map((d, i) => {
    const [jeden, piec] = NAIWNE_RZYM[i];
    return piec && d >= 5 ? piec + jeden.repeat(d - 5) : jeden.repeat(d);
  }).join("");
}

/** Powód, dla którego zapis rzymski jest błędny (albo wartość, jeśli jest poprawny, tylko innej liczby). */
function opisZapisuRzym(s) {
  if (poprawnyRzym(s)) return `to zapis liczby $${zRzym(s)}$`;
  if (/(.)\1\1\1/.test(s)) return "cztery takie same znaki z rzędu są niedozwolone (najwyżej trzy)";
  if (/VV|LL|DD/.test(s)) return "znaki $\\text{V}$, $\\text{L}$, $\\text{D}$ nigdy się nie powtarzają";
  const dozwolone = ["IV", "IX", "XL", "XC", "CD", "CM"];
  for (let i = 0; i + 1 < s.length; i++) {
    const para = s[i] + s[i + 1];
    if (WART_RZYM[s[i]] < WART_RZYM[s[i + 1]] && !dozwolone.includes(para)) {
      return `para $${rz(para)}$ nie jest dozwolonym odejmowaniem (wolno tylko $\\text{IV}$, $\\text{IX}$, $\\text{XL}$, $\\text{XC}$, $\\text{CD}$, $\\text{CM}$)`;
    }
  }
  const po = s.match(/(IV|IX)I|(XL|XC)X|(CD|CM)C/);
  if (po) return `po parze $${rz(po[1] ?? po[2] ?? po[3])}$ nie może od razu stać znak, od którego ta para się zaczyna`;
  return "znaki stoją w złym porządku (od największego do najmniejszego, z wyjątkiem par z odejmowaniem)";
}

const ZDARZENIA = [
  { rok: 966, zd: "Chrzest Polski miał miejsce w roku" },
  { rok: 1025, zd: "Bolesław Chrobry koronował się na króla w roku" },
  { rok: 1066, zd: "Bitwa pod Hastings odbyła się w roku" },
  { rok: 1410, zd: "Bitwa pod Grunwaldem odbyła się w roku" },
  { rok: 1492, zd: "Krzysztof Kolumb dotarł do Ameryki w roku" },
  { rok: 1569, zd: "Unię lubelską zawarto w roku" },
  { rok: 1683, zd: "Odsiecz wiedeńska miała miejsce w roku" },
  { rok: 1791, zd: "Konstytucję 3 maja uchwalono w roku" },
  { rok: 1918, zd: "Polska odzyskała niepodległość w roku" },
  { rok: 1939, zd: "II wojna światowa wybuchła w roku" },
  { rok: 1969, zd: "Pierwsi ludzie wylądowali na Księżycu w roku" },
  { rok: 2004, zd: "Polska przystąpiła do Unii Europejskiej w roku" },
];
const wiekRoku = (rok) => Math.ceil(rok / 100);

function losujLiczbeDoRzymu(r) {
  return r.pick([() => r.int(1000, 2025), () => r.int(1000, 2025), () => r.int(100, 999), () => r.int(21, 99)])();
}

function rzymNaArabski(r) {
  const { n, zd } = probuj(() => {
    const zd = r.chance(0.35) ? r.pick(ZDARZENIA) : null;
    const n = zd ? zd.rok : losujLiczbeDoRzymu(r);
    return rzym(n).length >= 4 ? { n, zd } : null;
  });
  const s = rzym(n);
  const tokeny = tokenyRzym(s);
  const pary = tokeny.filter((t) => t.length === 2);
  const tresc = zd
    ? `${zd.zd} ${rzT(s)}. Zapisz ten rok w systemie dziesiętnym (cyframi arabskimi).`
    : r.pick([
      `Zapisz liczbę ${rzT(s)} w systemie dziesiętnym.`,
      `Jaką liczbę przedstawia zapis rzymski ${rzT(s)}?`,
      `Napis ${rzT(s)} to liczba zapisana cyframi rzymskimi. Zapisz ją cyframi arabskimi.`,
    ]);
  return zad(
    tresc,
    [pole("liczba", "Liczba w zapisie dziesiętnym")],
    { liczba: q(n) },
    `$${n}$`,
    [
      "Czytamy zapis od lewej. Gdy mniejszy znak stoi przed większym, tworzą parę, którą odejmujemy (np. $\\text{IV} = 5 - 1 = 4$). Pozostałe znaki dodajemy.",
      pary.length
        ? `Pary z odejmowaniem: ${pary.map((t) => `$${rz(t)} = ${WART_RZYM[t[1]]} - ${WART_RZYM[t[0]]} = ${wartoscTokenu(t)}$`).join(", ")}.`
        : "W tym zapisie nie ma odejmowania – wszystkie znaki po prostu dodajemy.",
      `Rozbijamy zapis: $${tokeny.map(rz).join(" + ")}$, czyli $${tokeny.map(wartoscTokenu).join(" + ")} = ${n}$.`,
    ],
  );
}

/** Trzy błędne, ale wiarygodne zapisy liczby n (bez odejmowania, zmienione cyfry, przestawione znaki). */
function zleRzymskie(r, n) {
  const poprawny = rzym(n);
  const uzyte = new Set([poprawny]);
  const wynik = [];
  const dodaj = (s) => {
    if (s && !uzyte.has(s) && wynik.length < 3) { uzyte.add(s); wynik.push(s); }
  };
  const nai = naiwnyRzym(n);
  if (nai !== poprawny && r.chance(0.75)) dodaj(nai);
  const cyfry = cyfryLiczby(n);
  const pula = [];
  cyfry.forEach((d, i) => {
    for (const dd of [d - 1, d + 1, d + 2, d - 2]) {
      if (dd < 0 || dd > (i === 0 ? 3 : 9)) continue;
      const c2 = [...cyfry];
      c2[i] = dd;
      const n2 = c2[0] * 1000 + c2[1] * 100 + c2[2] * 10 + c2[3];
      if (n2 >= 10 ** (String(n).length - 1) && n2 <= 3999) pula.push(rzym(n2));
    }
  });
  for (let i = 0; i + 1 < poprawny.length; i++) {
    if (poprawny[i] === poprawny[i + 1]) continue;
    const s = poprawny.slice(0, i) + poprawny[i + 1] + poprawny[i] + poprawny.slice(i + 2);
    if (zRzym(s) !== n) pula.push(s);   // przestawienie, które daje tę samą wartość (np. CMM), pomijamy
  }
  for (const s of r.shuffle(pula)) dodaj(s);
  return wynik.length === 3 ? wynik : null;
}

function arabskiNaRzym(r) {
  const { n, zd, zle } = probuj(() => {
    const zd = r.chance(0.3) ? r.pick(ZDARZENIA) : null;
    const n = zd ? zd.rok : losujLiczbeDoRzymu(r);
    if (rzym(n).length < 4) return null;
    const zle = zleRzymskie(r, n);
    return zle ? { n, zd, zle } : null;
  });
  const poprawny = rzym(n);
  const m = probuj(() => mieszaj(r, rzT(poprawny), zle.map(rzT)));
  const tresc = zd
    ? `${zd.zd} $${n}$. Który zapis przedstawia ten rok w systemie rzymskim?`
    : r.pick([
      `Który zapis w systemie rzymskim przedstawia liczbę $${n}$?`,
      `Wskaż poprawny zapis liczby $${n}$ w systemie rzymskim.`,
      `Liczbę $${n}$ zapisano cyframi rzymskimi. Który zapis jest poprawny?`,
    ]);
  const cz = rzymCzesci(n);
  return zad(
    tresc,
    [polew("zapis", "Zapis rzymski", m.opcje)],
    { zapis: m.ind },
    rzT(poprawny),
    [
      `Rozkładamy liczbę na tysiące, setki, dziesiątki i jedności: $${n} = ${cz.map(([w]) => w).join(" + ")}$.`,
      `Każdą część zapisujemy osobno: ${cz.map(([w, z]) => `$${w} \\to ${rz(z)}$`).join(", ")}.`,
      `Sklejamy od największej: ${rzT(poprawny)}.`,
      `Pozostałe zapisy odpadają: ${zle.map((s) => `${rzT(s)} – ${opisZapisuRzym(s)}`).join("; ")}.`,
    ],
  );
}

function wiekZRoku(r) {
  const zd = r.pick(ZDARZENIA);
  const c = wiekRoku(zd.rok);
  const zleWieki = [c - 1, ...r.shuffle([c + 1, c + 2, c - 2, c - 3].filter((x) => x >= 1)).slice(0, 2)];
  const m = probuj(() => mieszaj(r, rzT(rzym(c)), zleWieki.map((x) => rzT(rzym(x)))));
  const pelne = Math.floor(zd.rok / 100);
  return zad(
    `${zd.zd} $${zd.rok}$. W którym wieku to było?`,
    [polew("wiek", "Wiek", m.opcje)],
    { wiek: m.ind },
    `${rzT(rzym(c))} wiek`,
    [
      `Wiek $1$ to lata $1$–$100$, wiek $2$ to lata $101$–$200$ i tak dalej. Numer wieku jest więc o $1$ większy niż liczba pełnych setek w roku.`,
      `W roku $${zd.rok}$ jest $${pelne}$ pełnych setek ($${zd.rok} = ${pelne} \\cdot 100 + ${zd.rok % 100}$), więc trwa już wiek o numerze $${pelne} + 1 = ${c}$ (lata $${(c - 1) * 100 + 1}$–$${c * 100}$).`,
      `Zapisujemy numer wieku cyframi rzymskimi: $${c} = ${rz(rzym(c))}$. Pułapka: sama liczba pełnych setek (${pelne}) to numer o jeden za mały.`,
    ],
  );
}

function rzymskiRokNaWiek(r) {
  const n = r.chance(0.2) ? r.int(11, 20) * 100 : r.int(1001, 2025);
  const c = wiekRoku(n);
  const s = rzym(n);
  return zad(
    `Rok ${rzT(s)} należy do pewnego wieku. Podaj numer tego wieku cyframi arabskimi.`,
    [pole("wiek", "Numer wieku")],
    { wiek: q(c) },
    `$${c}$`,
    [
      `Zamieniamy rok na system dziesiętny: ${rzT(s)} to $${tokenyRzym(s).map(wartoscTokenu).join(" + ")} = ${n}$.`,
      n % 100 === 0
        ? `Rok $${n}$ kończy się na $00$, więc jest ostatnim rokiem wieku $${c}$ (lata $${(c - 1) * 100 + 1}$–$${n}$). Nie należy do wieku $${c + 1}$.`
        : `Numer wieku jest o $1$ większy niż liczba pełnych setek: $${n} = ${Math.floor(n / 100)} \\cdot 100 + ${n % 100}$, więc wiek $${Math.floor(n / 100)} + 1 = ${c}$ (lata $${(c - 1) * 100 + 1}$–$${c * 100}$).`,
    ],
  );
}

function graniceWieku(r) {
  const c = r.int(10, 21);
  const pierwszy = r.chance(0.5);
  const odp = pierwszy ? (c - 1) * 100 + 1 : c * 100;
  return zad(
    `Wiek ${rzT(rzym(c))} to okres, który ma swój pierwszy i ostatni rok. Podaj ${pierwszy ? "pierwszy" : "ostatni"} rok tego wieku (cyframi arabskimi).`,
    [pole("rok", pierwszy ? "Pierwszy rok wieku" : "Ostatni rok wieku")],
    { rok: q(odp) },
    `$${odp}$`,
    [
      `Zamieniamy numer wieku: ${rzT(rzym(c))} to $${c}$.`,
      `Wiek o numerze $${c}$ obejmuje lata od $(${c} - 1) \\cdot 100 + 1 = ${(c - 1) * 100 + 1}$ do $${c} \\cdot 100 = ${c * 100}$.`,
      `Szukany rok to ${pierwszy ? "pierwszy" : "ostatni"}: $${odp}$.`,
    ],
  );
}

const BLEDNE_RZYM = [
  ["IIII", "cztery razy z rzędu $\\text{I}$ – liczbę $4$ zapisujemy $\\text{IV}$"],
  ["VIIII", "cztery razy z rzędu $\\text{I}$ – liczbę $9$ zapisujemy $\\text{IX}$"],
  ["XXXX", "cztery razy z rzędu $\\text{X}$ – liczbę $40$ zapisujemy $\\text{XL}$"],
  ["CCCC", "cztery razy z rzędu $\\text{C}$ – liczbę $400$ zapisujemy $\\text{CD}$"],
  ["VV", "znak $\\text{V}$ nigdy się nie powtarza (dwa razy $5$ to $\\text{X}$)"],
  ["LL", "znak $\\text{L}$ nigdy się nie powtarza (dwa razy $50$ to $\\text{C}$)"],
  ["DD", "znak $\\text{D}$ nigdy się nie powtarza (dwa razy $500$ to $\\text{M}$)"],
  ["IC", "fragment $\\text{IC}$ jest błędny: $\\text{I}$ wolno odejmować tylko od $\\text{V}$ i $\\text{X}$ (liczbę $99$ zapisujemy $\\text{XCIX}$)"],
  ["IL", "fragment $\\text{IL}$ jest błędny: $\\text{I}$ wolno odejmować tylko od $\\text{V}$ i $\\text{X}$ (liczbę $49$ zapisujemy $\\text{XLIX}$)"],
  ["VX", "fragment $\\text{VX}$ jest błędny: znaku $\\text{V}$ nigdy się nie odejmuje"],
  ["XM", "fragment $\\text{XM}$ jest błędny: $\\text{X}$ wolno odejmować tylko od $\\text{L}$ i $\\text{C}$ (liczbę $990$ zapisujemy $\\text{CMXC}$)"],
  ["XD", "fragment $\\text{XD}$ jest błędny: $\\text{X}$ wolno odejmować tylko od $\\text{L}$ i $\\text{C}$ (liczbę $490$ zapisujemy $\\text{CDXC}$)"],
  ["LC", "fragment $\\text{LC}$ jest błędny: znaku $\\text{L}$ nigdy się nie odejmuje"],
  ["DM", "fragment $\\text{DM}$ jest błędny: znaku $\\text{D}$ nigdy się nie odejmuje"],
];

function poprawnyZapisRzymski(r) {
  const { dobry, bledy } = probuj(() => {
    const dobry = rzym(r.int(14, 3999));
    if (dobry.length < 4) return null;
    const wybrane = r.shuffle(BLEDNE_RZYM).slice(0, 3);
    const bledy = wybrane.map(([z, powod]) => {
      const przedrostek = r.pick(["", "", "M", "MC", "XX", "CX"]);
      return { s: przedrostek + z, powod };
    });
    if (bledy.some((b) => poprawnyRzym(b.s)) || new Set([dobry, ...bledy.map((b) => b.s)]).size !== 4) return null;
    return { dobry, bledy };
  });
  const m = probuj(() => mieszaj(r, rzT(dobry), bledy.map((b) => rzT(b.s))));
  return zad(
    "Który z podanych zapisów jest poprawnym zapisem liczby w systemie rzymskim?",
    [polew("zapis", "Poprawny zapis", m.opcje)],
    { zapis: m.ind },
    rzT(dobry),
    [
      "Zasady: znaki $\\text{I}$, $\\text{X}$, $\\text{C}$, $\\text{M}$ powtarzamy najwyżej trzy razy z rzędu; $\\text{V}$, $\\text{L}$, $\\text{D}$ nie powtarzamy; odejmować wolno tylko w parach $\\text{IV}$, $\\text{IX}$, $\\text{XL}$, $\\text{XC}$, $\\text{CD}$, $\\text{CM}$.",
      ...bledy.map((b) => `${rzT(b.s)} – ${b.powod}.`),
      `Poprawny jest ${rzT(dobry)}: to liczba $${zRzym(dobry)}$.`,
    ],
  );
}

function liczbyRzymskie(r) {
  const w = r.int(0, 99);
  if (w < 22) return rzymNaArabski(r);
  if (w < 52) return arabskiNaRzym(r);
  if (w < 66) return wiekZRoku(r);
  if (w < 78) return rzymskiRokNaWiek(r);
  if (w < 88) return graniceWieku(r);
  return poprawnyZapisRzymski(r);
}

// --- 2. Wartość cyfry w liczbie, układanie liczb z cyfr

const MIEJSCE_DOP = ["jedności", "dziesiątek", "setek", "tysięcy", "dziesiątek tysięcy", "setek tysięcy"];
const MIEJSCE_UL = ["dziesiątych", "setnych", "tysięcznych"];

/** Zapis liczby z cyfr (część całkowita i ułamkowa) w TeX-u; pod – { czesc: "cal" | "ul", i } – cyfra do podkreślenia. */
function skladCyfry(cal, ul, pod = null) {
  const podk = (czesc, i, d) => (pod && pod.czesc === czesc && pod.i === i ? `\\underline{${d}}` : String(d));
  const c = cal.map((d, i) => podk("cal", i, d));
  let s = "";
  c.forEach((d, i) => {
    s += d;
    const zostalo = c.length - 1 - i;
    if (c.length >= 5 && zostalo > 0 && zostalo % 3 === 0) s += "\\,";
  });
  if (ul.length) s += `{,}${ul.map((d, i) => podk("ul", i, d)).join("")}`;
  return s;
}
function losujCyfry(r, L) {
  const c = Array.from({ length: L }, () => r.int(0, 9));
  c[0] = r.int(1, 9);
  return c;
}

function wartoscPodkreslonej(r) {
  if (r.chance(0.6)) {
    const { cyfry, i } = probuj(() => {
      const cyfry = losujCyfry(r, r.int(3, 6));
      const i = r.int(0, cyfry.length - 1);
      return cyfry[i] !== 0 && cyfry[i] * 10 ** (cyfry.length - 1 - i) <= 100000 ? { cyfry, i } : null;
    });
    const p = cyfry.length - 1 - i, d = cyfry[i], wart = d * 10 ** p;
    return zad(
      `Jaką wartość ma podkreślona cyfra w liczbie $${skladCyfry(cyfry, [], { czesc: "cal", i })}$?`,
      [pole("wartosc", "Wartość podkreślonej cyfry")],
      { wartosc: q(wart) },
      `$${dz(wart)}$`,
      [
        `Miejsca liczymy od prawej strony: jedności, dziesiątki, setki, tysiące, dziesiątki tysięcy… Podkreślona cyfra $${d}$ stoi na miejscu ${MIEJSCE_DOP[p]}.`,
        p === 0 ? `Na miejscu jedności cyfra znaczy tyle, ile wynosi: $${d}$.` : `Jej wartość to $${d} \\cdot ${dz(10 ** p)} = ${dz(wart)}$.`,
      ],
    );
  }
  const { cal, ul, pod } = probuj(() => {
    const cal = r.chance(0.3) ? [0] : losujCyfry(r, r.int(1, 2));
    const ul = Array.from({ length: r.int(2, 3) }, () => r.int(0, 9));
    ul[ul.length - 1] = r.int(1, 9);
    const wszystkie = [...cal.map((d, i) => ({ czesc: "cal", i, d })), ...ul.map((d, i) => ({ czesc: "ul", i, d }))].filter((x) => x.d !== 0);
    const pod = r.pick(wszystkie);
    return { cal, ul, pod };
  });
  const d = pod.czesc === "cal" ? cal[pod.i] : ul[pod.i];
  const wart = pod.czesc === "cal" ? q(d * 10 ** (cal.length - 1 - pod.i)) : q(d, 10 ** (pod.i + 1));
  const kroki = pod.czesc === "cal"
    ? [
      `Przed przecinkiem miejsca liczymy od przecinka w lewo: jedności, dziesiątki, setki. Podkreślona cyfra $${d}$ stoi na miejscu ${MIEJSCE_DOP[cal.length - 1 - pod.i]}.`,
      `Jej wartość to $${d} \\cdot ${dz(10 ** (cal.length - 1 - pod.i))} = ${dz(wart)}$.`,
    ]
    : [
      "Po przecinku miejsca są coraz mniejsze: dziesiąte, setne, tysięczne (od przecinka w prawo).",
      `Podkreślona cyfra $${d}$ stoi na miejscu ${MIEJSCE_UL[pod.i]}, więc jej wartość to $${d} \\cdot ${dz(q(1, 10 ** (pod.i + 1)))} = ${dz(wart)}$.`,
    ];
  return zad(
    `Jaką wartość ma podkreślona cyfra w liczbie $${skladCyfry(cal, ul, pod)}$?`,
    [pole("wartosc", "Wartość podkreślonej cyfry")],
    { wartosc: wart },
    `$${dz(wart)}$`,
    kroki,
  );
}

function liczbaSetek(r) {
  const cyfry = losujCyfry(r, r.int(4, 6));
  const N = Number(cyfry.join(""));
  const jednostki = [["dziesiątek", 1], ["setek", 2], ["tysięcy", 3]];
  const [nazwa, odciete] = r.pick(jednostki.filter(([, k]) => k <= cyfry.length - 2));
  const zapis = skladCyfry(cyfry, []);
  if (r.chance(0.35)) {
    const p = odciete;
    const d = cyfry[cyfry.length - 1 - p];
    return zad(
      `Jaka cyfra stoi na miejscu ${nazwa} w liczbie $${zapis}$?`,
      [pole("cyfra", `Cyfra na miejscu ${nazwa}`)],
      { cyfra: q(d) },
      `$${d}$`,
      [
        `Miejsca liczymy od prawej strony: jedności, dziesiątki, setki, tysiące… Miejsce ${nazwa} jest $${p + 1}$. od prawej.`,
        `Na tym miejscu stoi cyfra $${d}$. (To nie to samo co liczba ${nazwa} w tej liczbie – o nią można zapytać osobno.)`,
      ],
    );
  }
  const wynik = Math.floor(N / 10 ** odciete);
  return zad(
    `Ile pełnych ${nazwa} mieści się w liczbie $${zapis}$?`,
    [pole("liczba", `Liczba pełnych ${nazwa}`)],
    { liczba: q(wynik) },
    `$${dz(wynik)}$`,
    [
      `Pytamy, ile razy $${dz(10 ** odciete)}$ mieści się w liczbie $${dz(N)}$ (niepełnych porcji nie liczymy).`,
      `Wystarczy odciąć ${odciete === 1 ? "ostatnią cyfrę" : `$${odciete}$ ${lm(odciete, ["ostatnią cyfrę", "ostatnie cyfry", "ostatnich cyfr"])}`} z prawej strony – to reszta, która nie tworzy już pełnej porcji.`,
      `Zostaje liczba $${dz(wynik)}$. Sprawdzenie: $${dz(wynik)} \\cdot ${dz(10 ** odciete)} = ${dz(wynik * 10 ** odciete)}$, a to jest nie więcej niż $${dz(N)}$.`,
    ],
  );
}

function ileRazyWieksza(r) {
  const { cyfry, i, j, d } = probuj(() => {
    const L = r.int(4, 6);
    const d = r.int(1, 9);
    const i = r.int(0, L - 2), j = r.int(i + 1, L - 1);
    const cyfry = Array.from({ length: L }, () => r.intBez(0, 9, d));
    if (cyfry[0] === 0) cyfry[0] = r.intBez(1, 9, d);
    cyfry[i] = d;
    cyfry[j] = d;
    return { cyfry, i, j, d };
  });
  const L = cyfry.length;
  const pL = L - 1 - i, pP = L - 1 - j;
  const odp = 10 ** (pL - pP);
  return zad(
    `W liczbie $${skladCyfry(cyfry, [])}$ cyfra $${d}$ występuje dwa razy. Ile razy wartość lewej cyfry $${d}$ jest większa od wartości prawej cyfry $${d}$?`,
    [pole("razy", "Ile razy większa")],
    { razy: q(odp) },
    `$${dz(odp)}$`,
    [
      `Lewa cyfra $${d}$ stoi na miejscu ${MIEJSCE_DOP[pL]}, więc jej wartość to $${d} \\cdot ${dz(10 ** pL)} = ${dz(d * 10 ** pL)}$.`,
      `Prawa cyfra $${d}$ stoi na miejscu ${MIEJSCE_DOP[pP]}, więc jej wartość to ${pP === 0 ? `po prostu $${d}$` : `$${d} \\cdot ${dz(10 ** pP)} = ${dz(d * 10 ** pP)}$`}.`,
      `Dzielimy: $${dz(d * 10 ** pL)} : ${dz(d * 10 ** pP)} = ${dz(odp)}$. Można też zauważyć, że miejsca dzieli ${pL - pP} ${lm(pL - pP, ["krok", "kroki", "kroków"])} i każdy krok to mnożenie przez $10$.`,
    ],
  );
}

function permutacje(a) {
  if (a.length <= 1) return [a];
  const out = [];
  a.forEach((x, i) => {
    for (const p of permutacje([...a.slice(0, i), ...a.slice(i + 1)])) out.push([x, ...p]);
  });
  return out;
}
const LICZEBNIK_CYFR = { 3: "trzycyfrowych", 4: "czterocyfrowych", 5: "pięciocyfrowych" };
const LICZEBNIK_CYFR_1 = { 3: "trzycyfrową", 4: "czterocyfrową", 5: "pięciocyfrową" };

function ukladanieZCyfr(r) {
  const rodzaj = r.pick(["najwieksza", "najmniejsza", "najmniejsza", "ile"]);
  const k = rodzaj === "ile" ? r.pick([3, 3, 4]) : r.pick([4, 4, 5]);
  const zZerem = rodzaj === "najwieksza" ? r.chance(0.3) : r.chance(0.8);
  const cyfry = probuj(() => {
    const pula = r.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => x !== 0));
    const c = pula.slice(0, k);
    if (zZerem) c[k - 1] = 0;
    return r.shuffle(c);
  });
  const lista = cyfry.join(", ");
  const wszystkie = permutacje(cyfry).filter((p) => p[0] !== 0).map((p) => Number(p.join("")));
  if (rodzaj === "najwieksza") {
    const odp = Math.max(...wszystkie);
    const malejaco = [...cyfry].sort((a, b) => b - a);
    return zad(
      `Z cyfr $${lista}$ ułóż największą liczbę ${LICZEBNIK_CYFR_1[k]}. Każdej cyfry użyj dokładnie raz.`,
      [pole("liczba", "Największa liczba")],
      { liczba: q(odp) },
      `$${odp}$`,
      [
        "Największa liczba ma na początku największą cyfrę, potem coraz mniejsze – najcenniejsze miejsce dostaje najlepszą cyfrę.",
        `Ustawiamy cyfry malejąco: ${listaTex(malejaco)}, czyli $${odp}$.`,
      ],
    );
  }
  if (rodzaj === "najmniejsza") {
    const odp = Math.min(...wszystkie);
    const rosnaco = [...cyfry].sort((a, b) => a - b);
    const pierwsza = rosnaco.find((x) => x !== 0);
    const reszta = rosnaco.filter((x, idx) => !(x === pierwsza && idx === rosnaco.indexOf(pierwsza)));
    return zad(
      `Z cyfr $${lista}$ ułóż najmniejszą liczbę ${LICZEBNIK_CYFR_1[k]}. Każdej cyfry użyj dokładnie raz.`,
      [pole("liczba", "Najmniejsza liczba")],
      { liczba: q(odp) },
      `$${odp}$`,
      zZerem
        ? [
          "Najmniejsza liczba ma na początku najmniejszą cyfrę, ale zero nie może stać na początku – wtedy liczba straciłaby jedno miejsce i nie byłaby " + LICZEBNIK_CYFR_1[k] + ".",
          `Na początek bierzemy najmniejszą cyfrę różną od zera: $${pierwsza}$. Resztę cyfr ustawiamy rosnąco: ${listaTex(reszta)}.`,
          `Wychodzi $${odp}$.`,
        ]
        : [
          "Najmniejsza liczba ma na początku najmniejszą cyfrę, potem coraz większe.",
          `Ustawiamy cyfry rosnąco: ${listaTex(rosnaco)}, czyli $${odp}$.`,
        ],
    );
  }
  const odp = wszystkie.length;
  const czynniki = zZerem ? [k - 1, ...Array.from({ length: k - 1 }, (_, i) => k - 1 - i)] : Array.from({ length: k }, (_, i) => k - i);
  return zad(
    `Ile różnych liczb ${LICZEBNIK_CYFR[k]} można ułożyć z cyfr $${lista}$, używając każdej cyfry dokładnie raz?`,
    [pole("ile", "Liczba możliwości")],
    { ile: q(odp) },
    `$${odp}$`,
    [
      zZerem
        ? "Zero nie może stać na początku liczby, więc na pierwszym miejscu mamy o jedną możliwość mniej."
        : "Żadna z cyfr nie jest zerem, więc każda może stać na początku.",
      `Liczba możliwości na kolejnych miejscach (od lewej): ${czynniki.map((c) => `$${c}$`).join(", ")}.`,
      `Mnożymy: $${czynniki.join(" \\cdot ")} = ${odp}$.`,
      ...(k === 3 ? [`Można je wypisać: ${listaTex([...wszystkie].sort((a, b) => a - b))}.`] : []),
    ],
  );
}

function wartoscCyfry(r) {
  const w = r.int(0, 99);
  if (w < 28) return wartoscPodkreslonej(r);
  if (w < 48) return liczbaSetek(r);
  if (w < 66) return ileRazyWieksza(r);
  return ukladanieZCyfr(r);
}

// --- 3. Oś liczbowa: odczyt punktu

const LITERY = ["A", "B", "C", "D", "E", "F"];
const odstepy = (n) => `$${n}$ ${lm(n, ["odstęp", "odstępy", "odstępów"])}`;
const wypisz = (arr) => (arr.length < 2 ? arr.join("") : `${arr.slice(0, -1).join(", ")} i ${arr[arr.length - 1]}`);
const PODPOWIEDZ_ULAMEK = " Jeśli wynik jest ułamkiem zwykłym, wpisz go w postaci licznik/mianownik, np. 1/3.";

/** Dwie podpisane liczby a < b, k równych odstępów między nimi, s – długość odstępu (dziesiętna albo $\frac13$, $\frac16$). */
function ustawienieOsi(r) {
  return probuj(() => {
    const polowki = r.chance(0.25);
    const a = polowki ? q(2 * r.int(-5, 3) + 1, 2) : q(r.int(-5, 3));
    const roznica = polowki ? r.pick([1, 1, 2]) : r.pick([1, 1, 1, 2, 2, 3, 4, 5, 10]);
    const b = a.add(roznica);
    const k = r.pick([2, 4, 5, 5, 8, 10, 3, 6]);
    const s = b.sub(a).div(k);
    if (!(skonczonyDz(s) || s.d === 3 || s.d === 6)) return null;
    return { a, b, k, s };
  });
}
const wstepOsi = (a, b, k) => `Na osi liczbowej zaznaczono liczby $${dz(a)}$ i $${dz(b)}$. Odcinek między nimi podzielono na $${k}$ ${lm(k, ["równy odstęp", "równe odstępy", "równych odstępów"])}.`;
const krokOdstepu = (a, b, k, s) => `Cały odcinek ma długość $${dz(b)} - ${nawQ(a)} = ${dz(b.sub(a))}$ i jest podzielony na $${k}$ ${lm(k, ["równy odstęp", "równe odstępy", "równych odstępów"])}, więc jeden odstęp to $${dz(b.sub(a))} : ${k} = ${dz(s)}$.`;

function punktNaOsi(r, dwaPola) {
  const { a, b, k, s } = ustawienieOsi(r);
  const kier = r.pick(["prawo-a", "prawo-a", "lewo-b", "lewo-a", "prawo-b"]);
  const m = kier === "prawo-a" || kier === "lewo-b" ? r.int(1, k - 1) : r.int(1, k);
  const baza = kier.endsWith("a") ? a : b;
  const naPrawo = kier.startsWith("prawo");
  const x = naPrawo ? baza.add(s.mul(m)) : baza.sub(s.mul(m));
  const poza = kier === "lewo-a" || kier === "prawo-b";
  const trudne = !skonczonyDz(s) || !skonczonyDz(x);
  const opis = `${wstepOsi(a, b, k)} Punkt $A$ leży o ${odstepy(m)} na ${naPrawo ? "prawo" : "lewo"} od liczby $${dz(baza)}$${poza ? " (poza zaznaczonym odcinkiem)" : ""}.`;
  const krokPunktu = `Punkt $A$ leży o $${m}$ ${lm(m, ["odstęp", "odstępy", "odstępów"])} od liczby $${dz(baza)}$ w ${naPrawo ? "prawo, więc dodajemy" : "lewo, więc odejmujemy"}: $${dz(baza)} ${naPrawo ? "+" : "-"} ${m} \\cdot ${dz(s)} = ${dz(baza)} ${naPrawo ? "+" : "-"} ${dz(s.mul(m))} = ${dz(x)}$.`;
  const kroki = [
    "Żeby odczytać liczbę z osi, trzeba wiedzieć, ile warta jest jedna kreska (jeden odstęp). Liczymy odstępy, a nie kreski.",
    krokOdstepu(a, b, k, s),
    krokPunktu,
  ];
  if (dwaPola) {
    return zad(
      `${opis} Ile wynosi długość jednego odstępu i jaką liczbę przedstawia punkt $A$?${trudne ? PODPOWIEDZ_ULAMEK : ""}`,
      [pole("odstep", "Długość jednego odstępu"), pole("punkt", "Liczba przedstawiona przez punkt $A$")],
      { odstep: s, punkt: x },
      `jeden odstęp: $${dz(s)}$, punkt $A$: $${dz(x)}$`,
      kroki,
    );
  }
  return zad(
    `${opis} Jaką liczbę przedstawia punkt $A$?${trudne ? PODPOWIEDZ_ULAMEK : ""}`,
    [pole("punkt", "Liczba przedstawiona przez punkt $A$")],
    { punkt: x },
    `$${dz(x)}$`,
    kroki,
  );
}

function ileOdstepow(r) {
  const { a, b, k, s } = ustawienieOsi(r);
  const m = r.int(1, k - 1);
  const x = a.add(s.mul(m));
  return zad(
    `${wstepOsi(a, b, k)} Punkt $A$ przedstawia liczbę $${dz(x)}$. Ile odstępów dzieli punkt $A$ od liczby $${dz(a)}$?`,
    [pole("ile", "Liczba odstępów")],
    { ile: q(m) },
    `$${m}$`,
    [
      krokOdstepu(a, b, k, s),
      `Punkt $A$ jest oddalony od liczby $${dz(a)}$ o $${dz(x)} - ${nawQ(a)} = ${dz(x.sub(a))}$.`,
      `Sprawdzamy, ile razy jeden odstęp mieści się w tej odległości: $${dz(x.sub(a))} : ${dz(s)} = ${m}$.`,
    ],
  );
}

function punktyRownoodlegle(r) {
  const { n, s, start, i, j, t } = probuj(() => {
    const n = r.int(4, 6);
    const s = r.pick([q(1, 2), q(1), q(1), q(3, 2), q(2), q(5, 2), q(3), q(1, 4), q(4), q(5), q(3, 4), q(1, 5)]);
    const start = q(r.int(-10, 4)).add(r.pick([0, 0, 0, q(1, 2)]));
    const i = r.int(0, n - 3), j = r.int(i + 2, n - 1);
    const inne = Array.from({ length: n }, (_, x) => x).filter((x) => x !== i && x !== j);
    return { n, s, start, i, j, t: r.pick(inne) };
  });
  const wart = (idx) => start.add(s.mul(idx));
  const L = LITERY.slice(0, n).map((x) => `$${x}$`);
  const roznica = wart(j).sub(wart(i));
  const baza = Math.abs(t - i) <= Math.abs(t - j) ? i : j;
  const d = Math.abs(t - baza);
  const naPrawo = t > baza;
  const x = wart(t);
  return zad(
    `Punkty ${wypisz(L)} leżą na osi liczbowej w równych odstępach, w tej kolejności od lewej do prawej. Punkt $${LITERY[i]}$ przedstawia liczbę $${dz(wart(i))}$, a punkt $${LITERY[j]}$ liczbę $${dz(wart(j))}$. Jaką liczbę przedstawia punkt $${LITERY[t]}$?`,
    [pole("punkt", `Liczba przedstawiona przez punkt $${LITERY[t]}$`)],
    { punkt: x },
    `$${dz(x)}$`,
    [
      `Od punktu $${LITERY[i]}$ do punktu $${LITERY[j]}$ są $${j - i}$ ${lm(j - i, ["odstęp", "odstępy", "odstępów"])}, a przedstawiane przez nie liczby różnią się o $${dz(wart(j))} - ${nawQ(wart(i))} = ${dz(roznica)}$.`,
      `Jeden odstęp to $${dz(roznica)} : ${j - i} = ${dz(s)}$.`,
      `Punkt $${LITERY[t]}$ leży o $${d}$ ${lm(d, ["odstęp", "odstępy", "odstępów"])} na ${naPrawo ? "prawo" : "lewo"} od punktu $${LITERY[baza]}$, więc: $${dz(wart(baza))} ${naPrawo ? "+" : "-"} ${d} \\cdot ${dz(s)} = ${dz(wart(baza))} ${naPrawo ? "+" : "-"} ${dz(s.mul(d))} = ${dz(x)}$.`,
    ],
  );
}

function odczytZOsi(r) {
  const w = r.int(0, 99);
  if (w < 30) return punktNaOsi(r, false);
  if (w < 50) return punktNaOsi(r, true);
  if (w < 64) return ileOdstepow(r);
  return punktyRownoodlegle(r);
}

// --- 4. Odległość, środek odcinka, porównywanie liczb

/** Liczba do zadań o osi: całkowita, dziesiętna (1–2 miejsca) albo ułamek zwykły (mianownik 2, 3, 4, 5, 6, 8). */
function losujNaOsi(r, rodzaj) {
  return probuj(() => {
    if (rodzaj === "calk") return q(r.int(-12, 12));
    if (rodzaj === "dz") {
      const v = q(r.int(-60, 60), r.pick([10, 10, 100]));
      return v.calkowita ? null : v;
    }
    const v = q(r.int(-11, 11), r.pick([2, 3, 4, 5, 6, 8]));
    return v.calkowita ? null : v;
  });
}
const RODZAJE_NA_OSI = ["calk", "calk", "calk", "dz", "ulamek"];
const podpowiedzUlamka = (v) => (skonczonyDz(v) ? "" : " Wynik wpisz jako ułamek zwykły, np. 5/6.");

function odlegloscNaOsi(r) {
  const rodzaj = r.pick(RODZAJE_NA_OSI);
  const { A, B } = probuj(() => {
    const A = losujNaOsi(r, rodzaj), B = losujNaOsi(r, rodzaj);
    const roznica = A.sub(B);
    return !A.eq(B) && Math.abs(Number(roznica)) >= 1.5 && ladna(roznica.n < 0 ? roznica.neg() : roznica) && (A.ujemna || B.ujemna) ? { A, B } : null;
  });
  const u = rodzaj === "ulamek";
  const hi = A.cmp(B) > 0 ? A : B, lo = A.cmp(B) > 0 ? B : A;
  const w = hi.sub(lo);
  const kontekst = rodzaj === "calk" && r.chance(0.35) ? r.pick(["wzrost", "spadek"]) : null;
  let tresc, pola;
  if (kontekst === "wzrost") {
    tresc = `Rano termometr pokazywał $${lo.n}$ °C, a w południe $${hi.n}$ °C. O ile stopni wzrosła temperatura?`;
    pola = [pole("odl", "Wzrost temperatury (w °C)")];
  } else if (kontekst === "spadek") {
    tresc = `W południe termometr pokazywał $${hi.n}$ °C, a w nocy $${lo.n}$ °C. O ile stopni spadła temperatura?`;
    pola = [pole("odl", "Spadek temperatury (w °C)")];
  } else {
    tresc = r.pick([
      `Oblicz odległość między punktami $A = ${fm(A, u)}$ i $B = ${fm(B, u)}$ na osi liczbowej.`,
      `Punkty $A$ i $B$ leżą na osi liczbowej i mają współrzędne $${fm(A, u)}$ oraz $${fm(B, u)}$. Jaka jest odległość między tymi punktami?`,
    ]) + podpowiedzUlamka(w);
    pola = [pole("odl", "Odległość $|AB|$")];
  }
  const rozneStrony = lo.ujemna && !hi.ujemna;
  return zad(
    tresc,
    pola,
    { odl: w },
    `$${fm(w, u)}$${kontekst ? " °C" : ""}`,
    [
      "Odległość (różnica) to większa liczba minus mniejsza – wtedy wynik nie wyjdzie ujemny.",
      `Większa jest liczba $${fm(hi, u)}$, mniejsza $${fm(lo, u)}$: $${fm(hi, u)} - ${nawQ(lo, u)} = ${lo.ujemna ? `${fm(hi, u)} + ${fm(lo.neg(), u)} = ` : ""}${fm(w, u)}$.`,
      rozneStrony
        ? `Liczby leżą po różnych stronach zera, więc ich odległości od zera dodajemy: $${fm(hi, u)} + ${fm(lo.neg(), u)} = ${fm(w, u)}$.`
        : lo.ujemna
          ? `Obie liczby leżą po tej samej stronie zera (po lewej), więc ich odległości od zera odejmujemy.`
          : "Obie liczby leżą po tej samej stronie zera, więc odejmujemy.",
    ],
  );
}

/** Suma a + b w TeX-u ze wspólnym mianownikiem, gdy oba ułamki są dodatnie i mają różne mianowniki. */
function sumaTex(a, b, u) {
  const S = a.add(b);
  if (u && !a.ujemna && !b.ujemna && a.d !== b.d) {
    const L = nww(a.d, b.d);
    return `${a.tex()} + ${b.tex()} = ${fr(a.n * (L / a.d), L)} + ${fr(b.n * (L / b.d), L)} = ${S.tex()}`;
  }
  return `${fm(a, u)} + ${nawQ(b, u)} = ${fm(S, u)}`;
}

function srodekOdcinka(r) {
  const rodzaj = r.pick(RODZAJE_NA_OSI);
  const { a, b, m } = probuj(() => {
    const x = losujNaOsi(r, rodzaj), y = losujNaOsi(r, rodzaj);
    if (x.eq(y)) return null;
    const a = x.cmp(y) < 0 ? x : y, b = x.cmp(y) < 0 ? y : x;
    const m = a.add(b).div(2);
    return ladna(m) && (rodzaj !== "ulamek" || (!a.ujemna && !b.ujemna) || r.chance(0.3)) ? { a, b, m } : null;
  });
  const u = rodzaj === "ulamek";
  return zad(
    `Jaka liczba leży dokładnie pośrodku między liczbami $${fm(a, u)}$ i $${fm(b, u)}$ na osi liczbowej?${podpowiedzUlamka(m)}`,
    [pole("srodek", "Liczba pośrodku")],
    { srodek: m },
    `$${fm(m, u)}$`,
    [
      "Liczba pośrodku jest średnią obu liczb: dodajemy je i dzielimy przez $2$.",
      `Suma: $${sumaTex(a, b, u)}$.`,
      `Dzielimy przez $2$: $${fm(a.add(b), u)} : 2 = ${fm(m, u)}$.`,
      `Sprawdzenie: od $${fm(a, u)}$ do $${fm(m, u)}$ jest $${fm(m.sub(a), u)}$, a od $${fm(m, u)}$ do $${fm(b, u)}$ też $${fm(b.sub(m), u)}$.`,
    ],
  );
}

function drugiKoniecOdcinka(r) {
  const rodzaj = r.pick(["calk", "calk", "dz"]);
  const { a, m, b } = probuj(() => {
    const a = losujNaOsi(r, rodzaj), m = losujNaOsi(r, rodzaj);
    const b = m.mul(2).sub(a);
    return !a.eq(m) && ladna(b) && Math.abs(Number(b)) < 40 ? { a, m, b } : null;
  });
  const d = m.sub(a);
  return zad(
    `Punkt $M$ jest środkiem odcinka $AB$. Punkt $A$ przedstawia liczbę $${dz(a)}$, a punkt $M$ liczbę $${dz(m)}$. Jaką liczbę przedstawia punkt $B$?`,
    [pole("b", "Liczba przedstawiona przez punkt $B$")],
    { b },
    `$${dz(b)}$`,
    [
      `Środek jest tak samo daleko od obu końców. Od $A$ do $M$ jest $${dz(m)} - ${nawQ(a)} = ${dz(d)}$ (to ${d.ujemna ? "krok w lewo" : "krok w prawo"}).`,
      `Od $M$ do $B$ jest tyle samo, w tę samą stronę: $${dz(m)} ${d.ujemna ? "-" : "+"} ${dz(d.ujemna ? d.neg() : d)} = ${dz(b)}$.`,
      `Sprawdzenie ze średnią: $(${dz(a)} + ${nawQ(b)}) : 2 = ${dz(a.add(b))} : 2 = ${dz(m)}$.`,
    ],
  );
}

/** Jedna liczba do porównania: { v, tex }. */
function liczbaDoPorownania(r, rodzaj) {
  return probuj(() => {
    if (rodzaj === "calk") { const v = q(r.int(-5, 5)); return { v, tex: dz(v) }; }
    if (rodzaj === "dz") {
      const v = q(r.int(-35, 35), r.pick([10, 100]));
      return v.calkowita ? null : { v, tex: dz(v) };
    }
    const v = q(r.int(-14, 14), r.pick([2, 4, 5, 8]));
    return v.calkowita || Math.abs(Number(v)) > 3.5 ? null : { v, tex: v.tex() };
  });
}

function porownanieLiczb(r) {
  const tryb = r.pick(["najwieksza", "najmniejsza", "najmniejsza odleglosc", "najwieksza"]);
  const liczby = probuj(() => {
    const rodzaje = ["calk", "dz", "dz", "ulamek", "ulamek"];
    const lista = [];
    if (r.chance(0.6)) {
      // para liczb bliskich sobie: ułamek zwykły i dziesiętny, np. 3/8 i 0,4
      const u = liczbaDoPorownania(r, "ulamek");
      const bliska = q(Math.round(Number(u.v) * 10) + (r.chance(0.5) ? 0 : r.pick([-1, 1])), 10);
      if (!bliska.calkowita && !bliska.eq(u.v)) lista.push(u, { v: bliska, tex: dz(bliska) });
    }
    while (lista.length < 4) lista.push(liczbaDoPorownania(r, r.pick(rodzaje)));
    const wart = lista.map((x) => x.v);
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) if (Math.abs(Number(wart[i].sub(wart[j]))) < 0.03) return null;
    if (tryb === "najmniejsza odleglosc") {
      const odl = wart.map((x) => (x.ujemna ? x.neg() : x));
      const najm = odl.reduce((m, x) => (x.cmp(m) < 0 ? x : m));
      if (odl.filter((x) => x.eq(najm)).length !== 1) return null;
    }
    return r.shuffle(lista);
  });
  const klucz = (x) => (tryb === "najmniejsza odleglosc" ? (x.v.ujemna ? x.v.neg() : x.v) : x.v);
  const wybrany = liczby.reduce((m, x) => {
    const c = klucz(x).cmp(klucz(m));
    return tryb === "najwieksza" ? (c > 0 ? x : m) : (c < 0 ? x : m);
  });
  const opcje = liczby.map((x) => `$${x.tex}$`);
  const posort = [...liczby].sort((x, y) => x.v.cmp(y.v));
  const pytanie = tryb === "najwieksza" ? "Która z podanych liczb jest największa?" : tryb === "najmniejsza" ? "Która z podanych liczb jest najmniejsza?" : "Która z podanych liczb leży najbliżej zera na osi liczbowej?";
  const zwykle = liczby.filter((x) => x.tex.includes("frac"));
  const maUjemne = liczby.some((x) => x.v.ujemna);
  const kroki = [];
  if (zwykle.length) kroki.push(`Zamieniamy ułamki zwykłe na dziesiętne (licznik dzielimy przez mianownik): ${zwykle.map((x) => `$${x.tex} = ${dz(x.v)}$`).join(", ")}.`);
  else kroki.push("Wszystkie liczby są zapisane dziesiętnie, więc od razu je porównujemy.");
  if (tryb === "najmniejsza odleglosc") {
    kroki.push(`Odległość od zera to liczba bez znaku: ${liczby.map((x) => `$|${dz(x.v)}| = ${dz(x.v.ujemna ? x.v.neg() : x.v)}$`).join(", ")}.`);
    kroki.push(`Najmniejsza odległość to $${dz(klucz(wybrany))}$, czyli najbliżej zera leży liczba $${wybrany.tex}$.`);
  } else {
    kroki.push(`Układamy od najmniejszej do największej: $${posort.map((x) => dz(x.v)).join(" < ")}$.${maUjemne ? " Wśród liczb ujemnych większa jest ta, która leży bliżej zera (np. $-0{,}5 > -2$)." : ""}`);
    kroki.push(`${tryb === "najwieksza" ? "Największa" : "Najmniejsza"} jest liczba $${wybrany.tex}$.`);
  }
  const m = { opcje, ind: liczby.indexOf(wybrany) };
  return zad(
    pytanie,
    [polew("liczba", "Liczba", m.opcje)],
    { liczba: m.ind },
    `$${wybrany.tex}$`,
    kroki,
  );
}

function liczbyCalkowiteMiedzy(r) {
  const { a, b } = probuj(() => {
    const x = r.chance(0.5) ? q(r.int(-9, 4)) : q(r.int(-17, 7), 2);
    const y = r.chance(0.5) ? q(r.int(-3, 9)) : q(r.int(-5, 19), 2);
    const dl = Number(y.sub(x));
    return dl >= 2.5 && dl <= 12 && (!x.calkowita || !y.calkowita || r.chance(0.3)) ? { a: x, b: y } : null;
  });
  const od = Math.floor(Number(a)) + 1, doo = Math.ceil(Number(b)) - 1;
  const ile_ = doo - od + 1;
  const lista = Array.from({ length: ile_ }, (_, i) => od + i);
  return zad(
    `Ile liczb całkowitych leży między liczbami $${dz(a)}$ i $${dz(b)}$ na osi liczbowej? (Końców odcinka nie liczymy, nawet jeśli są całkowite.)`,
    [pole("ile", "Liczba liczb całkowitych")],
    { ile: q(ile_) },
    `$${ile_}$`,
    [
      `Najmniejsza liczba całkowita większa od $${dz(a)}$ to $${od}$ (liczby ujemne: im bliżej zera, tym większa).`,
      `Największa liczba całkowita mniejsza od $${dz(b)}$ to $${doo}$.`,
      `Są to: ${listaTex(lista)} – razem $${ile_}$ ${lm(ile_, ["liczba", "liczby", "liczb"])}. (Liczymy też zero, jeśli leży w przedziale.)`,
    ],
  );
}

function odlegloscSrodekPorownanie(r) {
  const w = r.int(0, 99);
  if (w < 28) return odlegloscNaOsi(r);
  if (w < 50) return srodekOdcinka(r);
  if (w < 62) return drugiKoniecOdcinka(r);
  if (w < 90) return porownanieLiczb(r);
  return liczbyCalkowiteMiedzy(r);
}

// --- 5. Rozwinięcia dziesiętne: skończone i okresowe

const MIAN_SKONCZONE_ROZW = [2, 4, 5, 8, 10, 16, 20, 25, 40];
const MIAN_OKRESOWE_ROZW = [3, 6, 7, 9, 11, 12, 14, 15, 18, 21, 22, 24, 30, 33, 35, 36];
const PORZADKOWE = ["", "pierwsza", "druga", "trzecia", "czwarta", "piąta", "szósta"];

/** Ułamek właściwy o mianowniku d (nieskracalny), a przy rozszerz – rozszerzony o 2 albo 3, np. 6/15. */
function ulamekRozwiniecia(r, d, rozszerz) {
  const p = probuj(() => { const x = r.int(1, d - 1); return nwd(x, d) === 1 ? x : null; });
  const m = rozszerz ? r.pick([2, 3]) : 1;
  return { a: p * m, b: d * m };
}
const skonczoneUlamek = (a, b) => rozklad(b / nwd(a, b)).every((p) => p === 2 || p === 5);

function opisSkonczonosci(x) {
  const g = nwd(x.a, x.b), a = x.a / g, b = x.b / g;
  const rt = rozkladTex(b);
  const zapis = rt === String(b) ? `$${b}$` : `$${b} = ${rt}$`;
  const rw = rozwiniecie(a, b);
  const skrocenie = g > 1 ? `skracamy do $${fr(a, b)}$, ` : "";
  if (skonczoneUlamek(a, b)) return `$${fr(x.a, x.b)}$: ${skrocenie}mianownik ${zapis} ma tylko czynniki $2$ i $5$ – rozwinięcie skończone ($${dzOkres(rw)}$)`;
  const zly = rozklad(b).find((p) => p !== 2 && p !== 5);
  return `$${fr(x.a, x.b)}$: ${skrocenie}mianownik ${zapis} ma czynnik $${zly}$ – rozwinięcie okresowe ($${dzOkres(rw)}$)`;
}

function skonczoneCzyOkresowe(r) {
  const chceSkonczone = r.chance(0.5);
  const lista = probuj(() => {
    const dobra = chceSkonczone
      ? ulamekRozwiniecia(r, r.pick(MIAN_SKONCZONE_ROZW), r.chance(0.4))
      : ulamekRozwiniecia(r, r.pick(MIAN_OKRESOWE_ROZW), r.chance(0.4));
    const zle = Array.from({ length: 3 }, () => (chceSkonczone
      ? ulamekRozwiniecia(r, r.pick(MIAN_OKRESOWE_ROZW), r.chance(0.3))
      : ulamekRozwiniecia(r, r.pick(MIAN_SKONCZONE_ROZW), r.chance(0.5))));
    const wszystkie = [dobra, ...zle];
    if (wszystkie.some((x) => x.b > 60)) return null;
    const wart = wszystkie.map((x) => q(x.a, x.b));
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) if (wart[i].eq(wart[j])) return null;
    return wszystkie;
  });
  const dobra = lista[0];
  const tx = (x) => `$${fr(x.a, x.b)}$`;
  const m = probuj(() => mieszaj(r, tx(dobra), lista.slice(1).map(tx)));
  return zad(
    chceSkonczone ? "Która z podanych liczb ma skończone rozwinięcie dziesiętne?" : "Która z podanych liczb ma nieskończone rozwinięcie okresowe?",
    [polew("liczba", "Liczba", m.opcje)],
    { liczba: m.ind },
    tx(dobra),
    [
      "Najpierw skracamy ułamek, potem rozkładamy mianownik na czynniki pierwsze. Same $2$ i $5$ – rozwinięcie skończone; choć jeden inny czynnik (np. $3$ lub $7$) – okresowe.",
      ...m.opcje.map((o) => `${opisSkonczonosci(lista.find((x) => tx(x) === o))}.`),
    ],
  );
}

const ULAMKI_OKRESOWE = [];
for (const b of [3, 6, 7, 9, 11, 12, 13, 14, 15, 18, 21, 22, 24, 26, 27, 30, 33, 35, 36, 37, 39]) {
  for (let a = 1; a < b; a++) {
    if (nwd(a, b) !== 1) continue;
    const rw = rozwiniecie(a, b);
    if (rw.okres.length >= 1 && rw.okres.length <= 6 && rw.pre.length <= 2) ULAMKI_OKRESOWE.push({ a, b });
  }
}

/** Czy pre i okres są zapisane „minimalnie” (okres nie jest powtórzeniem krótszego, a ostatnia cyfra pre różni się od ostatniej cyfry okresu). */
function minimalnyOkres(pre, okres) {
  for (let d = 1; d < okres.length; d++) if (okres.length % d === 0 && okres.slice(0, d).repeat(okres.length / d) === okres) return false;
  return !pre || pre.slice(-1) !== okres.slice(-1);
}

/** Losuje liczbę o rozwinięciu okresowym: albo jako ułamek, albo wprost jako zapis 0,12(345). Zwraca { rw, tekst, zUlamka }. */
function losujRozwiniecieOkresowe(r, maxOkres = 4) {
  if (r.chance(0.5)) {
    const x = probuj(() => {
      const c = r.pick(ULAMKI_OKRESOWE);
      return rozwiniecie(c.a, c.b).okres.length <= maxOkres ? c : null;
    });
    const rw = rozwiniecie(x.a, x.b);
    return { rw, tex: fr(x.a, x.b), zUlamka: x };
  }
  const { pre, okres } = probuj(() => {
    const pre = Array.from({ length: r.pick([0, 0, 1, 2]) }, () => r.int(0, 9)).join("");
    const okres = Array.from({ length: r.int(2, maxOkres) }, () => r.int(0, 9)).join("");
    return minimalnyOkres(pre, okres) && !/^9+$/.test(okres) ? { pre, okres } : null;
  });
  const rw = { cal: 0, pre, okres };
  return { rw, tex: `0{,}${pre}(${okres})`, zUlamka: null };
}
const wstepRozwiniecia = (los) => (los.zUlamka
  ? `Dzielimy licznik przez mianownik: $${los.zUlamka.a} : ${los.zUlamka.b} = ${dzOkres(los.rw)}$ (reszty zaczynają się powtarzać, więc cyfry też).`
  : `Zapis $${los.tex}$ oznacza, że cyfry w nawiasie powtarzają się w nieskończoność.`);

function cyfraNaMiejscu(r) {
  const los = losujRozwiniecieOkresowe(r, 4);
  const { rw } = los;
  const p = rw.pre.length, L = rw.okres.length;
  const n = probuj(() => { const x = r.int(11, 100); return x > p + L + 2 ? x : null; });
  const cyfra = cyfraRozwiniecia(rw, n);
  const x = n - p, t = Math.floor(x / L), s = x % L;
  const tresc = los.zUlamka
    ? `Rozwinięcie dziesiętne liczby $${los.tex}$ jest nieskończone i okresowe. Jaka cyfra stoi na $${n}$. miejscu po przecinku?`
    : `Liczba ma rozwinięcie dziesiętne $${los.tex}$ (cyfry w nawiasie powtarzają się w nieskończoność). Jaka cyfra stoi na $${n}$. miejscu po przecinku?`;
  return zad(
    tresc,
    [pole("cyfra", `Cyfra na $${n}$. miejscu`)],
    { cyfra: q(cyfra) },
    `$${cyfra}$`,
    [
      wstepRozwiniecia(los),
      `Okres to $${rw.okres}$ i ma $${L}$ ${lm(L, ["cyfrę", "cyfry", "cyfr"])}.${p ? ` Przed okresem stoi jeszcze $${p}$ ${lm(p, ["cyfra", "cyfry", "cyfr"])} ($${rw.pre}$), więc w okresie liczymy dopiero od miejsca $${p + 1}$. Odliczamy: $${n} - ${p} = ${x}$.` : ""}`,
      `Dzielimy numer miejsca przez długość okresu: $${x} : ${L} = ${t}$ ${s ? `i reszta $${s}$` : "bez reszty"}.`,
      s
        ? `Reszta $${s}$ oznacza, że szukana cyfra jest ${PORZADKOWE[s]} cyfrą okresu: $${rw.okres[s - 1]}$.`
        : `Reszta $0$ oznacza ostatnią cyfrę okresu: $${rw.okres[L - 1]}$.`,
    ],
  );
}

function sumaCyfrRozwiniecia(r) {
  const los = losujRozwiniecieOkresowe(r, 3);
  const { rw } = los;
  const p = rw.pre.length, L = rw.okres.length;
  const n = probuj(() => { const x = r.int(8, 30); return x > p + L ? x : null; });
  const cyfry = Array.from({ length: n }, (_, i) => cyfraRozwiniecia(rw, i + 1));
  const suma = cyfry.reduce((a, b) => a + b, 0);
  const sumaCyfr = (s) => [...s].reduce((a, c) => a + Number(c), 0);
  const x = n - p, t = Math.floor(x / L), s = x % L;
  const czesci = [];
  if (p) czesci.push(sumaCyfr(rw.pre));
  if (t) czesci.push(`${t} \\cdot ${sumaCyfr(rw.okres)}`);
  if (s) czesci.push(sumaCyfr(rw.okres.slice(0, s)));
  return zad(
    `Oblicz sumę pierwszych $${n}$ cyfr po przecinku w rozwinięciu dziesiętnym ${los.zUlamka ? `liczby $${los.tex}$` : `$${los.tex}$ (cyfry w nawiasie powtarzają się w nieskończoność)`}.`,
    [pole("suma", "Suma cyfr")],
    { suma: q(suma) },
    `$${suma}$`,
    [
      wstepRozwiniecia(los),
      `Okres to $${rw.okres}$ (${L} ${lm(L, ["cyfra", "cyfry", "cyfr"])}), suma cyfr okresu to $${[...rw.okres].join(" + ")} = ${sumaCyfr(rw.okres)}$.${p ? ` Przed okresem jest $${rw.pre}$ (suma $${sumaCyfr(rw.pre)}$).` : ""}`,
      `Na okresy zostaje ${p ? `$${n} - ${p} = ${x}$` : `$${x}$`} cyfr: $${x} : ${L} = ${t}$ ${s ? `i reszta $${s}$` : "bez reszty"}, czyli $${t}$ ${lm(t, ["pełny okres", "pełne okresy", "pełnych okresów"])}${s ? ` i jeszcze $${s}$ ${lm(s, ["cyfra", "cyfry", "cyfr"])} z początku okresu ($${rw.okres.slice(0, s)}$)` : ""}.`,
      `Suma: $${czesci.join(" + ")} = ${suma}$.`,
    ],
  );
}

function dlugoscOkresu(r) {
  const c = r.pick(ULAMKI_OKRESOWE.filter(({ b }) => [7, 11, 13, 21, 27, 33, 37, 39, 14, 35, 22, 26].includes(b)));
  const rw = rozwiniecie(c.a, c.b);
  const L = rw.okres.length;
  const start = rw.pre.length;
  const reszty = rw.reszty;
  const powt = reszty[start];
  return zad(
    `Ile cyfr ma okres w rozwinięciu dziesiętnym liczby $${fr(c.a, c.b)}$?`,
    [pole("dlugosc", "Liczba cyfr okresu")],
    { dlugosc: q(L) },
    `$${L}$ (okres $${rw.okres}$)`,
    [
      `Dzielimy pisemnie $${c.a} : ${c.b}$ i zapisujemy reszty po kolei: ${listaTex(reszty)}.`,
      `Po reszcie $${reszty[reszty.length - 1]}$ znowu pojawia się reszta $${powt}$, którą już mieliśmy – od tego miejsca wszystko się powtarza.`,
      `Cyfry z tych powtarzających się reszt tworzą okres: $${dzOkres(rw)}$. Okres to $${rw.okres}$, czyli $${L}$ ${lm(L, ["cyfra", "cyfry", "cyfr"])}.`,
    ],
  );
}

function ileCyfrSkonczone(r) {
  const { a, b } = probuj(() => {
    const d = r.pick([8, 16, 20, 25, 40, 5, 4]);
    const x = r.int(1, d * 2);
    return nwd(x, d) === 1 && x !== d ? { a: x, b: d } : null;
  });
  const rw = rozwiniecie(a, b);
  const k = rw.pre.length;
  return zad(
    `Zapisz liczbę $${fr(a, b)}$ w postaci rozwinięcia dziesiętnego. Ile cyfr stoi po przecinku?`,
    [pole("ile", "Liczba cyfr po przecinku")],
    { ile: q(k) },
    `$${k}$ ($${fr(a, b)} = ${dz(q(a, b))}$)`,
    [
      `Dzielimy licznik przez mianownik: $${a} : ${b}$. Kolejne cyfry po przecinku: ${listaTex(rw.pre.split(""))} – i reszta wychodzi $0$, więc rozwinięcie jest skończone.`,
      `$${fr(a, b)} = ${dz(q(a, b))}$ – po przecinku jest $${k}$ ${lm(k, ["cyfra", "cyfry", "cyfr"])}.`,
    ],
  );
}

function rozwinieciaDziesietne(r) {
  const w = r.int(0, 99);
  if (w < 30) return skonczoneCzyOkresowe(r);
  if (w < 62) return cyfraNaMiejscu(r);
  if (w < 78) return sumaCyfrRozwiniecia(r);
  if (w < 92) return dlugoscOkresu(r);
  return ileCyfrSkonczone(r);
}

// --- 6. Wyrażenia z ułamkami zwykłymi i dziesiętnymi

const MIAN_SKONCZONE = [2, 4, 5, 8, 10, 20, 25];
const MIAN_OKRESOWE = [3, 6, 9, 12, 15];
const OP_TEX = { "+": "+", "-": "-", "*": "\\cdot", "/": ":" };

/** Ułamek zwykły jako składnik wyrażenia: { v, tex, zw: true }. */
function skladnikUlamek(r, mianowniki, niewlasciwy = false) {
  const b = r.pick(mianowniki);
  const a = probuj(() => { const x = r.int(1, niewlasciwy ? 2 * b - 1 : b - 1); return nwd(x, b) === 1 ? x : null; });
  return { v: q(a, b), tex: fr(a, b), zw: true };
}
/** Ułamek dziesiętny (1–2 miejsca po przecinku, ostatnia cyfra niezerowa). */
function skladnikDz(r, miejsca) {
  const k = miejsca ?? r.pick([1, 1, 2]);
  const n = probuj(() => { const x = r.int(1, k === 1 ? 45 : 175); return x % 10 === 0 ? null : x; });
  const v = q(n, 10 ** k);
  return { v, tex: dz(v), zw: false };
}
const skladnikCalk = (n) => ({ v: q(n), tex: String(n), zw: false, calk: true });

function dzialaj(x, op, y) {
  if (op === "+") return x.add(y);
  if (op === "-") return x.sub(y);
  if (op === "*") return x.mul(y);
  return y.zero ? null : x.div(y);
}

/** Część rachunku na ułamkach zwykłych po znaku „=”: licznik razy licznik przez mianownik razy mianownik, potem skrócenie. */
function ogonMnozenia(x, y) {
  const w = x.mul(y);
  if (x.d === 1 && y.d === 1) return w.tex();
  const licznik = `${x.n} \\cdot ${y.n}`;
  const mianownik = [x.d, y.d].filter((d) => d !== 1).join(" \\cdot ") || "1";
  const pierwszy = fr(licznik, mianownik);
  const surowy = fr(x.n * y.n, x.d * y.d);
  return surowy === w.tex() ? pierwszy + ` = ${w.tex()}` : `${pierwszy} = ${surowy} = ${w.tex()}`;
}

/** Jeden krok na ułamkach zwykłych: zapis działania i wyniku. */
function krokZwykly(x, op, y) {
  const w = dzialaj(x, op, y);
  if (op === "+" || op === "-") {
    if (x.d === 1 && y.d === 1) return `${x.tex()} ${op} ${y.tex()} = ${w.tex()}`;
    const L = nww(x.d, y.d);
    const xa = x.n * (L / x.d), ya = y.n * (L / y.d);
    const wspolny = x.d === y.d ? "" : `${fr(xa, L)} ${op} ${fr(ya, L)} = `;
    const jeden = fr(`${xa} ${op} ${ya}`, L);
    const gotowy = fr(op === "+" ? xa + ya : xa - ya, L);
    return `${x.tex()} ${op} ${y.tex()} = ${wspolny}${jeden} = ${gotowy === w.tex() ? "" : `${gotowy} = `}${w.tex()}`;
  }
  if (op === "*") return `${x.tex()} \\cdot ${y.tex()} = ${ogonMnozenia(x, y)}`;
  const odw = new Q(y.d, y.n);
  return `${x.tex()} : ${y.tex()} = ${x.tex()} \\cdot ${odw.tex()} = ${ogonMnozenia(x, odw)}`;
}

/** Jeden krok na ułamkach dziesiętnych. */
const krokDz = (x, op, y) => `${dz(x)} ${OP_TEX[op]} ${dz(y)} = ${dz(dzialaj(x, op, y))}`;

function wyrazeniaMieszane(r) {
  const typ = r.int(0, 99);
  const z = probuj(() => {
    let A, B, C = null, op1, op2 = null;
    if (typ < 30) {
      A = skladnikUlamek(r, MIAN_SKONCZONE, r.chance(0.3)); B = skladnikDz(r); op1 = r.pick(["+", "-"]);
    } else if (typ < 50) {
      A = skladnikUlamek(r, MIAN_OKRESOWE, r.chance(0.3)); B = skladnikDz(r); op1 = r.pick(["+", "-"]);
    } else if (typ < 75) {
      A = skladnikUlamek(r, [...MIAN_SKONCZONE, ...MIAN_OKRESOWE], r.chance(0.2)); B = skladnikDz(r); op1 = r.pick(["*", "/"]);
    } else {
      A = skladnikUlamek(r, [...MIAN_SKONCZONE, ...MIAN_OKRESOWE]); B = skladnikDz(r); op1 = r.pick(["+", "-"]);
      C = r.chance(0.6) ? skladnikCalk(r.int(2, 6)) : skladnikDz(r, 1); op2 = r.pick(["*", "/"]);
    }
    if (!C && r.chance(0.5)) [A, B] = [B, A];
    const w1 = dzialaj(A.v, op1, B.v);
    if (!w1 || w1.ujemna || w1.zero || !ladna(w1) || Math.abs(Number(w1)) > 60) return null;
    let w = w1;
    if (C) {
      w = dzialaj(w1, op2, C.v);
      if (!w || w.ujemna || w.zero || !ladna(w) || Math.abs(Number(w)) > 60) return null;
    }
    const skladniki = [A, B, C].filter(Boolean);
    const trasaDz = skladniki.every((x) => skonczonyDz(x.v)) && (C ? !!C.calk : op1 === "+" || op1 === "-");
    if (trasaDz && (!skonczonyDz(w1) || !skonczonyDz(w))) return null;
    if (C && w.calkowita && r.chance(0.5)) return null;
    return { A, B, C, op1, op2, w1, w, trasaDz, skladniki };
  });
  const { A, B, C, op1, op2, w1, w, trasaDz, skladniki } = z;
  const wyr = C ? `(${A.tex} ${OP_TEX[op1]} ${B.tex}) ${OP_TEX[op2]} ${C.tex}` : `${A.tex} ${OP_TEX[op1]} ${B.tex}`;
  const kroki = [];
  if (trasaDz) {
    kroki.push("Wszystkie ułamki zwykłe w tym zadaniu mają skończone rozwinięcie, więc najwygodniej liczyć na ułamkach dziesiętnych.");
    const zamiany = skladniki.filter((x) => x.zw).map((x) => `$${x.tex} = ${dz(x.v)}$`);
    if (zamiany.length) kroki.push(`Zamieniamy ułamki zwykłe na dziesiętne: ${zamiany.join(", ")}.`);
    if (C) {
      kroki.push(`Najpierw nawias: $${krokDz(A.v, op1, B.v)}$.`);
      kroki.push(`Potem ${op2 === "*" ? "mnożenie" : "dzielenie"}: $${krokDz(w1, op2, C.v)}$.`);
    } else {
      kroki.push(`Liczymy: $${krokDz(A.v, op1, B.v)}$.`);
    }
  } else {
    const okresowy = skladniki.some((x) => x.zw && !skonczonyDz(x.v));
    kroki.push(okresowy
      ? "Jest tu ułamek o rozwinięciu okresowym (np. $\\frac{1}{3}$), którego nie da się dokładnie zapisać dziesiętnie – dlatego zamieniamy wszystko na ułamki zwykłe."
      : "Mnożenie i dzielenie wygodniej liczyć na ułamkach zwykłych, więc zamieniamy wszystko na ułamki zwykłe.");
    const zamiany = skladniki.filter((x) => !x.zw && !x.calk).map((x) => `$${x.tex} = ${x.v.tex()}$`);
    if (zamiany.length) kroki.push(`Ułamki dziesiętne zamieniamy na zwykłe i skracamy: ${zamiany.join(", ")}.`);
    if (C) {
      kroki.push(`Najpierw nawias: $${krokZwykly(A.v, op1, B.v)}$.`);
      kroki.push(`Potem ${op2 === "*" ? "mnożenie" : "dzielenie"}: $${krokZwykly(w1, op2, C.v)}$.`);
    } else {
      kroki.push(`Liczymy: $${krokZwykly(A.v, op1, B.v)}$.`);
    }
    if (skonczonyDz(w) && !w.calkowita) kroki.push(`Zapis dziesiętny wyniku: $${w.tex()} = ${dz(w)}$.`);
  }
  return zad(
    `Oblicz: $${wyr}$. Wynik podaj jako ułamek dziesiętny albo zwykły${skonczonyDz(w) ? "" : " (np. 5/6)"}.`,
    [pole("wynik", "Wynik")],
    { wynik: w },
    `$${dz(w)}$`,
    kroki,
  );
}

// --- 7. Dzielniki i liczby pierwsze

const MALE_PIERWSZE = [2, 3, 5, 7, 11, 13];
const najmniejszyDzielnikPierwszy = (n) => rozklad(n)[0];
/** „$91 = 7 \cdot 13$” albo „$92$ – parzysta”: dlaczego liczba k nie jest pierwsza. */
function dlaczegoZlozona(k) {
  const p = najmniejszyDzielnikPierwszy(k);
  return p === 2 ? `$${k}$ – parzysta` : `$${k} = ${p} \\cdot ${k / p}$`;
}
function pary(n) {
  const out = [];
  for (let i = 1; i * i <= n; i++) if (n % i === 0) out.push([i, n / i]);
  return out;
}

function liczbaDzielnikow(r) {
  const n = probuj(() => { const x = r.int(12, 100); return dzielnikiLiczby(x).length >= 4 ? x : null; });
  const d = dzielnikiLiczby(n);
  const p = pary(n);
  const kwadrat = p.find(([a, b]) => a === b);
  return zad(
    r.pick([`Ile dzielników naturalnych ma liczba $${n}$?`, `Ile jest liczb naturalnych, które dzielą liczbę $${n}$ bez reszty?`]),
    [pole("ile", "Liczba dzielników")],
    { ile: q(d.length) },
    `$${d.length}$`,
    [
      "Dzielniki wypisujemy parami: sprawdzamy kolejne liczby $1, 2, 3, \\ldots$ i do każdego dzielnika dopisujemy jego „partnera”, czyli wynik dzielenia.",
      `Pary: ${p.map(([a, b]) => `$${a} \\cdot ${b}$`).join(", ")}${kwadrat ? ` (dzielnik $${kwadrat[0]}$ stoi w parze sam ze sobą, więc liczymy go raz)` : ""}.`,
      `Dzielniki liczby $${n}$: ${listaTex(d)} – razem $${d.length}$.`,
    ],
  );
}

function pierwszeWPrzedziale(r) {
  const { a, b, pierwsze } = probuj(() => {
    const a = r.int(10, 80), b = a + r.int(9, 24);
    if (b > 100) return null;
    const p = [];
    for (let k = a + 1; k < b; k++) if (czyPierwsza(k)) p.push(k);
    return p.length >= 2 && p.length <= 6 ? { a, b, pierwsze: p } : null;
  });
  const pytaSuma = r.chance(0.6);
  const suma = pierwsze.reduce((x, y) => x + y, 0);
  const nieparzyste = [];
  for (let k = a + 1; k < b; k++) if (k % 2 === 1) nieparzyste.push(k);
  const zlozone = nieparzyste.filter((k) => !czyPierwsza(k));
  return zad(
    pytaSuma
      ? `Oblicz sumę wszystkich liczb pierwszych większych od $${a}$ i mniejszych od $${b}$.`
      : `Ile jest liczb pierwszych większych od $${a}$ i mniejszych od $${b}$?`,
    [pole("wynik", pytaSuma ? "Suma liczb pierwszych" : "Liczba liczb pierwszych")],
    { wynik: q(pytaSuma ? suma : pierwsze.length) },
    `$${pytaSuma ? suma : pierwsze.length}$`,
    [
      `Jedyna parzysta liczba pierwsza to $2$, więc w przedziale od $${a + 1}$ do $${b - 1}$ wystarczy sprawdzić liczby nieparzyste: ${listaTex(nieparzyste)}.`,
      zlozone.length
        ? `Wśród nich są liczby złożone: ${zlozone.map(dlaczegoZlozona).join(", ")}.`
        : "Żadna z nich nie jest podzielna przez $3$, $5$ ani $7$.",
      `Zostają liczby pierwsze: ${listaTex(pierwsze)}.`,
      pytaSuma ? `Suma: $${pierwsze.join(" + ")} = ${suma}$.` : `Jest ich $${pierwsze.length}$.`,
    ],
  );
}

function najblizszaPierwsza(r) {
  const wGore = r.chance(0.55);
  const { n, p } = probuj(() => {
    const n = r.int(20, 96);
    let p = n;
    do { p += wGore ? 1 : -1; } while (!czyPierwsza(p));
    return Math.abs(p - n) >= 3 ? { n, p } : null;
  });
  const przeskoczone = [];
  for (let k = n + (wGore ? 1 : -1); k !== p; k += wGore ? 1 : -1) przeskoczone.push(k);
  const sprawdzone = MALE_PIERWSZE.filter((x) => x * x <= p);
  return zad(
    wGore ? `Podaj najmniejszą liczbę pierwszą większą od $${n}$.` : `Podaj największą liczbę pierwszą mniejszą od $${n}$.`,
    [pole("p", "Liczba pierwsza")],
    { p: q(p) },
    `$${p}$`,
    [
      `Sprawdzamy kolejne liczby ${wGore ? "w górę" : "w dół"} od $${n}$ i odrzucamy złożone.`,
      `${przeskoczone.map(dlaczegoZlozona).join("; ")}.`,
      `Liczba $${p}$ nie dzieli się przez ${listaTex(sprawdzone)} (wystarczy sprawdzić liczby pierwsze, których kwadrat nie przekracza $${p}$), więc jest pierwsza.`,
    ],
  );
}

const ZLOZONE_PULAPKI = [51, 57, 63, 69, 77, 87, 91, 93, 111, 119, 121, 133, 143, 147, 161];
const PIERWSZE_PULAPKI = [53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149];

function ktoraPierwsza(r) {
  const chceP = r.chance(0.6);
  const poprawna = r.pick(chceP ? PIERWSZE_PULAPKI : ZLOZONE_PULAPKI);
  const zle = r.shuffle(chceP ? ZLOZONE_PULAPKI : PIERWSZE_PULAPKI).slice(0, 3);
  const m = probuj(() => mieszaj(r, `$${poprawna}$`, zle.map((x) => `$${x}$`)));
  const opis = (x) => {
    if (czyPierwsza(x)) return `$${x}$ nie dzieli się przez ${listaTex(MALE_PIERWSZE.filter((p) => p * p <= x))} – jest pierwsza`;
    const p = najmniejszyDzielnikPierwszy(x);
    return `$${x} = ${p} \\cdot ${x / p}$ – jest złożona`;
  };
  return zad(
    chceP ? "Która z podanych liczb jest liczbą pierwszą?" : "Która z podanych liczb jest liczbą złożoną?",
    [polew("liczba", "Liczba", m.opcje)],
    { liczba: m.ind },
    `$${poprawna}$`,
    [
      "Liczba pierwsza ma dokładnie dwa dzielniki: $1$ i samą siebie. Sprawdzamy podzielność przez kolejne liczby pierwsze $2, 3, 5, 7, 11, \\ldots$ (tylko takie, których kwadrat nie przekracza sprawdzanej liczby).",
      ...m.opcje.map((o) => `${cap(opis(Number(o.replace(/\$/g, ""))))}.`),
    ],
  );
}

function dzielnikiPierwszeLiczby(r) {
  const n = probuj(() => {
    const x = r.int(30, 200);
    return new Set(rozklad(x)).size >= 2 ? x : null;
  });
  const czynniki = rozklad(n);
  const rozne = [...new Set(czynniki)];
  const ileRoznych = r.chance(0.5);
  const kroki = [];
  let m = n;
  for (const p of czynniki) { kroki.push(`$${m} : ${p} = ${m / p}$`); m /= p; }
  const odp = ileRoznych ? rozne.length : Math.max(...rozne);
  return zad(
    ileRoznych ? `Ile różnych dzielników pierwszych ma liczba $${n}$?` : `Podaj największy dzielnik pierwszy liczby $${n}$.`,
    [pole("wynik", ileRoznych ? "Liczba dzielników pierwszych" : "Największy dzielnik pierwszy")],
    { wynik: q(odp) },
    `$${odp}$`,
    [
      `Rozkładamy liczbę na czynniki pierwsze, dzieląc kolejno przez najmniejsze możliwe liczby pierwsze: ${kroki.join(", ")}.`,
      `Rozkład: $${n} = ${czynniki.join(" \\cdot ")}$${new Set(czynniki).size < czynniki.length ? ` $= ${rozkladTex(n)}$` : ""}.`,
      ileRoznych
        ? `Różne czynniki (powtórzeń nie liczymy): ${listaTex(rozne)}, czyli $${rozne.length}$.`
        : `Czynniki pierwsze to ${listaTex(rozne)}, największy z nich to $${odp}$.`,
    ],
  );
}

function dzielnikiILiczbyPierwsze(r) {
  const w = r.int(0, 99);
  if (w < 20) return liczbaDzielnikow(r);
  if (w < 45) return pierwszeWPrzedziale(r);
  if (w < 65) return najblizszaPierwsza(r);
  if (w < 80) return ktoraPierwsza(r);
  return dzielnikiPierwszeLiczby(r);
}

// --- 8. Reszty z dzielenia i parzystość

const DNI = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];

function resztaPoDzialaniu(r) {
  const { d, rr, op, k, odp } = probuj(() => {
    const d = r.int(3, 12);
    const rr = r.int(1, d - 1);
    const op = r.pick(["+", "+", "*"]);
    const k = op === "+" ? r.int(2, 3 * d) : r.int(2, 6);
    if (op === "+" && k % d === 0) return null;
    return { d, rr, op, k, odp: op === "+" ? (rr + k) % d : (rr * k) % d };
  });
  const n0 = rr + d;                       // przykładowa liczba o tej reszcie
  const nowa = op === "+" ? n0 + k : n0 * k;
  const wyr = op === "+" ? `n + ${k}` : `${k}n`;
  const pomocnicza = op === "+" ? rr + k : rr * k;
  return zad(
    `Liczba $n$ przy dzieleniu przez $${d}$ daje resztę $${rr}$. Jaką resztę przy dzieleniu przez $${d}$ daje liczba $${wyr}$?`,
    [pole("reszta", "Reszta")],
    { reszta: q(odp) },
    `$${odp}$`,
    [
      `Liczbę $n$ można zapisać jako $${d} \\cdot t + ${rr}$ (np. $n = ${rr}$ albo $n = ${n0}$). Pełne porcje po $${d}$ nie wpływają na resztę, więc liczy się tylko reszta $${rr}$.`,
      `Działamy na samej reszcie: $${op === "+" ? `${rr} + ${k}` : `${k} \\cdot ${rr}`} = ${pomocnicza}$, a $${pomocnicza} : ${d} = ${Math.floor(pomocnicza / d)}$ reszty $${odp}$.`,
      `Sprawdzenie na przykładzie $n = ${n0}$ (bo $${n0} : ${d} = 1$ reszty $${rr}$): $${op === "+" ? `${n0} + ${k}` : `${k} \\cdot ${n0}`} = ${nowa}$, a $${nowa} : ${d} = ${Math.floor(nowa / d)}$ reszty $${odp}$ – zgadza się.`,
    ],
  );
}

function liczbaZReszta(r) {
  const rodzaj = r.pick(["trzycyfrowa", "trzycyfrowa", "dwucyfrowa", "czterocyfrowa"]);
  const d = rodzaj === "czterocyfrowa" ? r.int(7, 15) : r.int(4, 13);
  const rr = r.int(1, d - 1);
  if (rodzaj === "dwucyfrowa") {
    const E = 99, q0 = Math.floor(E / d), s = E % d;
    const k = rr <= s ? q0 : q0 - 1;
    const odp = k * d + rr;
    return zad(
      `Podaj największą liczbę dwucyfrową, która przy dzieleniu przez $${d}$ daje resztę $${rr}$.`,
      [pole("liczba", "Szukana liczba")],
      { liczba: q(odp) },
      `$${odp}$`,
      [
        `Liczby dające resztę $${rr}$ przy dzieleniu przez $${d}$ mają postać $${d} \\cdot k + ${rr}$.`,
        `Największa liczba dwucyfrowa to $99$: $99 : ${d} = ${q0}$ reszty $${s}$, czyli $99 = ${q0} \\cdot ${d} + ${s}$.`,
        rr <= s
          ? `Reszta $${s}$ jest nie mniejsza niż $${rr}$, więc wystarczy cofnąć się o $${s - rr}$: $${q0} \\cdot ${d} + ${rr} = ${odp}$. Następna z taką resztą ($${odp + d}$) jest już trzycyfrowa.`
          : `Reszta $${s}$ jest mniejsza niż $${rr}$, więc $${q0} \\cdot ${d} + ${rr} = ${q0 * d + rr}$ to już więcej niż $99$. Cofamy się o jedną porcję: $${q0 - 1} \\cdot ${d} + ${rr} = ${odp}$. Następna z taką resztą ($${odp + d}$) jest już trzycyfrowa.`,
      ],
    );
  }
  const S = rodzaj === "trzycyfrowa" ? 100 : 1000;
  const q0 = Math.floor(S / d), s = S % d;
  const k = rr >= s ? q0 : q0 + 1;
  const odp = k * d + rr;
  return zad(
    `Podaj najmniejszą liczbę ${rodzaj === "trzycyfrowa" ? "trzycyfrową" : "czterocyfrową"}, która przy dzieleniu przez $${d}$ daje resztę $${rr}$.`,
    [pole("liczba", "Szukana liczba")],
    { liczba: q(odp) },
    `$${odp}$`,
    [
      `Liczby dające resztę $${rr}$ przy dzieleniu przez $${d}$ mają postać $${d} \\cdot k + ${rr}$.`,
      `Najmniejsza liczba ${rodzaj === "trzycyfrowa" ? "trzycyfrowa" : "czterocyfrowa"} to $${S}$: $${S} : ${d} = ${q0}$ reszty $${s}$, czyli $${S} = ${q0} \\cdot ${d} + ${s}$.`,
      rr >= s
        ? (rr === s ? `Reszta z dzielenia $${S}$ przez $${d}$ to już $${rr}$, więc to jest szukana liczba.` : `Reszta $${rr}$ jest większa niż $${s}$, więc wystarczy dodać $${rr - s}$: $${q0} \\cdot ${d} + ${rr} = ${odp}$.`) + ` Poprzednia z taką resztą ($${odp - d}$) ma za mało cyfr.`
        : `Reszta $${rr}$ jest mniejsza niż $${s}$, więc $${q0} \\cdot ${d} + ${rr} = ${q0 * d + rr}$ to jeszcze za mało (mniej niż $${S}$). Przechodzimy do następnej porcji: $${q0 + 1} \\cdot ${d} + ${rr} = ${odp}$. Poprzednia z taką resztą ($${odp - d}$) ma za mało cyfr.`,
    ],
  );
}

function ileLiczbZReszta(r) {
  const { d, rr, lista } = probuj(() => {
    const d = r.int(5, 14);
    const rr = r.int(1, d - 1);
    const lista = [];
    for (let k = 10; k <= 99; k++) if (k % d === rr) lista.push(k);
    return lista.length >= 4 ? { d, rr, lista } : null;
  });
  const pokaz = lista.length <= 9 ? lista.join(", ") : `${lista.slice(0, 3).join(", ")}, \\ldots, ${lista[lista.length - 1]}`;
  return zad(
    `Ile liczb dwucyfrowych przy dzieleniu przez $${d}$ daje resztę $${rr}$?`,
    [pole("ile", "Liczba takich liczb")],
    { ile: q(lista.length) },
    `$${lista.length}$`,
    [
      `Liczby dające resztę $${rr}$ przy dzieleniu przez $${d}$ mają postać $${d} \\cdot k + ${rr}$, więc kolejne różnią się o $${d}$.`,
      `Pierwsza dwucyfrowa to $${lista[0]}$, ostatnia dwucyfrowa to $${lista[lista.length - 1]}$: $${pokaz}$.`,
      `Ile ich jest? Od $${lista[0]}$ do $${lista[lista.length - 1]}$ jest $(${lista[lista.length - 1]} - ${lista[0]}) : ${d} = ${(lista[lista.length - 1] - lista[0]) / d}$ kroków, a liczb o jedną więcej: $${lista.length}$.`,
    ],
  );
}

function dzienTygodnia(r) {
  const start = r.int(0, 6);
  const N = r.int(20, 400);
  const wprzod = r.chance(0.65);
  const s = N % 7;
  const ans = wprzod ? (start + s) % 7 : (((start - s) % 7) + 7) % 7;
  const zle = r.shuffle([1, -1, 2, -2, 3].map((x) => DNI[(((ans + x) % 7) + 7) % 7])).slice(0, 3);
  const m = probuj(() => mieszaj(r, DNI[ans], zle));
  return zad(
    wprzod ? `Dziś jest ${DNI[start]}. Jaki dzień tygodnia będzie za $${N}$ dni?` : `Dziś jest ${DNI[start]}. Jaki dzień tygodnia był $${N}$ dni temu?`,
    [polew("dzien", "Dzień tygodnia", m.opcje)],
    { dzien: m.ind },
    DNI[ans],
    [
      `Tydzień ma $7$ dni, więc co $7$ dni wypada ten sam dzień tygodnia. Pełne tygodnie nie zmieniają dnia – liczy się tylko reszta z dzielenia przez $7$.`,
      `$${N} : 7 = ${Math.floor(N / 7)}$ reszty $${s}$, czyli $${N} = ${Math.floor(N / 7)} \\cdot 7 + ${s}$.`,
      s === 0
        ? `Reszta $0$ – to dokładnie ${Math.floor(N / 7)} ${lm(Math.floor(N / 7), ["tydzień", "tygodnie", "tygodni"])}, więc dzień tygodnia jest ten sam: ${DNI[ans]}.`
        : `Liczymy jeszcze $${s}$ ${lm(s, ["dzień", "dni", "dni"])} ${wprzod ? "do przodu" : "wstecz"} od dnia „${DNI[start]}” i wychodzi: ${DNI[ans]}.`,
    ],
  );
}

/** Wyrażenie a·n + b w TeX-u. */
const liniowa = (a, b) => `${a === 1 ? "" : a}n${b > 0 ? ` + ${b}` : b < 0 ? ` - ${-b}` : ""}`;
const FORMY_PARZYSTOSC = [
  [2, 0], [2, 1], [2, -1], [2, 2], [2, 3], [4, 0], [4, 1], [4, 2], [4, -1], [6, 0], [6, 5], [10, 3], [2, -4], [8, 1],
  [1, 0], [1, 1], [1, 2], [1, -1], [3, 0], [3, 1], [5, 0], [5, 2], [3, 2], [1, 5], [7, -1],
];
/** „p” – zawsze parzysta, „n” – zawsze nieparzysta, „r” – raz tak, raz tak. */
const klasaParzystosci = ([a, b]) => (a % 2 === 1 ? "r" : b % 2 === 0 ? "p" : "n");
const SLOWO_PARZ = (v) => (Math.abs(v) % 2 === 0 ? "parzysta" : "nieparzysta");

function parzystoscWyrazen(r) {
  const chceNieparzysta = r.chance(0.55);
  const cel = chceNieparzysta ? "n" : "p";
  const dobre = FORMY_PARZYSTOSC.filter((f) => klasaParzystosci(f) === cel);
  const zleF = FORMY_PARZYSTOSC.filter((f) => klasaParzystosci(f) !== cel);
  const poprawna = r.pick(dobre);
  const inne = r.shuffle(zleF).slice(0, 3);
  const tx = (f) => `$${liniowa(f[0], f[1])}$`;
  const m = probuj(() => mieszaj(r, tx(poprawna), inne.map(tx)));
  const wartosci = (f) => [1, 2].map((n) => f[0] * n + f[1]);
  const opis = (o) => {
    const f = [...dobre, ...zleF].find((x) => tx(x) === o);
    const [w1, w2] = wartosci(f);
    const kl = klasaParzystosci(f);
    return `${o}: dla $n = 1$ wychodzi $${w1}$ (${SLOWO_PARZ(w1)}), dla $n = 2$ wychodzi $${w2}$ (${SLOWO_PARZ(w2)})${kl === "r" ? " – wynik zależy od $n$, więc nie jest zawsze tego samego rodzaju" : ` – ${kl === "p" ? "zawsze parzysta" : "zawsze nieparzysta"}`}`;
  };
  return zad(
    `Liczba $n$ jest całkowita. Które z wyrażeń przyjmuje dla każdego $n$ wartość ${chceNieparzysta ? "nieparzystą" : "parzystą"}?`,
    [polew("wyrazenie", "Wyrażenie", m.opcje)],
    { wyrazenie: m.ind },
    tx(poprawna),
    [
      "Jeśli współczynnik przy $n$ jest parzysty (np. $2n$, $4n$), parzystość wyniku nie zależy od $n$ – decyduje składnik wolny. Jeśli jest nieparzysty (np. $n$, $3n$), wynik raz jest parzysty, raz nieparzysty. Sprawdzamy $n = 1$ i $n = 2$.",
      ...m.opcje.map((o) => `${opis(o)}.`),
    ],
  );
}

function resztyIParzystosc(r) {
  const w = r.int(0, 99);
  if (w < 20) return resztaPoDzialaniu(r);
  if (w < 40) return liczbaZReszta(r);
  if (w < 55) return ileLiczbZReszta(r);
  if (w < 75) return dzienTygodnia(r);
  return parzystoscWyrazen(r);
}

// --- 9. Zaokrąglanie liczb

const ZAOKR_CALK = { 10: ["dziesiątek", "jedności"], 100: ["setek", "dziesiątek"], 1000: ["tysięcy", "setek"] };
const MIEJSCA_PO_PRZECINKU = ["jedności", "części dziesiątych", "części setnych", "części tysięcznych"];

function zaokraglenieCalkowite(r) {
  const p = r.pick([10, 100, 1000]);
  const [nazwa, decyduje] = ZAOKR_CALK[p];
  const zer = String(p).length - 1;
  const typ = r.pick(["zwykly", "zwykly", "zwykly", "dziewiatki", "czworka", "piatka", "przeniesienie"]);
  const n = probuj(() => {
    let czesc = r.int(1, Math.floor(99999 / p)), reszta;
    const dziesiata = p / 10;
    if (typ === "dziewiatki") reszta = 4 * dziesiata + (dziesiata - 1);
    else if (typ === "czworka") reszta = 4 * dziesiata + r.int(0, dziesiata - 1);
    else if (typ === "piatka") reszta = 5 * dziesiata + r.int(0, dziesiata - 1);
    else if (typ === "przeniesienie") {
      czesc = r.pick([9, 19, 29, 99, 199, 399, 999]);
      reszta = r.int(p / 2, p - 1);
    } else reszta = r.int(0, p - 1);
    const x = czesc * p + reszta;
    return x >= 100 && x <= 99999 ? x : null;
  });
  const wynik = Math.floor((n + p / 2) / p) * p;
  const cyfry = String(n).split("").map(Number);
  const d = Math.floor((n % p) / (p / 10));
  const podkr = skladCyfry(cyfry, [], { czesc: "cal", i: cyfry.length - zer });
  return zad(
    `Zaokrąglij liczbę $${dz(n)}$ do ${nazwa}.`,
    [pole("wynik", "Liczba po zaokrągleniu")],
    { wynik: q(wynik) },
    `$${dz(wynik)}$`,
    [
      `Zaokrąglamy do ${nazwa}, więc patrzymy na jedną cyfrę tuż za tym miejscem – na cyfrę ${decyduje}. W liczbie $${podkr}$ jest ona podkreślona: to $${d}$.`,
      d <= 4
        ? `Cyfra $${d}$ jest mniejsza niż $5$, więc zaokrąglamy w dół: cyfry przed tym miejscem zostają bez zmian, a resztę zamieniamy na zera.`
        : `Cyfra $${d}$ jest równa $5$ lub większa, więc zaokrąglamy w górę: cyfrę na miejscu zaokrąglania zwiększamy o $1$, a resztę zamieniamy na zera.`,
      typ === "dziewiatki" || typ === "czworka"
        ? "Patrzymy tylko na jedną cyfrę – dalsze cyfry (nawet dziewiątki) nie mają znaczenia."
        : typ === "przeniesienie"
          ? "Zwiększenie dziewiątki o $1$ daje $10$, więc jedynka „przechodzi” do następnego miejsca (dlatego wynik może mieć więcej cyfr)."
          : "Patrzymy tylko na tę jedną cyfrę – nie zaokrąglamy „po kolei od końca”.",
      `$${dz(n)} \\approx ${dz(wynik)}$.`,
    ],
  );
}

function zaokraglenieDziesietne(r) {
  const k = r.pick([3, 3, 4]);
  const j = r.int(0, k - 1);
  const typ = r.pick(["zwykly", "zwykly", "zwykly", "czworka9", "piatka", "przeniesienie"]);
  const { cal, frac } = probuj(() => {
    let cal = r.int(0, 29);
    const frac = Array.from({ length: k }, () => r.int(0, 9));
    if (typ === "czworka9") { frac[j] = 4; for (let i = j + 1; i < k; i++) frac[i] = 9; }
    if (typ === "piatka") { frac[j] = 5; }
    if (typ === "przeniesienie") {
      for (let i = 0; i < j; i++) frac[i] = 9;
      if (j === 0) cal = r.pick([9, 19, 29]);
      frac[j] = r.int(5, 9);
    }
    if (frac[k - 1] === 0) frac[k - 1] = r.int(1, 9);
    const x = cal * 10 ** k + Number(frac.join(""));
    return x > 10 ** k / 10 ? { cal, frac } : null;
  });
  const N = cal * 10 ** k + Number(frac.join(""));
  const u = 10 ** (k - j);
  const R = Math.floor((N + u / 2) / u);
  const wynik = q(R, 10 ** j);
  const x = q(N, 10 ** k);
  const d = frac[j];
  const calCyfry = String(cal).split("").map(Number);
  const podkr = skladCyfry(calCyfry, frac, { czesc: "ul", i: j });
  return zad(
    `Zaokrąglij liczbę $${dz(x, k)}$ do ${MIEJSCA_PO_PRZECINKU[j]}.`,
    [pole("wynik", "Liczba po zaokrągleniu")],
    { wynik },
    `$${dz(wynik, j)}$`,
    [
      j === 0
        ? "Zaokrąglamy do jedności, więc po przecinku nie zostawiamy żadnej cyfry. Patrzymy na pierwszą cyfrę po przecinku."
        : `Zaokrąglamy do ${MIEJSCA_PO_PRZECINKU[j]}, więc zostawiamy $${j}$ ${lm(j, ["cyfrę", "cyfry", "cyfr"])} po przecinku. Patrzymy na cyfrę tuż za ostatnią zostawioną.`,
      `W liczbie $${podkr}$ cyfra decydująca jest podkreślona: to $${d}$. ${d <= 4 ? `Jest mniejsza niż $5$, więc ostatnia zostawiona cyfra się nie zmienia (w dół).` : `Jest równa $5$ lub większa, więc ostatnią zostawioną cyfrę zwiększamy o $1$ (w górę).`}`,
      typ === "przeniesienie" ? "Dziewiątka zwiększona o $1$ zamienia się w $0$ i przenosi jedynkę na wcześniejsze miejsce." : "Odcinamy wszystkie cyfry za miejscem zaokrąglania.",
      `$${dz(x, k)} \\approx ${dz(wynik, j)}$ (zapisujemy tyle cyfr po przecinku, do ilu zaokrąglaliśmy, także gdy ostatnia to zero).`,
    ],
  );
}

function niedomiarNadmiar(r) {
  const k = 3;
  const j = r.int(0, 2);
  const nadmiar = r.chance(0.5);
  const { cal, frac } = probuj(() => {
    const cal = r.int(0, 29);
    const frac = Array.from({ length: k }, () => r.int(0, 9));
    if (frac[k - 1] === 0) frac[k - 1] = r.int(1, 9);
    return cal * 1000 + Number(frac.join("")) > 100 ? { cal, frac } : null;
  });
  const N = cal * 10 ** k + Number(frac.join(""));
  const u = 10 ** (k - j);
  const R = Math.floor(N / u) + (nadmiar ? 1 : 0);
  const wynik = q(R, 10 ** j);
  const x = q(N, 10 ** k);
  const zwykle = q(Math.floor((N + u / 2) / u), 10 ** j);
  const odciete = q(Math.floor(N / u), 10 ** j);
  return zad(
    `Podaj przybliżenie liczby $${dz(x, k)}$ do ${MIEJSCA_PO_PRZECINKU[j]} z ${nadmiar ? "nadmiarem" : "niedomiarem"}.`,
    [pole("wynik", `Przybliżenie z ${nadmiar ? "nadmiarem" : "niedomiarem"}`)],
    { wynik },
    `$${dz(wynik, j)}$`,
    [
      nadmiar
        ? "Przybliżenie z nadmiarem jest większe od liczby: odcinamy cyfry za miejscem, do którego przybliżamy, i zwiększamy ostatnią zostawioną cyfrę o $1$."
        : "Przybliżenie z niedomiarem jest mniejsze od liczby: po prostu odcinamy cyfry za miejscem, do którego przybliżamy.",
      `Po odcięciu zostaje $${dz(odciete, j)}$.${nadmiar ? ` Zwiększamy ostatnią cyfrę o $1$: $${dz(wynik, j)}$.` : ""}`,
      `Cyfra decydująca nie gra tu roli. Zwykłe zaokrąglenie dałoby $${dz(zwykle, j)}$ – ${zwykle.eq(wynik) ? "tu akurat wychodzi tak samo" : "to co innego niż przybliżenie z " + (nadmiar ? "nadmiarem" : "niedomiarem")}.`,
    ],
  );
}

const ULAMKI_DO_ZAOKR = [[1, 3], [2, 3], [1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9],
  [1, 11], [3, 11], [5, 11], [7, 11], [1, 12], [5, 12], [7, 12], [11, 12]];

function zaokraglenieUlamka(r) {
  const [a, b] = r.pick(ULAMKI_DO_ZAOKR);
  const j = r.pick([1, 2, 2, 3]);
  const R = Math.floor((2 * a * 10 ** j + b) / (2 * b));
  const wynik = q(R, 10 ** j);
  const rw = rozwiniecie(a, b);
  const cyfry = Array.from({ length: j + 3 }, (_, i) => cyfraRozwiniecia(rw, i + 1)).join("");
  const d = cyfraRozwiniecia(rw, j + 1);
  const zostaw = cyfry.slice(0, j);
  return zad(
    `Zaokrąglij liczbę $${fr(a, b)}$ do ${MIEJSCA_PO_PRZECINKU[j]}.`,
    [pole("wynik", "Liczba po zaokrągleniu")],
    { wynik },
    `$${dz(wynik, j)}$`,
    [
      `Zamieniamy ułamek na dziesiętny, dzieląc licznik przez mianownik: $${a} : ${b} = 0{,}${cyfry}\\ldots$ (to rozwinięcie okresowe: $${dzOkres(rw)}$).`,
      `Zaokrąglamy do ${MIEJSCA_PO_PRZECINKU[j]}: zostawiamy $${j}$ ${lm(j, ["cyfrę", "cyfry", "cyfr"])} po przecinku ($0{,}${zostaw}$). Cyfra decydująca to $${d}$.`,
      d <= 4 ? `Cyfra $${d}$ jest mniejsza niż $5$, więc zostawiamy $0{,}${zostaw}$ bez zmian.` : `Cyfra $${d}$ jest równa $5$ lub większa, więc ostatnią zostawioną cyfrę zwiększamy o $1$.`,
      `$${fr(a, b)} \\approx ${dz(wynik, j)}$.`,
    ],
  );
}

function zaokraglanieLiczb(r) {
  const w = r.int(0, 99);
  if (w < 30) return zaokraglenieCalkowite(r);
  if (w < 60) return zaokraglenieDziesietne(r);
  if (w < 80) return niedomiarNadmiar(r);
  return zaokraglenieUlamka(r);
}

// --- 10. Szacowanie i zadania z treścią

const W_GORE = [
  { zakres: [60, 480], M: [30, 40, 45, 50, 52], pole: "Liczba autobusów", dod: "jeszcze jeden autobus",
    tresc: (N, M) => `Na wycieczkę jedzie ${ile(N, ["osoba", "osoby", "osób"])}. W jednym autobusie jest ${ile(M, ["miejsce", "miejsca", "miejsc"])}. Ile autobusów trzeba zamówić, żeby wszyscy się zmieścili?` },
  { zakres: [100, 900], M: [24, 30, 36, 40, 48, 60], pole: "Liczba palet", dod: "jeszcze jedną paletę",
    tresc: (N, M) => `Do przewiezienia jest ${ile(N, ["paczka", "paczki", "paczek"])}. Na jednej palecie mieści się ${ile(M, ["paczka", "paczki", "paczek"])}. Ile palet trzeba przygotować, żeby przewieźć wszystkie paczki?` },
  { zakres: [50, 300], M: [8, 10, 12, 15], pole: "Liczba puszek", dod: "jeszcze jedną puszkę",
    tresc: (N, M) => `Do pomalowania jest ściana o powierzchni $${N} \\text{ m}^2$. Jedna puszka farby wystarcza na $${M} \\text{ m}^2$ ściany. Ile puszek farby trzeba kupić, żeby pomalować całą ścianę?` },
  { zakres: [100, 400], M: [8, 10, 12, 15], pole: "Liczba wiader", dod: "jeszcze jedno wiadro",
    tresc: (N, M) => `Beczka ma pojemność $${N}$ litrów, a wiadro $${M}$ litrów. Ile razy trzeba nalać pełne wiadro, żeby napełnić beczkę po brzegi?` },
  { zakres: [60, 300], M: [14, 15, 18, 20, 25], pole: "Liczba kursów", dod: "jeszcze jeden kurs",
    tresc: (N, M) => `Do przewiezienia jest ${ile(N, ["skrzynka", "skrzynki", "skrzynek"])}. Ciężarówka mieści ${ile(M, ["skrzynkę", "skrzynki", "skrzynek"])}. Ile kursów musi wykonać ciężarówka, żeby przewieźć wszystkie skrzynki?` },
];
const W_DOL = [
  { zakres: [50, 400], M: [6, 8, 12, 15, 24], pole: "Liczba pełnych skrzynek", pelna: "kolejną pełną skrzynkę",
    tresc: (N, M) => `Mamy ${ile(N, ["jabłko", "jabłka", "jabłek"])}. Do jednej skrzynki mieści się ${ile(M, ["jabłko", "jabłka", "jabłek"])}. Ile pełnych skrzynek można napełnić?` },
  { zakres: [45, 160], M: [3, 4, 6, 7, 8, 12], pole: "Liczba zeszytów", pelna: "kolejny zeszyt",
    tresc: (N, M) => `Kasia ma $${N}$ zł. Jeden zeszyt kosztuje $${M}$ zł. Ile zeszytów może kupić?` },
  { zakres: [200, 700], M: [15, 25, 30, 35, 40, 45], pole: "Liczba pełnych kawałków", pelna: "kolejny pełny kawałek",
    tresc: (N, M) => `Z deski o długości $${N}$ cm odcinamy kawałki po $${M}$ cm. Ile pełnych kawałków otrzymamy?` },
  { zakres: [100, 500], M: [12, 18, 20, 24], pole: "Liczba pełnych pudełek", pelna: "kolejne pełne pudełko",
    tresc: (N, M) => `Piekarz upiekł ${ile(N, ["ciastko", "ciastka", "ciastek"])} i pakuje je do pudełek. Do jednego pudełka mieści się ${ile(M, ["ciastko", "ciastka", "ciastek"])}. Ile pełnych pudełek zapakuje?` },
  { zakres: [60, 200], M: [4, 5, 6, 8, 15], pole: "Liczba biletów", pelna: "kolejny bilet",
    tresc: (N, M) => `Bilet na wycieczkę kosztuje $${M}$ zł, a klasa zebrała $${N}$ zł. Ile biletów można kupić za zebrane pieniądze?` },
];

/** Dzielenie z resztą w zadaniu z treścią: losuje N i M tak, żeby reszta była niezerowa i (po połowie) większa albo mniejsza od połowy dzielnika. */
function losujPodzial(r, kontekst) {
  return probuj(() => {
    const N = r.int(...kontekst.zakres), M = r.pick(kontekst.M);
    const s = N % M, q0 = Math.floor(N / M);
    return s !== 0 && q0 >= 3 && (s * 2 > M) === r.chance(0.5) ? { N, M, s, q0 } : null;
  });
}
const przyblizonyIloraz = (N, M) => { const t = Math.round((N * 10) / M); return `${Math.floor(t / 10)}{,}${t % 10}`; };

function zadanieWGore(r) {
  const k = r.pick(W_GORE);
  const { N, M, s, q0 } = losujPodzial(r, k);
  return zad(
    k.tresc(N, M),
    [pole("wynik", k.pole)],
    { wynik: q(q0 + 1) },
    `$${q0 + 1}$`,
    [
      `Dzielimy: $${N} : ${M} = ${q0}$ reszty $${s}$, czyli $${N} = ${q0} \\cdot ${M} + ${s}$ (w przybliżeniu $${N} : ${M} \\approx ${przyblizonyIloraz(N, M)}$).`,
      `Reszta $${s}$ nie jest zerem, czyli po wykorzystaniu $${q0}$ pełnych porcji coś jeszcze zostaje i też trzeba to gdzieś zmieścić. Trzeba dołożyć ${k.dod}.`,
      `Pytanie brzmi „ile potrzeba, żeby wystarczyło”, więc zaokrąglamy w górę: $${q0} + 1 = ${q0 + 1}$. (Sprawdzenie: $${q0} \\cdot ${M} = ${q0 * M}$ to za mało, bo $${q0 * M} < ${N}$.)`,
    ],
  );
}

function zadanieWDol(r) {
  const k = r.pick(W_DOL);
  const { N, M, s, q0 } = losujPodzial(r, k);
  return zad(
    k.tresc(N, M),
    [pole("wynik", k.pole)],
    { wynik: q(q0) },
    `$${q0}$`,
    [
      `Dzielimy: $${N} : ${M} = ${q0}$ reszty $${s}$, czyli $${N} = ${q0} \\cdot ${M} + ${s}$ (w przybliżeniu $${N} : ${M} \\approx ${przyblizonyIloraz(N, M)}$).`,
      `Reszta $${s}$ jest mniejsza niż $${M}$, więc nie wystarcza na ${k.pelna} (brakuje jeszcze $${M - s}$).`,
      `Pytanie dotyczy tylko pełnych porcji, więc zaokrąglamy w dół i resztę pomijamy: wynik to $${q0}$. (Sprawdzenie: $${q0 + 1} \\cdot ${M} = ${(q0 + 1) * M}$ to więcej niż $${N}$.)`,
    ],
  );
}

// [produkt, najmniejsza cena, największa cena w złotych] – ceny mają wyglądać prawdopodobnie
const PRODUKTY = [["chleb", 3, 8], ["ser", 6, 25], ["sok", 3, 12], ["makaron", 4, 12], ["masło", 6, 15], ["mleko", 3, 6], ["jogurt", 2, 6], ["olej", 8, 20], ["ryż", 3, 10]];

function oszacujSumeCen(r) {
  const n = r.pick([3, 3, 4]);
  const wybrane = r.shuffle(PRODUKTY).slice(0, n);
  const nazwy = wybrane.map((p) => p[0]);
  const centy = probuj(() => {
    const c = wybrane.map(([, od, doo]) => r.int(od * 100 + 5, doo * 100 - 5));
    if (c.some((x) => x % 100 === 0)) return null;
    const wGore = c.filter((x) => x % 100 >= 50).length;
    return wGore >= 1 && wGore <= n - 1 ? c : null;
  });
  const zaokr = centy.map((c) => Math.floor((c + 50) / 100));
  const suma = zaokr.reduce((a, b) => a + b, 0);
  const dokladna = q(centy.reduce((a, b) => a + b, 0), 100);
  const opisy = nazwy.map((nz, i) => `${nz} za $${dz(q(centy[i], 100), 2)}$ zł`);
  return zad(
    `W sklepie kupiono: ${wypisz(opisy)}. Zaokrąglij cenę każdego produktu do pełnych złotych i oblicz, ile w przybliżeniu trzeba zapłacić za wszystkie zakupy.`,
    [pole("suma", "Szacunkowa kwota (w zł)")],
    { suma: q(suma) },
    `$${suma}$ zł`,
    [
      "Przy zaokrąglaniu do pełnych złotych patrzymy na grosze: $50$ groszy i więcej – w górę, mniej niż $50$ groszy – w dół.",
      `Ceny po zaokrągleniu: ${centy.map((c, i) => `$${dz(q(c, 100), 2)} \\approx ${zaokr[i]}$`).join(", ")}.`,
      `Dodajemy: $${zaokr.join(" + ")} = ${suma}$.`,
      `Dla kontroli: dokładna suma to $${dz(dokladna, 2)}$ zł, więc szacunek jest bardzo blisko.`,
    ],
  );
}

function najlepszeOszacowanie(r) {
  const iloczyn = r.chance(0.65);
  const z = probuj(() => {
    const dl = () => r.pick([-3, -2, -1, 1, 2, 3]);
    if (iloczyn) {
      const A = r.pick([2, 3, 4, 5, 6, 8, 10, 20, 30, 40, 50, 60, 80]);
      const B = r.pick([2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 50]);
      const a = q(A * 10 + dl(), 10), b = q(B * 10 + dl(), 10);
      const est = A * B;
      if (Math.abs(Number(a.mul(b)) - est) > 0.12 * est) return null;
      const m = mieszaj(r, `$${dz(q(est))}$`, [`$${dz(q(est, 10))}$`, `$${dz(q(est * 10))}$`, `$${dz(q(A + B))}$`]);
      return m ? { a, b, A, B, est, dokl: a.mul(b), m } : null;
    }
    const B = r.pick([2, 3, 4, 5, 6, 8]), m0 = r.int(3, 40);
    const A = B * m0;
    const a = q(A * 10 + dl(), 10), b = q(B * 10 + dl(), 10);
    if (Math.abs(Number(a.div(b)) - m0) > 0.12 * m0) return null;
    const m = mieszaj(r, `$${m0}$`, [`$${dz(q(m0 * 10))}$`, `$${dz(q(m0, 10))}$`, `$${dz(q(A - B))}$`]);
    return m ? { a, b, A, B, est: m0, dokl: a.div(b), m } : null;
  });
  const { a, b, A, B, est, m, dokl } = z;
  const pokaz = skonczonyDz(dokl) ? dokl : q(Math.round(Number(dokl) * 100), 100);
  return zad(
    `Który z podanych wyników jest najlepszym oszacowaniem ${iloczyn ? "iloczynu" : "ilorazu"} $${dz(a)} ${iloczyn ? "\\cdot" : ":"} ${dz(b)}$?`,
    [polew("wynik", "Oszacowanie", m.opcje)],
    { wynik: m.ind },
    `$${dz(q(est))}$`,
    [
      `Zaokrąglamy liczby do takich, które łatwo ${iloczyn ? "pomnożyć" : "podzielić"}: $${dz(a)} \\approx ${A}$, $${dz(b)} \\approx ${B}$.`,
      `Liczymy w głowie: $${A} ${iloczyn ? "\\cdot" : ":"} ${B} = ${est}$.`,
      `Pozostałe odpowiedzi mają zły rząd wielkości (dziesięć razy za mało albo za dużo) albo wynikają z innego działania (${iloczyn ? "dodawania" : "odejmowania"}: $${iloczyn ? `${A} + ${B} = ${A + B}` : `${A} - ${B} = ${A - B}`}$). Dokładny wynik to ${skonczonyDz(dokl) ? "" : "około "}$${dz(pokaz)}$, czyli blisko $${est}$.`,
    ],
  );
}

function szacowanieIZadania(r) {
  const w = r.int(0, 99);
  if (w < 27) return zadanieWGore(r);
  if (w < 54) return zadanieWDol(r);
  if (w < 77) return oszacujSumeCen(r);
  return najlepszeOszacowanie(r);
}

// --- 11. Wartość potęgi

const razyTex = (a, n) => Array(n).fill(a).join(" \\cdot ");

/** Składnik z potęgą: typ „zw” – a^n, „naw” – (-a)^n, „bez” – -a^n. Zwraca { tex, v, opis }. */
function skladnikPotegi(typ, a, n) {
  const pot = a ** n;
  if (typ === "zw") {
    return {
      tex: `${a}^{${n}}`, v: pot,
      opis: n === 0 ? `$${a}^{0} = 1$ (każda liczba różna od zera do potęgi $0$ daje $1$)`
        : `$${a}^{${n}} = ${razyTex(a, n)} = ${pot}$`,
    };
  }
  if (typ === "naw") {
    const v = (-a) ** n;
    return {
      tex: `(-${a})^{${n}}`, v,
      opis: n === 0 ? `$(-${a})^{0} = 1$ (potęga zerowa liczby różnej od zera)`
        : `$(-${a})^{${n}} = ${razyTex(`(-${a})`, n)} = ${v}$ – ${n} ${lm(n, ["minus", "minusy", "minusów"])}, a ${n % 2 === 0 ? "parzysta liczba minusów daje plus" : "nieparzysta liczba minusów daje minus"}`,
    };
  }
  return {
    tex: `-${a}^{${n}}`, v: -pot,
    opis: n === 0 ? `$-${a}^{0} = -1$ (najpierw potęga: $${a}^{0} = 1$, a minus zostaje z przodu)`
      : `$-${a}^{${n}} = -(${razyTex(a, n)}) = -${pot}$ – bez nawiasu minus nie należy do podstawy, więc do potęgi podnosimy samą liczbę $${a}$`,
  };
}

function wartoscPotegiCalkowitej(r) {
  const dwa = r.chance(0.6);
  const { t1, t2, op, w } = probuj(() => {
    const losuj = (nawiasowy) => ({
      typ: nawiasowy ? r.pick(["naw", "bez"]) : r.pick(["zw", "naw", "bez", "naw", "bez"]),
      a: r.int(2, 9),
      n: r.chance(0.12) ? 0 : r.int(2, 5),
    });
    const x1 = losuj(!dwa), x2 = dwa ? losuj(false) : null;
    if (x1.a ** x1.n > 20000 || (x2 && x2.a ** x2.n > 20000)) return null;
    const t1 = skladnikPotegi(x1.typ, x1.a, x1.n);
    const t2 = x2 ? skladnikPotegi(x2.typ, x2.a, x2.n) : null;
    if (x2 && ((x1.typ === "zw" && x2.typ === "zw") || t1.tex === t2.tex)) return null;
    const op = r.pick(["+", "-"]);
    const w = t2 ? (op === "+" ? t1.v + t2.v : t1.v - t2.v) : t1.v;
    return { t1, t2, op, w };
  });
  const wyr = t2 ? `${t1.tex} ${op} ${t2.tex.startsWith("-") ? `(${t2.tex})` : t2.tex}` : t1.tex;
  const kroki = t2
    ? [
      "Najpierw obliczamy każdą potęgę osobno. Pamiętaj: minus jest częścią podstawy tylko wtedy, gdy stoi w nawiasie.",
      `${cap(t1.opis)}.`,
      `${cap(t2.opis)}.`,
      `Teraz ${op === "+" ? "dodajemy" : "odejmujemy"}: $${t1.v} ${op} ${nawias(t2.v)} = ${w}$${op === "-" && t2.v < 0 ? " (odjąć liczbę ujemną to dodać dodatnią)" : ""}.`,
    ]
    : [
      "Pamiętaj: minus jest częścią podstawy tylko wtedy, gdy stoi w nawiasie.",
      `${cap(t1.opis)}.`,
    ];
  return zad(
    `Oblicz: $${wyr}$.`,
    [pole("wynik", "Wynik")],
    { wynik: q(w) },
    `$${w}$`,
    kroki,
  );
}

function potegaUlamka(r) {
  const { baza, e, w } = probuj(() => {
    const b = r.pick([2, 3, 4, 5, 6]), p = r.int(1, b + 3);
    if (nwd(p, b) !== 1 || p === b) return null;
    const e = r.pick([2, 3, 3, 4]);
    const baza = q(r.chance(0.35) ? -p : p, b);
    const w = baza.pow(e);
    return ladna(w) ? { baza, e, w } : null;
  });
  const modul = baza.ujemna ? baza.neg() : baza;
  const znak = baza.ujemna ? `Podstawa jest ujemna, a wykładnik ${e % 2 === 0 ? "parzysty, więc wynik jest dodatni" : "nieparzysty, więc wynik jest ujemny"}. ` : "";
  return zad(
    `Oblicz: $\\left(${baza.tex()}\\right)^{${e}}$.`,
    [pole("wynik", "Wynik")],
    { wynik: w },
    `$${w.tex()}$`,
    [
      "Potęga ułamka: podnosimy do potęgi osobno licznik i mianownik.",
      `${znak}$\\left(${modul.tex()}\\right)^{${e}} = \\frac{${modul.n}^{${e}}}{${modul.d}^{${e}}} = \\frac{${modul.n ** e}}{${modul.d ** e}}$.`,
      `Wynik: $${w.tex()}$.`,
    ],
  );
}

function potegaDziesietna(r) {
  const { baza, n, k, e, w } = probuj(() => {
    const k = r.pick([1, 1, 1, 2]);
    const n = r.int(1, k === 1 ? 25 : 30);
    if (n % 10 === 0) return null;
    const e = k === 1 ? r.pick([2, 3, 3, 4]) : 2;
    const baza = q(r.chance(0.2) ? -n : n, 10 ** k);
    const w = baza.pow(e);
    return skonczonyDz(w) && ladna(w) && Math.abs(Number(w)) < 40 ? { baza, n, k, e, w } : null;
  });
  const modul = baza.ujemna ? baza.neg() : baza;
  return zad(
    `Oblicz: $${baza.ujemna ? `(${dz(baza)})` : dz(baza)}^{${e}}$.`,
    [pole("wynik", "Wynik")],
    { wynik: w },
    `$${dz(w)}$`,
    [
      `Liczymy tak, jakby nie było przecinka: $${n}^{${e}} = ${n ** e}$.`,
      `Liczba $${dz(modul)}$ ma $${k}$ ${lm(k, ["miejsce", "miejsca", "miejsc"])} po przecinku, więc wynik ma $${k} \\cdot ${e} = ${k * e}$ ${lm(k * e, ["miejsce", "miejsca", "miejsc"])} po przecinku: $${dz(modul.pow(e))}$.`,
      baza.ujemna ? `Podstawa jest ujemna, a wykładnik ${e % 2 === 0 ? "parzysty, więc wynik jest dodatni" : "nieparzysty, więc wynik jest ujemny"}: $${dz(w)}$.` : `Wynik: $${dz(w)}$.`,
    ],
  );
}

function ktoraUjemna(r) {
  const ujemna = r.chance(0.55);
  const f = (typ, a, n) => {
    const t = typ === "D" ? { tex: `-(-${a})^{${n}}`, v: -((-a) ** n) } : skladnikPotegi({ A: "zw", B: "naw", C: "bez" }[typ], a, n);
    return { tex: t.tex, v: t.v };
  };
  const opcje = probuj(() => {
    const o = Array.from({ length: 4 }, () => f(r.pick(["A", "B", "B", "C", "C", "D"]), r.int(2, 6), r.int(2, 5)));
    if (new Set(o.map((x) => x.tex)).size !== 4) return null;
    const ile_ = o.filter((x) => (ujemna ? x.v < 0 : x.v > 0)).length;
    return ile_ === 1 ? o : null;
  });
  const dobra = opcje.find((x) => (ujemna ? x.v < 0 : x.v > 0));
  return zad(
    ujemna ? "Która z podanych liczb jest ujemna?" : "Która z podanych liczb jest dodatnia?",
    [polew("liczba", "Liczba", opcje.map((x) => `$${x.tex}$`))],
    { liczba: opcje.indexOf(dobra) },
    `$${dobra.tex}$`,
    [
      "Liczymy znak każdej liczby: potęga o parzystym wykładniku z nawiasem daje plus, o nieparzystym minus; minus bez nawiasu stoi przed całą potęgą i zmienia jej znak.",
      `${opcje.map((x) => `$${x.tex} = ${x.v}$`).join(", ")}.`,
      `${ujemna ? "Ujemna" : "Dodatnia"} jest tylko liczba $${dobra.tex}$.`,
    ],
  );
}

function wartoscPotegi(r) {
  const w = r.int(0, 99);
  if (w < 45) return wartoscPotegiCalkowitej(r);
  if (w < 62) return potegaUlamka(r);
  if (w < 75) return potegaDziesietna(r);
  return ktoraUjemna(r);
}

// --- 12. Działania na potęgach, notacja wykładnicza

const PODSTAWY_POT = [2, 3, 5, 7, 10, 4, 6];
const pw = (a, n) => `${a}^{${n}}`;
const POLE_X = "$x =$";

function wykladnikZReguly(r) {
  const a = r.pick(PODSTAWY_POT);
  const rodzaj = r.pick(["iloczyn", "iloczyn", "iloraz", "iloraz", "potega", "zlozony", "zlozony2"]);
  const m = r.int(2, 9), n = r.int(2, 9);
  let tex, x, kroki, kontrola = null;
  if (rodzaj === "iloczyn") {
    tex = `${pw(a, m)} \\cdot ${pw(a, n)}`; x = m + n;
    kroki = ["Mnożymy potęgi o tej samej podstawie, więc wykładniki dodajemy, a podstawa się nie zmienia.", `$${m} + ${n} = ${x}$.`];
    if (a ** m <= 100000 && a ** n <= 100000 && a ** x <= 1e9) kontrola = `Sprawdzenie na liczbach: $${dz(a ** m)} \\cdot ${dz(a ** n)} = ${dz(a ** x)} = ${pw(a, x)}$.`;
  } else if (rodzaj === "iloraz") {
    const mm = r.int(5, 12), nn = r.int(2, mm - 2);
    x = mm - nn;
    tex = r.chance(0.5) ? `${pw(a, mm)} : ${pw(a, nn)}` : `\\frac{${pw(a, mm)}}{${pw(a, nn)}}`;
    kroki = ["Dzielimy potęgi o tej samej podstawie, więc wykładniki odejmujemy, a podstawa się nie zmienia.", `$${mm} - ${nn} = ${x}$.`];
    if (a ** mm <= 1e9) kontrola = `Sprawdzenie na liczbach: $${dz(a ** mm)} : ${dz(a ** nn)} = ${dz(a ** x)} = ${pw(a, x)}$.`;
  } else if (rodzaj === "potega") {
    const mm = r.int(2, 6), nn = r.int(2, 5);
    x = mm * nn;
    tex = `(${pw(a, mm)})^{${nn}}`;
    kroki = ["Potęgę podnosimy do potęgi, więc wykładniki mnożymy: $(a^m)^n = a^{m \\cdot n}$.", `$${mm} \\cdot ${nn} = ${x}$.`];
    if (a ** x <= 1e9) kontrola = `Sprawdzenie: $(${pw(a, mm)})^{${nn}} = ${razyTex(dz(a ** mm), nn)} = ${dz(a ** x)} = ${pw(a, x)}$.`;
  } else if (rodzaj === "zlozony") {
    const k = r.int(2, m + n - 2);
    x = m + n - k;
    tex = `${pw(a, m)} \\cdot ${pw(a, n)} : ${pw(a, k)}`;
    kroki = ["Liczymy od lewej: mnożenie – wykładniki dodajemy, dzielenie – odejmujemy.", `$${m} + ${n} = ${m + n}$, potem $${m + n} - ${k} = ${x}$.`];
  } else {
    const mm = r.int(2, 5), nn = r.int(2, 4);
    const dziel = r.chance(0.5);
    const k = dziel ? r.int(2, mm * nn - 2) : r.int(2, 9);
    x = dziel ? mm * nn - k : mm * nn + k;
    tex = `(${pw(a, mm)})^{${nn}} ${dziel ? ":" : "\\cdot"} ${pw(a, k)}`;
    kroki = [
      "Najpierw potęga potęgi: wykładniki mnożymy.",
      `$(${pw(a, mm)})^{${nn}} = ${pw(a, `${mm} \\cdot ${nn}`)} = ${pw(a, mm * nn)}$.`,
      `Potem ${dziel ? "dzielimy – wykładniki odejmujemy" : "mnożymy – wykładniki dodajemy"}: $${mm * nn} ${dziel ? "-" : "+"} ${k} = ${x}$.`,
    ];
  }
  return zad(
    `Wiadomo, że $${tex} = ${pw(a, "x")}$. Ile wynosi $x$?`,
    [pole("x", POLE_X)],
    { x: q(x) },
    `$x = ${x}$`,
    [...kroki, ...(kontrola ? [kontrola] : []), `Zatem $x = ${x}$.`],
  );
}

const POTEGI_PODSTAW = { 2: [[4, 2], [8, 3], [16, 4], [32, 5], [64, 6]], 3: [[9, 2], [27, 3], [81, 4]], 5: [[25, 2], [125, 3]] };

function wykladnikRozne(r) {
  const b = r.pick([2, 2, 3, 5]);
  const [P, kk] = r.pick(POTEGI_PODSTAW[b]);
  const forma = r.pick(["samo", "iloczyn", "iloczynP", "iloraz", "ilorazP"]);
  let tex, x, przeksztalcenie;
  if (forma === "samo") {
    const e = r.pick([2, 3, 4]);
    x = kk * e;
    tex = pw(P, e);
    przeksztalcenie = `$${pw(P, e)} = (${pw(b, kk)})^{${e}} = ${pw(b, `${kk} \\cdot ${e}`)} = ${pw(b, x)}$`;
  } else if (forma === "iloczyn") {
    const m = r.int(2, 6);
    x = kk + m;
    tex = `${P} \\cdot ${pw(b, m)}`;
    przeksztalcenie = `$${P} \\cdot ${pw(b, m)} = ${pw(b, kk)} \\cdot ${pw(b, m)} = ${pw(b, `${kk} + ${m}`)} = ${pw(b, x)}$`;
  } else if (forma === "iloczynP") {
    const e = r.pick([2, 3]), m = r.int(2, 5);
    x = kk * e + m;
    tex = `${pw(P, e)} \\cdot ${pw(b, m)}`;
    przeksztalcenie = `$${pw(P, e)} \\cdot ${pw(b, m)} = (${pw(b, kk)})^{${e}} \\cdot ${pw(b, m)} = ${pw(b, kk * e)} \\cdot ${pw(b, m)} = ${pw(b, x)}$`;
  } else if (forma === "iloraz") {
    const m = kk + r.int(2, 6);
    x = m - kk;
    tex = `${pw(b, m)} : ${P}`;
    przeksztalcenie = `$${pw(b, m)} : ${P} = ${pw(b, m)} : ${pw(b, kk)} = ${pw(b, `${m} - ${kk}`)} = ${pw(b, x)}$`;
  } else {
    const e = r.pick([2, 3]), m = r.int(2, kk * e - 2);
    x = kk * e - m;
    tex = `${pw(P, e)} : ${pw(b, m)}`;
    przeksztalcenie = `$${pw(P, e)} : ${pw(b, m)} = (${pw(b, kk)})^{${e}} : ${pw(b, m)} = ${pw(b, kk * e)} : ${pw(b, m)} = ${pw(b, x)}$`;
  }
  return zad(
    `Wiadomo, że $${tex} = ${pw(b, "x")}$. Ile wynosi $x$?`,
    [pole("x", POLE_X)],
    { x: q(x) },
    `$x = ${x}$`,
    [
      `Sprowadzamy liczby do jednej podstawy. Z tabelki potęg: $${P} = ${pw(b, kk)}$.`,
      `${cap(przeksztalcenie)}.`,
      `Zatem $x = ${x}$.`,
    ],
  );
}

function wartoscZReguly(r) {
  const a = r.pick([2, 2, 3, 5, 10]);
  const rodzaj = r.pick(["iloczyn", "iloraz", "iloraz", "potega"]);
  return probuj(() => {
    let tex, x, regula, dzialanie;
    if (rodzaj === "iloczyn") {
      const m = r.int(2, 8), n = r.int(2, 8);
      x = m + n; tex = `${pw(a, m)} \\cdot ${pw(a, n)}`;
      regula = "Wykładniki dodajemy"; dzialanie = `${m} + ${n} = ${x}`;
    } else if (rodzaj === "iloraz") {
      const m = r.int(5, 12), n = r.int(2, m - 2);
      x = m - n; tex = r.chance(0.5) ? `${pw(a, m)} : ${pw(a, n)}` : `\\frac{${pw(a, m)}}{${pw(a, n)}}`;
      regula = "Wykładniki odejmujemy"; dzialanie = `${m} - ${n} = ${x}`;
    } else {
      const m = r.int(2, 4), n = r.int(2, 4);
      x = m * n; tex = `(${pw(a, m)})^{${n}}`;
      regula = "Wykładniki mnożymy"; dzialanie = `${m} \\cdot ${n} = ${x}`;
    }
    if (a ** x > 100000 || x < 2) return null;
    return zad(
      `Oblicz: $${tex}$.`,
      [pole("wynik", "Wynik")],
      { wynik: q(a ** x) },
      `$${a ** x}$`,
      [
        `Zanim cokolwiek policzymy, korzystamy z reguł działań na potęgach. ${regula}: $${dzialanie}$, więc $${tex} = ${pw(a, x)}$.`,
        `Teraz wartość: $${pw(a, x)} = ${razyTex(a, Math.min(x, 6))}${x > 6 ? " \\cdot \\ldots" : ""} = ${a ** x}$.`,
      ],
    );
  });
}

function rownanieWykladnicze(r) {
  const a = r.pick([2, 3, 4, 5, 6, 7, 10]);
  const x = probuj(() => { const t = r.int(2, 8); return a ** t <= 100000 && a ** t >= 16 ? t : null; });
  const lista = Array.from({ length: x - 1 }, (_, i) => `$${pw(a, i + 2)} = ${a ** (i + 2)}$`);
  return zad(
    `Dla jakiej liczby $x$ prawdziwa jest równość $${pw(a, "x")} = ${a ** x}$?`,
    [pole("x", POLE_X)],
    { x: q(x) },
    `$x = ${x}$`,
    [
      `Szukamy takiego wykładnika, żeby liczba $${a}$ podniesiona do niego dała $${a ** x}$. Wypisujemy kolejne potęgi: ${lista.join(", ")}.`,
      `Wartość $${a ** x}$ pojawia się przy wykładniku $${x}$, więc $x = ${x}$.`,
    ],
  );
}

// Notacja wykładnicza: a · 10^n, 1 ≤ a < 10

/** Potęga dziesięciu bez „^{1}”: wykładnik 1 piszemy jako samo 10. */
const p10 = (n) => (n === 1 ? "10" : `10^{${n}}`);
const grupuj = (cyfry) => cyfry.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
/** Mantysa z cyfr: "45" -> 4,5. */
const mantQ = (cyfry) => q(Number(cyfry), 10 ** (cyfry.length - 1));
const mantTex = (cyfry) => dz(mantQ(cyfry));
const duzaTex = (cyfry, n) => grupuj(cyfry + "0".repeat(n - (cyfry.length - 1)));
const malaTex = (cyfry, n) => `0{,}${"0".repeat(-n - 1)}${cyfry}`;
const MANTYSY = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "15", "25", "32", "45", "72", "81", "36", "56", "125", "375"];
const LP_MIEJSC = ["miejsce", "miejsca", "miejsc"];

function notacjaDuza(r) {
  const c = r.pick(MANTYSY), n = r.int(4, 11);
  return zad(
    `Zapisz liczbę $${duzaTex(c, n)}$ w postaci $a \\cdot 10^{n}$, gdzie $1 \\le a < 10$, a $n$ jest liczbą całkowitą. Podaj $a$ i $n$.`,
    [pole("a", "$a =$"), pole("n", "$n =$")],
    { a: mantQ(c), n: q(n) },
    `$${duzaTex(c, n)} = ${mantTex(c)} \\cdot ${p10(n)}$`,
    [
      `Przesuwamy przecinek tak, żeby przed nim została jedna cyfra różna od zera: dostajemy $a = ${mantTex(c)}$.`,
      `Przecinek (stoi na końcu liczby) przesunęliśmy o $${n}$ ${lm(n, LP_MIEJSC)} w lewo. Liczba jest duża, więc wykładnik jest dodatni: $n = ${n}$.`,
      `$${duzaTex(c, n)} = ${mantTex(c)} \\cdot ${p10(n)}$.`,
    ],
  );
}

function notacjaMala(r) {
  const c = r.pick(MANTYSY), n = -r.int(2, 7);
  return zad(
    `Zapisz liczbę $${malaTex(c, n)}$ w postaci $a \\cdot 10^{n}$, gdzie $1 \\le a < 10$, a $n$ jest liczbą całkowitą. Podaj $a$ i $n$.`,
    [pole("a", "$a =$"), pole("n", "$n =$")],
    { a: mantQ(c), n: q(n) },
    `$${malaTex(c, n)} = ${mantTex(c)} \\cdot ${p10(n)}$`,
    [
      `Przesuwamy przecinek w prawo, aż przed nim stanie pierwsza cyfra różna od zera: dostajemy $a = ${mantTex(c)}$.`,
      `Przecinek przesunęliśmy o $${-n}$ ${lm(-n, LP_MIEJSC)} w prawo. Liczba jest mała, więc wykładnik jest ujemny: $n = ${n}$.`,
      `$${malaTex(c, n)} = ${mantTex(c)} \\cdot ${p10(n)}$.`,
    ],
  );
}

function notacjaNaDziesietna(r) {
  const { a, n, v } = probuj(() => {
    const a = mantQ(r.pick(["1", "2", "3", "4", "5", "6", "7", "8", "9", "15", "25", "32", "45", "72", "81", "36"]));
    const n = r.int(-4, 4);
    if (n === 0 || n === 1) return null;
    const v = a.mul(q(10).pow(n));
    return skonczonyDz(v) && ladna(v) ? { a, n, v } : null;
  });
  return zad(
    `Zapisz liczbę $${dz(a)} \\cdot ${p10(n)}$ w postaci dziesiętnej.`,
    [pole("liczba", "Liczba w zapisie dziesiętnym")],
    { liczba: v },
    `$${dz(v)}$`,
    [
      n > 0
        ? `Wykładnik $${n}$ jest dodatni, więc przecinek przesuwamy o $${n}$ ${lm(n, LP_MIEJSC)} w prawo (w razie potrzeby dopisujemy zera).`
        : `Wykładnik $${n}$ jest ujemny, więc przecinek przesuwamy o $${-n}$ ${lm(-n, LP_MIEJSC)} w lewo (z przodu dopisujemy zera). To nie znaczy, że liczba jest ujemna – jest tylko mała.`,
      `$${dz(a)} \\cdot ${p10(n)} = ${dz(v)}$.`,
    ],
  );
}

function normalizuj(a, n) {
  while (a.cmp(10) >= 0) { a = a.div(10); n++; }
  while (a.cmp(1) < 0) { a = a.mul(10); n--; }
  return { a, n };
}

function notacjaNiestandardowa(r) {
  const { b, n0, a, n } = probuj(() => {
    const b = q(r.pick([12, 25, 36, 48, 64, 120, 250, 15, 45, 75]), r.pick([1, 1, 1, 10, 100]));
    const n0 = r.intBez(-4, 8, 0, 1);
    if (b.cmp(10) < 0 && b.cmp(1) >= 0) return null;
    const { a, n } = normalizuj(b, n0);
    return ladna(a) && skonczonyDz(a) ? { b, n0, a, n } : null;
  });
  const s = n - n0;
  return zad(
    `Zapisz liczbę $${dz(b)} \\cdot ${p10(n0)}$ w postaci $a \\cdot 10^{n}$, gdzie $1 \\le a < 10$, a $n$ jest liczbą całkowitą. Podaj $a$ i $n$.`,
    [pole("a", "$a =$"), pole("n", "$n =$")],
    { a, n: q(n) },
    `$${dz(a)} \\cdot ${p10(n)}$`,
    [
      `Liczba przed potęgą musi spełniać $1 \\le a < 10$, a tu mamy $${dz(b)}$ – ${b.cmp(10) >= 0 ? "za dużo" : "za mało"}.`,
      `Zapisujemy $${dz(b)} = ${dz(a)} \\cdot ${p10(s)}$.`,
      `Wstawiamy: $${dz(b)} \\cdot ${p10(n0)} = ${dz(a)} \\cdot ${p10(s)} \\cdot ${p10(n0)} = ${dz(a)} \\cdot 10^{${s} + ${nawias(n0)}} = ${dz(a)} \\cdot ${p10(n)}$.`,
    ],
  );
}

function notacjaDzialanie(r) {
  const MANT = [q(2), q(3), q(4), q(5), q(6), q(7), q(8), q(9), q(5, 2), q(3, 2), q(9, 2), q(6, 5)];
  const { A1, A2, n1, n2, mnoz, a, n, surowe, nSurowe } = probuj(() => {
    const A1 = r.pick(MANT), A2 = r.pick(MANT), n1 = r.intBez(-4, 9, 0, 1), n2 = r.intBez(-4, 9, 0, 1);
    const mnoz = r.chance(0.6);
    const surowe = mnoz ? A1.mul(A2) : A1.div(A2);
    const nSurowe = mnoz ? n1 + n2 : n1 - n2;
    if (!skonczonyDz(surowe) || !ladna(surowe) || surowe.eq(1) || A1.eq(A2)) return null;
    const { a, n } = normalizuj(surowe, nSurowe);
    return Math.abs(n) <= 15 && skonczonyDz(a) && 10000 % a.d === 0 && a.d <= 100 ? { A1, A2, n1, n2, mnoz, a, n, surowe, nSurowe } : null;
  });
  const czyNormalna = surowe.cmp(10) < 0 && surowe.cmp(1) >= 0;
  const x1 = `(${dz(A1)} \\cdot ${p10(n1)})`, x2 = `(${dz(A2)} \\cdot ${p10(n2)})`;
  return zad(
    `Oblicz $${x1} ${mnoz ? "\\cdot" : ":"} ${x2}$ i zapisz wynik w postaci $a \\cdot 10^{n}$, gdzie $1 \\le a < 10$. Podaj $a$ i $n$.`,
    [pole("a", "$a =$"), pole("n", "$n =$")],
    { a, n: q(n) },
    `$${dz(a)} \\cdot ${p10(n)}$`,
    [
      "Liczby przed potęgami i potęgi dziesięciu liczymy osobno.",
      mnoz
        ? `$${dz(A1)} \\cdot ${dz(A2)} = ${dz(surowe)}$ oraz $${p10(n1)} \\cdot ${p10(n2)} = 10^{${n1} + ${nawias(n2)}} = ${p10(nSurowe)}$.`
        : `$${dz(A1)} : ${dz(A2)} = ${dz(surowe)}$ oraz $${p10(n1)} : ${p10(n2)} = 10^{${n1} - ${nawias(n2)}} = ${p10(nSurowe)}$.`,
      czyNormalna
        ? `Wyszło $${dz(surowe)} \\cdot ${p10(nSurowe)}$ i liczba przed potęgą jest już od $1$ do $10$, więc to wynik.`
        : `Wyszło $${dz(surowe)} \\cdot ${p10(nSurowe)}$, ale liczba przed potęgą nie spełnia $1 \\le a < 10$. Zapisujemy $${dz(surowe)} = ${dz(a)} \\cdot ${p10(n - nSurowe)}$, więc wynik to $${dz(a)} \\cdot ${p10(n)}$.`,
    ],
  );
}

const FAKTY_NOTACJA = [
  { tekst: "Światło w ciągu jednej sekundy pokonuje około $300\\,000$ km. Zapisz tę odległość w postaci $a \\cdot 10^{n}$ km, gdzie $1 \\le a < 10$.", a: q(3), n: 5, wynik: "$3 \\cdot 10^{5}$" },
  { tekst: "Odległość Ziemi od Słońca wynosi około $150\\,000\\,000$ km. Zapisz ją w postaci $a \\cdot 10^{n}$ km, gdzie $1 \\le a < 10$.", a: q(3, 2), n: 8, wynik: "$1{,}5 \\cdot 10^{8}$" },
  { tekst: "Polska ma około $38\\,000\\,000$ mieszkańców. Zapisz tę liczbę w postaci $a \\cdot 10^{n}$, gdzie $1 \\le a < 10$.", a: q(19, 5), n: 7, wynik: "$3{,}8 \\cdot 10^{7}$" },
  { tekst: "Grubość ludzkiego włosa wynosi około $0{,}00007$ m. Zapisz ją w postaci $a \\cdot 10^{n}$ m, gdzie $1 \\le a < 10$.", a: q(7), n: -5, wynik: "$7 \\cdot 10^{-5}$" },
  { tekst: "Średnica pewnego wirusa to około $0{,}0000001$ m. Zapisz ją w postaci $a \\cdot 10^{n}$ m, gdzie $1 \\le a < 10$.", a: q(1), n: -7, wynik: "$1 \\cdot 10^{-7}$" },
];

function notacjaZKontekstu(r) {
  const f = r.pick(FAKTY_NOTACJA);
  const duza = f.n > 0;
  return zad(
    f.tekst + " Podaj $a$ i $n$.",
    [pole("a", "$a =$"), pole("n", "$n =$")],
    { a: f.a, n: q(f.n) },
    f.wynik,
    [
      "Przesuwamy przecinek tak, żeby przed nim została jedna cyfra różna od zera.",
      `${duza ? "Liczba jest duża, więc przecinek idzie w lewo, a wykładnik jest dodatni" : "Liczba jest mała, więc przecinek idzie w prawo, a wykładnik jest ujemny"}: ${duza ? `przesuwamy o $${f.n}$ ${lm(f.n, LP_MIEJSC)}` : `przesuwamy o $${-f.n}$ ${lm(-f.n, LP_MIEJSC)}`}.`,
      `Wynik: ${f.wynik}, czyli $a = ${dz(f.a)}$ i $n = ${f.n}$.`,
    ],
  );
}

function notacjaWykladnicza(r) {
  const w = r.int(0, 99);
  if (w < 20) return notacjaDuza(r);
  if (w < 40) return notacjaMala(r);
  if (w < 55) return notacjaNaDziesietna(r);
  if (w < 70) return notacjaNiestandardowa(r);
  if (w < 90) return notacjaDzialanie(r);
  return notacjaZKontekstu(r);
}

function dzialaniaNaPotegach(r) {
  const w = r.int(0, 99);
  if (w < 24) return wykladnikZReguly(r);
  if (w < 40) return wykladnikRozne(r);
  if (w < 48) return wartoscZReguly(r);
  if (w < 54) return rownanieWykladnicze(r);
  return notacjaWykladnicza(r);
}

// --- 13. Pierwiastki: wartości, istnienie, szacowanie

const pier = (n, st = 2) => (st === 2 ? `\\sqrt{${n}}` : `\\sqrt[3]{${n}}`);
/** Największa liczba całkowita a, że a^st ≤ n. */
const calkowitaCzesc = (n, st) => {
  let a = 0;
  while ((a + 1) ** st <= n) a++;
  return a;
};

function pierwiastekZTabelki(r) {
  if (r.chance(0.6)) {
    const k = r.int(2, 20), n = k * k;
    return zad(
      `Oblicz $${pier(n)}$.`,
      [pole("wynik", "Wynik")],
      { wynik: q(k) },
      `$${k}$`,
      [
        "Pytamy: jaka liczba podniesiona do kwadratu daje liczbę pod pierwiastkiem? Pomaga tabelka kwadratów do $20$.",
        `$${k}^2 = ${k} \\cdot ${k} = ${n}$, więc $${pier(n)} = ${k}$.`,
      ],
    );
  }
  const k = r.int(2, 10);
  const ujemny = k <= 6 && r.chance(0.35);
  const n = (ujemny ? -1 : 1) * k ** 3;
  return zad(
    `Oblicz $${pier(n, 3)}$.`,
    [pole("wynik", "Wynik")],
    { wynik: q(ujemny ? -k : k) },
    `$${ujemny ? -k : k}$`,
    [
      "Pytamy: jaka liczba podniesiona do sześcianu daje liczbę pod pierwiastkiem? Pomaga tabelka sześcianów do $10$.",
      ujemny
        ? `Pod pierwiastkiem sześciennym może stać liczba ujemna, bo sześcian zachowuje znak: $(-${k})^3 = -${k ** 3}$, więc $${pier(n, 3)} = -${k}$.`
        : `$${k}^3 = ${k} \\cdot ${k} \\cdot ${k} = ${k ** 3}$, więc $${pier(n, 3)} = ${k}$.`,
    ],
  );
}

function pierwiastekUlamka(r) {
  const rodzaj = r.pick(["zwykly2", "zwykly3", "dz2", "dz2", "dz3", "dz4"]);
  if (rodzaj === "zwykly2" || rodzaj === "zwykly3") {
    const st = rodzaj === "zwykly2" ? 2 : 3;
    const { p, b } = probuj(() => {
      const b = r.int(2, st === 2 ? 12 : 6), p = r.int(1, st === 2 ? 11 : 5);
      return nwd(p, b) === 1 && p !== b ? { p, b } : null;
    });
    return zad(
      `Oblicz $${pier(`\\frac{${p ** st}}{${b ** st}}`, st)}$.`,
      [pole("wynik", "Wynik")],
      { wynik: q(p, b) },
      `$${fr(p, b)}$`,
      [
        `Pierwiastek z ułamka to pierwiastek z licznika podzielony przez pierwiastek z mianownika: $${pier(`\\frac{${p ** st}}{${b ** st}}`, st)} = \\frac{${pier(p ** st, st)}}{${pier(b ** st, st)}}$.`,
        `$${pier(p ** st, st)} = ${p}$ (bo $${p}^${st} = ${p ** st}$) oraz $${pier(b ** st, st)} = ${b}$ (bo $${b}^${st} = ${b ** st}$), więc wynik to $${fr(p, b)}$.`,
      ],
    );
  }
  const st = rodzaj === "dz3" ? 3 : 2;
  const maks = rodzaj === "dz4" ? 9 : st === 2 ? 15 : 9;
  const m = probuj(() => { const x = r.int(rodzaj === "dz4" ? 2 : 1, maks); return x % 10 === 0 ? null : x; });
  const miejsca = rodzaj === "dz4" ? 4 : st === 2 ? 2 : 3;
  const podp = rodzaj === "dz4" ? 100 : 10;   // pierwiastek = m / podp
  const rad = q(m ** st, podp ** st);
  const wynik = q(m, podp);
  return zad(
    `Oblicz $${pier(dz(rad, miejsca), st)}$.`,
    [pole("wynik", "Wynik")],
    { wynik },
    `$${dz(wynik)}$`,
    [
      `Zamieniamy ułamek dziesiętny na zwykły: $${dz(rad, miejsca)} = ${fr(m ** st, podp ** st)}$.`,
      `Pierwiastek z ułamka: $${pier(m ** st, st)} = ${m}$ oraz $${pier(podp ** st, st)} = ${podp}$, więc wynik to $${fr(m, podp)} = ${dz(wynik)}$.`,
      `Sprawdzenie: $${dz(wynik)}^${st} = ${dz(rad)}$.`,
    ],
  );
}

/** Składnik wyrażenia z pierwiastkami: { tex, v, opis }. */
function skladnikPierwiastka(r) {
  const st = r.chance(0.35) ? 3 : 2;
  const k = st === 2 ? r.int(2, 14) : r.int(2, 6);
  const wsp = r.chance(0.3) ? r.int(2, 4) : 1;
  const rad = k ** st;
  const tex = `${wsp > 1 ? wsp : ""}${pier(rad, st)}`;
  return { tex, v: wsp * k, k, rad, st, wsp };
}

function wyrazeniePierwiastkowe(r) {
  if (r.chance(0.3)) {
    const [a, b, c] = r.pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [7, 24, 25], [20, 21, 29]]);
    const suma = r.chance(0.55);
    const [x, y] = r.chance(0.5) ? [a, b] : [b, a];   // x – jedna przyprostokątna, y – druga
    return zad(
      suma ? `Oblicz $\\sqrt{${x}^2 + ${y}^2}$.` : `Oblicz $\\sqrt{${c}^2 - ${x}^2}$.`,
      [pole("wynik", "Wynik")],
      { wynik: q(suma ? c : y) },
      `$${suma ? c : y}$`,
      suma
        ? [
          "Najpierw liczymy to, co jest pod pierwiastkiem – pierwiastek obejmuje całe wyrażenie.",
          `$${x}^2 + ${y}^2 = ${x * x} + ${y * y} = ${c * c}$, więc $\\sqrt{${c * c}} = ${c}$.`,
          `Uwaga: $\\sqrt{${x * x} + ${y * y}}$ to nie to samo co $\\sqrt{${x * x}} + \\sqrt{${y * y}} = ${x} + ${y} = ${x + y}$.`,
        ]
        : [
          "Najpierw liczymy to, co jest pod pierwiastkiem – pierwiastek obejmuje całe wyrażenie.",
          `$${c}^2 - ${x}^2 = ${c * c} - ${x * x} = ${y * y}$, więc $\\sqrt{${y * y}} = ${y}$.`,
        ],
    );
  }
  if (r.chance(0.25)) {
    const n = probuj(() => { const x = r.int(2, 30); return calkowitaCzesc(x, 2) ** 2 === x ? null : x; });
    const k = r.int(2, 12);
    return zad(
      `Oblicz $(\\sqrt{${n}})^2 + \\sqrt{${k * k}}$.`,
      [pole("wynik", "Wynik")],
      { wynik: q(n + k) },
      `$${n + k}$`,
      [
        `Pierwiastek i kwadrat „znoszą się”: $(\\sqrt{${n}})^2 = ${n}$.`,
        `$\\sqrt{${k * k}} = ${k}$, więc razem: $${n} + ${k} = ${n + k}$.`,
      ],
    );
  }
  const n = r.pick([2, 3, 3]);
  const skl = Array.from({ length: n }, () => skladnikPierwiastka(r));
  if (new Set(skl.map((x) => `${x.st}:${x.rad}`)).size < skl.length) return wyrazeniePierwiastkowe(r);
  const znaki = skl.map((_, i) => (i === 0 ? 1 : r.pick([1, -1])));
  const w = skl.reduce((s, x, i) => s + znaki[i] * x.v, 0);
  if (Math.abs(w) > 60) return wyrazeniePierwiastkowe(r);
  const wyr = skl.map((x, i) => `${i === 0 ? "" : znaki[i] > 0 ? " + " : " - "}${x.tex}`).join("");
  const wartosci = skl.map((x) => (x.wsp > 1 ? `${x.wsp} \\cdot ${x.k}` : String(x.k)));
  const policzone = skl.map((x) => String(x.v));
  const lancuch = (arr) => arr.map((s, i) => `${i === 0 ? "" : znaki[i] > 0 ? " + " : " - "}${s}`).join("");
  return zad(
    `Oblicz: $${wyr}$.`,
    [pole("wynik", "Wynik")],
    { wynik: q(w) },
    `$${w}$`,
    [
      `Obliczamy każdy pierwiastek osobno: ${skl.map((x) => `$${pier(x.rad, x.st)} = ${x.k}$`).join(", ")}.`,
      `Podstawiamy: $${lancuch(wartosci)}${skl.some((x) => x.wsp > 1) ? ` = ${lancuch(policzone)}` : ""} = ${w}$.`,
    ],
  );
}

function pierwiastekJakoPrawdziwaRownosc(r) {
  const pytaPrawde = r.chance(0.55);
  const k = () => r.int(3, 12), k3 = () => r.int(2, 5);
  const prawdy = [
    () => { const x = k(); return { tex: `${pier(x * x)} = ${x}`, powod: `$${x}^2 = ${x * x}$, więc to prawda` }; },
    () => { const x = k3(); return { tex: `${pier(-(x ** 3), 3)} = -${x}`, powod: `$(-${x})^3 = -${x ** 3}$, więc to prawda (pod pierwiastkiem sześciennym może być liczba ujemna)` }; },
    () => { const a = r.int(2, 9), b = r.int(2, 9); return { tex: `${pier(a * a)} \\cdot ${pier(b * b)} = ${a * b}`, powod: `$${a} \\cdot ${b} = ${a * b}$, więc to prawda` }; },
    () => { const x = k(); return { tex: `-${pier(x * x)} = -${x}`, powod: `$${pier(x * x)} = ${x}$, a minus z przodu zostaje, więc to prawda` }; },
    () => { const a = r.int(2, 9), b = r.int(2, 9); return { tex: `${pier(a * a)} + ${pier(b * b)} = ${a + b}`, powod: `$${a} + ${b} = ${a + b}$, więc to prawda` }; },
    () => { const x = r.int(2, 9); return { tex: `${pier(`(-${x})^2`)} = ${x}`, powod: `$(-${x})^2 = ${x * x}$ i $${pier(x * x)} = ${x}$, więc to prawda` }; },
    () => { const x = r.int(2, 30); return { tex: `(${pier(x)})^2 = ${x}`, powod: `pierwiastek i kwadrat „znoszą się”, więc to prawda` }; },
  ];
  const fatsze = [
    () => { const x = r.pick([4, 6, 8, 10, 12]); return { tex: `${pier(x * x)} = ${(x * x) / 2}`, powod: `$${pier(x * x)} = ${x}$ (to nie połowa liczby pod pierwiastkiem)` }; },
    () => { const x = r.int(2, 9); return { tex: `${pier(-(x * x))} = -${x}`, powod: `$${pier(-(x * x))}$ nie istnieje, bo pod pierwiastkiem kwadratowym nie może stać liczba ujemna` }; },
    () => { const a = r.int(2, 9), b = r.int(2, 9); return { tex: `${pier(a * a)} + ${pier(b * b)} = ${pier(a * a + b * b)}`, powod: `$${pier(a * a)} + ${pier(b * b)} = ${a} + ${b} = ${a + b}$, a pierwiastek sumy to nie suma pierwiastków` }; },
    () => { const x = k(); return { tex: `${pier(x * x)} = \\pm ${x}`, powod: `$${pier(x * x)} = ${x}$ – znak pierwiastka daje jedną, nieujemną liczbę` }; },
    () => { const x = k3(); return { tex: `${pier(x ** 3, 3)} = ${3 * x}`, powod: `$${x}^3 = ${x ** 3}$, więc $${pier(x ** 3, 3)} = ${x}$, a nie $${3 * x}$` }; },
    () => { const x = r.int(2, 9); return { tex: `${pier(`(-${x})^2`)} = -${x}`, powod: `$(-${x})^2 = ${x * x}$, więc $${pier(x * x)} = ${x}$, a nie $-${x}$` }; },
    () => { const x = k3(); return { tex: `${pier(-(x ** 3), 3)} = ${x}`, powod: `$(-${x})^3 = -${x ** 3}$, więc $${pier(-(x ** 3), 3)} = -${x}$` }; },
  ];
  const wybierz = (lista, ile_) => r.shuffle(lista).slice(0, ile_).map((f) => f());
  const dobre = pytaPrawde ? wybierz(prawdy, 1) : wybierz(fatsze, 1);
  const inne = pytaPrawde ? wybierz(fatsze, 3) : wybierz(prawdy, 3);
  const m = probuj(() => mieszaj(r, `$${dobre[0].tex}$`, inne.map((x) => `$${x.tex}$`)));
  const wszystkie = [...dobre, ...inne];
  return zad(
    pytaPrawde ? "Która z podanych równości jest prawdziwa?" : "Która z podanych równości jest fałszywa?",
    [polew("rownosc", "Równość", m.opcje)],
    { rownosc: m.ind },
    `$${dobre[0].tex}$`,
    [
      "Sprawdzamy po kolei każdą równość (korzystamy z tabelki kwadratów i sześcianów).",
      ...m.opcje.map((o) => { const x = wszystkie.find((y) => `$${y.tex}$` === o); return `${o}: ${x.powod}.`; }),
    ],
  );
}

function ktoreIstnieje(r) {
  const k = () => r.int(2, 9);
  const nieistnieje = [
    () => { const x = k(); return { tex: pier(-(x * x)), powod: `pod pierwiastkiem kwadratowym jest $-${x * x}$ – liczba ujemna, więc to wyrażenie nie istnieje` }; },
    () => { const a = r.int(2, 6), b = r.int(a + 2, 9); return { tex: pier(`${a * a} - ${b * b}`), powod: `$${a * a} - ${b * b} = ${a * a - b * b}$ – pod pierwiastkiem jest liczba ujemna, więc to wyrażenie nie istnieje` }; },
    () => { const x = r.int(2, 9); return { tex: pier(`-${x}`), powod: `pod pierwiastkiem kwadratowym jest liczba ujemna ($-${x}$), więc to wyrażenie nie istnieje` }; },
    () => { const x = r.int(2, 5); return { tex: pier(`${x}^2 - ${(x + 1) ** 2}`), powod: `$${x}^2 - ${(x + 1) ** 2} = ${x * x - (x + 1) ** 2}$ – liczba ujemna pod pierwiastkiem kwadratowym` }; },
  ];
  const istnieje = [
    () => { const x = r.int(2, 5); return { tex: pier(-(x ** 3), 3), powod: `pierwiastek sześcienny z liczby ujemnej istnieje i równa się $-${x}$` }; },
    () => { const x = k(); return { tex: `-${pier(x * x)}`, powod: `minus stoi przed pierwiastkiem, a pod nim jest $${x * x}$; wartość to $-${x}$` }; },
    () => { const a = r.int(5, 9), b = r.int(2, a - 1); return { tex: pier(`${a * a} - ${b * b}`), powod: `$${a * a} - ${b * b} = ${a * a - b * b}$ – liczba dodatnia, więc pierwiastek istnieje` }; },
    () => { const x = k(); return { tex: pier(`(-${x})^2`), powod: `$(-${x})^2 = ${x * x}$, więc pierwiastek istnieje i równa się $${x}$` }; },
    () => { const x = r.int(2, 5); return { tex: pier(`${x}^2 - ${x * x - 1}`), powod: `$${x}^2 - ${x * x - 1} = 1$, więc pod pierwiastkiem jest liczba dodatnia` }; },
    () => { return { tex: pier(0), powod: "pod pierwiastkiem jest $0$ – to wolno, $\\sqrt{0} = 0$" }; },
  ];
  const zle = r.shuffle(nieistnieje)[0]();
  const dobre = r.shuffle(istnieje).slice(0, 3).map((f) => f());
  const m = probuj(() => mieszaj(r, `$${zle.tex}$`, dobre.map((x) => `$${x.tex}$`)));
  const wszystkie = [zle, ...dobre];
  return zad(
    "Które z podanych wyrażeń nie ma sensu liczbowego (nie istnieje)?",
    [polew("wyrazenie", "Wyrażenie", m.opcje)],
    { wyrazenie: m.ind },
    `$${zle.tex}$`,
    [
      "Pod pierwiastkiem kwadratowym nie może stać liczba ujemna. Pod sześciennym – może. Policz najpierw to, co jest pod pierwiastkiem.",
      ...m.opcje.map((o) => { const x = wszystkie.find((y) => `$${y.tex}$` === o); return `${o}: ${x.powod}.`; }),
    ],
  );
}

function pomiedzyCalkowitymi(r) {
  const st = r.chance(0.7) ? 2 : 3;
  const n = probuj(() => {
    const x = r.int(2, st === 2 ? 200 : 300);
    return calkowitaCzesc(x, st) ** st === x ? null : x;
  });
  const a = calkowitaCzesc(n, st), b = a + 1;
  return zad(
    `Liczba $${pier(n, st)}$ leży między dwiema kolejnymi liczbami całkowitymi: $a < ${pier(n, st)} < b$. Podaj $a$ i $b$.`,
    [pole("a", "$a =$"), pole("b", "$b =$")],
    { a: q(a), b: q(b) },
    `$${a} < ${pier(n, st)} < ${b}$`,
    [
      `Szukamy dwóch kolejnych ${st === 2 ? "kwadratów" : "sześcianów"}, między którymi leży $${n}$: $${a}^${st} = ${a ** st}$ oraz $${b}^${st} = ${b ** st}$.`,
      `Skoro $${a ** st} < ${n} < ${b ** st}$, to po spierwiastkowaniu $${pier(a ** st, st)} < ${pier(n, st)} < ${pier(b ** st, st)}$, czyli $${a} < ${pier(n, st)} < ${b}$.`,
    ],
  );
}

function ileLiczbMiedzyPierwiastkami(r) {
  const { A, B } = probuj(() => {
    const A = r.int(2, 60), B = r.int(A + 15, 250);
    return calkowitaCzesc(A, 2) ** 2 !== A && calkowitaCzesc(B, 2) ** 2 !== B && calkowitaCzesc(B, 2) - calkowitaCzesc(A, 2) >= 2 ? { A, B } : null;
  });
  const a = calkowitaCzesc(A, 2), b = calkowitaCzesc(B, 2);
  const lista = Array.from({ length: b - a }, (_, i) => a + 1 + i);
  return zad(
    `Ile liczb całkowitych leży między liczbami $\\sqrt{${A}}$ i $\\sqrt{${B}}$ na osi liczbowej?`,
    [pole("ile", "Liczba liczb całkowitych")],
    { ile: q(b - a) },
    `$${b - a}$`,
    [
      `Szacujemy: $${a}^2 = ${a * a} < ${A} < ${(a + 1) ** 2} = ${a + 1}^2$, więc $${a} < \\sqrt{${A}} < ${a + 1}$.`,
      `Podobnie $${b}^2 = ${b * b} < ${B} < ${(b + 1) ** 2} = ${b + 1}^2$, więc $${b} < \\sqrt{${B}} < ${b + 1}$.`,
      `Między tymi pierwiastkami leżą liczby całkowite od $${a + 1}$ do $${b}$: ${listaTex(lista)} – razem $${b - a}$ ${lm(b - a, ["liczba", "liczby", "liczb"])}.`,
    ],
  );
}

function zaokraglenieZPierwiastka(r) {
  const n = probuj(() => {
    const x = r.int(5, 150);
    return calkowitaCzesc(x, 2) ** 2 === x ? null : x;
  });
  const k = calkowitaCzesc(n, 2);
  const wynik = n <= k * k + k ? k : k + 1;
  const polowa = k * k + k;   // (k + 0,5)^2 = k^2 + k + 0,25
  return zad(
    `Zaokrąglij liczbę $\\sqrt{${n}}$ do jedności.`,
    [pole("wynik", "Liczba po zaokrągleniu")],
    { wynik: q(wynik) },
    `$${wynik}$`,
    [
      `Szacujemy: $${k}^2 = ${k * k} < ${n} < ${(k + 1) ** 2} = ${k + 1}^2$, więc $${k} < \\sqrt{${n}} < ${k + 1}$.`,
      `Żeby wiedzieć, która z liczb jest bliżej, sprawdzamy „połówkę”: $${dz(q(2 * k + 1, 2))}^2 = ${dz(q((2 * k + 1) ** 2, 4), 2)}$.`,
      n <= polowa
        ? `Ponieważ $${n} < ${dz(q((2 * k + 1) ** 2, 4), 2)}$, mamy $\\sqrt{${n}} < ${dz(q(2 * k + 1, 2))}$, więc $\\sqrt{${n}}$ jest bliżej $${k}$.`
        : `Ponieważ $${n} > ${dz(q((2 * k + 1) ** 2, 4), 2)}$, mamy $\\sqrt{${n}} > ${dz(q(2 * k + 1, 2))}$, więc $\\sqrt{${n}}$ jest bliżej $${k + 1}$.`,
      `$\\sqrt{${n}} \\approx ${wynik}$.`,
    ],
  );
}

function wartoscPierwiastkow(r) {
  const w = r.int(0, 99);
  if (w < 22) return pierwiastekZTabelki(r);
  if (w < 36) return pierwiastekUlamka(r);
  if (w < 56) return wyrazeniePierwiastkowe(r);
  if (w < 64) return pierwiastekJakoPrawdziwaRownosc(r);
  if (w < 72) return ktoreIstnieje(r);
  if (w < 84) return pomiedzyCalkowitymi(r);
  if (w < 92) return ileLiczbMiedzyPierwiastkami(r);
  return zaokraglenieZPierwiastka(r);
}

// --- 14. Pierwiastki: mnożenie, dzielenie, wyłączanie czynnika, włączanie

const czyPotega = (n, st) => calkowitaCzesc(n, st) ** st === n;

function mnozenieDzieleniePierwiastkow(r) {
  const st = r.chance(0.25) ? 3 : 2;
  const rodzaj = r.pick(["mnoz", "mnoz", "dziel", "ulamek"]);
  if (rodzaj === "mnoz") {
    const { d, e, k } = probuj(() => {
      const k = st === 2 ? r.int(2, 14) : r.int(2, 6);
      const pot = k ** st;
      const dziel = dzielnikiLiczby(pot).filter((x) => x > 1 && x < pot && !czyPotega(x, st) && !czyPotega(pot / x, st));
      if (!dziel.length) return null;
      const d = r.pick(dziel);
      return { d, e: pot / d, k };
    });
    const [x, y] = r.chance(0.5) ? [d, e] : [e, d];
    return zad(
      `Oblicz $${pier(x, st)} \\cdot ${pier(y, st)}$.`,
      [pole("wynik", "Wynik")],
      { wynik: q(k) },
      `$${k}$`,
      [
        `Przy mnożeniu wkładamy liczby pod jeden znak pierwiastka: $${pier(x, st)} \\cdot ${pier(y, st)} = ${pier(`${x} \\cdot ${y}`, st)} = ${pier(x * y, st)}$.`,
        `$${pier(x * y, st)} = ${k}$, bo $${k}^${st} = ${k ** st}$.`,
      ],
    );
  }
  const { B, k } = probuj(() => {
    const B = r.int(2, st === 2 ? 12 : 7), k = st === 2 ? r.int(2, 9) : r.int(2, 5);
    return !czyPotega(B, st) && B * k ** st <= (st === 2 ? 500 : 600) ? { B, k } : null;
  });
  const A = B * k ** st;
  const ulamek = rodzaj === "ulamek";
  return zad(
    `Oblicz ${ulamek ? `$\\frac{${pier(A, st)}}{${pier(B, st)}}$` : `$${pier(A, st)} : ${pier(B, st)}$`}.`,
    [pole("wynik", "Wynik")],
    { wynik: q(k) },
    `$${k}$`,
    [
      `Przy dzieleniu wkładamy liczby pod jeden znak pierwiastka: ${ulamek ? `$\\frac{${pier(A, st)}}{${pier(B, st)}} = ${pier(`\\frac{${A}}{${B}}`, st)}$` : `$${pier(A, st)} : ${pier(B, st)} = ${pier(`${A} : ${B}`, st)}$`}.`,
      `$${A} : ${B} = ${k ** st}$, więc wynik to $${pier(k ** st, st)} = ${k}$.`,
    ],
  );
}

const BEZ_KWADRATU = [2, 3, 5, 6, 7, 10, 11];

function wylaczanieCzynnika(r) {
  const szescian = r.chance(0.2);
  if (!szescian) {
    const { a, b } = probuj(() => {
      const a = r.int(2, 9), b = r.pick(BEZ_KWADRATU);
      return a * a * b <= 400 ? { a, b } : null;
    });
    const n = a * a * b;
    return zad(
      `Zapisz liczbę $\\sqrt{${n}}$ w postaci $a\\sqrt{b}$, gdzie $a$ i $b$ są liczbami całkowitymi dodatnimi, a $b$ jest możliwie najmniejsze. Podaj $a$ i $b$.`,
      [pole("a", "$a =$"), pole("b", "$b =$")],
      { a: q(a), b: q(b) },
      `$\\sqrt{${n}} = ${a}\\sqrt{${b}}$`,
      [
        `Szukamy największego kwadratu (spośród $4, 9, 16, 25, 36, \\ldots$), który dzieli $${n}$: to $${a * a}$, bo $${n} = ${a * a} \\cdot ${b}$.`,
        `$\\sqrt{${n}} = \\sqrt{${a * a} \\cdot ${b}} = \\sqrt{${a * a}} \\cdot \\sqrt{${b}} = ${a}\\sqrt{${b}}$.`,
        `Pod pierwiastkiem zostało $${b}$ – żaden kwadrat (poza $1$) go nie dzieli, więc nie da się wyłączyć więcej. Sprawdzenie: $(${a}\\sqrt{${b}})^2 = ${a * a} \\cdot ${b} = ${n}$.`,
      ],
    );
  }
  const { a, b } = probuj(() => {
    const a = r.int(2, 4), b = r.pick([2, 3, 4, 5, 6, 7]);
    return a ** 3 * b <= 450 ? { a, b } : null;
  });
  const n = a ** 3 * b;
  return zad(
    `Zapisz liczbę $\\sqrt[3]{${n}}$ w postaci $a\\sqrt[3]{b}$, gdzie $a$ i $b$ są liczbami całkowitymi dodatnimi, a $b$ jest możliwie najmniejsze. Podaj $a$ i $b$.`,
    [pole("a", "$a =$"), pole("b", "$b =$")],
    { a: q(a), b: q(b) },
    `$\\sqrt[3]{${n}} = ${a}\\sqrt[3]{${b}}$`,
    [
      `Szukamy największego sześcianu (spośród $8, 27, 64, \\ldots$), który dzieli $${n}$: to $${a ** 3}$, bo $${n} = ${a ** 3} \\cdot ${b}$.`,
      `$\\sqrt[3]{${n}} = \\sqrt[3]{${a ** 3} \\cdot ${b}} = \\sqrt[3]{${a ** 3}} \\cdot \\sqrt[3]{${b}} = ${a}\\sqrt[3]{${b}}$.`,
    ],
  );
}

function wlaczanieCzynnika(r) {
  const szescian = r.chance(0.25);
  const st = szescian ? 3 : 2;
  const { a, b } = probuj(() => {
    const a = szescian ? r.int(2, 4) : r.int(2, 9), b = r.pick(szescian ? [2, 3, 4, 5, 6, 7] : [2, 3, 5, 6, 7, 10]);
    return a ** st * b <= 600 ? { a, b } : null;
  });
  const x = a ** st * b;
  return zad(
    `Liczbę $${a}${pier(b, st)}$ zapisz w postaci $${pier("x", st)}$. Ile wynosi $x$?`,
    [pole("x", POLE_X)],
    { x: q(x) },
    `$${a}${pier(b, st)} = ${pier(x, st)}$`,
    [
      `Liczba przed pierwiastkiem wchodzi pod pierwiastek ${szescian ? "w sześcianie" : "w kwadracie"}: $${a}^${st} = ${a ** st}$.`,
      `$${a}${pier(b, st)} = ${pier(`${a}^${st}`, st)} \\cdot ${pier(b, st)} = ${pier(`${a ** st} \\cdot ${b}`, st)} = ${pier(x, st)}$.`,
      `Uwaga: nie wolno po prostu pomnożyć $${a} \\cdot ${b} = ${a * b}$ – to częsty błąd. Liczba przed pierwiastkiem wchodzi ${szescian ? "w sześcianie" : "w kwadracie"}, a nie jako zwykły czynnik.`,
    ],
  );
}

function dodawaniePodobnychPierwiastkow(r) {
  const { b, c1, c2, plus } = probuj(() => {
    const b = r.pick([2, 3, 5, 6, 7]), c1 = r.int(1, 6), c2 = r.int(1, 6);
    const plus = r.chance(0.6);
    if (c1 === c2 || (!plus && c1 < c2)) return null;
    if (c1 * c1 * b > 300 || c2 * c2 * b > 300) return null;
    return c1 === 1 && c2 === 1 ? null : { b, c1, c2, plus };
  });
  const r1 = c1 * c1 * b, r2 = c2 * c2 * b;
  const s = plus ? c1 + c2 : c1 - c2;
  const wyl = (c, rad) => (c === 1 ? `$\\sqrt{${rad}}$ zostaje bez zmian` : `$\\sqrt{${rad}} = \\sqrt{${c * c} \\cdot ${b}} = ${c}\\sqrt{${b}}$`);
  return zad(
    `Wiadomo, że $\\sqrt{${r1}} ${plus ? "+" : "-"} \\sqrt{${r2}} = a\\sqrt{${b}}$. Ile wynosi $a$?`,
    [pole("a", "$a =$")],
    { a: q(s) },
    `$a = ${s}$`,
    [
      "Pierwiastki można dodawać i odejmować tylko wtedy, gdy są „takie same”, więc najpierw wyłączamy czynnik przed pierwiastek.",
      `${wyl(c1, r1)}; ${wyl(c2, r2)}.`,
      `Teraz mamy „takie same owoce”: $${c1 === 1 ? "" : c1}\\sqrt{${b}} ${plus ? "+" : "-"} ${c2 === 1 ? "" : c2}\\sqrt{${b}} = (${c1} ${plus ? "+" : "-"} ${c2})\\sqrt{${b}} = ${s}\\sqrt{${b}}$, czyli $a = ${s}$.`,
    ],
  );
}

function porownaniePierwiastkow(r) {
  const rowne = r.chance(0.15);
  const calkowita = !rowne && r.chance(0.25);
  const strona = (c, d) => (d === 1 ? String(c) : c === 1 ? `\\sqrt{${d}}` : `${c}\\sqrt{${d}}`);
  const { L, R, X, Y } = probuj(() => {
    let a, b, c, d;
    if (rowne) {
      const m = r.pick([2, 3]), d0 = r.pick([2, 3, 5]);
      a = r.int(2, 5); b = m * m * d0; c = a * m; d = d0;
    } else if (calkowita) {
      a = r.int(2, 6); b = r.pick(BEZ_KWADRATU);
      c = Math.max(2, Math.round(a * Math.sqrt(b))); d = 1;
    } else {
      a = r.int(2, 6); b = r.pick(BEZ_KWADRATU); c = r.int(2, 6); d = r.pick(BEZ_KWADRATU);
    }
    const X = a * a * b, Y = c * c * d;
    if (!rowne && X === Y) return null;
    if (Math.abs(X - Y) > 40 && !rowne) return null;
    return { L: { c: a, d: b }, R: { c, d }, X, Y };
  });
  const lt = strona(L.c, L.d), rt = strona(R.c, R.d);
  const ind = X < Y ? 0 : X === Y ? 1 : 2;
  const znak = ["<", "=", ">"];
  return zad(
    "Wskaż poprawne porównanie liczb.",
    [polew("porownanie", "Porównanie", znak.map((z) => `$${lt} ${z} ${rt}$`))],
    { porownanie: ind },
    `$${lt} ${znak[ind]} ${rt}$`,
    [
      "Żeby porównać takie liczby, wprowadzamy czynnik pod pierwiastek (liczba wchodzi w kwadracie). Obie liczby są dodatnie, więc większy jest ten, który ma większą liczbę pod pierwiastkiem.",
      `$${lt} = \\sqrt{${L.c}^2 \\cdot ${L.d}} = \\sqrt{${X}}$ oraz $${rt} = ${R.d === 1 ? `\\sqrt{${R.c}^2}` : `\\sqrt{${R.c}^2 \\cdot ${R.d}}`} = \\sqrt{${Y}}$.`,
      `${X < Y ? `$${X} < ${Y}$, więc $\\sqrt{${X}} < \\sqrt{${Y}}$` : X === Y ? `$${X} = ${Y}$, więc liczby są równe` : `$${X} > ${Y}$, więc $\\sqrt{${X}} > \\sqrt{${Y}}$`}, czyli $${lt} ${znak[ind]} ${rt}$.`,
    ],
  );
}

function przeksztalcaniePierwiastkow(r) {
  const w = r.int(0, 99);
  if (w < 26) return mnozenieDzieleniePierwiastkow(r);
  if (w < 50) return wylaczanieCzynnika(r);
  if (w < 66) return wlaczanieCzynnika(r);
  if (w < 84) return dodawaniePodobnychPierwiastkow(r);
  return porownaniePierwiastkow(r);
}

// --- Lista generatorów

export const GENERATORY = [
  { id: "liczby-rzymskie", nazwa: "Liczby rzymskie, lata i wieki", opis: "Zamiana liczb rzymskich na dziesiętne i odwrotnie (lata, wieki), poprawny zapis rzymski, pierwszy i ostatni rok wieku.", temat: "systemy-zapisu", generuj: liczbyRzymskie },
  { id: "wartosc-cyfry", nazwa: "Wartość cyfry i układanie liczb z cyfr", opis: "Wartość podkreślonej cyfry (także po przecinku), liczba setek i dziesiątek, ile razy jedna cyfra jest warta więcej niż druga, największa i najmniejsza liczba z podanych cyfr.", temat: "systemy-zapisu", generuj: wartoscCyfry },
  { id: "odczyt-z-osi", nazwa: "Odczyt liczby z osi liczbowej", opis: "Liczba przedstawiona przez punkt na osi: wartość jednego odstępu, punkty w równych odstępach, liczby ujemne i ułamki.", temat: "os-liczbowa", generuj: odczytZOsi },
  { id: "odleglosc-srodek-porownanie", nazwa: "Odległość, środek odcinka i porównywanie liczb", opis: "Odległość między punktami (także ujemnymi, ułamkami), liczba pośrodku, drugi koniec odcinka, największa lub najmniejsza z czterech liczb, liczby całkowite między dwiema liczbami.", temat: "os-liczbowa", generuj: odlegloscSrodekPorownanie },
  { id: "rozwiniecia-dziesietne", nazwa: "Rozwinięcia dziesiętne: skończone i okresowe", opis: "Czy rozwinięcie jest skończone, jaka cyfra stoi na dalekim miejscu po przecinku, suma cyfr, długość okresu.", temat: "ulamki-i-rozwiniecia", generuj: rozwinieciaDziesietne },
  { id: "ulamki-zwykle-i-dziesietne", nazwa: "Wyrażenia z ułamkami zwykłymi i dziesiętnymi", opis: "Obliczanie wyrażeń, w których występują naraz ułamki zwykłe (także o rozwinięciu okresowym) i dziesiętne; wynik jako ułamek zwykły lub dziesiętny.", temat: "ulamki-i-rozwiniecia", generuj: wyrazeniaMieszane },
  { id: "dzielniki-i-liczby-pierwsze", nazwa: "Dzielniki i liczby pierwsze", opis: "Liczba dzielników, liczby pierwsze w przedziale (liczba i suma), najbliższa liczba pierwsza, wybór liczby pierwszej lub złożonej, dzielniki pierwsze.", temat: "dzielniki", generuj: dzielnikiILiczbyPierwsze },
  { id: "reszty-i-parzystosc", nazwa: "Reszty z dzielenia i parzystość", opis: "Reszta po dodaniu lub pomnożeniu, liczby o danej reszcie, dzień tygodnia za N dni, wyrażenia 2n i 2n + 1.", temat: "dzielniki", generuj: resztyIParzystosc },
  { id: "zaokraglanie-liczb", nazwa: "Zaokrąglanie liczb", opis: "Zaokrąglanie do dziesiątek, setek, tysięcy, części dziesiątych i setnych, przybliżenia z niedomiarem i nadmiarem, zaokrąglanie ułamków zwykłych.", temat: "zaokraglanie", generuj: zaokraglanieLiczb },
  { id: "szacowanie-i-zadania", nazwa: "Szacowanie i zadania z treścią: w górę czy w dół", opis: "Ile autobusów, ile pełnych paczek, suma zaokrąglonych cen oraz wybór najlepszego oszacowania iloczynu lub ilorazu.", temat: "zaokraglanie", generuj: szacowanieIZadania },
  { id: "wartosc-potegi", nazwa: "Wartość potęgi", opis: "Potęgi liczb ujemnych ((−2)² a −2²), potęgi ułamków i liczb dziesiętnych, potęga zerowa, znak potęgi.", temat: "potegi", generuj: wartoscPotegi },
  { id: "dzialania-na-potegach", nazwa: "Działania na potęgach i notacja wykładnicza", opis: "Mnożenie, dzielenie i potęgowanie potęg (wykładnik x), sprowadzanie do jednej podstawy, zapis a · 10ⁿ dużych i małych liczb.", temat: "potegi", generuj: dzialaniaNaPotegach },
  { id: "wartosc-pierwiastkow", nazwa: "Wartość pierwiastka i szacowanie", opis: "Pierwiastki kwadratowe i sześcienne z tabelki, z ułamków, wyrażenia z pierwiastkami, istnienie pierwiastka, między którymi liczbami całkowitymi leży pierwiastek.", temat: "pierwiastki", generuj: wartoscPierwiastkow },
  { id: "przeksztalcanie-pierwiastkow", nazwa: "Mnożenie, dzielenie i wyłączanie czynnika", opis: "Mnożenie i dzielenie pierwiastków, wyłączanie czynnika przed pierwiastek i włączanie pod pierwiastek, dodawanie podobnych pierwiastków, porównywanie.", temat: "pierwiastki", generuj: przeksztalcaniePierwiastkow },
];
