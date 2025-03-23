import React from "react";
import styled from "styled-components";
import Header from "./Header";

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 body {
  color: black;
  background: rgb(250, 249, 246);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  font-family: "Courier New", Courier, monospace, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 }
`;

const Wrapper = styled.div`
  margin: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  text-align: center;
`;

const Page = ({ children }) => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Header />
      {children}
    </Wrapper>
  );
};

export default Page;
