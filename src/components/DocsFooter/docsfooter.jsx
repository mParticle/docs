import React from 'react';
import ScrollTopButton from '../ScrollTopButton/scrolltopbutton';
import './_docsfooter.less';

const settings = require('../../../settings.json');

const buildDate = settings && settings.buildDate && new Date(settings.buildDate);

export default () => (
    <div
        className='docs-footer'
        id='docs-footer'>
        <div className='sections'>
            <div className='section legal'>
                {(buildDate
                    ? (
                        <div className='build'>
                            <div className='version'>Last Updated:</div>
                            <span>{ buildDate.toLocaleString() }</span>
                        </div>
                    )
                    : null
                )}
                <br />
                <span>
                    © 2022 mParticle, Inc.
                    <br />
                    All rights reserved.
                    <br />
                    <br />
                    <a
                        className='footer-link'
                        href='https://www.mparticle.com'
                        rel='noopener noreferrer'
                        target='_blank'>
                        mParticle.com
                    </a>
                    <a
                        className='footer-link'
                        href='https://www.mparticle.com/privacypolicy'
                        rel='noopener noreferrer'
                        target='_blank'>
                        Privacy Policy
                    </a>
                    <br />
                    <a
                        href='https://www.mparticle.com/cookie-policy/current'
                        rel='noopener noreferrer'
                        target='_blank'
                        className='footer-link'>
                        Cookie Policy
                    </a>
                    <a
                        className='footer-link ot-sdk-show-settings'>
                        Cookies Settings
                    </a>
                </span>
            </div>
            <div style={{ display: 'none' }} className='section'>
                <div className='title'>Subscribe</div>
                <p>Weekly marketing & analytics insights in your inbox</p>
                <div id='signup'>
                    <button id='marketing-sign-up'><span>Sign Up</span></button>
                    <input type='text' placeholder='Enter your email' />
                </div>
            </div>
            <div className='section partners'>
                <p className='title'>Partners</p>
                <div className='links'>
                    <a
                        href='https://www.mparticle.com/certified-partners'>
                        <p>Certified Partners</p>
                    </a>
                    <a
                        href='https://www.mparticle.com/partners'>
                        <p>Join the Platform</p>
                    </a>
                </div>
            </div>
            <div className='section resources'>
                <p className='title'>Resource Center</p>
                <div className='links'>
                    <a
                        href='https://www.mparticle.com/blog'>
                        <p>Blog</p>
                    </a>
                    <a
                        href='https://www.mparticle.com/resources'>
                        <p>Resources</p>
                    </a>
                    <a
                        href='https://www.mparticle.com/free-trial?utm_source=docs'>
                        <p>Free trial</p>
                    </a>
                </div>
            </div>
        </div>
        <ScrollTopButton />
    </div>
);
