import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-scroll';
import './_menuitem.less';

const ScrollMenuItem = ({ label, to }) => (
    <li className='listing'>
        <Link
            data-cy='scroll-toc-link'
            className='toc-link'
            to={to}
            activeclassname='active'
            spy
            smooth='easeInOutQuint'
            hashSpy
            offset={-70}
            duration={500}>
            {label}
        </Link>
    </li>
);

ScrollMenuItem.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default ScrollMenuItem;
