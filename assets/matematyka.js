// Wyświetlanie tekstu ze wzorami: matematyka w $…$ rysowana przez KaTeX (ładowany w <head> strony).
import { czesciTekstu } from "./generatory/wspolne.js";

const escape = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function wzor(tex) {
  if (!window.katex) return `<code>${escape(tex)}</code>`;
  return window.katex.renderToString(tex, { throwOnError: false });
}

/** HTML jednej linii tekstu ze wzorami (bez akapitów). */
export function htmlWzorow(tekst) {
  return czesciTekstu(tekst).map((c) => (c.tex ? wzor(c.s) : escape(c.s))).join("");
}

/** Wstawia tekst ze wzorami do elementu; "\n\n" w tekście rozdziela akapity. */
export function wstaw(el, tekst, { akapity = true } = {}) {
  el.innerHTML = akapity
    ? String(tekst).split(/\n{2,}/).map((p) => `<p>${htmlWzorow(p)}</p>`).join("")
    : htmlWzorow(tekst);
  return el;
}
