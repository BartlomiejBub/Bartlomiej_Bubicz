// Wyświetlanie tekstu ze wzorami: matematyka w $…$ rysowana przez KaTeX (ładowany w <head> strony).
// Akapity rozdziela "\n\n". Akapit z samym wzorem $…$ jest wzorem wyśrodkowanym, akapit [rysunek] – rysunkiem,
// a **tekst** jest pogrubiony (jak polecenia w arkuszach CKE).
import { czesciTekstu } from "./generatory/wspolne.js";

const escape = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function wzor(tex, display = false) {
  if (!window.katex) return `<code>${escape(tex)}</code>`;
  return window.katex.renderToString(tex, { throwOnError: false, displayMode: display });
}

const tekst = (s) => escape(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

/** HTML jednej linii tekstu ze wzorami (bez akapitów). */
export function htmlWzorow(t) {
  return czesciTekstu(t).map((c) => (c.tex ? wzor(c.s) : tekst(c.s))).join("");
}

function akapit(p, rysunek) {
  const s = p.trim();
  if (s === "[rysunek]") {
    return rysunek ? `<figure class="rysunek"><img src="${escape(rysunek)}" alt="Rysunek do zadania" loading="lazy"></figure>` : "";
  }
  if (/^\$[^$]+\$$/.test(s)) return `<div class="wzor">${wzor(s.slice(1, -1), true)}</div>`;
  return `<p>${htmlWzorow(p)}</p>`;
}

/** Wstawia tekst ze wzorami do elementu. rysunek: adres obrazka dla akapitu [rysunek]. */
export function wstaw(el, t, { akapity = true, rysunek = null } = {}) {
  el.innerHTML = akapity ? String(t).split(/\n{2,}/).map((p) => akapit(p, rysunek)).join("") : htmlWzorow(t);
  return el;
}
