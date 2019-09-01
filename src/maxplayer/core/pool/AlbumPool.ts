import {Album} from "../domain/Album";
import {Collection} from "../domain/Collection";
import {Album as AlbumType} from "../gateway/type/Album";

export class AlbumPool {
    public createFromCollectionResponse(collectionResponse: AlbumType[]): Collection<Album> {
        const that: AlbumPool = this;

        return new Collection<Album>(collectionResponse.map(function (album: AlbumType) {
            return that.createFromResponse(album);
        }));
    }

    public createFromResponse(albumType: AlbumType): Album {
        const album: Album = new Album();

        return album;
    }
}