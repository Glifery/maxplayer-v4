# Maxplayer v4

## Quick start

- `Docker` is required
- `make start`
- `make install`
- `make offline`

## Backend routes examples

- http://localhost:3000/spotify/search-all?q=Abba
- http://localhost:3000/googlemusic/stream?artist=Abba&track=Money

## Tasks

- Move `spotify-web-api-node` from serverless module to common module
- Create BaseSpotifyHandler and inherit it for different requests
- Resolve problem with typescript warnings
- DI
- Subscriber service (deep)