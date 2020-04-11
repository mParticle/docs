import React from 'react'
import LeftNavLayout from '../layouts/leftnav';
import { graphql } from 'gatsby';

class CustomMarkdownWrapper extends React.Component {
  render() {
    const metadata = this.props.data.pageMetadata;
    const post = this.props.data.markdownRemark;

    return (
      <LeftNavLayout currPath={metadata.path} data={metadata} location={this.props.location}>
        <div className="markdown">
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.frontmatter.html }} />
        </div>
      </LeftNavLayout>
    )
  }
}

export default CustomMarkdownWrapper
