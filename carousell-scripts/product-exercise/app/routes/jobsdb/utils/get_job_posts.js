const fs = require('fs');
const puppeteer = require('puppeteer-core');
const Diff = require('diff');
const crypto = require('crypto');

var express = require('express');
var router = express.Router();

var config = require('../../../config');

// http://localhost:8080/debug/helloworld

const { BROWSER_WEBSOCKET_URL } = config;

var test_json = { hello: 'world' };

var STORE_PATH = `${config.STORE_PATH}/carousell`;

const get_job_posts = async page => {
  var json_job_posts = await page.evaluate(() => {
    var job_titles = [];
    var job_location = [];
    var job_company = [];
    var job_link = [];
    var job_company_link = [];

    document.querySelectorAll('article').forEach(ele => {
      job_titles.push(ele.querySelector('h1').innerText);
      job_location.push(ele.querySelectorAll('span')[3].innerText);

      job_company.push(ele.querySelectorAll('span')[1].innerText);

      var company_link = '';
      try {
        var link_found = ele.querySelectorAll('span')[1].querySelector('a');
        if (link_found) {
          company_link = link_found.getAttribute('href');
        } else {
          company_link = 'no link';
        }
      } catch (error) {
        console.log(ele.querySelectorAll('span')[1]);
      } finally {
        job_company_link.push(company_link);
      }

      job_link.push(ele.querySelector('a').getAttribute('href'));
    });

    return job_titles.map((t, idx) => {
      var title = job_titles[idx];
      var location = job_location[idx];
      var company = job_company[idx];
      var link = job_link[idx];
      var company_link = job_company_link[idx];

      return {
        title,
        location,
        company,
        link,
        company_link,
      };
    });
  });

  return json_job_posts.map((j, idx) => {
    return { ...j, checksum: crypto.createHash('md5').update(`${j.title}/${j.company}`).digest('hex') };
  });
};

module.exports = get_job_posts;
