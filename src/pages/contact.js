import React from "react";
import styled from "styled-components";
import Page from "../components/Page";
import Panel from "../components/Panel";

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
          <span>You can find me on <a href="https://www.linkedin.com/in/grzegorz-golebiowski">LinkedIn</a>.</span>
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
    </>
  )
}