// Klasa 8 (szkoła podstawowa) · rozdział IV „Wielokąty” – Matematyka z kluczem 8 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Bez rysunków: każdą figurę opisano słowami. Dowody to proste rozumowania krok po kroku.
import { q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });

/** Powtarza losowanie, aż f() zwróci zadanie (wartość różną od null); f używa tego samego losownika, więc wynik jest powtarzalny. */
function probuj(f, proby = 3000) {
  for (let i = 0; i < proby; i++) {
    const w = f();
    if (w) return w;
  }
  throw new Error("Nie udało się wylosować zadania");
}

/** Kąt w stopniach do wzoru: st(65) = "65^\\circ". */
const st = (a) => `${a}^\\circ`;

const TROJKATY = [["A", "B", "C"], ["K", "L", "M"], ["P", "Q", "R"], ["D", "E", "F"]];

/** Czy z odcinków o długościach a, b, c można zbudować trójkąt. */
const jestTrojkat = (a, b, c) => a + b > c && a + c > b && b + c > a;

const posortowane = (t) => [...t].sort((x, y) => x - y);
const takieSame = (t1, t2) => posortowane(t1).join() === posortowane(t2).join();

const NAZWY = {
  5: ["pięciokąt", "pięciokąta"],
  6: ["sześciokąt", "sześciokąta"],
  7: ["siedmiokąt", "siedmiokąta"],
  8: ["ośmiokąt", "ośmiokąta"],
  9: ["dziewięciokąt", "dziewięciokąta"],
  10: ["dziesięciokąt", "dziesięciokąta"],
  12: ["dwunastokąt", "dwunastokąta"],
};
const nom = (n) => (NAZWY[n] ? `${NAZWY[n][0]} foremny` : `wielokąt foremny o $${n}$ bokach`);
const dop = (n) => (NAZWY[n] ? `${NAZWY[n][1]} foremnego` : `wielokąta foremnego o $${n}$ bokach`);

const OPCJE_CECH = [
  "Trójkąty są przystające (cecha bbb).",
  "Trójkąty są przystające (cecha bkb).",
  "Trójkąty są przystające (cecha kbk).",
  "Z tych danych nie wynika, że trójkąty są przystające.",
];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Figury przystające
    {
      id: "figury-przystajace",
      nazwa: "Figury przystające",
      sciaga: [
        {
          nazwa: "Figury przystające",
          slownie: "Dwie figury są przystające, gdy mają taki sam kształt i taką samą wielkość. Jedną można nałożyć na drugą tak, że idealnie się pokryją. Wolno ją przy tym przesunąć, obrócić albo odwrócić na drugą stronę.",
          tex: "F_1\\cong F_2",
          litery: "$\\cong$ – znak „jest przystająca do”.",
          przyklad: "Dwa kwadraty o boku $3$ cm są przystające. Kwadrat o boku $3$ cm i kwadrat o boku $4$ cm nie są przystające.",
          uwaga: "Taki sam kształt to jeszcze za mało. Mały i duży kwadrat mają ten sam kształt, ale nie są przystające.",
        },
        {
          nazwa: "Boki i kąty odpowiadające",
          slownie: "Gdy figury są przystające, każdemu bokowi jednej figury odpowiada bok drugiej o takiej samej długości. Tak samo jest z kątami. Zapis $ABC\\cong KLM$ mówi, że $A$ odpowiada $K$, $B$ odpowiada $L$, a $C$ odpowiada $M$.",
          tex: "|AB|=|KL|\\qquad|BC|=|LM|\\qquad\\angle A=\\angle K",
          litery: "$\\angle A$ – kąt przy wierzchołku $A$.",
          przyklad: "Trójkąty $ABC$ i $KLM$ są przystające (w tej kolejności) i $|AB|=5$ cm. Bok $KL$ odpowiada bokowi $AB$, więc $|KL|=5$ cm. Kąt przy $M$ ma tyle samo stopni co kąt przy $C$.",
          uwaga: "Kolejność liter ma znaczenie. W zapisie $ABC\\cong KLM$ bokowi $AB$ odpowiada bok $KL$, a nie $LM$.",
        },
        {
          nazwa: "Pole i obwód figur przystających",
          slownie: "Figury przystające mają równe obwody i równe pola. W drugą stronę to nie działa: dwie figury o tym samym polu albo o tym samym obwodzie nie muszą być przystające.",
          przyklad: "Prostokąty $2\\times6$ i $3\\times4$ mają to samo pole ($12$ cm$^2$), ale ich obwody to $16$ cm i $14$ cm, więc nie są przystające.",
          uwaga: "Prostokąty $1\\times5$ i $2\\times4$ mają równe obwody ($12$ cm), a nie są przystające.",
        },
        {
          nazwa: "Przystające prostokąty",
          slownie: "Dwa prostokąty są przystające, gdy mają takie same dwa wymiary. Kolejność nie ma znaczenia, bo prostokąt można obrócić.",
          przyklad: "Prostokąt $3\\times7$ i prostokąt $7\\times3$ są przystające. Prostokąt $3\\times7$ i prostokąt $3\\times8$ nie są.",
          uwaga: "Jeden równy bok to za mało. Muszą się zgadzać oba wymiary.",
        },
      ],
      jak: [
        "Zapisz, które wierzchołki sobie odpowiadają. Wskazuje to kolejność liter w zapisie, np. $ABC\\cong KLM$.",
        "Boki i kąty odpowiadające mają równe miary. Przepisz je.",
        "Gdy brakuje miary kąta w trójkącie, policz ją z sumy kątów: $180^\\circ$.",
        "Sprawdź: obwody figur przystających są równe.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Które dwie figury są zawsze przystające? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "dwa kwadraty",
            "dwa prostokąty o polu $12$ cm$^2$",
            "dwa trójkąty równoramienne",
            "dwa koła o promieniu $5$ cm",
          ],
          poprawna: 3,
        },
        {
          nr: "2",
          tresc: "Trójkąty $ABC$ i $KLM$ są przystające (w tej kolejności). Wiemy, że $|AB|=6$ cm, $|BC|=8$ cm i $|AC|=10$ cm. Bok $LM$ ma długość. **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$ cm", "$8$ cm", "$10$ cm", "$24$ cm"],
          poprawna: 1,
        },
        {
          nr: "3",
          tresc: "Trójkąty $PQR$ i $XYZ$ są przystające (w tej kolejności). W trójkącie $PQR$ kąt przy $Q$ ma $50^\\circ$, a kąt przy $R$ ma $70^\\circ$. Kąt przy wierzchołku $X$ ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$50^\\circ$", "$70^\\circ$", "$60^\\circ$", "$120^\\circ$"],
          poprawna: 2,
        },
        {
          nr: "4",
          tresc: "Prostokąt ma wymiary $3$ cm na $8$ cm. Który prostokąt jest do niego przystający? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$ cm na $3$ cm", "$4$ cm na $6$ cm", "$3$ cm na $9$ cm", "$6$ cm na $16$ cm"],
          poprawna: 0,
        },
        {
          nr: "5",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Figury przystające mają równe pola.", litery: "PF", poprawna: 0 },
            { tekst: "Dwie figury o równych polach są zawsze przystające.", litery: "PF", poprawna: 1 },
            { tekst: "Dwa trójkąty równoboczne o obwodzie $12$ cm każdy są przystające.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Trójkąty $ABC$ i $KLM$ są przystające (w tej kolejności). Obwód trójkąta $ABC$ jest równy $36$ cm, a $|AB|=10$ cm i $|BC|=12$ cm. Oblicz długości wszystkich boków trójkąta $KLM$. **Zapisz obliczenia.**",
          rozwiazanie: "Trzeci bok trójkąta $ABC$: $|AC|=36-10-12=14$ cm.\n\nTrójkąty są przystające, a litery w zapisie odpowiadają sobie w tej samej kolejności. Bokowi $AB$ odpowiada $KL$, bokowi $BC$ odpowiada $LM$, a bokowi $AC$ odpowiada $KM$.\n\nStąd $|KL|=10$ cm, $|LM|=12$ cm i $|KM|=14$ cm.\n\nSprawdzenie: $10+12+14=36$, czyli obwód jest ten sam.\n\nOdpowiedź: Boki trójkąta $KLM$ mają $10$ cm, $12$ cm i $14$ cm.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "W trójkącie $ABC$ kąt przy wierzchołku $B$ jest dwa razy większy od kąta przy wierzchołku $A$, a kąt przy wierzchołku $C$ ma $60^\\circ$. Trójkąt $KLM$ jest przystający do trójkąta $ABC$ (w tej kolejności). Oblicz miary kątów trójkąta $KLM$. **Zapisz obliczenia.**",
          rozwiazanie: "Niech kąt przy $A$ ma miarę $x$. Wtedy kąt przy $B$ ma $2x$.\n\nSuma kątów trójkąta: $x+2x+60^\\circ=180^\\circ$, czyli $3x=120^\\circ$ i $x=40^\\circ$.\n\nKąty trójkąta $ABC$: przy $A$ – $40^\\circ$, przy $B$ – $80^\\circ$, przy $C$ – $60^\\circ$.\n\nTrójkąty są przystające, więc kątom odpowiadają kąty: przy $K$ – $40^\\circ$, przy $L$ – $80^\\circ$, przy $M$ – $60^\\circ$.\n\nOdpowiedź: Kąty trójkąta $KLM$ mają $40^\\circ$, $80^\\circ$ i $60^\\circ$.",
        },
      ],
      generatory: [
        {
          id: "odpowiadajace",
          nazwa: "Boki i kąty odpowiadające",
          opis: "Trójkąty są przystające. Z danych jednego trójkąta oblicz bok, kąt albo obwód drugiego, pamiętając o kolejności liter.",
          generuj(r) {
            const pary = r.shuffle(TROJKATY).slice(0, 2);
            const P = pary[0];
            const S = r.shuffle(pary[1]);
            const zapis = `$${P.join("")}\\cong ${S.join("")}$`;
            const odpow = `Zapis ${zapis} mówi, że wierzchołki odpowiadają sobie tak: $${P[0]}\\to ${S[0]}$, $${P[1]}\\to ${S[1]}$, $${P[2]}\\to ${S[2]}$.`;
            const tryb = r.int(0, 2);
            if (tryb === 1) {
              const x = r.int(30, 90);
              const y = r.int(30, 150 - x);
              const katy = [x, y, 180 - x - y];
              const k = r.int(0, 2);
              const w = katy[k];
              const kroki = [odpow];
              if (k < 2) kroki.push(`Kąt przy $${S[k]}$ odpowiada kątowi przy $${P[k]}$, więc ma $${st(w)}$.`);
              else kroki.push(`Kąt przy $${S[k]}$ odpowiada kątowi przy $${P[k]}$. Ten kąt liczymy z sumy kątów trójkąta: $180^\\circ-${st(x)}-${st(y)}=${st(w)}$.`);
              return {
                tresc: `W trójkącie $${P.join("")}$ kąt przy wierzchołku $${P[0]}$ ma $${st(x)}$, a kąt przy wierzchołku $${P[1]}$ ma $${st(y)}$. Trójkąty są przystające: ${zapis}. Ile stopni ma kąt przy wierzchołku $${S[k]}$?`,
                pola: [pole("w", `Kąt przy $${S[k]}$ (w stopniach) $=$`)],
                odpowiedz: { w: q(w) },
                wynik: `$${st(w)}$`,
                rozwiazanie: kroki,
              };
            }
            const bok = probuj(() => {
              const t = [r.int(3, 14), r.int(3, 14), r.int(3, 14)];
              if (new Set(t).size < 3 || !jestTrojkat(...t)) return null;
              return t;
            });
            const pary3 = [[0, 1], [1, 2], [0, 2]];
            const [a, b, c] = bok;
            const opis = `W trójkącie $${P.join("")}$ mamy $|${P[0]}${P[1]}|=${a}$ cm, $|${P[1]}${P[2]}|=${b}$ cm i $|${P[0]}${P[2]}|=${c}$ cm. Trójkąty są przystające: ${zapis}.`;
            if (tryb === 0) {
              const k = r.int(0, 2);
              const [i, j] = pary3[k];
              const w = bok[k];
              return {
                tresc: `${opis} Ile centymetrów ma bok $${S[i]}${S[j]}$?`,
                pola: [pole("w", `$|${S[i]}${S[j]}|$ (cm) $=$`)],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$ cm`,
                rozwiazanie: [odpow, `Bok $${S[i]}${S[j]}$ odpowiada bokowi $${P[i]}${P[j]}$, więc ma $${w}$ cm.`],
              };
            }
            const w = a + b + c;
            return {
              tresc: `${opis} Ile centymetrów wynosi obwód trójkąta $${S.join("")}$?`,
              pola: [pole("w", "Obwód (cm) $=$")],
              odpowiedz: { w: q(w) },
              wynik: `$${w}$ cm`,
              rozwiazanie: ["Figury przystające mają równe obwody.", `Obwód trójkąta $${P.join("")}$: $${a}+${b}+${c}=${w}$ cm. Tyle samo ma trójkąt $${S.join("")}$.`],
            };
          },
        },
        {
          id: "prostokaty-przystajace",
          nazwa: "Czy prostokąty przystają?",
          opis: "Dwa prostokąty podane wymiarami. Rozstrzygnij, czy są przystające (czasem mają to samo pole albo ten sam obwód).",
          generuj(r) {
            return probuj(() => {
              const a = r.int(2, 12);
              const b = r.int(2, 12);
              if (a === b) return null;
              const rodzaj = r.int(0, 3);
              let c;
              let d;
              let tak = false;
              let wskazowka = "";
              if (rodzaj === 0) {
                [c, d] = [b, a];
                tak = true;
              } else if (rodzaj === 1) {
                const mozliwe = [];
                for (let x = 2; x <= 30; x++) if ((a * b) % x === 0 && (a * b) / x >= 2 && x !== a && x !== b) mozliwe.push(x);
                if (!mozliwe.length) return null;
                c = r.pick(mozliwe);
                d = (a * b) / c;
                wskazowka = `Oba prostokąty mają to samo pole ($${a * b}$ cm$^2$).`;
              } else if (rodzaj === 2) {
                const s = a + b;
                const mozliwe = [];
                for (let x = 2; x <= s - 2; x++) if (x !== a && x !== b) mozliwe.push(x);
                if (!mozliwe.length) return null;
                c = r.pick(mozliwe);
                d = s - c;
                wskazowka = `Oba prostokąty mają ten sam obwód ($${2 * s}$ cm).`;
              } else {
                c = a;
                d = r.int(2, 12);
                if (d === b) return null;
                wskazowka = `Jeden wymiar jest ten sam ($${a}$ cm).`;
              }
              const rozw = tak
                ? [`Pierwszy prostokąt ma wymiary $${a}$ i $${b}$. Drugi ma te same dwa wymiary, tylko w innej kolejności.`, "Prostokąt można obrócić i nałożyć na drugi, więc są przystające."]
                : [
                    wskazowka,
                    `Pierwszy prostokąt ma wymiary $${a}$ i $${b}$, a drugi $${c}$ i $${d}$.`,
                    "Przystające prostokąty muszą mieć takie same oba wymiary. Tu tak nie jest, więc nie są przystające.",
                  ];
              return {
                tresc: `Pierwszy prostokąt ma wymiary $${a}$ cm na $${b}$ cm, a drugi $${c}$ cm na $${d}$ cm. Czy te prostokąty są przystające?`,
                pola: [{ id: "w", typ: "wybor", etykieta: "Odpowiedź", opcje: ["Tak, są przystające", "Nie, nie są przystające"] }],
                odpowiedz: { w: tak ? 0 : 1 },
                wynik: tak ? "Tak, są przystające." : "Nie, nie są przystające.",
                rozwiazanie: rozw,
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Cechy przystawania trójkątów
    {
      id: "cechy-przystawania",
      nazwa: "Cechy przystawania trójkątów",
      sciaga: [
        {
          nazwa: "Cecha bbb",
          slownie: "Gdy trzy boki jednego trójkąta są równe trzem bokom drugiego trójkąta, to trójkąty są przystające. Skrót: bok – bok – bok.",
          tex: "|AB|=|KL|\\qquad|BC|=|LM|\\qquad|AC|=|KM|",
          przyklad: "Trójkąt o bokach $3$, $4$, $6$ i trójkąt o bokach $6$, $3$, $4$ są przystające, bo mają te same trzy długości.",
          uwaga: "Liczą się trzy długości, a nie kolejność, w jakiej je wypisano. Najkrótszy bok pasuje do najkrótszego, najdłuższy do najdłuższego.",
        },
        {
          nazwa: "Cecha bkb",
          slownie: "Gdy dwa boki jednego trójkąta są równe dwóm bokom drugiego, a kąty między tymi bokami też są równe, to trójkąty są przystające. Skrót: bok – kąt – bok.",
          tex: "|AB|=|KL|\\qquad\\angle B=\\angle L\\qquad|BC|=|LM|",
          litery: "$\\angle B$ – kąt przy wierzchołku $B$, między bokami $AB$ i $BC$.",
          przyklad: "Dwa trójkąty mają boki $5$ cm i $7$ cm, a kąt między nimi $40^\\circ$. Są przystające, bo takich trójkątów da się zbudować tylko jeden (z dokładnością do ułożenia).",
          uwaga: "Kąt musi leżeć między tymi dwoma bokami. Gdy leży gdzie indziej, ta cecha nie działa.",
        },
        {
          nazwa: "Cecha kbk",
          slownie: "Gdy bok i dwa kąty przy tym boku w jednym trójkącie są równe bokowi i dwóm kątom przy nim w drugim trójkącie, to trójkąty są przystające. Skrót: kąt – bok – kąt.",
          tex: "\\angle A=\\angle K\\qquad|AB|=|KL|\\qquad\\angle B=\\angle L",
          litery: "$\\angle A$, $\\angle B$ – kąty przy końcach boku $AB$.",
          przyklad: "Bok ma $6$ cm, a kąty przy nim $50^\\circ$ i $60^\\circ$. Trzeci kąt: $180^\\circ-50^\\circ-60^\\circ=70^\\circ$. Każde dwa takie trójkąty są przystające.",
          uwaga: "Znając dwa kąty, zawsze policzysz trzeci z sumy $180^\\circ$. Dzięki temu bok może być dowolnym bokiem, przy którym obliczysz oba kąty.",
        },
        {
          nazwa: "Co nie wystarcza",
          slownie: "Trzy równe kąty nie wystarczą. Duży i mały trójkąt równoboczny mają kąty po $60^\\circ$, a nie są przystające. Nie wystarczą też dwa boki i kąt, który nie leży między nimi.",
          przyklad: "Trójkąty o kątach $50^\\circ$, $60^\\circ$, $70^\\circ$ mogą mieć różne boki, więc nie muszą być przystające.",
          uwaga: "W każdej cesze występuje co najmniej jeden bok. Same kąty nigdy nie wystarczą, bo nie mówią nic o wielkości trójkąta.",
        },
      ],
      jak: [
        "Wypisz, co wiesz o obu trójkątach: które boki i które kąty są równe.",
        "Sprawdź, czy to trzy boki (bbb), dwa boki i kąt między nimi (bkb), czy bok i dwa kąty przy nim (kbk).",
        "Gdy znasz dwa kąty, policz trzeci z sumy kątów: $180^\\circ$.",
        "Zapisz wniosek: trójkąty są przystające z cechy ... Podaj, które boki i kąty sobie odpowiadają.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Trójkąt ma boki $4$ cm, $5$ cm i $7$ cm. Który trójkąt jest na pewno do niego przystający? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "trójkąt o bokach $4$ cm, $5$ cm i $8$ cm",
            "trójkąt o obwodzie $16$ cm",
            "trójkąt o bokach $7$ cm, $4$ cm i $5$ cm",
            "trójkąt o bokach $2$ cm, $10$ cm i $14$ cm",
          ],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Trójkąty $ABC$ i $KLM$ mają $|AB|=|KL|$, $|AC|=|KM|$ oraz $\\angle A=\\angle K$. Z której cechy wynika, że są przystające? **Wybierz właściwą odpowiedź.**",
          opcje: ["bbb (trzy boki)", "bkb (dwa boki i kąt między nimi)", "kbk (bok i dwa kąty przy nim)", "z żadnej cechy"],
          poprawna: 1,
        },
        {
          nr: "10",
          tresc: "Trójkąty $ABC$ i $KLM$ mają $|AB|=|KL|=6$ cm, $|BC|=|LM|=8$ cm oraz $\\angle A=\\angle K$. Co z tego wynika? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "Trójkąty są przystające (cecha bbb).",
            "Trójkąty są przystające (cecha bkb).",
            "Trójkąty są przystające (cecha kbk).",
            "Z tych danych nie wynika, że trójkąty są przystające.",
          ],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "W trójkącie $ABC$ mamy $|AB|=7$ cm, $\\angle A=50^\\circ$, $\\angle B=60^\\circ$. W trójkącie $KLM$ mamy $|KL|=7$ cm, $\\angle K=50^\\circ$, $\\angle M=70^\\circ$. Czy trójkąty są przystające? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "Tak, z cechy kbk – kąt przy $L$ ma $60^\\circ$.",
            "Nie, bo trójkąty mają różne kąty.",
            "Nie, bo znamy tylko jeden bok.",
            "Tak, z cechy bbb.",
          ],
          poprawna: 0,
        },
        {
          nr: "12",
          tresc: "Które dane o dwóch trójkątach wystarczą, aby trójkąty były przystające? **Wybierz właściwą odpowiedź.**",
          opcje: [
            "oba mają kąty $40^\\circ$, $60^\\circ$ i $80^\\circ$",
            "oba mają dwa boki: $5$ cm i $6$ cm",
            "oba mają bok $6$ cm i przy nim kąty $30^\\circ$ i $70^\\circ$",
            "oba mają boki $5$ cm i $6$ cm oraz kąt $30^\\circ$, który nie leży między tymi bokami",
          ],
          poprawna: 2,
        },
        {
          nr: "13",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Dwa trójkąty o takich samych trzech kątach są zawsze przystające.", litery: "PF", poprawna: 1 },
            { tekst: "Jeśli trzy boki jednego trójkąta są równe trzem bokom drugiego, to trójkąty są przystające.", litery: "PF", poprawna: 0 },
            { tekst: "Aby trójkąty były przystające, wystarczy, że mają dwa równe boki i jeden równy kąt (gdziekolwiek leży).", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "14",
          punkty: 2,
          tresc: "Trójkąt $ABC$ ma boki $|AB|=6$ cm, $|BC|=9$ cm i $|AC|=11$ cm. Trójkąt $KLM$ ma obwód $26$ cm, a $|KL|=6$ cm i $|LM|=9$ cm. Czy trójkąty są przystające? Uzasadnij. **Zapisz obliczenia.**",
          rozwiazanie: "Trzeci bok trójkąta $KLM$: $|KM|=26-6-9=11$ cm.\n\nMamy więc $|KL|=|AB|=6$ cm, $|LM|=|BC|=9$ cm i $|KM|=|AC|=11$ cm.\n\nTrzy boki jednego trójkąta są równe trzem bokom drugiego, więc z cechy bbb trójkąty są przystające.\n\nOdpowiedź: Tak, trójkąty $ABC$ i $KLM$ są przystające (cecha bbb).",
        },
        {
          nr: "15",
          punkty: 3,
          tresc: "W trójkącie $ABC$ mamy $|AB|=8$ cm, $\\angle A=50^\\circ$ i $\\angle B=70^\\circ$. W trójkącie $KLM$ mamy $|KL|=8$ cm, $\\angle K=50^\\circ$ i $\\angle M=60^\\circ$. Wykaż, że trójkąty są przystające, i podaj, który bok trójkąta $KLM$ odpowiada bokowi $AC$. **Zapisz rozumowanie.**",
          rozwiazanie: "Policzmy brakujący kąt trójkąta $KLM$: $\\angle L=180^\\circ-50^\\circ-60^\\circ=70^\\circ$.\n\nBok $AB$ leży między kątami przy $A$ i $B$, a bok $KL$ leży między kątami przy $K$ i $L$.\n\nMamy $\\angle A=\\angle K=50^\\circ$, $|AB|=|KL|=8$ cm i $\\angle B=\\angle L=70^\\circ$. To cecha kbk, więc trójkąty są przystające.\n\nWierzchołkom odpowiadają: $A\\to K$, $B\\to L$, $C\\to M$. Bok $AC$ łączy $A$ z $C$, więc odpowiada mu bok łączący $K$ z $M$.\n\nOdpowiedź: Trójkąty są przystające (kbk), a bokowi $AC$ odpowiada bok $KM$.",
        },
      ],
      generatory: [
        {
          id: "jaka-cecha",
          nazwa: "Jaka cecha?",
          opis: "Dane są równe boki i kąty dwóch trójkątów. Wskaż cechę przystawania (bbb, bkb, kbk) albo stwierdź, że to za mało.",
          generuj(r) {
            const pary = r.shuffle(TROJKATY).slice(0, 2);
            const P = pary[0];
            const S = pary[1];
            const [v, u, w] = r.shuffle([0, 1, 2]);
            const bok = (i, j, d) => `$|${P[i]}${P[j]}|=|${S[i]}${S[j]}|=${d}$ cm`;
            const kat = (i, a) => `$\\angle ${P[i]}=\\angle ${S[i]}=${st(a)}$`;
            const nazwa = `$${P.join("")}$ i $${S.join("")}$`;
            const uwagaKat = " Zapis $\\angle A$ oznacza kąt przy wierzchołku $A$.";
            const tryb = r.int(0, 5);
            let dane;
            let jakie;
            let kroki;
            let nr;
            if (tryb === 0) {
              const t = probuj(() => {
                const x = [r.int(3, 12), r.int(3, 12), r.int(3, 12)];
                return jestTrojkat(...x) ? x : null;
              });
              dane = `${bok(0, 1, t[0])}, ${bok(1, 2, t[1])} oraz ${bok(0, 2, t[2])}`;
              kroki = ["W danych są trzy pary równych boków i żadnego kąta.", "To cecha bbb: trzy boki jednego trójkąta są równe trzem bokom drugiego."];
              nr = 0;
              jakie = "";
            } else if (tryb === 1 || tryb === 2) {
              const a = r.int(3, 12);
              const b = r.int(3, 12);
              const f = r.int(30, 120);
              dane = `${bok(v, u, a)}, ${bok(v, w, b)} oraz ${kat(v, f)}`;
              kroki = [
                `Równe są dwa boki wychodzące z wierzchołka $${P[v]}$ i kąt przy wierzchołku $${P[v]}$, czyli kąt między tymi bokami.`,
                "To cecha bkb: dwa boki i kąt między nimi.",
              ];
              nr = 1;
              jakie = uwagaKat;
            } else if (tryb === 3) {
              const d = r.int(3, 12);
              const al = r.int(30, 80);
              const be = r.int(30, 90);
              dane = `${kat(u, al)}, ${bok(u, w, d)} oraz ${kat(w, be)}`;
              kroki = [
                `Równy jest bok $${P[u]}${P[w]}$ i oba kąty przy jego końcach: przy $${P[u]}$ i przy $${P[w]}$.`,
                "To cecha kbk: bok i dwa kąty przy nim.",
              ];
              nr = 2;
              jakie = uwagaKat;
            } else if (tryb === 4) {
              const a = r.int(3, 12);
              const b = r.int(3, 12);
              const f = r.int(30, 120);
              const gdzie = r.chance() ? v : w;
              dane = `${bok(v, u, a)}, ${bok(u, w, b)} oraz ${kat(gdzie, f)}`;
              kroki = [
                `Dwa równe boki spotykają się w wierzchołku $${P[u]}$, więc kąt między nimi jest przy $${P[u]}$.`,
                `Równy kąt jest przy $${P[gdzie]}$, czyli nie leży między tymi bokami. Cecha bkb nie działa i żadna inna też nie.`,
              ];
              nr = 3;
              jakie = uwagaKat;
            } else {
              const al = r.int(40, 70);
              const be = r.int(40, 70);
              dane = `${kat(0, al)}, ${kat(1, be)} oraz ${kat(2, 180 - al - be)}`;
              kroki = ["Dane są tylko kąty, a o bokach nic nie wiemy.", "Trzy równe kąty nie wystarczą: trójkąty mogą mieć ten sam kształt, a różną wielkość."];
              nr = 3;
              jakie = uwagaKat;
            }
            return {
              tresc: `Dla trójkątów ${nazwa} wiadomo, że ${dane}.${jakie} Co wynika z tych danych?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Wniosek", opcje: OPCJE_CECH }],
              odpowiedz: { w: nr },
              wynik: OPCJE_CECH[nr],
              rozwiazanie: kroki,
            };
          },
        },
        {
          id: "trzy-boki",
          nazwa: "Trzy boki",
          opis: "Dane są długości boków dwóch trójkątów. Z cechy bbb rozstrzygnij, czy trójkąty są przystające.",
          generuj(r) {
            return probuj(() => {
              const a = [r.int(3, 14), r.int(3, 14), r.int(3, 14)];
              if (!jestTrojkat(...a)) return null;
              const rodzaj = r.int(0, 2);
              let b;
              let dopisek = "";
              if (rodzaj === 0) b = r.shuffle(a);
              else if (rodzaj === 1) {
                b = [...a];
                const i = r.int(0, 2);
                b[i] += r.pick([-2, -1, 1, 2]);
                b = r.shuffle(b);
              } else {
                b = [...a];
                const i = r.int(0, 2);
                const j = (i + r.int(1, 2)) % 3;
                b[i] += 1;
                b[j] -= 1;
                b = r.shuffle(b);
                dopisek = " Oba trójkąty mają taki sam obwód.";
              }
              if (b.some((x) => x < 1) || !jestTrojkat(...b)) return null;
              const tak = takieSame(a, b);
              const lista = (t) => t.map((x) => `$${x}$ cm`).join(", ");
              return {
                tresc: `Pierwszy trójkąt ma boki ${lista(a)}, a drugi ${lista(b)}.${dopisek} Czy te trójkąty są przystające?`,
                pola: [{ id: "w", typ: "wybor", etykieta: "Odpowiedź", opcje: ["Tak, są przystające", "Nie, nie są przystające"] }],
                odpowiedz: { w: tak ? 0 : 1 },
                wynik: tak ? "Tak, są przystające." : "Nie, nie są przystające.",
                rozwiazanie: [
                  `Zapisujemy boki od najkrótszego: $${posortowane(a).join(", ")}$ i $${posortowane(b).join(", ")}$.`,
                  tak
                    ? "Trzy boki jednego trójkąta są równe trzem bokom drugiego, więc z cechy bbb trójkąty są przystające."
                    : "Długości boków się różnią, więc cecha bbb nie jest spełniona. Trójkąty nie są przystające.",
                ],
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Przystawanie trójkątów w dowodach twierdzeń
    {
      id: "przystawanie-dowody",
      nazwa: "Przystawanie trójkątów w dowodach twierdzeń",
      sciaga: [
        {
          nazwa: "Plan dowodu",
          slownie: "Gdy masz wykazać, że dwa odcinki albo dwa kąty są równe, szukaj dwóch trójkątów, w których te odcinki (kąty) sobie odpowiadają. Wykaż, że trójkąty są przystające, a wtedy odpowiadające elementy są równe.",
          przyklad: "Teza: $|AC|=|BD|$. Znajdujemy trójkąty $AOC$ i $BOD$ i pokazujemy, że przystają. Wtedy bokowi $AC$ odpowiada bok $BD$, więc są równe.",
          uwaga: "Nie zakładaj, że trójkąty przystają. To ma wyniknąć z trzech uzasadnionych równości.",
        },
        {
          nazwa: "Skąd brać równe elementy",
          slownie: "Równe elementy mogą wynikać z treści zadania (np. środek dzieli odcinek na dwie równe części), z kątów wierzchołkowych, z kątów naprzemianległych przy prostych równoległych albo z boku wspólnego dla obu trójkątów.",
          przyklad: "Odcinki $AB$ i $CD$ przecinają się w punkcie $O$, który jest środkiem każdego z nich. W trójkątach $AOC$ i $BOD$: $|AO|=|BO|$, $|CO|=|DO|$ oraz kąty $AOC$ i $BOD$ są wierzchołkowe, więc równe. To cecha bkb.",
          uwaga: "Wspólny bok jest równy sam sobie. To pełnoprawna równość, ale trzeba o niej napisać.",
        },
        {
          nazwa: "Przekątna równoległoboku",
          slownie: "Przekątna dzieli równoległobok na dwa przystające trójkąty. Wynika stąd, że przeciwległe boki równoległoboku są równe.",
          przyklad: "W równoległoboku $ABCD$ przekątna $AC$ jest wspólna dla trójkątów $ABC$ i $CDA$. Kąty $BAC$ i $DCA$ są równe (naprzemianległe, bo $AB\\parallel CD$), a kąty $BCA$ i $DAC$ też (bo $BC\\parallel AD$). Z cechy kbk trójkąty są przystające, więc $|AB|=|CD|$ i $|BC|=|DA|$.",
          uwaga: "Kąty naprzemianległe są równe tylko przy prostych równoległych. Tu równoległość daje nam treść zadania.",
        },
        {
          nazwa: "Trójkąt równoramienny",
          slownie: "Aby wykazać, że kąty przy podstawie trójkąta równoramiennego są równe, prowadzimy odcinek ze szczytu do środka podstawy. Powstają dwa trójkąty o trzech parami równych bokach.",
          przyklad: "W trójkącie $ABC$ jest $|AC|=|BC|$, a $M$ to środek $AB$. W trójkątach $AMC$ i $BMC$: $|AM|=|BM|$, $|AC|=|BC|$, a $|CM|$ jest wspólny. Z cechy bbb przystają, więc $\\angle A=\\angle B$.",
          uwaga: "Zanim użyjesz przystawania, uzasadnij każdą z trzech równości. Samo „widać z rysunku” to za mało.",
        },
      ],
      jak: [
        "Zapisz założenie i tezę. Opisz słowami, gdzie leżą punkty.",
        "Wskaż dwa trójkąty, w których szukane odcinki albo kąty sobie odpowiadają.",
        "Wypisz trzy pary równych elementów i przy każdej napisz, skąd to wiadomo. Nazwij cechę: bbb, bkb albo kbk.",
        "Napisz: trójkąty są przystające, więc odpowiadające boki (kąty) są równe. To jest teza.",
      ],
      zadania: [
        {
          nr: "16",
          tresc: "Odcinki $AB$ i $CD$ przecinają się w punkcie $O$, który jest środkiem każdego z nich. Trójkąty $AOC$ i $BOD$ są przystające z cechy. **Wybierz właściwą odpowiedź.**",
          opcje: ["bbb", "kbk", "bkb", "z żadnej cechy"],
          poprawna: 2,
        },
        {
          nr: "17",
          tresc: "Odcinki $AB$ i $CD$ przecinają się w punkcie $O$, który jest środkiem każdego z nich. Wiadomo, że $|AO|=4$ cm, $|CO|=5$ cm i $|AC|=9$ cm. Bok $BD$ ma długość. **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$ cm", "$9$ cm", "$5$ cm", "$18$ cm"],
          poprawna: 1,
        },
        {
          nr: "18",
          tresc: "W równoległoboku $ABCD$ prowadzimy przekątną $AC$. Kąty $BAC$ i $DCA$ są równe, bo są. **Wybierz właściwą odpowiedź.**",
          opcje: [
            "kątami wierzchołkowymi",
            "kątami przyległymi",
            "kątami przy podstawie trójkąta równoramiennego",
            "kątami naprzemianległymi przy prostych równoległych $AB$ i $CD$",
          ],
          poprawna: 3,
        },
        {
          nr: "19",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Z przystawania trójkątów wynika, że wszystkie odpowiadające sobie boki są równe.", litery: "PF", poprawna: 0 },
            { tekst: "Aby trójkąty były przystające, wystarczy wskazać dwie pary równych elementów.", litery: "PF", poprawna: 1 },
            { tekst: "Wspólny bok dwóch trójkątów można uznać za parę równych boków.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "20",
          tresc: "W trójkącie $ABC$ mamy $|AC|=|BC|$, a punkt $M$ jest środkiem boku $AB$. Trójkąty $AMC$ i $BMC$ są przystające z cechy. **Wybierz właściwą odpowiedź.**",
          opcje: ["bbb", "bkb", "kbk", "nie są przystające"],
          poprawna: 0,
        },
        {
          nr: "21",
          tresc: "W trójkącie równoramiennym $ABC$ ($|AC|=|BC|$) punkt $M$ jest środkiem podstawy $AB$. Z przystawania trójkątów $AMC$ i $BMC$ wynika, że kąty $AMC$ i $BMC$ są równe. Ile stopni ma kąt $AMC$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$45^\\circ$", "$60^\\circ$", "$90^\\circ$", "$180^\\circ$"],
          poprawna: 2,
        },
      ],
      otwarte: [
        {
          nr: "22",
          punkty: 2,
          tresc: "Odcinki $AB$ i $CD$ przecinają się w punkcie $O$, który jest środkiem każdego z nich. Udowodnij, że $|AC|=|BD|$. **Zapisz rozumowanie.**",
          rozwiazanie: "Założenie: $O$ jest środkiem odcinka $AB$ i środkiem odcinka $CD$. Teza: $|AC|=|BD|$.\n\nRozważmy trójkąty $AOC$ i $BOD$. Bokowi $AC$ w pierwszym trójkącie odpowiada bok $BD$ w drugim.\n\n$O$ jest środkiem $AB$, więc $|AO|=|BO|$. $O$ jest środkiem $CD$, więc $|CO|=|DO|$.\n\nKąty $AOC$ i $BOD$ są wierzchołkowe (leżą naprzeciw siebie przy przecinających się prostych), więc są równe.\n\nW obu trójkątach dwa boki są równe, i kąty między nimi też. Z cechy bkb trójkąty $AOC$ i $BOD$ są przystające, więc odpowiadające sobie boki $AC$ i $BD$ są równe.\n\nOdpowiedź: $|AC|=|BD|$, co należało wykazać.",
        },
        {
          nr: "23",
          punkty: 3,
          tresc: "Czworokąt $ABCD$ jest równoległobokiem, czyli $AB\\parallel CD$ i $BC\\parallel AD$. Udowodnij, że $|AB|=|CD|$ i $|BC|=|AD|$. Poprowadź przekątną $AC$. **Zapisz rozumowanie.**",
          rozwiazanie: "Założenie: $AB\\parallel CD$ i $BC\\parallel AD$. Teza: $|AB|=|CD|$ i $|BC|=|AD|$.\n\nPrzekątna $AC$ dzieli czworokąt na trójkąty $ABC$ i $CDA$. Wierzchołkowi $A$ odpowiada $C$, wierzchołkowi $B$ odpowiada $D$, a wierzchołkowi $C$ odpowiada $A$.\n\nBok $AC$ jest wspólny dla obu trójkątów.\n\nProste $AB$ i $CD$ są równoległe, a $AC$ je przecina, więc kąty naprzemianległe $BAC$ i $DCA$ są równe.\n\nProste $BC$ i $AD$ są równoległe, a $AC$ je przecina, więc kąty naprzemianległe $BCA$ i $DAC$ są równe.\n\nW obu trójkątach mamy bok $AC$ i dwa równe kąty przy nim. Z cechy kbk trójkąty $ABC$ i $CDA$ są przystające.\n\nStąd $|AB|=|CD|$ i $|BC|=|DA|$.\n\nOdpowiedź: Przeciwległe boki równoległoboku są równe, co należało wykazać.",
        },
      ],
      generatory: [
        {
          id: "przecinajace-sie-odcinki",
          nazwa: "Przecinające się odcinki",
          opis: "Punkt $O$ jest środkiem dwóch odcinków. Z przystawania trójkątów $AOC$ i $BOD$ oblicz bok, kąt albo obwód.",
          generuj(r) {
            const [A, B, C, D] = r.pick([["A", "B", "C", "D"], ["K", "L", "M", "N"], ["P", "Q", "R", "S"], ["E", "F", "G", "H"]]);
            const O = "O";
            const wstep = `Odcinki $${A}${B}$ i $${C}${D}$ przecinają się w punkcie $${O}$, który jest środkiem każdego z nich.`;
            const baza = [
              `$${O}$ jest środkiem obu odcinków, więc $|${A}${O}|=|${B}${O}|$ i $|${C}${O}|=|${D}${O}|$.`,
              `Kąty $${A}${O}${C}$ i $${B}${O}${D}$ są wierzchołkowe, więc są równe.`,
              `Z cechy bkb trójkąty $${A}${O}${C}$ i $${B}${O}${D}$ są przystające (wierzchołki odpowiadają sobie tak: $${A}\\to ${B}$, $${C}\\to ${D}$, $${O}\\to ${O}$).`,
            ];
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const x = r.int(3, 15);
              return {
                tresc: `${wstep} Wiadomo, że $|${A}${C}|=${x}$ cm. Ile centymetrów ma odcinek $${B}${D}$?`,
                pola: [pole("w", `$|${B}${D}|$ (cm) $=$`)],
                odpowiedz: { w: q(x) },
                wynik: `$${x}$ cm`,
                rozwiazanie: [...baza, `Bokowi $${A}${C}$ odpowiada bok $${B}${D}$, więc $|${B}${D}|=${x}$ cm.`],
              };
            }
            if (tryb === 1 || tryb === 2) {
              const al = r.int(20, 80);
              const pierwszy = tryb === 1;
              const dane = pierwszy ? `${O}${A}${C}` : `${O}${C}${A}`;
              const szuk = pierwszy ? `${O}${B}${D}` : `${O}${D}${B}`;
              const odp = pierwszy ? `Kątowi $${O}${A}${C}$ (przy $${A}$) odpowiada kąt $${O}${B}${D}$ (przy $${B}$).` : `Kątowi $${O}${C}${A}$ (przy $${C}$) odpowiada kąt $${O}${D}${B}$ (przy $${D}$).`;
              return {
                tresc: `${wstep} Kąt $${dane}$ ma $${st(al)}$. Ile stopni ma kąt $${szuk}$?`,
                pola: [pole("w", `Kąt $${szuk}$ (w stopniach) $=$`)],
                odpowiedz: { w: q(al) },
                wynik: `$${st(al)}$`,
                rozwiazanie: [...baza, odp, `Odpowiadające sobie kąty są równe, więc kąt $${szuk}$ ma $${st(al)}$.`],
              };
            }
            const t = probuj(() => {
              const x = [r.int(2, 9), r.int(2, 9), r.int(2, 9)];
              return jestTrojkat(...x) ? x : null;
            });
            const [y, z, x] = t;
            const w = x + y + z;
            return {
              tresc: `${wstep} Wiadomo, że $|${A}${O}|=${y}$ cm, $|${C}${O}|=${z}$ cm i $|${A}${C}|=${x}$ cm. Ile centymetrów wynosi obwód trójkąta $${B}${O}${D}$?`,
              pola: [pole("w", "Obwód (cm) $=$")],
              odpowiedz: { w: q(w) },
              wynik: `$${w}$ cm`,
              rozwiazanie: [...baza, `Trójkąt $${B}${O}${D}$ ma boki: $|${B}${O}|=${y}$, $|${D}${O}|=${z}$, $|${B}${D}|=${x}$ cm.`, `Obwód: $${y}+${z}+${x}=${w}$ cm.`],
            };
          },
        },
        {
          id: "srodek-podstawy",
          nazwa: "Środek podstawy",
          opis: "Trójkąt równoramienny i środek podstawy. Z przystawania dwóch trójkątów oblicz odcinek albo kąt.",
          generuj(r) {
            const [A, B, C, M] = r.pick([["A", "B", "C", "M"], ["K", "L", "N", "S"], ["P", "Q", "R", "T"], ["D", "E", "F", "G"]]);
            const wstep = `W trójkącie równoramiennym $${A}${B}${C}$ ramiona $${A}${C}$ i $${B}${C}$ mają równą długość. Punkt $${M}$ jest środkiem podstawy $${A}${B}$.`;
            const baza = `Trójkąty $${A}${M}${C}$ i $${B}${M}${C}$ mają: $|${A}${M}|=|${B}${M}|$ ($${M}$ jest środkiem), $|${A}${C}|=|${B}${C}|$ (ramiona) i wspólny bok $${M}${C}$. Z cechy bbb są przystające.`;
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const p = 2 * r.int(2, 9);
              const a = r.int(p / 2 + 1, p / 2 + 8);
              return {
                tresc: `${wstep} Podstawa ma $|${A}${B}|=${p}$ cm, a ramię $|${A}${C}|=${a}$ cm. Ile centymetrów ma odcinek $${A}${M}$?`,
                pola: [pole("w", `$|${A}${M}|$ (cm) $=$`)],
                odpowiedz: { w: q(p / 2) },
                wynik: `$${p / 2}$ cm`,
                rozwiazanie: [baza, `Punkt $${M}$ dzieli podstawę na dwie równe części, więc $|${A}${M}|=${p}:2=${p / 2}$ cm.`],
              };
            }
            if (tryb === 1) {
              const g = 2 * r.int(10, 70);
              return {
                tresc: `${wstep} Kąt $${A}${C}${B}$ ma $${st(g)}$. Ile stopni ma kąt $${A}${C}${M}$?`,
                pola: [pole("w", `Kąt $${A}${C}${M}$ (w stopniach) $=$`)],
                odpowiedz: { w: q(g / 2) },
                wynik: `$${st(g / 2)}$`,
                rozwiazanie: [baza, `Odpowiadające sobie kąty są równe, więc $\\angle ${A}${C}${M}=\\angle ${B}${C}${M}$. Razem dają kąt $${A}${C}${B}$.`, `Każdy z nich ma $${st(g)}:2=${st(g / 2)}$.`],
              };
            }
            if (tryb === 2) {
              const g = 2 * r.int(10, 70);
              const w = (180 - g) / 2;
              return {
                tresc: `${wstep} Kąt $${A}${C}${B}$ ma $${st(g)}$. Ile stopni ma kąt $${C}${A}${B}$ (przy podstawie)?`,
                pola: [pole("w", `Kąt $${C}${A}${B}$ (w stopniach) $=$`)],
                odpowiedz: { w: q(w) },
                wynik: `$${st(w)}$`,
                rozwiazanie: [baza, `Odpowiadające sobie kąty są równe, więc kąty przy podstawie $${A}$ i $${B}$ są równe.`, `Razem z kątem $${st(g)}$ dają $180^\\circ$, więc każdy z nich ma $(180^\\circ-${st(g)}):2=${st(w)}$.`],
              };
            }
            const a = r.int(5, 15);
            return {
              tresc: `${wstep} Ramię ma $|${A}${C}|=${a}$ cm. Ile stopni ma kąt $${A}${M}${C}$?`,
              pola: [pole("w", `Kąt $${A}${M}${C}$ (w stopniach) $=$`)],
              odpowiedz: { w: q(90) },
              wynik: `$${st(90)}$`,
              rozwiazanie: [baza, `Odpowiadające sobie kąty są równe, więc $\\angle ${A}${M}${C}=\\angle ${B}${M}${C}$.`, `Te dwa kąty są przyległe, więc razem dają $180^\\circ$. Każdy ma $180^\\circ:2=90^\\circ$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Wielokąty foremne
    {
      id: "wielokaty-foremne",
      nazwa: "Wielokąty foremne",
      sciaga: [
        {
          nazwa: "Wielokąt foremny",
          slownie: "Wielokąt foremny ma wszystkie boki równe i wszystkie kąty równe. Trójkąt foremny to trójkąt równoboczny, a czworokąt foremny to kwadrat. Dalej są pięciokąt, sześciokąt, ośmiokąt foremny i tak dalej.",
          przyklad: "Kwadrat jest foremny. Prostokąt $2\\times3$ ma równe kąty, ale nie wszystkie boki, więc nie jest foremny. Romb ma równe boki, ale kąty nie zawsze, więc też zwykle nie jest foremny.",
          uwaga: "Trzeba obu rzeczy naraz: równych boków i równych kątów. Samo jedno nie wystarcza.",
        },
        {
          nazwa: "Suma kątów wielokąta",
          slownie: "Z jednego wierzchołka wielokąta o $n$ bokach prowadzimy przekątne. Dzielą go na $n-2$ trójkąty, a w każdym suma kątów to $180^\\circ$.",
          tex: "S=(n-2)\\cdot180^\\circ",
          litery: "$n$ – liczba boków (i kątów) wielokąta, $S$ – suma jego kątów wewnętrznych.",
          przyklad: "Pięciokąt: $(5-2)\\cdot180^\\circ=3\\cdot180^\\circ=540^\\circ$. Ośmiokąt: $6\\cdot180^\\circ=1080^\\circ$.",
          uwaga: "Mnożymy przez $n-2$, a nie przez $n$. Sprawdź na trójkącie ($1\\cdot180^\\circ$) i czworokącie ($2\\cdot180^\\circ=360^\\circ$).",
        },
        {
          nazwa: "Kąt wielokąta foremnego",
          slownie: "W wielokącie foremnym wszystkie kąty są równe. Kąt wewnętrzny to więc suma kątów podzielona przez liczbę kątów.",
          tex: "\\alpha=\\frac{(n-2)\\cdot180^\\circ}{n}",
          litery: "$\\alpha$ – kąt wewnętrzny wielokąta foremnego, $n$ – liczba boków.",
          przyklad: "Sześciokąt foremny: $4\\cdot180^\\circ=720^\\circ$, a $720^\\circ:6=120^\\circ$. Ośmiokąt foremny: $1080^\\circ:8=135^\\circ$. Pięciokąt foremny: $540^\\circ:5=108^\\circ$.",
          uwaga: "Dziel przez liczbę kątów $n$, a nie przez $n-2$.",
        },
        {
          nazwa: "Sześciokąt foremny",
          slownie: "Sześciokąt foremny składa się z sześciu trójkątów równobocznych o wspólnym wierzchołku w środku sześciokąta. Bok sześciokąta jest więc równy odległości środka od wierzchołka. Każdy kąt sześciokąta składa się z dwóch kątów $60^\\circ$.",
          tex: "\\alpha=2\\cdot60^\\circ=120^\\circ",
          przyklad: "Sześciokąt foremny o boku $5$ cm. Odcinek od środka do wierzchołka też ma $5$ cm. Obwód: $6\\cdot5=30$ cm.",
          uwaga: "Trójkąty są równoboczne właśnie dlatego, że to sześciokąt. W ośmiokącie foremnym tak już nie jest.",
        },
        {
          nazwa: "Obwód wielokąta foremnego",
          slownie: "Wszystkie boki są równe, więc obwód to liczba boków razy długość jednego boku. Gdy znasz obwód, dzielisz go przez liczbę boków.",
          tex: "\\text{Ob}=n\\cdot a",
          litery: "$n$ – liczba boków, $a$ – długość boku.",
          przyklad: "Ośmiokąt foremny o boku $3$ cm ma obwód $8\\cdot3=24$ cm. Siedmiokąt foremny o obwodzie $42$ cm ma bok $42:7=6$ cm.",
          uwaga: "Gdy znasz obwód, dziel przez $n$, a nie mnóż.",
        },
      ],
      jak: [
        "Policz, ile boków ma wielokąt ($n$).",
        "Suma kątów to $(n-2)\\cdot180^\\circ$. Kąt wielokąta foremnego dostaniesz, dzieląc ją przez $n$.",
        "Obwód to $n\\cdot a$. Gdy znasz obwód, dziel przez $n$, żeby dostać bok.",
        "Przy sześciokącie foremnym szukaj sześciu trójkątów równobocznych: odcinek od środka do wierzchołka jest równy bokowi.",
      ],
      zadania: [
        {
          nr: "24",
          tresc: "Kąt wewnętrzny pięciokąta foremnego ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$72^\\circ$", "$108^\\circ$", "$120^\\circ$", "$540^\\circ$"],
          poprawna: 1,
        },
        {
          nr: "25",
          tresc: "Suma kątów wewnętrznych ośmiokąta jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$1440^\\circ$", "$1260^\\circ$", "$720^\\circ$", "$1080^\\circ$"],
          poprawna: 3,
        },
        {
          nr: "26",
          tresc: "Obwód sześciokąta foremnego jest równy $42$ cm. Odcinek łączący środek sześciokąta z jego wierzchołkiem ma długość. **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$ cm", "$14$ cm", "$7$ cm", "$21$ cm"],
          poprawna: 2,
        },
        {
          nr: "27",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Prostokąt o bokach $2$ cm i $3$ cm jest czworokątem foremnym.", litery: "PF", poprawna: 1 },
            { tekst: "Sześciokąt foremny można podzielić na sześć trójkątów równobocznych o wspólnym wierzchołku w jego środku.", litery: "PF", poprawna: 0 },
            { tekst: "Kąt wewnętrzny dziesięciokąta foremnego ma $144^\\circ$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "28",
          tresc: "Wielokąt foremny ma obwód $56$ cm, a jego bok ma $7$ cm. Ile boków ma ten wielokąt? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$", "$49$", "$7$", "$392$"],
          poprawna: 0,
        },
        {
          nr: "29",
          tresc: "Z jednego wierzchołka dziesięciokąta prowadzimy wszystkie przekątne. Na ile trójkątów dzielą one ten dziesięciokąt? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10$", "$9$", "$12$", "$8$"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "30",
          punkty: 3,
          tresc: "Kąt wewnętrzny pewnego wielokąta foremnego ma $140^\\circ$. Ile boków ma ten wielokąt? Ułóż równanie. **Zapisz obliczenia.**",
          rozwiazanie: "Niech wielokąt ma $n$ boków. Suma jego kątów to $(n-2)\\cdot180^\\circ$.\n\nWszystkie $n$ kątów ma po $140^\\circ$, więc suma to też $n\\cdot140^\\circ$.\n\nRównanie: $(n-2)\\cdot180=140n$, czyli $180n-360=140n$.\n\nStąd $40n=360$, czyli $n=9$.\n\nSprawdzenie: $7\\cdot180^\\circ=1260^\\circ$, a $1260^\\circ:9=140^\\circ$. Zgadza się.\n\nOdpowiedź: Ten wielokąt ma $9$ boków (jest to dziewięciokąt foremny).",
        },
        {
          nr: "31",
          punkty: 2,
          tresc: "Sześciokąt foremny $ABCDEF$ ma bok $4$ cm. Przekątna $AD$ przechodzi przez środek $O$ sześciokąta i dzieli go na dwie równe części. Oblicz obwód jednej z tych części (czworokąta $ABCD$). **Zapisz obliczenia.**",
          rozwiazanie: "Sześciokąt foremny składa się z sześciu trójkątów równobocznych o boku $4$ cm, które mają wspólny wierzchołek $O$. Odcinki $OA$ i $OD$ mają więc po $4$ cm.\n\nPrzekątna $AD$ przechodzi przez $O$, więc $|AD|=|AO|+|OD|=4+4=8$ cm.\n\nCzworokąt $ABCD$ ma boki: $|AB|=|BC|=|CD|=4$ cm i $|AD|=8$ cm.\n\nObwód: $4+4+4+8=20$ cm.\n\nOdpowiedź: Obwód czworokąta $ABCD$ wynosi $20$ cm.",
        },
      ],
      generatory: [
        {
          id: "katy-wielokata",
          nazwa: "Kąty wielokąta",
          opis: "Oblicz sumę kątów wielokąta, kąt wielokąta foremnego albo liczbę boków, gdy znasz sumę lub kąt.",
          generuj(r) {
            const tryb = r.int(0, 3);
            const FOREMNE = [5, 6, 8, 9, 10, 12, 15, 18, 20];
            if (tryb === 0) {
              const n = r.int(5, 20);
              const w = (n - 2) * 180;
              return {
                tresc: `Wielokąt ma $${n}$ boków. Ile stopni wynosi suma jego kątów wewnętrznych?`,
                pola: [pole("w", "Suma kątów (w stopniach) $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${st(w)}$`,
                rozwiazanie: [
                  `Z jednego wierzchołka prowadzimy przekątne. Wielokąt dzieli się na $${n}-2=${n - 2}$ trójkątów.`,
                  `W każdym suma kątów to $180^\\circ$, więc $${n - 2}\\cdot180^\\circ=${st(w)}$.`,
                ],
              };
            }
            if (tryb === 1) {
              const n = r.pick(FOREMNE);
              const s = (n - 2) * 180;
              const w = s / n;
              return {
                tresc: `Ile stopni ma kąt wewnętrzny ${dop(n)}?`,
                pola: [pole("w", "Kąt (w stopniach) $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${st(w)}$`,
                rozwiazanie: [
                  `Suma kątów wielokąta o $${n}$ bokach: $(${n}-2)\\cdot180^\\circ=${n - 2}\\cdot180^\\circ=${st(s)}$.`,
                  `Wszystkie $${n}$ kątów są równe, więc jeden ma $${st(s)}:${n}=${st(w)}$.`,
                ],
              };
            }
            if (tryb === 2) {
              const n = r.int(5, 20);
              const s = (n - 2) * 180;
              return {
                tresc: `Suma kątów wewnętrznych pewnego wielokąta wynosi $${st(s)}$. Ile boków ma ten wielokąt?`,
                pola: [pole("w", "Liczba boków $=$")],
                odpowiedz: { w: q(n) },
                wynik: `$${n}$`,
                rozwiazanie: [
                  "Suma kątów to $(n-2)\\cdot180^\\circ$, gdzie $n$ to liczba boków.",
                  `Dzielimy: $${s}:180=${n - 2}$, czyli $n-2=${n - 2}$.`,
                  `Stąd $n=${n - 2}+2=${n}$.`,
                ],
              };
            }
            const n = r.pick(FOREMNE);
            const a = ((n - 2) * 180) / n;
            const reszta = 180 - a;
            return {
              tresc: `Kąt wewnętrzny pewnego wielokąta foremnego ma $${st(a)}$. Ile boków ma ten wielokąt?`,
              pola: [pole("w", "Liczba boków $=$")],
              odpowiedz: { w: q(n) },
              wynik: `$${n}$`,
              rozwiazanie: [
                `Suma kątów to $(n-2)\\cdot180^\\circ$, a wszystkie $n$ kątów ma po $${st(a)}$. Równanie: $(n-2)\\cdot180=${a}n$.`,
                `Stąd $180n-360=${a}n$, czyli $${reszta}n=360$.`,
                `$n=360:${reszta}=${n}$.`,
              ],
            };
          },
        },
        {
          id: "obwod-foremnego",
          nazwa: "Obwód wielokąta foremnego",
          opis: "Oblicz obwód albo bok wielokąta foremnego. Dla sześciokąta skorzystaj z trójkątów równobocznych.",
          generuj(r) {
            const tryb = r.int(0, 4);
            const N = [5, 6, 7, 8, 9, 10, 12];
            if (tryb === 0) {
              const n = r.pick(N);
              const a = r.int(2, 15);
              const w = n * a;
              return {
                tresc: `Bok ${dop(n)} ma $${a}$ cm. Ile centymetrów wynosi obwód tego wielokąta?`,
                pola: [pole("w", "Obwód (cm) $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$ cm`,
                rozwiazanie: ["Wszystkie boki są równe, więc obwód to liczba boków razy bok.", `$${n}\\cdot${a}=${w}$ cm.`],
              };
            }
            if (tryb === 1) {
              const n = r.pick(N);
              const a = r.int(2, 15);
              const p = n * a;
              return {
                tresc: `Obwód ${dop(n)} wynosi $${p}$ cm. Ile centymetrów ma bok tego wielokąta?`,
                pola: [pole("w", "Bok (cm) $=$")],
                odpowiedz: { w: q(a) },
                wynik: `$${a}$ cm`,
                rozwiazanie: ["Wszystkie boki są równe, więc bok to obwód podzielony przez liczbę boków.", `$${p}:${n}=${a}$ cm.`],
              };
            }
            const opisSzesc = "Sześciokąt foremny składa się z sześciu trójkątów równobocznych o wspólnym wierzchołku w środku sześciokąta.";
            if (tryb === 2) {
              const rr = r.int(2, 15);
              const w = 6 * rr;
              return {
                tresc: `${opisSzesc} Odcinek łączący środek sześciokąta z jego wierzchołkiem ma $${rr}$ cm. Ile centymetrów wynosi obwód sześciokąta?`,
                pola: [pole("w", "Obwód (cm) $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$ cm`,
                rozwiazanie: [
                  "Trójkąty są równoboczne, więc bok sześciokąta jest równy odcinkowi od środka do wierzchołka.",
                  `Bok ma $${rr}$ cm, więc obwód to $6\\cdot${rr}=${w}$ cm.`,
                ],
              };
            }
            if (tryb === 3) {
              const rr = r.int(2, 15);
              const p = 6 * rr;
              return {
                tresc: `${opisSzesc} Obwód sześciokąta wynosi $${p}$ cm. Ile centymetrów ma odcinek łączący środek z wierzchołkiem?`,
                pola: [pole("w", "Odcinek (cm) $=$")],
                odpowiedz: { w: q(rr) },
                wynik: `$${rr}$ cm`,
                rozwiazanie: [`Bok sześciokąta: $${p}:6=${rr}$ cm.`, "Trójkąty są równoboczne, więc odcinek od środka do wierzchołka ma tyle samo co bok."],
              };
            }
            const a = r.int(2, 15);
            const w = 5 * a;
            return {
              tresc: `Sześciokąt foremny $ABCDEF$ ma bok $${a}$ cm. Przekątna $AD$ przechodzi przez środek sześciokąta i dzieli go na dwie równe części. Ile centymetrów wynosi obwód czworokąta $ABCD$?`,
              pola: [pole("w", "Obwód (cm) $=$")],
              odpowiedz: { w: q(w) },
              wynik: `$${w}$ cm`,
              rozwiazanie: [
                `Sześciokąt składa się z trójkątów równobocznych o boku $${a}$ cm, więc odcinek od środka do wierzchołka też ma $${a}$ cm.`,
                `Przekątna $AD$ przechodzi przez środek: $|AD|=${a}+${a}=${2 * a}$ cm.`,
                `Obwód: trzy boki po $${a}$ cm i przekątna: $3\\cdot${a}+${2 * a}=${w}$ cm.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
