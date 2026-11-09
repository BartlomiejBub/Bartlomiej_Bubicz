// Rozdziały w szkole: szkoła podstawowa (klasy 4–8) i liceum (klasy 1–4, zakres podstawowy), w kolejności z podręczników
// (Nowa Era „Matematyka z kluczem” i „MATeMAtyka”, GWO „Matematyka z plusem”, Pazdro). Gdy serie uczą tematu w różnych
// klasach, rozdział jest w obu – komentarz nad nim mówi, gdzie jest u drugiego wydawnictwa.
// tematy – dział → id tematów z assets/arkusze/tematy.js, które ćwiczą ten rozdział;
// luka   – czego do tego rozdziału jeszcze nie ma na stronie (brak pola = rozdział pokryty). Pusty rozdział (tematy: {})
//          uczeń widzi jako „wkrótce”. Sprawdzenie pliku: node tools/test-szkola.mjs
export const KLASY = [
  // ───────────────────────── Szkoła podstawowa ─────────────────────────
  {
    id: "sp4", egzamin: "e8", nazwa: "Klasa 4",
    rozdzialy: [
      { id: "sp4-zapis-liczb", nazwa: "Zapis liczb naturalnych", opis: "System dziesiętny, liczby rzymskie, oś liczbowa, porównywanie i zaokrąglanie.", tematy: { "e8-liczby": ["systemy-zapisu", "os-liczbowa", "zaokraglanie"] } },
      { id: "sp4-dzialania", nazwa: "Działania na liczbach naturalnych", opis: "Dodawanie, odejmowanie, mnożenie i dzielenie w pamięci, kolejność działań.", tematy: { "e8-podstawy": ["kolejnosc-dzialan", "dzielenie"] }, luka: "brak ćwiczeń rachunku w pamięci" },
      { id: "sp4-pisemne", nazwa: "Działania pisemne", opis: "Dodawanie, odejmowanie, mnożenie i dzielenie pisemne.", tematy: { "e8-podstawy": ["dodawanie-odejmowanie", "mnozenie", "dzielenie"] } },
      { id: "sp4-figury", nazwa: "Proste, odcinki i kąty", opis: "Proste i odcinki, proste równoległe i prostopadłe, mierzenie kątów, koło i okrąg, prostokąt i kwadrat.", tematy: { "e8-figury": ["proste-odcinki", "katy", "kola-i-okregi", "pola-obwody"] } },
      { id: "sp4-ulamki-zwykle", nazwa: "Ułamki zwykłe", opis: "Ułamek jako część całości, liczby mieszane, skracanie, dodawanie i odejmowanie.", tematy: { "e8-podstawy": ["ulamki-zwykle"], "e8-liczby": ["os-liczbowa"] } },
      { id: "sp4-ulamki-dziesietne", nazwa: "Ułamki dziesiętne", opis: "Zapis, porównywanie, dodawanie i odejmowanie ułamków dziesiętnych.", tematy: { "e8-podstawy": ["ulamki-dziesietne"] } },
      { id: "sp4-pola-bryly", nazwa: "Pola figur i prostopadłościan", opis: "Pole prostokąta i kwadratu, siatka, pole powierzchni i objętość prostopadłościanu.", tematy: { "e8-figury": ["pola-obwody"], "e8-bryly": ["graniastoslupy", "siatki", "pole-powierzchni", "objetosc"] } },
      // NE: klasa 5 (Matematyka i my); GWO: klasa 4 (Systemy zapisywania liczb)
      { id: "sp4-miary", nazwa: "Jednostki, pieniądze i czas", opis: "Jednostki długości i masy, złotówki i grosze, zegar i kalendarz.", tematy: { "e8-procenty": ["jednostki", "pieniadze", "czas-kalendarz"] } },
    ],
  },
  {
    id: "sp5", egzamin: "e8", nazwa: "Klasa 5",
    rozdzialy: [
      { id: "sp5-naturalne", nazwa: "Własności liczb naturalnych", opis: "Podzielność, dzielniki i wielokrotności, liczby pierwsze, kolejność działań.", tematy: { "e8-podstawy": ["podzielnosc", "kolejnosc-dzialan"], "e8-liczby": ["dzielniki"] } },
      { id: "sp5-figury", nazwa: "Kąty i figury na płaszczyźnie", opis: "Rodzaje kątów, trójkąty i czworokąty, ich własności.", tematy: { "e8-figury": ["katy", "trojkaty", "czworokaty"] } },
      { id: "sp5-ulamki-zwykle", nazwa: "Ułamki zwykłe", opis: "Skracanie, rozszerzanie, porównywanie, dodawanie i odejmowanie ułamków.", tematy: { "e8-podstawy": ["ulamki-zwykle"], "e8-liczby": ["os-liczbowa"] } },
      { id: "sp5-ulamki-dziesietne", nazwa: "Ułamki dziesiętne", opis: "Działania na ułamkach dziesiętnych i zamiana jednostek.", tematy: { "e8-podstawy": ["ulamki-dziesietne"], "e8-liczby": ["ulamki-i-rozwiniecia"], "e8-procenty": ["jednostki"] } },
      { id: "sp5-pola", nazwa: "Pola figur", opis: "Pole równoległoboku, rombu, trójkąta i trapezu, jednostki pola.", tematy: { "e8-figury": ["pola-obwody"], "e8-procenty": ["jednostki"] } },
      // GWO: klasa 4 (kalendarz, miary, pieniądze); średnia w klasie 5 u NE
      { id: "sp5-czas-miary-srednia", nazwa: "Czas, miary i średnia", opis: "Kalendarz i zegar, miary, wagi, pieniądze oraz średnia arytmetyczna.", tematy: { "e8-procenty": ["czas-kalendarz", "jednostki", "pieniadze"], "e8-dane": ["srednia"] } },
      // GWO: klasa 5; NE: klasy 5–6
      { id: "sp5-calkowite", nazwa: "Liczby ujemne i całkowite", opis: "Liczby dodatnie i ujemne, oś liczbowa, dodawanie liczb całkowitych.", tematy: { "e8-podstawy": ["liczby-ujemne"], "e8-liczby": ["os-liczbowa"] } },
      { id: "sp5-bryly", nazwa: "Bryły, siatki i objętość", opis: "Prostopadłościan i graniastosłup, siatki, objętość i pojemność.", tematy: { "e8-bryly": ["graniastoslupy", "siatki", "objetosc"], "e8-procenty": ["jednostki"] } },
    ],
  },
  {
    id: "sp6", egzamin: "e8", nazwa: "Klasa 6",
    rozdzialy: [
      // GWO: klasa 5 (Liczby całkowite) i klasa 6 (Liczby dodatnie i ujemne)
      { id: "sp6-calkowite", nazwa: "Liczby całkowite", opis: "Mnożenie, dzielenie i odejmowanie liczb całkowitych, własności działań.", tematy: { "e8-podstawy": ["liczby-ujemne"], "e8-liczby": ["os-liczbowa"] } },
      { id: "sp6-ulamki-dzialania", nazwa: "Działania na ułamkach", opis: "Mnożenie i dzielenie ułamków, zaokrąglanie, ułamek liczby, kolejność działań.", tematy: { "e8-podstawy": ["mnozenie-ulamkow", "ulamki-dziesietne", "kolejnosc-dzialan"], "e8-liczby": ["ulamki-i-rozwiniecia", "zaokraglanie", "dzielniki"] } },
      { id: "sp6-figury", nazwa: "Trójkąty i czworokąty", opis: "Kąty, trójkąty, czworokąty i ich pola, koło i okrąg, figury na kratce.", tematy: { "e8-figury": ["katy", "trojkaty", "czworokaty", "kola-i-okregi", "pola-obwody"] } },
      // GWO: klasa 6 (Wyrażenia algebraiczne i równania) – zgodnie z NE
      { id: "sp6-rownania", nazwa: "Równania", opis: "Zapisywanie wyrażeń, rozwiązywanie równań i zadania tekstowe z równaniem.", tematy: { "e8-wyrazenia": ["zapisywanie-wyrazen", "wartosc-wyrazenia", "rownania", "zadania-z-rownaniem"] } },
      { id: "sp6-bryly", nazwa: "Bryły: objętość i pole powierzchni", opis: "Siatki brył, objętość, pole powierzchni, zamiana jednostek.", tematy: { "e8-bryly": ["graniastoslupy", "siatki", "pole-powierzchni", "objetosc"], "e8-procenty": ["jednostki"] } },
      // NE: klasa 6 (wstęp) i klasa 7; GWO: klasa 6
      { id: "sp6-procenty", nazwa: "Procenty – wprowadzenie", opis: "Czym jest procent, procent z liczby, jakim procentem jest jedna liczba drugiej.", tematy: { "e8-procenty": ["procent-liczby"] } },
      { id: "sp6-predkosc", nazwa: "Prędkość, droga i czas", opis: "Wzór s = v · t, zamiana jednostek prędkości, zadania o ruchu.", tematy: { "e8-procenty": ["predkosc", "czas-kalendarz"] } },
      { id: "sp6-tabele-skala", nazwa: "Tabele, wykresy, plan i skala", opis: "Odczytywanie danych z tabel i diagramów, plan, mapa i skala.", tematy: { "e8-dane": ["odczytywanie-danych"], "e8-procenty": ["skala"] } },
      { id: "sp6-zakupy", nazwa: "Matematyka na co dzień", opis: "Zakupy, ceny, reszta, porównywanie ofert, miary.", tematy: { "e8-procenty": ["pieniadze", "jednostki"] } },
    ],
  },
  {
    id: "sp7", egzamin: "e8", nazwa: "Klasa 7",
    rozdzialy: [
      { id: "sp7-proporcje", nazwa: "Proporcjonalność", opis: "Proporcja, wielkości wprost proporcjonalne, zadania z proporcją.", tematy: { "e8-wyrazenia": ["proporcje"] } },
      { id: "sp7-procenty", nazwa: "Procenty", opis: "Procent z liczby, liczba z procentu, podwyżki, obniżki, punkty procentowe.", tematy: { "e8-procenty": ["procent-liczby", "liczba-z-procentu", "podwyzki-obnizki"] } },
      { id: "sp7-potegi", nazwa: "Potęgi", opis: "Potęga o wykładniku naturalnym, działania na potęgach, notacja wykładnicza.", tematy: { "e8-liczby": ["potegi"] } },
      { id: "sp7-pierwiastki", nazwa: "Pierwiastki", opis: "Pierwiastek kwadratowy i sześcienny, szacowanie, działania na pierwiastkach.", tematy: { "e8-liczby": ["pierwiastki"] } },
      { id: "sp7-wyrazenia", nazwa: "Wyrażenia algebraiczne", opis: "Wartość wyrażenia, wyrazy podobne, mnożenie nawiasów, wyłączanie przed nawias.", tematy: { "e8-wyrazenia": ["zapisywanie-wyrazen", "wartosc-wyrazenia", "przeksztalcanie"] } },
      { id: "sp7-rownania", nazwa: "Równania i wzory", opis: "Równania z jedną niewiadomą, zadania tekstowe, przekształcanie wzorów.", tematy: { "e8-wyrazenia": ["rownania", "zadania-z-rownaniem", "przeksztalcanie-wzorow"] } },
      // GWO: dział „Twierdzenie Pitagorasa” w klasie 7 (w starszym wydaniu GWO – klasa 8)
      { id: "sp7-pitagoras", nazwa: "Twierdzenie Pitagorasa", opis: "Trójkąty prostokątne, Pitagoras, przekątna kwadratu, wysokość trójkąta równobocznego.", tematy: { "e8-figury": ["pitagoras"], "e8-bryly": ["przekatne-wysokosci"] } },
      { id: "sp7-uklad", nazwa: "Układ współrzędnych", opis: "Punkty i odcinki w układzie współrzędnych, środek i długość odcinka.", tematy: { "e8-figury": ["uklad-wspolrzednych"] } },
      // GWO: klasa 7 (Figury geometryczne); NE: klasy 6 i 8
      { id: "sp7-figury", nazwa: "Kąty, trójkąty i czworokąty", opis: "Kąty, trójkąty i ich przystawanie, czworokąty, wielokąty foremne, pola.", tematy: { "e8-figury": ["katy", "trojkaty", "czworokaty", "pola-obwody"] } },
      // GWO: klasa 7; NE: klasa 8
      { id: "sp7-statystyka", nazwa: "Statystyka", opis: "Odczytywanie danych, średnia arytmetyczna.", tematy: { "e8-dane": ["odczytywanie-danych", "srednia"] }, luka: "brak mediany i dominanty" },
    ],
  },
  {
    id: "sp8", egzamin: "e8", nazwa: "Klasa 8",
    rozdzialy: [
      // GWO: klasa 7 (Statystyka)
      { id: "sp8-statystyka", nazwa: "Statystyka", opis: "Zbieranie i porządkowanie danych, diagramy, średnia arytmetyczna.", tematy: { "e8-dane": ["odczytywanie-danych", "srednia"] }, luka: "brak mediany i dominanty" },
      { id: "sp8-algebra", nazwa: "Wyrażenia algebraiczne i równania", opis: "Przekształcanie wyrażeń, równania, wzory i zadania tekstowe.", tematy: { "e8-wyrazenia": ["wartosc-wyrazenia", "przeksztalcanie", "rownania", "zadania-z-rownaniem", "przeksztalcanie-wzorow"] } },
      { id: "sp8-figury", nazwa: "Figury na płaszczyźnie", opis: "Kąty, trójkąty, przystawanie trójkątów, twierdzenie Pitagorasa, proste dowody w geometrii.", tematy: { "e8-figury": ["katy", "trojkaty", "pitagoras", "dowody-w-geometrii"] } },
      { id: "sp8-wielokaty", nazwa: "Wielokąty", opis: "Własności czworokątów, wielokąty foremne, pola i obwody, figury w układzie.", tematy: { "e8-figury": ["czworokaty", "pola-obwody", "uklad-wspolrzednych"] } },
      { id: "sp8-bryly", nazwa: "Graniastosłupy i ostrosłupy", opis: "Siatki, pole powierzchni i objętość brył, przekątne i wysokości.", tematy: { "e8-bryly": ["graniastoslupy", "ostroslupy", "siatki", "pole-powierzchni", "objetosc", "przekatne-wysokosci"] } },
      { id: "sp8-kola", nazwa: "Koła i okręgi", opis: "Liczba π, długość okręgu, pole koła, półkola i ćwiartki koła, figury złożone z kół.", tematy: { "e8-figury": ["kola-i-okregi"] } },
      { id: "sp8-symetrie", nazwa: "Symetrie", opis: "Symetria osiowa i środkowa, osie symetrii figur.", tematy: { "e8-figury": ["symetrie"] } },
      { id: "sp8-prawdopodobienstwo", nazwa: "Prawdopodobieństwo", opis: "Doświadczenia losowe, zliczanie możliwości, obliczanie prawdopodobieństwa.", tematy: { "e8-dane": ["zliczanie", "prawdopodobienstwo"] } },
    ],
  },

  // ───────────────────────── Liceum (zakres podstawowy) ─────────────────────────
  // Kolejność i nazwy rozdziałów jak w podręczniku Kurczab, Kurczab, Świda, „Matematyka” (Pazdro, zakres podstawowy).
  // nowe – tematy, których jeszcze nie ma na stronie (po dodaniu przenieść do tematy).
  {
    id: "lo1", egzamin: "matura", nazwa: "Klasa 1",
    rozdzialy: [
      // Kurczab kl. 1, rozdz. 1 (także procenty, punkty procentowe, błędy przybliżeń)
      { id: "lo1-zbiory-liczby", nazwa: "Zbiory liczbowe. Liczby rzeczywiste", opis: "Zbiory i działania na zbiorach, przedziały, równania i nierówności równoważne, procenty i punkty procentowe, przybliżenia i błędy.", tematy: { "liczby": ["liczby-rzeczywiste", "zbiory", "procenty", "rownania", "nierownosci"], "tekstowe": ["procenty-i-pieniadze"] } },
      // rozdz. 2 (w tym logika, dowód, logarytmy, średnie)
      { id: "lo1-wyrazenia", nazwa: "Wyrażenia algebraiczne", opis: "Potęgi i pierwiastki, wzory skróconego mnożenia, logarytmy, zdania i dowody, przekształcanie wzorów.", tematy: { "liczby": ["potegi", "pierwiastki", "wyrazenia", "logarytmy"], "dowody": ["dowody-algebraiczne"] }, nowe: ["logika", "przeksztalcanie-wzorow-lo"], luka: "brak logiki (zdania, zaprzeczenia, kwantyfikatory) i przekształcania wzorów" },
      // rozdz. 3
      { id: "lo1-funkcje", nazwa: "Funkcje i ich własności", opis: "Pojęcie funkcji, wykres, dziedzina, zbiór wartości, miejsce zerowe, monotoniczność, odczytywanie własności z wykresu.", tematy: { "funkcje": ["wlasnosci-funkcji"] } },
      // rozdz. 4
      { id: "lo1-liniowa", nazwa: "Funkcja liniowa", opis: "Proporcjonalność prosta, wykres, miejsce zerowe i współczynnik kierunkowy, zadania praktyczne.", tematy: { "funkcje": ["funkcja-liniowa"] } },
      // rozdz. 5
      { id: "lo1-uklady", nazwa: "Układy równań liniowych z dwiema niewiadomymi", opis: "Równanie z dwiema niewiadomymi, metoda podstawiania i przeciwnych współczynników, graficzne rozwiązywanie, zadania.", tematy: { "liczby": ["uklady-rownan"], "tekstowe": ["rownania-z-tresci"] } },
      // rozdz. 6
      { id: "lo1-wybrane-funkcje", nazwa: "Podstawowe własności wybranych funkcji", opis: "Funkcja kwadratowa, proporcjonalność odwrotna, funkcja wykładnicza i logarytmiczna – wykresy i własności.", tematy: { "funkcje": ["funkcja-kwadratowa", "inne-funkcje"] } },
      // rozdz. 7
      { id: "lo1-trojkaty", nazwa: "Geometria płaska – pojęcia wstępne. Trójkąty", opis: "Proste, kąty, twierdzenie Talesa, Pitagorasa, wysokości i środkowe, przystawanie i podobieństwo trójkątów.", tematy: { "geometria": ["planimetria"], "dowody": ["dowody-geometryczne"] }, nowe: ["planimetria-podstawy"], luka: "brak symetralnej i dwusiecznej jako zbiorów punktów" },
      // rozdz. 8
      { id: "lo1-trygonometria", nazwa: "Trygonometria kąta ostrego", opis: "Sinus, cosinus, tangens i cotangens w trójkącie prostokątnym, wartości dla 30°, 45°, 60°, związki między funkcjami.", tematy: { "geometria": ["trygonometria"] } },
    ],
  },
  {
    id: "lo2", egzamin: "matura", nazwa: "Klasa 2",
    rozdzialy: [
      // rozdz. 1
      { id: "lo2-przeksztalcenia", nazwa: "Przekształcenia wykresów funkcji", opis: "Wektor, przesunięcia wzdłuż osi i o wektor, symetrie wykresu, graficzne rozwiązywanie równań i nierówności.", tematy: { "funkcje": ["wlasnosci-funkcji"] }, nowe: ["wektory"], luka: "brak wektorów w układzie współrzędnych" },
      // rozdz. 2
      { id: "lo2-modul", nazwa: "Wartość bezwzględna: równania i nierówności", opis: "Wartość bezwzględna, odległość na osi liczbowej, proste równania i nierówności z wartością bezwzględną.", tematy: { "liczby": ["liczby-rzeczywiste", "rownania", "nierownosci"] } },
      // rozdz. 3
      { id: "lo2-kwadratowa", nazwa: "Funkcja kwadratowa", opis: "Postacie funkcji, miejsca zerowe, wykres, wzór z własności, równania i nierówności kwadratowe, optymalizacja.", tematy: { "funkcje": ["funkcja-kwadratowa"], "liczby": ["rownania", "nierownosci"], "dowody": ["optymalizacja"], "tekstowe": ["rownania-z-tresci"] }, luka: "brak zadań tekstowych prowadzących do równań kwadratowych" },
      // rozdz. 4
      { id: "lo2-okregi", nazwa: "Geometria płaska – okręgi i koła", opis: "Położenie prostej i okręgu oraz dwóch okręgów, kąty w kole, konstrukcje, okrąg opisany i wpisany w trójkąt.", tematy: { "geometria": ["planimetria"], "dowody": ["dowody-geometryczne"] } },
      // rozdz. 5
      { id: "lo2-trygonometria", nazwa: "Trygonometria", opis: "Funkcje trygonometryczne dowolnego kąta, tożsamości, wzory redukcyjne.", tematy: { "geometria": ["trygonometria"] } },
      // rozdz. 6
      { id: "lo2-geom-analityczna", nazwa: "Geometria analityczna", opis: "Odcinek, równanie kierunkowe i ogólne prostej, równanie okręgu.", tematy: { "geometria": ["geometria-analityczna"] } },
      // rozdz. 7
      { id: "lo2-pola-trojkaty", nazwa: "Rozwiązywanie trójkątów. Pole trójkąta i koła", opis: "Twierdzenie sinusów i cosinusów, pole trójkąta, pola figur podobnych, pole koła i wycinka koła.", tematy: { "geometria": ["planimetria", "trygonometria"] } },
      // rozdz. 8
      { id: "lo2-wielomiany", nazwa: "Wielomiany", opis: "Pojęcie wielomianu, działania, równość wielomianów, twierdzenie Bezouta, rozkład na czynniki, równania wielomianowe.", tematy: { "liczby": ["wyrazenia", "rownania"] }, nowe: ["wielomiany"], luka: "brak pojęcia wielomianu, działań, Bezouta i rozkładu; wzory na sześciany i grupowanie w ZP zostały usunięte w 2024" },
    ],
  },
  {
    id: "lo3", egzamin: "matura", nazwa: "Klasa 3",
    rozdzialy: [
      // rozdz. 1
      { id: "lo3-wymierne", nazwa: "Ułamki algebraiczne. Równania wymierne", opis: "Skracanie, mnożenie i dzielenie ułamków algebraicznych, równania wymierne, funkcja homograficzna.", tematy: { "liczby": ["wyrazenia", "rownania"], "funkcje": ["inne-funkcje", "funkcja-homograficzna"], "tekstowe": ["rownania-z-tresci"] }, nowe: ["rownania-wymierne"], luka: "brak równań wymiernych i dziedziny ułamka algebraicznego" },
      // rozdz. 2
      { id: "lo3-ciagi", nazwa: "Ciągi liczbowe", opis: "Określenie i monotoniczność ciągu, ciąg arytmetyczny i geometryczny, sumy, lokaty i kredyty.", tematy: { "funkcje": ["wzor-ogolny", "ciag-arytmetyczny", "ciag-geometryczny"], "tekstowe": ["ciagi-w-praktyce", "procenty-i-pieniadze"] }, luka: "brak kredytów spłacanych w ratach" },
      // rozdz. 3
      { id: "lo3-kombinatoryka", nazwa: "Kombinatoryka", opis: "Reguła mnożenia i reguła dodawania, zadania kombinatoryczne.", tematy: { "statystyka": ["kombinatoryka"] } },
      // rozdz. 4
      { id: "lo3-czworokaty", nazwa: "Geometria płaska – czworokąty", opis: "Podział czworokątów, trapezy, równoległoboki, wielokąty foremne, podobieństwo czworokątów.", tematy: { "geometria": ["planimetria", "czworokaty-lo"] } },
      // rozdz. 5
      { id: "lo3-pole-czworokata", nazwa: "Geometria płaska – pole czworokąta", opis: "Pole prostokąta, równoległoboku, rombu, trapezu, pola figur podobnych, skala mapy.", tematy: { "geometria": ["planimetria"] } },
      // rozdz. 6
      { id: "lo3-geom-analityczna", nazwa: "Geometria analityczna", opis: "Wektor w układzie współrzędnych, proste, równanie okręgu, położenie prostej i okręgu, przekształcenia w układzie współrzędnych.", tematy: { "geometria": ["geometria-analityczna"] }, nowe: ["wektory"], luka: "brak wektorów i położenia prostej i okręgu w układzie współrzędnych" },
    ],
  },
  {
    id: "lo4", egzamin: "matura", nazwa: "Klasa 4",
    rozdzialy: [
      // rozdz. 1
      { id: "lo4-wykladnicza", nazwa: "Funkcja wykładnicza. Funkcja logarytmiczna", opis: "Własności i wykresy, równania i nierówności wykładnicze, równania logarytmiczne, zastosowania praktyczne.", tematy: { "funkcje": ["inne-funkcje", "rownania-wykladnicze-logarytmiczne"], "liczby": ["logarytmy", "potegi"] } },
      // rozdz. 2
      { id: "lo4-statystyka-prawdopodobienstwo", nazwa: "Statystyka i rachunek prawdopodobieństwa", opis: "Prezentacja danych, średnia, mediana, moda; zdarzenia, prawdopodobieństwo klasyczne, doświadczenia wieloetapowe.", tematy: { "statystyka": ["statystyka", "kombinatoryka", "prawdopodobienstwo"] }, luka: "brak zdarzeń i drzewka; odchylenie standardowe i wartość oczekiwana uchylone w ZP w 2024" },
      // rozdz. 3
      { id: "lo4-wielosciany", nazwa: "Geometria przestrzenna – wielościany", opis: "Proste i płaszczyzny w przestrzeni, kąty w bryłach, graniastosłupy, ostrosłupy, pole powierzchni i objętość.", tematy: { "geometria": ["proste-i-plaszczyzny", "stereometria"] } },
      // rozdz. 4
      { id: "lo4-bryly-obrotowe", nazwa: "Geometria przestrzenna – bryły obrotowe", opis: "Walec, stożek, kula i sfera, bryły obrotowe podobne, zadania różne.", tematy: { "geometria": ["stereometria"] } },
      // rozdz. 5 (33 h na powtórzenie i arkusze)
      { id: "lo4-powtorzenie", nazwa: "Powtórzenie wiadomości przed maturą", opis: "Zadania tekstowe, dowody, optymalizacja i próbne arkusze.", tematy: { "tekstowe": ["ruch-i-praca", "procenty-i-pieniadze", "rownania-z-tresci", "ciagi-w-praktyce"], "dowody": ["dowody-algebraiczne", "dowody-geometryczne", "optymalizacja"] } },
    ],
  },
];
