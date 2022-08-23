let TEST_STUB = "https://www.carousell.com.hk";
// let TEST_STUB = "http://localhost:3000";

describe("login carousell", () => {
  it("Visits https://www.carousell.com.hk", () => {
    cy.viewport("macbook-13");
    cy.visit(`${TEST_STUB}`);

    cy.get('[href="/login"]').click();

    cy.xpath('(.//input[@name="username"])[1]').type(Cypress.env("EMAIL"));
    cy.xpath('(.//input[@name="password"])[1]').type(Cypress.env("PASSWORD"));

    // click login button
    // cy.xpath('//*[@id="ReactModalPortal-LOGIN"]/div/div/div/div/form/button').click();
    cy.xpath('//*[@id="ReactModalPortal-LOGIN"][1]').xpath("(.//button)[3]").click();

    cy.wait(1000);

    cy.visit(`${TEST_STUB}/sell/`);

    // add new sell item
    cy.xpath("(.//input)[1]").selectFile("cypress\\e2e\\test_photo.png", { force: true });
    cy.wait(1000);
    cy.get(".D_xP").click();

    cy.get(".D_rS").type("Printers, Scanners & Copiers");
    cy.wait(1000);
    cy.get(".D_yb").click();
    cy.get(":nth-child(1) > .D_yj > .D_rR > .D_rS").type("3d printout selling");
    cy.get(":nth-child(2) > .D_zP > .D_zR > :nth-child(1)").click();

    cy.get(":nth-child(4) > .D_rR > .D_rS").type("0.5");
    cy.get(".D_mI").type("3d printout content");

    // // click meet up
    // cy.get(":nth-child(3) > .D_ur").click();
    // // click add location
    // cy.get(".D_ays > .D_rR > .D_rS").click();

    // // 觀塘鐵路站
    // cy.get(".D_ays > .D_rR > .D_rS").type("觀塘鐵路站");
    // // click the first one
    // cy.get(".D_ayt > :nth-child(2)").click();

    // // click mail delivery
    // cy.get(":nth-child(4) > .D_ur > .D_uy > .D_lg").click();

    // // click list now
    // cy.get("form > .D_apu > .D_ot").click();
  });
});
