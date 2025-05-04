import React from "react";
import styled from "styled-components";

const PanelWrapper = styled.div`
  max-width: 60%;
  margin: 10px auto;
  padding: 20px;
  
  h2 {
    margin: 10px 0 30px 0;
    padding: 0 0 20px 0;
    border-bottom: 1px solid silver;
    letter-spacing: 4px;
  }

  .children {
    margin: 5px 10px;
    text-align: justify;
  }

  @media only screen and (max-width: 576px) {
    max-width: 100%;

    /* .children {
      text-align: left;
    } */
  }
`;

const Panel = ({ title, children }) => {
  return (
    <PanelWrapper>
      <h2>{title}</h2>
      <span className="line"></span>
      <p className="children">
        {children}
      </p>
    </PanelWrapper>
  );
};

export default Panel;
