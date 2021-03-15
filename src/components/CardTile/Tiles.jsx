import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const Tiles = ({ className, children }) => (
    <div className={cx('cards', className)}>{children}</div>
);

Tiles.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

Tiles.defaultProps = {
    className: '',
};

export default Tiles;
