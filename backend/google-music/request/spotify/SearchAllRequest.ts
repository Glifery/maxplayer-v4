import {HttpRequest} from "../../src/serverless/request/HttpRequest";
import {SearchAllRequest as SpotifyRequest} from "../../src/spotify/type/api/search-all/SearchAllRequest";
import {Options} from "../../src/spotify/type/common/Options";

export class SearchAllRequest {
    private query: string;

    private constructor (query) {
        this.query = query;
    }

    public getQuery (): SpotifyRequest {
        return this.query;
    }

    public getSearchedTypes (): string[] {
        return ['artist', 'album', 'track'];
    }

    public getOptions (): Options {
        return {
            limit: 5
        };
    }

    public static createFromHttpRequest (event: HttpRequest): SearchAllRequest {
        return new SearchAllRequest(event.queryStringParameters.q);
    }
}