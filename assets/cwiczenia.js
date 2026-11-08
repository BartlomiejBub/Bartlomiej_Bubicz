// Ćwiczenia dla zalogowanych uczniów: zadania z arkuszy CKE, generator zadań i karty pracy.
// Pokazuje działy egzaminu wybranego na stronie (<body data-egzamin>, zmienia go korepetycje.js).
import { el } from "./dom.js";
import { zaloguj, zalogowany, wyloguj, ma, tematyUcznia, dostepUcznia } from "./dostep.js";
import { DZIALY, KARTY, egzamin, maMaterialy, przytnij, klasy, dzialRozdzialu, wczesniejszeRozdzialy } from "./dzialy.js";
import { losownik, sprawdz } from "./generatory/wspolne.js";
import { wstaw } from "./matematyka.js";

const KLUCZ_DZIALU = "korepetycje.dzial";   // + "." + egzamin; dla matury bez przyrostka, jak dawniej
const KLUCZ_TRYBU = "korepetycje.tryb";     // "egzamin" (działy egzaminu) albo "szkola" (klasy i rozdziały)
const KLUCZ_KLASY = "korepetycje.klasa";    // + "." + egzamin
const KLUCZ_ROZDZIALU = "korepetycje.rozdzial";   // + "." + id klasy
const ZADAN_NA_SPRAWDZIAN = 10;
const ZADAN_NA_POWTORKE = 6;

const logowanie = document.getElementById("cwiczenia-logowanie");
const panel = document.getElementById("cwiczenia-uczen");
const formularz = document.getElementById("login-form");
const poleKodu = document.getElementById("kod");
const blad = document.getElementById("login-error");
const wyborTrybu = document.getElementById("tryb-wybor");
const wyborDzialu = document.getElementById("dzialy-wybor");
const widok = document.getElementById("dzial");

const biezacyEgzamin = () => egzamin(document.body.dataset.egzamin);
const kluczDzialu = () => (biezacyEgzamin().id === "matura" ? KLUCZ_DZIALU : `${KLUCZ_DZIALU}.${biezacyEgzamin().id}`);

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
  const wszystkie = DZIALY
    .map((d) => przytnij(d, tematyUcznia(uczen, d.id)))
    .filter((d) => ["zadania", "generator", "karty"].some((r) => widzi(d, r)));
  const e = biezacyEgzamin();
  const dostepne = wszystkie.filter((d) => d.egzamin === e.id);
  if (!dostepne.length) {
    const inny = wszystkie.find((d) => d.egzamin !== e.id);
    wyborTrybu.hidden = true;
    wyborDzialu.hidden = true;
    widok.replaceChildren(
      el("div", { class: "empty" },
        el("strong", {}, "Brak materiałów"),
        el("p", {}, inny
          ? `Tutaj nie masz jeszcze materiałów. Twoje materiały są w części „${egzamin(inny.egzamin).nazwa}” – przełącz ją na górze strony.`
          : "Nie masz jeszcze przydzielonych materiałów. Daj znać nauczycielowi."),
      ),
    );
    return;
  }

  // Dwa wejścia do tych samych materiałów: działy egzaminu albo klasy i rozdziały ze szkoły.
  const tryby = [
    ["egzamin", "Do egzaminu", "działy jak na egzaminie"],
    ["szkola", "Do szkoły", "rozdziały z Twojej klasy"],
  ].map(([id, nazwa, opis]) => {
    const b = el("button", { class: "egzamin", type: "button", "aria-pressed": "false", "data-tryb": id },
      el("strong", {}, nazwa), el("small", {}, opis));
    b.addEventListener("click", () => pokazTryb(uczen, dostepne, id));
    return b;
  });
  wyborTrybu.replaceChildren(...tryby);
  wyborTrybu.hidden = !klasy(e.id).length;
  pokazTryb(uczen, dostepne, przypomnij(KLUCZ_TRYBU) === "szkola" && klasy(e.id).length ? "szkola" : "egzamin");
}

function pokazTryb(uczen, dostepne, tryb) {
  pamietaj(KLUCZ_TRYBU, tryb);
  for (const b of wyborTrybu.children) b.setAttribute("aria-pressed", String(b.dataset.tryb === tryb));
  if (tryb === "szkola") {
    pokazKlasy(uczen);
    return;
  }
  const przyciski = dostepne.map((d) => {
    const b = el("button", { class: "tab", type: "button", "aria-pressed": "false", "data-dzial": d.id }, d.nazwa);
    b.addEventListener("click", () => pokazDzial(uczen, d, przyciski));
    return b;
  });
  wyborDzialu.setAttribute("aria-label", "Dział");
  wyborDzialu.replaceChildren(...przyciski);
  wyborDzialu.hidden = dostepne.length < 2;
  const zapisany = dostepne.find((d) => d.id === przypomnij(kluczDzialu()));
  pokazDzial(uczen, zapisany ?? dostepne[0], przyciski);
}

function pokazDzial(uczen, d, przyciski) {
  pamietaj(kluczDzialu(), d.id);
  for (const b of przyciski) b.setAttribute("aria-pressed", String(b.dataset.dzial === d.id));
  const widzi = (r) => ma(uczen, d.id, r) && maMaterialy(d, r);
  widok.replaceChildren(el("p", { class: "section-intro" }, d.opis), ...materialy(d, widzi));
}

/** Bloki z materiałami działu (albo rozdziału), które uczeń widzi. */
function materialy(d, widzi) {
  const bloki = [
    widzi("zadania") && blokZadan(d),
    widzi("generator") && blokGeneratora(d),
    widzi("karty") && blokKart(d),
  ];
  // Kartę wzorów widzi każdy, kto ma jakikolwiek dostęp do działu.
  const wzory = d.wzory.length > 0 && blokWzorow(d);
  return [wzory, ...bloki].filter(Boolean);
}

// --- Do szkoły: klasa, rozdział, który uczeń teraz przerabia, i materiały do niego

function pokazKlasy(uczen) {
  const lista = klasy(biezacyEgzamin().id);
  // Na przyciskach same numery klas, żeby wszystkie zmieściły się na telefonie.
  const przyciski = lista.map((k) => {
    const b = el("button", { class: "tab", type: "button", "aria-pressed": "false", "aria-label": k.nazwa, "data-klasa": k.id },
      k.nazwa.replace(/^Klasa /, ""));
    b.addEventListener("click", () => pokazKlase(uczen, k, przyciski));
    return b;
  });
  wyborDzialu.setAttribute("aria-label", "Klasa");
  wyborDzialu.replaceChildren(el("span", { class: "tabs-etykieta", "aria-hidden": "true" }, "Klasa"), ...przyciski);
  wyborDzialu.hidden = false;
  const zapisana = lista.find((k) => k.id === przypomnij(`${KLUCZ_KLASY}.${biezacyEgzamin().id}`));
  pokazKlase(uczen, zapisana ?? lista[0], przyciski);
}

function pokazKlase(uczen, k, przyciski) {
  pamietaj(`${KLUCZ_KLASY}.${k.egzamin}`, k.id);
  for (const b of przyciski) b.setAttribute("aria-pressed", String(b.dataset.klasa === k.id));

  const dostep = dostepUcznia(uczen);
  const rozdzialy = k.rozdzialy.map((r) => {
    const d = dzialRozdzialu(k, r, dostep);
    const widzi = (rodzaj) => (rodzaj === "karty" ? d.karty : maMaterialy(d, rodzaj));
    return { r, d, widzi, gotowy: d.wzory.length > 0 || ["zadania", "generator"].some(widzi) };
  });
  const tresc = el("div", { class: "rozdzial" });
  const wybierz = (x) => {
    pamietaj(`${KLUCZ_ROZDZIALU}.${k.id}`, x.r.id);
    for (const c of chipy) c.setAttribute("aria-pressed", String(c.dataset.rozdzial === x.r.id));
    tresc.replaceChildren(
      el("h3", { class: "rozdzial-tytul" }, x.r.nazwa),
      el("p", { class: "blok-intro" }, x.r.opis),
      ...kafelkiRozdzialu(uczen, k, x),
    );
  };
  const chipy = rozdzialy.map((x, i) => {
    const wkrotce = !Object.keys(x.r.tematy).length;
    const b = el("button", {
      class: "chip", type: "button", "aria-pressed": "false", "data-rozdzial": x.r.id, disabled: !x.gotowy,
      title: x.gotowy ? x.r.opis : wkrotce ? "Materiały do tego rozdziału dopiero przygotowuję." : "Ten rozdział nie jest dla Ciebie odblokowany – zapytaj nauczyciela.",
    }, `${i + 1}. ${x.r.nazwa}`, wkrotce && el("span", { class: "chip-count" }, " · wkrótce"));
    b.addEventListener("click", () => wybierz(x));
    return b;
  });

  const zablokowane = rozdzialy.some((x) => !x.gotowy && Object.keys(x.r.tematy).length);
  const gotowe = rozdzialy.filter((x) => x.gotowy);
  const zapisany = gotowe.find((x) => x.r.id === przypomnij(`${KLUCZ_ROZDZIALU}.${k.id}`));
  widok.replaceChildren(...[
    el("p", { class: "section-intro" }, "Rozdziały w kolejności, w jakiej zwykle są w podręcznikach. Wybierz ten, który teraz przerabiasz w szkole – zobaczysz wyjaśnienia, ćwiczenia i zadania z egzaminów z tego tematu."),
    el("div", { class: "chips rozdzialy", role: "group", "aria-label": `Rozdziały: ${k.nazwa.toLowerCase()}` }, ...chipy),
    zablokowane && el("p", { class: "field-hint" }, "Wyszarzone rozdziały nie są jeszcze dla Ciebie odblokowane – zapytaj nauczyciela."),
    gotowe.length ? tresc : el("div", { class: "empty" },
      el("strong", {}, "Brak materiałów"),
      el("p", {}, "W tej klasie nie masz jeszcze odblokowanych rozdziałów. Daj znać nauczycielowi."),
    ),
  ].filter(Boolean));
  if (gotowe.length) wybierz(zapisany ?? gotowe[0]);
}

/** Trzy sposoby pracy z rozdziałem: nauka, próbny sprawdzian z tego rozdziału i powtórka wcześniejszych rozdziałów. */
function kafelkiRozdzialu(uczen, k, x) {
  const dostep = dostepUcznia(uczen);
  const teraz = pulaZadan([x.d]);
  const wczesniej = pulaZadan(wczesniejszeRozdzialy(k, x.r).map((w) => dzialRozdzialu(w.klasa, w.rozdzial, dostep)));
  // Im bliżej egzaminu, tym więcej zadań z arkuszy w powtórce: od 1 w najmłodszej klasie do 3 w ostatniej.
  const lista = klasy(k.egzamin);
  const zArkuszy = 1 + Math.round((2 * lista.indexOf(k)) / Math.max(1, lista.length - 1));
  const naSprawdzian = teraz.generatory.length ? ZADAN_NA_SPRAWDZIAN : Math.min(ZADAN_NA_SPRAWDZIAN, teraz.zamkniete.length);

  const tryby = [
    {
      id: "nauka", nazwa: "Ucz się", opis: "wyjaśnienia, ćwiczenia i zadania z egzaminów",
      pokaz: () => materialy(x.d, x.widzi),
    },
    {
      id: "sprawdzian", nazwa: "Przed sprawdzianem", opis: `${zadan(naSprawdzian)} z tego rozdziału`,
      brak: !naSprawdzian && "W tym rozdziale nie ma jeszcze zadań do sprawdzianu.",
      pokaz: () => [zestaw({
        tytul: "Sprawdzian próbny",
        opis: "Zadania z całego rozdziału, temat po temacie – tak jak na sprawdzianie w szkole. Rozwiąż je na kartce i sprawdź, ile umiesz.",
        losuj: (r) => zadaniaSprawdzianu(teraz, r),
        druk: x.d.karty && `karta.html?rozdzial=${x.d.id}`,
      })],
    },
    {
      id: "powtorka", nazwa: "Powtórka", opis: "zadania z wcześniejszych rozdziałów",
      brak: !wczesniej.generatory.length && !wczesniej.zamkniete.length && "Powtórka pojawi się, gdy przerobisz wcześniejsze rozdziały.",
      pokaz: () => [zestaw({
        tytul: "Powtórka",
        opis: "Za każdym razem inne zadania z rozdziałów, które już były – żeby nic nie wyleciało z głowy przed egzaminem."
          + (wczesniej.zamkniete.length ? " Są wśród nich zadania z arkuszy egzaminacyjnych – im bliżej egzaminu, tym więcej." : ""),
        losuj: (r) => zadaniaPowtorki(wczesniej, zArkuszy, r),
      })],
    },
  ];

  const tresc = el("div");
  const przyciski = tryby.map((t) => {
    const b = el("button", { class: "egzamin", type: "button", "aria-pressed": "false", disabled: Boolean(t.brak), title: t.brak || null },
      el("strong", {}, t.nazwa), el("small", {}, t.opis));
    b.addEventListener("click", () => {
      for (const p of przyciski) p.setAttribute("aria-pressed", String(p === b));
      tresc.replaceChildren(...t.pokaz());
    });
    return b;
  });
  przyciski[0].click();
  return [el("div", { class: "egzaminy kafelki", role: "group", "aria-label": "Co chcesz zrobić" }, ...przyciski), tresc];
}

/** Generatory i zadania zamknięte z arkuszy z kilku działów (albo rozdziałów), bez powtórzeń. */
function pulaZadan(dzialy) {
  return {
    generatory: [...new Set(dzialy.flatMap((d) => d.generatory))],
    zamkniete: [...new Set(dzialy.flatMap((d) => d.tematy.flatMap((t) => t.zadania.filter((z) => !z.rozwiazanie))))],
  };
}

/** Sprawdzian: każdy generator rozdziału po kolei (gdy jest ich mniej niż zadań – kolejna runda), bez generatorów – zadania z arkuszy. */
function zadaniaSprawdzianu(pula, r) {
  if (!pula.generatory.length) return r.shuffle(pula.zamkniete).slice(0, ZADAN_NA_SPRAWDZIAN).map((zadanie) => ({ zadanie }));
  const wybrane = new Set(r.shuffle(pula.generatory).slice(0, ZADAN_NA_SPRAWDZIAN));
  const kolejnosc = pula.generatory.filter((g) => wybrane.has(g));
  return Array.from({ length: ZADAN_NA_SPRAWDZIAN }, (_, i) => kolejnosc[i % kolejnosc.length])
    .sort((a, b) => kolejnosc.indexOf(a) - kolejnosc.indexOf(b))
    .map((generator) => ({ generator }));
}

/** Powtórka: kilka zadań z arkuszy i reszta z generatorów wcześniejszych rozdziałów, przemieszane. */
function zadaniaPowtorki(pula, zArkuszy, r) {
  const ileArkuszy = pula.generatory.length ? Math.min(zArkuszy, pula.zamkniete.length) : ZADAN_NA_POWTORKE;
  const zamkniete = r.shuffle(pula.zamkniete).slice(0, ileArkuszy).map((zadanie) => ({ zadanie }));
  const ileGen = ZADAN_NA_POWTORKE - zamkniete.length;
  const generatory = r.shuffle(pula.generatory);
  const zGeneratorow = generatory.length ? Array.from({ length: ileGen }, (_, i) => ({ generator: generatory[i % generatory.length] })) : [];
  return r.shuffle([...zamkniete, ...zGeneratorow]);
}

/** Zestaw zadań do rozwiązania jedno po drugim, z licznikiem dobrych odpowiedzi i przyciskiem „Nowy zestaw”. */
function zestaw({ tytul, opis, losuj, druk }) {
  const licznik = el("span", { class: "gen-count", "aria-live": "polite" });
  const lista = el("ol", { class: "abcd-list zestaw" });
  let dobrze = 0;
  let ile = 0;
  const odswiez = () => {
    licznik.textContent = `Dobrze: ${dobrze} z ${ile}`;
  };
  const zalicz = () => {
    dobrze++;
    odswiez();
  };
  const nowy = () => {
    const pozycje = losuj(losownik(losoweZiarno()));
    dobrze = 0;
    ile = pozycje.length;
    lista.replaceChildren(...pozycje.map((p) => (p.generator ? kartaGeneratora(p.generator, zalicz) : kartaZZestawu(p.zadanie, zalicz))));
    odswiez();
  };
  const nowyPrzycisk = el("button", { class: "btn", type: "button" }, "Nowy zestaw");
  nowyPrzycisk.addEventListener("click", nowy);
  const wydruk = druk ? el("a", { class: "btn", href: druk, target: "_blank", rel: "noopener" }, "Wydrukuj kartę z rozdziału") : null;
  wydruk?.addEventListener("click", () => {
    wydruk.href = `${druk}&ziarno=${losoweZiarno()}`;
  });

  nowy();
  return el("section", { class: "blok" },
    el("div", { class: "blok-head" }, el("h3", {}, tytul), licznik),
    el("p", { class: "blok-intro" }, opis),
    lista,
    el("div", { class: "blok-actions" }, nowyPrzycisk, wydruk),
  );
}

/** Zadanie z generatora w zestawie; „Nowe zadanie” losuje w tym miejscu inne zadanie tego samego rodzaju. Liczy się tylko raz. */
function kartaGeneratora(g, zalicz) {
  const karta = el("li", { class: "gen-card" });
  let zaliczone = false;
  const pokaz = ({ fokus }) => {
    karta.replaceChildren(
      el("p", { class: "abcd-zrodlo" }, g.nazwa),
      ...widokZadania(g.generuj(losownik(losoweZiarno())), {
        temat: g.nazwa,
        poprawne: () => {
          if (!zaliczone) zalicz();
          zaliczone = true;
        },
        nastepne: () => pokaz({ fokus: true }),
      }),
    );
    if (fokus) karta.querySelector(".gen-tresc").focus({ preventScroll: true });
  };
  pokaz({ fokus: false });
  return karta;
}

/** Zadanie zamknięte z arkusza w zestawie; liczy się pierwsze sprawdzenie. */
function kartaZZestawu(z, zalicz) {
  let ocenione = false;
  return kartaZamknieta(z, (dobrze) => {
    if (!ocenione && dobrze) zalicz();
    ocenione = true;
  });
}

// --- Wzory i schematy: najważniejsze wzory tematu i jak rozwiązywać typowe zadania

/** Wzór podzielony w miejscach \qquad poza nawiasami i tablicami – na wąskim ekranie części układają się jedna pod drugą. */
function czesciWzoru(tex) {
  const czesci = [];
  let glebokosc = 0, start = 0;
  const re = /\\begin\{[^}]*\}|\\end\{[^}]*\}|\\[{}]|[{}]|\\qquad(?![a-zA-Z])/g;
  for (const m of tex.matchAll(re)) {
    const t = m[0];
    if (t === "{" || t.startsWith("\\begin")) glebokosc++;
    else if (t === "}" || t.startsWith("\\end")) glebokosc--;
    else if (t === "\\qquad" && glebokosc === 0) {
      czesci.push(tex.slice(start, m.index));
      start = m.index + t.length;
    }
  }
  czesci.push(tex.slice(start));
  return czesci.map((c) => c.trim()).filter(Boolean);
}

function blokWzorow(d) {
  let temat = d.wzory[0];
  const tresc = el("div", { class: "wzory-tresc" });

  const pokaz = () => {
    const karty = el("div", { class: "wzory-grid" },
      ...temat.wzory.map((w) =>
        el("div", { class: "wzor-karta" },
          wstaw(el("p", { class: "wzor-nazwa" }), w.nazwa, { akapity: false }),
          w.slownie && wstaw(el("p", { class: "wzor-slownie" }), w.slownie, { akapity: false }),
          el("div", { class: "wzor-tex" }, ...czesciWzoru(w.tex).map((t) => wstaw(el("div", { class: "wzor-czesc" }), `$${t}$`))),
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
    el("h3", {}, d.wzoryTytul ?? "Wzory i schematy"),
    el("p", { class: "blok-intro" }, d.wzoryOpis ?? "Najważniejsze wzory z każdego tematu i krótko, jak rozwiązywać typowe zadania."),
    el("div", { class: "chips", role: "group", "aria-label": "Temat wzorów" }, ...przyciski),
    tresc,
  );
}

// --- Zadania z arkuszy CKE (zamknięte i otwarte), posortowane po tematach

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
    lista.replaceChildren(...temat.zadania.map((z) => z.rozwiazanie ? kartaOtwarta(z) : kartaZamknieta(z, (dobrze) => {
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
    el("div", { class: "blok-head" }, el("h3", {}, egzamin(d.egzamin).zadania), licznik),
    el("p", { class: "blok-intro" }, opisZadan(d)),
    el("div", { class: "chips", role: "group", "aria-label": "Temat zadań" }, ...przyciski),
    lista,
  );
}

function opisZadan(d) {
  const zadania = d.tematy.flatMap((t) => t.zadania);
  const otwarte = zadania.some((z) => z.rozwiazanie);
  const zamkniete = zadania.some((z) => !z.rozwiazanie);
  if (otwarte && zamkniete) {
    return "Zadania z arkuszy CKE, posortowane według tematów: najpierw zamknięte (zaznacz odpowiedź i kliknij „Sprawdź odpowiedź”), potem otwarte (rozwiąż na kartce i porównaj z rozwiązaniem z klucza CKE).";
  }
  return otwarte
    ? "Zadania otwarte z arkuszy CKE, posortowane według tematów. Rozwiąż zadanie na kartce, a potem porównaj z rozwiązaniem z klucza CKE."
    : "Zadania zamknięte z arkuszy CKE, posortowane według tematów. Zaznacz odpowiedź i kliknij „Sprawdź odpowiedź”.";
}

/** Zadanie zamknięte jak w arkuszu: ABCD (albo ABCDE) albo kilka części – P/F, uzupełnianie A/B i C/D, T/N z uzasadnieniem.
 *  „Sprawdź odpowiedź” zaznacza poprawne litery z klucza CKE w każdej części. */
function kartaZamknieta(z, ocenione) {
  const czesci = z.czesci ?? [{ litery: "ABCDE".slice(0, z.opcje.length), opcje: z.opcje, poprawna: z.poprawna }];
  const grupy = czesci.map((c, k) => {
    const nazwa = `abcd-${++licznikPol}`;
    const opcje = [...c.litery].map((litera, i) => {
      const radio = el("input", { type: "radio", name: nazwa, value: String(i) });
      const label = el("label", { class: "abcd-opcja" },
        radio,
        el("span", { class: "abcd-litera" }, c.opcje ? `${litera}.` : litera),
        c.opcje && wstaw(el("span", { class: "abcd-tekst" }), c.opcje[i], { akapity: false }),
      );
      return { radio, label };
    });
    const etykieta = czesci.length > 1 ? `Część ${k + 1} zadania: ${z.zrodlo}` : `Odpowiedzi do zadania: ${z.zrodlo}`;
    const node = el("div", { class: c.opcje ? "abcd-czesc" : "abcd-czesc abcd-pf" },
      c.tekst && wstaw(el("p", { class: "abcd-czesc-tekst" }), c.tekst, { akapity: false }),
      el("div", { class: "abcd-opcje", role: "radiogroup", "aria-label": etykieta }, ...opcje.map((o) => o.label)),
    );
    return { c, opcje, node };
  });
  const info = el("p", { class: "feedback", role: "status" });
  const sprawdzPrzycisk = el("button", { class: "btn btn-primary", type: "button" }, "Sprawdź odpowiedź");

  sprawdzPrzycisk.addEventListener("click", () => {
    const wybrane = grupy.map((g) => g.opcje.findIndex((o) => o.radio.checked));
    const litery = grupy.map((g) => g.c.litery[g.c.poprawna]).join("");
    if (wybrane.includes(-1) && !wybrane.every((w) => w === -1)) {
      info.className = "feedback uwaga";
      info.textContent = "Zaznacz odpowiedź w każdej części zadania.";
      return;
    }
    grupy.forEach((g, k) => g.opcje.forEach((o, i) => {
      o.label.classList.toggle("ok", i === g.c.poprawna);
      o.label.classList.toggle("zle", i === wybrane[k] && i !== g.c.poprawna);
    }));
    if (wybrane.every((w) => w === -1)) {
      info.className = "feedback";
      info.textContent = `Poprawna odpowiedź: ${litery}.`;
      ocenione(false);   // podejrzana odpowiedź się nie liczy
    } else if (grupy.every((g, k) => wybrane[k] === g.c.poprawna)) {
      info.className = "feedback ok";
      info.textContent = `Dobrze! Poprawna odpowiedź: ${litery}.`;
      ocenione(true);
    } else {
      info.className = "feedback zle";
      info.textContent = `Niestety nie. Poprawna odpowiedź: ${litery}.`;
      ocenione(false);
    }
  });

  return el("li", { class: "abcd-card" },
    el("p", { class: "abcd-zrodlo" }, z.zrodlo),
    z.wstep && wstaw(el("div", { class: "abcd-tresc abcd-wstep" }), z.wstep, { rysunek: z.rysunek }),
    wstaw(el("div", { class: "abcd-tresc" }), z.tresc, { rysunek: z.rysunek }),
    ...grupy.map((g) => g.node),
    el("div", { class: "gen-actions" }, sprawdzPrzycisk),
    info,
  );
}

/** Zadanie otwarte z arkusza; „Pokaż rozwiązanie” odsłania przykładowe rozwiązanie z klucza CKE. */
function kartaOtwarta(z) {
  const rozwiazanie = el("div", { class: "rozwiazanie", hidden: "" },
    el("p", { class: "rozwiazanie-tytul" }, "Przykładowe rozwiązanie (klucz CKE)"),
    wstaw(el("div", { class: "abcd-tresc" }), z.rozwiazanie, { rysunek: z.rysunekRozwiazania }),
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
    el("p", { class: "blok-intro" }, d.generatorOpis ?? `Zadania ${egzamin(d.egzamin).podobne}, za każdym razem z innymi liczbami. Wpisz wynik i kliknij „Sprawdź”.`),
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
  const skad = d.rozdzial ? `rozdzial=${d.id}` : `dzial=${d.id}`;
  const losowa = el("a", { class: "btn", href: `karta.html?${skad}`, target: "_blank", rel: "noopener" }, "Wylosuj nową kartę");
  losowa.addEventListener("click", () => {
    losowa.href = `karta.html?${skad}&ziarno=${losoweZiarno()}`;
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
        link(`karta.html?${skad}&nr=${i + 1}`, `Karta z generatora ${i + 1}`, `${ile} z odpowiedziami`)),
    ),
    d.generatory.length > 0 && el("div", { class: "blok-actions" }, losowa),
  );
}

// --- Start

const uczen = zalogowany();
if (uczen) pokazUcznia(uczen);
else pokazLogowanie();

document.addEventListener("egzamin", () => {
  const u = zalogowany();
  if (u) pokazUcznia(u);
});
