import {dec} from "./decorator";

let counter: number = 1;

export class DepClass {
    @dec(true)
    private _test: string;
    private content: string;

    constructor () {
        console.log('This is constructor!');

        this.content = 'some content'+counter;

        counter++;

        // this.test = '1234--';
        // let t = this.test;
    }

    // set test(value: string) {
    //     this._test = value;
    //
    //     console.log('set!', value);
    // }

    get test(): string {
        // this._test = 4;
        return this._test;
    }
}