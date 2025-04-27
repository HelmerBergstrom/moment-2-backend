const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./install');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/workexperience', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM workexperience');
        res.json(rows);
    } catch (error) {
        res.status(500).send("Fel vid hämtning av arbeten: " + error);
    }
});

app.post('/workexperience', async (req, res) => {
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        return res.status(400).send("Alla fält måste fyllas i!");
    }
    try {
        const [result] = await db.execute(
            `INSERT INTO workexperience (
                companyname, jobtitle, location, startdate, enddate, description
            ) VALUES (?, ?, ?, ?, ?, ?)`,
             [companyname, jobtitle, location, startdate, enddate, description]
        );
        res.status(201).send({ message: "Erfarenhet tillagd i databasen!", 
            id: result.insertId });
    } catch(error) {
        res.status(500).send("Fel vid skapande av ny erfarenhet: " + error);
    }
});

app.listen(port, () => {
    console.log("Server started on: http://localhost:" + port);
});