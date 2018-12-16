import {Context, Callback} from "aws-lambda";
import {HandlerInterface} from "../../src/serverless/HandlerInterface";
import {HttpContentTypeResponse} from "../../src/serverless/response/HttpContentTypeResponse";
import * as fs from "fs";

export class FrontendHtmlHandler implements HandlerInterface {
    handle (event: any, context: Context, callback?: Callback): null {
        // fs.readFile(__dirname + '/../../../src/frontend/.dist/index.js', (error, content) => {
        fs.readFile(__dirname + '/../../../src/frontend/assets/index.html', (error, content) => {
            if (error && callback) {
                callback(error);

                return;
            }

            const response: HttpContentTypeResponse = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'text/html'
                },
                body: content.toString()
            };

            if (callback) {
                callback(null, response);
            }
        });

        return null;
    }
}