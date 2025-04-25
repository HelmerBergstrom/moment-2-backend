const { Client } = require("pg");

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 5432,
    ssl: {
        rejectUnauthorized: true
    }
});


module.exports = client;