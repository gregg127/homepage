import React from "react";
import styled from "styled-components";
import Header from "./Header";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --color-text: black;
    --color-text-muted: #64748B;
    --color-text-link-hover: #339AF0;
    --color-background: white;
    --color-secondary: silver;

    --light-color-text: black;
    --light-color-text-muted: #64748B;
    --light-color-text-link-hover: #339AF0;
    --light-color-background: white;
    --light-color-secondary: silver;

    --dark-color-text: #F9F6EE;
    --dark-color-text-muted: #94A3B8;
    --dark-color-text-link-hover: #339AF0;
    --dark-color-background: #24283B;
    --dark-color-secondary: #394B70;
  }

  body {
    margin: 0;
    overflow-y: scroll;
    font-size: 1.1em;
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
  text-align: center;
`;

const Page = ({ children }) => {
  return (
    <StyledWrapper>
      <GlobalStyle />
      <Header />
      <main>{children}</main>
    </StyledWrapper>
  );
};

export default Page;
