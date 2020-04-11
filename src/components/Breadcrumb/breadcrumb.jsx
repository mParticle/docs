import React from 'react';
import { Link, graphql } from 'gatsby';
import Search from '../Search/search';
import { PageMetadataShape } from '../../utils/routes';

class Breadcrumb extends React.Component {
    constructor(props) {
        super(props);
        this.openSearch = this.openSearch.bind(this);

        this.state = {
            searchOpen: false
        };
    }

    componentWillMount() {
        this.setState({
            searchOpen: false
        });
    }

    componentDidMount() {
        window.onresize = () => {
            this.currentWidth = window.innerWidth;
        };
        this.currentWidth = window.innerWidth;
    }

    openSearch(which) {
        this.setState({
            searchOpen: which
        });
    }

    render() {
        const backwardsCrumbs = [];
        let node = this.props.metadata;

        if (!node) {
            return null;
        }
        while (node) {
            if (node.title && !node.noBreadcrumb) {
                backwardsCrumbs.push({
                    title: node.title,
                    path: node.path,
                    showWhenLast: node.showWhenLast
                });
            }
            node = node.metadataParent;
        }
        const breadcrumbs = backwardsCrumbs.reverse();

        if (breadcrumbs.length > 0) {
            if (breadcrumbs[breadcrumbs.length - 1].showWhenLast) {
                breadcrumbs[breadcrumbs.length - 1].removeLink = true;
            } else {
                breadcrumbs.pop();
            }
        }

        if (breadcrumbs.length === 0) {
            return null;
        }

        const currentMin = breadcrumbs.reduce((all, item, i) => {
            let currentTotal = all;
            currentTotal += (item.title.length * 13);

            if (i > 0) {
                currentTotal += 48;
            }
            return currentTotal;
        }, 550);

        if (this.state.searchOpen && this.currentWidth < currentMin) {
            return (
                <div className='sbreadcrumb'>
                    <Search openSearch={this.openSearch} alwaysShowClose collapsed />
                    <Link
                        key={breadcrumbs[0].title}
                        to={breadcrumbs[0].path}>
                        ...
                    </Link>
                    {
                        breadcrumbs.slice(1).map((crumb) => (
                            crumb.removeLink
                                ? <span key={crumb.title}>{crumb.title}</span>
                                : (<Link
                                    key={crumb.title}
                                    to={crumb.path}>
                                    {crumb.title}
                                </Link>)
                        ))
                    }
                </div>
            );
        }
        return (
            <div className='breadcrumb'>
                <Search openSearch={this.openSearch} alwaysShowClose collapsed />
                {
                    breadcrumbs.map((crumb) => (
                        crumb.removeLink
                            ? <span key={crumb.title}>{crumb.title}</span>
                            : (<Link
                                key={crumb.title}
                                to={crumb.path}>
                                {crumb.title}
                            </Link>)
                    ))
                }
            </div>
        );
    }
}

Breadcrumb.defaultProps = {
    metadata: null
};

Breadcrumb.propTypes = {
    metadata: PageMetadataShape
};

export const query = graphql`
    fragment BreadcrumbMetadata on PageMetadata {
        title
        path
        showWhenLast
        noBreadcrumb
        metadataParent {
            title
            path
            noBreadcrumb
            metadataParent {
                title
                path
                noBreadcrumb
                metadataParent{
                    title
                    path
                    noBreadcrumb
                    metadataParent{
                        title
                        path
                        noBreadcrumb
                        metadataParent{
                            title
                            path
                            noBreadcrumb
                            metadataParent{
                                title
                                path
                                noBreadcrumb
                                metadataParent{
                                    title
                                    path
                                    noBreadcrumb
                                }   
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default Breadcrumb;
