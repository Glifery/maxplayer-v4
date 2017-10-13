import { Handler, Context, Callback } from 'aws-lambda';
// import { HelloResponse } from 'utils/HttpResponse';

import { TypescriptHandler } from './handlers/TypescriptHandler';

const typescript: Handler = (event: any, context: Context, callback: Callback) => (new TypescriptHandler).handle(event, context, callback);

// const typescript: Handler = (event: any, context: Context, callback: Callback) => {
//     const response: HelloResponse = {
//         statusCode: 200,
//         body: JSON.stringify({
//             message: Math.floor(Math.random() * 10)
//         })
//     };
//
//     callback(undefined, response);
// };

export { typescript }