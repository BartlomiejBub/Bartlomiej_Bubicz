// Klasa 6 (szkoła podstawowa) · rozdział IV „Figury na płaszczyźnie” – Matematyka z kluczem 6 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Nie ma tu liczby π, pola koła (klasa 8) ani twierdzenia Pitagorasa (klasa 7).

// --- Pomocnicze (tylko dla tego pliku)

/** Miara kąta w LaTeX: st(35) = "35^\circ". */
const st = (n) => `${n}^\\circ`;

/** Lista po polsku: "a, b i c". */
const lista = (a) => (a.length === 1 ? a[0] : `${a.slice(0, -1).join(", ")} i ${a[a.length - 1]}`);

/** Odmiana rzeczownika po liczbie: mn(1, "krążek", "krążki", "krążków"), mn(3, …), mn(5, …). */
const mn = (n, a, b, c) => {
  const m10 = n % 10, m100 = n % 100;
  if (n === 1) return a;
  if (m10 >= 2 && m10 <= 4 && !(m100 >= 12 && m100 <= 14)) return b;
  return c;
};

/** Liczba całkowita w LaTeX: odstęp tysięcy dopiero od 5 cyfr (12\,500). */
const lcz = (n) => (Math.abs(n) >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : String(n));

/** Pole z jednostką: pole(12, "cm") -> "$12$ cm$^2$". */
const pole = (x, j) => `$${lcz(x)}$ ${j}$^2$`;

/** Długość z jednostką: dl(12, "cm") -> "$12$ cm". */
const dl = (x, j) => `$${lcz(x)}$ ${j}`;

/** Podpis pola odpowiedzi dla pola: etPole("cm") -> "Pole (w cm$^2$) $=$". */
const etPole = (j) => `Pole (w ${j}$^2$) $=$`;

/** Kratki: kr(5) -> "$5$ kratek", kr(3) -> "$3$ kratki" (liczby od 2). */
const kr = (n) => `$${n}$ ${mn(n, "kratka", "kratki", "kratek")}`;

/** Zadanie z jednym polem liczbowym. */
const zad = (tresc, etykieta, w, wynik, rozwiazanie) => ({
  tresc,
  pola: [{ id: "w", typ: "liczba", etykieta }],
  odpowiedz: { w },
  wynik,
  rozwiazanie,
});

const CZ4 = [["A", "B", "C", "D"], ["K", "L", "M", "N"], ["P", "Q", "R", "S"]];
const PUNKTY = ["A", "B", "C", "K", "P", "R"];
const RAZY = ["", "", "dwa", "trzy", "cztery", "pięć"];

// --- Materiały

export default {
  tematy: [
    // ------------------------------------------------------------------ 1
    {
      id: "okrag-kolo",
      nazwa: "Okrąg i koło. Odległość punktu od prostej",
      sciaga: [
        {
          nazwa: "Okrąg i koło",
          slownie: "Okrąg to sama krzywa linia: każdy jej punkt jest tak samo daleko od środka. Koło to okrąg razem z całym wnętrzem.",
          przyklad: "Obręcz hula-hop to okrąg, a moneta razem z brzegiem to koło.",
          uwaga: "Środek $S$ nie leży na okręgu. Leży w środku koła i jest jednakowo daleko od wszystkich punktów okręgu.",
        },
        {
          nazwa: "Promień, średnica, cięciwa",
          slownie: "Promień łączy środek z punktem okręgu. Cięciwa łączy dwa punkty okręgu. Średnica to cięciwa przechodząca przez środek i ma długość dwóch promieni.",
          tex: "d=2\\cdot r\\qquad r=d:2",
          litery: "$r$ – promień, $d$ – średnica.",
          przyklad: "Promień $4$ cm, więc średnica ma $2 \\cdot 4 = 8$ cm. Średnica $14$ cm, więc promień ma $14 : 2 = 7$ cm.",
          uwaga: "Średnica jest najdłuższą cięciwą. Żadna cięciwa nie jest dłuższa od średnicy.",
        },
        {
          nazwa: "Punkt i okrąg",
          slownie: "Odległość punktu od środka porównujemy z promieniem. Mniejsza od promienia: punkt leży wewnątrz okręgu. Równa promieniowi: leży na okręgu. Większa: na zewnątrz.",
          tex: "|SP|<r\\qquad|SP|=r\\qquad|SP|>r",
          litery: "$S$ – środek okręgu, $r$ – promień, $P$ – dany punkt.",
          przyklad: "Okrąg ma promień $5$ cm. Punkt oddalony od środka o $3$ cm leży wewnątrz, o $5$ cm – na okręgu, a o $8$ cm – na zewnątrz.",
          uwaga: "Punkt leżący na okręgu należy też do koła, bo koło ma swój brzeg.",
        },
        {
          nazwa: "Odległość punktu od prostej",
          slownie: "Odległość punktu od prostej to długość odcinka łączącego punkt z prostą, który jest prostopadły do tej prostej. To najkrótszy możliwy odcinek.",
          przyklad: "W prostokącie $ABCD$ odcinek $AB$ jest prostopadły do prostej $BC$. Odległość punktu $A$ od prostej $BC$ jest więc równa $|AB|$.",
          uwaga: "Odcinek pochyły jest dłuższy od prostopadłego, więc nie pokazuje odległości.",
        },
        {
          nazwa: "Koła, które się stykają",
          slownie: "Gdy dwa koła stykają się z zewnątrz, odległość ich środków jest sumą promieni. Kół w jednym rzędzie jest tyle, ile razy zmieści się średnica.",
          tex: "|S_1S_2|=r_1+r_2",
          litery: "$S_1$, $S_2$ – środki okręgów, $r_1$, $r_2$ – ich promienie.",
          przyklad: "Koła o promieniach $3$ cm i $5$ cm stykają się z zewnątrz, więc ich środki dzieli $3 + 5 = 8$ cm. Cztery koła o średnicy $6$ cm w rzędzie zajmują $4 \\cdot 6 = 24$ cm.",
          uwaga: "Dodajemy promienie, a nie średnice. Dwa koła o promieniu $3$ cm mają środki oddalone o $6$ cm.",
        },
      ],
      jak: [
        "Zapisz, czy dana liczba to promień, czy średnica. Średnica to dwa promienie.",
        "Przy położeniu punktu porównaj jego odległość od środka z promieniem.",
        "Odległość punktu od prostej to długość odcinka prostopadłego. W prostokącie jest nią bok.",
        "Przy kołach, które się stykają, dodaj promienie albo średnice. Pamiętaj, co dodajesz.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Okrąg ma promień $9$ cm. Jaką długość ma średnica tego okręgu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4{,}5$ cm", "$18$ cm", "$9$ cm", "$81$ cm"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Średnica koła ma $26$ cm. Ile centymetrów ma promień tego koła? **Wybierz właściwą odpowiedź.**",
          opcje: ["$52$ cm", "$26$ cm", "$24$ cm", "$13$ cm"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "Okrąg ma środek $S$ i promień $6$ cm. Punkt $A$ jest oddalony od punktu $S$ o $4$ cm, punkt $B$ – o $6$ cm, a punkt $C$ – o $9$ cm. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Punkt $A$ leży wewnątrz okręgu.", litery: "PF", poprawna: 0 },
            { tekst: "Punkt $B$ leży na zewnątrz okręgu.", litery: "PF", poprawna: 1 },
            { tekst: "Punkt $C$ leży na zewnątrz okręgu.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "4",
          tresc: "Prostokąt $ABCD$ ma boki $|AB| = 8$ cm i $|BC| = 5$ cm. Jaka jest odległość punktu $A$ od prostej $BC$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$13$ cm", "$5$ cm", "$8$ cm", "$40$ cm"],
          poprawna: 2,
        },
        {
          nr: "5",
          tresc: "Która z podanych długości może być długością cięciwy okręgu o promieniu $5$ cm? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$ cm", "$11$ cm", "$12$ cm", "$10{,}5$ cm"],
          poprawna: 0,
        },
        {
          nr: "6",
          tresc: "Trzy jednakowe koła o promieniu $4$ cm leżą w jednym rzędzie i każde dotyka następnego. Jaką długość ma ten rząd, od lewego brzegu pierwszego koła do prawego brzegu ostatniego? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$ cm", "$24$ cm", "$16$ cm", "$32$ cm"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "7",
          punkty: 2,
          tresc: "Trzy okręgi o promieniach $2$ cm, $3$ cm i $4$ cm leżą na jednej płaszczyźnie. Każde dwa z nich stykają się z zewnątrz. Środki tych okręgów są wierzchołkami trójkąta. Oblicz obwód tego trójkąta. **Zapisz obliczenia.**",
          rozwiazanie: "Gdy dwa okręgi stykają się z zewnątrz, odległość ich środków jest sumą promieni.\n\nOkręgi o promieniach $2$ cm i $3$ cm: $2 + 3 = 5$ cm.\n\nOkręgi o promieniach $3$ cm i $4$ cm: $3 + 4 = 7$ cm. Okręgi o promieniach $2$ cm i $4$ cm: $2 + 4 = 6$ cm.\n\nObwód trójkąta: $5 + 7 + 6 = 18$ cm.\n\nOdpowiedź: obwód trójkąta wynosi $18$ cm.",
        },
        {
          nr: "8",
          punkty: 2,
          tresc: "Odcinek $AB$ jest średnicą okręgu o środku $S$ i ma długość $14$ cm. Punkt $C$ leży na tym okręgu, a $|AC| = 10$ cm. Oblicz długości odcinków $SA$, $SB$ i $SC$ oraz obwód trójkąta $ASC$. **Zapisz obliczenia.**",
          rozwiazanie: "Promień to połowa średnicy: $14 : 2 = 7$ cm.\n\nOdcinki $SA$, $SB$ i $SC$ łączą środek z punktami okręgu, więc każdy z nich jest promieniem: $|SA| = |SB| = |SC| = 7$ cm.\n\nObwód trójkąta $ASC$: $|SA| + |SC| + |AC| = 7 + 7 + 10 = 24$ cm.\n\nOdpowiedź: odcinki $SA$, $SB$ i $SC$ mają po $7$ cm, a obwód trójkąta $ASC$ wynosi $24$ cm.",
        },
      ],
      generatory: [
        {
          id: "okrag-promien-srednica",
          nazwa: "Promień i średnica",
          opis: "Promień i średnica, kółka w rzędzie i koła, które się stykają.",
          generuj(r) {
            const w = r.int(0, 4);
            if (w === 0) {
              const p = r.int(2, 30);
              return zad(
                r.chance() ? `Okrąg ma promień $${p}$ cm. Jaką długość ma jego średnica?` : `Talerz ma kształt koła o promieniu $${p}$ cm. Ile centymetrów ma średnica tego talerza?`,
                "Średnica (w cm) $=$", 2 * p, `$${2 * p}$ cm`,
                ["Średnica ma długość dwóch promieni.", `$2 \\cdot ${p} = ${2 * p}$ cm.`],
              );
            }
            if (w === 1) {
              const p = r.int(2, 30);
              return zad(
                r.chance() ? `Średnica okręgu ma $${2 * p}$ cm. Ile centymetrów ma promień tego okręgu?` : `Koło ma średnicę $${2 * p}$ cm. Jaki jest promień tego koła?`,
                "Promień (w cm) $=$", p, `$${p}$ cm`,
                ["Promień to połowa średnicy.", `$${2 * p} : 2 = ${p}$ cm.`],
              );
            }
            if (w === 2) {
              const n = r.int(2, 8), p = r.int(1, 6);
              return zad(
                `W prostokątnym pudełku ułożono w jednym rzędzie ${n} ${mn(n, "krążek", "krążki", "krążków")} o promieniu $${p}$ cm. Każdy krążek dotyka następnego, a skrajne dotykają ścianek pudełka. Jaką długość ma pudełko w środku?`,
                "Długość pudełka (w cm) $=$", 2 * p * n, `$${2 * p * n}$ cm`,
                [`Jeden krążek ma średnicę $2 \\cdot ${p} = ${2 * p}$ cm.`, `Krążki leżą jeden obok drugiego, więc dodajemy średnice: $${n} \\cdot ${2 * p} = ${2 * p * n}$ cm.`],
              );
            }
            if (w === 3) {
              const a = r.int(2, 15), b = r.int(2, 15);
              return zad(
                `Dwa okręgi o promieniach $${a}$ cm i $${b}$ cm stykają się z zewnątrz. Jak daleko od siebie leżą ich środki?`,
                "Odległość środków (w cm) $=$", a + b, `$${a + b}$ cm`,
                ["Gdy okręgi stykają się z zewnątrz, odległość środków jest sumą promieni.", `$${a} + ${b} = ${a + b}$ cm.`],
              );
            }
            const a = r.int(2, 12), b = r.int(2, 12);
            return zad(
              `Dwa okręgi stykają się z zewnątrz. Promień pierwszego okręgu ma $${a}$ cm, a środki okręgów dzieli $${a + b}$ cm. Ile centymetrów ma promień drugiego okręgu?`,
              "Promień drugiego okręgu (w cm) $=$", b, `$${b}$ cm`,
              ["Odległość środków to suma promieni, więc promień drugiego okręgu to różnica.", `$${a + b} - ${a} = ${b}$ cm.`],
            );
          },
        },
        {
          id: "okrag-punkt-prosta",
          nazwa: "Punkt, okrąg, prosta",
          opis: "Gdzie leży punkt względem okręgu i jaka jest odległość wierzchołka prostokąta od prostej.",
          generuj(r) {
            if (r.chance()) {
              const p = r.int(3, 15);
              const rodzaj = r.int(0, 2);
              const d = rodzaj === 0 ? r.int(1, p - 1) : rodzaj === 1 ? p : r.int(p + 1, p + 10);
              const X = r.pick(PUNKTY);
              const opcje = ["wewnątrz okręgu", "na okręgu", "na zewnątrz okręgu"];
              const opis = [
                `$${d} < ${p}$, więc punkt leży wewnątrz okręgu.`,
                `$${d} = ${p}$, więc punkt leży na okręgu.`,
                `$${d} > ${p}$, więc punkt leży na zewnątrz okręgu.`,
              ][rodzaj];
              return {
                tresc: `Okrąg o środku $S$ ma promień $${p}$ cm. Punkt $${X}$ jest oddalony od punktu $S$ o $${d}$ cm. Gdzie leży punkt $${X}$?`,
                pola: [{ id: "w", typ: "wybor", etykieta: `Położenie punktu $${X}$`, opcje }],
                odpowiedz: { w: rodzaj },
                wynik: `punkt $${X}$ leży ${opcje[rodzaj]}`,
                rozwiazanie: ["Porównujemy odległość punktu od środka z promieniem okręgu.", opis],
              };
            }
            const [A, B, C, D] = r.pick(CZ4);
            const nazwy = [A, B, C, D];
            const a = r.int(3, 15), b = r.intBez(2, 12, a);
            const wsp = [[0, 0], [a, 0], [a, b], [0, b]];
            const i = r.int(0, 3);
            const bok = r.pick([(i + 1) % 4, (i + 2) % 4]);        // prosta przechodzi przez wierzchołki bok i bok+1
            const j = bok, k = (bok + 1) % 4;
            const sasiad = bok === (i + 1) % 4 ? (i + 1) % 4 : (i + 3) % 4;   // sąsiad wierzchołka leżący na prostej
            // odległość ze współrzędnych
            const pionowa = wsp[j][0] === wsp[k][0];
            const odl = pionowa ? Math.abs(wsp[i][0] - wsp[j][0]) : Math.abs(wsp[i][1] - wsp[j][1]);
            const bokOdc = sasiad === (i + 1) % 4 ? i : sasiad;        // numer boku (0: AB, 1: BC, 2: CD, 3: DA)
            const dlugoscBoku = bokOdc % 2 === 0 ? a : b;
            const odlBok = Math.abs(wsp[i][0] - wsp[sasiad][0]) + Math.abs(wsp[i][1] - wsp[sasiad][1]);
            if (odl !== odlBok || odl !== dlugoscBoku) throw new Error("niespójna odległość");
            const V = nazwy[i], Y = nazwy[j], Z = nazwy[k], W = nazwy[sasiad];
            return zad(
              `Prostokąt $${A}${B}${C}${D}$ ma boki $|${A}${B}| = ${a}$ cm i $|${B}${C}| = ${b}$ cm. Jaka jest odległość punktu $${V}$ od prostej $${Y}${Z}$?`,
              "Odległość (w cm) $=$", odl, `$${odl}$ cm`,
              ["Odległość punktu od prostej to długość odcinka prostopadłego do tej prostej.", `W prostokącie odcinek $${V}${W}$ jest prostopadły do prostej $${Y}${Z}$, więc odległość to $|${V}${W}| = ${odl}$ cm.`],
            );
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 2
    {
      id: "katy",
      nazwa: "Kąty",
      sciaga: [
        {
          nazwa: "Przypomnienie: pary kątów",
          slownie: "Kąt ostry ma mniej niż $90^\\circ$, prosty $90^\\circ$, a rozwarty od $90^\\circ$ do $180^\\circ$. Kąty przyległe dają razem $180^\\circ$, a kąty wierzchołkowe są równe.",
          tex: "\\alpha+\\beta=180^\\circ\\qquad\\alpha=\\gamma",
          litery: "$\\alpha$, $\\beta$ – kąty przyległe, $\\alpha$, $\\gamma$ – kąty wierzchołkowe.",
          przyklad: "Dla kąta $65^\\circ$ kąt przyległy ma $180^\\circ - 65^\\circ = 115^\\circ$, a kąt wierzchołkowy $65^\\circ$.",
          uwaga: "Do kąta prostego dopełniamy do $90^\\circ$, a do półpełnego do $180^\\circ$. Sprawdź, o który chodzi.",
        },
        {
          nazwa: "Kilka kątów na prostej",
          slownie: "Gdy kilka kątów o wspólnym wierzchołku leży obok siebie i razem tworzą kąt półpełny, ich miary dają $180^\\circ$. Brakujący kąt to $180^\\circ$ minus suma pozostałych.",
          tex: "\\alpha+\\beta+\\gamma=180^\\circ",
          litery: "$\\alpha$, $\\beta$, $\\gamma$ – miary kątów leżących obok siebie na prostej.",
          przyklad: "Kąty $30^\\circ$ i $70^\\circ$ leżą obok trzeciego. Najpierw $30 + 70 = 100$, potem $180 - 100 = 80$, więc trzeci kąt ma $80^\\circ$.",
          uwaga: "Najpierw dodaj znane kąty, dopiero potem odejmij sumę od $180^\\circ$.",
        },
        {
          nazwa: "Kąty wokół punktu",
          slownie: "Gdy kąty o wspólnym wierzchołku wypełniają całą płaszczyznę wokół punktu, razem tworzą kąt pełny, czyli $360^\\circ$.",
          tex: "\\alpha+\\beta+\\gamma+\\delta=360^\\circ",
          litery: "$\\alpha$, $\\beta$, $\\gamma$, $\\delta$ – miary kątów wokół jednego punktu.",
          przyklad: "Trzy kąty mają $100^\\circ$, $120^\\circ$ i $90^\\circ$. Razem $310^\\circ$, więc czwarty ma $360^\\circ - 310^\\circ = 50^\\circ$.",
          uwaga: "Wokół punktu jest $360^\\circ$, a na prostej $180^\\circ$.",
        },
        {
          nazwa: "Kąt kilka razy większy",
          slownie: "Gdy jeden kąt jest kilka razy większy od drugiego, dzielimy sumę na równe części. Mniejszy kąt to jedna część, większy – tyle części, ile razy jest większy.",
          przyklad: "Kąty przyległe, jeden dwa razy większy. Razem są $1 + 2 = 3$ części, a $180 : 3 = 60$. Mniejszy ma $60^\\circ$, większy $2 \\cdot 60^\\circ = 120^\\circ$.",
          uwaga: "Liczymy części obu kątów razem ($1 + 2 = 3$), a nie tylko większego.",
        },
        {
          nazwa: "Kąt większy o kilka stopni",
          slownie: "Gdy jeden kąt jest większy od drugiego o kilka stopni, odejmij tę różnicę od sumy. To, co zostanie, podziel na dwa równe kąty.",
          przyklad: "Kąty przyległe różnią się o $20^\\circ$. Mamy $180 - 20 = 160$, a $160 : 2 = 80$. Mniejszy ma $80^\\circ$, większy $80^\\circ + 20^\\circ = 100^\\circ$.",
          uwaga: "Sprawdź na końcu: $80 + 100 = 180$ i $100 - 80 = 20$.",
        },
      ],
      jak: [
        "Ustal, ile stopni mają razem wszystkie kąty: $180^\\circ$ na prostej, $360^\\circ$ wokół punktu.",
        "Dodaj znane kąty, a sumę odejmij od $180^\\circ$ albo od $360^\\circ$.",
        "Gdy kąty są w zależności „kilka razy większy”, policz części i podziel sumę.",
        "Gdy kąty różnią się o kilka stopni, odejmij różnicę i podziel resztę na dwa.",
      ],
      zadania: [
        {
          nr: "9",
          tresc: "Trzy kąty leżą obok siebie i razem tworzą kąt półpełny. Dwa z nich mają $35^\\circ$ i $60^\\circ$. Ile stopni ma trzeci kąt? **Wybierz właściwą odpowiedź.**",
          opcje: ["$95^\\circ$", "$85^\\circ$", "$25^\\circ$", "$145^\\circ$"],
          poprawna: 1,
        },
        {
          nr: "10",
          tresc: "Cztery kąty o wspólnym wierzchołku wypełniają całą płaszczyznę wokół tego punktu. Trzy z nich mają $80^\\circ$, $100^\\circ$ i $120^\\circ$. Ile stopni ma czwarty kąt? **Wybierz właściwą odpowiedź.**",
          opcje: ["$80^\\circ$", "$120^\\circ$", "$40^\\circ$", "$60^\\circ$"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "Kąty $\\alpha$ i $\\beta$ są przyległe, a kąt $\\alpha$ jest dwa razy większy od kąta $\\beta$. Ile stopni ma kąt $\\alpha$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$60^\\circ$", "$120^\\circ$", "$90^\\circ$", "$100^\\circ$"],
          poprawna: 1,
        },
        {
          nr: "12",
          tresc: "Kąt $\\alpha$ ma $50^\\circ$. Kąt $\\beta$ jest do niego przyległy, kąt $\\gamma$ jest do niego wierzchołkowy, a kąt $\\delta$ razem z kątem $\\alpha$ tworzy kąt prosty. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Kąt $\\beta$ ma $130^\\circ$.", litery: "PF", poprawna: 0 },
            { tekst: "Kąt $\\gamma$ ma $130^\\circ$.", litery: "PF", poprawna: 1 },
            { tekst: "Kąt $\\delta$ ma $40^\\circ$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "13",
          tresc: "Dwa kąty o miarach $30^\\circ$ i $45^\\circ$ razem z trzecim kątem tworzą kąt prosty. Ile stopni ma trzeci kąt? **Wybierz właściwą odpowiedź.**",
          opcje: ["$15^\\circ$", "$75^\\circ$", "$105^\\circ$", "$60^\\circ$"],
          poprawna: 0,
        },
        {
          nr: "14",
          tresc: "Dwa kąty przyległe różnią się o $30^\\circ$. Ile stopni ma mniejszy z nich? **Wybierz właściwą odpowiedź.**",
          opcje: ["$105^\\circ$", "$150^\\circ$", "$60^\\circ$", "$75^\\circ$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "15",
          punkty: 2,
          tresc: "Punkt $O$ leży na prostej $AB$ między punktami $A$ i $B$. Po jednej stronie prostej poprowadzono z punktu $O$ półproste $OC$ i $OD$ tak, że półproste $OA$, $OC$, $OD$, $OB$ leżą w tej kolejności. Kąt $\\sphericalangle AOC$ ma $35^\\circ$, a kąt $\\sphericalangle DOB$ ma $50^\\circ$. Oblicz miarę kąta $\\sphericalangle COD$. **Zapisz obliczenia.**",
          rozwiazanie: "Kąty $\\sphericalangle AOC$, $\\sphericalangle COD$ i $\\sphericalangle DOB$ leżą obok siebie i razem tworzą kąt półpełny $\\sphericalangle AOB$, czyli $180^\\circ$.\n\nZnane kąty mają razem $35^\\circ + 50^\\circ = 85^\\circ$.\n\n$\\sphericalangle COD = 180^\\circ - 85^\\circ = 95^\\circ$.\n\nOdpowiedź: kąt $\\sphericalangle COD$ ma $95^\\circ$.",
        },
        {
          nr: "16",
          punkty: 3,
          tresc: "Wokół punktu $O$ leżą cztery kąty, które razem wypełniają całą płaszczyznę. Drugi kąt jest o $20^\\circ$ większy od pierwszego, trzeci jest dwa razy większy od pierwszego, a czwarty ma $100^\\circ$. Oblicz miary wszystkich czterech kątów. **Zapisz obliczenia.**",
          rozwiazanie: "Cztery kąty wokół punktu dają razem $360^\\circ$.\n\nPierwszy kąt to $1$ część, drugi to $1$ część i jeszcze $20^\\circ$, a trzeci to $2$ części. Razem są $4$ części oraz $20^\\circ + 100^\\circ = 120^\\circ$.\n\nNa $4$ części zostaje $360^\\circ - 120^\\circ = 240^\\circ$, więc jedna część to $240^\\circ : 4 = 60^\\circ$.\n\nPierwszy kąt ma $60^\\circ$, drugi $60^\\circ + 20^\\circ = 80^\\circ$, trzeci $2 \\cdot 60^\\circ = 120^\\circ$, czwarty $100^\\circ$.\n\nSprawdzenie: $60 + 80 + 120 + 100 = 360$.\n\nOdpowiedź: kąty mają $60^\\circ$, $80^\\circ$, $120^\\circ$ i $100^\\circ$.",
        },
      ],
      generatory: [
        {
          id: "katy-prosta-punkt",
          nazwa: "Kąty na prostej i wokół punktu",
          opis: "Kilka kątów o wspólnym wierzchołku. Znasz część z nich – oblicz brakujący.",
          generuj(r) {
            const prosta = r.chance();
            const suma = prosta ? 180 : 360;
            const n = prosta ? r.int(3, 4) : r.int(3, 5);
            const w = 5 * r.int(4, 24);                          // szukany kąt: 20°–120°
            const znaneJ = Array(n - 1).fill(2);                  // znane kąty w jednostkach po 5°, każdy co najmniej 10°
            for (let reszta = (suma - w) / 5 - 2 * (n - 1); reszta > 0;) {
              const i = r.int(0, n - 2);
              if (znaneJ[i] < 34) { znaneJ[i]++; reszta--; }      // żaden kąt nie przekracza 170°
            }
            const znane = znaneJ.map((x) => 5 * x);
            const s = suma - w;
            const ZN = { 2: "dwóch", 3: "trzech", 4: "czterech" };
            const kat = `${n} ${mn(n, "kąt", "kąty", "kątów")}`;
            const wstep = prosta
              ? `Mamy ${kat} o wspólnym wierzchołku. Leżą obok siebie i razem tworzą kąt półpełny.`
              : `Mamy ${kat} o wspólnym wierzchołku. Razem wypełniają całą płaszczyznę wokół tego punktu.`;
            return zad(
              `${wstep} Miary ${ZN[n - 1]} z nich to ${lista(znane.map((m) => `$${st(m)}$`))}. Ile stopni ma pozostały kąt?`,
              "Pozostały kąt (w stopniach) $=$", w, `$${st(w)}$`,
              [
                prosta ? `Kąty tworzą razem kąt półpełny, czyli $${st(180)}$.` : `Kąty tworzą razem kąt pełny, czyli $${st(360)}$.`,
                `Dodajemy znane miary: $${znane.join(" + ")} = ${s}$.`,
                `Odejmujemy: $${suma} - ${s} = ${w}$.`,
              ],
            );
          },
        },
        {
          id: "katy-zaleznosc",
          nazwa: "Kąty w zależności",
          opis: "Dwa kąty przyległe: jeden jest kilka razy większy albo o kilka stopni większy od drugiego.",
          generuj(r) {
            const duzy = r.chance();
            // nazwy kątów: litery greckie albo kąty przy punkcie O na prostej XY
            const [X, Y, Z] = r.pick([["A", "B", "C"], ["K", "L", "M"], ["P", "Q", "R"]]);
            const greckie = r.chance();
            const n1 = greckie ? "\\alpha" : `\\sphericalangle ${X}O${Z}`;   // mniejszy kąt
            const n2 = greckie ? "\\beta" : `\\sphericalangle ${Z}O${Y}`;    // większy kąt
            const wstep = greckie
              ? "Kąty $\\alpha$ i $\\beta$ są przyległe."
              : `Punkt $O$ leży na prostej $${X}${Y}$ między punktami $${X}$ i $${Y}$, a półprosta $O${Z}$ nie leży na tej prostej.`;
            const szukany = duzy ? n2 : n1;
            if (r.chance()) {
              const k = r.int(2, 5);
              const m = 180 / (k + 1);
              const w = duzy ? k * m : m;
              return zad(
                `${wstep} Kąt $${n2}$ jest ${RAZY[k]} razy większy od kąta $${n1}$. Ile stopni ma kąt $${szukany}$?`,
                `Kąt $${szukany}$ (w stopniach) $=$`, w, `$${st(w)}$`,
                [
                  `Kąty przyległe dają razem $${st(180)}$. Kąt $${n1}$ to $1$ część, a kąt $${n2}$ to $${k}$ części, razem $${k + 1}$ części.`,
                  `Jedna część: $180 : ${k + 1} = ${m}$, więc kąt $${n1}$ ma $${st(m)}$.`,
                  ...(duzy ? [`Kąt $${n2}$: $${k} \\cdot ${m} = ${k * m}$, czyli $${st(k * m)}$.`] : []),
                ],
              );
            }
            const d = 10 * r.int(1, 10);
            const m = (180 - d) / 2;
            const w = duzy ? m + d : m;
            return zad(
              `${wstep} Kąt $${n2}$ jest o $${st(d)}$ większy od kąta $${n1}$. Ile stopni ma kąt $${szukany}$?`,
              `Kąt $${szukany}$ (w stopniach) $=$`, w, `$${st(w)}$`,
              [
                `Kąty przyległe dają razem $${st(180)}$. Gdyby kąt $${n2}$ był o $${st(d)}$ mniejszy, oba kąty byłyby równe i miałyby razem $180 - ${d} = ${180 - d}$.`,
                `Mniejszy kąt: $${180 - d} : 2 = ${m}$, czyli kąt $${n1}$ ma $${st(m)}$.`,
                ...(duzy ? [`Większy kąt: $${m} + ${d} = ${m + d}$, czyli kąt $${n2}$ ma $${st(m + d)}$.`] : []),
              ],
            );
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3
    {
      id: "trojkaty",
      nazwa: "Trójkąty",
      sciaga: [
        {
          nazwa: "Przypomnienie: rodzaje trójkątów",
          slownie: "Według boków: różnoboczny, równoramienny (dwa boki równe) i równoboczny (trzy boki równe). Według kątów: ostrokątny, prostokątny (jeden kąt prosty) i rozwartokątny (jeden kąt rozwarty).",
          przyklad: "Trójkąt o bokach $5$, $5$, $8$ jest równoramienny. Trójkąt o kątach $30^\\circ$, $60^\\circ$, $90^\\circ$ jest prostokątny.",
          uwaga: "Trójkąt równoboczny jest też równoramienny. Trójkąt może mieć tylko jeden kąt prosty albo rozwarty.",
        },
        {
          nazwa: "Suma kątów trójkąta",
          slownie: "Trzy kąty każdego trójkąta dają razem $180^\\circ$. W trójkącie prostokątnym dwa kąty ostre dają razem $90^\\circ$.",
          tex: "\\alpha+\\beta+\\gamma=180^\\circ",
          litery: "$\\alpha$, $\\beta$, $\\gamma$ – kąty trójkąta.",
          przyklad: "Kąty $40^\\circ$ i $75^\\circ$: trzeci ma $180^\\circ - (40^\\circ + 75^\\circ) = 65^\\circ$. Trójkąt ma wszystkie kąty ostre, więc jest ostrokątny.",
          uwaga: "Rodzaj trójkąta poznasz po trzecim kącie. Jeśli wychodzi $90^\\circ$, trójkąt jest prostokątny.",
        },
        {
          nazwa: "Trójkąt równoramienny: dwa przypadki",
          slownie: "Gdy w trójkącie równoramiennym znasz jeden kąt, sprawdź, czy to kąt przy podstawie, czy przy wierzchołku. Kąty przy podstawie są równe i zawsze ostre.",
          przyklad: "Kąt $50^\\circ$ przy podstawie: kąty to $50^\\circ$, $50^\\circ$, $80^\\circ$. Kąt $50^\\circ$ przy wierzchołku: kąty przy podstawie to $(180^\\circ - 50^\\circ) : 2 = 65^\\circ$.",
          uwaga: "Kąt rozwarty w trójkącie równoramiennym musi być przy wierzchołku, bo dwóch kątów rozwartych w trójkącie nie ma.",
        },
        {
          nazwa: "Obwód trójkąta",
          slownie: "Obwód trójkąta to suma długości jego trzech boków. W trójkącie równoramiennym są dwa równe ramiona, a w równobocznym trzy równe boki.",
          tex: "a+b+c\\qquad a+2\\cdot b\\qquad 3\\cdot a",
          litery: "$a+b+c$ – dowolny trójkąt. W równoramiennym $a$ to podstawa, $b$ – ramię. W równobocznym $a$ to bok.",
          przyklad: "Podstawa $6$ cm i ramiona po $10$ cm: obwód to $6 + 2 \\cdot 10 = 26$ cm. Bok trójkąta równobocznego $7$ cm: obwód to $3 \\cdot 7 = 21$ cm.",
          uwaga: "Gdy znasz obwód, odejmij znane boki od obwodu. Ramiona dzielimy na dwa, bo są równe.",
        },
      ],
      jak: [
        "Zapisz, co wiesz: które boki są równe, jakie kąty znasz.",
        "Przy kątach pamiętaj: razem $180^\\circ$. Dodaj dwa znane, odejmij sumę od $180^\\circ$.",
        "Przy trójkącie równoramiennym zastanów się, czy dany kąt jest przy podstawie, czy przy wierzchołku.",
        "Przy obwodzie dodaj trzy boki. Gdy obwód jest dany, odejmij boki, które znasz.",
      ],
      zadania: [
        {
          nr: "17",
          tresc: "Dwa kąty trójkąta mają $35^\\circ$ i $55^\\circ$. Jakiego rodzaju jest ten trójkąt ze względu na kąty? **Wybierz właściwą odpowiedź.**",
          opcje: ["ostrokątny", "rozwartokątny", "prostokątny", "równoboczny"],
          poprawna: 2,
        },
        {
          nr: "18",
          tresc: "W trójkącie równoramiennym kąt między ramionami ma $80^\\circ$. Ile stopni ma kąt przy podstawie? **Wybierz właściwą odpowiedź.**",
          opcje: ["$100^\\circ$", "$80^\\circ$", "$40^\\circ$", "$50^\\circ$"],
          poprawna: 3,
        },
        {
          nr: "19",
          tresc: "W trójkącie równoramiennym jeden z kątów ma $100^\\circ$. Ile stopni mają pozostałe dwa kąty? **Wybierz właściwą odpowiedź.**",
          opcje: ["$80^\\circ$ i $80^\\circ$", "$40^\\circ$ i $40^\\circ$", "$100^\\circ$ i $20^\\circ$", "$50^\\circ$ i $30^\\circ$"],
          poprawna: 1,
        },
        {
          nr: "20",
          tresc: "Trójkąt równoramienny ma jeden kąt równy $50^\\circ$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Pozostałe kąty mogą mieć po $65^\\circ$.", litery: "PF", poprawna: 0 },
            { tekst: "Pozostałe kąty mogą mieć $50^\\circ$ i $80^\\circ$.", litery: "PF", poprawna: 0 },
            { tekst: "Pozostałe kąty mogą mieć $50^\\circ$ i $70^\\circ$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "21",
          tresc: "Obwód trójkąta równoramiennego wynosi $38$ cm, a jego podstawa ma $12$ cm. Ile centymetrów ma każde ramię? **Wybierz właściwą odpowiedź.**",
          opcje: ["$26$ cm", "$19$ cm", "$7$ cm", "$13$ cm"],
          poprawna: 3,
        },
        {
          nr: "22",
          tresc: "Najkrótszy bok trójkąta ma $5$ cm, drugi bok jest o $3$ cm dłuższy od najkrótszego, a trzeci jest dwa razy dłuższy od najkrótszego. Jaki jest obwód tego trójkąta? **Wybierz właściwą odpowiedź.**",
          opcje: ["$23$ cm", "$18$ cm", "$26$ cm", "$21$ cm"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "23",
          punkty: 2,
          tresc: "W trójkącie drugi kąt jest dwa razy większy od najmniejszego, a trzeci jest trzy razy większy od najmniejszego. Oblicz miary kątów i napisz, jakiego rodzaju jest ten trójkąt ze względu na kąty. **Zapisz obliczenia.**",
          rozwiazanie: "Najmniejszy kąt to $1$ część, drugi to $2$ części, trzeci to $3$ części. Razem jest $1 + 2 + 3 = 6$ części.\n\nKąty trójkąta dają razem $180^\\circ$, więc jedna część to $180^\\circ : 6 = 30^\\circ$.\n\nKąty: $30^\\circ$, $2 \\cdot 30^\\circ = 60^\\circ$ i $3 \\cdot 30^\\circ = 90^\\circ$.\n\nJeden kąt jest prosty, więc trójkąt jest prostokątny.\n\nOdpowiedź: kąty mają $30^\\circ$, $60^\\circ$ i $90^\\circ$, a trójkąt jest prostokątny.",
        },
        {
          nr: "24",
          punkty: 3,
          tresc: "Obwód trójkąta równoramiennego wynosi $40$ cm. Każde ramię jest o $5$ cm dłuższe od podstawy. Oblicz długości wszystkich boków tego trójkąta. **Zapisz obliczenia.**",
          rozwiazanie: "Gdyby skrócić każde ramię o $5$ cm, wszystkie trzy boki miałyby długość podstawy.\n\nObwód byłby wtedy mniejszy o $5 + 5 = 10$ cm, czyli $40 - 10 = 30$ cm.\n\nPodstawa: $30 : 3 = 10$ cm.\n\nRamię: $10 + 5 = 15$ cm.\n\nSprawdzenie: $10 + 15 + 15 = 40$ cm.\n\nOdpowiedź: podstawa ma $10$ cm, a ramiona po $15$ cm.",
        },
      ],
      generatory: [
        {
          id: "trojkat-katy-zaleznosc",
          nazwa: "Kąty trójkąta w zależności",
          opis: "Kąty trójkąta są kilka razy większe od najmniejszego – oblicz najmniejszy albo największy.",
          generuj(r) {
            const pary = [];
            for (let a = 1; a <= 5; a++) for (let b = a; b <= 5; b++) if (!(a === 1 && b === 1) && 180 % (1 + a + b) === 0) pary.push([a, b]);
            const [k2, k3] = r.shuffle(r.pick(pary));
            const s = 1 + k2 + k3;
            const u = 180 / s;
            const najw = r.chance();
            const w = najw ? Math.max(k2, k3) * u : u;
            const [A, B, C] = r.pick([["A", "B", "C"], ["K", "L", "M"], ["P", "Q", "R"]]);
            const porown = (k) => (k === 1 ? "równy kątowi" : `${RAZY[k]} razy większy od kąta`);
            return zad(
              `W trójkącie $${A}${B}${C}$ kąt przy wierzchołku $${B}$ jest ${porown(k2)} przy wierzchołku $${A}$, a kąt przy wierzchołku $${C}$ jest ${porown(k3)} przy wierzchołku $${A}$. Ile stopni ma ${najw ? "największy" : "najmniejszy"} kąt tego trójkąta?`,
              `${najw ? "Największy" : "Najmniejszy"} kąt (w stopniach) $=$`, w, `$${st(w)}$`,
              [
                `Kąty trójkąta dają razem $${st(180)}$. Kąt przy $${A}$ to $1$ część, kąt przy $${B}$ to $${k2}$ ${mn(k2, "część", "części", "części")}, a kąt przy $${C}$ to $${k3}$ ${mn(k3, "część", "części", "części")}. Razem jest $${s}$ ${mn(s, "część", "części", "części")}.`,
                `Jedna część: $180 : ${s} = ${u}$.`,
                najw ? `Największy kąt: $${Math.max(k2, k3)} \\cdot ${u} = ${w}$, czyli $${st(w)}$.` : `Najmniejszy kąt to jedna część: $${st(u)}$.`,
              ],
            );
          },
        },
        {
          id: "trojkat-obwod",
          nazwa: "Obwód trójkąta",
          opis: "Oblicz obwód albo brakujący bok trójkąta równoramiennego, równobocznego i innego.",
          generuj(r) {
            const w = r.int(0, 4);
            if (w <= 2) {
              const b = r.int(4, 15);
              let p;
              do { p = r.int(2, 2 * b - 1); } while (p === b);
              const ob = p + 2 * b;
              if (w === 0) {
                return zad(
                  `Trójkąt równoramienny ma podstawę długości $${p}$ cm i ramiona długości $${b}$ cm. Jaki jest obwód tego trójkąta?`,
                  "Obwód (w cm) $=$", ob, `$${ob}$ cm`,
                  ["Obwód to suma długości boków: podstawa i dwa ramiona.", `$${p} + ${b} + ${b} = ${ob}$ cm.`],
                );
              }
              if (w === 1) {
                return zad(
                  `Obwód trójkąta równoramiennego wynosi $${ob}$ cm, a jego podstawa ma $${p}$ cm. Ile centymetrów ma każde ramię?`,
                  "Ramię (w cm) $=$", b, `$${b}$ cm`,
                  [`Dwa ramiona mają razem tyle, co obwód bez podstawy: $${ob} - ${p} = ${ob - p}$ cm.`, `Jedno ramię: $${ob - p} : 2 = ${b}$ cm.`],
                );
              }
              return zad(
                `Obwód trójkąta równoramiennego wynosi $${ob}$ cm, a każde jego ramię ma $${b}$ cm. Ile centymetrów ma podstawa?`,
                "Podstawa (w cm) $=$", p, `$${p}$ cm`,
                [`Dwa ramiona mają razem $2 \\cdot ${b} = ${2 * b}$ cm.`, `Podstawa: $${ob} - ${2 * b} = ${p}$ cm.`],
              );
            }
            if (w === 3) {
              const s = r.int(3, 20);
              return zad(
                `Obwód trójkąta równobocznego wynosi $${3 * s}$ cm. Ile centymetrów ma jego bok?`,
                "Bok (w cm) $=$", s, `$${s}$ cm`,
                ["Wszystkie trzy boki trójkąta równobocznego są równe.", `$${3 * s} : 3 = ${s}$ cm.`],
              );
            }
            const a = r.int(3, 10), d = r.int(1, 5);
            const ob = a + (a + d) + 2 * a;
            return zad(
              `Najkrótszy bok trójkąta ma $${a}$ cm, drugi bok jest o $${d}$ cm dłuższy od najkrótszego, a trzeci jest dwa razy dłuższy od najkrótszego. Jaki jest obwód tego trójkąta?`,
              "Obwód (w cm) $=$", ob, `$${ob}$ cm`,
              [`Drugi bok: $${a} + ${d} = ${a + d}$ cm. Trzeci bok: $2 \\cdot ${a} = ${2 * a}$ cm.`, `Obwód: $${a} + ${a + d} + ${2 * a} = ${ob}$ cm.`],
            );
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4
    {
      id: "czworokaty",
      nazwa: "Czworokąty",
      sciaga: [
        {
          nazwa: "Suma kątów czworokąta",
          slownie: "Cztery kąty każdego czworokąta dają razem $360^\\circ$. Przekątna dzieli czworokąt na dwa trójkąty, a w każdym kąty dają $180^\\circ$.",
          tex: "\\alpha+\\beta+\\gamma+\\delta=360^\\circ",
          litery: "$\\alpha$, $\\beta$, $\\gamma$, $\\delta$ – kąty czworokąta.",
          przyklad: "Trzy kąty mają $90^\\circ$, $110^\\circ$ i $80^\\circ$. Razem $280^\\circ$, więc czwarty ma $360^\\circ - 280^\\circ = 80^\\circ$.",
          uwaga: "W trójkącie kąty dają $180^\\circ$, a w czworokącie $360^\\circ$. Nie mieszaj tych sum.",
        },
        {
          nazwa: "Kąty w czworokątach szczególnych",
          slownie: "W prostokącie i kwadracie wszystkie kąty są proste. W równoległoboku i rombie kąty przeciwległe są równe, a sąsiednie dają $180^\\circ$. W trapezie kąty przy jednym ramieniu dają $180^\\circ$.",
          przyklad: "Romb z kątem $70^\\circ$ ma kąty $70^\\circ$, $110^\\circ$, $70^\\circ$, $110^\\circ$. Razem $360^\\circ$.",
          uwaga: "Gdy znasz jeden kąt równoległoboku, znasz już wszystkie cztery.",
        },
        {
          nazwa: "Obwód czworokąta",
          slownie: "Obwód to suma długości czterech boków. W prostokącie i równoległoboku boki są parami równe, a w kwadracie i rombie wszystkie cztery boki są równe.",
          tex: "2\\cdot(a+b)\\qquad4\\cdot a\\qquad a+b+c+d",
          litery: "$2\\cdot(a+b)$ – prostokąt i równoległobok ($a$, $b$ – sąsiednie boki). $4\\cdot a$ – kwadrat i romb. $a+b+c+d$ – inny czworokąt, np. trapez.",
          przyklad: "Prostokąt $9$ cm na $4$ cm: obwód to $2 \\cdot (9 + 4) = 26$ cm. Romb o boku $5$ cm: $4 \\cdot 5 = 20$ cm.",
          uwaga: "Gdy znasz obwód prostokąta i jeden bok, najpierw podziel obwód na dwa, a potem odejmij znany bok.",
        },
        {
          nazwa: "Przekątne czworokąta",
          slownie: "Przekątna łączy dwa przeciwległe wierzchołki, a czworokąt ma dwie przekątne. W prostokącie obie mają tę samą długość, a w rombie i kwadracie przecinają się pod kątem prostym.",
          przyklad: "Przekątna dzieli prostokąt na dwa takie same trójkąty prostokątne. Przekątne rombu są prostopadłe.",
          uwaga: "W prostokącie, który nie jest kwadratem, przekątne nie są prostopadłe.",
        },
      ],
      jak: [
        "Przy kątach dodaj znane miary i odejmij sumę od $360^\\circ$.",
        "Przy figurach szczególnych skorzystaj z ich własności: przeciwległe kąty równoległoboku są równe, w prostokącie wszystkie kąty są proste.",
        "Przy obwodzie dodaj długości czterech boków albo użyj wzoru $2\\cdot(a+b)$ czy $4\\cdot a$.",
        "Gdy znasz obwód, odejmij znane boki albo podziel obwód na dwa.",
      ],
      zadania: [
        {
          nr: "25",
          tresc: "Trzy kąty czworokąta mają $85^\\circ$, $95^\\circ$ i $75^\\circ$. Ile stopni ma czwarty kąt? **Wybierz właściwą odpowiedź.**",
          opcje: ["$75^\\circ$", "$255^\\circ$", "$105^\\circ$", "$95^\\circ$"],
          poprawna: 2,
        },
        {
          nr: "26",
          tresc: "Dwa kąty czworokąta mają po $70^\\circ$, a pozostałe dwa są równe. Ile stopni ma każdy z nich? **Wybierz właściwą odpowiedź.**",
          opcje: ["$110^\\circ$", "$55^\\circ$", "$220^\\circ$", "$40^\\circ$"],
          poprawna: 0,
        },
        {
          nr: "27",
          tresc: "Trapez ma boki długości $6$ cm, $5$ cm, $10$ cm i $5$ cm. Jaki jest jego obwód? **Wybierz właściwą odpowiedź.**",
          opcje: ["$21$ cm", "$32$ cm", "$30$ cm", "$26$ cm"],
          poprawna: 3,
        },
        {
          nr: "28",
          tresc: "Kwadrat ma bok długości $7$ cm. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Obwód tego kwadratu wynosi $14$ cm.", litery: "PF", poprawna: 1 },
            { tekst: "Kąty tego kwadratu dają razem $360^\\circ$.", litery: "PF", poprawna: 0 },
            { tekst: "Ten kwadrat ma tylko jedną parę boków równoległych.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "29",
          tresc: "Które zdanie o przekątnych każdego prostokąta jest prawdziwe? **Wybierz właściwą odpowiedź.**",
          opcje: ["zawsze są prostopadłe", "mają taką samą długość", "są dwa razy dłuższe od boków", "jedna jest zawsze dłuższa od drugiej"],
          poprawna: 1,
        },
        {
          nr: "30",
          tresc: "W którym z tych czworokątów przekątne zawsze przecinają się pod kątem prostym? **Wybierz właściwą odpowiedź.**",
          opcje: ["w każdym równoległoboku", "w prostokącie, który nie jest kwadratem", "w każdym trapezie", "w rombie"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "31",
          punkty: 2,
          tresc: "Trapez równoramienny ma obwód $34$ cm. Jego ramię ma $7$ cm, a krótsza podstawa $8$ cm. Oblicz długość dłuższej podstawy. **Zapisz obliczenia.**",
          rozwiazanie: "Trapez równoramienny ma dwa ramiona po $7$ cm, razem $2 \\cdot 7 = 14$ cm.\n\nRamiona i krótsza podstawa mają razem $14 + 8 = 22$ cm.\n\nDłuższa podstawa: $34 - 22 = 12$ cm.\n\nSprawdzenie: $12 + 7 + 8 + 7 = 34$ cm.\n\nOdpowiedź: dłuższa podstawa ma $12$ cm.",
        },
        {
          nr: "32",
          punkty: 3,
          tresc: "Pierwszy kąt czworokąta ma $70^\\circ$, drugi jest o $20^\\circ$ większy od pierwszego, a trzeci jest dwa razy większy od pierwszego. Kąty podano w kolejności wierzchołków. Oblicz czwarty kąt. Czy ten czworokąt może być równoległobokiem? Uzasadnij odpowiedź. **Zapisz obliczenia.**",
          rozwiazanie: "Drugi kąt: $70^\\circ + 20^\\circ = 90^\\circ$. Trzeci kąt: $2 \\cdot 70^\\circ = 140^\\circ$.\n\nKąty czworokąta dają razem $360^\\circ$. Trzy kąty mają razem $70^\\circ + 90^\\circ + 140^\\circ = 300^\\circ$.\n\nCzwarty kąt: $360^\\circ - 300^\\circ = 60^\\circ$.\n\nW równoległoboku kąty przeciwległe są równe. Tu pierwszy i trzeci kąt (przeciwległe) mają $70^\\circ$ i $140^\\circ$, a to różne miary.\n\nOdpowiedź: czwarty kąt ma $60^\\circ$. Ten czworokąt nie może być równoległobokiem, bo jego kąty przeciwległe nie są równe.",
        },
      ],
      generatory: [
        {
          id: "czworokat-katy",
          nazwa: "Kąty czworokąta",
          opis: "Znasz trzy kąty czworokąta albo jego część – oblicz brakujący kąt.",
          generuj(r) {
            const [A, B, C, D] = r.pick(CZ4);
            const w = r.int(0, 2);
            if (w === 0) {
              let a, b, c, x;
              do {
                a = 5 * r.int(10, 30); b = 5 * r.int(10, 30); c = 5 * r.int(10, 30);
                x = 360 - a - b - c;
              } while (x < 30 || x > 170);
              return zad(
                `W czworokącie $${A}${B}${C}${D}$ kąty przy wierzchołkach $${A}$, $${B}$ i $${C}$ mają $${st(a)}$, $${st(b)}$ i $${st(c)}$. Ile stopni ma kąt przy wierzchołku $${D}$?`,
                `Kąt przy $${D}$ (w stopniach) $=$`, x, `$${st(x)}$`,
                ["Kąty czworokąta dają razem $360^\\circ$.", `Dodajemy znane kąty: $${a} + ${b} + ${c} = ${a + b + c}$.`, `Odejmujemy: $360 - ${a + b + c} = ${x}$, czyli $${st(x)}$.`],
              );
            }
            if (w === 1) {
              let a, b;
              do {
                a = 5 * r.int(6, 30); b = 5 * r.int(6, 30);
              } while ((360 - a - b) % 2 !== 0 || 360 - a - b < 80 || 360 - a - b > 300);
              const x = (360 - a - b) / 2;
              return zad(
                `Dwa kąty czworokąta mają $${st(a)}$ i $${st(b)}$, a pozostałe dwa kąty są równe. Ile stopni ma każdy z nich?`,
                "Każdy z równych kątów (w stopniach) $=$", x, `$${st(x)}$`,
                ["Kąty czworokąta dają razem $360^\\circ$.", `Dwa znane kąty mają razem $${a} + ${b} = ${a + b}$, więc na pozostałe dwa zostaje $360 - ${a + b} = ${360 - a - b}$.`, `Każdy z nich: $${360 - a - b} : 2 = ${x}$, czyli $${st(x)}$.`],
              );
            }
            const a = 5 * r.int(12, 22);
            const x = 360 - 3 * a;
            return zad(
              `Trzy kąty czworokąta mają po $${st(a)}$. Ile stopni ma czwarty kąt?`,
              "Czwarty kąt (w stopniach) $=$", x, `$${st(x)}$`,
              ["Kąty czworokąta dają razem $360^\\circ$.", `Trzy jednakowe kąty mają razem $3 \\cdot ${a} = ${3 * a}$.`, `Czwarty kąt: $360 - ${3 * a} = ${x}$, czyli $${st(x)}$.`],
            );
          },
        },
        {
          id: "czworokat-obwod",
          nazwa: "Obwód czworokąta",
          opis: "Oblicz obwód albo brakujący bok prostokąta, kwadratu, rombu, równoległoboku i trapezu.",
          generuj(r) {
            const u = r.pick(["cm", "m"]);
            const w = r.int(0, 4);
            const et = (co) => `${co} (w ${u}) $=$`;
            if (w === 0) {
              const a = r.int(3, 15), b = r.intBez(2, 12, a);
              return zad(
                `Prostokąt ma boki długości $${a}$ ${u} i $${b}$ ${u}. Jaki jest jego obwód?`,
                et("Obwód"), 2 * (a + b), dl(2 * (a + b), u),
                ["Obwód prostokąta to dwa razy suma sąsiednich boków.", `$2 \\cdot (${a} + ${b}) = 2 \\cdot ${a + b} = ${2 * (a + b)}$ ${u}.`],
              );
            }
            if (w === 1) {
              const s = r.int(2, 20);
              const ro = r.chance();
              return zad(
                `Obwód ${ro ? "rombu" : "kwadratu"} wynosi $${4 * s}$ ${u}. Ile ${u === "cm" ? "centymetrów" : "metrów"} ma jego bok?`,
                et("Bok"), s, dl(s, u),
                [`${ro ? "Romb" : "Kwadrat"} ma cztery równe boki.`, `$${4 * s} : 4 = ${s}$ ${u}.`],
              );
            }
            if (w === 2) {
              const a = r.int(3, 15), b = r.intBez(2, 12, a);
              return zad(
                `Obwód równoległoboku wynosi $${2 * (a + b)}$ ${u}, a jeden jego bok ma $${a}$ ${u}. Ile ${u === "cm" ? "centymetrów" : "metrów"} ma sąsiedni bok?`,
                et("Sąsiedni bok"), b, dl(b, u),
                [`Suma dwóch sąsiednich boków to połowa obwodu: $${2 * (a + b)} : 2 = ${a + b}$ ${u}.`, `Sąsiedni bok: $${a + b} - ${a} = ${b}$ ${u}.`],
              );
            }
            if (w === 3) {
              const a = r.int(8, 16), c = r.int(3, a - 2), b = r.int(3, 9), d = r.int(3, 9);
              const ob = a + b + c + d;
              return zad(
                `Trapez ma obwód $${ob}$ ${u}. Jego podstawy mają $${a}$ ${u} i $${c}$ ${u}, a jedno ramię ma $${b}$ ${u}. Ile ${u === "cm" ? "centymetrów" : "metrów"} ma drugie ramię?`,
                et("Drugie ramię"), d, dl(d, u),
                [`Trzy znane boki mają razem $${a} + ${c} + ${b} = ${a + c + b}$ ${u}.`, `Drugie ramię: $${ob} - ${a + c + b} = ${d}$ ${u}.`],
              );
            }
            const a = r.int(3, 15), b = r.intBez(2, 12, a);
            return zad(
              `Obwód prostokąta wynosi $${2 * (a + b)}$ ${u}, a jeden jego bok ma $${a}$ ${u}. Ile ${u === "cm" ? "centymetrów" : "metrów"} ma drugi bok?`,
              et("Drugi bok"), b, dl(b, u),
              [`Połowa obwodu to suma dwóch sąsiednich boków: $${2 * (a + b)} : 2 = ${a + b}$ ${u}.`, `Drugi bok: $${a + b} - ${a} = ${b}$ ${u}.`],
            );
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5
    {
      id: "pola-czworokatow",
      nazwa: "Pola czworokątów",
      sciaga: [
        {
          nazwa: "Wzory na pola czworokątów",
          slownie: "Prostokąt: bok razy bok. Kwadrat: bok razy ten sam bok. Równoległobok: podstawa razy wysokość. Romb: połowa iloczynu przekątnych. Trapez: suma podstaw razy wysokość, podzielona przez $2$.",
          tex: "P=a\\cdot b\\qquad P=a\\cdot h\\qquad P=\\frac{e\\cdot f}{2}\\qquad P=\\frac{(a+b)\\cdot h}{2}",
          litery: "$a\\cdot b$ – prostokąt, $a\\cdot h$ – równoległobok, $\\frac{e\\cdot f}{2}$ – romb, $\\frac{(a+b)\\cdot h}{2}$ – trapez. $a$, $b$ – boki lub podstawy, $h$ – wysokość, $e$, $f$ – przekątne.",
          przyklad: "Trapez o podstawach $9$ cm i $5$ cm i wysokości $4$ cm: $P = (9 + 5) \\cdot 4 : 2 = 28$ cm$^2$.",
          uwaga: "Do wzoru bierzemy wysokość, a nie pochyły bok. Wysokość jest prostopadła do podstawy.",
        },
        {
          nazwa: "Brakujący wymiar",
          slownie: "Gdy znasz pole i jeden wymiar, dzielimy pole przez ten wymiar. W trapezie najpierw podwajamy pole, bo we wzorze jest dzielenie przez $2$.",
          tex: "h=P:a\\qquad a=2\\cdot P:h-b",
          litery: "$h=P:a$ – wysokość równoległoboku. $a=2\\cdot P:h-b$ – podstawa trapezu, gdy znamy pole $P$, wysokość $h$ i drugą podstawę $b$.",
          przyklad: "Równoległobok ma pole $42$ cm$^2$ i podstawę $7$ cm, więc wysokość ma $42 : 7 = 6$ cm. Trapez ma pole $30$ cm$^2$, wysokość $5$ cm i podstawę $4$ cm: suma podstaw to $2 \\cdot 30 : 5 = 12$ cm, więc druga podstawa ma $12 - 4 = 8$ cm.",
          uwaga: "W trapezie po podzieleniu $2\\cdot P$ przez $h$ dostajesz sumę podstaw, a nie jedną podstawę.",
        },
        {
          nazwa: "Figura złożona z czworokątów",
          slownie: "Figurę dzielimy na prostokąty, równoległoboki i trapezy albo dopełniamy ją do prostokąta. Liczymy pola części i dodajemy je albo odejmujemy.",
          przyklad: "Prostokąt $9$ cm na $4$ cm i dołączony do niego kwadrat o boku $4$ cm: $9 \\cdot 4 + 4 \\cdot 4 = 36 + 16 = 52$ cm$^2$.",
          uwaga: "Pól części nie wolno liczyć dwa razy. Gdy części zachodzą na siebie, wspólny kawałek odejmujemy.",
        },
        {
          nazwa: "Pole a obwód",
          slownie: "Pole mówi, ile miejsca zajmuje figura (w cm$^2$). Obwód to długość jej brzegu (w cm). Figury o tym samym obwodzie mogą mieć różne pola.",
          przyklad: "Prostokąt $9$ cm na $1$ cm i kwadrat $5$ cm na $5$ cm mają obwód $20$ cm. Pole prostokąta to $9$ cm$^2$, a kwadratu $25$ cm$^2$.",
          uwaga: "Większy obwód nie oznacza większego pola. Nie mieszaj tych dwóch wielkości.",
        },
        {
          nazwa: "Jednostki pola w zadaniach",
          slownie: "Przed liczeniem pola zamień boki na tę samą jednostkę. Jednostki pola zamieniamy przez $100$ albo $10\\,000$.",
          tex: "1\\ \\text{m}^2=100\\ \\text{dm}^2\\qquad1\\ \\text{dm}^2=100\\ \\text{cm}^2\\qquad1\\ \\text{m}^2=10\\,000\\ \\text{cm}^2",
          przyklad: "Prostokąt ma boki $2$ m i $50$ cm. Zamieniamy: $200$ cm i $50$ cm, więc pole to $200 \\cdot 50 = 10\\,000$ cm$^2$, czyli $1$ m$^2$.",
          uwaga: "$1$ m$^2$ to nie $100$ cm$^2$, tylko $10\\,000$ cm$^2$.",
        },
      ],
      jak: [
        "Sprawdź, jaką figurę masz, i wybierz wzór. Zamień boki na jedną jednostkę.",
        "Gdy znasz pole i jeden wymiar, podziel pole przez ten wymiar. W trapezie najpierw podwój pole.",
        "Figurę złożoną podziel na proste części albo odejmij brakujący kawałek od dużego prostokąta.",
        "Do wyniku dopisz jednostkę pola, np. cm$^2$, i sprawdź, czy wynik ma sens.",
      ],
      zadania: [
        {
          nr: "33",
          tresc: "Romb ma przekątne długości $10$ cm i $6$ cm. Jakie jest jego pole? **Wybierz właściwą odpowiedź.**",
          opcje: ["$60$ cm$^2$", "$30$ cm$^2$", "$16$ cm$^2$", "$32$ cm$^2$"],
          poprawna: 1,
        },
        {
          nr: "34",
          tresc: "Trapez ma podstawy długości $9$ cm i $5$ cm oraz wysokość $4$ cm. Jakie jest pole tego trapezu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$56$ cm$^2$", "$36$ cm$^2$", "$14$ cm$^2$", "$28$ cm$^2$"],
          poprawna: 3,
        },
        {
          nr: "35",
          tresc: "Pole równoległoboku wynosi $54$ cm$^2$, a jego wysokość ma $6$ cm. Ile centymetrów ma podstawa, na którą opuszczono tę wysokość? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$ cm", "$48$ cm", "$324$ cm", "$60$ cm"],
          poprawna: 0,
        },
        {
          nr: "36",
          tresc: "Prostokąt $A$ ma boki $12$ cm i $3$ cm, a prostokąt $B$ ma boki $9$ cm i $4$ cm. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Pole prostokąta $B$ wynosi $36$ cm$^2$.", litery: "PF", poprawna: 0 },
            { tekst: "Prostokąt $B$ ma większe pole niż prostokąt $A$.", litery: "PF", poprawna: 1 },
            { tekst: "Prostokąt $B$ ma większy obwód niż prostokąt $A$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "37",
          tresc: "Prostokąt ma boki długości $3$ m i $40$ cm. Jakie jest jego pole? **Wybierz właściwą odpowiedź.**",
          opcje: ["$120$ cm$^2$", "$1200$ cm$^2$", "$12\\,000$ cm$^2$", "$120\\,000$ cm$^2$"],
          poprawna: 2,
        },
        {
          nr: "38",
          tresc: "Trapez ma pole $40$ cm$^2$, wysokość $5$ cm i jedną podstawę długości $6$ cm. Ile centymetrów ma druga podstawa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$16$ cm", "$10$ cm", "$8$ cm", "$2$ cm"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "39",
          punkty: 3,
          tresc: "Podłogę w pokoju o wymiarach $5$ m na $4$ m trzeba wyłożyć kwadratowymi płytkami o boku $50$ cm. Płytki układamy bez cięcia i bez odstępów. Ile płytek trzeba kupić? Ile zapłacisz, jeśli jedna płytka kosztuje $12$ zł? **Zapisz obliczenia.**",
          rozwiazanie: "Zamieniamy metry na centymetry: $5$ m $= 500$ cm i $4$ m $= 400$ cm.\n\nW jednym rzędzie mieści się $500 : 50 = 10$ płytek, a rzędów jest $400 : 50 = 8$.\n\nPłytek jest $10 \\cdot 8 = 80$.\n\nSprawdzenie polami: jedna płytka ma pole $50 \\cdot 50 = 2500$ cm$^2$, a $80 \\cdot 2500 = 200\\,000$ cm$^2$ $= 20$ m$^2$, czyli tyle, ile pole pokoju $5 \\cdot 4 = 20$ m$^2$.\n\nKoszt: $80 \\cdot 12 = 960$ zł.\n\nOdpowiedź: trzeba kupić $80$ płytek i zapłacić $960$ zł.",
        },
        {
          nr: "40",
          punkty: 2,
          tresc: "Działka ma kształt trapezu o podstawach $32$ m i $18$ m i wysokości $20$ m. Oblicz pole tej działki w metrach kwadratowych i w arach. **Zapisz obliczenia.**",
          rozwiazanie: "Pole trapezu to suma podstaw razy wysokość, podzielona przez $2$.\n\n$P = (32 + 18) \\cdot 20 : 2 = 50 \\cdot 20 : 2 = 500$ m$^2$.\n\n$1$ a $= 100$ m$^2$, więc $500 : 100 = 5$ a.\n\nOdpowiedź: pole działki wynosi $500$ m$^2$, czyli $5$ a.",
        },
      ],
      generatory: [
        {
          id: "pola-czworokata",
          nazwa: "Pole czworokąta",
          opis: "Oblicz pole prostokąta, kwadratu, równoległoboku, rombu albo trapezu.",
          generuj(r) {
            const w = r.int(0, 4);
            const u = r.pick(["cm", "dm", "m"]);
            if (w === 0) {
              const a = r.int(3, 15), b = r.intBez(2, 12, a);
              return zad(
                `Prostokąt ma boki długości $${a}$ ${u} i $${b}$ ${u}. Oblicz jego pole.`,
                etPole(u), a * b, pole(a * b, u),
                ["Pole prostokąta to iloczyn sąsiednich boków.", `$${a} \\cdot ${b} = ${a * b}$ ${u}$^2$.`],
              );
            }
            if (w === 1) {
              const a = r.int(2, 15);
              return zad(
                `Bok kwadratu ma długość $${a}$ ${u}. Oblicz pole tego kwadratu.`,
                etPole(u), a * a, pole(a * a, u),
                ["Pole kwadratu to bok razy bok.", `$${a} \\cdot ${a} = ${a * a}$ ${u}$^2$.`],
              );
            }
            if (w === 2) {
              const a = r.int(4, 15), h = r.int(2, 12);
              return zad(
                `Równoległobok ma podstawę długości $${a}$ ${u} i wysokość $${h}$ ${u}, opuszczoną na tę podstawę. Oblicz jego pole.`,
                etPole(u), a * h, pole(a * h, u),
                ["Pole równoległoboku to podstawa razy wysokość.", `$${a} \\cdot ${h} = ${a * h}$ ${u}$^2$.`],
              );
            }
            if (w === 3) {
              let e, f;
              do { e = r.int(4, 16); f = r.int(3, 14); } while ((e * f) % 2 !== 0);
              return zad(
                `Romb ma przekątne długości $${e}$ ${u} i $${f}$ ${u}. Oblicz pole tego rombu.`,
                etPole(u), (e * f) / 2, pole((e * f) / 2, u),
                ["Pole rombu to połowa iloczynu przekątnych.", `$${e} \\cdot ${f} : 2 = ${e * f} : 2 = ${(e * f) / 2}$ ${u}$^2$.`],
              );
            }
            let a, c, h;
            do { a = r.int(6, 16); c = r.int(2, a - 2); h = r.int(2, 12); } while (((a + c) * h) % 2 !== 0);
            const P = ((a + c) * h) / 2;
            return zad(
              `Trapez ma podstawy długości $${a}$ ${u} i $${c}$ ${u} oraz wysokość $${h}$ ${u}. Oblicz pole tego trapezu.`,
              etPole(u), P, pole(P, u),
              ["Pole trapezu to suma podstaw razy wysokość, podzielona przez $2$.", `$(${a} + ${c}) \\cdot ${h} : 2 = ${a + c} \\cdot ${h} : 2 = ${P}$ ${u}$^2$.`],
            );
          },
        },
        {
          id: "pola-brakujacy-wymiar",
          nazwa: "Brakujący wymiar",
          opis: "Znasz pole i jeden wymiar – oblicz drugi bok, wysokość, przekątną albo podstawę.",
          generuj(r) {
            const w = r.int(0, 3);
            const u = r.pick(["cm", "m"]);
            const nazwaU = u === "cm" ? "centymetrów" : "metrów";
            const et = (co) => `${co} (w ${u}) $=$`;
            if (w === 0) {
              const a = r.int(3, 12), b = r.intBez(2, 12, a);
              return zad(
                `Pole prostokąta wynosi ${pole(a * b, u)}, a jeden jego bok ma $${a}$ ${u}. Ile ${nazwaU} ma drugi bok?`,
                et("Drugi bok"), b, dl(b, u),
                ["Pole prostokąta to bok razy bok, więc drugi bok to pole podzielone przez znany bok.", `$${a * b} : ${a} = ${b}$ ${u}.`],
              );
            }
            if (w === 1) {
              const a = r.int(4, 14), h = r.int(2, 10);
              if (r.chance()) {
                return zad(
                  `Pole równoległoboku wynosi ${pole(a * h, u)}, a jego podstawa ma $${a}$ ${u}. Ile ${nazwaU} ma wysokość opuszczona na tę podstawę?`,
                  et("Wysokość"), h, dl(h, u),
                  ["Pole równoległoboku to podstawa razy wysokość, więc wysokość to pole podzielone przez podstawę.", `$${a * h} : ${a} = ${h}$ ${u}.`],
                );
              }
              return zad(
                `Pole równoległoboku wynosi ${pole(a * h, u)}, a jego wysokość ma $${h}$ ${u}. Ile ${nazwaU} ma podstawa, na którą opuszczono tę wysokość?`,
                et("Podstawa"), a, dl(a, u),
                ["Pole równoległoboku to podstawa razy wysokość, więc podstawa to pole podzielone przez wysokość.", `$${a * h} : ${h} = ${a}$ ${u}.`],
              );
            }
            if (w === 2) {
              let e, f;
              do { e = r.int(4, 16); f = r.int(3, 14); } while ((e * f) % 2 !== 0);
              return zad(
                `Romb ma pole ${pole((e * f) / 2, u)}, a jedna jego przekątna ma $${e}$ ${u}. Ile ${nazwaU} ma druga przekątna?`,
                et("Druga przekątna"), f, dl(f, u),
                [`Pole rombu to połowa iloczynu przekątnych, więc iloczyn przekątnych to $2 \\cdot ${(e * f) / 2} = ${e * f}$.`, `Druga przekątna: $${e * f} : ${e} = ${f}$ ${u}.`],
              );
            }
            let a, b, h;
            do { a = r.int(4, 14); b = r.intBez(2, 14, a); h = r.int(2, 10); } while (((a + b) * h) % 2 !== 0);
            const P = ((a + b) * h) / 2;
            return zad(
              `Trapez ma pole ${pole(P, u)} i wysokość $${h}$ ${u}. Jedna jego podstawa ma $${a}$ ${u}. Ile ${nazwaU} ma druga podstawa?`,
              et("Druga podstawa"), b, dl(b, u),
              [`Suma podstaw to dwa pola podzielone przez wysokość: $2 \\cdot ${P} : ${h} = ${2 * P} : ${h} = ${a + b}$ ${u}.`, `Druga podstawa: $${a + b} - ${a} = ${b}$ ${u}.`],
            );
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 6
    {
      id: "figury-na-kratce",
      nazwa: "Figury na kratce",
      sciaga: [
        {
          nazwa: "Pole figury na kratce",
          slownie: "Gdy bok kratki ma $1$ cm, jedna kratka ma pole $1$ cm$^2$. Pole figury to liczba kratek, które zajmuje. Połówki kratek składamy w całe.",
          przyklad: "Prostokąt zajmuje $6$ kratek w poziomie i $3$ w pionie. Ma $6 \\cdot 3 = 18$ kratek, więc jego pole to $18$ cm$^2$.",
          uwaga: "Na kratce nie liczymy pól na oko. Zawsze zapisz, ile kratek ma podstawa i wysokość.",
        },
        {
          nazwa: "Kratka o większym boku",
          slownie: "Gdy bok kratki ma $u$ cm, jedna kratka ma pole $u \\cdot u$ cm$^2$. Długości zamieniamy mnożeniem przez $u$, a pola przez $u \\cdot u$.",
          tex: "P_{kratki}=u\\cdot u",
          litery: "$u$ – długość boku kratki w centymetrach.",
          przyklad: "Bok kratki ma $2$ cm. Odcinek długości $5$ kratek ma $5 \\cdot 2 = 10$ cm. Figura z $6$ kratek ma pole $6 \\cdot 4 = 24$ cm$^2$.",
          uwaga: "Gdy bok kratki ma $2$ cm, jedna kratka ma pole $4$ cm$^2$, a nie $2$ cm$^2$.",
        },
        {
          nazwa: "Trójkąt i trapez na kratce",
          slownie: "Policz, ile kratek ma podstawa i wysokość, a potem użyj wzoru. Wysokość liczymy prostopadle do podstawy, np. w pionie, gdy podstawa jest pozioma.",
          przyklad: "Trójkąt z podstawą $6$ kratek i trzecim wierzchołkiem $4$ kratki nad podstawą ma $6 \\cdot 4 : 2 = 12$ kratek. Trapez z podstawami $6$ i $2$ kratki oraz wysokością $4$ kratki ma $(6 + 2) \\cdot 4 : 2 = 16$ kratek.",
          uwaga: "Wysokość nie zależy od tego, gdzie leży trzeci wierzchołek wzdłuż prostej równoległej do podstawy.",
        },
        {
          nazwa: "Dopełnianie do prostokąta",
          slownie: "Trudną figurę wpisujemy w prostokąt. Pole figury to pole prostokąta minus pola kawałków, które dodaliśmy w rogach.",
          przyklad: "Czworokąt ma wierzchołki w środkach boków prostokąta o wymiarach $8$ i $6$ kratek. W rogach są $4$ trójkąty o przyprostokątnych $4$ i $3$ kratki, każdy ma $6$ kratek. Pole: $8 \\cdot 6 - 4 \\cdot 6 = 48 - 24 = 24$ kratki.",
          uwaga: "Nie zapomnij policzyć wszystkich czterech rogów. Pole figury jest mniejsze od pola prostokąta.",
        },
        {
          nazwa: "Obwód na kratce",
          slownie: "Obwód to długość brzegu figury. Liczymy kratki wzdłuż brzegu i mnożymy przez bok kratki. Gdy z rogu prostokąta wycinamy mniejszy prostokąt, obwód się nie zmienia.",
          tex: "2\\cdot(a+b)",
          litery: "$a$, $b$ – wymiary prostokąta w kratkach, w który wpisana jest figura.",
          przyklad: "Figura powstała z prostokąta $6$ na $4$ kratki po wycięciu rogu. Jej obwód to $2 \\cdot (6 + 4) = 20$ kratek, czyli $20$ cm przy kratce $1$ cm.",
          uwaga: "Pole figury po wycięciu rogu się zmniejsza, ale obwód zostaje taki sam.",
        },
      ],
      jak: [
        "Sprawdź, ile centymetrów ma bok kratki. Pole jednej kratki to bok razy bok.",
        "Policz w kratkach podstawę i wysokość, potem użyj wzoru na pole.",
        "Trudną figurę wpisz w prostokąt i odejmij pola trójkątów w rogach.",
        "Obwód liczymy w kratkach wzdłuż brzegu, a potem mnożymy przez bok kratki.",
      ],
      zadania: [
        {
          nr: "41",
          tresc: "Bok kratki ma $2$ cm. Kwadrat zajmuje $5$ kratek w poziomie i $5$ kratek w pionie. Jakie jest pole tego kwadratu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$25$ cm$^2$", "$50$ cm$^2$", "$20$ cm$^2$", "$100$ cm$^2$"],
          poprawna: 3,
        },
        {
          nr: "42",
          tresc: "Bok kratki ma $1$ cm. Podstawa trójkąta leży na linii kratki i ma $8$ kratek, a trzeci wierzchołek leży $5$ kratek nad podstawą. Jakie jest pole tego trójkąta? **Wybierz właściwą odpowiedź.**",
          opcje: ["$40$ cm$^2$", "$13$ cm$^2$", "$20$ cm$^2$", "$26$ cm$^2$"],
          poprawna: 2,
        },
        {
          nr: "43",
          tresc: "Bok kratki ma $1$ cm. Figurę utworzono z prostokąta o wymiarach $9$ na $6$ kratek, odcinając w jednym rogu prostokąt o wymiarach $4$ na $2$ kratki. Jaki jest obwód tej figury? **Wybierz właściwą odpowiedź.**",
          opcje: ["$30$ cm", "$54$ cm", "$38$ cm", "$46$ cm"],
          poprawna: 0,
        },
        {
          nr: "44",
          tresc: "Bok kratki ma $1$ cm. Trapez ma podstawy długości $6$ i $2$ kratki, a odległość między liniami, na których leżą podstawy, wynosi $4$ kratki. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Pole tego trapezu wynosi $24$ cm$^2$.", litery: "PF", poprawna: 1 },
            { tekst: "Pole tego trapezu wynosi $16$ cm$^2$.", litery: "PF", poprawna: 0 },
            { tekst: "Gdyby bok kratki miał $2$ cm, pole trapezu wynosiłoby $64$ cm$^2$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "45",
          tresc: "Bok kratki ma $1$ cm. Wierzchołki czworokąta leżą w środkach boków prostokąta o wymiarach $10$ na $6$ kratek. Jakie jest pole tego czworokąta? **Wybierz właściwą odpowiedź.**",
          opcje: ["$15$ cm$^2$", "$30$ cm$^2$", "$60$ cm$^2$", "$16$ cm$^2$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "46",
          punkty: 3,
          tresc: "Figura ma kształt litery L. Powstała z prostokąta o wymiarach $7$ na $5$ kratek, z którego w rogu wycięto prostokąt o wymiarach $3$ na $2$ kratki. Bok kratki ma $2$ cm. Oblicz pole i obwód tej figury w centymetrach. **Zapisz obliczenia.**",
          rozwiazanie: "Cały prostokąt ma $7 \\cdot 5 = 35$ kratek, a wycięty $3 \\cdot 2 = 6$ kratek. Figura ma $35 - 6 = 29$ kratek.\n\nJedna kratka ma pole $2 \\cdot 2 = 4$ cm$^2$, więc pole figury to $29 \\cdot 4 = 116$ cm$^2$.\n\nWycięcie rogu nie zmienia obwodu, więc obwód figury jest równy obwodowi prostokąta $7$ na $5$ kratek: $2 \\cdot (7 + 5) = 24$ kratki.\n\nBok kratki ma $2$ cm, więc obwód to $24 \\cdot 2 = 48$ cm.\n\nOdpowiedź: pole figury wynosi $116$ cm$^2$, a obwód $48$ cm.",
        },
        {
          nr: "47",
          punkty: 3,
          tresc: "Prostokąt ma wymiary $8$ na $6$ kratek. Wierzchołki czworokąta leżą na jego bokach: na dolnym boku $3$ kratki od lewego rogu, na prawym boku $2$ kratki od dolnego rogu, na górnym boku $5$ kratek od lewego rogu, a na lewym boku $4$ kratki od dolnego rogu. Bok kratki ma $1$ cm. Oblicz pole tego czworokąta. **Zapisz obliczenia.**",
          rozwiazanie: "Pole czworokąta to pole prostokąta minus pola czterech trójkątów w rogach.\n\nPole prostokąta: $8 \\cdot 6 = 48$ kratek.\n\nLewy dolny róg: przyprostokątne $3$ i $4$ kratki, pole $3 \\cdot 4 : 2 = 6$.\n\nPrawy dolny róg: przyprostokątne $8 - 3 = 5$ i $2$ kratki, pole $5 \\cdot 2 : 2 = 5$.\n\nPrawy górny róg: przyprostokątne $6 - 2 = 4$ i $8 - 5 = 3$ kratki, pole $4 \\cdot 3 : 2 = 6$.\n\nLewy górny róg: przyprostokątne $5$ i $6 - 4 = 2$ kratki, pole $5 \\cdot 2 : 2 = 5$.\n\nTrójkąty mają razem $6 + 5 + 6 + 5 = 22$ kratki.\n\nPole czworokąta: $48 - 22 = 26$ kratek, czyli $26$ cm$^2$.\n\nOdpowiedź: pole czworokąta wynosi $26$ cm$^2$.",
        },
      ],
      generatory: [
        {
          id: "kratka-pole",
          nazwa: "Pole na kratce",
          opis: "Oblicz pole trójkąta, trapezu, równoległoboku, figury z wyciętym rogiem albo schodków narysowanych na kratce.",
          generuj(r) {
            const u = r.int(1, 2);
            const w = r.int(0, 4);
            let opis, kratek, rozw;
            if (w === 0) {
              let b, h;
              do { b = r.int(3, 12); h = r.int(2, 8); } while ((b * h) % 2 !== 0);
              kratek = (b * h) / 2;
              opis = `Podstawa trójkąta leży na linii kratki i ma ${kr(b)}, a trzeci wierzchołek leży na linii kratki ${kr(h)} nad podstawą. Jakie jest pole tego trójkąta`;
              rozw = `Pole trójkąta to połowa iloczynu podstawy i wysokości: $${b} \\cdot ${h} : 2 = ${kratek}$ kratek.`;
            } else if (w === 1) {
              let a, c, h;
              do { a = r.int(3, 12); c = r.intBez(2, 10, a); h = r.int(2, 8); } while (((a + c) * h) % 2 !== 0);
              kratek = ((a + c) * h) / 2;
              opis = `Trapez ma dwie poziome podstawy: jedna ma ${kr(a)}, a druga ${kr(c)}. Linie kratki, na których leżą podstawy, są oddalone o ${kr(h)}. Jakie jest pole tego trapezu`;
              rozw = `Pole trapezu to suma podstaw razy wysokość, podzielona przez $2$: $(${a} + ${c}) \\cdot ${h} : 2 = ${kratek}$ kratek.`;
            } else if (w === 2) {
              const b = r.int(3, 12), h = r.int(2, 8);
              kratek = b * h;
              opis = `Równoległobok ma dwa poziome boki, każdy o długości ${kr(b)}. Linie kratki, na których one leżą, są oddalone o ${kr(h)}. Jakie jest pole tego równoległoboku`;
              rozw = `Pole równoległoboku to podstawa razy wysokość: $${b} \\cdot ${h} = ${kratek}$ kratek.`;
            } else if (w === 3) {
              const W = r.int(5, 12), H = r.int(4, 9);
              const c = r.int(2, W - 2), d = r.int(2, H - 2);
              kratek = W * H - c * d;
              opis = `Z prostokąta o wymiarach $${W}$ na ${kr(H)} wycięto w rogu prostokąt o wymiarach $${c}$ na ${kr(d)}. Jakie jest pole pozostałej figury`;
              rozw = `Od pola prostokąta odejmujemy pole wyciętego kawałka: $${W} \\cdot ${H} - ${c} \\cdot ${d} = ${W * H} - ${c * d} = ${kratek}$ kratek.`;
            } else {
              const n = r.int(3, 9);
              kratek = (n * (n + 1)) / 2;
              const wys = Array.from({ length: n }, (_, i) => i + 1);
              opis = `Figura składa się z $${n}$ kolumn kratek, które stoją obok siebie na jednej linii. Każda kolumna jest szerokości jednej kratki. Pierwsza ma wysokość $1$ kratki, a każda następna jest o jedną kratkę wyższa. Jakie jest pole tej figury`;
              rozw = `Kolumny mają kolejno $${wys.join(", ")}$ kratek, więc razem: $${wys.join(" + ")} = ${kratek}$ kratek.`;
            }
            const P = kratek * u * u;
            return zad(
              `Bok kratki ma $${u}$ cm. ${opis}?`,
              "Pole (w cm$^2$) $=$", P, `$${P}$ cm$^2$`,
              [
                rozw,
                u === 1 ? "Bok kratki ma $1$ cm, więc jedna kratka ma pole $1$ cm$^2$ i pole w cm$^2$ jest równe liczbie kratek." : `Bok kratki ma $2$ cm, więc jedna kratka ma pole $2 \\cdot 2 = 4$ cm$^2$. Pole: $${kratek} \\cdot 4 = ${P}$ cm$^2$.`,
              ],
            );
          },
        },
        {
          id: "kratka-obwod",
          nazwa: "Obwód na kratce",
          opis: "Oblicz obwód figury z wyciętym rogiem albo schodków narysowanych na kratce.",
          generuj(r) {
            const u = r.int(1, 3);
            if (r.chance()) {
              const W = r.int(4, 12), H = r.int(4, 9);
              const c = r.int(2, W - 2), d = r.int(2, H - 2);
              const kratek = 2 * (W + H);
              const P = kratek * u;
              return zad(
                `Bok kratki ma $${u}$ cm. Figurę utworzono z prostokąta o wymiarach $${W}$ na ${kr(H)}, odcinając w jednym rogu prostokąt o wymiarach $${c}$ na ${kr(d)}. Jaki obwód ma ta figura w centymetrach?`,
                "Obwód (w cm) $=$", P, `$${P}$ cm`,
                [
                  "Wycięcie prostokąta w rogu nie zmienia obwodu. Obwód figury jest taki sam jak obwód całego prostokąta.",
                  `Obwód w kratkach: $2 \\cdot (${W} + ${H}) = ${kratek}$.`,
                  u === 1 ? `Bok kratki ma $1$ cm, więc obwód ma $${P}$ cm.` : `Bok kratki ma $${u}$ cm, więc obwód: $${kratek} \\cdot ${u} = ${P}$ cm.`,
                ],
              );
            }
            const n = r.int(3, 9);
            const kratek = 4 * n;
            const P = kratek * u;
            return zad(
              `Bok kratki ma $${u}$ cm. Figura składa się z $${n}$ kolumn kratek, które stoją obok siebie na jednej linii. Każda kolumna jest szerokości jednej kratki. Pierwsza ma wysokość $1$ kratki, a każda następna jest o jedną kratkę wyższa. Jaki obwód ma ta figura w centymetrach?`,
              "Obwód (w cm) $=$", P, `$${P}$ cm`,
              [
                `Schodki mają szerokość $${n}$ kratek i wysokość $${n}$ kratek. Ich obwód jest taki sam jak obwód kwadratu $${n}$ na $${n}$ kratek.`,
                `Obwód w kratkach: $4 \\cdot ${n} = ${kratek}$.`,
                u === 1 ? `Bok kratki ma $1$ cm, więc obwód ma $${P}$ cm.` : `Bok kratki ma $${u}$ cm, więc obwód: $${kratek} \\cdot ${u} = ${P}$ cm.`,
              ],
            );
          },
        },
      ],
    },
  ],
};
