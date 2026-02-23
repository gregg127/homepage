import React from "react";
import styled from "styled-components";
import Header from "./Header";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 1.1em;
    --color-text: black;
    --color-text-accent: #777777;
    --color-background: white;
    --secondary-color: silver;

    --light-color-text: black;
    --light-color-text-accent: #777777;
    --light-color-background: white;
    --light-secondary-color: silver;

    --dark-color-text: #F9F6EE;
    --dark-color-text-accent: #F9F1EE;
    --dark-color-background: #24283B;
    --dark-secondary-color: #2F334D;
  }

  body {
    color: var(--color-text);
    background-color: var(--color-background);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    font-family: "Lato", sans-serif;
    font-weight: 300;
    font-style: normal;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Courier Prime", monospace;
    font-weight: 400;
    font-style: normal;
  }
`;

const StyledWrapper = styled.div`
  margin: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  text-align: center;
`;

const Page = ({ children }) => {
  return (
    <StyledWrapper>
      <GlobalStyle />
      <Header />
      {children}
    </StyledWrapper>
  );
};

export default Page;
