import React from "react";
import styled from "styled-components";
import Page from "../components/common/Page";
import Panel from "../components/layout/Panel";

const Intro = styled.div`
  font-size: 1.2em;
  .introContent {
    text-align: center;
  }
  .video {
    margin-top: 30px;
    video {
      border-radius: 8px;
      max-width: 100%;
      height: auto;
      display: block;
      margin: 0 auto;
    }
  }
  @media only screen and (max-width: 576px) {
    .introContent {
      text-align: left;
    }
    .title {
      display: block;
    }
    .divider {
      display: none;
    }
  }
`;

const IndexPage = () => (
  <Page>
    <Intro>
      <Panel title="GRZEGORZ GOŁĘBIOWSKI">
        <div className="introContent">
          <span className="title">computer science graduate</span>
          <span className="divider"> | </span>
          <span className="title">software engineer</span>
          <span className="divider"> | </span>
          <span className="title">tech lead</span>
          <div className="video">
            <video
              autoplay="autoplay"
              muted="muted"
              loop="loop"
              playsinline="playsinline"
            >
              <source src="jin_yang_handshake.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </Panel>
    </Intro>
  </Page>
);

export default IndexPage;

export function Head() {
  return (
    <>
      <html lang="en" />
      <title>Grzegorz Gołębiowski - personal website</title>
    </>
  );
}

