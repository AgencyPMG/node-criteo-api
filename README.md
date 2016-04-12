# Criteo Node SDK
Node Api for Criteo
[![Build Status](https://travis-ci.org/AgencyPMG/node-criteo-api.svg?branch=master)](https://travis-ci.org/AgencyPMG/node-criteo-api) [![Coverage Status](https://coveralls.io/repos/github/AgencyPMG/node-criteo-api/badge.svg?branch=master)](https://coveralls.io/github/AgencyPMG/node-criteo-api?branch=master)

## Installation
```
npm install node-criteo-api
```

## Usage
You will need a username/password + token to use the api
```js
var Criteo = require('node-criteo-api');
var client = new Criteo(username, password, token);


client.getCampaigns({campaignStatus: 'RUNNING'}, (error, campaigns) => {
    console.log(error, campaigns);
});
```

## Options
You can also specify options as a fourth parameter
```js
var client = new Criteo(username, password, token, {
    source: 'node-criteo-api', //the "source" parameter, the criteo "user agent"
    version: 'v201305' //the version of the api
});
```

## Testing
To run the tests, you need to set some environmental variables. Only about
10% of the tests will run without the following environmental variables
```
CRITEO_API_USERNAME,
CRITEO_API_PASSWORD,
CRITEO_API_TOKEN
```

then run

```
npm test
```
