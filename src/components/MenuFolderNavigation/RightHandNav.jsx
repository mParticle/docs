import React, { useEffect, useContext, useState } from 'react';

import PropTypes from 'prop-types';
import HeadingsContext from '../HeadingsContext';
import ScrollMenuItem from './ScrollMenuItem';
import './_righthandnav.less';

const renderHeadings = (headings) => {
    if (!headings || !headings.map) {
        return null;
    }
    return headings.map((heading) => (
        <ScrollMenuItem
            key={heading.id}
            label={heading.label}
            to={heading.anchor} />
    ));
};

const RightHandNavigation = ({ isMobile }) => {
    const [scrolled, setScrolled] = useState(false);
    const headings = useContext(HeadingsContext);

    if (!headings || !Array.isArray(headings) || headings.length < 1) {
        return null;
    }

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Remove listener when component is unmounted
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navBarClass = ['right-hand-nav'];
    if (isMobile) {
        navBarClass.push('mobile');
    }
    if (scrolled && !isMobile) {
        navBarClass.push('sticky');
    }

    return (
        <div className={navBarClass.join(' ')}>
            <div className='table-of-contents'>
                <div className='header'>On this page</div>
                <ul className='toc-children border'>
                    {renderHeadings(headings)}
                </ul>
            </div>
        </div>
    );
};

RightHandNavigation.propTypes = {
    isMobile: PropTypes.bool,
};

RightHandNavigation.defaultProps = {
    isMobile: false,
};

export default RightHandNavigation;
