const docsKey = process.env.GATSBY_ALGOLIA_INDEX_NAME || 'Docs';

const myQuery = `
query {
  pages: allMarkdownRemark(filter: {frontmatter: {title: {ne: ""}, redirect: {eq: null}, noindex: {ne: true}}}) {
    nodes {
      description: excerpt
      frontmatter {
        title
      }
      fields {
        path: slug
      }
      objectID: id
    }
  }
}
`;

const restructureAsData = (arr, key) =>
    arr.map(({ description, frontmatter, fields, ...rest }) => ({
        data: {
            description,
            ...frontmatter,
            ...fields,
        },
        key,
        ...rest,
    }));

const queries = [
    {
        query: myQuery,
        transformer: ({ data }) => restructureAsData(data.pages.nodes, docsKey), // optional
    },
];

module.exports = queries;
