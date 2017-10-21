'use strict';

/**
 * node refresh-token --clientId=12345 --clientSecret=4321
 */

let SpotifyWebApi = require('spotify-web-api-node');

let args = process.argv.slice(2);

let clientId = args[0];
let clientSecret = args[1];

clientId = clientId.replace('--clientId=', '');
clientSecret = clientSecret.replace('--clientSecret=', '');

let spotifyApi = new SpotifyWebApi({
    clientId : clientId,
    clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
    .then(function(data) {
        console.log('The access token is: ' + data.body['access_token']);
        console.log('The access token expires in ' + data.body['expires_in']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
        console.log('Something went wrong when retrieving an access token', err);
    })
;