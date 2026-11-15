// Klasa 4 (szkoła podstawowa) · rozdział III „Mnożenie i dzielenie” – Klucz do matematyki 4 (Nowa Era, 2026).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).

// --- Pomocnicze (tylko dla tego pliku)

/** Liczba do wzoru: od pięciu cyfr z cienkimi odstępami, 12345 -> "12\,345" (liczby czterocyfrowe bez odstępu). */
const t = (n) => (n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : String(n));

/** „dopisujemy dwa zera”. */
const ZERA = ["", "jedno zero", "dwa zera", "trzy zera", "cztery zera"];

/** Zdanie zaczynamy wielką literą. */
const wielka = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Miejsca z rzeczami: bez liczebników przy rzeczach w mianowniku (żeby nie mylić „5 ołówków” z „3 ołówki”).
 * loc – „w 3 pudełkach”, gen – „do 3 pudełek”, kazde – „w każdym pudełku”, rz – „po 5 ołówków”.
 */
const MIEJSCA = [
  { loc: "pudełkach", gen: "pudełek", kazde: "każdym pudełku", rz: "ołówków" },
  { loc: "rzędach", gen: "rzędów", kazde: "każdym rzędzie", rz: "krzeseł" },
  { loc: "torebkach", gen: "torebek", kazde: "każdej torebce", rz: "cukierków" },
  { loc: "koszykach", gen: "koszyków", kazde: "każdym koszyku", rz: "jabłek" },
  { loc: "skrzynkach", gen: "skrzynek", kazde: "każdej skrzynce", rz: "gruszek" },
  { loc: "regałach", gen: "regałów", kazde: "każdym regale", rz: "książek" },
  { loc: "wazonach", gen: "wazonów", kazde: "każdym wazonie", rz: "tulipanów" },
  { loc: "szufladach", gen: "szuflad", kazde: "każdej szufladzie", rz: "skarpetek" },
];

/** Dwie osoby i czasowniki do zadań „ile razy więcej”; kwoty podajemy w jednostkach, które się nie odmieniają. */
const OSOBY_K = [["Ola", "Ania"], ["Zosia", "Kasia"], ["Hania", "Marta"], ["Ewa", "Basia"]];
const OSOBY_M = [["Kuba", "Bartek"], ["Marek", "Tomek"], ["Piotr", "Adam"], ["Jacek", "Olek"]];
const CZYNNOSCI = [
  { k: "ma", m: "ma", kpl: "mają", mpl: "mają", jedn: "zł", ile: "złotych" },
  { k: "zaoszczędziła", m: "zaoszczędził", kpl: "zaoszczędziły", mpl: "zaoszczędzili", jedn: "zł", ile: "złotych" },
  { k: "przebiegła", m: "przebiegł", kpl: "przebiegły", mpl: "przebiegli", jedn: "m", ile: "metrów" },
  { k: "zebrała", m: "zebrał", kpl: "zebrały", mpl: "zebrali", jedn: "kg jabłek", ile: "kilogramów jabłek" },
];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 1. Jak rozwiązywać zadania tekstowe
    {
      id: "zadania-tekstowe",
      nazwa: "Jak rozwiązywać zadania tekstowe",
      sciaga: [
        {
          nazwa: "Jak czytać zadanie",
          slownie: "Przeczytaj zadanie dwa razy. Wypisz, co wiesz (to są dane), i zapisz, o co pytają. Dopiero potem wybierz działanie.",
          przyklad: "W pudełku jest $6$ ołówków. Ile ołówków jest w $7$ takich pudełkach? Dane: $6$ ołówków w pudełku i $7$ pudełek. Pytanie: ile ołówków razem? W każdym pudełku jest tyle samo, więc mnożymy: $7 \\cdot 6 = 42$.",
          uwaga: "Nie wybieraj działania po jednym słowie. Słowo „razem” nie zawsze oznacza dodawanie, a „po równo” nie zawsze dzielenie. Pomyśl, co się dzieje w zadaniu.",
        },
        {
          nazwa: "Po tyle samo: mnożyć czy dzielić",
          slownie: "Gdy jest kilka grup po tyle samo i szukamy wszystkich rzeczy, mnożymy. Gdy dzielimy rzeczy po równo albo pytamy, ile będzie grup, dzielimy.",
          tex: "5\\cdot 6=30\\qquad 30:6=5",
          przyklad: "$24$ uczniów ustawiamy w grupy po $4$. Ile grup? Dzielimy: $24 : 4 = 6$. A $6$ grup po $4$ uczniów to $6 \\cdot 4 = 24$ uczniów.",
          uwaga: "Przed dzieleniem sprawdź, co jest całością. Całość to liczba, którą dzielimy, a nie ta, która jest mniejsza.",
        },
        {
          nazwa: "Ile razy, a o ile",
          slownie: "„Ile razy więcej” albo „ile razy mniej” to mnożenie i dzielenie. „O ile więcej” albo „o ile mniej” to dodawanie i odejmowanie.",
          przyklad: "Ania ma $12$ zł. Bartek ma $3$ razy więcej: $3 \\cdot 12 = 36$ zł. Gdyby miał o $3$ zł więcej, miałby $12 + 3 = 15$ zł. Ile razy więcej ma Bartek? $36 : 12 = 3$.",
          uwaga: "„Trzy razy więcej” to nie to samo co „o trzy więcej”. Przeczytaj uważnie, które to jest.",
        },
        {
          nazwa: "Kilka działań i odpowiedź",
          slownie: "Gdy zadanie ma kilka kroków, licz po kolei i zapisuj każdy krok. Na końcu sprawdź, czy wynik ma sens, i napisz odpowiedź całym zdaniem.",
          przyklad: "Bilet kosztuje $8$ zł. Kupiono $5$ biletów i zapłacono $50$ zł. Ile pieniędzy wróci? Najpierw $5 \\cdot 8 = 40$ zł, potem $50 - 40 = 10$ zł. Odpowiedź: Wróci $10$ zł.",
          uwaga: "Odpowiedz na pytanie, które zadano. Wynik pierwszego kroku ($40$ zł) nie jest jeszcze odpowiedzią.",
        },
      ],
      jak: [
        "Przeczytaj zadanie dwa razy i podkreśl w myślach liczby oraz pytanie.",
        "Zastanów się, co się dzieje: grupy po tyle samo (mnożymy), dzielenie po równo (dzielimy), porównanie (ile razy albo o ile).",
        "Policz po kolei, zapisując każde działanie.",
        "Sprawdź, czy wynik ma sens (na przykład czy nie wyszło mniej, niż miało być), i napisz odpowiedź zdaniem.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "W jednej paczce jest $8$ batonów. Ile batonów jest w $6$ takich paczkach? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$", "$42$", "$48$", "$54$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Mama kupiła $36$ jajek i włożyła je do pudełek, po $6$ jajek w każdym pudełku. Ile pudełek jej potrzeba? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$30$", "$42$", "$216$"],
          poprawna: 0,
        },
        {
          nr: "3",
          tresc: "Kasia ma $9$ naklejek. Tomek ma $4$ razy więcej. Ile naklejek ma Tomek? **Wybierz właściwą odpowiedź.**",
          opcje: ["$13$", "$36$", "$5$", "$45$"],
          poprawna: 1,
        },
        {
          nr: "4",
          tresc: "Pan Jan miał $40$ zł. Kupił $3$ zeszyty po $7$ zł. Ile pieniędzy mu zostało? **Wybierz właściwą odpowiedź.**",
          opcje: ["$21$ zł", "$33$ zł", "$61$ zł", "$19$ zł"],
          poprawna: 3,
        },
        {
          nr: "5",
          tresc: "Ola ma $30$ klocków. Jaś ma $5$ razy mniej klocków niż Ola. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Jaś ma $6$ klocków.", litery: "PF", poprawna: 0 },
            { tekst: "Jaś ma $25$ klocków.", litery: "PF", poprawna: 1 },
            { tekst: "Ola ma o $24$ klocki więcej niż Jaś.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "W autobusie jechało $45$ osób. Na przystanku wysiadło $9$ osób, a wsiadło $3$ razy więcej osób, niż wysiadło. Ile osób jedzie teraz autobusem? **Zapisz obliczenia.**",
          rozwiazanie: "Wsiadło $3$ razy więcej osób, niż wysiadło: $3 \\cdot 9 = 27$.\n\nPo wysiadaniu zostało: $45 - 9 = 36$ osób.\n\nPotem wsiadło $27$ osób: $36 + 27 = 63$.\n\nOdpowiedź: Teraz autobusem jadą $63$ osoby.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Klasa 4a zbiera pieniądze na wycieczkę. Każdy z $12$ uczniów wpłacił po $15$ zł. Autokar kosztuje $140$ zł, a resztę pieniędzy przeznaczono na bilety do muzeum. Ile złotych zostanie na bilety? **Zapisz obliczenia.**",
          rozwiazanie: "Wszyscy wpłacili razem: $12 \\cdot 15 = 12 \\cdot 10 + 12 \\cdot 5 = 120 + 60 = 180$ zł.\n\nPo zapłaceniu za autokar zostanie: $180 - 140 = 40$ zł.\n\nOdpowiedź: Na bilety zostanie $40$ zł.",
        },
      ],
      generatory: [
        {
          id: "zadania-grupy",
          nazwa: "Po tyle samo",
          opis: "Zadanie o grupach po tyle samo: ile jest razem, ile w jednej grupie albo ile potrzeba grup.",
          generuj(r) {
            const c = r.pick(MIEJSCA);
            const tryb = r.int(0, 2);
            const n = r.int(2, 12);
            const k = r.int(5, 12);
            const R = n * k;
            if (tryb === 0) {
              return {
                tresc: `W $${n}$ ${c.loc} jest po $${k}$ ${c.rz}. Ile ${c.rz} jest razem?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Razem" }],
                odpowiedz: { w: R },
                wynik: `$${R}$`,
                rozwiazanie: [`W każdym miejscu jest tyle samo, więc mnożymy: $${n} \\cdot ${k} = ${R}$.`],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `${wielka(c.rz)} jest razem $${R}$. Rozłożono je po równo do $${n}$ ${c.gen}. Ile ${c.rz} jest w ${c.kazde}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "W jednym miejscu" }],
                odpowiedz: { w: k },
                wynik: `$${k}$`,
                rozwiazanie: [`Dzielimy po równo, więc dzielimy: $${R} : ${n} = ${k}$.`, `Sprawdzenie: $${n} \\cdot ${k} = ${R}$.`],
              };
            }
            return {
              tresc: `${wielka(c.rz)} jest razem $${R}$. Wkładamy je do ${c.gen}, po $${k}$ w ${c.kazde}. Ile ${c.gen} potrzeba?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Potrzeba" }],
              odpowiedz: { w: n },
              wynik: `$${n}$`,
              rozwiazanie: [`Pytamy, ile razy $${k}$ mieści się w $${R}$, więc dzielimy: $${R} : ${k} = ${n}$.`, `Sprawdzenie: $${n} \\cdot ${k} = ${R}$.`],
            };
          },
        },
        {
          id: "zadania-ile-razy",
          nazwa: "Ile razy, o ile",
          opis: "Dwie osoby i porównanie: ile razy więcej, o ile więcej, ile razem.",
          generuj(r) {
            const kobiety = r.chance();
            const [A, B] = r.pick(kobiety ? OSOBY_K : OSOBY_M);
            const cz = r.pick(CZYNNOSCI);
            const v = kobiety ? cz.k : cz.m;
            const vpl = kobiety ? cz.kpl : cz.mpl;
            const tryb = r.int(0, 5);
            const n = r.int(2, 9);
            if (tryb === 0) {
              const x = r.int(2, 30);
              return {
                tresc: `${A} ${v} $${x}$ ${cz.jedn}. ${B} ${v} $${n}$ razy więcej. Ile ${cz.ile} ${v} ${B}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Ile ${cz.ile}` }],
                odpowiedz: { w: n * x },
                wynik: `$${n * x}$`,
                rozwiazanie: [`„$${n}$ razy więcej” to mnożenie: $${n} \\cdot ${x} = ${n * x}$.`],
              };
            }
            if (tryb === 1) {
              const y = r.int(2, 10);
              const X = n * y;
              return {
                tresc: `${A} ${v} $${X}$ ${cz.jedn}, a ${B} ${v} $${n}$ razy mniej. Ile ${cz.ile} ${v} ${B}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Ile ${cz.ile}` }],
                odpowiedz: { w: y },
                wynik: `$${y}$`,
                rozwiazanie: [`„$${n}$ razy mniej” to dzielenie: $${X} : ${n} = ${y}$.`, `Sprawdzenie: $${n} \\cdot ${y} = ${X}$.`],
              };
            }
            if (tryb === 2) {
              const x = r.int(2, 30);
              return {
                tresc: `${A} ${v} $${x}$ ${cz.jedn}. ${B} ${v} $${n}$ razy więcej. Ile ${cz.ile} ${vpl} razem?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Razem" }],
                odpowiedz: { w: x + n * x },
                wynik: `$${x + n * x}$`,
                rozwiazanie: [`${B}: $${n} \\cdot ${x} = ${n * x}$.`, `Razem: $${x} + ${n * x} = ${x + n * x}$.`],
              };
            }
            if (tryb === 3) {
              const x = r.int(10, 90);
              const d = r.int(5, 40);
              return {
                tresc: `${A} ${v} $${x}$ ${cz.jedn}. ${B} ${v} o $${d}$ ${cz.jedn.split(" ")[0]} więcej. Ile ${cz.ile} ${vpl} razem?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Razem" }],
                odpowiedz: { w: 2 * x + d },
                wynik: `$${2 * x + d}$`,
                rozwiazanie: [`„O $${d}$ więcej” to dodawanie: ${B} ${v} $${x} + ${d} = ${x + d}$.`, `Razem: $${x} + ${x + d} = ${2 * x + d}$.`],
              };
            }
            const x = tryb === 4 ? r.int(2, 10) : r.int(2, 30);
            if (tryb === 4) {
              return {
                tresc: `${A} ${v} $${x}$ ${cz.jedn}, a ${B} ${v} $${n * x}$ ${cz.jedn.split(" ")[0]}. Ile razy więcej ${v} ${B} niż ${A}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Ile razy więcej" }],
                odpowiedz: { w: n },
                wynik: `$${n}$`,
                rozwiazanie: [`Pytamy „ile razy więcej”, więc dzielimy: $${n * x} : ${x} = ${n}$.`, `Sprawdzenie: $${n} \\cdot ${x} = ${n * x}$.`],
              };
            }
            return {
              tresc: `${A} ${v} $${x}$ ${cz.jedn}, a ${B} ${v} $${n * x}$ ${cz.jedn.split(" ")[0]}. O ile więcej ${v} ${B} niż ${A}?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "O ile więcej" }],
              odpowiedz: { w: n * x - x },
              wynik: `$${n * x - x}$`,
              rozwiazanie: [`Pytamy „o ile więcej”, więc odejmujemy: $${n * x} - ${x} = ${n * x - x}$.`, `Sprawdzenie: $${x} + ${n * x - x} = ${n * x}$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 2. Tabliczka mnożenia
    {
      id: "tabliczka-mnozenia",
      nazwa: "Tabliczka mnożenia",
      sciaga: [
        {
          nazwa: "Mnożenie to dodawanie",
          slownie: "Mnożenie to skrócony zapis dodawania takich samych liczb. Pierwsza liczba mówi, ile razy dodajemy drugą.",
          tex: "4\\cdot 6=6+6+6+6=24",
          przyklad: "$3 \\cdot 5 = 5 + 5 + 5 = 15$. To trzy grupy po pięć.",
          uwaga: "$3 \\cdot 5$ to nie jest $3 + 5$. Mnożenie to dodawanie takich samych składników.",
        },
        {
          nazwa: "Czynniki i iloczyn",
          slownie: "Liczby, które mnożymy, nazywamy czynnikami. Wynik mnożenia to iloczyn. Czynniki można zamieniać miejscami.",
          tex: "6\\cdot 7=42",
          przyklad: "W działaniu $6 \\cdot 7 = 42$ liczby $6$ i $7$ to czynniki, a $42$ to iloczyn. Zamiana czynników nic nie zmienia: $7 \\cdot 6 = 42$.",
          uwaga: "Dzięki zamianie czynników wystarczy znać połowę tabliczki: jeśli znasz $4 \\cdot 9$, to znasz też $9 \\cdot 4$.",
        },
        {
          nazwa: "Mnożenie przez 0 i przez 1",
          slownie: "Gdy jeden z czynników to $0$, iloczyn jest równy $0$. Gdy jeden z czynników to $1$, iloczyn jest równy drugiemu czynnikowi.",
          tex: "8\\cdot 0=0\\qquad 8\\cdot 1=8",
          przyklad: "$0 \\cdot 25 = 0$, bo zero grup nie daje nic. $1 \\cdot 25 = 25$, bo jedna grupa to $25$.",
          uwaga: "Nie myl z dodawaniem: $8 + 0 = 8$, ale $8 \\cdot 0 = 0$.",
        },
        {
          nazwa: "Jak zapamiętać trudne iloczyny",
          slownie: "Trudniejszy iloczyn można policzyć z łatwiejszego. Razy $9$ to razy $10$ minus jeszcze raz. Razy $6$ to razy $5$ i jeszcze raz.",
          przyklad: "$9 \\cdot 7 = 10 \\cdot 7 - 7 = 70 - 7 = 63$. A $6 \\cdot 7 = 5 \\cdot 7 + 7 = 35 + 7 = 42$.",
          uwaga: "Po zmianie na łatwiejszy iloczyn pamiętaj o poprawce. Od $70$ odejmujemy jedną siódemkę, a nie jedną jedynkę.",
        },
      ],
      jak: [
        "Zapisz, które liczby są czynnikami, i przypomnij sobie iloczyn z tabliczki.",
        "Gdy nie pamiętasz iloczynu, zamień czynniki miejscami albo policz go z łatwiejszego (razy $10$, razy $5$).",
        "Pamiętaj o poprawce: przy razy $9$ odejmujesz jeszcze jeden raz, przy razy $6$ dodajesz jeszcze jeden raz.",
        "Sprawdź wynik, zamieniając czynniki: $7 \\cdot 8$ i $8 \\cdot 7$ muszą dać to samo.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Oblicz $7 \\cdot 8$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$54$", "$56$", "$63$", "$49$"],
          poprawna: 1,
        },
        {
          nr: "9",
          tresc: "W działaniu $6 \\cdot 9 = 54$ liczba $54$ jest **Wybierz właściwą odpowiedź.**",
          opcje: ["iloczynem", "czynnikiem", "ilorazem", "różnicą"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "Które z działań ma wynik $0$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9 \\cdot 1$", "$9 \\cdot 9$", "$9 \\cdot 0$", "$9 + 0$"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "Wiadomo, że $7 \\cdot 6 = 42$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$6 \\cdot 7 = 42$", litery: "PF", poprawna: 0 },
            { tekst: "$7 \\cdot 6 = 6 + 6 + 6 + 6 + 6$", litery: "PF", poprawna: 1 },
            { tekst: "$7 \\cdot 6 = 7 \\cdot 5 + 7$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "12",
          tresc: "Który z iloczynów jest największy? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4 \\cdot 10$", "$6 \\cdot 7$", "$5 \\cdot 9$", "$8 \\cdot 5$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "W sali kinowej jest $9$ rzędów po $8$ miejsc. Na seans sprzedano bilety na wszystkie miejsca oprócz $5$. Ile biletów sprzedano? **Zapisz obliczenia.**",
          rozwiazanie: "Wszystkich miejsc jest: $9 \\cdot 8$. Liczymy z łatwiejszego iloczynu: $9 \\cdot 8 = 10 \\cdot 8 - 8 = 80 - 8 = 72$.\n\nNie sprzedano $5$ biletów, więc sprzedano: $72 - 5 = 67$.\n\nOdpowiedź: Sprzedano $67$ biletów.",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "Oblicz $8 \\cdot 7$ na dwa sposoby: raz jako $8 \\cdot 5 + 8 \\cdot 2$, a drugi raz jako $10 \\cdot 7 - 2 \\cdot 7$. Sprawdź, czy wyniki są takie same, i porównaj je z $7 \\cdot 8$. **Zapisz obliczenia.**",
          rozwiazanie: "Pierwszy sposób: $8 \\cdot 5 + 8 \\cdot 2 = 40 + 16 = 56$.\n\nDrugi sposób: $10 \\cdot 7 - 2 \\cdot 7 = 70 - 14 = 56$.\n\nWyniki są takie same. Po zamianie czynników też wychodzi $7 \\cdot 8 = 56$.\n\nOdpowiedź: $8 \\cdot 7 = 56$.",
        },
      ],
      generatory: [
        {
          id: "tabliczka-iloczyn",
          nazwa: "Iloczyn z tabliczki",
          opis: "Oblicz iloczyn dwóch liczb z tabliczki mnożenia albo wykorzystaj podany iloczyn, żeby policzyć sąsiedni.",
          generuj(r) {
            const tryb = r.int(0, 3);
            const a = r.int(2, 10);
            const b = r.int(2, 10);
            if (tryb === 0) {
              return {
                tresc: `Oblicz $${a} \\cdot ${b}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Iloczyn" }],
                odpowiedz: { w: a * b },
                wynik: `$${a * b}$`,
                rozwiazanie: [`Z tabliczki mnożenia: $${a} \\cdot ${b} = ${a * b}$.`, `Sprawdzenie po zamianie czynników: $${b} \\cdot ${a} = ${a * b}$.`],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Jaki jest iloczyn liczb $${a}$ i $${b}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Iloczyn" }],
                odpowiedz: { w: a * b },
                wynik: `$${a * b}$`,
                rozwiazanie: [`Iloczyn to wynik mnożenia: $${a} \\cdot ${b}$.`, `$${a} \\cdot ${b} = ${a * b}$.`],
              };
            }
            const wiecejCzyMniej = b >= 3 && (tryb === 2 || b === 10);
            const cc = wiecejCzyMniej ? b - 1 : b + 1;
            const w = a * b;
            const znane = a * cc;
            return {
              tresc: `Wiadomo, że $${a} \\cdot ${cc} = ${znane}$. Ile jest równe $${a} \\cdot ${b}$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Iloczyn" }],
              odpowiedz: { w },
              wynik: `$${w}$`,
              rozwiazanie: [
                wiecejCzyMniej
                  ? `Czynnik $${b}$ jest o $1$ większy od $${cc}$, więc wynik jest o jedną liczbę $${a}$ większy: $${znane} + ${a} = ${w}$.`
                  : `Czynnik $${b}$ jest o $1$ mniejszy od $${cc}$, więc wynik jest o jedną liczbę $${a}$ mniejszy: $${znane} - ${a} = ${w}$.`,
                `Sprawdzenie z tabliczki: $${a} \\cdot ${b} = ${w}$.`,
              ],
            };
          },
        },
        {
          id: "tabliczka-czynnik",
          nazwa: "Brakujący czynnik",
          opis: "Znajdź liczbę, która pasuje w miejsce kwadracika w mnożeniu.",
          generuj(r) {
            const a = r.int(2, 10);
            const x = r.int(2, 10);
            const P = a * x;
            const przod = r.chance();
            const rownosc = przod ? `\\square \\cdot ${a} = ${P}` : `${a} \\cdot \\square = ${P}`;
            return {
              tresc: `Jaka liczba pasuje w miejsce $\\square$ w równości $${rownosc}$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba" }],
              odpowiedz: { w: x },
              wynik: `$${x}$`,
              rozwiazanie: [
                `Brakuje czynnika: dzielimy iloczyn przez drugi czynnik: $${P} : ${a} = ${x}$.`,
                `Sprawdzenie: $${przod ? `${x} \\cdot ${a}` : `${a} \\cdot ${x}`} = ${P}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3. Tabliczka dzielenia
    {
      id: "tabliczka-dzielenia",
      nazwa: "Tabliczka dzielenia",
      sciaga: [
        {
          nazwa: "Nazwy liczb w dzieleniu",
          slownie: "Liczbę, którą dzielimy, nazywamy dzielną. Liczbę, przez którą dzielimy, nazywamy dzielnikiem. Wynik dzielenia to iloraz.",
          tex: "42:6=7",
          przyklad: "W działaniu $42 : 6 = 7$ liczba $42$ to dzielna, $6$ to dzielnik, a $7$ to iloraz.",
          uwaga: "W dzieleniu kolejność jest ważna: $42 : 6 = 7$, ale $6 : 42$ to zupełnie inne działanie.",
        },
        {
          nazwa: "Dzielenie i mnożenie",
          slownie: "Dzielenie jest działaniem odwrotnym do mnożenia. Z jednego mnożenia dostajemy dwa dzielenia. Wynik dzielenia sprawdzamy mnożeniem.",
          tex: "6\\cdot 7=42\\qquad 42:6=7\\qquad 42:7=6",
          przyklad: "Skoro $5 \\cdot 8 = 40$, to $40 : 8 = 5$ i $40 : 5 = 8$. Sprawdzamy: $8 \\cdot 5 = 40$, więc się zgadza.",
          uwaga: "Z tabliczki mnożenia możesz czytać tabliczkę dzielenia. Jeśli znasz $9 \\cdot 7 = 63$, to znasz też $63 : 9 = 7$.",
        },
        {
          nazwa: "Dwa znaczenia dzielenia",
          slownie: "Dzielenie po równo: ile dostanie każdy. Dzielenie na grupy: ile razy jedna liczba mieści się w drugiej. W obu przypadkach działanie jest takie samo.",
          przyklad: "$20$ cukierków dla $4$ dzieci po równo: $20 : 4 = 5$ cukierków dla każdego. $20$ cukierków w torebkach po $4$: $20 : 4 = 5$ torebek.",
          uwaga: "Wynik ma inne znaczenie w każdym z tych zadań (cukierki albo torebki), więc zawsze sprawdź, o co pytają.",
        },
        {
          nazwa: "Dzielenie przez 1 i przez zero",
          slownie: "Dzielenie przez $1$ nie zmienia liczby. Liczba podzielona przez siebie daje $1$. Zero podzielone przez dowolną liczbę daje $0$. Przez zero dzielić nie wolno.",
          tex: "9:1=9\\qquad 9:9=1\\qquad 0:9=0",
          przyklad: "Nie da się podzielić $5$ cukierków po równo na $0$ osób, dlatego działanie $5 : 0$ nie ma wyniku.",
          uwaga: "$0 : 9 = 0$, ale $9 : 0$ nie wolno zapisać. Zero może być dzielną, ale nie może być dzielnikiem.",
        },
        {
          nazwa: "Brakująca liczba w dzieleniu",
          slownie: "Brakującą dzielną znajdujemy mnożeniem: iloraz razy dzielnik. Brakujący dzielnik znajdujemy dzieleniem: dzielna podzielona przez iloraz.",
          tex: "\\square:4=7\\qquad 35:\\square=5",
          przyklad: "W równości $\\square : 4 = 7$ brakuje dzielnej: $7 \\cdot 4 = 28$. W równości $35 : \\square = 5$ brakuje dzielnika: $35 : 5 = 7$.",
          uwaga: "Nie dzielimy „na ślepo”. Zastanów się, której liczby brakuje, i sprawdź wynik działaniem odwrotnym.",
        },
      ],
      jak: [
        "Nazwij liczby: dzielna, dzielnik, iloraz. Zobacz, której z nich szukasz.",
        "Przypomnij sobie mnożenie z tej samej trójki liczb, na przykład $6 \\cdot 7 = 42$ dla $42 : 6$.",
        "Brakującą dzielną znajdziesz mnożeniem, a brakujący dzielnik dzieleniem.",
        "Sprawdź wynik mnożeniem: iloraz razy dzielnik musi dać dzielną.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "W działaniu $56 : 8 = 7$ liczba $8$ jest **Wybierz właściwą odpowiedź.**",
          opcje: ["dzielną", "ilorazem", "dzielnikiem", "iloczynem"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "Oblicz $63 : 7$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$8$", "$56$", "$9$"],
          poprawna: 3,
        },
        {
          nr: "17",
          tresc: "Jaka liczba pasuje w miejsce $\\square$ w równości $\\square : 6 = 8$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$", "$48$", "$42$", "$54$"],
          poprawna: 1,
        },
        {
          nr: "18",
          tresc: "Jaka liczba pasuje w miejsce $\\square$ w równości $45 : \\square = 9$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$36$", "$405$", "$5$", "$54$"],
          poprawna: 2,
        },
        {
          nr: "19",
          tresc: "Wiadomo, że $8 \\cdot 9 = 72$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$72 : 9 = 8$", litery: "PF", poprawna: 0 },
            { tekst: "$72 : 8 = 9$", litery: "PF", poprawna: 0 },
            { tekst: "$9 : 72 = 8$", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Pani Ewa upiekła $48$ ciastek i rozłożyła je po równo na $6$ talerzyków. Ile ciastek leży na jednym talerzyku? Ile talerzyków by potrzebowała, gdyby na każdym leżały po $4$ ciastka? **Zapisz obliczenia.**",
          rozwiazanie: "Dzielimy po równo na $6$ talerzyków: $48 : 6 = 8$. Sprawdzenie: $6 \\cdot 8 = 48$.\n\nGdy na talerzyku leżą po $4$ ciastka, pytamy, ile razy $4$ mieści się w $48$: $48 : 4 = 12$. Sprawdzenie: $12 \\cdot 4 = 48$.\n\nOdpowiedź: Na jednym talerzyku leży $8$ ciastek. Po $4$ ciastka na talerzyku potrzeba $12$ talerzyków.",
        },
        {
          nr: "21",
          punkty: 2,
          tresc: "Znajdź brakujące liczby: $\\square : 5 = 9$, $72 : \\square = 8$ oraz $\\square : 9 = 7$. Sprawdź wyniki mnożeniem. **Zapisz obliczenia.**",
          rozwiazanie: "W pierwszej równości brakuje dzielnej, więc mnożymy: $9 \\cdot 5 = 45$. Sprawdzenie: $45 : 5 = 9$.\n\nW drugiej równości brakuje dzielnika, więc dzielimy: $72 : 8 = 9$. Sprawdzenie: $72 : 9 = 8$.\n\nW trzeciej równości brakuje dzielnej: $7 \\cdot 9 = 63$. Sprawdzenie: $63 : 9 = 7$.\n\nOdpowiedź: Brakujące liczby to $45$, $9$ i $63$.",
        },
      ],
      generatory: [
        {
          id: "dzielenie-iloraz",
          nazwa: "Iloraz z tabliczki",
          opis: "Oblicz iloraz z tabliczki dzielenia albo skorzystaj z podanego mnożenia.",
          generuj(r) {
            const tryb = r.int(0, 2);
            const a = r.int(2, 10);
            const b = r.int(2, 10);
            const P = a * b;
            if (tryb === 0) {
              return {
                tresc: `Oblicz $${P} : ${a}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Iloraz" }],
                odpowiedz: { w: b },
                wynik: `$${b}$`,
                rozwiazanie: [`Szukamy liczby, która pomnożona przez $${a}$ da $${P}$: $${b} \\cdot ${a} = ${P}$.`, `Zatem $${P} : ${a} = ${b}$.`],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Ile razy liczba $${a}$ mieści się w liczbie $${P}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Ile razy" }],
                odpowiedz: { w: b },
                wynik: `$${b}$`,
                rozwiazanie: [`Pytamy, ile razy $${a}$ mieści się w $${P}$, więc dzielimy: $${P} : ${a} = ${b}$.`, `Sprawdzenie: $${b} \\cdot ${a} = ${P}$.`],
              };
            }
            return {
              tresc: `Wiadomo, że $${a} \\cdot ${b} = ${P}$. Ile jest równe $${P} : ${b}$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Iloraz" }],
              odpowiedz: { w: a },
              wynik: `$${a}$`,
              rozwiazanie: [`Dzielenie jest działaniem odwrotnym do mnożenia: z $${a} \\cdot ${b} = ${P}$ dostajemy $${P} : ${b} = ${a}$.`, `Sprawdzenie: $${a} \\cdot ${b} = ${P}$.`],
            };
          },
        },
        {
          id: "dzielenie-brakujaca",
          nazwa: "Brakująca liczba",
          opis: "Znajdź brakującą dzielną, dzielnik albo iloraz.",
          generuj(r) {
            const tryb = r.int(0, 2);
            const a = r.int(2, 10);
            const b = r.int(2, 10);
            const P = a * b;
            if (tryb === 0) {
              return {
                tresc: `Jaka liczba pasuje w miejsce $\\square$ w równości $\\square : ${a} = ${b}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba" }],
                odpowiedz: { w: P },
                wynik: `$${P}$`,
                rozwiazanie: [`Brakuje dzielnej: mnożymy iloraz przez dzielnik: $${b} \\cdot ${a} = ${P}$.`, `Sprawdzenie: $${P} : ${a} = ${b}$.`],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `Jaka liczba pasuje w miejsce $\\square$ w równości $${P} : \\square = ${b}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba" }],
                odpowiedz: { w: a },
                wynik: `$${a}$`,
                rozwiazanie: [`Brakuje dzielnika: dzielimy dzielną przez iloraz: $${P} : ${b} = ${a}$.`, `Sprawdzenie: $${P} : ${a} = ${b}$.`],
              };
            }
            return {
              tresc: `Jaka liczba pasuje w miejsce $\\square$ w równości $${P} : ${a} = \\square$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba" }],
              odpowiedz: { w: b },
              wynik: `$${b}$`,
              rozwiazanie: [`Brakuje ilorazu: dzielimy: $${P} : ${a} = ${b}$.`, `Sprawdzenie: $${b} \\cdot ${a} = ${P}$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4. Sprytne mnożenie
    {
      id: "sprytne-mnozenie",
      nazwa: "Sprytne mnożenie",
      sciaga: [
        {
          nazwa: "Mnożenie przez 10, 100, 1000",
          slownie: "Mnożąc przez $10$, dopisujemy jedno zero. Mnożąc przez $100$, dopisujemy dwa zera. Mnożąc przez $1000$, dopisujemy trzy zera.",
          tex: "7\\cdot 100=700",
          przyklad: "$38 \\cdot 10 = 380$. $45 \\cdot 1000 = 45\\,000$. $120 \\cdot 10 = 1200$.",
          uwaga: "Dopisujemy zera, a nie dodajemy: $50 \\cdot 10 = 500$, a nie $510$.",
        },
        {
          nazwa: "Czynniki z zerami na końcu",
          slownie: "Mnożymy liczby bez zer, a potem dopisujemy wszystkie zera, które były w obu czynnikach.",
          tex: "60\\cdot 700=42\\,000",
          przyklad: "$60 \\cdot 700$: najpierw $6 \\cdot 7 = 42$. W czynnikach jest razem $3$ zera, więc $60 \\cdot 700 = 42\\,000$.",
          uwaga: "Policz zera we wszystkich czynnikach: $50 \\cdot 40 = 2000$, a nie $200$.",
        },
        {
          nazwa: "Kolejność czynników",
          slownie: "Czynniki można mnożyć w dowolnej kolejności. Szukamy takich par, które dadzą $10$, $100$ albo $1000$: $2 \\cdot 5$, $4 \\cdot 25$, $8 \\cdot 125$.",
          tex: "25\\cdot 7\\cdot 4=25\\cdot 4\\cdot 7",
          przyklad: "$25 \\cdot 7 \\cdot 4 = 25 \\cdot 4 \\cdot 7 = 100 \\cdot 7 = 700$.",
          uwaga: "Zamieniać kolejność wolno przy mnożeniu. Przy dzieleniu nie wolno: $12 : 3$ to nie to samo co $3 : 12$.",
        },
        {
          nazwa: "Mnożenie przez rozbicie",
          slownie: "Jeden czynnik rozbijamy na dziesiątki i jedności. Mnożymy każdy kawałek osobno i dodajemy wyniki.",
          tex: "6\\cdot 43=6\\cdot 40+6\\cdot 3",
          przyklad: "$6 \\cdot 43 = 6 \\cdot 40 + 6 \\cdot 3 = 240 + 18 = 258$.",
          uwaga: "Pomnóż każdy kawałek, a nie tylko pierwszy. $6 \\cdot 40 + 3$ to nie to samo co $6 \\cdot 43$.",
        },
        {
          nazwa: "Prawie okrągła liczba",
          slownie: "Gdy czynnik jest tuż przy $100$ albo $1000$, mnożymy przez okrągłą liczbę i poprawiamy wynik: jeśli czynnik jest za mały, odejmujemy, a jeśli za duży, dodajemy.",
          przyklad: "$9 \\cdot 98 = 9 \\cdot 100 - 9 \\cdot 2 = 900 - 18 = 882$. A $9 \\cdot 102 = 900 + 18 = 918$.",
          uwaga: "Poprawkę mnożymy przez drugi czynnik: odejmujemy $9 \\cdot 2$, a nie samo $2$.",
        },
      ],
      jak: [
        "Obejrzyj czynniki: czy mają zera na końcu, czy któryś jest bliski $100$ albo $1000$, czy da się utworzyć parę typu $4 \\cdot 25$.",
        "Z zerami: pomnóż liczby bez zer i dopisz wszystkie zera z obu czynników.",
        "Gdy nie ma zer, rozbij jeden czynnik na dziesiątki i jedności albo na okrągłą liczbę z poprawką.",
        "Oszacuj wynik (na przykład $6 \\cdot 43$ to ok. $6 \\cdot 40 = 240$) i sprawdź, czy dokładny wynik jest podobny.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Oblicz $36 \\cdot 100$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$360$", "$3600$", "$36\\,000$", "$136$"],
          poprawna: 1,
        },
        {
          nr: "23",
          tresc: "Oblicz $50 \\cdot 40$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$90$", "$200$", "$20\\,000$", "$2000$"],
          poprawna: 3,
        },
        {
          nr: "24",
          tresc: "Oblicz sprytnie $4 \\cdot 17 \\cdot 25$ (połącz czynniki $4$ i $25$). **Wybierz właściwą odpowiedź.**",
          opcje: ["$170$", "$117$", "$1700$", "$425$"],
          poprawna: 2,
        },
        {
          nr: "25",
          tresc: "Oblicz $7 \\cdot 198$, zamieniając $198$ na $200 - 2$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$1400$", "$1386$", "$1414$", "$1396$"],
          poprawna: 1,
        },
        {
          nr: "26",
          tresc: "Sprawdzamy mnożenie. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$30 \\cdot 40 = 1200$", litery: "PF", poprawna: 0 },
            { tekst: "$5 \\cdot 600 = 300$", litery: "PF", poprawna: 1 },
            { tekst: "$8 \\cdot 25 = 200$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "W magazynie stoi $8$ palet, a na każdej jest po $125$ kartonów. Ile kartonów jest w magazynie? Ile kartonów byłoby na $16$ takich paletach? Oblicz sprytnie. **Zapisz obliczenia.**",
          rozwiazanie: "Rozbijamy $125$ na $100 + 25$: $8 \\cdot 125 = 8 \\cdot 100 + 8 \\cdot 25$.\n\n$8 \\cdot 100 = 800$ oraz $8 \\cdot 25 = 200$, więc $8 \\cdot 125 = 800 + 200 = 1000$.\n\nPalet jest dwa razy więcej ($16 = 2 \\cdot 8$), więc kartonów też dwa razy więcej: $2 \\cdot 1000 = 2000$.\n\nOdpowiedź: W magazynie jest $1000$ kartonów, a na $16$ paletach byłoby ich $2000$.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "Jeden zeszyt kosztuje $6$ zł. Ile zapłacimy za $43$ zeszyty? Rozbij liczbę $43$ na dziesiątki i jedności. **Zapisz obliczenia.**",
          rozwiazanie: "Rozbijamy $43 = 40 + 3$.\n\nZa $40$ zeszytów: $6 \\cdot 40 = 240$ zł. Za $3$ zeszyty: $6 \\cdot 3 = 18$ zł.\n\nRazem: $240 + 18 = 258$ zł.\n\nOdpowiedź: Za $43$ zeszyty zapłacimy $258$ zł.",
        },
      ],
      generatory: [
        {
          id: "sprytne-mnozenie-zera",
          nazwa: "Dopisz zera",
          opis: "Pomnóż przez $10$, $100$ albo $1000$, albo pomnóż dwie okrągłe liczby: zera dopisujemy na końcu.",
          generuj(r) {
            if (r.chance(0.5)) {
              const k = r.int(1, 3);
              const a = r.int(2, k === 3 ? 99 : 999);
              const w = a * 10 ** k;
              return {
                tresc: `Oblicz $${t(a)} \\cdot ${t(10 ** k)}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w },
                wynik: `$${t(w)}$`,
                rozwiazanie: [`Mnożymy przez $${t(10 ** k)}$, więc do liczby $${t(a)}$ dopisujemy ${ZERA[k]}.`, `$${t(a)} \\cdot ${t(10 ** k)} = ${t(w)}$.`],
              };
            }
            let a, b, i, j;
            do {
              a = r.int(2, 9);
              b = r.int(2, 9);
              i = r.int(1, 2);
              j = r.int(1, 2);
            } while (i + j > 3);
            const x = a * 10 ** i;
            const y = b * 10 ** j;
            const w = a * b * 10 ** (i + j);
            return {
              tresc: `Oblicz $${t(x)} \\cdot ${t(y)}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w },
              wynik: `$${t(w)}$`,
              rozwiazanie: [
                `Najpierw mnożymy liczby bez zer: $${a} \\cdot ${b} = ${a * b}$.`,
                `W obu czynnikach jest razem ${ZERA[i + j]}, więc dopisujemy je do wyniku.`,
                `$${t(x)} \\cdot ${t(y)} = ${t(w)}$.`,
              ],
            };
          },
        },
        {
          id: "sprytne-mnozenie-sposoby",
          nazwa: "Rozbij albo sparuj",
          opis: "Pomnóż sprytnie: rozbij czynnik, użyj prawie okrągłej liczby albo połącz czynniki w parę dającą $10$, $100$ lub $1000$.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const a = r.int(3, 9);
              let b;
              do {
                b = r.int(12, 99);
              } while (b % 10 === 0);
              const m = Math.floor(b / 10) * 10;
              const n = b % 10;
              const w = a * b;
              return {
                tresc: `Oblicz sprytnie: $${a} \\cdot ${b}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Rozbijamy $${b}$ na $${m} + ${n}$.`,
                  `$${a} \\cdot ${m} = ${a * m}$ oraz $${a} \\cdot ${n} = ${a * n}$.`,
                  `$${a * m} + ${a * n} = ${w}$.`,
                ],
              };
            }
            if (tryb === 1) {
              const a = r.int(3, 9);
              const R = r.pick([100, 200, 500, 1000]);
              const d = r.int(1, 3);
              const pod = r.chance();
              const b = pod ? R - d : R + d;
              const w = a * b;
              return {
                tresc: `Oblicz sprytnie: $${a} \\cdot ${t(b)}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w },
                wynik: `$${t(w)}$`,
                rozwiazanie: [
                  pod ? `$${b} = ${R} - ${d}$, czyli liczba $${b}$ jest o $${d}$ mniejsza od $${R}$.` : `$${b} = ${R} + ${d}$, czyli liczba $${b}$ jest o $${d}$ większa od $${R}$.`,
                  `$${a} \\cdot ${R} = ${t(a * R)}$ oraz $${a} \\cdot ${d} = ${a * d}$.`,
                  pod ? `Mnożyliśmy przez za dużą liczbę, więc odejmujemy: $${t(a * R)} - ${a * d} = ${t(w)}$.` : `Mnożyliśmy przez za małą liczbę, więc dodajemy: $${t(a * R)} + ${a * d} = ${t(w)}$.`,
                ],
              };
            }
            const [p, s, R] = r.pick([[2, 5, 10], [4, 25, 100], [8, 125, 1000], [5, 20, 100]]);
            let x;
            do {
              x = r.int(3, R === 1000 ? 49 : 99);
            } while (x % 10 === 0);
            const w = R * x;
            const kol = r.chance() ? [p, x, s] : [s, x, p];
            return {
              tresc: `Oblicz sprytnie: $${kol.join(" \\cdot ")}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w },
              wynik: `$${t(w)}$`,
              rozwiazanie: [
                `Zmieniamy kolejność czynników i łączymy parę: $${p} \\cdot ${s} \\cdot ${x}$.`,
                `$${p} \\cdot ${s} = ${t(R)}$.`,
                `$${t(R)} \\cdot ${x} = ${t(w)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5. Sprytne dzielenie
    {
      id: "sprytne-dzielenie",
      nazwa: "Sprytne dzielenie",
      sciaga: [
        {
          nazwa: "Dzielenie przez 10, 100, 1000",
          slownie: "Dzieląc przez $10$, skreślamy jedno zero z końca liczby. Dzieląc przez $100$, skreślamy dwa zera, a dzieląc przez $1000$ skreślamy trzy zera.",
          tex: "3500:100=35",
          przyklad: "$4200 : 10 = 420$. $81\\,000 : 1000 = 81$.",
          uwaga: "Tak można zrobić tylko wtedy, gdy liczba ma na końcu tyle zer, ile trzeba skreślić.",
        },
        {
          nazwa: "Dzielenie liczb z zerami",
          slownie: "Gdy w dzielnej i w dzielniku są zera na końcu, skreślamy po tyle samo zer z obu liczb. Potem dzielimy to, co zostało.",
          tex: "4800:60=480:6=80",
          przyklad: "$4800 : 60$: skreślamy po jednym zerze z obu liczb i mamy $480 : 6 = 80$.",
          uwaga: "Skreślaj po tyle samo zer z dzielnej i z dzielnika. Jeśli skreślisz tylko z jednej liczby, wynik będzie zły.",
        },
        {
          nazwa: "Rozbicie dzielnej",
          slownie: "Dzielną rozbijamy na dwa kawałki, które łatwo podzielić przez dzielnik. Dzielimy każdy kawałek i dodajemy wyniki.",
          tex: "156:3=150:3+6:3",
          przyklad: "$156 : 3 = 150 : 3 + 6 : 3 = 50 + 2 = 52$.",
          uwaga: "Rozbijamy dzielną (to, co dzielimy), a nie dzielnik. $60 : 5$ to nie to samo co $60 : 2 + 60 : 3$.",
        },
        {
          nazwa: "Dzielenie przez 5 i przez 4",
          slownie: "Dzielenie przez $5$: mnożymy przez $2$ i dzielimy przez $10$. Dzielenie przez $4$: dwa razy dzielimy przez $2$.",
          przyklad: "$340 : 5 = 680 : 10 = 68$. $36 : 4 = 18 : 2 = 9$.",
          uwaga: "Przy dzieleniu przez $4$ połowę bierzemy dwa razy. Jedna połowa daje dzielenie przez $2$, a nie przez $4$.",
        },
        {
          nazwa: "Sprawdzanie mnożeniem",
          slownie: "Wynik dzielenia sprawdzamy mnożeniem: iloraz razy dzielnik musi dać dzielną.",
          tex: "252:6=42\\qquad 42\\cdot 6=252",
          przyklad: "$252 : 6 = 42$, bo $42 \\cdot 6 = 240 + 12 = 252$.",
          uwaga: "Jeśli sprawdzenie nie wychodzi, popraw dzielenie, a nie sprawdzenie.",
        },
      ],
      jak: [
        "Zobacz, czy liczby mają zera na końcu. Jeśli tak, skreśl po tyle samo zer z dzielnej i dzielnika.",
        "Gdy dzielnik to $5$ albo $4$, pomnóż przez $2$ i podziel przez $10$ albo podziel dwa razy przez $2$.",
        "W innych przypadkach rozbij dzielną na kawałki, które dzielą się przez dzielnik (na przykład $156 = 150 + 6$).",
        "Sprawdź wynik mnożeniem: iloraz razy dzielnik ma dać dzielną.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Oblicz $4700 : 100$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$47$", "$470$", "$4$", "$407$"],
          poprawna: 0,
        },
        {
          nr: "30",
          tresc: "Oblicz $5600 : 80$ (skreśl po jednym zerze). **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$700$", "$70$", "$560$"],
          poprawna: 2,
        },
        {
          nr: "31",
          tresc: "Oblicz $156 : 3$, rozbijając $156$ na $150 + 6$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$56$", "$50$", "$153$", "$52$"],
          poprawna: 3,
        },
        {
          nr: "32",
          tresc: "Aby podzielić liczbę przez $5$, można ją **Wybierz właściwą odpowiedź.**",
          opcje: ["podzielić przez $2$ i pomnożyć przez $10$", "pomnożyć przez $2$ i podzielić przez $10$", "podzielić przez $10$ i pomnożyć przez $5$", "pomnożyć przez $5$ i podzielić przez $10$"],
          poprawna: 1,
        },
        {
          nr: "33",
          tresc: "Sprawdzamy dzielenie. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$9000 : 100 = 900$", litery: "PF", poprawna: 1 },
            { tekst: "$3200 : 80 = 40$", litery: "PF", poprawna: 0 },
            { tekst: "$60 : 5 = 60 : 2 + 60 : 3$", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 2,
          tresc: "Wycieczka kosztuje razem $252$ zł i płaci za nią po równo $6$ osób. Ile złotych zapłaci każda osoba? Rozbij liczbę $252$ na $240 + 12$. **Zapisz obliczenia.**",
          rozwiazanie: "Rozbijamy dzielną: $252 = 240 + 12$.\n\nDzielimy każdy kawałek: $240 : 6 = 40$ oraz $12 : 6 = 2$.\n\nDodajemy: $40 + 2 = 42$.\n\nSprawdzenie: $42 \\cdot 6 = 240 + 12 = 252$.\n\nOdpowiedź: Każda osoba zapłaci $42$ zł.",
        },
        {
          nr: "35",
          punkty: 2,
          tresc: "Piekarnia upiekła $4800$ bułek. Ile toreb potrzeba, jeśli w każdej torbie ma być po $60$ bułek? Ile skrzyń potrzeba, jeśli w każdej skrzyni ma być po $600$ bułek? **Zapisz obliczenia.**",
          rozwiazanie: "Dzielimy $4800 : 60$. Skreślamy po jednym zerze z obu liczb: $480 : 6 = 80$.\n\nDzielimy $4800 : 600$. Skreślamy po dwa zera z obu liczb: $48 : 6 = 8$.\n\nSprawdzenie: $80 \\cdot 60 = 4800$ oraz $8 \\cdot 600 = 4800$.\n\nOdpowiedź: Potrzeba $80$ toreb albo $8$ skrzyń.",
        },
      ],
      generatory: [
        {
          id: "sprytne-dzielenie-zera",
          nazwa: "Skreśl zera",
          opis: "Podziel przez $10$, $100$, $1000$ albo podziel liczby z zerami, skreślając po tyle samo zer.",
          generuj(r) {
            if (r.chance(0.5)) {
              const k = r.int(1, 3);
              const q = r.int(2, k === 3 ? 99 : 999);
              const P = q * 10 ** k;
              return {
                tresc: `Oblicz $${t(P)} : ${t(10 ** k)}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w: q },
                wynik: `$${t(q)}$`,
                rozwiazanie: [`Dzielimy przez $${t(10 ** k)}$, więc skreślamy ${ZERA[k]} z końca liczby $${t(P)}$.`, `$${t(P)} : ${t(10 ** k)} = ${t(q)}$.`],
              };
            }
            const b = r.int(2, 9);
            const q = r.int(2, 10);
            const j = r.int(1, 2);
            const D = b * 10 ** j;
            const P = b * q * 10 ** j;
            return {
              tresc: `Oblicz $${t(P)} : ${t(D)}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w: q },
              wynik: `$${q}$`,
              rozwiazanie: [
                `Z obu liczb skreślamy po tyle samo zer, czyli ${ZERA[j]}: $${P / 10 ** j} : ${b}$.`,
                `Z tabliczki dzielenia: $${P / 10 ** j} : ${b} = ${q}$.`,
                `Sprawdzenie: $${q} \\cdot ${t(D)} = ${t(P)}$.`,
              ],
            };
          },
        },
        {
          id: "sprytne-dzielenie-sposoby",
          nazwa: "Rozbij albo podwój",
          opis: "Podziel sprytnie: rozbij dzielną na dwa kawałki albo podziel przez $5$ czy przez $4$ na skróty.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const b = r.int(2, 9);
              const m = r.int(1, 9) * 10;
              const n = r.int(1, 9);
              const q = m + n;
              const P = b * q;
              return {
                tresc: `Oblicz sprytnie: $${P} : ${b}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w: q },
                wynik: `$${q}$`,
                rozwiazanie: [
                  `Rozbijamy dzielną na dwa łatwe kawałki: $${P} = ${b * m} + ${b * n}$.`,
                  `$${b * m} : ${b} = ${m}$ oraz $${b * n} : ${b} = ${n}$.`,
                  `$${m} + ${n} = ${q}$.`,
                ],
              };
            }
            if (tryb === 1) {
              const q = r.int(12, 198);
              const P = 5 * q;
              return {
                tresc: `Oblicz sprytnie: $${P} : 5$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w: q },
                wynik: `$${q}$`,
                rozwiazanie: [
                  "Dzielenie przez $5$ to mnożenie przez $2$ i dzielenie przez $10$.",
                  `$${P} \\cdot 2 = ${2 * P}$.`,
                  `$${2 * P} : 10 = ${q}$.`,
                ],
              };
            }
            const q = r.int(11, 99);
            const P = 4 * q;
            return {
              tresc: `Oblicz sprytnie: $${P} : 4$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w: q },
              wynik: `$${q}$`,
              rozwiazanie: [
                "Dzielenie przez $4$ to dwa razy dzielenie przez $2$.",
                `$${P} : 2 = ${2 * q}$.`,
                `$${2 * q} : 2 = ${q}$.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
