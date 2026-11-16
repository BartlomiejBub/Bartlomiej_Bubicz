// Klasa 8 (szkoła podstawowa) · rozdział I „Statystyka i prawdopodobieństwo” – Matematyka z kluczem 8 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Bez rysunków: diagramy i wykresy opisane słowami, tabele zapisane małą tabelką (dwie wąskie kolumny).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

const sum = (a) => a.reduce((x, y) => x + y, 0);

/** Liczby jako osobne $…$ po przecinkach – długa lista łamie się na wąskim ekranie. */
const lista = (a) => a.map((x) => `$${x}$`).join(", ");

/** Zapis dziesiętny z przecinkiem do wzoru: dz(q(9, 2)) = "4{,}5"; gdy się nie da, ułamek zwykły. */
function dz(x) {
  const v = Q.z(x);
  for (let k = 0; k <= 4; k++) {
    const m = v.mul(10 ** k);
    if (m.calkowita) {
      const cyfry = String(Math.abs(m.n)).padStart(k + 1, "0");
      return `${v.ujemna ? "-" : ""}${k ? `${cyfry.slice(0, -k)}{,}${cyfry.slice(-k)}` : cyfry}`;
    }
  }
  return v.tex();
}

/** Średnia i ich zapis są „ładne”, gdy mają krótki zapis dziesiętny (mianownik 1, 2, 4, 5 albo 10). */
const ladnaSr = (v) => [1, 2, 4, 5, 10].includes(v.d);
const srednia = (a) => q(sum(a), a.length);
function mediana(a) {
  const s = [...a].sort((x, y) => x - y);
  const n = s.length;
  return n % 2 ? q(s[(n - 1) / 2]) : q(s[n / 2 - 1] + s[n / 2], 2);
}

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });

/** Powtarza losowanie, aż f() zwróci zadanie (wartość różną od null); f używa tego samego losownika, więc wynik jest powtarzalny. */
function probuj(f, proby = 1000) {
  for (let i = 0; i < proby; i++) {
    const w = f();
    if (w) return w;
  }
  throw new Error("Nie udało się wylosować zadania");
}

/** Losowy rozkład liczby naturalnej `suma` na n składników dodatnich całkowitych. */
function skladnik(r, n, suma) {
  const ciecia = r.shuffle(Array.from({ length: suma - 1 }, (_, i) => i + 1)).slice(0, n - 1).sort((a, b) => a - b);
  const w = [];
  let poprz = 0;
  for (const c of [...ciecia, suma]) {
    w.push(c - poprz);
    poprz = c;
  }
  return w;
}

/** Tabela dwukolumnowa w KaTeX: nagłówki h1, h2 i wiersze [wartość, liczność]. */
const tabela = (h1, h2, wiersze) =>
  `$\\begin{array}{c|c} \\text{${h1}} & \\text{${h2}} \\\\ \\hline ${wiersze.map(([a, b]) => `${a} & ${b}`).join(" \\\\ ")} \\end{array}$`;

// --- Dane do generatorów

const ANKIETY = [
  { temat: "Jak dojeżdżasz do szkoły", kat: ["autobus", "rower", "pieszo", "samochód"] },
  { temat: "Ulubiony owoc", kat: ["jabłko", "banan", "truskawka", "winogrona"] },
  { temat: "Ulubiony sport", kat: ["piłka nożna", "siatkówka", "pływanie", "koszykówka"] },
  { temat: "Ulubione zwierzę", kat: ["pies", "kot", "chomik", "królik"] },
  { temat: "Ulubiony rodzaj filmu", kat: ["komedia", "przygodowy", "animowany", "fantastyczny"] },
  { temat: "Gdzie spędzisz wakacje", kat: ["nad morzem", "w górach", "nad jeziorem", "w domu"] },
];

const SLUPKI = [
  { co: "książek wypożyczonych w bibliotece szkolnej w kolejnych dniach", kat: ["poniedziałek", "wtorek", "środa", "czwartek"] },
  { co: "punktów zdobytych w turnieju przez cztery drużyny", kat: ["Orły", "Sokoły", "Lwy", "Wilki"] },
  { co: "kilometrów przejechanych w tygodniu na rowerze", kat: ["Ania", "Bartek", "Celina", "Darek"] },
  { co: "pudełek ciastek sprzedanych na kiermaszu przez klasy", kat: ["klasa 8a", "klasa 8b", "klasa 8c", "klasa 8d"] },
  { co: "biletów sprzedanych w kinie w kolejnych dniach", kat: ["piątek", "sobota", "niedziela", "poniedziałek"] },
];

// Tabele w zadaniach 18 i 21
const TAB18 = tabela("rodzeństwo", "liczba uczniów", [[0, 5], [1, 12], [2, 6], [3, 2]]);
const TAB21 = tabela("książki", "liczba uczniów", [[0, 4], [1, 4], [2, 6], [3, 4], [4, 2]]);

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Diagramy i wykresy
    {
      id: "diagramy",
      nazwa: "Diagramy i wykresy",
      sciaga: [
        {
          nazwa: "Diagram słupkowy",
          slownie: "Każdy słupek pokazuje jedną liczbę. Im wyższy słupek, tym większa liczba. Wysokość odczytujemy z osi pionowej.",
          przyklad: "Słupki pokazują ulubione owoce w klasie: jabłko $12$ osób, banan $8$ osób, gruszka $5$ osób. Razem $12 + 8 + 5 = 25$ osób, a jabłko wybrało o $12 - 8 = 4$ osoby więcej niż banan.",
          uwaga: "Najpierw sprawdź, ile wynosi jedna kreska na osi – czasem to $2$, $5$ albo $10$, a nie $1$.",
        },
        {
          nazwa: "Diagram kołowy",
          slownie: "Całe koło to wszystkie dane, czyli $100\\%$. Każdy wycinek to część całości. Gdy wiesz, ilu jest wszystkich, liczysz część jako procent z całości.",
          tex: "\\text{część}=p\\%\\cdot N",
          litery: "$p$ – procent odczytany z diagramu, $N$ – liczba wszystkich osób (całość).",
          przyklad: "W klasie jest $40$ uczniów, a wycinek „rower” to $25\\%$. Rowerem jedzie $25\\%\\cdot 40=\\frac{1}{4}\\cdot 40=10$ uczniów.",
          uwaga: "Wszystkie wycinki razem dają $100\\%$. Jeśli suma jest inna, gdzieś jest błąd.",
        },
        {
          nazwa: "Wykres liniowy",
          slownie: "Punkty połączone linią pokazują, jak coś zmienia się w czasie, np. temperatura. Linia w górę oznacza wzrost, w dół – spadek, a pozioma – brak zmian.",
          przyklad: "O godzinie $8$ było $4^\\circ$C, a o godzinie $14$ – $13^\\circ$C. Temperatura wzrosła o $13 - 4 = 9$ stopni.",
          uwaga: "Zmianę liczymy tak: wartość późniejsza minus wartość wcześniejsza. Gdy wynik jest ujemny, wartość spadła.",
        },
        {
          nazwa: "Jaka to część całości",
          slownie: "Aby zamienić liczbę z diagramu na procent, dzielimy ją przez sumę wszystkich danych i mnożymy przez $100\\%$.",
          tex: "p=\\frac{k}{N}\\cdot100\\%",
          litery: "$k$ – część (liczba odczytana z diagramu), $N$ – całość (suma wszystkich danych), $p$ – szukany procent.",
          przyklad: "Z $25$ uczniów $8$ wybrało banana: $\\frac{8}{25}\\cdot100\\%=32\\%$.",
          uwaga: "Całość to suma wszystkich słupków, a nie najwyższy słupek.",
        },
      ],
      jak: [
        "Przeczytaj tytuł diagramu i opisy osi: co jest pokazane i w jakich jednostkach.",
        "Sprawdź, ile wynosi jedna kreska na osi.",
        "Odczytaj potrzebne liczby i zapisz je obok.",
        "Wykonaj działanie (suma, różnica, procent z całości) i sprawdź, czy wynik ma sens.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Diagram słupkowy pokazuje ulubione zwierzęta uczniów klasy 8. Słupki mają wysokości: pies – $11$, kot – $9$, chomik – $4$, rybki – $2$. Ilu uczniów wzięło udział w ankiecie, jeśli każdy wybrał dokładnie jedno zwierzę? **Wybierz właściwą odpowiedź.**",
          opcje: ["$20$", "$24$", "$26$", "$11$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "W klasie jest $30$ uczniów. Diagram kołowy pokazuje, jak dojeżdżają do szkoły: autobusem $40\\%$, pieszo $30\\%$, rowerem $20\\%$, samochodem $10\\%$. Ilu uczniów jeździ do szkoły rowerem? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$20$", "$12$", "$3$"],
          poprawna: 0,
        },
        {
          nr: "3",
          tresc: "Wykres liniowy pokazuje temperaturę w ciągu dnia: o $6{:}00$ było $-2^\\circ$C, o $9{:}00$ – $1^\\circ$C, o $12{:}00$ – $6^\\circ$C, o $15{:}00$ – $7^\\circ$C, o $18{:}00$ – $3^\\circ$C. O ile stopni wzrosła temperatura między godziną $6{:}00$ a $15{:}00$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$8$", "$7$", "$9$"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "W kiosku sprzedano $200$ lodów. Diagram kołowy pokazuje: czekoladowe $40\\%$, waniliowe $25\\%$, truskawkowe $20\\%$, cytrynowe $15\\%$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Lodów czekoladowych sprzedano $80$.", litery: "PF", poprawna: 0 },
            { tekst: "Lodów waniliowych sprzedano o $20$ więcej niż truskawkowych.", litery: "PF", poprawna: 1 },
            { tekst: "Lodów cytrynowych sprzedano $30$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "5",
          tresc: "Na osi pionowej diagramu słupkowego jedna kreska oznacza $5$ sztuk. Niebieski słupek sięga do trzeciej kreski, a czerwony do siódmej kreski. O ile sztuk czerwony słupek jest wyższy od niebieskiego? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$20$", "$35$", "$50$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "W klasie 8a jest $40$ uczniów. Diagram kołowy pokazuje ich ulubiony przedmiot: WF – $35\\%$, plastyka – $25\\%$, informatyka – $25\\%$, matematyka – $15\\%$. Ilu uczniów wybrało matematykę? O ile więcej uczniów wybrało WF niż matematykę? **Zapisz obliczenia.**",
          rozwiazanie: "Całe koło to $100\\%$, czyli $40$ uczniów.\n\nMatematykę wybrało $15\\%\\cdot 40=\\frac{15}{100}\\cdot 40=6$ uczniów.\n\nWF wybrało $35\\%\\cdot 40=\\frac{35}{100}\\cdot 40=14$ uczniów.\n\nRóżnica: $14-6=8$.\n\nOdpowiedź: Matematykę wybrało $6$ uczniów, a WF – o $8$ uczniów więcej.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Wykres liniowy pokazuje, ile pieniędzy miała Monika w skarbonce na koniec kolejnych miesięcy: styczeń – $20$ zł, luty – $35$ zł, marzec – $35$ zł, kwiecień – $60$ zł, maj – $80$ zł. W którym miesiącu przybyło najwięcej pieniędzy? Ile razy więcej pieniędzy było w skarbonce na koniec maja niż na koniec stycznia? **Zapisz obliczenia.**",
          rozwiazanie: "Przyrosty w kolejnych miesiącach: luty $35-20=15$, marzec $35-35=0$, kwiecień $60-35=25$, maj $80-60=20$.\n\nNajwiększy przyrost, $25$ zł, był w kwietniu.\n\nNa koniec maja było $80$ zł, a na koniec stycznia $20$ zł: $80:20=4$.\n\nOdpowiedź: Najwięcej przybyło w kwietniu, a w maju było $4$ razy więcej pieniędzy niż w styczniu.",
        },
      ],
      generatory: [
        {
          id: "diagram-kolowy",
          nazwa: "Diagram kołowy",
          opis: "Znasz procenty z diagramu kołowego i liczbę ankietowanych – oblicz, ilu uczniów wybrało daną odpowiedź.",
          generuj(r) {
            const a = r.pick(ANKIETY);
            const N = r.pick([40, 60, 80, 100, 120, 160, 200]);
            const kat = r.shuffle(a.kat);
            const proc = skladnik(r, 4, 20).map((x) => x * 5);
            const licz = proc.map((p) => (N * p) / 100);
            const [i, j] = r.shuffle([0, 1, 2, 3]);
            let tryb = r.int(0, 2);
            if (tryb === 1 && proc[i] === proc[j]) tryb = 2;
            const opis = `W ankiecie „${a.temat}” zapytano $${N}$ uczniów. Diagram kołowy pokazuje wyniki: ${kat.map((c, t) => `${c} – $${proc[t]}\\%$`).join(", ")}.`;
            const calosc = `Całe koło to $100\\%$, czyli wszyscy uczniowie, a więc $${N}$ osób.`;
            const czesc = (t) => `$${proc[t]}\\% \\cdot ${N} = \\frac{${proc[t]}}{100} \\cdot ${N} = ${licz[t]}$`;
            if (tryb === 0) {
              return {
                tresc: `${opis} Ilu uczniów wybrało odpowiedź „${kat[i]}”?`,
                pola: [pole("n", "Liczba uczniów $=$")],
                odpowiedz: { n: q(licz[i]) },
                wynik: `$${licz[i]}$`,
                rozwiazanie: [calosc, `Odpowiedź „${kat[i]}” to $${proc[i]}\\%$ całości: ${czesc(i)}.`],
              };
            }
            if (tryb === 1) {
              const [g, d] = proc[i] > proc[j] ? [i, j] : [j, i];
              return {
                tresc: `${opis} O ile więcej uczniów wybrało odpowiedź „${kat[g]}” niż „${kat[d]}”?`,
                pola: [pole("n", "Różnica $=$")],
                odpowiedz: { n: q(licz[g] - licz[d]) },
                wynik: `$${licz[g] - licz[d]}$`,
                rozwiazanie: [calosc, `„${kat[g]}”: ${czesc(g)}.`, `„${kat[d]}”: ${czesc(d)}.`, `Różnica: $${licz[g]} - ${licz[d]} = ${licz[g] - licz[d]}$.`],
              };
            }
            const razem = proc[i] + proc[j];
            return {
              tresc: `${opis} Ilu uczniów wybrało odpowiedź „${kat[i]}” lub „${kat[j]}”?`,
              pola: [pole("n", "Liczba uczniów $=$")],
              odpowiedz: { n: q(licz[i] + licz[j]) },
              wynik: `$${licz[i] + licz[j]}$`,
              rozwiazanie: [
                calosc,
                `Dwa wycinki razem: $${proc[i]}\\% + ${proc[j]}\\% = ${razem}\\%$.`,
                `$${razem}\\% \\cdot ${N} = \\frac{${razem}}{100} \\cdot ${N} = ${licz[i] + licz[j]}$.`,
              ],
            };
          },
        },
        {
          id: "diagram-slupkowy",
          nazwa: "Diagram słupkowy",
          opis: "Znasz wysokości słupków – oblicz sumę, różnicę dwóch słupków albo jaki procent całości stanowi jeden z nich.",
          generuj(r) {
            const s = r.pick(SLUPKI);
            const total = r.pick([20, 25, 50, 100]);
            const kat = r.shuffle(s.kat);
            const w = skladnik(r, 4, total);
            const [i, j] = r.shuffle([0, 1, 2, 3]);
            let tryb = r.int(0, 2);
            if (tryb === 1 && w[i] === w[j]) tryb = 0;
            const opis = `Diagram słupkowy pokazuje liczbę ${s.co}. Wysokości słupków: ${kat.map((c, t) => `${c} – $${w[t]}$`).join(", ")}.`;
            const sumaTex = `$${w.join(" + ")} = ${total}$`;
            if (tryb === 0) {
              return {
                tresc: `${opis} Oblicz sumę wysokości wszystkich czterech słupków.`,
                pola: [pole("s", "Suma $=$")],
                odpowiedz: { s: q(total) },
                wynik: `$${total}$`,
                rozwiazanie: ["Dodajemy wysokości wszystkich słupków.", `${sumaTex}.`],
              };
            }
            if (tryb === 1) {
              const [g, d] = w[i] > w[j] ? [i, j] : [j, i];
              return {
                tresc: `${opis} O ile słupek „${kat[g]}” jest wyższy od słupka „${kat[d]}”?`,
                pola: [pole("r", "Różnica $=$")],
                odpowiedz: { r: q(w[g] - w[d]) },
                wynik: `$${w[g] - w[d]}$`,
                rozwiazanie: [`Wyższy słupek ma wysokość $${w[g]}$, a niższy $${w[d]}$.`, `Różnica: $${w[g]} - ${w[d]} = ${w[g] - w[d]}$.`],
              };
            }
            const p = q(w[i] * 100, total);
            return {
              tresc: `${opis} Jaki procent sumy wszystkich słupków stanowi słupek „${kat[i]}”? Podaj liczbę bez znaku %.`,
              pola: [pole("p", "Procent $=$")],
              odpowiedz: { p },
              wynik: `$${p}\\%$`,
              rozwiazanie: [
                `Całość to suma wszystkich słupków: ${sumaTex}.`,
                `Część to słupek „${kat[i]}”: $${w[i]}$.`,
                `$\\frac{${w[i]}}{${total}} \\cdot 100\\% = ${p}\\%$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Średnia arytmetyczna
    {
      id: "srednia",
      nazwa: "Średnia arytmetyczna",
      sciaga: [
        {
          nazwa: "Średnia arytmetyczna",
          slownie: "Dodajemy wszystkie liczby i dzielimy sumę przez to, ile ich jest. Średnia mówi, ile miałaby każda liczba, gdyby wszystkie były równe.",
          tex: "\\text{średnia}=\\frac{S}{n}",
          litery: "$S$ – suma wszystkich liczb, $n$ – ile ich jest.",
          przyklad: "Oceny: $3$, $4$, $4$, $5$. Suma: $3+4+4+5=16$. Są $4$ oceny, więc średnia to $16:4=4$.",
          uwaga: "Dzielimy przez liczbę wszystkich liczb, a nie przez ich sumę. Średnia leży zawsze między najmniejszą a największą liczbą.",
        },
        {
          nazwa: "Brakująca liczba",
          slownie: "Gdy znasz średnią, policz sumę wszystkich liczb: średnia razy ich ilość. Potem odejmij liczby, które już znasz.",
          tex: "\\text{suma}=\\text{średnia}\\cdot n",
          litery: "$n$ – ile jest wszystkich liczb (razem z brakującą).",
          przyklad: "Średnia z $4$ sprawdzianów to $4{,}5$, a trzy oceny to $5$, $4$, $5$. Suma czterech ocen: $4{,}5\\cdot4=18$. Znane oceny dają $14$, więc czwarta to $18-14=4$.",
        },
        {
          nazwa: "Nowa liczba i średnia",
          slownie: "Gdy dopiszemy liczbę większą od średniej, średnia rośnie, a gdy mniejszą – maleje. Nową średnią liczymy z nowej sumy i nowej ilości liczb.",
          tex: "\\frac{S+x}{n+1}",
          litery: "$S$ – dotychczasowa suma, $x$ – dopisana liczba, $n$ – ile liczb było.",
          przyklad: "Średnia z $3$ ocen to $4$, więc ich suma to $12$. Dostajemy szóstkę: $\\frac{12+6}{4}=\\frac{18}{4}=4{,}5$.",
          uwaga: "Nie uśredniaj średnich: $\\frac{4+6}{2}=5$ to błąd, bo czwórek było trzy, a szóstka tylko jedna.",
        },
      ],
      jak: [
        "Policz, ile jest liczb, i zapisz sumę wszystkich.",
        "Średnia to suma podzielona przez ilość liczb.",
        "Gdy znasz średnią, a brakuje liczby: najpierw oblicz sumę wszystkich ($\\text{średnia}\\cdot n$), potem odejmij znane liczby.",
        "Sprawdź: wynik musi leżeć między najmniejszą a największą liczbą.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Temperatury w południe w pięciu kolejnych dniach: $12^\\circ$C, $15^\\circ$C, $11^\\circ$C, $16^\\circ$C, $16^\\circ$C. Ile wynosi średnia temperatura z tych dni? **Wybierz właściwą odpowiedź.**",
          opcje: ["$16^\\circ$C", "$70^\\circ$C", "$14^\\circ$C", "$15^\\circ$C"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Średnia z czterech kartkówek Zuzi wynosi $3{,}5$. Z pierwszych trzech dostała oceny $3$, $4$ i $3$. Jaką ocenę dostała z czwartej kartkówki? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$3{,}5$", "$10$", "$14$"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "Dane są liczby $2$, $6$ i $10$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Średnia arytmetyczna tych liczb jest równa $6$.", litery: "PF", poprawna: 0 },
            { tekst: "Po dopisaniu liczby $6$ średnia nadal wynosi $6$.", litery: "PF", poprawna: 0 },
            { tekst: "Po dopisaniu liczby $0$ średnia wzrośnie.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "11",
          tresc: "Średnia z pięciu liczb jest równa $8$. Dopisano szóstą liczbę, równą $14$. Jaka jest teraz średnia sześciu liczb? **Wybierz właściwą odpowiedź.**",
          opcje: ["$11$", "$10$", "$8$", "$9$"],
          poprawna: 3,
        },
        {
          nr: "12",
          tresc: "Średni wzrost pięciu koszykarzy to $180$ cm. Gdy do drużyny dołączył szósty zawodnik, średni wzrost zwiększył się do $182$ cm. Ile centymetrów wzrostu ma nowy zawodnik? **Wybierz właściwą odpowiedź.**",
          opcje: ["$186$", "$192$", "$182$", "$12$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Kasia dostała z czterech kartkówek oceny $4$, $5$, $3$, $4$. Jaką ocenę musi dostać z piątej kartkówki, żeby średnia jej ocen wynosiła $4{,}2$? **Zapisz obliczenia.**",
          rozwiazanie: "Pięć ocen ma dać średnią $4{,}2$, więc ich suma ma być równa $4{,}2\\cdot5=21$.\n\nCztery oceny, które Kasia ma, dają $4+5+3+4=16$.\n\nPiąta ocena: $21-16=5$.\n\nOdpowiedź: Kasia musi dostać ocenę $5$.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "W grupie A jest $6$ osób, a ich średni wynik z konkursu to $7$ punktów. W grupie B jest $4$ osoby, a ich średni wynik to $8$ punktów. Jaki jest średni wynik wszystkich $10$ osób razem? **Zapisz obliczenia.**",
          rozwiazanie: "Suma punktów grupy A: $6\\cdot7=42$.\n\nSuma punktów grupy B: $4\\cdot8=32$.\n\nWszystkie osoby razem zdobyły $42+32=74$ punkty, a jest ich $6+4=10$.\n\nŚrednia: $74:10=7{,}4$.\n\nOdpowiedź: Średni wynik wszystkich osób to $7{,}4$ punktu. (To nie jest $\\frac{7+8}{2}=7{,}5$, bo grupy mają różną liczbę osób.)",
        },
      ],
      generatory: [
        {
          id: "srednia-liczb",
          nazwa: "Średnia z liczb",
          opis: "Oblicz średnią arytmetyczną kilku liczb: ocen, czasów, temperatur albo cen.",
          generuj(r) {
            const KONT = [
              { intro: "Oceny Marty z matematyki w semestrze:", pyt: "Oblicz średnią arytmetyczną tych ocen.", lo: 2, hi: 6 },
              { intro: "Czas dojazdu Kuby do szkoły w kolejnych dniach (w minutach):", pyt: "Oblicz średni czas dojazdu.", lo: 8, hi: 30 },
              { intro: "Temperatura w południe w kolejnych dniach (w $^\\circ$C):", pyt: "Oblicz średnią temperaturę.", lo: 8, hi: 25 },
              { intro: "Wyniki kartkówek Oli (w punktach):", pyt: "Oblicz średni wynik.", lo: 3, hi: 10 },
              { intro: "Ceny zeszytów w sklepie (w złotych):", pyt: "Oblicz średnią cenę zeszytu.", lo: 2, hi: 9 },
              { intro: "Liczba goli strzelonych przez drużynę w kolejnych meczach:", pyt: "Oblicz średnią liczbę goli na mecz.", lo: 0, hi: 6 },
            ];
            const k = r.pick(KONT);
            return probuj(() => {
              const n = r.pick([4, 5, 6, 8]);
              const a = Array.from({ length: n }, () => r.int(k.lo, k.hi));
              const m = srednia(a);
              if (!ladnaSr(m) || (k.lo > 0 && m.d === 1 && new Set(a).size === 1)) return null;
              if (new Set(a).size < 3) return null;
              const S = sum(a);
              return {
                tresc: `${k.intro} ${lista(a)}. ${k.pyt}`,
                pola: [pole("s", "Średnia $=$")],
                odpowiedz: { s: m },
                wynik: `$${dz(m)}$`,
                rozwiazanie: [
                  `Dodajemy wszystkie liczby: $${a.join(" + ")} = ${S}$.`,
                  `Liczb jest $${n}$, więc dzielimy sumę przez $${n}$: $${S} : ${n} = ${dz(m)}$.`,
                ],
              };
            });
          },
        },
        {
          id: "srednia-brakujaca",
          nazwa: "Brakująca liczba",
          opis: "Znasz średnią i część liczb – oblicz brakującą (np. ocenę z ostatniego sprawdzianu).",
          generuj(r) {
            const KONT = [
              { lo: 1, hi: 6, tekst: (n, m, z) => `Średnia ocen Ani z $${n}$ sprawdzianów wynosi $${m}$. Z pierwszych $${n - 1}$ sprawdzianów ma oceny: ${z}. Jaką ocenę dostała z ostatniego sprawdzianu?`, et: "Ocena $=$" },
              { lo: 2, hi: 10, tekst: (n, m, z) => `Średni wynik Tomka z $${n}$ kartkówek (w punktach) wynosi $${m}$. Z pierwszych $${n - 1}$ kartkówek miał: ${z}. Ile punktów zdobył w ostatniej kartkówce?`, et: "Punkty $=$" },
              { lo: 10, hi: 40, tekst: (n, m, z) => `Średni czas dojazdu Oli do szkoły (w minutach) w ciągu $${n}$ dni wynosi $${m}$. W pierwszych $${n - 1}$ dniach jechała: ${z}. Ile minut jechała w ostatnim dniu?`, et: "Minuty $=$" },
            ];
            const k = r.pick(KONT);
            return probuj(() => {
              const n = r.pick([4, 5, 6]);
              const a = Array.from({ length: n }, () => r.int(k.lo, k.hi));
              const m = srednia(a);
              if (!ladnaSr(m)) return null;
              const znane = a.slice(0, -1);
              const brak = a[n - 1];
              const S = sum(a);
              return {
                tresc: k.tekst(n, dz(m), lista(znane)),
                pola: [pole("x", k.et)],
                odpowiedz: { x: q(brak) },
                wynik: `$${brak}$`,
                rozwiazanie: [
                  `Suma wszystkich $${n}$ liczb: $${dz(m)} \\cdot ${n} = ${S}$.`,
                  `Znane liczby dają razem: $${znane.join(" + ")} = ${sum(znane)}$.`,
                  `Brakująca liczba: $${S} - ${sum(znane)} = ${brak}$.`,
                ],
              };
            });
          },
        },
        {
          id: "srednia-po-dopisaniu",
          nazwa: "Nowa średnia",
          opis: "Znasz średnią kilku liczb i dopisujesz jeszcze jedną – oblicz nową średnią.",
          generuj(r) {
            const KONT = [
              { nLista: [3, 4, 5, 6], mLo: 3, mHi: 5, xLo: 1, xHi: 6, tekst: (n, m, x) => `Średnia ocen Kasi z $${n}$ sprawdzianów jest równa $${m}$. Z kolejnego sprawdzianu Kasia dostała $${x}$. Jaka jest teraz średnia jej ocen?`, et: "Nowa średnia $=$" },
              { nLista: [4, 5, 9], mLo: 175, mHi: 190, xLo: 170, xHi: 200, tekst: (n, m, x) => `Średni wzrost $${n}$ koszykarzy w drużynie wynosi $${m}$ cm. Do drużyny dołączył nowy zawodnik o wzroście $${x}$ cm. Jaki jest teraz średni wzrost drużyny (w cm)?`, et: "Nowa średnia $=$" },
              { nLista: [3, 4, 5, 7], mLo: 8, mHi: 11, xLo: 7, xHi: 14, tekst: (n, m, x) => `Średni czas biegu na $60$ m w grupie $${n}$ uczniów to $${m}$ s. Spóźniony uczeń też pobiegł i miał czas $${x}$ s. Jaka jest teraz średnia dla wszystkich uczniów (w sekundach)?`, et: "Nowa średnia $=$" },
            ];
            const k = r.pick(KONT);
            return probuj(() => {
              const n = r.pick(k.nLista);
              const m = r.int(k.mLo, k.mHi);
              const x = r.int(k.xLo, k.xHi);
              if (x === m) return null;
              const S = n * m;
              const nowa = q(S + x, n + 1);
              if (!ladnaSr(nowa)) return null;
              return {
                tresc: k.tekst(n, m, x),
                pola: [pole("s", k.et)],
                odpowiedz: { s: nowa },
                wynik: `$${dz(nowa)}$`,
                rozwiazanie: [
                  `Suma dotychczasowych liczb: $${m} \\cdot ${n} = ${S}$.`,
                  `Po dopisaniu: $${S} + ${x} = ${S + x}$, a liczb jest teraz $${n} + 1 = ${n + 1}$.`,
                  `Nowa średnia: $${S + x} : ${n + 1} = ${dz(nowa)}$.`,
                ],
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Zbieranie i porządkowanie danych
    {
      id: "dane",
      nazwa: "Zbieranie i porządkowanie danych",
      sciaga: [
        {
          nazwa: "Tabela liczności",
          slownie: "W tabeli zapisujemy, ile razy wystąpiła każda wartość. Zliczamy kreskami, żeby żadnej nie pominąć. Suma liczności to liczba wszystkich danych.",
          przyklad: "Oceny: $3, 4, 3, 5, 4, 4$. Ocena $3$ – $2$ razy, ocena $4$ – $3$ razy, ocena $5$ – raz. Razem $2+3+1=6$ ocen.",
          uwaga: "Sprawdź, czy suma liczności zgadza się z liczbą wszystkich danych.",
        },
        {
          nazwa: "Dominanta",
          slownie: "Dominanta to wartość, która występuje najczęściej. Pytamy: kto ma najwięcej „głosów”?",
          przyklad: "W danych $7, 3, 7, 9, 7$ liczba $7$ występuje trzy razy, a pozostałe po razie. Dominanta to $7$.",
          uwaga: "Dominanta to sama wartość ($7$), a nie liczba jej powtórzeń ($3$).",
        },
        {
          nazwa: "Mediana",
          slownie: "Ustaw liczby od najmniejszej do największej. Mediana to liczba pośrodku. Gdy liczb jest parzyście wiele, bierzemy średnią dwóch środkowych.",
          tex: "\\frac{a+b}{2}",
          litery: "$a$, $b$ – dwie środkowe liczby (tylko gdy liczb jest parzyście wiele).",
          przyklad: "Dane $7, 2, 9, 2, 5$ po uporządkowaniu: $2, 2, 5, 7, 9$ – mediana to $5$. Dla $2, 4, 6, 10$ mediana to $\\frac{4+6}{2}=5$.",
          uwaga: "Najpierw uporządkuj liczby! Środkowa liczba z nieuporządkowanej listy nie jest medianą.",
        },
        {
          nazwa: "Średnia z tabeli liczności",
          slownie: "Mnożymy każdą wartość przez jej liczność, dodajemy wyniki i dzielimy przez liczbę wszystkich danych.",
          przyklad: "Oceny: $2$ – raz, $3$ – $3$ razy, $4$ – $4$ razy, $5$ – $2$ razy. Razem $10$ ocen. Suma: $2\\cdot1+3\\cdot3+4\\cdot4+5\\cdot2=37$. Średnia: $37:10=3{,}7$.",
          uwaga: "Nie licz średniej z samych wartości $2, 3, 4, 5$ – wyszłoby $3{,}5$, bo każda ocena ma inną liczność.",
        },
      ],
      jak: [
        "Zapisz wszystkie dane i policz, ile ich jest.",
        "Uporządkuj je od najmniejszej do największej albo zlicz kreskami w tabeli.",
        "Dominanta: wartość z największą licznością. Mediana: środkowa liczba (albo średnia dwóch środkowych).",
        "Średnia z tabeli: suma „wartość razy liczność” podzielona przez liczbę wszystkich danych.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Rozmiary butów dziesięciu uczniów: $36, 37, 37, 38, 39, 37, 38, 40, 37, 38$. Ile wynosi dominanta tych danych? **Wybierz właściwą odpowiedź.**",
          opcje: ["$37$", "$38$", "$4$", "$37{,}5$"],
          poprawna: 0,
        },
        {
          nr: "16",
          tresc: "Czasy biegu siedmiu uczniów (w sekundach): $14, 11, 16, 12, 15, 13, 24$. Ile wynosi mediana tych czasów? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$", "$15$", "$14$", "$24$"],
          poprawna: 2,
        },
        {
          nr: "17",
          tresc: "Wiek sześciu zawodników (w latach): $8, 12, 9, 15, 10, 14$. Ile wynosi mediana tych liczb? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10$", "$12$", "$11{,}5$", "$11$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: `W klasie zapytano $25$ uczniów, ile mają rodzeństwa.\n\n${TAB18}\n\nIle wynosi średnia liczba rodzeństwa przypadająca na ucznia? **Wybierz właściwą odpowiedź.**`,
          opcje: ["$1{,}5$", "$1{,}2$", "$12$", "$6{,}25$"],
          poprawna: 1,
        },
        {
          nr: "19",
          tresc: "Dane: $4, 8, 4, 6, 9, 4, 7$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Dominanta tych danych wynosi $4$.", litery: "PF", poprawna: 0 },
            { tekst: "Mediana tych danych wynosi $4$.", litery: "PF", poprawna: 1 },
            { tekst: "Średnia arytmetyczna tych danych wynosi $6$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 3,
          tresc: "Oceny Tomka z matematyki: $5, 3, 4, 5, 2, 5, 4, 3, 5, 6$. Uporządkuj oceny od najmniejszej do największej i oblicz: dominantę, medianę oraz średnią arytmetyczną. **Zapisz obliczenia.**",
          rozwiazanie: "Po uporządkowaniu: $2, 3, 3, 4, 4, 5, 5, 5, 5, 6$.\n\nDominanta: ocena $5$ występuje najczęściej, $4$ razy.\n\nOcen jest $10$ (parzysta liczba), więc mediana to średnia dwóch środkowych: piątej i szóstej. Są to $4$ i $5$, więc mediana to $\\frac{4+5}{2}=4{,}5$.\n\nSuma ocen: $2+3+3+4+4+5+5+5+5+6=42$, więc średnia to $42:10=4{,}2$.\n\nOdpowiedź: dominanta $5$, mediana $4{,}5$, średnia $4{,}2$.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: `Zapytano $20$ uczniów, ile książek przeczytali w wakacje.\n\n${TAB21}\n\nPodaj dominantę i medianę oraz oblicz średnią liczbę przeczytanych książek. **Zapisz obliczenia.**`,
          rozwiazanie: "Dominanta: najwięcej uczniów, aż $6$, przeczytało $2$ książki, więc dominanta to $2$.\n\nUczniów jest $20$, więc mediana to średnia z dziesiątej i jedenastej wartości. Ustawiamy dane po kolei: $4$ uczniów ma $0$, następne $4$ mają $1$ (to miejsca od 5. do 8.), a następnych $6$ ma $2$ (miejsca od 9. do 14.). Dziesiąta i jedenasta wartość to $2$ i $2$, więc mediana to $2$.\n\nSuma książek: $0\\cdot4+1\\cdot4+2\\cdot6+3\\cdot4+4\\cdot2=0+4+12+12+8=36$.\n\nŚrednia: $36:20=1{,}8$.\n\nOdpowiedź: dominanta $2$, mediana $2$, średnia $1{,}8$ książki.",
        },
      ],
      generatory: [
        {
          id: "mediana-listy",
          nazwa: "Mediana z listy",
          opis: "Uporządkuj liczby i wyznacz medianę (środkową liczbę albo średnią dwóch środkowych).",
          generuj(r) {
            const KONT = [
              { intro: "Czasy biegu uczniów na $60$ m (w sekundach):", lo: 9, hi: 16 },
              { intro: "Liczba punktów zdobytych przez drużynę w kolejnych meczach:", lo: 10, hi: 40 },
              { intro: "Ceny biletów do kina w różnych miastach (w złotych):", lo: 14, hi: 30 },
              { intro: "Liczba stron przeczytanych przez Anię w kolejnych dniach:", lo: 10, hi: 60 },
              { intro: "Wyniki skoku w dal uczniów klasy (w decymetrach):", lo: 20, hi: 40 },
            ];
            const k = r.pick(KONT);
            return probuj(() => {
              const n = r.int(5, 8);
              const a = Array.from({ length: n }, () => r.int(k.lo, k.hi));
              const s = [...a].sort((x, y) => x - y);
              if (new Set(a).size < n - 1) return null;
              const m = mediana(a);
              const kroki = [`Porządkujemy liczby od najmniejszej do największej: ${lista(s)}.`];
              if (n % 2) {
                kroki.push(`Liczb jest $${n}$ (nieparzysta liczba), więc mediana to środkowa liczba, czyli liczba na miejscu $${(n + 1) / 2}$: $${m}$.`);
              } else {
                kroki.push(`Liczb jest $${n}$ (parzysta liczba), więc bierzemy dwie środkowe: $${s[n / 2 - 1]}$ i $${s[n / 2]}$.`);
                kroki.push(`Mediana to ich średnia: $\\frac{${s[n / 2 - 1]} + ${s[n / 2]}}{2} = ${dz(m)}$.`);
              }
              return {
                tresc: `${k.intro} ${lista(a)}. Wyznacz medianę tych liczb.`,
                pola: [pole("m", "Mediana $=$")],
                odpowiedz: { m },
                wynik: `$${dz(m)}$`,
                rozwiazanie: kroki,
              };
            });
          },
        },
        {
          id: "tabela-srednia",
          nazwa: "Średnia z tabeli",
          opis: "Dane są w tabeli liczności – oblicz średnią (wartość razy liczność, suma, podzielić przez liczbę danych).",
          generuj(r) {
            const KONT = [
              { intro: "W klasie zapytano uczniów, ile mają rodzeństwa.", h1: "rodzeństwo", h2: "liczba uczniów", wart: [0, 1, 2, 3, 4], pyt: "Oblicz średnią liczbę rodzeństwa przypadającą na ucznia." },
              { intro: "Zapisano oceny z kartkówki.", h1: "ocena", h2: "liczba uczniów", wart: [2, 3, 4, 5, 6], pyt: "Oblicz średnią ocenę z kartkówki." },
              { intro: "Zapisano liczbę goli w meczach szkolnej ligi.", h1: "liczba goli", h2: "liczba meczów", wart: [0, 1, 2, 3, 4], pyt: "Oblicz średnią liczbę goli w jednym meczu." },
              { intro: "Zapytano uczniów, ile książek przeczytali w wakacje.", h1: "książki", h2: "liczba uczniów", wart: [0, 1, 2, 3, 4], pyt: "Oblicz średnią liczbę przeczytanych książek." },
            ];
            const k = r.pick(KONT);
            return probuj(() => {
              const il = r.int(3, 5);
              const start = r.int(0, k.wart.length - il);
              const w = k.wart.slice(start, start + il);
              const N = r.int(10, 24);
              const l = skladnik(r, il, N);
              const iloczyny = w.map((x, i) => x * l[i]);
              const S = sum(iloczyny);
              const m = q(S, N);
              if (S === 0 || !ladnaSr(m)) return null;
              return {
                tresc: `${k.intro}\n\n${tabela(k.h1, k.h2, w.map((x, i) => [x, l[i]]))}\n\n${k.pyt}`,
                pola: [pole("s", "Średnia $=$")],
                odpowiedz: { s: m },
                wynik: `$${dz(m)}$`,
                rozwiazanie: [
                  `Mnożymy każdą wartość przez jej liczność i dodajemy: $${w.map((x, i) => `${x} \\cdot ${l[i]}`).join(" + ")} = ${S}$.`,
                  `Wszystkich danych jest: $${l.join(" + ")} = ${N}$.`,
                  `Średnia: $${S} : ${N} = ${dz(m)}$.`,
                ],
              };
            });
          },
        },
        {
          id: "tabela-dominanta-mediana",
          nazwa: "Dominanta i mediana",
          opis: "Dane są w tabeli liczności – wskaż dominantę albo wyznacz medianę.",
          generuj(r) {
            const KONT = [
              { intro: "W klasie zapytano uczniów, ile mają rodzeństwa.", h1: "rodzeństwo", h2: "liczba uczniów", wart: [0, 1, 2, 3, 4] },
              { intro: "Zapisano oceny z kartkówki.", h1: "ocena", h2: "liczba uczniów", wart: [2, 3, 4, 5, 6] },
              { intro: "Zapisano rozmiary butów uczniów jednej klasy.", h1: "rozmiar", h2: "liczba uczniów", wart: [36, 37, 38, 39, 40] },
              { intro: "Zapisano liczbę goli w meczach szkolnej ligi.", h1: "liczba goli", h2: "liczba meczów", wart: [0, 1, 2, 3, 4] },
            ];
            const k = r.pick(KONT);
            const dominanta = r.chance();
            return probuj(() => {
              const il = r.int(3, 5);
              const start = r.int(0, k.wart.length - il);
              const w = k.wart.slice(start, start + il);
              const N = r.int(11, 25);
              const l = skladnik(r, il, N);
              const maks = Math.max(...l);
              const tab = tabela(k.h1, k.h2, w.map((x, i) => [x, l[i]]));
              if (dominanta) {
                if (l.filter((c) => c === maks).length !== 1) return null;
                const x = w[l.indexOf(maks)];
                return {
                  tresc: `${k.intro}\n\n${tab}\n\nPodaj dominantę tych danych.`,
                  pola: [pole("d", "Dominanta $=$")],
                  odpowiedz: { d: q(x) },
                  wynik: `$${x}$`,
                  rozwiazanie: [
                    "Dominanta to wartość, która występuje najczęściej, czyli ma największą liczność.",
                    `Największa liczność to $${maks}$ – ma ją wartość $${x}$.`,
                  ],
                };
              }
              const dane = w.flatMap((x, i) => Array(l[i]).fill(x));
              const m = mediana(dane);
              const narast = [];
              let c = 0;
              l.forEach((li, i) => {
                narast.push(`$${w[i]}$ – miejsca od $${c + 1}$ do $${c + li}$`);
                c += li;
              });
              const miejsca = N % 2 ? `na miejscu $${(N + 1) / 2}$` : `na miejscach $${N / 2}$ i $${N / 2 + 1}$`;
              const wynikKrok = N % 2
                ? `Na tym miejscu stoi $${m}$, więc mediana to $${m}$.`
                : `Na tych miejscach stoją $${dane[N / 2 - 1]}$ i $${dane[N / 2]}$, więc mediana to $\\frac{${dane[N / 2 - 1]} + ${dane[N / 2]}}{2} = ${dz(m)}$.`;
              return {
                tresc: `${k.intro}\n\n${tab}\n\nWyznacz medianę tych danych.`,
                pola: [pole("m", "Mediana $=$")],
                odpowiedz: { m },
                wynik: `$${dz(m)}$`,
                rozwiazanie: [
                  `Wszystkich danych jest $${N}$ (${N % 2 ? "nieparzysta" : "parzysta"} liczba), więc mediana jest ${miejsca}.`,
                  `Ustawiamy dane od najmniejszej: ${narast.join("; ")}.`,
                  wynikKrok,
                ],
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Czy statystyka mówi prawdę
    {
      id: "prawda",
      nazwa: "Czy statystyka mówi prawdę",
      sciaga: [
        {
          nazwa: "Średnia a mediana",
          slownie: "Jedna bardzo duża albo bardzo mała liczba mocno zmienia średnią, a prawie nie zmienia mediany. Wtedy mediana lepiej pokazuje, co jest „typowe”.",
          przyklad: "Kieszonkowe pięciu osób: $10, 10, 15, 20, 95$ zł. Średnia: $150:5=30$ zł, ale mediana to $15$ zł. Prawie nikt nie ma $30$ zł.",
          uwaga: "Gdy średnia jest dużo większa od mediany, szukaj jednej bardzo dużej liczby.",
        },
        {
          nazwa: "Mylący wykres",
          slownie: "Wykres może wprowadzać w błąd, gdy oś nie zaczyna się od zera albo podziałka jest rozciągnięta. Zawsze czytaj liczby na osi.",
          przyklad: "Dwa słupki: $98$ i $100$. Jeśli oś zaczyna się od $96$, słupki mają wysokość $2$ i $4$ kratki – drugi wygląda na dwa razy wyższy, choć różnica to tylko $2$.",
          uwaga: "Porównuj liczby, a nie wysokość słupków na oko.",
        },
        {
          nazwa: "Procent czy liczba osób",
          slownie: "Procent mówi, jaka część grupy coś robi. Liczba osób mówi, ile ich jest. To dwa różne pytania – większa grupa ma więcej osób, ale nie musi mieć większego procentu.",
          przyklad: "Klasa A: $4$ z $5$ osób lubi zupę ($80\\%$). Klasa B: $45$ z $60$ osób ($75\\%$). W B jest więcej osób, które lubią zupę, ale procent jest większy w A.",
          uwaga: "Porównując grupy o różnej wielkości, zamień obie na procenty.",
        },
        {
          nazwa: "Skąd są dane",
          slownie: "Wynik ankiety jest wiarygodny, gdy zapytano dużo osób wybranych przypadkowo. Gdy pytamy tylko wybranych ludzi, wynik może być mylący.",
          przyklad: "Ankieta o ulubionym sporcie, w której zapytano tylko zawodników klubu piłkarskiego, da za dużo odpowiedzi „piłka nożna”.",
          uwaga: "Mała grupa (np. $5$ osób) nie wystarcza, żeby mówić o wszystkich.",
        },
      ],
      jak: [
        "Przeczytaj, co dokładnie pokazują dane: jednostki, opisy osi, od jakiej liczby zaczyna się oś.",
        "Sprawdź, kogo zapytano i ile było osób.",
        "Porównaj średnią z medianą. Duża różnica oznacza, że jakaś liczba mocno odstaje.",
        "Porównując grupy różnej wielkości, policz procenty. Nie ufaj samemu wyglądowi wykresu.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Diagram słupkowy pokazuje, ile sztuk towaru sprzedały dwa sklepy: pierwszy $480$, drugi $500$. Oś pionowa zaczyna się od $460$, więc pierwszy słupek ma wysokość $20$ kratek, a drugi $40$ kratek. Który wniosek jest poprawny? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "Drugi sklep sprzedał dwa razy więcej niż pierwszy.",
            "Sklepy sprzedały prawie tyle samo – różnica to tylko $20$ sztuk.",
            "Pierwszy sklep sprzedał tylko $20$ sztuk.",
            "Oś nie ma znaczenia, liczy się tylko wysokość słupków.",
          ],
          poprawna: 1,
        },
        {
          nr: "23",
          tresc: "W małej firmie zarobki pięciu osób (w tysiącach złotych) to: $3, 3, 4, 4, 11$. Średnia wynosi $5$, a mediana $4$. Którą liczbą lepiej opisać typowy zarobek w tej firmie i dlaczego? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "Średnią $5$ tys. zł, bo średnia zawsze najlepiej opisuje dane.",
            "Największym zarobkiem $11$ tys. zł, bo pokazuje, ile można zarobić.",
            "Żadną – typowego zarobku nie da się opisać liczbą.",
            "Medianą $4$ tys. zł, bo jeden bardzo wysoki zarobek prawie jej nie zmienia.",
          ],
          poprawna: 3,
        },
        {
          nr: "24",
          tresc: "Burmistrz zapytał $10$ osób wychodzących z siłowni, czy lubią sport. Odpowiedziało „tak” $9$ osób, więc burmistrz ogłosił, że $90\\%$ mieszkańców lubi sport. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Ta ankieta dobrze opisuje opinię wszystkich mieszkańców.", litery: "PF", poprawna: 1 },
            { tekst: "Osoby wychodzące z siłowni mogą częściej lubić sport niż inni mieszkańcy.", litery: "PF", poprawna: 0 },
            { tekst: "$9$ z $10$ zapytanych osób to $90\\%$ zapytanych.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "25",
          tresc: "Na wycieczkę pojechało $30$ z $40$ uczniów szkoły A oraz $33$ z $55$ uczniów szkoły B. W której szkole jest większy odsetek uczniów na wycieczce? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "W szkole A – odsetek $75\\%$ jest większy niż $60\\%$.",
            "W szkole B, bo jedzie więcej uczniów ($33>30$).",
            "W obu szkołach jednakowo.",
            "W szkole B, bo szkoła jest większa ($55>40$).",
          ],
          poprawna: 0,
        },
        {
          nr: "26",
          tresc: "Wykres liniowy pokazuje cenę bułki: w styczniu $1{,}00$ zł, w grudniu $1{,}20$ zł. Oś pionowa zaczyna się od $0{,}95$ zł, więc linia wygląda bardzo stromo. O ile procent wzrosła cena bułki? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2\\%$", "$120\\%$", "$20\\%$", "$0{,}2\\%$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Kieszonkowe pięciu uczniów (w złotych): $15, 20, 15, 25, 75$. Oblicz średnią i medianę. Która z tych liczb lepiej pokazuje, ile pieniędzy zwykle mają ci uczniowie? Uzasadnij. **Zapisz obliczenia.**",
          rozwiazanie: "Suma: $15+20+15+25+75=150$, więc średnia to $150:5=30$ zł.\n\nPo uporządkowaniu: $15, 15, 20, 25, 75$. Środkowa liczba to $20$, więc mediana wynosi $20$ zł.\n\nWięcej niż $30$ zł ma tylko jedna osoba, a cztery osoby mają mniej, niektóre nawet tylko $15$ zł. Średnia jest zawyżona przez jedną dużą kwotę $75$ zł.\n\nOdpowiedź: średnia to $30$ zł, mediana $20$ zł. Lepiej pokazuje to mediana, bo jedna bardzo duża liczba prawie jej nie zmienia.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "W klasie 8a $18$ z $24$ uczniów jeździ do szkoły komunikacją miejską, a w klasie 8b – $14$ z $20$ uczniów. Piotrek twierdzi: „W 8a jeździ więcej uczniów, więc tam jest większy procent”. Oblicz oba procenty i oceń, czy Piotrek ma rację. **Zapisz obliczenia.**",
          rozwiazanie: "Klasa 8a: $18:24=0{,}75=75\\%$.\n\nKlasa 8b: $14:20=0{,}7=70\\%$.\n\nW klasie 8a jest rzeczywiście większy procent ($75\\%>70\\%$), ale Piotrek uzasadnił to źle: w 8a jest po prostu więcej uczniów, a o procencie decyduje stosunek części do całości.\n\nOdpowiedź: W 8a jest $75\\%$, a w 8b $70\\%$. Wniosek Piotrka jest prawdziwy, ale jego uzasadnienie – nie, bo porównuje liczby osób zamiast procentów.",
        },
      ],
      generatory: [
        {
          id: "srednia-a-mediana",
          nazwa: "Średnia i mediana",
          opis: "Pięć liczb, z których jedna bardzo duża – oblicz średnią i medianę i zobacz, jak bardzo się różnią.",
          generuj(r) {
            const KONT = [
              { intro: "Kieszonkowe pięciu uczniów (w złotych):", mal: [10, 30, 5], duz: [70, 120, 5] },
              { intro: "Zarobki pięciu osób w małej firmie (w tysiącach złotych):", mal: [3, 6, 1], duz: [12, 24, 1] },
              { intro: "Liczba odwiedzin strony szkoły w pięciu kolejnych dniach:", mal: [20, 40, 5], duz: [150, 250, 10] },
            ];
            const k = r.pick(KONT);
            return probuj(() => {
              const los = ([lo, hi, st]) => lo + st * r.int(0, (hi - lo) / st);
              const mal = Array.from({ length: 4 }, () => los(k.mal));
              const duz = los(k.duz);
              if (new Set(mal).size < 3) return null;
              const a = r.shuffle([...mal, duz]);
              const s = [...a].sort((x, y) => x - y);
              const sr = srednia(a);
              const med = mediana(a);
              if (sr.cmp(med) <= 0) return null;
              const S = sum(a);
              return {
                tresc: `${k.intro} ${lista(a)}. Oblicz średnią i medianę tych liczb.`,
                pola: [pole("sr", "Średnia $=$"), pole("med", "Mediana $=$")],
                odpowiedz: { sr, med },
                wynik: `średnia $${dz(sr)}$, mediana $${dz(med)}$`,
                rozwiazanie: [
                  `Średnia: $${a.join(" + ")} = ${S}$, a $${S} : 5 = ${dz(sr)}$.`,
                  `Po uporządkowaniu: ${lista(s)}. Środkowa liczba to $${s[2]}$, więc mediana to $${s[2]}$.`,
                  `Jedna duża liczba ($${duz}$) mocno podniosła średnią, a medianę prawie nie zmieniła.`,
                ],
              };
            });
          },
        },
        {
          id: "odsetek-porownanie",
          nazwa: "Który procent większy",
          opis: "Dwie grupy o różnej wielkości – porównaj procenty, a nie liczby osób.",
          generuj(r) {
            const KONT = [
              { nazwy: ["klasa 8a", "klasa 8b"], tekst: (k1, n1, k2, n2) => `W klasie 8a na wycieczkę pojechało $${k1}$ z $${n1}$ uczniów, a w klasie 8b – $${k2}$ z $${n2}$ uczniów. W której klasie jest większy odsetek uczniów, którzy pojechali na wycieczkę?`, et: "Większy odsetek jest w:" },
              { nazwy: ["grupa A", "grupa B"], tekst: (k1, n1, k2, n2) => `W grupie A bilet miesięczny ma $${k1}$ z $${n1}$ osób, a w grupie B – $${k2}$ z $${n2}$ osób. W której grupie większa część osób ma bilet miesięczny?`, et: "Większa część w:" },
              { nazwy: ["drużyna czerwonych", "drużyna niebieskich"], tekst: (k1, n1, k2, n2) => `Drużyna czerwonych trafiła do kosza $${k1}$ razy na $${n1}$ rzutów, a drużyna niebieskich – $${k2}$ razy na $${n2}$ rzutów. Która drużyna rzuca celniej (ma większy procent trafień)?`, et: "Celniej rzuca:" },
            ];
            const kon = r.pick(KONT);
            const pulapka = r.chance(0.6);
            return probuj(() => {
              const n1 = r.pick([20, 40, 50, 60, 80, 100, 200]);
              const n2 = r.pick([20, 40, 50, 60, 80, 100, 200]);
              const p1 = 5 * r.int(4, 18);
              const p2 = 5 * r.int(4, 18);
              if (n1 === n2 || p1 === p2) return null;
              const k1 = (n1 * p1) / 100;
              const k2 = (n2 * p2) / 100;
              if (!Number.isInteger(k1) || !Number.isInteger(k2)) return null;
              if (pulapka && k1 > k2 === p1 > p2) return null;
              const wygr = p1 > p2 ? 0 : 1;
              const pw = Math.max(p1, p2);
              return {
                tresc: kon.tekst(k1, n1, k2, n2),
                pola: [
                  { id: "gdzie", typ: "wybor", etykieta: kon.et, opcje: kon.nazwy },
                  pole("p", "Ten odsetek wynosi (w procentach, bez znaku %)"),
                ],
                odpowiedz: { gdzie: wygr, p: q(pw) },
                wynik: `${kon.nazwy[wygr]}, $${pw}\\%$`,
                rozwiazanie: [
                  `${kon.nazwy[0][0].toUpperCase()}${kon.nazwy[0].slice(1)}: $${k1} : ${n1} = ${dz(q(k1, n1))} = ${p1}\\%$.`,
                  `${kon.nazwy[1][0].toUpperCase()}${kon.nazwy[1].slice(1)}: $${k2} : ${n2} = ${dz(q(k2, n2))} = ${p2}\\%$.`,
                  `$${pw}\\%$ jest więcej niż $${Math.min(p1, p2)}\\%$, więc większy odsetek ma: ${kon.nazwy[wygr]}.`,
                ],
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Proste doświadczenia losowe
    {
      id: "losowe",
      nazwa: "Proste doświadczenia losowe",
      sciaga: [
        {
          nazwa: "Doświadczenie losowe",
          slownie: "To doświadczenie, w którym nie wiemy z góry, jaki będzie wynik, np. rzut kostką albo losowanie kuli z woreczka. Zdarzenie to wyniki, które nas interesują – nazywamy je sprzyjającymi.",
          przyklad: "Rzut kostką ma $6$ możliwych wyników: $1, 2, 3, 4, 5, 6$. Zdarzenie „parzysta liczba oczek” ma $3$ wyniki sprzyjające: $2, 4, 6$.",
        },
        {
          nazwa: "Prawdopodobieństwo",
          slownie: "Gdy wszystkie wyniki są jednakowo możliwe, dzielimy liczbę wyników sprzyjających przez liczbę wszystkich możliwych wyników.",
          tex: "P=\\frac{k}{n}",
          litery: "$k$ – ile jest wyników sprzyjających, $n$ – ile jest wszystkich wyników.",
          przyklad: "W woreczku jest $3$ czerwone, $2$ zielone i $5$ białych kul (razem $10$). Prawdopodobieństwo wylosowania zielonej: $P=\\frac{2}{10}=\\frac{1}{5}$.",
          uwaga: "Do $n$ liczymy wszystkie kule, a nie tylko te w innych kolorach: nie $\\frac{2}{8}$, tylko $\\frac{2}{10}$.",
        },
        {
          nazwa: "Zdarzenie pewne, niemożliwe, przeciwne",
          slownie: "Prawdopodobieństwo jest zawsze liczbą od $0$ do $1$. Zdarzenie niemożliwe ma $0$, pewne ma $1$. Prawdopodobieństwo, że coś się nie stanie, to $1$ minus prawdopodobieństwo, że się stanie.",
          tex: "0\\le P\\le1\\qquad P(A')=1-P(A)",
          litery: "$A$ – zdarzenie, $A'$ – zdarzenie przeciwne („nie $A$”).",
          przyklad: "Szóstka na kostce: $\\frac{1}{6}$. Brak szóstki: $1-\\frac{1}{6}=\\frac{5}{6}$.",
        },
        {
          nazwa: "Ułamek, liczba dziesiętna, procent",
          slownie: "Prawdopodobieństwo możemy zapisać ułamkiem, liczbą dziesiętną albo procentem. To ta sama liczba w różnych zapisach.",
          przyklad: "$\\frac{3}{5}=0{,}6=60\\%$. Jeśli wygrywa $8$ losów na $100$, to $P=\\frac{8}{100}=8\\%$.",
          uwaga: "Prawdopodobieństwo nigdy nie jest większe niż $1$ (czyli $100\\%$).",
        },
      ],
      jak: [
        "Ustal, jakie są wszystkie możliwe wyniki, i policz je ($n$).",
        "Policz wyniki, które nas interesują ($k$).",
        "Zapisz $\\frac{k}{n}$ i skróć ułamek.",
        "Przy pytaniu „nie …” policz $1-P$ albo od razu policz wyniki sprzyjające zdarzeniu przeciwnemu.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Rzucamy raz symetryczną sześcienną kostką do gry. Jakie jest prawdopodobieństwo, że wypadnie liczba oczek większa od $4$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{6}$", "$\\frac{1}{2}$", "$\\frac{1}{3}$", "$\\frac{2}{3}$"],
          poprawna: 2,
        },
        {
          nr: "30",
          tresc: "W pudełku są klocki: $4$ czerwone, $6$ niebieskich i $5$ żółtych. Losujemy jeden klocek. Jakie jest prawdopodobieństwo, że wylosowany klocek nie będzie niebieski? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{2}{5}$", "$\\frac{3}{2}$", "$\\frac{4}{15}$", "$\\frac{3}{5}$"],
          poprawna: 3,
        },
        {
          nr: "31",
          tresc: "W kapeluszu jest $20$ karteczek ponumerowanych kolejnymi liczbami od $1$ do $20$. Losujemy jedną karteczkę. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Prawdopodobieństwo wylosowania liczby parzystej wynosi $\\frac{1}{2}$.", litery: "PF", poprawna: 0 },
            { tekst: "Prawdopodobieństwo wylosowania liczby podzielnej przez $5$ wynosi $\\frac{1}{4}$.", litery: "PF", poprawna: 1 },
            { tekst: "Prawdopodobieństwo wylosowania liczby większej od $20$ wynosi $0$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "32",
          tresc: "Na loterii jest $100$ losów, z czego $8$ wygrywających. Kupujemy jeden los. Jakie jest prawdopodobieństwo wygranej? **Wybierz właściwą odpowiedź.**",
          opcje: ["$92\\%$", "$8\\%$", "$80\\%$", "$\\frac{1}{8}$"],
          poprawna: 1,
        },
        {
          nr: "33",
          tresc: "W pudełku są kulki. Wśród nich są $3$ białe. Prawdopodobieństwo wylosowania białej kulki jest równe $\\frac{1}{4}$. Ile kulek jest w pudełku? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$", "$4$", "$9$", "$7$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 2,
          tresc: "W woreczku jest $12$ kul: $5$ czarnych, $4$ zielone i $3$ białe. Losujemy jedną kulę. Oblicz prawdopodobieństwo, że wylosowana kula: a) będzie zielona, b) nie będzie czarna, c) będzie żółta. **Zapisz obliczenia.**",
          rozwiazanie: "Wszystkich kul jest $12$, więc $n=12$.\n\na) Zielonych jest $4$: $P=\\frac{4}{12}=\\frac{1}{3}$.\n\nb) Kul, które nie są czarne, jest $4+3=7$ (albo $12-5=7$): $P=\\frac{7}{12}$.\n\nc) Żółtych kul nie ma, więc zdarzenie jest niemożliwe: $P=\\frac{0}{12}=0$.\n\nOdpowiedź: a) $\\frac{1}{3}$, b) $\\frac{7}{12}$, c) $0$.",
        },
        {
          nr: "35",
          punkty: 3,
          tresc: "W pudełku jest $4$ kulki czerwone i $6$ niebieskich. Ile czerwonych kulek trzeba dołożyć do pudełka, żeby prawdopodobieństwo wylosowania czerwonej kulki było równe $\\frac{1}{2}$? **Zapisz obliczenia.**",
          rozwiazanie: "Prawdopodobieństwo $\\frac{1}{2}$ oznacza, że czerwonych kulek ma być dokładnie połowa wszystkich, czyli tyle samo, co niebieskich.\n\nNiebieskich jest $6$, więc czerwonych ma być też $6$.\n\nTrzeba dołożyć $6-4=2$ kulki.\n\nSprawdzenie: czerwonych jest $6$, wszystkich $12$, więc $P=\\frac{6}{12}=\\frac{1}{2}$.\n\nOdpowiedź: Trzeba dołożyć $2$ czerwone kulki.",
        },
      ],
      generatory: [
        {
          id: "urna-prawdopodobienstwo",
          nazwa: "Losowanie kulek",
          opis: "W woreczku są kulki albo klocki w kilku kolorach – oblicz prawdopodobieństwo wylosowania wybranego koloru.",
          generuj(r) {
            // kol: [przymiotnik w lp, w mn (2–4), w dopełniaczu mn (5 i więcej)]; rzeczownik: [1, 2–4, 5+]
            const RZ = [
              { gdzie: "W woreczku są:", rz: ["kulka", "kulki", "kulek"], los: "jedną kulkę", wyl: "wylosowana kulka", kol: [["czerwona", "czerwone", "czerwonych"], ["zielona", "zielone", "zielonych"], ["niebieska", "niebieskie", "niebieskich"], ["żółta", "żółte", "żółtych"]] },
              { gdzie: "W pudełku są:", rz: ["klocek", "klocki", "klocków"], los: "jeden klocek", wyl: "wylosowany klocek", kol: [["czerwony", "czerwone", "czerwonych"], ["zielony", "zielone", "zielonych"], ["niebieski", "niebieskie", "niebieskich"], ["żółty", "żółte", "żółtych"]] },
            ];
            const forma = (n, [a, b, c]) => (n === 1 ? a : n >= 2 && n <= 4 ? b : c);
            const o = r.pick(RZ);
            return probuj(() => {
              const il = r.int(3, 4);
              const kol = r.shuffle(o.kol).slice(0, il);
              const licz = Array.from({ length: il }, () => r.int(1, 8));
              const n = sum(licz);
              const tryb = r.int(0, 2);
              const [i, j] = r.shuffle(kol.map((_, t) => t));
              const opis = `${o.gdzie} ${kol.map((c, t) => `$${licz[t]}$ ${forma(licz[t], o.rz)} ${forma(licz[t], c)}`).join(", ")}. Losujemy ${o.los}.`;
              const wszystkie = `Wszystkich jest: $${licz.join(" + ")} = ${n}$.`;
              let k, pyt, kroki;
              if (tryb === 0) {
                k = licz[i];
                pyt = `będzie ${kol[i][0]}`;
                kroki = [wszystkie, `Sprzyjających (${kol[i][2]}) jest $${k}$.`];
              } else if (tryb === 1) {
                k = n - licz[i];
                pyt = `nie będzie ${kol[i][0]}`;
                kroki = [wszystkie, `Wyniki sprzyjające to wszystkie inne: $${n} - ${licz[i]} = ${k}$.`];
              } else {
                k = licz[i] + licz[j];
                pyt = `będzie ${kol[i][0]} lub ${kol[j][0]}`;
                kroki = [wszystkie, `Sprzyjających jest: $${licz[i]} + ${licz[j]} = ${k}$.`];
              }
              const w = q(k, n);
              if (k === n) return null;
              const ulamek = `\\frac{${k}}{${n}}`;
              kroki.push(`$P = ${ulamek}${ulamek === w.tex() ? "" : ` = ${w.tex()}`}$.`);
              return {
                tresc: `${opis} Oblicz prawdopodobieństwo, że ${o.wyl} ${pyt}.`,
                pola: [pole("p", "$P =$")],
                odpowiedz: { p: w },
                wynik: `$P = ${w.tex()}$`,
                rozwiazanie: kroki,
              };
            });
          },
        },
        {
          id: "kostka-i-karteczki",
          nazwa: "Kostka i karteczki",
          opis: "Rzut kostką albo losowanie ponumerowanej karteczki – oblicz prawdopodobieństwo zdarzenia (ułamkiem albo w procentach).",
          generuj(r) {
            const PIERW = [2, 3, 5, 7, 11, 13, 17, 19, 23];
            const kostka = r.chance(0.4);
            const n = kostka ? 6 : r.pick([10, 12, 15, 20, 25]);
            return probuj(() => {
              const d = kostka ? r.pick([2, 3]) : r.pick([3, 4, 5]);
              const kk = r.int(2, n - 2);
              const ZD = [
                { opis: "będzie parzysta", f: (x) => x % 2 === 0 },
                { opis: "będzie nieparzysta", f: (x) => x % 2 === 1 },
                { opis: `będzie podzielna przez $${d}$`, f: (x) => x % d === 0 },
                { opis: `będzie większa od $${kk}$`, f: (x) => x > kk },
                { opis: `będzie mniejsza od $${kk}$`, f: (x) => x < kk },
                { opis: "będzie liczbą pierwszą", f: (x) => PIERW.includes(x) },
              ];
              const z = r.pick(ZD);
              const wyniki = Array.from({ length: n }, (_, t) => t + 1).filter(z.f);
              const k = wyniki.length;
              if (k === 0 || k === n) return null;
              const proc = r.chance(0.4) && [10, 20, 25].includes(n);
              const w = q(k, n);
              const wstep = kostka
                ? "Rzucamy raz symetryczną sześcienną kostką do gry."
                : `W kapeluszu jest $${n}$ karteczek ponumerowanych kolejnymi liczbami od $1$ do $${n}$. Losujemy jedną karteczkę.`;
              const co = kostka ? "liczba wyrzuconych oczek" : "liczba na wylosowanej karteczce";
              const kroki = [
                `Wszystkich możliwych wyników jest $${n}$.`,
                k <= 12 ? `Wyniki sprzyjające: ${lista(wyniki)}, czyli $${k}$ ${k === 1 ? "wynik" : k < 5 ? "wyniki" : "wyników"}.` : `Wyników sprzyjających jest $${k}$.`,
              ];
              const ulamek = `\\frac{${k}}{${n}}`;
              if (proc) {
                const p = q(100 * k, n);
                kroki.push(`$P = ${ulamek} = ${p}\\%$.`);
                return {
                  tresc: `${wstep} Oblicz prawdopodobieństwo, że ${co} ${z.opis}. Podaj wynik w procentach, bez znaku %.`,
                  pola: [pole("p", "Prawdopodobieństwo (w procentach) $=$")],
                  odpowiedz: { p },
                  wynik: `$P = ${p}\\%$`,
                  rozwiazanie: kroki,
                };
              }
              kroki.push(`$P = ${ulamek}${ulamek === w.tex() ? "" : ` = ${w.tex()}`}$.`);
              return {
                tresc: `${wstep} Oblicz prawdopodobieństwo, że ${co} ${z.opis}.`,
                pola: [pole("p", "$P =$")],
                odpowiedz: { p: w },
                wynik: `$P = ${w.tex()}$`,
                rozwiazanie: kroki,
              };
            });
          },
        },
        {
          id: "urna-ile-kulek",
          nazwa: "Ile kulek w pudełku",
          opis: "Znasz liczbę kulek jednego koloru i prawdopodobieństwo ich wylosowania – oblicz, ile kulek jest w pudełku.",
          generuj(r) {
            const KOL = [["białych", "biała"], ["czerwonych", "czerwona"], ["zielonych", "zielona"], ["niebieskich", "niebieska"], ["żółtych", "żółta"]];
            return probuj(() => {
              const [gen, nom] = r.pick(KOL);
              const b = r.int(2, 8);
              const a = r.int(1, b - 1);
              const t = r.int(1, 6);
              if (q(a, b).d !== b) return null;
              const kk = a * t;
              const n = b * t;
              if (n > 60) return null;
              return {
                tresc: `W pudełku są kulki w różnych kolorach. Liczba kulek ${gen} wynosi $${kk}$. Prawdopodobieństwo, że wylosowana kulka będzie ${nom}, jest równe $\\frac{${a}}{${b}}$. Ile kulek jest w pudełku?`,
                pola: [pole("n", "Liczba kulek $=$")],
                odpowiedz: { n: q(n) },
                wynik: `$${n}$`,
                rozwiazanie: [
                  `$P = \\frac{${kk}}{n} = \\frac{${a}}{${b}}$, gdzie $n$ to liczba wszystkich kulek.`,
                  `Kulek ${gen} jest $${kk}$, a to $${a}$ „części” z $${b}$. Wartość jednej części: $${kk} : ${a} = ${t}$.`,
                  `Wszystkich kulek jest $${b} \\cdot ${t} = ${n}$.`,
                ],
              };
            });
          },
        },
      ],
    },
  ],
};
