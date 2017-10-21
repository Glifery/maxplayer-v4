import {TypescriptHandler} from './handlers/TypescriptHandler';
import {SpotifyHandler} from './handlers/SpotifyHandler';
import {Handler, Context, Callback} from "aws-lambda";

const typescript: Handler = (event: any, context: Context, callback: Callback) => (new TypescriptHandler).handle(event, context, callback);
const spotify: Handler = (event: any, context: Context, callback: Callback) => (new SpotifyHandler).handle(event, context, callback);

export {typescript, spotify}