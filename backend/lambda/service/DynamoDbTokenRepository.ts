import {TokenRepositoryInterface} from "../src/spotify/service/TokenRepositoryInterface";
import {AccessToken} from "../src/spotify/type/util/AccessToken";
import {AWSError, DynamoDB} from "aws-sdk";
import DocumentClient = DynamoDB.DocumentClient;

type dynamoDbGet = {
    Item: {
        primaryKey: string,
        data: AccessToken
    }
}

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
        return new Promise((resolve: (data: AccessToken|null) => void, reject: (err: any) => void) => {
            this.dynamoDb
                .get({
                    Key: {
                        primaryKey: this.primaryKey
                    },
                    TableName: this.tableName
                }, (err: AWSError, res: DocumentClient.GetItemOutput) => {
                    if (err) {
                        reject(err);

                        return;
                    }

                    if (!res.hasOwnProperty('Item')) {
                        resolve(null);

                        return;
                    }

                    if (!res.Item || !res.Item.data || !res.Item.data.access_token || !res.Item.data.expires_in) {
                        throw new Error('Could not get either \'access_token\' or \'expires_in\'');
                    }

                    const token: AccessToken = {
                        access_token: res.Item.data.access_token,
                        expires_in: res.Item.data.expires_in
                    };

                    resolve(token);
                })
            ;
        });
    }

    public setToken(token: AccessToken): Promise<AccessToken> {
        return new Promise((resolve: (data: any) => void, reject: (err: any) => void) => {
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
                }, (err: any, res: any) => {
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