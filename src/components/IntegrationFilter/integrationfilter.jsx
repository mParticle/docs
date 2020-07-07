/* eslint jsx-a11y/no-static-element-interactions: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import './_integrationfilter.less';

const IntegrationFilter = ({ tags, filterFunc }) => (
    <div
        className='integration-filter'
        id='integration-filter'>
        <div className='top'>
            <p className='filter-by'>Filter by integration type</p>
            <span className='up-arrow' />
        </div>
        <ul className='tags-list'>
            {tags.map((tag) => (
                <li
                    key={tag.name}
                    onClick={(e) => filterFunc(e, tag.value)}>
                    {tag.name}
                </li>
            ))}
        </ul>
    </div>
);

IntegrationFilter.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
    })).isRequired,
    filterFunc: PropTypes.func.isRequired,
};

export default IntegrationFilter;
