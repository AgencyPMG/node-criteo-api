'use strict';
/**
 * NodeJS Client for Criteo
 */

var soap = require('soap');
var _ = require('underscore');

class Client {

    constructor(username, password, token, options) {
        if (!options) {
            options = {};
        }
        this.username = username;
        this.password = password;
        this.token = token;
        this.version = options.version || 'v201305';
        this.source = options.source || 'node-criteo-api';
        this.session = null;
        this.client = null;
    }

    /**
     * Login for the soap api endpoint
     * @access public
     * @param callback {function}
     */
    clientLogin(callback) {
        this.getSoapClient((error, client) => {
            if (error) {
                return callback(error);
            }
            var opts = {
                username: this.username,
                password: this.password,
                source: this.source
            };

            client.clientLogin(opts, (error, response) => {
                if (error || !response.clientLoginResult) {
                    return callback(error || 'Bad Authentication: ' + JSON.stringify(response));
                }
                this.session = response.clientLoginResult;
                callback(null, response);
            });
        });
    }

    /**
     * Makes an authenticated request
     * @access public
     * @param method {string} the method from the wsdl
     * @param options {object} the options for the method
     * @param callback {function} a callback with error and result parameters
     */
    makeAuthenticatedRequest(method, options, callback) {
        this.getSoapClientWithAuthentication((error, client, session) => {
            if (error || !client[method]) {
                return callback(error || 'No Client Method named: ' + method);
            }

            client.clearSoapHeaders();
            client.addSoapHeader({
                apiHeader: {
                    authToken: session,
                    appToken: this.token,
                    clientVersion: this.source
                }
            }, '', 'tns', 'https://advertising.criteo.com/API/' + this.version);

            client[method](options || {}, this.parseResult(callback));
        });
    }

    /**
     * Parses the result for the api
     * @access private
     * @param callback {function}
     */
    parseResult(callback) {
        return (error, response) => {
            if (error) {
                return callback(error);
            }
            if ('object' === typeof response) {
                if (1 === Object.keys(response).length) {
                    var key = _.first(Object.keys(response));
                    return callback(null, response[key]);
                }
            }
            return callback(null, response);
        }

    }

    /**
     * Gets a SOAP client and also authenticates the user
     * @param callback {function}
     */
    getSoapClientWithAuthentication(callback) {
        if (this.client && this.session) {
            return callback(null, this.client, this.session);
        }
        this.clientLogin((error, session) => {
            if (error) {
                return callback(error);
            }
            return callback(null, this.client, this.session);
        });
    }

    /**
     * Gets a soap client
     * @param callback {function}
     * @access private
     */
    getSoapClient(callback) {
        if (this.client) {
            return callback(null, this.client);
        }
        soap.createClient(this.getWsdlUrl(), {forceSoap12Headers: true}, (error, client) => {
            if (error) {
                return callback(error);
            }
            this.client = client;
            return callback(null, this.client);
        });
    }

    /**
     * Gets the wsdl url
     * @access protected
     * @return {string} the url of the wsdl including version
     */
    getWsdlUrl() {
        return 'https://advertising.criteo.com/API/'+this.version+'/AdvertiserService.asmx?WSDL';
    }


}

module.exports = Client;
