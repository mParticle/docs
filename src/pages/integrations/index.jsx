/* eslint max-len: "off" */
/* eslint import/no-webpack-loader-syntax: 'off' */
/* eslint import/first: 'off' */
/* eslint import/no-unresolved: 'off' */
/* eslint no-param-reassign: 'off' */
/* eslint jsx-a11y/no-static-element-interactions: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import { routePropTypes, getQueryMap } from '../../utils/routes';
import { getUpdatedIntegrations } from '../../services/integrations';
import partners from '../../services/partners.json';
import HeaderFooterLayout from '../../layouts/headerfooter';
import CategoryChooser from '../../components/CategoryChooser/categorychooser';
import LeftNavPane from '../../components/LeftNavPane/leftnavpane';
import IntegrationFilter from '../../components/IntegrationFilter/integrationfilter';
import { alphabeticSort, addGlobalEventListener, removeGlobalEventListener } from '../../utils/misc';

import './_integrations.less';

function renderIntegrations(items) {
    return (
        <div className='items'>
            {
                items
                    .filter((item) => item.title)
                    .sort(alphabeticSort('title'))
                    .map((item) => {
                        const imgPath = item.image;
                        return (
                            <Link
                                key={item.value}
                                className='integration logo-host'
                                to={item.value}>
                                <img src={imgPath} alt='' />
                            </Link>
                        );
                    })
                    .concat([1, 2, 3, 4, 5, 6].map((key) => (
                        <span className='filler' key={key} />
                    )))
            }
        </div>
    );
}

const tagOptions = [{
    name: 'Audience',
    value: 'Audience'
},
{
    name: 'Event',
    value: 'Event'
},
{
    name: 'Feed',
    value: 'Feed'
},
{
    name: 'Cookie Sync',
    value: 'Cookie Sync'
},
{
    name: 'Data Warehouse',
    value: 'Data Warehouse'
},
{
    name: 'Audience - LiveRamp',
    value: 'LiveRamp'
}].sort((tagA, tagB) => ((tagA.name > tagB.name) ? 1 : -1));

tagOptions.unshift({
    name: 'All',
    value: 'all'
});

class Integrations extends React.Component {

    constructor(props) {
        super(props);
        this.extensionDataById = {};
        this.state = {
            filter: '',
            filteringByType: false,
            filteringByCategory: false,
            categoryFilter: ''
        };
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.integrations = props.data.pageMetadata.metadataChildren;
        this.closeSearch = this.closeSearch.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.filterFunc = this.filterFunc.bind(this);
    }

    componentDidMount() {
        this.extensionDataById = getUpdatedIntegrations(partners);
        document.addEventListener('keydown', this.escHandler.bind(this), false);
        addGlobalEventListener('onclick', this.handleOutsideClick);
        this.forceUpdate();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escHandler, false);
        removeGlobalEventListener('onclick', this.handleOutsideClick);
    }

    getIntegrationsList(integrationData, category) {
        if (this.state.filteringByCategory) {
            integrationData = integrationData.filter((integration) => {
                const lookup = this.extensionDataById[integration.partnerId];
                if (lookup) {
                    if (this.state.categoryFilter === 'all') {
                        return true;
                    }
                    return Object.prototype.hasOwnProperty.call(lookup, 'ModuleRole')
                        ? lookup.ModuleRole.includes(this.state.categoryFilter)
                        : false;
                }
                return false;
            });
        }

        return integrationData.reduce((acc, route) => {
            const data = route;
            const extensionData = this.extensionDataById[data.partnerId] || {};
            if ((!category || (extensionData && extensionData.categories && extensionData.categories.includes(category))) && !data.draft) {
                acc.push({
                    value: route.path,
                    image: data.partnerImageOverride || extensionData.partnerImage,
                    title: data.title
                });
            }

            return acc;
        }, []);
    }

    handleOutsideClick(e) {
        e.stopPropagation();
        const filter = document.getElementById('integration-filter');
        if (filter) {
            if (
                this.state.filteringByType
                && !document.getElementById('integration-filter').contains(e.target)
                && !e.target.classList.contains('filter-category')
            ) {
                this.setState({ filteringByType: false });
            }
        }
    }

    async escHandler(e) {
        if (e.keyCode === 27) {
            await this.closeSearch();
        }
    }

    async handleFilterChange(e) {
        await this.setState({
            filter: e.target.value
        });
        this.integrations = this.state.filter ?
            this.props.data.pageMetadata.metadataChildren.filter((int) => (
                int.title
                    ? int.title.toUpperCase().includes(this.state.filter.toUpperCase())
                    : false))
            :
            this.props.data.pageMetadata.metadataChildren;
        this.forceUpdate();
    }

    async closeSearch() {
        await this.setState({ filter: '' });
        document.getElementById('integrations-filter').blur();
        this.integrations = this.props.data.pageMetadata.metadataChildren;
        this.forceUpdate();
    }

    async handleFilter(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        await this.setState({
            filteringByType: true
        });
    }

    async filterFunc(e, type) {
        e.stopPropagation();
        await this.setState({
            filteringByType: false,
            filteringByCategory: true,
            categoryFilter: type
        });
    }

    render() {
        const category = getQueryMap(this.props.location).category;
        const updatedIntegrations = this.getIntegrationsList(this.integrations, category);

        return (
            <HeaderFooterLayout className='integrations' metadata={this.props.data.pageMetadata} location={this.props.location}>
                <LeftNavPane currPath={this.props.location.pathname}>
                    <CategoryChooser location={this.props.location} />
                </LeftNavPane>
                <div className='integration-home main-content'>
                    <h1>Integrations</h1>
                    <div className='integration-section'>
                        <div className='header'>
                            <div className='filter-search'>
                                <input
                                    type='text'
                                    id='integrations-filter'
                                    value={this.state.filter}
                                    onChange={this.handleFilterChange}
                                    placeholder='Search...' />
                                {!this.state.filter &&
                                    <span className='search-icon' />}
                                {this.state.filter &&
                                    <span
                                        role='button'
                                        className='close-search'
                                        tabIndex='0'
                                        onClick={this.closeSearch} />}
                            </div>
                            <div
                                className='filter-category'
                                role='button'
                                onClick={this.handleFilter}>
                                {this.state.filteringByCategory ?
                                    tagOptions.find((tag) => tag.value === this.state.categoryFilter).name
                                    : 'Filter by integration type'}
                                <span className='icon-arrow' />
                                {this.state.filteringByType &&
                                    <IntegrationFilter tags={tagOptions} filterFunc={this.filterFunc} />
                                }
                            </div>
                        </div>
                        {!this.state.filteringByCategory || (this.state.filteringByCategory && updatedIntegrations.length) ?
                            renderIntegrations(updatedIntegrations)
                            :
                            <h5 className='no-integration-results'>No results found</h5>
                        }
                    </div>
                </div>
            </HeaderFooterLayout>
        );
    }
}

export const integrationQuery = graphql`
    query {
        pageMetadata(id: {eq: "integrations PageMetadata"}) {
            ...BreadcrumbMetadata
            metadataChildren {
                path
                title
                partnerId
                partnerImageOverride
                draft
            }
        }
    }
`;

Integrations.propTypes = {
    data: PropTypes.shape({
        pageMetadata: routePropTypes.pageMetadata.isRequired
    }),
    location: routePropTypes.location.isRequired
};

export const frontmatter = {
    title: 'Integrations',
    showWhenLast: true
};

export default Integrations;
