// Generatory zadań z działu „Egzamin ósmoklasisty – podstawy”: arytmetyka, której uczniowie często nie opanowali w szkole podstawowej.
// Pisemne dodawanie, odejmowanie, mnożenie i dzielenie, kolejność działań, liczby ujemne, podzielność, NWD i NWW, ułamki zwykłe i dziesiętne.
// Kontrakt zadania i narzędzia: zob. wspolne.js. Każdy generator ma pole temat – id tematu z assets/arkusze/tematy.js (dział "e8-podstawy").
// Rozwiązania są pisane prostym językiem. Rachunki pisemne pokazują układ kolumn jako tablicę KaTeX (sekcja „Zapis pisemnych działań”).
// Odpowiedzi liczymy dokładnie na Q (bez liczb zmiennoprzecinkowych); ułamki zwykłe wpisuje się w dwóch polach: licznik i mianownik,
// więc ułamka nieskróconego program nie uzna za poprawny.
import { Q, q } from "./wspolne.js";

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
const zad = (tresc, pola, odpowiedz, wynik, rozwiazanie) => ({ tresc, pola, odpowiedz, wynik, rozwiazanie });
const ulamekTex = (n, d) => (d === 1 ? String(n) : `\\frac{${n}}{${d}}`);
const ladna = (v) => Math.abs(v.n) <= 100000 && v.d <= 40;
/** Wynik dziesiętny: co najwyżej 4 cyfry po przecinku (mianownik dzieli 10 000), np. 0,045 albo 5,6088. */
const ladnaDz = (v) => Math.abs(v.n) <= 100000 && 10000 % v.d === 0;

/** Powtarza losowanie, aż f() zwróci zadanie (wartość różną od null); f korzysta z tego samego losownika, więc wynik jest powtarzalny. */
function probuj(f, proby = 600) {
  for (let i = 0; i < proby; i++) {
    const w = f();
    if (w) return w;
  }
  throw new Error("Nie udało się wylosować zadania");
}

/** Przybliżenie do szacowania: dwucyfrowe do dziesiątek (73 -> 70), większe do dwóch cyfr znaczących (3847 -> 3800). */
function zaokr(n) {
  const d = String(n).length;
  if (d <= 1) return n;
  const p = 10 ** Math.max(1, d - 2);
  return Math.round(n / p) * p;
}

/** Czy szacunek jest bliski wyniku (najwyżej 20% różnicy) – tylko wtedy pokazujemy sprawdzenie szacowaniem. */
const blisko = (szac, wynik) => wynik !== 0 && Math.abs(szac - wynik) <= 0.2 * Math.abs(wynik);

const NAZWY_KOLUMN = ["jedności", "dziesiątki", "setki", "tysiące", "dziesiątki tysięcy", "setki tysięcy"];

// --- Zapis pisemnych działań (tablice KaTeX, jedna cyfra w kolumnie; przeniesienia i pożyczki małymi szarymi cyframi)

const szary = (s) => `{\\color{gray}\\scriptsize ${s}}`;
const szaraCyfra = (s) => `{\\color{gray}${s}}`;
/** Uzupełnia tablicę komórek pustymi z lewej do długości L. */
const kol = (komorki, L) => [...Array(L - komorki.length).fill(""), ...komorki];

/** Tablica KaTeX z wierszy (tablice komórek albo "H" – pozioma kreska). */
function tablicaTex(wiersze, kolumny, wyrownanie = "r") {
  let s = "";
  for (const w of wiersze) s += w === "H" ? "\\hline " : `${w.join(" & ")} \\\\ `;
  return `\\begin{array}{${wyrownanie.repeat(kolumny)}} ${s.replace(/ \\\\ $/, "")} \\end{array}`;
}

/** Wstawia kolumnę z przecinkiem przed ostatnimi k cyframi (gdy k > 0). */
const zPrzecinkiem = (komorki, L, k, przecinek = "{,}") => (k > 0 ? [...komorki.slice(0, L - k), przecinek, ...komorki.slice(L - k)] : komorki);

/** Kolejne kolumny dodawania (od jedności): składniki, przeniesienie z poprzedniej kolumny, suma, cyfra do zapisania i nowe przeniesienie. */
function kolumnySumy(liczby) {
  const maxL = Math.max(...liczby.map((n) => String(n).length));
  const wyn = [];
  let c = 0;
  for (let t = 0; t < maxL; t++) {
    const skl = liczby.map((n) => Number(String(n).split("").reverse()[t] ?? NaN)).filter((x) => !Number.isNaN(x));
    const s = skl.reduce((a, b) => a + b, 0) + c;
    wyn.push({ t, skl, we: c, suma: s, cyfra: s % 10, wy: Math.floor(s / 10) });
    c = Math.floor(s / 10);
  }
  return wyn;
}

/**
 * Dodawanie pisemne. liczby – liczby całkowite (dla ułamków dziesiętnych: pomnożone przez 10^k), k – miejsca po przecinku,
 * miejsca[i] – ile miejsc po przecinku ma i-ty składnik (dopisane zera pokazujemy na szaro).
 */
function dodawanieTex(liczby, k = 0, miejsca = liczby.map(() => k)) {
  const suma = liczby.reduce((a, b) => a + b, 0);
  const cif = (n) => String(n).padStart(k + 1, "0");
  const L = cif(suma).length;
  const surowe = liczby.map((n) => kol(cif(n).split(""), L));
  const rozloz = (n, m) => {
    const c = cif(n).split("");
    for (let j = c.length - (k - m); j < c.length; j++) c[j] = szaraCyfra(c[j]);
    return kol(c, L);
  };
  const przen = Array(L).fill("");
  let c = 0;
  for (let j = L - 1; j >= 1; j--) {
    const s = surowe.reduce((acc, w) => acc + Number(w[j] || 0), 0) + c;
    c = Math.floor(s / 10);
    if (c > 0 && surowe.some((w) => w[j - 1] !== "")) przen[j - 1] = szary(c);
  }
  const rzedy = [];
  if (przen.some(Boolean)) rzedy.push(["", ...zPrzecinkiem(przen, L, k, "")]);
  liczby.forEach((n, i) => rzedy.push([i === liczby.length - 1 ? "+" : "", ...zPrzecinkiem(rozloz(n, miejsca[i]), L, k)]));
  rzedy.push("H", ["", ...zPrzecinkiem(kol(cif(suma).split(""), L), L, k)]);
  return tablicaTex(rzedy, L + 1 + (k > 0 ? 1 : 0));
}

/**
 * Odejmowanie pisemne a − b (a ≥ b), przy ułamkach dziesiętnych jak w dodawaniu. Pożyczka: u góry mała szara cyfra – nowa wartość
 * cyfry odjemnej, a przekreślona jest cyfra, z której pożyczono (albo która dostała 10). Zera, z których nie ma czego pożyczyć, stają się dziewiątkami.
 * Zwraca tablicę i opis kolumn (od jedności w lewo).
 */
function odejmowanieTex(a, b, k = 0, miejsca = [k, k]) {
  const cif = (n) => String(n).padStart(k + 1, "0");
  const L = cif(a).length;
  const m = cif(a).split("").map(Number);
  const s = cif(b).padStart(L, "0").split("").map(Number);
  const cur = [...m];
  const kolumny = [];
  let kaskada = false;
  for (let i = L - 1; i >= 0; i--) {
    const przed = cur[i];
    let pozyczka = false;
    if (cur[i] < s[i]) {
      pozyczka = true;
      let j = i - 1;
      while (cur[j] === 0) j--;
      if (j < i - 1) kaskada = true;
      cur[j]--;
      for (let t = j + 1; t < i; t++) cur[t] = 9;
      cur[i] += 10;
    }
    kolumny.push({ i, orig: m[i], przed, po: cur[i], s: s[i], res: cur[i] - s[i], pozyczka });
  }
  const dopisane = (j, mi) => j >= L - (k - mi);   // czy cyfra o indeksie j to dopisane zero
  const gorny = cur.map((v, j) => (v !== m[j] ? szary(v) : ""));
  const odjemna = m.map((c, j) => {
    const t = dopisane(j, miejsca[0]) ? szaraCyfra(c) : String(c);
    return cur[j] !== c ? `\\cancel{${t}}` : t;
  });
  const dlugB = cif(b).length;
  const odjemnik = kol(cif(b).split("").map((c, j) => (j >= dlugB - (k - miejsca[1]) ? szaraCyfra(c) : c)), L);
  const rzedy = [];
  if (gorny.some(Boolean)) rzedy.push(["", ...zPrzecinkiem(gorny, L, k, "")]);
  rzedy.push(["", ...zPrzecinkiem(odjemna, L, k)], ["-", ...zPrzecinkiem(odjemnik, L, k)]);
  rzedy.push("H", ["", ...zPrzecinkiem(kol(cif(a - b).split(""), L), L, k)]);
  return { tex: tablicaTex(rzedy, L + 1 + (k > 0 ? 1 : 0)), kolumny, kaskada };
}

/** Mnożenie pisemne a · b. Przy jednocyfrowym mnożniku – z przeniesieniami; przy kilkucyfrowym – wiersze iloczynów częściowych (dopisane zera na szaro). */
function mnozenieTex(a, b) {
  const w = a * b;
  const as = String(a), bs = String(b);
  const L = Math.max(String(w).length, as.length, bs.length);
  const bd = bs.split("").map(Number).reverse();
  const wierszA = ["", ...kol(as.split(""), L)];
  const wierszB = ["\\times", ...kol(bs.split(""), L)];
  const rzedy = [];
  if (bd.length === 1) {
    const przen = Array(L).fill("");
    let c = 0;
    for (let t = as.length - 1; t >= 1; t--) {
      c = Math.floor((Number(as[t]) * bd[0] + c) / 10);
      if (c > 0) przen[L - as.length + t - 1] = szary(c);
    }
    if (przen.some(Boolean)) rzedy.push(["", ...przen]);
    rzedy.push(wierszA, wierszB, "H", ["", ...kol(String(w).split(""), L)]);
  } else {
    rzedy.push(wierszA, wierszB, "H");
    bd.forEach((d, i) => {
      const cz = d === 0 ? Array(as.length).fill(szaraCyfra("0")) : String(a * d).split("");
      rzedy.push(["", ...kol([...cz, ...Array(i).fill(szaraCyfra("0"))], L)]);
    });
    rzedy.push("H", ["", ...kol(String(w).split(""), L)]);
  }
  return tablicaTex(rzedy, L + 1);
}

/**
 * Dzielenie pisemne D : d po polsku: wynik nad kreską, pod dzielną kolejne odejmowania, w każdym kroku „znosimy” następną cyfrę.
 * Jedna kolumna tablicy, a cyfry ustawione w „szufladkach” stałej szerokości (\phantom), żeby wszystko leżało dokładnie pod właściwą cyfrą.
 * Zwraca tablicę, kroki, iloraz i resztę.
 */
function dzielenieTex(D, d) {
  const ds = String(D).split("").map(Number);
  const n = ds.length;
  let i = 0, cur = ds[0], tekst = String(ds[0]);
  while (cur < d && i < n - 1) {
    i++;
    cur = cur * 10 + ds[i];
    tekst += ds[i];
  }
  const kroki = [];
  for (;;) {
    const iq = Math.floor(cur / d), il = iq * d, reszta = cur - il;
    kroki.push({ i, cur, tekst, q: iq, il, reszta });
    if (i === n - 1) break;
    i++;
    tekst = `${reszta}${ds[i]}`;
    cur = reszta * 10 + ds[i];
  }
  const SL = "\\quad";
  const luka = (k) => "\\phantom{0\\quad}".repeat(k);
  const rzad = (start, txt, { minus = false, linia = false, dod = "" } = {}) => {
    let cialo = txt.split("").join(SL);
    if (linia) cialo = `\\underline{${cialo}}`;
    return `\\phantom{-\\;}${luka(start)}${minus ? "\\llap{-\\;}" : ""}${cialo}${dod}`;
  };
  const ost = kroki[kroki.length - 1].reszta;
  const wiersze = [[rzad(kroki[0].i, kroki.map((s) => s.q).join(""))], "H", [rzad(0, String(D), { dod: `${SL}:${SL}${d}` })]];
  kroki.forEach((s, j) => {
    if (j > 0) wiersze.push([rzad(s.i - s.tekst.length + 1, s.tekst)]);
    wiersze.push([rzad(s.i - String(s.il).length + 1, String(s.il), { minus: true, linia: true })]);
  });
  wiersze.push([rzad(n - String(ost).length, String(ost), { dod: ost > 0 ? "\\;\\leftarrow\\text{ reszta}" : "" })]);
  return { tex: tablicaTex(wiersze, 1, "l"), kroki, iloraz: Number(kroki.map((s) => s.q).join("")), reszta: ost };
}

// --- 1. Dodawanie pisemne

const MIARY_DODAWANIA = [
  (a, b) => `Pan Adam przejechał w pierwszym tygodniu $${dz(a)}$ km, a w drugim $${dz(b)}$ km. Ile kilometrów przejechał w sumie?`,
  (a, b) => `W sklepie sprzedano w poniedziałek towar za $${dz(a)}$ zł, a we wtorek za $${dz(b)}$ zł. Jaka jest łączna wartość sprzedaży?`,
  (a, b) => `Pierwsza ciężarówka wiozła $${dz(a)}$ kg jabłek, a druga $${dz(b)}$ kg. Ile kilogramów jabłek wiozły razem?`,
];

function dodawaniePisemne(r) {
  const liczby = probuj(() => {
    const ile3 = r.chance(0.25);
    const cyfr = ile3 ? r.pick([3, 4]) : r.pick([3, 4, 4, 5]);
    const l = Array.from({ length: ile3 ? 3 : 2 }, (_, i) => {
      const c = i === 0 ? cyfr : r.int(Math.max(3, cyfr - 1), cyfr);
      return r.int(10 ** (c - 1), 10 ** c - 1);
    });
    const suma = l.reduce((a, b) => a + b, 0);
    if (suma > 100000 || !kolumnySumy(l).some((k) => k.wy > 0)) return null;
    return l;
  });
  const suma = liczby.reduce((a, b) => a + b, 0);
  const wyr = liczby.map((x) => dz(x)).join(" + ");
  const tresc = liczby.length === 2 && r.chance(0.5)
    ? `${r.pick(MIARY_DODAWANIA)(liczby[0], liczby[1])} Policz pisemnie.`
    : `Oblicz pisemnie: $${wyr}$.`;
  const kolumny = kolumnySumy(liczby);
  const kroki = kolumny.map((k, idx) => {
    if (k.skl.length === 1 && !k.we) return `${cap(NAZWY_KOLUMN[k.t])}: nie ma tu nic do dodania, więc przepisujemy $${k.suma}$.`;
    const dzialanie = `${k.skl.join(" + ")}${k.we ? ` + ${k.we}` : ""} = ${k.suma}`;
    const pam = k.we ? ` (w tym pamiętana $${k.we}$)` : "";
    const koniec = idx === kolumny.length - 1 && k.wy > 0
      ? `, a ponieważ to ostatnia kolumna, piszemy całe $${k.suma}$.`
      : k.wy > 0 ? `, piszemy $${k.cyfra}$ i pamiętamy $${k.wy}$.` : `, piszemy $${k.suma}$.`;
    return `${cap(NAZWY_KOLUMN[k.t])}: $${dzialanie}$${pam}${koniec}`;
  });
  const przyblizenie = liczby.map(zaokr);
  return zad(
    tresc,
    [pole("wynik", "Wynik")],
    { wynik: q(suma) },
    `$${dz(suma)}$`,
    [
      "Piszemy liczby jedna pod drugą tak, żeby jedności były pod jednościami, dziesiątki pod dziesiątkami itd. Dodajemy kolumnami, zaczynając od prawej strony.",
      ...kroki,
      `Całe dodawanie wygląda tak: $${dodawanieTex(liczby)}$`,
      `Sprawdzenie szacowaniem: $${przyblizenie.map((x) => dz(x)).join(" + ")} = ${dz(przyblizenie.reduce((a, b) => a + b, 0))}$ – to blisko wyniku $${dz(suma)}$, więc wszystko się zgadza.`,
    ],
  );
}

// --- 2. Odejmowanie pisemne

const MIARY_ODEJMOWANIA = [
  (a, b) => `Na koncie było $${dz(a)}$ zł. Wydano $${dz(b)}$ zł. Ile złotych zostało na koncie?`,
  (a, b) => `Trasa rajdu ma $${dz(a)}$ m. Zawodnik przebiegł już $${dz(b)}$ m. Ile metrów jeszcze mu zostało?`,
  (a, b) => `W magazynie było $${dz(a)}$ kg mąki. Sprzedano $${dz(b)}$ kg. Ile kilogramów mąki zostało?`,
];

function odejmowaniePisemne(r) {
  const { a, b, o } = probuj(() => {
    const dl = r.pick([3, 4, 4, 5]);
    let a;
    if (r.chance(0.3)) a = r.int(1, 9) * 10 ** (dl - 1) + r.pick([0, 0, 1, 2, 3, 5, 7, 9]) * r.pick([1, 1, 10]);   // z zerami: 5003, 40070
    else a = r.int(10 ** (dl - 1) + 1000, 10 ** dl - 1);
    if (a < 10 ** (dl - 1)) return null;
    const b = r.int(Math.max(100, 10 ** (dl - 2)), a - 1);
    if (b >= a || b < 100) return null;
    const o = odejmowanieTex(a, b);
    return o.kolumny.some((k) => k.pozyczka) ? { a, b, o } : null;
  });
  const wynik = a - b;
  const tresc = r.chance(0.4) ? `${r.pick(MIARY_ODEJMOWANIA)(a, b)} Policz pisemnie.` : `Oblicz pisemnie: $${dz(a)} - ${dz(b)}$.`;
  const kroki = o.kolumny.map((k, idx) => {
    const nazwa = cap(NAZWY_KOLUMN[idx]);
    const poPozyczce = k.przed !== k.orig ? ` (po pożyczce zostało tu $${k.przed}$)` : "";
    if (k.pozyczka) return `${nazwa}${poPozyczce}: z $${k.przed}$ nie odejmiemy $${k.s}$, więc pożyczamy $10$ z sąsiedniej kolumny: $${k.po} - ${k.s} = ${k.res}$.`;
    return `${nazwa}${poPozyczce}: $${k.przed} - ${k.s} = ${k.res}$.`;
  });
  const p1 = zaokr(a), p2 = zaokr(b);
  return zad(
    tresc,
    [pole("wynik", "Wynik")],
    { wynik: q(wynik) },
    `$${dz(wynik)}$`,
    [
      "Piszemy liczby jedna pod drugą (większa u góry): jedności pod jednościami, dziesiątki pod dziesiątkami itd. Odejmujemy kolumnami od prawej strony.",
      "Gdy cyfra u góry jest za mała, pożyczamy $1$ z kolumny po lewej: tam robi się o $1$ mniej, a u nas przybywa $10$ (to jak rozmienianie banknotu na drobne).",
      ...kroki,
      ...(o.kaskada ? ["Zera nie mają czego pożyczyć, więc bierzemy od najbliższej cyfry różnej od zera, a zera po drodze zamieniają się w dziewiątki."] : []),
      `Całe odejmowanie wygląda tak (mała szara liczba to cyfra po pożyczce): $${o.tex}$`,
      `Sprawdzenie: odejmowanie sprawdzamy dodawaniem. $${dz(wynik)} + ${dz(b)} = ${dz(a)}$ – zgadza się z liczbą, od której odejmowaliśmy.`
        + (blisko(p1 - p2, wynik) ? ` Szacowanie: $${dz(p1)} - ${dz(p2)} = ${dz(p1 - p2)}$ – blisko wyniku.` : ""),
    ],
  );
}

// --- 3. Mnożenie pisemne

const MIARY_MNOZENIA = [
  (a, b) => `Jeden bilet kosztuje $${dz(a)}$ zł. Ile zapłacimy łącznie, jeśli kupimy ${ile(b, ["taki bilet", "takie bilety", "takich biletów"])}? Policz pisemnie.`,
  (a, b) => `W jednym pudełku jest ${ile(a, ["cukierek", "cukierki", "cukierków"])}. Ile cukierków jest w $${b}$ takich pudełkach? Policz pisemnie.`,
  (a, b) => `Jedna paczka waży $${dz(a)}$ g. Ile gramów ważą ${ile(b, ["taka paczka", "takie paczki", "takich paczek"])}? Policz pisemnie.`,
];

function mnozeniePisemne(r) {
  const w = r.int(0, 9);
  let a, b;
  if (w <= 1) { a = r.int(100, 999); b = r.int(2, 9); }                                   // 3 cyfry · 1 cyfra
  else if (w === 2) { a = r.int(1000, 9999); b = r.int(2, 9); }                            // 4 cyfry · 1 cyfra
  else if (w <= 6) { a = r.int(100, 999); b = r.int(11, 99); if (b % 10 === 0) b++; }      // 3 cyfry · 2 cyfry
  else if (w === 7) { a = r.int(12, 99); if (a % 10 === 0) a++; b = r.int(1, 9) * 100 + r.int(1, 9); }   // mnożnik z zerem w środku, np. 304
  else { a = r.int(12, 99); b = r.int(11, 99); if (a % 10 === 0) a++; if (b % 10 === 0) b++; }          // 2 cyfry · 2 cyfry
  const iloczyn = a * b;
  const bs = String(b);
  const tresc = bs.length <= 2 && a < 1000 && r.chance(0.4) ? r.pick(MIARY_MNOZENIA)(a, b) : `Oblicz pisemnie: $${dz(a)} \\cdot ${dz(b)}$.`;
  const kroki = [];
  if (bs.length === 1) {
    const as = String(a);
    let c = 0;
    for (let t = as.length - 1; t >= 0; t--) {
      const p = Number(as[t]) * b + c;
      const nazwa = cap(NAZWY_KOLUMN[as.length - 1 - t]);
      const dod = c ? ` + ${c}` : "";
      if (t === 0) kroki.push(`${nazwa}: $${as[t]} \\cdot ${b}${dod} = ${p}$ – to ostatnia kolumna, więc piszemy całe $${p}$.`);
      else kroki.push(`${nazwa}: $${as[t]} \\cdot ${b}${dod} = ${p}$ – piszemy $${p % 10}$ i pamiętamy $${Math.floor(p / 10)}$${c ? " (do iloczynu dodajemy pamiętaną cyfrę)" : ""}.`);
      c = Math.floor(p / 10);
    }
  } else {
    [...bs].reverse().forEach((ch, i) => {
      const d = Number(ch);
      const nazwa = NAZWY_KOLUMN[i];
      if (d === 0) kroki.push(`Mnożymy przez $0$ (${nazwa}): wychodzą same zera. Ten wiersz można pominąć, ale następny wiersz musi być przesunięty o $${i + 1}$ ${lm(i + 1, ["miejsce", "miejsca", "miejsc"])} w lewo.`);
      else if (i === 0) kroki.push(`Mnożymy przez $${d}$ (${nazwa}): $${dz(a)} \\cdot ${d} = ${dz(a * d)}$. Piszemy pod kreską.`);
      else kroki.push(`Mnożymy przez $${d}$ (${nazwa}, czyli przez $${d * 10 ** i}$): $${dz(a)} \\cdot ${d} = ${dz(a * d)}$ i dopisujemy $${i}$ ${lm(i, ["zero", "zera", "zer"])} na końcu (szare), czyli przesuwamy wiersz w lewo.`);
    });
    const czesciowe = [...bs].reverse().map((ch, i) => Number(ch) * a * 10 ** i);
    kroki.push(`Dodajemy wiersze: $${czesciowe.map((x) => dz(x)).join(" + ")} = ${dz(iloczyn)}$.`);
  }
  // Szacujemy obie liczby; gdy to za mało dokładne (np. 15 · 501 ≈ 20 · 500), zaokrąglamy tylko większą.
  let p1 = zaokr(a), p2 = zaokr(b);
  if (!blisko(p1 * p2, iloczyn)) [p1, p2] = a >= b ? [zaokr(a), b] : [a, zaokr(b)];
  return zad(
    tresc,
    [pole("wynik", "Wynik")],
    { wynik: q(iloczyn) },
    `$${dz(iloczyn)}$`,
    [
      "Piszemy liczby jedna pod drugą (prawe strony równo). Mnożymy pierwszą liczbę przez kolejne cyfry drugiej, zaczynając od cyfry jedności.",
      ...kroki,
      `Całe mnożenie wygląda tak: $${mnozenieTex(a, b)}$`,
      ...(blisko(p1 * p2, iloczyn) ? [`Sprawdzenie szacowaniem: $${dz(p1)} \\cdot ${dz(p2)} = ${dz(p1 * p2)}$ – blisko wyniku $${dz(iloczyn)}$.`] : []),
    ],
  );
}

// --- 4–5. Dzielenie pisemne

const LICZEBNIKI = ["", "", "dwie", "trzy", "cztery"];

function opisKrokowDzielenia(kroki, d) {
  return kroki.map((s, j) => {
    const ostatni = j === kroki.length - 1;
    const rach = `$${s.cur} : ${d} = ${s.q}$, bo $${s.q} \\cdot ${d} = ${s.il}$. Odejmujemy: $${s.cur} - ${s.il} = ${s.reszta}$.`;
    if (j === 0) {
      const dl = String(s.cur).length;
      const wstep = dl > 1 ? `Pierwsza cyfra jest mniejsza od $${d}$, więc bierzemy ${LICZEBNIKI[dl] ?? dl} pierwsze cyfry: ` : "Zaczynamy od pierwszej cyfry: ";
      return `${wstep}${rach}`;
    }
    if (s.cur === 0) return `Znosimy kolejną cyfrę, mamy $0$. $0 : ${d} = 0$, więc w wyniku piszemy $0$.`;
    if (s.q === 0) return `Znosimy kolejną cyfrę, mamy $${s.cur}$. Liczba $${d}$ nie mieści się w $${s.cur}$ ani razu, więc w wyniku piszemy $0$${ostatni ? `, a $${s.cur}$ zostaje jako reszta.` : " i znosimy następną cyfrę."}`;
    return `Znosimy kolejną cyfrę, mamy $${s.cur}$: ${rach}`;
  });
}

const MIARY_DZIELENIA = [
  (D, d) => `Do $${d}$ pudełek włożono po równo ${ile(D, ["cukierek", "cukierki", "cukierków"])}. Ile cukierków jest w jednym pudełku? Policz pisemnie.`,
  (D, d) => `${ile(D, ["złoty", "złote", "złotych"])} podzielono po równo między $${d}$ ${lm(d, ["osobę", "osoby", "osób"])}. Ile złotych dostała każda osoba? Policz pisemnie.`,
];

function dzielenieBezReszty(r) {
  const d = r.int(2, 9);
  const iloraz = r.pick([() => r.int(100, 999), () => r.int(100, 999), () => r.int(10, 99) * 10 + r.int(0, 9), () => r.int(1, 9) * 100 + r.int(1, 9)])();
  const D = d * iloraz;
  const wyniki = dzielenieTex(D, d);
  const tresc = r.chance(0.4) ? r.pick(MIARY_DZIELENIA)(D, d) : `Oblicz pisemnie: $${dz(D)} : ${d}$.`;
  return zad(
    tresc,
    [pole("wynik", "Wynik")],
    { wynik: q(iloraz) },
    `$${dz(D)} : ${d} = ${dz(iloraz)}$`,
    [
      "Dzielimy po polsku: wynik piszemy nad kreską, a pod dzielną kolejne odejmowania. W każdym kroku pytamy: ile razy dzielnik mieści się w liczbie, którą mamy.",
      ...opisKrokowDzielenia(wyniki.kroki, d),
      `Na końcu zostaje $0$, więc dzielenie wyszło bez reszty. Całe dzielenie: $${wyniki.tex}$`,
      `Sprawdzenie mnożeniem: $${dz(iloraz)} \\cdot ${d} = ${dz(D)}$ – zgadza się z dzielną.`,
    ],
  );
}

// co – formy rzeczownika (po „po”: lm), rodz – dopełniacz liczby mnogiej, paczki – biernik, paczek – dopełniacz
const PACZKI = [
  { co: ["kredkę", "kredki", "kredek"], paczki: "paczki", paczek: "paczek" },
  { co: ["cukierek", "cukierki", "cukierków"], paczki: "woreczki", paczek: "woreczków" },
  { co: ["jabłko", "jabłka", "jabłek"], paczki: "skrzynki", paczek: "skrzynek" },
];

function dzielenieZReszta(r) {
  const d = r.int(3, 9);
  const iloraz = r.int(50, 999);
  const reszta = r.int(1, d - 1);
  const D = d * iloraz + reszta;
  const wyniki = dzielenieTex(D, d);
  const p = r.pick(PACZKI);
  const kontekst = r.chance(0.45);
  const tresc = kontekst
    ? `Z $${dz(D)}$ ${p.co[2]} robimy ${p.paczki} po $${d}$ ${lm(d, p.co)}. Ile pełnych ${p.paczek} da się zrobić i ile ${p.co[2]} zostanie? Policz pisemnie.`
    : `Oblicz pisemnie $${dz(D)} : ${d}$. Podaj iloraz i resztę.`;
  const pola = kontekst
    ? [pole("iloraz", `Liczba pełnych ${p.paczek}`), pole("reszta", `Liczba ${p.co[2]}, które zostaną`)]
    : [pole("iloraz", "Iloraz"), pole("reszta", "Reszta")];
  return zad(
    tresc,
    pola,
    { iloraz: q(iloraz), reszta: q(reszta) },
    `$${dz(D)} : ${d} = ${dz(iloraz)}$, reszta $${reszta}$`,
    [
      "Dzielimy po polsku: wynik piszemy nad kreską, a pod dzielną kolejne odejmowania. Dzielimy aż do ostatniej cyfry dzielnej.",
      ...opisKrokowDzielenia(wyniki.kroki, d),
      `Na końcu zostaje $${reszta}$ – to reszta. Musi być mniejsza od dzielnika ($${reszta} < ${d}$), bo inaczej dałoby się jeszcze raz podzielić. Całe dzielenie: $${wyniki.tex}$`,
      `Sprawdzenie: iloraz razy dzielnik plus reszta ma dać dzielną. $${dz(iloraz)} \\cdot ${d} + ${reszta} = ${dz(iloraz * d)} + ${reszta} = ${dz(D)}$ – zgadza się.`,
    ],
  );
}

// --- 6. Kolejność działań
// Wyrażenie to tablica: liczba, operator ("+", "-", "*", "/"), nawias { g: [...], e: wykładnik } albo potęga { p: podstawa, e: wykładnik }.

const OP_TEX = { "+": "+", "-": "-", "*": "\\cdot", "/": ":" };
const OP_NAZWA = { "*": "Mnożenie", "/": "Dzielenie", "+": "Dodawanie", "-": "Odejmowanie" };

function wyrTex(el) {
  return el.map((x) => {
    if (typeof x === "number") return String(x);
    if (typeof x === "string") return OP_TEX[x];
    if (x.g) return `(${wyrTex(x.g)})${x.e ? `^{${x.e}}` : ""}`;
    return `${x.p}^{${x.e}}`;
  }).join(" ");
}

/** Wartość wyrażenia bez nawiasów i potęg (z pierwszeństwem · i :); null, gdy dzielenie nie wychodzi całkowite albo wynik pośredni jest ujemny. */
function licz(t) {
  const a = [...t];
  for (const grupa of [["*", "/"], ["+", "-"]]) {
    for (let i = 1; i < a.length;) {
      if (!grupa.includes(a[i])) { i += 2; continue; }
      const x = a[i - 1], y = a[i + 1];
      let w;
      if (a[i] === "*") w = x * y;
      else if (a[i] === "/") { if (y === 0 || x % y !== 0) return null; w = x / y; }
      else if (a[i] === "+") w = x + y;
      else w = x - y;
      if (w < 0) return null;
      a.splice(i - 1, 3, w);
    }
  }
  return a[0];
}

/** Kroki obliczania wyrażenia: nawiasy, potęgi, mnożenie i dzielenie od lewej, dodawanie i odejmowanie od lewej. Zwraca null, gdy coś nie wychodzi. */
function krokiWyrazenia(start) {
  let el = start;
  const kroki = [];
  const dodaj = (nazwa, opis) => kroki.push(`${nazwa}: $${opis}$. ${el.length === 1 && typeof el[0] === "number" ? "Wynik" : "Zostaje"}: $${wyrTex(el)}$`);
  if (el.some((x) => x.g)) {
    for (let guard = 0; el.some((x) => x.g) && guard < 5; guard++) {
      const opisy = [];
      el = el.map((x) => {
        if (!x.g) return x;
        const w = licz(x.g);
        if (w === null) return x;
        opisy.push(`${wyrTex(x.g)} = ${w}`);
        return x.e ? { p: w, e: x.e } : w;
      });
      if (!opisy.length) return null;
      dodaj(opisy.length > 1 ? "Nawiasy" : "Nawias", opisy.join("$, $"));
    }
  }
  if (el.some((x) => x.p !== undefined)) {
    const opisy = [];
    el = el.map((x) => {
      if (x.p === undefined) return x;
      opisy.push(`${x.p}^{${x.e}} = ${x.p ** x.e}`);
      return x.p ** x.e;
    });
    dodaj(opisy.length > 1 ? "Potęgi" : "Potęga", opisy.join("$, $"));
  }
  for (const grupa of [["*", "/"], ["+", "-"]]) {
    for (;;) {
      const i = el.findIndex((x) => grupa.includes(x));
      if (i < 0) break;
      const kawalek = [el[i - 1], el[i], el[i + 1]];
      const w = licz(kawalek);
      if (w === null) return null;
      const wiecej = el.filter((x) => grupa.includes(x)).length > 1;
      const opis = `${wyrTex(kawalek)} = ${w}`;
      el = [...el.slice(0, i - 1), w, ...el.slice(i + 2)];
      dodaj(`${OP_NAZWA[kawalek[1]]}${wiecej ? " (od lewej)" : ""}`, opis);
    }
  }
  return { kroki, wynik: el[0] };
}

const SZABLONY_WYRAZEN = [
  (r) => [r.int(3, 40), "+", r.int(2, 9), "*", r.int(2, 9)],
  (r) => { const b = r.int(2, 9), c = r.int(2, 9); return [b * c + r.int(1, 25), "-", b, "*", c]; },
  (r) => { const d = r.int(2, 9); return [r.int(3, 9), "*", r.int(3, 9), "-", d * r.int(2, 8), "/", d]; },
  (r) => { const c = r.int(2, 9); return [r.int(10, 40), "-", c * r.int(2, 9), "/", c, "+", r.int(1, 20)]; },
  (r) => [{ g: [r.int(2, 30), "+", r.int(2, 30)] }, "*", r.int(2, 9)],
  (r) => { const d = r.int(2, 6), s = d * r.int(2, 6), b = r.int(1, s - 1); return [r.int(10, 40), "-", { g: [b, "+", s - b] }, "/", d]; },
  (r) => { const s = r.int(2, 6), c = r.int(1, 8); return [s * r.int(2, 12), "/", { g: [c + s, "-", c] }, "+", r.int(1, 20)]; },
  (r) => { const c = r.int(5, 15), d = r.int(1, c - 1); return [{ g: [r.int(2, 20), "+", r.int(2, 20)] }, "*", { g: [c, "-", d] }]; },
  (r) => [r.int(2, 30), "+", { p: r.int(2, 9), e: 2 }],
  (r) => { const b = r.int(2, 6), a = r.int(2, 6); return [a, "*", { p: b, e: 2 }, "-", r.int(1, a * b * b - 1)]; },
  (r) => [{ g: [r.int(6, 20), "-", r.int(1, 5)], e: 2 }, "+", r.int(2, 9), "*", r.int(2, 9)],
  (r) => { const e = r.int(2, 9), s = r.int(2, 5), m = r.int(1, 3), c = r.int(1, s - 1); return [m * s * s + r.int(1, 30), "-", e * m, "*", { g: [c, "+", s - c], e: 2 }, "/", e]; },
  (r) => { const b = r.int(2, 9); return [b * r.int(2, 9), "/", b, "*", r.int(2, 9)]; },
  (r) => { const b = r.int(2, 30); return [b + r.int(1, 40), "-", b, "+", r.int(2, 30)]; },
  (r) => [r.int(2, 9), "*", r.int(2, 9), "+", r.int(2, 9), "*", r.int(2, 9)],
  (r) => { const b = r.int(2, 9), c = r.int(2, 9); return [b * c + r.int(1, 20), "-", b, "*", c, "+", r.int(2, 20)]; },
];

function kolejnoscDzialan(r) {
  const { wyr, wynik, kroki } = probuj(() => {
    const wyr = r.pick(SZABLONY_WYRAZEN)(r);
    const w = krokiWyrazenia(wyr);
    return w && w.wynik <= 5000 ? { wyr, ...w } : null;
  });
  return zad(
    `Oblicz, pamiętając o kolejności działań: $${wyrTex(wyr)}$.`,
    [pole("wynik", "Wynik")],
    { wynik: q(wynik) },
    `$${wynik}$`,
    [
      "Kolejność działań: najpierw nawiasy, potem potęgi, potem mnożenie i dzielenie (od lewej do prawej), na końcu dodawanie i odejmowanie (od lewej do prawej).",
      ...kroki,
    ],
  );
}

// --- 7. Liczby ujemne

const nawias = (v) => (v < 0 ? `(${v})` : String(v));
const lancuchTex = (v0, ops) => [String(v0), ...ops.map(([op, v]) => `${op} ${nawias(v)}`)].join(" ");

/** Kroki liczenia „v0 op v op v …” od lewej: najpierw zamiana podwójnych znaków, potem kolejne działania jak ruch po osi liczbowej. */
function krokiLancucha(v0, ops) {
  const kroki = [];
  const reguly = [];
  const znormalizowane = ops.map(([op, v]) => {
    if (v >= 0) return [op, v];
    const nowy = op === "+" ? "-" : "+";
    reguly.push(op === "-" ? "odjąć liczbę ujemną to dodać liczbę dodatnią" : "dodać liczbę ujemną to odjąć liczbę dodatnią");
    return [nowy, -v];
  });
  if (reguly.length) {
    const przyklady = [...new Set(ops.filter(([, v]) => v < 0).map(([op, v]) => `$${op} (${v})$ zamieniamy na $${op === "+" ? "-" : "+"} ${-v}$`))];
    kroki.push(`Najpierw pozbywamy się podwójnych znaków (${[...new Set(reguly)].join(", ")}): ${przyklady.join(", ")}. Wyrażenie wygląda teraz tak: $${v0} ${znormalizowane.map(([op, v]) => `${op} ${v}`).join(" ")}$.`);
  }
  kroki.push("Teraz idziemy po osi liczbowej (jak po termometrze): dodawanie to krok w prawo (cieplej), odejmowanie to krok w lewo (zimniej).");
  let acc = v0;
  for (const [op, v] of znormalizowane) {
    const nowy = op === "+" ? acc + v : acc - v;
    kroki.push(`$${acc} ${op} ${v} = ${nowy}$`);
    acc = nowy;
  }
  return { kroki, wynik: acc };
}

function ujemneLancuch(r) {
  if (r.chance(0.3)) {
    const t0 = r.int(-12, 6), wzrost = r.int(3, 15), spadek = r.int(3, 15);
    const wynik = t0 + wzrost - spadek;
    if (Math.abs(wynik) <= 20 && (t0 < 0 || wynik < 0)) {
      const { kroki } = krokiLancucha(t0, [["+", wzrost], ["-", spadek]]);
      return zad(
        `Rano termometr pokazywał $${t0}$ °C. Do południa temperatura wzrosła o $${wzrost}$ °C, a wieczorem spadła o $${spadek}$ °C. Ile stopni Celsjusza pokazywał termometr wieczorem?`,
        [pole("wynik", "Temperatura wieczorem (w °C)")],
        { wynik: q(wynik) },
        `$${wynik}$ °C`,
        [`Wzrost temperatury to dodawanie, spadek to odejmowanie: $${t0} + ${wzrost} - ${spadek}$.`, ...kroki.slice(1)],
      );
    }
  }
  const { v0, ops, wynik, kroki } = probuj(() => {
    const v0 = r.int(-15, 15);
    const ops = Array.from({ length: r.chance(0.5) ? 1 : 2 }, () => [r.pick(["+", "-"]), r.intBez(-12, 12, 0)]);
    if (v0 === 0 || ![v0, ...ops.map(([, v]) => v)].some((v) => v < 0)) return null;
    const k = krokiLancucha(v0, ops);
    return Math.abs(k.wynik) <= 40 ? { v0, ops, ...k } : null;
  });
  return zad(
    `Oblicz: $${lancuchTex(v0, ops)}$.`,
    [pole("wynik", "Wynik")],
    { wynik: q(wynik) },
    `$${wynik}$`,
    kroki,
  );
}

function ujemneIloczyn(r) {
  const typ = r.pick(["iloczyn", "iloczyn", "iloraz", "iloraz", "iloczyn3"]);
  let czynniki, wyr, wynikAbs, dzialanie;
  if (typ === "iloraz") {
    const c = r.int(2, 12), m = r.int(2, 12);
    const [s1, s2] = probuj(() => { const s = [r.znak(), r.znak()]; return s[0] < 0 || s[1] < 0 ? s : null; });
    czynniki = [s1 * c * m, s2 * c];
    wyr = `${nawias(czynniki[0])} : ${nawias(czynniki[1])}`;
    wynikAbs = m;
    dzialanie = `$${c * m} : ${c} = ${m}$`;
  } else {
    const n = typ === "iloczyn3" ? 3 : 2;
    const wart = Array.from({ length: n }, () => (n === 3 ? r.int(2, 5) : r.int(2, 12)));
    const znaki = probuj(() => { const s = wart.map(() => r.znak()); return s.some((x) => x < 0) ? s : null; });
    czynniki = wart.map((x, i) => znaki[i] * x);
    wyr = czynniki.map(nawias).join(" \\cdot ");
    wynikAbs = wart.reduce((a, b) => a * b, 1);
    dzialanie = `$${wart.join(" \\cdot ")} = ${wynikAbs}$`;
  }
  const minusow = czynniki.filter((x) => x < 0).length;
  const dodatni = minusow % 2 === 0;
  const wynik = dodatni ? wynikAbs : -wynikAbs;
  return zad(
    `Oblicz: $${wyr}$.`,
    [pole("wynik", "Wynik")],
    { wynik: q(wynik) },
    `$${wynik}$`,
    [
      "Przy mnożeniu i dzieleniu najpierw sprawdzamy znak, a potem liczymy tak, jakby liczby nie miały znaków.",
      `Liczba minusów: $${minusow}$. ${dodatni ? "Parzysta liczba minusów daje wynik dodatni (minus razy minus daje plus)." : "Nieparzysta liczba minusów daje wynik ujemny."}`,
      `Bez znaków: ${dzialanie}.`,
      `Wynik: $${wynik}$.`,
    ],
  );
}

function ujemneMieszane(r) {
  const { a, b, op1, op2, C, przod, p, wynik, kroki, wyr } = probuj(() => {
    const op1 = r.pick(["*", "/"]), op2 = r.pick(["+", "-"]);
    let a, b, p;
    if (op1 === "*") {
      a = r.int(2, 9) * r.znak(); b = r.int(2, 9) * r.znak();
      p = a * b;
    } else {
      const c = r.int(2, 9), m = r.int(2, 9);
      b = c * r.znak(); a = c * m * r.znak();
      p = a / b;
    }
    if (a > 0 && b > 0) return null;
    const C = r.intBez(-15, 15, 0);
    const przod = r.chance(0.5);   // czy iloczyn stoi na początku wyrażenia
    const iloczynTxt = `${nawias(a)} ${op1 === "*" ? "\\cdot" : ":"} ${nawias(b)}`;
    const wyr = przod ? `${iloczynTxt} ${op2} ${nawias(C)}` : `${C} ${op2} ${iloczynTxt}`;
    const lanc = przod ? krokiLancucha(p, [[op2, C]]) : krokiLancucha(C, [[op2, p]]);
    if (Math.abs(lanc.wynik) > 60) return null;
    return { a, b, op1, op2, C, przod, p, wynik: lanc.wynik, kroki: lanc.kroki, wyr };
  });
  const znakiTxt = (a < 0) !== (b < 0) ? "liczby o różnych znakach dają wynik ujemny" : "dwie liczby ujemne dają wynik dodatni";
  const iloczynTxt = `${nawias(a)} ${op1 === "*" ? "\\cdot" : ":"} ${nawias(b)}`;
  return zad(
    `Oblicz: $${wyr}$.`,
    [pole("wynik", "Wynik")],
    { wynik: q(wynik) },
    `$${wynik}$`,
    [
      `Kolejność działań jest taka sama jak zawsze: najpierw ${op1 === "*" ? "mnożenie" : "dzielenie"}, potem ${op2 === "+" ? "dodawanie" : "odejmowanie"}.`,
      `${op1 === "*" ? "Mnożenie" : "Dzielenie"}: $${iloczynTxt} = ${p}$ (${znakiTxt}).`,
      ...kroki,
    ],
  );
}

function liczbyUjemne(r) {
  const w = r.int(0, 9);
  if (w <= 4) return ujemneLancuch(r);
  if (w <= 7) return ujemneIloczyn(r);
  return ujemneMieszane(r);
}

// --- 8. NWD i NWW

function czynniki(n) {
  const m = new Map();
  for (let p = 2; p * p <= n; p++) while (n % p === 0) { m.set(p, (m.get(p) ?? 0) + 1); n /= p; }
  if (n > 1) m.set(n, (m.get(n) ?? 0) + 1);
  return m;
}
const potegiTex = (m) => (m.size ? [...m].sort((x, y) => x[0] - y[0]).map(([p, e]) => (e > 1 ? `${p}^{${e}}` : String(p))).join(" \\cdot ") : "1");
const rozwiniete = (n) => [...czynniki(n)].sort((x, y) => x[0] - y[0]).flatMap(([p, e]) => Array(e).fill(p)).join(" \\cdot ");
/** Łańcuch równości bez powtórzeń: rownosci(18, "2 \\cdot 3 \\cdot 3", "2 \\cdot 3^{2}") -> "18 = 2 \\cdot 3 \\cdot 3 = 2 \\cdot 3^{2}". */
const rownosci = (...czesci) => czesci.map(String).filter((x, i, t) => x !== t[i - 1]).join(" = ");

/** „$18 = 2 \\cdot 3 \\cdot 3 = 2 \\cdot 3^{2}$” albo „$7$ (to liczba pierwsza)”. */
function opisRozkladu(n, m) {
  const s = rownosci(n, rozwiniete(n), potegiTex(m));
  return s.includes("=") ? `$${s}$` : `$${n}$ (to liczba pierwsza)`;
}

const CZEKOLADY = ["czekolada", "czekolady", "czekolad"];
const BATONY = ["baton", "batony", "batonów"];

function nwdNww(r) {
  const w = r.int(0, 9);
  const wariant = w <= 5 ? "oba" : w <= 7 ? "paczki" : "autobusy";
  const [a, b] = probuj(() => {
    const g = r.int(2, 12), x = r.int(1, 9), y = r.int(2, 9);
    if (x === y || nwd(x, y) !== 1) return null;
    const [u, v] = r.chance(0.5) ? [g * x, g * y] : [g * y, g * x];
    if (u === v || u > 120 || v > 120) return null;
    if (wariant === "paczki" && (u > 60 || v > 60)) return null;
    if (wariant === "autobusy" && (u > 40 || v > 40 || nww(u, v) > 240)) return null;
    return [u, v];
  });
  const g = nwd(a, b), l = nww(a, b);
  const ma = czynniki(a), mb = czynniki(b);
  const wspolne = new Map(), wszystkie = new Map();
  for (const p of new Set([...ma.keys(), ...mb.keys()])) {
    const ea = ma.get(p) ?? 0, eb = mb.get(p) ?? 0;
    if (ea && eb) wspolne.set(p, Math.min(ea, eb));
    wszystkie.set(p, Math.max(ea, eb));
  }
  const rozklad = [
    `Rozkładamy obie liczby na czynniki pierwsze: ${opisRozkladu(a, ma)} oraz ${opisRozkladu(b, mb)}.`,
  ];
  const krokNwd = `NWD to iloczyn czynników wspólnych dla obu rozkładów (każdy bierzemy tyle razy, ile razy występuje w obu liczbach): $\\text{NWD}(${a}, ${b}) = ${rownosci(potegiTex(wspolne), g)}$${g === 1 ? " (liczby nie mają wspólnych czynników)" : ""}.`;
  const krokNww = `NWW to iloczyn wszystkich czynników z obu rozkładów (każdy tyle razy, ile razy występuje tam, gdzie jest go więcej): $\\text{NWW}(${a}, ${b}) = ${rownosci(potegiTex(wszystkie), l)}$.`;
  const kontrola = `Sprawdzenie: $\\text{NWD} \\cdot \\text{NWW} = ${g} \\cdot ${l} = ${g * l}$ i $${a} \\cdot ${b} = ${a * b}$ – zgadza się (iloczyn NWD i NWW to iloczyn liczb).`;
  if (wariant === "oba") {
    return zad(
      `Oblicz największy wspólny dzielnik i najmniejszą wspólną wielokrotność liczb $${a}$ i $${b}$.`,
      [pole("nwd", `$\\text{NWD}(${a}, ${b}) =$`), pole("nww", `$\\text{NWW}(${a}, ${b}) =$`)],
      { nwd: q(g), nww: q(l) },
      `$\\text{NWD}(${a}, ${b}) = ${g}$, $\\text{NWW}(${a}, ${b}) = ${l}$`,
      [...rozklad, krokNwd, krokNww, kontrola],
    );
  }
  if (wariant === "paczki") {
    return zad(
      `Ania ma ${ile(a, CZEKOLADY)} i ${ile(b, BATONY)}. Chce zrobić jak najwięcej jednakowych paczek, w których będzie tyle samo czekolad i tyle samo batonów, i nic nie zostanie. Ile paczek może zrobić?`,
      [pole("paczki", "Liczba paczek")],
      { paczki: q(g) },
      `${ile(g, ["paczka", "paczki", "paczek"])} (w każdej: ${ile(a / g, CZEKOLADY)} i ${ile(b / g, BATONY)})`,
      [
        `Liczba paczek musi dzielić $${a}$ i $${b}$ bez reszty, a chcemy, żeby była jak największa – to NWD.`,
        ...rozklad,
        krokNwd,
        `Można zrobić ${ile(g, ["paczkę", "paczki", "paczek"])}. W każdej będzie $${a} : ${g} = ${a / g}$ ${lm(a / g, CZEKOLADY)} i $${b} : ${g} = ${b / g}$ ${lm(b / g, BATONY)}.`,
      ],
    );
  }
  return zad(
    `Autobus linii A odjeżdża z przystanku co ${ile(a, ["minutę", "minuty", "minut"])}, a autobus linii B co ${ile(b, ["minutę", "minuty", "minut"])}. O godzinie $8{:}00$ odjechały jednocześnie. Po ilu minutach znów odjadą razem?`,
    [pole("minuty", "Po ilu minutach")],
    { minuty: q(l) },
    `Po $${l}$ minutach`,
    [
      `Autobusy odjadą razem po takim czasie, który jest wielokrotnością $${a}$ i wielokrotnością $${b}$ jednocześnie. Szukamy najmniejszego takiego czasu – to NWW.`,
      ...rozklad,
      krokNww,
      `Autobusy odjadą razem po $${l}$ minutach (czyli o godzinie $${8 + Math.floor(l / 60)}{:}${String(l % 60).padStart(2, "0")}$).`,
    ],
  );
}

// --- 9. Cechy podzielności: brakująca cyfra

function brakujacaCyfra(r) {
  return probuj(() => {
    const dziel = r.pick([3, 3, 4, 6, 9, 9]);
    const dl = r.int(4, 5);
    const cyf = Array.from({ length: dl }, (_, i) => r.int(i === 0 ? 1 : 0, 9));
    const poz = dziel === 4 ? r.int(dl - 2, dl - 1) : r.int(1, dl - 1);
    const mozliwe = [];
    for (let x = 0; x <= 9; x++) {
      const c = [...cyf];
      c[poz] = x;
      if (Number(c.join("")) % dziel === 0) mozliwe.push(x);
    }
    if (!mozliwe.length || (mozliwe[0] === 0 && r.chance(0.85))) return null;
    const odp = mozliwe[0];
    const liczba = cyf.map((c, i) => (i === poz ? "x" : c)).join("");
    const znane = cyf.filter((_, i) => i !== poz);
    const S = znane.reduce((a, b) => a + b, 0);
    const wszystkie = mozliwe.length === 1 ? `Pasuje tylko cyfra $${odp}$.` : `Pasują cyfry: $${mozliwe.join(", ")}$. Najmniejsza z nich to $${odp}$.`;
    const wstawiona = cyf.map((c, i) => (i === poz ? odp : c)).join("");
    const kontrola = `Sprawdzenie: $${wstawiona} : ${dziel} = ${Number(wstawiona) / dziel}$ – wychodzi bez reszty.`;
    let kroki;
    if (dziel === 3 || dziel === 9) {
      kroki = [
        `Liczba dzieli się przez $${dziel}$, gdy jej suma cyfr dzieli się przez $${dziel}$.`,
        `Suma znanych cyfr: $${znane.join(" + ")} = ${S}$, więc suma wszystkich cyfr to $${S} + x$.`,
        `Szukamy cyfry $x$ (od $0$ do $9$), dla której $${S} + x$ dzieli się przez $${dziel}$. Dla $x = ${odp}$ mamy $${S} + ${odp} = ${S + odp}$, a $${S + odp} : ${dziel} = ${(S + odp) / dziel}$.`,
        wszystkie,
        kontrola,
      ];
    } else if (dziel === 4) {
      const koncowka = poz === dl - 1 ? `${cyf[dl - 2]}\\,x` : `x\\,${cyf[dl - 1]}`;
      const ost2 = Number(`${poz === dl - 1 ? cyf[dl - 2] : odp}${poz === dl - 1 ? odp : cyf[dl - 1]}`);
      kroki = [
        "Liczba dzieli się przez $4$, gdy dwie jej ostatnie cyfry tworzą liczbę podzielną przez $4$ (pozostałe cyfry nie mają znaczenia, bo $100$ dzieli się przez $4$).",
        `Dwie ostatnie cyfry to $${koncowka}$. Sprawdzamy kolejne cyfry $x$ od $0$: pierwsza, dla której liczba dzieli się przez $4$, to $x = ${odp}$, bo $${ost2} : 4 = ${ost2 / 4}$.`,
        wszystkie,
        kontrola,
      ];
    } else {
      const ostatnia = poz === dl - 1;
      kroki = [
        "Liczba dzieli się przez $6$, gdy dzieli się jednocześnie przez $2$ i przez $3$.",
        ostatnia
          ? "Przez $2$: ostatnia cyfra, czyli $x$, musi być parzysta ($0, 2, 4, 6, 8$)."
          : `Przez $2$: ostatnia cyfra to $${cyf[dl - 1]}$ – parzysta, więc ten warunek jest spełniony.`,
        `Przez $3$: suma cyfr musi dzielić się przez $3$. Suma znanych cyfr: $${znane.join(" + ")} = ${S}$, więc szukamy $x$, dla którego $${S} + x$ dzieli się przez $3$${ostatnia ? " i jednocześnie $x$ jest parzysta" : ""}.`,
        `Dla $x = ${odp}$: $${S} + ${odp} = ${S + odp}$ dzieli się przez $3$. ${mozliwe.length > 1 ? wszystkie : ""}`.trim(),
        kontrola,
      ];
    }
    return zad(
      `Wstaw w miejsce $x$ taką cyfrę, żeby liczba $${liczba}$ była podzielna przez $${dziel}$. Podaj najmniejszą taką cyfrę.`,
      [pole("x", "$x =$")],
      { x: q(odp) },
      `$x = ${odp}$`,
      kroki,
    );
  });
}

// --- 9b. Cechy podzielności: która z czterech liczb dzieli się przez 2, 5, 10, 3 albo 9

const sumaCyfr = (n) => [...String(n)].reduce((a, c) => a + Number(c), 0);
const CECHY = {
  2: { cecha: "jej ostatnia cyfra jest parzysta ($0, 2, 4, 6, 8$)", co: (n) => `ostatnia cyfra $${n % 10}$` },
  5: { cecha: "jej ostatnia cyfra to $0$ albo $5$", co: (n) => `ostatnia cyfra $${n % 10}$` },
  10: { cecha: "jej ostatnia cyfra to $0$", co: (n) => `ostatnia cyfra $${n % 10}$` },
  3: { cecha: "suma jej cyfr dzieli się przez $3$", co: (n) => `suma cyfr $${[...String(n)].join(" + ")} = ${sumaCyfr(n)}$` },
  9: { cecha: "suma jej cyfr dzieli się przez $9$", co: (n) => `suma cyfr $${[...String(n)].join(" + ")} = ${sumaCyfr(n)}$` },
};

function ktoraPodzielna(r) {
  const dziel = r.pick([2, 5, 10, 2, 5, 10, 3, 9]);
  const { cecha, co } = CECHY[dziel];
  const liczby = probuj(() => {
    const dl = r.int(3, 4), min = 10 ** (dl - 1), max = 10 ** dl - 1;
    const dobra = probuj(() => { const n = r.int(min, max); return n % dziel === 0 ? n : null; });
    // Złe odpowiedzi wyglądają podobnie: przy 10 kończą się na 5, przy 9 często dzielą się przez 3.
    const zla = () => probuj(() => {
      let n = r.int(min, max);
      if (dziel === 10 && r.chance(0.6)) n = n - (n % 10) + 5;
      if (dziel === 9 && r.chance(0.6)) n -= n % 3;
      return n >= min && n % dziel !== 0 ? n : null;
    });
    const zle = [zla(), zla(), zla()];
    const wszystkie = [dobra, ...zle];
    return new Set(wszystkie).size === 4 ? { dobra, wszystkie: r.shuffle(wszystkie) } : null;
  });
  const opcje = liczby.wszystkie.map((n) => `$${dz(n)}$`);
  return zad(
    `Która z liczb $${liczby.wszystkie.map((n) => dz(n)).join("$, $")}$ jest podzielna przez $${dziel}$?`,
    [{ id: "odp", typ: "wybor", etykieta: `Liczba podzielna przez $${dziel}$`, opcje }],
    { odp: liczby.wszystkie.indexOf(liczby.dobra) },
    `$${dz(liczby.dobra)}$`,
    [
      `Liczba dzieli się przez $${dziel}$, gdy ${cecha}. Nie trzeba dzielić – wystarczy sprawdzić ten warunek.`,
      ...liczby.wszystkie.map((n) => `$${dz(n)}$: ${co(n)} – ${n % dziel === 0 ? "**tak**, dzieli się" : "nie dzieli się"}.`),
      `Sprawdzenie: $${dz(liczby.dobra)} : ${dziel} = ${dz(liczby.dobra / dziel)}$ – bez reszty.`,
    ],
  );
}

// --- 10. Skracanie, rozszerzanie, liczby mieszane

function skracanieUlamka(r) {
  const w = r.int(0, 9);
  if (w <= 5) {
    const { p, qq, k } = probuj(() => {
      const qq = r.int(2, 15);
      const p = r.chance(0.2) ? r.int(qq + 1, 2 * qq) : r.int(1, qq - 1);
      const k = r.int(2, 9);
      return nwd(p, qq) === 1 && k * qq <= 100 && k * p <= 100 ? { p, qq, k } : null;
    });
    const a = k * p, b = k * qq;
    const najmP = [...czynniki(k).keys()][0];
    const kroki = [
      "Skracanie ułamka to dzielenie licznika i mianownika przez tę samą liczbę. Wartość ułamka się nie zmienia – to jak ta sama pizza pokrojona na mniejsze albo większe kawałki.",
      `Szukamy największej liczby, przez którą dzielą się i licznik, i mianownik: $\\text{NWD}(${a}, ${b}) = ${k}$ (bo $${a} = ${p} \\cdot ${k}$ oraz $${b} = ${qq} \\cdot ${k}$).`,
      `Dzielimy licznik i mianownik przez $${k}$: $\\frac{${a}}{${b}} = \\frac{${a} : ${k}}{${b} : ${k}} = \\frac{${p}}{${qq}}$.`,
    ];
    if (czynniki(k).size > 1 || [...czynniki(k).values()][0] > 1) {
      kroki.push(`Można też skracać po kolei, np. najpierw przez $${najmP}$, potem przez $${k / najmP}$: $\\frac{${a}}{${b}} = \\frac{${a / najmP}}{${b / najmP}} = \\frac{${p}}{${qq}}$.`);
    }
    kroki.push("Licznik i mianownik nie mają już wspólnego dzielnika większego od $1$, więc ułamek jest nieskracalny.");
    return zad(
      `Skróć ułamek $\\frac{${a}}{${b}}$ do postaci nieskracalnej. Wpisz licznik i mianownik.`,
      [pole("licznik", "Licznik"), pole("mianownik", "Mianownik")],
      { licznik: q(p), mianownik: q(qq) },
      `$\\frac{${a}}{${b}} = \\frac{${p}}{${qq}}$`,
      kroki,
    );
  }
  if (w <= 7) {
    const { p, qq, m } = probuj(() => {
      const qq = r.int(2, 10), p = r.int(1, qq - 1), m = r.int(2, 8);
      return nwd(p, qq) === 1 && qq * m <= 40 ? { p, qq, m } : null;
    });
    return zad(
      `Uzupełnij tak, żeby ułamki były równe: $\\frac{${p}}{${qq}} = \\frac{x}{${qq * m}}$. Ile wynosi licznik $x$?`,
      [pole("licznik", "$x =$")],
      { licznik: q(p * m) },
      `$\\frac{${p}}{${qq}} = \\frac{${p * m}}{${qq * m}}$, czyli $x = ${p * m}$`,
      [
        `Rozszerzanie ułamka to mnożenie licznika i mianownika przez tę samą liczbę (jak krojenie każdego kawałka pizzy na kilka mniejszych).`,
        `Mianownik zmienił się z $${qq}$ na $${qq * m}$. Przez jaką liczbę go pomnożono? $${qq * m} : ${qq} = ${m}$.`,
        `Licznik mnożymy przez tę samą liczbę: $${p} \\cdot ${m} = ${p * m}$.`,
        `Mamy więc $\\frac{${p}}{${qq}} = \\frac{${p} \\cdot ${m}}{${qq} \\cdot ${m}} = \\frac{${p * m}}{${qq * m}}$.`,
      ],
    );
  }
  if (w === 8) {
    const { p, qq, c } = probuj(() => {
      const qq = r.int(2, 12), p = r.int(1, qq - 1), c = r.int(1, 9);
      return nwd(p, qq) === 1 ? { p, qq, c } : null;
    });
    return zad(
      `Zamień liczbę mieszaną $${c}\\frac{${p}}{${qq}}$ na ułamek niewłaściwy. Wpisz licznik i mianownik.`,
      [pole("licznik", "Licznik"), pole("mianownik", "Mianownik")],
      { licznik: q(c * qq + p), mianownik: q(qq) },
      `$${c}\\frac{${p}}{${qq}} = \\frac{${c * qq + p}}{${qq}}$`,
      [
        `Jedna całość to $\\frac{${qq}}{${qq}}$, więc $${c}$ całości to $${c} \\cdot ${qq} = ${c * qq}$ części o wielkości $\\frac{1}{${qq}}$.`,
        `Dodajemy jeszcze ${ile(p, ["taką część", "takie części", "takich części"])} z ułamka: $${c * qq} + ${p} = ${c * qq + p}$.`,
        `Mianownik zostaje ten sam: $${c}\\frac{${p}}{${qq}} = \\frac{${c} \\cdot ${qq} + ${p}}{${qq}} = \\frac{${c * qq + p}}{${qq}}$.`,
      ],
    );
  }
  const { p, qq, c } = probuj(() => {
    const qq = r.int(2, 12), p = r.int(1, qq - 1), c = r.int(1, 9);
    return nwd(p, qq) === 1 ? { p, qq, c } : null;
  });
  const N = c * qq + p;
  return zad(
    `Zamień ułamek niewłaściwy $\\frac{${N}}{${qq}}$ na liczbę mieszaną. Wpisz liczbę całości oraz licznik i mianownik części ułamkowej.`,
    [pole("calosci", "Całości"), pole("licznik", "Licznik"), pole("mianownik", "Mianownik")],
    { calosci: q(c), licznik: q(p), mianownik: q(qq) },
    `$\\frac{${N}}{${qq}} = ${c}\\frac{${p}}{${qq}}$`,
    [
      `Kreska ułamkowa to dzielenie. Sprawdzamy, ile razy $${qq}$ mieści się w $${N}$: $${N} : ${qq} = ${c}$, reszta $${p}$ (bo $${c} \\cdot ${qq} = ${c * qq}$, a $${N} - ${c * qq} = ${p}$).`,
      `Iloraz $${c}$ to liczba całości. Reszta $${p}$ to licznik części ułamkowej, a mianownik zostaje ten sam: $${c}\\frac{${p}}{${qq}}$.`,
    ],
  );
}

// --- 11. Dodawanie i odejmowanie ułamków o różnych mianownikach

const MIANOWNIKI = [2, 3, 4, 5, 6, 8, 9, 10, 12];

/** Rozszerzenie ułamka a/b przez m (do mianownika b·m): tekst z TeX-em; gdy m = 1, ułamek już ma właściwy mianownik. */
const rozszerz = (a, b, m) => (m === 1
  ? `$\\frac{${a}}{${b}}$ już ma ten mianownik`
  : `$\\frac{${a}}{${b}} = \\frac{${a} \\cdot ${m}}{${b} \\cdot ${m}} = \\frac{${a * m}}{${b * m}}$`);

function ulamkiDodawanieOdejmowanie(r) {
  return probuj(() => {
    const dodawanie = r.chance(0.55);
    let b = r.pick(MIANOWNIKI), d = r.pick(MIANOWNIKI);
    if (b === d || nww(b, d) > 36) return null;
    let a = r.int(1, b - 1), c = r.int(1, d - 1);
    if (nwd(a, b) !== 1 || nwd(c, d) !== 1) return null;
    let x = q(a, b), y = q(c, d);
    if (!dodawanie && x.cmp(y) < 0) { [a, b, c, d] = [c, d, a, b]; [x, y] = [y, x]; }
    const wynik = dodawanie ? x.add(y) : x.sub(y);
    if (!ladna(wynik) || wynik.calkowita || wynik.zero) return null;
    const L = nww(b, d), mb = L / b, md = L / d;
    const n1 = a * mb, n2 = c * md, n = dodawanie ? n1 + n2 : n1 - n2;
    const znak = dodawanie ? "+" : "-";
    const kontekst = r.chance(0.5) && (!dodawanie || wynik.cmp(1) <= 0);
    const tekst = kontekst
      ? dodawanie
        ? `${r.pick(["Ania", "Kasia", "Ola"])} zjadła $\\frac{${a}}{${b}}$ pizzy, a ${r.pick(["Bartek", "Kuba", "Michał"])} zjadł $\\frac{${c}}{${d}}$ tej samej pizzy. Jaką część pizzy zjedli razem? Podaj ułamek nieskracalny.`
        : `Z tabliczki czekolady zostało $\\frac{${a}}{${b}}$ całej tabliczki. ${r.pick(["Basia", "Zosia", "Ewa"])} zjadła $\\frac{${c}}{${d}}$ całej tabliczki. Jaka część tabliczki została? Podaj ułamek nieskracalny.`
      : `Oblicz: $\\frac{${a}}{${b}} ${znak} \\frac{${c}}{${d}}$. Wynik podaj jako ułamek nieskracalny (licznik i mianownik).`;
    const g = nwd(n, L);
    const kroki = [
      `Mianowniki są różne ($${b}$ i $${d}$), a dodawać i odejmować można tylko kawałki tej samej wielkości. Szukamy wspólnego mianownika – najmniejszej liczby, która dzieli się przez $${b}$ i przez $${d}$: $\\text{NWW}(${b}, ${d}) = ${L}$.`,
      `Rozszerzamy ułamki do mianownika $${L}$: ${[rozszerz(a, b, mb), rozszerz(c, d, md)].join(" oraz ")}.`,
      `${dodawanie ? "Dodajemy" : "Odejmujemy"} liczniki, a mianownik przepisujemy: $\\frac{${n1}}{${L}} ${znak} \\frac{${n2}}{${L}} = \\frac{${n1} ${znak} ${n2}}{${L}} = \\frac{${n}}{${L}}$.`,
      g > 1 ? `Skracamy przez $${g}$: $\\frac{${n}}{${L}} = \\frac{${n / g}}{${L / g}}$.` : "Tego ułamka nie da się już skrócić.",
    ];
    if (wynik.n > wynik.d) kroki.push(`Ułamek niewłaściwy można zapisać jako liczbę mieszaną: $\\frac{${wynik.n}}{${wynik.d}} = ${Math.floor(wynik.n / wynik.d)}\\frac{${wynik.n % wynik.d}}{${wynik.d}}$.`);
    return zad(
      tekst,
      [pole("licznik", "Licznik"), pole("mianownik", "Mianownik")],
      { licznik: q(wynik.n), mianownik: q(wynik.d) },
      `$${wynik.tex()}$`,
      kroki,
    );
  });
}

// --- 12. Mnożenie i dzielenie ułamków

/** „Skracanie na krzyż” iloczynu a/b · c/d: tekst z przekreśleniami i wynik. */
function mnozenieNaKrzyz(a, b, c, d) {
  const g1 = nwd(a, d), g2 = nwd(c, b);
  const a2 = a / g1, d2 = d / g1, c2 = c / g2, b2 = b / g2;
  const przek = (x, nowy, gora) => (nowy === x ? String(x) : `${gora ? "\\overset" : "\\underset"}{${nowy}}{\\cancel{${x}}}`);
  const wynik = q(a2 * c2, b2 * d2);
  const przed = `\\frac{${przek(a, a2, true)}}{${przek(b, b2, false)}} \\cdot \\frac{${przek(c, c2, true)}}{${przek(d, d2, false)}}`;
  const tex = g1 > 1 || g2 > 1
    ? `\\displaystyle ${przed} = \\frac{${a2} \\cdot ${c2}}{${b2} \\cdot ${d2}} = ${wynik.tex()}`
    : `\\displaystyle \\frac{${a} \\cdot ${c}}{${b} \\cdot ${d}} = ${wynik.tex()}`;
  const opis = [];
  if (g1 > 1) opis.push(`licznik $${a}$ i mianownik $${d}$ dzielą się przez $${g1}$`);
  if (g2 > 1) opis.push(`licznik $${c}$ i mianownik $${b}$ dzielą się przez $${g2}$`);
  return { tex, wynik, opis };
}

const dwaUlamki = (a, b, c, d) => `\\frac{${a}}{${b}} \\cdot \\frac{${c}}{${d}}`;

function ulamkiMnozenieDzielenie(r) {
  const w = r.int(0, 9);
  if (w <= 2) {
    return probuj(() => {
      const [b, d] = [r.int(2, 12), r.int(2, 12)];
      const a = r.int(1, b + 3), c = r.int(1, d + 3);
      if (nwd(a, b) !== 1 || nwd(c, d) !== 1) return null;
      const { tex, wynik, opis } = mnozenieNaKrzyz(a, b, c, d);
      if (!ladna(wynik) || wynik.calkowita || wynik.zero) return null;
      return zad(
        `Oblicz: $\\frac{${a}}{${b}} \\cdot \\frac{${c}}{${d}}$. Wynik podaj jako ułamek nieskracalny (licznik i mianownik).`,
        [pole("licznik", "Licznik"), pole("mianownik", "Mianownik")],
        { licznik: q(wynik.n), mianownik: q(wynik.d) },
        `$${wynik.tex()}$`,
        [
          "Przy mnożeniu ułamków nie szukamy wspólnego mianownika: mnożymy licznik przez licznik i mianownik przez mianownik.",
          opis.length ? `Zanim pomnożymy, skracamy „na krzyż” (licznik z mianownikiem drugiego ułamka): ${opis.join(" oraz ")}.` : "Nic nie da się skrócić „na krzyż”, więc mnożymy od razu.",
          `$${tex}$`,
          wynik.n > wynik.d ? `Ułamek niewłaściwy to liczba mieszana: $${wynik.tex()} = ${Math.floor(wynik.n / wynik.d)}\\frac{${wynik.n % wynik.d}}{${wynik.d}}$.` : "Ułamek jest nieskracalny, więc to koniec.",
        ],
      );
    });
  }
  if (w <= 5) {
    return probuj(() => {
      const [b, d] = [r.int(2, 12), r.int(2, 12)];
      const a = r.int(1, b + 2), c = r.int(1, d + 2);
      if (nwd(a, b) !== 1 || nwd(c, d) !== 1) return null;
      const { tex, wynik, opis } = mnozenieNaKrzyz(a, b, d, c);   // a/b · d/c
      if (!ladna(wynik) || wynik.calkowita || wynik.zero) return null;
      return zad(
        `Oblicz: $\\frac{${a}}{${b}} : \\frac{${c}}{${d}}$. Wynik podaj jako ułamek nieskracalny (licznik i mianownik).`,
        [pole("licznik", "Licznik"), pole("mianownik", "Mianownik")],
        { licznik: q(wynik.n), mianownik: q(wynik.d) },
        `$${wynik.tex()}$`,
        [
          `Dzielenie przez ułamek to mnożenie przez jego odwrotność (odwracamy drugi ułamek „do góry nogami”): $\\frac{${a}}{${b}} : \\frac{${c}}{${d}} = ${dwaUlamki(a, b, d, c)}$.`,
          opis.length ? `Skracamy „na krzyż”: ${opis.join(" oraz ")}.` : "Nic nie da się skrócić „na krzyż”, więc mnożymy od razu.",
          `$${tex}$`,
          wynik.n > wynik.d ? `Ułamek niewłaściwy to liczba mieszana: $${wynik.tex()} = ${Math.floor(wynik.n / wynik.d)}\\frac{${wynik.n % wynik.d}}{${wynik.d}}$.` : "Ułamek jest nieskracalny, więc to koniec.",
        ],
      );
    });
  }
  if (w <= 7) {
    return probuj(() => {
      const dziel = r.chance(0.5);
      const mk = () => { const bb = r.int(2, 6), pp = r.int(1, bb - 1), cc = r.int(1, 4); return { c: cc, p: pp, b: bb, n: cc * bb + pp }; };
      const A = mk(), B = mk();
      if (nwd(A.p, A.b) !== 1 || nwd(B.p, B.b) !== 1) return null;
      const wynik = dziel ? q(A.n, A.b).div(q(B.n, B.b)) : q(A.n, A.b).mul(q(B.n, B.b));
      if (!ladna(wynik) || wynik.calkowita || wynik.zero) return null;
      const mt = (x) => `${x.c}\\frac{${x.p}}{${x.b}}`;
      const nt = (x) => `\\frac{${x.c} \\cdot ${x.b} + ${x.p}}{${x.b}} = \\frac{${x.n}}{${x.b}}`;
      const koniec = dziel ? mnozenieNaKrzyz(A.n, A.b, B.b, B.n) : mnozenieNaKrzyz(A.n, A.b, B.n, B.b);
      return zad(
        `Oblicz: $${mt(A)} ${dziel ? ":" : "\\cdot"} ${mt(B)}$. Wynik podaj jako ułamek nieskracalny (licznik i mianownik, może być ułamek niewłaściwy).`,
        [pole("licznik", "Licznik"), pole("mianownik", "Mianownik")],
        { licznik: q(wynik.n), mianownik: q(wynik.d) },
        `$${wynik.tex()}$`,
        [
          `Liczby mieszane zamieniamy na ułamki niewłaściwe: $${mt(A)} = ${nt(A)}$ oraz $${mt(B)} = ${nt(B)}$.`,
          dziel
            ? `Dzielenie zamieniamy na mnożenie przez odwrotność: $\\frac{${A.n}}{${A.b}} : \\frac{${B.n}}{${B.b}} = ${dwaUlamki(A.n, A.b, B.b, B.n)}$.`
            : `Teraz mnożymy: $${dwaUlamki(A.n, A.b, B.n, B.b)}$.`,
          koniec.opis.length ? `Skracamy „na krzyż”: ${koniec.opis.join(" oraz ")}.` : "Nic nie da się skrócić „na krzyż”.",
          `$${koniec.tex}$`,
          wynik.n > wynik.d ? `Jako liczba mieszana: $${wynik.tex()} = ${Math.floor(wynik.n / wynik.d)}\\frac{${wynik.n % wynik.d}}{${wynik.d}}$.` : "Wynik jest ułamkiem właściwym.",
        ],
      );
    });
  }
  // ułamek z liczby
  const dd = r.pick([3, 4, 5, 6, 8, 10, 12]), aa = probuj(() => { const x = r.int(1, dd - 1); return nwd(x, dd) === 1 ? x : null; }), mm = r.int(2, 15);
  const N = dd * mm, wynik = aa * mm;
  const [imie, mial, wydal] = r.pick([["Ania", "miała", "wydała"], ["Kuba", "miał", "wydał"], ["Marta", "miała", "wydała"], ["Michał", "miał", "wydał"]]);
  const tresc = r.pick([
    `Oblicz $\\frac{${aa}}{${dd}}$ z liczby $${N}$.`,
    `${imie} ${mial} $${N}$ zł i ${wydal} $\\frac{${aa}}{${dd}}$ tej kwoty. Ile złotych ${wydal}?`,
    `Czekolada ma $${N}$ kostek. Zjedzono $\\frac{${aa}}{${dd}}$ czekolady. Ile kostek zjedzono?`,
  ]);
  return zad(
    tresc,
    [pole("wynik", "Wynik")],
    { wynik: q(wynik) },
    `$${wynik}$`,
    [
      `„Ułamek z liczby” to mnożenie: $\\frac{${aa}}{${dd}}$ z $${N}$ to $\\frac{${aa}}{${dd}} \\cdot ${N}$.`,
      `Dzielimy $${N}$ na $${dd}$ równych części (jak czekoladę na $${dd}$ równych kawałków): $${N} : ${dd} = ${mm}$. Tyle wynosi jedna część, czyli $\\frac{1}{${dd}}$ liczby.`,
      `Bierzemy $${aa}$ takie części: $${aa} \\cdot ${mm} = ${wynik}$.`,
      `To samo zapisane jako mnożenie: $\\frac{${aa}}{${dd}} \\cdot ${N} = \\frac{${aa} \\cdot ${N}}{${dd}} = \\frac{${aa * N}}{${dd}} = ${wynik}$.`,
    ],
  );
}

// --- 13. Ułamki dziesiętne: pisemne dodawanie, odejmowanie, mnożenie

/** Ułamek dziesiętny z m miejscami po przecinku jako liczba całkowita (razy 10^m), ostatnia cyfra po przecinku różna od zera. */
function liczbaDz(r, m, calMax) {
  let frac = r.int(1, 10 ** m - 1);
  if (frac % 10 === 0) frac++;
  return r.int(0, calMax) * 10 ** m + frac;
}
const dzMiejsca = (x, m) => dz(q(x, 10 ** m), m);

function dziesietneDodawanieOdejmowanie(r) {
  return probuj(() => {
    const dodawanie = r.chance(0.5);
    const ma = r.int(1, 2), mb = r.int(1, 2), k = Math.max(ma, mb);
    let A = liczbaDz(r, ma, r.pick([9, 99, 99, 999])), B = liczbaDz(r, mb, r.pick([9, 99, 99, 999]));
    let m1 = ma, m2 = mb;
    const A2 = A * 10 ** (k - ma), B2 = B * 10 ** (k - mb);
    if (!dodawanie && A2 < B2) { [A, B, m1, m2] = [B, A, m2, m1]; }
    const Ak = A * 10 ** (k - m1), Bk = B * 10 ** (k - m2);
    if (!dodawanie && Ak === Bk) return null;
    const wynik = dodawanie ? q(Ak + Bk, 10 ** k) : q(Ak - Bk, 10 ** k);
    if (!ladnaDz(wynik)) return null;
    const x = dzMiejsca(A, m1), y = dzMiejsca(B, m2);
    const znak = dodawanie ? "+" : "-";
    const opis = [
      m1 !== m2
        ? `Zapisujemy liczby tak, żeby przecinek był dokładnie pod przecinkiem. Tam, gdzie brakuje cyfr po przecinku, dopisujemy zera (nie zmieniają one wartości liczby): $${m1 < m2 ? x : y} = ${dz(q(m1 < m2 ? Ak : Bk, 10 ** k), k)}$.`
        : "Zapisujemy liczby tak, żeby przecinek był dokładnie pod przecinkiem.",
      `${dodawanie ? "Dodajemy" : "Odejmujemy"} tak jak liczby całkowite, od prawej strony${dodawanie ? " (z pamiętaniem)" : " (z pożyczaniem tam, gdzie trzeba)"}. Przecinek w wyniku wstawiamy dokładnie pod przecinkami.`,
    ];
    let uklad;
    if (dodawanie) uklad = dodawanieTex([Ak, Bk], k, [m1, m2]);
    else uklad = odejmowanieTex(Ak, Bk, k, [m1, m2]).tex;
    const p1 = Math.round(Ak / 10 ** k), p2 = Math.round(Bk / 10 ** k);
    return zad(
      `Oblicz pisemnie: $${x} ${znak} ${y}$.`,
      [pole("wynik", "Wynik")],
      { wynik },
      `$${dz(wynik)}$`,
      [
        ...opis,
        `Całe ${dodawanie ? "dodawanie" : "odejmowanie"} wygląda tak (szare zera są dopisane): $${uklad}$`,
        dodawanie && blisko(p1 + p2, Number(wynik))
          ? `Sprawdzenie szacowaniem: $${p1} + ${p2} = ${p1 + p2}$ – blisko wyniku $${dz(wynik)}$.`
          : dodawanie
            ? `Sprawdzenie odejmowaniem: $${dz(wynik)} - ${y} = ${x}$ – zgadza się.`
            : `Sprawdzenie dodawaniem: $${dz(wynik)} + ${y} = ${x}$ – zgadza się z liczbą, od której odejmowaliśmy.`,
      ],
    );
  });
}

function dziesietneMnozenie(r) {
  return probuj(() => {
    const ma = r.int(1, 2), mb = r.int(1, 2);
    const A = liczbaDz(r, ma, r.pick([0, 3, 9, 25])), B = liczbaDz(r, mb, r.pick([0, 2, 9]));
    if (String(A).length + String(B).length < 3 || A < 10 || B < 10) return null;
    const k = ma + mb, iloczyn = A * B;
    const wynik = q(iloczyn, 10 ** k);
    if (!ladnaDz(wynik)) return null;
    const txt = String(iloczyn).padStart(k + 1, "0");
    const zPrzecinkiem = `${txt.slice(0, -k)}{,}${txt.slice(-k)}`;
    return zad(
      `Oblicz pisemnie: $${dzMiejsca(A, ma)} \\cdot ${dzMiejsca(B, mb)}$.`,
      [pole("wynik", "Wynik")],
      { wynik },
      `$${dz(wynik)}$`,
      [
        `Na chwilę zapominamy o przecinkach i mnożymy pisemnie jak liczby całkowite: $${A} \\cdot ${B} = ${iloczyn}$.`,
        `Mnożenie pisemne wygląda tak: $${mnozenieTex(A, B)}$`,
        `Liczymy cyfry po przecinku: w pierwszym czynniku jest ich $${ma}$, w drugim $${mb}$, razem $${k}$.`,
        `Od prawej strony iloczynu odliczamy $${k}$ ${lm(k, ["cyfrę", "cyfry", "cyfr"])} i wstawiamy przecinek: $${zPrzecinkiem}$${zPrzecinkiem !== dz(wynik) ? `, czyli $${dz(wynik)}$` : ""}.`,
        `Dlaczego tak? Obie liczby zamieniliśmy na całkowite (pomnożyliśmy je razem przez $${10 ** k}$), więc na końcu wynik trzeba podzielić przez $${10 ** k}$, czyli przesunąć przecinek o $${k}$ ${lm(k, ["miejsce", "miejsca", "miejsc"])} w lewo.`,
      ],
    );
  });
}

function dziesietnePisemne(r) {
  return r.chance(0.65) ? dziesietneDodawanieOdejmowanie(r) : dziesietneMnozenie(r);
}

// --- 14. Ułamki dziesiętne: przesuwanie przecinka, zamiana, dzielenie przez ułamek dziesiętny

const MIEJSCE = ["miejsce", "miejsca", "miejsc"];
const PRZYKLAD_MNOZENIA = {
  10: "Przykład: $1$ cm to $10$ mm, więc mnożenie przez $10$ zamienia centymetry na milimetry ($3{,}5$ cm to $35$ mm).",
  100: "Przykład: $1$ zł to $100$ groszy, więc mnożenie przez $100$ zamienia złotówki na grosze ($3{,}45$ zł to $345$ gr).",
  1000: "Przykład: $1$ kg to $1000$ g, więc mnożenie przez $1000$ zamienia kilogramy na gramy ($2{,}5$ kg to $2500$ g).",
};
const PRZYKLAD_DZIELENIA = {
  10: "Przykład: $35$ mm to $3{,}5$ cm (dzielimy przez $10$).",
  100: "Przykład: $345$ groszy to $3{,}45$ zł (dzielimy przez $100$).",
  1000: "Przykład: $2500$ g to $2{,}5$ kg (dzielimy przez $1000$).",
};

/** Dzielniki dziesiętne do zadań „dzielenie przez ułamek dziesiętny”: [licznik, miejsca po przecinku], np. [25, 2] to 0,25. */
const DZIELNIKI_DZ = [[2, 1], [4, 1], [5, 1], [3, 1], [8, 1], [12, 1], [15, 1], [25, 1], [5, 2], [4, 2], [6, 2], [12, 2], [15, 2], [25, 2], [75, 2]];

function dziesietneMnozenieRzedu(r) {
  const p = r.pick([10, 100, 1000]), zer = String(p).length - 1;
  return probuj(() => {
    const m = r.int(0, 3);
    let n = r.int(m === 0 ? 2 : 1, m === 0 ? 999 : 99999);
    if (m > 0 && n % 10 === 0) n++;
    const x = q(n, 10 ** m), wynik = x.mul(p);
    if (!ladnaDz(wynik)) return null;
    return zad(
      `Oblicz: $${dz(x, m)} \\cdot ${p}$.`,
      [pole("wynik", "Wynik")],
      { wynik },
      `$${dz(wynik)}$`,
      [
        `Mnożenie przez $${p}$ to przesunięcie każdej cyfry o $${zer}$ ${lm(zer, MIEJSCE)} w stronę większych rzędów, czyli przecinek wędruje o $${zer}$ ${lm(zer, MIEJSCE)} w prawo.`,
        m === 0 ? "Liczba jest całkowita, więc przecinka nie widać (stoi na końcu): przesuwamy go w prawo i dopisujemy zera." : m < zer ? "Gdy brakuje cyfr, uzupełniamy je zerami na końcu." : m === zer ? "Przecinek trafia na koniec liczby, więc znika – wychodzi liczba całkowita." : "Po przesunięciu przecinka zostają jeszcze cyfry po przecinku.",
        `$${dz(x, m)} \\cdot ${p} = ${dz(wynik)}$.`,
        PRZYKLAD_MNOZENIA[p],
      ],
    );
  });
}

function dziesietneDzielenieRzedu(r) {
  const p = r.pick([10, 100, 1000]), zer = String(p).length - 1;
  return probuj(() => {
    const m = r.int(0, 2);
    let n = r.int(1, 9999);
    if (m > 0 && n % 10 === 0) n++;
    const x = q(n, 10 ** m), wynik = x.div(p);
    if (!ladnaDz(wynik)) return null;
    return zad(
      `Oblicz: $${dz(x, m)} : ${p}$.`,
      [pole("wynik", "Wynik")],
      { wynik },
      `$${dz(wynik)}$`,
      [
        `Dzielenie przez $${p}$ to przeciwieństwo mnożenia: przecinek wędruje w lewo o tyle miejsc, ile zer ma $${p}$, czyli o $${zer}$ ${lm(zer, MIEJSCE)}.`,
        "Gdy brakuje cyfr, dopisujemy zera z przodu – na przykład $5 : 100 = 0{,}05$.",
        `$${dz(x, m)} : ${p} = ${dz(wynik)}$.`,
        PRZYKLAD_DZIELENIA[p],
      ],
    );
  });
}

function dziesietneZwyklyNaDziesietny(r) {
  const { a, b, c } = probuj(() => {
    const b = r.pick([2, 4, 5, 8, 20, 25]);
    const c = r.chance(0.2) ? r.int(1, 3) : 0;
    const a = r.int(1, b - 1);
    return nwd(a, b) === 1 ? { a, b, c } : null;
  });
  const k = [10, 100, 1000].find((t) => t % b === 0), m = k / b, miejsca = String(k).length - 1;
  const wynik = q(a, b).add(c);
  const tex = c ? `${c}\\frac{${a}}{${b}}` : `\\frac{${a}}{${b}}`;
  const czesc = dz(q(a * m, k), miejsca);
  return zad(
    `Zamień ułamek zwykły $${tex}$ na ułamek dziesiętny.`,
    [pole("wynik", "Wynik")],
    { wynik },
    `$${tex} = ${dz(wynik)}$`,
    [
      `Szukamy liczby, przez którą pomnożymy mianownik $${b}$, żeby dostać $${k}$: $${b} \\cdot ${m} = ${k}$.`,
      `Mnożymy licznik i mianownik przez $${m}$: $\\frac{${a}}{${b}} = \\frac{${a} \\cdot ${m}}{${b} \\cdot ${m}} = \\frac{${a * m}}{${k}}$.`,
      `Ułamek o mianowniku $${k}$ zapisujemy dziesiętnie: $${a * m}$ ${k === 10 ? "dziesiątych" : k === 100 ? "setnych" : "tysięcznych"} to $${czesc}$.`,
      c ? `Dodajemy całości: $${c} + ${czesc} = ${dz(wynik)}$.` : `Można też podzielić licznik przez mianownik: $${a} : ${b} = ${dz(wynik)}$.`,
    ],
  );
}

function dziesietneDziesietnyNaZwykly(r) {
  const { x, n, k } = probuj(() => {
    const m = r.int(1, 3);
    const n = r.int(1, 10 ** m - 1);
    const x = q(n, 10 ** m);
    return n % 10 !== 0 && ladna(x) ? { x, n, k: 10 ** m } : null;
  });
  const g = nwd(n, k);
  const nazwa = k === 10 ? "dziesiątych" : k === 100 ? "setnych" : "tysięcznych";
  return zad(
    `Zamień ułamek dziesiętny $${dz(x, String(k).length - 1)}$ na ułamek zwykły nieskracalny. Wpisz licznik i mianownik.`,
    [pole("licznik", "Licznik"), pole("mianownik", "Mianownik")],
    { licznik: q(x.n), mianownik: q(x.d) },
    `$${dz(x, String(k).length - 1)} = ${x.tex()}$`,
    [
      `Ostatnia cyfra po przecinku stoi na miejscu ${nazwa}, więc zapisujemy ułamek o mianowniku $${k}$: $${dz(x, String(k).length - 1)} = \\frac{${n}}{${k}}$.`,
      g > 1 ? `Skracamy przez $\\text{NWD}(${n}, ${k}) = ${g}$: $\\frac{${n}}{${k}} = \\frac{${n / g}}{${k / g}}$.` : "Tego ułamka nie da się skrócić.",
    ],
  );
}

function dziesietneDzielenieDziesietne(r) {
  const [licz, md] = r.pick(DZIELNIKI_DZ);
  const dziel = q(licz, 10 ** md);
  const iloraz = q(r.int(2, 60));
  const dzielna = dziel.mul(iloraz);
  const zer = 10 ** md;
  const m1 = dzielna.mul(zer), m2 = dziel.mul(zer);
  return zad(
    `Oblicz: $${dz(dzielna)} : ${dz(dziel)}$.`,
    [pole("wynik", "Wynik")],
    { wynik: iloraz },
    `$${dz(dzielna)} : ${dz(dziel)} = ${dz(iloraz)}$`,
    [
      "Dzielenie przez ułamek dziesiętny zamieniamy na dzielenie przez liczbę całkowitą: w obu liczbach przesuwamy przecinek o tyle samo miejsc w prawo (wynik się nie zmienia – to jak rozszerzanie ułamka).",
      `Dzielnik $${dz(dziel)}$ ma $${md}$ ${lm(md, ["cyfrę", "cyfry", "cyfr"])} po przecinku, więc w obu liczbach przesuwamy przecinek o $${md}$ ${lm(md, MIEJSCE)} w prawo (mnożymy obie liczby przez $${zer}$): $${dz(dzielna)} : ${dz(dziel)} = ${dz(m1)} : ${dz(m2)}$.`,
      `Teraz dzielimy liczby całkowite: $${dz(m1)} : ${dz(m2)} = ${dz(iloraz)}$.`,
      `Sprawdzenie mnożeniem: $${dz(iloraz)} \\cdot ${dz(dziel)} = ${dz(dzielna)}$ – zgadza się z dzielną.`,
    ],
  );
}

function dziesietnePrzecinek(r) {
  const w = r.int(0, 9);
  if (w <= 1) return dziesietneMnozenieRzedu(r);
  if (w <= 3) return dziesietneDzielenieRzedu(r);
  if (w <= 5) return dziesietneZwyklyNaDziesietny(r);
  if (w === 6) return dziesietneDziesietnyNaZwykly(r);
  return dziesietneDzielenieDziesietne(r);
}

// --- Lista generatorów

export const GENERATORY = [
  { id: "dodawanie-pisemne", nazwa: "Dodawanie pisemne", opis: "Dodawanie pisemne dwóch lub trzech liczb 3–5-cyfrowych z przenoszeniem („pamiętam 1”).", temat: "dodawanie-odejmowanie", generuj: dodawaniePisemne },
  { id: "odejmowanie-pisemne", nazwa: "Odejmowanie pisemne", opis: "Odejmowanie pisemne liczb 3–5-cyfrowych z „pożyczaniem”, także przez zera (np. 5003 − 1478).", temat: "dodawanie-odejmowanie", generuj: odejmowaniePisemne },
  { id: "mnozenie-pisemne", nazwa: "Mnożenie pisemne", opis: "Mnożenie pisemne: liczba 3–4-cyfrowa przez jednocyfrową, trzycyfrowa przez dwucyfrową, dwucyfrowa przez trzycyfrową (także z zerem w środku).", temat: "mnozenie", generuj: mnozeniePisemne },
  { id: "dzielenie-pisemne", nazwa: "Dzielenie pisemne bez reszty", opis: "Dzielenie pisemne liczby 3–4-cyfrowej przez jednocyfrową, bez reszty (także z zerem w wyniku), sprawdzanie mnożeniem.", temat: "dzielenie", generuj: dzielenieBezReszty },
  { id: "dzielenie-z-reszta", nazwa: "Dzielenie pisemne z resztą", opis: "Dzielenie pisemne z resztą: iloraz i reszta, także w zadaniach o paczkach i resztkach.", temat: "dzielenie", generuj: dzielenieZReszta },
  { id: "kolejnosc-dzialan", nazwa: "Kolejność działań", opis: "Wyrażenia z nawiasami, potęgami, mnożeniem, dzieleniem, dodawaniem i odejmowaniem, liczone w dobrej kolejności.", temat: "kolejnosc-dzialan", generuj: kolejnoscDzialan },
  { id: "liczby-ujemne", nazwa: "Liczby ujemne", opis: "Dodawanie i odejmowanie liczb ujemnych (termometr, oś liczbowa), mnożenie i dzielenie z minusami, krótkie wyrażenia z kolejnością działań.", temat: "liczby-ujemne", generuj: liczbyUjemne },
  { id: "nwd-nww", nazwa: "NWD i NWW", opis: "Największy wspólny dzielnik i najmniejsza wspólna wielokrotność dwóch liczb (rozkład na czynniki pierwsze), także w zadaniach o paczkach i autobusach.", temat: "podzielnosc", generuj: nwdNww },
  { id: "brakujaca-cyfra", nazwa: "Cechy podzielności – brakująca cyfra", opis: "Wstaw brakującą cyfrę tak, żeby liczba była podzielna przez 3, 4, 6 albo 9.", temat: "podzielnosc", generuj: brakujacaCyfra },
  { id: "ktora-podzielna", nazwa: "Cechy podzielności – która liczba?", opis: "Wybierz liczbę podzielną przez 2, 5, 10, 3 albo 9, sprawdzając tylko ostatnią cyfrę albo sumę cyfr.", temat: "podzielnosc", generuj: ktoraPodzielna },
  { id: "skracanie-ulamka", nazwa: "Skracanie, rozszerzanie, liczby mieszane", opis: "Skracanie do ułamka nieskracalnego (licznik i mianownik), rozszerzanie ułamka oraz zamiana liczby mieszanej na ułamek niewłaściwy i odwrotnie.", temat: "ulamki-zwykle", generuj: skracanieUlamka },
  { id: "ulamki-dodawanie-odejmowanie", nazwa: "Dodawanie i odejmowanie ułamków", opis: "Dodawanie i odejmowanie ułamków o różnych mianownikach (wspólny mianownik = NWW), także w zadaniach z pizzą i czekoladą.", temat: "ulamki-zwykle", generuj: ulamkiDodawanieOdejmowanie },
  { id: "ulamki-mnozenie-dzielenie", nazwa: "Mnożenie i dzielenie ułamków", opis: "Mnożenie ułamków ze skracaniem „na krzyż”, dzielenie przez odwrotność, liczby mieszane i ułamek z liczby.", temat: "mnozenie-ulamkow", generuj: ulamkiMnozenieDzielenie },
  { id: "dziesietne-pisemne", nazwa: "Ułamki dziesiętne – działania pisemne", opis: "Pisemne dodawanie, odejmowanie („przecinek pod przecinkiem”) i mnożenie ułamków dziesiętnych.", temat: "ulamki-dziesietne", generuj: dziesietnePisemne },
  { id: "dziesietne-przecinek", nazwa: "Ułamki dziesiętne – przesuwanie przecinka i zamiana", opis: "Mnożenie i dzielenie przez 10, 100, 1000, zamiana ułamka zwykłego na dziesiętny i odwrotnie, dzielenie przez ułamek dziesiętny.", temat: "ulamki-dziesietne", generuj: dziesietnePrzecinek },
];
