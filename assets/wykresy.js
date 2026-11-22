// Kalkulator graficzny w wysuwanym panelu (assets/narzedzia.js).
// Każdy wiersz to jedno z: wykres funkcji (y = 2x + 1, albo samo 2x + 1), funkcja z nazwą (f(x) = x² − 4),
// prosta pionowa (x = 3), punkt ((2; 3) albo (2, 3)) i suwak (a = 1 – litera, której używają inne wiersze).
// Wykres można przesuwać (przeciąganie), przybliżać (kółko myszy, dwa palce, przyciski + i −).
// Na wykresie zaznaczamy miejsca zerowe, przecięcia z osią OY, wierzchołki (ekstrema) i punkty przecięcia wykresów.
import { el } from "./dom.js";
import { parsuj, kompiluj, formatuj, BladWyrazenia } from "./wyrazenia.js";

const KLUCZ = "wykresy-v1";
const KOLORY = ["#0f766e", "#1f5fae", "#c2410c", "#6b3fc2", "#b8322a", "#157347", "#a16207", "#0e7490"];
const PRZYKLADY = ["y = 2x − 3", "y = x² − 2x − 3", "y = a(x − p)² + q", "f(x) = |x − 1|", "y = 1/x", "(2; 3)", "x = −1"];
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
    const t = w.tekst.trim();
    if (!t) return { w, rodzaj: "pusty" };
    const pkt = czesciPunktu(t);
    if (pkt && !t.includes("=")) return { w, rodzaj: "punkt", czesci: pkt };
    const rowne = t.indexOf("=");
    if (rowne < 0) return { w, rodzaj: "funkcja", prawa: t };
    const lewa = t.slice(0, rowne).trim(), prawa = t.slice(rowne + 1).trim();
    if (prawa.includes("=")) return { w, rodzaj: "blad", blad: "W wierszu może być tylko jeden znak „=”." };
    if (!prawa) return { w, rodzaj: "blad", blad: "Po „=” wpisz wzór." };
    if (lewa === "y") return { w, rodzaj: "funkcja", prawa };
    const nazwa = lewa.match(/^([a-df-wz])\s*\(\s*x\s*\)$/);
    if (nazwa) return { w, rodzaj: "funkcja", prawa, nazwa: nazwa[1] };
    if (lewa === "x") return { w, rodzaj: "pionowa", prawa };
    if (/^[a-zA-Z]$/.test(lewa) && !ZAREZERWOWANE.has(lewa)) return { w, rodzaj: "suwak", nazwa: lewa, prawa };
    return { w, rodzaj: "blad", blad: "Zacznij od „y =”, „f(x) =”, „x =” albo litery suwaka, np. „a = 2”." };
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
  }
  return wyniki;
}

export function zbudujWykresy(kontener) {
  const zapis = wczytaj();
  const stan = {
    wiersze: Array.isArray(zapis?.wiersze) && zapis.wiersze.length
      ? zapis.wiersze.map((w, i) => ({ id: noweId(), tekst: String(w.tekst ?? ""), kolor: w.kolor ?? KOLORY[i % KOLORY.length], ukryty: !!w.ukryty }))
      : [{ id: noweId(), tekst: "", kolor: KOLORY[0], ukryty: false }],
    stopnie: !!zapis?.stopnie,
    widok: zapis?.widok && Number.isFinite(zapis.widok.skala) ? zapis.widok : { cx: 0, cy: 0, skala: SKALA_START },
  };
  let wyniki = new Map();
  let punktySpecjalne = [];
  let wskazany = null;   // { x, y, opis, kolor }

  const zapisz = () => {
    try {
      localStorage.setItem(KLUCZ, JSON.stringify({
        wiersze: stan.wiersze.map(({ tekst, kolor, ukryty }) => ({ tekst, kolor, ukryty })), stopnie: stan.stopnie, widok: stan.widok,
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
  const dodaj = el("button", { type: "button", class: "btn btn-small" }, "+ Dodaj wiersz");
  dodaj.addEventListener("click", () => { const w = dodajWiersz(""); przelicz(); fokus(w); });
  const przyklady = el("p", { class: "wyk-przyklady" }, "Przykłady: ", ...PRZYKLADY.flatMap((p, i) => {
    const b = el("button", { type: "button", class: "wyk-przyklad" }, p);
    b.addEventListener("click", () => {
      const pusty = stan.wiersze.find((w) => !w.tekst.trim());
      const w = pusty ?? dodajWiersz("");
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
      el("li", {}, "Litera inna niż x (np. a) to suwak: wpisz a = 1 albo kliknij „Dodaj suwak”. Przesuwaj suwak i patrz, jak zmienia się wykres."),
      el("li", {}, "Szare kropki to miejsca zerowe, przecięcia z osią OY, wierzchołki i punkty przecięcia wykresów – najedź albo dotknij, żeby zobaczyć współrzędne."),
      el("li", {}, "Wykres przesuwasz, przeciągając go. Przybliżasz kółkiem myszy, dwoma palcami albo przyciskami + i −.")));

  kontener.append(el("div", { class: "wyk" },
    obszar,
    el("div", { class: "wyk-dol" },
      el("div", { class: "wyk-pasek" }, jednostki, dodaj),
      lista, przyklady, pomoc)));

  // --- Wiersze
  const widokiWierszy = new Map();
  function dodajWiersz(tekst) {
    const uzyte = new Set(stan.wiersze.map((w) => w.kolor));
    const w = { id: noweId(), tekst, kolor: KOLORY.find((k) => !uzyte.has(k)) ?? KOLORY[stan.wiersze.length % KOLORY.length], ukryty: false };
    stan.wiersze.push(w);
    return w;
  }
  function fokus(w) { widokiWierszy.get(w.id)?.pole.focus(); }

  function widokWiersza(w) {
    const kropka = el("button", { type: "button", class: "wyk-kolor", "aria-pressed": String(!w.ukryty), title: "Pokaż albo ukryj wykres", "aria-label": "Pokaż albo ukryj wykres" });
    const pole = el("input", { class: "wyk-pole", type: "text", value: w.tekst, spellcheck: "false", autocomplete: "off", "aria-label": "Wzór", placeholder: "np. y = 2x + 1" });
    const usun = el("button", { type: "button", class: "wyk-usun", "aria-label": "Usuń wiersz", title: "Usuń wiersz" }, "×");
    const info = el("div", { class: "wyk-info" });
    const wiersz = el("div", { class: "wyk-wiersz" }, kropka, pole, usun, info);
    kropka.addEventListener("click", () => { w.ukryty = !w.ukryty; przelicz(); zapisz(); });
    pole.addEventListener("input", () => { w.tekst = pole.value; przelicz(); zapisz(); });
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

  function odswiezListe() {
    const zostaja = new Set(stan.wiersze.map((w) => w.id));
    for (const id of widokiWierszy.keys()) if (!zostaja.has(id)) widokiWierszy.delete(id);
    lista.replaceChildren(...stan.wiersze.map((w) => {
      let v = widokiWierszy.get(w.id);
      if (!v) { v = widokWiersza(w); widokiWierszy.set(w.id, v); }
      if (v.pole.value !== w.tekst) v.pole.value = w.tekst;
      const r = wyniki.get(w.id);
      v.wiersz.style.setProperty("--kolor", w.kolor);
      v.kropka.setAttribute("aria-pressed", String(!w.ukryty));
      v.wiersz.classList.toggle("ukryty", w.ukryty);
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
    }));
  }

  function przelicz({ bezListy = false } = {}) {
    wyniki = analizuj(stan.wiersze, stan.stopnie);
    if (!bezListy) odswiezListe();
    rysuj();
  }

  // --- Rysowanie
  const ctx = plotno.getContext("2d");
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
    if (drobny * stan.widok.skala >= 8) linie(drobny, "#eef2f6");
    linie(krok, "#d7dee7");
    // osie
    ctx.strokeStyle = "#5b6b7e";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const ox = px(0), oy = py(0);
    if (ox >= 0 && ox <= W) { ctx.moveTo(ox, 0); ctx.lineTo(ox, H); }
    if (oy >= 0 && oy <= H) { ctx.moveTo(0, oy); ctx.lineTo(W, oy); }
    ctx.stroke();
    // podpisy
    ctx.fillStyle = "#4b5a6c";
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
    ctx.fillStyle = "#2a3646";
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
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillRect(lx, ly, w, 16);
    ctx.restore();
    ctx.fillText(tekst, x, y);
  }

  function wykresFunkcji(f, kolor) {
    ctx.strokeStyle = kolor;
    ctx.lineWidth = 2.25;
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
      zera((x) => f(x) - g(x), (x) => dodajPunkt(x, f(x), "punkt przecięcia", "#4b5a6c"));
    }
    return wynik;
  }

  function rysuj() {
    if (!W || !H) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);
    siatka();
    const obiekty = widoczne();
    const funkcje = [];
    for (const { w, r } of obiekty) {
      if (r.rodzaj === "funkcja") { wykresFunkcji(r.f, w.kolor); funkcje.push({ f: r.f, kolor: w.kolor }); }
      if (r.rodzaj === "pionowa" && Number.isFinite(r.x)) {
        ctx.strokeStyle = w.kolor; ctx.lineWidth = 2.25;
        ctx.beginPath(); ctx.moveTo(px(r.x), 0); ctx.lineTo(px(r.x), H); ctx.stroke();
      }
    }
    punktySpecjalne = znajdzPunkty(funkcje);
    for (const p of punktySpecjalne) {
      ctx.fillStyle = "#ffffff"; ctx.strokeStyle = "#7b8a9c"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(px(p.x), py(p.y), 3.5, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
    }
    for (const { w, r } of obiekty) {
      if (r.rodzaj !== "punkt" || !Number.isFinite(r.x) || !Number.isFinite(r.y)) continue;
      ctx.fillStyle = w.kolor;
      ctx.beginPath(); ctx.arc(px(r.x), py(r.y), 5, 0, 2 * Math.PI); ctx.fill();
      ctx.fillStyle = "#2a3646";
      ctx.font = "13px 'Plus Jakarta Sans', system-ui, sans-serif";
      podpis(`(${wsp(r.x)}; ${wsp(r.y)})`, px(r.x) + 8, py(r.y) - 8, "left", "bottom");
    }
    if (wskazany) {
      ctx.fillStyle = wskazany.kolor; ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 2;
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
          if (d < odl) { odl = d; najlepszy = { x: r.x, y: r.y, opis: "punkt", kolor: w.kolor }; }
        }
        if (r.rodzaj !== "funkcja") continue;
        const y = r.f(x);
        if (!Number.isFinite(y)) continue;
        const d = Math.abs(py(y) - my);
        if (d < odl) { odl = d; najlepszy = { x, y, opis: null, kolor: w.kolor }; }
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

  new ResizeObserver(() => { wymiary(); rysuj(); }).observe(obszar);
  wymiary();
  przelicz();
  return { fokus: () => { const pusty = stan.wiersze.find((w) => !w.tekst.trim()) ?? stan.wiersze[0]; if (!matchMedia("(pointer: coarse)").matches) fokus(pusty); } };
}
