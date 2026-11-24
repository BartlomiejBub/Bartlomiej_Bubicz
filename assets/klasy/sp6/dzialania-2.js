// Klasa 6 (szkoła podstawowa) · rozdział III „Działania na liczbach, cz. 2” – Matematyka z kluczem 6 (Nowa Era).
// Własne materiały rozdziału: ściąga, zadania i generatory dla tej klasy (nic nie jest współdzielone z innymi rozdziałami).
import { Q, q } from "../../generatory/wspolne.js";   // tylko pomocnicze z wspolne.js

// --- Pomocnicze (tylko dla tego pliku)

/** Poprawna forma rzeczownika po liczbie: 1 cyfra, 2 cyfry, 5 cyfr. */
function mn(n, a, b, c) {
  const m10 = n % 10, m100 = n % 100;
  if (n === 1) return a;
  return m10 >= 2 && m10 <= 4 && !(m100 >= 12 && m100 <= 14) ? b : c;
}

const nwdf = (a, b) => { while (b) [a, b] = [b, a % b]; return a; };
const nwwf = (a, b) => (a / nwdf(a, b)) * b;

const fr = (n, d) => `\\frac{${n}}{${d}}`;
/** Liczba wymierna dodatnia jako ułamek, liczba mieszana albo liczba całkowita (LaTeX). */
const qm = (v) => (v.d === 1 ? `${v.n}` : v.n < v.d ? fr(v.n, v.d) : `${Math.floor(v.n / v.d)}${fr(v.n % v.d, v.d)}`);
const qf = (v) => (v.d === 1 ? `${v.n}` : fr(v.n, v.d));

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

/** Liczba x / 10^p zapisana z dokładnie p cyframi po przecinku: (705, 2) -> "7{,}05". */
function fmtP(x, p) {
  if (p === 0) return `${x}`;
  const m = 10 ** p;
  return `${Math.floor(x / m)}{,}${String(x % m).padStart(p, "0")}`;
}

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

/** Liczba do działań na ułamkach: właściwy ("wl"), mieszany ("mie") albo naturalny ("nat"). */
function liczba(r, rodzaj) {
  if (rodzaj === "nat") {
    const N = r.int(2, 12);
    return { tex: `${N}`, impTex: `${N}`, nn: N, dd: 1, imp: q(N), mieszana: false };
  }
  let d, n;
  do {
    d = r.pick([2, 3, 4, 5, 6, 8, 9, 10]);
    n = r.int(1, d - 1);
  } while (nwdf(n, d) !== 1);
  if (rodzaj === "wl") return { tex: fr(n, d), impTex: fr(n, d), nn: n, dd: d, imp: q(n, d), mieszana: false };
  const w = r.int(1, 4);
  return { tex: `${w}${fr(n, d)}`, impTex: fr(w * d + n, d), nn: w * d + n, dd: d, imp: q(w * d + n, d), mieszana: true };
}

const zamianaMieszanych = (...L) => {
  const m = L.filter((x) => x.mieszana);
  return m.length ? [`Zamieniamy ${m.length > 1 ? "liczby mieszane" : "liczbę mieszaną"} na ${m.length > 1 ? "ułamki niewłaściwe" : "ułamek niewłaściwy"}: ${m.map((x) => `$${x.tex} = ${x.impTex}$`).join(", ")}.`] : [];
};

/** Podpis pola na ułamek: przykład zapisu, który nie jest odpowiedzią. */
const etykietaUlamek = (res) => `Wynik jako ułamek (np. ${res.n === 7 && res.d === 12 ? "5/8" : "7/12"}) albo liczba całkowita`;

/** Rozwinięcie dziesiętne n/d: cyfry przed okresem i cyfry okresu. */
function rozwin(n, d) {
  const cyfry = [], seen = new Map();
  let rem = n % d;
  while (rem !== 0 && !seen.has(rem)) {
    seen.set(rem, cyfry.length);
    rem *= 10;
    cyfry.push(Math.floor(rem / d));
    rem %= d;
  }
  if (rem === 0) return { pre: cyfry, per: [] };
  const st = seen.get(rem);
  return { pre: cyfry.slice(0, st), per: cyfry.slice(st) };
}

/** Liczba całkowita do przesuwania przecinka: p = 0 – całkowita 2..99, inaczej p cyfr po przecinku, ostatnia cyfra różna od 0. */
function cyfryDoPrzesuwania(r, p) {
  let A;
  do { A = p === 0 ? r.int(2, 99) : p === 1 ? r.int(11, 99) : r.int(101, 999); } while (p > 0 && A % 10 === 0);
  return A;
}

// --- Rysunki na kartach (współrzędne liczone w kodzie; klasy stylów jak w assets/rysunki.js)

const zl = (x) => Math.round(x * 10) / 10;
const napis = (x, y, kl, t, kotwica = "middle") => `<text${kl ? ` class="${kl}"` : ""} x="${zl(x)}" y="${zl(y)}" text-anchor="${kotwica}">${t}</text>`;
const kreska = (x1, y1, x2, y2, kl = "l") => `<line class="${kl}" x1="${zl(x1)}" y1="${zl(y1)}" x2="${zl(x2)}" y2="${zl(y2)}"/>`;
const kropka = (x, y) => `<circle class="k" cx="${zl(x)}" cy="${zl(y)}" r="3.5"/>`;
const prost = (kl, x, y, w, h) => `<rect class="${kl}" x="${zl(x)}" y="${zl(y)}" width="${zl(w)}" height="${zl(h)}"/>`;

/** Pasek podzielony na n równych części; cz = [[od, ile, klasa]] – zamalowane części; pom = liczba części pomocniczej (przerywanej) podziałki. */
function pasek(x, y, szer, wys, n, cz = [], pom = 0) {
  const k = szer / n;
  let s = "";
  for (const [od, ile, kl] of cz) s += prost(kl, x + od * k, y, ile * k, wys);
  for (let i = 1; i < pom; i++) s += kreska(x + (i * szer) / pom, y, x + (i * szer) / pom, y + wys, "p");
  s += prost("l", x, y, szer, wys);
  for (let i = 1; i < n; i++) s += kreska(x + i * k, y, x + i * k, y + wys);
  return s;
}

/** Mnożenie ułamków: kratki 8 x 3. Poziomo zamalowane 2 z 3 rzędów (⅔), pionowo 3 z 8 kolumn (⅜); obie części razem: 6 kratek z 24. */
const RYS_MNOZ_POLE = (() => {
  const x0 = 70, y0 = 24, c = 22, kol = 8, rz = 3;
  let s = `<svg viewBox="0 0 300 140">`;
  s += prost("w", x0, y0, kol * c, 2 * c) + prost("w2", x0, y0, 3 * c, rz * c);
  for (let i = 1; i < kol; i++) s += kreska(x0 + i * c, y0, x0 + i * c, y0 + rz * c, "p");
  for (let j = 1; j < rz; j++) s += kreska(x0, y0 + j * c, x0 + kol * c, y0 + j * c, "p");
  s += prost("l", x0, y0, kol * c, rz * c) + prost("a", x0, y0, 3 * c, 2 * c);
  s += napis(x0 - 8, y0 + c + 5, "ta", "⅔", "end") + napis(x0 + 1.5 * c, y0 - 7, "ta", "⅜");
  s += napis(150, y0 + rz * c + 26, "ta", "⅔ · ⅜ = 6/24 = ¼");
  return `${s}${napis(150, 134, "tm", "na obie strony zamalowano 6 kratek z 24 (ramka)")}</svg>`;
})();

/** Ułamek razy liczba naturalna: 3 paski po ⅖ to 6 kratek, a każda kratka to ⅕. */
const RYS_MNOZ_NAT = (() => {
  let s = `<svg viewBox="0 0 300 130">`;
  for (let i = 0; i < 3; i++) s += napis(46, 10 + 30 * i + 18, "ta", "⅖", "end") + pasek(52, 10 + 30 * i, 150, 24, 5, [[0, 2, "w"]]);
  s += napis(216, 34, "ta", "3 · ⅖", "start") + napis(216, 58, "ta", "= 6/5", "start") + napis(216, 82, "ta", "= 1⅕", "start");
  return `${s}${napis(150, 116, "tm", "razem 6 zamalowanych kratek, każda to ⅕")}</svg>`;
})();

/** Mnożenie pisemne liczb dziesiętnych: dwa przykłady, liczby wyrównane do prawej. */
const RYS_MNOZ_DZIES = (() => {
  const blok = (e, a, b, w, dz, ile) => napis(e, 26, "", a, "end") + napis(e, 50, "", `× ${b}`, "end") + kreska(e - 52, 58, e + 4, 58)
    + napis(e, 82, "ta", w, "end") + napis(e - 24, 106, "tm", dz) + napis(e - 24, 120, "tm", ile);
  return `<svg viewBox="0 0 300 130">${blok(108, "2,4", "0,3", "0,72", "24 · 3 = 72", "2 cyfry po przecinku")}${blok(258, "1,2", "1,3", "1,56", "12 · 13 = 156", "2 cyfry po przecinku")}</svg>`;
})();

/** Ułamek razy ułamek na paskach: ½ z ¾ = ⅜ (pierwsze 3 ósemki to połowa z trzech czwartych). */
const RYS_ULAMEK_ULAMKA = `<svg viewBox="0 0 300 124">`
  + napis(46, 28, "ta", "¾", "end") + pasek(52, 10, 240, 26, 4, [[0, 3, "w"]], 8)
  + napis(46, 72, "ta", "½ z ¾", "end") + pasek(52, 54, 240, 26, 8, [[0, 3, "w2"], [3, 3, "w"]])
  + napis(172, 104, "ta", "½ · ¾ = ⅜")
  + `${napis(172, 120, "tm", "połowa z sześciu ósmych to trzy ósme")}</svg>`;

/** Ile razy ¼ mieści się w 3: dwanaście skoków po ¼ (po cztery w każdej całości). */
const RYS_ILE_RAZY = (() => {
  const X = (v) => 20 + 90 * v, y = 74;
  let s = `<svg viewBox="0 0 300 132">${kreska(12, y, 290, y)}`;
  for (let i = 0; i <= 12; i++) s += kreska(X(i / 4), y - (i % 4 === 0 ? 7 : 4), X(i / 4), y + (i % 4 === 0 ? 7 : 4));
  for (let i = 0; i < 12; i++) s += `<path class="a" d="M ${zl(X(i / 4))} ${y} Q ${zl(X((i + 0.5) / 4))} ${y - 16} ${zl(X((i + 1) / 4))} ${y}"/>${napis(X((i + 0.5) / 4), y - 14, "tm", String(i + 1))}`;
  for (const v of [0, 1, 2, 3]) s += napis(X(v), y + 22, "", String(v));
  return `${s}${napis(150, 26, "ta", "w 3 mieści się 12 razy po ¼")}${napis(150, 120, "ta", "3 : ¼ = 3 · 4 = 12")}</svg>`;
})();

/** Dzielenie ułamków na paskach: ¾ = 6/8, a ⅜ mieści się w nim 2 razy. */
const RYS_DZIEL_PASEK = `<svg viewBox="0 0 300 132">`
  + napis(46, 32, "ta", "¾", "end") + pasek(52, 14, 240, 28, 8, [[0, 6, "w"]], 4)
  + pasek(52, 62, 90, 28, 3, [[0, 3, "w2"]]) + pasek(142, 62, 90, 28, 3, [[0, 3, "w"]])
  + napis(97, 82, "ta", "⅜") + napis(187, 82, "ta", "⅜")
  + napis(172, 112, "ta", "¾ : ⅜ = 2")
  + `${napis(172, 128, "tm", "¾ = 6/8, a ⅜ mieści się w tym dwa razy")}</svg>`;

/** Dzielenie pisemne 7,2 : 3 = 2,4 w słupku (cyfry wyrównane do prawej). */
const RYS_SLUPEK = `<svg viewBox="0 0 300 156">`
  + napis(92, 30, "", "7,2", "end") + napis(104, 30, "", ": 3 = 2,4", "start")
  + napis(80, 54, "", "−6", "end") + kreska(60, 60, 84, 60)
  + napis(92, 82, "", "12", "end") + napis(92, 106, "", "−12", "end") + kreska(58, 112, 96, 112) + napis(92, 134, "", "0", "end")
  + napis(112, 54, "tm", "7 : 3 = 2, reszta 1", "start") + napis(112, 72, "tm", "znosimy 2 – cyfrę po przecinku,", "start")
  + napis(112, 86, "tm", "więc w wyniku stawiamy przecinek", "start") + napis(112, 106, "tm", "12 : 3 = 4", "start")
  + `</svg>`;

/** Dzielenie przez ułamek dziesiętny: 7,2 : 0,4 = 72 : 4 = 18. */
const RYS_PRZECINKI = `<svg viewBox="0 0 300 130">`
  + napis(150, 26, "", "7,2 : 0,4")
  + kreska(150, 36, 150, 64, "a") + `<polyline class="a" points="145,57 150,65 155,57"/>`
  + napis(164, 48, "tm", "przecinki o 1 miejsce", "start") + napis(164, 61, "tm", "w prawo (razy 10)", "start")
  + napis(150, 92, "ta", "72 : 4 = 18")
  + `${napis(150, 120, "tm", "dzielnik ma być liczbą naturalną")}</svg>`;

/** Zaokrąglanie 3,468 do części setnych: punkt leży bliżej 3,47 niż 3,46. */
const RYS_ZAOKR = (() => {
  const X = (v) => 30 + 24000 * (v - 3.46), y = 66;
  let s = `<svg viewBox="0 0 300 124">${kreska(16, y, 284, y)}`;
  s += kreska(X(3.46), y - 7, X(3.46), y + 7) + kreska(X(3.47), y - 7, X(3.47), y + 7) + kreska(X(3.465), y - 30, X(3.465), y + 7, "p");
  s += napis(X(3.46), y + 24, "", "3,46") + napis(X(3.47), y + 24, "", "3,47") + napis(X(3.465), y + 24, "tm", "3,465") + napis(X(3.465), y - 36, "tm", "środek");
  s += kropka(X(3.468), y) + napis(X(3.468), y - 26, "ta", "3,468") + skokOsi(X(3.468), X(3.47), y, 10);
  return `${s}${napis(150, 106, "tm", "3,468 jest bliżej 3,47 niż 3,46")}${napis(150, 121, "ta", "3,468 ≈ 3,47")}</svg>`;
})();

/** Skok na osi ze strzałką: łuk od x1 do x2 nad osią o wysokości y, wznoszący się o h. */
function skokOsi(x1, x2, y, h) {
  const cx = (x1 + x2) / 2, cy = y - 2 * h;
  const dx = x2 - cx, dy = y - cy, dl = Math.hypot(dx, dy), ux = dx / dl, uy = dy / dl;
  const bx = x2 - ux * 7, by = y - uy * 7;
  return `<path class="a" d="M ${zl(x1)} ${y} Q ${zl(cx)} ${zl(cy)} ${zl(x2)} ${y}"/>`
    + `<polyline class="a" points="${zl(bx - uy * 3.5)},${zl(by + ux * 3.5)} ${zl(x2)},${y} ${zl(bx + uy * 3.5)},${zl(by - ux * 3.5)}"/>`;
}

/** Ułamek okresowy: dzielenie 5 : 6, reszta 2 wraca. */
const RYS_OKRES = `<svg viewBox="0 0 300 140">`
  + napis(30, 26, "", "50 : 6 = 8, reszta 2", "start")
  + napis(30, 50, "ta", "20 : 6 = 3, reszta 2", "start")
  + napis(30, 74, "ta", "20 : 6 = 3, reszta 2", "start")
  + napis(30, 98, "", "…", "start")
  + napis(30, 124, "ta", "⅚ = 0,8(3)", "start")
  + `${napis(150, 138, "tm", "reszta 2 wraca, więc cyfra 3 się powtarza", "middle")}</svg>`;

/** Ułamek liczby: ⅗ z 40 – pasek z pięcioma częściami po 8. */
const RYS_ULAMEK_LICZBY = (() => {
  let s = `<svg viewBox="0 0 300 128">${napis(150, 16, "ta", "40")}${kreska(30, 24, 270, 24, "p")}`;
  s += pasek(30, 34, 240, 32, 5, [[0, 3, "w"]]);
  for (let i = 0; i < 5; i++) s += napis(30 + 48 * i + 24, 56, "", "8");
  s += kreska(30, 76, 174, 76, "a") + napis(102, 96, "ta", "3 · 8 = 24");
  return `${s}${napis(150, 120, "tm", "40 : 5 = 8 – to jedna część")}</svg>`;
})();

/** Liczba, gdy znamy jej ułamek: ⅜ liczby to 15, więc jedna ósma to 5, a cała liczba to 40. */
const RYS_CALOSC = (() => {
  let s = `<svg viewBox="0 0 300 134">${napis(150, 16, "ta", "całość = 8 · 5 = 40")}${kreska(30, 24, 270, 24, "p")}`;
  s += pasek(30, 36, 240, 32, 8, [[0, 3, "w"]]);
  for (let i = 0; i < 8; i++) s += napis(30 + 30 * i + 15, 58, "", "5");
  s += kreska(30, 78, 120, 78, "a") + napis(75, 98, "ta", "⅜ liczby = 15");
  return `${s}${napis(150, 124, "tm", "15 : 3 = 5 – to jedna ósma całości")}</svg>`;
})();

export default {
  tematy: [
    // ------------------------------------------------------------------------------------------------
    {
      id: "mnozenie",
      nazwa: "Mnożenie ułamków",
      sciaga: [
        {
          nazwa: "Mnożenie ułamków zwykłych",
          slownie: "Mnożymy licznik przez licznik i mianownik przez mianownik. Jeśli można, skracamy przed mnożeniem albo po nim. Wspólny mianownik nie jest potrzebny.",
          tex: "\\frac{a}{b}\\cdot\\frac{c}{d}=\\frac{a\\cdot c}{b\\cdot d}",
          litery: "$a$, $c$ – liczniki; $b$, $d$ – mianowniki.",
          przyklad: "$\\frac{2}{3}\\cdot\\frac{3}{8}=\\frac{2\\cdot3}{3\\cdot8}=\\frac{6}{24}=\\frac{1}{4}$. Na rysunku: z $24$ kratek zamalowano na obie strony $6$.",
          uwaga: "Wspólny mianownik szukamy tylko przy dodawaniu i odejmowaniu, nie przy mnożeniu.",
          rysunek: RYS_MNOZ_POLE,
        },
        {
          nazwa: "Skracanie przed mnożeniem",
          slownie: "Liczbę z licznika możemy skrócić z liczbą z mianownika, także z drugiego ułamka. Rachunki są wtedy krótsze, a wynik jest od razu skrócony.",
          tex: "\\frac{5}{6}\\cdot\\frac{9}{10}=\\frac{1}{2}\\cdot\\frac{3}{2}=\\frac{3}{4}",
          przyklad: "W $\\frac{5}{6}\\cdot\\frac{9}{10}$ skracamy $5$ z $10$ przez $5$ oraz $9$ z $6$ przez $3$. Zostaje $\\frac{1\\cdot3}{2\\cdot2}=\\frac{3}{4}$.",
          uwaga: "Skracamy licznik z mianownikiem. Dwóch liczników (albo dwóch mianowników) nie skracamy.",
        },
        {
          nazwa: "Ułamek razy liczba naturalna",
          slownie: "Liczbę naturalną zapisujemy jako ułamek z mianownikiem $1$. Mnożymy tylko licznik, mianownik zostaje taki sam.",
          tex: "3\\cdot\\frac{2}{5}=\\frac{6}{5}=1\\frac{1}{5}",
          przyklad: "$3\\cdot\\frac{2}{5}=\\frac{3\\cdot2}{5}=\\frac{6}{5}=1\\frac{1}{5}$. Podobnie $6\\cdot\\frac{5}{8}=\\frac{30}{8}=\\frac{15}{4}=3\\frac{3}{4}$.",
          uwaga: "Nie mnóż mianownika przez liczbę naturalną.",
          rysunek: RYS_MNOZ_NAT,
        },
        {
          nazwa: "Liczby mieszane",
          slownie: "Najpierw zamieniamy liczby mieszane na ułamki niewłaściwe. Potem mnożymy jak zwykłe ułamki i na końcu skracamy.",
          tex: "1\\frac{1}{2}\\cdot2\\frac{2}{3}=\\frac{3}{2}\\cdot\\frac{8}{3}=4",
          przyklad: "$1\\frac{1}{2}=\\frac{3}{2}$ i $2\\frac{2}{3}=\\frac{8}{3}$. Zatem $\\frac{3}{2}\\cdot\\frac{8}{3}=\\frac{24}{6}=4$.",
          uwaga: "Nie mnóż osobno całości i osobno ułamków. Wynik byłby zły.",
        },
        {
          nazwa: "Ułamki dziesiętne",
          slownie: "Mnożymy bez przecinków, jak liczby naturalne. W wyniku odliczamy od prawej tyle cyfr po przecinku, ile jest ich w obu czynnikach razem.",
          tex: "2{,}4\\cdot0{,}3=0{,}72",
          przyklad: "$24\\cdot3=72$. W liczbach $2{,}4$ i $0{,}3$ jest razem $2$ cyfry po przecinku, więc wynik to $0{,}72$.",
          uwaga: "$0{,}2\\cdot0{,}3=0{,}06$, a nie $0{,}6$. Brakujące miejsce uzupełniamy zerem.",
          rysunek: RYS_MNOZ_DZIES,
        },
        {
          nazwa: "Mnożenie przez 10, 100 i 0,1",
          slownie: "Przy mnożeniu przez $10$, $100$, $1000$ przesuwamy przecinek w prawo o tyle miejsc, ile jest zer. Mnożenie przez $0{,}1$ przesuwa przecinek w lewo o jedno miejsce, a przez $0{,}01$ o dwa miejsca.",
          tex: "4{,}7\\cdot10=47\\qquad4{,}7\\cdot0{,}1=0{,}47",
          przyklad: "$3{,}25\\cdot100=325$. Gdy brakuje cyfr, dopisujemy zera: $0{,}6\\cdot100=60$.",
          uwaga: "Mnożenie przez liczbę mniejszą od $1$ zmniejsza wynik.",
        },
      ],
      jak: [
        "Zamień liczby mieszane na ułamki niewłaściwe. Liczbę naturalną zapisz jako ułamek z mianownikiem $1$.",
        "Pomnóż liczniki i pomnóż mianowniki. Wcześniej skróć, co się da.",
        "Ułamki dziesiętne pomnóż bez przecinków i odlicz w wyniku tyle cyfr po przecinku, ile było w obu czynnikach.",
        "Zamień wynik na liczbę mieszaną i sprawdź, czy ma sens (np. czy wynik jest mniejszy od czynnika, gdy mnożysz przez ułamek właściwy).",
      ],
      zadania: [
        {
          nr: "1",
          tresc: "Ile wynosi $\\frac{3}{4}\\cdot\\frac{2}{9}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{5}{13}$", "$\\frac{1}{6}$", "$\\frac{3}{2}$", "$\\frac{6}{9}$"],
          poprawna: 1,
        },
        {
          nr: "2",
          tresc: "Ile wynosi $1\\frac{1}{2}\\cdot2\\frac{1}{3}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$2\\frac{1}{6}$", "$3\\frac{1}{3}$", "$\\frac{7}{6}$", "$3\\frac{1}{2}$"],
          poprawna: 3,
        },
        {
          nr: "3",
          tresc: "Ile wynosi $0{,}8\\cdot0{,}05$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}4$", "$0{,}004$", "$0{,}04$", "$4$"],
          poprawna: 2,
        },
        {
          nr: "4",
          tresc: "Kilogram jabłek kosztuje $3{,}60$ zł. Ile złotych zapłacimy za $2{,}5$ kg jabłek? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7{,}20$ zł", "$9$ zł", "$90$ zł", "$6{,}10$ zł"],
          poprawna: 1,
        },
        {
          nr: "5",
          tresc: "Ile wynosi $\\frac{4}{9}\\cdot\\frac{3}{8}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{7}{17}$", "$\\frac{1}{3}$", "$\\frac{1}{6}$", "$\\frac{32}{27}$"],
          poprawna: 2,
        },
        {
          nr: "6",
          tresc: "Ile wynosi $3\\cdot\\frac{2}{5}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{6}{15}$", "$1\\frac{1}{5}$", "$\\frac{2}{15}$", "$6\\frac{1}{5}$"],
          poprawna: 1,
        },
        {
          nr: "7",
          tresc: "Ile wynosi $1{,}2\\cdot0{,}7$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8{,}4$", "$0{,}84$", "$0{,}084$", "$1{,}9$"],
          poprawna: 1,
        },
        {
          nr: "8",
          tresc: "Ile wynosi $6{,}4\\cdot0{,}1$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$64$", "$0{,}064$", "$0{,}64$", "$6{,}5$"],
          poprawna: 2,
        },
        {
          nr: "9",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\frac{2}{5}\\cdot10=4$", litery: "PF", poprawna: 0 },
            { tekst: "$3{,}7\\cdot100=37$", litery: "PF", poprawna: 1 },
            { tekst: "Iloczyn $0{,}6\\cdot\\frac{1}{2}$ jest mniejszy od $0{,}6$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "10",
          punkty: 2,
          tresc: "Prostokątna grządka ma boki długości $2\\frac{1}{2}$ m i $1\\frac{3}{5}$ m. Jakie jest pole tej grządki? **Zapisz obliczenia.**",
          rozwiazanie: "Pole prostokąta to iloczyn długości boków. Zamieniamy liczby mieszane: $2\\frac{1}{2}=\\frac{5}{2}$ oraz $1\\frac{3}{5}=\\frac{8}{5}$.\n\nMnożymy: $\\frac{5}{2}\\cdot\\frac{8}{5}=\\frac{40}{10}=4$.\n\nOdpowiedź: Pole grządki to $4$ m$^2$.",
        },
        {
          nr: "11",
          punkty: 2,
          tresc: "Kilogram wiśni kosztuje $12{,}50$ zł. Pani Ewa kupiła $1{,}6$ kg wiśni i zapłaciła banknotem $50$ zł. Ile złotych reszty dostała? **Zapisz obliczenia.**",
          rozwiazanie: "Koszt wiśni: $12{,}5\\cdot1{,}6$. Mnożymy bez przecinków: $125\\cdot16=2000$. W czynnikach są razem $2$ cyfry po przecinku, więc koszt to $20{,}00$ zł, czyli $20$ zł.\n\nReszta: $50-20=30$.\n\nOdpowiedź: Pani Ewa dostała $30$ zł reszty.",
        },
        {
          nr: "12",
          punkty: 2,
          tresc: "Ola miała $3\\frac{3}{4}$ m wstążki. Na ozdobę zużyła $\\frac{2}{5}$ tej wstążki. Ile metrów wstążki zużyła? **Zapisz obliczenia.**",
          rozwiazanie: "Szukamy $\\frac{2}{5}$ z $3\\frac{3}{4}$, czyli mnożymy. Zamieniamy liczbę mieszaną: $3\\frac{3}{4}=\\frac{15}{4}$.\n\n$\\frac{2}{5}\\cdot\\frac{15}{4}$: skracamy $5$ z $15$ oraz $2$ z $4$. Zostaje $\\frac{1\\cdot3}{1\\cdot2}=\\frac{3}{2}=1\\frac{1}{2}$.\n\nOdpowiedź: Ola zużyła $1\\frac{1}{2}$ m wstążki.",
        },
        {
          nr: "13",
          punkty: 1,
          tresc: "Bok kwadratowego obrazu ma $1{,}2$ m. Jakie jest pole tego obrazu? **Zapisz obliczenia.**",
          rozwiazanie: "Pole kwadratu to bok razy bok: $1{,}2\\cdot1{,}2$.\n\nMnożymy bez przecinków: $12\\cdot12=144$. W czynnikach są razem $2$ cyfry po przecinku, więc wynik to $1{,}44$.\n\nOdpowiedź: Pole obrazu to $1{,}44$ m$^2$.",
        },
      ],
      generatory: [
        {
          id: "mnozenie-ulamkow",
          nazwa: "Mnożenie ułamków zwykłych",
          opis: "Pomnóż dwa ułamki zwykłe, liczby mieszane albo ułamek i liczbę naturalną. Wynik wpisz jako ułamek (może być niewłaściwy) albo liczbę całkowitą.",
          generuj(r) {
            const rodz = r.pick([["wl", "wl"], ["wl", "wl"], ["mie", "wl"], ["mie", "mie"], ["nat", "wl"], ["wl", "nat"]]);
            for (;;) {
              const A = liczba(r, rodz[0]), B = liczba(r, rodz[1]);
              const res = A.imp.mul(B.imp);
              if (res.d > 40 || res.n > 2000) continue;
              const kr = [
                ...zamianaMieszanych(A, B),
                `Mnożymy licznik przez licznik i mianownik przez mianownik: $${A.impTex} \\cdot ${B.impTex} = ${fr(A.nn * B.nn, A.dd * B.dd)}$.`,
                ...(lancuch(A.nn * B.nn, A.dd * B.dd).includes("=") ? [`Skracamy i zapisujemy wynik: $${lancuch(A.nn * B.nn, A.dd * B.dd)}$.`] : [`Wyniku nie da się już skrócić.`]),
              ];
              const dwaUl = rodz[0] !== "nat" && rodz[1] !== "nat";
              const tresc = dwaUl && r.chance(0.25)
                ? `Prostokąt ma boki długości $${A.tex}$ m i $${B.tex}$ m. Jakie jest jego pole w metrach kwadratowych?`
                : r.pick([`Oblicz $${A.tex} \\cdot ${B.tex}$.`, `Ile to jest $${A.tex} \\cdot ${B.tex}$?`]);
              return {
                tresc,
                pola: [{ id: "w", typ: "liczba", etykieta: etykietaUlamek(res) }],
                odpowiedz: { w: res },
                wynik: `$${qm(res)}$`,
                rozwiazanie: kr,
              };
            }
          },
        },
        {
          id: "mnozenie-dziesietnych",
          nazwa: "Mnożenie dziesiętnych",
          opis: "Pomnóż ułamki dziesiętne (także w zadaniach z cenami), licząc najpierw bez przecinków.",
          generuj(r) {
            let p, s;
            do { p = r.int(1, 2); s = r.int(0, 2); } while (p + s > 3 || (s === 2 && p === 2));
            let A, B;
            do {
              A = p === 1 ? r.int(11, 99) : r.int(101, 999);
              B = s === 0 ? r.int(2, 12) : s === 1 ? r.int(2, 99) : r.int(2, 19);
            } while (A % 10 === 0 || (s > 0 && B % 10 === 0));
            const P = A * B, k = p + s;
            const res = q(P, 10 ** k);
            const a = fmtP(A, p), b = s === 0 ? `${B}` : fmtP(B, s);
            const cena = p === 2 && s === 0 && r.chance(0.5);
            const tresc = cena
              ? `Kilogram sera kosztuje $${a}$ zł. Ile złotych zapłacimy za $${b}$ kg sera?`
              : r.pick([`Oblicz $${a} \\cdot ${b}$.`, `Ile to jest $${a} \\cdot ${b}$?`]);
            return {
              tresc,
              pola: [{ id: "w", typ: "liczba", etykieta: cena ? "Cena w zł" : "Wynik" }],
              odpowiedz: { w: res },
              wynik: `$${fmtD(res)}$`,
              rozwiazanie: [
                `Mnożymy bez przecinków: $${A} \\cdot ${B} = ${P}$.`,
                `W czynnikach jest razem $${k}$ ${mn(k, "cyfra", "cyfry", "cyfr")} po przecinku (w $${a}$ jest $${p}$, w $${b}$ jest $${s}$).`,
                `W wyniku odliczamy $${k}$ ${mn(k, "cyfrę", "cyfry", "cyfr")} od prawej: $${fmtP(P, k)}$${fmtP(P, k) === fmtD(res) ? "" : `, czyli $${fmtD(res)}$`}.`,
              ],
            };
          },
        },
        {
          id: "mnozenie-przez-10",
          nazwa: "Mnożenie przez 10, 100, 1000, 0,1 i 0,01",
          opis: "Pomnóż liczbę dziesiętną przez 10, 100, 1000, 0,1 albo 0,01, przesuwając przecinek.",
          generuj(r) {
            const m = r.pick([
              { tex: "10", k: 1, prawo: true }, { tex: "100", k: 2, prawo: true }, { tex: "1000", k: 3, prawo: true },
              { tex: "0{,}1", k: 1, prawo: false }, { tex: "0{,}01", k: 2, prawo: false },
            ]);
            const p = r.int(0, 2);
            const A = cyfryDoPrzesuwania(r, p);
            const x = q(A, 10 ** p);
            const res = m.prawo ? q(A * 10 ** m.k, 10 ** p) : q(A, 10 ** (p + m.k));
            const calk = Math.floor(A / 10 ** p).toString().length;
            const kroki = m.prawo
              ? [
                  `Mnożymy przez $${m.tex}$, więc przesuwamy przecinek w prawo o $${m.k}$ ${mn(m.k, "miejsce", "miejsca", "miejsc")}.`,
                  ...(m.k > p ? [`Brakujące miejsca uzupełniamy zerami.`] : []),
                ]
              : [
                  `Mnożenie przez $${m.tex}$ to to samo co dzielenie przez $${10 ** m.k}$, więc przesuwamy przecinek w lewo o $${m.k}$ ${mn(m.k, "miejsce", "miejsca", "miejsc")}.`,
                  ...(calk < m.k ? [`Gdy brakuje cyfr, dopisujemy zera z przodu.`] : []),
                ];
            return {
              tresc: r.pick([`Oblicz $${fmtD(x)} \\cdot ${m.tex}$.`, `Ile to jest $${fmtD(x)} \\cdot ${m.tex}$?`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w: res },
              wynik: `$${fmtD(res)}$`,
              rozwiazanie: [...kroki, `Wynik: $${fmtD(x)} \\cdot ${m.tex} = ${fmtD(res)}$.`],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "dzielenie",
      nazwa: "Dzielenie ułamków",
      sciaga: [
        {
          nazwa: "Odwrotność liczby",
          slownie: "Odwrotność ułamka dostajemy, zamieniając licznik z mianownikiem. Liczba razy jej odwrotność daje $1$. Odwrotność liczby naturalnej $n$ to $\\frac{1}{n}$.",
          tex: "\\frac{a}{b}\\ \\to\\ \\frac{b}{a}",
          przyklad: "Odwrotność $\\frac{3}{5}$ to $\\frac{5}{3}$. Odwrotność $4$ to $\\frac{1}{4}$. Odwrotność $2\\frac{1}{2}=\\frac{5}{2}$ to $\\frac{2}{5}$.",
          uwaga: "Liczba $0$ nie ma odwrotności. Nie można dzielić przez zero.",
        },
        {
          nazwa: "Dzielenie ułamków",
          slownie: "Dzielenie zamieniamy na mnożenie przez odwrotność dzielnika, czyli drugiej liczby. Potem mnożymy i skracamy.",
          tex: "\\frac{a}{b}:\\frac{c}{d}=\\frac{a}{b}\\cdot\\frac{d}{c}",
          przyklad: "$\\frac{3}{4}:\\frac{9}{10}=\\frac{3}{4}\\cdot\\frac{10}{9}=\\frac{30}{36}=\\frac{5}{6}$.",
          uwaga: "Odwracamy drugą liczbę (tę, przez którą dzielimy), a nie pierwszą.",
        },
        {
          nazwa: "Liczby mieszane i naturalne",
          slownie: "Liczby mieszane zamieniamy na ułamki niewłaściwe. Liczbę naturalną zapisujemy jako ułamek z mianownikiem $1$. Potem dzielimy jak zwykłe ułamki.",
          tex: "6:\\frac{3}{4}=6\\cdot\\frac{4}{3}=8",
          przyklad: "$2\\frac{1}{4}:3=\\frac{9}{4}:\\frac{3}{1}=\\frac{9}{4}\\cdot\\frac{1}{3}=\\frac{3}{4}$.",
          uwaga: "Najpierw zamień liczby mieszane na ułamki niewłaściwe. Dopiero potem odwracaj dzielnik.",
        },
        {
          nazwa: "Ile razy się mieści?",
          slownie: "Dzieląc $a : b$, pytamy: ile razy $b$ mieści się w $a$. Gdy dzielimy przez ułamek mniejszy od $1$, wynik jest większy od dzielnej.",
          przyklad: "Z $3$ m wstążki tniemy kawałki po $\\frac{1}{4}$ m. W każdym metrze mieszczą się $4$ takie kawałki. Kawałków jest $3:\\frac{1}{4}=3\\cdot4=12$.",
          uwaga: "Dzielenie przez ułamek mniejszy od $1$ nie zmniejsza liczby. Zmniejsza ją dzielenie przez liczbę większą od $1$.",
          rysunek: RYS_ILE_RAZY,
        },
        {
          nazwa: "Dzielenie ułamków na paskach",
          slownie: "Gdy ułamki mają ten sam mianownik, widać na pasku, ile razy dzielnik mieści się w dzielnej. Wystarczy porównać liczniki.",
          tex: "\\frac{3}{4}:\\frac{3}{8}=\\frac{6}{8}:\\frac{3}{8}=2",
          przyklad: "$\\frac{3}{4}=\\frac{6}{8}$. Pasek $\\frac{3}{8}$ mieści się w pasku $\\frac{6}{8}$ dwa razy, bo $6:3=2$. Sprawdzenie mnożeniem: $\\frac{3}{4}\\cdot\\frac{8}{3}=2$.",
          uwaga: "Ułamki mogą mieć różne mianowniki. Wtedy najpierw je rozszerz do wspólnego mianownika albo pomnóż przez odwrotność.",
          rysunek: RYS_DZIEL_PASEK,
        },
      ],
      jak: [
        "Zamień liczby mieszane na ułamki niewłaściwe, a liczby naturalne na ułamki z mianownikiem $1$.",
        "Zamień dzielenie na mnożenie przez odwrotność drugiej liczby.",
        "Pomnóż liczniki i mianowniki (skróć, co się da).",
        "Zapisz wynik jako liczbę mieszaną i sprawdź mnożeniem: wynik razy dzielnik ma dać dzielną.",
      ],
      zadania: [
        {
          nr: "14",
          tresc: "Ile wynosi $\\frac{5}{6}:\\frac{5}{12}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{25}{72}$", "$\\frac{1}{2}$", "$2$", "$\\frac{25}{36}$"],
          poprawna: 2,
        },
        {
          nr: "15",
          tresc: "Ile wynosi $4:\\frac{2}{3}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{8}{3}$", "$6$", "$\\frac{1}{6}$", "$4\\frac{2}{3}$"],
          poprawna: 1,
        },
        {
          nr: "16",
          tresc: "Ile wynosi $1\\frac{1}{2}:2\\frac{1}{4}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1\\frac{1}{2}$", "$3\\frac{3}{8}$", "$\\frac{3}{4}$", "$\\frac{2}{3}$"],
          poprawna: 3,
        },
        {
          nr: "17",
          tresc: "Ile szklanek o pojemności $\\frac{1}{4}$ l można napełnić $3\\frac{1}{2}$ l soku? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14$", "$7$", "$\\frac{7}{8}$", "$13$"],
          poprawna: 0,
        },
        {
          nr: "18",
          tresc: "Ile wynosi $\\frac{3}{4}:3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{9}{4}$", "$\\frac{1}{4}$", "$4$", "$3$"],
          poprawna: 1,
        },
        {
          nr: "19",
          tresc: "Która liczba jest odwrotnością liczby $2\\frac{1}{3}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{3}{7}$", "$\\frac{7}{3}$", "$\\frac{3}{2}$", "$\\frac{1}{3}$"],
          poprawna: 0,
        },
        {
          nr: "20",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "Odwrotnością liczby $\\frac{2}{7}$ jest liczba $\\frac{7}{2}$.", litery: "PF", poprawna: 0 },
            { tekst: "$5:\\frac{1}{2}=2\\frac{1}{2}$", litery: "PF", poprawna: 1 },
            { tekst: "Wynik działania $\\frac{3}{4}:\\frac{1}{2}$ jest większy od $1$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "21",
          punkty: 2,
          tresc: "Z kawałka tkaniny o długości $4$ m pani Basia szyje woreczki. Na jeden woreczek potrzeba $\\frac{3}{4}$ m tkaniny. Ile całych woreczków uszyje i ile metrów tkaniny zostanie? **Zapisz obliczenia.**",
          rozwiazanie: "Dzielimy: $4:\\frac{3}{4}=4\\cdot\\frac{4}{3}=\\frac{16}{3}=5\\frac{1}{3}$. Całych woreczków będzie $5$.\n\nZużyto $5\\cdot\\frac{3}{4}=\\frac{15}{4}=3\\frac{3}{4}$ m tkaniny.\n\nZostanie $4-3\\frac{3}{4}=\\frac{1}{4}$ m.\n\nOdpowiedź: Pani Basia uszyje $5$ woreczków i zostanie jej $\\frac{1}{4}$ m tkaniny.",
        },
        {
          nr: "22",
          punkty: 2,
          tresc: "Iloczyn dwóch liczb jest równy $\\frac{3}{5}$. Jedna z tych liczb to $\\frac{9}{10}$. Jaka jest druga liczba? **Zapisz obliczenia.**",
          rozwiazanie: "Drugą liczbę dostaniemy, dzieląc iloczyn przez pierwszą liczbę: $\\frac{3}{5}:\\frac{9}{10}$.\n\nZamieniamy na mnożenie: $\\frac{3}{5}\\cdot\\frac{10}{9}=\\frac{30}{45}=\\frac{2}{3}$.\n\nSprawdzenie: $\\frac{9}{10}\\cdot\\frac{2}{3}=\\frac{18}{30}=\\frac{3}{5}$.\n\nOdpowiedź: Druga liczba to $\\frac{2}{3}$.",
        },
        {
          nr: "23",
          punkty: 2,
          tresc: "Pan Marek ma $5\\frac{1}{2}$ l soku. Rozlewa go do butelek po $\\frac{3}{4}$ l. Ile butelek napełni w całości i ile litrów soku zostanie? **Zapisz obliczenia.**",
          rozwiazanie: "Dzielimy: $5\\frac{1}{2}:\\frac{3}{4}=\\frac{11}{2}\\cdot\\frac{4}{3}=\\frac{44}{6}=\\frac{22}{3}=7\\frac{1}{3}$. Całych butelek będzie $7$.\n\nZużyto $7\\cdot\\frac{3}{4}=\\frac{21}{4}=5\\frac{1}{4}$ l soku.\n\nZostanie $5\\frac{1}{2}-5\\frac{1}{4}=\\frac{1}{4}$ l.\n\nOdpowiedź: Pan Marek napełni $7$ butelek i zostanie mu $\\frac{1}{4}$ l soku.",
        },
        {
          nr: "24",
          punkty: 2,
          tresc: "Pole prostokąta jest równe $\\frac{3}{4}$ m$^2$. Jeden bok ma długość $\\frac{3}{5}$ m. Jaką długość ma drugi bok? **Zapisz obliczenia.**",
          rozwiazanie: "Pole to iloczyn długości boków, więc drugi bok to pole podzielone przez pierwszy bok: $\\frac{3}{4}:\\frac{3}{5}$.\n\nZamieniamy na mnożenie: $\\frac{3}{4}\\cdot\\frac{5}{3}=\\frac{15}{12}=\\frac{5}{4}=1\\frac{1}{4}$.\n\nSprawdzenie: $\\frac{3}{5}\\cdot\\frac{5}{4}=\\frac{15}{20}=\\frac{3}{4}$.\n\nOdpowiedź: Drugi bok ma $1\\frac{1}{4}$ m.",
        },
      ],
      generatory: [
        {
          id: "dzielenie-ulamkow",
          nazwa: "Dzielenie ułamków",
          opis: "Podziel ułamki zwykłe, liczby mieszane albo ułamek przez liczbę naturalną (i odwrotnie). Wynik wpisz jako ułamek lub liczbę całkowitą.",
          generuj(r) {
            const rodz = r.pick([["wl", "wl"], ["wl", "wl"], ["mie", "wl"], ["wl", "mie"], ["nat", "wl"], ["wl", "nat"], ["mie", "nat"]]);
            for (;;) {
              const A = liczba(r, rodz[0]), B = liczba(r, rodz[1]);
              const res = A.imp.div(B.imp);
              if (res.d > 40 || res.n > 2000) continue;
              const odw = fr(B.dd, B.nn);
              const kr = [
                ...zamianaMieszanych(A, B),
                `Zamieniamy dzielenie na mnożenie przez odwrotność dzielnika: $${A.impTex} : ${B.impTex} = ${A.impTex} \\cdot ${odw}$.`,
                `Mnożymy: $${A.impTex} \\cdot ${odw} = ${lancuch(A.nn * B.dd, A.dd * B.nn)}$.`,
              ];
              const kontekst = res.d === 1 && rodz[0] !== "nat" && rodz[1] !== "nat" && r.chance(0.6);
              const tresc = kontekst
                ? `Ile szklanek o pojemności $${B.tex}$ l można napełnić $${A.tex}$ l soku?`
                : r.pick([`Oblicz $${A.tex} : ${B.tex}$.`, `Ile to jest $${A.tex} : ${B.tex}$?`]);
              return {
                tresc,
                pola: [{ id: "w", typ: "liczba", etykieta: etykietaUlamek(res) }],
                odpowiedz: { w: res },
                wynik: `$${qm(res)}$`,
                rozwiazanie: kr,
              };
            }
          },
        },
        {
          id: "odwrotnosc",
          nazwa: "Odwrotność liczby",
          opis: "Podaj odwrotność ułamka, liczby mieszanej albo liczby naturalnej. Wynik wpisz jako ułamek lub liczbę całkowitą.",
          generuj(r) {
            let L;
            do { L = liczba(r, r.pick(["wl", "wl", "mie", "nat"])); } while (L.nn > 40);
            const odw = q(L.dd, L.nn);
            const kr = [
              ...zamianaMieszanych(L),
              L.dd === 1
                ? `Liczbę $${L.tex}$ zapisujemy jako $${fr(L.nn, 1)}$. Zamieniamy miejscami licznik i mianownik: $${fr(1, L.nn)}$.`
                : `Zamieniamy miejscami licznik i mianownik: $${L.impTex} \\to ${fr(L.dd, L.nn)}$.`,
              `Sprawdzenie: $${L.impTex} \\cdot ${fr(L.dd, L.nn)} = 1$.`,
            ];
            return {
              tresc: `Podaj odwrotność liczby $${L.tex}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: etykietaUlamek(odw).replace("Wynik", "Odwrotność") }],
              odpowiedz: { w: odw },
              wynik: `$${qm(odw)}$`,
              rozwiazanie: kr,
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "dzielenie-pisemne",
      nazwa: "Dzielenie pisemne",
      sciaga: [
        {
          nazwa: "Ułamek dziesiętny przez liczbę naturalną",
          slownie: "Dzielimy jak liczby naturalne. Gdy znosimy pierwszą cyfrę po przecinku, w wyniku stawiamy przecinek. Gdy dzielenie się nie kończy, dopisujemy zero na końcu dzielnej.",
          tex: "7{,}2:3=2{,}4",
          przyklad: "$7:3=2$, reszta $1$. Stawiamy przecinek, znosimy $2$: $12:3=4$. Wynik $2{,}4$. Dla $3:4$ dopisujemy zera: $3{,}00:4=0{,}75$.",
          uwaga: "Gdy dzielna jest mniejsza od dzielnika, w wyniku piszemy $0$: $0{,}6:4$ to $0{,}60:4=0{,}15$.",
          rysunek: RYS_SLUPEK,
        },
        {
          nazwa: "Dzielenie przez ułamek dziesiętny",
          slownie: "Przesuwamy przecinek w dzielniku i w dzielnej o tyle samo miejsc w prawo, aż dzielnik będzie liczbą naturalną. Potem dzielimy.",
          tex: "7{,}2:0{,}4=72:4=18",
          przyklad: "$4{,}5:0{,}09$: przesuwamy przecinki o $2$ miejsca, mamy $450:9=50$.",
          uwaga: "Oba przecinki przesuwamy o tyle samo miejsc. Przesunięcie tylko jednego zmienia wynik.",
          rysunek: RYS_PRZECINKI,
        },
        {
          nazwa: "Dzielenie przez 10, 100, 1000",
          slownie: "Przy dzieleniu przez $10$, $100$, $1000$ przesuwamy przecinek w lewo o tyle miejsc, ile jest zer. W razie potrzeby dopisujemy zera.",
          tex: "45{,}6:100=0{,}456",
          przyklad: "$45{,}6:10=4{,}56$. Dalej: $5:100=0{,}05$, bo przesuwamy przecinek o dwa miejsca i dopisujemy zero.",
          uwaga: "Dzielenie przez $10$ zmniejsza liczbę dziesięć razy. Przecinek idzie w lewo, a nie w prawo.",
        },
        {
          nazwa: "Ułamek zwykły jako dzielenie",
          slownie: "Kreska ułamkowa oznacza dzielenie. Aby zapisać ułamek zwykły jako dziesiętny, dzielimy licznik przez mianownik.",
          tex: "\\frac{3}{8}=3:8=0{,}375",
          przyklad: "$3:8$: dopisujemy zera, $3{,}000:8=0{,}375$. Podobnie $\\frac{7}{20}=7:20=0{,}35$.",
          uwaga: "Nie każdy ułamek zwykły ma skończony zapis dziesiętny (zob. ułamki okresowe w następnym temacie).",
        },
      ],
      jak: [
        "Gdy dzielnik jest ułamkiem dziesiętnym, przesuń przecinki w obu liczbach o tyle samo miejsc, aby dzielnik był liczbą naturalną.",
        "Dziel jak liczby naturalne. Przy przejściu przez przecinek w dzielnej postaw przecinek w wyniku.",
        "Gdy zostaje reszta, dopisz zero do dzielnej i dziel dalej.",
        "Sprawdź mnożeniem: wynik razy dzielnik ma dać dzielną.",
      ],
      zadania: [
        {
          nr: "25",
          tresc: "Ile wynosi $9{,}6:4$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$24$", "$2{,}4$", "$0{,}24$", "$2{,}04$"],
          poprawna: 1,
        },
        {
          nr: "26",
          tresc: "Ile wynosi $4{,}5:0{,}09$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}5$", "$5$", "$500$", "$50$"],
          poprawna: 3,
        },
        {
          nr: "27",
          tresc: "Ile wynosi $0{,}7:5$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1{,}4$", "$0{,}35$", "$0{,}14$", "$0{,}014$"],
          poprawna: 2,
        },
        {
          nr: "28",
          tresc: "Jak zapisać ułamek $\\frac{7}{20}$ w postaci dziesiętnej? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}35$", "$0{,}27$", "$0{,}035$", "$0{,}7$"],
          poprawna: 0,
        },
        {
          nr: "29",
          tresc: "Trzy przyjaciółki zapłaciły za pizzę $40{,}50$ zł i podzieliły rachunek po równo. Ile złotych zapłaciła każda z nich? **Wybierz właściwą odpowiedź.**",
          opcje: ["$135$ zł", "$13{,}50$ zł", "$13{,}05$ zł", "$12{,}50$ zł"],
          poprawna: 1,
        },
        {
          nr: "30",
          tresc: "Ile wynosi $8{,}3:10$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$83$", "$0{,}83$", "$0{,}083$", "$8{,}03$"],
          poprawna: 1,
        },
        {
          nr: "31",
          tresc: "Ile wynosi $0{,}5:4$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}125$", "$0{,}0125$", "$1{,}25$", "$0{,}12$"],
          poprawna: 0,
        },
        {
          nr: "32",
          tresc: "Jak zapisać ułamek $\\frac{3}{8}$ w postaci dziesiętnej? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}38$", "$0{,}375$", "$0{,}125$", "$2{,}67$"],
          poprawna: 1,
        },
        {
          nr: "33",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$9{,}6:0{,}8=12$", litery: "PF", poprawna: 0 },
            { tekst: "$0{,}3:6=0{,}5$", litery: "PF", poprawna: 1 },
            { tekst: "$\\frac{1}{4}=0{,}25$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "34",
          punkty: 2,
          tresc: "Przewód ma długość $5{,}76$ m. Pocięto go na $8$ równych części. Ile metrów ma jedna część? Ile kawałków po $0{,}36$ m można by zrobić z całego przewodu? **Zapisz obliczenia.**",
          rozwiazanie: "Jedna część: $5{,}76:8$. Liczba $5$ jest mniejsza od $8$, więc w wyniku piszemy $0$ i przecinek. Dalej $57:8=7$, reszta $1$. Znosimy $6$: $16:8=2$. Wynik: $0{,}72$ m.\n\nKawałki po $0{,}36$ m: $5{,}76:0{,}36$. Przesuwamy przecinki o $2$ miejsca: $576:36=16$.\n\nSprawdzenie: $0{,}72\\cdot8=5{,}76$ oraz $0{,}36\\cdot16=5{,}76$.\n\nOdpowiedź: Jedna część ma $0{,}72$ m, a kawałków po $0{,}36$ m byłoby $16$.",
        },
        {
          nr: "35",
          punkty: 1,
          tresc: "Zapisz ułamek $\\frac{5}{8}$ w postaci dziesiętnej, dzieląc pisemnie licznik przez mianownik. Sprawdź wynik mnożeniem. **Zapisz obliczenia.**",
          rozwiazanie: "Dzielimy $5:8$. Dopisujemy zera: $5{,}000:8$. Mamy $50:8=6$, reszta $2$; $20:8=2$, reszta $4$; $40:8=5$.\n\nZatem $\\frac{5}{8}=0{,}625$. Sprawdzenie: $0{,}625\\cdot8=5$.\n\nOdpowiedź: $\\frac{5}{8}=0{,}625$.",
        },
        {
          nr: "36",
          punkty: 2,
          tresc: "Za $3{,}5$ m wstążki zapłacono $9{,}80$ zł. Ile kosztuje $1$ metr tej wstążki? **Zapisz obliczenia.**",
          rozwiazanie: "Cena jednego metra: $9{,}8:3{,}5$. Przesuwamy przecinki o $1$ miejsce: $98:35$.\n\nDzielimy: $98:35=2$, reszta $28$. Dopisujemy zero: $280:35=8$. Wynik: $2{,}8$.\n\nSprawdzenie: $2{,}8\\cdot3{,}5=9{,}8$.\n\nOdpowiedź: Metr wstążki kosztuje $2{,}80$ zł.",
        },
        {
          nr: "37",
          punkty: 1,
          tresc: "Oblicz pisemnie $7{,}35:0{,}35$. Sprawdź wynik mnożeniem. **Zapisz obliczenia.**",
          rozwiazanie: "Przesuwamy przecinki o $2$ miejsca w prawo: $7{,}35:0{,}35=735:35$.\n\nDzielimy: $73:35=2$, reszta $3$. Znosimy $5$: $35:35=1$. Wynik: $21$.\n\nSprawdzenie: $21\\cdot0{,}35=7{,}35$.\n\nOdpowiedź: $7{,}35:0{,}35=21$.",
        },
      ],
      generatory: [
        {
          id: "dzielenie-dziesietnych",
          nazwa: "Dzielenie dziesiętnych",
          opis: "Podziel ułamek dziesiętny przez liczbę naturalną albo przez ułamek dziesiętny. Wynik wychodzi bez reszty.",
          generuj(r) {
            if (r.chance(0.5)) {
              const p = r.int(1, 2), k = r.int(2, 9);
              let R;
              do { R = r.int(11, Math.floor(9999 / k)); } while (R % 10 === 0);
              const D = R * k;
              const dz = fmtP(D, p), wynik = q(R, 10 ** p);
              const ctx = r.chance(0.5);
              return {
                tresc: ctx
                  ? `Linę o długości $${dz}$ m pocięto na $${k}$ ${mn(k, "równą część", "równe części", "równych części")}. Ile metrów ma jedna część?`
                  : r.pick([`Oblicz $${dz} : ${k}$.`, `Ile to jest $${dz} : ${k}$?`]),
                pola: [{ id: "w", typ: "liczba", etykieta: ctx ? "Długość w m" : "Wynik" }],
                odpowiedz: { w: wynik },
                wynik: `$${fmtD(wynik)}$`,
                rozwiazanie: [
                  `Dzielimy jak liczby naturalne, bez przecinka: $${D} : ${k} = ${R}$.`,
                  `W dzielnej $${dz}$ ${p === 1 ? "jest" : "są"} $${p}$ ${mn(p, "cyfra", "cyfry", "cyfr")} po przecinku, więc w wyniku też: $${fmtP(R, p)}$.`,
                  `Sprawdzenie: $${fmtD(wynik)} \\cdot ${k} = ${fmtD(q(D, 10 ** p))}$.`,
                ],
              };
            }
            const s = r.int(1, 2), B = r.int(2, 9), R = r.int(2, 60);
            const D = R * B;
            const dividend = q(D, 10 ** s), divisor = q(B, 10 ** s);
            const ctx = r.chance(0.5);
            return {
              tresc: ctx
                ? `Ile kawałków przewodu po $${fmtD(divisor)}$ m można uzyskać z przewodu o długości $${fmtD(dividend)}$ m?`
                : r.pick([`Oblicz $${fmtD(dividend)} : ${fmtD(divisor)}$.`, `Ile to jest $${fmtD(dividend)} : ${fmtD(divisor)}$?`]),
              pola: [{ id: "w", typ: "liczba", etykieta: ctx ? "Liczba kawałków" : "Wynik" }],
              odpowiedz: { w: R },
              wynik: `$${R}$`,
              rozwiazanie: [
                `Przesuwamy przecinki w obu liczbach o $${s}$ ${mn(s, "miejsce", "miejsca", "miejsc")} w prawo, aby dzielnik był liczbą naturalną: $${fmtD(dividend)} : ${fmtD(divisor)} = ${D} : ${B}$.`,
                `Dzielimy: $${D} : ${B} = ${R}$.`,
                `Sprawdzenie: $${R} \\cdot ${fmtD(divisor)} = ${fmtD(dividend)}$.`,
              ],
            };
          },
        },
        {
          id: "dzielenie-przez-10",
          nazwa: "Dzielenie przez 10, 100 i 1000",
          opis: "Podziel liczbę dziesiętną przez 10, 100 albo 1000, przesuwając przecinek w lewo.",
          generuj(r) {
            let k, p;
            do { k = r.int(1, 3); p = r.int(0, 2); } while (p + k > 4);
            const A = cyfryDoPrzesuwania(r, p);
            const x = q(A, 10 ** p);
            const res = q(A, 10 ** (p + k));
            const calk = Math.floor(A / 10 ** p).toString().length;
            return {
              tresc: r.pick([`Oblicz $${fmtD(x)} : ${10 ** k}$.`, `Ile to jest $${fmtD(x)} : ${10 ** k}$?`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w: res },
              wynik: `$${fmtD(res)}$`,
              rozwiazanie: [
                `Dzielimy przez $${10 ** k}$, więc przesuwamy przecinek w lewo o $${k}$ ${mn(k, "miejsce", "miejsca", "miejsc")}.`,
                ...(calk <= k ? [`Gdy brakuje cyfr, dopisujemy zera z przodu.`] : []),
                `Wynik: $${fmtD(x)} : ${10 ** k} = ${fmtD(res)}$.`,
              ],
            };
          },
        },
        {
          id: "ulamek-na-dziesietny",
          nazwa: "Ułamek zwykły na dziesiętny",
          opis: "Zapisz ułamek zwykły w postaci dziesiętnej, dzieląc licznik przez mianownik. Wynik wychodzi bez reszty.",
          generuj(r) {
            let n, d;
            do {
              d = r.pick([2, 4, 5, 8, 10, 20, 25, 40, 50]);
              n = r.int(1, d - 1);
            } while (nwdf(n, d) !== 1);
            const res = q(n, d);
            return {
              tresc: r.pick([`Zapisz ułamek $${fr(n, d)}$ w postaci dziesiętnej.`, `Zamień ułamek $${fr(n, d)}$ na ułamek dziesiętny.`]),
              pola: [{ id: "w", typ: "liczba", etykieta: "Ułamek dziesiętny" }],
              odpowiedz: { w: res },
              wynik: `$${fmtD(res)}$`,
              rozwiazanie: [
                `Kreska ułamkowa oznacza dzielenie. Dzielimy licznik przez mianownik, dopisując zera po przecinku: $${n} : ${d} = ${fmtD(res)}$.`,
                `Sprawdzenie: $${fmtD(res)} \\cdot ${d} = ${n}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "zaokraglanie-okresowe",
      nazwa: "Zaokrąglanie i ułamki okresowe",
      sciaga: [
        {
          nazwa: "Zaokrąglanie ułamków dziesiętnych",
          slownie: "Patrzymy na cyfrę tuż za miejscem, do którego zaokrąglamy. Jeśli to $0$, $1$, $2$, $3$ albo $4$, ostatnia zostawiana cyfra się nie zmienia. Jeśli to $5$, $6$, $7$, $8$ albo $9$, zwiększamy ją o $1$.",
          tex: "3{,}468\\approx3{,}47\\qquad3{,}468\\approx3{,}5",
          przyklad: "$3{,}468$ do części setnych (dwie cyfry po przecinku): za $6$ stoi $8$, więc $3{,}47$. Do części dziesiątych: za $4$ stoi $6$, więc $3{,}5$.",
          uwaga: "Patrz tylko na jedną cyfrę. $2{,}449$ do części dziesiątych to $2{,}4$, a nie $2{,}5$.",
          rysunek: RYS_ZAOKR,
        },
        {
          nazwa: "Zaokrąglanie do całości",
          slownie: "Zaokrąglając do jedności, patrzymy na pierwszą cyfrę po przecinku (części dziesiąte). Po zaokrągleniu przecinka już nie ma.",
          tex: "6{,}49\\approx6\\qquad6{,}5\\approx7",
          przyklad: "$12{,}38\\approx12$, bo za przecinkiem stoi $3$. $7{,}6\\approx8$, bo za przecinkiem stoi $6$.",
          uwaga: "Nie zaokrąglaj dwa razy. $6{,}49$ do jedności to $6$: patrzymy tylko na cyfrę $4$, a nie na $9$.",
        },
        {
          nazwa: "Zaokrąglanie w życiu",
          slownie: "Kwoty w złotówkach zaokrąglamy do groszy, czyli do części setnych. Zaokrąglamy dopiero wynik, a nie liczby w trakcie obliczeń.",
          przyklad: "$2{,}5$ kg po $7{,}99$ zł: $7{,}99\\cdot2{,}5=19{,}975$. Do groszy: $19{,}98$ zł.",
          uwaga: "Zaokrąglenie to przybliżenie, więc zapisujemy je ze znakiem $\\approx$, a nie $=$.",
        },
        {
          nazwa: "Ułamek okresowy",
          slownie: "Gdy dzielenie licznika przez mianownik się nie kończy, od pewnego miejsca powtarza się ta sama cyfra albo grupa cyfr. Tę powtarzającą się część nazywamy okresem i zapisujemy w nawiasie.",
          tex: "\\frac{1}{3}=0{,}(3)\\qquad\\frac{5}{6}=0{,}8(3)",
          przyklad: "W dzieleniu $1:3$ ciągle zostaje reszta $1$, więc cyfra $3$ powtarza się: $0{,}(3)$. W dzieleniu $5:6$ pierwsza cyfra to $8$, a potem powtarza się $3$: $0{,}8(3)$.",
          uwaga: "W nawiasie piszemy tylko to, co się powtarza. Zapisy $0{,}83$ i $0{,}8(3)$ to różne liczby.",
          rysunek: RYS_OKRES,
        },
        {
          nazwa: "Okres z kilku cyfr",
          slownie: "Okres może mieć kilka cyfr. Wtedy w nawiasie piszemy całą grupę cyfr, która się powtarza. Dzielimy tak długo, aż reszta się powtórzy.",
          tex: "\\frac{3}{11}=0{,}(27)",
          przyklad: "$30:11=2$, reszta $8$. $80:11=7$, reszta $3$. Reszta $3$ już była, więc grupa $27$ się powtarza: $\\frac{3}{11}=0{,}(27)$.",
          uwaga: "$0{,}(27)$ to nie to samo co $0{,}2(7)$. W nawiasie jest cała grupa $27$.",
        },
        {
          nazwa: "Zaokrąglanie ułamka okresowego",
          slownie: "Najpierw dzielimy tak długo, aż mamy cyfrę tuż za miejscem zaokrąglenia. Potem zaokrąglamy jak zwykły ułamek dziesiętny.",
          przyklad: "$\\frac{2}{3}=0{,}(6)$. Do części setnych: za $0{,}66$ stoi $6$, więc $\\frac{2}{3}\\approx0{,}67$. Dla $\\frac{1}{6}=0{,}1(6)$ do części dziesiątych: za $1$ stoi $6$, więc $\\frac{1}{6}\\approx0{,}2$.",
          uwaga: "Wynik zaokrąglenia nie jest równy ułamkowi. Używaj znaku $\\approx$.",
        },
      ],
      jak: [
        "Ustal, do którego miejsca zaokrąglamy (części dziesiąte – jedna cyfra po przecinku, setne – dwie cyfry).",
        "Spójrz na następną cyfrę: od $0$ do $4$ – zostaw, od $5$ do $9$ – zwiększ ostatnią cyfrę o $1$.",
        "Przy ułamku zwykłym najpierw podziel licznik przez mianownik. Gdy cyfra się powtarza, zapisz ją w nawiasie.",
        "W zadaniach z pieniędzmi zaokrąglaj do groszy.",
      ],
      zadania: [
        {
          nr: "38",
          tresc: "Jaki jest wynik zaokrąglenia liczby $5{,}347$ do części setnych? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5{,}3$", "$5{,}34$", "$5{,}35$", "$5{,}4$"],
          poprawna: 2,
        },
        {
          nr: "39",
          tresc: "Jaki jest wynik zaokrąglenia liczby $8{,}449$ do części dziesiątych? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8{,}5$", "$8{,}4$", "$8{,}45$", "$8{,}44$"],
          poprawna: 1,
        },
        {
          nr: "40",
          tresc: "Który zapis jest równy ułamkowi $\\frac{5}{6}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}(83)$", "$0{,}83$", "$0{,}(8)$", "$0{,}8(3)$"],
          poprawna: 3,
        },
        {
          nr: "41",
          tresc: "Kilogram sera kosztuje $18{,}90$ zł. Ile zapłacimy za $0{,}75$ kg sera, jeśli wynik zaokrąglimy do groszy? **Wybierz właściwą odpowiedź.**",
          opcje: ["$14{,}17$ zł", "$14{,}18$ zł", "$14{,}20$ zł", "$14$ zł"],
          poprawna: 1,
        },
        {
          nr: "42",
          tresc: "Jaki jest wynik zaokrąglenia liczby $6{,}49$ do jedności? **Wybierz właściwą odpowiedź.**",
          opcje: ["$7$", "$6$", "$6{,}5$", "$6{,}4$"],
          poprawna: 1,
        },
        {
          nr: "43",
          tresc: "Który zapis jest równy ułamkowi $\\frac{3}{11}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}(27)$", "$0{,}2(7)$", "$0{,}27$", "$0{,}(3)$"],
          poprawna: 0,
        },
        {
          nr: "44",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\frac{2}{3}=0{,}(6)$", litery: "PF", poprawna: 0 },
            { tekst: "Zapisy $0{,}(3)$ i $0{,}3$ oznaczają tę samą liczbę.", litery: "PF", poprawna: 1 },
            { tekst: "Liczba $6{,}996$ zaokrąglona do części setnych to $7{,}00$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "45",
          punkty: 2,
          tresc: "Pan Tomek kupił $1{,}35$ kg wędliny po $29{,}90$ zł za kilogram. Ile złotych zapłacił? Wynik zaokrąglij do groszy. **Zapisz obliczenia.**",
          rozwiazanie: "Liczymy $29{,}9\\cdot1{,}35$. Mnożymy bez przecinków: $299\\cdot135=40\\,365$. W czynnikach są razem $3$ cyfry po przecinku ($1$ w liczbie $29{,}9$ i $2$ w liczbie $1{,}35$), więc wychodzi $40{,}365$ zł.\n\nZaokrąglamy do groszy, czyli do części setnych. Za $40{,}36$ stoi $5$, więc zwiększamy: $40{,}37$.\n\nOdpowiedź: Pan Tomek zapłacił około $40{,}37$ zł.",
        },
        {
          nr: "46",
          punkty: 2,
          tresc: "Zapisz $\\frac{7}{12}$ w postaci ułamka dziesiętnego okresowego. Następnie zaokrąglij tę liczbę do części setnych. **Zapisz obliczenia.**",
          rozwiazanie: "Dzielimy $7:12$. Mamy $70:12=5$, reszta $10$; $100:12=8$, reszta $4$; $40:12=3$, reszta $4$. Reszta $4$ się powtarza, więc cyfra $3$ powtarza się w nieskończoność.\n\nZatem $\\frac{7}{12}=0{,}58(3)$.\n\nDo części setnych: za $0{,}58$ stoi $3$, więc zostawiamy $0{,}58$.\n\nOdpowiedź: $\\frac{7}{12}=0{,}58(3)\\approx0{,}58$.",
        },
        {
          nr: "47",
          punkty: 2,
          tresc: "Zapisz $\\frac{5}{9}$ w postaci ułamka dziesiętnego okresowego. Następnie zaokrąglij tę liczbę do części setnych. **Zapisz obliczenia.**",
          rozwiazanie: "Dzielimy $5:9$. Mamy $50:9=5$, reszta $5$. Znów $50:9=5$, reszta $5$. Reszta się powtarza, więc cyfra $5$ powtarza się w nieskończoność.\n\nZatem $\\frac{5}{9}=0{,}(5)$.\n\nDo części setnych: za $0{,}55$ stoi $5$, więc zwiększamy ostatnią cyfrę o $1$: $0{,}56$.\n\nOdpowiedź: $\\frac{5}{9}=0{,}(5)\\approx0{,}56$.",
        },
        {
          nr: "48",
          punkty: 2,
          tresc: "Trzy takie same batony kosztują razem $7$ zł. Ile kosztuje jeden baton? Wynik zaokrąglij do groszy. **Zapisz obliczenia.**",
          rozwiazanie: "Dzielimy $7:3$. Mamy $7:3=2$, reszta $1$. Dopisujemy zero: $10:3=3$, reszta $1$. Znów $10:3=3$, reszta $1$. Dzielenie się nie kończy: $7:3=2{,}(3)$.\n\nDo groszy, czyli do części setnych: za $2{,}33$ stoi $3$, więc zostawiamy $2{,}33$.\n\nOdpowiedź: Jeden baton kosztuje około $2{,}33$ zł.",
        },
      ],
      generatory: [
        {
          id: "zaokraglanie",
          nazwa: "Zaokrąglanie",
          opis: "Zaokrąglij ułamek dziesiętny do jedności, części dziesiątych albo setnych (także kwotę do groszy).",
          generuj(r) {
            let X;
            do { X = r.int(1001, 99999); } while (X % 10 === 0);
            const p = r.int(0, 2);
            const shift = 10 ** (3 - p);
            const baza = Math.floor(X / shift);
            const nd = Math.floor((X % shift) / (shift / 10));
            const wynikX = baza + (nd >= 5 ? 1 : 0);
            const wynik = q(wynikX, 10 ** p);
            const x = fmtP(X, 3);
            const grosze = p === 2 && r.chance(0.4);
            const miejsce = p === 0 ? "jedności" : p === 1 ? "części dziesiątych" : "części setnych";
            return {
              tresc: grosze
                ? `Na kalkulatorze wyszło $${x}$ zł. Zaokrąglij tę kwotę do groszy (do części setnych).`
                : r.pick([`Zaokrąglij liczbę $${x}$ do ${miejsce}.`, `Jaki jest wynik zaokrąglenia liczby $${x}$ do ${miejsce}?`]),
              pola: [{ id: "w", typ: "liczba", etykieta: grosze ? "Kwota w zł" : "Wynik" }],
              odpowiedz: { w: wynik },
              wynik: `$${fmtP(wynikX, p)}$`,
              rozwiazanie: [
                p === 0 ? `Zostawiamy część całkowitą: $${baza}$.` : `Zostawiamy $${p}$ ${mn(p, "cyfrę", "cyfry", "cyfr")} po przecinku: $${fmtP(baza, p)}$.`,
                `Następna cyfra to $${nd}$. ${nd >= 5 ? `Jest to $5$ lub więcej, więc zwiększamy ostatnią cyfrę o $1$.` : `Jest mniejsza od $5$, więc ostatnia cyfra się nie zmienia.`}`,
                `Wynik: $${x} \\approx ${fmtP(wynikX, p)}$.`,
              ],
            };
          },
        },
        {
          id: "okresowe",
          nazwa: "Ułamki okresowe",
          opis: "Zamień ułamek zwykły na dziesiętny okresowy (np. $\\frac{5}{6}=0{,}8(3)$) i podaj cyfrę okresu albo cyfrę na wskazanym miejscu po przecinku.",
          generuj(r) {
            let n, d, rz;
            for (;;) {
              d = r.pick([3, 6, 9, 12, 15, 18]);
              n = r.int(1, d - 1);
              if (nwdf(n, d) !== 1) continue;
              rz = rozwin(n, d);
              if (rz.per.length === 1) break;
            }
            const x = rz.per[0];
            const zapis = `0{,}${rz.pre.join("")}(${x})`;
            const wspolne = `Dzielimy licznik przez mianownik: $${n} : ${d}$. Dzielenie się nie kończy, a od pewnego miejsca powtarza się cyfra $${x}$. Zatem $${fr(n, d)} = ${zapis}$.`;
            if (r.chance(0.5)) {
              return {
                tresc: `Ułamek $${fr(n, d)}$ zapisano w postaci dziesiętnej okresowej. Jaka cyfra jest w okresie (w nawiasie)?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Cyfra okresu" }],
                odpowiedz: { w: x },
                wynik: `$${x}$`,
                rozwiazanie: [wspolne, `W nawiasie stoi cyfra $${x}$.`],
              };
            }
            const k = r.int(4, 25);
            const m = rz.pre.length;
            const cyfra = k <= m ? rz.pre[k - 1] : x;
            return {
              tresc: `Ułamek $${fr(n, d)}$ zapisano w postaci dziesiętnej. Jaka cyfra stoi na miejscu numer $${k}$ po przecinku?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Cyfra" }],
              odpowiedz: { w: cyfra },
              wynik: `$${cyfra}$`,
              rozwiazanie: [
                wspolne,
                m === 0 ? `Od pierwszego miejsca po przecinku wszystkie cyfry są równe $${x}$.` : `Przed okresem stoją cyfry: $${rz.pre.join(", ")}$. Od miejsca numer $${m + 1}$ wszystkie cyfry są równe $${x}$.`,
                `Na miejscu numer $${k}$ stoi cyfra $${cyfra}$.`,
              ],
            };
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "ulamek-liczby",
      nazwa: "Ułamek liczby i zadania",
      sciaga: [
        {
          nazwa: "Ułamek liczby",
          slownie: "Żeby obliczyć ułamek liczby, dzielimy liczbę przez mianownik (to jedna część) i mnożymy przez licznik.",
          tex: "\\frac{a}{b}\\text{ z }N=N:b\\cdot a",
          litery: "$N$ – liczba, z której bierzemy ułamek.",
          przyklad: "$\\frac{3}{5}$ z $40$: $40:5=8$, potem $8\\cdot3=24$. To samo: $\\frac{3}{5}\\cdot40=24$.",
          uwaga: "Słowo „z” w tym zadaniu oznacza mnożenie: $\\frac{3}{5}$ z $40$ to $\\frac{3}{5}\\cdot40$.",
          rysunek: RYS_ULAMEK_LICZBY,
        },
        {
          nazwa: "Ułamek ułamka",
          slownie: "Ułamek z ułamka też liczymy mnożeniem.",
          tex: "\\frac{1}{2}\\text{ z }\\frac{3}{4}=\\frac{1}{2}\\cdot\\frac{3}{4}=\\frac{3}{8}",
          przyklad: "Tort jest podzielony tak, że zostało $\\frac{3}{4}$ tortu. Zjedzono połowę tego, co zostało: $\\frac{1}{2}\\cdot\\frac{3}{4}=\\frac{3}{8}$ całego tortu.",
          uwaga: "Wynik jest mniejszy od obu liczb, gdy oba ułamki są właściwe.",
          rysunek: RYS_ULAMEK_ULAMKA,
        },
        {
          nazwa: "Ile zostało?",
          slownie: "Gdy zużyto $\\frac{a}{b}$ całości, zostało $\\frac{b-a}{b}$ całości. Możemy też policzyć zużytą część i odjąć ją od całości.",
          przyklad: "Ola miała $35$ zł i wydała $\\frac{2}{7}$ tej kwoty. Zostało $\\frac{5}{7}$ z $35$: $35:7=5$, $5\\cdot5=25$ zł.",
          uwaga: "Pytanie „ile wydała?” i „ile zostało?” mają różne odpowiedzi. Przeczytaj pytanie do końca.",
        },
        {
          nazwa: "Liczba, gdy znamy jej ułamek",
          slownie: "Jeśli $\\frac{a}{b}$ liczby to $W$, to dzielimy $W$ przez licznik, aby dostać jedną część, a potem mnożymy przez mianownik.",
          tex: "\\frac{3}{8}\\text{ liczby}=15\\ \\Rightarrow\\ 15:3\\cdot8=40",
          przyklad: "$\\frac{3}{8}$ liczby to $15$. Jedna ósma to $15:3=5$. Cała liczba to $5\\cdot8=40$. Sprawdzenie: $\\frac{3}{8}\\cdot40=15$.",
          uwaga: "Nie mnóż $W$ przez ułamek. Wtedy liczysz ułamek z $W$, a nie całość.",
          rysunek: RYS_CALOSC,
        },
      ],
      jak: [
        "Ustal, czy szukasz ułamka danej liczby, czy całej liczby, gdy znasz jej ułamek.",
        "Ułamek liczby: podziel liczbę przez mianownik i pomnóż przez licznik.",
        "Całość: podziel daną wartość przez licznik i pomnóż przez mianownik.",
        "Sprawdź, czy wynik pasuje do pytania (ile zostało? ile było? ile razem?) i napisz odpowiedź.",
      ],
      zadania: [
        {
          nr: "49",
          tresc: "Ile wynosi $\\frac{3}{8}$ z $64$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$8$", "$40$", "$24$", "$21\\frac{1}{3}$"],
          poprawna: 2,
        },
        {
          nr: "50",
          tresc: "W klasie jest $28$ uczniów. Dziewczynki to $\\frac{3}{7}$ wszystkich uczniów. Ilu chłopców jest w klasie? **Wybierz właściwą odpowiedź.**",
          opcje: ["$12$", "$4$", "$21$", "$16$"],
          poprawna: 3,
        },
        {
          nr: "51",
          tresc: "Marek wydał $\\frac{2}{5}$ swoich pieniędzy. Zostało mu $36$ zł. Ile złotych miał na początku? **Wybierz właściwą odpowiedź.**",
          opcje: ["$60$ zł", "$72$ zł", "$24$ zł", "$14{,}40$ zł"],
          poprawna: 0,
        },
        {
          nr: "52",
          tresc: "Co jest większe: $\\frac{3}{4}$ z $20$ czy $\\frac{2}{3}$ z $24$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{3}{4}$ z $20$, bo wynosi $16$", "$\\frac{3}{4}$ z $20$, bo wynosi $15$", "$\\frac{2}{3}$ z $24$, bo wynosi $16$", "Obie liczby są równe."],
          poprawna: 2,
        },
        {
          nr: "53",
          tresc: "$\\frac{3}{5}$ książki to $45$ stron. Ile stron ma cała książka? **Wybierz właściwą odpowiedź.**",
          opcje: ["$27$", "$75$", "$135$", "$30$"],
          poprawna: 1,
        },
        {
          nr: "54",
          tresc: "Pani Ewa miała $60$ zł. Wydała $\\frac{1}{4}$ tej kwoty na książkę i $\\frac{1}{3}$ tej kwoty na bilet. Ile złotych jej zostało? **Wybierz właściwą odpowiedź.**",
          opcje: ["$35$ zł", "$25$ zł", "$5$ zł", "$15$ zł"],
          poprawna: 1,
        },
        {
          nr: "55",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$\\frac{1}{2}$ z $\\frac{1}{3}$ to $\\frac{1}{6}$.", litery: "PF", poprawna: 0 },
            { tekst: "$\\frac{3}{10}$ z $50$ to $150$.", litery: "PF", poprawna: 1 },
            { tekst: "Jeśli $\\frac{2}{9}$ pewnej liczby to $8$, to ta liczba jest równa $36$.", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "56",
          punkty: 2,
          tresc: "Książka ma $240$ stron. W sobotę Ania przeczytała $\\frac{3}{8}$ książki, a w niedzielę $\\frac{1}{4}$ książki. Ile stron jeszcze zostało jej do przeczytania? **Zapisz obliczenia.**",
          rozwiazanie: "W sobotę: $\\frac{3}{8}$ z $240$. Mamy $240:8=30$, a $30\\cdot3=90$ stron.\n\nW niedzielę: $\\frac{1}{4}$ z $240=240:4=60$ stron.\n\nPrzeczytane razem: $90+60=150$ stron. Zostało: $240-150=90$ stron.\n\nOdpowiedź: Ani zostało do przeczytania $90$ stron.",
        },
        {
          nr: "57",
          punkty: 3,
          tresc: "Pan Adam przejechał najpierw $\\frac{2}{5}$ trasy, a potem jeszcze $\\frac{3}{10}$ trasy. Do końca zostało mu $90$ km. Jaką długość ma cała trasa? **Zapisz obliczenia.**",
          rozwiazanie: "Przejechane części razem: $\\frac{2}{5}+\\frac{3}{10}=\\frac{4}{10}+\\frac{3}{10}=\\frac{7}{10}$ trasy.\n\nZostało $1-\\frac{7}{10}=\\frac{3}{10}$ trasy i to jest $90$ km.\n\nJedna dziesiąta trasy: $90:3=30$ km. Cała trasa: $30\\cdot10=300$ km.\n\nSprawdzenie: $\\frac{3}{10}\\cdot300=90$.\n\nOdpowiedź: Cała trasa ma $300$ km.",
        },
        {
          nr: "58",
          punkty: 2,
          tresc: "W klasie jest $27$ uczniów. $\\frac{4}{9}$ uczniów trenuje piłkę nożną, a $\\frac{1}{3}$ uczniów pływa. Nikt nie robi obu rzeczy naraz. Ilu uczniów nie trenuje ani piłki, ani pływania? **Zapisz obliczenia.**",
          rozwiazanie: "Piłkę nożną trenuje $\\frac{4}{9}$ z $27$. Mamy $27:9=3$, a $3\\cdot4=12$ uczniów.\n\nPływa $\\frac{1}{3}$ z $27$. Mamy $27:3=9$ uczniów.\n\nObie grupy razem: $12+9=21$ uczniów. Pozostali: $27-21=6$ uczniów.\n\nOdpowiedź: Ani piłki, ani pływania nie trenuje $6$ uczniów.",
        },
        {
          nr: "59",
          punkty: 2,
          tresc: "Basia idzie na wycieczkę. Gdy przeszła $\\frac{3}{5}$ trasy, do mety zostało jej $12$ km. Ile kilometrów ma cała trasa? **Zapisz obliczenia.**",
          rozwiazanie: "Zostało $1-\\frac{3}{5}=\\frac{2}{5}$ trasy i to jest $12$ km.\n\nJedna piąta trasy: $12:2=6$ km. Cała trasa: $6\\cdot5=30$ km.\n\nSprawdzenie: $\\frac{3}{5}$ z $30$ to $18$ km, a $30-18=12$ km.\n\nOdpowiedź: Cała trasa ma $30$ km.",
        },
      ],
      generatory: [
        {
          id: "ulamek-z-liczby",
          nazwa: "Ułamek liczby",
          opis: "Oblicz ułamek liczby albo ile zostało po wydaniu części.",
          generuj(r) {
            let a, b;
            do {
              b = r.pick([2, 3, 4, 5, 6, 8, 10]);
              a = r.int(1, b - 1);
            } while (nwdf(a, b) !== 1);
            const t = r.int(0, 3);
            const m = t === 3 ? r.int(12, 40) : r.int(2, 15), N = b * m;   // książka: co najmniej 24 strony
            const f = fr(a, b);
            if (t === 0) {
              return {
                tresc: `Oblicz $${f}$ z $${N}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w: a * m },
                wynik: `$${a * m}$`,
                rozwiazanie: [`Dzielimy $${N}$ przez mianownik: $${N} : ${b} = ${m}$ (jedna część).`, `Mnożymy przez licznik: $${m} \\cdot ${a} = ${a * m}$.`],
              };
            }
            if (t === 1) {
              return {
                tresc: `W skrzynce jest $${N}$ ${mn(N, "jabłko", "jabłka", "jabłek")}. Czerwone jabłka to $${f}$ wszystkich jabłek w skrzynce. Ile jest czerwonych jabłek?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba jabłek" }],
                odpowiedz: { w: a * m },
                wynik: `$${a * m}$`,
                rozwiazanie: [`Szukamy $${f}$ z $${N}$. Dzielimy przez mianownik: $${N} : ${b} = ${m}$.`, `Mnożymy przez licznik: $${m} \\cdot ${a} = ${a * m}$.`],
              };
            }
            if (t === 2) {
              const zostalo = (b - a) * m;
              return {
                tresc: `Pan Jan miał $${N}$ zł. Wydał $${f}$ tej kwoty. Ile złotych mu zostało?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Kwota w zł" }],
                odpowiedz: { w: zostalo },
                wynik: `$${zostalo}$`,
                rozwiazanie: [
                  a === 1
                    ? `Jedna część to $${N} : ${b} = ${m}$ zł. Wydano jedną część, czyli $${m}$ zł.`
                    : `Jedna część to $${N} : ${b} = ${m}$ zł. Wydano $${a}$ ${mn(a, "część", "części", "części")}: $${m} \\cdot ${a} = ${a * m}$ zł.`,
                  `Zostało: $${N} - ${a * m} = ${zostalo}$ zł.`,
                ],
              };
            }
            return {
              tresc: `Ola przeczytała $${f}$ książki, czyli $${a * m}$ ${mn(a * m, "stronę", "strony", "stron")}. Ile stron ma cała książka?`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Liczba stron" }],
              odpowiedz: { w: N },
              wynik: `$${N}$`,
              rozwiazanie: [
                a === 1
                  ? `$${f}$ książki to $${m}$ ${mn(m, "stronę", "strony", "stron")} i to jest jedna część.`
                  : `$${f}$ książki to $${a * m}$ ${mn(a * m, "stronę", "strony", "stron")}. Dzielimy przez licznik: $${a * m} : ${a} = ${m}$ (to jedna część).`,
                `Cała książka to $${b}$ takich części: $${m} \\cdot ${b} = ${N}$.`,
                `Sprawdzenie: $${f}$ z $${N}$ to $${a * m}$.`,
              ],
            };
          },
        },
        {
          id: "ulamek-dwie-czesci",
          nazwa: "Dwie części całości",
          opis: "Z całości zabrano dwie części (ułamki). Oblicz, ile zostało.",
          generuj(r) {
            for (;;) {
              const d1 = r.pick([2, 3, 4, 5, 8, 10]), d2 = r.pick([2, 3, 4, 5, 8, 10]);
              const a1 = r.int(1, d1 - 1), a2 = r.int(1, d2 - 1);
              if (nwdf(a1, d1) !== 1 || nwdf(a2, d2) !== 1) continue;
              const S = q(a1, d1).add(q(a2, d2));
              if (S.cmp(q(1)) >= 0) continue;
              const L = nwwf(d1, d2), m = r.int(1, Math.max(1, Math.floor(200 / L)));
              const N = L * m;
              if (N < 20 || N > 400) continue;
              const c1 = (N / d1) * a1, c2 = (N / d2) * a2, zostalo = N - c1 - c2;
              if (zostalo <= 0) continue;
              return {
                tresc: `Książka ma $${N}$ ${mn(N, "stronę", "strony", "stron")}. W sobotę Ania przeczytała $${fr(a1, d1)}$ książki, a w niedzielę $${fr(a2, d2)}$ książki. Ile stron zostało jej do przeczytania?`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Liczba stron" }],
                odpowiedz: { w: zostalo },
                wynik: `$${zostalo}$`,
                rozwiazanie: [
                  `W sobotę: $${fr(a1, d1)}$ z $${N}$. Mamy $${N} : ${d1} = ${N / d1}$, a $${N / d1} \\cdot ${a1} = ${c1}$.`,
                  `W niedzielę: $${fr(a2, d2)}$ z $${N}$. Mamy $${N} : ${d2} = ${N / d2}$, a $${N / d2} \\cdot ${a2} = ${c2}$.`,
                  `Przeczytane razem: $${c1} + ${c2} = ${c1 + c2}$. Zostało: $${N} - ${c1 + c2} = ${zostalo}$.`,
                ],
              };
            }
          },
        },
      ],
    },

    // ------------------------------------------------------------------------------------------------
    {
      id: "kolejnosc-dzialan",
      nazwa: "Kolejność wykonywania działań",
      sciaga: [
        {
          nazwa: "Kolejność działań",
          slownie: "Najpierw wykonujemy działania w nawiasach. Potem mnożenie i dzielenie, a na końcu dodawanie i odejmowanie. Działania tego samego rodzaju wykonujemy od lewej do prawej.",
          tex: "(\\ )\\ \\to\\ \\cdot\\ :\\ \\to\\ +\\ -",
          przyklad: "$\\frac{1}{2}+\\frac{3}{4}\\cdot\\frac{2}{3}=\\frac{1}{2}+\\frac{1}{2}=1$. Najpierw mnożenie, potem dodawanie.",
          uwaga: "Nie dodawaj przed mnożeniem. Gdyby dodać najpierw, wynik byłby błędny.",
        },
        {
          nazwa: "Nawiasy i ułamki",
          slownie: "Wyrażenie w nawiasie liczymy jako pierwsze. Wynik nawiasu traktujemy jak jedną liczbę.",
          tex: "(\\frac{1}{2}+\\frac{1}{3}):\\frac{5}{6}=1",
          przyklad: "Nawias: $\\frac{1}{2}+\\frac{1}{3}=\\frac{3}{6}+\\frac{2}{6}=\\frac{5}{6}$. Dzielenie: $\\frac{5}{6}:\\frac{5}{6}=1$.",
          uwaga: "Gdy nawias jest w wyrażeniu, nie rozdzielaj go. Najpierw policz całą jego zawartość.",
        },
        {
          nazwa: "Ułamki dziesiętne w wyrażeniach",
          slownie: "Zasady są te same. Mnożenie i dzielenie wykonujemy przed dodawaniem i odejmowaniem, a nawiasy przed wszystkim.",
          przyklad: "$5-0{,}4\\cdot3=5-1{,}2=3{,}8$. Z nawiasem: $(2{,}5+1{,}5):0{,}8=4:0{,}8=5$.",
          uwaga: "W $5-0{,}4\\cdot3$ nie odejmuj najpierw $0{,}4$ od $5$. Najpierw mnożenie.",
        },
        {
          nazwa: "Dzielenie i mnożenie od lewej",
          slownie: "Gdy w wyrażeniu są tylko mnożenie i dzielenie, liczymy po kolei od lewej strony.",
          tex: "12:\\frac{3}{4}\\cdot\\frac{1}{2}=16\\cdot\\frac{1}{2}=8",
          przyklad: "$12:\\frac{3}{4}=12\\cdot\\frac{4}{3}=16$. Potem $16\\cdot\\frac{1}{2}=8$.",
          uwaga: "Nie wykonuj mnożenia przed dzieleniem, gdy dzielenie stoi z lewej strony.",
        },
      ],
      jak: [
        "Zaznacz działania i ustal ich kolejność: nawiasy, potem mnożenie i dzielenie, na końcu dodawanie i odejmowanie.",
        "Licz po jednym działaniu naraz i zapisuj wynik, a resztę przepisuj.",
        "Ułamki zwykłe i dziesiętne wykonuj osobno, gdy to ułatwia, albo zamień je na jedną postać.",
        "Sprawdź wynik, np. szacując go w głowie.",
      ],
      zadania: [
        {
          nr: "60",
          tresc: "Ile wynosi $\\frac{1}{2}+\\frac{1}{3}\\cdot6$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$5$", "$2\\frac{1}{2}$", "$\\frac{5}{6}$", "$2\\frac{1}{3}$"],
          poprawna: 1,
        },
        {
          nr: "61",
          tresc: "Ile wynosi $\\left(2\\frac{1}{2}-1\\frac{1}{4}\\right):\\frac{5}{8}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$1\\frac{1}{4}$", "$\\frac{1}{2}$", "$2\\frac{1}{2}$", "$2$"],
          poprawna: 3,
        },
        {
          nr: "62",
          tresc: "Ile wynosi $8-1{,}5\\cdot4$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$26$", "$6{,}5$", "$2$", "$12$"],
          poprawna: 2,
        },
        {
          nr: "63",
          tresc: "Ile wynosi $6:\\frac{3}{4}\\cdot\\frac{1}{2}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$4$", "$9$", "$16$", "$\\frac{1}{4}$"],
          poprawna: 0,
        },
        {
          nr: "64",
          tresc: "Ile wynosi $\\left(1{,}5+0{,}5\\right)\\cdot0{,}3$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$0{,}6$", "$1{,}65$", "$6$", "$0{,}06$"],
          poprawna: 0,
        },
        {
          nr: "65",
          tresc: "Ile wynosi $\\frac{3}{4}-\\frac{1}{4}:\\frac{1}{2}$? **Wybierz właściwą odpowiedź.**",
          opcje: ["$\\frac{1}{4}$", "$1$", "$\\frac{1}{8}$", "$\\frac{1}{2}$"],
          poprawna: 0,
        },
        {
          nr: "66",
          tresc: "Oceń zdania. **Dla każdego zdania wybierz P, jeśli jest prawdziwe, albo F, jeśli jest fałszywe.**",
          czesci: [
            { tekst: "$2+3\\cdot\\frac{1}{3}=3$", litery: "PF", poprawna: 0 },
            { tekst: "$\\left(\\frac{1}{2}+\\frac{1}{2}\\right)\\cdot4=3$", litery: "PF", poprawna: 1 },
            { tekst: "$10-2\\cdot2{,}5=5$", litery: "PF", poprawna: 0 },
          ],
        },
      ],
      otwarte: [
        {
          nr: "67",
          punkty: 2,
          tresc: "Oblicz wartość wyrażenia $\\left(3\\frac{1}{2}-1\\frac{3}{4}\\right):\\frac{7}{8}+2\\cdot\\frac{3}{4}$. **Zapisz obliczenia.**",
          rozwiazanie: "Najpierw nawias: $3\\frac{1}{2}-1\\frac{3}{4}=3\\frac{2}{4}-1\\frac{3}{4}=2\\frac{6}{4}-1\\frac{3}{4}=1\\frac{3}{4}=\\frac{7}{4}$.\n\nDzielenie: $\\frac{7}{4}:\\frac{7}{8}=\\frac{7}{4}\\cdot\\frac{8}{7}=2$.\n\nMnożenie: $2\\cdot\\frac{3}{4}=\\frac{6}{4}=1\\frac{1}{2}$.\n\nDodawanie: $2+1\\frac{1}{2}=3\\frac{1}{2}$.\n\nOdpowiedź: Wartość wyrażenia to $3\\frac{1}{2}$.",
        },
        {
          nr: "68",
          punkty: 3,
          tresc: "Kasia kupiła $2$ kg jabłek po $3{,}80$ zł za kilogram i $1{,}5$ kg gruszek po $4{,}60$ zł za kilogram. Zapłaciła banknotem $20$ zł. Zapisz jednym wyrażeniem, ile złotych reszty dostała, i oblicz jego wartość. **Zapisz obliczenia.**",
          rozwiazanie: "Wyrażenie: $20-(2\\cdot3{,}8+1{,}5\\cdot4{,}6)$.\n\nW nawiasie najpierw mnożenie: $2\\cdot3{,}8=7{,}6$ oraz $1{,}5\\cdot4{,}6=6{,}9$.\n\nDodajemy w nawiasie: $7{,}6+6{,}9=14{,}5$.\n\nOdejmujemy: $20-14{,}5=5{,}5$.\n\nOdpowiedź: Kasia dostała $5{,}50$ zł reszty.",
        },
        {
          nr: "69",
          punkty: 2,
          tresc: "Oblicz wartość wyrażenia $4{,}8:(0{,}5+0{,}7)-1{,}5\\cdot2$. **Zapisz obliczenia.**",
          rozwiazanie: "Najpierw nawias: $0{,}5+0{,}7=1{,}2$.\n\nDzielenie: $4{,}8:1{,}2=48:12=4$. Mnożenie: $1{,}5\\cdot2=3$.\n\nOdejmowanie: $4-3=1$.\n\nOdpowiedź: Wartość wyrażenia to $1$.",
        },
      ],
      generatory: [
        {
          id: "kolejnosc",
          nazwa: "Kolejność działań",
          opis: "Oblicz wyrażenie z ułamkami zwykłymi albo dziesiętnymi, pamiętając o kolejności działań.",
          generuj(r) {
            const t = r.int(0, 3);
            if (t === 0) {
              for (;;) {
                const d1 = r.pick([2, 3, 4, 5, 6, 8]), d2 = r.pick([2, 3, 4, 5, 6, 8]);
                const A = q(r.int(1, 3 * d1), d1), B = q(r.int(1, d2 - 1), d2), C = r.int(2, 8);
                const X = B.mul(C);
                const minus = A.cmp(X) > 0 && r.chance(0.5);
                const res = minus ? A.sub(X) : A.add(X);
                if (res.d > 24 || res.cmp(0) <= 0) continue;
                const op = minus ? "-" : "+";
                return {
                  tresc: `Oblicz $${qm(A)} ${op} ${qf(B)} \\cdot ${C}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Wynik jako ułamek lub liczba" }],
                  odpowiedz: { w: res },
                  wynik: `$${qm(res)}$`,
                  rozwiazanie: [
                    `Najpierw mnożenie: $${qf(B)} \\cdot ${C} = ${qm(X)}$.`,
                    `Potem ${minus ? "odejmowanie" : "dodawanie"}: $${qm(A)} ${op} ${qm(X)} = ${qm(res)}$.`,
                  ],
                };
              }
            }
            if (t === 1) {
              for (;;) {
                const d1 = r.pick([2, 3, 4, 5, 6, 8]), d2 = r.pick([2, 3, 4, 5, 6, 8]);
                const A = q(r.int(1, d1 - 1), d1), B = q(r.int(1, d2 - 1), d2), N = r.int(2, 12);
                const minus = A.cmp(B) > 0 && r.chance(0.5);
                const S = minus ? A.sub(B) : A.add(B);
                const dziel = r.chance(0.4);
                const res = dziel ? S.div(N) : S.mul(N);
                if (res.d > 40 || res.cmp(0) <= 0) continue;
                const op = minus ? "-" : "+";
                return {
                  tresc: `Oblicz $\\left(${qf(A)} ${op} ${qf(B)}\\right) ${dziel ? ":" : "\\cdot"} ${N}$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Wynik jako ułamek lub liczba" }],
                  odpowiedz: { w: res },
                  wynik: `$${qm(res)}$`,
                  rozwiazanie: [
                    `Najpierw nawias: $${qf(A)} ${op} ${qf(B)} = ${qm(S)}$.`,
                    `Potem ${dziel ? "dzielenie" : "mnożenie"}: $${qm(S)} ${dziel ? ":" : "\\cdot"} ${N} = ${qm(res)}$.`,
                  ],
                };
              }
            }
            if (t === 2) {
              const B = r.int(2, 9), c = r.int(2, 9);
              const minus = r.chance(0.5);
              let A;
              do { A = minus ? r.int(B * c + 10, 200) : r.int(11, 200); } while (A % 10 === 0);
              const X = q(B * c, 10), a = q(A, 10), b = q(B, 10);
              const res = minus ? a.sub(X) : a.add(X);
              const op = minus ? "-" : "+";
              return {
                tresc: `Oblicz $${fmtD(a)} ${op} ${fmtD(b)} \\cdot ${c}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w: res },
                wynik: `$${fmtD(res)}$`,
                rozwiazanie: [
                  `Najpierw mnożenie: $${fmtD(b)} \\cdot ${c} = ${fmtD(X)}$.`,
                  `Potem ${minus ? "odejmowanie" : "dodawanie"}: $${fmtD(a)} ${op} ${fmtD(X)} = ${fmtD(res)}$.`,
                ],
              };
            }
            for (;;) {
              const d = r.pick([2, 3, 4, 5, 6]), d2 = r.pick([2, 3, 4, 5, 6, 8]);
              const A = q(r.int(1, d - 1), d), B = q(r.int(1, d2 - 1), d2), N = r.int(2, 9);
              const X = q(N).div(A);
              const minus = r.chance(0.5);
              const res = minus ? X.sub(B) : X.add(B);
              if (res.d > 40 || res.cmp(0) <= 0) continue;
              const op = minus ? "-" : "+";
              return {
                tresc: `Oblicz $${N} : ${qf(A)} ${op} ${qf(B)}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik jako ułamek lub liczba" }],
                odpowiedz: { w: res },
                wynik: `$${qm(res)}$`,
                rozwiazanie: [
                  `Najpierw dzielenie: $${N} : ${qf(A)} = ${N} \\cdot ${fr(A.d, A.n)} = ${qm(X)}$.`,
                  `Potem ${minus ? "odejmowanie" : "dodawanie"}: $${qm(X)} ${op} ${qf(B)} = ${qm(res)}$.`,
                ],
              };
            }
          },
        },
        {
          id: "kolejnosc-nawiasy-dziesietne",
          nazwa: "Nawiasy i ułamki dziesiętne",
          opis: "Oblicz wyrażenie z nawiasem i ułamkami dziesiętnymi, pamiętając o kolejności działań.",
          generuj(r) {
            const t = r.int(0, 2);
            if (t === 2) {
              // a : (b + c) = M
              for (;;) {
                const M = r.int(2, 9), s10 = r.int(12, 60);
                const b10 = r.int(1, s10 - 1), c10 = s10 - b10;
                const a10 = M * s10;
                if (b10 === c10 || b10 % 10 === 0 || c10 % 10 === 0 || a10 % 10 === 0) continue;
                const a = q(a10, 10), b = q(b10, 10), c = q(c10, 10), S = q(s10, 10);
                return {
                  tresc: `Oblicz $${fmtD(a)} : (${fmtD(b)} + ${fmtD(c)})$.`,
                  pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                  odpowiedz: { w: M },
                  wynik: `$${M}$`,
                  rozwiazanie: [
                    `Najpierw nawias: $${fmtD(b)} + ${fmtD(c)} = ${fmtD(S)}$.`,
                    `Potem dzielenie: $${fmtD(a)} : ${fmtD(S)} = ${a10} : ${s10} = ${M}$.`,
                  ],
                };
              }
            }
            const minus = r.chance(0.5);
            let A, B;
            do {
              A = r.int(11, 99); B = r.int(11, 99);
              if (minus && A <= B) [A, B] = [B, A];
            } while (A % 10 === 0 || B % 10 === 0 || (minus && A === B));
            const S10 = minus ? A - B : A + B;
            const S = q(S10, 10), op = minus ? "-" : "+";
            const a = q(A, 10), b = q(B, 10);
            if (t === 0) {
              const c = r.int(2, 9), res = S.mul(c);
              return {
                tresc: `Oblicz $\\left(${fmtD(a)} ${op} ${fmtD(b)}\\right) \\cdot ${c}$.`,
                pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
                odpowiedz: { w: res },
                wynik: `$${fmtD(res)}$`,
                rozwiazanie: [
                  `Najpierw nawias: $${fmtD(a)} ${op} ${fmtD(b)} = ${fmtD(S)}$.`,
                  `Potem mnożenie: $${fmtD(S)} \\cdot ${c} = ${fmtD(res)}$.`,
                ],
              };
            }
            const c = r.pick([2, 4, 5, 8].filter((k) => (S10 * 10) % k === 0)), res = S.div(c);   // najwyżej 2 cyfry po przecinku
            return {
              tresc: `Oblicz $\\left(${fmtD(a)} ${op} ${fmtD(b)}\\right) : ${c}$.`,
              pola: [{ id: "w", typ: "liczba", etykieta: "Wynik" }],
              odpowiedz: { w: res },
              wynik: `$${fmtD(res)}$`,
              rozwiazanie: [
                `Najpierw nawias: $${fmtD(a)} ${op} ${fmtD(b)} = ${fmtD(S)}$.`,
                `Potem dzielenie: $${fmtD(S)} : ${c} = ${fmtD(res)}$.`,
              ],
            };
          },
        },
      ],
    },
  ],
};
