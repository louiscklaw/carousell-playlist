#!/usr/bin/env bash

id

./cy-run.sh --headed --browser chrome

sudo chmod 777 -R cypress/reports

node ./publish.js
