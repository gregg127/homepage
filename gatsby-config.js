/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Homepage`,
    siteUrl: `https://www.yourdomain.tld`,
  },

  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
    },
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
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Lato`,
            file: `https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap`,
          },
        ],
      },
    },
  ],
}
