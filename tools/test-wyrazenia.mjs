// Test parsera wyrażeń kalkulatora i kalkulatora graficznego (assets/wyrazenia.js).
// Użycie (w folderze repozytorium): node tools/test-wyrazenia.mjs
import { oblicz, parsuj, kompiluj, formatuj, ulamek, BladWyrazenia } from "../assets/wyrazenia.js";

let bledy = 0;
const zle = (msg) => { bledy++; console.log(`  BŁĄD ${msg}`); };
const blisko = (a, b) => Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(b));

const WARTOSCI = [
  ["2+3*4", 14], ["2+3·4", 14], ["(2+3)×4", 20], ["2(3+4)", 14], ["10:4", 2.5], ["10÷4", 2.5], ["7/2", 3.5],
  ["2,5+0,5", 3], ["2.5*2", 5], ["−3+5", 2], ["-2^2", -4], ["(-2)^2", 4], ["2^-1", 0.5], ["2^3^2", 512],
  ["3²", 9], ["2³", 8], ["√16", 4], ["√(9+16)", 5], ["2√9", 6], ["|−7|", 7], ["|2-5|+|1|", 4], ["2|−3|", 6],
  ["5!", 120], ["0!", 1], ["20%·50", 10], ["50%", 0.5], ["2π", 2 * Math.PI], ["pi", Math.PI], ["e", Math.E],
  ["log(1000)", 3], ["log 100", 2], ["log_2(8)", 3], ["log_3 81", 4], ["ln(e)", 1], ["ln e^2", 2], ["exp(0)", 1],
  ["(-8)^(1/3)", -2], ["27^(1/3)", 3], ["16^0,5", 4], ["cbrt(-27)", -3], ["sqrt(2)^2", 2],
  ["sin(30)", 0.5, { stopnie: true }], ["cos 60", 0.5, { stopnie: true }], ["tg(45)", 1, { stopnie: true }],
  ["ctg(45)", 1, { stopnie: true }], ["sin(180)", 0, { stopnie: true }], ["arcsin(0,5)", 30, { stopnie: true }],
  ["sin(pi/6)", 0.5], ["cos(π)", -1], ["tan(pi/4)", 1], ["sin(30)^2+cos(30)^2", 1, { stopnie: true }],
  ["2x+1", 7, { zmienne: { x: 3 } }], ["x^2-2x-3", 0, { zmienne: { x: 3 } }], ["3(x-1)(x+2)", 12, { zmienne: { x: 2 } }],
  ["a·x²+b", 13, { zmienne: { a: 3, x: 2, b: 1 } }], ["Ans·2", 10, { zmienne: { Ans: 5 } }], ["xsin(x)", 0, { zmienne: { x: 0 } }],
  ["2(x+1)^2", 18, { zmienne: { x: 2 } }], ["1/2x", 2, { zmienne: { x: 4 } }],
];
for (const [w, oczek, o] of WARTOSCI) {
  try {
    const v = oblicz(w, o);
    if (!blisko(v, oczek)) zle(`${w} = ${v}, a powinno być ${oczek}`);
  } catch (e) { zle(`${w}: ${e.message}`); }
}

const NIE_ISTNIEJE = [["tg(90)", { stopnie: true }], ["√(-4)", {}], ["log(0)", {}], ["1/0", {}], ["(-8)^0,5", {}], ["2,5!", {}]];
for (const [w, o] of NIE_ISTNIEJE) {
  try { const v = oblicz(w, o); if (Number.isFinite(v)) zle(`${w} powinno nie istnieć, a wyszło ${v}`); }
  catch (e) { zle(`${w}: ${e.message}`); }
}

const BLEDNE = ["", "2+", "(2+3", "2+3)", "3·", "*3", "2#3", "|x", "sin", "2^"];
for (const w of BLEDNE) {
  try { oblicz(w, { zmienne: { x: 1 } }); zle(`„${w}” powinno dać błąd zapisu`); }
  catch (e) { if (!(e instanceof BladWyrazenia)) zle(`„${w}”: zły rodzaj błędu ${e}`); }
}
try { oblicz("2y"); zle("nieznana litera powinna dać błąd"); } catch (e) { if (!(e instanceof BladWyrazenia)) zle(`nieznana litera: ${e}`); }

// funkcje użytkownika w kalkulatorze graficznym: f(2), gdy f jest zdefiniowana; bez definicji a(x+1) to mnożenie
{
  const f = kompiluj(parsuj("x^2+1")).fn;
  const g = kompiluj(parsuj("f(x)+f(2)", { funkcje: new Set(["f"]) })).fn;
  const v = g({ x: 1, funkcje: { f: (t) => f({ x: t }) } });
  if (v !== 7) zle(`f(x)+f(2) dla f(x)=x²+1 i x=1: ${v}, a powinno być 7`);
  const h = kompiluj(parsuj("a(x+1)")).fn({ a: 2, x: 3 });
  if (h !== 8) zle(`a(x+1) dla a=2, x=3: ${h}, a powinno być 8`);
  const z = kompiluj(parsuj("a x^2 + b x + c")).zmienne;
  if ([...z].sort().join() !== "a,b,c,x") zle(`zmienne w a x² + b x + c: ${[...z]}`);
}

const FORMAT = [[0.1 + 0.2, "0,3"], [1 / 3, "0,3333333333"], [-2.5, "−2,5"], [1e15, "1·10¹⁵"], [-3.2e-8, "−3,2·10⁻⁸"], [1234567, "1234567"], [2 / 3, "0,6666666667"], [1e-13, "0"]];
for (const [v, oczek] of FORMAT) { const s = formatuj(v); if (s !== oczek) zle(`formatuj(${v}) = ${s}, a powinno być ${oczek}`); }
if (formatuj(NaN) !== null || formatuj(Infinity) !== null) zle("formatuj(NaN/∞) powinno dać null");

const ULAMKI = [[1 / 3, "1/3"], [0.75, "3/4"], [-5 / 8, "-5/8"], [Math.PI, null], [2, null], [Math.SQRT2, null], [7 / 12, "7/12"]];
for (const [v, oczek] of ULAMKI) { const u = ulamek(v); const s = u ? `${u[0]}/${u[1]}` : null; if (s !== oczek) zle(`ulamek(${v}) = ${s}, a powinno być ${oczek}`); }

console.log(bledy ? `\nBłędów: ${bledy}` : `Wszystko w porządku (${WARTOSCI.length + NIE_ISTNIEJE.length + BLEDNE.length} wyrażeń).`);
process.exit(bledy ? 1 : 0);
