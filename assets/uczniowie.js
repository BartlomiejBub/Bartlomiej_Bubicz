// Uczniowie i ich dostęp do ćwiczeń.
//
// Najprościej zmieniać ten plik przez stronę nauczyciel.html: dodajesz ucznia, zaznaczasz dostęp,
// kopiujesz gotowy plik i wklejasz go tutaj (na GitHubie: ikonka ołówka → wklej → Commit changes).
// Strona zaktualizuje się po kilku minutach (w razie czego odśwież ją klawiszami Ctrl+F5).
//
// kod    – skrót SHA-256 kodu ucznia; samego kodu tu nie ma, więc nie da się go podejrzeć w repozytorium
// dostep – "wszystko" albo lista dla działów: "zadania" (zadania z matur), "generator", "karty" (karty pracy);
//          działy: liczby (Liczby i równania), funkcje (Funkcje i ciągi)
//
// Repozytorium jest publiczne – zamiast nazwisk wpisuj samo imię albo pseudonim.

export const SOL = "f397c71cafef6f97";

export const UCZNIOWIE = [
  // Konto do wypróbowania strony, kod: DEMO-2026. Usuń je albo ogranicz, gdy dodasz prawdziwych uczniów.
  { imie: "Demo", kod: "6c30e582e176030866cea496c8b4bf2e3773a1646c50c757a346f48af90dd9d5", dostep: "wszystko" },
];
