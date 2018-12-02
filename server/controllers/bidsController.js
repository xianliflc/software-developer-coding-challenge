var mysql = require('mysql');
var mysqlConf = require('../../config/config');
var pool = mysql.createPool(mysqlConf.mysql);


/**
 * Add a new bid to system
 * @param object data 
 * @param function callback 
 */
function addBid(req, callback) {

    var car_id = req.params.car_id;
    var user_id = req.body.user_id;
    var bidding_value = req.body.bidding_value;
    var sql_max_bid_of_user = 'select max(bidding_value) from bids where user_id = ? and car_id = ?';
    var sql_insert_new_bid = 'insert into bids(car_id, user_id, bidding_value) select cars.id as car_id, users.id as user_id, ? from users, cars where cars.id = ? and users.id = ?';
    
    pool.query(sql_max_bid_of_user, [user_id, car_id], function (error_max_bid_of_user , result) {
        if (error_max_bid_of_user) {
            callback(error_max_bid_of_user, result);
        } else if (!shouldAddNewBidByBiddingValue(bidding_value, result)) {
            callback({message:'bidding value is lower than user\'s highest record on car_id: ' + car_id});
        } else {
            pool.query(sql_insert_new_bid, [bidding_value, car_id, user_id], function (error_insert_new_bid, result) {

                if (error_insert_new_bid) {
                    throw error_insert_new_bid;
                }
                
                var success = result.affectedRows > 0; 
                if (success) {
                    callback(false, {message: 'successfully added'});
                } else {
                    callback({messgae: 'car_id and user_id must be present'});
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
 * @param integer id 
 * @param function callback 
 */
function getWinningBidByCarId (req, callback) {
    var id = req.params.car_id;

    pool.query('select bidding_value, user_id from bids where car_id = ? order by bidding_value desc limit 1', [id], function (error, result) {
        if (error) {
            throw error;
        }
        callback(false, { car_id: id, winner: result });
    });
}

/**
 * Get all bids history on a certain car
 * @param integer id 
 * @param function callback 
 */
function getAllBidsByCarId (req, callback) {
    var id = req.params.car_id;

    pool.query('select user_id, bidding_value, created_at from bids where car_id = ?', [id], function (error, result) {
        if (error) {
            throw error;
        }
        callback(false, {car_id:id, bids:result});
    });
}

module.exports = {
    addBid: addBid,
    getWinningBidByCarId: getWinningBidByCarId,
    getAllBidsByCarId: getAllBidsByCarId
};