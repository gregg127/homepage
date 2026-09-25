import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import Page from "../components/common/Page";
import Panel from "../components/layout/Panel";
import Seo from "../components/common/Seo";

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
    margin: 20px 0 10px;
  }

  hr {
    border: none;
    border-top: 1px solid var(--color-secondary);
    margin: 20px 0;
  }
`;

const PrivacyPage = ({ data }) => (
  <Page>
    <Panel title="privacy policy" as="h1">
      <PrivacyContent
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      />
    </Panel>
  </Page>
);

export default PrivacyPage;

export function Head() {
  return (
    <Seo
      title="Privacy Policy"
      description="Privacy policy for golebiowski.dev"
      pathname="/privacy/"
    />
  );
}

export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { slug: { eq: "privacy-policy" } }) {
      html
    }
  }
`;
