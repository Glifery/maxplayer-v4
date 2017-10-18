import {TypescriptHandler} from './handlers/TypescriptHandler';
import {Handler, Context, Callback} from "aws-lambda";

const typescript: Handler = (event: any, context: Context, callback: Callback) => (new TypescriptHandler).handle(event, context, callback);

export {typescript}