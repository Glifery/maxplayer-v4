import {Context, Callback} from "aws-lambda";
import {HttpRequest} from "./request/HttpRequest";

export interface HandlerInterface {
    handle (event: HttpRequest, context: Context, callback?: Callback): null
}