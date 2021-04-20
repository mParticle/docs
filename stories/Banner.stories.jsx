import React from 'react';
import Banner from '../src/components/Banner/banner';

export default {
    title: 'Banner',
    component: Banner,
};

export const BannerModule = () => (
    <Banner
        text='Banner text goes here'
        learnMoreLink='https://docs.mparticle.com'
        closeBanner={() => {
            console.log('close banner clicked.');
        }}
    />
);