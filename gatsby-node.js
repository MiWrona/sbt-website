/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it


const path = require(`path`)
const slugify = require('slugify')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/layouts/post.js`)

  const result = await graphql (`
  query queryCMSPage {
    allDatoCmsArticle {
      nodes {
        id
        title
      }
    }
  }
  `);

    result.data.allDatoCmsArticle.nodes.forEach(post => {
      const slugifiedTitle = slugify(post.title, {
        lower:true 
      });

      createPage({
    
        path: `aktualnosci/${slugifiedTitle}`,
        component: blogPostTemplate,
        context: {
            id: post.id,  
        },
      })
    })
  }