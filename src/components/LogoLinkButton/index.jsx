import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import cx from 'classnames';
import './_logo-link-button.less';

const LogoLinkButton = ({
    className,
    label,
    icon,
    path,
}) => (
    <Link className={cx('logo-link-button', className)} to={path}>
        <span className={cx('icon', 'logo-link-button-logo', icon)} />
        <span className='logo-link-button-text'>{label}</span>
        <span className='icon logo-link-button-arrow' />
    </Link>
);

LogoLinkButton.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    className: PropTypes.string,
};

LogoLinkButton.defaultProps = {
    className: '',
};

export default LogoLinkButton;
