/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Grzegorz Gołębiowski - personal website`,
    siteUrl: `https://golebiowski.dev`,
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
        name: `Grzegorz Gołębiowski - personal website`,
        short_name: `Grzegorz Gołębiowski`,
        lang: "en",
        start_url: `/`,
        display: `standalone`,
        icon: `static/favicon.svg`,
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        mode: `render-blocking`,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `Lato`,
            file: `https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap`,
          },
          {
            name: `Courier Prime`,
            file: `https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
  ],
};
