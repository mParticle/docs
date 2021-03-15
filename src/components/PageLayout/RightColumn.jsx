import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './_columnRight.less';

const RightColumn = ({ className, children }) => (
    <div className={cx('column-right', className)}>{children}</div>
);

RightColumn.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

RightColumn.defaultProps = {
    className: '',
};

export default RightColumn;
