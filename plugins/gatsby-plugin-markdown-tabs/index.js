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
    let currentGroup = '';

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
            const labelMatcher = node.value.match(/label='([a-zA-Z0-9-_ ]+)'/);
            if (!labelMatcher) {
                console.error('A tab group has an invalid label', node);
            }
            const label = labelMatcher[1];

            const groupMatcher = node.value.match(/group='([a-zA-Z0-9-_]+)'/);
            if (!groupMatcher) {
                console.error('A tab group has an invalid group name', node);
            }
            const group = groupMatcher[1];

            const slug = getSlug(label);

            // Push slug to tabs array for css processing later
            tabs.push(slug);

            // Check to see if we're starting a new tab
            // group so we can set first element to checked

            // Reset check status
            let checked = false;

            // Reset check if we're in a new group
            if (currentGroup !== group) {
                currentGroup = group;
                firstTabChecked = false;
            }

            // First tab should be checked by default
            if (!firstTabChecked) {
                checked = true;
                firstTabChecked = true;
            }

            node.type = 'html';

            node.value = [
                generateLabel(slug, label, group, tabId++, checked),
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
