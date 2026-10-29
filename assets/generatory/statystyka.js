// Generatory zadań z działu „Prawdopodobieństwo i statystyka” (matura podstawowa, formuła 2023).
// Kontrakt zadania i narzędzia: zob. wspolne.js. Liczności zdarzeń liczymy, przeglądając wszystkie wyniki,
// a do treści trafiają tylko zadania z ładnym wynikiem (prawdopodobieństwo o mianowniku najwyżej 12).
import { Q, q, plusMinus, wielomianTex } from "./wspolne.js";

// --- Pomocnicze

const jednoPole = (id, etykieta, odp, wynik, tresc, rozwiazanie) =>
  ({ tresc, pola: [{ id, typ: "liczba", etykieta }], odpowiedz: { [id]: Q.z(odp) }, wynik, rozwiazanie });

/** Zadanie z kilkoma polami: pola = [[id, etykieta, wartość], ...]. */
const wielePol = (pola, wynik, tresc, rozwiazanie) => ({
  tresc,
  pola: pola.map(([id, etykieta]) => ({ id, typ: "liczba", etykieta })),
  odpowiedz: Object.fromEntries(pola.map(([id, , v]) => [id, Q.z(v)])),
  wynik,
  rozwiazanie,
});

/** Zapis dziesiętny z przecinkiem (KaTeX): 21/4 -> "5{,}25"; ułamek bez skończonego rozwinięcia -> \frac. */
function dz(x) {
  const v = Q.z(x);
  let k = 0;
  while (10 ** k % v.d !== 0) if (++k > 3) return v.tex();
  const cyfry = String(Math.abs(v.n) * (10 ** k / v.d)).padStart(k + 1, "0");
  const reszta = k ? `{,}${cyfry.slice(cyfry.length - k)}` : "";
  return (v.ujemna ? "-" : "") + cyfry.slice(0, cyfry.length - k) + reszta;
}

/** Czy liczba ma skończone rozwinięcie dziesiętne o co najwyżej k cyfrach po przecinku (i mianownik najwyżej 10). */
const dziesietna = (v, k = 2) => 10 ** k % Q.z(v).d === 0 && Q.z(v).d <= 10;

const listaTex = (t) => t.join(", ");
const zbiorTex = (t) => `\\{${t.join(", ")}\\}`;
/** Każdy element w osobnym $…$, żeby długie wyliczenia łamały się w wierszu. */
const wyliczTex = (t) => t.map((x) => `$${x}$`).join(", ");
/** "a, b i c" (albo "a, b lub c"). */
const iWyliczenie = (t, spojnik = "i") => (t.length === 1 ? t[0] : `${t.slice(0, -1).join(", ")} ${spojnik} ${t[t.length - 1]}`);
const cyfryTex = (t, spojnik = "i") => iWyliczenie(t.map((c) => `$${c}$`), spojnik);
const iloczynTex = (t) => t.join(" \\cdot ");
const iloczyn = (t) => t.reduce((s, x) => s * x, 1);
const suma = (t) => t.reduce((s, x) => s + x, 0);
/** Suma liczb z poprawnymi znakami: [3, -2, 5] -> "3 - 2 + 5". */
const sumaTex = (t) => t.map((x, i) => (i === 0 ? Q.z(x).tex() : plusMinus(x))).join(" ");
const zakres = (od, doo) => Array.from({ length: doo - od + 1 }, (_, i) => od + i);
/** k różnych liczb z [od, doo], rosnąco. */
const losZbior = (r, k, od, doo) => r.shuffle(zakres(od, doo)).slice(0, k).sort((a, b) => a - b);

/** Odmiana po liczebniku n ≥ 2: odm(3, "kule", "kul") -> "kule", odm(5, "kule", "kul") -> "kul". */
const odm = (n, f24, f5) => ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? f24 : f5);
const mozliwosci = (n) => (n === 1 ? "możliwość" : "możliwości");
const sposobow = (n) => (n === 1 ? "sposób" : odm(n, "sposoby", "sposobów"));
const silnia = (n) => (n <= 1 ? 1 : n * silnia(n - 1));
/** Kolejne czynniki n, n - 1, … (k czynników). */
const czynniki = (n, k) => Array.from({ length: k }, (_, i) => n - i);

const PORZ = ["", "pierwsza", "druga", "trzecia", "czwarta", "piąta", "szósta", "siódma", "ósma", "dziewiąta", "dziesiąta",
  "jedenasta", "dwunasta", "trzynasta", "czternasta", "piętnasta", "szesnasta"];

const POLECENIE_P = "Oblicz prawdopodobieństwo zdarzenia $A$ polegającego na tym, że";

/** Krok z prawdopodobieństwem klasycznym: P(A) = |A| / |Ω|. */
function krokP(f, w) {
  const p = q(f, w);
  return `$P(A) = \\frac{|A|}{|\\Omega|} = \\frac{${f}}{${w}}${p.n === f ? "" : ` = ${p.tex()}`}$.`;
}

/** Zadanie na prawdopodobieństwo z jednym polem. */
const zadanieP = (tresc, f, w, kroki) =>
  jednoPole("p", "$P(A) =$", q(f, w), `$P(A) = ${q(f, w).tex()}$`, tresc, [...kroki, krokP(f, w)]);

/**
 * Liczy |A| przez wypisanie wyników sprzyjających albo – gdy jest ich za dużo – wyników zdarzenia przeciwnego.
 * Zwraca { f, kroki } albo null, gdy obie listy są za długie.
 */
function wypisz(wszystkie, test, tex, prog = 18) {
  const tak = wszystkie.filter(test), nie = wszystkie.filter((x) => !test(x));
  if (tak.length <= prog) {
    return { f: tak.length, kroki: [`Zdarzeniu $A$ sprzyjają zdarzenia elementarne: ${wyliczTex(tak.map(tex))}, czyli $|A| = ${tak.length}$.`] };
  }
  if (nie.length <= prog) {
    return { f: tak.length, kroki: [
      `Łatwiej wypisać zdarzenia elementarne sprzyjające zdarzeniu przeciwnemu $A'$: ${wyliczTex(nie.map(tex))}, czyli $|A'| = ${nie.length}$.`,
      `Zatem $|A| = ${wszystkie.length} - ${nie.length} = ${tak.length}$.`,
    ] };
  }
  return null;
}

const paraTex = ([a, b]) => `(${a}, ${b})`;

// --- 1. Reguła mnożenia

const CYFROWYCH = { 2: "dwucyfrowych", 3: "trzycyfrowych", 4: "czterocyfrowych", 5: "pięciocyfrowych" };
const RZEDY = ["jedności", "dziesiątek", "setek", "tysięcy", "dziesiątek tysięcy"];
const JAKICH = { brak: "", parz: " parzystych", nieparz: " nieparzystych", piec: " podzielnych przez $5$" };
const CYFRY = zakres(0, 9);

/** Opis zbioru cyfr: krótki wypisujemy, długi opisujemy przez brakujące cyfry. */
function opisCyfr(t) {
  if (t.length < 7) return cyfryTex(t);
  return `każda cyfra oprócz ${cyfryTex(CYFRY.filter((c) => !t.includes(c)))}`;
}

/** Nazwy cyfr środkowych liczby k-cyfrowej, od lewej: k = 4 -> ["setek", "dziesiątek"]. */
const srodkowe = (k) => Array.from({ length: k - 2 }, (_, i) => RZEDY[k - 2 - i]);

function regulaMnozenia(r) {
  const wariant = r.pick(["cyfry", "cyfry", "rozne", "rozne", "skrajne", "zero", "dwucyfrowe", "kody", "kody", "zestawy", "zestawy"]);
  if (wariant === "cyfry") return liczbyZCyfr(r);
  if (wariant === "rozne") return liczbyORoznychCyfrach(r);
  if (wariant === "skrajne") return pierwszaRownaOstatniej(r);
  if (wariant === "zero") return jednoZero(r);
  if (wariant === "dwucyfrowe") return dwucyfroweZWarunkiem(r);
  if (wariant === "kody") return kody(r);
  return zestawy(r);
}

const zadanieLiczby = (N, wzor, tresc, kroki) =>
  jednoPole("n", "Liczba takich liczb", N, `$${wzor} = ${N}$`, tresc, [...kroki, `Z reguły mnożenia: $${wzor} = ${N}$.`]);

/** Liczby zapisane tylko danymi cyframi (z powtórzeniami), np. CKE 2024: czterocyfrowe parzyste z cyfr 2, 4, 7. */
function liczbyZCyfr(r) {
  for (;;) {
    const k = r.pick([3, 3, 4, 4, 5]);
    const bez = r.chance(0.25) && k < 5 ? r.int(0, 9) : null;      // „nie występuje cyfra c”
    const S = bez !== null ? CYFRY.filter((c) => c !== bez) : losZbior(r, r.int(3, k === 5 ? 3 : 5), 0, 9);
    if (bez === null && !S.includes(0) && r.chance(0.5)) continue;   // częściej zbiory z zerem
    const war = r.pick(["brak", "parz", "nieparz"]);
    const pierwsze = S.filter((c) => c !== 0);
    const ostatnie = war === "brak" ? S : S.filter((c) => c % 2 === (war === "parz" ? 0 : 1));
    if (!ostatnie.length || ostatnie.length === S.length) continue;
    const ileSrodek = war === "brak" ? k - 1 : k - 2;                // miejsca na dowolną dozwoloną cyfrę
    const cz = [pierwsze.length, ...Array(ileSrodek).fill(S.length), ...(war === "brak" ? [] : [ostatnie.length])];
    const N = iloczyn(cz);
    const nazwy = Array.from({ length: ileSrodek }, (_, i) => RZEDY[k - 2 - i]);
    const zero = S.includes(0) ? " – zero nie może stać na początku" : "";
    const kroki = [
      `Cyfra ${RZEDY[k - 1]}: $${pierwsze.length}$ ${mozliwosci(pierwsze.length)} (${opisCyfr(pierwsze)}${zero}).`,
      ileSrodek === 1
        ? `Cyfra ${nazwy[0]}: $${S.length}$ ${mozliwosci(S.length)} (dowolna z dozwolonych cyfr).`
        : `Cyfry ${iWyliczenie(nazwy)}: po $${S.length}$ ${mozliwosci(S.length)} (dowolne z dozwolonych cyfr, mogą się powtarzać).`,
    ];
    if (war !== "brak") {
      kroki.push(`Cyfra jedności: $${ostatnie.length}$ ${mozliwosci(ostatnie.length)} (${cyfryTex(ostatnie, "lub")} – liczba ma być ${war === "parz" ? "parzysta" : "nieparzysta"}).`);
    }
    const jakie = `liczb naturalnych ${CYFROWYCH[k]}${JAKICH[war]}`;
    const tresc = bez !== null
      ? `Ile jest wszystkich ${jakie}, w których zapisie dziesiętnym nie występuje cyfra $${bez}$?`
      : r.pick([
        `Ile jest wszystkich ${jakie}, w których zapisie dziesiętnym występują wyłącznie cyfry ${cyfryTex(S)}? Cyfry mogą się powtarzać.`,
        `Oblicz, ile jest ${jakie}, które można zapisać, używając tylko cyfr ${cyfryTex(S)} (każdej z nich można użyć dowolnie wiele razy).`,
      ]);
    return zadanieLiczby(N, iloczynTex(cz), tresc, kroki);
  }
}

/** Liczby o różnych cyfrach, np. trzycyfrowe nieparzyste (CKE 2023, sierpień: czterocyfrowe o różnych cyfrach). */
function liczbyORoznychCyfrach(r) {
  const k = r.pick([2, 3, 3, 3, 4]);
  const war = r.pick(["brak", "nieparz", "nieparz", "parz", "piec"]);
  const pierwsza = RZEDY[k - 1];
  const jakie = `liczb naturalnych ${CYFROWYCH[k]}${JAKICH[war]}`;
  const tresc = r.pick([
    `Ile jest wszystkich ${jakie}, w których zapisie dziesiętnym cyfry się nie powtarzają?`,
    `Oblicz, ile jest ${jakie} o różnych cyfrach (żadna cyfra nie występuje w zapisie liczby dwa razy).`,
  ]);
  const dalej = (n) => (k === 3 ? `cyfra dziesiątek – $${n}$ możliwości` : `cyfry setek i dziesiątek – kolejno $${n}$ i $${n - 1}$ możliwości`);
  if (war === "brak") {
    const cz = [9, ...czynniki(9, k - 1)];
    return zadanieLiczby(iloczyn(cz), iloczynTex(cz), tresc, [
      `Cyfra ${pierwsza}: $9$ możliwości (każda cyfra oprócz zera).`,
      k === 2
        ? "Cyfra jedności: $9$ możliwości (każda cyfra oprócz cyfry dziesiątek, zero jest już dozwolone)."
        : `Każda następna cyfra musi być inna niż wszystkie wcześniejsze (zero jest już dozwolone): kolejno ${cyfryTex(czynniki(9, k - 1))} możliwości.`,
    ]);
  }
  if (war === "nieparz") {
    const cz = [8, ...czynniki(8, k - 2), 5];
    const kroki = [
      "Zaczynamy od cyfry jedności: $5$ możliwości ($1$, $3$, $5$, $7$ lub $9$).",
      `Cyfra ${pierwsza}: $8$ możliwości (nie może być zerem ani cyfrą jedności).`,
    ];
    if (k > 2) kroki.push(`Pozostałe cyfry wybieramy spośród cyfr jeszcze niewykorzystanych (także zera): ${dalej(8)}.`);
    return zadanieLiczby(iloczyn(cz), iloczynTex(cz), tresc, kroki);
  }
  // Liczby parzyste albo podzielne przez 5: osobno cyfra jedności 0 i cyfra jedności różna od zera.
  const U = war === "parz" ? [2, 4, 6, 8] : [5];
  const cz1 = czynniki(9, k - 1), cz2 = [8, ...czynniki(8, k - 2), U.length];
  const N1 = iloczyn(cz1), N2 = iloczyn(cz2);
  const wzor1 = cz1.length > 1 ? `${iloczynTex(cz1)} = ${N1}` : `${N1}`;
  return jednoPole("n", "Liczba takich liczb", N1 + N2, `$${N1} + ${N2} = ${N1 + N2}$`, tresc, [
    `Cyfrą jedności może być ${war === "parz" ? "$0$, $2$, $4$, $6$ lub $8$" : "$0$ lub $5$"}. Rozważamy osobno przypadek, w którym jest nią zero.`,
    `Cyfra jedności $0$: cyfrę ${pierwsza} wybieramy spośród $9$ cyfr niezerowych${k > 2 ? ", a kolejne spośród cyfr jeszcze niewykorzystanych" : ""} – razem $${wzor1}$ liczb.`,
    `Cyfra jedności ${cyfryTex(U, "lub")} ($${U.length}$ ${mozliwosci(U.length)}): cyfra ${pierwsza} – $8$ możliwości (nie zero i nie cyfra jedności)${k > 2 ? `, ${dalej(8)}` : ""} – razem $${iloczynTex(cz2)} = ${N2}$ liczb.`,
    `Wszystkich takich liczb jest $${N1} + ${N2} = ${N1 + N2}$.`,
  ]);
}

/** Cyfra pierwsza równa ostatniej (CKE 2026, czerwiec: czterocyfrowe parzyste o równych cyfrach tysięcy i jedności). */
function pierwszaRownaOstatniej(r) {
  const k = r.pick([3, 4, 4, 5]);
  const war = r.pick(["brak", "parz", "nieparz"]);
  const pierwsze = war === "brak" ? zakres(1, 9) : war === "parz" ? [2, 4, 6, 8] : [1, 3, 5, 7, 9];
  const c = pierwsze.length, pierwsza = RZEDY[k - 1], srodek = srodkowe(k);
  const cz = [c, ...Array(k - 2).fill(10), 1];
  const N = iloczyn(cz);
  const dlaczego = war === "brak" ? "każda cyfra oprócz zera"
    : war === "parz" ? `${cyfryTex(pierwsze, "lub")} – cyfra jedności ma być parzysta, a zero nie może stać na początku`
      : `${cyfryTex(pierwsze, "lub")} – cyfra jedności ma być nieparzysta`;
  const tresc = r.pick([
    `Ile jest wszystkich liczb naturalnych ${CYFROWYCH[k]}${JAKICH[war]}, w których zapisie dziesiętnym cyfra ${pierwsza} jest równa cyfrze jedności?`,
    `Oblicz, ile jest liczb naturalnych ${CYFROWYCH[k]}${JAKICH[war]}, których pierwsza cyfra jest taka sama jak ostatnia.`,
  ]);
  return zadanieLiczby(N, iloczynTex(cz), tresc, [
    `Cyfra jedności jest taka sama jak cyfra ${pierwsza}, więc liczbę wyznaczają cyfra ${pierwsza} i cyfry środkowe.`,
    `Cyfra ${pierwsza}: $${c}$ możliwości (${dlaczego}).`,
    k === 3 ? "Cyfra dziesiątek: $10$ możliwości." : `Cyfry ${iWyliczenie(srodek)}: po $10$ możliwości.`,
    `Cyfra jedności: $1$ możliwość (taka sama jak cyfra ${pierwsza}).`,
  ]);
}

/** Cyfra 0 dokładnie jeden raz (CKE 2025, maj: trzycyfrowe nieparzyste). */
function jednoZero(r) {
  const [k, war] = r.pick([[3, "nieparz"], [3, "nieparz"], [4, "nieparz"], [3, "brak"], [3, "parz"]]);
  const tresc = r.pick([
    `Ile jest wszystkich liczb naturalnych ${CYFROWYCH[k]}${JAKICH[war]}, w których zapisie dziesiętnym cyfra $0$ występuje dokładnie jeden raz?`,
    `Oblicz, ile jest liczb naturalnych ${CYFROWYCH[k]}${JAKICH[war]}, w których zapisie dziesiętnym jest dokładnie jedno zero.`,
  ]);
  if (k === 3 && war === "nieparz") {
    return zadanieLiczby(45, "9 \\cdot 1 \\cdot 5", tresc, [
      "Zero nie może być cyfrą setek (stoi na początku) ani cyfrą jedności (liczba jest nieparzysta), więc jest cyfrą dziesiątek.",
      "Cyfra setek: $9$ możliwości, cyfra dziesiątek: $1$ możliwość (zero), cyfra jedności: $5$ możliwości ($1$, $3$, $5$, $7$ lub $9$).",
    ]);
  }
  if (k === 4) {
    return zadanieLiczby(810, "2 \\cdot 9 \\cdot 9 \\cdot 5", tresc, [
      "Zero nie może być cyfrą tysięcy ani cyfrą jedności (liczba jest nieparzysta), więc stoi na miejscu setek albo dziesiątek – $2$ możliwości.",
      "Cyfra tysięcy: $9$ możliwości (bez zera), druga z cyfr środkowych: $9$ możliwości (bez zera), cyfra jedności: $5$ możliwości.",
    ]);
  }
  if (war === "brak") {
    return zadanieLiczby(162, "2 \\cdot 9 \\cdot 9", tresc, [
      "Zero nie może być cyfrą setek, więc stoi na miejscu dziesiątek albo jedności – $2$ możliwości.",
      "Cyfra setek: $9$ możliwości (bez zera), pozostała cyfra: $9$ możliwości (bez zera).",
    ]);
  }
  return jednoPole("n", "Liczba takich liczb", 117, "$81 + 36 = 117$", tresc, [
    "Zero nie może być cyfrą setek. Rozważamy dwa przypadki.",
    "Zero jest cyfrą jedności: cyfra setek i cyfra dziesiątek – po $9$ możliwości (bez zera), razem $9 \\cdot 9 = 81$ liczb.",
    "Zero jest cyfrą dziesiątek: cyfra setek – $9$ możliwości, cyfra jedności – $4$ możliwości ($2$, $4$, $6$ lub $8$), razem $9 \\cdot 4 = 36$ liczb.",
    "Wszystkich takich liczb jest $81 + 36 = 117$.",
  ]);
}

/** Liczby dwucyfrowe z warunkiem na cyfry (CKE 2024, sierpień: cyfra dziesiątek o 3 większa od cyfry jedności). */
function dwucyfroweZWarunkiem(r) {
  for (;;) {
    const rodzaj = r.pick(["wieksza", "mniejsza", "suma"]);
    const d = r.int(1, 7), s = r.int(3, 16);
    const opis = rodzaj === "wieksza" ? `cyfra dziesiątek jest o $${d}$ większa od cyfry jedności`
      : rodzaj === "mniejsza" ? `cyfra dziesiątek jest o $${d}$ mniejsza od cyfry jedności` : `suma cyfr jest równa $${s}$`;
    const test = (t, j) => (rodzaj === "wieksza" ? t === j + d : rodzaj === "mniejsza" ? t === j - d : t + j === s);
    const liczby = zakres(10, 99).filter((n) => test(Math.floor(n / 10), n % 10));
    if (liczby.length < 2) continue;
    const tresc = r.pick([
      `Ile jest wszystkich liczb naturalnych dwucyfrowych, w których zapisie dziesiętnym ${opis}?`,
      `Oblicz, ile jest liczb naturalnych dwucyfrowych, w których ${opis}.`,
    ]);
    return jednoPole("n", "Liczba takich liczb", liczby.length, `$${liczby.length}$`, tresc, [
      `Wypisujemy wszystkie takie liczby: ${wyliczTex(liczby)}.`,
      `Jest ich $${liczby.length}$.`,
    ]);
  }
}

const ILU_CYFR = { 3: "trzech", 4: "czterech", 5: "pięciu" };
const KODY = [["Kod do sejfu", "kodzie", "kodów"], ["Szyfr kłódki rowerowej", "szyfrze", "szyfrów"],
  ["Kod otwierający drzwi do pracowni", "kodzie", "kodów"]];

/** Kody z danych cyfr, z powtórzeniami albo bez. */
function kody(r) {
  const rodzaj = r.pick(["powt", "powt", "bez", "bez", "dziesiec"]);
  const k = rodzaj === "dziesiec" ? r.pick([3, 4]) : r.pick([3, 4, 4, 5]);
  const n = rodzaj === "dziesiec" ? 10 : r.int(rodzaj === "bez" ? Math.max(k, 4) : 3, 7);
  const S = rodzaj === "dziesiec" ? null : losZbior(r, n, 0, 9);
  const cz = rodzaj === "powt" ? Array(k).fill(n) : czynniki(n, k);
  const N = iloczyn(cz);
  const [co, wCzym, czego] = r.pick(KODY);
  const zCzego = S ? `cyfr wybranych spośród: ${cyfryTex(S)}` : "cyfr (każda od $0$ do $9$)";
  const tresc = `${co} składa się z ${ILU_CYFR[k]} ${zCzego}. Cyfry w ${wCzym} ${rodzaj === "powt" ? "mogą" : "nie mogą"} się powtarzać. Ile jest wszystkich takich ${czego}?`;
  const kroki = rodzaj === "powt"
    ? [`Na każdym z $${k}$ miejsc może stać dowolna z $${n}$ cyfr.`, `Z reguły mnożenia: $${iloczynTex(cz)} = ${n}^{${k}} = ${N}$.`]
    : [`Pierwszą cyfrę wybieramy na $${n}$ sposobów, drugą – na $${n - 1}$ (bez cyfry już użytej) i tak dalej.`,
      `Z reguły mnożenia: $${iloczynTex(cz)} = ${N}$.`];
  return jednoPole("n", `Liczba ${czego}`, N, `$${N}$`, tresc, kroki);
}

/** Zestawy obiadowe, stroje i trasy – iloczyn liczby wyborów. */
function zestawy(r) {
  const rodzaj = r.pick(["obiad", "stroj", "trasa"]);
  const a = r.int(2, 6), b = r.int(2, 6), c = r.int(2, 5);
  if (rodzaj === "obiad") {
    const bezDeseru = r.chance(0.4);
    const c2 = bezDeseru ? c + 1 : c;
    const tresc = `Szkolna stołówka oferuje codziennie $${a}$ ${odm(a, "zupy", "zup")}, $${b}$ ${odm(b, "drugie dania", "drugich dań")} i $${c}$ ${odm(c, "desery", "deserów")}. Uczeń wybiera jedną zupę, jedno drugie danie i jeden deser${bezDeseru ? " albo rezygnuje z deseru" : ""}. Ile różnych zestawów obiadowych może wybrać?`;
    const wzor = `${a} \\cdot ${b} \\cdot ${c2}`;
    return jednoPole("n", "Liczba zestawów", a * b * c2, `$${wzor} = ${a * b * c2}$`, tresc, [
      `Zupę można wybrać na $${a}$ ${sposobow(a)}, drugie danie – na $${b}$, a deser – na $${c}$${bezDeseru ? `; z rezygnacją z deseru są $${c} + 1 = ${c2}$ możliwości` : ""}.`,
      `Z reguły mnożenia: $${wzor} = ${a * b * c2}$.`,
    ]);
  }
  if (rodzaj === "stroj") {
    const imie = r.pick(["Ola", "Kasia", "Zosia", "Marta"]);
    const tresc = `${imie} ma w szafie $${a}$ ${odm(a, "bluzki", "bluzek")}, $${b}$ ${odm(b, "spódnice", "spódnic")} i $${c}$ ${odm(c, "pary butów", "par butów")}. Na ile sposobów może się ubrać, jeśli zakłada jedną bluzkę, jedną spódnicę i jedną parę butów?`;
    const wzor = `${a} \\cdot ${b} \\cdot ${c}`;
    return jednoPole("n", "Liczba sposobów", a * b * c, `$${wzor} = ${a * b * c}$`, tresc, [
      `Bluzkę można wybrać na $${a}$ ${sposobow(a)}, spódnicę – na $${b}$, a parę butów – na $${c}$.`,
      `Z reguły mnożenia: $${wzor} = ${a * b * c}$.`,
    ]);
  }
  const wstep = `Z miejscowości $A$ do miejscowości $B$ ${odm(a, "prowadzą", "prowadzi")} $${a}$ ${odm(a, "drogi", "dróg")}, a z miejscowości $B$ do miejscowości $C$ – $${b}$ ${odm(b, "drogi", "dróg")}. Innych dróg między tymi miejscowościami nie ma.`;
  if (r.chance(0.5)) {
    return jednoPole("n", "Liczba sposobów", a * b, `$${a} \\cdot ${b} = ${a * b}$`,
      `${wstep} Na ile sposobów można przejechać z $A$ do $C$?`, [
        `Drogę z $A$ do $B$ wybieramy na $${a}$ ${sposobow(a)}, a z $B$ do $C$ – na $${b}$.`,
        `Z reguły mnożenia: $${a} \\cdot ${b} = ${a * b}$.`,
      ]);
  }
  const N = a * b * (a - 1) * (b - 1);
  const wzor = `${a} \\cdot ${b} \\cdot ${b - 1} \\cdot ${a - 1}`;
  return jednoPole("n", "Liczba sposobów", N, `$${wzor} = ${N}$`,
    `${wstep} Na ile sposobów można pojechać z $A$ do $C$ i wrócić do $A$, jeśli w drodze powrotnej nie wolno jechać żadną z dróg użytych w drodze do $C$?`, [
      `Do $C$: drogę z $A$ do $B$ wybieramy na $${a}$ ${sposobow(a)}, a z $B$ do $C$ – na $${b}$.`,
      `Z powrotem: z $C$ do $B$ zostaje $${b - 1}$ ${b - 1 === 1 ? "droga" : odm(b - 1, "drogi", "dróg")}, a z $B$ do $A$ – $${a - 1}$.`,
      `Z reguły mnożenia: $${wzor} = ${N}$.`,
    ]);
}

// --- 2. Ustawienia i wybory

const IMIONA = ["Ania", "Bartek", "Celina", "Darek", "Ewa", "Filip", "Gosia", "Hubert"];

function ustawienia(r) {
  const wariant = r.pick(["permutacje", "permutacje", "funkcje", "pary", "pary", "odwrotne"]);
  if (wariant === "permutacje") return permutacje(r);
  if (wariant === "funkcje") return wyborZKolejnoscia(r);
  if (wariant === "pary") return pary(r);
  return paryOdwrotnie(r);
}

/** n! z dodatkowym warunkiem: ktoś na początku, dwie osoby na końcach albo obok siebie. */
function permutacje(r) {
  const n = r.int(4, 8);
  const warunek = r.pick(["brak", "brak", "pierwsza", "skrajne", "obok"]);
  const silniaTex = (m) => `${m}! = ${m === 1 ? "1" : iloczynTex(czynniki(m, m))} = ${silnia(m)}`;
  const osob = (m) => (m === 1 ? "osobę" : odm(m, "osoby", "osób"));
  if (r.chance(0.3) && (warunek === "brak" || warunek === "obok")) {
    const obok = warunek === "obok";
    const N = obok ? 2 * silnia(n - 1) : silnia(n);
    const tresc = `Na półce ustawiamy w jednym rzędzie $${n}$ różnych książek${obok ? ", wśród których są dwa tomy tej samej powieści" : ""}. Na ile sposobów można to zrobić${obok ? ", jeśli oba tomy powieści mają stać obok siebie" : ""}?`;
    return jednoPole("n", "Liczba sposobów", N, `$${obok ? `2 \\cdot ${n - 1}!` : `${n}!`} = ${N}$`, tresc, obok ? [
      `Oba tomy traktujemy jak jedną „książkę”: ustawiamy $${n - 1}$ elementów na $${n - 1}!$ sposobów.`,
      `Tomy mogą zamienić się miejscami na $2$ sposoby, więc wszystkich ustawień jest $2 \\cdot ${n - 1}! = 2 \\cdot ${silnia(n - 1)} = ${N}$.`,
    ] : [
      `Pierwsze miejsce może zająć każda z $${n}$ książek, drugie – każda z pozostałych $${n - 1}$ i tak dalej.`,
      `Liczba ustawień: $${silniaTex(n)}$.`,
    ]);
  }
  const imiona = IMIONA.slice(0, n), [A, B] = r.shuffle(imiona);
  const wstep = `${iWyliczenie(imiona)} ustawiają się w kolejce do kasy.`;
  if (warunek === "brak") {
    return jednoPole("n", "Liczba sposobów", silnia(n), `$${n}! = ${silnia(n)}$`, `${wstep} Na ile sposobów mogą to zrobić?`, [
      `Pierwsze miejsce w kolejce może zająć każda z $${n}$ osób, drugie – każda z pozostałych $${n - 1}$ i tak dalej.`,
      `Liczba ustawień: $${silniaTex(n)}$.`,
    ]);
  }
  if (warunek === "pierwsza") {
    return jednoPole("n", "Liczba sposobów", silnia(n - 1), `$${n - 1}! = ${silnia(n - 1)}$`,
      `${wstep} Na ile sposobów mogą to zrobić, jeśli ${A} ma stać na początku kolejki?`, [
        `Pierwsze miejsce zajmuje ${A}, a pozostałe $${n - 1}$ ${osob(n - 1)} ustawiamy ${A.endsWith("a") ? "za nią" : "za nim"} dowolnie.`,
        `Liczba ustawień: $${silniaTex(n - 1)}$.`,
      ]);
  }
  if (warunek === "skrajne") {
    const N = 2 * silnia(n - 2);
    return jednoPole("n", "Liczba sposobów", N, `$2 \\cdot ${n - 2}! = ${N}$`,
      `${wstep} Na ile sposobów mogą to zrobić, jeśli ${A} i ${B} mają stać na początku i na końcu kolejki (w dowolnej kolejności)?`, [
        `${A} i ${B} mogą zająć skrajne miejsca na $2$ sposoby.`,
        `Pozostałe $${n - 2}$ ${osob(n - 2)} ustawiamy między nimi na $${n - 2}! = ${silnia(n - 2)}$ ${sposobow(silnia(n - 2))}.`,
        `Z reguły mnożenia: $2 \\cdot ${silnia(n - 2)} = ${N}$.`,
      ]);
  }
  const N = 2 * silnia(n - 1);
  return jednoPole("n", "Liczba sposobów", N, `$2 \\cdot ${n - 1}! = ${N}$`,
    `${wstep} Na ile sposobów mogą to zrobić, jeśli ${A} i ${B} chcą stać bezpośrednio obok siebie?`, [
      `${A} i ${B} traktujemy jak jedną „osobę”: ustawiamy $${n - 1}$ elementów na $${n - 1}! = ${silnia(n - 1)}$ sposobów.`,
      `${A} i ${B} mogą zamienić się miejscami na $2$ sposoby, więc wszystkich ustawień jest $2 \\cdot ${silnia(n - 1)} = ${N}$.`,
    ]);
}

/** Wybór z kolejnością: medale, funkcje w samorządzie klasowym. */
function wyborZKolejnoscia(r) {
  if (r.chance(0.5)) {
    const n = r.int(5, 12);
    const cz = czynniki(n, 3);
    return jednoPole("n", "Liczba sposobów", iloczyn(cz), `$${iloczynTex(cz)} = ${iloczyn(cz)}$`,
      `W finale biegu na $100$ m startuje $${n}$ zawodników. Na ile sposobów mogą zostać rozdzielone medale: złoty, srebrny i brązowy? Każdy zawodnik może zdobyć co najwyżej jeden medal.`, [
        `Złoty medal może zdobyć każdy z $${n}$ zawodników, srebrny – każdy z pozostałych $${n - 1}$, a brązowy – każdy z pozostałych $${n - 2}$.`,
        `Z reguły mnożenia: $${iloczynTex(cz)} = ${iloczyn(cz)}$.`,
      ]);
  }
  const trzy = r.chance(0.5);
  const n = trzy ? r.int(12, 20) : r.int(15, 30);
  const cz = czynniki(n, trzy ? 3 : 2);
  const funkcje = trzy ? "przewodniczącego, zastępcę przewodniczącego i skarbnika" : "przewodniczącego i zastępcę przewodniczącego";
  return jednoPole("n", "Liczba sposobów", iloczyn(cz), `$${iloczynTex(cz)} = ${iloczyn(cz)}$`,
    `Klasa liczy $${n}$ uczniów. Na ile sposobów można wybrać spośród nich ${funkcje} samorządu klasowego, jeśli jedna osoba może pełnić tylko jedną funkcję?`, [
      `Przewodniczącego wybieramy na $${n}$ sposobów, zastępcę – spośród pozostałych $${n - 1}$ uczniów${trzy ? `, a skarbnika – spośród pozostałych $${n - 2}$` : ""}.`,
      `Z reguły mnożenia: $${iloczynTex(cz)} = ${iloczyn(cz)}$.`,
    ]);
}

/** Pary bez kolejności: powitania, mecze, przekątne, delegacje. */
function pary(r) {
  const rodzaj = r.pick(["powitania", "turniej", "rewanz", "przekatne", "delegacja"]);
  const n = rodzaj === "delegacja" ? r.int(10, 30) : rodzaj === "przekatne" ? r.int(5, 20) : r.int(5, 16);
  const C2 = (n * (n - 1)) / 2;
  if (rodzaj === "rewanz") {
    return jednoPole("n", "Liczba meczów", n * (n - 1), `$${n} \\cdot ${n - 1} = ${n * (n - 1)}$`,
      `W rozgrywkach ligowych bierze udział $${n}$ drużyn. Każde dwie drużyny rozgrywają ze sobą dwa mecze – jeden na boisku każdej z nich. Ile meczów zostanie rozegranych?`, [
        `Każda z $${n}$ drużyn rozgrywa jeden mecz u siebie z każdą z pozostałych $${n - 1}$ drużyn.`,
        `Meczów jest więc $${n} \\cdot ${n - 1} = ${n * (n - 1)}$ (każdy liczymy raz – według gospodarza).`,
      ]);
  }
  if (rodzaj === "przekatne") {
    const N = (n * (n - 3)) / 2;
    return jednoPole("n", "Liczba przekątnych", N, `$\\frac{${n} \\cdot ${n - 3}}{2} = ${N}$`,
      r.pick([`Ile przekątnych ma wielokąt wypukły o $${n}$ bokach?`, `Oblicz liczbę wszystkich przekątnych $${n}$-kąta wypukłego.`]), [
        `Z każdego z $${n}$ wierzchołków wychodzi $${n - 3}$ przekątnych (do wszystkich wierzchołków oprócz niego samego i dwóch sąsiednich).`,
        `Każdą przekątną policzyliśmy dwa razy (z obu końców), więc przekątnych jest $\\frac{${n} \\cdot ${n - 3}}{2} = ${N}$.`,
      ]);
  }
  const [tresc, krok1, etykieta] = {
    powitania: [`Na spotkanie przyszło $${n}$ osób. Każda z nich przywitała się z każdą inną uściskiem dłoni dokładnie jeden raz. Ile było wszystkich powitań?`,
      `Każda z $${n}$ osób witała się z $${n - 1}$ innymi, ale w ten sposób każde powitanie liczymy dwa razy.`, "Liczba powitań"],
    turniej: [`W turnieju piłkarskim wzięło udział $${n}$ drużyn. Każda drużyna rozegrała z każdą inną dokładnie jeden mecz. Ile meczów rozegrano w tym turnieju?`,
      `Każda z $${n}$ drużyn grała z $${n - 1}$ innymi, ale w ten sposób każdy mecz liczymy dwa razy.`, "Liczba meczów"],
    delegacja: [`Klasa liczy $${n}$ uczniów. Na ile sposobów można wybrać spośród nich dwuosobową delegację na spotkanie z dyrektorem szkoły?`,
      `Pierwszą osobę można wybrać na $${n}$ sposobów, a drugą na $${n - 1}$, ale kolejność wyboru nie ma znaczenia, więc każdą parę liczymy dwa razy.`, "Liczba sposobów"],
  }[rodzaj];
  return jednoPole("n", etykieta, C2, `$\\frac{${n} \\cdot ${n - 1}}{2} = ${C2}$`, tresc, [
    krok1,
    `Zatem szukana liczba jest równa $\\frac{${n} \\cdot ${n - 1}}{2} = ${C2}$.`,
  ]);
}

/** Z liczby powitań, partii albo przekątnych wyznaczamy liczbę osób, zawodników albo boków. */
function paryOdwrotnie(r) {
  const rodzaj = r.pick(["powitania", "partie", "przekatne"]);
  const n = r.int(5, 16);
  const przek = rodzaj === "przekatne";
  const M = przek ? (n * (n - 3)) / 2 : (n * (n - 1)) / 2;
  const b = przek ? 3 : 1;                       // n^2 - bn - 2M = 0
  const D = b * b + 8 * M, s = Math.sqrt(D);
  const [tresc, etykieta, rownanie] = {
    powitania: [`Na spotkaniu każda osoba przywitała się z każdą inną uściskiem dłoni dokładnie jeden raz. Wszystkich powitań było $${M}$. Ile osób było na spotkaniu?`,
      "Liczba osób", `Jeśli na spotkaniu było $n$ osób, to powitań było $\\frac{n(n - 1)}{2}$.`],
    partie: [`W turnieju szachowym każdy zawodnik rozegrał z każdym innym dokładnie jedną partię. Rozegrano $${M}$ partii. Ilu zawodników wzięło udział w tym turnieju?`,
      "Liczba zawodników", `Jeśli w turnieju grało $n$ zawodników, to rozegrano $\\frac{n(n - 1)}{2}$ partii.`],
    przekatne: [`Wielokąt wypukły ma $${M}$ przekątnych. Ile boków ma ten wielokąt?`,
      "Liczba boków", "Wielokąt wypukły o $n$ bokach ma $\\frac{n(n - 3)}{2}$ przekątnych."],
  }[rodzaj];
  return jednoPole("n", etykieta, n, `$n = ${n}$`, tresc, [
    rownanie,
    `$\\frac{n(n - ${b})}{2} = ${M}$, czyli $${wielomianTex([1, -b, -2 * M], "n")} = 0$.`,
    `$\\Delta = ${b * b} + ${8 * M} = ${D}$, $\\sqrt{\\Delta} = ${s}$, więc $n = \\frac{${b} + ${s}}{2} = ${n}$ (drugie rozwiązanie jest ujemne).`,
  ]);
}

// --- 3. Kostki i monety

const OMEGA_KOSTKI = zakres(1, 6).flatMap((a) => zakres(1, 6).map((b) => [a, b]));
const KOSTKA = "symetryczną sześcienną kostką do gry, która na ściankach ma od $1$ do $6$ oczek";

function kostkiMonety(r) {
  const wariant = r.pick(["kostki", "kostki", "kostki", "monety", "kostkaMoneta"]);
  if (wariant === "kostki") return dwieKostki(r);
  if (wariant === "monety") return monety(r);
  return kostkaIMoneta(r);
}

/** Zdarzenia przy dwukrotnym rzucie kostką: [opis, test(a, b), wstęp?, zapis wyniku?]. */
function zdarzenieKostek(r) {
  const s = r.int(3, 11), k = r.pick([3, 4, 5, 6]), d = r.int(1, 5), p = r.pick([4, 6, 8, 12, 18]);
  const dwucyfrowa = "Liczbę oczek z pierwszego rzutu traktujemy jako cyfrę dziesiątek, a z drugiego – jako cyfrę jedności pewnej liczby dwucyfrowej.";
  return r.pick([
    [`suma wyrzuconych oczek będzie równa $${s}$`, (a, b) => a + b === s],
    [`suma wyrzuconych oczek będzie większa od $${s}$`, (a, b) => a + b > s],
    [`suma wyrzuconych oczek będzie mniejsza od $${s}$`, (a, b) => a + b < s],
    [`suma wyrzuconych oczek będzie podzielna przez $${k}$`, (a, b) => (a + b) % k === 0],
    ["suma wyrzuconych oczek będzie liczbą pierwszą", (a, b) => [2, 3, 5, 7, 11].includes(a + b)],
    ["iloczyn wyrzuconych oczek będzie liczbą nieparzystą", (a, b) => (a * b) % 2 === 1],
    ["iloczyn wyrzuconych oczek będzie liczbą parzystą", (a, b) => (a * b) % 2 === 0],
    [`iloczyn wyrzuconych oczek będzie podzielny przez $${k}$`, (a, b) => (a * b) % k === 0],
    [`iloczyn wyrzuconych oczek będzie równy $${p}$`, (a, b) => a * b === p],
    ["w obu rzutach wypadnie taka sama liczba oczek", (a, b) => a === b],
    ["w obu rzutach wypadną różne liczby oczek", (a, b) => a !== b],
    ["w pierwszym rzucie wypadnie więcej oczek niż w drugim", (a, b) => a > b],
    [`liczby wyrzuconych oczek będą się różnić o $${d}$`, (a, b) => Math.abs(a - b) === d],
    [`otrzymana liczba dwucyfrowa będzie podzielna przez $${r.pick([3, 4, 6, 7, 9, 11, 12, 13])}$`, null, dwucyfrowa],
  ]);
}

/** Dwukrotny rzut kostką: 36 zdarzeń elementarnych (CKE 2024, czerwiec; 2025, maj; 2025, sierpień). */
function dwieKostki(r) {
  for (;;) {
    if (r.chance(0.2)) {
      // „co najmniej raz” – przez zdarzenie przeciwne
      const [opis, ile] = r.pick([["parzysta liczba oczek", 3], ["liczba oczek podzielna przez $3$", 2],
        ["liczba oczek większa od $2$", 4], ["liczba oczek mniejsza od $3$", 2], ["liczba oczek większa od $4$", 2]]);
      const nie = 6 - ile, f = 36 - nie * nie;
      return zadanieP(`Rzucamy dwa razy ${KOSTKA}. ${POLECENIE_P} co najmniej raz wypadnie ${opis}.`, f, 36, [
        "$|\\Omega| = 6 \\cdot 6 = 36$ – zdarzeniami elementarnymi są pary (wynik pierwszego rzutu, wynik drugiego rzutu).",
        `Zdarzenie przeciwne $A'$: w żadnym rzucie nie wypadnie ${opis}. W każdym rzucie jest wtedy $${nie}$ ${mozliwosci(nie)}, więc $|A'| = ${nie} \\cdot ${nie} = ${nie * nie}$.`,
        `$|A| = 36 - ${nie * nie} = ${f}$.`,
      ]);
    }
    let [opis, test, wstep] = zdarzenieKostek(r);
    let tex = paraTex;
    if (!test) {
      const k = Number(opis.match(/\$(\d+)\$$/)[1]);
      test = (a, b) => (10 * a + b) % k === 0;
      tex = ([a, b]) => `${10 * a + b}`;
    }
    const w = wypisz(OMEGA_KOSTKI, ([a, b]) => test(a, b), tex);
    if (!w || w.f === 0 || w.f === 36 || q(w.f, 36).d > 12) continue;
    const otwarcie = r.pick([`Doświadczenie losowe polega na dwukrotnym rzucie ${KOSTKA}.`,
      `Rzucamy dwa razy ${KOSTKA}.`]);
    const tresc = `${otwarcie}${wstep ? ` ${wstep}` : ""} ${POLECENIE_P} ${opis}.`;
    return zadanieP(tresc, w.f, 36, [
      "$|\\Omega| = 6 \\cdot 6 = 36$ – zdarzeniami elementarnymi są pary (wynik pierwszego rzutu, wynik drugiego rzutu).",
      ...w.kroki,
    ]);
  }
}

const RAZY = { 2: "dwa razy", 3: "trzy razy", 4: "cztery razy" };

/** Kilkukrotny rzut monetą: ciągi orłów (O) i reszek (R). */
function monety(r) {
  for (;;) {
    const n = r.pick([2, 3, 3, 4, 4]);
    let omega = [[]];
    for (let i = 0; i < n; i++) omega = omega.flatMap((c) => [[...c, "O"], [...c, "R"]]);
    const k = r.int(0, n), orly = (c) => c.filter((x) => x === "O").length;
    const razy = (m) => (m === 0 ? "ani razu" : m === 1 ? "raz" : `$${m}$ razy`);
    const [opis, test] = r.pick([
      [k === 0 ? "orzeł nie wypadnie ani razu" : `orzeł wypadnie dokładnie ${razy(k)}`, (c) => orly(c) === k],
      [`orzeł wypadnie co najmniej ${razy(Math.max(k, 1))}`, (c) => orly(c) >= Math.max(k, 1)],
      ["orzeł wypadnie więcej razy niż reszka", (c) => 2 * orly(c) > n],
      ["w pierwszym i w ostatnim rzucie wypadnie to samo", (c) => c[0] === c[n - 1]],
      ["reszka nie wypadnie dwa razy z rzędu", (c) => !c.join("").includes("RR")],
    ]);
    const w = wypisz(omega, test, (c) => `(${c.join(", ")})`);
    if (!w || w.f === 0 || w.f === omega.length || q(w.f, omega.length).d > 12) continue;
    const tresc = `Rzucamy ${RAZY[n]} symetryczną monetą. ${POLECENIE_P} ${opis}.`;
    return zadanieP(tresc, w.f, omega.length, [
      `Wynik doświadczenia to ciąg $${n}$ symboli: $O$ – orzeł, $R$ – reszka, więc $|\\Omega| = ${Array(n).fill(2).join(" \\cdot ")} = ${omega.length}$.`,
      ...w.kroki,
    ]);
  }
}

/** Jeden rzut monetą i jeden rzut kostką: 12 zdarzeń elementarnych. */
function kostkaIMoneta(r) {
  for (;;) {
    const strona = r.pick(["O", "R"]), t = r.int(2, 5);
    const [opisK, testK] = r.pick([
      ["parzysta liczba oczek", (x) => x % 2 === 0], ["nieparzysta liczba oczek", (x) => x % 2 === 1],
      [`liczba oczek większa od $${t}$`, (x) => x > t], [`liczba oczek mniejsza od $${t}$`, (x) => x < t],
      ["liczba oczek podzielna przez $3$", (x) => x % 3 === 0], ["szóstka", (x) => x === 6],
    ]);
    const lub = r.chance(0.4);
    const omega = ["O", "R"].flatMap((m) => zakres(1, 6).map((x) => [m, x]));
    const test = ([m, x]) => (lub ? m === strona || testK(x) : m === strona && testK(x));
    const w = wypisz(omega, test, paraTex);
    if (!w || w.f === 0 || w.f === 12) continue;
    const tresc = `Rzucamy jeden raz symetryczną monetą i jeden raz ${KOSTKA}. ${POLECENIE_P} wypadnie ${strona === "O" ? "orzeł" : "reszka"} ${lub ? "lub" : "i jednocześnie"} ${opisK}.`;
    return zadanieP(tresc, w.f, 12, [
      "Zdarzeniami elementarnymi są pary (wynik rzutu monetą, liczba oczek), gdzie $O$ – orzeł, $R$ – reszka, więc $|\\Omega| = 2 \\cdot 6 = 12$.",
      ...w.kroki,
    ]);
  }
}

// --- 4. Losowanie

// Formy przymiotnika: [mianownik lp., biernik lp., dopełniacz lp., mianownik lm., dopełniacz lm.]
const KOLORY = [["biała", "białą", "białej", "białe", "białych"], ["czarna", "czarną", "czarnej", "czarne", "czarnych"],
  ["zielona", "zieloną", "zielonej", "zielone", "zielonych"], ["czerwona", "czerwoną", "czerwonej", "czerwone", "czerwonych"],
  ["niebieska", "niebieską", "niebieskiej", "niebieskie", "niebieskich"]];

/** "$5$ białych", "$3$ czarne", "jedna zielona". */
const ileKolor = (n, k) => (n === 1 ? `jedna ${k[0]}` : `$${n}$ ${odm(n, k[3], k[4])}`);

function losowanie(r) {
  const wariant = r.pick(["kule", "kule", "liczby", "liczby", "liczby", "jedna"]);
  if (wariant === "kule") return r.pick([kuleJedna, kuleOdwrotnie, kuleDwie, kuleDwie])(r);
  if (wariant === "liczby") return dwieLiczby(r);
  return jednaLiczba(r);
}

/** Urna z kulami kilku kolorów: opis i łączna liczba kul (od 5 do 20). */
function losujUrne(r, ileKolorow) {
  for (;;) {
    const kolory = r.shuffle(KOLORY).slice(0, ileKolorow);
    const ile = kolory.map(() => r.int(1, 9));
    const N = suma(ile);
    if (N < 5 || N > 20 || ile.every((x) => x === ile[0])) continue;
    const opis = `W urnie jest $${N}$ kul: ${iWyliczenie(ile.map((n, i) => ileKolor(n, kolory[i])))}.`;
    return { kolory, ile, N, opis };
  }
}

function kuleJedna(r) {
  for (;;) {
    const { kolory, ile, N, opis } = losujUrne(r, r.int(2, 3));
    const rodzaj = r.pick(["kolor", "nie", ...(kolory.length === 3 ? ["lub"] : [])]);
    const f = rodzaj === "kolor" ? ile[0] : rodzaj === "nie" ? N - ile[0] : ile[0] + ile[1];
    if (q(f, N).d > 12) continue;
    const jaka = rodzaj === "kolor" ? kolory[0][0] : rodzaj === "nie" ? `inna niż ${kolory[0][0]}` : `${kolory[0][0]} lub ${kolory[1][0]}`;
    return zadanieP(`${opis} Losujemy jedną kulę. ${POLECENIE_P} wylosowana kula będzie ${jaka}.`, f, N, [
      `$|\\Omega| = ${N}$ – tyle jest kul w urnie.`,
      rodzaj === "kolor" ? `Kul ${kolory[0][4]} jest $${f}$, więc $|A| = ${f}$.`
        : rodzaj === "nie" ? `Kul innych niż ${kolory[0][3]} jest $${N} - ${ile[0]} = ${f}$, więc $|A| = ${f}$.`
          : `Kul ${kolory[0][4]} i ${kolory[1][4]} jest razem $${ile[0]} + ${ile[1]} = ${f}$, więc $|A| = ${f}$.`,
    ]);
  }
}

/** Liczba kul z prawdopodobieństwa (CKE 2024, czerwiec). */
function kuleOdwrotnie(r) {
  for (;;) {
    const [k1, k2] = r.shuffle(KOLORY).slice(0, 2);
    const mian = r.int(3, 9), licz = r.int(1, mian - 1), t = r.int(2, 6);
    if (q(licz, mian).d !== mian) continue;
    const c = licz * t, N = mian * t, x = N - c;
    const tresc = `W pudełku są wyłącznie kule ${k1[3]} i ${k2[3]}. Kul ${k1[4]} jest $${c}$. Losujemy z pudełka jedną kulę. Prawdopodobieństwo wylosowania kuli ${k1[2]} jest równe $\\frac{${licz}}{${mian}}$. Ile kul ${k2[4]} jest w pudełku?`;
    return jednoPole("n", `Liczba kul ${k2[4]}`, x, `$${x}$`, tresc, [
      `Niech $x$ oznacza liczbę kul ${k2[4]}. Wszystkich kul jest $${c} + x$.`,
      `$\\frac{${c}}{${c} + x} = \\frac{${licz}}{${mian}}$, więc $${licz}(${c} + x) = ${mian * c}$, czyli $${c} + x = ${N}$.`,
      `Stąd $x = ${x}$.`,
    ]);
  }
}

/** Dwa losowania kul ze zwracaniem albo bez zwracania (pary uporządkowane). */
function kuleDwie(r) {
  for (;;) {
    const { kolory, ile, N, opis } = losujUrne(r, 2);
    if (N > 12) continue;
    const bez = r.chance(0.6);
    const [a, b] = ile, W = bez ? N * (N - 1) : N * N;
    const para = (x, y) => (bez ? `${x} \\cdot ${x - 1}` : `${x} \\cdot ${y}`);
    const rodzaj = r.pick(["obie", "obie", "rozne", "takie"]);
    let f, krok;
    if (rodzaj === "obie") {
      f = bez ? a * (a - 1) : a * a;
      krok = `Obie kule ${kolory[0][3]}: $|A| = ${bez ? `${a} \\cdot ${a - 1}` : `${a} \\cdot ${a}`} = ${f}$.`;
    } else if (rodzaj === "rozne") {
      f = 2 * a * b;
      krok = `Najpierw kula ${kolory[0][0]}, potem ${kolory[1][0]} – $${a} \\cdot ${b}$ możliwości, albo odwrotnie – $${b} \\cdot ${a}$ możliwości, więc $|A| = ${a * b} + ${a * b} = ${f}$.`;
    } else {
      const fa = bez ? a * (a - 1) : a * a, fb = bez ? b * (b - 1) : b * b;
      f = fa + fb;
      krok = `Obie ${kolory[0][3]}: $${para(a, a)} = ${fa}$ możliwości, obie ${kolory[1][3]}: $${para(b, b)} = ${fb}$ możliwości, więc $|A| = ${fa} + ${fb} = ${f}$.`;
    }
    if (f === 0 || f === W || q(f, W).d > 12) continue;
    const jak = bez ? "bez zwracania" : "ze zwracaniem (wylosowaną kulę wrzucamy z powrotem do urny)";
    const opisA = rodzaj === "obie" ? `obie wylosowane kule będą ${kolory[0][3]}`
      : rodzaj === "rozne" ? "wylosowane kule będą różnych kolorów" : "obie wylosowane kule będą tego samego koloru";
    return zadanieP(`${opis} Losujemy kolejno dwa razy po jednej kuli ${jak}. ${POLECENIE_P} ${opisA}.`, f, W, [
      bez ? `Zdarzeniami elementarnymi są pary różnych kul (pierwsza, druga), więc $|\\Omega| = ${N} \\cdot ${N - 1} = ${W}$.`
        : `Zdarzeniami elementarnymi są pary kul (pierwsza, druga), więc $|\\Omega| = ${N} \\cdot ${N} = ${W}$.`,
      krok,
    ]);
  }
}

/** Dwie liczby: ze zbioru ze zwracaniem lub bez albo po jednej z dwóch zbiorów (CKE 2023–2026). */
function dwieLiczby(r) {
  for (;;) {
    const tryb = r.pick(["zw", "bez", "bez", "zbiory"]);
    let A, B, wstep, krokOmega;
    if (tryb === "zbiory") {
      A = losZbior(r, r.int(3, 6), 1, 9);
      B = losZbior(r, r.int(3, 5), 1, 12);
      wstep = `Dane są zbiory $C = ${zbiorTex(A)}$ oraz $D = ${zbiorTex(B)}$. Losujemy jedną liczbę ze zbioru $C$, a następnie jedną liczbę ze zbioru $D$.`;
      krokOmega = `Zdarzeniami elementarnymi są pary (liczba ze zbioru $C$, liczba ze zbioru $D$), więc $|\\Omega| = ${A.length} \\cdot ${B.length} = ${A.length * B.length}$.`;
    } else {
      A = B = r.chance(0.5) ? zakres(1, r.int(4, 9)) : losZbior(r, r.int(4, 6), 1, 15);
      const n = A.length;
      wstep = `Ze zbioru $${zbiorTex(A)}$ losujemy kolejno dwa razy po jednej liczbie ${tryb === "zw" ? "ze zwracaniem" : "bez zwracania"}.`;
      krokOmega = tryb === "zw"
        ? `Zdarzeniami elementarnymi są pary (pierwsza liczba, druga liczba), więc $|\\Omega| = ${n} \\cdot ${n} = ${n * n}$.`
        : `Zdarzeniami elementarnymi są pary różnych liczb (pierwsza liczba, druga liczba), więc $|\\Omega| = ${n} \\cdot ${n - 1} = ${n * (n - 1)}$.`;
    }
    const omega = A.flatMap((a) => B.filter((b) => tryb !== "bez" || a !== b).map((b) => [a, b]));
    const pierwsza = tryb === "zbiory" ? "liczba wylosowana ze zbioru $C$" : "liczba wylosowana za pierwszym razem";
    const drugiej = tryb === "zbiory" ? "liczby wylosowanej ze zbioru $D$" : "liczby wylosowanej za drugim razem";
    const k = r.pick([3, 4, 5]), m = r.pick([3, 4, 6, 10]);
    const sumy = omega.map(([a, b]) => a + b).sort((x, y) => x - y);
    const s = sumy[Math.floor(sumy.length / 2)] + r.int(-2, 2);
    const [opis, test] = r.pick([
      ["suma wylosowanych liczb będzie parzysta", ([a, b]) => (a + b) % 2 === 0],
      ["suma wylosowanych liczb będzie nieparzysta", ([a, b]) => (a + b) % 2 === 1],
      ["iloczyn wylosowanych liczb będzie parzysty", ([a, b]) => (a * b) % 2 === 0],
      ["iloczyn wylosowanych liczb będzie nieparzysty", ([a, b]) => (a * b) % 2 === 1],
      [`suma wylosowanych liczb będzie podzielna przez $${k}$`, ([a, b]) => (a + b) % k === 0],
      [`iloczyn wylosowanych liczb będzie podzielny przez $${m}$`, ([a, b]) => (a * b) % m === 0],
      ["obie wylosowane liczby będą parzyste", ([a, b]) => a % 2 === 0 && b % 2 === 0],
      ["obie wylosowane liczby będą nieparzyste", ([a, b]) => a % 2 === 1 && b % 2 === 1],
      [`${pierwsza} będzie większa od ${drugiej}`, ([a, b]) => a > b],
      [`suma wylosowanych liczb będzie większa od $${s}$`, ([a, b]) => a + b > s],
      [`${pierwsza} będzie dzielnikiem ${drugiej}`, ([a, b]) => b % a === 0],
    ]);
    const w = wypisz(omega, test, paraTex);
    if (!w || w.f === 0 || w.f === omega.length || q(w.f, omega.length).d > 12) continue;
    return zadanieP(`${wstep} ${POLECENIE_P} ${opis}.`, w.f, omega.length, [krokOmega, ...w.kroki]);
  }
}

const PIERWSZE = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];

/** Jedna liczba ze zbioru {1, …, n} albo spośród liczb dwucyfrowych (CKE 2026, marzec). */
function jednaLiczba(r) {
  for (;;) {
    const dwucyfrowe = r.chance(0.35);
    const od = dwucyfrowe ? 10 : 1, doo = dwucyfrowe ? 99 : r.int(10, 60);
    const k = r.int(2, 9);
    const rodzaj = r.pick(["podz", "podz", "niepodz", "pierwsza", "kwadrat"]);
    if (rodzaj === "pierwsza" && doo > 40) continue;
    const testy = {
      podz: [`wylosowana liczba będzie podzielna przez $${k}$`, (x) => x % k === 0],
      niepodz: [`wylosowana liczba nie będzie podzielna przez $${k}$`, (x) => x % k !== 0],
      pierwsza: ["wylosowana liczba będzie liczbą pierwszą", (x) => PIERWSZE.includes(x)],
      kwadrat: ["wylosowana liczba będzie kwadratem liczby naturalnej", (x) => Number.isInteger(Math.sqrt(x))],
    };
    const [opis, test] = testy[rodzaj];
    const liczby = zakres(od, doo), tak = liczby.filter(test), W = liczby.length, f = tak.length;
    if (f === 0 || f === W || q(f, W).d > 12) continue;
    const wstep = dwucyfrowe ? "Ze zbioru wszystkich liczb naturalnych dwucyfrowych losujemy jedną liczbę."
      : `Ze zbioru $\\{1, 2, 3, \\ldots, ${doo}\\}$ losujemy jedną liczbę.`;
    const kroki = [dwucyfrowe ? "Liczb dwucyfrowych jest $90$, więc $|\\Omega| = 90$." : `$|\\Omega| = ${W}$.`];
    if (rodzaj === "podz" || rodzaj === "niepodz") {
      const wiel = liczby.filter((x) => x % k === 0), a = wiel[0] / k, b = wiel[wiel.length - 1] / k;
      kroki.push(wiel.length <= 4
        ? `Liczby podzielne przez $${k}$: ${wyliczTex(wiel)} – jest ich $${wiel.length}$.`
        : `Liczby podzielne przez $${k}$ to $${k} \\cdot ${a}, ${k} \\cdot ${a + 1}, \\ldots, ${k} \\cdot ${b}$, czyli $${wiel[0]}, ${wiel[1]}, \\ldots, ${wiel[wiel.length - 1]}$ – jest ich $${b} - ${a} + 1 = ${wiel.length}$.`);
      kroki.push(rodzaj === "podz" ? `$|A| = ${f}$.` : `Liczb niepodzielnych przez $${k}$ jest $${W} - ${wiel.length} = ${f}$, więc $|A| = ${f}$.`);
    } else {
      kroki.push(`Zdarzeniu $A$ sprzyjają liczby: ${wyliczTex(tak)}, czyli $|A| = ${f}$.`);
    }
    return zadanieP(`${wstep} ${POLECENIE_P} ${opis}.`, f, W, kroki);
  }
}

// --- 5. Średnia arytmetyczna

/** Tabela liczebności w KaTeX: wiersz wartości i wiersz liczebności. */
const tabelaTex = (n1, w, n2, c) =>
  `\\begin{array}{|c|${"c|".repeat(w.length)}}\\hline \\text{${n1}} & ${w.join(" & ")} \\\\ \\hline \\text{${n2}} & ${c.join(" & ")} \\\\ \\hline \\end{array}`;

/** Krok ze średnią: x̄ = (3 + 5 + …) / n = S / n = … */
function krokSredniej(t) {
  const S = suma(t), n = t.length;
  return `$\\overline{x} = \\frac{${sumaTex(t)}}{${n}} = \\frac{${S}}{${n}} = ${dz(q(S, n))}$.`;
}

const TABELE = [
  { w: zakres(1, 6), n1: "Ocena", n2: "Liczba uczniów",
    wstep: "W tabeli przedstawiono oceny ze sprawdzianu z matematyki uzyskane przez uczniów pewnej klasy.",
    srednia: "Oblicz średnią arytmetyczną ocen uzyskanych z tego sprawdzianu przez uczniów tej klasy.", co: "ocen" },
  { w: zakres(0, 5), n1: "Liczba punktów", n2: "Liczba uczniów",
    wstep: "W tabeli zestawiono liczby punktów uzyskanych przez uczniów pewnej klasy za rozwiązanie jednego z zadań testu.",
    srednia: "Oblicz średnią arytmetyczną liczby punktów uzyskanych za to zadanie przez uczniów tej klasy.", co: "liczby punktów" },
  { w: zakres(0, 4), n1: "Liczba dzieci", n2: "Liczba rodzin",
    wstep: "W tabeli przedstawiono wyniki ankiety, w której rodziny mieszkające w pewnym bloku zapytano o liczbę dzieci.",
    srednia: "Oblicz średnią liczbę dzieci w jednej rodzinie.", co: "liczby dzieci w rodzinie" },
];

function srednia(r) {
  const wariant = r.pick(["lista", "lista", "brakujaca", "brakujaca", "tabela", "zmiana", "zmiana"]);
  if (wariant === "lista") return sredniaListy(r);
  if (wariant === "brakujaca") return sredniaBrakujaca(r);
  if (wariant === "tabela") return sredniaTabeli(r);
  return zmianaSredniej(r);
}

function sredniaListy(r) {
  for (;;) {
    const kontekst = r.pick(["liczby", "oceny", "temperatury", "punkty"]);
    const n = kontekst === "temperatury" ? 7 : r.int(5, 8);
    const los = { liczby: () => r.int(1, 30), oceny: () => r.int(1, 6), temperatury: () => r.int(-6, 9), punkty: () => r.int(0, 40) }[kontekst];
    const t = Array.from({ length: n }, los);
    const m = q(suma(t), n);
    if (!dziesietna(m, 2)) continue;
    const L = listaTex(t);
    const tresc = {
      liczby: `Oblicz średnią arytmetyczną liczb: $${L}$.`,
      oceny: `Uczeń otrzymał w pierwszym semestrze z fizyki następujące oceny: $${L}$. Oblicz średnią arytmetyczną tych ocen.`,
      temperatury: `Przez tydzień codziennie o siódmej rano mierzono temperaturę powietrza. Otrzymano następujące wyniki (w stopniach Celsjusza): $${L}$. Oblicz średnią temperaturę z tych pomiarów.`,
      punkty: `Uczestnicy szkolnego konkursu matematycznego uzyskali następujące liczby punktów: $${L}$. Oblicz średnią arytmetyczną liczby punktów uzyskanych przez uczestników konkursu.`,
    }[kontekst];
    return jednoPole("s", "$\\overline{x} =$", m, `$\\overline{x} = ${dz(m)}$`, tresc, [
      "Średnia arytmetyczna to suma wszystkich danych podzielona przez ich liczbę.",
      krokSredniej(t),
    ]);
  }
}

/** Brakująca liczba przy danej średniej (x, 2x albo x + c w zestawie). */
function sredniaBrakujaca(r) {
  for (;;) {
    const n = r.int(4, 7), x = r.int(1, 20), c = r.int(1, 5);
    const [wsp, wyraz, wyrTex] = r.pick([[1, 0, "x"], [1, 0, "x"], [2, 0, "2x"], [1, c, `x + ${c}`]]);
    const inne = Array.from({ length: n - 1 }, () => r.int(1, 20));
    const poz = r.int(0, n - 1);
    const teksty = inne.map(String);
    teksty.splice(poz, 0, wyrTex);
    const S0 = suma(inne), m = q(S0 + wsp * x + wyraz, n);
    if (!dziesietna(m, 1)) continue;
    const nm = m.mul(n).n;
    const L = listaTex(teksty);
    const tresc = r.pick([
      `Średnia arytmetyczna liczb: $${L}$ jest równa $${dz(m)}$. Oblicz $x$.`,
      `Liczby $${L}$ mają średnią arytmetyczną równą $${dz(m)}$. Oblicz $x$.`,
    ]);
    const kroki = [
      `$\\frac{${teksty.join(" + ")}}{${n}} = ${dz(m)}$, więc suma tych liczb jest równa $${n} \\cdot ${dz(m)} = ${nm}$.`,
      `$${wielomianTex([wsp, S0 + wyraz])} = ${nm}$, ${wsp === 1 ? `stąd $x = ${x}$` : `czyli $2x = ${2 * x}$, stąd $x = ${x}$`}.`,
    ];
    return jednoPole("x", "$x =$", x, `$x = ${x}$`, tresc, kroki);
  }
}

function sredniaTabeli(r) {
  for (;;) {
    const T = r.pick(TABELE);
    const c = T.w.map(() => r.int(0, 9));
    const N = suma(c);
    if (N < 10 || N > 30 || c.filter((x) => x > 0).length < 3) continue;
    const S = suma(T.w.map((v, i) => v * c[i])), m = q(S, N);
    if (!dziesietna(m, 2)) continue;
    const tresc = `${T.wstep}\n\n$${tabelaTex(T.n1, T.w, T.n2, c)}$\n\n${T.srednia}`;
    return jednoPole("s", "$\\overline{x} =$", m, `$\\overline{x} = ${dz(m)}$`, tresc, [
      `Liczba wszystkich danych: $${c.join(" + ")} = ${N}$.`,
      `Każdą wartość mnożymy przez liczbę jej wystąpień: $\\overline{x} = \\frac{${T.w.map((v, i) => `${v} \\cdot ${c[i]}`).join(" + ")}}{${N}} = \\frac{${S}}{${N}} = ${dz(m)}$.`,
    ]);
  }
}

/** Dopisanie lub skreślenie liczby, średnia dwóch grup (CKE 2026, maj i czerwiec). */
function zmianaSredniej(r) {
  for (;;) {
    const rodzaj = r.pick(["dopisanie", "jaka", "skreslenie", "grupy", "szkoly"]);
    const n = r.int(4, 12), m = q(r.int(8, 40), 2);
    const S = m.mul(n);
    if (!S.calkowita) continue;
    if (rodzaj === "dopisanie") {
      const x = r.int(0, 40), m2 = S.add(x).div(n + 1);
      if (!dziesietna(m2, 2) || m2.eq(m)) continue;
      return jednoPole("s", "Nowa średnia", m2, `$${dz(m2)}$`,
        `Średnia arytmetyczna $${n}$ liczb jest równa $${dz(m)}$. Do tych liczb dopisano liczbę $${x}$. Oblicz średnią arytmetyczną otrzymanych $${n + 1}$ liczb.`, [
          `Suma $${n}$ liczb jest równa $${n} \\cdot ${dz(m)} = ${S.n}$.`,
          `Po dopisaniu liczby $${x}$ suma jest równa $${S.n} + ${x} = ${S.n + x}$, a liczb jest $${n + 1}$.`,
          `Nowa średnia: $\\frac{${S.n + x}}{${n + 1}} = ${dz(m2)}$.`,
        ]);
    }
    if (rodzaj === "jaka" || rodzaj === "skreslenie") {
      const dopis = rodzaj === "jaka";
      const m2 = m.add(q(r.intBez(-4, 4, 0), 2));
      const S2 = m2.mul(dopis ? n + 1 : n - 1);
      if (!S2.calkowita || m2.n <= 0) continue;
      const x = dopis ? S2.n - S.n : S.n - S2.n;
      if (x < 0) continue;
      const tresc = dopis
        ? `Średnia arytmetyczna $${n}$ liczb jest równa $${dz(m)}$. Jaką liczbę należy dopisać do tych liczb, aby średnia arytmetyczna wszystkich $${n + 1}$ liczb była równa $${dz(m2)}$?`
        : `Średnia arytmetyczna $${n}$ liczb jest równa $${dz(m)}$. Po skreśleniu jednej z tych liczb średnia arytmetyczna pozostałych liczb jest równa $${dz(m2)}$. Jaką liczbę skreślono?`;
      return jednoPole("x", "Szukana liczba", x, `$${x}$`, tresc, [
        `Suma $${n}$ liczb jest równa $${n} \\cdot ${dz(m)} = ${S.n}$.`,
        `Suma ${dopis ? `$${n + 1}$ liczb po dopisaniu` : `pozostałych $${n - 1}$ liczb`} ma być równa $${dopis ? n + 1 : n - 1} \\cdot ${dz(m2)} = ${S2.n}$.`,
        dopis ? `Dopisana liczba: $${S2.n} - ${S.n} = ${x}$.` : `Skreślona liczba: $${S.n} - ${S2.n} = ${x}$.`,
      ]);
    }
    if (rodzaj === "grupy") {
      const a = r.int(5, 16), b = r.int(5, 16);
      const m1 = q(r.int(20, 80), 2), m2 = q(r.int(20, 80), 2);
      const sr = m1.mul(a).add(m2.mul(b)).div(a + b);
      if (m1.eq(m2) || !dziesietna(sr, 2) || !m1.mul(a).calkowita || !m2.mul(b).calkowita) continue;
      const S1 = m1.mul(a).n, S2 = m2.mul(b).n;
      return jednoPole("s", "Średnia w klasie", sr, `$${dz(sr)}$`,
        `W klasie jest $${a}$ dziewcząt i $${b}$ chłopców. Średnia arytmetyczna liczby punktów uzyskanych na teście przez dziewczęta jest równa $${dz(m1)}$, a przez chłopców – $${dz(m2)}$. Oblicz średnią arytmetyczną liczby punktów uzyskanych na tym teście przez wszystkich uczniów tej klasy.`, [
          `Suma punktów dziewcząt: $${a} \\cdot ${dz(m1)} = ${S1}$, suma punktów chłopców: $${b} \\cdot ${dz(m2)} = ${S2}$.`,
          `Średnia całej klasy: $\\frac{${S1} + ${S2}}{${a} + ${b}} = \\frac{${S1 + S2}}{${a + b}} = ${dz(sr)}$.`,
        ]);
    }
    const k = r.int(2, 4), w1 = r.int(7, 18), w2 = r.intBez(7, 18, w1);
    const sr = q(k * w1 + w2, k + 1);
    if (!dziesietna(sr, 2)) continue;
    return jednoPole("s", "Średni wiek", sr, `$${dz(sr)}$`,
      `W pewnej miejscowości są dwie szkoły. W pierwszej z nich jest $${k}$ razy więcej uczniów niż w drugiej. Średni wiek uczniów pierwszej szkoły to $${w1}$ lat, a drugiej – $${w2}$ lat. Oblicz średni wiek wszystkich uczniów obu szkół (w latach).`, [
        `Jeśli w drugiej szkole jest $u$ uczniów, to w pierwszej jest ich $${k}u$, a razem $${k + 1}u$.`,
        `Suma lat wszystkich uczniów: $${k}u \\cdot ${w1} + u \\cdot ${w2} = ${k * w1 + w2}u$.`,
        `Średni wiek: $\\frac{${k * w1 + w2}u}{${k + 1}u} = ${dz(sr)}$.`,
      ]);
  }
}

// --- 6. Mediana i dominanta

/** Liczebnik porządkowy w dopełniaczu: „piątej”, „drugiej”, „trzeciej”. */
const porzD = (k) => PORZ[k].replace(/ia$/, "iej").replace(/ga$/, "giej").replace(/([^i])a$/, "$1ej");

const medianaZ = (pos) => {
  const n = pos.length, k = Math.floor(n / 2);
  return n % 2 ? q(pos[k]) : q(pos[k - 1] + pos[k], 2);
};

/** Wartość występująca najczęściej, gdy jest jedna: { v, ile } albo null. */
function dominanta(t) {
  const ile = new Map();
  for (const x of t) ile.set(x, (ile.get(x) ?? 0) + 1);
  const max = Math.max(...ile.values()), naj = [...ile].filter(([, c]) => c === max);
  return naj.length === 1 && max >= 2 ? { v: naj[0][0], ile: max } : null;
}

function krokMediany(pos) {
  const n = pos.length, k = Math.floor(n / 2), M = medianaZ(pos);
  if (n % 2) return `Danych jest $${n}$ (liczba nieparzysta), więc mediana to wartość środkowa, czyli ${PORZ[k + 1]} liczba: $${pos[k]}$.`;
  return `Danych jest $${n}$ (liczba parzysta), więc mediana to średnia arytmetyczna ${porzD(k)} i ${porzD(k + 1)} liczby: $\\frac{${pos[k - 1]} + ${pos[k]}}{2} = ${dz(M)}$.`;
}

function mediana(r) {
  const wariant = r.pick(["lista", "lista", "tabela", "brakujaca"]);
  if (wariant === "lista") return medianaListy(r);
  if (wariant === "tabela") return medianaTabeli(r);
  return medianaBrakujaca(r);
}

function medianaListy(r) {
  for (;;) {
    const kontekst = r.pick(["liczby", "gole", "oceny"]);
    const n = r.int(5, 10);
    const los = { liczby: () => r.int(1, 25), gole: () => r.int(0, 5), oceny: () => r.int(1, 6) }[kontekst];
    const t = Array.from({ length: n }, los);
    const pos = [...t].sort((a, b) => a - b);
    if (t.every((x, i) => x === pos[i])) continue;
    const dom = dominanta(t);
    const zDom = dom !== null && r.chance(0.6);
    const i = zDom ? " i dominantę" : "";
    const L = listaTex(t);
    const tresc = {
      liczby: `Dany jest zestaw danych: $${L}$. Oblicz medianę${i} tego zestawu danych.`,
      gole: `W kolejnych meczach sezonu drużyna piłkarska strzeliła następujące liczby goli: $${L}$. Oblicz medianę${i} liczby goli strzelonych przez tę drużynę w jednym meczu.`,
      oceny: `Ania otrzymała w tym semestrze z biologii następujące oceny: $${L}$. Oblicz medianę${i} tych ocen.`,
    }[kontekst];
    const M = medianaZ(pos);
    const kroki = [`Porządkujemy dane niemalejąco: $${listaTex(pos)}$.`, krokMediany(pos)];
    if (!zDom) return jednoPole("me", "Mediana", M, `Mediana: $${dz(M)}$`, tresc, kroki);
    kroki.push(`Najczęściej – $${dom.ile}$ razy – występuje wartość $${dom.v}$, więc dominanta jest równa $${dom.v}$.`);
    return wielePol([["me", "Mediana", M], ["d", "Dominanta", dom.v]], `Mediana: $${dz(M)}$, dominanta: $${dom.v}$`, tresc, kroki);
  }
}

/** Mediana i dominanta z tabeli liczebności (CKE 2024, maj; 2025, maj). */
function medianaTabeli(r) {
  for (;;) {
    const T = r.pick([TABELE[0], TABELE[0], TABELE[2]]);
    const c = T.w.map(() => r.int(0, 9));
    const N = suma(c);
    if (N < 10 || N > 30 || c.filter((x) => x > 0).length < 3) continue;
    const pos = T.w.flatMap((v, i) => Array(c[i]).fill(v));
    const dom = dominanta(pos);
    if (!dom) continue;
    const M = medianaZ(pos), k = Math.floor(N / 2);
    const miejsca = [];
    let start = 1;
    T.w.forEach((v, i) => {
      if (!c[i]) return;
      const end = start + c[i] - 1;
      miejsca.push(`$${v}$ – ${start === end ? `miejsce $${start}$` : `miejsca od $${start}$ do $${end}$`}`);
      start = end + 1;
    });
    const tresc = `${T.wstep}\n\n$${tabelaTex(T.n1, T.w, T.n2, c)}$\n\nOblicz medianę i dominantę ${T.co}.`;
    return wielePol([["me", "Mediana", M], ["d", "Dominanta", dom.v]], `Mediana: $${dz(M)}$, dominanta: $${dom.v}$`, tresc, [
      `Wszystkich danych jest $${c.join(" + ")} = ${N}$.`,
      N % 2 ? `Po uporządkowaniu danych niemalejąco mediana jest wartością stojącą na miejscu $${k + 1}$.`
        : `Po uporządkowaniu danych niemalejąco mediana jest średnią arytmetyczną wartości stojących na miejscach $${k}$ i $${k + 1}$.`,
      `W uporządkowanym zestawie danych: ${miejsca.join("; ")}.`,
      N % 2 ? `Mediana jest równa $${pos[k]}$.` : `Mediana: $\\frac{${pos[k - 1]} + ${pos[k]}}{2} = ${dz(M)}$.`,
      `Dominanta to wartość występująca najczęściej (tu $${dom.ile}$ razy): $${dom.v}$.`,
    ]);
  }
}

/** Brakująca liczba w uporządkowanym zestawie o danej medianie. */
function medianaBrakujaca(r) {
  for (;;) {
    const n = r.pick([4, 6, 6, 8]), k = n / 2;
    const t = Array.from({ length: n }, () => r.int(1, 20)).sort((a, b) => a - b);
    if (t[0] === t[n - 1]) continue;
    const poz = r.pick([k - 1, k]), inny = poz === k - 1 ? t[k] : t[k - 1], x = t[poz];
    const M = q(x + inny, 2);
    const teksty = t.map(String);
    teksty[poz] = "x";
    const L = listaTex(teksty);
    const tresc = r.pick([
      `Liczby $${L}$ są uporządkowane niemalejąco. Mediana tych liczb jest równa $${dz(M)}$. Oblicz $x$.`,
      `Mediana uporządkowanego niemalejąco zestawu danych: $${L}$ jest równa $${dz(M)}$. Oblicz $x$.`,
    ]);
    const licznik = poz === k - 1 ? `x + ${inny}` : `${inny} + x`;
    return jednoPole("x", "$x =$", x, `$x = ${x}$`, tresc, [
      `Danych jest $${n}$, więc mediana to średnia arytmetyczna ${porzD(k)} i ${porzD(k + 1)} liczby: $\\frac{${licznik}}{2} = ${dz(M)}$.`,
      `$${licznik} = ${x + inny}$, więc $x = ${x}$.`,
    ]);
  }
}

// --- 7. Odchylenie standardowe

/** Pierwiastek z ułamka, gdy jest wymierny: 9/4 -> 3/2, 2 -> null. */
function pierwiastekQ(v) {
  const a = Math.round(Math.sqrt(v.n)), b = Math.round(Math.sqrt(v.d));
  return a * a === v.n && b * b === v.d ? q(a, b) : null;
}

/** Zestaw n liczb o średniej całkowitej i wymiernym odchyleniu standardowym (całkowitym albo „połówkowym”). */
function losujDane(r, n, calkowite = false) {
  for (;;) {
    const m = r.int(6, 15);
    const d = Array.from({ length: n - 1 }, () => r.int(-5, 5));
    d.push(-suma(d));
    if (Math.abs(d[n - 1]) > 6 || d.every((x) => x === 0)) continue;
    const war = q(suma(d.map((x) => x * x)), n), sigma = pierwiastekQ(war);
    if (!sigma || sigma.d > 2 || (calkowite && sigma.d !== 1)) continue;
    return { t: r.shuffle(d.map((x) => m + x)), m, war, sigma };
  }
}

/** Kroki z wariancją i odchyleniem standardowym zestawu t o średniej m. */
function krokiOdchylenia(t, m, war, sigma) {
  const kw = t.map((x) => (x - m) ** 2);
  return [
    `Różnice $x_i - \\overline{x}$: ${wyliczTex(t.map((x) => x - m))}; ich kwadraty: ${wyliczTex(kw)}.`,
    `$\\sigma^2 = \\frac{${kw.join(" + ")}}{${t.length}} = \\frac{${suma(kw)}}{${t.length}} = ${dz(war)}$.`,
    `$\\sigma = \\sqrt{${dz(war)}} = ${dz(sigma)}$.`,
  ];
}

function odchylenie(r) {
  const wariant = r.pick(["lista", "lista", "tabela", "brakujaca", "przedzial"]);
  if (wariant === "lista") return odchylenieListy(r);
  if (wariant === "tabela") return odchylenieTabeli(r);
  if (wariant === "brakujaca") return odchylenieBrakujaca(r);
  return odchyleniePrzedzial(r);
}

function odchylenieListy(r) {
  const n = r.pick([4, 5, 6, 8]);
  const { t, m, war, sigma } = losujDane(r, n);
  const L = listaTex(t);
  const tresc = r.pick([
    `Oblicz wariancję i odchylenie standardowe zestawu danych: $${L}$.`,
    `Pewien uczeń przez $${n}$ dni zapisywał, ile minut trwała jego droga do szkoły. Otrzymał wyniki: $${L}$. Oblicz wariancję i odchylenie standardowe czasu drogi do szkoły.`,
  ]);
  return wielePol([["w", "$\\sigma^2 =$", war], ["s", "$\\sigma =$", sigma]], `$\\sigma^2 = ${dz(war)}$, $\\sigma = ${dz(sigma)}$`, tresc,
    [krokSredniej(t), ...krokiOdchylenia(t, m, war, sigma)]);
}

function odchylenieTabeli(r) {
  for (;;) {
    const m = r.int(3, 8);
    const w = losZbior(r, r.pick([3, 3, 4]), Math.max(0, m - 4), m + 4);
    const c = w.map(() => r.int(1, 6));
    const N = suma(c), S = suma(w.map((v, i) => v * c[i]));
    if (N < 6 || N > 30 || S % N !== 0) continue;
    const sr = S / N;
    const sumaKw = suma(w.map((v, i) => c[i] * (v - sr) ** 2));
    const war = q(sumaKw, N), sigma = pierwiastekQ(war);
    if (!sigma || sigma.zero || sigma.d > 2) continue;
    const tresc = `W tabeli zestawiono liczby punktów uzyskanych przez uczniów pewnej grupy za kartkówkę.\n\n$${tabelaTex("Liczba punktów", w, "Liczba uczniów", c)}$\n\nOblicz średnią arytmetyczną i odchylenie standardowe liczby punktów uzyskanych przez uczniów tej grupy.`;
    return wielePol([["sr", "$\\overline{x} =$", sr], ["s", "$\\sigma =$", sigma]], `$\\overline{x} = ${sr}$, $\\sigma = ${dz(sigma)}$`, tresc, [
      `$\\overline{x} = \\frac{${w.map((v, i) => `${v} \\cdot ${c[i]}`).join(" + ")}}{${N}} = \\frac{${S}}{${N}} = ${sr}$.`,
      `$\\sigma^2 = \\frac{${w.map((v, i) => `${c[i]} \\cdot (${v} - ${sr})^2`).join(" + ")}}{${N}} = \\frac{${sumaKw}}{${N}} = ${dz(war)}$.`,
      `$\\sigma = \\sqrt{${dz(war)}} = ${dz(sigma)}$.`,
    ]);
  }
}

function odchylenieBrakujaca(r) {
  const n = r.int(4, 6);
  const { t, m, war, sigma } = losujDane(r, n);
  const poz = r.int(0, n - 1), x = t[poz], inne = t.filter((_, i) => i !== poz);
  const teksty = t.map(String);
  teksty[poz] = "x";
  const tresc = `Średnia arytmetyczna zestawu danych: $${listaTex(teksty)}$ jest równa $${m}$. Oblicz $x$ oraz odchylenie standardowe tego zestawu danych.`;
  return wielePol([["x", "$x =$", x], ["s", "$\\sigma =$", sigma]], `$x = ${x}$, $\\sigma = ${dz(sigma)}$`, tresc, [
    `$\\frac{${teksty.join(" + ")}}{${n}} = ${m}$, więc $${suma(inne)} + x = ${n * m}$ i $x = ${x}$.`,
    ...krokiOdchylenia(t, m, war, sigma),
  ]);
}

/** Ile danych mieści się w przedziale [x̄ - σ, x̄ + σ] (CKE 2022, grudzień). */
function odchyleniePrzedzial(r) {
  for (;;) {
    const n = r.int(5, 8);
    const { t, m, sigma } = losujDane(r, n, true);
    const s = sigma.n, w = t.filter((x) => Math.abs(x - m) <= s);
    if (w.length === n) continue;
    const tresc = `Odchylenie standardowe zestawu danych: $${listaTex(t)}$ jest równe $${s}$. Ile liczb z tego zestawu należy do przedziału $[\\overline{x} - \\sigma, \\overline{x} + \\sigma]$, gdzie $\\overline{x}$ to średnia arytmetyczna, a $\\sigma$ – odchylenie standardowe tego zestawu?`;
    const ile = w.length === 1 ? "liczba" : odm(w.length, "liczby", "liczb");
    return wielePol([["sr", "$\\overline{x} =$", m], ["n", "Liczba danych w przedziale", w.length]],
      `$\\overline{x} = ${m}$; w przedziale $[${m - s}, ${m + s}]$ ${w.length === 1 ? "jest" : odm(w.length, "są", "jest")} $${w.length}$ ${ile}`, tresc, [
        krokSredniej(t),
        `Przedział: $[${m} - ${s}, ${m} + ${s}] = [${m - s}, ${m + s}]$.`,
        `Należą do niego: ${wyliczTex(w)} – razem $${w.length}$ ${ile}.`,
      ]);
  }
}

// --- Lista generatorów

export const GENERATORY = [
  { id: "regula-mnozenia", nazwa: "Reguła mnożenia", opis: "Liczby o cyfrach spełniających warunki, kody, zestawy i trasy.", generuj: regulaMnozenia },
  { id: "ustawienia", nazwa: "Ustawienia i wybory", opis: "Ustawienia w kolejce, wybór z kolejnością, pary bez kolejności: powitania, mecze, przekątne.", generuj: ustawienia },
  { id: "kostki-monety", nazwa: "Kostki i monety", opis: "Prawdopodobieństwo przy rzutach kostką i monetą.", generuj: kostkiMonety },
  { id: "losowanie", nazwa: "Losowanie", opis: "Losowanie kul i liczb – raz albo dwa razy, ze zwracaniem i bez zwracania.", generuj: losowanie },
  { id: "srednia", nazwa: "Średnia arytmetyczna", opis: "Średnia z listy i z tabeli, brakująca liczba, zmiana średniej, średnia dwóch grup.", generuj: srednia },
  { id: "mediana", nazwa: "Mediana i dominanta", opis: "Mediana i dominanta z listy i z tabeli, brakująca liczba przy danej medianie.", generuj: mediana },
  { id: "odchylenie", nazwa: "Odchylenie standardowe", opis: "Wariancja i odchylenie standardowe małych zestawów danych.", generuj: odchylenie },
];
