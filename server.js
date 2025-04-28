const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./install'); // importerar från install.js-filen.

const app = express();
const port = process.env.PORT || 3001; // port 3001, då 3000 inte fungerar för mig.

// Middlewares.
app.use(cors()); // Tillåter korsdomänsförfrågningar.
app.use(express.json()); // Konverterar JSON-data till JS-objekt.

// Hämtar erfarenheter. Kör async await och try o catch.
app.get('/workexperience', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM workexperience'); // Lagrar raderna i arrayen rows.
        // Kontrollerar om arrayen är tom, isåfall returneras en tom array.
        if(rows.length === 0) {
            return res.status(200).json([]);
        }
        res.json(rows); // Skickar tillbaka raderna i json-format.
    } catch (error) {
        res.status(500).json({ message: "Fel vid hämtning av arbeten: " + error });
    }
});

// Lägger till erfarenhet.
app.post('/workexperience', async (req, res) => {
    // Deklarerar variabler för alla parametrar.
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    // if-sats för att kontrollera att allt blivit ifyllt.
    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) { 
        return res.status(400).json({ message: "Send companyname, jobtitle, location, startdate, enddate, and description!"});
    }
    try {
        // SQL-fråga för att lägga till i tabellen.
        const [result] = await db.query(
            `INSERT INTO workexperience (
                companyname, jobtitle, location, startdate, enddate, description
            ) VALUES (?, ?, ?, ?, ?, ?)`,
             [companyname, jobtitle, location, startdate, enddate, description]
        );
        // Returnerar denna om det fungerar. Status 201 då denna funktion lägger till en ny resurs.
        res.status(201).json({ message: "Erfarenhet tillagd i databasen!", 
            id: result.insertId });
    } catch(error) {
        res.status(500).json({ message: "Fel vid skapande av ny erfarenhet: " + error });
    }
});

// Ändrar en befintlig erfarenhet. Routen körs med "/:id"
app.put('/workexperience/:id', async (req, res) => {
    // Deklarerar id som en variabel.
    const id = req.params.id; 
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) { 
        return res.status(400).json({ message: "Send companyname, jobtitle, location, startdate, enddate, and description!"});
    }

    try { // SQL-fråga för att uppdatera en erfarenhet.
        const [result] = await db.query(`
            UPDATE workexperience
            SET companyname = ?, jobtitle = ?,
            location = ?, startdate = ?,
            enddate = ?, description = ?
            WHERE id = ?`, 
            [companyname, jobtitle, location, startdate, enddate, description, id]
        );
        
        // Påverkas inga rader finns inte ID:t och då skickas felmeddelande ut.
        if(result.affectedRows === 0) {
            return res.status(404).json({ message: "ID:t hittades inte!"})
        }
        res.status(200).json({ message: "Erfarenhet uppdaterad!"});
    } catch(error) {
        res.status(500).json({ message: "Fel vid uppdatering!"})
    }
});

// Raderar en erfarenhet.
app.delete('/workexperience/:id', async (req, res) => {
    const id = req.params.id; 
    
    try { // SQL-fråga för att radera en erfarenhet utifrån id:t.
        const [result] = await db.query(`
            DELETE FROM workexperience WHERE id = ?
            `, [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "ID hittades inte!"});
        }
        res.status(200).json({ message: "Erfarenhet raderad!" });

    } catch (error) {
        res.status(500).json({ message: "Fel vid borttagning!" });
    }
});

app.listen(port, () => {
    console.log("Server started on: http://localhost:" + port);
});