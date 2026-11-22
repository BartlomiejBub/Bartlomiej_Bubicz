// Wysuwane z prawej narzędzia: kalkulator graficzny (assets/wykresy.js) i kalkulator (assets/kalkulator.js).
// Na komputerze panel przesuwa treść strony w lewo (body dostaje odstęp z prawej), na telefonie zakrywa ekran.
// Szerokość panelu można zmienić, przeciągając jego lewą krawędź; zapamiętujemy ją w przeglądarce.
// Kalkulator graficzny można też otworzyć na cały ekran. Wzory funkcji w treści (assets/matematyka.js) mają
// przycisk „Pokaż na wykresie” – kliknięcie wzoru albo przycisku otwiera go w kalkulatorze graficznym.
import { el } from "./dom.js";

const KLUCZ = "narzedzia-v1";
const WASKI = matchMedia("(max-width: 760px)");

const IKONA_WYKRES = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3v18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6 17c3-9 6-9 8-4s3 3 5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const IKONA_PELNY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const IKONA_ZWIN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const IKONA_KALK = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="2.5" width="14" height="19" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><rect x="8" y="5.5" width="8" height="4" rx="1" fill="currentColor"/><g fill="currentColor"><circle cx="9" cy="13" r="1.2"/><circle cx="12" cy="13" r="1.2"/><circle cx="15" cy="13" r="1.2"/><circle cx="9" cy="17" r="1.2"/><circle cx="12" cy="17" r="1.2"/><circle cx="15" cy="17" r="1.2"/></g></svg>';

const NARZEDZIA = [
  { id: "wykresy", napis: "Wykresy", tytul: "Kalkulator graficzny", szerokosc: 500, min: 340, ikona: IKONA_WYKRES, pelnyEkran: true, zbuduj: () => import("./wykresy.js").then((m) => m.zbudujWykresy) },
  { id: "kalkulator", napis: "Kalkulator", tytul: "Kalkulator", szerokosc: 360, min: 300, ikona: IKONA_KALK, zbuduj: () => import("./kalkulator.js").then((m) => m.zbudujKalkulator) },
];

function wczytaj() {
  try { return JSON.parse(localStorage.getItem(KLUCZ)) ?? {}; } catch { return {}; }
}

function uruchom() {
  const zapis = wczytaj();
  const szerokosci = { ...(zapis.szerokosci ?? {}) };
  let otwarte = null;
  const zapisz = () => { try { localStorage.setItem(KLUCZ, JSON.stringify({ szerokosci, otwarte: otwarte?.id ?? null })); } catch { /* prywatne okno */ } };

  const przyciski = el("div", { class: "narzedzia-przyciski", role: "group", "aria-label": "Narzędzia" });
  document.body.append(przyciski);
  document.documentElement.classList.add("z-wykresami");   // pokazuje przyciski „Pokaż na wykresie” przy wzorach

  const maksSzer = () => Math.max(320, Math.min(960, window.innerWidth - 380));
  const szer = (n) => Math.min(maksSzer(), Math.max(n.min, szerokosci[n.id] ?? n.szerokosc));
  const ustawSzerokosc = (n) => document.documentElement.style.setProperty("--szuflada-szer", `${WASKI.matches ? 0 : szer(n)}px`);

  for (const n of NARZEDZIA) {
    const tresc = el("div", { class: "szuflada-tresc" });
    const zamknij = el("button", { type: "button", class: "szuflada-zamknij", "aria-label": `Zamknij: ${n.tytul}`, title: "Zamknij (Esc)" }, "×");
    const uchwyt = el("div", { class: "szuflada-uchwyt", role: "separator", "aria-orientation": "vertical", "aria-label": "Zmień szerokość panelu", tabindex: "0" });
    const pelny = n.pelnyEkran && el("button", { type: "button", class: "szuflada-zamknij szuflada-pelny", "aria-pressed": "false", "aria-label": "Pełny ekran", title: "Pełny ekran" });
    if (pelny) {
      pelny.innerHTML = IKONA_PELNY;
      pelny.addEventListener("click", () => ustawPelny(n, !n.szuflada.classList.contains("pelny")));
    }
    n.pelnyPrzycisk = pelny;
    n.szuflada = el("aside", { class: "szuflada", id: `szuflada-${n.id}`, "aria-label": n.tytul, inert: true },
      uchwyt,
      el("div", { class: "szuflada-naglowek" }, el("h2", {}, n.tytul), el("div", { class: "szuflada-akcje" }, pelny, zamknij)),
      tresc);
    n.tresc = tresc;
    document.body.append(n.szuflada);

    n.przycisk = el("button", { type: "button", class: "narzedzie", "aria-expanded": "false", "aria-controls": n.szuflada.id, title: n.tytul });
    n.przycisk.innerHTML = n.ikona;
    n.przycisk.append(el("span", {}, n.napis));
    przyciski.append(n.przycisk);

    n.przycisk.addEventListener("click", () => (otwarte === n ? zamknijPanel() : otworz(n)));
    zamknij.addEventListener("click", () => zamknijPanel());

    // zmiana szerokości przeciąganiem lewej krawędzi (i strzałkami z klawiatury)
    uchwyt.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      uchwyt.setPointerCapture(e.pointerId);
      document.body.classList.add("szuflada-ciagniecie");
      const ruch = (ev) => { szerokosci[n.id] = Math.round(window.innerWidth - ev.clientX); ustawSzerokosc(n); };
      const koniec = () => {
        uchwyt.removeEventListener("pointermove", ruch);
        document.body.classList.remove("szuflada-ciagniecie");
        szerokosci[n.id] = szer(n);
        zapisz();
      };
      uchwyt.addEventListener("pointermove", ruch);
      uchwyt.addEventListener("pointerup", koniec, { once: true });
      uchwyt.addEventListener("pointercancel", koniec, { once: true });
    });
    uchwyt.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      szerokosci[n.id] = szer(n) + (e.key === "ArrowLeft" ? 40 : -40);
      szerokosci[n.id] = szer(n);
      ustawSzerokosc(n);
      zapisz();
    });
  }

  async function otworz(n, { bezFokusu = false } = {}) {
    if (otwarte && otwarte !== n) zamknijPanel({ bezFokusu: true, bezZapisu: true });
    otwarte = n;
    ustawSzerokosc(n);
    n.szuflada.inert = false;
    n.szuflada.classList.add("otwarta");
    n.przycisk.setAttribute("aria-expanded", "true");
    document.body.classList.add("z-szuflada");
    zapisz();
    if (!n.api) {
      n.tresc.append(el("p", { class: "szuflada-ladowanie" }, "Ładowanie…"));
      try {
        const zbuduj = await n.zbuduj();
        n.tresc.replaceChildren();
        n.api = zbuduj(n.tresc);
      } catch {
        n.tresc.replaceChildren(el("p", { class: "form-error" }, "Nie udało się wczytać narzędzia. Odśwież stronę."));
        return;
      }
    }
    if (otwarte === n && !bezFokusu) n.api?.fokus?.();
  }

  function ustawPelny(n, wlacz) {
    if (!n.pelnyPrzycisk) return;
    n.szuflada.classList.toggle("pelny", wlacz);
    document.body.classList.toggle("szuflada-pelna", wlacz);
    n.pelnyPrzycisk.setAttribute("aria-pressed", String(wlacz));
    const opis = wlacz ? "Zwiń z pełnego ekranu" : "Pełny ekran";
    n.pelnyPrzycisk.setAttribute("aria-label", opis);
    n.pelnyPrzycisk.title = `${opis} (Esc)`;
    n.pelnyPrzycisk.innerHTML = wlacz ? IKONA_ZWIN : IKONA_PELNY;
  }

  function zamknijPanel({ bezFokusu = false, bezZapisu = false } = {}) {
    const n = otwarte;
    if (!n) return;
    ustawPelny(n, false);
    otwarte = null;
    n.szuflada.classList.remove("otwarta");
    n.szuflada.inert = true;
    n.przycisk.setAttribute("aria-expanded", "false");
    document.body.classList.remove("z-szuflada");
    if (!bezZapisu) zapisz();
    if (!bezFokusu) n.przycisk.focus();
  }

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !otwarte) return;
    if (otwarte.szuflada.classList.contains("pelny")) ustawPelny(otwarte, false);
    else if (otwarte.szuflada.contains(document.activeElement) || WASKI.matches) zamknijPanel();
  });
  WASKI.addEventListener("change", () => { if (otwarte) ustawSzerokosc(otwarte); });
  window.addEventListener("resize", () => { if (otwarte) ustawSzerokosc(otwarte); });

  // „Otwórz w kalkulatorze graficznym” z karty wzoru: window.dispatchEvent(new CustomEvent("narzedzia:wykres", { detail: opisWykresu }))
  window.addEventListener("narzedzia:wykres", async (e) => {
    const n = NARZEDZIA.find((x) => x.id === "wykresy");
    if (otwarte !== n) await otworz(n, { bezFokusu: true });
    else if (!n.api) return;
    n.api?.pokaz?.(e.detail);
  });

  // Wzór funkcji w treści: kliknięcie przycisku obok wzoru albo samego wzoru (poza odpowiedziami ABCD – tam
  // kliknięcie wzoru wybiera odpowiedź, więc wykres otwiera tylko przycisk).
  document.addEventListener("click", (e) => {
    const wzor = e.target.closest?.(".wzor-wykres");
    if (!wzor) return;
    const przycisk = e.target.closest(".wzor-wykres-przycisk");
    if (!przycisk && e.target.closest("label, a, button")) return;
    e.preventDefault();
    let wiersze;
    try { wiersze = JSON.parse(wzor.dataset.wykres); } catch { return; }
    window.dispatchEvent(new CustomEvent("narzedzia:wykres", { detail: { wiersze } }));
  });

  // po przejściu na inną stronę panel zostaje otwarty (np. kalkulator przy przechodzeniu między tematami); na telefonie nie
  const poprzedni = NARZEDZIA.find((n) => n.id === zapis.otwarte);
  if (poprzedni && !WASKI.matches) otworz(poprzedni, { bezFokusu: true });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", uruchom);
else uruchom();
