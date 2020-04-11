import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const HomeTile = ({ data }) => (
    <div className='home-tile-middle'>
        <div className='header'>
            <div className='icon-section'>
                <span className={`icon home-tile-middle-icon-${data.order}`} />
            </div>
            <h3>{data.title}</h3>
        </div>
        <div className='content'>
            {data.links.map((link) => (
                <Link
                    key={`${data.route}${link.link}`}
                    className='home-tile-link'
                    to={`/${link.link}/`}>
                    <span>{link.text}</span>
                </Link>
            ))}
            <Link
                key={data.viewAll}
                className='home-tile-link'
                to={`/${data.viewAll}/`}>
                <span className='view-all'>View all</span>
            </Link>
        </div>
    </div>
);

export default HomeTile;

HomeTile.propTypes = {
    data: PropTypes.shape({
        order: PropTypes.number,
        route: PropTypes.string,
        links: PropTypes.array,
        title: PropTypes.string
    }).isRequired
};

HomeTile.defaultProps = {
    data: {
        route: '',
        links: [],
        title: '',
        order: 1
    }
};
