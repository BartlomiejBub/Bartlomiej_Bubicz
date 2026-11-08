// Karta pracy do druku: karta.html?dzial=liczby&nr=2 (stała) albo ?dzial=liczby&ziarno=123 (wylosowana);
// zamiast działu może być rozdział z widoku „Do szkoły”: karta.html?rozdzial=sp5-ulamki&nr=1.
import { el } from "./dom.js";
import { zalogowany, ma, dostepUcznia } from "./dostep.js";
import { dzial as znajdzDzial, rozdzial as znajdzRozdzial, dzialRozdzialu, egzamin, zadaniaKarty, KARTY } from "./dzialy.js";
import { wstaw } from "./matematyka.js";

const parametry = new URLSearchParams(location.search);
const uczen = zalogowany();
const r = znajdzRozdzial(parametry.get("rozdzial"));
const d = r ? dzialRozdzialu(r.klasa, r.rozdzial, dostepUcznia(uczen)) : znajdzDzial(parametry.get("dzial"));
const skad = r ? `rozdzial=${d.id}` : `dzial=${d?.id}`;
const podpis = r ? `klasa ${r.klasa.nazwa.replace(/^Klasa /, "")}, ${r.klasa.egzamin === "e8" ? "szkoła podstawowa" : "liceum"}` : egzamin(d?.egzamin).opis;
const nr = Number(parametry.get("nr")) || 0;
const ziarno = parametry.get("ziarno") ?? "";
const karta = document.getElementById("karta");
const narzedzia = document.getElementById("narzedzia");

function komunikat(tytul, tekst) {
  for (const b of narzedzia.querySelectorAll("button, #nowa")) b.hidden = true;
  karta.replaceChildren(
    el("div", { class: "empty" },
      el("strong", {}, tytul),
      el("p", {}, tekst, " ", el("a", { href: d?.egzamin === "e8" ? "korepetycje.html#e8-cwiczenia" : "korepetycje.html#cwiczenia" }, "Przejdź do ćwiczeń")),
    ),
  );
}

function pokaz() {
  const klucz = nr ? `karta/${nr}` : `losowa/${ziarno}`;
  const tytul = nr ? `Karta z generatora ${nr}` : "Karta z generatora (losowa)";
  const zadania = zadaniaKarty(d, klucz);
  document.title = `${tytul} – ${d.nazwa}`;

  karta.replaceChildren(
    el("header", { class: "sheet-head" },
      el("div", {},
        el("p", { class: "eyebrow" }, `${d.nazwa} · ${podpis}`),
        el("h1", {}, tytul),
        nr ? null : el("p", { class: "sheet-code" }, `Numer losowania: ${ziarno}`),
      ),
      el("div", { class: "sheet-fields" },
        el("span", {}, "Imię: ", el("span", { class: "sheet-line" })),
        el("span", {}, "Data: ", el("span", { class: "sheet-line sheet-line-short" })),
      ),
    ),
    el("ol", { class: "sheet-tasks" },
      ...zadania.map((z) =>
        el("li", { class: "sheet-task" },
          el("p", { class: "sheet-topic" }, z.temat),
          wstaw(el("div", { class: "sheet-text" }), z.tresc),
          ...z.pola.filter((p) => p.typ === "wybor").map((p) =>
            el("ul", { class: "sheet-opcje" },
              ...p.opcje.map((o, i) => el("li", {}, el("strong", {}, `${"ABCDEFGH"[i]}. `), wstaw(el("span"), o, { akapity: false }))))),
          el("div", { class: "sheet-space", "aria-hidden": "true" }),
        ),
      ),
    ),
    el("section", { class: "sheet-answers" },
      el("h2", {}, "Odpowiedzi"),
      el("ol", {}, ...zadania.map((z) => wstaw(el("li"), z.wynik, { akapity: false }))),
    ),
  );
}

document.getElementById("drukuj").addEventListener("click", () => print());
document.getElementById("nowa").addEventListener("click", (e) => {
  e.preventDefault();
  location.href = `karta.html?${skad}&ziarno=${crypto.getRandomValues(new Uint32Array(1))[0]}`;
});

if (!d || !((nr >= 1 && nr <= KARTY.ile) || /^\d+$/.test(ziarno))) {
  komunikat("Nie ma takiej karty", "Sprawdź link albo wybierz kartę z listy w ćwiczeniach.");
} else if (!uczen) {
  komunikat("Zaloguj się", "Karty pracy są dostępne po zalogowaniu kodem ucznia.");
} else if (r ? !d.karty : !ma(uczen, d.id, "karty")) {
  komunikat("Brak dostępu", `Nie masz dostępu do kart pracy z tego ${r ? "rozdziału" : "działu"}.`);
} else {
  pokaz();
}
