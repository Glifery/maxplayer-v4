import {HttpRequest} from "../../src/serverless/request/HttpRequest";
import {TrackQuery} from "../../src/google-music/type/TrackQuery";

export class TrackRequest {
    private artist: string;
    private track: string;

    private constructor (artist: string, track: string) {
        this.artist = artist;
        this.track = track;
    }

    public getQuery (): TrackQuery {
        return {
            artist: this.artist,
            track: this.track
        };
    }

    public static createFromHttpRequest (event: HttpRequest): TrackRequest {
        return new TrackRequest(event.queryStringParameters.artist, event.queryStringParameters.track);
    }
}