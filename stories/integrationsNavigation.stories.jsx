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
    label: 'back to all integrations',
    icon: 'left-arrow',
    path: '/integrations/',
    children: [
        {
            id: 'some-integration',
            label: 'Some Integration',
            children: [
                {
                    id: 'overview',
                    path: '/integrations/some-integration/overview',
                    label: 'Overview',
                },
                {
                    id: 'events',
                    path: '/integrations/some-integration/events',
                    label: 'Events',
                },
                {
                    id: 'guide',
                    path: '/integrations/some-integration/guide',
                    label: 'Guide',
                },
            ],
        },
    ],
};

// Create a fake path to show active state
const source = createMemorySource('/integrations/some-integration/overview');
const history = createHistory(source);

export const IntegrationNavigationModule = () => (
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
