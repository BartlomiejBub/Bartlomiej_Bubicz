// Karta wzorów i metod: Egzamin ósmoklasisty – podstawy (arytmetyka, której uczniowie często nie opanowali w szkole podstawowej).
// tex – wzór albo rachunek wyśrodkowany (KaTeX bez $), reszta – tekst z $…$. Karty są pisane bardzo prostym językiem:
// slownie tłumaczy zwykłymi słowami i porównaniem z życia (pizza, czekolada, pieniądze, termometr), przyklad pokazuje liczby krok po kroku.
// Układy kolumn (rachunki pisemne) to tablice KaTeX z jedną cyfrą w kolumnie; małe szare cyfry to „pamiętam” i „pożyczam”.
// Zostały policzone tym samym kodem co rozwiązania w generatorach (assets/generatory/e8-podstawy.js) i wklejone jako gotowy zapis.

// --- Układy kolumn

const DODAWANIE_3847_2695 = "\\begin{array}{rrrrr}  & {\\color{gray}\\scriptsize 1} & {\\color{gray}\\scriptsize 1} & {\\color{gray}\\scriptsize 1} &  \\\\  & 3 & 8 & 4 & 7 \\\\ + & 2 & 6 & 9 & 5 \\\\ \\hline  & 6 & 5 & 4 & 2 \\end{array}";
const ODEJMOWANIE_7453_2168 = "\\begin{array}{rrrrr}  &  & {\\color{gray}\\scriptsize 3} & {\\color{gray}\\scriptsize 14} & {\\color{gray}\\scriptsize 13} \\\\  & 7 & \\cancel{4} & \\cancel{5} & \\cancel{3} \\\\ - & 2 & 1 & 6 & 8 \\\\ \\hline  & 5 & 2 & 8 & 5 \\end{array}";
const ODEJMOWANIE_5003_1478 = "\\begin{array}{rrrrr}  & {\\color{gray}\\scriptsize 4} & {\\color{gray}\\scriptsize 9} & {\\color{gray}\\scriptsize 9} & {\\color{gray}\\scriptsize 13} \\\\  & \\cancel{5} & \\cancel{0} & \\cancel{0} & \\cancel{3} \\\\ - & 1 & 4 & 7 & 8 \\\\ \\hline  & 3 & 5 & 2 & 5 \\end{array}";
const MNOZENIE_347_6 = "\\begin{array}{rrrrr}  &  & {\\color{gray}\\scriptsize 2} & {\\color{gray}\\scriptsize 4} &  \\\\  &  & 3 & 4 & 7 \\\\ \\times &  &  &  & 6 \\\\ \\hline  & 2 & 0 & 8 & 2 \\end{array}";
const MNOZENIE_347_26 = "\\begin{array}{rrrrr}  &  & 3 & 4 & 7 \\\\ \\times &  &  & 2 & 6 \\\\ \\hline  & 2 & 0 & 8 & 2 \\\\  & 6 & 9 & 4 & {\\color{gray}0} \\\\ \\hline  & 9 & 0 & 2 & 2 \\end{array}";
const MNOZENIE_253_304 = "\\begin{array}{rrrrrr}  &  &  & 2 & 5 & 3 \\\\ \\times &  &  & 3 & 0 & 4 \\\\ \\hline  &  & 1 & 0 & 1 & 2 \\\\  &  & {\\color{gray}0} & {\\color{gray}0} & {\\color{gray}0} & {\\color{gray}0} \\\\  & 7 & 5 & 9 & {\\color{gray}0} & {\\color{gray}0} \\\\ \\hline  & 7 & 6 & 9 & 1 & 2 \\end{array}";
const DZIELENIE_912_6 = "\\begin{array}{l} \\phantom{-\\;}1\\quad5\\quad2 \\\\ \\hline \\phantom{-\\;}9\\quad1\\quad2\\quad:\\quad6 \\\\ \\phantom{-\\;}\\llap{-\\;}\\underline{6} \\\\ \\phantom{-\\;}3\\quad1 \\\\ \\phantom{-\\;}\\llap{-\\;}\\underline{3\\quad0} \\\\ \\phantom{-\\;}\\phantom{0\\quad}1\\quad2 \\\\ \\phantom{-\\;}\\phantom{0\\quad}\\llap{-\\;}\\underline{1\\quad2} \\\\ \\phantom{-\\;}\\phantom{0\\quad}\\phantom{0\\quad}0 \\end{array}";
const DZIELENIE_745_3 = "\\begin{array}{l} \\phantom{-\\;}2\\quad4\\quad8 \\\\ \\hline \\phantom{-\\;}7\\quad4\\quad5\\quad:\\quad3 \\\\ \\phantom{-\\;}\\llap{-\\;}\\underline{6} \\\\ \\phantom{-\\;}1\\quad4 \\\\ \\phantom{-\\;}\\llap{-\\;}\\underline{1\\quad2} \\\\ \\phantom{-\\;}\\phantom{0\\quad}2\\quad5 \\\\ \\phantom{-\\;}\\phantom{0\\quad}\\llap{-\\;}\\underline{2\\quad4} \\\\ \\phantom{-\\;}\\phantom{0\\quad}\\phantom{0\\quad}1\\;\\leftarrow\\text{ reszta} \\end{array}";
const DZIELENIE_2412_4 = "\\begin{array}{l} \\phantom{-\\;}\\phantom{0\\quad}6\\quad0\\quad3 \\\\ \\hline \\phantom{-\\;}2\\quad4\\quad1\\quad2\\quad:\\quad4 \\\\ \\phantom{-\\;}\\llap{-\\;}\\underline{2\\quad4} \\\\ \\phantom{-\\;}\\phantom{0\\quad}0\\quad1 \\\\ \\phantom{-\\;}\\phantom{0\\quad}\\phantom{0\\quad}\\llap{-\\;}\\underline{0} \\\\ \\phantom{-\\;}\\phantom{0\\quad}\\phantom{0\\quad}1\\quad2 \\\\ \\phantom{-\\;}\\phantom{0\\quad}\\phantom{0\\quad}\\llap{-\\;}\\underline{1\\quad2} \\\\ \\phantom{-\\;}\\phantom{0\\quad}\\phantom{0\\quad}\\phantom{0\\quad}0 \\end{array}";
const DZIELENIE_1092_12 = "\\begin{array}{l} \\phantom{-\\;}\\phantom{0\\quad}\\phantom{0\\quad}9\\quad1 \\\\ \\hline \\phantom{-\\;}1\\quad0\\quad9\\quad2\\quad:\\quad12 \\\\ \\phantom{-\\;}\\llap{-\\;}\\underline{1\\quad0\\quad8} \\\\ \\phantom{-\\;}\\phantom{0\\quad}\\phantom{0\\quad}1\\quad2 \\\\ \\phantom{-\\;}\\phantom{0\\quad}\\phantom{0\\quad}\\llap{-\\;}\\underline{1\\quad2} \\\\ \\phantom{-\\;}\\phantom{0\\quad}\\phantom{0\\quad}\\phantom{0\\quad}0 \\end{array}";
const DODAWANIE_DZIESIETNE = "\\begin{array}{rrrrrr}  &  & {\\color{gray}\\scriptsize 1} &  &  &  \\\\  & 1 & 2 & {,} & 4 & 5 \\\\ + &  & 3 & {,} & 7 & {\\color{gray}0} \\\\ \\hline  & 1 & 6 & {,} & 1 & 5 \\end{array}";
const ODEJMOWANIE_DZIESIETNE = "\\begin{array}{rrrrr}  & {\\color{gray}\\scriptsize 7} &  & {\\color{gray}\\scriptsize 12} & {\\color{gray}\\scriptsize 10} \\\\  & \\cancel{8} & {,} & \\cancel{3} & \\cancel{{\\color{gray}0}} \\\\ - & 2 & {,} & 5 & 7 \\\\ \\hline  & 5 & {,} & 7 & 3 \\end{array}";
const MNOZENIE_24_35 = "\\begin{array}{rrrr}  &  & 2 & 4 \\\\ \\times &  & 3 & 5 \\\\ \\hline  & 1 & 2 & 0 \\\\  & 7 & 2 & {\\color{gray}0} \\\\ \\hline  & 8 & 4 & 0 \\end{array}";

export const WZORY = [
  {
    id: "dodawanie-odejmowanie",
    nazwa: "Dodawanie i odejmowanie pisemne",
    wzory: [
      {
        nazwa: "Dodawanie pisemne – „pamiętam 1”",
        slownie: "Liczby piszemy jedna pod drugą: jedności pod jednościami, dziesiątki pod dziesiątkami i tak dalej. Dodajemy kolumnami, zaczynając od prawej. Jeśli w kolumnie wyjdzie $10$ albo więcej, zapisujemy tylko cyfrę jedności, a **jedynkę „pamiętamy”** i dodajemy do następnej kolumny. To tak, jakbyś $10$ monet po złotówce wymienił na jeden banknot dziesięciozłotowy i przełożył go do „kieszeni z dziesiątkami”.",
        tex: DODAWANIE_3847_2695,
        litery: "Małe szare cyfry nad liczbami to „pamiętane” jedynki.",
        przyklad: "$3847 + 2695$: jedności $7 + 5 = 12$ – piszę $2$, pamiętam $1$. Dziesiątki $4 + 9 + 1 = 14$ – piszę $4$, pamiętam $1$. Setki $8 + 6 + 1 = 15$ – piszę $5$, pamiętam $1$. Tysiące $3 + 2 + 1 = 6$. Wynik: $6542$.",
        uwaga: "Najczęstsze błędy: zapomniana „pamiętana” jedynka i liczby napisane krzywo (jedności nie pod jednościami). Pomaga kartka w kratkę: jedna cyfra – jedna kratka.",
      },
      {
        nazwa: "Odejmowanie pisemne – „pożyczam”",
        slownie: "Od liczby u góry odejmujemy liczbę z dołu, kolumnami od prawej. Gdy cyfra u góry jest mniejsza od cyfry pod nią, **pożyczamy** $1$ z sąsiedniej kolumny po lewej. Ta jedynka jest warta $10$ w kolumnie, w której pożyczasz. To jak rozmienianie banknotu: oddajesz jeden banknot dziesięciozłotowy i dostajesz dziesięć monet po złotówce – banknotów masz o jeden mniej, ale za to drobne na zapłacenie.",
        tex: ODEJMOWANIE_7453_2168,
        litery: "Przekreślona cyfra to ta, którą zmieniła pożyczka; mała szara liczba nad nią to jej nowa wartość.",
        przyklad: "$7453 - 2168$: jedności $3 < 8$, więc pożyczam: $13 - 8 = 5$ (z $5$ dziesiątek zostaje $4$). Dziesiątki $4 < 6$, więc pożyczam: $14 - 6 = 8$ (z $4$ setek zostają $3$). Setki $3 - 1 = 2$. Tysiące $7 - 2 = 5$. Wynik: $5285$.",
        uwaga: "Pożyczka zmniejsza sąsiednią cyfrę o $1$ – łatwo o tym zapomnieć i w następnej kolumnie liczyć ze starą cyfrą. Zawsze odejmujesz dolną cyfrę od górnej, nigdy odwrotnie (nie wolno napisać $8 - 3 = 5$, gdy u góry stoi $3$, a u dołu $8$).",
      },
      {
        nazwa: "Odejmowanie, gdy są zera",
        slownie: "Zera nie mają czego pożyczyć. Idziemy więc w lewo do pierwszej cyfry, która **nie jest zerem**, i pożyczamy od niej. Zera po drodze zamieniają się w **dziewiątki**. To jak rozmienianie jednego banknotu tysiąc złotych: wychodzi z niego $9$ setek, $9$ dziesiątek i $10$ złotówek (razem znów $1000$) – dlatego w środku pojawiają się dziewiątki.",
        tex: ODEJMOWANIE_5003_1478,
        przyklad: "$5003 - 1478$: jedności $3 < 8$, ale w dziesiątkach i setkach są zera. Pożyczam z tysięcy: z $5$ zostaje $4$, a zera zamieniają się w $9$. Jedności: $13 - 8 = 5$. Dziesiątki: $9 - 7 = 2$. Setki: $9 - 4 = 5$. Tysiące: $4 - 1 = 3$. Wynik: $3525$.",
        uwaga: "Nie wolno pisać $0 - 7 = 7$ (odejmowania „na odwrót”). Jeśli u góry jest zero, a pod nim cyfra większa od zera, zawsze trzeba pożyczyć.",
      },
      {
        nazwa: "Sprawdzanie i szacowanie wyniku",
        slownie: "Wynik dodawania sprawdzasz odejmowaniem, a wynik odejmowania – dodawaniem. Możesz też szybko oszacować: zaokrąglij liczby do „okrągłych” i policz w głowie. Wynik pisemny nie powinien być daleko od tego, co wyszło w głowie.",
        tex: "a + b = c \\quad\\Longrightarrow\\quad c - b = a \\qquad\\qquad a - b = c \\quad\\Longrightarrow\\quad c + b = a",
        litery: "$a$, $b$ – liczby, $c$ – wynik działania",
        przyklad: "$3847 + 2695 = 6542$. Sprawdzenie: $6542 - 2695 = 3847$. Szacowanie: $3800 + 2700 = 6500$, czyli blisko $6542$.",
        uwaga: "Gdy wynik i oszacowanie bardzo się różnią (np. wyszło $65\\,420$ zamiast około $6500$), szukaj błędu – najczęściej źle przepisanej cyfry albo przesuniętych kolumn.",
      },
    ],
    jak: [
      "Zapisz liczby jedna pod drugą: jedności pod jednościami, dziesiątki pod dziesiątkami (prawe strony równo). Przy odejmowaniu większa liczba jest u góry.",
      "Zaczynaj od prawej kolumny (jedności) i idź w lewo, kolumna po kolumnie.",
      "Dodawanie: gdy suma w kolumnie to $10$ lub więcej, zapisz cyfrę jedności, a resztę (zwykle $1$) „pamiętaj” do następnej kolumny.",
      "Odejmowanie: gdy cyfra u góry jest za mała, pożycz $1$ z kolumny po lewej (tam zmniejsz cyfrę o $1$, a u siebie dodaj $10$). Przy zerach szukaj pierwszej cyfry różnej od zera.",
      "Sprawdź wynik działaniem odwrotnym: dodawanie odejmowaniem, odejmowanie dodawaniem.",
      "Oszacuj wynik na zaokrąglonych liczbach, żeby wyłapać duży błąd.",
    ],
  },
  {
    id: "mnozenie",
    nazwa: "Mnożenie pisemne",
    wzory: [
      {
        nazwa: "Mnożenie przez 10, 100, 1000 i liczby z zerami",
        slownie: "Mnożąc przez $10$, dopisujesz jedno zero, przez $100$ – dwa zera, przez $1000$ – trzy. Dzieje się tak, bo każda cyfra przesuwa się o jedno miejsce w lewo: jedności stają się dziesiątkami, dziesiątki setkami. Z pieniędzmi to proste: $47$ zł to $4700$ groszy (razy $100$). Gdy obie liczby kończą się zerami, mnożysz same „początki”, a potem dopisujesz wszystkie zera.",
        tex: "47 \\cdot 10 = 470 \\qquad 47 \\cdot 100 = 4700 \\qquad 300 \\cdot 40 = 12\\,000",
        przyklad: "$300 \\cdot 40$: mnożę $3 \\cdot 4 = 12$ i dopisuję trzy zera (dwa z $300$ i jedno z $40$): $12\\,000$.",
        uwaga: "Dopisujesz tyle zer, ile jest ich w sumie w obu liczbach – w $300 \\cdot 40$ jest ich trzy, a nie jedno.",
      },
      {
        nazwa: "Mnożenie przez liczbę jednocyfrową",
        slownie: "Mnożymy po kolei każdą cyfrę górnej liczby przez dolną cyfrę, zaczynając od jedności. Piszemy tylko cyfrę jedności z iloczynu, a resztę (dziesiątki iloczynu) **„pamiętamy”** i dodajemy do następnego iloczynu. Jakbyś miał $6$ pudełek i w każdym $347$ cukierków: liczysz osobno jedności, dziesiątki i setki, a nadmiar przekładasz do następnej grupy.",
        tex: MNOZENIE_347_6,
        litery: "Małe szare cyfry nad liczbą to „pamiętane” przeniesienia.",
        przyklad: "$347 \\cdot 6$: $7 \\cdot 6 = 42$ – piszę $2$, pamiętam $4$. $4 \\cdot 6 = 24$, plus pamiętane $4$ to $28$ – piszę $8$, pamiętam $2$. $3 \\cdot 6 = 18$, plus $2$ to $20$ – piszę $20$. Wynik: $2082$.",
        uwaga: "Pamiętaną cyfrę dodajesz do iloczynu (po wymnożeniu), a nie do cyfry, którą mnożysz.",
      },
      {
        nazwa: "Mnożenie przez liczbę dwucyfrową",
        slownie: "Mnożymy osobno przez jedności ($6$) i przez dziesiątki ($2$, czyli naprawdę przez $20$). Drugi wiersz zaczynamy **o jedno miejsce bardziej w lewo** – stoi tam zero (szare), bo mnożymy przez dziesiątki. Na końcu oba wiersze dodajemy pisemnie. To tak, jakbyś liczył $26$ kartonów po $347$ sztuk jako $6$ kartonów plus $20$ kartonów.",
        tex: MNOZENIE_347_26,
        przyklad: "$347 \\cdot 26$: $347 \\cdot 6 = 2082$ i $347 \\cdot 20 = 6940$. Dodajemy: $2082 + 6940 = 9022$.",
        uwaga: "Zero w drugim wierszu można zostawić puste, ale lepiej je wpisać – wtedy cyfry nie „uciekną” do złej kolumny. Najczęstszy błąd: drugi wiersz napisany bez przesunięcia.",
      },
      {
        nazwa: "Zero w środku mnożnika",
        slownie: "Gdy w dolnej liczbie jest zero (np. $304$), mnożenie przez to zero daje same zera. Ten wiersz można pominąć, ale kolejny wiersz trzeba przesunąć **o dwa miejsca** w lewo (bo mnożymy już przez setki). Pomyśl: $304$ to $300 + 4$.",
        tex: MNOZENIE_253_304,
        przyklad: "$253 \\cdot 304 = 253 \\cdot 4 + 253 \\cdot 300 = 1012 + 75\\,900 = 76\\,912$.",
        uwaga: "Najczęstszy błąd przy takich liczbach: wiersz z setkami przesunięty tylko o jedno miejsce (jakby tam nie było zera).",
      },
      {
        nazwa: "Szacowanie iloczynu",
        slownie: "Zanim zaczniesz liczyć pisemnie, zaokrąglij obie liczby do „okrągłych” i pomnóż w pamięci. Wynik pisemny ma być blisko tego szacunku. Jeśli nie jest – gdzieś jest błąd (na przykład zgubione zero).",
        tex: "347 \\cdot 26 \\approx 300 \\cdot 30 = 9000",
        przyklad: "Pisemnie wyszło $9022$, szacunek to $9000$ – zgadza się. Gdyby wyszło $902$ albo $90\\,220$, od razu widać, że coś jest nie tak.",
        uwaga: "Szacunek nie daje dokładnego wyniku – służy tylko do wyłapania dużych błędów.",
      },
    ],
    jak: [
      "Napisz liczby jedna pod drugą, prawe strony równo.",
      "Mnóż górną liczbę przez kolejne cyfry dolnej, zaczynając od jedności. Każdy iloczyn częściowy pisz w osobnym wierszu.",
      "Przy każdym mnożeniu zapisz jedności iloczynu, a dziesiątki zapamiętaj i dodaj do następnego iloczynu.",
      "Każdy następny wiersz zaczynaj o jedno miejsce bardziej w lewo (na końcu stoi zero).",
      "Dodaj wiersze pisemnie.",
      "Oszacuj wynik na zaokrąglonych liczbach i porównaj z wynikiem pisemnym.",
    ],
  },
  {
    id: "dzielenie",
    nazwa: "Dzielenie pisemne",
    wzory: [
      {
        nazwa: "Co to dzielenie i jak je sprawdzić",
        slownie: "Dzielenie to rozdzielanie po równo. Masz $12$ cukierków i $4$ osoby: każda dostaje $3$. Gdy rozdzielić się nie da bez reszty, zostaje **reszta**: $13$ cukierków dla $4$ osób to po $3$ i $1$ zostaje. Sprawdzamy mnożeniem: iloraz razy dzielnik plus reszta musi dać dzielną.",
        tex: "a : b = c \\ \\text{ reszta } r \\qquad \\Longleftrightarrow\\quad c \\cdot b + r = a",
        litery: "$a$ – dzielna, $b$ – dzielnik, $c$ – iloraz, $r$ – reszta (zawsze mniejsza od $b$)",
        przyklad: "$13 : 4 = 3$, reszta $1$, bo $3 \\cdot 4 + 1 = 13$. Bez reszty: $12 : 4 = 3$, bo $3 \\cdot 4 = 12$.",
        uwaga: "Przez zero nie wolno dzielić (nie da się rozdzielić czekolady między $0$ osób). Reszta musi być mniejsza od dzielnika – gdy jest równa albo większa, można było dać jeszcze po jednym.",
      },
      {
        nazwa: "Dzielenie pisemne: 912 : 6",
        slownie: "Zapisujemy dzielną, dwukropek i dzielnik, a **wynik piszemy nad kreską**. Idziemy od lewej: ile razy $6$ mieści się w $9$? Raz, więc piszemy $1$, mnożymy $1 \\cdot 6 = 6$ i odejmujemy $9 - 6 = 3$. Potem **„znosimy”** następną cyfrę i dostajemy $31$ – i tak do ostatniej cyfry. To jak rozdawanie $912$ zł między $6$ osób: najpierw setki, a resztę zamieniasz na dziesiątki i rozdajesz dalej.",
        tex: DZIELENIE_912_6,
        litery: "Wynik ($152$) stoi nad kreską. Pod dzielną odejmujemy kolejne iloczyny: $6$, $30$, $12$.",
        przyklad: "$9 : 6 = 1$, $9 - 6 = 3$. Znoszę $1$: $31 : 6 = 5$, $31 - 30 = 1$. Znoszę $2$: $12 : 6 = 2$, $12 - 12 = 0$. Wynik $152$, bez reszty. Sprawdzenie: $152 \\cdot 6 = 912$.",
        uwaga: "Jeśli po odejmowaniu wychodzi liczba równa albo większa od dzielnika, cyfra w wyniku była za mała – popraw ją. Jeśli iloczyn jest większy od liczby, od której odejmujesz – cyfra była za duża.",
      },
      {
        nazwa: "Dzielenie z resztą: 745 : 3",
        slownie: "Dzielimy tak samo, ale na końcu zostaje **reszta** – to cukierki, których nie da się już rozdać po równo. Reszta zawsze jest mniejsza od dzielnika. Wynik zapisujemy jako iloraz i reszta.",
        tex: DZIELENIE_745_3,
        przyklad: "$745 : 3 = 248$, reszta $1$. Sprawdzenie: $248 \\cdot 3 + 1 = 744 + 1 = 745$. W zadaniu: z $745$ kredek zrobisz $248$ pełnych paczek po $3$ kredki i jedna kredka zostanie.",
        uwaga: "W zadaniach o paczkach często pytają tylko o liczbę PEŁNYCH paczek – to sam iloraz, bez reszty.",
      },
      {
        nazwa: "Zero w wyniku: 2412 : 4",
        slownie: "Jeśli po zniesieniu cyfry dzielnik nie mieści się ani razu, w wyniku **piszemy zero** i znosimy następną cyfrę. Tu jest $24$ setki (po $6$ setek na osobę), a potem tylko $1$ dziesiątka – nie wystarczy, żeby każdy dostał choć jedną. Wpisujemy $0$, a dziesiątkę rozmieniamy na jedności (znosimy $2$ i mamy $12$).",
        tex: DZIELENIE_2412_4,
        przyklad: "$24 : 4 = 6$, reszta $0$. Znoszę $1$: $4$ nie mieści się w $1$ – piszę $0$. Znoszę $2$: $12 : 4 = 3$. Wynik: $603$.",
        uwaga: "Najczęstszy błąd: pominięte zero i wynik $63$ zamiast $603$. Za każdą zniesioną cyfrę musi być jedna cyfra w wyniku.",
      },
      {
        nazwa: "Dzielenie przez liczbę dwucyfrową: 1092 : 12",
        slownie: "Działa tak samo, ale trudniej zgadnąć, ile razy dzielnik mieści się w liczbie. Zgadujesz, mnożysz i sprawdzasz: jeśli iloczyn jest za duży, zmniejsz cyfrę; jeśli po odejmowaniu zostaje reszta nie mniejsza od dzielnika – zwiększ. Pomaga zaokrąglenie: $12$ to prawie $10$.",
        tex: DZIELENIE_1092_12,
        przyklad: "Zaczynamy od $109$, bo $10 < 12$. Zgadujemy: $12 \\cdot 9 = 108$ (a $12 \\cdot 10 = 120$ to za dużo). $109 - 108 = 1$. Znoszę $2$: $12 : 12 = 1$. Wynik $91$. Sprawdzenie: $91 \\cdot 12 = 1092$.",
        uwaga: "Wypisz sobie na boku kilka wielokrotności dzielnika ($12, 24, 36, 48, \\ldots$) – zgadywanie będzie dużo łatwiejsze.",
      },
    ],
    jak: [
      "Zapisz dzielną, dwukropek i dzielnik; wynik będziesz pisać nad kreską.",
      "Weź tyle pierwszych cyfr dzielnej, żeby powstała liczba nie mniejsza od dzielnika.",
      "Zapytaj: ile razy dzielnik mieści się w tej liczbie? Wpisz tę cyfrę w wyniku nad ostatnią zabraną cyfrą.",
      "Pomnóż cyfrę wyniku przez dzielnik, wynik napisz pod spodem i odejmij. Reszta musi być mniejsza od dzielnika.",
      "Znieś następną cyfrę dzielnej i powtarzaj kroki. Gdy dzielnik się nie mieści – wpisz $0$ i znieś kolejną cyfrę.",
      "Sprawdź mnożeniem: iloraz razy dzielnik plus reszta ma dać dzielną.",
    ],
  },
  {
    id: "kolejnosc-dzialan",
    nazwa: "Kolejność działań",
    wzory: [
      {
        nazwa: "Kolejność działań – cztery poziomy",
        slownie: "W matematyce obowiązuje umowa, żeby każdy dostał ten sam wynik. Najpierw liczysz **nawiasy** (jak zakupy w osobnej torbie), potem **potęgi**, potem **mnożenie i dzielenie**, a na końcu **dodawanie i odejmowanie**. Działania z tego samego poziomu liczysz po kolei od lewej do prawej, tak jak czytasz zdanie.",
        tex: "\\text{nawiasy} \\;\\to\\; \\text{potęgi} \\qquad \\to\\; \\cdot \\text{ lub } : \\;\\to\\; + \\text{ lub } -",
        przyklad: "$18 - 2 \\cdot (3 + 4)^2 : 7$: nawias $3 + 4 = 7$, potęga $7^2 = 49$, mnożenie $2 \\cdot 49 = 98$, dzielenie $98 : 7 = 14$, odejmowanie $18 - 14 = 4$.",
        uwaga: "Liczenie po prostu od lewej do prawej daje zły wynik: $2 + 3 \\cdot 4$ to $14$, a nie $20$.",
      },
      {
        nazwa: "Mnożenie i dzielenie przed dodawaniem i odejmowaniem",
        slownie: "Mnożenie to skrót dodawania, więc „wiąże” mocniej. Dostajesz $2$ zł, a potem trzy razy po $4$ zł kieszonkowego: $2 + 3 \\cdot 4$. Najpierw policz te trzy czwórki ($12$ zł), potem dołóż $2$ zł: razem $14$ zł.",
        tex: "2 + 3 \\cdot 4 = 2 + 12 = 14",
        przyklad: "$20 - 6 : 2 = 20 - 3 = 17$ (a nie $(20 - 6) : 2 = 7$).",
        uwaga: "Błąd „od lewej”: $2 + 3 = 5$, a potem $5 \\cdot 4 = 20$. Poprawny wynik to $14$.",
      },
      {
        nazwa: "Ten sam poziom – od lewej do prawej",
        slownie: "Gdy w wyrażeniu są tylko mnożenia i dzielenia (albo tylko dodawania i odejmowania), liczysz po kolei od lewej do prawej. Nie wolno zmieniać tej kolejności, bo wynik może się zmienić.",
        tex: "24 : 6 \\cdot 2 = 4 \\cdot 2 = 8 \\qquad 10 - 3 + 2 = 7 + 2 = 9",
        przyklad: "$24 : 6 \\cdot 2$: najpierw $24 : 6 = 4$, potem $4 \\cdot 2 = 8$. Gdybyś policzył najpierw $6 \\cdot 2 = 12$, wyszłoby $24 : 12 = 2$ – to błąd.",
        uwaga: "W $10 - 3 + 2$ nie wolno liczyć najpierw $3 + 2$ (wyszłoby $5$, a poprawnie jest $9$). Minus dotyczy tylko liczby tuż za nim.",
      },
      {
        nazwa: "Nawiasy i potęgi",
        slownie: "Nawias jest jak zamknięta paczka: najpierw liczysz to, co w środku, a dopiero potem resztę. Potęga to skrócony zapis mnożenia: $3^2 = 3 \\cdot 3 = 9$ – liczysz ją przed mnożeniem. Kreska ułamkowa też działa jak nawias.",
        tex: "(2 + 3) \\cdot 4 = 20 \\qquad 2 \\cdot 3^2 = 2 \\cdot 9 = 18 \\qquad \\frac{2 + 4}{3} = (2 + 4) : 3 = 2",
        przyklad: "$10 - (3 + 2) = 10 - 5 = 5$, a $10 - 3 + 2 = 9$. Nawias zmienia wynik.",
        uwaga: "W $2 \\cdot 3^2$ do kwadratu podnosisz tylko trójkę, a nie całe $2 \\cdot 3$: wynik to $18$, a nie $36$.",
      },
      {
        nazwa: "Jak zapisywać obliczenia",
        slownie: "Zapisuj każdy krok pod poprzednim, ze znakiem równości po lewej. W każdym kroku wykonaj jedno działanie, a resztę przepisz bez zmian. Dzięki temu łatwo znaleźć błąd – a na egzaminie dostaniesz punkty za dobrą metodę, nawet gdy na końcu się pomylisz.",
        tex: "\\begin{array}{ll} \\mathrlap{18 - 2 \\cdot (3 + 4)^2 : 7} & \\\\ = 18 - 2 \\cdot 7^2 : 7 & \\text{nawias} \\\\ = 18 - 2 \\cdot 49 : 7 & \\text{potęga} \\\\ = 18 - 98 : 7 & \\begin{aligned} & \\text{mnożenie} \\\\ & \\text{(od lewej)} \\end{aligned} \\\\ = 18 - 14 & \\text{dzielenie} \\\\ = 4 & \\text{odejmowanie} \\end{array}",
        uwaga: "Nie pisz znaku „=” między rzeczami, które nie są równe. Każdy kolejny zapis ma mieć tę samą wartość co poprzedni.",
      },
    ],
    jak: [
      "Przeczytaj całe wyrażenie i zaznacz nawiasy, potęgi, mnożenia i dzielenia.",
      "Policz nawiasy (w środku też stosuj tę samą kolejność). Kreskę ułamkową traktuj jak nawias.",
      "Policz potęgi.",
      "Policz mnożenia i dzielenia – po kolei od lewej do prawej.",
      "Policz dodawania i odejmowania – po kolei od lewej do prawej.",
      "W każdym kroku przepisz resztę wyrażenia bez zmian i wykonaj jedno działanie.",
    ],
  },
  {
    id: "liczby-ujemne",
    nazwa: "Liczby ujemne",
    wzory: [
      {
        nazwa: "Liczby ujemne, oś liczbowa i termometr",
        slownie: "Liczby ujemne są mniejsze od zera, jak temperatura poniżej zera na termometrze, dług w portfelu albo piętro w garażu pod ziemią. Im niżej na termometrze (im bardziej w lewo na osi liczbowej), tym liczba jest **mniejsza**. Dlatego $-5$ jest mniejsze od $-2$: przy $-5$ °C jest większy mróz niż przy $-2$ °C.",
        tex: "\\ldots < -3 < -2 < -1 < 0 \\qquad < 1 < 2 < 3 < \\ldots",
        przyklad: "Temperatura $-7$ °C jest niższa niż $-2$ °C, więc $-7 < -2$. Dług $50$ zł to $-50$ zł, a dług $80$ zł to $-80$ zł, czyli mniej: $-80 < -50$.",
        uwaga: "Wśród liczb ujemnych większa jest ta, która jest bliżej zera: $-2 > -7$. Nie sugeruj się tym, że $7$ jest większe od $2$.",
      },
      {
        nazwa: "Dodawanie i odejmowanie na osi liczbowej",
        slownie: "Wyobraź sobie termometr. **Dodawanie to ocieplenie** (w górę, czyli w prawo na osi), a **odejmowanie to ochłodzenie** (w dół, czyli w lewo). Jeśli jest $-3$ °C i wzrośnie o $5$ stopni, będzie $2$ °C; jeśli jest $2$ °C i spadnie o $5$ stopni, będzie $-3$ °C.",
        tex: "-3 + 5 = 2 \\qquad 2 - 5 = -3 \\qquad -2 - 4 = -6",
        przyklad: "$-2 - 4$: zaczynam od $-2$ i idę $4$ kroki w lewo (zimniej): $-3$, $-4$, $-5$, $-6$. Wynik: $-6$.",
        uwaga: "Przejście przez zero nie zmienia zasady: $3 - 5$ to $3$ kroki do zera i jeszcze $2$ w lewo, czyli $-2$.",
      },
      {
        nazwa: "Dodawanie liczb o takich samych i różnych znakach",
        slownie: "Dwa długi dodajesz: dług $3$ zł i dług $4$ zł to razem dług $7$ zł ($-3 + (-4) = -7$). Dług i oszczędności „kasują się”: masz $8$ zł długu i dostajesz $3$ zł – nadal jesteś $5$ zł na minusie ($-8 + 3 = -5$). Zasada: **ten sam znak** – dodaj liczby i zachowaj znak. **Różne znaki** – odejmij mniejszą od większej (patrząc na liczby bez znaków) i weź znak tej większej.",
        tex: "-3 + (-4) = -7 \\qquad -8 + 3 = -5 \\qquad 8 + (-3) = 5",
        przyklad: "$-6 + 10$: znaki różne, $10 - 6 = 4$, a większa (bez znaku) jest dziesiątka dodatnia, więc wynik to $+4$. $-9 + 5$: $9 - 5 = 4$, większa jest ujemna $9$, więc wynik to $-4$.",
        uwaga: "Najpierw rozpoznaj znaki, potem licz. Często mylone: $-9 + 5 = -4$, a nie $4$ ani $-14$.",
      },
      {
        nazwa: "Odejmowanie liczby ujemnej",
        slownie: "Odjąć dług to tak, jakby ktoś Ci go darował – jesteś bogatszy. Dlatego **odejmowanie liczby ujemnej zamieniamy na dodawanie** liczby dodatniej: $5 - (-3) = 5 + 3$. Z kolei dodanie liczby ujemnej to to samo co odjęcie: $5 + (-3) = 5 - 3$. Dwa minusy obok siebie dają plus.",
        tex: "a - (-b) = a + b \\qquad a + (-b) = a - b",
        litery: "$a$, $b$ – dowolne liczby",
        przyklad: "$5 - (-3) = 5 + 3 = 8$. Inny przykład: $-4 - (-9) = -4 + 9 = 5$ (jak ocieplenie o $9$ stopni z $-4$ °C).",
        uwaga: "Najczęstszy błąd: zostawianie dwóch znaków obok siebie. Zanim zaczniesz liczyć, zamień „minus i minus” na plus, a „plus i minus” na minus.",
      },
      {
        nazwa: "Mnożenie i dzielenie liczb ze znakami",
        slownie: "Przy mnożeniu i dzieleniu **liczymy minusy**: parzysta liczba minusów ($0$, $2$, $4$…) daje wynik dodatni, nieparzysta – ujemny. Plus razy minus to minus: $4$ dni po $3$ zł długu to $12$ zł długu ($4 \\cdot (-3) = -12$). Minus razy minus to plus – jak w powiedzeniu „wróg mojego wroga jest moim przyjacielem”. Dzielenie ma te same zasady znaków.",
        tex: "(-3) \\cdot 4 = -12 \\qquad (-3) \\cdot (-4) = 12 \\qquad (-12) : (-4) = 3 \\qquad 12 : (-4) = -3",
        przyklad: "$(-2) \\cdot (-3) \\cdot (-5)$: trzy minusy (nieparzysta liczba), więc wynik ujemny: $2 \\cdot 3 \\cdot 5 = 30$, czyli $-30$. $(-48) : (-6) = 8$ (dwa minusy, więc plus).",
        uwaga: "Nie myl dodawania z mnożeniem: $-3 + (-4) = -7$, ale $(-3) \\cdot (-4) = 12$. Przy potęgach: $(-3)^2 = 9$, a $-3^2 = -9$.",
      },
    ],
    jak: [
      "Wyobraź sobie oś liczbową albo termometr: dodawanie to ruch w prawo, odejmowanie – w lewo.",
      "Zamień podwójne znaki: $- (-3)$ na $+ 3$, a $+ (-3)$ na $- 3$.",
      "Przy dodawaniu: ten sam znak – dodaj i zachowaj znak; różne znaki – odejmij mniejszą od większej (bez znaków) i weź znak większej.",
      "Przy mnożeniu i dzieleniu policz liczby bez znaków, a potem policz minusy: parzyście – plus, nieparzyście – minus.",
      "Kolejność działań jest taka sama jak przy liczbach dodatnich.",
      "Sprawdź na termometrze, czy wynik ma sens (zrobiło się cieplej czy zimniej?).",
    ],
  },
  {
    id: "podzielnosc",
    nazwa: "Podzielność, NWD i NWW",
    wzory: [
      {
        nazwa: "Cechy podzielności: patrzymy na końcówkę",
        slownie: "Liczba jest podzielna przez inną, jeśli da się ją rozdzielić po równo bez reszty – jak $12$ cukierków dla $4$ osób. Nie musisz dzielić, wystarczy spojrzeć na **końcówkę**. Przez $2$ dzielą się liczby parzyste, przez $5$ – kończące się na $0$ lub $5$, przez $10$ – na $0$. Przez $4$ dzielą się liczby, których **dwie ostatnie cyfry** tworzą liczbę podzielną przez $4$ (bo $100$ dzieli się przez $4$, więc reszta liczby się nie liczy).",
        tex: "\\begin{array}{ll} \\text{przez } 2: & \\begin{aligned} & \\text{ostatnia cyfra} \\\\ & 0,\\ 2,\\ 4,\\ 6,\\ 8 \\end{aligned} \\\\[1ex] \\text{przez } 5: & \\begin{aligned} & \\text{ostatnia cyfra} \\\\ & 0 \\text{ lub } 5 \\end{aligned} \\\\[1ex] \\text{przez } 10: & \\text{ostatnia cyfra } 0 \\\\[1ex] \\text{przez } 4: & \\begin{aligned} & \\text{dwie ostatnie cyfry} \\\\ & \\text{dzielą się przez } 4 \\end{aligned} \\end{array}",
        przyklad: "$3468$ kończy się na $8$ – jest parzysta, więc dzieli się przez $2$. Dwie ostatnie cyfry to $68$, a $68 : 4 = 17$, więc dzieli się też przez $4$. $2345$ dzieli się przez $5$, ale nie przez $2$. $1370$ dzieli się przez $2$, $5$ i $10$.",
        uwaga: "Samo bycie parzystą nie wystarcza do podzielności przez $4$: $18$ jest parzysta, ale $18 : 4$ nie wychodzi bez reszty. Sprawdzaj dwie ostatnie cyfry (np. $116$: $16$ dzieli się przez $4$, więc $116$ też).",
      },
      {
        nazwa: "Podzielność przez 3, 6 i 9: suma cyfr",
        slownie: "Dodaj wszystkie cyfry liczby. Jeśli ta suma dzieli się przez $3$, to cała liczba dzieli się przez $3$. Jeśli suma dzieli się przez $9$, to liczba dzieli się przez $9$. Przez $6$ dzieli się liczba, która jest **parzysta i ma sumę cyfr podzielną przez** $3$ (czyli dzieli się i przez $2$, i przez $3$).",
        tex: "4185 \\to 4 + 1 + 8 + 5 = 18 \\qquad \\to \\text{dzieli się przez } 3 \\text{ i przez } 9",
        przyklad: "$4185$: suma cyfr to $18$, a $18$ dzieli się przez $3$ i przez $9$, więc $4185$ też ($4185 : 9 = 465$). $2346$: suma cyfr to $15$ – dzieli się przez $3$, ale nie przez $9$. Liczba jest parzysta, więc dzieli się też przez $6$ ($2346 : 6 = 391$).",
        uwaga: "Przez $9$ dzieli się tylko liczba z sumą cyfr podzielną przez $9$ – sama podzielność przez $3$ nie wystarcza (suma $15$ dzieli się przez $3$, ale nie przez $9$).",
      },
      {
        nazwa: "Rozkład na czynniki pierwsze",
        slownie: "Liczba pierwsza ma dokładnie dwa dzielniki: $1$ i samą siebie ($2, 3, 5, 7, 11, 13, \\ldots$). Każdą inną liczbę można rozbić na iloczyn liczb pierwszych – jak budowlę z klocków na najmniejsze klocki, których już dalej nie rozbierzesz. Dzielimy po kolei przez najmniejsze liczby pierwsze, aż dojdziemy do $1$. Po lewej stoi liczba, którą dzielimy, po prawej – liczba pierwsza, przez którą dzielimy.",
        tex: "\\begin{array}{r|l} 360 & 2 \\\\ 180 & 2 \\\\ 90 & 2 \\\\ 45 & 3 \\\\ 15 & 3 \\\\ 5 & 5 \\\\ 1 & \\end{array}",
        przyklad: "Z kolumny po prawej: $360 = 2 \\cdot 2 \\cdot 2 \\cdot 3 \\cdot 3 \\cdot 5 = 2^3 \\cdot 3^2 \\cdot 5$. Sprawdzenie: $8 \\cdot 9 \\cdot 5 = 360$.",
        uwaga: "Liczba $1$ nie jest pierwsza, a $2$ to jedyna parzysta liczba pierwsza. Dziel aż do $1$ i sprawdź na końcu, czy iloczyn wszystkich czynników daje liczbę wyjściową.",
      },
      {
        nazwa: "NWD – największy wspólny dzielnik",
        slownie: "NWD dwóch liczb to największa liczba, która dzieli obie bez reszty. Masz $12$ czekolad i $18$ batonów i chcesz zrobić jak najwięcej jednakowych paczek, w których nic nie zostanie: największa możliwa liczba paczek to $\\text{NWD}(12, 18) = 6$ (w każdej $2$ czekolady i $3$ batony). Liczymy z rozkładu na czynniki pierwsze: bierzemy **czynniki wspólne** dla obu liczb.",
        tex: "\\text{NWD}(12, 18) = 2 \\cdot 3 = 6",
        przyklad: "$36 = 2^2 \\cdot 3^2$ i $60 = 2^2 \\cdot 3 \\cdot 5$. Wspólne czynniki: $2^2$ i $3$ (każdy w najmniejszej potędze). $\\text{NWD}(36, 60) = 2^2 \\cdot 3 = 12$.",
        uwaga: "NWD nie jest większe od mniejszej z liczb. Gdy liczby nie mają wspólnych czynników, $\\text{NWD} = 1$ (np. $\\text{NWD}(8, 15) = 1$). NWD przydaje się do skracania ułamków.",
      },
      {
        nazwa: "NWW – najmniejsza wspólna wielokrotność (i wspólny mianownik)",
        slownie: "NWW dwóch liczb to najmniejsza liczba, która dzieli się przez obie. Autobus A odjeżdża co $12$ minut, B co $18$ minut, a o $8{:}00$ odjechały razem – znów odjadą razem po $\\text{NWW}(12, 18) = 36$ minutach. Liczymy z rozkładu: bierzemy **wszystkie czynniki**, każdy w największej potędze. **NWW mianowników to najmniejszy wspólny mianownik** przy dodawaniu i odejmowaniu ułamków.",
        tex: "\\text{NWW}(12, 18) = 2^2 \\cdot 3^2 = 36 \\qquad \\text{NWD} \\cdot \\text{NWW} = a \\cdot b",
        litery: "$a$, $b$ – dwie liczby; dla $12$ i $18$: $6 \\cdot 36 = 216 = 12 \\cdot 18$",
        przyklad: "$\\frac{1}{12} + \\frac{1}{18}$: wspólny mianownik to $\\text{NWW}(12, 18) = 36$. Rozszerzamy: $\\frac{3}{36} + \\frac{2}{36} = \\frac{5}{36}$.",
        uwaga: "NWW nie jest mniejsze od większej z liczb. Nie myl: NWD jest „małe” (to dzielnik), a NWW „duże” (to wielokrotność).",
      },
    ],
    jak: [
      "Do szybkiego sprawdzenia użyj cech podzielności: końcówka (przez $2, 4, 5, 10$) albo suma cyfr (przez $3, 9$).",
      "Rozłóż liczby na czynniki pierwsze: dziel przez $2$, potem przez $3$, $5$, $7$… aż dojdziesz do $1$; zapisz czynniki w potęgach.",
      "NWD: weź czynniki wspólne dla obu rozkładów, każdy w najmniejszej potędze, i pomnóż.",
      "NWW: weź wszystkie czynniki z obu rozkładów, każdy w największej potędze, i pomnóż.",
      "Sprawdź: $\\text{NWD} \\cdot \\text{NWW} = a \\cdot b$.",
      "W zadaniach: „jak najwięcej jednakowych części, nic nie zostaje” to NWD, a „kiedy znów razem” to NWW.",
    ],
  },
  {
    id: "ulamki-zwykle",
    nazwa: "Ułamki: skracanie i wspólny mianownik",
    wzory: [
      {
        nazwa: "Co to jest ułamek",
        slownie: "Ułamek to część całości. Pizzę pokrojono na $8$ równych kawałków i zjadłeś $3$ z nich – zjadłeś trzy ósme pizzy. **Mianownik** (na dole) mówi, na ile równych części podzielono całość, a **licznik** (na górze) – ile takich części bierzemy. Kreska ułamkowa to znak dzielenia.",
        tex: "\\frac{\\text{licznik}}{\\text{mianownik}} = \\frac{3}{8}",
        litery: "licznik – ile części bierzemy; mianownik – na ile równych części podzielono całość (nigdy nie jest zerem)",
        przyklad: "$\\frac{3}{8}$ pizzy to $3$ kawałki z $8$. Ułamek $\\frac{7}{4}$ to więcej niż całość: $4$ ćwiartki to cała pizza i jeszcze $3$ ćwiartki, czyli $\\frac{7}{4} = 1\\frac{3}{4}$ pizzy.",
        uwaga: "Kawałki muszą być równe! Ułamek, w którym licznik jest nie mniejszy od mianownika (jak $\\frac{7}{4}$), nazywamy niewłaściwym.",
      },
      {
        nazwa: "Rozszerzanie i skracanie ułamków",
        slownie: "Jeśli każdy z $4$ kawałków pizzy przekroisz na pół, masz $8$ kawałków, ale pizzy jest tyle samo: $\\frac{1}{2} = \\frac{4}{8}$. **Rozszerzanie** to mnożenie licznika i mianownika przez tę samą liczbę, a **skracanie** – dzielenie ich przez tę samą liczbę (wspólny dzielnik). Wartość ułamka się nie zmienia.",
        tex: "\\frac{1}{2} = \\frac{1 \\cdot 4}{2 \\cdot 4} = \\frac{4}{8} \\qquad \\frac{18}{24} = \\frac{18 : 6}{24 : 6} = \\frac{3}{4}",
        przyklad: "$\\frac{18}{24}$: największa liczba, przez którą dzielą się $18$ i $24$, to $\\text{NWD} = 6$. Skracam: $\\frac{3}{4}$. Można też skracać po kolei: $\\frac{18}{24} = \\frac{9}{12} = \\frac{3}{4}$ (przez $2$, potem przez $3$).",
        uwaga: "Mnożymy albo dzielimy licznik i mianownik przez to samo – nigdy nie dodajemy ani nie odejmujemy tej samej liczby: $\\frac{1}{2}$ to nie to samo co $\\frac{1 + 1}{2 + 1}$. Skracaj, aż się nie da (ułamek nieskracalny).",
      },
      {
        nazwa: "Porównywanie ułamków",
        slownie: "**Ten sam mianownik**: większy jest ułamek z większym licznikiem (więcej takich samych kawałków). **Ten sam licznik**: większy jest ułamek z mniejszym mianownikiem – kawałek pizzy podzielonej na $4$ części jest większy niż na $8$. **Różne liczniki i mianowniki**: sprowadź do wspólnego mianownika.",
        tex: "\\frac{3}{8} < \\frac{5}{8} \\qquad \\frac{1}{3} > \\frac{1}{5} \\qquad \\frac{2}{3} < \\frac{3}{4}",
        przyklad: "$\\frac{2}{3}$ i $\\frac{3}{4}$: wspólny mianownik to $12$. $\\frac{2}{3} = \\frac{8}{12}$, $\\frac{3}{4} = \\frac{9}{12}$, a $8 < 9$, więc $\\frac{2}{3} < \\frac{3}{4}$.",
        uwaga: "Duży mianownik nie znaczy duży ułamek: $\\frac{1}{100}$ jest dużo mniejsze od $\\frac{1}{2}$.",
      },
      {
        nazwa: "Wspólny mianownik, dodawanie i odejmowanie ułamków",
        slownie: "Dodawać i odejmować można tylko kawałki tej samej wielkości. Żeby dodać ćwiartkę pizzy i szóstą część pizzy, kroimy obie na takie same kawałki: szukamy **wspólnego mianownika**. Najwygodniejszy jest najmniejszy – to NWW mianowników ($\\text{NWW}(4, 6) = 12$). Rozszerzamy ułamki do tego mianownika, dodajemy (odejmujemy) liczniki, a mianownik przepisujemy.",
        tex: "\\frac{1}{4} + \\frac{1}{6} = \\frac{3}{12} + \\frac{2}{12} = \\frac{5}{12}",
        przyklad: "$\\frac{5}{6} - \\frac{3}{4}$: $\\text{NWW}(6, 4) = 12$, więc $\\frac{10}{12} - \\frac{9}{12} = \\frac{1}{12}$. Gdy mianowniki są takie same: $\\frac{3}{8} + \\frac{2}{8} = \\frac{5}{8}$ (mianownik przepisujemy).",
        uwaga: "Nie dodawaj mianowników! $\\frac{1}{2} + \\frac{1}{3}$ to $\\frac{5}{6}$, a nie $\\frac{2}{5}$. Na końcu skróć wynik, jeśli się da.",
      },
      {
        nazwa: "Liczby mieszane i ułamki niewłaściwe",
        slownie: "Liczba mieszana $2\\frac{3}{4}$ to dwie całe pizze i jeszcze $3$ ćwiartki. Każda cała pizza to $4$ ćwiartki, więc dwie to $8$ ćwiartek, a razem z $3$ – $11$ ćwiartek: $\\frac{11}{4}$. W drugą stronę dzielimy licznik przez mianownik z resztą: iloraz to liczba całości, a reszta to nowy licznik.",
        tex: "2\\frac{3}{4} = \\frac{2 \\cdot 4 + 3}{4} = \\frac{11}{4} \\qquad \\frac{11}{4} \\to 11 : 4 = 2 \\text{ reszta } 3 \\to 2\\frac{3}{4}",
        przyklad: "$3\\frac{2}{5} = \\frac{3 \\cdot 5 + 2}{5} = \\frac{17}{5}$. Dodawanie liczb mieszanych: $1\\frac{1}{2} + 2\\frac{3}{4} = 1\\frac{2}{4} + 2\\frac{3}{4} = 3\\frac{5}{4} = 4\\frac{1}{4}$ (całości z całościami, ułamki z ułamkami).",
        uwaga: "$2\\frac{3}{4}$ to $2 + \\frac{3}{4}$, a nie $2 \\cdot \\frac{3}{4}$. Gdy mnożysz lub dzielisz liczby mieszane, zawsze najpierw zamień je na ułamki niewłaściwe.",
      },
    ],
    jak: [
      "Skracaj ułamki, gdy się da: znajdź liczbę, przez którą dzielą się licznik i mianownik (najlepiej NWD), i podziel obie liczby.",
      "Przy dodawaniu, odejmowaniu i porównywaniu ułamków o różnych mianownikach znajdź wspólny mianownik – NWW mianowników.",
      "Rozszerz każdy ułamek do tego mianownika (licznik i mianownik razy ta sama liczba).",
      "Dodaj lub odejmij liczniki, a mianownik przepisz.",
      "Skróć wynik; jeśli licznik jest większy od mianownika, możesz zapisać liczbę mieszaną.",
      "Liczby mieszane zamień na ułamki niewłaściwe, gdy trzeba je mnożyć albo dzielić.",
    ],
  },
  {
    id: "mnozenie-ulamkow",
    nazwa: "Mnożenie i dzielenie ułamków",
    wzory: [
      {
        nazwa: "Mnożenie ułamków",
        slownie: "Mnożenie ułamków to branie części z części. Masz pół pizzy ($\\frac{1}{2}$) i zjadasz z niej jedną trzecią: zjadasz $\\frac{1}{3}$ z $\\frac{1}{2}$, czyli $\\frac{1}{6}$ całej pizzy. **Mnożymy licznik przez licznik i mianownik przez mianownik.** Wspólnego mianownika nie szukamy.",
        tex: "\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}",
        litery: "$a$, $c$ – liczniki; $b$, $d$ – mianowniki (różne od zera)",
        przyklad: "$\\frac{2}{3} \\cdot \\frac{5}{7} = \\frac{2 \\cdot 5}{3 \\cdot 7} = \\frac{10}{21}$. Liczbę całkowitą zapisz jako ułamek z mianownikiem $1$: $4 \\cdot \\frac{3}{5} = \\frac{4}{1} \\cdot \\frac{3}{5} = \\frac{12}{5}$.",
        uwaga: "Przy mnożeniu przez ułamek mniejszy od $1$ wynik jest mniejszy od mnożonej liczby – to normalne (część czegoś jest mniejsza od całości). Nie szukaj wspólnego mianownika i nie dodawaj mianowników.",
      },
      {
        nazwa: "Skracanie „na krzyż”",
        slownie: "Zanim pomnożysz, sprawdź, czy **licznik jednego ułamka i mianownik drugiego** dzielą się przez tę samą liczbę. Jeśli tak – skróć je. Dzięki temu liczby są mniejsze, a wynik od razu wychodzi nieskracalny. Skracać wolno tylko licznik z mianownikiem (nigdy dwóch liczników ani dwóch mianowników).",
        tex: "\\displaystyle \\frac{\\overset{1}{\\cancel{4}}}{\\underset{3}{\\cancel{9}}} \\cdot \\frac{\\overset{1}{\\cancel{3}}}{\\underset{2}{\\cancel{8}}} = \\frac{1 \\cdot 1}{3 \\cdot 2} = \\frac{1}{6}",
        przyklad: "$\\frac{4}{9} \\cdot \\frac{3}{8}$: $4$ i $8$ dzielą się przez $4$ (zostaje $1$ i $2$), $3$ i $9$ dzielą się przez $3$ (zostaje $1$ i $3$). Teraz $\\frac{1}{3} \\cdot \\frac{1}{2} = \\frac{1}{6}$. Bez skracania wyszłoby $\\frac{12}{72}$, które i tak trzeba by skrócić do $\\frac{1}{6}$.",
        uwaga: "Skracanie „na krzyż” działa tylko przy mnożeniu (i przy dzieleniu zamienionym na mnożenie). Przy dodawaniu takiej sztuczki nie ma.",
      },
      {
        nazwa: "Ułamek z liczby",
        slownie: "Słowo „z” w „trzy czwarte z $20$ zł” oznacza **mnożenie**. Dzielisz $20$ zł na $4$ równe części (po $5$ zł) i bierzesz $3$ takie części: $15$ zł. Można od razu zapisać $\\frac{3}{4} \\cdot 20$.",
        tex: "\\frac{3}{4} \\text{ z } 20 = \\frac{3}{4} \\cdot 20 = 15",
        przyklad: "$\\frac{2}{5}$ z $35$ to $35 : 5 \\cdot 2 = 7 \\cdot 2 = 14$. Odwrotnie: jeśli $\\frac{3}{4}$ pewnej liczby to $15$, to $\\frac{1}{4}$ tej liczby to $15 : 3 = 5$, a cała liczba to $5 \\cdot 4 = 20$ (czyli $15 : \\frac{3}{4} = 20$).",
        uwaga: "Pytanie „ile wynosi ułamek z liczby” to mnożenie, a pytanie „jaka to liczba, jeśli jej ułamek wynosi tyle” – dzielenie przez ten ułamek.",
      },
      {
        nazwa: "Odwrotność i dzielenie ułamków",
        slownie: "**Odwrotność** ułamka to ten sam ułamek „do góry nogami”: odwrotnością $\\frac{3}{4}$ jest $\\frac{4}{3}$. Iloczyn liczby i jej odwrotności to $1$. Spytaj: ile razy ćwiartka pizzy mieści się w połowie pizzy? Dwa razy. **Dzielenie przez ułamek to mnożenie przez jego odwrotność.**",
        tex: "\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}",
        przyklad: "$\\frac{1}{2} : \\frac{1}{4} = \\frac{1}{2} \\cdot \\frac{4}{1} = 2$. Dzielenie przez liczbę całkowitą: $\\frac{3}{5} : 6 = \\frac{3}{5} \\cdot \\frac{1}{6} = \\frac{3}{30} = \\frac{1}{10}$.",
        uwaga: "Odwracamy tylko drugi ułamek (dzielnik), a nie pierwszy i nie oba. Odwrotność liczby $5$ to $\\frac{1}{5}$, a liczba $0$ nie ma odwrotności. Przy dzieleniu przez ułamek mniejszy od $1$ wynik jest większy od dzielnej.",
      },
      {
        nazwa: "Liczby mieszane w mnożeniu i dzieleniu",
        slownie: "Liczby mieszane **zamieniamy najpierw na ułamki niewłaściwe**, a dopiero potem mnożymy lub dzielimy. Inaczej łatwo o pomyłkę, bo liczba mieszana to całość plus ułamek, a mnożenie dotyczy obu naraz.",
        tex: "1\\frac{1}{2} \\cdot 2\\frac{2}{3} = \\frac{3}{2} \\cdot \\frac{8}{3} = \\frac{3 \\cdot 8}{2 \\cdot 3} = 4",
        przyklad: "$2\\frac{1}{4} : 1\\frac{1}{2} = \\frac{9}{4} : \\frac{3}{2} = \\frac{9}{4} \\cdot \\frac{2}{3} = \\frac{18}{12} = \\frac{3}{2} = 1\\frac{1}{2}$.",
        uwaga: "Nie wolno mnożyć osobno całości, a osobno ułamków: $1\\frac{1}{2} \\cdot 2\\frac{2}{3}$ to nie $1 \\cdot 2 + \\frac{1}{2} \\cdot \\frac{2}{3}$.",
      },
    ],
    jak: [
      "Liczby mieszane zamień na ułamki niewłaściwe, a liczbę całkowitą zapisz jako ułamek z mianownikiem $1$.",
      "Jeśli dzielisz – odwróć drugi ułamek („do góry nogami”) i zamień dzielenie na mnożenie.",
      "Skróć „na krzyż”: licznik jednego ułamka z mianownikiem drugiego.",
      "Pomnóż liczniki przez liczniki i mianowniki przez mianowniki.",
      "Skróć wynik do końca; w razie potrzeby zamień ułamek niewłaściwy na liczbę mieszaną.",
      "Sprawdź sens: mnożenie przez ułamek mniejszy od $1$ zmniejsza liczbę, a dzielenie przez taki ułamek – zwiększa.",
    ],
  },
  {
    id: "ulamki-dziesietne",
    nazwa: "Ułamki dziesiętne",
    wzory: [
      {
        nazwa: "Ułamek dziesiętny a zwykły – zamiana",
        slownie: "Ułamek dziesiętny to ułamek z mianownikiem $10$, $100$, $1000$… Liczba $0{,}7$ to siedem dziesiątych: $7$ kostek z czekolady podzielonej na $10$ równych kostek. $0{,}25$ to dwadzieścia pięć setnych – jak $25$ groszy z jednej złotówki. Żeby zamienić ułamek zwykły na dziesiętny, **rozszerz go do mianownika** $10$, $100$ albo $1000$ (albo podziel licznik przez mianownik).",
        tex: "0{,}35 = \\frac{35}{100} = \\frac{7}{20} \\qquad \\frac{3}{8} = \\frac{375}{1000} = 0{,}375",
        przyklad: "$0{,}25 = \\frac{25}{100} = \\frac{1}{4}$ (skracam przez $25$). $\\frac{3}{4} = \\frac{75}{100} = 0{,}75$ (rozszerzam przez $25$) albo $3 : 4 = 0{,}75$. $2\\frac{1}{2} = 2{,}5$.",
        uwaga: "Nie każdy ułamek zwykły ma „krótki” zapis dziesiętny: $\\frac{1}{3} = 0{,}333\\ldots$ (cyfry powtarzają się bez końca). Takie ułamki na egzaminie zwykle zostawia się jako zwykłe.",
      },
      {
        nazwa: "Dodawanie i odejmowanie pisemne – przecinek pod przecinkiem",
        slownie: "Liczby piszemy tak, żeby **przecinek był dokładnie pod przecinkiem** – wtedy jedności są pod jednościami, dziesiąte pod dziesiątymi, setne pod setnymi. Tam, gdzie brakuje cyfr po przecinku, dopisujemy zera (nie zmieniają one wartości liczby). Potem liczymy jak na liczbach całkowitych, a przecinek w wyniku stawiamy pod przecinkami. To jak dodawanie złotych i groszy: złotówki pod złotówkami, grosze pod groszami.",
        tex: DODAWANIE_DZIESIETNE + " \\qquad\\qquad " + ODEJMOWANIE_DZIESIETNE,
        litery: "Po lewej $12{,}45 + 3{,}7$ (szare zero jest dopisane), po prawej $8{,}3 - 2{,}57$ (też z dopisanym zerem).",
        przyklad: "$12{,}45 + 3{,}7$: piszę $3{,}7$ jako $3{,}70$ i dodaję: $16{,}15$. $8{,}3 - 2{,}57$: piszę $8{,}30$ i odejmuję z pożyczaniem: $5{,}73$.",
        uwaga: "Najczęstszy błąd: wyrównanie liczb do prawej strony, jak przy liczbach całkowitych, zamiast do przecinka – wtedy dziesiąte lądują pod setnymi.",
      },
      {
        nazwa: "Mnożenie pisemne ułamków dziesiętnych",
        slownie: "Na chwilę zapominamy o przecinkach i mnożymy jak liczby całkowite. Potem liczymy, **ile cyfr po przecinku było w obu liczbach razem**, i tyle cyfr odliczamy od prawej strony wyniku. Dlaczego tak? Zamieniamy obie liczby na całkowite (mnożymy je przez $10$, $100$…), więc na końcu wynik trzeba o tyle samo zmniejszyć, czyli przesunąć przecinek w lewo.",
        tex: MNOZENIE_24_35,
        litery: "To rachunek $24 \\cdot 35$ do zadania $2{,}4 \\cdot 0{,}35$ (przecinki wstawiamy dopiero na końcu).",
        przyklad: "$2{,}4 \\cdot 0{,}35$: liczę $24 \\cdot 35 = 840$. Po przecinku mamy razem $1 + 2 = 3$ cyfry, więc wynik to $0{,}840 = 0{,}84$.",
        uwaga: "Przecinki wyrównuje się tylko przy dodawaniu i odejmowaniu. Przy mnożeniu trzeba tylko policzyć cyfry po przecinku. Czasem trzeba dopisać zero z przodu: $0{,}3 \\cdot 0{,}2 = 0{,}06$.",
      },
      {
        nazwa: "Mnożenie i dzielenie przez 10, 100, 1000",
        slownie: "Mnożenie – przecinek wędruje **w prawo**, dzielenie – **w lewo**, o tyle miejsc, ile zer ma $10$, $100$, $1000$. Z pieniędzmi: $3{,}45$ zł to $345$ groszy (razy $100$), a $345$ groszy to $3{,}45$ zł (przez $100$). Gdy brakuje cyfr, dopisujemy zera.",
        tex: "3{,}45 \\cdot 100 = 345 \\qquad 3{,}45 : 10 = 0{,}345 \\qquad 0{,}7 \\cdot 1000 = 700",
        przyklad: "$2{,}5 \\cdot 10 = 25$; $0{,}04 \\cdot 100 = 4$; $45 : 100 = 0{,}45$; $7 : 1000 = 0{,}007$.",
        uwaga: "Przecinek wędruje w stronę, w którą zmienia się liczba: mnożysz – liczba rośnie (przecinek w prawo), dzielisz – maleje (przecinek w lewo).",
      },
      {
        nazwa: "Dzielenie przez ułamek dziesiętny",
        slownie: "Dzielnik nie powinien mieć przecinka. Przesuwamy przecinek **w obu liczbach o tyle samo miejsc w prawo**, aż dzielnik będzie całkowity. Wynik się nie zmienia – tak samo jak przy rozszerzaniu ułamka (mnożymy dzielną i dzielnik przez $10$, $100$…).",
        tex: "7{,}2 : 0{,}06 = 720 : 6 = 120",
        przyklad: "$3{,}6 : 0{,}4 = 36 : 4 = 9$. Sprawdzenie: $9 \\cdot 0{,}4 = 3{,}6$. Dzielenie przez liczbę całkowitą: $15{,}6 : 4 = 3{,}9$ (dzielimy jak zwykle, a przecinek w wyniku stawiamy, gdy zniesiemy pierwszą cyfrę po przecinku).",
        uwaga: "Przesuń przecinek w OBU liczbach i o tyle samo miejsc. Jeśli w dzielnej brakuje cyfr, dopisz zera: w $7{,}2 : 0{,}06$ przesuwamy o $2$ miejsca, więc $7{,}2$ staje się $720$.",
      },
    ],
    jak: [
      "Dodając i odejmując: pisz przecinek pod przecinkiem, a brakujące miejsca po przecinku uzupełnij zerami.",
      "Licz jak na liczbach całkowitych, od prawej, a przecinek w wyniku wstaw dokładnie pod przecinkami.",
      "Mnożąc: zapomnij o przecinkach, pomnóż, a potem odlicz od prawej tyle cyfr, ile było po przecinku w obu czynnikach razem.",
      "Dzieląc przez ułamek dziesiętny: przesuń przecinki w obu liczbach o tyle samo miejsc w prawo, aż dzielnik będzie całkowity.",
      "Mnożąc przez $10$, $100$, $1000$ przesuń przecinek w prawo, dzieląc – w lewo (o tyle miejsc, ile zer).",
      "Oszacuj wynik: na przykład $2{,}4 \\cdot 0{,}35$ to mniej niż $2{,}4$, bo $0{,}35 < 1$.",
    ],
  },
];
