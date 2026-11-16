// Klasa 5 (szkoła podstawowa) · rozdział VI „Matematyka i my” – Matematyka z kluczem 5 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

/** Poprawna forma rzeczownika po liczbie: 1 dzień, 2 dni, 5 dni. */
function mn(n, a, b, c) {
  const m10 = n % 10, m100 = n % 100;
  if (n === 1) return a;
  return m10 >= 2 && m10 <= 4 && !(m100 >= 12 && m100 <= 14) ? b : c;
}
const lw = (n, a, b, c) => `${n} ${mn(n, a, b, c)}`;

/** Liczba (Q) z przecinkiem dziesiętnym do zapisu w $…$: -2{,}5, 12, 0{,}75. */
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

/** To samo, ale liczba ujemna w nawiasie: (-5), (-2{,}5). */
const nw = (x) => (Q.z(x).n < 0 ? `(${zap(x)})` : zap(x));

/** Kwota w złotych: 4{,}50 (dwa miejsca po przecinku), a liczba całkowita bez przecinka: 12. */
function zl(x) {
  const v = Q.z(x);
  const n = (v.n * 100) / v.d;
  if (!Number.isInteger(n)) throw new Error(`Kwota nie jest w groszach: ${v}`);
  if (n % 100 === 0) return String(n / 100);
  return `${Math.floor(n / 100)}{,}${String(n % 100).padStart(2, "0")}`;
}

/** Godzina z minut od północy: 485 -> "8:05". */
const hm = (t) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;

const MIES_DOP = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
const MIES_MIA = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
const DNI_MIES = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const IMIONA = [["Ola", "kupiła", "zapłaciła"], ["Kuba", "kupił", "zapłacił"], ["Ania", "kupiła", "zapłaciła"], ["Tomek", "kupił", "zapłacił"]];

export default {
  tematy: [
    // ------------------------------------------------------------------------------------------------
    {
      id: "kalendarz-zegar",
      nazwa: "Kalendarz i zegar",
      sciaga: [
        {
          nazwa: "Jednostki czasu",
          slownie: "Godzina ma $60$ minut, a minuta ma $60$ sekund. Doba ma $24$ godziny, tydzień ma $7$ dni, a rok ma $12$ miesięcy.",
          tex: "1\\text{ h}=60\\text{ min}\\qquad 1\\text{ min}=60\\text{ s}\\qquad 1\\text{ doba}=24\\text{ h}",
          przyklad: "$2$ h $15$ min $= 2 \\cdot 60 + 15 = 135$ min. Dalej: $3$ min $20$ s $= 3 \\cdot 60 + 20 = 200$ s.",
          uwaga: "W godzinie jest $60$ minut, a nie $100$. Dlatego $1$ h $45$ min to $105$ min, a nie $145$ min.",
        },
        {
          nazwa: "Miesiące i rok przestępny",
          slownie: "Po $31$ dni mają: styczeń, marzec, maj, lipiec, sierpień, październik i grudzień. Po $30$ dni mają: kwiecień, czerwiec, wrzesień i listopad. Luty ma $28$ dni, a w roku przestępnym $29$ dni.",
          przyklad: "Od $25$ maja do $3$ czerwca: do końca maja zostało $31 - 25 = 6$ dni, a potem jeszcze $3$ dni. Razem $6 + 3 = 9$ dni.",
          uwaga: "Rok przestępny wypada co $4$ lata: jego numer dzieli się przez $4$, np. $2028$. Wtedy tylko luty jest dłuższy, ma $29$ dni.",
        },
        {
          nazwa: "Ile czasu minęło?",
          slownie: "Liczymy schodkami: najpierw do najbliższej pełnej godziny, potem pełne godziny, a na końcu reszta minut. Na koniec wszystko dodajemy.",
          tex: "8{:}45\\to 9{:}00\\to 11{:}00\\to 11{:}20",
          przyklad: "Od $8{:}45$ do $11{:}20$: do $9{:}00$ jest $15$ min, do $11{:}00$ jest $2$ h, czyli $120$ min, a potem $20$ min. Razem $15 + 120 + 20 = 155$ min, czyli $2$ h $35$ min.",
          uwaga: "Nie odejmuj godzin jak ułamków dziesiętnych. Wynik $11{,}20 - 8{,}45$ nie ma sensu, bo w godzinie jest $60$ minut, a nie $100$.",
        },
        {
          nazwa: "Wiek i cyfry rzymskie",
          slownie: "Wiek to $100$ lat. Numery wieków piszemy cyframi rzymskimi. Na przykład XXI wiek to lata od $2001$ do $2100$.",
          przyklad: "Rok $1410$: bierzemy $14$ i dodajemy $1$, wychodzi $15$, czyli XV wiek. Rok $1999$ to XX wiek, a rok $2000$ też jeszcze XX wiek.",
          uwaga: "Rok $1900$ to jeszcze XIX wiek, bo XX wiek zaczął się w roku $1901$. Rok kończący się na $00$ jest ostatnim rokiem wieku.",
        },
      ],
      jak: [
        "Zapisz, co jest dane: godziny, daty albo czas trwania.",
        "Czas liczymy schodkami: do pełnej godziny, pełne godziny, reszta minut. Potem dodajemy.",
        "Przy datach policz dni do końca miesiąca i dodaj dni z następnego miesiąca. Pamiętaj, ile dni ma ten miesiąc.",
        "Zamieniając jednostki, pamiętaj: $1$ h $= 60$ min i $1$ min $= 60$ s.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Film trwa $1$ godzinę i $45$ minut. Ile to minut? **Wybierz właściwą odpowiedź.**",
          opcje: ["$145$ min", "$165$ min", "$105$ min", "$95$ min"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Lekcja zaczęła się o $8{:}50$, a skończyła o $9{:}35$. Ile minut trwała lekcja? **Wybierz właściwą odpowiedź.**",
          opcje: ["$85$ min", "$55$ min", "$75$ min", "$45$ min"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "Ile dni minęło od $28$ lutego do $5$ marca w roku przestępnym, na przykład w roku $2028$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$7$", "$6$", "$8$"],
          poprawna: 2,
        },
        {
          nr: "4",
          tresc: "W którym wieku wypada rok $1789$? **Wybierz właściwą odpowiedź.**",
          opcje: ["w XVII wieku", "w XVIII wieku", "w XIX wieku", "w XVI wieku"],
          poprawna: 1,
        },
        {
          nr: "5",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$2$ h $20$ min $= 140$ min", litery: "PF", poprawna: 0 },
            { tekst: "Rok $2030$ jest rokiem przestępnym.", litery: "PF", poprawna: 1 },
            { tekst: "Od $9{:}40$ do $11{:}10$ mija $2$ h $30$ min.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Obóz sportowy zaczął się $27$ czerwca, a skończył $8$ lipca. Ile dni minęło od początku do końca obozu? Ile dni trwał obóz, jeśli liczymy też pierwszy i ostatni dzień? **Zapisz obliczenia.**",
          rozwiazanie: "Czerwiec ma $30$ dni. Do końca czerwca od $27$ czerwca mija $30 - 27 = 3$ dni.\n\nPotem jeszcze $8$ dni lipca: $3 + 8 = 11$ dni.\n\nJeśli liczymy też pierwszy dzień obozu, dodajemy jeszcze $1$ dzień: $11 + 1 = 12$.\n\nOdpowiedź: Od początku do końca obozu minęło $11$ dni, a obóz trwał $12$ dni.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "Pociąg odjeżdża o $14{:}40$ i jedzie $2$ godziny $35$ minut. O której godzinie przyjedzie? Ile to minut jazdy? **Zapisz obliczenia.**",
          rozwiazanie: "Do czasu odjazdu dodajemy $2$ godziny: $14{:}40 + 2$ h $= 16{:}40$.\n\nDo następnej pełnej godziny brakuje $20$ min, więc po $20$ min jest $17{:}00$. Zostało jeszcze $35 - 20 = 15$ min, więc pociąg przyjedzie o $17{:}15$.\n\nMinuty jazdy: $2 \\cdot 60 + 35 = 120 + 35 = 155$.\n\nOdpowiedź: Pociąg przyjedzie o $17{:}15$. Jazda trwa $155$ min.",
        },
      ],
      generatory: [
        {
          id: "ile-minut",
          nazwa: "Ile minut",
          opis: "Ile minut trwa wydarzenie od jednej godziny do drugiej albo ile minut to podany czas w godzinach i minutach.",
          generuj(r) {
            if (r.chance(0.3)) {
              const h = r.int(1, 4), m = r.pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
              const co = r.pick(["Film trwa", "Lot trwał", "Trening trwał", "Spacer trwa", "Koncert trwa"]);
              return {
                tresc: `${co} $${h}$ ${mn(h, "godzinę", "godziny", "godzin")} i $${m}$ minut. Ile to minut?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba minut" }],
                odpowiedz: { w: h * 60 + m },
                wynik: `$${h * 60 + m}$ min`,
                rozwiazanie: [
                  `W jednej godzinie jest $60$ minut, więc $${h}$ h to $${h} \\cdot 60 = ${h * 60}$ min.`,
                  `Dodajemy minuty: $${h * 60} + ${m} = ${h * 60 + m}$ min.`,
                ],
              };
            }
            const h1 = r.int(6, 19), m1 = r.pick([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
            const dur = 5 * r.int(5, 46);
            const start = h1 * 60 + m1, end = start + dur;
            const S = hm(start), E = hm(end);
            const h2 = Math.floor(end / 60), m2 = end % 60;
            const tresc = r.pick([
              `Film w kinie zaczął się o ${S} i skończył o ${E}. Ile minut trwał film?`,
              `Mecz siatkówki zaczął się o ${S}, a skończył o ${E}. Ile minut trwał mecz?`,
              `Pociąg odjechał ze stacji o ${S} i dojechał na miejsce o ${E}. Ile minut trwała podróż?`,
              `Wycieczka do zoo zaczęła się o ${S}, a skończyła o ${E}. Ile minut trwała wycieczka?`,
            ]);
            const kroki = [];
            if (h2 === h1) {
              kroki.push(`Godzina jest ta sama, więc odejmujemy minuty: $${m2} - ${m1} = ${dur}$ min.`);
            } else {
              const czesci = [];
              if (m1 > 0) {
                czesci.push(60 - m1);
                kroki.push(`Od ${S} do ${h1 + 1}:00 mija $${60 - m1}$ min.`);
              }
              const pelne = h2 - h1 - (m1 > 0 ? 1 : 0);
              if (pelne > 0) {
                czesci.push(pelne * 60);
                kroki.push(`Od ${m1 > 0 ? `${h1 + 1}:00` : S} do ${h2}:00 mija $${pelne}$ ${mn(pelne, "godzina", "godziny", "godzin")}, czyli $${pelne * 60}$ min.`);
              }
              if (m2 > 0) {
                czesci.push(m2);
                kroki.push(`Od ${h2}:00 do ${E} mija $${m2}$ min.`);
              }
              kroki.push(czesci.length > 1 ? `Dodajemy: $${czesci.join(" + ")} = ${dur}$ min.` : `Razem: $${dur}$ min.`);
            }
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba minut" }],
              odpowiedz: { w: dur },
              wynik: `$${dur}$ min`,
              rozwiazanie: kroki,
            };
          },
        },
        {
          id: "ile-dni",
          nazwa: "Ile dni minęło",
          opis: "Ile dni mija od jednej daty do drugiej (czasem w roku przestępnym).",
          generuj(r) {
            const m1 = r.int(0, 10);
            const m2 = Math.min(11, m1 + r.pick([0, 1, 1, 1, 2]));
            const dotykaLutego = m1 <= 1 && m2 >= 1;
            const przestepny = dotykaLutego && r.chance(0.5);
            const L = [...DNI_MIES];
            if (przestepny) L[1] = 29;
            let d1, d2;
            if (m1 === m2) {
              d1 = r.int(1, L[m1] - 1);
              d2 = r.int(d1 + 1, L[m1]);
            } else {
              d1 = r.int(1, L[m1]);
              d2 = r.int(1, L[m2]);
            }
            const czesci = [];
            const kroki = [];
            if (dotykaLutego) kroki.push(przestepny ? "Rok jest przestępny, więc luty ma $29$ dni." : "Rok jest zwykły, więc luty ma $28$ dni.");
            let ile;
            if (m1 === m2) {
              ile = d2 - d1;
              kroki.push(`Obie daty są w tym samym miesiącu, więc odejmujemy: $${d2} - ${d1} = ${ile}$ dni.`);
            } else {
              czesci.push(L[m1] - d1);
              kroki.push(`Do końca miesiąca (${MIES_MIA[m1]} ma $${L[m1]}$ dni): $${L[m1]} - ${d1} = ${L[m1] - d1}$ dni.`);
              for (let m = m1 + 1; m < m2; m++) {
                czesci.push(L[m]);
                kroki.push(`Cały miesiąc (${MIES_MIA[m]}) to $${L[m]}$ dni.`);
              }
              czesci.push(d2);
              kroki.push(`W ostatnim miesiącu dochodzi $${d2}$ dni.`);
              ile = czesci.reduce((a, b) => a + b, 0);
              kroki.push(`Dodajemy: $${czesci.join(" + ")} = ${ile}$ dni.`);
            }
            const rok = dotykaLutego ? (przestepny ? " To rok przestępny." : " To rok nieprzestępny.") : "";
            const tresc = r.pick([
              `Obóz sportowy zaczyna się ${d1} ${MIES_DOP[m1]}, a kończy ${d2} ${MIES_DOP[m2]}. Ile dni minie od początku do końca obozu?${rok}`,
              `Ola wyjechała nad morze ${d1} ${MIES_DOP[m1]}, a wróciła ${d2} ${MIES_DOP[m2]}. Ile dni minęło od wyjazdu do powrotu?${rok}`,
              `Remont szkoły rozpoczął się ${d1} ${MIES_DOP[m1]}, a zakończył ${d2} ${MIES_DOP[m2]}. Ile dni minęło od początku do końca remontu?${rok}`,
            ]);
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba dni" }],
              odpowiedz: { w: ile },
              wynik: `$${ile}$ ${mn(ile, "dzień", "dni", "dni")}`,
              rozwiazanie: kroki,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "miary-pieniadze",
      nazwa: "Miary, wagi i pieniądze",
      sciaga: [
        {
          nazwa: "Jednostki długości i masy",
          slownie: "Długość mierzymy w milimetrach, centymetrach, metrach i kilometrach. Masę (wagę) mierzymy w gramach, kilogramach i tonach.",
          tex: "1\\text{ km}=1000\\text{ m}\\qquad 1\\text{ m}=100\\text{ cm}\\qquad 1\\text{ cm}=10\\text{ mm}\\qquad 1\\text{ t}=1000\\text{ kg}\\qquad 1\\text{ kg}=1000\\text{ g}",
          przyklad: "$2{,}5$ km to $2500$ m. A $3400$ g to $3{,}4$ kg. Dalej: $1$ m $20$ cm $= 120$ cm.",
          uwaga: "Nie myl $1$ m $5$ cm z $1{,}5$ m. Pięć centymetrów to $0{,}05$ m, więc $1$ m $5$ cm $= 1{,}05$ m.",
        },
        {
          nazwa: "Zamiana jednostek",
          slownie: "Gdy zamieniasz na mniejszą jednostkę, liczba wychodzi większa, więc mnożymy. Gdy zamieniasz na większą jednostkę, liczba wychodzi mniejsza, więc dzielimy.",
          tex: "3{,}2\\text{ kg}=3{,}2\\cdot 1000\\text{ g}=3200\\text{ g}",
          przyklad: "$450$ cm na metry: metr jest większą jednostką, więc dzielimy przez $100$. Wychodzi $4{,}5$ m. Mnożenie i dzielenie przez $10$, $100$ i $1000$ to przesuwanie przecinka.",
          uwaga: "Najpierw pomyśl: czy liczba ma wyjść większa, czy mniejsza? Jeśli $2$ kg zamieniasz na gramy, nie może wyjść $0{,}002$.",
        },
        {
          nazwa: "Pieniądze i reszta",
          slownie: "Złoty ma $100$ groszy. Ceny zapisujemy z dwoma miejscami po przecinku. Reszta to pieniądze, które płacisz, minus cena zakupów.",
          tex: "1\\text{ zł}=100\\text{ gr}\\qquad \\text{reszta}=\\text{zapłata}-\\text{cena}",
          przyklad: "$3$ bułki po $0{,}80$ zł kosztują $3 \\cdot 0{,}80 = 2{,}40$ zł. Płacę $5$ zł, więc reszta to $5 - 2{,}40 = 2{,}60$ zł.",
          uwaga: "$4{,}5$ zł to $4$ zł $50$ gr, a nie $4$ zł $5$ gr. Pięć groszy to $0{,}05$ zł.",
        },
        {
          nazwa: "Cena i ilość towaru",
          slownie: "Gdy znasz cenę jednego kilograma, to cenę kilku kilogramów liczysz mnożeniem. Żeby porównać dwa sklepy, policz, ile kosztuje taka sama ilość towaru, na przykład $1$ kg.",
          tex: "\\text{koszt}=\\text{ilość}\\cdot\\text{cena za }1\\text{ kg}",
          przyklad: "$2{,}5$ kg jabłek po $4$ zł za kilogram kosztuje $2{,}5 \\cdot 4 = 10$ zł. Dalej: $2$ kg za $9$ zł to $4{,}50$ zł za $1$ kg, więc taniej niż $5$ zł za $1$ kg.",
          uwaga: "Nie porównuj cen paczek o różnej masie. Najpierw policz cenę $1$ kg (albo $100$ g) w obu sklepach.",
        },
      ],
      jak: [
        "Sprawdź, w jakich jednostkach są dane i w jakich ma być wynik.",
        "Zamieniając jednostki, mnóż (na mniejszą jednostkę) albo dziel (na większą) przez $10$, $100$ lub $1000$.",
        "Przy zakupach policz najpierw cenę wszystkich towarów, a potem reszta $=$ zapłata $-$ cena.",
        "Porównując sklepy, policz cenę tej samej ilości, np. $1$ kg.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Ile gramów to $2{,}35$ kg? **Wybierz właściwą odpowiedź.**",
          opcje: ["$235$ g", "$23\\,500$ g", "$2035$ g", "$2350$ g"],
          poprawna: 3,
        },
        {
          nr: "9",
          tresc: "Ola kupiła $3$ bułki po $0{,}90$ zł i sok za $3{,}40$ zł. Zapłaciła $10$ zł. Ile zł reszty dostała? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3{,}90$ zł", "$5{,}70$ zł", "$6{,}10$ zł", "$7{,}30$ zł"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "Mama kupiła $2{,}5$ kg jabłek po $4{,}80$ zł za kilogram. Ile zapłaciła? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7{,}30$ zł", "$12$ zł", "$120$ zł", "$1{,}92$ zł"],
          poprawna: 1,
        },
        {
          nr: "11",
          tresc: "Która długość jest równa $3$ km $40$ m? **Wybierz właściwą odpowiedź.**",
          opcje: ["$340$ m", "$3400$ m", "$3040$ m", "$3{,}4$ km"],
          poprawna: 2,
        },
        {
          nr: "12",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$4500$ g $= 4{,}5$ kg", litery: "PF", poprawna: 0 },
            { tekst: "$0{,}6$ m $= 6$ cm", litery: "PF", poprawna: 1 },
            { tekst: "$7$ zł $5$ gr $= 7{,}50$ zł", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "W sklepie A paczka sera o masie $250$ g kosztuje $6$ zł. W sklepie B paczka sera o masie $0{,}5$ kg kosztuje $11{,}50$ zł. W którym sklepie ser jest tańszy? Policz, ile kosztuje $1$ kg sera w każdym sklepie. **Zapisz obliczenia.**",
          rozwiazanie: "W sklepie A: $1$ kg to $1000$ g, czyli $4$ paczki po $250$ g, bo $4 \\cdot 250 = 1000$. Cena: $4 \\cdot 6 = 24$ zł za $1$ kg.\n\nW sklepie B: $1$ kg to $2$ paczki po $0{,}5$ kg. Cena: $2 \\cdot 11{,}50 = 23$ zł za $1$ kg.\n\nPorównujemy: $23 < 24$.\n\nOdpowiedź: Taniej jest w sklepie B ($23$ zł za $1$ kg, a w sklepie A $24$ zł).",
        },
        {
          nr: "14",
          punkty: 2,
          tresc: "Droga do szkoły ma $1$ km $250$ m. Ola idzie nią rano do szkoły i po lekcjach z powrotem. Ile kilometrów Ola przejdzie w ciągu $5$ dni nauki? **Zapisz obliczenia.**",
          rozwiazanie: "Zamieniamy na metry: $1$ km $250$ m $= 1000 + 250 = 1250$ m.\n\nW jednym dniu Ola idzie tam i z powrotem: $2 \\cdot 1250 = 2500$ m.\n\nW $5$ dni: $5 \\cdot 2500 = 12\\,500$ m.\n\nZamieniamy na kilometry (dzielimy przez $1000$): $12\\,500$ m $= 12{,}5$ km.\n\nOdpowiedź: Ola przejdzie $12{,}5$ km.",
        },
      ],
      generatory: [
        {
          id: "zamiana-jednostek",
          nazwa: "Zamiana jednostek",
          opis: "Zamień długość, masę, czas albo pieniądze na inną jednostkę.",
          generuj(r) {
            const TYPY = [
              { a: "kg", b: "g", f: 1000, nazA: "kilogramy", nazB: "gramy", dec: 2 },
              { a: "m", b: "cm", f: 100, nazA: "metry", nazB: "centymetry", dec: 2 },
              { a: "km", b: "m", f: 1000, nazA: "kilometry", nazB: "metry", dec: 2 },
              { a: "t", b: "kg", f: 1000, nazA: "tony", nazB: "kilogramy", dec: 2 },
              { a: "cm", b: "mm", f: 10, nazA: "centymetry", nazB: "milimetry", dec: 1 },
              { a: "zł", b: "gr", f: 100, nazA: "złote", nazB: "grosze", dec: 2 },
              { a: "h", b: "min", f: 60, nazA: "godziny", nazB: "minuty", dec: 0 },
            ];
            const t = r.pick(TYPY);
            const wDol = r.chance(0.55);
            let zrodlo, wynik;
            if (t.a === "h") {
              if (wDol) {
                zrodlo = q(r.int(1, 19), 4);
                wynik = zrodlo.mul(60);
              } else {
                wynik = q(15 * r.int(1, 40), 60);
                zrodlo = wynik.mul(60);
              }
            } else if (wDol) {
              const n = r.int(11, t.dec === 1 ? 199 : 999);
              zrodlo = q(n, 10 ** t.dec);
              wynik = zrodlo.mul(t.f);
            } else {
              zrodlo = q(r.int(15, 9999));
              wynik = zrodlo.div(t.f);
            }
            const z = wDol ? t.a : t.b, doJ = wDol ? t.b : t.a;
            const nazDo = wDol ? t.nazB : t.nazA;
            const kroki = [];
            if (t.a === "h") {
              kroki.push(`W jednej godzinie jest $60$ minut: $1$ h $= 60$ min.`);
              kroki.push(wDol ? `Zamieniamy na mniejszą jednostkę (minuty), więc mnożymy: $${zap(zrodlo)} \\cdot 60 = ${zap(wynik)}$.` : `Zamieniamy na większą jednostkę (godziny), więc dzielimy: $${zap(zrodlo)} : 60 = ${zap(wynik)}$.`);
            } else {
              kroki.push(`Wiemy, że $1$ ${t.a} $= ${t.f}$ ${t.b}.`);
              const zera = String(t.f).length - 1;
              kroki.push(wDol ? `Zamieniamy na mniejszą jednostkę (${t.b}), więc mnożymy przez $${t.f}$. Przecinek przesuwamy o ${zera} ${mn(zera, "miejsce", "miejsca", "miejsc")} w prawo: $${zap(zrodlo)} \\cdot ${t.f} = ${zap(wynik)}$.` : `Zamieniamy na większą jednostkę (${t.a}), więc dzielimy przez $${t.f}$. Przecinek przesuwamy o ${zera} ${mn(zera, "miejsce", "miejsca", "miejsc")} w lewo: $${zap(zrodlo)} : ${t.f} = ${zap(wynik)}$.`);
            }
            const tz = zap;
            return {
              tresc: `Zamień $${tz(zrodlo)}$ ${z} na ${nazDo}. Ile to ${doJ}?`,
              pola: [{ id: "w", typ: "liczba", etykieta: `Wynik w ${doJ}` }],
              odpowiedz: { w: wynik },
              wynik: `$${tz(wynik)}$ ${doJ}`,
              rozwiazanie: kroki,
            };
          },
        },
        {
          id: "zakupy-reszta",
          nazwa: "Zakupy i reszta",
          opis: "Policz, ile reszty dostaniemy po zakupach: kilka sztuk po tej samej cenie albo towar na wagę.",
          generuj(r) {
            const [imie, kupil, zaplacil] = r.pick(IMIONA);
            if (r.chance(0.5)) {
              const TOW = [
                ["zeszyt", "zeszyty", "zeszytów"], ["długopis", "długopisy", "długopisów"], ["bułka", "bułki", "bułek"],
                ["batonik", "batoniki", "batoników"], ["naklejka", "naklejki", "naklejek"],
              ];
              const [t1, t2, t5] = r.pick(TOW);
              const k = r.int(2, 5);
              const cena = q(5 * r.int(10, 50), 100);
              const inna = q(5 * r.int(20, 80), 100);
              const razem = cena.mul(k).add(inna);
              const banknoty = [10, 20, 50, 100].filter((b) => b > razem.n / razem.d);
              const b = r.chance(0.6) ? banknoty[0] : banknoty[Math.min(1, banknoty.length - 1)];
              const reszta = q(b).sub(razem);
              return {
                tresc: `${imie} ${kupil} $${k}$ ${mn(k, t1, t2, t5)} po $${zl(cena)}$ zł oraz sok za $${zl(inna)}$ zł. ${imie} ${zaplacil} banknotem $${b}$ zł. Ile złotych reszty ${imie === "Kuba" || imie === "Tomek" ? "dostał" : "dostała"}?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Reszta w złotych" }],
                odpowiedz: { w: reszta },
                wynik: `$${zl(reszta)}$ zł`,
                rozwiazanie: [
                  `Za ${k} ${mn(k, t1, t2, t5)} płacimy: $${k} \\cdot ${zl(cena)} = ${zl(cena.mul(k))}$ zł.`,
                  `Razem z sokiem: $${zl(cena.mul(k))} + ${zl(inna)} = ${zl(razem)}$ zł.`,
                  `Reszta to zapłata minus cena: $${b} - ${zl(razem)} = ${zl(reszta)}$ zł.`,
                ],
              };
            }
            const tow = r.pick(["jabłek", "marchewki", "pomarańczy", "ziemniaków", "gruszek"]);
            const kg = q(r.pick([1, 2, 3, 4, 5, 7, 9]), 2);
            const cena = q(r.int(15, 90), 10);
            const razem = kg.mul(cena);
            const banknoty = [10, 20, 50, 100].filter((b) => b > razem.n / razem.d);
            const b = banknoty[r.int(0, Math.min(1, banknoty.length - 1))];
            const reszta = q(b).sub(razem);
            return {
              tresc: `${imie} ${kupil} $${zap(kg)}$ kg ${tow} po $${zl(cena)}$ zł za kilogram i ${zaplacil} banknotem $${b}$ zł. Ile złotych reszty ${imie === "Kuba" || imie === "Tomek" ? "dostał" : "dostała"}?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Reszta w złotych" }],
              odpowiedz: { w: reszta },
              wynik: `$${zl(reszta)}$ zł`,
              rozwiazanie: [
                `Cena zakupów to masa razy cena $1$ kg: $${zap(kg)} \\cdot ${zl(cena)} = ${zl(razem)}$ zł.`,
                `Reszta to zapłata minus cena: $${b} - ${zl(razem)} = ${zl(reszta)}$ zł.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "srednia",
      nazwa: "Średnia arytmetyczna",
      sciaga: [
        {
          nazwa: "Średnia arytmetyczna",
          slownie: "Dodaj wszystkie liczby i podziel sumę przez to, ile ich jest. Średnia to taka liczba, jaką miałby każdy, gdyby wszystko podzielić po równo.",
          tex: "\\text{średnia}=\\frac{\\text{suma liczb}}{\\text{ile jest liczb}}",
          przyklad: "Oceny: $3$, $4$, $5$, $4$. Suma: $3 + 4 + 5 + 4 = 16$. Liczb jest $4$, więc średnia to $16 : 4 = 4$.",
          uwaga: "Dziel przez to, ile jest liczb, a nie przez największą liczbę. Zero też jest liczbą, więc liczy się do średniej.",
        },
        {
          nazwa: "Dzielenie po równo",
          slownie: "Średnia pokazuje, ile dostanie każdy, gdy wszystko połączymy i podzielimy po równo. Średnia jest zawsze między najmniejszą a największą liczbą.",
          przyklad: "W trzech koszykach jest $4$, $6$ i $8$ jabłek. Razem $18$ jabłek. Po równo to $18 : 3 = 6$ jabłek w koszyku. Średnia $6$ leży między $4$ a $8$.",
          uwaga: "Średnia nie musi być liczbą z listy. Średnia z liczb $3$ i $4$ to $3{,}5$.",
        },
        {
          nazwa: "Średnia z ułamków dziesiętnych",
          slownie: "Liczymy tak samo: dodajemy i dzielimy. Średnia z dwóch liczb leży dokładnie w połowie między nimi.",
          tex: "\\frac{12{,}4+12{,}6}{2}=\\frac{25}{2}=12{,}5",
          przyklad: "Czasy biegu: $12{,}4$ s i $12{,}6$ s. Suma to $25$, a średnia $25 : 2 = 12{,}5$ s.",
          uwaga: "Pilnuj przecinka przy dodawaniu: przecinek pod przecinkiem. Wynik dzielenia też może mieć przecinek.",
        },
        {
          nazwa: "Brakująca liczba",
          slownie: "Gdy znasz średnią i to, ile jest liczb, policz sumę: średnia razy liczba liczb. Od sumy odejmij liczby, które już znasz. Zostanie ta brakująca.",
          tex: "\\text{suma}=\\text{średnia}\\cdot\\text{ile jest liczb}",
          przyklad: "Cztery sprawdziany mają dać średnią $5$. Suma ma być $4 \\cdot 5 = 20$. Trzy oceny to $4$, $5$ i $6$, razem $15$. Czwarta to $20 - 15 = 5$.",
          uwaga: "Nie dodawaj średniej do znanych liczb. Najpierw policz, jaka ma być cała suma.",
        },
      ],
      jak: [
        "Dodaj wszystkie liczby.",
        "Policz, ile jest liczb. Zero też liczysz.",
        "Podziel sumę przez to, ile jest liczb.",
        "Gdy brakuje jednej liczby: suma $=$ średnia $\\cdot$ ile jest liczb. Potem odejmij znane liczby.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Jaka jest średnia arytmetyczna liczb $6$, $9$, $4$ i $5$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$24$", "$8$", "$6$", "$5$"],
          poprawna: 2,
        },
        {
          nr: "16",
          tresc: "Przez cztery dni temperatura w południe wynosiła $12$°C, $15$°C, $14$°C i $11$°C. Jaka była średnia temperatura w południe? **Wybierz właściwą odpowiedź.**",
          opcje: ["$13$°C", "$52$°C", "$12{,}5$°C", "$14$°C"],
          poprawna: 0,
        },
        {
          nr: "17",
          tresc: "Jaka jest średnia arytmetyczna liczb $2{,}4$ i $3{,}6$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$1{,}2$", "$3{,}2$", "$3$"],
          poprawna: 3,
        },
        {
          nr: "18",
          tresc: "Średni wiek trójki rodzeństwa to $10$ lat. Dwoje dzieci ma $8$ i $9$ lat. Ile lat ma trzecie dziecko? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10$ lat", "$13$ lat", "$12$ lat", "$17$ lat"],
          poprawna: 1,
        },
        {
          nr: "19",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Średnia arytmetyczna liczb $2$ i $5$ to $3{,}5$.", litery: "PF", poprawna: 0 },
            { tekst: "Średnia arytmetyczna liczb $4$, $4$ i $4$ to $12$.", litery: "PF", poprawna: 1 },
            { tekst: "Średnia z kilku liczb może być większa od największej z nich.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 3,
          tresc: "W pięciu konkursach Ewa zdobyła $18$, $21$, $20$, $19$ i $22$ punkty. Jaka jest średnia liczba jej punktów? Ile punktów musi zdobyć w szóstym konkursie, żeby średnia z sześciu konkursów wyniosła $21$? **Zapisz obliczenia.**",
          rozwiazanie: "Suma punktów z pięciu konkursów: $18 + 21 + 20 + 19 + 22 = 100$.\n\nŚrednia: $100 : 5 = 20$.\n\nŚrednia z sześciu konkursów ma być $21$, więc suma ma być $6 \\cdot 21 = 126$.\n\nW szóstym konkursie potrzeba: $126 - 100 = 26$ punktów.\n\nOdpowiedź: Średnia z pięciu konkursów to $20$ punktów. W szóstym konkursie Ewa musi zdobyć $26$ punktów.",
        },
        {
          nr: "21",
          punkty: 2,
          tresc: "Trzy plecaki ważą $4{,}2$ kg, $5{,}1$ kg i $4{,}8$ kg. Jaka jest średnia masa plecaka? O ile kilogramów najcięższy plecak jest cięższy od tej średniej? **Zapisz obliczenia.**",
          rozwiazanie: "Suma mas: $4{,}2 + 5{,}1 + 4{,}8 = 14{,}1$ kg.\n\nŚrednia: $14{,}1 : 3 = 4{,}7$ kg.\n\nNajcięższy plecak waży $5{,}1$ kg, więc różnica to $5{,}1 - 4{,}7 = 0{,}4$ kg.\n\nOdpowiedź: Średnia masa to $4{,}7$ kg. Najcięższy plecak jest cięższy od średniej o $0{,}4$ kg.",
        },
      ],
      generatory: [
        {
          id: "srednia-liczb",
          nazwa: "Średnia liczb",
          opis: "Policz średnią arytmetyczną kilku liczb (czasem z ułamkami dziesiętnymi).",
          generuj(r) {
            if (r.chance(0.35)) {
              const c = r.pick([2, 3, 4, 4, 5]);
              let n;
              for (;;) {
                n = Array.from({ length: c }, () => r.int(100, 190));
                const s = n.reduce((a, b) => a + b, 0);
                if (c !== 3 || s % 3 === 0) break;
              }
              const s = n.reduce((a, b) => a + b, 0);
              const sr = q(s, 10 * c);
              const lista = n.map((x) => `$${zap(q(x, 10))}$ s`).join(", ");
              return {
                tresc: `W biegu na krótkim dystansie zawodnik uzyskał w ${c} próbach czasy: ${lista}. Jaki był jego średni czas w sekundach?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Średni czas w sekundach" }],
                odpowiedz: { w: sr },
                wynik: `$${zap(sr)}$ s`,
                rozwiazanie: [
                  `Dodajemy czasy (przecinek pod przecinkiem): $${n.map((x) => zap(q(x, 10))).join(" + ")} = ${zap(q(s, 10))}$.`,
                  `Prób było ${c}, więc dzielimy: $${zap(q(s, 10))} : ${c} = ${zap(sr)}$.`,
                ],
              };
            }
            const KONTEKST = [
              { lo: 2, hi: 6, tresc: (c, l) => `Z ${c} sprawdzianów Ania dostała oceny: ${l}. Jaka jest średnia jej ocen?`, jedn: "" },
              { lo: 5, hi: 30, tresc: (c, l) => `W ${c} meczach koszykarz rzucił kolejno punkty: ${l}. Ile punktów rzucał średnio w jednym meczu?`, jedn: "" },
              { lo: 5, hi: 40, tresc: (c, l) => `Kuba przez ${c} dni czytał książkę. Kolejno czytał (w minutach): ${l}. Ile minut czytał średnio dziennie?`, jedn: "" },
              { lo: 4, hi: 25, tresc: (c, l) => `W ${c} kolejnych dniach w południe temperatura wynosiła (w °C): ${l}. Jaka była średnia temperatura w południe?`, jedn: "" },
            ];
            const k = r.pick(KONTEKST);
            const c = r.pick([3, 4, 4, 5]);
            let n;
            for (;;) {
              n = Array.from({ length: c }, () => r.int(k.lo, k.hi));
              const s = n.reduce((a, b) => a + b, 0);
              if (c !== 3 || s % 3 === 0) break;
            }
            const s = n.reduce((a, b) => a + b, 0);
            const sr = q(s, c);
            return {
              tresc: k.tresc(c, n.map((x) => `$${x}$`).join(", ")),
              pola: [{ id: "w", typ: "liczba", etykieta: "Średnia" }],
              odpowiedz: { w: sr },
              wynik: `$${zap(sr)}$`,
              rozwiazanie: [
                `Dodajemy wszystkie liczby: $${n.join(" + ")} = ${s}$.`,
                `Liczb jest ${c}, więc dzielimy sumę przez ${c}: $${s} : ${c} = ${zap(sr)}$.`,
              ],
            };
          },
        },
        {
          id: "brakujaca-liczba",
          nazwa: "Brakująca liczba",
          opis: "Znamy średnią i kilka liczb. Znajdź ostatnią liczbę.",
          generuj(r) {
            const c = r.pick([3, 4, 4, 5]);
            const polowa = c === 4 && r.chance(0.35);
            const srednia = polowa ? q(2 * r.int(3, 9) + 1, 2) : q(r.int(3, 12));
            const suma = srednia.mul(c);
            let znane, x;
            for (;;) {
              znane = Array.from({ length: c - 1 }, () => Math.max(1, Math.round(srednia.n / srednia.d) + r.int(-3, 3)));
              x = suma.n / suma.d - znane.reduce((a, b) => a + b, 0);
              if (x >= 1 && x <= 2 * Math.round(srednia.n / srednia.d) + 4) break;
            }
            const tresc = r.pick([
              `Ala zagrała ${lw(c, "rundę", "rundy", "rund")} w grze planszowej. W pierwszych ${c - 1} ${mn(c - 1, "rundzie", "rundach", "rundach")} zdobyła: ${znane.map((v) => `$${v}$`).join(", ")} punktów. Ile punktów musi zdobyć w ostatniej rundzie, żeby średnia z ${c} rund wyniosła $${zap(srednia)}$?`,
              `Z ${c - 1} sprawdzianów Tomek ma wyniki: ${znane.map((v) => `$${v}$`).join(", ")} punktów. Ile punktów musi dostać z ostatniego sprawdzianu, żeby średnia z ${c} sprawdzianów wyniosła $${zap(srednia)}$?`,
            ]);
            const sz = znane.reduce((a, b) => a + b, 0);
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: "Brakująca liczba punktów" }],
              odpowiedz: { w: x },
              wynik: `$${x}$`,
              rozwiazanie: [
                `Cała suma ma być równa średniej razy liczba liczb: $${zap(srednia)} \\cdot ${c} = ${zap(suma)}$.`,
                `Znane liczby dają razem: $${znane.join(" + ")} = ${sz}$.`,
                `Brakująca liczba to: $${zap(suma)} - ${sz} = ${x}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "liczby-ujemne",
      nazwa: "Liczby dodatnie i ujemne",
      sciaga: [
        {
          nazwa: "Liczby dodatnie i ujemne",
          slownie: "Na termometrze temperatura powyżej zera to liczba dodatnia, a poniżej zera to liczba ujemna. Liczby ujemne mają przed sobą minus. Zero nie jest ani dodatnie, ani ujemne.",
          tex: "-5<0<3",
          przyklad: "$-3$°C to trzy stopnie poniżej zera. Piętro $-2$ to drugi poziom garażu pod ziemią. Saldo $-15$ zł znaczy, że jesteśmy winni $15$ zł.",
          uwaga: "$-3$ i $3$ to dwie różne liczby. Minus mówi, że liczba leży po drugiej stronie zera.",
        },
        {
          nazwa: "Oś liczbowa",
          slownie: "Na osi liczbowej liczby dodatnie leżą na prawo od zera, a ujemne na lewo. Im dalej w prawo, tym liczba jest większa.",
          tex: "\\ldots<-2<-1<0<1<2<\\ldots",
          przyklad: "Liczba $-3$ leży na lewo od zera, w odległości $3$ kroków. Liczba $4$ leży na prawo od zera, w odległości $4$ kroków.",
          uwaga: "Ujemne liczby rosną w prawo, ku zeru: $-5$ jest bliżej zera niż $-8$.",
        },
        {
          nazwa: "Porównywanie liczb",
          slownie: "Każda liczba ujemna jest mniejsza od zera, a zero jest mniejsze od każdej dodatniej. Z dwóch liczb ujemnych większa jest ta, która leży bliżej zera.",
          tex: "-8<-2\\qquad -1<0\\qquad -3<4",
          przyklad: "$-2 > -7$, bo temperatura $-2$°C jest cieplejsza niż $-7$°C. Dalej: $-0{,}5 > -0{,}8$, bo $-0{,}5$ jest bliżej zera.",
          uwaga: "$-9$ nie jest większe od $-2$ tylko dlatego, że $9 > 2$. Bliżej zera jest $-2$, więc $-2 > -9$.",
        },
        {
          nazwa: "Liczby przeciwne i całkowite",
          slownie: "Liczby przeciwne leżą w takiej samej odległości od zera, ale po różnych stronach. Liczby całkowite to liczby naturalne, zero i liczby przeciwne do naturalnych: $\\ldots, -2, -1, 0, 1, 2, \\ldots$",
          tex: "7\\text{ i }-7\\qquad -4\\text{ i }4",
          przyklad: "Przeciwna do $7$ to $-7$. Przeciwna do $-4$ to $4$. Przeciwna do $0$ to $0$. Liczba $-2{,}5$ nie jest całkowita, bo leży między $-3$ a $-2$.",
          uwaga: "Liczba przeciwna to nie to samo co odwrotna. Przeciwna do $8$ to $-8$, a odwrotna to $\\frac{1}{8}$.",
        },
      ],
      jak: [
        "Wyobraź sobie termometr albo oś liczbową. Liczba ujemna jest po lewej stronie zera.",
        "Porównując, szukaj liczby bardziej na prawo. Ta jest większa. Ujemne bliżej zera są większe.",
        "Liczbę przeciwną dostajesz, zmieniając znak liczby. To tak, jakbyś odbił liczbę przez zero.",
        "Zadanie o piętrach lub temperaturach: narysuj małą oś albo termometr i zaznacz punkty.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Rano zmierzono temperaturę: w Zakopanem $-6$°C, w Gdańsku $-2$°C, w Poznaniu $0$°C, w Krakowie $1$°C. Gdzie było najzimniej? **Wybierz właściwą odpowiedź.**",
          opcje: ["w Gdańsku", "w Poznaniu", "w Zakopanem", "w Krakowie"],
          poprawna: 2,
        },
        {
          nr: "23",
          tresc: "Jaka liczba jest przeciwna do liczby $-8$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{8}$", "$-8$", "$0$", "$8$"],
          poprawna: 3,
        },
        {
          nr: "24",
          tresc: "Która nierówność jest prawdziwa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-7<-4$", "$-3>-1$", "$-5<-8$", "$0<-1$"],
          poprawna: 0,
        },
        {
          nr: "25",
          tresc: "Ile liczb całkowitych leży na osi liczbowej między $-3$ a $2$ (bez tych dwóch liczb)? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$4$", "$5$", "$6$"],
          poprawna: 1,
        },
        {
          nr: "26",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$-0{,}5 < -0{,}8$", litery: "PF", poprawna: 1 },
            { tekst: "Liczba przeciwna do $-2{,}5$ to $2{,}5$.", litery: "PF", poprawna: 0 },
            { tekst: "Zero jest liczbą dodatnią.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Rano w sześciu miastach było: $-3$°C, $2$°C, $-7$°C, $0$°C, $-1$°C i $5$°C. Ustaw te temperatury od najniższej do najwyższej. W ilu miastach było poniżej zera? **Zapisz obliczenia.**",
          rozwiazanie: "Ujemne temperatury to $-3$, $-7$ i $-1$. Z ujemnych najmniejsza jest ta, która jest najdalej od zera: $-7 < -3 < -1$.\n\nPotem zero, a potem dodatnie: $0 < 2 < 5$.\n\nUstawiamy wszystkie: $-7 < -3 < -1 < 0 < 2 < 5$.\n\nPoniżej zera były $3$ temperatury.\n\nOdpowiedź: Od najniższej: $-7$°C, $-3$°C, $-1$°C, $0$°C, $2$°C, $5$°C. Poniżej zera było w $3$ miastach.",
        },
        {
          nr: "28",
          punkty: 2,
          tresc: "Winda w centrum handlowym jeździ między piętrami od $-3$ do $4$. Piętra $-3$, $-2$ i $-1$ to parkingi pod ziemią, a $0$ to parter. Ile pięter jest pod ziemią? Ile pięter jest nad parterem? Na ilu różnych piętrach może zatrzymać się winda? **Zapisz obliczenia.**",
          rozwiazanie: "Pod ziemią są piętra $-3$, $-2$ i $-1$, czyli $3$ piętra.\n\nNad parterem są piętra $1$, $2$, $3$ i $4$, czyli $4$ piętra.\n\nWinda zatrzymuje się na wszystkich piętrach od $-3$ do $4$: $3$ pod ziemią, parter i $4$ nad ziemią. Razem $3 + 1 + 4 = 8$.\n\nOdpowiedź: Pod ziemią są $3$ piętra, nad parterem $4$ piętra, a winda może się zatrzymać na $8$ piętrach.",
        },
      ],
      generatory: [
        {
          id: "liczba-przeciwna",
          nazwa: "Liczba przeciwna",
          opis: "Podaj liczbę przeciwną do podanej liczby (całkowitej albo z ułamkiem dziesiętnym).",
          generuj(r) {
            const dz = r.chance(0.35);
            const x = dz ? q(r.int(1, 99) * (r.chance(0.5) ? 1 : -1), 10) : q(r.int(1, 60) * r.znak());
            const odp = x.neg();
            const tresc = r.pick([
              `Podaj liczbę przeciwną do liczby $${zap(x)}$.`,
              `Jaka liczba leży w tej samej odległości od zera co $${zap(x)}$, ale po drugiej stronie zera?`,
              `Wpisz liczbę przeciwną do $${zap(x)}$.`,
            ]);
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba przeciwna" }],
              odpowiedz: { w: odp },
              wynik: `$${zap(odp)}$`,
              rozwiazanie: [
                `Liczba $${zap(x)}$ leży ${x.n < 0 ? "na lewo" : "na prawo"} od zera, w odległości $${zap(x.n < 0 ? x.neg() : x)}$.`,
                `Liczba przeciwna leży tyle samo kroków od zera, ale po drugiej stronie, czyli ${odp.n < 0 ? "na lewo" : "na prawo"}: $${zap(odp)}$.`,
              ],
            };
          },
        },
        {
          id: "porownaj-ujemne",
          nazwa: "Porównaj liczby",
          opis: "Wstaw znak $<$, $=$ lub $>$ między dwiema liczbami, z których przynajmniej jedna jest ujemna.",
          generuj(r) {
            const typ = r.int(0, 4);
            let a, b;
            if (typ === 0) {
              a = q(-r.int(1, 40));
              b = q(-r.int(1, 40));
            } else if (typ === 1) {
              a = q(-r.int(1, 30));
              b = q(r.int(0, 30));
            } else if (typ === 2) {
              const c = r.int(1, 9);
              a = q(-(c * 10 + r.int(1, 9)), 10);
              b = q(-(c * 10 + r.int(1, 9)), 10);
            } else if (typ === 3) {
              a = q(-r.int(1, 20));
              b = q(r.int(1, 20) * -10 + r.int(0, 9), 10);
            } else {
              a = q(-r.int(1, 25));
              b = a;
            }
            if (r.chance(0.5)) [a, b] = [b, a];
            const c = a.cmp(b);
            const wyn = c < 0 ? 0 : c === 0 ? 1 : 2;
            const ZN = ["<", "=", ">"];
            const kroki = [];
            if (c === 0) {
              kroki.push(`Obie liczby leżą w tym samym miejscu osi liczbowej, więc są równe.`);
            } else if (a.n < 0 && b.n < 0) {
              const blizej = c > 0 ? a : b;
              kroki.push(`Obie liczby są ujemne. Większa jest ta, która leży bliżej zera.`);
              kroki.push(`Liczba $${zap(blizej)}$ jest bliżej zera, więc jest większa od drugiej.`);
            } else if (a.n < 0 || b.n < 0) {
              kroki.push(`Jedna liczba jest ujemna, a druga nie jest. Liczba ujemna leży na osi na lewo od zera, więc jest mniejsza.`);
            }
            kroki.push(`Zatem $${zap(a)} ${ZN[wyn]} ${zap(b)}$.`);
            return {
              tresc: r.pick([`Jaki znak ($<$, $=$ albo $>$) trzeba wstawić między $${zap(a)}$ i $${zap(b)}$?`, `Porównaj liczby $${zap(a)}$ i $${zap(b)}$. Jaki znak należy wstawić między nie?`]),
              pola: [{ id: "w", typ: "wybor", etykieta: "Znak", opcje: ["$<$", "$=$", "$>$"] }],
              odpowiedz: { w: wyn },
              wynik: `$${zap(a)} ${ZN[wyn]} ${zap(b)}$`,
              rozwiazanie: kroki,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "dodawanie-calkowitych",
      nazwa: "Dodawanie liczb całkowitych",
      sciaga: [
        {
          nazwa: "Dodawanie na osi liczbowej",
          slownie: "Zaczynamy w miejscu pierwszej liczby. Gdy dodajemy liczbę dodatnią, idziemy w prawo. Gdy dodajemy liczbę ujemną, idziemy w lewo.",
          tex: "3+(-5)=-2",
          przyklad: "$-2 + 6$: zaczynamy w $-2$ i idziemy $6$ kroków w prawo. Dochodzimy do $4$. Dalej: $3 + (-5)$: zaczynamy w $3$ i idziemy $5$ kroków w lewo, dochodzimy do $-2$.",
          uwaga: "Liczbę ujemną w działaniu zapisujemy w nawiasie, np. $3 + (-5)$. Bez nawiasu dwa znaki stoją obok siebie i trudno się połapać.",
        },
        {
          nazwa: "Liczby o tych samych znakach",
          slownie: "Gdy obie liczby są ujemne, dodajemy ich odległości od zera i przed wynikiem piszemy minus. Gdy obie są dodatnie, po prostu dodajemy.",
          tex: "-3+(-4)=-7",
          przyklad: "$-12 + (-5)$: odległości od zera to $12$ i $5$, razem $17$. Obie liczby były ujemne, więc wynik to $-17$.",
          uwaga: "$-3 + (-4)$ nie jest równe $1$. Dwa spadki temperatury razem dają większy spadek.",
        },
        {
          nazwa: "Liczby o różnych znakach",
          slownie: "Odejmij mniejszą odległość od zera od większej. Wynik ma taki znak, jaki ma liczba leżąca dalej od zera.",
          tex: "-9+4=-5\\qquad 9+(-4)=5",
          przyklad: "$-7 + 10$: odległości od zera to $7$ i $10$. Dalej od zera jest $10$ i jest dodatnia, więc wynik jest dodatni: $10 - 7 = 3$.",
          uwaga: "$-9 + 4$ nie daje $5$. Liczba $-9$ jest dalej od zera niż $4$, więc wynik jest ujemny: $-5$.",
        },
        {
          nazwa: "Liczby przeciwne i temperatura",
          slownie: "Suma liczb przeciwnych jest równa zero. Spadek temperatury o $4$ stopnie to dodanie liczby $-4$. Wzrost o $4$ stopnie to dodanie $4$.",
          tex: "5+(-5)=0",
          przyklad: "Rano $-2$°C. Do południa wzrost o $7$ stopni: $-2 + 7 = 5$°C. Wieczorem spadek o $8$ stopni: $5 + (-8) = -3$°C.",
          uwaga: "Wzrost temperatury dodaje liczbę dodatnią, a spadek dodaje liczbę ujemną. Nie pomyl kierunku.",
        },
      ],
      jak: [
        "Sprawdź znaki obu liczb.",
        "Takie same znaki: dodaj odległości od zera, wynik ma ten sam znak.",
        "Różne znaki: odejmij mniejszą odległość od większej. Znak wyniku jest taki jak znak liczby, która leży dalej od zera.",
        "Gdy się pogubisz, narysuj oś liczbową i policz kroki w prawo albo w lewo.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Ile to jest $-6 + 10$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-4$", "$16$", "$4$", "$-16$"],
          poprawna: 2,
        },
        {
          nr: "30",
          tresc: "Ile to jest $-5 + (-8)$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-3$", "$3$", "$13$", "$-13$"],
          poprawna: 3,
        },
        {
          nr: "31",
          tresc: "Rano temperatura wynosiła $-3$°C. Do południa wzrosła o $9$ stopni. Ile stopni było w południe? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$°C", "$-12$°C", "$12$°C", "$-6$°C"],
          poprawna: 0,
        },
        {
          nr: "32",
          tresc: "Winda stała na piętrze $-2$ (garaż pod ziemią). Pojechała o $5$ pięter w górę, a potem o $4$ piętra w dół. Na którym piętrze jest teraz? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$", "$1$", "$-1$", "$-7$"],
          poprawna: 2,
        },
        {
          nr: "33",
          tresc: "Która z sum jest równa zero? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-4 + (-4)$", "$4 + 4$", "$-4 + 0$", "$-4 + 4$"],
          poprawna: 3,
        },
        {
          nr: "34",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$-3 + (-3) = -6$", litery: "PF", poprawna: 0 },
            { tekst: "$5 + (-8) = 3$", litery: "PF", poprawna: 1 },
            { tekst: "$-9 + 12 = 3$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "35",
          punkty: 2,
          tresc: "Zosia ma w grze komputerowej wynik $-12$ punktów (jest „na minusie”). Najpierw zdobyła $20$ punktów, a potem straciła $15$ punktów. Jaki jest teraz jej wynik? **Zapisz obliczenia.**",
          rozwiazanie: "Po zdobyciu punktów: $-12 + 20$. Liczby mają różne znaki, odległości od zera to $12$ i $20$. Dalej od zera jest $20$ (dodatnia), więc wynik jest dodatni: $20 - 12 = 8$.\n\nStrata $15$ punktów to dodanie liczby $-15$: $8 + (-15)$.\n\nOdległości od zera to $8$ i $15$. Dalej jest $-15$, więc wynik jest ujemny: $15 - 8 = 7$, czyli $-7$.\n\nOdpowiedź: Wynik Zosi to $-7$ punktów.",
        },
        {
          nr: "36",
          punkty: 2,
          tresc: "Wieczorem było $-4$°C. W nocy temperatura spadła o $6$ stopni, a rano wzrosła o $9$ stopni. Ile stopni było rano? Czy rano było cieplej niż wieczorem? **Zapisz obliczenia.**",
          rozwiazanie: "Spadek o $6$ stopni to dodanie $-6$: $-4 + (-6) = -10$ (obie liczby ujemne, więc dodajemy odległości $4 + 6 = 10$ i piszemy minus).\n\nWzrost o $9$ stopni: $-10 + 9$. Dalej od zera jest $-10$, więc wynik jest ujemny: $10 - 9 = 1$, czyli $-1$.\n\nPorównujemy: $-1 > -4$, bo $-1$ leży bliżej zera.\n\nOdpowiedź: Rano było $-1$°C. Tak, rano było cieplej niż wieczorem.",
        },
      ],
      generatory: [
        {
          id: "dodaj-calkowite",
          nazwa: "Dodaj liczby",
          opis: "Dodaj dwie liczby całkowite (dodatnie i ujemne).",
          generuj(r) {
            let a = r.intBez(-20, 20, 0);
            let b = r.intBez(-20, 20, 0);
            if (r.chance(0.1)) b = -a;
            const w = a + b;
            const pa = Math.abs(a), pb = Math.abs(b);
            const kroki = [];
            if (w === 0 && a === -b) {
              kroki.push(`Liczby $${a}$ i $${b}$ są przeciwne: leżą tyle samo kroków od zera, po różnych stronach.`);
              kroki.push(`Suma liczb przeciwnych to $0$.`);
            } else if (a > 0 && b > 0) {
              kroki.push(`Obie liczby są dodatnie, więc po prostu dodajemy: $${a} + ${b} = ${w}$.`);
            } else if (a < 0 && b < 0) {
              kroki.push(`Obie liczby są ujemne. Dodajemy ich odległości od zera: $${pa} + ${pb} = ${pa + pb}$.`);
              kroki.push(`Wynik jest ujemny: $${w}$.`);
            } else {
              const dalej = pa > pb ? a : b;
              kroki.push(`Liczby mają różne znaki. Odległości od zera to $${pa}$ i $${pb}$.`);
              kroki.push(`Odejmujemy mniejszą od większej: $${Math.max(pa, pb)} - ${Math.min(pa, pb)} = ${Math.abs(w)}$.`);
              kroki.push(`Dalej od zera leży $${dalej}$ (liczba ${dalej < 0 ? "ujemna" : "dodatnia"}), więc wynik jest ${dalej < 0 ? "ujemny" : "dodatni"}: $${w}$.`);
            }
            return {
              tresc: r.pick([`Oblicz $${zap(a)} + ${nw(b)}$.`, `Ile to jest $${zap(a)} + ${nw(b)}$?`, `Podaj wynik działania $${zap(a)} + ${nw(b)}$.`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w },
              wynik: `$${w}$`,
              rozwiazanie: kroki,
            };
          },
        },
        {
          id: "temperatura-winda",
          nazwa: "Temperatura i winda",
          opis: "Dwie zmiany po sobie: temperatura na termometrze albo piętro windy. Policz wynik końcowy.",
          generuj(r) {
            const winda = r.chance(0.45);
            let s, c1, c2, m, f;
            for (;;) {
              if (winda) {
                s = r.int(-3, 6);
                c1 = r.intBez(-8, 8, 0);
                c2 = r.intBez(-8, 8, 0);
              } else {
                s = r.int(-10, 10);
                c1 = r.intBez(-9, 9, 0);
                c2 = r.intBez(-9, 9, 0);
              }
              m = s + c1;
              f = m + c2;
              if (winda ? m >= -3 && f >= -3 && m <= 12 && f <= 12 : Math.abs(m) <= 15 && Math.abs(f) <= 15) break;
            }
            const kroki = [
              `${winda ? (c1 > 0 ? "Jazda w górę" : "Jazda w dół") : (c1 > 0 ? "Wzrost" : "Spadek")} to dodanie liczby $${c1}$: $${zap(s)} + ${nw(c1)} = ${m}$.`,
              `${winda ? (c2 > 0 ? "Jazda w górę" : "Jazda w dół") : (c2 > 0 ? "Wzrost" : "Spadek")} to dodanie liczby $${c2}$: $${m} + ${nw(c2)} = ${f}$.`,
            ];
            if (winda) {
              const op = (c) => `${c > 0 ? "w górę" : "w dół"} o ${lw(Math.abs(c), "piętro", "piętra", "pięter")}`;
              return {
                tresc: `Winda stała na piętrze $${s}$ (piętra ujemne są pod ziemią). Pojechała ${op(c1)}, a potem ${op(c2)}. Na którym piętrze jest teraz?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Numer piętra" }],
                odpowiedz: { w: f },
                wynik: `$${f}$`,
                rozwiazanie: kroki,
              };
            }
            const op = (c) => `${c > 0 ? "wzrosła" : "spadła"} o ${lw(Math.abs(c), "stopień", "stopnie", "stopni")}`;
            return {
              tresc: `Rano temperatura wynosiła $${s}$°C. Do południa ${op(c1)}, a wieczorem ${op(c2)}. Ile stopni było wieczorem?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Temperatura wieczorem w °C" }],
              odpowiedz: { w: f },
              wynik: `$${f}$°C`,
              rozwiazanie: kroki,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "o-ile-roznia-sie",
      nazwa: "O ile różnią się liczby",
      sciaga: [
        {
          nazwa: "O ile różnią się liczby",
          slownie: "Żeby sprawdzić, o ile jedna liczba jest większa od drugiej, policzymy kroki na osi liczbowej od mniejszej do większej. Liczba kroków to odpowiedź.",
          tex: "3\\to 8:\\ 8-3=5",
          przyklad: "$3$ i $8$ różnią się o $5$, bo od $3$ do $8$ jest $5$ kroków. Dalej: od $-9$ do $-4$ jest $5$ kroków, bo odległości od zera to $9$ i $4$, a $9 - 4 = 5$.",
          uwaga: "Liczba kroków jest zawsze dodatnia. Mówimy „o $5$”, a nie „o $-5$”.",
        },
        {
          nazwa: "Liczby po różnych stronach zera",
          slownie: "Gdy jedna liczba jest ujemna, a druga dodatnia, droga prowadzi przez zero. Dodajemy odległości obu liczb od zera.",
          tex: "-3\\to 5:\\ 3+5=8",
          przyklad: "Rano było $-6$°C, a w południe $4$°C. Od $-6$ do zera jest $6$ kroków, od zera do $4$ jeszcze $4$ kroki. Razem $6 + 4 = 10$ stopni.",
          uwaga: "$-3$ i $5$ nie różnią się o $2$. Trzeba przejść przez zero, więc $3 + 5 = 8$.",
        },
        {
          nazwa: "Liczba o tyle większa lub mniejsza",
          slownie: "Liczba o $k$ większa leży $k$ kroków na prawo. Liczba o $k$ mniejsza leży $k$ kroków na lewo. Możemy zapisać to dodawaniem.",
          tex: "-8+5=-3\\qquad 1+(-4)=-3",
          przyklad: "O $5$ większa od $-8$ to $-8 + 5 = -3$. O $4$ mniejsza od $1$: idziemy $4$ kroki w lewo ($0$, $-1$, $-2$, $-3$), więc $1 + (-4) = -3$.",
          uwaga: "O $3$ mniejsza od $-2$ to $-5$, a nie $-1$. Mniejsza liczba leży po lewej.",
        },
        {
          nazwa: "Najwyższa i najniższa wartość",
          slownie: "Gdy chcemy wiedzieć, jak bardzo różnią się wszystkie wyniki, szukamy najmniejszej i największej liczby i liczymy, o ile się różnią.",
          przyklad: "Temperatury w tygodniu: $-4$°C, $2$°C, $-1$°C, $5$°C. Najzimniej było $-4$°C, a najcieplej $5$°C. Różnica: $4 + 5 = 9$ stopni.",
          uwaga: "Najmniejsza liczba to ta najbardziej na lewo, a nie ta z najmniejszą cyfrą. Wśród $-4$ i $2$ najmniejsza jest $-4$.",
        },
      ],
      jak: [
        "Znajdź na osi obie liczby. Mniejsza leży bardziej na lewo.",
        "Ta sama strona zera: odejmij mniejszą odległość od zera od większej.",
        "Różne strony zera: dodaj odległości obu liczb od zera.",
        "„O ile większa” to kroki w prawo, a „o ile mniejsza” to kroki w lewo.",
      ],
      zadania: [
        {
          nr: "37",
          tresc: "O ile liczba $9$ jest większa od liczby $-3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$6$", "$11$", "$12$", "$-6$"],
          poprawna: 2,
        },
        {
          nr: "38",
          tresc: "Rano temperatura wynosiła $-8$°C, a w południe $-2$°C. O ile stopni wzrosła temperatura? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10$", "$6$", "$-6$", "$-10$"],
          poprawna: 1,
        },
        {
          nr: "39",
          tresc: "Jaka liczba jest o $5$ mniejsza od liczby $-2$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$-3$", "$3$", "$7$", "$-7$"],
          poprawna: 3,
        },
        {
          nr: "40",
          tresc: "Winda jedzie z piętra $-3$ na piętro $4$. O ile pięter jedzie w górę? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$1$", "$12$", "$-7$"],
          poprawna: 0,
        },
        {
          nr: "41",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Liczby $-7$ i $2$ różnią się o $5$.", litery: "PF", poprawna: 1 },
            { tekst: "Liczby $-7$ i $-2$ różnią się o $5$.", litery: "PF", poprawna: 0 },
            { tekst: "Liczba o $3$ większa od $-1$ to $2$.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "42",
          tresc: "W pewnym tygodniu najcieplej było $6$°C, a najzimniej $-5$°C. Ile stopni wynosi różnica między najwyższą i najniższą temperaturą? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1$ stopień", "$11$ stopni", "$-11$ stopni", "$30$ stopni"],
          poprawna: 1,
        },
      ],
      otwarte: [
        {
          nr: "43",
          punkty: 2,
          tresc: "W nocy było $-9$°C, w południe $6$°C, a wieczorem $-2$°C. O ile stopni wzrosła temperatura od nocy do południa? O ile stopni spadła od południa do wieczora? **Zapisz obliczenia.**",
          rozwiazanie: "Od nocy do południa: liczby $-9$ i $6$ leżą po różnych stronach zera, więc dodajemy odległości od zera: $9 + 6 = 15$.\n\nOd południa do wieczora: liczby $6$ i $-2$ też leżą po różnych stronach zera: $6 + 2 = 8$.\n\nOdpowiedź: Temperatura wzrosła o $15$ stopni, a potem spadła o $8$ stopni.",
        },
        {
          nr: "44",
          punkty: 2,
          tresc: "Na osi liczbowej zaznaczono liczby $-5$ i $9$. Jaka liczba leży dokładnie w połowie drogi między nimi? **Zapisz obliczenia.**",
          rozwiazanie: "Liczby leżą po różnych stronach zera, więc odległość między nimi to $5 + 9 = 14$.\n\nPołowa tej odległości to $14 : 2 = 7$.\n\nIdziemy od $-5$ o $7$ kroków w prawo: $-5 + 7 = 2$.\n\nSprawdzenie: od $2$ do $9$ też jest $9 - 2 = 7$ kroków.\n\nOdpowiedź: Szukana liczba to $2$.",
        },
      ],
      generatory: [
        {
          id: "o-ile-wieksza",
          nazwa: "O ile większa",
          opis: "Policz, o ile jedna liczba jest większa od drugiej, albo o ile zmieniła się temperatura.",
          generuj(r) {
            let a, b;
            do {
              a = r.int(-20, 20);
              b = r.int(-20, 20);
            } while (a >= b);
            const pa = Math.abs(a), pb = Math.abs(b);
            const roznica = b - a;
            const kroki = [];
            if (a >= 0) {
              kroki.push(`Obie liczby leżą po tej samej stronie zera (są dodatnie lub zero). Odejmujemy odległości od zera: $${b} - ${a} = ${roznica}$.`);
            } else if (b <= 0) {
              kroki.push(`Obie liczby leżą po tej samej stronie zera (są ujemne lub zero). Odległości od zera to $${pa}$ i $${pb}$.`);
              kroki.push(`Odejmujemy mniejszą od większej: $${pa} - ${pb} = ${roznica}$.`);
            } else {
              kroki.push(`Liczby leżą po różnych stronach zera, więc droga prowadzi przez zero. Odległości od zera to $${pa}$ i $${pb}$.`);
              kroki.push(`Dodajemy je: $${pa} + ${pb} = ${roznica}$.`);
            }
            const typ = r.int(0, 3);
            let tresc;
            if (typ === 0) {
              tresc = `O ile liczba $${b}$ jest większa od liczby $${a}$?`;
            } else if (typ === 1) {
              tresc = `O ile stopni wzrosła temperatura, jeśli rano było $${a}$°C, a w południe $${b}$°C?`;
            } else if (typ === 2) {
              tresc = `O ile stopni spadła temperatura, jeśli w południe było $${b}$°C, a wieczorem $${a}$°C?`;
            } else {
              tresc = `Winda jechała z piętra $${a}$ na piętro $${b}$. O ile pięter pojechała w górę?`;
            }
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: "O ile" }],
              odpowiedz: { w: roznica },
              wynik: `$${roznica}$`,
              rozwiazanie: kroki,
            };
          },
        },
        {
          id: "liczba-o-k",
          nazwa: "Liczba o k więcej lub mniej",
          opis: "Znajdź liczbę o kilka większą albo mniejszą od danej (na osi liczbowej).",
          generuj(r) {
            const x = r.int(-15, 15);
            const k = r.int(1, 12);
            const wiekszy = r.chance(0.5);
            const w = wiekszy ? x + k : x - k;
            const kroki = wiekszy
              ? [`Liczba o $${k}$ większa leży $${k}$ ${mn(k, "krok", "kroki", "kroków")} na prawo od $${x}$.`, `Zapisujemy dodawaniem: $${zap(x)} + ${k} = ${w}$.`]
              : [`Liczba o $${k}$ mniejsza leży $${k}$ ${mn(k, "krok", "kroki", "kroków")} na lewo od $${x}$.`, `Zapisujemy dodawaniem liczby ujemnej: $${zap(x)} + (-${k}) = ${w}$.`];
            return {
              tresc: r.pick([
                `Jaka liczba jest o $${k}$ ${wiekszy ? "większa" : "mniejsza"} od liczby $${x}$?`,
                `Znajdź liczbę, która jest o $${k}$ ${wiekszy ? "większa" : "mniejsza"} od $${x}$.`,
              ]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Szukana liczba" }],
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
