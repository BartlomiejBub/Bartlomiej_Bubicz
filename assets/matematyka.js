// Wyświetlanie tekstu ze wzorami: matematyka w $…$ rysowana przez KaTeX (ładowany w <head> strony).
// Akapity rozdziela "\n\n". Akapit z samym wzorem $…$ jest wzorem wyśrodkowanym, akapit [rysunek] – rysunkiem,
// a **tekst** jest pogrubiony (jak polecenia w arkuszach CKE). Akapit z samych wierszy „| a | b |” jest tabelką
// (wiersz „|---|---|” po pierwszym oddziela nagłówek); na telefonie mieszczą się 2–3 wąskie kolumny.
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

/** Tabelka z wierszy „| a | b |”; drugi wiersz „|---|---|” oznacza, że pierwszy jest nagłówkiem. */
function tabela(wiersze) {
  const komorki = (w) => w.trim().slice(1, -1).split("|").map((k) => k.trim());
  const naglowek = wiersze.length > 1 && /^\|[\s:|-]+\|$/.test(wiersze[1].trim());
  const tresc = wiersze.filter((_, i) => !(naglowek && i === 1));
  const wiersz = (w, tag) => `<tr>${komorki(w).map((k) => `<${tag}>${htmlWzorow(k)}</${tag}>`).join("")}</tr>`;
  return `<table class="tabela">${naglowek ? `<thead>${wiersz(tresc[0], "th")}</thead>` : ""}<tbody>${tresc
    .slice(naglowek ? 1 : 0)
    .map((w) => wiersz(w, "td"))
    .join("")}</tbody></table>`;
}

function akapit(p, rysunek) {
  const s = p.trim();
  if (s === "[rysunek]") {
    return rysunek ? `<figure class="rysunek"><img src="${escape(rysunek)}" alt="Rysunek do zadania" loading="lazy"></figure>` : "";
  }
  if (/^\$[^$]+\$$/.test(s)) return `<div class="wzor">${wzor(s.slice(1, -1), true)}</div>`;
  const wiersze = s.split("\n");
  if (wiersze.every((w) => /^\|.*\|$/.test(w.trim()))) return tabela(wiersze);
  return `<p>${htmlWzorow(p)}</p>`;
}

/** Wstawia tekst ze wzorami do elementu. rysunek: adres obrazka dla akapitu [rysunek]. */
export function wstaw(el, t, { akapity = true, rysunek = null } = {}) {
  el.innerHTML = akapity ? String(t).split(/\n{2,}/).map((p) => akapit(p, rysunek)).join("") : htmlWzorow(t);
  return el;
}
