context('carousell', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080 * 30);
  });

  it('helloworld ', () => {
    Array(30)
      .fill(0)
      .forEach((x, i) => {
        cy.visit('https://www.carousell.com.hk');
        cy.wait(5000);

        cy.log('helloworld');

        cy.screenshot();
      });
  });
});
