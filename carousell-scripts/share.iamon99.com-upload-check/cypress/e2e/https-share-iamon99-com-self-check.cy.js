Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('upload self check', { retries: { runMode: 3, openMode: 1 } }, () => {
  var test_pass = false;

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    cy.intercept('https://sentry.io/*', {});
  });

  // afterEach(() => {});

  it(`https://share.iamon99.com/upload self check`, () => {
    cy.visit('https://share.iamon99.com/upload');

    cy.viewport(1920, 1080);

    cy.screenshot({ capture: 'viewport', overwrite: true });

    cy.xpath(`//*[@id="swal2-title"]`).then($ele => {
      cy.debug($ele.text());
      var result = $ele.text().search(/HOW TO USE/);
      expect(result > -1).to.be.true;
    });

    cy.xpath(`/html/body/div[2]/div/div[6]`).click();

    cy.get(`#container_title_text`);
  });
});
