import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './_columnCenter.less';

const CenterColumn = ({ className, children }) => (
    <div className={cx('column-center', className)}>{children}</div>
);

CenterColumn.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

CenterColumn.defaultProps = {
    className: '',
};

export default CenterColumn;
