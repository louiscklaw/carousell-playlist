// 3D%20代客打印

describe("3D 代客打印 - my post should appears in the first 8 cards", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.wait(1000);
  });

  it("Visits https://www.carousell.com.hk", () => {
    cy.viewport(1920, 1080 * 10);

    cy.visit("https://www.carousell.com.hk");

    cy.screenshot({ capture: "viewport", overwrite: true });
  });
});
