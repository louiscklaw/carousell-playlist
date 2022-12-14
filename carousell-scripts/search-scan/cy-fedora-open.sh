#!/usr/bin/env bash
# pass DISPLAY variable pointing at the host's X11 server
# like XQuartz
# read https://sourabhbajaj.com/blog/2017/02/07/gui-applications-docker-mac/

# IP=$(ipconfig getifaddr en0)
# this assumes that X11 server allows connections over the network
# after we execute "/usr/X11/bin/xhost + $IP"
DISPLAY=:1

xhost local:

export CYPRESS_USER_LIST=louiscklaw++++louiscklaw
export CYPRESS_ENV_KEYWORD_LIST=jeton++++jeton
export ENV_MIN_CLICK=1
export ENV_MAX_CLICK=3

# explanation of the "docker run" command line arguments
#
#  -it          = interactive terminal
#  -v $PWD:/e2e = map current folder to /e2e inside the container
#  -v /tmp/.X11-unix:/tmp/.X11-unix = map X11 socket file to communicate
#  -w /e2e      = set working directy to /e2e
#  -e DISPLAY   = pass environment variable DISPLAY to the container
#  --entrypoint cypress = run "cypress" command
#     with arguments AFTER Docker image name
#     in our case they are "--project ." to point globally installed Cypress
#     at the current working directory /e2e inside the container
docker run -it \
  -u 1000:1000 \
  -v $PWD:/e2e \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -w /e2e \
  -e DISPLAY \
  --env-file <(env | grep ENV_) \
  --entrypoint cypress \
  cypress/included:10.6.0 open  \
  --env ENV_USER_LIST="$CYPRESS_USER_LIST",ENV_KEYWORD_LIST="$CYPRESS_ENV_KEYWORD_LIST",ENV_MIN_CLICK="$ENV_MIN_CLICK",ENV_MAX_CLICK="$ENV_MAX_CLICK" \
  --project .
