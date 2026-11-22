// Kalkulator w wysuwanym panelu (assets/narzedzia.js): pole do wpisywania, przyciski, podgląd wyniku i historia.
// Liczy przez assets/wyrazenia.js. Kąty w stopniach albo radianach, wynik z przecinkiem i – gdy się da – jako ułamek.
import { el } from "./dom.js";
import { oblicz, formatuj, ulamek, BladWyrazenia } from "./wyrazenia.js";

const KLUCZ = "kalkulator-v1";

// [napis, co wstawić] albo [napis, { akcja }]; wiersze po 5 przycisków
const PRZYCISKI = [
  [["sin", "sin("], ["cos", "cos("], ["tg", "tg("], ["log", "log("], ["ln", "ln(" ]],
  [["x²", "^2"], ["xʸ", "^"], ["√", "√("], ["(", "("], [")", ")"]],
  [["7", "7"], ["8", "8"], ["9", "9"], [":", ":", "op"], ["⌫", { akcja: "cofnij" }, "fn"]],
  [["4", "4"], ["5", "5"], ["6", "6"], ["·", "·", "op"], ["AC", { akcja: "czysc" }, "fn"]],
  [["1", "1"], ["2", "2"], ["3", "3"], ["−", "−", "op"], ["Ans", "Ans"]],
  [["0", "0"], [",", ","], ["π", "π"], ["+", "+", "op"], ["=", { akcja: "wynik" }, "rowna"]],
];

function wczytaj() {
  try { return JSON.parse(localStorage.getItem(KLUCZ)) ?? {}; } catch { return {}; }
}

export function zbudujKalkulator(kontener) {
  const zapisany = wczytaj();
  let stopnie = zapisany.stopnie ?? true;
  let ans = zapisany.ans ?? 0;
  let historia = Array.isArray(zapisany.historia) ? zapisany.historia.slice(0, 20) : [];
  let poWyniku = false;
  const zapisz = () => { try { localStorage.setItem(KLUCZ, JSON.stringify({ stopnie, ans, historia })); } catch { /* prywatne okno */ } };

  const dotyk = matchMedia("(pointer: coarse)").matches;
  const wejscie = el("input", {
    class: "kalk-wejscie", type: "text", autocomplete: "off", spellcheck: "false", "aria-label": "Działanie",
    placeholder: "np. 2,5·(3 + 4)", inputmode: dotyk ? "none" : null,
  });
  const wynik = el("output", { class: "kalk-wynik", "aria-live": "polite" });
  const lista = el("ol", { class: "kalk-historia", "aria-label": "Historia obliczeń" });

  const jednostki = el("div", { class: "przelacznik-maly", role: "group", "aria-label": "Jednostka kąta" });
  const przyciskJednostki = (wartosc, napis, opis) => {
    const b = el("button", { type: "button", "aria-pressed": String(stopnie === wartosc), title: opis }, napis);
    b.addEventListener("click", () => {
      stopnie = wartosc;
      for (const x of jednostki.children) x.setAttribute("aria-pressed", String(x === b));
      zapisz();
      podglad();
      wejscie.focus();
    });
    return b;
  };
  jednostki.append(przyciskJednostki(true, "stopnie", "sin 30 = 0,5"), przyciskJednostki(false, "radiany", "sin(π/6) = 0,5"));

  /** Wynik do pokazania: liczba z przecinkiem i ułamek, gdy wynik jest ułamkiem zwykłym (np. 0,3333333333 = 1/3). */
  const opisz = (v) => {
    const s = formatuj(v);
    if (s === null) return null;
    const u = ulamek(v);
    return u ? `${s} = ${u[0] < 0 ? "−" : ""}${Math.abs(u[0])}/${u[1]}` : s;
  };

  const policz = () => {
    const tekst = wejscie.value.trim();
    if (!tekst) return { pusto: true };
    try {
      const v = oblicz(tekst, { stopnie, zmienne: { Ans: ans } });
      const s = opisz(v);
      return s === null ? { blad: "Ten wynik nie istnieje (np. dzielenie przez zero albo pierwiastek z liczby ujemnej)." } : { v, s };
    } catch (e) {
      if (e instanceof BladWyrazenia) return { blad: e.message };
      throw e;
    }
  };

  const podglad = () => {
    const r = policz();
    wynik.className = "kalk-wynik";
    if (r.pusto) { wynik.textContent = ""; return; }
    if (r.blad) { wynik.textContent = ""; return; }   // w trakcie pisania nie krzyczymy o błędach
    wynik.classList.add("podglad");
    wynik.textContent = `= ${r.s}`;
  };

  const pokazHistorie = () => {
    lista.replaceChildren(...historia.map((h) => {
      const b = el("button", { type: "button", class: "kalk-wpis", title: "Wstaw to działanie" },
        el("span", { class: "kalk-wpis-dzialanie" }, h.dzialanie), el("span", { class: "kalk-wpis-wynik" }, `= ${h.wynik}`));
      b.addEventListener("click", () => { wejscie.value = h.dzialanie; poWyniku = false; podglad(); wejscie.focus(); });
      return el("li", {}, b);
    }));
    lista.hidden = !historia.length;
  };

  const wynikKoncowy = () => {
    const r = policz();
    if (r.pusto) return;
    wynik.className = "kalk-wynik";
    if (r.blad) { wynik.classList.add("blad"); wynik.textContent = r.blad; return; }
    wynik.classList.add("gotowy");
    wynik.textContent = `= ${r.s}`;
    ans = r.v;
    const dzialanie = wejscie.value.trim();
    if (historia[0]?.dzialanie !== dzialanie) historia = [{ dzialanie, wynik: r.s }, ...historia].slice(0, 20);
    poWyniku = true;
    zapisz();
    pokazHistorie();
  };

  const wstaw = (tekst, rodzaj) => {
    if (poWyniku) {
      // po „=”: działanie zaczyna się od wyniku (Ans), a liczba albo funkcja zaczyna nowe działanie
      wejscie.value = rodzaj === "op" || tekst.startsWith("^") ? "Ans" : "";
      poWyniku = false;
    }
    const p = wejscie.selectionStart ?? wejscie.value.length, k = wejscie.selectionEnd ?? p;
    wejscie.setRangeText(tekst, p, k, "end");
    podglad();
  };

  const klawiatura = el("div", { class: "kalk-klawiatura" });
  for (const wiersz of PRZYCISKI) {
    for (const [napis, co, rodzaj] of wiersz) {
      const b = el("button", { type: "button", class: `kalk-klawisz${rodzaj ? ` kalk-${rodzaj}` : ""}`, "aria-label": { "⌫": "Usuń znak", AC: "Wyczyść", "·": "razy", ":": "podzielić", "−": "minus", "xʸ": "potęga", "x²": "do kwadratu", "√": "pierwiastek" }[napis] ?? null }, napis);
      b.addEventListener("pointerdown", (e) => e.preventDefault());   // nie zabieraj kursora z pola
      b.addEventListener("click", () => {
        if (typeof co === "string") wstaw(co, rodzaj);
        else if (co.akcja === "wynik") wynikKoncowy();
        else if (co.akcja === "czysc") { wejscie.value = ""; poWyniku = false; podglad(); }
        else if (co.akcja === "cofnij") {
          poWyniku = false;
          const p = wejscie.selectionStart ?? wejscie.value.length, k = wejscie.selectionEnd ?? p;
          if (p !== k) wejscie.setRangeText("", p, k, "end");
          else if (p > 0) {
            // „sin(”, „Ans” i podobne usuwamy w całości
            const przed = wejscie.value.slice(0, p);
            const m = przed.match(/(arcsin\(|arccos\(|arctg\(|sin\(|cos\(|tg\(|ctg\(|log\(|ln\(|√\(|Ans)$/);
            wejscie.setRangeText("", p - (m ? m[0].length : 1), p, "end");
          }
          podglad();
        }
        if (!dotyk) wejscie.focus();
      });
      klawiatura.append(b);
    }
  }

  wejscie.addEventListener("input", () => { poWyniku = false; podglad(); });
  wejscie.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === "=") { e.preventDefault(); wynikKoncowy(); }
    else if (poWyniku && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      // jak na zwykłym kalkulatorze: po wyniku cyfra zaczyna od nowa, a znak działania dopisuje się do wyniku
      e.preventDefault();
      wstaw(e.key === "*" ? "·" : e.key === "/" ? ":" : e.key === "-" ? "−" : e.key, /[-+*/:^]/.test(e.key) ? "op" : null);
    }
  });

  const pomoc = el("details", { class: "kalk-pomoc" },
    el("summary", {}, "Jak wpisywać?"),
    el("ul", {},
      el("li", {}, "Przecinek dziesiętny: 2,5 (kropka też działa). Mnożenie: · albo *, dzielenie: : albo /."),
      el("li", {}, "Potęga: 2^10, pierwiastek: √(2) albo sqrt(2), wartość bezwzględna: |−3|."),
      el("li", {}, "sin, cos, tg, ctg – kąt w wybranej jednostce. log to logarytm dziesiętny, log_2(8) – o podstawie 2, ln – naturalny."),
      el("li", {}, "20% to 0,2, 5! to silnia, Ans to poprzedni wynik. Enter albo „=” liczy wynik.")));

  kontener.append(
    el("div", { class: "kalk" },
      el("div", { class: "kalk-gora" }, jednostki),
      el("div", { class: "kalk-ekran" }, wejscie, wynik),
      klawiatura,
      pomoc,
      lista));
  pokazHistorie();
  return { fokus: () => { if (!dotyk) wejscie.focus(); } };
}
