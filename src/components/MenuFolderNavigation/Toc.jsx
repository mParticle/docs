import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';
import MenuItem from './MenuItem';
import MenuFolder from './MenuFolder';
import TOCContext from '../TOCContext';

const TOC = ({ children }) => {
    const {
        label,
        path,
        children: tocItems,
        collapsable,
        headerIcon,
    } = useContext(TOCContext);

    const location = useLocation();

    return (
        <div className='table-of-contents'>
            <div className='header'>
                <span className='header-section'>
                    <MenuItem icon={headerIcon} label={label} path={path} />
                </span>
            </div>
            {children}
            <ul className='toc-body'>
                {tocItems.map((element) => (
                    <MenuFolder
                        key={element.id}
                        id={element.id}
                        label={element.label}
                        path={element.path}
                        offsiteLink={element.offsiteLink}
                        currentLocation={location}
                        collapsable={collapsable}>
                        {element.children}
                    </MenuFolder>
                ))}
            </ul>
        </div>
    );
};

TOC.propTypes = {
    children: PropTypes.node,
};

TOC.defaultProps = {
    children: null,
};

export default TOC;
