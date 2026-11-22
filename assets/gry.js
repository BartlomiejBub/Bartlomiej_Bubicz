// Strona gier: gry.html – lista gier, gry.html?gra=<id> – jedna gra (moduł assets/gry/<id>.js, funkcja uruchom).
import { el } from "./dom.js";
import { gra, kafelkiGier } from "./gry/lista.js";

const strona = document.getElementById("gry");
const g = gra(new URLSearchParams(location.search).get("gra"));

if (!g) {
  strona.replaceChildren(
    el("section", { class: "hero hero-compact" },
      el("p", { class: "eyebrow" }, "Matematyka · szkoła podstawowa"),
      el("h1", {}, "Gry matematyczne"),
      el("p", { class: "lead" }, "Krótkie gry na kilka minut. Każda ćwiczy jedną rzecz, a przy pomyłce pokazuje, jak powinno być.")),
    kafelkiGier(),
    el("p", { class: "gry-powrot" }, el("a", { href: "korepetycje.html#e8-gry" }, "← Wróć do korepetycji")),
  );
} else {
  document.title = `${g.nazwa} – gry matematyczne`;
  const plansza = el("div", { class: "gra", "data-gra": g.id, style: `--gra-kolor: ${g.kolor}` },
    el("p", { class: "muted" }, "Wczytuję grę…"));
  strona.replaceChildren(
    el("nav", { class: "gry-okruszki", "aria-label": "Gdzie jesteś" },
      el("a", { href: "gry.html" }, "← Wszystkie gry")),
    el("header", { class: "gra-naglowek" },
      el("h1", {}, g.nazwa),
      el("p", { class: "gra-uczy" }, `Ćwiczysz: ${g.uczy} · ${g.klasy}`)),
    plansza,
  );
  try {
    const modul = await import(`./gry/${g.id}.js`);
    plansza.replaceChildren();
    modul.uruchom(plansza);
  } catch (e) {
    console.error(e);
    plansza.replaceChildren(el("div", { class: "empty" }, el("strong", {}, "Nie udało się wczytać gry"), el("p", {}, "Odśwież stronę i spróbuj jeszcze raz.")));
  }
}
