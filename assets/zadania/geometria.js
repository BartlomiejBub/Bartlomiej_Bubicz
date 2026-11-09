// Zadania do ćwiczeń – Geometria (LO): trygonometria, planimetria, własności czworokątów, proste i płaszczyzny w przestrzeni,
// stereometria. Ułożone dla strony. Format jak arkusz (tools/test-arkusze.mjs).
// Bryły opisano słowami; w prostopadłościanie i sześcianie ABCDEFGH podstawa dolna to ABCD, górna EFGH (E nad A, F nad B, G nad C, H nad D).
export default {
  nazwa: "Zadania do ćwiczeń – Geometria",
  zadania: [
    // ---- trygonometria ----
    {
      nr: "1", dzial: "geometria", temat: "trygonometria",
      tresc: "Kąt $\\alpha$ jest ostry i $\\sin \\alpha = \\frac{5}{13}$. Wtedy $\\operatorname{tg} \\alpha$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$\\frac{12}{13}$", "$\\frac{5}{12}$", "$\\frac{12}{5}$", "$\\frac{13}{12}$"],
      poprawna: 1,
    },
    {
      nr: "2", dzial: "geometria", temat: "trygonometria",
      tresc: "Kąt $\\alpha$ jest ostry i $\\operatorname{tg} \\alpha = \\frac{4}{7}$. Wtedy $\\operatorname{ctg} \\alpha$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$\\frac{4}{7}$", "$\\frac{3}{7}$", "$\\frac{7}{4}$", "$-\\frac{7}{4}$"],
      poprawna: 2,
    },
    {
      nr: "3", dzial: "geometria", temat: "trygonometria",
      tresc: "Wartość wyrażenia $\\cos 150^{\\circ}$ jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$-\\frac{\\sqrt{3}}{2}$", "$\\frac{\\sqrt{3}}{2}$", "$-\\frac{1}{2}$", "$\\frac{1}{2}$"],
      poprawna: 0,
    },
    {
      nr: "4", dzial: "geometria", temat: "trygonometria",
      tresc: "Kąt $\\alpha$ jest rozwarty i $\\sin \\alpha = \\frac{4}{5}$. **Oceń prawdziwość podanych zdań.** Zaznacz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.",
      czesci: [
        { tekst: "$\\cos \\alpha = \\frac{3}{5}$", litery: "PF", poprawna: 1 },
        { tekst: "$\\operatorname{tg} \\alpha = -\\frac{4}{3}$", litery: "PF", poprawna: 0 },
        { tekst: "$\\sin(180^{\\circ} - \\alpha) = \\frac{4}{5}$", litery: "PF", poprawna: 0 },
      ],
    },
    // ---- planimetria ----
    {
      nr: "8", dzial: "geometria", temat: "planimetria",
      tresc: "Dwa boki trójkąta mają długości $7$ i $12$. Trzeci bok tego trójkąta może mieć długość. **Wybierz właściwą odpowiedź.**",
      opcje: ["$4$", "$5$", "$19$", "$11$"],
      poprawna: 3,
    },
    {
      nr: "9", dzial: "geometria", temat: "planimetria",
      tresc: "W trójkącie $ABC$ środkowa $CD$ ma długość $15$, a punkt $S$ jest środkiem ciężkości tego trójkąta. Długość odcinka $CS$ jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$5$", "$7{,}5$", "$10$", "$12$"],
      poprawna: 2,
    },
    {
      nr: "10", dzial: "geometria", temat: "planimetria",
      tresc: "Proste $k$ i $l$ są równoległe, a prosta $m$ przecina je obie. Jeden z ośmiu powstałych kątów ma miarę $52^{\\circ}$. **Oceń prawdziwość podanych zdań.** Zaznacz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.",
      czesci: [
        { tekst: "Dokładnie cztery spośród ośmiu kątów mają miarę $128^{\\circ}$.", litery: "PF", poprawna: 0 },
        { tekst: "Kąt jednostronny do kąta o mierze $52^{\\circ}$ ma miarę $52^{\\circ}$.", litery: "PF", poprawna: 1 },
        { tekst: "Kąt naprzemianległy do kąta o mierze $128^{\\circ}$ ma miarę $128^{\\circ}$.", litery: "PF", poprawna: 0 },
      ],
    },
    {
      nr: "11", dzial: "geometria", temat: "planimetria",
      tresc: "Okręgi o promieniach $9$ i $4$ mają środki odległe o $5$. Te okręgi są. **Wybierz właściwą odpowiedź.**",
      opcje: ["styczne zewnętrznie", "styczne wewnętrznie", "przecinające się w dwóch punktach", "rozłączne"],
      poprawna: 1,
    },
    {
      nr: "12", dzial: "geometria", temat: "planimetria",
      tresc: "Okrąg ma promień $10$. Prosta $k$ jest oddalona od jego środka o $6$. Odcinek, który ta prosta wyznacza wewnątrz okręgu (cięciwa), ma długość. **Wybierz właściwą odpowiedź.**",
      opcje: ["$16$", "$8$", "$12$", "$20$"],
      poprawna: 0,
    },
    {
      nr: "13", dzial: "geometria", temat: "planimetria",
      tresc: "Trójkąt ma boki długości $13$, $14$ i $15$ i pole równe $84$. Promień okręgu wpisanego w ten trójkąt jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$2$", "$4$", "$6$", "$8$"],
      poprawna: 1,
    },
    // ---- własności czworokątów ----
    {
      nr: "21", dzial: "geometria", temat: "czworokaty-lo",
      tresc: "Wskaż zdanie fałszywe. **Wybierz właściwą odpowiedź.**",
      opcje: ["Każdy kwadrat jest rombem.", "Każdy romb jest równoległobokiem.", "Każdy równoległobok jest trapezem.", "Każdy prostokąt jest rombem."],
      poprawna: 3,
    },
    {
      nr: "22", dzial: "geometria", temat: "czworokaty-lo",
      tresc: "W trapezie równoramiennym $ABCD$ podstawy $AB$ i $CD$ są równoległe, a kąt ostry przy wierzchołku $A$ ma miarę $72^{\\circ}$. Kąt przy wierzchołku $C$ ma miarę. **Wybierz właściwą odpowiedź.**",
      opcje: ["$72^{\\circ}$", "$98^{\\circ}$", "$108^{\\circ}$", "$118^{\\circ}$"],
      poprawna: 2,
    },
    {
      nr: "23", dzial: "geometria", temat: "czworokaty-lo",
      tresc: "**Oceń prawdziwość podanych zdań.** Zaznacz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.",
      czesci: [
        { tekst: "Przekątne każdego równoległoboku mają równe długości.", litery: "PF", poprawna: 1 },
        { tekst: "W rombie przekątne są prostopadłe.", litery: "PF", poprawna: 0 },
        { tekst: "Punkt przecięcia przekątnych prostokąta jest środkiem każdej z nich.", litery: "PF", poprawna: 0 },
      ],
    },
    // ---- proste i płaszczyzny w przestrzeni ----
    {
      nr: "28", dzial: "geometria", temat: "proste-i-plaszczyzny",
      tresc: "Dany jest prostopadłościan $ABCDEFGH$, w którym $ABCD$ jest podstawą dolną, $EFGH$ – górną, a $AE$, $BF$, $CG$, $DH$ są krawędziami bocznymi. Parą prostych skośnych są proste. **Wybierz właściwą odpowiedź.**",
      opcje: ["$AB$ i $EF$", "$AB$ i $BC$", "$AB$ i $CG$", "$AE$ i $CG$"],
      poprawna: 2,
    },
    {
      nr: "29", dzial: "geometria", temat: "proste-i-plaszczyzny",
      tresc: "Prostopadłościan $ABCDEFGH$ (podstawa dolna $ABCD$, górna $EFGH$, krawędzie boczne $AE$, $BF$, $CG$, $DH$) ma krawędzie $|AB| = 3$, $|AD| = 4$ i $|AE| = 12$. Tangens kąta nachylenia przekątnej $AG$ do płaszczyzny $ABCD$ jest równy. **Wybierz właściwą odpowiedź.**",
      opcje: ["$\\frac{5}{12}$", "$\\frac{12}{13}$", "$3$", "$\\frac{12}{5}$"],
      poprawna: 3,
    },
    {
      nr: "30", dzial: "geometria", temat: "proste-i-plaszczyzny",
      tresc: "Dany jest sześcian $ABCDEFGH$ (podstawa dolna $ABCD$, górna $EFGH$, krawędzie boczne $AE$, $BF$, $CG$, $DH$). **Oceń prawdziwość podanych zdań.** Zaznacz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.",
      czesci: [
        { tekst: "Prosta $AB$ jest prostopadła do płaszczyzny $BCGF$.", litery: "PF", poprawna: 0 },
        { tekst: "Proste $BD$ i $EG$ są równoległe.", litery: "PF", poprawna: 1 },
        { tekst: "Prosta $AB$ jest równoległa do płaszczyzny $EFGH$.", litery: "PF", poprawna: 0 },
      ],
    },
    // ---- stereometria ----
    {
      nr: "34", dzial: "geometria", temat: "stereometria",
      tresc: "Krawędź czworościanu foremnego ma długość $6$. Wysokość tego czworościanu jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$3\\sqrt{3}$", "$2\\sqrt{6}$", "$2\\sqrt{3}$", "$3\\sqrt{2}$"],
      poprawna: 1,
    },
    {
      nr: "35", dzial: "geometria", temat: "stereometria",
      tresc: "Przekrojem osiowym walca jest kwadrat o przekątnej długości $6\\sqrt{2}$. Objętość tego walca jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$54\\pi$", "$108\\pi$", "$18\\pi$", "$162\\pi$"],
      poprawna: 0,
    },
    {
      nr: "36", dzial: "geometria", temat: "stereometria",
      tresc: "Trójkąt prostokątny o przyprostokątnych długości $5$ i $12$ obrócono dookoła dłuższej przyprostokątnej. Objętość otrzymanej bryły jest równa. **Wybierz właściwą odpowiedź.**",
      opcje: ["$300\\pi$", "$100\\pi$", "$240\\pi$", "$60\\pi$"],
      poprawna: 1,
    },
    {
      nr: "37", dzial: "geometria", temat: "stereometria",
      tresc: "Graniastosłup prawidłowy sześciokątny ma krawędź podstawy długości $2$ i wysokość $5$. Pole powierzchni bocznej tego graniastosłupa jest równe. **Wybierz właściwą odpowiedź.**",
      opcje: ["$30$", "$40$", "$60$", "$30\\sqrt{3}$"],
      poprawna: 2,
    },
  ],
  otwarte: [
    // ---- trygonometria ----
    {
      nr: "5", dzial: "geometria", temat: "trygonometria", punkty: 2,
      tresc: "Kąt $\\alpha$ jest ostry i $\\operatorname{ctg} \\alpha = \\frac{12}{5}$. Oblicz $\\sin \\alpha$ i $\\cos \\alpha$. **Zapisz obliczenia.**",
      rozwiazanie: "Z definicji $\\operatorname{tg} \\alpha = \\frac{1}{\\operatorname{ctg} \\alpha} = \\frac{5}{12}$.\n\nPrzyjmijmy trójkąt prostokątny, w którym bok naprzeciw kąta $\\alpha$ ma długość $5k$, a bok przy kącie $\\alpha$ ma $12k$.\n\nPrzeciwprostokątna: $\\sqrt{(5k)^{2} + (12k)^{2}} = \\sqrt{169k^{2}} = 13k$.\n\nStąd $\\sin \\alpha = \\frac{5k}{13k} = \\frac{5}{13}$ i $\\cos \\alpha = \\frac{12k}{13k} = \\frac{12}{13}$.\n\nSprawdzenie: $\\frac{\\cos \\alpha}{\\sin \\alpha} = \\frac{12}{5}$, czyli zgadza się z $\\operatorname{ctg} \\alpha$.\n\nOdpowiedź: $\\sin \\alpha = \\frac{5}{13}$, $\\cos \\alpha = \\frac{12}{13}$.",
    },
    {
      nr: "6", dzial: "geometria", temat: "trygonometria", punkty: 3,
      tresc: "W trójkącie prostokątnym $ABC$ kąt przy wierzchołku $C$ jest prosty, $|AB| = 26$ i $\\operatorname{tg} \\angle A = \\frac{5}{12}$. Oblicz długości przyprostokątnych i pole tego trójkąta. **Zapisz obliczenia.**",
      rozwiazanie: "Tangens kąta $A$ to stosunek przyprostokątnej $BC$ (naprzeciw kąta $A$) do $AC$ (przy kącie $A$). Zatem $|BC| = 5k$, $|AC| = 12k$.\n\nZ twierdzenia Pitagorasa $(5k)^{2} + (12k)^{2} = 26^{2}$, czyli $169k^{2} = 676$, więc $k^{2} = 4$ i $k = 2$.\n\nStąd $|BC| = 10$ i $|AC| = 24$.\n\nPole: $P = \\frac{1}{2} \\cdot 10 \\cdot 24 = 120$.\n\nOdpowiedź: przyprostokątne mają $10$ i $24$, pole jest równe $120$.",
    },
    {
      nr: "7", dzial: "geometria", temat: "trygonometria", punkty: 2,
      tresc: "Kąt $\\alpha$ jest rozwarty i $\\cos \\alpha = -\\frac{7}{25}$. Oblicz $\\sin \\alpha$ i $\\operatorname{tg} \\alpha$. **Zapisz obliczenia.**",
      rozwiazanie: "Z jedynki trygonometrycznej: $\\sin^{2} \\alpha = 1 - \\frac{49}{625} = \\frac{576}{625}$.\n\nDla kąta rozwartego sinus jest dodatni, więc $\\sin \\alpha = \\frac{24}{25}$.\n\nTangens: $\\operatorname{tg} \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha} = \\frac{24}{25} : \\left(-\\frac{7}{25}\\right) = -\\frac{24}{7}$.\n\nOdpowiedź: $\\sin \\alpha = \\frac{24}{25}$, $\\operatorname{tg} \\alpha = -\\frac{24}{7}$.",
    },
    // ---- planimetria ----
    {
      nr: "14", dzial: "geometria", temat: "planimetria", punkty: 2,
      tresc: "Dla jakich całkowitych dodatnich liczb $x$ odcinki o długościach $4$, $x$ i $2x$ są bokami trójkąta? **Zapisz obliczenia.**",
      rozwiazanie: "Odcinki są bokami trójkąta, gdy każdy jest krótszy od sumy dwóch pozostałych.\n\n$2x < 4 + x$, czyli $x < 4$.\n\n$4 < x + 2x$, czyli $x > \\frac{4}{3}$.\n\nNierówność $x < 4 + 2x$ jest zawsze prawdziwa dla $x > 0$.\n\nZatem $\\frac{4}{3} < x < 4$. Liczby całkowite z tego przedziału to $2$ i $3$.\n\nSprawdzenie: dla $x = 2$ boki $4, 2, 4$; dla $x = 3$ boki $4, 3, 6$ – w obu przypadkach nierówność trójkąta jest spełniona.\n\nOdpowiedź: $x = 2$ lub $x = 3$.",
    },
    {
      nr: "15", dzial: "geometria", temat: "planimetria", punkty: 2,
      tresc: "W trójkącie prostokątnym $ABC$ przyprostokątne mają długości $|AC| = 6$ i $|BC| = 8$ (kąt prosty przy wierzchołku $C$). Oblicz odległość środka ciężkości tego trójkąta od wierzchołka $C$. **Zapisz obliczenia.**",
      rozwiazanie: "Z twierdzenia Pitagorasa $|AB| = \\sqrt{36 + 64} = 10$.\n\nŚrodek przeciwprostokątnej jest środkiem okręgu opisanego na trójkącie prostokątnym, więc jest równo oddalony od $A$, $B$ i $C$. Środkowa poprowadzona z wierzchołka $C$ ma zatem długość $\\frac{1}{2} \\cdot 10 = 5$.\n\nŚrodek ciężkości dzieli środkową w stosunku $2 : 1$, licząc od wierzchołka, więc leży w odległości $\\frac{2}{3} \\cdot 5 = \\frac{10}{3}$ od wierzchołka $C$.\n\nOdpowiedź: $\\frac{10}{3}$.",
    },
    {
      nr: "16", dzial: "geometria", temat: "planimetria", punkty: 2,
      tresc: "Pionowy słup rzuca cień długości $4{,}8$ m. W tej samej chwili pionowy patyk o długości $1{,}5$ m rzuca cień długości $0{,}9$ m. Oblicz wysokość słupa. **Zapisz obliczenia.**",
      rozwiazanie: "Promienie słońca padają pod tym samym kątem, więc trójkąty prostokątne utworzone przez słup i jego cień oraz patyk i jego cień mają równe kąty ostre. Trójkąty są podobne (cecha KKK).\n\nProporcja odpowiednich boków: $\\frac{h}{1{,}5} = \\frac{4{,}8}{0{,}9}$.\n\nStąd $h = 1{,}5 \\cdot \\frac{4{,}8}{0{,}9} = 1{,}5 \\cdot \\frac{16}{3} = 8$.\n\nOdpowiedź: słup ma $8$ m wysokości.",
    },
    {
      nr: "17", dzial: "geometria", temat: "planimetria", punkty: 3,
      tresc: "W trójkącie $ABC$ bok $AB$ ma długość $18$. Prosta równoległa do $AB$ przecina bok $AC$ w punkcie $D$, a bok $BC$ w punkcie $E$, przy czym $|DE| = 12$. Pole trójkąta $CDE$ jest równe $32$. Oblicz pole trójkąta $ABC$ i pole czworokąta $ABED$. **Zapisz obliczenia.**",
      rozwiazanie: "Prosta $DE$ jest równoległa do $AB$, więc kąty $CDE$ i $CAB$ są równe (odpowiadające), a kąt przy wierzchołku $C$ jest wspólny. Trójkąty $CDE$ i $CAB$ są podobne (cecha KKK).\n\nSkala podobieństwa trójkąta $CAB$ do $CDE$: $k = \\frac{|AB|}{|DE|} = \\frac{18}{12} = \\frac{3}{2}$.\n\nPola figur podobnych mają się jak kwadrat skali: $P_{ABC} = k^{2} \\cdot P_{CDE} = \\frac{9}{4} \\cdot 32 = 72$.\n\nPole czworokąta (trapezu) $ABED$ to różnica pól: $72 - 32 = 40$.\n\nOdpowiedź: pole trójkąta $ABC$ jest równe $72$, a pole czworokąta $ABED$ jest równe $40$.",
    },
    {
      nr: "18", dzial: "geometria", temat: "planimetria", punkty: 3,
      tresc: "Trójkąt równoramienny ma ramiona długości $13$ i podstawę długości $10$. Oblicz promień okręgu opisanego i promień okręgu wpisanego w ten trójkąt. **Zapisz obliczenia.**",
      rozwiazanie: "Wysokość opuszczona na podstawę dzieli ją na dwie części po $5$. Z Pitagorasa $h = \\sqrt{13^{2} - 5^{2}} = \\sqrt{144} = 12$.\n\nPole trójkąta: $P = \\frac{1}{2} \\cdot 10 \\cdot 12 = 60$.\n\nPromień okręgu opisanego: $R = \\frac{abc}{4P} = \\frac{13 \\cdot 13 \\cdot 10}{4 \\cdot 60} = \\frac{1690}{240} = \\frac{169}{24}$.\n\nPołowa obwodu: $p = \\frac{13 + 13 + 10}{2} = 18$. Promień okręgu wpisanego: $r = \\frac{P}{p} = \\frac{60}{18} = \\frac{10}{3}$.\n\nOdpowiedź: $R = \\frac{169}{24}$, $r = \\frac{10}{3}$.",
    },
    {
      nr: "19", dzial: "geometria", temat: "planimetria", punkty: 2,
      tresc: "Dwa okręgi o promieniach $7$ i $3$ mają dokładnie jeden punkt wspólny. Podaj wszystkie możliwe odległości między środkami tych okręgów. **Zapisz obliczenia.**",
      rozwiazanie: "Dwa okręgi mają dokładnie jeden punkt wspólny, gdy są styczne. Są dwa rodzaje styczności.\n\nStyczność zewnętrzna: odległość środków jest sumą promieni, czyli $d = 7 + 3 = 10$.\n\nStyczność wewnętrzna: odległość środków jest różnicą promieni, czyli $d = 7 - 3 = 4$.\n\nOdpowiedź: $d = 10$ lub $d = 4$.",
    },
    {
      nr: "20", dzial: "geometria", temat: "planimetria", punkty: 1,
      tresc: "Boki trójkąta mają długości $14$, $18$ i $22$. Punkty $D$, $E$, $F$ są środkami boków tego trójkąta. Oblicz obwód trójkąta $DEF$. **Zapisz obliczenia.**",
      rozwiazanie: "Odcinek łączący środki dwóch boków ma połowę długości trzeciego boku. Boki trójkąta $DEF$ mają więc $7$, $9$ i $11$.\n\nObwód: $7 + 9 + 11 = 27$.\n\nOdpowiedź: $27$.",
    },
    // ---- własności czworokątów ----
    {
      nr: "24", dzial: "geometria", temat: "czworokaty-lo", punkty: 3,
      tresc: "Przekątne rombu mają długości $10$ i $24$. Oblicz długość boku, pole i wysokość tego rombu. **Zapisz obliczenia.**",
      rozwiazanie: "Przekątne rombu są prostopadłe i przecinają się w połowie. Bok jest przeciwprostokątną trójkąta o przyprostokątnych $5$ i $12$ (połowy przekątnych).\n\n$a = \\sqrt{5^{2} + 12^{2}} = \\sqrt{169} = 13$.\n\nPole rombu: $P = \\frac{1}{2} \\cdot 10 \\cdot 24 = 120$.\n\nPole rombu liczy się też jako $a \\cdot h$, więc $h = \\frac{120}{13}$.\n\nOdpowiedź: bok ma $13$, pole jest równe $120$, wysokość wynosi $\\frac{120}{13}$.",
    },
    {
      nr: "25", dzial: "geometria", temat: "czworokaty-lo", punkty: 3,
      tresc: "W trapezie równoramiennym $ABCD$ podstawa $AB$ ma długość $14$, podstawa $CD$ ma długość $6$, a ramię ma długość $5$. Oblicz wysokość, pole trapezu i długość odcinka łączącego środki ramion. **Zapisz obliczenia.**",
      rozwiazanie: "Poprowadźmy wysokości z wierzchołków $C$ i $D$ na podstawę $AB$. W trapezie równoramiennym odcinają one od podstawy $AB$ dwa równe odcinki o łącznej długości $14 - 6 = 8$, czyli po $4$.\n\nWysokość z Pitagorasa: $h = \\sqrt{5^{2} - 4^{2}} = 3$.\n\nPole: $P = \\frac{14 + 6}{2} \\cdot 3 = 30$.\n\nOdcinek łączący środki ramion ma długość średniej podstaw: $\\frac{14 + 6}{2} = 10$.\n\nOdpowiedź: wysokość $3$, pole $30$, odcinek łączący środki ramion ma $10$.",
    },
    {
      nr: "26", dzial: "geometria", temat: "czworokaty-lo", punkty: 3,
      tresc: "Na czworokącie $ABCD$ opisano okrąg. Kąty wewnętrzne mają miary $\\angle A = 3x + 10^{\\circ}$, $\\angle B = 2x + 20^{\\circ}$, $\\angle C = 5x - 30^{\\circ}$. Oblicz miarę kąta $D$. **Zapisz obliczenia.**",
      rozwiazanie: "Czworokąt jest wpisany w okrąg, więc sumy kątów przeciwległych wynoszą $180^{\\circ}$: $\\angle A + \\angle C = 180^{\\circ}$.\n\n$(3x + 10) + (5x - 30) = 180$, czyli $8x - 20 = 180$, więc $x = 25$.\n\nStąd $\\angle A = 85^{\\circ}$, $\\angle B = 70^{\\circ}$, $\\angle C = 95^{\\circ}$.\n\nSuma kątów czworokąta wynosi $360^{\\circ}$, więc $\\angle D = 360^{\\circ} - 85^{\\circ} - 70^{\\circ} - 95^{\\circ} = 110^{\\circ}$.\n\nSprawdzenie: $\\angle B + \\angle D = 70^{\\circ} + 110^{\\circ} = 180^{\\circ}$.\n\nOdpowiedź: $\\angle D = 110^{\\circ}$.",
    },
    {
      nr: "27", dzial: "geometria", temat: "czworokaty-lo", punkty: 2,
      tresc: "W czworokąt, którego kolejne boki mają długości $x$, $6$, $x + 5$ i $9$, można wpisać okrąg. Oblicz $x$ i obwód czworokąta. **Zapisz obliczenia.**",
      rozwiazanie: "W czworokąt można wpisać okrąg, gdy sumy długości boków przeciwległych są równe. Boki przeciwległe to $x$ i $x + 5$ oraz $6$ i $9$.\n\n$x + (x + 5) = 6 + 9$, czyli $2x + 5 = 15$, więc $x = 5$.\n\nBoki mają długości $5$, $6$, $10$, $9$, więc obwód to $5 + 6 + 10 + 9 = 30$.\n\nOdpowiedź: $x = 5$, obwód jest równy $30$.",
    },
    // ---- proste i płaszczyzny w przestrzeni ----
    {
      nr: "31", dzial: "geometria", temat: "proste-i-plaszczyzny", punkty: 3,
      tresc: "Dany jest sześcian $ABCDEFGH$ o krawędzi $6$ (podstawa dolna $ABCD$, górna $EFGH$, krawędzie boczne $AE$, $BF$, $CG$, $DH$). Oblicz długość przekątnej $AG$ sześcianu i tangens kąta, jaki ta przekątna tworzy z płaszczyzną $ABCD$. **Zapisz obliczenia.**",
      rozwiazanie: "Rzutem prostokątnym punktu $G$ na płaszczyznę $ABCD$ jest punkt $C$, więc rzutem odcinka $AG$ jest przekątna podstawy $AC$. Szukany kąt to kąt $GAC$ w trójkącie prostokątnym $ACG$ (kąt prosty przy $C$).\n\n$|AC| = 6\\sqrt{2}$ (przekątna kwadratu), $|CG| = 6$.\n\n$|AG| = \\sqrt{(6\\sqrt{2})^{2} + 6^{2}} = \\sqrt{72 + 36} = \\sqrt{108} = 6\\sqrt{3}$.\n\n$\\operatorname{tg} \\angle GAC = \\frac{|CG|}{|AC|} = \\frac{6}{6\\sqrt{2}} = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$.\n\nOdpowiedź: $|AG| = 6\\sqrt{3}$, tangens kąta jest równy $\\frac{\\sqrt{2}}{2}$.",
    },
    {
      nr: "32", dzial: "geometria", temat: "proste-i-plaszczyzny", punkty: 3,
      tresc: "Podstawą ostrosłupa prawidłowego czworokątnego $ABCDS$ jest kwadrat $ABCD$ o boku $8$, a punkt $S$ jest szczytem. Wysokość ściany bocznej $ABS$ (odcinek $SM$, gdzie $M$ jest środkiem krawędzi $AB$) ma długość $5$. Niech $O$ będzie środkiem podstawy. Oblicz tangens kąta nachylenia ściany bocznej do płaszczyzny podstawy oraz objętość ostrosłupa. **Zapisz obliczenia.**",
      rozwiazanie: "Odcinek $OM$ jest rzutem prostokątnym odcinka $SM$ na płaszczyznę podstawy i jest prostopadły do krawędzi $AB$. Z twierdzenia o trzech prostych prostopadłych także $SM \\perp AB$. Zatem kąt $SMO$ jest kątem nachylenia ściany bocznej do podstawy.\n\n$|OM| = \\frac{1}{2} \\cdot 8 = 4$. W trójkącie prostokątnym $SOM$ (kąt prosty przy $O$): $|SO| = \\sqrt{5^{2} - 4^{2}} = 3$.\n\n$\\operatorname{tg} \\angle SMO = \\frac{|SO|}{|OM|} = \\frac{3}{4}$.\n\nObjętość: $V = \\frac{1}{3} \\cdot 8^{2} \\cdot 3 = 64$.\n\nOdpowiedź: tangens kąta jest równy $\\frac{3}{4}$, objętość wynosi $64$.",
    },
    {
      nr: "33", dzial: "geometria", temat: "proste-i-plaszczyzny", punkty: 2,
      tresc: "W prostopadłościanie $ABCDEFGH$ (podstawa dolna $ABCD$, górna $EFGH$, krawędzie boczne $AE$, $BF$, $CG$, $DH$) przekątna $AG$ ma długość $14$ i tworzy z płaszczyzną podstawy $ABCD$ kąt $30^{\\circ}$. Oblicz długość krawędzi bocznej $CG$ i długość przekątnej podstawy $AC$. **Zapisz obliczenia.**",
      rozwiazanie: "Rzutem odcinka $AG$ na płaszczyznę $ABCD$ jest odcinek $AC$, a $CG$ jest prostopadły do podstawy. W trójkącie prostokątnym $ACG$ kąt $GAC$ ma $30^{\\circ}$, a przeciwprostokątna $AG$ ma $14$.\n\n$|CG| = |AG| \\cdot \\sin 30^{\\circ} = 14 \\cdot \\frac{1}{2} = 7$.\n\n$|AC| = |AG| \\cdot \\cos 30^{\\circ} = 14 \\cdot \\frac{\\sqrt{3}}{2} = 7\\sqrt{3}$.\n\nOdpowiedź: $|CG| = 7$, $|AC| = 7\\sqrt{3}$.",
    },
    // ---- stereometria ----
    {
      nr: "38", dzial: "geometria", temat: "stereometria", punkty: 3,
      tresc: "Podstawą ostrosłupa prawidłowego trójkątnego jest trójkąt równoboczny o boku $6$, a krawędź boczna ma długość $4$. Oblicz objętość tego ostrosłupa i miarę kąta nachylenia krawędzi bocznej do płaszczyzny podstawy. **Zapisz obliczenia.**",
      rozwiazanie: "Spodek wysokości leży w środku podstawy. Jego odległość od wierzchołka podstawy: $R = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}$.\n\nWysokość: $h^{2} = 4^{2} - (2\\sqrt{3})^{2} = 16 - 12 = 4$, więc $h = 2$.\n\nPole podstawy: $P_{p} = \\frac{6^{2}\\sqrt{3}}{4} = 9\\sqrt{3}$. Objętość: $V = \\frac{1}{3} \\cdot 9\\sqrt{3} \\cdot 2 = 6\\sqrt{3}$.\n\nKąt $\\alpha$ krawędzi bocznej z podstawą: $\\operatorname{tg} \\alpha = \\frac{h}{R} = \\frac{2}{2\\sqrt{3}} = \\frac{\\sqrt{3}}{3}$, więc $\\alpha = 30^{\\circ}$.\n\nOdpowiedź: $V = 6\\sqrt{3}$, $\\alpha = 30^{\\circ}$.",
    },
    {
      nr: "39", dzial: "geometria", temat: "stereometria", punkty: 3,
      tresc: "Podstawą ostrosłupa prawidłowego sześciokątnego jest sześciokąt foremny o boku $4$, a krawędź boczna ma długość $8$. Oblicz objętość tego ostrosłupa i miarę kąta nachylenia krawędzi bocznej do płaszczyzny podstawy. **Zapisz obliczenia.**",
      rozwiazanie: "W sześciokącie foremnym odległość środka od wierzchołka jest równa jego bokowi, więc $R = 4$.\n\nWysokość: $h^{2} = 8^{2} - 4^{2} = 48$, więc $h = 4\\sqrt{3}$.\n\nPole podstawy: $P_{p} = \\frac{3 \\cdot 4^{2} \\cdot \\sqrt{3}}{2} = 24\\sqrt{3}$.\n\nObjętość: $V = \\frac{1}{3} \\cdot 24\\sqrt{3} \\cdot 4\\sqrt{3} = \\frac{1}{3} \\cdot 24 \\cdot 4 \\cdot 3 = 96$.\n\nKąt $\\alpha$ krawędzi bocznej z podstawą: $\\cos \\alpha = \\frac{R}{k} = \\frac{4}{8} = \\frac{1}{2}$, więc $\\alpha = 60^{\\circ}$.\n\nOdpowiedź: $V = 96$, $\\alpha = 60^{\\circ}$.",
    },
    {
      nr: "40", dzial: "geometria", temat: "stereometria", punkty: 3,
      tresc: "Trójkąt prostokątny o bokach $6$, $8$ i $10$ obracamy dookoła przeciwprostokątnej. Oblicz objętość i pole powierzchni otrzymanej bryły. **Zapisz obliczenia.**",
      rozwiazanie: "Powstaje bryła złożona z dwóch stożków sklejonych podstawami. Wspólny promień podstawy to wysokość $r$ opuszczona na przeciwprostokątną: $r = \\frac{6 \\cdot 8}{10} = 4{,}8$.\n\nWysokości obu stożków dają razem przeciwprostokątną, czyli $10$. Objętość to suma objętości stożków: $V = \\frac{1}{3}\\pi r^{2}(h_{1} + h_{2}) = \\frac{1}{3}\\pi \\cdot 23{,}04 \\cdot 10 = 76{,}8\\pi$.\n\nTworzące stożków to przyprostokątne $6$ i $8$. Pole powierzchni: $P = \\pi r \\cdot 6 + \\pi r \\cdot 8 = \\pi \\cdot 4{,}8 \\cdot 14 = 67{,}2\\pi$.\n\nOdpowiedź: $V = 76{,}8\\pi$, $P = 67{,}2\\pi$.",
    },
    {
      nr: "41", dzial: "geometria", temat: "stereometria", punkty: 3,
      tresc: "Kąt rozwarcia stożka wynosi $60^{\\circ}$, a jego tworząca ma długość $10$. Oblicz pole przekroju osiowego i objętość tego stożka. **Zapisz obliczenia.**",
      rozwiazanie: "Przekrój osiowy to trójkąt równoramienny o ramionach $10$ i kącie $60^{\\circ}$ przy wierzchołku, więc jest równoboczny, a jego bok to $10$. Zatem średnica podstawy to $10$, czyli $r = 5$.\n\nWysokość stożka to wysokość trójkąta równobocznego: $h = \\frac{10\\sqrt{3}}{2} = 5\\sqrt{3}$.\n\nPole przekroju osiowego: $\\frac{1}{2} \\cdot 10 \\cdot 5\\sqrt{3} = 25\\sqrt{3}$.\n\nObjętość: $V = \\frac{1}{3}\\pi \\cdot 5^{2} \\cdot 5\\sqrt{3} = \\frac{125\\sqrt{3}}{3}\\pi$.\n\nOdpowiedź: pole przekroju to $25\\sqrt{3}$, objętość to $\\frac{125\\sqrt{3}}{3}\\pi$.",
    },
  ],
};
