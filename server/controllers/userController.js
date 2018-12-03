var helper = require('../helper');
var uContainer = require('../containers/userContainer');
var UserContainer = new uContainer();

module.exports = {

    list: function (req, res) {
        UserContainer.list({}, function(error, result){
            res.json(helper.createResult(true, { users:result }));
        });
    }
};