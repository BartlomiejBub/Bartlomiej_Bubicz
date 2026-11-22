// Pary: 16 zakrytych kart, 8 par. Para to dwie karty o tej samej wartości zapisanej inaczej: ułamek i rysunek,
// ułamek i ułamek dziesiętny, ułamek dziesiętny i procent… Przy nietrafionej parze gra pokazuje, ile jest warta
// każda z kart (jako ułamek), a znalezione pary zapisuje jako równości, np. ¾ = 0,75 = 75%.
// Wynik to liczba ruchów (mniej = lepiej).
import { el } from "../dom.js";
import { wybierz, tasuj, liczba, ulamek, ekranStartu, ekranKonca, zapiszRekord } from "./wspolne.js";

const PAR = 8;
const ZAKRESY = [
  { id: "rysunki", nazwa: "Ułamek i rysunek", postacie: [["ulamek", "rysunek"]], mianowniki: [2, 3, 4, 5, 6, 8] },
  { id: "dziesietne", nazwa: "Ułamek i ułamek dziesiętny", postacie: [["ulamek", "dziesietny"]], mianowniki: [2, 4, 5, 10, 20, 25] },
  { id: "procenty", nazwa: "Ułamki, dziesiętne i procenty", postacie: [["ulamek", "procent"], ["dziesietny", "procent"], ["ulamek", "dziesietny"], ["rysunek", "procent"]], mianowniki: [2, 4, 5, 10, 20] },
].map((z) => ({ ...z, klucz: `pary-${z.id}` }));

const nwd = (a, b) => (b ? nwd(b, a % b) : a);
const ruchow = (n) => `${n} ${n === 1 ? "ruch" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? "ruchy" : "ruchów"}`;

/** n różnych ułamków właściwych (skróconych): najpierw losowy mianownik, potem licznik – żeby nie było samych dwudziestych. */
function losujWartosci(mianowniki, n) {
  const w = new Map();
  for (let proby = 0; w.size < n && proby < 1000; proby++) {
    const m = wybierz(mianowniki);
    const liczniki = Array.from({ length: m - 1 }, (_, i) => i + 1).filter((l) => nwd(l, m) === 1);
    const l = wybierz(liczniki);
    if (!w.has(l / m)) w.set(l / m, { l, m });
  }
  return [...w.values()];
}
/** Czy ułamek ma skończone rozwinięcie dziesiętne (mianownik tylko z dwójek i piątek). */
const skonczony = (m) => { while (m % 2 === 0) m /= 2; while (m % 5 === 0) m /= 5; return m === 1; };

function kolo(l, m) {
  const R = 40, C = 46;
  const punkt = (k) => {
    const a = (k / m) * 2 * Math.PI - Math.PI / 2;
    return `${(C + R * Math.cos(a)).toFixed(2)} ${(C + R * Math.sin(a)).toFixed(2)}`;
  };
  const wycinki = Array.from({ length: m }, (_, k) =>
    `<path class="${k < l ? "pary-zamalowane" : "pary-puste"}" d="M${C} ${C} L${punkt(k)} A${R} ${R} 0 0 1 ${punkt(k + 1)} Z"/>`).join("");
  const s = el("span", { class: "pary-rysunek", role: "img", "aria-label": `koło podzielone na ${m} równych części, zamalowane ${l}` });
  s.innerHTML = `<svg viewBox="0 0 92 92" aria-hidden="true">${wycinki}</svg>`;
  return s;
}

function postac(rodzaj, { l, m }) {
  const v = l / m;
  if (rodzaj === "ulamek") return { wyglad: () => ulamek(l, m), opis: () => ulamek(l, m) };
  if (rodzaj === "rysunek") return { wyglad: () => kolo(l, m), opis: () => el("span", {}, `koło z zamalowanymi ${l} z ${m} części`) };
  if (rodzaj === "dziesietny") return { wyglad: () => el("span", {}, liczba(v)), opis: () => el("span", {}, liczba(v)) };
  return { wyglad: () => el("span", {}, `${liczba(v * 100)}%`), opis: () => el("span", {}, `${liczba(v * 100)}%`) };
}

export function uruchom(kontener) {
  let zakres = ZAKRESY[0];
  pokazStart();

  function pokazStart() {
    kontener.replaceChildren(ekranStartu({
      zasady: [
        "Wszystkie karty leżą zakryte. Odkrywasz po dwie.",
        "Jeśli obie znaczą to samo (np. ½ i 0,5), zostają odkryte. Jeśli nie – gra pokaże, ile jest warta każda z nich, i za chwilę je zakryje.",
        "Zapamiętuj, co gdzie leży! Wygrywasz, gdy znajdziesz wszystkie pary – im mniej ruchów, tym lepiej.",
      ],
      zakresy: ZAKRESY,
      wybrany: zakres.id,
      opisRekordu: ruchow,
      onStart: (z) => { zakres = z; graj(); },
    }));
  }

  function graj() {
    const wybrane = losujWartosci(zakres.mianowniki, PAR);
    const karty = tasuj(wybrane.flatMap((w, i) => {
      // koło z więcej niż 10 częściami byłoby nieczytelne
      const [a, b] = tasuj(wybierz(zakres.postacie.filter((para) => w.m <= 10 || !para.includes("rysunek"))));
      return [{ para: i, w, ...postac(a, w), rodzaj: a }, { para: i, w, ...postac(b, w), rodzaj: b }];
    }));
    let odkryte = [], ruchy = 0, znalezione = 0, blokada = false;
    const poczatek = Date.now();

    const licznikRuchow = el("span", { class: "gra-licznik-wartosc" }, "0");
    const licznikPar = el("span", { class: "gra-licznik-wartosc" }, `0 z ${PAR}`);
    const komunikat = el("div", { class: "pary-komunikat", "aria-live": "polite" });
    const rownosci = el("ul", { class: "pary-rownosci" });

    const przyciski = karty.map((k, i) => {
      const b = el("button", { type: "button", class: "pary-karta", "aria-label": `Karta ${i + 1}, zakryta` },
        el("span", { class: "pary-strona pary-tyl", "aria-hidden": "true" }, "?"),
        el("span", { class: `pary-strona pary-przod pary-${k.rodzaj}`, "aria-hidden": "true" }, k.wyglad()));
      b.addEventListener("click", () => odkryj(i));
      k.b = b;
      return b;
    });

    kontener.replaceChildren(el("div", { class: "gra-ekran pary" },
      el("div", { class: "gra-liczniki" },
        el("span", { class: "gra-licznik" }, el("span", { class: "gra-licznik-nazwa" }, "Ruchy"), licznikRuchow),
        el("span", { class: "gra-licznik" }, el("span", { class: "gra-licznik-nazwa" }, "Znalezione pary"), licznikPar)),
      el("div", { class: "pary-plansza" }, ...przyciski),
      komunikat,
      rownosci));

    const opisKarty = (k) => (k.rodzaj === "rysunek" ? `koło, zamalowane ${k.w.l} z ${k.w.m} części`
      : k.rodzaj === "ulamek" ? `${k.w.l} przez ${k.w.m}` : k.b.querySelector(".pary-przod").textContent);
    const rownosc = (w) => el("li", {}, ulamek(w.l, w.m),
      zakres.id === "rysunki" || !skonczony(w.m) ? el("span", { class: "pary-mini" }, kolo(w.l, w.m)) : ` = ${liczba(w.l / w.m)} = ${liczba((w.l / w.m) * 100)}%`);

    function odkryj(i) {
      const k = karty[i];
      if (blokada || k.znaleziona || odkryte.includes(k)) return;
      k.b.classList.add("odkryta");
      k.b.setAttribute("aria-label", `Karta ${i + 1}: ${opisKarty(k)}`);
      odkryte.push(k);
      if (odkryte.length < 2) return;
      ruchy++;
      licznikRuchow.textContent = String(ruchy);
      const [a, b] = odkryte;
      if (a.para === b.para) {
        for (const x of odkryte) { x.znaleziona = true; x.b.classList.add("znaleziona"); }
        znalezione++;
        licznikPar.textContent = `${znalezione} z ${PAR}`;
        rownosci.append(rownosc(a.w));
        komunikat.replaceChildren(el("p", { class: "pary-dobrze" }, "Para! ", a.opis(), " = ", b.opis()));
        odkryte = [];
        if (znalezione === PAR) setTimeout(koniec, 700);
        return;
      }
      komunikat.replaceChildren(el("p", { class: "pary-zle" },
        "To nie para: ", a.opis(), a.rodzaj === "ulamek" ? "" : el("span", {}, " to ", ulamek(a.w.l, a.w.m)),
        ", a ", b.opis(), b.rodzaj === "ulamek" ? "" : el("span", {}, " to ", ulamek(b.w.l, b.w.m)), "."));
      blokada = true;
      setTimeout(() => {
        for (const x of odkryte) {
          x.b.classList.remove("odkryta");
          x.b.setAttribute("aria-label", `Karta ${karty.indexOf(x) + 1}, zakryta`);
        }
        odkryte = [];
        blokada = false;
      }, 1500);
    }

    function koniec() {
      const sekundy = Math.round((Date.now() - poczatek) / 1000);
      kontener.replaceChildren(ekranKonca({
        tytul: ruchy <= PAR + 4 ? "Pamięć jak u słonia!" : ruchy <= PAR * 2 ? "Wszystkie pary znalezione – świetnie!" : "Wszystkie pary znalezione!",
        wynik: ruchow(ruchy),
        nowyRekord: zapiszRekord(zakres.klucz, ruchy, { mniejLepiej: true }),
        szczegoly: [
          el("p", { class: "gra-statystyki" }, `Czas: ${Math.floor(sekundy / 60)} min ${sekundy % 60} s. Najmniej możliwych ruchów: ${PAR}.`),
          el("div", { class: "gra-powtorka" },
            el("p", { class: "gra-powtorka-tytul" }, "Znalezione równości"),
            el("ul", { class: "pary-rownosci" }, ...wybrane.map(rownosc))),
        ],
        onZnowu: graj,
        onZmien: pokazStart,
      }));
    }
  }
}
