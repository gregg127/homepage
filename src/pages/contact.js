import React from "react";
import styled from "styled-components";
import Page from "../components/common/Page";
import Panel from "../components/layout/Panel";
import Link from "../components/ui/Link";
import Seo from "../components/common/Seo";
import useSiteMetadata from "../hooks/useSiteMetadata";

const Contact = styled.div`
  p {
    text-align: center;
    margin: 0;
  }

  p + p {
    margin-top: 16px;
  }
`;

const ContactPage = () => {
  const { social } = useSiteMetadata();

  return (
    <Page>
      <Contact>
        <Panel title="get in touch" as="h1">
          <p>
            Feel free to message me on{" "}
            <Link href={social.linkedin} openInNewTab>
              LinkedIn
            </Link>
            .
          </p>
          <p>
            I'm also on{" "}
            <Link href={social.github} openInNewTab>
              GitHub
            </Link>
            .
          </p>
        </Panel>
      </Contact>
    </Page>
  );
};

export default ContactPage;

export function Head() {
  return (
    <Seo
      title="Contact"
      description="Get in touch with Grzegorz Gołębiowski on LinkedIn or GitHub."
      pathname="/contact/"
    />
  );
}
