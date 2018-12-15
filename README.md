# Maxplayer v4

### Quick start

##### 1. Install

- `Docker` is required
- `make start` for start container
- `make install` for NPM and DynamoDb install

##### either 2. Develop

- `docker exec -it maxplayer_node sh` for enter docker terminal 
- `bin/sls_offline` for start DynamoDb/SLS Offline in terminal

##### or 2. Run

- `make sls_offline` for start DynamoDb/SLS Offline in background

### Offline endpoints examples

- [http://localhost:3000](http://localhost:3000)
- [http://localhost:3000/player.js](http://localhost:3000/player.js)
- [http://localhost:3000/spotify/search-all?q=Abba](http://localhost:3000/spotify/search-all?q=Abba)
- [http://localhost:3000/googlemusic/stream?artist=Abba&track=Money](http://localhost:3000/googlemusic/stream?artist=Abba&track=Money)

### Tasks

- Move `spotify-web-api-node` from serverless module to common module
- Create BaseSpotifyHandler and inherit it for different requests
- Resolve problem with typescript warnings
- DI
- Subscriber service (deep)