import {Context, Callback} from "aws-lambda";
import {HttpResponse} from "../../src/serverless/response/HttpResponse";
import {HttpRequest} from "../../src/serverless/request/HttpRequest";
import {SpotifyApi} from "../../src/spotify/domain/SpotifyApi";
import {TokenManager} from "../../src/spotify/service/TokenManager";
import {DynamoDbTokenRepository} from "../../service/DynamoDbTokenRepository";
import {AccessToken} from "../../src/spotify/type/util/AccessToken";
import {BaseHandler} from "../BaseHandler";

/**
 * sls invoke local -f spotifyRefreshToken
 */
export class RefreshTokenHandler extends BaseHandler {
    handle (event: HttpRequest, context: Context, callback?: Callback): null {
        if (!process.env.spotify_client_id || !process.env.spotify_client_secret) {
            throw new Error('Either \'spotify_client_id\' or \'spotify_client_secret\' parameter is empty');
        }

        const tokenManager = new TokenManager(
            new SpotifyApi(
                process.env.spotify_client_id,
                process.env.spotify_client_secret
            ),
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
                console.log('Token updated:', token);

                const response: HttpResponse = {
                    statusCode: 200,
                    body: `The token have been successfully updated`
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
