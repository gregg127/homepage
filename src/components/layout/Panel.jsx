import React from "react";
import styled from "styled-components";

const StyledPanel = styled.div`
  max-width: 60%;
  margin: 10px auto;
  padding: 20px;
  
  h2 {
    margin: 10px 0 30px 0;
    padding: 0 0 20px 0;
    border-bottom: 1px solid var(--secondary-color);
    letter-spacing: 3px;
  }

  .children {
    margin: 5px 10px;
    text-align: justify;
  }

  @media only screen and (max-width: 576px) {
    max-width: 100%;
    padding: 0;
    margin-bottom: 40px;
  }
`;

const Panel = ({ title, children }) => {
  return (
    <StyledPanel>
      <h2>{title}</h2>
      <p className="children">
        {children}
      </p>
    </StyledPanel>
  );
};

export default Panel;
