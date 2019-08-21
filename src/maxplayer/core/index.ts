import {DepClass} from "./dep";
import {SearchRepository} from "./repository/SearchRepository";

let dc1 = new DepClass();
let get1 = dc1.test;
console.log('get!***----++-----', get1);

let dc2 = new DepClass();
let get2 = dc2.test;
console.log('get!', get2);

console.log('get111111');
new SearchRepository();
console.log('get1111112222222');
