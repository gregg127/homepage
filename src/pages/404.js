import React from "react";
import styled from "styled-components";
import Page from "../components/common/Page";
import Panel from "../components/layout/Panel";
import Seo from "../components/common/Seo";

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
  return <Seo title="Not Found" description="Page not found." noindex />;
}

