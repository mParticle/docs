import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import LeftColumn from './LeftColumn';
import CenterColumn from './CenterColumn';
import RightColumn from './RightColumn';
import MainLayout from '../../layouts/MainLayout';
import './_pageLayout.less';

const PageLayout = ({
    className,
    metadata,
    seoTitle,
    children,
}) => (
    <MainLayout metadata={metadata} seoTitle={seoTitle}>
        <div className={cx('docs-content', 'centered-fixed-width', 'three-column-layout', className)}>
            {children}
        </div>
    </MainLayout>
);

PageLayout.LeftColumn = LeftColumn;
PageLayout.CenterColumn = CenterColumn;
PageLayout.RightColumn = RightColumn;

PageLayout.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    metadata: PropTypes.object,
    seoTitle: PropTypes.string,
};

PageLayout.defaultProps = {
    className: '',
    metadata: null,
    seoTitle: '',
};

export default PageLayout;
