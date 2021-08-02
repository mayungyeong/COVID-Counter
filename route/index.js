var express = require('express');
var fs = require("fs");
var session = require('express-session');
var bodyParser = require('body-parser');
var history = require('history');

var login = require('./login');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use('/', login);


router.get("/", function (req, res) {                   
        res.redirect('/index.html');
});

router.get("/index.html", function (req, res) {
        var sess = req.session.name;
        var main = fs.readFileSync('html/index.html', 'utf8');
        res.send(main);
        console.log("index page");
});

router.get("/signup.html", function (req, res) {
        var main = fs.readFileSync('html/signup.html', 'utf8');
        res.send(main);
        console.log("signup page");
});

router.get("/user.html", function (req, res) {
        var main = fs.readFileSync('html/user.html', 'utf8');
        res.send(main);
        console.log("user page");
});

router.get("/status.html", function (req, res) {
        var main = fs.readFileSync('html/status.html', 'utf8');
        res.send(main);
        console.log("status page");
});

router.get("/reserv.html", function (req, res) {
        var main = fs.readFileSync('html/reserv.html', 'utf8');
        res.send(main);
        console.log("reserv page");
});

router.get("/admin.html", function (req, res) {
        var main = fs.readFileSync('html/admin.html', 'utf8');
        res.send(main);
        console.log("admin page");
});

router.get("/monitor.html", function (req, res) {
        var main = fs.readFileSync('html/monitor.html', 'utf8');
        res.send(main);
        console.log("monitor page");
});

router.get("/QR.html", function (req, res) {
        var main = fs.readFileSync('html/QR.html', 'utf8');
        res.send(main);
        console.log("QR page");
});


module.exports = router;
