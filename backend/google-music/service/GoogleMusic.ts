import {GoogleMusicGateway} from "./GoogleMusicGateway";
import {Song} from "../type/google-music/Song";
import {Entries} from "../type/google-music/Entries";
import {TrackQuery} from "../type/google-music/TrackQuery";
import {TrackResult} from "../type/google-music/TrackResult";

export class GoogleMusic {
    private gateway: GoogleMusicGateway;
    private requestEntryPoint: Promise<null>;

    constructor (gateway: GoogleMusicGateway) {
        this.gateway = gateway;
    }

    private initGatewayRequest (): Promise<null> {
        if (!this.requestEntryPoint) {
            this.requestEntryPoint = this.gateway.init();
        }

        return this.requestEntryPoint;
    }

    getTrackStreamUrl (query: TrackQuery): Promise<TrackResult> {
        let queryString: string     = query.track + ' - ' + query.artist;
        let queryArtist: string     = query.artist.toLowerCase();
        let queryTrack: string      = query.track.toLowerCase();

        return this
            .initGatewayRequest()
            .then(() => this.gateway.search(queryString))
            .then((entries: Entries) => {
                let bestCandidate: Song|null = null;

                for (let index in entries) {
                    let entry: Song = entries[index];

                    if ('1' !== entry.type) {
                        continue;
                    }

                    let entryArtist: string = entry.track.artist.toLowerCase();
                    let entryTrack: string  = entry.track.title.toLowerCase();

                    if ((entryTrack === queryTrack) && (entryArtist === queryArtist)) {
                        console.log(`Found exact track #${index+1}: '${entry.track.artist} - ${entry.track.title}'`);

                        return Promise.resolve(entry);
                    } else if ((null === bestCandidate) && (entryTrack === queryTrack)) {
                        bestCandidate = entry;
                    } else if ((null === bestCandidate) && (0 === entryTrack.indexOf(queryTrack))) {
                        bestCandidate = entry;
                    }
                }

                if (null !== bestCandidate) {
                    console.log(`Found best candidate: '${bestCandidate.track.artist} - ${bestCandidate.track.title}'`);

                    return Promise.resolve(bestCandidate);
                }

                return Promise.reject(`Unable to find track by search query '${queryString}'`);
            })
            .then((song: Song) => this.gateway
                .getStreamUrl(song.track.storeId)
                .then((streamUrl: string) => {
                    let result: TrackResult = {
                        artist: song.track.artist,
                        track: song.track.title,
                        duration: Math.round(song.track.durationMillis * 1000),
                        streamUrl: streamUrl
                    };

                    return result;
                })
             )
        ;
    }
}