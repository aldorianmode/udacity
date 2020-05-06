var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
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
    const textToAnalyze = req.query.text;
    textapi.sentiment({ 'text': textToAnalyze }, (error, response) => {
        const resp = {};
        if (error === null) {            
            resp.error = false;
            resp.polarity = response.polarity;
            resp.subjectivity = response.subjectivity;
        }
        else {
            resp.error = true;
        }
        res.send(resp);
    });
})