const Container = require('./container');

class carContainer extends Container {

    constructor() {
        super();
    }

    /**
     * get all cars
     * @param object data 
     * @param function callback 
     */
    list(data, callback) {
        var sql = 'select id, name from cars';
        this.query(sql, [], callback);
    }

}

module.exports = carContainer;