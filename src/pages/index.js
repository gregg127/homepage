import React from "react";
import styled from "styled-components";
import Page from "../components/Page";
import Panel from "../components/Panel";

const Intro = styled.div`
  font-size: 1.2em;
  .introContent {
    text-align: center;
  }
  .gif {
    margin-top: 30px;
    img {
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
        <div class="introContent">
          <span class="title">computer science graduate</span><span class="divider"> | </span>
          <span class="title">software engineer</span><span class="divider"> | </span>
          <span class="title">tech lead</span>
          <div class="gif">
            <img src="/jin%20yang%20handshake%20GIF%20by%20Silicon%20Valley.gif"
              alt="Jin Yang Handshake from Silicon Valley" />
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
      <title>Homepage</title>
    </>
  )
}