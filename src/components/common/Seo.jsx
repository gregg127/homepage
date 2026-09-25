import React from "react";
import { graphql, useStaticQuery } from "gatsby";

const withTrailingSlash = (pathname) =>
  pathname.endsWith("/") ? pathname : `${pathname}/`;

const Seo = ({
  title,
  description,
  pathname,
  ogType = "website",
  noindex = false,
  children,
}) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `);
  const siteMetadata = site.siteMetadata;
  const pageTitle = title ?? siteMetadata.title;
  const pageDescription = description ?? siteMetadata.description;
  const canonicalUrl =
    pathname && !noindex
      ? `${siteMetadata.siteUrl}${withTrailingSlash(pathname)}`
      : null;

  return (
    <>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {noindex && <meta name="robots" content="noindex" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteMetadata.author} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary" />
      {children}
    </>
  );
};

export default Seo;
