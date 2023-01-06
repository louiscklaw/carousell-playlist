// 3D%20代客打印

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('python position check', () => {
  let louis_found = false;

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    cy.intercept('https://sentry.io/*', {});
  });

  afterEach(() => {
    // expect(louis_found).to.be.true;
  });

  it('my post should appears in the first 8 cards', () => {
    cy.viewport(1920, 1080 * 2);

    // 3D 代客打印
    // cy.visit('http://192.168.10.180:5500/carousell-scripts/search-scan/site/index.html');
    cy.visit('https://www.carousell.com.hk/search/javascript');

    cy.get(`[data-testid^=listing-card-text-seller-name]`).should('contain', 'louiscklaw');

    cy.screenshot({ capture: 'viewport', overwrite: true });
  });
});
