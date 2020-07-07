import React from 'react';
import PropTypes from 'prop-types';
// import LeftNavPane from '../../components/LeftNavPane/leftnavpane';
// import './_template.less';

const GuidesTemplate = (props) => (
    <div className='developer'>
        { props.children }
    </div>
);

GuidesTemplate.data = {
    title: 'Guides',
    showWhenLast: true,
    // noBreadcrumb: true
};

GuidesTemplate.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GuidesTemplate;
