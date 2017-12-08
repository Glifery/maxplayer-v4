import {HandlerInterface} from "../src/serverless/HandlerInterface";
import * as AWS from 'aws-sdk';
import {HttpRequest} from "../src/serverless/request/HttpRequest";
import {Context, Callback} from "aws-lambda";

export abstract class BaseHandler implements HandlerInterface {
    protected prepareDynamoDbInstance (): AWS.DynamoDB.DocumentClient {
        if (process.env.IS_OFFLINE || process.env.IS_LOCAL) {
            const options = {
                region: 'localhost',
                endpoint: 'http://localhost:8000'
            };

            AWS.config.update(options);
        }

        return new AWS.DynamoDB.DocumentClient();
    }

    abstract handle (event: HttpRequest, context: Context, callback?: Callback): null
}