import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link, withPrefix } from 'gatsby';
import './_logo-card.less';

const LogoCard = ({
    path,
    imgPath,
    label,
    className,
    altText,
}) => (
    <Link className={cx('logo-card', className)} to={path}>
        <img
            className='logo-card-logo'
            alt={`${altText || label}`}
            src={withPrefix(imgPath)} />
        <span className='logo-card-label'>{label}</span>
    </Link>
);

LogoCard.propTypes = {
    path: PropTypes.string.isRequired,
    imgPath: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    altText: PropTypes.string,
};

LogoCard.defaultProps = {
    className: '',
    label: '',
    altText: '',
    imgPath: '',
};

export default LogoCard;
