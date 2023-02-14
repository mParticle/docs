/* eslint max-len: 'off' */

import React from 'react';
import { Link } from 'gatsby';
import { routePropTypes } from '../utils/routes';
import HeaderFooterLayout from '../layouts/headerfooter';
import OffsiteButton from '../components/OffsiteButton/offsiteButton';
import SEO from '../components/SEO'
import './_home.less';

const DOMORETILESROW = [
    [
        {
            title: 'Identity',
            icon: 'icon-identity',
            text: 'Manage user identities with IDSync',
            url: 'guides/idsync/introduction/'
        },
        {
            title: 'Data Master',
            icon: 'icon-dm',
            text: 'View and enforce your data quality',
            url: 'guides/data-master/introduction/'
        },
        {
            title: 'Audiences',
            icon: 'icon-audience',
            text: 'Engage customer cohorts',
            url: 'guides/platform-guide/audiences/overview/'
        }
    ],
    [
        {
            title: 'Custom Rules',
            icon: 'icon-rules',
            text: 'Transform data as it enters and leaves mParticle',
            url: 'guides/platform-guide/rules/'
        },
        {
            title: 'User Activity View',
            icon: 'icon-uav',
            text: 'Get a complete view of your users',
            url: 'guides/platform-guide/activity/#user-activity'
        },
        {
            title: 'User Privacy',
            icon: 'icon-privacy',
            text:
                'Ensure compliance with GDPR, CCPA, and your privacy policies',
            url: 'guides/data-privacy-controls/'
        }
    ],
    [
        {
            title: 'Events API',
            icon: 'icon-api',
            text: 'Send events directly to mParticle',
            url: 'developers/server/http/'
        },
        {
            title: 'Profile API',
            icon: 'icon-api',
            text: 'Real-time API to drive user personalization',
            url: 'developers/profile-api/'
        },
        {
            title: 'Firehose API',
            icon: 'icon-api',
            text: 'Build your own custom integrations',
            url: 'developers/partners/firehose/'
        }
    ]
];

const TILESBOTTOM = [
    {
        name: 'Inputs',
        subSections: [
            {
                name: 'Client SDKs',
                links: [
                    {
                        title: 'Android',
                        link: 'developers/sdk/android'
                    },
                    {
                        title: 'iOS',
                        link: 'developers/sdk/ios'
                    },
                    {
                        title: 'Web',
                        link: 'developers/sdk/javascript'
                    }
                ],
                viewAll: 'developers/'
            },
            {
                name: 'Events API',
                links: [
                    {
                        title: 'HTTP',
                        link: 'developers/server/http'
                    },
                    {
                        title: 'Node',
                        link: 'developers/server/node'
                    },
                    {
                        title: 'Python',
                        link: 'developers/server/python'
                    },
                    {
                        title: 'Ruby',
                        link: 'developers/server/ruby'
                    },
                    {
                        title: 'JSON Reference',
                        link: 'developers/server/json-reference'
                    }
                ],
                viewAll: 'developers/server/http/'
            },
            {
                name: 'Partner Feeds',
                links: [
                    {
                        title: 'Branch',
                        link: 'integrations/branch-metrics/feed'
                    },
                    {
                        title: 'AppsFlyer',
                        link: 'integrations/appsflyer/feed'
                    },
                    {
                        title: 'Braze',
                        link: 'integrations/braze/feed'
                    }
                ],
                viewAll: 'integrations/?isFeed=true'
            },
            {
                name: 'Custom CSV Feed',
                links: [
                    {
                        title: 'Custom CSV Feed',
                        link: 'guides/csv/import'
                    }
                ],
                viewAll: 'guides/csv/import'
            }
        ]
    },
    {
        name: 'Outputs',
        subSections: [
            {
                name: 'Events',
                links: [
                    {
                        title: 'Mixpanel',
                        link: 'integrations/mixpanel/event'
                    },
                    {
                        title: 'Amplitude',
                        link: 'integrations/amplitude/event'
                    },
                    {
                        title: 'Facebook',
                        link: 'integrations/facebook/event'
                    },
                    {
                        title: 'Braze',
                        link: 'integrations/braze/event'
                    },
                    {
                        title: 'AppsFlyer',
                        link: 'integrations/appsflyer/event'
                    }
                ],
                viewAll: 'integrations/'
            },
            {
                name: 'Audience',
                links: [
                    {
                        title: 'Facebook',
                        link: 'integrations/facebook/audience'
                    },
                    {
                        title: 'Snapchat',
                        link: 'integrations/snapchat/audience'
                    },
                    {
                        title: 'Twitter',
                        link: 'integrations/twitter/audience'
                    },
                    {
                        title: 'Braze',
                        link: 'integrations/braze/audience'
                    },
                    {
                        title: 'Pinterest',
                        link: 'integrations/pinterest/audience'
                    }
                ],
                viewAll: 'integrations/'
            }
        ]
    }
];

const Home = (props) => (
    <HeaderFooterLayout location={props.location}>
        <SEO
            title='mParticle documentation'
            description='Learn more about how mParticle helps you collect, validate, and connect customer data with guides and developer documentation.'
        />
        <div className='docs-home docs-app'>
            <div className='docs-content centered-fixed-width'>
                <section className='what-is-mparticle'>
                    <div className='home-flow'>
                        <div className='home-flow-tiles'>
                            <div className='home-flow-tile'>
                                <p className='intro'>
                                    mParticle is a customer data platform (CDP) that
                                    simplifies how you collect and connect your
                                    user data to hundreds of vendors without
                                    needing to manage multiple integrations. We
                                    simplify the entire process for you, so you
                                    can do more with your data without the
                                    hassle of complex integrations.
                                </p>
                                <p className='intro2'>
                                    If you're new to mParticle, you can take a guided, interactive tour through the UI with the demo, or obtain your own free trial version to discover the features and capabilities mParticle has to offer.
                                </p>
                                <table width="100px" cellspacing="0" cellpadding="10" >
                                    <tr>
                                        <td>
                                            <OffsiteButton
                                                text='Explore Demo'
                                                url='https://demo.mparticle.com/?utm_source=docs' />
                                        </td>
                                        <td>
                                            <OffsiteButton
                                                text='Claim Your Free Trial'
                                                url='https://www.mparticle.com/free-trial?utm_source=docs' />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='home-get-started'>
                    <div className='title'>
                        <h3>Get Started</h3>
                    </div>
                    <div className='home-flow'>
                        <div className='home-flow-tiles'>
                            <div className='home-flow-tile home-flow-collect'>
                                <div className='body'>
                                    <h3>1. Collect</h3>
                                    <p>
                                        {'Send your first event to mParticle'}
                                    </p>
                                    <Link to='guides/getting-started/create-an-input/'>
                                        <span className='view-all'>
                                            Go to 'Create an input'
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className='home-flow-buffer' />
                            <div className='home-flow-tile home-flow-collect'>
                                <div className='body'>
                                    <h3>2. Validate</h3>
                                    <p>{'Ensure data quality'}</p>
                                    <Link to='guides/getting-started/start-capturing-data/#verify-look-for-incoming-data-in-the-live-stream'>
                                        <span className='view-all'>
                                            Go to 'Verify'
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className='home-flow-buffer' />
                            <div className='home-flow-tile home-flow-collect'>
                                <div className='body'>
                                    <h3>3. Connect</h3>
                                    <p>
                                        {
                                            'Forward data to a downstream services'
                                        }
                                    </p>
                                    <Link to='guides/getting-started/connect-an-event-output/'>
                                        <span className='view-all'>
                                            Go to 'Connect an event output'
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='do-more'>
                    <div className='title'>
                        <h3>Do more with mParticle</h3>
                    </div>
                    <div className='features'>
                        {DOMORETILESROW.map((row) => (
                            <div className='features-tiles'>
                                {row.map((data) => (
                                    <React.Fragment>
                                        <Link
                                            className='docs-header-home-link'
                                            to={data.url}>
                                            <div className='features-tile features-collect'>
                                                <div className='feature-body'>
                                                    <div className='feature-icon'>
                                                        <span
                                                            className={
                                                                data.icon
                                                            } />
                                                    </div>
                                                    <div className='feature-text'>
                                                        <h5>{data.title}</h5>
                                                        <p>{data.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className='features-buffer' />
                                    </React.Fragment>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>

                <section className='home-tiles-bottom'>
                    {TILESBOTTOM.map((section, i) => (
                        <div
                            key={section.name}
                            className='home-tiles-bottom-section'>
                            <div className='title'>
                                <span className={`icon-bottom-${i}`} />
                                <h3>{section.name}</h3>
                            </div>
                            <div className='sub-sections'>
                                {section.subSections.map((sub) => (
                                    <div
                                        key={`${section.name}${sub.name}`}
                                        className='home-tile-bottom'>
                                        <div className='header'>
                                            <span>{sub.name}</span>
                                        </div>
                                        <div className='links'>
                                            {sub.links.map((link) => (
                                                <Link
                                                    key={`${section.name}${sub.name}${link.title}`}
                                                    to={`${link.link}/`}
                                                    className='link'>
                                                    <p>{link.title}</p>
                                                </Link>
                                            ))}
                                            <Link to={sub.viewAll}>
                                                <span className='view-all'>
                                                    View all
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    </HeaderFooterLayout>
);

Home.propTypes = {
    location: routePropTypes.location.isRequired
};

export default Home;
