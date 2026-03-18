import React from "react";
import styled from "styled-components";

const StyledIcon = styled.div`
  display: inline-block;
  border: 1px solid var(--secondary-color);
  border-radius: 10px;
  padding: 10px;
  margin: 2px;
  width: 80px;
  text-align: center;
  font-size: 0.85em;
  .icon {
    display: block;
    margin: 0 auto;
    transition: all 0.2s linear;
    max-width: 40px;
    &:hover {
      transform: translateY(-2px);
    }
  }

  .iconLabel {
    display: block;
    margin-top: 5px;
  }
`;

const Icon = ({ iconName, label }) => {
  return (
    <StyledIcon>
      <img
        className="icon"
        src={"/icons/" + iconName + "-svgrepo-com.svg"}
        alt={iconName}
      />
      <div className="iconLabel">{label}</div>
    </StyledIcon>
  );
};

export default Icon;
