const fs = require('fs');
const puppeteer = require('puppeteer-core');
const Diff = require('diff');

var express = require('express');
var router = express.Router();

var config = require('../../config');
const removeSportlight = require('../utils/removeSportlight');
const clearAds = require('../utils/clearAds');
const getPosts = require('../utils/getPosts');
const helloworld = require('./utils/helloworld');
const get_job_posts = require('./utils/get_job_posts');

// http://localhost:8080/debug/helloworld

const { BROWSER_WEBSOCKET_URL } = config;

var test_json = { hello: 'world' };

var STORE_PATH = `${config.STORE_PATH}/carousell`;

module.exports = function (app) {
  app.get('/jobsdb/:keyword/get_job', async (req, res) => {
    const { params } = req;
    const { keyword } = params;
    const browser = await puppeteer.connect({
      browserWSEndpoint: BROWSER_WEBSOCKET_URL,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 * 10 });
    await page.setDefaultNavigationTimeout(0);

    await page.goto(`https://hk.jobsdb.com/hk/search-jobs/${keyword}/1`, {
      waitUntil: ['load', 'networkidle0', 'networkidle2'],
    });

    var jobs_json = await get_job_posts(page);

    res.json(jobs_json);
  });
};
