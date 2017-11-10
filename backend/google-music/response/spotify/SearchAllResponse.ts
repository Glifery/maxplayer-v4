import {SearchAllResponse as SpotifyResponse} from "../../src/spotify/type/api/search-all/SearchAllResponse";
import {Artist} from "../../src/spotify/type/common/Artist";
import {Album} from "../../src/spotify/type/common/Album";
import {Track} from "../../src/spotify/type/common/Track";
import {BaseResponse} from "../BaseResponse";

export class SearchAllResponse implements BaseResponse {
    private artists: Artist[];
    private albums: Album[];
    private tracks: Track[];

    private constructor (artists: Artist[], albums: Album[], tracks: Track[]) {
        this.artists = artists;
        this.albums = albums;
        this.tracks = tracks;
    }

    public toString (): string {
        return JSON.stringify({
            artists: {
                count: this.artists.length,
                items: this.artists
            },
            albums: {
                count: this.albums.length,
                items: this.albums
            },
            tracks: {
                count: this.tracks.length,
                items: this.tracks
            }
        });
    }

    public static createFromSpotify (response: SpotifyResponse): SearchAllResponse {
        return new SearchAllResponse(
            response.body.artists.items,
            response.body.albums.items,
            response.body.tracks.items
        );
    }
}