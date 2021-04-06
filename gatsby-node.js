// In your gatsby-node.js
const path = require(`path`);
const crypto = require(`crypto`);
const redirects = require(`./config/manualRedirects.json`);
const fs = require('fs');
const fs_e = require('fs-extra');
const remark = require('remark')
const strip = require('strip-markdown')
const { v4: uuidv4 } = require('uuid');
// Documentation for these APIs and other functionality is here:
// https://www.gatsbyjs.org/docs/node-apis/

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  let slug

  // set 'frontmatter' field on Javascript files that have a 'frontmatter' export so that they can
  // have the same structure as pages generated from markdown
  if (node.internal.mediaType === `application/javascript` && node.children && node.children[0]) {
    const childNodeName = node.children[0];
    const childNode = getNode(childNodeName);
    if (childNode.frontmatter) {
      createNodeField({ node, name: `frontmatter`, value: childNode.frontmatter });
    }
  }

  // For both Javascript and Markdown pages -> generate a 'slug' or path for the file
  if (node.internal.type === `MarkdownRemark` || node.internal.type === `JavascriptFrontmatter`) {
    const fileNode = getNode(node.parent) 
    const parsedFilePath = path.parse(fileNode.relativePath)
    /* Potential clash for 'index' and '_template' files - but we shouldn't be using both */
    if (parsedFilePath.name !== `index` && parsedFilePath.name !== `_template` && parsedFilePath.dir !== ``) {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
    } else if (parsedFilePath.dir === ``) {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    // Add slug as a field on the node.
    createNodeField({ node, name: `slug`, value: slug })
  }
}

exports.onCreateWebpackConfig = ({
    stage,
    rules,
    loaders,
    plugins,
    actions,
  }) => {
    actions.setWebpackConfig({
      module: {
        rules: [
          /* Don't need this less webpack config because 'gatsby-plugin-less' is used instead
          {
            test: /\.less$/,
            use: [
              // We don't need to add the matching ExtractText plugin
              // because gatsby already includes it and makes sure its only
              // run at the appropriate stages, e.g. not in development
              loaders.miniCssExtract(),
              loaders.css({ importLoaders: 1 }),
              // the postcss loader comes with some nice defaults
              // including autoprefixer for our configured browsers
              loaders.postcss(),
              `less-loader`,
            ],
          },*/

          /* This custom loader override was used in v0 but not in v2
          {
            test: /\.md$/,
            loaders: ['markdown-loader'],
          }, */
        ],
      },
      plugins: [
        plugins.define({
          __DEVELOPMENT__: stage === `develop` || stage === `develop-html`,
        }),
      ],
    })
  }

  exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
      type PageMetadata implements Node @infer {
        path: String
        metadataParent: PageMetadata @link
        metadataChildren: [PageMetadata] @link
        metadataSiblings: [PageMetadata] @link
        title: String
        order: Float
        redirect: String
        partnerId: Int
        partnerImageOverride: String
        draft: Boolean
        sourceCode: String
        showWhenLast: Boolean
        noBreadcrumb: Boolean
        headersTocOnly: Boolean
      }
    `
    createTypes(typeDefs)
  }

  exports.createPages = async function({ graphql, boundActionCreators }) {
    const { createPage, createNode, createRedirect } = boundActionCreators
    const metadataFields = [
      'title',
      'order',
      'redirect',
      'partnerId',
      'partnerImageOverride',
      'draft',
      'sourceCode',
      'showWhenLast',
      'noBreadcrumb',
      'headingsTocOnly'
    ];
      const pages = []
      const defaultMarkdown = path.resolve("src/templates/markdownpage.js");
      const integrationsTemplate = path.resolve('src/templates/IntegrationsTemplate.jsx');
      // Query for all markdown "nodes" and for the slug we previously created.
        await graphql(
          `
            {
              allMarkdownRemark {
                edges {
                  node {
                    frontmatter {
                      title
                      order
                      redirect
                    }
                    fields {
                      slug
                    }
                  }
                }
              }
              allJavascriptFrontmatter {
                edges {
                  node {
                    fileAbsolutePath
                    frontmatter {
                      ${metadataFields.join('\n')}
                    }
                    fields {
                      slug
                    }
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }

          /* 
          BEGIN HELPER CODE SECTION FOR GENERATING PageMetadata nodes in GraphQL framework 
          */

          // This map is used to build a real tree/graph of the pages in the site along with their
          // respective metadata to use for NavPane or other data that may be needed in a component
          const metadataMap = {};
          // This function adds parent nodes starting at {path} and ending at '/' if they haven't been added yet
          // The nodes are type PageMetadata
          let createParentTreeFromPath = (path) => {
            const pathComponents = path.split('/').filter(x => x);
            let nodeId = pathComponents.join('/');
            let parentPath = pathComponents.length > 1 ? pathComponents.slice(0, pathComponents.length - 1).join('/') : null;
            let parentId = parentPath ? `${parentPath} PageMetadata` : null;

            nodeId = `${nodeId} PageMetadata`;
            let firstNodeVisit = false;

            if (!metadataMap[nodeId]) {
              metadataMap[nodeId] = { id: nodeId, internal: { type: 'PageMetadata'} };
              firstNodeVisit = true;
            }
            metadataMap[nodeId].path = path;
            if (parentId) {
              metadataMap[nodeId].metadataParent = parentId;
              if (!metadataMap[parentId]) {
                createParentTreeFromPath(`/${parentPath}/`);
              }
              if (!metadataMap[parentId].metadataChildren) {
                metadataMap[parentId].metadataChildren = [];
              }
              
              if (firstNodeVisit) {
                metadataMap[parentId].metadataChildren.push(nodeId);
              }
            }

            return metadataMap[nodeId];
          };

          // Copy metadata/frontmatter fields from target node into a PageMetadata node
          let extendMetadata = (node) => {
            const currNode = createParentTreeFromPath(node.fields.slug);

            if (node.frontmatter) {
              metadataFields.forEach(f => {
                if (node.frontmatter[f])
                  currNode[f] = node.frontmatter[f];
              });
            }

            return currNode;
          }

          /*
          END HELPER CODE SECTION
          */

          
          // Iterate over all JS files that have exported frontmatter
          // These files should already have pages created for them automatically but we still
          // need to generate the PageMetadata nodes for them
          // Visit these first so that parent data will be available for the child
          // markdown pages in the next loop
          result.data.allJavascriptFrontmatter.edges.forEach(edge => {
            extendMetadata(edge.node);
            if (edge.node.frontmatter.redirect) {
              createRedirect({
                fromPath: edge.node.fields.slug,
                isPermanent: false,
                toPath: edge.node.frontmatter.redirect,
                redirectInBrowser: true
              });
            }
          });

          // Create blog posts pages from markdown files
          result.data.allMarkdownRemark.edges.forEach(edge => {
            const path = edge.node.fields.slug;

            // Populate the PageMetadata nodes for the markdown file
            const metadataNode = extendMetadata(edge.node);

            /*if (metadataNode.metadataParent && metadataMap[metadataNode.metadataParent].sourceCode) {
              metadataNode.sourceCode = metadataMap[metadataNode.metadataParent].sourceCode;
            }*/

            // Add a 'redirect' instead of a page if 'redirect' is specified in frontmatter
            if (edge.node.frontmatter.redirect) {
              createRedirect({
                fromPath: edge.node.fields.slug,
                isPermanent: true,
                toPath: edge.node.frontmatter.redirect,
                redirectInBrowser: true
              });
            }
            else {
              // All values passed in the 'context' object can be exposed in a GraphQL page query
              // https://www.gatsbyjs.org/docs/page-query/
              const targetComponent = path.indexOf('/integrations') === 0 ? integrationsTemplate : defaultMarkdown;
              createPage({
                path: path, // required
                component: targetComponent,
                context: {
                  slug: path
                },
              })
            }
          })

          // Reorder all 'children' in PageMetadata nodes by 'order' field
          Object.keys(metadataMap).forEach(k => {
            const currNode = metadataMap[k];
            if (currNode.metadataChildren) {
              currNode.metadataChildren = currNode.metadataChildren
                .sort((a, b) => {
                  let titleA = metadataMap[a].title;
                  let titleB = metadataMap[b].title;
                  let orderA = metadataMap[a].order;
                  let orderB = metadataMap[b].order;
                  if (orderA) {
                    if (orderB) {
                      return orderA - orderB;
                    } else {
                      return -1;
                    }
                  } else if (orderB) {
                    return 1;
                  } else {
                    let titleA = (metadataMap[a].title || '').toLowerCase();
                    let titleB = (metadataMap[b].title || '').toLowerCase();
                    titleA = titleA && titleA.toLowerCase();
                    titleB = titleB && titleB.toLowerCase();

                    return titleA.localeCompare(titleB);
                  }
                });
            }
          });

          // Create a PageMetadata node for each object in the metadataMap
          Object.keys(metadataMap).forEach(k => {
            const currNode = metadataMap[k];
            const objStr = JSON.stringify(currNode);
            // This contentDigest is a required field that has something to do with internal diffing
            // that Gatsby uses to decide what needs to be rebuilt if a file changes
            const contentDigest = crypto.createHash(`md5`).update(objStr).digest(`hex`);
            currNode.internal.contentDigest = contentDigest;
            createNode(currNode);
          });

          // Create a redirect for all pairs in 'manualRedirects.json'
          redirects.forEach((r) => {
            createRedirect({
              fromPath: r[0],
              isPermanent: true,
              toPath: r[1],
              redirectInBrowser: true
            });
          });

          return
        })
  }

exports.onPostBuild = (args) => {
  return Promise.resolve(args.graphql(`
  {
    allPageMetadata {
      edges {
        node {
          metadataParent {
            title
          }
          title
          path
        }
      }
    } 
    allMarkdownRemark {
      edges {
        node {
          id
          fileAbsolutePath
          rawMarkdownBody
          frontmatter {
            title
            redirect
          }
          fields {
            slug
          }
        }
      }
    }
    allJavascriptFrontmatter (filter: {frontmatter: {redirect: {ne: null}}}) {
      edges {
        node {
          fileAbsolutePath
          frontmatter {
            redirect
          }
        }
      }
    }
  }
  `)).then((result) => {
    if (result.errors) {
      console.log(result.errors)
      reject(result.errors)
    }

    const copyForRedirect = (page, redirect) => {
      let writePieces = path.parse(page);
      const isDefaultName = writePieces.name === 'index' || writePieces.name === '_template';
      const writePath = path.join(writePieces.dir, isDefaultName ? '' : writePieces.name, '/index.html')
      .replace('/src/pages/', '/public/').replace('\\src\\pages\\', '\\public\\');
      //const writePath = path.join('./public', page, '/index.html');
      const readPath = path.join(__dirname, '/public/', redirect, '/index.html');
      fs_e.copySync(readPath, writePath);
    }

    var slugTitles = {}
    const generateSearchItem = function(node) {
      if (!node.rawMarkdownBody || !node.rawMarkdownBody.trim().length) {
         return null
      }
      var searchItem = { id: uuidv4(), type: 'add'}
      searchItem.fields = { title: slugTitles[node.fields.slug] || node.frontmatter.title}
      searchItem.fields.url = node.fields.slug.substring(1)
      
      searchItem.fields.content = remark()
                            .use(strip)
                            .processSync(node.rawMarkdownBody)
                            .toString()
      
      return searchItem
    }

    result.data.allPageMetadata.edges.forEach((e) => {
      if (e.node.metadataParent) {
        slugTitles[e.node.path] = e.node.metadataParent.title + ' | ' + e.node.title 
      } else {
        slugTitles[e.node.path] = e.node.title
      }
    });

    var searchItems = []
    result.data.allMarkdownRemark.edges.forEach((e) => {
      if (e.node.frontmatter.redirect) {
        copyForRedirect(e.node.fileAbsolutePath, e.node.frontmatter.redirect)
      }
      var newItem = generateSearchItem(e.node)
      if (newItem) {
        searchItems.push(newItem)
      }

    });

    fs.writeFileSync('latest_search_items.json', JSON.stringify(searchItems, null, 4))

    result.data.allJavascriptFrontmatter.edges.forEach((e) => {
      copyForRedirect(e.node.fileAbsolutePath, e.node.frontmatter.redirect);
    });


    // TODO: Need to do manualRedirects file?  Probably not since these are legacy paths 
    // and we might not want to index them

    return;
  });
};
