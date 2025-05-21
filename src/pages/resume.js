import React from "react";
import Page from "../components/common/Page";
import Panel from "../components/layout/Panel";

const ResumePage = () => (
  <Page>
    <Panel title="my resume">
      <span>you can download my CV as PDF file from ...</span>
    </Panel>
  </Page>
);

export default ResumePage;

export function Head() {
  return (
    <>
      <html lang="en" />
      <title>Resume</title>
    </>
  )
}