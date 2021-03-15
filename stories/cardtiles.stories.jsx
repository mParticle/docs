import React from 'react';
import LogoCard from '../src/components/LogoCard';
import CardTile from '../src/components/CardTile';

export default {
    title: 'Cards',
    component: CardTile,
};

export const CardTiles = () => (
    <CardTile>
        <CardTile.Heading>Card Samples</CardTile.Heading>
        <CardTile.Tiles>
            <LogoCard
                imgPath='http://placekitten.com/117/50'
                path='https://mparticle.com/'
            />
            <LogoCard
                imgPath='http://placekitten.com/45/45'
                path='https://mparticle.com/'
                alt='Kitteh'
            />
            <LogoCard
                imgPath='http://placekitten.com/117/50'
                path='https://mparticle.com/'
                label='Kitteh'
            />
            <LogoCard
                imgPath='http://placekitten.com/45/45'
                path='https://mparticle.com/'
                label='Kitteh'
            />
        </CardTile.Tiles>
    </CardTile>
);