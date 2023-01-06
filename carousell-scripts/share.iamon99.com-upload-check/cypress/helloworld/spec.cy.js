describe('test xpath', () => {
  it('helloworld', () => {
    cy.visit('stub/index.html');
    cy.xpath('.//h2');
  });
});
