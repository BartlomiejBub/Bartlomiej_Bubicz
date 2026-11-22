// Motyw strony: jasny (domyślny) albo ciemny – przełącznik w nagłówku, wybór zapamiętany w przeglądarce.
// Zwykły skrypt w <head> (nie moduł), żeby ustawić motyw przed narysowaniem strony – bez mignięcia jasnego tła.
(() => {
  const KLUCZ = "motyw";
  const html = document.documentElement;
  const przyciski = [];

  const czytaj = () => { try { return localStorage.getItem(KLUCZ); } catch { return null; } };
  const ciemny = () => html.dataset.motyw === "ciemny";

  function zastosuj(naCiemny) {
    if (naCiemny === ciemny()) return;
    // bez płynnych przejść kolorów w chwili zmiany – inaczej przyciski przez moment mają kolory ze starego motywu
    html.classList.add("bez-przejsc");
    requestAnimationFrame(() => requestAnimationFrame(() => html.classList.remove("bez-przejsc")));
    if (naCiemny) html.dataset.motyw = "ciemny";
    else delete html.dataset.motyw;
    odswiez();
    window.dispatchEvent(new CustomEvent("motyw:zmiana", { detail: { ciemny: naCiemny } }));
  }

  const SVG = (sciezki) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${sciezki}</svg>`;
  const KSIEZYC = SVG('<path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/>');
  const SLONCE = SVG('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>');

  function odswiez() {
    for (const b of przyciski) {
      const opis = ciemny() ? "Włącz jasny motyw" : "Włącz ciemny motyw";
      b.innerHTML = `${ciemny() ? SLONCE : KSIEZYC}<span class="motyw-napis">${ciemny() ? "Jasny" : "Ciemny"}</span>`;
      b.setAttribute("aria-label", opis);
      b.title = opis;
    }
  }

  if (czytaj() === "ciemny") html.dataset.motyw = "ciemny";

  document.addEventListener("DOMContentLoaded", () => {
    for (const nav of document.querySelectorAll(".site-header .nav")) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "motyw-przycisk";
      b.addEventListener("click", () => {
        zastosuj(!ciemny());
        try { localStorage.setItem(KLUCZ, ciemny() ? "ciemny" : "jasny"); } catch { /* prywatne okno */ }
      });
      nav.append(b);
      przyciski.push(b);
    }
    odswiez();
  });

  // Zmiana w innej karcie przeglądarki
  window.addEventListener("storage", (e) => { if (e.key === KLUCZ) zastosuj(e.newValue === "ciemny"); });
})();
