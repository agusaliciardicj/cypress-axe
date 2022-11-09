/// <reference types="cypress" />

//https://www.youtube.com/watch?v=gRHwcIVDr8U

function basicReport(violations) {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  );

  cy.writeFile(`cypress/fixtures/output/basic_report.json`, violationData);

  cy.task("table", violationData);
}

function completeReport(violations) {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`
  );
  // pluck specific keys to keep the table readable
  cy.writeFile(`cypress/fixtures/output/violations.json`, violations);
  const violationData = violations.map(
    ({ id, impact, tags, description, help, helpUrl, nodes, nodesQty }) => ({
      id,
      impact,
      tags,
      description,
      help,
      helpUrl,
      nodes,
      nodesQty: nodes.length,
    })
  );

  cy.writeFile(`cypress/fixtures/output/complete_report.json`, violationData);

  cy.task("table", violationData);
}

describe("Accesibility", () => {
  //Without parameter
  it("Basic Test (all the elements-no reports)", () => {
    cy.visit("https://www.claro.com.ar/personas");
    cy.injectAxe();
    cy.checkA11y();
  });

  //1 parameter: one element
  it("Basic Test (one elements-no reports)", () => {
    cy.visit("https://www.claro.com.ar/personas");
    cy.injectAxe();
    cy.checkA11y("div.search-container");
  });

  //1 parameter: less one element
  it("Basic Test (all the page less one elements-no reports)", () => {
    cy.visit("https://www.claro.com.ar/personas");
    cy.injectAxe();
    cy.checkA11y({ exclude: ["div.search-container"] });
  });

  //2 parameter: filter by impacts
  it("Basic Test (all the page less one elements-no reports)", () => {
    cy.visit("https://www.claro.com.ar/personas");
    cy.injectAxe();
    cy.checkA11y(null, { includedImpacts: ["critical"] });
  });

  //3 parameter: reports (terminal and log)
  it("Basic Test (all the page-basic json reports)", () => {
    cy.visit("https://www.claro.com.ar/personas");
    cy.injectAxe();
    cy.checkA11y(null, null, basicReport);
  });

  it("Basic Test (all the page-complete json reports)", () => {
    cy.visit("https://www.claro.com.ar/personas");
    cy.injectAxe();
    cy.checkA11y(null, null, completeReport);
  });
});
