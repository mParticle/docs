import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './_columnLeft.less';

const LeftColumn = ({ className, children }) => (
    <div className={cx('column-left', 'left-nav-pane', className)}>
        {children}
    </div>
);

LeftColumn.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

LeftColumn.defaultProps = {
    className: '',
};

export default LeftColumn;
