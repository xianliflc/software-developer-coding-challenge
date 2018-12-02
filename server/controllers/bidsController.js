var helper = require('../helper');
var bcontainer = require('../containers/bidsContainer');
var BidsContainer = new bcontainer();

/**
 * Add a new bid to system
 * It should check whether the new bidding_value is greater than the max of the user's bids on this car
 * @param object req 
 * @param object res 
 */
function addBid(req, res) {
    var car_id = req.params.car_id;
    var bidding_value = req.body.bidding_value;
    var user_id = req.body.user_id;

    BidsContainer.getBestBidOfUserByCarId({car_id:car_id, user_id:user_id}, function(error_getBestBidOfUserByCarId, data){
        if (!shouldAddNewBidByBiddingValue(bidding_value, data)) {
            res.json(helper.createResult(false, {message:'bidding value is lower than user\'s highest record on car_id: ' + car_id}));
        } else {
            BidsContainer.addBid({car_id:car_id, user_id:user_id, bidding_value: bidding_value}, function(error, result){
                if (error) {
                    res.json(helper.createResult(false, error) );
                } else {
                    res.json(helper.createResult(true, result));
                }
            });  
        } 
    });
}

/**
 * Check if a new bid should be recorded by comparing to current bids
 * @param number bidding_value 
 * @param mixed current_bids 
 */
function shouldAddNewBidByBiddingValue(bidding_value, current_bids) {
    return (current_bids.length === 0 && bidding_value > 0 ) || (current_bids.length > 0 && bidding_value > current_bids[0]['bidding_value']);
}

/**
 * Get the winning bid on a certain car item
 * @param object req 
 * @param object res 
 */
function getWinningBidByCarId (req, res) {
    BidsContainer.getWinningBidByCarId({car_id:req.params.car_id}, function(error, result){
        res.json(helper.createResult(true, { car_id: req.params.car_id, winner: result }));
    });
}

/**
 * Get all bids history on a certain car
 * @param object req
 * @param object res 
 */
function getAllBidsByCarId (req, res) {
    BidsContainer.getAllBidsByCarId({car_id:req.params.car_id}, function(error, result){
        res.json(helper.createResult(true, { car_id: req.params.car_id, bids: result }));
    });
}

module.exports = {
    addBid: addBid,
    getWinningBidByCarId: getWinningBidByCarId,
    getAllBidsByCarId: getAllBidsByCarId
};