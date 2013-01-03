var express = require("express");

var app = express();

app.configure(function () {
    app.set('view engine', 'hbs');
});

app.get('/', function (req, res) {
    res.redirect('/greeting/nick/omaha');
});

app.get('/greeting/:name/:location', function (req, res) {
    res.render("user", {
        name: req.params.name,
        location: req.params.location
    });
});

app.listen(3000);
