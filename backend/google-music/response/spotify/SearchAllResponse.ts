import {SearchAllResponse as SpotifyResponse} from "../../src/spotify/type/api/search-all/SearchAllResponse";
import {Artist as SpotifyArtist} from "../../src/spotify/type/common/Artist";
import {Album as SpotifyAlbum} from "../../src/spotify/type/common/Album";
import {Track as SpotifyTrack} from "../../src/spotify/type/common/Track";
import {Artist} from "./Artist";
import {Album} from "./Album";
import {Track} from "./Track";
import {BaseResponse} from "../BaseResponse";

export class SearchAllResponse implements BaseResponse {
    private artists: Artist[];
    private albums: Album[];
    private tracks: Track[];

    private constructor (artists: SpotifyArtist[], albums: SpotifyAlbum[], tracks: SpotifyTrack[]) {
        this.artists = artists.map((artist: SpotifyArtist) => Artist.createFromSpotify(artist));
        this.albums = albums.map((album: SpotifyAlbum) => Album.createFromSpotify(album));
        this.tracks = tracks.map((track: SpotifyTrack) => Track.createFromSpotify(track));
    }

    public expose (): {} {
        return {
            artists: this.artists.map((artist: Artist) => artist.expose()),
            albums: this.albums.map((album: Album) => album.expose()),
            tracks: this.tracks.map((track: Track) => track.expose())
        };
    }

    public static createFromSpotify (response: SpotifyResponse): SearchAllResponse {
        return new SearchAllResponse(
            response.body.artists.items,
            response.body.albums.items,
            response.body.tracks.items
        );
    }
}