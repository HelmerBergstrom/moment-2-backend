const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

connection.connect((error) => {
    if(error) {
        console.error("Fel i anslutningen: " + error);
        return;
    }
    console.log("Ansluten till MySQL!");
});

connection.query("CREATE DATABASE IF NOT EXISTS cv2;", (error, results) => {
    if(error) throw error;

    console.log("Databas skapad: " + results);
});

connection.query(` CREATE TABLE IF NOT EXISTS workexperience (
        id INT AUTO_INCREMENT PRIMARY KEY,
        companyname VARCHAR(200),
        jobtitle VARCHAR(200),
        location VARCHAR(200),
        startdate DATE,
        enddate DATE,
        description VARCHAR(300)
        )`, (error, results) => {
            if (error) throw error;

            console.log("Table workexperience created: " + results);
        });

// connection.query("DROP TABLE IF EXISTS workexperience;", (error, results) => {
//     if(error) throw error;

//     console.log("Table workexperience dropped: " + results);
// })

module.exports = connection;