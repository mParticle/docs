import React from 'react';
import RightHandNavigation from '../src/components/MenuFolderNavigation/RightHandNav';
import HeadingsContext from '../src/components/HeadingsContext';

export default {
    title: 'Navigation',
    component: RightHandNavigation,
};

const entries = [
    {
        id: 'overview',
        label: 'Overview',
        anchor: 'overview',
    },
    {
        id: 'get-started',
        label: 'Get Started',
        anchor: 'get-started',
    },
    {
        id: 'use-cases',
        label: 'Use Cases',
        anchor: 'use-cases',
    },
    {
        id: 'cross-account-audience-sharing',
        label: 'Cross Account Audience Sharing',
        anchor: 'cross-account-audience-sharing',
    },
    {
        id: 'setting-up-connections',
        label: 'Setting up Connections',
        anchor: 'setting-up-connections',
    },
    {
        id: 'filtering-data',
        label: 'Filtering Data',
        anchor: 'filtering-data',
    },
];

export const RightHandNavigationModule = () => (
    <HeadingsContext.Provider value={entries}>
        <RightHandNavigation />
    </HeadingsContext.Provider>
);
