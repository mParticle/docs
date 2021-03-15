import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'gatsby';

const ContentLink = ({ to, className, label }) => (
    <Link className={cx('content-card-link', className)} to={to}>
        {label}
        <span className='icon' />
    </Link>
);

ContentLink.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

ContentLink.defaultProps = {
    className: '',
};

export default ContentLink;
