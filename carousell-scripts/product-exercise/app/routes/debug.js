const puppeteer = require('puppeteer-core');

var express = require('express');
var router = express.Router();

var config = require('../config');

// http://localhost:8080/debug/helloworld

const { BROWSER_WEBSOCKET_URL } = config;

var test_json = { hello: 'world' };

router.get('/helloworld', function (req, res) {
  res.json(test_json);
});

router.get('/get_params/:test1/:test2', function (req, res) {
  var test = req.params;

  res.json({ hello: 'world', test: req.params });
});

router.get('/get_title', async (req, res) => {
  var browser = {};
  var page = {};

  try {
    browser = await puppeteer.connect({ browserWSEndpoint: BROWSER_WEBSOCKET_URL });
    page = await browser.newPage();
    await page.goto('http://www.example.com/');
    res.send(await page.title());
  } catch (error) {
    res.send({ error: error.message });
  } finally {
    if (page.close != undefined) page.close();
    if (browser.close != undefined) browser.close();
    // browser?.close();
  }
});

router.get('/capture_viewport', async (req, res) => {
  const IPHONE_VIEWPORT = '1920,5080';
  const BROWSER_WEBSOCKET_URL = `ws://127.0.0.1:3000/?hello=world&--window-size=${IPHONE_VIEWPORT}`;

  const browser = await puppeteer.connect({ browserWSEndpoint: BROWSER_WEBSOCKET_URL });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 * 10 });
  await page.setDefaultNavigationTimeout(0);

  await page.goto('https://whatismyviewport.com/', { waitUntil: 'networkidle0' });

  var data = await page.screenshot({ fullPage: true });

  // res.send(await page.title());
  return res.end(data, 'binary');
});

router.get('/capture_youtube_com', async (req, res) => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: BROWSER_WEBSOCKET_URL,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 * 10 });
  await page.setDefaultNavigationTimeout(0);

  await page.goto('http://www.youtube.com/', { waitUntil: ['load', 'networkidle0', 'networkidle2'] });

  var data = await page.screenshot({ fullPage: true });

  // res.send(await page.title());
  return res.end(data, 'binary');
});

router.get('/capture_example_com', async (req, res) => {
  const browser = await puppeteer.connect({ browserWSEndpoint: BROWSER_WEBSOCKET_URL });

  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.setViewport({ width: 1920, height: 1080 * 10 });

  await page.goto('http://www.example.com/', { waitUntil: 'networkidle0' });

  var data = await page.screenshot({ fullPage: true });

  // res.send(await page.title());
  return res.end(data, 'binary');
});

module.exports = router;
