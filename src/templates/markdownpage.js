import React from 'react';
import LeftNavLayout from '../layouts/leftnav';
import { graphql } from 'gatsby';
import { routePropTypes } from '../utils/routes';

class MarkdownTemplate extends React.Component {
    render() {
        const { location } = this.props;
        const link = `https://github.com/mparticle/docs/blob/development/src/pages${location.pathname}index.md`;

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
                { location &&
                    <div className='edit-page-widget'>
                        <a
                            className='docs-header-home-link'
                            href={link} target='_blank'
                            rel='noopener noreferrer'>
                            <span className='edit-icon' />Edit this Page
                            <span className='arrow-icon' />
                        </a>
                    </div>
                }
                { sourceCode &&
                  <div className='sdk-widget'>
                    <a
                        className='docs-header-home-link'
                        href={sourceCode} target='_blank'
                        rel='noopener noreferrer'>
                        <span className='github-icon' />Source Code
                        <span className='arrow-icon' />
                    </a>
                  </div>
                }
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

