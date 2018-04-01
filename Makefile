OS := $(shell uname)

start:
	docker-compose up -d

bash:
	docker exec -it maxplayer_node bash

rebuild:
	make down
	docker-compose build --force-rm --no-cache

stop:
	docker-compose stop

down:
	docker-compose down

install:
	make npm_install
	make sls_dynamodb_install

npm_install:
	docker exec -i maxplayer_node /bin/bash -c "bin/npm_install"

sls_dynamodb_install:
	docker exec -i maxplayer_node /bin/bash -c "bin/sls_dynamodb_install"

webpack_watch:
	docker exec -i -d maxplayer_node /bin/bash -c "bin/webpack_watch"

sls_offline:
	docker exec -i -d maxplayer_node /bin/bash -c "bin/sls_offline"

sls_invoke_spotify_refresh:
	docker exec -i maxplayer_node /bin/bash -c "bin/sls_invoke_spotify_refresh"
