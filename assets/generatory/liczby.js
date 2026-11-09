// Generatory zadań z działu "Liczby i równania" (matura podstawowa, formuła 2023).
// Zadania powstają od końca: najpierw ładna odpowiedź, potem treść. Kontrakt – zob. wspolne.js.
// Tematy liczby-rzeczywiste, zbiory, logika, wyrażenia, wielomiany, równania wymierne i układy równań:
// moduł i błędy przybliżeń, zbiory i przedziały, zaprzeczenia i tabelki logiczne, wzory skróconego mnożenia, wielomiany, równania wymierne, układy.
import { Q, q, texNawias, wielomianTex, plusMinus, tysiace, nawiasMinus } from "./wspolne.js";

// --- Pomocnicze

/** Liczba (Q, całkowita albo tekst "3/2") w LaTeX. */
const tex = (x) => Q.z(x).tex();

function nwd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

/** Losowanie z wagami: zWagami(r, [[0.7, "a"], [0.3, "b"]]). */
function zWagami(r, pary) {
  let x = r.next() * pary.reduce((s, [w]) => s + w, 0);
  for (const [w, v] of pary) if ((x -= w) < 0) return v;
  return pary[pary.length - 1][1];
}

/**
 * Zapis dziesiętny z przecinkiem: 1.5 -> "1{,}5" (LaTeX) albo "1,5" (tekst).
 * Od 10 000 wzwyż tysiące oddziela odstęp: "10\,000" w LaTeX, "10 000" w tekście (jak tysiace()).
 */
function dziesietnie(x, wTex = true) {
  const v = Q.z(x);
  let k = 0;
  while ((10 ** k) % v.d !== 0) if (++k > 6) throw new Error(`${v} nie ma skończonego rozwinięcia dziesiętnego`);
  const cyfry = String(Math.abs(v.n) * (10 ** k / v.d)).padStart(k + 1, "0");
  let cal = cyfry.slice(0, cyfry.length - k);
  if (cal.length > 4) cal = wTex ? cal.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : tysiace(cal);
  const reszta = k ? (wTex ? "{,}" : ",") + cyfry.slice(cyfry.length - k) : "";
  return (v.ujemna ? "-" : "") + cal + reszta;
}

/** Kwota do tekstu: 11236 -> "11 236", 1236 -> "1236". */
const kwota = (x) => dziesietnie(x, false);
/** Kwota lub ułamek dziesiętny w LaTeX: "11\,236", "1{,}06". */
const dz = (x) => dziesietnie(x, true);
/** Współczynnik dziesiętny przy zmiennej: 1 -> "x", -1 -> "-x", 0.1 -> "0{,}1 x" (KaTeX pomija spację). */
const dzRazy = (c, lit = "x") => (Q.z(c).eq(1) ? lit : Q.z(c).eq(-1) ? `-${lit}` : `${dz(c)} ${lit}`);

/** Czy liczebnik łączy się z dopełniaczem l.mn.: "5 drzew", "12 drzew" (ale "2 drzewa", "1 drzewo"). */
const zDopelniaczem = (n) => n !== 1 && !([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100));

/** Czy dodatnia liczba całkowita x jest potęgą liczby a (także a^0 = 1). */
function jestPotega(x, a) {
  while (x > 1 && x % a === 0) x /= a;
  return x === 1;
}

/** Potęga w LaTeX; podstawa ułamkowa w nawiasie: \left(\frac{1}{16}\right)^{8}. */
function potegaTex(podstawa, wykladnik) {
  const b = Q.z(podstawa);
  const w = typeof wykladnik === "string" ? wykladnik : tex(wykladnik);
  return b.calkowita && !b.ujemna ? `${b.tex()}^{${w}}` : `\\left(${b.tex()}\\right)^{${w}}`;
}

/** Suma liczb w LaTeX z poprawnymi znakami: [-32, 48, -6] -> "-32 + 48 - 6". */
const sumaTex = (liczby) => liczby.map((x, i) => (i === 0 ? tex(x) : plusMinus(x))).join(" ");

/** ax + b w LaTeX; przy a < 0 < b w kolejności CKE: liniowy(-2, 3) -> "3 - 2x". */
function liniowy(a, b) {
  if (a < 0 && b > 0) return `${b} - ${a === -1 ? "" : -a}x`;
  return wielomianTex([a, b]);
}

/** Pole na jedną liczbę. */
const poleLiczba = (id, etykieta) => ({ id, typ: "liczba", etykieta });

// --- Liczby rzeczywiste

/** Forma rzeczownika po liczebniku: odmiana(3, ["zeszyt", "zeszyty", "zeszytów"]) -> "zeszyty". */
function odmiana(n, [f1, f2, f5]) {
  if (n === 1) return f1;
  return [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? f2 : f5;
}

/** Liczebnik z rzeczownikiem: zRzecz(5, ["zeszyt", "zeszyty", "zeszytów"]) -> "5 zeszytów". */
const zRzecz = (n, formy) => `${n} ${odmiana(n, formy)}`;

/** Miesza opcje wyboru: poprawna + błędne (teksty). Zwraca { opcje, ind } albo null, gdy dwie opcje są takie same. */
function mieszajOpcje(r, poprawna, bledne) {
  const wszystkie = [poprawna, ...bledne];
  if (new Set(wszystkie).size !== wszystkie.length) return null;
  const pary = r.shuffle(wszystkie.map((t, i) => [t, i === 0]));
  return { opcje: pary.map(([t]) => t), ind: pary.findIndex(([, ok]) => ok) };
}

/** Zadanie z jednym polem wyboru. */
function zadanieWybor(tresc, etykieta, opcje, ind, wynik, rozwiazanie) {
  return { tresc, pola: [{ id: "w", typ: "wybor", etykieta, opcje }], odpowiedz: { w: ind }, wynik, rozwiazanie };
}

/** Liczba dziesiętna w LaTeX, ujemna w nawiasie: (-2{,}5). */
const dzNawias = (x) => (Q.z(x).ujemna ? `(${dz(x)})` : dz(x));

/** Wartość wyrażenia z modułami: |a - √m| + |√m - b| albo |u - v| ± |s - t|. */
function lrModul(r) {
  if (r.chance(0.45)) {
    const k = r.int(1, 6);
    const m = r.int(k * k + 1, (k + 1) * (k + 1) - 1);
    const lo = k - r.int(0, Math.min(2, k - 1));
    const hi = k + 1 + r.int(0, 2);
    const sk = `\\sqrt{${m}}`;
    const w1 = r.chance(0.5) ? `${sk} - ${lo}` : `${lo} - ${sk}`;
    const w2 = r.chance(0.5) ? `${hi} - ${sk}` : `${sk} - ${hi}`;
    const wyr = r.chance(0.5) ? `|${w1}| + |${w2}|` : `|${w2}| + |${w1}|`;
    const wartosc = hi - lo;
    return zadanieWartosc(r, wyr, wartosc, [
      `Oszacuj pierwiastek: $${k * k} < ${m} < ${(k + 1) ** 2}$, więc $${k} < ${sk} < ${k + 1}$. Zatem $${lo} < ${sk} < ${hi}$.`,
      `Liczby $${sk} - ${lo}$ oraz $${hi} - ${sk}$ są dodatnie, więc $|${w1}| = ${sk} - ${lo}$ i $|${w2}| = ${hi} - ${sk}$.`,
      `$${wyr} = (${sk} - ${lo}) + (${hi} - ${sk}) = ${wartosc}$`,
    ]);
  }
  const skladnik = () => {
    for (;;) {
      const u = r.intBez(-9, 9, 0);
      const v = r.intBez(-9, 9, 0);
      if (u !== v) return { tekst: `${u} - ${texNawias(v)}`, w: u - v };
    }
  };
  const A = skladnik();
  const B = skladnik();
  const op = r.pick(["+", "-", "\\cdot"]);
  const [aa, bb] = [Math.abs(A.w), Math.abs(B.w)];
  const wartosc = op === "+" ? aa + bb : op === "-" ? aa - bb : aa * bb;
  const wyr = `|${A.tekst}| ${op} |${B.tekst}|`;
  return zadanieWartosc(r, wyr, wartosc, [
    `Wartość bezwzględna zmienia liczbę ujemną na dodatnią: $|${A.tekst}| = |${A.w}| = ${aa}$ oraz $|${B.tekst}| = |${B.w}| = ${bb}$.`,
    `$${aa} ${op} ${bb} = ${wartosc}$`,
  ]);
}

/** x - c w LaTeX: "x + 2", "x - 3{,}5". */
const xMinus = (c) => (c.zero ? "x" : c.ujemna ? `x + ${dz(c.neg())}` : `x - ${dz(c)}`);

/** Odległość dwóch punktów na osi albo liczba liczb całkowitych w zadanej odległości od danej liczby. */
function lrOdleglosc(r) {
  if (r.chance(0.5)) {
    let a, b;
    do {
      a = q(r.int(-14, 14), 2);
      b = q(r.int(-14, 14), 2);
    } while (Math.abs(a.valueOf() - b.valueOf()) < 2 || a.zero || b.zero);
    const roznica = b.sub(a);
    const odl = roznica.ujemna ? roznica.neg() : roznica;
    return {
      tresc: `Na osi liczbowej punkt $A$ odpowiada liczbie $${dz(a)}$, a punkt $B$ – liczbie $${dz(b)}$. Oblicz odległość punktów $A$ i $B$.`,
      pola: [poleLiczba("w", "Odległość")],
      odpowiedz: { w: odl },
      wynik: `$|AB| = ${dz(odl)}$`,
      rozwiazanie: [
        "Odległość dwóch liczb na osi to wartość bezwzględna ich różnicy.",
        `$|${dz(b)} - ${dzNawias(a)}| = |${dz(roznica)}| = ${dz(odl)}$`,
      ],
    };
  }
  for (;;) {
    const c = q(r.int(-12, 12), 2);
    const d = q(r.int(2, 14), 2);
    const ostra = r.chance(0.5);
    const spelnia = (x) => (ostra ? Math.abs(x - c.valueOf()) < d.valueOf() : Math.abs(x - c.valueOf()) <= d.valueOf());
    const calk = [];
    for (let x = -40; x <= 40; x++) if (spelnia(x)) calk.push(x);
    if (calk.length < 2) continue;
    const [pierwsza, ostatnia] = [calk[0], calk[calk.length - 1]];
    const lewy = c.sub(d);
    const prawy = c.add(d);
    const [nl, np] = ostra ? ["(", ")"] : ["[", "]"];
    return {
      tresc: `Ile liczb całkowitych $x$ spełnia nierówność $|${xMinus(c)}| ${ostra ? "<" : "\\le"} ${dz(d)}$?`,
      pola: [poleLiczba("w", "Liczba liczb całkowitych")],
      odpowiedz: { w: calk.length },
      wynik: `$${calk.length}$`,
      rozwiazanie: [
        `Nierówność mówi, że liczba $x$ leży w odległości ${ostra ? "mniejszej niż" : "co najwyżej"} $${dz(d)}$ od liczby $${dz(c)}$.`,
        `Zatem $x \\in ${nl}${dz(c)} - ${dz(d)}, ${dz(c)} + ${dz(d)}${np} = ${nl}${dz(lewy)}, ${dz(prawy)}${np}$.`,
        `Liczby całkowite z tego przedziału to liczby od $${pierwsza}$ do $${ostatnia}$, więc jest ich $${ostatnia} - ${texNawias(pierwsza)} + 1 = ${calk.length}$.`,
      ],
    };
  }
}

// Przybliżenia: opis (x – wartość dokładna, a – przybliżenie), jednostka, zakres dokładnej wartości w dziesiątych oraz wartości całkowite.
const POMIARY = [
  { opis: (x, a) => `Długość trasy wynosi dokładnie ${x} km, a w przewodniku podano ${a} km.`, j: "km", dziesiate: [300, 2500], cale: [40, 50, 80, 100, 200, 250, 400, 500] },
  { opis: (x, a) => `Masa paczki wynosi dokładnie ${x} kg, a na etykiecie zapisano ${a} kg.`, j: "kg", dziesiate: [15, 99], cale: [20, 25, 40, 50, 80, 100, 200, 250] },
  { opis: (x, a) => `Pojemność zbiornika wynosi dokładnie ${x} l, a w katalogu podano ${a} l.`, j: "l", dziesiate: [200, 900], cale: [50, 80, 100, 200, 250, 400, 500, 800, 1000] },
  { opis: (x, a) => `Powierzchnia działki wynosi dokładnie ${x} m², a w ogłoszeniu podano ${a} m².`, j: "m²", dziesiate: [2000, 9000], cale: [250, 400, 500, 800, 1000] },
  { opis: (x, a) => `Wysokość wieży wynosi dokładnie ${x} m, a w folderze podano ${a} m.`, j: "m", dziesiate: [300, 950], cale: [40, 50, 80, 100, 200] },
];

/** Błąd bezwzględny przybliżenia do całości. */
function lrBladBezwzgledny(r) {
  const p = r.pick(POMIARY);
  for (;;) {
    const n = r.int(p.dziesiate[0], p.dziesiate[1]);
    if (n % 10 === 0 || n % 10 === 5) continue;
    const x = q(n, 10);
    const a = Math.round(n / 10);
    const e = q(Math.abs(n - 10 * a), 10);
    return {
      tresc: `${p.opis(kwota(x), kwota(a))} Oblicz błąd bezwzględny tego przybliżenia.`,
      pola: [poleLiczba("w", "Błąd bezwzględny")],
      odpowiedz: { w: e },
      wynik: `$${dz(e)}$ ${p.j}`,
      rozwiazanie: [
        "Błąd bezwzględny to odległość wartości dokładnej od przybliżenia, czyli wartość bezwzględna ich różnicy.",
        `$|${dz(x)} - ${a}| = |${dz(x.sub(a))}| = ${dz(e)}$`,
      ],
    };
  }
}

/** Błąd względny przybliżenia w procentach. */
function lrBladWzgledny(r) {
  const p = r.pick(POMIARY);
  for (;;) {
    const x = r.pick(p.cale);
    const e = r.int(1, Math.max(1, Math.floor(x / 8)));
    const a = r.chance(0.5) ? x - e : x + e;
    const proc = q(e * 100, x);
    if (proc.d > 12) continue;
    return {
      tresc: `${p.opis(kwota(x), kwota(a))} Oblicz błąd względny tego przybliżenia (w procentach).`,
      pola: [poleLiczba("w", "Błąd względny (%)")],
      odpowiedz: { w: proc },
      wynik: `$${dz(proc)}\\%$`,
      rozwiazanie: [
        `Błąd bezwzględny: $|${x} - ${a}| = ${e}$.`,
        "Błąd względny to błąd bezwzględny podzielony przez wartość dokładną, w procentach.",
        `$\\frac{${e}}{${x}} \\cdot 100\\% = ${dz(proc)}\\%$`,
      ],
    };
  }
}

const MIEJSCA = ["miejsce", "miejsca", "miejsc"];

/** Zapis w notacji wykładniczej a · 10^k. */
function lrNotacja(r) {
  for (;;) {
    const m = r.int(11, 99);
    if (m % 10 === 0) continue;
    const k = r.pick([-5, -4, -3, -2, -1, 3, 4, 5, 6, 7, 8]);
    const a = q(m, 10);
    const wartosc = a.mul(q(10).pow(k));
    let zapis;
    try {
      zapis = dz(wartosc);
    } catch {
      continue;
    }
    const przes = k > 0
      ? `Przecinek przesuwamy o ${zRzecz(k, MIEJSCA)} w lewo, więc wykładnik jest dodatni.`
      : `Przecinek przesuwamy o ${zRzecz(-k, MIEJSCA)} w prawo, więc wykładnik jest ujemny.`;
    return {
      tresc: r.pick([
        `Zapisz liczbę $${zapis}$ w postaci $a \\cdot 10^{k}$, gdzie $1 \\le a < 10$, a $k$ jest liczbą całkowitą. Podaj $a$ i $k$.`,
        `Liczbę $${zapis}$ zapisano w notacji wykładniczej $a \\cdot 10^{k}$, gdzie $1 \\le a < 10$ oraz $k$ jest całkowite. Wyznacz $a$ i $k$.`,
      ]),
      pola: [poleLiczba("a", "$a =$"), poleLiczba("k", "$k =$")],
      odpowiedz: { a, k },
      wynik: `$${zapis} = ${dz(a)} \\cdot 10^{${k}}$`,
      rozwiazanie: [
        `Cyfry zapisujemy tak, żeby przed przecinkiem została jedna cyfra różna od zera: $a = ${dz(a)}$.`,
        przes,
        `Zatem $${zapis} = ${dz(a)} \\cdot 10^{${k}}$, czyli $a = ${dz(a)}$ i $k = ${k}$.`,
      ],
    };
  }
}

/** Reszta z dzielenia: c·n + e, n², x + y albo x · y. */
function lrReszta(r) {
  const d = r.int(3, 9);
  const rodzaj = r.int(0, 2);
  const dalej = (t, wynik, pierwszy) => {
    const j = Math.floor(t / d);
    if (t < d) return `${pierwszy} dzieli się przez ${d}, a liczba $${t}$ jest mniejsza od ${d}, więc reszta wynosi ${wynik}.`;
    return wynik === 0
      ? `${pierwszy} dzieli się przez ${d}, a liczba $${t}$ też (bo $${t} = ${d} \\cdot ${j}$), więc reszta wynosi 0.`
      : `${pierwszy} dzieli się przez ${d}, a $${t} = ${d} \\cdot ${j} + ${wynik}$, więc reszta wynosi ${wynik}.`;
  };
  if (rodzaj === 0) {
    const reszta = r.int(1, d - 1);
    const c = r.int(2, 6);
    const e = r.int(1, 9);
    const t = c * reszta + e;
    const wynik = t % d;
    return {
      tresc: `Liczba całkowita $n$ przy dzieleniu przez ${d} daje resztę ${reszta}. Jaką resztę przy dzieleniu przez ${d} daje liczba $${c}n + ${e}$?`,
      pola: [poleLiczba("w", "Reszta")],
      odpowiedz: { w: wynik },
      wynik: `$${wynik}$`,
      rozwiazanie: [
        `Zapisujemy $n = ${d}k + ${reszta}$, gdzie $k$ jest liczbą całkowitą.`,
        `$${c}n + ${e} = ${c}(${d}k + ${reszta}) + ${e} = ${c * d}k + ${t}$`,
        dalej(t, wynik, `Liczba $${c * d}k$`),
      ],
    };
  }
  if (rodzaj === 1) {
    const reszta = r.int(2, d - 1);
    const t = reszta * reszta;
    const wynik = t % d;
    return {
      tresc: `Liczba całkowita $n$ przy dzieleniu przez ${d} daje resztę ${reszta}. Jaką resztę przy dzieleniu przez ${d} daje liczba $n^{2}$?`,
      pola: [poleLiczba("w", "Reszta")],
      odpowiedz: { w: wynik },
      wynik: `$${wynik}$`,
      rozwiazanie: [
        `Zapisujemy $n = ${d}k + ${reszta}$, gdzie $k$ jest liczbą całkowitą.`,
        `$n^{2} = (${d}k + ${reszta})^{2} = ${d * d}k^{2} + ${2 * d * reszta}k + ${t}$`,
        dalej(t, wynik, `Dwa pierwsze składniki`).replace("dzieli się", "dzielą się"),
      ],
    };
  }
  const r1 = r.int(1, d - 1);
  const r2 = r.int(1, d - 1);
  const suma = r.chance(0.5);
  const t = suma ? r1 + r2 : r1 * r2;
  const wynik = t % d;
  const wspR = (c) => (c === 1 ? "" : String(c));
  return {
    tresc: `Liczba całkowita $x$ przy dzieleniu przez ${d} daje resztę ${r1}, a liczba całkowita $y$ – resztę ${r2}. Jaką resztę przy dzieleniu przez ${d} daje ${suma ? "suma $x + y$" : "iloczyn $x \\cdot y$"}?`,
    pola: [poleLiczba("w", "Reszta")],
    odpowiedz: { w: wynik },
    wynik: `$${wynik}$`,
    rozwiazanie: [
      `Zapisujemy $x = ${d}k + ${r1}$ oraz $y = ${d}l + ${r2}$, gdzie $k$ i $l$ są liczbami całkowitymi.`,
      suma
        ? `$x + y = ${d}(k + l) + ${t}$`
        : `$x \\cdot y = (${d}k + ${r1})(${d}l + ${r2}) = ${d}(${d}kl + ${wspR(r2)}k + ${wspR(r1)}l) + ${t}$`,
      dalej(t, wynik, suma ? `Liczba $${d}(k + l)$` : `Pierwszy składnik, czyli $${d}(${d}kl + ${wspR(r2)}k + ${wspR(r1)}l)$,`),
    ],
  };
}

const ILE_KOLEJNYCH = { 3: "trzech", 4: "czterech", 5: "pięciu" };

/** Suma kolejnych liczb całkowitych (parzystych, nieparzystych): najmniejsza albo największa z nich. */
function lrKolejne(r) {
  const rodzaj = r.pick(["całkowitych", "parzystych", "nieparzystych"]);
  const calk = rodzaj === "całkowitych";
  const n = calk ? r.pick([3, 4, 5]) : r.pick([3, 4]);
  const krok = calk ? 1 : 2;
  const zm = calk ? "n" : "k";
  const baza = rodzaj === "nieparzystych" ? 1 : 0;
  const v = calk ? r.int(-10, 30) : r.int(1, 25);
  const wsp0 = calk ? 1 : 2;
  const liczby = Array.from({ length: n }, (_, i) => wsp0 * v + baza + krok * i);
  const S = liczby.reduce((s, x) => s + x, 0);
  const skladniki = liczby.map((_, i) => wielomianTex([wsp0, baza + krok * i], zm));
  const A = n * wsp0;
  const C = n * baza + (krok * n * (n - 1)) / 2;
  const najmniejsza = r.chance(0.5);
  const wynik = najmniejsza ? liczby[0] : liczby[n - 1];
  return {
    tresc: `Suma ${ILE_KOLEJNYCH[n]} kolejnych liczb ${rodzaj} jest równa $${S}$. Oblicz ${najmniejsza ? "najmniejszą" : "największą"} z tych liczb.`,
    pola: [poleLiczba("w", najmniejsza ? "Najmniejsza liczba" : "Największa liczba")],
    odpowiedz: { w: wynik },
    wynik: `$${wynik}$`,
    rozwiazanie: [
      `Zapisujemy kolejne liczby: ${skladniki.map((s) => `$${s}$`).join(", ")}.`,
      `Ich suma to $${wielomianTex([A, C], zm)}$, więc $${wielomianTex([A, C], zm)} = ${S}$.`,
      `Stąd $${wielomianTex([A, 0], zm)} = ${S - C}$, czyli $${zm} = ${v}$.`,
      `Te liczby to ${liczby.map((x) => `$${x}$`).join(", ")}, więc ${najmniejsza ? "najmniejsza" : "największa"} z nich to $${wynik}$.`,
    ],
  };
}

// --- Zbiory

const setTex = (xs) => `\\{${xs.join(", ")}\\}`;
const listaTex = (xs) => xs.map((x) => `$${x}$`).join(", ");
const ELEMENTY = ["element", "elementy", "elementów"];

const DZIALANIA_ZB = [
  { tex: "A \\cap B", f: (A, B) => A.filter((x) => B.includes(x)) },
  { tex: "A \\cup B", f: (A, B) => [...new Set([...A, ...B])].sort((x, y) => x - y) },
  { tex: "A \\setminus B", f: (A, B) => A.filter((x) => !B.includes(x)) },
  { tex: "B \\setminus A", f: (A, B) => B.filter((x) => !A.includes(x)) },
  { tex: "(A \\cup B) \\setminus (A \\cap B)", f: (A, B) => [...A.filter((x) => !B.includes(x)), ...B.filter((x) => !A.includes(x))].sort((x, y) => x - y) },
];

/** Ile elementów ma zbiór: zbiory wypisane albo liczby podzielne przez p i przez q. */
function zbSkonczone(r) {
  if (r.chance(0.5)) {
    for (;;) {
      const U = r.shuffle(Array.from({ length: 14 }, (_, i) => i + 1));
      const A = U.slice(0, r.int(4, 6)).sort((x, y) => x - y);
      const B = r.shuffle(U).slice(0, r.int(4, 6)).sort((x, y) => x - y);
      const wsp = A.filter((x) => B.includes(x));
      if (wsp.length < 1 || wsp.length === A.length || wsp.length === B.length) continue;
      const op = r.pick(DZIALANIA_ZB);
      const wynik = op.f(A, B);
      if (wynik.length === 0) continue;
      return {
        tresc: `Dane są zbiory $A = ${setTex(A)}$ i $B = ${setTex(B)}$. Ile elementów ma zbiór $${op.tex}$?`,
        pola: [poleLiczba("w", "Liczba elementów")],
        odpowiedz: { w: wynik.length },
        wynik: `$${wynik.length}$`,
        rozwiazanie: [
          `Elementy należące do obu zbiorów: ${listaTex(wsp)}.`,
          `$${op.tex} = ${setTex(wynik)}$`,
          `Ten zbiór ma ${zRzecz(wynik.length, ELEMENTY)}.`,
        ],
      };
    }
  }
  for (;;) {
    const p = r.pick([2, 3, 4, 5, 6, 8, 9, 10]);
    const qq = r.pick([2, 3, 4, 5, 6, 8, 9, 10, 12]);
    const N = r.pick([30, 36, 40, 48, 50, 60, 72, 90, 100]);
    const L = (p / nwd(p, qq)) * qq;
    if (p === qq || L > N) continue;
    if ((p % qq === 0 || qq % p === 0) && r.chance(0.75)) continue;   // jeden zbiór zawarty w drugim – rzadziej
    const [fa, fb, fab] = [Math.floor(N / p), Math.floor(N / qq), Math.floor(N / L)];
    const wybor = r.pick([
      ["A \\cap B", fab], ["A \\cup B", fa + fb - fab], ["A \\setminus B", fa - fab], ["B \\setminus A", fb - fab],
    ]);
    const [tekst, wynik] = wybor;
    if (wynik === 0) continue;
    return {
      tresc: `Zbiór $A$ składa się z liczb naturalnych od $1$ do $${N}$ podzielnych przez $${p}$, a zbiór $B$ – z liczb naturalnych od $1$ do $${N}$ podzielnych przez $${qq}$. Ile elementów ma zbiór $${tekst}$?`,
      pola: [poleLiczba("w", "Liczba elementów")],
      odpowiedz: { w: wynik },
      wynik: `$${wynik}$`,
      rozwiazanie: [
        `Liczb podzielnych przez $${p}$ jest $${fa}$ (największa to $${p * fa}$), więc $|A| = ${fa}$. Podobnie $|B| = ${fb}$ (największa to $${qq * fb}$).`,
        `Liczba należy do obu zbiorów, gdy dzieli się przez $${p}$ i przez $${qq}$, czyli przez ich NWW równe $${L}$. Takich liczb jest $${fab}$, więc $|A \\cap B| = ${fab}$.`,
        tekst === "A \\cap B" ? null
          : tekst === "A \\cup B" ? `Wspólne elementy liczymy raz: $|A \\cup B| = ${fa} + ${fb} - ${fab} = ${wynik}$.`
            : `$|${tekst}| = ${tekst === "A \\setminus B" ? `${fa} - ${fab}` : `${fb} - ${fab}`} = ${wynik}$`,
      ].filter(Boolean),
    };
  }
}

// Przedział: { l, lc, p, pc } – końce (Q albo null = nieskończoność) i informacja, czy należą do przedziału.

const nalezyDo = (iv, x) =>
  (iv.l === null || (iv.lc ? x.cmp(iv.l) >= 0 : x.cmp(iv.l) > 0)) && (iv.p === null || (iv.pc ? x.cmp(iv.p) <= 0 : x.cmp(iv.p) < 0));

/** Zapis przedziału: [1, 3), (-\infty, 2], \{3\}. */
function przedzialTex(iv) {
  if (iv.l !== null && iv.p !== null && iv.l.eq(iv.p) && iv.lc && iv.pc) return `\\{${tex(iv.l)}\\}`;
  const lewy = iv.l === null ? "(-\\infty" : `${iv.lc ? "[" : "("}${tex(iv.l)}`;
  const prawy = iv.p === null ? "+\\infty)" : `${tex(iv.p)}${iv.pc ? "]" : ")"}`;
  return `${lewy}, ${prawy}`;
}

/** Zapis sumy przedziałów (lista rozłącznych przedziałów od lewej). */
const zbiorTexPrz = (lista) => (lista.length ? lista.map(przedzialTex).join(" \\cup ") : "\\emptyset");

/** Zbiór liczb rzeczywistych (dany predykatem) jako lista rozłącznych przedziałów; punkty – wszystkie możliwe końce, rosnąco. */
function przedzialyZPredykatu(punkty, nal) {
  const n = punkty.length;
  const reprez = (i) => (i === 0 ? punkty[0].sub(1) : i === n ? punkty[n - 1].add(1) : punkty[i - 1].add(punkty[i]).div(2));
  const atomy = [];
  for (let i = 0; i <= n; i++) {
    atomy.push({ luka: true, i, ok: nal(reprez(i)) });
    if (i < n) atomy.push({ luka: false, i, ok: nal(punkty[i]) });
  }
  const wynik = [];
  let s = -1;
  for (let k = 0; k <= atomy.length; k++) {
    const ok = k < atomy.length && atomy[k].ok;
    if (ok && s < 0) s = k;
    if (!ok && s >= 0) {
      const a = atomy[s];
      const b = atomy[k - 1];
      wynik.push({
        l: a.luka ? (a.i === 0 ? null : punkty[a.i - 1]) : punkty[a.i],
        lc: !a.luka,
        p: b.luka ? (b.i === n ? null : punkty[b.i]) : punkty[b.i],
        pc: !b.luka,
      });
      s = -1;
    }
  }
  return wynik;
}

function losujPrzedzial(r, dozwolNiesk) {
  const typ = dozwolNiesk ? zWagami(r, [[0.7, "o"], [0.15, "l"], [0.15, "p"]]) : "o";
  if (typ === "o") {
    const l = r.int(-7, 5);
    return { l: q(l), lc: r.chance(0.5), p: q(l + r.int(2, 8)), pc: r.chance(0.5) };
  }
  if (typ === "l") return { l: null, lc: false, p: q(r.int(-6, 8)), pc: r.chance(0.5) };
  return { l: q(r.int(-6, 8)), lc: r.chance(0.5), p: null, pc: false };
}

/** Para przedziałów A, B; czasem koniec jednego przedziału jest początkiem drugiego. */
function losujPare(r, ograniczone) {
  for (;;) {
    const A = losujPrzedzial(r, !ograniczone);
    let B = losujPrzedzial(r, !ograniczone);
    if (r.chance(0.3) && A.l && A.p) {
      B = r.chance(0.5)
        ? { l: A.p, lc: r.chance(0.5), p: A.p.add(r.int(2, 6)), pc: r.chance(0.5) }
        : { l: A.l.sub(r.int(2, 6)), lc: r.chance(0.5), p: A.l, pc: r.chance(0.5) };
    }
    const konce = new Set([A.l, A.p, B.l, B.p].filter(Boolean).map(String));
    if (konce.size >= 3 || (konce.size === 2 && [A, B].some((iv) => iv.l === null || iv.p === null))) return [A, B];
  }
}

const DZIALANIA_PRZ = [
  { tex: "A \\cap B", f: (a, b) => a && b, krok: "Część wspólna to fragment zaznaczony na obu osiach naraz." },
  { tex: "A \\cup B", f: (a, b) => a || b, krok: "Suma to wszystko, co jest zaznaczone na którejkolwiek z osi." },
  { tex: "A \\setminus B", f: (a, b) => a && !b, krok: "Z przedziału $A$ zabieramy to, co należy do $B$." },
  { tex: "B \\setminus A", f: (a, b) => b && !a, krok: "Z przedziału $B$ zabieramy to, co należy do $A$." },
  { tex: "A'", f: (a) => !a, krok: "Dopełnienie to reszta osi liczbowej, a przy końcach nawias zmienia się na przeciwny." },
];

/** Działania na przedziałach: wybór zbioru albo liczba liczb całkowitych w wyniku. */
function zbPrzedzialy(r) {
  const liczenie = r.chance(0.3);
  for (let proba = 0; proba < 300; proba++) {
    const [A, B] = losujPare(r, liczenie);
    const punkty = [...new Map([A.l, A.p, B.l, B.p].filter(Boolean).map((x) => [x.toString(), x])).values()].sort((x, y) => x.cmp(y));
    const wyniki = DZIALANIA_PRZ.map((op) => ({ op, iv: przedzialyZPredykatu(punkty, (x) => op.f(nalezyDo(A, x), nalezyDo(B, x))) }));
    const zad = `Dane są przedziały $A = ${przedzialTex(A)}$ i $B = ${przedzialTex(B)}$.`;
    const zaznacz = "Zaznaczamy oba przedziały na dwóch osiach liczbowych, jedna pod drugą.";
    if (liczenie) {
      const { op, iv } = wyniki[r.int(0, 3)];
      const calk = [];
      for (let x = -30; x <= 30; x++) if (iv.some((p) => nalezyDo(p, q(x)))) calk.push(x);
      if (calk.length < 2 || calk.length > 14) continue;
      return {
        tresc: `${zad} Ile liczb całkowitych należy do zbioru $${op.tex}$?`,
        pola: [poleLiczba("w", "Liczba liczb całkowitych")],
        odpowiedz: { w: calk.length },
        wynik: `$${calk.length}$`,
        rozwiazanie: [
          `${zaznacz} ${op.krok}`,
          `$${op.tex} = ${zbiorTexPrz(iv)}$`,
          `Liczby całkowite z tego zbioru: ${listaTex(calk)}. Jest ich $${calk.length}$.`,
        ],
      };
    }
    const { op, iv } = r.pick(wyniki);
    const dop = op.tex === "A'";
    const poprawna = zbiorTexPrz(iv);
    if (poprawna === "\\emptyset" && r.chance(0.6)) continue;
    // błędne odpowiedzi: wynik innego działania (przy dopełnieniu – sam zbiór A) albo ten sam wynik z pomyłką w nawiasie
    const pula = dop
      ? [zbiorTexPrz(przedzialyZPredykatu(punkty, (x) => nalezyDo(A, x)))]
      : wyniki.filter((w) => w.op.tex !== "A'").map((w) => zbiorTexPrz(w.iv));
    const inneBezPustego = r.shuffle(pula.filter((t, i, t2) => t !== poprawna && t !== "\\emptyset" && t2.indexOf(t) === i));
    const inne = pula.includes("\\emptyset") && poprawna !== "\\emptyset" ? [...inneBezPustego, "\\emptyset"] : inneBezPustego;
    const mutacje = [];
    iv.forEach((p, k) => {
      for (const strona of ["l", "p"]) {
        const nowy = iv.map((x, j) => (j === k ? { ...x, [strona === "l" ? "lc" : "pc"]: !x[strona === "l" ? "lc" : "pc"] } : x));
        if (p[strona] !== null && !(p.l && p.p && p.l.eq(p.p))) mutacje.push(zbiorTexPrz(nowy));
      }
    });
    const bledne = [];
    for (const t of [...inne.slice(0, 2), ...r.shuffle(mutacje), ...inne.slice(2)]) {
      if (t !== poprawna && !bledne.includes(t)) bledne.push(t);
      if (bledne.length === 3) break;
    }
    if (bledne.length < 3) continue;
    const m = mieszajOpcje(r, `$${poprawna}$`, bledne.map((t) => `$${t}$`));
    if (!m) continue;
    const pytanie = op.tex === "A'"
      ? "Wskaż dopełnienie $A'$ zbioru $A$ (w zbiorze liczb rzeczywistych)."
      : `Wskaż zbiór $${op.tex}$.`;
    const konce = [...new Map(iv.flatMap((p) => [p.l, p.p]).filter(Boolean).map((x) => [x.toString(), x])).values()];
    const opisKonca = (e) => {
      const [wA, wB] = [nalezyDo(A, e), nalezyDo(B, e)];
      const wWyniku = op.f(wA, wB) ? "należy do wyniku" : "nie należy do wyniku";
      return dop
        ? `$${tex(e)}$ ${wA ? "należy" : "nie należy"} do $A$, więc ${wWyniku}`
        : `$${tex(e)}$ ${wA ? "należy" : "nie należy"} do $A$ i ${wB ? "należy" : "nie należy"} do $B$, więc ${wWyniku}`;
    };
    return zadanieWybor(`${zad}\n\n${pytanie}`, "Zbiór", m.opcje, m.ind, `$${op.tex} = ${poprawna}$`, [
      `${zaznacz} ${op.krok}`,
      konce.length ? `Sprawdzamy końce wyniku: ${konce.map(opisKonca).join("; ")}.` : "Żaden fragment osi nie spełnia warunku, więc wynik jest zbiorem pustym.",
      `$${op.tex} = ${poprawna}$`,
    ]);
  }
  return zbSkonczone(r);
}

// --- Logika

const NEG_NIER = { "<": "\\ge", "\\le": ">", ">": "\\le", "\\ge": "<" };

// Znaki nierówności jako funkcje i punkty, w których sprawdzamy, czy błędna opcja nie jest przypadkiem poprawna.
const FN_NIER = { "<": (u, c) => u < c, "\\le": (u, c) => u <= c, ">": (u, c) => u > c, "\\ge": (u, c) => u >= c };
const PUNKTY_X = Array.from({ length: 161 }, (_, i) => -20 + i / 4);

/** Zaprzeczenie koniunkcji lub alternatywy nierówności (prawa De Morgana). */
function lgDeMorgan(r) {
  for (;;) {
    const a = r.int(-6, 6);
    const b = a + r.int(2, 8);
    const koniunkcja = r.chance(0.5);
    const [op1, op2] = koniunkcja ? [r.pick([">", "\\ge"]), r.pick(["<", "\\le"])] : [r.pick(["<", "\\le"]), r.pick([">", "\\ge"])];
    const [sp, sp2] = koniunkcja ? ["i", "lub"] : ["lub", "i"];
    const z = (op, c) => `$x ${op} ${c}$`;
    const polacz = (sp0, f1, f2) => (x) => (sp0 === "i" ? f1(x) && f2(x) : f1(x) || f2(x));
    const [p1, p2] = [(x) => FN_NIER[op1](x, a), (x) => FN_NIER[op2](x, b)];
    const [n1, n2] = [(x) => !p1(x), (x) => !p2(x)];
    const [w1, w2] = [(x) => FN_NIER[ODWROTNY[op1]](x, a), (x) => FN_NIER[ODWROTNY[op2]](x, b)];
    const poprawnaF = polacz(sp2, n1, n2);
    const bledneF = [polacz(sp, n1, n2), polacz(sp2, w1, w2), polacz(sp2, n1, p2)];
    if (bledneF.some((f) => PUNKTY_X.every((x) => f(x) === poprawnaF(x)))) continue;
    const m = mieszajOpcje(r, `${z(NEG_NIER[op1], a)} ${sp2} ${z(NEG_NIER[op2], b)}`, [
      `${z(NEG_NIER[op1], a)} ${sp} ${z(NEG_NIER[op2], b)}`,
      `${z(ODWROTNY[op1], a)} ${sp2} ${z(ODWROTNY[op2], b)}`,
      `${z(NEG_NIER[op1], a)} ${sp2} ${z(op2, b)}`,
    ]);
    if (!m) continue;
    return zadanieWybor(
      `Które zdanie jest zaprzeczeniem zdania „${z(op1, a)} ${sp} ${z(op2, b)}”?`,
      "Zaprzeczenie", m.opcje, m.ind, `${z(NEG_NIER[op1], a)} ${sp2} ${z(NEG_NIER[op2], b)}`,
      [
        `Zaprzeczając zdanie z „${sp}”, zaprzeczamy oba zdania i zamieniamy „${sp}” na „${sp2}” (prawo De Morgana).`,
        `Zaprzeczeniem ${z(op1, a)} jest ${z(NEG_NIER[op1], a)}, a zaprzeczeniem ${z(op2, b)} jest ${z(NEG_NIER[op2], b)}.`,
        `Zaprzeczenie całego zdania: ${z(NEG_NIER[op1], a)} ${sp2} ${z(NEG_NIER[op2], b)}.`,
      ],
    );
  }
}

/** Zaprzeczenie zdania z kwantyfikatorem „dla każdego” lub „istnieje”. */
function lgKwantyfikator(r) {
  const u = r.int(1, 5);
  const c = r.int(-3, 9);
  const E = r.pick(["x^{2}", `x^{2} + ${u}`, `(x - ${u})^{2}`, `2x + ${u}`, `x^{2} - ${u}`]);
  const op = r.pick(ZNAKI);
  const ogol = (rel) => `Dla każdej liczby rzeczywistej $x$ zachodzi $${E} ${rel} ${c}$.`;
  const ist = (rel) => `Istnieje liczba rzeczywista $x$, dla której $${E} ${rel} ${c}$.`;
  const ogolne = r.chance(0.5);
  const zdanie = ogolne ? ogol(op) : ist(op);
  const poprawna = ogolne ? ist(NEG_NIER[op]) : ogol(NEG_NIER[op]);
  const bledne = ogolne
    ? [ogol(NEG_NIER[op]), ist(ODWROTNY[op]), `Nie istnieje liczba rzeczywista $x$, dla której $${E} ${op} ${c}$.`]
    : [ist(NEG_NIER[op]), ogol(ODWROTNY[op]), ist(ODWROTNY[op])];
  const m = mieszajOpcje(r, poprawna, bledne);
  return zadanieWybor(
    `Które zdanie jest zaprzeczeniem zdania „${zdanie.slice(0, -1)}”?`,
    "Zaprzeczenie", m.opcje, m.ind, poprawna,
    [
      `Zaprzeczając zdanie z kwantyfikatorem, zamieniamy ${ogolne ? "„dla każdego” na „istnieje”" : "„istnieje” na „dla każdego”"} i zaprzeczamy to, co stoi za kwantyfikatorem.`,
      `Zaprzeczeniem $${E} ${op} ${c}$ jest $${E} ${NEG_NIER[op]} ${c}$.`,
      `Zaprzeczenie: ${poprawna}`,
    ],
  );
}

/** Zaprzeczenie implikacji: „jeśli p, to q” zaprzeczamy zdaniem „p i nie q”. */
function lgImplikacja(r) {
  for (;;) {
    const a = r.int(-3, 6);
    const op1 = r.pick([">", "\\ge", "<", "\\le"]);
    const k = r.int(1, 5);
    const [E, fE] = r.pick([["x^{2}", (x) => x * x], ["2x", (x) => 2 * x], [`x + ${k}`, (x) => x + k]]);
    const op2 = r.pick(ZNAKI);
    const b = r.int(1, 12);
    const [pf, qf] = [(x) => FN_NIER[op1](x, a), (x) => FN_NIER[op2](fE(x), b)];
    const poprawnaF = (x) => pf(x) && !qf(x);
    const bledneF = [(x) => pf(x) || !qf(x), (x) => !pf(x) && qf(x), (x) => !qf(x) || pf(x)];
    if (bledneF.some((f) => PUNKTY_X.every((x) => f(x) === poprawnaF(x)))) continue;
    const p = `$x ${op1} ${a}$`;
    const np = `$x ${NEG_NIER[op1]} ${a}$`;
    const qq = `$${E} ${op2} ${b}$`;
    const nq = `$${E} ${NEG_NIER[op2]} ${b}$`;
    const m = mieszajOpcje(r, `${p} i ${nq}`, [`Jeśli ${np}, to ${nq}`, `${np} i ${qq}`, `Jeśli ${qq}, to ${p}`]);
    if (!m) continue;
    return zadanieWybor(
      `Które zdanie jest zaprzeczeniem zdania „Jeśli ${p}, to ${qq}”?`,
      "Zaprzeczenie", m.opcje, m.ind, `${p} i ${nq}`,
      [
        "Implikacja „jeśli $p$, to $q$” jest fałszywa tylko wtedy, gdy $p$ jest prawdziwe, a $q$ fałszywe.",
        `Zaprzeczeniem implikacji jest więc zdanie „$p$ i nie $q$”. Tu $p$ to ${p}, a nie $q$ to ${nq}.`,
        `Zaprzeczenie: ${p} i ${nq}.`,
      ],
    );
  }
}

function lgPierwsza(n) {
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return n > 1;
}

/** Zdanie proste o konkretnych liczbach: { t – tekst, v – wartość logiczna }. */
function lgAtom(r) {
  const k = r.int(0, 4);
  if (k === 0) {
    const n = r.int(2, 40);
    return { t: `$${n}$ jest liczbą parzystą`, v: n % 2 === 0 };
  }
  if (k === 1) {
    const n = r.int(5, 40);
    return { t: `$${n}$ jest liczbą pierwszą`, v: lgPierwsza(n) };
  }
  if (k === 2) {
    const d = r.pick([3, 4, 6, 7, 9]);
    const n = r.int(10, 80);
    return { t: `$${n}$ dzieli się przez $${d}$`, v: n % d === 0 };
  }
  if (k === 3) {
    const a = r.int(3, 15);
    const b = r.int(3, 15);
    const c = a + b + (r.chance(0.5) ? 0 : r.pick([-2, -1, 1, 2, 10]));
    return { t: `$${a} + ${b} = ${c}$`, v: a + b === c };
  }
  const a = r.int(3, 9);
  const b = r.int(3, 9);
  const c = a * b + (r.chance(0.5) ? 0 : r.pick([-3, -1, 1, 2, 6]));
  return { t: `$${a} \\cdot ${b} = ${c}$`, v: a * b === c };
}

const PW = (v) => (v ? "prawdziwe" : "fałszywe");

const SPOJNIKI = [
  { zdanie: (p, qq) => `${p} i ${qq}`, f: (p, qq) => p && qq, regula: "Zdanie z „i” jest prawdziwe tylko wtedy, gdy oba zdania składowe są prawdziwe." },
  { zdanie: (p, qq) => `${p} lub ${qq}`, f: (p, qq) => p || qq, regula: "Zdanie z „lub” jest fałszywe tylko wtedy, gdy oba zdania składowe są fałszywe." },
  { zdanie: (p, qq) => `Jeśli ${p}, to ${qq}`, f: (p, qq) => !p || qq, regula: "Implikacja jest fałszywa tylko wtedy, gdy poprzednik jest prawdziwy, a następnik fałszywy." },
  { zdanie: (p, qq) => `${p} wtedy i tylko wtedy, gdy ${qq}`, f: (p, qq) => p === qq, regula: "Równoważność jest prawdziwa wtedy, gdy oba zdania składowe mają taką samą wartość logiczną." },
];

// Zdania złożone z dwóch zdań p, q i liczba układów wartości (z czterech), dla których są prawdziwe.
const FORMULY_LOGIKI = [
  { tex: "(p \\Rightarrow q) \\land p", f: (p, qq) => (!p || qq) && p },
  { tex: "p \\lor \\neg q", f: (p, qq) => p || !qq },
  { tex: "\\neg(p \\land q)", f: (p, qq) => !(p && qq) },
  { tex: "(p \\lor q) \\Rightarrow p", f: (p, qq) => !(p || qq) || p },
  { tex: "p \\Leftrightarrow \\neg q", f: (p, qq) => p === !qq },
  { tex: "\\neg p \\Rightarrow (p \\land q)", f: (p, qq) => p || (p && qq) },
  { tex: "(p \\land q) \\lor \\neg p", f: (p, qq) => (p && qq) || !p },
  { tex: "\\neg(p \\Rightarrow q)", f: (p, qq) => !(!p || qq) },
  { tex: "(p \\Rightarrow q) \\Leftrightarrow (\\neg p \\lor q)", f: (p, qq) => (!p || qq) === (!p || qq) },
  { tex: "(p \\land \\neg q) \\lor (\\neg p \\land q)", f: (p, qq) => (p && !qq) || (!p && qq) },
  { tex: "(p \\lor q) \\land \\neg(p \\land q)", f: (p, qq) => (p || qq) && !(p && qq) },
  { tex: "p \\Rightarrow (q \\Rightarrow p)", f: (p, qq) => !p || !qq || p },
];

/** Wartość logiczna zdania złożonego, liczba prawdziwych wierszy tabelki albo kontrprzykład. */
function lgWartosc(r) {
  const rodzaj = zWagami(r, [[0.4, 0], [0.3, 1], [0.3, 2]]);
  if (rodzaj === 0) {
    for (;;) {
      const p = lgAtom(r);
      const qq = lgAtom(r);
      if (p.t === qq.t) continue;
      const sp = r.pick(SPOJNIKI);
      const v = sp.f(p.v, qq.v);
      return zadanieWybor(
        `Oceń wartość logiczną zdania: „${sp.zdanie(p.t, qq.t)}”.`,
        "To zdanie jest", ["prawdziwe", "fałszywe"], v ? 0 : 1, `To zdanie jest ${PW(v)}.`,
        [
          `Zdanie „${p.t}” jest ${PW(p.v)}.`,
          `Zdanie „${qq.t}” jest ${PW(qq.v)}.`,
          `${sp.regula} Zatem całe zdanie jest ${PW(v)}.`,
        ],
      );
    }
  }
  if (rodzaj === 1) {
    const fo = r.pick(FORMULY_LOGIKI);
    const uklady = [[1, 1], [1, 0], [0, 1], [0, 0]];
    const wartosci = uklady.map(([p, qq]) => (fo.f(Boolean(p), Boolean(qq)) ? 1 : 0));
    const ile = wartosci.reduce((s, x) => s + x, 0);
    const wiersze = uklady.map(([p, qq], i) => `${p} & ${qq} & ${wartosci[i]}`).join(" \\\\ ");
    return {
      tresc: `Zdanie złożone ma postać $${fo.tex}$. Dla ilu spośród czterech układów wartości logicznych zdań $p$ i $q$ jest ono prawdziwe?`,
      pola: [poleLiczba("w", "Liczba układów")],
      odpowiedz: { w: ile },
      wynik: `$${ile}$`,
      rozwiazanie: [
        "Wypisujemy wszystkie układy wartości $p$ i $q$ ($1$ – prawda, $0$ – fałsz) i liczymy wartość zdania w każdym wierszu.",
        `$\\begin{array}{cc|c} p & q & W \\\\ \\hline ${wiersze} \\end{array}$`,
        `W kolumnie $W$ ${odmiana(ile, ["jest", "są", "jest"])} ${zRzecz(ile, ["jedynka", "jedynki", "jedynek"])}, więc zdanie jest prawdziwe dla ${zRzecz(ile, ["układu", "układów", "układów"])}.`,
      ],
    };
  }
  for (;;) {
    const [a, b] = r.pick([[2, 3], [2, 4], [3, 4], [2, 5], [3, 6], [4, 6], [6, 9], [6, 10], [4, 10], [6, 8], [10, 15], [8, 12], [9, 12]]);
    const c = r.pick([4, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24, 30]);
    const L = nww(a, b);
    const kandydaci = [];
    for (let n = 10; n <= 99; n++) if (n % L === 0) kandydaci.push(n);
    const kontr = kandydaci.find((n) => n % c !== 0);
    if (kontr === undefined) continue;
    const sprawdzane = kandydaci.slice(0, kandydaci.indexOf(kontr) + 1);
    return {
      tresc: `Dane jest zdanie: „Jeśli liczba dwucyfrowa dzieli się przez $${a}$ i przez $${b}$, to dzieli się przez $${c}$”. Podaj najmniejszą liczbę dwucyfrową, która jest kontrprzykładem dla tego zdania.`,
      pola: [poleLiczba("w", "Kontrprzykład")],
      odpowiedz: { w: kontr },
      wynik: `$${kontr}$`,
      rozwiazanie: [
        `Kontrprzykład to liczba, która dzieli się przez $${a}$ i przez $${b}$, ale nie dzieli się przez $${c}$.`,
        `Liczba dzieli się przez $${a}$ i przez $${b}$ wtedy i tylko wtedy, gdy dzieli się przez ich NWW, czyli przez $${L}$.`,
        `Sprawdzamy kolejne dwucyfrowe wielokrotności $${L}$: ${sprawdzane.map((n) => `$${n}$ ${n % c === 0 ? "dzieli się" : "nie dzieli się"} przez $${c}$`).join(", ")}.`,
        `Najmniejszym kontrprzykładem jest $${kontr}$.`,
      ],
    };
  }
}

// --- Potęgi

// Podstawy będące potęgami liczby pierwszej p: [podstawa, e], gdzie podstawa = p^e.
const PODSTAWY = {
  2: [[4, 2], [8, 3], [16, 4], [32, 5], [q(1, 2), -1], [q(1, 4), -2], [q(1, 8), -3], [q(1, 16), -4]],
  3: [[9, 2], [27, 3], [81, 4], [q(1, 3), -1], [q(1, 9), -2], [q(1, 27), -3]],
  5: [[25, 2], [125, 3], [q(1, 5), -1], [q(1, 25), -2]],
};

/** Treść "zapisz w postaci p^k" – trzy wersje. */
function trescWykladnik(r, wyr, p) {
  return r.pick([
    `Liczbę $${wyr}$ można zapisać w postaci $${p}^{k}$, gdzie $k$ jest liczbą całkowitą. Oblicz $k$.`,
    `Liczba $${wyr}$ jest równa $${p}^{k}$. Wyznacz liczbę całkowitą $k$.`,
    `Zapisz liczbę $${wyr}$ w postaci potęgi $${p}^{k}$ i podaj wykładnik $k$.`,
  ]);
}

/** (1/16)^8 · 8^16 = 2^16: iloczyn lub iloraz potęg o podstawach będących potęgami tej samej liczby. */
function potegiIloczyn(r) {
  const p = r.pick([2, 2, 3, 5]);
  for (;;) {
    const ile = r.chance(0.6) ? 2 : 3;
    const iloraz = ile === 3 ? r.chance(0.7) : r.chance(0.25);   // ostatni czynnik idzie do mianownika
    const czynniki = r.shuffle(PODSTAWY[p]).slice(0, ile).map(([b, e]) => ({ b, e, m: r.int(2, p === 5 ? 6 : 10) }));
    const mian = iloraz ? czynniki[ile - 1] : null;
    if (mian && mian.e < 0) continue;   // w mianowniku tylko podstawa całkowita
    for (const c of czynniki) if (c !== mian && c.e > 0 && r.chance(0.2)) c.m = -c.m;   // czasem ujemny wykładnik
    const wyk = czynniki.map((c) => (c === mian ? -1 : 1) * c.e * c.m);
    const k = wyk.reduce((s, x) => s + x, 0);
    if (Math.abs(k) < 2 || Math.abs(k) > 60) continue;

    const sklej = (t) => (iloraz ? `\\frac{${t.slice(0, -1).join(" \\cdot ")}}{${t[ile - 1]}}` : t.join(" \\cdot "));
    const wyr = sklej(czynniki.map((c) => potegaTex(c.b, c.m)));
    const doP = sklej(czynniki.map((c) => `\\left(${p}^{${c.e}}\\right)^{${c.m}}`));
    const poP = sklej(czynniki.map((c) => `${p}^{${c.e * c.m}}`));
    const regula = iloraz
      ? "Przy mnożeniu potęg o tej samej podstawie wykładniki dodajemy, a przy dzieleniu odejmujemy"
      : "Przy mnożeniu potęg o tej samej podstawie wykładniki dodajemy";
    return {
      tresc: trescWykladnik(r, wyr, p),
      pola: [poleLiczba("k", "$k =$")],
      odpowiedz: { k },
      wynik: `$k = ${k}$`,
      rozwiazanie: [
        `Zapisz podstawy jako potęgi liczby $${p}$: ${czynniki.map((c) => `$${tex(c.b)} = ${p}^{${c.e}}$`).join(", ")}.`,
        `$${wyr} = ${doP} = ${poP}$`,
        `${regula}: $${p}^{${sumaTex(wyk)}} = ${p}^{${k}}$, więc $k = ${k}$.`,
      ],
    };
  }
}

// Ilorazy sum potęg a^(n+o): l – licznik, m – mianownik, składniki [znak, o].
const SUMY_POTEG = [
  { l: [[1, 0], [1, 1], [1, 2]], m: [[1, 0]] },
  { l: [[1, 0], [1, 1], [1, 2]], m: [[1, -1]] },
  { l: [[1, 0], [1, 1]], m: [[1, -1]] },
  { l: [[1, 2], [-1, 0]], m: [[1, 0]] },
  { l: [[1, 1], [1, 0]], m: [[1, 1], [-1, 0]] },
  { l: [[1, 2], [-1, 0]], m: [[1, 1], [1, 0]] },
  { l: [[1, 2], [-1, 0]], m: [[1, 1], [-1, 0]] },
];

/** (5^12 + 5^13 + 5^14) / 5^12 = 31: iloraz sum potęg tej samej liczby. */
function potegiSuma(r) {
  const { l, m } = r.pick(SUMY_POTEG);
  const a = r.pick([2, 3, 4, 5, 6, 7, 10]);
  const n = r.int(8, 25);
  const wartoscSumy = (s) => s.reduce((acc, [z, o]) => acc.add(q(a).pow(o).mul(z)), q(0));
  const N = wartoscSumy(l);
  const D = wartoscSumy(m);
  const wartosc = N.div(D);
  const znak = (z, i) => (i === 0 ? (z < 0 ? "-" : "") : z < 0 ? " - " : " + ");
  const sumaPoteg = (s) => s.map(([z, o], i) => `${znak(z, i)}${a}^{${n + o}}`).join("");
  const wNawiasie = (s) => s.map(([z, o], i) => `${znak(z, i)}${o === 0 ? 1 : o === 1 ? a : `${a}^{${o}}`}`).join("");
  const wyr = `\\frac{${sumaPoteg(l)}}{${sumaPoteg(m)}}`;
  const licznik = `${a}^{${n}} \\cdot ${tex(N)}`;

  const kroki = [`W liczniku wyłącz przed nawias $${a}^{${n}}$: $${sumaPoteg(l)} = ${a}^{${n}}(${wNawiasie(l)}) = ${licznik}$.`];
  if (m.length === 1) {
    const o = m[0][1];
    kroki.push(o === 0
      ? `$W = \\frac{${licznik}}{${a}^{${n}}} = ${tex(wartosc)}$`
      : `$W = \\frac{${licznik}}{${a}^{${n + o}}} = ${a} \\cdot ${tex(N)} = ${tex(wartosc)}$`);
  } else {
    kroki.push(`W mianowniku też wyłącz $${a}^{${n}}$: $${sumaPoteg(m)} = ${a}^{${n}}(${wNawiasie(m)}) = ${a}^{${n}} \\cdot ${tex(D)}$.`);
    const ulamek = D.eq(1) ? tex(N) : `\\frac{${tex(N)}}{${tex(D)}}`;
    const koniec = ulamek === tex(wartosc) ? "" : ` = ${tex(wartosc)}`;
    kroki.push(`$W = \\frac{${licznik}}{${a}^{${n}} \\cdot ${tex(D)}} = ${ulamek}${koniec}$`);
  }
  return {
    tresc: r.pick([
      `Oblicz wartość wyrażenia $W = ${wyr}$.`,
      `Oblicz $W$, jeżeli $W = ${wyr}$.`,
      `Wyznacz wartość liczby $W = ${wyr}$.`,
    ]),
    pola: [poleLiczba("w", "$W =$")],
    odpowiedz: { w: wartosc },
    wynik: `$W = ${tex(wartosc)}$`,
    rozwiazanie: kroki,
  };
}

// Sumy jednakowych potęg: [p, b, j, możliwe liczby składników], gdzie b = p^j.
const SUMY_JEDNAKOWYCH = [
  [2, 2, 1, [2, 4]], [2, 4, 2, [2, 4]], [2, 8, 3, [2, 4]],
  [3, 3, 1, [3]], [3, 9, 2, [3]], [3, 27, 3, [3]],
  [5, 5, 1, [5]], [5, 25, 2, [5]],
];
const ILE_SKLADNIKOW = { 2: "dwa jednakowe składniki", 3: "trzy jednakowe składniki", 4: "cztery jednakowe składniki", 5: "pięć jednakowych składników" };

/** 3^20 + 3^20 + 3^20 = 3^21: suma jednakowych potęg jako jedna potęga liczby p. */
function potegiJednakowe(r) {
  const [p, b, j, ile] = r.pick(SUMY_JEDNAKOWYCH);
  const t = r.pick(ile);
  const n = r.int(4, p === 5 ? 12 : 20);
  const wt = t === p ? 1 : 2;   // t = p^wt
  const k = j * n + wt;
  const wyr = Array(t).fill(`${b}^{${n}}`).join(" + ");
  const kroki = [];
  if (b !== p) kroki.push(`$${b}^{${n}} = \\left(${p}^{${j}}\\right)^{${n}} = ${p}^{${j * n}}$`);
  const posrednio = t === p ? "" : ` = ${p}^{${wt}} \\cdot ${p}^{${j * n}}`;
  kroki.push(`Dodajemy ${ILE_SKLADNIKOW[t]}: $${wyr} = ${t} \\cdot ${p}^{${j * n}}${posrednio} = ${p}^{${k}}$.`);
  kroki.push(`Zatem $k = ${k}$.`);
  return {
    tresc: trescWykladnik(r, wyr, p),
    pola: [poleLiczba("k", "$k =$")],
    odpowiedz: { k },
    wynik: `$k = ${k}$`,
    rozwiazanie: kroki,
  };
}

// --- Pierwiastki

/** c·√m w LaTeX: pierw(1, 2) -> "\sqrt{2}", pierw(-3, 2) -> "-3\sqrt{2}". */
function pierw(c, m) {
  const s = `\\sqrt{${m}}`;
  return c === 1 ? s : c === -1 ? `-${s}` : `${c}${s}`;
}

/** Zadanie "oblicz wartość wyrażenia" z jednym polem (trzy wersje treści). */
function zadanieWartosc(r, wyr, wartosc, rozwiazanie) {
  return {
    tresc: r.pick([`Oblicz wartość wyrażenia $${wyr}$.`, `Oblicz $${wyr}$.`, `Wyznacz wartość wyrażenia $${wyr}$.`]),
    pola: [poleLiczba("w", "Wartość wyrażenia")],
    odpowiedz: { w: wartosc },
    wynik: `$${wyr} = ${tex(wartosc)}$`,
    rozwiazanie,
  };
}

/** (√32 − √2)² = 18: kwadrat sumy lub różnicy pierwiastków po wyłączeniu czynnika przed pierwiastek. */
function pierwKwadrat(r) {
  const m = r.pick([2, 3, 5, 6, 7]);
  let a, b;
  do {
    a = r.int(1, 6);
    b = r.int(1, 6);
  } while (a === b || a * a * m > 300 || b * b * m > 300);
  const minus = r.chance(0.65);
  const z = minus ? "-" : "+";
  const c = minus ? a - b : a + b;
  const wartosc = c * c * m;
  const wyr = `(\\sqrt{${a * a * m}} ${z} \\sqrt{${b * b * m}})^{2}`;
  const wylacz = [a, b].filter((x) => x > 1).map((x) => `$\\sqrt{${x * x * m}} = \\sqrt{${x * x} \\cdot ${m}} = ${pierw(x, m)}$`);
  const kwadrat = Math.abs(c) === 1 ? `${wartosc}` : `${c * c} \\cdot ${m} = ${wartosc}`;
  return zadanieWartosc(r, wyr, wartosc, [
    `Wyłącz czynnik przed znak pierwiastka: ${wylacz.join(", ")}.`,
    `$${wyr} = (${pierw(a, m)} ${z} ${pierw(b, m)})^{2} = (${pierw(c, m)})^{2} = ${kwadrat}$`,
  ]);
}

/** (2√3 − √5)(2√3 + √5) = 7: iloczyn różnicy i sumy (wzór skróconego mnożenia). */
function pierwSprzezenie(r) {
  for (;;) {
    const c = r.pick([1, 1, 2, 3]);
    const m = r.pick([2, 3, 5, 6, 7, 10, 11]);
    let drugi, drugiKw, kw;
    if (r.chance(0.55)) {
      const d = r.int(1, 6);
      [drugi, drugiKw, kw] = [String(d), `${d}^{2}`, d * d];
    } else {
      const e = r.pick([1, 1, 2]);
      const n = r.pick([2, 3, 5, 6, 7].filter((x) => x !== m));
      [drugi, drugiKw, kw] = [pierw(e, n), `(${pierw(e, n)})^{2}`, e * e * n];
    }
    const wartosc = c * c * m - kw;
    if (wartosc === 0) continue;
    const pierwszy = pierw(c, m);
    const roznica = `(${pierwszy} - ${drugi})`;
    const suma = `(${pierwszy} + ${drugi})`;
    const wyr = r.chance(0.5) ? roznica + suma : suma + roznica;
    return zadanieWartosc(r, wyr, wartosc, [
      "Skorzystaj ze wzoru $(a - b)(a + b) = a^{2} - b^{2}$.",
      `$${wyr} = (${pierwszy})^{2} - ${drugiKw} = ${c * c * m} - ${kw} = ${wartosc}$`,
    ]);
  }
}

// Potęgi o wykładniku ujemnym lub wymiernym: [zapis, wartość, obliczenie].
const POTEGI_PROSTE = [
  ["2^{-1}", q(1, 2), "2^{-1} = \\frac{1}{2}"],
  ["2^{-2}", q(1, 4), "2^{-2} = \\frac{1}{2^{2}} = \\frac{1}{4}"],
  ["3^{-1}", q(1, 3), "3^{-1} = \\frac{1}{3}"],
  ["4^{-1}", q(1, 4), "4^{-1} = \\frac{1}{4}"],
  ["\\left(\\frac{1}{2}\\right)^{-1}", q(2), "\\left(\\frac{1}{2}\\right)^{-1} = 2"],
  ["\\left(\\frac{1}{2}\\right)^{-2}", q(4), "\\left(\\frac{1}{2}\\right)^{-2} = 2^{2} = 4"],
  ["\\left(\\frac{1}{3}\\right)^{-2}", q(9), "\\left(\\frac{1}{3}\\right)^{-2} = 3^{2} = 9"],
  ["\\left(\\frac{2}{3}\\right)^{-1}", q(3, 2), "\\left(\\frac{2}{3}\\right)^{-1} = \\frac{3}{2}"],
  ["8^{\\frac{1}{3}}", q(2), "8^{\\frac{1}{3}} = \\sqrt[3]{8} = 2"],
  ["27^{\\frac{1}{3}}", q(3), "27^{\\frac{1}{3}} = \\sqrt[3]{27} = 3"],
  ["16^{\\frac{1}{2}}", q(4), "16^{\\frac{1}{2}} = \\sqrt{16} = 4"],
  ["8^{\\frac{2}{3}}", q(4), "8^{\\frac{2}{3}} = \\left(\\sqrt[3]{8}\\right)^{2} = 2^{2} = 4"],
  ["4^{\\frac{3}{2}}", q(8), "4^{\\frac{3}{2}} = \\left(\\sqrt{4}\\right)^{3} = 2^{3} = 8"],
  ["9^{-\\frac{1}{2}}", q(1, 3), "9^{-\\frac{1}{2}} = \\frac{1}{\\sqrt{9}} = \\frac{1}{3}"],
  ["8^{-\\frac{1}{3}}", q(1, 2), "8^{-\\frac{1}{3}} = \\frac{1}{\\sqrt[3]{8}} = \\frac{1}{2}"],
];

/** √(25/8)·√2 + 2^(−1) = 3: iloczyn (iloraz) pierwiastków dający liczbę wymierną i prosta potęga. */
function pierwIloczyn(r) {
  for (;;) {
    const t = zWagami(r, [[0.45, 1], [0.35, 2], [0.2, 3]]);
    const s = t === 1 ? r.int(2, 9) : r.int(1, 9);
    if (nwd(s, t) !== 1) continue;
    const R = q(s, t);   // wartość iloczynu pierwiastków
    const Y = r.pick([2, 3, 5, 6, 7, 10]);
    const iloraz = t === 1 && r.chance(0.4);
    const X = iloraz ? R.mul(R).mul(Y) : R.mul(R).div(Y);
    if (X.eq(Y) || X.n > 300 || X.d > 100) continue;
    const plus = r.chance(0.65);
    const policz = (w) => (plus ? R.add(w) : R.sub(w));
    const calkowite = POTEGI_PROSTE.filter(([, w]) => policz(w).calkowita && !policz(w).zero);
    const [potTex, w, potObl] = calkowite.length && r.chance(0.6) ? r.pick(calkowite) : r.pick(POTEGI_PROSTE);
    const wartosc = policz(w);
    if (wartosc.zero) continue;
    const odwrotnie = !iloraz && r.chance(0.5);
    const pierwiastki = iloraz
      ? `\\frac{\\sqrt{${tex(X)}}}{\\sqrt{${Y}}}`
      : odwrotnie ? `\\sqrt{${Y}} \\cdot \\sqrt{${tex(X)}}` : `\\sqrt{${tex(X)}} \\cdot \\sqrt{${Y}}`;
    const pod = iloraz ? `\\frac{${tex(X)}}{${Y}}` : odwrotnie ? `${Y} \\cdot ${tex(X)}` : `${tex(X)} \\cdot ${Y}`;
    const z = plus ? "+" : "-";
    return zadanieWartosc(r, `${pierwiastki} ${z} ${potTex}`, wartosc, [
      `$${pierwiastki} = \\sqrt{${pod}} = \\sqrt{${tex(R.mul(R))}} = ${tex(R)}$`,
      `$${potObl}$`,
      `$${tex(R)} ${z} ${tex(w)} = ${tex(wartosc)}$`,
    ]);
  }
}

/** (3 − √2)² + 6√2 = 11: kwadrat dwumianu, wyrazy z pierwiastkiem się redukują. */
function pierwDwumian(r) {
  const c = r.pick([1, 1, 2, 3]);
  const m = r.pick([2, 3, 5, 6, 7]);
  const a = r.int(1, 5);
  const minus = r.chance(0.6);
  const z = minus ? "-" : "+";
  const liczbaNajpierw = r.chance(0.5);
  const kw = liczbaNajpierw ? `(${a} ${z} ${pierw(c, m)})^{2}` : `(${pierw(c, m)} ${z} ${a})^{2}`;
  const srodek = pierw(2 * a * c, m);
  const zKomp = minus ? "+" : "-";   // wyraz znoszący środkowy wyraz rozwinięcia
  const wyr = r.chance(0.7) ? `${kw} ${zKomp} ${srodek}` : `${minus ? "" : "-"}${srodek} + ${kw}`;
  const wartosc = a * a + c * c * m;
  const rozwiniecie = liczbaNajpierw ? `${a * a} ${z} ${srodek} + ${c * c * m}` : `${c * c * m} ${z} ${srodek} + ${a * a}`;
  return zadanieWartosc(r, wyr, wartosc, [
    `Ze wzoru na kwadrat ${minus ? "różnicy" : "sumy"}: $${kw} = ${rozwiniecie} = ${wartosc} ${z} ${srodek}$.`,
    `Wyrazy z pierwiastkiem się redukują: $${wartosc} ${z} ${srodek} ${zKomp} ${srodek} = ${wartosc}$.`,
  ]);
}

// --- Logarytmy

const logTex = (a, x) => `\\log_{${a}} ${x}`;

/** Ostatni krok: log_a P = k, bo a^k = P. */
function koniecLog(a, k, P) {
  if (k.eq(1)) return `$${logTex(a, tex(P))} = 1$`;
  return `$${logTex(a, tex(P))} = ${tex(k)}$, bo $${potegaTex(a, k)} = ${tex(P)}$.`;
}

/** log₆4 + log₆9 = 2, log₂24 − log₂3 = 3: iloczyn (iloraz) liczb logarytmowanych jest potęgą podstawy. */
function logIloczyn(r) {
  for (;;) {
    const a = r.pick([2, 3, 5, 6, 6, 10, 12, 15, 20]);
    const k = r.pick([1, 2, 2, 3]);
    const ak = a ** k;
    if (ak > 1000) continue;
    const zwykla = (x) => Number.isInteger(x) && x > 1 && !jestPotega(x, a);
    const rodzaj = zWagami(r, [[0.45, "suma"], [0.35, "roznica"], [0.2, "trzy"]]);
    let skladniki, arg, wk = k;
    if (rodzaj === "suma") {
      const dzielniki = [];
      for (let x = 2; x < ak; x++) if (ak % x === 0 && zwykla(x) && zwykla(ak / x) && x !== ak / x) dzielniki.push(x);
      if (!dzielniki.length) continue;
      const x = r.pick(dzielniki);
      skladniki = [[1, x], [1, ak / x]];
      arg = `(${x} \\cdot ${ak / x})`;
    } else if (rodzaj === "roznica") {
      const y = r.int(2, 12);
      if (!zwykla(y) || y * ak > 1000) continue;
      if (r.chance(0.7)) skladniki = [[1, y * ak], [-1, y]];
      else [skladniki, wk] = [[[1, y], [-1, y * ak]], -k];
      arg = `\\frac{${skladniki[0][1]}}{${skladniki[1][1]}}`;
    } else {
      const x = r.int(2, 20);
      const y = r.int(2, 20);
      const z = (x * y) / ak;
      if (!zwykla(x) || !zwykla(y) || !zwykla(z) || x === y || z === x || z === y) continue;
      skladniki = [[1, x], [1, y], [-1, z]];
      arg = `\\frac{${x} \\cdot ${y}}{${z}}`;
    }
    const wyr = skladniki.map(([s, x], i) => `${i === 0 ? "" : s < 0 ? " - " : " + "}${logTex(a, x)}`).join("");
    const P = skladniki.reduce((acc, [s, x]) => (s > 0 ? acc.mul(x) : acc.div(x)), q(1));
    const regula = {
      suma: "Suma logarytmów o tej samej podstawie jest logarytmem iloczynu",
      roznica: "Różnica logarytmów o tej samej podstawie jest logarytmem ilorazu",
      trzy: "Zamień sumę i różnicę logarytmów na logarytm jednej liczby",
    }[rodzaj];
    return zadanieWartosc(r, wyr, q(wk), [
      `${regula}: $${wyr} = ${logTex(a, arg)} = ${logTex(a, tex(P))}$.`,
      koniecLog(a, q(wk), P),
    ]);
  }
}

/** log₉27 + log₉3 = 2, log₈4 − log₈32 = −1: podstawa i liczby są potęgami tej samej liczby pierwszej. */
function logPotegi(r) {
  for (;;) {
    const [p, i] = r.pick([[2, 2], [2, 3], [2, 4], [3, 2], [3, 3], [5, 2]]);
    const a = p ** i;
    const roznica = r.chance(0.4);
    const k = roznica ? r.pick([-2, -1, -1, 1, 2]) : r.pick([1, 2, 2, 3]);
    const u = r.int(1, 7);
    const v = roznica ? u - i * k : i * k - u;
    if (v < 1 || u === v || u % i === 0 || v % i === 0 || p ** u > 1024 || p ** v > 1024) continue;
    const [x, y] = [p ** u, p ** v];
    const wyr = `${logTex(a, x)} ${roznica ? "-" : "+"} ${logTex(a, y)}`;
    const arg = roznica ? `\\frac{${x}}{${y}}` : `(${x} \\cdot ${y})`;
    const P = roznica ? q(x, y) : q(x * y);
    const regula = roznica
      ? "Różnica logarytmów o tej samej podstawie jest logarytmem ilorazu"
      : "Suma logarytmów o tej samej podstawie jest logarytmem iloczynu";
    return zadanieWartosc(r, wyr, q(k), [
      `${regula}: $${wyr} = ${logTex(a, arg)} = ${logTex(a, tex(P))}$.`,
      koniecLog(a, q(k), P),
    ]);
  }
}

/** log₃108 − 2·log₃2 = 3: logarytm ze współczynnikiem, n·log_a b = log_a b^n. */
function logWspolczynnik(r) {
  for (;;) {
    const a = r.pick([2, 3, 5, 6, 10]);
    const c = r.pick([2, 2, 3]);
    const y = r.int(2, 7);
    const k = r.pick([1, 2, 3]);
    if (jestPotega(y, a)) continue;
    const yc = y ** c;
    const ak = a ** k;
    const forma = r.int(0, 2);
    let x, wyr, krok;
    if (forma === 0) {          // log_a x − c·log_a y, gdzie x = a^k · y^c
      x = ak * yc;
      if (x > 2000) continue;
      wyr = `${logTex(a, x)} - ${c} \\cdot ${logTex(a, y)}`;
      krok = `$${logTex(a, x)} - ${logTex(a, yc)} = ${logTex(a, `\\frac{${x}}{${yc}}`)} = ${logTex(a, ak)}$`;
    } else if (forma === 1) {   // c·log_a y + log_a x, gdzie x = a^k / y^c
      if (ak % yc !== 0) continue;
      x = ak / yc;
      if (x < 2 || jestPotega(x, a)) continue;
      wyr = `${c} \\cdot ${logTex(a, y)} + ${logTex(a, x)}`;
      krok = `$${logTex(a, yc)} + ${logTex(a, x)} = ${logTex(a, `(${yc} \\cdot ${x})`)} = ${logTex(a, ak)}$`;
    } else {                    // c·log_a y − log_a x, gdzie x = y^c / a^k
      if (yc % ak !== 0) continue;
      x = yc / ak;
      if (x < 2 || jestPotega(x, a)) continue;
      wyr = `${c} \\cdot ${logTex(a, y)} - ${logTex(a, x)}`;
      krok = `$${logTex(a, yc)} - ${logTex(a, x)} = ${logTex(a, `\\frac{${yc}}{${x}}`)} = ${logTex(a, ak)}$`;
    }
    return zadanieWartosc(r, wyr, q(k), [
      `Skorzystaj ze wzoru $n \\cdot \\log_{a} b = \\log_{a} b^{n}$: $${c} \\cdot ${logTex(a, y)} = ${logTex(a, `${y}^{${c}}`)} = ${logTex(a, yc)}$.`,
      krok,
      koniecLog(a, q(k), q(ak)),
    ]);
  }
}

// Podstawy p^α do logarytmów "szczególnych": [α, zapis podstawy].
const PODSTAWY_LOG = [
  [q(1, 2), (p) => `\\sqrt{${p}}`],
  [q(-1), (p) => `\\frac{1}{${p}}`],
  [q(2), (p) => `${p * p}`],
  [q(-2), (p) => `\\frac{1}{${p * p}}`],
];

/** p^β w LaTeX dla β całkowitego lub połówkowego: 9, \frac{1}{8}, \sqrt{3}, 3\sqrt{3}. */
function potegaPTex(p, beta) {
  if (beta.calkowita) return beta.ujemna ? `\\frac{1}{${p ** -beta.n}}` : `${p ** beta.n}`;
  const c = (Math.abs(beta.n) - 1) / 2;   // p^(c + 1/2) = p^c · √p
  const t = c === 0 ? `\\sqrt{${p}}` : `${p ** c}\\sqrt{${p}}`;
  return beta.ujemna ? `\\frac{1}{${t}}` : t;
}

/** α·x w wykładniku: "\frac{1}{2}x", "-x", "2x", "-2x". */
const razyX = (alfa) => (alfa.eq(-1) ? "-x" : `${alfa.tex()}x`);

/** log_{√3} 9 = 4, log_{1/2} 8 = −3: podstawa lub liczba logarytmowana jest pierwiastkiem albo ułamkiem. */
function logSzczegolny(r) {
  for (;;) {
    const p = r.pick([2, 3, 5]);
    const [alfa, zapisPodstawy] = r.pick(PODSTAWY_LOG);
    const beta = r.chance(0.7) ? q(r.intBez(-4, 6, 0, 1)) : q(r.pick([-3, -1, 1, 3, 5]), 2);
    if (p ** Math.ceil(Math.abs(beta.valueOf())) > 729) continue;
    if (alfa.n > 0 && alfa.calkowita && beta.calkowita && beta.n > 0 && beta.n % alfa.n === 0) continue;   // np. log₉81 – za proste
    const wartosc = beta.div(alfa);
    if (wartosc.eq(1) || wartosc.eq(-1)) continue;
    const podstawa = zapisPodstawy(p);
    const liczba = potegaPTex(p, beta);
    const podstawaX = alfa.eq(2) ? `${podstawa}^{x}` : `\\left(${podstawa}\\right)^{x}`;
    const wyr = logTex(podstawa, liczba);
    return zadanieWartosc(r, wyr, wartosc, [
      `Szukamy liczby $x$, dla której $${podstawaX} = ${liczba}$.`,
      `Zapisz obie liczby jako potęgi liczby $${p}$: $${podstawa} = ${p}^{${alfa.tex()}}$ oraz $${liczba} = ${p}^{${beta.tex()}}$, więc $${p}^{${razyX(alfa)}} = ${p}^{${beta.tex()}}$.`,
      `Stąd $${razyX(alfa)} = ${beta.tex()}$, czyli $x = ${wartosc.tex()}$.`,
    ]);
  }
}

// --- Procenty

const OSOBY = [["Pan Adam", true], ["Pani Ewa", false], ["Pan Marek", true], ["Pani Anna", false], ["Pan Tomasz", true], ["Pani Joanna", false]];

/** Lokata dwuletnia z roczną kapitalizacją (CKE 2026): odsetki, stan lokaty, wpłata albo oprocentowanie. */
function procLokata(r) {
  let K, p, c, K1, K2;
  do {
    K = r.pick([5000, 8000, 10000, 10000, 12000, 15000, 20000, 25000, 40000, 50000]);
    p = r.pick([q(2), q(3), q(4), q(5), q(6), q(8), q(10), q(5, 2)]);
    c = q(1).add(p.div(100));
    K1 = c.mul(K);
    K2 = K1.mul(c);
  } while (!K1.calkowita || !K2.calkowita);
  const c2 = c.mul(c);
  const [osoba, pan] = r.pick(OSOBY);
  const wplacil = pan ? "wpłacił" : "wpłaciła";
  const pTxt = `${dziesietnie(p, false)}%`;
  const zasady = "Odsetki są doliczane do kapitału po każdym roku. Pomijamy podatki.";
  const lata = [
    `Po pierwszym roku: $${dz(K)} \\cdot ${dz(c)} = ${dz(K1)}$ zł.`,
    `Po drugim roku: $${dz(K1)} \\cdot ${dz(c)} = ${dz(K2)}$ zł.`,
  ];
  const zadanie = (tresc, etykieta, wartosc, wynik, rozwiazanie) =>
    ({ tresc, pola: [poleLiczba("w", etykieta)], odpowiedz: { w: wartosc }, wynik, rozwiazanie });

  switch (r.int(0, 3)) {
    case 0: {
      const O = K2.sub(K);
      return zadanie(
        `${osoba} ${wplacil} ${kwota(K)} zł na dwuletnią lokatę oprocentowaną ${pTxt} w skali roku. ${zasady} Oblicz łączną kwotę odsetek po dwóch latach.`,
        "Odsetki (zł)", O, `$${dz(O)}$ zł`,
        [...lata, `Odsetki: $${dz(K2)} - ${dz(K)} = ${dz(O)}$ zł.`]);
    }
    case 1:
      return zadanie(
        `${osoba} ${wplacil} ${kwota(K)} zł na dwuletnią lokatę oprocentowaną ${pTxt} w skali roku. ${zasady} Oblicz, ile złotych będzie na lokacie po dwóch latach.`,
        "Kwota (zł)", K2, `$${dz(K2)}$ zł`, lata);
    case 2:
      return zadanie(
        `${osoba} ${wplacil} pewną kwotę na dwuletnią lokatę oprocentowaną ${pTxt} w skali roku. ${zasady} Po dwóch latach na lokacie było ${kwota(K2)} zł. Oblicz wpłaconą kwotę.`,
        "Wpłata (zł)", K, `$${dz(K)}$ zł`,
        [
          `Co roku kwota rośnie $${dz(c)}$ raza, więc w ciągu dwóch lat $(${dz(c)})^{2} = ${dz(c2)}$ raza.`,
          `Jeśli $x$ to wpłata, to $${dzRazy(c2)} = ${dz(K2)}$, więc $x = ${dz(K2)} : ${dz(c2)} = ${dz(K)}$ zł.`,
        ]);
    default:
      return zadanie(
        `${osoba} ${wplacil} ${kwota(K)} zł na dwuletnią lokatę o stałym oprocentowaniu rocznym. ${zasady} Po dwóch latach na lokacie było ${kwota(K2)} zł. Oblicz roczne oprocentowanie tej lokaty (w procentach).`,
        "Oprocentowanie (%)", p, `$${dz(p)}\\%$`,
        [
          `Niech $p$ – oprocentowanie roczne w procentach. Wtedy $${dz(K)} \\cdot \\left(1 + \\frac{p}{100}\\right)^{2} = ${dz(K2)}$.`,
          `$\\left(1 + \\frac{p}{100}\\right)^{2} = \\frac{${dz(K2)}}{${dz(K)}} = ${dz(c2)}$, więc $1 + \\frac{p}{100} = \\sqrt{${dz(c2)}} = ${dz(c)}$.`,
          `Stąd $p = ${dz(p)}$, czyli oprocentowanie wynosi $${dz(p)}\\%$ w skali roku.`,
        ]);
  }
}

// Towary w dopełniaczu ("cena kurtki").
const TOWARY = ["kurtki", "roweru", "telewizora", "hulajnogi", "plecaka", "zegarka", "laptopa", "namiotu", "ekspresu do kawy", "lodówki"];

/** Podwyżki i obniżki cen: cena po zmianach, procent ceny początkowej, cena przed zmianą. */
function procCena(r) {
  const towar = r.pick(TOWARY);
  const rodzaj = r.int(0, 3);
  for (;;) {
    const P = r.pick([80, 120, 150, 160, 200, 240, 250, 300, 360, 400, 450, 500, 600, 800, 1200, 1500, 2400]);
    const p = r.pick([10, 15, 20, 25, 30, 40, 50]);
    const s = r.pick([10, 20, 25, 30, 40, 50]);
    const fp = q(100 + p, 100);
    const fs = q(100 - s, 100);
    const podwyzkaNajpierw = r.chance(0.6);
    const [f1, f2] = podwyzkaNajpierw ? [fp, fs] : [fs, fp];
    const [zm1, zm2] = podwyzkaNajpierw ? [`podniesiono o ${p}%`, `obniżono o ${s}%`] : [`obniżono o ${s}%`, `podniesiono o ${p}%`];
    const [po1, po2] = podwyzkaNajpierw ? [`podwyżce o ${p}%`, `obniżce o ${s}%`] : [`obniżce o ${s}%`, `podwyżce o ${p}%`];
    const P1 = f1.mul(P);
    const P2 = P1.mul(f2);
    const f12 = f1.mul(f2);

    if (rodzaj === 0) {
      if (!P1.calkowita || !P2.calkowita) continue;
      return {
        tresc: `Cena ${towar} wynosiła ${kwota(P)} zł. Najpierw cenę ${zm1}, a następnie nową cenę ${zm2}. Oblicz cenę ${towar} po obu zmianach.`,
        pola: [poleLiczba("w", "Cena końcowa (zł)")],
        odpowiedz: { w: P2 },
        wynik: `$${dz(P2)}$ zł`,
        rozwiazanie: [
          `Po ${po1}: $${dz(P)} \\cdot ${dz(f1)} = ${dz(P1)}$ zł.`,
          `Po ${po2}: $${dz(P1)} \\cdot ${dz(f2)} = ${dz(P2)}$ zł.`,
        ],
      };
    }
    if (rodzaj === 1) {
      const x = f12.mul(100);
      if (!x.mul(10).calkowita) continue;
      return {
        tresc: `Cenę ${towar} najpierw ${zm1}, a następnie ${zm2}. Cena po obu zmianach stanowi $x\\%$ ceny początkowej. Oblicz $x$.`,
        pola: [poleLiczba("x", "$x =$")],
        odpowiedz: { x },
        wynik: `$x = ${dz(x)}$`,
        rozwiazanie: [
          `Podwyżka o ${p}% oznacza mnożenie ceny przez $${dz(fp)}$, a obniżka o ${s}% – mnożenie przez $${dz(fs)}$.`,
          `$${dz(f1)} \\cdot ${dz(f2)} = ${dz(f12)}$, czyli cena końcowa stanowi $${dz(x)}\\%$ ceny początkowej.`,
        ],
      };
    }
    if (rodzaj === 2) {
      const podwyzka = r.chance(0.5);
      const f = podwyzka ? fp : fs;
      const X = f.mul(P);
      if (!X.calkowita) continue;
      const zmiana = podwyzka ? `podwyżce o ${p}%` : `obniżce o ${s}%`;
      return {
        tresc: `Po ${zmiana} cena ${towar} wynosi ${kwota(X)} zł. Oblicz cenę ${towar} przed ${podwyzka ? "podwyżką" : "obniżką"}.`,
        pola: [poleLiczba("w", "Cena początkowa (zł)")],
        odpowiedz: { w: P },
        wynik: `$${dz(P)}$ zł`,
        rozwiazanie: [
          `Cena po ${zmiana} stanowi $${podwyzka ? 100 + p : 100 - s}\\%$ ceny początkowej $x$, więc $${dzRazy(f)} = ${dz(X)}$.`,
          `$x = ${dz(X)} : ${dz(f)} = ${dz(P)}$ zł.`,
        ],
      };
    }
    if (!P1.calkowita || !P2.calkowita) continue;
    return {
      tresc: `Cenę ${towar} najpierw ${zm1}, a następnie ${zm2}. Po tych zmianach cena ${towar} wynosi ${kwota(P2)} zł. Oblicz cenę początkową.`,
      pola: [poleLiczba("w", "Cena początkowa (zł)")],
      odpowiedz: { w: P },
      wynik: `$${dz(P)}$ zł`,
      rozwiazanie: [
        `Niech $x$ – cena początkowa. Po obu zmianach cena wynosi $x \\cdot ${dz(f1)} \\cdot ${dz(f2)} = ${dzRazy(f12)}$.`,
        f12.eq(1)
          ? `Zmiany się znoszą – cena końcowa jest równa początkowej, więc $x = ${dz(P)}$ zł.`
          : `$${dzRazy(f12)} = ${dz(P2)}$, więc $x = ${dz(P2)} : ${dz(f12)} = ${dz(P)}$ zł.`,
      ],
    };
  }
}

// Układy "dwie grupy, różne procenty" (CKE 2024, dwa sady).
const UKLADY = [
  {
    tresc: (N, a, b, D) => `W dwóch sadach rosło łącznie ${N} drzew. Po zimie okazało się, że w pierwszym sadzie uschło ${a}% drzew, a w drugim – ${b}% drzew. Łącznie uschło ${D} drzew. Oblicz, ile drzew rosło w każdym z sadów.`,
    pola: ["Pierwszy sad", "Drugi sad"],
    x: "liczba drzew w pierwszym sadzie",
    y: "liczba drzew w drugim sadzie",
  },
  {
    tresc: (N, a, b, D) => `Do dwóch szkół uczęszcza łącznie ${N} uczniów. W pierwszej szkole ${a}% uczniów dojeżdża na zajęcia autobusem, a w drugiej – ${b}% uczniów. Łącznie autobusem dojeżdża ${D} uczniów. Oblicz, ilu uczniów uczęszcza do każdej ze szkół.`,
    pola: ["Pierwsza szkoła", "Druga szkoła"],
    x: "liczba uczniów pierwszej szkoły",
    y: "liczba uczniów drugiej szkoły",
  },
  {
    tresc: (N, a, b, D) => `Dwie maszyny wyprodukowały łącznie ${N} części. Wśród części z pierwszej maszyny ${a}% było wadliwych, a wśród części z drugiej maszyny – ${b}%. Łącznie wadliwych było ${D} części. Oblicz, ile części wyprodukowała każda z maszyn.`,
    pola: ["Pierwsza maszyna", "Druga maszyna"],
    x: "liczba części z pierwszej maszyny",
    y: "liczba części z drugiej maszyny",
  },
];

/** Dwie grupy o łącznej liczebności N, różne procenty w każdej (układ równań). */
function procUklad(r) {
  const u = r.pick(UKLADY);
  for (;;) {
    const [a, b] = r.shuffle([2, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30]).slice(0, 2);
    const kx = 100 / nwd(a, 100);   // x musi być wielokrotnością kx, żeby a% z x było całkowite
    const ky = 100 / nwd(b, 100);
    const x = kx * r.int(Math.ceil(200 / kx), Math.floor(2000 / kx));
    const y = ky * r.int(Math.ceil(200 / ky), Math.floor(2000 / ky));
    const N = x + y;
    const D = (a * x + b * y) / 100;
    if (x === y || !zDopelniaczem(N) || !zDopelniaczem(D)) continue;
    const A = q(a, 100);
    const B = q(b, 100);
    return {
      tresc: u.tresc(kwota(N), a, b, kwota(D)),
      pola: [poleLiczba("x", u.pola[0]), poleLiczba("y", u.pola[1])],
      odpowiedz: { x, y },
      wynik: `${u.pola[0]}: $${dz(x)}$, ${u.pola[1].toLowerCase()}: $${dz(y)}$.`,
      rozwiazanie: [
        `Oznaczmy: $x$ – ${u.x}, $y$ – ${u.y}. Wtedy $x + y = ${dz(N)}$ oraz $${dzRazy(A)} + ${dzRazy(B, "y")} = ${dz(D)}$.`,
        `Podstawiamy $y = ${dz(N)} - x$: $${dzRazy(A)} + ${dz(B)}(${dz(N)} - x) = ${dz(D)}$, czyli $${dzRazy(A.sub(B))} = ${dz(q(D).sub(B.mul(N)))}$.`,
        `Stąd $x = ${dz(x)}$ oraz $y = ${dz(N)} - ${dz(x)} = ${dz(y)}$.`,
      ],
    };
  }
}

// Podział kwoty między dwie strony z zależnością procentową (CKE 2025).
const PODZIALY = [
  {
    wstep: (T) => `Kwotę ${T} zł przeznaczoną na nagrody podzielono między dwie drużyny: A i B.`,
    relacje: [
      (p) => `Drużyna A otrzymała o ${p}% więcej niż drużyna B.`,
      (p) => `Drużyna A otrzymała o ${p}% mniej niż drużyna B.`,
      (p) => `Kwota, którą otrzymała drużyna A, stanowi ${p}% kwoty, którą otrzymała drużyna B.`,
    ],
    pytanie: "Oblicz, ile złotych otrzymała każda z drużyn.",
    nazwy: ["drużyna A", "drużyna B"],
    dla: ["drużyny A", "drużyny B"],
  },
  {
    wstep: (T) => `Gmina przeznaczyła ${T} zł na remont dwóch boisk.`,
    relacje: [
      (p) => `Na remont pierwszego boiska przeznaczono o ${p}% więcej pieniędzy niż na remont drugiego.`,
      (p) => `Na remont pierwszego boiska przeznaczono o ${p}% mniej pieniędzy niż na remont drugiego.`,
      (p) => `Kwota przeznaczona na remont pierwszego boiska stanowi ${p}% kwoty przeznaczonej na remont drugiego.`,
    ],
    pytanie: "Oblicz, ile złotych przeznaczono na remont każdego z boisk.",
    nazwy: ["pierwsze boisko", "drugie boisko"],
    dla: ["pierwszego boiska", "drugiego boiska"],
  },
  {
    wstep: (T) => `Budżet projektu w wysokości ${T} zł podzielono między dwa zespoły: A i B.`,
    relacje: [
      (p) => `Zespół A otrzymał o ${p}% więcej niż zespół B.`,
      (p) => `Zespół A otrzymał o ${p}% mniej niż zespół B.`,
      (p) => `Kwota, którą otrzymał zespół A, stanowi ${p}% kwoty, którą otrzymał zespół B.`,
    ],
    pytanie: "Oblicz, ile złotych otrzymał każdy z zespołów.",
    nazwy: ["zespół A", "zespół B"],
    dla: ["zespołu A", "zespołu B"],
  },
];

/** Podział kwoty T na dwie części, gdy jedna jest o p% większa (mniejsza) od drugiej lub stanowi jej p%. */
function procPodzial(r) {
  const k = r.pick(PODZIALY);
  for (;;) {
    const rel = r.int(0, 2);
    const p = r.pick([[10, 20, 25, 30, 40, 50, 60, 75, 80], [10, 20, 25, 30, 40, 50], [40, 60, 75, 80, 120, 125, 150]][rel]);
    const f = [q(100 + p, 100), q(100 - p, 100), q(p, 100)][rel];
    const B = r.int(10, 60) * 1000;
    const A = f.mul(B);
    if (!A.calkowita || A.n % 100 !== 0 || A.n > 100000) continue;
    const T = A.add(B);
    const duza = (s) => s[0].toUpperCase() + s.slice(1);
    return {
      tresc: `${k.wstep(kwota(T))} ${k.relacje[rel](p)} ${k.pytanie}`,
      pola: [poleLiczba("a", `${duza(k.nazwy[0])} (zł)`), poleLiczba("b", `${duza(k.nazwy[1])} (zł)`)],
      odpowiedz: { a: A, b: B },
      wynik: `${duza(k.nazwy[0])}: $${dz(A)}$ zł, ${k.nazwy[1]}: $${dz(B)}$ zł.`,
      rozwiazanie: [
        `Niech $x$ – kwota dla ${k.dla[1]} (w zł). Wtedy kwota dla ${k.dla[0]} to $${dzRazy(f)}$.`,
        `$x + ${dzRazy(f)} = ${dz(T)}$, czyli $${dzRazy(f.add(1))} = ${dz(T)}$.`,
        `$x = ${dz(T)} : ${dz(f.add(1))} = ${dz(B)}$ zł, a $${dz(f)} \\cdot ${dz(B)} = ${dz(A)}$ zł.`,
      ],
    };
  }
}

// --- Wyrażenia algebraiczne

/** a² + b², (a − b)², (a + b)² albo ab z podanych sum, różnic i iloczynów liczb a, b. */
function wzSumaKwadratow(r) {
  for (;;) {
    const a = r.intBez(-9, 9, 0);
    const b = r.intBez(-9, 9, 0);
    if (a === b) continue;
    const [s, d, p, t] = [a + b, a - b, a * b, a * a + b * b];
    const rodzaj = r.int(0, 4);
    let warunki, pytanie, etykieta, wynik, kroki;
    if (rodzaj === 0) {
      warunki = [`a + b = ${s}`, `ab = ${p}`];
      pytanie = "a^{2} + b^{2}";
      wynik = t;
      kroki = [
        "Ze wzoru na kwadrat sumy: $(a + b)^{2} = a^{2} + 2ab + b^{2}$.",
        "Stąd $a^{2} + b^{2} = (a + b)^{2} - 2ab$.",
        `$a^{2} + b^{2} = ${texNawias(s)}^{2} - 2 \\cdot ${texNawias(p)} = ${s * s} ${plusMinus(-2 * p)} = ${t}$`,
      ];
    } else if (rodzaj === 1) {
      warunki = [`a - b = ${d}`, `ab = ${p}`];
      pytanie = "a^{2} + b^{2}";
      wynik = t;
      kroki = [
        "Ze wzoru na kwadrat różnicy: $(a - b)^{2} = a^{2} - 2ab + b^{2}$.",
        "Stąd $a^{2} + b^{2} = (a - b)^{2} + 2ab$.",
        `$a^{2} + b^{2} = ${texNawias(d)}^{2} + 2 \\cdot ${texNawias(p)} = ${d * d} ${plusMinus(2 * p)} = ${t}$`,
      ];
    } else if (rodzaj === 2) {
      warunki = [`a + b = ${s}`, `ab = ${p}`];
      pytanie = "(a - b)^{2}";
      wynik = d * d;
      kroki = [
        "Wzory na kwadrat różnicy i sumy dają $(a - b)^{2} = a^{2} - 2ab + b^{2} = (a + b)^{2} - 4ab$.",
        `$(a - b)^{2} = ${texNawias(s)}^{2} - 4 \\cdot ${texNawias(p)} = ${s * s} ${plusMinus(-4 * p)} = ${d * d}$`,
      ];
    } else if (rodzaj === 3) {
      warunki = [`a^{2} + b^{2} = ${t}`, `ab = ${p}`];
      pytanie = "(a + b)^{2}";
      wynik = s * s;
      kroki = [
        "Ze wzoru na kwadrat sumy: $(a + b)^{2} = a^{2} + b^{2} + 2ab$.",
        `$(a + b)^{2} = ${t} + 2 \\cdot ${texNawias(p)} = ${t} ${plusMinus(2 * p)} = ${s * s}$`,
      ];
    } else {
      warunki = [`a + b = ${s}`, `a^{2} + b^{2} = ${t}`];
      pytanie = "ab";
      wynik = p;
      kroki = [
        "Ze wzoru na kwadrat sumy: $(a + b)^{2} = a^{2} + 2ab + b^{2}$, więc $ab = \\frac{(a + b)^{2} - (a^{2} + b^{2})}{2}$.",
        `$ab = \\frac{${texNawias(s)}^{2} - ${t}}{2} = \\frac{${s * s - t}}{2} = ${p}$`,
      ];
    }
    return {
      tresc: `Liczby rzeczywiste $a$ i $b$ spełniają warunki $${warunki[0]}$ oraz $${warunki[1]}$. Oblicz wartość wyrażenia $${pytanie}$.`,
      pola: [poleLiczba("w", `$${pytanie} =$`)],
      odpowiedz: { w: wynik },
      wynik: `$${pytanie} = ${wynik}$`,
      rozwiazanie: kroki,
    };
  }
}

/** Rachunki "w pamięci" ze wzorów skróconego mnożenia: 103² − 97², 50² − 49 · 51, 47² − 2 · 47 · 7 + 7². */
function wzSzybkie(r) {
  const rodzaj = r.int(0, 2);
  const m = r.int(1, 9);
  if (rodzaj === 0) {
    const N = r.pick([20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 500, 1000]);
    const [A, B] = [N + m, N - m];
    return zadanieWartosc(r, `${A}^{2} - ${B}^{2}`, 4 * N * m, [
      "Skorzystaj ze wzoru na różnicę kwadratów: $a^{2} - b^{2} = (a - b)(a + b)$.",
      `$${A}^{2} - ${B}^{2} = (${A} - ${B})(${A} + ${B}) = ${2 * m} \\cdot ${2 * N} = ${4 * N * m}$`,
    ]);
  }
  if (rodzaj === 1) {
    const N = r.pick([20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 500, 1000]);
    return zadanieWartosc(r, `${N}^{2} - ${N - m} \\cdot ${N + m}`, m * m, [
      `Iloczyn $${N - m} \\cdot ${N + m}$ to $(${N} - ${m})(${N} + ${m}) = ${N}^{2} - ${m}^{2}$ (różnica kwadratów).`,
      `$${N}^{2} - ${N - m} \\cdot ${N + m} = ${N}^{2} - (${N}^{2} - ${m}^{2}) = ${m}^{2} = ${m * m}$`,
    ]);
  }
  const N = r.pick([20, 30, 40, 50, 60, 70, 80, 90, 100, 200]);
  return zadanieWartosc(r, `${N + m}^{2} - 2 \\cdot ${N + m} \\cdot ${m} + ${m}^{2}`, N * N, [
    "To kwadrat różnicy: $a^{2} - 2ab + b^{2} = (a - b)^{2}$ dla $a = " + (N + m) + "$ i $b = " + m + "$.",
    `$(${N + m} - ${m})^{2} = ${N}^{2} = ${N * N}$`,
  ]);
}

/** Po uproszczeniu wyrażenia ze wzorami skróconego mnożenia: współczynnik przy x², przy x albo wyraz wolny. */
function wzWspolczynnik(r) {
  for (;;) {
    const dwumian = () => [r.intBez(-4, 4, 0), r.intBez(-7, 7, 0)];
    const kwadrat = () => {
      const dw = dwumian();
      return { tex: `(${wielomianTex(dw)})^{2}`, w: wMnoz(dw, dw), kw: true };
    };
    const iloczyn = () => {
      const [d1, d2] = [dwumian(), dwumian()];
      return { tex: `(${wielomianTex(d1)})(${wielomianTex(d2)})`, w: wMnoz(d1, d2), kw: false };
    };
    const S1 = r.chance(0.6) ? kwadrat() : iloczyn();
    const S2 = r.chance(0.6) ? kwadrat() : iloczyn();
    if (S1.tex === S2.tex || (!S1.kw && !S2.kw)) continue;
    const minus = r.chance(0.55);
    const wyn = wDodaj(S1.w, minus ? S2.w.map((c) => -c) : S2.w);
    const ind = r.int(0, 2);
    const odp = wyn[ind];
    if (odp === 0) continue;
    const [lit, etykieta] = [["A", "x^{2}"], ["B", "x"], ["C", ""]][ind];
    const wyr = `${S1.tex} ${minus ? "-" : "+"} ${S2.tex}`;
    return {
      tresc: `Po wykonaniu działań i redukcji wyrazów podobnych wyrażenie $${wyr}$ przyjmuje postać $Ax^{2} + Bx + C$. Oblicz $${lit}$.`,
      pola: [poleLiczba("w", `$${lit} =$`)],
      odpowiedz: { w: odp },
      wynik: `$${lit} = ${odp}$`,
      rozwiazanie: [
        `Rozwijamy pierwszy składnik: $${S1.tex} = ${wielomianTex(S1.w)}$.`,
        `Rozwijamy drugi składnik: $${S2.tex} = ${wielomianTex(S2.w)}$.`,
        minus
          ? `Przy odejmowaniu zmieniamy znaki w drugim nawiasie: $${wielomianTex(S1.w)} - (${wielomianTex(S2.w)}) = ${wielomianTex(wyn)}$, więc $${lit} = ${odp}$.`
          : `Dodajemy: $${wielomianTex(S1.w)} + (${wielomianTex(S2.w)}) = ${wielomianTex(wyn)}$, więc $${lit} = ${odp}$.`,
      ],
    };
  }
}

/** Wartość ułamka z niewiadomą po skróceniu, np. (x² − 9)/(x + 3) dla x = 7. */
function wzSkracanie(r) {
  for (;;) {
    const a = r.int(2, 9);
    const k = r.int(2, 5);
    const t = r.int(-8, 12);
    const wzor = r.int(0, 5);
    const [licz, mian, rozklad, skr, zakaz, wartosc, podst] = [
      [`x^{2} - ${a * a}`, `x + ${a}`, `(x - ${a})(x + ${a})`, `x - ${a}`, -a, t - a, `${t} - ${a}`],
      [`x^{2} - ${a * a}`, `x - ${a}`, `(x - ${a})(x + ${a})`, `x + ${a}`, a, t + a, `${t} + ${a}`],
      [`x^{2} + ${2 * a}x + ${a * a}`, `x + ${a}`, `(x + ${a})^{2}`, `x + ${a}`, -a, t + a, `${t} + ${a}`],
      [`x^{2} - ${2 * a}x + ${a * a}`, `x - ${a}`, `(x - ${a})^{2}`, `x - ${a}`, a, t - a, `${t} - ${a}`],
      [`${k}x + ${k * a}`, `x + ${a}`, `${k}(x + ${a})`, `${k}`, -a, k, null],
      [`x^{2} - ${a}x`, "x", `x(x - ${a})`, `x - ${a}`, 0, t - a, `${t} - ${a}`],
    ][wzor];
    if (t === zakaz) continue;
    const opis = ["Licznik to różnica kwadratów", "Licznik to różnica kwadratów", "Licznik to kwadrat sumy", "Licznik to kwadrat różnicy", "Wyłączamy wspólny czynnik przed nawias", "Wyłączamy $x$ przed nawias"][wzor];
    return {
      tresc: `Oblicz wartość wyrażenia $\\frac{${licz}}{${mian}}$ dla $x = ${t}$.`,
      pola: [poleLiczba("w", "Wartość wyrażenia")],
      odpowiedz: { w: wartosc },
      wynik: `$${wartosc}$`,
      rozwiazanie: [
        `Mianownik nie może być zerem, więc $x \\neq ${zakaz}$. Dla $x = ${t}$ wyrażenie ma sens.`,
        `${opis}: $${licz} = ${rozklad}$.`,
        `Skracamy: $\\frac{${rozklad}}{${mian}} = ${skr}$.`,
        podst === null ? `Wynik nie zależy od $x$: $${wartosc}$.` : `Podstawiamy $x = ${t}$: $${podst} = ${wartosc}$.`,
      ],
    };
  }
}

/** 1/a + 1/b = (a + b)/ab albo a/b + b/a = (a² + b²)/ab z danej sumy i iloczynu. */
function wzOdwrotnosci(r) {
  for (;;) {
    const znak = r.znak();
    const a = znak * r.int(1, 8);
    const b = znak * r.int(1, 8);
    if (a === b) continue;
    const [s, p] = [a + b, a * b];
    const odwrotnosci = r.chance(0.5);
    const wartosc = odwrotnosci ? q(s, p) : q(s * s - 2 * p, p);
    if (wartosc.d > 12) continue;
    return {
      tresc: `Liczby $a$ i $b$ są różne od zera, $a + b = ${s}$ oraz $ab = ${p}$. Oblicz wartość wyrażenia $${odwrotnosci ? "\\frac{1}{a} + \\frac{1}{b}" : "\\frac{a}{b} + \\frac{b}{a}"}$.`,
      pola: [poleLiczba("w", "Wartość wyrażenia")],
      odpowiedz: { w: wartosc },
      wynik: `$${tex(wartosc)}$`,
      rozwiazanie: odwrotnosci
        ? [
          "Dodajemy ułamki, sprowadzając je do wspólnego mianownika: $\\frac{1}{a} + \\frac{1}{b} = \\frac{b + a}{ab}$.",
          `Podstawiamy: $\\frac{${s}}{${p}}${tex(wartosc) === `\\frac{${s}}{${p}}` ? "" : ` = ${tex(wartosc)}`}$.`,
        ]
        : [
          "Dodajemy ułamki: $\\frac{a}{b} + \\frac{b}{a} = \\frac{a^{2} + b^{2}}{ab}$. Licznik zapisujemy tak: $a^{2} + b^{2} = (a + b)^{2} - 2ab$.",
          `Podstawiamy: $\\frac{${texNawias(s)}^{2} - 2 \\cdot ${p}}{${p}} = \\frac{${s * s - 2 * p}}{${p}}${tex(wartosc) === `\\frac{${s * s - 2 * p}}{${p}}` ? "" : ` = ${tex(wartosc)}`}$.`,
        ],
    };
  }
}

// Wzory do przekształcania: każde zadanie podaje wzór, literę do wyznaczenia i dane liczbowe.
const WZORY_PRZEKSZTALCANIE = [
  (r) => {   // pole trapezu
    const [a, b, h] = [r.int(2, 10), r.int(2, 10), r.int(2, 10)];
    const P = q((a + b) * h, 2);
    return {
      tresc: `Pole trapezu o podstawach $a$ i $b$ oraz wysokości $h$ jest dane wzorem $P = \\frac{(a + b) \\cdot h}{2}$. Wyznacz z tego wzoru $b$ i oblicz jego wartość dla $P = ${dz(P)}$ cm², $a = ${a}$ cm oraz $h = ${h}$ cm.`,
      etykieta: "$b =$", odp: b, wynik: `$b = ${b}$ cm`,
      kroki: [
        "Mnożymy obie strony przez $2$ i dzielimy przez $h$ (zakładamy, że $h \\neq 0$): $\\frac{2P}{h} = a + b$.",
        "Stąd $b = \\frac{2P}{h} - a$.",
        `$b = \\frac{2 \\cdot ${dz(P)}}{${h}} - ${a} = \\frac{${(a + b) * h}}{${h}} - ${a} = ${a + b} - ${a} = ${b}$`,
      ],
    };
  },
  (r) => {   // v = s / t
    const v = r.pick([20, 30, 40, 45, 50, 60, 70, 80, 90]);
    const t = q(r.int(3, 12), 2);
    const s = t.mul(v);
    return {
      tresc: `Prędkość średnia $v$ jest dana wzorem $v = \\frac{s}{t}$, gdzie $s$ – droga, $t$ – czas. Wyznacz z tego wzoru $t$ i oblicz go (w godzinach) dla $s = ${dz(s)}$ km i $v = ${v}$ km/h.`,
      etykieta: "$t =$", odp: t, wynik: `$t = ${dz(t)}$ h`,
      kroki: [
        "Mnożymy obie strony przez $t$ (zakładamy, że $t \\neq 0$): $v \\cdot t = s$.",
        "Dzielimy obie strony przez $v$ (zakładamy, że $v \\neq 0$): $t = \\frac{s}{v}$.",
        `$t = \\frac{${dz(s)}}{${v}} = ${dz(t)}$`,
      ],
    };
  },
  (r) => {   // F = 9/5 C + 32
    const C = 5 * r.int(-4, 8);
    const F = (9 * C) / 5 + 32;
    return {
      tresc: `Temperaturę w skali Fahrenheita $F$ i w skali Celsjusza $C$ wiąże wzór $F = \\frac{9}{5}C + 32$. Wyznacz z tego wzoru $C$ i oblicz jego wartość dla $F = ${F}$.`,
      etykieta: "$C =$", odp: C, wynik: `$C = ${C}$`,
      kroki: [
        "Odejmujemy $32$ od obu stron: $F - 32 = \\frac{9}{5}C$.",
        "Mnożymy obie strony przez $\\frac{5}{9}$: $C = \\frac{5}{9}(F - 32)$.",
        `$C = \\frac{5}{9}(${F} - 32) = \\frac{5}{9} \\cdot ${texNawias(F - 32)} = ${C}$`,
      ],
    };
  },
  (r) => {   // 1/R = 1/R1 + 1/R2
    const [R1, R2, R] = r.pick([[6, 3, 2], [12, 6, 4], [12, 4, 3], [15, 10, 6], [30, 15, 10], [30, 20, 12], [24, 12, 8], [20, 5, 4], [10, 10, 5], [9, 18, 6], [12, 12, 6]]);
    const [g, szuk] = r.chance(0.5) ? [R1, R2] : [R2, R1];
    return {
      tresc: `Opór zastępczy $R$ dwóch oporników połączonych równolegle opisuje wzór $\\frac{1}{R} = \\frac{1}{R_{1}} + \\frac{1}{R_{2}}$. Wyznacz z tego wzoru $R_{2}$ i oblicz go (w omach) dla $R = ${R}$ i $R_{1} = ${g}$.`,
      etykieta: "$R_{2} =$", odp: szuk, wynik: `$R_{2} = ${szuk}$`,
      kroki: [
        "Przenosimy $\\frac{1}{R_{1}}$ na lewą stronę: $\\frac{1}{R_{2}} = \\frac{1}{R} - \\frac{1}{R_{1}}$. Po sprowadzeniu do wspólnego mianownika: $\\frac{1}{R_{2}} = \\frac{R_{1} - R}{R \\cdot R_{1}}$.",
        "Odwracamy ułamki (zakładamy, że $R_{1} \\neq R$): $R_{2} = \\frac{R \\cdot R_{1}}{R_{1} - R}$.",
        `$R_{2} = \\frac{${R} \\cdot ${g}}{${g} - ${R}} = \\frac{${R * g}}{${g - R}} = ${szuk}$`,
      ],
    };
  },
  (r) => {   // V = 1/3 Pp H
    const Pp = r.pick([6, 9, 12, 15, 18, 21, 24, 27, 30, 36]);
    const H = r.int(2, 12);
    const V = (Pp * H) / 3;
    return {
      tresc: `Objętość ostrosłupa dana jest wzorem $V = \\frac{1}{3} P_{p} \\cdot H$. Wyznacz z tego wzoru $H$ i oblicz jego wartość dla $V = ${V}$ cm³ oraz $P_{p} = ${Pp}$ cm².`,
      etykieta: "$H =$", odp: H, wynik: `$H = ${H}$ cm`,
      kroki: [
        "Mnożymy obie strony przez $3$: $3V = P_{p} \\cdot H$.",
        "Dzielimy przez $P_{p}$ (zakładamy, że $P_{p} \\neq 0$): $H = \\frac{3V}{P_{p}}$.",
        `$H = \\frac{3 \\cdot ${V}}{${Pp}} = \\frac{${3 * V}}{${Pp}} = ${H}$`,
      ],
    };
  },
  (r) => {   // K = K0 (1 + p)^n
    const [p, n] = r.pick([[q(1, 10), 2], [q(1, 5), 2], [q(1, 10), 3], [q(1, 5), 3]]);
    const K0 = 1000 * r.int(1, 5);
    const f = q(1).add(p).pow(n);
    const K = f.mul(K0);
    return {
      tresc: `Kapitał początkowy $K_{0}$ po $n$ latach rośnie do kwoty $K = K_{0}(1 + p)^{n}$, gdzie $p$ jest roczną stopą procentową zapisaną ułamkiem dziesiętnym. Wyznacz z tego wzoru $K_{0}$ i oblicz go dla $K = ${dz(K)}$ zł, $p = ${dz(p)}$ oraz $n = ${n}$.`,
      etykieta: "$K_{0} =$", odp: K0, wynik: `$K_{0} = ${K0}$ zł`,
      kroki: [
        "Czynnik $(1 + p)^{n}$ jest dodatni, więc dzielimy przez niego obie strony: $K_{0} = \\frac{K}{(1 + p)^{n}}$.",
        `$K_{0} = \\frac{${dz(K)}}{(1 + ${dz(p)})^{${n}}} = \\frac{${dz(K)}}{${dz(f)}} = ${K0}$`,
      ],
    };
  },
];

/** Przekształcanie wzoru: wyznaczenie litery i obliczenie jej wartości. */
function wzPrzeksztalcanie(r) {
  const z = r.pick(WZORY_PRZEKSZTALCANIE)(r);
  return {
    tresc: z.tresc,
    pola: [poleLiczba("w", z.etykieta)],
    odpowiedz: { w: z.odp },
    wynik: z.wynik,
    rozwiazanie: z.kroki,
  };
}

// --- Wielomiany

/** Iloczyn wielomianów (współczynniki od najwyższej potęgi). */
function wMnoz(a, b) {
  const w = Array(a.length + b.length - 1).fill(0);
  a.forEach((x, i) => b.forEach((y, j) => { w[i + j] += x * y; }));
  return w;
}

/** Suma wielomianów (współczynniki od najwyższej potęgi). */
function wDodaj(a, b) {
  const n = Math.max(a.length, b.length);
  const w = Array(n).fill(0);
  a.forEach((x, i) => { w[n - a.length + i] += x; });
  b.forEach((x, i) => { w[n - b.length + i] += x; });
  return w;
}

/** Wartość wielomianu dla liczby całkowitej (schemat Hornera). */
const wWartosc = (w, x) => w.reduce((s, c) => s * x + c, 0);

/** Stopień wielomianu (współczynniki od najwyższej potęgi); -Infinity dla zera. */
function wStopien(w) {
  const i = w.findIndex((c) => c !== 0);
  return i < 0 ? -Infinity : w.length - 1 - i;
}

/** Jednomian x^n z współczynnikiem c jako tablica współczynników. */
const jednomian = (c, n) => [c, ...Array(n).fill(0)];

/** Wartość W(a) wielomianu krok po kroku. */
function wmWartosc(r) {
  for (;;) {
    const st = r.pick([3, 3, 4]);
    const wsp = [r.pick([1, 1, 2, 3, -1, -2]), ...Array.from({ length: st }, () => r.int(-6, 6))];
    if (wsp.filter((c) => c !== 0).length < 3) continue;
    const a = r.pick([-3, -2, -1, 1, 2, 3]);
    const wynik = wWartosc(wsp, a);
    const skladniki = wsp.map((c, i) => ({ c, p: st - i })).filter(({ c }) => c !== 0);
    const potegi = skladniki.filter(({ p }) => p >= 2).map(({ p }) => `$${texNawias(a)}^{${p}} = ${a ** p}$`);
    const piece = ({ c, p }) => {
      const mn = Math.abs(c) === 1 && p > 0 ? "" : `${Math.abs(c)}${p > 0 ? " \\cdot " : ""}`;
      return p === 0 ? `${Math.abs(c)}` : `${mn}${texNawias(p === 1 ? a : a ** p)}`;
    };
    const sklej = skladniki.map((s, i) => `${i === 0 ? (s.c < 0 ? "-" : "") : s.c < 0 ? " - " : " + "}${piece(s)}`).join("");
    return {
      tresc: `Dany jest wielomian $W(x) = ${wielomianTex(wsp)}$. Oblicz $W(${a})$.`,
      pola: [poleLiczba("w", `$W(${a}) =$`)],
      odpowiedz: { w: wynik },
      wynik: `$W(${a}) = ${wynik}$`,
      rozwiazanie: [
        `Podstawiamy $x = ${a}$. Potrzebne potęgi: ${potegi.join(", ")}.`,
        `$W(${a}) = ${sklej}$`,
        `$W(${a}) = ${sumaTex(skladniki.map(({ c, p }) => c * a ** p))} = ${wynik}$`,
      ],
    };
  }
}

/** W(x) z parametrem m przy x² albo x: tekst LaTeX (elementy: liczby i "m"). */
function wielomianZParametrem(el) {
  const st = el.length - 1;
  return el
    .map((c, i) => {
      const p = st - i;
      if (c === 0) return null;
      const lit = p === 0 ? "" : p === 1 ? "x" : `x^{${p}}`;
      if (c === "m") return { z: "+", t: `m${lit}` };
      return { z: c < 0 ? "-" : "+", t: `${Math.abs(c) === 1 && p > 0 ? "" : Math.abs(c)}${lit}` };
    })
    .filter(Boolean)
    .map((s, i) => (i === 0 ? `${s.z === "-" ? "-" : ""}${s.t}` : ` ${s.z} ${s.t}`))
    .join("");
}

/** Liczba a jest pierwiastkiem wielomianu z parametrem m: wyznacz m. */
function wmParametr(r) {
  for (;;) {
    const a = r.pick([-3, -2, -1, 1, 2, 3]);
    const j = r.pick([1, 2]);
    const al = r.pick([1, 1, 2]);
    const inny = r.intBez(-6, 6, 0);
    const m0 = r.intBez(-6, 6, 0);
    const c2 = j === 2 ? m0 : inny;
    const c1 = j === 1 ? m0 : inny;
    const c0 = -(al * a ** 3 + c2 * a ** 2 + c1 * a);
    if (Math.abs(c0) > 60) continue;
    const el = [al, j === 2 ? "m" : inny, j === 1 ? "m" : inny, c0];
    const wartosci = [[al * a ** 3, ""], [j === 2 ? a ** 2 : inny * a ** 2, j === 2 ? "m" : ""], [j === 1 ? a : inny * a, j === 1 ? "m" : ""], [c0, ""]];
    const wspM = a ** j;
    const k = wartosci.reduce((s, [w, lit]) => (lit === "" ? s + w : s), 0);
    return {
      tresc: `Liczba $${a}$ jest pierwiastkiem wielomianu $W(x) = ${wielomianZParametrem(el)}$. Wyznacz $m$.`,
      pola: [poleLiczba("w", "$m =$")],
      odpowiedz: { w: m0 },
      wynik: `$m = ${m0}$`,
      rozwiazanie: [
        `Skoro $${a}$ jest pierwiastkiem, to $W(${a}) = 0$.`,
        `$W(${a}) = ${skladnikiTex(wartosci)} = ${wielomianTex([wspM, k], "m")}$`,
        `Z równania $${wielomianTex([wspM, k], "m")} = 0$ dostajemy $m = ${m0}$.`,
      ],
    };
  }
}

/** Stopień wielomianu zapisanego jako iloczyn lub różnica (po redukcji wyrazów). */
function wmStopien(r) {
  if (r.chance(0.55)) {
    for (;;) {
      const m = r.int(1, 3);
      const n = r.int(2, 4);
      const k = r.pick([1, 2, 3]);
      const j = r.int(1, n - 1);
      const c = r.intBez(-4, 4, 0);
      const d = r.intBez(-4, 4, 0);
      const p1 = [...jednomian(1, m)];
      p1[m] = c;
      const p2 = wDodaj(jednomian(k, n), jednomian(d, j));
      const iloczyn = wMnoz(p1, p2);
      const W = [...iloczyn];
      W[0] -= k;
      const st = wStopien(W);
      if (st < 1) continue;
      const odejmowany = `${k === 1 ? "" : k}x^{${m + n}}`;
      return {
        tresc: `Jaki jest stopień wielomianu $W(x) = (${wielomianTex(p1)})(${wielomianTex(p2)}) - ${odejmowany}$?`,
        pola: [poleLiczba("w", "Stopień")],
        odpowiedz: { w: st },
        wynik: `$${st}$`,
        rozwiazanie: [
          `Mnożymy: $(${wielomianTex(p1)})(${wielomianTex(p2)}) = ${wielomianTex(iloczyn)}$.`,
          `Odejmujemy $${odejmowany}$, więc wyraz z $x^{${m + n}}$ się redukuje: $W(x) = ${wielomianTex(W)}$.`,
          `Najwyższa potęga to $${st === 1 ? "x" : `x^{${st}}`}$, więc stopień wynosi $${st}$.`,
        ],
      };
    }
  }
  const [a, n] = r.pick([[1, 2], [1, 3], [1, 4], [2, 2], [2, 3], [2, 4], [3, 2]]);
  const c = r.int(1, 3);
  const [p, qq, rr] = [r.intBez(-3, 3, 0), r.pick([1, 2, 3]), r.intBez(-3, 3, 0)];
  const st = a * n + c;
  const pierwszy = wielomianTex([...jednomian(1, a)].map((x, i, t) => (i === a ? p : x)));
  const drugi = wielomianTex([...jednomian(qq, c)].map((x, i, t) => (i === c ? rr : x)));
  return {
    tresc: `Jaki jest stopień wielomianu $W(x) = (${pierwszy})^{${n}}(${drugi})$?`,
    pola: [poleLiczba("w", "Stopień")],
    odpowiedz: { w: st },
    wynik: `$${st}$`,
    rozwiazanie: [
      `Stopień iloczynu wielomianów jest sumą stopni czynników.`,
      `Stopień $(${pierwszy})^{${n}}$ to $${n} \\cdot ${a} = ${a * n}$, a stopień $${drugi}$ to $${c}$.`,
      `Stopień $W$: $${a * n} + ${c} = ${st}$.`,
    ],
  };
}

/** Suma współczynników (W(1)) albo wyraz wolny (W(0)) wielomianu (αx + β)^n (γx + δ). */
function wmSumaWspolczynnikow(r) {
  for (;;) {
    const al = r.intBez(-3, 3, 0);
    const be = r.intBez(-4, 4, 0);
    const ga = r.intBez(-3, 3, 0);
    const de = r.intBez(-5, 5, 0);
    const n = r.pick([2, 3, 4]);
    if (al + be === 0 || ga + de === 0) continue;
    const W = `(${wielomianTex([al, be])})^{${n}}(${wielomianTex([ga, de])})`;
    if (r.chance(0.7)) {
      const wynik = (al + be) ** n * (ga + de);
      return {
        tresc: `Oblicz sumę wszystkich współczynników wielomianu $W(x) = ${W}$ (po wymnożeniu nawiasów).`,
        pola: [poleLiczba("w", "Suma współczynników")],
        odpowiedz: { w: wynik },
        wynik: `$${wynik}$`,
        rozwiazanie: [
          "Podstawienie $x = 1$ zamienia każde $x^{k}$ na $1$, więc suma współczynników to $W(1)$.",
          `$W(1) = (${al} ${plusMinus(be)})^{${n}} \\cdot (${ga} ${plusMinus(de)})$`,
          `$W(1) = ${texNawias(al + be)}^{${n}} \\cdot ${texNawias(ga + de)} = ${wynik}$`,
        ],
      };
    }
    const wynik = be ** n * de;
    return {
      tresc: `Oblicz wyraz wolny wielomianu $W(x) = ${W}$ (po wymnożeniu nawiasów).`,
      pola: [poleLiczba("w", "Wyraz wolny")],
      odpowiedz: { w: wynik },
      wynik: `$${wynik}$`,
      rozwiazanie: [
        "Wyraz wolny wielomianu to $W(0)$, bo podstawienie $x = 0$ zeruje wszystkie wyrazy z $x$.",
        `W każdym nawiasie zostaje wyraz wolny: $W(0) = ${texNawias(be)}^{${n}} \\cdot ${texNawias(de)} = ${wynik}$`,
      ],
    };
  }
}

const KROTNOSC = { 1: "jednokrotny", 2: "dwukrotny", 3: "trzykrotny" };

/** Równość wielomianów: (x − p)(x² + ax + b) = x³ + … – wyznacz a i b. */
function wmRownosc(r) {
  for (;;) {
    const p = r.intBez(-3, 3, 0);
    const a = r.int(-5, 5);
    const b = r.intBez(-5, 5, 0);
    const prawa = [1, a - p, b - p * a, -p * b];
    const c2 = skladnikiTex([[1, "a"], [-p, ""]]);
    const c1 = skladnikiTex([[1, "b"], [-p, "a"]]);
    const c0 = skladnikiTex([[-p, "b"]]);
    return {
      tresc: `Wielomiany $W(x) = ${nawiasMinus(p)}(x^{2} + ax + b)$ oraz $P(x) = ${wielomianTex(prawa)}$ są równe. Wyznacz liczby $a$ i $b$.`,
      pola: [poleLiczba("a", "$a =$"), poleLiczba("b", "$b =$")],
      odpowiedz: { a, b },
      wynik: `$a = ${a}$, $b = ${b}$`,
      rozwiazanie: [
        `Wymnażamy: $W(x) = x^{3} + (${c2})x^{2} + (${c1})x ${c0.startsWith("-") ? `- ${c0.slice(1)}` : `+ ${c0}`}$.`,
        `Porównujemy współczynniki przy $x^{2}$ i $x$ oraz wyrazy wolne: $${c2} = ${prawa[1]}$, $${c1} = ${prawa[2]}$, $${c0} = ${prawa[3]}$.`,
        `Z pierwszego równania $a = ${a}$, z trzeciego $b = ${b}$. Sprawdzamy drugie: $${b} - ${texNawias(p)} \\cdot ${texNawias(a)} = ${b - p * a}$, zgadza się.`,
      ],
    };
  }
}

/** Rozkład na czynniki (grupowanie, wyłączanie, wzory) i pierwiastki wielomianu. */
function wmRozklad(r) {
  const rodzaj = zWagami(r, [[0.45, 0], [0.3, 1], [0.25, 2]]);
  if (rodzaj === 0) {
    for (;;) {
      const al = r.pick([1, 1, 2, 3]);
      const be = r.intBez(-6, 6, 0);
      const s = r.int(1, 6);
      if (nwd(al, be) !== 1) continue;
      const x0 = q(be, al);
      if (x0.eq(s) || x0.eq(-s)) continue;
      const W = [al, -be, -al * s * s, be * s * s];
      const lin = wielomianTex([al, -be]);
      const co = r.pick(["najw", "najm", "suma"]);
      const pierw = [x0, q(s), q(-s)];
      const wynik = co === "najw" ? pierw.reduce((m, x) => (x.cmp(m) > 0 ? x : m)) : co === "najm" ? pierw.reduce((m, x) => (x.cmp(m) < 0 ? x : m)) : x0;
      const pytanie = { najw: "największy pierwiastek", najm: "najmniejszy pierwiastek", suma: "sumę wszystkich pierwiastków" }[co];
      return {
        tresc: `Rozłóż wielomian $W(x) = ${wielomianTex(W)}$ na czynniki, grupując wyrazy, i podaj ${pytanie} tego wielomianu.`,
        pola: [poleLiczba("w", co === "suma" ? "Suma pierwiastków" : "Pierwiastek")],
        odpowiedz: { w: wynik },
        wynik: `$${tex(wynik)}$`,
        rozwiazanie: [
          `Grupujemy wyrazy: $x^{2}(${lin}) - ${s * s}(${lin}) = (${lin})(x^{2} - ${s * s})$.`,
          `Różnica kwadratów: $x^{2} - ${s * s} = (x - ${s})(x + ${s})$.`,
          `Pierwiastki to ${[x0, q(s), q(-s)].map((x) => `$${tex(x)}$`).join(", ")}.`,
          `Szukana liczba: $${tex(wynik)}$.`,
        ],
      };
    }
  }
  if (rodzaj === 1) {
    const wariant = r.int(0, 2);
    if (wariant === 0) {
      const k = r.pick([1, 2, 3]);
      const s = r.int(2, 6);
      const najw = r.chance(0.5);
      const wynik = najw ? s : -s;
      const kt = k === 1 ? "" : String(k);
      return {
        tresc: `Podaj ${najw ? "największy" : "najmniejszy"} pierwiastek wielomianu $W(x) = ${wielomianTex([k, 0, -k * s * s, 0])}$.`,
        pola: [poleLiczba("w", "Pierwiastek")],
        odpowiedz: { w: wynik },
        wynik: `$${wynik}$`,
        rozwiazanie: [
          `Wyłączamy $${kt}x$ przed nawias: $W(x) = ${kt}x(x^{2} - ${s * s})$.`,
          `Różnica kwadratów: $x^{2} - ${s * s} = (x - ${s})(x + ${s})$, więc $W(x) = ${kt}x(x - ${s})(x + ${s})$.`,
          `Pierwiastki to $0$, $${s}$ i $${-s}$, więc ${najw ? "największy" : "najmniejszy"} z nich to $${wynik}$.`,
        ],
      };
    }
    if (wariant === 1) {
      const s = r.intBez(-5, 5, 0);
      return {
        tresc: `Ile różnych pierwiastków rzeczywistych ma wielomian $W(x) = ${wielomianTex([1, -2 * s, s * s, 0])}$?`,
        pola: [poleLiczba("w", "Liczba pierwiastków")],
        odpowiedz: { w: 2 },
        wynik: "$2$",
        rozwiazanie: [
          `Wyłączamy $x$ przed nawias: $W(x) = x(${wielomianTex([1, -2 * s, s * s])})$.`,
          `Trójmian w nawiasie to kwadrat: $W(x) = x${nawiasMinus(s)}^{2}$.`,
          `Pierwiastki to $0$ oraz $${s}$ (pierwiastek dwukrotny). Różnych pierwiastków jest $2$.`,
        ],
      };
    }
    const dodatni = r.chance(0.5);
    const c = r.int(1, 9);
    const s = r.int(2, 6);
    const wsp = dodatni ? [1, 0, c, 0, 0] : [1, 0, -s * s, 0, 0];
    const ile = dodatni ? 1 : 3;
    return {
      tresc: `Ile różnych pierwiastków rzeczywistych ma wielomian $W(x) = ${wielomianTex(wsp)}$?`,
      pola: [poleLiczba("w", "Liczba pierwiastków")],
      odpowiedz: { w: ile },
      wynik: `$${ile}$`,
      rozwiazanie: dodatni
        ? [
          `Wyłączamy $x^{2}$ przed nawias: $W(x) = x^{2}(x^{2} + ${c})$.`,
          `Czynnik $x^{2} + ${c}$ jest zawsze dodatni, więc nie ma pierwiastków. Czynnik $x^{2}$ daje pierwiastek $0$.`,
          "Różnych pierwiastków jest $1$.",
        ]
        : [
          `Wyłączamy $x^{2}$ przed nawias: $W(x) = x^{2}(x^{2} - ${s * s}) = x^{2}(x - ${s})(x + ${s})$.`,
          `Pierwiastki to $0$ (dwukrotny), $${s}$ i $${-s}$.`,
          "Różnych pierwiastków jest $3$.",
        ],
    };
  }
  const a = r.intBez(-5, 5, 0);
  const u = r.chance(0.15) ? a : r.intBez(-5, 5, 0, a);
  const m = r.int(1, 3);
  const c = r.int(1, 9);
  const ile = a === u ? 1 : 2;
  return {
    tresc: `Ile różnych pierwiastków rzeczywistych ma wielomian $W(x) = ${nawiasMinus(a)}${m === 1 ? "" : `^{${m}}`}${nawiasMinus(u)}(x^{2} + ${c})$?`,
    pola: [poleLiczba("w", "Liczba pierwiastków")],
    odpowiedz: { w: ile },
    wynik: `$${ile}$`,
    rozwiazanie: [
      `Czynnik $x^{2} + ${c}$ nie ma pierwiastków rzeczywistych, bo $x^{2} + ${c} \\ge ${c} > 0$.`,
      a === u
        ? `Czynniki $${nawiasMinus(a)}${m === 1 ? "" : `^{${m}}`}$ i $${nawiasMinus(u)}$ dają ten sam pierwiastek $${a}$.`
        : `Z pozostałych czynników: $x = ${a}$ (pierwiastek ${KROTNOSC[m]}) oraz $x = ${u}$.`,
      `Różnych pierwiastków rzeczywistych jest $${ile}$.`,
    ],
  };
}

// --- Nierówność kwadratowa

const ODWROTNY = { "<": ">", "\\le": "\\ge", ">": "<", "\\ge": "\\le" };
const ZNAKI = ["<", "\\le", ">", "\\ge"];
const TRESC_NIEROWNOSC = ["Rozwiąż nierówność", "Wyznacz zbiór rozwiązań nierówności", "Rozwiąż w zbiorze liczb rzeczywistych nierówność"];
const KSZTALTY_KW = [
  "$x \\in (x_1, x_2)$",
  "$x \\in [x_1, x_2]$",
  "$x \\in (-\\infty, x_1) \\cup (x_2, +\\infty)$",
  "$x \\in (-\\infty, x_1] \\cup [x_2, +\\infty)$",
];

/** Zbiór rozwiązań w LaTeX dla kształtu 0–3 (kolejność jak w KSZTALTY_KW). */
function przedzialKw(ksztalt, x1, x2) {
  const [a, b] = [tex(x1), tex(x2)];
  return [
    `x \\in \\left(${a}, ${b}\\right)`,
    `x \\in \\left[${a}, ${b}\\right]`,
    `x \\in \\left(-\\infty, ${a}\\right) \\cup \\left(${b}, +\\infty\\right)`,
    `x \\in \\left(-\\infty, ${a}\\right] \\cup \\left[${b}, +\\infty\\right)`,
  ][ksztalt];
}

/** Ułamek niecałkowity n/d o mianowniku 2–5, |n/d| <= maks. */
function losujUlamek(r, maks) {
  const d = zWagami(r, [[0.45, 2], [0.35, 3], [0.1, 4], [0.1, 5]]);
  for (;;) {
    const n = r.int(-maks * d, maks * d);
    if (nwd(n, d) === 1) return q(n, d);
  }
}

/** Dwa różne pierwiastki x1 < x2: całkowite albo ułamki o małych mianownikach. */
function dwaPierwiastki(r, bezZera = false) {
  for (;;) {
    const typ = zWagami(r, [[0.45, 0], [0.4, 1], [0.15, 2]]);
    const x1 = typ === 2 ? losujUlamek(r, 3) : q(r.int(-6, 6));
    const x2 = typ >= 1 ? losujUlamek(r, 4) : q(r.int(-6, 6));
    if (x1.eq(x2)) continue;
    if ((x1.zero || x2.zero) && (bezZera || r.chance(0.7))) continue;   // zero rzadziej
    if (x1.eq(x2.neg()) && r.chance(0.6)) continue;                      // pierwiastki przeciwne rzadziej
    return x1.cmp(x2) < 0 ? [x1, x2] : [x2, x1];
  }
}

/** Współczynniki [A, B, C] trójmianu k(q1x − p1)(q2x − p2) o pierwiastkach p1/q1 i p2/q2. */
const trojmian = (x1, x2, k) => [k * x1.d * x2.d, -k * (x1.d * x2.n + x2.d * x1.n), k * x1.n * x2.n];

/** Δ i pierwiastki trójmianu [A, B, C] krok po kroku: [tekst kroku, mniejszy, większy]. */
function deltaKrok(A, B, C) {
  const delta = B * B - 4 * A * C;
  const sD = Math.round(Math.sqrt(delta));
  if (delta <= 0 || sD * sD !== delta) throw new Error(`Δ = ${delta} nie jest kwadratem liczby naturalnej`);
  const r1 = q(-B - sD, 2 * A);
  const r2 = q(-B + sD, 2 * A);
  const tekst = `$\\Delta = ${texNawias(B)}^{2} - 4 \\cdot ${texNawias(A)} \\cdot ${texNawias(C)} = ${delta}$, $\\sqrt{\\Delta} = ${sD}$, `
    + `więc $x = \\frac{${-B} - ${sD}}{${2 * A}} = ${tex(r1)}$ lub $x = \\frac{${-B} + ${sD}}{${2 * A}} = ${tex(r2)}$.`;
  return r1.cmp(r2) < 0 ? [tekst, r1, r2] : [tekst, r2, r1];
}

/** Zapis trójmianu f jako L − R = f, jak w arkuszach CKE: wyrazy po obu stronach, nawiasy, iloczyny. */
function przebierz(r, f) {
  const [A, B, C] = f;
  const w = wielomianTex;
  for (;;) {
    const szablon = zWagami(r, [[0.3, 1], [0.2, 2], [0.3, 3], [0.15, 4], [0.05, 0]]);
    if (szablon === 0) return [w(f), "0"];
    if (szablon === 1) {        // 3x^2 + 4x >= 6x + 8
      const b1 = r.int(-6, 6);
      const c1 = r.chance(0.3) ? r.intBez(-6, 6, 0) : 0;
      const prawa = [b1 - B, c1 - C];
      if (prawa[0] === 0 && prawa[1] === 0) continue;
      return [w([A, b1, c1]), w(prawa)];
    }
    if (szablon === 2) {        // 3(2x^2 + 1) < 11x
      const m = Math.sign(A) * nwd(A, C);
      if (C === 0 || B === 0 || Math.abs(m) < 2) continue;
      return [`${m}(${w([A / m, 0, C / m])})`, w([-B, 0])];
    }
    if (szablon === 3) {        // x(3x + 4) >= 6x + 8, (2x - 1)(x + 3) < 4x
      const dzielniki = [];
      for (let d = 1; d <= Math.abs(A); d++) if (A % d === 0) dzielniki.push(d);
      const al = r.pick(dzielniki);
      const ga = A / al;
      const be = r.chance(0.3) ? 0 : r.intBez(-5, 5, 0);
      const de = r.intBez(-5, 5, 0);
      const fx = (x) => x.mul(x).mul(A).add(x.mul(B)).add(C);
      if (fx(q(-be, al)).zero || fx(q(-de, ga)).zero) continue;   // czynniki nie zdradzają pierwiastków
      const prawa = [al * de + be * ga - B, be * de - C];
      if (prawa[0] === 0 && prawa[1] === 0) continue;
      const pierwszy = be === 0 ? (al === 1 ? "x" : `${al}x`) : `(${liniowy(al, be)})`;
      return [`${pierwszy}(${liniowy(ga, de)})`, w(prawa)];
    }
    const m = r.pick([-2, -1, 1, 2]);   // x^2 po obu stronach
    if (A + m === 0) continue;
    const b1 = r.int(-5, 5);
    const c1 = r.int(-6, 6);
    return [w([A + m, b1, c1]), w([m, b1 - B, c1 - C])];
  }
}

const OPIS_ZNAKU = { "<": "ujemne", "\\le": "niedodatnie", ">": "dodatnie", "\\ge": "nieujemne" };

/** 3(2x² + 1) < 11x → x ∈ (1/3, 3/2): kształt zbioru rozwiązań i pierwiastki x1 < x2. */
function nierownoscKwadratowa(r) {
  for (;;) {
    const [x1, x2] = dwaPierwiastki(r);
    const mian = x1.d * x2.d;
    const k = mian === 1 ? r.pick([1, 1, 2, 3, -1, -2]) : mian <= 4 ? r.pick([1, 1, -1, 2]) : r.pick([1, -1]);
    const f = trojmian(x1, x2, k);
    if (Math.abs(f[0]) > 12 || Math.abs(f[1]) > 60 || Math.abs(f[2]) > 60) continue;
    const znak = r.pick(ZNAKI);
    const [L, R] = przebierz(r, f);
    const zamiana = r.chance(0.3);   // czasem strony na odwrót
    const [P1, P2, op] = zamiana ? [R, L, ODWROTNY[znak]] : [L, R, znak];
    const h = zamiana ? f.map((c) => -c) : f;   // P1 − P2 = h
    const [A, B, C] = h;
    const [krokDelta, m1, m2] = deltaKrok(A, B, C);
    if (!m1.eq(x1) || !m2.eq(x2)) throw new Error("Pierwiastki nie zgadzają się z założonymi");
    const wewnatrz = (A > 0) === (op === "<" || op === "\\le");
    const domkniety = op === "\\le" || op === "\\ge";
    const ksztalt = (wewnatrz ? 0 : 2) + (domkniety ? 1 : 0);
    const gdzie = (wewnatrz ? "między pierwiastkami" : "na lewo od mniejszego i na prawo od większego pierwiastka")
      + (domkniety ? ", razem z pierwiastkami" : "");
    const kroki = [];
    const zero = `${wielomianTex(h)} ${op} 0`;
    if (`${P1} ${op} ${P2}` !== zero) kroki.push(`Przenosimy wszystkie wyrazy na lewą stronę: $${zero}$.`);
    kroki.push(krokDelta);
    kroki.push(`Ramiona paraboli są skierowane ${A > 0 ? "w górę" : "w dół"} ($a = ${A}$), więc trójmian przyjmuje wartości ${OPIS_ZNAKU[op]} ${gdzie}: $${przedzialKw(ksztalt, x1, x2)}$.`);
    return {
      tresc: `${r.pick(TRESC_NIEROWNOSC)} $${P1} ${op} ${P2}$.\n\nWybierz postać zbioru rozwiązań i podaj liczby $x_1 < x_2$.`,
      pola: [
        { id: "ksztalt", typ: "wybor", etykieta: "Zbiór rozwiązań", opcje: [...KSZTALTY_KW] },
        poleLiczba("x1", "$x_1 =$"),
        poleLiczba("x2", "$x_2 =$"),
      ],
      odpowiedz: { ksztalt, x1, x2 },
      wynik: `$${przedzialKw(ksztalt, x1, x2)}$`,
      rozwiazanie: kroki,
    };
  }
}

// --- Równanie wielomianowe

const TRESC_ROWNANIE = ["Rozwiąż równanie", "Wyznacz wszystkie rozwiązania równania", "Rozwiąż w zbiorze liczb rzeczywistych równanie"];

/** Zbiór rozwiązań {…} w LaTeX, rosnąco. */
const zbiorTex = (xs) => `x \\in \\left\\{${[...xs].sort((a, b) => a.cmp(b)).map(tex).join(", ")}\\right\\}`;

/** Czasem część wyrazów wielomianu przechodzi na prawą stronę: [lewa, prawa] w LaTeX. */
function rozdzielStrony(r, wsp) {
  const ruch = zWagami(r, [[0.55, []], [0.25, [2, 3]], [0.1, [2]], [0.1, [1]]]).filter((i) => wsp[i] !== 0);
  if (!ruch.length) return [wielomianTex(wsp), "0"];
  return [wielomianTex(wsp.map((w, i) => (ruch.includes(i) ? 0 : w))), wielomianTex(wsp.map((w, i) => (ruch.includes(i) ? -w : 0)))];
}

/** Zadanie z równaniem L = P i trzema rozwiązaniami. */
function zadanieRownanie(r, L, P, wsp, rozw, kroki) {
  if (P !== "0") kroki.unshift(`Przenosimy wszystkie wyrazy na lewą stronę: $${wielomianTex(wsp)} = 0$.`);
  const posortowane = [...rozw].sort((a, b) => a.cmp(b));
  kroki.push(`Rozwiązania: ${posortowane.map((x) => `$x = ${tex(x)}$`).join(", ")}.`);
  return {
    tresc: `${r.pick(TRESC_ROWNANIE)} $${L} = ${P}$.`,
    pola: [{ id: "x", typ: "zbior", ile: 3, etykieta: "Rozwiązania" }],
    odpowiedz: { x: posortowane },
    wynik: `$${zbiorTex(rozw)}$`,
    rozwiazanie: kroki,
  };
}

/** 3x³ − 2x² − 12x + 8 = 0 → (3x − 2)(x² − 4) = 0: grupowanie wyrazów (CKE 2023). */
function rownanieGrupowanie(r) {
  for (;;) {
    const al = zWagami(r, [[0.35, 1], [0.3, 2], [0.25, 3], [0.1, 4]]);
    const be = r.intBez(-5 * al, 5 * al, 0);
    const t = zWagami(r, [[0.7, 1], [0.2, 2], [0.1, 3]]);
    const s = r.int(1, 6);
    if (nwd(al, be) !== 1 || nwd(s, t) !== 1) continue;
    const x0 = q(be, al);   // pierwiastek czynnika liniowego
    const u = q(s, t);      // pierwiastki ±u czynnika kwadratowego
    if (x0.eq(u) || x0.eq(u.neg())) continue;
    const lam = zWagami(r, [[0.75, 1], [0.15, -1], [0.1, 2]]);
    const wsp = [lam * al * t * t, -lam * be * t * t, -lam * al * s * s, lam * be * s * s];
    if (Math.abs(wsp[0]) > 20 || wsp.some((w) => Math.abs(w) > 150)) continue;
    if (Math.abs(wsp[0]) === 1 && r.chance(0.5)) continue;   // współczynnik 1 przy x^3 rzadziej
    const [L, P] = rozdzielStrony(r, wsp);
    const lin = wielomianTex([al, -be]);
    const g1 = lam * t * t;
    const g2 = -lam * s * s;
    const kw = wielomianTex([g1, 0, g2]);
    const grupy = `${g1 === 1 ? "" : g1 === -1 ? "-" : g1}x^{2}(${lin}) ${g2 < 0 ? "-" : "+"} ${Math.abs(g2) === 1 ? "" : Math.abs(g2)}(${lin})`;
    return zadanieRownanie(r, L, P, wsp, [x0, u.neg(), u], [
      `Grupujemy wyrazy: $${grupy} = 0$, czyli $(${lin})(${kw}) = 0$.`,
      `Stąd $${lin} = 0$ lub $${kw} = 0$, czyli $x = ${tex(x0)}$ lub $x^{2} = ${tex(u.mul(u))}$.`,
    ]);
  }
}

/** 2x³ − 5x² − 3x = 0 → x(2x² − 5x − 3) = 0: wyłączenie x przed nawias i równanie kwadratowe. */
function rownanieZX(r) {
  for (;;) {
    const [x1, x2] = dwaPierwiastki(r, true);
    const k = x1.d * x2.d === 1 ? r.pick([1, 2, -1]) : r.pick([1, -1]);
    const [A, B, C] = trojmian(x1, x2, k);
    if (Math.abs(A) > 12 || Math.abs(B) > 40 || Math.abs(C) > 40 || B === 0) continue;
    const wsp = [A, B, C, 0];
    const [L, P] = rozdzielStrony(r, wsp);
    const kw = wielomianTex([A, B, C]);
    const [krokDelta] = deltaKrok(A, B, C);
    return zadanieRownanie(r, L, P, wsp, [q(0), x1, x2], [
      `Wyłączamy $x$ przed nawias: $x(${kw}) = 0$, więc $x = 0$ lub $${kw} = 0$.`,
      krokDelta,
    ]);
  }
}

// --- Równania wymierne

/** Dziedzina ułamka: które liczby nie należą do dziedziny (suma, ile, największa). */
function rwDziedzina(r) {
  for (;;) {
    const typ = zWagami(r, [[0.6, 0], [0.2, 1], [0.2, 2]]);
    let mianownik, wykluczone, opis;
    if (typ === 0) {
      const ile = r.chance(0.55) ? 2 : 3;
      const czynniki = [];
      while (czynniki.length < ile) {
        const a = r.pick([1, 1, 1, 2, 3]);
        const b = czynniki.length === 0 && r.chance(0.2) ? 0 : r.intBez(-7, 7, 0);
        const x = q(-b, a);
        if (czynniki.some((c) => c.x.eq(x))) continue;
        czynniki.push({ a, b, x });
      }
      mianownik = czynniki.map((c) => (c.b === 0 && c.a === 1 ? "x" : `(${wielomianTex([c.a, c.b])})`)).join("");
      wykluczone = czynniki.map((c) => c.x);
      opis = `Iloczyn jest zerem, gdy któryś czynnik jest zerem: ${czynniki.map((c) => `$${wielomianTex([c.a, c.b])} = 0$ daje $x = ${tex(c.x)}$`).join(", ")}.`;
    } else if (typ === 1) {
      const c = r.int(2, 9);
      mianownik = `x^{2} - ${c * c}`;
      wykluczone = [q(c), q(-c)];
      opis = `Rozkładamy mianownik: $x^{2} - ${c * c} = (x - ${c})(x + ${c})$, więc jest zerem dla $x = ${c}$ i $x = ${-c}$.`;
    } else {
      const u = r.intBez(-6, 6, 0);
      const v = r.intBez(-6, 6, 0, -u);
      mianownik = `${nawiasMinus(u)}^{2}${nawiasMinus(-v)}`;
      wykluczone = [q(u), q(-v)];
      opis = `Mianownik jest zerem, gdy $x = ${u}$ (czynnik z kwadratem) albo $x = ${-v}$.`;
    }
    const licznik = r.pick(["x + 1", "x - 2", "2x + 3", "x", "5", "3"]);
    const wyr = `\\frac{${licznik}}{${mianownik}}`;
    const posortowane = [...wykluczone].sort((a, b) => a.cmp(b));
    const suma = wykluczone.reduce((s, x) => s.add(x), q(0));
    const ask = r.pick(["suma", "ile", "najw"]);
    if (ask === "suma" && suma.zero) continue;
    const tresc = {
      suma: `Podaj sumę wszystkich liczb rzeczywistych, dla których wyrażenie $${wyr}$ nie ma sensu liczbowego.`,
      ile: `Wyrażenie $${wyr}$ nie ma sensu liczbowego dla pewnych liczb rzeczywistych. Ile jest takich liczb?`,
      najw: `Podaj największą liczbę rzeczywistą, dla której wyrażenie $${wyr}$ nie ma sensu liczbowego.`,
    }[ask];
    const odp = ask === "suma" ? suma : ask === "ile" ? q(posortowane.length) : posortowane[posortowane.length - 1];
    return {
      tresc,
      pola: [poleLiczba("w", ask === "suma" ? "Suma liczb" : ask === "ile" ? "Liczba liczb" : "Największa liczba")],
      odpowiedz: { w: odp },
      wynik: `$${tex(odp)}$`,
      rozwiazanie: [
        "Ułamek ma sens liczbowy tylko wtedy, gdy mianownik jest różny od zera. Licznik nie ma znaczenia.",
        opis,
        `Zatem dziedziną jest $\\mathbb{R} \\setminus \\{${posortowane.map(tex).join(", ")}\\}$, a szukana liczba to $${tex(odp)}$.`,
      ],
    };
  }
}

/** Zbiór rozwiązań z odrzuceniem liczb spoza dziedziny: pole liczba (jedno) albo zbior (dwa). */
function rwWynikPola(rozw) {
  const posortowane = [...rozw].sort((a, b) => a.cmp(b));
  return posortowane.length === 1
    ? { pola: [poleLiczba("x", "$x =$")], odpowiedz: { x: posortowane[0] }, wynik: `$x = ${tex(posortowane[0])}$` }
    : { pola: [{ id: "x", typ: "zbior", ile: posortowane.length, etykieta: "Rozwiązania" }], odpowiedz: { x: posortowane }, wynik: `$${zbiorTex(posortowane)}$` };
}

/** Ułamek równy zero: trójmian w liczniku, liniowy mianownik – jedno z rozwiązań bywa odrzucone. */
function rwUlamekZero(r) {
  for (;;) {
    const p = r.int(-6, 6);
    const qq = r.int(-6, 6);
    if (p === qq) continue;
    const k = r.pick([1, 1, 1, 2, -1]);
    const [A, B, C] = trojmian(q(p), q(qq), k);
    const r0 = r.chance(0.6) ? r.pick([p, qq]) : r.intBez(-6, 6, p, qq);
    const [krokDelta, m1, m2] = deltaKrok(A, B, C);
    const wazne = [m1, m2].filter((x) => !x.eq(r0));
    const licz = wielomianTex([A, B, C]);
    const mian = wielomianTex([1, -r0]);
    return {
      tresc: `${r.pick(TRESC_ROWNANIE)} $\\frac{${licz}}{${mian}} = 0$.`,
      ...rwWynikPola(wazne),
      rozwiazanie: [
        `Zakładamy, że mianownik nie jest zerem: $${mian} \\neq 0$, czyli $x \\neq ${r0}$.`,
        `Ułamek jest równy zero, gdy licznik jest zerem: $${licz} = 0$.`,
        krokDelta,
        wazne.length === 1
          ? `Liczba $${r0}$ nie spełnia założenia $x \\neq ${r0}$, więc ją odrzucamy. Zostaje $x = ${tex(wazne[0])}$.`
          : `Obie liczby są różne od $${r0}$, więc spełniają założenie.`,
      ],
    };
  }
}

/** a/(x + m) = b/(x + n): po pomnożeniu na krzyż równanie liniowe. */
function rwProporcjaLin(r) {
  for (;;) {
    const a = r.int(1, 9);
    const b = r.int(1, 9);
    const m = r.intBez(-6, 6, 0);
    const n = r.intBez(-6, 6, 0);
    if (a === b || m === n) continue;
    const x0 = q(b * m - a * n, a - b);
    if (x0.d > 3 || Math.abs(x0.valueOf()) > 30 || x0.eq(-m) || x0.eq(-n)) continue;
    return {
      tresc: `${r.pick(TRESC_ROWNANIE)} $\\frac{${a}}{${wielomianTex([1, m])}} = \\frac{${b}}{${wielomianTex([1, n])}}$.`,
      ...rwWynikPola([x0]),
      rozwiazanie: [
        `Założenia: $${wielomianTex([1, m])} \\neq 0$ i $${wielomianTex([1, n])} \\neq 0$, czyli $x \\neq ${-m}$ i $x \\neq ${-n}$.`,
        `Mnożymy na krzyż: $${przez(a, wielomianTex([1, n]))} = ${przez(b, wielomianTex([1, m]))}$, czyli $${skladnikiTex([[a, "x"], [a * n, ""]])} = ${skladnikiTex([[b, "x"], [b * m, ""]])}$.`,
        `Stąd $${wielomianTex([a - b, 0])} = ${b * m - a * n}$, więc $x = ${tex(x0)}$.`,
        "Ta liczba spełnia założenia, więc jest rozwiązaniem.",
      ],
    };
  }
}

/** Współczynnik przy liczniku: 1 -> "", -1 -> "-". */
const wspTex = (c) => (c === 1 ? "" : c === -1 ? "-" : String(c));

/** Współczynnik razy wyrażenie: przez(2, "x + 1") -> "2(x + 1)", przez(-1, "x") -> "-x". */
const przez = (c, wyr) => (c === 1 ? wyr : /^\w+$/.test(wyr) ? `${wspTex(c)}${wyr}` : `${wspTex(c)}(${wyr})`);

/** a/(x − p) = (x − s)/(x − t): po pomnożeniu na krzyż równanie kwadratowe. */
function rwProporcjaKw(r) {
  for (let proba = 0; proba < 400; proba++) {
    const a = r.intBez(-6, 6, 0);
    const p = r.int(-5, 5);
    const s = r.int(-5, 5);
    const t = r.int(-5, 5);
    if (p === t || s === t) continue;
    const B = -(s + p + a);
    const C = s * p + a * t;
    const delta = B * B - 4 * C;
    const sD = Math.round(Math.sqrt(delta));
    if (delta <= 0 || sD * sD !== delta) continue;
    const korzenie = [(-B - sD) / 2, (-B + sD) / 2];
    const wazne = korzenie.filter((x) => x !== p && x !== t).map((x) => q(x));
    if (!wazne.length) continue;
    const [m1, m2] = [wielomianTex([1, -p]), wielomianTex([1, -t])];
    const odrzucone = korzenie.filter((x) => x === p || x === t);
    return {
      tresc: `${r.pick(TRESC_ROWNANIE)} $\\frac{${a}}{${m1}} = \\frac{${wielomianTex([1, -s])}}{${m2}}$.`,
      ...rwWynikPola(wazne),
      rozwiazanie: [
        `Założenia: $${m1} \\neq 0$ i $${m2} \\neq 0$, czyli $x \\neq ${p}$ i $x \\neq ${t}$.`,
        `Mnożymy na krzyż: $${przez(a, m2)} = (${wielomianTex([1, -s])})(${m1})$, czyli $${wielomianTex([a, -a * t])} = ${wielomianTex(wMnoz([1, -s], [1, -p]))}$.`,
        `Przenosimy wszystko na prawą stronę: $${wielomianTex([1, B, C])} = 0$.`,
        deltaKrok(1, B, C)[0],
        odrzucone.length
          ? `Liczba $${odrzucone[0]}$ nie spełnia założeń, więc ją odrzucamy. Rozwiązaniem jest $x = ${tex(wazne[0])}$.`
          : "Obie liczby spełniają założenia, więc są rozwiązaniami.",
      ],
    };
  }
  return rwProporcjaLin(r);
}

/** a/x + b/(x + c) = d: wspólny mianownik, równanie kwadratowe. */
function rwSumaUlamkow(r) {
  for (let proba = 0; proba < 400; proba++) {
    const a = r.int(1, 4);
    const b = r.int(1, 4);
    const c = r.intBez(-4, 4, 0);
    const d = r.pick([1, 1, 2, 3]);
    const [A, B, C] = [d, d * c - (a + b), -a * c];
    let krokDelta, m1, m2;
    try {
      [krokDelta, m1, m2] = deltaKrok(A, B, C);
    } catch {
      continue;
    }
    const wazne = [m1, m2].filter((x) => !x.zero && !x.eq(-c));
    if (!wazne.length) continue;
    return {
      tresc: `${r.pick(TRESC_ROWNANIE)} $\\frac{${a}}{x} + \\frac{${b}}{${wielomianTex([1, c])}} = ${d}$.`,
      ...rwWynikPola(wazne),
      rozwiazanie: [
        `Założenia: $x \\neq 0$ i $${wielomianTex([1, c])} \\neq 0$, czyli $x \\neq ${-c}$.`,
        `Mnożymy obie strony przez $x(${wielomianTex([1, c])})$: $${wspTex(a)}(${wielomianTex([1, c])}) + ${wspTex(b)}x = ${wspTex(d)}x(${wielomianTex([1, c])})$, czyli $${wielomianTex([a + b, a * c])} = ${wielomianTex([d, d * c, 0])}$.`,
        `Przenosimy wszystko na prawą stronę: $${wielomianTex([A, B, C])} = 0$.`,
        krokDelta,
        wazne.length === 1
          ? `Liczba $${tex([m1, m2].find((x) => !wazne.includes(x)))}$ nie spełnia założeń, więc ją odrzucamy. Rozwiązaniem jest $x = ${tex(wazne[0])}$.`
          : "Obie liczby spełniają założenia, więc są rozwiązaniami.",
      ],
    };
  }
  return rwProporcjaLin(r);
}

const GODZINY = ["godzinę", "godziny", "godzin"];
const DNI = ["dzień", "dni", "dni"];

const KONTEKSTY_RUCH = [
  { v: [10, 24], d: [2, 3, 4, 5, 6], t: [1], smax: 120, opis: (s, d, t) => `Rowerzysta przejechał trasę długości ${s} km ze stałą prędkością. Gdyby jechał z prędkością większą o ${d} km/h, pokonałby tę trasę o ${zRzecz(t, GODZINY)} krócej. Oblicz, z jaką prędkością jechał rowerzysta.` },
  { v: [40, 90], d: [10, 20], t: [1, 2], smax: 400, opis: (s, d, t) => `Kierowca pokonał trasę długości ${s} km ze stałą prędkością. Gdyby zwiększył prędkość o ${d} km/h, dojechałby do celu o ${zRzecz(t, GODZINY)} wcześniej. Oblicz, z jaką prędkością jechał kierowca.` },
  { v: [60, 120], d: [10, 20, 30], t: [1, 2], smax: 500, opis: (s, d, t) => `Pociąg przejechał trasę długości ${s} km ze stałą prędkością. Gdyby jego prędkość była większa o ${d} km/h, podróż trwałaby o ${zRzecz(t, GODZINY)} krócej. Oblicz prędkość pociągu.` },
];

const KONTEKSTY_PRACA = [
  {
    jedn: DNI, w: "dniach", gen: ["pierwszego robotnika", "drugiego robotnika"], os: ["pierwszy robotnik", "drugi robotnik"], czyn: "wykonuje", cel: "pracy",
    opis: (d, T) => `Pierwszy robotnik wykonałby pewną pracę o ${zRzecz(d, DNI)} szybciej niż drugi. Gdy pracują razem, wykonują ją w ${zRzecz(T, DNI)}.`,
    pyt: ["W ile dni wykona tę pracę sam pierwszy robotnik?", "W ile dni wykona tę pracę sam drugi robotnik?"],
  },
  {
    jedn: GODZINY, w: "godzinach", gen: ["pierwszej pompy", "drugiej pompy"], os: ["pierwsza pompa", "druga pompa"], czyn: "napełnia", cel: "basenu",
    opis: (d, T) => `Pierwsza pompa napełnia basen o ${zRzecz(d, GODZINY)} szybciej niż druga. Pracując razem, napełniają go w ${zRzecz(T, GODZINY)}.`,
    pyt: ["W ile godzin basen napełni sama pierwsza pompa?", "W ile godzin basen napełni sama druga pompa?"],
  },
  {
    jedn: DNI, w: "dniach", gen: ["pierwszego malarza", "drugiego malarza"], os: ["pierwszy malarz", "drugi malarz"], czyn: "maluje", cel: "mieszkania",
    opis: (d, T) => `Pierwszy malarz pomalowałby całe mieszkanie o ${zRzecz(d, DNI)} szybciej niż drugi. Gdy malują razem, kończą w ${zRzecz(T, DNI)}.`,
    pyt: ["W ile dni mieszkanie pomaluje sam pierwszy malarz?", "W ile dni mieszkanie pomaluje sam drugi malarz?"],
  },
];

/** Zadanie tekstowe z równaniem wymiernym: ruch (czas = droga / prędkość) albo wspólna praca. */
function rwTekst(r) {
  if (r.chance(0.5)) {
    const k = r.pick(KONTEKSTY_RUCH);
    for (;;) {
      const v = r.int(k.v[0], k.v[1]);
      const d = r.pick(k.d);
      const t = r.pick(k.t);
      const s = (t * v * (v + d)) / d;
      if (!Number.isInteger(s) || s > k.smax || s < 20) continue;
      const [A, B, C] = [t, t * d, -s * d];
      return {
        tresc: k.opis(s, d, t),
        pola: [poleLiczba("w", "Prędkość (km/h)")],
        odpowiedz: { w: v },
        wynik: `$${v}$ km/h`,
        rozwiazanie: [
          `Niech $x$ – prędkość (w km/h), $x > 0$. Czas jazdy to $\\frac{${s}}{x}$ godzin, a po zwiększeniu prędkości $\\frac{${s}}{x + ${d}}$ godzin.`,
          `Różnica czasów wynosi ${t} godz.: $\\frac{${s}}{x} - \\frac{${s}}{x + ${d}} = ${t}$.`,
          `Mnożymy przez $x(x + ${d})$: $${s}(x + ${d}) - ${s}x = ${wspTex(t)}x(x + ${d})$, czyli $${s * d} = ${wielomianTex([t, t * d, 0])}$.`,
          `Stąd $${wielomianTex([A, B, C])} = 0$. ${deltaKrok(A, B, C)[0]}`,
          `Prędkość jest dodatnia, więc $x = ${v}$ km/h.`,
        ],
      };
    }
  }
  const k = r.pick(KONTEKSTY_PRACA);
  for (;;) {
    const x = r.int(3, 40);
    const d = r.int(1, 24);
    const T = (x * (x + d)) / (2 * x + d);
    if (!Number.isInteger(T) || T < 2 || T > 24) continue;
    const ktory = r.int(0, 1);
    const wynik = ktory === 0 ? x : x + d;
    return {
      tresc: `${k.opis(d, T)} ${k.pyt[ktory]}`,
      pola: [poleLiczba("w", `Czas (${k.jedn[2]})`)],
      odpowiedz: { w: wynik },
      wynik: `$${wynik}$ ${k.jedn[2]}`,
      rozwiazanie: [
        `Niech $x$ – czas samodzielnej pracy ${k.gen[0]} (w ${k.w}), $x > 0$. Czas samodzielnej pracy ${k.gen[1]} to $x + ${d}$.`,
        `W jednostce czasu ${k.os[0]} ${k.czyn} $\\frac{1}{x}$ ${k.cel}, ${k.os[1]} $\\frac{1}{x + ${d}}$ ${k.cel}, a razem $\\frac{1}{${T}}$ ${k.cel}. Stąd $\\frac{1}{x} + \\frac{1}{x + ${d}} = \\frac{1}{${T}}$.`,
        `Mnożymy przez $${T}x(x + ${d})$: $${T}(x + ${d}) + ${T}x = x(x + ${d})$, czyli $${wielomianTex([2 * T, T * d])} = ${wielomianTex([1, d, 0])}$.`,
        `Stąd $${wielomianTex([1, d - 2 * T, -T * d])} = 0$. ${deltaKrok(1, d - 2 * T, -T * d)[0]}`,
        `Czas jest dodatni, więc $x = ${x}$, a $x + ${d} = ${x + d}$ ${k.jedn[2]}.`,
      ],
    };
  }
}

// --- Układy równań liniowych

/** Składnik ze znakiem do doklejenia: znakSkl(-3, "y") -> "- 3y", znakSkl(1, "y") -> "+ y". */
const znakSkl = (c, lit) => `${c < 0 ? "-" : "+"} ${Math.abs(c) === 1 && lit ? "" : Math.abs(c)}${lit}`;

/** Iloczyn współczynnika i wartości w LaTeX: razy(1, "3") -> "3", razy(-1, "3") -> "-3", razy(2, "(-3)") -> "2 \cdot (-3)". */
const razy = (c, wart) => (c === 1 ? wart : c === -1 ? `-${wart}` : `${c} \\cdot ${wart}`);

/** Rozwiązanie układu a1x + b1y = c1, a2x + b2y = c2 krok po kroku: metoda "podstawiania" lub "przeciwnych". */
function urKroki(a1, b1, c1, a2, b2, c2, metoda) {
  const rown = [[a1, b1, c1], [a2, b2, c2]];
  const lin = (a, b) => skladnikiTex([[a, "x"], [b, "y"]]);
  const det = a1 * b2 - a2 * b1;
  const x0 = q(c1 * b2 - c2 * b1, det);
  const y0 = q(a1 * c2 - a2 * c1, det);
  const nazwa = ["pierwszego", "drugiego"];
  const lit = ["x", "y"];
  const kroki = [];
  if (metoda === "podstawiania") {
    let i = -1;
    let v = -1;
    for (const [ii, vv] of [[0, 1], [0, 0], [1, 1], [1, 0]]) {
      if (Math.abs(rown[ii][vv]) === 1) {
        [i, v] = [ii, vv];
        break;
      }
    }
    if (i < 0) throw new Error("Brak współczynnika 1 lub -1");
    const j = 1 - i;
    const inna = 1 - v;
    const f = rown[i][v];
    const [wi, ci] = [rown[i][inna], rown[i][2]];
    const wyraz = skladnikiTex([[-f * wi, lit[inna]], [f * ci, ""]]);
    kroki.push(`Z ${nazwa[i]} równania wyznaczamy $${lit[v]} = ${wyraz}$.`);
    const [wv, wo, cj] = [rown[j][v], rown[j][inna], rown[j][2]];
    const bezNawiasu = wv === 1 && !wyraz.startsWith("-");
    const tekst = bezNawiasu ? wyraz : `${Math.abs(wv) === 1 ? "" : Math.abs(wv)}(${wyraz})`;
    const lewa = v === 1
      ? `${skladnikiTex([[wo, "x"]])} ${wv < 0 ? "-" : "+"} ${tekst}`
      : `${wv < 0 ? "-" : ""}${tekst} ${znakSkl(wo, "y")}`;
    const K = wo + wv * (-f * wi);
    const M = cj - wv * f * ci;
    const wartInna = q(M, K);
    const wartV = wartInna.mul(-f * wi).add(f * ci);
    kroki.push(`Podstawiamy do ${nazwa[j]} równania: $${lewa} = ${cj}$, czyli ${K === 1 ? "" : `$${skladnikiTex([[K, lit[inna]]])} = ${M}$, więc `}$${lit[inna]} = ${tex(wartInna)}$.`);
    kroki.push(`Z $${lit[v]} = ${wyraz}$ dla $${lit[inna]} = ${tex(wartInna)}$ dostajemy $${lit[v]} = ${tex(wartV)}$.`);
  } else {
    const Lx = nww(Math.abs(a1), Math.abs(a2));
    const Ly = nww(Math.abs(b1), Math.abs(b2));
    const zYbezY = Ly <= Lx;
    const [c1v, c2v] = zYbezY ? [b1, b2] : [a1, a2];
    const L = zYbezY ? Ly : Lx;
    const m1 = L / Math.abs(c1v);
    const m2 = (-Math.sign(c1v) * L) / c2v;
    const znika = zYbezY ? "y" : "x";
    const zostaje = zYbezY ? "x" : "y";
    if (m1 !== 1 || m2 !== 1) {
      const co = m1 !== 1 && m2 !== 1 ? `pierwsze równanie przez $${m1}$, a drugie przez $${m2}$` : m1 !== 1 ? `pierwsze równanie przez $${m1}$` : `drugie równanie przez $${m2}$`;
      kroki.push(`Mnożymy ${co}, żeby przy $${znika}$ stały liczby przeciwne: $${lin(m1 * a1, m1 * b1)} = ${m1 * c1}$ oraz $${lin(m2 * a2, m2 * b2)} = ${m2 * c2}$.`);
    } else {
      kroki.push(`Przy $${znika}$ stoją liczby przeciwne, więc od razu dodajemy równania stronami.`);
    }
    const S = zYbezY ? m1 * a1 + m2 * a2 : m1 * b1 + m2 * b2;
    const R = m1 * c1 + m2 * c2;
    const wartZostaje = q(R, S);
    kroki.push(`Dodajemy równania stronami, wtedy $${znika}$ się redukuje: $${skladnikiTex([[S, zostaje]])} = ${R}$, więc $${zostaje} = ${tex(wartZostaje)}$.`);
    kroki.push(zYbezY
      ? `Podstawiamy $x = ${tex(x0)}$ do pierwszego równania: $${razy(a1, texNawias(x0))} ${znakSkl(b1, "y")} = ${c1}$, więc $y = ${tex(y0)}$.`
      : `Podstawiamy $y = ${tex(y0)}$ do pierwszego równania: $${skladnikiTex([[a1, "x"]])} ${b1 < 0 ? "-" : "+"} ${razy(Math.abs(b1), texNawias(y0))} = ${c1}$, więc $x = ${tex(x0)}$.`);
  }
  kroki.push(`Sprawdzenie w drugim równaniu: $${razy(a2, texNawias(x0))} ${b2 < 0 ? "-" : "+"} ${razy(Math.abs(b2), texNawias(y0))} = ${c2}$.`);
  return { kroki, x0, y0 };
}

/** Układ równań: rozwiązanie (podstawianie albo przeciwne współczynniki), przecięcie prostych, parametr. */
function urRozwiaz(r) {
  const rodzaj = zWagami(r, [[0.65, 0], [0.2, 1], [0.15, 2]]);
  if (rodzaj === 1) {
    for (;;) {
      const [x0, y0] = [r.int(-5, 6), r.int(-8, 9)];
      const m1 = r.intBez(-3, 3, 0);
      const m2 = r.intBez(-3, 3, 0, m1);
      const k1 = y0 - m1 * x0;
      const k2 = y0 - m2 * x0;
      if (Math.abs(k1) > 15 || Math.abs(k2) > 15) continue;
      const [f1, f2] = [wielomianTex([m1, k1]), wielomianTex([m2, k2])];
      const wartY = (m, k) => `${razy(m, texNawias(x0))}${k === 0 ? "" : ` ${plusMinus(k)}`}`;
      return {
        tresc: `Proste $k: y = ${f1}$ i $l: y = ${f2}$ przecinają się w punkcie $P$. Oblicz współrzędne punktu $P$.`,
        pola: [poleLiczba("x", "$x_{P} =$"), poleLiczba("y", "$y_{P} =$")],
        odpowiedz: { x: x0, y: y0 },
        wynik: `$P = (${x0}, ${y0})$`,
        rozwiazanie: [
          `W punkcie przecięcia obie proste mają te same współrzędne, więc $${f1} = ${f2}$.`,
          `Stąd $${wielomianTex([m1 - m2, 0])} = ${k2 - k1}$, czyli $x = ${x0}$.`,
          `Z równania prostej $k$: $y = ${wartY(m1, k1)} = ${y0}$.`,
          `Punkt przecięcia: $P = (${x0}, ${y0})$.`,
        ],
      };
    }
  }
  if (rodzaj === 2) {
    const a1 = r.intBez(-4, 4, 0);
    const b1 = r.int(1, 3);
    const c1 = r.intBez(-9, 9, 0);
    const t = r.pick([2, 3, -1, -2]);
    const sprzeczny = r.chance(0.5);
    const c2 = t * c1 + (sprzeczny ? r.intBez(-5, 5, 0) : 0);
    const m = t * a1;
    return {
      tresc: `Dla jakiej wartości parametru $m$ układ równań $\\begin{cases} ${skladnikiTex([[a1, "x"], [b1, "y"]])} = ${c1} \\\\ mx ${znakSkl(t * b1, "y")} = ${c2} \\end{cases}$ ${sprzeczny ? "jest sprzeczny" : "ma nieskończenie wiele rozwiązań"}?`,
      pola: [poleLiczba("w", "$m =$")],
      odpowiedz: { w: m },
      wynik: `$m = ${m}$`,
      rozwiazanie: [
        sprzeczny ? "Układ jest sprzeczny, gdy proste są równoległe, ale się nie pokrywają." : "Układ ma nieskończenie wiele rozwiązań, gdy równania opisują tę samą prostą.",
        `Mnożymy pierwsze równanie przez $${t}$, żeby przy $y$ stały te same liczby co w drugim: $${skladnikiTex([[t * a1, "x"], [t * b1, "y"]])} = ${t * c1}$.`,
        `Współczynniki przy $x$ muszą być równe, więc $m = ${m}$.`,
        sprzeczny
          ? `Wtedy lewe strony są takie same, a prawe różne ($${t * c1}$ i $${c2}$), więc układ jest sprzeczny.`
          : `Wtedy równania są takie same (prawe strony: $${t * c1}$ i $${c2}$), więc rozwiązań jest nieskończenie wiele.`,
      ],
    };
  }
  for (;;) {
    const calk = r.chance(0.8);
    const x0 = calk ? q(r.int(-6, 8)) : q(r.int(-9, 9), 2);
    const y0 = calk ? q(r.int(-6, 8)) : q(r.int(-9, 9), 2);
    if (x0.eq(y0) || x0.zero || y0.zero) continue;
    const [a1, b1, a2, b2] = [0, 0, 0, 0].map(() => r.intBez(-5, 5, 0));
    if (a1 * b2 - a2 * b1 === 0) continue;
    const c1 = x0.mul(a1).add(y0.mul(b1));
    const c2 = x0.mul(a2).add(y0.mul(b2));
    if (!c1.calkowita || !c2.calkowita || Math.abs(c1.n) > 40 || Math.abs(c2.n) > 40) continue;
    const jedynka = [a1, b1, a2, b2].some((c) => Math.abs(c) === 1);
    const metoda = jedynka && r.chance(0.5) ? "podstawiania" : "przeciwnych";
    const { kroki, x0: wx, y0: wy } = urKroki(a1, b1, c1.n, a2, b2, c2.n, metoda);
    if (!wx.eq(x0) || !wy.eq(y0)) throw new Error("Rozwiązanie układu nie zgadza się z założonym");
    const lin = (a, b) => skladnikiTex([[a, "x"], [b, "y"]]);
    const poleceniem = r.pick(["", "", metoda === "podstawiania" ? " metodą podstawiania" : " metodą przeciwnych współczynników"]);
    return {
      tresc: `Rozwiąż układ równań $\\begin{cases} ${lin(a1, b1)} = ${c1.n} \\\\ ${lin(a2, b2)} = ${c2.n} \\end{cases}$${poleceniem}.`,
      pola: [poleLiczba("x", "$x =$"), poleLiczba("y", "$y =$")],
      odpowiedz: { x: x0, y: y0 },
      wynik: `$x = ${tex(x0)}$, $y = ${tex(y0)}$`,
      rozwiazanie: kroki,
    };
  }
}

// Zakupy do zadań tekstowych: odmiana nazw (1 / 2–4 / 5+), dopełniacz liczby pojedynczej, zakresy cen, "razem ... " i miejsce.
const ZAKUPY = [
  { miejsce: "W sklepie papierniczym", a: ["zeszyt", "zeszyty", "zeszytów"], b: ["długopis", "długopisy", "długopisów"], aG: "zeszytu", bG: "długopisu", ja: "jednego", jb: "jednego", pa: [3, 8], pb: [1, 5], razem: ["sztukę", "sztuki", "sztuk"] },
  { miejsce: "W kasie kina", a: ["bilet normalny", "bilety normalne", "biletów normalnych"], b: ["bilet ulgowy", "bilety ulgowe", "biletów ulgowych"], aG: "biletu normalnego", bG: "biletu ulgowego", ja: "jednego", jb: "jednego", pa: [18, 32], pb: [10, 17], razem: ["bilet", "bilety", "biletów"] },
  { miejsce: "W piekarni", a: ["bułka", "bułki", "bułek"], b: ["drożdżówka", "drożdżówki", "drożdżówek"], aG: "bułki", bG: "drożdżówki", ja: "jednej", jb: "jednej", pa: [1, 3], pb: [3, 6], razem: ["sztukę", "sztuki", "sztuk"] },
  { miejsce: "W barze", a: ["sok", "soki", "soków"], b: ["kanapka", "kanapki", "kanapek"], aG: "soku", bG: "kanapki", ja: "jednego", jb: "jednej", pa: [3, 6], pb: [5, 10], razem: ["sztukę", "sztuki", "sztuk"] },
  { miejsce: "W sklepie papierniczym", a: ["ołówek", "ołówki", "ołówków"], b: ["gumka", "gumki", "gumek"], aG: "ołówka", bG: "gumki", ja: "jednego", jb: "jednej", pa: [2, 5], pb: [1, 3], razem: ["sztukę", "sztuki", "sztuk"] },
];

const duzaLitera = (s) => s[0].toUpperCase() + s.slice(1);
const LATA = ["rok", "lata", "lat"];

// Pary wiekowe: starszy, młodszy (mianownik), przymiotnik, dopełniacz, zakres wieku młodszego i krotności.
const WIEK = [
  { st: "matka", ml: "córka", prz: "starsza", stG: "matki", mlG: "córki", mlody: [10, 14], k: [3, 4], roznica: [24, 26, 28, 30, 32, 35] },
  { st: "ojciec", ml: "syn", prz: "starszy", stG: "ojca", mlG: "syna", mlody: [10, 14], k: [3, 4], roznica: [26, 28, 30, 32, 35] },
  { st: "babcia", ml: "wnuczka", prz: "starsza", stG: "babci", mlG: "wnuczki", mlody: [10, 13], k: [5, 6], roznica: [48, 50, 52, 54, 56] },
  { st: "dziadek", ml: "wnuk", prz: "starszy", stG: "dziadka", mlG: "wnuka", mlody: [9, 12], k: [6, 7], roznica: [50, 52, 54, 56, 58] },
];

/** Układ równań w zadaniu tekstowym: ceny, liczba sztuk, boki prostokąta, wiek. */
function urTekstowe(r) {
  const rodzaj = zWagami(r, [[0.35, 0], [0.25, 1], [0.2, 2], [0.2, 3]]);
  if (rodzaj === 0) {
    const z = r.pick(ZAKUPY);
    for (;;) {
      const x = r.int(...z.pa);
      const y = r.int(...z.pb);
      const [n1, m1, n2, m2] = [r.int(1, 6), r.int(1, 6), r.int(1, 6), r.int(1, 6)];
      if (x === y || n1 * m2 - n2 * m1 === 0) continue;
      const [S1, S2] = [n1 * x + m1 * y, n2 * x + m2 * y];
      const { kroki } = urKroki(n1, m1, S1, n2, m2, S2, "przeciwnych");
      const lin = (a, b) => skladnikiTex([[a, "x"], [b, "y"]]);
      return {
        tresc: `Za ${zRzecz(n1, z.a)} i ${zRzecz(m1, z.b)} zapłacono ${S1} zł, a za ${zRzecz(n2, z.a)} i ${zRzecz(m2, z.b)} – ${S2} zł. Oblicz cenę ${z.ja} ${z.aG} i cenę ${z.jb} ${z.bG}.`,
        pola: [poleLiczba("x", `Cena ${z.aG} (zł)`), poleLiczba("y", `Cena ${z.bG} (zł)`)],
        odpowiedz: { x, y },
        wynik: `Cena ${z.aG}: $${x}$ zł, cena ${z.bG}: $${y}$ zł.`,
        rozwiazanie: [
          `Niech $x$ – cena ${z.aG}, a $y$ – cena ${z.bG} (w zł). Wtedy $${lin(n1, m1)} = ${S1}$ oraz $${lin(n2, m2)} = ${S2}$.`,
          ...kroki,
        ],
      };
    }
  }
  if (rodzaj === 1) {
    const z = r.pick(ZAKUPY);
    for (;;) {
      const [p, qq] = [r.int(...z.pa), r.int(...z.pb)];
      const [x, y] = [r.int(2, 12), r.int(2, 12)];
      if (p === qq || x === y) continue;
      const [n, S] = [x + y, p * x + qq * y];
      const { kroki } = urKroki(1, 1, n, p, qq, S, "podstawiania");
      return {
        tresc: `${z.miejsce} kupiono ${z.a[1]} po ${p} zł i ${z.b[1]} po ${qq} zł, razem ${zRzecz(n, z.razem)}, za łączną kwotę ${S} zł. Ile kupiono ${z.a[2]}, a ile ${z.b[2]}?`,
        pola: [poleLiczba("x", `Liczba ${z.a[2]}`), poleLiczba("y", `Liczba ${z.b[2]}`)],
        odpowiedz: { x, y },
        wynik: `${duzaLitera(z.a[2])}: $${x}$, ${z.b[2]}: $${y}$.`,
        rozwiazanie: [
          `Niech $x$ – liczba ${z.a[2]}, a $y$ – liczba ${z.b[2]}. Wtedy $x + y = ${n}$ oraz $${skladnikiTex([[p, "x"], [qq, "y"]])} = ${S}$.`,
          ...kroki,
        ],
      };
    }
  }
  if (rodzaj === 2) {
    const roznica = r.chance(0.5);
    const y = r.int(3, 15);
    if (roznica) {
      const d = r.int(1, 12);
      const x = y + d;
      const L = 2 * (x + y);
      return {
        tresc: `Obwód prostokąta wynosi ${L} cm, a jeden z jego boków jest o ${d} cm dłuższy od drugiego. Oblicz długości boków tego prostokąta.`,
        pola: [poleLiczba("x", "Dłuższy bok (cm)"), poleLiczba("y", "Krótszy bok (cm)")],
        odpowiedz: { x, y },
        wynik: `Dłuższy bok: $${x}$ cm, krótszy bok: $${y}$ cm.`,
        rozwiazanie: [
          `Niech $x$ – dłuższy bok, $y$ – krótszy bok (w cm). Wtedy $x - y = ${d}$ oraz $2x + 2y = ${L}$.`,
          ...urKroki(1, -1, d, 2, 2, L, "podstawiania").kroki,
        ],
      };
    }
    const k = r.pick([2, 3, 4]);
    const x = k * y;
    const L = 2 * (x + y);
    return {
      tresc: `Jeden bok prostokąta jest ${k} razy dłuższy od drugiego, a obwód prostokąta wynosi ${L} cm. Oblicz długości boków tego prostokąta.`,
      pola: [poleLiczba("x", "Dłuższy bok (cm)"), poleLiczba("y", "Krótszy bok (cm)")],
      odpowiedz: { x, y },
      wynik: `Dłuższy bok: $${x}$ cm, krótszy bok: $${y}$ cm.`,
      rozwiazanie: [
        `Niech $x$ – dłuższy bok, $y$ – krótszy bok (w cm). Wtedy $x = ${k}y$ oraz $2x + 2y = ${L}$.`,
        ...urKroki(1, -k, 0, 2, 2, L, "podstawiania").kroki,
      ],
    };
  }
  const w = r.pick(WIEK);
  const y = r.int(...w.mlody);
  if (r.chance(0.5)) {
    const k = r.int(...w.k);
    const x = k * y;
    const S = x + y;
    return {
      tresc: `${duzaLitera(w.st)} i ${w.ml} mają razem ${zRzecz(S, LATA)}. ${duzaLitera(w.st)} jest ${k} razy ${w.prz} od ${w.mlG}. Ile lat ma ${w.st}, a ile ${w.ml}?`,
      pola: [poleLiczba("x", `Wiek ${w.stG} (w latach)`), poleLiczba("y", `Wiek ${w.mlG} (w latach)`)],
      odpowiedz: { x, y },
      wynik: `${duzaLitera(w.st)}: $${x}$ ${odmiana(x, LATA)}, ${w.ml}: $${y}$ ${odmiana(y, LATA)}.`,
      rozwiazanie: [
        `Niech $x$ – wiek ${w.stG}, $y$ – wiek ${w.mlG} (w latach). Wtedy $x = ${k}y$ oraz $x + y = ${S}$.`,
        ...urKroki(1, -k, 0, 1, 1, S, "podstawiania").kroki,
      ],
    };
  }
  const d = r.pick(w.roznica);
  const x = y + d;
  const S = x + y;
  return {
    tresc: `${duzaLitera(w.st)} jest o ${zRzecz(d, LATA)} ${w.prz} od ${w.mlG}, a razem mają ${zRzecz(S, LATA)}. Ile lat ma ${w.st}, a ile ${w.ml}?`,
    pola: [poleLiczba("x", `Wiek ${w.stG} (w latach)`), poleLiczba("y", `Wiek ${w.mlG} (w latach)`)],
    odpowiedz: { x, y },
    wynik: `${duzaLitera(w.st)}: $${x}$ ${odmiana(x, LATA)}, ${w.ml}: $${y}$ ${odmiana(y, LATA)}.`,
    rozwiazanie: [
      `Niech $x$ – wiek ${w.stG}, $y$ – wiek ${w.mlG} (w latach). Wtedy $x - y = ${d}$ oraz $x + y = ${S}$.`,
      ...urKroki(1, -1, d, 1, 1, S, "podstawiania").kroki,
    ],
  };
}

// --- Nierówność liniowa

const KSZTALTY_LIN = ["$x \\in (-\\infty, a)$", "$x \\in (-\\infty, a]$", "$x \\in (a, +\\infty)$", "$x \\in [a, +\\infty)$"];
const KSZTALT_ZNAKU = { "<": 0, "\\le": 1, ">": 2, "\\ge": 3 };

/** Zbiór rozwiązań w LaTeX dla kształtu 0–3 (kolejność jak w KSZTALTY_LIN). */
function przedzialLin(ksztalt, a) {
  const t = tex(a);
  return [
    `x \\in \\left(-\\infty, ${t}\\right)`,
    `x \\in \\left(-\\infty, ${t}\\right]`,
    `x \\in \\left(${t}, +\\infty\\right)`,
    `x \\in \\left[${t}, +\\infty\\right)`,
  ][ksztalt];
}

const nww = (a, b) => (a / nwd(a, b)) * b;

/** Suma składników [współczynnik, "x" albo ""] w LaTeX bez upraszczania: "4x + 2 - 3x + 3". */
function skladnikiTex(lista) {
  const czesci = [];
  for (const [w, lit] of lista) {
    if (w === 0) continue;
    const liczba = lit && Math.abs(w) === 1 ? "" : String(Math.abs(w));
    czesci.push(czesci.length === 0 ? `${w < 0 ? "-" : ""}${liczba}${lit}` : ` ${w < 0 ? "-" : "+"} ${liczba}${lit}`);
  }
  return czesci.length ? czesci.join("") : "0";
}

/** (ax + b)/m pomnożone przez k: "2(2x + 1)"; dla k = 1 nawias tylko po minusie. */
const razyNawias = (k, a, b, poMinusie) => (k === 1 ? (poMinusie ? `(${liniowy(a, b)})` : liniowy(a, b)) : `${k}(${liniowy(a, b)})`);

/** (2x + 1)/3 − (x − 1)/2 ≤ 1: nierówność liniowa z ułamkami, odpowiedź – kształt przedziału i liczba a. */
function nierownoscLiniowa(r) {
  for (;;) {
    const szablon = r.int(0, 2);
    const m = r.pick([2, 3, 4, 5, 6]);
    const n = r.pick([2, 3, 4, 5, 6].filter((x) => x !== m));
    const al = r.intBez(-3, 5, 0);
    const be = r.chance(0.2) ? 0 : r.intBez(-7, 7, 0);
    const ga = r.intBez(-3, 5, 0);
    const de = r.intBez(-7, 7, 0);
    const op = r.pick(ZNAKI);
    const ul1 = `\\frac{${liniowy(al, be)}}{${m}}`;
    const ul2 = `\\frac{${liniowy(ga, de)}}{${n}}`;
    let tekst, L, mnoz, rozwin, K, M;   // lewa − prawa = Kx + M
    if (szablon === 0) {          // (al x + be)/m ∓ (ga x + de)/n op c
      const minus = r.chance(0.65);
      const z = minus ? -1 : 1;
      const c = r.int(-4, 6);
      L = nww(m, n);
      const [k1, k2] = [L / m, L / n];
      tekst = `${ul1} ${minus ? "-" : "+"} ${ul2} ${op} ${c}`;
      const drugi = razyNawias(k2, ga, de, minus);
      const laczenie = !minus && drugi.startsWith("-") ? `- ${drugi.slice(1)}` : `${minus ? "-" : "+"} ${drugi}`;
      mnoz = `${razyNawias(k1, al, be, false)} ${laczenie} ${op} ${c * L}`;
      rozwin = `${skladnikiTex([[k1 * al, "x"], [k1 * be, ""], [z * k2 * ga, "x"], [z * k2 * de, ""]])} ${op} ${c * L}`;
      K = q(al, m).add(q(z * ga, n));
      M = q(be, m).add(q(z * de, n)).sub(c);
    } else if (szablon === 1) {   // (al x + be)/m op e x + g
      const e = r.intBez(-3, 3, 0);
      const g = r.int(-6, 6);
      L = m;
      tekst = `${ul1} ${op} ${wielomianTex([e, g])}`;
      mnoz = `${liniowy(al, be)} ${op} ${wielomianTex([m * e, m * g])}`;
      rozwin = null;
      K = q(al, m).sub(e);
      M = q(be, m).sub(g);
    } else {                      // (al x + be)/m op (ga x + de)/n
      L = nww(m, n);
      const [k1, k2] = [L / m, L / n];
      tekst = `${ul1} ${op} ${ul2}`;
      mnoz = `${razyNawias(k1, al, be, false)} ${op} ${razyNawias(k2, ga, de, false)}`;
      rozwin = `${skladnikiTex([[k1 * al, "x"], [k1 * be, ""]])} ${op} ${skladnikiTex([[k2 * ga, "x"], [k2 * de, ""]])}`;
      K = q(al, m).sub(q(ga, n));
      M = q(be, m).sub(q(de, n));
    }
    if (K.zero) continue;
    const a = M.neg().div(K);
    if (a.d > 6 || Math.abs(a.valueOf()) > 10) continue;
    const KL = K.mul(L).n;   // całkowite, bo L jest wielokrotnością mianowników
    const prawa = M.mul(L).neg();
    const opPo = KL < 0 ? ODWROTNY[op] : op;
    const ksztalt = KSZTALT_ZNAKU[opPo];
    const kroki = [`Mnożymy obie strony nierówności przez $${L}$: $${mnoz}$.`];
    if (rozwin && rozwin !== mnoz) kroki.push(`Opuszczamy nawiasy: $${rozwin}$.`);
    kroki.push(`Wyrazy z $x$ przenosimy na lewą stronę, a liczby na prawą: $${wielomianTex([KL, 0])} ${op} ${tex(prawa)}$.`);
    if (KL > 1) kroki.push(`Dzielimy obie strony przez $${KL}$: $x ${op} ${tex(a)}$.`);
    if (KL < 0) kroki.push(`Dzielimy obie strony przez $${KL}$ i zmieniamy zwrot nierówności: $x ${opPo} ${tex(a)}$.`);
    kroki.push(`Zbiór rozwiązań: $${przedzialLin(ksztalt, a)}$.`);
    return {
      tresc: `${r.pick(TRESC_NIEROWNOSC)} $${tekst}$.\n\nWybierz postać zbioru rozwiązań i podaj liczbę $a$.`,
      pola: [
        { id: "ksztalt", typ: "wybor", etykieta: "Zbiór rozwiązań", opcje: [...KSZTALTY_LIN] },
        poleLiczba("a", "$a =$"),
      ],
      odpowiedz: { ksztalt, a },
      wynik: `$${przedzialLin(ksztalt, a)}$`,
      rozwiazanie: kroki,
    };
  }
}

// --- Lista generatorów

export const GENERATORY = [
  {
    id: "modul-i-bledy",
    temat: "liczby-rzeczywiste",
    nazwa: "Moduł i błędy",
    opis: "Wartość bezwzględna, odległość na osi liczbowej oraz błąd bezwzględny i względny przybliżenia.",
    generuj: (r) => zWagami(r, [[0.3, lrModul], [0.2, lrOdleglosc], [0.25, lrBladBezwzgledny], [0.25, lrBladWzgledny]])(r),
  },
  {
    id: "notacja-reszty",
    temat: "liczby-rzeczywiste",
    nazwa: "Notacja, reszty, kolejne",
    opis: "Notacja wykładnicza, reszty z dzielenia oraz sumy kolejnych liczb całkowitych, parzystych i nieparzystych.",
    generuj: (r) => zWagami(r, [[0.3, lrNotacja], [0.35, lrReszta], [0.35, lrKolejne]])(r),
  },
  {
    id: "zbiory-skonczone",
    temat: "zbiory",
    nazwa: "Zbiory skończone",
    opis: "Liczba elementów sumy, części wspólnej i różnicy zbiorów liczb.",
    generuj: zbSkonczone,
  },
  {
    id: "dzialania-na-przedzialach",
    temat: "zbiory",
    nazwa: "Przedziały",
    opis: "Suma, część wspólna, różnica i dopełnienie przedziałów liczbowych.",
    generuj: zbPrzedzialy,
  },
  {
    id: "zaprzeczenia-zdan",
    temat: "logika",
    nazwa: "Zaprzeczenia zdań",
    opis: "Zaprzeczenie koniunkcji, alternatywy, implikacji i zdania z kwantyfikatorem.",
    generuj: (r) => zWagami(r, [[0.35, lgDeMorgan], [0.3, lgKwantyfikator], [0.35, lgImplikacja]])(r),
  },
  {
    id: "wartosci-logiczne",
    temat: "logika",
    nazwa: "Wartości logiczne",
    opis: "Wartość logiczna zdania złożonego, tabelka zero-jedynkowa i kontrprzykład.",
    generuj: lgWartosc,
  },
  {
    id: "potegi",
    temat: "potegi",
    nazwa: "Potęgi",
    opis: "Działania na potęgach: zapis w postaci jednej potęgi i obliczanie wartości wyrażeń.",
    generuj: (r) => zWagami(r, [[0.45, potegiIloczyn], [0.35, potegiSuma], [0.2, potegiJednakowe]])(r),
  },
  {
    id: "pierwiastki",
    temat: "pierwiastki",
    nazwa: "Pierwiastki",
    opis: "Wartości wyrażeń z pierwiastkami i potęgami o wykładnikach wymiernych.",
    generuj: (r) => zWagami(r, [[0.3, pierwKwadrat], [0.2, pierwSprzezenie], [0.3, pierwIloczyn], [0.2, pierwDwumian]])(r),
  },
  {
    id: "logarytmy",
    temat: "logarytmy",
    nazwa: "Logarytmy",
    opis: "Sumy, różnice i wielokrotności logarytmów o tej samej podstawie.",
    generuj: (r) => zWagami(r, [[0.3, logIloczyn], [0.25, logPotegi], [0.25, logWspolczynnik], [0.2, logSzczegolny]])(r),
  },
  {
    id: "procenty",
    temat: "procenty",
    nazwa: "Procenty",
    opis: "Lokaty, podwyżki i obniżki cen oraz zależności procentowe między dwiema wielkościami.",
    generuj: (r) => zWagami(r, [[0.3, procLokata], [0.3, procCena], [0.2, procUklad], [0.2, procPodzial]])(r),
  },
  {
    id: "wzory-skroconego-mnozenia",
    temat: "wyrazenia",
    nazwa: "Wzory skróconego mnożenia",
    opis: "Kwadrat sumy i różnicy, różnica kwadratów: obliczanie wartości wyrażeń i współczynników po uproszczeniu.",
    generuj: (r) => zWagami(r, [[0.45, wzSumaKwadratow], [0.25, wzSzybkie], [0.3, wzWspolczynnik]])(r),
  },
  {
    id: "ulamki-i-wzory",
    temat: "wyrazenia",
    nazwa: "Ułamki i wzory",
    opis: "Skracanie ułamków z niewiadomą, suma ułamków oraz wyznaczanie zmiennej ze wzoru.",
    generuj: (r) => zWagami(r, [[0.4, wzSkracanie], [0.25, wzOdwrotnosci], [0.35, wzPrzeksztalcanie]])(r),
  },
  {
    id: "wartosc-i-stopien-wielomianu",
    temat: "wielomiany",
    nazwa: "Wartość i stopień",
    opis: "Wartość wielomianu, parametr w pierwiastku, stopień wielomianu i suma współczynników.",
    generuj: (r) => zWagami(r, [[0.3, wmWartosc], [0.25, wmParametr], [0.25, wmStopien], [0.2, wmSumaWspolczynnikow]])(r),
  },
  {
    id: "rownosc-i-rozklad-wielomianow",
    temat: "wielomiany",
    nazwa: "Równość i rozkład",
    opis: "Równość wielomianów oraz rozkład na czynniki i pierwiastki wielomianu.",
    generuj: (r) => zWagami(r, [[0.35, wmRownosc], [0.65, wmRozklad]])(r),
  },
  {
    id: "nierownosc-kwadratowa",
    temat: "nierownosci",
    nazwa: "Nierówność kwadratowa",
    opis: "Nierówności kwadratowe zapisane tak jak w arkuszach CKE.",
    generuj: nierownoscKwadratowa,
  },
  {
    id: "rownanie-wielomianowe",
    temat: "rownania",
    nazwa: "Równanie wielomianowe",
    opis: "Równania trzeciego stopnia rozwiązywane przez grupowanie wyrazów lub wyłączenie x przed nawias.",
    generuj: (r) => zWagami(r, [[0.7, rownanieGrupowanie], [0.3, rownanieZX]])(r),
  },
  {
    id: "rownanie-wymierne",
    temat: "rownania-wymierne",
    nazwa: "Równanie wymierne",
    opis: "Dziedzina, ułamek równy zero, proporcja i suma ułamków z niewiadomą w mianowniku.",
    generuj: (r) => zWagami(r, [[0.15, rwDziedzina], [0.25, rwUlamekZero], [0.2, rwProporcjaLin], [0.25, rwProporcjaKw], [0.15, rwSumaUlamkow]])(r),
  },
  {
    id: "rownanie-wymierne-tekstowe",
    temat: "rownania-wymierne",
    nazwa: "Ruch i praca",
    opis: "Zadania tekstowe o prędkości, czasie i wspólnej pracy prowadzące do równania wymiernego.",
    generuj: rwTekst,
  },
  {
    id: "uklad-rownan",
    temat: "uklady-rownan",
    nazwa: "Układ równań",
    opis: "Układ dwóch równań liniowych: podstawianie, przeciwne współczynniki, przecięcie prostych i parametr.",
    generuj: urRozwiaz,
  },
  {
    id: "uklad-rownan-tekstowy",
    temat: "uklady-rownan",
    nazwa: "Układ w zadaniu",
    opis: "Zadania tekstowe z układem równań: ceny, liczba sztuk, boki prostokąta i wiek.",
    generuj: urTekstowe,
  },
  {
    id: "nierownosc-liniowa",
    temat: "nierownosci",
    nazwa: "Nierówność liniowa",
    opis: "Nierówności liniowe ze współczynnikami ułamkowymi.",
    generuj: nierownoscLiniowa,
  },
];
