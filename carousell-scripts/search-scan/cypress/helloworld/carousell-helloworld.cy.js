import { onlyOn, skipOn } from '@cypress/skip-test';

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('test xpath', { retries: { runMode: 3, openMode: 1 } }, () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    cy.intercept('https://sentry.io/*', {});
  });

  // afterEach(() => {});

  it(`try search by carousell`, () => {
    cy.visit('https://www.carousell.com.hk');

    cy.viewport(1920, 1080 * 10);

    cy.screenshot({ capture: 'viewport', overwrite: true });
  });
});
