// 3D%20代客打印

describe('3D 代客打印 - my name should appears in the first 8 cards', () => {
  it('Visits https://www.carousell.com.hk', () => {
    cy.viewport('macbook-16');

    cy.visit('https://www.carousell.com.hk');

    cy.xpath('(.//input[@placeholder="Search for an item"])[1]').type('3D 代客打印');

    cy.xpath('(.//button[@data-testid="navbar-search-input-location-desktop-btn-search"])[1]').click();
    cy.wait(5000);

    cy.xpath(`(.//*[@data-testid="listing-card-text-seller-name"])`).contains('louiscklaw');

    cy.screenshot();
  });
});
