import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { routePropTypes } from '../../utils/routes';

export const NavToggleState = {
    OFF: 0,
    ON: 1,
    AUTO: 2,
};

class NavFlyoutItem extends React.Component {
    constructor(props) {
        super();
        const { pathname } = props.location;
        const routePath = props.route.path;
        const inActivePath = routePath && (pathname.indexOf(routePath) === 0);
        const isCurrentPage = inActivePath && (pathname.length === routePath.length);
        this.state = {
            expanded: props.expanded === NavToggleState.AUTO
                && inActivePath
                && !isCurrentPage ? NavToggleState.AUTO : NavToggleState.OFF,
        };

        this.toggleExpanded = () => {
            this.setState({
                expanded: this.state.expanded ? NavToggleState.OFF : NavToggleState.ON,
            });
        };
    }

    render() {
        const { pathname } = this.props.location;
        const routeTitle = this.props.route.title;
        const routePath = this.props.route.path;
        const inActivePath = routePath && (pathname.indexOf(routePath) === 0);
        const isCurrentPage = inActivePath && (pathname.length === routePath.length);
        const hasChildRoutes = this.props.route.metadataChildren
            && this.props.route.metadataChildren.length > 0;

        if (!routeTitle || !routePath) {
            return null;
        }
        let className = 'nav-flyout-item';
        if (isCurrentPage) {
            className += ' active';
        }
        if (hasChildRoutes) {
            className += ' parent';
        }
        if (this.state.expanded) {
            className += ' expanded';
        }

        return (
            <div className={className}>
                <div className='content'>
                    <Link
                        className='nav-flyout-link'
                        to={routePath}>
                        { routeTitle }
                    </Link>
                    {
                        hasChildRoutes
                            ? <button className='toggle' onClick={this.toggleExpanded} />
                            : null
                    }
                </div>
                {
                    hasChildRoutes && this.state.expanded
                        ? this.props.route.metadataChildren.map((route) => (
                            <NavFlyoutItem
                                key={route.path}
                                expanded={this.state.expanded === NavToggleState.AUTO
                                    ? NavToggleState.AUTO
                                    : NavToggleState.OFF}
                                route={route}
                                location={this.props.location} />
                        ))
                        : null
                }
            </div>
        );
    }
}

NavFlyoutItem.propTypes = {
    route: routePropTypes.pageMetadata.isRequired,
    location: routePropTypes.location.isRequired,
    expanded: PropTypes.number.isRequired,
};

export default NavFlyoutItem;
