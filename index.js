var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./server/routes');

process
    .on('uncaughtException', function (err) {
        console.error(err);
        exit(1);
    })
    .on('unhandledRejection', function (reason, p) {
        console.error(reason, p);
    });

var app = express();

var port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// mount all routes
app.use('/api', routes);

app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

module.exports = app;