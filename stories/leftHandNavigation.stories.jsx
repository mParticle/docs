import React from 'react';
import {
    createMemorySource,
    createHistory,
    LocationProvider,
} from '@reach/router';
import LeftHandNav from '../src/components/MenuFolderNavigation/LeftHandNav';
import TOCContext from '../src/components/TOCContext';
import TOC from '../src/components/MenuFolderNavigation/Toc';

export default {
    title: 'Navigation',
    component: LeftHandNav,
};

const toc = {
    id: 'home',
    label: 'Home',
    path: '/',
    children: [
        {
            label: 'Offsite Link',
            id: 'offsite-link',
            offsiteLink: 'https://mparticle.com/',
        },
        {
            id: 'intro',
            label: 'Introduction to mParticle',
            children: [
                {
                    label: 'What is mParticle?',
                    id: 'what-is-mparticle',
                    path: 'what-is-mparticle',
                },
                {
                    label: 'Configure mParticle',
                    id: 'configure-mparticle',
                    path: 'configure-mparticle',
                },
                {
                    label: 'FAQ',
                    id: 'faq',
                    path: 'faq',
                },
                {
                    id: 'nested-offsite',
                    label: 'Nested Offsite',
                    offsiteLink: 'https://mparticle.com/',
                },
            ],
        },
        {
            id: 'data-infrastructure',
            label: 'Data Infrastructure',
            children: [
                {
                    label: 'Overview',
                    id: 'data-infrastructure-overview',
                    path: 'overview',
                },
                {
                    label: 'Get Started',
                    id: 'data-infrastructure-get-started',
                    path: 'get-started',
                },
                {
                    id: 'integrations',
                    label: 'Integrations',
                    children: [
                        {
                            id: 'integrations-directory',
                            path: 'integrations-directory',
                            label: 'Integrations Directory',
                        },
                        {
                            id: 'integrations-guide',
                            path: 'integrations-guide',
                            label: 'Integrations Guide',
                            children: [
                                {
                                    id: 'integrations-guide-overview',
                                    path: 'integrations-guide-overview',
                                    label: 'Overview',
                                },
                                {
                                    label: 'Setting up Connections',
                                    id: 'setting-up-connections',
                                    path: 'setting-up-connections',
                                },
                                {
                                    label: 'Filtering Data',
                                    path: 'filtering-data',
                                    id: 'filtering-data',
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'SDK Guides',
                    id: 'sdk-guides',
                    path: 'sdk-guides',
                },
            ],
        },
        {
            label: 'Data Quality',
            id: 'data-quality',
            path: 'data-quality',
        },
        {
            id: 'personalization',
            label: 'Personalization',
            children: [
                {
                    id: 'profile-api',
                    label: 'Profile API',
                    children: [
                        {
                            label: 'Overview',
                            id: 'profile-overview',
                            path: '/profile',
                        },
                        {
                            label: 'User Activity View',
                            id: 'user-activity-view',
                            path: 'user-activity-view',
                        },
                    ],
                },
                {
                    id: 'audiences',
                    label: 'Audiences',
                    children: [
                        {
                            label: 'Overview',
                            id: 'audience-overview',
                            path: 'audience-overview',
                        },
                        {
                            label: 'Use Cases',
                            id: 'audience-use-cases',
                            path: 'use-cases',
                        },
                        {
                            label: 'Cross Account Audience Sharing',
                            id: 'cross-account-audience-sharing',
                            path: 'cross-account-audience-sharing',
                        },
                    ],
                },
            ],
        },
        {
            id: 'governance',
            label: 'Governance',
            children: [
                {
                    id: 'rules',
                    label: 'Rules',
                    children: [
                        {
                            label: 'Use Cases',
                            id: 'rules-use-cases',
                            path: 'use-cases',
                        },
                    ],
                },
            ],
        },
        {
            label: 'Changelog',
            id: 'changelog',
            path: 'changelog',
        },
        {
            label: 'Glossary',
            id: 'glossary',
            path: 'glossary',
        },
        {
            label: 'SDK Guides',
            id: 'sdk-guides',
            path: 'sdk-guides',
        },
    ],
};

// Create a fake path to show active state
const source = createMemorySource('/profile');
const history = createHistory(source);

export const LeftHandNavigationModule = () => (
    <div style={{ width: '300px', border: '1px solid red', padding: '20px' }}>
        <LocationProvider history={history}>
            <TOCContext.Provider value={toc}>
                <LeftHandNav>
                    <TOC />
                </LeftHandNav>
            </TOCContext.Provider>
        </LocationProvider>
    </div>
);
