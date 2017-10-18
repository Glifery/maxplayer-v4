import {Context, Callback} from "aws-lambda";

export interface HandlerInterface {
    handle (event: any, context: Context, callback?: Callback): null
}