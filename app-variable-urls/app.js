var express = require("express");

var app = express();

app.get('/', function (req, res) {
    res.send("Hello, World");
});

app.get('/greeting/:name/:location', function (req, res) {
    res.send("Hello, " + req.params.name + " from " + req.params.location);
});

app.listen(3000);
