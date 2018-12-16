import {Context, Callback} from "aws-lambda";
import {HttpResponse} from "../../src/serverless/response/HttpResponse";
import {HttpRequest} from "../../src/serverless/request/HttpRequest";
import {SpotifyApi} from "../../src/spotify/domain/SpotifyApi";
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
    abstract handleRequest (event: HttpRequest, spotify: SpotifyApi): Promise<BaseResponse>;

    handle (event: HttpRequest, context: Context, callback?: Callback): null {
        if (!process.env.spotify_client_id || !process.env.spotify_client_secret) {
            throw new Error('Either \'spotify_client_id\' or \'spotify_client_secret\' parameter is empty');
        }

        const spotifyApi = new SpotifyApi(
            process.env.spotify_client_id,
            process.env.spotify_client_secret
        );

        const tokenManager = new TokenManager(
            spotifyApi,
            new DynamoDbTokenRepository(
                this.prepareDynamoDbInstance(),
                {
                    tableName: 'spotifyAccessToken',
                    primaryKey: 'spotifyAccessToken'
                }
            )
        );

        tokenManager
            .getToken()
            .then((token: AccessToken) => {
                spotifyApi.api.setAccessToken(token.access_token);

                return this.handleRequest(event, spotifyApi);
            })
            .then((result: BaseResponse) => {
                const response: HttpResponse = {
                    statusCode: 200,
                    body: JSON.stringify(result.expose())
                };

                if (callback) {
                    callback(null, response);
                }
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

                if (callback) {
                    callback(error, response);
                }
            })
        ;

        return null;
    }
}