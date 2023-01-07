#!/usr/bin/env bash

set -ex

npm i -d

# node ./test.js

rm -rf ./videos/*.mp4
rm -rf ./screenshots/*.jpg

npm run test
