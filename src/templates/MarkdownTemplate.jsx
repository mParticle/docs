/* eslint-disable react/no-danger */
import path from 'path';
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import LeftNavLayout from '../layouts/leftnav';
import EditPageWidget from '../components/LinkWidget/EditPageWidget';
import SourceCodeWidget from '../components/LinkWidget/SourceCodeWidget';
import SEO, { getSeoTitleFromMetaData } from '../components/SEO';
import { routePropTypes } from '../utils/routes';

const MarkdownTemplate = (props) => {
    const { data, location, pageContext } = props;
    const { markdownRemark: post, pageMetadata: metadata } = data;
    const { frontmatter, html } = post;
    const { title, seoTitle, seoDescription } = frontmatter;

    const linkPath = path.join(
        '/mparticle/docs/blob/development/src/pages',
        pageContext.slug,
        'index.md',
    );

    let sourceCode = null;

    if (metadata.sourceCode) {
        sourceCode = metadata.sourceCode;
    } else if (metadata.metadataParent && metadata.metadataParent.sourceCode) {
        sourceCode = metadata.metadataParent.sourceCode;
    }

    return (
        <LeftNavLayout
            currPath={metadata.path}
            data={metadata}
            location={location}>
            <SEO
                title={seoTitle || getSeoTitleFromMetaData(metadata)}
                // Gastsby will return null if field does not exist
                description={seoDescription || undefined}
            />
            <div className='markdown'>
                <h1>{title}</h1>
                <div className='linkWidgets'>
                    {linkPath && <EditPageWidget linkPath={linkPath} />}
                    {sourceCode && <SourceCodeWidget sourceCode={sourceCode} />}
                </div>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </LeftNavLayout>
    );
};

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
                seoTitle
                seoDescription
            }
        }
    }
`;

MarkdownTemplate.propTypes = {
    location: routePropTypes.location.isRequired,
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.shape({
                title: PropTypes.string.isRequired,
                seoTitle: PropTypes.string,
                seoDescription: PropTypes.string,
            }).isRequired,
            html: PropTypes.string.isRequired,
            headings: PropTypes.array,
        }).isRequired,
        pageMetadata: PropTypes.object,
    }).isRequired,
    pageContext: PropTypes.shape({
        slug: PropTypes.string,
    }).isRequired,
};

export default MarkdownTemplate;
