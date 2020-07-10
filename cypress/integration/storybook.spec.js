/// <reference types="Cypress" />

function iget(doc, selector) {
    return cy.wrap(doc.find(selector));
}

describe('Storybook', () => {
    beforeEach(() => {
        cy.visit('http://localhost:6006/');
    });

    describe('Helpful Module', () => {
        it('should exist', () => {
            cy.get('#misc--helpful-module').click();
            cy.get('#storybook-preview-iframe').then(($iframe) => {
                const doc = $iframe.contents();
                iget(doc, '.helpful').should(
                    'contain.text',
                    'Was this page helpful?',
                );
                iget(doc, '[data-cy=yes-btn]').should('contain.text', 'Yes');
                iget(doc, '[data-cy=no-btn]').should('contain.text', 'No');
            });
        });
    });

    describe('Offsite Button', () => {
        beforeEach(() => {
            cy.get('#offsitebutton').click();
            cy.get('#offsitebutton--demo-button').click();
        });
        // Cannot test click action as this is served within an iframe
        // This will be tested in index.spec.js
        it('should exist', () => {
            cy.get('#storybook-preview-iframe').then(($iframe) => {
                const doc = $iframe.contents();
                iget(doc, '.offsite-button').should(
                    'have.text',
                    'Explore Demo Now',
                );
            });
        });
    });
});
