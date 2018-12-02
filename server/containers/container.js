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

}

module.exports = Container;