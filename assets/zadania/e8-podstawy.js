// Zadania do ćwiczeń – Podstawy: działania i ułamki (szkoła podstawowa): rachunki pamięciowe i zadania tekstowe na działaniach.
// Ułożone dla strony. Format jak arkusz (opis w tools/test-arkusze.mjs).
export default {
  nazwa: "Zadania do ćwiczeń – Podstawy: działania",
  zadania: [
    // ---- rachunki pamięciowe ----
    {
      nr: "1", dzial: "e8-podstawy", temat: "rachunki-pamieciowe",
      tresc: "Wynik działania $6 \\cdot 48$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$248$", "$268$", "$288$", "$2448$"],
      poprawna: 2,
    },
    {
      nr: "2", dzial: "e8-podstawy", temat: "rachunki-pamieciowe",
      tresc: "Które działanie daje taki sam wynik jak $7 \\cdot 24$? **Wybierz właściwą odpowiedź.**",
      opcje: ["$7 \\cdot 20 + 4$", "$7 \\cdot 20 + 7 \\cdot 4$", "$7 \\cdot 2 + 7 \\cdot 4$", "$7 + 20 + 7 + 4$"],
      poprawna: 1,
    },
    {
      nr: "3", dzial: "e8-podstawy", temat: "rachunki-pamieciowe",
      tresc: "Wynik działania $45 : 0{,}1$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$4{,}5$", "$0{,}45$", "$4500$", "$450$"],
      poprawna: 3,
    },
    // ---- zadania tekstowe na działaniach ----
    {
      nr: "4", dzial: "e8-podstawy", temat: "zadania-tekstowe-dzialania",
      tresc: "Ola ma $15$ lat, a jej brat ma $5$ lat. Ola jest od brata starsza. **Wybierz właściwą odpowiedź.**",
      opcje: ["o $10$ lat i $3$ razy", "o $3$ lata i $10$ razy", "o $10$ lat i $10$ razy", "o $20$ lat i $3$ razy"],
      poprawna: 0,
    },
    {
      nr: "5", dzial: "e8-podstawy", temat: "zadania-tekstowe-dzialania",
      tresc: "Bilet normalny do kina kosztuje $18$ zł, a ulgowy jest o $6$ zł tańszy. Za $2$ bilety normalne i $3$ ulgowe zapłacimy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$54$ zł", "$90$ zł", "$72$ zł", "$60$ zł"],
      poprawna: 2,
    },
    {
      nr: "6", dzial: "e8-podstawy", temat: "zadania-tekstowe-dzialania",
      tresc: "Pomyślałem liczbę, dodałem do niej $8$, a wynik pomnożyłem przez $3$. Otrzymałem $45$. Jaką liczbę pomyślałem? **Wybierz właściwą odpowiedź.**",
      opcje: ["$15$", "$23$", "$37$", "$7$"],
      poprawna: 3,
    },
    // ---- dodawanie i odejmowanie pisemne ----
    {
      nr: "13", dzial: "e8-podstawy", temat: "dodawanie-odejmowanie",
      tresc: "Wynik dodawania $4375 + 2986$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$6261$", "$7261$", "$7351$", "$7361$"],
      poprawna: 3,
    },
    {
      nr: "14", dzial: "e8-podstawy", temat: "dodawanie-odejmowanie",
      tresc: "Wynik odejmowania $6004 - 2579$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$3535$", "$3425$", "$4435$", "$3575$"],
      poprawna: 1,
    },
    {
      nr: "15", dzial: "e8-podstawy", temat: "dodawanie-odejmowanie",
      tresc: "Na koncie pana Adama było $5200$ zł. Wpłacił $1875$ zł, a potem wypłacił $2450$ zł. Ile złotych jest teraz na koncie? **Wybierz właściwą odpowiedź.**",
      opcje: ["$4625$ zł", "$5775$ zł", "$875$ zł", "$9525$ zł"],
      poprawna: 0,
    },
    // ---- mnożenie pisemne ----
    {
      nr: "18", dzial: "e8-podstawy", temat: "mnozenie",
      tresc: "Wynik mnożenia $408 \\cdot 7$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$2806$", "$2956$", "$2856$", "$28056$"],
      poprawna: 2,
    },
    {
      nr: "19", dzial: "e8-podstawy", temat: "mnozenie",
      tresc: "Wynik mnożenia $36 \\cdot 45$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$1620$", "$324$", "$1260$", "$2160$"],
      poprawna: 0,
    },
    {
      nr: "20", dzial: "e8-podstawy", temat: "mnozenie",
      tresc: "W sali kinowej jest $28$ rzędów, a w każdym rzędzie $35$ miejsc. Ile jest miejsc w całej sali? **Wybierz właściwą odpowiedź.**",
      opcje: ["$840$", "$63$", "$1080$", "$980$"],
      poprawna: 3,
    },
    // ---- dzielenie pisemne ----
    {
      nr: "23", dzial: "e8-podstawy", temat: "dzielenie",
      tresc: "Wynik dzielenia $1836 : 6$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$36$", "$306$", "$316$", "$3006$"],
      poprawna: 1,
    },
    {
      nr: "24", dzial: "e8-podstawy", temat: "dzielenie",
      tresc: "Reszta z dzielenia liczby $2537$ przez $8$ jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$1$", "$3$", "$7$", "$317$"],
      poprawna: 0,
    },
    {
      nr: "25", dzial: "e8-podstawy", temat: "dzielenie",
      tresc: "Wynik dzielenia $1456 : 14$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$14$", "$114$", "$104$", "$1004$"],
      poprawna: 2,
    },
    // ---- kolejność działań ----
    {
      nr: "28", dzial: "e8-podstawy", temat: "kolejnosc-dzialan",
      tresc: "Wartość wyrażenia $14 + 3 \\cdot 6 - 12 : 4$ jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$5$", "$22{,}5$", "$32$", "$29$"],
      poprawna: 3,
    },
    {
      nr: "29", dzial: "e8-podstawy", temat: "kolejnosc-dzialan",
      tresc: "Wartość wyrażenia $(18 - 6) : 3 + 2^3$ jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$10$", "$216$", "$12$", "$16$"],
      poprawna: 2,
    },
    {
      nr: "30", dzial: "e8-podstawy", temat: "kolejnosc-dzialan",
      tresc: "Które wyrażenie ma wartość $20$? **Wybierz właściwą odpowiedź.**",
      opcje: ["$(2 + 3) \\cdot 6$", "$2 \\cdot 3 + 6$", "$60 : 3 + 6$", "$2 + 3 \\cdot 6$"],
      poprawna: 3,
    },
    // ---- liczby ujemne ----
    {
      nr: "33", dzial: "e8-podstawy", temat: "liczby-ujemne",
      tresc: "Liczby $-4$, $2$, $-9$, $-1$ ustawiono w kolejności od najmniejszej do największej. Którą kolejność zapisano? **Wybierz właściwą odpowiedź.**",
      opcje: ["$-1, -4, -9, 2$", "$-9, -4, -1, 2$", "$2, -1, -4, -9$", "$-9, -1, -4, 2$"],
      poprawna: 1,
    },
    {
      nr: "34", dzial: "e8-podstawy", temat: "liczby-ujemne",
      tresc: "Wartość wyrażenia $-7 + 12 - (-5)$ jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$0$", "$-14$", "$10$", "$24$"],
      poprawna: 2,
    },
    {
      nr: "35", dzial: "e8-podstawy", temat: "liczby-ujemne",
      tresc: "Rano termometr pokazywał $-6$ °C. W południe było o $11$ stopni cieplej, a wieczorem temperatura spadła o $8$ stopni w porównaniu z południem. Jaka była temperatura wieczorem? **Wybierz właściwą odpowiedź.**",
      opcje: ["$-3$ °C", "$3$ °C", "$-9$ °C", "$13$ °C"],
      poprawna: 0,
    },
    // ---- podzielność, NWD i NWW ----
    {
      nr: "38", dzial: "e8-podstawy", temat: "podzielnosc",
      tresc: "Która z liczb jest podzielna przez $9$? **Wybierz właściwą odpowiedź.**",
      opcje: ["$4135$", "$5322$", "$2718$", "$6114$"],
      poprawna: 2,
    },
    {
      nr: "39", dzial: "e8-podstawy", temat: "podzielnosc",
      tresc: "Cyfrę $a$ wstawiono w liczbie trzycyfrowej $47a$. Liczba jest podzielna przez $6$. Jaka to cyfra? **Wybierz właściwą odpowiedź.**",
      opcje: ["$1$", "$4$", "$6$", "$7$"],
      poprawna: 1,
    },
    {
      nr: "40", dzial: "e8-podstawy", temat: "podzielnosc",
      tresc: "Jaka jest najmniejsza liczba naturalna dodatnia, która dzieli się przez $12$ i przez $18$? **Wybierz właściwą odpowiedź.**",
      opcje: ["$72$", "$6$", "$216$", "$36$"],
      poprawna: 3,
    },
    // ---- ułamki zwykłe ----
    {
      nr: "43", dzial: "e8-podstawy", temat: "ulamki-zwykle",
      tresc: "Jaki ułamek otrzymamy po skróceniu ułamka $\\frac{36}{48}$ do postaci nieskracalnej? **Wybierz właściwą odpowiedź.**",
      opcje: ["$\\frac{6}{8}$", "$\\frac{3}{4}$", "$\\frac{9}{12}$", "$\\frac{2}{3}$"],
      poprawna: 1,
    },
    {
      nr: "44", dzial: "e8-podstawy", temat: "ulamki-zwykle",
      tresc: "Wynik odejmowania $\\frac{5}{6} - \\frac{3}{8}$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$\\frac{1}{24}$", "$\\frac{1}{3}$", "$\\frac{7}{24}$", "$\\frac{11}{24}$"],
      poprawna: 3,
    },
    {
      nr: "45", dzial: "e8-podstawy", temat: "ulamki-zwykle",
      tresc: "Który z ułamków jest największy? **Wybierz właściwą odpowiedź.**",
      opcje: ["$\\frac{3}{4}$", "$\\frac{2}{3}$", "$\\frac{5}{8}$", "$\\frac{7}{12}$"],
      poprawna: 0,
    },
    // ---- mnożenie i dzielenie ułamków ----
    {
      nr: "48", dzial: "e8-podstawy", temat: "mnozenie-ulamkow",
      tresc: "Wynik mnożenia $\\frac{4}{15} \\cdot \\frac{5}{8}$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$\\frac{9}{23}$", "$\\frac{32}{75}$", "$\\frac{1}{6}$", "$\\frac{1}{3}$"],
      poprawna: 2,
    },
    {
      nr: "49", dzial: "e8-podstawy", temat: "mnozenie-ulamkow",
      tresc: "Wynik dzielenia $2\\frac{1}{2} : \\frac{5}{6}$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$\\frac{25}{12}$", "$3$", "$\\frac{1}{3}$", "$\\frac{5}{12}$"],
      poprawna: 1,
    },
    {
      nr: "50", dzial: "e8-podstawy", temat: "mnozenie-ulamkow",
      tresc: "W beczce było $60$ litrów wody. Wylano $\\frac{3}{5}$ tej wody. Ile litrów wody zostało w beczce? **Wybierz właściwą odpowiedź.**",
      opcje: ["$36$ litrów", "$12$ litrów", "$100$ litrów", "$24$ litry"],
      poprawna: 3,
    },
    // ---- ułamki dziesiętne ----
    {
      nr: "53", dzial: "e8-podstawy", temat: "ulamki-dziesietne",
      tresc: "Wynik odejmowania $12{,}6 - 4{,}85$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$8{,}75$", "$8{,}25$", "$7{,}75$", "$7{,}25$"],
      poprawna: 2,
    },
    {
      nr: "54", dzial: "e8-podstawy", temat: "ulamki-dziesietne",
      tresc: "Wynik mnożenia $0{,}6 \\cdot 0{,}07$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$0{,}042$", "$0{,}42$", "$0{,}0042$", "$4{,}2$"],
      poprawna: 0,
    },
    {
      nr: "55", dzial: "e8-podstawy", temat: "ulamki-dziesietne",
      tresc: "Jak zapisać liczbę $0{,}45$ w postaci ułamka zwykłego nieskracalnego? **Wybierz właściwą odpowiedź.**",
      opcje: ["$\\frac{45}{10}$", "$\\frac{4}{5}$", "$\\frac{45}{100}$", "$\\frac{9}{20}$"],
      poprawna: 3,
    },
  ],
  otwarte: [
    // ---- rachunki pamięciowe ----
    {
      nr: "7", dzial: "e8-podstawy", temat: "rachunki-pamieciowe", punkty: 2,
      tresc: "Oblicz w pamięci, wybierając sprytny sposób (para łatwych czynników, liczba prawie okrągła, rozkład na kawałki): a) $25 \\cdot 13 \\cdot 4$, b) $6 \\cdot 99$, c) $304 : 4$. **Zapisz obliczenia.**",
      rozwiazanie: "a) Przestawiam czynniki i łączę parę, która daje okrągłą liczbę: $25 \\cdot 13 \\cdot 4 = (25 \\cdot 4) \\cdot 13 = 100 \\cdot 13 = 1300$.\n\nb) $99$ to prawie $100$: $6 \\cdot 99 = 6 \\cdot 100 - 6 \\cdot 1 = 600 - 6 = 594$.\n\nc) Rozkładam dzielną: $304 = 300 + 4$. Wtedy $300 : 4 = 75$ i $4 : 4 = 1$, razem $75 + 1 = 76$.\n\nSprawdzenie: $76 \\cdot 4 = 304$.\n\nOdpowiedź: a) $1300$, b) $594$, c) $76$.",
    },
    {
      nr: "8", dzial: "e8-podstawy", temat: "rachunki-pamieciowe", punkty: 2,
      tresc: "Kasia kupiła $7$ jednakowych kubków po $29$ zł. Oblicz w pamięci, ile zapłaciła, i opisz, jak liczysz. **Zapisz obliczenia.**",
      rozwiazanie: "$29$ zł to prawie $30$ zł, więc liczę z okrągłą liczbą i poprawiam wynik.\n\n$7 \\cdot 30 = 210$ zł.\n\nKażdy kubek kosztuje o $1$ zł mniej niż $30$ zł, więc za $7$ kubków zapłaciła o $7 \\cdot 1 = 7$ zł mniej: $210 - 7 = 203$ zł.\n\nSprawdzenie po kawałku: $7 \\cdot 20 + 7 \\cdot 9 = 140 + 63 = 203$.\n\nOdpowiedź: Kasia zapłaciła $203$ zł.",
    },
    {
      nr: "9", dzial: "e8-podstawy", temat: "rachunki-pamieciowe", punkty: 2,
      tresc: "Sześcioro dzieci podzieliło po równo pieniądze ze skarbonki: było w niej $372$ zł. Ile złotych dostało każde dziecko? Podziel w pamięci, rozkładając $372$ na łatwe kawałki. **Zapisz obliczenia.**",
      rozwiazanie: "Rozkładam $372 = 360 + 12$, bo oba kawałki dzielą się przez $6$.\n\n$360 : 6 = 60$ i $12 : 6 = 2$.\n\nRazem: $60 + 2 = 62$.\n\nSprawdzenie: $62 \\cdot 6 = 360 + 12 = 372$.\n\nOdpowiedź: Każde dziecko dostało $62$ zł.",
    },
    // ---- zadania tekstowe na działaniach ----
    {
      nr: "10", dzial: "e8-podstawy", temat: "zadania-tekstowe-dzialania", punkty: 2,
      tresc: "Dwie paczki ważą razem $14$ kg. Pierwsza paczka jest o $4$ kg cięższa od drugiej. Ile kilogramów waży każda paczka? **Zapisz obliczenia.**",
      rozwiazanie: "Rysunek: dwa odcinki, pierwszy dłuższy o $4$ kg od drugiego.\n\nGdy odejmę ten nadmiar od całości, zostaną dwie równe części: $14 - 4 = 10$ kg.\n\nJedna część to $10 : 2 = 5$ kg – tyle waży druga paczka.\n\nPierwsza paczka waży $5 + 4 = 9$ kg.\n\nSprawdzenie: $9 + 5 = 14$ i $9 - 5 = 4$.\n\nOdpowiedź: Pierwsza paczka waży $9$ kg, a druga $5$ kg.",
    },
    {
      nr: "11", dzial: "e8-podstawy", temat: "zadania-tekstowe-dzialania", punkty: 2,
      tresc: "Tomek wydał połowę swoich pieniędzy na bilet, a potem $6$ zł na lody. Zostało mu $9$ zł. Ile złotych miał Tomek na początku? **Zapisz obliczenia.**",
      rozwiazanie: "Rozwiązuję zadanie od końca i cofam działania w odwrotnej kolejności.\n\nPo kupieniu lodów zostało $9$ zł, więc przed lodami było $9 + 6 = 15$ zł.\n\nTe $15$ zł to połowa pieniędzy (druga połowa poszła na bilet), więc na początku było $15 \\cdot 2 = 30$ zł.\n\nSprawdzenie: połowa z $30$ to $15$, $30 - 15 = 15$, $15 - 6 = 9$.\n\nOdpowiedź: Tomek miał na początku $30$ zł.",
    },
    {
      nr: "12", dzial: "e8-podstawy", temat: "zadania-tekstowe-dzialania", punkty: 3,
      tresc: "W klasach IV–VI jest razem $252$ uczniów. W klasach IV uczy się $84$ uczniów, a w klasach V o $12$ uczniów więcej niż w klasach IV. Pozostali uczniowie chodzą do klas VI. Ile uczniów jest w klasach VI i o ile uczniów jest ich mniej niż w klasach V? **Zapisz obliczenia.**",
      rozwiazanie: "Dane: razem $252$, klasy IV – $84$, klasy V – o $12$ więcej niż w IV.\n\nW klasach V jest $84 + 12 = 96$ uczniów.\n\nW klasach IV i V razem jest $84 + 96 = 180$ uczniów.\n\nW klasach VI jest $252 - 180 = 72$ uczniów.\n\nO ile mniej niż w V: $96 - 72 = 24$.\n\nOdpowiedź: W klasach VI jest $72$ uczniów, czyli o $24$ mniej niż w klasach V.",
    },
    // ---- dodawanie i odejmowanie pisemne ----
    {
      nr: "16", dzial: "e8-podstawy", temat: "dodawanie-odejmowanie", punkty: 2,
      tresc: "Oblicz pisemnie: a) $7068 + 3957$, b) $9000 - 4386$. Sprawdź wyniki działaniem odwrotnym. **Zapisz obliczenia.**",
      rozwiazanie: "a) Dodaję kolumnami od prawej. Jedności: $8 + 7 = 15$ – piszę $5$, pamiętam $1$.\n\nDziesiątki: $6 + 5 + 1 = 12$ – piszę $2$, pamiętam $1$.\n\nSetki: $0 + 9 + 1 = 10$ – piszę $0$, pamiętam $1$.\n\nTysiące: $7 + 3 + 1 = 11$ – piszę $11$. Wynik: $11025$.\n\nSprawdzenie: $11025 - 3957 = 7068$.\n\nb) W liczbie $9000$ są same zera, więc pożyczam z tysięcy: z $9$ zostaje $8$, a zera zamieniają się w dziewiątki, tylko w jednościach jest $10$.\n\nJedności: $10 - 6 = 4$. Dziesiątki: $9 - 8 = 1$. Setki: $9 - 3 = 6$. Tysiące: $8 - 4 = 4$. Wynik: $4614$.\n\nSprawdzenie: $4614 + 4386 = 9000$.\n\nOdpowiedź: a) $11025$, b) $4614$.",
    },
    {
      nr: "17", dzial: "e8-podstawy", temat: "dodawanie-odejmowanie", punkty: 2,
      tresc: "Szkoła zbiera makulaturę. W poniedziałek uczniowie przynieśli $1248$ kg, a we wtorek o $365$ kg więcej niż w poniedziałek. W środę przynieśli $1070$ kg. Ile kilogramów makulatury zebrano przez te trzy dni? **Zapisz obliczenia.**",
      rozwiazanie: "Najpierw liczę, ile przyniesiono we wtorek: $1248 + 365 = 1613$ kg.\n\nPotem dodaję poniedziałek i wtorek: $1248 + 1613 = 2861$ kg.\n\nNa końcu dodaję środę: $2861 + 1070 = 3931$ kg.\n\nSprawdzenie szacowaniem: $1200 + 1600 + 1100 = 3900$, czyli blisko $3931$.\n\nOdpowiedź: Przez trzy dni zebrano $3931$ kg makulatury.",
    },
    // ---- mnożenie pisemne ----
    {
      nr: "21", dzial: "e8-podstawy", temat: "mnozenie", punkty: 2,
      tresc: "Oblicz pisemnie: a) $254 \\cdot 306$, b) $47 \\cdot 230$. **Zapisz obliczenia.**",
      rozwiazanie: "a) W liczbie $306$ jest zero w środku, więc liczę osobno przez $6$ i przez $300$.\n\n$254 \\cdot 6 = 1524$.\n\n$254 \\cdot 300 = 76200$ (wiersz przesunięty o dwa miejsca w lewo).\n\nDodaję: $1524 + 76200 = 77724$.\n\nb) Mnożę $47 \\cdot 23$: $47 \\cdot 3 = 141$ i $47 \\cdot 20 = 940$, razem $1081$.\n\nLiczba $230$ ma jedno zero na końcu, więc dopisuję je do wyniku: $10810$.\n\nOdpowiedź: a) $77724$, b) $10810$.",
    },
    {
      nr: "22", dzial: "e8-podstawy", temat: "mnozenie", punkty: 2,
      tresc: "W bibliotece stoi $38$ regałów, a na każdym jest po $245$ książek. Oszacuj, ile jest książek, a potem oblicz to dokładnie pisemnie. **Zapisz obliczenia.**",
      rozwiazanie: "Szacuję: $38$ to prawie $40$, a $245$ to prawie $250$. Wtedy $40 \\cdot 250 = 10000$.\n\nLiczę dokładnie: $245 \\cdot 8 = 1960$.\n\nPotem $245 \\cdot 30 = 7350$ (wiersz przesunięty o jedno miejsce).\n\nDodaję: $1960 + 7350 = 9310$.\n\nWynik jest blisko szacunku $10000$, więc jest sensowny.\n\nOdpowiedź: W bibliotece jest $9310$ książek.",
    },
    // ---- dzielenie pisemne ----
    {
      nr: "26", dzial: "e8-podstawy", temat: "dzielenie", punkty: 2,
      tresc: "Oblicz pisemnie i sprawdź mnożeniem: a) $7308 : 6$, b) $4513 : 9$ (podaj wynik z resztą). **Zapisz obliczenia.**",
      rozwiazanie: "a) $7 : 6 = 1$, reszta $1$. Znoszę $3$: $13 : 6 = 2$, reszta $1$. Znoszę $0$: $10 : 6 = 1$, reszta $4$. Znoszę $8$: $48 : 6 = 8$, reszta $0$.\n\nWynik: $1218$. Sprawdzenie: $1218 \\cdot 6 = 7308$.\n\nb) $45 : 9 = 5$, reszta $0$. Znoszę $1$: $9$ nie mieści się w $1$, więc piszę $0$. Znoszę $3$: $13 : 9 = 1$, reszta $4$.\n\nWynik: $501$, reszta $4$. Sprawdzenie: $501 \\cdot 9 + 4 = 4509 + 4 = 4513$.\n\nOdpowiedź: a) $1218$, b) $501$ i reszta $4$.",
    },
    {
      nr: "27", dzial: "e8-podstawy", temat: "dzielenie", punkty: 2,
      tresc: "Na wycieczkę jedzie $275$ uczniów. Do jednego autokaru mieści się $42$ osoby. Ile autokarów trzeba zamówić, żeby zmieścili się wszyscy uczniowie? **Zapisz obliczenia.**",
      rozwiazanie: "Dzielę $275 : 42$. Liczba $42$ mieści się w $275$ sześć razy, bo $6 \\cdot 42 = 252$.\n\nReszta: $275 - 252 = 23$. To $23$ uczniów, którzy nie zmieścili się w sześciu autokarach.\n\nTych uczniów też trzeba zawieźć, więc potrzebny jest jeszcze jeden autokar.\n\nSprawdzenie: $6 \\cdot 42 + 23 = 275$.\n\nOdpowiedź: Trzeba zamówić $7$ autokarów.",
    },
    // ---- kolejność działań ----
    {
      nr: "31", dzial: "e8-podstawy", temat: "kolejnosc-dzialan", punkty: 2,
      tresc: "Oblicz, zapisując każdy krok w osobnym wierszu: a) $48 : 6 \\cdot 2 + 5 \\cdot (9 - 4)$, b) $100 - (3^2 + 4^2) \\cdot 2$. **Zapisz obliczenia.**",
      rozwiazanie: "a) Najpierw nawias: $48 : 6 \\cdot 2 + 5 \\cdot 5$.\n\nMnożenie i dzielenie po kolei od lewej: $48 : 6 = 8$, więc mamy $8 \\cdot 2 + 5 \\cdot 5$.\n\nPotem $16 + 25 = 41$.\n\nb) W nawiasie najpierw potęgi: $3^2 = 9$ i $4^2 = 16$, więc $100 - (9 + 16) \\cdot 2$.\n\nNawias: $9 + 16 = 25$, czyli $100 - 25 \\cdot 2$.\n\nMnożenie: $25 \\cdot 2 = 50$. Odejmowanie: $100 - 50 = 50$.\n\nOdpowiedź: a) $41$, b) $50$.",
    },
    {
      nr: "32", dzial: "e8-podstawy", temat: "kolejnosc-dzialan", punkty: 2,
      tresc: "Karol kupił $3$ bilety po $14$ zł i $2$ batony po $6$ zł. Zapłacił banknotem $100$ zł. Zapisz jednym wyrażeniem, ile reszty dostał, i oblicz je. **Zapisz obliczenia.**",
      rozwiazanie: "Za bilety zapłacił $3 \\cdot 14$ zł, a za batony $2 \\cdot 6$ zł. Resztę liczę, odejmując wydatki od $100$ zł. Wydatki muszą być w nawiasie.\n\nWyrażenie: $100 - (3 \\cdot 14 + 2 \\cdot 6)$.\n\nW nawiasie najpierw mnożenia: $100 - (42 + 12)$.\n\nPotem dodawanie w nawiasie: $100 - 54$, czyli $46$.\n\nOdpowiedź: Karol dostał $46$ zł reszty.",
    },
    // ---- liczby ujemne ----
    {
      nr: "36", dzial: "e8-podstawy", temat: "liczby-ujemne", punkty: 2,
      tresc: "Oblicz: a) $(-4) \\cdot 6 + 15$, b) $-18 : (-3) - 7 \\cdot (-2)$. **Zapisz obliczenia.**",
      rozwiazanie: "a) Najpierw mnożenie: jeden minus, więc wynik jest ujemny: $(-4) \\cdot 6 = -24$.\n\nPotem dodawanie liczb o różnych znakach: $-24 + 15 = -9$ (większa bez znaku jest $24$, więc wynik jest ujemny).\n\nb) Dzielenie: dwa minusy dają plus, więc $-18 : (-3) = 6$.\n\nMnożenie: $7 \\cdot (-2) = -14$.\n\nOdejmowanie liczby ujemnej zamieniam na dodawanie: $6 - (-14) = 6 + 14 = 20$.\n\nOdpowiedź: a) $-9$, b) $20$.",
    },
    {
      nr: "37", dzial: "e8-podstawy", temat: "liczby-ujemne", punkty: 2,
      tresc: "W poniedziałek o godzinie $6{:}00$ temperatura wynosiła $-9$ °C, a o $14{:}00$ było $3$ °C. O ile stopni wzrosła temperatura między $6{:}00$ a $14{:}00$? Jaka była temperatura o $20{:}00$, jeśli od $14{:}00$ spadła o $7$ stopni? **Zapisz obliczenia.**",
      rozwiazanie: "Wzrost temperatury to różnica: $3 - (-9)$.\n\nOdejmowanie liczby ujemnej zamieniam na dodawanie: $3 + 9 = 12$. Na termometrze: $9$ stopni do zera i jeszcze $3$ powyżej.\n\nO $20{:}00$ jest $3 - 7 = -4$ (idziemy $3$ kroki do zera i jeszcze $4$ w dół).\n\nOdpowiedź: Temperatura wzrosła o $12$ stopni, a o $20{:}00$ wynosiła $-4$ °C.",
    },
    // ---- podzielność, NWD i NWW ----
    {
      nr: "41", dzial: "e8-podstawy", temat: "podzielnosc", punkty: 2,
      tresc: "Rozłóż liczby $84$ i $90$ na czynniki pierwsze. Oblicz NWD i NWW tych liczb. **Zapisz obliczenia.**",
      rozwiazanie: "Rozkład: $84 : 2 = 42$, $42 : 2 = 21$, $21 : 3 = 7$, $7 : 7 = 1$. Zatem $84 = 2^2 \\cdot 3 \\cdot 7$.\n\n$90 : 2 = 45$, $45 : 3 = 15$, $15 : 3 = 5$, $5 : 5 = 1$. Zatem $90 = 2 \\cdot 3^2 \\cdot 5$.\n\nNWD: czynniki wspólne w najmniejszej potędze: $2$ i $3$, więc $\\text{NWD}(84, 90) = 2 \\cdot 3 = 6$.\n\nNWW: wszystkie czynniki w największej potędze: $2^2 \\cdot 3^2 \\cdot 5 \\cdot 7 = 4 \\cdot 9 \\cdot 35 = 1260$.\n\nSprawdzenie: $6 \\cdot 1260 = 7560$ i $84 \\cdot 90 = 7560$.\n\nOdpowiedź: $\\text{NWD} = 6$, $\\text{NWW} = 1260$.",
    },
    {
      nr: "42", dzial: "e8-podstawy", temat: "podzielnosc", punkty: 2,
      tresc: "Ania ma $48$ czerwonych i $72$ niebieskie koraliki. Chce zrobić jak najwięcej jednakowych zestawów, wykorzystując wszystkie koraliki. Ile zestawów zrobi i ile koralików każdego koloru będzie w jednym zestawie? **Zapisz obliczenia.**",
      rozwiazanie: "Liczba zestawów musi dzielić $48$ i $72$, a ma być jak największa. To $\\text{NWD}(48, 72)$.\n\nRozkłady: $48 = 2^4 \\cdot 3$ i $72 = 2^3 \\cdot 3^2$.\n\nCzynniki wspólne w najmniejszej potędze: $2^3 \\cdot 3 = 24$.\n\nW jednym zestawie: $48 : 24 = 2$ czerwone i $72 : 24 = 3$ niebieskie koraliki.\n\nOdpowiedź: Ania zrobi $24$ zestawy, a w każdym będą $2$ czerwone i $3$ niebieskie koraliki.",
    },
    // ---- ułamki zwykłe ----
    {
      nr: "46", dzial: "e8-podstawy", temat: "ulamki-zwykle", punkty: 2,
      tresc: "Oblicz: a) $\\frac{7}{10} + \\frac{4}{15}$, b) $3\\frac{1}{6} - 1\\frac{3}{4}$. Wynik skróć i, jeśli trzeba, zapisz jako liczbę mieszaną. **Zapisz obliczenia.**",
      rozwiazanie: "a) $\\text{NWW}(10, 15) = 30$. Rozszerzam: $\\frac{7}{10} = \\frac{21}{30}$ i $\\frac{4}{15} = \\frac{8}{30}$.\n\nDodaję liczniki: $\\frac{21}{30} + \\frac{8}{30} = \\frac{29}{30}$. Ułamek nie skraca się.\n\nb) Zamieniam na ułamki niewłaściwe: $3\\frac{1}{6} = \\frac{19}{6}$ i $1\\frac{3}{4} = \\frac{7}{4}$.\n\n$\\text{NWW}(6, 4) = 12$, więc $\\frac{19}{6} = \\frac{38}{12}$ i $\\frac{7}{4} = \\frac{21}{12}$.\n\nOdejmuję: $\\frac{38}{12} - \\frac{21}{12} = \\frac{17}{12} = 1\\frac{5}{12}$.\n\nOdpowiedź: a) $\\frac{29}{30}$, b) $1\\frac{5}{12}$.",
    },
    {
      nr: "47", dzial: "e8-podstawy", temat: "ulamki-zwykle", punkty: 2,
      tresc: "Kasia czyta książkę. W sobotę przeczytała $\\frac{2}{5}$ książki, a w niedzielę $\\frac{1}{4}$ książki. Jaką część książki jej jeszcze zostało? Czy to więcej niż połowa książki? **Zapisz obliczenia.**",
      rozwiazanie: "Najpierw liczę, jaką część przeczytała w oba dni. Wspólny mianownik to $20$: $\\frac{2}{5} = \\frac{8}{20}$ i $\\frac{1}{4} = \\frac{5}{20}$.\n\nRazem: $\\frac{8}{20} + \\frac{5}{20} = \\frac{13}{20}$.\n\nCała książka to $\\frac{20}{20}$, więc zostało $\\frac{20}{20} - \\frac{13}{20} = \\frac{7}{20}$.\n\nPołowa książki to $\\frac{10}{20}$, a $\\frac{7}{20} < \\frac{10}{20}$.\n\nOdpowiedź: Zostało $\\frac{7}{20}$ książki, czyli mniej niż połowa.",
    },
    // ---- mnożenie i dzielenie ułamków ----
    {
      nr: "51", dzial: "e8-podstawy", temat: "mnozenie-ulamkow", punkty: 2,
      tresc: "Oblicz: a) $1\\frac{1}{5} \\cdot 2\\frac{1}{2}$, b) $\\frac{7}{9} : 2\\frac{1}{3}$. **Zapisz obliczenia.**",
      rozwiazanie: "a) Zamieniam liczby mieszane na ułamki niewłaściwe: $1\\frac{1}{5} = \\frac{6}{5}$ i $2\\frac{1}{2} = \\frac{5}{2}$.\n\nMnożę, skracając $5$ z $5$ i $6$ z $2$: $\\frac{6}{5} \\cdot \\frac{5}{2} = \\frac{3}{1} = 3$.\n\nb) $2\\frac{1}{3} = \\frac{7}{3}$. Dzielenie zamieniam na mnożenie przez odwrotność: $\\frac{7}{9} : \\frac{7}{3} = \\frac{7}{9} \\cdot \\frac{3}{7}$.\n\nSkracam $7$ z $7$ i $3$ z $9$: $\\frac{1}{3} \\cdot 1 = \\frac{1}{3}$.\n\nOdpowiedź: a) $3$, b) $\\frac{1}{3}$.",
    },
    {
      nr: "52", dzial: "e8-podstawy", temat: "mnozenie-ulamkow", punkty: 2,
      tresc: "Ola ma wstążkę o długości $4\\frac{1}{2}$ m. Tnie ją na jednakowe kawałki po $\\frac{3}{4}$ m. Ile kawałków otrzyma? **Zapisz obliczenia.**",
      rozwiazanie: "Pytam, ile razy $\\frac{3}{4}$ m mieści się w $4\\frac{1}{2}$ m, więc dzielę.\n\nZamieniam liczbę mieszaną: $4\\frac{1}{2} = \\frac{9}{2}$.\n\nDzielę przez ułamek, czyli mnożę przez odwrotność: $\\frac{9}{2} : \\frac{3}{4} = \\frac{9}{2} \\cdot \\frac{4}{3}$.\n\nSkracam: $\\frac{3 \\cdot 2}{1 \\cdot 1} = 6$.\n\nSprawdzenie: $6 \\cdot \\frac{3}{4} = \\frac{18}{4} = 4\\frac{1}{2}$.\n\nOdpowiedź: Ola otrzyma $6$ kawałków.",
    },
    // ---- ułamki dziesiętne ----
    {
      nr: "56", dzial: "e8-podstawy", temat: "ulamki-dziesietne", punkty: 3,
      tresc: "a) Oblicz pisemnie $23{,}4 + 8{,}76$. b) Oblicz pisemnie $3{,}6 \\cdot 2{,}5$. c) Zapisz liczbę $0{,}375$ jako ułamek zwykły nieskracalny. **Zapisz obliczenia.**",
      rozwiazanie: "a) Piszę przecinek pod przecinkiem i dopisuję zero: $23{,}40 + 8{,}76$. Dodaję kolumnami: setne $0 + 6 = 6$, dziesiąte $4 + 7 = 11$ (piszę $1$, pamiętam $1$), jedności $3 + 8 + 1 = 12$ (piszę $2$, pamiętam $1$), dziesiątki $2 + 1 = 3$. Wynik: $32{,}16$.\n\nb) Mnożę bez przecinków: $36 \\cdot 25 = 900$.\n\nW czynnikach jest razem $1 + 1 = 2$ cyfry po przecinku, więc odliczam dwie cyfry od prawej: $9{,}00 = 9$.\n\nc) $0{,}375$ to trzysta siedemdziesiąt pięć tysięcznych: $\\frac{375}{1000}$. Skracam przez $125$: $\\frac{3}{8}$.\n\nOdpowiedź: a) $32{,}16$, b) $9$, c) $\\frac{3}{8}$.",
    },
    {
      nr: "57", dzial: "e8-podstawy", temat: "ulamki-dziesietne", punkty: 2,
      tresc: "Pan Marek ma listwę o długości $7{,}2$ m. Chce ją pociąć na kawałki po $0{,}45$ m. Ile takich kawałków otrzyma? **Zapisz obliczenia.**",
      rozwiazanie: "Pytam, ile razy $0{,}45$ mieści się w $7{,}2$, więc dzielę: $7{,}2 : 0{,}45$.\n\nDzielnik ma być liczbą całkowitą, więc przesuwam przecinki w obu liczbach o $2$ miejsca w prawo: $720 : 45$.\n\n$72 : 45 = 1$, reszta $27$. Znoszę $0$: $270 : 45 = 6$, reszta $0$. Wynik: $16$.\n\nSprawdzenie: $16 \\cdot 0{,}45 = 7{,}2$.\n\nOdpowiedź: Pan Marek otrzyma $16$ kawałków.",
    },
  ],
};
