var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js');
var aylien = require("aylien_textapi");
const dotenv = require('dotenv');

dotenv.config();

// Get Aylien SDK
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

const app = express()

app.use(express.static('dist'))

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.get('/getSentiment', function (req, res) {
    let paramObj = {};
    if (req.query.text) {
        paramObj.text = req.query.text;
    } else {
        paramObj.url = req.query.url;
    }
    textapi.sentiment(paramObj, (error, response) => {
        const resp = {};
        if (error) {
            resp.error = true;
        } else {
            resp.error = false;
            resp.text = response.text;
            resp.polarity = response.polarity;
            resp.subjectivity = response.subjectivity;
        }
        res.send(resp);
    });
})