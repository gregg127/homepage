import React from "react";
import Page from "../components/Page";
import Panel from "../components/Panel";

const ContactPage = () => (
  <Page>
    <Panel title="any questions?">
      <span>you can find me on <a href="https://www.linkedin.com/in/grzegorz-golebiowski">LinkedIn</a></span>
    </Panel>
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