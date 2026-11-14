// Klasa 4 (szkoła podstawowa) · rozdział I „Zaczynamy przygodę z matematyką” – Klucz do matematyki 4 (Nowa Era, 2026).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** Godzina z minut od północy: 505 -> "8:25". */
const hm = (min) => `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;

/** Polska odmiana po liczebniku: 1 godzinę, 2 godziny, 5 godzin. */
const forma = (n, jedna, kilka, wiele) =>
  n === 1 ? jedna : n % 10 >= 2 && n % 10 <= 4 && !(n % 100 >= 12 && n % 100 <= 14) ? kilka : wiele;
const godz = (n) => `${n} ${forma(n, "godzinę", "godziny", "godzin")}`;
const minut = (n) => `${n} ${forma(n, "minutę", "minuty", "minut")}`;
const dni = (n) => `${n} ${n === 1 ? "dzień" : "dni"}`;

const MIESIAC = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
const MIESIAC_D = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
const DNI_TYG = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];
const DNI_TYG_B = ["poniedziałek", "wtorek", "środę", "czwartek", "piątek", "sobotę", "niedzielę"];

const przestepny = (rok) => rok % 4 === 0;
const dniMiesiaca = (rok, m) => [31, przestepny(rok) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m];

// Cyfry rzymskie
const JEDN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
const DZIES = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
const SETKI = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
const TYS = ["", "M", "MM", "MMM"];

/** Zapis rzymski liczby 1–3999. */
const rzymska = (n) => TYS[Math.floor(n / 1000)] + SETKI[Math.floor(n / 100) % 10] + DZIES[Math.floor(n / 10) % 10] + JEDN[n % 10];

/** Części zapisu rzymskiego z wartościami: 1944 -> [["M", 1000], ["CM", 900], ["XL", 40], ["IV", 4]]. */
function rozklad(n) {
  const cz = [
    [TYS[Math.floor(n / 1000)], Math.floor(n / 1000) * 1000],
    [SETKI[Math.floor(n / 100) % 10], (Math.floor(n / 100) % 10) * 100],
    [DZIES[Math.floor(n / 10) % 10], (Math.floor(n / 10) % 10) * 10],
    [JEDN[n % 10], n % 10],
  ];
  return cz.filter(([, v]) => v > 0);
}

/** Zapis „po kolei” bez odejmowania (4 -> IIII) – typowy błąd. */
function dodawana(n) {
  const cz = [
    "M".repeat(Math.floor(n / 1000)),
    ["", "C", "CC", "CCC", "CCCC", "D", "DC", "DCC", "DCCC", "DCCCC"][Math.floor(n / 100) % 10],
    ["", "X", "XX", "XXX", "XXXX", "L", "LX", "LXX", "LXXX", "LXXXX"][Math.floor(n / 10) % 10],
    ["", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "VIIII"][n % 10],
  ];
  return cz.join("");
}

/** Zamienione miejscami pary odejmowane (IV -> VI) – typowy błąd. */
const odwrocona = (s) => s.replace(/IV|IX|XL|XC|CD|CM/g, (p) => p[1] + p[0]);

// Jednostki długości: ile milimetrów ma dana jednostka
const DLUG = { mm: 1, cm: 10, dm: 100, m: 1000, km: 1000000 };
const DLUG_D = { km: "kilometrów", m: "metrów", dm: "decymetrów", cm: "centymetrów", mm: "milimetrów" };

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ 2. Zegary
    {
      id: "zegary",
      nazwa: "Zegary",
      sciaga: [
        {
          nazwa: "Jednostki czasu",
          slownie: "Doba ma 24 godziny, godzina ma 60 minut, a minuta ma 60 sekund.",
          tex: "1\\text{ doba}=24\\text{ h}\\qquad1\\text{ h}=60\\text{ min}\\qquad1\\text{ min}=60\\text{ s}",
          litery: "h – godzina, min – minuta, s – sekunda.",
          przyklad: "Pół godziny to $30$ min. Dwie minuty to $2 \\cdot 60 = 120$ s.",
          uwaga: "Czasu nie liczymy po sto: godzina ma $60$ minut, a nie $100$.",
        },
        {
          nazwa: "Zegar 12- i 24-godzinny",
          slownie: "Na tarczy zegara jest 12 godzin, a doba ma ich 24. Godziny po południu zapisujemy, dodając do godziny z tarczy 12.",
          przyklad: "Godzina 19:30 to wpół do ósmej wieczorem, bo $19 - 12 = 7$.",
          uwaga: "Południe to 12:00, a północ to 24:00 (albo 0:00).",
        },
        {
          nazwa: "Kwadrans i pół godziny",
          slownie: "Kwadrans to 15 minut, a pół godziny to 30 minut. Dlatego mówimy „kwadrans po”, „wpół do” i „za kwadrans”.",
          przyklad: "3:15 to kwadrans po trzeciej, 3:30 to wpół do czwartej, 3:45 to za kwadrans czwarta.",
          uwaga: "Wpół do czwartej to 3:30, a nie 4:30.",
        },
        {
          nazwa: "Zamiana jednostek czasu",
          slownie: "Z większej jednostki na mniejszą mnożymy przez 60, a z mniejszej na większą dzielimy przez 60.",
          tex: "\\text{godz.}\\cdot60=\\text{min}\\qquad\\text{min}\\cdot60=\\text{s}\\qquad\\text{min}:60=\\text{godz.}",
          przyklad: "$2$ h $15$ min $= 2 \\cdot 60 + 15 = 135$ min.",
          uwaga: "Dodajemy na końcu pozostałe minuty: $2$ h $15$ min to nie $2 \\cdot 60$ min.",
        },
        {
          nazwa: "Ile czasu minęło",
          slownie: "Czas między dwiema godzinami liczymy „schodkami”: najpierw do najbliższej pełnej godziny, potem pełnymi godzinami, na końcu minuty.",
          przyklad: "Od 8:45 do 11:20: do 9:00 jest $15$ min, do 11:00 jeszcze $2$ h, do 11:20 jeszcze $20$ min. Razem $2$ h $35$ min, bo $15 + 20 = 35$.",
          uwaga: "Gdy minut wyjdzie $60$ albo więcej, zamień je na godziny: $75$ min to $1$ h $15$ min.",
        },
      ],
      jak: [
        "Zapisz godzinę początku i to, co się zmienia: ile godzin i minut dodajesz, albo godzinę końca.",
        "Dodawaj albo odejmuj najpierw pełne godziny, potem minuty.",
        "Gdy przekraczasz pełną godzinę, policz, ile minut brakuje do niej, a ile zostaje.",
        "Sprawdź, czy minuty są mniejsze niż $60$, i czy wynik ma sens.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Film zaczął się o 18:25 i trwał 1 godzinę i 50 minut. O której godzinie się skończył? **Wybierz właściwą odpowiedź.**",
          opcje: ["19:75", "20:15", "20:05", "19:15"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Ile sekund ma 3 minuty i 20 sekund? **Wybierz właściwą odpowiedź.**",
          opcje: ["80", "180", "200", "320"],
          poprawna: 2,
        },
        {
          nr: "3",
          tresc: "Zegar pokazuje wpół do ósmej wieczorem. Jak zapisać tę godzinę w systemie 24-godzinnym? **Wybierz właściwą odpowiedź.**",
          opcje: ["19:30", "20:30", "7:30", "19:15"],
          poprawna: 0,
        },
        {
          nr: "4",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$3$ minuty to $180$ sekund.", litery: "PF", poprawna: 0 },
            { tekst: "$2$ godziny to $200$ minut.", litery: "PF", poprawna: 1 },
            { tekst: "Za kwadrans szósta to 6:15.", litery: "PF", poprawna: 1 },
          ],
        },
        {
          nr: "5",
          tresc: "Lekcja zaczyna się o 9:50, a kończy o 10:35. Ile minut trwa? **Wybierz właściwą odpowiedź.**",
          opcje: ["35", "55", "85", "45"],
          poprawna: 3,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Mecz zaczął się o 15:40. Pierwsza połowa trwała 45 minut, przerwa 15 minut, a druga połowa 45 minut. O której godzinie skończył się mecz? **Zapisz obliczenia.**",
          rozwiazanie: "Cały czas: $45 + 15 + 45 = 105$ min, czyli $1$ h $45$ min.\n\nDodajemy godzinę: 15:40 + 1 h = 16:40.\n\nDodajemy $45$ min: do 17:00 brakuje $20$ min, zostaje $25$ min, więc jest 17:25.\n\nOdpowiedź: Mecz skończył się o 17:25.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Pociąg jedzie 2 godziny i 45 minut i przyjeżdża o 13:10. O której godzinie odjechał? Ile minut trwała podróż? **Zapisz obliczenia.**",
          rozwiazanie: "Cofamy się o $2$ h: 13:10 − 2 h = 11:10.\n\nCofamy się o $45$ min: 11:10 − $10$ min = 11:00, a potem jeszcze $35$ min, więc jest 10:25.\n\nPodróż: $2$ h $45$ min $= 2 \\cdot 60 + 45 = 165$ min.\n\nOdpowiedź: Pociąg odjechał o 10:25, a podróż trwała $165$ min.",
        },
      ],
      generatory: [
        {
          id: "zegary-koniec",
          nazwa: "Godzina końca",
          opis: "Znasz godzinę rozpoczęcia i czas trwania – podaj godzinę zakończenia.",
          generuj(r) {
            for (;;) {
              const start = r.int(6, 20) * 60 + 5 * r.int(0, 11);
              const dh = r.int(0, 4);
              const dm = dh === 0 ? 5 * r.int(3, 11) : 5 * r.int(0, 11);
              const koniec = start + dh * 60 + dm;
              if (koniec > 23 * 60 + 55 || dh * 60 + dm === 0) continue;
              const trwa = [dh ? godz(dh) : "", dm ? minut(dm) : ""].filter(Boolean).join(" i ");
              const co = r.pick(["Film", "Mecz", "Koncert", "Spektakl", "Turniej", "Występ", "Kurs"]);
              const sm = start % 60;
              const rozwiazanie = [];
              let teraz = start;
              if (dh) {
                teraz += dh * 60;
                rozwiazanie.push(`Najpierw dodajemy godziny: ${hm(start)} + ${dh} h = ${hm(teraz)}.`);
              }
              if (dm) {
                if (teraz % 60 + dm >= 60) {
                  const brak = 60 - (teraz % 60);
                  rozwiazanie.push(`Potem minuty: do pełnej godziny brakuje ${brak} min, zostaje ${dm - brak} min, więc jest ${hm(koniec)}.`);
                } else {
                  rozwiazanie.push(`Potem minuty: ${hm(teraz)} + ${dm} min = ${hm(koniec)}.`);
                }
              }
              return {
                tresc: `${co} zaczyna się o ${hm(start)} i trwa ${trwa}. O której godzinie się skończy? Podaj godzinę i minuty.`,
                pola: [
                  { id: "g", typ: "liczba", etykieta: "Godzina" },
                  { id: "m", typ: "liczba", etykieta: "Minuty" },
                ],
                odpowiedz: { g: q(Math.floor(koniec / 60)), m: q(koniec % 60) },
                wynik: `godz. ${hm(koniec)}`,
                rozwiazanie,
              };
            }
          },
        },
        {
          id: "zegary-czas",
          nazwa: "Ile minut, ile sekund",
          opis: "Czas między dwiema godzinami albo zamiana jednostek czasu (godziny, minuty, sekundy, doby).",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              for (;;) {
                const s = r.int(6, 16) * 60 + 5 * r.int(0, 11);
                const k = s + 5 * r.int(5, 60);
                if (k > 23 * 60 + 55) continue;
                const sh = Math.floor(s / 60), sm = s % 60, kh = Math.floor(k / 60), km = k % 60;
                const kto = r.pick(["Lekcja", "Trening", "Film", "Przerwa w pracy", "Mecz", "Zajęcia"]);
                const rozwiazanie = [];
                if (sh === kh) {
                  rozwiazanie.push(`Obie godziny są w tej samej godzinie, więc od minut końca odejmujemy minuty początku: ${km} − ${sm} = ${km - sm} min.`);
                } else {
                  const czesci = [];
                  if (sm > 0) {
                    czesci.push(60 - sm);
                    rozwiazanie.push(`Od ${hm(s)} do ${sh + 1}:00 mija ${60 - sm} min.`);
                  }
                  const pelne = kh - (sm > 0 ? sh + 1 : sh);
                  if (pelne > 0) {
                    czesci.push(pelne * 60);
                    rozwiazanie.push(`Od ${sm > 0 ? sh + 1 : sh}:00 do ${kh}:00 mija ${pelne} h, czyli ${pelne * 60} min.`);
                  }
                  if (km > 0) {
                    czesci.push(km);
                    rozwiazanie.push(`Od ${kh}:00 do ${hm(k)} mija ${km} min.`);
                  }
                  rozwiazanie.push(`Razem: ${czesci.join(" + ")} = ${k - s} min.`);
                }
                return {
                  tresc: `${kto} zaczyna się o ${hm(s)} i kończy o ${hm(k)}. Ile minut trwa?`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Minuty" }],
                  odpowiedz: { w: q(k - s) },
                  wynik: `$${k - s}$ min`,
                  rozwiazanie,
                };
              }
            }
            if (tryb === 1) {
              const h = r.int(1, 9), m = r.int(1, 59);
              const w = h * 60 + m;
              return {
                tresc: `Ile minut ma ${h} ${forma(h, "godzina", "godziny", "godzin")} i ${m} ${forma(m, "minuta", "minuty", "minut")}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Minuty" }],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$ min`,
                rozwiazanie: [`Godzina ma $60$ min, więc $${h}$ h to $${h} \\cdot 60 = ${h * 60}$ min.`, `Dodajemy minuty: $${h * 60} + ${m} = ${w}$ min.`],
              };
            }
            if (tryb === 2) {
              const a = r.int(1, 12), b = r.int(1, 59);
              const w = a * 60 + b;
              return {
                tresc: `Ile sekund ma ${a} ${forma(a, "minuta", "minuty", "minut")} i ${b} ${forma(b, "sekunda", "sekundy", "sekund")}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Sekundy" }],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$ s`,
                rozwiazanie: [`Minuta ma $60$ s, więc $${a}$ min to $${a} \\cdot 60 = ${a * 60}$ s.`, `Dodajemy sekundy: $${a * 60} + ${b} = ${w}$ s.`],
              };
            }
            const a = r.int(1, 9), b = r.int(1, 23);
            const w = a * 24 + b;
            return {
              tresc: `Ile godzin ma ${a} ${forma(a, "doba", "doby", "dób")} i ${b} ${forma(b, "godzina", "godziny", "godzin")}?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Godziny" }],
              odpowiedz: { w: q(w) },
              wynik: `$${w}$ h`,
              rozwiazanie: [`Doba ma $24$ h, więc $${a}$ ${forma(a, "doba", "doby", "dób")} to $${a} \\cdot 24 = ${a * 24}$ h.`, `Dodajemy godziny: $${a * 24} + ${b} = ${w}$ h.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 3. Kalendarz
    {
      id: "kalendarz",
      nazwa: "Kalendarz",
      sciaga: [
        {
          nazwa: "Dni w miesiącach",
          slownie: "Rok ma 12 miesięcy. Większość miesięcy ma 30 albo 31 dni, a luty 28 albo 29.",
          litery: "31 dni mają: styczeń, marzec, maj, lipiec, sierpień, październik, grudzień. 30 dni mają: kwiecień, czerwiec, wrzesień, listopad.",
          przyklad: "Można to sprawdzić na zaciśniętej pięści: kostki to miesiące po $31$ dni, a zagłębienia między nimi po $30$ dni (luty jest wyjątkiem).",
          uwaga: "Lipiec i sierpień następują po sobie i oba mają po $31$ dni.",
        },
        {
          nazwa: "Rok zwykły i przestępny",
          slownie: "Rok zwykły ma 365 dni. Rok przestępny ma 366 dni, bo luty ma wtedy 29 dni. Rok przestępny jest co 4 lata: jego numer dzieli się przez 4.",
          przyklad: "$2028 : 4 = 507$, więc rok 2028 jest przestępny. Rok 2027 nie dzieli się przez $4$, więc jest zwykły.",
          uwaga: "Lata kończące się na 00 mają osobną regułę (rok 1900 nie był przestępny, a 2000 był). W tym rozdziale ich nie używamy.",
        },
        {
          nazwa: "Tydzień i rok",
          slownie: "Tydzień ma 7 dni, rok ma 12 miesięcy, a wiek to 100 lat.",
          tex: "1\\text{ tydzień}=7\\text{ dni}\\qquad1\\text{ rok}=12\\text{ miesięcy}\\qquad1\\text{ wiek}=100\\text{ lat}",
          przyklad: "$3$ tygodnie to $3 \\cdot 7 = 21$ dni.",
          uwaga: "W kalendarzu tydzień zaczyna się w poniedziałek, a kończy w niedzielę.",
        },
        {
          nazwa: "Ile dni między datami",
          slownie: "Liczymy dni do końca pierwszego miesiąca, dodajemy dni pełnych miesięcy po drodze i na końcu dni z ostatniego miesiąca.",
          przyklad: "Od 12 marca do 3 kwietnia: do końca marca $31 - 12 = 19$ dni, do tego $3$ dni kwietnia: $19 + 3 = 22$ dni.",
          uwaga: "Dnia, od którego liczymy, nie doliczamy: od 5 do 8 maja mijają $3$ dni, a nie $4$.",
        },
        {
          nazwa: "Dzień tygodnia po kilku dniach",
          slownie: "Po 7 dniach znów jest ten sam dzień tygodnia. Odejmij więc pełne tygodnie i policz tylko dni, które zostały.",
          przyklad: "Dziś jest wtorek. Za $17$ dni: $17 = 2 \\cdot 7 + 3$. Po dwóch tygodniach znów wtorek, a trzy dni dalej to piątek.",
          uwaga: "Gdy nie zostaje żaden dzień, dzień tygodnia jest ten sam: za $14$ dni wypada znów wtorek.",
        },
      ],
      jak: [
        "Zapisz, od której daty do której liczysz, i w którym roku (ważne dla lutego).",
        "Policz dni do końca pierwszego miesiąca: długość miesiąca minus dzień początkowy.",
        "Dodaj pełne miesiące po drodze i dni ostatniego miesiąca.",
        "Przy dniach tygodnia odejmij pełne tygodnie (po $7$ dni) i przesuń się o to, co zostało.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Który z podanych miesięcy ma 31 dni? **Wybierz właściwą odpowiedź.**",
          opcje: ["sierpień", "kwiecień", "czerwiec", "wrzesień"],
          poprawna: 0,
        },
        {
          nr: "9",
          tresc: "Który z podanych lat jest rokiem przestępnym? **Wybierz właściwą odpowiedź.**",
          opcje: ["2062", "2074", "2082", "2084"],
          poprawna: 3,
        },
        {
          nr: "10",
          tresc: "Dziś jest piątek. Jaki dzień tygodnia będzie za 10 dni? **Wybierz właściwą odpowiedź.**",
          opcje: ["sobota", "poniedziałek", "niedziela", "wtorek"],
          poprawna: 1,
        },
        {
          nr: "11",
          tresc: "Ile dni mija od 20 stycznia do 5 lutego w roku 2027? **Wybierz właściwą odpowiedź.**",
          opcje: ["15", "17", "16", "26"],
          poprawna: 2,
        },
        {
          nr: "12",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Rok przestępny ma $366$ dni.", litery: "PF", poprawna: 0 },
            { tekst: "Luty w roku 2030 ma $29$ dni.", litery: "PF", poprawna: 1 },
            { tekst: "$3$ tygodnie to $21$ dni.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Mama kupiła bilet na koncert 18 lutego 2028 roku. Koncert odbędzie się 7 marca tego samego roku. Ile dni minie od kupienia biletu do koncertu? **Zapisz obliczenia.**",
          rozwiazanie: "Rok $2028$ dzieli się przez $4$ ($2028 : 4 = 507$), więc jest przestępny i luty ma $29$ dni.\n\nDo końca lutego mija $29 - 18 = 11$ dni.\n\nDo tego dochodzi $7$ dni marca: $11 + 7 = 18$.\n\nOdpowiedź: Do koncertu minie $18$ dni.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Dziś jest środa, 14 września. Ile dni zostało do 3 listopada tego samego roku? Jaki dzień tygodnia będzie 3 listopada? **Zapisz obliczenia.**",
          rozwiazanie: "Wrzesień ma $30$ dni, więc do końca września mija $30 - 14 = 16$ dni.\n\nPaździernik ma $31$ dni, a w listopadzie dochodzą $3$ dni.\n\nRazem: $16 + 31 + 3 = 50$ dni.\n\n$50 = 7 \\cdot 7 + 1$, czyli po $7$ tygodniach (po $49$ dniach) znów jest środa, a jeden dzień dalej to czwartek.\n\nOdpowiedź: Zostało $50$ dni, a 3 listopada będzie czwartek.",
        },
      ],
      generatory: [
        {
          id: "kalendarz-dni-miedzy",
          nazwa: "Dni między datami",
          opis: "Ile dni mija od jednej daty do drugiej – z uwzględnieniem długości miesięcy i roku przestępnego.",
          generuj(r) {
            const rok = r.int(2025, 2034);
            const m1 = r.int(0, 9);
            const m2 = m1 + r.int(1, 2);
            const L1 = dniMiesiaca(rok, m1);
            const d1 = r.int(1, L1 - 1);
            const d2 = r.int(1, dniMiesiaca(rok, m2));
            const posrodku = m2 - m1 === 2 ? m1 + 1 : null;
            const reszta1 = L1 - d1;
            const Lm = posrodku === null ? 0 : dniMiesiaca(rok, posrodku);
            const wynik = reszta1 + Lm + d2;
            const [poczatek, koniec] = r.pick([
              ["Wycieczka rozpoczyna się", "kończy"],
              ["Książkę wypożyczono", "oddano"],
              ["Remont rozpoczął się", "zakończył"],
              ["Obóz sportowy zaczyna się", "kończy"],
            ]);
            const pytanie = poczatek.startsWith("Książkę") ? "wypożyczenia do oddania książki" : poczatek.startsWith("Remont") ? "rozpoczęcia do zakończenia remontu" : poczatek.startsWith("Obóz") ? "rozpoczęcia do zakończenia obozu" : "rozpoczęcia do zakończenia wycieczki";
            const rozwiazanie = [];
            if (m1 === 1 || posrodku === 1) {
              rozwiazanie.push(przestepny(rok) ? `Rok ${rok} jest przestępny (${rok} dzieli się przez 4), więc luty ma 29 dni.` : `Rok ${rok} jest zwykły (${rok} nie dzieli się przez 4), więc luty ma 28 dni.`);
            }
            rozwiazanie.push(`${MIESIAC[m1][0].toUpperCase()}${MIESIAC[m1].slice(1)} ma ${L1} dni, więc do końca miesiąca mija $${L1} - ${d1} = ${reszta1}$ ${reszta1 === 1 ? "dzień" : "dni"}.`);
            if (posrodku !== null) rozwiazanie.push(`Cały ${MIESIAC[posrodku]} to ${Lm} dni.`);
            rozwiazanie.push(`Dochodzi ${dni(d2)} ${MIESIAC_D[m2]}: $${[reszta1, posrodku !== null ? Lm : null, d2].filter((x) => x !== null).join(" + ")} = ${wynik}$.`);
            return {
              tresc: `${poczatek} ${d1} ${MIESIAC_D[m1]} ${rok} roku, a ${koniec === "oddano" ? "oddano" : `${koniec} się`} ${d2} ${MIESIAC_D[m2]}. Ile dni mija od ${pytanie}?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba dni" }],
              odpowiedz: { w: q(wynik) },
              wynik: `$${wynik}$ ${wynik === 1 ? "dzień" : "dni"}`,
              rozwiazanie,
            };
          },
        },
        {
          id: "kalendarz-dzien-tygodnia",
          nazwa: "Dzień tygodnia",
          opis: "Jaki dzień tygodnia będzie za kilka dni (albo był kilka dni temu).",
          generuj(r) {
            const dzis = r.int(0, 6);
            const n = r.int(8, 60);
            const wstecz = r.chance(0.3);
            const tygodnie = Math.floor(n / 7);
            const zostaje = n % 7;
            const idx = wstecz ? (dzis - zostaje + 7) % 7 : (dzis + zostaje) % 7;
            const rozwiazanie = [
              `Tydzień ma $7$ dni: $${n} = ${tygodnie} \\cdot 7 + ${zostaje}$.`,
              `Po ${tygodnie} ${forma(tygodnie, "tygodniu", "tygodniach", "tygodniach")} jest znów ${DNI_TYG[dzis]}.`,
            ];
            if (zostaje === 0) {
              rozwiazanie.push(`Żaden dzień nie zostaje, więc to ${DNI_TYG[idx]}.`);
            } else {
              rozwiazanie.push(`${wstecz ? "Cofamy się" : "Przesuwamy się"} jeszcze o ${dni(zostaje)}: ${DNI_TYG[idx]}.`);
            }
            return {
              tresc: wstecz
                ? `Dziś jest ${DNI_TYG[dzis]}. Jaki dzień tygodnia był ${n} dni temu?`
                : `Dziś jest ${DNI_TYG[dzis]}. Jaki dzień tygodnia będzie za ${n} dni?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Dzień tygodnia", opcje: DNI_TYG }],
              odpowiedz: { w: idx },
              wynik: DNI_TYG[idx],
              rozwiazanie,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 4. Cyfry rzymskie
    {
      id: "rzymskie",
      nazwa: "Cyfry rzymskie",
      sciaga: [
        {
          nazwa: "Siedem znaków",
          slownie: "Liczby rzymskie zapisujemy siedmioma znakami: I, V, X, L, C, D, M.",
          tex: "\\text{I}=1\\qquad\\text{V}=5\\qquad\\text{X}=10\\qquad\\text{L}=50\\qquad\\text{C}=100\\qquad\\text{D}=500\\qquad\\text{M}=1000",
          przyklad: "XXX to $10 + 10 + 10 = 30$.",
          uwaga: "W systemie rzymskim nie ma zera.",
        },
        {
          nazwa: "Dodajemy znaki po kolei",
          slownie: "Znaki piszemy od największego do najmniejszego i dodajemy ich wartości. Znaków I, X, C, M nie piszemy więcej niż trzy razy z rzędu.",
          przyklad: "XVII to $10 + 5 + 1 + 1 = 17$. MMXXVI to $1000 + 1000 + 10 + 10 + 5 + 1 = 2026$.",
          uwaga: "Znaków V, L, D się nie powtarza: dziesięć to X, a nie VV.",
        },
        {
          nazwa: "Odejmujemy przed większym",
          slownie: "Gdy mniejszy znak stoi przed większym, jego wartość odejmujemy. Tak można tylko z I, X i C: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900.",
          przyklad: "XLIV to XL + IV, czyli $40 + 4 = 44$.",
          uwaga: "Odejmujemy tylko jeden znak: 49 to XLIX, a nie IL.",
        },
        {
          nazwa: "Zapis liczby po kolei",
          slownie: "Rozłóż liczbę na tysiące, setki, dziesiątki i jedności i każdą z tych części zapisz osobno, od największej.",
          przyklad: "$1984 = 1000 + 900 + 80 + 4$, więc: M, CM, LXXX, IV, razem MCMLXXXIV.",
          uwaga: "Zero w danym rzędzie po prostu pomijamy: 2005 to MMV.",
        },
        {
          nazwa: "Wieki",
          slownie: "Wiek to 100 lat. Numery wieków zapisujemy cyframi rzymskimi: wiek I to lata 1–100, wiek II to lata 101–200 i tak dalej.",
          przyklad: "W roku 1410 minęło $14$ pełnych wieków, więc trwa piętnasty wiek, czyli wiek XV.",
          uwaga: "Rok 2000 jeszcze należy do XX wieku, a XXI wiek zaczyna się w roku 2001.",
        },
      ],
      jak: [
        "Rozłóż liczbę na tysiące, setki, dziesiątki i jedności.",
        "Każdą część zapisz cyframi rzymskimi: pamiętaj o IV, IX, XL, XC, CD, CM.",
        "Połącz części od największej do najmniejszej.",
        "Przy odczytywaniu zrób odwrotnie: podziel zapis na części i dodaj ich wartości.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Liczba XLIV zapisana zwykłymi cyframi to. **Wybierz właściwą odpowiedź.**",
          opcje: ["64", "66", "46", "44"],
          poprawna: 3,
        },
        {
          nr: "16",
          tresc: "Liczbę 1994 zapisujemy cyframi rzymskimi jako. **Wybierz właściwą odpowiedź.**",
          opcje: ["MCMXCIV", "MXMIV", "MCMXCVI", "MCDXCIV"],
          poprawna: 0,
        },
        {
          nr: "17",
          tresc: "Który z zapisów jest poprawnym zapisem liczby 49 cyframi rzymskimi? **Wybierz właściwą odpowiedź.**",
          opcje: ["IL", "XXXXIX", "XLIX", "VLIV"],
          poprawna: 2,
        },
        {
          nr: "18",
          tresc: "Wiek XVIII to lata. **Wybierz właściwą odpowiedź.**",
          opcje: ["1801–1900", "1701–1800", "1700–1799", "1601–1700"],
          poprawna: 1,
        },
        {
          nr: "19",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "CXL to liczba $140$.", litery: "PF", poprawna: 0 },
            { tekst: "XIX to liczba $21$.", litery: "PF", poprawna: 1 },
            { tekst: "Rok 1500 należy do wieku XV.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Zapisz cyframi rzymskimi liczby 2049 i 1478. **Zapisz obliczenia.**",
          rozwiazanie: "$2049 = 2000 + 40 + 9$, czyli MM, XL, IX, razem MMXLIX.\n\n$1478 = 1000 + 400 + 70 + 8$, czyli M, CD, LXX, VIII, razem MCDLXXVIII.\n\nOdpowiedź: $2049$ to MMXLIX, a $1478$ to MCDLXXVIII.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Na pomniku wyryto rok MDCCCLXXXIX. Jaki to rok zapisany zwykłymi cyframi? Do którego wieku należy? Wiek zapisz cyframi rzymskimi. **Zapisz obliczenia.**",
          rozwiazanie: "Dzielimy zapis na części: M, DCCC, LXXX, IX.\n\nWartości: $1000$, $800$, $80$, $9$.\n\nSuma: $1000 + 800 + 80 + 9 = 1889$.\n\nRok $1889$ leży między $1801$ a $1900$, czyli w dziewiętnastym wieku, który zapisujemy XIX.\n\nOdpowiedź: To rok $1889$, wiek XIX.",
        },
      ],
      generatory: [
        {
          id: "rzymskie-na-zwykle",
          nazwa: "Rzymskie na zwykłe",
          opis: "Odczytaj liczbę zapisaną cyframi rzymskimi i zapisz ją zwykłymi cyframi.",
          generuj(r) {
            const [a, b] = r.pick([[4, 49], [20, 399], [100, 1999], [400, 3999]]);
            const n = r.int(a, b);
            const rz = rzymska(n);
            const cz = rozklad(n);
            return {
              tresc: r.pick([
                `Jaką liczbę przedstawia zapis ${rz}?`,
                `Zapisz zwykłymi cyframi liczbę rzymską ${rz}.`,
                `Odczytaj liczbę ${rz} i zapisz ją zwykłymi cyframi.`,
              ]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba" }],
              odpowiedz: { w: q(n) },
              wynik: `$${n}$`,
              rozwiazanie: [
                `Dzielimy zapis na części, od największej: ${cz.map(([s]) => s).join(", ")}.`,
                `Wartości tych części: ${cz.map(([, v]) => `$${v}$`).join(", ")}.`,
                `Dodajemy: $${cz.map(([, v]) => v).join(" + ")} = ${n}$.`,
              ],
            };
          },
        },
        {
          id: "rzymskie-zapis",
          nazwa: "Zapis rzymski",
          opis: "Wybierz poprawny zapis danej liczby cyframi rzymskimi (wśród typowych błędów).",
          generuj(r) {
            const n = r.int(4, 3999);
            const rz = rzymska(n);
            const cz = rozklad(n);
            const kandydaci = r.shuffle([dodawana(n), odwrocona(rz)]).filter((s) => s !== rz);
            const inne = r.shuffle([1, -1, 10, -10, 5, -5, 100, -100, 50, -50, 4, -4, 9, -9]).map((d) => n + d).filter((x) => x >= 1 && x <= 3999).map(rzymska);
            const zle = [];
            for (const s of [...kandydaci, ...inne]) {
              if (s !== rz && !zle.includes(s)) zle.push(s);
              if (zle.length === 3) break;
            }
            const opcje = r.shuffle([rz, ...zle]);
            return {
              tresc: `Wskaż poprawny zapis liczby ${n} cyframi rzymskimi (zgodnie z zasadami zapisu).`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Zapis rzymski", opcje }],
              odpowiedz: { w: opcje.indexOf(rz) },
              wynik: rz,
              rozwiazanie: [
                `Rozkładamy liczbę: $${n} = ${cz.map(([, v]) => v).join(" + ")}$.`,
                `Zapisujemy każdą część: ${cz.map(([s, v]) => `$${v}$ → ${s}`).join(", ")}.`,
                `Łączymy od największej: ${rz}.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ 5. Wzdłuż i wszerz
    {
      id: "dlugosc",
      nazwa: "Wzdłuż i wszerz – mierzenie i długości",
      sciaga: [
        {
          nazwa: "Jednostki długości",
          slownie: "Długość mierzymy w milimetrach, centymetrach, decymetrach, metrach i kilometrach.",
          tex: "1\\text{ cm}=10\\text{ mm}\\qquad1\\text{ dm}=10\\text{ cm}\\qquad1\\text{ m}=100\\text{ cm}\\qquad1\\text{ km}=1000\\text{ m}",
          litery: "mm – milimetr, cm – centymetr, dm – decymetr, m – metr, km – kilometr.",
          przyklad: "Grubość monety mierzymy w mm, długość ołówka w cm, długość pokoju w m, a drogę do miasta w km.",
          uwaga: "W $1$ m jest $100$ cm, ale w $1$ dm tylko $10$ cm.",
        },
        {
          nazwa: "Na mniejszą jednostkę",
          slownie: "Gdy zamieniamy na mniejszą jednostkę, mnożymy – liczba wychodzi większa. Przy długości z dwóch jednostek zamieniamy większą i dodajemy mniejszą.",
          przyklad: "$3$ km $450$ m $= 3 \\cdot 1000 + 450 = 3450$ m.",
          uwaga: "$2$ m $5$ cm to $205$ cm, a nie $25$ cm – pamiętaj o zerze.",
        },
        {
          nazwa: "Na większą jednostkę",
          slownie: "Gdy zamieniamy na większą jednostkę, dzielimy. To, co nie wystarcza na całą większą jednostkę, zostaje w mniejszej.",
          przyklad: "$2350$ m: $2000$ m to $2$ km, zostaje $350$ m, czyli $2$ km $350$ m.",
          uwaga: "$245$ cm to $2$ m $45$ cm, a nie $2$ m $450$ cm.",
        },
        {
          nazwa: "Porównywanie długości",
          slownie: "Przed porównaniem zamień obie długości na tę samą jednostkę. Dopiero wtedy większa liczba oznacza dłuższy odcinek.",
          przyklad: "$3$ m $5$ cm to $305$ cm, więc jest krótsze niż $350$ cm.",
          uwaga: "$80$ cm jest dłuższe niż $700$ mm, choć $700$ to większa liczba, bo $700$ mm to tylko $70$ cm.",
        },
        {
          nazwa: "Mierzenie linijką",
          slownie: "Początek odcinka przykładamy do zera linijki i odczytujemy wynik na jego końcu. Gdy początek leży na innej kresce, od odczytu odejmujemy tę kreskę.",
          przyklad: "Odcinek od kreski $3$ cm do kreski $11$ cm ma $11 - 3 = 8$ cm.",
          uwaga: "Sprawdź, czy linijka zaczyna się dokładnie od zera. Nie licz kresek, tylko odstępy między nimi.",
        },
      ],
      jak: [
        "Zapisz, w jakich jednostkach są dane i w jakiej jednostce ma być wynik.",
        "Zamień wszystkie długości na tę samą jednostkę (zwykle na najmniejszą).",
        "Wykonaj działanie: dodaj, odejmij albo porównaj.",
        "Jeśli trzeba, zapisz wynik w większych jednostkach, np. w km i m.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Odcinek ma długość 5 cm 7 mm. Ile to milimetrów? **Wybierz właściwą odpowiedź.**",
          opcje: ["12", "57", "507", "570"],
          poprawna: 1,
        },
        {
          nr: "23",
          tresc: "Zamień 3 km 40 m na metry. **Wybierz właściwą odpowiedź.**",
          opcje: ["3400", "340", "3040", "30040"],
          poprawna: 2,
        },
        {
          nr: "24",
          tresc: "Który z podanych odcinków jest najdłuższy? **Wybierz właściwą odpowiedź.**",
          opcje: ["1 m 80 cm", "1790 mm", "17 dm", "1 m 7 cm"],
          poprawna: 0,
        },
        {
          nr: "25",
          tresc: "Droga ma 2350 m. Zapisana w kilometrach i metrach to. **Wybierz właściwą odpowiedź.**",
          opcje: ["2 km 35 m", "23 km 50 m", "235 km", "2 km 350 m"],
          poprawna: 3,
        },
        {
          nr: "26",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$3$ dm to $30$ cm.", litery: "PF", poprawna: 0 },
            { tekst: "$2$ km to $200$ m.", litery: "PF", poprawna: 1 },
            { tekst: "$450$ mm to $45$ cm.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Kasia miała wstążkę o długości 2 m. Odcięła 65 cm, a potem jeszcze 8 dm. Ile centymetrów wstążki zostało? **Zapisz obliczenia.**",
          rozwiazanie: "Zamieniamy na centymetry: $2$ m $= 200$ cm, $8$ dm $= 80$ cm.\n\nOdcięto razem: $65 + 80 = 145$ cm.\n\nZostało: $200 - 145 = 55$ cm.\n\nOdpowiedź: Zostało $55$ cm wstążki.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "Ścieżka składa się z trzech odcinków: 1 km 200 m, 850 m i 2 km 50 m. Ile metrów ma cała ścieżka? Zapisz tę długość w kilometrach i metrach. **Zapisz obliczenia.**",
          rozwiazanie: "Zamieniamy na metry: $1$ km $200$ m $= 1200$ m, $2$ km $50$ m $= 2050$ m.\n\nSuma: $1200 + 850 + 2050 = 4100$ m.\n\n$4100$ m to $4000$ m i $100$ m, czyli $4$ km $100$ m.\n\nOdpowiedź: Ścieżka ma $4100$ m, czyli $4$ km $100$ m.",
        },
      ],
      generatory: [
        {
          id: "dlugosc-zamiana",
          nazwa: "Zamiana jednostek",
          opis: "Zamień długość na mniejszą albo większą jednostkę (mm, cm, dm, m, km).",
          generuj(r) {
            const PARY = [["km", "m", 1000], ["m", "cm", 100], ["cm", "mm", 10], ["dm", "cm", 10], ["m", "dm", 10]];
            const [duza, mala, f] = r.pick(PARY);
            const tryb = r.int(0, 3);
            if (tryb === 0) {
              const a = r.int(1, 9), b = r.int(1, f - 1);
              const w = a * f + b;
              return {
                tresc: `Zamień ${a} ${duza} ${b} ${mala} na ${mala}.`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Liczba: ${mala}` }],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$ ${mala}`,
                rozwiazanie: [`W $1$ ${duza} jest $${f}$ ${mala}, więc $${a}$ ${duza} to $${a} \\cdot ${f} = ${a * f}$ ${mala}.`, `Dodajemy resztę: $${a * f} + ${b} = ${w}$ ${mala}.`],
              };
            }
            if (tryb === 1) {
              const a = r.int(2, 40);
              return {
                tresc: `Ile ${DLUG_D[mala]} ma ${a} ${duza}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Liczba: ${mala}` }],
                odpowiedz: { w: q(a * f) },
                wynik: `$${a * f}$ ${mala}`,
                rozwiazanie: [`W $1$ ${duza} jest $${f}$ ${mala}.`, `$${a} \\cdot ${f} = ${a * f}$ ${mala}.`],
              };
            }
            if (tryb === 2) {
              const a = r.int(1, 9), b = r.int(1, f - 1);
              const razem = a * f + b;
              return {
                tresc: `Zapisz ${razem} ${mala} w ${duza} i ${mala}. Ile pełnych ${DLUG_D[duza]}, a ile ${DLUG_D[mala]} zostaje?`,
                pola: [
                  { id: "a", typ: "liczba", etykieta: `Pełne ${duza}` },
                  { id: "b", typ: "liczba", etykieta: `Zostaje ${mala}` },
                ],
                odpowiedz: { a: q(a), b: q(b) },
                wynik: `$${a}$ ${duza} $${b}$ ${mala}`,
                rozwiazanie: [`W $1$ ${duza} jest $${f}$ ${mala}. Z $${razem}$ ${mala} bierzemy $${a}$ pełnych ${duza}: $${a} \\cdot ${f} = ${a * f}$ ${mala}.`, `Zostaje $${razem} - ${a * f} = ${b}$ ${mala}.`, `Zapis: $${a}$ ${duza} $${b}$ ${mala}.`],
              };
            }
            const a = r.int(2, 40);
            return {
              tresc: `Ile ${DLUG_D[duza]} ma ${a * f} ${mala}?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `Liczba: ${duza}` }],
              odpowiedz: { w: q(a) },
              wynik: `$${a}$ ${duza}`,
              rozwiazanie: [`W $1$ ${duza} jest $${f}$ ${mala}.`, `$${a * f} : ${f} = ${a}$ ${duza}.`],
            };
          },
        },
        {
          id: "dlugosc-odcinki",
          nazwa: "Długości w różnych jednostkach",
          opis: "Dodaj albo odejmij długości podane w różnych jednostkach i podaj wynik w jednej jednostce.",
          generuj(r) {
            const ZESTAWY = [
              { koniec: "cm", jedn: { m: [1, 9], dm: [1, 30], cm: [5, 90] } },
              { koniec: "m", jedn: { km: [1, 6], m: [20, 900] } },
              { koniec: "mm", jedn: { cm: [1, 30], dm: [1, 9], mm: [5, 90] } },
            ];
            const z = r.pick(ZESTAWY);
            const nazwy = Object.keys(z.jedn);
            const f = (u) => DLUG[u] / DLUG[z.koniec];
            const czesci = [];
            for (let i = 0; i < 3; i++) {
              const u = nazwy[i % nazwy.length];
              czesci.push([u, r.int(...z.jedn[u])]);
            }
            const tryb = r.chance(0.5) ? "suma" : "reszta";
            const sumaCzesci = czesci.reduce((s, [u, v]) => s + v * f(u), 0);
            const zamiana = (tab) => tab.map(([u, v]) => (f(u) === 1 ? `$${v}$ ${u}` : `$${v}$ ${u} $= ${v} \\cdot ${f(u)} = ${v * f(u)}$ ${z.koniec}`));
            if (tryb === "suma") {
              const ods = r.shuffle(czesci);
              return {
                tresc: `Ścieżka składa się z trzech odcinków o długościach ${ods.map(([u, v]) => `${v} ${u}`).join(", ")}. Ile ${DLUG_D[z.koniec]} ma cała ścieżka?`,
                pola: [{ id: "w", typ: "liczba", etykieta: `Długość: ${z.koniec}` }],
                odpowiedz: { w: q(sumaCzesci) },
                wynik: `$${sumaCzesci}$ ${z.koniec}`,
                rozwiazanie: [
                  `Zamieniamy wszystkie długości na ${z.koniec}: ${zamiana(ods).join("; ")}.`,
                  `Dodajemy: $${ods.map(([u, v]) => v * f(u)).join(" + ")} = ${sumaCzesci}$ ${z.koniec}.`,
                ],
              };
            }
            const zostalo = r.int(5, 99);
            const calosc = sumaCzesci + zostalo;
            const ods = czesci.slice(0, 2);
            const razemOdc = ods.reduce((s, [u, v]) => s + v * f(u), 0);
            return {
              tresc: `Z taśmy o długości ${calosc} ${z.koniec} odcięto kawałki: ${ods.map(([u, v]) => `${v} ${u}`).join(" i ")}. Ile ${DLUG_D[z.koniec]} taśmy zostało?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `Zostało: ${z.koniec}` }],
              odpowiedz: { w: q(calosc - razemOdc) },
              wynik: `$${calosc - razemOdc}$ ${z.koniec}`,
              rozwiazanie: [
                `Zamieniamy odcięte kawałki na ${z.koniec}: ${zamiana(ods).join("; ")}.`,
                `Razem odcięto $${ods.map(([u, v]) => v * f(u)).join(" + ")} = ${razemOdc}$ ${z.koniec}.`,
                `Zostało $${calosc} - ${razemOdc} = ${calosc - razemOdc}$ ${z.koniec}.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
