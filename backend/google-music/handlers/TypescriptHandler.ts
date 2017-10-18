import {Context, Callback} from "aws-lambda";
import {HandlerInterface} from "../src/serverless/HandlerInterface";
import {HttpResponse} from "../src/serverless/response/HttpResponse";
import {GoogleMusicCredentials} from "../src/google-music/domain/GoogleMusicCredentials";
import {GoogleMusicGateway} from "../src/google-music/service/GoogleMusicGateway";
import {GoogleMusic} from "../src/google-music/service/GoogleMusic";
import {TrackQuery} from "../src/google-music/type/TrackQuery";
import {TrackResult} from "../src/google-music/type/TrackResult";

export class TypescriptHandler implements HandlerInterface {
    handle (event: any, context: Context, callback: Callback): null {
        const googleMusic = new GoogleMusic(
            new GoogleMusicGateway(
                new GoogleMusicCredentials(
                    'moviegraph-test',
                    'aas_et/AKppINaK8qU6F4980uZY1HjI0ihFDrYuziUXFB9eZKkBci5QMq1SfKxZViWQeddaL8T-WjCjLIYwmLtoEsPVcmH8tGOSA1nPeVun71pHc1ns1Tkydot9u6OEzJOOv_p5agox_u33O0C02MH7wt2Z1jQ='
                )
            )
        );

        const query: TrackQuery = {
            artist: event.queryStringParameters.artist,
            track: event.queryStringParameters.track,
        };

        googleMusic
            .getTrackStreamUrl(query)
            .then((result: TrackResult) => {
                const response: HttpResponse = {
                    statusCode: 200,
                    body: JSON.stringify({
                        artist: result.artist,
                        track: result.track,
                        streamUrl: result.streamUrl
                    })
                };

                callback(null, response);
            })
            .catch((error: any) => {
                if (error.hasOwnProperty('message')) {
                    error = error.message;
                }

                const response: HttpResponse = {
                    statusCode: 200,
                    body: JSON.stringify({
                        error: error
                    })
                };

                callback(null, response);
            })
        ;

        return null;
    }
}