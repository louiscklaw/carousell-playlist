// 3D%20代客打印

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("python - my post should appears in the first 8 cards", () => {
  let louis_found = false;

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.wait(1000);
  });

  afterEach(() => {
    expect(louis_found).to.be.true;
  });

  it("Visits https://www.carousell.com.hk", () => {
    cy.viewport(1920, 1080 * 1);

    cy.visit("https://www.carousell.com.hk");
    cy.xpath('(.//input[starts-with(@placeholder,"Search")])[1]').type("python");

    cy.xpath('(.//button[@role="submitButton"])[1]').click();
    cy.wait(10 * 1000);

    Array(8)
      .fill(0)
      .map((_, idx) => {
        let el_idx = idx + 1;
        cy.xpath(
          `(.//div[(@data-testid!="listing-card") and starts-with(@data-testid,"listing-card")]/div/a)[${el_idx}]`
        ).then(($ele) => {
          cy.debug($ele.text());
          if ($ele.text().search(/louiscklaw/)) {
            louis_found = true;
          }
        });
      });

    cy.screenshot({ capture: "viewport", overwrite: true });
  });
});
