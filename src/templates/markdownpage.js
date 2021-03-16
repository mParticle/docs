import path from 'path';
import React from 'react';
import { graphql } from 'gatsby';
import LeftNavLayout from '../layouts/leftnav';
import EditPageWidget from '../components/LinkWidget/EditPageWidget';
import SourceCodeWidget from '../components/LinkWidget/SourceCodeWidget';
import { routePropTypes } from '../utils/routes';

class MarkdownTemplate extends React.Component {
  render() {
    const { location } = this.props;

    const linkPath = path.join(
      '/mparticle/docs/blob/development/src/pages',
      this.props.pageContext.slug,
      'index.md'
    );

        const metadata = this.props.data.pageMetadata;
        const post = this.props.data.markdownRemark;

        let sourceCode = null;

        if (metadata.sourceCode) {
        sourceCode = metadata.sourceCode;
        } else if (
            metadata.metadataParent
            && metadata.metadataParent.sourceCode
        ) {
            sourceCode = metadata.metadataParent.sourceCode;
        }

      return (
        <LeftNavLayout currPath={metadata.path} data={metadata} location={this.props.location}>
            <div className='markdown'>
                <h1>{post.frontmatter.title}</h1>
                <div className='linkWidgets'>
                  { linkPath && <EditPageWidget linkPath={linkPath} /> }
                  { sourceCode &&
                      <SourceCodeWidget sourceCode={sourceCode} />
                  }
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </LeftNavLayout>
    );
  }
}

export default MarkdownTemplate;

export const pageQuery = graphql`
  query MetadataBySlug($slug: String!) {
    pageMetadata(path: { eq: $slug }) {
      ...NavMetadata
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        order
      }
    }
  }`;

MarkdownTemplate.propTypes = {
    location: routePropTypes.location.isRequired
};
