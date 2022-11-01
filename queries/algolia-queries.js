// Our UI is expecting some of our data attributes to be
// underscore, not camel case
/* eslint-disable camelcase */
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
        first_publication_date: createdDatetime
        last_modified_date: modifiedDatetime
      }
      objectID: id
    }
  }
}
`;

const restructureAsData = (arr, key) =>
    arr.map(
        ({
            description,
            frontmatter,
            fields: { first_publication_date, last_modified_date, ...fields },
            ...rest
        }) => ({
            first_publication_date,
            last_modified_date,
            data: {
                description,
                ...frontmatter,
                ...fields,
            },
            key,
            ...rest,
        }),
    );

const queries = [
    {
        query: myQuery,
        transformer: ({ data }) => restructureAsData(data.pages.nodes, docsKey), // optional
    },
];

module.exports = queries;
