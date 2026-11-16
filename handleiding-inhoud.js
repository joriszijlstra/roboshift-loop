/* Handleiding Loop: inhoud. Opmaak en knop zitten in handleiding.js (gedeeld met Fill en Pass). */
window.RS_HANDLEIDING = {
  app: "Loop",
  bijgewerkt: "16 november 2026",
  zoekVoorbeeld: "afvinken, morgen, plannen",
  volgSysteemThema: false,
  intro: "Loop is de mise-en-place-lijst van de keuken. Op Vandaag vink je af wat klaar is, op Morgen voorbereiden zet je de hoeveelheden voor de volgende dag klaar. Het onderdeel waar je nu bent staat open.",
  knop: { voor: "#openReport", klasse: "btn-icon", inhoud: "?", stijl: "font-weight:700;font-size:1.2rem" },
  toonZwevend: function () {
    return ["loginGate", "deviceGate", "namePrompt", "reportModal", "adminModal", "planningModal", "instructionModal"].some(function (id) {
      var m = document.getElementById(id); return m && !m.classList.contains("hidden");
    });
  },
  context: function () {
    var vis = function (id) { var m = document.getElementById(id); return m && !m.classList.contains("hidden"); };
    if (vis("loginGate")) return "inloggen";
    if (vis("deviceGate")) return "toestel";
    if (vis("namePrompt")) return "naam";
    if (vis("adminModal")) return "beheer";
    if (vis("reportModal")) return "rapportage";
    if (vis("planningModal")) return "plannen";
    var a = document.querySelector(".tab-btn.active");
    var id = a ? a.id : "tabToday";
    return { tabToday: "vandaag", tabTomorrow: "morgen", tabDashboard: "dashboard" }[id] || "vandaag";
  },
  secties: [
    { id: "inloggen", icoon: "🔑", titel: "Eenmalig inloggen met je RoboShift-account", zoek: "inloggen account e-mail wachtwoord vergeten fill eerste keer",
      tekst: `<p>De eerste keer op een toestel vraagt Loop om in te loggen met je <b>RoboShift-account</b>: hetzelfde e-mailadres en wachtwoord als bij Fill.</p>
<ol><li>Vul je e-mailadres en wachtwoord in.</li><li>Tik op <b>Inloggen</b>.</li><li>Daarna kies je gewoon je naam en code, zoals altijd.</li></ol>
<p>Wachtwoord vergeten? Stel het opnieuw in via <b>Wachtwoord vergeten?</b> op het inlogscherm van Fill.</p>
<p class="rsh-let">Inloggen gaat per adres. Open je Loop op een nieuw adres of in een andere browser, dan moet je dit één keer opnieuw doen.</p>` },

    { id: "naam", icoon: "👋", titel: "Je naam kiezen en inloggen", zoek: "naam kiezen code toegangscode inloggen wie ben jij",
      tekst: `<ol><li>Tik op je naam bij <b>Wie ben jij?</b>. Sta je er niet bij, typ je naam en tik op <b>Toevoegen</b>.</li>
<li>Vul je persoonlijke <b>toegangscode</b> in en tik op <b>Ontgrendelen</b>.</li></ol>
<p>Loop onthoudt je naam op dit toestel, zodat iedereen ziet wie wat heeft klaargezet. Wissel van persoon door rechtsboven op je naam te tikken.</p>
<p class="rsh-let">Na een tijd niets doen logt Loop je vanzelf uit en vraagt opnieuw wie je bent. Zo vinkt niemand onder andermans naam af.</p>
<p>Code vergeten? Vraag de beheerder, die kan hem bij <b>Lijst beheren › Team</b> opnieuw instellen.</p>` },

    { id: "toestel", icoon: "📱", titel: "Toestel is nog niet goedgekeurd", zoek: "goedkeuringscode toestel apparaat activeren nieuwe telefoon",
      tekst: `<p>Loop werkt alleen op goedgekeurde toestellen.</p>
<ol><li>Vraag de beheerder om een <b>goedkeuringscode</b> (die maakt hij bij <b>Lijst beheren › Apparaten</b>; een code is 30 minuten geldig).</li>
<li>Typ de code in, geef het toestel eventueel een naam (bijv. “Tablet keuken”) en tik op <b>Activeren</b>.</li></ol>` },

    { id: "vandaag", icoon: "📋", titel: "Vandaag: afvinken wat klaar is", zoek: "afvinken klaar vinkje hoeveelheid stappen taak notitie wissen",
      tekst: `<p>Per categorie zie je wat er vandaag gemaakt moet worden en hoeveel (<b>Hoeveelheid</b>).</p>
<ol><li>Maak het product klaar.</li><li>Tik op <b>Klaar</b>. Er komt een vinkje met jouw naam en de tijd.</li></ol>
<ul><li>Staat er <b>2/5</b> in plaats van Klaar? Dan heeft het product <b>stappen</b>. Tik erop en vink elke stap apart af.</li>
<li><b>taak</b> in plaats van een hoeveelheid: gewoon afvinken als het gedaan is (bijv. frituur verschonen).</li>
<li><b>ℹ️</b> achter de naam: uitleg en eventueel een foto van hoe het moet.</li>
<li><b>🗒</b> notitie, bijv. “wacht op leverancier”. <b>✕</b> wist de regel als hij vandaag niet nodig is.</li></ul>
<p>Met <b>Alleen vandaag</b> zie je alleen wat er echt gemaakt moet worden. Kies <b>Hele lijst</b> om iets toe te voegen dat vergeten was.</p>
<p class="rsh-let">Iets zonder hoeveelheid kun je pas afvinken als je eerst de hoeveelheid invult.</p>
<p class="rsh-tip">Niet af vandaag? Geen probleem: wat open staat komt vanzelf op de lijst van morgen (🔁). Staat iets een paar nachten open, dan wordt het rood en kan de beheerder er een melding van krijgen.</p>` },

    { id: "morgen", icoon: "🗓️", titel: "Morgen voorbereiden", zoek: "morgen voorbereiden hoeveelheid invullen goedkeuren voorstel lijst klaar",
      tekst: `<ol><li>Ga naar <b>Morgen voorbereiden</b>.</li>
<li>Kies bij elk product hoe vaak het morgen gemaakt moet worden.</li>
<li>Zie je <b>✨ Meestal ~3x op een vrijdag</b>? Dat is een voorstel op basis van eerdere weken. Tik erop om het over te nemen.</li>
<li>Kies bovenaan bij <b>Gemaakt door</b> je naam.</li>
<li>Tik op <b>✅ Lijst is klaar voor morgen</b>.</li></ol>
<p>Morgen staat deze lijst dan klaar op <b>Vandaag</b>.</p>` },

    { id: "opmerkingen", icoon: "💬", titel: "Opmerkingen en personeelseten", zoek: "opmerkingen bijzonderheden personeelseten gisteren",
      tekst: `<p>Bovenaan de lijst staan <b>Opmerkingen</b>: zet hier bijzonderheden voor de ploeg (bijv. groot gezelschap, iets op). Bij <b>Personeelseten gisteren</b> noteer je wat er gisteren gegeten is. De beheerder kan deze velden aan of uit zetten.</p>` },

    { id: "plannen", icoon: "📅", titel: "Vooruit plannen", zoek: "plannen datum vooruit later toekomst agenda",
      tekst: `<ol><li>Tik op <b>📅</b> achter een product.</li><li>Kies een datum en eventueel een korte notitie.</li><li>Tik op <b>+ Inplannen</b>.</li></ol>
<p>Het verschijnt meteen als melding onder het product op de lijst van vandaag, zodat je het alvast kunt oppakken als er tijd is. Op de geplande dag wordt het dringend.</p>` },

    { id: "dashboard", icoon: "📊", titel: "Dashboard", zoek: "dashboard voortgang blijft liggen wie heeft wat gedaan maand",
      tekst: `<p>Het dashboard toont hoe ver de lijst is per categorie, wie wat heeft gedaan, wat <b>🚨 blijft liggen</b> en wat <b>vooruit gepland</b> staat. Wissel tussen <b>Vandaag</b> en <b>Deze maand</b>. Je kunt hier niets wijzigen.</p>` },

    { id: "rapportage", icoon: "🗂", titel: "Rapportage en printen", zoek: "rapportage week wie deed wat printen papier",
      tekst: `<ul><li><b>📊</b> rechtsboven: per week wie wanneer wat heeft afgevinkt. Blader met ◀ ▶.</li>
<li><b>🖨️</b> rechtsboven: print de lijst, bijvoorbeeld om op papier in te vullen als er geen tablet is.</li></ul>` },

    { id: "beheer", icoon: "⚙️", titel: "Lijst beheren (beheerder)", zoek: "beheer instellingen categorie product toevoegen team code toestel whatsapp telegram melding zaak",
      tekst: `<p>Via <b>⚙️</b> rechtsboven. De meeste onderdelen kan alleen een beheerder aanpassen.</p>
<ul><li><b>Zaak</b>: naam, na hoeveel dagen iets rood wordt en gemeld, automatisch uitloggen, en welke velden zichtbaar zijn.</li>
<li><b>Team</b>: teamleden toevoegen en hun toegangscode instellen.</li>
<li><b>Apparaten</b>: goedkeuringscode maken voor een nieuw toestel, of een toestel intrekken.</li>
<li><b>WhatsApp / Telegram</b>: bericht als iets te lang blijft liggen. Test met <b>Test versturen</b>.</li>
<li><b>Categorieën en producten</b>: toevoegen, volgorde, stappen, instructie met foto, en of iets een taak is.</li></ul>` },

    { id: "thema", icoon: "🌙", titel: "Licht of donker", zoek: "donker licht thema nacht",
      tekst: `<p>Tik rechtsboven op <b>🌙</b> of <b>☀️</b>. Loop onthoudt de keuze per toestel.</p>` },
  ],
  vragen: [
    { id: "v-opslaan", icoon: "❓", titel: "Moet ik iets opslaan?", zoek: "opslaan bewaren",
      tekst: `<p>Nee. Alles wordt meteen opgeslagen en is direct te zien op alle andere toestellen.</p>` },
    { id: "v-fout", icoon: "❓", titel: "Ik heb per ongeluk iets afgevinkt", zoek: "per ongeluk ongedaan terug",
      tekst: `<p>Tik nog een keer op <b>✓ Klaar</b>. Het vinkje gaat er weer af.</p>` },
    { id: "v-nacht", icoon: "❓", titel: "Wat gebeurt er 's nachts met de lijst?", zoek: "nacht nieuwe dag open blijven",
      tekst: `<p>Elke nacht begint een nieuwe lijst. Wat nog open stond schuift door naar de nieuwe dag, zodat niets verloren gaat.</p>` },
    { id: "v-sync", icoon: "❓", titel: "Rechtsboven staat niet “verbonden”", zoek: "verbinden offline wifi sync",
      tekst: `<p>Controleer de wifi en ververs de pagina. Zonder verbinding werkt Loop alleen op dit toestel en zien anderen jouw vinkjes niet.</p>` },
  ],
};
