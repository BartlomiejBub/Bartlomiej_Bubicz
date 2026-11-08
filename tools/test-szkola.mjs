// Test rozdziałów widoku „Do szkoły” (assets/szkola.js): budowa, działy i tematy jak w arkusze/tematy.js.
//
// Użycie (w folderze repozytorium):
//   node tools/test-szkola.mjs
//
// Wypisuje też liczbę rozdziałów w każdej klasie i rozdziały z luką (czego jeszcze brakuje na stronie).
import { KLASY } from "../assets/szkola.js";
import { DZIALY, dzialRozdzialu } from "../assets/dzialy.js";

let bledy = 0;
const blad = (gdzie, msg) => {
  bledy++;
  console.log(`BŁĄD ${gdzie}: ${msg}`);
};

const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ids = new Set();
for (const k of KLASY) {
  if (!ID.test(k.id) || ids.has(k.id)) blad(k.id, "id klasy puste, z wielkimi literami albo powtórzone");
  ids.add(k.id);
  if (!["e8", "matura"].includes(k.egzamin)) blad(k.id, `egzamin "${k.egzamin}" (ma być e8 albo matura)`);
  if (!k.nazwa) blad(k.id, "brak nazwy");
  if (!k.rozdzialy?.length) blad(k.id, "brak rozdziałów");

  for (const r of k.rozdzialy ?? []) {
    const gdzie = `${k.id}/${r.id}`;
    const przed = bledy;
    if (!ID.test(r.id) || ids.has(r.id)) blad(gdzie, "id rozdziału puste, z wielkimi literami albo powtórzone");
    if (!r.id.startsWith(`${k.id}-`)) blad(gdzie, `id rozdziału powinno zaczynać się od "${k.id}-"`);
    ids.add(r.id);
    if (!r.nazwa || r.nazwa.length > 45) blad(gdzie, "nazwa pusta albo dłuższa niż 45 znaków");
    if (!r.opis || r.opis.length > 130) blad(gdzie, "opis pusty albo dłuższy niż 130 znaków");
    if (typeof r.tematy !== "object" || r.tematy === null) {
      blad(gdzie, "brak pola tematy (pusty rozdział: tematy: {} i luka)");
      continue;
    }
    if (!Object.keys(r.tematy).length && !r.luka) blad(gdzie, "rozdział bez tematów musi mieć opis luki");
    for (const [id, tematy] of Object.entries(r.tematy)) {
      const d = DZIALY.find((x) => x.id === id);
      if (!d) blad(gdzie, `nie ma działu "${id}"`);
      else if (d.egzamin !== k.egzamin) blad(gdzie, `dział "${id}" jest z innego egzaminu niż klasa`);
      else if (!tematy.length) blad(gdzie, `pusta lista tematów działu "${id}"`);
      else for (const t of tematy) if (!d.tematy.some((x) => x.id === t)) blad(gdzie, `dział "${id}" nie ma tematu "${t}"`);
    }
    if (bledy > przed) continue;
    const d = dzialRozdzialu(k, r);
    if (Object.keys(r.tematy).length && !d.wzory.length && !d.generatory.length && !d.tematy.some((t) => t.zadania.length)) {
      blad(gdzie, "tematy rozdziału nie mają żadnych materiałów");
    }
  }
}

console.log(KLASY.map((k) => `${k.id}: ${k.rozdzialy.length}`).join(", "));
const luki = KLASY.flatMap((k) => k.rozdzialy.filter((r) => r.luka).map((r) => `  ${k.id} ${r.nazwa}: ${r.luka}`));
if (luki.length) console.log(`Luki (${luki.length}):\n${luki.join("\n")}`);
console.log(bledy ? `${bledy} błędów` : "OK");
process.exitCode = bledy ? 1 : 0;
