// Strzał na osi: 10 rund. Na osi liczbowej trzeba wskazać liczbę (całkowitą, dziesiętną albo ułamek zwykły).
// Kliknięcie albo dotknięcie stawia znacznik (można go przeciągać, a klawiaturą przesuwać strzałkami), „Strzelam!”
// pokazuje, gdzie naprawdę leży liczba, ile zabrakło i krótko wyjaśnia, jak ją znaleźć. Najwyżej 100 punktów za rundę.
import { el } from "../dom.js";
import { losuj, wybierz, liczba, ulamek, ekranStartu, ekranKonca, zapiszRekord, odliczanie, przewinDoGry } from "./wspolne.js";

const RUND = 10;
const ZAKRESY = [
  { id: "calkowite", nazwa: "Liczby całkowite" },
  { id: "dziesietne", nazwa: "Ułamki dziesiętne" },
  { id: "zwykle", nazwa: "Ułamki zwykłe" },
  { id: "wszystko", nazwa: "Wszystko naraz" },
].map((z) => ({ ...z, klucz: `os-${z.id}` }));

const nwd = (a, b) => (b ? nwd(b, a % b) : Math.abs(a));
const tekst = (...czesci) => el("span", {}, ...czesci);

// --- Rundy: { od, do, krok (co ile kreski), etykiety, cel, napis (element), wyjasnienie (element) }
function calkowita() {
  const wariant = wybierz(["krotka", "dluga", "krzywa"]);
  if (wariant === "dluga") {
    let cel;
    do cel = losuj(-49, 49); while (cel % 10 === 0);
    const dol = Math.floor(cel / 10) * 10;
    return {
      od: -50, do: 50, krok: 10, etykiety: [-50, 0, 50], cel,
      wyjasnienie: tekst(`Kreski są co 10, więc ${liczba(cel)} leży między ${liczba(dol)} a ${liczba(dol + 10)}, bliżej ${liczba(Math.abs(cel - dol) <= 5 ? dol : dol + 10)}.`),
    };
  }
  const [od, d] = wariant === "krotka" ? [-10, 10] : [-5 * losuj(2, 4), 5 * losuj(1, 3)];
  let cel;
  do cel = losuj(od + 1, d - 1); while (cel === 0);
  const ile = Math.abs(cel);
  return {
    od, do: d, krok: 1, etykiety: [od, 0, d], cel,
    wyjasnienie: tekst(`Kreski są co 1. ${liczba(cel)} to ${ile} ${ile === 1 ? "kreska" : ile < 5 ? "kreski" : "kresek"} na ${cel < 0 ? "lewo" : "prawo"} od zera.`),
  };
}

function dziesietna() {
  const wariant = wybierz(["setne", "do3", "ujemne"]);
  if (wariant === "setne") {
    let s;
    do s = losuj(3, 97); while (s % 10 === 0);
    const cel = s / 100, d = Math.floor(s / 10) / 10;
    return {
      od: 0, do: 1, krok: 0.1, etykiety: [0, 0.5, 1], cel,
      wyjasnienie: tekst(`Kreski są co 0,1. ${liczba(cel)} to ${s} setnych – leży między ${liczba(d)} a ${liczba(d + 0.1)}${s % 10 === 5 ? ", dokładnie w połowie" : s % 10 < 5 ? ", bliżej " + liczba(d) : ", bliżej " + liczba(d + 0.1)}.`),
    };
  }
  if (wariant === "do3") {
    let d;
    do d = losuj(1, 29); while (d % 10 === 0);
    const cel = d / 10;
    return {
      od: 0, do: 3, krok: 0.1, etykiety: [0, 1, 2, 3], cel,
      wyjasnienie: tekst(`${liczba(cel)} to ${Math.floor(cel)} i jeszcze ${d % 10} ${d % 10 === 1 ? "kreska" : d % 10 < 5 ? "kreski" : "kresek"} po 0,1.`),
    };
  }
  const d = losuj(1, 9), cel = -d / 10;
  return {
    od: -1, do: 1, krok: 0.1, etykiety: [-1, 0, 1], cel,
    wyjasnienie: tekst(`Kreski są co 0,1. ${liczba(cel)} to ${d} ${d === 1 ? "kreska" : d < 5 ? "kreski" : "kresek"} na lewo od zera.`),
  };
}

function zwykla() {
  const wariant = wybierz(["czesci", "do2", "ujemne"]);
  const licznikDo = (m, maks) => { let l; do l = losuj(1, maks); while (nwd(l, m) !== 1); return l; };
  if (wariant === "czesci") {
    const m = wybierz([3, 4, 5, 6, 8, 10]), l = licznikDo(m, m - 1);
    return {
      od: 0, do: 1, krok: 1 / m, etykiety: [0, 1], cel: l / m, napis: ulamek(l, m),
      wyjasnienie: tekst("Odcinek od 0 do 1 jest podzielony na ", String(m), " równe części – ", ulamek(l, m), ` to ${l} z nich, licząc od zera.`),
    };
  }
  if (wariant === "do2") {
    let m, l;
    do { m = wybierz([3, 4, 5, 8]); l = licznikDo(m, 2 * m - 1); } while (l === m);
    const cale = Math.floor(l / m), reszta = l % m;
    return {
      od: 0, do: 2, krok: 0.5, etykiety: [0, 1, 2], cel: l / m, napis: ulamek(l, m),
      wyjasnienie: cale
        ? tekst(ulamek(l, m), " to 1 i jeszcze ", ulamek(reszta, m), ` – za jedynką odliczasz ${reszta} ${reszta === 1 ? "część" : reszta < 5 ? "części" : "części"} z ${m}.`)
        : tekst(ulamek(l, m), ` leży przed jedynką: odcinek od 0 do 1 dzielisz w myślach na ${m} części i bierzesz ${l}.`),
    };
  }
  const m = wybierz([2, 3, 4, 5]), l = licznikDo(m, m - 1);
  return {
    od: -1, do: 1, krok: 1 / m, etykiety: [-1, 0, 1], cel: -l / m, napis: ulamek(l, m, { minus: true }),
    wyjasnienie: tekst(ulamek(l, m, { minus: true }), " leży na lewo od zera: odcinek od 0 do −1 dzielisz na ", String(m), ` części i bierzesz ${l}.`),
  };
}

const RUNDY = { calkowite: calkowita, dziesietne: dziesietna, zwykle: zwykla, wszystko: () => wybierz([calkowita, dziesietna, zwykla])() };

function ocena(pkt) {
  if (pkt >= 95) return "Bez pudła!";
  if (pkt >= 75) return "Bardzo blisko!";
  if (pkt >= 40) return "Nieźle!";
  if (pkt > 0) return "Na granicy.";
  return "Pudło.";
}

export function uruchom(kontener) {
  let zakres = ZAKRESY[0];
  pokazStart();

  function pokazStart() {
    kontener.replaceChildren(ekranStartu({
      zasady: [
        "Na górze jest liczba. Kliknij albo dotknij oś tam, gdzie według Ciebie leży. Znacznik możesz przeciągnąć, a klawiaturą przesunąć strzałkami.",
        "Kiedy jesteś pewny, naciśnij „Strzelam!” (albo Enter). Im bliżej, tym więcej punktów – najwyżej 100 za strzał.",
        "Po każdym strzale zobaczysz, gdzie naprawdę leży ta liczba i jak ją było znaleźć.",
      ],
      zakresy: ZAKRESY,
      wybrany: zakres.id,
      opisRekordu: (p) => `${p} z ${RUND * 100} punktów`,
      onStart: (z) => { zakres = z; graj(); },
    }));
  }

  function graj() {
    const wyniki = [];   // { runda, strzal, pkt }
    let runda = null, strzal = null, oddany = false, nr = 0, W = 700;
    const H = 150, M = 34, Y = 78;

    const licznikRund = el("span", { class: "gra-licznik-wartosc" });
    const punkty = el("span", { class: "gra-licznik-wartosc" }, "0");
    const cel = el("span", { class: "os-cel" });
    const os = el("div", {
      class: "os-plansza", tabindex: "0", role: "slider", "aria-label": "Twój strzał na osi liczbowej",
    });
    const przycisk = el("button", { type: "button", class: "btn btn-primary os-strzel", disabled: true }, "Strzelam!");
    const wynikRundy = el("div", { class: "os-wynik", "aria-live": "polite" });

    kontener.replaceChildren(el("div", { class: "gra-ekran os" },
      el("div", { class: "gra-liczniki" },
        el("span", { class: "gra-licznik" }, el("span", { class: "gra-licznik-nazwa" }, "Strzał"), licznikRund),
        el("span", { class: "gra-licznik" }, el("span", { class: "gra-licznik-nazwa" }, "Punkty"), punkty)),
      el("p", { class: "os-polecenie" }, "Gdzie leży ", cel, "?"),
      os,
      el("div", { class: "os-akcje" }, przycisk),
      wynikRundy));

    const xWart = (v) => M + ((v - runda.od) / (runda.do - runda.od)) * (W - 2 * M);
    const wartX = (x) => runda.od + ((x - M) / (W - 2 * M)) * (runda.do - runda.od);
    const etykieta = (v) => liczba(v);

    function rysuj() {
      W = Math.max(300, Math.round(os.getBoundingClientRect().width));
      const r = runda;
      const czesci = [];
      czesci.push(`<line class="os-linia" x1="${M - 18}" y1="${Y}" x2="${W - M + 22}" y2="${Y}"/><path class="os-grot" d="M${W - M + 24} ${Y} l-11 -6 v12 z"/>`);
      const n = Math.round((r.do - r.od) / r.krok);
      for (let k = 0; k <= n; k++) {
        const v = r.od + k * r.krok, x = xWart(v);
        const duza = r.etykiety.some((e) => Math.abs(e - v) < 1e-9);
        czesci.push(`<line class="${duza ? "os-kreska-duza" : "os-kreska"}" x1="${x}" y1="${Y - (duza ? 13 : 8)}" x2="${x}" y2="${Y + (duza ? 13 : 8)}"/>`);
        if (duza) czesci.push(`<text class="os-etykieta" x="${x}" y="${Y + 38}" text-anchor="middle">${etykieta(v)}</text>`);
      }
      if (oddany) {
        const xc = xWart(r.cel), xs = xWart(strzal);
        czesci.push(`<line class="os-roznica" x1="${Math.min(xc, xs)}" y1="${Y - 30}" x2="${Math.max(xc, xs)}" y2="${Y - 30}"/>`);
        czesci.push(`<g class="os-flaga"><line x1="${xc}" y1="${Y + 2}" x2="${xc}" y2="${Y - 46}"/><path d="M${xc} ${Y - 46} h22 l-6 7 l6 7 h-22 z"/></g>`);
      }
      if (strzal !== null) {
        const xs = xWart(strzal);
        czesci.push(`<g class="os-znacznik"><line x1="${xs}" y1="${Y}" x2="${xs}" y2="${Y - 22}"/><circle cx="${xs}" cy="${Y - 30}" r="9"/><circle class="os-znacznik-srodek" cx="${xs}" cy="${Y - 30}" r="3"/></g>`);
      }
      os.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true">${czesci.join("")}</svg>`;
    }

    function nowaRunda() {
      nr++;
      runda = RUNDY[zakres.id]();
      strzal = null;
      oddany = false;
      licznikRund.textContent = `${nr} z ${RUND}`;
      cel.replaceChildren(runda.napis ?? liczba(runda.cel));
      wynikRundy.replaceChildren();
      przycisk.textContent = "Strzelam!";
      przycisk.disabled = true;
      os.setAttribute("aria-valuemin", String(runda.od));
      os.setAttribute("aria-valuemax", String(runda.do));
      os.removeAttribute("aria-valuenow");
      os.setAttribute("aria-valuetext", "znacznik jeszcze nie postawiony");
      rysuj();
    }

    function ustaw(v) {
      if (!runda || oddany) return;
      strzal = Math.min(runda.do, Math.max(runda.od, v));
      przycisk.disabled = false;
      os.setAttribute("aria-valuenow", String(strzal));
      os.setAttribute("aria-valuetext", `około ${liczba(Math.round(strzal * 100) / 100)}`);
      rysuj();
    }

    function strzel() {
      if (strzal === null) return;
      if (oddany) return nastepny();
      oddany = true;
      const blad = Math.abs(strzal - runda.cel) / (runda.do - runda.od);
      const pkt = Math.round(100 * Math.max(0, 1 - blad / 0.08));
      wyniki.push({ runda, strzal, pkt });
      punkty.textContent = String(wyniki.reduce((s, w) => s + w.pkt, 0));
      const dokladnosc = Math.abs(runda.krok) < 1 ? 100 : 10;
      const strzalTekst = liczba(Math.round(strzal * dokladnosc) / dokladnosc);
      wynikRundy.replaceChildren(
        el("p", { class: `os-ocena ${pkt >= 75 ? "dobrze" : pkt > 0 ? "srednio" : "zle"}` }, `${ocena(pkt)} +${pkt} pkt`),
        el("p", { class: "os-szczegoly" }, "Szukana liczba: ", runda.napis ? runda.napis.cloneNode(true) : liczba(runda.cel),
          runda.napis ? ` = ${liczba(Math.round(runda.cel * 1000) / 1000)}` : "", `. Twój strzał: około ${strzalTekst}.`),
        el("p", { class: "os-wyjasnienie" }, runda.wyjasnienie),
      );
      przycisk.textContent = nr < RUND ? "Następna liczba" : "Zobacz wynik";
      rysuj();
      przycisk.focus();
    }

    function nastepny() {
      if (nr < RUND) { nowaRunda(); os.focus(); return; }
      koniec();
    }

    // Wskazywanie: klik/dotyk stawia znacznik, przeciąganie go przesuwa
    let ciagnie = false;
    const zPozycji = (e) => {
      const r = os.getBoundingClientRect();
      return wartX(((e.clientX - r.left) / r.width) * W);
    };
    os.addEventListener("pointerdown", (e) => {
      if (!runda || oddany) return;
      ciagnie = true;
      os.setPointerCapture(e.pointerId);
      ustaw(zPozycji(e));
    });
    os.addEventListener("pointermove", (e) => { if (ciagnie) ustaw(zPozycji(e)); });
    const pusc = () => { ciagnie = false; };
    os.addEventListener("pointerup", pusc);
    os.addEventListener("pointercancel", pusc);
    os.addEventListener("keydown", (e) => {
      if (!runda) return;
      const zakresOsi = runda.do - runda.od;
      const krok = (e.shiftKey ? 0.1 : 0.01) * zakresOsi;
      const start = strzal ?? (runda.od + runda.do) / 2;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") ustaw(strzal === null ? start : strzal + krok);
      else if (e.key === "ArrowLeft" || e.key === "ArrowDown") ustaw(strzal === null ? start : strzal - krok);
      else if (e.key === "Enter") strzel();
      else return;
      e.preventDefault();
    });
    przycisk.addEventListener("click", strzel);
    const obserwator = new ResizeObserver(() => { if (runda) rysuj(); });
    obserwator.observe(os);

    function koniec() {
      obserwator.disconnect();
      const suma = wyniki.reduce((s, w) => s + w.pkt, 0);
      const nowyRekord = zapiszRekord(zakres.klucz, suma);
      const slabe = wyniki.filter((w) => w.pkt < 50);
      kontener.replaceChildren(ekranKonca({
        tytul: suma >= 850 ? "Snajper osi liczbowej!" : suma >= 600 ? "Celne oko!" : suma >= 300 ? "Dobry początek – kolejna runda pójdzie lepiej." : "Oś liczbową trzeba jeszcze poćwiczyć – spróbuj jeszcze raz.",
        wynik: `${suma} / ${RUND * 100}`,
        nowyRekord,
        szczegoly: [
          el("p", { class: "gra-statystyki" }, `Strzały za co najmniej 75 punktów: ${wyniki.filter((w) => w.pkt >= 75).length} z ${RUND}`),
          slabe.length > 0 && el("div", { class: "gra-powtorka" },
            el("p", { class: "gra-powtorka-tytul" }, "Do powtórki"),
            el("ul", {}, ...slabe.map((w) => el("li", {},
              w.runda.napis ? w.runda.napis.cloneNode(true) : liczba(w.runda.cel),
              ` (oś od ${liczba(w.runda.od)} do ${liczba(w.runda.do)})`)))),
        ],
        onZnowu: graj,
        onZmien: pokazStart,
      }));
    }

    cel.textContent = "…";
    const ekran = kontener.firstElementChild;
    przewinDoGry(ekran);
    odliczanie(ekran).then(() => { nowaRunda(); os.focus({ preventScroll: true }); });
  }
}
