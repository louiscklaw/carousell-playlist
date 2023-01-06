Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;

  // cy.debug(err);
});

var ENV_KEYWORD_LIST = 'Jeton nano';
var ENV_USER_LIST = 'louiscklaw';

var USER_LIST = ENV_USER_LIST.split(',');
var KEYWORD_LIST = ENV_KEYWORD_LIST.split(',');

var i = 0,
  j = 0;

Cypress._.times(KEYWORD_LIST.length, () => {
  Cypress._.times(USER_LIST.length, () => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    Cypress._.times(2, () => {
      var active_user = USER_LIST[i].trim();
      var active_keyword = KEYWORD_LIST[j].trim();

      describe(`checking ${active_keyword}->${active_user}`, () => {
        before(() => {
          cy.log(`checking ${active_keyword}->${active_user}`);
          cy.readFile('ad_list.json', { encoding: 'utf-8' }).then(str => {
            str.forEach(s => cy.intercept(`https://*.${s}/*`, {}));
          });
        });

        beforeEach(() => {
          cy.clearLocalStorage();
          cy.clearCookies();

          cy.intercept('https://*.googlesyndication.com/*', {});
          cy.intercept('https://*.doubleclick.net/*', {});
          cy.intercept('https://*.adsrvr.org/*', {});
          cy.intercept('https://*.mathtag.com/*', {});
          cy.intercept('https://*.smartadserver.com/*', {});
          cy.intercept('https://*.stackadapt.com/*', {});
          cy.intercept('https://*.bidswitch.net/*', {});
          cy.intercept('https://*.admeme.net/*', {});
          cy.intercept('https://*.rlcdn.com/*', {});

          cy.viewport(1920, 1200);
        });

        it('carousell-bump-exercise-happy-tour.cy.js', () => {
          cy.visit(`https://www.carousell.com.hk/search/${active_keyword}`);
          // cy.visit("https://www.example.com");
          // cy.visit("http://192.168.10.180:5500/search-scripts/search-scan/site/index.html");

          // cy.screenshot({ capture: "viewport", overwrite: true });
          // cy.debug(cy.xpath("(.//*[contains(text(),'cs_tutor') ])").length);
          cy.get('[data-testid="listing-card-text-seller-name"]')
            .filter(`:contains("${active_user}")`)
            .first()
            .parent()
            .parent()
            .parent()
            .click();
        });
      });
    });
    i += 1;
  });

  j += 1;
});
