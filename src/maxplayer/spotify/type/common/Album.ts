import {Image} from "./Image";
import {Artist} from "./short/Artist";

export type Album = {
    album_type: string,
    artists: Artist[],
    available_markets: string[],
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    images: Image[],
    name: string,
    type: string,
    uri: string
};