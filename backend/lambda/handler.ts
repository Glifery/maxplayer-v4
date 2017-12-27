import {Handler, Context, Callback} from "aws-lambda";
import {RefreshTokenHandler} from "./handlers/spotify/RefreshTokenHandler";
import {SearchAllHandler} from "./handlers/spotify/SearchAllHandler";
import {GetStreamHandler} from "./handlers/google-music/GetStreamHandler";
import {PlayerHandler} from "./handlers/player/PlayerHandler";

const player: Handler = (event: any, context: Context, callback: Callback) => (new PlayerHandler).handle(event, context, callback);
const spotifyRefreshToken: Handler = (event: any, context: Context, callback: Callback) => (new RefreshTokenHandler).handle(event, context, callback);
const spotifySearchAll: Handler = (event: any, context: Context, callback: Callback) => (new SearchAllHandler).handle(event, context, callback);
const googleMusicGetStream: Handler = (event: any, context: Context, callback: Callback) => (new GetStreamHandler).handle(event, context, callback);

export {player, spotifyRefreshToken, spotifySearchAll, googleMusicGetStream}