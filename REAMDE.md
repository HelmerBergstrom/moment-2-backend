# MOMENT 2 - Introduktion till webbtjänster

### Starten
Jag började arbetet med att ladda ned och konfiguera verktyg som skulle komma att användas till uppgiften. Jag tänkte först använda PostgreSQL, men valde snabbt att ändra till försöka på nytt med MySQL. Förra uppgiften i kursen körde jag på MySQL till allt egentligen var färdigt, men sedan uppkom problem med publiceringen som gjorde att jag bytte till PostgreSQL för att kunna publicera arbetet.

Jag märkte lite senare att jag laddade ned mysql2 istället för mysql bara och detta gjorde att lite nya saker uppkom. Det som jag kom fram till är att mysql2 kräver att man kör promises och async/await. Kan ha helt fel i detta, men det fungerade iallafall efter jag skrev med det i koden. 

Jag tillämpade förutom databashanteraren express, cors, dotenv och middlewares. 

### Install.js
Jag bestämde mig för att köra på samma upplägg som jag gjorde i moment 1, med en JavaScript-fil för att ansluta till databasen och en fil för routes osv. Detta känns som det mest lämpliga sättet när man jobbar med lite mindre uppgifter, då koden blir uppdelad och för att man lättare kan hantera den enligt min uppfattning.

Jag skapade i samband med uppstarten av install.js-filen en env-fil med de hemliga nycklarna för att komma åt databasen. Efter det skapade jag en koppling till databasen med dessa variabler.

I install.js-filen skapade jag databasen med namnet "cv2" och tabellen "workexperience". Jag skrev även kod för att ta bort tabellen ifall det skulle behövas, men det kommenterade jag direkt bort för att undvika att den körs varje gång man startar servern.

### Server.js
I denna fil skapade jag routes för get, post, put och delete. Dessa routes skapades asynkront och med try/catch. 

Innan dessa routes skapade jag en "app.listen" för att skriva ut länken dit servern körs på. Jag körde på port 3000 ett ganska långt tag innan jag insåg att det inte fungerade. Jag fick felmeddelande om att hemsidan inte fick tag på mina routes. När jag senare i arbetet ändrade till port 3000 fungerade detta.

I min get-route hämtar jag alla arbetserfarenheter via en SQL-fråga och skickar tillbaka datan i JSON-format. Finns inte erfarenheter skickas en tom array tillbaka.

I min post-route lagrar jag först alla raders namn i databasen som variabler. Därefter en if-sats för att kontrollera att allt är ifyllt. Nedan detta kör jag en try/catch för att lägga till en erfarenhet i databasen. 

Dessa två routes har sökvägen "/workexperience"

I min put-route är sökvägen densamma som de två första, men här lägger jag till /:id efter för att dessa routes ska pricka ut en enskild erfarenhet. I put-routen lagrar jag först id:t som en variabel, detta genom att pricka ut där id:t ligger, vilket är i "req.params.id". Därefter deklarerar jag variabler för samtliga raders namn i databasen.

Här körs sedan en SQL-fråga för att uppdatera en erfarenhet.

I denna route körs en if-sats som kontrollerar om rader påverkas. Om rader inte påverkas när man kör en UPDATE finns inte ID:t. Detta körs även i delete-routen. 

Delete-routen är lik den förra med undantag för själva SQL-frågan. Här körs en SQL-fråga för att ta bort en erfarenhet utifrån ID:t i URL:en.