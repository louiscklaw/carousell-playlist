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

const getPosts = async page => {
  return await page.evaluate(() => {
    var e_all_cards = document.querySelectorAll("div[data-testid^='listing-card']");

    e_all_cards.forEach(e => {
      e.querySelector('a').querySelectorAll('div')[2].querySelector('div').remove();
    });

    var list_names = [];
    var list_subjects = [];
    var list_prices = [];

    e_all_cards.forEach(e => list_names.push(e.querySelectorAll('p')[0].innerText));
    e_all_cards.forEach(e => list_subjects.push(e.querySelectorAll('p')[1].innerText));
    e_all_cards.forEach(e => list_prices.push(e.querySelectorAll('div')[7].innerText));

    return list_names.map((n, idx) => {
      return {
        name: list_names[idx],
        subject: list_subjects[idx],
        price: list_prices[idx],
      };
    });
  });
};

module.exports = getPosts;
