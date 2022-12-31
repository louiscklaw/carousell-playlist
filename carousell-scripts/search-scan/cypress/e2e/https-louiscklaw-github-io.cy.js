import { onlyOn, skipOn } from "@cypress/skip-test";

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("test xpath", { retries: { runMode: 3, openMode: 1 } }, () => {
  var test_pass = false;

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    cy.intercept("https://sentry.io/*", {});

    cy.wait(1000);
  });

  // afterEach(() => {});

  it(`https://louiscklaw.github.io self check`, () => {
    cy.visit("https://louiscklaw.github.io");

    cy.viewport(1920, 1080);

    cy.screenshot({ capture: "viewport", overwrite: true });

    cy.xpath(`/html/body/main/div/div`).then(($ele) => {
      cy.debug($ele.text());
      var result = $ele.text().search(/Hi, I am louis/);
      expect(result > -1).to.be.true;
    });
  });
});
