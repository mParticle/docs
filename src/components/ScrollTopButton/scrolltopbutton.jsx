/* eslint eqeqeq: "off" */

import React from 'react';
import { addGlobalEventListener, removeGlobalEventListener } from '../../utils/misc';

class ScrollTopButton extends React.Component {
    constructor(props) {
        super(props);
        this.onScroll = () => this.forceUpdate();
    }

    componentDidMount() {
        addGlobalEventListener('onscroll', this.onScroll);
    }

    componentWillUnmount() {
        removeGlobalEventListener('onscroll', this.onScroll);
    }

    render() {
        if (typeof window != 'undefined') {
            const windowHeight = window && window.innerHeight;
            let bodyScroll = document && document.body && document.body.scrollTop;
            if (!bodyScroll) {
                bodyScroll = document
                    && document.documentElement
                    && document.documentElement.scrollTop;
            }

            if (windowHeight
                && bodyScroll
                && bodyScroll > (windowHeight / 2)) {
                return (
                    <button id='top' onClick={() => { window.scrollTo(0, 0); }}>
                        <span className='icon-top' />
                    </button>
                );
            }
        }

        return null;
    }
}

export default ScrollTopButton;
