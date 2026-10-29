// Logowanie uczniów kodem i sprawdzanie dostępu do materiałów.
// To zabezpieczenie "dla uczciwych": strona jest statyczna, więc decyduje, co komu pokazać,
// ale nie ukrywa plików przed kimś, kto zajrzy w kod.
import { SOL, UCZNIOWIE } from "./uczniowie.js";

const KLUCZ = "korepetycje.uczen";
let pamiec = null;   // gdy przeglądarka blokuje localStorage

/** Kod bez spacji i myślników, wielkimi literami: "abc-123" -> "ABC123". */
export function normalizujKod(kod) {
  return String(kod).toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export async function skrotKodu(kod, sol = SOL) {
  const dane = new TextEncoder().encode(`${sol}:${normalizujKod(kod)}`);
  const skrot = await crypto.subtle.digest("SHA-256", dane);
  return [...new Uint8Array(skrot)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function zapisz(wartosc) {
  pamiec = wartosc;
  try {
    if (wartosc) localStorage.setItem(KLUCZ, wartosc);
    else localStorage.removeItem(KLUCZ);
  } catch {}
}

function odczytaj() {
  try {
    return localStorage.getItem(KLUCZ) ?? pamiec;
  } catch {
    return pamiec;
  }
}

/** Loguje ucznia; zwraca ucznia albo null, gdy kod jest nieznany. */
export async function zaloguj(kod) {
  const skrot = await skrotKodu(kod);
  const uczen = UCZNIOWIE.find((u) => u.kod === skrot) ?? null;
  if (uczen) zapisz(skrot);
  return uczen;
}

/** Zalogowany uczeń albo null (np. gdy nauczyciel usunął go z listy). */
export function zalogowany() {
  const skrot = odczytaj();
  return (skrot && UCZNIOWIE.find((u) => u.kod === skrot)) || null;
}

export function wyloguj() {
  zapisz(null);
}

/** Tematy działu, które uczeń widzi: lista id tematów albo null, gdy widzi cały dział. */
export function tematyUcznia(uczen, dzial) {
  if (!uczen || uczen.dostep === "wszystko") return null;
  return uczen.tematy?.[dzial] ?? null;
}

/** Czy uczeń ma dostęp do rodzaju materiałów ("zadania", "generator", "karty") w dziale. */
export function ma(uczen, dzial, rodzaj) {
  if (!uczen) return false;
  if (uczen.dostep === "wszystko") return true;
  return (uczen.dostep?.[dzial] ?? []).includes(rodzaj);
}
