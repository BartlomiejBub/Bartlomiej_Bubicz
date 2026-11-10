// Zadania do ćwiczeń – Zadania z treścią (LO): równania kwadratowe z treści.
// Ułożone dla strony. Format jak arkusz (tools/test-arkusze.mjs).
export default {
  nazwa: "Zadania do ćwiczeń – Zadania z treścią",
  zadania: [
    {
      nr: "1", dzial: "tekstowe", temat: "rownania-z-tresci",
      tresc: "Długość prostokąta jest o $2$ cm większa od jego szerokości, a pole prostokąta jest równe $48$ cm$^{2}$. Obwód tego prostokąta jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$24$ cm", "$32$ cm", "$28$ cm", "$56$ cm"],
      poprawna: 2,
    },
    {
      nr: "4", dzial: "tekstowe", temat: "ciagi-w-praktyce",
      tresc: "Kredyt w wysokości $6000$ zł spłacono w $6$ miesięcznych ratach malejących. Każda rata zawierała tę samą część kapitałową oraz odsetki w wysokości $2\\%$ długu pozostałego do spłaty przed wpłatą raty. Pierwsza rata była równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$1020$ zł", "$1100$ zł", "$1200$ zł", "$1120$ zł"],
      poprawna: 3,
    },
    // ---- ruch i wspólna praca ----
    {
      nr: "7", dzial: "tekstowe", temat: "ruch-i-praca",
      tresc: "Rowerzysta jechał przez $2$ godziny z prędkością $18$ km/h, a potem przez $3$ godziny z prędkością $12$ km/h. Jaka była jego średnia prędkość na całej trasie? **Wybierz właściwą odpowiedź.**",
      opcje: ["$15$ km/h", "$14{,}4$ km/h", "$14$ km/h", "$30$ km/h"],
      poprawna: 1,
    },
    {
      nr: "8", dzial: "tekstowe", temat: "ruch-i-praca",
      tresc: "Dwa miasta dzieli odległość $180$ km. Jednocześnie wyjeżdżają z nich naprzeciw siebie dwa samochody: jeden z prędkością $50$ km/h, drugi z prędkością $40$ km/h. Po ilu godzinach się miną? **Wybierz właściwą odpowiedź.**",
      opcje: ["po $18$ godzinach", "po $3{,}6$ godziny", "po $4{,}5$ godziny", "po $2$ godzinach"],
      poprawna: 3,
    },
    {
      nr: "9", dzial: "tekstowe", temat: "ruch-i-praca",
      tresc: "Ola maluje płot sama w $10$ godzin, a Kuba sam w $15$ godzin. Ile godzin zajmie im malowanie płotu, gdy będą pracować razem? **Wybierz właściwą odpowiedź.**",
      opcje: ["$6$ godzin", "$12{,}5$ godziny", "$25$ godzin", "$5$ godzin"],
      poprawna: 0,
    },
    // ---- procenty i pieniądze ----
    {
      nr: "13", dzial: "tekstowe", temat: "procenty-i-pieniadze",
      tresc: "Plecak kosztował $250$ zł. Najpierw jego cenę obniżono o $20\\%$, a po tygodniu podniesiono nową cenę o $20\\%$. Ile złotych kosztuje plecak po tych dwóch zmianach? **Wybierz właściwą odpowiedź.**",
      opcje: ["$250$ zł", "$240$ zł", "$200$ zł", "$300$ zł"],
      poprawna: 1,
    },
    {
      nr: "14", dzial: "tekstowe", temat: "procenty-i-pieniadze",
      tresc: "Cena brutto towaru, w której jest już podatek VAT $23\\%$, wynosi $861$ zł. Ile wynosi cena netto tego towaru? **Wybierz właściwą odpowiedź.**",
      opcje: ["$662{,}97$ zł", "$838$ zł", "$700$ zł", "$198{,}03$ zł"],
      poprawna: 2,
    },
    {
      nr: "15", dzial: "tekstowe", temat: "procenty-i-pieniadze",
      tresc: "Poparcie dla pewnego pomysłu spadło z $40\\%$ do $30\\%$. O ile spadło poparcie? **Wybierz właściwą odpowiedź.**",
      opcje: ["o $10$ punktów procentowych, czyli o $25\\%$", "o $10\\%$, czyli o $25$ punktów procentowych", "o $25$ punktów procentowych, czyli o $10\\%$", "o $10$ punktów procentowych, czyli o $10\\%$"],
      poprawna: 0,
    },
    // ---- równania z treści (dodatkowe) ----
    {
      nr: "19", dzial: "tekstowe", temat: "rownania-z-tresci",
      tresc: "Suma cyfr pewnej liczby dwucyfrowej jest równa $12$. Po zamianie cyfr miejscami otrzymujemy liczbę o $18$ mniejszą od danej. Jaka to liczba? **Wybierz właściwą odpowiedź.**",
      opcje: ["$57$", "$93$", "$75$", "$84$"],
      poprawna: 2,
    },
    {
      nr: "20", dzial: "tekstowe", temat: "rownania-z-tresci",
      tresc: "W pudełku jest $14$ monet: dwuzłotowych i pięciozłotowych. Ich łączna wartość wynosi $43$ zł. Ile monet pięciozłotowych jest w pudełku? **Wybierz właściwą odpowiedź.**",
      opcje: ["$4$", "$5$", "$9$", "$10$"],
      poprawna: 1,
    },
    // ---- ciągi w praktyce (dodatkowe) ----
    {
      nr: "23", dzial: "tekstowe", temat: "ciagi-w-praktyce",
      tresc: "Na stosie puszek w najniższej warstwie leży $15$ puszek, a w każdej następnej warstwie jest o $1$ puszkę mniej. Stos ma $9$ warstw. Ile puszek jest na całym stosie? **Wybierz właściwą odpowiedź.**",
      opcje: ["$88$", "$99$", "$105$", "$135$"],
      poprawna: 1,
    },
    {
      nr: "24", dzial: "tekstowe", temat: "ciagi-w-praktyce",
      tresc: "**Oceń prawdziwość podanych zdań.** Zaznacz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.",
      czesci: [
        { tekst: "Jeśli co miesiąc odkładasz o $30$ zł więcej niż w poprzednim miesiącu, to kolejne kwoty tworzą ciąg arytmetyczny.", litery: "PF", poprawna: 0 },
        { tekst: "Liczba bakterii podwaja się co godzinę, więc jej kolejne wartości tworzą ciąg arytmetyczny o różnicy $2$.", litery: "PF", poprawna: 1 },
        { tekst: "Wartość maszyny maleje co roku o $10\\%$ wartości z poprzedniego roku, więc kolejne wartości tworzą ciąg geometryczny o ilorazie $0{,}9$.", litery: "PF", poprawna: 0 },
      ],
    },
  ],
  otwarte: [
    {
      nr: "2", dzial: "tekstowe", temat: "rownania-z-tresci", punkty: 3,
      tresc: "Suma kwadratów dwóch kolejnych liczb naturalnych jest równa $181$. Wyznacz te liczby. **Zapisz obliczenia.**",
      rozwiazanie: "Niech $n$ oznacza mniejszą z liczb, wtedy kolejna to $n + 1$. Z treści: $n^{2} + (n + 1)^{2} = 181$.\n\nRozwijamy: $n^{2} + n^{2} + 2n + 1 = 181$, czyli $2n^{2} + 2n - 180 = 0$. Dzielimy przez $2$: $n^{2} + n - 90 = 0$.\n\nDelta: $1 + 360 = 361$, więc $n = \\frac{-1 - 19}{2} = -10$ lub $n = \\frac{-1 + 19}{2} = 9$.\n\nLiczba $-10$ nie jest naturalna, więc odrzucamy to rozwiązanie. Zostaje $n = 9$.\n\nSprawdzenie: $9^{2} + 10^{2} = 81 + 100 = 181$.\n\nOdpowiedź: Szukane liczby to $9$ i $10$.",
    },
    {
      nr: "3", dzial: "tekstowe", temat: "rownania-z-tresci", punkty: 3,
      tresc: "Mama jest o $24$ lata starsza od córki. Iloczyn wieku mamy i wieku córki jest równy $180$. Ile lat ma mama, a ile córka? **Zapisz obliczenia.**",
      rozwiazanie: "Niech $x$ oznacza wiek córki w latach. Wtedy mama ma $x + 24$ lata. Z treści: $x(x + 24) = 180$.\n\nPo wymnożeniu i przeniesieniu: $x^{2} + 24x - 180 = 0$.\n\nDelta: $576 + 720 = 1296$, więc $\\sqrt{\\Delta} = 36$. Stąd $x = \\frac{-24 - 36}{2} = -30$ lub $x = \\frac{-24 + 36}{2} = 6$.\n\nWiek nie może być ujemny, więc odrzucamy $x = -30$. Córka ma $6$ lat, a mama $6 + 24 = 30$ lat.\n\nSprawdzenie: $6 \\cdot 30 = 180$.\n\nOdpowiedź: Córka ma $6$ lat, a mama $30$ lat.",
    },
    {
      nr: "5", dzial: "tekstowe", temat: "ciagi-w-praktyce", punkty: 3,
      tresc: "Pan Adam wziął kredyt $24\\,000$ zł spłacany w $8$ miesięcznych ratach malejących. Każda rata zawiera stałą część kapitałową oraz odsetki w wysokości $1{,}5\\%$ długu pozostałego do spłaty przed wpłatą raty. Oblicz wysokość ostatniej raty oraz łączną sumę zapłaconych odsetek. **Zapisz obliczenia.**",
      rozwiazanie: "Część kapitałowa każdej raty: $C = \\frac{24\\,000}{8} = 3000$ zł.\n\nOdsetki w pierwszej racie: $O_{1} = 0{,}015 \\cdot 24\\,000 = 360$ zł. Przed ostatnią (ósmą) ratą pozostaje do spłaty tylko jedna część kapitałowa $3000$ zł, więc $O_{8} = 0{,}015 \\cdot 3000 = 45$ zł.\n\nOstatnia rata: $3000 + 45 = 3045$ zł.\n\nOdsetki w kolejnych ratach tworzą ciąg arytmetyczny (różnica $-0{,}015 \\cdot 3000 = -45$ zł), więc ich suma to $S_{8} = \\frac{360 + 45}{2} \\cdot 8 = 405 \\cdot 4 = 1620$ zł.\n\nOdpowiedź: Ostatnia rata wynosi $3045$ zł, a suma odsetek to $1620$ zł.",
    },
    {
      nr: "6", dzial: "tekstowe", temat: "ciagi-w-praktyce", punkty: 3,
      tresc: "Kredyt spłacano w ratach malejących: każda rata zawierała tę samą część kapitałową i odsetki w wysokości $1\\%$ długu pozostałego przed wpłatą raty. Pierwsza rata wyniosła $1320$ zł, a druga $1310$ zł. Oblicz, ile wynosiła część kapitałowa raty, jaką kwotę pożyczono i na ile rat rozłożono kredyt. **Zapisz obliczenia.**",
      rozwiazanie: "Rata składa się z części kapitałowej $C$ i odsetek. Przy każdej kolejnej racie dług maleje o $C$, więc odsetki maleją o $0{,}01 \\cdot C$. Różnica kolejnych rat to $1320 - 1310 = 10$ zł.\n\nStąd $0{,}01 \\cdot C = 10$, czyli $C = 1000$ zł.\n\nW pierwszej racie odsetki to $1320 - 1000 = 320$ zł i są one $1\\%$ całego kredytu $K$: $0{,}01 K = 320$, więc $K = 32\\,000$ zł.\n\nLiczba rat: $n = \\frac{K}{C} = \\frac{32\\,000}{1000} = 32$.\n\nSprawdzenie: ostatnia rata to $1000 + 0{,}01 \\cdot 1000 = 1010$ zł, a z ciągu arytmetycznego $1320 - 31 \\cdot 10 = 1010$ zł.\n\nOdpowiedź: Część kapitałowa to $1000$ zł, pożyczono $32\\,000$ zł, a kredyt rozłożono na $32$ raty.",
    },
    // ---- ruch i wspólna praca ----
    {
      nr: "10", dzial: "tekstowe", temat: "ruch-i-praca", punkty: 2,
      tresc: "Pan Jan wyszedł z domu o godzinie 8:00 i szedł ze stałą prędkością $4$ km/h. Pół godziny później z tego samego domu wyszedł w tę samą stronę jego syn z prędkością $6$ km/h. O której godzinie syn dogoni ojca i w jakiej odległości od domu to nastąpi? **Zapisz obliczenia.**",
      rozwiazanie: "Syn wyszedł po $0{,}5$ h, więc w tym czasie ojciec przeszedł $4 \\cdot 0{,}5 = 2$ km. To jest przewaga ojca.\n\nSyn jest szybszy, więc odległość między nimi maleje z różnicą prędkości: $6 - 4 = 2$ km/h.\n\nCzas dogonienia liczony od chwili wyjścia syna: $t = \\frac{2}{2} = 1$ h.\n\nSyn wyszedł o 8:30, więc dogoni ojca o 9:30.\n\nOdległość od domu: $6 \\cdot 1 = 6$ km. Sprawdzenie dla ojca: szedł $1{,}5$ h, więc $4 \\cdot 1{,}5 = 6$ km.\n\nOdpowiedź: Syn dogoni ojca o 9:30, w odległości $6$ km od domu.",
    },
    {
      nr: "11", dzial: "tekstowe", temat: "ruch-i-praca", punkty: 2,
      tresc: "Ania i Bartek wyruszyli jednocześnie naprzeciw siebie z dwóch miejscowości oddalonych o $42$ km. Ania szła z prędkością $10$ km/h, a Bartek jechał rowerem. Spotkali się po $1{,}5$ godziny. Oblicz prędkość Bartka. **Zapisz obliczenia.**",
      rozwiazanie: "Niech $v$ oznacza prędkość Bartka w km/h. Idą naprzeciw siebie, więc odległość maleje z sumą prędkości: $s = (v_1 + v_2) \\cdot t$.\n\nZ treści: $42 = (10 + v) \\cdot 1{,}5$.\n\nDzielimy przez $1{,}5$: $10 + v = 28$, więc $v = 18$.\n\nSprawdzenie: Ania przeszła $10 \\cdot 1{,}5 = 15$ km, Bartek przejechał $18 \\cdot 1{,}5 = 27$ km, razem $15 + 27 = 42$ km.\n\nOdpowiedź: Bartek jechał z prędkością $18$ km/h.",
    },
    {
      nr: "12", dzial: "tekstowe", temat: "ruch-i-praca", punkty: 3,
      tresc: "Pusty zbiornik napełnia sama rura A w ciągu $6$ godzin. Pełny zbiornik opróżnia sama rura B w ciągu $15$ godzin. Oblicz, w ile godzin napełni się pusty zbiornik, gdy obie rury będą otwarte. Potem oblicz, ile czasu zajmie dokończenie napełniania samą rurą A, jeśli po $4$ godzinach pracy obu rur rurę B zamknięto. **Zapisz obliczenia.**",
      rozwiazanie: "Rura A napełnia w ciągu godziny $\\frac{1}{6}$ zbiornika, a rura B opróżnia $\\frac{1}{15}$ zbiornika. Jedna dodaje, a druga zabiera, więc odejmujemy.\n\nPrzy obu otwartych rurach w ciągu godziny przybywa $\\frac{1}{6} - \\frac{1}{15} = \\frac{5}{30} - \\frac{2}{30} = \\frac{3}{30} = \\frac{1}{10}$ zbiornika.\n\nCały zbiornik napełni się więc w $10$ godzin.\n\nPo $4$ godzinach będzie $4 \\cdot \\frac{1}{10} = \\frac{2}{5}$ zbiornika, więc do napełnienia zostaje $1 - \\frac{2}{5} = \\frac{3}{5}$.\n\nSama rura A napełnia $\\frac{1}{6}$ zbiornika na godzinę, więc czas to $\\frac{3}{5} : \\frac{1}{6} = \\frac{3}{5} \\cdot 6 = \\frac{18}{5} = 3{,}6$ h, czyli $3$ h i $36$ min.\n\nOdpowiedź: Przy obu otwartych rurach zbiornik napełni się w $10$ godzin; dokończenie samą rurą A zajmie $3{,}6$ godziny ($3$ h $36$ min).",
    },
    // ---- procenty i pieniądze ----
    {
      nr: "16", dzial: "tekstowe", temat: "procenty-i-pieniadze", punkty: 2,
      tresc: "Pani Ewa wpłaciła $5000$ zł na lokatę na $2$ lata z oprocentowaniem $4\\%$ w skali roku. Odsetki dopisuje się do konta na koniec każdego roku. Oblicz, ile złotych będzie na lokacie po $2$ latach (pomiń podatek od odsetek). O ile złotych więcej niż przy odsetkach prostych? **Zapisz obliczenia.**",
      rozwiazanie: "Co roku kwotę mnożymy przez $1 + \\frac{4}{100} = 1{,}04$.\n\nPo pierwszym roku: $5000 \\cdot 1{,}04 = 5200$ zł.\n\nPo drugim roku: $5200 \\cdot 1{,}04 = 5408$ zł (czyli $5000 \\cdot 1{,}04^{2} = 5408$ zł).\n\nPrzy odsetkach prostych odsetki byłyby takie same co roku: $0{,}04 \\cdot 5000 = 200$ zł, więc po dwóch latach $5000 + 2 \\cdot 200 = 5400$ zł.\n\nRóżnica: $5408 - 5400 = 8$ zł. To odsetki od odsetek za pierwszy rok: $0{,}04 \\cdot 200 = 8$ zł.\n\nOdpowiedź: Na lokacie będzie $5408$ zł, czyli o $8$ zł więcej niż przy odsetkach prostych.",
    },
    {
      nr: "17", dzial: "tekstowe", temat: "procenty-i-pieniadze", punkty: 3,
      tresc: "Po obniżce ceny o $15\\%$ rower kosztuje $1020$ zł. Oblicz, ile kosztował rower przed obniżką. Następnie sklep podniósł obecną cenę o $10\\%$. Oblicz nową cenę i podaj, o ile procent różni się ona od ceny sprzed obniżki. **Zapisz obliczenia.**",
      rozwiazanie: "Po obniżce o $15\\%$ cena to $100\\% - 15\\% = 85\\%$ ceny pierwotnej. Niech $x$ oznacza cenę przed obniżką: $0{,}85 \\cdot x = 1020$.\n\nDzielimy: $x = 1020 : 0{,}85 = 1200$ zł.\n\nPodwyżka o $10\\%$ ceny $1020$ zł: $1020 \\cdot 1{,}1 = 1122$ zł.\n\nPorównujemy z ceną pierwotną: $\\frac{1122}{1200} = 0{,}935$, czyli $93{,}5\\%$ ceny pierwotnej.\n\nTo o $100\\% - 93{,}5\\% = 6{,}5\\%$ mniej niż przed obniżką (nie $15\\% - 10\\% = 5\\%$, bo podwyżka dotyczyła już niższej ceny).\n\nOdpowiedź: Przed obniżką rower kosztował $1200$ zł, nowa cena to $1122$ zł i jest ona o $6{,}5\\%$ niższa od pierwotnej.",
    },
    {
      nr: "18", dzial: "tekstowe", temat: "procenty-i-pieniadze", punkty: 3,
      tresc: "Oprocentowanie roczne pewnej lokaty wzrosło z $2{,}5\\%$ do $4\\%$. O ile punktów procentowych, a o ile procent wzrosło oprocentowanie? Pan Marek wpłacił na roczną lokatę $8000$ zł. Oblicz, o ile złotych większe będą jego odsetki przy nowym oprocentowaniu (przed odliczeniem podatku). **Zapisz obliczenia.**",
      rozwiazanie: "Zmiana w punktach procentowych to różnica: $4 - 2{,}5 = 1{,}5$ punktu procentowego.\n\nZmiana w procentach to porównanie z wartością początkową: $\\frac{1{,}5}{2{,}5} \\cdot 100\\% = 0{,}6 \\cdot 100\\% = 60\\%$.\n\nOdsetki roczne przy dawnym oprocentowaniu: $0{,}025 \\cdot 8000 = 200$ zł.\n\nOdsetki roczne przy nowym oprocentowaniu: $0{,}04 \\cdot 8000 = 320$ zł.\n\nRóżnica: $320 - 200 = 120$ zł (to samo: $0{,}015 \\cdot 8000 = 120$ zł).\n\nOdpowiedź: Oprocentowanie wzrosło o $1{,}5$ punktu procentowego, czyli o $60\\%$, a odsetki będą większe o $120$ zł.",
    },
    // ---- równania z treści (dodatkowe) ----
    {
      nr: "21", dzial: "tekstowe", temat: "rownania-z-tresci", punkty: 3,
      tresc: "Prostokątny ogród ma wymiary $12$ m na $8$ m. Dookoła ogrodu, na zewnątrz, zbudowano ścieżkę o jednakowej szerokości na całej długości. Pole ścieżki wynosi $96$ m$^{2}$. Oblicz szerokość ścieżki. **Zapisz obliczenia.**",
      rozwiazanie: "Niech $x$ oznacza szerokość ścieżki w metrach, $x > 0$. Ogród razem ze ścieżką jest prostokątem o bokach $12 + 2x$ i $8 + 2x$.\n\nPole ścieżki to pole dużego prostokąta bez pola ogrodu: $(12 + 2x)(8 + 2x) - 12 \\cdot 8 = 96$.\n\nWymnażamy: $96 + 24x + 16x + 4x^{2} - 96 = 96$, czyli $4x^{2} + 40x - 96 = 0$.\n\nDzielimy przez $4$: $x^{2} + 10x - 24 = 0$. Delta: $100 + 96 = 196$, więc $x = \\frac{-10 - 14}{2} = -12$ lub $x = \\frac{-10 + 14}{2} = 2$.\n\nSzerokość nie może być ujemna, więc odrzucamy $-12$. Zostaje $x = 2$.\n\nSprawdzenie: duży prostokąt ma wymiary $16$ m na $12$ m, jego pole to $192$ m$^{2}$, a $192 - 96 = 96$ m$^{2}$ to pole ścieżki.\n\nOdpowiedź: Ścieżka ma szerokość $2$ m.",
    },
    {
      nr: "22", dzial: "tekstowe", temat: "rownania-z-tresci", punkty: 3,
      tresc: "Sklep zmieszał kawę po $60$ zł za kilogram z kawą po $90$ zł za kilogram. Otrzymano $10$ kg mieszanki, której kilogram kosztuje $72$ zł. Ile kilogramów każdego gatunku kawy użyto? **Zapisz obliczenia.**",
      rozwiazanie: "Niech $x$ oznacza liczbę kilogramów kawy tańszej (po $60$ zł), a $y$ – liczbę kilogramów kawy droższej (po $90$ zł).\n\nRazem jest $10$ kg: $x + y = 10$.\n\nMieszanka jest warta $10 \\cdot 72 = 720$ zł, więc $60x + 90y = 720$.\n\nZ pierwszego równania $y = 10 - x$. Wstawiamy do drugiego: $60x + 90(10 - x) = 720$, czyli $60x + 900 - 90x = 720$.\n\nStąd $-30x = -180$, więc $x = 6$ i $y = 10 - 6 = 4$.\n\nSprawdzenie: $6 + 4 = 10$ kg oraz $60 \\cdot 6 + 90 \\cdot 4 = 360 + 360 = 720$ zł.\n\nOdpowiedź: Użyto $6$ kg kawy po $60$ zł i $4$ kg kawy po $90$ zł.",
    },
    // ---- ciągi w praktyce (dodatkowe) ----
    {
      nr: "25", dzial: "tekstowe", temat: "ciagi-w-praktyce", punkty: 3,
      tresc: "Piłka spada z wysokości $2{,}5$ m. Po każdym uderzeniu o podłogę odbija się na wysokość równą $60\\%$ poprzedniej wysokości. Oblicz, na jaką wysokość piłka odbije się po trzecim uderzeniu o podłogę, i po którym uderzeniu odbije się po raz pierwszy na wysokość mniejszą niż $0{,}5$ m. **Zapisz obliczenia.**",
      rozwiazanie: "Kolejne wysokości (początkowa i po kolejnych odbiciach) tworzą ciąg geometryczny, w którym każdą wysokość mnożymy przez $q = 0{,}6$.\n\nPo pierwszym odbiciu: $2{,}5 \\cdot 0{,}6 = 1{,}5$ m. Po drugim: $1{,}5 \\cdot 0{,}6 = 0{,}9$ m. Po trzecim: $0{,}9 \\cdot 0{,}6 = 0{,}54$ m. Ten sam wynik daje wzór $2{,}5 \\cdot 0{,}6^{3} = 2{,}5 \\cdot 0{,}216 = 0{,}54$ m.\n\nWysokość $0{,}54$ m jest jeszcze większa niż $0{,}5$ m. Po czwartym odbiciu: $0{,}54 \\cdot 0{,}6 = 0{,}324$ m, a to jest mniej niż $0{,}5$ m.\n\nOdpowiedź: Po trzecim uderzeniu piłka odbije się na wysokość $0{,}54$ m. Po raz pierwszy mniej niż $0{,}5$ m będzie po czwartym uderzeniu.",
    },
    {
      nr: "26", dzial: "tekstowe", temat: "ciagi-w-praktyce", punkty: 3,
      tresc: "Pan Piotr przygotowuje się do biegu. W pierwszym tygodniu przebiegł $12$ km, a w każdym następnym tygodniu o $3$ km więcej niż w poprzednim. Oblicz, w którym tygodniu przebiegnie $60$ km, i ile kilometrów przebiegnie łącznie od pierwszego tygodnia do tego tygodnia włącznie. **Zapisz obliczenia.**",
      rozwiazanie: "Tygodniowe dystanse tworzą ciąg arytmetyczny o pierwszym wyrazie $a_{1} = 12$ i różnicy $r = 3$. Wzór ogólny: $a_{n} = 12 + (n - 1) \\cdot 3$.\n\nSzukamy $n$, dla którego $a_{n} = 60$: $12 + 3(n - 1) = 60$, czyli $3(n - 1) = 48$ i $n - 1 = 16$, więc $n = 17$.\n\nŁączny dystans to suma $17$ początkowych wyrazów: $S_{17} = \\frac{12 + 60}{2} \\cdot 17 = 36 \\cdot 17 = 612$ km.\n\nOdpowiedź: Pan Piotr przebiegnie $60$ km w $17$. tygodniu, a łącznie przebiegnie $612$ km.",
    },
  ],
};
