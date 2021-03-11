import React from 'react';
import PropTypes from 'prop-types';
import LinkWidget from '.';

const EditPageWidget = ({ linkPath }) => (
    <LinkWidget
        className='edit-page-widget'
        url={`https://github.com${linkPath}`}
        icon='edit-icon'
        label='Edit this Page'
        arrowIcon='arrow-icon' />
);

EditPageWidget.propTypes = {
    linkPath: PropTypes.string.isRequired,
};

export default EditPageWidget;
