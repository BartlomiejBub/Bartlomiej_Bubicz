// Ćwiczenia dla zalogowanych uczniów: zadania z matur, generator zadań i karty pracy.
import { el } from "./dom.js";
import { zaloguj, zalogowany, wyloguj, ma } from "./dostep.js";
import { DZIALY, KARTY } from "./dzialy.js";
import { linkDoZadania } from "./zadania-maturalne.js";
import { losownik, sprawdz } from "./generatory/wspolne.js";
import { wstaw } from "./matematyka.js";

const KLUCZ_DZIALU = "korepetycje.dzial";

const logowanie = document.getElementById("cwiczenia-logowanie");
const panel = document.getElementById("cwiczenia-uczen");
const formularz = document.getElementById("login-form");
const poleKodu = document.getElementById("kod");
const blad = document.getElementById("login-error");
const wyborDzialu = document.getElementById("dzialy-wybor");
const widok = document.getElementById("dzial");

const losoweZiarno = () => crypto.getRandomValues(new Uint32Array(1))[0];

function pamietaj(klucz, wartosc) {
  try { localStorage.setItem(klucz, wartosc); } catch {}
}
function przypomnij(klucz) {
  try { return localStorage.getItem(klucz); } catch { return null; }
}

/** 1 zadanie, 2 zadania, 5 zadań, 12 zadań, 22 zadania. */
function zadan(n) {
  if (n === 1) return "1 zadanie";
  const k = n % 10, s = n % 100;
  return `${n} ${k >= 2 && k <= 4 && (s < 12 || s > 14) ? "zadania" : "zadań"}`;
}

// --- Logowanie

function pokazLogowanie() {
  panel.hidden = true;
  logowanie.hidden = false;
}

formularz.addEventListener("submit", async (e) => {
  e.preventDefault();
  const przycisk = formularz.querySelector('[type="submit"]');
  przycisk.disabled = true;
  try {
    const uczen = await zaloguj(poleKodu.value);
    blad.hidden = Boolean(uczen);
    if (uczen) {
      poleKodu.value = "";
      pokazUcznia(uczen);
    } else {
      poleKodu.select();
    }
  } finally {
    przycisk.disabled = false;
  }
});

document.getElementById("wyloguj").addEventListener("click", () => {
  wyloguj();
  pokazLogowanie();
  poleKodu.focus();
});

// --- Panel ucznia: wybór działu i jego materiały

function pokazUcznia(uczen) {
  logowanie.hidden = true;
  panel.hidden = false;
  panel.querySelector("[data-imie]").textContent = uczen.imie;

  const dostepne = DZIALY.filter((d) => ["zadania", "generator", "karty"].some((r) => ma(uczen, d.id, r)));
  if (!dostepne.length) {
    wyborDzialu.hidden = true;
    widok.replaceChildren(
      el("div", { class: "empty" },
        el("strong", {}, "Brak materiałów"),
        el("p", {}, "Nie masz jeszcze przydzielonych materiałów. Daj znać nauczycielowi."),
      ),
    );
    return;
  }

  const przyciski = dostepne.map((d) => {
    const b = el("button", { class: "tab", type: "button", "aria-pressed": "false", "data-dzial": d.id }, d.nazwa);
    b.addEventListener("click", () => pokazDzial(uczen, d, przyciski));
    return b;
  });
  wyborDzialu.replaceChildren(...przyciski);
  wyborDzialu.hidden = dostepne.length < 2;
  const zapisany = dostepne.find((d) => d.id === przypomnij(KLUCZ_DZIALU));
  pokazDzial(uczen, zapisany ?? dostepne[0], przyciski);
}

function pokazDzial(uczen, d, przyciski) {
  pamietaj(KLUCZ_DZIALU, d.id);
  for (const b of przyciski) b.setAttribute("aria-pressed", String(b.dataset.dzial === d.id));
  const bloki = [
    ma(uczen, d.id, "zadania") && blokZadan(d),
    ma(uczen, d.id, "generator") && blokGeneratora(d),
    ma(uczen, d.id, "karty") && blokKart(d),
  ];
  widok.replaceChildren(el("p", { class: "section-intro" }, d.opis), ...bloki.filter(Boolean));
}

// --- Zadania z matur

function blokZadan(d) {
  return el("section", { class: "blok" },
    el("h3", {}, "Zadania z matur"),
    el("p", { class: "blok-intro" }, "Prawdziwe zadania z arkuszy CKE. Rozwiąż zadanie w arkuszu, a potem sprawdź odpowiedź."),
    el("ol", { class: "task-list" }, ...d.zadania.map(kartaZadania)),
  );
}

function kartaZadania(z) {
  const odpowiedz = wstaw(el("p", { class: "task-answer", hidden: true }), `Odpowiedź: ${z.odpowiedz}`, { akapity: false });
  const pokaz = el("button", { class: "btn", type: "button", "aria-expanded": "false" }, "Pokaż odpowiedź");
  pokaz.addEventListener("click", () => {
    const pokazac = odpowiedz.hidden;
    odpowiedz.hidden = !pokazac;
    pokaz.setAttribute("aria-expanded", String(pokazac));
    pokaz.textContent = pokazac ? "Ukryj odpowiedź" : "Pokaż odpowiedź";
  });
  return el("li", { class: "task-card" },
    el("div", { class: "task-head" },
      el("strong", { class: "task-topic" }, z.temat),
      el("span", { class: "task-meta" }, `${z.termin} · zadanie ${z.nr} · ${z.punkty} pkt`),
    ),
    wstaw(el("p", { class: "task-desc" }), z.opis, { akapity: false }),
    el("div", { class: "task-actions" },
      el("a", { class: "btn btn-primary", href: linkDoZadania(z), target: "_blank", rel: "noopener" },
        `Otwórz zadanie (str. ${z.strona}) `, el("span", { "aria-hidden": "true" }, "↗")),
      pokaz,
    ),
    odpowiedz,
  );
}

// --- Generator zadań

function blokGeneratora(d) {
  let gen = d.generatory[0];
  let rozwiazane = 0;
  const licznik = el("span", { class: "gen-count", "aria-live": "polite" });
  const karta = el("div", { class: "gen-card" });

  const tematy = d.generatory.map((g) => {
    const b = el("button", { class: "chip", type: "button", "aria-pressed": String(g === gen), title: g.opis }, g.nazwa);
    b.addEventListener("click", () => {
      gen = g;
      for (const t of tematy) t.setAttribute("aria-pressed", String(t === b));
      nowe();
    });
    return b;
  });

  function nowe({ fokus = true } = {}) {
    const zadanie = gen.generuj(losownik(losoweZiarno()));
    karta.replaceChildren(...widokZadania(zadanie, {
      temat: gen.nazwa,
      poprawne: () => {
        rozwiazane++;
        licznik.textContent = `Rozwiązane w tej sesji: ${rozwiazane}`;
      },
      nastepne: () => nowe(),
    }));
    if (fokus) karta.querySelector(".gen-tresc").focus({ preventScroll: true });
  }

  nowe({ fokus: false });
  return el("section", { class: "blok" },
    el("div", { class: "blok-head" }, el("h3", {}, "Generator zadań"), licznik),
    el("p", { class: "blok-intro" }, "Zadania jak na maturze, za każdym razem z innymi liczbami. Wpisz wynik i kliknij „Sprawdź”."),
    el("div", { class: "chips", role: "group", "aria-label": "Temat zadań" }, ...tematy),
    karta,
  );
}

let licznikPol = 0;

function poleLiczby(id, etykieta) {
  const input = el("input", {
    id, class: "num", type: "text", inputmode: "decimal", autocomplete: "off",
    autocorrect: "off", autocapitalize: "off", spellcheck: "false", "aria-label": etykieta,
  });
  input.addEventListener("input", () => oznacz(input, null));
  return input;
}

function oznacz(node, stan) {
  node.classList.toggle("ok", stan === true);
  node.classList.toggle("zle", stan === false);
  if (node.matches("input")) node.setAttribute("aria-invalid", String(stan === false));
}

/** Pole odpowiedzi + funkcje do odczytu wpisanej wartości i oznaczenia wyniku. */
function widokPola(pole) {
  const id = `pole-${++licznikPol}`;
  const etykieta = (tag, attrs = {}) => wstaw(el(tag, { class: "field-label", ...attrs }), pole.etykieta ?? "", { akapity: false });

  if (pole.typ === "zbior") {
    const pola = Array.from({ length: pole.ile }, (_, i) => poleLiczby(`${id}-${i}`, `Wartość ${i + 1}`));
    return {
      node: el("fieldset", { class: "field field-set" },
        etykieta("legend"),
        el("div", { class: "set-inputs" }, ...pola),
        el("small", { class: "field-hint" }, "w dowolnej kolejności"),
      ),
      odczyt: () => pola.map((p) => p.value),
      oznacz: (stan) => pola.forEach((p) => oznacz(p, stan)),
    };
  }
  if (pole.typ === "wybor") {
    const radia = pole.opcje.map((_, i) => el("input", { type: "radio", name: id, value: String(i) }));
    const grupa = el("fieldset", { class: "field field-choice" },
      etykieta("legend"),
      ...pole.opcje.map((o, i) => el("label", { class: "choice" }, radia[i], wstaw(el("span"), o, { akapity: false }))),
    );
    for (const r of radia) r.addEventListener("change", () => oznacz(grupa, null));
    return {
      node: grupa,
      odczyt: () => radia.find((r) => r.checked)?.value ?? null,
      oznacz: (stan) => oznacz(grupa, stan),
    };
  }
  const input = poleLiczby(id, null);
  return {
    node: el("div", { class: "field" }, etykieta("label", { for: id }), input),
    odczyt: () => input.value,
    oznacz: (stan) => oznacz(input, stan),
  };
}

/** Przyciski −, /, , – na telefonach klawiatura liczbowa często ich nie ma. */
function klawisze(form) {
  let ostatnie = null;
  form.addEventListener("focusin", (e) => {
    if (e.target.matches("input.num")) ostatnie = e.target;
  });
  const wstawZnak = (znak) => {
    const pole = ostatnie ?? form.querySelector("input.num");
    const [a, b] = [pole.selectionStart ?? pole.value.length, pole.selectionEnd ?? pole.value.length];
    pole.setRangeText(znak, a, b, "end");
    pole.focus();
    pole.dispatchEvent(new Event("input", { bubbles: true }));
  };
  const przyciski = [["−", "-", "Wstaw minus"], ["/", "/", "Wstaw kreskę ułamkową"], [",", ",", "Wstaw przecinek"]].map(([napis, znak, opis]) => {
    const b = el("button", { class: "key", type: "button", "aria-label": opis }, napis);
    b.addEventListener("pointerdown", (e) => e.preventDefault());   // pole zostaje aktywne
    b.addEventListener("click", () => wstawZnak(znak));
    return b;
  });
  return el("div", { class: "keys" },
    el("div", { class: "keys-row", role: "group", "aria-label": "Wstaw znak do pola" }, ...przyciski),
    el("small", { class: "field-hint" }, "Ułamek wpisz jako 3/2, liczbę dziesiętną jako 1,5."),
  );
}

function widokZadania(z, { temat, poprawne, nastepne }) {
  const tresc = wstaw(el("div", { class: "gen-tresc", tabindex: "-1", "aria-label": `Zadanie: ${temat}` }), z.tresc);
  const pola = new Map(z.pola.map((p) => [p.id, widokPola(p)]));
  const form = el("form", { class: "gen-form", novalidate: true },
    el("div", { class: "fields" }, ...[...pola.values()].map((p) => p.node)),
  );
  if (form.querySelector("input.num")) form.append(klawisze(form));

  const sprawdzPrzycisk = el("button", { class: "btn btn-primary", type: "submit" }, "Sprawdź");
  const rozwPrzycisk = el("button", { class: "btn", type: "button", "aria-expanded": "false" }, "Pokaż rozwiązanie");
  const nowePrzycisk = el("button", { class: "btn", type: "button" }, "Nowe zadanie");
  form.append(el("div", { class: "gen-actions" }, sprawdzPrzycisk, rozwPrzycisk, nowePrzycisk));

  const info = el("p", { class: "feedback", role: "status" });
  const rozwiazanie = el("div", { class: "solution", hidden: true },
    el("h4", {}, "Rozwiązanie"),
    el("ol", {}, ...z.rozwiazanie.map((krok) => wstaw(el("li"), krok, { akapity: false }))),
    wstaw(el("p", { class: "solution-answer" }), `Odpowiedź: ${z.wynik}`, { akapity: false }),
  );

  let zaliczone = false;
  let podejrzane = false;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const wpisane = Object.fromEntries([...pola].map(([id, p]) => [id, p.odczyt()]));
    const wynik = sprawdz(z, wpisane);
    for (const [id, p] of pola) p.oznacz(wynik.pola[id]);
    if (wynik.poprawne) {
      info.className = "feedback ok";
      info.textContent = podejrzane ? "Dobrze! Spróbuj teraz kolejne zadanie bez podglądania rozwiązania." : "Dobrze! To poprawna odpowiedź.";
      if (!zaliczone && !podejrzane) poprawne();
      zaliczone = true;
      nowePrzycisk.classList.add("btn-primary");
      sprawdzPrzycisk.classList.remove("btn-primary");
    } else if (Object.values(wynik.pola).includes(null)) {
      info.className = "feedback uwaga";
      info.textContent = "Uzupełnij wszystkie pola. Liczby możesz wpisać np. tak: 3/2, 1,5 albo −4.";
    } else {
      info.className = "feedback zle";
      info.textContent = "Jeszcze nie – popraw zaznaczone pola albo zobacz rozwiązanie.";
    }
  });
  rozwPrzycisk.addEventListener("click", () => {
    rozwiazanie.hidden = !rozwiazanie.hidden;
    if (!rozwiazanie.hidden) podejrzane = true;
    rozwPrzycisk.setAttribute("aria-expanded", String(!rozwiazanie.hidden));
    rozwPrzycisk.textContent = rozwiazanie.hidden ? "Pokaż rozwiązanie" : "Ukryj rozwiązanie";
  });
  nowePrzycisk.addEventListener("click", nastepne);

  return [tresc, form, info, rozwiazanie];
}

// --- Karty pracy

function blokKart(d) {
  const ile = zadan(d.generatory.length * KARTY.zadanNaGenerator);
  const losowa = el("a", { class: "btn", href: `karta.html?dzial=${d.id}`, target: "_blank", rel: "noopener" }, "Wylosuj nową kartę");
  losowa.addEventListener("click", () => {
    losowa.href = `karta.html?dzial=${d.id}&ziarno=${losoweZiarno()}`;
  });
  const link = (href, tytul, opis) =>
    el("li", {}, el("a", { class: "sheet-link", href, target: "_blank", rel: "noopener" }, el("strong", {}, tytul), el("small", {}, opis)));
  return el("section", { class: "blok" },
    el("h3", {}, "Karty pracy"),
    el("p", { class: "blok-intro" }, "Zestawy do wydrukowania. Odpowiedzi są zawsze na ostatniej stronie."),
    d.pdf.length > 0 && el("h4", { class: "blok-sub" }, "Gotowe karty (PDF)"),
    d.pdf.length > 0 && el("ul", { class: "sheet-list" }, ...d.pdf.map((k) => link(k.plik, k.nazwa, k.opis))),
    el("h4", { class: "blok-sub" }, "Karty z generatora"),
    el("ul", { class: "sheet-list" },
      ...Array.from({ length: KARTY.ile }, (_, i) =>
        link(`karta.html?dzial=${d.id}&nr=${i + 1}`, `Karta z generatora ${i + 1}`, `${ile} z odpowiedziami`)),
    ),
    el("div", { class: "blok-actions" }, losowa),
  );
}

// --- Start

const uczen = zalogowany();
if (uczen) pokazUcznia(uczen);
else pokazLogowanie();
