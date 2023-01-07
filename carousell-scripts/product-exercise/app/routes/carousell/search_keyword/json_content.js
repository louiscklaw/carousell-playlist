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
  app.get('/carousell/capture_carousell/:search_keyword/json_content', async function (req, res) {
    // fs.writeFileSync(`${STORE_PATH}/helloworld.json`, JSON.stringify({ hello: 'world' }), { encoding: 'utf-8' });

    const { params } = req;
    const { search_keyword } = params;

    const browser = await puppeteer.connect({
      browserWSEndpoint: BROWSER_WEBSOCKET_URL,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 * 10 });
    await page.setDefaultNavigationTimeout(0);

    await page.goto(`http://www.carousell.com.hk/search/${search_keyword}`, {
      waitUntil: ['load', 'networkidle0', 'networkidle2'],
    });

    await clearAds(page);

    await removeSportlight(page);

    const posts = await getPosts(page);

    // const aHandle = await page.evaluate(() => 2);
    // var data = await page.screenshot({ fullPage: true });
    // return res.end(data, 'binary');

    res.send({
      title: await page.title(),
      posts,
      screen_capture: 'test.png',
    });
  });
};
