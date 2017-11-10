import {Artist} from "../../common/Artist";
import {Album} from "../../common/Album";
import {Track} from "../../common/Track";
import {Headers} from "../../common/Headers";

export type SearchAllResponse = {
    body: {
        artists: {
            items: Artist[],
            limit: number,
            next: string,
            offset: number,
            previous: string,
            total: number
        },
        albums: {
            items: Album[],
            limit: number,
            next: string,
            offset: number,
            previous: string,
            total: number
        },
        tracks: {
            items: Track[],
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