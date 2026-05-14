import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import Page from "../components/common/Page";
import Panel from "../components/layout/Panel";

const PrivacyContent = styled.div`
  text-align: left;

  a {
    color: inherit;
    text-decoration: underline;

    &:hover {
      color: var(--color-text-link-hover);
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    border-bottom: none;
    letter-spacing: normal;
    margin: 20px 0 10px;
    padding: 0;
  }

  hr {
    border: none;
    border-top: 1px solid var(--color-secondary);
    margin: 20px 0;
  }
`;

const PrivacyPage = ({ data }) => (
  <Page>
    <Panel title="privacy policy">
      <PrivacyContent
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      />
    </Panel>
  </Page>
);

export default PrivacyPage;

export function Head() {
  return (
    <>
      <html lang="en" />
      <title>Privacy Policy</title>
      <meta
        name="description"
        content="Privacy policy for golebiowski.dev — how personal data is handled under GDPR."
      />
    </>
  );
}

export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { slug: { eq: "privacy-policy" } }) {
      html
    }
  }
`;
