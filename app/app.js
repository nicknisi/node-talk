var express = require("express"),
    fs = require("fs"),
    lessMiddleware = require("less-middleware");

var app = express();

var middleware = function (req, res, next) {
    // do something important
    // or don't.
    // i'm a comment, not a cop
    fs.readFile(__dirname + '/name.txt', function (err, data) {
        req.name = data;
        next();
    });
};

app.configure(function () {
    app.set('view engine', 'hbs');
    app.use(lessMiddleware({
        src: __dirname + '/public'
    }));
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function (req, res) {
    res.send('Hello, World!');
});

app.get('/foo', middleware, function (req, res) {
    res.send("Hello,  " + req.name + " from the route!");
});

app.get('/greeting/:name/:location', function (req, res) {
    res.render("user", {
        name: req.params.name,
        location: req.params.location
    });
});

app.use(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, Middleware");
});

app.listen(3000);
