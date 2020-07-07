import React from 'react';
import { Link } from 'gatsby';
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
                    © 2020 mParticle, Inc.
                    <br />
                    All rights reserved.
                    <br />
                    <br />
                    <a
                        className='footer-link'
                        href='https://www.mparticle.com'>
                        mParticle.com
                    </a>
                    <a
                        className='footer-link'
                        href='https://www.mparticle.com/termsofservice/'
                        rel='noopener noreferrer'
                        target='_blank'>
                        Privacy Policy
                    </a>
                    <br />
                    <a
                        className='footer-link ot-sdk-show-settings'>
                        Cookie Policy
                    </a>
                </span>
            </div>
            <div className='section info'>
                <p className='title'>Questions?</p>
                <p>
                    {`We're always happy to help with code or other questions you
                    might have! `}
                    Check out our
                    {' '}
                    <Link to='/faq/'><span className='link'>answers</span></Link>
                    {' '}
                    {'to common questions, or '}
                    <a href='https://www.mparticle.com/contact' id='send-email'>
                        <span className='link'>send us an email</span>
                    </a>
                </p>
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
                </div>
            </div>
        </div>
        <ScrollTopButton />
    </div>
);
