/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './_menufolder.less';
import MenuItem from './MenuItem';
import OffsiteMenuItem from './OffsiteMenuItem';

class MenuFolder extends React.Component {
    constructor(props) {
        super(props);

        const {
            children,
            level,
            currentLocation,
            collapsable,
        } = props;

        const { pathname } = currentLocation;

        const shouldBeVisible = this.hasActiveChild(children, pathname) || level < 1;

        this.state = {
            visible: shouldBeVisible,
            collapsable,
            currentLocation,
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.toggleVisible = this.toggleVisible.bind(this);
    }

    hasActiveChild(element, pathname) {
        if (!Array.isArray(element)) {
            return null;
        }
        return element.some((child) => child.path === pathname);
    }

    handleKeyDown(event) {
        if (this.state.collapsable) {
            if (event.keyCode === 37) {
                this.setState({ visible: false });
            }
            if (event.keyCode === 39) {
                this.setState({ visible: true });
            }
        }
    }

    handleClick() {
        this.toggleVisible();
    }

    toggleVisible() {
        if (this.state.collapsable) {
            this.setState({ visible: !this.state.visible });
        }
    }

    // eslint-disable-next-line class-methods-use-this
    renderLeaf(label, path, offsiteLink) {
        return offsiteLink ? (
            <OffsiteMenuItem key={label} label={label} path={offsiteLink} />
        ) : (
            <MenuItem key={label} label={label} path={path} />
        );
    }

    renderNode(label, tabIndex, children, level, currentLocation, collapsable) {
        // For some reason, children are coming in with empty attributes
        if (!Array.isArray(children)) {
            return null;
        }

        const nextLevel = level + 1;
        const visibleIcon = this.state.visible ? 'down' : 'right';
        const collapsableCSS = collapsable ? visibleIcon : '';
        const iconClass = cx('icon', collapsableCSS);

        const tocClass = `toc-children ${!this.state.visible ? 'hidden' : ''}`;

        return (
            <li className='listing'>
                <div
                    className='toc-header'
                    onClick={() => this.handleClick(label, visibleIcon)}
                    role='button'
                    tabIndex={tabIndex}
                    onKeyDown={this.handleKeyDown}>
                    <span className={iconClass} />
                    <span className='toc-header-text'>{label}</span>
                </div>
                <ul className={tocClass}>
                    {children.map((child) => (
                        <MenuFolder
                            id={child.id}
                            key={child.id}
                            label={child.label}
                            path={child.path}
                            offsiteLink={child.offsiteLink}
                            level={nextLevel}
                            currentLocation={currentLocation}
                            collapsable={collapsable}>
                            {child.children}
                        </MenuFolder>
                    ))}
                </ul>
            </li>
        );
    }

    render() {
        const {
            label,
            tabIndex,
            children,
            path,
            offsiteLink,
            level,
            currentLocation,
            collapsable,
        } = this.props;

        return children
            ? this.renderNode(
                label,
                tabIndex,
                children,
                level,
                currentLocation,
                collapsable,
            )
            : this.renderLeaf(label, path, offsiteLink);
    }
}

MenuFolder.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    currentLocation: PropTypes.object.isRequired,
    path: PropTypes.string,
    tabIndex: PropTypes.number,
    offsiteLink: PropTypes.string,
    level: PropTypes.number,
    collapsable: PropTypes.bool,
};

MenuFolder.defaultProps = {
    path: '/',
    offsiteLink: null,
    tabIndex: 0,
    children: null,
    level: 0,
    collapsable: true,
};

export default MenuFolder;
