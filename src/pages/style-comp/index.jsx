import React from 'react';

const StyleComp = () => (
    <div className='developer main-content style-comp docs-content'>
        <div className='markdown'>
            <h1>(H1) Section Title L3 Graphik SB 32px/40 #1F1F1F</h1>
            <h2>(H2) Page Title L4 - Graphik Regular 26px/32 #007387</h2>
            <a href='markdown'>Markdown Comps</a>
            <p className='large'>
            (Body Large) 1-2 sentences at the beginning of every page. Roboto Regular 16px/26 #545C62 The Android SDK can be incorporated into native Android apps running on smartphones and other platforms.
            </p>
            <h3>(H3) Child L4.1</h3>
            <p>
                (Body) Roboto Regular 14px/22 #1f1f1f.  mParticle’s Android integration is powered by a “core” library, which supports mParticle’s server-side integrations and audience platform.
                You can get the core SDK via Maven Central. Please follow the releases page on Github to stay up to date with the latest version.
            </p>
            <h4>(H4) CHILD L4.1.1 ROBOTO MONO BOLD 16px/22, #007387 UPPERCASE</h4>
            <p>
                The Google Play Services Ads framework is necessary to collect the Android Advertisting ID. AAID collection is required by all attribution and audience integrations, and many other integrations. Include the              artifact, a subset of Google Play Services:
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Table Header</th>
                        <th>(H5)  Body Header Graphik Medium 15px/20  #1F1F1F</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Adjust</td>
                        <td>android-adjust-kit</td>
                    </tr>
                    <tr>
                        <td>Adjust</td>
                        <td>android-adjust-kit</td>
                    </tr>
                    <tr>
                        <td>Adjust</td>
                        <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat lorem ipsum dolor.</td>
                    </tr>
                </tbody>
            </table>
            <h5>(H5) Body Header</h5>
            <p>The Google Play Services Ads framework is necessary to collect the Android Advertisting ID. AAID collection is required by all attribution and audience integrations, and many other integrations. Include the              artifact, a subset of Google Play.
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <h6>This is an H6</h6>
            <aside>This is an aside</aside>
            <aside className='warning'>Warning aside here</aside>
            <aside className='notice'>Just a notice</aside>
            <aside className='success'>Hey, success</aside>
        </div>
    </div>
);

export default StyleComp;
