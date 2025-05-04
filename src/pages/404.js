import React from "react";
import styled from "styled-components";
import Page from "../components/Page";
import Panel from "../components/Panel";

const NotFound = styled.div`
  div {
    text-align: center;
  }
`;

const NotFoundPage = () => (
  <Page>
    <NotFound>
      <Panel title="page not found">
        <div>
          <span>try something else</span>
        </div>
      </Panel>
    </NotFound>
  </Page>
);

export default NotFoundPage;

export function Head() {
  return (
    <>
      <html lang="en" />
      <title>Not Found</title>
    </>
  )
}