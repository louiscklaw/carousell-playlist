Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
  // cy.debug(err);
});

var ENV_KEYWORD_LIST = Cypress.env('ENV_KEYWORD_LIST');
var ENV_USER_LIST = Cypress.env('ENV_USER_LIST');

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

describe(`carousell-bump-exercise.cy.js`, () => {
  it('carousell-bump-exercise.cy.js', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    var time_to_click = getRandomInt(25);

    var USER_LIST = ENV_USER_LIST.split('++++');
    var KEYWORD_LIST = ENV_KEYWORD_LIST.split('++++');

    let shuffled_KEYWORD_LIST = KEYWORD_LIST.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    let shuffled_USER_LIST = USER_LIST.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    cy.debug({ config: { time_to_click } });

    cy.readFile('ad_list.json', { encoding: 'utf-8' }).then(str => {
      str.forEach(s => cy.intercept(`https://*.${s}/*`, {}));
    });

    cy.intercept('https://*.googlesyndication.com/*', {});
    cy.intercept('https://*.doubleclick.net/*', {});
    cy.intercept('https://*.adsrvr.org/*', {});
    cy.intercept('https://*.mathtag.com/*', {});
    cy.intercept('https://*.smartadserver.com/*', {});
    cy.intercept('https://*.stackadapt.com/*', {});
    cy.intercept('https://*.bidswitch.net/*', {});
    cy.intercept('https://*.admeme.net/*', {});
    cy.intercept('https://*.rlcdn.com/*', {});

    for (var ii = 0; ii < time_to_click; ii++) {
      shuffled_KEYWORD_LIST.forEach(kw => {
        shuffled_USER_LIST.forEach(active_user => {
          cy.log({ kw, active_user });
          cy.clearLocalStorage();
          cy.clearCookies();

          // cy.visit(`https://www.example.com/`);
          // cy.visit(`http://192.168.10.180:5500/carousell-scripts/search-scan/site/index.html`);

          cy.visit(`https://www.carousell.com.hk/search/${kw}`);
          if (Cypress.$('[data-testid="listing-card-text-seller-name"]').length > 0) {
            cy.get('[data-testid="listing-card-text-seller-name"]')
              .find(`:contains("${active_user}")`)
              .first()
              .parent()
              .parent()
              .parent()
              .click();
          } else {
            cy.log(`cannot find the user -> ${active_user}`);
          }
        });
      });
    }

    cy.log({
      ENV_KEYWORD_LIST,
      ENV_USER_LIST,
    });
  });
});
