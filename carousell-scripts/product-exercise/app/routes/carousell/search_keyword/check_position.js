const fs = require('fs');
const puppeteer = require('puppeteer-core');
const Diff = require('diff');

var express = require('express');
var router = express.Router();

var config = require('../../../config');
const removeSportlight = require('../../utils/removeSportlight');
const clearAds = require('../../utils/clearAds');
const getPosts = require('../../utils/getPosts');

// http://localhost:8080/debug/helloworld

const { BROWSER_WEBSOCKET_URL } = config;

var test_json = { hello: 'world' };

var STORE_PATH = `${config.STORE_PATH}/carousell`;

module.exports = function (app) {
  app.get('/carousell/capture_carousell/:search_keyword/check_position', function (req, res) {
    // fs.writeFileSync(`${STORE_PATH}/helloworld.json`, JSON.stringify({ hello: 'world' }), { encoding: 'utf-8' });
    res.send('helloworld');
  });
};
