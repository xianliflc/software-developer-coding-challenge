const Container = require('./container');

class carContainer extends Container {

    constructor() {
        super();
    }

    list(data, callback) {
        this.pool.query('select id, name from cars', function (error, result) {
            if (error) {
                throw error;
            }
            callback(false, result);
        });
    }

}

module.exports = carContainer;