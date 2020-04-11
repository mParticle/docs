import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const DevTile = ({ data }) => (
    <Link
        to={`/developers/${data.route}`}
        className='dev-tile'>
        <div className='content'>
            <p>{data.title}</p>
        </div>
    </Link>
);

export default DevTile;

DevTile.propTypes = {
    data: PropTypes.shape({
        route: PropTypes.string,
        title: PropTypes.string
    }).isRequired
};

DevTile.defaultProps = {
    data: {
        route: '',
        title: ''
    }
};
