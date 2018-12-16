import {GoogleMusicCredentials} from "../domain/GoogleMusicCredentials";
import PlayMusic, * as pm from "playmusic";
import {Entries} from "../type/Entries";

export class GoogleMusicGateway {
    private credentials: GoogleMusicCredentials;
    private playmusic: PlayMusic;

    constructor (credentials: GoogleMusicCredentials) {
        this.credentials    = credentials;
        this.playmusic      = new pm();
    }

    init (): Promise<null> {
        let credentials = {
            androidId: this.credentials.androidId,
            masterToken: this.credentials.masterToken
        };

        return new Promise((resolve, reject) => {
            this.playmusic.init(credentials, (err: any) => {
                if (err) {
                    reject(err);

                    return;
                }

                resolve(null);
            });
        });
    }

    search (query: string, limit: number = 5): Promise<Entries> {
        return new Promise((resolve, reject) => {
            this.playmusic.search(query, limit, function(err: any, data: {entries: Entries, kink: string, suggestedQuery: string}) {
                if (err) {
                    reject(err);

                    return;
                }

                console.log(`Search by ${query} results:`);
                for (let index in data.entries) {
                    let entry: any = data.entries[index];

                    if (entry.hasOwnProperty('artist')) {
                        console.log(`- Artist: ${entry.artist.name}`);
                    } else if (entry.hasOwnProperty('album')) {
                        console.log(`- Album: ${entry.album.name} (${entry.album.artist})`);
                    } else if (entry.hasOwnProperty('track')) {
                        console.log(`- Track: ${entry.track.title} (${entry.track.artist})`);
                    } else if (entry.hasOwnProperty('playlist')) {
                        console.log(`- Playlist: ${entry.playlist.name}`);
                    } else if (entry.hasOwnProperty('station')) {
                        console.log(`- Station: ${entry.station.name}`);
                    } else {
                        console.log(entry);
                    }
                }

                resolve(data.entries);
            });
        });
    }

    getStreamUrl (storeId: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.playmusic.getStreamUrl(storeId, function(err: any, streamUrl: string) {
                if (err) {
                    reject(err);

                    return;
                }

                resolve(streamUrl);
            });
        })
    }
}