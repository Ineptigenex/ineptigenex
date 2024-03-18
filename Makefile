CONTAINER = node

reset: down build up

build:
	docker compose build

build-no-cache:
	docker compose build --no-cache

up:
	docker compose up -d

stop:
	docker compose stop

down:
	docker compose down --remove-orphans

log:
	docker compose logs -f

log-node:
	docker compose logs -f $(CONTAINER)

exec:
	docker compose exec $(CONTAINER) bash

npm-install:
	docker compose exec $(CONTAINER) npm install

eslint:
	docker compose exec $(CONTAINER) npx eslint . --fix

testing:
	docker compose exec $(CONTAINER) npm run test