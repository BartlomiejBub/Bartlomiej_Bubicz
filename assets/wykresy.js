// Kalkulator graficzny w wysuwanym panelu (assets/narzedzia.js).
// Każdy wiersz to jedno z: wykres funkcji (y = 2x + 1, albo samo 2x + 1), funkcja z nazwą (f(x) = x² − 4),
// prosta pionowa (x = 3), punkt ((2; 3) albo (2, 3)), suwak (a = 1 – litera, której używają inne wiersze)
// i równanie z x i y w dowolnej kolejności (x + y = 4, 2x − 3y = 6, x² + y² = 9). Równanie liniowe względem y
// zamieniamy na funkcję (ma wtedy miejsca zerowe i punkty przecięcia), inne rysujemy jako krzywą.
// Osobny rodzaj wiersza to tabelka x | y: wartości y wpisane ręcznie albo wyliczone z wybranego wykresu.
// Wykres można przesuwać (przeciąganie), przybliżać (kółko myszy, dwa palce, przyciski + i −).
// Na wykresie zaznaczamy miejsca zerowe, przecięcia z osią OY, wierzchołki (ekstrema) i punkty przecięcia wykresów.
import { el } from "./dom.js";
import { parsuj, kompiluj, formatuj, BladWyrazenia } from "./wyrazenia.js";

const KLUCZ = "wykresy-v1";
// Kolory wykresów: mocne i wyraźnie różne od siebie i od morskiego koloru strony (niebieski, czerwony, zielony…).
const KOLORY = ["#2563eb", "#dc2626", "#16a34a", "#9333ea", "#ea580c", "#0891b2", "#db2777", "#475569"];
// W ciemnym motywie te same kolory w jaśniejszej wersji – ciemne linie na ciemnym tle byłyby słabo widoczne.
const NA_CIEMNE = {
  "#2563eb": "#60a5fa", "#dc2626": "#f87171", "#16a34a": "#4ade80", "#9333ea": "#c084fc",
  "#ea580c": "#fb923c", "#0891b2": "#22d3ee", "#db2777": "#f472b6", "#475569": "#cbd5e1",
};
const ciemny = () => document.documentElement.dataset.motyw === "ciemny";
const naEkran = (kolor) => (ciemny() ? NA_CIEMNE[kolor] ?? kolor : kolor);
const PRZYKLADY = ["y = 2x − 3", "y = x² − 2x − 3", "y = a(x − p)² + q", "f(x) = |x − 1|", "y = 1/x", "x + y = 4", "x² + y² = 9", "(2; 3)", "x = −1"];
const ZAREZERWOWANE = new Set(["x", "y", "e"]);
const SKALA_START = 30;

let licznik = 0;
const noweId = () => `w${Date.now().toString(36)}${(licznik++).toString(36)}`;

function wczytaj() {
  try { return JSON.parse(localStorage.getItem(KLUCZ)); } catch { return null; }
}

/** Ładny krok siatki: 1, 2 albo 5 razy potęga 10. */
function ladnyKrok(surowy) {
  const p = 10 ** Math.floor(Math.log10(surowy));
  const m = surowy / p;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
}

/** Współrzędna do pokazania: zaokrąglona do 3 miejsc, z przecinkiem; −0 jako 0. */
function wsp(v) {
  const r = Math.round(v * 1000) / 1000;
  return formatuj(Object.is(r, -0) ? 0 : r, 8) ?? "?";
}

/** Dzieli „(2; 3)” albo „(2, 3)” na dwie części (na najwyższym poziomie nawiasów). */
function czesciPunktu(tekst) {
  const t = tekst.trim();
  if (!t.startsWith("(") || !t.endsWith(")")) return null;
  const s = t.slice(1, -1);
  let gl = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "(" || c === "[") gl++;
    else if (c === ")" || c === "]") gl--;
    else if (gl === 0 && (c === ";" || (c === "," && !(/[0-9]/.test(s[i - 1] ?? "") && /[0-9]/.test(s[i + 1] ?? ""))))) {
      return [s.slice(0, i), s.slice(i + 1)];
    }
  }
  return null;
}

/**
 * Wiersze → obiekty do narysowania. Najpierw suwaki (a = 2), potem funkcje z nazwą, na końcu reszta.
 * Każdy wiersz dostaje { rodzaj, blad?, brakujace? }; rodzaj: funkcja | pionowa | punkt | suwak | pusty.
 */
function analizuj(wiersze, stopnie) {
  const wyniki = new Map();
  const parametry = {};
  const nazwane = new Map();   // f → id wiersza
  const wstepne = wiersze.map((w) => {
    if (w.typ === "tabela") return { w, rodzaj: "tabela" };
    const t = w.tekst.trim();
    if (!t) return { w, rodzaj: "pusty" };
    const pkt = czesciPunktu(t);
    if (pkt && !t.includes("=")) return { w, rodzaj: "punkt", czesci: pkt };
    const rowne = t.indexOf("=");
    if (rowne < 0) return { w, rodzaj: "funkcja", prawa: t };
    const lewa = t.slice(0, rowne).trim(), prawa = t.slice(rowne + 1).trim();
    if (prawa.includes("=")) return { w, rodzaj: "blad", blad: "W wierszu może być tylko jeden znak „=”." };
    if (!prawa) return { w, rodzaj: "blad", blad: "Po „=” wpisz wzór." };
    if (lewa === "y") return /y/.test(prawa) ? { w, rodzaj: "rownanie", lewa, prawa } : { w, rodzaj: "funkcja", prawa };
    const nazwa = lewa.match(/^([a-df-wz])\s*\(\s*x\s*\)$/);
    if (nazwa) return { w, rodzaj: "funkcja", prawa, nazwa: nazwa[1] };
    if (lewa === "x") return /[xy]/.test(prawa) ? { w, rodzaj: "rownanie", lewa, prawa } : { w, rodzaj: "pionowa", prawa };
    if (/^[a-zA-Z]$/.test(lewa) && !ZAREZERWOWANE.has(lewa)) return { w, rodzaj: "suwak", nazwa: lewa, prawa };
    return { w, rodzaj: "rownanie", lewa, prawa };
  });

  // suwaki: wartość to liczba (bez liter)
  for (const o of wstepne.filter((o) => o.rodzaj === "suwak")) {
    try {
      const { fn, zmienne } = kompiluj(parsuj(o.prawa), { stopnie });
      if (zmienne.size) throw new BladWyrazenia("Wartość suwaka to liczba, bez liter.");
      const v = fn({});
      if (!Number.isFinite(v)) throw new BladWyrazenia("Ta wartość nie istnieje.");
      if (o.nazwa in parametry) throw new BladWyrazenia(`Litera „${o.nazwa}” ma już suwak.`);
      parametry[o.nazwa] = v;
      wyniki.set(o.w.id, { rodzaj: "suwak", nazwa: o.nazwa, wartosc: v });
    } catch (e) { wyniki.set(o.w.id, { rodzaj: "blad", blad: e.message }); }
  }
  for (const o of wstepne) if (o.rodzaj === "funkcja" && o.nazwa) {
    if (nazwane.has(o.nazwa)) wyniki.set(o.w.id, { rodzaj: "blad", blad: `Funkcja ${o.nazwa}(x) jest już zdefiniowana.` });
    else nazwane.set(o.nazwa, o.w.id);
  }
  const funkcjeNazwane = new Set(nazwane.keys());
  const znane = new Set([...Object.keys(parametry)]);
  const brakujace = (zmienne, dozwolone) => [...zmienne].filter((n) => !dozwolone.has(n) && !znane.has(n));

  const skompilowane = {};
  for (const o of wstepne) {
    if (wyniki.has(o.w.id)) continue;
    try {
      if (o.rodzaj === "pusty") { wyniki.set(o.w.id, { rodzaj: "pusty" }); continue; }
      if (o.rodzaj === "tabela") { wyniki.set(o.w.id, { rodzaj: "tabela", w: o.w, punkty: [] }); continue; }
      if (o.rodzaj === "rownanie") {
        const L = kompiluj(parsuj(o.lewa, { funkcje: funkcjeNazwane }), { stopnie });
        const R = kompiluj(parsuj(o.prawa, { funkcje: funkcjeNazwane }), { stopnie });
        const zm = new Set([...L.zmienne, ...R.zmienne]);
        if (!zm.has("x") && !zm.has("y")) throw new BladWyrazenia("Zacznij od „y =”, „f(x) =”, „x =” albo litery suwaka, np. „a = 2”. Równanie musi mieć x albo y.");
        const brak = brakujace(zm, new Set(["x", "y"]));
        if (brak.length) { wyniki.set(o.w.id, { rodzaj: "blad", blad: `Nie znam litery ${brak.map((b) => `„${b}”`).join(", ")}.`, brakujace: brak }); continue; }
        wyniki.set(o.w.id, { rodzaj: "rownanie", gl: L.fn, gp: R.fn });
        continue;
      }
      if (o.rodzaj === "blad") { wyniki.set(o.w.id, { rodzaj: "blad", blad: o.blad }); continue; }
      if (o.rodzaj === "funkcja") {
        const { fn, zmienne, wywolania } = kompiluj(parsuj(o.prawa, { funkcje: funkcjeNazwane }), { stopnie });
        if (zmienne.has("y")) throw new BladWyrazenia("Po prawej stronie nie może być y. Wpisz wzór z x, np. y = 2x + 1.");
        if (o.nazwa && wywolania.has(o.nazwa)) throw new BladWyrazenia(`Funkcja ${o.nazwa}(x) nie może korzystać sama ze siebie.`);
        const brak = brakujace(zmienne, new Set(["x"]));
        if (brak.length) { wyniki.set(o.w.id, { rodzaj: "blad", blad: `Nie znam litery ${brak.map((b) => `„${b}”`).join(", ")}.`, brakujace: brak }); continue; }
        const r = { rodzaj: "funkcja", fn, nazwa: o.nazwa };
        if (o.nazwa) skompilowane[o.nazwa] = fn;
        wyniki.set(o.w.id, r);
        continue;
      }
      if (o.rodzaj === "pionowa") {
        const { fn, zmienne } = kompiluj(parsuj(o.prawa, { funkcje: funkcjeNazwane }), { stopnie });
        if (zmienne.has("x") || zmienne.has("y")) throw new BladWyrazenia("Prosta pionowa: po „x =” wpisz liczbę, np. x = 3.");
        const brak = brakujace(zmienne, new Set());
        if (brak.length) { wyniki.set(o.w.id, { rodzaj: "blad", blad: `Nie znam litery ${brak.map((b) => `„${b}”`).join(", ")}.`, brakujace: brak }); continue; }
        wyniki.set(o.w.id, { rodzaj: "pionowa", fn });
        continue;
      }
      if (o.rodzaj === "punkt") {
        const [fx, fy] = o.czesci.map((c) => kompiluj(parsuj(c, { funkcje: funkcjeNazwane }), { stopnie }));
        const zm = new Set([...fx.zmienne, ...fy.zmienne]);
        if (zm.has("x") || zm.has("y")) throw new BladWyrazenia("Współrzędne punktu to liczby, np. (2; 3).");
        const brak = brakujace(zm, new Set());
        if (brak.length) { wyniki.set(o.w.id, { rodzaj: "blad", blad: `Nie znam litery ${brak.map((b) => `„${b}”`).join(", ")}.`, brakujace: brak }); continue; }
        wyniki.set(o.w.id, { rodzaj: "punkt", fx: fx.fn, fy: fy.fn });
      }
    } catch (e) {
      if (!(e instanceof BladWyrazenia)) throw e;
      wyniki.set(o.w.id, { rodzaj: "blad", blad: e.message });
    }
  }

  // funkcje z nazwą dostępne w innych wierszach: f(2), f(x) + 1
  const glebokosc = { n: 0 };
  const funkcje = {};
  const stanBazowy = { ...parametry, funkcje };
  for (const [nazwa, fn] of Object.entries(skompilowane)) {
    funkcje[nazwa] = (x) => {
      if (glebokosc.n > 20) return NaN;
      glebokosc.n++;
      try { return fn({ ...stanBazowy, x }); } finally { glebokosc.n--; }
    };
  }
  for (const r of wyniki.values()) {
    if (r.rodzaj === "funkcja") { const fn = r.fn; r.f = (x) => fn({ ...stanBazowy, x }); }
    if (r.rodzaj === "pionowa") r.x = r.fn(stanBazowy);
    if (r.rodzaj === "punkt") { r.x = r.fx(stanBazowy); r.y = r.fy(stanBazowy); }
    if (r.rodzaj === "rownanie") zamienRownanie(r, stanBazowy);
  }
  // tabelki na końcu – mogą brać y z funkcji z innych wierszy
  for (const r of wyniki.values()) if (r.rodzaj === "tabela") policzTabele(r, wyniki, stanBazowy, stopnie);
  return wyniki;
}

/** Równanie G(x, y) = 0 (G = lewa − prawa). Jeśli G jest liniowe względem y (x + y = 4, 2x − 3y = 6, xy = 1),
 *  wyliczamy y = −G(x, 0) / (G(x, 1) − G(x, 0)) i to jest zwykła funkcja; w innym razie krzywa (x² + y² = 9). */
function zamienRownanie(r, baza) {
  const G = (x, y) => r.gl({ ...baza, x, y }) - r.gp({ ...baza, x, y });
  let liniowa = true, zalezyOdY = false, probki = 0;
  for (const x of [-3.7, -1.3, 0.6, 2.2, 4.9, 7.3]) {
    const g0 = G(x, 0), g1 = G(x, 1), g2 = G(x, 2), g3 = G(x, -3);
    if (![g0, g1, g2, g3].every(Number.isFinite)) continue;
    probki++;
    const a = g1 - g0, skala = 1 + Math.abs(g0) + Math.abs(g1) + Math.abs(g2) + Math.abs(g3);
    if (Math.abs(a) > 1e-9 * skala) zalezyOdY = true;
    if (Math.abs(g2 - g0 - 2 * a) > 1e-9 * skala || Math.abs(g3 - g0 + 3 * a) > 1e-9 * skala) liniowa = false;
  }
  if (probki && liniowa && zalezyOdY) {
    r.rodzaj = "funkcja";
    r.zRownania = true;
    r.f = (x) => { const g0 = G(x, 0), a = G(x, 1) - g0; return Math.abs(a) < 1e-12 ? NaN : -g0 / a; };
  } else {
    r.rodzaj = "krzywa";
    r.G = G;
  }
}

/** Punkty tabelki: x z komórek, y z komórek albo z wybranej funkcji. Pusta komórka – null, błędna – NaN. */
function policzTabele(r, wyniki, baza, stopnie) {
  const w = r.w;
  const liczba = (tekst) => {
    if (!String(tekst ?? "").trim()) return null;
    try {
      const { fn, zmienne } = kompiluj(parsuj(String(tekst)), { stopnie });
      if ([...zmienne].some((n) => !(n in baza))) return NaN;
      const v = fn(baza);
      return Number.isFinite(v) ? v : NaN;
    } catch { return NaN; }
  };
  const zrodlo = w.zrodlo ? wyniki.get(w.zrodlo) : null;
  const f = zrodlo?.rodzaj === "funkcja" ? zrodlo.f : null;
  r.zFunkcji = Boolean(f);
  r.punkty = w.xs.map((tx, i) => {
    const x = liczba(tx);
    const y = f ? (x === null || Number.isNaN(x) ? null : f(x)) : liczba(w.ys[i]);
    return { x, y };
  });
}

/** Zapisany wiersz → wiersz w stanie (kolory sprzed zmiany palety dostają nowe). */
function wczytajWiersz(w, i) {
  const kolor = KOLORY.includes(w.kolor) ? w.kolor : KOLORY[i % KOLORY.length];
  const id = typeof w.id === "string" && w.id ? w.id : noweId();
  if (w.typ === "tabela") {
    const xs = Array.isArray(w.xs) ? w.xs.map(String) : [""];
    const ys = Array.isArray(w.ys) ? w.ys.map(String) : [];
    while (ys.length < xs.length) ys.push("");
    return { id, typ: "tabela", tekst: "", kolor, ukryty: !!w.ukryty, xs, ys: ys.slice(0, xs.length), zrodlo: w.zrodlo ?? null };
  }
  return { id, tekst: String(w.tekst ?? ""), kolor, ukryty: !!w.ukryty };
}
const doZapisu = (w) => (w.typ === "tabela"
  ? { id: w.id, typ: "tabela", kolor: w.kolor, ukryty: w.ukryty, xs: w.xs, ys: w.ys, zrodlo: w.zrodlo }
  : { id: w.id, tekst: w.tekst, kolor: w.kolor, ukryty: w.ukryty });

export function zbudujWykresy(kontener) {
  const zapis = wczytaj();
  const stan = {
    wiersze: Array.isArray(zapis?.wiersze) && zapis.wiersze.length
      ? zapis.wiersze.map(wczytajWiersz)
      : [{ id: noweId(), tekst: "", kolor: KOLORY[0], ukryty: false }],
    // wiersze ucznia schowane, gdy pokazaliśmy wzór z zadania („Przywróć moje wiersze”)
    poprzednie: Array.isArray(zapis?.poprzednie) && zapis.poprzednie.length ? zapis.poprzednie.map(wczytajWiersz) : null,
    zWzoru: !!zapis?.zWzoru,
    stopnie: !!zapis?.stopnie,
    widok: zapis?.widok && Number.isFinite(zapis.widok.skala) ? zapis.widok : { cx: 0, cy: 0, skala: SKALA_START },
  };
  let wyniki = new Map();
  let punktySpecjalne = [];
  let wskazany = null;   // { x, y, opis, kolor }

  const zapisz = () => {
    try {
      localStorage.setItem(KLUCZ, JSON.stringify({
        wiersze: stan.wiersze.map(doZapisu), poprzednie: stan.poprzednie?.map(doZapisu) ?? null, zWzoru: stan.zWzoru,
        stopnie: stan.stopnie, widok: stan.widok,
      }));
    } catch { /* prywatne okno */ }
  };

  // --- Elementy
  const plotno = el("canvas", { class: "wyk-plotno", role: "img", "aria-label": "Wykresy funkcji" });
  const dymek = el("div", { class: "wyk-dymek", hidden: true });
  const przyciskWidoku = (napis, opis, akcja) => {
    const b = el("button", { type: "button", class: "wyk-zoom", "aria-label": opis, title: opis }, napis);
    b.addEventListener("click", akcja);
    return b;
  };
  const sterowanie = el("div", { class: "wyk-sterowanie" },
    przyciskWidoku("+", "Przybliż", () => przybliz(1.5)),
    przyciskWidoku("−", "Oddal", () => przybliz(1 / 1.5)),
    przyciskWidoku("⌂", "Widok początkowy", () => { stan.widok = { cx: 0, cy: 0, skala: SKALA_START }; rysuj(); zapisz(); }));
  const obszar = el("div", { class: "wyk-obszar" }, plotno, sterowanie, dymek);
  const lista = el("div", { class: "wyk-lista" });
  const jednostki = el("div", { class: "przelacznik-maly", role: "group", "aria-label": "Jednostka kąta w funkcjach trygonometrycznych" });
  for (const [wartosc, napis] of [[false, "radiany"], [true, "stopnie"]]) {
    const b = el("button", { type: "button", "aria-pressed": String(stan.stopnie === wartosc) }, napis);
    b.addEventListener("click", () => {
      stan.stopnie = wartosc;
      for (const x of jednostki.children) x.setAttribute("aria-pressed", String(x === b));
      przelicz();
      zapisz();
    });
    jednostki.append(b);
  }
  const dodaj = el("button", { type: "button", class: "btn btn-small" }, "+ Wiersz");
  dodaj.addEventListener("click", () => { const w = dodajWiersz(""); przelicz(); fokus(w); });
  const dodajTabelke = el("button", { type: "button", class: "btn btn-small", title: "Tabelka wartości x i y – punkty pojawią się na wykresie" }, "+ Tabelka");
  dodajTabelke.addEventListener("click", () => { const w = dodajTabele(); przelicz(); zapisz(); fokus(w); });
  const przywroc = el("button", { type: "button", class: "btn btn-small wyk-przywroc", hidden: true, title: "Zamień na wiersze sprzed pokazania wzoru z zadania (i z powrotem)" }, "↶ Poprzednie wiersze");
  przywroc.addEventListener("click", () => {
    if (!stan.poprzednie) return;
    // zamiana w obie strony – bieżące wiersze nie giną, można do nich wrócić tym samym przyciskiem
    const teraz = stan.wiersze.filter((w) => w.typ === "tabela" || w.tekst.trim());
    stan.wiersze = stan.poprzednie;
    stan.poprzednie = teraz.length ? teraz : null;
    stan.zWzoru = false;
    przelicz();
    zapisz();
  });
  const pustyWiersz = () => stan.wiersze.find((w) => w.typ !== "tabela" && !w.tekst.trim());
  const przyklady = el("p", { class: "wyk-przyklady" }, "Przykłady: ", ...PRZYKLADY.flatMap((p, i) => {
    const b = el("button", { type: "button", class: "wyk-przyklad" }, p);
    b.addEventListener("click", () => {
      const w = pustyWiersz() ?? dodajWiersz("");
      w.tekst = p;
      if (p.includes("a(x − p)")) for (const [n, v] of [["a", "1"], ["p", "2"], ["q", "−1"]]) if (!stan.wiersze.some((x) => x.tekst.replace(/\s/g, "").startsWith(`${n}=`))) dodajWiersz(`${n} = ${v}`);
      przelicz();
      zapisz();
    });
    return i ? [" · ", b] : [b];
  }));
  const pomoc = el("details", { class: "kalk-pomoc" },
    el("summary", {}, "Jak wpisywać?"),
    el("ul", {},
      el("li", {}, "Wykres funkcji: y = 2x − 3 albo samo 2x − 3. Potęga: x^2 albo x², pierwiastek: √x albo sqrt(x), wartość bezwzględna: |x|."),
      el("li", {}, "Funkcja z nazwą: f(x) = x² − 4, a potem np. y = f(x − 2) + 1. Prosta pionowa: x = 3. Punkt: (2; 3)."),
      el("li", {}, "Równanie z x i y w dowolnej kolejności: x + y = 4, 2x − 3y = 6, x = y² albo okrąg x² + y² = 9."),
      el("li", {}, "„+ Tabelka” dodaje tabelkę x | y. Wartości y wpisujesz sam albo wybierasz wykres, z którego mają się policzyć – punkty od razu widać na wykresie."),
      el("li", {}, "Przy wzorach funkcji w zadaniach i na kartach jest ikonka wykresu – kliknij ją (albo sam wzór), a funkcja pokaże się tutaj."),
      el("li", {}, "Litera inna niż x (np. a) to suwak: wpisz a = 1 albo kliknij „Dodaj suwak”. Przesuwaj suwak i patrz, jak zmienia się wykres."),
      el("li", {}, "Szare kropki to miejsca zerowe, przecięcia z osią OY, wierzchołki i punkty przecięcia wykresów – najedź albo dotknij, żeby zobaczyć współrzędne."),
      el("li", {}, "Wykres przesuwasz, przeciągając go. Przybliżasz kółkiem myszy, dwoma palcami albo przyciskami + i −.")));

  kontener.append(el("div", { class: "wyk" },
    obszar,
    el("div", { class: "wyk-dol" },
      el("div", { class: "wyk-pasek" }, jednostki, el("div", { class: "wyk-pasek-przyciski" }, przywroc, dodajTabelke, dodaj)),
      lista, przyklady, pomoc)));

  // --- Wiersze
  const widokiWierszy = new Map();
  const wolnyKolor = () => {
    const uzyte = new Set(stan.wiersze.map((w) => w.kolor));
    return KOLORY.find((k) => !uzyte.has(k)) ?? KOLORY[stan.wiersze.length % KOLORY.length];
  };
  function dodajWiersz(tekst) {
    const w = { id: noweId(), tekst, kolor: wolnyKolor(), ukryty: false };
    stan.wiersze.push(w);
    return w;
  }
  /** Tabelka x | y; jeśli jest jakiś wykres funkcji, od razu liczy z niego y (tabelka wartości funkcji). */
  function dodajTabele() {
    const zrodlo = stan.wiersze.find((x) => x.typ !== "tabela" && !x.ukryty && wyniki.get(x.id)?.rodzaj === "funkcja");
    const w = { id: noweId(), typ: "tabela", tekst: "", kolor: wolnyKolor(), ukryty: false, xs: ["−2", "−1", "0", "1", "2"], ys: ["", "", "", "", ""], zrodlo: zrodlo?.id ?? null };
    stan.wiersze.push(w);
    stan.zWzoru = false;
    return w;
  }
  function fokus(w) {
    const v = widokiWierszy.get(w.id);
    if (v?.pole) v.pole.focus();
    else v?.fokus?.();
  }

  function widokWiersza(w) {
    const kropka = el("button", { type: "button", class: "wyk-kolor", "aria-pressed": String(!w.ukryty), title: "Pokaż albo ukryj wykres", "aria-label": "Pokaż albo ukryj wykres" });
    const pole = el("input", { class: "wyk-pole", type: "text", value: w.tekst, spellcheck: "false", autocomplete: "off", "aria-label": "Wzór", placeholder: "np. y = 2x + 1" });
    const usun = el("button", { type: "button", class: "wyk-usun", "aria-label": "Usuń wiersz", title: "Usuń wiersz" }, "×");
    const info = el("div", { class: "wyk-info" });
    const wiersz = el("div", { class: "wyk-wiersz" }, kropka, pole, usun, info);
    kropka.addEventListener("click", () => { w.ukryty = !w.ukryty; przelicz(); zapisz(); });
    pole.addEventListener("input", () => { w.tekst = pole.value; stan.zWzoru = false; przelicz(); zapisz(); });
    pole.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const i = stan.wiersze.indexOf(w);
        const nast = stan.wiersze[i + 1] ?? (w.tekst.trim() ? dodajWiersz("") : null);
        przelicz();
        if (nast) fokus(nast);
      }
    });
    usun.addEventListener("click", () => {
      stan.wiersze = stan.wiersze.filter((x) => x !== w);
      if (!stan.wiersze.length) dodajWiersz("");
      przelicz();
      zapisz();
    });
    return { wiersz, kropka, pole, info };
  }

  function widokTabeli(w) {
    const kropka = el("button", { type: "button", class: "wyk-kolor", "aria-pressed": String(!w.ukryty), title: "Pokaż albo ukryj punkty", "aria-label": "Pokaż albo ukryj punkty tabelki" });
    const usun = el("button", { type: "button", class: "wyk-usun", "aria-label": "Usuń tabelkę", title: "Usuń tabelkę" }, "×");
    const zrodlo = el("select", { class: "wyk-tabela-zrodlo", "aria-label": "Skąd brać wartości y" });
    const cialo = el("tbody");
    const tabela = el("table", { class: "wyk-tabela" },
      el("thead", {}, el("tr", {}, el("th", { scope: "col" }, "x"), el("th", { scope: "col" }, "y"), el("th", {}, el("span", { class: "visually-hidden" }, "Usuń")))),
      cialo);
    const dodajW = el("button", { type: "button", class: "btn btn-small" }, "+ wiersz tabelki");
    const info = el("div", { class: "wyk-info wyk-tabela-info" },
      el("label", { class: "wyk-tabela-wybor" }, el("span", {}, "Wartości y:"), zrodlo), tabela, dodajW);
    const wiersz = el("div", { class: "wyk-wiersz wyk-wiersz-tabela" }, kropka, el("span", { class: "wyk-tabela-tytul" }, "Tabelka"), usun, info);
    let komorki = [];
    const zmiana = () => { stan.zWzoru = false; przelicz(); zapisz(); };

    function zbudujWiersze() {
      komorki = w.xs.map((_, i) => {
        const wx = el("input", { type: "text", class: "wyk-komorka", value: w.xs[i], spellcheck: "false", autocomplete: "off", "aria-label": `x w wierszu ${i + 1}` });
        const wy = el("input", { type: "text", class: "wyk-komorka", value: w.ys[i] ?? "", spellcheck: "false", autocomplete: "off", "aria-label": `y w wierszu ${i + 1}` });
        const x = el("button", { type: "button", class: "wyk-usun wyk-usun-maly", "aria-label": `Usuń wiersz ${i + 1} tabelki`, title: "Usuń wiersz" }, "×");
        wx.addEventListener("input", () => { w.xs[i] = wx.value; zmiana(); });
        wy.addEventListener("input", () => { w.ys[i] = wy.value; zmiana(); });
        for (const [pole, kolumna] of [[wx, "wx"], [wy, "wy"]]) {
          pole.addEventListener("keydown", (e) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            if (i === w.xs.length - 1) dodajWierszTabelki();
            komorki[i + 1]?.[kolumna].focus();
          });
        }
        x.addEventListener("click", () => {
          w.xs.splice(i, 1);
          w.ys.splice(i, 1);
          if (!w.xs.length) { w.xs.push(""); w.ys.push(""); }
          zbudujWiersze();
          zmiana();
        });
        return { wx, wy, tr: el("tr", {}, el("td", {}, wx), el("td", {}, wy), el("td", {}, x)) };
      });
      cialo.replaceChildren(...komorki.map((k) => k.tr));
    }
    function dodajWierszTabelki() {
      const ostatni = wyniki.get(w.id)?.punkty?.at(-1)?.x;
      w.xs.push(Number.isFinite(ostatni) ? formatuj(ostatni + 1) : "");
      w.ys.push("");
      zbudujWiersze();
      zmiana();
    }
    dodajW.addEventListener("click", () => { dodajWierszTabelki(); komorki.at(-1)?.wx.focus(); });
    zrodlo.addEventListener("change", () => { w.zrodlo = zrodlo.value || null; zmiana(); });
    kropka.addEventListener("click", () => { w.ukryty = !w.ukryty; przelicz(); zapisz(); });
    usun.addEventListener("click", () => {
      stan.wiersze = stan.wiersze.filter((x) => x !== w);
      if (!stan.wiersze.length) dodajWiersz("");
      przelicz();
      zapisz();
    });
    zbudujWiersze();

    /** Po każdym przeliczeniu: lista wykresów do wyboru i wyliczone y (komórek nie budujemy od nowa – zostaje kursor). */
    function odswiez(r, funkcje) {
      const sygnatura = funkcje.map((f) => `${f.id}:${f.tekst}`).join("|");
      if (zrodlo.dataset.sygnatura !== sygnatura) {
        zrodlo.replaceChildren(el("option", { value: "" }, "wpisuję sam"),
          ...funkcje.map((f) => el("option", { value: f.id }, `liczę z: ${f.tekst}`)));
        zrodlo.dataset.sygnatura = sygnatura;
      }
      zrodlo.value = w.zrodlo && funkcje.some((f) => f.id === w.zrodlo) ? w.zrodlo : "";
      komorki.forEach((k, i) => {
        const p = r?.punkty?.[i];
        k.wx.classList.toggle("zla", Number.isNaN(p?.x));
        if (r?.zFunkcji) {
          k.wy.readOnly = true;
          k.wy.classList.add("wyliczona");
          k.wy.value = p?.x == null || Number.isNaN(p.x) ? "" : Number.isFinite(p.y) ? wsp(p.y) : "brak";
          k.wy.classList.remove("zla");
        } else {
          k.wy.readOnly = false;
          k.wy.classList.remove("wyliczona");
          if (document.activeElement !== k.wy && k.wy.value !== (w.ys[i] ?? "")) k.wy.value = w.ys[i] ?? "";
          k.wy.classList.toggle("zla", Number.isNaN(p?.y));
        }
      });
    }
    return { wiersz, kropka, pole: null, info, odswiez, fokus: () => komorki[0]?.wx.focus() };
  }

  function odswiezListe() {
    const zostaja = new Set(stan.wiersze.map((w) => w.id));
    for (const id of widokiWierszy.keys()) if (!zostaja.has(id)) widokiWierszy.delete(id);
    // Wiersze aktualizujemy na miejscu; listę układamy od nowa tylko, gdy wiersz doszedł, zniknął albo zmienił miejsce.
    // (Wyjęcie pola z dokumentu zabiera mu kursor – wtedy przywracamy fokus i zaznaczenie.)
    const aktywny = document.activeElement;
    const zaznaczenie = aktywny?.selectionStart != null ? [aktywny.selectionStart, aktywny.selectionEnd] : null;
    const funkcjeDoTabel = stan.wiersze
      .filter((x) => x.typ !== "tabela" && wyniki.get(x.id)?.rodzaj === "funkcja")
      .map((x) => ({ id: x.id, tekst: x.tekst.trim() }));
    const wiersze = stan.wiersze.map((w) => {
      let v = widokiWierszy.get(w.id);
      if (!v) { v = w.typ === "tabela" ? widokTabeli(w) : widokWiersza(w); widokiWierszy.set(w.id, v); }
      const r = wyniki.get(w.id);
      v.wiersz.style.setProperty("--kolor", naEkran(w.kolor));
      v.kropka.setAttribute("aria-pressed", String(!w.ukryty));
      v.wiersz.classList.toggle("ukryty", w.ukryty);
      if (w.typ === "tabela") { v.odswiez(r, funkcjeDoTabel); return v.wiersz; }
      if (v.pole.value !== w.tekst) v.pole.value = w.tekst;
      v.wiersz.classList.toggle("z-bledem", r?.rodzaj === "blad");
      v.info.replaceChildren();
      if (r?.rodzaj === "blad") {
        v.info.append(el("span", { class: "wyk-blad" }, r.blad));
        for (const n of r.brakujace ?? []) {
          if (n.length !== 1 || ZAREZERWOWANE.has(n)) continue;
          const b = el("button", { type: "button", class: "btn btn-small" }, `Dodaj suwak ${n}`);
          b.addEventListener("click", () => { dodajWiersz(`${n} = 1`); przelicz(); zapisz(); });
          v.info.append(" ", b);
        }
      } else if (r?.rodzaj === "suwak") {
        const min = Math.min(-10, Math.floor(r.wartosc)), max = Math.max(10, Math.ceil(r.wartosc));
        const suwak = el("input", { type: "range", class: "wyk-suwak", min, max, step: "0.1", value: String(r.wartosc), "aria-label": `Wartość ${r.nazwa}` });
        const opis = el("span", { class: "wyk-suwak-zakres" }, `${formatuj(min)} … ${formatuj(max)}`);
        suwak.addEventListener("input", () => {
          w.tekst = `${r.nazwa} = ${formatuj(Number(suwak.value))}`;
          v.pole.value = w.tekst;
          przelicz({ bezListy: true });
          zapisz();
        });
        v.info.append(suwak, opis);
      }
      return v.wiersz;
    });
    const teraz = [...lista.children];
    if (teraz.length !== wiersze.length || teraz.some((n, i) => n !== wiersze[i])) {
      lista.replaceChildren(...wiersze);
      if (aktywny && aktywny.isConnected && document.activeElement !== aktywny) {
        aktywny.focus({ preventScroll: true });
        if (zaznaczenie) aktywny.setSelectionRange(...zaznaczenie);
      }
    }
  }

  function przelicz({ bezListy = false } = {}) {
    wyniki = analizuj(stan.wiersze, stan.stopnie);
    if (!bezListy) odswiezListe();
    przywroc.hidden = !stan.poprzednie;
    rysuj();
  }

  // --- Rysowanie
  const ctx = plotno.getContext("2d");
  // Kolory płótna z CSS (--wyk-…), żeby pasowały do motywu; odczytujemy je raz i po każdej zmianie motywu.
  let P = null;
  function paleta() {
    const s = getComputedStyle(obszar);
    const v = (nazwa, zapas) => s.getPropertyValue(nazwa).trim() || zapas;
    return {
      tlo: v("--wyk-tlo", "#ffffff"), drobna: v("--wyk-siatka-drobna", "#eef2f6"), siatka: v("--wyk-siatka", "#d7dee7"),
      os: v("--wyk-os", "#5b6b7e"), podpis: v("--wyk-podpis", "#4b5a6c"), tekst: v("--wyk-tekst", "#2a3646"),
      podpisTlo: v("--wyk-podpis-tlo", "rgba(255,255,255,0.85)"), punkt: v("--wyk-punkt", "#7b8a9c"),
    };
  }
  let W = 0, H = 0, dpr = 1;
  const px = (x) => W / 2 + (x - stan.widok.cx) * stan.widok.skala;
  const py = (y) => H / 2 - (y - stan.widok.cy) * stan.widok.skala;
  const xz = (p) => stan.widok.cx + (p - W / 2) / stan.widok.skala;
  const yz = (p) => stan.widok.cy - (p - H / 2) / stan.widok.skala;

  function wymiary() {
    const r = obszar.getBoundingClientRect();
    dpr = window.devicePixelRatio || 1;
    W = Math.max(1, Math.round(r.width));
    H = Math.max(1, Math.round(r.height));
    plotno.width = W * dpr;
    plotno.height = H * dpr;
    plotno.style.width = `${W}px`;
    plotno.style.height = `${H}px`;
  }

  const widoczne = () => stan.wiersze.filter((w) => !w.ukryty).map((w) => ({ w, r: wyniki.get(w.id) })).filter((o) => o.r);

  function siatka() {
    const krok = ladnyKrok(64 / stan.widok.skala);
    const drobny = krok / (String(krok / 10 ** Math.floor(Math.log10(krok)))[0] === "2" ? 4 : 5);
    const x0 = xz(0), x1 = xz(W), y0 = yz(H), y1 = yz(0);
    const linie = (k, kolor) => {
      ctx.strokeStyle = kolor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = Math.ceil(x0 / k) * k; x <= x1; x += k) { const p = Math.round(px(x)) + 0.5; ctx.moveTo(p, 0); ctx.lineTo(p, H); }
      for (let y = Math.ceil(y0 / k) * k; y <= y1; y += k) { const p = Math.round(py(y)) + 0.5; ctx.moveTo(0, p); ctx.lineTo(W, p); }
      ctx.stroke();
    };
    if (drobny * stan.widok.skala >= 8) linie(drobny, P.drobna);
    linie(krok, P.siatka);
    // osie
    ctx.strokeStyle = P.os;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const ox = px(0), oy = py(0);
    if (ox >= 0 && ox <= W) { ctx.moveTo(ox, 0); ctx.lineTo(ox, H); }
    if (oy >= 0 && oy <= H) { ctx.moveTo(0, oy); ctx.lineTo(W, oy); }
    ctx.stroke();
    // podpisy
    ctx.fillStyle = P.podpis;
    ctx.font = "12px 'Plus Jakarta Sans', system-ui, sans-serif";
    const etX = Math.min(Math.max(oy + 4, 2), H - 16);
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for (let x = Math.ceil(x0 / krok) * krok; x <= x1; x += krok) {
      if (Math.abs(x) < krok / 2) continue;
      const p = px(x);
      if (p < 12 || p > W - 12) continue;
      podpis(formatuj(Math.round(x / krok) * krok, 6), p, etX, "center");
    }
    ctx.textBaseline = "middle";
    const naLewo = ox > W - 40;
    const etY = Math.min(Math.max(ox + (naLewo ? -6 : 6), 2), W - 2);
    for (let y = Math.ceil(y0 / krok) * krok; y <= y1; y += krok) {
      if (Math.abs(y) < krok / 2) continue;
      const p = py(y);
      if (p < 10 || p > H - 10) continue;
      podpis(formatuj(Math.round(y / krok) * krok, 6), naLewo || ox < 0 ? etY : etY, p, naLewo ? "right" : "left");
    }
    if (ox >= 0 && ox <= W && oy >= 0 && oy <= H) podpis("0", ox - 6, oy + 4, "right", "top");
    ctx.fillStyle = P.tekst;
    ctx.font = "italic 13px 'Plus Jakarta Sans', system-ui, sans-serif";
    if (oy >= 0 && oy <= H) { ctx.textAlign = "right"; ctx.textBaseline = "bottom"; ctx.fillText("x", W - 6, oy - 4); }
    if (ox >= 0 && ox <= W) { ctx.textAlign = "left"; ctx.textBaseline = "top"; ctx.fillText("y", ox + 6, 4); }
  }
  function podpis(tekst, x, y, wyrownanie, linia) {
    ctx.textAlign = wyrownanie;
    if (linia) ctx.textBaseline = linia;
    const m = ctx.measureText(tekst);
    const w = m.width + 4;
    const lx = wyrownanie === "center" ? x - w / 2 : wyrownanie === "right" ? x - w + 2 : x - 2;
    const ly = ctx.textBaseline === "top" ? y - 1 : ctx.textBaseline === "middle" ? y - 8 : y - 15;
    ctx.save();
    ctx.fillStyle = P.podpisTlo;
    ctx.fillRect(lx, ly, w, 16);
    ctx.restore();
    ctx.fillText(tekst, x, y);
  }

  function wykresFunkcji(f, kolor) {
    ctx.strokeStyle = kolor;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.beginPath();
    let pioro = false, poprzX = 0, poprzY = 0;
    const krok = 0.5;
    for (let p = -krok; p <= W + krok; p += krok) {
      const x = xz(p), y = f(x);
      if (!Number.isFinite(y)) { pioro = false; continue; }
      let q = py(y);
      if (pioro) {
        const skok = Math.abs(q - poprzY);
        if (skok > H) {
          // duży skok: asymptota (1/x) albo stromy fragment – sprawdzamy środek
          const ys = f(xz((p + poprzX) / 2));
          const qs = Number.isFinite(ys) ? py(ys) : NaN;
          const pomiedzy = Number.isFinite(qs) && (qs - poprzY) * (q - qs) >= 0;
          if (!pomiedzy) pioro = false;
        }
      }
      q = Math.max(-10 * H, Math.min(11 * H, q));
      if (pioro) ctx.lineTo(p, q); else ctx.moveTo(p, q);
      pioro = true;
      poprzX = p;
      poprzY = q;
    }
    ctx.stroke();
  }

  /** Krzywa G(x, y) = 0 (np. okrąg): siatka co 4 px, w każdej kratce, gdzie G zmienia znak, odcinek
   *  (marching squares). Pomijamy kratki przy biegunach – tam G skacze, ale krzywej nie ma. */
  function krzywaNiejawna(G, kolor) {
    const k = 4, nx = Math.ceil(W / k) + 1, ny = Math.ceil(H / k) + 1;
    const v = new Float64Array(nx * ny);
    for (let j = 0; j < ny; j++) {
      const y = yz(j * k);
      for (let i = 0; i < nx; i++) v[j * nx + i] = G(xz(i * k), y);
    }
    const punktNaKrawedzi = (x0, y0, g0, x1, y1, g1) => {
      if (!((g0 < 0) !== (g1 < 0)) || !Number.isFinite(g0) || !Number.isFinite(g1)) return null;
      const t = g0 / (g0 - g1);
      const xm = x0 + (x1 - x0) * t, ym = y0 + (y1 - y0) * t;
      const gm = G(xz(xm), yz(ym));
      if (!Number.isFinite(gm) || Math.abs(gm) > Math.max(Math.abs(g0), Math.abs(g1))) return null;   // biegun, nie krzywa
      return [xm, ym];
    };
    ctx.strokeStyle = kolor;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.beginPath();
    for (let j = 0; j < ny - 1; j++) {
      for (let i = 0; i < nx - 1; i++) {
        const a = v[j * nx + i], b = v[j * nx + i + 1], c = v[(j + 1) * nx + i + 1], d = v[(j + 1) * nx + i];
        const x0 = i * k, y0 = j * k, x1 = x0 + k, y1 = y0 + k;
        const p = [
          punktNaKrawedzi(x0, y0, a, x1, y0, b), punktNaKrawedzi(x1, y0, b, x1, y1, c),
          punktNaKrawedzi(x1, y1, c, x0, y1, d), punktNaKrawedzi(x0, y1, d, x0, y0, a),
        ].filter(Boolean);
        for (let m = 0; m + 1 < p.length; m += 2) { ctx.moveTo(p[m][0], p[m][1]); ctx.lineTo(p[m + 1][0], p[m + 1][1]); }
      }
    }
    ctx.stroke();
  }

  /** Miejsca zerowe, przecięcia z osią OY, ekstrema i przecięcia wykresów w widocznym zakresie. */
  function znajdzPunkty(funkcje) {
    const wynik = [];
    const x0 = xz(0), x1 = xz(W), N = 600, dx = (x1 - x0) / N, tol = (x1 - x0) * 1e-9;
    const dodajPunkt = (x, y, opis, kolor) => {
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;
      if (py(y) < -20 || py(y) > H + 20) return;
      if (wynik.some((p) => Math.abs(p.x - x) < dx / 4 && Math.abs(p.y - y) < 4 / stan.widok.skala)) return;
      if (wynik.length < 80) wynik.push({ x, y, opis, kolor });
    };
    const bisekcja = (g, a, b) => {
      let ga = g(a);
      for (let i = 0; i < 60 && b - a > tol; i++) {
        const m = (a + b) / 2, gm = g(m);
        if (!Number.isFinite(gm)) return NaN;
        if ((ga <= 0) === (gm <= 0)) { a = m; ga = gm; } else b = m;
      }
      return (a + b) / 2;
    };
    const ciagla = (g, a, b, ga, gb) => {
      // wykluczamy skok przez asymptotę: środek musi leżeć między końcami, a wartości nie mogą być ogromne
      const gm = g((a + b) / 2);
      return Number.isFinite(gm) && Math.abs(ga - gb) < (H / stan.widok.skala) * 2 && Math.min(ga, gb) <= gm + 1e-9 && gm <= Math.max(ga, gb) + 1e-9;
    };
    const zera = (g, poZnalezieniu) => {
      let pa = x0, ga = g(pa);
      for (let i = 1; i <= N; i++) {
        const b = x0 + i * dx, gb = g(b);
        if (Number.isFinite(ga) && Number.isFinite(gb)) {
          if (ga === 0) poZnalezieniu(pa);
          else if (ga * gb < 0 && ciagla(g, pa, b, ga, gb)) poZnalezieniu(bisekcja(g, pa, b));
        }
        pa = b; ga = gb;
      }
    };
    for (const { f, kolor } of funkcje) {
      zera(f, (x) => dodajPunkt(x, 0, "miejsce zerowe", kolor));
      if (x0 <= 0 && 0 <= x1) { const y0 = f(0); if (Number.isFinite(y0)) dodajPunkt(0, y0, "przecięcie z osią OY", kolor); }
      // ekstrema: zmiana kierunku na kolejnych próbkach, dokładniej metodą złotego podziału
      let ya = f(x0), yb = f(x0 + dx);
      for (let i = 2; i <= N; i++) {
        const x = x0 + i * dx, yc = f(x);
        if ([ya, yb, yc].every(Number.isFinite) && (yb - ya) * (yc - yb) < 0 && Math.abs(yb - ya) < (H / stan.widok.skala)) {
          const max = yb > ya;
          let a = x - 2 * dx, b = x;
          const fi = (Math.sqrt(5) - 1) / 2;
          for (let k = 0; k < 60 && b - a > tol; k++) {
            const c = b - fi * (b - a), d = a + fi * (b - a);
            if ((f(c) > f(d)) === max) b = d; else a = c;
          }
          const xe = (a + b) / 2, ye = f(xe);
          // ostry wierzchołek |x| też się liczy; pomijamy drobne drgania przy asymptotach
          if (Number.isFinite(ye)) dodajPunkt(xe, ye, max ? "maksimum" : "minimum", kolor);
        }
        ya = yb; yb = yc;
      }
    }
    for (let i = 0; i < funkcje.length; i++) for (let j = i + 1; j < funkcje.length; j++) {
      const f = funkcje[i].f, g = funkcje[j].f;
      zera((x) => f(x) - g(x), (x) => dodajPunkt(x, f(x), "punkt przecięcia", P.podpis));
    }
    return wynik;
  }

  function rysuj() {
    if (!W || !H) return;
    P ??= paleta();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = P.tlo;
    ctx.fillRect(0, 0, W, H);
    siatka();
    const obiekty = widoczne();
    const funkcje = [];
    for (const { w, r } of obiekty) {
      if (r.rodzaj === "funkcja") { wykresFunkcji(r.f, naEkran(w.kolor)); funkcje.push({ f: r.f, kolor: naEkran(w.kolor) }); }
      if (r.rodzaj === "krzywa") krzywaNiejawna(r.G, naEkran(w.kolor));
      if (r.rodzaj === "pionowa" && Number.isFinite(r.x)) {
        ctx.strokeStyle = naEkran(w.kolor); ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(px(r.x), 0); ctx.lineTo(px(r.x), H); ctx.stroke();
      }
    }
    punktySpecjalne = znajdzPunkty(funkcje);
    for (const p of punktySpecjalne) {
      ctx.fillStyle = P.tlo; ctx.strokeStyle = P.punkt; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(px(p.x), py(p.y), 3.5, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
    }
    for (const { w, r } of obiekty) {
      if (r.rodzaj !== "tabela") continue;
      ctx.fillStyle = naEkran(w.kolor);
      for (const p of r.punkty) {
        if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) continue;
        ctx.beginPath(); ctx.arc(px(p.x), py(p.y), 5, 0, 2 * Math.PI); ctx.fill();
      }
    }
    for (const { w, r } of obiekty) {
      if (r.rodzaj !== "punkt" || !Number.isFinite(r.x) || !Number.isFinite(r.y)) continue;
      ctx.fillStyle = naEkran(w.kolor);
      ctx.beginPath(); ctx.arc(px(r.x), py(r.y), 5, 0, 2 * Math.PI); ctx.fill();
      ctx.fillStyle = P.tekst;
      ctx.font = "13px 'Plus Jakarta Sans', system-ui, sans-serif";
      podpis(`(${wsp(r.x)}; ${wsp(r.y)})`, px(r.x) + 8, py(r.y) - 8, "left", "bottom");
    }
    if (wskazany) {
      ctx.fillStyle = wskazany.kolor; ctx.strokeStyle = P.tlo; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(px(wskazany.x), py(wskazany.y), 5.5, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
    }
  }

  // --- Wskazywanie punktów (najechanie myszą albo dotknięcie)
  function wskaz(mx, my) {
    let najlepszy = null, odl = 12;
    for (const p of punktySpecjalne) {
      const d = Math.hypot(px(p.x) - mx, py(p.y) - my);
      if (d < odl) { odl = d; najlepszy = { ...p }; }
    }
    if (!najlepszy) {
      const x = xz(mx);
      for (const { w, r } of widoczne()) {
        if (r.rodzaj === "punkt") {
          const d = Math.hypot(px(r.x) - mx, py(r.y) - my);
          if (d < odl) { odl = d; najlepszy = { x: r.x, y: r.y, opis: "punkt", kolor: naEkran(w.kolor) }; }
        }
        if (r.rodzaj === "tabela") {
          for (const p of r.punkty) {
            if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) continue;
            const d = Math.hypot(px(p.x) - mx, py(p.y) - my);
            if (d < odl) { odl = d; najlepszy = { x: p.x, y: p.y, opis: "z tabelki", kolor: naEkran(w.kolor) }; }
          }
        }
        if (r.rodzaj !== "funkcja") continue;
        const y = r.f(x);
        if (!Number.isFinite(y)) continue;
        const d = Math.abs(py(y) - my);
        if (d < odl) { odl = d; najlepszy = { x, y, opis: null, kolor: naEkran(w.kolor) }; }
      }
    }
    wskazany = najlepszy;
    if (najlepszy) {
      dymek.hidden = false;
      dymek.replaceChildren(
        najlepszy.opis ? el("span", { class: "wyk-dymek-opis" }, najlepszy.opis) : "",
        el("span", {}, `(${wsp(najlepszy.x)}; ${wsp(najlepszy.y)})`));
      const dx = px(najlepszy.x), dy = py(najlepszy.y);
      dymek.style.left = `${Math.min(Math.max(dx, 60), W - 60)}px`;
      dymek.style.top = `${dy < 60 ? dy + 16 : dy - 12}px`;
      dymek.classList.toggle("pod", dy < 60);
    } else dymek.hidden = true;
    rysuj();
  }
  function schowajDymek() { if (wskazany || !dymek.hidden) { wskazany = null; dymek.hidden = true; rysuj(); } }

  // --- Przesuwanie i przybliżanie
  function przybliz(k, mx = W / 2, my = H / 2) {
    const v = stan.widok;
    const nowa = Math.min(1e6, Math.max(1e-4, v.skala * k));
    const x = xz(mx), y = yz(my);
    v.skala = nowa;
    v.cx = x - (mx - W / 2) / nowa;
    v.cy = y + (my - H / 2) / nowa;
    schowajDymek();
    rysuj();
    zapisz();
  }
  const wskazniki = new Map();
  let ruch = null;   // { x, y, cx, cy, odleglosc?, skala?, przesunieto }
  const polozenie = (e) => { const r = plotno.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  plotno.addEventListener("pointerdown", (e) => {
    plotno.setPointerCapture(e.pointerId);
    wskazniki.set(e.pointerId, polozenie(e));
    const pkt = [...wskazniki.values()];
    if (pkt.length === 1) ruch = { x: pkt[0][0], y: pkt[0][1], cx: stan.widok.cx, cy: stan.widok.cy, przesunieto: false };
    else if (pkt.length === 2) {
      const [a, b] = pkt;
      ruch = { odleglosc: Math.hypot(a[0] - b[0], a[1] - b[1]), skala: stan.widok.skala, srodek: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], przesunieto: true };
    }
  });
  plotno.addEventListener("pointermove", (e) => {
    const [mx, my] = polozenie(e);
    if (!wskazniki.has(e.pointerId)) { if (e.pointerType === "mouse") wskaz(mx, my); return; }
    wskazniki.set(e.pointerId, [mx, my]);
    const pkt = [...wskazniki.values()];
    if (pkt.length === 2 && ruch?.odleglosc) {
      const [a, b] = pkt;
      const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
      const k = (ruch.skala * d / ruch.odleglosc) / stan.widok.skala;
      przybliz(k, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
      return;
    }
    if (pkt.length === 1 && ruch && !ruch.odleglosc) {
      const dx = mx - ruch.x, dy = my - ruch.y;
      if (!ruch.przesunieto && Math.hypot(dx, dy) < 4) return;
      ruch.przesunieto = true;
      plotno.classList.add("przesuwanie");
      stan.widok.cx = ruch.cx - dx / stan.widok.skala;
      stan.widok.cy = ruch.cy + dy / stan.widok.skala;
      schowajDymek();
      rysuj();
    }
  });
  const koniec = (e) => {
    if (!wskazniki.has(e.pointerId)) return;
    const [mx, my] = polozenie(e);
    wskazniki.delete(e.pointerId);
    plotno.classList.remove("przesuwanie");
    if (ruch && !ruch.przesunieto && e.type === "pointerup") wskaz(mx, my);   // dotknięcie bez przesuwania
    if (ruch?.przesunieto) zapisz();
    ruch = wskazniki.size === 1 ? (() => { const [p] = wskazniki.values(); return { x: p[0], y: p[1], cx: stan.widok.cx, cy: stan.widok.cy, przesunieto: true }; })() : null;
  };
  plotno.addEventListener("pointerup", koniec);
  plotno.addEventListener("pointercancel", koniec);
  plotno.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse" && !wskazniki.size) schowajDymek(); });
  plotno.addEventListener("wheel", (e) => {
    e.preventDefault();
    const [mx, my] = polozenie(e);
    przybliz(Math.exp(-e.deltaY * (e.deltaMode === 1 ? 0.05 : 0.0015)), mx, my);
  }, { passive: false });

  /** Wzór z zadania (opis.wiersze, assets/tex-wykres.js) albo wykres z karty wzoru (funkcje, proste, punkty, x, y):
   *  wiersze ucznia odkładamy na bok („↶ Poprzednie wiersze” je przywraca) i pokazujemy tylko ten wzór.
   *  Bez zakresu x i y widok dobieramy sami, tak żeby było widać ważną część wykresu. */
  function pokazOpis(opis) {
    const swoje = stan.wiersze.filter((w) => w.typ === "tabela" || w.tekst.trim());
    if (swoje.length && !stan.zWzoru) stan.poprzednie = swoje;
    stan.wiersze = [];
    stan.zWzoru = true;
    for (const t of opis.wiersze ?? []) dodajWiersz(t);
    const liczba = (v) => formatuj(v, 8);
    for (const f of opis.funkcje ?? []) dodajWiersz(`y = ${f.wzor}`);
    for (const p of opis.proste ?? []) dodajWiersz(p.x !== undefined ? `x = ${liczba(p.x)}` : `y = ${liczba(p.y)}`);
    for (const p of opis.punkty ?? []) dodajWiersz(`(${liczba(p.x)}; ${liczba(p.y)})`);
    if (!stan.wiersze.length) dodajWiersz("");
    stan.stopnie = !!opis.stopnie;
    for (const b of jednostki.children) b.setAttribute("aria-pressed", String((b.textContent === "stopnie") === stan.stopnie));
    wymiary();
    if (opis.x && opis.y) {
      const [x0, x1] = opis.x, [y0, y1] = opis.y;
      stan.widok = { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, skala: Math.min(W / (x1 - x0), H / (y1 - y0)) * 0.95 };
    } else {
      wyniki = analizuj(stan.wiersze, stan.stopnie);
      dopasujWidok();
    }
    przelicz();
    zapisz();
  }

  /** Widok dla wzoru bez podanego zakresu: jak w zwykłym układzie, x i y od −10 do 10. Tylko gdy wykres prawie się
   *  w nim nie mieści (np. y = x² + 20), dobieramy y tak, żeby była widać większość wartości i oś Ox. */
  function dopasujWidok() {
    const x0 = -10, x1 = 10, ys = [];
    for (const { r } of widoczne()) {
      if (r.rodzaj === "funkcja") {
        for (let i = 0; i <= 200; i++) { const y = r.f(x0 + ((x1 - x0) * i) / 200); if (Number.isFinite(y) && Math.abs(y) < 1e6) ys.push(y); }
      }
      if (r.rodzaj === "punkt" && Number.isFinite(r.y)) ys.push(r.y);
    }
    let y0 = -10, y1 = 10;
    const widac = ys.filter((y) => Math.abs(y) <= 10).length;
    if (ys.length && widac < 0.15 * ys.length) {
      ys.sort((a, b) => a - b);
      const kw = (p) => ys[Math.floor(p * (ys.length - 1))];
      y0 = Math.min(0, kw(0.05));
      y1 = Math.max(0, kw(0.95));
      if (y1 - y0 < 4) { y0 -= 2; y1 += 2; }
      const zapas = (y1 - y0) * 0.12;
      y0 -= zapas;
      y1 += zapas;
    }
    stan.widok = { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, skala: Math.min(W / (x1 - x0), H / (y1 - y0)) };
  }

  new ResizeObserver(() => { wymiary(); rysuj(); }).observe(obszar);
  window.addEventListener("motyw:zmiana", () => { P = null; przelicz(); });
  wymiary();
  przelicz();
  return { pokaz: pokazOpis, fokus: () => { const pusty = pustyWiersz() ?? stan.wiersze[0]; if (!matchMedia("(pointer: coarse)").matches) fokus(pusty); } };
}
