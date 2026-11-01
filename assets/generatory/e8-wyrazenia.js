// Generatory zadań z działu „Egzamin ósmoklasisty – wyrażenia i równania”: zapisywanie wyrażeń, wartość wyrażenia, upraszczanie i mnożenie,
// równania, zadania z równaniem, przekształcanie wzorów, proporcje. Zadania ćwiczą dokładnie to, co tłumaczą karty z assets/wzory/e8-wyrazenia.js.
// Kontrakt zadania i narzędzia: zob. wspolne.js. Każdy generator ma pole temat – id tematu z assets/arkusze/tematy.js (dział "e8-wyrazenia").
// Wyrażenia są budowane jako małe drzewa (num, zm, suma, il, ul, pot), z których powstaje zapis TeX, wartość (dokładnie na Q), postać po
// rozpisaniu nawiasów i po uproszczeniu oraz kolejne kroki obliczeń – dzięki temu treść, odpowiedź i rozwiązanie zawsze się zgadzają.
// Rozwiązania są pisane prostym językiem, kilka krótkich kroków. Odpowiedzi liczymy dokładnie na Q (bez liczb zmiennoprzecinkowych);
// pola z ułamkiem zwykłym przyjmują zarówno zapis dziesiętny (0,75), jak i zwykły (3/4) – Q porównuje wartości.
import { Q, q } from "./wspolne.js";

/** Lista wzorów jako osobne $…$ po przecinkach – długa lista łamie się wtedy na wąskim ekranie. */
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

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });
const polew = (id, etykieta, opcje) => ({ id, typ: "wybor", etykieta, opcje });
const zad = (tresc, pola, odpowiedz, wynik, rozwiazanie) => ({ tresc, pola, odpowiedz, wynik, rozwiazanie });

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

const fr = (a, b) => `\\frac{${a}}{${b}}`;
const PODPOWIEDZ_ULAMEK = " Jeśli wynik jest ułamkiem zwykłym, wpisz go w postaci licznik/mianownik, np. 1/3.";
/** Ułamek (Q) w TeX-u z kreską, nawet gdy dałby się zapisać dziesiętnie; liczby całkowite bez kreski. */
const ulTex = (v) => Q.z(v).tex();

const OSOBY = [
  { im: "Ola", k: true }, { im: "Kasia", k: true }, { im: "Ania", k: true }, { im: "Zosia", k: true }, { im: "Magda", k: true }, { im: "Hania", k: true },
  { im: "Marek", k: false }, { im: "Kuba", k: false }, { im: "Tomek", k: false }, { im: "Adam", k: false }, { im: "Bartek", k: false }, { im: "Piotrek", k: false },
];
/** Forma czasownika lub zaimka zależnie od rodzaju osoby: f(osoba, "kupił", "kupiła"). */
const f = (o, m, k) => (o.k ? k : m);
/** Wybiera n różnych osób. */
const osoby = (r, n) => r.shuffle(OSOBY).slice(0, n);

// --- Wyrażenia algebraiczne jako drzewa
// Węzły: { k: "n", v: Q } liczba, { k: "v", s } litera, { k: "+", t: [{ s: ±1, e }] } suma ze znakami, { k: "*", f: [...] } iloczyn,
// { k: "/", a, b } ułamek, { k: "^", a, n } potęga o wykładniku całkowitym n ≥ 2.

const num = (v) => ({ k: "n", v: Q.z(v) });
const zm = (s) => ({ k: "v", s });
const ex = (e) => (typeof e === "string" ? zm(e) : typeof e === "number" || e instanceof Q ? num(e) : e);

/** Składnik sumy: wyrażenie albo para [znak, wyrażenie]; ujemna liczba zamienia się na odejmowanie liczby dodatniej. */
function skladnik(it) {
  let s = 1, e = it;
  if (Array.isArray(it)) [s, e] = it;
  e = ex(e);
  if (e.k === "n" && e.v.ujemna) { s = -s; e = num(e.v.neg()); }
  return { s, e };
}
function suma(...t) {
  let w = t.map(skladnik);
  if (w.length > 1) w = w.filter((x) => !(x.e.k === "n" && x.e.v.zero));   // składnik „+ 0” pomijamy
  if (!w.length) return num(0);
  return w.length === 1 && w[0].s > 0 ? w[0].e : { k: "+", t: w };
}
const sumaZ = (lista) => (lista.length ? suma(...lista) : num(0));
function il(...fs) {
  let w = fs.map(ex).flatMap((x) => (x.k === "*" ? x.f : [x]));
  if (w.length > 1) w = w.filter((x) => !(x.k === "n" && x.v.eq(1)));
  if (!w.length) return num(1);
  return w.length === 1 ? w[0] : { k: "*", f: w };
}
const ul = (a, b) => ({ k: "/", a: ex(a), b: ex(b) });
const pot = (a, n) => ({ k: "^", a: ex(a), n });

/** Składnik c·v^n jako para [znak, wyrażenie] (bez jedynki: 1x -> x); dla n = 0 sama liczba. */
function czl(c, v = "x", n = 1) {
  const a = Q.z(c), abs = a.ujemna ? a.neg() : a;
  const s = a.ujemna ? -1 : 1;
  if (n === 0) return [s, num(abs)];
  const zmn = n === 1 ? zm(v) : pot(zm(v), n);
  return [s, abs.eq(1) ? zmn : il(abs, zmn)];
}
/** Wielomian jednej litery ze współczynników od najwyższej potęgi: pol([3, -2, 1]) to 3x^2 - 2x + 1 (zerowe składniki pomijamy). */
function pol(wsp, v = "x") {
  const st = wsp.length - 1;
  const t = [];
  wsp.forEach((c, i) => { if (!Q.z(c).zero) t.push(czl(c, v, st - i)); });
  return sumaZ(t);
}
/** a·v + b. */
const lin = (a, b, v = "x") => pol([a, b], v);

const par = (s) => (/\\frac/.test(s) ? `\\left(${s}\\right)` : `(${s})`);
const rodz = (e) => {
  if (e.k === "n") return e.v.ujemna ? "-" : "n";
  if (e.k === "v") return "v";
  if (e.k === "+") return "(";
  if (e.k === "^") return e.a.k === "v" || e.a.k === "+" ? rodz(e.a) : "^";
  return "/";
};
/** Czy mnożenie można pominąć w zapisie: 3x, 2(x + 1), xy, (x + 1)(x + 2). */
const domyslne = (a, b) => ["n", "v", "("].includes(rodz(a)) && ["v", "("].includes(rodz(b));

/** Zapis TeX z priorytetem: 1 suma, 2 iloczyn, 3 potęga, 4 atom. Opcje: jawne – zawsze \cdot, dz – liczby dziesiętne z przecinkiem. */
function rend(e, o) {
  switch (e.k) {
    case "n": return { s: o.dz ? dz(e.v) : e.v.tex(), p: e.v.ujemna ? 1 : 4 };
    case "v": return { s: e.s, p: 4 };
    case "+": {
      let s = "";
      e.t.forEach(({ s: sg, e: t }, i) => {
        const r = rend(t, o);
        const goly = i === 0 && sg > 0 && t.k === "n" && !t.podst;
        const cz = r.p <= 1 && !goly ? par(r.s) : r.s;
        s += i === 0 ? (sg < 0 ? "-" : "") + cz : `${sg < 0 ? " - " : " + "}${cz}`;
      });
      return { s, p: 1 };
    }
    case "*": {
      let s = "";
      e.f.forEach((fa, i) => {
        const r = rend(fa, o);
        if (i > 0) s += (o.jawne === "wzor" ? !(rodz(e.f[i - 1]) === "n" && ["v", "("].includes(rodz(fa))) : o.jawne || !domyslne(e.f[i - 1], fa)) ? " \\cdot " : "";
        s += r.p <= 1 ? par(r.s) : r.s;
      });
      return { s, p: 2 };
    }
    case "/": return { s: `\\frac{${rend(e.a, o).s}}{${rend(e.b, o).s}}`, p: 4 };
    case "^": {
      const r = rend(e.a, o);
      const b = r.p < 4 || /\\frac/.test(r.s) ? par(r.s) : r.s;
      return { s: `${b}^${e.n < 10 ? e.n : `{${e.n}}`}`, p: 3 };
    }
  }
  throw new Error(`Nieznany węzeł ${e.k}`);
}
const zapis = (e, o = {}) => rend(e, o).s;

/** Dokładna wartość wyrażenia dla podanych wartości liter (env: { x: Q | liczba }). */
function ocen(e, env = {}) {
  switch (e.k) {
    case "n": return e.v;
    case "v": {
      if (env[e.s] === undefined) throw new Error(`Brak wartości litery ${e.s}`);
      return Q.z(env[e.s]);
    }
    case "+": return e.t.reduce((w, { s, e: t }) => (s < 0 ? w.sub(ocen(t, env)) : w.add(ocen(t, env))), q(0));
    case "*": return e.f.reduce((w, fa) => w.mul(ocen(fa, env)), q(1));
    case "/": return ocen(e.a, env).div(ocen(e.b, env));
    case "^": return ocen(e.a, env).pow(e.n);
  }
  throw new Error(`Nieznany węzeł ${e.k}`);
}
/** Wstawia liczby w miejsce liter (wartość ujemna zostanie w nawiasie przy zapisie). */
function podstaw(e, env) {
  switch (e.k) {
    case "n": return e;
    case "v": return env[e.s] === undefined ? e : { k: "n", v: Q.z(env[e.s]), podst: true };
    case "+": return { k: "+", t: e.t.map(({ s, e: t }) => ({ s, e: podstaw(t, env) })) };
    case "*": return { k: "*", f: e.f.map((fa) => podstaw(fa, env)) };
    case "/": return { k: "/", a: podstaw(e.a, env), b: podstaw(e.b, env) };
    case "^": return { k: "^", a: podstaw(e.a, env), n: e.n };
  }
  throw new Error(`Nieznany węzeł ${e.k}`);
}

// Kroki obliczania wartości: nawiasy, potęgi, mnożenie i dzielenie, dodawanie i odejmowanie – w tej kolejności.
const gotowy = (e) => {
  if (e.k === "+") return e.t.every((t) => t.e.k === "n");
  if (e.k === "*") return e.f.every((fa) => fa.k === "n");
  if (e.k === "/") return e.a.k === "n" && e.b.k === "n";
  if (e.k === "^") return e.a.k === "n";
  return false;
};
const priorytet = (e, rodzic) => (e.k === "^" ? 1 : e.k === "+" ? (rodzic ? 0 : 3) : 2);
function minPr(e, rodzic) {
  if (e.k === "n" || e.k === "v") return Infinity;
  if (gotowy(e)) return priorytet(e, rodzic);
  const dzieci = e.k === "+" ? e.t.map((t) => t.e) : e.k === "*" ? e.f : e.k === "/" ? [e.a, e.b] : [e.a];
  return Math.min(...dzieci.map((d) => minPr(d, e.k)));
}
/** Co robimy w danym kroku, gdy zastępujemy węzeł e jego wartością: [czynność, miejsce] (rodzic – rodzaj węzła nadrzędnego, miejsce – „w liczniku” itp.). */
function opisWezla(e, rodzic, miejsce) {
  if (e.k === "+") return rodzic === null ? ["Dodajemy i odejmujemy", ""] : rodzic === "/" ? ["Dodajemy i odejmujemy", miejsce] : ["Liczymy nawias", ""];
  if (e.k === "^") return ["Liczymy potęgę", ""];
  if (e.k === "*") return ["Mnożymy", miejsce ?? ""];
  return ["Dzielimy", ""];
}
function redukuj(e, p, rodzic, miejsce, opisy) {
  if (e.k === "n" || e.k === "v") return e;
  if (gotowy(e)) {
    if (priorytet(e, rodzic) !== p) return e;
    const [czynnosc, gdzie] = opisWezla(e, rodzic, miejsce);
    if (!opisy.has(czynnosc)) opisy.set(czynnosc, new Set());
    opisy.get(czynnosc).add(gdzie);
    return num(ocen(e, {}));
  }
  if (e.k === "+") return { k: "+", t: e.t.map(({ s, e: t }) => ({ s, e: redukuj(t, p, "+", miejsce, opisy) })) };
  if (e.k === "*") return { k: "*", f: e.f.map((fa) => redukuj(fa, p, "*", miejsce, opisy)) };
  if (e.k === "/") return { k: "/", a: redukuj(e.a, p, "/", "w liczniku", opisy), b: redukuj(e.b, p, "/", "w mianowniku", opisy) };
  return { k: "^", a: redukuj(e.a, p, "^", miejsce, opisy), n: e.n };
}
/** Kolejne postaci wyrażenia po wstawieniu liczb aż do wyniku: [{ opis: null, tex }, { opis: "Mnożymy w liczniku", tex }, ...]. Kroki bez widocznej zmiany pomijamy. */
function etapy(e0, env, o = {}) {
  const op = { jawne: true, ...o };
  let e = podstaw(e0, env);
  const wynik = [{ opis: null, tex: zapis(e, op) }];
  while (e.k !== "n") {
    const p = minPr(e, null);
    const opisy = new Map();
    e = redukuj(e, p, null, null, opisy);
    const tex = zapis(e, op);
    if (tex === wynik[wynik.length - 1].tex) continue;
    const frazy = [...opisy].map(([czynnosc, miejsca]) => {
      const gdzie = [...miejsca].filter(Boolean);
      return miejsca.has("") || !gdzie.length ? czynnosc : `${czynnosc} ${gdzie.sort().join(" i ")}`;
    });
    wynik.push({ opis: frazy.map((t, i) => (i ? t[0].toLowerCase() + t.slice(1) : t)).join(" i "), tex });
  }
  return wynik;
}
/** „$x = -2$ i $y = 3$” */
const wartosciTekst = (env, kolej, o = {}) => wymien(kolej.map((z) => `$${z} = ${o.dz ? dz(env[z]) : Q.z(env[z]).tex()}$`));
const wymien = (arr) => (arr.length < 2 ? arr.join("") : `${arr.slice(0, -1).join(", ")} i ${arr[arr.length - 1]}`);

// --- Wielomiany: rozpisywanie nawiasów i łączenie wyrazów podobnych
// Wielomian to obiekt { klucz: { c: Q, w: { litera: wykładnik } } }, klucz np. "", "x", "x2", "xy".

const kluczMon = (w) => Object.keys(w).filter((z) => w[z] > 0).sort().map((z) => z + (w[z] > 1 ? w[z] : "")).join("");
function pDod(p, w, c) {
  if (c.zero) return;
  const k = kluczMon(w);
  if (p[k]) {
    p[k] = { c: p[k].c.add(c), w: p[k].w };
    if (p[k].c.zero) delete p[k];
  } else p[k] = { c, w: { ...w } };
}
function pMnoz(a, b) {
  const wyn = {};
  for (const x of Object.values(a)) {
    for (const y of Object.values(b)) {
      const w = { ...x.w };
      for (const z of Object.keys(y.w)) w[z] = (w[z] ?? 0) + y.w[z];
      pDod(wyn, w, x.c.mul(y.c));
    }
  }
  return wyn;
}
const stala = (c) => { const p = {}; pDod(p, {}, Q.z(c)); return p; };
function rozwin(e) {
  switch (e.k) {
    case "n": return stala(e.v);
    case "v": { const p = {}; pDod(p, { [e.s]: 1 }, q(1)); return p; }
    case "+": {
      const p = {};
      for (const { s, e: t } of e.t) for (const m of Object.values(rozwin(t))) pDod(p, m.w, s < 0 ? m.c.neg() : m.c);
      return p;
    }
    case "*": return e.f.reduce((p, fa) => pMnoz(p, rozwin(fa)), stala(1));
    case "/": {
      const m = rozwin(e.b), ks = Object.keys(m);
      if (ks.length !== 1 || ks[0] !== "") throw new Error("Dzielenie przez wyrażenie z literą");
      const p = {};
      for (const t of Object.values(rozwin(e.a))) pDod(p, t.w, t.c.div(m[""].c));
      return p;
    }
    case "^": { let p = stala(1); const b = rozwin(e.a); for (let i = 0; i < e.n; i++) p = pMnoz(p, b); return p; }
  }
  throw new Error(`Nieznany węzeł ${e.k}`);
}
const stopien = (w) => Object.values(w).reduce((a, b) => a + b, 0);
/** Wielomian (po uproszczeniu) jako drzewo: od najwyższego stopnia, litery alfabetycznie, współczynnik 1 pomijany. */
function wielAst(p) {
  const mony = Object.values(p).sort((a, b) => stopien(b.w) - stopien(a.w) || kluczMon(a.w).localeCompare(kluczMon(b.w)));
  const t = mony.map(({ c, w }) => {
    const zs = Object.keys(w).sort().map((z) => (w[z] > 1 ? pot(zm(z), w[z]) : zm(z)));
    const abs = c.ujemna ? c.neg() : c;
    const cz = !zs.length || !abs.eq(1) ? [num(abs), ...zs] : zs;
    return [c.ujemna ? -1 : 1, cz.length === 1 ? cz[0] : { k: "*", f: cz }];
  });
  return sumaZ(t);
}
const uprosc = (e) => wielAst(rozwin(e));
/** Jeden jednomian jako para [znak, drzewo]. */
function jednomian(z, m) {
  const p = Object.values(rozwin(m));
  if (!p.length) return null;
  const { c, w } = p[0];
  const abs = c.ujemna ? c.neg() : c;
  return [c.ujemna ? -z : z, wielAst({ [kluczMon(w)]: { c: abs, w } })];
}
/** Składniki po rozpisaniu wszystkich nawiasów, bez łączenia wyrazów podobnych: [[znak, jednomian], ...]. */
function skladniki(e) {
  switch (e.k) {
    case "+": return e.t.flatMap(({ s, e: t }) => skladniki(t).map(([z, m]) => [s * z, m]));
    case "*": {
      const iloczyn = e.f.map(skladniki).reduce((acc, lst) => acc.flatMap(([z1, m1]) => lst.map(([z2, m2]) => [z1 * z2, il(m1, m2)])), [[1, num(1)]]);
      return iloczyn.map(([z, m]) => jednomian(z, m)).filter(Boolean);
    }
    case "^": return e.a.k === "+" ? skladniki(il(...Array(e.n).fill(e.a))) : [jednomian(1, e)].filter(Boolean);
    default: return [jednomian(1, e)].filter(Boolean);
  }
}
const rozpisz = (e) => sumaZ(skladniki(e));

// --- Wybór zadań z odpowiedziami A–D: sprawdzanie, że wyrażenia są naprawdę różne

const PUNKTY = [
  { x: 10, y: 4, a: 6, b: 2, n: 10, m: 3, p: 5, q: 7 },
  { x: 7, y: 3, a: 5, b: 3, n: 8, m: 2, p: 4, q: 9 },
  { x: 12, y: 5, a: 9, b: 4, n: 12, m: 5, p: 6, q: 2 },
];
function podpis(e, env) {
  try { return ocen(e, env).toString(); } catch { return "!"; }
}
/** Wybiera trzy błędne wyrażenia spośród kandydatów (różne od poprawnego i od siebie) albo null. */
function wybierzBledne(r, ok, kandydaci) {
  const dobre = [];
  const widziane = new Set([PUNKTY.map((env) => podpis(ok, env)).join("|")]);
  for (const e of r.shuffle(kandydaci)) {
    const s = PUNKTY.map((env) => podpis(e, env)).join("|");
    if (s.includes("!") || widziane.has(s)) continue;
    widziane.add(s);
    dobre.push(e);
  }
  return dobre.length >= 3 ? dobre.slice(0, 3) : null;
}
/** Punkt, w którym wszystkie podane wyrażenia mają różne wartości. */
function punktRozny(lista, zmienne) {
  for (const env of PUNKTY) {
    const w = lista.map((e) => podpis(e, env));
    if (new Set(w).size === w.length && !w.includes("!")) return Object.fromEntries(zmienne.map((z) => [z, env[z]]));
  }
  return null;
}
/** Przybliżona szerokość wzoru na ekranie (liczba znaków; ułamek ma szerokość dłuższej części) – żeby nie pokazywać za długich wzorów. */
function szerokosc(tex) {
  let s = tex.replace(/\\left|\\right/g, "").replace(/\\cdot/g, "·").replace(/\\text\{([^}]*)\}/g, "$1").replace(/\\,|\\ /g, " ").replace(/\{,\}/g, ",");
  for (let i = 0; i < 6; i++) s = s.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, (_, a, b) => "#".repeat(Math.max(a.length, b.length)));
  return s.replace(/[{}^]/g, "").replace(/\s+/g, "").length;
}

// --- Równania liniowe: analiza i kroki rozwiązania

/** Wyrażenie liniowe jako { a, b } dla a·v + b. */
function liniowa(e, v = "x") {
  const p = rozwin(e);
  for (const k of Object.keys(p)) if (k !== "" && k !== v) throw new Error("To nie jest wyrażenie liniowe");
  return { a: p[v]?.c ?? q(0), b: p[""]?.c ?? q(0) };
}
/** Rozwiązanie równania L = P (jedno rozwiązanie) albo null, gdy x się skraca. */
function rozwiazRownanie(L, P) {
  const { a: aL, b: bL } = liniowa(L), { a: aP, b: bP } = liniowa(P);
  const A = aL.sub(aP);
  return A.zero ? null : bP.sub(bL).div(A);
}
function mianowniki(e) {
  switch (e.k) {
    case "/": return e.b.k === "n" ? [e.b.v.n, ...mianowniki(e.a)] : [];
    case "+": return e.t.flatMap((t) => mianowniki(t.e));
    case "*": return e.f.flatMap(mianowniki);
    case "^": return mianowniki(e.a);
    default: return [];
  }
}
/** Mnoży strone równania przez k, wyraz po wyrazie (ułamki o mianowniku liczbowym znikają). */
function razyK(e, k) {
  const terminy = e.k === "+" ? e.t : [{ s: 1, e }];
  const nowe = terminy.flatMap(({ s, e: t }) => {
    if (t.k === "/" && t.b.k === "n") {
      const m = q(k).div(t.b.v);
      if (t.a.k === "+") return m.eq(1) && s > 0 ? t.a.t.map(({ s: z, e: u }) => [z, u]) : [[s, il(m, t.a)]];
      return [[s, wielAst(pMnoz(rozwin(t.a), stala(m)))]];
    }
    return [[s, wielAst(pMnoz(rozwin(t), stala(k)))]];
  });
  return suma(...nowe);
}
/** Liczba x w zapisie TeX „x = …” z dzieleniem w ostatnim kroku: 6 : 2 = 3, \frac{6}{4} = \frac{3}{2}. */
function dzielenieTex(w, Ap, x) {
  if (!w.calkowita || !Ap.calkowita) return `x = ${ulTex(w)} : ${ulTex(Ap)} = ${ulTex(x)}`;
  if (x.calkowita) return `x = ${w.n} : ${Ap.n} = ${x.n}`;
  const surowy = `${w.n < 0 ? "-" : ""}${fr(Math.abs(w.n), Ap.n)}`;
  return `x = ${surowy}${surowy === ulTex(x) ? "" : ` = ${ulTex(x)}`}`;
}
/** Krótka uwaga do rozpisywania nawiasów: co dokładnie trzeba zrobić w tych wyrażeniach. */
function opisNawiasow(...wyr) {
  let mnozenie = false, minus = false;
  const idz = (e, ujemny) => {
    if (e.k === "+") e.t.forEach(({ s, e: t }) => { if (s < 0 && (t.k === "+" || (t.k === "*" && t.f.some((fa) => fa.k === "+")))) minus = true; idz(t); });
    else if (e.k === "*") { if (e.f.some((fa) => fa.k === "+")) mnozenie = true; e.f.forEach((fa) => idz(fa)); }
  };
  wyr.forEach((e) => idz(e));
  if (mnozenie && minus) return " (liczba przed nawiasem mnoży każdy wyraz, a minus przed nawiasem zmienia znaki w środku)";
  if (mnozenie) return " (liczba przed nawiasem mnoży każdy wyraz w środku)";
  if (minus) return " (minus przed nawiasem zmienia znaki wszystkich wyrazów w środku)";
  return "";
}
/**
 * Rozwiązanie równania L = P krok po kroku (każdy krok to zdanie z wzorami): ułamki, nawiasy, wyrazy podobne,
 * przenoszenie, dzielenie i sprawdzenie. Niewiadome zbieramy po stronie, gdzie jest ich więcej (współczynnik większy), więc dzielimy przez liczbę dodatnią.
 * Zwraca null, gdy równanie nie ma jednego rozwiązania.
 */
function krokiRownania(L0, P0, { sprawdzenie = true } = {}) {
  const kroki = [];
  let L = L0, P = P0;
  const mian = [...mianowniki(L), ...mianowniki(P)];
  if (mian.length) {
    const k = mian.reduce((a, b) => nww(a, b), 1);
    L = razyK(L, k);
    P = razyK(P, k);
    kroki.push(`Pozbywamy się ułamków: mnożymy obie strony przez $${k}$ (na tę liczbę dzielą się wszystkie mianowniki), po kolei każdy wyraz. Wychodzi $${zapis(L)} = ${zapis(P)}$.`);
  }
  const Lr = rozpisz(L), Pr = rozpisz(P);
  const Ls = uprosc(L), Ps = uprosc(P);
  const czesci = [];
  const nawiasy = zapis(Lr) !== zapis(L) || zapis(Pr) !== zapis(P);
  if (nawiasy) czesci.push(`Rozpisujemy nawiasy${opisNawiasow(L, P)}: $${zapis(Lr)} = ${zapis(Pr)}$.`);
  const poRozp = nawiasy ? [zapis(Lr), zapis(Pr)] : [zapis(L), zapis(P)];
  if (zapis(Ls) !== poRozp[0] || zapis(Ps) !== poRozp[1]) czesci.push(`Łączymy wyrazy podobne: $${zapis(Ls)} = ${zapis(Ps)}$.`);
  if (czesci.length) kroki.push(czesci.join(" "));

  const { a: aL, b: bL } = liniowa(L), { a: aP, b: bP } = liniowa(P);
  const A = aL.sub(aP), B = bP.sub(bL);
  if (A.zero) return null;
  const naLewo = aL.cmp(aP) > 0;
  const [aU, bU, aV, bV] = naLewo ? [aL, bL, aP, bP] : [aP, bP, aL, bL];
  const Ap = naLewo ? A : A.neg(), w = naLewo ? B : B.neg();
  const x = B.div(A);
  if (!(aV.zero && bU.zero)) {
    const xs = zapis(sumaZ([aU, aV.neg()].filter((c) => !c.zero).map((c) => czl(c))));
    const cs = zapis(sumaZ([bV, bU.neg()].filter((c) => !c.zero)));
    const ruch = naLewo ? `${xs} = ${cs}` : `${cs} = ${xs}`;
    const razem = naLewo ? `${zapis(lin(Ap, 0))} = ${zapis(num(w))}` : `${zapis(num(w))} = ${zapis(lin(Ap, 0))}`;
    kroki.push(`Niewiadome zbieramy po ${naLewo ? "lewej" : "prawej"} stronie, a liczby po drugiej (przenoszony wyraz zmienia znak): $${ruch}$${ruch !== razem ? `, czyli $${razem}$` : ""}${!naLewo && Ap.eq(1) ? `, więc $x = ${ulTex(x)}$` : ""}.`);
  }
  if (!Ap.eq(1)) kroki.push(`Dzielimy obie strony przez $${ulTex(Ap)}$: $${dzielenieTex(w, Ap, x)}$.`);
  else if (!kroki.length) kroki.push(`Z równania odczytujemy $x = ${ulTex(x)}$.`);
  if (sprawdzenie) {
    const env = { x };
    const wl = ocen(L0, env), wp = ocen(P0, env);
    const tl = zapis(podstaw(L0, env), { jawne: true }), tp = zapis(podstaw(P0, env), { jawne: true });
    kroki.push(tl.length <= 30 && tp.length <= 30 && !/frac/.test(tl + tp)
      ? `Sprawdzenie dla $x = ${ulTex(x)}$: lewa strona $${tl} = ${dz(wl)}$, prawa strona $${tp} = ${dz(wp)}$ – obie są równe.`
      : `Sprawdzenie dla $x = ${ulTex(x)}$: obie strony równania mają wartość $${dz(wl)}$.`);
  }
  return kroki;
}
/** Kolejne równania prowadzące do wyniku (TeX): uproszczone, „ax = b”, „x = …”. Do zadań z treścią. */
function przebieg(L, P) {
  const linie = [];
  const { a: aL, b: bL } = liniowa(L), { a: aP, b: bP } = liniowa(P);
  const A = aL.sub(aP), B = bP.sub(bL);
  const x = B.div(A);
  const naLewo = aL.cmp(aP) > 0;
  const Ap = naLewo ? A : A.neg(), w = naLewo ? B : B.neg();
  const dane = `${zapis(L)} = ${zapis(P)}`;
  const prosta = `${zapis(uprosc(L))} = ${zapis(uprosc(P))}`;
  if (prosta !== dane) linie.push(prosta);
  const razem = naLewo ? `${zapis(lin(Ap, 0))} = ${zapis(num(w))}` : `${zapis(num(w))} = ${zapis(lin(Ap, 0))}`;
  if (razem !== (linie.length ? linie[linie.length - 1] : dane)) linie.push(razem);
  if (!Ap.eq(1) || !/^x =/.test(linie[linie.length - 1])) linie.push(`x = ${ulTex(x)}`);
  return linie;
}

// --- 1. Zapisywanie wyrażeń: opis słowny -> wyrażenie
// Każdy opis zwraca: tresc (opowieść, może być pusta), pytanie albo czego, ok (poprawne wyrażenie), zle (kandydaci na błędne), zm (litery),
// znacz(env) – wartość „z treści” policzona niezależnie od wyrażenia, opis i pulapka – kroki rozwiązania.

const PARY_LITER = [["a", "b"], ["x", "y"], ["m", "n"], ["p", "q"]];
const lata = (n) => lm(n, ["rok", "lata", "lat"]);

const liczbowa = (pytanie, ok, zle, zmienne, znacz, opis, pulapka) => ({ pytanie, ok, zle, zm: zmienne, znacz, opis, pulapka });

const LICZBOWE = [
  (r) => {
    const k = r.int(2, 9);
    return liczbowa(
      `Które wyrażenie opisuje liczbę o $${k}$ większą od połowy liczby $n$?`,
      suma(ul("n", 2), k),
      [ul(suma("n", k), 2), suma(ul("n", 2), -k), suma(il(2, "n"), k), ul("n", 2 * k)],
      ["n"], (e) => q(e.n).div(2).add(k),
      `Połowa liczby $n$ to $\\frac{n}{2}$. „O $${k}$ większa” znaczy, że do tego wyniku dodajemy $${k}$: $\\frac{n}{2} + ${k}$.`,
      `Zapis $\\frac{n + ${k}}{2}$ to połowa sumy – wtedy $${k}$ też zostałoby podzielone przez $2$.`,
    );
  },
  (r) => {
    const m = r.int(2, 5), k = r.int(2, 9);
    const slowo = ["", "", "dwukrotności", "trzykrotności", "czterokrotności", "pięciokrotności"][m];
    return liczbowa(
      `Które wyrażenie opisuje liczbę o $${k}$ mniejszą od ${slowo} liczby $n$?`,
      suma(il(m, "n"), -k),
      [il(m, suma("n", -k)), suma(k, [-1, il(m, "n")]), suma(il(m, "n"), k), suma(ul("n", m), -k)],
      ["n"], (e) => q(m * e.n - k),
      `${cap(slowo)} liczby $n$ to $${m}n$. „O $${k}$ mniejsza” znaczy, że od tego wyniku odejmujemy $${k}$: $${m}n - ${k}$.`,
      `Zapis $${m}(n - ${k})$ oznaczałby, że najpierw odejmujemy $${k}$ od $n$, a dopiero potem mnożymy.`,
    );
  },
  (r) => {
    const k = r.int(2, 9);
    return liczbowa(
      `Które wyrażenie opisuje liczbę $${k}$ razy mniejszą od liczby $n$?`,
      ul("n", k),
      [suma("n", -k), il(k, "n"), ul(k, "n"), ul(1, il(k, "n"))],
      ["n"], (e) => q(e.n).div(k),
      `„$${k}$ razy mniejsza” to liczba podzielona na $${k}$ równe części: $n : ${k}$, czyli $\\frac{n}{${k}}$.`,
      `„O $${k}$ mniejsza” to odejmowanie ($n - ${k}$), a „$${k}$ razy mniejsza” to dzielenie.`,
    );
  },
  (r) => {
    const k = r.int(2, 9);
    return liczbowa(
      `Które wyrażenie opisuje iloczyn liczby $n$ i liczby o $${k}$ większej od $n$?`,
      il("n", suma("n", k)),
      [suma("n", suma("n", k)), suma(pot("n", 2), k), suma(il(k, "n"), "n"), il(suma("n", k), k)],
      ["n"], (e) => q(e.n).mul(q(e.n).add(k)),
      `Liczba o $${k}$ większa od $n$ to $n + ${k}$. „Iloczyn” to mnożenie, więc mnożymy $n$ przez tę sumę, a suma musi być w nawiasie: $n(n + ${k})$.`,
      `Zapis $n^2 + ${k}$ oznacza, że do kwadratu liczby $n$ dodano $${k}$, a to nie jest iloczyn $n$ i $n + ${k}$.`,
    );
  },
  (r) => {
    const [a, b] = r.pick(PARY_LITER);
    return liczbowa(
      `Które wyrażenie opisuje kwadrat sumy liczb $${a}$ i $${b}$?`,
      pot(suma(a, b), 2),
      [suma(pot(a, 2), pot(b, 2)), suma(a, pot(b, 2)), il(2, suma(a, b)), suma(pot(a, 2), b)],
      [a, b], (e) => q(e[a]).add(e[b]).pow(2),
      `Najpierw liczymy sumę: $${a} + ${b}$. „Kwadrat sumy” znaczy, że całą sumę podnosimy do kwadratu, więc musi stać w nawiasie: $(${a} + ${b})^2$.`,
      `Zapis $${a}^2 + ${b}^2$ to suma kwadratów, czyli co innego.`,
    );
  },
  (r) => {
    const [a, b] = r.pick(PARY_LITER);
    return liczbowa(
      `Które wyrażenie opisuje sumę kwadratów liczb $${a}$ i $${b}$?`,
      suma(pot(a, 2), pot(b, 2)),
      [pot(suma(a, b), 2), suma(a, pot(b, 2)), pot(il(a, b), 2), suma(pot(a, 2), b)],
      [a, b], (e) => q(e[a]).pow(2).add(q(e[b]).pow(2)),
      `Najpierw podnosimy do kwadratu każdą liczbę osobno: $${a}^2$ i $${b}^2$. Potem je dodajemy: $${a}^2 + ${b}^2$.`,
      `Zapis $(${a} + ${b})^2$ to kwadrat sumy – tam najpierw dodajemy, a dopiero potem podnosimy do kwadratu.`,
    );
  },
  (r) => {
    const [a, b] = r.pick(PARY_LITER);
    return liczbowa(
      `Które wyrażenie opisuje kwadrat różnicy liczb $${a}$ i $${b}$ (w tej kolejności)?`,
      pot(suma(a, [-1, b]), 2),
      [suma(pot(a, 2), [-1, pot(b, 2)]), suma(a, [-1, pot(b, 2)]), il(2, suma(a, [-1, b])), suma(pot(a, 2), [-1, b])],
      [a, b], (e) => q(e[a]).sub(e[b]).pow(2),
      `Najpierw liczymy różnicę: $${a} - ${b}$. Cała różnica jest podnoszona do kwadratu, więc musi stać w nawiasie: $(${a} - ${b})^2$.`,
      `Zapis $${a}^2 - ${b}^2$ to różnica kwadratów, czyli co innego.`,
    );
  },
  (r) => {
    const [a, b] = r.pick(PARY_LITER);
    return liczbowa(
      `Które wyrażenie opisuje różnicę kwadratów liczb $${a}$ i $${b}$ (w tej kolejności)?`,
      suma(pot(a, 2), [-1, pot(b, 2)]),
      [pot(suma(a, [-1, b]), 2), suma(a, [-1, pot(b, 2)]), suma(pot(b, 2), [-1, pot(a, 2)]), suma(pot(a, 2), [-1, b])],
      [a, b], (e) => q(e[a]).pow(2).sub(q(e[b]).pow(2)),
      `Podnosimy do kwadratu każdą liczbę osobno: $${a}^2$ i $${b}^2$. „Różnica” to odejmowanie w kolejności z polecenia: $${a}^2 - ${b}^2$.`,
      `Zapis $(${a} - ${b})^2$ to kwadrat różnicy, a $${b}^2 - ${a}^2$ ma odwróconą kolejność.`,
    );
  },
  (r) => {
    const [a, b] = r.pick(PARY_LITER);
    return liczbowa(
      `Które wyrażenie opisuje połowę sumy liczb $${a}$ i $${b}$?`,
      ul(suma(a, b), 2),
      [suma(ul(a, 2), b), suma(a, ul(b, 2)), ul(il(a, b), 2), il(2, suma(a, b))],
      [a, b], (e) => q(e[a]).add(e[b]).div(2),
      `Najpierw liczymy sumę: $${a} + ${b}$. Połowa to podzielenie przez $2$ całej sumy, więc suma musi być w liczniku: $\\frac{${a} + ${b}}{2}$.`,
      `Zapis $\\frac{${a}}{2} + ${b}$ to połowa tylko pierwszej liczby, do której dodano drugą w całości.`,
    );
  },
  (r) => {
    const [a, b] = r.pick(PARY_LITER);
    return liczbowa(
      `Które wyrażenie opisuje liczbę przeciwną do sumy liczb $${a}$ i $${b}$?`,
      suma([-1, suma(a, b)]),
      [suma([-1, a], b), suma(a, [-1, b]), ul(1, suma(a, b)), il(a, b)],
      [a, b], (e) => q(e[a]).add(e[b]).neg(),
      `Liczba przeciwna do liczby $c$ to $-c$. Tu $c$ jest całą sumą $${a} + ${b}$, więc minus musi stać przed nawiasem: $-(${a} + ${b})$.`,
      `Zapis $-${a} + ${b}$ zmienia znak tylko przy pierwszej liczbie. Minus przed nawiasem zmienia znaki wszystkich wyrazów w środku.`,
    );
  },
  (r) => {
    const [a, b] = r.pick(PARY_LITER);
    return liczbowa(
      `Które wyrażenie opisuje liczbę odwrotną do sumy liczb $${a}$ i $${b}$?`,
      ul(1, suma(a, b)),
      [suma(ul(1, a), ul(1, b)), suma(ul(1, a), b), suma([-1, suma(a, b)]), ul(suma(a, b), 2)],
      [a, b], (e) => q(1).div(q(e[a]).add(e[b])),
      `Liczba odwrotna do $c$ to $\\frac{1}{c}$. Tu $c$ jest całą sumą $${a} + ${b}$, więc w mianowniku stoi cała suma: $\\frac{1}{${a} + ${b}}$.`,
      `Zapis $\\frac{1}{${a}} + \\frac{1}{${b}}$ to suma liczb odwrotnych, a nie liczba odwrotna do sumy.`,
    );
  },
  () => liczbowa(
    "Najmniejsza z trzech kolejnych liczb naturalnych to $n$. Które wyrażenie opisuje sumę tych trzech liczb?",
    suma("n", suma("n", 1), suma("n", 2)),
    [suma("n", suma("n", 1), 2), suma(il(3, "n"), 1), il(3, suma("n", 2)), suma("n", il(2, suma("n", 1)))],
    ["n"], (e) => q(3 * e.n + 3),
    "Kolejne liczby naturalne różnią się o $1$, więc to $n$, $n + 1$ i $n + 2$. Ich suma to $n + (n + 1) + (n + 2)$.",
    "Trzecia liczba to $n + 2$, a nie $2$: do każdej kolejnej liczby trzeba dodać literę $n$.",
  ),
  () => liczbowa(
    "Najmniejsza z trzech kolejnych liczb parzystych to $2n$. Które wyrażenie opisuje sumę tych trzech liczb?",
    suma(il(2, "n"), suma(il(2, "n"), 2), suma(il(2, "n"), 4)),
    [suma(il(2, "n"), suma(il(2, "n"), 1), suma(il(2, "n"), 2)), suma(il(2, "n"), suma("n", 2), suma("n", 4)), suma(il(6, "n"), 2), suma(il(2, "n"), il(2, "n"), 6)],
    ["n"], (e) => q(6 * e.n + 6),
    "Kolejne liczby parzyste różnią się o $2$, więc to $2n$, $2n + 2$ i $2n + 4$. Ich suma to $2n + (2n + 2) + (2n + 4)$.",
    "Kolejne liczby parzyste różnią się o $2$, a nie o $1$ (liczby $2n$ i $2n + 1$ to parzysta i nieparzysta).",
  ),
  () => liczbowa(
    "Mniejsza z dwóch kolejnych liczb nieparzystych to $2n + 1$. Które wyrażenie opisuje ich sumę?",
    suma(suma(il(2, "n"), 1), suma(il(2, "n"), 3)),
    [suma(suma(il(2, "n"), 1), suma(il(2, "n"), 2)), suma(suma(il(2, "n"), 1), suma("n", 3)), suma(suma(il(2, "n"), 1), suma(il(2, "n"), 1)), suma(il(2, "n"), 4)],
    ["n"], (e) => q(4 * e.n + 4),
    "Kolejne liczby nieparzyste różnią się o $2$, więc to $2n + 1$ i $2n + 3$. Ich suma to $(2n + 1) + (2n + 3)$.",
    "Liczba $2n + 2$ jest parzysta. Następna nieparzysta po $2n + 1$ to $2n + 3$.",
  ),
  () => liczbowa(
    "Mniejsza z dwóch kolejnych liczb naturalnych to $n$. Które wyrażenie opisuje ich iloczyn?",
    il("n", suma("n", 1)),
    [il("n", suma("n", 2)), suma(pot("n", 2), 1), suma("n", suma("n", 1)), il(2, "n", suma("n", 1))],
    ["n"], (e) => q(e.n).mul(q(e.n).add(1)),
    "Większa z kolejnych liczb to $n + 1$. „Iloczyn” to mnożenie, więc $n \\cdot (n + 1)$, czyli $n(n + 1)$.",
    "Zapis $n + (n + 1)$ to suma tych liczb, a nie ich iloczyn.",
  ),
];

const PARY_TOWAROW = [
  [["zeszyt", "zeszyty", "zeszytów"], ["długopis", "długopisy", "długopisów"], "tańszy"],
  [["bułka", "bułki", "bułek"], ["pączek", "pączki", "pączków"], "tańszy"],
  [["ołówek", "ołówki", "ołówków"], ["gumka", "gumki", "gumek"], "tańsza"],
  [["batonik", "batoniki", "batoników"], ["sok", "soki", "soków"], "tańszy"],
];

const OPOWIESCI = [
  // wiek rodzica za t lat albo t lat temu
  (r) => {
    const [d] = osoby(r, 1);
    const rodzic = r.pick([{ n: "mama", dop: "mamy", m: false }, { n: "tata", dop: "taty", m: true }]);
    const k = r.int(2, 4), t = r.int(2, 9);
    const tresc = `${d.im} ma $x$ lat, a ${f(d, "jego", "jej")} ${rodzic.n} jest $${k}$ razy ${rodzic.m ? "starszy" : "starsza"} od ${f(d, "niego", "niej")}.`;
    const kx = il(k, "x");
    if (r.chance(0.6)) {
      return {
        tresc, czego: `wiek ${rodzic.dop} za $${t}$ ${lata(t)}`,
        ok: suma(kx, t), zle: [il(k, suma("x", t)), suma(kx, -t), suma("x", t), il(k, "x", t)],
        zm: ["x"], env: (rr) => ({ x: rr.int(8, 15) }), znacz: (e) => q(k * e.x + t),
        opis: `${cap(rodzic.n)} jest $${k}$ razy starsza, więc ma teraz $${k}x$ lat. Za $${t}$ ${lata(t)} będzie starsza o $${t}$, więc do jej obecnego wieku dodajemy $${t}$: $${k}x + ${t}$.`,
        pulapka: `Zapis $${k}(x + ${t})$ oznaczałby, że „$${k}$ razy starsza” dotyczy wieku za $${t}$ ${lata(t)}. A ten warunek dotyczy wieku teraz, lata się tylko dodaje.`,
      };
    }
    return {
      tresc, czego: `wiek ${rodzic.dop} $${t}$ ${lata(t)} temu`,
      ok: suma(kx, -t), zle: [il(k, suma("x", -t)), suma(kx, t), suma(t, [-1, kx]), suma("x", -t)],
      zm: ["x"], env: (rr) => ({ x: rr.int(8, 15) }), znacz: (e) => q(k * e.x - t),
      opis: `${cap(rodzic.n)} ma teraz $${k}x$ lat. Wiek sprzed $${t}$ lat to wiek obecny pomniejszony o $${t}$: $${k}x - ${t}$.`,
      pulapka: `Zapis $${k}(x - ${t})$ oznaczałby, że „$${k}$ razy starsza” dotyczy wieku sprzed $${t}$ lat. Ten warunek dotyczy wieku teraz.`,
    };
  },
  // trójka rodzeństwa
  (r) => {
    const [d] = osoby(r, 1);
    const a = r.int(2, 6), b = r.int(1, 5);
    return {
      tresc: `${d.im} ma $x$ lat. ${cap(f(d, "jego", "jej"))} siostra jest o $${a}$ ${lata(a)} starsza, a brat o $${b}$ ${lata(b)} młodszy od ${f(d, "niego", "niej")}.`,
      czego: "sumę lat całej trójki rodzeństwa",
      ok: suma("x", suma("x", a), suma("x", -b)),
      zle: [suma("x", suma("x", a), suma("x", b)), suma("x", suma("x", a), suma(b, [-1, "x"])), suma("x", suma("x", a)), suma("x", suma("x", a), -b)],
      zm: ["x"], env: (rr) => ({ x: rr.int(8, 16) }), znacz: (e) => q(3 * e.x + a - b),
      opis: `Siostra ma $x + ${a}$ lat (jest starsza), a brat $x - ${b}$ lat (jest młodszy). Dodajemy wiek wszystkich trojga: $x + (x + ${a}) + (x - ${b})$.`,
      pulapka: `Młodszy brat ma mniej lat, więc od $x$ odejmujemy: $x - ${b}$, a nie $x + ${b}$.`,
    };
  },
  // zakupy: dwa towary, drugi tańszy
  (r) => {
    const [A, B, tanszy] = r.pick(PARY_TOWAROW);
    const d = r.int(1, 3), m = r.int(2, 5), n = r.int(2, 5);
    return {
      tresc: `${cap(A[0])} kosztuje $x$ zł, a ${B[0]} jest o $${d}$ zł ${tanszy}.`,
      czego: `kwotę, którą trzeba zapłacić za $${m}$ ${lm(m, A)} i $${n}$ ${lm(n, B)}`,
      ok: suma(il(m, "x"), il(n, suma("x", -d))),
      zle: [suma(il(m, "x"), il(n, "x"), -d), il(m + n, suma("x", -d)), suma(il(m, "x"), suma("x", -d)), suma(il(m, "x"), il(n, "x"), d)],
      zm: ["x"], env: (rr) => ({ x: rr.int(4, 9) }), znacz: (e) => q(m * e.x + n * (e.x - d)),
      opis: `${cap(B[0])} kosztuje $x - ${d}$ zł. Za $${m}$ ${lm(m, A)} płacimy $${m}x$ zł, za $${n}$ ${lm(n, B)} płacimy $${n}(x - ${d})$ zł (cenę mnożymy przez liczbę sztuk, a cena jest w nawiasie). Razem: $${m}x + ${n}(x - ${d})$.`,
      pulapka: `Zapis $${m}x + ${n}x - ${d}$ obniża cenę tylko raz, a trzeba ją obniżyć przy każdej z $${n}$ sztuk.`,
    };
  },
  // reszta po zakupach
  (r) => {
    const [A, B] = r.pick(PARY_TOWAROW);
    const [o] = osoby(r, 1);
    const m = r.int(2, 5), n = r.int(2, 5);
    return {
      tresc: `${cap(A[0])} kosztuje $x$ zł, a ${B[0]} kosztuje $y$ zł. ${o.im} ${f(o, "kupił", "kupiła")} $${m}$ ${lm(m, A)} oraz $${n}$ ${lm(n, B)} i ${f(o, "zapłacił", "zapłaciła")} banknotem $100$ zł.`,
      czego: `resztę, jaką ${f(o, "dostał", "dostała")} ${o.im}`,
      ok: suma(100, [-1, suma(il(m, "x"), il(n, "y"))]),
      zle: [suma(100, [-1, il(m, "x")], il(n, "y")), suma(il(m, "x"), il(n, "y"), -100), suma(100, [-1, il(m, "x", n, "y")]), suma(100, [-1, il(m + n, "x", "y")])],
      zm: ["x", "y"], env: (rr) => ({ x: rr.int(2, 9), y: rr.int(2, 9) }), znacz: (e) => q(100 - m * e.x - n * e.y),
      opis: `Zakupy kosztują $${m}x + ${n}y$ zł. Reszta to pieniądze, które dał${f(o, "", "a")}, minus cała zapłata, więc zapłatę wkładamy w nawias: $100 - (${m}x + ${n}y)$.`,
      pulapka: `Bez nawiasu, $100 - ${m}x + ${n}y$, drugi składnik byłby dodany, a nie odjęty.`,
    };
  },
  // dwa odcinki trasy z różnymi prędkościami
  (r) => {
    const [pojazd, predkosci] = r.pick([["Rowerzysta jechał", [12, 15, 18, 20, 24]], ["Autobus jechał", [40, 50, 60, 70]], ["Pociąg jechał", [80, 90, 100, 120]]]);
    const [v1, v2] = r.shuffle(predkosci);
    return {
      tresc: `${pojazd} przez $x$ godzin z prędkością $${v1}$ km/h, a potem przez $y$ godzin z prędkością $${v2}$ km/h.`,
      czego: "długość całej trasy w kilometrach",
      ok: suma(il(v1, "x"), il(v2, "y")),
      zle: [il(v1 + v2, suma("x", "y")), suma(il(v1, "x"), v2, "y"), il(v1, "x", v2, "y"), suma(v1, "x", v2, "y")],
      zm: ["x", "y"], env: (rr) => ({ x: rr.int(1, 5), y: rr.int(1, 5) }), znacz: (e) => q(v1 * e.x + v2 * e.y),
      opis: `Droga to prędkość razy czas. Na pierwszym odcinku to $${v1}x$ km, na drugim $${v2}y$ km. Całą trasę dostajemy, dodając: $${v1}x + ${v2}y$.`,
      pulapka: `Prędkości dotyczą różnych odcinków, więc nie wolno ich dodać do siebie i pomnożyć przez sumę czasów, jak w $${v1 + v2}(x + y)$.`,
    };
  },
  // obwód albo pole figury z literami
  (r) => {
    const d = r.int(2, 6);
    const rodzaj = r.pick(["prostokat-o", "prostokat-p", "trojkat", "kwadrat-o", "kwadrat-p"]);
    const plus = suma("x", d);
    if (rodzaj === "prostokat-o") {
      return {
        tresc: `Jeden bok prostokąta ma długość $x$ cm, a drugi jest o $${d}$ cm dłuższy.`, czego: "obwód tego prostokąta w centymetrach",
        ok: suma(il(2, "x"), il(2, plus)), zle: [suma("x", plus), il("x", plus), suma(il(2, "x"), "x", d), suma(il(4, "x"), d)],
        zm: ["x"], env: (rr) => ({ x: rr.int(3, 12) }), znacz: (e) => q(4 * e.x + 2 * d),
        opis: `Boki mają długości $x$ i $x + ${d}$. W prostokącie są dwa boki każdej długości, więc obwód to $2x + 2(x + ${d})$.`,
        pulapka: `Zapis $x + (x + ${d})$ to tylko dwa boki, a prostokąt ma cztery. Zapis $x(x + ${d})$ to pole.`,
      };
    }
    if (rodzaj === "prostokat-p") {
      return {
        tresc: `Jeden bok prostokąta ma długość $x$ cm, a drugi jest o $${d}$ cm dłuższy.`, czego: "pole tego prostokąta w centymetrach kwadratowych",
        ok: il("x", plus), zle: [suma(il(2, "x"), il(2, plus)), suma("x", plus), suma(pot("x", 2), d), il(2, "x", plus)],
        zm: ["x"], env: (rr) => ({ x: rr.int(3, 12) }), znacz: (e) => q(e.x * (e.x + d)),
        opis: `Boki mają długości $x$ i $x + ${d}$. Pole prostokąta to iloczyn dwóch sąsiednich boków, a sumę wstawiamy w nawias: $x(x + ${d})$.`,
        pulapka: `Zapis $2x + 2(x + ${d})$ to obwód, a pole to mnożenie boków, a nie dodawanie.`,
      };
    }
    if (rodzaj === "trojkat") {
      return {
        tresc: `Podstawa trójkąta równoramiennego ma długość $x$ cm, a każde z dwóch ramion jest o $${d}$ cm dłuższe od podstawy.`, czego: "obwód tego trójkąta w centymetrach",
        ok: suma("x", il(2, plus)), zle: [suma("x", "x", d), suma(il(2, "x"), plus), il(3, plus), suma(il(3, "x"), d)],
        zm: ["x"], env: (rr) => ({ x: rr.int(3, 12) }), znacz: (e) => q(e.x + 2 * (e.x + d)),
        opis: `Podstawa ma $x$, a każde ramię $x + ${d}$. Ramiona są dwa, więc obwód to $x + 2(x + ${d})$.`,
        pulapka: `Oba ramiona są dłuższe o $${d}$, więc $${d}$ trzeba dodać dwa razy. Zapis $x + x + ${d}$ uwzględnia tylko jedno ramię.`,
      };
    }
    if (rodzaj === "kwadrat-o") {
      return {
        tresc: `Bok kwadratu ma długość $x + ${d}$ cm.`, czego: "obwód tego kwadratu w centymetrach",
        ok: il(4, plus), zle: [suma(il(4, "x"), d), pot(plus, 2), suma(pot("x", 2), d), il(2, plus)],
        zm: ["x"], env: (rr) => ({ x: rr.int(3, 12) }), znacz: (e) => q(4 * (e.x + d)),
        opis: `Kwadrat ma cztery równe boki po $x + ${d}$, więc obwód to $4(x + ${d})$ (cały bok w nawiasie).`,
        pulapka: `Zapis $4x + ${d}$ mnoży przez $4$ tylko $x$, a trzeba całą długość boku. Zapis $(x + ${d})^2$ to pole.`,
      };
    }
    return {
      tresc: `Bok kwadratu ma długość $x + ${d}$ cm.`, czego: "pole tego kwadratu w centymetrach kwadratowych",
      ok: pot(plus, 2), zle: [suma(pot("x", 2), pot(d, 2)), suma(pot("x", 2), d), il(4, plus), il(2, plus)],
      zm: ["x"], env: (rr) => ({ x: rr.int(3, 12) }), znacz: (e) => q((e.x + d) * (e.x + d)),
      opis: `Pole kwadratu to bok razy bok, czyli bok do kwadratu. Bokiem jest cała suma, więc stoi w nawiasie: $(x + ${d})^2$.`,
      pulapka: `Zapis $x^2 + ${d}^2$ pomija mnożenie $x$ przez $${d}$. Dla $x = 1$: $(1 + ${d})^2 = ${(1 + d) ** 2}$, a $1 + ${d * d} = ${1 + d * d}$.`,
    };
  },
  // pieniądze trzech osób
  (r) => {
    const [a, b, c] = osoby(r, 3);
    const d = r.int(2, 9), k = r.int(2, 3);
    return {
      tresc: `${a.im} ma $x$ zł. ${b.im} ma o $${d}$ zł więcej niż ${a.im}, a ${c.im} ma $${k}$ razy więcej pieniędzy niż ${b.im}.`,
      czego: "liczbę złotych, jaką mają razem wszyscy troje",
      ok: suma("x", suma("x", d), il(k, suma("x", d))),
      zle: [suma("x", suma("x", d), il(k, "x")), suma("x", suma("x", d), suma(il(k, "x"), d)), il(k, suma("x", suma("x", d))), suma(il(3, "x"), d)],
      zm: ["x"], env: (rr) => ({ x: rr.int(5, 20) }), znacz: (e) => q(e.x + (e.x + d) + k * (e.x + d)),
      opis: `${b.im} ma $x + ${d}$ zł, a ${c.im} ma $${k}$ razy tyle, czyli $${k}(x + ${d})$ zł (cała kwota ${b.im} w nawiasie). Razem: $x + (x + ${d}) + ${k}(x + ${d})$.`,
      pulapka: `${c.im} ma $${k}$ razy więcej niż ${b.im}, a nie niż ${a.im}, więc mnożymy $x + ${d}$, a nie samo $x$.`,
    };
  },
  // wydała połowę pieniędzy i jeszcze k zł
  (r) => {
    const [o] = osoby(r, 1);
    const k = r.int(2, 12);
    return {
      tresc: `${o.im} ${f(o, "miał", "miała")} $x$ zł. ${f(o, "Wydał", "Wydała")} połowę swoich pieniędzy i jeszcze $${k}$ zł.`,
      czego: `kwotę, która ${f(o, "mu", "jej")} została`,
      ok: suma("x", [-1, suma(ul("x", 2), k)]),
      zle: [suma("x", [-1, ul("x", 2)], k), ul(suma("x", -k), 2), suma("x", -k), ul("x", 2)],
      zm: ["x"], env: (rr) => ({ x: 2 * rr.int(8, 20) }), znacz: (e) => q(e.x).sub(q(e.x).div(2).add(k)),
      opis: `Wydano $\\frac{x}{2}$ i jeszcze $${k}$ zł, czyli razem $\\frac{x}{2} + ${k}$. To, co zostało, to wszystkie pieniądze minus wydana kwota, więc wydaną kwotę bierzemy w nawias: $x - \\left(\\frac{x}{2} + ${k}\\right)$.`,
      pulapka: `Bez nawiasu, $x - \\frac{x}{2} + ${k}$, kwota $${k}$ zostałaby dodana, a przecież też została wydana.`,
    };
  },
];
/** Zadanie „wybierz wyrażenie” z jednego opisu; korzysta z wybierzBledne i punktu, w którym wszystkie wyrażenia dają różne liczby. */
function budujWybor(r, s) {
  const zle = wybierzBledne(r, s.ok, s.zle);
  if (!zle) return null;
  const m = mieszaj(r, `$${zapis(s.ok)}$`, zle.map((e) => `$${zapis(e)}$`));
  const env = punktRozny([s.ok, ...zle], s.zm);
  if (!m || !env) return null;
  if (!s.znacz(env).eq(ocen(s.ok, env))) throw new Error(`Opis niezgodny z wyrażeniem: ${zapis(s.ok)}`);
  return { zle, m, env };
}

function zapisWyrazenia(r) {
  const { s, zle, m, env } = probuj(() => {
    const s = r.chance(0.5) ? r.pick(LICZBOWE)(r) : r.pick(OPOWIESCI)(r);
    const w = budujWybor(r, s);
    return w ? { s, ...w } : null;
  });
  const tresc = [s.tresc, s.pytanie ?? `Które wyrażenie opisuje ${s.czego}?`].filter(Boolean).join(" ");
  const v = ocen(s.ok, env);
  const sprawdz = `Sprawdźmy na liczbach: niech ${wartosciTekst(env, s.zm)}. Z treści zadania wychodzi $${dz(v)}$. Wyrażenie $${zapis(s.ok)}$ daje $${dz(v)}$ – zgadza się. Pozostałe dają: ${zle.map((e) => `$${zapis(e)}$ – $${dz(ocen(e, env))}$`).join("; ")}, więc nie pasują.`;
  return zad(
    tresc,
    [polew("wyrazenie", "Wyrażenie", m.opcje)],
    { wyrazenie: m.ind },
    `$${zapis(s.ok)}$`,
    [s.opis, s.pulapka, sprawdz].filter(Boolean),
  );
}

function zapisIWartosc(r) {
  const { s, zle, m, env } = probuj(() => {
    const s = r.pick(OPOWIESCI)(r);
    const w = budujWybor(r, s);
    return w ? { s, ...w, env: s.env(r) } : null;
  });
  const v = ocen(s.ok, env);
  if (!s.znacz(env).eq(v)) throw new Error(`Opis niezgodny z wyrażeniem: ${zapis(s.ok)}`);
  const wartosci = wartosciTekst(env, s.zm);
  const podstawione = zapis(podstaw(s.ok, env), { jawne: true });
  return zad(
    `${s.tresc} Które wyrażenie opisuje ${s.czego}? Następnie oblicz wartość tego wyrażenia dla ${wartosci}.`,
    [polew("wyrazenie", "Wyrażenie", m.opcje), pole("wartosc", "Wartość wyrażenia")],
    { wyrazenie: m.ind, wartosc: v },
    `$${zapis(s.ok)}$, wartość: $${dz(v)}$`,
    [
      s.opis,
      podstawione.length <= 28 ? `Podstawiamy ${wartosci}: $${podstawione} = ${dz(v)}$.` : `Podstawiamy ${wartosci}: $${podstawione}$, czyli $${dz(v)}$.`,
      s.pulapka,
    ].filter(Boolean),
  );
}

// --- 2. Wartość wyrażenia: podstawianie liczb (także ujemnych i ułamków), wyrażenia z dwiema literami, wzory

/** Odpowiedź „ładna”: liczba całkowita do 100 000, ułamek o mianowniku do 40 albo dziesiętny z najwyżej 4 cyframi po przecinku. */
const ladna = (v) => Math.abs(v.n) <= 100000 && (v.d <= 40 || 10000 % v.d === 0);
const nz = (r, n) => r.intBez(-n, n, 0);

const X_CALK = [-5, -4, -3, -2, -1, 2, 3, 4, 5, 6];
const X_ULAM = [q(1, 2), q(-1, 2), q(3, 2), q(-3, 2), q(1, 3), q(-1, 3), q(2, 3), q(-2, 3), q(1, 4), q(-1, 4), q(5, 2), q(-5, 2)];
const X_DZ = [q(1, 2), q(-1, 2), q(3, 2), q(-3, 2), q(5, 2), q(-5, 2), q(1, 5), q(-1, 5), q(1, 10), q(7, 2)];

/** Wyrażenia z jedną literą $x$; dz – czy nadają się do liczb dziesiętnych i ułamków (bez dzielenia przez liczbę). */
const WYRAZENIA_X = [
  { dz: true, f: (r) => pol([r.pick([1, 2, 3, 4, 5, -1, -2, -3]), nz(r, 6), r.int(-9, 9)]) },
  { dz: true, f: (r) => suma(r.int(1, 20), [-1, il(r.int(2, 5), suma("x", nz(r, 5)))]) },
  { dz: true, f: (r) => suma(il(r.int(2, 5), suma("x", -r.int(1, 5))), czl(nz(r, 4))) },
  { dz: true, f: (r) => suma(il(r.int(2, 6), pot("x", 2)), -r.int(1, 9)) },
  { dz: true, f: (r) => suma(r.int(1, 12), il(r.int(2, 5), pot("x", 2))) },
  { dz: true, f: (r) => suma(pot(suma("x", nz(r, 4)), 2), r.int(-6, 6)) },
  { dz: true, f: (r) => suma(il(r.int(2, 5), pot("x", 2)), [-1, suma("x", nz(r, 6))]) },
  { dz: true, f: (r) => suma(r.int(-4, 12), [-1, pot("x", 2)]) },
  { dz: true, f: (r) => suma([-1, pot("x", 2)], czl(r.int(2, 9))) },
  { dz: true, f: (r) => suma(pot(il(r.int(2, 4), "x"), 2), czl(nz(r, 5))) },
  { dz: true, f: (r) => lin(nz(r, 9), nz(r, 12)) },
  { dz: false, f: (r) => ul(suma("x", r.int(-8, 10)), r.int(2, 5)) },
  { dz: false, f: (r) => ul(suma(czl(r.int(2, 5)), nz(r, 9)), r.int(2, 5)) },
];

function podstawianieLiczby(r) {
  return probuj(() => {
    const rodzaj = r.pick(["calk", "calk", "calk", "calk", "calk", "calk", "ulam", "ulam", "dz"]);
    const wzor = r.pick(rodzaj === "calk" ? WYRAZENIA_X : WYRAZENIA_X.filter((w) => w.dz));
    const x = Q.z(r.pick(rodzaj === "calk" ? X_CALK : rodzaj === "ulam" ? X_ULAM : X_DZ));
    const E = wzor.f(r);
    const v = ocen(E, { x });
    if (!ladna(v) || (rodzaj !== "calk" && v.d > 12)) return null;
    const dec = rodzaj === "dz";
    const et = etapy(E, { x }, { dz: dec });
    if (et.length > 5 || et.some((e) => szerokosc(e.tex) > 30)) return null;
    const xTxt = dec ? dz(x) : x.tex();
    const wyn = dec ? dz(v) : ulTex(v);
    const kroki = et.map((e, i) => (i === 0
      ? `Za $x$ wstawiamy $${xTxt}$${x.ujemna ? " (liczbę ujemną zawsze bierzemy w nawias)" : ""}: $${e.tex}$.`
      : `${e.opis}: $${e.tex}$.`));
    const pytanie = r.pick([
      `Oblicz wartość wyrażenia $${zapis(E)}$ dla $x = ${xTxt}$.`,
      `Ile wynosi wartość wyrażenia $${zapis(E)}$ dla $x = ${xTxt}$?`,
      `Wartość wyrażenia $${zapis(E)}$ dla $x = ${xTxt}$ jest równa:`,
    ]);
    return zad(
      `${pytanie}${!v.calkowita && !dec ? PODPOWIEDZ_ULAMEK : ""}`,
      [pole("wartosc", "Wartość wyrażenia")],
      { wartosc: v },
      `$${wyn}$`,
      kroki,
    );
  });
}

/** Wyrażenia z dwiema literami A i B. */
const WYRAZENIA_AB = [
  (r, A, B) => suma(czl(nz(r, 5), A), czl(nz(r, 5), B)),
  (r, A, B) => suma(il(A, B), czl(nz(r, 4), A)),
  (r, A, B) => suma(pot(A, 2), czl(nz(r, 5), B)),
  (r, A, B) => suma(pot(A, 2), [r.pick([1, -1]), pot(B, 2)]),
  (r, A, B) => pot(suma(A, [r.pick([1, -1]), B]), 2),
  (r, A, B) => ul(suma(A, B), suma(A, [-1, B])),
  (r, A, B) => ul(suma(czl(nz(r, 4), A), czl(nz(r, 4), B)), r.int(2, 5)),
  (r, A, B) => suma(il(A, suma(B, nz(r, 4))), B),
  (r, A, B) => suma(r.int(1, 15), [-1, il(A, B)]),
  (r, A, B) => suma(czl(nz(r, 5), A), czl(nz(r, 3), B, 2)),
  (r, A, B) => ul(il(A, B), r.int(2, 4)),
  (r, A, B) => suma(il(r.int(2, 4), suma(A, [-1, B])), A),
];
const A_B_WARTOSCI = [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8];

function dwieLitery(r) {
  return probuj(() => {
    const [A, B] = r.pick(PARY_LITER);
    const E = r.pick(WYRAZENIA_AB)(r, A, B);
    const env = { [A]: r.pick(A_B_WARTOSCI), [B]: r.pick(A_B_WARTOSCI) };
    let v;
    try { v = ocen(E, env); } catch { return null; }
    if (!ladna(v) || v.d > 12) return null;
    const et = etapy(E, env);
    if (et.length > 5) return null;
    const kroki = et.map((e, i) => (i === 0
      ? `Za litery wstawiamy liczby (${wartosciTekst(env, [A, B])})${Object.values(env).some((v) => v < 0) ? ", ujemne w nawiasie" : ""}: $${e.tex}$.`
      : `${e.opis}: $${e.tex}$.`));
    return zad(
      `Oblicz wartość wyrażenia $${zapis(E)}$ dla ${wartosciTekst(env, [A, B])}.${!v.calkowita ? PODPOWIEDZ_ULAMEK : ""}`,
      [pole("wartosc", "Wartość wyrażenia")],
      { wartosc: v },
      `$${ulTex(v)}$`,
      kroki,
    );
  });
}

/** Wzory z życia: tresc, wzór (drzewo), litery w kolejności podawania, jednostki i etykieta odpowiedzi. */
const WZORY_PODSTAWIANIE = [
  (r) => ({
    intro: "Pole trapezu o podstawach $a$ i $b$ oraz wysokości $h$ opisuje wzór",
    lewa: "P", E: ul(il(suma("a", "b"), "h"), 2), env: { a: r.int(3, 12), b: r.int(3, 12), h: r.int(2, 9) },
    jed: { a: "cm", b: "cm", h: "cm" }, pyt: (d) => `Oblicz pole trapezu, w którym ${d}.`, etykieta: "Pole $P$ (w $\\text{cm}^2$)",
  }),
  (r) => ({
    intro: "Drogę $s$ przebytą ze stałą prędkością $v$ w czasie $t$ opisuje wzór",
    lewa: "s", E: il("v", "t"), env: { v: r.pick([30, 40, 45, 50, 60, 80, 90]), t: r.pick([q(1, 2), q(3, 2), q(5, 2), 2, 3, q(7, 2), 4]) },
    jed: { v: "km/h", t: "h" }, pyt: (d) => `Oblicz drogę, jeśli ${d}.`, etykieta: "Droga $s$ (w km)",
  }),
  (r) => ({
    intro: "Obwód prostokąta o bokach $a$ i $b$ opisuje wzór",
    lewa: "O", E: suma(il(2, "a"), il(2, "b")), env: { a: r.pick([q(15, 2), q(5, 2), q(7, 2), q(21, 5), q(12, 5), 6, 9, 11]), b: r.int(2, 12) },
    jed: { a: "cm", b: "cm" }, pyt: (d) => `Oblicz obwód prostokąta, w którym ${d}.`, etykieta: "Obwód $O$ (w cm)",
  }),
  (r) => ({
    intro: "Temperaturę $F$ w stopniach Fahrenheita można obliczyć ze wzoru", po: ", gdzie $C$ to temperatura w stopniach Celsjusza.",
    lewa: "F", ulamki: true, E: suma(il(q(9, 5), "C"), 32), env: { C: r.pick([-20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40]) },
    jed: { C: "" }, pyt: (d) => `Ile wynosi $F$, gdy ${d}?`, etykieta: "Temperatura $F$",
  }),
  (r) => ({
    intro: "Objętość prostopadłościanu o krawędziach $a$, $b$ i $c$ opisuje wzór",
    lewa: "V", E: il("a", "b", "c"), env: { a: r.pick([2, 3, 4, 5, q(5, 2), q(3, 2)]), b: r.int(2, 8), c: r.pick([2, 3, 4, 6, 10]) },
    jed: { a: "cm", b: "cm", c: "cm" }, pyt: (d) => `Oblicz objętość prostopadłościanu, w którym ${d}.`, etykieta: "Objętość $V$ (w $\\text{cm}^3$)",
  }),
  (r) => ({
    intro: "Pole trójkąta o podstawie $a$ i wysokości $h$ opisuje wzór",
    lewa: "P", E: ul(il("a", "h"), 2), env: { a: r.int(3, 16), h: r.int(2, 12) },
    jed: { a: "cm", h: "cm" }, pyt: (d) => `Oblicz pole trójkąta, w którym ${d}.`, etykieta: "Pole $P$ (w $\\text{cm}^2$)",
  }),
  (r) => ({
    intro: "Pole powierzchni sześcianu o krawędzi $a$ opisuje wzór",
    lewa: "P", E: il(6, pot("a", 2)), env: { a: r.pick([2, 3, 4, 5, q(1, 2), q(3, 2), q(5, 2), 10]) },
    jed: { a: "cm" }, pyt: (d) => `Oblicz pole powierzchni sześcianu, w którym ${d}.`, etykieta: "Pole $P$ (w $\\text{cm}^2$)",
  }),
  (r) => ({
    intro: "Średnią arytmetyczną $S$ trzech liczb $a$, $b$ i $c$ opisuje wzór",
    lewa: "S", E: ul(suma("a", "b", "c"), 3), env: { a: r.int(-6, 12), b: r.int(-6, 12), c: r.int(-6, 12) },
    jed: { a: "", b: "", c: "" }, pyt: (d) => `Oblicz średnią arytmetyczną, gdy ${d}.`, etykieta: "Średnia $S$",
  }),
  (r) => ({
    intro: "Prędkość $v$ ruchu jednostajnego opisuje wzór",
    lewa: "v", E: ul("s", "t"), env: { s: r.pick([60, 90, 120, 150, 180, 240, 300]), t: r.pick([2, 3, 4, 5, q(5, 2), q(3, 2)]) },
    jed: { s: "km", t: "h" }, pyt: (d) => `Oblicz prędkość, jeśli ${d}.`, etykieta: "Prędkość $v$ (w km/h)",
  }),
];

function podstawianieDoWzoru(r) {
  return probuj(() => {
    const w = r.pick(WZORY_PODSTAWIANIE)(r);
    const kol = Object.keys(w.env);
    const v = ocen(w.E, w.env);
    if (!ladna(v) || v.d > 12) return null;
    const dane = wymien(kol.map((z) => `$${z} = ${dz(w.env[z])}$${w.jed[z] ? ` ${w.jed[z]}` : ""}`));
    const et = etapy(w.E, w.env, { dz: !w.ulamki });
    if (et.length > 5) return null;
    const kroki = [
      `Wzór przepisujemy i za litery wstawiamy liczby${kol.some((z) => Q.z(w.env[z]).ujemna) ? " (ujemne w nawiasie)" : ""}: $${w.lewa} = ${et[0].tex}$.`,
      ...et.slice(1).map((e, i, wszystkie) => (i === wszystkie.length - 1
        ? `Wynik: $${w.lewa} = ${e.tex}$.`
        : `${e.opis}: $${w.lewa} = ${e.tex}$.`)),
    ];
    return zad(
      `${w.intro} $${w.lewa} = ${zapis(w.E, { jawne: "wzor" })}$${w.po ?? "."} ${w.pyt(dane)}`,
      [pole("wartosc", w.etykieta)],
      { wartosc: v },
      `$${w.lewa} = ${dz(v)}$`,
      kroki,
    );
  });
}

function wartoscWyrazenia2(r) {
  return r.chance(0.55) ? dwieLitery(r) : podstawianieDoWzoru(r);
}

// --- 3. Upraszczanie i mnożenie wyrażeń

/** Grupy składników o tym samym jednomianie (wyrazy podobne), od najwyższego stopnia. */
function grupyPodobnych(lista) {
  const grupy = new Map();
  for (const [z, m] of lista) {
    const t = Object.values(rozwin(m))[0];
    const k = kluczMon(t.w);
    if (!grupy.has(k)) grupy.set(k, { st: stopien(t.w), lista: [] });
    grupy.get(k).lista.push([z, m]);
  }
  return [...grupy.values()].sort((a, b) => b.st - a.st);
}
/** „$4x - x = 3x$ i $3y + 2y = 5y$” – tylko grupy, w których jest co łączyć; null, gdy nie ma czego. */
function laczenie(lista) {
  const czesci = grupyPodobnych(lista).filter((g) => g.lista.length > 1).map((g) => {
    const s = sumaZ(g.lista);
    return `$${zapis(s)} = ${zapis(uprosc(s))}$`;
  });
  return czesci.length ? wymien(czesci) : null;
}
/** Iloraz jednomianów (drzewa o dodatnich współczynnikach). */
function dzielMon(a, b) {
  const x = Object.values(rozwin(a))[0], y = Object.values(rozwin(b))[0];
  const w = { ...x.w };
  for (const z of Object.keys(y.w)) {
    w[z] = (w[z] ?? 0) - y.w[z];
    if (w[z] === 0) delete w[z];
  }
  return wielAst({ [kluczMon(w)]: { c: x.c.div(y.c), w } });
}
const wspolczynnik = (p, k) => p[k]?.c ?? q(0);

const FORMY_UPROSZCZENIA = {
  "ax+b": { postac: "ax + b", pola: ["a", "b"], odczyt: (p) => ({ a: wspolczynnik(p, "x"), b: wspolczynnik(p, "") }) },
  "ax+by": { postac: "ax + by", pola: ["a", "b"], odczyt: (p) => ({ a: wspolczynnik(p, "x"), b: wspolczynnik(p, "y") }) },
  "x2+bx+c": { postac: "x^2 + bx + c", pola: ["b", "c"], odczyt: (p) => ({ b: wspolczynnik(p, "x"), c: wspolczynnik(p, "") }) },
  "ax2+bx+c": { postac: "ax^2 + bx + c", pola: ["a", "b", "c"], odczyt: (p) => ({ a: wspolczynnik(p, "x2"), b: wspolczynnik(p, "x"), c: wspolczynnik(p, "") }) },
};

function uproszczenie(r) {
  return probuj(() => {
    const typ = r.pick(["nawiasy", "nawiasy", "minus", "minus", "litery", "iloczyn", "iloczyn", "iloczyn-x", "ulamek", "trzy"]);
    let E, forma, wskazowka;
    if (typ === "nawiasy") {
      const m = r.int(1, 5), n = r.int(1, 5), p = nz(r, 6), qq = nz(r, 6);
      const t = [[1, il(m, suma("x", p))], [r.pick([1, -1]), il(n, suma("x", qq))]];
      if (r.chance(0.35)) t.unshift(r.chance(0.5) ? czl(nz(r, 4)) : [1, num(r.int(1, 9))]);
      E = suma(...t);
      forma = "ax+b";
    } else if (typ === "minus") {
      const e = r.int(-6, 6);
      const t = [czl(nz(r, 7))];
      if (e) t.push(e);
      t.push([r.pick([-1, -1, 1]), lin(nz(r, 5), nz(r, 7))]);
      E = suma(...t);
      forma = "ax+b";
    } else if (typ === "litery") {
      const t = r.shuffle([[nz(r, 6), "x"], [nz(r, 6), "y"], [nz(r, 6), "x"], [nz(r, 6), "y"]]);
      E = suma(...t.map(([c, v]) => czl(c, v)));
      forma = "ax+by";
    } else if (typ === "iloczyn") {
      E = il(suma("x", nz(r, 7)), suma("x", nz(r, 7)));
      forma = "x2+bx+c";
      wskazowka = "iloczyn";
    } else if (typ === "iloczyn-x") {
      E = suma(il(suma("x", nz(r, 7)), suma("x", nz(r, 7))), [-1, pot("x", 2)]);
      forma = "ax+b";
      wskazowka = "iloczyn";
    } else if (typ === "ulamek") {
      const m = r.pick([2, 3, 4, 5]), licznik = r.pick([1, 1, 1, 2, 3]);
      const t = [[1, il(q(licznik, m), lin(m * nz(r, 4), m * nz(r, 4)))], czl(nz(r, 4))];
      E = suma(...t);
      forma = "ax+b";
    } else {
      E = il(lin(r.int(2, 3), nz(r, 5)), suma("x", nz(r, 5)));
      forma = "ax2+bx+c";
      wskazowka = "iloczyn";
    }
    const p = rozwin(E);
    if (Object.keys(p).some((k) => !["", "x", "y", "x2"].includes(k))) return null;
    const odp = FORMY_UPROSZCZENIA[forma].odczyt(p);
    const f0 = FORMY_UPROSZCZENIA[forma];
    if (f0.pola.some((id) => odp[id].zero)) return null;
    if (forma === "x2+bx+c" && !wspolczynnik(p, "x2").eq(1)) return null;
    if (forma === "ax+b" && Object.keys(p).some((k) => k === "x2")) return null;
    const kroki = [];
    const rozp = rozpisz(E);
    const lista = skladniki(E);
    if (zapis(rozp) !== zapis(E)) {
      kroki.push(wskazowka === "iloczyn"
        ? `Mnożymy każdy wyraz z pierwszego nawiasu przez każdy wyraz z drugiego, więc będą cztery iloczyny: $${zapis(rozp)}$.`
        : `Rozpisujemy nawiasy${opisNawiasow(E)}: $${zapis(rozp)}$.`);
    }
    const l = laczenie(lista);
    const wynik = uprosc(E);
    if (l) kroki.push(`Łączymy wyrazy podobne: ${l}.`);
    kroki.push(`Wyrażenie ma więc postać $${zapis(wynik)}$, czyli ${wymien(f0.pola.map((id) => `$${id} = ${ulTex(odp[id])}$`))}.`);
    const env = { x: 2, y: 3 };
    const v = ocen(E, env);
    if (!v.eq(ocen(wynik, env))) throw new Error(`Błąd upraszczania: ${zapis(E)}`);
    kroki.push(`Sprawdzenie dla ${wartosciTekst(env, forma === "ax+by" ? ["x", "y"] : ["x"])}: wyrażenie z zadania i wynik mają tę samą wartość $${ulTex(v)}$.`);
    const polecenie = wskazowka === "iloczyn" ? "Po wymnożeniu i uproszczeniu" : "Po uproszczeniu";
    const prosi = f0.pola.length === 3 ? `$${f0.pola[0]}$, $${f0.pola[1]}$ i $${f0.pola[2]}$` : `$${f0.pola[0]}$ i $${f0.pola[1]}$`;
    const ulamki = f0.pola.some((id) => !odp[id].calkowita) ? PODPOWIEDZ_ULAMEK : "";
    return zad(
      `${polecenie} wyrażenie $${zapis(E)}$ ma postać $${f0.postac}$. Podaj liczby ${prosi}.${ulamki}`,
      f0.pola.map((id) => pole(id, `$${id} =$`)),
      Object.fromEntries(f0.pola.map((id) => [id, odp[id]])),
      `$${zapis(wynik)}$, czyli ${wymien(f0.pola.map((id) => `$${id} = ${ulTex(odp[id])}$`))}`,
      kroki,
    );
  });
}

// --- Wybór postaci wyrażenia: wyłączanie przed nawias, mnożenie sum, nawias z minusem

const PUNKTY_MALE = [{ x: 2, y: 3 }, { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 1 }];

/** Zadanie „które wyrażenie jest równe E”: ok – poprawna postać, kand – kandydaci na błędne, kroki – wyjaśnienie przed sprawdzeniem liczbą. */
function wyborRownego(r, E, ok, kand, kroki, zmienne = ["x"]) {
  const zle = wybierzBledne(r, ok, kand);
  if (!zle) return null;
  if (!PUNKTY.every((env) => ocen(E, env).eq(ocen(ok, env)))) throw new Error(`Wyrażenia nie są równe: ${zapis(E)} i ${zapis(ok)}`);
  const m = mieszaj(r, `$${zapis(ok)}$`, zle.map((e) => `$${zapis(e)}$`));
  const pe = PUNKTY_MALE.find((env) => new Set([ok, ...zle].map((e) => podpis(e, env))).size === 4);
  if (!m || !pe) return null;
  const env = Object.fromEntries(zmienne.map((z) => [z, pe[z]]));
  const v = ocen(E, env);
  const sprawdzenie = `Sprawdzenie liczbą: dla ${wartosciTekst(env, zmienne)} wyrażenie z zadania ma wartość $${ulTex(v)}$. Poprawna odpowiedź daje tyle samo, a błędne: ${zle.map((e) => `$${zapis(e)}$ – $${ulTex(ocen(e, env))}$`).join("; ")}.`;
  return zad(
    `Które wyrażenie jest równe wyrażeniu $${zapis(E)}$?`,
    [polew("rowne", "Wyrażenie równe podanemu", m.opcje)],
    { rowne: m.ind },
    `$${zapis(ok)}$`,
    [...kroki, sprawdzenie],
  );
}

function wylaczanieWybor(r) {
  return probuj(() => {
    const s = r.pick([1, -1]);
    if (r.chance(0.55)) {
      const g = r.int(2, 9), u = r.int(1, 6), v = r.int(1, 8);
      if (nwd(u, v) !== 1) return null;
      const E = lin(g * u, s * g * v);
      const ok = il(g, lin(u, s * v));
      const kand = [il(g, lin(u, s * g * v)), il(g, lin(u, -s * v)), il(u, lin(g, s * v)), il(g, lin(1, s * v)), lin(g, s * v)];
      return wyborRownego(r, E, ok, kand, krokiWylaczania(E, num(g), ok));
    }
    const g = r.int(1, 6), u = r.int(1, 5), v = r.int(1, 6);
    if (nwd(u, v) !== 1) return null;
    if (r.chance(0.6)) {
      const E = suma(czl(g * u, "x", 2), czl(s * g * v, "x"));
      const wsp = il(g, "x");
      const ok = il(wsp, lin(u, s * v));
      const kand = [il(wsp, lin(u, s * g * v)), il(g, lin(u, s * v)), il(g, suma(czl(u, "x", 2), s * v)), il("x", lin(g * u, s * v))];
      return wyborRownego(r, E, ok, kand, krokiWylaczania(E, wsp, ok));
    }
    const E = suma(il(g * u, "x", "y"), [s, il(g * v, "x")]);
    const wsp = il(g, "x");
    const ok = il(wsp, suma(il(u, "y"), s * v));
    const kand = [il(wsp, suma(il(u, "y"), s * g * v)), il(g, suma(il(u, "x", "y"), s * v)), il("x", suma(il(g * u, "y"), s * v)), il(wsp, suma("y", s * v))];
    return wyborRownego(r, E, ok, kand, krokiWylaczania(E, wsp, ok), ["x", "y"]);
  });
}
function krokiWylaczania(E, wsp, ok) {
  const lista = skladniki(E);
  const dziel = lista.map(([, m]) => `$${zapis(m)} : ${zapis(wsp)} = ${zapis(dzielMon(m, wsp))}$`);
  return [
    `Szukamy wspólnego czynnika wszystkich wyrazów, czyli tego, co stoi w każdym z nich: tu $${zapis(wsp)}$. Dzielimy każdy wyraz przez niego: ${dziel.join(", ")}${lista.some(([z]) => z < 0) ? " (znak minus przy wyrazie zostaje)" : ""}.`,
    `Wspólny czynnik piszemy przed nawiasem, a w nawiasie zostają ilorazy: $${zapis(ok)}$. Sprawdzamy, mnożąc z powrotem: $${zapis(rozpisz(ok))}$ – to dokładnie wyrażenie z zadania.`,
  ];
}

function mnozenieNawiasowWybor(r) {
  return probuj(() => {
    if (r.chance(0.7)) {
      const p = nz(r, 7), qq = nz(r, 7);
      const E = il(suma("x", p), suma("x", qq));
      const ok = pol([1, p + qq, p * qq]);
      const kand = [pol([1, 0, p * qq]), pol([1, p + qq, -p * qq]), pol([1, p * qq, p + qq]), pol([2, p + qq])];
      return wyborRownego(r, E, ok, kand, krokiMnozenia(E, ok));
    }
    const a = r.int(2, 3), b = nz(r, 5), c = nz(r, 5);
    const E = il(lin(a, b), suma("x", c));
    const ok = pol([a, a * c + b, b * c]);
    const kand = [pol([a, 0, b * c]), pol([a, a * c + b, -b * c]), pol([a, b + c, b * c]), pol([a, a * c - b, b * c])];
    return wyborRownego(r, E, ok, kand, krokiMnozenia(E, ok));
  });
}
function krokiMnozenia(E, ok) {
  const l = laczenie(skladniki(E));
  return [
    `Mnożymy każdy wyraz z pierwszego nawiasu przez każdy wyraz z drugiego, więc będą cztery iloczyny: $${zapis(rozpisz(E))}$.`,
    `${l ? `Łączymy wyrazy podobne: ${l}. ` : ""}Wychodzi $${zapis(ok)}$.`,
  ];
}

function nawiasyWybor(r) {
  return probuj(() => {
    if (r.chance(0.5)) {
      const A = nz(r, 7), e = r.int(-6, 6), c = nz(r, 5), d = nz(r, 7);
      const t = [czl(A)];
      if (e) t.push(e);
      t.push([-1, lin(c, d)]);
      const E = suma(...t);
      if (A - c === 0 || e - d === 0) return null;
      const ok = lin(A - c, e - d);
      const kand = [lin(A - c, e + d), lin(A + c, e - d), lin(A + c, e + d), lin(A - c, d - e)];
      return wyborRownego(r, E, ok, kand, [
        `Minus przed nawiasem zmienia znaki wszystkich wyrazów w środku: $${zapis(rozpisz(E))}$.`,
        `Łączymy wyrazy podobne: ${laczenie(skladniki(E))}. Wychodzi $${zapis(ok)}$.`,
      ]);
    }
    const m = r.int(2, 6), a = nz(r, 5), b = nz(r, 7), s = r.chance(0.35) ? -1 : 1;
    const E = s < 0 ? suma([-1, il(m, lin(a, b))]) : il(m, lin(a, b));
    const ok = lin(s * m * a, s * m * b);
    const kand = [lin(s * m * a, b), lin(s * m * a, -s * m * b), lin(m + a, s * m * b), lin(s * m * a, s * (m + b))];
    return wyborRownego(r, E, ok, kand, [
      `${s < 0 ? "Minus przed nawiasem zmienia wszystkie znaki w środku. " : ""}Liczba przed nawiasem mnoży każdy wyraz w środku, nie tylko pierwszy: $${zapis(rozpisz(E))}$.`,
      `Wychodzi $${zapis(ok)}$.${s < 0 ? " Pilnujemy znaków: minus razy minus daje plus." : ""}`,
    ]);
  });
}

function wyborPostaci(r) {
  const w = r.int(0, 99);
  if (w < 30) return wylaczanieWybor(r);
  if (w < 55) return mnozenieNawiasowWybor(r);
  return nawiasyWybor(r);
}

// --- 4. Równania

/** Szablony równań liniowych z jedną niewiadomą x; każdy zwraca { L, P } (drzewa obu stron). Rozwiązanie liczymy później z drzew. */
const SZABLONY_ROWNAN = [
  // ax + b = cx + d
  (r) => ({ L: lin(nz(r, 9), r.int(-12, 12)), P: lin(r.chance(0.2) ? 0 : r.int(-9, 9), r.int(-12, 12)) }),
  (r) => ({ L: lin(nz(r, 9), r.int(-12, 12)), P: lin(r.int(-9, 9), r.int(-12, 12)) }),
  // m(x + p) + n = cx + d
  (r) => {
    const t = [[1, il(r.int(2, 6), suma("x", nz(r, 6)))]];
    const n = r.int(-6, 6);
    if (n) t.push(n);
    return { L: suma(...t), P: lin(r.int(-3, 6), r.int(-12, 20)) };
  },
  // n - m(x + p) = cx + d  (minus przed nawiasem)
  (r) => ({ L: suma(r.int(1, 15), [-1, il(r.int(1, 4), suma("x", nz(r, 6)))]), P: lin(r.int(-3, 3), r.int(-12, 12)) }),
  // m(x + p) - k(x + q) = d
  (r) => {
    const m = r.int(2, 6), k = r.int(1, 5);
    return { L: suma(il(m, suma("x", nz(r, 6))), [-1, il(k, suma("x", nz(r, 6)))]), P: lin(r.chance(0.5) ? 0 : r.int(-2, 3), r.int(-15, 25)) };
  },
  // x/a ± x/b = c (rozwiązanie wielokrotnością NWW)
  (r) => {
    const a = r.int(2, 6), b = r.intBez(2, 6, a), k = r.int(1, 6);
    const x = k * nww(a, b), s = r.pick([1, 1, -1]);
    return { L: suma(ul("x", a), [s, ul("x", b)]), P: num(x / a + s * (x / b)) };
  },
  // x/a ± n = m
  (r) => {
    const a = r.int(2, 9), t = r.int(1, 9), n = nz(r, 8);
    return { L: suma(ul("x", a), n), P: num(t + n) };
  },
  // (x + p)/a = n
  (r) => {
    const a = r.int(2, 6), n = r.int(1, 9);
    return { L: ul(suma("x", nz(r, 8)), a), P: num(n) };
  },
  // (x + p)/a = x/b + n
  (r) => {
    const a = r.int(2, 4), b = r.intBez(2, 6, a);
    return { L: ul(suma("x", nz(r, 6)), a), P: suma(ul("x", b), r.int(-3, 4)) };
  },
  // (x + p)/a = (x + q)/b
  (r) => {
    const a = r.int(2, 6), b = r.intBez(2, 6, a);
    return { L: ul(suma("x", nz(r, 8)), a), P: ul(suma("x", nz(r, 8)), b) };
  },
  // ax - x/b = n  oraz  x/a + (x + p)/b = n
  (r) => {
    const a = r.int(2, 4), b = r.intBez(2, 6, a);
    return { L: suma(ul("x", a), ul(suma("x", nz(r, 6)), b)), P: num(r.int(1, 12)) };
  },
];
const mniejSzablonow = SZABLONY_ROWNAN.slice(0, 5);   // bez ułamków

function rownanieLiniowe(r) {
  return probuj(() => {
    const { L, P } = r.pick(SZABLONY_ROWNAN)(r);
    if (zapis(L) === zapis(P)) return null;
    const x = rozwiazRownanie(L, P);
    if (!x) return null;
    const ulamek = r.chance(0.2);
    if (ulamek ? !(x.d >= 2 && x.d <= 6 && Math.abs(x.n) <= 40) : !(x.calkowita && Math.abs(x.n) <= 30)) return null;
    const kroki = krokiRownania(L, P);
    if (!kroki || kroki.length > 5) return null;
    const rown = `${zapis(L)} = ${zapis(P)}`;
    return zad(
      `${r.pick([`Rozwiąż równanie $${rown}$.`, `Oblicz $x$ z równania $${rown}$.`, `Dla jakiej liczby $x$ prawdziwa jest równość $${rown}$?`])}${x.calkowita ? "" : PODPOWIEDZ_ULAMEK}`,
      [pole("x", "$x =$")],
      { x },
      `$x = ${ulTex(x)}$`,
      kroki,
    );
  });
}

/** Czy liczba x spełnia równanie L = P. */
const spelnia = (L, P, x) => ocen(L, { x }).eq(ocen(P, { x }));

function liczbaRozwiazaniem(r) {
  return probuj(() => {
    const { L, P } = r.pick(mniejSzablonow)(r);
    const x = rozwiazRownanie(L, P);
    if (!x || !x.calkowita || x.zero || Math.abs(x.n) > 15) return null;
    const xn = x.n;
    const zle = r.shuffle([...new Set([-xn, xn + 1, xn - 1, xn + 2, xn - 2, 2 * xn, xn + 3, xn - 3])]
      .filter((n) => n !== xn && n !== 0 && !spelnia(L, P, q(n)))).slice(0, 3);
    if (zle.length < 3) return null;
    const m = mieszaj(r, `$${xn}$`, zle.map((n) => `$${n}$`));
    if (!m) return null;
    const rown = `${zapis(L)} = ${zapis(P)}`;
    const wiersze = m.opcje.map((tekst) => {
      const n = q(Number(tekst.replace(/\$/g, "")));
      const lw = ocen(L, { x: n }), pw = ocen(P, { x: n });
      return `Dla $x = ${n.n}$: lewa strona to $${dz(lw)}$, prawa to $${dz(pw)}$ – ${lw.eq(pw) ? "są równe, więc to jest rozwiązanie" : "różne, więc to nie jest rozwiązanie"}.`;
    });
    return zad(
      `Która z podanych liczb jest rozwiązaniem równania $${rown}$?`,
      [polew("liczba", "Rozwiązanie", m.opcje)],
      { liczba: m.ind },
      `$${xn}$`,
      ["Wstawiamy kolejne liczby w miejsce $x$ i liczymy osobno lewą i prawą stronę równania. Rozwiązaniem jest ta liczba, dla której obie strony wychodzą tak samo.", ...wiersze],
    );
  });
}

/** Wyrażenie a·x + b w losowym „przebraniu” (nawias, wspólny czynnik, odejmowanie nawiasu). */
function przebierz(r, a, b) {
  const wariant = [() => lin(a, b)];
  if (a >= 2) {
    wariant.push(() => {
      const p = nz(r, 5), n = b - a * p;
      return n === 0 ? il(a, suma("x", p)) : suma([1, il(a, suma("x", p))], n);
    });
  }
  const g = nwd(Math.abs(a), Math.abs(b));
  if (g >= 2) wariant.push(() => il(g, lin(a / g, b / g)));
  const n = nz(r, 6);
  if (n !== b) wariant.push(() => suma(n, [-1, lin(-a, n - b)]));
  return r.pick(wariant)();
}

const OPCJE_ROZWIAZAN = ["dokładnie jedno rozwiązanie", "brak rozwiązań", "nieskończenie wiele rozwiązań"];

function ileRozwiazan(r) {
  return probuj(() => {
    const rodzaj = r.pick(["jedno", "brak", "nieskonczenie"]);
    const a = nz(r, 6), b = r.int(-9, 9);
    let L, P;
    if (rodzaj === "jedno") {
      L = przebierz(r, a, b);
      P = przebierz(r, r.intBez(-6, 6, a), r.int(-9, 9));
    } else if (rodzaj === "brak") {
      L = przebierz(r, a, b);
      P = przebierz(r, a, r.intBez(-9, 9, b));
    } else {
      L = przebierz(r, a, b);
      P = przebierz(r, a, b);
    }
    if (zapis(L) === zapis(P)) return null;
    const { a: aL, b: bL } = liniowa(L), { a: aP, b: bP } = liniowa(P);
    if (!aL.eq(a) || !bL.eq(b)) throw new Error("Błąd przebrania wyrażenia");
    const rown = `${zapis(L)} = ${zapis(P)}`;
    const poprawna = rodzaj === "jedno" ? OPCJE_ROZWIAZAN[0] : rodzaj === "brak" ? OPCJE_ROZWIAZAN[1] : OPCJE_ROZWIAZAN[2];
    const m = mieszaj(r, poprawna, OPCJE_ROZWIAZAN.filter((o) => o !== poprawna));
    let kroki;
    if (rodzaj === "jedno") {
      kroki = krokiRownania(L, P);
      if (!kroki || kroki.length > 5) return null;
    } else {
      const Ls = uprosc(L), Ps = uprosc(P);
      const rozp = rozpisz(L), rozpP = rozpisz(P);
      const nawiasy = zapis(rozp) !== zapis(L) || zapis(rozpP) !== zapis(P);
      kroki = [];
      if (nawiasy || zapis(Ls) !== zapis(L) || zapis(Ps) !== zapis(P)) {
        kroki.push(`${nawiasy ? "Rozpisujemy nawiasy i łączymy" : "Łączymy"} wyrazy podobne po obu stronach: $${zapis(Ls)} = ${zapis(Ps)}$.`);
      }
      kroki.push(`Po obu stronach stoi tyle samo $x$ (czyli $${zapis(czlX(aL))}$), więc po przeniesieniu na jedną stronę niewiadoma znika. Zostaje: $${zapis(num(bL))} = ${zapis(num(bP))}$.`);
      kroki.push(rodzaj === "brak"
        ? `To zdanie jest fałszywe (liczby $${zapis(num(bL))}$ i $${zapis(num(bP))}$ są różne), więc żadna liczba nie spełnia równania: równanie nie ma rozwiązań.`
        : `To zdanie jest prawdziwe dla każdej liczby $x$, więc każda liczba jest rozwiązaniem: równanie ma nieskończenie wiele rozwiązań.`);
    }
    return zad(
      `Ile rozwiązań ma równanie $${rown}$?`,
      [polew("ile", "Liczba rozwiązań", m.opcje)],
      { ile: m.ind },
      poprawna,
      kroki,
    );
  });
}
const czlX = (a) => sumaZ([czl(a)]);

function czyRozwiazanie(r) {
  return r.chance(0.55) ? liczbaRozwiazaniem(r) : ileRozwiazan(r);
}

// --- 5. Zadania z treścią rozwiązywane równaniem
// Każde rozwiązanie ma pięć kroków z karty: oznaczenie, równanie, rozwiązanie, sprawdzenie z treścią, odpowiedź.

/**
 * Składa zadanie z równaniem. Opis: tresc, ozn (co oznacza x i pozostałe wielkości), ukladamy (zdanie przed równaniem),
 * L i P (strony równania), x (oczekiwane rozwiązanie), linie (opcjonalnie: własny przebieg rozwiązania), sprawdzenie, odpowiedz,
 * etykieta i wartosc (szukana wielkość, niekoniecznie x) oraz wynik (zapis w kluczu).
 */
function zadanieZRownaniem({ tresc, ozn, ukladamy, L, P, x, linie, sprawdzenie, odpowiedz, etykieta, wartosc, wynik }) {
  const rozw = rozwiazRownanie(L, P);
  if (!rozw || !rozw.eq(x)) throw new Error(`Równanie ${zapis(L)} = ${zapis(P)} nie daje x = ${x}`);
  const przebiegLinie = linie ?? przebieg(L, P);
  return zad(
    tresc,
    [pole("odp", etykieta)],
    { odp: wartosc },
    wynik,
    [
      `Oznaczenie: ${ozn}`,
      `Równanie: ${ukladamy} $${zapis(L)} = ${zapis(P)}$.`,
      `Rozwiązanie: ${przebiegLinie.map((l) => `$${l}$`).join(", więc ")}.`,
      `Sprawdzenie: ${sprawdzenie}`,
      `Odpowiedź: ${odpowiedz}`,
    ],
  );
}

const slowoLiczba = { 3: "trzech", 4: "czterech", 5: "pięciu" };

// --- Zadania o wieku i o liczbach

function wiekSuma(r) {
  return probuj(() => {
    const rodzic = r.pick([{ n: "mama", st: "starsza" }, { n: "tata", st: "starszy" }]);
    const dziecko = r.pick([{ n: "córka", dop: "córki", sw: "swojej córki" }, { n: "syn", dop: "syna", sw: "swojego syna" }]);
    const k = r.int(2, 5), x = r.int(6, 16), t = r.int(2, 10);
    if (k * x > 60 || k * x - x < 20) return null;
    const S = (k + 1) * x + 2 * t;
    const pytanieRodzic = r.chance(0.4);
    const kx = k * x;
    return zadanieZRownaniem({
      tresc: `${cap(rodzic.n)} jest $${k}$ razy ${rodzic.st} od ${dziecko.sw}. Za $${t}$ ${lata(t)} suma ich wieku wyniesie $${S}$ ${lata(S)}. Ile lat ma teraz ${pytanieRodzic ? rodzic.n : dziecko.n}?`,
      ozn: `$x$ – obecny wiek ${dziecko.dop} (w latach). Wtedy ${rodzic.n} ma teraz $${k}x$ lat.`,
      ukladamy: `Za $${t}$ ${lata(t)} ${dziecko.n} będzie mieć $x + ${t}$ lat, a ${rodzic.n} $${k}x + ${t}$ lat (każdej osobie dodajemy tyle samo lat). Suma ma wynosić $${S}$, więc`,
      L: suma(suma("x", t), suma(il(k, "x"), t)), P: num(S), x: q(x),
      sprawdzenie: `${cap(dziecko.n)} ma $${x}$ ${lata(x)}, a ${rodzic.n} $${kx}$ ${lata(kx)}. Za $${t}$ ${lata(t)} będą mieć $${x + t}$ i $${kx + t}$ ${lata(kx + t)}, a $${x + t} + ${kx + t} = ${S}$ – zgadza się.`,
      odpowiedz: pytanieRodzic ? `${cap(rodzic.n)} ma teraz $${kx}$ ${lata(kx)}.` : `${cap(dziecko.n)} ma teraz $${x}$ ${lata(x)}.`,
      etykieta: `Wiek ${pytanieRodzic ? (rodzic.n === "mama" ? "mamy" : "taty") : dziecko.dop} (w latach)`,
      wartosc: q(pytanieRodzic ? kx : x),
      wynik: `$${pytanieRodzic ? kx : x}$ ${lata(pytanieRodzic ? kx : x)}`,
    });
  });
}

function wiekRoznica(r) {
  const [o] = osoby(r, 1);
  const d = r.int(2, 8), x = r.int(5, 18);
  const S = 2 * x + d;
  const mlodsze = r.pick([{ n: "brat", dop: "brata", sw: "swojego brata" }, { n: "siostra", dop: "siostry", sw: "swojej siostry" }]);
  const pytanieStarsze = r.chance(0.4);
  const A = x + d;
  return zadanieZRownaniem({
    tresc: `${o.im} jest o $${d}$ ${lata(d)} ${f(o, "starszy", "starsza")} od ${mlodsze.sw}. Razem mają $${S}$ ${lata(S)}. Ile lat ma ${pytanieStarsze ? o.im : mlodsze.n}?`,
    ozn: `$x$ – wiek ${mlodsze.dop} (w latach). Wtedy ${o.im} ma $x + ${d}$ lat (jest starsz${f(o, "y", "a")} o $${d}$ ${lata(d)}).`,
    ukladamy: `Razem mają $${S}$ ${lata(S)}, więc`,
    L: suma("x", suma("x", d)), P: num(S), x: q(x),
    sprawdzenie: `${cap(mlodsze.n)} ma $${x}$ ${lata(x)}, a ${o.im} $${A}$ ${lata(A)}. Różnica to $${A} - ${x} = ${d}$, a razem mają $${x} + ${A} = ${S}$ – zgadza się.`,
    odpowiedz: pytanieStarsze ? `${o.im} ma $${A}$ ${lata(A)}.` : `${cap(mlodsze.n)} ma $${x}$ ${lata(x)}.`,
    etykieta: `Wiek ${pytanieStarsze ? "starszej osoby" : "młodszej osoby"} (w latach)`,
    wartosc: q(pytanieStarsze ? A : x),
    wynik: `$${pytanieStarsze ? A : x}$ ${lata(pytanieStarsze ? A : x)}`,
  });
}

function wiekZaIle(r) {
  return probuj(() => {
    const k = r.int(2, 4), B = r.int(5, 14), y = r.int(2, 12);
    const A = k * (B + y) - y;
    if (A > 60 || A - B < 15) return null;
    return zadanieZRownaniem({
      tresc: `Tata ma $${A}$ ${lata(A)}, a syn $${B}$ ${lata(B)}. Za ile lat tata będzie $${k}$ razy starszy od syna?`,
      ozn: `$x$ – liczba lat, które upłyną. Za $x$ lat tata będzie mieć $${A} + x$ lat, a syn $${B} + x$ lat.`,
      ukladamy: `Tata ma być $${k}$ razy starszy od syna, więc`,
      L: suma(A, "x"), P: il(k, suma(B, "x")), x: q(y),
      sprawdzenie: `Za $${y}$ ${lata(y)} tata będzie mieć $${A + y}$ ${lata(A + y)}, a syn $${B + y}$ ${lata(B + y)}. Rzeczywiście $${k} \\cdot ${B + y} = ${A + y}$ – zgadza się.`,
      odpowiedz: `Za $${y}$ ${lata(y)} tata będzie $${k}$ razy starszy od syna.`,
      etykieta: "Liczba lat",
      wartosc: q(y),
      wynik: `za $${y}$ ${lata(y)}`,
    });
  });
}

function zadanieOLiczbie(r) {
  const typ = r.pick(["dzialania", "dzialania", "nawias", "ulamek", "wielokrotnosc"]);
  const x = r.int(2, 20);
  if (typ === "dzialania") {
    const k = r.int(2, 9), n = r.int(1, 15), minus = r.chance(0.6);
    const m = k * x + (minus ? -n : n);
    return zadanieZRownaniem({
      tresc: `Pewną liczbę pomnożono przez $${k}$, ${minus ? "od wyniku odjęto" : "do wyniku dodano"} $${n}$ i otrzymano $${m}$. Jaka to liczba?`,
      ozn: "$x$ – szukana liczba.",
      ukladamy: `Po pomnożeniu przez $${k}$ mamy $${k}x$, a po ${minus ? "odjęciu" : "dodaniu"} $${n}$ jest $${k}x ${minus ? "-" : "+"} ${n}$. Wynik to $${m}$, więc`,
      L: lin(k, minus ? -n : n), P: num(m), x: q(x),
      sprawdzenie: `$${k} \\cdot ${x} ${minus ? "-" : "+"} ${n} = ${k * x} ${minus ? "-" : "+"} ${n} = ${m}$ – zgadza się.`,
      odpowiedz: `Szukana liczba to $${x}$.`,
      etykieta: "Szukana liczba", wartosc: q(x), wynik: `$${x}$`,
    });
  }
  if (typ === "nawias") {
    const k = r.int(2, 6), n = r.int(1, 12);
    const m = k * (x + n);
    return zadanieZRownaniem({
      tresc: `Do pewnej liczby dodano $${n}$, a otrzymaną sumę pomnożono przez $${k}$. W wyniku otrzymano $${m}$. Jaka to liczba?`,
      ozn: "$x$ – szukana liczba.",
      ukladamy: `Po dodaniu $${n}$ mamy $x + ${n}$. Tę sumę mnożymy przez $${k}$, więc musi być w nawiasie. Wynik to $${m}$, czyli`,
      L: il(k, suma("x", n)), P: num(m), x: q(x),
      sprawdzenie: `$${k} \\cdot (${x} + ${n}) = ${k} \\cdot ${x + n} = ${m}$ – zgadza się.`,
      odpowiedz: `Szukana liczba to $${x}$.`,
      etykieta: "Szukana liczba", wartosc: q(x), wynik: `$${x}$`,
    });
  }
  if (typ === "ulamek") {
    const k = r.int(2, 4), t = r.int(2, 12), minus = r.chance(0.4), n = r.int(1, minus ? t - 1 : 12);
    const xx = k * t, m = t + (minus ? -n : n);
    const czesc = ["", "", "Połowa", "Trzecia część", "Czwarta część"][k];
    return zadanieZRownaniem({
      tresc: `${czesc} pewnej liczby ${minus ? "zmniejszona" : "zwiększona"} o $${n}$ jest równa $${m}$. Jaka to liczba?`,
      ozn: "$x$ – szukana liczba.",
      ukladamy: `${czesc} liczby $x$ to $\\frac{x}{${k}}$. Po ${minus ? "zmniejszeniu" : "zwiększeniu"} o $${n}$ wynik to $${m}$, więc`,
      L: suma(ul("x", k), minus ? -n : n), P: num(m), x: q(xx),
      linie: [`\\frac{x}{${k}} ${minus ? "-" : "+"} ${n} = ${m}`, `\\frac{x}{${k}} = ${m + (minus ? n : -n)}`, `x = ${m + (minus ? n : -n)} \\cdot ${k} = ${xx}`],
      sprawdzenie: `$\\frac{${xx}}{${k}} ${minus ? "-" : "+"} ${n} = ${t} ${minus ? "-" : "+"} ${n} = ${m}$ – zgadza się.`,
      odpowiedz: `Szukana liczba to $${xx}$.`,
      etykieta: "Szukana liczba", wartosc: q(xx), wynik: `$${xx}$`,
    });
  }
  const k = r.int(2, 6);
  const roznica = r.chance(0.5);
  const d = (k - 1) * x, S = (k + 1) * x;
  const pytanieMniejsza = r.chance(0.5);
  return zadanieZRownaniem({
    tresc: roznica
      ? `Pewna liczba jest $${k}$ razy większa od drugiej, a ich różnica wynosi $${d}$. Jaka jest ${pytanieMniejsza ? "mniejsza" : "większa"} z tych liczb?`
      : `Suma dwóch liczb wynosi $${S}$, a jedna z nich jest $${k}$ razy większa od drugiej. Jaka jest ${pytanieMniejsza ? "mniejsza" : "większa"} z tych liczb?`,
    ozn: `$x$ – mniejsza z liczb. Wtedy większa to $${k}x$.`,
    ukladamy: roznica ? `Różnica liczb to $${k}x - x$ i wynosi $${d}$, więc` : `Suma liczb to $x + ${k}x$ i wynosi $${S}$, więc`,
    L: roznica ? suma(il(k, "x"), [-1, "x"]) : suma("x", il(k, "x")), P: num(roznica ? d : S), x: q(x),
    sprawdzenie: `Liczby to $${x}$ i $${k * x}$. ${roznica ? `Różnica: $${k * x} - ${x} = ${d}$` : `Suma: $${x} + ${k * x} = ${S}$`}, a $${k * x} = ${k} \\cdot ${x}$ – zgadza się.`,
    odpowiedz: `${pytanieMniejsza ? "Mniejsza" : "Większa"} z tych liczb to $${pytanieMniejsza ? x : k * x}$.`,
    etykieta: pytanieMniejsza ? "Mniejsza liczba" : "Większa liczba", wartosc: q(pytanieMniejsza ? x : k * x), wynik: `$${pytanieMniejsza ? x : k * x}$`,
  });
}

function kolejneLiczby(r) {
  const rodzaj = r.pick(["naturalnych", "naturalnych", "parzystych", "nieparzystych"]);
  const c = r.int(3, 4);
  const d = rodzaj === "naturalnych" ? 1 : 2;
  let a = r.int(5, 40);
  if (rodzaj === "parzystych" && a % 2) a++;
  if (rodzaj === "nieparzystych" && a % 2 === 0) a++;
  const liczby = Array.from({ length: c }, (_, i) => a + d * i);
  const S = liczby.reduce((s, v) => s + v, 0);
  const wyrazy = Array.from({ length: c }, (_, i) => (i === 0 ? "x" : `x + ${d * i}`));
  const rodzajPyt = r.pick(["najmniejsza", "największa", "największa"]);
  const odp = rodzajPyt === "najmniejsza" ? a : a + d * (c - 1);
  return zadanieZRownaniem({
    tresc: `Suma ${slowoLiczba[c]} kolejnych liczb ${rodzaj} jest równa $${S}$. Jaka jest ${rodzajPyt} z tych liczb?`,
    ozn: `$x$ – najmniejsza z tych liczb. Kolejne liczby ${{ naturalnych: "naturalne", parzystych: "parzyste", nieparzystych: "nieparzyste" }[rodzaj]} ${d === 1 ? "różnią się o $1$" : "różnią się o $2$"}, więc to ${listaTex(wyrazy)}.`,
    ukladamy: `Ich suma ma wynosić $${S}$, więc`,
    L: suma("x", ...Array.from({ length: c - 1 }, (_, i) => suma("x", d * (i + 1)))), P: num(S), x: q(a),
    sprawdzenie: `Liczby to ${listaTex(liczby)}, a ich suma to $${liczby.join(" + ")} = ${S}$ – zgadza się.`,
    odpowiedz: rodzajPyt === "najmniejsza"
      ? `Najmniejsza z tych liczb to $${a}$.`
      : `Największa z tych liczb to $${odp}$ (liczba $x = ${a}$ jest najmniejsza, a pytano o największą).`,
    etykieta: `${cap(rodzajPyt)} liczba`, wartosc: q(odp), wynik: `$${odp}$`,
  });
}

function wiekILiczby(r) {
  const w = r.int(0, 99);
  if (w < 20) return wiekSuma(r);
  if (w < 35) return wiekRoznica(r);
  if (w < 50) return wiekZaIle(r);
  if (w < 75) return zadanieOLiczbie(r);
  return kolejneLiczby(r);
}

// --- Zadania o pieniądzach, cenach i figurach

function biletyZRownaniem(r) {
  const miejsce = r.pick(["do kina", "do muzeum", "na basen", "do teatru", "do zoo"]);
  const x = r.int(12, 40), d = r.int(2, 9), m = r.int(2, 5), n = r.int(2, 5);
  const S = m * x + n * (x - d);
  const pytanieUlgowy = r.chance(0.4);
  const normalne = lm(m, ["bilet normalny", "bilety normalne", "biletów normalnych"]), ulgowe = lm(n, ["bilet ulgowy", "bilety ulgowe", "biletów ulgowych"]);
  return zadanieZRownaniem({
    tresc: `Bilet ulgowy ${miejsce} jest o $${d}$ zł tańszy od normalnego. Za $${m}$ ${normalne} i $${n}$ ${ulgowe} zapłacono razem $${S}$ zł. Ile kosztuje bilet ${pytanieUlgowy ? "ulgowy" : "normalny"}?`,
    ozn: `$x$ – cena biletu normalnego (w zł). Bilet ulgowy kosztuje wtedy $x - ${d}$ zł.`,
    ukladamy: `Za $${m}$ ${normalne} płacimy $${m}x$ zł, a za $${n}$ ${ulgowe} płacimy $${n}(x - ${d})$ zł (cenę biletu mnożymy przez liczbę biletów). Razem $${S}$ zł, więc`,
    L: suma(il(m, "x"), il(n, suma("x", -d))), P: num(S), x: q(x),
    sprawdzenie: `Bilet normalny kosztuje $${x}$ zł, a ulgowy $${x - d}$ zł. Za wszystkie bilety: $${m} \\cdot ${x} + ${n} \\cdot ${x - d} = ${S}$ – zgadza się.`,
    odpowiedz: `Bilet ${pytanieUlgowy ? "ulgowy" : "normalny"} kosztuje $${pytanieUlgowy ? x - d : x}$ zł.`,
    etykieta: `Cena biletu ${pytanieUlgowy ? "ulgowego" : "normalnego"} (w zł)`, wartosc: q(pytanieUlgowy ? x - d : x), wynik: `$${pytanieUlgowy ? x - d : x}$ zł`,
  });
}

function podzialPieniedzy(r) {
  const [A, B, C] = osoby(r, 3);
  const [dawca, czas] = r.pick([["Babcia", "rozdała"], ["Dziadek", "rozdał"]]);
  const x = r.int(8, 40), d = r.int(2, 12), k = r.int(2, 4);
  const S = x + (x + d) + k * x;
  const kogo = r.pick(["A", "B", "C"]);
  const osoba = { A, B, C }[kogo], wart = { A: x, B: x + d, C: k * x }[kogo];
  return zadanieZRownaniem({
    tresc: `${dawca} ${czas} $${S}$ zł między troje wnuków. ${A.im} ${f(A, "dostał", "dostała")} pewną kwotę, ${B.im} o $${d}$ zł więcej niż ${A.im}, a ${C.im} $${k}$ razy więcej niż ${A.im}. Ile złotych ${f(osoba, "dostał", "dostała")} ${osoba.im}?`,
    ozn: `$x$ – kwota, którą dostał${f(A, "", "a")} ${A.im} (w zł). Wtedy ${B.im} dostał${f(B, "", "a")} $x + ${d}$ zł, a ${C.im} dostał${f(C, "", "a")} $${k}x$ zł.`,
    ukladamy: `Wszystkie kwoty razem dają $${S}$ zł, więc`,
    L: suma("x", suma("x", d), il(k, "x")), P: num(S), x: q(x),
    sprawdzenie: `${A.im} dostał${f(A, "", "a")} $${x}$ zł, ${B.im} $${x + d}$ zł, a ${C.im} $${k * x}$ zł. Razem $${x} + ${x + d} + ${k * x} = ${S}$ – zgadza się.`,
    odpowiedz: `${osoba.im} dostał${f(osoba, "", "a")} $${wart}$ zł.`,
    etykieta: "Kwota (w zł)", wartosc: q(wart), wynik: `$${wart}$ zł`,
  });
}

function obwodProstokata(r) {
  return probuj(() => {
    const razy = r.chance(0.3);
    const x = r.int(3, 20), d = r.int(1, 9), k = r.int(2, 4);
    const dlugi = razy ? k * x : x + d;
    const O = 2 * (x + dlugi);
    if (O > 130) return null;
    const co = r.pick(["krotszy", "dluzszy", "pole"]);
    const wart = co === "krotszy" ? x : co === "dluzszy" ? dlugi : x * dlugi;
    const dlugiTex = razy ? `${k}x` : `x + ${d}`;
    return zadanieZRownaniem({
      tresc: `Obwód prostokąta wynosi $${O}$ cm, a jeden jego bok jest ${razy ? `$${k}$ razy dłuższy od drugiego` : `o $${d}$ cm dłuższy od drugiego`}. ${co === "krotszy" ? "Oblicz długość krótszego boku." : co === "dluzszy" ? "Oblicz długość dłuższego boku." : "Oblicz pole tego prostokąta."}`,
      ozn: `$x$ – długość krótszego boku (w cm). Dłuższy bok ma wtedy $${dlugiTex}$ cm.`,
      ukladamy: `Prostokąt ma po dwa boki każdej długości: dwa boki po $x$ i dwa boki po $${dlugiTex}$. Obwód ma wynosić $${O}$ cm, czyli`,
      L: suma(il(2, "x"), il(2, razy ? il(k, "x") : suma("x", d))), P: num(O), x: q(x),
      sprawdzenie: `Boki mają $${x}$ cm i $${dlugi}$ cm. Obwód: $2 \\cdot ${x} + 2 \\cdot ${dlugi} = ${2 * x} + ${2 * dlugi} = ${O}$ – zgadza się.`,
      odpowiedz: co === "krotszy" ? `Krótszy bok ma $${x}$ cm.` : co === "dluzszy" ? `Dłuższy bok ma $${dlugi}$ cm.` : `Boki mają $${x}$ cm i $${dlugi}$ cm, więc pole to $${x} \\cdot ${dlugi} = ${wart}\\ \\text{cm}^2$.`,
      etykieta: co === "krotszy" ? "Długość krótszego boku (w cm)" : co === "dluzszy" ? "Długość dłuższego boku (w cm)" : "Pole (w $\\text{cm}^2$)",
      wartosc: q(wart), wynik: co === "pole" ? `$${wart}\\ \\text{cm}^2$` : `$${wart}$ cm`,
    });
  });
}

function obwodTrojkata(r) {
  return probuj(() => {
    const dluzsze = r.chance(0.6);
    const x = r.int(4, 20), d = r.int(1, 8);
    const ramie = dluzsze ? x + d : x - d;
    if (2 * ramie <= x) return null;
    const O = x + 2 * ramie;
    const pytaniePodstawa = r.chance(0.5);
    return zadanieZRownaniem({
      tresc: `Obwód trójkąta równoramiennego wynosi $${O}$ cm. Każde ramię jest o $${d}$ cm ${dluzsze ? "dłuższe" : "krótsze"} od podstawy. Oblicz długość ${pytaniePodstawa ? "podstawy" : "ramienia"}.`,
      ozn: `$x$ – długość podstawy (w cm). Każde ramię ma wtedy $x ${dluzsze ? "+" : "-"} ${d}$ cm.`,
      ukladamy: `Obwód to podstawa $x$ i dwa ramiona po $x ${dluzsze ? "+" : "-"} ${d}$. Obwód wynosi $${O}$ cm, więc`,
      L: suma("x", il(2, suma("x", dluzsze ? d : -d))), P: num(O), x: q(x),
      sprawdzenie: `Podstawa ma $${x}$ cm, ramię $${ramie}$ cm. Obwód: $${x} + 2 \\cdot ${ramie} = ${x} + ${2 * ramie} = ${O}$ – zgadza się.`,
      odpowiedz: pytaniePodstawa ? `Podstawa ma $${x}$ cm.` : `Ramię ma $${ramie}$ cm.`,
      etykieta: pytaniePodstawa ? "Długość podstawy (w cm)" : "Długość ramienia (w cm)",
      wartosc: q(pytaniePodstawa ? x : ramie), wynik: `$${pytaniePodstawa ? x : ramie}$ cm`,
    });
  });
}

function polowaPieniedzy(r) {
  const [o] = osoby(r, 1);
  const k = r.int(2, 15), m = r.int(5, 30);
  const x = 2 * (m + k);
  return zadanieZRownaniem({
    tresc: `${o.im} ${f(o, "wydał", "wydała")} połowę swoich pieniędzy i jeszcze $${k}$ zł. ${f(o, "Zostało mu", "Zostało jej")} $${m}$ zł. Ile złotych ${f(o, "miał", "miała")} ${o.im} na początku?`,
    ozn: `$x$ – kwota na początku (w zł). Wydano połowę, czyli $\\frac{x}{2}$, i jeszcze $${k}$ zł, czyli razem $\\frac{x}{2} + ${k}$ zł.`,
    ukladamy: `To, co zostało, to wszystkie pieniądze minus wydana kwota (bierzemy ją w nawias). Ma zostać $${m}$ zł, więc`,
    L: suma("x", [-1, suma(ul("x", 2), k)]), P: num(m), x: q(x),
    linie: [`\\frac{x}{2} - ${k} = ${m}`, `\\frac{x}{2} = ${m + k}`, `x = ${m + k} \\cdot 2 = ${x}`],
    sprawdzenie: `Połowa z $${x}$ to $${x / 2}$, razem z $${k}$ zł wydano $${x / 2 + k}$ zł, a zostało $${x} - ${x / 2 + k} = ${m}$ zł – zgadza się.`,
    odpowiedz: `${o.im} ${f(o, "miał", "miała")} na początku $${x}$ zł.`,
    etykieta: "Kwota na początku (w zł)", wartosc: q(x), wynik: `$${x}$ zł`,
  });
}

function poTyleSamo(r) {
  const [D, R] = r.pick([
    [{ n: "siostra", v: "dała", dat: "siostrze" }, { n: "brat", v: "dał", dat: "bratu" }],
    [{ n: "brat", v: "dał", dat: "bratu" }, { n: "siostra", v: "dała", dat: "siostrze" }],
  ]);
  const B = r.int(8, 40), d = r.int(2, 10);
  const A = B + 2 * d, S = A + B;
  const pytanieDawca = r.chance(0.6);
  return zadanieZRownaniem({
    tresc: `${cap(D.n)} i ${R.n} mają razem $${S}$ zł. Gdyby ${D.n} ${D.v} ${R.dat} $${d}$ zł, to oboje mieliby po tyle samo. Ile złotych ma ${pytanieDawca ? D.n : R.n}?`,
    ozn: `$x$ – kwota, którą ma ${D.n} (w zł). Wtedy ${R.n} ma $${S} - x$ zł.`,
    ukladamy: `Po przekazaniu $${d}$ zł ${D.n} będzie mieć $x - ${d}$ zł, a ${R.n} $(${S} - x) + ${d}$ zł. Mają mieć tyle samo, więc`,
    L: suma("x", -d), P: suma(S, [-1, "x"], d), x: q(A),
    sprawdzenie: `${cap(D.n)} ma $${A}$ zł, a ${R.n} $${B}$ zł (razem $${S}$ zł). Po przekazaniu $${d}$ zł będą mieć $${A} - ${d} = ${A - d}$ zł i $${B} + ${d} = ${B + d}$ zł – po tyle samo.`,
    odpowiedz: `${cap(pytanieDawca ? D.n : R.n)} ma $${pytanieDawca ? A : B}$ zł.`,
    etykieta: "Kwota (w zł)", wartosc: q(pytanieDawca ? A : B), wynik: `$${pytanieDawca ? A : B}$ zł`,
  });
}

function pieniadzeIFigury(r) {
  const w = r.int(0, 99);
  if (w < 20) return biletyZRownaniem(r);
  if (w < 38) return podzialPieniedzy(r);
  if (w < 60) return obwodProstokata(r);
  if (w < 75) return obwodTrojkata(r);
  if (w < 88) return polowaPieniedzy(r);
  return poTyleSamo(r);
}

// --- 6. Przekształcanie wzorów
// Każdy wzór ma: zestawy liter (role -> litery), prawą stronę (drzewo), lewą rolę, wartości do liczenia (losuj) oraz dla każdej szukanej litery:
// ok – poprawne wyznaczenie, zle – typowe błędy z uzasadnieniem, jak – kolejne równania prowadzące do wyniku.

const D =(a, b) => ul(a, b);

const WZORY_LITERY = [
  {
    id: "obwod-trzy-boki",
    zestawy: [{ L: "L", a: "a", b: "b", c: "c" }, { L: "O", a: "x", b: "y", c: "z" }, { L: "P", a: "p", b: "q", c: "r" }],
    lewa: "L",
    rhs: (s) => suma(il(2, s.a), il(2, s.b), s.c),
    losuj: (r) => ({ a: r.int(2, 12), b: r.int(2, 12), c: r.int(1, 12) }),
    cele: {
      a: {
        ok: (s) => D(suma(s.L, [-1, il(2, s.b)], [-1, s.c]), 2),
        zle: (s) => [
          [suma(s.L, [-1, il(2, s.b)], [-1, D(s.c, 2)]), `przez $2$ dzielimy cały licznik, a tu tylko ostatni wyraz`],
          [D(suma(s.L, [-1, il(2, s.b)], s.c), 2), `przenosząc $${s.c}$ na drugą stronę zmieniamy jego znak, a tu został plus`],
          [suma(D(s.L, 2), [-1, il(2, s.b)], [-1, s.c]), `przez $2$ dzielimy całą prawą stronę, a tu tylko $${s.L}$`],
          [suma(s.L, [-1, il(2, s.b)], [-1, s.c]), `po odjęciu zostaje $2${s.a}$, więc trzeba jeszcze podzielić przez $2$`],
        ],
        jak: (s) => [`${s.L} = 2${s.a} + 2${s.b} + ${s.c}`, `${s.L} - 2${s.b} - ${s.c} = 2${s.a}`, `${s.a} = ${fr(`${s.L} - 2${s.b} - ${s.c}`, 2)}`],
      },
      c: {
        ok: (s) => suma(s.L, [-1, il(2, s.a)], [-1, il(2, s.b)]),
        zle: (s) => [
          [suma(s.L, il(2, s.a), il(2, s.b)), `przenoszone wyrazy zmieniają znak, a tu zostały plusy`],
          [suma(s.L, [-1, s.a], [-1, s.b]), `odjąć trzeba $2${s.a}$ i $2${s.b}$, a nie same $${s.a}$ i $${s.b}$`],
          [suma(s.L, [-1, il(2, s.a)], il(2, s.b)), `znak zmieniono tylko przy jednym wyrazie`],
        ],
        jak: (s) => [`${s.L} = 2${s.a} + 2${s.b} + ${s.c}`, `${s.c} = ${s.L} - 2${s.a} - 2${s.b}`],
      },
    },
  },
  {
    id: "pole-trojkata",
    zestawy: [{ P: "P", a: "a", h: "h" }, { P: "S", a: "b", h: "h" }, { P: "P", a: "x", h: "y" }],
    lewa: "P",
    intro: (w) => `Pole trójkąta opisuje wzór $${w}$.`,
    rhs: (s) => D(il(s.a, s.h), 2),
    losuj: (r) => { const a = r.int(2, 16); let h = r.int(2, 12); if ((a * h) % 2) h++; return { a, h }; },
    cele: {
      h: {
        ok: (s) => D(il(2, s.P), s.a),
        zle: (s) => [
          [D(s.P, il(2, s.a)), `dzielenie przez $2$ cofamy mnożeniem przez $2$, a nie kolejnym dzieleniem`],
          [D(il(2, s.a), s.P), `ułamek jest odwrócony`],
          [suma(il(2, s.P), [-1, s.a]), `$${s.a}$ jest czynnikiem iloczynu, więc cofamy dzieleniem, a nie odejmowaniem`],
          [D(s.P, s.a), `po wymnożeniu przez $2$ licznik powinien mieć $2${s.P}$`],
        ],
        jak: (s) => [`${s.P} = ${fr(`${s.a}${s.h}`, 2)}`, `2${s.P} = ${s.a}${s.h}`, `${s.h} = ${fr(`2${s.P}`, s.a)}`],
      },
      a: {
        ok: (s) => D(il(2, s.P), s.h),
        zle: (s) => [
          [D(s.P, il(2, s.h)), `dzielenie przez $2$ cofamy mnożeniem przez $2$, a nie kolejnym dzieleniem`],
          [D(il(2, s.h), s.P), `ułamek jest odwrócony`],
          [suma(il(2, s.P), [-1, s.h]), `$${s.h}$ jest czynnikiem iloczynu, więc cofamy dzieleniem, a nie odejmowaniem`],
          [D(s.P, s.h), `po wymnożeniu przez $2$ licznik powinien mieć $2${s.P}$`],
        ],
        jak: (s) => [`${s.P} = ${fr(`${s.a}${s.h}`, 2)}`, `2${s.P} = ${s.a}${s.h}`, `${s.a} = ${fr(`2${s.P}`, s.h)}`],
      },
    },
  },
  {
    id: "pole-trapezu",
    zestawy: [{ P: "P", a: "a", b: "b", h: "h" }, { P: "S", a: "x", b: "y", h: "h" }],
    lewa: "P",
    intro: (w) => `Pole trapezu opisuje wzór $${w}$.`,
    rhs: (s) => D(il(suma(s.a, s.b), s.h), 2),
    losuj: (r) => ({ a: r.int(2, 12), b: r.int(2, 12), h: r.pick([2, 4, 6, 8, 10]) }),
    cele: {
      b: {
        ok: (s) => suma(D(il(2, s.P), s.h), [-1, s.a]),
        zle: (s) => [
          [suma(D(il(2, s.P), s.h), s.a), `przenosząc $${s.a}$ na drugą stronę zmieniamy znak, a tu został plus`],
          [suma(D(s.P, il(2, s.h)), [-1, s.a]), `dzielenie przez $2$ cofamy mnożeniem przez $2$, więc w liczniku powinno być $2${s.P}$`],
          [D(suma(il(2, s.P), [-1, s.a]), s.h), `przez $${s.h}$ dzielimy całą sumę $${s.a} + ${s.b}$, więc $${s.a}$ odejmujemy dopiero po dzieleniu`],
          [suma(D(il(2, s.P), s.h), [-1, il(2, s.a)]), `odjąć trzeba $${s.a}$, a nie $2${s.a}$`],
        ],
        jak: (s) => [`${s.P} = ${fr(`(${s.a} + ${s.b})${s.h}`, 2)}`, `2${s.P} = (${s.a} + ${s.b})${s.h}`, `${fr(`2${s.P}`, s.h)} = ${s.a} + ${s.b}`, `${s.b} = ${fr(`2${s.P}`, s.h)} - ${s.a}`],
      },
      h: {
        ok: (s) => D(il(2, s.P), suma(s.a, s.b)),
        zle: (s) => [
          [D(s.P, il(2, suma(s.a, s.b))), `dzielenie przez $2$ cofamy mnożeniem przez $2$, a nie kolejnym dzieleniem`],
          [D(il(2, s.P), s.a), `dzielić trzeba przez całą sumę $${s.a} + ${s.b}$, a nie przez samo $${s.a}$`],
          [D(suma(s.a, s.b), il(2, s.P)), `ułamek jest odwrócony`],
          [suma(il(2, s.P), [-1, s.a], [-1, s.b]), `$${s.h}$ jest czynnikiem iloczynu, więc cofamy dzieleniem, a nie odejmowaniem`],
        ],
        jak: (s) => [`${s.P} = ${fr(`(${s.a} + ${s.b})${s.h}`, 2)}`, `2${s.P} = (${s.a} + ${s.b})${s.h}`, `${s.h} = ${fr(`2${s.P}`, `${s.a} + ${s.b}`)}`],
      },
    },
  },
  {
    id: "predkosc",
    zestawy: [{ v: "v", s: "s", t: "t" }, { v: "u", s: "d", t: "t" }],
    lewa: "v",
    intro: (w) => `Prędkość w ruchu jednostajnym opisuje wzór $${w}$.`,
    rhs: (s) => D(s.s, s.t),
    losuj: (r) => { const t = r.pick([2, 3, 4, 5, q(5, 2), q(3, 2)]), v = r.pick([20, 30, 40, 50, 60, 80, 90]); return { t, s: q(v).mul(t) }; },
    cele: {
      t: {
        ok: (s) => D(s.s, s.v),
        zle: (s) => [
          [il(s.v, s.s), `$${s.t}$ stoi w mianowniku, więc najpierw mnożymy obie strony przez $${s.t}$, a potem dzielimy przez $${s.v}$`],
          [D(s.v, s.s), `ułamek jest odwrócony`],
          [suma(s.s, [-1, s.v]), `odejmowanie nic tu nie cofa: $${s.t}$ jest dzielnikiem, a nie składnikiem`],
        ],
        jak: (s) => [`${s.v} = ${fr(s.s, s.t)}`, `${s.v} \\cdot ${s.t} = ${s.s}`, `${s.t} = ${fr(s.s, s.v)}`],
      },
      s: {
        ok: (s) => il(s.v, s.t),
        zle: (s) => [
          [D(s.v, s.t), `dzielenie przez $${s.t}$ cofamy mnożeniem przez $${s.t}$`],
          [suma(s.v, s.t), `dzielenie cofamy mnożeniem, a nie dodawaniem`],
          [D(s.t, s.v), `to w ogóle nie jest $${s.s}$`],
        ],
        jak: (s) => [`${s.v} = ${fr(s.s, s.t)}`, `${s.s} = ${s.v} \\cdot ${s.t}`],
      },
    },
  },
  {
    id: "droga",
    zestawy: [{ s: "s", v: "v", t: "t" }, { s: "d", v: "u", t: "t" }],
    lewa: "s",
    intro: (w) => `Drogę przebytą ze stałą prędkością opisuje wzór $${w}$.`,
    rhs: (s) => il(s.v, s.t),
    losuj: (r) => ({ v: r.pick([20, 30, 40, 50, 60, 80, 90]), t: r.pick([2, 3, 4, 5, q(5, 2), q(3, 2)]) }),
    cele: {
      v: {
        ok: (s) => D(s.s, s.t),
        zle: (s) => [
          [suma(s.s, [-1, s.t]), `$${s.t}$ jest czynnikiem iloczynu, więc cofamy dzieleniem, a nie odejmowaniem`],
          [il(s.s, s.t), `mnożenie cofamy dzieleniem, a nie kolejnym mnożeniem`],
          [D(s.t, s.s), `ułamek jest odwrócony`],
        ],
        jak: (s) => [`${s.s} = ${s.v} \\cdot ${s.t}`, `${s.v} = ${fr(s.s, s.t)}`],
      },
      t: {
        ok: (s) => D(s.s, s.v),
        zle: (s) => [
          [suma(s.s, [-1, s.v]), `$${s.v}$ jest czynnikiem iloczynu, więc cofamy dzieleniem, a nie odejmowaniem`],
          [il(s.s, s.v), `mnożenie cofamy dzieleniem, a nie kolejnym mnożeniem`],
          [D(s.v, s.s), `ułamek jest odwrócony`],
        ],
        jak: (s) => [`${s.s} = ${s.v} \\cdot ${s.t}`, `${s.t} = ${fr(s.s, s.v)}`],
      },
    },
  },
  {
    id: "obwod-prostokata",
    zestawy: [{ O: "O", a: "a", b: "b" }, { O: "L", a: "x", b: "y" }],
    lewa: "O",
    intro: (w) => `Obwód prostokąta opisuje wzór $${w}$.`,
    rhs: (s) => il(2, suma(s.a, s.b)),
    losuj: (r) => ({ a: r.int(2, 14), b: r.int(2, 14) }),
    cele: {
      b: {
        ok: (s) => suma(D(s.O, 2), [-1, s.a]),
        zle: (s) => [
          [suma(D(s.O, 2), s.a), `przenosząc $${s.a}$ na drugą stronę zmieniamy znak, a tu został plus`],
          [D(suma(s.O, [-1, s.a]), 2), `przez $2$ dzielimy całą sumę $${s.a} + ${s.b}$, więc $${s.a}$ odejmujemy dopiero po dzieleniu`],
          [suma(s.O, [-1, il(2, s.a)]), `to jest $2${s.b}$, bo nie podzielono przez $2$`],
          [suma(D(s.O, 2), [-1, il(2, s.a)]), `odjąć trzeba $${s.a}$, a nie $2${s.a}$`],
        ],
        jak: (s) => [`${s.O} = 2(${s.a} + ${s.b})`, `${fr(s.O, 2)} = ${s.a} + ${s.b}`, `${s.b} = ${fr(s.O, 2)} - ${s.a}`],
      },
    },
  },
  {
    id: "prosta",
    zestawy: [{ y: "y", x: "x" }, { y: "q", x: "p" }, { y: "w", x: "z" }],
    par: (r) => ({ p: r.int(2, 9), r: nz(r, 9) }),
    lewa: "y",
    intro: (w) => `Zależność dwóch liczb opisuje wzór $${w}$.`,
    rhs: (s, p) => suma(il(p.p, s.x), p.r),
    losuj: (r) => ({ x: r.int(-6, 10) }),
    cele: {
      x: {
        ok: (s, p) => D(suma(s.y, [-1, p.r]), p.p),
        zle: (s, p) => [
          [suma(D(s.y, p.p), [-1, p.r]), `przez $${p.p}$ dzielimy całą stronę, więc także liczbę $${Math.abs(p.r)}$ (poprawnie jest $\\frac{${s.y} ${p.r > 0 ? "-" : "+"} ${Math.abs(p.r)}}{${p.p}}$)`],
          [D(suma(s.y, p.r), p.p), `liczbę $${p.r}$ przenosimy na drugą stronę ze zmienionym znakiem`],
          [D(p.p, suma(s.y, [-1, p.r])), `ułamek jest odwrócony`],
          [suma(il(p.p, s.y), [-1, p.r]), `mnożenie przez $${p.p}$ cofamy dzieleniem, a nie mnożeniem`],
        ],
        jak: (s, p) => [`${s.y} = ${p.p}${s.x} ${p.r > 0 ? "+" : "-"} ${Math.abs(p.r)}`, `${s.y} ${p.r > 0 ? "-" : "+"} ${Math.abs(p.r)} = ${p.p}${s.x}`, `${s.x} = ${fr(`${s.y} ${p.r > 0 ? "-" : "+"} ${Math.abs(p.r)}`, p.p)}`],
      },
    },
  },
  {
    id: "prosta-litery",
    zestawy: [{ y: "y", a: "a", x: "x", b: "b" }, { y: "q", a: "m", x: "p", b: "n" }],
    lewa: "y",
    intro: (w) => `Wzór funkcji liniowej to $${w}$.`,
    rhs: (s) => suma(il(s.a, s.x), s.b),
    losuj: (r) => ({ a: r.int(2, 9), x: r.int(-5, 9), b: nz(r, 9) }),
    cele: {
      x: {
        ok: (s) => D(suma(s.y, [-1, s.b]), s.a),
        zle: (s) => [
          [suma(D(s.y, s.a), [-1, s.b]), `przez $${s.a}$ dzielimy całą stronę, więc także $${s.b}$`],
          [D(suma(s.y, s.b), s.a), `$${s.b}$ przenosimy na drugą stronę ze zmienionym znakiem`],
          [D(s.a, suma(s.y, [-1, s.b])), `ułamek jest odwrócony`],
          [suma(D(s.y, s.a), s.b), `przez $${s.a}$ dzielimy całą stronę, a $${s.b}$ powinno zmienić znak`],
        ],
        jak: (s) => [`${s.y} = ${s.a}${s.x} + ${s.b}`, `${s.y} - ${s.b} = ${s.a}${s.x}`, `${s.x} = ${fr(`${s.y} - ${s.b}`, s.a)}`],
      },
      b: {
        ok: (s) => suma(s.y, [-1, il(s.a, s.x)]),
        zle: (s) => [
          [suma(s.y, il(s.a, s.x)), `przenoszony wyraz $${s.a}${s.x}$ zmienia znak`],
          [suma(il(s.a, s.x), [-1, s.y]), `odjęcie jest w złej kolejności (wyszłoby $-${s.b}$)`],
          [suma(s.y, [-1, s.a], [-1, s.x]), `odjąć trzeba cały iloczyn $${s.a}${s.x}$, a nie osobno $${s.a}$ i $${s.x}$`],
        ],
        jak: (s) => [`${s.y} = ${s.a}${s.x} + ${s.b}`, `${s.b} = ${s.y} - ${s.a}${s.x}`],
      },
    },
  },
  {
    id: "objetosc",
    zestawy: [{ V: "V", a: "a", b: "b", h: "h" }, { V: "V", a: "x", b: "y", h: "z" }],
    lewa: "V",
    intro: (w) => `Objętość prostopadłościanu opisuje wzór $${w}$.`,
    rhs: (s) => il(s.a, s.b, s.h),
    losuj: (r) => ({ a: r.int(2, 9), b: r.int(2, 9), h: r.int(2, 9) }),
    cele: {
      h: {
        ok: (s) => D(s.V, il(s.a, s.b)),
        zle: (s) => [
          [suma(s.V, [-1, il(s.a, s.b)]), `iloczyn cofamy dzieleniem, a nie odejmowaniem`],
          [D(il(s.a, s.b), s.V), `ułamek jest odwrócony`],
          [D(s.V, suma(s.a, s.b)), `dzielić trzeba przez iloczyn $${s.a}${s.b}$, a nie przez sumę`],
          [D(s.V, s.a), `po podzieleniu przez $${s.a}$ zostaje jeszcze $${s.b}${s.h}$, trzeba podzielić także przez $${s.b}$`],
        ],
        jak: (s) => [`${s.V} = ${s.a}${s.b}${s.h}`, `${s.h} = ${fr(s.V, `${s.a}${s.b}`)}`],
      },
    },
  },
  {
    id: "srednia",
    zestawy: [{ S: "S", a: "a", b: "b", c: "c" }, { S: "m", a: "x", b: "y", c: "z" }],
    lewa: "S",
    intro: (w) => `Średnią arytmetyczną trzech liczb opisuje wzór $${w}$.`,
    rhs: (s) => D(suma(s.a, s.b, s.c), 3),
    losuj: (r) => { const a = r.int(2, 15), b = r.int(2, 15); let c = r.int(2, 15); while ((a + b + c) % 3) c++; return { a, b, c }; },
    cele: {
      c: {
        ok: (s) => suma(il(3, s.S), [-1, s.a], [-1, s.b]),
        zle: (s) => [
          [suma(D(s.S, 3), [-1, s.a], [-1, s.b]), `dzielenie przez $3$ cofamy mnożeniem przez $3$, a nie dzieleniem`],
          [suma(il(3, s.S), s.a, s.b), `przenoszone wyrazy zmieniają znak`],
          [D(suma(s.S, [-1, s.a], [-1, s.b]), 3), `najpierw mnożymy obie strony przez $3$, a dopiero potem odejmujemy`],
          [il(3, suma(s.S, [-1, s.a], [-1, s.b])), `przez $3$ mnożymy całą lewą stronę $${s.S}$ przed odejmowaniem, a nie wynik odejmowania`],
        ],
        jak: (s) => [`${s.S} = ${fr(`${s.a} + ${s.b} + ${s.c}`, 3)}`, `3${s.S} = ${s.a} + ${s.b} + ${s.c}`, `${s.c} = 3${s.S} - ${s.a} - ${s.b}`],
      },
    },
  },
  {
    id: "fahrenheit",
    zestawy: [{ F: "F", C: "C" }],
    lewa: "F",
    intro: (w) => `Temperaturę w stopniach Fahrenheita $F$ można obliczyć z temperatury w stopniach Celsjusza $C$ ze wzoru $${w}$.`,
    rhs: (s) => suma(il(q(9, 5), s.C), 32),
    losuj: (r) => ({ C: r.pick([-20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40]) }),
    cele: {
      C: {
        ok: (s) => D(il(5, suma(s.F, -32)), 9),
        zle: (s) => [
          [suma(D(il(5, s.F), 9), -32), `po odjęciu $32$ mnożymy przez $\\frac{5}{9}$ całą różnicę $${s.F} - 32$, a tu pomnożono tylko $${s.F}$`],
          [D(il(9, suma(s.F, -32)), 5), `przez $\\frac{9}{5}$ dzielimy, czyli mnożymy przez $\\frac{5}{9}$, a nie przez $\\frac{9}{5}$`],
          [suma(il(q(5, 9), s.F), 32), `liczbę $32$ przenosimy na drugą stronę ze zmienionym znakiem`],
          [suma(il(q(5, 9), s.F), -32), `przez $\\frac{9}{5}$ dzielimy całą stronę, więc także liczbę $32$`],
        ],
        jak: (s) => [`${s.F} = \\frac{9}{5}${s.C} + 32`, `${s.F} - 32 = \\frac{9}{5}${s.C}`, `${s.C} = ${fr(`5(${s.F} - 32)`, 9)}`],
      },
    },
  },
];

/** Przygotowuje zadanie ze wzorem: wybiera wzór, litery i szukaną literę, sprawdza poprawność wyznaczenia na liczbach. */
function przygotujWzor(r) {
  const T = r.pick(WZORY_LITERY);
  const s = r.pick(T.zestawy);
  const p = T.par ? T.par(r) : {};
  const rhs = T.rhs(s, p);
  const cel = r.pick(Object.keys(T.cele));
  const C = T.cele[cel];
  const ok = C.ok(s, p);
  const probka = () => {
    const wart = T.losuj(r);
    const env = Object.fromEntries(Object.entries(wart).map(([rola, v]) => [s[rola], Q.z(v)]));
    const lewa = ocen(rhs, env);
    const env2 = { ...env, [s[T.lewa]]: lewa };
    delete env2[s[cel]];
    return { env, env2, lewa, szukana: env[s[cel]] };
  };
  const probki = [probka(), probka()];
  for (const pr of probki) {
    if (!ocen(ok, pr.env2).eq(pr.szukana)) throw new Error(`Błędne wyznaczenie ${s[cel]} we wzorze ${T.id}`);
  }
  const wzor = `${s[T.lewa]} = ${zapis(rhs, { jawne: "wzor" })}`;
  return { T, s, p, rhs, cel, C, ok, probki, wzor };
}

/** Kroki wyprowadzenia: kolejne równania w jednym zdaniu. */
const lancuch = (rownania) => rownania.map((t) => `$${t}$`).join(", więc ");

function wyznaczLitere(r) {
  return probuj(() => {
    const { T, s, p, cel, C, ok, probki, wzor } = przygotujWzor(r);
    const kandydaci = C.zle(s, p).filter(([e]) => probki.some((pr) => {
      try { return !ocen(e, pr.env2).eq(pr.szukana); } catch { return false; }
    }) && zapis(e) !== zapis(ok));
    const unikalne = [];
    for (const k of r.shuffle(kandydaci)) if (!unikalne.some(([e]) => zapis(e) === zapis(k[0]))) unikalne.push(k);
    if (unikalne.length < 3) return null;
    const zle = unikalne.slice(0, 3);
    const op = (e) => `$${s[cel]} = ${zapis(e)}$`;
    const m = mieszaj(r, op(ok), zle.map(([e]) => op(e)));
    if (!m) return null;
    const pr = probki[0];
    const dane = Object.keys(pr.env2).map((l) => `$${l} = ${dz(pr.env2[l])}$`);
    const lewaLitera = s[T.lewa];
    const tresc = T.intro && r.chance(0.6)
      ? `${T.intro(wzor)} Który zapis poprawnie wyznacza $${s[cel]}$ z tego wzoru?`
      : r.pick([`Ze wzoru $${wzor}$ wyznacz $${s[cel]}$.`, `Dany jest wzór $${wzor}$. Które równanie poprawnie wyznacza $${s[cel]}$ z tego wzoru?`]);
    const podst = zapis(podstaw(ok, pr.env2), { jawne: true, dz: true });
    return zad(
      tresc,
      [polew("wzor", `Wyznaczone $${s[cel]}$`, m.opcje)],
      { wzor: m.ind },
      op(ok),
      [
        `Patrzymy, co się dzieje z szukaną literą $${s[cel]}$, i cofamy te działania w odwrotnej kolejności, po obu stronach równania: ${lancuch(C.jak(s, p))}.`,
        `Sprawdzenie na liczbach: dla ${wymien(Object.keys(pr.env).map((l) => `$${l} = ${dz(pr.env[l])}$`))} wzór daje $${lewaLitera} = ${dz(pr.lewa)}$. Wstawiamy do wyniku ${wymien(dane)}: $${podst} = ${dz(ocen(ok, pr.env2))}$, czyli z powrotem $${s[cel]} = ${dz(pr.szukana)}$.`,
        `Pozostałe odpowiedzi odpadają: ${zle.map(([e, powod]) => `${op(e)} – ${powod}`).join("; ")}.`,
      ],
    );
  });
}

function liczZeWzoru(r) {
  return probuj(() => {
    const { T, s, p, cel, C, ok, probki, wzor } = przygotujWzor(r);
    const pr = probki[0];
    const litera = s[cel];
    if (!ladna(pr.szukana)) return null;
    const dane = Object.keys(pr.env2).map((l) => `$${l} = ${dz(pr.env2[l])}$`);
    const et = etapy(ok, pr.env2, { dz: true });
    if (et.length > 4) return null;
    const lewaLitera = s[T.lewa];
    const doWzoru = zapis(podstaw(T.rhs(s, p), { ...pr.env2, [litera]: pr.szukana }), { jawne: true, dz: true });
    const kroki = [
      `Najpierw wyznaczamy $${litera}$ ze wzoru: ${lancuch(C.jak(s, p))}.`,
      `Wstawiamy liczby (${wymien(dane)})${Object.values(pr.env2).some((v) => v.ujemna) ? ", ujemne w nawiasie" : ""}: $${litera} = ${et[0].tex}$.`,
      ...et.slice(1).map((e) => `${e.opis}: $${litera} = ${e.tex}$.`),
    ];
    if (kroki.length < 5 && doWzoru.length <= 40) {
      kroki.push(`Sprawdzenie: dla $${litera} = ${dz(pr.szukana)}$ wzór wyjściowy daje $${lewaLitera} = ${doWzoru} = ${dz(pr.lewa)}$.`);
    }
    return zad(
      `${T.intro ? `${T.intro(wzor)} ` : `Dany jest wzór $${wzor}$. `}Oblicz $${litera}$, jeśli ${wymien(dane)}.`,
      [pole("wartosc", `$${litera} =$`)],
      { wartosc: pr.szukana },
      `$${litera} = ${dz(pr.szukana)}$`,
      kroki,
    );
  });
}

// --- 7. Proporcje i proporcjonalność prosta

/** Wynik w złotych: z groszami (dwie cyfry), gdy nie jest liczbą całkowitą. */
const zl = (v) => dz(v, Q.z(v).calkowita ? 0 : 2);

function proporcjaZNiewiadoma(r) {
  return probuj(() => {
    // Cztery wyrazy proporcji n1/d1 = n2/d2: krotności jednego stosunku albo dowolne liczby (wtedy wynik bywa ułamkiem).
    let w, poz;
    if (r.chance(0.7)) {
      const a = r.int(1, 9), b = r.int(1, 9), s1 = r.int(1, 12), s2 = r.int(1, 12);
      if (a === b || nwd(a, b) !== 1 || s1 === s2) return null;
      w = [a * s1, b * s1, a * s2, b * s2].map((v) => q(v));
      poz = r.int(0, 3);
    } else {
      // trzy dowolne liczby, czwarta (niewiadoma) wynika z mnożenia na krzyż i bywa ułamkiem dziesiętnym
      const [v0, v1, v2] = [r.int(2, 16), r.int(2, 16), r.int(2, 16)].map((v) => q(v));
      const cz = v1.mul(v2).div(v0);
      if (cz.calkowita || ![2, 4, 5].includes(cz.d) || cz.n > 100) return null;
      poz = r.int(0, 3);
      w = [[cz, v2, v1, v0], [v2, cz, v0, v1], [v1, v0, cz, v2], [v0, v1, v2, cz]][poz];
    }
    const wart = w[poz];
    const rodzaj = w.every((v) => v.calkowita) ? r.pick(["x", "x", "x", "x+u", "kx"]) : "x";
    let wyraz, x;
    if (rodzaj === "x+u") {
      const u = r.int(1, 6);
      if (wart.n <= u) return null;
      wyraz = suma("x", u);
      x = wart.sub(u);
    } else if (rodzaj === "kx") {
      const k = r.pick([2, 3]);
      if (wart.n % k) return null;
      wyraz = il(k, "x");
      x = wart.div(k);
    } else {
      wyraz = zm("x");
      x = wart;
    }
    const slot = w.map((v, i) => (i === poz ? wyraz : num(v)));
    const dwukropek = r.chance(0.3) && rodzaj === "x";
    const zapisSlotu = (e) => zapis(e, { dz: true });
    const rown = dwukropek
      ? `${zapisSlotu(slot[0])} : ${zapisSlotu(slot[1])} = ${zapisSlotu(slot[2])} : ${zapisSlotu(slot[3])}`
      : `${fr(zapisSlotu(slot[0]), zapisSlotu(slot[1]))} = ${fr(zapisSlotu(slot[2]), zapisSlotu(slot[3]))}`;
    // mnożenie na krzyż: n1·d2 = d1·n2; strona z niewiadomą: liczba przy niewiadomej razy wyrażenie
    const parWL = poz === 0 ? [w[3], wyraz] : poz === 3 ? [w[0], wyraz] : null;
    const parWP = poz === 1 ? [w[2], wyraz] : poz === 2 ? [w[1], wyraz] : null;
    const znana = poz === 0 || poz === 3 ? w[1].mul(w[2]) : w[0].mul(w[3]);
    const znanaCzynniki = poz === 0 || poz === 3 ? [w[1], w[2]] : [w[0], w[3]];
    const [mnoznik, wyr] = parWL ?? parWP;
    const stronaNiewiadomej = il(num(mnoznik), wyr);
    const prosta = rodzaj === "kx" ? uprosc(stronaNiewiadomej) : stronaNiewiadomej;
    const kroki = [
      `Mnożymy na krzyż (liczby „po przekątnej”): $${zapis(stronaNiewiadomej, { jawne: true, dz: true })} = ${znanaCzynniki.map((v) => dz(v)).join(" \\cdot ")}$, czyli $${zapis(prosta, { dz: true })} = ${dz(znana)}$.`,
    ];
    const dalej = krokiRownania(prosta, num(znana), { sprawdzenie: false });
    if (!dalej) return null;
    kroki.push(...dalej);
    const l1 = w[0].div(w[1]).eq(w[2].div(w[3])) ? w[0].div(w[1]) : null;
    if (!l1) throw new Error("Zła proporcja");
    const pelne = w.map((v) => dz(v));
    kroki.push(`Sprawdzenie: dla $x = ${dz(x)}$ ${dwukropek ? `stosunki $${pelne[0]} : ${pelne[1]}$ i $${pelne[2]} : ${pelne[3]}$` : `ułamki $${fr(pelne[0], pelne[1])}$ i $${fr(pelne[2], pelne[3])}$`} są równe (oba mają wartość $${ulTex(l1)}$).`);
    if (kroki.length > 5) return null;
    const nieCalk = !x.calkowita;
    return zad(
      `${r.pick([`Oblicz $x$ z proporcji $${rown}$.`, `Rozwiąż proporcję $${rown}$.`, `Dla jakiej liczby $x$ prawdziwa jest proporcja $${rown}$?`])}${nieCalk ? " Wynik wpisz jako ułamek dziesiętny albo zwykły (np. 7,5 albo 15/2)." : ""}`,
      [pole("x", "$x =$")],
      { x },
      `$x = ${nieCalk ? ulTex(x) : x.n}$`,
      kroki,
    );
  });
}

// --- Proporcjonalność prosta: przepisy, tabele, zakupy, wybór

const PRZEPISY = [
  { nazwa: "naleśników", sk: [["mąki", "g", [200, 250, 300, 400]], ["mleka", "ml", [300, 400, 500, 600]], ["cukru", "g", [20, 30, 40]], ["jajek", ["jajko", "jajka", "jajek"], [2, 3, 4]]] },
  { nazwa: "ciasteczek", sk: [["mąki", "g", [200, 300, 400, 500]], ["masła", "g", [100, 150, 200]], ["cukru", "g", [50, 100, 150]], ["jajek", ["jajko", "jajka", "jajek"], [2, 3, 4]]] },
  { nazwa: "kisielu", sk: [["wody", "ml", [500, 750, 1000]], ["cukru", "g", [20, 40, 60]], ["mąki ziemniaczanej", "g", [20, 30, 40]]] },
  { nazwa: "zupy jarzynowej", sk: [["wody", "ml", [400, 500, 600]], ["marchewek", ["marchewka", "marchewki", "marchewek"], [2, 3, 4]], ["ziemniaków", ["ziemniak", "ziemniaki", "ziemniaków"], [2, 3, 4, 6]], ["soli", "g", [2, 4, 6]]] },
];

function przepisPorcje(r) {
  return probuj(() => {
    const P = r.pick(PRZEPISY);
    const m = r.pick([2, 4, 5, 6, 8, 10]), n = r.int(2, 14);
    if (n === m) return null;
    const skl = r.shuffle(P.sk).slice(0, 3).map(([gen, jed, wart]) => ({ gen, jed, a: r.pick(wart) }));
    const k = q(n, m);
    if (skl.some((s) => !q(s.a).mul(k).calkowita)) return null;
    const pyt = skl[r.int(0, 2)];
    const v = q(pyt.a).mul(k);
    const porcje = (liczba) => lm(liczba, ["porcję", "porcje", "porcji"]);
    const poz = (s) => (typeof s.jed === "string" ? `$${s.a}$ ${s.jed} ${s.gen}` : `$${s.a}$ ${lm(s.a, s.jed)}`);
    const kTex = skonczony(k) ? dz(k) : ulTex(k);
    const jedAns = typeof pyt.jed === "string" ? pyt.jed : pyt.gen;
    return zad(
      `Przepis na $${m}$ ${porcje(m)} ${P.nazwa}: ${wymien(skl.map(poz))}. Ile ${pyt.gen} potrzeba na $${n}$ ${porcje(n)} ${P.nazwa}?`,
      [pole("ilosc", typeof pyt.jed === "string" ? `Ilość ${pyt.gen} (w ${pyt.jed})` : `Liczba ${pyt.gen}`)],
      { ilosc: v },
      typeof pyt.jed === "string" ? `$${v.n}$ ${pyt.jed}` : `$${v.n}$ ${lm(v.n, pyt.jed)}`,
      [
        `Liczba porcji zmienia się z $${m}$ na $${n}$, więc wszystkie składniki zmieniamy tyle samo razy: $${n} : ${m}$, czyli $${kTex}$ razy.`,
        `Mnożymy ilość ${pyt.gen} przez ten współczynnik: $${pyt.a} \\cdot ${kTex} = ${v.n}$${typeof pyt.jed === "string" ? ` ${jedAns}` : ""}.`,
        `Sprawdzenie: ilość na jedną porcję nie zmieniła się: $${pyt.a} : ${m} = ${dz(q(pyt.a, m))}$ i $${v.n} : ${n} = ${dz(q(v.n, n))}$.`,
      ],
    );
  });
}
const skonczony = (v) => 10000 % Q.z(v).d === 0;

function tabelaProporcjonalnosci(r) {
  return probuj(() => {
    const c = r.pick([2, 3, 4, 5, 6, 7, q(3, 2), q(5, 2), q(1, 2), q(3, 4)]);
    const n = r.pick([3, 4, 4]);
    const xs = r.shuffle([1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20]).slice(0, n).sort((a, b) => a - b).map((v) => q(v));
    const ys = xs.map((v) => v.mul(c));
    if (ys.some((v) => !skonczony(v)) || ys.some((v) => v.d > 4)) return null;
    const brak = r.int(0, n - 1), wiersz = r.pick(["x", "y", "y"]);
    const wzor = xs.findIndex((_, i) => i !== brak);
    const komorka = (v, i, rz) => (i === brak && rz === wiersz ? "?" : dz(v));
    const tabela = `\\begin{array}{c|${"c".repeat(n)}} x & ${xs.map((v, i) => komorka(v, i, "x")).join(" & ")} \\\\ \\hline y & ${ys.map((v, i) => komorka(v, i, "y")).join(" & ")} \\end{array}`;
    const odp = wiersz === "y" ? ys[brak] : xs[brak];
    const cTex = dz(c);
    const drugi = xs.findIndex((_, i) => i !== brak && i !== wzor);
    return zad(
      `Wielkości $x$ i $y$ są wprost proporcjonalne. Wpisz liczbę, która powinna stać w miejscu znaku zapytania w tabeli.\n\n$${tabela}$`,
      [pole("brakujaca", "Brakująca liczba")],
      { brakujaca: odp },
      `$${dz(odp)}$`,
      [
        `Przy proporcjonalności prostej iloraz $y : x$ jest w każdej kolumnie taki sam. Bierzemy kolumnę bez znaku zapytania: $y : x = ${dz(ys[wzor])} : ${dz(xs[wzor])} = ${cTex}$.`,
        wiersz === "y"
          ? `W kolumnie z $x = ${dz(xs[brak])}$ mamy $y = ${cTex} \\cdot ${dz(xs[brak])} = ${dz(odp)}$.`
          : `W kolumnie z $y = ${dz(ys[brak])}$ mamy $x = y : ${cTex} = ${dz(ys[brak])} : ${cTex} = ${dz(odp)}$.`,
        drugi >= 0 ? `Sprawdzenie na innej kolumnie: $${dz(ys[drugi])} : ${dz(xs[drugi])} = ${cTex}$ – ten sam iloraz.` : `Sprawdzenie: $${dz(ys[brak])} : ${dz(xs[brak])} = ${cTex}$ – ten sam iloraz co w pozostałych kolumnach.`,
      ],
    );
  });
}

const KONTEKSTY_ZAKUPOW = [
  {
    id: "owoce", ladnaCena: true,
    jednostki: [[2, 3, 4, 5, 6, 8], [2, 3, 4, 5, 6, 8, 10, 12]], u: [2, q(5, 2), 3, q(7, 2), 4, q(9, 2), 5, 6, q(15, 2), 8],
    owoc: ["jabłek", "gruszek", "śliwek", "pomidorów", "ziemniaków", "truskawek"],
    tresc: (m, c, n, owoc) => `$${m}$ kg ${owoc} kosztuje $${zl(c)}$ zł. Ile kosztuje $${n}$ kg ${owoc} (przy takiej samej cenie za kilogram)?`,
    etykieta: "Cena (w zł)", suf: "zł", moneta: true, jedn1: "jeden kilogram kosztuje", jedn1Zdanie: (u) => `jeden kilogram kosztuje $${zl(u)}$ zł`, kol: ["kg", "zł"],
    cojedn: ["kilogramów", "złotych"],
  },
  {
    id: "paliwo", ladnaCena: false,
    jednostki: [[100, 200, 300, 400], [150, 250, 350, 450, 500, 600]], u: [q(5, 100), q(6, 100), q(7, 100), q(8, 100), q(9, 100)],
    tresc: (m, c, n) => `Samochód przejechał $${m}$ km i zużył $${dz(c)}$ l paliwa. Ile litrów paliwa zużyje na trasie $${n}$ km, jeśli na każdym kilometrze spala tyle samo?`,
    etykieta: "Zużycie paliwa (w litrach)", suf: "l", jedn1Zdanie: (u) => `na jednym kilometrze samochód zużywa $${dz(u)}$ l`, kol: ["km", "l"],
    cojedn: ["kilometrów", "paliwa"],
  },
  {
    id: "druk", ladnaCena: false,
    jednostki: [[2, 3, 4, 5, 6], [3, 5, 7, 8, 10, 12, 15]], u: [10, 12, 15, 20, 24, 25, 30],
    tresc: (m, c, n) => `Drukarka drukuje $${c.n}$ stron w ciągu $${m}$ minut. Ile stron wydrukuje w ciągu $${n}$ minut, jeśli pracuje w stałym tempie?`,
    etykieta: "Liczba stron", suf: "stron", jedn1Zdanie: (u) => `w ciągu jednej minuty drukarka drukuje $${dz(u)}$ stron`, kol: ["minuty", "strony"],
    cojedn: ["minut", "stron"],
  },
  {
    id: "rower", ladnaCena: false,
    jednostki: [[2, 3, 4, 5], [3, 4, 6, 7, 8, 10]], u: [12, 15, 16, 18, 20, 24],
    tresc: (m, c, n) => `W ciągu $${m}$ godzin rowerzysta przejechał $${c.n}$ km. Ile kilometrów przejedzie w ciągu $${n}$ godzin, jadąc z taką samą prędkością?`,
    etykieta: "Droga (w km)", suf: "km", jedn1Zdanie: (u) => `w ciągu jednej godziny rowerzysta przejeżdża $${dz(u)}$ km`, kol: ["godziny", "km"],
    cojedn: ["godzin", "kilometrów"],
  },
  {
    id: "mur", ladnaCena: false,
    jednostki: [[2, 3, 4, 5], [6, 7, 8, 10, 12]], u: [40, 50, 60, 75, 80],
    tresc: (m, c, n) => `Do zbudowania muru o długości $${m}$ m potrzeba $${c.n}$ cegieł. Ile cegieł potrzeba na mur o długości $${n}$ m (takiej samej wysokości i grubości)?`,
    etykieta: "Liczba cegieł", suf: "cegieł", jedn1Zdanie: (u) => `na jeden metr muru potrzeba $${dz(u)}$ cegieł`, kol: ["m", "cegły"],
    cojedn: ["metrów muru", "cegieł"],
  },
];

function zakupyProporcja(r) {
  return probuj(() => {
    const K = r.pick(KONTEKSTY_ZAKUPOW);
    const m = r.pick(K.jednostki[0]), n = r.pick(K.jednostki[1]);
    if (m === n) return null;
    const u = Q.z(r.pick(K.u));
    const c = u.mul(m), v = u.mul(n);
    if (K.moneta ? !(c.calkowita) : !(skonczony(c) && skonczony(v))) return null;
    if (!K.moneta && (v.d > 2 || c.d > 2)) return null;
    const owoc = K.owoc ? r.pick(K.owoc) : "";
    const jedn = r.chance(0.5);
    const kroki = jedn
      ? [
        `Najpierw liczymy, ile to jest dla jednej jednostki (dzielimy): $${K.moneta ? zl(c) : dz(c)} : ${m} = ${K.moneta ? zl(u) : dz(u)}$, czyli ${K.jedn1Zdanie(u)}.`,
        `Potem mnożymy przez potrzebną liczbę jednostek: $${n} \\cdot ${K.moneta ? zl(u) : dz(u)} = ${K.moneta ? zl(v) : dz(v)}$.`,
      ]
      : [
        `Jednakowe wielkości ustawiamy pod sobą: ${K.kol[0]} pod ${K.kol[0]}, ${K.kol[1]} pod ${K.kol[1]}. Proporcja: $${fr(m, K.moneta ? zl(c) : dz(c))} = ${fr(n, "x")}$.`,
        `Mnożymy na krzyż: $${m}x = ${n} \\cdot ${K.moneta ? zl(c) : dz(c)}$, więc $x = ${dz(q(n).mul(c))} : ${m} = ${K.moneta ? zl(v) : dz(v)}$.`,
      ];
    kroki.push(`Sprawdzenie sensu: ${n > m ? "więcej" : "mniej"} ${K.cojedn[0]}, więc ${n > m ? "więcej" : "mniej"} ${K.cojedn[1]} – wynik $${K.moneta ? zl(v) : dz(v)}$ jest ${n > m ? "większy" : "mniejszy"} niż $${K.moneta ? zl(c) : dz(c)}$, czyli zgadza się.`);
    return zad(
      K.tresc(m, c, n, owoc),
      [pole("wartosc", K.etykieta)],
      { wartosc: v },
      `$${K.moneta ? zl(v) : dz(v)}$ ${K.suf}`,
      kroki,
    );
  });
}

const WIELKOSCI_TAK = [
  ["liczba kupionych biletów po tej samej cenie i kwota do zapłaty", "dwa razy więcej biletów kosztuje dwa razy więcej, a $0$ biletów kosztuje $0$ zł"],
  ["długość boku kwadratu i jego obwód", "obwód to $4a$, więc dwa razy dłuższy bok daje dwa razy większy obwód"],
  ["czas jazdy ze stałą prędkością i przebyta droga", "droga to $v \\cdot t$, więc dwa razy dłuższy czas daje dwa razy dłuższą drogę"],
  ["masa kupionych jabłek i ich cena (przy stałej cenie za kilogram)", "dwa razy więcej jabłek kosztuje dwa razy więcej"],
  ["liczba porcji ciasta i potrzebna ilość mąki", "dwa razy więcej porcji wymaga dwa razy więcej mąki"],
  ["liczba godzin pracy przy stałej stawce i zarobek", "dwa razy dłuższa praca daje dwa razy większy zarobek"],
];
const WIELKOSCI_NIE = [
  ["wiek dziecka i jego wzrost", "wiek i wzrost rosną razem, ale nie tyle samo razy: nie ma stałego ilorazu"],
  ["długość boku kwadratu i jego pole", "pole to $a^2$: dwa razy dłuższy bok daje cztery razy większe pole"],
  ["liczba robotników i czas wykonania tej samej pracy", "gdy jedna wielkość rośnie, druga maleje: to nie jest proporcjonalność prosta"],
  ["prędkość pojazdu i czas przejazdu tej samej trasy", "dwa razy szybciej to dwa razy krócej: jedna wielkość rośnie, druga maleje"],
  ["długość krawędzi sześcianu i jego objętość", "objętość to $a^3$: dwa razy dłuższa krawędź daje osiem razy większą objętość"],
  ["liczba osób dzielących tę samą pizzę i wielkość kawałka dla jednej osoby", "gdy jedna wielkość rośnie, druga maleje"],
];

function ktoreProporcjonalne(r) {
  const tak = r.pick(WIELKOSCI_TAK), nie = r.shuffle(WIELKOSCI_NIE).slice(0, 3);
  const m = mieszaj(r, cap(tak[0]), nie.map(([t]) => cap(t)));
  const opisy = new Map([[cap(tak[0]), [true, tak[1]]], ...nie.map(([t, p]) => [cap(t), [false, p]])]);
  return zad(
    "Które dwie wielkości są wprost proporcjonalne?",
    [polew("para", "Wielkości wprost proporcjonalne", m.opcje)],
    { para: m.ind },
    cap(tak[0]),
    [
      "Pytamy o każdą parę: czy dwa razy więcej jednej wielkości oznacza dwa razy więcej drugiej (i czy zero daje zero)?",
      ...m.opcje.map((o) => `${o} – ${opisy.get(o)[0] ? "tak" : "nie"}: ${opisy.get(o)[1]}.`),
    ],
  );
}

function poprawnaProporcja(r) {
  return probuj(() => {
    const a = r.int(1, 9), b = r.int(2, 9);
    if (a === b || nwd(a, b) !== 1) return null;
    const s1 = r.int(1, 6), s2 = r.int(1, 8);
    if (s1 === s2) return null;
    const dobra = [a * s1, b * s1, a * s2, b * s2];
    const t = r.int(1, 5), k = r.pick([1, -1]);
    const a2 = r.int(2, 9), b2 = r.int(a2 + 1, 12), s3 = r.int(2, 4);
    const zle = [
      [a2, b2, a2 + t, b2 + t],                       // dodano to samo do licznika i mianownika
      [a2 * s3, b2 * s3, b2 * (s3 + 1), a2 * (s3 + 1)], // odwrócony drugi ułamek
      [a2, b2, a2 * s3, b2 * s3 + k],                  // jeden wyraz o 1 za duży lub za mały
    ];
    if (zle.some((z) => z[0] * z[3] === z[1] * z[2])) return null;
    const txt = (z) => `$${fr(z[0], z[1])} = ${fr(z[2], z[3])}$`;
    const m = mieszaj(r, txt(dobra), zle.map(txt));
    if (!m) return null;
    const wszystkie = [dobra, ...zle];
    const tekstDoZ = new Map(wszystkie.map((z) => [txt(z), z]));
    return zad(
      "Która z podanych równości jest proporcją (czyli jest prawdziwa)?",
      [polew("rownosc", "Prawdziwa proporcja", m.opcje)],
      { rownosc: m.ind },
      txt(dobra),
      [
        "Równość dwóch ułamków jest prawdziwa, gdy iloczyny na krzyż są równe: licznik pierwszego razy mianownik drugiego i mianownik pierwszego razy licznik drugiego.",
        ...m.opcje.map((o) => {
          const z = tekstDoZ.get(o);
          const l = z[0] * z[3], p = z[1] * z[2];
          return `${o}: $${z[0]} \\cdot ${z[3]} = ${l}$ i $${z[1]} \\cdot ${z[2]} = ${p}$ – ${l === p ? "równe, więc to proporcja" : "różne, więc to nie proporcja"}.`;
        }),
      ],
    );
  });
}

function proporcjonalnosc(r) {
  const w = r.int(0, 99);
  if (w < 28) return przepisPorcje(r);
  if (w < 50) return tabelaProporcjonalnosci(r);
  if (w < 80) return zakupyProporcja(r);
  if (w < 90) return ktoreProporcjonalne(r);
  return poprawnaProporcja(r);
}

// --- Lista generatorów

export const GENERATORY = [
  { id: "zapis-z-opisu", nazwa: "Które wyrażenie opisuje tekst", opis: "Zapisywanie wyrażenia z opisu słownego: o … więcej, … razy mniej, kwadrat sumy, kolejne liczby parzyste i nieparzyste, wiek, ceny, obwód i pole figury.", temat: "zapisywanie-wyrazen", generuj: zapisWyrazenia },
  { id: "zapis-i-wartosc", nazwa: "Wyrażenie z opowiadania i jego wartość", opis: "Wiek, zakupy, droga, pieniądze i figury: wybór wyrażenia opisującego sytuację i obliczenie jego wartości dla podanych liczb.", temat: "zapisywanie-wyrazen", generuj: zapisIWartosc },
  { id: "podstawianie-liczby", nazwa: "Wartość wyrażenia dla podanego x", opis: "Podstawianie liczby za literę, także ujemnej, ułamkowej i dziesiętnej; potęgi, nawiasy i kreska ułamkowa, kolejność działań krok po kroku.", temat: "wartosc-wyrazenia", generuj: podstawianieLiczby },
  { id: "dwie-litery-i-wzory", nazwa: "Wyrażenia z dwiema literami i wzory", opis: "Wartość wyrażenia z dwiema literami (także ujemnymi) oraz podstawianie liczb do wzorów: pole, obwód, droga, temperatura, średnia.", temat: "wartosc-wyrazenia", generuj: wartoscWyrazenia2 },
  { id: "uproszczenie-wspolczynniki", nazwa: "Upraszczanie wyrażenia i współczynniki", opis: "Rozpisanie nawiasów, minus przed nawiasem, wyrazy podobne i mnożenie nawiasów; podanie współczynników wyrażenia po uproszczeniu.", temat: "przeksztalcanie", generuj: uproszczenie },
  { id: "wybor-postaci", nazwa: "Wyłączanie przed nawias, mnożenie sum, nawias z minusem", opis: "Wybór poprawnej postaci wyrażenia: iloczyn po wyłączeniu wspólnego czynnika, wynik mnożenia nawiasów, wyrażenie po rozpisaniu nawiasu z minusem.", temat: "przeksztalcanie", generuj: wyborPostaci },
  { id: "rownanie-liniowe", nazwa: "Rozwiązywanie równań z nawiasami i ułamkami", opis: "Równania liniowe z niewiadomą po obu stronach, z nawiasami i ułamkami; rozwiązanie całkowite lub ułamkowe, sprawdzenie.", temat: "rownania", generuj: rownanieLiniowe },
  { id: "czy-rozwiazanie", nazwa: "Rozwiązanie równania i liczba rozwiązań", opis: "Wybór liczby będącej rozwiązaniem równania oraz określenie, czy równanie ma jedno, żadne albo nieskończenie wiele rozwiązań.", temat: "rownania", generuj: czyRozwiazanie },
  { id: "zadanie-wiek-i-liczby", nazwa: "Zadania z równaniem: wiek i liczby", opis: "Zadania tekstowe o wieku (teraz, za kilka lat), o liczbie po kilku działaniach, o dwóch liczbach i o kolejnych liczbach; rozwiązanie w pięciu krokach.", temat: "zadania-z-rownaniem", generuj: wiekILiczby },
  { id: "zadanie-pieniadze-i-figury", nazwa: "Zadania z równaniem: pieniądze i figury", opis: "Bilety ulgowe i normalne, podział kwoty, wydana połowa pieniędzy, wyrównanie sum oraz obwód prostokąta i trójkąta; rozwiązanie w pięciu krokach.", temat: "zadania-z-rownaniem", generuj: pieniadzeIFigury },
  { id: "wyznacz-litere", nazwa: "Wyznaczanie litery ze wzoru (wybór)", opis: "Wybór poprawnie przekształconego wzoru: obwód, pole trójkąta i trapezu, prędkość i droga, funkcja liniowa, średnia, temperatura; typowe błędy w odpowiedziach.", temat: "przeksztalcanie-wzorow", generuj: wyznaczLitere },
  { id: "oblicz-ze-wzoru", nazwa: "Obliczanie wielkości ze wzoru", opis: "Obliczenie jednej litery ze wzoru po podstawieniu liczb do pozostałych: najpierw przekształcenie wzoru, potem rachunek krok po kroku.", temat: "przeksztalcanie-wzorow", generuj: liczZeWzoru },
  { id: "proporcja-z-niewiadoma", nazwa: "Proporcja z niewiadomą", opis: "Mnożenie na krzyż w proporcji z jedną niewiadomą (także x + a i kx), zapis ułamkowy i z dwukropkiem; wynik całkowity lub ułamek dziesiętny.", temat: "proporcje", generuj: proporcjaZNiewiadoma },
  { id: "proporcjonalnosc-prosta", nazwa: "Proporcjonalność prosta: przepis, tabela, zakupy", opis: "Przepis na inną liczbę porcji, brakująca liczba w tabeli, cena i zużycie przez jedność lub z proporcji, wybór wielkości wprost proporcjonalnych i prawdziwej proporcji.", temat: "proporcje", generuj: proporcjonalnosc },
];
