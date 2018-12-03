const Container = require('./container');

class bidsContainer extends Container {

    constructor() {
        super();
    }

    /**
     * get the best bid of a user on selected car
     * @param object data 
     * @param function callback 
     */
    getBestBidOfUserByCarId(data, callback) {
        var sql_max_bid_of_user = 'select max(bidding_value) as bidding_value from bids where user_id = ? and car_id = ?';
        this.query(sql_max_bid_of_user, [data.user_id, data.car_id], callback);
    }

    /**
     * add a new bid on a selected car
     * @param object data 
     * @param function callback 
     */
    addBid(data, callback) {
        var sql_insert_new_bid = 'insert into bids(car_id, user_id, bidding_value) select cars.id as car_id, users.id as user_id, ? from users, cars where cars.id = ? and users.id = ?';
        this.query(sql_insert_new_bid, [data.bidding_value, data.car_id, data.user_id], function (error, result) {
            var success = result.affectedRows > 0; 
            if (success) {
                callback(false, 'successfully added');
            } else {
                callback('car_id and user_id must be present');
            }
        });  
    }

    /**
     * get current best bid on certain car
     * @param object data 
     * @param function callback 
     */
    getWinningBidByCarId(data, callback) {
        var sql_get_winning_bid = 'select bidding_value, user_id from bids where car_id = ? order by bidding_value desc limit 1';
        this.query(sql_get_winning_bid, [data.car_id], callback);
    }

    /**
     * get all bids on a certain car
     * @param object data 
     * @param function callback 
     */
    getAllBidsByCarId(data, callback) {   
        var sql_get_all_bids = 'select user_id, bidding_value, created_at from bids where car_id = ?';
        this.query(sql_get_all_bids, [data.car_id], callback)
    }

}

module.exports = bidsContainer;