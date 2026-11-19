// Klasa 3 (liceum i technikum) · rozdział 3 „Kombinatoryka” – Matematyka 3, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** Poprawna forma rzeczownika po liczebniku: odm(1, "osoba", "osoby", "osób"), odm(3, …) = "osoby", odm(5, …) = "osób". */
const odm = (n, f1, f24, f5) => (n === 1 ? f1 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? f24 : f5);

/** Liczba w LaTeX: odstęp tysięcy (\,) dopiero od 5 cyfr. */
const sp = (n) => (n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : String(n));

/** Iloczyn zapisany w LaTeX: [2, 3, 4] -> "2\cdot 3\cdot 4". */
const prod = (a) => a.join("\\cdot ");

/** Iloczyn liczb z tablicy. */
const mnoz = (a) => a.reduce((x, y) => x * y, 1);

/** Silnia. */
const sil = (n) => (n <= 1 ? 1 : n * sil(n - 1));

/** Iloczyn n·(n−1)·…·1 jako lista czynników. */
const odN = (n) => Array.from({ length: n }, (_, i) => n - i);

/** Wyliczenie po przecinkach z „i” przed ostatnim elementem. */
const lista = (el) => (el.length <= 1 ? el.join("") : `${el.slice(0, -1).join(", ")} i ${el[el.length - 1]}`);

/** Zbiór liter w LaTeX: zbiorLiter(3) = "\{A, B, C\}". */
const zbiorLiter = (m) => `\\{${"ABCDEF".slice(0, m).split("").join(", ")}\\}`;

/** Pole odpowiedzi – jedna liczba. */
const pole = (etykieta) => [{ id: "w", typ: "liczba", etykieta }];

const nwd = (a, b) => (b ? nwd(b, a % b) : a);

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 3.1 (część pierwsza)
    {
      id: "mnozenie",
      nazwa: "Reguła mnożenia",
      sciaga: [
        {
          nazwa: "Reguła mnożenia",
          slownie: "Gdy wynik składa się z kilku kolejnych wyborów i na każdym etapie liczba możliwości nie zależy od wcześniejszych wyborów, to liczby możliwości mnożymy.",
          tex: "n=k_1\\cdot k_2\\cdot\\ldots\\cdot k_m",
          litery: "$n$ – liczba wszystkich wyników, $k_1$ – liczba sposobów wyboru na pierwszym etapie, $k_2$ – na drugim itd., $m$ – liczba etapów.",
          przyklad: "W barze są $3$ zupy, $4$ drugie dania i $2$ desery. Zestaw (zupa, drugie danie, deser) można wybrać na $3\\cdot 4\\cdot 2 = 24$ sposoby.",
          uwaga: "Mnożymy tylko wtedy, gdy wybieramy „to i to i to”, czyli po jednym elemencie z każdej grupy.",
        },
        {
          nazwa: "Drzewo możliwości",
          slownie: "Wyniki kolejnych wyborów można zapisać w drzewie: z każdego wyniku poprzedniego etapu wychodzi tyle gałęzi, ile jest możliwości w następnym. Liczba końców gałęzi to liczba wszystkich wyników.",
          przyklad: "Dwa rzuty monetą: z pierwszego wyniku wychodzą $2$ gałęzie, więc wyniki to $OO$, $OR$, $RO$, $RR$, czyli $2\\cdot 2 = 4$.",
          uwaga: "Drzewo narysuj tylko dla małych liczb. Przy większych użyj mnożenia.",
        },
        {
          nazwa: "Z powtórzeniami i bez",
          slownie: "Gdy elementy mogą się powtarzać, na każdym miejscu jest tyle samo możliwości. Gdy się nie mogą powtarzać, z każdym kolejnym miejscem możliwości jest o jedną mniej.",
          tex: "n\\cdot n\\cdot\\ldots\\cdot n=n^k\\qquad n\\cdot(n-1)\\cdot(n-2)\\cdot\\ldots",
          litery: "$n$ – liczba dostępnych elementów, $k$ – liczba miejsc (wyborów).",
          przyklad: "Kod z trzech cyfr od $0$ do $9$: z powtórzeniami $10\\cdot 10\\cdot 10 = 1000$, bez powtórzeń $10\\cdot 9\\cdot 8 = 720$.",
          uwaga: "Najpierw sprawdź w treści zadania, czy elementy wolno powtarzać.",
        },
      ],
      jak: [
        "Podziel wybór na kolejne etapy (miejsca, osoby, rzeczy do wybrania).",
        "Dla każdego etapu zapisz, na ile sposobów można go wykonać. Sprawdź, czy elementy mogą się powtarzać.",
        "Pomnóż wszystkie liczby możliwości.",
        "Sprawdź, czy wynik ma sens (np. przy małych liczbach policz wyniki na drzewku).",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "W szkolnym bufecie są $4$ rodzaje zup, $5$ drugich dań i $3$ desery. Ile jest różnych zestawów złożonych z jednej zupy, jednego drugiego dania i jednego deseru? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$", "$60$", "$20$", "$64$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Zamek szyfrowy ma $3$ pokrętła. Na każdym z nich można ustawić cyfrę od $0$ do $9$. Ile jest różnych ustawień tego zamka? **Wybierz właściwą odpowiedź.**",
          opcje: ["$30$", "$720$", "$1000$", "$100$"],
          poprawna: 2,
        },
        {
          nr: "3",
          tresc: "Rzucamy raz monetą i raz sześcienną kostką do gry. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wszystkich możliwych wyników jest $12$.", litery: "PF", poprawna: 0 },
            { tekst: "Wyników, w których wypadł orzeł i parzysta liczba oczek, jest $6$.", litery: "PF", poprawna: 1 },
            { tekst: "Wyników, w których wypadł orzeł i liczba oczek większa od $4$, jest $2$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "4",
          tresc: "Ile jest liczb dwucyfrowych, w których obie cyfry są nieparzyste? **Wybierz właściwą odpowiedź.**",
          opcje: ["$25$", "$20$", "$10$", "$45$"],
          poprawna: 0,
        },
        {
          nr: "5",
          tresc: "Z miasta $A$ do miasta $B$ prowadzą $3$ drogi, a z $B$ do $C$ prowadzą $4$ drogi. Na ile sposobów można pojechać z $A$ do $C$ przez $B$ i wrócić do $A$ także przez $B$, jeśli na każdym odcinku wolno wybrać dowolną drogę? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$", "$24$", "$72$", "$144$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "W restauracji są $3$ przystawki, $6$ dań głównych i $4$ desery. Gość zamawia po jednej pozycji z każdej grupy. Oblicz, ile jest wszystkich możliwych zamówień oraz ile z nich zawiera najtańszą przystawkę. **Zapisz obliczenia.**",
          rozwiazanie: "Wybór składa się z trzech etapów: przystawka, danie główne, deser. Liczby możliwości mnożymy.\n\nWszystkich zamówień: $3\\cdot 6\\cdot 4 = 72$.\n\nGdy przystawka jest ustalona (najtańsza), mamy $1$ możliwość na pierwszym etapie: $1\\cdot 6\\cdot 4 = 24$.\n\nOdpowiedź: wszystkich zamówień jest $72$, a z najtańszą przystawką $24$.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Ile jest liczb czterocyfrowych, w których wszystkie cyfry są parzyste? **Zapisz obliczenia.**",
          rozwiazanie: "Cyfry parzyste to $0$, $2$, $4$, $6$, $8$ – razem $5$ cyfr.\n\nCyfra tysięcy nie może być zerem, więc ma $4$ możliwości: $2$, $4$, $6$ lub $8$.\n\nKażda z pozostałych trzech cyfr ma $5$ możliwości.\n\nLiczba takich liczb: $4\\cdot 5\\cdot 5\\cdot 5 = 500$.\n\nOdpowiedź: $500$.",
        },
      ],
      generatory: [
        {
          id: "mnozenie-zestawy",
          nazwa: "Zestawy i trasy",
          opis: "Ile jest zestawów albo tras, gdy wybierasz po jednym elemencie z kilku grup (reguła mnożenia).",
          generuj(r) {
            const sc = r.int(0, 2);
            let tresc, n, etyk, krok;
            if (sc === 0) {
              const G = [["zupy", "zup"], ["drugie dania", "drugich dań"], ["desery", "deserów"], ["napoje", "napojów"]];
              const k = r.int(3, 4);
              n = Array.from({ length: k }, () => r.int(2, 6));
              const opis = lista(n.map((x, i) => `${x} ${x <= 4 ? G[i][0] : G[i][1]}`));
              tresc = `W barze mlecznym można wybrać: ${opis}. Zestaw obiadowy składa się z jednej pozycji z każdej z tych grup. Ile jest różnych zestawów?`;
              etyk = "Liczba zestawów";
              krok = `Zestaw wybieramy w ${k} etapach (po jednej pozycji z każdej grupy) i liczba możliwości na każdym etapie nie zależy od poprzednich.`;
            } else if (sc === 1) {
              const G = [["bluzki", "bluzek"], ["spódnice", "spódnic"], ["pary butów", "par butów"], ["szaliki", "szalików"]];
              const k = r.int(3, 4);
              n = Array.from({ length: k }, () => r.int(2, 7));
              const opis = lista(n.map((x, i) => `${x} ${x <= 4 ? G[i][0] : G[i][1]}`));
              tresc = `Ola ma w szafie ${opis}. Do każdego stroju wybiera po jednej rzeczy z każdego rodzaju. Na ile sposobów może się ubrać?`;
              etyk = "Liczba sposobów";
              krok = `Ola wybiera kolejno po jednej rzeczy z ${k} rodzajów, a wybory są od siebie niezależne.`;
            } else {
              n = [r.int(2, 6), r.int(2, 6), r.int(2, 6)];
              const dr = (x) => (x <= 4 ? "drogi" : "dróg");
              tresc = `Z miasta $A$ do miasta $B$ prowadzi ${n[0]} ${dr(n[0])}, z $B$ do $C$ – ${n[1]} ${dr(n[1])}, a z $C$ do $D$ – ${n[2]} ${dr(n[2])}. Ile jest różnych tras z $A$ do $D$, które prowadzą przez $B$ i $C$?`;
              etyk = "Liczba tras";
              krok = "Trasa składa się z trzech odcinków: z A do B, z B do C i z C do D. Drogę na każdym odcinku wybieramy niezależnie.";
            }
            const N = mnoz(n);
            return {
              tresc,
              pola: pole(etyk),
              odpowiedz: { w: q(N) },
              wynik: `$${sp(N)}$`,
              rozwiazanie: [krok, `Mnożymy liczby możliwości: $${prod(n)} = ${sp(N)}$.`],
            };
          },
        },
        {
          id: "mnozenie-kody",
          nazwa: "Kody i ciągi wyników",
          opis: "Ile jest kodów, haseł albo ciągów wyników rzutów, gdy elementy mogą się powtarzać.",
          generuj(r) {
            const t = r.int(0, 5);
            let tresc, cz, krok, etyk;
            if (t === 0) {
              const k = r.int(3, 4);
              cz = Array(k).fill(10);
              tresc = `Zamek szyfrowy ma ${k} ${odm(k, "pokrętło", "pokrętła", "pokręteł")}, a na każdym z nich można ustawić cyfrę od $0$ do $9$. Ile jest różnych ustawień tego zamka?`;
              krok = "Na każdym pokrętle jest $10$ możliwości (cyfry od $0$ do $9$), a pokrętła ustawiamy niezależnie.";
              etyk = "Liczba ustawień";
            } else if (t === 1) {
              const k = r.int(2, 8);
              cz = Array(k).fill(2);
              tresc = `Rzucamy monetą ${k} razy i zapisujemy kolejno wyniki rzutów (orzeł albo reszka). Ile jest różnych ciągów wyników?`;
              krok = "W każdym rzucie są $2$ możliwe wyniki, niezależnie od wyników poprzednich rzutów.";
              etyk = "Liczba ciągów wyników";
            } else if (t === 2) {
              const k = r.int(2, 4);
              cz = Array(k).fill(6);
              tresc = `Rzucamy sześcienną kostką do gry ${k} razy i zapisujemy kolejno liczby oczek. Ile jest różnych ciągów wyników?`;
              krok = "W każdym rzucie jest $6$ możliwych wyników, niezależnie od poprzednich rzutów.";
              etyk = "Liczba ciągów wyników";
            } else if (t === 3) {
              const m = r.int(3, 6), k = r.int(3, 4);
              cz = Array(k).fill(m);
              tresc = `Hasło składa się z ${k} liter, a każda z nich jest jedną z liter ze zbioru $${zbiorLiter(m)}$. Litery mogą się powtarzać. Ile jest różnych haseł?`;
              krok = `Na każdym z ${k} miejsc można wstawić jedną z $${m}$ liter, bo litery mogą się powtarzać.`;
              etyk = "Liczba haseł";
            } else if (t === 4) {
              const m = r.int(3, 5), k = r.int(2, 3);
              cz = [m, ...Array(k).fill(10)];
              tresc = `Kod składa się z jednej litery ze zbioru $${zbiorLiter(m)}$, po której następują ${k} cyfry (każda od $0$ do $9$, cyfry mogą się powtarzać). Ile jest różnych kodów?`;
              krok = `Na pierwszym miejscu jest $${m}$ możliwości (litera), a na każdym z ${k} kolejnych miejsc $10$ możliwości (cyfra).`;
              etyk = "Liczba kodów";
            } else {
              const m = r.int(3, 5), k = r.int(3, 4);
              cz = Array(k).fill(m);
              tresc = `Flaga składa się z ${k} poziomych pasków, a każdy z nich może być w jednym z ${m} kolorów. Kolory mogą się powtarzać. Ile jest różnych flag?`;
              krok = `Każdy z ${k} pasków można pomalować na $${m}$ sposobów, niezależnie od pozostałych.`;
              etyk = "Liczba flag";
            }
            const N = mnoz(cz);
            const wszystkieRowne = cz.every((x) => x === cz[0]);
            const zapis = wszystkieRowne ? `${prod(cz)} = ${cz[0]}^{${cz.length}} = ${sp(N)}` : `${prod(cz)} = ${sp(N)}`;
            return {
              tresc,
              pola: pole(etyk),
              odpowiedz: { w: q(N) },
              wynik: `$${sp(N)}$`,
              rozwiazanie: [krok, `Mnożymy liczby możliwości: $${zapis}$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3.1 (część druga)
    {
      id: "dodawanie",
      nazwa: "Reguła dodawania",
      sciaga: [
        {
          nazwa: "Reguła dodawania",
          slownie: "Gdy wybieramy jedną rzecz z jednej z kilku grup, które nie mają wspólnych elementów, to liczby elementów w grupach dodajemy.",
          tex: "n=k_1+k_2+\\ldots+k_m",
          litery: "$n$ – liczba wszystkich możliwości, $k_1$ – liczba elementów pierwszej grupy, $k_2$ – drugiej itd.",
          przyklad: "W klasie jest $14$ dziewcząt i $12$ chłopców. Jedną osobę do reprezentowania klasy można wybrać na $14 + 12 = 26$ sposobów.",
          uwaga: "Grupy muszą być rozłączne. Jeśli coś należy do dwóch grup, policzysz to dwa razy.",
        },
        {
          nazwa: "Mnożyć czy dodawać?",
          slownie: "Kolejne wybory („najpierw to, potem tamto”) – mnożymy. Wybór jednej rzeczy z jednej z grup („to albo tamto”) – dodajemy.",
          przyklad: "Są $3$ koszulki i $4$ pary spodni. Strój (koszulka i spodnie) to $3\\cdot 4 = 12$ możliwości, a wybór jednej rzeczy (koszulki albo spodni) to $3 + 4 = 7$ możliwości.",
          uwaga: "Pytanie „ile jest strojów” i pytanie „ile jest rzeczy do wyboru” dają różne wyniki.",
        },
        {
          nazwa: "Podział na przypadki",
          slownie: "Gdy warunek jest trudny, podziel zadanie na rozłączne przypadki. W każdym przypadku policz możliwości (zwykle mnożeniem), a wyniki dodaj.",
          przyklad: "Liczby dwucyfrowe podzielne przez $5$ kończą się cyfrą $0$ albo $5$. Dla każdej z tych cyfr cyfra dziesiątek ma $9$ możliwości, więc jest $9 + 9 = 18$ takich liczb.",
          uwaga: "Przypadki nie mogą się pokrywać i muszą obejmować wszystkie możliwości.",
        },
        {
          nazwa: "Elementy wspólne",
          slownie: "Jeśli zbiory $A$ i $B$ mogą mieć wspólne elementy, to elementy wspólne zostały policzone dwa razy. Trzeba je raz odjąć.",
          tex: "|A\\cup B|=|A|+|B|-|A\\cap B|",
          litery: "$|A|$ – liczba elementów zbioru $A$, $A\\cup B$ – elementy należące do $A$ lub do $B$, $A\\cap B$ – należące do obu.",
          przyklad: "W klasie $18$ osób gra w piłkę, $15$ w siatkówkę, a $5$ w obie gry. W co najmniej jedną z gier gra $18 + 15 - 5 = 28$ osób.",
          uwaga: "Gdy zbiory są rozłączne, $|A\\cap B| = 0$ i zostaje zwykłe dodawanie.",
        },
      ],
      jak: [
        "Zdecyduj, czy chodzi o kolejne wybory (mnożymy), czy o wybór jednej rzeczy z kilku grup (dodajemy).",
        "Sprawdź, czy grupy są rozłączne. Jeśli nie, odejmij liczbę elementów wspólnych.",
        "Gdy warunek jest złożony, podziel zadanie na rozłączne przypadki i policz każdy z nich.",
        "Dodaj wyniki przypadków. W zadaniach mieszanych wykonuj dodawanie w nawiasie, a potem mnóż.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "W klasie jest $13$ dziewcząt i $15$ chłopców. Na zawody trzeba wybrać jedną osobę (dziewczynę albo chłopaka). Na ile sposobów można to zrobić? **Wybierz właściwą odpowiedź.**",
          opcje: ["$195$", "$28$", "$30$", "$14$"],
          poprawna: 1,
        },
        {
          nr: "9",
          tresc: "Na straganie są $6$ rodzaje jabłek, $4$ rodzaje gruszek i $5$ rodzajów śliwek. Klient kupuje owoce jednego rodzaju. Ile ma możliwości wyboru? **Wybierz właściwą odpowiedź.**",
          opcje: ["$15$", "$120$", "$10$", "$30$"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "Ile jest liczb dwucyfrowych, w których cyfra dziesiątek jest równa $3$ albo cyfra jedności jest równa $3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$19$", "$20$", "$18$", "$10$"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "Ola ma $4$ pary spodni, $3$ spódnice i $5$ bluzek. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Jedną rzecz z dolnej części garderoby (spodnie albo spódnicę) może wybrać na $12$ sposobów.", litery: "PF", poprawna: 1 },
            { tekst: "Strój ze spodniami i bluzką może skompletować na $20$ sposobów.", litery: "PF", poprawna: 0 },
            { tekst: "Strój złożony z dolnej części garderoby (spodnie albo spódnica) i bluzki może skompletować na $35$ sposobów.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "12",
          tresc: "Numery autobusów w pewnym mieście są liczbami jednocyfrowymi albo dwucyfrowymi, od $1$ do $99$. Ile jest różnych numerów? **Wybierz właściwą odpowiedź.**",
          opcje: ["$100$", "$90$", "$19$", "$99$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "W klasie jest $30$ uczniów. W piłkę nożną gra $18$ z nich, w siatkówkę $15$, a $5$ uczniów gra w obie dyscypliny. Ilu uczniów nie gra w żadną z tych dyscyplin? **Zapisz obliczenia.**",
          rozwiazanie: "Uczniów, którzy grają w co najmniej jedną dyscyplinę, liczymy ze wzoru na sumę zbiorów: $18 + 15 - 5 = 28$ (osoby grające w obie dyscypliny policzyliśmy dwa razy).\n\nUczniów, którzy nie grają w żadną dyscyplinę: $30 - 28 = 2$.\n\nOdpowiedź: $2$ uczniów.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Ile jest liczb trzycyfrowych, w których wszystkie cyfry są nieparzyste albo wszystkie cyfry są parzyste? **Zapisz obliczenia.**",
          rozwiazanie: "Rozważamy dwa rozłączne przypadki (liczba nie może mieć jednocześnie samych cyfr parzystych i samych nieparzystych).\n\nSame cyfry nieparzyste: każda z trzech cyfr ma $5$ możliwości ($1$, $3$, $5$, $7$, $9$), więc $5\\cdot 5\\cdot 5 = 125$.\n\nSame cyfry parzyste: cyfra setek ma $4$ możliwości ($2$, $4$, $6$, $8$, bo nie może być zerem), a pozostałe cyfry po $5$ możliwości, więc $4\\cdot 5\\cdot 5 = 100$.\n\nPrzypadki dodajemy: $125 + 100 = 225$.\n\nOdpowiedź: $225$.",
        },
      ],
      generatory: [
        {
          id: "dodawanie-oferta",
          nazwa: "Wybór z oferty",
          opis: "Ile jest możliwości wyboru z kilku grup: jedna pozycja z całej oferty albo zestaw „napój i deser”.",
          generuj(r) {
            const NAPOJE = [["herbat", "herbata"], ["kaw", "kawa"], ["soków", "sok"], ["lemoniad", "lemoniada"]];
            const DESERY = [["ciast", "ciasta"], ["deserów", "deseru"], ["serników", "sernika"], ["pączków", "pączka"]];
            const rodz = (x) => odm(x, "rodzaj", "rodzaje", "rodzajów");
            const tryb = r.int(0, 1);
            if (tryb === 0) {
              const grupy = r.shuffle([...NAPOJE, ...DESERY].map((g) => g[0])).slice(0, 3);
              const n = grupy.map(() => r.int(2, 9));
              const N = n[0] + n[1] + n[2];
              const opis = lista(n.map((x, i) => `${x} ${rodz(x)} ${grupy[i]}`));
              return {
                tresc: `W kawiarni można wybrać: ${opis}. Klient wybiera jedną pozycję z całej oferty. Na ile sposobów może to zrobić?`,
                pola: pole("Liczba sposobów"),
                odpowiedz: { w: q(N) },
                wynik: `$${N}$`,
                rozwiazanie: [
                  "Klient wybiera jedną rzecz z jednej z trzech grup, które nie mają wspólnych elementów, więc liczby możliwości dodajemy.",
                  `$${n.join(" + ")} = ${N}$.`,
                ],
              };
            }
            const [d1, d2] = r.shuffle(NAPOJE).slice(0, 2);
            const f = r.pick(DESERY);
            const [a, b, c] = [r.int(2, 9), r.int(2, 9), r.int(2, 9)];
            const N = (a + b) * c;
            return {
              tresc: `W kawiarni można wybrać: ${a} ${rodz(a)} ${d1[0]}, ${b} ${rodz(b)} ${d2[0]} i ${c} ${rodz(c)} ${f[0]}. Zestaw składa się z jednego napoju (${d1[1]} albo ${d2[1]}) i jednego ${f[1]}. Ile jest różnych zestawów?`,
              pola: pole("Liczba zestawów"),
              odpowiedz: { w: q(N) },
              wynik: `$${N}$`,
              rozwiazanie: [
                `Napój wybieramy z jednej z dwóch grup (${d1[1]} albo ${d2[1]}), więc liczby możliwości dodajemy: $${a} + ${b} = ${a + b}$.`,
                `Do napoju dobieramy jedną pozycję z trzeciej grupy ($${c}$ możliwości), więc mnożymy: $${a + b}\\cdot ${c} = ${N}$.`,
              ],
            };
          },
        },
        {
          id: "dodawanie-wspolne",
          nazwa: "Zbiory i podzielność",
          opis: "Zadania z elementami wspólnymi: uczniowie uczący się języków albo liczby podzielne przez a lub przez b.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb < 2) {
              const c = r.int(5, 8), a = r.int(c + 2, 18), b = r.int(c + 2, 18);
              const suma = a + b - c;
              const N = suma + (tryb === 1 ? r.int(3, 12) : r.int(0, 8));
              const wsp = `W klasie jest ${N} uczniów. ${a} osób uczy się angielskiego, ${b} osób – niemieckiego, a ${c} osób uczy się obu tych języków.`;
              const rozw = [
                `Osoby uczące się obu języków policzyliśmy dwa razy, więc co najmniej jednego języka uczy się $${a} + ${b} - ${c} = ${suma}$ osób.`,
              ];
              if (tryb === 1) rozw.push(`Żadnego z języków nie uczy się $${N} - ${suma} = ${N - suma}$ osób.`);
              const wynik = tryb === 1 ? N - suma : suma;
              return {
                tresc: `${wsp} ${tryb === 1 ? "Ile osób nie uczy się żadnego z tych języków?" : "Ile osób uczy się co najmniej jednego z tych języków?"}`,
                pola: pole("Liczba osób"),
                odpowiedz: { w: q(wynik) },
                wynik: `$${wynik}$`,
                rozwiazanie: rozw,
              };
            }
            for (;;) {
              const a = r.int(2, 6), b = r.int(a + 1, 7);
              if (b % a === 0) continue;
              const N = r.pick([30, 40, 50, 60, 100]);
              const l = (a * b) / nwd(a, b);
              const x = Math.floor(N / a), y = Math.floor(N / b), z = Math.floor(N / l);
              const wynik = x + y - z;
              const podz = (d, k) => `Przez $${d}$ dzieli się $${k}$ liczb (bo $${N} = ${d}\\cdot ${k}${N - d * k > 0 ? ` + ${N - d * k}` : ""}$).`;
              return {
                tresc: `Ile spośród liczb naturalnych od $1$ do $${N}$ jest podzielnych przez $${a}$ lub przez $${b}$ (albo przez obie te liczby)?`,
                pola: pole("Liczba liczb"),
                odpowiedz: { w: q(wynik) },
                wynik: `$${wynik}$`,
                rozwiazanie: [
                  podz(a, x),
                  podz(b, y),
                  `Liczby podzielne przez $${a}$ i przez $${b}$ są podzielne przez $${l}$ – jest ich $${z}$ i policzyliśmy je dwa razy.`,
                  `Razem: $${x} + ${y} - ${z} = ${wynik}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3.2 (część pierwsza)
    {
      id: "ustawianie",
      nazwa: "Zadania kombinatoryczne – ustawianie w rzędzie",
      sciaga: [
        {
          nazwa: "Ustawianie w rzędzie",
          slownie: "Na pierwszym miejscu możemy postawić dowolny z $n$ elementów, na drugim jeden z $n-1$ pozostałych itd. Wszystkich ustawień $n$ różnych elementów jest $n!$ (czytamy „$n$ silnia”).",
          tex: "n!=n\\cdot(n-1)\\cdot\\ldots\\cdot2\\cdot1",
          litery: "$n$ – liczba różnych elementów ustawianych w rzędzie.",
          przyklad: "Cztery osoby w kolejce można ustawić na $4! = 4\\cdot 3\\cdot 2\\cdot 1 = 24$ sposoby, a pięć osób na $5! = 120$.",
          uwaga: "Silnia rośnie bardzo szybko: $6! = 720$, $7! = 5040$.",
        },
        {
          nazwa: "Wybór z kolejnością",
          slownie: "Gdy z $n$ elementów ustawiamy w rzędzie tylko $k$ i kolejność ma znaczenie, mnożymy $k$ kolejnych malejących liczb, zaczynając od $n$.",
          tex: "n\\cdot(n-1)\\cdot\\ldots\\cdot(n-k+1)",
          litery: "$n$ – liczba wszystkich elementów, $k$ – liczba wybieranych elementów (czynników jest $k$).",
          przyklad: "Z $8$ biegaczy wyłaniamy medalistów (złoto, srebro, brąz): $8\\cdot 7\\cdot 6 = 336$ sposobów.",
          uwaga: "Ostatni czynnik to $n-k+1$, a nie $n-k$. Czynników ma być dokładnie $k$.",
        },
        {
          nazwa: "Stałe miejsce i „obok siebie”",
          slownie: "Gdy jeden element ma ustalone miejsce, ustawiamy tylko pozostałe. Gdy dwa elementy mają stać obok siebie, traktujemy je jak jeden element, a na końcu mnożymy przez $2$ (dwie kolejności w parze).",
          tex: "(n-1)!\\qquad 2\\cdot(n-1)!",
          litery: "$(n-1)!$ – ustawienia z jednym elementem na ustalonym miejscu, $2\\cdot(n-1)!$ – z dwoma elementami obok siebie.",
          przyklad: "Pięć osób, Ania stoi pierwsza: $4! = 24$. Ania i Bartek obok siebie: $2\\cdot 4! = 48$.",
          uwaga: "Dla „nie stoją obok siebie” policz wszystkie ustawienia i odejmij te, w których stoją obok siebie.",
        },
      ],
      jak: [
        "Sprawdź, czy elementy są różne i czy liczy się kolejność.",
        "Dla warunku „ten element na ustalonym miejscu” ustaw go najpierw, potem pozostałe.",
        "Dla warunku „obok siebie” połącz dwa elementy w jeden, policz ustawienia i pomnóż przez $2$.",
        "Dla warunku „nie obok siebie” od wszystkich ustawień odejmij te z elementami obok siebie.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Na półce ustawiamy w rzędzie $5$ różnych książek. Ile jest różnych ustawień? **Wybierz właściwą odpowiedź.**",
          opcje: ["$25$", "$24$", "$120$", "$15$"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "W finale biegu jest $10$ zawodników i nie ma remisów. Na ile sposobów można obsadzić trzy miejsca na podium (złoty, srebrny i brązowy medal)? **Wybierz właściwą odpowiedź.**",
          opcje: ["$30$", "$120$", "$1000$", "$720$"],
          poprawna: 3,
        },
        {
          nr: "17",
          tresc: "Sześć osób ustawia się w kolejce, przy czym Ola ma stać na jej początku. Ile jest różnych ustawień? **Wybierz właściwą odpowiedź.**",
          opcje: ["$720$", "$120$", "$30$", "$24$"],
          poprawna: 1,
        },
        {
          nr: "18",
          tresc: "Cztery osoby, wśród nich Ala i Bartek, ustawiają się w rzędzie. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wszystkich ustawień jest $16$.", litery: "PF", poprawna: 1 },
            { tekst: "Ustawień, w których Ala stoi pierwsza, jest $6$.", litery: "PF", poprawna: 0 },
            { tekst: "Ustawień, w których Ala i Bartek stoją obok siebie, jest $12$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "19",
          tresc: "Ile jest różnych trzyliterowych ciągów o wszystkich literach różnych, które można utworzyć z liter $A$, $B$, $C$, $D$, $E$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$60$", "$125$", "$10$", "$20$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Sześcioro dzieci ustawia się w kolejce. Oblicz, ile jest wszystkich możliwych ustawień oraz w ilu z nich najmłodsze dziecko stoi na końcu kolejki. **Zapisz obliczenia.**",
          rozwiazanie: "Wszystkich ustawień sześciu różnych dzieci jest $6! = 6\\cdot 5\\cdot 4\\cdot 3\\cdot 2\\cdot 1 = 720$.\n\nGdy najmłodsze dziecko stoi na końcu, jego miejsce jest ustalone. Pozostałe pięcioro dzieci ustawiamy dowolnie: $5! = 120$.\n\nOdpowiedź: wszystkich ustawień jest $720$, a z najmłodszym dzieckiem na końcu $120$.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Siedem osób, wśród nich Ania i Basia, ustawia się w rzędzie. Oblicz, w ilu ustawieniach Ania i Basia stoją obok siebie oraz w ilu nie stoją obok siebie. **Zapisz obliczenia.**",
          rozwiazanie: "Ania i Basia obok siebie: traktujemy je jak jeden element. Razem z pozostałymi pięcioma osobami mamy $6$ elementów, które ustawiamy na $6! = 720$ sposobów.\n\nW parze Ania i Basia mogą stać na $2$ sposoby (Ania z lewej albo Basia z lewej), więc ustawień jest $2\\cdot 720 = 1440$.\n\nWszystkich ustawień siedmiu osób jest $7! = 5040$.\n\nUstawień, w których nie stoją obok siebie: $5040 - 1440 = 3600$.\n\nOdpowiedź: obok siebie $1440$, nie obok siebie $3600$.",
        },
      ],
      generatory: [
        {
          id: "ustawianie-silnia",
          nazwa: "Ustawianie osób",
          opis: "Ile jest ustawień w rzędzie: wszystkich, z osobą na ustalonym miejscu, z dwiema osobami obok siebie albo nie obok siebie.",
          generuj(r) {
            const n = r.int(4, 7);
            const tryb = r.int(0, 3);
            const osoby = odm(n, "osoba", "osoby", "osób");
            const [A, B] = r.pick([["Ania", "Bartek"], ["Celina", "Darek"], ["Ewa", "Franek"]]);
            const wstep = tryb === 0 ? `Ustawiamy w rzędzie ${n} ${osoby}.` : `Ustawiamy w rzędzie ${n} ${osoby}, wśród których są ${A} i ${B}.`;
            let pyt, wynik, rozw;
            const w = sil(n);
            const m = sil(n - 1);
            if (tryb === 0) {
              pyt = "Ile jest wszystkich możliwych ustawień?";
              wynik = w;
              rozw = [
                `Na pierwszym miejscu można ustawić dowolną z $${n}$ osób, na drugim jedną z $${n - 1}$ pozostałych itd.`,
                `$${n}! = ${prod(odN(n))} = ${sp(w)}$.`,
              ];
            } else if (tryb === 1) {
              const gdzie = r.pick(["na pierwszym miejscu", "na ostatnim miejscu"]);
              pyt = `Ile jest ustawień, w których ${A} stoi ${gdzie}?`;
              wynik = m;
              rozw = [
                `Miejsce jednej osoby jest ustalone, więc ustawiamy tylko pozostałe ${n - 1} ${odm(n - 1, "osoba", "osoby", "osób")}.`,
                `$${n - 1}! = ${prod(odN(n - 1))} = ${sp(m)}$.`,
              ];
            } else if (tryb === 2) {
              pyt = `Ile jest ustawień, w których ${A} i ${B} stoją obok siebie?`;
              wynik = 2 * m;
              rozw = [
                `${A} i ${B} tworzą jedną parę. Razem z pozostałymi osobami mamy ${n - 1} elementów, które ustawiamy na $${n - 1}! = ${sp(m)}$ sposobów.`,
                `W parze mogą stać na $2$ sposoby (${A} z lewej albo ${B} z lewej): $2\\cdot ${sp(m)} = ${sp(wynik)}$.`,
              ];
            } else {
              pyt = `Ile jest ustawień, w których ${A} i ${B} nie stoją obok siebie?`;
              wynik = w - 2 * m;
              rozw = [
                `Wszystkich ustawień jest $${n}! = ${sp(w)}$.`,
                `Ustawień, w których ${A} i ${B} stoją obok siebie, jest $2\\cdot ${n - 1}! = 2\\cdot ${sp(m)} = ${sp(2 * m)}$.`,
                `Pozostałe ustawienia: $${sp(w)} - ${sp(2 * m)} = ${sp(wynik)}$.`,
              ];
            }
            return {
              tresc: `${wstep} ${pyt}`,
              pola: pole("Liczba ustawień"),
              odpowiedz: { w: q(wynik) },
              wynik: `$${sp(wynik)}$`,
              rozwiazanie: rozw,
            };
          },
        },
        {
          id: "ustawianie-miejsca",
          nazwa: "Funkcje i miejsca na podium",
          opis: "Z n osób wybierasz k osób na różne funkcje albo miejsca – kolejność ma znaczenie.",
          generuj(r) {
            const n = r.int(6, 15);
            const k = r.int(2, 4);
            let tresc;
            if (k === 2) tresc = `Z ${n} osób wybieramy przewodniczącego i jego zastępcę (jedna osoba nie może pełnić obu funkcji). Na ile sposobów można to zrobić?`;
            else if (k === 3) tresc = `W biegu startuje ${n} zawodników. Na ile sposobów można obsadzić miejsca na podium (1., 2. i 3. miejsce), jeśli nie ma remisów?`;
            else tresc = `Z ${n} członków klubu wybieramy zarząd: prezesa, wiceprezesa, skarbnika i sekretarza (każdą funkcję pełni inna osoba). Na ile sposobów można to zrobić?`;
            const cz = Array.from({ length: k }, (_, i) => n - i);
            const N = mnoz(cz);
            return {
              tresc,
              pola: pole("Liczba sposobów"),
              odpowiedz: { w: q(N) },
              wynik: `$${sp(N)}$`,
              rozwiazanie: [
                `Kolejność ma znaczenie, a nikt nie może pełnić dwóch funkcji. Pierwszą funkcję można obsadzić na $${n}$ sposobów, drugą na $${n - 1}$, a każdą kolejną o jeden sposób mniej.`,
                `Mnożymy $${k}$ liczby: $${prod(cz)} = ${sp(N)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3.2 (część druga)
    {
      id: "liczby",
      nazwa: "Zadania kombinatoryczne – liczby, kody, dopełnienie",
      sciaga: [
        {
          nazwa: "Liczby wielocyfrowe",
          slownie: "Pierwsza cyfra liczby wielocyfrowej nie może być zerem, więc ma $9$ możliwości. Każda następna cyfra ma $10$ możliwości, jeśli cyfry mogą się powtarzać.",
          tex: "9\\cdot10\\cdot10\\cdot\\ldots\\cdot10",
          litery: "Pierwszy czynnik to cyfra na pierwszym miejscu ($1$–$9$), pozostałe to kolejne cyfry ($0$–$9$).",
          przyklad: "Liczb trzycyfrowych jest $9\\cdot 10\\cdot 10 = 900$. Liczb trzycyfrowych o różnych cyfrach jest $9\\cdot 9\\cdot 8 = 648$.",
          uwaga: "Przy różnych cyfrach drugi czynnik to $9$, bo zero wolno już użyć, ale nie wolno powtórzyć pierwszej cyfry.",
        },
        {
          nazwa: "Warunek na ostatnią cyfrę",
          slownie: "Gdy liczba ma być parzysta albo podzielna przez $5$, najpierw wybierz ostatnią cyfrę, potem pierwszą, a na końcu środkowe. Zaczynaj od miejsca z największym ograniczeniem.",
          przyklad: "Trzycyfrowe liczby parzyste: ostatnia cyfra $0$, $2$, $4$, $6$ lub $8$ ($5$ możliwości), pierwsza $9$, środkowa $10$. Razem $5\\cdot 9\\cdot 10 = 450$.",
          uwaga: "Liczby podzielne przez $5$ kończą się cyfrą $0$ albo $5$ (dwie możliwości).",
        },
        {
          nazwa: "Metoda dopełnienia",
          slownie: "Przy warunkach „co najmniej jeden” albo „nie wszystkie” policz wszystkie możliwości i odejmij te, które warunku nie spełniają.",
          tex: "n=N-N_0",
          litery: "$n$ – szukana liczba możliwości, $N$ – liczba wszystkich możliwości, $N_0$ – liczba możliwości bez żądanej cechy.",
          przyklad: "Liczb trzycyfrowych z co najmniej jedną cyfrą $7$ jest $900 - 8\\cdot 9\\cdot 9 = 900 - 648 = 252$.",
          uwaga: "W liczbie bez cyfry $7$ pierwsza cyfra ma $8$ możliwości (nie $0$ i nie $7$), a pozostałe po $9$.",
        },
        {
          nazwa: "Pary bez kolejności",
          slownie: "Gdy z $n$ osób lub drużyn wybieramy pary, a kolejność w parze nie ma znaczenia, każdą parę policzymy dwa razy. Dlatego dzielimy przez $2$.",
          tex: "\\frac{n(n-1)}{2}",
          litery: "$n$ – liczba osób (drużyn).",
          przyklad: "W turnieju gra $6$ drużyn, każda z każdą jeden mecz: $\\frac{6\\cdot 5}{2} = 15$ meczów.",
          uwaga: "Gdy każda para gra mecz i rewanż, nie dzielimy przez $2$: jest $n(n-1)$ meczów.",
        },
      ],
      jak: [
        "Zapisz, ile jest miejsc (cyfr, znaków) i co wolno na każdym z nich wstawić.",
        "Zacznij od miejsca z największym ograniczeniem (np. ostatnia cyfra parzysta, pierwsza cyfra różna od $0$).",
        "Pomnóż liczby możliwości. Przy warunku „co najmniej jeden” rozważ dopełnienie.",
        "Sprawdź, czy dzielenie przez $2$ jest potrzebne (pary bez kolejności).",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Ile jest liczb naturalnych czterocyfrowych? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9999$", "$6561$", "$9000$", "$10\\,000$"],
          poprawna: 2,
        },
        {
          nr: "23",
          tresc: "Ile jest liczb trzycyfrowych o wszystkich cyfrach różnych? **Wybierz właściwą odpowiedź.**",
          opcje: ["$720$", "$648$", "$729$", "$504$"],
          poprawna: 1,
        },
        {
          nr: "24",
          tresc: "Ile jest liczb trzycyfrowych nieparzystych? **Wybierz właściwą odpowiedź.**",
          opcje: ["$500$", "$405$", "$900$", "$450$"],
          poprawna: 3,
        },
        {
          nr: "25",
          tresc: "Z cyfr $1$, $2$, $3$, $4$, $5$ tworzymy liczby trzycyfrowe. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Gdy cyfry mogą się powtarzać, takich liczb jest $125$.", litery: "PF", poprawna: 0 },
            { tekst: "Gdy cyfry nie mogą się powtarzać, takich liczb jest $60$.", litery: "PF", poprawna: 0 },
            { tekst: "Gdy cyfry nie mogą się powtarzać, liczb parzystych jest $36$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "26",
          tresc: "W turnieju szachowym gra $8$ zawodników i każdy gra z każdym jedną partię. Ile partii zostanie rozegranych? **Wybierz właściwą odpowiedź.**",
          opcje: ["$56$", "$16$", "$28$", "$64$"],
          poprawna: 2,
        },
        {
          nr: "27",
          tresc: "Ile jest liczb trzycyfrowych, w zapisie których występuje co najmniej jedna cyfra $0$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$729$", "$171$", "$100$", "$271$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "28",
          punkty: 2,
          tresc: "Ile jest liczb pięciocyfrowych podzielnych przez $5$? **Zapisz obliczenia.**",
          rozwiazanie: "Liczba podzielna przez $5$ kończy się cyfrą $0$ albo $5$ – ostatnia cyfra ma $2$ możliwości.\n\nPierwsza cyfra nie może być zerem – ma $9$ możliwości.\n\nKażda z trzech cyfr środkowych ma $10$ możliwości.\n\nLiczba takich liczb: $9\\cdot 10\\cdot 10\\cdot 10\\cdot 2 = 18\\,000$.\n\nOdpowiedź: $18\\,000$.",
        },
        {
          nr: "29",
          punkty: 3,
          tresc: "Z cyfr $1$, $2$, $3$, $4$, $5$ tworzymy liczby czterocyfrowe o cyfrach różnych. Oblicz, ile jest wszystkich takich liczb, ile z nich jest parzystych i ile nieparzystych. **Zapisz obliczenia.**",
          rozwiazanie: "Wszystkich liczb: kolejne cyfry wybieramy z $5$, $4$, $3$ i $2$ możliwości: $5\\cdot 4\\cdot 3\\cdot 2 = 120$.\n\nLiczby parzyste: ostatnia cyfra to $2$ albo $4$ ($2$ możliwości), pozostałe trzy cyfry ustawiamy z $4$ cyfr bez powtórzeń: $4\\cdot 3\\cdot 2 = 24$. Razem $2\\cdot 24 = 48$.\n\nLiczby nieparzyste: ostatnia cyfra to $1$, $3$ albo $5$ ($3$ możliwości), więc $3\\cdot 24 = 72$.\n\nSprawdzenie: $48 + 72 = 120$.\n\nOdpowiedź: wszystkich liczb jest $120$, parzystych $48$, nieparzystych $72$.",
        },
      ],
      generatory: [
        {
          id: "liczby-cyfry",
          nazwa: "Liczby z warunkami",
          opis: "Ile jest liczb wielocyfrowych o podanej własności: dowolnych, o różnych cyfrach, parzystych, podzielnych przez 5.",
          generuj(r) {
            const SLOWA = { 3: "trzycyfrowych", 4: "czterocyfrowych", 5: "pięciocyfrowych" };
            const tryb = r.int(0, 5);
            const n = tryb >= 4 ? r.int(3, 4) : r.int(3, 5);
            const s = SLOWA[n];
            let tresc, cz, rozw;
            if (tryb === 0) {
              cz = [9, ...Array(n - 1).fill(10)];
              tresc = `Ile jest liczb naturalnych ${s}?`;
              rozw = [`Pierwsza cyfra nie może być zerem – ma $9$ możliwości. Każda z pozostałych ${n - 1} cyfr ma $10$ możliwości.`];
            } else if (tryb === 1) {
              cz = [9, ...Array.from({ length: n - 1 }, (_, i) => 9 - i)];
              tresc = `Ile jest liczb naturalnych ${s} o wszystkich cyfrach różnych?`;
              rozw = [`Pierwsza cyfra ma $9$ możliwości (nie $0$). Druga ma $9$ (może być $0$, ale nie może powtórzyć pierwszej), trzecia $8$ itd.`];
            } else if (tryb === 2) {
              cz = [5, 9, ...Array(n - 2).fill(10)];
              tresc = `Ile jest liczb naturalnych parzystych ${s}?`;
              rozw = [`Ostatnia cyfra jest parzysta: $5$ możliwości ($0$, $2$, $4$, $6$, $8$). Pierwsza cyfra ma $9$ możliwości, a każda ze środkowych $10$.`];
            } else if (tryb === 3) {
              cz = [2, 9, ...Array(n - 2).fill(10)];
              tresc = `Ile jest liczb naturalnych ${s} podzielnych przez $5$?`;
              rozw = [`Ostatnia cyfra to $0$ albo $5$: $2$ możliwości. Pierwsza cyfra ma $9$ możliwości, a każda ze środkowych $10$.`];
            } else if (tryb === 4) {
              const d = r.int(0, 9);
              tresc = `Ile jest liczb naturalnych ${s}, w których zapisie nie występuje cyfra $${d}$?`;
              if (d === 0) {
                cz = Array(n).fill(9);
                rozw = [`Każda cyfra może być jedną z $9$ cyfr od $1$ do $9$.`];
              } else {
                cz = [8, ...Array(n - 1).fill(9)];
                rozw = [`Pierwsza cyfra nie może być zerem ani cyfrą $${d}$ – ma $8$ możliwości. Każda z pozostałych ${n - 1} cyfr nie może być cyfrą $${d}$ – ma $9$ możliwości.`];
              }
            } else {
              cz = [2, ...Array(n - 1).fill(5)];
              tresc = `Z cyfr $1$, $2$, $3$, $4$, $5$ (cyfry mogą się powtarzać) tworzymy liczby ${s}. Ile z nich jest parzystych?`;
              rozw = [`Ostatnia cyfra to $2$ albo $4$: $2$ możliwości. Każda z pozostałych ${n - 1} cyfr ma $5$ możliwości.`];
            }
            const N = mnoz(cz);
            rozw.push(`Mnożymy: $${prod(cz)} = ${sp(N)}$.`);
            return {
              tresc,
              pola: pole("Liczba liczb"),
              odpowiedz: { w: q(N) },
              wynik: `$${sp(N)}$`,
              rozwiazanie: rozw,
            };
          },
        },
        {
          id: "liczby-dopelnienie",
          nazwa: "Metoda dopełnienia",
          opis: "Ile jest kodów, haseł albo wyników, w których co najmniej raz występuje wybrany element (wszystkie minus bez tego elementu).",
          generuj(r) {
            const t = r.int(0, 4);
            let tresc, wszystkie, bez, wszystkieTex, bezTex;
            if (t === 0) {
              const k = r.int(3, 4), d = r.int(0, 9);
              tresc = `Kod PIN składa się z ${k} cyfr (każda od $0$ do $9$, cyfry mogą się powtarzać). Ile jest kodów zawierających co najmniej jedną cyfrę $${d}$?`;
              wszystkie = 10 ** k;
              bez = 9 ** k;
              wszystkieTex = `${prod(Array(k).fill(10))} = ${sp(wszystkie)}`;
              bezTex = `${prod(Array(k).fill(9))} = ${sp(bez)}`;
            } else if (t === 1) {
              const k = r.int(3, 8);
              tresc = `Rzucamy monetą ${k} razy. Ile jest różnych ciągów wyników, w których wypadł co najmniej jeden orzeł?`;
              wszystkie = 2 ** k;
              bez = 1;
              wszystkieTex = `2^{${k}} = ${sp(wszystkie)}`;
              bezTex = "1";
            } else if (t === 2) {
              const k = r.int(2, 4);
              tresc = `Rzucamy ${k} razy sześcienną kostką do gry. Ile jest różnych ciągów wyników, w których co najmniej raz wypadła szóstka?`;
              wszystkie = 6 ** k;
              bez = 5 ** k;
              wszystkieTex = `${prod(Array(k).fill(6))} = ${sp(wszystkie)}`;
              bezTex = `${prod(Array(k).fill(5))} = ${sp(bez)}`;
            } else if (t === 3) {
              const k = r.int(3, 4);
              const s = k === 3 ? "trzycyfrowych" : "czterocyfrowych";
              tresc = `Ile jest liczb naturalnych ${s}, w których zapisie występuje co najmniej jedna cyfra $0$?`;
              wszystkie = 9 * 10 ** (k - 1);
              bez = 9 ** k;
              wszystkieTex = `${prod([9, ...Array(k - 1).fill(10)])} = ${sp(wszystkie)}`;
              bezTex = `${prod(Array(k).fill(9))} = ${sp(bez)}`;
            } else {
              const m = r.int(3, 5), k = r.int(3, 4);
              tresc = `Hasło składa się z ${k} liter ze zbioru $${zbiorLiter(m)}$ (litery mogą się powtarzać). Ile jest haseł, w których co najmniej raz występuje litera $A$?`;
              wszystkie = m ** k;
              bez = (m - 1) ** k;
              wszystkieTex = `${prod(Array(k).fill(m))} = ${sp(wszystkie)}`;
              bezTex = `${prod(Array(k).fill(m - 1))} = ${sp(bez)}`;
            }
            const N = wszystkie - bez;
            const opisBez = t === 3 ? "Liczb bez cyfry $0$: każda cyfra ma $9$ możliwości" : t === 1 ? "Ciąg bez orła to same reszki – jest tylko jeden" : t === 2 ? "Bez szóstki na każdym miejscu jest $5$ wyników" : t === 0 ? "Bez ustalonej cyfry każde miejsce ma $9$ możliwości" : "Bez litery $A$ każde miejsce ma o jedną możliwość mniej";
            return {
              tresc,
              pola: pole("Liczba możliwości"),
              odpowiedz: { w: q(N) },
              wynik: `$${sp(N)}$`,
              rozwiazanie: [
                `Liczymy wszystkie możliwości: $${wszystkieTex}$.`,
                `${opisBez}: $${bezTex}$.`,
                `Szukana liczba to wszystkie możliwości bez tych niechcianych: $${sp(wszystkie)} - ${sp(bez)} = ${sp(N)}$.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
