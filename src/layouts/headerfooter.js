import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { navigate } from 'gatsby';
import DocsHeader from '../components/DocsHeader/docsheader';
import DocsFooter from '../components/DocsFooter/docsfooter';
import { getPlatformCookie,
    setPlatformCookie,
    addGlobalEventListener,
    removeGlobalEventListener } from '../utils/misc';
import { routePropTypes, getRouteData } from '../utils/routes';
import Helpful from '../components/Misc/helpful';

import '../styles/main.less';

const activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development';

const platforms = [
    {
        name: 'IOS',
        isActive: false,
        className: 'objc'
    },
    {
        name: 'Android',
        isActive: false,
        className: 'java'
    },
    {
        name: 'JavaScript',
        isActive: false,
        className: 'javascript'
    }
];

const piwikKeys = {
    prod: 'dbf97949-25c3-42c7-8d0e-29c1ae76b93c',
    dev: 'de515d4d-9f61-41a0-ae17-14140d3e36cd'
};

const activeKey = activeEnv === 'production' ? piwikKeys.prod : piwikKeys.dev;

const legacyRedirects = {
    '#activity': '/platform-guide/activity/',
    '#activity-overview': '/platform-guide/activity/#overview',
    '#alert-report': '/platform-guide/activity/#system-alerts',
    '#audience-sharing': '/platform-guide/audiences/#audience-sharing',
    '#audiences': '/platform-guide/audiences/',
    '#connect': '/platform-guide/connections/#connections-workflow',
    '#connections': '/platform-guide/connections/',
    '#custom-mappings': '/platform-guide/connections/#custom-mappings',
    '#event-report': '/platform-guide/activity/#event-forwarding',
    '#faq': '/faq/',
    '#filter': '/platform-guide/connections/#the-event-filter',
    '#json-reference': '/developers/server/json-reference/',
    '#mobile-sdks': '/developers/',
    '#partner-guide': '/developers/partners/',
    '#platform-api': '/developers/platform/',
    '#rules': '/platform-guide/rules/',
    '#server-api': '/developers/server/http/',
    '#user-insights': '/platform-guide/activity/#user-insights'
};

function removeHTML(html) {
    return html.replace(/<[^>]*>/g, '');
}

class RootTemplate extends React.Component {
    constructor(props) {
        super(props);
        const platformCookie = getPlatformCookie();
        let savedPlatform = platforms.filter((platform) => platform.name === platformCookie)[0];
        if (!savedPlatform) {
            savedPlatform = platforms[0];
        }
        savedPlatform.isActive = true;

        this.state = {
            platform: savedPlatform,
            showPlatformChooser: true,
        };

        this.setPlatformCallback = this.setPlatformCallback.bind(this);

        this.handleInternalLinkClick = this.handleInternalLinkClick.bind(this);
    }

    componentDidMount() {
        addGlobalEventListener('onclick', this.handleInternalLinkClick);
        this.checkLegacyRedirect();
    }

    componentWillUnmount() {
        removeGlobalEventListener('onclick', this.handleInternalLinkClick);
    }

    setPlatformCallback(option) {
        platforms.forEach((platform) => {
            platform.isActive = (platform === option);
        });

        setPlatformCookie(option.name);

        this.setState({
            platform: option
        });
    }

    checkLegacyRedirect() {
        if (window.location.pathname == '/' && legacyRedirects[window.location.hash]) { // eslint-disable-line eqeqeq
            navigate(legacyRedirects[window.location.hash]);
        }
    }

    // This function is used to intercept clicks on internal links within markdown files
    // by default these are just normal hrefs so they will reload the site when they are clicked.
    // Instead, use the ReactRouter to handle the navigation as a single page app
    handleInternalLinkClick(e) {
        const el = e.target;
        if (el.matches('.markdown a')) {
            if (el.origin && el.origin.indexOf(window.location.origin) === 0) {
                if (el.pathname.indexOf('schema') >= 0 || el.pathname.indexOf('javadocs') >= 0 || el.pathname.indexOf('downloads') >= 0 || el.pathname.indexOf('apidocs') >= 0 || el.pathname.indexOf('appledocs') >= 0) {
                    window.location.href = el.href;
                } else {
                    const relativePath = el.href.substr(el.origin.length);
                    navigate(relativePath);
                }
                e.preventDefault();
            } else if (el.origin) {
                window.open(el.getAttribute('href'));
                e.preventDefault();
            }
        }
    }

    render() {
        const homeActive = this.props.location.pathname === '/';
        const homeClass = homeActive ? 'home' : '';
        let title = 'mParticle Documentation';
        let helpfulNeeded = false;

        const metadata = this.props.metadata;
        if (metadata) {
            if (metadata.title) {
                title = metadata.title;
            }
            if (
                metadata.metadataParent
                && metadata.metadataParent.title
                && metadata.metadataParent.title !== title
            ) {
                const parentTitle = metadata.metadataParent.title;
                if (metadata.title) {
                    title = `${parentTitle} | ${title}`;
                } else {
                    title = parentTitle;
                }
            }
            if (metadata.path) {
                helpfulNeeded = metadata.path.split('/').length > 3;
            }
        }

        let description = '';
        /* TODO - Get the first paragraph of the body as a description
        if (data.body) {
            const body = data.body;
            const firstParaStart = body.search(/<p>/);
            const firstParaEnd = body.search(/<\/p>/);
            const firstPara = body.slice(firstParaStart, firstParaEnd);
            description = removeHTML(firstPara);
        } */
        return (
            <div className={`docs-app ${homeClass} ${this.state.platform.className}`}>
                <Helmet>
                    <title>{title}</title>
                    <meta name='description' content={description} />
                    <script type='text/javascript'>
                        {`
                            (function(window, document, script, dataLayer, id) {
                            function stgCreateCookie(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+24*c*60*60*1e3),d="; expires="+e.toUTCString()}document.cookie=a+"="+b+d+"; path=/"}var isStgDebug=(window.location.href.match("stg_debug")||window.document.cookie.match("stg_debug"))&&!window.location.href.match("stg_disable_debug");stgCreateCookie("stg_debug",isStgDebug?1:"",isStgDebug?14:-1);
                            window[dataLayer]=window[dataLayer]||[],window[dataLayer].push({start:(new Date).getTime(),event:"stg.start"});var scripts=document.getElementsByTagName(script)[0],tags=document.createElement(script),dl="dataLayer"!=dataLayer?"?dataLayer="+dataLayer:"";tags.async=!0,tags.src="//mparticle.containers.piwik.pro/"+id+".js"+dl,isStgDebug&&(tags.src=tags.src+"?stg_debug"),scripts.parentNode.insertBefore(tags,scripts);
                            !function(a,n,i,t){a[n]=a[n]||{};for(var c=0;c<i.length;c++)!function(i){a[n][i]=a[n][i]||{},a[n][i].api=a[n][i].api||function(){var a=[].slice.call(arguments,0),t=a;"string"==typeof a[0]&&(t={event:n+"."+i+":"+a[0],parameters:[].slice.call(arguments,1)}),window[dataLayer].push(t)}}(i[c])}(window,"ppms",["tm","cp","cm"]);
                            })(window, document, 'script', 'dataLayer', '${activeKey}');
                        `}
                    </script>
                    <noscript>
                        {`<iframe src="//mparticle.containers.piwik.pro/${activeKey}/noscript.html" height="0" width="0" style="display:none;visibility:hidden"></iframe>
                        `}
                    </noscript>
                </Helmet>
                <DocsHeader
                    location={this.props.location} />
                <div className='docs-content centered-fixed-width'>
                    { this.props.children }
                </div>
                {helpfulNeeded &&
                    <Helpful />}
                <DocsFooter />
            </div>
        );
    }
}

RootTemplate.data = {
    title: 'Docs',
    noBreadcrumb: true
};

RootTemplate.propTypes = {
    children: PropTypes.node.isRequired,
    metadata: routePropTypes.pageMetadata,
    location: routePropTypes.location.isRequired
};

export default RootTemplate;
