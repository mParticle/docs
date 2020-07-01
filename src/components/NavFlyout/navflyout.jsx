import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { routePropTypes } from '../../utils/routes';
import NavFlyoutItem, { NavToggleState } from './navflyoutitem';
import { addGlobalEventListener, removeGlobalEventListener } from '../../utils/misc';

import './_navflyout.less';

// TODO -- Is there a better way to get this data?  The only way to not 'overfetch' that
// I can think of is to trigger new data fetches whenever a node is expanded.  Not sure
// How that is supported in gatsby, but that is also going to trigger an http request for each
// 'expand' so maybe this is a better performing solution

export const deepFragment = graphql`
    fragment DeepTree on PageMetadata {
        title
        path
        metadataChildren {
            title
            path
            metadataChildren {
                title
                path
                metadataChildren {
                    title
                    path
                    metadataChildren {
                        title
                        path
                        metadataChildren {
                            title
                            path
                            metadataChildren {
                                title
                                path
                            }
                        }
                    }
                }
            }
        }
    }
`;

const FlyoutRootInternal = (props) => {
    const roots = [
        props.data.developerRoot,
        props.data.integrationsRoot,
        props.data.platformsRoot,
    ];

    return (
        <div className='flyout-content'>
            <div className='top-bar'><button className='close-icon' /></div>
            <div className='nav-items'>
                {
                    roots.map((route) => (
                        <NavFlyoutItem
                            key={route.path}
                            expanded={NavToggleState.AUTO}
                            route={route}
                            location={props.location} />
                    ))
                }
            </div>
        </div>
    );
};

FlyoutRootInternal.propTypes = {
    location: routePropTypes.location.isRequired,
    data: PropTypes.shape({
        developerRoot: routePropTypes.pageMetadata,
        integrationsRoot: routePropTypes.pageMetadata,
        platformsRoot: routePropTypes.pageMetadata,
    }).isRequired,
};

const FlyoutRoot = (props) => (
    <StaticQuery
        query={graphql`
        query {
            developerRoot: pageMetadata (path: {eq: "/developers/"}) {
                ...DeepTree
            }
            integrationsRoot: pageMetadata (path: {eq: "/integrations/"}) {
                ...DeepTree
            }
            platformsRoot: pageMetadata (path: {eq: "/guides/"}) {
                ...DeepTree
            }
        }
    `}
        render={(data) => <FlyoutRootInternal location={props.location} data={data} />} />
);

FlyoutRoot.propTypes = {
    location: routePropTypes.location.isRequired,
};

class NavFlyout extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
        };

        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (this.state.open) {
            this.close();
            return;
        }

        this.setState({
            open: true,
        });

        addGlobalEventListener('onclick', this.handleOutsideClick);
    }

    close() {
        this.setState({
            open: false,
        });

        removeGlobalEventListener('onclick', this.handleOutsideClick);
    }

    handleOutsideClick(event) {
        const el = event.target;

        if (el.matches('.click-catch') || el.matches('.close-icon') || el.matches('.nav-flyout-item a')) {
            document.body.style.overflow = 'auto';
            this.close();
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    render() {
        return (
            <div className='nav-flyout'>
                <button className='open-icon' onClick={this.onClick} />
                {
                    this.state.open
                        ? <div className='click-catch' />
                        : null
                }
                {
                    this.state.open
                        ? <FlyoutRoot location={this.props.location} />
                        : null
                }
            </div>
        );
    }
}

NavFlyout.propTypes = {
    location: routePropTypes.location.isRequired,
};

export default NavFlyout;
