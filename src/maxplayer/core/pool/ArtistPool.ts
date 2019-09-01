import {Artist} from "../domain/Artist";
import {Collection} from "../domain/Collection";
import {Artist as ArtistType} from "../gateway/type/Artist";

export class ArtistPool {
    public createFromCollectionResponse(collectionResponse: ArtistType[]): Collection<Artist> {
        const that: ArtistPool = this;

        return new Collection<Artist>(collectionResponse.map(function (artist: ArtistType) {
            return that.createFromResponse(artist);
        }));
    }

    public createFromResponse(artistType: ArtistType): Artist {
        const artist: Artist = new Artist();

        return artist;
    }
}