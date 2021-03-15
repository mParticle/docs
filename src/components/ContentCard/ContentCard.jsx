import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Heading from './Heading';
import Body from './Body';
import List from './List';
import Link from './Link';
import './_content-card.less';

const ContentCard = ({ className, iconClassName, children }) => (
    <div className={cx('content-card', className)}>
        <span
            className={cx('icon', 'content-card-icon-header', iconClassName)} />
        {children}
    </div>
);

ContentCard.Heading = Heading;
ContentCard.Body = Body;
ContentCard.Link = Link;
ContentCard.List = List;

ContentCard.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    iconClassName: PropTypes.string,
};

ContentCard.defaultProps = {
    className: '',
    iconClassName: '',
};

export default ContentCard;
