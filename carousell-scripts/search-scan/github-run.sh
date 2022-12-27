#!/usr/bin/env bash

./cy-run.sh --headed --browser chrome

chmod 777 -r cypress/reports/html

node ./publish.js
