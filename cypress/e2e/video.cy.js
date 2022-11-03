/// <reference types="cypress" />

//https://www.youtube.com/watch?v=gRHwcIVDr8U

describe("Accesibility", () => {
  it("Should run accesibility audits", () => {
    cy.visit("https://ecommerce-playground.lambdatest.io");
    cy.injectAxe(); //Injects the axe-core runtime

    //Tests all the page
    //cy.checkA11y();

    //Test a specific element
    //cy.checkA11y("#entry_217838 p");

    //Exclude elements for the accesibility test
    cy.checkA11y({ exclude: ["#entry_217838 p"] });
  });
});
