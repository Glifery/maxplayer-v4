import {Track as SpotifyTrack} from "../../src/spotify/type/common/Track";
import {Artist} from "./Artist";
import {Album} from "./Album";
import {BaseResponse} from "../BaseResponse";

export class Track implements BaseResponse {
    private track: SpotifyTrack;
    private artist: Artist|null;
    private album: Album|null;

    private constructor (track: SpotifyTrack) {
        this.track = track;
        this.artist = track.artists ? Artist.createFromSpotifyShort(track.artists[0]) : null;
        this.album = track.album ? Album.createFromSpotify(track.album) : null;
    }

    public expose (): {} {
        return {
            id: this.track.id,
            name: this.track.name,
            artist: this.artist ? this.artist.expose(): null,
            album: this.album ? this.album.expose(): null,
            track_number: this.track.track_number,
            popularity: this.track.popularity,
            preview_url: this.track.preview_url,
        };
    }

    public static createFromSpotify (track: SpotifyTrack): Track {
        return new Track(track);
    }
}