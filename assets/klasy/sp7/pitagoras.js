// Klasa 7 (szkoła podstawowa) · rozdział VI „Trójkąty prostokątne” – Matematyka z kluczem 7 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Twierdzenie Pitagorasa (przeciwprostokątna, przyprostokątna, sprawdzanie, czy trójkąt jest prostokątny), zadania z życia,
// przekątna kwadratu a√2, wysokość trójkąta równobocznego a√3/2, trójkąty 45-45-90 i 30-60-90.
// Bez trygonometrii i bez układu współrzędnych. Odpowiedzi z pierwiastkiem: współczynnik albo wybór.
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** Powtarza losowanie, aż f() zwróci zadanie (wartość różną od null). */
function probuj(f, proby = 2000) {
  for (let i = 0; i < proby; i++) {
    const w = f();
    if (w) return w;
  }
  throw new Error("Nie udało się wylosować zadania");
}

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });
const sq = (x) => `\\sqrt{${x}}`;
/** Współczynnik przed pierwiastkiem: ck(3, 2) = "3\\sqrt{2}", ck(1, 2) = "\\sqrt{2}". */
const ck = (k, m) => (k === 1 ? sq(m) : `${k}${sq(m)}`);
const calk = (n) => {
  let k = Math.floor(Math.sqrt(n));
  while (k * k > n) k--;
  while ((k + 1) * (k + 1) <= n) k++;
  return k;
};
/** Największy kwadrat dzielący n: n = k²·m. */
function rozloz(n) {
  let k = calk(n);
  while (n % (k * k)) k--;
  return { k, m: n / (k * k) };
}

/** Trójki pitagorejskie (a < b < c) z c ≤ 50. */
const TROJKI = (() => {
  const w = [];
  for (let a = 3; a <= 48; a++) {
    for (let b = a + 1; b <= 48; b++) {
      const c = calk(a * a + b * b);
      if (c * c === a * a + b * b && c <= 50) w.push([a, b, c]);
    }
  }
  return w;
})();
/** Trójki do ekranów telewizorów (przekątna 50–100 cm). */
const TROJKI_TV = (() => {
  const w = [];
  for (const [a, b, c] of [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]) {
    for (let k = 1; k <= 30; k++) if (c * k >= 50 && c * k <= 100) w.push([a * k, b * k, c * k]);
  }
  return w;
})();

/** Czy boki (w dowolnej kolejności) tworzą trójkąt prostokątny. */
const prostokatny = (s) => {
  const [p, qq, w] = [...s].sort((x, y) => x - y);
  return p * p + qq * qq === w * w;
};

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Twierdzenie Pitagorasa
    {
      id: "twierdzenie-pitagorasa",
      nazwa: "Twierdzenie Pitagorasa",
      sciaga: [
        {
          nazwa: "Boki trójkąta prostokątnego",
          slownie: "Trójkąt prostokątny ma jeden kąt prosty. Dwa boki przy kącie prostym to przyprostokątne. Trzeci bok leży naprzeciw kąta prostego i nazywa się przeciwprostokątna.",
          litery: "$a$, $b$ – przyprostokątne, $c$ – przeciwprostokątna.",
          przyklad: "Trójkąt ma boki $3$, $4$ i $5$, a kąt prosty jest naprzeciw boku $5$. Zatem $5$ to przeciwprostokątna, a $3$ i $4$ to przyprostokątne.",
          uwaga: "Przeciwprostokątna jest zawsze najdłuższym bokiem. Może być narysowana w dowolnym miejscu, bo trójkąt można obrócić.",
        },
        {
          nazwa: "Twierdzenie Pitagorasa",
          slownie: "W trójkącie prostokątnym kwadrat przeciwprostokątnej jest równy sumie kwadratów przyprostokątnych. Gdy znasz dwa boki, liczysz trzeci.",
          tex: "a^2+b^2=c^2",
          litery: "$a$, $b$ – przyprostokątne, $c$ – przeciwprostokątna.",
          przyklad: "Przyprostokątne mają $3$ i $4$. Wtedy $c^2=3^2+4^2=9+16=25$, więc $c=\\sqrt{25}=5$.",
          uwaga: "Po dodaniu kwadratów trzeba jeszcze wyciągnąć pierwiastek. Nie dodawaj też samych długości: $3+4=7$, a przeciwprostokątna ma $5$.",
        },
        {
          nazwa: "Szukanie przyprostokątnej",
          slownie: "Gdy znasz przeciwprostokątną i jedną przyprostokątną, odejmujesz. Od kwadratu najdłuższego boku odejmij kwadrat znanej przyprostokątnej.",
          tex: "b^2=c^2-a^2\\qquad b=\\sqrt{c^2-a^2}",
          litery: "$c$ – przeciwprostokątna, $a$ – znana przyprostokątna, $b$ – szukana.",
          przyklad: "Przeciwprostokątna ma $13$, a jedna przyprostokątna $5$. Wtedy $b^2=13^2-5^2=169-25=144$, więc $b=12$.",
          uwaga: "Odejmujemy kwadraty, a nie same długości. Zawsze odejmujemy od kwadratu przeciwprostokątnej.",
        },
        {
          nazwa: "Trójki pitagorejskie",
          slownie: "To trzy liczby całkowite, dla których $a^2+b^2=c^2$. Warto je znać, bo wtedy wynik wychodzi bez pierwiastka. Gdy pomnożysz wszystkie trzy liczby przez tę samą liczbę, dostaniesz kolejną trójkę.",
          tex: "3,4,5\\qquad5,12,13\\qquad8,15,17\\qquad7,24,25",
          przyklad: "Trójka $6$, $8$, $10$ to trójka $3$, $4$, $5$ razy $2$. Sprawdzenie: $36+64=100$.",
          uwaga: "Przeciwprostokątna to największa liczba z trójki.",
        },
        {
          nazwa: "Czy trójkąt jest prostokątny?",
          slownie: "Weź najdłuższy bok. Jeśli jego kwadrat jest równy sumie kwadratów dwóch pozostałych boków, to trójkąt jest prostokątny. Jeśli nie, to nie jest.",
          tex: "c^2=a^2+b^2",
          litery: "$c$ – najdłuższy bok, $a$, $b$ – pozostałe boki.",
          przyklad: "Boki $7$, $24$, $25$: $7^2+24^2=49+576=625=25^2$, więc trójkąt jest prostokątny. Boki $5$, $6$, $8$: $25+36=61$, ale $8^2=64$, więc nie jest.",
          uwaga: "Po prawej stronie zawsze stawiamy kwadrat najdłuższego boku.",
        },
      ],
      jak: [
        "Zrób szkic trójkąta i zaznacz kąt prosty. Naprzeciw niego jest przeciwprostokątna.",
        "Szukasz przeciwprostokątnej? Dodaj kwadraty przyprostokątnych i wyciągnij pierwiastek.",
        "Szukasz przyprostokątnej? Od kwadratu przeciwprostokątnej odejmij kwadrat drugiej przyprostokątnej i wyciągnij pierwiastek.",
        "Sprawdź, czy boki nie tworzą znanej trójki ($3,4,5$; $5,12,13$; …) albo jej wielokrotności.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "W trójkącie prostokątnym przyprostokątne mają długości $6$ cm i $8$ cm. Ile centymetrów ma przeciwprostokątna? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$ cm", "$48$ cm", "$10$ cm", "$100$ cm"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Przeciwprostokątna trójkąta prostokątnego ma $13$ cm, a jedna z przyprostokątnych $5$ cm. Ile centymetrów ma druga przyprostokątna? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$ cm", "$8$ cm", "$18$ cm", "$144$ cm"],
          poprawna: 0,
        },
        {
          nr: "3",
          tresc: "W trójkącie prostokątnym przyprostokątne mają długości $a$ i $b$, a przeciwprostokątna ma długość $c$. Która równość jest prawdziwa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$a+b=c$", "$a^2+b^2=c$", "$a^2+c^2=b^2$", "$a^2+b^2=c^2$"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "Oceń, czy trójkąty o podanych bokach są prostokątne. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Trójkąt o bokach $9$, $12$ i $15$ jest prostokątny.", litery: "PF", poprawna: 0 },
            { tekst: "Trójkąt o bokach $6$, $8$ i $9$ jest prostokątny.", litery: "PF", poprawna: 1 },
            { tekst: "Trójkąt o bokach $7$, $24$ i $26$ jest prostokątny.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "5",
          tresc: "Przyprostokątne trójkąta prostokątnego mają $2$ cm i $3$ cm. Ile centymetrów ma przeciwprostokątna? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$ cm", "$13$ cm", "$\\sqrt{13}$ cm", "$6$ cm"],
          poprawna: 2,
        },
        {
          nr: "6",
          tresc: "Przeciwprostokątna ma $17$ cm, a jedna z przyprostokątnych $8$ cm. Ile centymetrów ma druga przyprostokątna? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\sqrt{353}$ cm", "$15$ cm", "$9$ cm", "$225$ cm"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "7",
          punkty: 2,
          tresc: "Trójkąt ma boki $20$ cm, $21$ cm i $29$ cm. Sprawdź, czy jest prostokątny. Jeśli tak, oblicz jego pole. **Zapisz obliczenia.**",
          rozwiazanie: "Najdłuższy bok ma $29$ cm. Sprawdzamy: $20^2+21^2=400+441=841$ oraz $29^2=841$.\n\nKwadrat najdłuższego boku jest równy sumie kwadratów pozostałych, więc trójkąt jest prostokątny. Jego przyprostokątne mają $20$ cm i $21$ cm.\n\nPole to połowa iloczynu przyprostokątnych: $\\frac{1}{2}\\cdot20\\cdot21=210$ cm$^2$.\n\nOdpowiedź: Trójkąt jest prostokątny, a jego pole to $210$ cm$^2$.",
        },
        {
          nr: "8",
          punkty: 2,
          tresc: "W trójkącie prostokątnym jedna przyprostokątna ma $24$ cm, a przeciwprostokątna $26$ cm. Oblicz obwód tego trójkąta. **Zapisz obliczenia.**",
          rozwiazanie: "Druga przyprostokątna: $b^2=26^2-24^2=676-576=100$, więc $b=\\sqrt{100}=10$ cm.\n\nObwód to suma wszystkich boków: $24+10+26=60$ cm.\n\nOdpowiedź: Obwód trójkąta wynosi $60$ cm.",
        },
      ],
      generatory: [
        {
          id: "znajdz-bok",
          nazwa: "Znajdź bok trójkąta",
          opis: "Oblicz przeciwprostokątną albo przyprostokątną trójkąta prostokątnego o bokach całkowitych (trójka pitagorejska).",
          generuj(r) {
            const [a, b, c] = r.pick(TROJKI);
            const [x, y] = r.chance() ? [a, b] : [b, a];
            const j = r.pick(["cm", "m"]);
            const tryb = r.int(0, 3);
            const hyp = [
              `Oznaczmy przeciwprostokątną przez $c$. Z twierdzenia Pitagorasa $c^2=${x}^2+${y}^2$.`,
              `$c^2=${x * x}+${y * y}=${c * c}$.`,
              `$c=${sq(c * c)}=${c}$.`,
            ];
            const leg = [
              `Szukamy przyprostokątnej $b$. Znamy przeciwprostokątną $c=${c}$ i przyprostokątną $a=${x}$.`,
              `$b^2=c^2-a^2=${c * c}-${x * x}=${y * y}$.`,
              `$b=${sq(y * y)}=${y}$.`,
            ];
            if (tryb === 0) {
              return {
                tresc: `W trójkącie prostokątnym przyprostokątne mają długości $${x}$ ${j} i $${y}$ ${j}. Oblicz długość przeciwprostokątnej (w ${j}).`,
                pola: [pole("w", "Przeciwprostokątna $=$")],
                odpowiedz: { w: q(c) },
                wynik: `$${c}$ ${j}`,
                rozwiazanie: hyp,
              };
            }
            if (tryb === 1) {
              return {
                tresc: `W trójkącie prostokątnym przeciwprostokątna ma $${c}$ ${j}, a jedna z przyprostokątnych $${x}$ ${j}. Oblicz długość drugiej przyprostokątnej (w ${j}).`,
                pola: [pole("w", "Przyprostokątna $=$")],
                odpowiedz: { w: q(y) },
                wynik: `$${y}$ ${j}`,
                rozwiazanie: leg,
              };
            }
            if (tryb === 2) {
              return {
                tresc: `Trójkąt $ABC$ ma kąt prosty przy wierzchołku $C$. Wiadomo, że $|AC|=${x}$ ${j} i $|BC|=${y}$ ${j}. Jaką długość (w ${j}) ma bok $AB$?`,
                pola: [pole("w", "$|AB|=$")],
                odpowiedz: { w: q(c) },
                wynik: `$${c}$ ${j}`,
                rozwiazanie: [`Kąt prosty jest przy $C$, więc $AB$ to przeciwprostokątna.`, ...hyp],
              };
            }
            return {
              tresc: `Trójkąt $ABC$ ma kąt prosty przy wierzchołku $C$. Wiadomo, że $|AB|=${c}$ ${j} i $|AC|=${x}$ ${j}. Jaką długość (w ${j}) ma bok $BC$?`,
              pola: [pole("w", "$|BC|=$")],
              odpowiedz: { w: q(y) },
              wynik: `$${y}$ ${j}`,
              rozwiazanie: [`Kąt prosty jest przy $C$, więc $AB$ to przeciwprostokątna.`, ...leg],
            };
          },
        },
        {
          id: "czy-prostokatny",
          nazwa: "Czy jest prostokątny?",
          opis: "Sprawdź, czy trójkąt o podanych bokach jest prostokątny.",
          generuj(r) {
            const tak = r.chance();
            const s = probuj(() => {
              const [a, b, c] = r.pick(TROJKI);
              const t = [a, b, c];
              if (!tak) t[r.int(0, 2)] += r.pick([-1, 1, 2]);
              const [p, m, w] = [...t].sort((x, y) => x - y);
              return p > 0 && p + m > w && prostokatny(t) === tak ? t : null;
            });
            const [p, m, w] = [...s].sort((x, y) => x - y);
            const pokaz = r.shuffle(s);
            const j = r.pick(["cm", "m"]);
            return {
              tresc: `Trójkąt ma boki o długościach $${pokaz[0]}$ ${j}, $${pokaz[1]}$ ${j} i $${pokaz[2]}$ ${j}. Czy jest on prostokątny?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Odpowiedź", opcje: ["Tak, jest prostokątny", "Nie, nie jest prostokątny"] }],
              odpowiedz: { w: tak ? 0 : 1 },
              wynik: tak ? "Tak" : "Nie",
              rozwiazanie: [
                `Najdłuższy bok ma $${w}$. Sprawdzamy, czy $${p}^2+${m}^2=${w}^2$.`,
                `Lewa strona: $${p * p}+${m * m}=${p * p + m * m}$. Prawa strona: $${w}^2=${w * w}$.`,
                tak ? "Obie strony są równe, więc trójkąt jest prostokątny." : "Obie strony są różne, więc trójkąt nie jest prostokątny.",
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Twierdzenie Pitagorasa – zadania
    {
      id: "pitagoras-zadania",
      nazwa: "Twierdzenie Pitagorasa – zadania",
      sciaga: [
        {
          nazwa: "Drabina i ściana",
          slownie: "Ściana, ziemia i drabina tworzą trójkąt prostokątny. Drabina jest przeciwprostokątną, a wysokość i odległość od ściany to przyprostokątne. Zrób szkic, a zadanie będzie proste.",
          tex: "h^2+d^2=l^2",
          litery: "$h$ – wysokość, na której drabina dotyka ściany, $d$ – odległość dolnego końca od ściany, $l$ – długość drabiny.",
          przyklad: "Drabina ma $10$ m, a jej dolny koniec stoi $6$ m od ściany. Wtedy $h^2=100-36=64$, więc drabina sięga na wysokość $h=8$ m.",
          uwaga: "Gdy szukasz wysokości, odejmuj kwadraty ($l^2-d^2$). Dodajemy tylko wtedy, gdy szukamy drabiny.",
        },
        {
          nazwa: "Przekątna prostokąta",
          slownie: "Przekątna dzieli prostokąt na dwa trójkąty prostokątne. Boki prostokąta są przyprostokątnymi, a przekątna przeciwprostokątną.",
          tex: "d^2=a^2+b^2",
          litery: "$a$, $b$ – boki prostokąta, $d$ – przekątna.",
          przyklad: "Ekran telewizora ma $80$ cm szerokości i $60$ cm wysokości. Wtedy $d^2=6400+3600=10\\,000$, więc przekątna ma $100$ cm.",
          uwaga: "Przekątna jest krótsza niż suma boków. Po przekątnej jest skrót: idąc wzdłuż boków przejdziesz $80+60=140$ cm, a po przekątnej tylko $100$ cm.",
        },
        {
          nazwa: "Wysokość trójkąta równoramiennego",
          slownie: "Wysokość opuszczona na podstawę dzieli trójkąt równoramienny na dwa jednakowe trójkąty prostokątne. W każdym ramię jest przeciwprostokątną, a przyprostokątne to wysokość i połowa podstawy.",
          tex: "h^2+\\left(\\frac{a}{2}\\right)^2=b^2",
          litery: "$a$ – podstawa, $b$ – ramię, $h$ – wysokość.",
          przyklad: "Podstawa ma $10$ cm, ramię $13$ cm. Połowa podstawy to $5$, więc $h^2=169-25=144$ i $h=12$ cm.",
          uwaga: "Do obliczeń bierzemy połowę podstawy, a nie całą podstawę.",
        },
        {
          nazwa: "Wynik z pierwiastkiem",
          slownie: "Gdy kwadrat szukanego boku nie jest kwadratem liczby całkowitej, zostaw pierwiastek i uprość go, wyłączając czynnik przed pierwiastek. Taki wynik jest dokładny, a zapis dziesiętny jest tylko przybliżony.",
          tex: "d=\\sqrt{52}=\\sqrt{4\\cdot13}=2\\sqrt{13}",
          przyklad: "Prostokąt ma boki $4$ cm i $6$ cm. Wtedy $d^2=16+36=52$ i $d=\\sqrt{52}=2\\sqrt{13}$ cm. Skoro $\\sqrt{13}\\approx3{,}6$, to $d\\approx7{,}2$ cm.",
          uwaga: "$2\\sqrt{13}$ to nie $\\sqrt{26}$ ani $26$. Liczbę przed pierwiastkiem trzeba podnieść do kwadratu, gdy chcesz ją wciągnąć: $2\\sqrt{13}=\\sqrt{52}$.",
        },
      ],
      jak: [
        "Narysuj szkic i znajdź w nim trójkąt prostokątny: ściana z drabiną, prostokąt z przekątną, wysokość w trójkącie.",
        "Zaznacz, który bok jest przeciwprostokątną (naprzeciw kąta prostego). To zawsze najdłuższy bok.",
        "Zapisz twierdzenie Pitagorasa i wstaw znane liczby. Pamiętaj, że gdy szukasz przyprostokątnej, kwadraty odejmujemy.",
        "Jeśli wynik nie jest całkowity, zapisz go z pierwiastkiem i uprość. Na koniec sprawdź, czy wynik ma sens (przeciwprostokątna jest najdłuższa).",
      ],
      zadania: [
        {
          nr: "9",
          tresc: "Drabina o długości $10$ m jest oparta o pionową ścianę. Jej dolny koniec stoi $6$ m od ściany. Na jakiej wysokości drabina dotyka ściany? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$ m", "$16$ m", "$\\sqrt{136}$ m", "$8$ m"],
          poprawna: 3,
        },
        {
          nr: "10",
          tresc: "Ekran telewizora ma szerokość $80$ cm i wysokość $60$ cm. Ile centymetrów ma przekątna ekranu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$140$ cm", "$70$ cm", "$100$ cm", "$10\\,000$ cm"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "Boisko ma kształt prostokąta o bokach $24$ m i $7$ m. Ania przeszła z jednego rogu do przeciwległego po przekątnej, a nie wzdłuż dwóch boków. O ile metrów krócej szła? **Wybierz właściwą odpowiedź.**",
          opcje: ["$25$ m", "$6$ m", "$31$ m", "$17$ m"],
          poprawna: 1,
        },
        {
          nr: "12",
          tresc: "Podstawa trójkąta równoramiennego ma $16$ cm, a ramię $17$ cm. Ile centymetrów ma wysokość opuszczona na podstawę? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$ cm", "$\\sqrt{33}$ cm", "$1$ cm", "$15$ cm"],
          poprawna: 3,
        },
        {
          nr: "13",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Drabina o długości $13$ m, której dolny koniec stoi $5$ m od ściany, sięga na wysokość $8$ m.", litery: "PF", poprawna: 1 },
            { tekst: "Przekątna prostokąta o bokach $9$ cm i $12$ cm ma $15$ cm.", litery: "PF", poprawna: 0 },
            { tekst: "Trójkąt prostokątny o przyprostokątnych $1$ cm i $1$ cm ma przeciwprostokątną $2$ cm.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "14",
          tresc: "Prostokąt ma boki $4$ cm i $6$ cm. Ile centymetrów ma jego przekątna? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10$ cm", "$2\\sqrt{13}$ cm", "$\\sqrt{20}$ cm", "$52$ cm"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "15",
          punkty: 2,
          tresc: "Przekątna ekranu telewizora ma $130$ cm, a szerokość ekranu $120$ cm. Oblicz wysokość i pole ekranu. **Zapisz obliczenia.**",
          rozwiazanie: "Wysokość ekranu jest przyprostokątną, a przekątna przeciwprostokątną: $h^2=130^2-120^2=16\\,900-14\\,400=2500$.\n\nStąd $h=\\sqrt{2500}=50$ cm.\n\nPole ekranu: $120\\cdot50=6000$ cm$^2$.\n\nOdpowiedź: Ekran ma wysokość $50$ cm i pole $6000$ cm$^2$.",
        },
        {
          nr: "16",
          punkty: 3,
          tresc: "Drabina o długości $25$ m jest oparta o ścianę budynku, a jej dolny koniec stoi $7$ m od ściany. a) Na jakiej wysokości drabina dotyka ściany? b) Drabina zsunęła się po ścianie o $4$ m w dół. Jak daleko od ściany stoi teraz jej dolny koniec? **Zapisz obliczenia.**",
          rozwiazanie: "a) $h^2=25^2-7^2=625-49=576$, więc $h=\\sqrt{576}=24$ m.\n\nb) Górny koniec drabiny jest teraz na wysokości $24-4=20$ m.\n\nOdległość od ściany: $d^2=25^2-20^2=625-400=225$, więc $d=\\sqrt{225}=15$ m.\n\nOdpowiedź: a) Drabina dotyka ściany na wysokości $24$ m. b) Dolny koniec stoi teraz $15$ m od ściany.",
        },
      ],
      generatory: [
        {
          id: "drabina-maszt",
          nazwa: "Drabina albo linka",
          opis: "Zadanie z życia: drabina przy ścianie albo linka przy maszcie. Oblicz brakującą długość z twierdzenia Pitagorasa.",
          generuj(r) {
            const [a, b, c] = r.pick(TROJKI.filter((t) => t[2] <= 30));
            const [h, d] = r.chance() ? [a, b] : [b, a];
            const ktory = r.int(0, 1);
            const tryb = r.int(0, 2);
            const teksty = [
              [
                `Drabina oparta o pionową ścianę dotyka jej na wysokości $${h}$ m, a jej dolny koniec stoi $${d}$ m od ściany. Ile metrów ma drabina?`,
                `Drabina o długości $${c}$ m jest oparta o pionową ścianę. Jej dolny koniec stoi $${d}$ m od ściany. Na jakiej wysokości (w metrach) drabina dotyka ściany?`,
                `Drabina o długości $${c}$ m dotyka pionowej ściany na wysokości $${h}$ m. Jak daleko od ściany (w metrach) stoi jej dolny koniec?`,
              ],
              [
                `Pionowy maszt ma wysokość $${h}$ m. Napięta linka łączy jego czubek z kotwą w ziemi, oddaloną o $${d}$ m od podstawy masztu. Ile metrów ma linka?`,
                `Napięta linka o długości $${c}$ m łączy czubek pionowego masztu z kotwą w ziemi, oddaloną o $${d}$ m od podstawy masztu. Ile metrów ma maszt?`,
                `Napięta linka o długości $${c}$ m łączy czubek pionowego masztu o wysokości $${h}$ m z kotwą w ziemi. Jak daleko (w metrach) od podstawy masztu jest kotwa?`,
              ],
            ];
            const wstep = ktory === 0
              ? "Ściana, ziemia i drabina tworzą trójkąt prostokątny. Drabina jest przeciwprostokątną."
              : "Maszt, ziemia i linka tworzą trójkąt prostokątny. Linka jest przeciwprostokątną.";
            const ile = [c, h, d][tryb];
            let kroki;
            if (tryb === 0) {
              kroki = [wstep, `$l^2=${h}^2+${d}^2=${h * h}+${d * d}=${c * c}$.`, `$l=${sq(c * c)}=${c}$ m.`];
            } else {
              const [znane, szukane] = tryb === 1 ? [d, h] : [h, d];
              kroki = [wstep, `Szukamy przyprostokątnej: $x^2=${c}^2-${znane}^2=${c * c}-${znane * znane}=${szukane * szukane}$.`, `$x=${sq(szukane * szukane)}=${szukane}$ m.`];
            }
            return {
              tresc: teksty[ktory][tryb],
              pola: [pole("w", "Wynik w metrach $=$")],
              odpowiedz: { w: q(ile) },
              wynik: `$${ile}$ m`,
              rozwiazanie: kroki,
            };
          },
        },
        {
          id: "przekatna-prostokata",
          nazwa: "Przekątna prostokąta",
          opis: "Przekątna ekranu albo prostokąta, skrót po przekątnej, drugi bok prostokąta albo przekątna zapisana z pierwiastkiem (wybór).",
          generuj(r) {
            const tryb = r.int(0, 4);
            if (tryb === 0) {
              const [a, b, c] = r.pick(TROJKI_TV);
              const [x, y] = r.chance() ? [a, b] : [b, a];
              return {
                tresc: `Ekran telewizora ma szerokość $${x}$ cm i wysokość $${y}$ cm. Ile centymetrów ma przekątna ekranu?`,
                pola: [pole("w", "Przekątna (cm) $=$")],
                odpowiedz: { w: q(c) },
                wynik: `$${c}$ cm`,
                rozwiazanie: [
                  `Szerokość i wysokość to przyprostokątne, a przekątna to przeciwprostokątna.`,
                  `$d^2=${x}^2+${y}^2=${x * x}+${y * y}=${c * c}$.`,
                  `$d=${sq(c * c)}=${c}$ cm.`,
                ],
              };
            }
            const [a, b, c] = r.pick(TROJKI);
            const [x, y] = r.chance() ? [a, b] : [b, a];
            if (tryb === 1) {
              return {
                tresc: `Prostokąt ma boki długości $${x}$ cm i $${y}$ cm. Oblicz długość jego przekątnej (w cm).`,
                pola: [pole("w", "Przekątna (cm) $=$")],
                odpowiedz: { w: q(c) },
                wynik: `$${c}$ cm`,
                rozwiazanie: [`$d^2=${x}^2+${y}^2=${x * x}+${y * y}=${c * c}$.`, `$d=${sq(c * c)}=${c}$ cm.`],
              };
            }
            if (tryb === 2) {
              return {
                tresc: `Pole ma kształt prostokąta o bokach $${x}$ m i $${y}$ m. Ola idzie z jednego rogu do przeciwległego na skróty, po przekątnej, zamiast iść wzdłuż dwóch boków. O ile metrów krótsza jest jej droga?`,
                pola: [pole("w", "Różnica (m) $=$")],
                odpowiedz: { w: q(x + y - c) },
                wynik: `$${x + y - c}$ m`,
                rozwiazanie: [
                  `Przekątna: $d^2=${x}^2+${y}^2=${c * c}$, czyli $d=${c}$ m.`,
                  `Droga wzdłuż boków ma $${x}+${y}=${x + y}$ m.`,
                  `Skrót daje $${x + y}-${c}=${x + y - c}$ m.`,
                ],
              };
            }
            if (tryb === 3) {
              return {
                tresc: `Przekątna prostokąta ma $${c}$ cm, a jeden z jego boków $${x}$ cm. Ile centymetrów ma drugi bok?`,
                pola: [pole("w", "Drugi bok (cm) $=$")],
                odpowiedz: { w: q(y) },
                wynik: `$${y}$ cm`,
                rozwiazanie: [
                  `Przekątna jest przeciwprostokątną, więc $y^2=${c}^2-${x}^2=${c * c}-${x * x}=${y * y}$.`,
                  `$y=${sq(y * y)}=${y}$ cm.`,
                ],
              };
            }
            const { p, s, N, k, m } = probuj(() => {
              const p = r.int(1, 9);
              const s = r.int(1, 9);
              const N = p * p + s * s;
              const { k, m } = rozloz(N);
              return m > 1 && p !== s ? { p, s, N, k, m } : null;
            });
            const dobra = { tex: ck(k, m), val: k * Math.sqrt(m) };
            const kand = [
              { tex: `${p + s}`, val: p + s },
              { tex: `${N}`, val: N },
              { tex: sq(p + s), val: Math.sqrt(p + s) },
              { tex: sq(p * s), val: Math.sqrt(p * s) },
              ...(k > 1 ? [{ tex: `${k * k}${sq(m)}`, val: k * k * Math.sqrt(m) }] : []),
            ];
            const zle = [];
            for (const c1 of r.shuffle(kand)) {
              if (Math.abs(c1.val - dobra.val) < 1e-9 || zle.some((z) => Math.abs(z.val - c1.val) < 1e-9)) continue;
              zle.push(c1);
              if (zle.length === 3) break;
            }
            const kol = r.shuffle([dobra, ...zle]);
            return {
              tresc: `Prostokąt ma boki $${p}$ cm i $${s}$ cm. Która liczba jest długością jego przekątnej (w cm)?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Przekątna (cm)", opcje: kol.map((o) => `$${o.tex}$`) }],
              odpowiedz: { w: kol.indexOf(dobra) },
              wynik: `$${dobra.tex}$ cm`,
              rozwiazanie: [
                `$d^2=${p}^2+${s}^2=${p * p}+${s * s}=${N}$.`,
                k > 1 ? `$d=${sq(N)}=${sq(`${k * k}\\cdot${m}`)}=${ck(k, m)}$.` : `Liczba $${N}$ nie ma czynnika będącego kwadratem, więc $d=${sq(N)}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Kwadrat i jego połowa
    {
      id: "kwadrat-i-polowa",
      nazwa: "Kwadrat i jego połowa",
      sciaga: [
        {
          nazwa: "Przekątna kwadratu",
          slownie: "Przekątna dzieli kwadrat na dwa trójkąty prostokątne, w których przyprostokątne to boki kwadratu. Z twierdzenia Pitagorasa wychodzi, że przekątna jest $\\sqrt2$ razy dłuższa od boku.",
          tex: "d=a\\sqrt2",
          litery: "$a$ – bok kwadratu, $d$ – jego przekątna.",
          przyklad: "Bok ma $5$ cm. Wtedy $d^2=25+25=50$, więc $d=\\sqrt{50}=5\\sqrt2$ cm.",
          uwaga: "Przekątna nie jest dwa razy dłuższa od boku. Ponieważ $\\sqrt2\\approx1{,}4$, przekątna kwadratu o boku $10$ cm ma około $14$ cm, a nie $20$ cm.",
        },
        {
          nazwa: "Bok z przekątnej",
          slownie: "Gdy przekątna jest zapisana jako $k\\sqrt2$, to bok kwadratu ma po prostu $k$. Wzór $d=a\\sqrt2$ działa w obie strony.",
          tex: "d=k\\sqrt2\\ \\Rightarrow\\ a=k",
          litery: "$d$ – przekątna, $a$ – bok kwadratu.",
          przyklad: "Przekątna kafelka ma $7\\sqrt2$ cm. Zatem bok kafelka ma $7$ cm.",
          uwaga: "Bok nie jest połową przekątnej. Dla $d=7\\sqrt2$ bok to $7$, a nie $3{,}5\\sqrt2$.",
        },
        {
          nazwa: "Pole z przekątnej",
          slownie: "Z $d=a\\sqrt2$ wynika $d^2=2a^2$. Pole kwadratu to $a^2$, czyli połowa kwadratu przekątnej.",
          tex: "P=\\frac{d^2}{2}",
          litery: "$P$ – pole kwadratu, $d$ – jego przekątna.",
          przyklad: "Przekątna ma $10$ cm. Pole: $P=\\frac{10^2}{2}=\\frac{100}{2}=50$ cm$^2$. Bok to $5\\sqrt2$ cm i $(5\\sqrt2)^2=50$.",
          uwaga: "Pole to połowa $d^2$, a nie połowa $d$.",
        },
        {
          nazwa: "Trójkąt 45°, 45°, 90°",
          slownie: "Kwadrat rozcięty wzdłuż przekątnej daje trójkąt prostokątny równoramienny z kątami $45°$, $45°$ i $90°$. Jego przyprostokątne są równe, a przeciwprostokątna jest $\\sqrt2$ razy dłuższa.",
          tex: "a,\\ a,\\ a\\sqrt2",
          litery: "$a$ – przyprostokątna, $a\\sqrt2$ – przeciwprostokątna.",
          przyklad: "Przyprostokątne mają po $6$ cm. Przeciwprostokątna ma $6\\sqrt2$ cm, a pole to $\\frac{1}{2}\\cdot6\\cdot6=18$ cm$^2$.",
          uwaga: "Czynnik $\\sqrt2$ ma przeciwprostokątna, czyli najdłuższy bok, a nie przyprostokątna.",
        },
      ],
      jak: [
        "Szukasz przekątnej kwadratu? Pomnóż bok przez $\\sqrt2$.",
        "Masz przekątną $k\\sqrt2$? Bok to $k$.",
        "Przekątna dana liczbą (np. $10$)? Zapisz $d^2=2a^2$ albo użyj wzoru $P=\\frac{d^2}{2}$.",
        "W trójkącie $45°$, $45°$, $90°$ przyprostokątne są równe, a przeciwprostokątna to przyprostokątna razy $\\sqrt2$.",
      ],
      zadania: [
        {
          nr: "17",
          tresc: "Bok kwadratu ma $5$ cm. Ile centymetrów ma przekątna tego kwadratu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10$ cm", "$5\\sqrt2$ cm", "$25$ cm", "$5\\sqrt3$ cm"],
          poprawna: 1,
        },
        {
          nr: "18",
          tresc: "Przekątna kwadratu ma długość $6\\sqrt2$ cm. Ile centymetrów ma bok tego kwadratu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$ cm", "$3\\sqrt2$ cm", "$6$ cm", "$6\\sqrt2$ cm"],
          poprawna: 2,
        },
        {
          nr: "19",
          tresc: "Przekątna kwadratu ma $10$ cm. Ile wynosi pole tego kwadratu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$50$ cm$^2$", "$100$ cm$^2$", "$25$ cm$^2$", "$20$ cm$^2$"],
          poprawna: 0,
        },
        {
          nr: "20",
          tresc: "Trójkąt prostokątny ma kąty $45°$, $45°$ i $90°$, a jego przyprostokątna ma $9$ cm. Ile centymetrów wynosi obwód tego trójkąta? **Wybierz właściwą odpowiedź.**",
          opcje: ["$27$ cm", "$27\\sqrt2$ cm", "$9+9\\sqrt2$ cm", "$18+9\\sqrt2$ cm"],
          poprawna: 3,
        },
        {
          nr: "21",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Przekątna kwadratu o boku $7$ cm ma $7\\sqrt2$ cm.", litery: "PF", poprawna: 0 },
            { tekst: "Przekątna kwadratu o boku $4$ cm ma $8$ cm.", litery: "PF", poprawna: 1 },
            { tekst: "Kwadrat o przekątnej $2\\sqrt2$ cm ma bok $2$ cm.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "22",
          punkty: 2,
          tresc: "Kwadratowy plac ma bok $30$ m. Marek idzie z jednego rogu placu do przeciwległego. Zamiast iść wzdłuż dwóch boków, idzie po przekątnej. O ile metrów skraca sobie drogę? Przyjmij $\\sqrt2\\approx1{,}4$. **Zapisz obliczenia.**",
          rozwiazanie: "Przekątna placu ma $30\\sqrt2$ m. Dla $\\sqrt2\\approx1{,}4$ mamy $30\\cdot1{,}4=42$ m.\n\nWzdłuż dwóch boków jest $30+30=60$ m.\n\nSkrót to $60-42=18$ m.\n\nOdpowiedź: Marek skraca sobie drogę o około $18$ m.",
        },
        {
          nr: "23",
          punkty: 3,
          tresc: "Trójkąt prostokątny równoramienny ma pole $18$ cm$^2$. Oblicz długość jego przeciwprostokątnej. **Zapisz obliczenia.**",
          rozwiazanie: "Obie przyprostokątne mają tę samą długość $a$. Pole to $\\frac{1}{2}\\cdot a\\cdot a=\\frac{a^2}{2}$.\n\nZ $\\frac{a^2}{2}=18$ mamy $a^2=36$, więc $a=6$ cm.\n\nTo trójkąt $45°$, $45°$, $90°$, więc przeciwprostokątna jest $\\sqrt2$ razy dłuższa od przyprostokątnej: $6\\sqrt2$ cm.\n\nOdpowiedź: Przeciwprostokątna ma $6\\sqrt2$ cm.",
        },
      ],
      generatory: [
        {
          id: "przekatna-kwadratu",
          nazwa: "Przekątna kwadratu",
          opis: "Przekątna kwadratu zapisana jako $k\\sqrt2$, bok z przekątnej, pole z przekątnej albo wybór poprawnej długości przekątnej.",
          generuj(r) {
            const tryb = r.int(0, 3);
            const wzor = `Przekątna kwadratu o boku $a$ ma długość $d=a\\sqrt2$.`;
            if (tryb === 0) {
              const a = r.int(2, 15);
              return {
                tresc: `Kwadrat ma bok $${a}$ cm. Przekątna tego kwadratu ma długość $k\\sqrt2$ cm. Podaj liczbę $k$.`,
                pola: [pole("w", "$k=$")],
                odpowiedz: { w: q(a) },
                wynik: `$${a}$`,
                rozwiazanie: [wzor, `Dla $a=${a}$: $d=${a}\\sqrt2$.`, `Zatem $k=${a}$.`],
              };
            }
            if (tryb === 1) {
              const k = r.int(2, 15);
              const [rzecz, jedn] = r.pick([["kwadratowego kafelka", "cm"], ["kwadratowej chusty", "dm"], ["kwadratowego obrazu", "cm"], ["kwadratowego placu zabaw", "m"]]);
              return {
                tresc: `Przekątna ${rzecz} ma długość $${k}\\sqrt2$ ${jedn}. Ile ${jedn} ma bok?`,
                pola: [pole("w", "Bok $=$")],
                odpowiedz: { w: q(k) },
                wynik: `$${k}$ ${jedn}`,
                rozwiazanie: [wzor, `Mamy $a\\sqrt2=${k}\\sqrt2$.`, `Zatem $a=${k}$ ${jedn}.`],
              };
            }
            if (tryb === 2) {
              const d = 2 * r.int(2, 10);
              const p = (d * d) / 2;
              return {
                tresc: `Przekątna kwadratu ma $${d}$ cm. Oblicz pole tego kwadratu (w cm$^2$).`,
                pola: [pole("w", "Pole (cm$^2$) $=$")],
                odpowiedz: { w: q(p) },
                wynik: `$${p}$ cm$^2$`,
                rozwiazanie: [
                  `Z $d=a\\sqrt2$ mamy $d^2=2a^2$, więc pole $a^2$ to połowa $d^2$.`,
                  `$P=\\frac{d^2}{2}=\\frac{${d * d}}{2}=${p}$.`,
                ],
              };
            }
            const a = r.int(3, 12);
            const dobra = `${a}${sq(2)}`;
            const kol = r.shuffle([dobra, `${2 * a}`, `${a * a}`, `${a}${sq(3)}`]);
            return {
              tresc: `Kwadrat ma bok $${a}$ cm. Która liczba jest długością jego przekątnej (w cm)?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Przekątna (cm)", opcje: kol.map((o) => `$${o}$`) }],
              odpowiedz: { w: kol.indexOf(dobra) },
              wynik: `$${dobra}$ cm`,
              rozwiazanie: [wzor, `Dla $a=${a}$: $d=${dobra}$.`],
            };
          },
        },
        {
          id: "trojkat-45",
          nazwa: "Trójkąt 45°, 45°, 90°",
          opis: "Trójkąt prostokątny równoramienny: przeciwprostokątna z przyprostokątnej, przyprostokątna z przeciwprostokątnej, pole.",
          generuj(r) {
            const tryb = r.int(0, 2);
            const wzor = `W trójkącie $45°$, $45°$, $90°$ przyprostokątne są równe, a przeciwprostokątna jest $\\sqrt2$ razy dłuższa.`;
            const k = r.int(2, 14);
            if (tryb === 0) {
              return {
                tresc: `W trójkącie prostokątnym równoramiennym przyprostokątne mają po $${k}$ cm. Przeciwprostokątna ma długość $k\\sqrt2$ cm. Podaj liczbę $k$.`,
                pola: [pole("w", "$k=$")],
                odpowiedz: { w: q(k) },
                wynik: `$${k}$`,
                rozwiazanie: [wzor, `Przeciwprostokątna ma $${k}\\sqrt2$ cm.`, `Zatem $k=${k}$.`],
              };
            }
            if (tryb === 1) {
              return {
                tresc: `W trójkącie prostokątnym równoramiennym przeciwprostokątna ma $${k}\\sqrt2$ cm. Ile centymetrów ma przyprostokątna?`,
                pola: [pole("w", "Przyprostokątna (cm) $=$")],
                odpowiedz: { w: q(k) },
                wynik: `$${k}$ cm`,
                rozwiazanie: [wzor, `Przeciwprostokątna to przyprostokątna razy $\\sqrt2$, więc $a\\sqrt2=${k}\\sqrt2$.`, `Zatem $a=${k}$ cm.`],
              };
            }
            const p = q(k * k, 2);
            return {
              tresc: `W trójkącie prostokątnym równoramiennym przeciwprostokątna ma $${k}\\sqrt2$ cm. Oblicz pole tego trójkąta (w cm$^2$).`,
              pola: [pole("w", "Pole (cm$^2$) $=$")],
              odpowiedz: { w: p },
              wynik: `$${p.tex()}$ cm$^2$`,
              rozwiazanie: [
                wzor,
                `Z $a\\sqrt2=${k}\\sqrt2$ mamy $a=${k}$ cm.`,
                `Pole: $\\frac{1}{2}\\cdot${k}\\cdot${k}=\\frac{${k * k}}{2}=${p.tex()}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Trójkąt równoboczny i jego połowa
    {
      id: "trojkat-rownoboczny",
      nazwa: "Trójkąt równoboczny i jego połowa",
      sciaga: [
        {
          nazwa: "Wysokość trójkąta równobocznego",
          slownie: "Wysokość dzieli trójkąt równoboczny na dwa jednakowe trójkąty prostokątne. W każdym przeciwprostokątna to bok $a$, jedna przyprostokątna to $\\frac{a}{2}$, a druga to wysokość.",
          tex: "h^2+\\left(\\frac{a}{2}\\right)^2=a^2\\qquad h=\\frac{a\\sqrt3}{2}",
          litery: "$a$ – bok trójkąta, $h$ – jego wysokość.",
          przyklad: "Bok ma $10$ cm. Wtedy $h=\\frac{10\\sqrt3}{2}=5\\sqrt3$ cm.",
          uwaga: "W mianowniku jest $2$. Wysokość nie jest równa $a\\sqrt3$ ani $\\frac{a}{2}$.",
        },
        {
          nazwa: "Pole trójkąta równobocznego",
          slownie: "Pole trójkąta to połowa podstawy razy wysokość. Po wstawieniu wysokości $\\frac{a\\sqrt3}{2}$ dostajemy gotowy wzór.",
          tex: "P=\\frac{1}{2}\\cdot a\\cdot h\\qquad P=\\frac{a^2\\sqrt3}{4}",
          litery: "$a$ – bok trójkąta, $h$ – wysokość, $P$ – pole.",
          przyklad: "Bok ma $6$ cm. Wysokość to $3\\sqrt3$ cm, więc $P=\\frac{1}{2}\\cdot6\\cdot3\\sqrt3=9\\sqrt3$ cm$^2$. Ze wzoru: $\\frac{36\\sqrt3}{4}=9\\sqrt3$.",
          uwaga: "W mianowniku wzoru na pole jest $4$, a nie $2$.",
        },
        {
          nazwa: "Bok z wysokości",
          slownie: "Gdy wysokość jest zapisana jako $k\\sqrt3$, to z $\\frac{a\\sqrt3}{2}=k\\sqrt3$ wychodzi $a=2k$. Bok jest dwa razy większy od liczby stojącej przy pierwiastku.",
          tex: "h=k\\sqrt3\\ \\Rightarrow\\ a=2k",
          litery: "$h$ – wysokość, $a$ – bok trójkąta.",
          przyklad: "Wysokość ma $4\\sqrt3$ cm, więc bok ma $8$ cm, a obwód $3\\cdot8=24$ cm.",
          uwaga: "Bok to $2k$, a nie $k$.",
        },
        {
          nazwa: "Trójkąt 30°, 60°, 90°",
          slownie: "Połowa trójkąta równobocznego ma kąty $30°$, $60°$ i $90°$. Krótsza przyprostokątna (naprzeciw $30°$) to połowa przeciwprostokątnej. Dłuższa przyprostokątna to krótsza razy $\\sqrt3$.",
          tex: "x,\\ x\\sqrt3,\\ 2x",
          litery: "$x$ – krótsza przyprostokątna, $x\\sqrt3$ – dłuższa, $2x$ – przeciwprostokątna.",
          przyklad: "Przeciwprostokątna ma $12$ cm. Krótsza przyprostokątna to $6$ cm, a dłuższa $6\\sqrt3$ cm.",
          uwaga: "Krótsza przyprostokątna leży naprzeciw kąta $30°$. Nie myl jej z dłuższą.",
        },
      ],
      jak: [
        "Trójkąt równoboczny: narysuj wysokość. Dostaniesz trójkąt $30°$, $60°$, $90°$ z bokami $x$, $x\\sqrt3$, $2x$, gdzie $2x$ to bok $a$.",
        "Wysokość to $\\frac{a\\sqrt3}{2}$, pole to $\\frac{a^2\\sqrt3}{4}$. Gdy znasz wysokość $k\\sqrt3$, bok to $2k$.",
        "W trójkącie $30°$, $60°$, $90°$ najpierw znajdź krótszą przyprostokątną (naprzeciw $30°$). Reszta wynika z niej.",
        "Sprawdź: przeciwprostokątna jest najdłuższa, a $x\\sqrt3\\approx1{,}7x$ jest między $x$ a $2x$.",
      ],
      zadania: [
        {
          nr: "24",
          tresc: "Bok trójkąta równobocznego ma $8$ cm. Ile centymetrów ma wysokość tego trójkąta? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8\\sqrt3$ cm", "$4\\sqrt3$ cm", "$4\\sqrt2$ cm", "$4$ cm"],
          poprawna: 1,
        },
        {
          nr: "25",
          tresc: "Bok trójkąta równobocznego ma $12$ cm. Ile wynosi pole tego trójkąta? **Wybierz właściwą odpowiedź.**",
          opcje: ["$36\\sqrt3$ cm$^2$", "$144\\sqrt3$ cm$^2$", "$72\\sqrt3$ cm$^2$", "$12\\sqrt3$ cm$^2$"],
          poprawna: 0,
        },
        {
          nr: "26",
          tresc: "Wysokość trójkąta równobocznego ma $5\\sqrt3$ cm. Ile centymetrów ma bok tego trójkąta? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$ cm", "$15$ cm", "$10$ cm", "$10\\sqrt3$ cm"],
          poprawna: 2,
        },
        {
          nr: "27",
          tresc: "W trójkącie prostokątnym kąty ostre mają $30°$ i $60°$, a przeciwprostokątna ma $14$ cm. Ile centymetrów ma dłuższa przyprostokątna? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$ cm", "$14\\sqrt3$ cm", "$7\\sqrt2$ cm", "$7\\sqrt3$ cm"],
          poprawna: 3,
        },
        {
          nr: "28",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wysokość trójkąta równobocznego o boku $6$ cm ma $3\\sqrt3$ cm.", litery: "PF", poprawna: 0 },
            { tekst: "Wysokość trójkąta równobocznego o boku $10$ cm ma $10\\sqrt3$ cm.", litery: "PF", poprawna: 1 },
            { tekst: "W trójkącie $30°$, $60°$, $90°$ o krótszej przyprostokątnej $5$ cm przeciwprostokątna ma $10$ cm.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "29",
          punkty: 3,
          tresc: "Wysokość trójkąta równobocznego ma $6\\sqrt3$ cm. Oblicz obwód i pole tego trójkąta. **Zapisz obliczenia.**",
          rozwiazanie: "Z $h=\\frac{a\\sqrt3}{2}=6\\sqrt3$ mamy $a=2\\cdot6=12$ cm.\n\nObwód: $3\\cdot12=36$ cm.\n\nPole: $P=\\frac{a^2\\sqrt3}{4}=\\frac{144\\sqrt3}{4}=36\\sqrt3$ cm$^2$.\n\nOdpowiedź: Obwód ma $36$ cm, a pole $36\\sqrt3$ cm$^2$.",
        },
        {
          nr: "30",
          punkty: 3,
          tresc: "Drabina o długości $8$ m jest oparta o pionową ścianę i tworzy z poziomą podłogą kąt $60°$. Jak daleko od ściany stoi dolny koniec drabiny i na jakiej wysokości drabina dotyka ściany? Wysokość podaj dokładnie i w przybliżeniu (przyjmij $\\sqrt3\\approx1{,}73$). **Zapisz obliczenia.**",
          rozwiazanie: "Drabina, podłoga i ściana tworzą trójkąt prostokątny z kątami $30°$, $60°$ i $90°$. Drabina jest przeciwprostokątną i ma $8$ m.\n\nOdległość od ściany to krótsza przyprostokątna (naprzeciw $30°$), czyli połowa przeciwprostokątnej: $8:2=4$ m.\n\nWysokość to dłuższa przyprostokątna: $4\\sqrt3$ m. Przybliżenie: $4\\cdot1{,}73=6{,}92$ m.\n\nOdpowiedź: Dolny koniec stoi $4$ m od ściany, a drabina dotyka ściany na wysokości $4\\sqrt3\\approx6{,}92$ m.",
        },
      ],
      generatory: [
        {
          id: "rownoboczny",
          nazwa: "Trójkąt równoboczny",
          opis: "Wysokość, bok, pole albo obwód trójkąta równobocznego. Wynik podaj jako współczynnik przy $\\sqrt3$ albo liczbę.",
          generuj(r) {
            const tryb = r.int(0, 3);
            const rzecz = r.pick(["Trójkąt równoboczny", "Chorągiewka w kształcie trójkąta równobocznego", "Płytka w kształcie trójkąta równobocznego"]);
            const wzorH = `Wysokość trójkąta równobocznego o boku $a$ to $h=\\frac{a\\sqrt3}{2}$.`;
            if (tryb === 0) {
              const a = 2 * r.int(1, 12);
              const k = a / 2;
              return {
                tresc: `${rzecz} ma bok $${a}$ cm. Wysokość tego trójkąta ma długość $k\\sqrt3$ cm. Podaj liczbę $k$.`,
                pola: [pole("w", "$k=$")],
                odpowiedz: { w: q(k) },
                wynik: `$${k}$`,
                rozwiazanie: [wzorH, `$h=\\frac{${a}\\sqrt3}{2}=${ck(k, 3)}$.`, `Zatem $k=${k}$.`],
              };
            }
            if (tryb === 1) {
              const k = r.int(1, 12);
              return {
                tresc: `${rzecz} ma wysokość $${ck(k, 3)}$ cm. Ile centymetrów ma bok tego trójkąta?`,
                pola: [pole("w", "Bok (cm) $=$")],
                odpowiedz: { w: q(2 * k) },
                wynik: `$${2 * k}$ cm`,
                rozwiazanie: [wzorH, `Mamy $\\frac{a\\sqrt3}{2}=${ck(k, 3)}$, więc $a=2\\cdot${k}=${2 * k}$.`, `Bok ma $${2 * k}$ cm.`],
              };
            }
            if (tryb === 2) {
              const a = 2 * r.int(1, 10);
              const k = (a / 2) ** 2;
              return {
                tresc: `${rzecz} ma bok $${a}$ cm. Pole tego trójkąta ma wartość $k\\sqrt3$ cm$^2$. Podaj liczbę $k$.`,
                pola: [pole("w", "$k=$")],
                odpowiedz: { w: q(k) },
                wynik: `$${k}$`,
                rozwiazanie: [
                  `Pole trójkąta równobocznego o boku $a$ to $P=\\frac{a^2\\sqrt3}{4}$.`,
                  `$P=\\frac{${a * a}\\sqrt3}{4}=${ck(k, 3)}$.`,
                  `Zatem $k=${k}$.`,
                ],
              };
            }
            const k = r.int(1, 10);
            return {
              tresc: `${rzecz} ma wysokość $${ck(k, 3)}$ cm. Oblicz obwód tego trójkąta (w cm).`,
              pola: [pole("w", "Obwód (cm) $=$")],
              odpowiedz: { w: q(6 * k) },
              wynik: `$${6 * k}$ cm`,
              rozwiazanie: [wzorH, `Z $\\frac{a\\sqrt3}{2}=${ck(k, 3)}$ mamy $a=${2 * k}$ cm.`, `Obwód to $3\\cdot${2 * k}=${6 * k}$ cm.`],
            };
          },
        },
        {
          id: "trojkat-30-60",
          nazwa: "Trójkąt 30°, 60°, 90°",
          opis: "Boki trójkąta prostokątnego o kątach $30°$, $60°$, $90°$: przeciwprostokątna, krótsza przyprostokątna, dłuższa przyprostokątna jako $k\\sqrt3$.",
          generuj(r) {
            const tryb = r.int(0, 3);
            const x = r.int(2, 15);
            const wzor = `W trójkącie $30°$, $60°$, $90°$ boki mają długości $x$, $x\\sqrt3$ i $2x$, gdzie $x$ to krótsza przyprostokątna.`;
            const trojkat = "W trójkącie prostokątnym kąty ostre mają $30°$ i $60°$.";
            if (tryb === 0) {
              return {
                tresc: `${trojkat} Krótsza przyprostokątna ma $${x}$ cm. Ile centymetrów ma przeciwprostokątna?`,
                pola: [pole("w", "Przeciwprostokątna (cm) $=$")],
                odpowiedz: { w: q(2 * x) },
                wynik: `$${2 * x}$ cm`,
                rozwiazanie: [wzor, `Przeciwprostokątna to $2x=2\\cdot${x}=${2 * x}$ cm.`],
              };
            }
            if (tryb === 1) {
              const c = 2 * x;
              if (r.chance()) {
                return {
                  tresc: `Drabina o długości $${c}$ m jest oparta o pionową ścianę i tworzy z poziomą podłogą kąt $60°$. Jak daleko od ściany (w metrach) stoi jej dolny koniec?`,
                  pola: [pole("w", "Odległość (m) $=$")],
                  odpowiedz: { w: q(x) },
                  wynik: `$${x}$ m`,
                  rozwiazanie: [
                    `Drabina, podłoga i ściana tworzą trójkąt $30°$, $60°$, $90°$, a drabina jest przeciwprostokątną.`,
                    `Odległość od ściany to krótsza przyprostokątna, czyli połowa przeciwprostokątnej: $${c}:2=${x}$ m.`,
                  ],
                };
              }
              return {
                tresc: `${trojkat} Przeciwprostokątna ma $${c}$ cm. Ile centymetrów ma krótsza przyprostokątna?`,
                pola: [pole("w", "Krótsza przyprostokątna (cm) $=$")],
                odpowiedz: { w: q(x) },
                wynik: `$${x}$ cm`,
                rozwiazanie: [wzor, `Przeciwprostokątna to $2x=${c}$, więc $x=${c}:2=${x}$ cm.`],
              };
            }
            if (tryb === 2) {
              return {
                tresc: `${trojkat} Krótsza przyprostokątna ma $${x}$ cm. Dłuższa przyprostokątna ma długość $k\\sqrt3$ cm. Podaj liczbę $k$.`,
                pola: [pole("w", "$k=$")],
                odpowiedz: { w: q(x) },
                wynik: `$${x}$`,
                rozwiazanie: [wzor, `Dłuższa przyprostokątna to $x\\sqrt3=${x}\\sqrt3$ cm.`, `Zatem $k=${x}$.`],
              };
            }
            const c = 2 * x;
            return {
              tresc: `${trojkat} Przeciwprostokątna ma $${c}$ cm. Dłuższa przyprostokątna ma długość $k\\sqrt3$ cm. Podaj liczbę $k$.`,
              pola: [pole("w", "$k=$")],
              odpowiedz: { w: q(x) },
              wynik: `$${x}$`,
              rozwiazanie: [
                wzor,
                `Przeciwprostokątna to $2x=${c}$, więc $x=${x}$ cm.`,
                `Dłuższa przyprostokątna to $x\\sqrt3=${x}\\sqrt3$ cm, czyli $k=${x}$.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
