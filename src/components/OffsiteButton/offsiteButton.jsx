import React from 'react';
import PropTypes from 'prop-types';
import './_offsiteButton.less';

// Renders button that clicks off to a new tab
const OffsiteButton = ({ text, url }) => (
    <button
        className='offsite-button'
        onClick={() => {
            if (url) {
                window.open(url, '_blank');
            }
        }}>
        <div className='text'>{text}</div>
        <span className='icon' />
    </button>
);

OffsiteButton.propTypes = {
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};

export default OffsiteButton;
