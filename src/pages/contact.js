import React from "react";
import styled from "styled-components";
import Page from "../components/common/Page";
import Panel from "../components/layout/Panel";
import Link from "../components/ui/Link";

const Contact = styled.div`
  p {
    text-align: center;
    margin: 0 0 16px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ContactPage = () => (
  <Page>
    <Contact>
      <Panel title="any questions?">
        <p>
          Drop me a line at{" "}
          <Link href="mailto:grzegorz.golebiowski127@gmail.com">
            grzegorz.golebiowski127@gmail.com
          </Link>
          .
        </p>
        <p>
          I'm also on{" "}
          <Link href="https://github.com/gregg127" openInNewTab>
            GitHub
          </Link>{" "}
          and{" "}
          <Link
            href="https://www.linkedin.com/in/grzegorz-golebiowski"
            openInNewTab
          >
            LinkedIn
          </Link>
          .
        </p>
      </Panel>
    </Contact>
  </Page>
);

export default ContactPage;

export function Head() {
  return (
    <>
      <html lang="en" />
      <title>Contact</title>
      <meta
        name="description"
        content="Get in touch with Grzegorz Gołębiowski."
      />
    </>
  );
}

