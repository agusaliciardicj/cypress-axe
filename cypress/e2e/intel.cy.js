/// <reference types="cypress" />

describe("Accesibility", () => {
  beforeEach(() => {
    cy.visit("https://www.intel.com/content/www/us/en/homepage.html");
    //cy.visit("https://cypress-accessibility-example.vercel.app/");
    cy.injectAxe();
  });

  it("First", () => {
    //https://web.dev/measure/
    /*cy.configureAxe({
      branding: {
        brand: String,
        application: String
      },
      reporter: 'option',
      checks: [Object],
      rules: [Object],
      locale: Object
    })*/
    cy.checkA11y();
  });
});
