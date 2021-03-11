import React from 'react';
import PropTypes from 'prop-types';
import LinkWidget from '.';

const SourceCodeWidget = ({ sourceCode }) => (
    <LinkWidget
        className='sdk-widget'
        url={sourceCode}
        icon='github-icon'
        label='Source Code'
        arrowIcon='arrow-icon' />
);

SourceCodeWidget.propTypes = {
    sourceCode: PropTypes.string.isRequired,
};

export default SourceCodeWidget;
