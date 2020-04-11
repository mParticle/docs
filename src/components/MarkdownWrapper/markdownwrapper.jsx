/* eslint eqeqeq: "off", react/no-danger: "off",  no-param-reassign: "off" */

import { graphql } from 'gatsby';

const query = graphql`
query CustomMarkdownMetadataBySlug($slug: String!) {
  pageMetadata(path: { eq: $slug }) {
    id
  }

  javascriptFrontmatter(fields: { slug: { eq: $slug } }) {
    frontmatter {
      title
      order
    }
  }
}`;

export default () => {
    const MarkdownWrapper = () => (
        null
    );

    MarkdownWrapper.query = query;

    return MarkdownWrapper;
};
