import React from "react"
import HeaderFooterLayout from './headerfooter';
import { graphql, Link } from 'gatsby';
import LeftNavPane from '../components/LeftNavPane/leftnavpane';
import TableOfContents from '../components/TableOfContents/tableofcontents';
import CategoryChooser from '../components/CategoryChooser/categorychooser';

export default (props) => {
    return (
        <HeaderFooterLayout metadata={props.currPageMetadata} location={props.location}>
            <LeftNavPane currPath={props.location.pathname}>
                <TableOfContents metadata={props.currPageMetadata} />
                <CategoryChooser currPageMetadata={props.currPageMetadata}
                    location={props.location} />
            </LeftNavPane>
            {props.children}
        </HeaderFooterLayout>
    );
}
