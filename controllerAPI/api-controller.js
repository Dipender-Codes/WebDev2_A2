// Importing the crowdfunding_db module to handle database connections
var dbcon = require("../crowdfunding_db");

// Creating a connection to the MySQL database using the imported dbcon module
var connection = dbcon.getConnection();

// Connecting to the database
connection.connect();

// Importing the express module for creating the router
var express = require('express');

// Creating an express router to define API routes
var router = express.Router();

// GET: Retrieving all active fundraisers including category for Home page
router.get("/fundraisers", (req, res) => {
    const sql_query = `
        SELECT FUNDRAISER.FUNDRAISER_ID, ORGANIZER, CAPTION, TARGET_FUNDING, 
        CURRENT_FUNDING, CITY, CATEGORY.NAME AS CATEGORY_NAME 
        FROM FUNDRAISER
        JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID
        WHERE ACTIVE = 1;
    `;

    // Querying the database to retrieve active fundraisers
    connection.query(sql_query, (err, results) => {
        if (err) {
            console.error("Error retrieving active fundraisers: ", err);
            res.status(500).json({ error: "An error occurred while retrieving active fundraisers. Please try again later." });
        } else {
            res.setHeader('Content-Type', 'application/json'); // Setting the content type of the response to JSON
            res.status(200).json(results); // Sending the result as a JSON response
        }
    });
});

// GET: Retrieving all categories for the Search fundraisers page
router.get("/categories", (req, res) => {
    const sql_query = `SELECT * FROM CATEGORY;`;

    // Querying the database to retrieve all categories
    connection.query(sql_query, (err, results) => {
        if (err) {
            console.error("Error retrieving categories: ", err);
            res.status(500).json({ error: "An error occurred while retrieving categories. Please try again later." });
        } else {
            res.setHeader('Content-Type', 'application/json'); // Setting the content type of the response to JSON
            res.status(200).json(results); // Sending the result as a JSON response
        }
    });
});

// GET: Retrieving active fundraisers based on search criteria (category, city, organizer)
router.get("/search", (req, res) => {
    // Extracting search criteria from the query parameters
    const { category, city, organizer } = req.query;

    // Building the SQL query with conditions based on the provided search criteria
    let sql_query = `
        SELECT FUNDRAISER.FUNDRAISER_ID, ORGANIZER, CAPTION, TARGET_FUNDING, 
        CURRENT_FUNDING, CITY, CATEGORY.NAME AS CATEGORY_NAME 
        FROM FUNDRAISER
        JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID
        WHERE ACTIVE = 1
    `;

    const params = [];

    // Adding filters for category, city, and organizer if provided in the query
    if (category) {
        sql_query += ` AND CATEGORY.NAME = ?`;
        params.push(category);
    }

    if (city) {
        sql_query += ` AND CITY = ?`;
        params.push(city);
    }

    if (organizer) {
        sql_query += ` AND ORGANIZER LIKE ?`; // Using LIKE to allow partial matching for organizer
        params.push(`%${organizer}%`); // Supporting partial matches for organizer name
    }

    // Querying the database with the search criteria
    connection.query(sql_query, params, (err, results) => {
        if (err) {
            console.error("Error retrieving fundraisers with criteria: ", err);
            res.status(500).json({ error: "An error occurred while retrieving fundraisers. Please try again later." });
        } else {
            res.setHeader('Content-Type', 'application/json'); // Setting the content type of the response to JSON
            res.status(200).json(results); // Sending the result as a JSON response
        }
    });
});

// GET: Retrieving details of a specific fundraiser by its ID
router.get("/fundraiser/:id", (req, res) => {
    // Extracting the fundraiser ID from the URL parameters
    const given_ID = req.params.id;

    const sql_query = `
        SELECT FUNDRAISER.FUNDRAISER_ID, ORGANIZER, CAPTION, TARGET_FUNDING, 
        CURRENT_FUNDING, CITY, ACTIVE, CATEGORY.NAME AS CATEGORY_NAME 
        FROM FUNDRAISER
        JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID
        WHERE FUNDRAISER.FUNDRAISER_ID = ?;
    `;

    // Querying the database to retrieve fundraiser details by ID
    connection.query(sql_query, [given_ID], (err, result) => {
        if (err) {
            console.error("Error retrieving fundraiser by ID: ", err);
            res.status(500).json({ error: "An error occurred while retrieving the fundraiser. Please try again later." });
        } else if (result.length === 0) {
            res.status(404).json({ message: "Fundraiser not found" });
        } else {
            res.setHeader('Content-Type', 'application/json'); // Setting the content type of the response to JSON
            res.status(200).json(result[0]); // Sending the result as a JSON response
        }
    });
});

// Exporting the router to make it available to other parts of the application
module.exports = router;
