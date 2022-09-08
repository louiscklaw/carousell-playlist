// 3D%20代客打印

describe("3D 代客打印 - my post should appears in the first 8 cards", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.wait(1000);
  });

  it("Visits https://www.carousell.com.hk", () => {
    cy.viewport("macbook-16");

    cy.visit("https://www.carousell.com.hk");

    // cy.xpath('(.//input[starts-with(@placeholder,"Search")])[1]').type("3D 代客打印");

    // cy.xpath('(.//button[@data-testid="navbar-search-input-location-desktop-btn-search"])[1]').click();
    // cy.wait(5000);

    // Array(8)
    //   .fill(0)
    //   .map((_, idx) => {
    //     let el_idx = idx + 1;
    //     cy.xpath(`(.//div[(@data-testid!="listing-card") and starts-with(@data-testid,"listing-card")]/div/a)[${el_idx}]`).then(($ele) => {
    //       cy.debug($ele.text());
    //     });
    //   });

    // cy.screenshot();
  });
});
