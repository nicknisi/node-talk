var express = require('express'),
    lessMiddleware = require('less-middleware');

var app = express();

app.configure(function () {
    app.set('view engine', 'hbs');
    app.use(lessMiddleware({
        src: __dirname + '/public'
    }));
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function (req, res) {
    res.render("index", { title: 'Important Title', name: 'Bob' });
});

app.get('/greeting/:name', function (req, res) {
    res.render("index", { name: req.params.name});
});

app.use(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain' });
    res.end('Hello, Middleware');
});

app.listen(3000);
