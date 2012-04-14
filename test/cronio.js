var should = require('should'),
    util = require('util'),
    cronio = require('../lib');


describe("Cron.io API", function() {
  describe('Create user', function() {
    it('should error when POSTed an empty hash', function() {
      cronio.users.create({}, function(err, res) {

      });
    });
  });
});
