import React, { Component } from 'react';

// const fadeOut = (elem) => {
//     elem.style.border = '1px solid #009a6e';
//     elem.style.transition = 'border .2s';
//     elem.parentElement.parentElement.style.opacity = '0';
//     elem.parentElement.parentElement.style.transition = 'opacity .5s ease-out';
// };

class Helpful extends Component {
    constructor() {
        super();
        this.state = { submitted: false };
        this.no = this.no.bind(this);
        this.yes = this.yes.bind(this);
    }

    no(e) {
        // fadeOut(e.target);
        if (window.mParticle) {
            window.mParticle.logEvent(
                'Page - Not Helpful',
                window.mParticle.EventType.Other,
                {
                    page: e.currentTarget.baseURI,
                },
            );
        }
        this.setState({ submitted: true });
    }

    yes(e) {
        // fadeOut(e.target);
        if (window.mParticle) {
            window.mParticle.logEvent(
                'Page - Helpful',
                window.mParticle.EventType.Other,
                {
                    page: e.currentTarget.baseURI,
                },
            );
        }
        this.setState({ submitted: true });
    }

    render() {
        if (!this.state.submitted) {
            return (
                <div className='helpful'>
                    <div className='left'>
                        <p>Was this page helpful?</p>
                    </div>
                    <div className='right'>
                        <button
                            data-cy='yes-btn'
                            type='button'
                            onClick={this.yes}>
                            Yes
                        </button>
                        <button
                            data-cy='no-btn'
                            type='button'
                            onClick={this.no}>
                            No
                        </button>
                    </div>
                </div>
            );
        }
        return (
            <div className='helpful'>
                <div className='left'>
                    <p>Thanks for your feedback!</p>
                </div>
            </div>
        );
    }
}

export default Helpful;
