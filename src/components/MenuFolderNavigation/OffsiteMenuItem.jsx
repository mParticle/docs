import React from 'react';
import PropTypes from 'prop-types';
import './_menuitem.less';

// TODO: Refactor this with offsite menu component for top nav
const OffsiteMenuItem = ({ label, path }) => (
    <li className='listing'>
        <a
            data-cy='toc-offsite-link'
            className='toc-link offsite'
            key={path}
            href={path}
            target='_blank'
            rel='noopener noreferrer'>
            <span className='text'>{label}</span>
            <span className='icon' />
        </a>
    </li>
);

OffsiteMenuItem.propTypes = {
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default OffsiteMenuItem;
