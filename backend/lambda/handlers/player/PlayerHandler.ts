import {Context, Callback} from "aws-lambda";
import {HandlerInterface} from "../../src/serverless/HandlerInterface";
import {HttpContentTypeResponse} from "../../src/serverless/response/HttpContentTypeResponse";
import * as fs from "fs";

export class PlayerHandler implements HandlerInterface {
    handle (event: any, context: Context, callback: Callback): null {
        // fs.readFile(__dirname + '/../../../response/player/index.html', (error, content) => {
        // fs.readFile(__dirname + '/../../../.assets/service/index.js', (error, content) => {
        fs.readFile(__dirname + '/../../../src/frontend/.dist/index.js', (error, content) => {
            if (error) {
                callback(error);

                return;
            }

            const response: HttpContentTypeResponse = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/javascript'
                },
                body: content.toString()
            };

            callback(null, response);
        });

        return null;
    }
}