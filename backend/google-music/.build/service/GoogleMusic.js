"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GoogleMusic {
    constructor(gateway) {
        this.gateway = gateway;
    }
    initGatewayRequest() {
        if (!this.requestEntryPoint) {
            this.requestEntryPoint = this.gateway.init();
        }
        return this.requestEntryPoint;
    }
    getTrackStreamUrl(query) {
        let queryString = query.track + ' - ' + query.artist;
        let queryArtist = query.artist.toLowerCase();
        let queryTrack = query.track.toLowerCase();
        return this
            .initGatewayRequest()
            .then(() => this.gateway.search(queryString))
            .then((entries) => {
            let bestCandidate = null;
            for (let index in entries) {
                let entry = entries[index];
                if ('1' !== entry.type) {
                    continue;
                }
                let entryArtist = entry.track.artist.toLowerCase();
                let entryTrack = entry.track.title.toLowerCase();
                if ((entryTrack === queryTrack) && (entryArtist === queryArtist)) {
                    console.log(`Found exact track #${index + 1}: '${entry.track.artist} - ${entry.track.title}'`);
                    return Promise.resolve(entry);
                }
                else if ((null === bestCandidate) && (entryTrack === queryTrack)) {
                    bestCandidate = entry;
                }
                else if ((null === bestCandidate) && (0 === entryTrack.indexOf(queryTrack))) {
                    bestCandidate = entry;
                }
            }
            if (null !== bestCandidate) {
                console.log(`Found best candidate: '${bestCandidate.track.artist} - ${bestCandidate.track.title}'`);
                return Promise.resolve(bestCandidate);
            }
            return Promise.reject(`Unable to find track by search query '${queryString}'`);
        })
            .then((song) => this.gateway
            .getStreamUrl(song.track.storeId)
            .then((streamUrl) => {
            let result = {
                artist: song.track.artist,
                track: song.track.title,
                duration: Math.round(song.track.durationMillis * 1000),
                streamUrl: streamUrl
            };
            return result;
        }));
    }
}
exports.GoogleMusic = GoogleMusic;
