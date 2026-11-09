// Zadania do ćwiczeń – Figury płaskie (szkoła podstawowa, klasy 4–8): proste i odcinki, mierzenie kątów, koło i okrąg,
// wysokości trójkąta i równoległoboku, proste dowody. Ułożone dla strony. Format jak arkusz (tools/test-arkusze.mjs).
export default {
  nazwa: "Zadania do ćwiczeń – Figury płaskie",
  zadania: [
    // ---- proste, półproste i odcinki ----
    {
      nr: "1", dzial: "e8-figury", temat: "proste-odcinki",
      tresc: "Punkty $A$, $B$, $C$ leżą na jednej prostej, przy czym punkt $B$ leży między $A$ i $C$. Wiadomo, że $|AB| = 4{,}5$ cm i $|BC| = 38$ mm. Długość odcinka $AC$ jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$42{,}5$ cm", "$7{,}3$ cm", "$8{,}3$ cm", "$8{,}03$ cm"],
      poprawna: 2,
    },
    {
      nr: "2", dzial: "e8-figury", temat: "proste-odcinki",
      tresc: "Na kartce narysowano trzy proste: $k$, $l$ i $m$. Proste $k$ i $l$ są prostopadłe do prostej $m$. Wynika z tego, że proste $k$ i $l$ są. **Wybierz właściwą odpowiedź.**",
      opcje: ["prostopadłe do siebie", "równoległe do siebie", "nachylone do siebie pod kątem $45^\\circ$", "takie same (leżą na sobie)"],
      poprawna: 1,
    },
    {
      nr: "3", dzial: "e8-figury", temat: "proste-odcinki",
      tresc: "Łamana $ABCD$ składa się z trzech odcinków: $|AB| = 3{,}5$ cm, $|BC| = 42$ mm i $|CD| = 2$ cm $8$ mm. Długość tej łamanej jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$9{,}5$ cm", "$10{,}05$ cm", "$105$ cm", "$10{,}5$ cm"],
      poprawna: 3,
    },
    // ---- kąty: mierzenie i szacowanie ----
    {
      nr: "8", dzial: "e8-figury", temat: "katy",
      tresc: "Kątomierz przyłożono do kąta $ABC$ tak, że jego środek leży w wierzchołku $B$, a ramię $BA$ leży na dolnej krawędzi kątomierza i przechodzi przez zero skali zewnętrznej (po prawej stronie) – zobacz rysunek.\n\n[rysunek]\n\nMiara kąta $ABC$ jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$130^\\circ$", "$40^\\circ$", "$140^\\circ$", "$50^\\circ$"],
      poprawna: 3,
      rysunek: "assets/zadania/rys/e8-figury-8.svg",
    },
    {
      nr: "9", dzial: "e8-figury", temat: "katy",
      tresc: "Kąt $PQR$ jest rozwarty i niewiele mniejszy od kąta półpełnego. Miara tego kąta może wynosić. **Wybierz właściwą odpowiedź.**",
      opcje: ["$20^\\circ$", "$90^\\circ$", "$170^\\circ$", "$190^\\circ$"],
      poprawna: 2,
    },
    // ---- koło i okrąg ----
    {
      nr: "12", dzial: "e8-figury", temat: "kola-i-okregi",
      tresc: "Okrąg ma promień $6$ cm. Długość tego okręgu jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$6\\pi$ cm", "$12\\pi$ cm", "$36\\pi$ cm", "$24\\pi$ cm"],
      poprawna: 1,
    },
    {
      nr: "13", dzial: "e8-figury", temat: "kola-i-okregi",
      tresc: "Średnica koła ma $10$ cm. Pole tego koła jest równe. **Wybierz właściwą odpowiedź.**",
      opcje: ["$100\\pi\\ \\text{cm}^2$", "$10\\pi\\ \\text{cm}^2$", "$5\\pi\\ \\text{cm}^2$", "$25\\pi\\ \\text{cm}^2$"],
      poprawna: 3,
    },
    {
      nr: "14", dzial: "e8-figury", temat: "kola-i-okregi",
      tresc: "Obwód koła jest równy $31{,}4$ cm. Przyjmij, że $\\pi \\approx 3{,}14$. Promień tego koła ma długość. **Wybierz właściwą odpowiedź.**",
      opcje: ["$5$ cm", "$10$ cm", "$2{,}5$ cm", "$15{,}7$ cm"],
      poprawna: 0,
    },
    {
      nr: "15", dzial: "e8-figury", temat: "kola-i-okregi",
      tresc: "Okrąg ma promień $9$ cm. Które z podanych długości może mieć cięciwa tego okręgu? **Wybierz właściwą odpowiedź.**",
      opcje: ["$19$ cm", "$20$ cm", "$17{,}5$ cm", "$18{,}5$ cm"],
      poprawna: 2,
    },
    {
      nr: "16", dzial: "e8-figury", temat: "kola-i-okregi",
      tresc: "W kwadracie o boku $8$ cm narysowano koło, które dotyka wszystkich czterech boków kwadratu. Zacieniowano część kwadratu leżącą poza kołem – zobacz rysunek.\n\n[rysunek]\n\nPole zacieniowanej części jest równe. **Wybierz właściwą odpowiedź.**",
      opcje: ["$(64 - 4\\pi)\\ \\text{cm}^2$", "$(64 - 16\\pi)\\ \\text{cm}^2$", "$(64 - 8\\pi)\\ \\text{cm}^2$", "$(64 - 64\\pi)\\ \\text{cm}^2$"],
      poprawna: 1,
      rysunek: "assets/zadania/rys/e8-figury-16.svg",
    },
    // ---- wysokości ----
    {
      nr: "23", dzial: "e8-figury", temat: "trojkaty",
      tresc: "W trójkącie $ABC$ kąt przy wierzchołku $A$ jest rozwarty. Wysokość tego trójkąta poprowadzona z wierzchołka $C$ na bok $AB$. **Wybierz właściwą odpowiedź.**",
      opcje: ["leży wewnątrz trójkąta", "jest równa bokowi $AC$", "leży poza trójkątem i dochodzi do przedłużenia boku $AB$ za punktem $A$", "pokrywa się z bokiem $BC$"],
      poprawna: 2,
    },
    {
      nr: "25", dzial: "e8-figury", temat: "pola-obwody",
      tresc: "Trójkąt prostokątny ma przyprostokątne długości $6$ cm i $8$ cm oraz przeciwprostokątną $10$ cm. Wysokość tego trójkąta opuszczona na przeciwprostokątną ma długość. **Wybierz właściwą odpowiedź.**",
      opcje: ["$4{,}8$ cm", "$5$ cm", "$7$ cm", "$2{,}4$ cm"],
      poprawna: 0,
    },
    // ---- symetralna odcinka i dwusieczna kąta ----
    {
      nr: "30", dzial: "e8-figury", temat: "symetralna-dwusieczna",
      tresc: "Punkt $P$ leży na symetralnej odcinka $AB$. Wiadomo, że $|AB| = 10$ cm i $|PA| = 7$ cm. Długość odcinka $PB$ jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$5$ cm", "$10$ cm", "$3$ cm", "$7$ cm"],
      poprawna: 3,
    },
    // ---- symetrie ----
    {
      nr: "33", dzial: "e8-figury", temat: "symetrie",
      tresc: "Która z tych figur ma dokładnie jedną oś symetrii? **Wybierz właściwą odpowiedź.**",
      opcje: ["prostokąt, który nie jest kwadratem", "romb, który nie jest kwadratem", "trapez równoramienny, który nie jest równoległobokiem", "trójkąt równoboczny"],
      poprawna: 2,
    },
    {
      nr: "34", dzial: "e8-figury", temat: "symetrie",
      tresc: "Punkt $P = (-3, 4)$ odbito symetrycznie względem początku układu współrzędnych. Jakie współrzędne ma obraz tego punktu? **Wybierz właściwą odpowiedź.**",
      opcje: ["$(-3, -4)$", "$(3, 4)$", "$(4, -3)$", "$(3, -4)$"],
      poprawna: 3,
    },
  ],
  otwarte: [
    // ---- proste, półproste i odcinki ----
    {
      nr: "4", dzial: "e8-figury", temat: "proste-odcinki", punkty: 2,
      tresc: "Prostokąt $ABCD$ ma boki $|AB| = 9$ cm i $|BC| = 4$ cm. Podaj odległość punktu $D$ od prostej $AB$ oraz odległość punktu $A$ od prostej $BC$. **Uzasadnij odpowiedź.**",
      rozwiazanie: "Odległość punktu od prostej to długość odcinka poprowadzonego z tego punktu prostopadle do prostej.\n\nW prostokącie boki $AD$ i $AB$ są prostopadłe, więc odcinek $DA$ jest prostopadły do prostej $AB$. Odległość punktu $D$ od prostej $AB$ to więc $|AD|$. Przeciwległe boki prostokąta są równe, więc $|AD| = |BC| = 4$ cm.\n\nBoki $AB$ i $BC$ też są prostopadłe, więc odcinek $AB$ jest prostopadły do prostej $BC$. Odległość punktu $A$ od prostej $BC$ to więc $|AB| = 9$ cm.\n\nOdpowiedź: Punkt $D$ jest oddalony od prostej $AB$ o $4$ cm, a punkt $A$ od prostej $BC$ o $9$ cm.",
    },
    {
      nr: "5", dzial: "e8-figury", temat: "proste-odcinki", punkty: 2,
      tresc: "Łamana $ABCD$ ma trzy odcinki. Odcinek $AB$ ma $12$ cm, odcinek $BC$ jest o $6$ cm dłuższy od $AB$, a odcinek $CD$ ma $0{,}25$ m. Oblicz długość łamanej $ABCD$. Podaj wynik w centymetrach i w decymetrach. **Zapisz obliczenia.**",
      rozwiazanie: "Odcinek $BC$ ma $12 + 6 = 18$ cm.\n\nOdcinek $CD$ ma $0{,}25$ m $= 25$ cm.\n\nDługość łamanej to suma długości jej odcinków: $12 + 18 + 25 = 55$ cm.\n\nPonieważ $1$ dm $= 10$ cm, to $55$ cm $= 5{,}5$ dm.\n\nOdpowiedź: Łamana ma $55$ cm, czyli $5{,}5$ dm.",
    },
    {
      nr: "6", dzial: "e8-figury", temat: "proste-odcinki", punkty: 2,
      tresc: "Punkt $C$ leży na odcinku $AB$, przy czym $|AB| = 14$ cm, a odcinek $AC$ jest trzy razy dłuższy od odcinka $CB$. Oblicz długość odcinka $AC$. **Zapisz obliczenia.**",
      rozwiazanie: "Niech $|CB| = x$. Wtedy $|AC| = 3x$.\n\nPunkt $C$ leży na odcinku $AB$, więc $|AC| + |CB| = |AB|$, czyli $3x + x = 14$.\n\nStąd $4x = 14$, więc $x = 14 : 4 = 3{,}5$ cm.\n\nOdcinek $AC$ ma $3 \\cdot 3{,}5 = 10{,}5$ cm. Sprawdzenie: $10{,}5 + 3{,}5 = 14$.\n\nOdpowiedź: $|AC| = 10{,}5$ cm.",
    },
    {
      nr: "7", dzial: "e8-figury", temat: "proste-odcinki", punkty: 2,
      tresc: "Punkt $P$ leży poza prostą $k$. Opisz, jak za pomocą ekierki i linijki narysować przez punkt $P$ prostą równoległą do prostej $k$. **Zapisz kolejne kroki.**",
      rozwiazanie: "Krok 1. Przyłóż jedną krawędź ekierki do prostej $k$.\n\nKrok 2. Do drugiej krawędzi ekierki przyłóż linijkę i mocno ją przytrzymaj, żeby się nie ruszała.\n\nKrok 3. Sunąc ekierkę po linijce (nie obracając jej), przesuń ją tak, żeby ta krawędź, która leżała na prostej $k$, dotknęła punktu $P$.\n\nKrok 4. Narysuj prostą wzdłuż tej krawędzi, przez punkt $P$. Ekierka tylko przesunęła się po linijce, a nie obróciła, więc narysowana prosta jest równoległa do prostej $k$.\n\nOdpowiedź: Prostą równoległą rysujemy, przesuwając ekierkę po linijce od prostej $k$ do punktu $P$.",
    },
    // ---- kąty: rysowanie i zapis ----
    {
      nr: "10", dzial: "e8-figury", temat: "katy", punkty: 2,
      tresc: "Opisz, jak narysować kątomierzem kąt $KLM$ o mierze $65^\\circ$. **Zapisz kolejne kroki.**",
      rozwiazanie: "Krok 1. Narysuj linijką ramię $LK$ i zaznacz wierzchołek $L$ (litera środkowa w zapisie $\\angle KLM$ oznacza wierzchołek).\n\nKrok 2. Połóż kątomierz tak, żeby jego środek leżał dokładnie w punkcie $L$, a dolna krawędź kątomierza leżała na ramieniu $LK$ i zero skali było na tym ramieniu.\n\nKrok 3. Znajdź na skali, która zaczyna się od zera na ramieniu $LK$, liczbę $65$ i postaw tam kropkę $M$.\n\nKrok 4. Zdejmij kątomierz i poprowadź linijką ramię $LM$ z punktu $L$ przez kropkę $M$. Kąt $KLM$ ma wtedy miarę $65^\\circ$ (jest ostry, więc sprawdzenie okiem się zgadza).\n\nOdpowiedź: Kąt rysujemy, ustawiając środek kątomierza w wierzchołku i zero na pierwszym ramieniu, a drugie ramię prowadzimy przez kropkę przy liczbie $65$.",
    },
    {
      nr: "11", dzial: "e8-figury", temat: "katy", punkty: 2,
      tresc: "Kąt $ABC$ ma miarę $72^\\circ$. Półprosta $BD$ leży wewnątrz tego kąta i dzieli go na dwa kąty: kąt $ABD$ jest dwa razy większy od kąta $DBC$. Oblicz miary kątów $ABD$ i $DBC$. **Zapisz obliczenia.**",
      rozwiazanie: "Niech $|\\angle DBC| = x$. Wtedy $|\\angle ABD| = 2x$.\n\nPółprosta $BD$ leży wewnątrz kąta $ABC$, więc $|\\angle ABD| + |\\angle DBC| = |\\angle ABC|$, czyli $2x + x = 72^\\circ$.\n\nStąd $3x = 72^\\circ$, więc $x = 24^\\circ$.\n\nZatem $|\\angle DBC| = 24^\\circ$ i $|\\angle ABD| = 2 \\cdot 24^\\circ = 48^\\circ$. Sprawdzenie: $48^\\circ + 24^\\circ = 72^\\circ$.\n\nOdpowiedź: $|\\angle ABD| = 48^\\circ$, $|\\angle DBC| = 24^\\circ$.",
    },
    // ---- koło i okrąg ----
    {
      nr: "17", dzial: "e8-figury", temat: "kola-i-okregi", punkty: 2,
      tresc: "Obwód koła jest równy $18\\pi$ cm. Oblicz pole tego koła. Wynik zapisz w postaci wielokrotności liczby $\\pi$. **Zapisz obliczenia.**",
      rozwiazanie: "Obwód koła to $2\\pi r$, więc $2\\pi r = 18\\pi$.\n\nDzielimy obie strony przez $2\\pi$ i dostajemy $r = 9$ cm.\n\nPole koła to $\\pi r^2 = \\pi \\cdot 9^2 = 81\\pi$ cm$^2$.\n\nOdpowiedź: Pole koła jest równe $81\\pi\\ \\text{cm}^2$.",
    },
    {
      nr: "18", dzial: "e8-figury", temat: "kola-i-okregi", punkty: 2,
      tresc: "Okrągły klomb ma średnicę $6$ m. Ogrodnik chce obwiązać jego brzeg taśmą i obsiać klomb trawą. Oblicz, ile metrów taśmy potrzeba (bez zapasu) i ile metrów kwadratowych trawy zostanie zasiane. Przyjmij, że $\\pi \\approx 3{,}14$. **Zapisz obliczenia.**",
      rozwiazanie: "Średnica klombu to $6$ m, więc promień ma $6 : 2 = 3$ m.\n\nDługość brzegu (potrzebnej taśmy): $L = \\pi d \\approx 3{,}14 \\cdot 6 = 18{,}84$ m.\n\nPole klombu: $P = \\pi r^2 \\approx 3{,}14 \\cdot 3^2 = 3{,}14 \\cdot 9 = 28{,}26\\ \\text{m}^2$.\n\nOdpowiedź: Potrzeba około $18{,}84$ m taśmy, a trawą obsiejemy około $28{,}26\\ \\text{m}^2$.",
    },
    {
      nr: "19", dzial: "e8-figury", temat: "kola-i-okregi", punkty: 3,
      tresc: "Bieżnia ma kształt prostokąta o wymiarach $12$ m na $8$ m, do którego krótszych boków dołączono po jednym półkolu o średnicy $8$ m (półkola leżą na zewnątrz prostokąta). Oblicz obwód i pole tej bieżni. Wyniki zapisz w postaci sum z liczbą $\\pi$. **Zapisz obliczenia.**",
      rozwiazanie: "Średnica każdego półkola to $8$ m, więc promień ma $4$ m. Dwa półkola o tym samym promieniu razem tworzą koło o promieniu $4$ m.\n\nObwód bieżni to dwa dłuższe boki prostokąta i dwa łuki (krótszych boków prostokąta nie liczymy, bo przy nich doklejono półkola). Dwa łuki razem mają długość okręgu: $2\\pi \\cdot 4 = 8\\pi$ m. Zatem obwód to $2 \\cdot 12 + 8\\pi = 24 + 8\\pi$ m.\n\nPole prostokąta: $12 \\cdot 8 = 96\\ \\text{m}^2$. Pole dwóch półkoli (jednego koła): $\\pi \\cdot 4^2 = 16\\pi\\ \\text{m}^2$.\n\nPole bieżni: $96 + 16\\pi\\ \\text{m}^2$.\n\nOdpowiedź: Obwód jest równy $(24 + 8\\pi)$ m, a pole $(96 + 16\\pi)\\ \\text{m}^2$.",
    },
    {
      nr: "20", dzial: "e8-figury", temat: "kola-i-okregi", punkty: 2,
      tresc: "Obwód kwadratu jest równy $40$ cm. W ten kwadrat wpisano koło, które dotyka wszystkich boków kwadratu. Oblicz pole części kwadratu leżącej poza kołem. Przyjmij, że $\\pi \\approx 3{,}14$. **Zapisz obliczenia.**",
      rozwiazanie: "Bok kwadratu ma $40 : 4 = 10$ cm, więc pole kwadratu to $10 \\cdot 10 = 100\\ \\text{cm}^2$.\n\nKoło dotyka boków kwadratu, więc jego średnica jest równa bokowi kwadratu: $d = 10$ cm, a promień $r = 5$ cm.\n\nPole koła: $\\pi r^2 \\approx 3{,}14 \\cdot 25 = 78{,}5\\ \\text{cm}^2$.\n\nPole części poza kołem: $100 - 78{,}5 = 21{,}5\\ \\text{cm}^2$.\n\nOdpowiedź: Pole części kwadratu poza kołem jest równe około $21{,}5\\ \\text{cm}^2$.",
    },
    {
      nr: "21", dzial: "e8-figury", temat: "kola-i-okregi", punkty: 2,
      tresc: "Ćwierć koła ma promień $12$ cm. Oblicz pole i obwód tej figury. Wyniki zapisz w postaci wielokrotności albo sumy z liczbą $\\pi$. **Zapisz obliczenia.**",
      rozwiazanie: "Cały okrąg o promieniu $12$ cm miałby długość $2\\pi \\cdot 12 = 24\\pi$ cm, a całe koło pole $\\pi \\cdot 12^2 = 144\\pi\\ \\text{cm}^2$. Ćwierć koła to jedna czwarta tych wartości.\n\nPole: $144\\pi : 4 = 36\\pi\\ \\text{cm}^2$.\n\nŁuk: $24\\pi : 4 = 6\\pi$ cm.\n\nObwód figury to łuk i dwa promienie (dwa proste brzegi): $6\\pi + 12 + 12 = 24 + 6\\pi$ cm.\n\nOdpowiedź: Pole jest równe $36\\pi\\ \\text{cm}^2$, a obwód $(24 + 6\\pi)$ cm.",
    },
    {
      nr: "22", dzial: "e8-figury", temat: "kola-i-okregi", punkty: 2,
      tresc: "Promień koła wynosi $2$ cm. Promień zwiększono trzy razy. Oblicz, ile razy zwiększyło się pole koła i ile razy zwiększyła się jego długość okręgu. Wyniki zapisz, zostawiając $\\pi$. **Zapisz obliczenia.**",
      rozwiazanie: "Koło o promieniu $2$ cm: pole $\\pi \\cdot 2^2 = 4\\pi\\ \\text{cm}^2$, długość okręgu $2\\pi \\cdot 2 = 4\\pi$ cm.\n\nPo trzykrotnym zwiększeniu promień ma $3 \\cdot 2 = 6$ cm. Pole to $\\pi \\cdot 6^2 = 36\\pi\\ \\text{cm}^2$, a długość okręgu $2\\pi \\cdot 6 = 12\\pi$ cm.\n\nPole wzrosło $36\\pi : 4\\pi = 9$ razy, a długość okręgu $12\\pi : 4\\pi = 3$ razy.\n\nOdpowiedź: Pole zwiększyło się $9$ razy, a długość okręgu $3$ razy.",
    },
    // ---- wysokość równoległoboku ----
    {
      nr: "24", dzial: "e8-figury", temat: "pola-obwody", punkty: 2,
      tresc: "Boki równoległoboku mają długości $10$ cm i $6$ cm. Wysokość opuszczona na bok długości $10$ cm ma $4{,}5$ cm. Oblicz pole tego równoległoboku oraz wysokość opuszczoną na bok długości $6$ cm. **Zapisz obliczenia.**",
      rozwiazanie: "Pole równoległoboku to podstawa razy wysokość opuszczona na tę podstawę. Dla podstawy $10$ cm: $P = 10 \\cdot 4{,}5 = 45\\ \\text{cm}^2$.\n\nTo samo pole policzone z drugiej pary: $P = 6 \\cdot h$, gdzie $h$ to wysokość opuszczona na bok $6$ cm. Stąd $6h = 45$, więc $h = 45 : 6 = 7{,}5$ cm.\n\nSprawdzenie: krótszy bok ma dłuższą wysokość, a $6 \\cdot 7{,}5 = 45$.\n\nOdpowiedź: Pole jest równe $45\\ \\text{cm}^2$, a wysokość opuszczona na bok $6$ cm ma $7{,}5$ cm.",
    },
    // ---- proste dowody ----
    {
      nr: "26", dzial: "e8-figury", temat: "dowody-w-geometrii", punkty: 2,
      tresc: "Kąty $\\alpha$ i $\\beta$ są kątami trójkąta $ABC$ przy wierzchołkach $A$ i $B$. Kąt $\\delta$ jest kątem zewnętrznym tego trójkąta przy wierzchołku $C$ (przylega do kąta $\\gamma$ trójkąta). **Uzasadnij, że** $\\delta = \\alpha + \\beta$.",
      rozwiazanie: "Założenie: $\\alpha$, $\\beta$, $\\gamma$ są kątami trójkąta $ABC$, a $\\delta$ jest kątem zewnętrznym przy wierzchołku $C$.\n\nTeza: $\\delta = \\alpha + \\beta$.\n\nSuma kątów trójkąta wynosi $180^\\circ$, więc $\\alpha + \\beta + \\gamma = 180^\\circ$. Stąd $\\alpha + \\beta = 180^\\circ - \\gamma$.\n\nKąty $\\gamma$ i $\\delta$ są przyległe (leżą na jednej prostej), więc $\\gamma + \\delta = 180^\\circ$. Stąd $\\delta = 180^\\circ - \\gamma$.\n\nObie liczby $\\alpha + \\beta$ i $\\delta$ są równe $180^\\circ - \\gamma$, więc $\\delta = \\alpha + \\beta$, co należało wykazać.",
    },
    {
      nr: "27", dzial: "e8-figury", temat: "dowody-w-geometrii", punkty: 2,
      tresc: "Trójkąt $ABC$ jest równoramienny, a jego ramiona to $AC$ i $BC$. Kąt przy podstawie $AB$ ma miarę $\\alpha$. Kąt zewnętrzny tego trójkąta przy wierzchołku $C$ oznaczono $\\delta$. **Uzasadnij, że** $\\delta = 2\\alpha$.",
      rozwiazanie: "Założenie: $AC = BC$, kąt przy $A$ ma miarę $\\alpha$, $\\delta$ jest kątem zewnętrznym przy $C$.\n\nTeza: $\\delta = 2\\alpha$.\n\nTrójkąt jest równoramienny, więc kąty przy podstawie są równe: kąt przy $B$ też ma miarę $\\alpha$.\n\nKąt trójkąta przy wierzchołku $C$ ma miarę $\\gamma = 180^\\circ - \\alpha - \\alpha = 180^\\circ - 2\\alpha$ (suma kątów trójkąta wynosi $180^\\circ$).\n\nKąt zewnętrzny $\\delta$ jest przyległy do kąta $\\gamma$, więc $\\delta = 180^\\circ - \\gamma = 180^\\circ - (180^\\circ - 2\\alpha) = 2\\alpha$, co należało wykazać.",
    },
    {
      nr: "28", dzial: "e8-figury", temat: "dowody-w-geometrii", punkty: 3,
      tresc: "Dany jest kwadrat $ABCD$. Punkt $E$ leży na boku $AB$, a punkt $F$ leży na boku $BC$, przy czym $|AE| = |BF|$. **Uzasadnij, że** $|DE| = |AF|$.",
      rozwiazanie: "Założenie: $ABCD$ jest kwadratem, $E$ leży na $AB$, $F$ leży na $BC$, $|AE| = |BF|$.\n\nTeza: $|DE| = |AF|$.\n\nRozważmy trójkąty $DAE$ i $ABF$. Porównujemy je tak: $D \\to A$, $A \\to B$, $E \\to F$.\n\n$|DA| = |AB|$, bo to boki kwadratu.\n\n$|AE| = |BF|$ z założenia.\n\nKąty między tymi bokami: $\\angle DAE = 90^\\circ$ i $\\angle ABF = 90^\\circ$, bo to kąty kwadratu.\n\nTrójkąty $DAE$ i $ABF$ mają więc dwa równe boki i równy kąt między nimi, czyli są przystające (cecha BKB).\n\nW przystających trójkątach odpowiadające sobie boki są równe. Boki $DE$ i $AF$ leżą naprzeciw kątów prostych, więc odpowiadają sobie, zatem $|DE| = |AF|$, co należało wykazać.",
    },
    {
      nr: "29", dzial: "e8-figury", temat: "dowody-w-geometrii", punkty: 2,
      tresc: "Ola twierdzi: „Jeśli czworokąt ma wszystkie boki równe, to jest kwadratem”. Czy Ola ma rację? **Odpowiedź uzasadnij.**",
      rozwiazanie: "Ola nie ma racji. Żeby obalić zdanie ogólne, wystarczy podać jeden kontrprzykład: figurę, która spełnia założenie (ma równe boki), ale nie spełnia tezy (nie jest kwadratem).\n\nKontrprzykład: romb o boku $5$ cm i kątach $60^\\circ$ oraz $120^\\circ$.\n\nMa on cztery równe boki, więc założenie jest spełnione.\n\nNie ma jednak kątów prostych (ma kąty $60^\\circ$ i $120^\\circ$), więc nie jest kwadratem.\n\nOdpowiedź: Nie, Ola nie ma racji. Zdanie jest fałszywe, bo romb o kątach $60^\\circ$ i $120^\\circ$ ma równe boki i nie jest kwadratem.",
    },
    // ---- symetralna odcinka i dwusieczna kąta ----
    {
      nr: "31", dzial: "e8-figury", temat: "symetralna-dwusieczna", punkty: 2,
      tresc: "Kąt $ABC$ ma miarę $84^\\circ$, a półprosta $BD$ jest jego dwusieczną. Punkt $E$ leży na dwusiecznej $BD$ w odległości $5$ cm od ramienia $BA$. Oblicz miarę kąta $DBC$ i podaj, w jakiej odległości od ramienia $BC$ leży punkt $E$. **Zapisz obliczenia.**",
      rozwiazanie: "Dwusieczna dzieli kąt na dwa równe kąty, więc $\\angle DBC = 84^\\circ : 2 = 42^\\circ$.\n\nKażdy punkt dwusiecznej jest tak samo oddalony od obu ramion kąta, więc punkt $E$ jest od ramienia $BC$ w takiej samej odległości jak od ramienia $BA$, czyli $5$ cm.\n\nOdpowiedź: $\\angle DBC = 42^\\circ$, a odległość punktu $E$ od ramienia $BC$ to $5$ cm.",
    },
    {
      nr: "32", dzial: "e8-figury", temat: "symetralna-dwusieczna", punkty: 3,
      tresc: "Opisz słowami, jak za pomocą cyrkla i linijki skonstruować symetralną odcinka $AB$ o długości $6$ cm. Podaj, jaką długość ma każda z dwóch części, na które symetralna dzieli odcinek, i jaki kąt tworzy symetralna z odcinkiem $AB$. **Zapisz odpowiedź.**",
      rozwiazanie: "Konstrukcja: (1) rozstawiam cyrkiel na odległość większą niż połowa $AB$, czyli większą niż $3$ cm, np. $4$ cm.\n\n(2) Zakreślam łuk o środku w punkcie $A$ po obu stronach odcinka.\n\n(3) Nie zmieniając rozstawu cyrkla, zakreślam łuk o środku w punkcie $B$ – łuki przecinają się w dwóch punktach.\n\n(4) Przez te dwa punkty prowadzę prostą – to symetralna odcinka $AB$.\n\nSymetralna przechodzi przez środek odcinka, więc dzieli go na dwie części po $6 : 2 = 3$ cm.\n\nSymetralna jest prostopadła do odcinka, więc tworzy z nim kąt $90^\\circ$.\n\nOdpowiedź: Konstrukcja jak wyżej; każda część ma $3$ cm, a symetralna tworzy z $AB$ kąt $90^\\circ$.",
    },
    // ---- symetrie ----
    {
      nr: "35", dzial: "e8-figury", temat: "symetrie", punkty: 2,
      tresc: "W symetrii środkowej punkt $A = (-2, 1)$ przechodzi na punkt $A' = (6, 5)$. Wyznacz współrzędne środka tej symetrii. Następnie wyznacz obraz punktu $B = (0, -3)$ w tej samej symetrii. **Zapisz obliczenia.**",
      rozwiazanie: "Środek symetrii $S$ jest środkiem odcinka $AA'$, więc liczymy średnie współrzędnych.\n\n$x_S = \\frac{-2 + 6}{2} = 2$ oraz $y_S = \\frac{1 + 5}{2} = 3$. Zatem $S = (2, 3)$.\n\nPunkt $B = (0, -3)$ i jego obraz $B'$ mają ten sam środek $S$. Od $B$ do $S$ idziemy o $2$ w prawo i o $6$ w górę, więc od $S$ idziemy o tyle samo dalej: $B' = (2 + 2,\\ 3 + 6) = (4, 9)$.\n\nSprawdzenie: środek odcinka $BB'$ to $\\left(\\frac{0 + 4}{2},\\ \\frac{-3 + 9}{2}\\right) = (2, 3)$.\n\nOdpowiedź: Środek symetrii to $S = (2, 3)$, a obrazem punktu $B$ jest $B' = (4, 9)$.",
    },
    {
      nr: "36", dzial: "e8-figury", temat: "symetrie", punkty: 3,
      tresc: "Trójkąt $ABC$ ma wierzchołki $A = (1, 1)$, $B = (5, 1)$ i $C = (3, 4)$. Pokaż, że boki $AC$ i $BC$ są równej długości. Przez które punkty przechodzi oś symetrii tego trójkąta i ile osi symetrii ma ten trójkąt? Wyznacz też obraz wierzchołka $C$ w symetrii względem osi $x$. **Zapisz obliczenia.**",
      rozwiazanie: "Długości boków liczymy z twierdzenia Pitagorasa. Od $A$ do $C$ idziemy $2$ jednostki w prawo i $3$ w górę, więc $AC^{2} = 2^{2} + 3^{2} = 13$.\n\nOd $C$ do $B$ idziemy $2$ jednostki w prawo i $3$ w dół, więc też $BC^{2} = 2^{2} + 3^{2} = 13$. Zatem $AC = BC = \\sqrt{13}$ i trójkąt jest równoramienny.\n\nBok $AB$ leży poziomo i ma długość $5 - 1 = 4$, a $4 \\neq \\sqrt{13}$ (bo $4^{2} = 16$), więc trójkąt nie jest równoboczny.\n\nOś symetrii trójkąta równoramiennego przechodzi przez wierzchołek $C$ i środek podstawy $AB$, czyli przez punkt $(3, 1)$. To pionowa prosta, na której leżą wszystkie punkty o pierwszej współrzędnej $3$.\n\nTrójkąt równoramienny, który nie jest równoboczny, ma dokładnie jedną oś symetrii.\n\nW symetrii względem osi $x$ pierwsza współrzędna się nie zmienia, a druga zmienia znak: $C = (3, 4)$ przechodzi na $C' = (3, -4)$.\n\nOdpowiedź: $AC = BC = \\sqrt{13}$. Jedyna oś symetrii przechodzi przez punkty $C = (3, 4)$ i $(3, 1)$. Obrazem punktu $C$ jest $C' = (3, -4)$.",
    },
  ],
};
