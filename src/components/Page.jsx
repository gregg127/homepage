import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Wrapper = styled.div`
  color: black;
  margin: 0;
  background: white;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  overflow-x: hidden;
  overflow-y: scroll;
  font-family: "Courier New", Courier, monospace, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
`;

const Page = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
};

export default Page;
