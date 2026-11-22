// Zgadnij kąt: 10 rund. Rysujemy losowy kąt (ramiona w dowolnym położeniu), uczeń wpisuje, ile ma stopni.
// Po odpowiedzi: kątomierz na kącie (kreski co 10°, liczby co 30°), przerywane ramię w miejscu odpowiedzi ucznia,
// prawdziwa miara i nazwa kąta (ostry, prosty, rozwarty, półpełny, wklęsły). Najwyżej 100 punktów za rundę.
import { el } from "../dom.js";
import { losuj, ekranStartu, ekranKonca, zapiszRekord, odliczanie, przewinDoGry } from "./wspolne.js";

const RUND = 10;
const ZAKRESY = [
  { id: "do180", nazwa: "Kąty do 180°" },
  { id: "do360", nazwa: "Kąty do 360° (także wklęsłe)" },
].map((z) => ({ ...z, klucz: `kat-${z.id}` }));

const S = 340, C = 170, R = 138;   // rozmiar rysunku, środek (wierzchołek), długość ramion

function losujKat(zakres) {
  let alfa = zakres.id === "do180" ? losuj(15, 168) : losuj(15, 350);
  if (Math.random() < 0.08) alfa = 90;
  else if (zakres.id === "do360" && Math.random() < 0.05) alfa = 180;
  const start = Math.random() < 0.35 ? 0 : losuj(0, 359);
  return { alfa, start };
}

function rodzaj(alfa) {
  if (alfa < 90) return { nazwa: "ostry", opis: "mniejszy od kąta prostego (90°)" };
  if (alfa === 90) return { nazwa: "prosty", opis: "ma dokładnie 90°, ramiona są prostopadłe" };
  if (alfa < 180) return { nazwa: "rozwarty", opis: "większy od prostego (90°), ale mniejszy od półpełnego (180°)" };
  if (alfa === 180) return { nazwa: "półpełny", opis: "ma 180°, ramiona tworzą jedną prostą" };
  return { nazwa: "wklęsły", opis: "większy od półpełnego (180°)" };
}

function ocena(blad) {
  if (blad <= 2) return "Idealnie!";
  if (blad <= 5) return "Świetnie!";
  if (blad <= 12) return "Blisko!";
  if (blad <= 24) return "Nieźle.";
  return "Pudło.";
}

// punkt w odległości r od wierzchołka pod kątem st (w stopniach, przeciwnie do wskazówek zegara, 0 = w prawo)
const pkt = (st, r) => {
  const a = (st * Math.PI) / 180;
  return [C + r * Math.cos(a), C - r * Math.sin(a)];
};
const f = (n) => n.toFixed(1);

/** Rysunek kąta; po odpowiedzi (odp != null) także kątomierz, ramię z odpowiedzią ucznia i miara. */
function rysunek({ alfa, start }, odp = null) {
  const [ax, ay] = pkt(start, R), [bx, by] = pkt(start + alfa, R);
  const r = 42;
  const [sx, sy] = pkt(start, r), [ex, ey] = pkt(start + alfa, r);
  const czesci = [];
  if (odp !== null && alfa === 90) {
    const [p1x, p1y] = pkt(start, 26), [p2x, p2y] = pkt(start + 45, 26 * Math.SQRT2), [p3x, p3y] = pkt(start + 90, 26);
    czesci.push(`<path class="kat-luk" d="M${f(C)} ${f(C)} L${f(p1x)} ${f(p1y)} L${f(p2x)} ${f(p2y)} L${f(p3x)} ${f(p3y)} Z"/>`);
  } else {
    czesci.push(`<path class="kat-luk" d="M${C} ${C} L${f(sx)} ${f(sy)} A${r} ${r} 0 ${alfa > 180 ? 1 : 0} 0 ${f(ex)} ${f(ey)} Z"/>`);
  }
  if (odp !== null) {
    // kątomierz: kreski co 10° od pierwszego ramienia, liczby co 30°
    const do_ = Math.min(360, Math.max(alfa, odp) + 10);
    for (let k = 0; k <= do_; k += 10) {
      const duza = k % 30 === 0;
      const [x1, y1] = pkt(start + k, duza ? 94 : 100), [x2, y2] = pkt(start + k, 108);
      czesci.push(`<line class="kat-podzialka${k <= alfa ? " w-kacie" : ""}" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}"/>`);
      if (duza && k > 0 && k < 360) {
        const [tx, ty] = pkt(start + k, 80);
        czesci.push(`<text class="kat-skala" x="${f(tx)}" y="${f(ty)}" text-anchor="middle" dominant-baseline="central">${k}</text>`);
      }
    }
    if (odp !== alfa && odp >= 0 && odp <= 360) {
      const [ox, oy] = pkt(start + odp, R);
      czesci.push(`<line class="kat-odpowiedz" x1="${C}" y1="${C}" x2="${f(ox)}" y2="${f(oy)}"/>`);
      const [lx, ly] = pkt(start + odp, R + 14);
      czesci.push(`<text class="kat-odpowiedz-napis" x="${f(lx)}" y="${f(ly)}" text-anchor="middle" dominant-baseline="central">Ty: ${odp}°</text>`);
    }
  }
  czesci.push(`<line class="kat-ramie" x1="${C}" y1="${C}" x2="${f(ax)}" y2="${f(ay)}"/>`);
  czesci.push(`<line class="kat-ramie" x1="${C}" y1="${C}" x2="${f(bx)}" y2="${f(by)}"/>`);
  czesci.push(`<circle class="kat-wierzcholek" cx="${C}" cy="${C}" r="4.5"/>`);
  if (odp !== null) {
    const [mx, my] = pkt(start + alfa / 2, alfa < 40 ? 64 : 58);
    czesci.push(`<text class="kat-miara" x="${f(mx)}" y="${f(my)}" text-anchor="middle" dominant-baseline="central">${alfa}°</text>`);
  }
  const s = el("div", { class: "kat-rysunek", role: "img", "aria-label": odp === null ? "Kąt do odgadnięcia" : `Kąt ma ${alfa} stopni, Twoja odpowiedź: ${odp} stopni` });
  s.innerHTML = `<svg viewBox="-24 -24 ${S + 48} ${S + 48}" aria-hidden="true">${czesci.join("")}</svg>`;
  return s;
}

export function uruchom(kontener) {
  let zakres = ZAKRESY[0];
  pokazStart();

  function pokazStart() {
    kontener.replaceChildren(ekranStartu({
      zasady: [
        "Zobaczysz kąt. Oszacuj na oko, ile ma stopni, wpisz liczbę i naciśnij „Sprawdź” (albo Enter).",
        "Porównuj z kątem prostym (90°), jego połową (45°) i kątem półpełnym (180°).",
        "Za dokładny strzał dostajesz 100 punktów, za każdy stopień różnicy o 4 mniej. Rund jest dziesięć.",
      ],
      zakresy: ZAKRESY,
      wybrany: zakres.id,
      opisRekordu: (p) => `${p} z ${RUND * 100} punktów`,
      onStart: (z) => { zakres = z; graj(); },
    }));
  }

  function graj() {
    const wyniki = [];   // { kat, odp, blad, pkt }
    let kat = null, nr = 0, sprawdzony = false;

    const licznikRund = el("span", { class: "gra-licznik-wartosc" }, `0 z ${RUND}`);
    const punkty = el("span", { class: "gra-licznik-wartosc" }, "0");
    const plansza = el("div", { class: "kat-plansza" });
    const pole = el("input", { type: "text", class: "kat-pole", inputmode: "numeric", maxlength: "3", autocomplete: "off", "aria-label": "Ile stopni ma ten kąt?", placeholder: "?" });
    const przycisk = el("button", { type: "button", class: "btn btn-primary kat-sprawdz" }, "Sprawdź");
    const wynik = el("div", { class: "kat-wynik", "aria-live": "polite" });

    kontener.replaceChildren(el("div", { class: "gra-ekran kat" },
      plansza,
      el("div", { class: "kat-panel" },
        el("div", { class: "gra-liczniki" },
          el("span", { class: "gra-licznik" }, el("span", { class: "gra-licznik-nazwa" }, "Kąt"), licznikRund),
          el("span", { class: "gra-licznik" }, el("span", { class: "gra-licznik-nazwa" }, "Punkty"), punkty)),
        el("label", { class: "kat-pytanie" }, "Ile stopni ma ten kąt?",
          el("span", { class: "kat-wpis" }, pole, el("span", { class: "kat-stopnie", "aria-hidden": "true" }, "°"))),
        przycisk,
        wynik)));

    function nowaRunda() {
      nr++;
      kat = losujKat(zakres);
      sprawdzony = false;
      licznikRund.textContent = `${nr} z ${RUND}`;
      plansza.replaceChildren(rysunek(kat));
      pole.value = "";
      pole.disabled = false;
      wynik.replaceChildren();
      przycisk.textContent = "Sprawdź";
      pole.focus({ preventScroll: true });
    }

    function sprawdz() {
      if (!kat) return;
      if (sprawdzony) return nastepny();
      const odp = Number(pole.value.trim());
      if (!pole.value.trim() || !Number.isInteger(odp) || odp < 0 || odp > 360) {
        wynik.replaceChildren(el("p", { class: "kat-uwaga" }, "Wpisz liczbę stopni od 0 do 360."));
        pole.focus();
        return;
      }
      sprawdzony = true;
      const blad = Math.abs(odp - kat.alfa);
      const p = Math.max(0, 100 - 4 * blad);
      wyniki.push({ kat, odp, blad, pkt: p });
      punkty.textContent = String(wyniki.reduce((s, w) => s + w.pkt, 0));
      plansza.replaceChildren(rysunek(kat, odp));
      const r = rodzaj(kat.alfa);
      wynik.replaceChildren(
        el("p", { class: `kat-ocena ${p >= 80 ? "dobrze" : p > 0 ? "srednio" : "zle"}` }, `${ocena(blad)} +${p} pkt`),
        el("p", {}, `Kąt ma ${kat.alfa}°, Twoja odpowiedź: ${odp}°${blad ? ` (różnica ${blad}°)` : ""}.`),
        el("p", { class: "kat-rodzaj" }, `To kąt ${r.nazwa} – ${r.opis}.`),
      );
      pole.disabled = true;
      przycisk.textContent = nr < RUND ? "Następny kąt" : "Zobacz wynik";
      przycisk.focus({ preventScroll: true });
    }

    function nastepny() {
      if (nr < RUND) nowaRunda();
      else koniec();
    }

    przycisk.addEventListener("click", sprawdz);
    pole.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); sprawdz(); } });
    pole.addEventListener("input", () => { pole.value = pole.value.replace(/\D/g, "").slice(0, 3); });

    function koniec() {
      const suma = wyniki.reduce((s, w) => s + w.pkt, 0);
      const slabe = wyniki.filter((w) => w.blad > 15);
      kontener.replaceChildren(ekranKonca({
        tytul: suma >= 850 ? "Masz kątomierz w oku!" : suma >= 600 ? "Bardzo dobre oko do kątów!" : suma >= 300 ? "Dobry początek – porównuj kąty z kątem prostym." : "Kąty trzeba jeszcze poćwiczyć – spróbuj jeszcze raz.",
        wynik: `${suma} / ${RUND * 100}`,
        nowyRekord: zapiszRekord(zakres.klucz, suma),
        szczegoly: [
          el("p", { class: "gra-statystyki" }, `Średnia różnica: ${Math.round(wyniki.reduce((s, w) => s + w.blad, 0) / wyniki.length)}°`),
          slabe.length > 0 && el("div", { class: "gra-powtorka" },
            el("p", { class: "gra-powtorka-tytul" }, "Do powtórki"),
            el("ul", {}, ...slabe.map((w) => el("li", {}, `kąt ${w.kat.alfa}° (${rodzaj(w.kat.alfa).nazwa}) – Twoja odpowiedź: ${w.odp}°`)))),
        ],
        onZnowu: graj,
        onZmien: pokazStart,
      }));
    }

    pole.disabled = true;
    const ekran = kontener.firstElementChild;
    przewinDoGry(ekran);
    odliczanie(ekran).then(nowaRunda);
  }
}
