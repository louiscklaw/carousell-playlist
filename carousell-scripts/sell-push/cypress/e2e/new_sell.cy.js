let TEST_STUB = "https://www.carousell.com.hk";
// let TEST_STUB = "http://localhost:3000";

describe("login carousell", () => {
  it("Visits https://www.carousell.com.hk", () => {
    cy.viewport("macbook-16");
    cy.visit(`${TEST_STUB}`);

    cy.get('[href="/login"]').click();

    cy.xpath('(.//input[@name="username"])[1]').type(Cypress.env("EMAIL"));
    cy.xpath('(.//input[@name="password"])[1]').type(Cypress.env("PASSWORD"));

    cy.xpath('//*[@id="ReactModalPortal-LOGIN"]/div/div/div/div/form/button').click();

    cy.wait(3000);

    cy.visit(`${TEST_STUB}/sell/`);

    cy.get("input[type=file]").selectFile("./test_photo.png");
  });
});
