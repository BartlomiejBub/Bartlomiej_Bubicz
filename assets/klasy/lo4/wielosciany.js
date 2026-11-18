// Klasa 4 (liceum i technikum) · rozdział 3 „Geometria przestrzenna – wielościany” – Matematyka 4, zakres podstawowy (Pazdro).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
// Bez rysunków: każdą bryłę opisano słowami. Bez przekrojów płaszczyzną – zgodnie z podstawą programową 2024.
import { Q, q } from "../../generatory/wspolne.js";

// --- Pomocnicze (tylko dla tego pliku)

const pole = (id, etykieta) => ({ id, typ: "liczba", etykieta });

const CM2 = "cm$^2$";
const CM3 = "cm$^3$";

/** Liczba k·√s: k wymierne, s liczba naturalna (po normalizacji bez kwadratów). */
function rad(k, s = 1) {
  let t = 1;
  for (let d = 2; d * d <= s; d++) {
    while (s % (d * d) === 0) {
      s /= d * d;
      t *= d;
    }
  }
  return { k: Q.z(k).mul(t), s };
}

/** Zapis LaTeX liczby k·√s: 6\sqrt{3}, \sqrt{2}, \frac{2\sqrt{3}}{3}, 5. */
function radTex(x) {
  if (x.s === 1) return x.k.tex();
  const sym = `\\sqrt{${x.s}}`;
  if (x.k.calkowita) return x.k.n === 1 ? sym : `${x.k.n}${sym}`;
  return x.k.n === 1 ? `\\frac{${sym}}{${x.k.d}}` : `\\frac{${x.k.n}${sym}}{${x.k.d}}`;
}

/** Pole odpowiedzi, dopisek do treści i wynik dla wartości k·√s (lit – oznaczenie szukanej wielkości, jedn – jednostka z $…$ albo ""). */
function odp(x, lit, jedn = "") {
  const koniec = jedn ? ` ${jedn}` : "";
  if (x.s === 1) return { pola: [pole("w", `$${lit} =$`)], dopisek: "", wynik: `$${lit} = ${x.k.tex()}$${koniec}` };
  const sym = `\\sqrt{${x.s}}`;
  return {
    pola: [pole("w", `$${lit} = k${sym}$, gdzie $k =$`)],
    dopisek: ` Wynik zapisz w postaci $k${sym}$.`,
    wynik: `$${lit} = ${radTex(x)}$${koniec}`,
  };
}

/** Odmiana rzeczownika po liczebniku: lm(5, "bok", "boki", "boków"). */
function lm(n, jeden, kilka, wiele) {
  if (n === 1) return jeden;
  const j = n % 10;
  const d = n % 100;
  return j >= 2 && j <= 4 && !(d >= 12 && d <= 14) ? kilka : wiele;
}

/** Trójki pitagorejskie (przyprostokątna, przyprostokątna, przeciwprostokątna). */
const TROJKI = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15]];

/** Czwórki (a, b, c, d), w których a² + b² + c² = d² (prostopadłościan o całkowitej przekątnej). */
const CZWORKI = [[1, 2, 2, 3], [2, 3, 6, 7], [2, 4, 4, 6], [1, 4, 8, 9], [4, 4, 7, 9], [2, 6, 9, 11], [6, 6, 7, 11], [3, 4, 12, 13], [2, 10, 11, 15]];

/** Kąty 30°, 45°, 60°: tangens i cosinus w LaTeX. */
const KAT = {
  30: { tg: "\\frac{\\sqrt{3}}{3}", cos: "\\frac{\\sqrt{3}}{2}" },
  45: { tg: "1", cos: "\\frac{\\sqrt{2}}{2}" },
  60: { tg: "\\sqrt{3}", cos: "\\frac{1}{2}" },
};

/** ρ·tg θ oraz ρ/cos θ dla kąta θ ∈ {30, 45, 60} i całkowitego ρ. */
const wysokoscZKata = (rho, th) => (th === 30 ? rad(Q.z(rho).div(3), 3) : th === 45 ? rad(rho) : rad(rho, 3));
const skosZKata = (rho, th) => (th === 30 ? rad(Q.z(2 * rho).div(3), 3) : th === 45 ? rad(rho, 2) : rad(2 * rho));

// --- Prostopadłościan: wierzchołki 0–3 to podstawa dolna, 4–7 górna (nad odpowiednim wierzchołkiem dolnym)

const NAZWY_PRM = ["ABCDEFGH", "KLMNPQRS"];
const WSP = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
const KRAW = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
const SCIANY = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]];
const kier = (e) => [0, 1, 2].map((i) => Math.abs(WSP[e[1]][i] - WSP[e[0]][i])).join();
/** Położenie prostych zawierających krawędzie e i f: 0 – równoległe, 1 – przecinają się, 2 – skośne. */
const polozenie = (e, f) => (kier(e) === kier(f) ? 0 : e.some((v) => f.includes(v)) ? 1 : 2);
/** Ile końców krawędzi e leży w ścianie s: 2 – krawędź leży w płaszczyźnie, 1 – prostopadła, 0 – równoległa. */
const konceWScianie = (e, s) => e.filter((v) => s.includes(v)).length;

// --- Ostrosłupy i graniastosłupy prawidłowe

const PODST = {
  3: { przym: "trójkątnego", nom: "trójkątny", wielokat: "trójkąt równoboczny", p: "ABC" },
  4: { przym: "czworokątnego", nom: "czworokątny", wielokat: "kwadrat", p: "ABCD" },
  6: { przym: "sześciokątnego", nom: "sześciokątny", wielokat: "sześciokąt foremny", p: "ABCDEF" },
};
/** Odległość spodka wysokości od wierzchołka (R) i od krawędzi (r) podstawy – wzory w LaTeX. */
const R_TEX = { 3: "\\frac{a\\sqrt{3}}{3}", 4: "\\frac{a\\sqrt{2}}{2}", 6: "a" };
const r_TEX = { 3: "\\frac{a\\sqrt{3}}{6}", 4: "\\frac{a}{2}", 6: "\\frac{a\\sqrt{3}}{2}" };

/** Bok podstawy a (jako k·√s), dla którego R (rodzaj „R”) albo r (rodzaj „r”) jest równe całkowitemu ρ; dla sześciokąta i r wymagane 3 | ρ. */
function bokDla(n, rodzaj, rho) {
  if (rodzaj === "R") return n === 3 ? rad(rho, 3) : n === 4 ? rad(rho, 2) : rad(rho);
  if (n === 3) return rad(2 * rho, 3);
  if (n === 4) return rad(2 * rho);
  return rad((2 * rho) / 3, 3);
}

const pTrojkata = (a) => rad(Q.z(a * a).div(4), 3); // a całkowite
const pSzesciokata = (a) => rad(Q.z(3 * a * a).div(2), 3); // a całkowite

// --- Zadania i ściągi

export default {
  tematy: [
    // ------------------------------------------------------------------ Proste i płaszczyzny
    {
      id: "proste-plaszczyzny",
      nazwa: "Proste i płaszczyzny w przestrzeni",
      sciaga: [
        {
          nazwa: "Dwie proste w przestrzeni",
          slownie: "Dwie różne proste w przestrzeni są równoległe (leżą w jednej płaszczyźnie i nie mają punktu wspólnego), przecinają się (mają dokładnie jeden punkt wspólny) albo są skośne (nie leżą w jednej płaszczyźnie i nie mają punktu wspólnego). Proste prostopadłe mogą się przecinać albo być skośne.",
          litery: "Skośne proste to takie, których nie da się narysować na jednej płaskiej kartce.",
          przyklad: "Prostopadłościan $ABCDEFGH$ ma podstawy $ABCD$ i $EFGH$ oraz krawędzie boczne $AE$, $BF$, $CG$, $DH$. Proste $AB$ i $EF$ są równoległe, proste $AB$ i $BF$ przecinają się w punkcie $B$, a proste $AB$ i $CG$ są skośne (i prostopadłe).",
          uwaga: "Brak punktu wspólnego nie oznacza jeszcze równoległości – w przestrzeni proste bez punktu wspólnego mogą być skośne.",
        },
        {
          nazwa: "Prosta i płaszczyzna, dwie płaszczyzny",
          slownie: "Prosta może leżeć w płaszczyźnie, być do niej równoległa (brak punktów wspólnych) albo ją przecinać w jednym punkcie. Prosta jest prostopadła do płaszczyzny, gdy jest prostopadła do dwóch przecinających się prostych tej płaszczyzny. Dwie płaszczyzny są równoległe albo przecinają się wzdłuż prostej.",
          litery: "Wystarczą dwie przecinające się proste w płaszczyźnie – nie trzeba sprawdzać wszystkich.",
          przyklad: "Krawędź $AE$ jest prostopadła do $AB$ i do $AD$, więc jest prostopadła do płaszczyzny $ABCD$. Płaszczyzny $ABCD$ i $EFGH$ są równoległe, a płaszczyzny $ABFE$ i $BCGF$ przecinają się wzdłuż prostej $BF$.",
          uwaga: "Prosta prostopadła tylko do jednej prostej płaszczyzny nie musi być prostopadła do całej płaszczyzny.",
        },
        {
          nazwa: "Rzut równoległy na płaszczyznę",
          slownie: "Rzutem punktu $P$ na płaszczyznę $\\pi$ w kierunku prostej $l$ (nierównoległej do $\\pi$) jest punkt przecięcia $\\pi$ z prostą równoległą do $l$ przechodzącą przez $P$. Gdy $l$ jest prostopadła do $\\pi$, mamy rzut prostokątny. Rzut odcinka to odcinek łączący rzuty jego końców.",
          litery: "Rzut prostokątny odcinka jest krótszy od odcinka (lub tej samej długości, gdy odcinek jest równoległy do płaszczyzny).",
          przyklad: "Rzutem prostokątnym punktu $G$ na płaszczyznę $ABCD$ jest punkt $C$, więc rzutem przekątnej $AG$ prostopadłościanu $ABCDEFGH$ jest przekątna podstawy $AC$.",
          uwaga: "Rzut równoległy zachowuje równoległość odcinków, ale zwykle zmienia długości i kąty.",
        },
        {
          nazwa: "Twierdzenie o trzech prostych prostopadłych",
          slownie: "Niech prosta $k$ leży w płaszczyźnie $\\pi$, a prosta $m$ przecina $\\pi$ (nie prostopadle) i ma rzut prostokątny $m'$ na $\\pi$. Wtedy $k$ jest prostopadła do $m$ dokładnie wtedy, gdy $k$ jest prostopadła do $m'$.",
          tex: "k\\perp m'\\iff k\\perp m",
          litery: "$k$ – prosta w płaszczyźnie $\\pi$, $m$ – prosta przecinająca $\\pi$, $m'$ – rzut prostokątny prostej $m$ na $\\pi$.",
          przyklad: "W ostrosłupie prawidłowym $ABCDS$ punkt $O$ jest środkiem podstawy, a $M$ środkiem $AB$. Rzutem $SM$ na podstawę jest $OM$, a $OM\\perp AB$, więc także $SM\\perp AB$.",
          uwaga: "Twierdzenie dotyczy rzutu prostokątnego, a nie dowolnego rzutu równoległego.",
        },
      ],
      jak: [
        "Zapisz, które wierzchołki leżą w danej ścianie lub na danej krawędzi (np. $A$, $B$, $F$, $E$ leżą w ścianie $ABFE$).",
        "Dwie proste: jeśli mają wspólny punkt, to się przecinają. Jeśli nie, sprawdź, czy są równoległe (np. obie równoległe do tej samej krawędzi). W przeciwnym razie są skośne.",
        "Krawędź prostopadłościanu i płaszczyzna ściany: policz końce krawędzi leżące w tej ścianie. Dwa – krawędź leży w płaszczyźnie, jeden – jest do niej prostopadła, zero – jest równoległa.",
        "Rzut odcinka: rzuć prostopadle oba końce na płaszczyznę i połącz ich rzuty.",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Prostopadłościan $ABCDEFGH$ ma podstawy $ABCD$ i $EFGH$ oraz krawędzie boczne $AE$, $BF$, $CG$, $DH$. Która z krawędzi leży na prostej skośnej do prostej $AB$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$EF$", "$BF$", "$CG$", "$AD$"],
          poprawna: 2,
        },
        {
          nr: "2",
          tresc: "Ile krawędzi prostopadłościanu $ABCDEFGH$ jest równoległych do płaszczyzny podstawy $ABCD$ i nie leży w tej płaszczyźnie? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$", "$4$", "$8$", "$12$"],
          poprawna: 1,
        },
        {
          nr: "3",
          tresc: "W prostopadłościanie $ABCDEFGH$ (podstawy $ABCD$ i $EFGH$, krawędzie boczne $AE$, $BF$, $CG$, $DH$) rzutujemy prostokątnie odcinek $AG$ na płaszczyznę $ABCD$. Który odcinek jest jego rzutem? **Wybierz właściwą odpowiedź.**",
          opcje: ["$AB$", "$CG$", "$BD$", "$AC$"],
          poprawna: 3,
        },
        {
          nr: "4",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Dwie proste skośne nie mają punktu wspólnego.", litery: "PF", poprawna: 0 },
            { tekst: "Dwie proste w przestrzeni, które nie mają punktu wspólnego, są zawsze równoległe.", litery: "PF", poprawna: 1 },
            { tekst: "Jeśli prosta jest prostopadła do dwóch przecinających się prostych leżących w płaszczyźnie, to jest prostopadła do tej płaszczyzny.", litery: "PF", poprawna: 0 },
          ],
        },
        {
          nr: "5",
          tresc: "W prostopadłościanie $ABCDEFGH$ (podstawy $ABCD$ i $EFGH$, krawędzie boczne $AE$, $BF$, $CG$, $DH$) płaszczyzny $ABCD$ i $BCGF$ przecinają się. Jaka jest ich część wspólna? **Wybierz właściwą odpowiedź.**",
          opcje: ["prosta $BC$", "prosta $AB$", "prosta $CG$", "tylko punkt $C$"],
          poprawna: 0,
        },
      ],
      otwarte: [
        {
          nr: "6",
          punkty: 2,
          tresc: "Dany jest prostopadłościan $ABCDEFGH$ o podstawie $ABCD$, w którym $|AB|=6$, $|AD|=8$, $|AE|=10$ (krawędzie boczne to $AE$, $BF$, $CG$, $DH$). Wskaż rzut prostokątny odcinka $BH$ na płaszczyznę $ABCD$ i oblicz długość tego rzutu oraz długość odcinka $BH$. **Zapisz obliczenia.**",
          rozwiazanie: "Punkt $B$ leży w płaszczyźnie $ABCD$, więc jest swoim rzutem. Punkt $H$ leży nad $D$ (krawędź $DH$ jest prostopadła do podstawy), więc jego rzutem jest $D$. Rzutem odcinka $BH$ jest odcinek $BD$.\n\nOdcinek $BD$ to przekątna prostokąta $6\\times8$: $|BD|=\\sqrt{6^2+8^2}=\\sqrt{100}=10$.\n\nTrójkąt $BDH$ jest prostokątny (kąt przy $D$ jest prosty), a $|DH|=10$: $|BH|=\\sqrt{10^2+10^2}=\\sqrt{200}=10\\sqrt{2}$.\n\nOdpowiedź: Rzutem jest odcinek $BD$ o długości $10$, a $|BH|=10\\sqrt{2}$.",
        },
        {
          nr: "7",
          punkty: 2,
          tresc: "W ostrosłupie prawidłowym czworokątnym $ABCDS$ punkt $O$ jest środkiem podstawy, a $M$ środkiem krawędzi $AB$. Uzasadnij, że kąt $SMO$ jest kątem nachylenia ściany bocznej $ABS$ do płaszczyzny podstawy. **Zapisz uzasadnienie.**",
          rozwiazanie: "Wysokość $SO$ jest prostopadła do podstawy, więc rzutem punktu $S$ na płaszczyznę podstawy jest $O$. Punkt $M$ leży w podstawie, więc rzutem odcinka $SM$ jest odcinek $OM$.\n\nPunkty $O$ i $M$ są środkiem kwadratu i środkiem jego boku, więc $OM\\perp AB$.\n\nZ twierdzenia o trzech prostych prostopadłych (prosta $AB$ leży w podstawie i jest prostopadła do rzutu $OM$) wynika, że $AB\\perp SM$.\n\nProste $OM$ i $SM$ wychodzą z punktu $M$ krawędzi $AB$, są do niej prostopadłe i leżą w podstawie oraz w ścianie $ABS$. Zatem $\\angle SMO$ jest kątem liniowym kąta dwuściennego między ścianą boczną a podstawą.\n\nOdpowiedź: Kąt nachylenia ściany $ABS$ do podstawy to $\\angle SMO$.",
        },
      ],
      generatory: [
        {
          id: "polozenie-prostych",
          nazwa: "Położenie prostych",
          opis: "Krawędzie prostopadłościanu: jak położone są dwie proste, ile krawędzi jest skośnych, równoległych albo przecinających daną prostą, jak prosta leży względem płaszczyzny ściany.",
          generuj(r) {
            const L = r.pick(NAZWY_PRM);
            const nz = (e) => `${L[e[0]]}${L[e[1]]}`;
            const sc = (s) => s.map((i) => L[i]).join("");
            const wstep = `Prostopadłościan $${L}$ ma podstawy $${L.slice(0, 4)}$ i $${L.slice(4)}$ oraz krawędzie boczne $${L[0]}${L[4]}$, $${L[1]}${L[5]}$, $${L[2]}${L[6]}$, $${L[3]}${L[7]}$.`;
            const tryb = r.int(0, 2);
            if (tryb === 0) {
              const i = r.int(0, 11);
              const j = r.intBez(0, 11, i);
              const e = KRAW[i];
              const f = KRAW[j];
              const p = polozenie(e, f);
              const opis = [
                `Proste $${nz(e)}$ i $${nz(f)}$ są krawędziami o tym samym kierunku, nie mają punktu wspólnego i leżą w jednej płaszczyźnie, więc są równoległe.`,
                `Krawędzie $${nz(e)}$ i $${nz(f)}$ mają wspólny wierzchołek $${L[e.find((v) => f.includes(v))]}$, więc proste się przecinają.`,
                `Proste $${nz(e)}$ i $${nz(f)}$ nie są równoległe i nie mają punktu wspólnego, więc są skośne.`,
              ][p];
              return {
                tresc: `${wstep} Jak położone są względem siebie proste $${nz(e)}$ i $${nz(f)}$?`,
                pola: [{ id: "w", typ: "wybor", etykieta: "Położenie prostych", opcje: ["są równoległe", "przecinają się", "są skośne"] }],
                odpowiedz: { w: p },
                wynik: ["są równoległe", "przecinają się", "są skośne"][p],
                rozwiazanie: [opis],
              };
            }
            if (tryb === 1) {
              const i = r.int(0, 11);
              const e = KRAW[i];
              const t = r.int(0, 2);
              const lista = KRAW.filter((f, j) => j !== i && polozenie(e, f) === t);
              const pyt = [
                `Ile krawędzi tego prostopadłościanu (nie licząc krawędzi $${nz(e)}$) jest równoległych do prostej $${nz(e)}$?`,
                `Ile krawędzi tego prostopadłościanu (nie licząc krawędzi $${nz(e)}$) przecina prostą $${nz(e)}$?`,
                `Ile krawędzi tego prostopadłościanu leży na prostych skośnych do prostej $${nz(e)}$?`,
              ][t];
              const slowo = ["równoległe do", "przecinające", "skośne do"][t];
              return {
                tresc: `${wstep} ${pyt}`,
                pola: [pole("w", "Liczba krawędzi $=$")],
                odpowiedz: { w: q(lista.length) },
                wynik: `$${lista.length}$`,
                rozwiazanie: [`Krawędzie ${slowo} $${nz(e)}$: ${lista.map((f) => `$${nz(f)}$`).join(", ")}.`, `Jest ich $${lista.length}$.`],
              };
            }
            const i = r.int(0, 11);
            const e = KRAW[i];
            const s = r.pick(SCIANY);
            const w = konceWScianie(e, s);
            const opcje = ["leży w tej płaszczyźnie", "jest równoległa do tej płaszczyzny", "jest prostopadła do tej płaszczyzny"];
            const idx = w === 2 ? 0 : w === 0 ? 1 : 2;
            const wspolny = e.find((v) => s.includes(v));
            const opis = [
              `Oba końce krawędzi $${nz(e)}$ leżą w płaszczyźnie $${sc(s)}$, więc cała prosta w niej leży.`,
              `Żaden koniec krawędzi $${nz(e)}$ nie leży w płaszczyźnie $${sc(s)}$, a krawędź ma kierunek jednej z krawędzi tej ściany, więc jest równoległa do płaszczyzny.`,
              `Krawędź $${nz(e)}$ ma jeden koniec ($${L[wspolny]}$) w płaszczyźnie $${sc(s)}$ i jest prostopadła do dwóch krawędzi tej ściany wychodzących z $${L[wspolny]}$, więc jest prostopadła do płaszczyzny.`,
            ][idx];
            return {
              tresc: `${wstep} Jak położona jest prosta $${nz(e)}$ względem płaszczyzny $${sc(s)}$?`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Położenie prostej", opcje }],
              odpowiedz: { w: idx },
              wynik: opcje[idx],
              rozwiazanie: [opis],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Kąty
    {
      id: "katy",
      nazwa: "Kąt między prostą a płaszczyzną. Kąt dwuścienny",
      sciaga: [
        {
          nazwa: "Kąt prostej z płaszczyzną",
          slownie: "Kątem między prostą a płaszczyzną (kątem nachylenia prostej do płaszczyzny) nazywamy kąt między tą prostą a jej rzutem prostokątnym na tę płaszczyznę. Prosta równoległa do płaszczyzny tworzy z nią kąt $0^\\circ$, a prosta prostopadła $90^\\circ$.",
          tex: "\\alpha=\\angle(k,k')",
          litery: "$k$ – prosta (odcinek) przecinająca płaszczyznę, $k'$ – jej rzut prostokątny na płaszczyznę, $\\alpha$ – szukany kąt.",
          przyklad: "W prostopadłościanie $ABCDEFGH$ rzutem przekątnej $AG$ na płaszczyznę podstawy $ABCD$ jest przekątna $AC$. Kąt nachylenia $AG$ do podstawy to $\\angle GAC$ w trójkącie prostokątnym $ACG$ (kąt prosty przy $C$).",
          uwaga: "Szukamy kąta z rzutem prostej, a nie z dowolną prostą leżącą w płaszczyźnie.",
        },
        {
          nazwa: "Przekątna prostopadłościanu i podstawa",
          slownie: "Przekątna prostopadłościanu o krawędziach $a$, $b$, $c$ ma długość $d$. Jej rzut na podstawę to przekątna podstawy $d_p$. Kąt $\\alpha$ nachylenia przekątnej do podstawy leży w trójkącie prostokątnym o przyprostokątnych $d_p$ i $c$ (wysokość bryły).",
          tex: "d_p=\\sqrt{a^2+b^2}\\qquad d=\\sqrt{a^2+b^2+c^2}\\qquad\\operatorname{tg}\\alpha=\\frac{c}{d_p}",
          litery: "$a$, $b$ – boki podstawy, $c$ – wysokość, $d_p$ – przekątna podstawy, $d$ – przekątna prostopadłościanu.",
          przyklad: "$a=3$, $b=4$, $c=5$: $d_p=5$, $\\operatorname{tg}\\alpha=\\frac{5}{5}=1$, więc $\\alpha=45^\\circ$. Przekątna bryły: $d=\\sqrt{50}=5\\sqrt{2}$.",
          uwaga: "W tangensie dzielimy przez przekątną podstawy $d_p$, a nie przez bok podstawy.",
        },
        {
          nazwa: "Kąt dwuścienny",
          slownie: "Kąt dwuścienny to kąt między dwiema półpłaszczyznami o wspólnej krawędzi. Jego miarą jest kąt liniowy: kąt między półprostymi wychodzącymi z jednego punktu krawędzi, prostopadłymi do niej, po jednej w każdej półpłaszczyźnie.",
          litery: "Kątem nachylenia ściany bocznej ostrosłupa do podstawy jest kąt dwuścienny między tą ścianą a podstawą.",
          przyklad: "W sześcianie $ABCDEFGH$ krawędź $AB$ jest wspólna dla ścian $ABCD$ i $ABFE$. Odcinki $AD$ i $AE$ są prostopadłe do $AB$, a kąt $DAE$ jest prosty, więc kąt dwuścienny między tymi ścianami ma $90^\\circ$.",
          uwaga: "Kąt dwuścienny mierzymy w płaszczyźnie prostopadłej do krawędzi, a nie kątem między krawędziami ścian.",
        },
        {
          nazwa: "Kąty w ostrosłupie prawidłowym",
          slownie: "Niech $O$ będzie spodkiem wysokości $H$ (środkiem podstawy). Odległość $O$ od wierzchołka podstawy oznaczamy $R$, a od krawędzi podstawy $r$. Krawędź boczna tworzy z podstawą kąt $\\alpha$, a ściana boczna (przez środek $M$ krawędzi podstawy, kąt $SMO$) kąt $\\beta$.",
          tex: "\\operatorname{tg}\\alpha=\\frac{H}{R}\\qquad\\operatorname{tg}\\beta=\\frac{H}{r}\\qquad R_3=\\frac{a\\sqrt{3}}{3}\\qquad r_3=\\frac{a\\sqrt{3}}{6}\\qquad R_4=\\frac{a\\sqrt{2}}{2}\\qquad r_4=\\frac{a}{2}\\qquad R_6=a\\qquad r_6=\\frac{a\\sqrt{3}}{2}",
          litery: "$R_3$, $r_3$ – dla podstawy będącej trójkątem równobocznym, $R_4$, $r_4$ – dla kwadratu, $R_6$, $r_6$ – dla sześciokąta foremnego; $a$ – bok podstawy.",
          przyklad: "Ostrosłup prawidłowy czworokątny: $a=8$, $H=4$. Wtedy $r=4$, więc $\\operatorname{tg}\\beta=\\frac44=1$ i $\\beta=45^\\circ$. Mamy też $R=4\\sqrt{2}$, więc $\\operatorname{tg}\\alpha=\\frac{4}{4\\sqrt{2}}=\\frac{\\sqrt{2}}{2}$.",
          uwaga: "Dla ściany bocznej używamy $r$ (odległość do krawędzi podstawy), a dla krawędzi bocznej $R$ (odległość do wierzchołka).",
        },
      ],
      jak: [
        "Znajdź rzut prostopadły odcinka na płaszczyznę (dla ściany – odcinek $OM$ do środka krawędzi podstawy) i zaznacz szukany kąt.",
        "Wskaż trójkąt prostokątny: pionowa przyprostokątna to wysokość $H$, druga – rzut (przekątna podstawy, $R$ albo $r$), a przeciwprostokątna – szukany odcinek.",
        "Wyznacz długości boków tego trójkąta z podanych danych (twierdzenie Pitagorasa, wzory na $R$ i $r$).",
        "Użyj $\\operatorname{tg}$, $\\sin$ albo $\\cos$ (wartości dla $30^\\circ$, $45^\\circ$, $60^\\circ$ znasz z trygonometrii) i zapisz wynik z jednostką.",
      ],
      zadania: [
        {
          nr: "8",
          tresc: "Prostopadłościan $ABCDEFGH$ ma podstawę $ABCD$ o bokach $|AB|=3$ cm i $|AD|=4$ cm oraz krawędź boczną $|AE|=5$ cm. Jaką miarę ma kąt nachylenia przekątnej $AG$ do płaszczyzny podstawy? **Wybierz właściwą odpowiedź.**",
          opcje: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"],
          poprawna: 1,
        },
        {
          nr: "9",
          tresc: "Sześcian ma krawędź długości $a$. Jaki jest tangens kąta nachylenia przekątnej sześcianu do płaszczyzny podstawy? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{\\sqrt{2}}{2}$", "$\\sqrt{2}$", "$1$", "$\\frac{\\sqrt{3}}{3}$"],
          poprawna: 0,
        },
        {
          nr: "10",
          tresc: "Podstawą ostrosłupa prawidłowego czworokątnego jest kwadrat o boku $8$ cm, a wysokość ostrosłupa ma $6$ cm. Jaki jest tangens kąta nachylenia ściany bocznej do płaszczyzny podstawy? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{3}{4}$", "$\\frac{3\\sqrt{2}}{4}$", "$\\frac{3}{2}$", "$\\frac{2}{3}$"],
          poprawna: 2,
        },
        {
          nr: "11",
          tresc: "Podstawą ostrosłupa prawidłowego trójkątnego jest trójkąt równoboczny o boku $6$ cm. Krawędź boczna tworzy z płaszczyzną podstawy kąt $60^\\circ$. Jaką wysokość ma ten ostrosłup? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$ cm", "$2\\sqrt{3}$ cm", "$6\\sqrt{3}$ cm", "$6$ cm"],
          poprawna: 3,
        },
        {
          nr: "12",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Kąt między prostą przecinającą płaszczyznę a tą płaszczyzną nie jest większy niż $90^\\circ$.", litery: "PF", poprawna: 0 },
            { tekst: "Kąt nachylenia ściany bocznej ostrosłupa do podstawy to kąt między krawędzią boczną a krawędzią podstawy.", litery: "PF", poprawna: 1 },
            { tekst: "Kąt dwuścienny między sąsiednimi ścianami prostopadłościanu ma miarę $90^\\circ$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "13",
          punkty: 3,
          tresc: "Podstawą prostopadłościanu $ABCDEFGH$ jest prostokąt $ABCD$ o bokach $|AB|=6$ cm i $|AD|=8$ cm. Przekątna $AG$ tworzy z płaszczyzną podstawy kąt $30^\\circ$. Oblicz wysokość prostopadłościanu i długość przekątnej $AG$. **Zapisz obliczenia.**",
          rozwiazanie: "Rzutem przekątnej $AG$ na podstawę jest przekątna $AC$, a $\\angle GAC=30^\\circ$ w trójkącie prostokątnym $ACG$.\n\nPrzekątna podstawy: $|AC|=\\sqrt{6^2+8^2}=10$ cm.\n\nWysokość: $\\operatorname{tg}30^\\circ=\\frac{|CG|}{|AC|}$, więc $|CG|=10\\cdot\\frac{\\sqrt{3}}{3}=\\frac{10\\sqrt{3}}{3}$ cm.\n\nPrzekątna bryły: $\\cos30^\\circ=\\frac{|AC|}{|AG|}$, więc $|AG|=\\frac{10}{\\frac{\\sqrt{3}}{2}}=\\frac{20}{\\sqrt{3}}=\\frac{20\\sqrt{3}}{3}$ cm.\n\nOdpowiedź: Wysokość jest równa $\\frac{10\\sqrt{3}}{3}$ cm, a $|AG|=\\frac{20\\sqrt{3}}{3}$ cm.",
        },
        {
          nr: "14",
          punkty: 3,
          tresc: "Podstawą ostrosłupa prawidłowego czworokątnego $ABCDS$ jest kwadrat o boku $12$ cm. Ściana boczna $ABS$ jest nachylona do płaszczyzny podstawy pod kątem $60^\\circ$. Oblicz wysokość ostrosłupa i wysokość ściany bocznej poprowadzoną z wierzchołka $S$. **Zapisz obliczenia.**",
          rozwiazanie: "Niech $O$ będzie środkiem podstawy, a $M$ środkiem krawędzi $AB$. Kąt nachylenia ściany do podstawy to $\\angle SMO=60^\\circ$ w trójkącie prostokątnym $MOS$.\n\nOdległość $|OM|=r=\\frac{a}{2}=6$ cm.\n\nWysokość ostrosłupa: $\\operatorname{tg}60^\\circ=\\frac{H}{6}$, więc $H=6\\sqrt{3}$ cm.\n\nWysokość ściany bocznej: $\\cos60^\\circ=\\frac{6}{|SM|}$, więc $|SM|=\\frac{6}{\\frac12}=12$ cm.\n\nOdpowiedź: Wysokość ostrosłupa to $6\\sqrt{3}$ cm, a wysokość ściany bocznej to $12$ cm.",
        },
      ],
      generatory: [
        {
          id: "kat-przekatnej-prostopadloscianu",
          nazwa: "Przekątna a podstawa",
          opis: "Prostopadłościan o podstawie prostokątnej: kąt nachylenia przekątnej do podstawy. Oblicz wysokość, przekątną bryły albo tangens kąta.",
          generuj(r) {
            const L = r.pick(NAZWY_PRM);
            const [x, y, dp] = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]);
            const [a, b] = r.chance() ? [x, y] : [y, x];
            const AB = `${L[0]}${L[1]}`;
            const AD = `${L[0]}${L[3]}`;
            const AG = `${L[0]}${L[6]}`;
            const AC = `${L[0]}${L[2]}`;
            const CG = `${L[2]}${L[6]}`;
            const tryb = r.int(0, 3);
            if (tryb === 3) {
              const [a2, b2, d2] = r.pick([[3, 4, 5], [6, 8, 10]]);
              const c = r.int(1, 12);
              const w = Q.z(c).div(d2);
              return {
                tresc: `Prostopadłościan $${L}$ ma podstawę $${L.slice(0, 4)}$ o bokach $|${AB}|=${a2}$ cm i $|${AD}|=${b2}$ cm oraz wysokość $|${L[0]}${L[4]}|=${c}$ cm. Oblicz tangens kąta nachylenia przekątnej $${AG}$ do płaszczyzny podstawy.`,
                pola: [pole("w", "$\\operatorname{tg}\\alpha =$")],
                odpowiedz: { w },
                wynik: `$\\operatorname{tg}\\alpha = ${w.tex()}$`,
                rozwiazanie: [
                  `Rzutem $${AG}$ na podstawę jest przekątna $${AC}$, a szukany kąt to $\\angle ${L[6]}${L[0]}${L[2]}$ w trójkącie prostokątnym $${AC}${L[6]}$ (kąt prosty przy $${L[2]}$).`,
                  `$|${AC}|=\\sqrt{${a2}^2+${b2}^2}=${d2}$ cm.`,
                  `$\\operatorname{tg}\\alpha=\\frac{|${CG}|}{|${AC}|}=\\frac{${c}}{${d2}}=${w.tex()}$.`,
                ],
              };
            }
            const th = r.pick([30, 45, 60]);
            const start = `Prostopadłościan $${L}$ ma podstawę $${L.slice(0, 4)}$ będącą prostokątem o bokach $|${AB}|=${a}$ cm i $|${AD}|=${b}$ cm. Przekątna $${AG}$ tworzy z płaszczyzną podstawy kąt $${th}^\\circ$.`;
            const krok1 = `Rzutem $${AG}$ na podstawę jest przekątna $${AC}$, a szukany kąt to $\\angle ${L[6]}${L[0]}${L[2]}=${th}^\\circ$ w trójkącie prostokątnym $${AC}${L[6]}$.`;
            const krok2 = `$|${AC}|=\\sqrt{${a}^2+${b}^2}=${dp}$ cm.`;
            if (tryb === 0) {
              const H = wysokoscZKata(dp, th);
              const o = odp(H, "H", "cm");
              return {
                tresc: `${start} Oblicz wysokość tego prostopadłościanu (w cm).${o.dopisek}`,
                pola: o.pola,
                odpowiedz: { w: H.k },
                wynik: o.wynik,
                rozwiazanie: [krok1, krok2, `$\\operatorname{tg}${th}^\\circ=\\frac{H}{${dp}}$, więc $H=${dp}\\cdot${KAT[th].tg}=${radTex(H)}$ cm.`],
              };
            }
            const D = skosZKata(dp, th);
            const o = odp(D, `|${AG}|`, "cm");
            return {
              tresc: `${start} Oblicz długość przekątnej $${AG}$ tego prostopadłościanu (w cm).${o.dopisek}`,
              pola: o.pola,
              odpowiedz: { w: D.k },
              wynik: o.wynik,
              rozwiazanie: [krok1, krok2, `$\\cos${th}^\\circ=\\frac{${dp}}{|${AG}|}$, więc $|${AG}|=\\frac{${dp}}{${KAT[th].cos}}=${radTex(D)}$ cm.`],
            };
          },
        },
        {
          id: "kat-w-ostroslupie",
          nazwa: "Kąt w ostrosłupie",
          opis: "Ostrosłup prawidłowy (trójkątny, czworokątny lub sześciokątny), krawędź boczna albo ściana boczna nachylona do podstawy pod kątem $30^\\circ$, $45^\\circ$ lub $60^\\circ$. Oblicz wysokość albo odpowiedni odcinek.",
          generuj(r) {
            const n = r.pick([3, 4, 6]);
            const sciana = r.chance();
            const th = r.pick([30, 45, 60]);
            const m = r.int(2, 6);
            const rho = n === 6 && sciana ? 3 * m : m;
            const a = bokDla(n, sciana ? "r" : "R", rho);
            const p = PODST[n];
            const pytH = r.chance();
            const baza = p.p;
            const kat = sciana
              ? `Ściana boczna $${baza[0]}${baza[1]}S$ jest nachylona do płaszczyzny podstawy pod kątem $${th}^\\circ$.`
              : `Krawędź boczna $${baza[0]}S$ tworzy z płaszczyzną podstawy kąt $${th}^\\circ$.`;
            const start = `Podstawą ostrosłupa prawidłowego ${p.przym} $${baza}S$ jest ${p.wielokat} o boku $${radTex(a)}$ cm. ${kat}`;
            const krok1 = sciana
              ? `Niech $O$ będzie spodkiem wysokości, a $M$ środkiem krawędzi $${baza[0]}${baza[1]}$. Kąt nachylenia ściany do podstawy to $\\angle SMO=${th}^\\circ$ w trójkącie prostokątnym $MOS$.`
              : `Niech $O$ będzie spodkiem wysokości (środkiem podstawy). Kąt nachylenia krawędzi do podstawy to $\\angle S${baza[0]}O=${th}^\\circ$ w trójkącie prostokątnym $${baza[0]}OS$.`;
            const krok2 = sciana
              ? `$|OM|=r=${r_TEX[n]}=${rho}$ cm (dla $a=${radTex(a)}$ cm).`
              : `$|${baza[0]}O|=R=${R_TEX[n]}=${rho}$ cm (dla $a=${radTex(a)}$ cm).`;
            if (pytH) {
              const H = wysokoscZKata(rho, th);
              const o = odp(H, "H", "cm");
              return {
                tresc: `${start} Oblicz wysokość tego ostrosłupa (w cm).${o.dopisek}`,
                pola: o.pola,
                odpowiedz: { w: H.k },
                wynik: o.wynik,
                rozwiazanie: [krok1, krok2, `$\\operatorname{tg}${th}^\\circ=\\frac{H}{${rho}}$, więc $H=${rho}\\cdot${KAT[th].tg}=${radTex(H)}$ cm.`],
              };
            }
            const l = skosZKata(rho, th);
            const nazwa = sciana ? "|SM|" : `|${baza[0]}S|`;
            const o = odp(l, nazwa, "cm");
            return {
              tresc: `${start} Oblicz ${sciana ? `wysokość ściany bocznej $${baza[0]}${baza[1]}S$ opuszczoną z wierzchołka $S$` : `długość krawędzi bocznej $${baza[0]}S$`} (w cm).${o.dopisek}`,
              pola: o.pola,
              odpowiedz: { w: l.k },
              wynik: o.wynik,
              rozwiazanie: [krok1, krok2, `$\\cos${th}^\\circ=\\frac{${rho}}{${nazwa}}$, więc $${nazwa}=\\frac{${rho}}{${KAT[th].cos}}=${radTex(l)}$ cm.`],
            };
          },
        },
        {
          id: "miara-kata-w-ostroslupie",
          nazwa: "Miara kąta w ostrosłupie",
          opis: "Ostrosłup prawidłowy o danym boku podstawy i wysokości. Ustal, pod jakim kątem ($30^\\circ$, $45^\\circ$ albo $60^\\circ$) nachylona jest krawędź boczna lub ściana boczna do podstawy.",
          generuj(r) {
            const n = r.pick([3, 4, 6]);
            const sciana = r.chance();
            const th = r.pick([30, 45, 60]);
            const rho = n === 6 && sciana ? 3 * r.int(1, 3) : th === 30 ? 3 * r.int(1, 3) : r.int(2, 9);
            const a = bokDla(n, sciana ? "r" : "R", rho);
            const H = wysokoscZKata(rho, th);
            const p = PODST[n];
            const baza = p.p;
            const obiekt = sciana ? `ściany bocznej $${baza[0]}${baza[1]}S$` : `krawędzi bocznej $${baza[0]}S$`;
            const idx = [30, 45, 60].indexOf(th);
            return {
              tresc: `Podstawą ostrosłupa prawidłowego ${p.przym} $${baza}S$ jest ${p.wielokat} o boku $${radTex(a)}$ cm, a wysokość ostrosłupa ma $${radTex(H)}$ cm. Oblicz miarę kąta nachylenia ${obiekt} do płaszczyzny podstawy.`,
              pola: [{ id: "w", typ: "wybor", etykieta: "Miara kąta", opcje: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$"] }],
              odpowiedz: { w: idx },
              wynik: `$${th}^\\circ$`,
              rozwiazanie: [
                sciana
                  ? `Niech $O$ będzie spodkiem wysokości, a $M$ środkiem krawędzi $${baza[0]}${baza[1]}$. Szukany kąt to $\\angle SMO$, a $|OM|=r=${r_TEX[n]}=${rho}$ cm.`
                  : `Niech $O$ będzie spodkiem wysokości. Szukany kąt to $\\angle S${baza[0]}O$, a $|${baza[0]}O|=R=${R_TEX[n]}=${rho}$ cm.`,
                `$\\operatorname{tg}\\alpha=\\frac{H}{${rho}}=\\frac{${radTex(H)}}{${rho}}=${KAT[th].tg}$.`,
                `Stąd $\\alpha=${th}^\\circ$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Graniastosłupy
    {
      id: "graniastoslupy",
      nazwa: "Graniastosłupy",
      sciaga: [
        {
          nazwa: "Graniastosłup prosty i prawidłowy",
          slownie: "Graniastosłup ma dwie podstawy (przystające wielokąty leżące w płaszczyznach równoległych) i ściany boczne będące równoległobokami. W graniastosłupie prostym krawędzie boczne są prostopadłe do podstaw, ściany boczne to prostokąty, a wysokość $H$ jest równa długości krawędzi bocznej. Graniastosłup prawidłowy to prosty z podstawą będącą wielokątem foremnym.",
          tex: "W=2n\\qquad K=3n\\qquad S=n+2",
          litery: "$n$ – liczba boków podstawy; $W$, $K$, $S$ – liczba wierzchołków, krawędzi i ścian graniastosłupa.",
          przyklad: "Graniastosłup prawidłowy sześciokątny: $n=6$, więc ma $12$ wierzchołków, $18$ krawędzi i $8$ ścian (dwie podstawy i $6$ ścian bocznych).",
          uwaga: "Prostopadłościan to graniastosłup prosty o podstawie prostokątnej, a sześcian – graniastosłup prawidłowy czworokątny o wysokości równej krawędzi podstawy.",
        },
        {
          nazwa: "Przekątne prostopadłościanu i sześcianu",
          slownie: "Przekątna ściany prostopadłościanu o bokach $a$, $b$ to przeciwprostokątna trójkąta prostokątnego. Przekątną bryły dostajemy, stosując twierdzenie Pitagorasa jeszcze raz – dodajemy kwadraty wszystkich trzech krawędzi.",
          tex: "d_p=\\sqrt{a^2+b^2}\\qquad d=\\sqrt{a^2+b^2+c^2}\\qquad d_6=a\\sqrt{3}",
          litery: "$a$, $b$, $c$ – krawędzie wychodzące z jednego wierzchołka, $d_p$ – przekątna ściany, $d$ – przekątna prostopadłościanu, $d_6$ – przekątna sześcianu o krawędzi $a$.",
          przyklad: "Dla krawędzi $2$, $3$, $6$: $d=\\sqrt{4+9+36}=\\sqrt{49}=7$. Sześcian o krawędzi $4$: przekątna ściany $4\\sqrt{2}$, przekątna bryły $4\\sqrt{3}$.",
          uwaga: "Dodajemy kwadraty krawędzi, a nie same krawędzie: $d\\neq a+b+c$.",
        },
        {
          nazwa: "Przekątne graniastosłupa prawidłowego",
          slownie: "Przekątna ściany bocznej ma długość $\\sqrt{a^2+H^2}$. W graniastosłupie czworokątnym przekątna podstawy to $a\\sqrt{2}$. W sześciokątnym dłuższa przekątna podstawy to $2a$, a krótsza $a\\sqrt{3}$; razem z wysokością dają przekątne bryły.",
          tex: "e=\\sqrt{a^2+H^2}\\qquad d_4=\\sqrt{2a^2+H^2}\\qquad d_6=\\sqrt{4a^2+H^2}",
          litery: "$a$ – krawędź podstawy, $H$ – wysokość, $e$ – przekątna ściany bocznej, $d_4$ – przekątna graniastosłupa czworokątnego, $d_6$ – najdłuższa przekątna graniastosłupa sześciokątnego.",
          przyklad: "Graniastosłup prawidłowy sześciokątny, $a=3$, $H=8$: najdłuższa przekątna to $\\sqrt{(2\\cdot3)^2+8^2}=\\sqrt{100}=10$.",
          uwaga: "W sześciokącie foremnym przekątna przez środek ma $2a$ (dwa promienie), a nie $a$.",
        },
      ],
      jak: [
        "Ustal, jaki to graniastosłup (prostopadłościan, sześcian, prawidłowy trójkątny, czworokątny albo sześciokątny) i zapisz, co jest dane: $a$, $H$.",
        "Znajdź przekątną podstawy (dla kwadratu $a\\sqrt{2}$, dla sześciokąta $2a$ albo $a\\sqrt{3}$).",
        "Narysuj w myślach trójkąt prostokątny: jedna przyprostokątna to przekątna podstawy, druga to wysokość $H$, przeciwprostokątna to przekątna bryły.",
        "Podstaw do wzoru Pitagorasa, wyciągnij pierwiastek i dopisz jednostkę.",
      ],
      zadania: [
        {
          nr: "15",
          tresc: "Krawędzie prostopadłościanu wychodzące z jednego wierzchołka mają długości $2$ cm, $3$ cm i $6$ cm. Jaką długość ma przekątna tego prostopadłościanu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$11$ cm", "$7$ cm", "$\\sqrt{13}$ cm", "$\\sqrt{45}$ cm"],
          poprawna: 1,
        },
        {
          nr: "16",
          tresc: "Przekątna sześcianu ma długość $6\\sqrt{3}$ cm. Jaką długość ma krawędź tego sześcianu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2\\sqrt{3}$ cm", "$3$ cm", "$18$ cm", "$6$ cm"],
          poprawna: 3,
        },
        {
          nr: "17",
          tresc: "Podstawą graniastosłupa prawidłowego czworokątnego jest kwadrat o boku $4$ cm, a wysokość graniastosłupa ma $7$ cm. Jaką długość ma przekątna tego graniastosłupa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$9$ cm", "$\\sqrt{65}$ cm", "$4\\sqrt{2}+7$ cm", "$27$ cm"],
          poprawna: 0,
        },
        {
          nr: "18",
          tresc: "Podstawą graniastosłupa prawidłowego sześciokątnego jest sześciokąt foremny o boku $3$ cm, a wysokość graniastosłupa ma $8$ cm. Jaką długość ma najdłuższa przekątna tego graniastosłupa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\sqrt{91}$ cm", "$\\sqrt{73}$ cm", "$10$ cm", "$11$ cm"],
          poprawna: 2,
        },
        {
          nr: "19",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Każdy graniastosłup prawidłowy czworokątny jest sześcianem.", litery: "PF", poprawna: 1 },
            { tekst: "Graniastosłup prawidłowy trójkątny ma $5$ ścian i $9$ krawędzi.", litery: "PF", poprawna: 0 },
            { tekst: "Graniastosłup prawidłowy sześciokątny ma $12$ wierzchołków i $18$ krawędzi.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "20",
          punkty: 2,
          tresc: "Graniastosłup prawidłowy trójkątny $ABCDEF$ ma podstawy $ABC$ i $DEF$ oraz krawędzie boczne $AD$, $BE$, $CF$. Krawędź podstawy ma $6$ cm, a przekątna ściany bocznej $10$ cm. Oblicz wysokość graniastosłupa oraz sumę długości wszystkich jego krawędzi. **Zapisz obliczenia.**",
          rozwiazanie: "Ściana boczna jest prostokątem o bokach $6$ cm i $H$, a jej przekątna ma $10$ cm.\n\nZ twierdzenia Pitagorasa: $6^2+H^2=10^2$, więc $H^2=100-36=64$ i $H=8$ cm.\n\nGraniastosłup ma $6$ krawędzi podstawy po $6$ cm i $3$ krawędzie boczne po $8$ cm.\n\nSuma długości krawędzi: $6\\cdot6+3\\cdot8=36+24=60$ cm.\n\nOdpowiedź: Wysokość to $8$ cm, a suma długości wszystkich krawędzi to $60$ cm.",
        },
        {
          nr: "21",
          punkty: 3,
          tresc: "Podstawą graniastosłupa prawidłowego sześciokątnego jest sześciokąt foremny o boku $6$ cm. Najdłuższa przekątna graniastosłupa tworzy z płaszczyzną podstawy kąt $30^\\circ$. Oblicz wysokość graniastosłupa i długość tej przekątnej. **Zapisz obliczenia.**",
          rozwiazanie: "Rzutem najdłuższej przekątnej graniastosłupa na podstawę jest najdłuższa przekątna sześciokąta foremnego, która ma długość $2a=12$ cm.\n\nW trójkącie prostokątnym o przyprostokątnych $12$ i $H$ kąt przy podstawie ma $30^\\circ$: $\\operatorname{tg}30^\\circ=\\frac{H}{12}$, więc $H=12\\cdot\\frac{\\sqrt{3}}{3}=4\\sqrt{3}$ cm.\n\nDługość przekątnej: $\\cos30^\\circ=\\frac{12}{d}$, więc $d=\\frac{12}{\\frac{\\sqrt{3}}{2}}=\\frac{24}{\\sqrt{3}}=8\\sqrt{3}$ cm.\n\nOdpowiedź: Wysokość graniastosłupa to $4\\sqrt{3}$ cm, a przekątna ma $8\\sqrt{3}$ cm.",
        },
      ],
      generatory: [
        {
          id: "przekatna-prostopadloscianu",
          nazwa: "Przekątne prostopadłościanu",
          opis: "Prostopadłościan albo sześcian: oblicz przekątną ściany, przekątną bryły, krawędź lub wysokość.",
          generuj(r) {
            const L = r.pick(NAZWY_PRM);
            const AG = `${L[0]}${L[6]}`;
            const tryb = r.int(0, 5);
            if (tryb <= 1) {
              const k = r.chance(0.7) ? r.pick([1, 2]) : 1;
              const baza = r.pick(CZWORKI.filter((c) => c[3] * k <= 30));
              const [a, b, c, d] = baza.map((x) => x * k);
              const kol = r.shuffle([a, b, c]);
              if (tryb === 0) {
                return {
                  tresc: `Krawędzie prostopadłościanu $${L}$ wychodzące z wierzchołka $${L[0]}$ mają długości $${kol[0]}$ cm, $${kol[1]}$ cm i $${kol[2]}$ cm. Oblicz długość przekątnej $${AG}$ tego prostopadłościanu (w cm).`,
                  pola: [pole("w", `$|${AG}|=$`)],
                  odpowiedz: { w: q(d) },
                  wynik: `$|${AG}|=${d}$ cm`,
                  rozwiazanie: [`$|${AG}|^2=${kol[0]}^2+${kol[1]}^2+${kol[2]}^2=${a * a + b * b + c * c}$.`, `$|${AG}|=\\sqrt{${d * d}}=${d}$ cm.`],
                };
              }
              return {
                tresc: `Podstawą prostopadłościanu $${L}$ jest prostokąt o bokach $${kol[0]}$ cm i $${kol[1]}$ cm, a przekątna prostopadłościanu ma długość $${d}$ cm. Oblicz wysokość tego prostopadłościanu (w cm).`,
                pola: [pole("w", "$H=$")],
                odpowiedz: { w: q(kol[2]) },
                wynik: `$H=${kol[2]}$ cm`,
                rozwiazanie: [`$d^2=a^2+b^2+H^2$, czyli $${d}^2=${kol[0]}^2+${kol[1]}^2+H^2$.`, `$${d * d}=${kol[0] * kol[0] + kol[1] * kol[1]}+H^2$, więc $H^2=${kol[2] * kol[2]}$.`, `$H=${kol[2]}$ cm.`],
              };
            }
            if (tryb === 2) {
              const a = r.int(2, 9);
              const o = odp(rad(a, 3), "d", "cm");
              return {
                tresc: `Sześcian ma krawędź długości $${a}$ cm. Oblicz długość przekątnej tego sześcianu (w cm).${o.dopisek}`,
                pola: o.pola,
                odpowiedz: { w: q(a) },
                wynik: o.wynik,
                rozwiazanie: [`Przekątna sześcianu o krawędzi $a$ ma długość $a\\sqrt{3}$.`, `$d=${a}\\sqrt{3}$ cm.`],
              };
            }
            if (tryb === 3) {
              const a = r.int(2, 9);
              const o = odp(rad(a, 2), "e", "cm");
              return {
                tresc: `Sześcian ma krawędź długości $${a}$ cm. Oblicz długość przekątnej ściany tego sześcianu (w cm).${o.dopisek}`,
                pola: o.pola,
                odpowiedz: { w: q(a) },
                wynik: o.wynik,
                rozwiazanie: [`Ściana jest kwadratem o boku $a$, więc jej przekątna ma długość $a\\sqrt{2}$.`, `$e=${a}\\sqrt{2}$ cm.`],
              };
            }
            if (tryb === 4) {
              const a = r.int(2, 12);
              return {
                tresc: `Przekątna sześcianu ma długość $${a}\\sqrt{3}$ cm. Oblicz długość krawędzi tego sześcianu (w cm).`,
                pola: [pole("w", "$a=$")],
                odpowiedz: { w: q(a) },
                wynik: `$a=${a}$ cm`,
                rozwiazanie: [`Przekątna sześcianu: $a\\sqrt{3}=${a}\\sqrt{3}$.`, `Dzielimy przez $\\sqrt{3}$: $a=${a}$ cm.`],
              };
            }
            const [x, y, z] = r.pick(TROJKI);
            const k = r.int(1, 2);
            const [p, s] = r.chance() ? [x * k, y * k] : [y * k, x * k];
            return {
              tresc: `Podstawą prostopadłościanu jest prostokąt o bokach $${p}$ cm i $${s}$ cm. Oblicz długość przekątnej podstawy (w cm).`,
              pola: [pole("w", "$d_p=$")],
              odpowiedz: { w: q(z * k) },
              wynik: `$d_p=${z * k}$ cm`,
              rozwiazanie: [`$d_p^2=${p}^2+${s}^2=${p * p + s * s}$.`, `$d_p=${z * k}$ cm.`],
            };
          },
        },
        {
          id: "przekatne-graniastoslupa-prawidlowego",
          nazwa: "Przekątne graniastosłupa",
          opis: "Graniastosłup prawidłowy trójkątny (przekątna ściany bocznej), czworokątny (przekątna bryły) albo sześciokątny (najdłuższa przekątna). Oblicz przekątną albo wysokość.",
          generuj(r) {
            const n = r.pick([3, 4, 6]);
            const szukamH = r.chance();
            // x – przyprostokątna „pozioma” (dla n = 4, 6 parzysta), H – wysokość, z – przeciwprostokątna
            const opcje = [];
            for (const [p, s, z] of TROJKI) {
              if (n === 3 || p % 2 === 0) opcje.push([p, s, z]);
              if (p !== s && (n === 3 || s % 2 === 0)) opcje.push([s, p, z]);
            }
            const [x, H, z] = r.pick(opcje);
            const baza = n === 3 ? "ABCDEF" : n === 4 ? "ABCDEFGH" : "ABCDEFGHIJKL";
            const polowa = baza.length / 2;
            const pod1 = baza.slice(0, polowa);
            const pod2 = baza.slice(polowa);
            const bok = n === 3 ? `${x}` : n === 4 ? `${x / 2}\\sqrt{2}` : `${x / 2}`;
            const przekGora = `${baza[0]}${baza[polowa + (n === 3 ? 1 : n === 4 ? 2 : 3)]}`;
            const nazwaPrz = n === 3 ? "przekątnej ściany bocznej" : n === 4 ? "przekątnej graniastosłupa" : "najdłuższej przekątnej graniastosłupa";
            const dlugosc = n === 3 ? `|${baza[0]}${baza[4]}|` : `|${przekGora}|`;
            const wstep = `Graniastosłup prawidłowy ${PODST[n].nom} $${baza}$ ma podstawy $${pod1}$ i $${pod2}$. Krawędź podstawy ma długość $${bok}$ cm`;
            const poziom = n === 3
              ? `Ściana boczna jest prostokątem o bokach $a=${x}$ cm i $H$, a jej przekątna $e$ spełnia $e^2=a^2+H^2$.`
              : n === 4
                ? `Przekątna podstawy (kwadratu) ma $a\\sqrt{2}=${bok}\\cdot\\sqrt{2}=${x}$ cm, a przekątna graniastosłupa spełnia $d^2=(a\\sqrt{2})^2+H^2$.`
                : `Najdłuższa przekątna podstawy (sześciokąta foremnego) ma $2a=${x}$ cm, a najdłuższa przekątna graniastosłupa spełnia $d^2=(2a)^2+H^2$.`;
            const litera = n === 3 ? "e" : "d";
            if (szukamH) {
              return {
                tresc: `${wstep}, a długość ${nazwaPrz} jest równa $${z}$ cm. Oblicz wysokość tego graniastosłupa (w cm).`,
                pola: [pole("w", "$H=$")],
                odpowiedz: { w: q(H) },
                wynik: `$H=${H}$ cm`,
                rozwiazanie: [poziom, `$${z}^2=${x}^2+H^2$, więc $H^2=${z * z}-${x * x}=${H * H}$.`, `$H=${H}$ cm.`],
              };
            }
            return {
              tresc: `${wstep}, a wysokość graniastosłupa ma $${H}$ cm. Oblicz długość ${nazwaPrz} $${dlugosc}$ (w cm).`,
              pola: [pole("w", `$${dlugosc}=$`)],
              odpowiedz: { w: q(z) },
              wynik: `$${dlugosc}=${z}$ cm`,
              rozwiazanie: [poziom, `$${litera}^2=${x}^2+${H}^2=${x * x + H * H}$.`, `$${litera}=\\sqrt{${z * z}}=${z}$ cm.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Ostrosłupy
    {
      id: "ostroslupy",
      nazwa: "Ostrosłupy",
      sciaga: [
        {
          nazwa: "Ostrosłup i ostrosłup prawidłowy",
          slownie: "Ostrosłup ma podstawę (dowolny wielokąt) i ściany boczne będące trójkątami o wspólnym wierzchołku $S$. Wysokość $H$ to odcinek $SO$ prostopadły do podstawy, gdzie $O$ jest spodkiem wysokości. W ostrosłupie prawidłowym podstawą jest wielokąt foremny, $O$ jest jego środkiem, a ściany boczne są przystającymi trójkątami równoramiennymi.",
          tex: "W=n+1\\qquad K=2n\\qquad S=n+1",
          litery: "$n$ – liczba boków podstawy; $W$, $K$, $S$ – liczba wierzchołków, krawędzi i ścian ostrosłupa.",
          przyklad: "Ostrosłup prawidłowy sześciokątny ma $7$ wierzchołków, $12$ krawędzi i $7$ ścian (podstawa i $6$ ścian bocznych). Czworościan foremny to ostrosłup trójkątny, którego wszystkie krawędzie są równe.",
          uwaga: "Ściany boczne ostrosłupa prawidłowego są równoramienne, ale równoboczne tylko wyjątkowo (np. w czworościanie foremnym).",
        },
        {
          nazwa: "Trójkąty prostokątne w ostrosłupie",
          slownie: "W ostrosłupie prawidłowym wysokość $H$ wyznacza trzy trójkąty prostokątne. Z krawędzią boczną $b$ i $R$ (odległość spodka od wierzchołka podstawy), z wysokością ściany bocznej $h$ i $r$ (odległość spodka od krawędzi podstawy) oraz z $h$, $b$ i połową krawędzi podstawy. Wzory na $R$ i $r$ są na karcie o kątach.",
          tex: "b^2=H^2+R^2\\qquad h^2=H^2+r^2\\qquad b^2=h^2+\\left(\\frac{a}{2}\\right)^2",
          litery: "$b$ – krawędź boczna, $h$ – wysokość ściany bocznej (opuszczona z $S$), $H$ – wysokość ostrosłupa, $a$ – krawędź podstawy.",
          przyklad: "Ostrosłup prawidłowy czworokątny: $a=6$, $H=4$. Wtedy $r=3$, $h=\\sqrt{16+9}=5$, $R=3\\sqrt{2}$, $b=\\sqrt{16+18}=\\sqrt{34}$. Sprawdzenie: $h^2+3^2=25+9=34=b^2$.",
          uwaga: "Wysokość ściany bocznej $h$ jest dłuższa od $H$ i od $r$; nie myl jej z wysokością ostrosłupa.",
        },
        {
          nazwa: "Czworościan foremny",
          slownie: "Czworościan foremny ma cztery ściany będące przystającymi trójkątami równobocznymi o boku $a$. Spodek wysokości jest środkiem ściany podstawy, więc $R=\\frac{a\\sqrt{3}}{3}$, a wysokość wynika z twierdzenia Pitagorasa: $H^2=a^2-R^2$.",
          tex: "H=\\frac{a\\sqrt{6}}{3}\\qquad P_c=a^2\\sqrt{3}\\qquad V=\\frac{a^3\\sqrt{2}}{12}",
          litery: "$a$ – krawędź czworościanu, $H$ – wysokość, $P_c$ – pole powierzchni całkowitej, $V$ – objętość.",
          przyklad: "$a=6$: $R=2\\sqrt{3}$, $H=\\sqrt{36-12}=\\sqrt{24}=2\\sqrt{6}$, $P_c=36\\sqrt{3}$, $V=\\frac{216\\sqrt{2}}{12}=18\\sqrt{2}$.",
          uwaga: "Wysokość czworościanu jest krótsza niż jego krawędź, a $R$ jest odległością do wierzchołka, a nie do krawędzi podstawy.",
        },
      ],
      jak: [
        "Ustal, jaki to ostrosłup (trójkątny, czworokątny czy sześciokątny) i które odcinki są dane: $a$, $H$, $b$ albo $h$.",
        "Oblicz $R$ albo $r$ z podstawy (wzory z karty o kątach).",
        "Wybierz właściwy trójkąt prostokątny: z $R$ dostajesz krawędź boczną $b$, z $r$ wysokość ściany bocznej $h$.",
        "Zapisz twierdzenie Pitagorasa, podstaw dane i oblicz brakujący odcinek.",
      ],
      zadania: [
        {
          nr: "22",
          tresc: "Podstawą ostrosłupa prawidłowego czworokątnego jest kwadrat o boku $6$ cm, a wysokość ściany bocznej ma $5$ cm. Jaką wysokość ma ten ostrosłup? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\sqrt{7}$ cm", "$\\sqrt{34}$ cm", "$2$ cm", "$4$ cm"],
          poprawna: 3,
        },
        {
          nr: "23",
          tresc: "Ostrosłup ma $9$ ścian. Ile krawędzi ma ten ostrosłup? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$", "$16$", "$18$", "$24$"],
          poprawna: 1,
        },
        {
          nr: "24",
          tresc: "Podstawą ostrosłupa prawidłowego trójkątnego $ABCS$ jest trójkąt równoboczny $ABC$ o boku $6$ cm, a punkt $O$ jest spodkiem wysokości ostrosłupa. Jaką długość ma odcinek $AO$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2\\sqrt{3}$ cm", "$3\\sqrt{3}$ cm", "$\\sqrt{3}$ cm", "$3$ cm"],
          poprawna: 0,
        },
        {
          nr: "25",
          tresc: "Podstawą ostrosłupa prawidłowego sześciokątnego jest sześciokąt foremny o boku $4$ cm, a wysokość ostrosłupa ma $3$ cm. Jaką długość ma krawędź boczna tego ostrosłupa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\sqrt{21}$ cm", "$7$ cm", "$5$ cm", "$\\sqrt{7}$ cm"],
          poprawna: 2,
        },
        {
          nr: "26",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Spodek wysokości ostrosłupa prawidłowego jest środkiem podstawy.", litery: "PF", poprawna: 0 },
            { tekst: "W ostrosłupie prawidłowym wszystkie ściany boczne są trójkątami równobocznymi.", litery: "PF", poprawna: 1 },
            { tekst: "Ostrosłup prawidłowy sześciokątny ma $7$ wierzchołków i $12$ krawędzi.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "27",
          punkty: 2,
          tresc: "Podstawą ostrosłupa prawidłowego czworokątnego $ABCDS$ jest kwadrat o boku $6\\sqrt{2}$ cm, a wysokość ostrosłupa ma $8$ cm. Oblicz długość przekątnej podstawy i długość krawędzi bocznej. **Zapisz obliczenia.**",
          rozwiazanie: "Przekątna kwadratu o boku $a=6\\sqrt{2}$: $|AC|=a\\sqrt{2}=6\\sqrt{2}\\cdot\\sqrt{2}=12$ cm.\n\nSpodek wysokości $O$ jest środkiem przekątnej, więc $|AO|=6$ cm.\n\nW trójkącie prostokątnym $AOS$: $|AS|^2=|AO|^2+H^2=6^2+8^2=100$.\n\n$|AS|=10$ cm.\n\nOdpowiedź: Przekątna podstawy ma $12$ cm, a krawędź boczna $10$ cm.",
        },
        {
          nr: "28",
          punkty: 3,
          tresc: "Podstawą ostrosłupa prawidłowego trójkątnego $ABCS$ jest trójkąt równoboczny $ABC$ o boku $6\\sqrt{3}$ cm, a wysokość ostrosłupa ma $8$ cm. Oblicz długość krawędzi bocznej i sinus kąta nachylenia krawędzi bocznej do płaszczyzny podstawy. **Zapisz obliczenia.**",
          rozwiazanie: "Wysokość trójkąta równobocznego w podstawie: $\\frac{a\\sqrt{3}}{2}=\\frac{6\\sqrt{3}\\cdot\\sqrt{3}}{2}=9$ cm.\n\nSpodek wysokości $O$ dzieli ją w stosunku $2:1$, więc $|AO|=R=\\frac23\\cdot9=6$ cm.\n\nKrawędź boczna: $|AS|^2=6^2+8^2=100$, więc $|AS|=10$ cm.\n\nKąt nachylenia krawędzi do podstawy to $\\angle SAO$: $\\sin\\angle SAO=\\frac{H}{|AS|}=\\frac{8}{10}=\\frac45$.\n\nOdpowiedź: Krawędź boczna ma $10$ cm, a sinus kąta nachylenia jest równy $\\frac45$.",
        },
      ],
      generatory: [
        {
          id: "odcinki-w-ostroslupie",
          nazwa: "Odcinki w ostrosłupie",
          opis: "Ostrosłup prawidłowy trójkątny, czworokątny lub sześciokątny: oblicz krawędź boczną, wysokość ściany bocznej albo wysokość ostrosłupa.",
          generuj(r) {
            const n = r.pick([3, 4, 6]);
            const sciana = r.chance();
            const szukamH = r.chance();
            const opcje = [];
            for (const [p, s, z] of TROJKI) {
              for (const [rho, H] of p === s ? [[p, s]] : [[p, s], [s, p]]) {
                if (rho <= 9 && !(n === 6 && sciana && rho % 3)) opcje.push([rho, H, z]);
              }
            }
            const [rho, H, z] = r.pick(opcje);
            const a = bokDla(n, sciana ? "r" : "R", rho);
            const p = PODST[n];
            const baza = p.p;
            const opisDl = sciana ? `wysokość ściany bocznej $${baza[0]}${baza[1]}S$ opuszczoną z wierzchołka $S$` : `długość krawędzi bocznej $${baza[0]}S$`;
            const nazwa = sciana ? "|SM|" : `|${baza[0]}S|`;
            const start = `Podstawą ostrosłupa prawidłowego ${p.przym} $${baza}S$ jest ${p.wielokat} o boku $${radTex(a)}$ cm`;
            const krok1 = sciana
              ? `Niech $O$ będzie spodkiem wysokości, a $M$ środkiem krawędzi $${baza[0]}${baza[1]}$. Wtedy $|OM|=r=${r_TEX[n]}=${rho}$ cm (dla $a=${radTex(a)}$ cm).`
              : `Niech $O$ będzie spodkiem wysokości. Wtedy $|${baza[0]}O|=R=${R_TEX[n]}=${rho}$ cm (dla $a=${radTex(a)}$ cm).`;
            if (szukamH) {
              return {
                tresc: `${start}, a ${sciana ? "wysokość ściany bocznej opuszczona z wierzchołka $S$" : `krawędź boczna $${baza[0]}S$`} ma $${z}$ cm. Oblicz wysokość tego ostrosłupa (w cm).`,
                pola: [pole("w", "$H=$")],
                odpowiedz: { w: q(H) },
                wynik: `$H=${H}$ cm`,
                rozwiazanie: [krok1, `$H^2=${z}^2-${rho}^2=${z * z - rho * rho}$.`, `$H=${H}$ cm.`],
              };
            }
            return {
              tresc: `${start}, a wysokość ostrosłupa ma $${H}$ cm. Oblicz ${opisDl} (w cm).`,
              pola: [pole("w", `$${nazwa}=$`)],
              odpowiedz: { w: q(z) },
              wynik: `$${nazwa}=${z}$ cm`,
              rozwiazanie: [krok1, `$${nazwa}^2=${rho}^2+${H}^2=${rho * rho + H * H}$.`, `$${nazwa}=${z}$ cm.`],
            };
          },
        },
        {
          id: "liczba-elementow",
          nazwa: "Wierzchołki, krawędzie, ściany",
          opis: "Graniastosłup albo ostrosłup o podstawie $n$-kątnej: policz wierzchołki, krawędzie lub ściany, także gdy dana jest liczba innych elementów.",
          generuj(r) {
            const graniastoslup = r.chance();
            const n = r.int(3, 11);
            const licz = graniastoslup
              ? [(k) => 2 * k, (k) => 3 * k, (k) => k + 2]
              : [(k) => k + 1, (k) => 2 * k, (k) => k + 1];
            const slowa = [
              (v) => lm(v, "wierzchołek", "wierzchołki", "wierzchołków"),
              (v) => lm(v, "krawędź", "krawędzie", "krawędzi"),
              (v) => lm(v, "ściana", "ściany", "ścian"),
            ];
            const nazwa = graniastoslup ? "graniastosłup" : "ostrosłup";
            const wzory = graniastoslup ? ["2n", "3n", "n+2"] : ["n+1", "2n", "n+1"];
            const tryb = r.int(0, 3);
            const y = r.int(0, 2);
            if (tryb === 0) {
              const w = licz[y](n);
              return {
                tresc: `Podstawą ${graniastoslup ? "graniastosłupa" : "ostrosłupa"} jest wielokąt o $${n}$ bokach. Ile ${["wierzchołków", "krawędzi", "ścian"][y]} ma ten ${nazwa}?`,
                pola: [pole("w", "Liczba $=$")],
                odpowiedz: { w: q(w) },
                wynik: `$${w}$`,
                rozwiazanie: [`Dla $n=${n}$ liczba ${["wierzchołków", "krawędzi", "ścian"][y]} jest równa $${wzory[y]}$.`, `$${wzory[y]}=${w}$.`],
              };
            }
            const x = (y + r.int(1, 2)) % 3;
            const v = licz[x](n);
            const w = licz[y](n);
            return {
              tresc: `${graniastoslup ? "Graniastosłup" : "Ostrosłup"} ma $${v}$ ${slowa[x](v)}. Ile ${["wierzchołków", "krawędzi", "ścian"][y]} ma ten ${nazwa}?`,
              pola: [pole("w", "Liczba $=$")],
              odpowiedz: { w: q(w) },
              wynik: `$${w}$`,
              rozwiazanie: [
                `Dla podstawy o $n$ bokach liczba ${["wierzchołków", "krawędzi", "ścian"][x]} to $${wzory[x]}$. Z równania $${wzory[x]}=${v}$ dostajemy $n=${n}$.`,
                `Liczba ${["wierzchołków", "krawędzi", "ścian"][y]} to $${wzory[y]}=${w}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Siatka, pole powierzchni i objętość
    {
      id: "pole-objetosc",
      nazwa: "Siatka wielościanu. Pole powierzchni i objętość",
      sciaga: [
        {
          nazwa: "Siatka i pole powierzchni",
          slownie: "Siatka wielościanu to wszystkie jego ściany rozłożone na płaszczyźnie. Pole powierzchni całkowitej to suma pól wszystkich ścian. Pole powierzchni bocznej to suma pól ścian bocznych.",
          tex: "P_c=P_p+P_b\\qquad P_c=2P_p+P_b",
          litery: "$P_p$ – pole jednej podstawy, $P_b$ – pole powierzchni bocznej, $P_c$ – pole całkowite. Pierwszy wzór dotyczy ostrosłupa (jedna podstawa), drugi graniastosłupa (dwie podstawy).",
          przyklad: "Prostopadłościan o krawędziach $3$, $4$, $5$ ma sześć prostokątnych ścian: $P_c=2\\cdot12+2\\cdot15+2\\cdot20=94$.",
          uwaga: "W graniastosłupie liczymy dwie podstawy, a w ostrosłupie jedną.",
        },
        {
          nazwa: "Prostopadłościan i sześcian",
          slownie: "Pole powierzchni prostopadłościanu to suma pól trzech par ścian. Objętość to iloczyn trzech krawędzi wychodzących z jednego wierzchołka. Sześcian ma wszystkie krawędzie równe.",
          tex: "P_c=2(ab+bc+ac)\\qquad V=abc\\qquad P_c=6a^2\\qquad V=a^3",
          litery: "$a$, $b$, $c$ – długości krawędzi prostopadłościanu; w sześcianie $a$ – krawędź.",
          przyklad: "Prostopadłościan $2\\times3\\times6$: $P_c=2(6+12+18)=72$ i $V=36$. Sześcian o krawędzi $4$: $P_c=96$, $V=64$.",
          uwaga: "Pole mierzymy w cm$^2$, a objętość w cm$^3$.",
        },
        {
          nazwa: "Pola podstaw",
          slownie: "Pole podstawy zależy od jej kształtu. Pole ściany bocznej ostrosłupa to połowa iloczynu krawędzi podstawy i wysokości $h$ tej ściany. Ściany boczne graniastosłupa prawidłowego to prostokąty $a\\times H$.",
          tex: "P_{\\triangle}=\\frac{a^2\\sqrt{3}}{4}\\qquad P_{\\square}=a^2\\qquad P_6=\\frac{3a^2\\sqrt{3}}{2}\\qquad P_{\\triangle S}=\\frac12ah",
          litery: "$P_{\\triangle}$ – trójkąt równoboczny o boku $a$, $P_{\\square}$ – kwadrat, $P_6$ – sześciokąt foremny, $P_{\\triangle S}$ – ściana boczna ostrosłupa.",
          przyklad: "$a=4$: trójkąt równoboczny ma pole $\\frac{16\\sqrt{3}}{4}=4\\sqrt{3}$, a sześciokąt foremny $\\frac{3\\cdot16\\sqrt{3}}{2}=24\\sqrt{3}$ (sześć trójkątów równobocznych).",
          uwaga: "Sześciokąt foremny składa się z sześciu trójkątów równobocznych o boku $a$.",
        },
        {
          nazwa: "Graniastosłup prawidłowy",
          slownie: "Graniastosłup ma $n$ ścian bocznych, każda to prostokąt $a\\times H$. Objętość to pole podstawy razy wysokość.",
          tex: "P_b=n\\cdot a\\cdot H\\qquad P_c=2P_p+P_b\\qquad V=P_p\\cdot H",
          litery: "$n$ – liczba boków podstawy, $a$ – krawędź podstawy, $H$ – wysokość, $P_p$ – pole podstawy.",
          przyklad: "Graniastosłup prawidłowy trójkątny, $a=4$, $H=5$: $P_p=4\\sqrt{3}$, $P_b=3\\cdot4\\cdot5=60$, $P_c=8\\sqrt{3}+60$, $V=4\\sqrt{3}\\cdot5=20\\sqrt{3}$.",
          uwaga: "Pole boczne nie zawiera podstaw. Do $P_c$ dodajemy dwa pola podstaw.",
        },
        {
          nazwa: "Ostrosłup prawidłowy",
          slownie: "Ostrosłup ma $n$ ścian bocznych, każda to trójkąt o podstawie $a$ i wysokości $h$. Objętość to jedna trzecia iloczynu pola podstawy i wysokości ostrosłupa.",
          tex: "P_b=n\\cdot\\frac12ah\\qquad P_c=P_p+P_b\\qquad V=\\frac13P_pH",
          litery: "$h$ – wysokość ściany bocznej, $H$ – wysokość ostrosłupa, $P_p$ – pole podstawy.",
          przyklad: "Ostrosłup prawidłowy czworokątny: $a=6$, $H=4$, $h=5$. $P_p=36$, $P_b=4\\cdot\\frac12\\cdot6\\cdot5=60$, $P_c=96$, $V=\\frac13\\cdot36\\cdot4=48$.",
          uwaga: "W $P_b$ występuje $h$ (wysokość ściany), a w $V$ wysokość ostrosłupa $H$. Nie zapomnij o $\\frac13$.",
        },
      ],
      jak: [
        "Ustal rodzaj bryły i dane: $a$, $H$, a dla ostrosłupa także $h$ (policz je z twierdzenia Pitagorasa z $H$ i $r$, jeśli nie jest podane).",
        "Oblicz pole podstawy $P_p$ według jej kształtu.",
        "Oblicz pole boczne: $n\\cdot a\\cdot H$ (graniastosłup) albo $n\\cdot\\frac12ah$ (ostrosłup), potem $P_c$.",
        "Objętość: $V=P_pH$ albo $V=\\frac13P_pH$. Dopisz jednostki: cm$^2$ dla pól, cm$^3$ dla objętości.",
      ],
      zadania: [
        {
          nr: "29",
          tresc: "Prostopadłościan ma krawędzie długości $3$ cm, $4$ cm i $5$ cm. Jakie jest pole powierzchni całkowitej tego prostopadłościanu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$47$ cm$^2$", "$60$ cm$^2$", "$94$ cm$^2$", "$188$ cm$^2$"],
          poprawna: 2,
        },
        {
          nr: "30",
          tresc: "Przekątna sześcianu ma długość $4\\sqrt{3}$ cm. Jaka jest objętość tego sześcianu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$96$ cm$^3$", "$64$ cm$^3$", "$48\\sqrt{3}$ cm$^3$", "$16\\sqrt{3}$ cm$^3$"],
          poprawna: 1,
        },
        {
          nr: "31",
          tresc: "Podstawą graniastosłupa prawidłowego czworokątnego jest kwadrat o boku $5$ cm, a wysokość graniastosłupa ma $8$ cm. Jakie jest pole powierzchni całkowitej tego graniastosłupa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$160$ cm$^2$", "$200$ cm$^2$", "$250$ cm$^2$", "$210$ cm$^2$"],
          poprawna: 3,
        },
        {
          nr: "32",
          tresc: "Podstawą ostrosłupa prawidłowego czworokątnego jest kwadrat o boku $6$ cm, a wysokość ostrosłupa ma $4$ cm. Jaka jest objętość tego ostrosłupa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$48$ cm$^3$", "$144$ cm$^3$", "$24$ cm$^3$", "$96$ cm$^3$"],
          poprawna: 0,
        },
        {
          nr: "33",
          tresc: "Podstawą ostrosłupa prawidłowego trójkątnego jest trójkąt równoboczny o boku $6$ cm, a wysokość każdej ściany bocznej ma $4$ cm. Jakie jest pole powierzchni całkowitej tego ostrosłupa? **Wybierz właściwą odpowiedź.**",
          opcje: ["$45\\sqrt{3}$ cm$^2$", "$9\\sqrt{3}+36$ cm$^2$", "$18\\sqrt{3}+36$ cm$^2$", "$9\\sqrt{3}+12$ cm$^2$"],
          poprawna: 1,
        },
        {
          nr: "34",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Pole powierzchni całkowitej graniastosłupa prawidłowego sześciokątnego o krawędzi podstawy $a$ i wysokości $H$ jest równe $3a^2\\sqrt{3}+6aH$.", litery: "PF", poprawna: 0 },
            { tekst: "Ostrosłup o polu podstawy $12$ cm$^2$ i wysokości $5$ cm ma objętość $60$ cm$^3$.", litery: "PF", poprawna: 1 },
            { tekst: "Jeśli w ostrosłupie podwoimy wysokość, nie zmieniając podstawy, to jego objętość też się podwoi.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "35",
          punkty: 3,
          tresc: "Graniastosłup prawidłowy trójkątny ma krawędź podstawy $4$ cm, a przekątna ściany bocznej ma $5$ cm. Oblicz pole powierzchni całkowitej i objętość tego graniastosłupa. **Zapisz obliczenia.**",
          rozwiazanie: "Ściana boczna jest prostokątem $4\\times H$ o przekątnej $5$: $4^2+H^2=5^2$, więc $H=3$ cm.\n\nPole podstawy (trójkąt równoboczny): $P_p=\\frac{4^2\\sqrt{3}}{4}=4\\sqrt{3}$ cm$^2$.\n\nPole powierzchni bocznej: $P_b=3\\cdot4\\cdot3=36$ cm$^2$.\n\nPole całkowite: $P_c=2\\cdot4\\sqrt{3}+36=8\\sqrt{3}+36$ cm$^2$.\n\nObjętość: $V=P_pH=4\\sqrt{3}\\cdot3=12\\sqrt{3}$ cm$^3$.\n\nOdpowiedź: $P_c=8\\sqrt{3}+36$ cm$^2$, $V=12\\sqrt{3}$ cm$^3$.",
        },
        {
          nr: "36",
          punkty: 3,
          tresc: "Podstawą ostrosłupa prawidłowego czworokątnego $ABCDS$ jest kwadrat o boku $8$ cm, a wysokość ostrosłupa ma $3$ cm. Oblicz pole powierzchni całkowitej i objętość tego ostrosłupa. **Zapisz obliczenia.**",
          rozwiazanie: "Niech $M$ będzie środkiem krawędzi $AB$ i $O$ środkiem podstawy. Wtedy $|OM|=\\frac{8}{2}=4$ cm.\n\nWysokość ściany bocznej: $h=|SM|=\\sqrt{3^2+4^2}=5$ cm.\n\nPole ściany bocznej: $\\frac12\\cdot8\\cdot5=20$ cm$^2$, więc $P_b=4\\cdot20=80$ cm$^2$.\n\nPole podstawy: $P_p=8^2=64$ cm$^2$, więc $P_c=64+80=144$ cm$^2$.\n\nObjętość: $V=\\frac13\\cdot64\\cdot3=64$ cm$^3$.\n\nOdpowiedź: $P_c=144$ cm$^2$, $V=64$ cm$^3$.",
        },
      ],
      generatory: [
        {
          id: "graniastoslup-pole-objetosc",
          nazwa: "Graniastosłup: pole i objętość",
          opis: "Prostopadłościan, sześcian albo graniastosłup prawidłowy (trójkątny, czworokątny, sześciokątny): oblicz pole powierzchni bocznej, całkowitej lub objętość.",
          generuj(r) {
            const tryb = r.int(0, 5);
            if (tryb <= 1) {
              const a = r.int(2, 8);
              const b = r.int(2, 8);
              const c = r.int(2, 9);
              if (tryb === 0) {
                const w = 2 * (a * b + b * c + a * c);
                return {
                  tresc: `Krawędzie prostopadłościanu wychodzące z jednego wierzchołka mają długości $${a}$ cm, $${b}$ cm i $${c}$ cm. Oblicz pole powierzchni całkowitej tego prostopadłościanu (w cm$^2$).`,
                  pola: [pole("w", "$P_c=$")],
                  odpowiedz: { w: q(w) },
                  wynik: `$P_c=${w}$ ${CM2}`,
                  rozwiazanie: [`$P_c=2(ab+bc+ac)=2(${a * b}+${b * c}+${a * c})$.`, `$P_c=2\\cdot${a * b + b * c + a * c}=${w}$ ${CM2}.`],
                };
              }
              const w = a * b * c;
              return {
                tresc: `Krawędzie prostopadłościanu wychodzące z jednego wierzchołka mają długości $${a}$ cm, $${b}$ cm i $${c}$ cm. Oblicz objętość tego prostopadłościanu (w cm$^3$).`,
                pola: [pole("w", "$V=$")],
                odpowiedz: { w: q(w) },
                wynik: `$V=${w}$ ${CM3}`,
                rozwiazanie: [`$V=abc=${a}\\cdot${b}\\cdot${c}$.`, `$V=${w}$ ${CM3}.`],
              };
            }
            if (tryb === 2) {
              const a = r.int(2, 9);
              const pc = r.chance();
              return {
                tresc: `Sześcian ma krawędź długości $${a}$ cm. Oblicz ${pc ? "pole powierzchni całkowitej" : "objętość"} tego sześcianu (w ${pc ? "cm$^2$" : "cm$^3$"}).`,
                pola: [pole("w", pc ? "$P_c=$" : "$V=$")],
                odpowiedz: { w: q(pc ? 6 * a * a : a * a * a) },
                wynik: pc ? `$P_c=${6 * a * a}$ ${CM2}` : `$V=${a * a * a}$ ${CM3}`,
                rozwiazanie: pc ? [`Sześcian ma $6$ ścian o polu $a^2$: $P_c=6a^2=6\\cdot${a}^2$.`, `$P_c=${6 * a * a}$ ${CM2}.`] : [`$V=a^3=${a}^3$.`, `$V=${a * a * a}$ ${CM3}.`],
              };
            }
            if (tryb === 3) {
              const a = r.int(2, 9);
              const H = r.int(2, 12);
              const co = r.int(0, 2);
              const start = `Podstawą graniastosłupa prawidłowego czworokątnego jest kwadrat o boku $${a}$ cm, a wysokość graniastosłupa ma $${H}$ cm.`;
              if (co === 0) {
                return {
                  tresc: `${start} Oblicz pole powierzchni bocznej tego graniastosłupa (w cm$^2$).`,
                  pola: [pole("w", "$P_b=$")],
                  odpowiedz: { w: q(4 * a * H) },
                  wynik: `$P_b=${4 * a * H}$ ${CM2}`,
                  rozwiazanie: [`Cztery ściany boczne są prostokątami $${a}\\times${H}$.`, `$P_b=4\\cdot${a}\\cdot${H}=${4 * a * H}$ ${CM2}.`],
                };
              }
              if (co === 1) {
                const w = 2 * a * a + 4 * a * H;
                return {
                  tresc: `${start} Oblicz pole powierzchni całkowitej tego graniastosłupa (w cm$^2$).`,
                  pola: [pole("w", "$P_c=$")],
                  odpowiedz: { w: q(w) },
                  wynik: `$P_c=${w}$ ${CM2}`,
                  rozwiazanie: [`Dwie podstawy: $2\\cdot${a}^2=${2 * a * a}$. Pole boczne: $4\\cdot${a}\\cdot${H}=${4 * a * H}$.`, `$P_c=${2 * a * a}+${4 * a * H}=${w}$ ${CM2}.`],
                };
              }
              return {
                tresc: `${start} Oblicz objętość tego graniastosłupa (w cm$^3$).`,
                pola: [pole("w", "$V=$")],
                odpowiedz: { w: q(a * a * H) },
                wynik: `$V=${a * a * H}$ ${CM3}`,
                rozwiazanie: [`$P_p=${a}^2=${a * a}$.`, `$V=P_pH=${a * a}\\cdot${H}=${a * a * H}$ ${CM3}.`],
              };
            }
            if (tryb === 4) {
              const a = r.int(2, 10);
              const H = r.int(2, 12);
              if (r.chance()) {
                return {
                  tresc: `Podstawą graniastosłupa prawidłowego trójkątnego jest trójkąt równoboczny o boku $${a}$ cm, a wysokość graniastosłupa ma $${H}$ cm. Oblicz pole powierzchni bocznej tego graniastosłupa (w cm$^2$).`,
                  pola: [pole("w", "$P_b=$")],
                  odpowiedz: { w: q(3 * a * H) },
                  wynik: `$P_b=${3 * a * H}$ ${CM2}`,
                  rozwiazanie: [`Trzy ściany boczne są prostokątami $${a}\\times${H}$.`, `$P_b=3\\cdot${a}\\cdot${H}=${3 * a * H}$ ${CM2}.`],
                };
              }
              const pp = pTrojkata(a);
              const V = rad(Q.z(a * a * H).div(4), 3);
              const o = odp(V, "V", CM3);
              return {
                tresc: `Podstawą graniastosłupa prawidłowego trójkątnego jest trójkąt równoboczny o boku $${a}$ cm, a wysokość graniastosłupa ma $${H}$ cm. Oblicz objętość tego graniastosłupa (w cm$^3$).${o.dopisek}`,
                pola: o.pola,
                odpowiedz: { w: V.k },
                wynik: o.wynik,
                rozwiazanie: [`Pole podstawy: $P_p=\\frac{a^2\\sqrt{3}}{4}=\\frac{${a}^2\\sqrt{3}}{4}=${radTex(pp)}$ ${CM2}.`, `$V=P_pH=${radTex(pp)}\\cdot${H}=${radTex(V)}$ ${CM3}.`],
              };
            }
            const a = r.int(2, 8);
            const H = r.int(2, 10);
            if (r.chance()) {
              return {
                tresc: `Podstawą graniastosłupa prawidłowego sześciokątnego jest sześciokąt foremny o boku $${a}$ cm, a wysokość graniastosłupa ma $${H}$ cm. Oblicz pole powierzchni bocznej tego graniastosłupa (w cm$^2$).`,
                pola: [pole("w", "$P_b=$")],
                odpowiedz: { w: q(6 * a * H) },
                wynik: `$P_b=${6 * a * H}$ ${CM2}`,
                rozwiazanie: [`Sześć ścian bocznych jest prostokątami $${a}\\times${H}$.`, `$P_b=6\\cdot${a}\\cdot${H}=${6 * a * H}$ ${CM2}.`],
              };
            }
            const pp = pSzesciokata(a);
            const V = rad(Q.z(3 * a * a * H).div(2), 3);
            const o = odp(V, "V", CM3);
            return {
              tresc: `Podstawą graniastosłupa prawidłowego sześciokątnego jest sześciokąt foremny o boku $${a}$ cm, a wysokość graniastosłupa ma $${H}$ cm. Oblicz objętość tego graniastosłupa (w cm$^3$).${o.dopisek}`,
              pola: o.pola,
              odpowiedz: { w: V.k },
              wynik: o.wynik,
              rozwiazanie: [`Pole podstawy (sześć trójkątów równobocznych): $P_p=\\frac{3a^2\\sqrt{3}}{2}=\\frac{3\\cdot${a}^2\\sqrt{3}}{2}=${radTex(pp)}$ ${CM2}.`, `$V=P_pH=${radTex(pp)}\\cdot${H}=${radTex(V)}$ ${CM3}.`],
            };
          },
        },
        {
          id: "ostroslup-pole-objetosc",
          nazwa: "Ostrosłup: pole i objętość",
          opis: "Ostrosłup prawidłowy trójkątny, czworokątny lub sześciokątny albo czworościan foremny: oblicz pole powierzchni bocznej, całkowitej, objętość lub wysokość.",
          generuj(r) {
            const tryb = r.int(0, 3);
            if (tryb === 3) {
              const a = r.int(2, 6);
              const co = r.int(0, 2);
              const start = `Czworościan foremny $ABCS$ ma krawędź długości $${a}$ cm.`;
              if (co === 0) {
                const w = rad(a * a, 3);
                const o = odp(w, "P_c", CM2);
                return {
                  tresc: `${start} Oblicz pole powierzchni całkowitej tego czworościanu (w cm$^2$).${o.dopisek}`,
                  pola: o.pola,
                  odpowiedz: { w: w.k },
                  wynik: o.wynik,
                  rozwiazanie: [`Wszystkie cztery ściany są trójkątami równobocznymi o boku $${a}$ cm. Jedna ma pole $\\frac{${a}^2\\sqrt{3}}{4}=${radTex(pTrojkata(a))}$.`, `$P_c=4\\cdot${radTex(pTrojkata(a))}=${radTex(w)}$ ${CM2}.`],
                };
              }
              const R = rad(Q.z(a).div(3), 3);
              const H = rad(Q.z(a).div(3), 6);
              if (co === 1) {
                const o = odp(H, "H", "cm");
                return {
                  tresc: `${start} Oblicz wysokość tego czworościanu (w cm).${o.dopisek}`,
                  pola: o.pola,
                  odpowiedz: { w: H.k },
                  wynik: o.wynik,
                  rozwiazanie: [`Spodek wysokości jest środkiem podstawy: $R=\\frac{a\\sqrt{3}}{3}=${radTex(R)}$ cm.`, `$H^2=a^2-R^2=${a * a}-${R.k.mul(R.k).mul(3).tex()}=${Q.z(a * a).sub(R.k.mul(R.k).mul(3)).tex()}$.`, (radTex(H) === `\\sqrt{${Q.z(a * a).sub(R.k.mul(R.k).mul(3)).tex()}}` ? `$H=${radTex(H)}$ cm.` : `$H=\\sqrt{${Q.z(a * a).sub(R.k.mul(R.k).mul(3)).tex()}}=${radTex(H)}$ cm.`)],
                };
              }
              const V = rad(Q.z(a * a * a).div(12), 2);
              const o = odp(V, "V", CM3);
              return {
                tresc: `${start} Oblicz objętość tego czworościanu (w cm$^3$).${o.dopisek}`,
                pola: o.pola,
                odpowiedz: { w: V.k },
                wynik: o.wynik,
                rozwiazanie: [`Pole podstawy: $P_p=\\frac{${a}^2\\sqrt{3}}{4}=${radTex(pTrojkata(a))}$ ${CM2}. Wysokość: $H=\\frac{a\\sqrt{6}}{3}=${radTex(H)}$ cm.`, `$V=\\frac13P_pH=\\frac13\\cdot${radTex(pTrojkata(a))}\\cdot${radTex(H)}$.`, `$V=${radTex(V)}$ ${CM3}.`],
              };
            }
            const n = r.pick([3, 4, 6]);
            const opcje = [];
            for (const [x, y, z] of TROJKI) {
              for (const [rho, H] of [[x, y], [y, x]]) {
                if (rho <= 9 && !(n === 6 && rho % 3)) opcje.push([rho, H, z]);
              }
            }
            const [rho, H, h] = r.pick(opcje);
            const a = bokDla(n, "r", rho);
            const p = PODST[n];
            const baza = p.p;
            const aTex = radTex(a);
            const m = rho / (n === 6 ? 3 : 1); // wsp. pomocniczy: a = 2m (kwadrat) albo 2m√3
            const aInt = n === 4 ? 2 * rho : 0;
            // pola podstawy i ściany bocznej (jako k·√s)
            let pp;
            if (n === 3) pp = rad(3 * rho * rho, 3);
            else if (n === 4) pp = rad(aInt * aInt);
            else pp = rad(18 * m * m, 3);
            const start = `Podstawą ostrosłupa prawidłowego ${p.przym} $${baza}S$ jest ${p.wielokat} o boku $${aTex}$ cm`;
            const krokPp = n === 3
              ? `$P_p=\\frac{a^2\\sqrt{3}}{4}=\\frac{(${aTex})^2\\sqrt{3}}{4}=${radTex(pp)}$ ${CM2}.`
              : n === 4
                ? `$P_p=a^2=${aInt}^2=${pp.k.tex()}$ ${CM2}.`
                : `$P_p=\\frac{3a^2\\sqrt{3}}{2}=\\frac{3\\cdot(${aTex})^2\\sqrt{3}}{2}=${radTex(pp)}$ ${CM2}.`;
            const krokH = `Niech $M$ będzie środkiem krawędzi $${baza[0]}${baza[1]}$, a $O$ środkiem podstawy. Wtedy $|OM|=r=${r_TEX[n]}=${rho}$ cm i $h^2=H^2+r^2=${H}^2+${rho}^2=${h * h}$, więc $h=${h}$ cm.`;
            if (tryb === 0) {
              const V = rad(pp.k.mul(H).div(3), pp.s);
              const o = odp(V, "V", CM3);
              return {
                tresc: `${start}, a wysokość ostrosłupa ma $${H}$ cm. Oblicz objętość tego ostrosłupa (w cm$^3$).${o.dopisek}`,
                pola: o.pola,
                odpowiedz: { w: V.k },
                wynik: o.wynik,
                rozwiazanie: [krokPp, `$V=\\frac13P_pH=\\frac13\\cdot${radTex(pp)}\\cdot${H}$.`, `$V=${radTex(V)}$ ${CM3}.`],
              };
            }
            // pole powierzchni bocznej: n·(1/2)·a·h
            const Pb = n === 3 ? rad(3 * rho * h, 3) : n === 4 ? rad(4 * rho * h) : rad(2 * rho * h, 3);
            const znaH = r.chance();
            const dane = znaH ? `a wysokość ostrosłupa ma $${H}$ cm` : `a wysokość każdej ściany bocznej ma $${h}$ cm`;
            const krokPb = `$P_b=${n}\\cdot\\frac12ah=${n}\\cdot\\frac12\\cdot${aTex}\\cdot${h}=${radTex(Pb)}$ ${CM2}.`;
            if (tryb === 1 || n !== 4) {
              const o = odp(Pb, "P_b", CM2);
              return {
                tresc: `${start}, ${dane}. Oblicz pole powierzchni bocznej tego ostrosłupa (w cm$^2$).${o.dopisek}`,
                pola: o.pola,
                odpowiedz: { w: Pb.k },
                wynik: o.wynik,
                rozwiazanie: znaH ? [krokH, krokPb] : [krokPb],
              };
            }
            const Pc = rad(pp.k.add(Pb.k));
            const o = odp(Pc, "P_c", CM2);
            return {
              tresc: `${start}, ${dane}. Oblicz pole powierzchni całkowitej tego ostrosłupa (w cm$^2$).${o.dopisek}`,
              pola: o.pola,
              odpowiedz: { w: Pc.k },
              wynik: o.wynik,
              rozwiazanie: (znaH ? [krokH] : []).concat([krokPp, krokPb, `$P_c=P_p+P_b=${pp.k.tex()}+${Pb.k.tex()}=${Pc.k.tex()}$ ${CM2}.`]),
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------ Wielościany podobne
    {
      id: "podobne",
      nazwa: "Wielościany podobne",
      sciaga: [
        {
          nazwa: "Wielościany podobne i skala",
          slownie: "Dwa wielościany są podobne, gdy jeden jest powiększeniem (albo pomniejszeniem) drugiego. Wszystkie odpowiadające sobie odcinki (krawędzie, wysokości, przekątne) mają ten sam stosunek $k$, czyli skalę podobieństwa, a odpowiadające sobie kąty są równe.",
          tex: "k=\\frac{a'}{a}",
          litery: "$a$ – długość odcinka w pierwszym wielościanie, $a'$ – długość odpowiadającego odcinka w drugim, $k$ – skala podobieństwa.",
          przyklad: "Krawędź pierwszego prostopadłościanu ma $4$ cm, odpowiadająca jej krawędź drugiego $6$ cm. Skala to $k=\\frac64=\\frac32$.",
          uwaga: "Dwa sześciany są zawsze podobne, ale dwa prostopadłościany nie zawsze. Muszą mieć odpowiednie krawędzie w tym samym stosunku.",
        },
        {
          nazwa: "Pola i objętości brył podobnych",
          slownie: "Jeśli skala podobieństwa wielościanów wynosi $k$, to ich pola powierzchni (całkowite, boczne, pola odpowiadających ścian) są w stosunku $k^2$, a objętości w stosunku $k^3$.",
          tex: "\\frac{P'}{P}=k^2\\qquad\\frac{V'}{V}=k^3",
          litery: "$P$, $V$ – pole powierzchni i objętość pierwszego wielościanu, $P'$, $V'$ – drugiego.",
          przyklad: "Dla $k=3$ pole powierzchni rośnie $9$ razy, a objętość $27$ razy. Dla $k=\\frac12$ pole maleje $4$ razy, a objętość $8$ razy.",
          uwaga: "Pole mnożymy przez $k^2$, a objętość przez $k^3$ – nie przez samo $k$.",
        },
        {
          nazwa: "Skala z pola lub objętości",
          slownie: "Gdy znamy stosunek pól, skalę dostajemy z pierwiastka kwadratowego tego stosunku. Gdy znamy stosunek objętości, bierzemy pierwiastek sześcienny.",
          tex: "k=\\sqrt{\\frac{P'}{P}}\\qquad k=\\sqrt[3]{\\frac{V'}{V}}",
          litery: "$P'$, $P$ – pola, $V'$, $V$ – objętości; $k$ – skala.",
          przyklad: "Stosunek pól $\\frac{25}{4}$ daje $k=\\frac52$. Stosunek objętości $27$ daje $k=3$, bo $3^3=27$.",
          uwaga: "Stosunek pól to $k^2$, więc po wyciągnięciu pierwiastka dostajemy $k$, a nie stosunek pól.",
        },
      ],
      jak: [
        "Ustal, który wielościan jest pierwszy, a który drugi, i zapisz skalę $k$ (drugi do pierwszego).",
        "Długości mnóż przez $k$, pola przez $k^2$, objętości przez $k^3$.",
        "Gdy dany jest stosunek pól lub objętości, wyciągnij odpowiedni pierwiastek, aby dostać $k$.",
        "Dopisz jednostki (cm, cm$^2$, cm$^3$) i sprawdź, czy wynik ma sens (większy wielościan – większe wartości).",
      ],
      zadania: [
        {
          nr: "37",
          tresc: "Dwa ostrosłupy są podobne w skali $k=3$. Ile razy objętość większego ostrosłupa jest większa od objętości mniejszego? **Wybierz właściwą odpowiedź.**",
          opcje: ["$3$ razy", "$9$ razy", "$27$ razy", "$6$ razy"],
          poprawna: 2,
        },
        {
          nr: "38",
          tresc: "Pole powierzchni większego z dwóch sześcianów wynosi $150$ cm$^2$, a mniejszego $54$ cm$^2$. Jaka jest skala podobieństwa większego sześcianu do mniejszego? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{25}{9}$", "$\\frac{3}{5}$", "$\\frac{125}{27}$", "$\\frac{5}{3}$"],
          poprawna: 3,
        },
        {
          nr: "39",
          tresc: "Prostopadłościan o objętości $80$ cm$^3$ pomniejszono w skali $\\frac12$ i otrzymano prostopadłościan podobny. Jaka jest objętość nowego prostopadłościanu? **Wybierz właściwą odpowiedź.**",
          opcje: ["$10$ cm$^3$", "$40$ cm$^3$", "$20$ cm$^3$", "$5$ cm$^3$"],
          poprawna: 0,
        },
        {
          nr: "40",
          tresc: "Graniastosłupy $G_1$ i $G_2$ są podobne. Odpowiadające sobie krawędzie boczne mają $6$ cm i $9$ cm, a pole podstawy graniastosłupa $G_1$ jest równe $20$ cm$^2$. Jakie jest pole podstawy graniastosłupa $G_2$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$30$ cm$^2$", "$45$ cm$^2$", "$67{,}5$ cm$^2$", "$90$ cm$^2$"],
          poprawna: 1,
        },
        {
          nr: "41",
          tresc: "Objętość sześcianu wzrosła $8$ razy. Ile razy wzrosło jego pole powierzchni całkowitej? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2$ razy", "$6$ razy", "$8$ razy", "$4$ razy"],
          poprawna: 3,
        },
        {
          nr: "42",
          tresc: "**Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Wszystkie prostopadłościany o podstawie kwadratowej są podobne.", litery: "PF", poprawna: 1 },
            { tekst: "Jeśli stosunek pól powierzchni dwóch wielościanów podobnych wynosi $9$, to skala podobieństwa jest równa $3$.", litery: "PF", poprawna: 0 },
            { tekst: "Jeśli skala podobieństwa dwóch wielościanów wynosi $2$, to stosunek ich objętości wynosi $6$.", litery: "PF", poprawna: 1 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "43",
          punkty: 2,
          tresc: "Dwa ostrosłupy prawidłowe czworokątne są podobne. Krawędzie ich podstaw mają $6$ cm i $15$ cm. Mniejszy ostrosłup ma pole powierzchni całkowitej $96$ cm$^2$ i objętość $48$ cm$^3$. Oblicz pole powierzchni całkowitej i objętość większego ostrosłupa. **Zapisz obliczenia.**",
          rozwiazanie: "Skala podobieństwa większego ostrosłupa do mniejszego: $k=\\frac{15}{6}=\\frac52$.\n\nPola są w stosunku $k^2=\\frac{25}{4}$: $P_c'=96\\cdot\\frac{25}{4}=600$ cm$^2$.\n\nObjętości są w stosunku $k^3=\\frac{125}{8}$: $V'=48\\cdot\\frac{125}{8}=750$ cm$^3$.\n\nOdpowiedź: Większy ostrosłup ma pole powierzchni całkowitej $600$ cm$^2$ i objętość $750$ cm$^3$.",
        },
        {
          nr: "44",
          punkty: 3,
          tresc: "Makieta budynku w skali $1:10$ ma kształt ostrosłupa. Pole powierzchni całkowitej makiety wynosi $300$ cm$^2$, a jej objętość $400$ cm$^3$. Oblicz pole powierzchni całkowitej w m$^2$ i objętość w m$^3$ budynku w rzeczywistości, który ma tę samą bryłę. **Zapisz obliczenia.**",
          rozwiazanie: "Skala $1:10$ oznacza, że budynek jest $10$ razy większy od makiety, czyli $k=10$.\n\nPole: $P'=300\\cdot10^2=30\\,000$ cm$^2$. Ponieważ $1$ m$^2=10\\,000$ cm$^2$, to $P'=3$ m$^2$.\n\nObjętość: $V'=400\\cdot10^3=400\\,000$ cm$^3$. Ponieważ $1$ m$^3=1\\,000\\,000$ cm$^3$, to $V'=0{,}4$ m$^3$.\n\nOdpowiedź: Pole powierzchni całkowitej wynosi $3$ m$^2$, a objętość $0{,}4$ m$^3$.",
        },
      ],
      generatory: [
        {
          id: "skala-podobienstwa",
          nazwa: "Długość, pole, objętość",
          opis: "Dwa wielościany podobne w danej skali: oblicz odpowiednią krawędź, pole powierzchni albo objętość drugiego wielościanu.",
          generuj(r) {
            const [p, s] = r.pick([[2, 1], [3, 1], [4, 1], [5, 1], [10, 1], [1, 2], [1, 3], [3, 2], [5, 2], [2, 3], [4, 3], [5, 3]]);
            const wsp = r.int(2, 6);
            const tryb = r.int(0, 2);
            const [mn, wm] = r.pick([["Dwa graniastosłupy są podobne", "graniastosłupa"], ["Dwa ostrosłupy są podobne", "ostrosłupa"], ["Dwa wielościany są podobne", "wielościanu"], ["Dwa prostopadłościany są podobne", "prostopadłościanu"]]);
            const kTex = s === 1 ? `${p}` : `\\frac{${p}}{${s}}`;
            const start = `${mn}, a skala podobieństwa drugiego do pierwszego wynosi $k=${kTex}$.`;
            if (tryb === 0) {
              const d1 = s * wsp;
              const d2 = p * wsp;
              return {
                tresc: `${start} Krawędź pierwszego ma długość $${d1}$ cm. Oblicz długość odpowiadającej jej krawędzi drugiego (w cm).`,
                pola: [pole("w", "$a'=$")],
                odpowiedz: { w: q(d2) },
                wynik: `$a'=${d2}$ cm`,
                rozwiazanie: [`Długości mnożymy przez $k$.`, `$a'=${d1}\\cdot${kTex}=${d2}$ cm.`],
              };
            }
            if (tryb === 1) {
              const P1 = s * s * wsp;
              const P2 = p * p * wsp;
              return {
                tresc: `${start} Pole powierzchni całkowitej pierwszego wynosi $${P1}$ cm$^2$. Oblicz pole powierzchni całkowitej drugiego (w cm$^2$).`,
                pola: [pole("w", "$P'=$")],
                odpowiedz: { w: q(P2) },
                wynik: `$P'=${P2}$ ${CM2}`,
                rozwiazanie: [`Pola mnożymy przez $k^2=${s === 1 ? p * p : `\\frac{${p * p}}{${s * s}}`}$.`, `$P'=${P1}\\cdot${s === 1 ? p * p : `\\frac{${p * p}}{${s * s}}`}=${P2}$ ${CM2}.`],
              };
            }
            const V1 = s * s * s * wsp;
            const V2 = p * p * p * wsp;
            return {
              tresc: `${start} Objętość pierwszego wynosi $${V1}$ cm$^3$. Oblicz objętość drugiego (w cm$^3$).`,
              pola: [pole("w", "$V'=$")],
              odpowiedz: { w: q(V2) },
              wynik: `$V'=${V2}$ ${CM3}`,
              rozwiazanie: [`Objętości mnożymy przez $k^3=${s === 1 ? p * p * p : `\\frac{${p * p * p}}{${s * s * s}}`}$.`, `$V'=${V1}\\cdot${s === 1 ? p * p * p : `\\frac{${p * p * p}}{${s * s * s}}`}=${V2}$ ${CM3}.`],
            };
          },
        },
        {
          id: "skala-z-pol-i-objetosci",
          nazwa: "Skala z pól i objętości",
          opis: "Dane są pola powierzchni lub objętości dwóch wielościanów podobnych. Oblicz skalę podobieństwa większego do mniejszego.",
          generuj(r) {
            const [p, s] = r.pick([[2, 1], [3, 1], [4, 1], [5, 1], [3, 2], [5, 2], [4, 3], [5, 3], [7, 2], [7, 3]]);
            const wsp = r.int(1, 5);
            const tryb = r.int(0, 2);
            const [mn, d] = r.pick([["graniastosłupów", "graniastosłup"], ["ostrosłupów", "ostrosłup"], ["wielościanów", "wielościan"], ["sześcianów", "sześcian"]]);
            const ktex = s === 1 ? `${p}` : `\\frac{${p}}{${s}}`;
            if (tryb === 0 || (tryb === 1 && s > 2)) {
              const m = d === "sześcian" ? 6 * wsp : wsp;   // pole sześcianu to 6a², więc wielokrotność 6
              const P1 = s * s * m;
              const P2 = p * p * m;
              return {
                tresc: `Pole powierzchni mniejszego z dwóch podobnych ${mn} wynosi $${P1}$ cm$^2$, a większego $${P2}$ cm$^2$. Oblicz skalę podobieństwa większego ${d === "sześcian" ? "sześcianu" : d === "ostrosłup" ? "ostrosłupa" : d === "graniastosłup" ? "graniastosłupa" : "wielościanu"} do mniejszego.`,
                pola: [pole("w", "$k=$")],
                odpowiedz: { w: q(p, s) },
                wynik: `$k=${ktex}$`,
                rozwiazanie: [
                  s === 1 ? `Stosunek pól: $\\frac{${P2}}{${P1}}=${p * p}=k^2$.`
                    : m === 1 ? `Stosunek pól: $\\frac{${P2}}{${P1}}=k^2$.`
                    : `Stosunek pól: $\\frac{${P2}}{${P1}}=\\frac{${p * p}}{${s * s}}=k^2$.`,
                  s === 1 ? `$k=\\sqrt{${p * p}}=${p}$.` : `$k=\\sqrt{\\frac{${p * p}}{${s * s}}}=${ktex}$.`,
                ],
              };
            }
            const V1 = s * s * s * wsp;
            const V2 = p * p * p * wsp;
            return {
              tresc: `Objętość mniejszego z dwóch podobnych ${mn} wynosi $${V1}$ cm$^3$, a większego $${V2}$ cm$^3$. Oblicz skalę podobieństwa większego ${d === "sześcian" ? "sześcianu" : d === "ostrosłup" ? "ostrosłupa" : d === "graniastosłup" ? "graniastosłupa" : "wielościanu"} do mniejszego.`,
              pola: [pole("w", "$k=$")],
              odpowiedz: { w: q(p, s) },
              wynik: `$k=${ktex}$`,
              rozwiazanie: [
                s === 1 ? `Stosunek objętości: $\\frac{${V2}}{${V1}}=${p * p * p}=k^3$.` : `Stosunek objętości: $\\frac{${V2}}{${V1}}=\\frac{${p * p * p}}{${s * s * s}}=k^3$.`,
                s === 1 ? `$k=\\sqrt[3]{${p * p * p}}=${p}$.` : `$k=\\sqrt[3]{\\frac{${p * p * p}}{${s * s * s}}}=${ktex}$.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
