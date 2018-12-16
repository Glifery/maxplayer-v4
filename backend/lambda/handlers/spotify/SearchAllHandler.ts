import {HttpRequest} from "../../src/serverless/request/HttpRequest";
import {SpotifyApi} from "../../src/spotify/domain/SpotifyApi";
import {SearchAllRequest} from "../../request/spotify/SearchAllRequest";
import {SearchAllResponse} from "../../response/spotify/SearchAllResponse";
import {SearchAllResponse as SpotifyResponse} from "../../src/spotify/type/api/search-all/SearchAllResponse";
import {BaseResponse} from "../../response/BaseResponse";
import {BaseSpotifyHandler} from "./BaseSpotifyHandler";

/**
 * Example
 *
 * localhost:3000/spotify/search-all?q=Abba
 */
export class SearchAllHandler extends BaseSpotifyHandler {
    handleRequest (event: HttpRequest, spotify: SpotifyApi): Promise<BaseResponse> {
        const request: SearchAllRequest = SearchAllRequest.createFromHttpRequest(event);

        console.log(`Doing search on 'query: ${request.getQuery()}' ->`);

        return spotify.api
            .search(request.getQuery(), request.getSearchedTypes(), request.getOptions())
            .then((data: SpotifyResponse) => {
                console.log('Got response from Spotify --->', data.body);

                return Promise.resolve(SearchAllResponse.createFromSpotify(data));
            })
        ;
    }
}