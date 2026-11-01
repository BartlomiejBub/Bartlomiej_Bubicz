// Arkusze CKE egzaminu ósmoklasisty z matematyki – od najnowszych.
// typ: "glowna" (termin główny), "dodatkowy" (termin dodatkowy), "probna" (egzamin próbny CKE).
const url = (rodzaj, rok) => `https://arkusze.pl/egzamin-osmoklasisty-${rodzaj}matematyka-${rok}/`;
const glowny = (rok, termin) => ({ rok, termin, typ: "glowna", url: url("", rok) });
const dodatkowy = (rok, termin) => ({ rok, termin, typ: "dodatkowy", url: url("termin-dodatkowy-", rok) });
const probny = (rok) => ({ rok, termin: "Egzamin próbny", typ: "probna", url: url("probny-", rok) });

export const OSMOKLASISTY = [
  dodatkowy(2026, "Czerwiec 2026"), glowny(2026, "Maj 2026"), probny(2026),
  dodatkowy(2025, "Czerwiec 2025"), glowny(2025, "Maj 2025"),
  probny(2024), dodatkowy(2024, "Czerwiec 2024"), glowny(2024, "Maj 2024"),
  dodatkowy(2023, "Czerwiec 2023"), glowny(2023, "Maj 2023"),
  dodatkowy(2022, "Czerwiec 2022"), glowny(2022, "Maj 2022"),
  dodatkowy(2021, "Czerwiec 2021"), glowny(2021, "Maj 2021"), probny(2021),
  dodatkowy(2020, "Lipiec 2020"), glowny(2020, "Czerwiec 2020"), probny(2020),
  dodatkowy(2019, "Czerwiec 2019"), glowny(2019, "Kwiecień 2019"),
  probny(2018), probny(2017),
];
