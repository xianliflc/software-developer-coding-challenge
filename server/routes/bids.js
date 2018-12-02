var express = require('express');
var router = express.Router();
var bidsController = require('../controllers/bidsController');
var validate = require('express-validation');
var bids_validation = require('./validations/bids');

/* get the winning bid of a car */
router.route('/:car_id/winner').get(validate(bids_validation.getWinningBidByCarId), bidsController.getWinningBidByCarId);

/* get all bids history of a car */
router.route('/:car_id').get(validate(bids_validation.getAllBidsByCarId), bidsController.getAllBidsByCarId);

/* post new bid on a given car_id */
router.route('/:car_id').post(validate(bids_validation.addBidByCarId), bidsController.addBid);

module.exports = router;