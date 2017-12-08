import {Artist} from "../../common/Artist";
import {Album} from "../../common/Album";
import {Track} from "../../common/Track";
import {Headers} from "../../common/Headers";
import {AccessToken} from "../../util/AccessToken";

export type RefreshTokenResponse = {
    body: AccessToken,
    headers: Headers,
    statusCode: number
};