import {Collection} from "./domain/Collection";
import {Artist} from "./domain/Artist";

export function dec(value: boolean) {
    console.log('This is dec factory!');

    return function (target: any, propertyKey: string) {
        console.log('dec!!', target, propertyKey);

        let promise: Promise<Collection<Artist>> = null;

        // property getter
        let getter = function () {
            console.log('object!', this);
            if (!promise) {
                console.log('init!!');
                promise = new Promise<Collection<Artist>>((resolve: (collection: Collection<Artist>) => void, reject: any) => {
                    resolve(new Collection<Artist>());
                });
            }

            return promise;
        };

        // property setter
        let setter = function (newVal: string) {
            console.log(`!!!! ${newVal}`);
        };

        Object.defineProperty(target, propertyKey, {
            get: getter,
            // set: setter,
            // writable: false,
            // enumerable: false,
            // configurable: false
        });
    };
}