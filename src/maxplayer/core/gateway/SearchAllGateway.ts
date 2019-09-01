import * as requestPromise from "request-promise-native";
import {SearchAllResponse} from "../../../../backend/lambda/response/spotify/SearchAllResponse";
import {Collection} from "../domain/Collection";
import {Artist} from "../domain/Artist";
import {TypedJSON} from "typedjson";
import {SearchResult} from "./type/SearchResult";

export class SearchAllGateway {
    public searchAll(query: String): Promise<SearchResult> {
        const options: {uri: string} = {
            uri: `http://localhost:3000/spotify/search-all?q=${query}`,
        };

        return requestPromise.get(options).then(function (result: any) {
            const res: SearchResult = JSON.parse(result);
            console.log('result!!!', res);

            return res;

            // let serializer = new TypedJSON(Collection);
            // let coll = new Collection();
            //
            // let coll2 = serializer.parse(result);
            // console.log('re11111sult!!!', coll2);
            //
            // const res: SearchAllResponse = JSON.parse(result);
            // console.log('result!!!', res);
            // const artists: Collection<Artist> = JSON.parse(result);
            // console.log('result!!! artists', artists);
            // console.log('result!!! artists1', artists.getElements()[1]);
        });
    }
}