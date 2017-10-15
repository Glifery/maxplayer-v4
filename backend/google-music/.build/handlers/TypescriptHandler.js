"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GoogleMusicCredentials_1 = require("../domain/GoogleMusicCredentials");
const GoogleMusicGateway_1 = require("../service/GoogleMusicGateway");
const GoogleMusic_1 = require("../service/GoogleMusic");
class TypescriptHandler {
    handle(event, context, callback) {
        const googleMusic = new GoogleMusic_1.GoogleMusic(new GoogleMusicGateway_1.GoogleMusicGateway(new GoogleMusicCredentials_1.GoogleMusicCredentials('moviegraph-test', 'aas_et/AKppINaK8qU6F4980uZY1HjI0ihFDrYuziUXFB9eZKkBci5QMq1SfKxZViWQeddaL8T-WjCjLIYwmLtoEsPVcmH8tGOSA1nPeVun71pHc1ns1Tkydot9u6OEzJOOv_p5agox_u33O0C02MH7wt2Z1jQ=')));
        const query = {
            artist: event.queryStringParameters.artist,
            track: event.queryStringParameters.track,
        };
        googleMusic
            .getTrackStreamUrl(query)
            .then((streamUrl) => {
            const response = {
                statusCode: 200,
                body: JSON.stringify({
                    streamUrl: streamUrl
                })
            };
            callback(null, response);
        })
            .catch((error) => {
            if (error.hasOwnProperty('message')) {
                error = error.message;
            }
            const response = {
                statusCode: 200,
                body: JSON.stringify({
                    error: error
                })
            };
            callback(null, response);
        });
        return null;
    }
}
exports.TypescriptHandler = TypescriptHandler;
