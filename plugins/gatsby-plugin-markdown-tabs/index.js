/* eslint-disable no-plusplus */
const visit = require('unist-util-visit');

const getSlug = (text) => text.replace(/\s/g, '-').toLowerCase();
const generateLabel = (slug, label, groupId, index, checked = false) => {
    const cssClass = `tab-toggle tab-toggle-${slug}`;
    const toggleId = `tab-toggle-${slug}-${index}`;

    return [
        `<input class='${cssClass}' id='${toggleId}' type='radio' `,
        `name='tab-toggle-${groupId}'`,
        checked ? 'checked=checked' : '',
        '>',
        `<label for='${toggleId}' class='tab-toggle-label'>${label}</label>`,
        '</input>',
    ].join('');
};

const getToggleCss = (slug) =>
    [
        `.tabs input.tab-toggle-${slug}:checked ~ .tab-content.tab-content-${slug} {`,
        'display:block;',
        '}',
    ].join('');

const tabs = [];

const transformTabs = ({ markdownAST }) => {
    let tabGroupid = 0;
    let tabId = 0;
    let firstTabChecked = false;

    visit(markdownAST, 'html', (node) => {
        if (node.value === '<tabs>') {
            tabGroupid++;
            node.type = 'html';
            node.value = `<div class="tabs tab-group-${tabGroupid}">`;
            node.children = undefined;
        }
    });

    visit(markdownAST, 'html', (node) => {
        if (node.value.indexOf('<tab ') >= 0) {
            const label = node.value.match(/label='(.*)'/)[1];
            const slug = getSlug(label);

            // Push slug to tabs array for css processing later
            tabs.push(slug);

            // First tab should be checked by default
            let checked = false;
            if (!firstTabChecked) {
                console.log('first tab reset', tabId);
                checked = true;
                firstTabChecked = true;
            }

            node.type = 'html';

            node.value = [
                generateLabel(slug, label, tabGroupid, tabId++, checked),
                `<div class="tab-content tab-content-${slug} ">`,
            ].join('');

            node.children = undefined;
        }
    });

    visit(markdownAST, 'html', (node) => {
        if (node.value === '</tab>') {
            // Clear out first tab flag
            firstTabChecked = undefined;
            node.type = 'html';
            node.value = '</div>';
            node.children = undefined;
        }
    });

    visit(markdownAST, 'html', (node) => {
        if (node.value === '</tabs>') {
            const appendHTML = [
                '<style>',
                tabs.map((tab) => getToggleCss(tab)).join(''),
                '</style>',
                '</div>',
            ].join('');
            node.type = 'html';
            node.value = appendHTML;
            node.children = undefined;
        }
    });
    return markdownAST;
};

module.exports = transformTabs;
