"use strict";
const mysql2 = require("mysql2");
require("dotenv").config();
require("dotenv").configDotenv();

const model_connection = mysql2.createPool({
    host: process.env.DBMS_CONNECTION_HOST,
    password: process.env.DBMS_CONNECTION_PASSWORD,
    port: process.env.DBMS_CONNECTION_PORT,
    user: process.env.DBMS_CONNECTION_USER,
    database: process.env.DB,
});

model_connection.getConnection((error, connection) => {
    error ? console.log("Error while connecting to db", error)
        : console.log("Connected to db successfully!");
});

module.exports = model_connection.promise();