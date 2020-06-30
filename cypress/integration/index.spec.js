/// <reference types="Cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should have a demo button', () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });
    cy.get('.offsite-button').should('have.text', 'Explore Demo Now').click();
    cy.get('@windowOpen').should(
      'be.calledWith',
      'https://demo.mparticle.com/?utm_source=docs'
    );
  });
});

describe('Developers', () => {
  beforeEach(() => {
    cy.visit('developers/');
  });

  it('should have a web sdk', () => {
    cy.get('.dev-sdk-tiles > [data-cy=dev-tile-Web] > .content > p').click();
    cy.get('h1').should('have.text', 'Getting Started');
    cy.get('[data-cy=toc-link] > .active')
      .should('have.class', 'active')
      .should('have.text', 'Getting Started');
    cy.get('.sdk-widget > .docs-header-home-link').should(
      'have.attr',
      'href',
      'https://github.com/mParticle/mparticle-sdk-javascript'
    );
    cy.get('.edit-page-widget > .docs-header-home-link').should(
      'have.attr',
      'href',
      'https://github.com/mparticle/docs/blob/development/src/pages/developers/sdk/web/getting-started/index.md'
    );
  });

  it('should have a media sdk', () => {
    cy.get('[data-cy=dev-tile-media-sdk-web-learn-more] > .content').click();
    cy.get('h1').should('have.text', 'Media');
    cy.get('[data-cy=toc-link] > .active')
      .should('have.class', 'active')
      .should('have.text', 'Media');
    cy.get('.sdk-widget > .docs-header-home-link').should(
      'have.attr',
      'href',
      'https://github.com/mParticle/mparticle-web-media-sdk'
    );
    cy.get('.edit-page-widget > .docs-header-home-link').should(
      'have.attr',
      'href',
      'https://github.com/mparticle/docs/blob/development/src/pages/developers/sdk/web/media/index.md'
    );
  });
});
