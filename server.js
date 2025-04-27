const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./database');

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

app.listen(port, () => {
    console.log("Server started on: http://localhost:" + port);
});