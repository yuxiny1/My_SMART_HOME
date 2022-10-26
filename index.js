//index file, connnect to the server
const util = require('util');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5555;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'midterm',
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

const dbRun = util.promisify(db.query.bind(db));
global.dbRun = dbRun;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
require('./routes/main')(app);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
