describe('My First Test', () => {
  it('Visits https://louiscklaw.github.io/routine_check/', () => {
    cy.visit('https://louiscklaw.github.io/routine_check/');

    cy.screenshot();
  });
});
