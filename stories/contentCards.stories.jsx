import React from 'react';
import ContentCard from '../src/components/ContentCard/ContentCard';

export default {
    title: 'Cards',
    component: ContentCard,
};

export const ContentCardDemo = () => (
    <ContentCard iconClassName='icon-data-links'>
        <ContentCard.Heading>Bring Data Into mParticle</ContentCard.Heading>
        <ContentCard.Body>
            Capture data from any source and pipe it into the mParticle Events API.
        </ContentCard.Body>
        <ContentCard.List>
            <a href='#'>Send Data Client-side</a>
            <a href='#'>Send Data Server-side</a>
            <a href='#'>Enable Partner Webhooks</a>
        </ContentCard.List>
        <ContentCard.Link to='/developers' label='More' />
    </ContentCard>
);
