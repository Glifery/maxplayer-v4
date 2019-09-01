import {Artist} from "./Artist";
import {Album} from "./Album";
import {Track} from "./Track";

export type SearchResult = {
    artists: Artist[],
    albums: Album[],
    tracks: Track[]
}