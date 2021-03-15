import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const Body = ({ children, className }) => (
    <p className={cx('content-card-body', className)}>{children}</p>
);

Body.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

Body.defaultProps = {
    className: '',
};

export default Body;
