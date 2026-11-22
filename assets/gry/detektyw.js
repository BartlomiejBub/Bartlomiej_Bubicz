// Detektyw liczb: ukryta liczba od 1 do 100, wskazówki o podzielności, liczbach pierwszych, cyfrach i wielkości.
// Uczeń wskazuje liczbę na planszy 10 × 10, kiedy uzna, że wie. Za zagadkę 10 punktów, mniej o 1 za każdą
// dodatkową wskazówkę, o 2 za zły strzał i o 3 za podpowiedź „Pokaż, co pasuje”. Zły strzał gra wyjaśnia:
// której wskazówce ta liczba przeczy i dlaczego (np. suma cyfr, dzielenie z resztą, rozkład na czynniki).
import { el } from "../dom.js";
import { losuj, wybierz, tasuj, ekranStartu, ekranKonca, zapiszRekord } from "./wspolne.js";

const ZAGADEK = 5;
const KLUCZ = "detektyw";

const cyfry = (n) => String(n).split("").map(Number);
const sumaCyfr = (n) => cyfry(n).reduce((a, b) => a + b, 0);
const pierwsza = (n) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
const kwadrat = (n) => Number.isInteger(Math.sqrt(n));
const dzielnik = (n) => { for (let d = 2; d * d <= n; d++) if (n % d === 0) return d; return n; };
const pelneDziesiatki = (d) => (d === 1 ? "1 pełną dziesiątkę" : d >= 2 && d <= 4 ? `${d} pełne dziesiątki` : `${d} pełnych dziesiątek`);

const ZASADY_DZIELENIA = {
  3: "Liczba dzieli się przez 3, gdy suma jej cyfr dzieli się przez 3.",
  4: "Liczba dzieli się przez 4, gdy liczba z jej dwóch ostatnich cyfr dzieli się przez 4.",
  5: "Liczba dzieli się przez 5, gdy kończy się cyfrą 0 albo 5.",
  6: "Liczba dzieli się przez 6, gdy jest parzysta i dzieli się przez 3.",
  9: "Liczba dzieli się przez 9, gdy suma jej cyfr dzieli się przez 9.",
  10: "Liczba dzieli się przez 10, gdy kończy się cyfrą 0.",
};

/** Wszystkie prawdziwe wskazówki o liczbie n: { typ, tekst, zasada?, p(m) – czy m pasuje, dlaczego(m) – wyjaśnienie dla m }. */
function wskazowkiO(n) {
  const w = [];
  const parz = n % 2 === 0;
  w.push({
    typ: "parzystosc", tekst: parz ? "Jestem liczbą parzystą." : "Jestem liczbą nieparzystą.",
    zasada: "Liczby parzyste kończą się cyfrą 0, 2, 4, 6 albo 8.",
    p: (m) => (m % 2 === 0) === parz,
    dlaczego: (m) => `${m} kończy się cyfrą ${m % 10}, więc jest ${m % 2 ? "nieparzysta" : "parzysta"}`,
  });
  for (const k of [3, 4, 5, 6, 9, 10]) {
    const tak = n % k === 0;
    if (!tak && k !== 3 && k !== 5) continue;   // przeczenia tylko „nie dzielę się przez 3/5” – reszta mało mówi
    w.push({
      typ: `przez${k}`, tekst: tak ? `Dzielę się przez ${k}.` : `Nie dzielę się przez ${k}.`, zasada: ZASADY_DZIELENIA[k],
      p: (m) => (m % k === 0) === tak,
      dlaczego: (m) => (k === 3 || k === 9
        ? `suma cyfr ${m} to ${cyfry(m).join(" + ")} = ${sumaCyfr(m)}, a to ${sumaCyfr(m) % k ? "nie dzieli się" : "dzieli się"} przez ${k}`
        : m % k ? `${m} : ${k} = ${Math.floor(m / k)} reszty ${m % k}` : `${m} : ${k} = ${m / k} bez reszty`),
    });
  }
  const pier = pierwsza(n);
  w.push({
    typ: "pierwsza", tekst: pier ? "Jestem liczbą pierwszą." : "Nie jestem liczbą pierwszą.",
    zasada: "Liczba pierwsza ma dokładnie dwa dzielniki: 1 i samą siebie. 1 nie jest liczbą pierwszą.",
    p: (m) => pierwsza(m) === pier,
    dlaczego: (m) => (m === 1 ? "1 nie jest liczbą pierwszą"
      : pierwsza(m) ? `${m} dzieli się tylko przez 1 i przez ${m}, więc jest pierwsza`
        : `${m} = ${dzielnik(m)} · ${m / dzielnik(m)}, więc nie jest pierwsza`),
  });
  if (kwadrat(n)) {
    w.push({
      typ: "kwadrat", tekst: "Jestem kwadratem liczby naturalnej – iloczynem dwóch takich samych liczb.",
      zasada: "Kwadraty do 100: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100.",
      p: kwadrat,
      dlaczego: (m) => `${m} nie jest iloczynem dwóch takich samych liczb naturalnych`,
    });
  }
  const s = sumaCyfr(n);
  w.push({
    typ: "suma", tekst: `Suma moich cyfr to ${s}.`, zasada: "Dodaj cyfry, np. dla 47: 4 + 7 = 11.",
    p: (m) => sumaCyfr(m) === s,
    dlaczego: (m) => `suma cyfr ${m} to ${m < 10 ? m : `${cyfry(m).join(" + ")} = ${sumaCyfr(m)}`}`,
  });
  const progi = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  const wieksze = progi.filter((x) => n > x), mniejsze = progi.filter((x) => n < x);
  if (wieksze.length) {
    const x = wybierz(wieksze);
    w.push({ typ: "wieksza", tekst: `Jestem większa niż ${x}.`, p: (m) => m > x, dlaczego: (m) => `${m} nie jest większa niż ${x}` });
  }
  if (mniejsze.length) {
    const x = wybierz(mniejsze);
    w.push({ typ: "mniejsza", tekst: `Jestem mniejsza niż ${x}.`, p: (m) => m < x, dlaczego: (m) => `${m} nie jest mniejsza niż ${x}` });
  }
  return w;
}

// Wskazówki dokładne (na koniec, gdy zostało kilka liczb): cyfra jedności i liczba dziesiątek – razem wyznaczają liczbę.
function cyfraJednosci(n) {
  return { typ: "jednosci", tekst: `Moja ostatnia cyfra to ${n % 10}.`, p: (m) => m % 10 === n % 10, dlaczego: (m) => `ostatnia cyfra ${m} to ${m % 10}` };
}
function dziesiatki(n) {
  const d = Math.floor(n / 10);
  return {
    typ: "dziesiatki", tekst: d ? `Mam ${pelneDziesiatki(d)}.` : "Jestem liczbą jednocyfrową.",
    zasada: d ? "Np. 47 ma 4 pełne dziesiątki (40) i jeszcze 7." : null,
    p: (m) => Math.floor(m / 10) === d,
    dlaczego: (m) => (Math.floor(m / 10) ? `${m} ma ${pelneDziesiatki(Math.floor(m / 10))}` : `${m} jest jednocyfrowa`),
  };
}

/** Zagadka: liczba i kolejne wskazówki – najpierw ogólne, dzielące pole mniej więcej na pół, na końcu dokładne. */
function zagadka() {
  const n = losuj(1, 100);
  let kandydaci = Array.from({ length: 100 }, (_, i) => i + 1);
  const wybrane = [];
  const pula = tasuj(wskazowkiO(n));
  while (kandydaci.length > 1 && wybrane.length < 5) {
    const opcje = pula
      .filter((c) => !wybrane.includes(c))
      .map((c) => ({ c, zostaje: kandydaci.filter(c.p) }))
      .filter((o) => o.zostaje.length < kandydaci.length);
    if (!opcje.length) break;
    const umiarkowane = opcje.filter((o) => o.zostaje.length > 1 && o.zostaje.length >= kandydaci.length * 0.2 && o.zostaje.length <= kandydaci.length * 0.7);
    const zostawiajace = opcje.filter((o) => o.zostaje.length > 1);
    const o = wybierz(wybrane.length < 3 && umiarkowane.length ? umiarkowane : zostawiajace.length && wybrane.length < 3 ? zostawiajace : opcje);
    wybrane.push(o.c);
    kandydaci = o.zostaje;
  }
  for (const dokladna of [cyfraJednosci(n), dziesiatki(n)]) {
    if (kandydaci.length <= 1) break;
    if (kandydaci.filter(dokladna.p).length < kandydaci.length) {
      wybrane.push(dokladna);
      kandydaci = kandydaci.filter(dokladna.p);
    }
  }
  return { n, wskazowki: wybrane };
}

export { zagadka };

export function uruchom(kontener) {
  const zakresy = [{ id: KLUCZ, nazwa: "Liczby od 1 do 100", klucz: KLUCZ }];
  pokazStart();

  function pokazStart() {
    kontener.replaceChildren(ekranStartu({
      zasady: [
        "Ukryłem liczbę od 1 do 100. Dostajesz o niej pierwszą wskazówkę – kolejne bierzesz, kiedy chcesz.",
        "Kiedy wiesz, która to liczba, kliknij ją na planszy. Za zagadkę dostajesz 10 punktów, ale mniej o 1 za każdą dodatkową wskazówkę i o 2 za zły strzał.",
        "„Pokaż, co pasuje” wyszarza liczby, które nie pasują do wskazówek – kosztuje 3 punkty.",
        `Zagadek jest ${ZAGADEK}. Najwyżej ${ZAGADEK * 10} punktów.`,
      ],
      zakresy,
      wybrany: KLUCZ,
      opisRekordu: (p) => `${p} z ${ZAGADEK * 10} punktów`,
      onStart: graj,
    }));
  }

  function graj() {
    const wyniki = [];   // punkty za każdą zagadkę
    let z = null, pokazane = 0, zle = 0, podpowiedz = false, rozwiazana = false, nr = 0;

    const licznikZagadek = el("span", { class: "gra-licznik-wartosc" });
    const punkty = el("span", { class: "gra-licznik-wartosc" }, "0");
    const zaTe = el("span", { class: "gra-licznik-wartosc" });
    const lista = el("ol", { class: "det-wskazowki" });
    const komunikat = el("div", { class: "det-komunikat", "aria-live": "polite" });
    const nastepna = el("button", { type: "button", class: "btn" }, "Następna wskazówka (−1)");
    const pokaz = el("button", { type: "button", class: "btn" }, "Pokaż, co pasuje (−3)");
    const dalej = el("button", { type: "button", class: "btn btn-primary", hidden: true });
    const pola = Array.from({ length: 100 }, (_, i) => {
      const b = el("button", { type: "button", class: "det-pole", "data-n": String(i + 1) }, String(i + 1));
      b.addEventListener("click", () => strzal(i + 1, b));
      return b;
    });

    kontener.replaceChildren(el("div", { class: "gra-ekran det" },
      el("div", { class: "det-lewa" },
        el("div", { class: "gra-liczniki" },
          el("span", { class: "gra-licznik" }, el("span", { class: "gra-licznik-nazwa" }, "Zagadka"), licznikZagadek),
          el("span", { class: "gra-licznik" }, el("span", { class: "gra-licznik-nazwa" }, "Za tę zagadkę"), zaTe),
          el("span", { class: "gra-licznik" }, el("span", { class: "gra-licznik-nazwa" }, "Razem"), punkty)),
        el("p", { class: "det-tytul" }, "Wskazówki"),
        lista,
        el("div", { class: "det-przyciski" }, nastepna, pokaz, dalej),
        komunikat),
      el("div", { class: "det-plansza", role: "group", "aria-label": "Liczby od 1 do 100 – kliknij tę, którą obstawiasz" }, ...pola)));

    const zaZagadke = () => Math.max(1, 10 - (pokazane - 1) - 2 * zle - (podpowiedz ? 3 : 0));

    function nowaZagadka() {
      nr++;
      z = zagadka();
      pokazane = 1;
      zle = 0;
      podpowiedz = false;
      rozwiazana = false;
      licznikZagadek.textContent = `${nr} z ${ZAGADEK}`;
      for (const p of pola) { p.className = "det-pole"; p.disabled = false; p.removeAttribute("aria-label"); }
      komunikat.replaceChildren();
      dalej.hidden = true;
      odswiez();
    }

    function odswiez() {
      lista.replaceChildren(...z.wskazowki.slice(0, pokazane).map((w) =>
        el("li", {}, el("span", { class: "det-wskazowka" }, w.tekst), w.zasada && el("span", { class: "det-zasada" }, w.zasada))));
      zaTe.textContent = rozwiazana ? `+${wyniki.at(-1)}` : String(zaZagadke());
      punkty.textContent = String(wyniki.reduce((a, b) => a + b, 0));
      nastepna.disabled = rozwiazana || pokazane >= z.wskazowki.length;
      pokaz.disabled = rozwiazana || podpowiedz;
      if (podpowiedz) {
        const widoczne = z.wskazowki.slice(0, pokazane);
        for (const p of pola) p.classList.toggle("wyszarzone", !widoczne.every((w) => w.p(Number(p.dataset.n))));
      }
    }

    function strzal(m, b) {
      if (rozwiazana || b.classList.contains("skreslone")) return;
      if (m === z.n) {
        rozwiazana = true;
        wyniki.push(zaZagadke());
        b.classList.add("trafione");
        for (const p of pola) if (p !== b) p.disabled = true;
        komunikat.replaceChildren(
          el("p", { class: "det-brawo" }, `Brawo! Szukana liczba to ${z.n}. +${wyniki.at(-1)} pkt`),
          pokazane < z.wskazowki.length && el("p", { class: "det-reszta" }, "Pozostałe wskazówki: ",
            z.wskazowki.slice(pokazane).map((w) => w.tekst).join(" "))) ;
        dalej.textContent = nr < ZAGADEK ? "Następna zagadka" : "Zobacz wynik";
        dalej.hidden = false;
        odswiez();
        dalej.focus();
        return;
      }
      zle++;
      b.classList.add("skreslone");
      b.setAttribute("aria-label", `${m} – skreślona`);
      const sprzeczna = z.wskazowki.slice(0, pokazane).find((w) => !w.p(m));
      komunikat.replaceChildren(sprzeczna
        ? el("p", { class: "det-zle" }, `${m} nie pasuje do wskazówki „${sprzeczna.tekst}”: ${sprzeczna.dlaczego(m)}.`)
        : el("p", { class: "det-zle" }, `${m} pasuje do wszystkich wskazówek, ale to nie ta liczba. Weź następną wskazówkę.`));
      odswiez();
    }

    nastepna.addEventListener("click", () => { if (pokazane < z.wskazowki.length) { pokazane++; komunikat.replaceChildren(); odswiez(); } });
    pokaz.addEventListener("click", () => { podpowiedz = true; odswiez(); });
    dalej.addEventListener("click", () => (nr < ZAGADEK ? nowaZagadka() : koniec()));

    function koniec() {
      const suma = wyniki.reduce((a, b) => a + b, 0);
      kontener.replaceChildren(ekranKonca({
        tytul: suma >= 40 ? "Mistrz dedukcji!" : suma >= 30 ? "Dobra robota, detektywie!" : "Śledztwo zakończone – następne pójdzie lepiej.",
        wynik: `${suma} / ${ZAGADEK * 10}`,
        nowyRekord: zapiszRekord(KLUCZ, suma),
        szczegoly: [
          el("p", { class: "gra-statystyki" }, `Punkty za zagadki: ${wyniki.join(", ")}`),
          el("div", { class: "gra-powtorka" },
            el("p", { class: "gra-powtorka-tytul" }, "Cechy podzielności – warto pamiętać"),
            el("ul", {}, ...[3, 4, 5, 9, 10].map((k) => el("li", {}, ZASADY_DZIELENIA[k])))),
        ],
        onZnowu: graj,
      }));
    }

    nowaZagadka();
  }
}
