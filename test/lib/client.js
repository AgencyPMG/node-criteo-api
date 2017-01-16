/**
 * Tests for client
 */

var assert = require('assert');
var Client = require('../../lib/client');

describe('Client', function() {
    var client = new Client(
        process.env.CRITEO_API_USERNAME,
        process.env.CRITEO_API_PASSWORD,
        process.env.CRITEO_API_TOKEN
    );

    before(function(done) {
        if (!client.username) {
            return done();
        }
        client.clientLogin(done);
    });

    describe('#clientLogin', function() {
        if (!client.username) {
            return console.warn('skipping clientLogin test due to no credentials');
        }
        it('should login the client using the proper credentials', function(done) {
            client.clientLogin(done);
        });
    });

    describe('#makeAuthenticatedRequest', function() {
        if (!client.username) {
            return console.warn('skipping makeAuthenticatedRequest test due to no credentials');
        }
        it('should make an authenticated requset', function(done) {
            client.makeAuthenticatedRequest('getAccount', null, done);
        });
        it('should throw an error for a bad error', function(done) {
            client.makeAuthenticatedRequest('BAD_METHOD', null, function(error) {
                return done(!error ? 'it should have thrown an error for no method': null);
            });
        });
    });


    describe('#parseResult', function() {
        it('should return a function', function() {
            assert.strictEqual('function', typeof client.parseResult());
        });

        it('should return an error if an error is passed', function(done) {
            var funct = client.parseResult((error) => {
                done(!error ? 'parseResult Should have errored' : null);
            });
            funct({error: true});
        });
        it('should return a string if passed', function(done) {
            var funct = client.parseResult(done);
            funct(null, 'test');
        });
        it('should return an object', function(done) {
            var funct = client.parseResult(done);
            funct(null, {result: true});
        });
        it('should return an object if more than one key exists', function(done) {
            var funct = client.parseResult(done);
            funct(null, {result: true, test: true});
        });
    });

    describe('#getSoapClientWithAuthentication', function() {
        it('should return if client already has client and session', function(done) {
            var c = new Client();
            c.session = 123;
            c.client = {client: true};
            c.getSoapClientWithAuthentication(done);
        });
    });

    describe('#getWsdlUrl', function() {
        it('should return a url', function() {
            assert.strictEqual(
                'https://advertising.criteo.com/API/v201305/AdvertiserService.asmx?WSDL',
                client.getWsdlUrl()
            );
        });
    });

    describe('#getSoapClient', function() {
        it ('should return a client if one is already created', function(done) {
            var c = new Client();
            c.client = {client: true};
            c.getSoapClient(done);
        });
        it('should return a client', function(done) {
            client.getSoapClient(done);
        });
        it('should return an error for a bad version', function(done) {
            var c = new Client();
            c.version = 'badversion';
            c.getSoapClient(function(error) {
                return done(!error ? 'Should have errored for bad client' : null);
            });
        });
    });

});
