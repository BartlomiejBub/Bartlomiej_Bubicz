// Poddziały, według których strona sortuje zadania z arkuszy CKE (w tej kolejności pokazuje przyciski).
// W nawiasie: wymagania z podstawy programowej, które zwykle do nich trafiają.
export const TEMATY = {
  liczby: [
    { id: "liczby-rzeczywiste", nazwa: "Liczby rzeczywiste" },     // I: przedziały, przybliżenia, wartość bezwzględna liczby
    { id: "zbiory", nazwa: "Zbiory i działania na zbiorach" },    // LO kl. 1: zbiory, przedziały, dopełnienie
    { id: "potegi", nazwa: "Potęgi" },                             // I.4, I.5
    { id: "pierwiastki", nazwa: "Pierwiastki" },                   // I.3, I.4
    { id: "logarytmy", nazwa: "Logarytmy" },                       // I.1 (logarytmowanie), I.6
    { id: "procenty", nazwa: "Procenty" },                         // I.8, I.9
    { id: "wyrazenia", nazwa: "Wyrażenia algebraiczne" },          // II
    { id: "rownania", nazwa: "Równania" },                         // III (równania)
    { id: "uklady-rownan", nazwa: "Układy równań liniowych" },      // LO kl. 1: układy, interpretacja graficzna
    { id: "nierownosci", nazwa: "Nierówności" },                 // III (nierówności), |x − a| < b
  ],
  funkcje: [
    { id: "wlasnosci-funkcji", nazwa: "Własności funkcji" },       // V.1–V.4: dziedzina, wykres, monotoniczność
    { id: "funkcja-liniowa", nazwa: "Funkcja liniowa" },           // V.5, V.6
    { id: "funkcja-kwadratowa", nazwa: "Funkcja kwadratowa" },     // V.7–V.10
    { id: "inne-funkcje", nazwa: "Inne funkcje" },                 // wykładnicza, proporcjonalność odwrotna
    { id: "wzor-ogolny", nazwa: "Wzór ogólny ciągu" },             // VI.1, VI.2
    { id: "ciag-arytmetyczny", nazwa: "Ciąg arytmetyczny" },       // VI.3, VI.4
    { id: "ciag-geometryczny", nazwa: "Ciąg geometryczny" },       // VI.5, VI.6
  ],
  geometria: [
    { id: "trygonometria", nazwa: "Trygonometria" },               // VII
    { id: "planimetria", nazwa: "Planimetria" },                   // VIII
    { id: "geometria-analityczna", nazwa: "Geometria analityczna" }, // IX
    { id: "stereometria", nazwa: "Stereometria" },                 // X
  ],
  statystyka: [
    { id: "kombinatoryka", nazwa: "Kombinatoryka" },               // XI
    { id: "prawdopodobienstwo", nazwa: "Prawdopodobieństwo" },     // XII (prawdopodobieństwo)
    { id: "statystyka", nazwa: "Statystyka" },                     // XII (średnia, mediana, odchylenie)
  ],
  dowody: [
    { id: "dowody-algebraiczne", nazwa: "Dowody algebraiczne" },
    { id: "dowody-geometryczne", nazwa: "Dowody geometryczne" },
    { id: "optymalizacja", nazwa: "Optymalizacja" },
  ],
  tekstowe: [
    { id: "ruch-i-praca", nazwa: "Ruch i wspólna praca" },
    { id: "procenty-i-pieniadze", nazwa: "Procenty i pieniądze" },
    { id: "rownania-z-tresci", nazwa: "Równania z treści" },
    { id: "ciagi-w-praktyce", nazwa: "Ciągi w praktyce" },
  ],

  // Egzamin ósmoklasisty (działy z przedrostkiem e8-). Podstawy to arytmetyka spoza arkuszy: wzory i generatory.
  "e8-podstawy": [
    { id: "dodawanie-odejmowanie", nazwa: "Dodawanie i odejmowanie pisemne" },
    { id: "mnozenie", nazwa: "Mnożenie pisemne" },
    { id: "dzielenie", nazwa: "Dzielenie pisemne" },
    { id: "kolejnosc-dzialan", nazwa: "Kolejność działań" },
    { id: "liczby-ujemne", nazwa: "Liczby ujemne" },
    { id: "podzielnosc", nazwa: "Podzielność, NWD i NWW" },
    { id: "ulamki-zwykle", nazwa: "Ułamki: skracanie i wspólny mianownik" },
    { id: "mnozenie-ulamkow", nazwa: "Mnożenie i dzielenie ułamków" },
    { id: "ulamki-dziesietne", nazwa: "Ułamki dziesiętne" },
  ],
  "e8-liczby": [
    { id: "systemy-zapisu", nazwa: "System dziesiętny i rzymski" },          // wartość pozycyjna, liczby rzymskie
    { id: "os-liczbowa", nazwa: "Oś liczbowa i porównywanie" },             // ułamki i ujemne na osi, porównywanie, odległość
    { id: "ulamki-i-rozwiniecia", nazwa: "Ułamki i rozwinięcia dziesiętne" }, // okresowe, zamiana, wartość wyrażeń z ułamkami
    { id: "dzielniki", nazwa: "Dzielniki, wielokrotności i liczby pierwsze" },
    { id: "zaokraglanie", nazwa: "Zaokrąglanie i szacowanie" },
    { id: "potegi", nazwa: "Potęgi" },                                      // działania na potęgach, notacja wykładnicza
    { id: "pierwiastki", nazwa: "Pierwiastki" },                            // kwadratowe i sześcienne, szacowanie, wyłączanie czynnika
  ],
  "e8-wyrazenia": [
    { id: "zapisywanie-wyrazen", nazwa: "Zapisywanie wyrażeń" },            // wyrażenie z treści: o 3 więcej, 2 razy mniej, kolejne liczby
    { id: "wartosc-wyrazenia", nazwa: "Wartość wyrażenia" },                // podstawianie liczb, także ujemnych i ułamków
    { id: "przeksztalcanie", nazwa: "Upraszczanie i mnożenie wyrażeń" },    // wyrazy podobne, nawiasy, mnożenie sum, wyłączanie przed nawias
    { id: "rownania", nazwa: "Równania" },                                  // rozwiązywanie i sprawdzanie, nawiasy, ułamki
    { id: "zadania-z-rownaniem", nazwa: "Zadania tekstowe z równaniem" },   // wiek, liczby, pieniądze, układanie równania
    { id: "przeksztalcanie-wzorow", nazwa: "Przekształcanie wzorów" },      // wyznaczanie zmiennej, np. a z L = 2a + 2b
    { id: "proporcje", nazwa: "Proporcje i proporcjonalność prosta" },      // proporcja, wielkości wprost proporcjonalne
  ],
  "e8-procenty": [
    { id: "procent-liczby", nazwa: "Procent liczby i jakim procentem jest" }, // p% z liczby, jakim procentem a jest b
    { id: "liczba-z-procentu", nazwa: "Liczba z danego procentu" },          // 30% liczby to 12 – jaka to liczba
    { id: "podwyzki-obnizki", nazwa: "Podwyżki, obniżki i punkty procentowe" }, // zmiany cen, kolejne zmiany, lokaty, punkty procentowe
    { id: "pieniadze", nazwa: "Zakupy i pieniądze" },                        // ceny, reszta, cena za sztukę/kg, opłacalność
    { id: "predkosc", nazwa: "Prędkość, droga i czas" },                    // s = v·t, km/h i m/s, średnia prędkość
    { id: "jednostki", nazwa: "Jednostki miary" },                          // długość, masa, pole, objętość, litry
    { id: "skala", nazwa: "Skala i plan" },                                 // skala mapy, odległości na planie
    { id: "czas-kalendarz", nazwa: "Czas, zegar i kalendarz" },             // godziny i minuty, daty, dni tygodnia, lata przestępne
  ],
  "e8-figury": [
    { id: "katy", nazwa: "Kąty" },                                          // przyległe, wierzchołkowe, przy prostych równoległych
    { id: "trojkaty", nazwa: "Trójkąty" },                                  // suma kątów, rodzaje, nierówność trójkąta, przystawanie
    { id: "czworokaty", nazwa: "Czworokąty i wielokąty" },                  // własności czworokątów, kąty, wielokąty foremne
    { id: "pola-obwody", nazwa: "Pola i obwody" },                          // wielokąty, figury złożone, jednostki pola
    { id: "pitagoras", nazwa: "Twierdzenie Pitagorasa" },                   // przekątna kwadratu, wysokość trójkąta równobocznego, 30-60-90
    { id: "uklad-wspolrzednych", nazwa: "Układ współrzędnych" },            // punkty, odcinki, środek i długość odcinka, figury w układzie
    { id: "symetrie", nazwa: "Symetrie" },                                  // osiowa i środkowa, osie symetrii figur
  ],
  "e8-bryly": [
    { id: "graniastoslupy", nazwa: "Graniastosłupy" },                      // rodzaje, ściany, krawędzie, wierzchołki, sześcian i prostopadłościan
    { id: "ostroslupy", nazwa: "Ostrosłupy" },                              // rodzaje, ściany boczne, krawędzie, wysokość
    { id: "siatki", nazwa: "Siatki brył" },                                 // rozpoznawanie siatek, sklejanie, które ściany się stykają
    { id: "pole-powierzchni", nazwa: "Pole powierzchni" },                  // pole podstawy i pole boczne, sumy ścian
    { id: "objetosc", nazwa: "Objętość" },                                  // V = Pp · H, ostrosłup 1/3, jednostki i litry
    { id: "przekatne-wysokosci", nazwa: "Przekątne i wysokości w bryłach" }, // Pitagoras w bryłach: przekątna, wysokość ściany bocznej
  ],
  "e8-dane": [
    { id: "odczytywanie-danych", nazwa: "Tabele, diagramy i wykresy" },     // odczyt z tabel, diagramów słupkowych i kołowych, wykresów zależności
    { id: "srednia", nazwa: "Średnia arytmetyczna" },                       // średnia, brakująca liczba, zmiana średniej
    { id: "zliczanie", nazwa: "Zliczanie możliwości" },                     // wypisywanie, reguła mnożenia, ile liczb, ile par
    { id: "prawdopodobienstwo", nazwa: "Prawdopodobieństwo" },              // kostka, monety, losowanie kul i kart
  ],
};
