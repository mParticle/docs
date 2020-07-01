/* eslint-disable no-else-return */
/* eslint no-use-before-define: 'off' */
import PropTypes from 'prop-types';

export const PageMetadataShape = PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
    sourceCode: PropTypes.string,
});

PageMetadataShape.metadataParent = PageMetadataShape;
PageMetadataShape.metadataChildren = PropTypes.arrayOf(PageMetadataShape);

export const routePropTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
    pageMetadata: PageMetadataShape,
};

export function getRouteData(route) {
    if (route) {
        if (route.component && route.component.data) {
            return route.component.data;
        } else if (route.page && route.page.data) {
            return route.page.data;
        }
    }
    return {};
}

export function getQueryMap(location) {
    const targetMap = {};
    if (location && location.search) {
        // TODO: fix this to find "first" '=' in each key/value
        const split = location.search.substr(1).split('&');
        split.forEach((x) => {
            const keyvalue = x.split('=');
            if (keyvalue.length === 2 && keyvalue[0]) {
                targetMap[keyvalue[0]] = decodeURIComponent(keyvalue[1]);
            }
        });
    }

    return targetMap;
}
