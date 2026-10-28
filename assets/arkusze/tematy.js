// Poddziały, według których strona sortuje zadania z arkuszy CKE (w tej kolejności pokazuje przyciski).
// W nawiasie: wymagania z podstawy programowej, które zwykle do nich trafiają.
export const TEMATY = {
  liczby: [
    { id: "liczby-rzeczywiste", nazwa: "Liczby rzeczywiste" },     // I: przedziały, przybliżenia, wartość bezwzględna liczby
    { id: "potegi", nazwa: "Potęgi" },                             // I.4, I.5
    { id: "pierwiastki", nazwa: "Pierwiastki" },                   // I.3, I.4
    { id: "logarytmy", nazwa: "Logarytmy" },                       // I.1 (logarytmowanie), I.6
    { id: "procenty", nazwa: "Procenty" },                         // I.8, I.9
    { id: "wyrazenia", nazwa: "Wyrażenia algebraiczne" },          // II
    { id: "rownania", nazwa: "Równania i układy równań" },         // III (równania), IV
    { id: "nierownosci", nazwa: "Nierówności" },                   // III (nierówności), |x − a| < b
  ],
  funkcje: [
    { id: "wlasnosci-funkcji", nazwa: "Własności funkcji" },       // V.1–V.4: dziedzina, wykres, monotoniczność
    { id: "funkcja-liniowa", nazwa: "Funkcja liniowa" },           // V.5, V.6
    { id: "funkcja-kwadratowa", nazwa: "Funkcja kwadratowa" },     // V.7–V.10
    { id: "inne-funkcje", nazwa: "Inne funkcje" },                 // wykładnicza, proporcjonalność odwrotna
    { id: "wzor-ogolny", nazwa: "Wzór ogólny ciągu" },             // VI.1, VI.2
    { id: "ciag-arytmetyczny", nazwa: "Ciąg arytmetyczny" },       // VI.3, VI.4
    { id: "ciag-geometryczny", nazwa: "Ciąg geometryczny" },       // VI.5, VI.6
  ],
  geometria: [
    { id: "trygonometria", nazwa: "Trygonometria" },               // VII
    { id: "planimetria", nazwa: "Planimetria" },                   // VIII
    { id: "geometria-analityczna", nazwa: "Geometria analityczna" }, // IX
    { id: "stereometria", nazwa: "Stereometria" },                 // X
  ],
  statystyka: [
    { id: "kombinatoryka", nazwa: "Kombinatoryka" },               // XI
    { id: "prawdopodobienstwo", nazwa: "Prawdopodobieństwo" },     // XII (prawdopodobieństwo)
    { id: "statystyka", nazwa: "Statystyka" },                     // XII (średnia, mediana, odchylenie)
  ],
};
