'use strict';

const request = require('request');

/**
 * Use this command to launch the handler locally
 *
 * sls invoke local -f corsProxy -p demo/http.json
 */
module.exports = class CorsProxy {
    /**
     * This method will be called by AWS
     *
     * @param event
     * @param context
     * @param callback
     */
    handler (event, context, callback) {
        let params = event.queryStringParameters;

        console.log(event);
        console.log(`Got request with params: ${JSON.stringify(params)}`);

        if (!params.hasOwnProperty('url')) {
            const errorResponse = {
                statusCode: 400,
                body: 'Unable get url from \'url\' query parameter'
            };

            callback(null, errorResponse);

            return;
        }

        return new Promise((resolve, reject) => {
            request({
                url: params.url,
                method: event.httpMethod,
                timeout: 20000
            }, (err, originalResponse) => {
                if (err) {
                    reject(err);

                    return;
                }

                console.log(`Got response from ${params.url} ---> {statusCode: ${originalResponse.statusCode}}`);

                const proxyResponse = {
                    statusCode: originalResponse.statusCode,
                    headers: {
                        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
                        "content-type": originalResponse.headers['content-type']
                    },
                    body: originalResponse.body
                };

                callback(null, proxyResponse);

                resolve(proxyResponse);
            });
        });
    }
};