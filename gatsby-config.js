let activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development';
let preview = process.env.PREVIEW || false;
let pathPrefix = process.env.PATH_PREFIX || '';
let imagePathPrefix = pathPrefix ? pathPrefix.replace(/\/?$/, '/') : '/';

if (pathPrefix) {
  console.log('Generating paths prefix: ', pathPrefix);
}
console.log(`Using environment config: '${activeEnv}'`);

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})


module.exports = {
  pathPrefix,
  siteMetadata: {
    title: `mParticle Documentation`,
    siteUrl: `https://docs.mparticle.com`
  },
  // https://www.gatsbyjs.org/docs/plugins/
  plugins: [
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        resolveEnv: () => activeEnv,
        env: {
          development: {
            policy: [{ userAgent: `*`, disallow: [`/`] }]
          },
          production: {
            policy: [{ userAgent: `*`, allow: `/` }]
          }
        }
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-less`,
      options: {
        modifyVars: {
          '@prefix': imagePathPrefix,
        },
      }
    },
    // {
    //   resolve: `@mparticle/gatsby-plugin-mparticle`,
    //   options: {
    //     apiKey: '68d203c851cfdc46a49a1067f2f74122',
    //     logPageViews: false,
    //     config: {
    //       isDevelopmentMode: activeEnv != 'production',
    //       useCookieStorage: true,
    //     }
    //   }
    // },
    `gatsby-transformer-javascript-frontmatter`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        'pedantic': false, // pedantic does something different?  At least requires escaping '_' in the middle of words like session\_duration\_ms to avoid <em> tagging
        plugins: [
          {
            resolve: `gatsby-preview-generator`,
            options: {
              pathPrefix,
            },
          },
          `gatsby-plugin-markdown-code-selector`, // custom plugin in plugins folder
          'gatsby-remark-a11y-emoji', // emojis
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
                icon: `<svg width="16px" height="17px" viewBox="0 0 16 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Icon/Link" fill="#98A0A3" fill-rule="nonzero">
                        <g id="link">
                            <path d="M9.5,12.4 C9.6,12.4 9.7,12.4 9.9,12.4 C9.8,12.5 9.8,12.5 9.7,12.6 L7.5,14.8 C5.8,16.5 3,16.5 1.3,14.8 C-0.4,13.1 -0.4,10.3 1.3,8.6 L3.5,6.4 C3.6,6.3 3.6,6.3 3.7,6.2 C5,5 6.9,4.8 8.4,5.5 C8.8,5.7 9.3,6 9.6,6.4 C10,6.7 10.2,7.2 10.5,7.6 C10.2,7.9 9.9,8 9.5,8 C9.4,8 9.2,8 9.1,7.9 C8.9,7.5 8.5,7.2 8.1,6.9 C7,6.2 5.5,6.4 4.5,7.3 L3.8,8 L2.3,9.5 C1.2,10.6 1.2,12.5 2.3,13.6 C3.4,14.7 5.3,14.7 6.4,13.6 L7.9,12.1 C8.4,12.3 8.9,12.4 9.5,12.4 Z M14.7,1.3 C13,-0.4 10.2,-0.4 8.5,1.3 L6.3,3.5 C6.2,3.6 6.2,3.6 6.1,3.7 C6.7,3.7 7.4,3.7 8,3.9 L9.5,2.4 C10.6,1.3 12.5,1.3 13.6,2.4 C14.7,3.5 14.7,5.4 13.6,6.5 L12.1,8 L11.4,8.7 C10.4,9.7 8.9,9.8 7.8,9.1 C7.4,8.9 7.1,8.5 6.8,8.1 C6.7,8.1 6.5,8 6.4,8 C6,8 5.6,8.2 5.4,8.4 C5.6,8.8 5.9,9.3 6.3,9.6 C6.6,10 7.1,10.2 7.5,10.5 C9,11.2 10.9,11 12.3,9.8 C12.4,9.7 12.4,9.7 12.5,9.6 L14.7,7.4 C16.4,5.7 16.4,3 14.7,1.3 Z" id="Shape"></path>
                        </g>
                    </g>
                </g>
            </svg>`,
                className: 'anchor'
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-smartypants`
        ],
      },
    },
    `gatsby-plugin-sharp`,
  ],
  mapping: { // https://www.gatsbyjs.org/docs/gatsby-config/#mapping-node-types
    // THIS MAPPING IS TRUE BUT REMAPPING 'parent' and 'child' fields is prohibited
    // JavascriptFrontmatter.parent': 'File',
    'PageMetadata.metadataParent': 'PageMetadata',
    'PageMetadata.metadataChildren': 'PageMetadata',
    'PageMetadata.metadataSiblings': 'PageMetadata'
  }
}