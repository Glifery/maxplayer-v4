import {TrackResult} from "../../src/google-music/type/TrackResult";
import {BaseResponse} from "../BaseResponse";

export class TrackResponse implements BaseResponse {
    private artist: string;
    private track: string;
    private streamUrl: string;

    private constructor (artist: string, track: string, streamUrl: string) {
        this.artist = artist;
        this.track = track;
        this.streamUrl = streamUrl;
    }

    public expose (): {} {
        return {
            artist: this.artist,
            track: this.track,
            streamUrl: this.streamUrl
        };
    }

    public static createFromGoogleMusic (result: TrackResult): TrackResponse {
        return new TrackResponse(
            result.artist,
            result.track,
            result.streamUrl
        );
    }
}