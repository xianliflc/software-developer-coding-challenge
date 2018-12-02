var expect = require('chai').expect;
var should = require('chai').should();
var rewire = require('rewire');
var controller = rewire('../server/controllers/bidsController');
var shouldAddNewBidByBiddingValue = controller.__get__('shouldAddNewBidByBiddingValue'); 

describe('test bidsController::shouldAddNewBidByBiddingValue', function() {

    it('it should return false when when bidding_value is lower than current bids', function(done) {
        var current_bids = [{
            bidding_value: 12.00
        }];
        
        var result = shouldAddNewBidByBiddingValue(12.00, current_bids);
        expect(result).to.be.a('boolean').equal(false);
        result = shouldAddNewBidByBiddingValue(11.00, current_bids);
        expect(result).to.be.a('boolean').equal(false);
        done();
    });

    it('it should return true when when bidding_value is greater than current bids', function(done) {
        var current_bids = [{
            bidding_value: 12.00
        }];
        var result = shouldAddNewBidByBiddingValue(123.00, current_bids);
        expect(result).to.be.a('boolean').equal(true);
        done();
    });

    it('it should return true when when current_bids is empty', function(done) {

        var current_bids = [];
        var result = shouldAddNewBidByBiddingValue(1.00, current_bids);
        expect(result).to.be.a('boolean').equal(true);
        done();
    });

});