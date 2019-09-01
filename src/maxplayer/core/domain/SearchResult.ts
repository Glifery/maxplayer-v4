import {Collection} from "./Collection";
import {Artist} from "./Artist";
import {Album} from "./Album";
import {Track} from "./Track";

export class SearchResult {
    private artists: Collection<Artist>;
    private albums: Collection<Album>;
    private tracks: Collection<Track>;

    public constructor(artists: Collection<Artist>, albums: Collection<Album>, tracks: Collection<Track>) {
        this.artists = artists;
        this.albums = albums;
        this.tracks = tracks;
    }

    public getArtists(): Collection<Artist> {
        return this.artists;
    }
}