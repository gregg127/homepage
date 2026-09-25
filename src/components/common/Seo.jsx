import React from "react";
import { graphql, useStaticQuery } from "gatsby";

const withTrailingSlash = (pathname) =>
  pathname.endsWith("/") ? pathname : `${pathname}/`;

const Seo = ({ title, description, pathname, noindex = false, children }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);
  const siteMetadata = site.siteMetadata;
  const canonicalUrl =
    pathname && !noindex
      ? `${siteMetadata.siteUrl}${withTrailingSlash(pathname)}`
      : null;

  return (
    <>
      <html lang="en" />
      <title>{title ?? siteMetadata.title}</title>
      <meta
        name="description"
        content={description ?? siteMetadata.description}
      />
      {noindex && <meta name="robots" content="noindex" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {children}
    </>
  );
};

export default Seo;
