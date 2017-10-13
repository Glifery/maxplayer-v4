import {Handler, Context, Callback, HandlerHttpResponse} from '../utils/Handler';
import {GoogleMusicCredentials} from "../domain/GoogleMusicCredentials";
import {GoogleMusicGateway} from "../service/GoogleMusicGateway";
import {GoogleMusic} from "../service/GoogleMusic";

export class TypescriptHandler implements Handler {
    handle (event: any, context: Context, callback: Callback): null {
        const googleMusic = new GoogleMusic(
            new GoogleMusicGateway(
                new GoogleMusicCredentials(
                'moviegraph-test',
                'aas_et/AKppINaK8qU6F4980uZY1HjI0ihFDrYuziUXFB9eZKkBci5QMq1SfKxZViWQeddaL8T-WjCjLIYwmLtoEsPVcmH8tGOSA1nPeVun71pHc1ns1Tkydot9u6OEzJOOv_p5agox_u33O0C02MH7wt2Z1jQ='
                )
            )
        );

        const query: string = event.queryStringParameters.q;

        googleMusic
            .getTrackStreamUrl(query)
            .then((streamUrl: string) => {
                const response: HandlerHttpResponse = {
                    statusCode: 200,
                    body: JSON.stringify({
                        streamUrl: streamUrl
                    })
                };

                callback(null, response);
            })
            .catch((error: any) => {
                if (error.hasOwnProperty('message')) {
                    error = error.message;
                }

                const response: HandlerHttpResponse = {
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