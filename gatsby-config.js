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
          { userAgent: "GPTBot", allow: ["/llms.txt", "/", "/about/", "/resume/", "/contact/", "/privacy/"], disallow: "/" },
          { userAgent: "ClaudeBot", allow: ["/llms.txt", "/", "/about/", "/resume/", "/contact/", "/privacy/"], disallow: "/" },
          { userAgent: "CCBot", allow: ["/llms.txt", "/", "/about/", "/resume/", "/contact/", "/privacy/"], disallow: "/" },
          { userAgent: "Google-Extended", allow: ["/llms.txt", "/", "/about/", "/resume/", "/contact/", "/privacy/"], disallow: "/" },
          { userAgent: "PerplexityBot", allow: ["/llms.txt", "/", "/about/", "/resume/", "/contact/", "/privacy/"], disallow: "/" },
          { userAgent: "Grok", allow: ["/llms.txt", "/", "/about/", "/resume/", "/contact/", "/privacy/"], disallow: "/" },
          { userAgent: "Bytespider", allow: ["/llms.txt", "/", "/about/", "/resume/", "/contact/", "/privacy/"], disallow: "/" },
          { userAgent: "Amazonbot", allow: ["/llms.txt", "/", "/about/", "/resume/", "/contact/", "/privacy/"], disallow: "/" },
          { userAgent: "Meta-ExternalAgent", allow: ["/llms.txt", "/", "/about/", "/resume/", "/contact/", "/privacy/"], disallow: "/" },
        ],
      },
    },
  ],
};
