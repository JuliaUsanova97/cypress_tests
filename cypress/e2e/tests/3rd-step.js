import {
  submitFirstStep,
  submitSecondStep,
} from "../../../cypress/e2e/lib/functions";
import { archivateCampaign } from "../../../cypress/e2e/lib/functions";

describe("3rd step of creating campaign", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("WEBSITE_URL")}/sign-in`);
    cy.get('[type="submit"]').contains("Auswahl erlauben").click();
    cy.get('[type="email"]').type(Cypress.env("EMAIL"));
    cy.get('[type="password"]').type(Cypress.env("PASSWORD"));
    cy.get('[type="submit"]').contains("Anmelden").click();
    cy.url().should("include", "/dashboard/campaigns", { timeout: 10000 });

    cy.get('[class="sc-1jlncfu-1 loqbsV"]')
      .eq(0)
      .invoke("text")
      .then((text) => {
        if (text === "Entwurf") {
          archivateCampaign();
        }
      });

    cy.contains("button", "Neue Kampagne").should("be.not.disabled").click();

    submitFirstStep();
    submitSecondStep();
  });

  it("Verify that file uploaded correctly to Bilder and delete file", () => {
    cy.contains("button", "Weiter").should("be.disabled");
    cy.contains("button", "Bilder").should("be.visible").click();
    cy.contains("button", "Hochladen").should("be.visible").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.contains("button", "Datei auswählen").should("be.visible");
    cy.get("input[type=file]").selectFile("cypress/fixtures/image-step-3.jpg", {
      force: true,
    });
    cy.contains("image-step-3.jpg");
    cy.contains("button", "Fertig").should("be.disabled");
    cy.wait(2000);
    cy.contains("button", "Fertig").should("not.be.disabled").click();
    cy.get('[role="dialog"]').should("not.exist");
    cy.contains("image-step-3.jpg");
    cy.get('[aria-label="Sieht richtig aus"]').should("exist");
    cy.get('[title="Lösche Datei"]').should("be.visible").click();
    cy.contains("image-step-3.jpg").should("not.exist");
    cy.get('[title="Abbrechen"]').click();
    cy.wait(1000);
    archivateCampaign();
  });

  it("Redirect to the 4th step", () => {
    cy.contains("button", "Bilder").should("be.visible").click();
    cy.contains("button", "Hochladen").should("be.visible").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.contains("button", "Datei auswählen").should("be.visible");
    cy.get("input[type=file]").selectFile("cypress/fixtures/image-step-3.jpg", {
      force: true,
    });
    cy.wait(2000);
    cy.contains("button", "Fertig").should("not.be.disabled").click();
    cy.contains("image-step-3.jpg");
    cy.contains("button", "Weiter").should("not.be.disabled").click();
    cy.contains("h2", "4 / 6 Kapazität").should("exist");
    cy.get('[title="Abbrechen"]').click();
    cy.wait(1000);
    archivateCampaign();
  });
});