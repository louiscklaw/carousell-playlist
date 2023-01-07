#!/usr/bin/env bash

set -ex

docker compose up -d --build

docker compose exec -t backend ./entry.sh
