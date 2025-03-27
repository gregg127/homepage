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

  .row {
    display: flex;
  }

  .column-60 {
    flex: 60%;
    text-align: justify;
  }

  .column-40 {
    flex: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    max-width: 100%;
    max-height: 200px;
    border-radius: 10px;
  }

  @media only screen and (max-width: 576px) {
    max-width: 100%;
    margin: 0;
    .row {
      flex-direction: column;
    }
    .column-40 {
      display: none;
    }
  }
`;

const ImagePanel = ({ title, imageName, childrenDirection, children }) => {
  return (
    <PanelWrapper>
      <h2>{title}</h2>
      {childrenDirection === "left" ? (
        <div className="row">
          <div className="column-60">{children}</div>
          <div className="column-40">
            <img src={`/${imageName}`} alt="image" />
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="column-40">
            <img src={`/${imageName}`} alt="image" />
          </div>
          <div className="column-60">{children}</div>
        </div>
      )}
    </PanelWrapper>
  );
};

export default ImagePanel;