// Importing the express module for creating the server and handling HTTP requests
var express = require('express');

// Creating an instance of the express application
var app = express();

// Importing the cors module to allow cross-origin requests
const cors = require('cors');

// Importing the fundraiserAPI module which handles the API routes
var fundraiserAPI = require("./controllerAPI/api-controller");

// Importing the body-parser module to handle parsing of URL-encoded request bodies
var bodyParser = require("body-parser");

// Using body-parser middleware to parse URL-encoded bodies (form submissions)
app.use(bodyParser.urlencoded({extended: false}));

// Using the cors middleware to enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Using the fundraiserAPI routes, with '/api' as the base URL for all API routes
app.use("/api", fundraiserAPI);

// Starting the server and listening on port 3000, logging a message when it's up and running
app.listen(3000, () => {
    console.log("Server up and running on port 3000");
});
