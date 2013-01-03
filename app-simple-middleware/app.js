var express = require("express"),
    fs = require('fs');

var app = express();

app.get('/', function (req, res) {
    res.send("Hello, World");
});

var middleware = function (req, res, next) {
    // do something important
    // or don't.
    // i'm a comment, not a cop
    fs.readFile(__dirname + '/name.txt', function (err, data) {
        req.name = data;
        next();
    });
};

app.get('/foo', middleware, function (req, res) {
    res.send("Hello, " + req.name + " from the route!");
});

app.use(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end('Hello, Middleware');
});

app.listen(3000);
