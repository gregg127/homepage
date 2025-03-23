import React from "react";
import Page from "../components/Page";
import Panel from "../components/Panel";

const NotFoundPage = () => (
  <Page>
    <Panel title="page not found">
      <span>try something else</span>
    </Panel>
  </Page>
);

export default NotFoundPage;

export const Head = () => <title>Not Found</title>;
