import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Heading from './Heading';
import Tiles from './Tiles';
import './_card-tile.less';

const CardTile = ({ anchor, className, children }) => (
    <div name={anchor} className={cx('card-tiles', className)}>
        {children}
    </div>
);

CardTile.Heading = Heading;
CardTile.Tiles = Tiles;

CardTile.propTypes = {
    children: PropTypes.node.isRequired,
    anchor: PropTypes.string.isRequired,
    className: PropTypes.string,
};

CardTile.defaultProps = {
    className: '',
};

export default CardTile;
