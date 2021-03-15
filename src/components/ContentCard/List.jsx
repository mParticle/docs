import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const List = ({ children, className }) => (
    <div className={cx('content-card-link-list', className)}>{children}</div>
);

List.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

List.defaultProps = {
    className: '',
};

export default List;
