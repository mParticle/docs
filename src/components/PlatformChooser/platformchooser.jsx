import React from 'react';
import PropTypes from 'prop-types';
import './_platformchooser.less';

const PlatformChooser = (props) => (
    <div className='platform-chooser'>
        {
            props.options.map((option) => (
                <button
                    key={option.name}
                    className={`chooser ${option.isActive ? 'active' : ''}`}
                    onClick={() => props.callback(option)}>
                    {option.name}
                </button>
            ))
        }
    </div>
);


PlatformChooser.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        isActive: PropTypes.bool
    })).isRequired
};

export default PlatformChooser;
