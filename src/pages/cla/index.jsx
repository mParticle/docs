/* eslint max-len: 'off' */

import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import HeaderFooterLayout from '../../layouts/headerfooter';
import { routePropTypes } from '../../utils/routes';

const cla = (
    <div>
        <p>
            This Contribution License Agreement (this “Agreement”),
            effective as of the last date beneath the parties’ signature
            below (the “Effective Date”), is entered into by mParticle,
            Inc., a Delaware corporation having its principal place of
            business at 257 Park Avenue South, Suite 900, New York, NY
            10010 (“mParticle”), and the party signing below (“You”).
        </p>
        <p>
            In consideration of the mutual covenants and agreements
            contained herein and other good and valuable consideration,
            the receipt and sufficiency of which are hereby
            acknowledged, the parties agree as follows:
    </p>
        <ol>
            <li>
                Definitions.
                <ul>
                    <li>
                        “Project” means any of the projects owned or
                        managed by mParticle in which documentation is
                        made available under an Open Source Initiative
                        or a Creative Commons license .
                    </li>
                    <li>
                        “Submit” is the act of uploading, submitting,
                        transmitting, or distributing content to any
                        Project, including but not limited to
                        communication on electronic mailing lists,
                        source code control systems, and issue tracking
                        systems that are managed by, or on behalf of,
                        the Project for the purpose of discussing and
                        improving that Project.
                    </li>
                    <li>
                        “Submission” means any other copyrightable
                        material Submitted by You, including any
                        associated comments and documentation but
                        excluding material that is conspicuously marked
                        or otherwise designated in writing by You as
                        “Not a Submission.”
                    </li>
                </ul>
            </li>
            <li>
                Your Submission. You must agree to the terms of this
                Agreement before making a Submission to any Project.
                This Agreement covers any and all Submissions that You,
                now or in the future (except as described in Section 4
                below), Submit to any Project.
            </li>
            <li>
                Originality of Work. You represent that each of Your
                Submissions is entirely Your original work. Should You
                wish to Submit materials that are not Your original
                work, You may Submit them separately to the Project if
                (a) You retain all copyright and license information
                that was in the materials as You received them, (b) in
                the description accompanying Your Submission, You
                include the phrase “Submission containing materials of a
                third party:” followed by the names of the third party
                and any licenses or other restrictions of which You are
                aware, and (c) You follow any other instructions in the
                Project’s written guidelines concerning Submissions.
            </li>
            <li>
                Your Employer. References to “employer” in this
                Agreement include Your employer or anyone else for whom
                You are acting in making Your Submission, e.g. as a
                contractor, vendor, or agent. If Your Submission is made
                in the course of Your work for an employer or Your
                employer has intellectual property rights in Your
                Submission by contract or applicable law, You must
                secure permission from Your employer to make the
                Submission before signing this Agreement. In that case,
                the term “You” in this Agreement will refer to You and
                the employer collectively. If You change employers in
                the future and desire to Submit additional Submissions
                for the new employer, then You agree to sign a new
                Agreement and secure permission from the new employer
                before Submitting those Submissions.
            </li>
            <li>
                <p>Licenses</p>
                <p>
                    a. Copyright License. You grant mParticle, and those
                    who receive the Submission directly or indirectly
                    from mParticle, a perpetual, worldwide,
                    non-exclusive, royalty-free, irrevocable license in
                    the Submission to reproduce, prepare derivative
                    works of, publicly display, publicly perform, and
                    distribute the Submission and such derivative works,
                    and to sublicense any or all of the foregoing rights
                    to third parties.
                </p>
                <p>
                    b. Patent License. You grant mParticle, and those
                    who receive the Submission directly or indirectly
                    from mParticle, a perpetual, worldwide,
                    non-exclusive, royalty-free, irrevocable license
                    under Your patent claims that are necessarily
                    infringed by the Submission or the combination of
                    the Submission with the Project to which it was
                    Submitted to make, have made, use, offer to sell,
                    sell and import or otherwise dispose of the
                    Submission alone or with the Project.
                </p>
                <p>
                    c. Other Rights Reserved. Each party reserves all
                    rights not expressly granted in this Agreement. No
                    additional licenses or rights whatsoever (including,
                    without limitation, any implied licenses) are
                    granted by implication, exhaustion, estoppel or
                    otherwise.
                </p>
            </li>
            <li>
                Representations and Warranties. You represent that You
                are legally entitled to grant the above licenses. You
                represent that each of Your Submissions is entirely Your
                original work (except as You may have disclosed as
                required pursuant to Section 3). You represent that You
                have secured permission from Your employer to make the
                Submission in cases where Your Submission is made in the
                course of Your work for Your employer or Your employer
                has intellectual property rights in Your Submission by
                contract or applicable law. If You are signing this
                Agreement on behalf of Your employer, You represent and
                warrant that You have the necessary authority to bind
                the listed employer to the obligations contained in this
                Agreement. You are not expected to provide support for
                Your Submission, unless You choose to do so. UNLESS
                REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING, AND
                EXCEPT FOR THE WARRANTIES EXPRESSLY STATED IN SECTIONS
                3, 4, AND 6, THE SUBMISSION PROVIDED UNDER THIS
                AGREEMENT IS PROVIDED WITHOUT WARRANTY OF ANY KIND,
                INCLUDING, BUT NOT LIMITED TO, MERCHANTABILITY, OR
                FITNESS FOR A PARTICULAR PURPOSE.
            </li>
            <li>
                Notice to mParticle. You agree to notify mParticle in
                writing of any facts or circumstances of which You later
                become aware that would make any of Your representations
                in this Agreement inaccurate in any respect.
            </li>
            <li>
                Information about Submissions. You agree that
                contributions to Projects and information about
                contributions may be maintained indefinitely and
                disclosed publicly, including Your name and other
                information that You Submit with Your Submission.
            </li>
            <li>
                Governing Law. This Agreement shall be governed
                exclusively by the internal laws of the State of New
                York, without regard to its conflicts of laws rules. The
                state and federal courts located in the State of New
                York, District of Manhattan, New York City, shall have
                exclusive jurisdiction to adjudicate any dispute arising
                out of or relating to this Agreement. Each party
                consents to the exclusive jurisdiction of such courts.
                Each party also waives any right to jury trial in
                connection with any action or litigation in any way
                arising out of or related to this Agreement.
            </li>
            <li>
                Entire Agreement/Assignment. This Agreement is the
                entire agreement between the parties regarding Your
                Submission of any materials to any Project, and
                supersedes all prior and contemporaneous agreements,
                proposals or representations, written or oral,
                concerning its subject matter. This Agreement may be
                assigned by mParticle
            </li>
        </ol>
    </div>
);

export default class DevContent extends React.Component {
    constructor(props) {
        super(props);
        this.url = 'https://script.google.com/macros/s/AKfycbyqT7DA9ariSAypEVboPisDMMHyM4lWEZnHibjansHPlsFEDhw/exec';
        this.state = {
            selectedUserType: '',
            formState: '',
            submitDisabled: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(document.forms['cla-form']);
        formData.set('date', new Date());
        this.setState({
            submitDisabled: true
        });

        fetch(this.url, {
            method: 'POST',
            body: formData
        })
        .then(() => {
            window.console.log('success!');
            this.setState({
                formState: 'complete'
            });
        })
        .catch(() => {
            window.console.log('error');
            this.setState({
                formState: 'incomplete'
            });
        });
    }

    handleChange(changeEvent) {
        this.setState({
            selectedUserType: changeEvent.target.value
        });
    }

    render() {
        const formState = this.state.formState;
        let employerQuestions;
        let form;
        let confirmation;
        let errorPage;

        if (this.state.selectedUserType === 'employer') {
            employerQuestions = (
                <div>
                    <div>
                        <p>
                            <label htmlFor='cla-form' className='cla-labels'>
                            Company
                            </label>
                            <input className='form-input' type='text' name='company' required={this.state.selectedUserType === 'employer'} />
                        </p>
                    </div>
                    <div>
                        <p>
                            <label htmlFor='cla-form' className='cla-labels'>
                                By
                            </label>
                            <input className='form-input' type='text' name='by' required={this.state.selectedUserType === 'employer'} />
                        </p>
                    </div>
                    <div>
                        <p>
                            <label htmlFor='cla-form' className='cla-labels'>
                                Title
                            </label>
                            <input className='form-input' type='text' name='title' required={this.state.selectedUserType === 'employer'} />
                        </p>
                    </div>
                </div>
            );
        }

        if (formState === 'complete') {
            confirmation = (
                <div>
                    <h2>Thanks for signing our CLA!</h2>
                    <div className='cla-widget'>
                        <a
                            className='docs-header-home-link'
                            href='https://github.com/mparticle/docs'>
                            <span className='github-icon' />Go to Github<span className='arrow-right-icon' />
                        </a>
                    </div>
                </div>
            );
        } else if (formState === 'incomplete') {
            errorPage = (
                <div>
                    There was an error, please refresh and try again.
                </div>
            );
        } else {
            form = (
                <div>
                    <p>
                        Please select one of the options below and sign as
                        indicated. By signing, You accept and agree to the terms of
                        this Contribution License Agreement for Your present and
                        future Submissions to mParticle.
                    </p>
                    <form id='cla-form' onSubmit={this.handleSubmit}>
                        <div>
                            <br />
                            <label htmlFor='cla-form' className='form-contributor-type'>
                                <input
                                    type='radio'
                                    name='type'
                                    value='personal'
                                    checked={this.state.selectedUserType === 'personal'}
                                    onChange={this.handleChange}
                                    required />
                                I have sole ownership of intellectual property rights to my
                                Submissions and I am not making Submissions in the course of
                                work for my employer.
                            </label>
                        </div>
                        <div>
                            <br />
                            <label htmlFor='cla-form' className='form-contributor-type'>
                                <input
                                    type='radio'
                                    name='type'
                                    value='employer'
                                    checked={this.state.selectedUserType === 'employer'}
                                    onChange={this.handleChange}
                                    required />
                                I am making Submissions in the course of work for my
                                employer (or my employer has intellectual property rights in
                                my Submissions by contract or applicable law).I have
                                permission from my employer to make Submissions and enter
                                into this Agreement on behalf of my employer. By signing
                                below, the defined term [You] includes me and my employer.
                            </label>
                        </div>
                        <div>
                            <p>
                                <label htmlFor='cla-form' className='cla-labels'>
                                    Name
                                </label>
                                <input className='form-input' type='text' name='name' required />
                            </p>
                        </div>
                        <div>
                            <p>
                                <label htmlFor='cla-form' className='cla-labels'>
                                    Signature
                                </label>
                                <input className='form-input' type='text' name='signature' required />
                            </p>
                        </div>
                        <div>
                            <p>
                                <label htmlFor='cla-form' className='cla-labels'>
                                    Github Login
                                </label>
                                <input className='form-input' type='text' name='github' required />
                            </p>
                        </div>
                        <div>
                            <p>
                                <label htmlFor='cla-form' className='cla-labels'>
                                    Email
                                </label>
                                <input className='form-input' type='email' name='email' required />
                            </p>
                        </div>
                        <div>
                            <p>
                                <label htmlFor='cla-form' className='cla-labels'>
                                    Address
                                </label>
                                <input className='form-input' type='text' name='address' required />
                            </p>
                        </div>
                        {employerQuestions}
                        <div className='submit-cla'>
                            <button type='submit' className='submit-cla' disabled={this.state.submitDisabled} >
                                Submit
                                <span className='arrow-right-icon' />
                            </button>
                        </div>
                    </form>
                </div>
            );
        }
        return (
            <HeaderFooterLayout
                location={this.props.location}
                metadata={this.props.data.pageMetadata}>
                <div className='developer main-content'>
                    <h1 id='developer-hub-title'>Contribution License Agreement</h1>
                    <div className='dev-tiles'>
                        {cla}
                        {form}
                        {confirmation}
                        {errorPage}
                    </div>
                </div>
            </HeaderFooterLayout>
        );
    }
}

export const frontmatter = {
    title: 'Contribution License Agreement',
    showWhenLast: true
};

export const query = graphql`
    query {
        pageMetadata(path: { eq: "/cla/" }) {
            ...BreadcrumbMetadata
        }
    }
`;

DevContent.propTypes = {
    location: routePropTypes.location.isRequired,
    data: PropTypes.shape({
        pageMetadata: routePropTypes.pageMetadata
    }).isRequired
};
