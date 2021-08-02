var express = require('express');
var fs = require("fs");
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require("mysql");

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
    user: 'root',
    password: '1015',
    database: 'covid-counter',
    port: '3306'
});

router.use('/', session({
    secret: 'ics@#!$lab@#$!',
    resave: false,
    saveUninitialized: true
}));

router.use(express.static(__dirname + '/'));

router.get("/login.html", function (req, res) {
    var main = fs.readFileSync('html/login.html', 'utf8');
    res.send(main);
    console.log("login page");
});

router.post("/login", function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (email && password) {
        connection.query('select * from login where email=? and password=? ', [email, password], function (err, rows) {
            if (rows.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;
                global.id = req.session.email;
                req.session.admin = "user";
                global.auth = req.session.admin;
                console.log(id);
                console.log(req.session);
                res.redirect('/user.html');
            } else {
                res.send('<script>alert("wrong email or password."); location.href="/login.html"</script>');
            }
            res.end();
        });
    } else {
        res.send('<script>alert("Please enter."); location.href="/login.html"</script>')
    }
});

module.exports = router;