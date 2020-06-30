import path from 'path';
import React from 'react'
import IntegrationLayout from '../layouts/integration';
import { graphql } from 'gatsby';
import { routePropTypes } from '../utils/routes';

class IntegrationMarkdownTemplate extends React.Component {
  render() {
    const metadata = this.props.data.currPageMetadata;
    const post = this.props.data.markdownRemark;
    const { location } = this.props;

    const linkPath = 
      path.join(
        '/mparticle/docs/blob/development/src/pages',
        this.props.pageContext.slug,
        'index.md'
      );
    const link = `https://github.com${linkPath}`;

    return (
      <IntegrationLayout currPageMetadata={metadata} location={this.props.location}>
        <div className="markdown">
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
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </IntegrationLayout>
    )
  }
}

export default IntegrationMarkdownTemplate

export const pageQuery = graphql`
  query IntegrationMarkdownMetadata($slug: String!) {
    currPageMetadata: pageMetadata(path: { eq: $slug }) {
      ...NavMetadata
      ...BreadcrumbMetadata

      metadataParent {
        partnerId
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }`;

IntegrationMarkdownTemplate.propTypes = {
    location: routePropTypes.location.isRequired
};

