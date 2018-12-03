var helper = require('../helper');
var cContainer = require('../containers/carContainer');
var CarContainer = new cContainer();

module.exports = {

    /**
     * list all cars
     * @param function callback 
     */
    list: function (req, res) {
        CarContainer.list({}, function(error, result){
            res.json(helper.createResult(true, { cars:result }));
        });
    }
};