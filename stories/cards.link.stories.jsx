import React from 'react';
import CardTile from '../src/components/CardTile';
import LogoLinkButton from '../src/components/LogoLinkButton';

export default {
    title: 'Misc',
};

export const LogoLinkButtonModule = () => (
    <CardTile>
        <CardTile.Tiles>
            <LogoLinkButton
                icon='appletv'
                label='Apple TV'
                path='https://docs.mparticle.com'
            />
            <LogoLinkButton
                icon='android'
                label='Android'
                path='https://docs.mparticle.com'
            />
            <LogoLinkButton
                icon='ios'
                label='iOS'
                path='https://docs.mparticle.com'
            />
            <LogoLinkButton
                icon='javascript'
                label='JavaScript'
                path='https://docs.mparticle.com'
            />
            <LogoLinkButton
                icon='typescript'
                label='TypeScript'
                path='https://docs.mparticle.com'
            />
            <LogoLinkButton
                icon='roku'
                label='Roku'
                path='https://docs.mparticle.com'
            />
            <LogoLinkButton
                icon='ruby'
                label='Ruby'
                path='https://docs.mparticle.com'
            />
            <LogoLinkButton
                icon='github'
                label='Github'
                path='https://docs.mparticle.com'
            />
            <LogoLinkButton
                icon='cordova'
                label='Cordova'
                path='https://docs.mparticle.com'
            />
            <LogoLinkButton
                icon='xamarin'
                label='Xamarin'
                path='https://docs.mparticle.com'
            />
            <LogoLinkButton
                icon='web'
                label='Web'
                path='https://docs.mparticle.com'
            />
            <LogoLinkButton
                icon='unity'
                label='Unity'
                path='https://docs.mparticle.com'
            />
            <LogoLinkButton
                icon='amp'
                label='Google AMP'
                path='https://docs.mparticle.com'
            />
            <LogoLinkButton
                icon='windows'
                label='Windows'
                path='https://docs.mparticle.com'
            />
            <LogoLinkButton
                icon='get-started'
                label='Get Started'
                path='https://docs.mparticle.com'
            />
        </CardTile.Tiles>
    </CardTile>
);
