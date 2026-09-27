# Hypotheekmama.nl — website Karima Rijkse

Standalone, tweetalige (NL/EN) website voor Hypotheekmama (Karima Rijkse,
via VerbindersIn). Eén HTML-bestand, geen build-stap, geen dependencies.

## Bekijken

Open `index.html` gewoon lokaal in een browser, of publiceer via GitHub
Pages (zie hieronder).

## Deployen via GitHub Pages

1. Push deze repository naar GitHub.
2. Ga naar **Settings → Pages**.
3. Kies bij "Source": branch `main`, map `/ (root)`.
4. Sla op. De site is na een paar minuten live op
   `https://<gebruikersnaam>.github.io/<repo-naam>/`.

### Eigen domein (hypotheekmama.nl)

Wil je de site op het eigen domein tonen in plaats van het
github.io-adres:

1. Maak een bestand `CNAME` (geen extensie) in de root met daarin alleen:
   ```
   hypotheekmama.nl
   ```
2. Zet bij de domeinregistrar een DNS-record naar GitHub Pages (A-records
   naar GitHub's IP's, of een CNAME-record naar
   `<gebruikersnaam>.github.io`, afhankelijk van www vs. root-domein — zie
   GitHub's eigen documentatie over "Managing a custom domain").
3. Vink in **Settings → Pages** "Enforce HTTPS" aan zodra het certificaat
   is uitgegeven.

## Functionaliteit

- **NL/EN-schakelaar** (rechtsboven in de header) — wisselt alle
  zichtbare tekst, de paginatitel en meta-omschrijving, zonder herladen.
  In het Engels heet de site "Mortgagemama".
- **Home-knop** — het logo linksboven en het eerste menu-item springen
  terug naar de bovenkant van de pagina.
- **Boekjes-sectie** — 16 gratis gidsen, gegroepeerd per thema. Een
  aanvraag opent het eigen e-mailprogramma van de bezoeker met een
  vooringevuld bericht aan `info@verbindersin.nl` (zie beperkingen
  hieronder).
- **Toegankelijkheid** — skip-link, ARIA-labels, zichtbare focus-states,
  een tekstgrootte-schakelaar, en een "Lees voor"-knop die de browser's
  ingebouwde spraaksynthese gebruikt (geen externe dienst).
- **Mobielvriendelijk** — hamburgermenu, responsive grids, correcte
  tikgebieden, geen iOS-zoombug op formuliervelden.

## Bekende beperkingen (geen bugs, maar architecturale keuzes)

Dit is een statisch bestand zonder server. Twee dingen kunnen daardoor
niet volledig automatisch:

- **Boekjesaanvraag**: het formulier opent de eigen e-mail-app van de
  bezoeker (via een `mailto:`-link) in plaats van zelf een e-mail te
  versturen. De bezoeker moet het bericht nog zelf verzenden, en iemand
  bij VerbindersIn moet het juiste boekje handmatig terugmailen. Voor
  volledige automatisering is een formulierdienst nodig (bijv.
  Formspree) of een eigen backend.
- **De 16 PDF's zelf** staan nergens gehost — ze moeten nog ergens
  online worden gezet zodra de site echt boekjes automatisch moet kunnen
  versturen.

## Nog in te vullen vóór livegang

Zoek in `index.html` naar deze placeholders:

| Wat | Waar | Zoek op |
|---|---|---|
| Link naar het Dienstverleningsdocument | Footer | `Dienstverleningsdocument` (href is nu `#`) |
| Link naar een agenda/Calendly | Contactblok | `Plan direct een afspraak` (href is nu `#`) |

## Compliance

- AFM-vergunningnummer en Kifid-aansluitnummer van VerbindersIn staan al
  in de footer.
- De privacyverklaring (sectie `#privacy`) bevat nu inhoudelijke tekst,
  maar is nog niet door een jurist of compliance-adviseur nagelopen —
  zeker gezien de lead-capture-flow bij de boekjes (naam/telefoon/e-mail
  verzamelen).
- Zodra hier automatische verzending of concrete productadviezen bijkomen,
  opnieuw langs de AFM-toets.
