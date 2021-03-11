import React from 'react';
import LinkWidget from '../src/components/LinkWidget';
import EditPageWidget from '../src/components/LinkWidget/EditPageWidget';
import SourceCodeWidget from '../src/components/LinkWidget/SourceCodeWidget';

export default {
    title: 'Misc',
    component: LinkWidget,
};

export const LinkWidgetModule = () => (
    <div>
        <EditPageWidget linkPath='/mparticle/docs' />
        <LinkWidget
            className='cla-widget'
            url='https://github.com/mparticle/docs'
            icon='github-icon'
            arrowIcon='arrow-right-icon'
            label='Go to Github'
            style={{ position: 'static' }}
        />
        <SourceCodeWidget sourceCode='https://github.com/' />
    </div>
);
