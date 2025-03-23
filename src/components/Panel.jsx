import React from "react";
import styled from "styled-components";

const PanelWrapper = styled.div`
  display: inline-block;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  max-width: 60%;

  h2 {
    margin: 10px 0 30px 0;
    padding: 0 0 20px 0;
    border-bottom: 1px solid silver;
    letter-spacing: 4px;
  }

  p {
    margin: 5px 10px;
    text-align: justify;
  }

  .list-container {
    text-align: left;
  }

  @media only screen and (max-width: 576px) {
    margin: 5px;
    max-width: 80%;

    p {
      text-align: left;
    }
  }
`;

const Panel = ({ title, children }) => {
  return (
    <PanelWrapper>
      <h2>{title}</h2>
      <span className="line"></span>
      <div>{children}</div>
    </PanelWrapper>
  );
};

export default Panel;
