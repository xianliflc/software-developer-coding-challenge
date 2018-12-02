var express = require('express');
var router = express.Router();
var bidsController = require('../controllers/bidsController');

/* get the winning bid of a car */
router.get('/:car_id/winner', function(req, res) {
    var car_id = req.params.car_id;

    bidsController.getWinningBidByCarId(car_id, function (data) {
        res.json({ car_id: car_id, winner: data });
    });

});

/* get all bids history of a car */
router.get('/:car_id', function(req, res) {
    var car_id = req.params.car_id;

    bidsController.getAllBidsByCarId(car_id, function (data) {
        res.json({ car_id: car_id, bids: data });
    });

});

/* post new bid on a given car_id */
router.post('/:car_id', function (req, res) {
    var bid_data = req.body;
    var car_id = req.params.car_id;

    bid_data = Object.assign(bid_data, {car_id: car_id});
    bidsController.addBid(bid_data, function (success) {
        res.json({success});
    });
});

module.exports = router;