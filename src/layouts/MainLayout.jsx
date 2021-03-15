/* eslint-disable quotes */
import React from 'react';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet';
import cx from 'classnames';
import '../styles/main.less';

const MainLayout = (props) => {
    const { children, metadata, seoTitle } = props;

    let title = `${seoTitle ? `${seoTitle} | ` : ''} mParticle Documentation`;
    const description =
        'mParticle Developer Documentation, API Reference and SDK Guides';

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

    return (
        <div className={cx('docs-app')}>
            <Helmet>
                <title>{title}</title>
                <meta name='description' content={description} />
            </Helmet>
            {children}
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
    metadata: PropTypes.shape({
        metadataParent: PropTypes.shape({
            title: PropTypes.string,
        }),
        title: PropTypes.string,
    }),
    seoTitle: PropTypes.string,
};

MainLayout.defaultProps = {
    metadata: {},
    seoTitle: null,
};

export default MainLayout;
