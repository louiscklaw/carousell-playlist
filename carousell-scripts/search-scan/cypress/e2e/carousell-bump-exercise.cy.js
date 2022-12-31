Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;

  // cy.debug(err);
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

var ENV_KEYWORD_LIST = Cypress.env("ENV_KEYWORD_LIST");
var ENV_USER_LIST = Cypress.env("ENV_USER_LIST");

var USER_LIST = ENV_USER_LIST.split(",");
var KEYWORD_LIST = ENV_KEYWORD_LIST.split(",");

var i = 0,
  j = 0;

Cypress._.times(KEYWORD_LIST.length, () => {
  Cypress._.times(USER_LIST.length, () => {
    Cypress._.times(getRandomInt(10), () => {
      var active_user = USER_LIST[i].trim();
      var active_keyword = KEYWORD_LIST[j].trim();

      describe(`checking ${active_keyword}->${active_user}`, () => {
        beforeEach(() => {
          cy.clearLocalStorage();
          cy.clearCookies();

          cy.intercept("https://sentry.io/*", {});

          cy.viewport(1600, 1200);

          cy.wait(1000);
        });

        it("carousell-bump-burner.cy", () => {
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
          cy.wait(3 * 1000);
        });
      });
    });
    i += 1;
  });

  j += 1;
});
