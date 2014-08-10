google-civic-info
======

Wrapper for [Google Civic Information API](https://developers.google.com/civic-information/)

This API allows you to access information about both Elections and Representatives

## Installation
```
$ npm install google-civic-info
```
===
##Creating a GCI Instance
Provide an apiKey to create a GCI instance.
```javascript
var gci = require('google-civic-info')({
  apiKey: 'YOUR_API_KEY
});
```
===
##Get Representatives
This function allows you to retrieve a list of representatives for a given
address or division ([more_info](https://developers.google.com/civic-information/docs/v1/representatives/representativeInfoQuery)).
####```getRepresentatives(address, config, callback)```

Retrieve representatives based on an address string:
```javascript
gci.getRepresentatives('2300 Webster St Oakland, CA 94612', function (err, data) {
  //Do something here
});
```

Retrieve respresenatives based on a division (```ocdId```) rather than ```address```:
```javascript
gci.getRepresentatives({
  includeOffices: true,
  ocdId: 'ocd-division/country:us/state:ca/place:oakland',
  recursive: true
}, function (err, data) {
  //Do something here
});
```



Sample ```data``` object:
```javascript
{
  "kind": "civicinfo#representativeInfoResponse",
  "status": "success",
  "normalizedInput": {
    "line1": "2300 webster st",
    "city": "oakland",
    "state": "CA",
    "zip": "94612"
  },
  "divisions":  [Object],
  "offices":    [Object],
  "officials":  [Object]
}
```
