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
        <span>computer science graduate and software engineer</span>
      </Panel>
    </Intro>
  </Page>
);

export default IndexPage;

export const Head = () => <title>Homepage</title>;
