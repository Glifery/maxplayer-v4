import {GoogleMusicGateway} from "./GoogleMusicGateway";
import {Song} from "../type/google-music/Song";
import {Entries} from "../type/google-music/Entries";

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

    getTrackStreamUrl (query: string): Promise<string> {
        return this
            .initGatewayRequest()
            .then(() => this.gateway.search(query))
            .then((entries: Entries) => {
                for (let index in entries) {
                    let entry: Song = entries[index];

                    if (entry.hasOwnProperty('track')) {
                        return Promise.resolve(entry.track.storeId);
                    }
                }

                return Promise.reject(`Unable to find track by search query '${query}'`);
            })
            .then((storeId: string) => this.gateway.getStreamUrl(storeId))
        ;
    }
}