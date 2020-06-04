const PORT = 4000;
const HOST = 'localhost';

var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

sayhey = function (req, res) {
    try {
        res.send("Hello from NodeJS!")

    } catch (error) {
        res.status(500).send("Couldn't say hello :( " + error.message)
    }

}

// parse application/json
app.use(bodyParser.json())

app.get('/', sayhey);

var server = app.listen(PORT, function () { });
console.log(`Server is running at http://${HOST}:${PORT}/`)