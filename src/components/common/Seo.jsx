import React from "react";
import { graphql, useStaticQuery } from "gatsby";

const Seo = ({ title, description, noindex = false, children }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);
  const siteMetadata = site.siteMetadata;

  return (
    <>
      <html lang="en" />
      <title>{title ?? siteMetadata.title}</title>
      <meta
        name="description"
        content={description ?? siteMetadata.description}
      />
      {noindex && <meta name="robots" content="noindex" />}
      {children}
    </>
  );
};

export default Seo;
