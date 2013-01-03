var express = require("express"),
    lessMiddleware = require("less-middleware");

var app = express();

app.configure(function () {
    app.set('view engine', 'hbs');
    app.use(lessMiddleware({
        src: __dirname + '/public'
    }));
    app.use(express.static(__dirname + '/public'));
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
