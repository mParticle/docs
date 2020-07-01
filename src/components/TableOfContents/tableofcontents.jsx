/* eslint jsx-a11y/no-static-element-interactions: 'off' */
/* eslint-disable max-len */

import React from 'react';
import { Link, graphql } from 'gatsby';
import HeadingsTOC from '../HeadingsTOC/headingstoc';
import { routePropTypes } from '../../utils/routes';

import './_tableofcontents.less';

const TopLevelLookup = {
    developers: 'Developers',
    integrations: 'Integrations',
    guides: 'Guides',
};

class TableOfContents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
        };
        this.toggleExpand = this.toggleExpand.bind(this);
        this.resetToggle = this.resetToggle.bind(this);

        this.children = [];
        this.siblings = [];
        this.childRoutes = [];
        this.siblingRoutes = [];
        this.sourceCode = null;
    }

    toggleExpand() {
        this.setState({
            expanded: !this.state.expanded,
        });
    }

    resetToggle() {
        this.setState({
            expanded: true,
        });
    }

    render() {
        if (!this.props.metadata || !this.props.metadata.metadataParent) {
            return null;
        }

        if (this.props.metadata.headingsTocOnly) {
            return <HeadingsTOC key='headings' currPath={this.props.metadata.path} />;
        }
        const sectionPath = this.props.metadata.path.split('/');

        const headerSection = this.props.metadata.metadataParent.title;

        let topLevelSection = sectionPath.length > 1 ? sectionPath[1] : '';
        if (topLevelSection === 'general') {
            // link to Docs homepage
            topLevelSection = '';
        }

        const sdkActive = sectionPath.length > 1 && sectionPath[2] === 'sdk';
        const isHighLevel = sectionPath.length < 5;

        return (
            <div className='table-of-contents'>
                <div className='dev-header'>
                    <Link
                        className='toc-link'
                        to={`/${topLevelSection}/`}>
                        <p className='header-section'>{TopLevelLookup[topLevelSection] || 'Docs Homepage'}</p>
                    </Link>
                    {!isHighLevel
                        && (
                            <div>
                                <span className='arrow-up' />
                                {sdkActive && (
                                    <span className='client-sdk'>Client SDK: </span>
                                )}
                                <span className='header-section'>{headerSection}</span>
                            </div>
                        )}
                </div>
                <ul>
                    {this.props.metadata.metadataParent.metadataChildren.reduce((acc, child) => {
                        if (child.path === this.props.metadata.path && this.state.expanded) {
                            acc.push(
                                <Link
                                    data-cy='toc-link'
                                    className='toc-link'
                                    key={child.path}
                                    to={child.path}>
                                    <div
                                        key={child.path}
                                        className={child.path === this.props.metadata.path ? 'active' : ''}>
                                        {isHighLevel
                                            && <span className='arrow-up' />}
                                        <span
                                            className='listing'>
                                            {child.title}
                                        </span>
                                    </div>
                                </Link>,
                            );
                            return acc.concat(<HeadingsTOC
                                key='headings'
                                currPath={this.props.metadata.path} />);
                        } if (child.path === this.props.metadata.path) {
                            acc.push(
                                <Link
                                    data-cy='toc-link'
                                    className='toc-link'
                                    key={child.path}
                                    to={child.path}>
                                    <div
                                        key={child.path}
                                        className='active'>
                                        <span className='plus' />
                                        <span className='listing' onClick={this.toggleExpand}>
                                            {child.title}
                                        </span>
                                    </div>
                                </Link>,
                            );
                        } else if (!isHighLevel) {
                            acc.push(
                                <Link
                                    data-cy='toc-link'
                                    className='toc-link'
                                    key={child.path}
                                    to={child.path}>
                                    <div
                                        className='listing'
                                        key={child.path}>
                                        {child.title}
                                    </div>
                                </Link>,
                            );
                        }
                        return acc;
                    }, [])}
                </ul>
            </div>
        );
    }
}

TableOfContents.propTypes = {
    metadata: routePropTypes.pageMetadata.isRequired,
};

export default TableOfContents;

export const query = graphql`
    fragment NavMetadata on PageMetadata {
        title
        path
        sourceCode
        metadataParent {
            title
            path
            sourceCode
            metadataParent {
                title
                path
            }
            metadataChildren {
                title
                path
                order
            }
        }
    }
`;
