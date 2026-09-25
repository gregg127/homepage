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
  const { email, social } = useSiteMetadata();

  return (
    <Page>
      <Contact>
        <Panel title="any questions?" as="h1">
          <p>
            Drop me a line at <Link href={`mailto:${email}`}>{email}</Link>.
          </p>
          <p>
            I'm also on{" "}
            <Link href={social.github} openInNewTab>
              GitHub
            </Link>{" "}
            and{" "}
            <Link href={social.linkedin} openInNewTab>
              LinkedIn
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
      description="Get in touch with Grzegorz Gołębiowski, Principal Engineer and Java tech lead - by email, on GitHub, or on LinkedIn."
      pathname="/contact/"
    />
  );
}
