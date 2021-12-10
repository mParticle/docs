/* eslint import/no-webpack-loader-syntax: 'off' */
/* eslint import/first: 'off' */
/* eslint import/no-unresolved: 'off' */
/* eslint react/no-did-mount-set-state: 'off' */
/* eslint no-param-reassign: 'off' */

import React from 'react';
import { Link } from 'gatsby';
import { getQueryMap, routePropTypes } from '../../utils/routes';
import { getUpdatedIntegrations } from '../../services/integrations';
import partners from '../../services/partners.json';

import './_categorychooser.less';

class CategoryChooser extends React.Component {
    constructor(props) {
        super(props);
        this.integrationsMap = [];
        this.state = {
            integrationsLoaded: false,
        };
    }

    componentDidMount() {
        getUpdatedIntegrations(partners);
        this.forceUpdate();
        this.integrationsMap = partners.Partners.reduce((all, item) => {
            const accumObj = Object.assign(all);
            if (item.Tags) {
                accumObj[item.Id] = item.Tags.split(',').map((integration) => (
                    integration.toLowerCase()));
            } else {
                accumObj[item.Id] = [];
            }
            return accumObj;
        }, {});
        this.setState({
            integrationsLoaded: true,
        });
    }

    render() {
        let headerText = '';

        if (this.props.currPageMetadata) {
            headerText = 'Categories';
        } else {
            headerText = 'Filter by Category';
        }
        const categories = {
            Advertising: [
                'Data Onboarding',
                'Re-Targeting',
                'User Acquisition',
            ],
            Analytics: [
                'A/B Testing',
                'Attribution',
                'Conversion Tracking',
                'Crash Reporting',
                'Custom Feeds',
                'Feature Flagging',
                'Location',
                'Monitoring',
                'Predictive Analytics',
                'User Analytics',
            ],
            'Customer Service': [
                'Customer Support',
                'Helpdesk',
                'User Feedback',
            ],
            'Data Warehousing': [
                'Business Intelligence',
                'DMP',
                'Raw Data Export',
            ],
            Finance: [
                'Commerce',
                'Payments',
            ],
            Marketing: [
                'Affiliate Marketing',
                'CRM',
                'Customer Engagement',
                'Data Enrichment',
                'Deep Linking',
                'Loyalty and Rewards',
                'Personalization',
                'Tag Management',
            ],
            Privacy: [
                'Consent Management',
                'Data Subject Request',
            ],
            Security: [
                'Access Management',
                'Fraud Monitoring',
            ],
        };
        const colors = ['#FF4000', '#00AAFF', '#9D0FAA', '#FF0043', '#0041CA', '#00C752', '#5239D3', '#019FC2'];

        const activeLink = getQueryMap(this.props.location).category;
        const activeIntegration = this.props.currPageMetadata
            && this.props.currPageMetadata.metadataParent
            ? this.props.currPageMetadata.metadataParent.partnerId
            : undefined;

        const activeCategory = Object.keys(categories).reduce((all, item) => {
            let current = '';
            if (categories[item].indexOf(activeLink) > -1) {
                current = item;
            }
            return current;
        }, '');

        if (activeIntegration
            && this.state.integrationsLoaded
            && this.integrationsMap[activeIntegration]
        ) {
            const currentCategories = {
                'Current Categories': this.integrationsMap[activeIntegration].map((int) => ({
                    name: int,
                    cat: Object.keys(categories).reduce((all, item, i) => {
                        const itemname = int.toUpperCase().trim();
                        if (categories[item]
                            .some((word) => itemname === word.toUpperCase().trim())) {
                            all = i;
                        }
                        return all;
                    }, ''),
                })),
            };
            return (
                <div className='category-chooser'>
                    { headerText
                        && (
                            <div className='category-header'>
                                <span>{headerText}</span>
                            </div>
                        )}
                    <div className='category-wrapper'>
                        { currentCategories['Current Categories'].map((item) => {
                            const itemname = item.name.toUpperCase().trim();
                            const category = Object.keys(categories).reduce((all, categ) => {
                                if (categories[categ]
                                    .some((word) => itemname === word.toUpperCase().trim())) {
                                    all = categ;
                                }
                                return all;
                            }, item.name.charAt(0).toUpperCase() + item.name.slice(1));

                            const tags = categories[category];

                            const integrationText = tags
                                ? tags.find((word) => itemname === word.toUpperCase().trim())
                                : item.name;

                            const link = `/integrations/?category=${encodeURIComponent(integrationText)}`;
                            return (
                                <div
                                    className={`link-wrapper ${item.name}`}
                                    key={item.name}>
                                    <Link
                                        className='toc-link'
                                        to={link}>
                                        <span>
                                            <svg height='8' width='8'>
                                                <circle
                                                    cx='4'
                                                    cy='4'
                                                    r='4'
                                                    fill={colors[item.cat]} />
                                            </svg>
                                        </span>
                                        { integrationText }
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        } if (activeIntegration) {
            return (
                <div className='category-chooser'>
                    { headerText
                        && (
                            <div className='category-header'>
                                <span>{headerText}</span>
                                <Link
                                    className='toc-link view-all'
                                    onClick={this.handleClick}
                                    style={{ display: 'block' }}
                                    to='/integrations'>
                                    All
                                </Link>
                            </div>
                        )}
                </div>
            );
        }

        return (
            <div className='category-chooser'>
                { headerText
                    && (
                        <div className='category-header'>
                            <span>{headerText}</span>
                            <Link
                                className={`toc-link view-all ${activeLink ? '' : 'active'}`}
                                onClick={this.handleClick}
                                style={{ display: 'block' }}
                                to='/integrations'>
                                All
                            </Link>
                        </div>
                    )}
                {
                    Object.keys(categories).map((category, index) => (
                        <div className='category-wrapper' key={category}>
                            <span>
                                <svg height='8' width='8'>
                                    <circle cx='4' cy='4' r='4' fill={colors[index]} />
                                </svg>
                                <span
                                    className={`${category === activeCategory ? 'activeCat' : ''} ${category}`}
                                    href='/'>
                                    {category}
                                </span>
                            </span>
                            <div className='categories'>
                                {
                                    categories[category].map((item) => {
                                        const isActiveLink = item === activeLink;
                                        const link = isActiveLink
                                            ? '/integrations/'
                                            : `/integrations/?category=${encodeURIComponent(item)}`;
                                        return (
                                            <div className={`link-wrapper ${category} ${isActiveLink ? 'active' : ''}`} key={item}>
                                                <Link
                                                    className={`toc-link ${isActiveLink ? 'active' : null}`}
                                                    to={link}>
                                                    { item }
                                                </Link>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

CategoryChooser.defaultProps = {
    integrations: null,
    currPageMetadata: null,
};

CategoryChooser.propTypes = {
    currPageMetadata: routePropTypes.pageMetadata,
    location: routePropTypes.location.isRequired,
};

export default CategoryChooser;
