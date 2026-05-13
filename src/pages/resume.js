import React from "react";
import styled from "styled-components";
import Page from "../components/common/Page";
import Panel from "../components/layout/Panel";
import Link from "../components/ui/Link";

const Resume = styled.div`
  div {
    text-align: center;
  }
`;

const ResumePage = () => (
  <Page>
    <Resume>
      <Panel title="my resume">
        <div>
          You can see my resume by{" "}
          <Link href="/Grzegorz-Golebiowski-Java-Tech-Lead-CV.pdf">
            clicking here
          </Link>
          .
        </div>
      </Panel>
    </Resume>
  </Page>
);

export default ResumePage;

export function Head() {
  return (
    <>
      <html lang="en" />
      <title>Resume</title>
      <meta
        name="description"
        content="Resume of Grzegorz Gołębiowski - download or view the full CV of a Java tech lead and software engineer."
      />
    </>
  );
}

