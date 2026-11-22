// Rakieta: minuta liczenia w pamięci. Dobra odpowiedź podnosi rakietę (5 km razy mnożnik serii), seria 5, 10 dobrych
// z rzędu daje mnożnik ×2, ×3. Bez poziomów trudności: zadania same robią się trudniejsze, gdy idzie dobrze,
// a pomylone działanie wraca po kilku pytaniach. Na końcu lista „do powtórki” z poprawnymi wynikami.
import { el } from "../dom.js";
import { losuj, wybierz, liczba, ekranStartu, ekranKonca, zapiszRekord } from "./wspolne.js";

const CZAS = 60;
const KM_ZA_ODPOWIEDZ = 5;
const ZAKRESY = [
  { id: "mnozenie", nazwa: "Tabliczka mnożenia" },
  { id: "dzielenie", nazwa: "Dzielenie" },
  { id: "dodawanie", nazwa: "Dodawanie i odejmowanie" },
  { id: "ujemne", nazwa: "Liczby ujemne" },
  { id: "wszystko", nazwa: "Wszystko naraz" },
].map((z) => ({ ...z, klucz: `rakieta-${z.id}` }));

const KAMIENIE = [
  { km: 3, napis: "Chmury", opis: "Rakieta przebiła się przez chmury." },
  { km: 10, napis: "Tu latają samoloty", opis: "Rakieta wzniosła się wyżej niż samoloty pasażerskie." },
  { km: 50, napis: "Stratosfera", opis: "Rakieta jest w stratosferze – niebo robi się granatowe." },
  { km: 100, napis: "Granica kosmosu", opis: "Rakieta przekroczyła 100 km – to już kosmos!" },
  { km: 400, napis: "Stacja kosmiczna", opis: "Rakieta doleciała do Międzynarodowej Stacji Kosmicznej!" },
  { km: 1000, napis: "Daleki kosmos", opis: "Rakieta poleciała dalej niż stacja kosmiczna. Niesamowite!" },
];

// położenie na „mapie nieba” w pikselach – im wyżej, tym gęściej, żeby zmieściło się od ziemi do kosmosu
const yKm = (km) => 140 * Math.log2(1 + km / 2);

// --- Działania. t (0–1) rośnie z liczbą dobrych odpowiedzi: wtedy częściej trudniejsze liczby.
const w = (x) => (x < 0 ? `(${liczba(x)})` : liczba(x));   // liczba ujemna jako drugi składnik – w nawiasie
function mnozniki(t) {
  const latwe = [2, 3, 4, 5, 10], trudne = [6, 7, 8, 9];
  return () => (Math.random() < 0.25 + 0.6 * t ? wybierz(trudne) : wybierz(latwe));
}
const DZIALANIA = {
  mnozenie(t) {
    const m = mnozniki(t), a = m(), b = m();
    return { tekst: `${a} · ${b}`, wynik: a * b };
  },
  dzielenie(t) {
    const m = mnozniki(t), b = m(), c = m();
    return { tekst: `${b * c} : ${b}`, wynik: c };
  },
  dodawanie(t) {
    const trudne = Math.random() < 0.2 + 0.7 * t;
    if (Math.random() < 0.5) {
      const a = trudne ? losuj(15, 85) : losuj(2, 50);
      const b = trudne ? losuj(15, 100 - a) : losuj(2, 20);
      return { tekst: `${a} + ${b}`, wynik: a + b };
    }
    const a = trudne ? losuj(30, 100) : losuj(10, 50);
    const b = trudne ? losuj(12, a - 5) : losuj(2, 9);
    return { tekst: `${a} − ${b}`, wynik: a - b };
  },
  ujemne(t) {
    const zakres = t > 0.5 ? 20 : 10;
    const niezero = (r) => { let x = 0; while (!x) x = losuj(-r, r); return x; };
    const rodzaj = wybierz(["+", "−", "−", "·"]);
    let a, b;
    do {
      a = rodzaj === "·" ? niezero(9) : niezero(zakres);
      b = rodzaj === "·" ? niezero(9) : niezero(zakres);
    } while (a > 0 && b > 0);   // co najmniej jedna liczba ujemna
    const wynik = rodzaj === "+" ? a + b : rodzaj === "−" ? a - b : a * b;
    return { tekst: `${liczba(a)} ${rodzaj} ${w(b)}`, wynik };
  },
  wszystko(t) {
    return DZIALANIA[wybierz(["mnozenie", "dzielenie", "dodawanie", "ujemne"])](t);
  },
};

// --- Kolor nieba zależnie od wysokości
const NIEBO = [[0, "#9ad5ff"], [8, "#62adf0"], [40, "#2b5fb8"], [100, "#0e1d4a"], [300, "#050a1c"]];
function kolorNieba(km) {
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  let i = NIEBO.findIndex(([k]) => k > km);
  if (i === -1) return NIEBO.at(-1)[1];
  if (i === 0) return NIEBO[0][1];
  const [k0, c0] = NIEBO[i - 1], [k1, c1] = NIEBO[i];
  const u = (km - k0) / (k1 - k0), a = hex(c0), b = hex(c1);
  return `rgb(${a.map((x, j) => Math.round(x + (b[j] - x) * u)).join(" ")})`;
}

const SVG_RAKIETY = `<svg viewBox="0 0 60 120" aria-hidden="true">
  <g class="plomien"><path d="M22 92 Q30 124 38 92 Z" fill="#ffb703"/><path d="M26 92 Q30 112 34 92 Z" fill="#fff3bf"/></g>
  <path d="M14 70 L4 92 L18 88 Z M46 70 L56 92 L42 88 Z" fill="#e8590c"/>
  <path d="M30 4 C44 18 48 40 46 70 L42 92 H18 L14 70 C12 40 16 18 30 4 Z" fill="#f1f3f5" stroke="#495057" stroke-width="2"/>
  <path d="M30 4 C37 11 41 19 43 28 H17 C19 19 23 11 30 4 Z" fill="#e8590c"/>
  <circle cx="30" cy="46" r="8" fill="#74c0fc" stroke="#495057" stroke-width="2"/>
  <path d="M27 92 V76 M33 92 V76" stroke="#adb5bd" stroke-width="2"/>
</svg>`;
const SVG_CHMURY = `<svg viewBox="0 0 120 50" aria-hidden="true"><g fill="#fff"><ellipse cx="40" cy="32" rx="30" ry="15"/><ellipse cx="66" cy="24" rx="26" ry="20"/><ellipse cx="88" cy="34" rx="24" ry="13"/></g></svg>`;

function gwiazdy() {
  const kropki = Array.from({ length: 60 }, () =>
    `<circle cx="${losuj(0, 400)}" cy="${losuj(0, 600)}" r="${(Math.random() * 1.3 + 0.4).toFixed(1)}" fill="#fff" opacity="${(Math.random() * 0.6 + 0.4).toFixed(2)}"/>`).join("");
  const s = el("div", { class: "rakieta-gwiazdy", "aria-hidden": "true" });
  s.innerHTML = `<svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">${kropki}</svg>`;
  return s;
}

export function uruchom(kontener) {
  let zakres = ZAKRESY[0];
  pokazStart();

  function pokazStart() {
    kontener.replaceChildren(ekranStartu({
      zasady: [
        "Masz minutę. Licz w pamięci i wpisuj wynik – klawiaturą albo przyciskami na ekranie.",
        "Każda dobra odpowiedź podnosi rakietę o 5 km. Pięć dobrych z rzędu – lecisz dwa razy szybciej, dziesięć – trzy razy.",
        "Pomyłka przerywa serię, a to działanie wróci za chwilę jeszcze raz.",
      ],
      zakresy: ZAKRESY,
      wybrany: zakres.id,
      opisRekordu: (km) => `${km} km`,
      onStart: (z) => { zakres = z; graj(); },
    }));
  }

  function graj() {
    const stan = { km: 0, seria: 0, najdluzsza: 0, dobre: 0, zle: 0, wpisane: "", pytanie: null, poprzednie: "", koniec: false };
    const powtorki = [];          // [{ pytanie, za }] – pomylone działania wracają za kilka pytań
    const doPowtorki = new Map(); // tekst → pytanie
    let osiagniete = 0;           // ile kamieni milowych już minęło

    // --- Scena: niebo, „świat” przesuwany w dół (ziemia, chmury, granice), rakieta w stałym miejscu
    const swiat = el("div", { class: "rakieta-swiat", "aria-hidden": "true" },
      el("div", { class: "rakieta-ziemia" }),
      ...[[1.5, 8], [3, 58], [5, 22], [7.5, 66]].map(([km, lewo]) => {
        const c = el("div", { class: "rakieta-chmura", style: `bottom: ${yKm(km)}px; left: ${lewo}%` });
        c.innerHTML = SVG_CHMURY;
        return c;
      }),
      ...KAMIENIE.map((k) => el("div", { class: "rakieta-kamien", style: `bottom: ${yKm(k.km)}px` },
        el("span", {}, `${k.napis} · ${k.km} km`))),
    );
    const statek = el("div", { class: "rakieta-statek" });
    statek.innerHTML = SVG_RAKIETY;
    const komunikat = el("p", { class: "rakieta-komunikat", "aria-live": "polite" });
    const niebo = el("div", { class: "rakieta-niebo" }, gwiazdy(), swiat, statek, komunikat);

    const zegar = el("div", { class: "gra-zegar", role: "progressbar", "aria-label": "Pozostały czas", "aria-valuemin": "0", "aria-valuemax": String(CZAS) },
      el("span", { class: "gra-zegar-pasek" }));
    const sekundy = el("span", { class: "gra-licznik-wartosc" }, String(CZAS));
    const wysokosc = el("span", { class: "gra-licznik-wartosc" }, "0 km");
    const seria = el("span", { class: "gra-licznik-wartosc" }, "0");
    const mnoznikEl = el("span", { class: "rakieta-mnoznik" });

    const tresc = el("span", { class: "rakieta-dzialanie" });
    const odpowiedz = el("span", { class: "rakieta-odpowiedz", "aria-live": "polite", "aria-label": "Twoja odpowiedź" });
    const poprawka = el("p", { class: "rakieta-poprawka", "aria-live": "polite" });

    const klawisz = (napis, akcja, klasa = "") => {
      const b = el("button", { type: "button", class: `kalk-klawisz ${klasa}`.trim() }, napis);
      b.addEventListener("click", akcja);
      return b;
    };
    const klawiatura = el("div", { class: "rakieta-klawiatura" },
      ..."789456123".split("").map((c) => klawisz(c, () => wpisz(c))),
      klawisz("−", () => wpisz("-"), "kalk-op"),
      klawisz("0", () => wpisz("0")),
      klawisz("⌫", () => usun(), "kalk-op"),
      klawisz("OK", () => sprawdz(), "kalk-rowna rakieta-ok"),
    );

    kontener.replaceChildren(el("div", { class: "gra-ekran rakieta" },
      el("div", { class: "rakieta-scena" }, niebo),
      el("div", { class: "rakieta-panel" },
        el("div", { class: "gra-liczniki" },
          el("span", { class: "gra-licznik" }, el("span", { class: "gra-licznik-nazwa" }, "Czas"), sekundy),
          el("span", { class: "gra-licznik" }, el("span", { class: "gra-licznik-nazwa" }, "Wysokość"), wysokosc),
          el("span", { class: "gra-licznik" }, el("span", { class: "gra-licznik-nazwa" }, "Seria"), seria, mnoznikEl)),
        zegar,
        el("div", { class: "rakieta-pytanie" }, tresc, el("span", { class: "rakieta-rowna" }, "="), odpowiedz),
        poprawka,
        klawiatura)));

    const mnoznik = () => Math.min(3, 1 + Math.floor(stan.seria / 5));
    const trudnosc = () => Math.min(1, stan.dobre / 18);

    function nastepne() {
      const gotowa = powtorki.findIndex((p) => p.za <= 0);
      for (const p of powtorki) p.za--;
      let p;
      if (gotowa !== -1) p = powtorki.splice(gotowa, 1)[0].pytanie;
      else do p = DZIALANIA[zakres.id](trudnosc()); while (p.tekst === stan.poprzednie);
      stan.pytanie = p;
      stan.poprzednie = p.tekst;
      stan.wpisane = "";
      tresc.textContent = p.tekst;
      pokazWpisane();
    }
    const pokazWpisane = () => {
      odpowiedz.textContent = stan.wpisane.replace("-", "−") || "?";
      odpowiedz.classList.toggle("pusta", !stan.wpisane);
    };
    function wpisz(c) {
      if (stan.koniec) return;
      if (c === "-") stan.wpisane = stan.wpisane.startsWith("-") ? stan.wpisane.slice(1) : `-${stan.wpisane}`;
      else if (stan.wpisane.replace("-", "").length < 4) stan.wpisane = stan.wpisane === "0" ? c : stan.wpisane === "-0" ? `-${c}` : stan.wpisane + c;
      pokazWpisane();
      if (Number(stan.wpisane) === stan.pytanie.wynik && stan.wpisane !== "-") sprawdz();   // dobry wynik – od razu dalej
    }
    function usun() {
      if (stan.koniec) return;
      stan.wpisane = stan.wpisane.slice(0, -1);
      pokazWpisane();
    }

    function sprawdz() {
      if (stan.koniec || !stan.wpisane || stan.wpisane === "-") return;
      const p = stan.pytanie;
      if (Number(stan.wpisane) === p.wynik) {
        stan.dobre++;
        stan.seria++;
        stan.najdluzsza = Math.max(stan.najdluzsza, stan.seria);
        stan.km += KM_ZA_ODPOWIEDZ * mnoznik();
        poprawka.textContent = "";
        efekt("start");
      } else {
        stan.zle++;
        stan.seria = 0;
        poprawka.textContent = `Było: ${p.tekst} = ${liczba(p.wynik)}`;
        doPowtorki.set(p.tekst, p);
        if (!powtorki.some((x) => x.pytanie.tekst === p.tekst)) powtorki.push({ pytanie: p, za: 3 });
        efekt("wstrzas");
      }
      odswiez();
      nastepne();
    }

    function efekt(klasa) {
      statek.classList.remove("start", "wstrzas");
      void statek.offsetWidth;   // restart animacji
      statek.classList.add(klasa);
    }

    function odswiez() {
      wysokosc.textContent = `${stan.km} km`;
      seria.textContent = String(stan.seria);
      mnoznikEl.textContent = mnoznik() > 1 ? `×${mnoznik()}` : "";
      swiat.style.transform = `translateY(${yKm(stan.km)}px)`;
      niebo.style.backgroundColor = kolorNieba(stan.km);
      niebo.style.setProperty("--gwiazdy", String(Math.min(1, Math.max(0, (stan.km - 30) / 90))));
      const nowe = KAMIENIE.filter((k) => stan.km >= k.km).length;
      if (nowe > osiagniete) {
        komunikat.textContent = KAMIENIE[nowe - 1].napis + "!";
        komunikat.classList.remove("pokaz");
        void komunikat.offsetWidth;
        komunikat.classList.add("pokaz");
        osiagniete = nowe;
      }
    }

    function klawisze(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (/^[0-9]$/.test(e.key)) wpisz(e.key);
      else if (e.key === "-" || e.key === "Subtract") wpisz("-");
      else if (e.key === "Backspace") usun();
      else if (e.key === "Enter") sprawdz();
      else return;
      e.preventDefault();
    }
    document.addEventListener("keydown", klawisze);

    const poczatek = performance.now();
    const pasek = zegar.firstChild;
    let ramka = requestAnimationFrame(function tik(teraz) {
      if (!kontener.isConnected) return document.removeEventListener("keydown", klawisze);
      const zostalo = Math.max(0, CZAS - (teraz - poczatek) / 1000);
      sekundy.textContent = String(Math.ceil(zostalo));
      pasek.style.width = `${(zostalo / CZAS) * 100}%`;
      zegar.setAttribute("aria-valuenow", String(Math.ceil(zostalo)));
      zegar.classList.toggle("malo", zostalo <= 10);
      if (zostalo > 0) ramka = requestAnimationFrame(tik);
      else koniec();
    });

    function koniec() {
      stan.koniec = true;
      cancelAnimationFrame(ramka);
      document.removeEventListener("keydown", klawisze);
      const nowyRekord = stan.km > 0 && zapiszRekord(zakres.klucz, stan.km);
      const kamien = [...KAMIENIE].reverse().find((k) => stan.km >= k.km);
      const lista = [...doPowtorki.values()];
      kontener.replaceChildren(ekranKonca({
        tytul: kamien ? kamien.opis : stan.km > 0 ? "Rakieta wystartowała – następnym razem przebij chmury!" : "Rakieta jeszcze nie wystartowała. Spróbuj jeszcze raz!",
        wynik: `${stan.km} km`,
        nowyRekord,
        szczegoly: [
          el("p", { class: "gra-statystyki" }, `Dobre odpowiedzi: ${stan.dobre} · pomyłki: ${stan.zle} · najdłuższa seria: ${stan.najdluzsza}`),
          lista.length > 0 && el("div", { class: "gra-powtorka" },
            el("p", { class: "gra-powtorka-tytul" }, "Do powtórki"),
            el("ul", {}, ...lista.map((p) => el("li", {}, `${p.tekst} = ${liczba(p.wynik)}`)))),
        ],
        onZnowu: graj,
        onZmien: pokazStart,
      }));
    }

    odswiez();
    nastepne();
  }
}
