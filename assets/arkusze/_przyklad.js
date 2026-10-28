// TYMCZASOWE – dwa zadania do testu wyglądu, zostaną zastąpione przez pełne arkusze.
export default {
  nazwa: "Matura maj 2024",
  zadania: [
    { nr: "6", dzial: "liczby", temat: "nierownosci",
      tresc: "**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**\n\nZbiorem wszystkich rozwiązań nierówności\n\n$1 - \\frac{3}{2}x < \\frac{2}{3} - x$\n\njest przedział",
      opcje: ["$\\left(-\\infty, -\\frac{2}{3}\\right)$", "$\\left(-\\infty, \\frac{2}{3}\\right)$", "$\\left(-\\frac{2}{3}, +\\infty\\right)$", "$\\left(\\frac{2}{3}, +\\infty\\right)$"],
      poprawna: 3 },
    { nr: "22", dzial: "geometria", temat: "planimetria",
      tresc: "W trójkącie $ABC$, wpisanym w okrąg o środku w punkcie $S$, kąt $ACB$ ma miarę $42^\\circ$ (zobacz rysunek).\n\n[rysunek]\n\n**Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.**\n\nMiara kąta ostrego $BAS$ jest równa",
      opcje: ["$42^\\circ$", "$45^\\circ$", "$48^\\circ$", "$69^\\circ$"],
      poprawna: 2,
      rysunek: "assets/arkusze/rys/_przyklad-22.png" },
  ],
};
