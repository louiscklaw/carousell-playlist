describe('carousell', () => {
  it('helloworld', () => {
    cy.visit('index.html');

    cy.log('helloworld');
    cy.screenshot();
  });
});
