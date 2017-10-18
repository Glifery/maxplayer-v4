export type Song = {
    type: string,
    track: {
        title: string,
        artist: string,
        album: string,
        year: number,
        trackNumber: number,
        genre: string,
        durationMillis: number,
        storeId: string,
        albumId: number,
        artistId: string[],
        nid: string
    },
    best_result: boolean,
    navigational_result: boolean
};