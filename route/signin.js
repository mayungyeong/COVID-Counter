var express = require('express');
var fs = require("fs");
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require("mysql");
var path = require('path')

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var connection = mysql.createConnection({
    user: 'root',
    password: '1015',
    database: 'covid-counter',
    port: '3306'
});

connection.connect(function (err) {
    if (err) console.log(err);
    else console.log("connected");

    router.get('/signup', function (req, res) {
        res.sendFile(path.join(__dirname, '../html/signup.html'))
        console.log('signup page')
    })

    router.post('/signup', function (req, res) {
        var idNum = req.body.idNum;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var phoneNumber = req.body.phoneNumber;
        var email = req.file.email;
        var password = req.file.password;
        var auth = "user";
        var sql =  'INSERT INTO login (idNum, firstName, lastName, phoneNumber, email, password, auth) values (?, ?, ?, ?, ?, ?, user)';
        var param = [idNum, firstName, lastName, phoneNumber, email, password, auth];

        connection.query(sql, param, function (err, rows) {
            if (err) console.log(err);
            console.log(param);
            res.redirect('/index.html');
        });
    });

});

module.exports = router;

