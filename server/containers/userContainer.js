const Container = require('./container');

class userContainer extends Container {

    constructor() {
        super();
    }

    /**
     * get all users
     * @param object data 
     * @param function callback 
     */
    list(data, callback) {
        var sql = 'select id, name from users';
        this.query(sql, [], callback);
    }

}

module.exports = userContainer;