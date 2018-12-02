var express = require('express');
var router = express.Router();
var bidsController = require('../controllers/bidsController');
var helper = require('../helper');
var validate = require('express-validation');
var bids_validation = require('./validations/bids');

/* get the winning bid of a car */
router.route('/:car_id/winner').get(validate(bids_validation.getWinningBidByCarId), function(req, res) {
    var car_id = req.params.car_id;

    bidsController.getWinningBidByCarId(car_id, function (data) {
        res.json(helper.createResult(true, { car_id: car_id, winner: data }));
    });

});

/* get all bids history of a car */
router.route('/:car_id').get(validate(bids_validation.getAllBidsByCarId), function(req, res) {
    var car_id = req.params.car_id;

    bidsController.getAllBidsByCarId(car_id, function (data) {
        res.json(helper.createResult(true, { car_id: car_id, bids: data }));
    });

});

/* post new bid on a given car_id */
router.route('/:car_id').post(validate(bids_validation.addBidByCarId), function (req, res) {
    var bid_data = req.body;
    var car_id = req.params.car_id;

    bid_data = Object.assign(bid_data, {car_id: car_id});
    bidsController.addBid(bid_data, function (success) {
        var r =  helper.createResult(success, success? { message: 'success' } : { message:'Bad Request: user and car must be present' } );
        res.json(r);
    });
});

module.exports = router;