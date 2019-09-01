import {SearchAllResponse as SpotifyResponse} from "../../src/spotify/type/api/search-all/SearchAllResponse";
import {Artist as SpotifyArtist} from "../../src/spotify/type/common/Artist";
import {Album as SpotifyAlbum} from "../../src/spotify/type/common/Album";
import {Track as SpotifyTrack} from "../../src/spotify/type/common/Track";
import {Artist} from "./Artist";
import {Album} from "./Album";
import {Track} from "./Track";
import {BaseResponse} from "../BaseResponse";
import {Collection} from "./Collection";

export class SearchAllResponse implements BaseResponse {
    private artists: Collection<Artist>;
    private albums: Collection<Album>;
    private tracks: Collection<Track>;

    private constructor (artists: SpotifyArtist[], albums: SpotifyAlbum[], tracks: SpotifyTrack[]) {
        this.artists = new Collection(artists.map((artist: SpotifyArtist) => Artist.createFromSpotify(artist)));
        this.albums = new Collection(albums.map((album: SpotifyAlbum) => Album.createFromSpotify(album)));
        this.tracks = new Collection(tracks.map((track: SpotifyTrack) => Track.createFromSpotify(track)));
    }

    public expose (): {} {
        return {
            artists: this.artists.getElements().map((artist: Artist) => artist.expose()),
            albums: this.albums.getElements().map((album: Album) => album.expose()),
            tracks: this.tracks.getElements().map((track: Track) => track.expose())
        };
    }

    public static createFromSpotify (response: SpotifyResponse): SearchAllResponse {
        return new SearchAllResponse(
            response.body.artists.items,
            response.body.albums.items,
            response.body.tracks.items
        );
    }

    public getArtists(): Collection<Artist> {
        return this.artists;
    }

    public getAlbums(): Collection<Album> {
        return this.albums;
    }

    public getTracks(): Collection<Track> {
        return this.tracks;
    }
}