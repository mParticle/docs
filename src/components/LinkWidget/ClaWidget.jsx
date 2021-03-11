import React from 'react';
import PropTypes from 'prop-types';
import LinkWidget from '.';

const ClaWidget = ({ url }) => (
    <LinkWidget
        className='cla-widget'
        url={url}
        icon='github-icon'
        arrowIcon='arrow-right-icon'
        label='Go to Github' />
);

ClaWidget.propTypes = {
    url: PropTypes.string.isRequired,
};

export default ClaWidget;
