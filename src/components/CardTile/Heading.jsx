import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const Heading = ({ children, className }) => (
    <h3 className={cx('card-tiles-heading', className)}>{children}</h3>
);

Heading.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

Heading.defaultProps = {
    className: '',
};

export default Heading;
