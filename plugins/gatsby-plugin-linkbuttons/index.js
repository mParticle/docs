const visit = require('unist-util-visit');

// Make sure this renders the same as /src/components/LogoLinkButton

const renderLogoLinkButton = (label, path, iconClassName) =>
    [
        `<a class='logo-link-button' href='${path}'>`,
        `<span class='icon logo-link-button-logo ${iconClassName}'></span>`,
        `<span class='logo-link-button-text'>${label}</span>`,
        '<span class="icon logo-link-button-arrow"></span>',
        '</a>',
    ].join('');

const transformLinkButtons = ({ markdownAST }) => {
    visit(markdownAST, 'html', (node) => {
        if (node.value.indexOf('<LogoLinkButton') >= 0) {
            const label = node.value.match(/label='(.*?)'/)[1];
            const path = node.value.match(/path='(.*?)'/)[1];
            const iconClassName = node.value.match(/icon='(.*?)'/)[1];

            node.value = renderLogoLinkButton(label, path, iconClassName);
        }
    });
};

module.exports = transformLinkButtons;
