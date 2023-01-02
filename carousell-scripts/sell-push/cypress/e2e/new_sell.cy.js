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
    cy.xpath('//*[@id="ReactModalPortal-LOGIN"][1]')
      .xpath("(.//button)[3]")
      .click();

    cy.debug("wait for capcha");
    cy.wait(1000 * 60);

    cy.visit(`${TEST_STUB}/sell/`);

    // add new sell item
    cy.xpath("(.//input)[1]").selectFile("cypress\\e2e\\test_photo.png", {
      force: true,
    });
    cy.wait(1000);
    // cy.get(".D_xP").click();

    cy.get("p").contains("Select a category").click();
    // cy.get(".D_rS").type("Printers, Scanners & Copiers");
    cy.xpath('(.//input[@placeholder="Search for a category..."])[1]').type(
      "Printers, Scanners & Copiers"
    );

    cy.wait(1000);
    cy.get(".D_yb").click();
    cy.get(":nth-child(1) > .D_yj > .D_rR > .D_rS").type("3d printout selling");
    cy.get(":nth-child(2) > .D_zP > .D_zR > :nth-child(1)").click();

    // cy.get(":nth-child(4) > .D_rR > .D_rS").type("0.5");
    cy.xpath('(.//input[@placeholder="Price of your listing"])[1]').type("0.5");

    // cy.get(".D_mI").type("3d printout content");
    cy.xpath(
      '(.//textarea[@placeholder="Describe what you are selling and include any details a buyer might be interested in. People love items with stories!"])[1]'
    ).type("3d printout content");

    // brand
    cy.xpath(`(.//input[@aria-label="Brand"])[1]`).type("Others");
    cy.xpath(`(.//div[@data-testid="Others"])[1]`).click();

    // click meet up
    cy.get("p").contains("Meet-up").click();
    cy.wait(1000);
    // click add location
    cy.get("span").contains("Add location").click({ force: true });

    // 觀塘港鐵站巴士總站
    // cy.get(".D_ays > .D_rR > .D_rS").type("觀塘港鐵站巴士總站");
    cy.xpath('.//input[@aria-label="Add location"]').type("觀塘港鐵站巴士總站");
    cy.wait(5000);
    // click the first one
    cy.get("p")
      .contains("Kwun Tong MTR Station Bus Terminus 觀塘港鐵站巴士總站")
      .click({ force: true });
    cy.get("p")
      .contains("Kwun Tong MTR Station Bus Terminus 觀塘港鐵站巴士總站")
      .click({ force: true });
    cy.get("p")
      .contains("Kwun Tong MTR Station Bus Terminus 觀塘港鐵站巴士總站")
      .click({ force: true });
    // click mail delivery
    cy.get("p").contains("Mailing & Delivery").click();
    // cy.get("textarea").contains("Are there additional mailing or delivery fees and options?").type("可代寄 香港郵政 / 順風");
    cy.xpath(
      '(.//textarea[@placeholder="Are there additional mailing or delivery fees and options?"])[1]'
    ).type("可代寄 香港郵政 / 順風");

    // // click list now
    cy.get("button").contains("List now").click();
  });
});
