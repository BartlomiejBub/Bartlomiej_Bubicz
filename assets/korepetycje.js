import { el } from "./dom.js";
import { MATURY } from "./matury.js";
import { OSMOKLASISTY } from "./osmoklasisty.js";

const TYPY = {
  glowna: "Matura główna",
  dodatkowy: "Termin dodatkowy",
  poprawka: "Poprawka",
  probna: "Próbna CKE",
  przykladowy: "Przykładowy CKE",
};
const TYPY_E8 = { ...TYPY, glowna: "Termin główny", probna: "Próbny CKE" };

// --- Egzamin (Matura / Egzamin ósmoklasisty) i jego zakładki, adres: korepetycje.html#karty, #e8-cwiczenia itd.
// Wybrany egzamin jest w <body data-egzamin>; ćwiczenia (cwiczenia.js) słuchają zdarzenia "egzamin".

const KLUCZ_EGZAMINU = "korepetycje.egzamin";
const tabs = [...document.querySelectorAll('[role="tab"]')];
const egzaminy = [...document.querySelectorAll(".egzamin")];
const egzaminZakladki = (t) => t.dataset.tylko;
const zakladkiEgzaminu = (e) => tabs.filter((t) => egzaminZakladki(t) === e);

function zapamietajEgzamin(e) {
  try { localStorage.setItem(KLUCZ_EGZAMINU, e); } catch {}
}
function zapamietanyEgzamin() {
  try { return localStorage.getItem(KLUCZ_EGZAMINU) === "e8" ? "e8" : "matura"; } catch { return "matura"; }
}

function selectTab(name, { focus = false } = {}) {
  const tab = tabs.find((t) => t.dataset.tab === name) ?? zakladkiEgzaminu(zapamietanyEgzamin())[0];
  const egzamin = egzaminZakladki(tab);
  const panel = document.getElementById(tab.getAttribute("aria-controls"));
  for (const t of tabs) {
    const active = t === tab;
    t.setAttribute("aria-selected", String(active));
    t.tabIndex = active ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = true;
  }
  panel.hidden = false;
  panel.setAttribute("aria-labelledby", tab.id);
  for (const b of egzaminy) b.setAttribute("aria-pressed", String(b.dataset.egzamin === egzamin));
  if (document.body.dataset.egzamin !== egzamin) {
    document.body.dataset.egzamin = egzamin;
    zapamietajEgzamin(egzamin);
    document.dispatchEvent(new CustomEvent("egzamin"));
  }
  if (focus) tab.focus();
  if (location.hash.slice(1) !== tab.dataset.tab) {
    history.replaceState(null, "", `#${tab.dataset.tab}`);
  }
}

for (const tab of tabs) {
  tab.addEventListener("click", () => selectTab(tab.dataset.tab));
  tab.addEventListener("keydown", (e) => {
    const widoczne = zakladkiEgzaminu(egzaminZakladki(tab));
    const i = widoczne.indexOf(tab);
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: widoczne.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    selectTab(widoczne[(next + widoczne.length) % widoczne.length].dataset.tab, { focus: true });
  });
}

// Przełączenie egzaminu zostawia ucznia w ćwiczeniach, jeśli w nich był; w innym razie otwiera pierwszą zakładkę.
for (const b of egzaminy) {
  b.addEventListener("click", () => {
    const wCwiczeniach = /cwiczenia$/.test(location.hash);
    const zakladki = zakladkiEgzaminu(b.dataset.egzamin);
    selectTab((wCwiczeniach ? zakladki.find((t) => t.dataset.tab.endsWith("cwiczenia")) : zakladki[0]).dataset.tab);
  });
}
addEventListener("hashchange", () => selectTab(location.hash.slice(1)));
selectTab(location.hash.slice(1));

// --- Listy arkuszy, pogrupowane po roku; arkusz przykładowy matury na końcu.

function examItem(m, typy) {
  const label = `${m.termin}, ${typy[m.typ]} – otwiera arkusze.pl w nowej karcie`;
  return el("li", {},
    el("a", { class: "exam", href: m.url, target: "_blank", rel: "noopener", "aria-label": label },
      el("span", { class: "exam-date" }, m.termin),
      el("span", { class: "badge", "data-typ": m.typ }, typy[m.typ]),
      el("span", { class: "exam-go" }, "arkusze.pl ", el("span", { "aria-hidden": "true" }, "↗")),
    ),
  );
}

function listaArkuszy(id, arkusze, typy, grupa) {
  const groups = new Map();
  for (const m of arkusze) {
    const key = grupa(m);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(m);
  }
  document.getElementById(id).append(
    ...[...groups].map(([title, items]) =>
      el("section", { class: "year" },
        el("h3", {}, title),
        el("ul", { class: "exam-list" }, ...items.map((m) => examItem(m, typy))),
      ),
    ),
  );
}

listaArkuszy("matury-list", MATURY, TYPY, (m) => (m.miesiac ? String(m.rok) : "Arkusz przykładowy (formuła 2023)"));
listaArkuszy("e8-list", OSMOKLASISTY, TYPY_E8, (m) => String(m.rok));
