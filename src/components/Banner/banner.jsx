import React from 'react';
import './_banner.less';
import PropTypes from 'prop-types';


const Banner = ({ text, learnMoreLink, closeBanner, isVisible = true }) => {
    if (!isVisible)
        return null;

    return (
        <div className='banner'>
            {text}
            <a href={learnMoreLink} onClick={closeBanner}>
                Learn more
                <i />
            </a> 
            <i
                role='button'
                className='close'
                onClick={() => {}}
                onMouseDown={closeBanner}
                onKeyDown={closeBanner}
                tabIndex='0'
                aria-label='Close'
            />
        </div>
    );
};

Banner.propTypes = {
    text: PropTypes.string.isRequired,
    learnMoreLink: PropTypes.string.isRequired,
    closeBanner: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
}

export default Banner;