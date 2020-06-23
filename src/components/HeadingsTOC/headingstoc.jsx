/* eslint jsx-a11y/no-static-element-interactions: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { addGlobalEventListener, removeGlobalEventListener } from '../../utils/misc';

import './_headingstoc.less';

const toggleCollapse = (e) => {
    e.currentTarget.parentElement.classList.toggle('collapsed');
    e.currentTarget.parentElement.classList.toggle('expanded');
};

const handleItemClick = (heading) => {
    navigate(`${window.location.pathname}#${heading.id ? heading.id : ''}`);
};

class HeadingsTOC extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headings: null
        };
        this.onScroll = () => this.forceUpdate();
        this.navRefCallback = (el) => {
            this.navRef = el;
        };
    }

    componentDidMount() {
        if (this.state.headings == null) {
            this.findHeadingContent();
        }

        addGlobalEventListener('onscroll', this.onScroll);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currPath !== this.props.currPath) {
            this.setState({
                headings: null
            });
        }
    }

    componentDidUpdate() {
        if (this.state.headings === null) {
            this.findHeadingContent();
        }
    }

    componentWillUnmount() {
        removeGlobalEventListener('onscroll', this.onScroll);
    }

    // Uses vanilla javascript to look for headings
    findHeadingContent() {
        const navHeadings = [];
        const bodyContent = document.body.getElementsByClassName('markdown')[0];
        if (bodyContent) {
            const headings = bodyContent.querySelectorAll(['h2', 'h3']);
            for (let i = 0; i < headings.length; i++) {
                // Some headings may have 'display:none' from CSS and not have a height
                // Check for textContent and a non-zero height
                if (headings[i].textContent && headings[i].offsetHeight > 0) {
                    navHeadings.push(headings[i]);
                }
            }
        }
        this.setState({
            headings: navHeadings
        });
    }

    render() {
        if (!this.state.headings || this.state.headings.length === 0) {
            return null;
        }

        // For all of the previously calculated headings, calculate top positioning
        const headingRenderData = this.state.headings.map((heading) => {
            const tagName = heading.tagName.toUpperCase();
            return {
                top: heading.getBoundingClientRect().top - 125,
                tagName,
                textContent: heading.textContent,
                visible: tagName === 'H2',
                active: false,
                id: heading.id,
                el: heading,
                collapsed: true,
                expanded: false,
                parent: false
            };
        });
        let currentParentIndex = 0;

        // Loop over all headings to find the one that is closest to the top of the window
        for (let i = 0; i < headingRenderData.length; i++) {
            const h = headingRenderData[i];
            if (h.tagName === 'H2') {
                currentParentIndex = i;
            }

            const hNext = i < headingRenderData.length - 1 ? headingRenderData[i + 1] : null;

            // If the heading is above the top and the next heading is not - set it as active
            if (h.top < 0 && (!hNext || hNext.top >= 0)) {
                this.activeHeading = true;
                h.active = true;
                h.visible = true;

                // validParentTag keeps track of which headings to mark as visible
                // while iterating through the remaining headings
                let validParentTag = h.tagName;
                for (let j = i; j >= 0; j--) {
                    const prev = headingRenderData[j];
                    if (prev.tagName === validParentTag) {
                        prev.visible = true;
                    } else if (prev.tagName < validParentTag) {
                        prev.visible = true;
                        validParentTag = prev.tagName;
                    }
                }

                validParentTag = hNext && hNext.tagName > h.tagName ? hNext.tagName : h.tagName;
                for (let j = i + 1; j < headingRenderData.length; j++) {
                    const next = headingRenderData[j];
                    if (next.tagName === validParentTag) {
                        next.visible = true;
                    } else if (next.tagName < validParentTag) {
                        next.visible = true;
                        validParentTag = next.tagName;
                    }
                }
            }
            if (i > 0 && headingRenderData.length > 1) {
                const current = headingRenderData[i];

                if (current.tagName > headingRenderData[currentParentIndex].tagName) {
                    headingRenderData[currentParentIndex].parent = true;
                    if (headingRenderData[currentParentIndex].active) {
                        headingRenderData[currentParentIndex].expanded = true;
                    }
                    if (current.active) {
                        headingRenderData[currentParentIndex].expanded = true;
                    }
                }
            }
        }
        // currently element.scrollIntoView is being used to scroll the page
        // element is rendered as a button for accessibility
        return (
            <ul className='headings-toc'>
                {
                    headingRenderData.filter((h) => h.visible).map((heading) => (
                        <li
                            key={heading.textContent}
                            className={
                                (heading.active ? 'child active' : 'child')
                                + (heading.parent ? ' parent' : '')
                                + (heading.expanded ? ' expanded' : '')
                                + (heading.tagName === 'H3' ? ' nested-child' : '')}
                            onClick={() => handleItemClick(heading)}
                            role='menuitem'>
                            {heading.parent &&
                                <span
                                    role='button'
                                    className='icon'
                                    onClick={toggleCollapse} />}
                            <div
                                className={`heading-nav-element ${heading.tagName}`}>
                                <span>{heading.textContent}</span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        );
    }
}

HeadingsTOC.propTypes = {
    currPath: PropTypes.string.isRequired
};

export default HeadingsTOC;
