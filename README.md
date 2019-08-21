# Maxplayer v4

### Quick start

##### 1. Install

- *docker-compose* is required
- `make start` for start container
- `make install` for NPM and DynamoDb install

##### 2. Run backend
Interactive mode

- `make bash` for enter docker terminal 
- `bin/sls_offline` for start DynamoDb/SLS Offline in terminal

Background mode

- `make sls_offline` for start DynamoDb/SLS Offline in background

##### 3. Run frontend

Interactive mode
- `make bash` for enter docker terminal 
- `bin/webpack_watch` for start TypeScript autocompiling

Background mode

- `make webpack_watch` for start TypeScript autocompiling in background

### Offline endpoints examples

- [http://localhost:3000](http://localhost:3000)
- [http://localhost:3000/player.js](http://localhost:3000/player.js)
- [http://localhost:3000/spotify/search-all?q=Abba](http://localhost:3000/spotify/search-all?q=Abba)
- [http://localhost:3000/googlemusic/stream?artist=Abba&track=Money](http://localhost:3000/googlemusic/stream?artist=Abba&track=Money)

### Tasks

- Create BaseSpotifyHandler and inherit it for different requests
- Resolve problem with typescript warnings
- DI
- Subscriber service (deep)