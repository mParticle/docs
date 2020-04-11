import React from "react"
import HeaderFooterLayout from './headerfooter';
import { graphql, Link } from 'gatsby';
import LeftNavPane from '../components/LeftNavPane/leftnavpane';
import TableOfContents from '../components/TableOfContents/tableofcontents';

export default (props) => {
    const metadata = props.data;
    const currPath = props.currPath;
    return (
        <HeaderFooterLayout location={props.location} metadata={metadata}>
            <LeftNavPane currPath={props.location.pathname}>
                <TableOfContents metadata={metadata} />
            </LeftNavPane>
            {props.children}
        </HeaderFooterLayout>
    );
}
