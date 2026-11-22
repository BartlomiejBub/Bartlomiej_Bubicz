// Gry dla szkoły podstawowej: lista do zakładki „Gry” (korepetycje.html#e8-gry) i do strony gry.html.
// Każda gra to moduł assets/gry/<id>.js z funkcją uruchom(kontener); gry.html?gra=<id> ją wczytuje.
import { el } from "../dom.js";

const ikona = (sciezki) => `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${sciezki}</svg>`;

export const GRY = [
  {
    id: "rakieta",
    nazwa: "Rakieta",
    opis: "Minuta liczenia w pamięci. Każda dobra odpowiedź to paliwo – im więcej dobrych z rzędu, tym szybciej lecisz. Dolecisz do stacji kosmicznej?",
    uczy: "tabliczka mnożenia, dzielenie, dodawanie i odejmowanie, liczby ujemne",
    klasy: "klasy 4–8",
    kolor: "#d9480f",
    ikona: ikona('<path d="M24 5c7 5 10 13 9 23l-4 6h-10l-4-6c-1-10 2-18 9-23z"/><circle cx="24" cy="18" r="3.5"/><path d="M15 28l-6 6 2 6 7-4M33 28l6 6-2 6-7-4M21 38l3 6 3-6"/>'),
  },
  {
    id: "os",
    nazwa: "Strzał na osi",
    opis: "Gdzie na osi liczbowej leży −7, 0,35 albo ³⁄₄? Celujesz, strzelasz, a gra pokazuje, o ile chybiłeś. Dziesięć strzałów, najwyżej 1000 punktów.",
    uczy: "oś liczbowa, liczby ujemne, ułamki dziesiętne i zwykłe",
    klasy: "klasy 4–7",
    kolor: "#0f766e",
    ikona: ikona('<path d="M4 30h40M40 26l4 4-4 4"/><path d="M10 27v6M17 27v6M24 25v10M31 27v6"/><circle cx="31" cy="15" r="6"/><circle cx="31" cy="15" r="1.5"/><path d="M31 21v5"/>'),
  },
  {
    id: "detektyw",
    nazwa: "Detektyw liczb",
    opis: "Ktoś ukrył liczbę od 1 do 100. Zbierasz wskazówki – „dzielę się przez 3”, „jestem liczbą pierwszą” – i wskazujesz ją jak najwcześniej.",
    uczy: "podzielność, liczby pierwsze, cyfry i wartość liczby",
    klasy: "klasy 4–7",
    kolor: "#7048e8",
    ikona: ikona('<circle cx="20" cy="20" r="11"/><path d="M28 28l13 13"/><path d="M16 17h8M16 23h5"/>'),
  },
  {
    id: "kat",
    nazwa: "Zgadnij kąt",
    opis: "Na ekranie pojawia się kąt, a Ty zgadujesz na oko, ile ma stopni. Potem przykładamy kątomierz i widać, o ile się pomyliłeś.",
    uczy: "miara kąta, kąt ostry, prosty, rozwarty i wklęsły",
    klasy: "klasy 4–6",
    kolor: "#c2255c",
    ikona: ikona('<path d="M8 40h32M8 40L32 10"/><path d="M20 40a12 12 0 0 0-4.5-9.4"/><path d="M36 40v-3M38.6 30l-2.6 1.5M34.3 21.5l-2 2"/>'),
  },
  {
    id: "pary",
    nazwa: "Pary",
    opis: "Odkrywasz po dwie karty i szukasz tych, które znaczą to samo: ½ i 0,5, ¾ i 75%, ułamek i jego rysunek. Wygrywa ten, kto znajdzie wszystkie pary w jak najmniej ruchach.",
    uczy: "ułamki zwykłe, dziesiętne i procenty",
    klasy: "klasy 4–8",
    kolor: "#1971c2",
    ikona: ikona('<rect x="6" y="10" width="17" height="25" rx="3"/><rect x="25" y="13" width="17" height="25" rx="3" transform="rotate(8 33 25)"/><path d="M11 22h7M14.5 18.5v0M14.5 25.5v0"/><path d="M30 25h7"/>'),
  },
];

export const gra = (id) => GRY.find((g) => g.id === id);

/** Kafelki gier z linkami do gry.html?gra=… */
export function kafelkiGier() {
  return el("ul", { class: "gry-lista" },
    ...GRY.map((g) => {
      const obrazek = el("span", { class: "gra-ikona", "aria-hidden": "true" });
      obrazek.innerHTML = g.ikona;
      return el("li", { style: `--gra-kolor: ${g.kolor}` },
        el("a", { class: "gra-kafelek", href: `gry.html?gra=${g.id}` },
          obrazek,
          el("span", { class: "gra-tekst" },
            el("strong", { class: "gra-nazwa" }, g.nazwa),
            el("span", { class: "gra-opis" }, g.opis),
            el("span", { class: "gra-uczy" }, `Ćwiczysz: ${g.uczy} · ${g.klasy}`)),
        ));
    }));
}
