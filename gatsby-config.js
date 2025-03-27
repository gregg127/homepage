/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Homepage`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  
  plugins: [`gatsby-plugin-styled-components`,
    `gatsby-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `@browniebroke/gatsby-image-gallery`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static`,
        path: `${__dirname}/static/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Homepage`,
        short_name: `homepage`,
        lang: 'en',
        start_url: `/`,
        display: `standalone`,
        icon: `static/favicon.svg`, 
      },
    },
  ],
}
