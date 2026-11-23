// Ćwiczenia dla zalogowanych uczniów: zadania z arkuszy CKE, generator zadań i karty pracy.
// Pokazuje działy egzaminu wybranego na stronie (<body data-egzamin>, zmienia go korepetycje.js).
import { el } from "./dom.js";
import { zaloguj, zalogowany, wyloguj, ma, maRozdzial, tematyUcznia, tematyRozdzialuUcznia } from "./dostep.js";
import {
  DZIALY, EGZAMINY, KARTY, zadanNaGenerator, egzamin, maMaterialy, przytnij, klasy, wczytajRozdzial,
} from "./dzialy.js";
import { losownik, sprawdz } from "./generatory/wspolne.js";
import { wstaw } from "./matematyka.js";
import { rysunekKarty } from "./rysunki.js";

const KLUCZ_DZIALU = "korepetycje.dzial";   // + "." + egzamin; dla matury bez przyrostka, jak dawniej
const KLUCZ_TRYBU = "korepetycje.tryb";     // "egzamin" (działy egzaminu) albo "szkola" (klasy i rozdziały)
const KLUCZ_KLASY = "korepetycje.klasa";    // + "." + egzamin
const KLUCZ_ROZDZIALU = "korepetycje.rozdzial";   // + "." + id klasy
const KLUCZ_TEMATU = "korepetycje.temat";         // + "." + id działu albo rozdziału
const KLUCZ_ZAKLADKI = "korepetycje.zakladka";    // ostatnio wybrana zakładka tematu: wzory, zadania, generator

const logowanie = document.getElementById("cwiczenia-logowanie");
const panel = document.getElementById("cwiczenia-uczen");
const formularz = document.getElementById("login-form");
const poleKodu = document.getElementById("kod");
const blad = document.getElementById("login-error");
const wyborTrybu = document.getElementById("tryb-wybor");
const wyborDzialu = document.getElementById("dzialy-wybor");
const etykietaDzialu = document.getElementById("dzialy-etykieta");
const widok = document.getElementById("dzial");
const spis = document.getElementById("spis");   // lista tematów w bocznej kolumnie (na komputerze)

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
  document.querySelector("[data-imie]").textContent = uczen.imie;
  document.querySelector("[data-inicjal]").textContent = uczen.imie.trim().charAt(0).toUpperCase();

  const widzi = (d, r) => ma(uczen, d.id, r) && maMaterialy(d, r);
  const wszystkie = DZIALY
    .map((d) => przytnij(d, tematyUcznia(uczen, d.id)))
    .filter((d) => ["zadania", "generator", "karty"].some((r) => widzi(d, r)));
  const e = biezacyEgzamin();
  const dostepne = wszystkie.filter((d) => d.egzamin === e.id);
  const swojeKlasy = klasyUcznia(uczen, e.id);
  if (!dostepne.length && !swojeKlasy.length) {
    const inny = EGZAMINY.find((x) => x.id !== e.id && (wszystkie.some((d) => d.egzamin === x.id) || klasyUcznia(uczen, x.id).length));
    wyborTrybu.hidden = true;
    wyborDzialu.hidden = true;
    spis.hidden = true;
    widok.replaceChildren(
      el("div", { class: "empty" },
        el("strong", {}, "Brak materiałów"),
        el("p", {}, inny
          ? `Tutaj nie masz jeszcze materiałów. Twoje materiały są w części „${inny.nazwa}” – przełącz ją na górze strony.`
          : "Nie masz jeszcze przydzielonych materiałów. Daj znać nauczycielowi."),
      ),
    );
    return;
  }

  // Dwie osobne części: działy egzaminu i rozdziały z klasy (każdy rozdział ma własne materiały).
  const tryby = [
    dostepne.length && ["egzamin", "Do egzaminu", "działy jak na egzaminie"],
    swojeKlasy.length && ["szkola", "Do szkoły", "rozdziały z Twojej klasy"],
  ].filter(Boolean).map(([id, nazwa, opis]) => {
    const b = el("button", { class: "egzamin", type: "button", "aria-pressed": "false", "data-tryb": id },
      el("strong", {}, nazwa), el("small", {}, opis));
    b.addEventListener("click", () => pokazTryb(uczen, dostepne, swojeKlasy, id));
    return b;
  });
  wyborTrybu.replaceChildren(...tryby);
  wyborTrybu.hidden = tryby.length < 2;
  const szkola = !dostepne.length || (przypomnij(KLUCZ_TRYBU) === "szkola" && swojeKlasy.length > 0);
  pokazTryb(uczen, dostepne, swojeKlasy, szkola ? "szkola" : "egzamin");
}

/** Klasy, w których uczeń ma jakieś rozdziały, razem z listą tych rozdziałów (w kolejności z podręcznika). */
function klasyUcznia(uczen, egz) {
  return klasy(egz)
    .map((k) => ({ k, rozdzialy: k.rozdzialy.filter((r) => maRozdzial(uczen, r.id)) }))
    .filter((x) => x.rozdzialy.length);
}

function pokazTryb(uczen, dostepne, swojeKlasy, tryb) {
  pamietaj(KLUCZ_TRYBU, tryb);
  for (const b of wyborTrybu.children) b.setAttribute("aria-pressed", String(b.dataset.tryb === tryb));
  if (tryb === "szkola") {
    pokazKlasy(uczen, swojeKlasy);
    return;
  }
  const przyciski = dostepne.map((d) => {
    const b = el("button", { class: "tab", type: "button", "aria-pressed": "false", "data-dzial": d.id }, d.nazwa);
    b.addEventListener("click", () => pokazDzial(uczen, d, przyciski));
    return b;
  });
  wyborDzialu.setAttribute("aria-label", "Dział");
  etykietaDzialu.textContent = "Dział";
  wyborDzialu.replaceChildren(...przyciski);
  wyborDzialu.hidden = dostepne.length < 2;
  const zapisany = dostepne.find((d) => d.id === przypomnij(kluczDzialu()));
  pokazDzial(uczen, zapisany ?? dostepne[0], przyciski);
}

function pokazDzial(uczen, d, przyciski) {
  pamietaj(kluczDzialu(), d.id);
  for (const b of przyciski) b.setAttribute("aria-pressed", String(b.dataset.dzial === d.id));
  const widzi = (r) => ma(uczen, d.id, r) && maMaterialy(d, r);
  widok.replaceChildren(
    el("p", { class: "section-intro dzial-opis" }, d.opis),
    widokTematow(d, widzi, { klucz: `${KLUCZ_TEMATU}.${d.id}`, spis }),
  );
}

// --- Materiały działu albo rozdziału: najpierw temat, potem jedna zakładka – wzory, zadania albo generator.
// Dzięki temu na ekranie jest zawsze tylko to, czego uczeń teraz potrzebuje. Karty pracy obejmują cały dział,
// więc są osobną pozycją na końcu listy tematów.

const KARTY_DZIALU = "__karty";
const POWTORKA = "__powtorka";
const ILE_W_POWTORCE = 10;

/** Zakładki tematu (tylko te, w których coś jest). dt – dział przycięty do jednego tematu. */
function zakladkiTematu(d, dt, t, widzi) {
  const ileZadan = t.zadania.length + (t.cwiczenia?.length ?? 0);
  return [
    dt.wzory.some((w) => w.wzory.length) && {
      id: "wzory", nazwa: d.rozdzial ? "Ściąga" : "Wzory",
      pokaz: () => [blokWzorow(dt)],
    },
    widzi("zadania") && ileZadan > 0 && {
      id: "zadania", nazwa: "Zadania", licznik: ileZadan,
      pokaz: () => [
        t.cwiczenia?.length && blokZadan(dt, OPIS_CWICZEN, { pole: "cwiczenia", tytul: "Zadania do ćwiczeń" }),
        t.zadania.length && blokZadan(dt),
      ].filter(Boolean),
    },
    widzi("generator") && dt.generatory.length > 0 && {
      id: "generator", nazwa: "Generator", licznik: dt.generatory.length > 1 ? dt.generatory.length : null,
      pokaz: () => [blokGeneratora(dt)],
    },
  ].filter(Boolean);
}

/** Wybór tematu i jego zakładki. spis – lista w bocznej kolumnie (na komputerze); na telefonie i bez spisu
 *  temat wybiera się z rozwijanej listy albo z kilku przycisków nad treścią. */
function widokTematow(d, widzi, { klucz, spis: boczny = null }) {
  const tematy = d.tematy
    .map((t) => ({ t, dt: przytnij(d, [t.id]) }))
    .map((x) => ({ ...x, zakladki: zakladkiTematu(d, x.dt, x.t, widzi) }))
    .filter((x) => x.zakladki.length);
  const karty = widzi("karty") && { t: { id: KARTY_DZIALU, nazwa: d.rozdzial ? "Karty pracy z rozdziału" : "Karty pracy do druku" } };
  const powtorka = widzi("generator") && new Set(d.generatory.map((g) => g.temat)).size > 1
    && { t: { id: POWTORKA, nazwa: d.rozdzial ? "Powtórka z rozdziału" : "Powtórka z działu" } };
  const specjalna = (x) => x === karty || x === powtorka;
  const pozycje = [...tematy, powtorka, karty].filter(Boolean);

  const tresc = el("div", { class: "temat" });
  if (!pozycje.length) {
    if (boczny) boczny.hidden = true;
    return el("div", { class: "empty" }, el("strong", {}, "Brak materiałów"), el("p", {}, "W tym dziale nie ma jeszcze nic dla Ciebie."));
  }

  // Lista w bocznej kolumnie (komputer) i rozwijana lista / przyciski nad treścią (telefon).
  const przyciskiBoczne = pozycje.map((x, i) => {
    const b = el("button", { class: `spis-temat${specjalna(x) ? " spis-karty" : ""}`, type: "button", "data-temat": x.t.id },
      specjalna(x) ? x.t.nazwa : el("span", {}, el("span", { class: "spis-nr" }, `${i + 1}.`), ` ${x.t.nazwa}`));
    b.addEventListener("click", () => wybierz(x, { przewin: true }));
    return b;
  });
  if (boczny) {
    boczny.replaceChildren(el("p", { class: "spis-tytul" }, d.rozdzial ? "Tematy rozdziału" : "Tematy"), ...przyciskiBoczne);
    boczny.hidden = false;
  }
  const lista = el("select", { class: "temat-select", "aria-label": "Temat" },
    ...pozycje.map((x, i) => el("option", { value: x.t.id }, specjalna(x) ? `— ${x.t.nazwa}` : `${i + 1}. ${x.t.nazwa}`)));
  lista.addEventListener("change", () => wybierz(pozycje.find((x) => x.t.id === lista.value)));
  const malo = pozycje.length <= 6;
  const chipy = pozycje.map((x) => {
    const b = el("button", { class: "chip", type: "button", "data-temat": x.t.id }, x.t.nazwa);
    b.addEventListener("click", () => wybierz(x));
    return b;
  });
  // powtórka i karty pracy (na końcu listy) oddzielone kreską od tematów
  const pierwszaSpecjalna = pozycje.findIndex(specjalna);
  const chipyZKreska = pierwszaSpecjalna > 0
    ? [...chipy.slice(0, pierwszaSpecjalna), el("span", { class: "chips-kreska", "aria-hidden": "true" }), ...chipy.slice(pierwszaSpecjalna)]
    : chipy;
  const wyborTematu = malo && !boczny
    ? el("div", { class: "wybor-tematu tematy-pasek" },
      el("span", { class: "grupa-etykieta", "aria-hidden": "true" }, d.rozdzial ? "Tematy rozdziału" : "Tematy"),
      el("div", { class: "chips", role: "group", "aria-label": "Temat" }, ...chipyZKreska))
    : el("label", { class: `wybor-tematu${boczny ? " z-boku" : ""}` }, el("span", { class: "field-label" }, "Temat"), lista);

  function wybierz(x, { przewin = false } = {}) {
    pamietaj(klucz, x.t.id);
    lista.value = x.t.id;
    for (const b of [...przyciskiBoczne, ...chipy]) {
      if (b.dataset.temat === x.t.id) b.setAttribute("aria-current", "true");
      else b.removeAttribute("aria-current");
      if (b.classList.contains("chip")) b.setAttribute("aria-pressed", String(b.dataset.temat === x.t.id));
    }
    if (x === karty) {
      tresc.replaceChildren(blokKart(d));
    } else if (x === powtorka) {
      tresc.replaceChildren(blokPowtorki(d));
    } else {
      const i = tematy.indexOf(x);
      const zapisana = przypomnij(KLUCZ_ZAKLADKI);
      let biezaca = x.zakladki.find((z) => z.id === zapisana) ?? x.zakladki[0];
      const panelZakladki = el("div", { class: "zakladka" });
      const przyciski = x.zakladki.map((z) => {
        const b = el("button", { class: "tab", type: "button", "aria-pressed": "false", "data-zakladka": z.id },
          z.nazwa, z.licznik ? el("span", { class: "tab-licznik" }, String(z.licznik)) : null);
        b.addEventListener("click", () => pokazZakladke(z, { zapisz: true }));
        return b;
      });
      const pokazZakladke = (z, { zapisz = false } = {}) => {
        biezaca = z;
        if (zapisz) pamietaj(KLUCZ_ZAKLADKI, z.id);
        for (const b of przyciski) b.setAttribute("aria-pressed", String(b.dataset.zakladka === z.id));
        panelZakladki.replaceChildren(...z.pokaz());
      };
      const sasiad = (j, napis) => tematy[j] && el("button", { class: "btn", type: "button" }, napis(tematy[j].t.nazwa));
      const poprzedni = sasiad(i - 1, (n) => `← ${n}`);
      const nastepny = sasiad(i + 1, (n) => `${n} →`);
      poprzedni?.addEventListener("click", () => wybierz(tematy[i - 1], { przewin: true }));
      nastepny?.addEventListener("click", () => wybierz(tematy[i + 1], { przewin: true }));
      tresc.replaceChildren(
        el("div", { class: "temat-glowa" },
          el("p", { class: "temat-nr" }, `Temat ${i + 1} z ${tematy.length}`),
          el("h3", { class: "temat-tytul" }, x.t.nazwa),
        ),
        x.zakladki.length > 1 && el("div", { class: "tabs zakladki", role: "group", "aria-label": "Co chcesz zobaczyć" }, ...przyciski),
        panelZakladki,
        (poprzedni || nastepny) && el("nav", { class: "temat-dalej", "aria-label": "Inne tematy" }, poprzedni ?? el("span"), nastepny),
      );
      pokazZakladke(biezaca);
    }
    if (przewin) {
      const gora = tresc.getBoundingClientRect().top;
      if (gora < 0 || gora > innerHeight * 0.6) tresc.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const zapisany = pozycje.find((x) => x.t.id === przypomnij(klucz));
  wybierz(zapisany ?? pozycje[0]);
  return el("div", { class: "tematy" }, wyborTematu, tresc);
}

// --- Do szkoły: klasa, rozdział z podręcznika i jego własne materiały (assets/klasy/…)

function pokazKlasy(uczen, lista) {
  // Na przyciskach same numery klas, żeby wszystkie zmieściły się na telefonie.
  const przyciski = lista.map((x) => {
    const b = el("button", { class: "tab", type: "button", "aria-pressed": "false", "aria-label": x.k.nazwa, "data-klasa": x.k.id },
      x.k.nazwa.replace(/^Klasa /, ""));
    b.addEventListener("click", () => pokazKlase(uczen, x, przyciski));
    return b;
  });
  wyborDzialu.setAttribute("aria-label", "Klasa");
  etykietaDzialu.textContent = "Klasa";
  wyborDzialu.replaceChildren(...przyciski);
  wyborDzialu.hidden = lista.length < 2;
  const zapisana = lista.find((x) => x.k.id === przypomnij(`${KLUCZ_KLASY}.${biezacyEgzamin().id}`));
  pokazKlase(uczen, zapisana ?? lista[0], przyciski);
}

/** Klasa: rozdziały ucznia (lista z boku na komputerze, rozwijana nad treścią na telefonie) i materiały wybranego rozdziału. */
function pokazKlase(uczen, { k, rozdzialy }, przyciski) {
  pamietaj(`${KLUCZ_KLASY}.${k.egzamin}`, k.id);
  for (const b of przyciski) b.setAttribute("aria-pressed", String(b.dataset.klasa === k.id));

  const gotowy = (r) => Boolean(r.plik);
  const tresc = el("div", { class: "rozdzial" });
  let wybrany = null;

  async function wybierz(r, { przewin = false } = {}) {
    wybrany = r;
    pamietaj(`${KLUCZ_ROZDZIALU}.${k.id}`, r.id);
    lista.value = r.id;
    for (const b of naLiscie) {
      if (b.dataset.rozdzial === r.id) b.setAttribute("aria-current", "true");
      else b.removeAttribute("aria-current");
    }
    tresc.replaceChildren(naglowekRozdzialu(k, r), el("p", { class: "muted" }, "Wczytuję materiały…"));
    // Uczeń może mieć tylko wybrane tematy rozdziału (szkolaTematy w uczniowie.js).
    const caly = await wczytajRozdzial(k, r).catch(() => null);
    const d = caly && przytnij(caly, tematyRozdzialuUcznia(uczen, r.id));
    if (wybrany !== r) return;   // w międzyczasie uczeń wybrał inny rozdział
    tresc.replaceChildren(
      naglowekRozdzialu(k, r),
      d ? widokTematow(d, (rodzaj) => maMaterialy(d, rodzaj), { klucz: `${KLUCZ_TEMATU}.${r.id}` })
        : el("div", { class: "empty" }, el("strong", {}, "Nie udało się wczytać rozdziału"), el("p", {}, "Odśwież stronę i spróbuj jeszcze raz.")),
    );
    if (przewin && tresc.getBoundingClientRect().top < 0) tresc.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const naLiscie = rozdzialy.map((r) => {
    const b = el("button", {
      class: "spis-temat", type: "button", "data-rozdzial": r.id, disabled: !gotowy(r),
      title: gotowy(r) ? null : "Materiały do tego rozdziału dopiero przygotowuję.",
    }, el("span", {}, el("span", { class: "spis-nr" }, `${r.nr}.`), ` ${r.nazwa}`));
    b.addEventListener("click", () => wybierz(r, { przewin: true }));
    return b;
  });
  const lista = el("select", { class: "temat-select", "aria-label": "Rozdział" },
    ...rozdzialy.map((r) => el("option", { value: r.id, disabled: !gotowy(r) }, `${r.nr}. ${r.nazwa}${gotowy(r) ? "" : " (w przygotowaniu)"}`)));
  lista.addEventListener("change", () => wybierz(rozdzialy.find((r) => r.id === lista.value)));

  spis.replaceChildren(
    el("p", { class: "spis-tytul" }, "Rozdziały"),
    ...naLiscie,
    el("p", { class: "spis-uwaga" }, `Kolejność jak w podręczniku: ${k.podrecznik}.`),
  );
  spis.hidden = false;
  const gotowe = rozdzialy.filter(gotowy);
  widok.replaceChildren(...[
    gotowe.length && el("label", { class: "wybor-tematu z-boku" }, el("span", { class: "field-label" }, "Rozdział"), lista),
    gotowe.length ? tresc : el("div", { class: "empty" },
      el("strong", {}, "Materiały w przygotowaniu"),
      el("p", {}, "Rozdziały tej klasy dopiero przygotowuję. Zajrzyj tu wkrótce."),
    ),
  ].filter(Boolean));
  if (gotowe.length) wybierz(gotowe.find((r) => r.id === przypomnij(`${KLUCZ_ROZDZIALU}.${k.id}`)) ?? gotowe[0]);
}

function naglowekRozdzialu(k, r) {
  return el("div", { class: "temat-glowa" },
    el("p", { class: "temat-nr" }, `${k.nazwa} · rozdział ${r.nr}`),
    el("h3", { class: "temat-tytul" }, r.nazwa),
    el("p", { class: "rozdzial-opis" }, r.opis),
  );
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

/** Pole karty wzoru: zwykle jeden akapit; tekst z „\n\n” (np. z tabelką prawdy) – kilka akapitów w jednym bloku. */
const poleKarty = (klasa, t) =>
  (t.includes("\n\n") ? wstaw(el("div", { class: `${klasa} wzor-akapity` }), t) : wstaw(el("p", { class: klasa }), t, { akapity: false }));

/** Przycisk pod wykresem na karcie: otwiera ten wykres w kalkulatorze graficznym (assets/narzedzia.js), żeby go przesuwać i zmieniać. */
function przyciskWykresu(opis) {
  const b = el("button", { class: "btn btn-small rys-otworz", type: "button" }, "Otwórz w kalkulatorze graficznym");
  b.addEventListener("click", () => window.dispatchEvent(new CustomEvent("narzedzia:wykres", { detail: opis })));
  return el("div", { class: "rys-akcje" }, b);
}

function blokWzorow(d) {
  let temat = d.wzory[0];
  const tresc = el("div", { class: "wzory-tresc" });

  const pokaz = () => {
    const karty = el("div", { class: "wzory-grid" },
      ...temat.wzory.map((w) =>
        el("div", { class: "wzor-karta" },
          wstaw(el("p", { class: "wzor-nazwa" }), w.nazwa, { akapity: false }),
          w.slownie && poleKarty("wzor-slownie", w.slownie),
          w.tex && el("div", { class: "wzor-tex" }, ...czesciWzoru(w.tex).map((t) => wstaw(el("div", { class: "wzor-czesc" }), `$${t}$`))),
          rysunekKarty(w),
          w.wykres && przyciskWykresu(w.wykres),
          w.litery && poleKarty("wzor-litery", w.litery),
          w.przyklad && poleKarty("wzor-przyklad", `**Przykład:** ${w.przyklad}`),
          w.uwaga && poleKarty("wzor-uwaga", w.uwaga),
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
    przyciski.length > 1 && el("div", { class: "chips", role: "group", "aria-label": "Temat wzorów" }, ...przyciski),
    tresc,
  );
}

// --- Zadania z arkuszy CKE (zamknięte i otwarte), posortowane po tematach,
// i tak samo pokazane zadania do ćwiczeń ułożone dla strony (pole cwiczenia tematu)

const OPIS_CWICZEN = "Zadania na poziomie szkolnym, posortowane według tematów: zamknięte – zaznacz odpowiedź i kliknij „Sprawdź odpowiedź”, otwarte – rozwiąż na kartce i porównaj z rozwiązaniem.";

function blokZadan(d, intro = opisZadan(d), { pole = "zadania", tytul = egzamin(d.egzamin).zadania } = {}) {
  const tematy = d.tematy.filter((t) => t[pole].length).map((t) => ({ ...t, zadania: t[pole] }));
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
    el("div", { class: "blok-head" }, el("h3", {}, tytul), licznik),
    el("p", { class: "blok-intro" }, intro),
    przyciski.length > 1 && el("div", { class: "chips", role: "group", "aria-label": "Temat zadań" }, ...przyciski),
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
    el("p", { class: "rozwiazanie-tytul" }, z.wlasne ? "Rozwiązanie" : "Przykładowe rozwiązanie (klucz CKE)"),
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
    tematy.length > 1 && el("div", { class: "chips", role: "group", "aria-label": "Rodzaj zadań" }, ...tematy),
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

function widokZadania(z, { temat, poprawne, nastepne, napisNastepne = "Nowe zadanie" }) {
  const tresc = wstaw(el("div", { class: "gen-tresc", tabindex: "-1", "aria-label": `Zadanie: ${temat}` }), z.tresc);
  const pola = new Map(z.pola.map((p) => [p.id, widokPola(p)]));
  const form = el("form", { class: "gen-form", novalidate: true },
    el("div", { class: "fields" }, ...[...pola.values()].map((p) => p.node)),
  );
  if (form.querySelector("input.num")) form.append(klawisze(form));

  const sprawdzPrzycisk = el("button", { class: "btn btn-primary", type: "submit" }, "Sprawdź");
  const rozwPrzycisk = el("button", { class: "btn", type: "button", "aria-expanded": "false" }, "Pokaż rozwiązanie");
  const nowePrzycisk = el("button", { class: "btn", type: "button" }, napisNastepne);
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

// --- Powtórka: kilka zadań z generatorów całego rozdziału (działu), z każdego tematu po trochu, w losowej kolejności

function blokPowtorki(d) {
  const nazwyTematow = new Map(d.tematy.map((t) => [t.id, t.nazwa]));
  const karta = el("div", { class: "gen-card" });
  const postep = el("span", { class: "gen-count", "aria-live": "polite" });
  let zestaw = [], i = 0, rozwiazane = 0;

  function losuj() {
    const r = losownik(losoweZiarno());
    const wgTematu = new Map();
    for (const g of d.generatory) wgTematu.set(g.temat, [...(wgTematu.get(g.temat) ?? []), g]);
    const grupy = r.shuffle([...wgTematu.values()].map((l) => r.shuffle([...l])));
    zestaw = Array.from({ length: ILE_W_POWTORCE }, (_, k) => {
      const grupa = grupy[k % grupy.length];
      return grupa[Math.floor(k / grupy.length) % grupa.length];
    });
    zestaw = r.shuffle(zestaw);
    i = 0;
    rozwiazane = 0;
    pokaz({ fokus: false });
  }

  function pokaz({ fokus = true } = {}) {
    if (i >= zestaw.length) {
      postep.textContent = "";
      const nowa = el("button", { class: "btn btn-primary", type: "button" }, "Nowa powtórka");
      nowa.addEventListener("click", () => losuj());
      karta.replaceChildren(el("div", { class: "powtorka-koniec" },
        el("strong", {}, "Koniec powtórki"),
        el("p", {}, `Dobrze rozwiązane bez podglądania rozwiązania: ${rozwiazane} z ${zestaw.length}. Każda powtórka ma inne zadania.`),
        nowa));
      nowa.focus({ preventScroll: true });
      return;
    }
    const g = zestaw[i];
    const zadanie = g.generuj(losownik(losoweZiarno()));
    postep.textContent = `Zadanie ${i + 1} z ${zestaw.length}`;
    karta.replaceChildren(
      el("p", { class: "powtorka-temat" }, `${nazwyTematow.get(g.temat) ?? ""} · ${g.nazwa}`),
      ...widokZadania(zadanie, {
        temat: g.nazwa,
        poprawne: () => { rozwiazane++; },
        nastepne: () => { i++; pokaz(); },
        napisNastepne: i + 1 < zestaw.length ? "Następne zadanie" : "Zakończ powtórkę",
      }));
    if (fokus) karta.querySelector(".gen-tresc")?.focus({ preventScroll: true });
  }

  losuj();
  return el("section", { class: "blok" },
    el("div", { class: "blok-head" }, el("h3", {}, d.rozdzial ? "Powtórka z rozdziału" : "Powtórka z działu"), postep),
    el("p", { class: "blok-intro" }, `${ILE_W_POWTORCE} zadań z różnych tematów, za każdym razem innych. Dobre przed sprawdzianem: rozwiąż je po kolei, a gdy utkniesz, zajrzyj do rozwiązania.`),
    karta,
  );
}

// --- Karty pracy

function blokKart(d) {
  const ile = zadan(d.generatory.length * zadanNaGenerator(d));
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
    d.wzory.some((t) => t.wzory.length) && el("h4", { class: "blok-sub" }, d.rozdzial ? "Ściąga do druku" : "Wzory do druku"),
    d.wzory.some((t) => t.wzory.length) && el("ul", { class: "sheet-list" },
      link(`karta.html?${skad}&sciaga=1`, d.rozdzial ? "Ściąga z całego rozdziału" : "Wzory z całego działu", "wzory, rysunki i przykłady ze wszystkich tematów")),
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
