import React from "react";
import { graphql, useStaticQuery } from "gatsby";

const Seo = ({ title, description, children }) => {
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
      {children}
    </>
  );
};

export default Seo;
