#!/usr/bin/env bash

./cy-run.sh --headed --browser chrome

chmod 777 -R cypress/reports

node ./publish.js
