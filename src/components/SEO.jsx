import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

// Parses Metadata for SEO title and returns formatted string
// i.e. 'Parent Title | Child Title' or 'Title'
export const getSeoTitleFromMetaData = (metadata) => {
    let title;
    if (metadata) {
        if (metadata.title) {
            title = metadata.title;
        }
        if (
            metadata.metadataParent &&
            metadata.metadataParent.title &&
            metadata.metadataParent.title !== title
        ) {
            const parentTitle = metadata.metadataParent.title;
            if (metadata.title) {
                title = `${parentTitle} | ${title}`;
            } else {
                title = parentTitle;
            }
        }
    }
    return title;
};

const SEO = ({ title, description, children }) => (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        {children}
    </Helmet>
);

export default SEO;

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node,
};

SEO.defaultProps = {
    title: 'mParticle documentation',
    description:
        'mParticle Developer Documentation, API Reference and SDK Guides',
    children: null,
};
