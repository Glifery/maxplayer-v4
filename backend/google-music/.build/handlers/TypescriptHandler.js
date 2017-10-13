"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypescriptHandler {
    handle(event, context, callback) {
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: Math.floor(Math.random() * 10)
            })
        };
        callback(undefined, response);
        return null;
    }
}
exports.TypescriptHandler = TypescriptHandler;
