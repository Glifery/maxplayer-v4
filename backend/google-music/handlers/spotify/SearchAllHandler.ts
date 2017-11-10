import {Context, Callback} from "aws-lambda";
import {HandlerInterface} from "../../src/serverless/HandlerInterface";
import {HttpResponse} from "../../src/serverless/response/HttpResponse";
import {HttpRequest} from "../../src/serverless/request/HttpRequest";
import * as SpotifyWebApi from 'spotify-web-api-node';
import {SearchAllRequest} from "../../request/spotify/SearchAllRequest";
import {SearchAllResponse} from "../../response/spotify/SearchAllResponse";
import {SearchAllResponse as SpotifyResponse} from "../../src/spotify/type/api/search-all/SearchAllResponse";

/**
 * http://localhost:3000/googlemusic/spotify/search-all?q=Эпидемия
 */
export class SearchAllHandler implements HandlerInterface {
    handle (event: HttpRequest, context: Context, callback: Callback): null {
        let spotify = new SpotifyWebApi();

        spotify.setAccessToken('BQCeUPXpTgRHBUfEA40l4LbxpR5XJ4ppPWPs38UfotVvR-AhvjBjZ97yptX3Yhtgjc2_u0-3xov-z9gfYmZbcw');

        let request: SearchAllRequest = SearchAllRequest.createFromHttpRequest(event);

        console.log(`Doing search on 'query: ${request.getQuery()}' ->`);

        spotify.search(request.getQuery(), request.getSearchedTypes(), request.getOptions())
            .then((data: SpotifyResponse) => {
                console.log('Got response from Spotify --->', data.body);

                return Promise.resolve(SearchAllResponse.createFromSpotify(data));
            })
            .then((result: SearchAllResponse) => {
                const response: HttpResponse = {
                    statusCode: 200,
                    body: result.toString()
                };

                callback(null, response);
            })
            .catch((error: any) => {
                if (error.hasOwnProperty('statusCode') && error.statusCode == 401) {
                    error = 'Unauthorized: update access token by calling \'https://accounts.spotify.com/api/token\' with \'Basic XXXX\' bearer';
                }

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