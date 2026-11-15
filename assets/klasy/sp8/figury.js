// Klasa 8 (szkoła podstawowa) · rozdział III „Figury na płaszczyźnie” – Matematyka z kluczem 8 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Bez rysunków: każdą figurę opisano słowami. Dowody to proste rozumowania krok po kroku.
import { q, wielomianTex } from "../../generatory/wspolne.js";

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

const nwd = (a, b) => (b ? nwd(b, a % b) : a);

const TROJKATY = [["A", "B", "C"], ["K", "L", "M"], ["P", "Q", "R"], ["D", "E", "F"]];

// Twierdzenia „Jeśli …, to …” do ćwiczenia założenia i tezy.
const TWIERDZENIA = [
  ["trójkąt jest równoramienny", "ma dwa równe kąty"],
  ["liczba kończy się cyfrą $0$", "liczba dzieli się przez $5$"],
  ["czworokąt jest kwadratem", "ma cztery kąty proste"],
  ["dwa kąty są wierzchołkowe", "mają równe miary"],
  ["dwa kąty są przyległe", "ich suma wynosi $180^\\circ$"],
  ["liczba jest parzysta", "jej ostatnia cyfra to $0$, $2$, $4$, $6$ lub $8$"],
  ["trójkąt jest prostokątny", "suma jego dwóch kątów ostrych wynosi $90^\\circ$"],
  ["liczby $a$ i $b$ są nieparzyste", "suma $a+b$ jest parzysta"],
  ["dwie proste są równoległe", "kąty odpowiadające przy tych prostych mają równe miary"],
  ["liczba dzieli się przez $6$", "liczba dzieli się przez $3$"],
  ["trójkąt ma trzy równe boki", "ma trzy równe kąty"],
  ["czworokąt jest równoległobokiem", "jego przeciwległe kąty są równe"],
  ["suma cyfr liczby dzieli się przez $3$", "liczba dzieli się przez $3$"],
  ["trójkąt ma kąt prosty", "jego pozostałe dwa kąty są ostre"],
  ["liczba jest nieparzysta", "liczba nie dzieli się przez $2$"],
];

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Własności kątów
    {
      id: "wlasnosci-katow",
      nazwa: "Własności kątów",
      sciaga: [
        {
          nazwa: "Kąty przyległe",
          slownie: "Dwa kąty przyległe mają wspólne ramię, a ich drugie ramiona tworzą jedną prostą. Razem dają kąt półpełny, czyli $180^\\circ$.",
          tex: "\\alpha+\\beta=180^\\circ",
          litery: "$\\alpha$, $\\beta$ – miary kątów przyległych.",
          przyklad: "Jeden kąt ma $65^\\circ$, więc kąt do niego przyległy ma $180^\\circ-65^\\circ=115^\\circ$.",
          uwaga: "Suma kątów przyległych to $180^\\circ$, a nie $90^\\circ$. Suma $90^\\circ$ jest dla kątów, które razem tworzą kąt prosty.",
        },
        {
          nazwa: "Kąty wierzchołkowe",
          slownie: "Gdy dwie proste się przecinają, powstają cztery kąty. Kąty leżące naprzeciw siebie (przy tym samym wierzchołku) są wierzchołkowe i mają równe miary.",
          tex: "\\alpha=\\gamma",
          litery: "$\\alpha$, $\\gamma$ – kąty wierzchołkowe (leżą naprzeciw siebie).",
          przyklad: "Dwie proste się przecinają i jeden kąt ma $50^\\circ$. Kąt naprzeciw też ma $50^\\circ$, a dwa pozostałe mają po $180^\\circ-50^\\circ=130^\\circ$.",
          uwaga: "Kąty leżące obok siebie nie są wierzchołkowe, tylko przyległe. Ich miary dają razem $180^\\circ$.",
        },
        {
          nazwa: "Proste równoległe",
          slownie: "Gdy prosta przecina dwie proste równoległe, kąty odpowiadające (w tym samym miejscu przy każdej prostej) są równe. Równe są też kąty naprzemianległe (między prostymi, po przeciwnych stronach przecinającej prostej).",
          tex: "\\alpha=\\beta",
          litery: "$\\alpha$, $\\beta$ – kąty odpowiadające albo naprzemianległe.",
          przyklad: "Kąt przy pierwszej prostej ma $70^\\circ$. Kąt odpowiadający przy drugiej prostej ma też $70^\\circ$, a kąt do niego przyległy ma $180^\\circ-70^\\circ=110^\\circ$.",
          uwaga: "To działa tylko wtedy, gdy proste są równoległe. Dla dwóch dowolnych prostych te kąty nie muszą być równe.",
        },
        {
          nazwa: "Suma kątów figury",
          slownie: "W każdym trójkącie suma kątów to $180^\\circ$. W każdym czworokącie suma kątów to $360^\\circ$. Szukany kąt to różnica: suma minus znane kąty.",
          tex: "\\text{trójkąt: }180^\\circ\\qquad\\text{czworokąt: }360^\\circ",
          przyklad: "Trójkąt ma kąty $48^\\circ$ i $75^\\circ$. Trzeci kąt: $180^\\circ-48^\\circ-75^\\circ=57^\\circ$. Czworokąt ma kąty $90^\\circ$, $100^\\circ$, $80^\\circ$, więc czwarty: $360^\\circ-270^\\circ=90^\\circ$.",
          uwaga: "Trójkąt $180^\\circ$, czworokąt $360^\\circ$. Nie myl tych liczb.",
        },
      ],
      jak: [
        "Zapisz, co jest dane, i oznacz szukany kąt literą.",
        "Znajdź w zadaniu parę kątów: przyległych (suma $180^\\circ$), wierzchołkowych (równe) albo przy prostych równoległych (równe).",
        "Przy trójkącie lub czworokącie użyj sumy kątów: $180^\\circ$ albo $360^\\circ$.",
        "Sprawdź, czy wynik ma sens (np. kąt trójkąta jest mniejszy niż $180^\\circ$).",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Jeden z dwóch kątów przyległych ma miarę $112^\\circ$. Drugi kąt ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$78^\\circ$", "$68^\\circ$", "$112^\\circ$", "$248^\\circ$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Dwie proste przecinają się i tworzą cztery kąty. Jeden z nich ma miarę $40^\\circ$. Miary pozostałych trzech kątów to. **Wybierz właściwą odpowiedź.**",
          opcje: [
            "$40^\\circ$, $50^\\circ$ i $50^\\circ$",
            "$140^\\circ$, $140^\\circ$ i $140^\\circ$",
            "$40^\\circ$, $140^\\circ$ i $140^\\circ$",
            "$40^\\circ$, $40^\\circ$ i $140^\\circ$",
          ],
          poprawna: 2,
        },
        {
          nr: "3",
          tresc: "Proste $k$ i $l$ są równoległe, a prosta $m$ je przecina. Kąt przy prostej $k$ ma miarę $70^\\circ$. Kąt odpowiadający do niego przy prostej $l$ ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$70^\\circ$", "$110^\\circ$", "$20^\\circ$", "$140^\\circ$"],
          poprawna: 0,
        },
        {
          nr: "4",
          tresc: "Dwa kąty trójkąta mają miary $48^\\circ$ i $75^\\circ$. Trzeci kąt tego trójkąta ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$123^\\circ$", "$132^\\circ$", "$105^\\circ$", "$57^\\circ$"],
          poprawna: 3,
        },
        {
          nr: "5",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Kąty wierzchołkowe mają równe miary.", litery: "PF", poprawna: 0 },
            { tekst: "Suma miar dwóch kątów przyległych jest równa $90^\\circ$.", litery: "PF", poprawna: 1 },
            { tekst: "Czworokąt może mieć kąty o miarach $85^\\circ$, $95^\\circ$, $100^\\circ$ i $80^\\circ$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Dwie proste przecinają się. Jeden z powstałych kątów jest o $20^\\circ$ większy od kąta do niego przyległego. Oblicz miary wszystkich czterech kątów. **Zapisz obliczenia.**",
          rozwiazanie: "Niech mniejszy z dwóch kątów przyległych ma miarę $x$. Wtedy większy ma $x+20^\\circ$.\n\nKąty przyległe dają razem $180^\\circ$, więc $x+(x+20^\\circ)=180^\\circ$.\n\nStąd $2x+20^\\circ=180^\\circ$, czyli $2x=160^\\circ$ i $x=80^\\circ$. Drugi kąt: $80^\\circ+20^\\circ=100^\\circ$.\n\nKąty wierzchołkowe są równe, więc pozostałe dwa kąty mają też $100^\\circ$ i $80^\\circ$.\n\nSprawdzenie: $100^\\circ+80^\\circ+100^\\circ+80^\\circ=360^\\circ$.\n\nOdpowiedź: Cztery kąty mają miary $100^\\circ$, $80^\\circ$, $100^\\circ$ i $80^\\circ$.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Proste $k$ i $l$ są równoległe, a prosta $m$ je przecina. Przy prostej $k$ powstały cztery kąty. Jeden z nich, kąt ostry $\\alpha$, ma miarę $55^\\circ$. Podaj miary czterech kątów przy prostej $l$ i napisz, z jakich własności korzystasz. **Zapisz obliczenia.**",
          rozwiazanie: "Przy prostej $k$ są cztery kąty: $\\alpha=55^\\circ$, kąt wierzchołkowy do $\\alpha$ ma też $55^\\circ$, a dwa kąty przyległe do $\\alpha$ mają po $180^\\circ-55^\\circ=125^\\circ$.\n\nProste $k$ i $l$ są równoległe, więc kąty odpowiadające są równe. Przy prostej $l$ jest więc kąt $55^\\circ$ (odpowiadający do $\\alpha$) i dwa kąty $125^\\circ$ (odpowiadające do kątów przyległych).\n\nCzwarty kąt jest wierzchołkowy do kąta $55^\\circ$, więc też ma $55^\\circ$.\n\nSprawdzenie: $55^\\circ+125^\\circ+55^\\circ+125^\\circ=360^\\circ$.\n\nOdpowiedź: Przy prostej $l$ kąty mają miary $55^\\circ$, $125^\\circ$, $55^\\circ$ i $125^\\circ$.",
        },
      ],
      generatory: [
        {
          id: "kat-do-kata",
          nazwa: "Kąt do kąta",
          opis: "Oblicz miarę kąta przyległego, wierzchołkowego, odpowiadającego albo naprzemianległego (przy prostych równoległych).",
          generuj(r) {
            const a = r.intBez(20, 160, 90);
            const rodzaj = r.int(0, 4);
            const wiersz = (w) => ({ pola: [pole("w", `Miara kąta $\\beta$ (w stopniach) $=$`)], odpowiedz: { w: q(w) }, wynik: `$${st(w)}$` });
            if (rodzaj === 0) {
              const w = 180 - a;
              return {
                tresc: `Kąty $\\alpha$ i $\\beta$ są przyległe. Kąt $\\alpha$ ma miarę $${st(a)}$. Ile stopni ma kąt $\\beta$?`,
                ...wiersz(w),
                rozwiazanie: ["Kąty przyległe dają razem $180^\\circ$.", `$180^\\circ-${st(a)}=${st(w)}$.`],
              };
            }
            if (rodzaj === 1) {
              return {
                tresc: `Dwie proste przecinają się i tworzą cztery kąty. Kąt $\\alpha$ ma miarę $${st(a)}$, a kąt $\\beta$ leży naprzeciw niego (jest wierzchołkowy do $\\alpha$). Ile stopni ma kąt $\\beta$?`,
                ...wiersz(a),
                rozwiazanie: ["Kąty wierzchołkowe mają równe miary.", `Kąt $\\beta$ ma $${st(a)}$.`],
              };
            }
            const rown = "Proste $k$ i $l$ są równoległe, a prosta $m$ je przecina. Kąt $\\alpha$ leży przy prostej $k$ i ma miarę";
            if (rodzaj === 2) {
              return {
                tresc: `${rown} $${st(a)}$. Kąt $\\beta$ leży przy prostej $l$ i jest odpowiadający do kąta $\\alpha$ (w tym samym miejscu przy drugiej prostej). Ile stopni ma kąt $\\beta$?`,
                ...wiersz(a),
                rozwiazanie: ["Proste są równoległe, więc kąty odpowiadające mają równe miary.", `Kąt $\\beta$ ma $${st(a)}$.`],
              };
            }
            if (rodzaj === 3) {
              return {
                tresc: `${rown} $${st(a)}$. Kąty $\\alpha$ i $\\beta$ leżą między prostymi $k$ i $l$, po przeciwnych stronach prostej $m$ (są naprzemianległe). Ile stopni ma kąt $\\beta$?`,
                ...wiersz(a),
                rozwiazanie: ["Proste są równoległe, więc kąty naprzemianległe mają równe miary.", `Kąt $\\beta$ ma $${st(a)}$.`],
              };
            }
            const w = 180 - a;
            return {
              tresc: `${rown} $${st(a)}$. Kąt $\\gamma$ leży przy prostej $l$ i jest odpowiadający do kąta $\\alpha$. Kąt $\\beta$ jest przyległy do kąta $\\gamma$. Ile stopni ma kąt $\\beta$?`,
              ...wiersz(w),
              rozwiazanie: [
                `Kąty odpowiadające są równe, więc kąt $\\gamma$ ma $${st(a)}$.`,
                `Kąty przyległe dają razem $180^\\circ$, więc $\\beta=180^\\circ-${st(a)}=${st(w)}$.`,
              ],
            };
          },
        },
        {
          id: "suma-katow",
          nazwa: "Suma kątów",
          opis: "Oblicz trzeci kąt trójkąta albo czwarty kąt czworokąta, gdy znasz pozostałe.",
          generuj(r) {
            if (r.chance()) {
              const [P, Q2, R] = r.pick(TROJKATY);
              const x = r.int(25, 90);
              const y = r.int(25, 150 - x);
              const w = 180 - x - y;
              return {
                tresc: `W trójkącie $${P}${Q2}${R}$ kąt przy wierzchołku $${P}$ ma $${st(x)}$, a kąt przy wierzchołku $${Q2}$ ma $${st(y)}$. Ile stopni ma kąt przy wierzchołku $${R}$?`,
                pola: [pole("w", `Kąt przy $${R}$ (w stopniach) $=$`)],
                odpowiedz: { w: q(w) },
                wynik: `$${st(w)}$`,
                rozwiazanie: [
                  "Suma kątów trójkąta to $180^\\circ$.",
                  `Znane kąty dają razem $${x}^\\circ+${y}^\\circ=${st(x + y)}$.`,
                  `Trzeci kąt: $180^\\circ-${st(x + y)}=${st(w)}$.`,
                ],
              };
            }
            return probuj(() => {
              const k = [r.int(50, 130), r.int(50, 130), r.int(50, 130)];
              const w = 360 - k[0] - k[1] - k[2];
              if (w < 40 || w > 150) return null;
              const s = k[0] + k[1] + k[2];
              return {
                tresc: `Czworokąt $ABCD$ ma kąty: przy $A$ – $${st(k[0])}$, przy $B$ – $${st(k[1])}$, przy $C$ – $${st(k[2])}$. Ile stopni ma kąt przy wierzchołku $D$?`,
                pola: [pole("w", "Kąt przy $D$ (w stopniach) $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${st(w)}$`,
                rozwiazanie: [
                  "Suma kątów czworokąta to $360^\\circ$.",
                  `Trzy znane kąty dają razem $${k[0]}^\\circ+${k[1]}^\\circ+${k[2]}^\\circ=${st(s)}$.`,
                  `Czwarty kąt: $360^\\circ-${st(s)}=${st(w)}$.`,
                ],
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Kąty – zadania
    {
      id: "katy-zadania",
      nazwa: "Kąty – zadania",
      sciaga: [
        {
          nazwa: "Kąt zewnętrzny trójkąta",
          slownie: "Kąt zewnętrzny powstaje, gdy przedłużymy bok trójkąta. Jest przyległy do jednego kąta trójkąta. Jego miara jest równa sumie dwóch pozostałych kątów trójkąta (tych nieprzyległych do niego).",
          tex: "\\delta=\\alpha+\\beta",
          litery: "$\\delta$ – kąt zewnętrzny, $\\alpha$, $\\beta$ – dwa kąty trójkąta, które nie są do niego przyległe.",
          przyklad: "Trójkąt ma kąty $50^\\circ$, $60^\\circ$, $70^\\circ$. Kąt zewnętrzny przy kącie $70^\\circ$ ma $180^\\circ-70^\\circ=110^\\circ$. To tyle samo co $50^\\circ+60^\\circ=110^\\circ$.",
          uwaga: "Dodajemy tylko dwa kąty nieprzyległe do kąta zewnętrznego, a nie wszystkie trzy.",
        },
        {
          nazwa: "Trójkąt równoramienny",
          slownie: "Trójkąt równoramienny ma dwa równe boki (ramiona). Kąty leżące przy podstawie są równe. Kąt między ramionami wyliczamy z sumy kątów trójkąta.",
          tex: "\\alpha+\\alpha+\\gamma=180^\\circ",
          litery: "$\\alpha$ – kąt przy podstawie (są dwa takie same), $\\gamma$ – kąt między ramionami.",
          przyklad: "Kąt przy podstawie ma $50^\\circ$, więc kąt między ramionami: $180^\\circ-2\\cdot50^\\circ=80^\\circ$. Gdy kąt między ramionami ma $40^\\circ$, to kąt przy podstawie: $(180^\\circ-40^\\circ):2=70^\\circ$.",
          uwaga: "Gdy w zadaniu jest podany jeden kąt, a nie wiadomo, gdzie leży, sprawdź dwa przypadki. Kąt rozwarty może być tylko między ramionami.",
        },
        {
          nazwa: "Kąty z niewiadomą",
          slownie: "Gdy kąty są zapisane przez $x$, układamy równanie z sumy kątów, rozwiązujemy je i wracamy do kątów. Na końcu sprawdzamy, czy suma się zgadza.",
          tex: "x+2x+3x=180^\\circ",
          przyklad: "Kąty trójkąta to $x$, $2x$, $3x$. Wtedy $6x=180^\\circ$, więc $x=30^\\circ$. Kąty: $30^\\circ$, $60^\\circ$, $90^\\circ$.",
          uwaga: "Odpowiedzią są miary kątów, a nie samo $x$. Odpowiedz na to, o co pytają.",
        },
        {
          nazwa: "Kąty w równoległoboku",
          slownie: "W równoległoboku kąty leżące naprzeciw siebie są równe. Dwa kąty leżące obok siebie (przy jednym boku) dają razem $180^\\circ$.",
          tex: "\\alpha+\\beta=180^\\circ",
          litery: "$\\alpha$, $\\beta$ – dwa sąsiednie kąty równoległoboku.",
          przyklad: "Kąt równoległoboku ma $65^\\circ$. Kąt naprzeciw ma też $65^\\circ$, a dwa pozostałe mają po $180^\\circ-65^\\circ=115^\\circ$.",
          uwaga: "Nie wszystkie kąty równoległoboku są równe. Równe są tylko przeciwległe.",
        },
      ],
      jak: [
        "Zapisz, co jest dane, i oznacz szukane kąty (liczbą lub literą $x$).",
        "Wybierz właściwą własność: suma kątów trójkąta lub czworokąta, kąt zewnętrzny, równe kąty przy podstawie.",
        "Ułóż z niej równanie i je rozwiąż. Odpowiedz na pytanie (nie zatrzymuj się na $x$).",
        "Sprawdź: suma kątów trójkąta to $180^\\circ$, a czworokąta $360^\\circ$.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "W trójkącie dwa kąty mają miary $35^\\circ$ i $80^\\circ$. Kąt zewnętrzny tego trójkąta, przyległy do trzeciego kąta, ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$115^\\circ$", "$65^\\circ$", "$145^\\circ$", "$100^\\circ$"],
          poprawna: 0,
        },
        {
          nr: "9",
          tresc: "W trójkącie równoramiennym kąt między ramionami ma miarę $40^\\circ$. Każdy z kątów przy podstawie ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$140^\\circ$", "$40^\\circ$", "$50^\\circ$", "$70^\\circ$"],
          poprawna: 3,
        },
        {
          nr: "10",
          tresc: "Trójkąt równoramienny ma jeden kąt o mierze $100^\\circ$. Miary dwóch pozostałych kątów to. **Wybierz właściwą odpowiedź.**",
          opcje: ["$80^\\circ$ i $80^\\circ$", "$40^\\circ$ i $40^\\circ$", "$50^\\circ$ i $50^\\circ$", "$100^\\circ$ i $100^\\circ$"],
          poprawna: 1,
        },
        {
          nr: "11",
          tresc: "Kąty trójkąta mają miary $x$, $x+20^\\circ$ i $x+40^\\circ$. Największy z tych kątów ma miarę. **Wybierz właściwą odpowiedź.**",
          opcje: ["$80^\\circ$", "$40^\\circ$", "$60^\\circ$", "$100^\\circ$"],
          poprawna: 0,
        },
        {
          nr: "12",
          tresc: "W równoległoboku jeden kąt ma miarę $65^\\circ$. Miary pozostałych trzech kątów to. **Wybierz właściwą odpowiedź.**",
          opcje: [
            "$65^\\circ$, $65^\\circ$ i $65^\\circ$",
            "$25^\\circ$, $65^\\circ$ i $25^\\circ$",
            "$115^\\circ$, $65^\\circ$ i $115^\\circ$",
            "$115^\\circ$, $115^\\circ$ i $115^\\circ$",
          ],
          poprawna: 2,
        },
        {
          nr: "13",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Kąt zewnętrzny trójkąta jest równy sumie dwóch kątów trójkąta, które nie są do niego przyległe.", litery: "PF", poprawna: 0 },
            { tekst: "Trójkąt równoramienny może mieć dwa kąty rozwarte.", litery: "PF", poprawna: 1 },
            { tekst: "Trójkąt o kątach $50^\\circ$, $50^\\circ$ i $80^\\circ$ jest równoramienny.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "14",
          punkty: 2,
          tresc: "W trójkącie równoramiennym $ABC$ ramiona to $AC$ i $BC$. Kąt przy wierzchołku $C$ jest $3$ razy większy od kąta przy wierzchołku $A$. Oblicz miary wszystkich kątów trójkąta. **Zapisz obliczenia.**",
          rozwiazanie: "Niech kąt przy wierzchołku $A$ ma miarę $x$. Kąty przy podstawie $AB$ są równe, więc kąt przy $B$ też ma $x$. Kąt przy $C$ ma $3x$.\n\nSuma kątów trójkąta: $x+x+3x=180^\\circ$.\n\nStąd $5x=180^\\circ$, czyli $x=36^\\circ$. Kąt przy $C$: $3\\cdot36^\\circ=108^\\circ$.\n\nSprawdzenie: $36^\\circ+36^\\circ+108^\\circ=180^\\circ$.\n\nOdpowiedź: Kąty mają miary $36^\\circ$, $36^\\circ$ i $108^\\circ$.",
        },
        {
          nr: "15",
          punkty: 3,
          tresc: "W trójkącie $ABC$ kąt przy wierzchołku $A$ ma miarę $50^\\circ$. Kąt zewnętrzny przy wierzchołku $B$ (przyległy do kąta trójkąta przy $B$) ma miarę $130^\\circ$. Oblicz miary kątów tego trójkąta i rozstrzygnij, czy trójkąt jest równoramienny. **Zapisz obliczenia.**",
          rozwiazanie: "Kąt wewnętrzny przy $B$ jest przyległy do kąta zewnętrznego, więc ma $180^\\circ-130^\\circ=50^\\circ$.\n\nKąt przy $C$ liczymy z sumy kątów trójkąta: $180^\\circ-50^\\circ-50^\\circ=80^\\circ$.\n\nSprawdzenie ze wzoru na kąt zewnętrzny: $130^\\circ$ powinno być równe sumie kątów przy $A$ i $C$, czyli $50^\\circ+80^\\circ=130^\\circ$. Zgadza się.\n\nKąty przy $A$ i $B$ są równe ($50^\\circ$), więc boki leżące naprzeciw nich ($BC$ i $AC$) też są równe.\n\nOdpowiedź: Kąty mają miary $50^\\circ$, $50^\\circ$ i $80^\\circ$. Trójkąt jest równoramienny (ramiona $AC$ i $BC$).",
        },
      ],
      generatory: [
        {
          id: "trojkat-rownoramienny",
          nazwa: "Trójkąt równoramienny",
          opis: "Oblicz kąt przy podstawie albo kąt między ramionami trójkąta równoramiennego, także z zadania z niewiadomą.",
          generuj(r) {
            const t = r.int(0, 2);
            if (t === 0) {
              const b = r.int(20, 80);
              const w = 180 - 2 * b;
              return {
                tresc: `W trójkącie równoramiennym każdy z kątów przy podstawie ma miarę $${st(b)}$. Ile stopni ma kąt między ramionami?`,
                pola: [pole("w", "Kąt między ramionami (w stopniach) $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${st(w)}$`,
                rozwiazanie: [
                  `Kąty przy podstawie są dwa i oba mają $${st(b)}$, razem $${st(2 * b)}$.`,
                  `Suma kątów trójkąta to $180^\\circ$, więc kąt między ramionami: $180^\\circ-${st(2 * b)}=${st(w)}$.`,
                ],
              };
            }
            if (t === 1) {
              const b = r.int(20, 80);
              const g = 180 - 2 * b;
              return {
                tresc: `W trójkącie równoramiennym kąt między ramionami ma miarę $${st(g)}$. Ile stopni ma każdy z kątów przy podstawie?`,
                pola: [pole("w", "Kąt przy podstawie (w stopniach) $=$")],
                odpowiedz: { w: q(b) },
                wynik: `$${st(b)}$`,
                rozwiazanie: [
                  `Dwa kąty przy podstawie dają razem $180^\\circ-${st(g)}=${st(2 * b)}$.`,
                  `Są równe, więc każdy ma $${st(2 * b)}:2=${st(b)}$.`,
                ],
              };
            }
            const k = r.int(1, 14);
            const d = 3 * k;
            const x = 60 - 2 * k;
            const w = x + d;
            return {
              tresc: `W trójkącie równoramiennym kąt przy podstawie jest o $${st(d)}$ większy od kąta między ramionami. Ile stopni ma kąt przy podstawie?`,
              pola: [pole("w", "Kąt przy podstawie (w stopniach) $=$")],
              odpowiedz: { w: q(w) },
              wynik: `$${st(w)}$`,
              rozwiazanie: [
                `Niech kąt między ramionami ma $x$. Kąt przy podstawie ma $x+${d}^\\circ$, a takie kąty są dwa.`,
                `Suma kątów: $x+2(x+${d}^\\circ)=180^\\circ$, czyli $3x+${2 * d}^\\circ=180^\\circ$.`,
                `Stąd $3x=${180 - 2 * d}^\\circ$, więc $x=${st(x)}$.`,
                `Kąt przy podstawie: $${x}^\\circ+${d}^\\circ=${st(w)}$.`,
              ],
            };
          },
        },
        {
          id: "kat-zewnetrzny",
          nazwa: "Kąt zewnętrzny",
          opis: "Oblicz kąt zewnętrzny trójkąta z dwóch kątów nieprzyległych albo brakujący kąt trójkąta, gdy znasz kąt zewnętrzny.",
          generuj(r) {
            const [P, Q2, R] = r.pick(TROJKATY);
            if (r.chance()) {
              const x = r.int(30, 90);
              const y = r.int(30, 165 - x);
              const w = x + y;
              return {
                tresc: `W trójkącie $${P}${Q2}${R}$ kąt przy wierzchołku $${P}$ ma $${st(x)}$, a kąt przy wierzchołku $${Q2}$ ma $${st(y)}$. Przedłużamy bok $${P}${R}$ za wierzchołek $${R}$. Ile stopni ma kąt zewnętrzny przy wierzchołku $${R}$?`,
                pola: [pole("w", `Kąt zewnętrzny przy $${R}$ (w stopniach) $=$`)],
                odpowiedz: { w: q(w) },
                wynik: `$${st(w)}$`,
                rozwiazanie: [
                  `Kąt zewnętrzny przy $${R}$ jest równy sumie dwóch kątów trójkąta, które nie są do niego przyległe: przy $${P}$ i przy $${Q2}$.`,
                  `$${st(x)}+${st(y)}=${st(w)}$.`,
                ],
              };
            }
            const dz = r.int(70, 170);
            const x = r.int(20, dz - 20);
            const w = dz - x;
            return {
              tresc: `W trójkącie $${P}${Q2}${R}$ kąt zewnętrzny przy wierzchołku $${R}$ ma $${st(dz)}$, a kąt przy wierzchołku $${P}$ ma $${st(x)}$. Ile stopni ma kąt przy wierzchołku $${Q2}$?`,
              pola: [pole("w", `Kąt przy $${Q2}$ (w stopniach) $=$`)],
              odpowiedz: { w: q(w) },
              wynik: `$${st(w)}$`,
              rozwiazanie: [
                `Kąt zewnętrzny przy $${R}$ jest równy sumie kątów przy $${P}$ i przy $${Q2}$.`,
                `Stąd kąt przy $${Q2}$ to różnica: $${st(dz)}-${st(x)}=${st(w)}$.`,
              ],
            };
          },
        },
        {
          id: "katy-z-x",
          nazwa: "Kąty z niewiadomą",
          opis: "Kąty trójkąta są zapisane przez $x$. Ułóż równanie z sumy kątów i oblicz $x$ albo największy kąt.",
          generuj(r) {
            return probuj(() => {
              const c = [r.int(1, 3), r.int(1, 3), r.int(1, 3)];
              const k = [r.pick([0, 0, 10, 20, 30]), r.pick([0, 10, 20, 30]), r.pick([0, 10, 20, -10, -20])];
              const S = c[0] + c[1] + c[2];
              const K = k[0] + k[1] + k[2];
              if ((180 - K) % S !== 0) return null;
              const x = (180 - K) / S;
              if (x < 10 || x > 60) return null;
              const katy = c.map((ci, i) => ci * x + k[i]);
              if (katy.some((v) => v < 10 || v > 150)) return null;
              if (new Set(c.map((ci, i) => `${ci}/${k[i]}`)).size < 2) return null;
              const zapis = (w, i) => (k[i] === 0 ? w : w.replace(/ ([+-]) (\d+)$/, " $1 $2^\\circ"));
              const lista = c.map((ci, i) => zapis(wielomianTex([ci, k[i]]), i));
              const pyt = r.int(0, 1);
              const wartosc = pyt === 0 ? x : Math.max(...katy);
              const lewa = lista.join(" + ");
              const kroki = [
                `Suma kątów trójkąta to $180^\\circ$: $${lewa}=180^\\circ$.`,
                `Dodajemy wyrazy z $x$: $${S}x$. Dodajemy liczby: $${K}^\\circ$. Mamy $${S}x${K === 0 ? "" : K > 0 ? ` + ${K}^\\circ` : ` - ${-K}^\\circ`}=180^\\circ$.`,
                `Stąd $${S}x=${180 - K}^\\circ$, więc $x=${st(x)}$.`,
              ];
              if (pyt === 1) kroki.push(`Kąty: $${katy.map(st).join("$, $")}$. Największy ma $${st(wartosc)}$.`);
              return {
                tresc: `Kąty trójkąta mają miary $${lista.join("$, $")}$ (w stopniach, $x$ to liczba stopni). ${pyt === 0 ? "Oblicz $x$." : "Ile stopni ma największy kąt tego trójkąta?"}`,
                pola: [pole("w", pyt === 0 ? "$x =$" : "Największy kąt (w stopniach) $=$")],
                odpowiedz: { w: q(wartosc) },
                wynik: `$${pyt === 0 ? x : st(wartosc)}$`,
                rozwiazanie: kroki,
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Twierdzenie matematyczne i jego dowód
    {
      id: "twierdzenie-dowod",
      nazwa: "Twierdzenie matematyczne i jego dowód",
      sciaga: [
        {
          nazwa: "Założenie i teza",
          slownie: "Twierdzenie często ma postać „Jeśli …, to …”. Część po słowie „jeśli” to założenie (to, co wiemy). Część po słowie „to” to teza (to, co chcemy wykazać).",
          przyklad: "„Jeśli liczba kończy się cyfrą $0$, to dzieli się przez $5$.” Założenie: liczba kończy się cyfrą $0$. Teza: liczba dzieli się przez $5$.",
          uwaga: "Nie zamieniaj założenia z tezą. Twierdzenie odwrotne („jeśli dzieli się przez $5$, to kończy się zerem”) jest fałszywe, bo np. $15$ dzieli się przez $5$.",
        },
        {
          nazwa: "Co to jest dowód",
          slownie: "Dowód to rozumowanie krok po kroku. Zaczynamy od założenia i każdy krok uzasadniamy tym, co już wiemy. Na końcu dostajemy tezę. Kilka sprawdzonych przykładów to jeszcze nie dowód.",
          przyklad: "Kąty wierzchołkowe $\\alpha$ i $\\gamma$ są równe, bo oba dają razem $180^\\circ$ z tym samym kątem $\\beta$ (przyległym do obu): $\\alpha=180^\\circ-\\beta=\\gamma$.",
          uwaga: "To, że zdanie działa dla liczb $2$, $4$, $6$, nie dowodzi, że działa dla wszystkich liczb parzystych.",
        },
        {
          nazwa: "Kontrprzykład",
          slownie: "Kontrprzykład to jeden przykład, który pokazuje, że zdanie jest fałszywe. Do obalenia zdania wystarczy jeden kontrprzykład.",
          przyklad: "Zdanie: „Każda liczba pierwsza jest nieparzysta.” Kontrprzykład: liczba $2$ jest pierwsza i parzysta.",
          uwaga: "Jeden kontrprzykład obala zdanie. Za to wiele dobrych przykładów nie dowodzi, że zdanie jest prawdziwe.",
        },
        {
          nazwa: "Dowód z literą",
          slownie: "Aby coś pokazać dla wszystkich liczb, zapisujemy je literą. Liczba parzysta to $2n$, nieparzysta to $2n+1$. Dwie kolejne liczby naturalne to $n$ i $n+1$.",
          tex: "n+(n+1)=2n+1",
          litery: "$n$ – dowolna liczba naturalna.",
          przyklad: "Suma dwóch kolejnych liczb naturalnych: $n+(n+1)=2n+1$. To jest liczba nieparzysta, bo ma postać $2n+1$.",
          uwaga: "Nie zapisuj dwóch różnych liczb tą samą literą. Dwie kolejne liczby to $n$ i $n+1$, a nie $n$ i $n$.",
        },
      ],
      jak: [
        "Zapisz założenie (co jest dane) i tezę (co trzeba wykazać).",
        "Opisz figurę słowami i oznacz kąty literami, np. $\\alpha$, $\\beta$, $\\gamma$. Dla liczb użyj litery, np. $n$.",
        "Wypisz kolejne kroki. Przy każdym napisz, z jakiego faktu korzystasz (np. „kąty przyległe dają $180^\\circ$”).",
        "Zakończ zdaniem, że teza jest wykazana. Pamiętaj: przykład liczbowy to nie dowód.",
      ],
      zadania: [
        {
          nr: "16",
          tresc: "W twierdzeniu „Jeśli czworokąt jest kwadratem, to ma cztery kąty proste” tezą jest. **Wybierz właściwą odpowiedź.**",
          opcje: ["czworokąt ma cztery kąty proste", "czworokąt jest kwadratem", "czworokąt ma cztery boki", "kwadrat jest prostokątem"],
          poprawna: 0,
        },
        {
          nr: "17",
          tresc: "Który przykład jest kontrprzykładem do zdania „Każda liczba podzielna przez $3$ jest podzielna przez $6$”? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$", "$18$", "$9$", "$36$"],
          poprawna: 2,
        },
        {
          nr: "18",
          tresc: "Chcemy udowodnić, że suma dwóch kolejnych liczb naturalnych jest nieparzysta. Dwie kolejne liczby naturalne zapisujemy jako. **Wybierz właściwą odpowiedź.**",
          opcje: ["$2n$ i $2n+2$", "$n$ i $n+2$", "$2n$ i $2n+1$", "$n$ i $n+1$"],
          poprawna: 3,
        },
        {
          nr: "19",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Sprawdzenie zdania dla liczb $2$, $4$ i $6$ jest dowodem, że zdanie jest prawdziwe dla wszystkich liczb parzystych.", litery: "PF", poprawna: 1 },
            { tekst: "Jeden kontrprzykład wystarcza, aby pokazać, że zdanie jest fałszywe.", litery: "PF", poprawna: 0 },
            { tekst: "W twierdzeniu „Jeśli trójkąt jest równoramienny, to ma dwa równe kąty” założeniem jest zdanie „trójkąt jest równoramienny”.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "20",
          tresc: "Trzy kolejne liczby parzyste zapisujemy jako $2n$, $2n+2$, $2n+4$. Ich suma po uproszczeniu jest równa. **Wybierz właściwą odpowiedź.**",
          opcje: ["$6n+4$", "$6n+6$", "$6n+2$", "$8n+6$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "21",
          punkty: 2,
          tresc: "Dwie proste przecinają się w punkcie $O$. Kąty $\\alpha$ i $\\gamma$ leżą naprzeciw siebie, a kąt $\\beta$ leży obok nich (jest przyległy zarówno do $\\alpha$, jak i do $\\gamma$). Udowodnij, że $\\alpha=\\gamma$. **Zapisz rozumowanie.**",
          rozwiazanie: "Założenie: $\\alpha$ i $\\gamma$ są kątami wierzchołkowymi, a $\\beta$ jest przyległy do każdego z nich. Teza: $\\alpha=\\gamma$.\n\nKąty $\\alpha$ i $\\beta$ są przyległe, więc $\\alpha+\\beta=180^\\circ$. Stąd $\\alpha=180^\\circ-\\beta$.\n\nKąty $\\gamma$ i $\\beta$ też są przyległe, więc $\\gamma+\\beta=180^\\circ$. Stąd $\\gamma=180^\\circ-\\beta$.\n\nObie miary są równe $180^\\circ-\\beta$, więc $\\alpha=\\gamma$.\n\nOdpowiedź: Kąty wierzchołkowe mają równe miary, co należało wykazać.",
        },
        {
          nr: "22",
          punkty: 3,
          tresc: "Czworokąt wypukły $ABCD$ ma kąty o miarach $\\alpha$ (przy $A$), $\\beta$ (przy $B$), $\\gamma$ (przy $C$) i $\\delta$ (przy $D$). Wiesz, że suma kątów trójkąta to $180^\\circ$. Poprowadź przekątną $AC$ i udowodnij, że $\\alpha+\\beta+\\gamma+\\delta=360^\\circ$. **Zapisz rozumowanie.**",
          rozwiazanie: "Założenie: $ABCD$ jest czworokątem wypukłym, a suma kątów trójkąta to $180^\\circ$. Teza: $\\alpha+\\beta+\\gamma+\\delta=360^\\circ$.\n\nPrzekątna $AC$ dzieli czworokąt na dwa trójkąty: $ABC$ i $ACD$.\n\nKąt $\\alpha$ przy wierzchołku $A$ składa się z dwóch części: kąta trójkąta $ABC$ i kąta trójkąta $ACD$. Podobnie kąt $\\gamma$ przy wierzchołku $C$. Kąt $\\beta$ należy tylko do trójkąta $ABC$, a kąt $\\delta$ tylko do trójkąta $ACD$.\n\nSuma kątów trójkąta $ABC$ to $180^\\circ$, a trójkąta $ACD$ też $180^\\circ$. Razem $180^\\circ+180^\\circ=360^\\circ$.\n\nTe kąty obu trójkątów to dokładnie wszystkie części kątów $\\alpha$, $\\beta$, $\\gamma$, $\\delta$, więc $\\alpha+\\beta+\\gamma+\\delta=360^\\circ$.\n\nOdpowiedź: Suma kątów czworokąta wypukłego jest równa $360^\\circ$, co należało wykazać.",
        },
      ],
      generatory: [
        {
          id: "zalozenie-teza",
          nazwa: "Założenie i teza",
          opis: "Z twierdzenia „Jeśli …, to …” wskaż, które zdanie jest założeniem, a które tezą.",
          generuj(r) {
            const [zal, tez] = r.pick(TWIERDZENIA);
            const pytaZal = r.chance();
            const kol = r.chance();
            const opcje = kol ? [zal, tez] : [tez, zal];
            const dobra = pytaZal ? zal : tez;
            return {
              tresc: `Twierdzenie: „Jeśli ${zal}, to ${tez}.” Które zdanie jest ${pytaZal ? "założeniem" : "tezą"} tego twierdzenia?`,
              pola: [{ id: "w", typ: "wybor", etykieta: pytaZal ? "Założenie" : "Teza", opcje }],
              odpowiedz: { w: opcje.indexOf(dobra) },
              wynik: pytaZal ? `Założenie: ${zal}.` : `Teza: ${tez}.`,
              rozwiazanie: [
                "Założenie stoi po słowie „jeśli” (to, co wiemy). Teza stoi po słowie „to” (to, co chcemy wykazać).",
                pytaZal ? `Założeniem jest: ${zal}.` : `Tezą jest: ${tez}.`,
              ],
            };
          },
        },
        {
          id: "kontrprzyklad",
          nazwa: "Kontrprzykład",
          opis: "Znajdź najmniejszą liczbę, która obala zdanie o podzielności.",
          generuj(r) {
            if (r.chance()) {
              return probuj(() => {
                const a = r.int(2, 12);
                const b = r.int(2, 12);
                if (a % b === 0) return null;
                let w = a;
                while (w % b === 0) w += a;
                return {
                  tresc: `Maja twierdzi: „Każda liczba podzielna przez $${a}$ jest podzielna przez $${b}$.” Podaj najmniejszą dodatnią liczbę, która jest kontrprzykładem do tego zdania.`,
                  pola: [pole("w", "Najmniejszy kontrprzykład $=$")],
                  odpowiedz: { w: q(w) },
                  wynik: `$${w}$`,
                  rozwiazanie: [
                    `Kontrprzykład musi być podzielny przez $${a}$ i niepodzielny przez $${b}$. Sprawdzamy kolejne wielokrotności liczby $${a}$.`,
                    `Pierwsza z nich niepodzielna przez $${b}$ to $${w}$.`,
                  ],
                };
              });
            }
            return probuj(() => {
              const a = r.int(2, 10);
              const b = r.int(2, 10);
              if (a >= b || nwd(a, b) === 1) return null;
              const w = (a * b) / nwd(a, b);
              return {
                tresc: `Tomek twierdzi: „Każda liczba podzielna przez $${a}$ i przez $${b}$ jest podzielna przez $${a * b}$.” Podaj najmniejszą dodatnią liczbę, która jest kontrprzykładem do tego zdania.`,
                pola: [pole("w", "Najmniejszy kontrprzykład $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [
                  `Szukamy liczby podzielnej przez $${a}$ i przez $${b}$, ale niepodzielnej przez $${a * b}$.`,
                  `Najmniejsza liczba podzielna przez $${a}$ i przez $${b}$ to $${w}$.`,
                  `Ta liczba jest mniejsza niż $${a * b}$, więc nie dzieli się przez $${a * b}$. Jest to kontrprzykład: $${w}$.`,
                ],
              };
            });
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Nierówność trójkąta
    {
      id: "nierownosc-trojkata",
      nazwa: "Nierówność trójkąta",
      sciaga: [
        {
          nazwa: "Nierówność trójkąta",
          slownie: "Z trzech odcinków zbudujemy trójkąt tylko wtedy, gdy dwa krótsze razem są dłuższe niż najdłuższy. Droga na skróty, prosto, jest zawsze krótsza niż droga naokoło.",
          tex: "a+b>c",
          litery: "$c$ – najdłuższy bok, $a$, $b$ – pozostałe dwa boki.",
          przyklad: "Boki $3$, $4$, $6$: $3+4=7>6$, więc trójkąt istnieje. Boki $2$, $3$, $5$: $2+3=5$, nie jest większe niż $5$, więc trójkąta nie ma (odcinki układają się w jedną prostą).",
          uwaga: "Porównujemy sumę dwóch krótszych boków z najdłuższym. Gdy suma jest równa najdłuższemu bokowi, trójkąta też nie ma.",
        },
        {
          nazwa: "Trzeci bok trójkąta",
          slownie: "Gdy znasz dwa boki trójkąta, trzeci jest dłuższy niż różnica tych boków i krótszy niż ich suma. Końce tego przedziału nie wchodzą.",
          tex: "b-a<c<a+b",
          litery: "$a$, $b$ – dane boki ($a\\le b$), $c$ – trzeci bok.",
          przyklad: "Boki $4$ i $9$: $9-4=5$ oraz $4+9=13$, więc $5<c<13$. Całkowite wartości trzeciego boku: $6, 7, 8, 9, 10, 11, 12$, czyli $7$ liczb.",
          uwaga: "Liczby $5$ i $13$ nie pasują: z bokami $4$, $9$, $5$ albo $4$, $9$, $13$ trójkąta nie zbudujesz.",
        },
        {
          nazwa: "Trójkąt równoramienny z dwóch boków",
          slownie: "Gdy znamy dwie różne długości boków trójkąta równoramiennego, nie wiemy, który bok jest ramieniem. Sprawdzamy oba przypadki nierównością trójkąta.",
          przyklad: "Boki $3$ i $8$. Ramię $3$: boki $3$, $3$, $8$, ale $3+3=6<8$, więc to nie jest trójkąt. Ramię $8$: boki $8$, $8$, $3$ i $8+3>8$, więc trójkąt jest, a obwód to $8+8+3=19$.",
          uwaga: "Nie wystarczy dopisać drugiego równego boku. Zawsze sprawdź nierówność trójkąta.",
        },
      ],
      jak: [
        "Znajdź najdłuższy bok.",
        "Dodaj dwa krótsze boki i porównaj sumę z najdłuższym bokiem. Suma musi być większa.",
        "Przy dwóch danych bokach policz sumę i różnicę. Trzeci bok jest między nimi (bez końców).",
        "W trójkącie równoramiennym sprawdź oba przypadki: który z danych boków jest ramieniem.",
      ],
      zadania: [
        {
          nr: "23",
          tresc: "Który zestaw odcinków może być bokami trójkąta? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$ cm, $3$ cm, $5$ cm", "$4$ cm, $4$ cm, $9$ cm", "$5$ cm, $6$ cm, $10$ cm", "$1$ cm, $2$ cm, $4$ cm"],
          poprawna: 2,
        },
        {
          nr: "24",
          tresc: "Dwa boki trójkąta mają długości $5$ cm i $8$ cm. Trzeci bok może mieć długość. **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$ cm", "$13$ cm", "$2$ cm", "$12$ cm"],
          poprawna: 3,
        },
        {
          nr: "25",
          tresc: "Dwa boki trójkąta mają długości $6$ cm i $10$ cm, a trzeci bok ma całkowitą liczbę centymetrów. Ile różnych długości może mieć trzeci bok? **Wybierz właściwą odpowiedź.**",
          opcje: ["$11$", "$13$", "$9$", "$12$"],
          poprawna: 0,
        },
        {
          nr: "26",
          tresc: "W trójkącie równoramiennym dwa boki mają długości $5$ cm i $11$ cm. Obwód tego trójkąta jest równy. **Wybierz właściwą odpowiedź.**",
          opcje: ["$22$ cm", "$27$ cm", "$16$ cm", "$21$ cm"],
          poprawna: 1,
        },
        {
          nr: "27",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Z odcinków o długościach $7$, $7$ i $14$ można zbudować trójkąt.", litery: "PF", poprawna: 1 },
            { tekst: "Trójkąt może mieć boki o długościach $6$, $7$ i $8$.", litery: "PF", poprawna: 0 },
            { tekst: "Jeśli dwa boki trójkąta mają $3$ i $4$, to trzeci bok może mieć $7$.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "28",
          punkty: 2,
          tresc: "Dwa boki trójkąta mają długości $7$ cm i $12$ cm, a długość trzeciego boku jest liczbą całkowitą centymetrów. Podaj najmniejszy i największy możliwy obwód tego trójkąta. **Zapisz obliczenia.**",
          rozwiazanie: "Trzeci bok $c$ jest dłuższy niż różnica danych boków i krótszy niż ich suma: $12-7<c<7+12$, czyli $5<c<19$.\n\nCałkowite wartości: od $6$ do $18$.\n\nNajmniejszy obwód: $7+12+6=25$ cm. Największy obwód: $7+12+18=37$ cm.\n\nOdpowiedź: Najmniejszy obwód to $25$ cm, a największy to $37$ cm.",
        },
        {
          nr: "29",
          punkty: 3,
          tresc: "Trójkąt równoramienny ma obwód $25$ cm. Jeden z jego boków ma $9$ cm. Jakie długości mogą mieć pozostałe boki? Sprawdź nierówność trójkąta w każdym przypadku. **Zapisz obliczenia.**",
          rozwiazanie: "Przypadek 1: bok $9$ cm jest podstawą. Ramiona są równe i razem mają $25-9=16$ cm, więc każde ma $8$ cm. Boki: $8$, $8$, $9$. Sprawdzenie: $8+8=16>9$. Trójkąt istnieje.\n\nPrzypadek 2: bok $9$ cm jest ramieniem. Drugie ramię też ma $9$ cm, więc podstawa ma $25-9-9=7$ cm. Boki: $9$, $9$, $7$. Sprawdzenie: $7+9=16>9$. Trójkąt istnieje.\n\nOdpowiedź: Pozostałe boki mają $8$ cm i $8$ cm albo $9$ cm i $7$ cm.",
        },
      ],
      generatory: [
        {
          id: "czy-trojkat",
          nazwa: "Czy jest trójkąt?",
          opis: "Sprawdź nierównością trójkąta, czy z trzech odcinków można zbudować trójkąt.",
          generuj(r) {
            let b = [r.int(2, 16), r.int(2, 16), r.int(2, 16)];
            if (r.chance(0.3)) b[2] = b[0] + b[1];
            b = r.shuffle(b);
            const s = [...b].sort((x, y) => x - y);
            const suma = s[0] + s[1];
            const tak = suma > s[2];
            const kreska = (x) => `$${x}$ cm`;
            return {
              tresc: `Czy z odcinków o długościach ${kreska(b[0])}, ${kreska(b[1])} i ${kreska(b[2])} można zbudować trójkąt?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Odpowiedź", opcje: ["Tak, można", "Nie, nie można"] }],
              odpowiedz: { w: tak ? 0 : 1 },
              wynik: tak ? "Tak, można zbudować trójkąt." : "Nie, nie można zbudować trójkąta.",
              rozwiazanie: [
                `Najdłuższy odcinek ma $${s[2]}$ cm. Dwa krótsze razem mają $${s[0]}+${s[1]}=${suma}$ cm.`,
                `Porównujemy: $${suma}${tak ? ">" : "\\le"}${s[2]}$.`,
                tak ? "Suma dwóch krótszych jest większa od najdłuższego, więc trójkąt istnieje." : "Suma dwóch krótszych nie jest większa od najdłuższego, więc trójkąta nie ma.",
              ],
            };
          },
        },
        {
          id: "trzeci-bok",
          nazwa: "Trzeci bok trójkąta",
          opis: "Dla dwóch danych boków oblicz największy lub najmniejszy całkowity trzeci bok, liczbę możliwości albo obwód trójkąta równoramiennego.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 3) {
              const wiekszy = r.int(5, 20);
              const mniejszy = r.int(1, Math.floor(wiekszy / 2) - (wiekszy % 2 === 0 ? 1 : 0));
              const w = 2 * wiekszy + mniejszy;
              return {
                tresc: `W trójkącie równoramiennym dwa boki mają długości $${mniejszy}$ cm i $${wiekszy}$ cm. Oblicz obwód tego trójkąta.`,
                pola: [pole("w", "Obwód (cm) $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$ cm`,
                rozwiazanie: [
                  `Gdyby ramię miało $${mniejszy}$ cm, boki $${mniejszy}$, $${mniejszy}$, $${wiekszy}$ nie spełniałyby nierówności: $${mniejszy}+${mniejszy}=${2 * mniejszy}$ nie jest większe niż $${wiekszy}$.`,
                  `Ramię ma więc $${wiekszy}$ cm, a podstawa $${mniejszy}$ cm.`,
                  `Obwód: $${wiekszy}+${wiekszy}+${mniejszy}=${w}$ cm.`,
                ],
              };
            }
            const a = r.int(2, 12);
            const b = r.int(2, 14);
            const mn = Math.min(a, b);
            const mx = Math.max(a, b);
            const od = mx - mn;
            const doo = a + b;
            const opisBokow = `Dwa boki trójkąta mają długości $${a}$ cm i $${b}$ cm, a trzeci bok ma całkowitą liczbę centymetrów.`;
            const nier = `Trzeci bok $c$ spełnia $${mx}-${mn}<c<${a}+${b}$, czyli $${od}<c<${doo}$.`;
            if (tryb === 0) {
              const w = doo - 1;
              return {
                tresc: `${opisBokow} Jaka jest największa możliwa długość trzeciego boku (w cm)?`,
                pola: [pole("w", "Największy bok (cm) $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$ cm`,
                rozwiazanie: [nier, `Końce przedziału nie pasują, więc największa liczba całkowita to $${w}$.`],
              };
            }
            if (tryb === 1) {
              const w = od + 1;
              return {
                tresc: `${opisBokow} Jaka jest najmniejsza możliwa długość trzeciego boku (w cm)?`,
                pola: [pole("w", "Najmniejszy bok (cm) $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$ cm`,
                rozwiazanie: [nier, `Końce przedziału nie pasują, więc najmniejsza liczba całkowita to $${od}+1=${w}$.`],
              };
            }
            const w = doo - od - 1;
            return {
              tresc: `${opisBokow} Ile różnych długości może mieć trzeci bok?`,
              pola: [pole("w", "Liczba możliwości $=$")],
              odpowiedz: { w: q(w) },
              wynik: `$${w}$`,
              rozwiazanie: [nier, `Całkowite wartości: od $${od + 1}$ do $${doo - 1}$.`, `Jest ich $${doo - 1}-${od + 1}+1=${w}$.`],
            };
          },
        },
      ],
    },
  ],
};
