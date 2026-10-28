// Wspólne narzędzia generatorów zadań: losowanie z ziarnem, ułamki, zapis LaTeX i sprawdzanie odpowiedzi.
//
// Kontrakt generatora (pliki w tym folderze, np. liczby.js):
//
//   export const GENERATORY = [{ id, nazwa, opis, generuj(r) }, ...]
//
//   generuj(r) dostaje losownik r (zob. losownik()) i zwraca zadanie. Ten sam losownik (to samo ziarno)
//   musi dać to samo zadanie – karty pracy są dzięki temu powtarzalne. Nie używaj Math.random().
//   {
//     tresc: "Rozwiąż nierówność $x^2 - 4 < 0$.",   // tekst; matematyka w $…$ (składnia KaTeX); akapity rozdziela "\n\n"
//     pola: [ ...pola odpowiedzi ],                 // co uczeń wpisuje (niżej)
//     odpowiedz: { [id pola]: wartość },            // poprawne wartości do automatycznego sprawdzenia
//     wynik: "$x \\in (-2, 2)$",                    // odpowiedź do pokazania (np. w kluczu karty pracy)
//     rozwiazanie: ["krok 1", "krok 2"],            // krótkie rozwiązanie krok po kroku, matematyka w $…$
//   }
//
//   Rodzaje pól:
//     { id, typ: "liczba", etykieta: "$x =$" }                         odpowiedz[id]: Q, liczba całkowita albo tekst "3/2"
//     { id, typ: "zbior", ile: 3, etykieta: "Rozwiązania równania" }  odpowiedz[id]: tablica wartości jak wyżej, kolejność dowolna
//     { id, typ: "wybor", etykieta: "Zbiór rozwiązań", opcje: ["$(a, b)$", ...] }   odpowiedz[id]: indeks właściwej opcji

// --- Losowanie z ziarnem (mulberry32)

export function losownik(seed) {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const r = {
    next,
    /** Liczba całkowita z przedziału [min, max]. */
    int: (min, max) => min + Math.floor(next() * (max - min + 1)),
    /** Liczba całkowita z [min, max] różna od podanych (np. intBez(-5, 5, 0)). */
    intBez(min, max, ...bez) {
      for (;;) {
        const x = r.int(min, max);
        if (!bez.includes(x)) return x;
      }
    },
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    shuffle(arr) {
      const out = [...arr];
      for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
      }
      return out;
    },
    chance: (p = 0.5) => next() < p,
    znak: () => (next() < 0.5 ? -1 : 1),
  };
  return r;
}

/** Ziarno z tekstu (FNV-1a), np. ziarno("liczby/karta/3"). */
export function ziarno(tekst) {
  let h = 0x811c9dc5;
  for (const ch of String(tekst)) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// --- Ułamki zwykłe

function nwd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export class Q {
  constructor(n, d = 1) {
    if (!Number.isSafeInteger(n) || !Number.isSafeInteger(d) || d === 0) {
      throw new Error(`Niepoprawny ułamek: ${n}/${d}`);
    }
    if (d < 0) [n, d] = [-n, -d];
    const g = nwd(n, d) || 1;
    this.n = n / g + 0;   // + 0 zamienia -0 na 0
    this.d = d / g;
  }
  /** Q z ułamka, liczby całkowitej albo tekstu ("3/2", "-1,5"). */
  static z(x) {
    if (x instanceof Q) return x;
    if (typeof x === "number") {
      if (Number.isInteger(x)) return new Q(x);
      throw new Error(`Użyj Q zamiast liczby niecałkowitej: ${x}`);
    }
    const q = czytajLiczbe(x);
    if (!q) throw new Error(`Nie umiem odczytać liczby: ${x}`);
    return q;
  }
  add(o) { o = Q.z(o); return new Q(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = Q.z(o); return new Q(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = Q.z(o); return new Q(this.n * o.n, this.d * o.d); }
  div(o) { o = Q.z(o); return new Q(this.n * o.d, this.d * o.n); }
  neg() { return new Q(-this.n, this.d); }
  pow(k) { let w = new Q(1); for (let i = 0; i < Math.abs(k); i++) w = w.mul(this); return k < 0 ? new Q(1).div(w) : w; }
  eq(o) { o = Q.z(o); return this.n === o.n && this.d === o.d; }
  cmp(o) { o = Q.z(o); return Math.sign(this.n * o.d - o.n * this.d); }
  get calkowita() { return this.d === 1; }
  get ujemna() { return this.n < 0; }
  get zero() { return this.n === 0; }
  valueOf() { return this.n / this.d; }
  /** Zapis do wpisania w pole: "3/2", "-3/2", "4". */
  toString() { return this.d === 1 ? String(this.n) : `${this.n}/${this.d}`; }
  /** Zapis LaTeX: "\frac{3}{2}", "-\frac{3}{2}", "4". */
  tex() {
    if (this.d === 1) return String(this.n);
    return `${this.n < 0 ? "-" : ""}\\frac{${Math.abs(this.n)}}{${this.d}}`;
  }
}

/** Skrót: q(3, 2) to 3/2, q(5) to 5. */
export const q = (n, d = 1) => new Q(n, d);

// --- Zapis LaTeX

/** Liczba w LaTeX, ujemna w nawiasie – tak jak w arkuszach CKE: (-3), \left(-\frac{1}{2}\right). */
export function texNawias(x) {
  const v = Q.z(x);
  if (!v.ujemna) return v.tex();
  return v.calkowita ? `(${v.tex()})` : `\\left(${v.tex()}\\right)`;
}

/**
 * Wielomian w LaTeX ze współczynników od najwyższej potęgi, np.
 * wielomianTex([3, -2, -12, 8]) -> "3x^3 - 2x^2 - 12x + 8", wielomianTex([1, 0, q(-1, 4)]) -> "x^2 - \frac{1}{4}".
 */
export function wielomianTex(wsp, zmienna = "x") {
  const st = wsp.length - 1;
  const czesci = [];
  wsp.forEach((w, i) => {
    const a = Q.z(w);
    if (a.zero) return;
    const potega = st - i;
    const abs = a.ujemna ? a.neg() : a;
    const lit = potega === 0 ? "" : potega === 1 ? zmienna : `${zmienna}^{${potega}}`;
    const liczba = potega !== 0 && abs.eq(1) ? "" : abs.tex();
    const znak = a.ujemna ? "-" : "+";
    czesci.push(czesci.length === 0 ? `${a.ujemna ? "-" : ""}${liczba}${lit}` : ` ${znak} ${liczba}${lit}`);
  });
  return czesci.length ? czesci.join("") : "0";
}

/** Składnik z liczbą do doklejenia po innym: "+ 3", "- 3" (np. `x ${plusMinus(b)}` daje "x - 3"). */
export function plusMinus(x) {
  const v = Q.z(x);
  return v.ujemna ? `- ${v.neg().tex()}` : `+ ${v.tex()}`;
}

/** (x - p) w LaTeX, z poprawnym znakiem: nawiasMinus(-3) -> "(x + 3)", nawiasMinus(0) -> "x". */
export function nawiasMinus(p, zmienna = "x") {
  const v = Q.z(p);
  if (v.zero) return zmienna;
  return `(${zmienna} ${plusMinus(v.neg())})`;
}

/** Liczba z odstępami tysięcy do tekstu: 10000 -> "10 000" (twarda spacja). */
export function tysiace(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// --- Odpowiedzi ucznia

/**
 * Odczytuje liczbę wpisaną przez ucznia. Przyjmuje: 3, -3, −3, +3, 1,5, 1.5, ,5, 3/2, -3/2, 1,5/2.
 * Zwraca Q albo null, gdy tekstu nie da się odczytać.
 */
export function czytajLiczbe(tekst) {
  const s = String(tekst ?? "")
    .replace(/\s+/g, "")
    .replace(/[−–—]/g, "-")
    .replace(/,/g, ".");
  const m = s.match(/^([+-]?)(\d+(?:\.\d*)?|\.\d+)(?:\/(\d+(?:\.\d*)?|\.\d+))?$/);
  if (!m) return null;
  const ulamek = (txt) => {
    const [cal, dz = ""] = txt.split(".");
    return new Q(Number(cal || "0") * 10 ** dz.length + Number(dz || "0"), 10 ** dz.length);
  };
  try {
    let v = ulamek(m[2]);
    if (m[3] !== undefined) {
      const mian = ulamek(m[3]);
      if (mian.zero) return null;
      v = v.div(mian);
    }
    return m[1] === "-" ? v.neg() : v;
  } catch {
    return null;
  }
}

/**
 * Sprawdza odpowiedzi ucznia. wpisane: { [id pola]: tekst | tablica tekstów (zbior) | indeks (wybor) }.
 * Zwraca { poprawne, pola: { [id]: true | false | null } } – null, gdy pole jest puste albo nieczytelne.
 */
export function sprawdz(zadanie, wpisane) {
  const pola = {};
  for (const pole of zadanie.pola) {
    const oczekiwane = zadanie.odpowiedz[pole.id];
    const dane = wpisane[pole.id];
    if (pole.typ === "liczba") {
      const v = czytajLiczbe(dane);
      pola[pole.id] = v ? v.eq(Q.z(oczekiwane)) : null;
    } else if (pole.typ === "zbior") {
      const v = (dane ?? []).map(czytajLiczbe);
      if (v.length !== oczekiwane.length || v.some((x) => !x)) {
        pola[pole.id] = null;
      } else {
        const reszta = oczekiwane.map((x) => Q.z(x));
        pola[pole.id] = v.every((x) => {
          const i = reszta.findIndex((y) => y.eq(x));
          if (i < 0) return false;
          reszta.splice(i, 1);
          return true;
        });
      }
    } else if (pole.typ === "wybor") {
      pola[pole.id] = dane === undefined || dane === null || dane === "" ? null : Number(dane) === oczekiwane;
    }
  }
  return { poprawne: Object.values(pola).every((x) => x === true), pola };
}

/** Dzieli tekst na zwykły tekst i matematykę: "Oblicz $x^2$." -> [{tex:false,s:"Oblicz "},{tex:true,s:"x^2"},{tex:false,s:"."}]. */
export function czesciTekstu(tekst) {
  return String(tekst)
    .split("$")
    .map((s, i) => ({ tex: i % 2 === 1, s }))
    .filter((c) => c.s !== "");
}
