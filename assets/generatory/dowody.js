// Generatory zadań z działu „Dowody i optymalizacja” (matura podstawowa, formuła 2023).
// Dowodów nie da się sprawdzić automatycznie, więc są tu tylko zadania optymalizacyjne: największa lub najmniejsza
// wartość funkcji kwadratowej (wierzchołek paraboli). Kontrakt zadania i narzędzia: zob. wspolne.js.
// Każde zadanie budujemy od końca – z ładnej odpowiedzi.
import { Q, q, texNawias, wielomianTex, plusMinus } from "./wspolne.js";

// --- Drobne pomocnicze

/** p = -b/(2a) z podstawieniem: "p = -\frac{60}{2 \cdot (-2)} = 15". */
function pTex(a, b, p) {
  const A = Q.z(a), B = Q.z(b);
  return `p = -\\frac{b}{2a} = -\\frac{${B.tex()}}{2 \\cdot ${texNawias(A)}} = ${Q.z(p).tex()}`;
}

const trzyPola = (pola, odpowiedz, wynik, tresc, rozwiazanie) =>
  ({ tresc, pola: pola.map(([id, etykieta]) => ({ id, typ: "liczba", etykieta })), odpowiedz, wynik, rozwiazanie });

// --- 1. Ogrodzenie: prostokąt o największym polu

/** Siatka o danej długości; wymiary i największe pole prostokątnego terenu (przy murze albo bez muru). */
function ogrodzenie(r) {
  const wariant = r.int(0, 2);
  const m = r.int(4, 25);
  const miejsce = r.pick(["ogródek warzywny", "wybieg dla królików", "plac zabaw", "padok dla koni"]);
  if (wariant === 2) {
    // Cały obwód: 2x + 2y = L, kwadrat.
    const L = 4 * m;
    const pole = m * m;
    const tresc = r.pick([
      `Z drutu o długości $${L}$ m trzeba zbudować prostokątną ramę. Oblicz wymiary prostokąta o największym polu i podaj to pole.`,
      `Obwód prostokąta jest równy $${L}$ m. Dla jakich długości boków pole tego prostokąta jest największe? Jakie jest to pole?`,
    ]);
    return trzyPola(
      [["x", "Jeden bok (w m)"], ["y", "Drugi bok (w m)"], ["P", "Największe pole (w m$^2$)"]],
      { x: q(m), y: q(m), P: q(pole) },
      `Boki: $${m}$ m i $${m}$ m, pole: $${pole}$ m$^2$`,
      tresc,
      [
        `Niech $x$ to długość jednego boku. Obwód to $${L}$, więc drugi bok ma długość $y = ${L / 2} - x$. Boki są dodatnie, więc $x \\in (0, ${L / 2})$.`,
        `Pole: $P(x) = x(${L / 2} - x) = ${wielomianTex([-1, L / 2, 0])}$.`,
        `Współczynnik $a = -1 < 0$, więc funkcja ma wartość największą dla wierzchołka: $${pTex(-1, L / 2, m)}$, a to jest liczba z dziedziny.`,
        `Drugi bok: $y = ${L / 2} - ${m} = ${m}$. Pole: $P(${m}) = ${m} \\cdot ${m} = ${pole}$ m$^2$ (kwadrat).`,
      ],
    );
  }
  // Przy murze: k boków prostopadłych do muru (2 albo 3) i jeden równoległy.
  const k = wariant === 0 ? 2 : 3;
  const L = 2 * k * m;
  const x = L / (2 * k), y = L - k * x;   // x = m, y = L - k·m = k·m
  const pole = x * y;
  const opis = k === 2
    ? `Siatka biegnie wzdłuż trzech boków: dwóch prostopadłych do muru i jednego równoległego.`
    : `Dodatkowo teren ma być podzielony na dwie części siatką prostopadłą do muru, więc siatka biegnie wzdłuż czterech odcinków: trzech prostopadłych do muru i jednego równoległego.`;
  const tresc = r.pick([
    `Mamy $${L}$ m siatki ogrodzeniowej. Chcemy nią ogrodzić prostokątny ${miejsce} przylegający jednym bokiem do muru (przy murze siatka nie jest potrzebna)${k === 3 ? " i podzielić go na dwie części siatką prostopadłą do muru" : ""}. Oblicz wymiary terenu o największym polu i podaj to pole.`,
    `Prostokątny ${miejsce} ma przylegać jednym bokiem do muru, który nie wymaga ogrodzenia${k === 3 ? ", a w środku ma być oddzielony siatką prostopadłą do muru na dwie części" : ""}. Do dyspozycji jest $${L}$ m siatki. Jakie wymiary ma teren o największym polu? Ile wynosi to pole?`,
  ]);
  const wzorY = k === 2 ? `${L} - 2x` : `${L} - 3x`;
  return trzyPola(
    [["x", "Bok prostopadły do muru (w m)"], ["y", "Bok równoległy do muru (w m)"], ["P", "Największe pole (w m$^2$)"]],
    { x: q(x), y: q(y), P: q(pole) },
    `Bok prostopadły do muru: $${x}$ m, równoległy: $${y}$ m, pole: $${pole}$ m$^2$`,
    tresc,
    [
      `Niech $x$ to długość boku prostopadłego do muru, a $y$ – boku równoległego. ${opis}`,
      `Siatki jest $${L}$ m, więc $${k}x + y = ${L}$, czyli $y = ${wzorY}$. Z $y > 0$ mamy $x \\in \\left(0, ${q(L, k).tex()}\\right)$.`,
      `Pole: $P(x) = x(${wzorY}) = ${wielomianTex([-k, L, 0])}$.`,
      `Współczynnik $a = ${-k} < 0$, więc największa wartość jest w wierzchołku: $${pTex(-k, L, x)}$.`,
      `Drugi bok: $y = ${L} - ${k} \\cdot ${x} = ${y}$. Pole: $P(${x}) = ${x} \\cdot ${y} = ${pole}$ m$^2$.`,
    ],
  );
}

// --- 2. Dwie liczby o danej sumie albo różnicy

/** Największy iloczyn i najmniejsza suma kwadratów liczb o danej sumie; iloczyn liczb o danej różnicy. */
function dwieLiczby(r) {
  const wariant = r.int(0, 3);
  if (wariant === 0) {
    const s = r.chance(0.75) ? 2 * r.int(4, 20) : r.int(9, 39) | 1;
    const x = q(s, 2), iloczyn = x.mul(x);
    return trzyPola(
      [["x", "Każda z liczb"], ["P", "Największy iloczyn"]],
      { x, P: iloczyn },
      `Obie liczby są równe $${x.tex()}$, iloczyn: $${iloczyn.tex()}$`,
      `Suma dwóch liczb jest równa $${s}$. Dla jakich liczb ich iloczyn jest największy? Podaj te liczby (są jednakowe) i ten iloczyn.`,
      [
        `Niech $x$ to jedna z liczb. Druga to $${s} - x$ (ich suma to $${s}$). Obie mogą być dowolnymi liczbami rzeczywistymi.`,
        `Iloczyn: $f(x) = x(${s} - x) = ${wielomianTex([-1, s, 0])}$.`,
        `Współczynnik $a = -1 < 0$, więc funkcja ma wartość największą w wierzchołku: $${pTex(-1, s, x)}$. Druga liczba też jest równa $${x.tex()}$.`,
        `Największy iloczyn: $${x.tex()} \\cdot ${x.tex()} = ${iloczyn.tex()}$.`,
      ],
    );
  }
  if (wariant === 1) {
    const s = r.chance(0.75) ? 2 * r.int(3, 15) : r.int(7, 29) | 1;
    const x = q(s, 2), suma = x.mul(x).mul(2);
    return trzyPola(
      [["x", "Każda z liczb"], ["S", "Najmniejsza suma kwadratów"]],
      { x, S: suma },
      `Obie liczby są równe $${x.tex()}$, suma kwadratów: $${suma.tex()}$`,
      `Suma dwóch liczb jest równa $${s}$. Dla jakich liczb suma ich kwadratów jest najmniejsza? Podaj te liczby (są jednakowe) i tę sumę.`,
      [
        `Niech $x$ to jedna z liczb. Druga to $${s} - x$.`,
        `Suma kwadratów: $f(x) = x^2 + (${s} - x)^2 = ${wielomianTex([2, -2 * s, s * s])}$.`,
        `Współczynnik $a = 2 > 0$, więc najmniejsza wartość jest w wierzchołku: $${pTex(2, -2 * s, x)}$. Druga liczba też jest równa $${x.tex()}$.`,
        `Najmniejsza suma kwadratów: $${x.tex()}^2 + ${x.tex()}^2 = ${suma.tex()}$.`,
      ],
    );
  }
  if (wariant === 2) {
    const d = 2 * r.int(2, 12);
    const h = d / 2, iloczyn = -h * h;
    return trzyPola(
      [["x", "Większa liczba"], ["y", "Mniejsza liczba"], ["P", "Najmniejszy iloczyn"]],
      { x: q(h), y: q(-h), P: q(iloczyn) },
      `Liczby: $${h}$ i $${-h}$, iloczyn: $${iloczyn}$`,
      `Różnica dwóch liczb jest równa $${d}$. Dla jakich liczb ich iloczyn jest najmniejszy? Podaj te liczby i ten iloczyn.`,
      [
        `Niech $y$ to mniejsza liczba. Większa to $y + ${d}$ (różnica wynosi $${d}$).`,
        `Iloczyn: $f(y) = y(y + ${d}) = ${wielomianTex([1, d, 0], "y")}$.`,
        `Współczynnik $a = 1 > 0$, więc najmniejsza wartość jest w wierzchołku: $p = -\\frac{${d}}{2 \\cdot 1} = ${-h}$. Zatem $y = ${-h}$, a większa liczba to $${-h} + ${d} = ${h}$.`,
        `Najmniejszy iloczyn: $${h} \\cdot ${texNawias(-h)} = ${iloczyn}$.`,
      ],
    );
  }
  // x + 2y = s, największy iloczyn xy
  const m = r.int(2, 12), s = 4 * m;
  return trzyPola(
    [["x", "$x =$"], ["y", "$y =$"], ["P", "Największy iloczyn $xy$"]],
    { x: q(2 * m), y: q(m), P: q(2 * m * m) },
    `$x = ${2 * m}$, $y = ${m}$, iloczyn: $${2 * m * m}$`,
    `Liczby dodatnie $x$ i $y$ spełniają warunek $x + 2y = ${s}$. Dla jakich $x$ i $y$ iloczyn $xy$ jest największy? Podaj $x$, $y$ i ten iloczyn.`,
    [
      `Z warunku $x = ${s} - 2y$. Liczby są dodatnie, więc $y \\in (0, ${s / 2})$.`,
      `Iloczyn: $f(y) = (${s} - 2y)y = ${wielomianTex([-2, s, 0], "y")}$.`,
      `Współczynnik $a = -2 < 0$, więc największa wartość jest w wierzchołku: $${pTex(-2, s, m)}$, czyli $y = ${m}$.`,
      `Wtedy $x = ${s} - 2 \\cdot ${m} = ${2 * m}$, a iloczyn: $xy = ${2 * m} \\cdot ${m} = ${2 * m * m}$.`,
    ],
  );
}

// --- 3. Cena i sprzedaż: największy przychód

const TOWARY = ["plecaków", "koszulek", "kubków", "zeszytów", "kalendarzy", "piłek"];

/** Przychód (c ∓ x)(n ± kx): zmiana ceny o x zł zmienia sprzedaż o kx sztuk. */
function przychod(r) {
  const obnizka = r.chance(0.6);
  const towar = r.pick(TOWARY);
  let c, k, p, n, a, b;
  if (obnizka) {
    p = r.int(1, 5);
    c = r.int(2 * p + 4, 30);
    k = r.pick([5, 10, 20, 25]);
    n = k * (c - 2 * p);
  } else {
    p = r.int(1, 6);
    c = r.int(6, 25);
    k = r.pick([2, 5, 10]);
    n = k * (c + 2 * p);
  }
  const znak = obnizka ? "-" : "+";
  const nowaCena = obnizka ? c - p : c + p;
  const sprzedaz = k * nowaCena;
  const przychodMax = nowaCena * sprzedaz;
  b = obnizka ? k * c - n : n - k * c;   // wyraz przy x po wymnożeniu
  a = -k;
  const zmiana = obnizka ? "obniżka" : "podwyżka";
  const tresc = obnizka
    ? `Sklep sprzedaje miesięcznie $${n}$ ${towar} po $${c}$ zł za sztukę. Z badań wynika, że każda obniżka ceny o $1$ zł zwiększa miesięczną sprzedaż o $${k}$ sztuk. O ile złotych należy obniżyć cenę, aby miesięczny przychód ze sprzedaży był największy? Podaj tę obniżkę, nową cenę i największy przychód.`
    : `Sklep sprzedaje miesięcznie $${n}$ ${towar} po $${c}$ zł za sztukę. Z badań wynika, że każda podwyżka ceny o $1$ zł zmniejsza miesięczną sprzedaż o $${k}$ sztuk. O ile złotych należy podnieść cenę, aby miesięczny przychód ze sprzedaży był największy? Podaj tę podwyżkę, nową cenę i największy przychód.`;
  const sprzedazWzor = obnizka ? `${n} + ${k}x` : `${n} - ${k}x`;
  const dziedzina = obnizka
    ? `Cena musi być dodatnia, więc $x \\in [0, ${c})$.`
    : `Sprzedaż nie może być ujemna, więc $x \\in [0, ${q(n, k).tex()}]$.`;
  return trzyPola(
    [["x", obnizka ? "Obniżka ceny (w zł)" : "Podwyżka ceny (w zł)"], ["c", "Nowa cena (w zł)"], ["P", "Największy przychód (w zł)"]],
    { x: q(p), c: q(nowaCena), P: q(przychodMax) },
    `${zmiana[0].toUpperCase() + zmiana.slice(1)}: $${p}$ zł, nowa cena: $${nowaCena}$ zł, przychód: $${przychodMax}$ zł`,
    tresc,
    [
      `Niech $x$ to ${obnizka ? "obniżka" : "podwyżka"} ceny w złotych. Cena: $${c} ${znak} x$, sprzedaż: $${sprzedazWzor}$ sztuk. ${dziedzina}`,
      `Przychód: $P(x) = (${c} ${znak} x)(${sprzedazWzor}) = ${wielomianTex([a, b, c * n])}$.`,
      `Współczynnik $a = ${-k} < 0$, więc największa wartość jest w wierzchołku: $${pTex(a, b, p)}$, a $${p}$ należy do dziedziny.`,
      `Nowa cena: $${c} ${znak} ${p} = ${nowaCena}$ zł, sprzedaż: $${n} ${obnizka ? "+" : "-"} ${k} \\cdot ${p} = ${sprzedaz}$ sztuk.`,
      `Największy przychód: $${nowaCena} \\cdot ${sprzedaz} = ${przychodMax}$ zł.`,
    ],
  );
}

// --- 4. Optymalizacja w geometrii

/** Prostokąt wpisany w trójkąt prostokątny albo punkt prostej najbliższy początku układu. */
function optymalizacjaGeometria(r) {
  return r.chance(0.55) ? prostokatWTrojkacie(r) : punktNaProstej(r);
}

/** Dwa boki prostokąta leżą na przyprostokątnych a i b, czwarty wierzchołek na przeciwprostokątnej: x = a/2, y = b/2. */
function prostokatWTrojkacie(r) {
  const a = r.chance(0.8) ? 2 * r.int(2, 9) : r.int(5, 17) | 1;
  const b = r.chance(0.8) ? 2 * r.int(2, 9) : r.int(5, 17) | 1;
  const x = q(a, 2), y = q(b, 2), pole = q(a * b, 4);
  const wsp = q(-b, a);   // współczynnik przy x² w funkcji pola
  const yWzor = b === a ? `${a} - x` : b % a === 0 ? `${b / a}(${a} - x)` : `\\frac{${b}(${a} - x)}{${a}}`;
  const tresc = r.pick([
    `Przyprostokątne trójkąta prostokątnego mają długości $${a}$ i $${b}$. W ten trójkąt wpisano prostokąt tak, że dwa jego boki leżą na przyprostokątnych, a jeden wierzchołek na przeciwprostokątnej. Oblicz wymiary prostokąta o największym polu i podaj to pole.`,
    `W trójkącie prostokątnym o przyprostokątnych długości $${a}$ i $${b}$ umieszczono prostokąt, którego dwa boki leżą na przyprostokątnych, a jeden z wierzchołków – na przeciwprostokątnej. Jakie wymiary ma taki prostokąt o największym polu? Ile wynosi to pole?`,
  ]);
  return trzyPola(
    [["x", `Bok na przyprostokątnej długości $${a}$`], ["y", `Bok na przyprostokątnej długości $${b}$`], ["P", "Największe pole"]],
    { x, y, P: pole },
    `Boki: $${x.tex()}$ i $${y.tex()}$, pole: $${pole.tex()}$`,
    tresc,
    [
      `Niech $x$ to bok prostokąta leżący na przyprostokątnej długości $${a}$, a $y$ – na przyprostokątnej długości $${b}$. Mały trójkąt nad prostokątem jest podobny do danego trójkąta, więc $\\frac{y}{${b}} = \\frac{${a} - x}{${a}}$, czyli $y = ${yWzor}$. Z $x, y > 0$ mamy $x \\in (0, ${a})$.`,
      `Pole: $P(x) = x \\cdot y = ${wielomianTex([wsp, b, 0])}$.`,
      `Współczynnik $a = ${wsp.tex()} < 0$, więc największe pole jest w wierzchołku: $p = -\\frac{${b}}{2 \\cdot ${texNawias(wsp)}} = ${x.tex()}$.`,
      `Drugi bok: $y = \\frac{${b}}{${a}} \\cdot (${a} - ${x.tex()}) = ${y.tex()}$. Pole: $${x.tex()} \\cdot ${y.tex()} = ${pole.tex()}$.`,
    ],
  );
}

/** Punkt prostej y = mx + k najbliższy początku układu; m = ±1 (k parzyste), m = ±2 (k podzielne przez 5). */
function punktNaProstej(r) {
  const m = r.pick([1, -1, 2, -2]);
  const t = r.intBez(-6, 6, 0);
  const k = Math.abs(m) === 1 ? 2 * t : 5 * t;
  const w = 1 + m * m;                 // współczynnik przy x² w d²
  const px = -m * k / w, py = t;       // x = -mk/(1+m²), y = t
  const d2 = w * t * t;
  const prosta = wielomianTex([m, k]);
  const tresc = r.pick([
    `Punkt $P$ leży na prostej o równaniu $y = ${prosta}$. Wyznacz współrzędne punktu $P$, dla którego odległość od początku układu współrzędnych jest najmniejsza, i podaj kwadrat tej odległości.`,
    `Wśród punktów prostej $y = ${prosta}$ znajdź ten, który jest najbliżej początku układu współrzędnych. Podaj jego współrzędne oraz kwadrat jego odległości od początku układu.`,
  ]);
  return trzyPola(
    [["x", "Pierwsza współrzędna $x$"], ["y", "Druga współrzędna $y$"], ["d", "Kwadrat odległości $d^2$"]],
    { x: q(px), y: q(py), d: q(d2) },
    `$P = (${px}, ${py})$, $d^2 = ${d2}$`,
    tresc,
    [
      `Punkt $P$ ma współrzędne $(x, ${prosta})$. Kwadrat jego odległości od punktu $(0, 0)$ to $d^2 = x^2 + (${prosta})^2$ – najmniejsza odległość odpowiada najmniejszemu kwadratowi odległości.`,
      `$d^2(x) = x^2 + (${prosta})^2 = ${wielomianTex([w, 2 * m * k, k * k])}$, dla każdej liczby $x$.`,
      `Współczynnik $a = ${w} > 0$, więc najmniejsza wartość jest w wierzchołku: $${pTex(w, 2 * m * k, px)}$.`,
      `Druga współrzędna: $y = ${texNawias(m)} \\cdot ${texNawias(px)} ${plusMinus(k)} = ${py}$. Kwadrat odległości: $d^2 = ${texNawias(px)}^2 + ${texNawias(py)}^2 = ${d2}$.`,
    ],
  );
}

// --- Lista generatorów

export const GENERATORY = [
  { id: "ogrodzenie", nazwa: "Ogrodzenie – największe pole", opis: "Wymiary prostokątnego terenu o największym polu przy danej długości siatki (z murem albo bez).", generuj: ogrodzenie },
  { id: "dwie-liczby", nazwa: "Dwie liczby – iloczyn i suma kwadratów", opis: "Największy iloczyn, najmniejsza suma kwadratów lub najmniejszy iloczyn dwóch liczb o danej sumie albo różnicy.", generuj: dwieLiczby },
  { id: "przychod", nazwa: "Cena i największy przychód", opis: "O ile zmienić cenę, aby przychód ze sprzedaży był największy.", generuj: przychod },
  { id: "optymalizacja-geometria", nazwa: "Optymalizacja w geometrii", opis: "Prostokąt wpisany w trójkąt prostokątny o największym polu i punkt prostej najbliższy początku układu.", generuj: optymalizacjaGeometria },
];
