/**
 * @type {import('gatsby').GatsbyConfig}
 */
const siteMetadata = {
  title: `Grzegorz Gołębiowski - Principal Engineer, Tech Lead`,
  description: `Personal website of Grzegorz Gołębiowski - software engineer, tech lead, and computer science graduate.`,
  author: `Grzegorz Gołębiowski`,
  jobTitle: `Principal Engineer`,
  email: `grzegorz.golebiowski127@gmail.com`,
  siteUrl: `https://golebiowski.dev`,
  social: {
    github: `https://github.com/gregg127`,
    linkedin: `https://www.linkedin.com/in/grzegorz-golebiowski`,
  },
};

module.exports = {
  siteMetadata,

  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
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
        name: siteMetadata.title,
        short_name: siteMetadata.author,
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
        sitemap: `${siteMetadata.siteUrl}/sitemap-index.xml`,
        policy: [
          { userAgent: "*", allow: "/" },
          { userAgent: "GPTBot", disallow: "/" },
          { userAgent: "ClaudeBot", disallow: "/" },
          { userAgent: "CCBot", disallow: "/" },
          { userAgent: "Google-Extended", disallow: "/" },
          { userAgent: "PerplexityBot", disallow: "/" },
          { userAgent: "Grok", disallow: "/" },
          { userAgent: "Bytespider", disallow: "/" },
          { userAgent: "Amazonbot", disallow: "/" },
          { userAgent: "Meta-ExternalAgent", disallow: "/" },
        ],
      },
    },
  ],
};
