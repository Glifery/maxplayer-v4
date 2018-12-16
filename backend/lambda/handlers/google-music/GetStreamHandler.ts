import {Context, Callback} from "aws-lambda";
import {HandlerInterface} from "../../src/serverless/HandlerInterface";
import {HttpResponse} from "../../src/serverless/response/HttpResponse";
import {GoogleMusicCredentials} from "../../src/google-music/domain/GoogleMusicCredentials";
import {GoogleMusicGateway} from "../../src/google-music/service/GoogleMusicGateway";
import {GoogleMusic} from "../../src/google-music/service/GoogleMusic";
import {TrackResult} from "../../src/google-music/type/TrackResult";
import {TrackRequest} from "../../request/google-music/TrackRequest";
import {TrackResponse} from "../../response/google-music/TrackResponse";

/**
 * Example
 *
 * localhost:3000/spotify/search-all?q=Abba
 */
export class GetStreamHandler implements HandlerInterface {
    handle (event: any, context: Context, callback?: Callback): null {
        if (!process.env.google_android_id || !process.env.google_master_token) {
            throw new Error('Either \'google_android_id\' or \'google_master_token\' parameter is empty');
        }

        const googleMusic = new GoogleMusic(
            new GoogleMusicGateway(
                new GoogleMusicCredentials(
                    process.env.google_android_id,
                    process.env.google_master_token
                )
            )
        );

        const request: TrackRequest = TrackRequest.createFromHttpRequest(event);

        googleMusic
            .getTrackStreamUrl(request.getQuery())
            .then((result: TrackResult) => {
                console.log('Got result from Google Music --->', result);

                return Promise.resolve(TrackResponse.createFromGoogleMusic(result));
            })
            .then((result: TrackResponse) => {
                const response: HttpResponse = {
                    statusCode: 200,
                    body: JSON.stringify(result.expose())
                };

                if (callback) {
                    callback(null, response);
                }
            })
            .catch((error: any) => {
                console.log('ERROR!!!!!!!!!!');
                console.log(error);

                if (error.hasOwnProperty('message')) {
                    error = error.message;
                }

                const response: HttpResponse = {
                    statusCode: 200,
                    body: JSON.stringify({
                        error: error
                    })
                };

                if (callback) {
                    callback(error, response);
                }
            })
        ;

        return null;
    }
}