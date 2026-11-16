// Klasy i rozdziały w widoku „Do szkoły” – w kolejności z podręczników:
//   szkoła podstawowa, klasy 4–8: Nowa Era „Matematyka z kluczem” (klasa 4 od 2026: „Klucz do matematyki”),
//   szkoła średnia (liceum i technikum), klasy 1–4: Kurczab, Kurczab, Świda, „Matematyka. Zakres podstawowy” (Pazdro).
// Każdy rozdział ma własne materiały w pliku assets/klasy/<plik>: ściągę, zadania i generatory napisane dla tej klasy.
// Materiały klas są niezależne od działów egzaminu i od siebie nawzajem – nic nie jest współdzielone.
//
// Rozdział: { id, nr, nazwa, opis, lekcje, plik? }
//   nr     – numer rozdziału w podręczniku (żeby uczeń łatwo znalazł go w książce)
//   lekcje – tematy lekcji z podręcznika (po zmianach podstawy z 2024 r.; lekcje uchylone pominięte) – podstawa podziału na tematy
//   plik   – ścieżka pliku z materiałami względem assets/klasy/; bez tego pola rozdział jest „w przygotowaniu”
// Dostęp ucznia do rozdziałów: pole szkola w assets/uczniowie.js (lista id rozdziałów).
// Sprawdzenie: node tools/test-szkola.mjs
export const KLASY = [
  // ───────────────────────── Szkoła podstawowa (Matematyka z kluczem, Nowa Era) ─────────────────────────
  // Klasa 4 od roku 2026/27 uczy się według nowej podstawy (reforma 2026) z nowej serii Nowej Ery „Klucz do matematyki 4”.
  // Tu jest część 1 (rozdziały I–V, spis z wersji pilotażowej). Spisu części 2 (rozdziały VI–X) w listopadzie 2026 jeszcze
  // nie było w sieci – dopisać, gdy Nowa Era go opublikuje.
  {
    id: "sp4", egzamin: "e8", nazwa: "Klasa 4", etap: "Szkoła podstawowa", podrecznik: "Klucz do matematyki 4 (Nowa Era, 2026)",
    rozdzialy: [
      { id: "sp4-start", nr: "I", nazwa: "Zaczynamy przygodę z matematyką", opis: "Zegary i kalendarz, cyfry rzymskie, mierzenie i matematyka wokół nas.", plik: "sp4/start.js",
        lekcje: ["Gdzie kryje się matematyka?", "Zegary", "Kalendarz", "Cyfry rzymskie", "Wzdłuż i wszerz", "Matematyka jest dla każdego"] },
      { id: "sp4-dodawanie", nr: "II", nazwa: "Dodawanie i odejmowanie", opis: "Zapis liczb i oś liczbowa, dodawanie i odejmowanie w pamięci, szacowanie, sprytne liczenie.", plik: "sp4/dodawanie.js",
        lekcje: ["Jak zapisujemy liczby", "Oś liczbowa", "Dodawanie i odejmowanie w pamięci", "Szacowanie", "Sprytne dodawanie", "Sprytne odejmowanie"] },
      { id: "sp4-mnozenie", nr: "III", nazwa: "Mnożenie i dzielenie", opis: "Zadania tekstowe, tabliczka mnożenia i dzielenia, sprytne mnożenie i dzielenie.", plik: "sp4/mnozenie.js",
        lekcje: ["Jak rozwiązywać zadania tekstowe", "Tabliczka mnożenia", "Tabliczka dzielenia", "Sprytne mnożenie", "Sprytne dzielenie"] },
      { id: "sp4-figury", nr: "IV", nazwa: "Figury geometryczne", opis: "Punkty, odcinki i proste, mierzenie i jednostki długości, prostokąty, wielokąty i obwód.", plik: "sp4/figury.js",
        lekcje: ["Punkty, odcinki i proste", "Mierzenie. Jednostki długości", "Prostokąty i kwadraty", "Wielokąty", "Obwód wielokąta"] },
      { id: "sp4-wiecej", nr: "V", nazwa: "Więcej o liczbach i działaniach", opis: "Dzielenie z resztą, podzielność, druga i trzecia potęga, kolejność działań.", plik: "sp4/wiecej.js",
        lekcje: ["Dzielenie z resztą", "Podzielność", "Druga i trzecia potęga", "Kolejność wykonywania działań"] },
    ],
  },
  {
    id: "sp5", egzamin: "e8", nazwa: "Klasa 5", etap: "Szkoła podstawowa", podrecznik: "Matematyka z kluczem 5 (Nowa Era)",
    rozdzialy: [
      { id: "sp5-liczby", nr: "I", nazwa: "Liczby naturalne", opis: "Działania w pamięci i pisemne, potęgi, kolejność działań, cyfry rzymskie, podzielność, liczby pierwsze.", plik: "sp5/liczby.js",
        lekcje: ["Działania pamięciowe", "Potęgowanie", "Kolejność wykonywania działań", "Cyfry rzymskie", "Obliczenia przybliżone", "Dodawanie i odejmowanie pisemne", "Mnożenie pisemne", "Dzielenie i podzielność", "Liczby pierwsze i złożone", "Dzielenie pisemne"] },
      { id: "sp5-figury", nr: "II", nazwa: "Figury geometryczne", opis: "Proste i półproste, kąty i ich mierzenie, trójkąty i ich wysokości, równoległoboki, trapezy i podział czworokątów.", plik: "sp5/figury.js",
        lekcje: ["Płaszczyzna, proste i półproste", "Kąty. Rodzaje kątów", "Mierzenie kątów", "Rodzaje i własności trójkątów", "Własności niektórych trójkątów", "Wysokość trójkąta", "Równoległoboki", "Wysokość równoległoboku", "Trapezy", "Klasyfikacja czworokątów"] },
      { id: "sp5-ulamki-zwykle", nr: "III", nazwa: "Ułamki zwykłe", opis: "Skracanie i rozszerzanie, dodawanie i odejmowanie, mnożenie i dzielenie ułamków, ułamek liczby, odwrotności.", plik: "sp5/ulamki-zwykle.js",
        lekcje: ["Ułamek jako część i jako iloraz", "Rozszerzanie i skracanie ułamków", "Dodawanie i odejmowanie ułamków o tych samych mianownikach", "Dodawanie i odejmowanie ułamków o różnych mianownikach", "Mnożenie ułamka przez liczbę naturalną. Ułamek liczby", "Mnożenie ułamków", "Odwrotności liczb", "Dzielenie ułamków", "Działania na ułamkach"] },
      { id: "sp5-ulamki-dziesietne", nr: "IV", nazwa: "Ułamki dziesiętne", opis: "Dodawanie, odejmowanie, mnożenie i dzielenie ułamków dziesiętnych, zamiana jednostek.", plik: "sp5/ulamki-dziesietne.js",
        lekcje: ["Ułamek dziesiętny", "Dodawanie i odejmowanie ułamków dziesiętnych", "Mnożenie ułamków dziesiętnych", "Dzielenie ułamków dziesiętnych", "Zamiana jednostek"] },
      { id: "sp5-pola", nr: "V", nazwa: "Pola figur", opis: "Pole równoległoboku, rombu, trójkąta i trapezu, jednostki pola.", plik: "sp5/pola.js",
        lekcje: ["Pole figury", "Pole równoległoboku i rombu", "Pole trójkąta", "Pole trapezu", "Różne jednostki pola"] },
      { id: "sp5-matematyka-i-my", nr: "VI", nazwa: "Matematyka i my", opis: "Kalendarz i zegar, miary i pieniądze, średnia arytmetyczna, liczby ujemne i dodawanie liczb całkowitych.", plik: "sp5/matematyka-i-my.js",
        lekcje: ["Kalendarz i zegar", "Miary, wagi i pieniądze", "Średnia arytmetyczna", "Liczby dodatnie i ujemne", "Dodawanie liczb całkowitych", "O ile różnią się liczby"] },
      { id: "sp5-bryly", nr: "VII", nazwa: "Figury przestrzenne", opis: "Bryły, objętość i pojemność, objętość prostopadłościanu, siatki prostopadłościanów i graniastosłupów.", plik: "sp5/bryly.js",
        lekcje: ["Bryły", "Objętość i pojemność", "Objętość prostopadłościanu", "Siatki prostopadłościanów", "Siatki graniastosłupów"] },
    ],
  },
  {
    id: "sp6", egzamin: "e8", nazwa: "Klasa 6", etap: "Szkoła podstawowa", podrecznik: "Matematyka z kluczem 6 (Nowa Era)",
    rozdzialy: [
      { id: "sp6-calkowite", nr: "I", nazwa: "Liczby całkowite", opis: "Liczby dodatnie i ujemne, dodawanie, odejmowanie, mnożenie i dzielenie liczb całkowitych.", plik: "sp6/calkowite.js",
        lekcje: ["Liczby dodatnie i ujemne", "Dodawanie liczb całkowitych", "Mnożenie i dzielenie liczb całkowitych", "Odejmowanie liczb całkowitych", "Własności działań na liczbach całkowitych"] },
      { id: "sp6-dzialania-1", nr: "II", nazwa: "Działania na liczbach, cz. 1", opis: "Zadania tekstowe, kalkulator, dzielniki i wielokrotności, dodawanie i odejmowanie ułamków.", plik: "sp6/dzialania-1.js",
        lekcje: ["Sposoby na zadania tekstowe", "Obliczenia na kalkulatorze", "Liczby naturalne", "Dzielniki i wielokrotności", "Ułamki", "Dodawanie liczb dodatnich", "Odejmowanie liczb dodatnich", "Dodawanie i odejmowanie"] },
      { id: "sp6-dzialania-2", nr: "III", nazwa: "Działania na liczbach, cz. 2", opis: "Mnożenie i dzielenie ułamków, zaokrąglanie, ułamek liczby, kolejność działań.", plik: "sp6/dzialania-2.js",
        lekcje: ["Mnożenie", "Dzielenie", "Dzielenie pisemne", "Zaokrąglanie ułamków dziesiętnych. Ułamki okresowe", "Ułamek liczby", "Ułamek liczby – zadania", "Kolejność wykonywania działań"] },
      { id: "sp6-figury", nr: "IV", nazwa: "Figury na płaszczyźnie", opis: "Okrąg i koło, kąty, trójkąty, czworokąty i ich pola, figury na kratce.",
        lekcje: ["Okrąg i koło. Odległość punktu od prostej", "Kąty", "Trójkąty", "Czworokąty", "Pola czworokątów", "Figury na kratce"] },
      { id: "sp6-rownania", nr: "V", nazwa: "Równania", opis: "Czym jest równanie, sprawdzanie rozwiązania, rozwiązywanie równań i zadania tekstowe.",
        lekcje: ["Równania, czyli skąd my to znamy", "Sprawdzanie rozwiązania", "Jak rozwiązać równanie", "Trudniejsze równania", "Zadania tekstowe"] },
      { id: "sp6-bryly", nr: "VI", nazwa: "Bryły", opis: "Objętość brył, zamiana jednostek, siatki i pole powierzchni.",
        lekcje: ["Bryły i ich objętość", "Zamiana jednostek", "Siatki brył", "Pole powierzchni bryły"] },
      { id: "sp6-matematyka-i-my", nr: "VII", nazwa: "Matematyka i my", opis: "Tabele, diagramy i wykresy, procenty, prędkość, droga i czas, wzory, plan, mapa i skala.",
        lekcje: ["Tabele", "Diagramy i wykresy", "Procenty", "Prędkość, droga, czas", "Korzystanie ze wzorów", "Plan, mapa i skala"] },
      { id: "sp6-na-co-dzien", nr: "VIII", nazwa: "Matematyka na co dzień", opis: "Zakupy, działki i mieszkania, podróże, odżywianie.",
        lekcje: ["Zakupy", "Działki, domy, mieszkania", "Podróż", "Odżywianie"] },
    ],
  },
  {
    id: "sp7", egzamin: "e8", nazwa: "Klasa 7", etap: "Szkoła podstawowa", podrecznik: "Matematyka z kluczem 7 (Nowa Era)",
    rozdzialy: [
      { id: "sp7-procenty", nr: "I", nazwa: "Proporcjonalność i procenty", opis: "Proporcjonalność prosta, procent liczby, liczba z jej procentu, o ile procent więcej lub mniej.", plik: "sp7/procenty.js",
        lekcje: ["Proporcjonalność prosta", "Ułamek liczby", "Co to jest procent", "Obliczanie procentu danej liczby", "Wyznaczanie liczby, gdy dany jest jej procent", "O ile procent więcej, o ile procent mniej", "Obliczenia procentowe"] },
      { id: "sp7-potegi", nr: "II", nazwa: "Potęgi", opis: "Potęga o wykładniku naturalnym, działania na potęgach, notacja wykładnicza.", plik: "sp7/potegi.js",
        lekcje: ["Potęga o wykładniku naturalnym", "Potęgi o tych samych podstawach", "Własności potęgowania", "Notacja wykładnicza", "Obliczenia w notacji wykładniczej"] },
      { id: "sp7-pierwiastki", nr: "III", nazwa: "Pierwiastki", opis: "Pierwiastek kwadratowy i sześcienny, szacowanie, własności i działania na pierwiastkach.", plik: "sp7/pierwiastki.js",
        lekcje: ["Pierwiastek kwadratowy", "Szacowanie pierwiastków", "Własności pierwiastkowania", "Pierwiastek trzeciego stopnia", "Działania na pierwiastkach sześciennych", "Działania na potęgach i pierwiastkach"] },
      { id: "sp7-wyrazenia", nr: "IV", nazwa: "Wyrażenia algebraiczne", opis: "Zapisywanie wyrażeń, sumy algebraiczne, opuszczanie nawiasów, porządkowanie wyrazów.", plik: "sp7/wyrazenia.js",
        lekcje: ["Od wzorków do wzorów", "Suma algebraiczna i jej wyrazy", "Opuszczanie nawiasów", "Porządkowanie wyrazów w sumach algebraicznych", "Wyrażenia algebraiczne i procenty"] },
      { id: "sp7-rownania", nr: "V", nazwa: "Równania", opis: "Rozwiązywanie równań, zadania tekstowe (także z procentami), przekształcanie wzorów.", plik: "sp7/rownania.js",
        lekcje: ["Co to jest równanie", "Rozwiązywanie równań", "Zadania tekstowe", "Zadania tekstowe z procentami", "Przekształcanie wzorów"] },
      { id: "sp7-pitagoras", nr: "VI", nazwa: "Trójkąty prostokątne", opis: "Twierdzenie Pitagorasa, przekątna kwadratu, wysokość trójkąta równobocznego.", plik: "sp7/pitagoras.js",
        lekcje: ["Twierdzenie Pitagorasa", "Twierdzenie Pitagorasa – zadania", "Kwadrat i jego połowa", "Trójkąt równoboczny i jego połowa"] },
      { id: "sp7-uklad", nr: "VII", nazwa: "Układ współrzędnych", opis: "Kratka i układ współrzędnych, punkty, długości i pola, odcinki w układzie współrzędnych.", plik: "sp7/uklad.js",
        lekcje: ["Geometria kartki w kratkę", "Punkty w układzie współrzędnych", "Długości i pola w układzie współrzędnych", "Odcinki w układzie współrzędnych"] },
    ],
  },
  {
    id: "sp8", egzamin: "e8", nazwa: "Klasa 8", etap: "Szkoła podstawowa", podrecznik: "Matematyka z kluczem 8 (Nowa Era)",
    rozdzialy: [
      { id: "sp8-statystyka", nr: "I", nazwa: "Statystyka i prawdopodobieństwo", opis: "Diagramy i wykresy, średnia arytmetyczna, porządkowanie danych, proste doświadczenia losowe.", plik: "sp8/statystyka.js",
        lekcje: ["Diagramy i wykresy", "Średnia arytmetyczna", "Zbieranie i porządkowanie danych", "Czy statystyka mówi prawdę", "Proste doświadczenia losowe"] },
      { id: "sp8-wyrazenia", nr: "II", nazwa: "Wyrażenia algebraiczne i równania", opis: "Liczby na osi, wyrażenia algebraiczne, mnożenie sum algebraicznych, równania.", plik: "sp8/wyrazenia.js",
        lekcje: ["Liczby na osi liczbowej", "Wyrażenia algebraiczne", "Mnożenie sum algebraicznych", "Równania"] },
      { id: "sp8-figury", nr: "III", nazwa: "Figury na płaszczyźnie", opis: "Własności kątów, twierdzenie i dowód, nierówność trójkąta.", plik: "sp8/figury.js",
        lekcje: ["Własności kątów", "Kąty – zadania", "Twierdzenie matematyczne i jego dowód", "Nierówność trójkąta"] },
      { id: "sp8-wielokaty", nr: "IV", nazwa: "Wielokąty", opis: "Figury przystające, cechy przystawania trójkątów, wielokąty foremne.", plik: "sp8/wielokaty.js",
        lekcje: ["Figury przystające", "Cechy przystawania trójkątów", "Przystawanie trójkątów w dowodach twierdzeń", "Wielokąty foremne"] },
      { id: "sp8-bryly", nr: "V", nazwa: "Geometria przestrzenna", opis: "Graniastosłupy i ostrosłupy: objętość i pole powierzchni.", plik: "sp8/bryly.js",
        lekcje: ["Graniastosłupy", "Objętość graniastosłupa", "Pole powierzchni graniastosłupa", "Ostrosłupy", "Objętość ostrosłupa", "Pole powierzchni ostrosłupa", "Graniastosłupy i ostrosłupy – zadania", "Bryły – zadania"] },
      { id: "sp8-kola", nr: "VII", nazwa: "Koła i okręgi. Symetrie", opis: "Długość okręgu i pole koła, oś i środek symetrii, symetralna odcinka i dwusieczna kąta.", plik: "sp8/kola.js",
        lekcje: ["Długość okręgu", "Pole koła", "Długość okręgu i pole koła – zadania", "Oś symetrii i środek symetrii", "Symetralna odcinka i dwusieczna kąta"] },
      { id: "sp8-prawdopodobienstwo", nr: "VIII", nazwa: "Rachunek prawdopodobieństwa", opis: "Reguła mnożenia i obliczanie prawdopodobieństwa.", plik: "sp8/prawdopodobienstwo.js",
        lekcje: ["Reguła mnożenia", "Zastosowania reguły mnożenia", "Obliczanie prawdopodobieństwa", "Kombinatoryka a prawdopodobieństwo"] },
    ],
  },

  // ───────────────────────── Szkoła średnia (Kurczab, Kurczab, Świda, zakres podstawowy, Pazdro) ─────────────────────────
  // Technikum korzysta z tych samych czterech podręczników; w klasie 5 technikum zostaje powtórka w części „Matura”.
  {
    id: "lo1", egzamin: "matura", nazwa: "Klasa 1", etap: "Liceum i technikum", podrecznik: "Matematyka 1, zakres podstawowy (Pazdro)",
    rozdzialy: [
      { id: "lo1-liczby", nr: "1", nazwa: "Zbiory liczbowe. Liczby rzeczywiste", opis: "Zbiory i działania na nich, przedziały, równania i nierówności, procenty i punkty procentowe, przybliżenia.", plik: "lo1/liczby.js",
        lekcje: ["Zbiór. Działania na zbiorach", "Zbiory liczbowe. Oś liczbowa", "Prawa działań w zbiorze liczb rzeczywistych", "Przedziały", "Zbiór liczb naturalnych i zbiór liczb całkowitych", "Przypomnienie i uzupełnienie wiadomości o równaniach", "Rozwiązywanie równań metodą równań równoważnych", "Nierówność z jedną niewiadomą", "Procenty", "Punkty procentowe", "Przybliżenia, błąd bezwzględny i względny, szacowanie"] },
      { id: "lo1-wyrazenia", nr: "2", nazwa: "Wyrażenia algebraiczne", opis: "Potęgi i pierwiastki, wzory skróconego mnożenia, logarytmy, zdania i dowody, przekształcanie wzorów.", plik: "lo1/wyrazenia.js",
        lekcje: ["Potęga o wykładniku naturalnym", "Pierwiastek arytmetyczny. Pierwiastek stopnia nieparzystego z liczby ujemnej", "Działania na wyrażeniach algebraicznych", "Wzory skróconego mnożenia stopnia 2", "Potęga o wykładniku całkowitym ujemnym", "Potęga o wykładniku wymiernym", "Potęga o wykładniku rzeczywistym", "Określenie logarytmu", "Zastosowania logarytmów", "Zdanie. Zaprzeczenie zdania", "Zdania złożone. Zaprzeczenia zdań złożonych", "Definicja. Twierdzenie. Dowód twierdzenia", "Przekształcanie wzorów"] },
      { id: "lo1-funkcje", nr: "3", nazwa: "Funkcje i ich własności", opis: "Pojęcie funkcji i wykres, dziedzina i zbiór wartości, miejsce zerowe, monotoniczność, odczytywanie własności z wykresu.", plik: "lo1/funkcje.js",
        lekcje: ["Pojęcie funkcji. Sposoby opisywania funkcji", "Wykres funkcji", "Dziedzina funkcji liczbowej", "Zbiór wartości funkcji. Najmniejsza i największa wartość", "Miejsce zerowe funkcji", "Monotoniczność funkcji", "Funkcje różnowartościowe", "Odczytywanie własności funkcji na podstawie wykresu", "Informacje z wykresu funkcji"] },
      { id: "lo1-liniowa", nr: "4", nazwa: "Funkcja liniowa", opis: "Proporcjonalność prosta, wykres i miejsce zerowe, współczynnik kierunkowy, zadania praktyczne.", plik: "lo1/liniowa.js",
        lekcje: ["Proporcjonalność prosta", "Funkcja liniowa. Wykres i miejsce zerowe", "Znaczenie współczynnika kierunkowego", "Własności funkcji liniowej – zadania różne", "Zastosowanie funkcji liniowej w zadaniach praktycznych"] },
      { id: "lo1-uklady", nr: "5", nazwa: "Układy równań liniowych z dwiema niewiadomymi", opis: "Równania z dwiema niewiadomymi, metoda podstawiania i przeciwnych współczynników, rozwiązanie graficzne, zadania.", plik: "lo1/uklady.js",
        lekcje: ["Równania pierwszego stopnia z dwiema niewiadomymi", "Układy równań. Graficzne rozwiązywanie", "Metoda podstawiania", "Metoda przeciwnych współczynników", "Zastosowanie układów równań do zadań"] },
      { id: "lo1-wybrane-funkcje", nr: "6", nazwa: "Podstawowe własności wybranych funkcji", opis: "Funkcja kwadratowa, proporcjonalność odwrotna, funkcja wykładnicza i logarytmiczna.", plik: "lo1/wybrane-funkcje.js",
        lekcje: ["Funkcja kwadratowa", "Funkcja kwadratowa – zastosowania", "Proporcjonalność odwrotna", "Funkcja wykładnicza", "Funkcja logarytmiczna"] },
      { id: "lo1-trojkaty", nr: "7", nazwa: "Geometria płaska – pojęcia wstępne. Trójkąty", opis: "Proste i kąty, wielokąty, twierdzenie Talesa i Pitagorasa, wysokości i środkowe, przystawanie i podobieństwo trójkątów.", plik: "lo1/trojkaty.js",
        lekcje: ["Punkt, prosta, odcinek, półprosta, kąt", "Wzajemne położenie prostych, symetralna i dwusieczna", "Dwie proste przecięte trzecią. Suma kątów w trójkącie", "Wielokąt. Suma kątów w wielokącie", "Twierdzenie Talesa", "Podział trójkątów. Nierówność trójkąta", "Twierdzenie Pitagorasa i twierdzenie odwrotne", "Wysokości i środkowe w trójkącie", "Przystawanie trójkątów", "Podobieństwo trójkątów", "Podobieństwo trójkątów – zadania"] },
      { id: "lo1-trygonometria", nr: "8", nazwa: "Trygonometria kąta ostrego", opis: "Sinus, cosinus, tangens i cotangens w trójkącie prostokątnym, wartości dla 30°, 45° i 60°, związki między nimi.", plik: "lo1/trygonometria.js",
        lekcje: ["Sinus, cosinus, tangens i cotangens w trójkącie prostokątnym", "Wartości dla kątów 30°, 45°, 60°", "Zależności między funkcjami trygonometrycznymi tego samego kąta"] },
    ],
  },
  {
    id: "lo2", egzamin: "matura", nazwa: "Klasa 2", etap: "Liceum i technikum", podrecznik: "Matematyka 2, zakres podstawowy (Pazdro)",
    rozdzialy: [
      { id: "lo2-przeksztalcenia", nr: "1", nazwa: "Przekształcenia wykresów funkcji", opis: "Wektory, przesunięcie wykresu wzdłuż osi, rozwiązywanie równań i nierówności z wykresu.", plik: "lo2/przeksztalcenia.js",
        lekcje: ["Wektor na płaszczyźnie", "Wektor w układzie współrzędnych", "Przesunięcie równoległe wzdłuż osi OX", "Przesunięcie równoległe wzdłuż osi OY", "Zastosowanie wykresów funkcji do rozwiązywania równań i nierówności"] },
      { id: "lo2-modul", nr: "2", nazwa: "Wartość bezwzględna", opis: "Wartość bezwzględna, odległość na osi liczbowej, proste równania z wartością bezwzględną.", plik: "lo2/modul.js",
        lekcje: ["Wartość bezwzględna liczby rzeczywistej", "Odległość między liczbami na osi liczbowej", "Proste równania z wartością bezwzględną"] },
      { id: "lo2-kwadratowa", nr: "3", nazwa: "Funkcja kwadratowa", opis: "Postać ogólna, kanoniczna i iloczynowa, wykres, wartość najmniejsza i największa, równania i nierówności kwadratowe.", plik: "lo2/kwadratowa.js",
        lekcje: ["Przypomnienie wiadomości z klasy 1", "Związek postaci ogólnej z kanoniczną", "Miejsca zerowe. Postać iloczynowa", "Szkicowanie wykresów. Odczytywanie własności", "Wyznaczanie wzoru funkcji kwadratowej", "Najmniejsza i największa wartość w przedziale domkniętym", "Zadania optymalizacyjne", "Równania kwadratowe", "Nierówności kwadratowe", "Zadania prowadzące do równań i nierówności kwadratowych"] },
      { id: "lo2-okregi", nr: "4", nazwa: "Geometria płaska – okręgi i koła", opis: "Położenie prostej i okręgu, dwa okręgi, kąty w kole, styczna, okrąg opisany i wpisany w trójkąt.",
        lekcje: ["Powtórzenie geometrii z klasy 1", "Okrąg. Położenie prostej i okręgu", "Wzajemne położenie dwóch okręgów", "Kąty i koła", "Twierdzenie o stycznej i siecznej", "Wybrane konstrukcje geometryczne", "Okrąg opisany na trójkącie", "Okrąg wpisany w trójkąt"] },
      { id: "lo2-trygonometria", nr: "5", nazwa: "Trygonometria", opis: "Powtórzenie kąta ostrego, funkcje trygonometryczne dowolnego kąta, tożsamości, wzory redukcyjne.",
        lekcje: ["Trygonometria kąta ostrego – powtórzenie", "Sinus, cosinus, tangens i cotangens dowolnego kąta", "Podstawowe tożsamości trygonometryczne", "Wybrane wzory redukcyjne"] },
      { id: "lo2-analityczna", nr: "6", nazwa: "Geometria analityczna", opis: "Odcinek w układzie współrzędnych, równanie kierunkowe i ogólne prostej, równanie okręgu.",
        lekcje: ["Odcinek w układzie współrzędnych", "Równanie kierunkowe prostej", "Równanie ogólne prostej", "Równanie okręgu"] },
      { id: "lo2-pola", nr: "7", nazwa: "Rozwiązywanie trójkątów. Pole koła i trójkąta", opis: "Twierdzenie cosinusów, pole trójkąta, pola figur podobnych, pole koła i wycinka.",
        lekcje: ["Twierdzenie cosinusów", "Zastosowanie twierdzenia cosinusów", "Pole figury płaskiej", "Pole trójkąta, cz. 1", "Pole trójkąta, cz. 2", "Pola trójkątów podobnych", "Pole koła, pole wycinka koła", "Pole w dowodzeniu twierdzeń"] },
      { id: "lo2-wielomiany", nr: "8", nazwa: "Wielomiany", opis: "Pojęcie wielomianu, działania, równość wielomianów, pierwiastek wielomianu, rozkład na czynniki, równania.",
        lekcje: ["Wielomiany jednej zmiennej", "Dodawanie, odejmowanie i mnożenie wielomianów", "Równość wielomianów", "Pierwiastek wielomianu", "Rozkładanie wielomianów na czynniki", "Równania wielomianowe", "Zadania prowadzące do równań wielomianowych"] },
    ],
  },
  {
    id: "lo3", egzamin: "matura", nazwa: "Klasa 3", etap: "Liceum i technikum", podrecznik: "Matematyka 3, zakres podstawowy (Pazdro)",
    rozdzialy: [
      { id: "lo3-wymierne", nr: "1", nazwa: "Ułamki algebraiczne. Równania wymierne", opis: "Skracanie, mnożenie i dzielenie ułamków algebraicznych, równania wymierne, funkcja homograficzna.",
        lekcje: ["Ułamek algebraiczny. Skracanie i rozszerzanie", "Mnożenie i dzielenie ułamków algebraicznych", "Równania wymierne", "Zadania tekstowe prowadzące do równań wymiernych", "Funkcja homograficzna"] },
      { id: "lo3-ciagi", nr: "2", nazwa: "Ciągi liczbowe", opis: "Określenie i monotoniczność ciągu, ciąg arytmetyczny i geometryczny, sumy, lokaty i kredyty.",
        lekcje: ["Określenie ciągu. Sposoby opisywania ciągów", "Monotoniczność ciągów", "Ciąg arytmetyczny", "Suma początkowych wyrazów ciągu arytmetycznego", "Ciąg geometryczny", "Suma początkowych wyrazów ciągu geometrycznego", "Ciąg arytmetyczny i geometryczny – zadania różne", "Lokaty pieniężne i kredyty bankowe"] },
      { id: "lo3-kombinatoryka", nr: "3", nazwa: "Kombinatoryka", opis: "Reguła mnożenia i reguła dodawania, zadania kombinatoryczne.",
        lekcje: ["Reguła mnożenia i reguła dodawania", "Zadania kombinatoryczne"] },
      { id: "lo3-czworokaty", nr: "4", nazwa: "Geometria płaska – czworokąty", opis: "Podział czworokątów, trapezy i równoległoboki, wielokąty foremne, czworokąty podobne.",
        lekcje: ["Podział czworokątów. Trapezoidy", "Trapezy", "Równoległoboki", "Wielokąty. Wielokąt foremny", "Podobieństwo. Czworokąty podobne"] },
      { id: "lo3-pola", nr: "5", nazwa: "Geometria płaska – pole czworokąta", opis: "Pola prostokąta, równoległoboku, rombu i trapezu, pola figur podobnych, skala mapy.",
        lekcje: ["Pole prostokąta. Pole kwadratu", "Pole równoległoboku. Pole rombu", "Pole trapezu", "Pole czworokąta – zadania różne", "Pola figur podobnych", "Mapa. Skala mapy"] },
      { id: "lo3-analityczna", nr: "6", nazwa: "Geometria analityczna", opis: "Wektor i podział odcinka, proste w układzie współrzędnych, równanie okręgu, przekształcenia.",
        lekcje: ["Wektor w układzie współrzędnych. Podział odcinka", "Proste w układzie współrzędnych", "Równanie okręgu. Prosta i okrąg", "Zadania różne z geometrii analitycznej", "Wybrane przekształcenia geometryczne w układzie współrzędnych"] },
    ],
  },
  {
    id: "lo4", egzamin: "matura", nazwa: "Klasa 4", etap: "Liceum i technikum", podrecznik: "Matematyka 4, zakres podstawowy (Pazdro)",
    rozdzialy: [
      { id: "lo4-wykladnicza", nr: "1", nazwa: "Funkcja wykładnicza. Funkcja logarytmiczna", opis: "Potęgi i logarytmy, wykresy funkcji wykładniczej i logarytmicznej, równania, zastosowania.",
        lekcje: ["Potęga o wykładniku rzeczywistym – powtórzenie", "Funkcja wykładnicza i jej własności", "Przekształcenia wykresów funkcji wykładniczych", "Równania wykładnicze", "Nierówności wykładnicze", "Logarytm – powtórzenie", "Funkcja logarytmiczna", "Przekształcenia wykresów funkcji logarytmicznych", "Równania logarytmiczne", "Zastosowania w praktyce"] },
      { id: "lo4-statystyka", nr: "2", nazwa: "Statystyka. Rachunek prawdopodobieństwa", opis: "Prezentowanie danych, średnia, mediana i moda, kombinatoryka, zdarzenia i prawdopodobieństwo klasyczne.",
        lekcje: ["Sposoby prezentowania danych", "Średnia z próby", "Mediana i moda z próby", "Kombinatoryka – powtórzenie", "Doświadczenie losowe", "Zdarzenia. Działania na zdarzeniach", "Określenie prawdopodobieństwa", "Prawdopodobieństwo klasyczne", "Doświadczenie losowe wieloetapowe"] },
      { id: "lo4-wielosciany", nr: "3", nazwa: "Geometria przestrzenna – wielościany", opis: "Proste i płaszczyzny w przestrzeni, kąty, graniastosłupy i ostrosłupy: pole powierzchni i objętość.",
        lekcje: ["Płaszczyzny i proste w przestrzeni", "Prostopadłość prostych i płaszczyzn", "Rzut równoległy na płaszczyznę", "Twierdzenie o trzech prostych prostopadłych", "Kąt między prostą a płaszczyzną. Kąt dwuścienny", "Graniastosłupy", "Ostrosłupy", "Siatka wielościanu. Pole powierzchni", "Objętość wielościanów", "Wielościany podobne"] },
      { id: "lo4-obrotowe", nr: "4", nazwa: "Geometria przestrzenna – bryły obrotowe", opis: "Walec, stożek i kula: pole powierzchni i objętość, bryły podobne.",
        lekcje: ["Walec", "Stożek", "Kula i sfera", "Bryły obrotowe podobne", "Bryły obrotowe – zadania różne"] },
    ],
  },
];
