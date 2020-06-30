/// <reference types="Cypress" />

describe('Integration Markdown Template', () => {
  beforeEach(() => {
    cy.visit('/integrations/google-ads/event/');
  });

  describe('Body', () => {
    it('should have markdown body', () => {
      cy.get('.markdown').should('exist');
    });
    it('should have a header ', () => {
      cy.get('h1').should('have.text', 'Event');
    });
    it('should have an edit button ', () => {
      cy.get('.edit-page-widget > .docs-header-home-link').should(
        'have.attr',
        'href',
        'https://github.com/mparticle/docs/blob/development/src/pages/integrations/google-ads/event/index.md'
      );
    });
  });

  describe('Right rail', () => {
    it('should have an active header toc link', () => {
      cy.get('[aria-current="page"] > .active')
        .should('contain', 'Event')
        .click();
      cy.url().should('be', '/integrations/google-ads/event/');
    });
    it('should have working toc links', () => {
      cy.get('li.child').first().click();
      cy.url().should('contain', '#native-apps-integration');
      cy.get(':nth-child(1) > .heading-nav-element').should(
        'contain',
        'Native Apps Integration'
      );
    });
    it('should have collapsible toc links', () => {
      cy.get(':nth-child(2) > .heading-nav-element').should('not.be.visible');
      cy.get(':nth-child(3) > .heading-nav-element').should('not.be.visible');
      cy.get('li.parent').first().click();
      cy.get(':nth-child(2) > .heading-nav-element').should('be.visible');
      cy.get(':nth-child(3) > .heading-nav-element').should('be.visible');
      cy.url().should('contain', '#native-apps-integration');
    });

    it('should have a category section', () => {
      cy.get('.category-chooser').should('contain.text', 'Categories');
      cy.get('.conversion > .toc-link')
        .should('contain.text', 'Conversion Tracking')
        .should(
          'have.attr',
          'href',
          '/integrations/?category=Conversion%20Tracking'
        );
    });
  });
});

describe('Integrations Index', () => {
  beforeEach(() => {
    cy.visit('/integrations');
  });

  describe('Body', () => {
    it('should have a body tag', () => {
      cy.get('.integration-home').should('exist');
    });

    it('should have a filter dropdown', () => {
      cy.get('#integration-filter').should('not.be.visible');
      cy.get('.filter-category')
        .should('exist')
        .should('have.text', 'Filter by integration type')
        .click();
      cy.get('#integration-filter').should('be.visible');
    });

    it('should filter integrations', () => {
      cy.get('.integration').then(($items) => {
        const totalItems = $items.length;
        cy.get('.filter-category').click();
        cy.get('.tags-list > :nth-child(2)').click();
        cy.get('.integration').should('have.length.lessThan', totalItems);
      });
    });
  });

  describe('Right rail', () => {
    it('should exist', () => {
      cy.get('.category-chooser').should('exist');
      cy.get('.categories .toc-link').should('have.length.greaterThan', 3);
    });

    it('should filter integrations', () => {
      cy.get('.categories .toc-link').then(($items) => {
        const totalItems = $items.length;
        cy.get(
          ':nth-child(2) > .categories > :nth-child(5) > .toc-link'
        ).click();

        cy.get('.integration').should('have.length.lessThan', totalItems);
      });
    });
  });
});
