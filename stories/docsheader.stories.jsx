import React from 'react';
import DocsHeader from '../src/components/DocsHeader/docsheader';

export default {
    title: 'Navigation',
    component: DocsHeader,
};

const location = {
    pathname: '/',
};

export const DocsHeaderModule = () => <DocsHeader location={location} />;
