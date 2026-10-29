// Edytor listy uczniów: dodawanie, zmiana dostępu i gotowy plik uczniowie.js do wklejenia na GitHubie.
import { el } from "./dom.js";
import { SOL, UCZNIOWIE } from "./uczniowie.js";
import { skrotKodu, normalizujKod } from "./dostep.js";
import { DZIALY, RODZAJE } from "./dzialy.js";

const ALFABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";   // bez I, O, 0, 1 – łatwo je pomylić

const NAGLOWEK = `// Uczniowie i ich dostęp do ćwiczeń.
//
// Najprościej zmieniać ten plik przez stronę nauczyciel.html: dodajesz ucznia, zaznaczasz dostęp,
// kopiujesz gotowy plik i wklejasz go tutaj (na GitHubie: ikonka ołówka → wklej → Commit changes).
// Strona zaktualizuje się po kilku minutach (w razie czego odśwież ją klawiszami Ctrl+F5).
//
// kod    – skrót SHA-256 kodu ucznia; samego kodu tu nie ma, więc nie da się go podejrzeć w repozytorium
// dostep – "wszystko" albo lista dla działów: "zadania" (zadania z matur), "generator", "karty" (karty pracy);
//          działy: liczby (Liczby i równania), funkcje (Funkcje i ciągi), geometria (Geometria),
//          statystyka (Prawdopodobieństwo i statystyka), dowody (Dowody i optymalizacja)
//          tekstowe (Zadania z treścią)
// tematy – opcjonalnie: tylko wybrane tematy działu, np. tematy: { funkcje: ["funkcja-liniowa", "funkcja-kwadratowa"] }
//          (id tematów w pliku assets/arkusze/tematy.js; bez tego pola uczeń widzi cały dział)
//
// Repozytorium jest publiczne – zamiast nazwisk wpisuj samo imię albo pseudonim.
`;

const lista = UCZNIOWIE.map((u) => ({
  imie: u.imie,
  kod: u.kod,
  wszystko: u.dostep === "wszystko",
  dzialy: Object.fromEntries(DZIALY.map((d) => [d.id, new Set(u.dostep === "wszystko" ? [] : u.dostep?.[d.id] ?? [])])),
  tematy: Object.fromEntries(Object.entries(u.tematy ?? {}).map(([d, t]) => [d, new Set(t)])),   // brak działu = cały dział
  nowyKod: null,
}));
let zmiany = false;
let skopiowane = true;

const tbody = document.getElementById("uczniowie");
const plik = document.getElementById("plik");

function losujKod() {
  const znaki = [...crypto.getRandomValues(new Uint8Array(8))].map((b) => ALFABET[b % ALFABET.length]).join("");
  return `${znaki.slice(0, 4)}-${znaki.slice(4)}`;
}

function tekstPliku() {
  const wiersze = lista.map((u) => {
    let dostep = '"wszystko"';
    if (!u.wszystko) {
      const czesci = DZIALY
        .map((d) => [d.id, RODZAJE.filter((r) => u.dzialy[d.id].has(r.id)).map((r) => `"${r.id}"`)])
        .filter(([, r]) => r.length)
        .map(([d, r]) => `${d}: [${r.join(", ")}]`);
      dostep = czesci.length ? `{ ${czesci.join(", ")} }` : "{}";
      const tematy = DZIALY
        .filter((d) => u.tematy[d.id] && u.dzialy[d.id].size)
        .map((d) => `${d.id}: [${d.tematy.filter((t) => u.tematy[d.id].has(t.id)).map((t) => `"${t.id}"`).join(", ")}]`);
      if (tematy.length) dostep += `, tematy: { ${tematy.join(", ")} }`;
    }
    return `  { imie: ${JSON.stringify(u.imie.trim() || "Uczeń")}, kod: "${u.kod}", dostep: ${dostep} },`;
  });
  return `${NAGLOWEK}\nexport const SOL = "${SOL}";\n\nexport const UCZNIOWIE = [\n${wiersze.join("\n")}\n];\n`;
}

function zmieniono() {
  zmiany = true;
  skopiowane = false;
  document.getElementById("skopiowano").hidden = true;
  plik.value = tekstPliku();
}

function naglowek() {
  document.getElementById("naglowek").replaceChildren(
    el("tr", {},
      el("th", { rowspan: "2", scope: "col" }, "Uczeń"),
      ...DZIALY.map((d) => el("th", { colspan: String(RODZAJE.length), scope: "colgroup" }, d.nazwa)),
      el("th", { rowspan: "2", scope: "col" }, "Wszystko"),
      el("th", { rowspan: "2", scope: "col" }, el("span", { class: "visually-hidden" }, "Usuń")),
    ),
    el("tr", {}, ...DZIALY.flatMap(() => RODZAJE.map((r) => el("th", { scope: "col" }, r.krotko)))),
  );
}

function wiersz(u) {
  const imie = el("input", { class: "name-input", type: "text", value: u.imie, "aria-label": "Imię ucznia" });
  imie.addEventListener("input", () => {
    u.imie = imie.value;
    zmieniono();
  });

  const pola = DZIALY.flatMap((d) =>
    RODZAJE.map((r) => {
      const cb = el("input", { type: "checkbox", "aria-label": `${d.nazwa}: ${r.nazwa}` });
      cb.checked = u.wszystko || u.dzialy[d.id].has(r.id);
      cb.disabled = u.wszystko;
      cb.addEventListener("change", () => {
        const mial = u.dzialy[d.id].size > 0;
        if (cb.checked) u.dzialy[d.id].add(r.id);
        else u.dzialy[d.id].delete(r.id);
        zmieniono();
        if (mial !== u.dzialy[d.id].size > 0) rysuj();
      });
      return el("td", {}, cb);
    }),
  );

  const wszystko = el("input", { type: "checkbox", "aria-label": "Dostęp do wszystkiego" });
  wszystko.checked = u.wszystko;
  wszystko.addEventListener("change", () => {
    u.wszystko = wszystko.checked;
    zmieniono();
    rysuj();
  });

  const usun = el("button", { class: "btn btn-small", type: "button" }, "Usuń");
  usun.addEventListener("click", () => {
    if (!confirm(`Usunąć ucznia ${u.imie}? Jego kod przestanie działać po wklejeniu pliku.`)) return;
    lista.splice(lista.indexOf(u), 1);
    zmieniono();
    rysuj();
  });

  return el("tr", {},
    el("th", { scope: "row" }, imie, u.nowyKod && el("small", { class: "new-code" }, `Kod: ${u.nowyKod}`), !u.wszystko && edytorTematow(u)),
    ...pola,
    el("td", {}, wszystko),
    el("td", {}, usun),
  );
}

/** Ograniczenie do wybranych tematów w działach, do których uczeń ma dostęp (zaznaczone wszystkie = cały dział). */
function edytorTematow(u) {
  const dzialy = DZIALY.filter((d) => u.dzialy[d.id].size);
  if (!dzialy.length) return null;
  const opis = () => {
    const ograniczone = dzialy.filter((d) => u.tematy[d.id]);
    return ograniczone.length ? `Tematy: wybrane (${ograniczone.map((d) => d.nazwa).join(", ")})` : "Tematy: wszystkie";
  };
  const podsumowanie = el("summary", {}, opis());
  const grupy = dzialy.map((d) => el("fieldset", { class: "tematy-dzial" },
    el("legend", {}, d.nazwa),
    ...d.tematy.map((t) => {
      const cb = el("input", { type: "checkbox" });
      cb.checked = !u.tematy[d.id] || u.tematy[d.id].has(t.id);
      cb.addEventListener("change", () => {
        const wybrane = new Set(d.tematy.filter((x) => (x.id === t.id ? cb.checked : !u.tematy[d.id] || u.tematy[d.id].has(x.id))).map((x) => x.id));
        if (wybrane.size === d.tematy.length) delete u.tematy[d.id];
        else u.tematy[d.id] = wybrane;
        podsumowanie.textContent = opis();
        zmieniono();
      });
      return el("label", { class: "tematy-opcja" }, cb, ` ${t.nazwa}`);
    }),
  ));
  return el("details", { class: "tematy-edytor" }, podsumowanie, ...grupy);
}

function rysuj() {
  tbody.replaceChildren(
    ...(lista.length
      ? lista.map(wiersz)
      : [el("tr", {}, el("td", { colspan: String(DZIALY.length * RODZAJE.length + 3), class: "muted" }, "Lista jest pusta – dodaj pierwszego ucznia."))]),
  );
  plik.value = tekstPliku();
}

document.getElementById("losuj-kod").addEventListener("click", () => {
  document.getElementById("nowy-kod").value = losujKod();
});

document.getElementById("nowy-uczen").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const blad = document.getElementById("blad-ucznia");
  const ok = document.getElementById("dodano");
  const imie = form.imie.value.trim();
  const kod = form.kod.value.trim();
  blad.hidden = ok.hidden = true;

  if (normalizujKod(kod).length < 6) {
    blad.textContent = "Kod powinien mieć co najmniej 6 liter lub cyfr. Użyj przycisku „Losuj kod”.";
    blad.hidden = false;
    return;
  }
  const skrot = await skrotKodu(kod);
  const istniejacy = lista.find((u) => u.kod === skrot);
  if (istniejacy) {
    blad.textContent = `Ten kod ma już ${istniejacy.imie}. Wylosuj inny.`;
    blad.hidden = false;
    return;
  }
  lista.push({
    imie,
    kod: skrot,
    wszystko: false,
    dzialy: Object.fromEntries(DZIALY.map((d) => [d.id, new Set()])),
    tematy: {},
    nowyKod: kod.toUpperCase(),
  });
  ok.textContent = `Dodano: ${imie}. Zapisz kod ${kod.toUpperCase()} i przekaż go uczniowi, a w tabeli zaznacz, do czego ma dostęp.`;
  ok.hidden = false;
  form.reset();
  zmieniono();
  rysuj();
});

document.getElementById("kopiuj").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(plik.value);
  } catch {
    plik.select();
    document.execCommand("copy");
  }
  skopiowane = true;
  document.getElementById("skopiowano").hidden = false;
});

addEventListener("beforeunload", (e) => {
  if (zmiany && !skopiowane) e.preventDefault();
});

naglowek();
rysuj();
