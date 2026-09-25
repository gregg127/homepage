import React from "react";
import { graphql, useStaticQuery } from "gatsby";

const OG_IMAGE = { path: "/og-image.png", width: 1200, height: 630 };

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
  const { author, siteUrl, ...defaults } = site.siteMetadata;

  const pageTitle = title ? `${title} · ${author}` : defaults.title;
  const pageDescription = description ?? defaults.description;
  const canonicalUrl =
    pathname && !noindex ? `${siteUrl}${withTrailingSlash(pathname)}` : null;
  const imageUrl = `${siteUrl}${OG_IMAGE.path}`;
  const imageAlt = defaults.title;

  return (
    <>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      {noindex && <meta name="robots" content="noindex" />}

      {canonicalUrl && (
        <>
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:url" content={canonicalUrl} />
        </>
      )}

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={author} />
      <meta property="og:locale" content="en_US" />

      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={OG_IMAGE.width} />
      <meta property="og:image:height" content={OG_IMAGE.height} />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {children}
    </>
  );
};

export default Seo;
