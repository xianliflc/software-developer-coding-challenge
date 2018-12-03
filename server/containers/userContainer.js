const Container = require('./container');

class userContainer extends Container {

    constructor() {
        super();
    }

    list(data, callback) {
        this.pool.query('select id, name from users', function (error, result) {
            if (error) {
                throw error;
            }
            callback(false, result);
        });
    }

}

module.exports = userContainer;