import { MATURY } from "./matury.js";

const TYPY = {
  glowna: "Matura główna",
  dodatkowy: "Termin dodatkowy",
  poprawka: "Poprawka",
  probna: "Próbna CKE",
  przykladowy: "Przykładowy CKE",
};

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

// --- Zakładki (Matury / Karty maturalne / Ćwiczenia), adres: korepetycje.html#karty itd.

const tabs = [...document.querySelectorAll('[role="tab"]')];

function selectTab(name, { focus = false } = {}) {
  const tab = tabs.find((t) => t.dataset.tab === name) ?? tabs[0];
  for (const t of tabs) {
    const active = t === tab;
    t.setAttribute("aria-selected", String(active));
    t.tabIndex = active ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !active;
  }
  if (focus) tab.focus();
  if (location.hash.slice(1) !== tab.dataset.tab) {
    history.replaceState(null, "", `#${tab.dataset.tab}`);
  }
}

for (const tab of tabs) {
  tab.addEventListener("click", () => selectTab(tab.dataset.tab));
  tab.addEventListener("keydown", (e) => {
    const i = tabs.indexOf(tab);
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    selectTab(tabs[(next + tabs.length) % tabs.length].dataset.tab, { focus: true });
  });
}
addEventListener("hashchange", () => selectTab(location.hash.slice(1)));
selectTab(location.hash.slice(1));

// --- Lista matur, pogrupowana po roku; arkusz przykładowy na końcu.

function examItem(m) {
  const label = `${m.termin}, ${TYPY[m.typ]} – otwiera arkusze.pl w nowej karcie`;
  return el("li", {},
    el("a", { class: "exam", href: m.url, target: "_blank", rel: "noopener", "aria-label": label },
      el("span", { class: "exam-date" }, m.termin),
      el("span", { class: "badge", "data-typ": m.typ }, TYPY[m.typ]),
      el("span", { class: "exam-go" }, "arkusze.pl ", el("span", { "aria-hidden": "true" }, "↗")),
    ),
  );
}

const groups = new Map();
for (const m of MATURY) {
  const key = m.miesiac ? String(m.rok) : "Arkusz przykładowy (formuła 2023)";
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(m);
}

document.getElementById("matury-list").append(
  ...[...groups].map(([title, items]) =>
    el("section", { class: "year" },
      el("h3", {}, title),
      el("ul", { class: "exam-list" }, ...items.map(examItem)),
    ),
  ),
);
