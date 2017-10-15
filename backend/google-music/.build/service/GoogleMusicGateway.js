"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playmusic = require("playmusic");
// import PlayMusic = require("../type/google-music/playmusic");
// declare const playmusic: any;
class GoogleMusicGateway {
    constructor(credentials) {
        this.credentials = credentials;
        this.playmusic = new playmusic();
    }
    init() {
        let credentials = {
            androidId: this.credentials.androidId,
            masterToken: this.credentials.masterToken
        };
        return new Promise((resolve, reject) => {
            this.playmusic.init(credentials, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(null);
            });
        });
    }
    search(query, limit = 5) {
        return new Promise((resolve, reject) => {
            this.playmusic.search(query, limit, function (err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                console.log(`Search by ${query} results:`);
                for (let index in data.entries) {
                    let entry = data.entries[index];
                    if (entry.hasOwnProperty('artist')) {
                        console.log(`- Artist: ${entry.artist.name}`);
                    }
                    else if (entry.hasOwnProperty('album')) {
                        console.log(`- Album: ${entry.album.name} (${entry.album.artist})`);
                    }
                    else if (entry.hasOwnProperty('track')) {
                        console.log(`- Track: ${entry.track.title} (${entry.track.artist})`);
                    }
                    else if (entry.hasOwnProperty('playlist')) {
                        console.log(`- Playlist: ${entry.playlist.name}`);
                    }
                    else if (entry.hasOwnProperty('station')) {
                        console.log(`- Station: ${entry.station.name}`);
                    }
                    else {
                        console.log(entry);
                    }
                }
                resolve(data.entries);
            });
        });
    }
    getStreamUrl(storeId) {
        return new Promise((resolve, reject) => {
            this.playmusic.getStreamUrl(storeId, function (err, streamUrl) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(streamUrl);
            });
        });
    }
}
exports.GoogleMusicGateway = GoogleMusicGateway;
