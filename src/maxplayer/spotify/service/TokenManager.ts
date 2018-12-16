import {TokenRepositoryInterface} from "./TokenRepositoryInterface";
import {SpotifyApi} from "../domain/SpotifyApi";
import {RefreshTokenResponse} from "../type/api/refresh-token/RefreshTokenResponse";
import {AccessToken} from "../type/util/AccessToken";

export class TokenManager {
    private SpotifyApi: SpotifyApi;
    private repository: TokenRepositoryInterface;

    constructor (SpotifyApi: SpotifyApi, repository: TokenRepositoryInterface) {
        this.SpotifyApi = SpotifyApi;
        this.repository = repository;
    }

    public getToken(): Promise<AccessToken> {
        return this.repository
            .getToken()
            .then((accessToken: AccessToken|null) => {
                if (accessToken) {
                    console.log('Using existed Spotify access token');

                    return Promise.resolve(accessToken);
                }

                console.log('Updating Spotify access token');

                return this.updateToken();
            })
        ;
    }

    public updateToken(): Promise<AccessToken> {
        return this.SpotifyApi
            .api.clientCredentialsGrant()
            .then((res: RefreshTokenResponse) => this.storeToken(res.body));
    };

    private storeToken(token: AccessToken): Promise<AccessToken> {
        return this.repository.setToken(token);
    }
}