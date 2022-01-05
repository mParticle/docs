/* eslint max-len: 'off' */

import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import { routePropTypes } from '../../utils/routes';
import HeaderFooterLayout from '../../layouts/headerfooter';
import GuideTile from './tile';

import './_guides.less';

const Links = [
    {
        route: 'platform-guide',
        title: 'Platform Guide',
        content: 'Learn to manage your data in the mParticle dashboard.',
        links: [
            {
                text: 'Activity',
                link: 'activity',
            },
            {
                text: 'Audiences',
                link: 'audiences',
            },
            {
                text: 'Calculated Attributes',
                link: 'calculated-attributes',
            },
            {
                text: 'Connections',
                link: 'connections',
            },
            {
                text: 'Data Filter',
                link: 'data-filter',
            },
        ],
    },
    {
        route: 'getting-started',
        title: 'Getting Started',
        content:
            'A from-scratch guide to get you started sending data to mParticle and forwarding it on to Event and Audience outputs.',
        links: [
            {
                text: 'Create Inputs',
                link: 'create-an-input',
            },
            {
                text: 'Start capturing data',
                link: 'start-capturing-data',
            },
            {
                text: 'Connect an Event Output',
                link: 'connect-an-event-output',
            },
            {
                text: 'Create an Audience',
                link: 'create-an-audience',
            },
        ],
    },
    {
        route: 'idsync',
        title: 'IDSync',
        content:
            'Learn about mParticle’s premium Identity Management Framework',
        links: [
            {
                text: 'Introduction',
                link: 'introduction',
            },
            {
                text: 'Use Cases for IDSync',
                link: 'use-cases',
            },
            {
                text: 'Components of IDSync',
                link: 'components',
            },
        ],
    },
    {
        route: 'data-master',
        title: 'Data Master',
        content:
            'Explore every data point in your workspace and manage your data quality.',
        links: [
            {
                text: 'Data Master Introduction',
                link: 'introduction',
            },
            {
                text: 'Catalog',
                link: 'catalog',
            },
            {
                text: 'Live Stream',
                link: 'live-stream',
            },
            {
                text: 'Data Plan',
                link: 'data-planning',
            },
        ],
    },
    {
        route: 'data-privacy-controls',
        title: 'Data Privacy Controls',
        content:
            'Collect and leverage consumer consent and opt-outs towards compliance with GDPR and CCPA.',
        links: [{}],
    },
    {
        route: 'data-subject-requests',
        title: 'Data Subject Requests',
        content:
            'Explore how to respond to data subject requests as mandated by the GDPR and CCPA regulations.',
        links: [{}],
    },
    {
        route: 'default-service-limits',
        title: 'Default Service Limits',
        content:
            'Learn about the default limits mParticle imposes on incoming data in order to protect the performance of the mParticle dashboard and your app.',
        links: [{}],
    },
    {
        route: 'feeds/',
        title: 'Feeds',
        content: 'Learn how to harness third party data sources with Feeds.',
        links: [{}],
    },
    {
        route: 'cross-account-audience-sharing/',
        title: 'Cross-Account Audience Sharing',
        content:
            'Share audience data with other accounts within your organization.',
        links: [{}],
    },
];

const Guides = (props) => (
    <HeaderFooterLayout
        location={props.location}
        metadata={props.data.pageMetadata}>
        <div className='guides main-content'>
            <h1 id='developer-hub-title'>Guides</h1>
            <p className='large'>
                This section contains in-depth information about the mParticle
                platform and features.
                <ul>
                    <li>
                        For information about our SDKs, APIs, and tools, visit
                        the
                        <Link to='/developers/'>Developers</Link>
                        section.
                    </li>
                    <li>
                        For information about our latest product releases, visit
                        the
                        {' '}
                        <Link to='https://changelog.mparticle.com'>
                            mParticle Changelog
                        </Link>
                        .
                        {' '}
                    </li>
                </ul>
            </p>
            <div className='flex-content guide-tiles'>
                {Links.map((link) => (
                    <GuideTile key={`${link.title}${link.route}`} data={link} />
                ))}
            </div>
        </div>
    </HeaderFooterLayout>
);

export const frontmatter = {
    title: 'Guides',
    showWhenLast: true,
};

export const query = graphql`
    query {
        pageMetadata(path: { eq: "/guides/" }) {
            ...BreadcrumbMetadata
        }
    }
`;

Guides.propTypes = {
    location: routePropTypes.location.isRequired,
    data: PropTypes.shape({
        pageMetadata: routePropTypes.pageMetadata,
    }).isRequired,
};

export default Guides;
