/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import path from 'path';
import IntegrationLayout from '../layouts/integration';
import EditPageWidget from '../components/LinkWidget/EditPageWidget';
import { routePropTypes } from '../utils/routes';

const IntegrationsMarkdownTemplate = (props) => {
    const { location, data, pageContext } = props;
    const { currPageMetadata: metadata, markdownRemark: post } = data;
    const { frontmatter, html } = post;
    const { title } = frontmatter;

    const linkPath = path.join(
        '/mparticle/docs/blob/development/src/pages',
        pageContext.slug,
        'index.md',
    );

    return (
        <IntegrationLayout currPageMetadata={metadata} location={location}>
            <div className='markdown'>
                <h1>{title}</h1>
                <div className='linkWidgets'>
                    {linkPath && <EditPageWidget linkPath={linkPath} />}
                </div>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </IntegrationLayout>
    );
};

export const pageQuery = graphql`
    query IntegrationMarkdownMetadata($slug: String!) {
        currPageMetadata: pageMetadata(path: { eq: $slug }) {
            ...NavMetadata

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
    }
`;

IntegrationsMarkdownTemplate.propTypes = {
    location: routePropTypes.location.isRequired,
    data: PropTypes.shape({
        currPageMetadata: PropTypes.shape({
            metadataParent: PropTypes.object.isRequired,
        }).isRequired,
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.shape({
                title: PropTypes.string.isRequired,
            }).isRequired,
            html: PropTypes.string.isRequired,
            headings: PropTypes.array,
        }).isRequired,
    }).isRequired,
    pageContext: PropTypes.shape({
        slug: PropTypes.string.isRequired,
    }).isRequired,
};

export default IntegrationsMarkdownTemplate;
