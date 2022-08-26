describe('carousell', () => {
  it('helloworld', () => {
    cy.visit('https://www.carousell.com.hk');
    cy.log('helloworld');
    cy.screenshot();
  });
});
