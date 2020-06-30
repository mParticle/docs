/// <reference types="Cypress" />

describe('Markdown Template', () => {
  beforeEach(() => {
    cy.visit('/developers/sdk/web/');
  });
  describe('Body', () => {
    it('should have markdown body', () => {
      cy.get('.markdown').should('exist');
    });
    it('should have a header ', () => {
      cy.get('h1').should('have.text', 'Getting Started');
    });
    it('should have a source code button ', () => {
      cy.get('.sdk-widget > .docs-header-home-link').should(
        'have.attr',
        'href',
        'https://github.com/mParticle/mparticle-sdk-javascript'
      );
    });
    it('should have an edit button ', () => {
      cy.get('.edit-page-widget > .docs-header-home-link').should(
        'have.attr',
        'href',
        'https://github.com/mparticle/docs/blob/development/src/pages/developers/sdk/web/getting-started/index.md'
      );
    });
  });

  describe('Right rail', () => {
    beforeEach(() => {
      cy.visit('/developers/server/http/');
    });

    it('should have an active header toc link', () => {
      cy.get('[aria-current="page"] > .active')
        .should('contain', 'HTTP API')
        .click();
      cy.url().should('be', '/developers/server/http/');
    });
    it('should have working toc links', () => {
      cy.get('li.child').first().click();
      cy.url().should('contain', '#overview');
      cy.get('#overview').should('contain', 'Overview');
    });
    it('should have collapsible toc links', () => {
      cy.get(':nth-child(6) > .heading-nav-element').should('not.be.visible');
      cy.get(':nth-child(7) > .heading-nav-element').should('not.be.visible');
      cy.get(':nth-child(8) > .heading-nav-element').should('not.be.visible');
      cy.get('li.parent').first().click();
      cy.get(':nth-child(6) > .heading-nav-element').should('be.visible');
      cy.get(':nth-child(7) > .heading-nav-element').should('be.visible');
      cy.get(':nth-child(8) > .heading-nav-element').should('be.visible');
      cy.url().should('contain', '#paths');
    });
  });
});
