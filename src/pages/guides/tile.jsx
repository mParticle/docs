import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const GuideTile = ({ data }) => (
    <div className='section one guide-tile'>
        <div className='header'>
            <span className='guide-icon' />
            <Link
                className='header-links'
                to={`/guides/${data.route}/`}>
                <p className='title'>{data.title}</p>
            </Link>
        </div>
        <div className='content'>
            <p>{data.content}</p>
            {data.links.map((link) => (
                <Link
                    key={link.link}
                    to={`/guides/${data.route}/${link.link}/`}
                    className='guide-tile-link'>
                    <div className='content'><span>{link.text}</span></div>
                </Link>
            ))}
            <Link
                to={`/guides/${data.route}/`}
                className='guide-tile-link'>
                <div className='content more'><p>Learn More</p></div>
            </Link>
        </div>
    </div>
);

export default GuideTile;

GuideTile.propTypes = {
    data: PropTypes.shape({
        route: PropTypes.string,
        links: PropTypes.array,
        title: PropTypes.string,
        content: PropTypes.string,
    }).isRequired,
};

GuideTile.defaultProps = {
    data: {
        route: '',
        links: [],
        title: '',
        content: '',
    },
};
