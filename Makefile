OS := $(shell uname)

all:
	make npm
	make install
	make webpack
	make offline

install:
	cd backend/lambda && sls dynamodb install

offline:
	cd backend/lambda && sls offline start

npm:
	cd backend/lambda && npm install
	cd src/maxplayer/serverless && npm install
	cd src/maxplayer/google-music && npm install
	cd src/maxplayer/spotify && npm install
	cd src/maxplayer/frontend && npm install
	cd src/maxplayer/core && npm install
	cd src/maxplayer/frontend && npm install
	make link

link:
	rm -rf backend/lambda/node_modules/maxplayer-serverless
	rm -rf backend/lambda/node_modules/maxplayer-google-music
	rm -rf backend/lambda/node_modules/maxplayer-frontend
	cd backend/lambda/node_modules && ln -s ../../../src/maxplayer/serverless maxplayer-serverless
	cd backend/lambda/node_modules && ln -s ../../../src/maxplayer/google-music maxplayer-google-music
	cd backend/lambda/node_modules && ln -s ../../../src/maxplayer/frontend maxplayer-frontend

webpack:
	cd src/maxplayer/frontend && node_modules/.bin/webpack --watch