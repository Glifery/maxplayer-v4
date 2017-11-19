import {Artist as SpotifyArtist} from "../../src/spotify/type/common/Artist";
import {Artist as SpotifyShortArtist} from "../../src/spotify/type/common/short/Artist";
import {Image as SpotifyImage} from "../../src/spotify/type/common/Image";
import {Image} from "./Image";
import {BaseResponse} from "../BaseResponse";

export class Artist implements BaseResponse {
    private artist: SpotifyArtist|SpotifyShortArtist;
    private images: Image[]|null;
    private genres: string[];

    private constructor (artist: SpotifyArtist|SpotifyShortArtist) {
        this.artist = artist;
        this.images = [];
        this.genres = [];
    }

    private setImages (images: SpotifyImage[]) {
        this.images = images.map((image: SpotifyImage) => Image.createFromSpotify(image));
    }

    private setGenres (genres: string[]) {
        this.genres = genres;
    }

    public expose (): {} {
        return {
            id: this.artist.id,
            name: this.artist.name,
            genres: this.genres,
            images: this.images ? this.images.map((image: Image) => image.expose()): []
        };
    }

    public static createFromSpotify (artist: SpotifyArtist): Artist {
        let instance = new Artist(artist);

        instance.setImages(artist.images);
        instance.setGenres(artist.genres);

        return instance;
    }


    public static createFromSpotifyShort (artist: SpotifyShortArtist): Artist {
        return new Artist(artist);
    }
}