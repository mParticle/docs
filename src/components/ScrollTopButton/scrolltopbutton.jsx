import React from 'react';
import { animateScroll as scroll } from 'react-scroll';
import './_scrolltopbutton.less';

const ScrollTopButton = () => (
    <button
        className='scrollTopButton'
        type='button'
        onClick={() => {
            scroll.scrollToTop();
        }}>
        <span className='icon-top' />
    </button>
);

export default ScrollTopButton;
