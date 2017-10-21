import {Context, Callback} from "aws-lambda";
import {HandlerInterface} from "../src/serverless/HandlerInterface";
import {HttpResponse} from "../src/serverless/response/HttpResponse";
import * as SpotifyWebApi from 'spotify-web-api-node';
import {SearchArtistsRequest} from "../src/spotify/type/api/search-artists/SearchArtistsRequest";
import {SearchArtistsResponse} from "../src/spotify/type/api/search-artists/SearchArtistsResponse";
import {Artist} from "../src/spotify/type/common/Artist";

export class SpotifyHandler implements HandlerInterface {
    handle (event: any, context: Context, callback: Callback): null {
        let spotify = new SpotifyWebApi();

        spotify.setAccessToken('BQCNqsB8riNPtyF_m4vuk96_M_15XL_gaalRpmuVdVV2es7X_CG8Um5TGSL2pejLR4GH67x84AHTA4r36PBv9w');

        let artist: SearchArtistsRequest = event.queryStringParameters.artist;

        spotify.searchArtists(artist)
            .then((data: SearchArtistsResponse) => {
                console.log('User playlists', data.body.artists);
                console.log(data.body.artists.items[0]);

                return Promise.resolve(data.body.artists.items[0]);
            })
            .then((artist: Artist|null) => {
                const response: HttpResponse = {
                    statusCode: 200,
                    body: JSON.stringify(artist)
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