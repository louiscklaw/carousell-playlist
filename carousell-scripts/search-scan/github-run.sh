#!/usr/bin/env bash

./cy-run.sh --headed --browser chrome

sudo chmod 777 -R cypress/reports

node ./publish.js
