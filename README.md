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
| `cv/` | PDF-y CV, które widać na stronie |
| `tools/redact_cv.py` | Skrypt robiący z CV wersję na stronę (bez telefonu i daty urodzenia) |

Bezpośrednie linki: `index.html#cv-pl`, `index.html#cv-en`,
`korepetycje.html#matury`, `korepetycje.html#karty`, `korepetycje.html#cwiczenia`.

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

## Ćwiczenia

Sekcja jest na razie pusta – treść dochodzi w `korepetycje.html` w panelu `#panel-cwiczenia`.
