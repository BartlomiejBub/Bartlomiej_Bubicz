# Bartlomiej_Bubicz

Osobista strona: CV (PL / EN) i materiały do korepetycji z matematyki.
Zwykły HTML, CSS i JavaScript bez budowania, hostowany na GitHub Pages:
https://bartlomiejbub.github.io/Bartlomiej_Bubicz/

## Struktura

| Plik | Co zawiera |
|---|---|
| `index.html` | Start: krótko o mnie i wybór CV z podglądem |
| `korepetycje.html` | Zakładki: Matury, Karty maturalne, Ćwiczenia |
| `assets/style.css` | Wygląd całej strony (kolory jak w CV, tryb ciemny) |
| `assets/cv.js` | Podgląd CV – PDF rysowany przez PDF.js, działa też na telefonach |
| `assets/matury.js` | Lista arkuszy maturalnych (linki do arkusze.pl) |
| `assets/korepetycje.js` | Zakładki i generowanie listy matur |
| `assets/cwiczenia.js` | Ćwiczenia: logowanie ucznia, zadania z matur, generator, karty pracy |
| `assets/uczniowie.js` | **Lista uczniów i ich dostępu** – to edytujesz najczęściej |
| `assets/dostep.js` | Logowanie kodem i sprawdzanie dostępu |
| `assets/dzialy.js` | Działy ćwiczeń i ustawienia kart pracy |
| `assets/zadania-maturalne.js` | Zadania z prawdziwych matur, pogrupowane po działach |
| `assets/generatory/` | Generatory zadań (`liczby.js`, `funkcje.js`) i wspólne narzędzia (`wspolne.js`) |
| `assets/matematyka.js` | Wzory w tekście rysowane przez KaTeX |
| `karta.html`, `assets/karta.js` | Karta pracy do druku (odpowiedzi na ostatniej stronie) |
| `nauczyciel.html`, `assets/nauczyciel.js` | Strona dla Ciebie: dodawanie uczniów i ustawianie dostępu |
| `cv/` | PDF-y CV, które widać na stronie |
| `tools/redact_cv.py` | Skrypt robiący z CV wersję na stronę (bez telefonu i daty urodzenia) |
| `tools/test-generatory.mjs` | Test generatorów zadań |
| `karty/`, `tools/karty/`, `tools/zrob-karty.mjs` | Gotowe karty pracy w PDF, ich źródła i skrypt, który je robi |

Bezpośrednie linki: `index.html#cv-pl`, `index.html#cv-en`,
`korepetycje.html#matury`, `korepetycje.html#karty`, `korepetycje.html#cwiczenia`,
`karta.html?dzial=liczby&nr=1`, `nauczyciel.html`.

## Jak uruchomić lokalnie

Podgląd CV nie zadziała po otwarciu pliku dwuklikiem (przeglądarka blokuje
wczytywanie PDF-a z dysku), więc uruchom prosty serwer w folderze repozytorium:

```bash
python -m http.server 8000
```

i wejdź na http://localhost:8000.

## Jak dodać nową maturę

Dopisz wiersz na górze listy w `assets/matury.js`, np.:

```js
{ rok: 2027, miesiac: 5, termin: "Maj 2027", typ: "glowna",
  url: "https://arkusze.pl/matura-matematyka-2027-maj-poziom-podstawowy/" },
```

`typ` to jedno z: `glowna`, `dodatkowy`, `poprawka`, `probna`, `przykladowy`.

## Jak zaktualizować CV

Strona pokazuje kopie CV bez numeru telefonu i daty urodzenia. Po zmianie CV
zrób nowe kopie (wymaga `pip install pymupdf`, działa na Windowsie z czcionką Segoe UI):

```bash
python tools/redact_cv.py "ścieżka/do/CV_PL.pdf" cv/Bartlomiej_Bubicz_CV_PL.pdf
python tools/redact_cv.py "ścieżka/do/CV_EN.pdf" cv/Bartlomiej_Bubicz_CV_EN.pdf
```

## Ćwiczenia i dostęp uczniów

Zakładka Ćwiczenia działa po zalogowaniu kodem ucznia. Każdy dział (Liczby i równania,
Funkcje i ciągi) ma trzy rodzaje materiałów, a dostęp do każdego ustawiasz osobno dla ucznia:

- **Zadania z matur** – prawdziwe zadania CKE z linkiem do arkusza na arkusze.pl i odpowiedzią,
- **Generator zadań** – zadania jak na maturze z losowymi, „ładnymi” liczbami; uczeń wpisuje wynik i sprawdza,
- **Karty pracy** – zestawy do druku albo PDF, odpowiedzi na ostatniej stronie.

Strona jest statyczna, a repozytorium publiczne, więc to logowanie „dla uczciwych”: decyduje,
co komu pokazać, ale kto zna się na stronach, może zajrzeć do plików. Kody nie są zapisane
wprost – w `assets/uczniowie.js` jest tylko ich skrót (SHA-256), więc nie da się ich podejrzeć.

### Dodanie ucznia albo zmiana dostępu

1. Wejdź na `nauczyciel.html` (np. https://bartlomiejbub.github.io/Bartlomiej_Bubicz/nauczyciel.html).
2. Dodaj ucznia (imię albo pseudonim, „Losuj kod”) i zaznacz w tabeli, do czego ma dostęp.
   Zapisz kod – w pliku zostanie tylko skrót, więc później nie da się go odczytać.
3. Kliknij „Kopiuj plik”, otwórz `assets/uczniowie.js` na GitHubie (ikonka ołówka),
   zastąp całą treść skopiowaną i kliknij „Commit changes”. Po kilku minutach zmiany działają
   (przeglądarki trzymają stary plik do około 10 minut – w razie czego uczeń odświeża stronę Ctrl+F5).

Dostęp możesz też zmieniać ręcznie w `assets/uczniowie.js`, np.
`dostep: { liczby: ["zadania", "generator"], funkcje: ["karty"] }` albo `dostep: "wszystko"`.

Na start jest konto **Demo** (kod `DEMO-2026`) z dostępem do wszystkiego – usuń je albo
ogranicz, gdy dodasz prawdziwych uczniów.

### Zadania z matur

Lista jest w `assets/zadania-maturalne.js`. Nowe zadanie to jeden obiekt: temat, termin, numer,
punkty, nazwa PDF-a z arkusze.pl i strona w nim, krótki opis i odpowiedź z klucza CKE.

### Generatory i karty pracy

Generatory są w `assets/generatory/` – opis budowy zadania jest na początku `wspolne.js`.
Po zmianie generatora uruchom test (Node.js), który sprawdza m.in. czy odpowiedzi są „ładne”
i czy sprawdzanie przyjmuje dobrą odpowiedź, a odrzuca złą:

```bash
node tools/test-generatory.mjs
```

Liczbę stałych kart z generatora w dziale i liczbę zadań z każdego generatora na karcie ustawiasz
w `assets/dzialy.js` (`KARTY`). Karta o danym numerze ma zawsze te same zadania.

### Gotowe karty pracy (PDF)

Każdy dział ma też ułożoną ręcznie kartę w PDF (`karty/*.pdf`): 2 strony zadań w stylu maturalnym
i strona z odpowiedziami. Źródła są w `tools/karty/` (zwykły HTML, wzory w `$…$`, wygląd w `karta.css`).
Po zmianie zadań zrób PDF-y na nowo (Node.js i przeglądarka Edge):

```bash
npm install katex@0.16.9 --no-save
node tools/zrob-karty.mjs
```

Nowa karta to nowy plik HTML w `tools/karty/` i wpis w polu `pdf` działu w `assets/dzialy.js`.
