const fs = require('fs');
const puppeteer = require('puppeteer-core');
const Diff = require('diff');

const config = require('./config');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

(async () => {
  async function readAdList() {
    console.log('loading ad blocker host');
    let temp = await fs.readFileSync('./ad_list/ad_list.json', { encoding: 'utf-8' });
    let ad_list_json = JSON.parse(temp);
    return ad_list_json;
  }

  const browserPage = async ({ keyword, user, run }) => {
    console.log({ keyword, user, run });
    const browser = await puppeteer.connect({
      browserWSEndpoint: `ws://browserless_engine:3000/?hello=world`,
      ignoreHTTPSErrors: true,
    });

    let ad_list_json = await readAdList();
    // let ad_list_json = ['cdn.tercept.com'];
    // console.log({ ad_list_json });

    const page = await browser.newPage();

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

    await page.setUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/108.0.0.0',
    );
    await page.setRequestInterception(true);
    await page.setViewport({ width: 1920, height: 1080 * 3 });
    await page.setDefaultNavigationTimeout(5 * 1000);

    // http://127.0.0.1:5500/app/site/index.html
    // await page.goto(`http://192.168.10.180:5500/app/site/index.html`, {
    //   waitUntil: ['load', 'networkidle0', 'networkidle2'],
    // });

    await page.goto(`https://www.carousell.com.hk/search/${keyword}`, {
      waitUntil: ['load', 'networkidle0', 'networkidle2'],
    });

    const [p_target_user] = await page.$x(`//p[contains(., '${user}')]`);
    if (p_target_user) {
      const parent_node_1 = await p_target_user.getProperty('parentNode');
      const parent_node_2 = await parent_node_1.getProperty('parentNode');
      const parent_node_3 = await parent_node_2.getProperty('parentNode');
      await parent_node_3.click();

      console.log('target user clicked, cool down');
      await page.waitForTimeout(5 * 1000);
    } else {
      console.log('cannot find target user, wait');
      await page.waitForTimeout(1 * 1000);
    }

    await browser.close();
    console.log('done');
  };

  for (var i = 0; i < 3; i++) {
    await browserPage({ keyword: 'Jeton', user: 'louiscklaw', run: i });
  }
})();

console.log('done');
