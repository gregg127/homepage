import { graphql, useStaticQuery } from "gatsby";

const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          jobTitle
          email
          siteUrl
          social {
            github
            linkedin
          }
        }
      }
    }
  `);
  return site.siteMetadata;
};

export default useSiteMetadata;
