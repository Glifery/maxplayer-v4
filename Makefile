OS := $(shell uname)

offline:
	cd backend/lambda && sls offline start

npm:
	cd backend/lambda && npm install
	cd src/maxplayer/serverless && npm install
	cd src/maxplayer/google-music && npm install
	cd src/maxplayer/spotify && npm install

link:
	rm -rf backend/lambda/node_modules/maxplayer-serverless
	rm -rf backend/lambda/node_modules/maxplayer-google-music
	cd backend/lambda/node_modules && ln -s ../../../src/maxplayer/serverless maxplayer-serverless
	cd backend/lambda/node_modules && ln -s ../../../src/maxplayer/google-music maxplayer-google-music