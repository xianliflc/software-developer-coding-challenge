var helper = require('../server/helper');
var expect = require('chai').expect;
var should = require('chai').should();
 
describe('test helper::createResult', function() {

    var actual_response;
    it('it should have error object when success = false and data is string', function(done) {
        actual_response = helper.createResult(false, "this is an error");
        actual_response.should.have.property('success').equal(false);
        actual_response.should.have.property('error');
        expect(actual_response.error).to.be.an('object');
        actual_response.error.should.have.property('message').equal("this is an error");
        done();
    });


    it('it should have error object when success = false and data is null', function(done) {
        actual_response = helper.createResult(false, null);
        actual_response.should.have.property('success').equal(false);
        actual_response.should.have.property('error');
        expect(actual_response.error).to.be.an('object');
        actual_response.error.should.have.property('message').equal(null);
        done();
    });

    it('it should have data node as object, when success = true', function(done) {
        actual_response = helper.createResult(true, null);
        actual_response.should.have.property('success').equal(true);
        actual_response.should.have.property('data');
        expect(actual_response.data).to.be.an('object');
        done();
    });

    it('it should have data node as object when success = true and data is object ', function(done) {
        actual_response = helper.createResult(true, {something: 'this is some data'});
        expect(actual_response.data).to.be.an('object');
        actual_response.data.should.have.property('something').equal('this is some data');
        done();
    });
});