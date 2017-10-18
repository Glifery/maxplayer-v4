OS := $(shell uname)

offline:
	cd backend/google-music && sls offline start

npm:
	cd backend/google-music && npm install
	cd src/maxplayer/serverless && npm install
	cd src/maxplayer/google-music && npm install

link:
	rm -rf backend/google-music/node_modules/maxplayer-serverless
	rm -rf backend/google-music/node_modules/maxplayer-google-music
	cd backend/google-music/node_modules && ln -s ../../../src/maxplayer/serverless maxplayer-serverless
	cd backend/google-music/node_modules && ln -s ../../../src/maxplayer/google-music maxplayer-google-music