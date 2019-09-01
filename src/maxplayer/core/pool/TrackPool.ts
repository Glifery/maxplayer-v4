import {Track} from "../domain/Track";
import {Collection} from "../domain/Collection";
import {Track as TrackType} from "../gateway/type/Track";

export class TrackPool {
    public createFromCollectionResponse(collectionResponse: TrackType[]): Collection<Track> {
        const that: TrackPool = this;

        return new Collection<Track>(collectionResponse.map(function (track: TrackType) {
            return that.createFromResponse(track);
        }));
    }

    public createFromResponse(trackType: TrackType): Track {
        const track: Track = new Track();

        return track;
    }
}