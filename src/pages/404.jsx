/* eslint no-undef: 'off', eqeqeq: 'off'   */

import React from 'react';
import { Link } from 'gatsby';
import HeaderFooterLayout from '../layouts/headerfooter';
import { routePropTypes } from '../utils/routes';

class ErrorPage extends React.Component {
    componentDidMount() {
        if (typeof mParticle != 'undefined') {
            mParticle.logPageView('Error 404', { targetUrl: window.location.href });
            this.test = true;
        }
    }

    render() {
        return (
            <HeaderFooterLayout location={this.props.location}>
                <div className='main-content not-found'>
                    <h1>Not Found</h1>
                    <p>You hit a page that does not exist.</p>
                    <Link to={'/'}>
                        Return to the home page
                    </Link>
                </div>
            </HeaderFooterLayout>
        );
    }
}

ErrorPage.propTypes = {
    location: routePropTypes.location.isRequired
};

export default ErrorPage;
