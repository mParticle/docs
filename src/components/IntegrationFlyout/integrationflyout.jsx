/* eslint eqeqeq: "off", jsx-a11y/no-static-element-interactions: "off" */

import React from 'react';
import { StaticQuery, graphql, navigate } from 'gatsby';
import ListFlyout from '../ListFlyout/listflyout';

const flyoutComponent = (data) => {
    const items = data.pageMetadata.metadataChildren.map((x) => ({
        path: x.path,
        label: x.title,
    }));

    return (
        <ListFlyout
            searchPlaceholder='Search...'
            value='Select Integration'
            clickCallback={(val) => navigate(val.path)}
            items={items} />
    );
};

// StaticQuery can be used in components to fetch GraphQL data: https://www.gatsbyjs.org/docs/static-query/
// Be sure to inline the GrahpQL query or it will not work on 'build'
// https://github.com/gatsbyjs/gatsby/issues/8790
const IntegrationFlyout = () => (
    <StaticQuery
        query={graphql`
            query {
                pageMetadata(id: {eq: "integrations PageMetadata"}) {
                    metadataChildren {
                        path
                        title
                    }
                }
            }
        `}
        render={flyoutComponent} />
);

export default IntegrationFlyout;
