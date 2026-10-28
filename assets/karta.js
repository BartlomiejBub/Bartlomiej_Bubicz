// Karta pracy do druku: karta.html?dzial=liczby&nr=2 (stała) albo ?dzial=liczby&ziarno=123 (wylosowana).
import { el } from "./dom.js";
import { zalogowany, ma } from "./dostep.js";
import { dzial as znajdzDzial, zadaniaKarty, KARTY } from "./dzialy.js";
import { wstaw } from "./matematyka.js";

const parametry = new URLSearchParams(location.search);
const d = znajdzDzial(parametry.get("dzial"));
const nr = Number(parametry.get("nr")) || 0;
const ziarno = parametry.get("ziarno") ?? "";
const karta = document.getElementById("karta");
const narzedzia = document.getElementById("narzedzia");
const uczen = zalogowany();

function komunikat(tytul, tekst) {
  for (const b of narzedzia.querySelectorAll("button, #nowa")) b.hidden = true;
  karta.replaceChildren(
    el("div", { class: "empty" },
      el("strong", {}, tytul),
      el("p", {}, tekst, " ", el("a", { href: "korepetycje.html#cwiczenia" }, "Przejdź do ćwiczeń")),
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
        el("p", { class: "eyebrow" }, `${d.nazwa} · matura, poziom podstawowy`),
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
  location.href = `karta.html?dzial=${d.id}&ziarno=${crypto.getRandomValues(new Uint32Array(1))[0]}`;
});

if (!d || !((nr >= 1 && nr <= KARTY.ile) || /^\d+$/.test(ziarno))) {
  komunikat("Nie ma takiej karty", "Sprawdź link albo wybierz kartę z listy w ćwiczeniach.");
} else if (!uczen) {
  komunikat("Zaloguj się", "Karty pracy są dostępne po zalogowaniu kodem ucznia.");
} else if (!ma(uczen, d.id, "karty")) {
  komunikat("Brak dostępu", "Nie masz dostępu do kart pracy z tego działu.");
} else {
  pokaz();
}
