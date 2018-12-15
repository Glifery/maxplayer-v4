import {HandlerInterface} from "../src/serverless/HandlerInterface";
import * as AWS from 'aws-sdk';
import {HttpRequest} from "../src/serverless/request/HttpRequest";
import {Context, Callback} from "aws-lambda";
import * as DynamoDB from 'serverless-dynamodb-client';

export abstract class BaseHandler implements HandlerInterface {
    protected prepareDynamoDbInstance (): AWS.DynamoDB.DocumentClient {
        return DynamoDB.doc;
    }

    abstract handle (event: HttpRequest, context: Context, callback?: Callback): null
}