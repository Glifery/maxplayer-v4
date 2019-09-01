import {DepClass} from "./dep";
import {SearchRepository} from "./repository/SearchRepository";
import {SearchAllGateway} from "./gateway/SearchAllGateway";
import {ArtistPool} from "./pool/ArtistPool";
import {AlbumPool} from "./pool/AlbumPool";
import {TrackPool} from "./pool/TrackPool";
import {SearchResult} from "./domain/SearchResult";

let dc1 = new DepClass();
let get1 = dc1.test;
console.log('get!***----++-----', get1);

let dc2 = new DepClass();
let get2 = dc2.test;
console.log('get!', get2);

console.log('get111111');
const searchRepository: SearchRepository = new SearchRepository(
    new SearchAllGateway(),
    new ArtistPool(),
    new AlbumPool(),
    new TrackPool()
);
searchRepository.search("Nightwish").then(function (collection: SearchResult) {
    console.log('collection', collection);
});
console.log('get1111112222222');
