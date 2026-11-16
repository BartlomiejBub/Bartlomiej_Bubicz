// Klasa 6 (szkoła podstawowa) · rozdział II „Działania na liczbach, cz. 1” – Matematyka z kluczem 6 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";   // tylko pomocnicze z wspolne.js

// --- Pomocnicze (tylko dla tego pliku)

/** Poprawna forma rzeczownika po liczbie: 1 minutę, 2 minuty, 5 minut. */
function mn(n, a, b, c) {
  const m10 = n % 10, m100 = n % 100;
  if (n === 1) return a;
  return m10 >= 2 && m10 <= 4 && !(m100 >= 12 && m100 <= 14) ? b : c;
}

const nwdf = (a, b) => { while (b) [a, b] = [b, a % b]; return a; };
const nwwf = (a, b) => (a / nwdf(a, b)) * b;

/** Liczba naturalna do tekstu: odstęp tysięcy dopiero od 5 cyfr, np. 12\,500. */
const fmtNat = (n) => (n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : String(n));

/** Ułamek dziesiętny z liczby setnych: 705 -> "7{,}05"; stala = zawsze dwa miejsca po przecinku. */
function fmtDec(x100, stala = false) {
  const c = Math.floor(x100 / 100), f = x100 % 100;
  if (stala) return `${c}{,}${String(f).padStart(2, "0")}`;
  if (f === 0) return `${c}`;
  if (f % 10 === 0) return `${c}{,}${f / 10}`;
  return `${c}{,}${String(f).padStart(2, "0")}`;
}

/** Ułamek dziesiętny z liczby tysięcznych: 625 -> "0{,}625"; stala = zawsze trzy miejsca. */
function fmtMilli(x, stala = false) {
  const c = Math.floor(x / 1000);
  let f = String(x % 1000).padStart(3, "0");
  if (!stala) f = f.replace(/0+$/, "");
  return f === "" ? `${c}` : `${c}{,}${f}`;
}

const fr = (n, d) => `\\frac{${n}}{${d}}`;
/** Liczba wymierna dodatnia jako ułamek, liczba mieszana albo liczba całkowita (LaTeX). */
const qm = (v) => (v.d === 1 ? `${v.n}` : v.n < v.d ? fr(v.n, v.d) : `${Math.floor(v.n / v.d)}${fr(v.n % v.d, v.d)}`);
const qf = (v) => (v.d === 1 ? `${v.n}` : fr(v.n, v.d));
const mt = (w, n, d) => `${w}${fr(n, d)}`;

const jeNie = (b) => (b ? "dzieli się" : "nie dzieli się");

function czynniki(n) {
  const f = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) while (m % p === 0) { f.push(p); m /= p; }
  if (m > 1) f.push(m);
  return f;
}
const cz = (f) => f.join(" \\cdot ");
const pierwsza = (n) => n >= 2 && czynniki(n).length === 1;

/** Czynniki wspólne dwóch rozkładów (z powtórzeniami) i czynniki drugiego, których brakuje w pierwszym. */
function wspolne(fa, fb) {
  const rest = [...fb];
  const w = [];
  for (const x of fa) {
    const i = rest.indexOf(x);
    if (i >= 0) { w.push(x); rest.splice(i, 1); }
  }
  return { w, brak: rest };
}
const iloczyn = (f) => f.reduce((a, b) => a * b, 1);

/** Kroki rozwiązania: NWD albo NWW dwóch liczb z rozkładu na czynniki pierwsze. */
function nwdNwwKroki(a, b, rodzaj) {
  const fa = czynniki(a), fb = czynniki(b);
  const opis = (n, f) => (f.length === 1 ? `Liczba $${n}$ jest pierwsza.` : `$${n} = ${cz(f)}$.`);
  const kr = [`Rozkładamy liczby na czynniki pierwsze. ${opis(a, fa)} ${opis(b, fb)}`];
  const { w, brak } = wspolne(fa, fb);
  if (rodzaj === "NWD") {
    const d = iloczyn(w);
    kr.push(w.length ? `Wybieramy czynniki wspólne dla obu liczb: $${cz(w)}$. Zatem NWD $= ${d}$.` : `Liczby nie mają wspólnych czynników, więc NWD $= 1$.`);
    kr.push(`Sprawdzenie: $${a} : ${d} = ${a / d}$ oraz $${b} : ${d} = ${b / d}$.`);
    return { kr, wynik: d };
  }
  const nww = a * iloczyn(brak);
  kr.push(
    brak.length
      ? `Bierzemy czynniki liczby $${a}$ i dopisujemy te czynniki liczby $${b}$, których brakuje: $${cz(fa)}$ oraz $${cz(brak)}$. Zatem NWW $= ${cz([...fa, ...brak])} = ${nww}$.`
      : `Wszystkie czynniki liczby $${b}$ są już w rozkładzie liczby $${a}$, więc NWW $= ${a}$.`,
  );
  kr.push(`Sprawdzenie: $${nww} : ${a} = ${nww / a}$ oraz $${nww} : ${b} = ${nww / b}$.`);
  return { kr, wynik: nww };
}

/** Dwie liczby o zadanym NWD = g (g · m i g · n, gdzie m i n są względnie pierwsze i różne). */
function paraZNwd(r, gMin, gMax, mnMax, maks) {
  for (;;) {
    const g = r.int(gMin, gMax), m = r.int(1, mnMax), n = r.int(1, mnMax);
    if (m === n || nwdf(m, n) !== 1) continue;
    if (g * m > maks || g * n > maks || g * m < 6 || g * n < 6) continue;
    return [g * m, g * n, g];
  }
}

const DEN = [2, 3, 4, 5, 6, 8, 9, 10, 12];

/** Kroki dodawania albo odejmowania dwóch ułamków właściwych a = [n1, d1], b = [n2, d2]. */
function ulKroki(a, b, op) {
  const [n1, d1] = a, [n2, d2] = b;
  const L = nwwf(d1, d2);
  const e1 = n1 * (L / d1), e2 = n2 * (L / d2);
  const x = op === "+" ? e1 + e2 : e1 - e2;
  const kr = [];
  if (d1 === d2) kr.push(`Mianowniki są takie same, więc działamy na licznikach.`);
  else kr.push(`Wspólny mianownik to $${L}$ (NWW liczb $${d1}$ i $${d2}$). Rozszerzamy: $${fr(n1, d1)} ${op} ${fr(n2, d2)} = ${fr(e1, L)} ${op} ${fr(e2, L)}$.`);
  kr.push(`${op === "+" ? "Dodajemy" : "Odejmujemy"} liczniki, a mianownik zostaje: $${e1} ${op} ${e2} = ${x}$, czyli $${fr(x, L)}$.`);
  const res = q(x, L);
  const chain = [fr(x, L)];
  const red = res.d === 1 ? `${res.n}` : fr(res.n, res.d);
  if (red !== chain[0]) chain.push(red);
  const mixed = qm(res);
  if (mixed !== chain[chain.length - 1]) chain.push(mixed);
  if (chain.length > 1) kr.push(`Upraszczamy wynik: $${chain.join(" = ")}$.`);
  return { kr, res };
}

const razem = (W, res, total) => (W > 0 ? `Razem: $${W} + ${qm(res)} = ${qm(total)}$.` : `Wynik: $${qm(total)}$.`);

export default {
  tematy: [
    // ------------------------------------------------------------------------------------------------
    {
      id: "zadania-tekstowe",
      nazwa: "Sposoby na zadania tekstowe i kalkulator",
      sciaga: [
        {
          nazwa: "Plan rozwiązania zadania",
          slownie: "Przeczytaj zadanie dwa razy. Zapisz, co wiesz i o co pytają. Wybierz działania, policz i na końcu sprawdź, czy wynik ma sens. Odpowiedź napisz pełnym zdaniem, z jednostką.",
          przyklad: "Kasia kupiła $3$ zeszyty po $4$ zł i długopis za $2$ zł. Zapłaciła $20$ zł. Ile dostała reszty? Zeszyty: $3 \\cdot 4 = 12$ zł. Razem z długopisem: $12 + 2 = 14$ zł. Reszta: $20 - 14 = 6$ zł. Odpowiedź: Kasia dostała $6$ zł reszty.",
          uwaga: "Nie podawaj samej liczby. Napisz, czego dotyczy, np. „$6$ zł reszty”.",
        },
        {
          nazwa: "Rysunek pomaga",
          slownie: "Gdy w zadaniu są liczby „więcej o…” albo „razem…”, narysuj odcinki, które pokazują ilości. Z rysunku widać, co trzeba dodać, a co odjąć.",
          przyklad: "Na dwóch półkach jest razem $30$ książek. Na pierwszej jest o $6$ więcej niż na drugiej. Rysujemy dwa odcinki, pierwszy dłuższy o $6$. Gdy odejmiemy te $6$ książek, odcinki będą równe: $30 - 6 = 24$. Na drugiej półce jest $24 : 2 = 12$ książek, a na pierwszej $12 + 6 = 18$.",
          uwaga: "Pamiętaj o sprawdzeniu: $12 + 18 = 30$ i $18 - 12 = 6$. Dopiero wtedy wynik jest pewny.",
        },
        {
          nazwa: "Tabela porządkuje dane",
          slownie: "Gdy w zadaniu jest kilka rzeczy, każda z liczbą sztuk i ceną, zapisz dane w tabelce: co, ile, po ile, razem. Potem dodaj kolumnę „razem”.",
          przyklad: "Kupiono $2$ bilety normalne po $12$ zł i $3$ ulgowe po $7$ zł. Normalne: $2$ szt., po $12$ zł, razem $24$ zł. Ulgowe: $3$ szt., po $7$ zł, razem $21$ zł. Za wszystkie bilety zapłacono $24 + 21 = 45$ zł.",
          uwaga: "Nie mnóż liczby sztuk przez liczbę sztuk innych rzeczy. Mnóż liczbę sztuk przez cenę tej samej rzeczy.",
        },
        {
          nazwa: "Liczymy od końca",
          slownie: "Gdy znamy wynik, a nie znamy początku, cofamy się. Wykonujemy działania odwrotne, od ostatniego do pierwszego: dodawanie cofamy odejmowaniem, a mnożenie dzieleniem.",
          tex: "+\\ \\leftrightarrow\\ -\\qquad \\cdot\\ \\leftrightarrow\\ :",
          przyklad: "Pewną liczbę pomnożono przez $3$ i dodano $5$. Wyszło $23$. Cofamy: $23 - 5 = 18$, potem $18 : 3 = 6$. Sprawdzenie: $6 \\cdot 3 + 5 = 23$.",
          uwaga: "Cofając się, zmieniaj kolejność. Ostatnie działanie cofamy jako pierwsze.",
        },
        {
          nazwa: "Rozsądne użycie kalkulatora",
          slownie: "Kalkulator liczy dokładnie to, co w niego wpiszesz. Zanim go użyjesz, oszacuj wynik w głowie (zaokrąglij liczby). Potem porównaj wynik z oszacowaniem. Jeśli bardzo się różnią, coś zostało źle wpisane.",
          przyklad: "$48 \\cdot 19$: szacujemy $50 \\cdot 20 = 1000$. Kalkulator pokazuje $912$, czyli wynik jest blisko $1000$ i prawdopodobnie dobry. Wynik $91{,}2$ albo $9120$ byłby podejrzany: źle wpisano liczbę albo przecinek.",
          uwaga: "Kalkulator nie sprawdzi, czy wybrano dobre działanie. Zawsze zastanów się, czy wynik pasuje do zadania.",
        },
      ],
      jak: [
        "Przeczytaj zadanie i zapisz, co jest dane i czego szukamy.",
        "Narysuj odcinki albo zrób tabelkę. Gdy znasz wynik końcowy, licz od końca.",
        "Wykonaj działania krok po kroku. Przy kalkulatorze najpierw oszacuj wynik.",
        "Sprawdź, czy wynik pasuje do treści, i napisz odpowiedź pełnym zdaniem.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Ola i Ewa mają razem $50$ zł. Ola ma o $10$ zł więcej niż Ewa. Ile złotych ma Ewa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$30$ zł", "$20$ zł", "$25$ zł", "$40$ zł"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Na festynie sprzedano $12$ kubków soku po $3$ zł i $8$ ciastek po $2$ zł. Ile złotych zebrano? **Wybierz właściwą odpowiedź.**",
          opcje: ["$25$ zł", "$100$ zł", "$52$ zł", "$44$ zł"],
          poprawna: 2,
        },
        {
          nr: "3",
          tresc: "Pewną liczbę pomnożono przez $4$, a potem od wyniku odjęto $7$. Otrzymano $29$. Jaka to liczba? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$", "$22$", "$36$", "$33$"],
          poprawna: 0,
        },
        {
          nr: "4",
          tresc: "Który szacunek najlepiej nadaje się do sprawdzenia wyniku działania $398 \\cdot 21$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$400 \\cdot 2 = 800$", "$40 \\cdot 20 = 800$", "$300 \\cdot 20 = 6000$", "$400 \\cdot 20 = 8000$"],
          poprawna: 3,
        },
        {
          nr: "5",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wynik $48 \\cdot 19$ powinien być blisko $1000$, bo $50 \\cdot 20 = 1000$.", litery: "PF", poprawna: 0 },
            { tekst: "Żeby cofnąć dodawanie liczby $5$, trzeba jeszcze raz dodać $5$.", litery: "PF", poprawna: 1 },
            { tekst: "Kalkulator pokazał $23 \\cdot 41 = 94{,}3$. Taki wynik jest sensowny.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Tomek miał w skarbonce pewną kwotę. Dołożył do niej $25$ zł, a potem wydał połowę wszystkich pieniędzy ze skarbonki. Zostało mu $40$ zł. Ile złotych było w skarbonce na początku? **Zapisz obliczenia.**",
          rozwiazanie: "Liczymy od końca. Po wydaniu połowy zostało $40$ zł, więc przed wydaniem było dwa razy tyle: $40 \\cdot 2 = 80$ zł.\n\nTyle było po dołożeniu $25$ zł. Cofamy dodawanie: $80 - 25 = 55$ zł.\n\nSprawdzenie: $55 + 25 = 80$, a połowa z $80$ to $40$.\n\nOdpowiedź: Na początku w skarbonce było $55$ zł.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Ania, Kuba i Marta mają razem $76$ zł. Kuba ma o $12$ zł więcej niż Ania, a Marta ma dwa razy tyle co Ania. Ile pieniędzy ma każde z nich? **Zapisz obliczenia.**",
          rozwiazanie: "Rysujemy odcinki: Ania to jeden odcinek, Kuba to jeden odcinek i jeszcze $12$ zł, Marta to dwa odcinki. Razem jest $4$ równe odcinki i $12$ zł.\n\nOdejmujemy $12$ zł: $76 - 12 = 64$. Cztery odcinki to $64$ zł, więc jeden to $64 : 4 = 16$ zł.\n\nAnia ma $16$ zł, Kuba $16 + 12 = 28$ zł, Marta $2 \\cdot 16 = 32$ zł. Sprawdzenie: $16 + 28 + 32 = 76$.\n\nOdpowiedź: Ania ma $16$ zł, Kuba $28$ zł, a Marta $32$ zł.",
        },
      ],
      generatory: [
        {
          id: "od-konca",
          nazwa: "Liczymy od końca",
          opis: "Pewną liczbę poddano dwóm lub trzem działaniom i znamy wynik. Znajdź liczbę, cofając działania.",
          generuj(r) {
            const ile = r.pick([2, 2, 3]);
            const n = r.int(2, 30);
            const ops = [];
            let cur = n;
            while (ops.length < ile) {
              const t = r.pick(["mn", "dod", "ode", "dziel"]);
              if (ops.length && ops[ops.length - 1].t === t) continue;
              if (t === "mn") {
                const k = r.int(2, 9);
                if (cur * k > 400) continue;
                ops.push({ t, k }); cur *= k;
              } else if (t === "dod") {
                const k = r.int(2, 40);
                ops.push({ t, k }); cur += k;
              } else if (t === "ode") {
                const k = r.int(2, 40);
                if (cur - k < 1) continue;
                ops.push({ t, k }); cur -= k;
              } else {
                const ds = [2, 3, 4, 5, 6, 7, 8, 9].filter((d) => cur % d === 0);
                if (!ds.length) continue;
                const k = r.pick(ds);
                ops.push({ t, k }); cur /= k;
              }
            }
            const fraza = (o) => (o.t === "mn" ? `pomnożono przez $${o.k}$` : o.t === "dod" ? `dodano $${o.k}$` : o.t === "ode" ? `odjęto $${o.k}$` : `podzielono przez $${o.k}$`);
            const kroki = [];
            let v = cur;
            for (let i = ops.length - 1; i >= 0; i--) {
              const o = ops[i];
              if (o.t === "mn") { kroki.push(`Cofamy mnożenie przez $${o.k}$, czyli dzielimy: $${v} : ${o.k} = ${v / o.k}$.`); v /= o.k; }
              else if (o.t === "dod") { kroki.push(`Cofamy dodawanie liczby $${o.k}$, czyli odejmujemy: $${v} - ${o.k} = ${v - o.k}$.`); v -= o.k; }
              else if (o.t === "ode") { kroki.push(`Cofamy odejmowanie liczby $${o.k}$, czyli dodajemy: $${v} + ${o.k} = ${v + o.k}$.`); v += o.k; }
              else { kroki.push(`Cofamy dzielenie przez $${o.k}$, czyli mnożymy: $${v} \\cdot ${o.k} = ${v * o.k}$.`); v *= o.k; }
            }
            kroki.push(`Szukana liczba to $${n}$. Po wykonaniu wszystkich działań na tej liczbie dostajemy $${cur}$.`);
            return {
              tresc: `Na pewnej liczbie naturalnej wykonano kolejno działania: ${ops.map(fraza).join(", potem ")}. Otrzymano $${cur}$. Jaka to liczba?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Szukana liczba" }],
              odpowiedz: { w: n },
              wynik: `$${n}$`,
              rozwiazanie: kroki,
            };
          },
        },
        {
          id: "szacowanie",
          nazwa: "Sensowny wynik",
          opis: "Oszacuj iloczyn dwóch liczb dwucyfrowych i wskaż wynik, który ma sens (jeden jest dobry, pozostałe mają źle wpisany przecinek).",
          generuj(r) {
            const a = r.int(12, 49), b = r.int(12, 49);
            const p = a * b;
            const zaok = (x) => Math.round(x / 10) * 10;
            const A = zaok(a), B = zaok(b);
            const opcje = [`$${fmtDec(p * 10)}$`, `$${fmtNat(p)}$`, `$${fmtNat(p * 10)}$`, `$${fmtDec(p)}$`];
            const kol = r.shuffle([0, 1, 2, 3]);
            const lista = kol.map((i) => opcje[i]);
            return {
              tresc: `Przed użyciem kalkulatora oszacuj wynik działania $${a} \\cdot ${b}$. Który wynik na kalkulatorze ma sens?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Wynik", opcje: lista }],
              odpowiedz: { w: kol.indexOf(1) },
              wynik: `$${fmtNat(p)}$`,
              rozwiazanie: [
                `Zaokrąglamy czynniki do dziesiątek: $${a} \\approx ${A}$ i $${b} \\approx ${B}$.`,
                `Szacujemy: $${A} \\cdot ${B} = ${fmtNat(A * B)}$. Wynik ma być blisko tej liczby.`,
                `Tylko $${fmtNat(p)}$ jest blisko $${fmtNat(A * B)}$. Pozostałe są $10$ albo $100$ razy za małe lub za duże.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "liczby-naturalne",
      nazwa: "Liczby naturalne",
      sciaga: [
        {
          nazwa: "Zapis liczby i jej rzędy",
          slownie: "Liczbę zapisujemy cyframi od $0$ do $9$. Wartość cyfry zależy od miejsca: jedności, dziesiątki, setki, tysiące. Duże liczby (od pięciu cyfr) zapisujemy z odstępami po trzy cyfry.",
          tex: "5207=5000+200+0+7",
          przyklad: "W liczbie $5207$ cyfra $2$ stoi na miejscu setek, więc oznacza $200$. Zero na miejscu dziesiątek oznacza, że dziesiątek nie ma. Liczbę $12500$ zapisujemy $12\\,500$.",
          uwaga: "Zero też ma znaczenie. Liczby $5207$ i $527$ są różne.",
        },
        {
          nazwa: "Porównywanie liczb naturalnych",
          slownie: "Większa jest liczba, która ma więcej cyfr. Gdy cyfr jest tyle samo, porównujemy cyfry od lewej strony, aż trafimy na różne.",
          tex: "987<1002\\qquad 4805<4850",
          przyklad: "W liczbach $4805$ i $4850$ pierwsze dwie cyfry są takie same ($4$ i $8$). Na miejscu dziesiątek jest $0$ i $5$, a $0<5$, więc $4805<4850$.",
          uwaga: "Nie porównuj od prawej strony. Liczba $1002$ jest większa od $987$, mimo że kończy się cyfrą $2$.",
        },
        {
          nazwa: "Cechy podzielności",
          slownie: "Przez $2$ dzielą się liczby, które kończą się cyfrą parzystą. Przez $5$ te, które kończą się na $0$ lub $5$, a przez $10$ te, które kończą się na $0$. Przez $3$ dzieli się liczba, której suma cyfr dzieli się przez $3$. Przez $9$ podobnie: suma cyfr dzieli się przez $9$. Przez $4$ dzieli się liczba, której dwie ostatnie cyfry tworzą liczbę podzielną przez $4$.",
          przyklad: "Liczba $2358$: kończy się na $8$, więc dzieli się przez $2$. Suma cyfr to $2 + 3 + 5 + 8 = 18$, więc dzieli się przez $3$ i przez $9$. Nie dzieli się przez $5$ i $10$. Przez $4$ też nie, bo $58$ nie dzieli się przez $4$.",
          uwaga: "Przy cechach $3$ i $9$ dodajemy wszystkie cyfry, a nie tylko ostatnią.",
        },
        {
          nazwa: "Liczby pierwsze i złożone",
          slownie: "Liczba pierwsza ma dokładnie dwa dzielniki: $1$ i samą siebie. Liczba złożona ma dzielników więcej. Liczba $1$ nie jest ani pierwsza, ani złożona.",
          tex: "2,3,5,7,11,13,17,\\ldots",
          przyklad: "Liczba $17$ jest pierwsza (dzieli się tylko przez $1$ i $17$). Liczba $15$ jest złożona (dzieli się przez $1$, $3$, $5$, $15$). Liczba $91$ jest złożona, bo $91 = 7 \\cdot 13$.",
          uwaga: "Liczba $2$ jest pierwsza i jest jedyną parzystą liczbą pierwszą. Liczba $1$ pierwsza nie jest.",
        },
        {
          nazwa: "Rozkład na czynniki pierwsze",
          slownie: "Dzielimy liczbę przez kolejne liczby pierwsze: $2$, $3$, $5$, $7$, … Gdy któraś dzieli liczbę, zapisujemy ją i dzielimy dalej. Kończymy, gdy dostaniemy $1$. Potem mnożymy wszystkie zapisane liczby.",
          tex: "180=2\\cdot2\\cdot3\\cdot3\\cdot5",
          przyklad: "$180 : 2 = 90$, $90 : 2 = 45$, $45 : 3 = 15$, $15 : 3 = 5$, $5 : 5 = 1$. Zatem $180 = 2 \\cdot 2 \\cdot 3 \\cdot 3 \\cdot 5$.",
          uwaga: "Wszystkie czynniki muszą być pierwsze. Zapis $4 \\cdot 45$ nie jest jeszcze rozkładem na czynniki pierwsze.",
        },
      ],
      jak: [
        "Czy liczba kończy się $0$, $5$ albo cyfrą parzystą? To od razu mówi o podzielności przez $10$, $5$ i $2$.",
        "Dla $3$ i $9$ policz sumę wszystkich cyfr.",
        "Aby sprawdzić, czy liczba jest pierwsza, szukaj dzielnika wśród małych liczb pierwszych ($2$, $3$, $5$, $7$, …).",
        "Rozkład na czynniki pierwsze: dziel przez kolejne liczby pierwsze, aż dostaniesz $1$, i zapisz iloczyn.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Która z liczb jest podzielna przez $9$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7428$", "$4563$", "$2540$", "$1236$"],
          poprawna: 1,
        },
        {
          nr: "9",
          tresc: "Ile liczb pierwszych jest wśród liczb $1$, $9$, $13$, $21$, $29$, $33$, $37$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$5$", "$3$", "$2$"],
          poprawna: 2,
        },
        {
          nr: "10",
          tresc: "Jaka cyfra stoi na miejscu setek w liczbie $70\\,641$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$0$", "$4$", "$6$"],
          poprawna: 3,
        },
        {
          nr: "11",
          tresc: "Który zapis jest rozkładem liczby $84$ na czynniki pierwsze? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2 \\cdot 2 \\cdot 3 \\cdot 7$", "$4 \\cdot 3 \\cdot 7$", "$2 \\cdot 6 \\cdot 7$", "$2 \\cdot 2 \\cdot 21$"],
          poprawna: 0,
        },
        {
          nr: "12",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Liczba $1$ jest liczbą pierwszą.", litery: "PF", poprawna: 1 },
            { tekst: "Liczba $135$ jest podzielna przez $5$ i przez $9$.", litery: "PF", poprawna: 0 },
            { tekst: "Liczba $91$ jest liczbą pierwszą.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Trzycyfrowa liczba zaczyna się od cyfr $4$ i $5$. Trzeba dopisać na końcu jedną cyfrę. Jakie cyfry można dopisać, żeby liczba była podzielna przez $3$? Które z nich dadzą liczbę podzielną przez $6$? **Zapisz obliczenia.**",
          rozwiazanie: "Suma pierwszych dwóch cyfr to $4 + 5 = 9$. Cała suma cyfr ma dzielić się przez $3$, więc dopisana cyfra $c$ musi dawać $9 + c$ podzielne przez $3$.\n\nSą to cyfry $0$, $3$, $6$ i $9$. Liczby: $450$, $453$, $456$, $459$.\n\nLiczba dzieli się przez $6$, gdy dzieli się przez $2$ i przez $3$. Musi więc kończyć się cyfrą parzystą: to $450$ i $456$.\n\nOdpowiedź: Można dopisać $0$, $3$, $6$ albo $9$. Podzielne przez $6$ są liczby $450$ i $456$.",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "Rozłóż liczbę $252$ na czynniki pierwsze. Zapisz kolejne dzielenia i sprawdź wynik mnożeniem. **Zapisz obliczenia.**",
          rozwiazanie: "Dzielimy przez kolejne liczby pierwsze: $252 : 2 = 126$, $126 : 2 = 63$.\n\nLiczba $63$ nie dzieli się przez $2$. Dzielimy przez $3$: $63 : 3 = 21$, $21 : 3 = 7$.\n\nOstatnia liczba jest pierwsza: $7 : 7 = 1$.\n\nZatem $252 = 2 \\cdot 2 \\cdot 3 \\cdot 3 \\cdot 7$. Sprawdzenie: $4 \\cdot 9 = 36$, a $36 \\cdot 7 = 252$.\n\nOdpowiedź: $252 = 2 \\cdot 2 \\cdot 3 \\cdot 3 \\cdot 7$.",
        },
      ],
      generatory: [
        {
          id: "podzielnosc",
          nazwa: "Cechy podzielności",
          opis: "Policz, przez ile z liczb $2$, $3$, $5$, $9$, $10$ dzieli się dana liczba, albo znajdź brakującą cyfrę.",
          generuj(r) {
            if (r.chance(0.55)) {
              let n = r.int(100, 9999);
              if (r.chance(0.5)) {
                const m = r.pick([3, 5, 6, 9, 10, 15, 18, 30, 45]);
                n = m * r.int(Math.ceil(100 / m), Math.floor(9999 / m));
              }
              const cyfry = String(n).split("").map(Number);
              const c = cyfry[cyfry.length - 1];
              const s = cyfry.reduce((x, y) => x + y, 0);
              const ok = { 2: c % 2 === 0, 3: s % 3 === 0, 5: c % 5 === 0, 9: s % 9 === 0, 10: c === 0 };
              const dobre = [2, 3, 5, 9, 10].filter((d) => ok[d]);
              return {
                tresc: `Ile spośród liczb $2$, $3$, $5$, $9$ i $10$ jest dzielnikami liczby $${n}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Ile dzielników" }],
                odpowiedz: { w: dobre.length },
                wynik: `$${dobre.length}$`,
                rozwiazanie: [
                  `Ostatnia cyfra to $${c}$. Przez $2$ ${jeNie(ok[2])}, przez $5$ ${jeNie(ok[5])}, przez $10$ ${jeNie(ok[10])}.`,
                  `Suma cyfr: $${cyfry.join(" + ")} = ${s}$. Przez $3$ ${jeNie(ok[3])}, przez $9$ ${jeNie(ok[9])}.`,
                  dobre.length ? `Liczba $${n}$ dzieli się przez: ${dobre.map((d) => `$${d}$`).join(", ")}. Jest ich $${dobre.length}$.` : `Żadna z tych liczb nie jest dzielnikiem, więc odpowiedź to $0$.`,
                ],
              };
            }
            const dl = r.pick([3, 4]);
            const dig = Array.from({ length: dl }, (_, i) => (i === 0 ? r.int(1, 9) : r.int(0, 9)));
            const poz = r.int(1, dl - 1);
            const d = r.pick([3, 9]);
            const znane = dig.filter((_, i) => i !== poz);
            const s = znane.reduce((x, y) => x + y, 0);
            let x = 0;
            while ((s + x) % d !== 0) x++;
            const tekst = dig.map((v, i) => (i === poz ? "\\square " : String(v))).join("");
            return {
              tresc: `Jaka jest najmniejsza cyfra, którą można wpisać w miejsce $\\square$ w liczbie $${tekst}$, aby liczba była podzielna przez $${d}$?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Cyfra" }],
              odpowiedz: { w: x },
              wynik: `$${x}$`,
              rozwiazanie: [
                `Suma pozostałych cyfr: $${znane.join(" + ")} = ${s}$.`,
                `Cała suma cyfr ma dzielić się przez $${d}$.`,
                x === 0 ? `Suma $${s}$ już dzieli się przez $${d}$, więc najmniejsza cyfra to $0$.` : `Najmniejsza cyfra to $${x}$, bo $${s} + ${x} = ${s + x}$ dzieli się przez $${d}$.`,
              ],
            };
          },
        },
        {
          id: "czynniki-pierwsze",
          nazwa: "Czynniki pierwsze",
          opis: "Rozłóż liczbę na czynniki pierwsze i podaj największy czynnik, policz czynniki albo policz liczby pierwsze w przedziale.",
          generuj(r) {
            const wariant = r.int(0, 2);
            if (wariant === 2) {
              const a = r.int(1, 50);
              const b = a + r.int(12, 25);
              const lista = [];
              for (let k = a + 1; k < b; k++) if (pierwsza(k)) lista.push(k);
              return {
                tresc: `Ile jest liczb pierwszych większych od $${a}$ i mniejszych od $${b}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Ile liczb pierwszych" }],
                odpowiedz: { w: lista.length },
                wynik: `$${lista.length}$`,
                rozwiazanie: [
                  `Sprawdzamy kolejne liczby od $${a + 1}$ do $${b - 1}$. Liczba pierwsza dzieli się tylko przez $1$ i przez siebie.`,
                  lista.length ? `Liczby pierwsze w tym przedziale: ${lista.map((x) => `$${x}$`).join(", ")}.` : `W tym przedziale nie ma liczb pierwszych.`,
                  `Jest ich $${lista.length}$.`,
                ],
              };
            }
            const male = [2, 2, 2, 3, 3, 5, 7, 11, 13];
            let f;
            for (;;) {
              f = Array.from({ length: r.int(3, 4) }, () => r.pick(male)).sort((x, y) => x - y);
              const n = iloczyn(f);
              if (n >= 30 && n <= 999) break;
            }
            const n = iloczyn(f);
            const dzielenia = [];
            let v = n;
            for (const p of f) { dzielenia.push(`$${v} : ${p} = ${v / p}$`); v /= p; }
            const najw = f[f.length - 1];
            return {
              tresc: wariant === 0 ? `Rozłóż liczbę $${n}$ na czynniki pierwsze. Który czynnik pierwszy jest największy?` : `Rozłóż liczbę $${n}$ na czynniki pierwsze. Ile czynników ma ten rozkład (licząc każdy tyle razy, ile razy się powtarza)?`,
              pola: [{ id: "w", typ: "liczba", etykieta: wariant === 0 ? "Największy czynnik" : "Liczba czynników" }],
              odpowiedz: { w: wariant === 0 ? najw : f.length },
              wynik: `$${wariant === 0 ? najw : f.length}$`,
              rozwiazanie: [
                `Dzielimy przez kolejne liczby pierwsze: ${dzielenia.join(", ")}.`,
                `Zatem $${n} = ${cz(f)}$.`,
                wariant === 0 ? `Największy czynnik pierwszy to $${najw}$.` : `W rozkładzie jest $${f.length}$ ${mn(f.length, "czynnik", "czynniki", "czynników")}.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "dzielniki-wielokrotnosci",
      nazwa: "Dzielniki i wielokrotności",
      sciaga: [
        {
          nazwa: "Dzielniki liczby",
          slownie: "Dzielnik liczby to liczba, przez którą dzielimy ją bez reszty. Szukamy ich parami: sprawdzamy kolejno $1$, $2$, $3$, … i do każdego dzielnika zapisujemy jego parę.",
          tex: "12=1\\cdot12=2\\cdot6=3\\cdot4",
          przyklad: "Dzielniki liczby $30$: $30 = 1 \\cdot 30 = 2 \\cdot 15 = 3 \\cdot 10 = 5 \\cdot 6$. Czyli $1$, $2$, $3$, $5$, $6$, $10$, $15$, $30$. Jest ich $8$.",
          uwaga: "Dzielnikami są zawsze $1$ i sama liczba. Nie zapomnij o większych liczbach z każdej pary.",
        },
        {
          nazwa: "Wielokrotności liczby",
          slownie: "Wielokrotności liczby dostajemy, mnożąc ją przez kolejne liczby naturalne: $1$, $2$, $3$, … Każda wielokrotność dzieli się przez tę liczbę.",
          tex: "7,\\,14,\\,21,\\,28,\\,35,\\,\\ldots",
          przyklad: "Wielokrotności liczby $7$ to $7$, $14$, $21$, $28$, $35$. Czy $50$ jest wielokrotnością $7$? Nie, bo $50 : 7 = 7$ i zostaje reszta $1$.",
          uwaga: "Dzielników liczby jest mało, a wielokrotności są nieskończenie liczne i rosną bez końca.",
        },
        {
          nazwa: "NWD – największy wspólny dzielnik",
          slownie: "NWD dwóch liczb to największa liczba, przez którą dzielą się obie. Rozkładamy obie liczby na czynniki pierwsze i mnożymy czynniki wspólne.",
          tex: "\\text{NWD}(36,\\,48)=12",
          przyklad: "$36 = 2 \\cdot 2 \\cdot 3 \\cdot 3$ i $48 = 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 3$. Wspólne czynniki: $2 \\cdot 2 \\cdot 3 = 12$. Sprawdzenie: $36 : 12 = 3$ i $48 : 12 = 4$.",
          uwaga: "Bierzemy tylko czynniki wspólne, każdy tyle razy, ile razy występuje w obu liczbach. Nie mnóż wszystkich czynników.",
        },
        {
          nazwa: "NWW – najmniejsza wspólna wielokrotność",
          slownie: "NWW dwóch liczb to najmniejsza liczba, która dzieli się przez obie. Z rozkładu: bierzemy czynniki pierwszej liczby i dopisujemy z drugiej tylko te, których brakuje.",
          tex: "\\text{NWW}(12,\\,18)=36",
          przyklad: "$12 = 2 \\cdot 2 \\cdot 3$ i $18 = 2 \\cdot 3 \\cdot 3$. Z $12$ bierzemy $2 \\cdot 2 \\cdot 3$. Z $18$ brakuje jednej trójki. Zatem $2 \\cdot 2 \\cdot 3 \\cdot 3 = 36$. Sprawdzenie: $36 : 12 = 3$ i $36 : 18 = 2$.",
          uwaga: "NWW nigdy nie jest mniejsze od większej z liczb. Dobre sprawdzenie: $\\text{NWD} \\cdot \\text{NWW} = a \\cdot b$, np. $6 \\cdot 36 = 12 \\cdot 18$.",
        },
        {
          nazwa: "Zadania z NWD i NWW",
          slownie: "NWD pasuje, gdy coś dzielimy na jak największe jednakowe części bez reszty. NWW pasuje, gdy pytamy, kiedy dwa powtarzające się zdarzenia znów zdarzą się razem.",
          przyklad: "Autobusy jeżdżą co $12$ i co $18$ minut i właśnie odjechały razem. Znów odjadą razem po $\\text{NWW}(12, 18) = 36$ minutach. Wstążki $36$ cm i $48$ cm tniemy na najdłuższe jednakowe kawałki: $\\text{NWD}(36, 48) = 12$, więc kawałek ma $12$ cm.",
          uwaga: "Pytanie „kiedy znów razem?” to NWW. Pytanie „na jak największe równe części?” to NWD.",
        },
      ],
      jak: [
        "Dzielniki szukaj parami: $1 \\cdot n$, $2 \\cdot \\ldots$, $3 \\cdot \\ldots$, aż pary się powtórzą.",
        "Rozłóż obie liczby na czynniki pierwsze i zapisz je jedna pod drugą.",
        "NWD: pomnóż czynniki wspólne. NWW: czynniki pierwszej liczby i brakujące z drugiej.",
        "W zadaniu tekstowym ustal, czy chodzi o dzielenie na części (NWD), czy o wspólne spotkanie (NWW).",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Ile dzielników ma liczba $18$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$5$", "$6$", "$9$"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Liczba $7$ jest dzielnikiem liczby $91$.", litery: "PF", poprawna: 0 },
            { tekst: "Liczba $36$ jest wielokrotnością liczby $8$.", litery: "PF", poprawna: 1 },
            { tekst: "$\\text{NWD}(9, 14) = 1$", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "17",
          tresc: "Ile wynosi największy wspólny dzielnik liczb $24$ i $60$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$24$", "$120$", "$12$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "Ile wynosi najmniejsza wspólna wielokrotność liczb $8$ i $12$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$24$", "$48$", "$96$"],
          poprawna: 1,
        },
        {
          nr: "19",
          tresc: "Ania chodzi na basen co $4$ dni, a Bartek co $6$ dni. Dziś oboje byli na basenie. Po ilu dniach znów spotkają się na basenie? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$", "$2$", "$10$", "$24$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Rozłóż liczby $84$ i $126$ na czynniki pierwsze. Na tej podstawie oblicz ich NWD i NWW. **Zapisz obliczenia.**",
          rozwiazanie: "Rozkłady: $84 = 2 \\cdot 2 \\cdot 3 \\cdot 7$ oraz $126 = 2 \\cdot 3 \\cdot 3 \\cdot 7$.\n\nNWD to iloczyn czynników wspólnych: $2 \\cdot 3 \\cdot 7 = 42$.\n\nNWW: bierzemy czynniki liczby $84$ i dopisujemy brakującą trójkę z $126$: $2 \\cdot 2 \\cdot 3 \\cdot 7 \\cdot 3 = 252$.\n\nSprawdzenie: $42 \\cdot 252 = 10\\,584$ i $84 \\cdot 126 = 10\\,584$.\n\nOdpowiedź: NWD $= 42$, NWW $= 252$.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Kasia ma $48$ czerwonych i $72$ niebieskie koraliki. Chce zrobić jak najwięcej jednakowych bransoletek, wykorzystując wszystkie koraliki. Ile bransoletek zrobi? Ile koralików każdego koloru będzie w jednej bransoletce? **Zapisz obliczenia.**",
          rozwiazanie: "Liczba bransoletek ma dzielić $48$ i $72$, a ma być jak największa. Szukamy więc NWD.\n\n$48 = 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 3$ oraz $72 = 2 \\cdot 2 \\cdot 2 \\cdot 3 \\cdot 3$. Wspólne czynniki: $2 \\cdot 2 \\cdot 2 \\cdot 3 = 24$.\n\nCzerwonych koralików w jednej bransoletce: $48 : 24 = 2$. Niebieskich: $72 : 24 = 3$.\n\nOdpowiedź: Kasia zrobi $24$ bransoletki, w każdej będą $2$ czerwone i $3$ niebieskie koraliki.",
        },
      ],
      generatory: [
        {
          id: "nwd-nww",
          nazwa: "NWD i NWW liczb",
          opis: "Oblicz NWD albo NWW dwóch liczb (do trzech cyfr), rozkładając je na czynniki pierwsze.",
          generuj(r) {
            const [a, b] = paraZNwd(r, 2, 15, 12, 999).slice(0, 2);
            const rodzaj = r.chance(0.5) ? "NWD" : "NWW";
            const { kr, wynik } = nwdNwwKroki(a, b, rodzaj);
            return {
              tresc: r.pick([`Oblicz $\\text{${rodzaj}}(${a}, ${b})$.`, `Ile wynosi $\\text{${rodzaj}}(${a}, ${b})$?`, `Podaj ${rodzaj === "NWD" ? "największy wspólny dzielnik" : "najmniejszą wspólną wielokrotność"} liczb $${a}$ i $${b}$.`]),
              pola: [{ id: "w", typ: "liczba", etykieta: rodzaj }],
              odpowiedz: { w: wynik },
              wynik: `$${wynik}$`,
              rozwiazanie: kr,
            };
          },
        },
        {
          id: "dzielniki-zadania",
          nazwa: "Dzielniki i zadania",
          opis: "Policz dzielniki liczby albo wielokrotności w przedziale, albo rozwiąż zadanie z autobusami, wstążkami lub koralikami (NWW i NWD).",
          generuj(r) {
            const t = r.int(0, 3);
            if (t === 0) {
              const n = r.pick([12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 50, 54, 60, 64, 72, 80, 84, 90, 96, 100]);
              const pary = [];
              const dz = [];
              for (let i = 1; i * i <= n; i++) {
                if (n % i === 0) {
                  pary.push(i * i === n ? `$${i} \\cdot ${i}$` : `$${i} \\cdot ${n / i}$`);
                  dz.push(i);
                  if (i * i !== n) dz.push(n / i);
                }
              }
              dz.sort((x, y) => x - y);
              return {
                tresc: r.pick([`Ile dzielników ma liczba $${n}$?`, `Ile jest liczb naturalnych, przez które dzieli się liczba $${n}$?`]),
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba dzielników" }],
                odpowiedz: { w: dz.length },
                wynik: `$${dz.length}$`,
                rozwiazanie: [`Szukamy dzielników parami: ${pary.join(", ")}.`, `Dzielniki: ${dz.map((x) => `$${x}$`).join(", ")}. Jest ich $${dz.length}$.`],
              };
            }
            if (t === 1) {
              const k = r.int(3, 12), N = r.int(50, 120);
              const m = Math.floor((N - 1) / k);
              return {
                tresc: `Ile jest dodatnich wielokrotności liczby $${k}$ mniejszych od $${N}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba wielokrotności" }],
                odpowiedz: { w: m },
                wynik: `$${m}$`,
                rozwiazanie: [
                  `Wielokrotności to $${k}$, $${2 * k}$, $${3 * k}$, … Szukamy ostatniej, która jest mniejsza od $${N}$.`,
                  `Jest to $${m} \\cdot ${k} = ${m * k}$, bo $${m + 1} \\cdot ${k} = ${(m + 1) * k}$ jest już za duże. Jest ich $${m}$.`,
                ],
              };
            }
            if (t === 2) {
              let a, b;
              for (;;) {
                a = r.int(4, 16);
                b = r.int(4, 16);
                if (a !== b && nwwf(a, b) <= 100) break;
              }
              const dni = r.chance(0.5);
              const wsp = dni
                ? `Ania chodzi na basen co $${a}$ dni, a Bartek co $${b}$ dni. Dziś oboje byli na basenie. Po ilu dniach znów spotkają się na basenie?`
                : `Dwa autobusy odjeżdżają z tego samego przystanku: pierwszy co $${a}$ ${mn(a, "minutę", "minuty", "minut")}, drugi co $${b}$ ${mn(b, "minutę", "minuty", "minut")}. O godzinie $8{:}00$ odjechały razem. Po ilu minutach znów odjadą razem?`;
              const { kr, wynik } = nwdNwwKroki(a, b, "NWW");
              return {
                tresc: wsp,
                pola: [{ id: "w", typ: "liczba", etykieta: dni ? "Liczba dni" : "Liczba minut" }],
                odpowiedz: { w: wynik },
                wynik: `$${wynik}$`,
                rozwiazanie: [`Zdarzenia znów spotkają się po czasie równym NWW liczb $${a}$ i $${b}$.`, ...kr],
              };
            }
            const [a, b, g] = paraZNwd(r, 2, 12, 9, 100);
            if (r.chance(0.5)) {
              const { kr } = nwdNwwKroki(a, b, "NWD");
              return {
                tresc: `Dwie wstążki mają długości $${a}$ cm i $${b}$ cm. Trzeba je pociąć na jednakowe kawałki, jak najdłuższe i bez resztek. Ile centymetrów ma jeden kawałek?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Długość w cm" }],
                odpowiedz: { w: g },
                wynik: `$${g}$`,
                rozwiazanie: [`Długość kawałka ma dzielić obie liczby i być jak największa, więc szukamy NWD liczb $${a}$ i $${b}$.`, ...kr],
              };
            }
            const { kr } = nwdNwwKroki(a, b, "NWD");
            return {
              tresc: `Ola ma $${a}$ ${mn(a, "czerwony koralik", "czerwone koraliki", "czerwonych koralików")} i $${b}$ ${mn(b, "niebieski koralik", "niebieskie koraliki", "niebieskich koralików")}. Chce zrobić jak najwięcej jednakowych zestawów, w których będą wszystkie koraliki. Ile zestawów zrobi?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba zestawów" }],
              odpowiedz: { w: g },
              wynik: `$${g}$`,
              rozwiazanie: [`Liczba zestawów ma dzielić $${a}$ i $${b}$ i być jak największa, więc szukamy NWD liczb $${a}$ i $${b}$.`, ...kr],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "ulamki",
      nazwa: "Ułamki",
      sciaga: [
        {
          nazwa: "Ułamek niewłaściwy i liczba mieszana",
          slownie: "Ułamek właściwy jest mniejszy od $1$. Ułamek niewłaściwy ma licznik większy lub równy mianownikowi. Taki ułamek możemy zapisać jako liczbę mieszaną, czyli całości i ułamek. Wystarczy podzielić licznik przez mianownik.",
          tex: "\\frac{17}{5}=3\\frac{2}{5}\\qquad 3\\frac{2}{5}=\\frac{3\\cdot5+2}{5}=\\frac{17}{5}",
          przyklad: "$17 : 5 = 3$ i zostaje reszta $2$, więc $\\frac{17}{5} = 3\\frac{2}{5}$. W drugą stronę: $2\\frac{3}{4} = \\frac{2 \\cdot 4 + 3}{4} = \\frac{11}{4}$.",
          uwaga: "Przy zamianie liczby mieszanej na ułamek niewłaściwy mianownik się nie zmienia.",
        },
        {
          nazwa: "Skracanie i rozszerzanie",
          slownie: "Gdy licznik i mianownik pomnożymy albo podzielimy przez tę samą liczbę (różną od zera), wartość ułamka się nie zmienia. Mnożenie to rozszerzanie, dzielenie to skracanie. Ułamek skracamy przez NWD licznika i mianownika.",
          tex: "\\frac{18}{24}=\\frac{3}{4}\\qquad \\frac{2}{5}=\\frac{6}{15}",
          przyklad: "$\\text{NWD}(18, 24) = 6$, więc $\\frac{18}{24} = \\frac{18 : 6}{24 : 6} = \\frac{3}{4}$. Rozszerzamy przez $3$: $\\frac{2}{5} = \\frac{2 \\cdot 3}{5 \\cdot 3} = \\frac{6}{15}$.",
          uwaga: "Dzielimy albo mnożymy obie liczby przez to samo. Nie wolno odjąć tej samej liczby od licznika i mianownika.",
        },
        {
          nazwa: "Porównywanie ułamków zwykłych",
          slownie: "Gdy mianowniki są takie same, większy jest ułamek z większym licznikiem. Gdy mianowniki są różne, sprowadzamy ułamki do wspólnego mianownika (najlepiej NWW mianowników) i porównujemy liczniki.",
          tex: "\\frac{3}{4}=\\frac{9}{12}\\qquad \\frac{5}{6}=\\frac{10}{12}",
          przyklad: "Porównujemy $\\frac{3}{4}$ i $\\frac{5}{6}$. $\\text{NWW}(4, 6) = 12$, więc $\\frac{9}{12}$ i $\\frac{10}{12}$. Zatem $\\frac{3}{4} < \\frac{5}{6}$.",
          uwaga: "Większy mianownik nie znaczy większy ułamek. Jedna ósma jest mniejsza niż jedna piąta: $\\frac{1}{8} < \\frac{1}{5}$.",
        },
        {
          nazwa: "Ułamek zwykły i dziesiętny",
          slownie: "Ułamek zwykły zamieniamy na dziesiętny, rozszerzając go do mianownika $10$, $100$ albo $1000$ (albo dzieląc licznik przez mianownik). Ułamek dziesiętny zamieniamy na zwykły, zapisując go jako ułamek o mianowniku $10$, $100$ albo $1000$, i skracamy.",
          tex: "\\frac{3}{8}=\\frac{375}{1000}=0{,}375\\qquad 0{,}35=\\frac{35}{100}=\\frac{7}{20}",
          przyklad: "$\\frac{3}{5} = \\frac{6}{10} = 0{,}6$. Natomiast $0{,}35 = \\frac{35}{100}$, a po skróceniu przez $5$ dostajemy $\\frac{7}{20}$.",
          uwaga: "Liczby $0{,}5$ i $\\frac{1}{5}$ nie są równe. Liczba $0{,}5$ to $\\frac{5}{10} = \\frac{1}{2}$.",
        },
        {
          nazwa: "Porównywanie różnych zapisów",
          slownie: "Gdy w jednym porównaniu są ułamki zwykłe i dziesiętne, zamieniamy wszystko na ułamki dziesiętne. Potem porównujemy po dopisaniu zer, żeby liczby miały tyle samo cyfr po przecinku.",
          przyklad: "Porównujemy $0{,}6$ i $\\frac{5}{8}$. $\\frac{5}{8} = \\frac{625}{1000} = 0{,}625$. Dopisujemy zera: $0{,}600 < 0{,}625$, więc $0{,}6 < \\frac{5}{8}$.",
          uwaga: "$0{,}45$ jest mniejsze od $0{,}5$, bo $0{,}5 = 0{,}50$. Nie ma znaczenia, że $45 > 5$.",
        },
      ],
      jak: [
        "Ułamek niewłaściwy na mieszaną: dziel licznik przez mianownik. Całości to wynik, a reszta to nowy licznik.",
        "Aby skrócić ułamek, znajdź NWD licznika i mianownika i podziel przez nie oba.",
        "Porównując ułamki zwykłe, sprowadź je do wspólnego mianownika.",
        "Gdy zapisy są różne, zamień zwykły na dziesiętny i porównaj po dopisaniu zer.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Jak zapisać ułamek $\\frac{23}{6}$ w postaci liczby mieszanej? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5\\frac{3}{6}$", "$3\\frac{5}{6}$", "$4\\frac{5}{6}$", "$3\\frac{5}{23}$"],
          poprawna: 1,
        },
        {
          nr: "23",
          tresc: "Który z ułamków jest równy $\\frac{15}{35}$ i nie da się go już skrócić? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{5}{7}$", "$\\frac{3}{5}$", "$\\frac{15}{35}$", "$\\frac{3}{7}$"],
          poprawna: 3,
        },
        {
          nr: "24",
          tresc: "Która nierówność jest prawdziwa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{3}{4} < \\frac{2}{3}$", "$\\frac{4}{9} > \\frac{1}{2}$", "$\\frac{5}{8} > \\frac{3}{5}$", "$0{,}7 < 0{,}65$"],
          poprawna: 2,
        },
        {
          nr: "25",
          tresc: "Która z liczb jest największa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{5}{8}$", "$0{,}6$", "$\\frac{7}{12}$", "$0{,}59$"],
          poprawna: 0,
        },
        {
          nr: "26",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\frac{5}{4} = 1\\frac{1}{4}$", litery: "PF", poprawna: 0 },
            { tekst: "$0{,}04 = \\frac{4}{10}$", litery: "PF", poprawna: 1 },
            { tekst: "$\\frac{12}{18} = \\frac{2}{3}$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Ustaw liczby $\\frac{3}{4}$, $0{,}7$, $\\frac{4}{5}$ i $\\frac{5}{8}$ od najmniejszej do największej. **Zapisz obliczenia.**",
          rozwiazanie: "Zamieniamy ułamki zwykłe na dziesiętne: $\\frac{3}{4} = \\frac{75}{100} = 0{,}75$ oraz $\\frac{4}{5} = \\frac{8}{10} = 0{,}8$.\n\nDalej $\\frac{5}{8} = \\frac{625}{1000} = 0{,}625$.\n\nDopisujemy zera: $0{,}750$, $0{,}700$, $0{,}800$, $0{,}625$. Porównujemy: $0{,}625 < 0{,}700 < 0{,}750 < 0{,}800$.\n\nOdpowiedź: $\\frac{5}{8} < 0{,}7 < \\frac{3}{4} < \\frac{4}{5}$.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "Majka zjadła $\\frac{6}{15}$ tabliczki czekolady, a Bartek $\\frac{3}{8}$ tej samej tabliczki. Kto zjadł więcej? **Zapisz obliczenia.**",
          rozwiazanie: "Skracamy ułamek Majki: $\\frac{6}{15} = \\frac{2}{5}$.\n\nPorównujemy $\\frac{2}{5}$ i $\\frac{3}{8}$. Wspólny mianownik to $\\text{NWW}(5, 8) = 40$.\n\n$\\frac{2}{5} = \\frac{16}{40}$ oraz $\\frac{3}{8} = \\frac{15}{40}$. Ponieważ $16 > 15$, więcej zjadła Majka.\n\nOdpowiedź: Więcej czekolady zjadła Majka.",
        },
      ],
      generatory: [
        {
          id: "skracanie-zamiana",
          nazwa: "Skracanie i zamiana",
          opis: "Skróć ułamek, podaj NWD licznika i mianownika albo zamień ułamek niewłaściwy na liczbę mieszaną i odwrotnie.",
          generuj(r) {
            const k = r.pick([0, 0, 1, 2, 3]);
            if (k <= 1) {
              let p, qq, g;
              do {
                qq = r.int(3, 15);
                p = r.int(1, qq - 1);
                g = r.int(2, 9);
              } while (nwdf(p, qq) !== 1 || qq * g > 120);
              const a = p * g, b = qq * g;
              const kr = [
                `Największa liczba, przez którą dzielą się $${a}$ i $${b}$, to $${g}$ (NWD $= ${g}$).`,
                k === 0 ? `Dzielimy licznik i mianownik przez $${g}$: $${fr(a, b)} = ${fr(`${a} : ${g}`, `${b} : ${g}`)} = ${fr(p, qq)}$.` : `Sprawdzenie: $${a} : ${g} = ${p}$ i $${b} : ${g} = ${qq}$, a liczby $${p}$ i $${qq}$ nie mają już wspólnych dzielników.`,
              ];
              if (k === 0) {
                return {
                  tresc: `Skróć ułamek $${fr(a, b)}$ do postaci nieskracalnej. Wpisz licznik i mianownik.`,
                  pola: [{ id: "l", typ: "liczba", etykieta: "Licznik" }, { id: "m", typ: "liczba", etykieta: "Mianownik" }],
                  odpowiedz: { l: p, m: qq },
                  wynik: `$${fr(p, qq)}$`,
                  rozwiazanie: kr,
                };
              }
              return {
                tresc: `Przez jaką największą liczbę można skrócić ułamek $${fr(a, b)}$?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Największa liczba" }],
                odpowiedz: { w: g },
                wynik: `$${g}$`,
                rozwiazanie: kr,
              };
            }
            if (k === 2) {
              const d = r.int(3, 12);
              let n;
              do { n = r.int(d + 1, 6 * d); } while (n % d === 0);
              const c = Math.floor(n / d), res = n % d;
              return {
                tresc: `Zamień ułamek $${fr(n, d)}$ na liczbę mieszaną. Ile całości ma ta liczba?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba całości" }],
                odpowiedz: { w: c },
                wynik: `$${c}$`,
                rozwiazanie: [`Dzielimy licznik przez mianownik: $${n} : ${d} = ${c}$, reszta $${res}$.`, `Zatem $${fr(n, d)} = ${mt(c, res, d)}$. Całości jest $${c}$.`],
              };
            }
            const d = r.int(3, 12);
            const c = r.int(1, 6);
            const n = r.int(1, d - 1);
            return {
              tresc: `Zamień liczbę mieszaną $${mt(c, n, d)}$ na ułamek niewłaściwy. Jaki jest licznik tego ułamka?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Licznik" }],
              odpowiedz: { w: c * d + n },
              wynik: `$${c * d + n}$`,
              rozwiazanie: [`Mnożymy całości przez mianownik i dodajemy licznik: $${c} \\cdot ${d} + ${n} = ${c * d + n}$.`, `Mianownik zostaje taki sam, więc $${mt(c, n, d)} = ${fr(c * d + n, d)}$.`],
            };
          },
        },
        {
          id: "porownaj-ulamki",
          nazwa: "Porównaj ułamki",
          opis: "Wstaw znak $<$, $=$ lub $>$ między dwa ułamki zwykłe albo między ułamek zwykły i dziesiętny.",
          generuj(r) {
            const ZN = ["<", "=", ">"];
            if (r.chance(0.55)) {
              let b, d, a, c, cmp;
              for (;;) {
                b = r.pick(DEN);
                d = r.chance(0.2) ? b : r.pick(DEN);
                if (nwwf(b, d) > 36) continue;
                a = r.int(1, b - 1);
                c = r.int(1, d - 1);
                cmp = Math.sign(a * d - c * b);
                if (cmp === 0 && !r.chance(0.1)) continue;
                break;
              }
              const L = nwwf(b, d);
              const x = a * (L / b), y = c * (L / d);
              const kr = b === d
                ? [`Mianowniki są takie same, więc porównujemy liczniki: $${a}$ i $${c}$.`]
                : [`Wspólny mianownik to $${L}$ (NWW liczb $${b}$ i $${d}$): ${[b !== L ? `$${fr(a, b)} = ${fr(x, L)}$` : null, d !== L ? `$${fr(c, d)} = ${fr(y, L)}$` : null].filter(Boolean).join(" oraz ")}.`, `Porównujemy liczniki: $${x}$ i $${y}$.`];
              kr.push(`Zatem $${fr(a, b)} ${ZN[cmp + 1]} ${fr(c, d)}$.`);
              return {
                tresc: r.pick([`Jaki znak ($<$, $=$ albo $>$) trzeba wstawić między $${fr(a, b)}$ i $${fr(c, d)}$?`, `Porównaj ułamki $${fr(a, b)}$ i $${fr(c, d)}$. Jaki znak należy wstawić między nie?`]),
                pola: [{ id: "w", typ: "wybor", etykieta: "Znak", opcje: ["$<$", "$=$", "$>$"] }],
                odpowiedz: { w: cmp + 1 },
                wynik: `$${fr(a, b)} ${ZN[cmp + 1]} ${fr(c, d)}$`,
                rozwiazanie: kr,
              };
            }
            const den = r.pick([2, 4, 5, 8, 10, 20, 25]);
            const n = r.int(1, den - 1);
            const m = (n * 1000) / den;
            let dec;
            do {
              dec = r.chance(0.1) ? m : m + r.pick([-100, -50, -25, -10, -5, 5, 10, 25, 50, 100]);
            } while (dec <= 0 || dec >= 1000);
            const cmp = Math.sign(m - dec);
            const lewy = r.chance(0.5);
            const L = lewy ? fr(n, den) : fmtMilli(dec);
            const P = lewy ? fmtMilli(dec) : fr(n, den);
            const c = lewy ? cmp : -cmp;
            return {
              tresc: `Jaki znak ($<$, $=$ albo $>$) trzeba wstawić między $${L}$ i $${P}$?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Znak", opcje: ["$<$", "$=$", "$>$"] }],
              odpowiedz: { w: c + 1 },
              wynik: `$${L} ${ZN[c + 1]} ${P}$`,
              rozwiazanie: [
                `Zamieniamy ułamek zwykły na dziesiętny: $${fr(n, den)} = ${fr(m, 1000)} = ${fmtMilli(m)}$.`,
                `Dopisujemy zera, żeby liczby miały tyle samo cyfr po przecinku: $${fmtMilli(m, true)}$ i $${fmtMilli(dec, true)}$.`,
                `Zatem $${L} ${ZN[c + 1]} ${P}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "dodawanie-odejmowanie-ulamkow",
      nazwa: "Dodawanie i odejmowanie ułamków",
      sciaga: [
        {
          nazwa: "Ten sam mianownik",
          slownie: "Gdy mianowniki są takie same, dodajemy albo odejmujemy tylko liczniki. Mianownik przepisujemy. Na końcu skracamy wynik i, jeśli jest większy od $1$, zapisujemy jako liczbę mieszaną.",
          tex: "\\frac{3}{8}+\\frac{7}{8}=\\frac{10}{8}=1\\frac{1}{4}",
          przyklad: "$\\frac{3}{8} + \\frac{7}{8} = \\frac{10}{8}$. Skracamy przez $2$: $\\frac{5}{4} = 1\\frac{1}{4}$. A $\\frac{9}{10} - \\frac{4}{10} = \\frac{5}{10} = \\frac{1}{2}$.",
          uwaga: "Nie dodawaj mianowników. $\\frac{1}{5} + \\frac{2}{5}$ to $\\frac{3}{5}$, a nie $\\frac{3}{10}$.",
        },
        {
          nazwa: "Różne mianowniki",
          slownie: "Najpierw sprowadzamy ułamki do wspólnego mianownika (najlepiej NWW mianowników): rozszerzamy każdy ułamek. Potem dodajemy albo odejmujemy liczniki.",
          tex: "\\frac{1}{6}+\\frac{3}{4}\\qquad =\\frac{2}{12}+\\frac{9}{12}\\qquad =\\frac{11}{12}",
          przyklad: "$\\text{NWW}(6, 4) = 12$. Rozszerzamy: $\\frac{1}{6} = \\frac{2}{12}$ i $\\frac{3}{4} = \\frac{9}{12}$. Dodajemy: $\\frac{2}{12} + \\frac{9}{12} = \\frac{11}{12}$. Odejmowanie: $\\frac{5}{6} - \\frac{1}{4} = \\frac{10}{12} - \\frac{3}{12} = \\frac{7}{12}$.",
          uwaga: "Rozszerzaj licznik i mianownik przez tę samą liczbę. Liczniki i mianowniki z różnych ułamków nie mieszają się.",
        },
        {
          nazwa: "Liczby mieszane",
          slownie: "Przy dodawaniu liczb mieszanych dodajemy osobno całości i osobno ułamki. Gdy ułamki dają więcej niż $1$, dodajemy tę całość do całości. Przy odejmowaniu, gdy ułamek odjemnej jest mniejszy, zamieniamy jedną całość na ułamek.",
          tex: "3\\frac{1}{5}-1\\frac{3}{5}\\qquad =2\\frac{6}{5}-1\\frac{3}{5}\\qquad =1\\frac{3}{5}",
          przyklad: "$2\\frac{3}{4} + 1\\frac{5}{6}$: całości $2 + 1 = 3$. Ułamki: $\\frac{9}{12} + \\frac{10}{12} = \\frac{19}{12} = 1\\frac{7}{12}$. Razem $3 + 1\\frac{7}{12} = 4\\frac{7}{12}$.",
          uwaga: "Przy $3\\frac{1}{5} - 1\\frac{3}{5}$ nie odejmuj mniejszego ułamka od większego. Pożycz całość: $3\\frac{1}{5} = 2\\frac{6}{5}$.",
        },
        {
          nazwa: "Ułamki dziesiętne",
          slownie: "Zapisujemy liczby jedna pod drugą, przecinek pod przecinkiem. Dopisujemy zera, żeby liczby miały tyle samo cyfr po przecinku. Liczymy jak na liczbach naturalnych, a przecinek w wyniku stawiamy pod przecinkami.",
          tex: "4{,}70+2{,}35=7{,}05",
          przyklad: "$4{,}7 + 2{,}35$: dopisujemy zero, $4{,}70 + 2{,}35$. Liczymy $470 + 235 = 705$, więc wynik to $7{,}05$. Odejmowanie: $6{,}2 - 3{,}85 = 6{,}20 - 3{,}85 = 2{,}35$.",
          uwaga: "$0{,}5 + 0{,}25$ to $0{,}75$, a nie $0{,}30$. Liczby $0{,}5$ i $0{,}25$ mają różną liczbę cyfr po przecinku, więc trzeba dopisać zero: $0{,}50 + 0{,}25$.",
        },
        {
          nazwa: "Zwykłe i dziesiętne razem",
          slownie: "Gdy w działaniu są ułamki zwykłe i dziesiętne, zamieniamy je na jedną postać, najczęściej na dziesiętną. Pytanie „o ile więcej” albo „o ile mniej” oznacza odejmowanie.",
          przyklad: "$\\frac{3}{4} + 0{,}2$: $\\frac{3}{4} = 0{,}75$, więc $0{,}75 + 0{,}2 = 0{,}95$. Ola ma sznurek długości $1\\frac{1}{2}$ m, a Kuba $0{,}8$ m. O ile sznurek Oli jest dłuższy? $1{,}5 - 0{,}8 = 0{,}7$ m.",
          uwaga: "Nie dodawaj ułamka zwykłego do dziesiętnego, nie zamieniając żadnego z nich. Najpierw jedna postać, potem działanie.",
        },
      ],
      jak: [
        "Sprawdź mianowniki. Gdy są różne, znajdź wspólny mianownik (NWW) i rozszerz ułamki.",
        "Dodaj albo odejmij liczniki. W liczbach mieszanych licz osobno całości i ułamki (w razie potrzeby pożycz całość).",
        "Ułamki dziesiętne zapisz przecinek pod przecinkiem i dopisz zera.",
        "Skróć wynik, zamień na liczbę mieszaną i sprawdź, czy ma sens.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Ile wynosi $\\frac{3}{8} + \\frac{7}{8}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{10}{16}$", "$1\\frac{1}{4}$", "$\\frac{4}{8}$", "$2\\frac{5}{8}$"],
          poprawna: 1,
        },
        {
          nr: "30",
          tresc: "Ile wynosi $\\frac{5}{6} - \\frac{1}{4}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{4}{2}$", "$\\frac{4}{12}$", "$\\frac{1}{2}$", "$\\frac{7}{12}$"],
          poprawna: 3,
        },
        {
          nr: "31",
          tresc: "Ile wynosi $4\\frac{1}{3} - 1\\frac{5}{6}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3\\frac{1}{2}$", "$3\\frac{1}{6}$", "$2\\frac{1}{2}$", "$2\\frac{5}{6}$"],
          poprawna: 2,
        },
        {
          nr: "32",
          tresc: "Ile wynosi $7{,}3 - 2{,}85$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5{,}55$", "$4{,}45$", "$4{,}55$", "$4{,}35$"],
          poprawna: 1,
        },
        {
          nr: "33",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\frac{2}{5} + \\frac{1}{3} = \\frac{3}{8}$", litery: "PF", poprawna: 1 },
            { tekst: "$0{,}6 + \\frac{1}{4} = 0{,}85$", litery: "PF", poprawna: 0 },
            { tekst: "$3 - 1\\frac{1}{2} = 1\\frac{1}{2}$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 2,
          tresc: "Kasia kupiła $1\\frac{1}{2}$ kg jabłek i $2\\frac{3}{4}$ kg gruszek. Ile kilogramów owoców kupiła razem? O ile kilogramów więcej kupiła gruszek niż jabłek? **Zapisz obliczenia.**",
          rozwiazanie: "Razem: $1\\frac{1}{2} + 2\\frac{3}{4}$. Całości: $1 + 2 = 3$. Ułamki: $\\frac{1}{2} + \\frac{3}{4} = \\frac{2}{4} + \\frac{3}{4} = \\frac{5}{4} = 1\\frac{1}{4}$. Razem $3 + 1\\frac{1}{4} = 4\\frac{1}{4}$.\n\nRóżnica: $2\\frac{3}{4} - 1\\frac{1}{2}$. Całości: $2 - 1 = 1$. Ułamki: $\\frac{3}{4} - \\frac{2}{4} = \\frac{1}{4}$. Razem $1\\frac{1}{4}$.\n\nOdpowiedź: Kasia kupiła razem $4\\frac{1}{4}$ kg owoców, a gruszek o $1\\frac{1}{4}$ kg więcej niż jabłek.",
        },
        {
          nr: "35",
          punkty: 2,
          tresc: "Deska ma $3{,}2$ m długości. Pan Marek odciął z niej kawałek $1{,}45$ m, a potem jeszcze $0{,}8$ m. Ile metrów deski zostało? **Zapisz obliczenia.**",
          rozwiazanie: "Obcięte kawałki razem: $1{,}45 + 0{,}8 = 1{,}45 + 0{,}80 = 2{,}25$.\n\nZostało: $3{,}2 - 2{,}25 = 3{,}20 - 2{,}25 = 0{,}95$.\n\nSprawdzenie: $0{,}95 + 2{,}25 = 3{,}20$.\n\nOdpowiedź: Zostało $0{,}95$ m deski.",
        },
      ],
      generatory: [
        {
          id: "ulamki-zwykle",
          nazwa: "Ułamki zwykłe",
          opis: "Dodaj albo odejmij dwa ułamki zwykłe lub dwie liczby mieszane. Wynik wpisz jako ułamek (może być niewłaściwy) albo liczbę dziesiętną.",
          generuj(r) {
            const op = r.chance(0.5) ? "+" : "-";
            const mieszane = r.chance(0.4);
            const para = () => {
              for (;;) {
                const d1 = r.pick(DEN);
                const d2 = r.chance(0.2) ? d1 : r.pick(DEN);
                if (nwwf(d1, d2) <= 36) return [d1, d2];
              }
            };
            if (!mieszane) {
              let d1, d2, n1, n2;
              for (;;) {
                [d1, d2] = para();
                n1 = r.int(1, d1 - 1);
                n2 = r.int(1, d2 - 1);
                if (op === "-" && n1 * d2 <= n2 * d1) continue;
                break;
              }
              const { kr, res } = ulKroki([n1, d1], [n2, d2], op);
              const f1 = fr(n1, d1), f2 = fr(n2, d2);
              const ktx = r.int(0, 4);
              let tresc;
              if (ktx === 0) tresc = op === "+" ? `Ola wypiła rano $${f1}$ l soku, a po południu $${f2}$ l. Ile litrów soku wypiła razem?` : `W dzbanku było $${f1}$ l wody. Wylano z niego $${f2}$ l. Ile litrów wody zostało?`;
              else if (ktx === 1) tresc = op === "+" ? `Pierwszy odcinek ma $${f1}$ m, a drugi $${f2}$ m. Jaką długość mają razem?` : `Ze sznurka o długości $${f1}$ m odcięto $${f2}$ m. Ile metrów sznurka zostało?`;
              else tresc = r.pick([`Oblicz $${f1} ${op} ${f2}$.`, `Ile to jest $${f1} ${op} ${f2}$?`, `Podaj wynik działania $${f1} ${op} ${f2}$.`]);
              return {
                tresc,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik jako ułamek (np. 7/12)" }],
                odpowiedz: { w: res },
                wynik: `$${qm(res)}$`,
                rozwiazanie: kr,
              };
            }
            let w1, w2, d1, d2, n1, n2;
            for (;;) {
              [d1, d2] = para();
              n1 = r.int(1, d1 - 1);
              n2 = r.int(1, d2 - 1);
              w1 = op === "+" ? r.int(1, 5) : r.int(2, 6);
              w2 = op === "+" ? r.int(1, 4) : r.int(1, w1 - 1);
              if (op === "-" && n1 * d2 === n2 * d1) continue;
              break;
            }
            const f1 = [n1, d1], f2 = [n2, d2];
            const wyr = `${mt(w1, n1, d1)} ${op} ${mt(w2, n2, d2)}`;
            const total = q(w1).add(q(n1, d1)).add(op === "+" ? q(w2).add(q(n2, d2)) : q(w2).add(q(n2, d2)).neg());
            let kr;
            if (op === "+") {
              const W = w1 + w2;
              const u = ulKroki(f1, f2, "+");
              kr = [`Dodajemy osobno całości: $${w1} + ${w2} = ${W}$. Potem osobno ułamki.`, ...u.kr, razem(W, u.res, total)];
            } else if (n1 * d2 > n2 * d1) {
              const W = w1 - w2;
              const u = ulKroki(f1, f2, "-");
              kr = [`Odejmujemy osobno całości: $${w1} - ${w2} = ${W}$. Potem osobno ułamki.`, ...u.kr, razem(W, u.res, total)];
            } else {
              const L = nwwf(d1, d2);
              const e1 = n1 * (L / d1), e2 = n2 * (L / d2);
              const W = w1 - 1 - w2, x = e1 + L - e2;
              const res = q(x, L);
              kr = [
                d1 === d2 ? `Mianowniki są takie same.` : `Wspólny mianownik to $${L}$: $${wyr} = ${mt(w1, e1, L)} - ${mt(w2, e2, L)}$.`,
                `Ułamek $${fr(e1, L)}$ jest mniejszy niż $${fr(e2, L)}$, więc zamieniamy jedną całość na ułamek: $${mt(w1, e1, L)} = ${mt(w1 - 1, e1 + L, L)}$.`,
                `Odejmujemy osobno całości: $${w1 - 1} - ${w2} = ${W}$, i liczniki: $${e1 + L} - ${e2} = ${x}$, czyli $${fr(x, L)}$.`,
                razem(W, res, total),
              ];
            }
            return {
              tresc: r.pick([`Oblicz $${wyr}$.`, `Ile to jest $${wyr}$?`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik jako ułamek (np. 19/12)" }],
              odpowiedz: { w: total },
              wynik: `$${qm(total)}$`,
              rozwiazanie: kr,
            };
          },
        },
        {
          id: "ulamki-dziesietne",
          nazwa: "Ułamki dziesiętne",
          opis: "Dodaj albo odejmij ułamki dziesiętne (także w zadaniach z pieniędzmi i długościami) albo ułamek zwykły i dziesiętny.",
          generuj(r) {
            const t = r.int(0, 3);
            if (t === 3) {
              const den = r.pick([2, 4, 5, 10, 20, 25]);
              const n = r.int(1, den - 1);
              const f100 = (n * 100) / den;
              let b = r.int(10, 250);
              const sum = r.chance(0.5);
              if (!sum && f100 === b) b += 5;
              const wyr = sum ? `${fr(n, den)} + ${fmtDec(b)}` : f100 > b ? `${fr(n, den)} - ${fmtDec(b)}` : `${fmtDec(b)} - ${fr(n, den)}`;
              const w100 = sum ? f100 + b : Math.abs(f100 - b);
              const duzy = Math.max(f100, b), maly = Math.min(f100, b);
              return {
                tresc: r.pick([`Oblicz $${wyr}$.`, `Ile to jest $${wyr}$?`]),
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w: q(w100, 100) },
                wynik: `$${fmtDec(w100)}$`,
                rozwiazanie: [
                  `Zamieniamy ułamek zwykły na dziesiętny: $${fr(n, den)} = ${fr(f100, 100)} = ${fmtDec(f100)}$.`,
                  sum ? `Dodajemy ułamki dziesiętne: $${fmtDec(f100, true)} + ${fmtDec(b, true)} = ${fmtDec(w100)}$.` : `Odejmujemy mniejszą liczbę od większej: $${fmtDec(duzy, true)} - ${fmtDec(maly, true)} = ${fmtDec(w100)}$.`,
                ],
              };
            }
            const sum = r.chance(0.5);
            let a = r.int(100, 5000), b = r.int(10, 3000);
            if (!sum && a <= b) [a, b] = [b + r.int(5, 300), a];
            if (!sum && a === b) a += 7;
            const w = sum ? a + b : a - b;
            const A = fmtDec(a), B = fmtDec(b);
            const kr = [
              `Zapisujemy liczby jedna pod drugą, przecinek pod przecinkiem (w razie potrzeby dopisujemy zera): $${fmtDec(a, true)} ${sum ? "+" : "-"} ${fmtDec(b, true)}$.`,
              `Liczymy jak na liczbach naturalnych (bez przecinków): $${a} ${sum ? "+" : "-"} ${b} = ${w}$.`,
              `Wstawiamy przecinek pod przecinkami: $${fmtDec(w)}$.`,
            ];
            let tresc;
            if (t === 0) {
              const pieniadze = r.chance(0.5);
              if (pieniadze) {
                const a2 = fmtDec(a, true), b2 = fmtDec(b, true);
                tresc = sum ? `Kasia kupiła chleb za $${a2}$ zł i masło za $${b2}$ zł. Ile złotych zapłaciła razem?` : `Ola miała $${a2}$ zł i wydała $${b2}$ zł. Ile złotych jej zostało?`;
              } else {
                tresc = sum ? `Pierwszy odcinek ma $${A}$ m, a drugi $${B}$ m. Ile metrów mają razem?` : `Z deski o długości $${A}$ m odcięto $${B}$ m. Ile metrów deski zostało?`;
              }
            } else {
              const e = `${A} ${sum ? "+" : "-"} ${B}`;
              tresc = r.pick([`Oblicz $${e}$.`, `Ile to jest $${e}$?`, `Podaj wynik działania $${e}$.`]);
            }
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w: q(w, 100) },
              wynik: `$${fmtDec(w)}$`,
              rozwiazanie: kr,
            };
          },
        },
      ],
    },
  ],
};
