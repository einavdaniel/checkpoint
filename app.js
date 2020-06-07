const PORT = 4000;
const HOST = 'localhost';
const DATA_PATH = './data/count.json'

var express = require('express');
var fs = require('fs')
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// verify data file exists or create one
initData = function () {
    try {
        if (!fs.existsSync(DATA_PATH)) {
            //if no file exists, create one and set count to 0
            let jsonData = JSON.stringify({ postCount: 0 });
            fs.writeFile(DATA_PATH, jsonData, function (err) {
                if (err) {
                    console.error(err);
                }
            });
        }
    } catch (err) {
        console.error(err)
    }
}

extractCountFromJson = function () {
    let rawdata = fs.readFileSync(DATA_PATH)
    let jsonData = JSON.parse(rawdata)
    return jsonData.postCount;
}

getCount = function (req, res) {
    try {
        res.send(extractCountFromJson().toString())
    } catch (error) {
        res.status(500).send("Could not retrive count :( " + error.message)
    }
}

updateCount = function (req, res) {
    try {
        let newPostCount = extractCountFromJson();
        newPostCount++;
        let jsonData = JSON.stringify({ postCount: newPostCount });
        fs.writeFile(DATA_PATH, jsonData, function (err) {
            if (err) {
                console.error(err);
            }
        });
        res.status(200).send("count updated");
    }
    catch (error) {
        res.status(500).send("Error in updating." + error.message)
    }
}

// set HTTP functions
app.get('/', getCount);
app.post('/', updateCount);

// initialize datafile
initData();

// start server
var server = app.listen(PORT, function () { });
console.log(`Server is running at http://${HOST}:${PORT}/`)