const visit = require('unist-util-visit');
const path = require('path');

const imagePrefix = ({ markdownAST }, { pathPrefix }) => {
  if (pathPrefix) {
    visit(markdownAST, 'image', (node) => {
      // Ignore external urls
      if (!node.url.match(/^https?:\/\/|^\/\//i)) {
        node.url = path.join('/', pathPrefix, node.url);
      }
    });
  }

  return markdownAST;
};

module.exports = imagePrefix;
