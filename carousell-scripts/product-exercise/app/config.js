const fs = require('fs');
const path = require('path');
const PROJ_HOME = __dirname;

const BROWSERLESS_HOST = 'browserless_engine:3000';
const BROWSER_WEBSOCKET_URL = `ws://browserless_engine:3000/?hello=world`;

const STORE_PATH = `${__dirname}/store`;

module.exports = {
  BROWSER_WEBSOCKET_URL,
  STORE_PATH,
};
