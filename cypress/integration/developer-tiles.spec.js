describe('DEV Tiles', () => {
  beforeEach(() => {
    cy.visit('/developers/');
  });

  describe('Upper Row', () => {
    it('test all links', () => {
      cy.get('a.dev-tile').as('links');
      cy.get('@links').then((links) => {
        links.each((index, link) => {
          link.click();
          cy.get('.markdown').should('exist');
        });
      });
    });
  });
  describe('Lower Row', () => {
    it('test header links', () => {
      cy.get('a.header-links').as('headerLinks');
      cy.get('@headerLinks').then((links) => {
        links.each((index, link) => {
          link.click();
          cy.get('.markdown').should('exist');
        });
      });
    });

    it('test learn more links', () => {
      cy.get('a.learn-more').as('learnMoreLinks');
      cy.get('@learnMoreLinks').then((links) => {
        links.each((index, link) => {
          link.click();
          cy.get('.markdown').should('exist');
        });
      });
    });
  });
});
