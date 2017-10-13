"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GoogleMusicCredentials {
    constructor(androidId, masterToken) {
        this._androidId = androidId;
        this._masterToken = masterToken;
    }
    get androidId() {
        return this._androidId;
    }
    get masterToken() {
        return this._masterToken;
    }
}
exports.GoogleMusicCredentials = GoogleMusicCredentials;
