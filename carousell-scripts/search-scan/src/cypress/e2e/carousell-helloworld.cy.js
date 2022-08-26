describe('carousell', () => {
  it('helloworld', () => {
    cy.visit('https://www.carousell.com.hk');
    cy.wait(1000 * 5);

    cy.log('helloworld');
    cy.screenshot();
  });
});

describe('user search by 3d printing keywords - my name should appears in the first 8 cards', () => {
  before(() => {
    // runs once before all tests in the block
  });

  beforeEach(() => {
    // runs before each test in the block
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  afterEach(() => {
    // runs after each test in the block
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  after(() => {
    // runs once after all tests in the block
  });

  it('helloworld', () => {
    cy.visit('https://www.carousell.com.hk');
    cy.wait(1000 * 5);

    cy.log('helloworld');
    cy.screenshot();
  });
});
