import React from "react";
import Page from "../components/Page";
import Panel from "../components/Panel";

const PhotographyPage = () => (
  <Page>
    <Panel title="my dumpster">
      <span>some photos I took with my analog camera</span>
    </Panel>
    <div>
      TODO: GALLERY
    </div>
  </Page>
);

export default PhotographyPage;

export const Head = () => <title>Photography</title>;
