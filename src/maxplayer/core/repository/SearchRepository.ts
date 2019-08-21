import * as requestPromise from "request-promise-native";

export class SearchRepository {
    constructor() {
        const options: {uri: string} = {
            uri: 'http://localhost:3000/spotify/search-all?q=Abba',
        };

        requestPromise.get(options).then(console.log);
    }
}