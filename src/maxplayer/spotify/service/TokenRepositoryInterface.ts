import {AccessToken} from "../type/util/AccessToken";

export interface TokenRepositoryInterface {
    getToken(): Promise<AccessToken|null>;

    setToken(token: AccessToken): Promise<AccessToken>;
}