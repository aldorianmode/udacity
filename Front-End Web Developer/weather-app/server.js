const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Routes
app.get('/projectData', (req, res) => {
    console.log('GET projectData');
    res.send(projectData);
});

app.post('/projectData', (req, res) => {
    console.log('POST projectData: data = ' + JSON.stringify(req.body));
    const newData = req.body;
    projectData.temperature = newData.temperature;
    projectData.date = newData.date;
    projectData.userResponse = newData.userResponse;
    res.status(200).end();
});

// Setup Server
app.listen(8000, () => (console.log("Running server!")));