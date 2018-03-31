import {DepClass} from "./dep";

let dc1 = new DepClass();
let get1 = dc1.test;
console.log('get!', get1);

let dc2 = new DepClass();
let get2 = dc2.test;
console.log('get!', get2);
