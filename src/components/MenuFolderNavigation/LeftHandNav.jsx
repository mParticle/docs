import React from 'react';
import PropTypes from 'prop-types';

const LeftHandNavigation = ({ children }) => (
    <div className='left-nav-pane'>{children}</div>
);

LeftHandNavigation.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LeftHandNavigation;
