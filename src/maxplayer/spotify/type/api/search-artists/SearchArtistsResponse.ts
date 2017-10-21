import {Artist} from "../../common/Artist";
import {Headers} from "../../common/Headers";

export type SearchArtistsResponse = {
    body: {
        artists: {
            items: Artist[],
            limit: number,
            next: string,
            offset: number,
            previous: string,
            total: number
        }
    },
    headers: Headers,
    statusCode: number
};