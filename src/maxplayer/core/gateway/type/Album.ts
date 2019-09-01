import {Image} from "./Image";

export type Album = {
    id: string,
    name: string,
    artists: string[],
    type: string,
    images: Image[]
}