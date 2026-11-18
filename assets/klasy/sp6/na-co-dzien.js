// Klasa 6 (szkoła podstawowa) · rozdział VIII „Matematyka na co dzień” – Matematyka z kluczem 6 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";   // tylko pomocnicze z wspolne.js

// --- Pomocnicze (tylko dla tego pliku)

/** Poprawna forma rzeczownika po liczbie: 1 ar, 2 ary, 5 arów. */
function mn(n, a, b, c) {
  const m10 = n % 10, m100 = n % 100;
  if (n === 1) return a;
  return m10 >= 2 && m10 <= 4 && !(m100 >= 12 && m100 <= 14) ? b : c;
}

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

/** Kwota z groszy do zapisu w $…$: 1250 -> "12{,}50", 900 -> "9". */
const zl = (g) => (g % 100 === 0 ? String(g / 100) : `${Math.floor(g / 100)}{,}${String(g % 100).padStart(2, "0")}`);
/** Kwota z groszy z jednostką: „$12{,}50$ zł”. */
const zz = (g) => `$${zl(g)}$ zł`;
/** Godzina do zapisu w $…$: 8{:}05. */
const cz = (h, m) => `${h}{:}${String(m).padStart(2, "0")}`;
/** Odcinek czasu w minutach jako „$2$ h $5$ min” albo „$45$ min”. */
const odc = (min) => {
  const h = Math.floor(min / 60), m = min % 60;
  if (h === 0) return `$${m}$ min`;
  return m === 0 ? `$${h}$ h` : `$${h}$ h $${m}$ min`;
};
/** Godziny jako „2 h 30 min” (połówki). */
const hmin = (t) => `$${Math.floor(t.n / t.d)}$ h${t.d === 1 ? "" : " $30$ min"}`;
/** Godziny w dopełniaczu po „w ciągu”: 1 godziny, 2 godzin, 2,5 godziny. */
const hg = (t) => (t.d === 1 ? `$${t.n}$ ${t.n === 1 ? "godziny" : "godzin"}` : `$${zap(t)}$ godziny`);

/** Kroki rachunku „od godziny do godziny” i liczba minut. */
function odliczanie(h1, m1, h2, m2) {
  const t = h2 * 60 + m2 - (h1 * 60 + m1);
  const kr = [];
  if (h1 === h2) {
    kr.push(`Obie godziny są w tej samej godzinie, więc odejmujemy minuty: $${m2} - ${m1} = ${t}$ min.`);
  } else if (m1 === 0) {
    kr.push(`Od $${cz(h1, 0)}$ do $${cz(h2, m2)}$ mija ${odc(t)}${t >= 60 ? `, czyli $${t}$ min` : ""}.`);
  } else {
    const a = 60 - m1, b = (h2 - h1 - 1) * 60 + m2;
    kr.push(`Od $${cz(h1, m1)}$ do $${cz(h1 + 1, 0)}$ mija $${a}$ min.`);
    if (b > 0) {
      kr.push(`Od $${cz(h1 + 1, 0)}$ do $${cz(h2, m2)}$ mija ${odc(b)}${b >= 60 ? `, czyli $${b}$ min` : ""}.`);
      kr.push(`Razem: $${a} + ${b} = ${t}$ min.`);
    }
  }
  return { t, kr };
}

/** Ile to jest p% liczby x (p = 10, 20, 25, 50) – krok rozwiązania i wartość. */
function procent(p, x, opis = "liczby") {
  const d = { 10: 10, 20: 5, 25: 4, 50: 2 }[p];
  const nazwa = { 10: "jedna dziesiąta", 20: "jedna piąta", 25: "jedna czwarta", 50: "połowa" }[p];
  const w = x / d;
  return { w, krok: `$${p}\\%$ ${opis} to ${nazwa}, czyli dzielimy przez $${d}$: $${x} : ${d} = ${zap(q(Math.round(w * 100), 100))}$.` };
}

export default {
  tematy: [
    // ------------------------------------------------------------------------------------------------
    {
      id: "zakupy",
      nazwa: "Zakupy",
      sciaga: [
        {
          nazwa: "Cena za jednostkę",
          slownie: "Cena w sklepie jest często podana za $1$ kg, za $1$ litr albo za $1$ sztukę. Żeby obliczyć koszt, mnożymy tę cenę przez liczbę kilogramów (litrów, sztuk).",
          tex: "\\text{koszt}=\\text{cena za 1 kg}\\cdot\\text{liczba kg}",
          przyklad: "$1$ kg jabłek kosztuje $4{,}50$ zł. Za $2$ kg zapłacimy $2 \\cdot 4{,}50 = 9$ zł. Za pół kilograma: $4{,}50 : 2 = 2{,}25$ zł. Za $500$ g to pół kilograma, bo $500 : 1000 = 0{,}5$.",
          uwaga: "Gdy cena jest za kilogram, a kupujesz gramy, najpierw zamień gramy na kilogramy: $1$ kg $= 1000$ g.",
        },
        {
          nazwa: "Suma i reszta",
          slownie: "Najpierw dodajemy ceny wszystkich rzeczy w koszyku. Resztę liczymy odejmowaniem: ile zapłaciliśmy, minus suma cen.",
          tex: "\\text{reszta}=\\text{zapłacone}-\\text{suma cen}",
          przyklad: "Mleko $3{,}20$ zł i chleb $5{,}80$ zł: razem $3{,}20 + 5{,}80 = 9$ zł. Płacimy banknotem $20$ zł, więc reszta to $20 - 9 = 11$ zł.",
          uwaga: "Przy dodawaniu i odejmowaniu pisz przecinek pod przecinkiem. Zapłacona kwota musi być większa od sumy cen.",
        },
        {
          nazwa: "Która oferta jest tańsza",
          slownie: "Opakowania mają różną wagę, więc nie porównujemy cen opakowań. Obliczamy cenę za tę samą ilość, na przykład za $1$ kg. Tańsza jest oferta z mniejszą ceną za $1$ kg.",
          tex: "\\text{cena za 1 kg}=\\text{cena}:\\text{liczba kg}",
          przyklad: "$3$ kg cukru za $13{,}50$ zł: $13{,}50 : 3 = 4{,}50$ zł za kilogram. $5$ kg cukru za $20$ zł: $20 : 5 = 4$ zł za kilogram. Tańsza jest druga oferta, o $0{,}50$ zł na kilogramie.",
          uwaga: "Większe opakowanie nie zawsze jest tańsze w przeliczeniu na $1$ kg. Zawsze sprawdź.",
        },
        {
          nazwa: "Zniżka o 10%, 20%, 25%, 50%",
          slownie: "Zniżka to część ceny. $10\\%$ to jedna dziesiąta, $20\\%$ to jedna piąta, $25\\%$ to jedna czwarta, $50\\%$ to połowa. Obliczamy tę część i odejmujemy od ceny.",
          tex: "\\text{nowa cena}=\\text{cena}-\\text{zniżka}",
          przyklad: "Plecak kosztuje $80$ zł. Zniżka $25\\%$: $80 : 4 = 20$ zł. Nowa cena: $80 - 20 = 60$ zł. Zniżka $10\\%$ z $80$ zł to $80 : 10 = 8$ zł.",
          uwaga: "Zniżka to nie jest nowa cena. Po obliczeniu zniżki trzeba jeszcze odjąć ją od ceny.",
        },
      ],
      jak: [
        "Przeczytaj, co kupujemy, ile sztuk (kilogramów) i jaka jest cena jednej sztuki (jednego kilograma).",
        "Dla każdej rzeczy pomnóż cenę jednostkową przez ilość. Zamień gramy na kilogramy, jeśli trzeba.",
        "Dodaj wszystkie kwoty i odejmij sumę od zapłaconej kwoty, żeby obliczyć resztę.",
        "Przy porównywaniu ofert policz cenę za $1$ kg (sztukę). Przy zniżce policz część ceny i odejmij ją.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Kilogram jabłek kosztuje $4{,}80$ zł. Ile zapłacisz za $2{,}5$ kg jabłek? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7{,}30$ zł", "$9{,}60$ zł", "$12$ zł", "$14{,}40$ zł"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Kupiono $6$ bułek po $0{,}90$ zł i mleko za $3{,}80$ zł. Zapłacono banknotem $10$ zł. Ile wynosi reszta? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}80$ zł", "$1{,}80$ zł", "$5{,}30$ zł", "$0{,}20$ zł"],
          poprawna: 0,
        },
        {
          nr: "3",
          tresc: "W sklepie A za $3$ kg ziemniaków zapłacimy $7{,}50$ zł, a w sklepie B za $5$ kg ziemniaków zapłacimy $11$ zł. W którym sklepie $1$ kg ziemniaków jest tańszy i o ile? **Wybierz właściwą odpowiedź.**",
          opcje: ["W sklepie A, o $0{,}30$ zł za kilogram.", "W sklepie A, o $3{,}50$ zł za kilogram.", "W sklepie B, o $3{,}50$ zł za kilogram.", "W sklepie B, o $0{,}30$ zł za kilogram."],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "Buty kosztowały $120$ zł. W wyprzedaży cena spadła o $25\\%$. Ile zł kosztują teraz? **Wybierz właściwą odpowiedź.**",
          opcje: ["$95$ zł", "$90$ zł", "$30$ zł", "$150$ zł"],
          poprawna: 1,
        },
        {
          nr: "5",
          tresc: "Kupiono $3$ bułki po $0{,}80$ zł i $2$ kg mandarynek po $4{,}50$ zł za kilogram. Zapłacono banknotem $20$ zł. Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Za bułki zapłacono $2{,}40$ zł.", litery: "PF", poprawna: 0 },
            { tekst: "Za mandarynki zapłacono $6{,}50$ zł.", litery: "PF", poprawna: 1 },
            { tekst: "Reszta wynosi $8{,}60$ zł.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Mama kupiła $2$ chleby po $5{,}40$ zł, $3$ kg jabłek po $3{,}50$ zł za kilogram i litr mleka za $3{,}20$ zł. Zapłaciła banknotem $50$ zł. Ile wyniosły zakupy? Ile reszty dostała mama? **Zapisz obliczenia.**",
          rozwiazanie: "Chleby: $2 \\cdot 5{,}40 = 10{,}80$ zł.\n\nJabłka: $3 \\cdot 3{,}50 = 10{,}50$ zł.\n\nRazem: $10{,}80 + 10{,}50 + 3{,}20 = 24{,}50$ zł.\n\nReszta: $50 - 24{,}50 = 25{,}50$ zł.\n\nOdpowiedź: Zakupy kosztowały $24{,}50$ zł. Mama dostała $25{,}50$ zł reszty.",
        },
        {
          nr: "7",
          punkty: 3,
          tresc: "Plecak kosztuje $150$ zł. W sklepie A cena plecaka jest obniżona o $20\\%$. W sklepie B ten sam plecak kosztuje $135$ zł. W którym sklepie plecak jest tańszy i o ile? Ile reszty dostaniemy z banknotu $200$ zł w tańszym sklepie? **Zapisz obliczenia.**",
          rozwiazanie: "W sklepie A zniżka to $20\\%$ ceny, czyli jedna piąta: $150 : 5 = 30$ zł.\n\nCena w sklepie A: $150 - 30 = 120$ zł.\n\nW sklepie B plecak kosztuje $135$ zł, a $135 - 120 = 15$ zł, więc w sklepie A jest taniej o $15$ zł.\n\nReszta: $200 - 120 = 80$ zł.\n\nOdpowiedź: Taniej jest w sklepie A, o $15$ zł. Z banknotu $200$ zł dostaniemy $80$ zł reszty.",
        },
      ],
      generatory: [
        {
          id: "reszta-z-zakupow",
          nazwa: "Reszta z zakupów",
          opis: "Policz, ile kosztują zakupy z dwóch rzeczy, i ile reszty dostaniesz z banknotu.",
          generuj(r) {
            const TOW = [
              { b: "bułki", c: "bułek", lo: 60, hi: 120 },
              { b: "jogurty", c: "jogurtów", lo: 150, hi: 300 },
              { b: "soki", c: "soków", lo: 300, hi: 500 },
              { b: "batoniki", c: "batoników", lo: 200, hi: 400 },
              { b: "zeszyty", c: "zeszytów", lo: 200, hi: 500 },
              { b: "długopisy", c: "długopisów", lo: 150, hi: 400 },
              { b: "chleby", c: "chlebów", lo: 400, hi: 800 },
              { b: "kartony mleka", c: "kartonów mleka", lo: 300, hi: 500 },
            ];
            const KTO = [
              { kupil: "Mama kupiła", zaplacono: "Zapłaciła" },
              { kupil: "Tata kupił", zaplacono: "Zapłacił" },
              { kupil: "Babcia kupiła", zaplacono: "Zapłaciła" },
              { kupil: "Kuba kupił", zaplacono: "Zapłacił" },
              { kupil: "Ola kupiła", zaplacono: "Zapłaciła" },
            ];
            const kto = r.pick(KTO);
            const poz = r.shuffle(TOW).slice(0, 2).map((t) => {
              const k = r.int(2, 5);
              const p = r.int(t.lo / 10, t.hi / 10) * 10;
              return { t, k, p, suma: k * p };
            });
            const suma = poz[0].suma + poz[1].suma;
            const B = [10, 20, 50, 100, 200].find((b) => b * 100 > suma);
            const opis = (x) => `$${x.k}$ ${x.k < 5 ? x.t.b : x.t.c} po ${zz(x.p)}`;
            const lista = `${kto.kupil} ${opis(poz[0])} i ${opis(poz[1])}.`;
            const kr = [
              `Za ${poz[0].t.b}: $${poz[0].k} \\cdot ${zl(poz[0].p)} = ${zl(poz[0].suma)}$ zł.`,
              `Za ${poz[1].t.b}: $${poz[1].k} \\cdot ${zl(poz[1].p)} = ${zl(poz[1].suma)}$ zł.`,
              `Razem: $${zl(poz[0].suma)} + ${zl(poz[1].suma)} = ${zl(suma)}$ zł.`,
            ];
            if (r.chance(0.4)) {
              return {
                tresc: `${lista} Ile zł kosztują te zakupy?`,
                pola: [{ id: "s", typ: "liczba", etykieta: "Koszt w zł" }],
                odpowiedz: { s: q(suma, 100) },
                wynik: zz(suma),
                rozwiazanie: kr,
              };
            }
            const R = B * 100 - suma;
            return {
              tresc: `${lista} ${kto.zaplacono} banknotem $${B}$ zł. Ile wynosi reszta?`,
              pola: [{ id: "r", typ: "liczba", etykieta: "Reszta w zł" }],
              odpowiedz: { r: q(R, 100) },
              wynik: zz(R),
              rozwiazanie: [...kr, `Reszta: $${B} - ${zl(suma)} = ${zl(R)}$ zł.`],
            };
          },
        },
        {
          id: "oferta-i-znizka",
          nazwa: "Oferta i zniżka",
          opis: "Porównaj ceny za kilogram w dwóch sklepach albo policz cenę po zniżce o 10%, 20%, 25% lub 50%.",
          generuj(r) {
            if (r.chance(0.5)) {
              const CO = ["ziemniaków", "jabłek", "marchewki", "cukru", "mąki", "pomarańczy"];
              const co = r.pick(CO);
              const u1 = r.int(20, 69) * 10;
              const u2 = r.intBez(20, 69, u1 / 10) * 10;
              const m1 = r.int(2, 6);
              const m2 = r.intBez(2, 6, m1);
              const c1 = u1 * m1, c2 = u2 * m2;
              const tanszy = u1 < u2 ? 0 : 1;
              return {
                tresc: `W sklepie A za $${m1}$ kg ${co} zapłacimy ${zz(c1)}, a w sklepie B za $${m2}$ kg ${co} zapłacimy ${zz(c2)}. W którym sklepie $1$ kg jest tańszy?`,
                pola: [{ id: "s", typ: "wybor", etykieta: "Tańszy kilogram", opcje: ["W sklepie A", "W sklepie B"] }],
                odpowiedz: { s: tanszy },
                wynik: tanszy === 0 ? "w sklepie A" : "w sklepie B",
                rozwiazanie: [
                  `Sklep A: $${zl(c1)} : ${m1} = ${zl(u1)}$ zł za $1$ kg.`,
                  `Sklep B: $${zl(c2)} : ${m2} = ${zl(u2)}$ zł za $1$ kg.`,
                  `Mniejsza cena za $1$ kg jest w sklepie ${tanszy === 0 ? "A" : "B"}: ${zz(Math.min(u1, u2))} zamiast ${zz(Math.max(u1, u2))}.`,
                ],
              };
            }
            const RZ = [
              { n: "Plecak", kosztuje: "kosztuje", kosztowal: "kosztował" },
              { n: "Kurtka", kosztuje: "kosztuje", kosztowal: "kosztowała" },
              { n: "Bluza", kosztuje: "kosztuje", kosztowal: "kosztowała" },
              { n: "Rower", kosztuje: "kosztuje", kosztowal: "kosztował" },
              { n: "Buty", kosztuje: "kosztują", kosztowal: "kosztowały" },
              { n: "Spodnie", kosztuje: "kosztują", kosztowal: "kosztowały" },
            ];
            const x = r.pick(RZ);
            const p = r.pick([10, 20, 25, 50]);
            const z = r.pick(p === 10 ? [30, 40, 50, 60, 80, 90, 120, 150] : [20, 40, 60, 80, 100, 120, 160, 200]);
            const o = procent(p, z, "ceny");
            const nowa = z - o.w;
            const pytanie = r.chance(0.5);
            return {
              tresc: `${x.n} ${x.kosztowal} $${z}$ zł. W wyprzedaży cena spadła o $${p}\\%$. ${pytanie ? `Ile zł ${x.kosztuje} teraz?` : "O ile złotych jest taniej?"}`,
              pola: [{ id: "c", typ: "liczba", etykieta: pytanie ? "Nowa cena w zł" : "Zniżka w zł" }],
              odpowiedz: { c: pytanie ? nowa : o.w },
              wynik: `$${pytanie ? nowa : o.w}$ zł`,
              rozwiazanie: pytanie ? [o.krok, `Nowa cena: $${z} - ${o.w} = ${nowa}$ zł.`] : [o.krok, `Taniej jest o $${o.w}$ zł.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "dzialki-mieszkania",
      nazwa: "Działki, domy, mieszkania",
      sciaga: [
        {
          nazwa: "Ar i hektar",
          slownie: "Duże pola, na przykład działki i boiska, mierzymy w arach (a) i hektarach (ha). $1$ ar to pole kwadratu o boku $10$ m. $1$ hektar to pole kwadratu o boku $100$ m.",
          tex: "1\\text{ a}=100\\text{ m}^2\\qquad 1\\text{ ha}=100\\text{ a}\\qquad 1\\text{ ha}=10\\,000\\text{ m}^2",
          przyklad: "Działka $20$ m na $30$ m ma $20 \\cdot 30 = 600$ m$^2$, czyli $600 : 100 = 6$ arów. Pole $25\\,000$ m$^2$ to $25\\,000 : 10\\,000 = 2{,}5$ ha.",
          uwaga: "Przechodzimy na większą jednostkę – dzielimy, na mniejszą – mnożymy. Pamiętaj, że $1$ ha to $100$ a, a nie $1000$ a.",
        },
        {
          nazwa: "Pole prostokąta",
          slownie: "Pole prostokąta to długość razy szerokość. Obie długości muszą być w tych samych jednostkach, a wynik jest w jednostkach kwadratowych.",
          tex: "P=a\\cdot b",
          litery: "$a$, $b$ – długości sąsiednich boków",
          przyklad: "Pokój ma $4$ m długości i $3{,}5$ m szerokości. Pole podłogi: $4 \\cdot 3{,}5 = 14$ m$^2$.",
          uwaga: "Nie myl pola z obwodem. Pole podłogi mówi, ile paneli kupić. Obwód mówi, ile listew przypodłogowych.",
        },
        {
          nazwa: "Figura złożona z prostokątów",
          slownie: "Podłogę lub działkę o nietypowym kształcie dzielimy na prostokąty. Liczymy pole każdego i dodajemy. Można też od dużego prostokąta odjąć wycięty kawałek.",
          przyklad: "Podłoga w kształcie litery L składa się z prostokąta $5$ m na $4$ m i prostokąta $2$ m na $3$ m. Pole: $5 \\cdot 4 + 2 \\cdot 3 = 20 + 6 = 26$ m$^2$.",
          uwaga: "Każdy kawałek liczymy tylko raz. Nie dodawaj pola części wspólnej dwa razy.",
        },
        {
          nazwa: "Objętość i litry",
          slownie: "Objętość prostopadłościanu to długość razy szerokość razy wysokość. Objętość w metrach sześciennych zamieniamy na litry: $1$ m$^3$ to $1000$ litrów.",
          tex: "V=a\\cdot b\\cdot c\\qquad 1\\text{ m}^3=1000\\text{ l}",
          przyklad: "Zbiornik na deszczówkę ma $2$ m długości, $1$ m szerokości i $1{,}5$ m wysokości. $V = 2 \\cdot 1 \\cdot 1{,}5 = 3$ m$^3$, czyli $3 \\cdot 1000 = 3000$ litrów.",
          uwaga: "Wszystkie wymiary muszą być w tych samych jednostkach, zanim je pomnożysz.",
        },
        {
          nazwa: "Ile paczek paneli",
          slownie: "Pole podłogi dzielimy przez pole, które pokrywa jedna paczka. Wynik prawie nigdy nie jest całkowity. Zaokrąglamy w górę, bo nie kupimy części paczki.",
          przyklad: "Podłoga ma $14$ m$^2$, a paczka starcza na $2{,}5$ m$^2$. $14 : 2{,}5 = 5{,}6$, więc kupujemy $6$ paczek. Przy cenie $50$ zł za paczkę zapłacimy $6 \\cdot 50 = 300$ zł.",
          uwaga: "Nie zaokrąglaj w dół: $5$ paczek nie wystarczy na całą podłogę.",
        },
      ],
      jak: [
        "Sprawdź, w jakich jednostkach są wymiary. Zamień je tak, żeby były jednakowe.",
        "Podziel kształt na prostokąty, policz ich pola (albo objętość) i dodaj.",
        "Zamień wynik na jednostkę z pytania: m$^2$ na ary i hektary albo m$^3$ na litry.",
        "Jeśli kupujesz materiał, podziel przez pole jednej paczki, zaokrąglij w górę i pomnóż przez cenę.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Działka ma kształt prostokąta o wymiarach $25$ m i $40$ m. Ile arów ma ta działka? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1000$ a", "$100$ a", "$10$ a", "$1$ a"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Pokój ma $4{,}5$ m długości i $3$ m szerokości. Ile metrów kwadratowych ma jego podłoga? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7{,}5$ m$^2$", "$15$ m$^2$", "$135$ m$^2$", "$13{,}5$ m$^2$"],
          poprawna: 3,
        },
        {
          nr: "10",
          tresc: "Pole uprawne ma powierzchnię $3{,}5$ ha. Ile to metrów kwadratowych? **Wybierz właściwą odpowiedź.**",
          opcje: ["$35\\,000$ m$^2$", "$3500$ m$^2$", "$350$ m$^2$", "$350\\,000$ m$^2$"],
          poprawna: 0,
        },
        {
          nr: "11",
          tresc: "Podłoga w pokoju ma wymiary $3{,}5$ m na $4$ m. Jedna paczka paneli wystarcza na $2{,}5$ m$^2$. Ile paczek trzeba kupić, żeby wyłożyć całą podłogę? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$6$", "$35$", "$11{,}5$"],
          poprawna: 1,
        },
        {
          nr: "12",
          tresc: "Basen ogrodowy ma kształt prostopadłościanu o długości $4$ m i szerokości $2$ m. Woda sięga do wysokości $1{,}5$ m. Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "W basenie jest $1200$ litrów wody.", litery: "PF", poprawna: 1 },
            { tekst: "Objętość wody wynosi $12$ m$^3$.", litery: "PF", poprawna: 0 },
            { tekst: "Gdyby woda sięgała tylko do wysokości $1$ m, byłoby jej o $4000$ litrów mniej.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 2,
          tresc: "Działka ma kształt prostokąta o bokach $40$ m i $25$ m. Dom zajmuje na niej prostokąt $10$ m na $12$ m. Ile arów ma cała działka? Ile metrów kwadratowych zostaje na ogród? **Zapisz obliczenia.**",
          rozwiazanie: "Pole działki: $40 \\cdot 25 = 1000$ m$^2$.\n\n$1$ ar to $100$ m$^2$, więc $1000 : 100 = 10$ arów.\n\nPole domu: $10 \\cdot 12 = 120$ m$^2$.\n\nOgród: $1000 - 120 = 880$ m$^2$.\n\nOdpowiedź: Działka ma $10$ arów. Na ogród zostaje $880$ m$^2$.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Podłoga w salonie ma kształt litery L. Składa się z prostokąta $6$ m na $4$ m i dołączonego do niego prostokąta $2$ m na $3$ m. Jedna paczka paneli starcza na $2{,}5$ m$^2$ i kosztuje $48$ zł. Ile paczek trzeba kupić i ile to będzie kosztować? **Zapisz obliczenia.**",
          rozwiazanie: "Pole większego prostokąta: $6 \\cdot 4 = 24$ m$^2$.\n\nPole mniejszego prostokąta: $2 \\cdot 3 = 6$ m$^2$.\n\nPole całej podłogi: $24 + 6 = 30$ m$^2$.\n\nLiczba paczek: $30 : 2{,}5 = 12$.\n\nKoszt: $12 \\cdot 48 = 576$ zł.\n\nOdpowiedź: Trzeba kupić $12$ paczek paneli za $576$ zł.",
        },
      ],
      generatory: [
        {
          id: "ary-i-hektary",
          nazwa: "Ary i hektary",
          opis: "Zamień jednostki pola (m², ar, ha) albo policz pole prostokątnej działki w arach.",
          generuj(r) {
            const typ = r.int(0, 3);
            if (typ === 0) {
              let a, b;
              do {
                a = r.pick([20, 25, 30, 40, 50, 60]);
                b = r.pick([20, 25, 30, 40, 50]);
              } while ((a * b) % 100 !== 0 || a * b < 500 || a * b > 1500);
              const p = a * b;
              return {
                tresc: `Działka ma kształt prostokąta o bokach $${a}$ m i $${b}$ m. Ile arów ma ta działka?`,
                pola: [{ id: "a", typ: "liczba", etykieta: "Pole w arach" }],
                odpowiedz: { a: p / 100 },
                wynik: `$${p / 100}$ a`,
                rozwiazanie: [`Pole: $${a} \\cdot ${b} = ${p}$ m$^2$.`, `$1$ ar to $100$ m$^2$, więc $${p} : 100 = ${p / 100}$ a.`],
              };
            }
            if (typ === 1) {
              const a = r.int(5, 15);
              return {
                tresc: `Działka budowlana ma $${a}$ ${mn(a, "ar", "ary", "arów")}. Ile metrów kwadratowych ma ta działka?`,
                pola: [{ id: "m", typ: "liczba", etykieta: "Pole w m²" }],
                odpowiedz: { m: a * 100 },
                wynik: `$${fmt(a * 100)}$ m$^2$`,
                rozwiazanie: [`$1$ ar to $100$ m$^2$.`, `$${a} \\cdot 100 = ${fmt(a * 100)}$ m$^2$.`],
              };
            }
            if (typ === 2) {
              const h = r.pick([q(1, 2), q(1), q(3, 2), q(2), q(5, 2), q(3), q(4), q(15, 2)]);
              const m = h.mul(10000);
              return {
                tresc: `Pole ma powierzchnię $${fmt(m.n)}$ m$^2$. Ile to hektarów?`,
                pola: [{ id: "h", typ: "liczba", etykieta: "Pole w ha" }],
                odpowiedz: { h },
                wynik: `$${zap(h)}$ ha`,
                rozwiazanie: [`$1$ ha to $10\\,000$ m$^2$.`, `$${fmt(m.n)} : 10\\,000 = ${zap(h)}$ ha.`],
              };
            }
            const h = r.pick([q(1, 2), q(1), q(3, 2), q(2), q(5, 2), q(3), q(4)]);
            const a = h.mul(100);
            return {
              tresc: `Boisko wraz z otoczeniem zajmuje $${zap(h)}$ ha. Ile to arów?`,
              pola: [{ id: "a", typ: "liczba", etykieta: "Pole w arach" }],
              odpowiedz: { a },
              wynik: `$${zap(a)}$ a`,
              rozwiazanie: [`$1$ ha to $100$ a.`, `$${zap(h)} \\cdot 100 = ${zap(a)}$ a.`],
            };
          },
        },
        {
          id: "pokoj-i-podloga",
          nazwa: "Pokój i podłoga",
          opis: "Policz pole podłogi, liczbę paczek paneli i ich koszt albo objętość zbiornika w litrach.",
          generuj(r) {
            const typ = r.int(0, 3);
            if (typ === 3) {
              const a = r.pick([2, 3, 4]), b = r.pick([2, 3]);
              const h = r.pick([q(1), q(3, 2)]);
              const v = h.mul(a * b);
              const l = v.mul(1000);
              return {
                tresc: `Zbiornik na deszczówkę ma kształt prostopadłościanu o długości $${a}$ m, szerokości $${b}$ m i wysokości $${zap(h)}$ m. Ile litrów wody mieści się w pełnym zbiorniku?`,
                pola: [{ id: "l", typ: "liczba", etykieta: "Liczba litrów" }],
                odpowiedz: { l },
                wynik: `$${fmt(l.n)}$ l`,
                rozwiazanie: [
                  `Objętość: $${a} \\cdot ${b} \\cdot ${zap(h)} = ${zap(v)}$ m$^3$.`,
                  `$1$ m$^3$ to $1000$ litrów, więc $${zap(v)} \\cdot 1000 = ${fmt(l.n)}$ l.`,
                ],
              };
            }
            const a = q(r.int(6, 12), 2), b = q(r.int(3, 5));
            const pole = a.mul(b);
            const dane = `Podłoga w pokoju ma wymiary $${zap(a)}$ m na $${zap(b)}$ m.`;
            const krPole = `Pole podłogi: $${zap(a)} \\cdot ${zap(b)} = ${zap(pole)}$ m$^2$.`;
            if (typ === 0) {
              return {
                tresc: `${dane} Ile metrów kwadratowych ma podłoga?`,
                pola: [{ id: "p", typ: "liczba", etykieta: "Pole w m²" }],
                odpowiedz: { p: pole },
                wynik: `$${zap(pole)}$ m$^2$`,
                rozwiazanie: [krPole],
              };
            }
            const pp = r.pick([q(2), q(5, 2)]);
            let paczek = 0;
            while (q(paczek).cmp(pole.div(pp)) < 0) paczek++;
            const iloraz = pole.div(pp);
            const krPaczki = [
              krPole,
              `Liczba paczek: $${zap(pole)} : ${zap(pp)} = ${zap(iloraz)}$.`,
              iloraz.calkowita ? `Wynik jest całkowity, więc kupujemy $${paczek}$ ${mn(paczek, "paczkę", "paczki", "paczek")}.` : `Zaokrąglamy w górę: kupujemy $${paczek}$ ${mn(paczek, "paczkę", "paczki", "paczek")}.`,
            ];
            if (typ === 1) {
              return {
                tresc: `${dane} Jedna paczka paneli starcza na $${zap(pp)}$ m$^2$. Ile paczek trzeba kupić, żeby wyłożyć całą podłogę?`,
                pola: [{ id: "n", typ: "liczba", etykieta: "Liczba paczek" }],
                odpowiedz: { n: paczek },
                wynik: `$${paczek}$`,
                rozwiazanie: krPaczki,
              };
            }
            const cena = r.int(8, 18) * 5;
            return {
              tresc: `${dane} Jedna paczka paneli starcza na $${zap(pp)}$ m$^2$ i kosztuje $${cena}$ zł. Ile zł zapłacimy za panele na całą podłogę?`,
              pola: [{ id: "k", typ: "liczba", etykieta: "Koszt w zł" }],
              odpowiedz: { k: paczek * cena },
              wynik: `$${fmt(paczek * cena)}$ zł`,
              rozwiazanie: [...krPaczki, `Koszt: $${paczek} \\cdot ${cena} = ${fmt(paczek * cena)}$ zł.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "podroz",
      nazwa: "Podróż",
      sciaga: [
        {
          nazwa: "Rozkład jazdy i czas podróży",
          slownie: "W rozkładzie jazdy są godziny odjazdu i przyjazdu. Czas podróży to czas od odjazdu do przyjazdu. Liczymy go w dwóch krokach: do pełnej godziny, a potem od pełnej godziny.",
          przyklad: "Odjazd o $8{:}15$, przyjazd o $10{:}45$. Od $8{:}15$ do $10{:}15$ mijają $2$ h, a do $10{:}45$ jeszcze $30$ min. Podróż trwa $2$ h $30$ min.",
          uwaga: "Godzina ma $60$ minut, a nie $100$. Od $8{:}45$ do $10{:}15$ jest $1$ h $30$ min. Nie odejmuj minut od minut na siłę, bo $15$ jest mniejsze od $45$.",
        },
        {
          nazwa: "Przesiadka",
          slownie: "Przy przesiadce czekamy od przyjazdu jednego środka transportu do odjazdu następnego. Cała podróż to czas jazdy plus czas czekania.",
          przyklad: "Autobus przyjeżdża na dworzec o $9{:}40$, a pociąg odjeżdża o $10{:}05$. Od $9{:}40$ do $10{:}00$ mija $20$ min, a do $10{:}05$ jeszcze $5$ min. Czekamy $25$ min.",
          uwaga: "Sprawdź, czy czas na przesiadkę nie jest za krótki: zapas kilku minut to rozsądnie.",
        },
        {
          nazwa: "Prędkość, droga, czas",
          slownie: "Prędkość pokazuje, ile kilometrów przejeżdżamy w ciągu godziny. Znając dwie z trzech wielkości, obliczamy trzecią. Czas podajemy w godzinach: $30$ min to $0{,}5$ h, a $15$ min to $0{,}25$ h.",
          tex: "s=v\\cdot t\\qquad v=s:t\\qquad t=s:v",
          litery: "$s$ – droga, $v$ – prędkość, $t$ – czas",
          przyklad: "Samochód jedzie $80$ km/h przez $2{,}5$ h: $s = 80 \\cdot 2{,}5 = 200$ km. Droga $150$ km przy $60$ km/h zajmuje $150 : 60 = 2{,}5$ h, czyli $2$ h $30$ min.",
          uwaga: "Nie wpisuj minut do wzoru jako części dziesiętnej: $1$ h $30$ min to $1{,}5$ h, a nie $1{,}30$ h.",
        },
        {
          nazwa: "Bilety i koszt podróży",
          slownie: "Bilet ulgowy często kosztuje połowę ceny biletu normalnego. Koszt dla grupy liczymy osobno dla uczniów i dla dorosłych, a potem dodajemy. Koszt na jedną osobę to koszt całości podzielony przez liczbę osób.",
          przyklad: "Bilet normalny kosztuje $8$ zł, ulgowy $50\\%$ tej ceny, czyli $4$ zł. Dla $25$ uczniów: $25 \\cdot 4 = 100$ zł. Autokar za $300$ zł dla $25$ osób to $300 : 25 = 12$ zł na osobę.",
          uwaga: "Jeśli jedziemy tam i z powrotem, koszt biletów mnożymy przez $2$.",
        },
      ],
      jak: [
        "Zapisz dane z rozkładu lub z treści: godziny, prędkość, drogę. Zamień minuty na godziny, jeśli trzeba.",
        "Czas podróży oblicz w dwóch krokach: do pełnej godziny i od pełnej godziny.",
        "Wybierz wzór: droga to $v \\cdot t$, prędkość to $s : t$, czas to $s : v$.",
        "Przy kosztach policz osobno uczniów i dorosłych, a potem dodaj. Sprawdź, czy wynik jest realny.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Pociąg odjeżdża o $7{:}50$ i przyjeżdża o $9{:}35$. Ile trwa podróż? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1$ h $55$ min", "$1$ h $15$ min", "$2$ h $15$ min", "$1$ h $45$ min"],
          poprawna: 3,
        },
        {
          nr: "16",
          tresc: "Autokar jedzie ze stałą prędkością $70$ km/h. Ile kilometrów przejedzie w ciągu $3{,}5$ godziny? **Wybierz właściwą odpowiedź.**",
          opcje: ["$245$ km", "$210$ km", "$73{,}5$ km", "$20$ km"],
          poprawna: 0,
        },
        {
          nr: "17",
          tresc: "Rodzina ma do przejechania $240$ km. Jedzie ze średnią prędkością $80$ km/h i wyjechała o $8{:}30$. O której godzinie dojedzie na miejsce, jeśli nie będzie się zatrzymywać po drodze? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8{:}33$", "$10{:}30$", "$11{:}30$", "$11{:}00$"],
          poprawna: 2,
        },
        {
          nr: "18",
          tresc: "Bilet autobusowy normalny kosztuje $4$ zł, a ulgowy kosztuje połowę tej ceny. Jedzie klasa: $24$ uczniów na biletach ulgowych i $2$ opiekunów na biletach normalnych. Ile zapłaci cała grupa za przejazd w jedną stronę? **Wybierz właściwą odpowiedź.**",
          opcje: ["$48$ zł", "$56$ zł", "$104$ zł", "$52$ zł"],
          poprawna: 1,
        },
        {
          nr: "19",
          tresc: "Autobus przyjeżdża na dworzec o $9{:}40$. Pociąg do kolejnego miasta odjeżdża o $10{:}05$ i przyjeżdża na miejsce o $12{:}20$. Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Sam pociąg jedzie $2$ h $15$ min.", litery: "PF", poprawna: 0 },
            { tekst: "Od $9{:}40$ do $12{:}20$ upływa $2$ h $40$ min.", litery: "PF", poprawna: 0 },
            { tekst: "Na pociąg czeka się $35$ min.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Autokar z wycieczką wyjechał o $7{:}45$ i dojechał do celu o $10{:}15$. Cały czas jechał ze średnią prędkością $60$ km/h. Ile trwała podróż? Ile kilometrów przejechał autokar? **Zapisz obliczenia.**",
          rozwiazanie: "Od $7{:}45$ do $8{:}00$ mija $15$ min. Od $8{:}00$ do $10{:}15$ mijają $2$ h $15$ min. Razem $2$ h $30$ min, czyli $2{,}5$ h.\n\nDroga: $60 \\cdot 2{,}5 = 150$ km.\n\nOdpowiedź: Podróż trwała $2$ h $30$ min. Autokar przejechał $150$ km.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Klasa jedzie pociągiem na wycieczkę: $20$ uczniów i $2$ opiekunów. Bilet normalny w jedną stronę kosztuje $12$ zł, a ulgowy kosztuje połowę tej ceny. Ile kosztują wszystkie bilety w obie strony? Uczniowie zebrali po $15$ zł. Czy zebrana kwota wystarczy na bilety i ile zostanie? **Zapisz obliczenia.**",
          rozwiazanie: "Bilet ulgowy: $12 : 2 = 6$ zł.\n\nUczniowie w jedną stronę: $20 \\cdot 6 = 120$ zł. Opiekunowie: $2 \\cdot 12 = 24$ zł. Razem w jedną stronę: $120 + 24 = 144$ zł.\n\nW obie strony: $2 \\cdot 144 = 288$ zł.\n\nUczniowie zebrali $20 \\cdot 15 = 300$ zł. Zostanie $300 - 288 = 12$ zł.\n\nOdpowiedź: Bilety kosztują $288$ zł. Zebrana kwota wystarczy i zostanie $12$ zł.",
        },
      ],
      generatory: [
        {
          id: "rozklad-jazdy",
          nazwa: "Rozkład jazdy",
          opis: "Oblicz czas podróży lub czas oczekiwania na przesiadkę albo wskaż godzinę przyjazdu.",
          generuj(r) {
            const typ = r.int(0, 2);
            const m1 = r.int(1, 11) * 5;
            if (typ < 2) {
              let h1, t;
              for (;;) {
                h1 = r.int(6, 16);
                t = typ === 0 ? r.int(7, 40) * 5 : r.int(2, 12) * 5;
                const h2 = Math.floor((h1 * 60 + m1 + t) / 60);
                if (typ === 1 || h2 >= h1 + 1) break;
              }
              const tot = h1 * 60 + m1 + t;
              const h2 = Math.floor(tot / 60), m2 = tot % 60;
              const o = odliczanie(h1, m1, h2, m2);
              if (typ === 0) {
                return {
                  tresc: `Pociąg odjeżdża o $${cz(h1, m1)}$ i przyjeżdża o $${cz(h2, m2)}$. Ile minut trwa podróż?`,
                  pola: [{ id: "t", typ: "liczba", etykieta: "Czas w minutach" }],
                  odpowiedz: { t },
                  wynik: `$${t}$ min, czyli ${odc(t)}`,
                  rozwiazanie: o.kr,
                };
              }
              return {
                tresc: `Autobus przyjeżdża na dworzec o $${cz(h1, m1)}$, a pociąg odjeżdża o $${cz(h2, m2)}$. Ile minut trzeba czekać na pociąg?`,
                pola: [{ id: "t", typ: "liczba", etykieta: "Czas oczekiwania w minutach" }],
                odpowiedz: { t },
                wynik: `$${t}$ min`,
                rozwiazanie: o.kr,
              };
            }
            const h1 = r.int(6, 15);
            const t = r.int(9, 40) * 5;
            const tot = h1 * 60 + m1 + t;
            const poprawna = tot;
            const kand = [poprawna - 60, poprawna - 10, poprawna, poprawna + 10, poprawna + 60].filter((x) => x !== poprawna);
            const zle = r.shuffle(kand).slice(0, 3);
            const wszystkie = [...zle, poprawna].sort((a, b) => a - b);
            const opcje = wszystkie.map((x) => `$${cz(Math.floor(x / 60), x % 60)}$`);
            const idx = wszystkie.indexOf(poprawna);
            const th = Math.floor(t / 60), tm = t % 60;
            const wyn = cz(Math.floor(tot / 60), tot % 60);
            const dod = [`Do godziny $${cz(h1, m1)}$ dodajemy ${odc(t)}.`];
            if (th > 0 && tm > 0) dod.push(`Po dodaniu godzin jest $${cz(h1 + th, m1)}$.`);
            if (tm > 0) {
              dod.push(`Dodajemy minuty: $${m1} + ${tm} = ${m1 + tm}$ min.`);
              dod.push(m1 + tm >= 60 ? `$${m1 + tm}$ min to ${odc(m1 + tm)}, więc godzina rośnie o $1$. Przyjazd o $${wyn}$.` : `Przyjazd o $${wyn}$.`);
            } else dod.push(`Przyjazd o $${wyn}$.`);
            return {
              tresc: `Autobus odjeżdża o $${cz(h1, m1)}$, a podróż trwa ${odc(t)}. O której godzinie autobus przyjedzie na miejsce?`,
              pola: [{ id: "g", typ: "wybor", etykieta: "Godzina przyjazdu", opcje }],
              odpowiedz: { g: idx },
              wynik: opcje[idx],
              rozwiazanie: dod,
            };
          },
        },
        {
          id: "droga-predkosc-czas",
          nazwa: "Droga, prędkość, czas",
          opis: "Oblicz drogę, czas albo prędkość dla autokaru, samochodu, roweru lub spaceru.",
          generuj(r) {
            const KTO = [
              { kto: "Autokar", v: [60, 70, 80, 90], t: [1, 2, 3, 4].map((x) => q(x)).concat([q(3, 2), q(5, 2)]) },
              { kto: "Samochód", v: [60, 80, 90, 100, 120], t: [q(1), q(2), q(3), q(3, 2), q(5, 2), q(7, 2)] },
              { kto: "Pociąg", v: [80, 100, 120], t: [q(1), q(2), q(3), q(3, 2), q(5, 2)] },
              { kto: "Rowerzysta", v: [12, 15, 18, 20], t: [q(1), q(2), q(3, 2), q(5, 2), q(3)] },
              { kto: "Turysta", v: [4, 5], t: [q(1), q(2), q(3), q(3, 2), q(5, 2)] },
            ];
            const x = r.pick(KTO);
            const v = r.pick(x.v), t = r.pick(x.t);
            const s = t.mul(v);
            const pol = x.kto === "Turysta" ? "idzie" : "jedzie";
            const typ = r.int(0, 2);
            if (typ === 0) {
              return {
                tresc: `${x.kto} ${pol} ze stałą prędkością $${v}$ km/h. Ile kilometrów pokona w ciągu ${hg(t)}?`,
                pola: [{ id: "s", typ: "liczba", etykieta: "Droga w km" }],
                odpowiedz: { s },
                wynik: `$${zap(s)}$ km`,
                rozwiazanie: [`Droga to prędkość razy czas: $s = ${v} \\cdot ${zap(t)} = ${zap(s)}$ km.`],
              };
            }
            if (typ === 1) {
              return {
                tresc: `${x.kto} ${pol} ze stałą prędkością $${v}$ km/h. Ile godzin potrzebuje na pokonanie $${zap(s)}$ km?`,
                pola: [{ id: "t", typ: "liczba", etykieta: "Czas w godzinach" }],
                odpowiedz: { t },
                wynik: `$${zap(t)}$ h${t.d === 1 ? "" : `, czyli ${hmin(t)}`}`,
                rozwiazanie: [`Czas to droga podzielona przez prędkość: $t = ${zap(s)} : ${v} = ${zap(t)}$ h.`],
              };
            }
            return {
              tresc: `${x.kto} ${pol} ze stałą prędkością i pokonuje $${zap(s)}$ km w ciągu ${hg(t)}. Ile wynosi jego prędkość w km/h?`,
              pola: [{ id: "v", typ: "liczba", etykieta: "Prędkość w km/h" }],
              odpowiedz: { v },
              wynik: `$${v}$ km/h`,
              rozwiazanie: [`Prędkość to droga podzielona przez czas: $v = ${zap(s)} : ${zap(t)} = ${v}$ km/h.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "odzywianie",
      nazwa: "Odżywianie",
      sciaga: [
        {
          nazwa: "Kalorie na 100 g",
          slownie: "Na opakowaniu jest napisane, ile kilokalorii (kcal) ma $100$ g produktu. Żeby obliczyć kcal w porcji, sprawdzamy, ile razy po $100$ g jest w porcji, i mnożymy przez kcal w $100$ g.",
          tex: "\\text{kcal w porcji}=\\frac{\\text{masa porcji w g}}{100}\\cdot\\text{kcal w 100 g}",
          przyklad: "$100$ g chleba ma $250$ kcal. Porcja $200$ g to $2$ razy po $100$ g, więc ma $2 \\cdot 250 = 500$ kcal. Porcja $50$ g to pół setki: $250 : 2 = 125$ kcal.",
          uwaga: "Liczba kcal podana na $100$ g nie dotyczy całego opakowania.",
        },
        {
          nazwa: "Tabela wartości odżywczych",
          slownie: "Tabela na opakowaniu podaje w $100$ g produktu: kcal, białko, tłuszcz i węglowodany. Dla innej porcji mnożymy każdą wartość przez ten sam współczynnik.",
          przyklad: "W $100$ g jogurtu jest $60$ kcal i $4$ g białka. Kubek $150$ g to $1{,}5$ razy więcej: $1{,}5 \\cdot 60 = 90$ kcal i $1{,}5 \\cdot 4 = 6$ g białka.",
          uwaga: "Sprawdź nagłówek kolumny: czy wartości są na $100$ g, czy na całą porcję.",
        },
        {
          nazwa: "Część dziennego zapotrzebowania",
          slownie: "Dziecko w Twoim wieku potrzebuje około $2000$ kcal dziennie. Posiłek ma być pewną częścią dnia: na przykład $25\\%$ to jedna czwarta, $50\\%$ to połowa, a $10\\%$ to jedna dziesiąta.",
          przyklad: "Dzienne zapotrzebowanie wynosi $2000$ kcal. Śniadanie $25\\%$: $2000 : 4 = 500$ kcal. Drugie śniadanie $10\\%$: $2000 : 10 = 200$ kcal. Obiad $50\\%$: $2000 : 2 = 1000$ kcal.",
          uwaga: "$10\\%$ to jedna dziesiąta ($: 10$), a nie jedna setna. Po obliczeniu części jeszcze sprawdź, czego szuka pytanie: części czy reszty.",
        },
        {
          nazwa: "Jednostki: gramy, litry, szklanki",
          slownie: "Przy planowaniu posiłków zamieniamy jednostki. $1$ kg to $1000$ g, a $1$ l to $1000$ ml. Zwykła szklanka ma około $250$ ml.",
          tex: "1\\text{ kg}=1000\\text{ g}\\qquad 1\\text{ l}=1000\\text{ ml}",
          przyklad: "$8$ szklanek po $250$ ml to $8 \\cdot 250 = 2000$ ml, czyli $2000 : 1000 = 2$ l wody w ciągu dnia.",
          uwaga: "Zamień wszystkie ilości na tę samą jednostkę, zanim je dodasz lub porównasz.",
        },
      ],
      jak: [
        "Zapisz, ile kcal (albo gramów składnika) jest w $100$ g produktu i ile gramów zjemy.",
        "Sprawdź, ile razy po $100$ g jest w porcji: podziel masę porcji przez $100$.",
        "Pomnóż przez wartość z tabeli. Dla kilku produktów policz każdy osobno i dodaj.",
        "Przy zapotrzebowaniu dziennym zamień $10\\%$, $25\\%$, $50\\%$ na dzielenie przez $10$, $4$, $2$.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "W $100$ g płatków śniadaniowych jest $360$ kcal. Ile kcal ma porcja $50$ g tych płatków? **Wybierz właściwą odpowiedź.**",
          opcje: ["$18$ kcal", "$720$ kcal", "$310$ kcal", "$180$ kcal"],
          poprawna: 3,
        },
        {
          nr: "23",
          tresc: "Dzienne zapotrzebowanie Oli to $1800$ kcal. Obiad ma dać jej $50\\%$, a kolacja $10\\%$ tego zapotrzebowania. Ile kcal mają razem obiad i kolacja? **Wybierz właściwą odpowiedź.**",
          opcje: ["$918$ kcal", "$1080$ kcal", "$900$ kcal", "$180$ kcal"],
          poprawna: 1,
        },
        {
          nr: "24",
          tresc: "Na opakowaniu serka napisano: w $100$ g jest $12$ g białka. Opakowanie ma $250$ g. Ile gramów białka jest w całym opakowaniu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4{,}8$ g", "$14{,}5$ g", "$300$ g", "$30$ g"],
          poprawna: 3,
        },
        {
          nr: "25",
          tresc: "Ola wypija w ciągu dnia $6$ szklanek wody, każda po $250$ ml. Ile litrów wody wypija Ola? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1{,}5$ l", "$15$ l", "$1500$ l", "$0{,}15$ l"],
          poprawna: 0,
        },
        {
          nr: "26",
          tresc: "Tabela podaje wartości w $100$ g: banan – $90$ kcal, chleb – $250$ kcal, mleko – $50$ kcal. Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Banan o masie $150$ g ma $135$ kcal.", litery: "PF", poprawna: 0 },
            { tekst: "Dwie kromki chleba o łącznej masie $50$ g mają $150$ kcal.", litery: "PF", poprawna: 1 },
            { tekst: "Szklanka mleka o masie $250$ g ma $100$ kcal.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Zosia zjadła na drugie śniadanie kanapkę z $80$ g chleba (w $100$ g chleba jest $250$ kcal), jabłko o masie $150$ g (w $100$ g jabłka jest $50$ kcal) i $200$ g jogurtu (w $100$ g jogurtu jest $60$ kcal). Ile kcal miało to drugie śniadanie? **Zapisz obliczenia.**",
          rozwiazanie: "Chleb: $80 : 100 = 0{,}8$, więc $0{,}8 \\cdot 250 = 200$ kcal.\n\nJabłko: $150 : 100 = 1{,}5$, więc $1{,}5 \\cdot 50 = 75$ kcal.\n\nJogurt: $200 : 100 = 2$, więc $2 \\cdot 60 = 120$ kcal.\n\nRazem: $200 + 75 + 120 = 395$ kcal.\n\nOdpowiedź: Drugie śniadanie miało $395$ kcal.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "Dzienne zapotrzebowanie Kuby wynosi $2200$ kcal. Śniadanie ma dać $25\\%$, obiad $50\\%$, a podwieczorek $10\\%$ tej wartości. Ile kcal powinien mieć każdy z tych posiłków? Ile kcal zostaje na resztę dnia? **Zapisz obliczenia.**",
          rozwiazanie: "Śniadanie: $25\\%$ to jedna czwarta, $2200 : 4 = 550$ kcal.\n\nObiad: $50\\%$ to połowa, $2200 : 2 = 1100$ kcal.\n\nPodwieczorek: $10\\%$ to jedna dziesiąta, $2200 : 10 = 220$ kcal.\n\nRazem: $550 + 1100 + 220 = 1870$ kcal.\n\nNa resztę dnia zostaje $2200 - 1870 = 330$ kcal.\n\nOdpowiedź: Śniadanie $550$ kcal, obiad $1100$ kcal, podwieczorek $220$ kcal. Na resztę dnia zostaje $330$ kcal.",
        },
      ],
      generatory: [
        {
          id: "kalorie-w-porcji",
          nazwa: "Kalorie w porcji",
          opis: "Policz kcal albo gramy składnika w porcji, korzystając z wartości na 100 g.",
          generuj(r) {
            const PR = [
              { g: "płatków śniadaniowych", k: 380, m: [50, 100, 150], sk: "białka", w: 10 },
              { g: "chleba", k: 250, m: [50, 100, 150], sk: "białka", w: 8 },
              { g: "sera żółtego", k: 350, m: [50, 100], sk: "tłuszczu", w: 28 },
              { g: "jogurtu naturalnego", k: 60, m: [100, 150, 200, 250], sk: "białka", w: 4 },
              { g: "jabłka", k: 50, m: [100, 150, 200], sk: "cukru", w: 10 },
              { g: "banana", k: 90, m: [100, 150], sk: "cukru", w: 12 },
              { g: "makaronu po ugotowaniu", k: 130, m: [100, 150, 200, 250], sk: "białka", w: 5 },
              { g: "gotowanych ziemniaków", k: 80, m: [100, 150, 200, 250], sk: "białka", w: 2 },
              { g: "marchewki", k: 40, m: [50, 100, 150], sk: "cukru", w: 5 },
              { g: "czekolady", k: 540, m: [50, 100], sk: "cukru", w: 50 },
              { g: "pizzy", k: 270, m: [150, 200, 250], sk: "białka", w: 12 },
            ];
            const typ = r.int(0, 3);
            const p1 = r.pick(PR);
            // przy jednym produkcie porcja inna niż 100 g (dla 100 g wynik stoi już w treści)
            const m1 = r.pick(typ === 1 ? p1.m : p1.m.filter((m) => m !== 100));
            const kc = (p, m) => (p.k * m) / 100;
            const krok = (p, m) =>
              m === 100
                ? `$100$ g ${p.g} to dokładnie tyle, ile podano: $${p.k}$ kcal.`
                : `$${m}$ g to $${m} : 100 = ${zap(q(m, 100))}$ razy po $100$ g, więc $${zap(q(m, 100))} \\cdot ${p.k} = ${kc(p, m)}$ kcal.`;
            if (typ === 0) {
              return {
                tresc: `W $100$ g ${p1.g} jest $${p1.k}$ kcal. Ile kcal ma porcja $${m1}$ g?`,
                pola: [{ id: "k", typ: "liczba", etykieta: "Liczba kcal" }],
                odpowiedz: { k: kc(p1, m1) },
                wynik: `$${kc(p1, m1)}$ kcal`,
                rozwiazanie: [krok(p1, m1)],
              };
            }
            if (typ === 1) {
              let p2;
              do { p2 = r.pick(PR); } while (p2 === p1);
              const m2 = r.pick(p2.m);
              const s = kc(p1, m1) + kc(p2, m2);
              return {
                tresc: `Zjedzono $${m1}$ g ${p1.g} (w $100$ g jest $${p1.k}$ kcal) i $${m2}$ g ${p2.g} (w $100$ g jest $${p2.k}$ kcal). Ile kcal mają razem te dwa produkty?`,
                pola: [{ id: "k", typ: "liczba", etykieta: "Liczba kcal" }],
                odpowiedz: { k: s },
                wynik: `$${s}$ kcal`,
                rozwiazanie: [krok(p1, m1), krok(p2, m2), `Razem: $${kc(p1, m1)} + ${kc(p2, m2)} = ${s}$ kcal.`],
              };
            }
            if (typ === 2) {
              const sk = p1.sk, w = p1.w, m = m1;
              const wynik = q(w * m, 100);
              return {
                tresc: `W $100$ g ${p1.g} jest $${w}$ g ${sk}. Ile gramów ${sk} jest w porcji $${m}$ g?`,
                pola: [{ id: "g", typ: "liczba", etykieta: `Gramy ${sk}` }],
                odpowiedz: { g: wynik },
                wynik: `$${zap(wynik)}$ g`,
                rozwiazanie: m === 100
                  ? [`Porcja $100$ g to dokładnie tyle, ile podano: $${w}$ g ${sk}.`]
                  : [`$${m}$ g to $${m} : 100 = ${zap(q(m, 100))}$ razy po $100$ g.`, `$${zap(q(m, 100))} \\cdot ${w} = ${zap(wynik)}$ g ${sk}.`],
              };
            }
            const por = kc(p1, m1);
            return {
              tresc: `W $100$ g ${p1.g} jest $${p1.k}$ kcal. Ile gramów tego produktu trzeba zjeść, żeby dostarczyć $${por}$ kcal?`,
              pola: [{ id: "m", typ: "liczba", etykieta: "Masa w gramach" }],
              odpowiedz: { m: m1 },
              wynik: `$${m1}$ g`,
              rozwiazanie: m1 === 100
                ? [`Porcja $100$ g daje $${p1.k}$ kcal, a potrzeba $${por}$ kcal. To dokładnie $100$ g.`]
                : [`Porcja $100$ g daje $${p1.k}$ kcal. Szukamy, ile razy po $100$ g mieści się w $${por}$ kcal: $${por} : ${p1.k} = ${zap(q(m1, 100))}$.`, `$${zap(q(m1, 100))} \\cdot 100 = ${m1}$ g.`],
            };
          },
        },
        {
          id: "zapotrzebowanie-dzienne",
          nazwa: "Plan posiłków",
          opis: "Policz, ile kcal ma mieć posiłek (10%, 20%, 25% lub 50% zapotrzebowania) i ile kcal zostaje na resztę dnia.",
          generuj(r) {
            const D = r.pick([1600, 1800, 2000, 2200, 2400]);
            const POS = [
              { n: "śniadanie", N: "Śniadanie", dal: "dało" },
              { n: "drugie śniadanie", N: "Drugie śniadanie", dal: "dało" },
              { n: "obiad", N: "Obiad", dal: "dał" },
              { n: "podwieczorek", N: "Podwieczorek", dal: "dał" },
              { n: "kolacja", N: "Kolacja", dal: "dała" },
            ];
            const typ = r.int(0, 2);
            const p1 = r.pick([10, 20, 25, 50]);
            const o1 = procent(p1, D, "zapotrzebowania");
            if (typ === 0) {
              const pos = r.pick(POS);
              return {
                tresc: `Dzienne zapotrzebowanie wynosi $${D}$ kcal. Ile kcal ma mieć ${pos.n}, jeśli ma dać $${p1}\\%$ tego zapotrzebowania?`,
                pola: [{ id: "k", typ: "liczba", etykieta: "Liczba kcal" }],
                odpowiedz: { k: o1.w },
                wynik: `$${o1.w}$ kcal`,
                rozwiazanie: [o1.krok],
              };
            }
            if (typ === 1) {
              const pos = r.pick(POS);
              const reszta = D - o1.w;
              return {
                tresc: `Dzienne zapotrzebowanie wynosi $${D}$ kcal. ${pos.N} ${pos.dal} $${p1}\\%$ tego zapotrzebowania. Ile kcal zostało na resztę dnia?`,
                pola: [{ id: "k", typ: "liczba", etykieta: "Liczba kcal" }],
                odpowiedz: { k: reszta },
                wynik: `$${reszta}$ kcal`,
                rozwiazanie: [o1.krok, `Na resztę dnia zostało: $${D} - ${o1.w} = ${reszta}$ kcal.`],
              };
            }
            let p2;
            do { p2 = r.pick([10, 20, 25, 50]); } while (p2 === p1 || p1 + p2 > 75);
            const o2 = procent(p2, D, "zapotrzebowania");
            const s = o1.w + o2.w;
            return {
              tresc: `Dzienne zapotrzebowanie wynosi $${D}$ kcal. Śniadanie ma dać $${p1}\\%$, a obiad $${p2}\\%$ tego zapotrzebowania. Ile kcal mają razem te dwa posiłki?`,
              pola: [{ id: "k", typ: "liczba", etykieta: "Liczba kcal" }],
              odpowiedz: { k: s },
              wynik: `$${s}$ kcal`,
              rozwiazanie: [o1.krok, o2.krok, `Razem: $${o1.w} + ${o2.w} = ${s}$ kcal.`],
            };
          },
        },
      ],
    },
  ],
};
