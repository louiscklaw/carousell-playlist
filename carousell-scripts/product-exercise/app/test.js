const fs = require('fs');
const puppeteer = require('puppeteer-core');
const { expect } = require('chai');
const _ = require('lodash');

const { ENV_KEYWORD_LIST, ENV_USER_LIST, ENV_MIN_CLICK, ENV_MAX_CLICK } = process.env;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

describe('click test', function () {
  let page;

  let KEYWORD_LIST = ENV_KEYWORD_LIST.split(',');
  let USER_LIST = ENV_USER_LIST.split(',');
  for (var k_i = 0; k_i < KEYWORD_LIST.length; k_i++) {
    for (var u_i = 0; u_i < USER_LIST.length; u_i++) {
      let num_of_click = getRandomInt(parseInt(ENV_MAX_CLICK)) + parseInt(ENV_MIN_CLICK);
      let user = USER_LIST[u_i];
      let keyword = KEYWORD_LIST[k_i];

      for (var i = 0; i < num_of_click; i++) {
        it(`helloworld ${keyword} -> ${user} -> ${i}`, async function () {
          this.timeout(180 * 1000);

          async function readAdList() {
            console.log('loading ad blocker host');
            let temp = await fs.readFileSync('./ad_list/ad_list.json', { encoding: 'utf-8' });
            let ad_list_json = JSON.parse(temp);
            return ad_list_json;
          }

          const browser = await puppeteer.connect({
            browserWSEndpoint: `ws://browserless_engine:3000/?hello=world`,
            ignoreHTTPSErrors: true,
          });

          let ad_list_json = await readAdList();

          page = await browser.newPage();

          page.on('request', request => {
            let incoming_url = request.url();
            // console.log({ incoming_url });

            let found = false;
            for (var i = 0; i < ad_list_json.length; i++) {
              if (incoming_url.search(ad_list_json[i]) > 0) {
                found = true;
                break;
              }
            }

            if (found) {
              request.abort();
            } else {
              request.continue();
            }
          });

          await page.goto(`http://192.168.10.180:5500/app/site/index.html`, {
            waitUntil: ['load', 'networkidle0', 'networkidle2'],
          });
          const [p_target_user] = await page.$x(`//p[contains(., '345')]`);

          // await page.goto(`https://www.carousell.com.hk/search/${keyword}`, {
          //   waitUntil: ['load', 'networkidle0', 'networkidle2'],
          // });

          // const [p_target_user] = await page.$x(`//p[contains(., '${user}')]`);
          // if (p_target_user) {
          //   const parent_node_1 = await p_target_user.getProperty('parentNode');
          //   const parent_node_2 = await parent_node_1.getProperty('parentNode');
          //   const parent_node_3 = await parent_node_2.getProperty('parentNode');
          //   await parent_node_3.click();

          //   console.log('target user clicked, cool down');
          //   await page.waitForTimeout(5 * 1000);
          // } else {
          //   console.log('cannot find target user, wait');
          //   await page.waitForTimeout(1 * 1000);
          // }

          await page.close();
          await browser.close();

          console.log('done');
        });
      }
    }
  }
});
