// Klasa 7 (szkoła podstawowa) · rozdział I „Proporcjonalność i procenty” – Matematyka z kluczem 7 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Bez rysunków i bez równań z niewiadomą (te są dalej w klasie 7): zadania rozwiązujemy przez „ile wynosi 1” i „ile wynosi 1%”.
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

function nwd(a, b) {
  while (b) [a, b] = [b, a % b];
  return Math.abs(a);
}

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

/** „Ładny” wynik dla ucznia klasy 7 bez kalkulatora: liczba całkowita albo z częścią 0,5 / 0,25 / 0,2 / 0,1. */
const ladna = (v, dozwolone = [1, 2]) => dozwolone.includes(v.d);

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });
const ulamek = (a, b) => `\\frac{${a}}{${b}}`;

/** Powtarza losowanie, aż f() zwróci zadanie (wartość różną od null); f używa tego samego losownika, więc wynik jest powtarzalny. */
function probuj(f, proby = 2000) {
  for (let i = 0; i < proby; i++) {
    const w = f();
    if (w) return w;
  }
  throw new Error("Nie udało się wylosować zadania");
}

// --- Dane do generatorów

const CENY = [
  { t: (a, b, c) => `$${a}$ kg jabłek kosztuje $${b}$ zł. Ile złotych zapłacimy za $${c}$ kg takich jabłek?`, jedn: "Jeden kilogram kosztuje", unit: "zł", lo: 2, hi: 12 },
  { t: (a, b, c) => `Rowerzysta jedzie ze stałą prędkością. W ciągu $${a}$ h przejechał $${b}$ km. Ile kilometrów przejedzie w ciągu $${c}$ h?`, jedn: "W ciągu jednej godziny rowerzysta przejeżdża", unit: "km", lo: 12, hi: 25 },
  { t: (a, b, c) => `Z kranu płynie woda ze stałą szybkością. W ciągu $${a}$ min wypłynęło $${b}$ l. Ile litrów wypłynie w ciągu $${c}$ min?`, jedn: "W ciągu jednej minuty wypływa", unit: "l", lo: 3, hi: 12 },
  { t: (a, b, c) => `Maszyna pakuje cukier ze stałą szybkością. W ciągu $${a}$ min zapakowała $${b}$ kg cukru. Ile kilogramów cukru zapakuje w ciągu $${c}$ min?`, jedn: "W ciągu jednej minuty maszyna pakuje", unit: "kg", lo: 4, hi: 20 },
  { t: (a, b, c) => `$${a}$ m wstążki kosztuje $${b}$ zł. Ile złotych zapłacimy za $${c}$ m takiej wstążki?`, jedn: "Jeden metr wstążki kosztuje", unit: "zł", lo: 3, hi: 15 },
];

const PRZEPISY = [
  { skl: "mąki", unit: "g", p: "Przepis na naleśniki dla" },
  { skl: "cukru", unit: "g", p: "Przepis na ciasto dla" },
  { skl: "ryżu", unit: "g", p: "Przepis na zapiekankę dla" },
  { skl: "mleka", unit: "ml", p: "Przepis na budyń dla" },
  { skl: "makaronu", unit: "g", p: "Przepis na zupę dla" },
];

const RZECZY = ["kurtki", "roweru", "plecaka", "gry komputerowej", "butów"];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Proporcjonalność prosta
    {
      id: "proporcjonalnosc",
      nazwa: "Proporcjonalność prosta",
      sciaga: [
        {
          nazwa: "Wielkości proporcjonalne",
          slownie: "Dwie wielkości są wprost proporcjonalne, gdy ile razy rośnie jedna, tyle razy rośnie druga. Dwa razy więcej towaru – dwa razy większa cena.",
          przyklad: "Jedna bułka kosztuje $2$ zł. Trzy bułki kosztują $3\\cdot 2=6$ zł, a sześć bułek $12$ zł. Liczba bułek rośnie $2$ razy (z $3$ na $6$) i cena też rośnie $2$ razy (z $6$ na $12$).",
          uwaga: "Nie każde dwie wielkości, które rosną razem, są proporcjonalne. Dziecko z wiekiem rośnie, ale w wieku $10$ lat nie jest dwa razy wyższe niż w wieku $5$ lat.",
        },
        {
          nazwa: "Iloraz stały",
          slownie: "Gdy wielkości są wprost proporcjonalne, to po podzieleniu jednej przez drugą zawsze wychodzi ta sama liczba. Ta liczba mówi, ile przypada na jedną sztukę (jedną godzinę, jeden metr).",
          tex: "\\frac{\\text{cena}}{\\text{ilość}}=\\text{stała}",
          przyklad: "$4$ zeszyty kosztują $12$ zł, a $7$ zeszytów $21$ zł. Sprawdzamy: $12:4=3$ i $21:7=3$. Za każdy zeszyt płacimy $3$ zł, więc wielkości są proporcjonalne.",
        },
        {
          nazwa: "Przez jedność",
          slownie: "Najpierw liczymy, ile przypada na jedną sztukę: dzielimy. Potem liczymy dla potrzebnej ilości: mnożymy.",
          tex: "\\text{na 1}=\\text{razem}:\\text{ile}\\qquad\\text{na }n=n\\cdot\\text{na 1}",
          litery: "$n$ – ile sztuk (godzin, metrów) nas interesuje.",
          przyklad: "$5$ kg ziemniaków kosztuje $15$ zł. Jeden kilogram: $15:5=3$ zł. Osiem kilogramów: $8\\cdot 3=24$ zł.",
          uwaga: "Nie dodawaj tej samej liczby do obu wielkości. Jeśli $5$ kg kosztuje $15$ zł, to $8$ kg wcale nie kosztuje $15+3=18$ zł.",
        },
        {
          nazwa: "Proporcja",
          slownie: "Dwa takie same ilorazy (ułamki) tworzą proporcję. W prawdziwej proporcji iloczyny „na krzyż” są równe.",
          tex: "\\frac{a}{b}=\\frac{c}{d}\\qquad a\\cdot d=b\\cdot c",
          litery: "$a$, $b$, $c$, $d$ – liczby w proporcji.",
          przyklad: "$\\frac{3}{12}=\\frac{5}{20}$, bo $3\\cdot 20=60$ i $12\\cdot 5=60$. Obie strony to po prostu $\\frac{1}{4}$.",
          uwaga: "Gdy jedna wielkość rośnie, a druga maleje (więcej osób – krócej trwa praca), to nie jest proporcjonalność prosta.",
        },
      ],
      jak: [
        "Sprawdź, czy wielkości są proporcjonalne: ile razy więcej jednej, tyle razy więcej drugiej (stała cena, stała prędkość, stały przepis).",
        "Wypisz dane obok siebie, np. $5$ kg $\\to$ $15$ zł.",
        "Policz, ile wynosi jedna sztuka: podziel.",
        "Pomnóż przez potrzebną ilość. Sprawdź, czy wynik ma sens (więcej towaru – większa cena).",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "$5$ kg jabłek kosztuje $20$ zł. Ile kosztuje $8$ kg takich jabłek? **Wybierz właściwą odpowiedź.**",
          opcje: ["$25$ zł", "$32$ zł", "$40$ zł", "$160$ zł"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "W której sytuacji wielkości są wprost proporcjonalne? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "Wiek dziecka i jego wzrost.",
            "Liczba kranów napełniających basen i czas napełniania basenu.",
            "Liczba kupionych biletów po $15$ zł i zapłacona kwota.",
            "Numer buta i wiek jego właściciela.",
          ],
          poprawna: 2,
        },
        {
          nr: "3",
          tresc: "Samochód jedzie ze stałą prędkością i w ciągu $3$ godzin pokonuje $210$ km. Ile kilometrów pokona w ciągu $5$ godzin? **Wybierz właściwą odpowiedź.**",
          opcje: ["$215$ km", "$280$ km", "$630$ km", "$350$ km"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "Przepis na $4$ porcje naleśników: $200$ g mąki, $2$ jajka i $400$ ml mleka. Zosia chce zrobić $6$ porcji z tego samego przepisu. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Zosia potrzebuje $300$ g mąki.", litery: "PF", poprawna: 0 },
            { tekst: "Zosia potrzebuje $4$ jajek.", litery: "PF", poprawna: 1 },
            { tekst: "Zosia potrzebuje $600$ ml mleka.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "5",
          tresc: "Która proporcja jest prawdziwa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{3}{4}=\\frac{9}{16}$", "$\\frac{5}{2}=\\frac{10}{5}$", "$\\frac{2}{3}=\\frac{8}{12}$", "$\\frac{6}{9}=\\frac{3}{4}$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Za $6$ biletów do kina zapłacono $90$ zł. Ile kosztuje jeden bilet? Ile zapłacimy za $11$ takich biletów? **Zapisz obliczenia.**",
          rozwiazanie: "Jeden bilet kosztuje $90:6=15$ zł.\n\nZa $11$ biletów zapłacimy $11\\cdot 15=165$ zł.\n\nOdpowiedź: Jeden bilet kosztuje $15$ zł, a $11$ biletów kosztuje $165$ zł.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Na $8$ porcji sałatki potrzeba $600$ g warzyw i $200$ g sera. Ile gramów warzyw i ile gramów sera potrzeba na $20$ porcji tej sałatki? **Zapisz obliczenia.**",
          rozwiazanie: "Na jedną porcję potrzeba $600:8=75$ g warzyw i $200:8=25$ g sera.\n\nNa $20$ porcji potrzeba $20\\cdot 75=1500$ g warzyw.\n\nNa $20$ porcji potrzeba też $20\\cdot 25=500$ g sera.\n\nOdpowiedź: Na $20$ porcji potrzeba $1500$ g warzyw i $500$ g sera.",
        },
      ],
      generatory: [
        {
          id: "ile-kosztuje",
          nazwa: "Przez jedność",
          opis: "Znasz ilość i cenę (drogę, liczbę stron) – oblicz, ile będzie dla innej ilości. Najpierw jedna sztuka, potem mnożenie.",
          generuj(r) {
            const k = r.pick(CENY);
            return probuj(() => {
              const a = r.int(2, 8);
              const u = r.int(k.lo, k.hi);
              const c = r.int(2, 12);
              if (c === a) return null;
              const b = a * u;
              const w = c * u;
              return {
                tresc: k.t(a, b, c),
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$ ${k.unit}`,
                rozwiazanie: [
                  `Najpierw liczymy, ile przypada na jedną sztukę (godzinę, metr, minutę). ${k.jedn} $${b} : ${a} = ${u}$ ${k.unit}.`,
                  `Teraz mnożymy przez $${c}$: $${c} \\cdot ${u} = ${w}$ ${k.unit}.`,
                ],
              };
            });
          },
        },
        {
          id: "przepis",
          nazwa: "Przepis dla innej liczby osób",
          opis: "Przepis jest podany dla kilku osób – oblicz, ile składnika potrzeba dla innej liczby osób.",
          generuj(r) {
            const k = r.pick(PRZEPISY);
            return probuj(() => {
              const a = r.pick([2, 4, 5, 6, 8, 10]);
              const b = r.int(2, 20);
              if (b === a) return null;
              const m = 50 * r.int(2, 14);
              const naJedna = q(m, a);
              const w = naJedna.mul(b);
              if (!ladna(naJedna) || !ladna(w)) return null;
              return {
                tresc: `${k.p} $${a}$ osób wymaga $${m}$ ${k.unit} ${k.skl}. Ile ${k.unit} ${k.skl} potrzeba według tego przepisu dla $${b}$ osób?`,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w },
                wynik: `$${dz(w)}$ ${k.unit}`,
                rozwiazanie: [
                  `Dla jednej osoby: $${m} : ${a} = ${dz(naJedna)}$ ${k.unit}.`,
                  `Dla $${b}$ osób: $${b} \\cdot ${dz(naJedna)} = ${dz(w)}$ ${k.unit}.`,
                ],
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Ułamek liczby
    {
      id: "ulamek-liczby",
      nazwa: "Ułamek liczby",
      sciaga: [
        {
          nazwa: "Ułamek danej liczby",
          slownie: "Liczbę dzielimy przez mianownik (dostajemy jedną część), a potem mnożymy przez licznik (bierzemy tyle części, ile mówi licznik).",
          tex: "\\frac{a}{b}\\text{ z }N=N:b\\cdot a",
          litery: "$N$ – dana liczba, $a$ – licznik, $b$ – mianownik.",
          przyklad: "$\\frac{3}{4}$ z $20$ zł: $20:4=5$ zł to jedna czwarta, a trzy czwarte to $3\\cdot 5=15$ zł.",
          uwaga: "Nie zapomnij o liczniku. $\\frac{1}{4}$ z $20$ to $5$, ale $\\frac{3}{4}$ z $20$ to już $15$.",
        },
        {
          nazwa: "Jaką częścią jest liczba",
          slownie: "Aby zapisać, jaką częścią jednej liczby jest druga, piszemy ułamek: na górze część, na dole całość. Potem skracamy.",
          tex: "\\frac{\\text{część}}{\\text{całość}}",
          przyklad: "W klasie jest $24$ uczniów, a $9$ z nich ma rower. To $\\frac{9}{24}=\\frac{3}{8}$ klasy.",
          uwaga: "Całość zawsze w mianowniku. Nie zapisuj $\\frac{24}{9}$, bo część nie może być większa niż całość.",
        },
        {
          nazwa: "Liczba z jej ułamka",
          slownie: "Gdy znamy część liczby, dzielimy ją przez licznik – tak dostajemy jedną część. Potem mnożymy przez mianownik – tak dostajemy całość.",
          tex: "N=\\text{część}:a\\cdot b",
          litery: "$a$ – licznik, $b$ – mianownik ułamka.",
          przyklad: "$\\frac{2}{5}$ pewnej liczby to $18$. Jedna piąta: $18:2=9$. Cała liczba: $5\\cdot 9=45$. Sprawdzenie: $\\frac{2}{5}$ z $45$ to $2\\cdot 9=18$.",
          uwaga: "Nie licz $\\frac{2}{5}$ z $18$ – ta $18$ to już część, a nie całość.",
        },
        {
          nazwa: "Ile zostało",
          slownie: "Całość to $\\frac{b}{b}$, czyli $1$. Gdy zabierzemy część, zostaje reszta. Można policzyć ułamek reszty albo odjąć to, co zabrano.",
          przyklad: "Z $40$ zł wydano $\\frac{3}{8}$. Wydano $40:8\\cdot 3=15$ zł, więc zostało $40-15=25$ zł. Zostało $\\frac{5}{8}$ kwoty: $40:8\\cdot 5=25$ zł.",
        },
      ],
      jak: [
        "Zdecyduj: czy znasz całość, czy część?",
        "Całość znana, szukasz części: podziel całość przez mianownik i pomnóż przez licznik.",
        "Część znana, szukasz całości: podziel część przez licznik i pomnóż przez mianownik.",
        "Sprawdź: część musi być mniejsza od całości (dla ułamka mniejszego od $1$).",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Ile wynosi $\\frac{3}{5}$ liczby $45$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$", "$15$", "$27$", "$75$"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Ala miała $60$ zł. Wydała $\\frac{2}{5}$ tej kwoty na książkę. Ile złotych jej zostało? **Wybierz właściwą odpowiedź.**",
          opcje: ["$36$ zł", "$24$ zł", "$12$ zł", "$40$ zł"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "W klasie jest $28$ uczniów, a $7$ z nich jedzie na wycieczkę rowerem. Jaką częścią klasy są ci uczniowie? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{7}$", "$\\frac{1}{3}$", "$\\frac{21}{28}$", "$\\frac{1}{4}$"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "$\\frac{3}{8}$ pewnej liczby to $12$. Jaka to liczba? **Wybierz właściwą odpowiedź.**",
          opcje: ["$36$", "$32$", "$4{,}5$", "$20$"],
          poprawna: 1,
        },
        {
          nr: "12",
          tresc: "Turysta ma do przejścia $36$ km. Pierwszego dnia przeszedł $\\frac{1}{3}$ trasy, a drugiego dnia $\\frac{1}{4}$ trasy. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Pierwszego dnia turysta przeszedł $12$ km.", litery: "PF", poprawna: 0 },
            { tekst: "Drugiego dnia turysta przeszedł $9$ km.", litery: "PF", poprawna: 0 },
            { tekst: "Po dwóch dniach zostało mu do przejścia $20$ km.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "W sadzie rośnie $72$ drzewa. Jabłonie to $\\frac{5}{8}$ wszystkich drzew, wiśnie to $\\frac{1}{6}$ wszystkich drzew, a pozostałe drzewa to grusze. Ile jest gruszy? **Zapisz obliczenia.**",
          rozwiazanie: "Jabłonie: $72:8=9$, więc $5\\cdot 9=45$ drzew.\n\nWiśnie: $72:6=12$ drzew.\n\nJabłonie i wiśnie razem: $45+12=57$ drzew.\n\nGrusze: $72-57=15$.\n\nOdpowiedź: W sadzie jest $15$ gruszy.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Karol przeczytał $\\frac{3}{7}$ książki, czyli $90$ stron. Ile stron ma cała książka? Ile stron zostało mu do przeczytania? **Zapisz obliczenia.**",
          rozwiazanie: "$\\frac{3}{7}$ książki to $90$ stron, więc $\\frac{1}{7}$ książki to $90:3=30$ stron.\n\nCała książka to $7\\cdot 30=210$ stron.\n\nDo przeczytania zostało $210-90=120$ stron.\n\nOdpowiedź: Książka ma $210$ stron, a do przeczytania zostało $120$ stron.",
        },
      ],
      generatory: [
        {
          id: "ulamek-z-liczby",
          nazwa: "Ułamek liczby",
          opis: "Oblicz ułamek danej liczby albo odwrotnie: znasz część i ułamek, a szukasz całości.",
          generuj(r) {
            const b = r.pick([3, 4, 5, 6, 8, 10]);
            const a = probuj(() => {
              const x = r.int(2, b - 1);
              return x < b && nwd(x, b) === 1 ? x : null;
            });
            const k = r.int(2, 12);
            const N = b * k;
            const P = a * k;
            const u = ulamek(a, b);
            if (r.chance()) {
              const t = r.pick([
                `Ala miała $${N}$ zł. Wydała $${u}$ tej kwoty. Ile złotych wydała?`,
                `W klasie jest $${N}$ uczniów. $${u}$ z nich ma rower. Ilu uczniów ma rower?`,
                `Trasa wycieczki ma $${N}$ km. Turyści przeszli $${u}$ trasy. Ile kilometrów przeszli?`,
                `Butelka mieści $${N}$ ml soku. Wypito $${u}$ soku. Ile mililitrów soku wypito?`,
              ]);
              return {
                tresc: t,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(P) },
                wynik: `$${P}$`,
                rozwiazanie: [
                  `Dzielimy przez mianownik, żeby dostać jedną część: $${N} : ${b} = ${k}$.`,
                  `Mnożymy przez licznik: $${a} \\cdot ${k} = ${P}$.`,
                ],
              };
            }
            const t = r.pick([
              `Tomek przeczytał $${u}$ książki. Liczba przeczytanych przez niego stron to $${P}$. Ile stron ma cała książka?`,
              `$${u}$ uczniów szkoły, czyli $${P}$ uczniów, jedzie na wycieczkę. Ilu uczniów jest w szkole?`,
              `Ula zaoszczędziła $${P}$ zł, czyli $${u}$ ceny roweru. Ile złotych kosztuje rower?`,
              `Kuba przejechał $${P}$ km, czyli $${u}$ całej trasy. Ile kilometrów ma cała trasa?`,
            ]);
            return {
              tresc: t,
              pola: [pole("w", "Cała liczba $=$")],
              odpowiedz: { w: q(N) },
              wynik: `$${N}$`,
              rozwiazanie: [
                `Dzielimy część przez licznik, żeby dostać jedną część: $${P} : ${a} = ${k}$.`,
                `Mnożymy przez mianownik, bo całość to $${b}$ takich części: $${b} \\cdot ${k} = ${N}$.`,
              ],
            };
          },
        },
        {
          id: "jaka-czesc",
          nazwa: "Jaką częścią jest liczba",
          opis: "Zapisz, jaką częścią całości jest dana liczba. Wynik podaj jako ułamek nieskracalny (np. 3/8).",
          generuj(r) {
            return probuj(() => {
              const N = r.pick([12, 15, 16, 18, 20, 24, 25, 30, 32, 36, 40]);
              const k = r.int(2, N - 2);
              const reszta = r.chance();
              const wynik = reszta ? q(N - k, N) : q(k, N);
              if (wynik.calkowita) return null;
              const co = r.pick(["ma psa", "gra w szachy", "jedzie na basen", "chodzi na zajęcia teatralne"]);
              const tresc = reszta
                ? `W klasie jest $${N}$ uczniów. Wcześniej do domu poszło $${k}$ uczniów. Jaką częścią klasy są uczniowie, którzy zostali? Podaj ułamek nieskracalny.`
                : `W klasie jest $${N}$ uczniów, a $${k}$ z nich ${co}. Jaką częścią klasy są ci uczniowie? Podaj ułamek nieskracalny.`;
              const cz = reszta ? N - k : k;
              const kroki = reszta
                ? [`Zostało $${N} - ${k} = ${N - k}$ uczniów, a całość to $${N}$.`, `Zapisujemy ułamek: $${ulamek(N - k, N)}$.`]
                : [`Część to $${k}$ uczniów, całość to $${N}$ uczniów.`, `Zapisujemy ułamek: $${ulamek(k, N)}$.`];
              if (nwd(cz, N) > 1) kroki.push(`Skracamy ułamek przez $${nwd(cz, N)}$: $${ulamek(cz, N)} = ${wynik.tex()}$.`);
              return {
                tresc,
                pola: [pole("w", "Ułamek $=$")],
                odpowiedz: { w: wynik },
                wynik: `$${wynik.tex()}$`,
                rozwiazanie: kroki,
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Co to jest procent, procent danej liczby
    {
      id: "co-to-procent",
      nazwa: "Co to jest procent. Procent danej liczby",
      sciaga: [
        {
          nazwa: "Procent",
          slownie: "Procent to jedna setna całości. Cała całość to $100\\%$, a jej połowa to $50\\%$.",
          tex: "1\\%=\\frac{1}{100}=0{,}01",
          przyklad: "$1\\%$ z $300$ zł to $300:100=3$ zł. Cała kwota to $100\\%$, czyli $300$ zł, a połowa to $50\\%$, czyli $150$ zł.",
          uwaga: "$30\\%$ klasy to $30$ osób tylko wtedy, gdy w klasie jest $100$ osób. Procent to część całości, a nie liczba sztuk.",
        },
        {
          nazwa: "Procent jako ułamek",
          slownie: "Każdy procent możemy zapisać jako ułamek o mianowniku $100$ i jako ułamek dziesiętny. Ułamek zwykły warto skrócić.",
          tex: "p\\%=\\frac{p}{100}",
          litery: "$p$ – liczba procent.",
          przyklad: "$35\\%=\\frac{35}{100}=\\frac{7}{20}=0{,}35$. Odwrotnie: $\\frac{3}{5}=\\frac{60}{100}=60\\%$.",
        },
        {
          nazwa: "Procenty, które warto znać",
          slownie: "Kilka procentów to bardzo znane ułamki. Dzięki nim liczymy w pamięci.",
          tex: "50\\%=\\frac{1}{2}\\qquad25\\%=\\frac{1}{4}\\qquad75\\%=\\frac{3}{4}\\qquad10\\%=\\frac{1}{10}\\qquad20\\%=\\frac{1}{5}",
          przyklad: "$25\\%$ z $80$ zł to jedna czwarta: $80:4=20$ zł. $10\\%$ z $80$ zł to $80:10=8$ zł.",
          uwaga: "$10\\%$ liczby to dzielenie przez $10$, a nie odejmowanie $10$.",
        },
        {
          nazwa: "Procent danej liczby",
          slownie: "Najpierw liczymy $1\\%$: dzielimy liczbę przez $100$. Potem mnożymy przez liczbę procent.",
          tex: "p\\%\\text{ z }N=N:100\\cdot p",
          litery: "$N$ – dana liczba (całość), $p$ – liczba procent.",
          przyklad: "$35\\%$ z $80$: $1\\%$ to $80:100=0{,}8$, więc $35\\%$ to $35\\cdot 0{,}8=28$.",
        },
        {
          nazwa: "Jaki to procent",
          slownie: "Zapisujemy ułamek „część przez całość”, a potem zamieniamy go na ułamek o mianowniku $100$.",
          tex: "\\frac{\\text{część}}{\\text{całość}}=\\frac{p}{100}",
          przyklad: "$9$ zł z $36$ zł: $\\frac{9}{36}=\\frac{1}{4}=\\frac{25}{100}=25\\%$.",
          uwaga: "Całość to liczba, z którą porównujemy, i zawsze jest w mianowniku.",
        },
      ],
      jak: [
        "Ustal, co jest całością ($100\\%$), a co częścią.",
        "Szukasz części: policz $1\\%$ całości (podziel przez $100$) i pomnóż przez liczbę procent. Albo zamień procent na prosty ułamek.",
        "Szukasz procentu: zapisz ułamek część przez całość i zamień go na mianownik $100$.",
        "Sprawdź, czy wynik ma sens: $50\\%$ to połowa, $100\\%$ to całość.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Ile wynosi $15\\%$ z $200$ zł? **Wybierz właściwą odpowiedź.**",
          opcje: ["$15$ zł", "$30$ zł", "$185$ zł", "$3000$ zł"],
          poprawna: 1,
        },
        {
          nr: "16",
          tresc: "Ile procent to ułamek $\\frac{7}{20}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7\\%$", "$20\\%$", "$35\\%$", "$3{,}5\\%$"],
          poprawna: 2,
        },
        {
          nr: "17",
          tresc: "W klasie jest $25$ uczniów, a $40\\%$ z nich to chłopcy. Ile dziewcząt jest w tej klasie? **Wybierz właściwą odpowiedź.**",
          opcje: ["$15$", "$10$", "$60$", "$35$"],
          poprawna: 0,
        },
        {
          nr: "18",
          tresc: "Jaki procent kwoty $72$ zł stanowi kwota $18$ zł? **Wybierz właściwą odpowiedź.**",
          opcje: ["$18\\%$", "$4\\%$", "$25\\%$", "$54\\%$"],
          poprawna: 2,
        },
        {
          nr: "19",
          tresc: "W sklepie sportowym było $80$ piłek. Piłki do siatkówki to $25\\%$ wszystkich piłek, a piłki do koszykówki to $10\\%$ wszystkich piłek. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Piłek do siatkówki było $25$.", litery: "PF", poprawna: 1 },
            { tekst: "Piłek do koszykówki było $8$.", litery: "PF", poprawna: 0 },
            { tekst: "Pozostałych piłek było $52$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "W kinie jest $120$ miejsc. Na seans sprzedano bilety na $45\\%$ miejsc. Ile biletów sprzedano? Ile miejsc zostało wolnych? **Zapisz obliczenia.**",
          rozwiazanie: "$1\\%$ miejsc to $120:100=1{,}2$.\n\nSprzedano $45\\%$ miejsc, czyli $45\\cdot 1{,}2=54$ bilety.\n\nWolnych miejsc zostało $120-54=66$.\n\nOdpowiedź: Sprzedano $54$ bilety, a wolnych miejsc zostało $66$.",
        },
        {
          nr: "21",
          punkty: 2,
          tresc: "W sklepie jest $40$ koszulek, a $14$ z nich jest niebieskich. Jaki procent koszulek jest niebieskich? Jaki procent koszulek ma inny kolor? **Zapisz obliczenia.**",
          rozwiazanie: "Niebieskie koszulki to ułamek $\\frac{14}{40}=\\frac{7}{20}$ wszystkich.\n\nZapisujemy go z mianownikiem $100$: $\\frac{7}{20}=\\frac{35}{100}=35\\%$.\n\nWszystkie koszulki to $100\\%$, więc pozostałe to $100\\%-35\\%=65\\%$.\n\nOdpowiedź: Niebieskich koszulek jest $35\\%$, a koszulek w innym kolorze $65\\%$.",
        },
      ],
      generatory: [
        {
          id: "procent-ulamek",
          nazwa: "Procent i ułamek",
          opis: "Zamień procent na ułamek zwykły lub dziesiętny, ułamek na procent albo oblicz, jaki procent całości stanowi część.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const p = r.pick([4, 5, 8, 10, 12, 15, 16, 20, 24, 25, 30, 35, 36, 40, 45, 48, 60, 64, 65, 70, 75, 80, 85, 90, 95]);
              const w = q(p, 100);
              return {
                tresc: `Zapisz $${p}\\%$ w postaci ułamka zwykłego nieskracalnego.`,
                pola: [pole("w", "Ułamek $=$")],
                odpowiedz: { w },
                wynik: `$${w.tex()}$`,
                rozwiazanie: [`$${p}\\% = ${ulamek(p, 100)}$.`, `Skracamy ułamek: $${ulamek(p, 100)} = ${w.tex()}$.`],
              };
            }
            if (tryb === 1) {
              const p = r.pick([3, 4, 6, 7, 8, 12, 15, 18, 25, 32, 35, 45, 56, 64, 72, 85, 96]);
              const w = q(p, 100);
              return {
                tresc: `Zapisz $${p}\\%$ w postaci ułamka dziesiętnego.`,
                pola: [pole("w", "Ułamek dziesiętny $=$")],
                odpowiedz: { w },
                wynik: `$${dz(w)}$`,
                rozwiazanie: [`$${p}\\% = ${ulamek(p, 100)}$, czyli $${p}$ setnych.`, `Zapis dziesiętny: $${dz(w)}$.`],
              };
            }
            if (tryb === 2) {
              return probuj(() => {
                const b = r.pick([2, 4, 5, 10, 20, 25, 50]);
                const a = r.int(1, b - 1);
                if (nwd(a, b) !== 1) return null;
                const m = 100 / b;
                const p = a * m;
                return {
                  tresc: `Zamień ułamek $${ulamek(a, b)}$ na procent. Podaj liczbę bez znaku %.`,
                  pola: [pole("p", "Procent $=$")],
                  odpowiedz: { p: q(p) },
                  wynik: `$${p}\\%$`,
                  rozwiazanie: [
                    `Rozszerzamy ułamek tak, żeby mianownik wynosił $100$: $${b} \\cdot ${m} = 100$.`,
                    `$${ulamek(a, b)} = ${ulamek(`${a} \\cdot ${m}`, `${b} \\cdot ${m}`)} = ${ulamek(p, 100)} = ${p}\\%$.`,
                  ],
                };
              });
            }
            return probuj(() => {
              const N = r.pick([20, 25, 40, 50, 80, 200]);
              const k = r.int(1, N - 1);
              const p = q(100 * k, N);
              if (!p.calkowita) return null;
              const t = r.pick([
                `W klasie jest $${N}$ uczniów, a $${k}$ z nich jedzie na wycieczkę. Jaki procent klasy stanowią ci uczniowie? Podaj liczbę bez znaku %.`,
                `W pudełku jest $${N}$ kredek. Czerwonych kredek jest $${k}$. Jaki procent wszystkich kredek stanowią czerwone? Podaj liczbę bez znaku %.`,
                `Ola ma $${N}$ zł. Wydała $${k}$ zł. Jaki procent swoich pieniędzy wydała? Podaj liczbę bez znaku %.`,
              ]);
              return {
                tresc: t,
                pola: [pole("p", "Procent $=$")],
                odpowiedz: { p },
                wynik: `$${p}\\%$`,
                rozwiazanie: [
                  `Część to $${k}$, całość to $${N}$: $${ulamek(k, N)}$.`,
                  `Zapisujemy ułamek z mianownikiem $100$: $${ulamek(k, N)} = ${ulamek(p.n, 100)} = ${p.n}\\%$.`,
                ],
              };
            });
          },
        },
        {
          id: "procent-liczby",
          nazwa: "Procent liczby",
          opis: "Oblicz, ile wynosi dany procent liczby: najpierw 1%, potem mnożenie.",
          generuj(r) {
            const KONT = [
              { t: (N, p) => `Kurtka kosztuje $${N}$ zł. Zniżka wynosi $${p}\\%$ ceny. Ile złotych wynosi zniżka?`, calk: false },
              { t: (N, p) => `W szkole jest $${N}$ uczniów. $${p}\\%$ z nich jeździ do szkoły rowerem. Ilu uczniów jeździ rowerem?`, calk: true },
              { t: (N, p) => `Książka ma $${N}$ stron. Jacek przeczytał $${p}\\%$ stron. Ile stron przeczytał?`, calk: true },
              { t: (N, p) => `Trasa rajdu ma $${N}$ km. Uczestnicy przejechali $${p}\\%$ trasy. Ile kilometrów przejechali?`, calk: false },
              { t: (N, p) => `W butelce jest $${N}$ ml soku. Wypito $${p}\\%$ soku. Ile mililitrów soku wypito?`, calk: false },
            ];
            const k = r.pick(KONT);
            return probuj(() => {
              const N = r.pick([20, 40, 60, 80, 120, 150, 200, 240, 250, 300, 400, 500]);
              const p = r.pick([5, 10, 12, 15, 20, 25, 30, 35, 40, 45, 60, 65, 70, 75, 80, 90]);
              const jeden = q(N, 100);
              const w = jeden.mul(p);
              if (!ladna(w, k.calk ? [1] : [1, 2])) return null;
              return {
                tresc: k.t(N, p),
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w },
                wynik: `$${dz(w)}$`,
                rozwiazanie: [
                  `$1\\%$ to $${N} : 100 = ${dz(jeden)}$.`,
                  `$${p}\\%$ to $${p} \\cdot ${dz(jeden)} = ${dz(w)}$.`,
                ],
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Wyznaczanie liczby, gdy dany jest jej procent
    {
      id: "liczba-z-procentu",
      nazwa: "Wyznaczanie liczby, gdy dany jest jej procent",
      sciaga: [
        {
          nazwa: "Liczba z jej procentu",
          slownie: "Gdy znamy, ile wynosi $p\\%$ liczby, najpierw liczymy $1\\%$: dzielimy przez $p$. Potem liczymy $100\\%$: mnożymy przez $100$.",
          tex: "1\\%=\\text{część}:p\\qquad100\\%=1\\%\\cdot100",
          litery: "$p$ – liczba procent, której wartość znamy.",
          przyklad: "$30\\%$ liczby to $12$. Wtedy $1\\%$ to $12:30=0{,}4$, a $100\\%$ to $0{,}4\\cdot 100=40$. Sprawdzenie: $30\\%$ z $40$ to $12$.",
        },
        {
          nazwa: "Część czy całość",
          slownie: "Zawsze zapytaj: czy znana liczba to całość, czy część? Gdy znasz część (np. $20\\%$ liczby), całość jest od niej większa.",
          przyklad: "„$20\\%$ liczby to $14$” – liczba $14$ to część, więc szukana liczba jest większa: $14:20=0{,}7$, a $0{,}7\\cdot 100=70$.",
          uwaga: "Nie licz $20\\%$ z $14$. To dałoby $2{,}8$ – za mało, bo $14$ jest tylko częścią całości.",
        },
        {
          nazwa: "Skróty dla ładnych procentów",
          slownie: "Gdy procent jest prosty, całość znajdziemy szybko: $50\\%$ to połowa, więc mnożymy przez $2$. $25\\%$ to ćwierć, więc mnożymy przez $4$. $10\\%$ to jedna dziesiąta, więc mnożymy przez $10$.",
          tex: "50\\%\\to\\cdot2\\qquad25\\%\\to\\cdot4\\qquad10\\%\\to\\cdot10\\qquad20\\%\\to\\cdot5",
          przyklad: "$25\\%$ liczby to $15$, więc cała liczba to $15\\cdot 4=60$.",
        },
        {
          nazwa: "Tabelka procentów",
          slownie: "Zapisz procenty z lewej, a liczby z prawej. Dzielimy lub mnożymy obie liczby w wierszach przez to samo, aż dojdziemy do $100\\%$.",
          tex: "\\begin{array}{c|c}\\text{procent}&\\text{zł}\\\\\\hline 15\\%&45\\\\5\\%&15\\\\100\\%&300\\end{array}",
          przyklad: "Ola odłożyła $45$ zł, czyli $15\\%$ kwoty na rower. $15\\%:3=5\\%$ i $45:3=15$. Teraz $5\\%\\cdot 20=100\\%$ i $15\\cdot 20=300$. Rower kosztuje $300$ zł.",
        },
      ],
      jak: [
        "Zapisz: „$p\\%$ całości to część”.",
        "Policz $1\\%$: podziel część przez $p$.",
        "Policz $100\\%$: pomnóż wynik przez $100$.",
        "Sprawdź: policz $p\\%$ z otrzymanej całości – powinna wyjść znana część.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "$20\\%$ pewnej liczby to $14$. Jaka to liczba? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2{,}8$", "$34$", "$70$", "$280$"],
          poprawna: 2,
        },
        {
          nr: "23",
          tresc: "Ola kupiła książkę ze zniżką $25\\%$. Zniżka wyniosła $12$ zł. Ile kosztowała książka przed obniżką? **Wybierz właściwą odpowiedź.**",
          opcje: ["$48$ zł", "$3$ zł", "$37$ zł", "$300$ zł"],
          poprawna: 0,
        },
        {
          nr: "24",
          tresc: "Na wycieczkę jedzie $45$ uczniów, czyli $30\\%$ wszystkich uczniów szkoły. Ilu uczniów uczy się w tej szkole? **Wybierz właściwą odpowiedź.**",
          opcje: ["$13{,}5$", "$75$", "$135$", "$150$"],
          poprawna: 3,
        },
        {
          nr: "25",
          tresc: "$75\\%$ długości drogi to $15$ km. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Cała droga ma $20$ km.", litery: "PF", poprawna: 0 },
            { tekst: "$25\\%$ drogi to $6$ km.", litery: "PF", poprawna: 1 },
            { tekst: "$10\\%$ drogi to $3$ km.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "26",
          tresc: "W piórniku jest $24$ czerwonych kredek, co stanowi $60\\%$ wszystkich kredek w piórniku. Pozostałe kredki są niebieskie. Ile jest niebieskich kredek? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14{,}4$", "$40$", "$16$", "$9{,}6$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Zniżka $15\\%$ obniżyła cenę kurtki o $45$ zł. Ile kosztowała kurtka przed obniżką? Ile kosztuje po obniżce? **Zapisz obliczenia.**",
          rozwiazanie: "$15\\%$ ceny to $45$ zł, więc $1\\%$ ceny to $45:15=3$ zł.\n\nCena przed obniżką to $100\\%$, czyli $100\\cdot 3=300$ zł.\n\nCena po obniżce: $300-45=255$ zł.\n\nOdpowiedź: Kurtka kosztowała $300$ zł, a po obniżce kosztuje $255$ zł.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "Piotr kupił grę za $32$ zł, co stanowiło $40\\%$ jego pieniędzy. Za $25\\%$ swoich pieniędzy kupił jeszcze książkę. Ile pieniędzy miał Piotr na początku? Ile kosztowała książka? **Zapisz obliczenia.**",
          rozwiazanie: "$40\\%$ pieniędzy to $32$ zł, więc $10\\%$ to $32:4=8$ zł.\n\nWszystkie pieniądze to $100\\%$, czyli $10\\cdot 8=80$ zł.\n\nKsiążka kosztowała $25\\%$ z $80$ zł, czyli $80:4=20$ zł.\n\nOdpowiedź: Piotr miał na początku $80$ zł, a książka kosztowała $20$ zł.",
        },
      ],
      generatory: [
        {
          id: "cala-liczba",
          nazwa: "Znajdź całość",
          opis: "Znasz, ile wynosi dany procent całości – oblicz całość. Najpierw 1%, potem 100%.",
          generuj(r) {
            const KONT = [
              { t: (p, A) => `Zniżka $${p}\\%$ obniżyła cenę o $${A}$ zł. Ile złotych kosztował towar przed obniżką?`, et: "Cena $=$" },
              { t: (p, A) => `Ala zebrała $${A}$ zł, czyli $${p}\\%$ potrzebnej kwoty. Ile złotych potrzeba w sumie?`, et: "Kwota $=$" },
              { t: (p, A) => `Liczba uczniów jeżdżących do szkoły rowerem to $${A}$, czyli $${p}\\%$ wszystkich uczniów szkoły. Ilu uczniów jest w szkole?`, et: "Liczba uczniów $=$" },
              { t: (p, A) => `Turysta przeszedł $${A}$ km, czyli $${p}\\%$ całej trasy. Ile kilometrów ma cała trasa?`, et: "Długość trasy $=$" },
              { t: (p, A) => `Liczba stron przeczytanych przez Martę to $${A}$, czyli $${p}\\%$ wszystkich stron książki. Ile stron ma cała książka?`, et: "Liczba stron $=$" },
              { t: (p, A) => `Drużyna zdobyła $${A}$ punktów, czyli $${p}\\%$ wszystkich punktów możliwych do zdobycia. Ile punktów można było zdobyć?`, et: "Liczba punktów $=$" },
            ];
            const k = r.pick(KONT);
            return probuj(() => {
              const x = r.pick([40, 50, 60, 80, 120, 150, 160, 200, 240, 250, 300, 400, 500, 600]);
              const p = r.pick([4, 5, 8, 10, 12, 15, 20, 25, 30, 40, 45, 60, 75, 80]);
              const A = (x * p) / 100;
              if (!Number.isInteger(A) || A < 2) return null;
              const jeden = q(A, p);
              if (!ladna(jeden, [1, 2, 4, 5, 10])) return null;
              return {
                tresc: k.t(p, A),
                pola: [pole("x", k.et)],
                odpowiedz: { x: q(x) },
                wynik: `$${x}$`,
                rozwiazanie: [
                  `Liczba $${A}$ to $${p}\\%$ całości.`,
                  `$1\\%$ całości to $${A} : ${p} = ${dz(jeden)}$.`,
                  `Cała całość to $100\\%$: $100 \\cdot ${dz(jeden)} = ${x}$.`,
                ],
              };
            });
          },
        },
        {
          id: "inny-procent",
          nazwa: "Inny procent tej liczby",
          opis: "Znasz, ile wynosi jeden procent całości – oblicz, ile wynosi inny procent tej samej całości.",
          generuj(r) {
            return probuj(() => {
              const p1 = r.pick([10, 20, 25, 30, 40, 50, 60, 75, 80]);
              const u = r.int(2, 15);
              const A = p1 * u;
              const p2 = r.pick([5, 10, 15, 20, 25, 30, 40, 45, 50, 60, 70, 75, 90]);
              if (p2 === p1) return null;
              const w = u * p2;
              const t = r.pick([
                `W szkole $${p1}\\%$ uczniów, czyli $${A}$ osób, uczy się niemieckiego. Ilu uczniów to $${p2}\\%$ wszystkich uczniów szkoły?`,
                `Ola wydała $${p1}\\%$ swoich oszczędności, czyli $${A}$ zł. Ile złotych stanowi $${p2}\\%$ jej oszczędności?`,
                `Turyści przeszli $${p1}\\%$ trasy, czyli $${A}$ km. Ile kilometrów to $${p2}\\%$ całej trasy?`,
              ]);
              return {
                tresc: t,
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `$${p1}\\%$ całości to $${A}$, więc $1\\%$ całości to $${A} : ${p1} = ${u}$.`,
                  `$${p2}\\%$ całości to $${p2} \\cdot ${u} = ${w}$.`,
                ],
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ O ile procent więcej, o ile procent mniej
    {
      id: "o-ile-procent",
      nazwa: "O ile procent więcej, o ile procent mniej",
      sciaga: [
        {
          nazwa: "O ile procent więcej",
          slownie: "Liczymy różnicę dwóch liczb, a potem sprawdzamy, jaką częścią liczby wyjściowej jest ta różnica. Liczba, od której zaczynamy (z którą porównujemy), to $100\\%$.",
          tex: "\\frac{\\text{różnica}}{\\text{wyjściowa}}\\cdot100\\%",
          przyklad: "Bilet kosztował $20$ zł, a teraz kosztuje $25$ zł. Różnica to $5$ zł, a $\\frac{5}{20}=\\frac{1}{4}=25\\%$. Bilet zdrożał o $25\\%$.",
        },
        {
          nazwa: "O ile procent mniej",
          slownie: "Tak samo, ale liczbą wyjściową (stuprocentową) jest ta, od której zmniejszamy – czyli większa, dawna liczba.",
          przyklad: "Było $50$ zł, a jest $40$ zł. Różnica to $10$ zł, a $\\frac{10}{50}=\\frac{1}{5}=20\\%$. Cena spadła o $20\\%$.",
          uwaga: "Z $40$ na $50$ to wzrost o $25\\%$ (bo $\\frac{10}{40}$), ale z $50$ na $40$ to spadek tylko o $20\\%$ (bo $\\frac{10}{50}$). Dzielimy przez inne liczby, więc procenty są różne.",
        },
        {
          nazwa: "Liczba po wzroście lub spadku",
          slownie: "Gdy liczba rośnie o $p\\%$, nowa liczba to $(100+p)\\%$ starej. Gdy maleje o $p\\%$, nowa liczba to $(100-p)\\%$ starej.",
          tex: "\\text{wzrost o }p\\%\\to(100+p)\\%\\qquad\\text{spadek o }p\\%\\to(100-p)\\%",
          litery: "$p$ – liczba procent.",
          przyklad: "$80$ zł podrożało o $25\\%$. Mamy $125\\%$ z $80$: $1\\%$ to $0{,}8$, więc $125\\cdot 0{,}8=100$ zł. Po spadku o $25\\%$ byłoby $75\\%$ z $80$, czyli $60$ zł.",
        },
        {
          nazwa: "Ile procent, a o ile procent",
          slownie: "Pytanie „ile procent liczby $a$ stanowi liczba $b$?” to inne pytanie niż „o ile procent $b$ jest większa od $a$?”. W pierwszym wynik może przekraczać $100\\%$.",
          przyklad: "Liczba $30$ stanowi $\\frac{30}{20}=\\frac{3}{2}=150\\%$ liczby $20$. Jest od niej większa o $150\\%-100\\%=50\\%$.",
          uwaga: "Gdy ktoś jest o $50\\%$ wyższy, jego wzrost to $150\\%$ (a nie $50\\%$) wzrostu drugiej osoby.",
        },
      ],
      jak: [
        "Ustal, która liczba jest wyjściowa (z którą porównujemy) – ona jest $100\\%$.",
        "Oblicz różnicę liczb.",
        "Zapisz ułamek: różnica przez liczba wyjściowa, i zamień go na procent.",
        "Liczba po zmianie: wzrost o $p\\%$ to $(100+p)\\%$ starej, spadek o $p\\%$ to $(100-p)\\%$ starej.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Cena zeszytu wzrosła z $4$ zł do $5$ zł. O ile procent wzrosła cena? **Wybierz właściwą odpowiedź.**",
          opcje: ["$25\\%$", "$20\\%$", "$1\\%$", "$125\\%$"],
          poprawna: 0,
        },
        {
          nr: "30",
          tresc: "Cena spadła z $50$ zł do $40$ zł. O ile procent spadła cena? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10\\%$", "$20\\%$", "$25\\%$", "$80\\%$"],
          poprawna: 1,
        },
        {
          nr: "31",
          tresc: "Liczbę $80$ zwiększono o $15\\%$. Jaką liczbę otrzymano? **Wybierz właściwą odpowiedź.**",
          opcje: ["$95$", "$12$", "$68$", "$92$"],
          poprawna: 3,
        },
        {
          nr: "32",
          tresc: "Jaki procent liczby $40$ stanowi liczba $60$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$40\\%$", "$50\\%$", "$150\\%$", "$20\\%$"],
          poprawna: 2,
        },
        {
          nr: "33",
          tresc: "Zeszyt kosztował $20$ zł, a teraz kosztuje $16$ zł. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Zeszyt stał się tańszy o $5$ zł.", litery: "PF", poprawna: 1 },
            { tekst: "Zeszyt stał się tańszy o $20\\%$.", litery: "PF", poprawna: 0 },
            { tekst: "Nowa cena to $120\\%$ dawnej ceny.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 2,
          tresc: "W środę w sklepiku szkolnym sprzedano $80$ bułek, a w czwartek $100$ bułek. O ile procent więcej bułek sprzedano w czwartek niż w środę? O ile procent mniej bułek sprzedano w środę niż w czwartek? **Zapisz obliczenia.**",
          rozwiazanie: "Różnica: $100-80=20$ bułek.\n\nCzwartek w porównaniu ze środą: liczbą wyjściową jest $80$, więc $\\frac{20}{80}=\\frac{1}{4}=25\\%$.\n\nŚroda w porównaniu z czwartkiem: liczbą wyjściową jest $100$, więc $\\frac{20}{100}=20\\%$.\n\nOdpowiedź: W czwartek sprzedano o $25\\%$ więcej bułek niż w środę, a w środę o $20\\%$ mniej niż w czwartek.",
        },
        {
          nr: "35",
          punkty: 3,
          tresc: "W szkole uczyło się $400$ uczniów, a po roku jest ich $440$. O ile procent wzrosła liczba uczniów? Za rok liczba uczniów ma wzrosnąć o $5\\%$ w stosunku do obecnej liczby $440$. Ilu uczniów będzie wtedy w szkole? **Zapisz obliczenia.**",
          rozwiazanie: "Przybyło $440-400=40$ uczniów.\n\nLiczbą wyjściową jest $400$, więc $\\frac{40}{400}=\\frac{1}{10}=10\\%$.\n\n$1\\%$ z $440$ to $4{,}4$, więc $5\\%$ to $5\\cdot 4{,}4=22$ uczniów.\n\nZa rok będzie $440+22=462$ uczniów.\n\nOdpowiedź: Liczba uczniów wzrosła o $10\\%$. Za rok w szkole będzie $462$ uczniów.",
        },
      ],
      generatory: [
        {
          id: "o-ile-procent",
          nazwa: "O ile procent",
          opis: "Liczba wzrosła albo zmalała – oblicz o ile procent. Albo: ile procent jednej liczby stanowi druga.",
          generuj(r) {
            const KONT = [
              { w: (s, B) => `Cena biletu wzrosła z $${s}$ zł do $${B}$ zł. O ile procent wzrosła cena biletu?`, m: (s, B) => `Cena biletu spadła z $${B}$ zł do $${s}$ zł. O ile procent spadła cena biletu?` },
              { w: (s, B) => `W szkolnym klubie było $${s}$ osób, a teraz jest $${B}$ osób. O ile procent wzrosła liczba osób w klubie?`, m: (s, B) => `W szkolnym klubie było $${B}$ osób, a teraz jest $${s}$ osób. O ile procent zmalała liczba osób w klubie?` },
              { w: (s, B) => `Czas biegu Kuby wzrósł z $${s}$ s do $${B}$ s. O ile procent wzrósł czas biegu?`, m: (s, B) => `Czas biegu Kuby skrócił się z $${B}$ s do $${s}$ s. O ile procent skrócił się czas biegu?` },
              { w: (s, B) => `Masa paczki wzrosła z $${s}$ g do $${B}$ g. O ile procent wzrosła masa paczki?`, m: (s, B) => `Masa paczki zmalała z $${B}$ g do $${s}$ g. O ile procent zmalała masa paczki?` },
            ];
            const k = r.pick(KONT);
            const tryb = r.int(0, 2);
            return probuj(() => {
              const s = r.pick([20, 25, 40, 50, 60, 80, 100, 120, 150, 200, 250, 400]);
              const p = r.pick([10, 20, 25, 40, 50, 60, 75, 100]);
              const B = (s * (100 + p)) / 100;
              if (!Number.isInteger(B)) return null;
              const d = B - s;
              if (tryb === 0) {
                return {
                  tresc: k.w(s, B),
                  pola: [pole("p", "Procent $=$")],
                  odpowiedz: { p: q(p) },
                  wynik: `$${p}\\%$`,
                  rozwiazanie: [
                    `Różnica: $${B} - ${s} = ${d}$.`,
                    `Liczbą wyjściową jest $${s}$ (od niej zaczynamy), więc $${ulamek(d, s)}$ to $${p}\\%$.`,
                  ],
                };
              }
              if (tryb === 1) {
                const pm = q(100 * d, B);
                if (!pm.calkowita) return null;
                return {
                  tresc: k.m(s, B),
                  pola: [pole("p", "Procent $=$")],
                  odpowiedz: { p: pm },
                  wynik: `$${pm.n}\\%$`,
                  rozwiazanie: [
                    `Różnica: $${B} - ${s} = ${d}$.`,
                    `Liczbą wyjściową jest $${B}$ (od niej zaczynamy), więc $${ulamek(d, B)} = ${ulamek(pm.n, 100)} = ${pm.n}\\%$.`,
                  ],
                };
              }
              const sto = 100 + p;
              return {
                tresc: `Zeszyt A kosztuje $${s}$ zł, a zeszyt B kosztuje $${B}$ zł. Ile procent ceny zeszytu A stanowi cena zeszytu B? Podaj liczbę bez znaku %.`,
                pola: [pole("p", "Procent $=$")],
                odpowiedz: { p: q(sto) },
                wynik: `$${sto}\\%$`,
                rozwiazanie: [
                  `Całością ($100\\%$) jest cena zeszytu A: $${s}$ zł.`,
                  `$${ulamek(B, s)} = ${ulamek(sto, 100)} = ${sto}\\%$.`,
                ],
              };
            });
          },
        },
        {
          id: "po-zmianie",
          nazwa: "Liczba po zmianie",
          opis: "Liczba wzrosła albo zmalała o dany procent – oblicz nową liczbę.",
          generuj(r) {
            const KONT = [
              { w: (N, p) => `Cena roweru wynosiła $${N}$ zł. Sklep podniósł ją o $${p}\\%$. Ile złotych wynosi nowa cena?`, m: (N, p) => `Cena roweru wynosiła $${N}$ zł. Sklep obniżył ją o $${p}\\%$. Ile złotych wynosi nowa cena?`, calk: false },
              { w: (N, p) => `W szkole było $${N}$ uczniów. W tym roku liczba uczniów wzrosła o $${p}\\%$. Ilu uczniów jest teraz w szkole?`, m: (N, p) => `W szkole było $${N}$ uczniów. W tym roku liczba uczniów zmalała o $${p}\\%$. Ilu uczniów jest teraz w szkole?`, calk: true },
              { w: (N, p) => `Na koncie było $${N}$ zł. Kwota wzrosła o $${p}\\%$. Ile złotych jest teraz na koncie?`, m: (N, p) => `Na koncie było $${N}$ zł. Kwota zmalała o $${p}\\%$. Ile złotych jest teraz na koncie?`, calk: false },
              { w: (N, p) => `Trasa liczyła $${N}$ km. Po zmianie przebiegu wydłużyła się o $${p}\\%$. Ile kilometrów ma teraz trasa?`, m: (N, p) => `Trasa liczyła $${N}$ km. Po zmianie przebiegu skróciła się o $${p}\\%$. Ile kilometrów ma teraz trasa?`, calk: false },
            ];
            const k = r.pick(KONT);
            const wzrost = r.chance();
            return probuj(() => {
              const N = r.pick([20, 40, 50, 60, 80, 120, 150, 200, 240, 250, 300, 400, 500]);
              const p = r.pick([5, 10, 15, 20, 25, 30, 40, 50]);
              const jeden = q(N, 100);
              const x = jeden.mul(p);
              const w = wzrost ? q(N).add(x) : q(N).sub(x);
              const dop = k.calk ? [1] : [1, 2];
              if (!ladna(x, dop) || !ladna(w, dop)) return null;
              return {
                tresc: (wzrost ? k.w : k.m)(N, p),
                pola: [pole("w", "Wynik $=$")],
                odpowiedz: { w },
                wynik: `$${dz(w)}$`,
                rozwiazanie: [
                  `$1\\%$ to $${N} : 100 = ${dz(jeden)}$, więc $${p}\\%$ to $${p} \\cdot ${dz(jeden)} = ${dz(x)}$.`,
                  wzrost ? `Liczba wzrosła: $${N} + ${dz(x)} = ${dz(w)}$.` : `Liczba zmalała: $${N} - ${dz(x)} = ${dz(w)}$.`,
                ],
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Obliczenia procentowe
    {
      id: "obliczenia-procentowe",
      nazwa: "Obliczenia procentowe",
      sciaga: [
        {
          nazwa: "Obniżka i podwyżka",
          slownie: "Po obniżce o $p\\%$ cena to $(100-p)\\%$ dawnej ceny. Po podwyżce o $p\\%$ cena to $(100+p)\\%$ dawnej ceny. Liczymy $1\\%$ i mnożymy.",
          tex: "\\text{obniżka}:(100-p)\\%\\qquad\\text{podwyżka}:(100+p)\\%",
          przyklad: "Kurtka kosztowała $200$ zł. Po obniżce o $30\\%$ to $70\\%$ ceny: $1\\%$ to $2$ zł, więc $70\\cdot 2=140$ zł. Po podwyżce o $10\\%$ byłoby $110\\%$, czyli $220$ zł.",
        },
        {
          nazwa: "Cena przed zmianą",
          slownie: "Gdy znamy cenę po zmianie, wiemy, ile procent dawnej ceny to jest (np. po obniżce o $20\\%$ to $80\\%$). Liczymy $1\\%$ i $100\\%$.",
          przyklad: "Po obniżce o $20\\%$ buty kosztują $64$ zł. To $80\\%$ dawnej ceny. $1\\%$ to $64:80=0{,}8$ zł, a $100\\%$ to $100\\cdot 0{,}8=80$ zł.",
          uwaga: "Nie dodawaj $20\\%$ do $64$ zł – to by dało $76{,}8$ zł. $20\\%$ liczymy od dawnej ceny, a nie od nowej.",
        },
        {
          nazwa: "Dwie zmiany z rzędu",
          slownie: "Druga zmiana dotyczy nowej ceny, a nie pierwotnej. Liczymy pierwszą zmianę, a potem drugą od wyniku. Procentów nie dodajemy.",
          przyklad: "Cena $200$ zł spadła o $10\\%$, czyli do $180$ zł. Potem wzrosła o $10\\%$ z $180$ zł, czyli o $18$ zł, do $198$ zł. Nie wróciła do $200$ zł.",
          uwaga: "Obniżka o $10\\%$ i podwyżka o $10\\%$ nie znoszą się, bo liczymy je od różnych cen.",
        },
        {
          nazwa: "Punkty procentowe",
          slownie: "Gdy dwa procenty porównujemy, odejmujemy je. Wynik nazywamy punktami procentowymi. To co innego niż „o ile procent”.",
          tex: "p_2\\%-p_1\\%=\\text{pkt proc.}",
          litery: "$p_1$ – procent wcześniej, $p_2$ – procent później.",
          przyklad: "Frekwencja wzrosła z $60\\%$ do $75\\%$: to $15$ punktów procentowych. W procentach: $\\frac{15}{60}=\\frac{1}{4}=25\\%$, czyli wzrosła o $25\\%$.",
          uwaga: "Wzrost „o $15$ punktów procentowych” to nie jest wzrost „o $15\\%$”.",
        },
      ],
      jak: [
        "Zapisz, jaką część dawnej ceny stanowi cena po zmianie: $(100-p)\\%$ lub $(100+p)\\%$.",
        "Znasz dawną cenę: policz $1\\%$ i pomnóż przez $(100\\pm p)$.",
        "Znasz nową cenę: policz $1\\%$ jako nową cenę podzieloną przez $(100\\pm p)$, potem $100\\%$.",
        "Dwie zmiany: licz jedną po drugiej, druga liczona od nowej ceny. Sprawdź, czy wynik ma sens.",
      ],
      zadania: [
        {
          nr: "36",
          tresc: "Rower kosztował $600$ zł. Cenę obniżono o $20\\%$. Ile kosztuje rower po obniżce? **Wybierz właściwą odpowiedź.**",
          opcje: ["$580$ zł", "$480$ zł", "$720$ zł", "$120$ zł"],
          poprawna: 1,
        },
        {
          nr: "37",
          tresc: "Po obniżce o $30\\%$ buty kosztują $140$ zł. Ile kosztowały przed obniżką? **Wybierz właściwą odpowiedź.**",
          opcje: ["$98$ zł", "$170$ zł", "$182$ zł", "$200$ zł"],
          poprawna: 3,
        },
        {
          nr: "38",
          tresc: "Cena kurtki wynosiła $200$ zł. Najpierw obniżono ją o $10\\%$, a potem nową cenę podwyższono o $10\\%$. Jaka jest cena kurtki po obu zmianach? **Wybierz właściwą odpowiedź.**",
          opcje: ["$180$ zł", "$200$ zł", "$198$ zł", "$220$ zł"],
          poprawna: 2,
        },
        {
          nr: "39",
          tresc: "Frekwencja na zebraniach rodziców wzrosła z $60\\%$ do $75\\%$. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Frekwencja wzrosła o $15$ punktów procentowych.", litery: "PF", poprawna: 0 },
            { tekst: "Frekwencja wzrosła o $15\\%$.", litery: "PF", poprawna: 1 },
            { tekst: "Frekwencja wzrosła o $25\\%$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "40",
          tresc: "Cena towaru wynosiła $80$ zł. Obniżono ją o $25\\%$, a po tygodniu nową cenę obniżono jeszcze o $20\\%$. Ile kosztuje towar po dwóch obniżkach? **Wybierz właściwą odpowiedź.**",
          opcje: ["$48$ zł", "$44$ zł", "$36$ zł", "$55$ zł"],
          poprawna: 0,
        },
        {
          nr: "41",
          tresc: "Bluzka kosztowała $50$ zł. Najpierw podrożała o $20\\%$, a potem jej nową cenę obniżono o $10\\%$. Ile kosztuje bluzka po obu zmianach? **Wybierz właściwą odpowiedź.**",
          opcje: ["$55$ zł", "$60$ zł", "$45$ zł", "$54$ zł"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "42",
          punkty: 2,
          tresc: "Rower kosztował $800$ zł. W sezonie obniżono jego cenę o $15\\%$, a w ostatnim dniu sprzedaży obniżono nową cenę jeszcze o $10\\%$. Ile kosztował rower w ostatnim dniu sprzedaży? **Zapisz obliczenia.**",
          rozwiazanie: "Po pierwszej obniżce cena to $100\\%-15\\%=85\\%$ z $800$ zł. $1\\%$ to $8$ zł, więc $85\\cdot 8=680$ zł.\n\nDruga obniżka dotyczy nowej ceny $680$ zł. Cena to $100\\%-10\\%=90\\%$ z $680$ zł. $1\\%$ to $6{,}8$ zł, więc $90\\cdot 6{,}8=612$ zł.\n\nOdpowiedź: W ostatnim dniu rower kosztował $612$ zł.",
        },
        {
          nr: "43",
          punkty: 3,
          tresc: "W klasie 7a jest $25$ uczniów, a w klasie 7b jest $20$ uczniów. Wczoraj do szkoły przyszło $80\\%$ uczniów klasy 7a i $90\\%$ uczniów klasy 7b. Ilu uczniów było obecnych w każdej klasie? O ile punktów procentowych frekwencja w 7b była wyższa niż w 7a? Ilu uczniów łącznie było nieobecnych? **Zapisz obliczenia.**",
          rozwiazanie: "W 7a: $1\\%$ to $25:100=0{,}25$, więc $80\\%$ to $80\\cdot 0{,}25=20$ uczniów.\n\nW 7b: $1\\%$ to $20:100=0{,}2$, więc $90\\%$ to $90\\cdot 0{,}2=18$ uczniów.\n\nRóżnica frekwencji: $90\\%-80\\%=10$ punktów procentowych.\n\nNieobecni: w 7a $25-20=5$ uczniów, w 7b $20-18=2$ uczniów, razem $5+2=7$.\n\nOdpowiedź: Obecnych było $20$ uczniów w 7a i $18$ w 7b. Frekwencja w 7b była wyższa o $10$ punktów procentowych. Nieobecnych było łącznie $7$ uczniów.",
        },
      ],
      generatory: [
        {
          id: "zmiana-ceny",
          nazwa: "Obniżka i podwyżka",
          opis: "Oblicz nową cenę po obniżce albo podwyżce, albo cenę przed zmianą, gdy znasz cenę po zmianie.",
          generuj(r) {
            const co = r.pick(RZECZY);
            const tryb = r.int(0, 3);
            return probuj(() => {
              const x = r.pick([40, 50, 60, 80, 100, 120, 150, 200, 240, 250, 300, 400, 500, 600]);
              const p = r.pick([5, 10, 15, 20, 25, 30, 40, 50]);
              const jeden = q(x, 100);
              if (tryb <= 1) {
                const f = tryb === 0 ? 100 - p : 100 + p;
                const w = jeden.mul(f);
                if (!ladna(w)) return null;
                return {
                  tresc: tryb === 0
                    ? `Cena ${co} wynosi $${x}$ zł. Sklep obniżył ją o $${p}\\%$. Ile złotych wynosi nowa cena?`
                    : `Cena ${co} wynosiła $${x}$ zł. Sklep podniósł ją o $${p}\\%$. Ile złotych wynosi nowa cena?`,
                  pola: [pole("w", "Cena $=$")],
                  odpowiedz: { w },
                  wynik: `$${dz(w)}$ zł`,
                  rozwiazanie: [
                    tryb === 0 ? `Po obniżce o $${p}\\%$ cena to $100\\% - ${p}\\% = ${f}\\%$ dawnej ceny.` : `Po podwyżce o $${p}\\%$ cena to $100\\% + ${p}\\% = ${f}\\%$ dawnej ceny.`,
                    `$1\\%$ ceny to $${x} : 100 = ${dz(jeden)}$ zł.`,
                    `$${f}\\%$ ceny to $${f} \\cdot ${dz(jeden)} = ${dz(w)}$ zł.`,
                  ],
                };
              }
              const f = tryb === 2 ? 100 - p : 100 + p;
              const y = jeden.mul(f);
              if (!y.calkowita) return null;
              return {
                tresc: tryb === 2
                  ? `Po obniżce o $${p}\\%$ cena ${co} wynosi $${y.n}$ zł. Ile złotych wynosiła cena przed obniżką?`
                  : `Po podwyżce o $${p}\\%$ cena ${co} wynosi $${y.n}$ zł. Ile złotych wynosiła cena przed podwyżką?`,
                pola: [pole("x", "Cena przed zmianą $=$")],
                odpowiedz: { x: q(x) },
                wynik: `$${x}$ zł`,
                rozwiazanie: [
                  `Cena po zmianie to $${f}\\%$ dawnej ceny i wynosi $${y.n}$ zł.`,
                  `$1\\%$ dawnej ceny to $${y.n} : ${f} = ${dz(jeden)}$ zł.`,
                  `Dawna cena to $100\\%$: $100 \\cdot ${dz(jeden)} = ${x}$ zł.`,
                ],
              };
            });
          },
        },
        {
          id: "dwie-zmiany",
          nazwa: "Dwie zmiany ceny",
          opis: "Cena zmienia się dwa razy z rzędu (obniżka lub podwyżka) – oblicz cenę końcową. Druga zmiana liczy się od nowej ceny.",
          generuj(r) {
            const co = r.pick(RZECZY);
            return probuj(() => {
              const x = r.pick([100, 200, 250, 300, 400, 500, 600, 800, 1000]);
              const z1 = r.chance();
              const z2 = r.chance();
              const p1 = r.pick([10, 20, 25, 30, 40, 50]);
              const p2 = r.pick([10, 20, 25, 30, 40, 50]);
              const f1 = z1 ? 100 - p1 : 100 + p1;
              const f2 = z2 ? 100 - p2 : 100 + p2;
              const u1 = q(x, 100);
              const y1 = u1.mul(f1);
              const u2 = y1.div(100);
              const y2 = u2.mul(f2);
              if (!ladna(y1, [1, 2]) || !ladna(y2, [1, 2])) return null;
              const v = (z) => (z ? "obniżono" : "podniesiono");
              return {
                tresc: `Cena ${co} wynosiła $${x}$ zł. Najpierw cenę ${v(z1)} o $${p1}\\%$, a potem nową cenę ${v(z2)} o $${p2}\\%$. Ile złotych wynosi cena po obu zmianach?`,
                pola: [pole("w", "Cena $=$")],
                odpowiedz: { w: y2 },
                wynik: `$${dz(y2)}$ zł`,
                rozwiazanie: [
                  `Po pierwszej zmianie cena to $${f1}\\%$ dawnej ceny: $1\\%$ to $${dz(u1)}$ zł, więc $${f1} \\cdot ${dz(u1)} = ${dz(y1)}$ zł.`,
                  `Druga zmiana dotyczy nowej ceny $${dz(y1)}$ zł: $1\\%$ to $${dz(u2)}$ zł, więc $${f2}\\%$ to $${f2} \\cdot ${dz(u2)} = ${dz(y2)}$ zł.`,
                ],
              };
            });
          },
        },
      ],
    },
  ],
};
