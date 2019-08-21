import * as requestPromise from "request-promise-native";
import {SearchAllResponse} from "../../../../backend/lambda/src/spotify/type/api/search-all/SearchAllResponse";

export class SearchRepository {
    constructor() {
        const options: {uri: string} = {
            uri: 'http://localhost:3000/spotify/search-all?q=Abba',
        };

        requestPromise.get(options).then(function (result: any) {
            const res: SearchAllResponse = JSON.parse(result);
            console.log('result!!!', res);
        });
    }
}