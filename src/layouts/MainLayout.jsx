/* eslint-disable quotes */
import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import SEO from '../components/SEO';
import '../styles/main.less';

const MainLayout = (props) => {
    const { children } = props;

    const title = 'mParticle documentation';
    const description =
        'mParticle Developer Documentation, API Reference and SDK Guides';

    return (
        <div className={cx('docs-app')}>
            <SEO title={title} description={description} />
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
};

MainLayout.defaultProps = {
    metadata: {},
};

export default MainLayout;
