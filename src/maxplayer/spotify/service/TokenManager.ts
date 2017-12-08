import {TokenRepositoryInterface} from "./TokenRepositoryInterface";
import * as SpotifyWebApi from 'spotify-web-api-node';
import {RefreshTokenResponse} from "../type/api/refresh-token/RefreshTokenResponse";
import {AccessToken} from "../type/util/AccessToken";

export class TokenManager {
    private spotify: SpotifyWebApi;
    private repository: TokenRepositoryInterface;

    constructor (spotify: SpotifyWebApi, repository: TokenRepositoryInterface) {
        this.spotify = spotify;
        this.repository = repository;
    }

    public getToken(): Promise<AccessToken> {
        return this.repository
            .getToken()
            .then((accessToken: AccessToken|null) => {
                if (accessToken) {
                    return Promise.resolve(accessToken);
                }

                return this.updateToken();
            })
        ;
    }

    public storeToken(token: AccessToken): Promise<AccessToken> {
        return this.repository.setToken(token);
    }

    public updateToken(): Promise<AccessToken> {
        return this.spotify
            .clientCredentialsGrant()
            .then((res: RefreshTokenResponse) => this.repository.setToken(res.body))
        ;
    };
}