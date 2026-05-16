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
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-autolink-headers`],
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
          { userAgent: "*", allow: "/" },
          { userAgent: "GPTBot", allow: "/llms.txt", disallow: "/" },
          { userAgent: "ClaudeBot", allow: "/llms.txt", disallow: "/" },
          { userAgent: "CCBot", allow: "/llms.txt", disallow: "/" },
          { userAgent: "Google-Extended", allow: "/llms.txt", disallow: "/" },
          { userAgent: "PerplexityBot", allow: "/llms.txt", disallow: "/" },
          { userAgent: "Grok", allow: "/llms.txt", disallow: "/" },
          { userAgent: "Bytespider", allow: "/llms.txt", disallow: "/" },
          { userAgent: "Amazonbot", allow: "/llms.txt", disallow: "/" },
          { userAgent: "Meta-ExternalAgent", allow: "/llms.txt", disallow: "/" },
        ],
      },
    },
  ],
};
