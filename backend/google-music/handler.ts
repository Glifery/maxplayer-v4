import { Handler, Context, Callback } from 'aws-lambda';
import { TypescriptHandler } from './handlers/TypescriptHandler';

const typescript: Handler = (event: any, context: Context, callback: Callback) => (new TypescriptHandler).handle(event, context, callback);

export { typescript }