// Wspólne kawałki gier: losowanie, zapis liczb po polsku, ułamek piętrowy, rekordy, ekran startu i ekran końca.
import { el } from "../dom.js";

export const losuj = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
export const wybierz = (tab) => tab[Math.floor(Math.random() * tab.length)];
export function tasuj(tab) {
  const t = [...tab];
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
}

export const bezRuchu = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Liczba po polsku: przecinek dziesiętny, prawdziwy minus. */
export function liczba(x) {
  const s = String(Math.round(x * 1e9) / 1e9).replace(".", ",");
  return s.startsWith("-") ? `−${s.slice(1)}` : s;
}

/** Ułamek piętrowy (licznik nad mianownikiem) z opisem dla czytnika ekranu. */
export function ulamek(l, m, { minus = false } = {}) {
  return el("span", { class: "ul", role: "img", "aria-label": `${minus ? "minus " : ""}${l} przez ${m}` },
    minus ? el("span", { class: "ul-minus", "aria-hidden": "true" }, "−") : null,
    el("span", { class: "ul-cialo", "aria-hidden": "true" }, el("span", { class: "ul-l" }, String(l)), el("span", { class: "ul-m" }, String(m))));
}

// --- Rekordy (w przeglądarce ucznia)
const KLUCZ = "gry-rekordy-v1";
function wszystkie() {
  try { return JSON.parse(localStorage.getItem(KLUCZ)) ?? {}; } catch { return {}; }
}
export const rekord = (id) => wszystkie()[id] ?? null;
/** Zapisuje wynik, jeśli jest lepszy (wiecej = lepiej, chyba że mniejLepiej). Zwraca true przy nowym rekordzie. */
export function zapiszRekord(id, wynik, { mniejLepiej = false } = {}) {
  const r = wszystkie();
  const stary = r[id];
  const lepszy = stary == null || (mniejLepiej ? wynik < stary : wynik > stary);
  if (lepszy) {
    r[id] = wynik;
    try { localStorage.setItem(KLUCZ, JSON.stringify(r)); } catch { /* prywatne okno */ }
  }
  return lepszy;
}

/** Ekran startu: zasady, wybór, co ćwiczyć (zakresy), rekord i przycisk Start. */
export function ekranStartu({ zasady, zakresy, wybrany, opisRekordu, onStart }) {
  let zakres = zakresy.find((z) => z.id === wybrany) ?? zakresy[0];
  const rekordInfo = el("p", { class: "gra-rekord" });
  const odswiezRekord = () => {
    const r = rekord(zakres.klucz ?? zakres.id);
    rekordInfo.textContent = r == null ? "Jeszcze tu nie grałeś – pierwszy wynik będzie rekordem." : `Twój rekord: ${opisRekordu(r)}`;
  };
  const przyciski = zakresy.map((z) => {
    const b = el("button", { type: "button", class: "chip", "aria-pressed": String(z === zakres) }, z.nazwa);
    b.addEventListener("click", () => {
      zakres = z;
      for (const x of przyciski) x.setAttribute("aria-pressed", String(x === b));
      odswiezRekord();
    });
    return b;
  });
  const start = el("button", { type: "button", class: "btn btn-primary gra-start" }, "Zaczynamy!");
  start.addEventListener("click", () => onStart(zakres));
  odswiezRekord();
  return el("div", { class: "gra-ekran gra-ekran-start" },
    el("ul", { class: "gra-zasady" }, ...zasady.map((z) => el("li", {}, z))),
    zakresy.length > 1 && el("div", { class: "gra-zakres" },
      el("span", { class: "grupa-etykieta" }, "Co ćwiczysz"),
      el("div", { class: "chips", role: "group", "aria-label": "Co ćwiczysz" }, ...przyciski)),
    rekordInfo,
    start,
  );
}

/** Ekran końca: wynik, informacja o rekordzie, szczegóły (np. co powtórzyć) i przyciski. */
export function ekranKonca({ tytul, wynik, nowyRekord, szczegoly = [], onZnowu, onZmien }) {
  const znowu = el("button", { type: "button", class: "btn btn-primary" }, "Jeszcze raz");
  znowu.addEventListener("click", onZnowu);
  const zmien = onZmien && el("button", { type: "button", class: "btn" }, "Zmień, co ćwiczysz");
  zmien?.addEventListener("click", onZmien);
  const ekran = el("div", { class: "gra-ekran gra-ekran-koniec", tabindex: "-1" },
    el("p", { class: "gra-koniec-tytul" }, tytul),
    el("p", { class: "gra-koniec-wynik" }, wynik),
    nowyRekord && el("p", { class: "gra-nowy-rekord" }, "Nowy rekord!"),
    ...szczegoly,
    el("div", { class: "gra-przyciski" }, znowu, zmien),
  );
  queueMicrotask(() => ekran.focus({ preventScroll: true }));
  return ekran;
}
