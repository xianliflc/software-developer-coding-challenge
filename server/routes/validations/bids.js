var joi = require('joi');

module.exports = {

  addBidByCarId: {
    body: {
      user_id: joi.number().integer().min(1).required(),
      bidding_value: joi.number().min(1).required()
    },
    params: {
        car_id: joi.number().integer().min(1).required()
    }
  }
};