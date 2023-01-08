#!/usr/bin/env bash

set -ex

export ENV_KEYWORD_LIST=jeton
export ENV_USER_LIST=louiscklaw
export ENV_MIN_CLICK=1
export ENV_MAX_CLICK=3


docker container prune -f
docker system prune -f
docker image prune -f
docker volume prune -f
docker network prune -f


docker compose \
  -f docker-compose.dev.yml \
  up -d --build

docker compose \
  -f docker-compose.dev.yml \
  exec -t \
  backend \
  bash
