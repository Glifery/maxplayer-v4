import {Context, Callback} from "aws-lambda";
import {HttpResponse} from "../../src/serverless/response/HttpResponse";
import {HttpRequest} from "../../src/serverless/request/HttpRequest";
import * as SpotifyWebApi from 'spotify-web-api-node';
import {SearchAllRequest} from "../../request/spotify/SearchAllRequest";
import {SearchAllResponse} from "../../response/spotify/SearchAllResponse";
import {SearchAllResponse as SpotifyResponse} from "../../src/spotify/type/api/search-all/SearchAllResponse";
import {BaseHandler} from "../BaseHandler";
import {DynamoDbTokenRepository} from "../../service/DynamoDbTokenRepository";
import {AccessToken} from "../../src/spotify/type/util/AccessToken";
import {TokenManager} from "../../src/spotify/service/TokenManager";
import {BaseResponse} from "../../response/BaseResponse";

/**
 * http://localhost:3000/googlemusic/spotify/search-all?q=Эпидемия
 */
export abstract class BaseSpotifyHandler extends BaseHandler {
    abstract handleRequest (event: HttpRequest, spotify: SpotifyWebApi): Promise<BaseResponse>;

    handle (event: HttpRequest, context: Context, callback: Callback): null {
        const tokenManager = new TokenManager(
            new SpotifyWebApi({
                clientId : process.env.spotify_client_id,
                clientSecret : process.env.spotify_client_secret
            }),
            new DynamoDbTokenRepository(
                this.prepareDynamoDbInstance(),
                {
                    tableName: 'spotifyAccessToken',
                    primaryKey: 'spotifyAccessToken'
                }
            )
        );
        const spotify = new SpotifyWebApi();

        tokenManager
            .getToken()
            .then((token: AccessToken) => {
                spotify.setAccessToken(token.access_token);

                return this.handleRequest(event, spotify);
            })
            .then((result: BaseResponse) => {
                const response: HttpResponse = {
                    statusCode: 200,
                    body: JSON.stringify(result.expose())
                };

                callback(null, response);
            })
            .catch((error: any) => {
                if (error.hasOwnProperty('statusCode') && error.statusCode == 401) {
                    error = 'Unauthorized: update access token by calling \'https://accounts.spotify.com/api/token\' with \'Basic XXXX\' bearer';
                }

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

                callback(error, response);
            })
        ;

        return null;
    }
}