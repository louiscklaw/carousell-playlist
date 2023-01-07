#!/usr/bin/env bash

set -ex

export ENV_KEYWORD_LIST=Jeton2,Jeton1
export ENV_USER_LIST=louiscklaw2,louiscklaw1
export ENV_MIN_CLICK=5
export ENV_MAX_CLICK=10

docker compose up -d --build

docker compose exec -t \
  backend \
  bash
