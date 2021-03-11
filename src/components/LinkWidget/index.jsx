import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './_linkWidget.less';

const LinkWidget = ({
    url,
    label,
    icon,
    arrowIcon,
    className,
}) => (
    <div className={cx('link-widget', className)}>
        <a
            className='link-widget-link'
            href={url}
            target='_blank'
            rel='noopener noreferrer'>
            <span className={icon} />
            <span className='link-widget-text'>{label}</span>
            <span className={arrowIcon} />
        </a>
    </div>
);

LinkWidget.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    arrowIcon: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    className: PropTypes.string,
};

LinkWidget.defaultProps = {
    className: '',
};

export default LinkWidget;
