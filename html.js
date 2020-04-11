import React from 'react';
import PropTypes from 'prop-types';
//import DocumentTitle from 'react-document-title';

import { prefixLink } from 'gatsby-helpers';
import {Helmet} from "react-helmet";

import 'styles/main.less';

const BUILD_TIME = new Date().getTime()



function removeHTML(html) {
  return html.replace(/<[^>]*>/g, '');
}


module.exports = React.createClass({
  displayName: 'HTML',
  propTypes: {
    body: PropTypes.string,
  },
  render () {
    //const title = DocumentTitle.rewind()
    
    //Get the first paragraph of the body as a description
    const body = this.props.body;
    const firstParaStart = body.search(/<p>/);
    const firstParaEnd = body.search(/<\/p>/);
    const firstPara = body.slice(firstParaStart, firstParaEnd);
    const description = removeHTML(firstPara);



    let css
    if (process.env.NODE_ENV === 'production') {
      css = <style dangerouslySetInnerHTML={{ __html: require('!raw!./public/styles.css') }} />
    }

    const badHtml = {
      __html: `

            window.mParticle = {
              config: {
                useCookieStorage: true
              }
            };

     
            (function (apiKey) {
                window.mParticle = window.mParticle || {};
                window.mParticle.config = window.mParticle.config || {};
                window.mParticle.config.rq = [];
                window.mParticle.ready = function (f) { window.mParticle.config.rq.push(f); };
                var mp = document.createElement('script');
                mp.type = 'text/javascript';
                mp.async = true;
                mp.src = 'https://jssdkcdn.mparticle.com/js/V1/' + apiKey + '/mparticle.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(mp, s);
            })('');`
    }

    const helmet = Helmet.renderStatic();
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="bananagram" content="happy" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {helmet.title.toComponent()}
          {this.props.headComponents}
          <meta name="description" content={description} />
          {css}
        </head>
        <body>
          <div id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  },
});
