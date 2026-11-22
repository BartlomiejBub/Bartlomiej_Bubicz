// Test zamiany wzorów TeX na wiersze kalkulatora graficznego (assets/tex-wykres.js): node tools/test-tex-wykres.mjs
import { wierszeZTex } from "../assets/tex-wykres.js";

const PRZYPADKI = [
  ["f(x)=2x-3", ["y = 2x-3"]],
  ["y=\\frac{3}{4}x", ["y = ((3)/(4))x"]],
  ["y=ax", ["y = ax", "a = 1"]],
  ["f(x)=a(x-p)^2+q", ["y = a(x-p)^(2)+q", "a = 1", "p = 1", "q = 1"]],
  ["g(x)=\\sqrt{x+1}", ["y = √(x+1)"]],
  ["f(x)=\\left|x-1\\right|", ["y = |x-1|"]],
  ["x+y=4", ["x+y = 4"]],
  ["2x-3y=6", ["2x-3y = 6"]],
  ["x^2+y^2=9", ["x^(2)+y^(2) = 9"]],
  ["\\begin{cases} x+y=4 \\\\ 2x-y=5 \\end{cases}", ["x+y = 4", "2x-y = 5"]],
  ["f(x)=2{,}5x+1", ["y = 2,5x+1"]],
  ["f(x)=ax+b\\qquad(0,b)", ["y = ax+b", "a = 1", "b = 1"]],
  ["y=\\operatorname{tg}x", ["y = tg x"]],
  ["f(x)=x^2-2x-3", ["y = x^(2)-2x-3"]],
  ["y=10", null],
  ["f(x)=5", ["y = 5"]],
  ["f(x)=\\log_{2}x", ["y = log_2 x"]],
  ["y=\\log_2(x+1)", ["y = log_2 (x+1)"]],
  ["y=\\sin x", ["y = sin x"]],
  ["y=-\\frac{1}{2}x+4", ["y = -((1)/(2))x+4"]],
  ["f(x)=\\dfrac{2}{x-1}+3", ["y = ((2)/(x-1))+3"]],
  // nie są wykresami
  ["2x+1=5", null],
  ["x_1=\\frac{-b-\\sqrt{\\Delta}}{2a}", null],
  ["a=\\frac{y_2-y_1}{x_2-x_1}", null],
  ["ax+b>0", null],
  ["f(x)>0\\qquad f(x)<0", null],
  ["x^2-5x+6=0", null],
  ["\\Delta=b^2-4ac", null],
  ["y=x\\cdot\\alpha", null],
];

let bledy = 0;
for (const [tex, oczekiwane] of PRZYPADKI) {
  const wynik = wierszeZTex(tex);
  const ok = JSON.stringify(wynik) === JSON.stringify(oczekiwane);
  if (!ok) { bledy++; console.log(`ŹLE  ${tex}\n     jest:      ${JSON.stringify(wynik)}\n     oczekiwane: ${JSON.stringify(oczekiwane)}`); }
}
console.log(bledy ? `Błędów: ${bledy}` : `Wszystko w porządku (${PRZYPADKI.length} wzorów).`);
process.exitCode = bledy ? 1 : 0;
