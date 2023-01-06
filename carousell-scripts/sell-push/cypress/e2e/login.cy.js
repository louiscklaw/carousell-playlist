describe('login carousell', () => {
  it('Visits https://www.carousell.com.hk', () => {
    cy.viewport('macbook-16');
    cy.visit('https://www.carousell.com.hk');

    cy.get('[href="/login"]').click();

    cy.xpath('(.//input[@name="username"])[1]').type(Cypress.env('EMAIL'));
    cy.xpath('(.//input[@name="password"])[1]').type(Cypress.env('PASSWORD'));

    cy.xpath('//*[@id="ReactModalPortal-LOGIN"]/div/div/div/div/form/button').click();

    cy.screenshot();
  });
});
