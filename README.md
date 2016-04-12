# node-criteo-js
Node Api for Criteo

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
    source: 'node-criteo-api',
    version: 'v201305'
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
