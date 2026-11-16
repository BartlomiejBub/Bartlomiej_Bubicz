// Klasa 6 (szkoła podstawowa) · rozdział VII „Matematyka i my” – Matematyka z kluczem 6 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";   // tylko pomocnicze z wspolne.js

// --- Pomocnicze (tylko dla tego pliku)

/** Poprawna forma rzeczownika po liczbie: 1 dzień, 2 dni, 5 dni. */
function mn(n, a, b, c) {
  const m10 = n % 10, m100 = n % 100;
  if (n === 1) return a;
  return m10 >= 2 && m10 <= 4 && !(m100 >= 12 && m100 <= 14) ? b : c;
}
const lw = (n, a, b, c) => `${n} ${mn(n, a, b, c)}`;

/** Liczba (Q) z przecinkiem dziesiętnym do zapisu w $…$: 2{,}5, 12, 0{,}75. */
function zap(x) {
  const v = Q.z(x);
  let k = 0;
  while (k <= 4 && 10 ** k % v.d !== 0) k++;
  if (k > 4) throw new Error(`Liczba nie ma skończonego rozwinięcia: ${v}`);
  const n = (v.n * 10 ** k) / v.d;
  const s = String(Math.abs(n)).padStart(k + 1, "0");
  const cal = k ? s.slice(0, -k) : s;
  const ulam = k ? s.slice(-k) : "";
  return `${n < 0 ? "-" : ""}${ulam ? `${cal}{,}${ulam}` : cal}`;
}

/** Liczba całkowita z odstępem tysięcy tylko od 5 cyfr: 20000 -> "20\,000", 2500 -> "2500". */
const fmt = (n) => (Math.abs(n) >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : String(n));

/** Godziny w bierniku po „w” / „przez”: 1 godzinę, 2 godziny, 5 godzin, 2,5 godziny. */
const hs = (t) => (t.d === 1 ? `$${t.n}$ ${mn(t.n, "godzinę", "godziny", "godzin")}` : `$${zap(t)}$ godziny`);
/** Godziny w dopełniaczu po „w ciągu”: 1 godziny, 2 godzin, 2,5 godziny. */
const hg = (t) => (t.d === 1 ? `$${t.n}$ ${t.n === 1 ? "godziny" : "godzin"}` : `$${zap(t)}$ godziny`);
/** Czas w godzinach (połówki) jako „2 h 30 min”. */
const hmin = (t) => {
  const c = Math.floor(t.n / t.d);
  return t.d === 1 ? `$${c}$ h` : `$${c}$ h $30$ min`;
};

const DNI = [
  { m: "poniedziałek", dop: "poniedziałku", w: "w poniedziałek" },
  { m: "wtorek", dop: "wtorku", w: "we wtorek" },
  { m: "środa", dop: "środy", w: "w środę" },
  { m: "czwartek", dop: "czwartku", w: "w czwartek" },
  { m: "piątek", dop: "piątku", w: "w piątek" },
];

export default {
  tematy: [
    // ------------------------------------------------------------------------------------------------
    {
      id: "tabele-diagramy",
      nazwa: "Tabele, diagramy i wykresy",
      sciaga: [
        {
          nazwa: "Odczytywanie tabeli",
          slownie: "Tabela ma wiersze (poziome) i kolumny (pionowe). Żeby znaleźć liczbę, znajdź właściwy wiersz i kolumnę. Liczba stoi tam, gdzie się spotykają.",
          przyklad: "W klasie 6a jest $12$ chłopców i $14$ dziewcząt, a w klasie 6b $13$ chłopców i $11$ dziewcząt. Uczniów w 6a jest $12 + 14 = 26$. Dziewcząt w obu klasach razem jest $14 + 11 = 25$.",
          uwaga: "Przed liczeniem sprawdź, co jest w kolumnie: liczba sztuk, cena czy czas. Nie dodawaj liczb, które znaczą różne rzeczy.",
        },
        {
          nazwa: "Diagram słupkowy",
          slownie: "Wysokość słupka pokazuje liczbę. Odczytujemy ją z osi pionowej. Im wyższy słupek, tym większa liczba. Żeby sprawdzić, o ile jedna liczba jest większa od drugiej, odejmujemy wysokości słupków.",
          przyklad: "Słupek dla poniedziałku sięga do $12$, a dla wtorku do $8$. W poniedziałek było o $12 - 8 = 4$ więcej niż we wtorek. Razem w oba dni: $12 + 8 = 20$.",
          uwaga: "Nie liczymy słupków, tylko odczytujemy ich wysokość. Zobacz, ile oznacza jedna kreska na osi: czasem $1$, a czasem $2$ albo $5$.",
        },
        {
          nazwa: "Wykres liniowy",
          slownie: "Wykres liniowy pokazuje, jak coś zmienia się w czasie. Punkty są połączone linią. Gdy linia idzie w górę, wartość rośnie. Gdy idzie w dół, wartość maleje.",
          przyklad: "Temperatura: o $8{:}00$ było $6$°C, o $12{:}00$ było $14$°C, o $16{:}00$ było $11$°C. Od $8{:}00$ do $12{:}00$ wzrost o $14 - 6 = 8$ stopni. Od $12{:}00$ do $16{:}00$ spadek o $14 - 11 = 3$ stopnie.",
          uwaga: "Dokładne dane są w punktach wykresu. Linia między punktami tylko je łączy i nie mówi, co było pomiędzy pomiarami.",
        },
        {
          nazwa: "Co policzyć z danych",
          slownie: "Z danych możemy policzyć sumę (dodawanie), różnicę „o ile więcej” (odejmowanie), „ile razy więcej” (dzielenie) i średnią arytmetyczną: suma podzielona przez liczbę danych.",
          tex: "\\text{średnia}=\\frac{\\text{suma}}{\\text{ile jest liczb}}",
          przyklad: "W trzech dniach sprzedano $12$, $8$ i $10$ bułek. Średnia: $(12 + 8 + 10) : 3 = 30 : 3 = 10$ bułek dziennie. Dalej: $12$ jest $3$ razy więcej niż $4$, bo $12 : 4 = 3$.",
          uwaga: "„O ile więcej” liczymy odejmowaniem, a „ile razy więcej” dzieleniem. To nie jest to samo: $12$ jest o $8$ więcej niż $4$, ale $3$ razy więcej.",
        },
      ],
      jak: [
        "Przeczytaj, co przedstawia tabela albo diagram, i w jakich jednostkach są dane.",
        "Odczytaj z tabeli lub diagramu tylko te liczby, o które pytają w zadaniu. Wypisz je.",
        "Dobierz działanie: razem to dodawanie, „o ile więcej” to odejmowanie, „ile razy więcej” to dzielenie.",
        "Przy wykresie liniowym pilnuj, czy wartość rośnie, czy maleje. Zapisz odpowiedź z jednostką.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "W szkolnej bibliotece wypożyczono książek: w poniedziałek $18$, we wtorek $25$, w środę $14$, w czwartek $21$, w piątek $32$. Ile książek wypożyczono razem od wtorku do czwartku? **Wybierz właściwą odpowiedź.**",
          opcje: ["$39$", "$60$", "$78$", "$110$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Diagram słupkowy pokazuje, ilu uczniów przyszło na zajęcia dodatkowe. Słupek dla klasy 6a sięga do $24$, dla 6b do $18$, dla 6c do $21$, a dla 6d do $15$. O ile więcej uczniów przyszło z klasy 6a niż z klasy 6d? **Wybierz właściwą odpowiedź.**",
          opcje: ["$39$", "$6$", "$3$", "$9$"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "Wykres liniowy pokazuje temperaturę powietrza w ciągu dnia: o $6{:}00$ było $8$°C, o $9{:}00$ było $11$°C, o $12{:}00$ było $17$°C, o $15{:}00$ było $15$°C, o $18{:}00$ było $10$°C. O ile stopni wzrosła temperatura od $6{:}00$ do $12{:}00$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$", "$6$", "$3$", "$25$"],
          poprawna: 0,
        },
        {
          nr: "4",
          tresc: "W pięciu meczach drużyna strzeliła kolejno $2$, $0$, $3$, $1$ i $4$ bramki. Ile bramek strzelała średnio w jednym meczu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10$", "$2{,}5$", "$2$", "$4$"],
          poprawna: 2,
        },
        {
          nr: "5",
          tresc: "Tabela pokazuje liczbę sprzedanych lodów: w poniedziałek $40$, we wtorek $35$, w środę $55$, w czwartek $20$. Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "W środę sprzedano o $20$ lodów więcej niż w poniedziałek.", litery: "PF", poprawna: 1 },
            { tekst: "W czwartek sprzedano $2$ razy mniej lodów niż w poniedziałek.", litery: "PF", poprawna: 0 },
            { tekst: "Przez te cztery dni sprzedano razem $140$ lodów.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Tabela pokazuje, ilu uczniów jedzie na wycieczkę: klasa 6a – $26$, klasa 6b – $22$, klasa 6c – $28$, klasa 6d – $24$. Jeden autokar ma $45$ miejsc. Ilu uczniów jedzie razem? Ile autokarów trzeba zamówić? **Zapisz obliczenia.**",
          rozwiazanie: "Dodajemy liczby uczniów z tabeli: $26 + 22 + 28 + 24 = 100$.\n\nJeden autokar zabiera $45$ osób. Dwa autokary zabiorą $2 \\cdot 45 = 90$ osób, a to za mało, bo jedzie $100$ uczniów.\n\nTrzy autokary zabiorą $3 \\cdot 45 = 135$ osób, czyli wystarczy.\n\nOdpowiedź: Na wycieczkę jedzie $100$ uczniów. Trzeba zamówić $3$ autokary.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Diagram słupkowy pokazuje, ile kilometrów Ola przejechała na rowerze w kolejnych dniach: słupek dla poniedziałku sięga do $12$, dla wtorku do $8$, dla środy do $14$, dla czwartku do $10$, dla piątku do $25$, a dla soboty do $21$. Ile kilometrów Ola przejechała w tych sześciu dniach? Ile średnio dziennie? O ile więcej przejechała w piątek niż we wtorek? **Zapisz obliczenia.**",
          rozwiazanie: "Dodajemy wysokości wszystkich słupków: $12 + 8 + 14 + 10 + 25 + 21 = 90$ km.\n\nDni było $6$, więc średnia to $90 : 6 = 15$ km dziennie.\n\nW piątek Ola przejechała $25$ km, a we wtorek $8$ km. Różnica: $25 - 8 = 17$ km.\n\nOdpowiedź: Razem Ola przejechała $90$ km, średnio $15$ km dziennie. W piątek przejechała o $17$ km więcej niż we wtorek.",
        },
      ],
      generatory: [
        {
          id: "odczyt-tabeli",
          nazwa: "Odczyt z tabeli",
          opis: "Odczytaj liczby z tabeli albo z opisu diagramu słupkowego i policz sumę, różnicę albo wskaż największą wartość.",
          generuj(r) {
            const DANE = [
              { co: "wypożyczonych książek", n: "książek", cz: "wypożyczono", lo: 8, hi: 45 },
              { co: "sprzedanych bułek", n: "bułek", cz: "sprzedano", lo: 20, hi: 90 },
              { co: "sprzedanych biletów do kina", n: "biletów", cz: "sprzedano", lo: 15, hi: 80 },
              { co: "uczniów jedzących obiad w stołówce", n: "uczniów", cz: "zjadło obiad", lo: 60, hi: 140 },
            ];
            const d = r.pick(DANE);
            let w;
            do {
              w = Array.from({ length: 5 }, () => r.int(d.lo, d.hi));
            } while (new Set(w).size < 5);
            const dane = r.chance(0.5)
              ? `Tabela pokazuje liczbę ${d.co} w kolejnych dniach: ${DNI.map((x, i) => `${x.m} – $${w[i]}$`).join(", ")}.`
              : `Diagram słupkowy pokazuje liczbę ${d.co} w kolejnych dniach. Słupek ${DNI.map((x, i) => (i === 0 ? `dla ${x.dop} sięga do $${w[i]}$` : `dla ${x.dop} do $${w[i]}$`)).join(", ")}.`;
            const typ = r.int(0, 3);
            if (typ === 3) {
              const imax = w.indexOf(Math.max(...w));
              return {
                tresc: `${dane} W którym dniu ${d.cz} najwięcej ${d.n}?`,
                pola: [{ id: "d", typ: "wybor", etykieta: "Dzień", opcje: DNI.map((x) => x.m) }],
                odpowiedz: { d: imax },
                wynik: DNI[imax].m,
                rozwiazanie: [
                  `Odczytujemy wszystkie pięć liczb: $${w.join("$, $")}$.`,
                  `Największa z nich to $${w[imax]}$, a odpowiada jej ${DNI[imax].m}.`,
                ],
              };
            }
            if (typ === 2) {
              const s = w.reduce((a, b) => a + b, 0);
              return {
                tresc: `${dane} Ile ${d.n} ${d.cz} w ciągu tych pięciu dni?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Liczba ${d.n}` }],
                odpowiedz: { w: s },
                wynik: `$${s}$`,
                rozwiazanie: [
                  `Odczytujemy wszystkie pięć liczb i dodajemy je.`,
                  `Razem: $${w.join(" + ")} = ${s}$.`,
                ],
              };
            }
            const i = r.int(0, 4);
            let j;
            do { j = r.int(0, 4); } while (j === i);
            if (typ === 0) {
              const [a, b] = i < j ? [i, j] : [j, i];
              const s = w[a] + w[b];
              return {
                tresc: `${dane} Ile ${d.n} ${d.cz} razem ${DNI[a].w} i ${DNI[b].w}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Liczba ${d.n}` }],
                odpowiedz: { w: s },
                wynik: `$${s}$`,
                rozwiazanie: [
                  `Odczytujemy liczby: ${DNI[a].w} $${w[a]}$, ${DNI[b].w} $${w[b]}$.`,
                  `Razem: $${w[a]} + ${w[b]} = ${s}$.`,
                ],
              };
            }
            const [wi, ni] = w[i] > w[j] ? [i, j] : [j, i];
            const roz = w[wi] - w[ni];
            return {
              tresc: `${dane} O ile więcej ${d.n} ${d.cz} ${DNI[wi].w} niż ${DNI[ni].w}?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `O ile więcej` }],
              odpowiedz: { w: roz },
              wynik: `$${roz}$`,
              rozwiazanie: [
                `Odczytujemy liczby: ${DNI[wi].w} $${w[wi]}$, ${DNI[ni].w} $${w[ni]}$.`,
                `„O ile więcej” liczymy odejmowaniem: $${w[wi]} - ${w[ni]} = ${roz}$.`,
              ],
            };
          },
        },
        {
          id: "wykres-liniowy",
          nazwa: "Wykres liniowy",
          opis: "Odczytaj z opisu wykresu liniowego temperaturę o różnych godzinach: różnicę dwóch pomiarów albo godzinę najwyższej temperatury.",
          generuj(r) {
            const GODZ = [6, 9, 12, 15, 18];
            let t;
            do {
              t = [r.int(4, 12)];
              for (let k = 1; k < 5; k++) t.push(Math.min(28, Math.max(3, t[k - 1] + r.int(-5, 7))));
            } while (new Set(t).size < 5);
            const dane = `Wykres liniowy pokazuje temperaturę powietrza w ciągu dnia. Punkt dla godziny $6{:}00$ leży na wysokości $${t[0]}$°C, ${GODZ.slice(1).map((g, k) => `dla $${g}{:}00$ na wysokości $${t[k + 1]}$°C`).join(", ")}.`;
            if (r.chance(0.35)) {
              const imax = t.indexOf(Math.max(...t));
              return {
                tresc: `${dane} O której godzinie była najwyższa temperatura?`,
                pola: [{ id: "g", typ: "wybor", etykieta: "Godzina", opcje: GODZ.map((g) => `$${g}{:}00$`) }],
                odpowiedz: { g: imax },
                wynik: `$${GODZ[imax]}{:}00$`,
                rozwiazanie: [
                  `Szukamy najwyższego punktu wykresu: to $${t[imax]}$°C.`,
                  `Ten punkt odpowiada godzinie $${GODZ[imax]}{:}00$.`,
                ],
              };
            }
            const i = r.int(0, 3);
            const j = r.int(i + 1, 4);
            const mx = Math.max(t[i], t[j]), mi = Math.min(t[i], t[j]);
            const roz = mx - mi;
            const ruch = t[j] > t[i] ? "wzrosła" : "spadła";
            return {
              tresc: `${dane} O ile stopni ${ruch} temperatura od godziny $${GODZ[i]}{:}00$ do $${GODZ[j]}{:}00$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba stopni" }],
              odpowiedz: { w: roz },
              wynik: `$${roz}$ ${mn(roz, "stopień", "stopnie", "stopni")}`,
              rozwiazanie: [
                `Odczytujemy temperatury: o $${GODZ[i]}{:}00$ było $${t[i]}$°C, o $${GODZ[j]}{:}00$ było $${t[j]}$°C.`,
                `Od większej odejmujemy mniejszą: $${mx} - ${mi} = ${roz}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "procenty",
      nazwa: "Procenty",
      sciaga: [
        {
          nazwa: "Procent – setna część",
          slownie: "Jeden procent to jedna setna całości. Całość to $100\\%$. Znak $\\%$ czytamy „procent”.",
          tex: "1\\%=\\frac{1}{100}=0{,}01\\qquad 100\\%=1",
          przyklad: "Tabliczkę czekolady dzielimy na $100$ równych kawałków. Jeden kawałek to $1\\%$ tabliczki, a $25$ kawałków to $25\\%$ tabliczki.",
          uwaga: "Procenty zawsze odnoszą się do jakiejś całości. $50\\%$ klasy to inna liczba osób niż $50\\%$ całej szkoły.",
        },
        {
          nazwa: "Procent jako ułamek",
          slownie: "Liczba procent to licznik ułamka, a w mianowniku jest $100$. Takie ułamki często da się skrócić. Warto znać kilka z nich na pamięć.",
          tex: "50\\%=\\frac{1}{2}\\qquad 25\\%=\\frac{1}{4}\\qquad 10\\%=\\frac{1}{10}\\qquad 75\\%=\\frac{3}{4}",
          przyklad: "$35\\% = \\frac{35}{100} = \\frac{7}{20}$ (skracamy przez $5$). Zapis dziesiętny: $35\\% = 0{,}35$. Dalej: $20\\% = \\frac{20}{100} = \\frac{1}{5}$.",
          uwaga: "$5\\%$ to $0{,}05$, a nie $0{,}5$. Liczba $0{,}5$ to $50\\%$.",
        },
        {
          nazwa: "Ułamek jako procent",
          slownie: "Rozszerz albo skróć ułamek tak, żeby w mianowniku było $100$. Licznik jest wtedy liczbą procent. Ułamek dziesiętny zamieniamy na setne części.",
          tex: "\\frac{3}{20}=\\frac{15}{100}=15\\%",
          przyklad: "$\\frac{7}{25} = \\frac{28}{100} = 28\\%$, bo rozszerzamy przez $4$. Ułamek dziesiętny: $0{,}6 = 0{,}60 = \\frac{60}{100} = 60\\%$.",
          uwaga: "$0{,}6$ to $60\\%$, a nie $6\\%$. Najpierw zapisz $0{,}6$ jako $0{,}60$.",
        },
        {
          nazwa: "Procent figury lub grupy",
          slownie: "Zapisz, jaką część całości stanowi grupa: liczba elementów podzielona przez liczbę wszystkich. Potem zamień ułamek na ułamek o mianowniku $100$.",
          tex: "\\frac{\\text{część}}{\\text{całość}}=\\frac{?}{100}",
          przyklad: "W klasie jest $20$ uczniów, a $7$ z nich ma psa. To $\\frac{7}{20} = \\frac{35}{100} = 35\\%$ klasy. Na figurze z $100$ kratek zamalowano $30$: to $30\\%$.",
          uwaga: "Całość musi być podzielona na równe części. Do całości zaliczamy wszystkich, a nie tylko tych, o których pytamy.",
        },
        {
          nazwa: "Procent liczby – proste przypadki",
          slownie: "Proste procenty liczymy jak ułamki: $50\\%$ to połowa, $25\\%$ to ćwierć, $10\\%$ to dziesiąta część, $20\\%$ to piąta część, $1\\%$ to setna część.",
          tex: "50\\%\\to :2\\qquad 25\\%\\to :4\\qquad 10\\%\\to :10\\qquad 1\\%\\to :100",
          przyklad: "$25\\%$ z $60$ zł to $60 : 4 = 15$ zł. A $75\\%$ z $40$: ćwierć to $40 : 4 = 10$, więc trzy ćwiartki to $3 \\cdot 10 = 30$.",
          uwaga: "$10\\%$ z $80$ to $80 : 10 = 8$, a nie $80 \\cdot 10$. Procent liczby jest mniejszy od liczby, gdy procent jest mniejszy niż $100\\%$.",
        },
      ],
      jak: [
        "Pamiętaj: $p\\%$ to ułamek $\\frac{p}{100}$.",
        "Ułamek na procent: rozszerz albo skróć do mianownika $100$. Licznik to liczba procent.",
        "Procent grupy: zapisz ułamek (część podzielona przez całość) i zamień go na ułamek o mianowniku $100$.",
        "Procent liczby: $50\\%$ to dzielenie przez $2$, $25\\%$ przez $4$, $10\\%$ przez $10$, $20\\%$ przez $5$, $1\\%$ przez $100$.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Który ułamek zwykły jest równy $40\\%$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{4}$", "$\\frac{1}{40}$", "$\\frac{4}{5}$", "$\\frac{2}{5}$"],
          poprawna: 3,
        },
        {
          nr: "9",
          tresc: "Który ułamek dziesiętny jest równy $8\\%$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}8$", "$0{,}08$", "$0{,}008$", "$8$"],
          poprawna: 1,
        },
        {
          nr: "10",
          tresc: "Prostokąt podzielono na $20$ równych kratek. Zamalowano $6$ kratek. Jaki procent prostokąta jest zamalowany? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6\\%$", "$14\\%$", "$30\\%$", "$20\\%$"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "Rower kosztuje $80$ zł. Ile złotych to $25\\%$ tej kwoty? **Wybierz właściwą odpowiedź.**",
          opcje: ["$20$ zł", "$55$ zł", "$25$ zł", "$2000$ zł"],
          poprawna: 0,
        },
        {
          nr: "12",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$75\\% = \\frac{3}{4}$", litery: "PF", poprawna: 0 },
            { tekst: "$0{,}3 = 3\\%$", litery: "PF", poprawna: 1 },
            { tekst: "$\\frac{9}{20} = 45\\%$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "W klasie jest $25$ uczniów. Do szkoły jeździ rowerem $8$ uczniów, a pieszo przychodzi $15$ uczniów. Jaki procent klasy jeździ rowerem? Jaki procent klasy przychodzi pieszo? **Zapisz obliczenia.**",
          rozwiazanie: "Rowerem jeździ $\\frac{8}{25}$ klasy. Rozszerzamy ułamek przez $4$: $\\frac{8}{25} = \\frac{32}{100} = 32\\%$.\n\nPieszo przychodzi $\\frac{15}{25}$ klasy: $\\frac{15}{25} = \\frac{60}{100} = 60\\%$.\n\nOdpowiedź: Rowerem jeździ $32\\%$ klasy, a pieszo przychodzi $60\\%$ klasy.",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "Książka kosztuje $60$ zł. Ola ma już $25\\%$ ceny książki, a Kuba $10\\%$ tej ceny. Ile złotych mają razem? Ile procent ceny książki mają razem? **Zapisz obliczenia.**",
          rozwiazanie: "Ola ma $25\\%$ z $60$ zł, czyli ćwierć: $60 : 4 = 15$ zł.\n\nKuba ma $10\\%$ z $60$ zł: $60 : 10 = 6$ zł.\n\nRazem: $15 + 6 = 21$ zł. W procentach: $25\\% + 10\\% = 35\\%$.\n\nSprawdzenie: $\\frac{21}{60} = \\frac{7}{20} = \\frac{35}{100} = 35\\%$.\n\nOdpowiedź: Razem mają $21$ zł, czyli $35\\%$ ceny książki.",
        },
      ],
      generatory: [
        {
          id: "procent-ulamek",
          nazwa: "Procent i ułamek",
          opis: "Zamień procent na ułamek dziesiętny, ułamek na procent albo oblicz, jaki procent całości stanowi część (uczniowie, kratki, kwiaty).",
          generuj(r) {
            const typ = r.int(0, 3);
            if (typ === 0) {
              const p = r.int(1, 99);
              const a = q(p, 100);
              return {
                tresc: r.pick([`Zapisz $${p}\\%$ w postaci ułamka dziesiętnego.`, `Jaki ułamek dziesiętny jest równy $${p}\\%$?`]),
                pola: [{ id: "w", typ: "liczba", etykieta: "Ułamek dziesiętny" }],
                odpowiedz: { w: a },
                wynik: `$${zap(a)}$`,
                rozwiazanie: [
                  `Procent to setna część: $${p}\\% = \\frac{${p}}{100}$.`,
                  `Zapisujemy dziesiętnie: $\\frac{${p}}{100} = ${zap(a)}$.`,
                ],
              };
            }
            if (typ === 1) {
              const p = r.int(1, 99);
              const x = q(p, 100);
              return {
                tresc: `Zapisz ułamek $${zap(x)}$ jako procent. Ile to procent?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba procent" }],
                odpowiedz: { w: p },
                wynik: `$${p}\\%$`,
                rozwiazanie: [
                  `Zapisujemy ułamek dziesiętny jako setne części: $${zap(x)} = \\frac{${p}}{100}$.`,
                  `Licznik to liczba procent: $\\frac{${p}}{100} = ${p}\\%$.`,
                ],
              };
            }
            if (typ === 2) {
              const mian = r.pick([2, 4, 5, 10, 20, 25, 50]);
              const lic = r.int(1, mian - 1);
              const k = 100 / mian;
              const p = lic * k;
              return {
                tresc: `Zapisz ułamek $\\frac{${lic}}{${mian}}$ jako procent. Ile to procent?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba procent" }],
                odpowiedz: { w: p },
                wynik: `$${p}\\%$`,
                rozwiazanie: [
                  `Rozszerzamy ułamek tak, żeby w mianowniku było $100$: $${mian} \\cdot ${k} = 100$.`,
                  `$\\frac{${lic}}{${mian}} = \\frac{${lic} \\cdot ${k}}{${mian} \\cdot ${k}} = \\frac{${p}}{100} = ${p}\\%$.`,
                ],
              };
            }
            const N = r.pick([4, 5, 10, 20, 25, 50]);
            const k = r.int(1, N - 1);
            const m = 100 / N;
            const p = k * m;
            const tresc = r.pick([
              `W klasie jest $${N}$ uczniów. $${k}$ ${mn(k, "uczeń", "uczniów", "uczniów")} ma psa. Jaki procent klasy stanowią uczniowie z psem?`,
              `Prostokąt podzielono na $${N}$ równych kratek. Zamalowano $${k}$ ${mn(k, "kratkę", "kratki", "kratek")}. Jaki procent prostokąta jest zamalowany?`,
              `W bukiecie jest $${N}$ kwiatów, w tym $${k}$ ${mn(k, "róża", "róże", "róż")}. Jaki procent bukietu stanowią róże?`,
            ]);
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba procent" }],
              odpowiedz: { w: p },
              wynik: `$${p}\\%$`,
              rozwiazanie: [
                `Część całości zapisujemy ułamkiem: $\\frac{${k}}{${N}}$.`,
                `Rozszerzamy do mianownika $100$ (mnożymy przez $${m}$): $\\frac{${k}}{${N}} = \\frac{${p}}{100}$.`,
                `To $${p}\\%$.`,
              ],
            };
          },
        },
        {
          id: "procent-liczby",
          nazwa: "Procent liczby",
          opis: "Oblicz proste procenty liczby: $50\\%$, $25\\%$, $10\\%$, $20\\%$, $75\\%$ albo $1\\%$.",
          generuj(r) {
            const p = r.pick([50, 25, 10, 20, 75, 1]);
            const N = { 50: () => 2 * r.int(5, 100), 25: () => 4 * r.int(3, 50), 10: () => 10 * r.int(2, 40), 20: () => 5 * r.int(3, 60), 75: () => 4 * r.int(3, 40), 1: () => 100 * r.int(1, 9) }[p]();
            const w = (N * p) / 100;
            let c = r.int(0, 4);
            if (c === 3 && (N > 200 || p === 1)) c = 1;
            if (c === 2 && N < 100) c = 4;   // szkoła ma co najmniej 100 uczniów
            if (c === 2 && N > 900) c = 0;
            const KONT = [
              { t: `Oblicz $${p}\\%$ liczby $${N}$.`, wy: `$${w}$`, et: "Wynik" },
              { t: `Książka kosztuje $${N}$ zł. Ile złotych to $${p}\\%$ jej ceny?`, wy: `$${w}$ zł`, et: "Liczba złotych" },
              { t: `W szkole jest $${N}$ uczniów. $${p}\\%$ uczniów jedzie na wycieczkę. Ilu uczniów jedzie na wycieczkę?`, wy: `$${w}$ ${mn(w, "uczeń", "uczniów", "uczniów")}`, et: "Liczba uczniów" },
              { t: `Trasa rajdu rowerowego ma $${N}$ km. Uczestnicy pokonali już $${p}\\%$ trasy. Ile kilometrów pokonali?`, wy: `$${w}$ km`, et: "Liczba kilometrów" },
              { t: `W sadzie rośnie $${N}$ drzew. $${p}\\%$ z nich to jabłonie. Ile jabłoni rośnie w sadzie?`, wy: `$${w}$ ${mn(w, "jabłoń", "jabłonie", "jabłoni")}`, et: "Liczba jabłoni" },
            ][c];
            const kroki = {
              50: [`$50\\% = \\frac{1}{2}$, czyli połowa. Dzielimy przez $2$.`, `$${N} : 2 = ${w}$.`],
              25: [`$25\\% = \\frac{1}{4}$, czyli ćwierć. Dzielimy przez $4$.`, `$${N} : 4 = ${w}$.`],
              10: [`$10\\% = \\frac{1}{10}$, czyli dziesiąta część. Dzielimy przez $10$.`, `$${N} : 10 = ${w}$.`],
              20: [`$20\\% = \\frac{1}{5}$, czyli piąta część. Dzielimy przez $5$.`, `$${N} : 5 = ${w}$.`],
              75: [`$75\\% = \\frac{3}{4}$. Najpierw liczymy ćwierć: $${N} : 4 = ${N / 4}$.`, `Trzy ćwiartki to $3 \\cdot ${N / 4} = ${w}$.`],
              1: [`$1\\% = \\frac{1}{100}$, czyli setna część. Dzielimy przez $100$.`, `$${N} : 100 = ${w}$.`],
            }[p];
            return {
              tresc: KONT.t,
              pola: [{ id: "w", typ: "liczba", etykieta: KONT.et }],
              odpowiedz: { w },
              wynik: KONT.wy,
              rozwiazanie: kroki,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "predkosc-droga-czas",
      nazwa: "Prędkość, droga, czas",
      sciaga: [
        {
          nazwa: "Prędkość",
          slownie: "Prędkość mówi, ile drogi pokonujemy w jednostce czasu. Prędkość $60$ km/h oznacza $60$ km w każdej godzinie. Liczymy ją, dzieląc drogę przez czas.",
          tex: "v=\\frac{s}{t}",
          litery: "$v$ – prędkość, $s$ – droga, $t$ – czas.",
          przyklad: "Samochód przejechał $150$ km w $3$ h. Prędkość to $150 : 3 = 50$ km/h. A uczeń przebiegł $60$ m w $12$ s, czyli $60 : 12 = 5$ m/s.",
          uwaga: "Kilometry i godziny dają km/h, a metry i sekundy dają m/s. Nie mieszaj jednostek w jednym działaniu.",
        },
        {
          nazwa: "Droga",
          slownie: "Gdy znamy prędkość i czas, drogę liczymy mnożeniem. Pojazd jadący stale z tą samą prędkością przejeżdża w każdej godzinie tyle samo kilometrów.",
          tex: "s=v\\cdot t",
          przyklad: "Rowerzysta jedzie $15$ km/h przez $2$ h: $s = 15 \\cdot 2 = 30$ km. Turysta idzie $4$ km/h przez $3$ h: $4 \\cdot 3 = 12$ km.",
          uwaga: "Nie dodawaj prędkości do czasu. Drogę dostajemy, mnożąc prędkość przez czas.",
        },
        {
          nazwa: "Czas",
          slownie: "Gdy znamy drogę i prędkość, czas liczymy dzieleniem: ile razy prędkość „mieści się” w drodze. Wynik w godzinach często zamieniamy na godziny i minuty.",
          tex: "t=\\frac{s}{v}",
          przyklad: "Droga $90$ km, prędkość $60$ km/h: $t = 90 : 60 = 1{,}5$ h. To $1$ h $30$ min.",
          uwaga: "$1{,}5$ h to $1$ h $30$ min, a nie $1$ h $50$ min. Połowa godziny to $30$ minut.",
        },
        {
          nazwa: "Godziny i minuty",
          slownie: "Godzina ma $60$ minut. Gdy prędkość jest w km/h, a czas podany w minutach, zamień minuty na części godziny.",
          tex: "30\\text{ min}=0{,}5\\text{ h}\\qquad 15\\text{ min}=0{,}25\\text{ h}\\qquad 45\\text{ min}=0{,}75\\text{ h}",
          przyklad: "$2$ h $45$ min $= 2{,}75$ h. A $1{,}5$ h $= 1$ h $30$ min. Dalej: $20$ min to $\\frac{20}{60} = \\frac{1}{3}$ h, więc w $20$ min z prędkością $60$ km/h pokonamy $60 \\cdot \\frac{1}{3} = 20$ km.",
          uwaga: "$1{,}25$ h to $1$ h $15$ min, a nie $1$ h $25$ min. Część po przecinku mnożymy przez $60$.",
        },
        {
          nazwa: "Prędkość średnia",
          slownie: "Gdy podróż ma kilka części, dodajemy wszystkie drogi i wszystkie czasy. Potem całą drogę dzielimy przez cały czas.",
          tex: "v_{\\text{śr}}=\\frac{\\text{cała droga}}{\\text{cały czas}}",
          przyklad: "Najpierw $60$ km w $1$ h, potem $90$ km w $2$ h. Razem $150$ km w $3$ h, więc $v_{\\text{śr}} = 150 : 3 = 50$ km/h.",
          uwaga: "Prędkość średnia to nie średnia z prędkości. Tu byłoby $(60 + 45) : 2 = 52{,}5$ km/h, a to zły wynik, bo czasy są różne.",
        },
      ],
      jak: [
        "Zapisz, co jest dane ($v$, $s$ albo $t$) i czego szukasz.",
        "Sprawdź jednostki. Minuty zamień na godziny, jeśli prędkość jest w km/h.",
        "Wybierz wzór: $s = v \\cdot t$, $v = s : t$ albo $t = s : v$.",
        "Podstaw liczby, oblicz i zapisz wynik z jednostką. Czas w godzinach możesz zamienić na godziny i minuty.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Samochód przejechał $180$ km w ciągu $3$ godzin. Jaka była jego średnia prędkość? **Wybierz właściwą odpowiedź.**",
          opcje: ["$540$ km/h", "$183$ km/h", "$60$ km/h", "$30$ km/h"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "Rowerzysta jedzie ze stałą prędkością $18$ km/h. Ile kilometrów przejedzie w ciągu $2{,}5$ godziny? **Wybierz właściwą odpowiedź.**",
          opcje: ["$20{,}5$ km", "$7{,}2$ km", "$36$ km", "$45$ km"],
          poprawna: 3,
        },
        {
          nr: "17",
          tresc: "Rowerzysta jedzie ze stałą prędkością $12$ km/h. Ile czasu potrzebuje na przejechanie $30$ km? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$ h $30$ min", "$2$ h $50$ min", "$2$ h $5$ min", "$360$ h"],
          poprawna: 0,
        },
        {
          nr: "18",
          tresc: "Biegaczka biegnie ze stałą prędkością $8$ km/h. Ile kilometrów pokona w ciągu $15$ minut? **Wybierz właściwą odpowiedź.**",
          opcje: ["$120$ km", "$2$ km", "$23$ km", "$4$ km"],
          poprawna: 1,
        },
        {
          nr: "19",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Pociąg jadący z prędkością $80$ km/h przejedzie w $30$ minut $40$ km.", litery: "PF", poprawna: 0 },
            { tekst: "Czas $2{,}5$ h to $2$ h $50$ min.", litery: "PF", poprawna: 1 },
            { tekst: "Uczeń, który przebiegł $50$ m w $10$ s, miał prędkość $5$ m/s.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Pani Ewa jedzie samochodem do miasta oddalonego o $135$ km. Jedzie ze średnią prędkością $90$ km/h i wyjeżdża o $8{:}15$. Ile trwa jazda? O której godzinie dojedzie? **Zapisz obliczenia.**",
          rozwiazanie: "Czas liczymy ze wzoru $t = s : v$: $t = 135 : 90 = 1{,}5$ h.\n\nTo $1$ h $30$ min.\n\nDo godziny wyjazdu dodajemy czas jazdy: $8{:}15 + 1$ h $= 9{:}15$, a potem jeszcze $30$ min daje $9{:}45$.\n\nOdpowiedź: Jazda trwa $1$ h $30$ min. Pani Ewa dojedzie o $9{:}45$.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Rowerzysta przez $2$ godziny jechał z prędkością $15$ km/h, a potem przez $1$ godzinę z prędkością $12$ km/h. Ile kilometrów przejechał w sumie? Jaka była jego średnia prędkość na całej trasie? **Zapisz obliczenia.**",
          rozwiazanie: "Pierwsza część drogi: $s_1 = 15 \\cdot 2 = 30$ km.\n\nDruga część drogi: $s_2 = 12 \\cdot 1 = 12$ km.\n\nCała droga: $30 + 12 = 42$ km. Cały czas: $2 + 1 = 3$ h.\n\nŚrednia prędkość: $42 : 3 = 14$ km/h.\n\nOdpowiedź: Rowerzysta przejechał $42$ km, a jego średnia prędkość to $14$ km/h.",
        },
      ],
      generatory: [
        {
          id: "droga-predkosc-czas",
          nazwa: "Droga, prędkość, czas",
          opis: "Oblicz drogę, prędkość albo czas (km/h albo m/s, czas w godzinach lub minutach).",
          generuj(r) {
            const POJ = [
              { kto: "Turysta", cz: "idzie", pok: "przeszedł", v: [4, 5], tmax: 4 },
              { kto: "Rowerzysta", cz: "jedzie", pok: "przejechał", v: [12, 15, 16, 18, 20, 24], tmax: 3 },
              { kto: "Autobus", cz: "jedzie", pok: "przejechał", v: [40, 45, 50, 60], tmax: 4 },
              { kto: "Samochód", cz: "jedzie", pok: "przejechał", v: [50, 60, 70, 80, 90, 100, 110, 120], tmax: 5 },
              { kto: "Pociąg", cz: "jedzie", pok: "przejechał", v: [80, 100, 120, 140, 160], tmax: 3 },
            ];
            const MS = [
              { kto: "Uczeń", cz: "biegnie", pok: "przebiegł", v: [3, 4, 5] },
              { kto: "Rowerzysta", cz: "jedzie", pok: "przejechał", v: [4, 5, 6, 8] },
            ];
            const rodzaj = r.pick(["s", "s", "v", "v", "t", "t", "smin", "ms-s", "ms-v", "ms-t"]);
            if (rodzaj.startsWith("ms")) {
              const p = r.pick(MS);
              const v = r.pick(p.v);
              const t = r.pick([10, 15, 20, 30, 40, 60]);
              const s = v * t;
              if (rodzaj === "ms-s") {
                return {
                  tresc: `${p.kto} ${p.cz} ze stałą prędkością $${v}$ m/s. Ile metrów pokona w ciągu $${t}$ sekund?`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Droga w metrach" }],
                  odpowiedz: { w: s },
                  wynik: `$${s}$ m`,
                  rozwiazanie: [`Droga to prędkość razy czas: $s = v \\cdot t$.`, `$s = ${v} \\cdot ${t} = ${s}$ m.`],
                };
              }
              if (rodzaj === "ms-v") {
                return {
                  tresc: `${p.kto} ${p.pok} $${s}$ m w ciągu $${t}$ sekund ze stałą prędkością. Jaka była jego prędkość w m/s?`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Prędkość w m/s" }],
                  odpowiedz: { w: v },
                  wynik: `$${v}$ m/s`,
                  rozwiazanie: [`Prędkość to droga podzielona przez czas: $v = s : t$.`, `$v = ${s} : ${t} = ${v}$ m/s.`],
                };
              }
              return {
                tresc: `${p.kto} ${p.cz} ze stałą prędkością $${v}$ m/s. Ile sekund zajmie mu pokonanie $${s}$ m?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Czas w sekundach" }],
                odpowiedz: { w: t },
                wynik: `$${t}$ s`,
                rozwiazanie: [`Czas to droga podzielona przez prędkość: $t = s : v$.`, `$t = ${s} : ${v} = ${t}$ s.`],
              };
            }
            const p = r.pick(POJ);
            const v = r.pick(p.v);
            if (rodzaj === "smin") {
              let t, s, tq;
              do {
                t = r.pick([15, 20, 30, 40, 45, 12]);
                tq = q(t, 60);
                s = tq.mul(v);
              } while (s.d > 2);
              return {
                tresc: `${p.kto} ${p.cz} ze stałą prędkością $${v}$ km/h. Ile kilometrów pokona w ciągu $${t}$ minut?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Droga w km" }],
                odpowiedz: { w: s },
                wynik: `$${zap(s)}$ km`,
                rozwiazanie: [
                  `Prędkość jest w km/h, więc zamieniamy minuty na godziny: $${t}$ min $= \\frac{${t}}{60}$ h $= ${tq.tex()}$ h.`,
                  `Droga to prędkość razy czas: $s = ${v} \\cdot ${tq.tex()} = ${zap(s)}$ km.`,
                ],
              };
            }
            const t = q(r.int(2, p.tmax * 2), 2);
            const s = t.mul(v);
            if (rodzaj === "s") {
              return {
                tresc: `${p.kto} ${p.cz} ze stałą prędkością $${v}$ km/h. Ile kilometrów pokona w ciągu ${hg(t)}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Droga w km" }],
                odpowiedz: { w: s },
                wynik: `$${zap(s)}$ km`,
                rozwiazanie: [`Droga to prędkość razy czas: $s = v \\cdot t$.`, `$s = ${v} \\cdot ${zap(t)} = ${zap(s)}$ km.`],
              };
            }
            if (rodzaj === "v") {
              return {
                tresc: `${p.kto} ${p.pok} $${zap(s)}$ km w ${hs(t)} ze stałą prędkością. Jaka była jego prędkość w km/h?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Prędkość w km/h" }],
                odpowiedz: { w: v },
                wynik: `$${v}$ km/h`,
                rozwiazanie: [`Prędkość to droga podzielona przez czas: $v = s : t$.`, `$v = ${zap(s)} : ${zap(t)} = ${v}$ km/h.`],
              };
            }
            const kr = [`Czas to droga podzielona przez prędkość: $t = s : v$.`, `$t = ${zap(s)} : ${v} = ${zap(t)}$ h.`];
            if (t.d !== 1) kr.push(`$${zap(t)}$ h to ${hmin(t)}.`);
            return {
              tresc: `${p.kto} ${p.cz} ze stałą prędkością $${v}$ km/h. Ile godzin zajmie mu pokonanie $${zap(s)}$ km?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Czas w godzinach" }],
              odpowiedz: { w: t },
              wynik: `$${zap(t)}$ h`,
              rozwiazanie: kr,
            };
          },
        },
        {
          id: "predkosc-srednia",
          nazwa: "Prędkość średnia",
          opis: "Podróż w dwóch częściach: policz całą drogę, cały czas i średnią prędkość.",
          generuj(r) {
            const POJ = [
              { kto: "Rowerzysta", v: [12, 15, 18, 20, 24], pok: "przejechał" },
              { kto: "Autobus", v: [40, 50, 60], pok: "przejechał" },
              { kto: "Samochód", v: [50, 60, 80, 90, 100], pok: "przejechał" },
            ];
            const p = r.pick(POJ);
            let v1, v2, t1, t2, sr;
            do {
              v1 = r.pick(p.v);
              v2 = r.pick(p.v);
              t1 = r.int(1, 3);
              t2 = r.int(1, 3);
              sr = q(v1 * t1 + v2 * t2, t1 + t2);
            } while (v1 === v2 || sr.d > 2);
            const s1 = v1 * t1, s2 = v2 * t2, S = s1 + s2, T = t1 + t2;
            const tresc = r.chance(0.5)
              ? `${p.kto} jechał przez $${t1}$ ${mn(t1, "godzinę", "godziny", "godzin")} z prędkością $${v1}$ km/h, a potem przez $${t2}$ ${mn(t2, "godzinę", "godziny", "godzin")} z prędkością $${v2}$ km/h. Jaka była jego średnia prędkość na całej trasie?`
              : `${p.kto} ${p.pok} najpierw $${s1}$ km w $${t1}$ ${mn(t1, "godzinę", "godziny", "godzin")}, a potem $${s2}$ km w $${t2}$ ${mn(t2, "godzinę", "godziny", "godzin")}. Jaka była jego średnia prędkość na całej trasie?`;
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: "Średnia prędkość w km/h" }],
              odpowiedz: { w: sr },
              wynik: `$${zap(sr)}$ km/h`,
              rozwiazanie: [
                `Cała droga: $${s1} + ${s2} = ${S}$ km.`,
                `Cały czas: $${t1} + ${t2} = ${T}$ h.`,
                `Średnia prędkość to cała droga podzielona przez cały czas: $${S} : ${T} = ${zap(sr)}$ km/h.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "wzory",
      nazwa: "Korzystanie ze wzorów",
      sciaga: [
        {
          nazwa: "Wzór i podstawianie",
          slownie: "Wzór to zapis, w którym litery oznaczają liczby. Żeby go użyć, wstawiamy liczby w miejsce liter i liczymy zgodnie z kolejnością działań.",
          tex: "P=a\\cdot b",
          litery: "$P$ – pole prostokąta, $a$ i $b$ – długości jego boków.",
          przyklad: "Prostokąt ma boki $8$ cm i $5$ cm. Wstawiamy $a = 8$ i $b = 5$: $P = 8 \\cdot 5 = 40$ cm$^2$.",
          uwaga: "Zapis $2a$ oznacza $2 \\cdot a$. Dla $a = 5$ mamy $2a = 2 \\cdot 5 = 10$, a nie $25$.",
        },
        {
          nazwa: "Wzory z geometrii",
          slownie: "Znasz już wzory na obwód i pole figur oraz objętość prostopadłościanu. Wstawiaj do nich liczby w tych samych jednostkach.",
          tex: "Ob=2a+2b\\qquad P=\\frac{a\\cdot h}{2}\\qquad V=a\\cdot b\\cdot c\\qquad P=\\frac{(a+b)\\cdot h}{2}",
          litery: "Obwód prostokąta; pole trójkąta (podstawa $a$ i wysokość $h$); objętość prostopadłościanu; pole trapezu (podstawy $a$, $b$).",
          przyklad: "Trójkąt: $a = 10$ cm, $h = 6$ cm, więc $P = 10 \\cdot 6 : 2 = 30$ cm$^2$. Prostopadłościan $3 \\times 4 \\times 5$ cm: $V = 3 \\cdot 4 \\cdot 5 = 60$ cm$^3$.",
          uwaga: "W trójkącie $h$ to wysokość poprowadzona do podstawy $a$, a nie jego bok.",
        },
        {
          nazwa: "Wzory z życia",
          slownie: "Wzory opisują też zwykłe sytuacje: cenę zakupów albo koszt wypożyczenia. Litera oznacza liczbę, która może być różna w różnych sytuacjach.",
          tex: "K=n\\cdot c\\qquad K=20+3n",
          litery: "$K$ – koszt, $n$ – liczba sztuk albo godzin, $c$ – cena jednej sztuki.",
          przyklad: "Wypożyczenie roweru: $20$ zł opłaty i $3$ zł za każdą godzinę, więc $K = 20 + 3n$. Dla $n = 4$ godzin: $K = 20 + 3 \\cdot 4 = 20 + 12 = 32$ zł.",
          uwaga: "Najpierw mnożymy, potem dodajemy: $20 + 3 \\cdot 4 = 32$. Nie liczymy $23 \\cdot 4$.",
        },
        {
          nazwa: "Szukanie litery we wzorze",
          slownie: "Gdy znasz wynik wzoru, a nie znasz jednej liczby, wstaw znane liczby i rozwiąż równanie, tak jak w rozdziale o równaniach.",
          tex: "P=a\\cdot b\\qquad 48=6\\cdot b",
          przyklad: "Pole $48$ cm$^2$ i bok $a = 6$ cm: $48 = 6 \\cdot b$, więc $b = 48 : 6 = 8$ cm. Dalej: $K = 20 + 3n$ i $K = 41$ zł: $20 + 3n = 41$, $3n = 21$, $n = 7$.",
          uwaga: "Sprawdź wynik: wstaw go do wzoru. Dla $b = 8$ mamy $6 \\cdot 8 = 48$, czyli się zgadza.",
        },
      ],
      jak: [
        "Zapisz wzór i sprawdź, co oznacza każda litera.",
        "Wstaw liczby zamiast liter. Pamiętaj o tych samych jednostkach.",
        "Policz zgodnie z kolejnością działań: najpierw mnożenie i dzielenie, potem dodawanie i odejmowanie.",
        "Gdy szukasz litery, zapisz równanie i rozwiąż je. Na końcu sprawdź wynik we wzorze.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Pole trójkąta wyraża wzór $P = \\frac{a \\cdot h}{2}$. Ile wynosi pole trójkąta o podstawie $a = 14$ cm i wysokości $h = 6$ cm? **Wybierz właściwą odpowiedź.**",
          opcje: ["$84$ cm$^2$", "$17$ cm$^2$", "$20$ cm$^2$", "$42$ cm$^2$"],
          poprawna: 3,
        },
        {
          nr: "23",
          tresc: "Koszt wypożyczenia roweru wyraża wzór $K = 12 + 4n$ (w złotych), gdzie $n$ to liczba godzin. Ile złotych kosztuje wypożyczenie na $3$ godziny? **Wybierz właściwą odpowiedź.**",
          opcje: ["$24$ zł", "$16$ zł", "$48$ zł", "$36$ zł"],
          poprawna: 0,
        },
        {
          nr: "24",
          tresc: "Obwód prostokąta wyraża wzór $Ob = 2a + 2b$. Obwód prostokąta to $30$ cm, a jeden bok ma $a = 9$ cm. Ile centymetrów ma drugi bok $b$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$21$ cm", "$6$ cm", "$12$ cm", "$3$ cm"],
          poprawna: 1,
        },
        {
          nr: "25",
          tresc: "Objętość prostopadłościanu wyraża wzór $V = a \\cdot b \\cdot c$. Prostopadłościan ma objętość $120$ cm$^3$ oraz krawędzie $a = 4$ cm i $b = 5$ cm. Ile centymetrów ma krawędź $c$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$30$ cm", "$111$ cm", "$6$ cm", "$480$ cm"],
          poprawna: 2,
        },
        {
          nr: "26",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Dla $a = 3$ wyrażenie $2a + 5$ ma wartość $11$.", litery: "PF", poprawna: 0 },
            { tekst: "Jeśli $K = 15 + 2n$ i $n = 5$, to $K = 35$.", litery: "PF", poprawna: 1 },
            { tekst: "Z wzoru $P = a \\cdot b$ dla $P = 35$ i $a = 5$ wynika, że $b = 7$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Koszt wynajęcia sali opisuje wzór $K = 25 + 4n$ (w złotych), gdzie $n$ to liczba godzin. Ile kosztuje wynajęcie sali na $5$ godzin? Na ile godzin można wynająć salę za $65$ zł? **Zapisz obliczenia.**",
          rozwiazanie: "Dla $n = 5$: $K = 25 + 4 \\cdot 5 = 25 + 20 = 45$ zł.\n\nDla $K = 65$ zapisujemy równanie: $25 + 4n = 65$.\n\nOdejmujemy $25$: $4n = 65 - 25 = 40$. Dzielimy przez $4$: $n = 40 : 4 = 10$.\n\nSprawdzenie: $25 + 4 \\cdot 10 = 65$.\n\nOdpowiedź: Na $5$ godzin sala kosztuje $45$ zł. Za $65$ zł można ją wynająć na $10$ godzin.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "Pole trapezu wyraża wzór $P = \\frac{(a + b) \\cdot h}{2}$. Trapez ma pole $54$ cm$^2$ oraz podstawy $a = 7$ cm i $b = 11$ cm. Jaką wysokość ma ten trapez? **Zapisz obliczenia.**",
          rozwiazanie: "Wstawiamy dane do wzoru: $54 = \\frac{(7 + 11) \\cdot h}{2}$.\n\nSumujemy podstawy: $7 + 11 = 18$, więc $54 = \\frac{18 \\cdot h}{2}$, czyli $54 = 9 \\cdot h$.\n\nDzielimy przez $9$: $h = 54 : 9 = 6$ cm.\n\nSprawdzenie: $\\frac{18 \\cdot 6}{2} = 54$.\n\nOdpowiedź: Wysokość trapezu to $6$ cm.",
        },
      ],
      generatory: [
        {
          id: "podstaw-do-wzoru",
          nazwa: "Podstaw do wzoru",
          opis: "Wstaw liczby do wzoru na pole, obwód, objętość albo koszt i oblicz wynik.",
          generuj(r) {
            const typ = r.int(0, 5);
            if (typ === 0) {
              const a = r.int(3, 15), b = r.int(3, 15), P = a * b;
              return {
                tresc: `Pole prostokąta liczymy ze wzoru $P = a \\cdot b$. Oblicz pole prostokąta o bokach $a = ${a}$ cm i $b = ${b}$ cm.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Pole w cm$^2$" }],
                odpowiedz: { w: P },
                wynik: `$${P}$ cm$^2$`,
                rozwiazanie: [`Wstawiamy liczby do wzoru: $P = ${a} \\cdot ${b}$.`, `$P = ${P}$ cm$^2$.`],
              };
            }
            if (typ === 1) {
              const a = r.int(3, 20), b = r.int(3, 20), O = 2 * a + 2 * b;
              return {
                tresc: `Obwód prostokąta liczymy ze wzoru $Ob = 2a + 2b$. Oblicz obwód prostokąta o bokach $a = ${a}$ cm i $b = ${b}$ cm.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Obwód w cm" }],
                odpowiedz: { w: O },
                wynik: `$${O}$ cm`,
                rozwiazanie: [`Wstawiamy liczby do wzoru: $Ob = 2 \\cdot ${a} + 2 \\cdot ${b}$.`, `Najpierw mnożymy: $Ob = ${2 * a} + ${2 * b} = ${O}$ cm.`],
              };
            }
            if (typ === 2) {
              let a, h;
              do { a = r.int(4, 20); h = r.int(3, 14); } while ((a * h) % 2 !== 0);
              const P = (a * h) / 2;
              return {
                tresc: `Pole trójkąta liczymy ze wzoru $P = \\frac{a \\cdot h}{2}$. Oblicz pole trójkąta o podstawie $a = ${a}$ cm i wysokości $h = ${h}$ cm.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Pole w cm$^2$" }],
                odpowiedz: { w: P },
                wynik: `$${P}$ cm$^2$`,
                rozwiazanie: [`Wstawiamy liczby do wzoru: $P = \\frac{${a} \\cdot ${h}}{2}$.`, `Mnożymy i dzielimy przez $2$: $P = ${a * h} : 2 = ${P}$ cm$^2$.`],
              };
            }
            if (typ === 3) {
              const a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9), V = a * b * c;
              return {
                tresc: `Objętość prostopadłościanu liczymy ze wzoru $V = a \\cdot b \\cdot c$. Oblicz objętość prostopadłościanu o krawędziach $a = ${a}$ cm, $b = ${b}$ cm i $c = ${c}$ cm.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Objętość w cm$^3$" }],
                odpowiedz: { w: V },
                wynik: `$${V}$ cm$^3$`,
                rozwiazanie: [`Wstawiamy liczby do wzoru: $V = ${a} \\cdot ${b} \\cdot ${c}$.`, `$V = ${a * b} \\cdot ${c} = ${V}$ cm$^3$.`],
              };
            }
            if (typ === 4) {
              let a, b, h;
              do { a = r.int(3, 12); b = r.int(3, 12); h = r.int(2, 10); } while (((a + b) * h) % 2 !== 0);
              const P = ((a + b) * h) / 2;
              return {
                tresc: `Pole trapezu liczymy ze wzoru $P = \\frac{(a + b) \\cdot h}{2}$. Oblicz pole trapezu o podstawach $a = ${a}$ cm i $b = ${b}$ cm oraz wysokości $h = ${h}$ cm.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Pole w cm$^2$" }],
                odpowiedz: { w: P },
                wynik: `$${P}$ cm$^2$`,
                rozwiazanie: [`Wstawiamy liczby do wzoru: $P = \\frac{(${a} + ${b}) \\cdot ${h}}{2}$.`, `Najpierw nawias: $${a} + ${b} = ${a + b}$.`, `$P = ${a + b} \\cdot ${h} : 2 = ${P}$ cm$^2$.`],
              };
            }
            const c = r.pick([10, 15, 20, 25, 30]), p = r.int(2, 8), n = r.int(2, 8), K = c + p * n;
            return {
              tresc: `Koszt wypożyczenia roweru wyraża wzór $K = ${c} + ${p}n$ (w złotych), gdzie $n$ to liczba godzin. Ile złotych kosztuje wypożyczenie na $${n}$ ${mn(n, "godzinę", "godziny", "godzin")}?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Koszt w złotych" }],
              odpowiedz: { w: K },
              wynik: `$${K}$ zł`,
              rozwiazanie: [`Wstawiamy $n = ${n}$: $K = ${c} + ${p} \\cdot ${n}$.`, `Najpierw mnożymy: $K = ${c} + ${p * n} = ${K}$ zł.`],
            };
          },
        },
        {
          id: "szukana-litera",
          nazwa: "Szukana litera",
          opis: "Znajdź brakującą wielkość ze wzoru (bok, wysokość, krawędź albo liczbę godzin), gdy znasz wynik.",
          generuj(r) {
            const typ = r.int(0, 4);
            if (typ === 0) {
              const a = r.int(3, 14), b = r.int(3, 14), P = a * b;
              return {
                tresc: `Pole prostokąta wyraża wzór $P = a \\cdot b$. Pole prostokąta wynosi $${P}$ cm$^2$, a jeden bok ma $a = ${a}$ cm. Ile centymetrów ma drugi bok $b$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Bok b w cm" }],
                odpowiedz: { w: b },
                wynik: `$${b}$ cm`,
                rozwiazanie: [`Wstawiamy dane do wzoru: $${P} = ${a} \\cdot b$.`, `Dzielimy przez $${a}$: $b = ${P} : ${a} = ${b}$ cm.`],
              };
            }
            if (typ === 1) {
              const a = r.int(3, 15), b = r.int(3, 15), O = 2 * a + 2 * b;
              return {
                tresc: `Obwód prostokąta wyraża wzór $Ob = 2a + 2b$. Obwód wynosi $${O}$ cm, a jeden bok ma $a = ${a}$ cm. Ile centymetrów ma drugi bok $b$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Bok b w cm" }],
                odpowiedz: { w: b },
                wynik: `$${b}$ cm`,
                rozwiazanie: [`Wstawiamy dane: $${O} = 2 \\cdot ${a} + 2b$, czyli $${O} = ${2 * a} + 2b$.`, `Odejmujemy $${2 * a}$: $2b = ${O} - ${2 * a} = ${2 * b}$.`, `Dzielimy przez $2$: $b = ${b}$ cm.`],
              };
            }
            if (typ === 2) {
              const a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9), V = a * b * c;
              return {
                tresc: `Objętość prostopadłościanu wyraża wzór $V = a \\cdot b \\cdot c$. Objętość wynosi $${V}$ cm$^3$, a krawędzie mają $a = ${a}$ cm i $b = ${b}$ cm. Ile centymetrów ma krawędź $c$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Krawędź c w cm" }],
                odpowiedz: { w: c },
                wynik: `$${c}$ cm`,
                rozwiazanie: [`Wstawiamy dane: $${V} = ${a} \\cdot ${b} \\cdot c$, czyli $${V} = ${a * b} \\cdot c$.`, `Dzielimy przez $${a * b}$: $c = ${V} : ${a * b} = ${c}$ cm.`],
              };
            }
            if (typ === 3) {
              const c = r.pick([10, 15, 20, 25, 30]), p = r.int(2, 8), n = r.int(2, 9), K = c + p * n;
              return {
                tresc: `Koszt wypożyczenia roweru wyraża wzór $K = ${c} + ${p}n$ (w złotych), gdzie $n$ to liczba godzin. Na ile godzin można wypożyczyć rower za $${K}$ zł?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba godzin" }],
                odpowiedz: { w: n },
                wynik: `$${n}$ ${mn(n, "godzina", "godziny", "godzin")}`,
                rozwiazanie: [`Zapisujemy równanie: $${c} + ${p}n = ${K}$.`, `Odejmujemy $${c}$: $${p}n = ${K} - ${c} = ${p * n}$.`, `Dzielimy przez $${p}$: $n = ${n}$.`],
              };
            }
            let a, h;
            do { a = r.int(4, 16); h = r.int(2, 12); } while ((a * h) % 2 !== 0);
            const P = (a * h) / 2;
            return {
              tresc: `Pole trójkąta wyraża wzór $P = \\frac{a \\cdot h}{2}$. Trójkąt ma pole $${P}$ cm$^2$ i podstawę $a = ${a}$ cm. Jaką wysokość $h$ ma ten trójkąt?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Wysokość h w cm" }],
              odpowiedz: { w: h },
              wynik: `$${h}$ cm`,
              rozwiazanie: [`Wstawiamy dane: $${P} = \\frac{${a} \\cdot h}{2}$.`, `Mnożymy przez $2$: $${2 * P} = ${a} \\cdot h$.`, `Dzielimy przez $${a}$: $h = ${2 * P} : ${a} = ${h}$ cm.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "plan-mapa-skala",
      nazwa: "Plan, mapa i skala",
      sciaga: [
        {
          nazwa: "Co oznacza skala",
          slownie: "Skala mówi, ile razy rzeczywista odległość jest większa od odległości na planie albo mapie. Skala $1 : 1000$ oznacza, że $1$ cm na planie to $1000$ cm w rzeczywistości.",
          tex: "1:1000\\qquad 1\\text{ cm}\\to 1000\\text{ cm}=10\\text{ m}",
          przyklad: "W skali $1 : 500$ odcinek $1$ cm na planie to $500$ cm, czyli $5$ m w rzeczywistości. Odcinek $3$ cm to $3 \\cdot 500 = 1500$ cm $= 15$ m.",
          uwaga: "Pierwsza liczba dotyczy planu lub mapy, a druga rzeczywistości. Zapis $1 : 500$ czytamy „jeden do pięciuset”.",
        },
        {
          nazwa: "Z planu do rzeczywistości",
          slownie: "Mnożymy długość z planu przez drugą liczbę skali. Wynik jest w centymetrach, więc zamieniamy go na metry albo kilometry.",
          tex: "\\text{rzeczywista}=\\text{na planie}\\cdot k",
          litery: "Skala to $1 : k$.",
          przyklad: "Skala $1 : 50\\,000$, odcinek $4$ cm na mapie. Rzeczywista długość: $4 \\cdot 50\\,000 = 200\\,000$ cm $= 2000$ m $= 2$ km.",
          uwaga: "Nie zapomnij zamiany jednostek. Wynik $200\\,000$ cm to nie $200\\,000$ m.",
        },
        {
          nazwa: "Centymetry na metry i kilometry",
          slownie: "Żeby zamienić centymetry na metry, dzielimy przez $100$. Żeby zamienić centymetry na kilometry, dzielimy przez $100\\,000$.",
          tex: "100\\text{ cm}=1\\text{ m}\\qquad 100\\,000\\text{ cm}=1\\text{ km}",
          przyklad: "$350\\,000$ cm $: 100 = 3500$ m. Dalej $3500$ m to $3{,}5$ km. Można też od razu: $350\\,000 : 100\\,000 = 3{,}5$ km.",
          uwaga: "W kilometrze jest $100\\,000$ cm, a nie $1000$ cm. $1$ km to $1000$ m, a $1$ m to $100$ cm.",
        },
        {
          nazwa: "Z rzeczywistości na plan",
          slownie: "Zamień rzeczywistą długość na centymetry i podziel przez drugą liczbę skali. Plan jest mniejszy od rzeczywistości, więc wynik ma być mały.",
          tex: "\\text{na planie}=\\text{rzeczywista}:k",
          przyklad: "Pokój ma $4$ m długości, skala planu to $1 : 50$. Zamieniamy: $4$ m $= 400$ cm. Na planie: $400 : 50 = 8$ cm.",
          uwaga: "Dzielimy, a nie mnożymy. Na planie pokój nie może mieć $200$ m.",
        },
        {
          nazwa: "Jaka to skala",
          slownie: "Zamień obie długości na centymetry. Potem podziel długość rzeczywistą przez długość na planie. Wynik to druga liczba skali.",
          tex: "k=\\frac{\\text{rzeczywista}}{\\text{na planie}}",
          przyklad: "Odcinek $2$ cm na mapie to w terenie $1$ km. $1$ km $= 100\\,000$ cm, więc $k = 100\\,000 : 2 = 50\\,000$. Skala to $1 : 50\\,000$.",
          uwaga: "Obie długości muszą być w tych samych jednostkach przed dzieleniem. Nie dziel kilometrów przez centymetry.",
        },
      ],
      jak: [
        "Zapisz skalę $1 : k$ i długość, którą znasz (z planu albo z terenu).",
        "Z planu do rzeczywistości: pomnóż przez $k$. Z rzeczywistości na plan: podziel przez $k$.",
        "Zamień centymetry na metry (dziel przez $100$) albo na kilometry (dziel przez $100\\,000$).",
        "Sprawdź sens: w terenie odległość ma być większa niż na mapie, a na planie mniejsza niż w rzeczywistości.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Plan boiska narysowano w skali $1 : 500$. Odcinek na planie ma $6$ cm. Ile metrów ma ten odcinek w rzeczywistości? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$ m", "$300$ m", "$3000$ m", "$30$ m"],
          poprawna: 3,
        },
        {
          nr: "30",
          tresc: "Na mapie w skali $1 : 100\\,000$ odległość między dwiema wsiami wynosi $5$ cm. Ile kilometrów dzieli te wsie? **Wybierz właściwą odpowiedź.**",
          opcje: ["$50$ km", "$5$ km", "$0{,}5$ km", "$500$ km"],
          poprawna: 1,
        },
        {
          nr: "31",
          tresc: "Pokój ma $4{,}5$ m długości. Ile centymetrów ma ten pokój na planie w skali $1 : 50$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$225$ cm", "$90$ cm", "$9$ cm", "$0{,}9$ cm"],
          poprawna: 2,
        },
        {
          nr: "32",
          tresc: "Dwa miasta dzieli w terenie odległość $12$ km, a na mapie jest to $6$ cm. W jakiej skali narysowano mapę? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1 : 200\\,000$", "$1 : 20\\,000$", "$1 : 2000$", "$1 : 2\\,000\\,000$"],
          poprawna: 0,
        },
        {
          nr: "33",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "W skali $1 : 200$ odcinek $1$ cm na planie to $2$ m w rzeczywistości.", litery: "PF", poprawna: 0 },
            { tekst: "W skali $1 : 1000$ odcinek $3$ cm na planie to $300$ m w rzeczywistości.", litery: "PF", poprawna: 1 },
            { tekst: "Odcinek $2$ km w terenie ma na mapie w skali $1 : 50\\,000$ długość $4$ cm.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 2,
          tresc: "Na mapie w skali $1 : 25\\,000$ odległość od domu Ani do jeziora wynosi $8$ cm. Ile kilometrów dzieli dom od jeziora? Ile czasu zajmie Ani droga na piechotę, jeśli idzie z prędkością $4$ km/h? **Zapisz obliczenia.**",
          rozwiazanie: "Mnożymy długość z mapy przez $25\\,000$: $8 \\cdot 25\\,000 = 200\\,000$ cm.\n\nZamieniamy na kilometry (dzielimy przez $100\\,000$): $200\\,000 : 100\\,000 = 2$ km.\n\nCzas liczymy ze wzoru $t = s : v$: $t = 2 : 4 = 0{,}5$ h, czyli $30$ min.\n\nOdpowiedź: Dom jest oddalony od jeziora o $2$ km. Droga zajmie Ani $30$ minut.",
        },
        {
          nr: "35",
          punkty: 3,
          tresc: "Plan mieszkania narysowano w skali $1 : 100$. Salon ma na planie wymiary $5$ cm na $4$ cm. Jakie wymiary ma salon w rzeczywistości? Ile metrów kwadratowych ma jego powierzchnia? Ile metrów listwy przypodłogowej potrzeba, żeby obiec salon dookoła (obwód)? **Zapisz obliczenia.**",
          rozwiazanie: "Skala $1 : 100$ oznacza, że $1$ cm na planie to $100$ cm, czyli $1$ m.\n\nDłuższy bok: $5 \\cdot 100 = 500$ cm $= 5$ m. Krótszy bok: $4 \\cdot 100 = 400$ cm $= 4$ m.\n\nPole: $5 \\cdot 4 = 20$ m$^2$.\n\nObwód: $2 \\cdot 5 + 2 \\cdot 4 = 10 + 8 = 18$ m.\n\nOdpowiedź: Salon ma wymiary $5$ m na $4$ m, jego powierzchnia to $20$ m$^2$. Potrzeba $18$ m listwy.",
        },
      ],
      generatory: [
        {
          id: "plan-i-teren",
          nazwa: "Plan i teren",
          opis: "Zamień długość z planu lub mapy na rzeczywistą albo rzeczywistą na długość na planie.",
          generuj(r) {
            const PLAN = [
              { co: "Plan boiska", ks: [100, 200, 500] },
              { co: "Plan ogrodu", ks: [100, 200] },
              { co: "Plan szkoły", ks: [200, 500, 1000] },
              { co: "Plan osiedla", ks: [500, 1000] },
            ];
            const MAPA = [{ co: "Mapę turystyczną" }, { co: "Mapę okolicy" }];
            const naPlan = r.chance(0.5);
            const mapa = r.chance(0.5);
            if (!mapa) {
              const p = r.pick(PLAN);
              const k = r.pick(p.ks);
              const cm = r.int(2, 30);
              const rzecz = (cm * k) / 100;
              if (!naPlan) {
                return {
                  tresc: `${p.co} narysowano w skali $1 : ${k}$. Odcinek na planie ma $${cm}$ cm. Ile metrów ma ten odcinek w rzeczywistości?`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Długość w metrach" }],
                  odpowiedz: { w: rzecz },
                  wynik: `$${fmt(rzecz)}$ m`,
                  rozwiazanie: [
                    `Skala $1 : ${k}$: mnożymy długość z planu przez $${k}$. $${cm} \\cdot ${k} = ${fmt(cm * k)}$ cm.`,
                    `Zamieniamy centymetry na metry (dzielimy przez $100$): $${fmt(cm * k)} : 100 = ${fmt(rzecz)}$ m.`,
                  ],
                };
              }
              return {
                tresc: `${p.co} narysowano w skali $1 : ${k}$. Odcinek w rzeczywistości ma $${fmt(rzecz)}$ m. Ile centymetrów ma ten odcinek na planie?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Długość na planie w cm" }],
                odpowiedz: { w: cm },
                wynik: `$${cm}$ cm`,
                rozwiazanie: [
                  `Zamieniamy metry na centymetry (mnożymy przez $100$): $${fmt(rzecz)} \\cdot 100 = ${fmt(rzecz * 100)}$ cm.`,
                  `Skala $1 : ${k}$: dzielimy przez $${k}$. $${fmt(rzecz * 100)} : ${k} = ${cm}$ cm.`,
                ],
              };
            }
            const mp = r.pick(MAPA);
            const k = r.pick([10000, 25000, 50000, 100000]);
            const cm = r.int(2, 20);
            const km = q(cm * k, 100000);
            if (!naPlan) {
              return {
                tresc: `${mp.co} narysowano w skali $1 : ${fmt(k)}$. Odległość na mapie wynosi $${cm}$ cm. Ile kilometrów to jest w terenie?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Odległość w kilometrach" }],
                odpowiedz: { w: km },
                wynik: `$${zap(km)}$ km`,
                rozwiazanie: [
                  `Skala $1 : ${fmt(k)}$: mnożymy przez $${fmt(k)}$. $${cm} \\cdot ${fmt(k)} = ${fmt(cm * k)}$ cm.`,
                  `Zamieniamy centymetry na kilometry (dzielimy przez $100\\,000$): $${fmt(cm * k)} : 100\\,000 = ${zap(km)}$ km.`,
                ],
              };
            }
            return {
              tresc: `${mp.co} narysowano w skali $1 : ${fmt(k)}$. W terenie odległość wynosi $${zap(km)}$ km. Ile centymetrów ma ta odległość na mapie?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Odległość na mapie w cm" }],
              odpowiedz: { w: cm },
              wynik: `$${cm}$ cm`,
              rozwiazanie: [
                `Zamieniamy kilometry na centymetry (mnożymy przez $100\\,000$): $${zap(km)} \\cdot 100\\,000 = ${fmt(cm * k)}$ cm.`,
                `Skala $1 : ${fmt(k)}$: dzielimy przez $${fmt(k)}$. $${fmt(cm * k)} : ${fmt(k)} = ${cm}$ cm.`,
              ],
            };
          },
        },
        {
          id: "jaka-skala",
          nazwa: "Jaka skala",
          opis: "Wyznacz skalę planu lub mapy, gdy znasz długość na planie i w rzeczywistości.",
          generuj(r) {
            if (r.chance(0.5)) {
              const k = r.pick([50, 100, 200, 500, 1000]);
              const cm = r.int(2, 20);
              const m = q(cm * k, 100);
              return {
                tresc: `Na planie odcinek ma $${cm}$ cm, a w rzeczywistości $${zap(m)}$ m. Jaka jest skala planu $1 : k$? Wpisz liczbę $k$.`,
                pola: [{ id: "k", typ: "liczba", etykieta: "k" }],
                odpowiedz: { k },
                wynik: `$1 : ${fmt(k)}$`,
                rozwiazanie: [
                  `Zamieniamy długość rzeczywistą na centymetry: $${zap(m)} \\cdot 100 = ${fmt(cm * k)}$ cm.`,
                  `Dzielimy długość rzeczywistą przez długość na planie: $${fmt(cm * k)} : ${cm} = ${fmt(k)}$.`,
                  `Skala to $1 : ${fmt(k)}$.`,
                ],
              };
            }
            const k = r.pick([10000, 20000, 25000, 50000, 100000]);
            const cm = r.int(2, 16);
            const km = q(cm * k, 100000);
            return {
              tresc: `Na mapie odległość między dwiema miejscowościami wynosi $${cm}$ cm, a w terenie $${zap(km)}$ km. Jaka jest skala mapy $1 : k$? Wpisz liczbę $k$.`,
              pola: [{ id: "k", typ: "liczba", etykieta: "k" }],
              odpowiedz: { k },
              wynik: `$1 : ${fmt(k)}$`,
              rozwiazanie: [
                `Zamieniamy kilometry na centymetry (mnożymy przez $100\\,000$): $${zap(km)} \\cdot 100\\,000 = ${fmt(cm * k)}$ cm.`,
                `Dzielimy długość rzeczywistą przez długość na mapie: $${fmt(cm * k)} : ${cm} = ${fmt(k)}$.`,
                `Skala to $1 : ${fmt(k)}$.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
