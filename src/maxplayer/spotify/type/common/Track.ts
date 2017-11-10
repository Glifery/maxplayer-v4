import {Artist} from "./short/Artist";
import {Album} from "./Album";

export type Track = {
    albums: Album[],
    artists: Artist[],
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids: any,
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    name: string,
    popularity: number,
    preview_url: string,
    track_number: number,
    type: string,
    uri: string
};