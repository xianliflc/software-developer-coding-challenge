var express = require('express');
var router = express.Router();
var bidsController = require('../controllers/bidsController');
var helper = require('../helper');
var validate = require('express-validation');
var bids_validation = require('./validations/bids');

/* get the winning bid of a car */
router.route('/:car_id/winner').get(validate(bids_validation.getWinningBidByCarId), function(req, res) {

    bidsController.getWinningBidByCarId(req, function (error, data) {
        
        res.json(helper.createResult(!error, error? error:data))
    });

});

/* get all bids history of a car */
router.route('/:car_id').get(validate(bids_validation.getAllBidsByCarId), function(req, res) {

    bidsController.getAllBidsByCarId(req, function (error, data) {
        res.json(helper.createResult(!error, error? error:data))
        
    });

});

/* post new bid on a given car_id */
router.route('/:car_id').post(validate(bids_validation.addBidByCarId), function (req, res) {

    bidsController.addBid(req, function (error, data) {
        res.json(helper.createResult(!error, error? error:data))
    });
});

module.exports = router;