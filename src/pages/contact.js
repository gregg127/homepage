import React from "react";
import styled from "styled-components";
import Page from "../components/common/Page";
import Panel from "../components/layout/Panel";
import Link from "../components/ui/Link";

const Contact = styled.div`
  div {
    text-align: center;
  }
`;

const ContactPage = () => (
  <Page>
    <Contact>
      <Panel title="any questions?">
        <div>
          You can find me on <Link href="https://www.linkedin.com/in/grzegorz-golebiowski">LinkedIn</Link>.
        </div>
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
      <meta name="description" content="Get in touch with Grzegorz Gołębiowski via LinkedIn." />
    </>
  )
}