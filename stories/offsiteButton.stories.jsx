import React from 'react';
import OffsiteButton from '../src/components/OffsiteButton/offsiteButton';

export default {
    title: 'OffsiteButton',
    component: OffsiteButton,
};

export const DemoButton = () => (
    <OffsiteButton
        text='Explore Demo Now'
        url='https://demo.mparticle.com/?utm_source=docs' />
);
