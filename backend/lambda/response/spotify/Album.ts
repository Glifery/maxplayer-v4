import {Artist as SpotifyShortArtist} from "../../src/spotify/type/common/short/Artist";
import {Album as SpotifyAlbum} from "../../src/spotify/type/common/Album";
import {Image as SpotifyImage} from "../../src/spotify/type/common/Image";
import {Artist} from "./Artist";
import {Image} from "./Image";
import {BaseResponse} from "../BaseResponse";

export class Album implements BaseResponse {
    private album: SpotifyAlbum;
    private artists: Artist[];
    private images: Image[];

    private constructor (album: SpotifyAlbum) {
        this.album = album;
        this.artists = album.artists.map((artist: SpotifyShortArtist) => Artist.createFromSpotifyShort(artist));
        this.images = album.images.map((image: SpotifyImage) => Image.createFromSpotify(image));
    }

    public expose (): {} {
        return {
            id: this.album.id,
            name: this.album.name,
            artists: this.artists.map((artist: Artist) => artist.expose()),
            type: this.album.type,
            images: this.images.map((image: Image) => image.expose())
        };
    }

    public static createFromSpotify (album: SpotifyAlbum): Album {
        return new Album(album);
    }
}