import * as SpotifyWebApi from 'spotify-web-api-node';

export class SpotifyApi {
    private _spotifyWebApi: SpotifyWebApi;

    constructor (clientId: string, clientSecret: string) {
        this._spotifyWebApi = new SpotifyWebApi({
            clientId : clientId,
            clientSecret : clientSecret
        })
    }

    get api(): SpotifyWebApi {
        return this._spotifyWebApi;
    }
}