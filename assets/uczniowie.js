// Uczniowie i ich dostęp do ćwiczeń.
//
// Najprościej zmieniać ten plik przez stronę nauczyciel.html: dodajesz ucznia, zaznaczasz dostęp,
// kopiujesz gotowy plik i wklejasz go tutaj (na GitHubie: ikonka ołówka → wklej → Commit changes).
// Strona zaktualizuje się po kilku minutach (w razie czego odśwież ją klawiszami Ctrl+F5).
//
// kod    – skrót SHA-256 kodu ucznia; samego kodu tu nie ma, więc nie da się go podejrzeć w repozytorium
// dostep – "wszystko" albo lista dla działów: "zadania" (zadania z arkuszy CKE), "generator", "karty" (karty pracy);
//          działy matury: liczby (Liczby i równania), funkcje (Funkcje i ciągi), geometria (Geometria),
//          statystyka (Prawdopodobieństwo i statystyka), dowody (Dowody i optymalizacja),
//          tekstowe (Zadania z treścią);
//          działy egzaminu ósmoklasisty: e8-podstawy (Podstawy: działania i ułamki), e8-liczby (Liczby i działania),
//          e8-wyrazenia (Wyrażenia i równania), e8-procenty (Procenty i obliczenia praktyczne),
//          e8-figury (Figury płaskie), e8-bryly (Bryły), e8-dane (Dane i prawdopodobieństwo)
// tematy – opcjonalnie: tylko wybrane tematy działu, np. tematy: { funkcje: ["funkcja-liniowa", "funkcja-kwadratowa"] }
//          (id tematów w pliku assets/arkusze/tematy.js; bez tego pola uczeń widzi cały dział)
//
// Repozytorium jest publiczne – zamiast nazwisk wpisuj samo imię albo pseudonim.

export const SOL = "f397c71cafef6f97";

export const UCZNIOWIE = [
  // Konto do wypróbowania strony, kod: DEMO-2026. Usuń je albo ogranicz, gdy dodasz prawdziwych uczniów.
  { imie: "Demo", kod: "6c30e582e176030866cea496c8b4bf2e3773a1646c50c757a346f48af90dd9d5", dostep: "wszystko" },
  { imie: "Magda", kod: "82a4ea0c3e843ab6b7cbb466596440969f88a06dc7657468b977c25a4ade058a", dostep: { liczby: ["zadania", "generator", "karty"], funkcje: ["zadania", "generator", "karty"] }, tematy: { funkcje: ["wlasnosci-funkcji", "funkcja-liniowa", "funkcja-kwadratowa"] } },
  { imie: "Maja", kod: "ba629f38caac9df4376b53d9b27553172a0d21eb1b4612fe76f55120f6e93e4a", dostep: { liczby: ["zadania", "generator", "karty"] }, tematy: { liczby: ["liczby-rzeczywiste", "zbiory", "potegi", "pierwiastki", "logarytmy", "procenty", "wyrazenia", "rownania", "uklady-rownan"] } },
  { imie: "Zuza", kod: "ff853aff2c67a34554b9e58eccd9cfcad083783203b72e288db00ead1e45c857", dostep: { "e8-podstawy": ["zadania", "generator", "karty"], "e8-liczby": ["zadania", "generator", "karty"], "e8-wyrazenia": ["zadania", "generator", "karty"], "e8-procenty": ["zadania", "generator", "karty"], "e8-figury": ["zadania", "generator", "karty"], "e8-bryly": ["zadania", "generator", "karty"], "e8-dane": ["zadania", "generator", "karty"] } },
  { imie: "Anastazja", kod: "68c3a01af55e1829f2b748f40c6f1db39ca40d513200e7f642c10d89359493a7", dostep: { liczby: ["zadania", "generator", "karty"], funkcje: ["zadania", "generator", "karty"], geometria: ["zadania", "generator", "karty"] }, tematy: { liczby: ["liczby-rzeczywiste", "zbiory", "potegi", "pierwiastki", "logarytmy", "procenty", "rownania", "uklady-rownan", "nierownosci"], funkcje: ["funkcja-liniowa"], geometria: ["planimetria"] } },
  { imie: "Olek", kod: "95d43da9db709d1047613f202e5229839e4a8a082e9c1805451a66e7720409ef", dostep: { "e8-podstawy": ["zadania", "generator", "karty"], "e8-liczby": ["zadania", "generator", "karty"] }, tematy: { "e8-podstawy": ["dodawanie-odejmowanie", "mnozenie", "dzielenie", "liczby-ujemne", "podzielnosc", "ulamki-zwykle", "mnozenie-ulamkow", "ulamki-dziesietne"], "e8-liczby": ["os-liczbowa", "ulamki-i-rozwiniecia", "dzielniki"] } },
  { imie: "Uczennica", kod: "bff321e72b0cff12e5640049daa0c88297b7a5f77193b98ae3ad2ecdc11e67bf", dostep: { "e8-podstawy": ["zadania", "generator", "karty"], "e8-liczby": ["zadania", "generator", "karty"], "e8-figury": ["zadania", "generator", "karty"] }, tematy: { "e8-podstawy": ["dodawanie-odejmowanie", "mnozenie", "dzielenie", "liczby-ujemne", "podzielnosc", "ulamki-zwykle", "mnozenie-ulamkow", "ulamki-dziesietne"], "e8-liczby": ["os-liczbowa", "ulamki-i-rozwiniecia", "dzielniki"], "e8-figury": ["proste-odcinki", "katy"] } },
];
