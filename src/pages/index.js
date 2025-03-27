import React from "react";
import styled from "styled-components";
import Page from "../components/Page";
import Panel from "../components/Panel";

const Intro = styled.div`
  font-size: 1.2em;
`;

const IndexPage = () => (
  <Page>
    <Intro>
      <Panel title="GRZEGORZ GOŁĘBIOWSKI">
        <span>computer science graduate | software engineer | tech lead</span>
      </Panel>
    </Intro>
  </Page>
);

export default IndexPage;

export function Head() {
  return (
    <>
      <html lang="en" />
      <title>Homepage</title>
    </>
  )
}