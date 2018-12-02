var express = require('express');
var bodyParser = require('body-parser');
var helper = require('./server/helper');
var routes = require('./server/routes');
var expressValidation = require('express-validation');

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

app.use(function(err, req, res, next) {
    if (err instanceof expressValidation.ValidationError) {
        res.status(err.status).json(helper.createResult(false, {
            status: err.status,
            message: err.message
          }));
    } else {
        res.status(500)
          .json(helper.createResult(false, {
            status: err.status,
            message: err.message
          })
        );
    }
});

app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

module.exports = app;