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
    cy.get('[href="/developers/sdk/web/"] > .content > p').click();
    cy.get('h1').should('have.text', 'Getting Started');
    cy.get('[aria-current="page"]')
      .children()
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
    cy.get(
      '[href="/developers/sdk/web/media/"] > .content > #learn-more'
    ).click();
    cy.get('h1').should('have.text', 'Media');
    cy.get('[aria-current="page"]')
      .children()
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
