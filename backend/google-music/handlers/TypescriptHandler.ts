import { Handler, Context, Callback, HandlerHttpResponse } from '../utils/Handler';

export class TypescriptHandler implements Handler {
    handle (event: any, context: Context, callback: Callback): null {
        const response: HandlerHttpResponse = {
            statusCode: 200,
            body: JSON.stringify({
                message: Math.floor(Math.random() * 10)
            })
        };

        callback(undefined, response);

        return null;
    }
}