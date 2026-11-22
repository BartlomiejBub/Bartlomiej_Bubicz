// Wzór z zadania albo karty (TeX) → wiersze kalkulatora graficznego. Dzięki temu każdą funkcję w treści
// („$f(x)=2x-3$”, „$y=\frac{1}{x}$”, „$2x+3y=6$”, układ równań w \begin{cases}) można kliknąć i zobaczyć na wykresie.
// Litery inne niż x i y (np. a, b w „y=ax+b”) dostają suwaki. Zwraca null, gdy wzór nie jest funkcją ani równaniem z y.
import { parsuj, kompiluj } from "./wyrazenia.js";

const FUNKCJE = { sin: "sin", cos: "cos", tg: "tg", tan: "tg", ctg: "ctg", cot: "ctg", ln: "ln", log: "log" };
const ODSTEPY = new Set([",", ";", ":", "!", " ", "quad", "displaystyle", "textstyle", "left", "right", "big", "Big"]);
const LITERY_SUWAKOW = /^[a-dg-wz]$/;   // bez e (stała), f (nazwa funkcji), x, y
const WARTOSCI_SUWAKOW = { a: "1", b: "1", c: "1", p: "1", q: "1", m: "1", k: "1" };

/** Grupa po poleceniu: {…}, polecenie \… albo jeden znak. Zwraca [treść, indeks za grupą]. */
function grupa(s, i) {
  while (s[i] === " ") i++;
  if (s[i] === "{") {
    let gl = 0;
    for (let j = i; j < s.length; j++) {
      if (s[j] === "\\") { j++; continue; }
      if (s[j] === "{") gl++;
      else if (s[j] === "}" && --gl === 0) return [s.slice(i + 1, j), j + 1];
    }
    throw new Error("nawias");
  }
  if (s[i] === "\\") {
    const m = /^\\([a-zA-Z]+|.)/.exec(s.slice(i));
    return [m[0], i + m[0].length];
  }
  if (i >= s.length) throw new Error("koniec");
  return [s[i], i + 1];
}

/** TeX → zapis parsera z wyrazenia.js. Rzuca błąd przy czymś, czego nie umiemy narysować. */
function zamien(s) {
  let out = "";
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === "\\") {
      const m = /^\\([a-zA-Z]+|.)/.exec(s.slice(i));
      const cmd = m[1];
      i += m[0].length;
      if (cmd === "frac" || cmd === "dfrac" || cmd === "tfrac") {
        const [a, j] = grupa(s, i);
        const [b, k] = grupa(s, j);
        out += `((${zamien(a)})/(${zamien(b)}))`;
        i = k;
      } else if (cmd === "sqrt") {
        if (s[i] === "[") throw new Error("pierwiastek stopnia n");
        const [a, j] = grupa(s, i);
        out += `√(${zamien(a)})`;
        i = j;
      } else if (cmd === "cdot" || cmd === "times") out += "·";
      else if (cmd === "div") out += ":";
      else if (cmd === "pi") out += "π";
      else if (cmd === "{") out += "(";
      else if (cmd === "}") out += ")";
      else if (cmd === "|") out += "|";
      else if (cmd === "operatorname") {
        const [a, j] = grupa(s, i);
        if (!FUNKCJE[a]) throw new Error(`funkcja ${a}`);
        out += ` ${FUNKCJE[a]} `;
        i = j;
      } else if (FUNKCJE[cmd]) {
        out += ` ${FUNKCJE[cmd]}`;
        if (cmd === "log" && s[i] === "_") {
          const [a, j] = grupa(s, i + 1);
          if (!/^\d+$/.test(a)) throw new Error("podstawa logarytmu");
          out += `_${a}`;
          i = j;
        }
        out += " ";
      } else if (!ODSTEPY.has(cmd)) throw new Error(`polecenie ${cmd}`);
    } else if (c === "^") {
      const [a, j] = grupa(s, i + 1);
      out += `^(${zamien(a)})`;
      i = j;
    } else if (c === "{") {
      const [a, j] = grupa(s, i);
      out += a === "," ? "," : `(${zamien(a)})`;
      i = j;
    } else if (c === "_" || c === "<" || c === ">" || c === "&" || c === "'") {
      throw new Error(`znak ${c}`);
    } else {
      out += c;
      i++;
    }
  }
  return out;
}

/** Zmienne wyrażenia (rzuca, gdy się nie da sparsować). */
const zmienne = (w) => kompiluj(parsuj(w)).zmienne;

/** Jedna część wzoru → wiersz kalkulatora i litery suwaków, albo null. */
function wiersz(tex) {
  const t = zamien(tex.replace(/\{,\}/g, ",")).replace(/\s+/g, " ").trim();
  const czesci = t.split("=");
  if (czesci.length !== 2) return null;
  const [lewa, prawa] = czesci.map((c) => c.trim());
  if (!lewa || !prawa) return null;
  const nazwa = /^[a-z]\s*\(\s*x\s*\)$/.test(lewa);
  if (nazwa || lewa === "y") {
    const z = zmienne(prawa);
    if (z.has("y")) return null;
    if (!nazwa && !z.has("x")) return null;   // „y = 2” w tekście to zwykle wartość, nie funkcja stała
    return { tekst: `y = ${prawa}`, litery: [...z].filter((n) => n !== "x") };
  }
  const z = new Set([...zmienne(lewa), ...zmienne(prawa)]);
  if (!z.has("y")) return null;   // równanie z samym x (np. 2x + 1 = 5) to nie wykres
  return { tekst: `${lewa} = ${prawa}`, litery: [...z].filter((n) => n !== "x" && n !== "y") };
}

/** TeX → lista wierszy kalkulatora (z suwakami na końcu) albo null. */
export function wierszeZTex(tex) {
  if (!tex.includes("=") || !/[xy]/.test(tex)) return null;
  let s = tex.trim();
  const uklad = /^\\begin\{cases\}([\s\S]*)\\end\{cases\}$/.exec(s);
  const czesci = uklad ? uklad[1].split(/\\\\/) : s.split(/\\qquad|\\quad/);
  const wiersze = [];
  const litery = new Set();
  for (const c of czesci) {
    if (!c.trim()) continue;
    let w = null;
    try { w = wiersz(c); } catch { w = null; }
    if (!w) {
      if (uklad) return null;   // w układzie każde równanie musi dać się narysować
      continue;
    }
    if (w.litery.some((l) => !LITERY_SUWAKOW.test(l))) return null;
    wiersze.push(w.tekst);
    for (const l of w.litery) litery.add(l);
  }
  if (!wiersze.length) return null;
  return [...wiersze, ...[...litery].map((l) => `${l} = ${WARTOSCI_SUWAKOW[l] ?? "1"}`)];
}
