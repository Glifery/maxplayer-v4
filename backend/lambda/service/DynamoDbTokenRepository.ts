import {TokenRepositoryInterface} from "../src/spotify/service/TokenRepositoryInterface";
import {AccessToken} from "../src/spotify/type/util/AccessToken";
import {DynamoDB} from "aws-sdk";
import DocumentClient = DynamoDB.DocumentClient;

export class DynamoDbTokenRepository implements TokenRepositoryInterface {
    private dynamoDb: DocumentClient;
    private tableName: string;
    private primaryKey: string;

    constructor (dynamoDb: DocumentClient, opts: {
        tableName: string,
        primaryKey: string
    }) {
        this.dynamoDb = dynamoDb;
        this.tableName = opts.tableName;
        this.primaryKey = opts.primaryKey
    }

    public getToken(): Promise<AccessToken|null> {
        return undefined;
    }

    public setToken(token: AccessToken): Promise<AccessToken> {
        return new Promise((resolve: (err: any) => void, reject: (data: any) => void) => {
            this.dynamoDb
                .put({
                    Item: {
                        primaryKey: this.primaryKey,
                        data: {
                            access_token: token.access_token,
                            expires_in: token.expires_in
                        }
                    },
                    TableName: this.tableName
                }, (err: any, data: any) => {
                    if (err) {
                        reject(err);

                        return;
                    }

                    resolve(token);
                })
            ;
        });
    }
}