// Klasa 6 (szkoła podstawowa) · rozdział V „Równania” – Matematyka z kluczem 6 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";   // tylko pomocnicze z wspolne.js

// --- Pomocnicze (tylko dla tego pliku)

/** Poprawna forma rzeczownika po liczbie: 1 cyfra, 2 cyfry, 5 cyfr. */
function mn(n, a, b, c) {
  const m10 = n % 10, m100 = n % 100;
  if (n === 1) return a;
  return m10 >= 2 && m10 <= 4 && !(m100 >= 12 && m100 <= 14) ? b : c;
}

const fr = (n, d) => `\\frac{${n}}{${d}}`;
/** Liczba wymierna dodatnia: ułamek, liczba mieszana albo liczba całkowita (LaTeX). */
const qm = (v) => (v.d === 1 ? `${v.n}` : v.n < v.d ? fr(v.n, v.d) : `${Math.floor(v.n / v.d)}${fr(v.n % v.d, v.d)}`);

/** Ułamek dziesiętny (liczba dodatnia, mianownik dzieli 10^4) do tekstu: 3/4 -> "0{,}75". */
function fmtD(v) {
  for (let k = 0; k <= 4; k++) {
    const p = 10 ** k;
    if (p % v.d === 0) {
      const x = v.n * (p / v.d);
      const c = Math.floor(x / p);
      const f = String(x % p).padStart(k, "0").replace(/0+$/, "");
      return f === "" ? `${c}` : `${c}{,}${f}`;
    }
  }
  throw new Error(`Nie da się zapisać dziesiętnie: ${v}`);
}

/** Liczba dziesiątych (np. 45) jako ułamek dziesiętny: 45 -> "4{,}5", 40 -> "4". */
const dz = (t) => fmtD(q(t, 10));

/** Łańcuch zapisu wyniku: ułamek, ułamek skrócony, liczba mieszana (bez powtórzeń). */
function lancuch(n, d) {
  const res = q(n, d);
  const ch = [fr(n, d)];
  const red = res.d === 1 ? `${res.n}` : fr(res.n, res.d);
  if (red !== ch[0]) ch.push(red);
  const mix = qm(res);
  if (mix !== ch[ch.length - 1]) ch.push(mix);
  return ch.join(" = ");
}

/** Liczba do podstawienia: ujemną bierzemy w nawias. */
const sub = (v) => (v < 0 ? `(${v})` : `${v}`);

/**
 * Równanie z jedną niewiadomą i liczbą całkowitą w rozwiązaniu (do kilku generatorów).
 * Zwraca: tex (zapis równania), x (rozwiązanie), L(v) = { txt, val } – lewa strona po wstawieniu v,
 * P = { val } – prawa strona, kr – kroki rozwiązania (bez sprawdzenia), zle – typowe błędne wyniki, a, c, d.
 * rodzaj: dod, ode, mno, dzi, odj, dzo (jedno działanie), dwa1–dwa4 (dwa działania).
 * opcje: ujemne (tylko dod), waga (dod, ode: „to samo po obu stronach”), prawa (dwa*: prawa strona to suma).
 */
function rownanie(r, rodzaj, opt = {}) {
  let a = 0, b = 0, c = 0, d = 0, x = 0, lewa = "", L = null, kr = [], zle = [], dwa = false;
  switch (rodzaj) {
    case "dod": {
      a = r.int(2, 20);
      if (opt.ujemne) { b = r.int(1, a - 1); x = b - a; } else { x = r.int(1, 20); b = x + a; }
      d = b;
      const zam = r.chance(0.3);
      lewa = zam ? `${a} + x` : `x + ${a}`;
      L = (v) => ({ txt: zam ? `${a} + ${sub(v)}` : `${sub(v)} + ${a}`, val: v + a });
      kr = opt.waga
        ? [`Odejmujemy $${a}$ od obu stron równania: $${zam ? `${a} + x - ${a}` : `x + ${a} - ${a}`} = ${b} - ${a}$.`, `Stąd $x = ${x}$.`]
        : [`Do $x$ dodano $${a}$ i otrzymano $${b}$. Cofamy się: odejmujemy $${a}$ od $${b}$.`, `$x = ${b} - ${a} = ${x}$.`];
      zle = [b + a, b, a];
      break;
    }
    case "ode": {
      a = r.int(2, 20); b = r.int(1, 20); x = a + b; d = b;
      lewa = `x - ${a}`;
      L = (v) => ({ txt: `${v} - ${a}`, val: v - a });
      kr = opt.waga
        ? [`Dodajemy $${a}$ do obu stron równania: $x - ${a} + ${a} = ${b} + ${a}$.`, `Stąd $x = ${x}$.`]
        : [`Od $x$ odjęto $${a}$ i otrzymano $${b}$. Cofamy się: dodajemy $${a}$ do $${b}$.`, `$x = ${b} + ${a} = ${x}$.`];
      zle = [b - a, b, a];
      break;
    }
    case "mno": {
      a = r.int(2, 9); x = r.int(2, 12); b = a * x; d = b;
      lewa = `${a}x`;
      L = (v) => ({ txt: `${a} \\cdot ${v}`, val: a * v });
      kr = [`Liczbę $x$ pomnożono przez $${a}$ i otrzymano $${b}$. Cofamy się: dzielimy $${b}$ przez $${a}$.`, `$x = ${b} : ${a} = ${x}$.`];
      zle = [b - a, b + a, b];
      break;
    }
    case "dzi": {
      a = r.int(2, 9); b = r.int(2, 12); x = a * b; d = b;
      lewa = r.chance(0.5) ? `x : ${a}` : fr("x", a);
      L = (v) => ({ txt: `${v} : ${a}`, val: v / a });
      kr = [`Liczbę $x$ podzielono przez $${a}$ i otrzymano $${b}$. Cofamy się: mnożymy $${b}$ przez $${a}$.`, `$x = ${b} \\cdot ${a} = ${x}$.`];
      zle = [b + a, b - a, b];
      break;
    }
    case "odj": {
      a = r.int(6, 30); b = r.int(1, a - 1); x = a - b; d = b;
      lewa = `${a} - x`;
      L = (v) => ({ txt: `${a} - ${v}`, val: a - v });
      kr = [`Od $${a}$ odjęto $x$ i zostało $${b}$. Szukamy liczby, którą odjęto: $x = ${a} - ${b} = ${x}$.`];
      zle = [a + b, b, a];
      break;
    }
    case "dzo": {
      x = r.int(2, 9); b = r.int(2, 9); a = x * b; d = b;
      lewa = `${a} : x`;
      L = (v) => ({ txt: `${a} : ${v}`, val: a / v });
      kr = [`Liczbę $${a}$ podzielono przez $x$ i otrzymano $${b}$. Szukamy dzielnika: $x = ${a} : ${b} = ${x}$.`];
      zle = [a + b, a - b, a * b];
      break;
    }
    case "dwa1": {   // ax + c = d
      dwa = true; a = r.int(2, 9); x = r.int(2, 12); c = r.int(1, 15); d = a * x + c;
      lewa = `${a}x + ${c}`;
      L = (v) => ({ txt: `${a} \\cdot ${v} + ${c}`, val: a * v + c });
      kr = [`Na końcu do $${a}x$ dodano $${c}$. Cofamy się: odejmujemy $${c}$ od $${d}$, czyli $${a}x = ${d} - ${c} = ${d - c}$.`, `Teraz $x$ było mnożone przez $${a}$, więc dzielimy: $x = ${d - c} : ${a} = ${x}$.`];
      zle = [d - c, d + c, a + c];
      break;
    }
    case "dwa2": {   // ax - c = d
      dwa = true; a = r.int(2, 9); x = r.int(2, 12); c = r.int(1, Math.min(15, a * x - 1)); d = a * x - c;
      lewa = `${a}x - ${c}`;
      L = (v) => ({ txt: `${a} \\cdot ${v} - ${c}`, val: a * v - c });
      kr = [`Na końcu od $${a}x$ odjęto $${c}$. Cofamy się: dodajemy $${c}$ do $${d}$, czyli $${a}x = ${d} + ${c} = ${d + c}$.`, `Teraz $x$ było mnożone przez $${a}$, więc dzielimy: $x = ${d + c} : ${a} = ${x}$.`];
      zle = [d - c, d + c, a + c];
      break;
    }
    case "dwa3": {   // x : a + c = d
      dwa = true; a = r.int(2, 9); const k = r.int(2, 10); x = a * k; c = r.int(1, 15); d = k + c;
      lewa = r.chance(0.5) ? `x : ${a} + ${c}` : `${fr("x", a)} + ${c}`;
      L = (v) => ({ txt: `${v} : ${a} + ${c}`, val: v / a + c });
      kr = [`Na końcu do $x : ${a}$ dodano $${c}$. Cofamy się: odejmujemy $${c}$ od $${d}$, czyli $x : ${a} = ${d} - ${c} = ${k}$.`, `Teraz $x$ było dzielone przez $${a}$, więc mnożymy: $x = ${k} \\cdot ${a} = ${x}$.`];
      zle = [d - c, d + c, k + a];
      break;
    }
    case "dwa4": {   // x : a - c = d
      dwa = true; a = r.int(2, 9); const k = r.int(3, 12); x = a * k; c = r.int(1, k - 1); d = k - c;
      lewa = r.chance(0.5) ? `x : ${a} - ${c}` : `${fr("x", a)} - ${c}`;
      L = (v) => ({ txt: `${v} : ${a} - ${c}`, val: v / a - c });
      kr = [`Na końcu od $x : ${a}$ odjęto $${c}$. Cofamy się: dodajemy $${c}$ do $${d}$, czyli $x : ${a} = ${d} + ${c} = ${k}$.`, `Teraz $x$ było dzielone przez $${a}$, więc mnożymy: $x = ${k} \\cdot ${a} = ${x}$.`];
      zle = [d - c, d + c, k + a];
      break;
    }
    default:
      throw new Error(`Nieznany rodzaj równania: ${rodzaj}`);
  }
  let prawa = `${d}`;
  if (dwa && opt.prawa && d >= 3) {
    const p = r.int(1, d - 1);
    prawa = `${p} + ${d - p}`;
    kr = [`Najpierw liczymy prawą stronę: $${p} + ${d - p} = ${d}$.`, ...kr];
  }
  return { tex: `${lewa} = ${prawa}`, x, L, P: { val: d }, kr, zle, a, c, d };
}

/** Zdanie „Sprawdzenie: …” dla rozwiązania x. */
const sprawdzenie = (eq) => `Sprawdzenie: $${eq.L(eq.x).txt} = ${eq.P.val}$, zgadza się z prawą stroną.`;

const WSZYSTKIE = ["dod", "ode", "mno", "dzi", "odj", "dzo", "dwa1", "dwa2", "dwa3", "dwa4"];

export default {
  tematy: [
    // ------------------------------------------------------------------------------------------------
    {
      id: "rownania-skad-to-znamy",
      nazwa: "Równania, czyli skąd my to znamy",
      sciaga: [
        {
          nazwa: "Równanie i niewiadoma",
          slownie: "Równanie to zapis ze znakiem $=$, w którym jest niewiadoma, czyli liczba, której szukamy. Niewiadomą zapisujemy literą, najczęściej $x$. Dawniej w jej miejscu była kratka.",
          tex: "\\square+7=15\\qquad x+7=15",
          litery: "$x$ – niewiadoma, czyli szukana liczba.",
          przyklad: "Pytanie „Jaką liczbę trzeba dodać do $7$, żeby wyszło $15$?” zapisujemy tak: $x + 7 = 15$.",
          uwaga: "Samo $x + 7$ nie jest równaniem, bo nie ma w nim znaku $=$. To jest wyrażenie.",
        },
        {
          nazwa: "Strony równania",
          slownie: "Równanie ma dwie strony. Lewa strona jest przed znakiem $=$, prawa po nim. Rozwiązać równanie to znaleźć liczbę, dla której obie strony są równe.",
          tex: "\\underbrace{2x+5}_{L}=\\underbrace{17}_{P}",
          litery: "$L$ – lewa strona równania, $P$ – prawa strona równania.",
          przyklad: "W równaniu $2x + 5 = 17$ lewa strona to $2x + 5$, a prawa strona to $17$.",
        },
        {
          nazwa: "Zapis działań z literą",
          slownie: "Między liczbą a literą pomijamy znak mnożenia: $4x$ to $4 \\cdot x$. Dzielenie zapisujemy jako $x : 4$ albo $\\frac{x}{4}$.",
          tex: "x+5\\qquad x-5\\qquad 4x\\qquad x:4",
          litery: "$x$ – dowolna liczba.",
          przyklad: "Dla $x = 5$ wyrażenie $3x$ ma wartość $3 \\cdot 5 = 15$, a wyrażenie $x + 3$ ma wartość $8$.",
          uwaga: "$3x$ dla $x = 5$ to $15$, a nie $35$. Litera $x$ oznacza liczbę, a nie cyfrę.",
        },
        {
          nazwa: "Od treści do równania",
          slownie: "Najpierw wybieramy niewiadomą. Potem zapisujemy kolejne działania z treści. Słowa „daje”, „jest równa”, „otrzymano” zamieniamy na znak $=$.",
          przyklad: "„Liczba $x$ zwiększona o $7$ daje $15$” to $x + 7 = 15$. „Liczba $x$ pomnożona przez $3$ daje $21$” to $3x = 21$. „Czwarta część liczby $x$ to $6$” to $x : 4 = 6$.",
          uwaga: "„Liczba o $3$ mniejsza od $x$” to $x - 3$, a nie $3 - x$.",
        },
      ],
      jak: [
        "Przeczytaj treść i zdecyduj, której liczby szukasz. Oznacz ją literą $x$.",
        "Zapisz po kolei, co dzieje się z niewiadomą: dodajemy, odejmujemy, mnożymy czy dzielimy.",
        "Wynik z treści (po słowach „daje”, „jest równa”, „otrzymano”) wpisz po znaku $=$.",
        "Przeczytaj równanie na głos i sprawdź, czy mówi to samo co treść.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Który z zapisów jest równaniem? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12 - 5$", "$3x + 4$", "$x + 5 = 12$", "$7 + 5$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Liczba $x$ zwiększona o $9$ jest równa $20$. Które równanie opisuje tę sytuację? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9x = 20$", "$x - 9 = 20$", "$20 + 9 = x$", "$x + 9 = 20$"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "Czwarta część liczby $x$ jest równa $6$. Które równanie opisuje tę sytuację? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4x = 6$", "$x : 4 = 6$", "$x + 4 = 6$", "$x - 4 = 6$"],
          poprawna: 1,
        },
        {
          nr: "4",
          tresc: "Ile wynosi wartość wyrażenia $3x + 2$ dla $x = 5$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$17$", "$37$", "$10$", "$21$"],
          poprawna: 0,
        },
        {
          nr: "5",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Lewa strona równania $2x + 1 = 9$ to $2x + 1$.", litery: "PF", poprawna: 0 },
            { tekst: "W równaniu $x - 3 = 8$ niewiadomą jest liczba $3$.", litery: "PF", poprawna: 1 },
            { tekst: "Zapis $4x$ oznacza $4 + x$.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Zapisz za pomocą równań, używając litery $x$ jako szukanej liczby. a) Liczba zwiększona o $8$ daje $31$. b) Liczba pomnożona przez $5$ daje $40$. c) Liczba podzielona przez $4$ daje $7$. d) Liczba zmniejszona o $4$ daje $10$. **Zapisz równania.**",
          rozwiazanie: "a) Do $x$ dodajemy $8$ i dostajemy $31$: $x + 8 = 31$.\n\nb) Liczbę $x$ mnożymy przez $5$ i dostajemy $40$: $5x = 40$.\n\nc) Liczbę $x$ dzielimy przez $4$ i dostajemy $7$: $x : 4 = 7$ (można też zapisać $\\frac{x}{4} = 7$).\n\nd) Od $x$ odejmujemy $4$ i dostajemy $10$: $x - 4 = 10$.\n\nOdpowiedź: a) $x + 8 = 31$, b) $5x = 40$, c) $x : 4 = 7$, d) $x - 4 = 10$.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "W klasie jest $x$ dziewcząt i $12$ chłopców. Wszystkich uczniów w klasie jest $27$. Zapisz równanie opisujące tę sytuację i sprawdź, czy $15$ jest jego rozwiązaniem. **Zapisz obliczenia.**",
          rozwiazanie: "Litera $x$ oznacza liczbę dziewcząt. Liczba wszystkich uczniów to dziewczęta i chłopcy razem, więc $x + 12 = 27$.\n\nSprawdzamy $x = 15$: lewa strona $15 + 12 = 27$, prawa strona $27$. Obie strony są równe.\n\nOdpowiedź: Równanie ma postać $x + 12 = 27$, a liczba $15$ jest jego rozwiązaniem (w klasie jest $15$ dziewcząt).",
        },
      ],
      generatory: [
        {
          id: "zapis-rownania",
          nazwa: "Zapis równania",
          opis: "Z krótkiego zdania o liczbie $x$ wybierz właściwe równanie.",
          generuj(r) {
            const rodz = r.pick(["dod", "ode", "mno", "dzi", "odj", "dzo"]);
            let a, b;
            if (rodz === "mno" || rodz === "dzi") { a = r.int(2, 9); b = r.int(2, 12); }
            else if (rodz === "odj") { a = r.int(10, 30); b = r.int(1, a - 1); }
            else if (rodz === "dzo") { a = r.int(2, 9) * r.int(2, 9); b = r.int(2, 9); }
            else { a = r.int(2, 20); b = r.int(a + 1, 40); }
            const pula = {
              dod: `x + ${a} = ${b}`, ode: `x - ${a} = ${b}`, mno: `${a}x = ${b}`,
              dzi: `x : ${a} = ${b}`, odj: `${a} - x = ${b}`, dzo: `${a} : x = ${b}`,
            };
            const zdania = {
              dod: [`Liczba $x$ zwiększona o $${a}$ daje $${b}$.`, `Gdy do liczby $x$ dodamy $${a}$, otrzymamy $${b}$.`],
              ode: [`Liczba $x$ zmniejszona o $${a}$ daje $${b}$.`, `Gdy od liczby $x$ odejmiemy $${a}$, otrzymamy $${b}$.`],
              mno: [`Liczba $x$ pomnożona przez $${a}$ daje $${b}$.`, `Iloczyn liczb $${a}$ i $x$ jest równy $${b}$.`],
              dzi: [`Liczba $x$ podzielona przez $${a}$ daje $${b}$.`, `Iloraz liczby $x$ przez $${a}$ jest równy $${b}$.`],
              odj: [`Gdy od liczby $${a}$ odejmiemy $x$, otrzymamy $${b}$.`, `Różnica liczb $${a}$ i $x$ jest równa $${b}$.`],
              dzo: [`Liczba $${a}$ podzielona przez $x$ daje $${b}$.`, `Iloraz liczb $${a}$ i $x$ jest równy $${b}$.`],
            };
            const dzialanie = {
              dod: `do $x$ dodajemy $${a}$, czyli $x + ${a}$`,
              ode: `od $x$ odejmujemy $${a}$, czyli $x - ${a}$`,
              mno: `$x$ mnożymy przez $${a}$, czyli $${a}x$`,
              dzi: `$x$ dzielimy przez $${a}$, czyli $x : ${a}$`,
              odj: `od $${a}$ odejmujemy $x$, czyli $${a} - x$`,
              dzo: `$${a}$ dzielimy przez $x$, czyli $${a} : x$`,
            };
            const zle = r.shuffle(Object.keys(pula).filter((k) => k !== rodz)).slice(0, 3);
            const opcje = r.shuffle([rodz, ...zle]);
            return {
              tresc: `${r.pick(zdania[rodz])} Które równanie opisuje tę sytuację?`,
              pola: [{ id: "r", typ: "wybor", etykieta: "Właściwe równanie", opcje: opcje.map((k) => `$${pula[k]}$`) }],
              odpowiedz: { r: opcje.indexOf(rodz) },
              wynik: `$${pula[rodz]}$`,
              rozwiazanie: [
                `Szukaną liczbę oznaczamy literą $x$.`,
                `Z treści: ${dzialanie[rodz]}.`,
                `Słowa „daje”, „jest równa”, „jest równy”, „otrzymamy” zamieniamy na znak $=$ i wpisujemy po nim wynik $${b}$.`,
                `Zatem równanie to $${pula[rodz]}$.`,
              ],
            };
          },
        },
        {
          id: "wartosc-wyrazenia",
          nazwa: "Wartość wyrażenia",
          opis: "Oblicz wartość wyrażenia z literą $x$ dla podanej liczby.",
          generuj(r) {
            const rodz = r.pick(["plus", "minus", "dzielenie", "przod"]);
            const a = r.int(2, 9), b = r.int(1, 12);
            let c, tekst, podst, kroki, wartosc;
            if (rodz === "plus") {
              c = r.int(2, 9); tekst = `${a}x + ${b}`; wartosc = a * c + b;
              podst = `${a} \\cdot ${c} + ${b}`;
              kroki = [`Najpierw mnożymy: $${a} \\cdot ${c} = ${a * c}$.`, `Potem dodajemy: $${a * c} + ${b} = ${wartosc}$.`];
            } else if (rodz === "minus") {
              c = r.int(3, 9);
              const bb = r.int(1, Math.min(12, a * c - 1));
              tekst = `${a}x - ${bb}`; wartosc = a * c - bb;
              podst = `${a} \\cdot ${c} - ${bb}`;
              kroki = [`Najpierw mnożymy: $${a} \\cdot ${c} = ${a * c}$.`, `Potem odejmujemy: $${a * c} - ${bb} = ${wartosc}$.`];
            } else if (rodz === "dzielenie") {
              const k = r.int(2, 9); c = a * k; tekst = `x : ${a} + ${b}`; wartosc = k + b;
              podst = `${c} : ${a} + ${b}`;
              kroki = [`Najpierw dzielimy: $${c} : ${a} = ${k}$.`, `Potem dodajemy: $${k} + ${b} = ${wartosc}$.`];
            } else {
              c = r.int(2, 9); tekst = `${b} + ${a}x`; wartosc = b + a * c;
              podst = `${b} + ${a} \\cdot ${c}`;
              kroki = [`Najpierw mnożymy: $${a} \\cdot ${c} = ${a * c}$.`, `Potem dodajemy: $${b} + ${a * c} = ${wartosc}$.`];
            }
            // w treści wyrażenie z dzieleniem zapisujemy też ułamkiem
            const wyr = rodz === "dzielenie" && r.chance(0.5) ? `${fr("x", a)} + ${b}` : tekst;
            return {
              tresc: `Oblicz wartość wyrażenia $${wyr}$ dla $x = ${c}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Wartość wyrażenia" }],
              odpowiedz: { w: wartosc },
              wynik: `$${wartosc}$`,
              rozwiazanie: [`W miejsce $x$ wstawiamy $${c}$: $${podst}$.`, ...kroki],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "sprawdzanie-rozwiazania",
      nazwa: "Sprawdzanie rozwiązania",
      sciaga: [
        {
          nazwa: "Rozwiązanie równania",
          slownie: "Rozwiązaniem równania jest liczba, która wstawiona w miejsce $x$ daje równe strony. Mówimy, że ta liczba spełnia równanie.",
          tex: "L = P",
          litery: "$L$ – wartość lewej strony, $P$ – wartość prawej strony.",
          przyklad: "Czy $x = 6$ spełnia równanie $2x + 3 = 15$? Lewa strona: $2 \\cdot 6 + 3 = 15$. Prawa strona to $15$. Strony są równe, więc tak.",
        },
        {
          nazwa: "Jak sprawdzić liczbę",
          slownie: "Wstawiamy liczbę za $x$ i liczymy osobno lewą stronę i osobno prawą. Potem porównujemy wyniki.",
          przyklad: "Równanie $x + 9 = 15$ i liczba $5$. Lewa strona: $5 + 9 = 14$. Prawa strona: $15$. Wyniki są różne, więc $5$ nie jest rozwiązaniem.",
          uwaga: "Zawsze licz obie strony. Wystarczy jedna różnica, żeby liczba nie była rozwiązaniem.",
        },
        {
          nazwa: "Sprawdzenie własnego wyniku",
          slownie: "Po rozwiązaniu równania wstawiamy otrzymaną liczbę do równania. Jeśli strony wyszły równe, wynik jest dobry. Jeśli nie, szukamy błędu.",
          tex: "x = 6:\\quad L = 2 \\cdot 6 + 3 = 15 = P",
          przyklad: "Z równania $3x = 21$ wyszło $x = 7$. Sprawdzamy: $3 \\cdot 7 = 21$, prawa strona to $21$. Zgadza się.",
        },
      ],
      jak: [
        "Wstaw podaną liczbę w miejsce $x$ po lewej stronie i policz ją.",
        "Policz prawą stronę równania.",
        "Porównaj oba wyniki. Gdy są równe, liczba jest rozwiązaniem. Gdy różne, nie jest.",
        "Rozwiązując równanie, zawsze sprawdź na końcu swój wynik w ten sam sposób.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Która liczba jest rozwiązaniem równania $x + 8 = 20$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$28$", "$12$", "$160$", "$8$"],
          poprawna: 1,
        },
        {
          nr: "9",
          tresc: "Która z liczb spełnia równanie $3x = 24$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$72$", "$21$", "$27$", "$8$"],
          poprawna: 3,
        },
        {
          nr: "10",
          tresc: "Dla której liczby równość $2x + 4 = 18$ jest prawdziwa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$9$", "$22$", "$14$"],
          poprawna: 0,
        },
        {
          nr: "11",
          tresc: "Sprawdzamy, czy liczba $4$ jest rozwiązaniem równania $5x - 6 = 14$. Jakie wartości mają lewa i prawa strona po wstawieniu $x = 4$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$L = 20$, $P = 14$", "$L = 26$, $P = 14$", "$L = 14$, $P = 14$", "$L = 9$, $P = 14$"],
          poprawna: 2,
        },
        {
          nr: "12",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Liczba $6$ jest rozwiązaniem równania $x + 9 = 15$.", litery: "PF", poprawna: 0 },
            { tekst: "Liczba $5$ jest rozwiązaniem równania $4x = 24$.", litery: "PF", poprawna: 1 },
            { tekst: "Liczba $12$ jest rozwiązaniem równania $x : 3 = 4$.", litery: "PF", poprawna: 0 },
            { tekst: "Liczba $7$ jest rozwiązaniem równania $2x - 1 = 15$.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Która z liczb $3$, $5$, $8$ jest rozwiązaniem równania $4x - 7 = 13$? **Zapisz obliczenia.**",
          rozwiazanie: "Wstawiamy kolejno liczby w miejsce $x$ po lewej stronie. Prawa strona to $13$.\n\nDla $x = 3$: $4 \\cdot 3 - 7 = 12 - 7 = 5$, a to nie jest $13$.\n\nDla $x = 5$: $4 \\cdot 5 - 7 = 20 - 7 = 13$, a to jest $13$.\n\nDla $x = 8$: $4 \\cdot 8 - 7 = 32 - 7 = 25$, a to nie jest $13$.\n\nOdpowiedź: Rozwiązaniem jest liczba $5$.",
        },
        {
          nr: "14",
          punkty: 1,
          tresc: "Ola twierdzi, że liczba $9$ jest rozwiązaniem równania $x : 3 + 2 = 6$. Czy Ola ma rację? **Zapisz sprawdzenie.**",
          rozwiazanie: "Wstawiamy $x = 9$ do lewej strony: $9 : 3 + 2 = 3 + 2 = 5$.\n\nPrawa strona to $6$. Ponieważ $5 \\neq 6$, liczba $9$ nie spełnia równania.\n\nOdpowiedź: Ola nie ma racji.",
        },
      ],
      generatory: [
        {
          id: "ktora-liczba-spelnia",
          nazwa: "Która liczba spełnia",
          opis: "Spośród czterech liczb wybierz tę, która jest rozwiązaniem równania.",
          generuj(r) {
            const eq = rownanie(r, r.pick(WSZYSTKIE));
            const pula = [...eq.zle, eq.x + 1, eq.x - 1, eq.x + 2, eq.x - 2, 2 * eq.x];
            const zle = [];
            for (const v of pula) {
              if (Number.isInteger(v) && v >= 1 && v <= 150 && v !== eq.x && !zle.includes(v) && zle.length < 3) zle.push(v);
            }
            const liczby = r.shuffle([eq.x, ...zle]);
            // do pokazania w rozwiązaniu bierzemy złą liczbę, dla której lewa strona wychodzi liczbą naturalną (bez -0.25 itp.)
            const inna = zle.find((v) => { const w = eq.L(v).val; return Number.isInteger(w) && w >= 0; });
            const li = inna === undefined ? null : eq.L(inna), ls = eq.L(eq.x);
            return {
              tresc: `Która z liczb ${liczby.map((v) => `$${v}$`).join(", ")} spełnia równanie $${eq.tex}$?`,
              pola: [{ id: "l", typ: "wybor", etykieta: "Liczba spełniająca równanie", opcje: liczby.map((v) => `$${v}$`) }],
              odpowiedz: { l: liczby.indexOf(eq.x) },
              wynik: `$${eq.x}$`,
              rozwiazanie: [
                `Wstawiamy kolejne liczby w miejsce $x$ i porównujemy strony: $L$ (lewa) i $P$ (prawa).`,
                `Dla $x = ${eq.x}$: $L = ${ls.txt} = ${ls.val}$, a $P = ${eq.P.val}$. Strony są równe.`,
                li
                  ? `Dla $x = ${inna}$: $L = ${li.txt} = ${li.val}$, a $P = ${eq.P.val}$. Strony są różne, więc ta liczba nie pasuje (pozostałe też nie).`
                  : `Dla pozostałych liczb lewa strona nie jest równa $${eq.P.val}$, więc one nie pasują.`,
              ],
            };
          },
        },
        {
          id: "czy-spelnia",
          nazwa: "Czy liczba spełnia",
          opis: "Sprawdź, czy podana liczba jest rozwiązaniem równania, i odpowiedz „tak” albo „nie”.",
          generuj(r) {
            const eq = rownanie(r, r.pick(WSZYSTKIE));
            let tak = r.chance(0.5);
            let c = eq.x;
            if (!tak) {
              // tylko liczby, dla których lewa strona wychodzi liczbą naturalną (bez -0.25 itp.)
              const kand = [...eq.zle, eq.x + 1, eq.x - 1, eq.x + 2].filter((v) => {
                const w = Number.isInteger(v) && v >= 1 && v <= 150 && v !== eq.x ? eq.L(v).val : NaN;
                return Number.isInteger(w) && w >= 0;
              });
              if (kand.length) c = r.pick(kand);
              else tak = true;
            }
            const l = eq.L(c);
            return {
              tresc: `Czy liczba $${c}$ jest rozwiązaniem równania $${eq.tex}$?`,
              pola: [{ id: "o", typ: "wybor", etykieta: "Odpowiedź", opcje: ["tak", "nie"] }],
              odpowiedz: { o: tak ? 0 : 1 },
              wynik: tak ? "tak" : "nie",
              rozwiazanie: [
                `Wstawiamy $${c}$ w miejsce $x$ po lewej stronie: $L = ${l.txt} = ${l.val}$.`,
                `Prawa strona: $P = ${eq.P.val}$.`,
                tak ? `Strony są równe ($${l.val} = ${eq.P.val}$), więc liczba $${c}$ jest rozwiązaniem.` : `Strony są różne ($${l.val} \\neq ${eq.P.val}$), więc liczba $${c}$ nie jest rozwiązaniem.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "jak-rozwiazac-rownanie",
      nazwa: "Jak rozwiązać równanie",
      sciaga: [
        {
          nazwa: "Działanie odwrotne",
          slownie: "Cofamy się od końca. Dodawanie odwracamy odejmowaniem, odejmowanie dodawaniem, mnożenie dzieleniem, a dzielenie mnożeniem.",
          tex: "x+a=b\\Rightarrow x=b-a\\qquad x-a=b\\Rightarrow x=b+a\\qquad ax=b\\Rightarrow x=b:a\\qquad x:a=b\\Rightarrow x=b\\cdot a",
          litery: "$a$, $b$ – liczby z równania.",
          przyklad: "Z $x + 7 = 15$ mamy $x = 15 - 7 = 8$. Z $3x = 21$ mamy $x = 21 : 3 = 7$. Z $\\frac{x}{4} = 6$ mamy $x = 6 \\cdot 4 = 24$.",
          uwaga: "W $3x = 21$ dzielimy przez $3$, a nie mnożymy. Wynik $63$ jest błędny.",
        },
        {
          nazwa: "Waga: to samo po obu stronach",
          slownie: "Równanie jest jak waga w równowadze. Gdy z obu stron dodamy albo odejmiemy tę samą liczbę, waga nadal jest w równowadze.",
          tex: "x+7-7=15-7",
          przyklad: "W równaniu $x + 7 = 15$ odejmujemy $7$ od obu stron: $x + 7 - 7 = 15 - 7$, czyli $x = 8$.",
          uwaga: "Odejmujemy (albo dodajemy) po obu stronach znaku $=$, nie tylko po jednej.",
        },
        {
          nazwa: "Niewiadoma po minusie lub dzieleniu",
          slownie: "Gdy $x$ jest odjemnikiem albo dzielnikiem, myślimy: ile odjęto albo przez ile dzielono. Zamieniamy to na działanie, którego wynikiem jest $x$.",
          tex: "a-x=b\\Rightarrow x=a-b\\qquad a:x=b\\Rightarrow x=a:b",
          litery: "$a$, $b$ – liczby z równania.",
          przyklad: "W $12 - x = 5$ od $12$ odjęto $x$ i zostało $5$. Zatem $x = 12 - 5 = 7$.",
          uwaga: "W $12 - x = 5$ nie liczymy $5 - 12$. Przy odejmowaniu i dzieleniu kolejność ma znaczenie.",
        },
        {
          nazwa: "Wynik nie zawsze jest naturalny",
          slownie: "Rozwiązaniem może być też ułamek, ułamek dziesiętny albo liczba ujemna. Sposób rozwiązywania jest ten sam.",
          przyklad: "Z $4x = 10$ mamy $x = 10 : 4 = 2{,}5$. Z $x + 8 = 3$ mamy $x = 3 - 8 = -5$.",
          uwaga: "Rozwiązanie sprawdzamy zawsze: $4 \\cdot 2{,}5 = 10$, więc zgadza się.",
        },
      ],
      jak: [
        "Zobacz, co zrobiono z niewiadomą $x$: dodano, odjęto, pomnożono czy podzielono.",
        "Cofnij to działanie za pomocą działania odwrotnego i policz $x$ (albo dodaj lub odejmij tę samą liczbę po obu stronach).",
        "Zapisz wynik w postaci $x = \\dots$.",
        "Sprawdź wynik: wstaw go do równania i porównaj obie strony.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Rozwiąż równanie $x + 13 = 40$. Ile wynosi $x$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$53$", "$37$", "$520$", "$27$"],
          poprawna: 3,
        },
        {
          nr: "16",
          tresc: "Rozwiąż równanie $x - 9 = 14$. Ile wynosi $x$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$23$", "$5$", "$126$", "$-5$"],
          poprawna: 0,
        },
        {
          nr: "17",
          tresc: "Rozwiąż równanie $6x = 54$. Ile wynosi $x$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$48$", "$60$", "$9$", "$324$"],
          poprawna: 2,
        },
        {
          nr: "18",
          tresc: "Rozwiąż równanie $x : 5 = 8$. Ile wynosi $x$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$13$", "$1{,}6$", "$40$"],
          poprawna: 3,
        },
        {
          nr: "19",
          tresc: "Rozwiąż równanie $20 - x = 8$. Ile wynosi $x$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-12$", "$12$", "$28$", "$160$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Rozwiąż równania i sprawdź rozwiązania. a) $x - 18 = 27$ b) $8x = 96$ c) $45 - x = 19$ **Zapisz obliczenia.**",
          rozwiazanie: "a) Od $x$ odjęto $18$. Cofamy się: $x = 27 + 18 = 45$. Sprawdzenie: $45 - 18 = 27$.\n\nb) $x$ pomnożono przez $8$. Cofamy się: $x = 96 : 8 = 12$. Sprawdzenie: $8 \\cdot 12 = 96$.\n\nc) Od $45$ odjęto $x$ i zostało $19$. Zatem $x = 45 - 19 = 26$. Sprawdzenie: $45 - 26 = 19$.\n\nOdpowiedź: a) $x = 45$, b) $x = 12$, c) $x = 26$.",
        },
        {
          nr: "21",
          punkty: 2,
          tresc: "Rozwiąż równanie $x + 4{,}7 = 9{,}2$, odejmując tę samą liczbę od obu stron. Sprawdź rozwiązanie. **Zapisz obliczenia.**",
          rozwiazanie: "Odejmujemy $4{,}7$ od obu stron równania: $x + 4{,}7 - 4{,}7 = 9{,}2 - 4{,}7$.\n\nStąd $x = 4{,}5$.\n\nSprawdzenie: $4{,}5 + 4{,}7 = 9{,}2$, czyli lewa strona jest równa prawej.\n\nOdpowiedź: $x = 4{,}5$.",
        },
      ],
      generatory: [
        {
          id: "proste-rownanie",
          nazwa: "Proste równanie",
          opis: "Rozwiąż równanie z jednym działaniem (dodawanie, odejmowanie, mnożenie albo dzielenie).",
          generuj(r) {
            const rodz = r.pick(["dod", "dod", "ode", "ode", "mno", "dzi", "odj", "dzo"]);
            const ujemne = rodz === "dod" && r.chance(0.12);
            const waga = (rodz === "dod" || rodz === "ode") && r.chance(0.4);
            const eq = rownanie(r, rodz, { ujemne, waga });
            return {
              tresc: r.pick([`Rozwiąż równanie $${eq.tex}$.`, `Oblicz, ile wynosi $x$ w równaniu $${eq.tex}$.`]),
              pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }],
              odpowiedz: { x: eq.x },
              wynik: `$x = ${eq.x}$`,
              rozwiazanie: [...eq.kr, sprawdzenie(eq)],
            };
          },
        },
        {
          id: "rownanie-dziesietne",
          nazwa: "Równanie z dziesiętnymi",
          opis: "Rozwiąż równanie z ułamkami dziesiętnymi. Wynik wpisz jako ułamek dziesiętny.",
          generuj(r) {
            const rodz = r.pick(["dod", "ode", "mno", "dzi", "odj"]);
            const nie10 = (t) => t % 10 !== 0;
            let tex, X, kr, spr;
            if (rodz === "dod") {
              let A, W;
              do { A = r.int(11, 59); W = r.int(11, 59); } while (!nie10(A) || !nie10(W));
              X = W; const B = A + W;
              tex = `x + ${dz(A)} = ${dz(B)}`;
              kr = [`Do $x$ dodano $${dz(A)}$ i otrzymano $${dz(B)}$. Cofamy się: odejmujemy.`, `$x = ${dz(B)} - ${dz(A)} = ${dz(X)}$.`];
              spr = `${dz(X)} + ${dz(A)} = ${dz(B)}`;
            } else if (rodz === "ode") {
              let A, B;
              do { A = r.int(11, 59); B = r.int(11, 59); } while (!nie10(A) || !nie10(B));
              X = A + B;
              tex = `x - ${dz(A)} = ${dz(B)}`;
              kr = [`Od $x$ odjęto $${dz(A)}$ i otrzymano $${dz(B)}$. Cofamy się: dodajemy.`, `$x = ${dz(B)} + ${dz(A)} = ${dz(X)}$.`];
              spr = `${dz(X)} - ${dz(A)} = ${dz(B)}`;
            } else if (rodz === "mno") {
              const a = r.int(2, 9);
              do { X = r.int(6, 59); } while (!nie10(X));
              const B = a * X;
              tex = `${a}x = ${dz(B)}`;
              kr = [`Liczbę $x$ pomnożono przez $${a}$ i otrzymano $${dz(B)}$. Cofamy się: dzielimy.`, `$x = ${dz(B)} : ${a} = ${dz(X)}$.`];
              spr = `${a} \\cdot ${dz(X)} = ${dz(B)}`;
            } else if (rodz === "dzi") {
              const a = r.int(2, 9);
              let B;
              do { B = r.int(6, 59); } while (!nie10(B));
              X = a * B;
              tex = `x : ${a} = ${dz(B)}`;
              kr = [`Liczbę $x$ podzielono przez $${a}$ i otrzymano $${dz(B)}$. Cofamy się: mnożymy.`, `$x = ${dz(B)} \\cdot ${a} = ${dz(X)}$.`];
              spr = `${dz(X)} : ${a} = ${dz(B)}`;
            } else {
              let A, B;
              do { A = r.int(31, 99); X = r.int(11, A - 11); B = A - X; } while (!nie10(A) || !nie10(X) || !nie10(B));
              tex = `${dz(A)} - x = ${dz(B)}`;
              kr = [`Od $${dz(A)}$ odjęto $x$ i zostało $${dz(B)}$. Szukamy liczby, którą odjęto.`, `$x = ${dz(A)} - ${dz(B)} = ${dz(X)}$.`];
              spr = `${dz(A)} - ${dz(X)} = ${dz(B)}`;
            }
            return {
              tresc: `Rozwiąż równanie $${tex}$.`,
              pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }],
              odpowiedz: { x: q(X, 10) },
              wynik: `$x = ${dz(X)}$`,
              rozwiazanie: [...kr, `Sprawdzenie: $${spr}$, zgadza się.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "trudniejsze-rownania",
      nazwa: "Trudniejsze równania",
      sciaga: [
        {
          nazwa: "Dwa działania przy niewiadomej",
          slownie: "Gdy przy $x$ są dwa działania, cofamy je po kolei, od ostatniego do pierwszego. Najpierw cofamy dodawanie lub odejmowanie, potem mnożenie lub dzielenie.",
          tex: "2x+5=17\\qquad 2x=17-5=12\\qquad x=12:2=6",
          przyklad: "W $2x + 5 = 17$ na końcu dodano $5$, więc odejmujemy: $2x = 12$. Potem dzielimy przez $2$: $x = 6$. Sprawdzenie: $2 \\cdot 6 + 5 = 17$.",
          uwaga: "Nie dziel od razu całej prawej strony. Z $2x + 5 = 17$ nie wychodzi $17 : 2$.",
        },
        {
          nazwa: "Niewiadoma podzielona przez liczbę",
          slownie: "Gdy $x$ jest dzielone przez liczbę, na końcu cofamy dzielenie i mnożymy przez tę liczbę.",
          tex: "\\frac{x}{4}+3=8\\qquad \\frac{x}{4}=5\\qquad x=5\\cdot4=20",
          przyklad: "W $\\frac{x}{4} + 3 = 8$ odejmujemy $3$ i mamy $\\frac{x}{4} = 5$. Potem mnożymy przez $4$: $x = 20$.",
          uwaga: "Przy $\\frac{x}{4}$ mnożymy przez $4$, a nie dzielimy.",
        },
        {
          nazwa: "Liczenie jednej strony",
          slownie: "Gdy po jednej stronie równania są same liczby, najpierw je liczymy. Dopiero potem rozwiązujemy równanie.",
          przyklad: "$4x = 7 + 9$. Liczymy prawą stronę: $4x = 16$. Dzielimy: $x = 16 : 4 = 4$.",
        },
        {
          nazwa: "Ułamki i liczby dziesiętne",
          slownie: "Sposób jest ten sam, tylko liczby są inne. Przy ułamkach zwykłych dodajemy i odejmujemy po sprowadzeniu do wspólnego mianownika.",
          przyklad: "$x + \\frac{1}{4} = \\frac{3}{4}$, więc $x = \\frac{3}{4} - \\frac{1}{4} = \\frac{2}{4} = \\frac{1}{2}$. Z $x - 1{,}5 = 3{,}2$ mamy $x = 3{,}2 + 1{,}5 = 4{,}7$.",
          uwaga: "Wspólnego mianownika szukamy tylko przy dodawaniu i odejmowaniu ułamków.",
        },
      ],
      jak: [
        "Policz stronę, po której są same liczby.",
        "Cofnij ostatnie działanie przy $x$: dodawanie lub odejmowanie.",
        "Cofnij pierwsze działanie przy $x$: mnożenie lub dzielenie.",
        "Sprawdź wynik, wstawiając go do równania.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Rozwiąż równanie $2x + 5 = 17$. Ile wynosi $x$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$", "$8{,}5$", "$3{,}5$", "$6$"],
          poprawna: 3,
        },
        {
          nr: "23",
          tresc: "Rozwiąż równanie $4x - 3 = 21$. Ile wynosi $x$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4{,}5$", "$6$", "$24$", "$96$"],
          poprawna: 1,
        },
        {
          nr: "24",
          tresc: "Rozwiąż równanie $\\frac{x}{3} + 4 = 9$. Ile wynosi $x$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$39$", "$5$", "$15$", "$\\frac{13}{3}$"],
          poprawna: 2,
        },
        {
          nr: "25",
          tresc: "Rozwiąż równanie $5x + 6 = 3 \\cdot 7 + 5$. Ile wynosi $x$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$26$", "$5{,}2$", "$32$"],
          poprawna: 0,
        },
        {
          nr: "26",
          tresc: "Rozwiąż równanie $x + \\frac{2}{5} = \\frac{9}{10}$. Ile wynosi $x$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{7}{10}$", "$\\frac{1}{2}$", "$1\\frac{3}{10}$", "$\\frac{7}{5}$"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Rozwiąż równanie $6x - 7 = 29$ i sprawdź rozwiązanie. **Zapisz obliczenia.**",
          rozwiazanie: "Na końcu od $6x$ odjęto $7$. Cofamy się i dodajemy $7$ do $29$: $6x = 29 + 7 = 36$.\n\nTeraz dzielimy przez $6$: $x = 36 : 6 = 6$.\n\nSprawdzenie: $6 \\cdot 6 - 7 = 36 - 7 = 29$, czyli lewa strona jest równa prawej.\n\nOdpowiedź: $x = 6$.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "Rozwiąż równanie $\\frac{x}{5} - 3 = 4$ i sprawdź rozwiązanie. **Zapisz obliczenia.**",
          rozwiazanie: "Na końcu od $\\frac{x}{5}$ odjęto $3$. Cofamy się i dodajemy $3$ do $4$: $\\frac{x}{5} = 4 + 3 = 7$.\n\nTeraz mnożymy przez $5$: $x = 7 \\cdot 5 = 35$.\n\nSprawdzenie: $35 : 5 - 3 = 7 - 3 = 4$, czyli lewa strona jest równa prawej.\n\nOdpowiedź: $x = 35$.",
        },
      ],
      generatory: [
        {
          id: "dwa-dzialania",
          nazwa: "Dwa działania",
          opis: "Rozwiąż równanie, w którym przy $x$ są dwa działania, na przykład $2x + 5 = 17$.",
          generuj(r) {
            const eq = rownanie(r, r.pick(["dwa1", "dwa1", "dwa2", "dwa2", "dwa3", "dwa4"]), { prawa: r.chance(0.25) });
            return {
              tresc: r.pick([`Rozwiąż równanie $${eq.tex}$.`, `Oblicz $x$ z równania $${eq.tex}$.`]),
              pola: [{ id: "x", typ: "liczba", etykieta: "$x =$" }],
              odpowiedz: { x: eq.x },
              wynik: `$x = ${eq.x}$`,
              rozwiazanie: [...eq.kr, sprawdzenie(eq)],
            };
          },
        },
        {
          id: "rownanie-ulamkowe",
          nazwa: "Równanie z ułamkami",
          opis: "Rozwiąż równanie z ułamkami zwykłymi (dodawanie lub odejmowanie). Wynik wpisz jako ułamek, np. 1/2, albo liczbę całkowitą.",
          generuj(r) {
            const rodz = r.pick(["dod", "ode", "odj"]);
            const D = r.pick([4, 6, 8, 10, 12]);
            const dzielniki = [];
            for (let k = 2; k <= D; k++) if (D % k === 0) dzielniki.push(k);
            const losuj = () => { const k = r.pick(dzielniki); return q(r.int(1, k - 1), k); };
            let A, B, X, tex, op;
            if (rodz === "dod") {          // x + A = B
              A = losuj(); X = losuj(); B = A.add(X);
              tex = `x + ${qm(A)} = ${qm(B)}`;
              op = [`Do $x$ dodano $${qm(A)}$ i otrzymano $${qm(B)}$. Cofamy się: odejmujemy.`, B, A, "-"];
            } else if (rodz === "ode") {   // x - A = B
              A = losuj(); B = losuj(); X = A.add(B);
              tex = `x - ${qm(A)} = ${qm(B)}`;
              op = [`Od $x$ odjęto $${qm(A)}$ i otrzymano $${qm(B)}$. Cofamy się: dodajemy.`, B, A, "+"];
            } else {                       // A - x = B
              X = losuj(); B = losuj(); A = X.add(B);
              tex = `${qm(A)} - x = ${qm(B)}`;
              op = [`Od $${qm(A)}$ odjęto $x$ i zostało $${qm(B)}$. Szukamy liczby, którą odjęto.`, A, B, "-"];
            }
            const [opis, P1, P2, znak] = op;
            // wspólny mianownik: najmniejsza wspólna wielokrotność mianowników działania (np. dla 1 - 1/2 to 2, a nie 4)
            const nwd = (a, b) => (b ? nwd(b, a % b) : a);
            const M = (P1.d * P2.d) / nwd(P1.d, P2.d);
            const licz = (v) => v.n * (M / v.d);
            const wynikN = znak === "-" ? licz(P1) - licz(P2) : licz(P1) + licz(P2);
            const zapis1 = `${qm(P1)} ${znak} ${qm(P2)}`;
            return {
              tresc: `Rozwiąż równanie $${tex}$.`,
              pola: [{ id: "x", typ: "liczba", etykieta: "$x =$ (ułamek lub liczba całkowita)" }],
              odpowiedz: { x: X },
              wynik: `$x = ${qm(X)}$`,
              rozwiazanie: [
                opis,
                `$x = ${zapis1}$. Wspólny mianownik to $${M}$: $x = ${fr(licz(P1), M)} ${znak} ${fr(licz(P2), M)} = ${lancuch(wynikN, M)}$.`,
                `Sprawdzenie: ${rodz === "odj" ? `$${qm(A)} - ${qm(X)} = ${qm(B)}$` : rodz === "dod" ? `$${qm(X)} + ${qm(A)} = ${qm(B)}$` : `$${qm(X)} - ${qm(A)} = ${qm(B)}$`}, zgadza się.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "zadania-tekstowe-rownania",
      nazwa: "Zadania tekstowe",
      sciaga: [
        {
          nazwa: "Zadanie tekstowe z równaniem",
          slownie: "Najpierw opisujemy słowami, co oznacza $x$. Potem zapisujemy równanie, rozwiązujemy je, sprawdzamy wynik z treścią zadania i piszemy odpowiedź zdaniem.",
          przyklad: "Marta miała $x$ zł. Po dołożeniu $15$ zł ma $42$ zł. Oznaczmy przez $x$ liczbę złotych, które miała Marta. Równanie: $x + 15 = 42$. Stąd $x = 42 - 15 = 27$. Sprawdzenie: $27 + 15 = 42$. Odpowiedź: Marta miała $27$ zł.",
          uwaga: "Pisz, co oznacza $x$ (z jednostką). Samo „$x$ – cena” nie wystarczy, napisz „cena zeszytu w złotych”.",
        },
        {
          nazwa: "Typowe sytuacje",
          slownie: "Zakupy: liczba sztuk razy cena plus reszta. Obwód: suma wszystkich boków. Podział po równo: dzielimy przez liczbę osób. Dołożenie lub wydanie: dodawanie albo odejmowanie.",
          tex: "3x+4=19",
          litery: "$x$ – cena jednej sztuki w złotych.",
          przyklad: "Trzy jednakowe zeszyty i długopis za $4$ zł kosztują $19$ zł. Cena zeszytu to $x$ zł, więc $3x + 4 = 19$. Stąd $3x = 15$ i $x = 5$.",
        },
        {
          nazwa: "Sprawdzenie z treścią",
          slownie: "Wynik sprawdzamy w treści zadania, a nie tylko w równaniu. Sprawdzamy też, czy liczba ma sens: liczba osób jest naturalna, a cena nie jest ujemna.",
          przyklad: "Gdy w zadaniu o liczbie uczniów wyjdzie $x = 2{,}5$, to wynik jest zły. Szukamy błędu w równaniu albo w obliczeniach.",
        },
      ],
      jak: [
        "Przeczytaj zadanie i zapisz, czego szukasz: „Oznaczmy przez $x$ …”.",
        "Zapisz równanie na podstawie treści.",
        "Rozwiąż równanie działaniami odwrotnymi.",
        "Sprawdź wynik w treści zadania i napisz odpowiedź zdaniem.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Liczbę $x$ pomnożono przez $4$ i do wyniku dodano $6$. Otrzymano $30$. Które równanie opisuje tę sytuację? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4 + 6x = 30$", "$x + 4 + 6 = 30$", "$4x + 6 = 30$", "$4x - 6 = 30$"],
          poprawna: 2,
        },
        {
          nr: "30",
          tresc: "Cztery jednakowe zeszyty i teczka za $3$ zł kosztują razem $19$ zł. Ile złotych kosztuje jeden zeszyt? **Wybierz właściwą odpowiedź.**",
          opcje: ["$16$ zł", "$4$ zł", "$5{,}50$ zł", "$4{,}75$ zł"],
          poprawna: 1,
        },
        {
          nr: "31",
          tresc: "Obwód trójkąta równoramiennego wynosi $29$ cm, a jego podstawa ma $9$ cm. Ile centymetrów ma każde z ramion? **Wybierz właściwą odpowiedź.**",
          opcje: ["$20$ cm", "$14{,}5$ cm", "$38$ cm", "$10$ cm"],
          poprawna: 3,
        },
        {
          nr: "32",
          tresc: "Pewną liczbę podzielono przez $6$ i do wyniku dodano $5$. Otrzymano $12$. Jaka to liczba? **Wybierz właściwą odpowiedź.**",
          opcje: ["$42$", "$7$", "$102$", "$72$"],
          poprawna: 0,
        },
        {
          nr: "33",
          tresc: "Marek miał w skarbonce $x$ zł. Wydał $18$ zł i zostało mu $25$ zł. Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Równanie $x + 18 = 25$ opisuje tę sytuację.", litery: "PF", poprawna: 1 },
            { tekst: "Równanie $x - 18 = 25$ opisuje tę sytuację.", litery: "PF", poprawna: 0 },
            { tekst: "Marek miał na początku $7$ zł.", litery: "PF", poprawna: 1 },
            { tekst: "Marek miał na początku $43$ zł.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 3,
          tresc: "Basia ma $29$ naklejek. To o $5$ więcej niż dwa razy tyle, ile ma Jaś. Ile naklejek ma Jaś? **Zapisz obliczenia.**",
          rozwiazanie: "Oznaczmy przez $x$ liczbę naklejek Jasia.\n\nDwa razy tyle co Jaś to $2x$, a o $5$ więcej to $2x + 5$. Basia ma $29$ naklejek, więc $2x + 5 = 29$.\n\nCofamy dodawanie: $2x = 29 - 5 = 24$. Teraz dzielimy: $x = 24 : 2 = 12$.\n\nSprawdzenie: $2 \\cdot 12 + 5 = 29$.\n\nOdpowiedź: Jaś ma $12$ naklejek.",
        },
        {
          nr: "35",
          punkty: 3,
          tresc: "Obwód prostokąta jest równy $46$ cm. Jeden bok ma $8$ cm. Ile centymetrów ma drugi bok? **Zapisz obliczenia.**",
          rozwiazanie: "Oznaczmy przez $x$ długość drugiego boku w centymetrach.\n\nProstokąt ma dwa boki po $8$ cm i dwa boki po $x$ cm. Obwód to $2x + 2 \\cdot 8 = 46$, czyli $2x + 16 = 46$.\n\nOdejmujemy $16$: $2x = 46 - 16 = 30$. Dzielimy: $x = 30 : 2 = 15$.\n\nSprawdzenie: $2 \\cdot 15 + 2 \\cdot 8 = 30 + 16 = 46$.\n\nOdpowiedź: Drugi bok ma $15$ cm.",
        },
      ],
      generatory: [
        {
          id: "liczba-pomyslana",
          nazwa: "Szukana liczba",
          opis: "Zadanie o szukanej liczbie: zapisz równanie, rozwiąż je i podaj liczbę.",
          generuj(r) {
            const rodz = r.pick(["dwa1", "dwa2", "dwa3", "dwa4"]);
            const eq = rownanie(r, rodz);
            const { a, c, d } = eq;
            const tresci = {
              dwa1: [`Pewną liczbę pomnożono przez $${a}$ i do wyniku dodano $${c}$. Otrzymano $${d}$. Jaka to liczba?`, `Iloczyn pewnej liczby i $${a}$, zwiększony o $${c}$, jest równy $${d}$. Jaka to liczba?`],
              dwa2: [`Pewną liczbę pomnożono przez $${a}$ i od wyniku odjęto $${c}$. Otrzymano $${d}$. Jaka to liczba?`, `Iloczyn pewnej liczby i $${a}$, zmniejszony o $${c}$, jest równy $${d}$. Jaka to liczba?`],
              dwa3: [`Pewną liczbę podzielono przez $${a}$ i do wyniku dodano $${c}$. Otrzymano $${d}$. Jaka to liczba?`, `Iloraz pewnej liczby przez $${a}$, zwiększony o $${c}$, jest równy $${d}$. Jaka to liczba?`],
              dwa4: [`Pewną liczbę podzielono przez $${a}$ i od wyniku odjęto $${c}$. Otrzymano $${d}$. Jaka to liczba?`, `Iloraz pewnej liczby przez $${a}$, zmniejszony o $${c}$, jest równy $${d}$. Jaka to liczba?`],
            };
            return {
              tresc: r.pick(tresci[rodz]),
              pola: [{ id: "x", typ: "liczba", etykieta: "Szukana liczba" }],
              odpowiedz: { x: eq.x },
              wynik: `$${eq.x}$`,
              rozwiazanie: [
                `Oznaczmy przez $x$ szukaną liczbę.`,
                `Z treści zadania: $${eq.tex}$.`,
                eq.kr.join(" "),
                sprawdzenie(eq),
                `Odpowiedź: Szukana liczba to $${eq.x}$.`,
              ],
            };
          },
        },
        {
          id: "zadanie-z-zyciowa-sytuacja",
          nazwa: "Zadanie z życia",
          opis: "Zadanie tekstowe (zakupy, obwód, czytanie książki, skarbonka, podział po równo): zapisz równanie i podaj odpowiedź.",
          generuj(r) {
            const imie = r.pick(["Ola", "Kasia", "Ania", "Basia", "Marta", "Ewa", "Zosia"]);
            const rodz = r.pick(["zakupy", "trojkat", "prostokat", "ksiazka", "skarbonka", "podzial"]);
            let tresc, rownanieTex, ozn, krok, spr, odp, x, wynikTex;
            if (rodz === "zakupy") {
              const rzecz = r.pick([
                { jeden: "jeden zeszyt", gen: "zeszytu", m: ["zeszyty", "zeszytów"], dod: "teczkę" },
                { jeden: "jeden ołówek", gen: "ołówka", m: ["ołówki", "ołówków"], dod: "gumkę" },
                { jeden: "jeden długopis", gen: "długopisu", m: ["długopisy", "długopisów"], dod: "linijkę" },
                { jeden: "jedna zakładka", gen: "zakładki", m: ["zakładki", "zakładek"], dod: "temperówkę" },
              ]);
              const N = r.int(2, 9); x = r.int(2, 9); const c = r.int(2, 15); const d = N * x + c;
              tresc = `${imie} kupiła $${N}$ ${mn(N, "", "jednakowe", "jednakowych")} ${mn(N, "", rzecz.m[0], rzecz.m[1])} i ${rzecz.dod} za $${c}$ zł. Za wszystko zapłaciła $${d}$ zł. Ile złotych kosztuje ${rzecz.jeden}?`;
              ozn = `Oznaczmy przez $x$ cenę jednego ${rzecz.gen} w złotych.`.replace("jednego zakładki", "jednej zakładki");
              rownanieTex = `${N}x + ${c} = ${d}`;
              krok = `Od $${d}$ odejmujemy $${c}$: $${N}x = ${d} - ${c} = ${d - c}$. Dzielimy: $x = ${d - c} : ${N} = ${x}$.`;
              spr = `${N} \\cdot ${x} + ${c} = ${d}`;
              odp = `${rzecz.jeden[0].toUpperCase()}${rzecz.jeden.slice(1)} kosztuje $${x}$ zł.`;
              wynikTex = `$${x}$ zł`;
            } else if (rodz === "trojkat") {
              x = r.int(3, 20); const c = r.int(2, Math.min(20, 2 * x - 1)); const d = 2 * x + c;
              tresc = `Obwód trójkąta równoramiennego jest równy $${d}$ cm. Podstawa tego trójkąta ma $${c}$ cm. Ile centymetrów ma każde z ramion?`;
              ozn = `Oznaczmy przez $x$ długość ramienia w centymetrach.`;
              rownanieTex = `2x + ${c} = ${d}`;
              krok = `Obwód to suma dwóch ramion i podstawy. Odejmujemy $${c}$: $2x = ${d} - ${c} = ${d - c}$. Dzielimy: $x = ${d - c} : 2 = ${x}$.`;
              spr = `2 \\cdot ${x} + ${c} = ${d}`;
              odp = `Każde ramię ma $${x}$ cm.`;
              wynikTex = `$${x}$ cm`;
            } else if (rodz === "prostokat") {
              x = r.int(2, 20); const c = r.int(2, 20); const d = 2 * x + 2 * c;
              tresc = `Obwód prostokąta jest równy $${d}$ cm. Jeden bok tego prostokąta ma $${c}$ cm. Ile centymetrów ma drugi bok?`;
              ozn = `Oznaczmy przez $x$ długość drugiego boku w centymetrach.`;
              rownanieTex = `2x + 2 \\cdot ${c} = ${d}`;
              krok = `Dwa boki po $${c}$ cm mają razem $2 \\cdot ${c} = ${2 * c}$ cm. Odejmujemy: $2x = ${d} - ${2 * c} = ${d - 2 * c}$. Dzielimy: $x = ${d - 2 * c} : 2 = ${x}$.`;
              spr = `2 \\cdot ${x} + 2 \\cdot ${c} = ${d}`;
              odp = `Drugi bok ma $${x}$ cm.`;
              wynikTex = `$${x}$ cm`;
            } else if (rodz === "ksiazka") {
              const N = r.int(2, 7); x = r.int(5, 30); const c = r.int(5, 60); const d = c + N * x;
              const st = (n) => mn(n, "stronę", "strony", "stron");
              tresc = `Książka ma $${d}$ ${st(d)}. ${imie} przeczytała już $${c}$ ${st(c)}. Pozostałe strony chce przeczytać w ciągu $${N}$ dni, czytając codziennie tyle samo stron. Ile stron dziennie powinna czytać?`;
              ozn = `Oznaczmy przez $x$ liczbę stron czytanych każdego dnia.`;
              rownanieTex = `${c} + ${N}x = ${d}`;
              krok = `Odejmujemy $${c}$: $${N}x = ${d} - ${c} = ${d - c}$. Dzielimy: $x = ${d - c} : ${N} = ${x}$.`;
              spr = `${c} + ${N} \\cdot ${x} = ${d}`;
              odp = `${imie} powinna czytać po $${x}$ ${mn(x, "stronie", "strony", "stron")} dziennie.`;
              wynikTex = `$${x}$`;
            } else if (rodz === "skarbonka") {
              const plus = r.chance(0.5);
              const c = r.int(5, 40); const d = r.int(10, 60);
              if (plus) {
                x = r.int(5, 50); const dd = x + c;
                tresc = `${imie} miała w skarbonce pewną kwotę. Gdy babcia dołożyła jej $${c}$ zł, w skarbonce było $${dd}$ zł. Ile złotych było w skarbonce na początku?`;
                rownanieTex = `x + ${c} = ${dd}`;
                krok = `Cofamy dodawanie: $x = ${dd} - ${c} = ${x}$.`;
                spr = `${x} + ${c} = ${dd}`;
              } else {
                x = c + d;
                tresc = `${imie} miała w portfelu pewną kwotę. Gdy wydała $${c}$ zł, zostało jej $${d}$ zł. Ile złotych miała na początku?`;
                rownanieTex = `x - ${c} = ${d}`;
                krok = `Cofamy odejmowanie: $x = ${d} + ${c} = ${x}$.`;
                spr = `${x} - ${c} = ${d}`;
              }
              ozn = `Oznaczmy przez $x$ liczbę złotych, które ${imie} miała na początku.`;
              odp = `${imie} miała na początku $${x}$ zł.`;
              wynikTex = `$${x}$ zł`;
            } else {
              const N = r.int(2, 8); const d = r.int(2, 12); x = N * d;
              tresc = `Paczkę cukierków podzielono po równo między $${N}$ ${mn(N, "osobę", "osoby", "osób")}. Każda osoba dostała $${d}$ ${mn(d, "cukierek", "cukierki", "cukierków")}. Ile cukierków było w paczce?`;
              ozn = `Oznaczmy przez $x$ liczbę cukierków w paczce.`;
              rownanieTex = `x : ${N} = ${d}`;
              krok = `Cofamy dzielenie i mnożymy: $x = ${d} \\cdot ${N} = ${x}$.`;
              spr = `${x} : ${N} = ${d}`;
              odp = `W paczce było $${x}$ ${mn(x, "cukierek", "cukierki", "cukierków")}.`;
              wynikTex = `$${x}$`;
            }
            return {
              tresc,
              pola: [{ id: "x", typ: "liczba", etykieta: "Odpowiedź (liczba)" }],
              odpowiedz: { x },
              wynik: wynikTex,
              rozwiazanie: [ozn, `Równanie: $${rownanieTex}$.`, krok, `Sprawdzenie: $${spr}$, zgadza się z treścią zadania.`, `Odpowiedź: ${odp}`],
            };
          },
        },
      ],
    },
  ],
};
