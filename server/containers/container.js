var mysql = require('mysql');
var mysqlConf = require('../../config/config');
var pool = mysql.createPool(mysqlConf.mysql);

class Container {

    constructor() {
        this.pool = pool;
    }

    getPool() {
        return this.pool;
    }

    query(sql, data, callback) {
        this.pool.query(sql, data, function (error, result) {
            if (error) {
                throw error;
            }
            callback(false, result);
        });
    }

}

module.exports = Container;