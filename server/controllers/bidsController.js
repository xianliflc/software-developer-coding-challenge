var mysql = require('mysql');
var mysqlConf = require('../../config/config');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {

    /**
     * Add a new bid to system
     * @param object data 
     * @param function callback 
     */
    addBid: function (data, callback) {

        pool.query('insert into bids(car_id, user_id, bidding_value) select cars.id as car_id, users.id as user_id, ? from users, cars where cars.id = ? and users.id = ?', [data.bidding_value, data.car_id, data.user_id], function (error, result) {
            if (error) {
                throw error;
            }
            callback(result.affectedRows > 0);
        });
    },

    /**
     * Get the winning bid on a certain car item
     * @param integer id 
     * @param function callback 
     */
    getWinningBidByCarId: function (id, callback) {
        pool.query('select bidding_value, user_id from bids where car_id = ? order by bidding_value desc limit 1', [id], function (error, result) {
            if (error) {
                throw error;
            }
            callback(result);
        });
    },

    /**
     * Get all bids history on a certain car
     * @param integer id 
     * @param function callback 
     */
    getAllBidsByCarId: function (id, callback) {
        pool.query('select user_id, bidding_value, created_at from bids where car_id = ?', [id], function (error, result) {
            if (error) {
                throw error;
            }
            callback(result);
        });
    }
};