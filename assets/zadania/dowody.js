// Zadania do ćwiczeń – Dowody (matura, zakres podstawowy): dowody algebraiczne i geometryczne.
// Ułożone dla strony (nie z arkuszy CKE). Format jak arkusz (tools/test-arkusze.mjs). Same zadania otwarte, po 2 punkty.
export default {
  nazwa: "Zadania do ćwiczeń – Dowody",
  zadania: [],
  otwarte: [
    // ---- dowody algebraiczne ----
    {
      nr: "1", dzial: "dowody", temat: "dowody-algebraiczne", punkty: 2,
      tresc: "Udowodnij, że różnica kwadratów dwóch kolejnych liczb nieparzystych (większa liczba do kwadratu minus mniejsza liczba do kwadratu) jest podzielna przez $8$. **Zapisz dowód.**",
      rozwiazanie: "**Pomysł:** Zapisz dwie kolejne liczby nieparzyste literą $k$, a potem zamień różnicę kwadratów na iloczyn.\n\nNiech $k$ będzie liczbą całkowitą. Liczba $2k + 1$ jest nieparzysta, a następna nieparzysta to $2k + 3$ (kolejne nieparzyste różnią się o $2$).\n\nPiszemy różnicę kwadratów i stosujemy wzór $a^2 - b^2 = (a - b)(a + b)$:\n\n$(2k + 3)^2 - (2k + 1)^2 = \\big((2k + 3) - (2k + 1)\\big)\\big((2k + 3) + (2k + 1)\\big)$.\n\nUpraszczamy oba nawiasy: pierwszy jest równy $2$, a drugi $4k + 4$, więc całość to $2 \\cdot (4k + 4) = 8k + 8 = 8(k + 1)$.\n\nLiczba $k + 1$ jest całkowita (bo $k$ jest całkowita), więc cała różnica jest $8$ razy liczba całkowita, czyli dzieli się przez $8$. To kończy dowód.",
    },
    {
      nr: "2", dzial: "dowody", temat: "dowody-algebraiczne", punkty: 2,
      tresc: "Wykaż, że dla każdej liczby rzeczywistej $x$ prawdziwa jest nierówność $x^2 - 5x + 7 > 0$. **Zapisz dowód.**",
      rozwiazanie: "**Pomysł:** Zwiń wyrażenie do postaci „kwadrat plus liczba dodatnia”, bo kwadrat nigdy nie jest ujemny.\n\nZapisujemy $7 = \\frac{25}{4} + \\frac{3}{4}$, bo $\\frac{25}{4}$ jest kwadratem liczby $\\frac{5}{2}$, a $\\frac{25}{4} + \\frac{3}{4} = \\frac{28}{4} = 7$.\n\nWtedy $x^2 - 5x + 7 = \\left(x^2 - 5x + \\frac{25}{4}\\right) + \\frac{3}{4}$.\n\nWyrażenie w nawiasie to wzór skróconego mnożenia: $x^2 - 2 \\cdot x \\cdot \\frac{5}{2} + \\left(\\frac{5}{2}\\right)^2 = \\left(x - \\frac{5}{2}\\right)^2$. Zatem $x^2 - 5x + 7 = \\left(x - \\frac{5}{2}\\right)^2 + \\frac{3}{4}$.\n\nKwadrat każdej liczby rzeczywistej jest nieujemny, więc $\\left(x - \\frac{5}{2}\\right)^2 \\geq 0$, a stąd $\\left(x - \\frac{5}{2}\\right)^2 + \\frac{3}{4} \\geq \\frac{3}{4} > 0$.\n\nZatem $x^2 - 5x + 7 > 0$ dla każdej liczby rzeczywistej $x$. To kończy dowód.",
    },
    {
      nr: "3", dzial: "dowody", temat: "dowody-algebraiczne", punkty: 2,
      tresc: "Wykaż, że suma czterech kolejnych liczb całkowitych przy dzieleniu przez $4$ daje resztę $2$. **Zapisz dowód.**",
      rozwiazanie: "**Pomysł:** Oznacz pierwszą z czterech liczb literą $n$, zapisz pozostałe przez $n$ i dodaj wszystkie cztery.\n\nNiech $n$ będzie liczbą całkowitą. Cztery kolejne liczby całkowite to $n$, $n + 1$, $n + 2$, $n + 3$.\n\nIch suma jest równa $n + (n + 1) + (n + 2) + (n + 3) = 4n + 6$.\n\nRozdzielamy $6 = 4 + 2$, więc $4n + 6 = 4n + 4 + 2 = 4(n + 1) + 2$.\n\nLiczba $n + 1$ jest całkowita, więc $4(n + 1)$ dzieli się przez $4$. Do tego dodajemy $2$, a $2 < 4$, więc $2$ jest resztą z dzielenia przez $4$.\n\nZatem suma czterech kolejnych liczb całkowitych daje przy dzieleniu przez $4$ resztę $2$. To kończy dowód.",
    },
    {
      nr: "4", dzial: "dowody", temat: "dowody-algebraiczne", punkty: 2,
      tresc: "Udowodnij, że iloczyn dwóch kolejnych liczb parzystych jest podzielny przez $8$. **Zapisz dowód.**",
      rozwiazanie: "**Pomysł:** Zapisz dwie kolejne liczby parzyste jako $2k$ i $2k + 2$, wymnóż i wyłącz przed nawias $4$; potem zauważ, że w pozostałym iloczynie jest czynnik parzysty.\n\nNiech $k$ będzie liczbą całkowitą. Kolejne liczby parzyste to $2k$ i $2k + 2$ (różnią się o $2$).\n\nIch iloczyn to $2k(2k + 2) = 2k \\cdot 2(k + 1) = 4k(k + 1)$.\n\nLiczby $k$ i $k + 1$ są kolejnymi liczbami całkowitymi, więc jedna z nich jest parzysta. Dlatego iloczyn $k(k + 1)$ jest parzysty, czyli $k(k + 1) = 2m$ dla pewnej liczby całkowitej $m$.\n\nWstawiamy to do iloczynu: $4k(k + 1) = 4 \\cdot 2m = 8m$.\n\nIloczyn jest równy $8$ razy liczba całkowita $m$, więc dzieli się przez $8$. To kończy dowód.",
    },
    {
      nr: "5", dzial: "dowody", temat: "dowody-algebraiczne", punkty: 2,
      tresc: "Wykaż, że dla dowolnych liczb rzeczywistych $a$ i $b$ prawdziwa jest nierówność $a^2 + b^2 - 4a + 2b + 5 \\geq 0$. Podaj, dla jakich $a$ i $b$ zachodzi równość. **Zapisz dowód.**",
      rozwiazanie: "**Pomysł:** Rozłóż liczbę $5$ na $4 + 1$ i zbierz wyrazy tak, żeby powstały dwa kwadraty.\n\nZapisujemy $5 = 4 + 1$ i grupujemy wyrazy z $a$ oraz wyrazy z $b$:\n\n$a^2 + b^2 - 4a + 2b + 5 = (a^2 - 4a + 4) + (b^2 + 2b + 1)$.\n\nZ wzorów skróconego mnożenia: $a^2 - 4a + 4 = (a - 2)^2$ oraz $b^2 + 2b + 1 = (b + 1)^2$.\n\nZatem całe wyrażenie jest równe $(a - 2)^2 + (b + 1)^2$.\n\nKażdy kwadrat liczby rzeczywistej jest nieujemny, więc suma dwóch kwadratów też jest nieujemna: $(a - 2)^2 + (b + 1)^2 \\geq 0$. To jest teza.\n\nRówność zachodzi tylko wtedy, gdy oba kwadraty są zerami, czyli $a - 2 = 0$ i $b + 1 = 0$, a więc dla $a = 2$ i $b = -1$. To kończy dowód.",
    },
    {
      nr: "6", dzial: "dowody", temat: "dowody-algebraiczne", punkty: 2,
      tresc: "Wykaż, że jeśli liczba całkowita $n$ nie dzieli się przez $3$, to liczba $n^2$ przy dzieleniu przez $3$ daje resztę $1$. **Zapisz dowód.**",
      rozwiazanie: "**Pomysł:** Liczba niepodzielna przez $3$ ma przy dzieleniu przez $3$ resztę $1$ albo $2$; rozpatrz te dwa przypadki osobno.\n\nLiczba całkowita $n$ ma przy dzieleniu przez $3$ resztę $0$, $1$ albo $2$. Reszta $0$ jest wykluczona (bo $n$ nie dzieli się przez $3$), więc $n = 3k + 1$ albo $n = 3k + 2$, gdzie $k$ jest liczbą całkowitą.\n\nPrzypadek 1: $n = 3k + 1$. Wtedy $n^2 = 9k^2 + 6k + 1 = 3(3k^2 + 2k) + 1$.\n\nPrzypadek 2: $n = 3k + 2$. Wtedy $n^2 = 9k^2 + 12k + 4 = 9k^2 + 12k + 3 + 1 = 3(3k^2 + 4k + 1) + 1$.\n\nW obu przypadkach liczba w nawiasie jest całkowita, więc $n^2$ jest równe $3$ razy liczba całkowita plus $1$, czyli daje resztę $1$ przy dzieleniu przez $3$. To kończy dowód.",
    },
    {
      nr: "7", dzial: "dowody", temat: "dowody-algebraiczne", punkty: 2,
      tresc: "Wykaż, że dla dowolnych liczb dodatnich $a$ i $b$ prawdziwa jest nierówność $(a + b)\\left(\\frac{1}{a} + \\frac{1}{b}\\right) \\geq 4$. **Zapisz dowód.**",
      rozwiazanie: "**Pomysł:** Zamień sumę ułamków na jeden ułamek, a potem pokaż, że różnica lewej strony i liczby $4$ jest ułamkiem o nieujemnym liczniku.\n\nSumę ułamków sprowadzamy do wspólnego mianownika: $\\frac{1}{a} + \\frac{1}{b} = \\frac{b + a}{ab} = \\frac{a + b}{ab}$.\n\nWtedy lewa strona jest równa $(a + b) \\cdot \\frac{a + b}{ab} = \\frac{(a + b)^2}{ab}$.\n\nObliczamy jej różnicę z liczbą $4$: $\\frac{(a + b)^2}{ab} - 4 = \\frac{(a + b)^2 - 4ab}{ab} = \\frac{a^2 + 2ab + b^2 - 4ab}{ab} = \\frac{a^2 - 2ab + b^2}{ab} = \\frac{(a - b)^2}{ab}$.\n\nLicznik $(a - b)^2$ jest nieujemny (kwadrat), a mianownik $ab$ jest dodatni (bo $a > 0$ i $b > 0$). Ułamek o nieujemnym liczniku i dodatnim mianowniku jest nieujemny, więc $\\frac{(a + b)^2}{ab} - 4 \\geq 0$.\n\nStąd $(a + b)\\left(\\frac{1}{a} + \\frac{1}{b}\\right) \\geq 4$ (równość zachodzi dla $a = b$). To kończy dowód.",
    },
    {
      nr: "8", dzial: "dowody", temat: "dowody-algebraiczne", punkty: 2,
      tresc: "Wykaż, że liczba $27^5 + 9^7$ jest podzielna przez $12$. **Zapisz dowód.**",
      rozwiazanie: "**Pomysł:** Zapisz obie liczby jako potęgi liczby $3$, wyłącz przed nawias mniejszą potęgę i wyciągnij czynnik $12$.\n\nPotęgi zamieniamy na potęgi liczby $3$: $27^5 = (3^3)^5 = 3^{15}$ oraz $9^7 = (3^2)^7 = 3^{14}$.\n\nZatem $27^5 + 9^7 = 3^{15} + 3^{14}$.\n\nWyłączamy przed nawias $3^{14}$ (bo $3^{15} = 3^{14} \\cdot 3$): $3^{15} + 3^{14} = 3^{14}(3 + 1) = 4 \\cdot 3^{14}$.\n\nRozdzielamy $3^{14} = 3 \\cdot 3^{13}$, więc $4 \\cdot 3^{14} = 4 \\cdot 3 \\cdot 3^{13} = 12 \\cdot 3^{13}$.\n\nLiczba $3^{13}$ jest całkowita, więc cała liczba jest $12$ razy liczba całkowita, czyli dzieli się przez $12$. To kończy dowód.",
    },
    // ---- dowody geometryczne ----
    {
      nr: "9", dzial: "dowody", temat: "dowody-geometryczne", punkty: 2,
      tresc: "Trójkąt $ABC$ jest równoramienny, jego ramiona to $AC$ i $BC$. Punkt $D$ leży na ramieniu $AC$, a punkt $E$ leży na ramieniu $BC$ (oba punkty są różne od wierzchołków trójkąta), przy czym $|AD| = |BE|$. Wykaż, że $|BD| = |AE|$. **Zapisz dowód.**",
      rozwiazanie: "**Pomysł:** Porównaj trójkąty $ABD$ i $BAE$ i pokaż, że są przystające (cecha bkb).\n\nTrójkąt $ABC$ jest równoramienny z podstawą $AB$, więc kąty przy podstawie są równe: $\\angle CAB = \\angle CBA$.\n\nPunkt $D$ leży na półprostej $AC$, więc $\\angle DAB = \\angle CAB$. Punkt $E$ leży na półprostej $BC$, więc $\\angle EBA = \\angle CBA$. Stąd $\\angle DAB = \\angle EBA$.\n\nW trójkątach $ABD$ i $BAE$ mamy: $|AB| = |BA|$ (wspólny bok), $|AD| = |BE|$ (z założenia) oraz $\\angle DAB = \\angle EBA$ (kąty między tymi bokami).\n\nTe trójkąty mają więc dwa boki równe i równy kąt między nimi, czyli są przystające (cecha bkb).\n\nW przystających trójkątach równe są boki leżące naprzeciw równych kątów. Bok $BD$ leży naprzeciw kąta przy wierzchołku $A$, a bok $AE$ naprzeciw kąta przy wierzchołku $B$, więc $|BD| = |AE|$. To kończy dowód.",
    },
    {
      nr: "10", dzial: "dowody", temat: "dowody-geometryczne", punkty: 2,
      tresc: "Dany jest równoległobok $ABCD$. Dwusieczne kątów $DAB$ i $ABC$ przecinają się w punkcie $P$. Udowodnij, że kąt $APB$ jest prosty. **Zapisz dowód.**",
      rozwiazanie: "**Pomysł:** Oznacz kąty równoległoboku przy boku $AB$ literami $\\alpha$ i $\\beta$ i policz kąty trójkąta $ABP$.\n\nNiech $\\angle DAB = \\alpha$ i $\\angle ABC = \\beta$.\n\nBoki $AD$ i $BC$ są równoległe, a prosta $AB$ je przecina. Kąty $\\alpha$ i $\\beta$ są kątami jednostronnymi, więc $\\alpha + \\beta = 180^\\circ$.\n\nPółproste $AP$ i $BP$ są dwusiecznymi, więc $\\angle PAB = \\frac{\\alpha}{2}$ oraz $\\angle PBA = \\frac{\\beta}{2}$.\n\nSuma kątów trójkąta $ABP$ wynosi $180^\\circ$, więc $\\angle APB = 180^\\circ - \\frac{\\alpha}{2} - \\frac{\\beta}{2} = 180^\\circ - \\frac{\\alpha + \\beta}{2}$.\n\nPodstawiamy $\\alpha + \\beta = 180^\\circ$: $\\angle APB = 180^\\circ - \\frac{180^\\circ}{2} = 180^\\circ - 90^\\circ = 90^\\circ$.\n\nKąt $APB$ jest prosty. To kończy dowód.",
    },
    {
      nr: "11", dzial: "dowody", temat: "dowody-geometryczne", punkty: 2,
      tresc: "Punkty $A$, $B$ i $C$ leżą na okręgu o środku $O$. Kąt wpisany $ACB$ jest ostry i ma miarę $\\gamma$. Wykaż, że kąt $OAB$ ma miarę $90^\\circ - \\gamma$. **Zapisz dowód.**",
      rozwiazanie: "**Pomysł:** Skorzystaj z zależności między kątem wpisanym i środkowym, a potem z tego, że trójkąt $AOB$ jest równoramienny.\n\nKąt środkowy $AOB$ jest oparty na tym samym łuku co kąt wpisany $ACB$, więc jest dwa razy większy: $\\angle AOB = 2\\gamma$.\n\nOdcinki $OA$ i $OB$ są promieniami tego samego okręgu, więc $|OA| = |OB|$, czyli trójkąt $AOB$ jest równoramienny. Kąty przy jego podstawie $AB$ są równe: $\\angle OAB = \\angle OBA$. Oznaczmy ich miarę przez $x$.\n\nSuma kątów trójkąta $AOB$ wynosi $180^\\circ$, więc $2\\gamma + x + x = 180^\\circ$.\n\nStąd $2x = 180^\\circ - 2\\gamma$, a po podzieleniu przez $2$ mamy $x = 90^\\circ - \\gamma$.\n\nZatem $\\angle OAB = 90^\\circ - \\gamma$. To kończy dowód.",
    },
    {
      nr: "12", dzial: "dowody", temat: "dowody-geometryczne", punkty: 2,
      tresc: "W trapezie $ABCD$ podstawy $AB$ i $CD$ są równoległe, a przekątne $AC$ i $BD$ przecinają się w punkcie $S$. Wykaż, że $|AS| \\cdot |DS| = |BS| \\cdot |CS|$. **Zapisz dowód.**",
      rozwiazanie: "**Pomysł:** Pokaż, że trójkąty $ABS$ i $CDS$ są podobne, zapisz proporcję boków i pomnóż „na krzyż”.\n\nBoki $AB$ i $CD$ są równoległe. Przekątna $AC$ jest ich sieczną, więc kąty naprzemianległe są równe: $\\angle BAS = \\angle DCS$.\n\nPrzekątna $BD$ też jest sieczną, więc $\\angle ABS = \\angle CDS$ (kąty naprzemianległe).\n\nTrójkąty $ABS$ i $CDS$ mają dwa kąty równe, więc są podobne (cecha kk). Wierzchołkom $A$, $B$, $S$ odpowiadają wierzchołki $C$, $D$, $S$.\n\nZ podobieństwa mamy równość stosunków odpowiednich boków: $\\frac{|AS|}{|CS|} = \\frac{|BS|}{|DS|}$.\n\nMnożymy obie strony przez $|CS| \\cdot |DS|$ i dostajemy $|AS| \\cdot |DS| = |BS| \\cdot |CS|$. To kończy dowód.",
    },
    {
      nr: "13", dzial: "dowody", temat: "dowody-geometryczne", punkty: 2,
      tresc: "W trójkącie $ABC$ punkt $M$ jest środkiem boku $AB$, a punkt $P$ leży wewnątrz odcinka $CM$. Wykaż, że pola trójkątów $APC$ i $BPC$ są równe. **Zapisz dowód.**",
      rozwiazanie: "**Pomysł:** Porównaj pola trójkątów o równych podstawach i wspólnej wysokości, a potem odejmij od siebie części trójkątów.\n\nTrójkąty $AMC$ i $BMC$ mają podstawy $AM$ i $MB$ leżące na jednej prostej $AB$, a ich wspólna wysokość to odległość punktu $C$ od prostej $AB$. Ponieważ $|AM| = |MB|$ ($M$ jest środkiem), pola tych trójkątów są równe.\n\nTrójkąty $AMP$ i $BMP$ też mają równe podstawy $AM$ i $MB$ na prostej $AB$ i wspólną wysokość – odległość punktu $P$ od prostej $AB$. Ich pola są więc równe.\n\nPunkt $P$ leży na boku $CM$ trójkąta $AMC$, więc odcinek $AP$ dzieli ten trójkąt na trójkąty $AMP$ i $APC$. Zatem pole $APC$ = pole $AMC$ − pole $AMP$. Tak samo pole $BPC$ = pole $BMC$ − pole $BMP$.\n\nW obu różnicach odjemna i odjemnik są odpowiednio równe (z dwóch pierwszych kroków), więc różnice są równe: pole $APC$ = pole $BPC$. To kończy dowód.",
    },
    {
      nr: "14", dzial: "dowody", temat: "dowody-geometryczne", punkty: 2,
      tresc: "Punkty $K$, $L$, $M$ i $N$ są środkami boków $AB$, $BC$, $CD$ i $DA$ wypukłego czworokąta $ABCD$. Udowodnij, że czworokąt $KLMN$ jest równoległobokiem. **Zapisz dowód.**",
      rozwiazanie: "**Pomysł:** Poprowadź przekątną $AC$ i dwa razy skorzystaj z własności odcinka łączącego środki dwóch boków trójkąta.\n\nW trójkącie $ABC$ punkty $K$ i $L$ są środkami boków $AB$ i $BC$. Odcinek $KL$ łączy środki dwóch boków, więc $KL \\parallel AC$ oraz $|KL| = \\frac{1}{2}|AC|$.\n\nW trójkącie $ACD$ punkty $M$ i $N$ są środkami boków $CD$ i $DA$. Tak samo $NM \\parallel AC$ oraz $|NM| = \\frac{1}{2}|AC|$.\n\nOba odcinki $KL$ i $NM$ są równoległe do $AC$, więc są równoległe do siebie. Mają też tę samą długość $\\frac{1}{2}|AC|$.\n\nCzworokąt $KLMN$ ma parę przeciwległych boków $KL$ i $MN$, które są równoległe i równej długości, więc jest równoległobokiem. To kończy dowód.",
    },
    {
      nr: "15", dzial: "dowody", temat: "dowody-geometryczne", punkty: 2,
      tresc: "Przekątne równoległoboku $ABCD$ przecinają się w punkcie $E$. Przez punkt $E$ poprowadzono prostą, która przecina bok $AB$ w punkcie $K$, a bok $CD$ w punkcie $L$ (punkty $K$ i $L$ są różne od wierzchołków). Wykaż, że $|EK| = |EL|$. **Zapisz dowód.**",
      rozwiazanie: "**Pomysł:** Pokaż, że trójkąty $AEK$ i $CEL$ są przystające (cecha kbk).\n\nPrzekątne równoległoboku przecinają się w połowie, więc $|AE| = |CE|$.\n\nKąty $AEK$ i $CEL$ są wierzchołkowe (punkty $A$, $E$, $C$ leżą na jednej prostej i punkty $K$, $E$, $L$ też), więc $\\angle AEK = \\angle CEL$.\n\nBoki $AB$ i $CD$ są równoległe, a prosta $AC$ jest ich sieczną, więc kąty naprzemianległe są równe: $\\angle CAB = \\angle ACD$. Punkt $K$ leży na boku $AB$, a punkt $L$ na boku $CD$, więc $\\angle EAK = \\angle CAB$ i $\\angle ECL = \\angle ACD$. Stąd $\\angle EAK = \\angle ECL$.\n\nTrójkąty $AEK$ i $CEL$ mają równy bok $AE$ i $CE$ oraz równe oba kąty do niego przyległe, czyli są przystające (cecha kbk).\n\nW przystających trójkątach równe są boki leżące naprzeciw równych kątów: bok $EK$ leży naprzeciw kąta przy $A$, a bok $EL$ naprzeciw kąta przy $C$. Zatem $|EK| = |EL|$. To kończy dowód.",
    },
    {
      nr: "16", dzial: "dowody", temat: "dowody-geometryczne", punkty: 2,
      tresc: "W trójkącie $ABC$ punkt $D$ leży na boku $CA$, a punkt $E$ leży na boku $CB$. Odcinek $DE$ jest równoległy do boku $AB$, a $|CD| : |CA| = 2 : 5$. Wykaż, że pole trójkąta $CDE$ stanowi $\\frac{4}{25}$ pola trójkąta $ABC$. **Zapisz dowód.**",
      rozwiazanie: "**Pomysł:** Pokaż, że trójkąty $CDE$ i $CAB$ są podobne, wyznacz skalę podobieństwa, a pola porównaj jako kwadrat skali.\n\nTrójkąty $CDE$ i $CAB$ mają wspólny kąt przy wierzchołku $C$.\n\nProste $DE$ i $AB$ są równoległe, a prosta $CA$ je przecina, więc kąty odpowiadające są równe: $\\angle CDE = \\angle CAB$.\n\nTrójkąty mają dwa kąty równe, więc są podobne (cecha kk). Wierzchołkom $C$, $D$, $E$ odpowiadają wierzchołki $C$, $A$, $B$.\n\nSkala podobieństwa to stosunek odpowiadających boków: $k = \\frac{|CD|}{|CA|} = \\frac{2}{5}$.\n\nPola trójkątów podobnych mają się do siebie jak kwadrat skali: $\\frac{P_{CDE}}{P_{ABC}} = k^2 = \\left(\\frac{2}{5}\\right)^2 = \\frac{4}{25}$.\n\nZatem pole trójkąta $CDE$ stanowi $\\frac{4}{25}$ pola trójkąta $ABC$. To kończy dowód.",
    },
  ],
};
