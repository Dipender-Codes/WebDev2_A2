// Importing the dbDetails module that contains database credentials
var dbDetails = require("./db-details");

// Importing the mysql2 library for handling MySQL database connections
var mysql = require("mysql2");

// Importing the body-parser module to handle HTTP request body parsing
var bodyParser = require("body-parser");

// Importing the http module to create HTTP servers
var http = require("http");

module.exports = {
    // Creating a function that returns a new MySQL connection using credentials from dbDetails
    getConnection: () => {
        return mysql.createConnection({
            // Setting the host for the MySQL database
            host: dbDetails.host,
            // Setting the user for the MySQL database
            user: dbDetails.user,
            // Setting the password for the MySQL database
            password: dbDetails.password,
            // Setting the database name
            database: dbDetails.database
        });
    }
}
