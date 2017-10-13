import {GoogleMusicCredentials} from "../domain/GoogleMusicCredentials";
import * as playmusic from 'playmusic';
// declare module 'playmusic';
// declare module '../type/google-music/playmusic';
import {Entries} from "../type/google-music/Entries";
// import PlayMusic = require("../type/google-music/playmusic");
// declare const playmusic: any;

export class GoogleMusicGateway {
    private credentials: GoogleMusicCredentials;
    private playmusic: any;

    constructor (credentials: GoogleMusicCredentials) {
        this.credentials    = credentials;
        this.playmusic      = new playmusic();
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
            this.playmusic.search(query, limit, function(err: any, data: {entries: Entries}) {
                if (err) {
                    reject(err);

                    return;
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