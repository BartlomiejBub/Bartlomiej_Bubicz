// Klasa 4 (szkoła podstawowa) · rozdział II „Dodawanie i odejmowanie” – Klucz do matematyki 4 (Nowa Era, 2026).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** Liczba do wzoru: od pięciu cyfr z cienkimi odstępami, 12345 -> "12\,345" (liczby czterocyfrowe bez odstępu). */
const t = (n) => (n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : String(n));

/** Nazwy miejsc w zapisie liczby, od jedności: dopełniacz („na miejscu setek”) i mianownik. */
const MIEJSCA = ["jedności", "dziesiątek", "setek", "tysięcy", "dziesiątek tysięcy", "setek tysięcy"];
const MIEJSCA_M = ["jedności", "dziesiątki", "setki", "tysiące", "dziesiątki tysięcy", "setki tysięcy"];

/** Ile cyfr ma liczba – po polsku: czterocyfrowa. */
const CYFROWA = { 4: "czterocyfrową", 5: "pięciocyfrową" };

/** Ciąg `ile` różnych cyfr; pierwsza (najwyższe miejsce) nie jest zerem. */
function cyfryRozne(r, ile, zZerem = false) {
  for (;;) {
    const c = r.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, ile);
    if (c[0] !== 0 && (!zZerem || c.includes(0))) return c;
  }
}
const liczbaZCyfr = (c) => Number(c.join(""));

/** Zaokrąglenie do wielokrotności p (od połowy w górę). */
const zaokr = (n, p) => Math.floor((n + p / 2) / p) * p;

/** „na 3 równe części”, „na 5 równych części”. */
const czesci = (n) => (n <= 4 ? "równe części" : "równych części");

const PORZADKOWE = ["pierwszy", "drugi", "trzeci", "czwarty", "piąty", "szósty", "siódmy"];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 1. Jak zapisujemy liczby
    {
      id: "zapis-liczb",
      nazwa: "Jak zapisujemy liczby",
      sciaga: [
        {
          nazwa: "Cyfry i miejsca w liczbie",
          slownie: "Każdą liczbę zapisujemy dziesięcioma cyframi: $0$, $1$, $2$, $3$, $4$, $5$, $6$, $7$, $8$, $9$. O wartości cyfry decyduje miejsce, na którym stoi. Miejsca liczymy od prawej: jedności, dziesiątki, setki, tysiące, dziesiątki tysięcy, setki tysięcy.",
          przyklad: "W liczbie $25\\,306$ cyfra $5$ stoi na miejscu tysięcy, więc oznacza $5000$. Cyfra $3$ stoi na miejscu setek i oznacza $300$.",
          uwaga: "Ta sama cyfra w różnych miejscach znaczy co innego: w liczbie $353$ pierwsza trójka to $300$, a ostatnia tylko $3$.",
        },
        {
          nazwa: "Rozwinięty zapis liczby",
          slownie: "Liczbę można rozłożyć na sumę: każdą cyfrę zapisujemy razem z jej wartością. Zero na jakimś miejscu oznacza, że nie ma tam żadnego składnika.",
          tex: "4375=4000+300+70+5",
          przyklad: "$60\\,208=60\\,000+200+8$. Brakuje tysięcy i dziesiątek, więc na tych miejscach stoją zera.",
          uwaga: "Zero trzeba zapisać: $4$ tysiące i $5$ jedności to $4005$, a nie $45$.",
        },
        {
          nazwa: "Duże liczby i grupy cyfr",
          slownie: "Duże liczby dzielimy od prawej strony na grupy po trzy cyfry, żeby łatwiej je czytać. $1000$ to tysiąc, a $1\\,000\\,000$ to milion.",
          przyklad: "$2\\,450\\,300$ czytamy: dwa miliony czterysta pięćdziesiąt tysięcy trzysta.",
          uwaga: "Grupy po trzy cyfry zaczynamy odliczać od prawej, a nie od lewej.",
        },
        {
          nazwa: "Porównywanie liczb",
          slownie: "Liczba z większą liczbą cyfr jest większa. Gdy cyfr jest tyle samo, porównujemy cyfry od lewej strony i patrzymy na pierwszą różną.",
          przyklad: "$48\\,215<48\\,521$, bo pierwsze dwie cyfry są takie same, a na miejscu setek jest $2<5$. Liczba $9876$ jest mniejsza od $12\\,000$, bo ma mniej cyfr.",
          uwaga: "Nie porównuj liczb od prawej strony. Większa jest ta liczba, która ma większą cyfrę na pierwszym różnym miejscu od lewej.",
        },
      ],
      jak: [
        "Policz cyfry liczby i zapisz nazwy miejsc od prawej: jedności, dziesiątki, setki, tysiące…",
        "Odczytaj, na którym miejscu stoi cyfra, o którą pytają, i dopisz tyle zer, ile trzeba.",
        "Przy porównywaniu najpierw sprawdź, ile cyfr mają liczby, a potem porównuj cyfry od lewej.",
        "Układając liczbę z podanych cyfr, pamiętaj, że zero nie może stać na początku.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Jaką wartość ma cyfra $7$ w liczbie $507\\,438$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$700$", "$7000$", "$70\\,000$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Jak zapisać cyframi liczbę $40\\,000+3000+60+8$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$43\\,608$", "$43\\,068$", "$40\\,368$", "$4368$"],
          poprawna: 1,
        },
        {
          nr: "3",
          tresc: "Dana jest liczba $120\\,450$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Cyfra $2$ stoi na miejscu dziesiątek tysięcy.", litery: "PF", poprawna: 0 },
            { tekst: "Cyfra $4$ oznacza w tej liczbie $40$.", litery: "PF", poprawna: 1 },
            { tekst: "Na miejscu tysięcy stoi cyfra $0$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "4",
          tresc: "Która z liczb jest największa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$44\\,999$", "$45\\,980$", "$45\\,098$", "$45\\,890$"],
          poprawna: 1,
        },
        {
          nr: "5",
          tresc: "Jak zapisać cyframi liczbę: dwa miliony trzysta tysięcy czterdzieści? **Wybierz właściwą odpowiedź.**",
          opcje: ["$230\\,040$", "$2\\,030\\,040$", "$2\\,300\\,400$", "$2\\,300\\,040$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Z cyfr $3$, $0$, $7$, $5$, $9$, używając każdej dokładnie raz, zapisz największą i najmniejszą liczbę pięciocyfrową. **Zapisz obliczenia.**",
          rozwiazanie: "Największą liczbę dostajemy, ustawiając cyfry od największej do najmniejszej: $9$, $7$, $5$, $3$, $0$, czyli $97\\,530$.\n\nNajmniejszą liczbę dostajemy, ustawiając cyfry od najmniejszej do największej. Zero nie może jednak stać na początku, bo wtedy liczba miałaby tylko cztery cyfry.\n\nNa początku stawiamy więc najmniejszą cyfrę różną od zera, czyli $3$, a potem $0$, $5$, $7$, $9$: $30\\,579$.\n\nOdpowiedź: Największa liczba to $97\\,530$, a najmniejsza to $30\\,579$.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Liczba ma $6$ setek tysięcy, $2$ tysiące, $9$ setek i $4$ jedności. Zapisz tę liczbę cyframi i w postaci sumy. **Zapisz obliczenia.**",
          rozwiazanie: "Wypisujemy miejsca od lewej: setki tysięcy $6$, dziesiątki tysięcy $0$, tysiące $2$, setki $9$, dziesiątki $0$, jedności $4$.\n\nNa miejscach dziesiątek tysięcy i dziesiątek nic nie ma, więc stawiamy tam zera: $602\\,904$.\n\nW postaci sumy: $600\\,000+2000+900+4$.\n\nOdpowiedź: Liczba to $602\\,904=600\\,000+2000+900+4$.",
        },
      ],
      generatory: [
        {
          id: "zapis-cyfra-wartosc",
          nazwa: "Cyfra i jej miejsce",
          opis: "Odczytaj cyfrę z danego miejsca, wartość cyfry albo zapisz liczbę z postaci rozwiniętej.",
          generuj(r) {
            const tryb = r.int(0, 2);
            const ile = r.int(4, 5);
            const c = cyfryRozne(r, ile, tryb === 2);
            const N = liczbaZCyfr(c);
            const od_prawej = `Miejsca liczymy od prawej: ${MIEJSCA_M.slice(0, ile).join(", ")}.`;
            if (tryb === 0) {
              const k = r.int(0, ile - 1);
              const d = c[ile - 1 - k];
              return {
                tresc: `Jaka cyfra stoi na miejscu ${MIEJSCA[k]} w liczbie $${t(N)}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Cyfra" }],
                odpowiedz: { w: d },
                wynik: `cyfra $${d}$`,
                rozwiazanie: [od_prawej, `Na miejscu ${MIEJSCA[k]} stoi cyfra $${d}$.`],
              };
            }
            if (tryb === 1) {
              const k = r.pick(c.map((d, i) => [d, ile - 1 - i]).filter(([d]) => d > 0))[1];
              const d = c[ile - 1 - k];
              const w = d * 10 ** k;
              return {
                tresc: `Jaką wartość ma cyfra $${d}$ w liczbie $${t(N)}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wartość" }],
                odpowiedz: { w },
                wynik: `$${t(w)}$`,
                rozwiazanie: [
                  od_prawej,
                  `Cyfra $${d}$ stoi na miejscu ${MIEJSCA[k]}.`,
                  k === 0 ? `Na miejscu jedności cyfra znaczy tyle, ile wynosi: $${d}$.` : `Jej wartość to $${d} \\cdot ${t(10 ** k)} = ${t(w)}$.`,
                ],
              };
            }
            const skl = c.map((d, i) => [d, ile - 1 - i]).filter(([d]) => d > 0);
            return {
              tresc: `Zapisz cyframi liczbę $${skl.map(([d, k]) => t(d * 10 ** k)).join(" + ")}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba" }],
              odpowiedz: { w: N },
              wynik: `$${t(N)}$`,
              rozwiazanie: [
                `Składniki podpowiadają cyfry: ${skl.map(([d, k]) => `$${d}$ na miejscu ${MIEJSCA[k]}`).join(", ")}.`,
                `Na pozostałych miejscach stoją zera.`,
                `Cała liczba to $${t(N)}$.`,
              ],
            };
          },
        },
        {
          id: "zapis-najwieksza",
          nazwa: "Największa i najmniejsza",
          opis: "Wybierz największą albo najmniejszą z liczb, albo ułóż taką liczbę z podanych cyfr.",
          generuj(r) {
            if (r.chance(0.6)) {
              const ile = r.int(4, 6);
              const c = cyfryRozne(r, ile);
              const liczby = new Set([liczbaZCyfr(c)]);
              while (liczby.size < 4) {
                const d = [...c];
                const i = r.int(0, ile - 1);
                const j = r.int(0, ile - 1);
                if (i === j) continue;
                [d[i], d[j]] = [d[j], d[i]];
                if (d[0] === 0) continue;
                liczby.add(liczbaZCyfr(d));
              }
              const opcje = r.shuffle([...liczby]);
              const duza = r.chance();
              const odp = duza ? Math.max(...opcje) : Math.min(...opcje);
              const rosnaco = [...opcje].sort((x, y) => x - y);
              return {
                tresc: `Która z liczb jest ${duza ? "największa" : "najmniejsza"}: ${opcje.slice(0, 3).map((n) => `$${t(n)}$`).join(", ")} czy $${t(opcje[3])}$?`,
                pola: [{ id: "w", typ: "wybor", etykieta: "Odpowiedź", opcje: opcje.map((n) => `$${t(n)}$`) }],
                odpowiedz: { w: opcje.indexOf(odp) },
                wynik: `$${t(odp)}$`,
                rozwiazanie: [
                  "Wszystkie liczby mają tyle samo cyfr, więc porównujemy je cyfra po cyfrze od lewej strony.",
                  `Po uporządkowaniu: $${rosnaco.map(t).join(" < ")}$.`,
                  `${duza ? "Największa" : "Najmniejsza"} jest liczba $${t(odp)}$.`,
                ],
              };
            }
            const ile = r.int(4, 5);
            const c = r.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, ile);
            const duza = r.chance();
            let u;
            if (duza) {
              u = [...c].sort((x, y) => y - x);
            } else {
              u = [...c].sort((x, y) => x - y);
              if (u[0] === 0) [u[0], u[1]] = [u[1], u[0]];
            }
            const N = liczbaZCyfr(u);
            const rozw = [
              duza
                ? "Największą liczbę dostajemy, ustawiając cyfry od największej do najmniejszej."
                : "Najmniejszą liczbę dostajemy, ustawiając cyfry od najmniejszej do największej, ale zero nie może stać na początku.",
            ];
            if (!duza && c.includes(0)) rozw.push(`Na początku stawiamy najmniejszą cyfrę różną od zera, czyli $${u[0]}$, a zero zaraz za nią.`);
            rozw.push(`Otrzymujemy liczbę $${t(N)}$.`);
            return {
              tresc: `Z cyfr ${c.map((d) => `$${d}$`).join(", ")} (każdej użyj dokładnie raz) ułóż ${duza ? "największą" : "najmniejszą"} liczbę ${CYFROWA[ile]}.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba" }],
              odpowiedz: { w: N },
              wynik: `$${t(N)}$`,
              rozwiazanie: rozw,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 2. Oś liczbowa
    {
      id: "os-liczbowa",
      nazwa: "Oś liczbowa",
      sciaga: [
        {
          nazwa: "Co to jest oś liczbowa",
          slownie: "Oś liczbowa to prosta, na której zaznaczamy punkt $0$ i odcinek jednostkowy. Liczby rosną w prawo, a każdej liczbie odpowiada jeden punkt. Im bardziej na prawo leży punkt, tym większa jest jego liczba.",
          przyklad: "Liczba $7$ leży o $7$ odcinków jednostkowych na prawo od zera, więc jest na osi dalej niż liczba $4$.",
          uwaga: "Odcinki jednostkowe muszą być wszędzie równe, inaczej nie da się czytać liczb z osi.",
        },
        {
          nazwa: "Odczytywanie liczb z podziałki",
          slownie: "Policz, na ile równych części podzielono odcinek między dwiema liczbami. Jedna część jest tyle razy krótsza od całego odcinka, ile jest części.",
          tex: "\\text{odległość}:\\text{liczba części}",
          przyklad: "Między $0$ i $100$ jest $5$ równych części. Jedna część to $100:5=20$, więc kolejne punkty to $20$, $40$, $60$, $80$.",
          uwaga: "Licz części (przerwy między kreskami), a nie same kreski: $5$ części to $6$ kresek razem z końcami.",
        },
        {
          nazwa: "Odległość dwóch liczb na osi",
          slownie: "Odległość między dwiema liczbami na osi to różnica: od większej odejmujemy mniejszą.",
          przyklad: "Od liczby $35$ do liczby $80$ jest $80-35=45$ jednostek.",
          uwaga: "Odległości nie dodajemy: między $35$ a $80$ jest $45$, a nie $115$.",
        },
        {
          nazwa: "Liczba w połowie drogi",
          slownie: "Żeby znaleźć liczbę w połowie drogi między dwiema liczbami, policz odległość między nimi, weź jej połowę i dodaj ją do mniejszej liczby.",
          przyklad: "Między $40$ i $100$: odległość $100-40=60$, jej połowa to $30$, a środek to $40+30=70$.",
          uwaga: "Środek to nie jest połowa większej liczby: połowa liczby $100$ to $50$, a nie $70$.",
        },
      ],
      jak: [
        "Znajdź na osi dwa punkty, których liczby znasz, i policz odległość między nimi (większa minus mniejsza).",
        "Policz, na ile równych części jest podzielony ten odcinek, i podziel odległość przez liczbę części.",
        "Przesuwaj się od znanej liczby o tyle części, ile trzeba: w prawo dodajemy, w lewo odejmujemy.",
        "Sprawdź, czy wynik leży po właściwej stronie i mieści się między podanymi liczbami.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Na osi liczbowej odcinek od $0$ do $50$ podzielono na $5$ równych części. Jaką liczbę przedstawia koniec trzeciej części, licząc od zera? **Wybierz właściwą odpowiedź.**",
          opcje: ["$15$", "$20$", "$30$", "$40$"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Punkty $A$ i $B$ leżą na osi liczbowej i przedstawiają liczby $240$ i $360$. Odcinek $AB$ podzielono na $6$ równych części. Jaką długość ma jedna część? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10$", "$20$", "$40$", "$120$"],
          poprawna: 1,
        },
        {
          nr: "10",
          tresc: "Która liczba leży dokładnie w połowie drogi między liczbami $170$ i $230$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$30$", "$60$", "$115$", "$200$"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "Rozważamy liczby na osi liczbowej. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Liczba $48$ leży na osi na prawo od liczby $84$.", litery: "PF", poprawna: 1 },
            { tekst: "Odległość między liczbami $35$ i $90$ jest równa $55$.", litery: "PF", poprawna: 0 },
            { tekst: "Punkt leżący bardziej na prawo przedstawia większą liczbę.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "12",
          tresc: "Punkt $L$ przedstawia na osi liczbę $52$. Punkt $K$ leży $7$ jednostek na lewo od punktu $L$. Jaką liczbę przedstawia punkt $K$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$45$", "$59$", "$44$", "$7$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Punkt $A$ przedstawia na osi liczbę $150$, a punkt $B$ liczbę $450$. Odcinek $AB$ podzielono na $6$ równych części. Jaką długość ma jedna część? Jakie liczby przedstawiają punkty podziału wewnątrz odcinka $AB$? **Zapisz obliczenia.**",
          rozwiazanie: "Odległość od $A$ do $B$: $450-150=300$.\n\nJedna część: $300:6=50$.\n\nPunkty podziału dostajemy, dodając kolejno $50$ do $150$: $200$, $250$, $300$, $350$, $400$.\n\nOdpowiedź: Jedna część ma długość $50$, a punkty podziału przedstawiają liczby $200$, $250$, $300$, $350$ i $400$.",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "Ania stoi na osi liczbowej w punkcie przedstawiającym liczbę $64$, a Bartek w punkcie przedstawiającym liczbę $112$. Chcą spotkać się w połowie drogi. Jaką liczbę przedstawia punkt spotkania i ile jednostek musi przejść każde z nich? **Zapisz obliczenia.**",
          rozwiazanie: "Odległość między nimi: $112-64=48$.\n\nPołowa odległości: $48:2=24$.\n\nPunkt spotkania: $64+24=88$ (sprawdzenie: $112-24=88$).\n\nOdpowiedź: Spotkają się w punkcie $88$, a każde z nich przejdzie po $24$ jednostki.",
        },
      ],
      generatory: [
        {
          id: "os-podzial",
          nazwa: "Podziałka na osi",
          opis: "Odcinek na osi jest podzielony na równe części – oblicz długość części albo liczbę w punkcie podziału.",
          generuj(r) {
            const [P, K] = r.pick([["A", "B"], ["K", "L"], ["M", "N"]]);
            const s = r.pick([2, 3, 4, 5, 10, 20, 25, 50]);
            const n = r.int(3, 8);
            const a = s * r.int(1, 12);
            const b = a + s * n;
            const wstep = `Na osi liczbowej punkt $${P}$ przedstawia liczbę $${a}$, a punkt $${K}$ liczbę $${b}$. Odcinek $${P}${K}$ podzielono na $${n}$ ${czesci(n)}.`;
            const kroki = [`Odległość od $${P}$ do $${K}$: $${b} - ${a} = ${b - a}$.`, `Jedna część: $${b - a} : ${n} = ${s}$.`];
            if (r.chance(0.4)) {
              return {
                tresc: `${wstep} Jaką długość ma jedna część?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Długość części" }],
                odpowiedz: { w: s },
                wynik: `$${s}$`,
                rozwiazanie: kroki,
              };
            }
            const k = r.int(1, n - 1);
            const w = a + k * s;
            return {
              tresc: `${wstep} Jaką liczbę przedstawia ${PORZADKOWE[k - 1]} punkt podziału, licząc od punktu $${P}$ w stronę punktu $${K}$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba" }],
              odpowiedz: { w },
              wynik: `$${w}$`,
              rozwiazanie: [...kroki, `Przesuwamy się od $${a}$ o $${k}$ części: $${a} + ${k} \\cdot ${s} = ${a} + ${k * s} = ${w}$.`],
            };
          },
        },
        {
          id: "os-odleglosc",
          nazwa: "Odległość i środek",
          opis: "Oblicz odległość dwóch liczb na osi, liczbę w połowie drogi albo liczbę przesuniętą o kilka jednostek.",
          generuj(r) {
            const tryb = r.int(0, 2);
            const a = r.int(10, 500);
            if (tryb === 0) {
              const d = r.int(6, 400);
              const b = a + d;
              return {
                tresc: `Punkt $A$ przedstawia na osi liczbę $${a}$, a punkt $B$ liczbę $${b}$. Ile jednostek dzieli te punkty?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Jednostek" }],
                odpowiedz: { w: d },
                wynik: `$${d}$`,
                rozwiazanie: ["Odległość to różnica: od większej liczby odejmujemy mniejszą.", `$${b} - ${a} = ${d}$.`],
              };
            }
            if (tryb === 1) {
              const d = 2 * r.int(3, 200);
              const b = a + d;
              const h = d / 2;
              return {
                tresc: `Punkt $S$ leży dokładnie w połowie drogi między punktem przedstawiającym liczbę $${a}$ a punktem przedstawiającym liczbę $${b}$. Jaką liczbę przedstawia punkt $S$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba" }],
                odpowiedz: { w: a + h },
                wynik: `$${a + h}$`,
                rozwiazanie: [`Odległość: $${b} - ${a} = ${d}$.`, `Połowa odległości: $${d} : 2 = ${h}$.`, `Środek: $${a} + ${h} = ${a + h}$.`],
              };
            }
            const prawo = r.chance();
            const d = r.int(5, a - 1 > 300 ? 300 : a - 1);
            const w = prawo ? a + d : a - d;
            return {
              tresc: `Punkt $M$ przedstawia na osi liczbę $${a}$. Jaką liczbę przedstawia punkt leżący o $${d}$ ${d % 10 >= 2 && d % 10 <= 4 && !(d % 100 >= 12 && d % 100 <= 14) ? "jednostki" : "jednostek"} na ${prawo ? "prawo" : "lewo"} od punktu $M$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba" }],
              odpowiedz: { w },
              wynik: `$${w}$`,
              rozwiazanie: [
                prawo ? "Idziemy w prawo, więc liczba rośnie: dodajemy." : "Idziemy w lewo, więc liczba maleje: odejmujemy.",
                `$${a} ${prawo ? "+" : "-"} ${d} = ${w}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3. Dodawanie i odejmowanie w pamięci
    {
      id: "w-pamieci",
      nazwa: "Dodawanie i odejmowanie w pamięci",
      sciaga: [
        {
          nazwa: "Nazwy liczb w dodawaniu",
          slownie: "Liczby, które dodajemy, nazywamy składnikami. Wynik dodawania to suma. Składniki można zamieniać miejscami.",
          tex: "23+14=37",
          przyklad: "W działaniu $25+17=42$ liczby $25$ i $17$ to składniki, a $42$ to suma. Zamiana składników nic nie zmienia: $17+25=42$.",
        },
        {
          nazwa: "Nazwy liczb w odejmowaniu",
          slownie: "Z liczby, od której odejmujemy (odjemnej), odejmujemy odjemnik. Wynik odejmowania to różnica. Tu kolejność jest ważna.",
          tex: "52-17=35",
          przyklad: "W działaniu $52-17=35$ liczba $52$ jest odjemną, $17$ odjemnikiem, a $35$ różnicą.",
          uwaga: "Odejmowanie nie jest przemienne: od $4$ nie da się odjąć $9$, choć od $9$ odjąć $4$ można.",
        },
        {
          nazwa: "Brakująca liczba i sprawdzanie",
          slownie: "Brakujący składnik: od sumy odejmij drugi składnik. Brakujący odjemnik: od odjemnej odejmij różnicę. Brakująca odjemna: do różnicy dodaj odjemnik. Wynik odejmowania sprawdzamy dodawaniem.",
          tex: "52-17=35\\qquad35+17=52",
          przyklad: "W równości $\\square+17=52$ brakuje składnika: $52-17=35$. W równości $52-\\square=35$ brakuje odjemnika: $52-35=17$.",
          uwaga: "Szukając odjemnika, odejmujemy różnicę od odjemnej. Nie dodajemy ich do siebie.",
        },
        {
          nazwa: "Dodawanie w pamięci",
          slownie: "Drugi składnik rozbijamy na setki, dziesiątki i jedności i dodajemy je po kolei do pierwszego.",
          przyklad: "$476+38$: najpierw $476+30=506$, potem $506+8=514$.",
          uwaga: "Dodawaj po kolei do wyniku z poprzedniego kroku. Nie zgub żadnego kawałka rozbitego składnika.",
        },
        {
          nazwa: "Odejmowanie w pamięci",
          slownie: "Odjemnik rozbijamy na setki, dziesiątki i jedności i odejmujemy je po kolei od odjemnej.",
          przyklad: "$512-47$: najpierw $512-40=472$, potem $472-7=465$.",
          uwaga: "Nie odejmuj mniejszej cyfry od większej na każdym miejscu: w działaniu $42-18$ wynik to $24$, a nie $36$.",
        },
      ],
      jak: [
        "Nazwij liczby w zadaniu: które to składniki, a które odjemna i odjemnik.",
        "Rozbij drugą liczbę na setki, dziesiątki i jedności i licz po kolei, zaczynając od największego kawałka.",
        "Gdy czegoś brakuje, użyj działania odwrotnego: do znalezienia składnika odejmujemy, do znalezienia odjemnej dodajemy.",
        "Sprawdź wynik: odejmowanie – dodawaniem, dodawanie – odejmowaniem.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Jak nazywa się liczba $29$ w działaniu $84-29=55$? **Wybierz właściwą odpowiedź.**",
          opcje: ["różnicą", "odjemną", "odjemnikiem", "sumą"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "Oblicz $358+47$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$395$", "$405$", "$415$", "$305$"],
          poprawna: 1,
        },
        {
          nr: "17",
          tresc: "Oblicz $703-58$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$653$", "$655$", "$755$", "$645$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "Jaka liczba pasuje w miejsce $\\square$ w równości $\\square+68=135$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$67$", "$203$", "$77$", "$57$"],
          poprawna: 0,
        },
        {
          nr: "19",
          tresc: "Wiadomo, że $63+29=92$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$92-29=63$", litery: "PF", poprawna: 0 },
            { tekst: "$92-63=29$", litery: "PF", poprawna: 0 },
            { tekst: "$63-29=92$", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "W szkolnej bibliotece było $1248$ książek. Uczniowie wypożyczyli $375$ książek, a potem biblioteka kupiła $190$ nowych. Ile książek jest teraz w bibliotece? **Zapisz obliczenia.**",
          rozwiazanie: "Po wypożyczeniu zostało: $1248-375$. Odejmujemy po kolei: $1248-300=948$, $948-70=878$, $878-5=873$.\n\nPotem doszło $190$ książek: $873+190=873+100+90=1063$.\n\nOdpowiedź: W bibliotece jest teraz $1063$ książki.",
        },
        {
          nr: "21",
          punkty: 2,
          tresc: "Marta oszczędza na rower. Miała $235$ zł, a po urodzinach ma $410$ zł. Rower kosztuje $520$ zł. Ile pieniędzy dostała na urodziny i ile złotych jeszcze jej brakuje? **Zapisz obliczenia.**",
          rozwiazanie: "Pieniądze z urodzin to różnica między tym, co ma teraz, a tym, co miała: $410-235=175$.\n\nSprawdzenie: $235+175=410$.\n\nBrakuje jej: $520-410=110$.\n\nOdpowiedź: Marta dostała $175$ zł i brakuje jej jeszcze $110$ zł.",
        },
      ],
      generatory: [
        {
          id: "pamiec-dzialanie",
          nazwa: "Rozbij i oblicz",
          opis: "Dodaj albo odejmij w pamięci, rozbijając drugą liczbę na setki, dziesiątki i jedności.",
          generuj(r) {
            const dod = r.chance();
            let b;
            for (;;) {
              b = r.chance(0.7) ? r.int(11, 99) : r.int(101, 399);
              if (b % 10 !== 0) break;
            }
            const gora = r.chance(0.3) ? 4999 : 899;
            const a = r.int(Math.max(100, b + 20), gora);
            const czesciB = [Math.floor(b / 100) * 100, Math.floor(b / 10) % 10 * 10, b % 10].filter((x) => x > 0);
            let cur = a;
            const kroki = [`Rozbijamy $${b}$ na $${czesciB.join(" + ")}$.`];
            for (const p of czesciB) {
              const nast = dod ? cur + p : cur - p;
              kroki.push(`$${t(cur)} ${dod ? "+" : "-"} ${p} = ${t(nast)}$.`);
              cur = nast;
            }
            return {
              tresc: `Oblicz w pamięci: $${t(a)} ${dod ? "+" : "-"} ${b}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w: cur },
              wynik: `$${t(cur)}$`,
              rozwiazanie: kroki,
            };
          },
        },
        {
          id: "pamiec-brakujaca",
          nazwa: "Brakująca liczba",
          opis: "Znajdź liczbę, która pasuje w miejsce kwadracika, tak by równość była prawdziwa.",
          generuj(r) {
            const tryb = r.int(0, 3);
            const x = r.int(11, 700);
            const a = r.int(20, 600);
            let rownosc, kroki, jaka;
            if (tryb === 0) {
              const s = a + x;
              rownosc = `${t(a)} + \\square = ${t(s)}`;
              jaka = "składnik";
              kroki = [`Brakuje drugiego składnika: odejmujemy znany składnik od sumy: $${t(s)} - ${t(a)} = ${t(x)}$.`, `Sprawdzenie: $${t(a)} + ${t(x)} = ${t(s)}$.`];
            } else if (tryb === 1) {
              const s = a + x;
              rownosc = `\\square + ${t(a)} = ${t(s)}`;
              jaka = "składnik";
              kroki = [`Brakuje pierwszego składnika: odejmujemy znany składnik od sumy: $${t(s)} - ${t(a)} = ${t(x)}$.`, `Sprawdzenie: $${t(x)} + ${t(a)} = ${t(s)}$.`];
            } else if (tryb === 2) {
              const o = a + x;
              rownosc = `${t(o)} - \\square = ${t(a)}`;
              jaka = "odjemnik";
              kroki = [`Brakuje odjemnika: odejmujemy różnicę od odjemnej: $${t(o)} - ${t(a)} = ${t(x)}$.`, `Sprawdzenie: $${t(o)} - ${t(x)} = ${t(a)}$.`];
            } else {
              const o = a + x;
              rownosc = `\\square - ${t(x)} = ${t(a)}`;
              jaka = "odjemna";
              kroki = [`Brakuje odjemnej: do różnicy dodajemy odjemnik: $${t(a)} + ${t(x)} = ${t(o)}$.`, `Sprawdzenie: $${t(o)} - ${t(x)} = ${t(a)}$.`];
            }
            const odp = tryb === 3 ? a + x : x;
            void jaka;
            return {
              tresc: `Jaka liczba pasuje w miejsce $\\square$ w równości $${rownosc}$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba" }],
              odpowiedz: { w: odp },
              wynik: `$${t(odp)}$`,
              rozwiazanie: kroki,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4. Szacowanie
    {
      id: "szacowanie",
      nazwa: "Szacowanie",
      sciaga: [
        {
          nazwa: "Zaokrąglanie liczb",
          slownie: "Zaokrąglając do dziesiątek, setek albo tysięcy, patrzymy na cyfrę tuż za tym miejscem. Cyfry $0$–$4$: zostawiamy poprzednią cyfrę. Cyfry $5$–$9$: zwiększamy poprzednią cyfrę o $1$. Dalsze cyfry zamieniamy na zera.",
          przyklad: "$3476$ do dziesiątek to $3480$ (za dziesiątkami jest $6$). Do setek to $3500$ (za setkami jest $7$). Do tysięcy to $3000$ (za tysiącami jest $4$).",
          uwaga: "Patrz tylko na cyfrę tuż za miejscem zaokrąglenia: $2449$ do setek to $2400$ (bo $4<5$), a nie $2500$.",
        },
        {
          nazwa: "Szacowanie sumy i różnicy",
          slownie: "Żeby szybko oszacować wynik, zaokrąglamy liczby, na przykład do setek, i liczymy na okrągłych liczbach. Taki wynik jest tylko przybliżony. Znak $\\approx$ czytamy „w przybliżeniu”.",
          przyklad: "$398+506\\approx400+500=900$ (dokładnie jest $904$). $1247-689\\approx1200-700=500$ (dokładnie jest $558$).",
          uwaga: "Zaokrąglaj obie liczby do tego samego miejsca. Oszacowaniem możesz też sprawdzić, czy dokładny wynik nie jest absurdalny.",
        },
        {
          nazwa: "Czy wystarczy pieniędzy",
          slownie: "Gdy sprawdzamy, czy pieniędzy na pewno wystarczy, ceny zaokrąglamy w górę. Jeśli suma po zaokrągleniu w górę mieści się w naszej kwocie, to dokładna suma tym bardziej się zmieści.",
          przyklad: "Ceny $49$ zł, $38$ zł i $22$ zł. W górę: $50+40+30=120$ zł. Mamy $120$ zł, więc wystarczy (dokładnie to $109$ zł).",
          uwaga: "Zaokrąglenie w dół nie daje pewności: wynik mógłby wyjść mniejszy niż naprawdę.",
        },
      ],
      jak: [
        "Zdecyduj, do którego miejsca zaokrąglasz: do dziesiątek, setek czy tysięcy.",
        "Spójrz na cyfrę tuż za tym miejscem: $0$–$4$ w dół, $5$–$9$ w górę.",
        "Zaokrąglij każdą liczbę osobno i wykonaj działanie na okrągłych liczbach.",
        "Gdy pytają, czy coś wystarczy, zaokrąglaj w górę.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Liczbę $4386$ zaokrąglono do setek. Jaką liczbę otrzymano? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4300$", "$4390$", "$4400$", "$4000$"],
          poprawna: 2,
        },
        {
          nr: "23",
          tresc: "Liczbę $27\\,500$ zaokrąglono do tysięcy. Jaką liczbę otrzymano? **Wybierz właściwą odpowiedź.**",
          opcje: ["$27\\,000$", "$28\\,000$", "$27\\,500$", "$30\\,000$"],
          poprawna: 1,
        },
        {
          nr: "24",
          tresc: "Oszacuj sumę $302+597+198$, zaokrąglając każdy składnik do setek. Jaki wynik otrzymasz? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1100$", "$1200$", "$1000$", "$1097$"],
          poprawna: 0,
        },
        {
          nr: "25",
          tresc: "Ola ma $100$ zł. Chce kupić piórnik za $38$ zł, farby za $27$ zł i zeszyt za $19$ zł. Zaokrągla ceny w górę do dziesiątek i dodaje. Jaką sumę otrzyma i czy $100$ zł na pewno wystarczy? **Wybierz właściwą odpowiedź.**",
          opcje: ["$80$ zł, wystarczy", "$90$ zł, nie wystarczy", "$100$ zł, nie wystarczy", "$90$ zł, wystarczy"],
          poprawna: 3,
        },
        {
          nr: "26",
          tresc: "Zaokrąglamy liczby. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$3650$ zaokrąglone do setek to $3700$.", litery: "PF", poprawna: 0 },
            { tekst: "$8249$ zaokrąglone do tysięcy to $9000$.", litery: "PF", poprawna: 1 },
            { tekst: "$615$ zaokrąglone do dziesiątek to $620$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 3,
          tresc: "Pani Kasia kupiła lodówkę za $1899$ zł i pralkę za $1349$ zł. Oszacuj, ile zapłaciła, zaokrąglając ceny do setek. Potem oblicz dokładną sumę i sprawdź, o ile oszacowanie różni się od wyniku. **Zapisz obliczenia.**",
          rozwiazanie: "Zaokrąglamy do setek: $1899\\approx1900$ i $1349\\approx1300$.\n\nOszacowanie: $1900+1300=3200$ zł.\n\nDokładna suma: $1899+1349=1899+1300+49=3199+49=3248$ zł.\n\nRóżnica: $3248-3200=48$ zł.\n\nOdpowiedź: Oszacowanie to około $3200$ zł, dokładnie zapłaciła $3248$ zł, czyli o $48$ zł więcej.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "W mieście mieszka $38\\,475$ osób. Podaj tę liczbę zaokrągloną do dziesiątek, do setek, do tysięcy i do dziesiątek tysięcy. **Zapisz obliczenia.**",
          rozwiazanie: "Do dziesiątek: za dziesiątkami jest cyfra $5$, więc w górę: $38\\,480$.\n\nDo setek: za setkami jest cyfra $7$, więc w górę: $38\\,500$.\n\nDo tysięcy: za tysiącami jest cyfra $4$, więc w dół: $38\\,000$.\n\nDo dziesiątek tysięcy: za nimi jest cyfra $8$, więc w górę: $40\\,000$.\n\nOdpowiedź: $38\\,480$, $38\\,500$, $38\\,000$ i $40\\,000$.",
        },
      ],
      generatory: [
        {
          id: "szacowanie-zaokraglanie",
          nazwa: "Zaokrąglanie liczby",
          opis: "Zaokrąglij liczbę do dziesiątek, setek albo tysięcy.",
          generuj(r) {
            const k = r.int(1, 3);
            const ile = r.int(k + 1, 5);
            const N = r.int(10 ** (ile - 1), 10 ** ile - 1);
            const p = 10 ** k;
            const w = zaokr(N, p);
            const c = Math.floor(N / (p / 10)) % 10;
            return {
              tresc: `Zaokrąglij liczbę $${t(N)}$ do ${MIEJSCA[k]}.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba po zaokrągleniu" }],
              odpowiedz: { w },
              wynik: `$${t(w)}$`,
              rozwiazanie: [
                `Patrzymy na cyfrę tuż za miejscem ${MIEJSCA[k]}: jest to $${c}$.`,
                c >= 5
                  ? `Cyfra $${c}$ jest równa $5$ lub większa, więc zwiększamy cyfrę na miejscu ${MIEJSCA[k]} o $1$${Math.floor(N / p) % 10 === 9 ? " (z $9$ robi się $10$: piszemy $0$ i dodajemy $1$ na następnym miejscu)" : ""}.`
                  :`Cyfra $${c}$ jest mniejsza niż $5$, więc cyfrę na miejscu ${MIEJSCA[k]} zostawiamy.`,
                `Dalsze cyfry zamieniamy na zera: $${t(w)}$.`,
              ],
            };
          },
        },
        {
          id: "szacowanie-wynik",
          nazwa: "Oszacuj sumę lub różnicę",
          opis: "Zaokrąglij oba składniki i oblicz przybliżony wynik.",
          generuj(r) {
            const k = r.int(1, 3);
            const p = 10 ** k;
            const dolne = [21, 210, 2100][k - 1];
            const gorne = [899, 9899, 49000][k - 1];
            const dod = r.chance();
            let a, b;
            for (;;) {
              a = r.int(dolne, gorne);
              b = r.int(dolne, gorne);
              if (dod || zaokr(a, p) > zaokr(b, p)) break;
            }
            const A = zaokr(a, p);
            const B = zaokr(b, p);
            const w = dod ? A + B : A - B;
            return {
              tresc: `Oszacuj ${dod ? "sumę" : "różnicę"} $${t(a)} ${dod ? "+" : "-"} ${t(b)}$, zaokrąglając obie liczby do ${MIEJSCA[k]}.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Oszacowanie" }],
              odpowiedz: { w },
              wynik: `$${t(w)}$`,
              rozwiazanie: [
                `Zaokrąglamy do ${MIEJSCA[k]}: $${t(a)} \\approx ${t(A)}$ i $${t(b)} \\approx ${t(B)}$.`,
                `Liczymy na okrągłych liczbach: $${t(A)} ${dod ? "+" : "-"} ${t(B)} = ${t(w)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5. Sprytne dodawanie
    {
      id: "sprytne-dodawanie",
      nazwa: "Sprytne dodawanie",
      sciaga: [
        {
          nazwa: "Dowolna kolejność składników",
          slownie: "Przy dodawaniu możemy zmieniać kolejność składników i łączyć je w dowolne grupy, a suma się nie zmieni. Dzięki temu dodajemy najpierw to, co się wygodnie liczy.",
          tex: "23+48+7=23+7+48",
          przyklad: "$23+48+7=(23+7)+48=30+48=78$.",
          uwaga: "To działa tylko przy dodawaniu. Przy odejmowaniu kolejność ma znaczenie.",
        },
        {
          nazwa: "Pary dające okrągłą liczbę",
          slownie: "Szukamy liczb, które razem dają $10$, $100$ albo $1000$. Zwykle pasują do siebie liczby o końcówkach $1$ i $9$, $2$ i $8$, $3$ i $7$, $4$ i $6$ albo dwie piątki.",
          przyklad: "$25+37+75+63=(25+75)+(37+63)=100+100=200$.",
          uwaga: "Zacznij od cyfr jedności: $7$ pasuje do $3$, a $6$ do $4$. Liczby z końcówką $0$ nie potrzebują pary.",
        },
        {
          nazwa: "Dodawanie przez zaokrąglenie",
          slownie: "Gdy składnik jest tuż pod okrągłą liczbą, dodajemy okrągłą liczbę, a potem odejmujemy to, co dodaliśmy za dużo. Gdy jest tuż nad okrągłą liczbą, dodajemy najpierw okrągłą, a potem resztę.",
          przyklad: "$354+98=354+100-2=454-2=452$. A $354+102=354+100+2=456$.",
          uwaga: "Pamiętaj o poprawce: $354+98$ nie jest równe $454$, bo dodaliśmy o $2$ za dużo.",
        },
      ],
      jak: [
        "Przeczytaj wszystkie składniki i poszukaj dwóch, które dadzą okrągłą liczbę ($10$, $100$, $1000$).",
        "Zamień kolejność albo nawiasami połącz takie pary i dodaj je.",
        "Gdy składnik jest bliski okrągłej liczbie, dodaj okrągłą i popraw wynik.",
        "Na końcu szybko oszacuj sumę, żeby sprawdzić, czy wynik jest rozsądny.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Oblicz sprytnie $47+86+53$ (zacznij od pary dającej $100$). **Wybierz właściwą odpowiedź.**",
          opcje: ["$176$", "$196$", "$186$", "$190$"],
          poprawna: 2,
        },
        {
          nr: "30",
          tresc: "Która równość jest prawdziwa dzięki temu, że dodawanie jest przemienne? **Wybierz właściwą odpowiedź.**",
          opcje: ["$40+15=15+40$", "$40-15=15-40$", "$40-15=15+40$", "$40+15=40-15$"],
          poprawna: 0,
        },
        {
          nr: "31",
          tresc: "Oblicz $467+99$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$567$", "$566$", "$556$", "$576$"],
          poprawna: 1,
        },
        {
          nr: "32",
          tresc: "Rozważamy sumę $18+25+82+75$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$18+82=100$", litery: "PF", poprawna: 0 },
            { tekst: "$25+75=100$", litery: "PF", poprawna: 0 },
            { tekst: "Cała suma jest równa $180$.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "33",
          tresc: "Oblicz $1250+398$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$1658$", "$1548$", "$1652$", "$1648$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 2,
          tresc: "Oblicz sprytnie $64+129+36+71$ i zapisz, jak łączysz składniki. **Zapisz obliczenia.**",
          rozwiazanie: "Szukamy par dających okrągłe liczby: $64+36=100$ oraz $129+71=200$.\n\nZmieniamy kolejność i łączymy składniki: $64+129+36+71=(64+36)+(129+71)$.\n\nDodajemy: $100+200=300$.\n\nOdpowiedź: $64+129+36+71=300$.",
        },
        {
          nr: "35",
          punkty: 2,
          tresc: "W poniedziałek w kinie sprzedano $198$ biletów, we wtorek $235$, a w środę $102$. Ile biletów sprzedano w ciągu tych trzech dni? Oblicz sprytnie. **Zapisz obliczenia.**",
          rozwiazanie: "Szukamy pary dającej okrągłą liczbę: $198+102=300$.\n\nDo tego dodajemy pozostałe $235$: $300+235=535$.\n\nOdpowiedź: Sprzedano $535$ biletów.",
        },
      ],
      generatory: [
        {
          id: "sprytne-dodawanie-pary",
          nazwa: "Pary do okrągłej liczby",
          opis: "Cztery składniki, z których dwie pary dają okrągłe liczby – dodaj je sprytnie.",
          generuj(r) {
            const para = (cel) => {
              const x = cel === 100 ? r.int(11, 89) : r.int(101, 899);
              return x % 10 === 0 ? para(cel) : [x, cel - x];
            };
            const c1 = r.pick([100, 100, 1000]);
            const c2 = r.pick([100, 100, 1000]);
            const [a, b] = para(c1);
            const [c, d] = para(c2);
            let kol;
            do {
              kol = r.shuffle([a, b, c, d]);
            } while ([100, 1000].includes(kol[0] + kol[1]) || [100, 1000].includes(kol[2] + kol[3]) && kol[0] + kol[1] === c1 + c2);
            const w = c1 + c2;
            return {
              tresc: `Oblicz sprytnie: $${kol.join(" + ")}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Suma" }],
              odpowiedz: { w },
              wynik: `$${t(w)}$`,
              rozwiazanie: [
                "Zmieniamy kolejność składników i szukamy par, które dadzą okrągłą liczbę.",
                `$${a} + ${b} = ${t(c1)}$ oraz $${c} + ${d} = ${t(c2)}$.`,
                `$${t(c1)} + ${t(c2)} = ${t(w)}$.`,
              ],
            };
          },
        },
        {
          id: "sprytne-dodawanie-zaokraglenie",
          nazwa: "Dodaj prawie okrągłą",
          opis: "Dodaj liczbę bliską pełnej setce albo tysiącowi: dodaj okrągłą i popraw wynik.",
          generuj(r) {
            const R = r.pick([100, 200, 300, 400, 500, 1000]);
            const d = r.int(1, 3);
            const pod = r.chance();
            const b = pod ? R - d : R + d;
            const a = r.int(120, R === 1000 ? 4800 : 900);
            const w = a + b;
            const zamien = r.chance(0.3);
            const x = a + R;
            return {
              tresc: `Oblicz w pamięci: $${zamien ? `${b} + ${t(a)}` : `${t(a)} + ${b}`}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w },
              wynik: `$${t(w)}$`,
              rozwiazanie: [
                ...(zamien ? [`Zamieniamy składniki miejscami: $${t(a)} + ${b}$.`] : []),
                pod ? `$${b} = ${R} - ${d}$, czyli liczba $${b}$ jest o $${d}$ mniejsza od $${R}$.` : `$${b} = ${R} + ${d}$, czyli liczba $${b}$ jest o $${d}$ większa od $${R}$.`,
                `Dodajemy okrągłą liczbę: $${t(a)} + ${R} = ${t(x)}$.`,
                pod ? `Dodaliśmy o $${d}$ za dużo, więc odejmujemy: $${t(x)} - ${d} = ${t(w)}$.` : `Dodaliśmy o $${d}$ za mało, więc dodajemy jeszcze $${d}$: $${t(x)} + ${d} = ${t(w)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 6. Sprytne odejmowanie
    {
      id: "sprytne-odejmowanie",
      nazwa: "Sprytne odejmowanie",
      sciaga: [
        {
          nazwa: "Odejmowanie przez zaokrąglenie",
          slownie: "Gdy odjemnik jest tuż pod okrągłą liczbą, odejmujemy okrągłą, a potem oddajemy to, co odjęliśmy za dużo. Gdy jest tuż nad okrągłą, odejmujemy okrągłą, a potem jeszcze resztę.",
          przyklad: "$523-98=523-100+2=423+2=425$. A $523-102=523-100-2=421$.",
          uwaga: "Odjęliśmy o $2$ za dużo, więc te $2$ trzeba dodać z powrotem, a nie odjąć jeszcze raz.",
        },
        {
          nazwa: "Odejmowanie kilku liczb naraz",
          slownie: "Gdy odejmujemy po kolei dwie liczby, możemy odjąć od razu ich sumę. Szukamy więc takich liczb, które razem dają okrągłą liczbę.",
          tex: "845-38-62=845-(38+62)",
          przyklad: "$845-38-62=845-(38+62)=845-100=745$.",
          uwaga: "Nawias ma znaczenie: $20-(5+5)=10$, ale $20-5+5=20$.",
        },
        {
          nazwa: "Ta sama różnica",
          slownie: "Jeśli odjemną i odjemnik zwiększymy o tyle samo (albo obie zmniejszymy o tyle samo), różnica się nie zmieni. Dzięki temu możemy zamienić odjemnik na okrągłą liczbę.",
          przyklad: "$83-47=86-50=36$. Do obu liczb dodaliśmy $3$.",
          uwaga: "Zmieniamy obie liczby o tyle samo i w tę samą stronę: $86-47$ to już inny wynik niż $83-47$.",
        },
        {
          nazwa: "Odejmowanie przez uzupełnianie",
          slownie: "Zamiast odejmować, pytamy: „ile brakuje do większej liczby?”. Od odjemnika dochodzimy skokami przez najbliższe dziesiątki i setki do odjemnej, a skoki dodajemy.",
          przyklad: "$1000-638$: $638+2=640$, $640+360=1000$. Skoki: $2+360=362$.",
          uwaga: "Dodaj wszystkie skoki, także te małe. Dopiero ich suma jest wynikiem.",
        },
      ],
      jak: [
        "Sprawdź, czy odjemnik jest bliski okrągłej liczbie – wtedy odejmij okrągłą i popraw wynik.",
        "Przy kilku liczbach poszukaj takich, które razem dają okrągłą liczbę, i odejmij ich sumę.",
        "Gdy odjemna jest okrągła (na przykład $1000$), licz skokami „ile brakuje”.",
        "Sprawdź wynik dodawaniem: różnica plus odjemnik daje odjemną.",
      ],
      zadania: [
        {
          nr: "36",
          tresc: "Oblicz $752-199$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$553$", "$563$", "$653$", "$551$"],
          poprawna: 0,
        },
        {
          nr: "37",
          tresc: "Oblicz sprytnie $643-48-52$. **Wybierz właściwą odpowiedź.**",
          opcje: ["$647$", "$533$", "$543$", "$553$"],
          poprawna: 2,
        },
        {
          nr: "38",
          tresc: "Które działanie ma taką samą różnicę jak $83-47$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$86-47$", "$80-50$", "$83-50$", "$86-50$"],
          poprawna: 3,
        },
        {
          nr: "39",
          tresc: "Sprawdzamy sprytne odejmowanie. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$300-98=202$", litery: "PF", poprawna: 0 },
            { tekst: "$700-501=199$", litery: "PF", poprawna: 0 },
            { tekst: "$250-99=141$", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "40",
          tresc: "W pudełku było $1000$ klocków. Dzieci użyły $638$ klocków. Ile klocków zostało? **Wybierz właściwą odpowiedź.**",
          opcje: ["$372$", "$362$", "$462$", "$1638$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "41",
          punkty: 2,
          tresc: "Oblicz sprytnie: a) $2305-998$, b) $1500-475-25$. **Zapisz obliczenia.**",
          rozwiazanie: "a) $998=1000-2$. Odejmujemy $1000$: $2305-1000=1305$. Odjęliśmy o $2$ za dużo, więc dodajemy $2$: $1305+2=1307$.\n\nb) Odjemniki $475$ i $25$ razem dają okrągłą liczbę: $475+25=500$.\n\nOdejmujemy ich sumę: $1500-500=1000$.\n\nOdpowiedź: a) $1307$, b) $1000$.",
        },
        {
          nr: "42",
          punkty: 2,
          tresc: "W magazynie było $850$ kg ziemniaków. Rano sprzedano $396$ kg, a po południu $154$ kg. Ile kilogramów ziemniaków zostało? Oblicz sprytnie. **Zapisz obliczenia.**",
          rozwiazanie: "Obie sprzedane partie razem: $396+154=550$ (bo $396+4=400$, a $154-4=150$).\n\nZostało: $850-550=300$.\n\nOdpowiedź: Zostało $300$ kg ziemniaków.",
        },
      ],
      generatory: [
        {
          id: "sprytne-odejmowanie-zaokraglenie",
          nazwa: "Odejmij prawie okrągłą",
          opis: "Odejmij liczbę bliską pełnej setce albo tysiącowi: odejmij okrągłą i popraw wynik.",
          generuj(r) {
            const R = r.pick([100, 200, 300, 400, 500, 1000]);
            const d = r.int(1, 3);
            const pod = r.chance();
            const b = pod ? R - d : R + d;
            const a = R + r.int(30, R === 1000 ? 3000 : 800);
            const x = a - R;
            const w = a - b;
            return {
              tresc: `Oblicz w pamięci: $${t(a)} - ${b}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w },
              wynik: `$${t(w)}$`,
              rozwiazanie: [
                pod ? `$${b} = ${R} - ${d}$, czyli liczba $${b}$ jest o $${d}$ mniejsza od $${R}$.` : `$${b} = ${R} + ${d}$, czyli liczba $${b}$ jest o $${d}$ większa od $${R}$.`,
                `Odejmujemy okrągłą liczbę: $${t(a)} - ${R} = ${t(x)}$.`,
                pod ? `Odjęliśmy o $${d}$ za dużo, więc oddajemy: $${t(x)} + ${d} = ${t(w)}$.` : `Odjęliśmy o $${d}$ za mało, więc odejmujemy jeszcze $${d}$: $${t(x)} - ${d} = ${t(w)}$.`,
              ],
            };
          },
        },
        {
          id: "sprytne-odejmowanie-sposoby",
          nazwa: "Sprytne odejmowanie",
          opis: "Odejmij sumę, przesuń obie liczby o tyle samo albo uzupełnij do $1000$.",
          generuj(r) {
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const R = r.pick([100, 100, 1000]);
              let b;
              do {
                b = R === 100 ? r.int(11, 89) : r.int(101, 899);
              } while (b % 10 === 0);
              const c = R - b;
              const a = R + r.int(30, R === 100 ? 900 : 3000);
              const w = a - R;
              const nawias = r.chance();
              return {
                tresc: `Oblicz sprytnie: $${nawias ? `${t(a)} - (${b} + ${c})` : `${t(a)} - ${b} - ${c}`}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w },
                wynik: `$${t(w)}$`,
                rozwiazanie: [
                  nawias ? "Najpierw obliczamy nawias." : "Odejmując po kolei dwie liczby, możemy odjąć od razu ich sumę.",
                  `$${b} + ${c} = ${R}$.`,
                  `$${t(a)} - ${R} = ${t(w)}$.`,
                ],
              };
            }
            if (tryb === 1) {
              const R = r.pick([100, 200, 300, 500, 1000]);
              const d = r.int(1, 4);
              const b = R - d;
              const a = r.int(b + 30, b + 900);
              const w = a - b;
              return {
                tresc: `Oblicz $${t(a)} - ${b}$, zamieniając odjemnik na okrągłą liczbę (do obu liczb dodaj tyle samo).`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w },
                wynik: `$${t(w)}$`,
                rozwiazanie: [
                  `Dodajemy $${d}$ do obu liczb, bo wtedy różnica się nie zmieni.`,
                  `$${t(a)} + ${d} = ${t(a + d)}$ oraz $${b} + ${d} = ${R}$.`,
                  `$${t(a + d)} - ${R} = ${t(w)}$.`,
                ],
              };
            }
            let b;
            do {
              b = r.int(101, 899);
            } while (b % 10 === 0);
            const u = 10 - (b % 10);
            const b1 = b + u;
            const h = (100 - (b1 % 100)) % 100;
            const b2 = b1 + h;
            const k = 1000 - b2;
            const w = 1000 - b;
            const kroki = [`Do pełnej dziesiątki: $${b} + ${u} = ${b1}$.`];
            if (h > 0) kroki.push(`Do pełnej setki: $${b1} + ${h} = ${b2}$.`);
            kroki.push(`Do $1000$: $${b2} + ${k} = 1000$.`);
            kroki.push(`Dodajemy skoki: $${[u, h, k].filter((x) => x > 0).join(" + ")} = ${w}$.`);
            return {
              tresc: `Oblicz $1000 - ${b}$, licząc, ile brakuje do $1000$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w },
              wynik: `$${w}$`,
              rozwiazanie: kroki,
            };
          },
        },
      ],
    },
  ],
};
