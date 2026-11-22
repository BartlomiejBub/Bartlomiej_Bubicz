// Wyrażenia matematyczne dla kalkulatora (assets/kalkulator.js) i kalkulatora graficznego (assets/wykresy.js).
// Bez eval: tekst → tokeny → drzewo → funkcja. Rozumie zapisy ze szkoły: przecinek dziesiętny (2,5), · × : ÷ − ^ ² ³ √ π,
// tg i ctg, |x|, log (dziesiętny), log_2(8), ln, procent (20%), silnię (5!) i mnożenie bez znaku (2x, 3(x+1), 2π).

export class BladWyrazenia extends Error {}

const FUNKCJE = ["arcsin", "arccos", "arctg", "arctan", "sin", "cos", "tg", "tan", "ctg", "cot", "sqrt", "pierw", "cbrt", "abs", "ln", "log", "exp"];
const NAZWY = [...FUNKCJE, "pi", "Ans"].sort((a, b) => b.length - a.length);
const ZNAKI = {
  "+": "+", "-": "-", "−": "-", "–": "-", "*": "*", "×": "*", "·": "*", "⋅": "*", "/": "/", ":": "/", "÷": "/",
  "^": "^", "(": "(", ")": ")", "[": "(", "]": ")", "|": "|", "!": "!", "%": "%", "√": "√", "π": "π",
  "=": "=", ";": ";", ",": ",", "_": "_",
};

/** Dzieli tekst na tokeny: liczby, nazwy funkcji, pojedyncze litery i znaki. */
export function tokeny(tekst) {
  const s = String(tekst);
  const t = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(s[i + 1] ?? ""))) {
      let j = i;
      while (/[0-9]/.test(s[j] ?? "")) j++;
      // przecinek albo kropka dziesiętna – tylko między cyframi, bez spacji (2,5); „2, 5” i „2;5” to dwie liczby
      if ((s[j] === "." || s[j] === ",") && /[0-9]/.test(s[j + 1] ?? "")) { j++; while (/[0-9]/.test(s[j] ?? "")) j++; }
      t.push({ typ: "liczba", v: Number(s.slice(i, j).replace(",", ".")), poz: i });
      i = j;
      continue;
    }
    if (/[a-zA-Z]/.test(c)) {
      const reszta = s.slice(i);
      const nazwa = NAZWY.find((n) => reszta.startsWith(n));
      if (nazwa) { t.push({ typ: "nazwa", v: nazwa, poz: i }); i += nazwa.length; continue; }
      t.push({ typ: "litera", v: c, poz: i });
      i++;
      continue;
    }
    if (c === "²" || c === "³") {
      t.push({ typ: "znak", v: "^", poz: i }, { typ: "liczba", v: c === "²" ? 2 : 3, poz: i });
      i++;
      continue;
    }
    if (ZNAKI[c]) { t.push({ typ: "znak", v: ZNAKI[c], poz: i }); i++; continue; }
    throw new BladWyrazenia(`Nie znam znaku „${c}”.`);
  }
  return t;
}

class Parser {
  constructor(t, tekst, opcje) {
    this.t = t;
    this.tekst = tekst;
    this.i = 0;
    this.abs = 0;
    this.funkcje = opcje.funkcje ?? new Set();
    this.zmienne = opcje.zmienne ?? new Set();
  }
  get p() { return this.t[this.i]; }
  jest(v) { const p = this.p; return !!p && p.typ === "znak" && p.v === v; }
  wez() { return this.t[this.i++]; }
  oczekuj(v, komunikat) { if (!this.jest(v)) throw new BladWyrazenia(komunikat); this.i++; }

  wyrazenie() {
    let a = this.iloczyn();
    while (this.jest("+") || this.jest("-")) {
      const o = this.wez().v;
      if (!this.p) throw new BladWyrazenia(`Po „${o}” brakuje liczby.`);
      a = { t: "op", o, a, b: this.iloczyn() };
    }
    return a;
  }
  /** Czy następny token zaczyna czynnik – wtedy to mnożenie bez znaku (2x, 3(x+1), x sin x). */
  czynnik() {
    const p = this.p;
    if (!p) return false;
    if (p.typ !== "znak") return true;
    return p.v === "(" || p.v === "√" || p.v === "π" || (p.v === "|" && this.abs === 0);
  }
  iloczyn() {
    let a = this.unarny();
    for (;;) {
      if (this.jest("*") || this.jest("/")) {
        const o = this.wez().v;
        if (!this.p) throw new BladWyrazenia(`Po „${o === "*" ? "·" : ":"}” brakuje liczby.`);
        a = { t: "op", o, a, b: this.unarny() };
      } else if (this.czynnik()) a = { t: "op", o: "*", a, b: this.potega() };
      else return a;
    }
  }
  unarny() {
    if (this.jest("-")) { this.i++; return { t: "neg", a: this.unarny() }; }
    if (this.jest("+")) { this.i++; return this.unarny(); }
    return this.potega();
  }
  potega() {
    const a = this.przyrostek();
    if (this.jest("^")) {
      this.i++;
      if (!this.p) throw new BladWyrazenia("Po „^” brakuje wykładnika.");
      return { t: "op", o: "^", a, b: this.unarny() };
    }
    return a;
  }
  przyrostek() {
    let a = this.podstawowy();
    for (;;) {
      if (this.jest("!")) { this.i++; a = { t: "silnia", a }; }
      else if (this.jest("%")) { this.i++; a = { t: "procent", a }; }
      else return a;
    }
  }
  wNawiasie() {
    const a = this.wyrazenie();
    this.oczekuj(")", "Brakuje nawiasu zamykającego „)”.");
    return a;
  }
  /** Argument funkcji: w nawiasie albo bez nawiasu (sin 30, √2, sin x²). */
  argument() {
    if (this.jest("(")) { this.i++; return this.wNawiasie(); }
    if (!this.p) throw new BladWyrazenia("Po nazwie funkcji brakuje argumentu.");
    return this.unarny();
  }
  podstawowy() {
    const p = this.wez();
    if (!p) throw new BladWyrazenia("Wyrażenie jest niedokończone.");
    if (p.typ === "liczba") return { t: "liczba", v: p.v };
    if (p.typ === "znak") {
      if (p.v === "(") return this.wNawiasie();
      if (p.v === "|") {
        this.abs++;
        const a = this.wyrazenie();
        this.abs--;
        this.oczekuj("|", "Brakuje zamykającej kreski „|”.");
        return { t: "fn", f: "abs", a };
      }
      if (p.v === "√") return { t: "fn", f: "sqrt", a: this.argument() };
      if (p.v === "π") return { t: "liczba", v: Math.PI };
      if (p.v === ")") throw new BladWyrazenia("Za dużo nawiasów zamykających „)”.");
      throw new BladWyrazenia(`Przed „${p.v === "*" ? "·" : p.v === "/" ? ":" : p.v}” brakuje liczby.`);
    }
    if (p.typ === "nazwa") {
      if (p.v === "pi") return { t: "liczba", v: Math.PI };
      if (p.v === "Ans") return { t: "zmienna", n: "Ans" };
      let baza = null;
      if (p.v === "log" && this.jest("_")) { this.i++; baza = this.przyrostek(); }   // log_2(8)
      return { t: "fn", f: p.v, a: this.argument(), baza };
    }
    // pojedyncza litera: funkcja użytkownika f(…), stała e albo zmienna (x, a, b…)
    if (this.funkcje.has(p.v) && this.jest("(")) { this.i++; return { t: "wywolanie", f: p.v, a: this.wNawiasie() }; }
    if (p.v === "e" && !this.zmienne.has("e")) return { t: "liczba", v: Math.E };
    return { t: "zmienna", n: p.v };
  }
}

/**
 * Tekst → drzewo wyrażenia.
 * opcje.funkcje – litery funkcji zdefiniowanych przez użytkownika (np. Set(["f"])), żeby f(2) nie było mnożeniem f·2.
 */
export function parsuj(tekst, opcje = {}) {
  const t = tokeny(tekst);
  if (!t.length) throw new BladWyrazenia("Wpisz wyrażenie.");
  const p = new Parser(t, tekst, opcje);
  const drzewo = p.wyrazenie();
  if (p.i < t.length) {
    const z = t[p.i];
    if (z.typ === "znak" && z.v === ")") throw new BladWyrazenia("Za dużo nawiasów zamykających „)”.");
    if (z.typ === "znak" && z.v === "|") throw new BladWyrazenia("Kreski „|” nie tworzą pary.");
    throw new BladWyrazenia(`Nie rozumiem fragmentu „${String(tekst).slice(z.poz, z.poz + 8).trim()}”.`);
  }
  return drzewo;
}

/** Potęga z liczbą ujemną pod pierwiastkiem nieparzystego stopnia: (−8)^(1/3) = −2. */
function potega(a, b) {
  if (a >= 0 || Number.isInteger(b)) return a ** b;
  for (let q = 3; q <= 15; q += 2) {
    const p = Math.round(b * q);
    if (Math.abs(b - p / q) < 1e-12) return (p % 2 === 0 ? 1 : -1) * Math.abs(a) ** b;
  }
  return NaN;
}

function silnia(n) {
  if (!Number.isInteger(n) || n < 0 || n > 170) return NaN;
  let w = 1;
  for (let i = 2; i <= n; i++) w *= i;
  return w;
}

/**
 * Drzewo → funkcja (stan) => liczba. Stan: { x: 2, a: 1, Ans: 5, funkcje: { f: (x) => … } }.
 * opcje.stopnie – sin, cos, tg i ctg biorą kąt w stopniach (arc… zwracają stopnie).
 * Zwraca { fn, zmienne }: zmienne to litery użyte w wyrażeniu (bez stałych i nazw funkcji).
 */
export function kompiluj(drzewo, { stopnie = false } = {}) {
  const k = stopnie ? Math.PI / 180 : 1;
  const zmienne = new Set();
  const wywolania = new Set();
  const tryg = (g) => (v) => {
    const r = g(v * k);
    return Math.abs(r) < 1e-15 ? 0 : r;
  };
  const tg = (v) => {
    if (stopnie && Math.abs(((v % 180) + 180) % 180 - 90) < 1e-12) return NaN;   // tg 90° nie istnieje
    const c = Math.cos(v * k);
    return Math.abs(c) < 1e-15 ? NaN : Math.sin(v * k) / c;
  };
  const ctg = (v) => {
    if (stopnie && Math.abs(((v % 180) + 180) % 180) < 1e-12) return NaN;
    const s = Math.sin(v * k);
    return Math.abs(s) < 1e-15 ? NaN : Math.cos(v * k) / s;
  };
  const arc = (g) => (v) => g(v) / k;
  const F = {
    sin: tryg(Math.sin), cos: tryg(Math.cos), tg, tan: tg, ctg, cot: ctg,
    arcsin: arc(Math.asin), arccos: arc(Math.acos), arctg: arc(Math.atan), arctan: arc(Math.atan),
    sqrt: (v) => (v < 0 ? NaN : Math.sqrt(v)), pierw: (v) => (v < 0 ? NaN : Math.sqrt(v)), cbrt: Math.cbrt,
    abs: Math.abs, ln: (v) => (v <= 0 ? NaN : Math.log(v)), log: (v) => (v <= 0 ? NaN : Math.log10(v)), exp: Math.exp,
  };
  const zbuduj = (w) => {
    switch (w.t) {
      case "liczba": { const v = w.v; return () => v; }
      case "zmienna": { const n = w.n; zmienne.add(n); return (s) => (n in s ? s[n] : NaN); }
      case "neg": { const a = zbuduj(w.a); return (s) => -a(s); }
      case "silnia": { const a = zbuduj(w.a); return (s) => silnia(a(s)); }
      case "procent": { const a = zbuduj(w.a); return (s) => a(s) / 100; }
      case "op": {
        const a = zbuduj(w.a), b = zbuduj(w.b);
        if (w.o === "+") return (s) => a(s) + b(s);
        if (w.o === "-") return (s) => a(s) - b(s);
        if (w.o === "*") return (s) => a(s) * b(s);
        if (w.o === "/") return (s) => { const m = b(s); return m === 0 ? NaN : a(s) / m; };
        return (s) => potega(a(s), b(s));
      }
      case "fn": {
        const a = zbuduj(w.a), g = F[w.f];
        if (w.baza) {
          const b = zbuduj(w.baza);
          return (s) => { const v = a(s), p = b(s); return v <= 0 || p <= 0 || p === 1 ? NaN : Math.log(v) / Math.log(p); };
        }
        return (s) => g(a(s));
      }
      case "wywolanie": {
        const a = zbuduj(w.a), f = w.f;
        wywolania.add(f);
        return (s) => { const g = s.funkcje?.[f]; return g ? g(a(s)) : NaN; };
      }
      default: throw new BladWyrazenia("Nieznany element wyrażenia.");
    }
  };
  const fn = zbuduj(drzewo);
  return { fn, zmienne, wywolania };
}

/** Skrót: tekst → liczba (dla kalkulatora). Rzuca BladWyrazenia przy błędzie zapisu albo nieznanej literze. */
export function oblicz(tekst, { stopnie = false, zmienne = {} } = {}) {
  const { fn, zmienne: uzyte } = kompiluj(parsuj(tekst, { zmienne: new Set(Object.keys(zmienne)) }), { stopnie });
  for (const n of uzyte) if (!(n in zmienne)) throw new BladWyrazenia(`Kalkulator nie zna litery „${n}”.`);
  return fn(zmienne);
}

const POTEGI = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };

/** Liczba po polsku: przecinek dziesiętny, minus „−”, bardzo duże i małe w zapisie 1,5·10⁻⁷. Null dla NaN/∞. */
export function formatuj(v, cyfry = 10) {
  if (!Number.isFinite(v)) return null;
  if (Math.abs(v) < 1e-12) return "0";
  const a = Math.abs(v);
  let s;
  if (a >= 1e12 || a < 1e-6) {
    const [m, e] = v.toExponential(cyfry - 1).split("e");
    const mant = String(Number(m));
    s = `${mant === "1" ? "1" : mant === "-1" ? "-1" : mant}·10${String(Number(e)).replace(/[-0-9]/g, (c) => POTEGI[c])}`;
  } else {
    s = String(Number(v.toPrecision(cyfry)));
    if (/e/.test(s)) s = Number(s).toFixed(12).replace(/0+$/, "").replace(/\.$/, "");
  }
  return s.replace("-", "−").replace(".", ",");
}

/** Ułamek zwykły bliski liczbie (mianownik ≤ maks), np. 0,333… → [1, 3]. Null dla liczb całkowitych i niewymiernych. */
export function ulamek(v, maks = 1000) {
  if (!Number.isFinite(v) || Number.isInteger(v) || Math.abs(v) >= 1e6) return null;
  let h1 = 1, h0 = 0, k1 = 0, k0 = 1, x = Math.abs(v);
  for (let i = 0; i < 25; i++) {
    const a = Math.floor(x);
    [h1, h0] = [a * h1 + h0, h1];
    [k1, k0] = [a * k1 + k0, k1];
    if (k1 > maks) return null;
    if (Math.abs(Math.abs(v) - h1 / k1) < 1e-10 * Math.max(1, Math.abs(v))) return k1 === 1 ? null : [Math.sign(v) * h1, k1];
    const r = x - a;
    if (r < 1e-12) return null;
    x = 1 / r;
  }
  return null;
}
