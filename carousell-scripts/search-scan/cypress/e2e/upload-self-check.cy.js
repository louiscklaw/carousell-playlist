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

  it(`try search by carousell`, () => {
    cy.visit("https://share.iamon99.com/upload");

    cy.viewport(1920, 1080);

    cy.screenshot({ capture: "viewport", overwrite: true });

    cy.xpath(`/html/body/div/div[1]/div/div[1]`).then(($ele) => {
      cy.debug($ele.text());
      var result = $ele.text().search(/file upload/);
      expect(result > -1).to.be.true;
    });

    cy.xpath(`/html/body/div/div[2]`).then(($ele) => {
      cy.debug($ele.text());
      var result = $ele.text().search(/2022 louis portfolio/);
      expect(result > -1).to.be.true;
    });

    cy.xpath(`/html/body/div/div[1]/div/form/div[1]/label`).then(($ele) => {
      cy.debug($ele.text());
      var result = $ele.text().search(/Choose/);
      expect(result > -1).to.be.true;
    });

    cy.xpath(`//*[@id="btn-back"]`).then(($ele) => {
      cy.debug($ele.text());
      var result = $ele.text().search(/back/);
      expect(result > -1).to.be.true;
    });

    cy.xpath(`//*[@id="btn-upload"]`).then(($ele) => {
      cy.debug($ele.text());
      var result = $ele.text().search(/upload/);
      expect(result > -1).to.be.true;
    });
  });
});
