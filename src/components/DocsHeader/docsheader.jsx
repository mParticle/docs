/* eslint no-nested-ternary: off */

import React from 'react';
import { Link } from 'gatsby';
import NavFlyout from '../NavFlyout/navflyout';
import Search from '../Search/search';
import { routePropTypes } from '../../utils/routes';
import './_docsheader.less';

class DocsHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchOpen: false };
        this.quickstartActive = this.props.location.pathname.indexOf('/quickstart') >= 0;
        this.developersActive = this.props.location.pathname.indexOf('/developers/') >= 0;
        this.integrationsActive = this.props.location.pathname.indexOf('/integrations/') >= 0;
        this.platformsActive = this.props.location.pathname.indexOf('/guides/') >= 0;
        this.styleCompActive = this.props.location.pathname.indexOf('/style-comp') >= 0;
        this.closeSearch = false;
        this.homeActive = this.props.location.pathname === '/';
        this.homeClass = this.homeActive ? 'home' : '';
        this.openSearch = this.openSearch.bind(this);
        this.title = this.platformsActive
            ? 'Guides'
            : this.integrationsActive
                ? 'Integration Center'
                : this.developersActive
                    ? 'Developer Documentation'
                    : this.homeActive
                        ? 'mParticle Documentation'
                        : '';
    }

    openSearch(which) {
        this.setState({
            searchOpen: which,
        });
    }

    render() {
        return (
            <div className='docs-header-crumb'>
                <div className={`docs-header ${this.homeClass}`}>
                    <div className='pin-left'>
                        <a
                            className='mparticle-logo'
                            href='https://www.mparticle.com'
                            target='_blank'
                            rel='noopener noreferrer'>
                            <span />
                        </a>
                        <Link
                            id='docs-header'
                            className={`docs-header-home-link ${this.homeActive ? 'active' : ''}`}
                            to='/'>
                            <span>Docs</span>
                        </Link>
                    </div>
                    <div className='pin-middle'>
                        <Link
                            className={`header-links ${this.homeActive ? 'active' : ''}`}
                            to='/'>
                            <span>Home</span>
                        </Link>
                        <Link
                            className={`header-links ${this.platformsActive ? 'active' : ''}`}
                            to='/guides/'>
                            <span>Guides</span>
                        </Link>
                        <Link
                            className={`header-links ${this.developersActive ? 'active' : ''}`}
                            to='/developers/'>
                            <span>Developers</span>
                        </Link>
                        <Link
                            className={`header-links ${this.integrationsActive ? 'active' : ''}`}
                            to='/integrations/'>
                            <span>Integrations</span>
                        </Link>

                        {/* <Link
                            className={`header-links ${this.styleCompActive ? 'active' : ''}`}
                            to='/style-comp'>
                            <span>Style Comp</span>
                        </Link> */}
                    </div>
                    <div className='pin-right'>
                        <Search
                            className='search'
                            openSearch={this.openSearch}
                            alwaysShowClose
                            collapsed={this.closeSearch} />
                    </div>
                    <NavFlyout location={this.props.location} />
                </div>
                <div className='search-breadcrumb'>
                    <Search
                        className='search breadcrumb-search'
                        openSearch={this.openSearch}
                        alwaysShowClose
                        collapsed={this.closeSearch} />
                </div>
            </div>
        );
    }
}

DocsHeader.propTypes = {
    location: routePropTypes.location.isRequired,
};

export default DocsHeader;
