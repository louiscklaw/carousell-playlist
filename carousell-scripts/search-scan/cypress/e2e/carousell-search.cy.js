// 3D%20代客打印

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("3D 代客打印 - my post should appears in the first 8 cards", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.wait(1000);
  });

  it("Visits https://www.carousell.com.hk", () => {
    cy.viewport(1920, 1080 * 10);

    cy.visit("https://www.carousell.com.hk");
    cy.xpath('(.//input[starts-with(@placeholder,"Search")])[1]').type("3D 代客打印");

    cy.xpath('(.//button[@data-testid="navbar-search-input-location-desktop-btn-search"])[1]').click();
    cy.wait(5000);

    cy.screenshot({ capture: "viewport", overwrite: true });
  });
});
