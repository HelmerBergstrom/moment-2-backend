# MOMENT 2 - Introduktion till webbtjänster

## API - Någon liveversion finns ej!

### Installation, databas

APIet använder MySQL som databas.
Klona ned källkodsfilerna, skriv "npm install" följt av de npm-paket som är nödvändiga att installera. Kör sedan koden "node server" i terminalen för att starta. Det som skapas när du kör "node server" är:

- En databas med namnet: cv2
- En tabell med namnet: workexperience

Tabellen innehåller raderna:

- id INT AUTO_INCREMENT PRIMARY KEY,
- companyname VARCHAR(200),
- jobtitle VARCHAR(200),
- location VARCHAR(200),
- startdate DATE,
- enddate DATE,
- description VARCHAR(300)

### Användning 

För att nå detta API kan man använda följande metoder:

- GET - /workexperience - Hämtar alla erfarenheter.
- GET - /workexperience/:id - Hämtar en specifik erfarenhet med id:t i frågan.
- POST - /workexperience - Lagrar en ny erfarenhet.
- PUT - /workexperience/:id - Ändrar en befintlig erfarenhet.
- DELETE - /workexperience/:id - Raderar en erfarenhet.

Datan behandlas i JSON-format med följande struktur:
```json
[{
    "id":1,
    "companyname":"Test AB",
    "jobtitle":"Testare",
    "location":"Jorden",
    "startdate":"2020-01-01T23:00:00.000Z",
    "enddate":"2020-01-02T22:00:00.000Z",
    "description":"Testare"
}]
```
Vill du inte använda dig av tiden i datumsträngarna? Använd metoden slice(0, 10) i din JavaScript-kod för att ta bort.

Exempel på hur koden kan se ut:

```javascript
const formattedDate = dateString.slice(0, 10);
```

Med denna kod kommer datumen se ut som följande: "2020-01-01".
