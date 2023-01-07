const fs = require('fs');
const puppeteer = require('puppeteer-core');
const Diff = require('diff');

var express = require('express');
var router = express.Router();

var config = require('../../config');

// http://localhost:8080/debug/helloworld

const { BROWSER_WEBSOCKET_URL } = config;

var test_json = { hello: 'world' };

var STORE_PATH = `${config.STORE_PATH}/carousell`;

const clearAds = async page => {
  return await page.evaluate(() => {
    document.querySelectorAll("[id^='google_ads_iframe_']").forEach(e => {
      e.parentElement.parentElement.remove();
    });
    document.querySelectorAll("div[id^='native-ad']").forEach(e => e.remove());
  });
};

module.exports = clearAds;
