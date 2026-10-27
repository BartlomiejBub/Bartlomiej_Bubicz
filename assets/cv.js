// Podgląd CV: PDF renderowany przez PDF.js na <canvas>, więc działa też na telefonach,
// które nie wyświetlają PDF-ów w stronie. Bezpośredni link: index.html#cv-pl / #cv-en.
const PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168";

const CVS = {
  pl: {
    file: "cv/Bartlomiej_Bubicz_CV_PL.pdf", title: "CV po polsku", lang: "pl",
    text: { download: "Pobierz PDF", open: "Otwórz w nowej karcie", close: "Zamknij", loading: "Wczytywanie…",
            page: "strona", of: "z",
            error: "Nie udało się wyświetlić podglądu. Użyj przycisku „Otwórz w nowej karcie” albo „Pobierz PDF”." },
  },
  en: {
    file: "cv/Bartlomiej_Bubicz_CV_EN.pdf", title: "CV in English", lang: "en",
    text: { download: "Download PDF", open: "Open in new tab", close: "Close", loading: "Loading…",
            page: "page", of: "of",
            error: "The preview could not be shown. Use “Open in new tab” or “Download PDF” instead." },
  },
};

const cards = [...document.querySelectorAll(".cv-card")];
const viewer = document.getElementById("cv-viewer");
const pages = viewer.querySelector(".cv-pages");
const title = viewer.querySelector(".cv-title");
const download = viewer.querySelector(".cv-download");
const open = viewer.querySelector(".cv-open");
const close = viewer.querySelector(".cv-close");

let pdfjs = null;
const docs = new Map();   // klucz CV -> Promise<PDFDocumentProxy>
let current = null;
let renderId = 0;
let renderedWidth = 0;

async function loadPdfjs() {
  if (!pdfjs) {
    pdfjs = await import(`${PDFJS}/pdf.min.mjs`);
    pdfjs.GlobalWorkerOptions.workerSrc = `${PDFJS}/pdf.worker.min.mjs`;
  }
  return pdfjs;
}

function status(text) {
  const p = document.createElement("p");
  p.className = "cv-status";
  p.textContent = text;
  return p;
}

async function render(key) {
  const id = ++renderId;
  const doc = await docs.get(key);
  const width = pages.clientWidth;
  // Co najmniej 1600 px szerokości, żeby po przybliżeniu palcami na telefonie tekst był ostry.
  const pixelWidth = Math.max(width * (window.devicePixelRatio || 1), 1600);
  const canvases = [];
  renderedWidth = width;
  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: pixelWidth / base.width });
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    canvas.setAttribute("role", "img");
    const cv = CVS[key];
    canvas.setAttribute("aria-label", `${cv.title} – ${cv.text.page} ${n} ${cv.text.of} ${doc.numPages}`);
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    if (id !== renderId) return;   // w międzyczasie wybrano inne CV albo zmieniono rozmiar
    canvases.push(canvas);
  }
  pages.replaceChildren(...canvases);
}

async function show(key, { scroll = true } = {}) {
  const cv = CVS[key];
  if (!cv) return;
  current = key;
  for (const card of cards) card.setAttribute("aria-pressed", String(card.dataset.cv === key));
  viewer.hidden = false;
  viewer.lang = cv.lang;
  title.textContent = cv.title;
  download.textContent = cv.text.download;
  open.textContent = cv.text.open;
  close.textContent = cv.text.close;
  download.href = open.href = cv.file;
  download.setAttribute("download", cv.file.split("/").pop());
  history.replaceState(null, "", `#cv-${key}`);
  pages.replaceChildren(status(cv.text.loading));
  if (scroll) viewer.scrollIntoView({ behavior: "smooth", block: "start" });

  try {
    if (!docs.has(key)) {
      const lib = await loadPdfjs();
      docs.set(key, lib.getDocument(cv.file).promise);
    }
    await render(key);
  } catch (err) {
    docs.delete(key);
    if (current === key) pages.replaceChildren(status(cv.text.error));
    console.error(err);
  }
}

function hide() {
  current = null;
  renderId++;
  viewer.hidden = true;
  for (const card of cards) card.setAttribute("aria-pressed", "false");
  history.replaceState(null, "", location.pathname);
}

for (const card of cards) {
  card.addEventListener("click", () => (current === card.dataset.cv ? hide() : show(card.dataset.cv)));
}
close.addEventListener("click", hide);

// Przerysuj przy zmianie szerokości (obrót telefonu, zmiana okna), żeby tekst był ostry.
let resizeTimer;
new ResizeObserver(() => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (current && docs.has(current) && Math.abs(pages.clientWidth - renderedWidth) > 24) {
      render(current).catch(console.error);
    }
  }, 200);
}).observe(pages);

const fromHash = location.hash.match(/^#cv-(pl|en)$/);
if (fromHash) show(fromHash[1]);
