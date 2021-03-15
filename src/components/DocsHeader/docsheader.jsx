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

        // TODO: Remove this when search is refactored
        this.state = { searchOpen: false };
        this.closeSearch = false;
        this.homeActive = this.props.location.pathname === '/';

        this.openSearch = this.openSearch.bind(this);
    }

    isActive(pathname) {
        return this.props.location.pathname.indexOf(pathname) >= 0;
    }

    openSearch(which) {
        this.setState({
            searchOpen: which,
        });
    }

    render() {
        return (
            <div className='docs-header-crumb'>
                <div className={`docs-header ${this.homeActive ? 'home' : ''}`}>
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
                            className={`header-links ${this.isActive('/guides/') ? 'active' : ''}`}
                            to='/guides/'>
                            <span>Guides</span>
                        </Link>
                        <Link
                            className={`header-links ${this.isActive('/developers/') ? 'active' : ''}`}
                            to='/developers/'>
                            <span>Developers</span>
                        </Link>
                        <Link
                            className={`header-links ${this.isActive('/integrations/') ? 'active' : ''}`}
                            to='/integrations/'>
                            <span>Integrations</span>
                        </Link>
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
