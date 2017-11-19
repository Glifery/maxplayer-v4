import {Handler, Context, Callback} from "aws-lambda";
import {SearchAllHandler} from "./handlers/spotify/SearchAllHandler";
import {GetStreamHandler} from "./handlers/google-music/GetStreamHandler";

const spotifySearchAll: Handler = (event: any, context: Context, callback: Callback) => (new SearchAllHandler).handle(event, context, callback);
const googleMusicGetStream: Handler = (event: any, context: Context, callback: Callback) => (new GetStreamHandler).handle(event, context, callback);

export {spotifySearchAll, googleMusicGetStream}