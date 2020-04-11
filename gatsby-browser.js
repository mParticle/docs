//import * as whatwg-fetch from 'whatwg-fetch';
// Need fetch polyfill in gatsby browser?
import { addGlobalEventListener } from './src/utils/misc';
import { getRouteData } from './src/utils/routes';
import './src/styles/custom-code-buttons.less';

/* This function adds redirects for any 'page' that sets a redirect property
    Currently used for redirecting a parent page like 'Android' to the first of
    its child pages as indicated in the _template file.
    The 'onEnter' redirect is needed for when the route is entered from a sibling route:
    docs.com/faq -> docs.com/dev/android -> docs.com/dev/android/getting-started
    The 'onChange' redirect is needed for when the route is entered from a child route:
    docs.com/dev/android/events -> docs.com/dev/android -> docs.com/dev/android/getting-started
    These lifecycle functions may be deprecated in future versions of '@reach/router' so
    we will need to keep an eye on this when moving to new Gatsby versions in the future */
function addRedirects(routes) {
    const redirect = getRouteData(routes).redirect;
    
    if (redirect && routes.path) {
        routes.onChange = (prev, next, replace, callback) => {
            if (next && next.location
                && (next.location.pathname === routes.path
                    || next.location.pathname === `${routes.path}/`)) {
                replace(redirect);
            }
            callback();
        }

        routes.onEnter = (next, replace) => {
            if (next && next.location
                && (next.location.pathname === routes.path
                    || next.location.pathname === `${routes.path}/`)) {
                replace(redirect);
            }
        }
    }

    if (routes.childRoutes && routes.childRoutes.length > 0) {
        routes.childRoutes.forEach(addRedirects);
    }
}

// There is a bug in the automatic route/templating logic within Gatsby that wants to set 
// '/integrations/facebook' as a parent of '/integrations/facebook-atlas'
// This is a hacky fix but should do the trick until we move to Gatsby 1.0
function integrationsRouteFix(routes, rootRoutePath, previousIntegrationRoute) {
    let i = 0;
    const rootRoutes = routes.childRoutes;

    // Find the route that incorrectly has its parent set as the root
    for (; i < rootRoutes.length; i++) {
        if (rootRoutes[i].path.indexOf(rootRoutePath) >= 0) {
            break;
        }
    }

    if (i < rootRoutes.length) {
        let removed = rootRoutes.splice(i, 1)[0];
        // Find the spot in the 'integrations' routes that the removed route should be inserted after
        const integrations = rootRoutes.filter(x => x.path.indexOf('integrations') >= 0)[0].childRoutes;
        for (i = 0; i < integrations.length; i++) {
            if (integrations[i].path.indexOf(previousIntegrationRoute) >= 0) {
                i = i + 1;
                break;
            }
        }

        if (i < integrations.length) {
            integrations.splice(i, 0, removed);
        }
    }
}

function optionalTrailingSlashes(routes, level) {
    if (routes.path && level > 0) {
        routes.path = routes.path.replace(/\/$/, '');
    }
    if (routes.childRoutes) {
        routes.childRoutes.forEach((r) => {
            optionalTrailingSlashes(r, level + 1);
        });
    }

    return routes;
}

/*export const modifyRoutes = (routes) => {
    addRedirects(routes);
    integrationsRouteFix(routes,'facebook-atlas', 'facebook');
    integrationsRouteFix(routes,'adobe-audience-manager', 'adobe');
    integrationsRouteFix(routes, 'amazon-kinesis-firehose', 'amazon-kinesis');
    integrationsRouteFix(routes, 'branch-metrics-server', 'branch-metrics');
    optionalTrailingSlashes(routes, 0);

    return routes;
}*/

// This code fixes the issue of React not being able to navigate directly
// to 'hash' locations as part of page load or navigation.
function scrollToHash(location) {
    if (location.hash) {

            // For some reason, after navigating a while the window history ends up keeping
            // a stale state with the same key - this tells the router that subsequent hashChange
            // events are not new navigations and thus the listeners are not notified.  
            if (window.history && window.history.state) {
                window.history.state.key = null;
            }
            setTimeout(() => {
            const content = document.querySelector(`${location.hash}`);
            if (content && content.scrollIntoView) {
                content.scrollIntoView();
            } else if (window.mParticle) {
                mParticle.logPageView('Error 404', {
                    targetUrl: `${location.pathname}${location.hash}`
                });
            }
        }, 0);
    } else {
        // If there isn't a hash, scroll to the top just to be safe
        window.scrollTo(0, 0);
    }
}
export const onRouteUpdate = ({ location }) => {
    scrollToHash(location);
    if (window.mParticle) {
        return mParticle.logPageView(
            "Docs Page View",
            {
                anchor: location.pathname,
            },
            {
                "Google.Page": location.pathname,
            }
        );
    }
};

function logError(e) {
    if (window.mParticle) {
        mParticle.logEvent("Docs error", {error: e});
    }
}

addGlobalEventListener('onerror', logError);
window.addEventListener('error', logError);

// addGlobalEventListener('onhashchange', () => scrollToHash(window.location));

// Polyfill for 'matches' function -- used for checking on outside clicks for search, flyouts
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
}
