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
      { id: "sp4-figury", nazwa: "Proste, odcinki i kąty", opis: "Proste równoległe i prostopadłe, mierzenie kątów, wielokąty, prostokąt i kwadrat.", tematy: { "e8-figury": ["katy", "pola-obwody"] }, luka: "brak prostych, odcinków, mierzenia kątów i okręgu" },
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
      { id: "sp5-figury", nazwa: "Kąty i figury na płaszczyźnie", opis: "Rodzaje kątów, trójkąty i czworokąty, ich własności.", tematy: { "e8-figury": ["katy", "trojkaty", "czworokaty"] }, luka: "brak mierzenia i rysowania kątów" },
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
      { id: "sp6-figury", nazwa: "Trójkąty i czworokąty", opis: "Kąty, trójkąty, czworokąty i ich pola, figury na kratce.", tematy: { "e8-figury": ["katy", "trojkaty", "czworokaty", "pola-obwody"] }, luka: "brak koła i okręgu (promień, średnica, rysowanie cyrklem)" },
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
      { id: "sp8-figury", nazwa: "Figury na płaszczyźnie", opis: "Kąty, trójkąty, przystawanie trójkątów, twierdzenie Pitagorasa.", tematy: { "e8-figury": ["katy", "trojkaty", "pitagoras"] } },
      { id: "sp8-wielokaty", nazwa: "Wielokąty", opis: "Własności czworokątów, wielokąty foremne, pola i obwody, figury w układzie.", tematy: { "e8-figury": ["czworokaty", "pola-obwody", "uklad-wspolrzednych"] } },
      { id: "sp8-bryly", nazwa: "Graniastosłupy i ostrosłupy", opis: "Siatki, pole powierzchni i objętość brył, przekątne i wysokości.", tematy: { "e8-bryly": ["graniastoslupy", "ostroslupy", "siatki", "pole-powierzchni", "objetosc", "przekatne-wysokosci"] } },
      { id: "sp8-kola", nazwa: "Koła i okręgi", opis: "Obwód i pole koła, długość okręgu, koło i okrąg w zadaniach.", tematy: {}, luka: "brak całego działu: pole i obwód koła, długość okręgu" },
      { id: "sp8-symetrie", nazwa: "Symetrie", opis: "Symetria osiowa i środkowa, osie symetrii figur.", tematy: { "e8-figury": ["symetrie"] } },
      { id: "sp8-prawdopodobienstwo", nazwa: "Prawdopodobieństwo", opis: "Doświadczenia losowe, zliczanie możliwości, obliczanie prawdopodobieństwa.", tematy: { "e8-dane": ["zliczanie", "prawdopodobienstwo"] } },
    ],
  },

  // ───────────────────────── Liceum (zakres podstawowy) ─────────────────────────
  {
    id: "lo1", egzamin: "matura", nazwa: "Klasa 1",
    rozdzialy: [
      { id: "lo1-liczby", nazwa: "Liczby rzeczywiste i przedziały", opis: "Rodzaje liczb, przedziały, przybliżenia i błędy, rozwinięcia dziesiętne.", tematy: { "liczby": ["liczby-rzeczywiste"] }, luka: "brak działań na zbiorach (suma, iloczyn, różnica)" },
      { id: "lo1-potegi-pierwiastki", nazwa: "Potęgi i pierwiastki", opis: "Potęgi o wykładniku całkowitym i wymiernym, pierwiastki, usuwanie niewymierności.", tematy: { "liczby": ["potegi", "pierwiastki"] } },
      { id: "lo1-logarytmy", nazwa: "Logarytmy", opis: "Definicja i własności logarytmu, logarytm dziesiętny.", tematy: { "liczby": ["logarytmy"] } },
      { id: "lo1-procenty", nazwa: "Procenty", opis: "Procent, podwyżki i obniżki, punkty procentowe, procent składany.", tematy: { "liczby": ["procenty"], "tekstowe": ["procenty-i-pieniadze"] } },
      { id: "lo1-wyrazenia", nazwa: "Wyrażenia algebraiczne", opis: "Mnożenie sum, wyłączanie przed nawias, wzory skróconego mnożenia.", tematy: { "liczby": ["wyrazenia"], "dowody": ["dowody-algebraiczne"] } },
      { id: "lo1-nierownosci", nazwa: "Nierówności i wartość bezwzględna", opis: "Nierówności liniowe, wartość bezwzględna, równania i nierówności z modułem.", tematy: { "liczby": ["nierownosci", "rownania", "liczby-rzeczywiste"] } },
      { id: "lo1-uklady", nazwa: "Układy równań", opis: "Metoda podstawiania i przeciwnych współczynników, zadania tekstowe.", tematy: { "liczby": ["rownania"], "tekstowe": ["rownania-z-tresci"] } },
      { id: "lo1-funkcje", nazwa: "Funkcje i ich własności", opis: "Pojęcie funkcji, wykres, monotoniczność, proporcjonalność odwrotna.", tematy: { "funkcje": ["wlasnosci-funkcji", "inne-funkcje"] } },
      // Pazdro: klasa 2
      { id: "lo1-przeksztalcanie-wykresow", nazwa: "Przekształcenia wykresów", opis: "Przesunięcia i symetrie wykresu funkcji.", tematy: { "funkcje": ["wlasnosci-funkcji"] } },
      { id: "lo1-liniowa", nazwa: "Funkcja liniowa", opis: "Wykres i własności funkcji liniowej, równanie prostej, proste równoległe i prostopadłe.", tematy: { "funkcje": ["funkcja-liniowa"], "geometria": ["geometria-analityczna"] } },
      { id: "lo1-trojkaty", nazwa: "Trójkąty: przystawanie i podobieństwo", opis: "Kąty w trójkącie, trójkąty przystające i podobne, twierdzenie Talesa.", tematy: { "geometria": ["planimetria"], "dowody": ["dowody-geometryczne"] } },
    ],
  },
  {
    id: "lo2", egzamin: "matura", nazwa: "Klasa 2",
    rozdzialy: [
      { id: "lo2-kwadratowa", nazwa: "Funkcja kwadratowa", opis: "Wykres paraboli, wierzchołek, postać kanoniczna i iloczynowa, wartości największe i najmniejsze.", tematy: { "funkcje": ["funkcja-kwadratowa"], "dowody": ["optymalizacja"] } },
      { id: "lo2-rownania-kw", nazwa: "Równania i nierówności kwadratowe", opis: "Delta, miejsca zerowe, wzory Viète’a, nierówności kwadratowe.", tematy: { "liczby": ["rownania", "nierownosci"], "funkcje": ["funkcja-kwadratowa"] } },
      // Kolejność niepewna: u części wydawnictw wielomiany są w klasie 3.
      { id: "lo2-wielomiany", nazwa: "Wielomiany", opis: "Rozkład wielomianu na czynniki, wyłączanie przed nawias i grupowanie, równania wielomianowe.", tematy: { "liczby": ["wyrazenia", "rownania"] } },
      // NE: klasa 1 (wartość bezwzględna w rozdziale „Język matematyki”)
      { id: "lo2-modul", nazwa: "Równania i nierówności z modułem", opis: "Wartość bezwzględna, równania i nierówności z wartością bezwzględną.", tematy: { "liczby": ["liczby-rzeczywiste", "rownania", "nierownosci"] } },
      // Pazdro: klasa 1 (trygonometria kąta ostrego i wypukłego)
      { id: "lo2-trygonometria", nazwa: "Trygonometria", opis: "Sinus, cosinus i tangens, wartości dla 30°, 45°, 60°, związki między funkcjami.", tematy: { "geometria": ["trygonometria"] } },
      { id: "lo2-okregi", nazwa: "Okręgi i koła", opis: "Kąty w okręgu, styczna, okrąg wpisany i opisany, pole koła.", tematy: { "geometria": ["planimetria"], "dowody": ["dowody-geometryczne"] } },
      { id: "lo2-pola-trojkaty", nazwa: "Pola figur i rozwiązywanie trójkątów", opis: "Pole trójkąta z sinusem, twierdzenie sinusów i cosinusów.", tematy: { "geometria": ["planimetria", "trygonometria"] } },
      // NE: klasa 3 (Geometria analityczna); Pazdro: klasy 2 i 3
      { id: "lo2-geom-analityczna", nazwa: "Geometria analityczna", opis: "Odcinek, prosta i okrąg w układzie współrzędnych, symetrie punktu.", tematy: { "geometria": ["geometria-analityczna"] } },
    ],
  },
  {
    id: "lo3", egzamin: "matura", nazwa: "Klasa 3",
    rozdzialy: [
      // Pazdro: klasa 4
      { id: "lo3-wykladnicza", nazwa: "Funkcja wykładnicza i logarytmiczna", opis: "Wykres i własności funkcji wykładniczej i logarytmicznej, zastosowania.", tematy: { "funkcje": ["inne-funkcje"], "liczby": ["logarytmy"] } },
      // Pazdro: klasy 2 i 3
      { id: "lo3-geom-analityczna", nazwa: "Geometria analityczna", opis: "Odległość, środek odcinka, równanie okręgu, położenie okręgu i prostej.", tematy: { "geometria": ["geometria-analityczna"] }, luka: "brak wzajemnego położenia dwóch okręgów" },
      { id: "lo3-ciagi", nazwa: "Ciągi – własności", opis: "Wzór ogólny, kolejne wyrazy, ciągi monotoniczne, wzór rekurencyjny.", tematy: { "funkcje": ["wzor-ogolny"] }, luka: "brak ciągów określonych rekurencyjnie" },
      { id: "lo3-arytmetyczny", nazwa: "Ciąg arytmetyczny", opis: "Różnica, wyraz ogólny, suma początkowych wyrazów.", tematy: { "funkcje": ["ciag-arytmetyczny"], "tekstowe": ["ciagi-w-praktyce"] } },
      { id: "lo3-geometryczny", nazwa: "Ciąg geometryczny", opis: "Iloraz, wyraz ogólny, suma wyrazów, procent składany.", tematy: { "funkcje": ["ciag-geometryczny"], "tekstowe": ["ciagi-w-praktyce", "procenty-i-pieniadze"] } },
      { id: "lo3-wielosciany", nazwa: "Graniastosłupy i ostrosłupy", opis: "Przekątne i odcinki w bryłach, pole powierzchni, objętość, kąty w bryłach.", tematy: { "geometria": ["stereometria"] }, luka: "brak prostych i płaszczyzn w przestrzeni oraz przekrojów" },
      // Pazdro: klasa 3
      { id: "lo3-wymierne", nazwa: "Ułamki algebraiczne i funkcje wymierne", opis: "Skracanie ułamków z niewiadomą, równania z ułamkiem, funkcja homograficzna.", tematy: { "liczby": ["wyrazenia", "rownania"], "funkcje": ["inne-funkcje"] }, luka: "brak funkcji homograficznej i równań wymiernych" },
      // NE: klasa 4
      { id: "lo3-kombinatoryka", nazwa: "Kombinatoryka", opis: "Reguła mnożenia i dodawania, permutacje, wariacje.", tematy: { "statystyka": ["kombinatoryka"] } },
    ],
  },
  {
    id: "lo4", egzamin: "matura", nazwa: "Klasa 4",
    rozdzialy: [
      // Pazdro: klasa 3
      { id: "lo4-kombinatoryka", nazwa: "Kombinatoryka", opis: "Reguła mnożenia i dodawania, permutacje, wariacje.", tematy: { "statystyka": ["kombinatoryka"] } },
      { id: "lo4-prawdopodobienstwo", nazwa: "Rachunek prawdopodobieństwa", opis: "Zdarzenia losowe, prawdopodobieństwo klasyczne, zdarzenie przeciwne.", tematy: { "statystyka": ["prawdopodobienstwo"] }, luka: "brak wartości oczekiwanej i drzewka" },
      // NE (starsze wydanie): klasa 3; Pazdro: klasa 4
      { id: "lo4-statystyka", nazwa: "Statystyka", opis: "Średnia, mediana, dominanta, odchylenie standardowe.", tematy: { "statystyka": ["statystyka"] } },
      // NE: klasa 3 w nowym wydaniu
      { id: "lo4-wielosciany", nazwa: "Graniastosłupy i ostrosłupy", opis: "Powtórka: pole powierzchni i objętość wielościanów, kąty w bryłach.", tematy: { "geometria": ["stereometria"] }, luka: "brak prostych i płaszczyzn w przestrzeni oraz przekrojów" },
      { id: "lo4-bryly-obrotowe", nazwa: "Bryły obrotowe", opis: "Walec, stożek, kula, bryły podobne.", tematy: { "geometria": ["stereometria"] } },
      // Pazdro: klasa 4
      { id: "lo4-wykladnicza", nazwa: "Funkcja wykładnicza i logarytmiczna", opis: "Powtórka: wykresy, własności i zastosowania.", tematy: { "funkcje": ["inne-funkcje"], "liczby": ["logarytmy"] } },
      { id: "lo4-dowody", nazwa: "Dowody w matematyce", opis: "Dowody w algebrze i geometrii, dowody nie wprost.", tematy: { "dowody": ["dowody-algebraiczne", "dowody-geometryczne"] }, luka: "brak dowodów nie wprost" },
      { id: "lo4-powtorzenie", nazwa: "Zadania tekstowe do matury", opis: "Powtórzenie przed maturą: ruch, praca, procenty, ciągi i optymalizacja z treści.", tematy: { "tekstowe": ["ruch-i-praca", "procenty-i-pieniadze", "rownania-z-tresci", "ciagi-w-praktyce"], "dowody": ["optymalizacja"] } },
    ],
  },
];
