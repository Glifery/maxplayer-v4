import {TypescriptHandler} from './handlers/TypescriptHandler';
import {SpotifyHandler} from './handlers/SpotifyHandler';
import {Handler, Context, Callback} from "aws-lambda";
import {SearchAllHandler} from "./handlers/spotify/SearchAllHandler";

const typescript: Handler = (event: any, context: Context, callback: Callback) => (new TypescriptHandler).handle(event, context, callback);
const spotify: Handler = (event: any, context: Context, callback: Callback) => (new SpotifyHandler).handle(event, context, callback);
const spotifySearchAll: Handler = (event: any, context: Context, callback: Callback) => (new SearchAllHandler).handle(event, context, callback);

export {typescript, spotify, spotifySearchAll}