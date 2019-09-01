import {SearchAllGateway} from "../gateway/SearchAllGateway";
import {ArtistPool} from "../pool/ArtistPool";
import {SearchResult} from "../domain/SearchResult";
import {AlbumPool} from "../pool/AlbumPool";
import {TrackPool} from "../pool/TrackPool";
import {SearchResult as SearchResultType} from "../gateway/type/SearchResult";

export class SearchRepository {
    private searchAllGateway: SearchAllGateway;
    private artistPool: ArtistPool;
    private albumPool: AlbumPool;
    private trackPool: TrackPool;

    constructor(searchAllGateway: SearchAllGateway, artistPool: ArtistPool, albumPool: AlbumPool, trackPool: TrackPool) {
        this.searchAllGateway = searchAllGateway;
        this.artistPool = artistPool;
        this.albumPool = albumPool;
        this.trackPool = trackPool;
    }

    public search(query: String): Promise<SearchResult> {
        const artistPool: ArtistPool = this.artistPool;
        const albumPool: AlbumPool = this.albumPool;
        const trackPool: TrackPool = this.trackPool;

        return this.searchAllGateway
            .searchAll(query)
            .then(function (response: SearchResultType) {
                return new SearchResult(
                    artistPool.createFromCollectionResponse(response.artists),
                    albumPool.createFromCollectionResponse(response.albums),
                    trackPool.createFromCollectionResponse(response.tracks)
                );
            });
    }
}