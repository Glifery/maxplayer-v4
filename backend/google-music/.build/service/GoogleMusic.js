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
        return this
            .initGatewayRequest()
            .then(() => this.gateway.search(query))
            .then((entries) => {
            for (let index in entries) {
                let entry = entries[index];
                if (entry.hasOwnProperty('track')) {
                    return Promise.resolve(entry.track.storeId);
                }
            }
            return Promise.reject(`Unable to find track by search query '${query}'`);
        })
            .then((storeId) => this.gateway.getStreamUrl(storeId));
    }
}
exports.GoogleMusic = GoogleMusic;
