// 3D%20代客打印

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('3D 代客打印 - my post should appears in the first 8 cards', () => {
  let louis_found = false;

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    cy.intercept('https://sentry.io/*', {});
  });

  afterEach(() => {
    expect(louis_found).to.be.true;
  });

  it('Visits https://www.carousell.com.hk', () => {
    cy.viewport(1920, 1080 * 5);

    // 3D 代客打印
    cy.visit('https://www.carousell.com.hk/search/3D%20%E4%BB%A3%E5%AE%A2%E6%89%93%E5%8D%B0');
    cy.wait(10 * 1000);

    // cy.xpath('(.//input[starts-with(@placeholder,"Search")])[1]').type(
    //   "3D 代客打印"
    // );

    // cy.xpath('(.//button[@role="submitButton"])[1]').click();
    // cy.wait(10 * 1000);

    Array(8)
      .fill(0)
      .map((_, idx) => {
        let el_idx = idx + 1;
        cy.xpath(
          `(.//div[(@data-testid!="listing-card") and starts-with(@data-testid,"listing-card")]/div/a)[${el_idx}]`,
        ).then($ele => {
          cy.debug($ele.text());
          if ($ele.text().search(/louiscklaw/)) {
            louis_found = true;
          }
        });
      });

    cy.screenshot({ capture: 'viewport', overwrite: true });
  });
});
