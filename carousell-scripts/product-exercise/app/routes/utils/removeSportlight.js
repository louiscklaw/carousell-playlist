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

const removeSportlight = async page => {
  return await page.evaluate(() => {
    var xpath = "//p[text()='Spotlight']";

    for (var i = 0; i < 30; i++) {
      var ele = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (ele) {
        ele.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
      }
    }
  });
};

module.exports = removeSportlight;
