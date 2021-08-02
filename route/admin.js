var express = require('express');
var fs = require("fs");
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require("mysql");

var router = express.Router();


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


router.get("/admin_login.html", function (req, res) {
    var main = fs.readFileSync('html/admin_login.html', 'utf8');
    res.send(main);
    console.log("admin page");
});


router.post("/admin", function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var auth = "admin";

    if (email && password) {
        connection.query('select * from login where email=? and password=? and auth=? ',
            [email, password, auth], function (err, rows) {
                if (rows.length > 0) {
                    if (auth == "admin") {
                        req.session.loggedin = true;
                        req.session.email = email;
                        global.id = req.session.email;
                        req.session.admin = "admin";
                        global.auth = req.session.admin;
                        console.log(id);
                        console.log(req.session);
                        res.redirect('/admin.html');
                    }
                } else {
                    res.send('<script>alert("No permission"); location.href="/admin_login.html"</script>');
                }
            });
    } else {
        res.send('<script>alert("Please enter."); location.href="/admin_login.html"</script>')

    }
});

module.exports = router;