// Ćwiczenia dla zalogowanych uczniów: zadania z matur, generator zadań i karty pracy.
import { el } from "./dom.js";
import { zaloguj, zalogowany, wyloguj, ma } from "./dostep.js";
import { DZIALY, KARTY, maMaterialy } from "./dzialy.js";
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

  const widzi = (d, r) => ma(uczen, d.id, r) && maMaterialy(d, r);
  const dostepne = DZIALY.filter((d) => ["zadania", "generator", "karty"].some((r) => widzi(d, r)));
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
  const widzi = (r) => ma(uczen, d.id, r) && maMaterialy(d, r);
  const bloki = [
    widzi("zadania") && blokZadan(d),
    widzi("generator") && blokGeneratora(d),
    widzi("karty") && blokKart(d),
  ];
  // Kartę wzorów widzi każdy, kto ma jakikolwiek dostęp do działu.
  const wzory = d.wzory.length > 0 && blokWzorow(d);
  widok.replaceChildren(el("p", { class: "section-intro" }, d.opis), ...[wzory, ...bloki].filter(Boolean));
}

// --- Wzory i schematy: najważniejsze wzory tematu i jak rozwiązywać typowe zadania

function blokWzorow(d) {
  let temat = d.wzory[0];
  const tresc = el("div", { class: "wzory-tresc" });

  const pokaz = () => {
    const karty = el("div", { class: "wzory-grid" },
      ...temat.wzory.map((w) =>
        el("div", { class: "wzor-karta" },
          wstaw(el("p", { class: "wzor-nazwa" }), w.nazwa, { akapity: false }),
          w.slownie && wstaw(el("p", { class: "wzor-slownie" }), w.slownie, { akapity: false }),
          wstaw(el("div", { class: "wzor-tex" }), `$${w.tex}$`),
          w.litery && wstaw(el("p", { class: "wzor-uwaga" }), w.litery, { akapity: false }),
          w.przyklad && wstaw(el("p", { class: "wzor-przyklad" }), `**Przykład:** ${w.przyklad}`, { akapity: false }),
          w.uwaga && wstaw(el("p", { class: "wzor-uwaga" }), w.uwaga, { akapity: false }),
        ),
      ),
    );
    const jak = temat.jak?.length > 0 && el("div", { class: "jak" },
      el("h4", {}, "Jak rozwiązywać"),
      el("ol", {}, ...temat.jak.map((krok) => wstaw(el("li"), krok, { akapity: false }))),
    );
    tresc.replaceChildren(...[karty, jak].filter(Boolean));
  };

  const przyciski = d.wzory.map((t) => {
    const b = el("button", { class: "chip", type: "button", "aria-pressed": String(t === temat) }, t.nazwa);
    b.addEventListener("click", () => {
      temat = t;
      for (const p of przyciski) p.setAttribute("aria-pressed", String(p === b));
      pokaz();
    });
    return b;
  });

  pokaz();
  return el("section", { class: "blok" },
    el("h3", {}, "Wzory i schematy"),
    el("p", { class: "blok-intro" }, "Najważniejsze wzory z każdego tematu i krótko, jak rozwiązywać typowe zadania."),
    el("div", { class: "chips", role: "group", "aria-label": "Temat wzorów" }, ...przyciski),
    tresc,
  );
}

// --- Zadania z matur: zadania zamknięte z arkuszy CKE, posortowane po tematach

function blokZadan(d) {
  const tematy = d.tematy.filter((t) => t.zadania.length);
  let temat = tematy[0];
  const wyniki = new Map();   // zadanie -> czy dobrze przy pierwszym sprawdzeniu
  const licznik = el("span", { class: "gen-count", "aria-live": "polite" });
  const lista = el("ol", { class: "abcd-list" });

  const odswiezLicznik = () => {
    const ocenione = temat.zadania.filter((z) => wyniki.has(z));
    const dobrze = ocenione.filter((z) => wyniki.get(z)).length;
    licznik.textContent = ocenione.length ? `Dobrze: ${dobrze} z ${ocenione.length}` : "";
  };
  const pokaz = () => {
    lista.replaceChildren(...temat.zadania.map((z) => z.rozwiazanie ? kartaOtwarta(z) : kartaABCD(z, (dobrze) => {
      if (!wyniki.has(z)) wyniki.set(z, dobrze);
      odswiezLicznik();
    })));
    odswiezLicznik();
  };

  const przyciski = tematy.map((t) => {
    const b = el("button", { class: "chip", type: "button", "aria-pressed": String(t === temat) },
      t.nazwa, el("span", { class: "chip-count" }, ` ${t.zadania.length}`));
    b.addEventListener("click", () => {
      temat = t;
      for (const p of przyciski) p.setAttribute("aria-pressed", String(p === b));
      pokaz();
    });
    return b;
  });

  pokaz();
  return el("section", { class: "blok" },
    el("div", { class: "blok-head" }, el("h3", {}, "Zadania z matur"), licznik),
    el("p", { class: "blok-intro" }, d.tematy.some((t) => t.zadania.some((z) => z.rozwiazanie))
      ? "Zadania otwarte z arkuszy CKE, posortowane według tematów. Rozwiąż zadanie na kartce, a potem porównaj z rozwiązaniem z klucza CKE."
      : "Zadania zamknięte z arkuszy CKE, posortowane według tematów. Zaznacz odpowiedź i kliknij „Sprawdź odpowiedź”."),
    el("div", { class: "chips", role: "group", "aria-label": "Temat zadań" }, ...przyciski),
    lista,
  );
}

/** Zadanie ABCD jak w arkuszu; „Sprawdź odpowiedź” pokazuje poprawną literę z klucza CKE. */
function kartaABCD(z, ocenione) {
  const nazwa = `abcd-${++licznikPol}`;
  const opcje = z.opcje.map((o, i) => {
    const radio = el("input", { type: "radio", name: nazwa, value: String(i) });
    const label = el("label", { class: "abcd-opcja" },
      radio,
      el("span", { class: "abcd-litera" }, `${"ABCD"[i]}.`),
      wstaw(el("span", { class: "abcd-tekst" }), o, { akapity: false }),
    );
    return { radio, label };
  });
  const info = el("p", { class: "feedback", role: "status" });
  const sprawdzPrzycisk = el("button", { class: "btn btn-primary", type: "button" }, "Sprawdź odpowiedź");

  sprawdzPrzycisk.addEventListener("click", () => {
    const wybrana = opcje.findIndex((o) => o.radio.checked);
    opcje.forEach((o, i) => {
      o.label.classList.toggle("ok", i === z.poprawna);
      o.label.classList.toggle("zle", i === wybrana && i !== z.poprawna);
    });
    const litera = "ABCD"[z.poprawna];
    if (wybrana < 0) {
      info.className = "feedback";
      info.textContent = `Poprawna odpowiedź: ${litera}.`;
    } else if (wybrana === z.poprawna) {
      info.className = "feedback ok";
      info.textContent = `Dobrze! Poprawna odpowiedź: ${litera}.`;
      ocenione(true);
    } else {
      info.className = "feedback zle";
      info.textContent = `Niestety nie. Poprawna odpowiedź: ${litera}.`;
      ocenione(false);
    }
  });

  return el("li", { class: "abcd-card" },
    el("p", { class: "abcd-zrodlo" }, z.zrodlo),
    z.wstep && wstaw(el("div", { class: "abcd-tresc abcd-wstep" }), z.wstep, { rysunek: z.rysunek }),
    wstaw(el("div", { class: "abcd-tresc" }), z.tresc, { rysunek: z.rysunek }),
    el("div", { class: "abcd-opcje", role: "radiogroup", "aria-label": `Odpowiedzi do zadania: ${z.zrodlo}` }, ...opcje.map((o) => o.label)),
    el("div", { class: "gen-actions" }, sprawdzPrzycisk),
    info,
  );
}

/** Zadanie otwarte z arkusza; „Pokaż rozwiązanie” odsłania przykładowe rozwiązanie z klucza CKE. */
function kartaOtwarta(z) {
  const rozwiazanie = el("div", { class: "rozwiazanie", hidden: "" },
    el("p", { class: "rozwiazanie-tytul" }, "Przykładowe rozwiązanie (klucz CKE)"),
    wstaw(el("div", { class: "abcd-tresc" }), z.rozwiazanie),
  );
  const przycisk = el("button", { class: "btn btn-primary", type: "button", "aria-expanded": "false" }, "Pokaż rozwiązanie");
  przycisk.addEventListener("click", () => {
    const pokaz = rozwiazanie.hidden;
    rozwiazanie.hidden = !pokaz;
    przycisk.setAttribute("aria-expanded", String(pokaz));
    przycisk.textContent = pokaz ? "Ukryj rozwiązanie" : "Pokaż rozwiązanie";
  });

  return el("li", { class: "abcd-card" },
    el("p", { class: "abcd-zrodlo" }, z.zrodlo),
    z.wstep && wstaw(el("div", { class: "abcd-tresc abcd-wstep" }), z.wstep, { rysunek: z.rysunek }),
    wstaw(el("div", { class: "abcd-tresc" }), z.tresc, { rysunek: z.rysunek }),
    el("div", { class: "gen-actions" }, przycisk),
    rozwiazanie,
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
    d.generatory.length > 0 && el("h4", { class: "blok-sub" }, "Karty z generatora"),
    d.generatory.length > 0 && el("ul", { class: "sheet-list" },
      ...Array.from({ length: KARTY.ile }, (_, i) =>
        link(`karta.html?dzial=${d.id}&nr=${i + 1}`, `Karta z generatora ${i + 1}`, `${ile} z odpowiedziami`)),
    ),
    d.generatory.length > 0 && el("div", { class: "blok-actions" }, losowa),
  );
}

// --- Start

const uczen = zalogowany();
if (uczen) pokazUcznia(uczen);
else pokazLogowanie();
