import { Context, Callback } from 'aws-lambda';

interface HandlerHttpResponse {
    statusCode: number;
    body: string;
}

interface Handler {
    handle (event: any, context: Context, callback?: Callback): null
}

export { Handler, Context, Callback, HandlerHttpResponse }