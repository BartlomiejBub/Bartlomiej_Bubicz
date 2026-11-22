// Karta pracy do druku: karta.html?dzial=liczby&nr=2 (stała) albo ?dzial=liczby&ziarno=123 (wylosowana);
// zamiast działu może być rozdział z widoku „Do szkoły”: karta.html?rozdzial=sp5-ulamki-zwykle&nr=1 (zadania z jego generatorów).
// Ściąga do druku: karta.html?rozdzial=…&sciaga=1 (albo ?dzial=…&sciaga=1) – wszystkie karty wzorów z rysunkami i „Jak rozwiązywać”.
import { el } from "./dom.js";
import { zalogowany, ma, maRozdzial, tematyRozdzialuUcznia } from "./dostep.js";
import { dzial as znajdzDzial, rozdzial as znajdzRozdzial, wczytajRozdzial, przytnij, egzamin, zadaniaKarty, KARTY } from "./dzialy.js";
import { wstaw } from "./matematyka.js";
import { rysunekKarty } from "./rysunki.js";

const parametry = new URLSearchParams(location.search);
const uczen = zalogowany();
const r = znajdzRozdzial(parametry.get("rozdzial"));
const caly = r && await wczytajRozdzial(r.klasa, r.rozdzial).catch(() => null);
const d = r ? caly && przytnij(caly, tematyRozdzialuUcznia(uczen, r.rozdzial.id)) : znajdzDzial(parametry.get("dzial"));
const skad = r ? `rozdzial=${d.id}` : `dzial=${d?.id}`;
const podpis = r ? `${r.klasa.nazwa.toLowerCase()}, ${r.klasa.etap.toLowerCase()}` : egzamin(d?.egzamin).opis;
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

function pokazSciage() {
  const tematy = d.wzory.filter((t) => t.wzory.length);
  const pole = (klasa, t) => t && wstaw(el("div", { class: klasa }), t);
  document.title = `Ściąga – ${d.nazwa}`;
  karta.classList.add("sheet-sciaga");
  karta.replaceChildren(
    el("header", { class: "sheet-head" },
      el("div", {},
        el("p", { class: "eyebrow" }, `${d.nazwa} · ${podpis}`),
        el("h1", {}, r ? "Ściąga z rozdziału" : "Wzory z działu"),
      ),
    ),
    ...tematy.map((t) => el("section", { class: "sciaga-temat" },
      el("h2", {}, t.nazwa),
      el("div", { class: "sciaga-karty" },
        ...t.wzory.map((w) => el("div", { class: "sciaga-karta" },
          wstaw(el("p", { class: "wzor-nazwa" }), w.nazwa, { akapity: false }),
          pole("wzor-slownie", w.slownie),
          w.tex && wstaw(el("div", { class: "wzor-tex" }), `$${w.tex.replace(/\\qquad/g, "\\quad\\quad ")}$`),
          rysunekKarty(w),
          pole("wzor-litery", w.litery),
          pole("wzor-przyklad", w.przyklad && `**Przykład:** ${w.przyklad}`),
          pole("wzor-uwaga", w.uwaga),
        )),
      ),
      t.jak?.length > 0 && el("div", { class: "jak" },
        el("h3", {}, "Jak rozwiązywać"),
        el("ol", {}, ...t.jak.map((k) => wstaw(el("li"), k, { akapity: false })))),
    )),
  );
}

document.getElementById("drukuj").addEventListener("click", () => print());
document.getElementById("nowa").addEventListener("click", (e) => {
  e.preventDefault();
  location.href = `karta.html?${skad}&ziarno=${crypto.getRandomValues(new Uint32Array(1))[0]}`;
});

const sciaga = parametry.has("sciaga");
const istnieje = d && (sciaga ? d.wzory.some((t) => t.wzory.length) : d.generatory.length && ((nr >= 1 && nr <= KARTY.ile) || /^\d+$/.test(ziarno)));
if (!istnieje) {
  komunikat("Nie ma takiej karty", "Sprawdź link albo wybierz kartę z listy w ćwiczeniach.");
} else if (!uczen) {
  komunikat("Zaloguj się", "Karty pracy są dostępne po zalogowaniu kodem ucznia.");
} else if (r ? !maRozdzial(uczen, r.rozdzial.id) : !ma(uczen, d.id, "karty")) {
  komunikat("Brak dostępu", `Nie masz dostępu do kart pracy z tego ${r ? "rozdziału" : "działu"}.`);
} else if (sciaga) {
  document.getElementById("nowa").hidden = true;
  pokazSciage();
} else {
  pokaz();
}
