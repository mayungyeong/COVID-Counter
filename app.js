var express = require('express');
var path = require('path');
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');

var port = 3000;
var app = express();

app.use(express.static(__dirname + '/'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var index = require('./route/index');
var login = require('./route/login');
var admin = require('./route/admin');

app.use('/', index);
app.use('/', login);
app.use('/', admin);


app.listen(port, function () {
    console.log("start port: " + port);
});