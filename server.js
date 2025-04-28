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
        const [rows] = await db.query('SELECT * FROM workexperience');
        res.json(rows);
    } catch (error) {
        res.status(500).send("Fel vid hämtning av arbeten: " + error);
    }
});

app.post('/workexperience', async (req, res) => {
    console.log(req.body);

    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) { 
        return res.status(400).send("Send companyname, jobtitle, location, startdate, enddate, and description!");
    }
    try {
        const [result] = await db.query(
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

app.put('/workexperience/:id', async (req, res) => {

});

app.delete('/workexperience/:id', async (req, res) => {

});

app.listen(port, () => {
    console.log("Server started on: http://localhost:" + port);
});