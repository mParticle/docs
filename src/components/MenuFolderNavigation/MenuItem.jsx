import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'gatsby';
import './_menuitem.less';

const MenuItem = ({ label, path, icon }) => (
    <li className='listing'>
        <Link
            data-cy='toc-link'
            className='toc-link'
            key={path}
            to={path}
            activeClassName='active'>
            <span className={cx('icon', icon)} />
            <span className='toc-link-text'>{label}</span>
        </Link>
    </li>
);

MenuItem.propTypes = {
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

MenuItem.defaultProps = {
    icon: '',
};

export default MenuItem;
