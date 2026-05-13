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
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: null,
        sitemap: `https://golebiowski.dev/sitemap-index.xml`,
        policy: [
          { userAgent: '*', allow: '/' },
          { userAgent: 'GPTBot', disallow: '/' },
          { userAgent: 'ClaudeBot', disallow: '/' },
          { userAgent: 'CCBot', disallow: '/' },
          { userAgent: 'Google-Extended', disallow: '/' },
          { userAgent: 'PerplexityBot', disallow: '/' },
          { userAgent: 'Grok', disallow: '/' },
          { userAgent: 'Bytespider', disallow: '/' },
          { userAgent: 'Amazonbot', disallow: '/' },
          { userAgent: 'Meta-ExternalAgent', disallow: '/' },
        ],
      },
    },
  ],
};
