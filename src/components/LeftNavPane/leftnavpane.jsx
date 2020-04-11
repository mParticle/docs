/* eslint jsx-a11y/no-static-element-interactions: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import { addGlobalEventListener, removeGlobalEventListener } from '../../utils/misc';

import './_leftnavpane.less';

class LeftNavPane extends React.Component {

    constructor(props) {
        super(props);
        this.navRefCallback = (el) => {
            this.navRef = el;
        };
        this.state = {
            toggled: false
        };
        this.paneTopOffset = 85;
        this.onScroll = () => this.forceUpdate();
        this.onToggleFlyout = this.onToggleFlyout.bind(this);
        this.onOutsideClick = this.onOutsideClick.bind(this);
        this.closeFlyout = this.closeFlyout.bind(this);
    }

    componentWillMount() {
        // this.body = document.getElementsByTagName('body')[0];
    }

    componentDidMount() {
        this.body = document.getElementsByTagName('body')[0];
        addGlobalEventListener('onscroll', this.onScroll);
        this.resetTOCHeight();
    }

    componentWillUpdate() {
        this.resetTOCHeight();
    }

    componentWillUnmount() {
        removeGlobalEventListener('onscroll', this.onScroll);
    }

    // TODO:  Looks like toggle is no longer supported - remove this as part of next major change
    onToggleFlyout() {
        addGlobalEventListener('onclick', this.onOutsideClick);
        addGlobalEventListener('onhashchange', this.closeFlyout);
        this.setState({
            toggled: true
        });
    }

    onOutsideClick(event) {
        const el = event.target;
        if (!el.matches('.left-nav-pane *')) {
            this.closeFlyout();
        }
    }
    resetTOCHeight() {
        this.windowHeight = Math.min(this.body.scrollHeight, this.body.offsetHeight);
        this.scrollPos = window.scrollY;
        this.footerView = this.windowHeight - this.scrollPos - document.getElementById('docs-footer').clientHeight - 77;
        this.maxWindowView = Math.min(Math.min((window.innerHeight - 75),
            (window.innerHeight - (160 - this.scrollPos))), this.footerView);
    }

    closeFlyout() {
        removeGlobalEventListener('onclick', this.onOutsideClick);
        removeGlobalEventListener('onhashchange', this.closeFlyout);
        this.setState({
            toggled: false
        });
    }

    render() {
        let leftNavClass = 'top';
        if (this.navRef) {
            if (this.scrollPos < this.paneTopOffset) {
                leftNavClass = 'top';
            } else {
                leftNavClass = 'float';
            }
        }
        leftNavClass += ` left-nav-pane${this.state.toggled ? ' toggled' : ''}`;

        return (
            <div
                ref={this.navRefCallback}
                className={leftNavClass}
                style={{
                    height: this.maxWindowView || '80%',
                    borderRight: '1px solid #f0f0f0' }}>
                {
                    this.props.children
                }
            </div>
        );
    }
}

export default LeftNavPane;

LeftNavPane.propTypes = {
    children: PropTypes.node.isRequired
};
