const PORT = 4000;
const HOST = 'localhost';

var express = require('express');
var fs = require('fs')
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

getCount = function(req, res){
    try {
        res.send(require('./data/count.json').postCount.toString())

    } catch (error) {
        res.status(500).send("Could not retrive count :( " + error.message)
    }
}

updateCount = function (req, res){
    let newPostCount = require('./data/count.json').postCount;
    newPostCount ++;
    let jsonData = JSON.stringify({ postCount: newPostCount });
    fs.writeFile("./data/count.json", jsonData, function (err) {
        if (err) {
            console.log(err);
            res.end('error occoured');
        }
    });
    res.end('count updated');
}

// parse application/json
app.use(bodyParser.json())

app.get('/', getCount);
app.post('/', updateCount);

var server = app.listen(PORT, function () { });
console.log(`Server is running at http://${HOST}:${PORT}/`)