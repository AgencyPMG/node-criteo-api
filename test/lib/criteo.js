/**
 * Criteo Tests
 */
var assert = require('chai').assert;
var Criteo = require('../../lib/criteo');

describe('Criteo', function() {

    var criteo = new Criteo(
        process.env.CRITEO_API_USERNAME,
        process.env.CRITEO_API_PASSWORD,
        process.env.CRITEO_API_TOKEN
    );

    if (!criteo.username) {
        console.warn('Could not run Criteo api tests since environment variables not set');
        return;
    }

    before(function(done) {
        criteo.clientLogin(done);
    });

    describe('#getAccount', function() {
        it('should return an account', function(done) {
            criteo.getAccount((error, account) => {
                if (error) {
                    return done(error);
                }
                assert.isDefined(account.advertiserName);
                assert.isDefined(account.email);
                assert.isDefined(account.country);
                assert.isDefined(account.timezone);
                assert.isDefined(account.currency);
                done();
            });
        });
    });

    describe('#getBudgets', function() {
        it('should return budgets', function(done) {
            criteo.getBudgets({}, done);
        });
    });

    describe('#getCampaigns', function() {
        it('should return campaigns', function(done) {
            criteo.getCampaigns({}, done);
        });
    });

    describe('#getCatalogsNames', function() {
        it('should return catalog names', function(done) {
            criteo.getCatalogsNames(done);
        });
    });

    describe('#getCategories', function() {
        it('should return catalog names', function(done) {
            criteo.getCategories({}, done);
        });
    });

    describe('#getStatisticsLastUpdate', function() {
        it('should return the last statistics update', function(done) {
            criteo.getStatisticsLastUpdate(done);
        });
    });








});
