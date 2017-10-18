export class GoogleMusicCredentials {
    private _androidId: string;

    private _masterToken: string;

    constructor (androidId: string, masterToken: string) {
        this._androidId      = androidId;
        this._masterToken    = masterToken;
    }

    get androidId (): string {
        return this._androidId;
    }

    get masterToken (): string {
        return this._masterToken;
    }
}