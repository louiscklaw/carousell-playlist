#!/usr/bin/env bash

rm -rf tmp.txt ad_list.txt

set -ex

wget -O tmp.txt "https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=json"
grep -v \# tmp.txt > ad_list.txt

rm -rf tmp.txt

node ./parse_ad_list.js

cp ad_list.json ../search-scan/ad_list.json
